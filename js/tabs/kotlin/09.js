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
    }
]);
