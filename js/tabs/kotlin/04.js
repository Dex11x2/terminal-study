// تكملة تاب kotlin: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/kotlin/01.js (شرح حقول الدرس في أوله)
MORE("kotlin", [
    {
      t: "coroutines والشبكة",
      l: 2,
      n: "suspend و launch و async و Dispatchers، و Flow، و Retrofit مع kotlinx.serialization، وحالات loading و error، والصور بـ Coil",
      items: [
        {
          cmd: "coroutines",
          title: "coroutines: suspend و launch و async و withContext و viewModelScope",
          desc: R`في Android فيه thread واحد بيرسم الشاشة ويستقبل اللمس، اسمه main thread. لو عملت عليه حاجة بتاخد وقت (نداء شبكة، قراية ملف كبير)، الشاشة بتتجمد. ولو اتجمدت حوالي ٥ ثواني النظام بيطلّع رسالة «التطبيق مش بيستجيب» (ANR). والـ Android بيمنع نداءات الشبكة على الـ main thread أصلًا ([[NetworkOnMainThreadException]]).

الـ [[coroutines]] بتخليك تكتب الكود ده بشكل عادي من فوق لتحت، وهو بيستنى من غير ما يوقف الـ thread:
• [[suspend fun]]: دالة ممكن «تعلّق» (تستنى) من غير ما تمسك الـ thread. تتنادى بس من coroutine أو من suspend fun تانية.
• [[launch { }]]: ابدأ coroutine جديدة، ومش مستني نتيجة. بترجّع [[Job]] تقدر تلغيه بـ [[cancel()]].
• [[async { }]]: ابدأ coroutine هترجّع نتيجة، وخدها بعدين بـ [[await()]]. اتنين async ورا بعض بيشتغلوا في نفس الوقت.
• [[delay(1000)]]: استنى ثانية من غير ما توقف الـ thread (بعكس Thread.sleep).
• [[withContext(Dispatchers.IO) { }]]: نفّذ الـ block ده على threads الـ IO (شبكة وملفات) وارجع بالنتيجة.

الـ Dispatchers: [[Main]] (الشاشة)، و [[IO]] (شبكة وملفات وداتابيز)، و [[Default]] (حسابات تقيلة على الـ CPU).

في Android مش هتكتب [[runBlocking]] (اللي في المثال عشان يشتغل في main عادية). هتكتب:
[[viewModelScope.launch { ... }]]
الـ [[viewModelScope]] بيلغي كل الـ coroutines بتاعته لوحده لما الـ ViewModel يتمسح. ده اسمه structured concurrency: كل coroutine ليها أب، ولما الأب يتلغي الولاد بيتلغوا.`,
          example: R`import kotlinx.coroutines.*

suspend fun fetchUser(): String {
    delay(1000)
    return "Sara"
}
suspend fun fetchOrders(): Int {
    delay(1000)
    return 3
}
fun main() = runBlocking {
    val start = System.currentTimeMillis()
    val user = async { fetchUser() }
    val orders = async { fetchOrders() }
    println("$__{user.await()} عندها $__{orders.await()} طلبات")
    println("خدت حوالي $__{(System.currentTimeMillis() - start) / 1000} ثانية")
    val job = launch {
        repeat(5) { i ->
            println("شغال $i")
            delay(300)
        }
    }
    delay(700)
    job.cancel()
    println("لغيناه")
    val text = withContext(Dispatchers.IO) { "داتا من الديسك" }
    println(text)
}`,
          try: R`شغّل المثال في الـ Playground (فيه kotlinx.coroutines جاهزة). بعدين شيل [[async]] واكتب [[val user = fetchUser()]] و [[val orders = fetchOrders()]] على طول وشوف الوقت بقى كام. وجرّب تغيّر الـ [[delay(700)]] لـ [[delay(2000)]] وشوف الـ job بيطبع كام مرة.`,
          flag: "script",
          deep: {
            why: R`كل تطبيق بيكلم سيرفر أو داتابيز. من غير coroutines كان فيه callbacks جوه callbacks، أو RxJava بمنحنى تعلم صعب. والـ coroutines هي الطريقة الرسمية في Android دلوقتي، و Retrofit و Room و DataStore كلهم بيدعموا suspend و Flow على طول.`,
            how: R`المترجم بيحوّل الـ suspend fun لـ state machine: كل نقطة ممكن تعلّق فيها (زي delay أو نداء شبكة) بتبقى «حالة». لما الدالة تعلّق، الـ thread بيبقى فاضي يعمل حاجة تانية، ولما النتيجة توصل الـ coroutine بتكمل من نفس الحالة. عشان كده ممكن يبقى عندك آلاف الـ coroutines على threads قليلة.

الـ cancellation تعاوني: الـ coroutine بتتلغي فعلًا عند نقطة تعليق زي [[delay]] أو [[withContext]] (بترمي [[CancellationException]] جواها). لو عندك loop حسابات تقيلة من غير أي تعليق، افحص [[isActive]] أو نادي [[ensureActive()]].

لو coroutine ابن رمى exception، الأب بيتلغي معاه والإخوات كمان. [[supervisorScope]] أو [[SupervisorJob]] بيخلوا فشل ابن ميأثرش على الباقي ([[viewModelScope]] نفسه بيستخدم SupervisorJob).

و Retrofit و Room بيعملوا الـ switch لـ IO جواهم، فمش محتاج [[withContext(Dispatchers.IO)]] حوالين نداءاتهم. القاعدة: أي suspend fun لازم تبقى main-safe (آمنة تتنادى من الـ main).`,
            when: R`أي حاجة بتاخد وقت: شبكة، داتابيز، ملفات، حسابات تقيلة. في الـ ViewModel بـ [[viewModelScope.launch]]، وفي Compose بـ [[LaunchedEffect]] أو [[rememberCoroutineScope()]].`,
            mistakes: R`[[GlobalScope.launch]]: مفيش حد يلغيها فبتفضل شغالة بعد ما الشاشة تقفل. و [[runBlocking]] في كود Android: بتوقف الـ main thread فعلًا. وتمسك [[Exception]] عامة جوه coroutine فتبلع الـ CancellationException والإلغاء يبوظ. و [[async]] من غير [[await]]: الـ exception بتاعتها ممكن تضيع أو توقع الأب في مكان مش متوقع.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعمل ٤ تجارب صغيرة على الـ coroutines: يجيب حاجتين «من الشبكة» في نفس الوقت بـ [[async]]، ويبدأ شغل في الخلفية بـ [[launch]] ويلغيه، ويشغّل حتة كود على threads الـ IO بـ [[withContext]]. مفيش شبكة حقيقية: [[delay(1000)]] بيمثّل نداء بياخد ثانية.

اتشغّل بـ Kotlin 2.4.20 و kotlinx-coroutines-core 1.10.2 جوه [[docker run --rm eclipse-temurin:21-jdk]] (Java 21)، والمكتبة على الـ classpath:

~~~bash
kotlinc -cp kotlinx-coroutines-core-jvm-1.10.2.jar co1.kt -d out
java -cp out:kotlinx-coroutines-core-jvm-1.10.2.jar:kotlin-stdlib.jar Co1Kt
~~~

~~~text الناتج
Sara عندها 3 طلبات
خدت حوالي 1 ثانية
شغال 0
شغال 1
شغال 2
لغيناه
داتا من الديسك
~~~

> الـ coroutines مش جزء من الـ stdlib، دي مكتبة اسمها [[kotlinx.coroutines]]. في مشروع Android بتيجي مع [[lifecycle-viewmodel-ktx]] ومكتبات Jetpack، وفي Gradle عادي تضيف [[org.jetbrains.kotlinx:kotlinx-coroutines-core]].

---

## ١. الـ import

~~~kotlin
import kotlinx.coroutines.*
~~~

[[*]] يعني «هات كل اللي في الـ package ده»: [[delay]] و [[async]] و [[launch]] و [[runBlocking]] و [[withContext]] و [[Dispatchers]]. من غيره كل اسم فيهم هيطلع [[Unresolved reference]].

---

## ٢. [[suspend fun]]: دالة بتستنى من غير ما تمسك الـ thread

~~~kotlin
suspend fun fetchUser(): String {
    delay(1000)
    return "Sara"
}
~~~

- [[suspend]]: كلمة قبل [[fun]] معناها «الدالة دي ممكن توقف في النص وتكمّل بعدين». الوقفة دي اسمها **suspension** (تعليق).
- [[delay(1000)]]: استنى 1000 ملي ثانية (ثانية). هي نفسها suspend fun، وعشان كده مينفعش تتنادى غير من جوه suspend fun أو coroutine. لو ناديتها من [[fun]] عادية المترجم بيرفض (جرّبت [[delay(1000)]] جوه [[fun main()]] من غير runBlocking):

~~~text الناتج
co3.kt:3:5: error: suspend function 'suspend fun delay(timeMillis: Long): Unit' can only be called from a coroutine or another suspend function.
~~~
- الفرق بين [[delay]] و [[Thread.sleep]]: الـ sleep بيوقف الـ thread كله، فمفيش حاجة تانية تشتغل عليه. الـ delay بيسيب الـ thread فاضي لحد ما الوقت يخلص.

جرّبت الفرق: coroutine فيها [[Thread.sleep(500)]] وجنبها coroutine تانية على نفس الـ thread بتطبع إمتى بدأت:

~~~text الناتج
sleep خلص
b بدأ بعد 502ms
~~~

التانية فضلت مستنية نص ثانية كاملة، لأن الـ sleep مسك الـ thread. ده بالظبط اللي بيجمّد الشاشة في Android لو عملته على الـ main thread.

و [[fetchOrders()]] نفس الفكرة بالظبط، بترجّع [[Int]] (3) بعد ثانية.

---

## ٣. [[runBlocking]]: الجسر من main العادية للـ coroutines

~~~kotlin
fun main() = runBlocking {
~~~

- [[main]] دالة عادية، مش suspend، فمتقدرش تنادي [[delay]] جواها على طول.
- [[runBlocking { }]] بتبدأ coroutine وبتوقف الـ thread اللي ناداها (هنا main) لحد ما كل اللي جواها يخلص. عشان كده البرنامج مبيقفلش قبل ما الـ coroutines تخلص.
- [[=]] بعد [[main()]]: الدالة جسمها تعبير واحد (درس الدوال)، يعني [[main]] قيمتها هي [[runBlocking { ... }]].
- جوه الـ [[{ }]] احنا جوه coroutine، فينفع [[delay]] و [[async]] و [[launch]].

> في Android **مش هتكتب runBlocking أبدًا**: هي بتوقف الـ thread فعلًا، ولو على الـ main الشاشة تتجمد. هناك بتستخدم [[viewModelScope]] (تحت).

---

## ٤. [[async]] و [[await()]]: اتنين في نفس الوقت

~~~kotlin
    val start = System.currentTimeMillis()
    val user = async { fetchUser() }
    val orders = async { fetchOrders() }
    println("$__{user.await()} عندها $__{orders.await()} طلبات")
    println("خدت حوالي $__{(System.currentTimeMillis() - start) / 1000} ثانية")
~~~

### [[System.currentTimeMillis()]]

دالة Java بترجّع الوقت دلوقتي بالملي ثانية (من سنة 1970). بنسجّله في الأول ونطرحه في الآخر عشان نعرف الكود خد قد إيه.

### [[async { fetchUser() }]]

- بتبدأ coroutine جديدة بتشغّل [[fetchUser()]]، و **مبتستناش**: السطر بيخلص على طول.
- بترجّع object من نوع [[Deferred<String>]]، يعني «String هتيجي بعدين». طبعته قبل الـ await فطلع:

~~~text الناتج
u قبل await: DeferredCoroutine{Active}@1c6b6478
~~~

[[Active]] يعني لسه شغالة، والرقم بعد [[@]] عنوان الـ object في الذاكرة (بيتغير كل تشغيل).

### [[user.await()]]

- [[await()]] suspend: «استنى لحد ما النتيجة تيجي وهاتها». هنا بترجّع [["Sara"]].
- [[$__{...}]] جوه النص: string template (درس string templates)، بيحط قيمة التعبير في النص.

### ليه ثانية مش اتنين؟

الـ [[async]] التانية بدأت قبل ما الأولى تخلص، فالاتنين بيستنوا مع بعض. والقسمة على 1000 بتحوّل الملي ثانية لثواني، وقسمة [[Long]] على [[Int]] بتشيل الكسور. قست الوقت بالملي ثانية:

| الطريقة | الوقت |
|---|---|
| [[async]] للاتنين | 1014ms |
| [[val user = fetchUser()]] ثم [[val orders = fetchOrders()]] | 2011ms |

من غير async كل نداء بيستنى اللي قبله (ثانية + ثانية). والـ ١٤ ملي ثانية الزيادة وقت تشغيل الكود نفسه.

---

## ٥. [[launch]] و [[Job]] و [[cancel()]]

~~~kotlin
    val job = launch {
        repeat(5) { i ->
            println("شغال $i")
            delay(300)
        }
    }
    delay(700)
    job.cancel()
    println("لغيناه")
~~~

### [[launch { }]]

- بتبدأ coroutine **مش راجع منها نتيجة** (شغل في الخلفية).
- بترجّع [[Job]]: مقبض تقدر تلغي بيه الشغل ([[cancel()]]) أو تستنى يخلص ([[join()]]). طبعته:

~~~text الناتج
job: StandaloneCoroutine{Active}@5679c6c6
~~~

### [[repeat(5) { i -> ... }]]

[[repeat]] دالة من الـ stdlib بتنفّذ الـ lambda ٥ مرات، و [[i]] رقم المرة من 0 لـ 4 (درس lambdas).

### التوقيت

[[delay(700)]] في الـ main coroutine، وفي نفس الوقت الـ job بيطبع كل 300ms. سجّلت إمتى كل سطر اتطبع:

~~~text الناتج
شغال 0 عند 16ms
شغال 1 عند 316ms
شغال 2 عند 617ms
بعد cancel: isActive=false isCancelled=true
~~~

- عند 0 و 300 و 600 طبع. عند 700 الـ main صحيت ونادت [[cancel()]]، والـ job كان واقف في [[delay(300)]] التالتة (هتخلص عند 900)، فاتلغى جواها.
- [[isActive]] بقت false و [[isCancelled]] بقت true.

### الإلغاء بيحصل إزاي؟

الـ cancellation **تعاوني**: الـ coroutine مش بتتقتل من برا، هي بتتلغي عند أول نقطة تعليق زي [[delay]]، اللي بترمي جواها [[CancellationException]]. مسكتها وطبعتها:

~~~text الناتج
جوه: kotlinx.coroutines.JobCancellationException: StandaloneCoroutine was cancelled; job=StandaloneCoroutine{Cancelling}@4f4a7090
~~~

لو مسكتها لازم ترميها تاني ([[throw e]])، وإلا الإلغاء يبوظ. وعشان كده [[catch (e: Exception)]] عامة جوه coroutine غلطة مشهورة.

ولما خليت [[delay(700)]] تبقى [[delay(2000)]]، الـ job لحق يطبع ٥ مرات (0 لـ 4) وخلص لوحده قبل الـ cancel، و [[isCompleted]] طلعت true. الـ [[cancel()]] على job خلصان مبيعملش حاجة.

---

## ٦. [[withContext(Dispatchers.IO)]]

~~~kotlin
    val text = withContext(Dispatchers.IO) { "داتا من الديسك" }
    println(text)
~~~

- [[Dispatchers]]: مين اللي هيشغّل الكود. **Dispatcher** يعني «اللي بيوزّع الشغل على threads».
- [[Dispatchers.IO]]: مجموعة threads للشغل اللي بيستنى (شبكة، ملفات، داتابيز).
- [[withContext(...) { }]]: نفّذ الـ block على الـ dispatcher ده، **واستنى** النتيجة (آخر سطر في الـ block)، وارجع بيها للـ dispatcher اللي كنت عليه.

طبعت اسم الـ thread جوه وبرا:

~~~text الناتج
main على: main
withContext(IO) اتنفذ على: DefaultDispatcher-worker-1
ورجعنا على: main
~~~

[[DefaultDispatcher-worker-1]]: thread من الـ pool اللي [[IO]] و [[Default]] بيتشاركوا فيه، ورجعنا لـ [[main]] بعدها لوحدنا.

ولو الـ block رمى exception، [[withContext]] بترميه في المكان اللي ناداها، فتمسكه بـ try عادي:

~~~text الناتج
اتمسك: java.io.IOException: x
~~~

| الـ Dispatcher | لإيه |
|---|---|
| [[Dispatchers.Main]] | الشاشة (Android بس، مش موجود في JVM عادي) |
| [[Dispatchers.IO]] | شبكة وملفات وداتابيز |
| [[Dispatchers.Default]] | حسابات تقيلة على الـ CPU (ترتيب لستة ضخمة، parsing) |

---

## ٧. الشكل الحقيقي في Android (solCode)

~~~kotlin
class ProfileViewModel(private val repo: ProfileRepository) : ViewModel() {
    private val _state = MutableStateFlow("")
    val state = _state.asStateFlow()

    fun load() {
        viewModelScope.launch {
            val user = async { repo.fetchUser() }
            val orders = async { repo.fetchOrders() }
            _state.value = "$__{user.await()} عندها $__{orders.await()} طلبات"
        }
    }
}
~~~

الجزء ده Android بس (محتاج [[ViewModel]] و [[viewModelScope]] من [[androidx.lifecycle]])، فهو من الـ docs الرسمية مش متشغّل هنا. بس جوه الـ [[launch]] نفس الكود اللي شغّلناه فوق بالظبط.

- [[viewModelScope]]: scope جاهز في كل ViewModel، بيشتغل على [[Dispatchers.Main.immediate]] (الـ main thread). لما الشاشة تتقفل نهائيًا والـ ViewModel يتمسح ([[onCleared]])، كل الـ coroutines اللي فيه بتتلغي لوحدها. ده اسمه **structured concurrency**: كل coroutine ليها أب، والأب ميخلصش غير لما ولاده يخلصوا، ولو اتلغى بيلغيهم.
- الـ [[async]] هنا ولاد الـ [[launch]]، فلو الـ ViewModel اتمسح وهما في النص، كله بيتلغي.
- [[_state]] و [[state]]: [[MutableStateFlow]] بنكتب فيه من جوه، و [[asStateFlow()]] نسخة للقراية بس للشاشة (درس Flow الجاي).
- ليه مفيش [[withContext(Dispatchers.IO)]]؟ لأن الـ repository (بـ Retrofit أو Room) هو اللي مسؤول إن دواله تبقى **main-safe**: تتنادى من الـ main من غير ما تجمّده.

---

## الخلاصة

| الأداة | بتعمل إيه | بترجّع |
|---|---|---|
| [[suspend fun]] | دالة ممكن تستنى من غير ما تمسك الـ thread | النتيجة عادي |
| [[delay(ms)]] | استنى من غير ما توقف الـ thread | [[Unit]] |
| [[runBlocking { }]] | يدخلك عالم الـ coroutines من main (تجارب بس) | آخر قيمة |
| [[launch { }]] | ابدأ شغل في الخلفية | [[Job]] |
| [[async { }]] + [[await()]] | ابدأ شغل هيرجّع نتيجة، وخدها بعدين | [[Deferred<T>]] ثم [[T]] |
| [[job.cancel()]] | الغي، وبيحصل عند أول نقطة تعليق | [[Unit]] |
| [[withContext(IO) { }]] | نفّذ على dispatcher تاني وارجع بالنتيجة | آخر قيمة |

- اتنين [[async]] ورا بعض = في نفس الوقت. اتنين نداءات عادية ورا بعض = واحد بعد التاني.
- في Android: [[viewModelScope.launch]]، مش [[runBlocking]] ولا [[GlobalScope]].`,
          lines: [
            R`import كل حاجة من kotlinx.coroutines.`,
            R`[[suspend]]: دالة بتستنى.`,
            R`[[delay]]: استنى ثانية من غير ما توقف الـ thread (كأنه نداء شبكة).`,
            "النتيجة.",
            "قفلة.",
            "دالة تانية بتاخد ثانية.",
            "استنى.",
            "النتيجة.",
            "قفلة.",
            R`[[runBlocking]]: يشغّل coroutines جوه main عادية (للتجربة بس، مش في Android).`,
            "وقت البداية.",
            R`[[async]]: ابدأ الأولى ومتستناش.`,
            "ابدأ التانية في نفس الوقت.",
            R`[[await()]]: استنى النتيجتين. الاتنين شغالين مع بعض.`,
            "حوالي ثانية مش اتنين.",
            R`[[launch]]: coroutine من غير نتيجة، ورجّعت Job.`,
            "كرر 5 مرات.",
            "اطبع.",
            "استنى 300ms.",
            "قفلة repeat.",
            "قفلة launch.",
            "استنى 700ms.",
            R`[[cancel()]]: الغيه. هيقف عند أول delay.`,
            "اطبع.",
            R`[[withContext]]: نفّذ على IO وارجع بالنتيجة.`,
            "اطبع.",
            "قفلة."
          ],
          sol: R`ناتج المثال:
[[Sara عندها 3 طلبات]]
[[خدت حوالي 1 ثانية]]
[[شغال 0]]
[[شغال 1]]
[[شغال 2]]
[[لغيناه]]
[[داتا من الديسك]]

الـ job طبع ٣ مرات (عند 0 و 300 و 600 ملي ثانية) واتلغى عند 700.

من غير async: [[خدت حوالي 2 ثانية]]، لأن كل نداء استنى اللي قبله. ومع [[delay(2000)]]: الـ job بيلحق يطبع الـ ٥ مرات ويخلص لوحده قبل الـ cancel.

وفي Android الشكل الحقيقي في الكود تحت.`,
          solCode: R`class ProfileViewModel(private val repo: ProfileRepository) : ViewModel() {
    private val _state = MutableStateFlow("")
    val state = _state.asStateFlow()

    fun load() {
        viewModelScope.launch {
            val user = async { repo.fetchUser() }
            val orders = async { repo.fetchOrders() }
            _state.value = "$__{user.await()} عندها $__{orders.await()} طلبات"
        }
    }
}`
        },
        {
          cmd: "Flow",
          title: "Flow و StateFlow: قيم بتوصل مع الوقت، و collect و map و stateIn",
          desc: R`الـ [[suspend fun]] بترجّع قيمة واحدة. لو عندك قيم بتيجي مع الوقت (الداتابيز اتغيرت، الموقع اتحرك، الإعدادات اتعدلت)، بتستخدم [[Flow]].

• [[flow { emit(x) }]]: تعمل Flow، و [[emit]] بتبعت قيمة.
• [[collect { }]]: تسمع وتستقبل كل قيمة. الـ Flow العادي «cold»: مبيشتغلش غير لما حد يعمل collect، وكل collect بيشغّله من الأول.
• دوال زي الـ collections: [[map]] و [[filter]] و [[take]] و [[debounce]]... وبترجّع Flow جديد.
• [[toList()]] و [[first()]]: تجمع النتيجة (suspend).

[[StateFlow]] نوع خاص «hot»: دايمًا ليه قيمة حالية ([[value]])، وأي حد يسمع بياخد القيمة الحالية على طول وبعدها التغييرات. ولو اتكتبت نفس القيمة تاني ([[==]] للقديمة) مبيبعتهاش. ده اللي بتستخدمه للـ UI state.

ولو عندك Flow من Room مثلًا وعايز تحوّله StateFlow للشاشة:
[[repo.notes.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())]]
يعني: شغّل الـ Flow طول ما فيه حد بيسمع، وكمّل ٥ ثواني بعد آخر واحد (عشان الـ rotation ميعيدش الشغل)، والقيمة الأولى List فاضية.

وفيه [[SharedFlow]] للأحداث اللي تتبعت مرة (زي «اعرض snackbar»).`,
          example: R`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun countdown(from: Int): Flow<Int> = flow {
    for (i in from downTo 1) {
        emit(i)
        delay(200)
    }
}
fun main() = runBlocking {
    countdown(3).collect { println("باقي $it") }
    val squares = (1..10).asFlow().filter { it % 2 == 0 }.map { it * it }.toList()
    println(squares)
    val state = MutableStateFlow(0)
    val watcher = launch { state.collect { println("القيمة: $it") } }
    delay(50)
    state.value = 1
    delay(50)
    state.value = 1
    state.value = 2
    delay(50)
    watcher.cancel()
}`,
          try: R`اعمل [[fun ticker(): Flow<Int>]] بيبعت رقم كل 100ms للأبد ([[while (true)]])، واسمع منه أول ٥ أرقام بس بـ [[take(5)]]. وبعدين جرّب [[combine]]: Flow فيه اسم و Flow فيه عدد، واطبع جملة كل ما واحد فيهم يتغير.`,
          flag: "script",
          deep: {
            why: R`Room و DataStore بيرجّعوا Flow: الشاشة بتتحدث لوحدها لما الداتا تتغير، من غير ما تعمل refresh. والـ ViewModel بيحوّل ويجمّع الـ Flows دي لـ UI state واحد. ده أساس المعمارية الحديثة في Android.`,
            how: R`الـ cold flow كود بيتنفذ جوه الـ collect بتاع اللي بيسمع: [[emit]] بتنادي الـ lambda بتاعة collect على طول وبتستنى تخلص. عشان كده مفيش قيم بتضيع ومفيش buffer إلا لو طلبت ([[buffer()]] أو [[conflate()]]).

[[collect]] نفسها suspend ومبترجعش غير لما الـ Flow يخلص أو الـ coroutine تتلغي. عشان كده الـ watcher في المثال جوه [[launch]] لوحده، والا كان الكود اللي بعده مش هيتنفذ أبدًا.

StateFlow بيعمل conflation: لو القيمة اتغيرت كذا مرة بسرعة، اللي بيسمع ممكن ياخد آخر واحدة بس. ده مناسب للـ state (المهم آخر حالة)، ومش مناسب للأحداث (كل حدث لازم يوصل).

[[flowOn(Dispatchers.IO)]] بيغيّر الـ dispatcher للخطوات اللي قبله في السلسلة. و [[catch { }]] بيمسك الأخطاء اللي قبله.

ومن جوه Compose: [[flow.collectAsStateWithLifecycle(initialValue)]].`,
            when: R`[[Flow]] لأي داتا بتتغير مع الوقت (داتابيز، إعدادات، sensors). [[StateFlow]] للـ UI state في الـ ViewModel. و suspend fun عادية للحاجات اللي بتحصل مرة (نداء API واحد).`,
            mistakes: R`تعمل [[collect]] وبعدها كود وتستغرب إنه مش بيتنفذ: الـ collect مش بترجع. وتستخدم StateFlow لأحداث زي «روح للشاشة الفلانية» فتتنفذ تاني بعد الـ rotation. وتعمل [[stateIn]] جوه دالة بتتنادى كتير فيتعمل Flow جديد كل مرة: اعمله property مرة واحدة.`
          },
          teach: R`## البرنامج بيعمل إيه؟

٣ تجارب على [[Flow]]: عدّاد تنازلي بيبعت ٣ قيم بفاصل وقت، وسلسلة [[filter]] و [[map]] على أرقام، و [[MutableStateFlow]] بنغيّر قيمته ونشوف مين بيوصل للي بيسمع. اتشغّل بـ Kotlin 2.4.20 و kotlinx-coroutines-core 1.10.2 جوه [[docker run --rm eclipse-temurin:21-jdk]]، بنفس طريقة درس coroutines (الـ jar على الـ classpath).

~~~text الناتج
باقي 3
باقي 2
باقي 1
[4, 16, 36, 64, 100]
القيمة: 0
القيمة: 1
القيمة: 2
~~~

---

## ١. الـ imports

~~~kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
~~~

الأول للـ coroutines ([[runBlocking]] و [[delay]] و [[launch]])، والتاني لكل حاجة Flow: [[Flow]] و [[flow { }]] و [[asFlow]] و [[MutableStateFlow]] والـ operators زي [[map]] و [[filter]].

---

## ٢. تعمل Flow: [[flow { emit() }]]

~~~kotlin
fun countdown(from: Int): Flow<Int> = flow {
    for (i in from downTo 1) {
        emit(i)
        delay(200)
    }
}
~~~

- [[Flow<Int>]]: نوع معناه «سلسلة أرقام Int بتوصل واحدة ورا التانية مع الوقت». الـ [[<Int>]] نوع العناصر (generics).
- [[flow { }]]: الـ **builder**، دالة بتاخد lambda وبتعمل منها Flow. جوه الـ lambda ده coroutine، فينفع [[delay]].
- [[from downTo 1]]: range نازل (درس ranges و loops): 3 ثم 2 ثم 1.
- [[emit(i)]]: «ابعت القيمة دي للي بيسمع». الـ emit suspend: بتستنى لحد ما اللي بيسمع يخلص يتعامل مع القيمة.
- [[delay(200)]]: استنى ٢٠٠ ملي ثانية قبل القيمة الجاية.

### الـ Flow ده «cold»

[[countdown(3)]] لوحده **مبيشغّلش أي حاجة**. هو وصفة بس، والكود اللي جوه [[flow { }]] بيتنفذ لما حد يعمل [[collect]]، ومن الأول لكل collect. حطيت [[println("  (بدأ الـ flow)")]] في أول الـ builder، وعملت collect مرتين:

~~~text الناتج
عملنا الـ flow ولسه محدش سمع
  (بدأ الـ flow)
collect 1: 2 عند 18ms
collect 1: 1 عند 226ms
  (بدأ الـ flow)
collect 2: 2
collect 2: 1
~~~

- السطر الأول اتطبع قبل «بدأ»: عمل الـ Flow مشغّلوش.
- كل collect بدأ الـ flow من جديد.
- الفرق بين القيمتين حوالي ٢٠٠ ملي ثانية: ده الـ [[delay(200)]].

---

## ٣. تسمع: [[collect]]

~~~kotlin
fun main() = runBlocking {
    countdown(3).collect { println("باقي $it") }
~~~

- [[runBlocking]]: يدخلنا عالم الـ coroutines من main (للتجربة بس، درس coroutines).
- [[collect { }]]: شغّل الـ Flow، والـ lambda بتتنادى مع كل قيمة. [[it]] هو القيمة.
- [[collect]] نفسها suspend و **مبترجعش غير لما الـ Flow يخلص**. هنا خلص بعد 3 قيم (حوالي 600ms)، وبعدها السطر اللي بعده بيتنفذ.

~~~text الناتج
باقي 3
باقي 2
باقي 1
~~~

---

## ٤. سلسلة operators: [[asFlow]] و [[filter]] و [[map]] و [[toList]]

~~~kotlin
    val squares = (1..10).asFlow().filter { it % 2 == 0 }.map { it * it }.toList()
    println(squares)
~~~

نفكها بالترتيب:

| الخطوة | الكود | النتيجة |
|---|---|---|
| ١ | [[(1..10).asFlow()]] | Flow بيبعت 1 لـ 10 (من range) |
| ٢ | [[.filter { it % 2 == 0 }]] | يعدّي الزوجي بس: [[%]] باقي القسمة، والزوجي باقيه 0 |
| ٣ | [[.map { it * it }]] | كل رقم يتربّع |
| ٤ | [[.toList()]] | اجمع كل القيم في List (suspend) |

~~~text الناتج
[4, 16, 36, 64, 100]
~~~

### الـ operators مش بتشغّل حاجة

[[filter]] و [[map]] بيرجّعوا **Flow جديد**، مش نتيجة. جرّبت أطبع السلسلة من غير [[toList()]]:

~~~text الناتج
Fl2Kt$main$1$invokeSuspend$$inlined$map$1@1bc6a36e
~~~

ده اسم كلاس الـ Flow اللي [[map]] عملته وعنوانه، مش أرقام. الشغل بيحصل بس مع دالة **terminal** (نهائية) زي [[collect]] و [[toList()]] و [[first()]]. وجرّبت [[countdown(3).first()]]:

~~~text الناتج
  (بدأ الـ flow)
first = 3
~~~

[[first()]] خدت أول قيمة ووقفت الـ Flow على طول، فمستنتش الـ 600ms.

---

## ٥. [[MutableStateFlow]]: قيمة حالية بتتسمع

~~~kotlin
    val state = MutableStateFlow(0)
    val watcher = launch { state.collect { println("القيمة: $it") } }
    delay(50)
    state.value = 1
    delay(50)
    state.value = 1
    state.value = 2
    delay(50)
    watcher.cancel()
}
~~~

### [[MutableStateFlow(0)]]

StateFlow بقيمة أولى 0. ليه دايمًا قيمة: [[state.value]] بترجّع [[0]] على طول، و [[state.value = 1]] بتغيّرها. وهو «hot»: موجود وليه قيمة حتى لو محدش بيسمع.

### ليه الـ collect جوه [[launch]]؟

الـ collect على StateFlow **عمرها ما بتخلص** (الـ StateFlow ملوش نهاية). لو كتبناها في main على طول، كل اللي بعدها مش هيتنفذ أبدًا. فبنحطها في coroutine لوحدها بـ [[launch]]، و [[watcher]] هو الـ [[Job]] بتاعها عشان نلغيها في الآخر.

### القيم خطوة خطوة

| الوقت | اللي حصل | اتطبع |
|---|---|---|
| 0 | الـ watcher بدأ يسمع، وخد القيمة الحالية على طول | [[القيمة: 0]] |
| 50ms | [[value = 1]] | [[القيمة: 1]] |
| 100ms | [[value = 1]] تاني: نفس القيمة ([[==]] القديمة) | ولا حاجة |
| 100ms | [[value = 2]] | [[القيمة: 2]] |
| 150ms | [[watcher.cancel()]] | البرنامج بيخلص |

الـ [[delay(50)]] بعد كل تغيير بيدي الـ watcher فرصة يشتغل ويطبع (هما الاتنين على نفس الـ thread).

### الـ conflation: ممكن قيم متوصلش

غيّرت القيمة ٣ مرات ورا بعض من غير delay ([[5]] ثم [[6]] ثم [[7]]):

~~~text الناتج
القيمة: 0
القيمة: 7
~~~

5 و 6 ضاعوا: الـ watcher ملحقش يشتغل غير بعد التغييرات التلاتة، و StateFlow بيدّيه **آخر قيمة بس**. ده مناسب للـ UI state (الشاشة محتاجة آخر حالة)، ومش مناسب للأحداث اللي لازم كلها توصل (لها SharedFlow أو Channel).

---

## ٦. [[stateIn]]: من Flow عادي لـ StateFlow

في الـ desc: [[repo.notes.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())]]. الشكل ده Android (محتاج [[viewModelScope]])، بس [[stateIn]] نفسها جزء من kotlinx.coroutines، فجرّبتها على countdown بـ [[SharingStarted.Eagerly]] (ابدأ على طول) وقيمة أولى 99:

~~~kotlin
val shared = countdown(3).stateIn(this, SharingStarted.Eagerly, 99)
println("stateIn أول قيمة: $__{shared.value}")
delay(500)
println("stateIn بعد 500ms: $__{shared.value}")
~~~

~~~text الناتج
stateIn أول قيمة: 99
  (بدأ الـ flow)
stateIn بعد 500ms: 1
~~~

- الـ parameter الأول: الـ scope اللي الـ Flow هيتجمع فيه ([[this]] هنا الـ runBlocking، و [[viewModelScope]] في الـ ViewModel).
- التاني: إمتى يشتغل. [[WhileSubscribed(5_000)]] يعني «طول ما فيه حد بيسمع، وكمّل 5000 ملي ثانية بعد آخر واحد» (الـ [[_]] في [[5_000]] فاصل للقراية بس). الـ ٥ ثواني بتغطي الـ rotation: الشاشة بتختفي وترجع في أقل من ثانية، فالـ Flow ميعيدش من الأول.
- التالت: القيمة الأولى لحد ما أول قيمة حقيقية توصل (هنا 99، وفي الـ desc [[emptyList()]]).

---

## ٧. حل التجربة (solCode)

~~~kotlin
fun ticker(): Flow<Int> = flow {
    var i = 0
    while (true) {
        emit(i++)
        delay(100)
    }
}
~~~

- [[while (true)]]: loop مالوش نهاية، فالـ Flow ده لا نهائي.
- [[emit(i++)]]: [[i++]] بتبعت القيمة الحالية وبعدين تزوّد (0 ثم 1 ثم 2...).
- مش هيعلّق البرنامج؟ لأ: الـ Flow cold، ومبيشتغلش غير قد ما اللي بيسمع عايز.

~~~kotlin
    ticker().take(5).collect { println(it) }
~~~

[[take(5)]]: خد أول ٥ قيم وبعدين **الغي الـ Flow** (بعد القيمة الخامسة على طول بيرمي جوه الـ builder exception داخلي من نوع CancellationException فالـ while بتقف)، فالـ collect بتخلص.

~~~kotlin
    val name = MutableStateFlow("Sara")
    val count = MutableStateFlow(1)
    val job = launch {
        combine(name, count) { n, c -> "$n عندها $c رسايل" }.collect { println(it) }
    }
    delay(50)
    count.value = 2
    delay(50)
    name.value = "Omar"
    delay(50)
    job.cancel()
}
~~~

[[combine(a, b) { x, y -> ... }]]: Flow جديد بيطلّع قيمة كل ما **أي واحد** من الاتنين يتغير، والـ lambda بتاخد آخر قيمة من كل واحد. أول قيمة بتطلع لما الاتنين يبقى عندهم قيمة.

~~~text الناتج
0
1
2
3
4
Sara عندها 1 رسايل
Sara عندها 2 رسايل
Omar عندها 2 رسايل
~~~

ده بالظبط اللي الـ ViewModel بيعمله لما يجمّع أكتر من مصدر (اسم اليوزر من DataStore، والرسايل من Room) في UI state واحد.

---

## الخلاصة

| الحاجة | النوع | بتعمل إيه |
|---|---|---|
| [[flow { emit(x) }]] | cold | وصفة، بتتنفذ من الأول مع كل collect |
| [[map]] و [[filter]] و [[take]] و [[combine]] | operators | بترجّع Flow جديد، مش بتشغّل حاجة |
| [[collect]] و [[toList()]] و [[first()]] | terminal (suspend) | دي اللي بتشغّل الـ Flow |
| [[MutableStateFlow(x)]] | hot | ليه [[value]] دايمًا، ومبيبعتش قيمة زي اللي قبلها، واللي بيسمع ممكن ياخد آخر قيمة بس |
| [[stateIn(scope, started, initial)]] | Flow إلى StateFlow | عشان الشاشة تاخد آخر حالة |

- [[collect]] على StateFlow مبتخلصش: حطها في [[launch]] لوحدها.
- الـ state (آخر حالة) = StateFlow. الأحداث (كل واحد لازم يوصل) = SharedFlow.`,
          lines: [
            "import الـ coroutines.",
            "import الـ Flow.",
            R`دالة بترجّع [[Flow<Int>]]، والـ builder [[flow { }]].`,
            "من الرقم لحد 1.",
            R`[[emit]]: ابعت القيمة للي بيسمع.`,
            "استنى شوية.",
            "قفلة for.",
            "قفلة.",
            "بداية main.",
            R`[[collect]]: اسمع كل القيم. مبترجعش غير لما الـ Flow يخلص.`,
            R`[[asFlow]] من range، وبعدين filter و map، و [[toList]] تجمع.`,
            "[4, 16, 36, 64, 100].",
            R`[[MutableStateFlow]] بقيمة أولى 0.`,
            R`نسمع في [[launch]] لوحدها، لأن الـ collect مش بيخلص.`,
            "ندي الفرصة يستقبل القيمة الحالية (0).",
            "قيمة جديدة.",
            "يستقبلها.",
            "نفس القيمة: مش هتتبعت.",
            "قيمة جديدة.",
            "يستقبلها.",
            "نلغي السمع.",
            "قفلة."
          ],
          sol: R`ناتج المثال:
[[باقي 3]]
[[باقي 2]]
[[باقي 1]]
[[[4, 16, 36, 64, 100]]]
[[القيمة: 0]]
[[القيمة: 1]]
[[القيمة: 2]]

لاحظ إن [[القيمة: 1]] اتطبعت مرة واحدة رغم إننا كتبناها مرتين، لأن StateFlow مبيبعتش قيمة زي اللي قبلها.

وحل التجربة تحت: [[take(5)]] بتوقف الـ Flow اللانهائي بعد ٥ قيم، و [[combine]] بيطلّع قيمة جديدة كل ما أي Flow فيهم يتغير.`,
          solCode: R`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun ticker(): Flow<Int> = flow {
    var i = 0
    while (true) {
        emit(i++)
        delay(100)
    }
}

fun main() = runBlocking {
    ticker().take(5).collect { println(it) }
    val name = MutableStateFlow("Sara")
    val count = MutableStateFlow(1)
    val job = launch {
        combine(name, count) { n, c -> "$n عندها $c رسايل" }.collect { println(it) }
    }
    delay(50)
    count.value = 2
    delay(50)
    name.value = "Omar"
    delay(50)
    job.cancel()
}`
        },
        {
          cmd: "Retrofit و serialization",
          title: "تكلم API من Android: Retrofit مع kotlinx.serialization",
          desc: R`[[Retrofit]] أشهر مكتبة HTTP في Android. بتوصف الـ API كـ [[interface]]، و Retrofit يكتبلك التنفيذ:
• [[@GET("posts")]]: annotation فيها الـ method والمسار. وفيه [[@POST]] و [[@PUT]] و [[@DELETE]].
• [[suspend fun getPosts(): List<Post>]]: الدالة suspend، وبترجّع الداتا متحوّلة من JSON على طول.
• [[@Path("id") id: Int]]: يحط القيمة مكان [[{id}]] في المسار. و [[@Query("page")]] يضيف [[?page=2]]. و [[@Body]] يبعت object كـ JSON.

التحويل من JSON لـ data class بيعمله [[kotlinx.serialization]] (مكتبة JetBrains الرسمية):
• [[@Serializable]] على الـ data class.
• [[Json { ignoreUnknownKeys = true }]]: لو السيرفر بعت fields مش موجودة في الكلاس، تجاهلها بدل ما يقع.
• [[json.asConverterFactory("application/json".toMediaType())]]: يربط kotlinx.serialization بـ Retrofit.

الـ [[baseUrl]] لازم يخلص بـ [[/]].

وفي Gradle محتاج: [[retrofit]] و [[converter-kotlinx-serialization]] و [[kotlinx-serialization-json]]، و plugin [[org.jetbrains.kotlin.plugin.serialization]]. وفي الـ manifest صلاحية [[INTERNET]].

والبديل المشهور [[Ktor client]] من JetBrains: مكتوب Kotlin بالكامل وشغال في Kotlin Multiplatform. Retrofit لسه الأكتر في مشاريع Android، فاعرف الاتنين بالاسم واتقن واحد.`,
          example: R`@Serializable
data class Post(val id: Int, val title: String, val body: String)
interface PostsApi {
    @GET("posts")
    suspend fun getPosts(): List<Post>
    @GET("posts/{id}")
    suspend fun getPost(@Path("id") id: Int): Post
}
object Network {
    private val json = Json { ignoreUnknownKeys = true }
    val api: PostsApi = Retrofit.Builder()
        .baseUrl("https://jsonplaceholder.typicode.com/")
        .addConverterFactory(json.asConverterFactory("application/json".toMediaType()))
        .build()
        .create(PostsApi::class.java)
}`,
          try: R`ضيف المكتبات والصلاحية، وحط [[LaunchedEffect(Unit) { Log.d("API", Network.api.getPost(1).title) }]] في أي شاشة مؤقتًا، وشوف Logcat. بعدين ضيف للـ interface دالة [[getComments(@Query("postId") postId: Int): List<Comment>]] على [["comments"]] واعمل الـ data class بتاعها.`,
          flag: "script",
          deep: {
            why: R`تقريبًا كل تطبيق بيكلم backend. و Retrofit بيخلي الـ API عبارة عن interface واضح فيه كل الـ endpoints في مكان واحد، ومن غير ما تكتب كود HTTP أو parsing بإيدك.`,
            how: R`[[create(PostsApi::class.java)]] بيعمل object وقت التشغيل بينفذ الـ interface (اسمه dynamic proxy). لما تنادي [[getPosts()]] بيقرا الـ annotations، يبني الـ request، يبعته بـ [[OkHttp]] (المكتبة اللي تحته فعلًا)، ويحوّل الرد بالـ converter. والـ suspend functions بيشغّلها على threads الـ OkHttp، فهي main-safe.

[[PostsApi::class.java]]: [[::class]] بيجيب الـ KClass بتاع Kotlin، و [[.java]] بيحوّله للـ Class بتاع Java اللي Retrofit (مكتبة Java) محتاجه.

لو الرد مش 2xx، الـ suspend fun بترمي [[HttpException]] (فيها [[code()]]). ولو مفيش نت أو timeout: [[IOException]]. ولو عايز تقرا الـ status والـ headers بنفسك: خلي النوع [[Response<List<Post>>]].

[[kotlinx.serialization]] بيولّد الـ serializer وقت الترجمة (بالـ plugin)، مش بالـ reflection زي Gson، فأسرع ومتوافق مع R8 من غير قواعد keep كتير. والـ property اسمها في Kotlin مختلف عن الـ JSON؟ [[@SerialName("created_at") val createdAt: String]].

ولإضافة headers زي التوكن لكل request: OkHttp [[Interceptor]]. ولمشاهدة الـ requests في Logcat وقت التطوير: [[HttpLoggingInterceptor]] (ومتسيبهوش شغال في الـ release).`,
            when: "أي تطبيق بيكلم REST API. والـ object Network ده للتعلم: في المشروع الحقيقي Hilt بيعمل الـ Retrofit مرة ويوزعه (المستوى ٣).",
            mistakes: R`baseUrl من غير [[/]] في الآخر: [[IllegalArgumentException: baseUrl must end in /]]. ونسيان صلاحية INTERNET. ونسيان [[ignoreUnknownKeys]] فالتطبيق يقع أول ما الـ backend يضيف field جديد. ونسيان [[@Serializable]] على كلاس متداخل جوه الـ response. واستخدام [[http://]] لسيرفر محلي: Android بيمنع الـ cleartext افتراضيًا، والـ emulator بيوصل لجهازك على [[10.0.2.2]] مش localhost.`
          },
          teach: R`## الكود بيعمل إيه؟

بيوصف API فيه endpoints للـ posts كـ [[interface]]، و Retrofit بيكتب التنفيذ: يبعت الـ HTTP request، ويستقبل الـ JSON، ويحوّله لـ [[Post]] أو [[List<Post>]] بـ kotlinx.serialization.

### اتجرّب فين؟

الكود ده مش Android-only: Retrofit و OkHttp و kotlinx.serialization مكتبات JVM. فشغّلته بـ Kotlin 2.4.20 جوه [[docker run --rm eclipse-temurin:21-jdk]] مع الـ jars دي على الـ classpath: [[retrofit-3.0.0]] و [[converter-kotlinx-serialization-3.0.0]] و [[okhttp-4.12.0]] و [[okio-jvm]] و [[kotlinx-serialization-json-jvm-1.9.0]]، والترجمة بالـ plugin بتاع serialization اللي جاي مع الـ compiler:

~~~bash
kotlinc -Xplugin=kotlinc/lib/kotlinx-serialization-compiler-plugin.jar -cp "<الـ jars>" rf1.kt -d out
~~~

و jsonplaceholder مكانش بيوصل من الجهاز ده، فعملت API وهمي صغير بـ Node على الجهاز (port 5997) بيرجّع نفس شكل jsonplaceholder، والـ container بيوصله على [[http://host.docker.internal:5997/]]. الـ baseUrl بس اللي اتغير.

~~~text الـ JSON اللي السيرفر الوهمي بيرجّعه لـ /posts/1
{"userId":1,"id":1,"title":"أول بوست","body":"أهلا"}
~~~

لاحظ إن فيه [[userId]] ومش موجود في الـ data class. ده مقصود (زي jsonplaceholder بالظبط).

---

## ١. الـ imports اللي المثال محتاجها

المثال مكتوب من غير imports. اللي استخدمتها عشان يترجم:

~~~kotlin
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import retrofit2.Retrofit
import retrofit2.converter.kotlinx.serialization.asConverterFactory
import retrofit2.http.GET
import retrofit2.http.Path
~~~

Android Studio بيضيفهم لوحده بـ Alt+Enter على أي اسم أحمر.

---

## ٢. الـ data class: [[@Serializable]]

~~~kotlin
@Serializable
data class Post(val id: Int, val title: String, val body: String)
~~~

- [[@Serializable]]: annotation (حاجة بتتكتب بـ [[@]] فوق الكلاس وبتدي معلومة للمترجم). الـ plugin بتاع serialization بيشوفها وبيولّد **وقت الترجمة** كود بيحوّل الكلاس من وإلى JSON (اسمه serializer).
- أسماء الـ properties لازم تبقى نفس أسماء الـ keys في الـ JSON: [["id"]] و [["title"]] و [["body"]].
- [[data class]]: عشان [[toString]] و [[equals]] جاهزين (درس Data Classes). طبعت [[getPost(1)]]:

~~~text الناتج
Post(id=1, title=أول بوست, body=أهلا)
~~~

---

## ٣. الـ API كـ interface

~~~kotlin
interface PostsApi {
    @GET("posts")
    suspend fun getPosts(): List<Post>
    @GET("posts/{id}")
    suspend fun getPost(@Path("id") id: Int): Post
}
~~~

- [[interface]]: انت بتكتب **شكل** الدوال بس من غير جسم. التنفيذ Retrofit هيعمله.
- [[@GET("posts")]]: الدالة دي request من نوع GET على المسار [[posts]]، اللي بيتلزق في آخر الـ baseUrl: [[http://host.docker.internal:5997/posts]].
- [[suspend]]: النداء بياخد وقت (شبكة)، فبيتنادى من coroutine ومبيجمّدش الـ thread (درس coroutines).
- [[: List<Post>]]: نوع الرجوع. Retrofit بيبص عليه وبيطلب من الـ converter يحوّل الـ JSON array لـ List من Post.
- [[{id}]] في المسار: مكان فاضي. و [[@Path("id") id: Int]]: «حط قيمة الـ parameter ده مكان [[{id}]]». فـ [[getPost(1)]] بتبعت [[GET /posts/1]].

دي الـ requests اللي السيرفر الوهمي سجّلها لما شغّلت المثال:

~~~text لوج السيرفر
GET /posts/1 okhttp/4.12.0
GET /posts okhttp/4.12.0
~~~

[[okhttp/4.12.0]] هو الـ User-Agent: ده دليل إن OkHttp هو اللي بعت فعلًا، Retrofit طبقة فوقه.

---

## ٤. [[object Network]]: نبني Retrofit مرة واحدة

~~~kotlin
object Network {
    private val json = Json { ignoreUnknownKeys = true }
    val api: PostsApi = Retrofit.Builder()
        .baseUrl("https://jsonplaceholder.typicode.com/")
        .addConverterFactory(json.asConverterFactory("application/json".toMediaType()))
        .build()
        .create(PostsApi::class.java)
}
~~~

[[object]]: singleton، نسخة واحدة في التطبيق كله (درس object و companion). بيتعمل أول مرة حد يلمسه.

### [[Json { ignoreUnknownKeys = true }]]

إعدادات الـ JSON. [[ignoreUnknownKeys]] = «لو جه key مش في الكلاس، تجاهله». جرّبت نفس النداء بـ [[Json]] العادي من غير الإعداد ده:

~~~text الناتج
kotlinx.serialization.json.internal.JsonDecodingException: Encountered an unknown key 'userId' at offset 2 at path: $
Use 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.
~~~

- [[offset 2]]: مكان الحرف في النص اللي فيه المشكلة، و [[path: $]] يعني في الـ object الرئيسي.
- [[JsonDecodingException]] نوعه [[SerializationException]] (اتأكدت بـ catch على النوع ده).

ده ليه مهم: الـ backend بيضيف fields طول الوقت، ومن غير الإعداد ده التطبيق القديم عند اليوزرز هيقع.

### [[Retrofit.Builder()]] والسلسلة

ده **builder pattern**: كل دالة بتظبط حاجة وبترجّع نفس الـ builder، فبتكتبهم ورا بعض بالنقطة:

| الخطوة | بتعمل إيه |
|---|---|
| [[.baseUrl("...")]] | أول الـ URL، والمسارات اللي في [[@GET]] بتتلزق بعده |
| [[.addConverterFactory(...)]] | مين اللي هيحوّل JSON لـ objects |
| [[.build()]] | اعمل object الـ [[Retrofit]] |
| [[.create(PostsApi::class.java)]] | اعمل تنفيذ للـ interface |

### الـ [[/]] في آخر الـ baseUrl

جرّبت baseUrl من غير [[/]] في الآخر بعد مسار:

~~~text الناتج
java.lang.IllegalArgumentException: baseUrl must end in /: http://host.docker.internal:5997/api
~~~

الـ exception بيترمي وقت [[baseUrl()]] نفسها، قبل أي request.

### [[json.asConverterFactory("application/json".toMediaType())]]

- [[asConverterFactory]]: extension function (من مكتبة [[converter-kotlinx-serialization]]) بتلف إعدادات الـ Json في شكل Retrofit فاهمه.
- [["application/json".toMediaType()]]: [[toMediaType]] extension من OkHttp بتحوّل النص لـ [[MediaType]]، وده الـ Content-Type اللي هيتكتب لو بعتّ [[@Body]].

### [[PostsApi::class.java]]

طبعت الاتنين:

~~~text الناتج
PostsApi::class = interface PostsApi (Kotlin reflection is not available), .java = interface PostsApi
~~~

- [[::class]]: الكلاس كـ object من نوع [[KClass]] (بتاع Kotlin).
- [[.java]]: نفس الكلاس كـ [[Class]] بتاع Java، لأن Retrofit مكتوب Java وده اللي بياخده.

### الـ api ده إيه أصلًا؟

طبعت اسم كلاس الـ object اللي [[create]] رجّعه:

~~~text الناتج
api object: jdk.proxy1.$Proxy0
~~~

[[$Proxy0]] كلاس اتعمل **وقت التشغيل** (dynamic proxy من Java). أي دالة تناديها عليه بتروح لـ Retrofit، اللي بيقرا الـ annotations بتاعتها ويبني الـ request.

---

## ٥. النداء والأخطاء

~~~kotlin
println(api.getPost(1).title)
println(api.getPosts().size)
~~~

~~~text الناتج
أول بوست
2
~~~

وجرّبت كل نوع فشل:

| الحالة | اللي اترمى |
|---|---|
| [[getPost(999)]] والسيرفر رد 404 | [[HttpException]]، و [[e.code()]] = [[404]]، والرسالة [[HTTP 404 Not Found]] |
| port مفيهوش سيرفر | [[java.net.ConnectException: Failed to connect to /127.0.0.1:5998]] |
| اسم دومين مش موجود | [[java.net.UnknownHostException: no-such-host.invalid: Name or service not known]] |
| JSON فيه key زيادة من غير ignoreUnknownKeys | [[JsonDecodingException]] (SerializationException) |

[[ConnectException]] و [[UnknownHostException]] الاتنين نوعهم [[IOException]]: مشكلة نت. و [[HttpException]] معناها السيرفر وصل ورد بغلط. الفرق ده هو اللي درس «loading و error» بيبني عليه.

> في Android لو نسيت صلاحية [[INTERNET]] في الـ manifest، كل نداء بيقع حتى والنت شغال: غالبًا [[SocketException: socket failed: EPERM (Operation not permitted)]] أو [[UnknownHostException]] (ده من الـ docs، مفيش emulator هنا).

---

## ٦. حل التجربة (solCode): [[@Query]]

~~~kotlin
@Serializable
data class Comment(val id: Int, val postId: Int, val name: String, val email: String, val body: String)

    @GET("comments")
    suspend fun getComments(@Query("postId") postId: Int): List<Comment>
~~~

[[@Query("postId")]]: بيضيف القيمة كـ query string في آخر الـ URL. [[getComments(1)]]:

~~~text لوج السيرفر
GET /comments?postId=1 okhttp/4.12.0
~~~

~~~text الناتج
[Comment(id=1, postId=1, name=Omar, email=omar@example.com, body=حلو)]
~~~

| الـ annotation | بتحط القيمة فين | مثال |
|---|---|---|
| [[@Path("id")]] | جوه المسار مكان [[{id}]] | [[/posts/1]] |
| [[@Query("page")]] | بعد [[?]] | [[/posts?page=2]] |
| [[@Body]] | جسم الـ request كـ JSON (مع POST و PUT) | [[{"title":"..."}]] |

---

## الخلاصة

- [[@Serializable]] على الـ data class + plugin الـ serialization في Gradle.
- الـ API = interface، كل دالة [[suspend]] وعليها [[@GET]] أو [[@POST]]...
- [[Retrofit.Builder()]] مرة واحدة: [[baseUrl]] بـ [[/]] في الآخر، و converter، و [[create]].
- [[ignoreUnknownKeys = true]] دايمًا تقريبًا.
- [[IOException]] = مشكلة نت، [[HttpException]] = السيرفر رد بغلط.`,
          lines: [
            "الكلاس ينفع يتحوّل من وإلى JSON.",
            "الـ data class بنفس أسماء الـ JSON.",
            "الـ API كـ interface.",
            R`[[@GET]] على المسار ده (بعد الـ baseUrl).`,
            R`[[suspend]] وبترجّع List من الـ JSON على طول.`,
            R`مسار فيه parameter بين [[{ }]].`,
            R`[[@Path]]: القيمة دي بتتحط مكان [[{id}]].`,
            "قفلة.",
            "object واحد للشبكة (Hilt أحسن في المشاريع الكبيرة).",
            "إعدادات الـ JSON.",
            "نبني Retrofit.",
            R`عنوان الـ API، ولازم يخلص بـ [[/]].`,
            "التحويل بـ kotlinx.serialization.",
            "بناء.",
            R`Retrofit يعمل تنفيذ الـ interface.`,
            "قفلة."
          ],
          sol: R`في Logcat: [[D/API: sunt aut facere repellat provident occaecati excepturi optio reprehenderit]] (عنوان أول post في jsonplaceholder).

لو وقع والنت شغال بـ [[SocketException: socket failed: EPERM (Operation not permitted)]] أو [[UnknownHostException]]: نسيت صلاحية INTERNET. ولو [[SerializationException: ... Encountered an unknown key]]: نسيت [[ignoreUnknownKeys]].

وحل التجربة تحت. والـ dependencies في الـ catalog: [[com.squareup.retrofit2:retrofit]] و [[com.squareup.retrofit2:converter-kotlinx-serialization]] (بنفس نسخة retrofit) و [[org.jetbrains.kotlinx:kotlinx-serialization-json]].`,
          solCode: R`@Serializable
data class Comment(val id: Int, val postId: Int, val name: String, val email: String, val body: String)

interface PostsApi {
    @GET("posts")
    suspend fun getPosts(): List<Post>

    @GET("posts/{id}")
    suspend fun getPost(@Path("id") id: Int): Post

    @GET("comments")
    suspend fun getComments(@Query("postId") postId: Int): List<Comment>
}`
        },
        {
          cmd: "loading و error",
          title: "loading و success و error: الـ ViewModel يجيب داتا من الـ API والشاشة تعرض كل حالة",
          desc: R`أي شاشة بتجيب داتا ليها ٣ حالات على الأقل، فبتعملها sealed interface (درس enum و sealed):
• [[Loading]]: spinner.
• [[Success(posts)]]: اللستة.
• [[Error(message)]]: رسالة وزرار «جرّب تاني».

الـ ViewModel:
• بيبدأ بـ Loading، وبيجيب الداتا في [[init]] (أول ما يتعمل)، مش في الـ composable، عشان الـ rotation ميعيدش النداء.
• [[viewModelScope.launch]] وجواها [[try]]: لو نجح Success، ولو [[IOException]] (مفيش نت) أو [[HttpException]] (السيرفر رد بغلط) يبقى Error برسالة مفهومة.
• [[load()]] public عشان زرار «جرّب تاني» يناديها.

الشاشة:
• [[when (val s = state)]]: الـ [[val]] جوه الـ when بتدي اسم للقيمة، و smart cast بيشتغل عليها في كل فرع.
• [[vm::load]]: الدالة نفسها كـ onClick.

و [[class PostsViewModel(private val api: PostsApi = Network.api)]]: لأن كل الـ parameters ليها قيم افتراضية، Kotlin بتعمل constructor فاضي كمان، فـ [[viewModel()]] تقدر تعمله من غير factory. وفي الاختبار تبعت API وهمي.`,
          example: R`sealed interface PostsUiState {
    data object Loading : PostsUiState
    data class Success(val posts: List<Post>) : PostsUiState
    data class Error(val message: String) : PostsUiState
}
class PostsViewModel(private val api: PostsApi = Network.api) : ViewModel() {
    private val _state = MutableStateFlow<PostsUiState>(PostsUiState.Loading)
    val state: StateFlow<PostsUiState> = _state.asStateFlow()
    init { load() }
    fun load() {
        _state.value = PostsUiState.Loading
        viewModelScope.launch {
            _state.value = try {
                PostsUiState.Success(api.getPosts())
            } catch (e: IOException) {
                PostsUiState.Error("مفيش نت، جرّب تاني")
            } catch (e: HttpException) {
                PostsUiState.Error("السيرفر رد بـ $__{e.code()}")
            }
        }
    }
}
@Composable
fun PostsScreen(vm: PostsViewModel = viewModel()) {
    val state by vm.state.collectAsStateWithLifecycle()
    when (val s = state) {
        PostsUiState.Loading -> CircularProgressIndicator()
        is PostsUiState.Error -> Button(onClick = vm::load) { Text("$__{s.message} - إعادة") }
        is PostsUiState.Success -> LazyColumn {
            items(s.posts, key = { it.id }) { Text(it.title, Modifier.padding(16.dp)) }
        }
    }
}`,
          try: R`شغّل الشاشة، وبعدين اقفل النت من الـ emulator (Airplane mode) ودوس «إعادة»: هتشوف Error. افتح النت ودوس تاني. بعدين ضيف حالة [[Empty]] لو اللستة رجعت فاضية، وشوف المترجم بيطلب منك تضيف فرعها في الشاشة.`,
          flag: "script",
          deep: {
            why: R`أكتر شكوى من التطبيقات: شاشة بيضا من غير أي تفسير، أو spinner لافف للأبد. لما الحالات تبقى sealed، كل حالة ليها شكل، والمترجم بيمنعك تنسى واحدة.`,
            how: R`[[_state.value = try { ... } catch ...]]: الـ [[try]] تعبير بيرجّع قيمة (درس exceptions)، فبنحط النتيجة في الـ state مرة واحدة.

[[MutableStateFlow<PostsUiState>(PostsUiState.Loading)]]: لازم نكتب النوع العام بين [[< >]]، وإلا النوع هيبقى [[Loading]] بس ومش هنعرف نحط فيه Success.

مسكنا IOException و HttpException بس، مش [[Exception]]: لو فيه bug حقيقي (NullPointerException مثلًا) نشوفه crash ونصلحه، بدل ما يستخبى ورا «حصل خطأ». وكمان ده بيحافظ على CancellationException.

في Compose الـ [[when]] بيرسم حاجة مختلفة لكل حالة، ولما الحالة تتغير Compose بيشيل القديم ويرسم الجديد.

ولو عايز تحافظ على الداتا القديمة وانت بتعمل refresh (pull to refresh)، الـ sealed مش كفاية: اعمل data class فيه [[isLoading]] و [[posts]] و [[error]] مع بعض. الاتنين أساليب مشهورة، واختار حسب الشاشة.`,
            when: "أي شاشة بتجيب داتا من شبكة أو داتابيز. ده تقريبًا شكل كل ViewModel هتكتبه.",
            mistakes: R`تنادي الـ API من جوه الـ composable مباشرة فيتنادى مع كل recomposition. وتعرض [[e.message]] الخام لليوزر (رسايل إنجليزي تقنية). وتنسى ترجّع الحالة لـ Loading في [[load()]] فزرار الإعادة ميبانش إنه اشتغل.`
          },
          teach: R`## الكود بيعمل إيه؟

٣ حتت: sealed interface فيه حالات الشاشة، و ViewModel بيجيب الـ posts من الـ API ويحط الحالة المناسبة في StateFlow، و composable بيرسم حاجة مختلفة لكل حالة.

### اتجرّب فين؟

الـ ViewModel و Compose محتاجين Android، ومفيش emulator هنا. فعملت نسخة JVM من نفس المنطق جوه [[docker run --rm eclipse-temurin:21-jdk]] (Kotlin 2.4.20 و Retrofit 3.0.0 و kotlinx-coroutines 1.10.2):

- الـ sealed interface ودالة [[load()]] **زي المثال حرف بحرف**.
- [[viewModelScope]] اتبدل بـ [[CoroutineScope(SupervisorJob() + Dispatchers.Default)]] (ده تقريبًا اللي viewModelScope عليه، بس على Main).
- الشاشة اتبدلت بدالة [[render]] فيها نفس الـ [[when]] بتطلّع نص بدل ما ترسم.
- الـ API هو السيرفر الوهمي بتاع درس Retrofit (Node على port 5997).

وجرّبت التلات حالات:

~~~text الناتج
== شغال
لستة: أول بوست, تاني بوست
== مفيش سيرفر
زرار: مفيش نت، جرّب تاني - إعادة
== مسار غلط
زرار: السيرفر رد بـ 404 - إعادة
~~~

- «مفيش سيرفر»: baseUrl على port مفيهوش حاجة، فـ OkHttp رمى [[ConnectException]] (نوعه IOException). ده نفس اللي بيحصل في Airplane mode.
- «مسار غلط»: السيرفر وصل بس رد 404، فـ Retrofit رمى [[HttpException]].

---

## ١. الحالات: [[sealed interface]]

~~~kotlin
sealed interface PostsUiState {
    data object Loading : PostsUiState
    data class Success(val posts: List<Post>) : PostsUiState
    data class Error(val message: String) : PostsUiState
}
~~~

- [[sealed]]: كل الأنواع اللي بتنفّذ الـ interface ده لازم تبقى في نفس الـ module والـ package، فالمترجم عارفهم كلهم (درس enum و sealed). ودي اللي بتخليه يجبرك تغطيهم كلهم في [[when]].
- [[data object Loading]]: حالة مفيهاش داتا، فـ object واحد يكفي. [[data]] بتخلي [[toString()]] يطلع [[Loading]] بدل اسم غريب بعنوان.
- [[data class Success(val posts: List<Post>)]]: الحالة دي شايلة الداتا.
- [[data class Error(val message: String)]]: شايلة الرسالة اللي هتتعرض.
- [[: PostsUiState]]: كل واحدة «نوع من» PostsUiState.

---

## ٢. الـ ViewModel

~~~kotlin
class PostsViewModel(private val api: PostsApi = Network.api) : ViewModel() {
~~~

- [[private val api: PostsApi]]: الـ ViewModel بياخد الـ API من برا (constructor) بدل ما يعمله جواه، فتقدر تبعتله API وهمي في الاختبار. في التجربة بعتّ 3 APIs بـ 3 baseUrls مختلفة لنفس الكلاس.
- [[= Network.api]]: قيمة افتراضية. ولأن كل الـ parameters ليها قيم افتراضية، Kotlin على الـ JVM بتعمل كمان constructor من غير parameters، وده اللي [[viewModel()]] بتحتاجه عشان تعمل الـ ViewModel من غير factory.
- [[: ViewModel()]]: بيورث من [[androidx.lifecycle.ViewModel]]، فبيعيش أطول من الشاشة وقت الـ rotation.

### الـ state

~~~kotlin
    private val _state = MutableStateFlow<PostsUiState>(PostsUiState.Loading)
    val state: StateFlow<PostsUiState> = _state.asStateFlow()
~~~

- [[_state]] (بشرطة تحتية): النسخة اللي بتتكتب، [[private]] فمحدش برا يغيّرها.
- [[state]]: نفس الداتا بس [[StateFlow]] (قراية بس). [[asStateFlow()]] بتلفّها عشان محدش يعمل cast ويكتب فيها.
- [[<PostsUiState>]] بين [[< >]]: **لازم**. جرّبت [[MutableStateFlow(S.Loading)]] من غيرها وبعدين حطيت فيها Error:

~~~text الناتج
le3.kt:8:14: error: assignment type mismatch: actual type is 'S.Error', but 'S.Loading' was expected.
~~~

المترجم استنتج النوع من القيمة الأولى ([[Loading]] بس)، فمينفعش يتحط فيه غيرها.

### [[init { load() }]]

[[init]] block بيتنفذ مرة واحدة لما الـ object يتعمل. فالتحميل بيبدأ أول ما الـ ViewModel يتعمل، والـ rotation مش بيعمله تاني (الـ ViewModel نفسه فاضل).

### [[load()]]

~~~kotlin
    fun load() {
        _state.value = PostsUiState.Loading
        viewModelScope.launch {
            _state.value = try {
                PostsUiState.Success(api.getPosts())
            } catch (e: IOException) {
                PostsUiState.Error("مفيش نت، جرّب تاني")
            } catch (e: HttpException) {
                PostsUiState.Error("السيرفر رد بـ $__{e.code()}")
            }
        }
    }
~~~

1. [[_state.value = PostsUiState.Loading]]: ارجع لـ Loading الأول، عشان لما اليوزر يدوس «إعادة» يشوف spinner.
2. [[viewModelScope.launch]]: [[getPosts()]] suspend، فلازم coroutine. والـ scope ده بيلغيها لو الشاشة اتقفلت نهائيًا.
3. [[_state.value = try { ... } catch ...]]: [[try]] في Kotlin تعبير بيرجّع قيمة (درس exceptions و Result): آخر سطر في الفرع اللي اتنفذ. فالـ state بيتكتب مرة واحدة في الآخر.
4. [[catch (e: IOException)]]: مشكلة نت (مفيش اتصال، timeout، DNS).
5. [[catch (e: HttpException)]]: السيرفر رد بكود مش 2xx. [[e.code()]] هو الرقم (404، 500...).

ليه مش [[catch (e: Exception)]]؟ لأنها هتبلع كمان [[CancellationException]] (اللي بيلغي الـ coroutine) وأي bug حقيقي. الأحسن bug يطلع crash تشوفه وتصلحه.

### «جرّب تاني»

سمعت على الـ state بـ collect، وبعد ما الداتا وصلت ناديت [[load()]] تاني:

~~~text الناتج
[لستة: أول بوست, تاني بوست, spinner, لستة: أول بوست, تاني بوست]
~~~

الـ spinner ظهر في النص بسبب السطر الأول في [[load()]].

---

## ٣. الشاشة

~~~kotlin
@Composable
fun PostsScreen(vm: PostsViewModel = viewModel()) {
    val state by vm.state.collectAsStateWithLifecycle()
~~~

- [[vm: PostsViewModel = viewModel()]]: [[viewModel()]] بتجيب الـ ViewModel المربوط بالشاشة دي، أو تعمله أول مرة (درس الـ ViewModel).
- [[collectAsStateWithLifecycle()]]: بتسمع الـ StateFlow وبتحوّله لـ Compose state، فالشاشة بتترسم من جديد مع كل حالة. و [[WithLifecycle]] يعني بتبطل تسمع لما التطبيق يروح الخلفية. ومحتاجة [[lifecycle-runtime-compose]].
- [[by]]: delegate، فـ [[state]] بقت القيمة نفسها مش State object.

~~~kotlin
    when (val s = state) {
        PostsUiState.Loading -> CircularProgressIndicator()
        is PostsUiState.Error -> Button(onClick = vm::load) { Text("$__{s.message} - إعادة") }
        is PostsUiState.Success -> LazyColumn {
            items(s.posts, key = { it.id }) { Text(it.title, Modifier.padding(16.dp)) }
        }
    }
}
~~~

- [[when (val s = state)]]: بنحط القيمة في [[val]] جديد جوه الـ when. ليه؟ [[state]] جاي من delegate، والـ smart cast مبيشتغلش على properties بـ delegate (ممكن قيمتها تتغير بين الفحص والاستخدام). [[s]] متغير local ثابت، فالـ smart cast شغال عليه.
- [[PostsUiState.Loading ->]]: من غير [[is]] لأنه object واحد، فبيتقارن بالمساواة.
- [[is PostsUiState.Error ->]]: [[is]] بتفحص النوع، وجوه الفرع [[s]] بقى نوعه [[Error]] فـ [[s.message]] متاحة.
- [[vm::load]]: function reference: الدالة نفسها كقيمة، يعني «لما الزرار يتداس، نادي [[vm.load()]]». نفس [[onClick = { vm.load() }]].
- [[items(s.posts, key = { it.id })]]: عنصر لكل post، و [[key]] بيخلي Compose يعرف كل عنصر بالـ id بتاعه (درس LazyColumn).

الشاشة نفسها Android بس، فده من الـ docs. اللي اتجرّب هو الـ [[when]] بنفس الفروع في [[render]].

---

## ٤. التجربة: حالة [[Empty]]

ضفت حالة جديدة للـ sealed interface ومضفتهاش في الـ when (والـ when هنا statement مش بترجّع قيمة):

~~~text الناتج
le2.kt:7:5: error: 'when' expression must be exhaustive. Add the 'Empty' branch or an 'else' branch.
~~~

ده الهدف كله من sealed: أي حالة جديدة، المترجم بيوريك كل مكان محتاج يتعدل.

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[sealed interface]] + [[data object]] / [[data class]] | الحالات، والمترجم عارفهم كلهم |
| [[MutableStateFlow<النوع>(Loading)]] | الحالة الحالية، والنوع العام لازم يتكتب |
| [[init { load() }]] | يحمّل مرة لما الـ ViewModel يتعمل، مش مع كل rotation |
| [[_state.value = try { } catch { }]] | النتيجة أو رسالة مفهومة |
| [[IOException]] / [[HttpException]] | مفيش نت / السيرفر رد بغلط |
| [[when (val s = state)]] | رسمة لكل حالة، و smart cast |

- متناديش الـ API من جوه الـ composable: مكانه الـ ViewModel.
- متمسكش [[Exception]] عامة جوه coroutine.`,
          lines: [
            "الحالات.",
            "بيحمّل.",
            "خلص ومعاه الداتا.",
            "فشل ومعاه رسالة.",
            "قفلة.",
            "الـ ViewModel، والـ API قيمته الافتراضية الحقيقية (وفي الاختبار نبعت fake).",
            "الـ state الداخلي ونوعه العام، ويبدأ Loading.",
            "النسخة للقراية.",
            R`[[init]]: أول ما يتعمل يجيب الداتا.`,
            "دالة التحميل.",
            "ارجع لـ Loading.",
            R`coroutine هتتلغي لوحدها لو الشاشة خرجت.`,
            R`نتيجة الـ [[try]] كلها رايحة للـ state.`,
            "نجح: Success بالداتا.",
            "مفيش نت أو timeout.",
            "رسالة مفهومة.",
            "السيرفر رد بـ 4xx أو 5xx.",
            "رسالة فيها الكود.",
            "قفلة try.",
            "قفلة launch.",
            "قفلة load.",
            "قفلة الكلاس.",
            R`[[@Composable]].`,
            "الشاشة.",
            "نسمع الـ state.",
            R`[[when]] على الحالة، و [[val s]] عشان الـ smart cast.`,
            "spinner.",
            "زرار فيه الرسالة وبيعيد التحميل.",
            "اللستة.",
            "عنصر لكل post.",
            "قفلة LazyColumn.",
            "قفلة when.",
            "قفلة."
          ],
          sol: R`مع النت: spinner ثانية وبعدين ١٠٠ عنوان. من غير نت: زرار «مفيش نت، جرّب تاني - إعادة». والدوسة بترجّع الـ spinner وبعدين اللستة لو النت رجع.

ولما تضيف [[data object Empty : PostsUiState]]، الـ [[when]] في الشاشة هيطلّع غلط إنها مش مغطية كل الحالات. ده بيحصل حتى لو الـ when مش بترجّع قيمة: من Kotlin 1.7 أي when على sealed أو enum لازم تغطي كل الحالات. ضيف [[PostsUiState.Empty -> Text("مفيش posts")]]، وفي الـ ViewModel: [[val posts = api.getPosts(); if (posts.isEmpty()) PostsUiState.Empty else PostsUiState.Success(posts)]].`
        },
        {
          cmd: "Coil",
          title: "تعرض صورة من الإنترنت إزاي؟ (AsyncImage من Coil)",
          desc: R`Compose مبيعرفش يحمّل صورة من URL لوحده. المكتبة المشهورة لده [[Coil]] (مكتوبة Kotlin ومبنية على coroutines). من Coil 3 الـ group بقى [[io.coil-kt.coil3]]، ومحتاج مكتبتين:
• [[coil-compose]]: فيها [[AsyncImage]].
• [[coil-network-okhttp]]: عشان التحميل من الشبكة (من غيرها الصور من URL مش هتظهر في Coil 3).

[[AsyncImage]]:
• [[model]]: الـ URL (أو ملف، أو resource).
• [[contentDescription]]: وصف للصورة بيقراه TalkBack للي مبيشوفوش. لو الصورة زينة بس: [[null]].
• [[contentScale = ContentScale.Crop]]: املا المساحة وقص الزيادة (زي cover في CSS). و [[Fit]] تبان كلها.
• [[placeholder]] و [[error]]: صورة وقت التحميل، وصورة لو فشل.

وتقدر تقص الشكل بالـ Modifier: [[clip(CircleShape)]] للصور الشخصية.

Coil بيعمل cache في الذاكرة وعلى الديسك لوحده، فنفس الصورة مش بتتحمل مرتين، وبيصغّر الصورة لمقاس العنصر عشان ميضيعش ذاكرة.

والبديل [[Glide]]: أقدم ومنتشر في مشاريع XML.`,
          example: R`@Composable
fun Avatar(url: String?, name: String, modifier: Modifier = Modifier) {
    AsyncImage(
        model = url,
        contentDescription = "صورة $name",
        contentScale = ContentScale.Crop,
        placeholder = painterResource(R.drawable.avatar_placeholder),
        error = painterResource(R.drawable.avatar_placeholder),
        modifier = modifier.size(72.dp).clip(CircleShape)
    )
}
@Composable
fun AvatarRow() {
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        Avatar(url = "https://i.pravatar.cc/150?img=5", name = "Sara")
        Avatar(url = null, name = "Omar")
    }
}`,
          try: R`ضيف الـ dependencies وحط [[avatar_placeholder]] في [[res/drawable]] (أي vector من New ثم Vector Asset). اعرض الـ AvatarRow. وبعدين غيّر الـ URL لحاجة غلط وشوف الـ error. وجرّب [[ContentScale.Fit]] مع صورة مستطيلة.`,
          flag: "script",
          deep: {
            why: R`أي تطبيق فيه صور: منتجات، بروفايلات، بوستات. وتحميل الصور صح صعب: cache، وتصغير، وإلغاء التحميل لما العنصر يخرج من الشاشة في LazyColumn. Coil بيعمل كل ده.`,
            how: R`[[AsyncImage]] بيقيس المساحة المتاحة الأول، وبعدين يطلب الصورة بالمقاس ده بس (مش صورة 4000 بكسل لعنصر 72dp). التحميل بيحصل في coroutine مربوطة بالـ composable: لو العنصر خرج من الشاشة، التحميل بيتلغي.

الـ [[ImageLoader]] اللي بيعمل الشغل واحد للتطبيق كله (singleton)، وتقدر تظبطه (حجم الـ cache، الـ OkHttp client بالتوكن) بـ [[setSingletonImageLoaderFactory]] في أول التطبيق.

[[url: String?]] nullable: لو null بيعرض الـ [[error]] (أو [[fallback]] لو حددته) من غير ما يحاول.

ولو محتاج تتحكم في كل حالة بشكل مختلف (spinner وقت التحميل مثلًا): [[SubcomposeAsyncImage]] بـ [[loading = { CircularProgressIndicator() }]]، بس هو أتقل في LazyColumn.`,
            when: "أي صورة جاية من URL. والصور اللي جوه التطبيق نفسه (أيقونات و logos) حطها في res/drawable واستخدم painterResource على طول.",
            mistakes: R`نسيان [[coil-network-okhttp]] مع Coil 3 فالصور مبتظهرش ومفيش crash. ونسيان صلاحية INTERNET. و [[contentDescription]] فاضية لصورة مهمة فالـ accessibility يبوظ. وصورة من غير مقاس محدد جوه LazyColumn فالعناصر تتنط لما الصورة تحمّل.`
          },
          teach: R`## الكود بيعمل إيه؟

composable اسمه [[Avatar]] بيعرض صورة شخصية من URL في دايرة ٧٢dp، وبيعرض صورة بديلة وقت التحميل أو لو مفيش صورة. و [[AvatarRow]] بيعرض اتنين جنب بعض: واحد بـ URL وواحد من غير.

### اتجرّب فين؟

الكود ده محتاج شاشة Android، ومفيش emulator هنا. اللي اتعمل: اتترجم زي ما هو في مشروع Android حقيقي (AGP 9.4.1 و Kotlin 2.4.20 و [[coil-compose 3.6.3]] و [[coil-network-okhttp 3.6.3]]) بـ [[./gradlew assembleDebug]]، ومعاه [[res/drawable/avatar_placeholder.xml]] (vector بسيط). الترجمة نجحت، فالـ imports والأنواع والـ parameters صح. شكل الشاشة وسلوك التحميل من الـ docs بتاعة Coil.

الـ imports اللي احتاجها:

~~~kotlin
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import coil3.compose.AsyncImage
~~~

لاحظ [[coil3]] في الـ package: من Coil 3 كل حاجة اتنقلت من [[coil]] لـ [[coil3]]، فكود Coil 2 القديم محتاج يتعدل.

---

## ١. الدالة: [[Avatar]]

~~~kotlin
@Composable
fun Avatar(url: String?, name: String, modifier: Modifier = Modifier) {
~~~

- [[@Composable]]: دالة بترسم UI (درس مقدمة Compose).
- [[url: String?]]: [[?]] يعني ممكن تبقى null (يوزر ملوش صورة). Coil بيتعامل مع null لوحده.
- [[name: String]]: عشان الوصف بتاع الـ accessibility.
- [[modifier: Modifier = Modifier]]: العرف في Compose: أي composable بياخد modifier من برا بقيمة افتراضية [[Modifier]] الفاضي، عشان اللي بيستخدمه يقدر يضيف padding أو click (درس الـ Modifiers).

---

## ٢. [[AsyncImage]] والـ parameters

~~~kotlin
    AsyncImage(
        model = url,
        contentDescription = "صورة $name",
        contentScale = ContentScale.Crop,
        placeholder = painterResource(R.drawable.avatar_placeholder),
        error = painterResource(R.drawable.avatar_placeholder),
        modifier = modifier.size(72.dp).clip(CircleShape)
    )
}
~~~

### [[model = url]]

«حمّل إيه». اسمه model مش url لأنه بيقبل حاجات كتير: [[String]] فيه URL، أو [[File]]، أو [[Uri]] (صورة من الجاليري)، أو resource. Coil بيحمّله في coroutine (مش على الـ main thread)، وبيحفظه في cache في الذاكرة وعلى الديسك.

### [[contentDescription = "صورة $name"]]

النص اللي TalkBack (قارئ الشاشة للي مبيشوفوش) بيقوله. [[$name]] string template، فبيبقى «صورة Sara». ولو الصورة زينة ملهاش معنى: [[null]]. الـ parameter ده ملوش قيمة افتراضية في الـ signature بتاع [[AsyncImage]] (حسب الـ docs بتاعة Coil)، فلازم تكتبه حتى لو null، عشان متنساهوش.

### [[contentScale = ContentScale.Crop]]

لو الصورة مش بنفس نسبة المساحة (صورة مستطيلة في مربع):

| القيمة | النتيجة |
|---|---|
| [[ContentScale.Crop]] | الصورة بتكبر لحد ما تملا المساحة كلها، والزيادة بتتقص (زي [[object-fit: cover]] في CSS) |
| [[ContentScale.Fit]] | الصورة كلها ظاهرة، وفيه فراغ على الجنبين أو فوق وتحت (زي [[contain]]) |

للصور الشخصية [[Crop]] دايمًا، عشان الدايرة تبقى مليانة.

### [[placeholder]] و [[error]]

- [[painterResource(R.drawable.avatar_placeholder)]]: بتحوّل resource من [[res/drawable]] لـ [[Painter]] (حاجة Compose يعرف يرسمها). [[R.drawable.avatar_placeholder]] رقم بيتولّد من اسم الملف (درس AndroidManifest و res).
- [[placeholder]]: بيتعرض **وقت التحميل**.
- [[error]]: بيتعرض **لو التحميل فشل**: URL غلط، أو مفيش نت، أو 404. ولو الـ model نفسه [[null]] بيتعرض الـ [[fallback]]، ولو مش محدد بيتعرض الـ [[error]] (من الـ docs). عشان كده Omar بيظهر بالـ placeholder.

### [[modifier = modifier.size(72.dp).clip(CircleShape)]]

بنبدأ من الـ [[modifier]] اللي جالنا من برا (مش [[Modifier]] جديد)، عشان منضيعش اللي اللي نادانا حطه، وبعدين:

1. [[.size(72.dp)]]: عرض وطول ٧٢dp. المقاس الثابت مهم: Coil بيحمّل الصورة بالمقاس ده بس (مش 4000 بكسل)، وفي LazyColumn العنصر مش هيتنط لما الصورة توصل.
2. [[.clip(CircleShape)]]: اقص أي حاجة برا دايرة. [[CircleShape]] شكل جاهز، وفيه [[RoundedCornerShape(12.dp)]] لو عايز زوايا مدورة بس.

---

## ٣. [[AvatarRow]]

~~~kotlin
@Composable
fun AvatarRow() {
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        Avatar(url = "https://i.pravatar.cc/150?img=5", name = "Sara")
        Avatar(url = null, name = "Omar")
    }
}
~~~

- [[Row]]: جنب بعض (درس Column و Row و Box).
- [[Arrangement.spacedBy(8.dp)]]: مسافة ٨dp بين كل عنصر والتاني.
- [[https://i.pravatar.cc/150?img=5]]: موقع بيدّي صور تجريبية: [[150]] المقاس بالبكسل، و [[img=5]] رقم الصورة.
- [[url = null]]: مفيش صورة، فبيظهر الـ placeholder على طول من غير ما يحاول يحمّل.

---

## ٤. الـ dependencies (solCode)

~~~text gradle/libs.versions.toml
[versions]
coil = "3.6.3"

[libraries]
coil-compose = { group = "io.coil-kt.coil3", name = "coil-compose", version.ref = "coil" }
coil-network-okhttp = { group = "io.coil-kt.coil3", name = "coil-network-okhttp", version.ref = "coil" }
~~~

- [[[versions]]]: النسخة مرة واحدة، والاتنين بيشاوروا عليها بـ [[version.ref]] عشان يفضلوا نفس النسخة.
- [[group = "io.coil-kt.coil3"]]: الـ group الجديد بتاع Coil 3 (كان [[io.coil-kt]] في Coil 2).
- [[coil-compose]]: فيها [[AsyncImage]].
- [[coil-network-okhttp]]: التحميل من الشبكة. Coil 3 فصل الشبكة في مكتبة لوحدها (لأنه بقى Multiplatform وفيه أكتر من اختيار)، ومن غيرها الصور من URL **مبتظهرش ومفيش crash**: بيعرض الـ error بس.

وفي [[app/build.gradle.kts]]:

~~~kotlin
implementation(libs.coil.compose)
implementation(libs.coil.network.okhttp)
~~~

الشرَط في الاسم بتتحول لنقط: [[coil-network-okhttp]] تبقى [[libs.coil.network.okhttp]] (درس Gradle و libs.versions.toml). ده بالظبط اللي استخدمته في المشروع اللي اتترجم، ومعاه صلاحية [[INTERNET]] في الـ manifest.

---

## الخلاصة

| الـ parameter | دوره |
|---|---|
| [[model]] | الصورة: URL أو ملف أو Uri، و null مسموح |
| [[contentDescription]] | وصف لقارئ الشاشة، أو null لو زينة |
| [[contentScale]] | [[Crop]] يملا ويقص، [[Fit]] يبيّن كله |
| [[placeholder]] / [[error]] | وقت التحميل / لو فشل أو null |
| [[modifier.size(..).clip(..)]] | مقاس ثابت وشكل |

- Coil 3 = [[coil3]] في الـ imports، و [[io.coil-kt.coil3]] في Gradle، ولازم [[coil-network-okhttp]] للصور من النت.`,
          lines: [
            R`[[@Composable]].`,
            "صورة شخصية: الـ URL ممكن null.",
            R`[[AsyncImage]] من Coil.`,
            "اللي هيتحمّل.",
            "وصف للـ accessibility.",
            "املا وقص.",
            "صورة وقت التحميل.",
            "صورة لو فشل أو null.",
            "مقاس ثابت ودايرة.",
            "قفلة.",
            "قفلة.",
            R`[[@Composable]].`,
            "صف صور.",
            "جنب بعض بمسافة.",
            "صورة من النت.",
            "من غير صورة: هيعرض الـ placeholder.",
            "قفلة Row.",
            "قفلة."
          ],
          sol: R`دايرتين: الأولى صورة حقيقية (بعد لحظة تحميل بيظهر الـ placeholder فيها)، والتانية الـ placeholder على طول. والـ URL الغلط بيعرض الـ error.

[[Fit]] مع صورة مستطيلة جوه مربع: الصورة كلها ظاهرة ومساحة فاضية على الجنبين أو فوق وتحت. [[Crop]]: المربع مليان والأطراف مقصوصة.

والـ dependencies في [[gradle/libs.versions.toml]] تحت (النسخة الأحدث وقت ما تعمله)، وفي [[app/build.gradle.kts]]: [[implementation(libs.coil.compose)]] و [[implementation(libs.coil.network.okhttp)]].`,
          solCode: R`[versions]
coil = "3.6.3"

[libraries]
coil-compose = { group = "io.coil-kt.coil3", name = "coil-compose", version.ref = "coil" }
coil-network-okhttp = { group = "io.coil-kt.coil3", name = "coil-network-okhttp", version.ref = "coil" }`
        }
      ]
    },
    {
      t: "التخزين والصلاحيات",
      l: 2,
      n: "DataStore للإعدادات الصغيرة، و Room لداتابيز SQLite حقيقية بترجّع Flow، وطلب الصلاحيات وقت التشغيل",
      items: [
        {
          cmd: "DataStore",
          title: "DataStore: تحفظ إعدادات صغيرة (dark mode، اللغة، أول مرة) على الجهاز",
          desc: R`[[DataStore]] (من Jetpack) بيحفظ key-value صغيرة في ملف على الجهاز، وبيقراهم كـ [[Flow]]. هو البديل الحديث لـ [[SharedPreferences]] القديمة.

الخطوات:
• [[val Context.settingsStore by preferencesDataStore(name = "settings")]]: extension property على [[Context]] (درس extension functions). الـ [[by]] هنا delegate بيضمن إن فيه نسخة واحدة بس من الـ DataStore للملف ده.
• مفتاح بنوعه: [[booleanPreferencesKey("dark_mode")]]، وفيه [[stringPreferencesKey]] و [[intPreferencesKey]]...
• القراية: [[settingsStore.data]] ده [[Flow<Preferences>]]، و [[map { prefs -> prefs[KEY] ?: false }]] يطلّع القيمة (null لو لسه محدش كتبها).
• الكتابة: [[settingsStore.edit { prefs -> prefs[KEY] = true }]]، وهي [[suspend]] فبتتنادى من coroutine.

ولأن القراية Flow، أي شاشة بتسمع هتتحدث لوحدها لما القيمة تتغير من أي مكان.

والعرف: الـ DataStore جوه class (repository) والـ ViewModel بيستخدمه، مش الـ composable مباشرة.`,
          example: R`val Context.settingsStore by preferencesDataStore(name = "settings")
class SettingsRepository(private val context: Context) {
    private val darkModeKey = booleanPreferencesKey("dark_mode")
    val darkMode: Flow<Boolean> = context.settingsStore.data
        .map { prefs -> prefs[darkModeKey] ?: false }
    suspend fun setDarkMode(enabled: Boolean) {
        context.settingsStore.edit { prefs ->
            prefs[darkModeKey] = enabled
        }
    }
}
class SettingsViewModel(private val repo: SettingsRepository) : ViewModel() {
    val darkMode: StateFlow<Boolean> = repo.darkMode
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), false)
    fun toggle(enabled: Boolean) {
        viewModelScope.launch { repo.setDarkMode(enabled) }
    }
}`,
          try: R`اعمل شاشة فيها [[Switch(checked = dark, onCheckedChange = vm::toggle)]]، ووصّل الـ dark mode بالثيم ([[NotesTheme(darkTheme = dark)]]). اقفل التطبيق خالص وافتحه: الاختيار فاضل. وضيف مفتاح [[stringPreferencesKey("user_name")]] بنفس الطريقة.`,
          flag: "script",
          deep: {
            why: R`كل تطبيق محتاج يفتكر حاجات صغيرة: الثيم، اللغة، شاف الـ onboarding ولا لأ، آخر tab. ومش منطقي تعمل داتابيز عشانهم. و SharedPreferences القديمة كانت بتقرا على الـ main thread وممكن تعمل ANR، وملهاش طريقة تبلّغك بالتغيير بشكل نضيف.`,
            how: R`DataStore بيكتب الملف كله بشكل آمن (transaction): لو التطبيق اتقفل في نص الكتابة، الملف مش بيبوظ. وكل القراية والكتابة على IO من غير ما تفكر.

مينفعش يبقى فيه object تاني للـ DataStore لنفس الملف في نفس الـ process، وإلا بيرمي exception. عشان كده الـ [[preferencesDataStore]] delegate في أول الملف (top-level) مرة واحدة.

فيه نوعين: Preferences DataStore (key-value، اللي في المثال)، و DataStore بـ object كامل typed (بـ kotlinx.serialization أو Protobuf) للإعدادات الأكبر.

DataStore مش مكان للداتا الحساسة زي التوكن من غير تشفير: الملف بيتقري لو حد عنده root أو backup. للتوكنات فيه Android Keystore مع تشفير. ومش مكان للستات كبيرة أو داتا فيها علاقات: ده شغل Room.

ولو عايز تقرا قيمة مرة واحدة (مش Flow): [[repo.darkMode.first()]] من coroutine.`,
            when: "إعدادات وتفضيلات وحاجات صغيرة. أي حاجة شكلها جدول أو محتاجة بحث، Room.",
            mistakes: R`تعمل [[preferencesDataStore]] جوه class أو دالة فيتعمل أكتر من نسخة: [[There are multiple DataStores active for the same file]]. وتغيّر نوع مفتاح بنفس الاسم (كان Boolean وبقى String) فالقراية تقع بـ ClassCastException. وتحط بيانات كتير (لستة منتجات كـ JSON) في مفتاح واحد.`
          },
          teach: R`## الكود بيعمل إيه؟

بيعمل ملف إعدادات واحد اسمه [[settings]] على الجهاز، وفيه مفتاح [[dark_mode]] نوعه Boolean. الـ repository بيقراه كـ [[Flow<Boolean>]] وبيكتبه بـ [[suspend fun]]، والـ ViewModel بيحوّل الـ Flow لـ StateFlow للشاشة.

### اتجرّب فين؟

- **الكود زي ما هو** (بـ [[Context]] و [[viewModelScope]]) اتترجم في مشروع Android حقيقي (AGP 9.4.1 و Kotlin 2.4.20 و [[datastore-preferences 1.2.0]]) بـ [[./gradlew assembleDebug]] جوه image فيها Android SDK 36. مفيش emulator، فاللي بيحصل على الموبايل نفسه من الـ docs.
- **المنطق نفسه اتشغّل**: DataStore Preferences ليها نسخة JVM ([[datastore-preferences-core-jvm 1.2.0]])، فشغّلت نفس الـ repository جوه [[docker run --rm eclipse-temurin:21-jdk]]. الفرق الوحيد: بدل [[preferencesDataStore(name = "settings")]] (اللي محتاجة Context) عملت الـ DataStore بمسار ملف:

~~~kotlin
PreferenceDataStoreFactory.createWithPath(scope = scope) { "/tmp/ds/settings.preferences_pb".toPath() }
~~~

---

## ١. الـ DataStore نفسه

~~~kotlin
val Context.settingsStore by preferencesDataStore(name = "settings")
~~~

نفكه حتة حتة:

- [[val Context.settingsStore]]: **extension property** على [[Context]] (درس extension functions): كأنك ضفت property اسمها [[settingsStore]] لكل Context. فأي Activity أو Application تقدر تكتب [[context.settingsStore]].
- [[by]]: **property delegate**: القيمة مش متخزنة في الـ property، [[preferencesDataStore]] هي اللي بترجّعها. والـ delegate ده بيعمل الـ DataStore أول مرة بس، وبعد كده بيرجّع نفس النسخة.
- [[name = "settings"]]: اسم الملف. على الموبايل بيتحفظ في [[files/datastore/settings.preferences_pb]] جوه فولدر التطبيق الخاص (من الـ docs).
- بيتكتب **top-level** (برا أي كلاس) في أول الملف، عشان يبقى فيه واحد بس.

### ليه واحد بس؟

جرّبت أعمل DataStore تاني لنفس الملف في نفس البرنامج:

~~~text الناتج
java.lang.IllegalStateException: There are multiple DataStores active for the same file: /tmp/ds/settings.preferences_pb. You should either maintain your DataStore as a singleton or confirm tha...
~~~

(الرسالة أطول، قصيتها.) لو اتنين بيكتبوا نفس الملف، ممكن واحد يمسح كتابة التاني، فالمكتبة بتمنعها.

### الملف من جوه

بعد ما كتبت [[dark_mode = true]]، الملف كان 17 byte. عرضته بـ [[od -c]]:

~~~text الناتج
0000000  \n 017  \n  \t   d   a   r   k   _   m   o   d   e 022 002  \b
0000020 001
~~~

ده **Protocol Buffers** (صيغة binary من Google، وده سبب الامتداد [[.preferences_pb]]): اسم المفتاح مكتوب نص، والقيمة [[001]] في الآخر هي [[true]]. مش ملف تفتحه وتعدّله بإيدك.

---

## ٢. الـ repository

~~~kotlin
class SettingsRepository(private val context: Context) {
    private val darkModeKey = booleanPreferencesKey("dark_mode")
~~~

- بياخد [[Context]] عشان يوصل لـ [[context.settingsStore]].
- [[booleanPreferencesKey("dark_mode")]]: مفتاح **بنوعه**. الاسم [["dark_mode"]] هو اللي بيتكتب في الملف، والنوع Boolean بيخلي القراية ترجّع [[Boolean?]] من غير cast.

| الدالة | النوع |
|---|---|
| [[booleanPreferencesKey]] | [[Boolean]] |
| [[stringPreferencesKey]] | [[String]] |
| [[intPreferencesKey]] و [[longPreferencesKey]] | [[Int]] و [[Long]] |
| [[floatPreferencesKey]] و [[doublePreferencesKey]] | [[Float]] و [[Double]] |
| [[stringSetPreferencesKey]] | [[Set<String>]] |

### القراية: Flow

~~~kotlin
    val darkMode: Flow<Boolean> = context.settingsStore.data
        .map { prefs -> prefs[darkModeKey] ?: false }
~~~

- [[settingsStore.data]]: [[Flow<Preferences>]]، كل قيمة فيه نسخة من الملف كله. طبعت الـ Preferences نفسها:

~~~text الناتج
كل الملف: {
  dark_mode = true
}
~~~

- [[.map { prefs -> ... }]]: [[map]] بتاعة Flow (درس Flow): من الـ Preferences كلها لقيمة واحدة.
- [[prefs[darkModeKey]]]: الأقواس المربعة بتجيب القيمة بالمفتاح زي الـ Map. بترجّع [[null]] لو المفتاح لسه محدش كتبه.
- [[?: false]]: الـ Elvis: لو null خليها false. فأول تشغيل خالص:

~~~text الناتج
أول قراية: false
~~~

### الكتابة: [[edit]]

~~~kotlin
    suspend fun setDarkMode(enabled: Boolean) {
        context.settingsStore.edit { prefs ->
            prefs[darkModeKey] = enabled
        }
    }
}
~~~

- [[suspend]]: لأن [[edit]] نفسها suspend (بتكتب ملف)، ولازم تتنادى من coroutine.
- [[edit { prefs -> }]]: بتدّيك نسخة تقدر تعدّلها ([[MutablePreferences]])، وبعد ما الـ lambda تخلص بتكتب الملف كله مرة واحدة كـ **transaction**: يا تتكتب كلها يا متتكتبش، فلو التطبيق اتقفل في النص الملف مش بيبوظ.
- [[prefs[darkModeKey] = enabled]]: حط القيمة.

### الـ Flow بيتحدث لوحده

سمعت على [[darkMode]] وكتبت [[true]] ثم [[true]] تاني ثم [[false]] ثم [[true]]:

~~~text الناتج
الـ Flow بعت: false
الـ Flow بعت: true
الـ Flow بعت: false
الـ Flow بعت: true
~~~

- أول قيمة [[false]]: القيمة الحالية أول ما بدأنا نسمع.
- الـ [[true]] التانية متبعتتش: [[data]] مبيبعتش لو الملف متغيرش.
- مفيش أي refresh: كل [[edit]] بتوصل لكل اللي بيسمعوا. ده اللي بيخلي الشاشة تتحدث لوحدها.

### الملف بيفضل بعد ما البرنامج يقفل

شغّلت البرنامج تاني (process جديدة) وقريت بس:

~~~text الناتج
بعد تشغيل جديد: darkMode = true
~~~

---

## ٣. الـ ViewModel

~~~kotlin
class SettingsViewModel(private val repo: SettingsRepository) : ViewModel() {
    val darkMode: StateFlow<Boolean> = repo.darkMode
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), false)
    fun toggle(enabled: Boolean) {
        viewModelScope.launch { repo.setDarkMode(enabled) }
    }
}
~~~

- [[stateIn(...)]] (درس Flow): الـ Flow يتحول StateFlow عشان الشاشة دايمًا تلاقي قيمة. شغّال طول ما فيه حد بيسمع و ٥ ثواني بعده، والقيمة الأولى [[false]].
- [[toggle]]: الشاشة بتناديها من الـ Switch، والكتابة suspend فبتتعمل جوه [[viewModelScope.launch]].

جرّبت نفس الـ [[stateIn]] بـ scope عادي (بدل viewModelScope) والملف فيه [[true]]:

~~~text الناتج
StateFlow قبل ما حد يسمع: false
StateFlow: false
StateFlow: true
~~~

ده «الفلاش» اللي في الحل: الـ StateFlow بيبدأ بالقيمة الأولى [[false]] لحد ما الملف يتقري، وبعدها بأجزاء من الثانية القيمة الحقيقية [[true]] توصل. على الموبايل ده ممكن يبان ثيم فاتح لحظة قبل الغامق.

---

## ٤. نوع المفتاح لازم يفضل زي ما هو

كتبت [[dark_mode]] كـ Boolean، وبعدين قريته بـ [[stringPreferencesKey("dark_mode")]] في متغير [[String?]]:

~~~text الناتج
java.lang.ClassCastException: class java.lang.Boolean cannot be cast to class java.lang.String
~~~

(قصيت آخر الرسالة.) المفتاح بيتعرف بالاسم بس، فلو غيّرت نوعه في نسخة جديدة من التطبيق، اليوزرز القدام عندهم القيمة القديمة بالنوع القديم. غيّر الاسم بدل النوع.

---

## ٥. الـ Factory (solCode)

~~~kotlin
    companion object {
        val Factory = viewModelFactory {
            initializer {
                val app = this[ViewModelProvider.AndroidViewModelFactory.APPLICATION_KEY]!!
                SettingsViewModel(SettingsRepository(app))
            }
        }
    }
~~~

[[viewModel()]] من غير factory بتعرف تعمل ViewModel الـ constructor بتاعه فاضي بس. [[SettingsViewModel]] محتاج repository، فبنقولها إزاي:

- [[companion object]]: حاجة على مستوى الكلاس، فتكتب [[SettingsViewModel.Factory]] (درس object و companion).
- [[viewModelFactory { initializer { } }]]: DSL من [[lifecycle-viewmodel]]: الـ [[initializer]] هو الكود اللي بيعمل الـ ViewModel.
- [[this[APPLICATION_KEY]]]: جوه الـ initializer تقدر تطلب الـ [[Application]] (وهو Context بيعيش طول عمر التطبيق). [[!!]] لأن النوع nullable وإحنا متأكدين إنه موجود في Activity عادية.
- في الشاشة: [[viewModel(factory = SettingsViewModel.Factory)]].

الكود ده اتترجم في مشروع Android من غير أخطاء، وتشغيله على الموبايل من الـ docs.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[val Context.settingsStore by preferencesDataStore("settings")]] | DataStore واحد للملف، top-level |
| [[booleanPreferencesKey("dark_mode")]] | مفتاح بنوعه |
| [[store.data.map { it[KEY] ?: default }]] | قراية كـ Flow، بيتحدث مع كل تغيير |
| [[store.edit { it[KEY] = value }]] | كتابة suspend كـ transaction |
| [[stateIn(viewModelScope, WhileSubscribed(5_000), default)]] | StateFlow للشاشة |

- أكتر من DataStore لنفس الملف = [[IllegalStateException]].
- متغيّرش نوع مفتاح موجود، ومتحطش فيه داتا كبيرة أو حساسة من غير تشفير.`,
          lines: [
            R`DataStore واحد للتطبيق كله، extension على Context، والملف اسمه settings.`,
            "repository بياخد Context.",
            "مفتاح نوعه Boolean.",
            R`[[Flow]] بالقيمة.`,
            R`[[map]]: من الـ Preferences للقيمة، و false لو مش موجودة.`,
            R`كتابة [[suspend]].`,
            R`[[edit]]: transaction آمنة.`,
            R`حط القيمة. الأقواس المربعة هنا بتوصل للمفتاح زي الـ Map.`,
            "قفلة edit.",
            "قفلة.",
            "قفلة الكلاس.",
            "الـ ViewModel بياخد الـ repository.",
            "نحوّل الـ Flow لـ StateFlow للشاشة.",
            R`[[stateIn]]: شغّال طول ما فيه حد بيسمع، وقيمة أولى false.`,
            "حدث من الشاشة.",
            "الكتابة جوه coroutine.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`الـ Switch بيقلب الثيم فورًا (لأن الـ ViewModel بيسمع الـ Flow)، وبعد ما تقفل التطبيق وتفتحه بيرجع بنفس الاختيار.

ملحوظة: أول ما التطبيق يفتح، الـ StateFlow بيبدأ بـ false لحد ما الملف يتقري (أجزاء من الثانية)، فممكن تشوف «فلاش» فاتح قبل الغامق. الحل إنك تستنى أول قيمة قبل ما ترسم الثيم، أو تخلي القيمة الأولى null وتعرض splash لحد ما توصل.

و [[SettingsViewModel]] محتاج factory (لأنه بياخد repository) أو Hilt. الكود تحت factory بسيطة تشتغل من غير Hilt.`,
          solCode: R`class SettingsViewModel(private val repo: SettingsRepository) : ViewModel() {
    // ... زي المثال

    companion object {
        val Factory = viewModelFactory {
            initializer {
                val app = this[ViewModelProvider.AndroidViewModelFactory.APPLICATION_KEY]!!
                SettingsViewModel(SettingsRepository(app))
            }
        }
    }
}

// في الشاشة:
// val vm: SettingsViewModel = viewModel(factory = SettingsViewModel.Factory)`
        },
        {
          cmd: "Room",
          title: "Room: داتابيز SQLite على الجهاز بـ @Entity و @Dao و Flow",
          desc: R`[[Room]] مكتبة Jetpack فوق SQLite (الداتابيز اللي جوه كل موبايل Android). بتكتب SQL عادي وهي بتتأكد منه وقت الترجمة، وبتحوّل الصفوف لـ data classes.

٣ أجزاء:
• [[@Entity]]: data class = جدول. [[@PrimaryKey(autoGenerate = true)]] id بيزيد لوحده. ولازم قيمته الافتراضية 0 عشان Room يعرف إنه جديد.
• [[@Dao]]: interface فيه العمليات. [[@Query("SELECT ...")]] بـ SQL، و [[@Insert]] و [[@Update]] و [[@Delete]] جاهزين. الدوال اللي بتكتب [[suspend]]، والقراية ممكن ترجّع [[Flow<List<...>>]]: كل ما الجدول يتغير، الـ Flow يبعت النتيجة الجديدة لوحده.
• [[@Database(entities = [NoteEntity::class], version = 1)]]: الكلاس اللي بيجمع كله. abstract و Room بيكتب التنفيذ. والأقواس المربعة هنا array جوه annotation.

و [[:title]] جوه الـ SQL معناها «parameter الدالة اللي اسمه title».

في Gradle: [[room-runtime]] و [[room-ktx]]، و [[ksp(libs.androidx.room.compiler)]] (الكود بيتولّد بـ KSP)، و plugin [[com.google.devtools.ksp]].

وتعمل الداتابيز مرة واحدة للتطبيق كله:
[[Room.databaseBuilder(context, AppDatabase::class.java, "notes.db").build()]]`,
          example: R`@Entity(tableName = "notes")
data class NoteEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val title: String,
    val done: Boolean = false,
    val createdAt: Long = System.currentTimeMillis()
)
@Dao
interface NoteDao {
    @Query("SELECT * FROM notes ORDER BY createdAt DESC")
    fun observeAll(): Flow<List<NoteEntity>>
    @Query("SELECT * FROM notes WHERE title LIKE '%' || :text || '%'")
    suspend fun search(text: String): List<NoteEntity>
    @Insert
    suspend fun insert(note: NoteEntity): Long
    @Update
    suspend fun update(note: NoteEntity)
    @Delete
    suspend fun delete(note: NoteEntity)
}
@Database(entities = [NoteEntity::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun noteDao(): NoteDao
}`,
          try: R`ضيف Room للمشروع، واعمل شاشة فيها TextField وزرار «ضيف» و LazyColumn بتعرض [[observeAll()]] (من ViewModel بـ [[stateIn]]). ضيف ملاحظات، واقفل التطبيق وافتحه: لسه موجودة. بعدين افتح App Inspection ثم Database Inspector في Android Studio وشوف الجدول وعدّل صف بإيدك.`,
          flag: "script",
          deep: {
            why: R`أي تطبيق بيشتغل من غير نت (offline)، أو بيعمل cache لداتا السيرفر، أو بيخزن داتا اليوزر الكتير، محتاج داتابيز حقيقية. و Room بيمسك أغلاط الـ SQL وقت الترجمة (عمود مكتوب غلط مثلًا) بدل ما التطبيق يقع.`,
            how: R`KSP بيقرا الـ annotations ويولّد [[AppDatabase_Impl]] و [[NoteDao_Impl]] فيهم كل كود SQLite. الـ suspend functions بتشتغل على thread خاص بيها، والـ Flow بيسجّل «أنا بسمع جدول notes»، وأي insert/update/delete على الجدول بيخليه يعيد الـ query ويبعت النتيجة.

Room بيمنع الـ queries على الـ main thread (بيرمي exception)، عشان كده suspend و Flow.

الـ [[version]]: لو غيّرت شكل الجدول (عمود جديد) بعد ما التطبيق اتنشر، لازم تزوّد الـ version وتكتب [[Migration]] (أو [[AutoMigration]] للحالات البسيطة). من غيرها التطبيق هيقع عند اليوزرز اللي عندهم النسخة القديمة. و [[fallbackToDestructiveMigration()]] بتمسح الداتا كلها، ينفع وانت بتطوّر بس.

[[exportSchema]] (افتراضيًا true) بيكتب شكل الداتابيز في JSON، وده اللي AutoMigration محتاجه، فاعمل له commit. بس لازم تقوله يكتبه فين: plugin [[androidx.room]] و [[room { schemaDirectory("$projectDir/schemas") }]]، وإلا البناء بيطلّع warning «Schema export directory was not provided».

ومن Room 2.7 المكتبة بتدعم Kotlin Multiplatform كمان.`,
            when: "لستات وداتا ليها علاقات أو محتاجة بحث وترتيب، و cache لداتا السيرفر. والإعدادات الصغيرة DataStore.",
            mistakes: R`[[id: Long]] من غير [[= 0]] مع autoGenerate فتحتار تبعت إيه. ونسيان KSP plugin فيقع بـ [[AppDatabase_Impl does not exist]]. وتغيّر الـ Entity من غير ما تزوّد الـ version: [[Room cannot verify the data integrity]]. وتعمل [[Room.databaseBuilder]] في كل شاشة: اعمله مرة (singleton أو Hilt).`
          },
          teach: R`## الكود بيعمل إيه؟

بيعرّف داتابيز فيها جدول واحد [[notes]] بـ ٣ أجزاء Room: [[@Entity]] (شكل الجدول)، و [[@Dao]] (العمليات)، و [[@Database]] (الداتابيز نفسها). وانت مبتكتبش كود SQLite خالص: Room بيولّده.

### اتجرّب فين؟

- الكود زي ما هو اتترجم في مشروع Android حقيقي (AGP 9.4.1 و Kotlin 2.4.20 و [[room 2.8.5]] و KSP 2.3.12) بـ [[./gradlew assembleDebug]] جوه image فيها Android SDK 36. الـ KSP ولّد [[AppDatabase_Impl.kt]] (112 سطر) و [[NoteDao_Impl.kt]] (151 سطر)، وهنقرا منهم تحت.
- الـ SQL اللي Room ولّده اتشغّل بالحرف على SQLite حقيقي (3.50.3، عن طريق [[sqlite-jdbc]]) في [[docker run --rm eclipse-temurin:21-jdk]].
- تشغيل التطبيق نفسه و Database Inspector من الـ docs (مفيش emulator).

---

## ١. الجدول: [[@Entity]]

~~~kotlin
@Entity(tableName = "notes")
data class NoteEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val title: String,
    val done: Boolean = false,
    val createdAt: Long = System.currentTimeMillis()
)
~~~

- [[@Entity(tableName = "notes")]]: «الكلاس ده جدول». من غير [[tableName]] اسم الجدول بيبقى اسم الكلاس ([[NoteEntity]]).
- كل property = عمود بنفس الاسم.
- [[@PrimaryKey(autoGenerate = true)]]: المفتاح الأساسي (رقم فريد لكل صف)، والداتابيز بتديله رقم لوحدها.
- [[val id: Long = 0]]: القيمة الافتراضية [[0]] معناها لـ Room «لسه ملوش id»، فتقدر تكتب [[NoteEntity(title = "...")]] من غير id.
- [[done: Boolean = false]]: SQLite مفيهاش Boolean، فـ Room بيخزنه [[INTEGER]]: 0 أو 1.
- [[createdAt: Long = System.currentTimeMillis()]]: الوقت بالملي ثانية، والقيمة الافتراضية بتتحسب كل ما تعمل object جديد.

ده الـ SQL اللي Room ولّده للجدول ده (من [[AppDatabase_Impl.kt]]):

~~~sql
CREATE TABLE IF NOT EXISTS $__btnotes$__bt ($__btid$__bt INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, $__bttitle$__bt TEXT NOT NULL, $__btdone$__bt INTEGER NOT NULL, $__btcreatedAt$__bt INTEGER NOT NULL)
~~~

| في Kotlin | في SQLite |
|---|---|
| [[Long]] | [[INTEGER]] |
| [[String]] | [[TEXT]] |
| [[Boolean]] | [[INTEGER]] (0 أو 1) |
| مش nullable ([[String]] مش [[String?]]) | [[NOT NULL]] |
| [[autoGenerate = true]] | [[AUTOINCREMENT]] |

العلامات [[$__bt]] حوالين الأسماء في SQLite بتخلي أي اسم ينفع حتى لو كلمة محجوزة.

---

## ٢. العمليات: [[@Dao]]

[[DAO]] اختصار Data Access Object: الحتة اللي فيها كل التعامل مع الجدول.

~~~kotlin
@Dao
interface NoteDao {
~~~

[[interface]] من غير تنفيذ، و KSP بيكتب [[NoteDao_Impl]].

### [[@Query]] بـ Flow

~~~kotlin
    @Query("SELECT * FROM notes ORDER BY createdAt DESC")
    fun observeAll(): Flow<List<NoteEntity>>
~~~

- SQL عادي: هات كل الأعمدة ([[*]]) من notes، مترتبة بـ [[createdAt]] تنازلي ([[DESC]]، الأحدث الأول).
- Room بيتأكد من الـ SQL **وقت الترجمة**: لو كتبت [[createdat]] أو اسم جدول غلط، الـ KSP بيفشل ومش هتوصل للتشغيل.
- [[Flow<List<NoteEntity>>]]: مش suspend. بترجّع Flow، وكل ما الجدول يتغير بيبعت اللستة الجديدة. في الكود المولّد:

~~~kotlin
return createFlow(__db, false, arrayOf("notes")) { _connection ->
~~~

[[arrayOf("notes")]]: الـ Flow مسجّل إنه «بيسمع» جدول notes، فأي insert أو update أو delete عليه بيعيد الـ query.

شغّلت نفس الـ query على ٣ ملاحظات متسجلة بفرق ثانية:

~~~text الناتج
3 | اتصل بـ Sara | 0 | 1700000002000
2 | ذاكر Kotlin | 0 | 1700000001000
1 | اشتري لبن | 0 | 1700000000000
~~~

الأعمدة: id، و title، و done (0 = false)، و createdAt. والأحدث (id 3) الأول بسبب [[DESC]].

### [[@Query]] بـ parameter

~~~kotlin
    @Query("SELECT * FROM notes WHERE title LIKE '%' || :text || '%'")
    suspend fun search(text: String): List<NoteEntity>
~~~

- [[:text]]: «حط هنا قيمة parameter الدالة اللي اسمه text». Room حوّلها لـ [[?]] في الكود المولّد:

~~~text الـ SQL في NoteDao_Impl.kt
SELECT * FROM notes WHERE title LIKE '%' || ? || '%'
~~~

القيمة بتتبعت منفصلة عن الـ SQL (bind)، فمفيش SQL injection حتى لو اليوزر كتب علامات غريبة.

- [[||]]: لزق نصوص في SQLite. [['%' || 'Kotlin' || '%']] بقت:

~~~text الناتج
%Kotlin%
~~~

- [[LIKE '%Kotlin%']]: [[%]] يعني «أي حاجة»، فـ «فيه Kotlin في أي مكان». [[search("Kotlin")]]:

~~~text الناتج
2 | ذاكر Kotlin
~~~

- [[suspend]] و [[List]]: قراية مرة واحدة، مش بتسمع للتغييرات.

### [[@Insert]] و [[@Update]] و [[@Delete]]

~~~kotlin
    @Insert
    suspend fun insert(note: NoteEntity): Long
    @Update
    suspend fun update(note: NoteEntity)
    @Delete
    suspend fun delete(note: NoteEntity)
}
~~~

مفيش SQL: Room بيكتبه. ده اللي ولّده:

| الدالة | الـ SQL المولّد |
|---|---|
| [[@Insert]] | [[INSERT OR ABORT INTO notes (id,title,done,createdAt) VALUES (nullif(?, 0),?,?,?)]] |
| [[@Update]] | [[UPDATE OR ABORT notes SET id = ?,title = ?,done = ?,createdAt = ? WHERE id = ?]] |
| [[@Delete]] | [[DELETE FROM notes WHERE id = ?]] |

- [[nullif(?, 0)]]: لو الـ id بـ 0 حوّله NULL، و SQLite يدّي رقم جديد. ده سبب [[= 0]] في الـ Entity.
- [[: Long]] في insert: الـ id الجديد. شغّلت الـ insert المولّد ٣ مرات بـ id = 0:

~~~text الناتج
insert رجّع id = 1
insert رجّع id = 2
insert رجّع id = 3
~~~

- [[@Update]] و [[@Delete]] بيدوّروا بالـ primary key ([[WHERE id = ?]])، فلازم الـ object يكون جاي من الداتابيز (معاه id صح). بعد update لـ id 2 بـ done = 1، و delete لـ id 1:

~~~text الناتج
3 | اتصل بـ Sara | 0
2 | ذاكر Kotlin | 1
~~~

- [[OR ABORT]]: لو حصل تعارض (id مكرر مثلًا) الـ SQL يفشل ويرمي exception. وتقدر تغيّره بـ [[@Insert(onConflict = OnConflictStrategy.REPLACE)]].

---

## ٣. الداتابيز: [[@Database]]

~~~kotlin
@Database(entities = [NoteEntity::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun noteDao(): NoteDao
}
~~~

- [[entities = [NoteEntity::class]]]: الجداول. [[[ ]]] جوه annotation معناها array، و [[::class]] الكلاس نفسه.
- [[version = 1]]: نسخة شكل الداتابيز. أي تغيير في الجداول بعد ما التطبيق اتنشر = زوّدها واكتب Migration.
- [[abstract class ... : RoomDatabase()]]: [[abstract]] يعني مينفعش تعمل منه object على طول: Room بيولّد [[AppDatabase_Impl]] اللي بيورث منه وبينفّذ [[noteDao()]].

وفي الكود المولّد كمان جدول تاني Room بيعمله لنفسه:

~~~text من AppDatabase_Impl.kt
CREATE TABLE IF NOT EXISTS room_master_table (id INTEGER PRIMARY KEY,identity_hash TEXT)
~~~

[[identity_hash]] بصمة لشكل الجداول. لو غيّرت الـ Entity ومزوّدتش الـ version، البصمة اللي في ملف اليوزر مش هتطابق، والتطبيق يقع بـ [[Room cannot verify the data integrity]] (من الـ docs).

### warning وقت البناء

البناء طلّع الـ warning ده:

~~~text الناتج
w: [ksp] /w/app/src/main/java/com/example/k04/Notes.kt:41: Schema export directory was not provided to the annotation processor so Room cannot export the schema. You can either provide $__btroom.schemaLocation$__bt annotation processor argument by applying the Room Gradle plugin (id 'androidx.room') OR set exportSchema to false.
~~~

[[exportSchema]] افتراضيًا true، بس محتاج تقوله يكتب الـ JSON فين: plugin [[androidx.room]] و [[room { schemaDirectory("$projectDir/schemas") }]] في Gradle، أو [[exportSchema = false]] لو مش محتاجه.

### تعملها مرة واحدة

~~~kotlin
Room.databaseBuilder(context, AppDatabase::class.java, "notes.db").build()
~~~

- [[context]]: Room محتاجه عشان يعرف فولدر التطبيق.
- [["notes.db"]]: اسم الملف على الموبايل.
- [[.build()]]: بيرجّع [[AppDatabase]] (فعليًا [[AppDatabase_Impl]]). واحد بس للتطبيق كله (singleton أو Hilt).

---

## ٤. الـ ViewModel (solCode)

~~~kotlin
class NotesViewModel(private val dao: NoteDao) : ViewModel() {
    val notes: StateFlow<List<NoteEntity>> = dao.observeAll()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())
~~~

[[observeAll()]] Flow، و [[stateIn]] بيحوّله StateFlow للشاشة، والقيمة الأولى لستة فاضية لحد ما الداتابيز ترد (درس Flow).

~~~kotlin
    fun add(title: String) {
        if (title.isBlank()) return
        viewModelScope.launch { dao.insert(NoteEntity(title = title.trim())) }
    }
~~~

- [[isBlank()]]: فاضي أو مسافات بس، فمنضيفش.
- [[trim()]]: يشيل المسافات من الأول والآخر.
- [[NoteEntity(title = ...)]]: id = 0 و done = false و createdAt دلوقتي، كلهم من القيم الافتراضية.
- مفيش تحديث للستة هنا: الـ Flow هيبعت اللستة الجديدة لوحده بعد الـ insert.

~~~kotlin
    fun toggle(note: NoteEntity) {
        viewModelScope.launch { dao.update(note.copy(done = !note.done)) }
    }
}
~~~

[[copy(done = !note.done)]]: نسخة من نفس الـ object (نفس الـ id) بـ done معكوس (درس Data Classes)، و [[update]] بيدوّر بالـ id ويعدّل.

الكلاس ده اتترجم في نفس المشروع.

---

## الخلاصة

| الحتة | بتعمل إيه | Room بيولّد |
|---|---|---|
| [[@Entity]] | جدول | [[CREATE TABLE]] |
| [[@PrimaryKey(autoGenerate = true) val id: Long = 0]] | id لوحده | [[AUTOINCREMENT]] و [[nullif(?, 0)]] |
| [[@Query("...")]] بـ [[:param]] | SQL بتاعك، متفحوص وقت الترجمة | نفس الـ SQL بـ [[?]] |
| [[Flow<List<T>>]] | بيتحدث مع كل تغيير في الجدول | [[createFlow(..., arrayOf("notes"))]] |
| [[@Insert]] / [[@Update]] / [[@Delete]] | من غير SQL | بالـ primary key |
| [[@Database(entities, version)]] | الداتابيز | [[AppDatabase_Impl]] |

- الكتابة [[suspend]]، والقراية اللي بتسمع [[Flow]]. Room مبيسمحش بـ queries على الـ main thread.
- غيّرت الجدول بعد النشر؟ زوّد [[version]] واكتب Migration.`,
          lines: [
            R`[[@Entity]]: الكلاس ده جدول اسمه notes.`,
            "data class.",
            "مفتاح أساسي بيزيد لوحده، و 0 يعني «جديد».",
            "عمود نص.",
            "عمود Boolean بقيمة افتراضية.",
            "وقت الإنشاء بالملي ثانية.",
            "قفلة.",
            R`[[@Dao]]: العمليات.`,
            "interface.",
            "SQL عادي، و Room بيتأكد منه وقت الترجمة.",
            R`[[Flow]]: بيبعت النتيجة الجديدة كل ما الجدول يتغير.`,
            R`بحث، و [[:text]] هو parameter الدالة، و [[||]] بتلزق النصوص في SQLite.`,
            R`[[suspend]]: قراية مرة واحدة.`,
            R`[[@Insert]] جاهز.`,
            "بيرجّع الـ id الجديد.",
            R`[[@Update]] بالـ primary key.`,
            "تعديل.",
            R`[[@Delete]].`,
            "مسح.",
            "قفلة.",
            R`[[@Database]]: الجداول والنسخة.`,
            "abstract، و Room بيولّد التنفيذ.",
            "الـ DAO.",
            "قفلة."
          ],
          sol: R`الملاحظات بتفضل بعد ما تقفل التطبيق، لأنها في ملف [[notes.db]] جوه فولدر التطبيق الخاص. واللستة بتتحدث لوحدها بعد كل insert، من غير ما تنادي refresh، بسبب الـ Flow.

وفي Database Inspector لو عدّلت صف بإيدك، الشاشة هتتحدث كمان، لأن Room بيعرف إن الجدول اتغير. ولو مسحت التطبيق (Uninstall)، الداتابيز بتتمسح معاه.

والـ ViewModel للتجربة في الكود تحت.`,
          solCode: R`class NotesViewModel(private val dao: NoteDao) : ViewModel() {
    val notes: StateFlow<List<NoteEntity>> = dao.observeAll()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    fun add(title: String) {
        if (title.isBlank()) return
        viewModelScope.launch { dao.insert(NoteEntity(title = title.trim())) }
    }

    fun toggle(note: NoteEntity) {
        viewModelScope.launch { dao.update(note.copy(done = !note.done)) }
    }
}`
        },
        {
          cmd: "permissions",
          title: "تطلب صلاحية زي الإشعارات أو الكاميرا وقت التشغيل إزاي؟",
          desc: R`الصلاحيات نوعين:
• عادية ([[INTERNET]] مثلًا): تكتبها في الـ manifest وخلاص.
• خطيرة (dangerous): الكاميرا، والموقع، والميكروفون، والإشعارات من Android 13. لازم تكتبها في الـ manifest، وكمان تطلبها من اليوزر وقت التشغيل، وهو يوافق أو يرفض.

في Compose:
• [[ContextCompat.checkSelfPermission(context, permission)]]: الصلاحية متاحة دلوقتي؟ بترجّع [[PackageManager.PERMISSION_GRANTED]] لو أيوه.
• [[rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { granted -> ... }]]: بيجهّز «launcher»، والـ lambda بتتنادى بالنتيجة بعد ما اليوزر يرد.
• [[launcher.launch(Manifest.permission.POST_NOTIFICATIONS)]]: اعرض رسالة النظام.

قواعد مهمة:
• اطلب الصلاحية لما اليوزر يعمل حاجة محتاجاها (يدوس «فعّل الإشعارات»)، مش أول ما التطبيق يفتح.
• لو رفض، التطبيق لازم يكمل يشتغل من غير الميزة دي.
• لو رفض مرتين، النظام مش هيعرض الرسالة تاني، والحل الوحيد إنك توجهه للإعدادات.

[[POST_NOTIFICATIONS]] موجودة من Android 13 (API 33). على نسخ أقدم الإشعارات مسموحة لوحدها، فبنفحص [[Build.VERSION.SDK_INT]] الأول.`,
          example: R`@Composable
fun NotificationPermissionButton() {
    val context = LocalContext.current
    var granted by remember {
        mutableStateOf(
            Build.VERSION.SDK_INT < 33 ||
                ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) ==
                PackageManager.PERMISSION_GRANTED
        )
    }
    val launcher = rememberLauncherForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted -> granted = isGranted }
    if (granted) {
        Text("الإشعارات شغالة")
    } else {
        Button(onClick = { launcher.launch(Manifest.permission.POST_NOTIFICATIONS) }) {
            Text("فعّل الإشعارات")
        }
    }
}`,
          try: R`ضيف [[<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />]] في الـ manifest، وشغّل على emulator Android 13 أو أحدث. ارفض مرة، ودوس تاني وارفض: المرة التالتة مش هتظهر رسالة. امسح داتا التطبيق من الإعدادات وجرّب توافق.`,
          flag: "script",
          deep: {
            why: R`من غير ما تطلب الصلاحية صح، الميزة مش هتشتغل (الإشعارات مش هتظهر، والكاميرا هترمي SecurityException). وكمان Google Play بيراجع الصلاحيات الحساسة (الموقع في الخلفية، الرسايل، المكالمات) وممكن يرفض التطبيق لو مش مبرّرة.`,
            how: R`[[rememberLauncherForActivityResult]] بيسجّل الطلب مع الـ Activity Result API بحيث النتيجة توصل حتى لو الـ Activity اتعملت من الأول وانت مستني رد اليوزر.

[[shouldShowRequestPermissionRationale]] (على الـ Activity) بترجّع true لو اليوزر رفض قبل كده ولسه ينفع تسأله: ده الوقت تعرض شرح ليه محتاج الصلاحية قبل ما تطلب تاني.

ولو رفض نهائيًا، توديه لصفحة التطبيق في الإعدادات:
[[Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.fromParts("package", context.packageName, null))]]

وفيه بدائل من غير صلاحيات أصلًا: Photo Picker ([[PickVisualMedia]]) لاختيار صور من غير صلاحية قراية الصور كلها، و [[TakePicture]] بيفتح تطبيق الكاميرا. Google بتشجع عليهم، و Play بقى بيقيّد صلاحيات الصور والفيديو للتطبيقات اللي مش شغلتها الأساسية الصور.

وهتلاقي في مشاريع كتير مكتبة [[Accompanist Permissions]] بتلف نفس الفكرة بشكل أقصر، بس هي متعلّمة experimental، والـ API اللي في المثال هو الأساسي اللي جاي مع androidx.`,
            when: R`كل ما تحتاج كاميرا أو موقع أو ميكروفون أو إشعارات أو Bluetooth. وقبلها اسأل نفسك: فيه بديل من غير صلاحية؟`,
            mistakes: R`تطلب كل الصلاحيات أول ما التطبيق يفتح فاليوزر يرفض كله. وتنسى تكتبها في الـ manifest فالرسالة متظهرش خالص والنتيجة false على طول. وتفترض إن الموافقة دايمة: اليوزر ممكن يشيلها من الإعدادات في أي وقت، فافحص قبل كل استخدام.`
          },
          teach: R`## الكود بيعمل إيه؟

زرار بيطلب صلاحية الإشعارات. لو الصلاحية متاحة بيعرض «الإشعارات شغالة»، ولو لأ بيعرض زرار «فعّل الإشعارات» اللي بيطلّع رسالة النظام، والنتيجة بتحدّث الشاشة.

### اتجرّب فين؟

رسالة الصلاحية بتاعة النظام محتاجة موبايل أو emulator، ومفيش هنا. اللي اتعمل: الكود اتترجم زي ما هو في مشروع Android حقيقي (AGP 9.4.1 و Kotlin 2.4.20 و [[compileSdk 36]] و [[activity-compose 1.13.0]]) ومعاه [[<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />]] في الـ manifest، والترجمة نجحت. سلوك الرسالة والرفض من الـ docs الرسمية لـ Android.

الـ imports:

~~~kotlin
import android.Manifest
import android.content.pm.PackageManager
import android.os.Build
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.ui.platform.LocalContext
import androidx.core.content.ContextCompat
~~~

---

## ١. الـ Context

~~~kotlin
@Composable
fun NotificationPermissionButton() {
    val context = LocalContext.current
~~~

[[LocalContext.current]]: الـ [[Context]] بتاع الشاشة (الـ Activity) من جوه composable. [[Local...]] في Compose معناها قيمة متاحة لكل الـ composables اللي تحت من غير ما تتبعت parameter. ومحتاجينه عشان [[checkSelfPermission]].

---

## ٢. الحالة الأولى: الصلاحية متاحة دلوقتي؟

~~~kotlin
    var granted by remember {
        mutableStateOf(
            Build.VERSION.SDK_INT < 33 ||
                ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) ==
                PackageManager.PERMISSION_GRANTED
        )
    }
~~~

- [[var granted by remember { mutableStateOf(...) }]]: state بيفتكر قيمته بين الـ recompositions، وأي تغيير فيه بيعيد رسم الشاشة (درس remember و state).
- [[Build.VERSION.SDK_INT]]: رقم الـ API بتاع نسخة Android اللي على الموبايل. [[33]] = Android 13. صلاحية الإشعارات اتعملت في Android 13، وقبلها الإشعارات مسموحة لوحدها، فلو أقل من 33 خلاص [[true]].
- [[||]]: «أو». لو الشرط الأول true، التاني مبيتنفذش أصلًا (short-circuit). ده مهم: النسخ القديمة متعرفش [[POST_NOTIFICATIONS]]، فلو فحصناها هناك هتطلع مش granted رغم إن الإشعارات شغالة.
- [[ContextCompat.checkSelfPermission(context, اسم)]]: «التطبيق ده معاه الصلاحية دي؟». [[ContextCompat]] من [[androidx.core]] بتشتغل على كل النسخ. بترجّع رقم: [[PERMISSION_GRANTED]] (0) أو [[PERMISSION_DENIED]] (-1).
- [[Manifest.permission.POST_NOTIFICATIONS]]: constant فيه الاسم الكامل [["android.permission.POST_NOTIFICATIONS"]]، نفس اللي في الـ manifest. لاحظ إن [[Manifest]] هنا [[android.Manifest]] (كلاس فيه أسماء الصلاحيات)، مش ملف [[AndroidManifest.xml]].
- [[== PackageManager.PERMISSION_GRANTED]]: نقارن الرقم، فالنتيجة Boolean.

---

## ٣. الـ launcher

~~~kotlin
    val launcher = rememberLauncherForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted -> granted = isGranted }
~~~

- [[rememberLauncherForActivityResult(contract) { نتيجة -> }]]: بيجهّز «launcher» تقدر تطلب بيه حاجة من النظام وتستنى ردها. الـ lambda في الآخر (trailing lambda) بتتنادى لما الرد يوصل.
- [[ActivityResultContracts.RequestPermission()]]: الـ **contract**: نوع الطلب. ده «اطلب صلاحية واحدة»، بياخد اسم الصلاحية ([[String]]) ويرجّع [[Boolean]]. وفيه [[RequestMultiplePermissions()]] لأكتر من صلاحية مرة واحدة (بيرجّع [[Map<String, Boolean>]]).
- [[isGranted -> granted = isGranted]]: لما اليوزر يرد، نحط النتيجة في الـ state، فالشاشة تترسم تاني.
- [[remember]] في الاسم: الـ launcher بيتسجّل مرة واحدة مع الـ Activity Result API، فالرد يوصل حتى لو الـ Activity اتعملت من الأول (rotation) واليوزر لسه بيقرا الرسالة.

---

## ٤. الشاشة

~~~kotlin
    if (granted) {
        Text("الإشعارات شغالة")
    } else {
        Button(onClick = { launcher.launch(Manifest.permission.POST_NOTIFICATIONS) }) {
            Text("فعّل الإشعارات")
        }
    }
}
~~~

- [[if (granted)]]: في Compose الـ if بتختار تعرض إيه.
- [[launcher.launch(اسم الصلاحية)]]: اعرض رسالة النظام دلوقتي. بتتنادى **من الـ onClick**، يعني لما اليوزر يطلب الميزة، مش أول ما الشاشة تفتح.

---

## ٥. اللي بيحصل على الموبايل (من الـ docs)

| الموقف | اللي بيحصل |
|---|---|
| Android 12 أو أقدم | [[SDK_INT < 33]]، فبيظهر «الإشعارات شغالة» على طول |
| أول [[launch]] | رسالة النظام: Allow / Don't allow |
| وافق | الـ lambda بـ [[true]]، والنص بيتغير |
| رفض مرة | [[false]]، والزرار فاضل، وتقدر تسأل تاني |
| رفض مرتين (من Android 11) | النظام بيعتبره «متسألش تاني»: [[launch]] بيرجّع [[false]] على طول من غير رسالة |
| الصلاحية مش في الـ manifest | الرسالة مبتظهرش أصلًا والنتيجة [[false]] |

بعد الرفض التاني الحل الوحيد إنك توديه لصفحة التطبيق في الإعدادات بـ [[Settings.ACTION_APPLICATION_DETAILS_SETTINGS]]. وقبل ما تسأل تاني بعد أول رفض، [[shouldShowRequestPermissionRationale]] بترجّع true: ده الوقت تشرح ليه محتاج الصلاحية.

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| ١. اكتبها في الـ manifest | [[<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />]] |
| ٢. افحص | [[ContextCompat.checkSelfPermission(...) == PERMISSION_GRANTED]] |
| ٣. جهّز الطلب | [[rememberLauncherForActivityResult(RequestPermission()) { }]] |
| ٤. اطلب لما اليوزر يدوس | [[launcher.launch(Manifest.permission.X)]] |
| ٥. اتعامل مع الرفض | التطبيق يكمل، وزرار للإعدادات |

- [[POST_NOTIFICATIONS]] من API 33 بس، فافحص [[Build.VERSION.SDK_INT]] الأول.`,
          lines: [
            R`[[@Composable]].`,
            "زرار الإشعارات.",
            "الـ Context.",
            "state: الصلاحية متاحة؟",
            "القيمة الأولى:",
            "أقدم من Android 13: مسموحة لوحدها، أو...",
            "...نفحص الصلاحية...",
            "...هل هي GRANTED؟",
            "قفلة mutableStateOf.",
            "قفلة remember.",
            R`[[launcher]] لطلب صلاحية واحدة.`,
            "نوع الطلب.",
            "النتيجة بتوصل هنا، فنحدّث الـ state.",
            "لو متاحة...",
            "...نص.",
            "غير كده...",
            R`زرار بيطلب الصلاحية وقت ما اليوزر يدوس.`,
            "نص الزرار.",
            "قفلة الزرار.",
            "قفلة else.",
            "قفلة."
          ],
          sol: R`أول دوسة: رسالة النظام «Allow Notes to send you notifications?». لو وافقت: [[الإشعارات شغالة]]. لو رفضت: الزرار بيفضل.

بعد رفضين، [[launcher.launch]] بيرجّع false على طول من غير ما يعرض حاجة. ده سلوك Android من نسخة 11، وعشان كده لازم يبقى عندك زرار «افتح الإعدادات» كحل أخير.

وعلى emulator أقدم من 13 هتشوف «الإشعارات شغالة» على طول.`
        }
      ]
    },
    {
      t: "عالم Java و XML",
      l: 2,
      n: "مشاريع كتير شغالة لسه بـ Java وواجهات XML: تقراها، وتشتغل فيها بـ ViewBinding، وتخلي Java و Kotlin يعيشوا في نفس المشروع",
      items: [
        {
          cmd: "Android بـ Java: كلاس Activity و XML",
          title: "Android الكلاسيكي: Activity بـ Java، وواجهة XML، و findViewById و setOnClickListener",
          desc: R`قبل Compose (وقبل Kotlin)، الطريقة كانت كده، ولسه موجودة في تطبيقات كتير شغالة في شركات:

١. الواجهة في ملف XML جوه [[res/layout/activity_main.xml]]. كل عنصر View: [[TextView]] و [[Button]] و [[EditText]] و [[ImageView]]، جوه layouts زي [[LinearLayout]] و [[ConstraintLayout]]. والعنصر اللي هتتعامل معاه من الكود بتديله id: [[android:id="@+id/txtTitle"]] (الـ [[+]] معناها «اعمل id جديد بالاسم ده»).

٢. الـ Activity في Java بتورث من [[AppCompatActivity]]، وفي [[onCreate]] بتربط الـ layout بـ [[setContentView(R.layout.activity_main)]].

٣. بتجيب العنصر بـ [[findViewById(R.id.txtTitle)]]، وبتغيّره بإيدك: [[title.setText("...")]]. ده اسمه imperative UI: انت اللي بتقول «غيّر ده»، بعكس Compose.

٤. الأحداث بـ [[setOnClickListener(v -> { ... })]]. الـ [[->]] في Java هو الـ lambda (زي Kotlin بالظبط بس من غير [[{ }]] برا).

حاجات Java هتلاحظها: [[;]] في آخر كل سطر، والنوع قبل الاسم ([[TextView title]])، و [[@Override]] annotation اختيارية (في Kotlin [[override]] إجبارية)، و [[public]] و [[protected]] مكتوبين صريح، ومفيش null safety: أي [[findViewById]] بـ id غلط بيرجّع null ويقع بـ NullPointerException.

وفي Java [[int clicks = 0;]] field عادي، ولو الموبايل لف بيضيع زي أي متغير في الـ Activity.`,
          example: R`import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private int clicks = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // اربط ملف الـ XML بالشاشة دي
        setContentView(R.layout.activity_main);
        TextView title = findViewById(R.id.txtTitle);
        Button button = findViewById(R.id.btnClick);
        button.setOnClickListener(v -> {
            clicks++;
            title.setText("دوست " + clicks + " مرة");
        });
    }
}`,
          try: R`اعمل مشروع جديد بقالب Empty Views Activity واختار Language = Java. حط الـ layout اللي في الحل تحت في [[activity_main.xml]] والكود في MainActivity، وشغّل. بعدين غيّر [[R.id.txtTitle]] لـ id مش موجود في الـ layout (ID لعنصر في layout تاني) وشوف بيقع إزاي.`,
          flag: "script",
          deep: {
            why: R`Android من 2008 لحد حوالي 2019 كان أغلبه Java و XML، ومشاريع كبيرة كتير لسه فيها آلاف الشاشات بالشكل ده. في الشغل هتقابل إصلاح bug في شاشة XML، أو نقل شاشة لـ Compose، أو مكتبة Java. فلازم تقرا الكود ده بسهولة حتى لو مش هتكتب مشاريع جديدة بيه.`,
            how: R`[[setContentView]] بيعمل inflate للـ XML: بيقرا الملف ويعمل object لكل عنصر (TextView و Button...) في شجرة اسمها View hierarchy. و [[findViewById]] بيدوّر في الشجرة على الـ id. لو لقاه رجّعه، ولو ملقاهوش رجّع null.

[[R.id.txtTitle]] رقم int في كلاس [[R]] اللي بيتولد وقت البناء (زي الـ resources).

الـ lambda [[v -> { ... }]] بتعمل implement لـ interface اسمه [[View.OnClickListener]] فيه دالة واحدة [[onClick(View v)]]. قبل Java 8 كان لازم تكتب anonymous class كاملة: [[new View.OnClickListener() { @Override public void onClick(View v) { ... } }]]، وهتلاقيها في كود قديم.

والـ lambda في Java بتقدر تستخدم [[title]] (متغير local) لأنه «effectively final» (متغيرش بعد ما اتعمل). وبتغيّر [[clicks]] لأنه field في الكلاس مش local.

وللستات في XML كان فيه [[RecyclerView]] مع [[Adapter]] و [[ViewHolder]]، وده أعقد بكتير من LazyColumn.`,
            when: "صيانة مشاريع قديمة، أو مكتبات Java، أو شغل في شركة بتنقل تطبيقها تدريجيًا. ومشروع جديد ابدأه Kotlin و Compose.",
            mistakes: R`[[findViewById]] قبل [[setContentView]]: كل حاجة null والتطبيق يقع بـ NullPointerException. و id موجود بس في layout تاني: نفس النتيجة. وتعمل شغل شبكة جوه onCreate على الـ main thread: [[NetworkOnMainThreadException]].`
          },
          teach: R`## الكود بيعمل إيه؟

شاشة Android بالطريقة القديمة: الواجهة في ملف XML فيه [[TextView]] و [[Button]]، والـ Activity بـ Java بتجيب الاتنين بالـ id، وكل ما تدوس الزرار العداد بيزيد والنص بيتغير لـ «دوست 1 مرة» و «دوست 2 مرة»...

### اتجرّب فين؟

مفيش emulator هنا، فالشاشة نفسها والضغط من الـ docs. اللي اتعمل: الـ Activity والـ layout اللي في الحل (solCode) اتترجموا زي ما هم في مشروع Android حقيقي (AGP 9.4.1 و [[compileSdk 36]] و [[appcompat]]) بـ [[./gradlew assembleDebug]]: الـ XML اتعمله inflate check وطلّع [[R.id.txtTitle]] و [[R.id.btnClick]]، والـ Java اترجمت بـ javac. وقواعد Java نفسها (الـ lambda والمتغيرات) اتجرّبت بـ [[javac]] في [[docker run --rm eclipse-temurin:21-jdk]].

---

## ١. الـ layout (solCode): [[res/layout/activity_main.xml]]

~~~xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="16dp">
~~~

- [[<?xml ...?>]]: سطر تعريف ملف XML والـ encoding بتاعه. موجود في أول أي ملف XML.
- [[LinearLayout]]: View بيرص اللي جواه ورا بعض، زي [[Column]] أو [[Row]] في Compose.
- [[xmlns:android="..."]]: **namespace**: بيقول إن أي attribute أوله [[android:]] جاي من Android. بيتكتب مرة واحدة في أول عنصر.
- [[layout_width]] و [[layout_height]]: [[match_parent]] = «خد كل مساحة الأب»، و [[wrap_content]] = «على قد اللي جوايا».
- [[gravity="center"]]: حط اللي جوايا في النص.
- [[orientation="vertical"]]: فوق بعض (و [[horizontal]] جنب بعض).
- [[padding="16dp"]]: مسافة جوه الحواف. [[dp]] وحدة بتطلع نفس الحجم على كل الشاشات.

~~~xml
    <TextView
        android:id="@+id/txtTitle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/start"
        android:textSize="20sp" />
~~~

- [[android:id="@+id/txtTitle"]]: اسم العنصر عشان الكود يوصله. [[@]] = resource، و [[+]] = «اعمل id جديد بالاسم ده»، و [[id/]] نوعه. من غير id الكود ميقدرش يوصل للعنصر.
- [[android:text="@string/start"]]: النص من [[res/values/strings.xml]] (درس AndroidManifest و res). في المشروع اللي اتترجم حطيت [[<string name="start">ابدأ</string>]] و [[<string name="press">دوس</string>]]، ومن غيرهم البناء بيفشل لأن الـ resource مش موجود.
- [[textSize="20sp"]]: [[sp]] زي dp بس بيكبر لو اليوزر كبّر الخط من الإعدادات. للنصوص دايمًا sp.
- [[/>]]: العنصر مقفول ومفيش جواه حاجة.

والـ [[Button]] نفس الفكرة بـ id اسمه [[btnClick]]. و [[</LinearLayout>]] في الآخر بيقفل الأب.

---

## ٢. الـ imports

~~~java
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
~~~

- [[Bundle]]: شنطة key-value فيها الـ state المحفوظ (لو الـ Activity اتعملت من الأول).
- [[android.widget.Button]] و [[TextView]]: كلاسات الـ Views. كل عنصر في الـ XML بيبقى object من الكلاس اللي بنفس اسمه.
- [[AppCompatActivity]]: الـ Activity الأب من [[androidx.appcompat]]: بيدّي نفس الشكل والمميزات على النسخ القديمة.

ولو الكلاس في package تاني غير الـ namespace بتاع التطبيق، محتاج كمان [[import com.example.app.R;]] عشان [[R]]. في المشروع اللي اتترجم كان الكلاس في [[com.example.k04.java]] فاحتجته.

---

## ٣. الكلاس والـ field

~~~java
public class MainActivity extends AppCompatActivity {
    private int clicks = 0;
~~~

- [[public class MainActivity]]: في Java اسم الكلاس الـ public لازم يبقى نفس اسم الملف: [[MainActivity.java]].
- [[extends AppCompatActivity]]: الوراثة في Java بكلمة [[extends]] (في Kotlin [[:]]).
- [[private int clicks = 0;]]: field. النوع الأول ([[int]] بحرف صغير، رقم primitive) وبعدين الاسم. مفيش [[val]] و [[var]]: لو عايزه ثابت تكتب [[final]].

---

## ٤. [[onCreate]]

~~~java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
~~~

- [[@Override]]: بنعيد تعريف دالة موجودة في الأب. في Java اختيارية (بس لو كتبتها والاسم غلط، المترجم بيقولك)، وفي Kotlin [[override]] إجبارية.
- [[protected]]: متاحة للكلاس وولاده (والـ package). نفس اللي في الأب، ومينفعش تضيّقها.
- [[void]]: مبترجعش حاجة (زي [[Unit]]).
- [[onCreate]]: أول دالة بتتنادى لما الشاشة تتعمل (درس Activity و lifecycle).
- [[super.onCreate(...)]]: نادي نسخة الأب الأول. لو نسيتها التطبيق بيقع بـ [[SuperNotCalledException]] (من الـ docs).

~~~java
        // اربط ملف الـ XML بالشاشة دي
        setContentView(R.layout.activity_main);
~~~

[[setContentView(R.layout.activity_main)]]: اقرا ملف [[activity_main.xml]] واعمل object لكل عنصر فيه (ده اسمه **inflate**)، واعرضهم. [[R.layout.activity_main]] رقم int في كلاس [[R]] اللي بيتولد وقت البناء من أسماء الملفات.

---

## ٥. [[findViewById]]

~~~java
        TextView title = findViewById(R.id.txtTitle);
        Button button = findViewById(R.id.btnClick);
~~~

- [[TextView title = ...]]: متغير local: النوع، الاسم، القيمة.
- [[findViewById(R.id.txtTitle)]]: دوّر في العناصر اللي اتعملت على العنصر اللي الـ id بتاعه ده. [[R.id.txtTitle]] الرقم اللي اتولّد من [[@+id/txtTitle]].
- لو الـ id مش موجود في الـ layout اللي اتعمله inflate، بيرجّع [[null]]، وأول ما تنادي عليه دالة التطبيق بيقع بـ [[NullPointerException]]. وده اللي الـ try بيوريهولك: الرسالة اللي في الحل ([[Attempt to invoke virtual method ... on a null object reference]]) هي شكل NPE على Android.
- ولازم ييجي **بعد** [[setContentView]]: قبله مفيش عناصر أصلًا.

---

## ٦. الضغط: [[setOnClickListener]]

~~~java
        button.setOnClickListener(v -> {
            clicks++;
            title.setText("دوست " + clicks + " مرة");
        });
    }
}
~~~

- [[setOnClickListener(...)]]: «لما حد يدوس، نفّذ ده». بتاخد object بينفّذ [[View.OnClickListener]]، وده interface فيه دالة واحدة [[onClick(View v)]].
- [[v -> { ... }]]: lambda في Java. [[v]] الـ parameter (الـ View اللي اتداس، يعني الزرار)، و [[->]] بعدها الجسم. في Kotlin نفس الفكرة بتتكتب [[{ v -> ... }]].
- [[clicks++]]: زوّد واحد.
- [["دوست " + clicks + " مرة"]]: [[+]] بين نص ورقم بيلزقهم نص واحد (Java مفيهاش string templates).
- [[title.setText(...)]]: غيّر النص **بإيدك**. ده الـ imperative UI: انت اللي بتقول للـ View يتغير، بعكس Compose اللي بيرسم من الـ state.
- [[});]]: [[}]] تقفل الـ lambda، و [[)]] تقفل [[setOnClickListener(]]، و [[;]] آخر الجملة.

### ليه الـ lambda تقدر تستخدم [[title]] وتغيّر [[clicks]]؟

- [[title]] متغير local، والـ lambda في Java تقدر تقرا متغير local بس لو «effectively final» (اتحط مرة ومتغيرش).
- [[clicks]] field في الكلاس مش local، فتقدر تغيّره عادي.

جرّبت lambda بتغيّر متغير local بـ [[javac]]:

~~~text الناتج
Lam.java:9: error: local variables referenced from a lambda expression must be final or effectively final
            local++;
            ^
~~~

عشان كده العداد field مش local جوه onCreate.

### الشكل القديم قبل Java 8

~~~java
button.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        clicks++;
    }
});
~~~

ده **anonymous class**: كلاس من غير اسم بينفّذ الـ interface في نفس المكان. نفس معنى الـ lambda بالظبط، وهتلاقيه كتير في كود قديم.

---

## ٧. لما تلف الموبايل (من الـ docs)

الـ rotation بيدمر الـ Activity ويعملها من جديد: [[onCreate]] بتتنادى تاني، و [[clicks]] بيرجع 0، والنص بيرجع لـ [[@string/start]]. في Compose ده نفس سبب [[rememberSaveable]] والـ ViewModel.

---

## الخلاصة

| الخطوة | Java + XML | Compose |
|---|---|---|
| الواجهة | ملف [[res/layout/*.xml]] | دوال [[@Composable]] |
| تعرضها | [[setContentView(R.layout.x)]] | [[setContent { }]] |
| توصل لعنصر | [[findViewById(R.id.x)]] (ممكن null) | مش محتاج |
| تغيّره | [[title.setText(...)]] بإيدك | تغيّر الـ state |
| الضغط | [[setOnClickListener(v -> { })]] | [[onClick = { }]] |

- [[findViewById]] بعد [[setContentView]]، وبـ id موجود في نفس الـ layout، وإلا NullPointerException.`,
          lines: [
            R`[[Bundle]]: الـ state المتحفوظ.`,
            "الزرار.",
            "النص.",
            "الـ Activity الأب (فيها دعم الثيمات القديمة).",
            R`كلاس بيورث بـ [[extends]].`,
            R`field عادي (مفيش [[val]] و [[var]] في Java، النوع قبل الاسم).`,
            R`[[@Override]]: بنغيّر دالة الأب.`,
            "onCreate بالـ syntax بتاع Java.",
            "الأب الأول.",
            "اربط ملف activity_main.xml.",
            R`هات الـ TextView بالـ id (ممكن يرجع null).`,
            "هات الزرار.",
            R`حدث الضغط بـ lambda: [[v]] هو الزرار نفسه.`,
            "زوّد العداد.",
            R`غيّر النص بإيدك ([[+]] بتلزق النصوص).`,
            "قفلة الـ lambda والـ setOnClickListener.",
            "قفلة onCreate.",
            "قفلة الكلاس."
          ],
          sol: R`كل دوسة بتغيّر النص: «دوست 1 مرة» ثم «دوست 2 مرة»... ولو لفيت الموبايل العداد بيرجع صفر والنص بيرجع للي في الـ XML، لأن الـ Activity اتعملت من الأول.

ولما تحط id مش في الـ layout: التطبيق بيقع أول ما يفتح بـ [[java.lang.NullPointerException: Attempt to invoke virtual method 'void android.widget.Button.setOnClickListener(...)' on a null object reference]]. الرسالة دي هتشوفها كتير في المشاريع القديمة، وأول سؤال يبقى: الـ id ده في الـ layout ده فعلًا؟`,
          solCode: R`<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:id="@+id/txtTitle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/start"
        android:textSize="20sp" />

    <Button
        android:id="@+id/btnClick"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/press" />
</LinearLayout>`
        },
        {
          cmd: "ViewBinding",
          title: "ViewBinding بـ Kotlin بدل findViewById، و Compose جوه شاشة XML",
          desc: R`لو شغال على مشروع XML بـ Kotlin، متستخدمش [[findViewById]]. استخدم [[ViewBinding]]: Gradle بيولّد كلاس لكل layout فيه property لكل عنصر ليه id.

• تفعّله: [[buildFeatures { viewBinding = true }]] في [[app/build.gradle.kts]].
• [[activity_main.xml]] بيطلع منه [[ActivityMainBinding]]، و [[txt_title]] أو [[txtTitle]] بيبقى [[binding.txtTitle]].
• [[ActivityMainBinding.inflate(layoutInflater)]] بيعمل الـ views، و [[setContentView(binding.root)]] بيعرضها.

المكسب: النوع صح (TextView مش View)، ومفيش null لو الـ id مش في الـ layout ده، لأن الـ property مش هتبقى موجودة أصلًا والكود مش هيترجم.

[[private lateinit var binding: ActivityMainBinding]]: [[lateinit]] (من درس null safety) لأن الـ binding مينفعش يتعمل غير في onCreate، ومش عايزينه nullable.

و Compose جوه XML: حط [[<androidx.compose.ui.platform.ComposeView android:id="@+id/composeView" .../>]] في الـ layout، و [[binding.composeView.setContent { ... }]]. وده الطريق المعتاد لنقل تطبيق قديم لـ Compose شاشة شاشة أو حتة حتة. والعكس كمان موجود: [[AndroidView]] بيحط View قديم جوه Compose (زي خريطة أو WebView).

وهتلاقي في مشاريع قديمة جدًا [[kotlin-android-extensions]] (synthetics، كنت بتكتب [[txtTitle.text]] على طول): اتشالت من سنين، ولو قابلتها انقلها لـ ViewBinding.`,
          example: R`class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private var clicks = 0
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.btnClick.setOnClickListener {
            clicks++
            binding.txtTitle.text = "دوست $clicks مرة"
        }
        binding.composeView.setContent {
            MaterialTheme {
                Text("أنا Compose جوه XML")
            }
        }
    }
}`,
          try: R`خد مشروع الدرس اللي فات، ضيف Kotlin Activity بالكود ده، وفعّل viewBinding، وضيف ComposeView في الـ layout تحت الزرار. جرّب تكتب [[binding.]] وشوف الـ autocomplete بيقترح إيه. وبعدين جرّب تغيّر الـ Text اللي في الـ Compose لـ Button بيزوّد نفس العداد.`,
          flag: "script",
          deep: {
            why: R`أغلب المشاريع اللي بتتنقل من Java لـ Kotlin بتعدّي بالمرحلة دي: Kotlin مع XML و ViewBinding، وبعدين Compose جوه XML في الشاشات الجديدة. لو بتدوّر على شغل، فرصتك تقابل الشكل ده كبيرة.`,
            how: R`لكل layout، Gradle بيولّد كلاس في [[build/generated]] اسمه من اسم الملف بـ PascalCase وفي الآخر Binding. جواه [[root]] (أول عنصر) و property لكل view ليه id، والأسماء بتتحول لـ camelCase ([[btn_click]] تبقى [[btnClick]]).

في الـ Fragments (شاشات صغيرة جوه Activity في عالم XML) لازم تمسح الـ binding في [[onDestroyView]] ([[_binding = null]])، لأن الـ Fragment بيعيش أطول من الـ View بتاعه، وإلا memory leak.

[[binding.txtTitle.text = "..."]]: في Kotlin الـ getter و setter بتوع Java ([[getText]] و [[setText]]) بيتقروا كـ property ([[text]]). ده جزء من الـ interop (الدرس الجاي).

[[DataBinding]] حاجة تانية أتقل: بتكتب expressions جوه الـ XML. هتشوفها في مشاريع، بس Google بتوصي بـ ViewBinding للجديد.`,
            when: "أي شاشة XML بـ Kotlin. و ComposeView لما تضيف حاجة جديدة في شاشة قديمة.",
            mistakes: R`تنسى [[setContentView(binding.root)]] وتعمل [[setContentView(R.layout.activity_main)]]: كده فيه نسختين من الـ views، واللي بتعدّل فيها مش اللي ظاهرة. وتنسى تفعّل [[viewBinding]] فـ [[ActivityMainBinding]] مش موجود ([[Unresolved reference]]). وتمسك الـ binding في Fragment بعد onDestroyView.`
          },
          teach: R`## الكود بيعمل إيه؟

نفس شاشة الدرس اللي فات (TextView وزرار وعداد)، بس بـ Kotlin، وبدل [[findViewById]] بنستخدم كلاس اسمه [[ActivityMainBinding]] Gradle بيولّده من ملف الـ XML. وفي الآخر بنحط حتة Compose جوه نفس الشاشة القديمة عن طريق [[ComposeView]].

### اتجرّب فين؟

مفيش emulator، فالشاشة والضغط من الـ docs. اللي اتعمل: المثال والحل اتترجموا في مشروع Android حقيقي (AGP 9.4.1 و Kotlin 2.4.20 و [[compileSdk 36]]) بـ [[viewBinding = true]] ونفس [[activity_main.xml]] بتاع الدرس اللي فات + [[ComposeView]] بـ id اسمه [[composeView]]. وقريت الكلاس اللي اتولّد فعلًا: [[build/generated/data_binding_base_class_source_out/debug/out/com/example/k04/databinding/ActivityMainBinding.java]].

---

## ١. التفعيل والـ layout

في [[app/build.gradle.kts]] جوه [[android { }]]:

~~~kotlin
buildFeatures {
    viewBinding = true
}
~~~

وفي [[activity_main.xml]] تحت الزرار:

~~~xml
<androidx.compose.ui.platform.ComposeView
    android:id="@+id/composeView"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" />
~~~

[[ComposeView]] View عادي بالاسم الكامل بتاعه (package + كلاس)، لأنه مش من الـ Views الأساسية زي TextView. هو «فتحة» Compose بيرسم جواها.

---

## ٢. الكلاس اللي اتولّد

من [[activity_main.xml]] اتولّد [[ActivityMainBinding]]: اسم الملف بـ PascalCase (أول كل كلمة كابيتال ومن غير [[_]]) + [[Binding]]. ده جزء منه زي ما هو:

~~~java
public final class ActivityMainBinding implements ViewBinding {
  @NonNull
  private final LinearLayout rootView;

  @NonNull
  public final Button btnClick;

  @NonNull
  public final ComposeView composeView;

  @NonNull
  public final TextView txtTitle;
~~~

- field لكل عنصر **ليه id** بس، بنفس النوع بالظبط ([[Button]] مش [[View]]). الـ [[LinearLayout]] ملوش id، فمش ليه field غير [[rootView]].
- [[@NonNull]] على كله: Kotlin شايفاهم مش nullable (درس التكامل بين Java و Kotlin).
- لو الـ id مكتوب [[txt_title]] في الـ XML، الـ field بيبقى [[txtTitle]] (camelCase).

وجرّبت أكتب [[binding.txtSubtitle]] (id مش موجود في الـ layout):

~~~text الناتج
e: file:///w/app/src/main/java/com/example/k04/Bad.kt:6:7 Unresolved reference 'txtSubtitle' on receiver of type 'ActivityMainBinding'.
~~~

الغلطة دي اتمسكت **وقت الترجمة**. مع [[findViewById]] نفس الغلطة كانت null و crash وقت التشغيل.

---

## ٣. الـ Activity سطر سطر

~~~kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private var clicks = 0
~~~

- [[: AppCompatActivity()]]: الوراثة في Kotlin بـ [[:]]، والأقواس بتنادي constructor الأب.
- [[private lateinit var binding: ActivityMainBinding]]: [[lateinit]] = «هحط فيه قيمة بعدين، قبل ما استخدمه». الـ binding مينفعش يتعمل في الـ constructor (لسه مفيش [[layoutInflater]])، فبيتعمل في [[onCreate]]. ولو استخدمته قبلها: [[UninitializedPropertyAccessException]].
- [[private var clicks = 0]]: العداد، والنوع [[Int]] متستنتج.

~~~kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
~~~

[[override]] إجبارية في Kotlin. و [[Bundle?]] nullable لأن أول مرة مفيش state محفوظ.

~~~kotlin
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
~~~

- [[layoutInflater]]: الـ [[LayoutInflater]] بتاع الـ Activity، الأداة اللي بتحوّل XML لـ Views. في Kotlin [[getLayoutInflater()]] بتاعة Java بتتقري property.
- [[ActivityMainBinding.inflate(...)]]: static في الكلاس المولّد. جواه بيعمل [[inflater.inflate(R.layout.activity_main, ...)]] وبعدين [[bind(root)]] اللي بيدوّر على كل id مرة واحدة ويحطهم في الـ fields.
- [[setContentView(binding.root)]]: اعرض الـ root ([[getRoot()]] في Java). لازم **الـ root ده بالذات**، مش [[R.layout.activity_main]]: لو عملت كده هيتعمل inflate تاني ونسخة تانية من الـ Views هي اللي تظهر، والـ binding بيعدّل في نسخة مش ظاهرة.

~~~kotlin
        binding.btnClick.setOnClickListener {
            clicks++
            binding.txtTitle.text = "دوست $clicks مرة"
        }
~~~

- [[binding.btnClick]]: الزرار بنوعه الصح، من غير بحث ومن غير null.
- [[setOnClickListener { }]]: [[View.OnClickListener]] interface فيه دالة واحدة، فـ Kotlin بتقبل lambda مكانه (SAM conversion)، ولأنها آخر parameter بتتكتب برا الأقواس (trailing lambda). مش محتاجين [[v]] فمكتبناهوش.
- [[binding.txtTitle.text = ...]]: [[setText()]] / [[getText()]] بتوع Java بقوا property اسمها [[text]].
- [["دوست $clicks مرة"]]: string template بدل [[+]] بتاع Java.

~~~kotlin
        binding.composeView.setContent {
            MaterialTheme {
                Text("أنا Compose جوه XML")
            }
        }
    }
}
~~~

- [[binding.composeView.setContent { }]]: نفس [[setContent]] اللي في [[ComponentActivity]]، بس على View واحد. اللي جوه الـ lambda composables عادية.
- [[MaterialTheme { }]]: ثيم Material 3، عشان الألوان والخطوط.
- [[Text(...)]]: هيظهر تحت الزرار جوه الشاشة القديمة.

ده الطريق المعتاد للانتقال لـ Compose حتة حتة: الشاشة القديمة زي ما هي، والجديد جوه ComposeView.

---

## ٤. حل التجربة (solCode): عداد واحد للاتنين

~~~kotlin
    private val clicks = mutableIntStateOf(0)
~~~

[[mutableIntStateOf(0)]]: state بتاع Compose نوعه Int (من غير boxing). Compose بيراقبه، فأي composable بيقرا [[clicks.intValue]] بيترسم تاني لما يتغير.

~~~kotlin
        binding.btnClick.setOnClickListener { increment() }
        binding.composeView.setContent {
            MaterialTheme {
                Button(onClick = { increment() }) { Text("Compose: $__{clicks.intValue}") }
            }
        }
    }

    private fun increment() {
        clicks.intValue++
        binding.txtTitle.text = "دوست $__{clicks.intValue} مرة"
    }
~~~

- الزرار القديم والـ [[Button]] بتاع Compose الاتنين بينادوا [[increment()]].
- [[clicks.intValue++]]: Compose بيلاحظ، فنص الـ Button بيتحدث لوحده.
- [[binding.txtTitle.text = ...]]: الـ TextView القديم **مش** بيراقب state، فلازم نحدّثه بإيدك. ده الفرق بين النظامين في سطرين.

الكود ده اتترجم في نفس المشروع.

---

## الخلاصة

| findViewById | ViewBinding |
|---|---|
| [[findViewById<TextView>(R.id.txtTitle)]] | [[binding.txtTitle]] |
| ممكن يرجّع null وقت التشغيل | id مش موجود = خطأ ترجمة |
| ممكن تحط نوع غلط | النوع من الـ XML |
| [[setContentView(R.layout.x)]] | [[setContentView(binding.root)]] |

- فعّله بـ [[buildFeatures { viewBinding = true }]]، والكلاس اسمه من اسم الملف + [[Binding]].
- [[ComposeView]] + [[setContent { }]] = Compose جوه XML.`,
          lines: [
            R`Activity بـ Kotlin بتورث من [[AppCompatActivity]].`,
            R`[[lateinit]]: هيتعمل في onCreate.`,
            "عداد.",
            R`[[override]] إجبارية في Kotlin.`,
            "الأب الأول.",
            R`[[inflate]]: اعمل كل الـ views من الـ XML.`,
            R`اعرض الـ [[root]].`,
            R`الزرار بالاسم ونوعه صح، والـ lambda trailing.`,
            "زوّد.",
            R`[[text]] property بدل [[setText]].`,
            "قفلة الـ listener.",
            R`الـ [[ComposeView]] اللي في الـ XML: نحط فيه Compose.`,
            "ثيم Material.",
            "composable عادي.",
            "قفلة الثيم.",
            "قفلة setContent.",
            "قفلة onCreate.",
            "قفلة الكلاس."
          ],
          sol: R`الـ autocomplete بعد [[binding.]] بيقترح [[root]] و [[txtTitle]] و [[btnClick]] و [[composeView]]: كل عنصر ليه id. والنص اللي في Compose بيظهر تحت الزرار عادي جوه شاشة XML.

وحل التجربة: العداد لازم يبقى state يشوفه الاتنين. أبسط حاجة [[mutableIntStateOf]] كـ property في الـ Activity، والزرار القديم والجديد بيغيّروه، والـ TextView بيتحدث بإيدك في الـ listener. ده بيوضح ليه الأحسن تحط الـ state في ViewModel لما تخلط النظامين.`,
          solCode: R`class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private val clicks = mutableIntStateOf(0)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.btnClick.setOnClickListener { increment() }
        binding.composeView.setContent {
            MaterialTheme {
                Button(onClick = { increment() }) { Text("Compose: $__{clicks.intValue}") }
            }
        }
    }

    private fun increment() {
        clicks.intValue++
        binding.txtTitle.text = "دوست $__{clicks.intValue} مرة"
    }
}`
        },
        {
          cmd: "التكامل بين Java و Kotlin في أندرويد",
          title: "Java و Kotlin في نفس المشروع: تنادي ده من ده إزاي؟ (@Nullable و @JvmStatic و @JvmOverloads)",
          desc: R`Java و Kotlin بيترجموا لنفس الـ bytecode، فممكن يبقوا في نفس المشروع ونفس الـ module، وكل واحد ينادي التاني على طول. وده اللي خلّى الشركات تنقل لـ Kotlin تدريجيًا: الشاشات الجديدة Kotlin، والقديم Java زي ما هو.

من Kotlin تنادي Java:
• الكلاس والدوال زي ما هم: [[PriceFormatter.formatEgp(150.0)]].
• الـ getters و setters بتتقري كـ properties: [[user.getName()]] تبقى [[user.name]].
• المشكلة: Java ملهاش null safety. القيمة اللي جاية من Java من غير annotation نوعها [[String!]] (platform type): المترجم مش عارف هي nullable ولا لأ، وسايبلك المسؤولية.
• الحل: في Java حط [[@NonNull]] أو [[@Nullable]] (من [[androidx.annotation]]). Kotlin بتقراهم وتعامل النوع [[String]] أو [[String?]].

من Java تنادي Kotlin:
• دالة top-level في [[Utils.kt]] بتتنادى [[UtilsKt.format(...)]]. و [[@file:JvmName("Utils")]] يغيّر الاسم.
• دالة في [[companion object]] بتتنادى [[User.Companion.create()]]، إلا لو عليها [[@JvmStatic]] فتبقى [[User.create()]].
• الـ default arguments Java مبتفهمهاش. [[@JvmOverloads]] بيعمل نسخة لكل احتمال.
• الـ property [[val name]] بتبان في Java [[getName()]].`,
          example: R`package com.sara.shop.utils;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import java.util.Locale;

public class PriceFormatter {
    @NonNull
    public static String formatEgp(double amount) {
        return String.format(Locale.US, "%.2f ج.م", amount);
    }

    @Nullable
    public static String findCoupon(@NonNull String code) {
        return code.equals("EID") ? "خصم 10%" : null;
    }
}`,
          try: R`في مشروع Kotlin، اعمل الملف ده [[PriceFormatter.java]]، وناديه من Kotlin: [[PriceFormatter.formatEgp(99.5)]] و [[PriceFormatter.findCoupon("X")?.length]]. جرّب تشيل [[?.]] وشوف المترجم يعترض. بعدين شيل [[@Nullable]] من Java، واعمل [[val c: String = PriceFormatter.findCoupon("X")]] وشغّل.`,
          flag: "script",
          deep: {
            why: R`أي مشروع Android عمره أكتر من كام سنة فيه Java. وكمان مكتبات Java كتير (OkHttp كان Java، و Retrofit Java، و Glide Java). فهم حدود الـ interop بيمنع crashes غريبة في النقطة اللي اللغتين بيتقابلوا فيها.`,
            how: R`Gradle بيترجم الاتنين مع بعض: مترجم Kotlin بيقرا ملفات Java عشان يفهم الأنواع، وبعدين [[javac]] بيترجم Java وهو شايف الـ classes بتاعة Kotlin.

الـ platform type [[String!]] مش حاجة تقدر تكتبها، المترجم بس بيعرضها في الـ hints. لو حطيته في متغير [[String]] وجه null، Kotlin بتحط فحص وترمي [[NullPointerException]] في السطر ده بالظبط (أحسن من إنه يقع بعيد).

أسماء في Kotlin هي كلمات محجوزة في Java أو العكس: لو دالة Java اسمها [[is]] أو [[in]] أو [[object]]، بتناديها من Kotlin بين backticks.

[[@Throws(IOException::class)]] على دالة Kotlin: عشان Java تعرف إنها بترمي checked exception (Java بتجبر الـ catch، و Kotlin معندهاش الفكرة دي).

وأدوات مساعدة: Android Studio فيه Code ثم Convert Java File to Kotlin File. بيدّي نقطة بداية كويسة، بس راجع الناتج (بيحط [[!!]] كتير ولازم تنضّف).`,
            when: "أي مشروع فيه اللغتين، أو مكتبة Java بتستخدمها من Kotlin، أو مكتبة Kotlin هتتنادى من Java.",
            mistakes: R`تثق في قيمة جاية من Java من غير annotations وتحطها في نوع مش nullable. وتنسى [[@JvmStatic]] وتستغرب [[Companion]] في كود Java. وتحوّل ملف كبير بالـ converter وتعمل commit من غير مراجعة وكله [[!!]].`
          },
          teach: R`## الكود بيعمل إيه؟

المثال كلاس Java فيه دالتين [[static]]: واحدة بتنسّق السعر بالجنيه ومبترجعش null أبدًا، وواحدة بتدوّر على كوبون وممكن ترجّع null. والـ annotations [[@NonNull]] و [[@Nullable]] بتقول لـ Kotlin الفرق ده. والحل (solCode) الجهة التانية: كود Kotlin متظبط عشان Java تناديه بشكل طبيعي.

### اتجرّب فين؟

الاتنين اتشغّلوا جوه [[docker run --rm eclipse-temurin:21-jdk]]: الـ Java بـ [[javac]] (Java 21) مع [[androidx.annotation]] ([[annotation-jvm-1.9.1.jar]]) على الـ classpath، والـ Kotlin بـ [[kotlinc]] 2.4.20 وهو شايف الـ classes بتاعة Java. ونفس الملفات اتترجمت كمان جوه مشروع Android حقيقي (AGP 9.4.1) فيه Java و Kotlin في نفس الـ module.

---

## ١. الـ Java سطر سطر

~~~java
package com.sara.shop.utils;
~~~

[[package]]: الكلاس ده في «فولدر» اسمه [[com.sara.shop.utils]]. وفي Java مكان الملف لازم يطابقه: [[com/sara/shop/utils/PriceFormatter.java]]. والـ [[;]] آخر كل جملة في Java إجباري.

~~~java
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import java.util.Locale;
~~~

- [[@NonNull]] و [[@Nullable]]: annotations من مكتبة [[androidx.annotation]] (موجودة في أي مشروع Android). لوحدها مبتعملش حاجة وقت التشغيل، هي معلومة للأدوات والمترجم.
- [[Locale]]: إعدادات اللغة والبلد، وبتأثر على شكل الأرقام.

~~~java
public class PriceFormatter {
    @NonNull
    public static String formatEgp(double amount) {
        return String.format(Locale.US, "%.2f ج.م", amount);
    }
~~~

- [[public class]]: كلاس متاح لأي حد. في Java لازم تكتب [[public]]، وفي Kotlin هو الافتراضي.
- [[@NonNull]] فوق الدالة: «اللي بترجّعه عمره ما يبقى null».
- [[public static String formatEgp(double amount)]]: بالترتيب: متاحة للكل، [[static]] (تتنادى باسم الكلاس من غير object، زي [[companion object]] في Kotlin)، بترجّع [[String]]، اسمها، وبتاخد [[double]] اسمه amount. في Java النوع قبل الاسم.
- [[String.format(Locale.US, "%.2f ج.م", amount)]]: [[%.2f]] يعني «رقم عشري برقمين بعد العلامة». و [[Locale.US]] عشان العلامة العشرية تبقى نقطة والأرقام إنجليزي حتى لو لغة الموبايل عربي أو ألماني.

~~~java
    @Nullable
    public static String findCoupon(@NonNull String code) {
        return code.equals("EID") ? "خصم 10%" : null;
    }
}
~~~

- [[@Nullable]]: «ممكن ترجّع null».
- [[@NonNull String code]]: الـ parameter نفسه مينفعش يبقى null.
- [[code.equals("EID")]]: مقارنة النصوص في Java بـ [[equals]]، مش [[==]] (اللي في Java بيقارن العنوان في الذاكرة). في Kotlin [[==]] بتنادي [[equals]] لوحدها.
- [[شرط ? أ : ب]]: الـ ternary operator: لو الشرط true خد أ، غير كده ب. Kotlin مفيهاش ده، وبتستخدم [[if (شرط) أ else ب]] كتعبير.

---

## ٢. من Kotlin: الـ annotations بتعمل إيه

~~~kotlin
import com.sara.shop.utils.PriceFormatter
fun main() {
    val p = PriceFormatter.formatEgp(99.5)
    println(p)
    println(PriceFormatter.findCoupon("EID"))
    println(PriceFormatter.findCoupon("X")?.length)
}
~~~

~~~text الناتج
99.50 ج.م
خصم 10%
null
~~~

- [[PriceFormatter.formatEgp(99.5)]]: الدوال الـ [[static]] بتتنادى من Kotlin باسم الكلاس زي ما هي. وبسبب [[@NonNull]]، Kotlin شايفة النوع [[String]].
- [[findCoupon("X")?.length]]: بسبب [[@Nullable]] النوع [[String?]]، فلازم [[?.]] (درس null safety): لو null رجّع null من غير ما تكمل.

شيلت [[?.]] وكتبت [[findCoupon("X").length]]:

~~~text الناتج
use2.kt:3:43: error: only safe (?.) or non-null asserted (!!.) calls are allowed on a nullable receiver of type 'String?'.
~~~

المترجم مسك الغلطة قبل التشغيل. ده كل المكسب من [[@Nullable]].

---

## ٣. من غير annotation: الـ platform type [[String!]]

شيلت [[@Nullable]] من الـ Java وعدت ترجمته. دلوقتي Kotlin مش عارفة الدالة ممكن ترجّع null ولا لأ، فالنوع بقى **platform type**، والـ IDE بيعرضه [[String!]] (مش syntax تقدر تكتبه). المترجم بيسيبك تعامله زي ما انت عايز، والمسؤولية عليك.

نفس السطر [[findCoupon("X").length]] اترجم من غير ولا كلمة، ووقع وقت التشغيل:

~~~text الناتج
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.length()" because the return value of "com.sara.shop.utils.PriceFormatter.findCoupon(String)" is null
	at Use2Kt.main(use2.kt:3)
~~~

والتجربة اللي في الـ try ([[val c: String = PriceFormatter.findCoupon("X")]]):

~~~text الناتج
EID: خصم 10%
Exception in thread "main" java.lang.NullPointerException: findCoupon(...) must not be null
	at Use3Kt.main(use3.kt:5)
~~~

- مع [[EID]] اشتغل عادي، فالـ bug بيستخبى لحد ما قيمة null تيجي.
- لما حطيت platform type في متغير [[String]]، Kotlin حطت فحص في السطر ده بالظبط، فالـ crash بيشاور على المكان الصح (سطر 5) ورسالته [[must not be null]]، مش بعدين في حتة بعيدة.
- ونفس السطر والـ [[@Nullable]] موجودة: المترجم رفض: [[initializer type mismatch: expected 'String', actual 'String?']].

| الـ Java | Kotlin شايفة | لو جه null |
|---|---|---|
| [[@NonNull String]] | [[String]] | مش المفروض يحصل |
| [[@Nullable String]] | [[String?]] | المترجم بيجبرك تتعامل معاه |
| [[String]] من غير annotation | [[String!]] (platform type) | crash وقت التشغيل |

---

## ٤. الجهة التانية: Java تنادي Kotlin (solCode)

~~~kotlin
@file:JvmName("Prices")
package com.sara.shop.utils

@JvmOverloads
fun discount(price: Double, percent: Int = 10): Double = price * (100 - percent) / 100

class Coupon private constructor(val code: String) {
    companion object {
        @JvmStatic
        fun of(code: String) = Coupon(code.uppercase())
    }
}
~~~

### [[@file:JvmName("Prices")]]

الدالة [[discount]] top-level (مش جوه كلاس). بس الـ JVM مفيهوش دوال برا كلاس، فـ Kotlin بتحطها في كلاس اسمه من اسم الملف + [[Kt]]: [[PricesKt]]. [[@file:JvmName]] (لازم أول سطر، قبل [[package]]) بيغيّر الاسم لـ [[Prices]]. اتأكدت: كتبت [[PricesKt.discount(200.0)]] في Java:

~~~text الناتج
Bad.java:4: error: cannot find symbol
        double a = PricesKt.discount(200.0);
~~~

### [[@JvmOverloads]]

Java مفيهاش default arguments، فكانت هتشوف [[discount(double, int)]] بس. [[@JvmOverloads]] بيولّد نسخة لكل عدد parameters. شفت الكلاس المترجم بـ [[javap]] (أداة في الـ JDK بتعرض شكل الـ class):

~~~text الناتج
public final class com.sara.shop.utils.Prices {
  public static final double discount(double, int);
  public static double discount$default(double, int, int, java.lang.Object);
  public static final double discount(double);
}
~~~

[[discount(double)]] هي النسخة اللي [[@JvmOverloads]] عملها. و [[discount$default]] دالة داخلية Kotlin بتستخدمها للقيم الافتراضية.

### [[class Coupon private constructor(val code: String)]]

- [[private constructor]]: محدش يعمل Coupon بـ [[Coupon("...")]] من برا. لازم يعدّي على [[of]] اللي بتعمل [[uppercase()]] الأول.
- [[val code]] بتبان لـ Java كـ getter: [[getCode()]] (في javap فوق: [[public final java.lang.String getCode();]]).

### [[@JvmStatic]]

من غيره، Java بتنادي دوال الـ companion عن طريق field اسمه [[Companion]]: [[Coupon.Companion.of("x")]]. ومعاه بيتعمل كمان [[static]] حقيقية على الكلاس نفسه: [[public static final com.sara.shop.utils.Coupon of(java.lang.String);]]، فتبقى [[Coupon.of("eid")]].

### كود Java اللي في التعليقات، متشغّل

~~~java
double a = Prices.discount(200.0);
double b = Prices.discount(200.0, 25);
Coupon c = Coupon.of("eid");
String code = c.getCode();
System.out.println(a + " " + b + " " + code);
~~~

~~~text الناتج
180.0 150.0 EID
~~~

- [[discount(200.0)]]: الـ percent الافتراضي 10، فـ [[200 * 90 / 100 = 180.0]].
- [[discount(200.0, 25)]]: [[200 * 75 / 100 = 150.0]].
- [[Coupon.of("eid").getCode()]]: [[EID]] لأن [[of]] كبّرت الحروف.
- و [[Coupon.Companion.of("x")]] لسه شغالة كمان (طلعت [[X]]).

---

## الخلاصة

| عايز | اعمل |
|---|---|
| Kotlin تعرف إن قيمة Java ممكن تبقى null | [[@Nullable]] في Java |
| Kotlin تعرف إنها مش null | [[@NonNull]] في Java |
| اسم كلاس الدوال top-level يبقى نضيف | [[@file:JvmName("...")]] |
| Java تستخدم الـ default arguments | [[@JvmOverloads]] |
| Java تنادي دالة companion من غير [[.Companion]] | [[@JvmStatic]] |
| Java تقرا [[val name]] | [[getName()]] لوحدها |

- قيمة جاية من Java من غير annotation = [[String!]]: عاملها كأنها [[String?]].`,
          lines: [
            "الـ package.",
            R`[[@NonNull]] من androidx.`,
            R`[[@Nullable]].`,
            R`[[Locale]] عشان الأرقام تطلع بالشكل الإنجليزي في أي لغة.`,
            "كلاس Java.",
            R`الدالة دي عمرها ما ترجّع null: Kotlin هتشوف النوع [[String]].`,
            R`[[static]]: تتنادى باسم الكلاس.`,
            "نص برقمين بعد العلامة.",
            "قفلة.",
            R`ممكن ترجّع null: Kotlin هتشوف [[String?]].`,
            "والـ parameter مش nullable.",
            "خصم للكود EID، و null لغيره.",
            "قفلة.",
            "قفلة الكلاس."
          ],
          sol: R`[[PriceFormatter.formatEgp(99.5)]] بترجّع [["99.50 ج.م"]] ونوعها [[String]]. و [[findCoupon("X")?.length]] بترجّع null، ومن غير [[?.]] المترجم بيقول [[only safe (?.) or non-null asserted (!!.) calls are allowed on a nullable receiver of type 'String?']].

ومن غير [[@Nullable]]: المترجم بيسكت (platform type)، بس وقت التشغيل السطر بيقع بـ [[NullPointerException]] لأن القيمة null اتحطت في String. ده بالظبط الـ crash اللي الـ annotations بتمنعه.

والجهة التانية (Kotlin تتنادى من Java) في الكود تحت.`,
          solCode: R`// Kotlin
@file:JvmName("Prices")
package com.sara.shop.utils

@JvmOverloads
fun discount(price: Double, percent: Int = 10): Double = price * (100 - percent) / 100

class Coupon private constructor(val code: String) {
    companion object {
        @JvmStatic
        fun of(code: String) = Coupon(code.uppercase())
    }
}

// Java
// double a = Prices.discount(200.0);       // بالقيمة الافتراضية بفضل @JvmOverloads
// double b = Prices.discount(200.0, 25);
// Coupon c = Coupon.of("eid");            // من غير .Companion بفضل @JvmStatic
// String code = c.getCode();               // الـ val بتبان getter`
        }
      ]
    }
]);
