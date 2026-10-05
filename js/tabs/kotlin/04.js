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

لو وقع بـ [[UnknownHostException]] و النت شغال: نسيت صلاحية INTERNET. ولو [[SerializationException: ... Encountered an unknown key]]: نسيت [[ignoreUnknownKeys]].

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

[[exportSchema]] (افتراضيًا true) بيكتب شكل الداتابيز في JSON، وده اللي AutoMigration محتاجه، فاعمل له commit.

ومن Room 2.7 المكتبة بتدعم Kotlin Multiplatform كمان.`,
            when: "لستات وداتا ليها علاقات أو محتاجة بحث وترتيب، و cache لداتا السيرفر. والإعدادات الصغيرة DataStore.",
            mistakes: R`[[id: Long]] من غير [[= 0]] مع autoGenerate فتحتار تبعت إيه. ونسيان KSP plugin فيقع بـ [[AppDatabase_Impl does not exist]]. وتغيّر الـ Entity من غير ما تزوّد الـ version: [[Room cannot verify the data integrity]]. وتعمل [[Room.databaseBuilder]] في كل شاشة: اعمله مرة (singleton أو Hilt).`
          },
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
