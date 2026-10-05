// تكملة تاب kotlin: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/kotlin/01.js (شرح حقول الدرس في أوله)
MORE("kotlin", [
    {
      t: "المعمارية و Hilt",
      l: 3,
      n: "تقسيم التطبيق لطبقة UI وطبقة data، والـ repository، والـ dependency injection بـ Hilt",
      items: [
        {
          cmd: "المعمارية: UI و data",
          title: "معمارية التطبيق اللي Google بتوصي بيها: UI layer و data layer و repository",
          desc: R`لما التطبيق يكبر، لو كل حاجة في الـ composable أو الـ ViewModel (نداء API، وكتابة في Room، ومنطق، ورسم)، أي تغيير هيكسر حاجة تانية. Google بتوصي بتقسيم بسيط:

١. UI layer:
• الـ composables: بترسم الـ state، وبتبعت الأحداث. مفيهاش منطق.
• الـ ViewModel: بيمسك الـ UI state، وبيستقبل الأحداث، وبيكلم الـ data layer.

٢. Data layer:
• [[Repository]]: المكان الوحيد اللي الداتا بتاعة موضوع معين بتيجي منه (ملاحظات، مستخدم...). بيقرر يجيب من الشبكة ولا الداتابيز ولا الاتنين، والـ ViewModel ميعرفش.
• الـ data sources: الـ API (Retrofit)، والـ DAO (Room)، و DataStore. كل واحد بيعمل حاجة واحدة.

وأحيانًا Domain layer في النص (use cases) لمنطق business بيتكرر في كذا ViewModel. اختيارية، متعملهاش إلا لما تحتاجها.

القواعد:
• الاعتماد ماشي لتحت بس: UI بيعرف الـ repository، والـ repository ميعرفش حاجة عن الـ UI.
• [[unidirectional data flow]]: الـ state نازل من الداتا للشاشة، والأحداث طالعة من الشاشة للداتا.
• single source of truth: لو فيه cache في Room، الشاشة بتقرا من Room دايمًا، والشبكة بتكتب في Room. كده الداتا واحدة في كل حتة، والتطبيق شغال من غير نت (offline-first).`,
          example: R`class NotesRepository(
    private val dao: NoteDao,
    private val api: NotesApi
) {
    val notes: Flow<List<NoteEntity>> = dao.observeAll()
    suspend fun refresh() {
        val remote = api.getNotes()
        dao.upsertAll(remote.map { it.toEntity() })
    }
    suspend fun add(title: String) {
        dao.insert(NoteEntity(title = title))
    }
}
class NotesViewModel(private val repo: NotesRepository) : ViewModel() {
    val notes: StateFlow<List<NoteEntity>> = repo.notes
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())
    fun onAddClicked(title: String) {
        if (title.isBlank()) return
        viewModelScope.launch { repo.add(title.trim()) }
    }
    fun onRefresh() {
        viewModelScope.launch {
            runCatching { repo.refresh() }
        }
    }
}`,
          try: R`ارسم (على ورقة) طبقات تطبيق الملاحظات: الشاشة، والـ ViewModel، والـ repository، والـ DAO، والـ API، وأسهم الاعتماد. بعدين في الكود: اعمل [[NoteDao]] فيه [[@Upsert suspend fun upsertAll(notes: List<NoteEntity>)]]، و [[fun NoteDto.toEntity()]] extension بتحوّل من شكل الـ API لشكل الداتابيز. وغيّر [[onRefresh]] بحيث تعرض رسالة لو فشل.`,
          flag: "script",
          deep: {
            why: R`عشان تقدر تغيّر حاجة من غير ما تكسر التانية: تبدّل Retrofit بـ Ktor في الـ data source بس، أو تغيّر شكل الشاشة من غير ما تلمس المنطق. وعشان الاختبارات: الـ ViewModel تختبره بـ repository وهمي (fake) من غير شبكة ولا داتابيز. وده كمان اللي بيتسأل عنه في أي انترفيو Android متوسط.`,
            how: R`الـ repository بيعرض [[Flow]] للقراية (عشان الشاشة تتحدث لوحدها) و [[suspend fun]] للعمليات. وبيستقبل الـ data sources في الـ constructor (مش بيعملهم بنفسه)، وده اللي بيخلي تبديلهم سهل (الدرس الجاي).

الـ models: كل طبقة ممكن يبقى ليها شكلها: [[NoteDto]] (شكل الـ JSON)، و [[NoteEntity]] (شكل الجدول)، و [[Note]] (اللي الـ UI بيستخدمه). المشاريع الصغيرة بتدمج ده، والكبيرة بتفصله عشان تغيير الـ API ميوصلش للشاشة. والتحويل بـ extension functions زي [[toEntity()]].

[[@Upsert]] في Room: insert لو مش موجود و update لو موجود، مناسب للـ sync من السيرفر.

[[runCatching]] في [[onRefresh]] للتبسيط هنا. في المشروع الحقيقي امسك [[IOException]] وحط الغلط في الـ UI state (رسالة snackbar)، وخلي بالك إن runCatching بتمسك CancellationException كمان (درس exceptions).

والمشاريع الكبيرة بتقسّم كمان لـ modules في Gradle ([[:core:data]] و [[:feature:notes]]): البناء أسرع، والحدود بين الطبقات المترجم هو اللي بيحرسها. مشروع Google المفتوح [[Now in Android]] مثال كامل على كده.`,
            when: R`من أول ما يبقى عندك أكتر من شاشة أو أكتر من مصدر داتا. وللتطبيق الصغير جدًا، repository بسيط و ViewModel كفاية، من غير use cases ولا modules.`,
            mistakes: R`ViewModel بينادي Retrofit و Room مباشرة. و repository بيرجّع [[MutableStateFlow]] أو بيعرف حاجة عن Compose. و «Clean Architecture» كاملة بـ ٣ models و use case لكل دالة في تطبيق فيه شاشتين: تعقيد من غير لازمة. والشاشة تعمل refresh من الشبكة وتعرض نتيجته مباشرة، وفي نفس الوقت تقرا من Room، فيبقى عندك مصدرين حقيقة.`
          },
          lines: [
            "الـ repository بتاع الملاحظات...",
            "...بياخد الـ DAO...",
            "...والـ API في الـ constructor (مش بيعملهم بنفسه).",
            "قفلة الـ constructor.",
            R`القراية من Room دايمًا: [[Flow]] بيتحدث لوحده.`,
            "مزامنة مع السيرفر.",
            "هات من الشبكة.",
            R`حوّل واكتب في Room، والـ Flow اللي فوق هيبلّغ الشاشة.`,
            "قفلة.",
            "إضافة.",
            "في Room (وممكن تبعت للسيرفر بعدين).",
            "قفلة.",
            "قفلة الـ repository.",
            "الـ ViewModel بياخد الـ repository بس.",
            "الـ state للشاشة...",
            "...من الـ Flow بتاع الـ repository.",
            "حدث من الشاشة.",
            "تحقق بسيط في الـ ViewModel.",
            "العملية في coroutine.",
            "قفلة.",
            "حدث refresh.",
            "coroutine.",
            "لو فشل (مفيش نت) الداتا المحلية لسه ظاهرة.",
            "قفلة launch.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`الأسهم: Screen ← ViewModel ← NotesRepository ← (NoteDao و NotesApi). مفيش سهم بيطلع لفوق: الـ repository ميعرفش مين بيستخدمه، والـ DAO ميعرفش حاجة عن الـ repository.

والحل في الكود تحت. لاحظ إن الشاشة مش هتتغير خالص بسبب الـ refresh: الـ refresh بيكتب في Room، و Room بيبلّغ الـ Flow، والـ Flow بيحدّث الشاشة. ده الـ single source of truth.`,
          solCode: R`@Serializable
data class NoteDto(val id: Long, val title: String)

fun NoteDto.toEntity() = NoteEntity(id = id, title = title)

@Dao
interface NoteDao {
    // ... الدوال اللي فاتت
    @Upsert
    suspend fun upsertAll(notes: List<NoteEntity>)
}

// في الـ ViewModel
private val _message = MutableStateFlow<String?>(null)
val message = _message.asStateFlow()

fun onRefresh() {
    viewModelScope.launch {
        try {
            repo.refresh()
        } catch (e: IOException) {
            _message.value = "مقدرناش نحدّث، اللي ظاهر محفوظ عندك"
        }
    }
}`
        },
        {
          cmd: "Hilt",
          title: "Hilt: الـ dependency injection في Android، و @Inject و @Module و @HiltViewModel",
          desc: R`الـ [[dependency injection]] (DI) فكرة بسيطة: الكلاس ميعملش الحاجات اللي محتاجها بنفسه، ياخدها جاهزة في الـ constructor. وده اللي عملناه في الـ repository. المشكلة إن حد لازم يعمل كل الحاجات دي ويوصّلها ببعض: الـ database، والـ DAO، والـ Retrofit، والـ repository، والـ ViewModel. لو عملته بإيدك هيبقى كود كتير في كل حتة.

[[Hilt]] (من Google، مبني على Dagger) بيعمل ده وقت الترجمة:
• [[@HiltAndroidApp]] على كلاس الـ [[Application]]: نقطة البداية. وتسجّله في الـ manifest بـ [[android:name=".NotesApp"]].
• [[@AndroidEntryPoint]] على الـ Activity.
• [[@Inject constructor(...)]]: «Hilt، اعمل الكلاس ده بنفسك، وهات اللي في الـ constructor».
• [[@HiltViewModel]] على الـ ViewModel، وفي Compose [[hiltViewModel()]] بدل [[viewModel()]].
• للحاجات اللي مش بتاعتك (Room و Retrofit) ومتقدرش تحط عليها @Inject: [[@Module]] فيه دوال [[@Provides]] بتقول تتعمل إزاي.
• [[@InstallIn(SingletonComponent::class)]]: الـ module ده عايش طول عمر التطبيق. و [[@Singleton]]: نسخة واحدة بس.
• [[@ApplicationContext context: Context]]: Hilt بيديك الـ Application context.

في Gradle: plugin [[com.google.dagger.hilt.android]] و KSP، ومكتبات [[hilt-android]] و [[ksp(hilt-compiler)]] و [[androidx.hilt:hilt-lifecycle-viewmodel-compose]] (فيها [[hiltViewModel]]).`,
          example: R`@HiltAndroidApp
class NotesApp : Application()
@Module
@InstallIn(SingletonComponent::class)
object DataModule {
    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): AppDatabase =
        Room.databaseBuilder(context, AppDatabase::class.java, "notes.db").build()
    @Provides
    fun provideNoteDao(db: AppDatabase): NoteDao = db.noteDao()
}
class NotesRepository @Inject constructor(private val dao: NoteDao) {
    val notes = dao.observeAll()
}
@HiltViewModel
class NotesViewModel @Inject constructor(private val repo: NotesRepository) : ViewModel() {
    val notes = repo.notes.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())
}
@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            val vm: NotesViewModel = hiltViewModel()
            val notes by vm.notes.collectAsStateWithLifecycle()
            Text("عندك $__{notes.size} ملاحظة")
        }
    }
}`,
          try: R`ضيف Hilt لمشروع الملاحظات، وانقل كل [[Room.databaseBuilder]] و [[Retrofit.Builder]] لـ modules. شيل أي factory عملتها بإيدك. بعدين ضيف [[provideNotesApi]] في module تاني اسمه [[NetworkModule]]، وخلي الـ repository ياخد الـ API كمان.`,
          flag: "script",
          deep: {
            why: R`من غير DI، كل ViewModel محتاج factory، وكل factory بيعمل الـ repository، والـ repository بيعمل الـ database... ولو حاجة اتغيرت بتعدّل في ١٠ أماكن. ومع Hilt بتضيف parameter في الـ constructor وخلاص. وكمان في الاختبارات بتبدّل module الشبكة الحقيقي بواحد وهمي. وأغلب إعلانات الشغل Android بتطلب Hilt أو Dagger بالاسم.`,
            how: R`Hilt بيولّد كود Dagger وقت الترجمة (بـ KSP): «graph» بيعرف كل حاجة بتتعمل منين ومحتاجة إيه. لو حاجة ناقصة (ViewModel محتاج حاجة ملهاش @Inject ولا @Provides)، البناء بيقع برسالة [[cannot be provided without an @Provides-annotated method]]. يعني الغلط بيظهر وقت البناء مش وقت التشغيل.

الـ components والـ scopes: [[SingletonComponent]] عايش طول عمر التطبيق ([[@Singleton]])، و [[ActivityRetainedComponent]] بيعيش بعد الـ rotation، و [[ViewModelComponent]] لكل ViewModel ([[@ViewModelScoped]]). من غير scope annotation، Hilt بيعمل نسخة جديدة كل مرة حد يطلب.

[[@Binds]]: لو عندك interface ([[NotesRepository]]) وتنفيذ ([[OfflineFirstNotesRepository]])، بتقول لـ Hilt «لما حد يطلب الـ interface اديله التنفيذ ده». ده أخف من @Provides.

و [[hiltViewModel()]] اتنقلت من [[androidx.hilt.navigation.compose]] (deprecated) لـ [[androidx.hilt.lifecycle.viewmodel.compose]] من نسخة 1.3. لو بتقرا tutorial قديم هتلاقي الـ import القديم.

البديل الأشهر [[Koin]]: DI بيشتغل وقت التشغيل من غير توليد كود، أبسط في البداية وشغال في Kotlin Multiplatform، بس الأخطاء بتظهر وقت التشغيل.`,
            when: R`أي تطبيق فيه أكتر من كام كلاس بيعتمدوا على بعض. وللتجارب الصغيرة جدًا، DI يدوي (تعمل الحاجات في الـ Application وتوزعها) كفاية.`,
            mistakes: R`تنسى [[@AndroidEntryPoint]] على الـ Activity: [[Given component holder class MainActivity does not implement interface dagger.hilt.internal.GeneratedComponent]]. وتنسى [[android:name]] في الـ manifest فالـ Application بتاعك مش بيتعمل. و [[@Singleton]] على حاجة شايلة state شاشة معينة. واستخدام [[kapt]] من tutorial قديم مع AGP 9: استخدم KSP.`
          },
          lines: [
            R`[[@HiltAndroidApp]]: هنا Hilt بيبدأ.`,
            R`كلاس الـ Application (ويتسجّل في الـ manifest بـ [[android:name]]).`,
            R`[[@Module]]: وصفات لحاجات مش بتاعتنا.`,
            "عايش طول عمر التطبيق.",
            R`[[object]] لأن مفيش state.`,
            R`[[@Provides]]: الدالة دي بتعمل حاجة.`,
            "نسخة واحدة بس من الداتابيز.",
            "محتاجة Context، و Hilt بيديه.",
            "الوصفة نفسها.",
            "وصفة تانية.",
            "الـ DAO من الداتابيز (Hilt بيبعتها لوحده).",
            "قفلة.",
            R`[[@Inject constructor]]: Hilt يعمل الـ repository لوحده ويديله الـ DAO.`,
            "Flow الملاحظات.",
            "قفلة.",
            R`[[@HiltViewModel]].`,
            "Hilt بيدي الـ repository للـ ViewModel.",
            "الـ state.",
            "قفلة.",
            R`[[@AndroidEntryPoint]]: الـ Activity دي بتستقبل من Hilt.`,
            "الـ Activity.",
            "onCreate.",
            "الأب.",
            "الـ UI.",
            R`[[hiltViewModel()]] بدل [[viewModel()]]، ومفيش factory.`,
            "نسمع.",
            "نعرض.",
            "قفلة setContent.",
            "قفلة onCreate.",
            "قفلة."
          ],
          sol: R`بعد Hilt، الـ ViewModel بيتعمل من غير أي factory، والداتابيز نسخة واحدة في التطبيق كله. ولو نسيت حاجة في الـ graph (مثلًا الـ repository محتاج [[NotesApi]] ومفيش @Provides ليه)، البناء نفسه هيقع ويقولك بالظبط إيه الناقص ومين طالبه.

والـ NetworkModule في الكود تحت.`,
          solCode: R`@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {
    @Provides
    @Singleton
    fun provideJson(): Json = Json { ignoreUnknownKeys = true }

    @Provides
    @Singleton
    fun provideNotesApi(json: Json): NotesApi = Retrofit.Builder()
        .baseUrl("https://api.example.com/")
        .addConverterFactory(json.asConverterFactory("application/json".toMediaType()))
        .build()
        .create(NotesApi::class.java)
}

class NotesRepository @Inject constructor(
    private val dao: NoteDao,
    private val api: NotesApi
) {
    // ...
}`
        }
      ]
    },
    {
      t: "الاختبارات والـ debugging والأداء",
      l: 3,
      n: "unit tests بـ JUnit و runTest، واختبارات Compose UI، و Logcat والـ debugger و Layout Inspector، وأساسيات الأداء",
      items: [
        {
          cmd: "unit tests",
          title: "unit tests في Android: JUnit و assertEquals، وتختبر ViewModel فيه coroutines بـ runTest",
          desc: R`الـ unit test كود بيشغّل حتة من كودك ويتأكد إن النتيجة صح. في مشروع Android فيه فولدرين:
• [[src/test/]]: unit tests بتشتغل على الـ JVM بتاع جهازك. سريعة جدًا (ثواني)، ومفيهاش Android. ده مكان اختبار المنطق والـ ViewModels والـ repositories.
• [[src/androidTest/]]: instrumented tests بتشتغل على emulator أو موبايل. أبطأ، للـ UI وللحاجات اللي محتاجة Android فعلًا (الدرس الجاي).

JUnit 4 (اللي Android Studio بيحطه افتراضيًا):
• [[@Test]] فوق كل دالة اختبار. والاسم بيوصف السلوك: [[discount_isAppliedAboveThreshold]].
• [[assertEquals(expected, actual)]]: المتوقع الأول. وللـ Double فيه parameter تالت للفرق المسموح: [[assertEquals(900.0, result, 0.001)]].
• [[assertTrue]] و [[assertNull]]، و [[@Test(expected = IllegalArgumentException::class)]] للـ exceptions (أو [[assertThrows]]).

وكل اختبار بيمشي ٣ خطوات (Arrange و Act و Assert): جهّز، نفّذ، اتأكد.

ولو الكود فيه [[suspend]] أو coroutines: [[runTest { }]] من مكتبة [[kotlinx-coroutines-test]]. بتشغّل الـ coroutines وبتتخطى الـ [[delay]] (الـ delay بتاع ثانية بياخد صفر وقت حقيقي).

ولو الـ ViewModel بيستخدم [[viewModelScope]]: ده بيشتغل على [[Dispatchers.Main]] اللي مش موجود على الـ JVM العادي، فبتبدّله بـ [[Dispatchers.setMain(...)]] قبل الاختبار.

وتشغّلهم بـ [[./gradlew test]] أو بالمثلث الأخضر جنب الكلاس.`,
          example: R`class PriceCalculator {
    fun finalPrice(price: Double): Double {
        require(price >= 0) { "السعر مينفعش يبقى سالب" }
        return if (price >= 1000) price * 0.9 else price
    }
}
class PriceCalculatorTest {
    private val calc = PriceCalculator()
    @Test
    fun discount_isAppliedAboveThreshold() {
        assertEquals(900.0, calc.finalPrice(1000.0), 0.001)
    }
    @Test
    fun noDiscount_belowThreshold() {
        assertEquals(500.0, calc.finalPrice(500.0), 0.001)
    }
    @Test(expected = IllegalArgumentException::class)
    fun negativePrice_throws() {
        calc.finalPrice(-1.0)
    }
}`,
          try: R`حط [[PriceCalculator]] في [[src/main]] والاختبار في [[src/test]] بنفس الـ package، وشغّل [[./gradlew test]]. بعدين بوّظ الكود عن قصد (خلي الشرط [[> 1000]]) وشوف أنهي اختبار وقع ورسالته. وبعدين اكتب اختبار للـ [[CartViewModel]] (درس الـ ViewModel): ضيف منتجين واتأكد من العدد والإجمالي.`,
          flag: "script",
          deep: {
            why: R`الاختبار بيمسك البق قبل اليوزر، وبيخليك تعدّل في الكود (refactor) وانت مطمن إنك مكسرتش حاجة. وفي الشركات الـ CI بيشغّل الاختبارات مع كل pull request، والـ PR مبيدخلش لو فيه اختبار واقع. والانترفيو بيسأل «بتختبر الـ ViewModel إزاي؟».`,
            how: R`الـ unit tests بتشتغل على JVM عادي، و [[android.jar]] اللي بيتعمل عليه compile فيه stubs بس: أي نداء لكلاس Android (زي [[Log.d]] أو [[TextUtils]]) بيرمي [[Method ... not mocked]]. عشان كده المنطق المهم يتكتب Kotlin عادي من غير Android، أو تستخدم [[Robolectric]] اللي بيشغّل Android وهمي على الـ JVM.

الـ fakes أحسن من الـ mocks غالبًا: [[class FakeNotesRepository : NotesRepository]] بـ List في الذاكرة. أبسط تقرا وأقل هشاشة من [[Mockito]] أو [[MockK]] (اللي برضه منتشرين وهتقابلهم).

ViewModel بـ viewModelScope: اعمل JUnit Rule اسمها [[MainDispatcherRule]] بتنادي [[Dispatchers.setMain(UnconfinedTestDispatcher())]] قبل كل اختبار و [[Dispatchers.resetMain()]] بعده (الكود تحت).

ولاختبار Flow فيه قيم كتير ورا بعض، مكتبة [[Turbine]] بتسهّل: [[flow.test { assertEquals(1, awaitItem()) }]].

و JUnit 5 ممكن تستخدمه في unit tests بـ plugin إضافي، بس JUnit 4 لسه الافتراضي في Android والـ instrumented tests.`,
            when: "أي منطق فيه شروط أو حسابات، وكل ViewModel، وكل bug بتصلحه (اكتب اختبار بيمسكه الأول وبعدين صلّح).",
            mistakes: R`تحط المنطق في الـ composable فمتعرفش تختبره من غير UI. وتختبر تفاصيل التنفيذ مش السلوك (كل ما تعدّل الكود الاختبار يقع). وتنسى [[runTest]] وتنادي suspend fun من اختبار عادي فمش هيترجم. و [[assertEquals(actual, expected)]] بالعكس فرسالة الغلط تبقى ملخبطة.`
          },
          lines: [
            "الكلاس اللي هنختبره (في src/main).",
            "دالة السعر النهائي.",
            "تحقق من المدخلات.",
            "خصم 10% من 1000 وطالع.",
            "قفلة.",
            "قفلة.",
            "كلاس الاختبار (في src/test).",
            "object جديد للاختبارات.",
            R`[[@Test]]: دي دالة اختبار.`,
            "الاسم بيوصف السلوك.",
            "المتوقع 900، والفرق المسموح 0.001 عشان الـ Double.",
            "قفلة.",
            "اختبار تاني.",
            "تحت الحد.",
            "زي ما هو.",
            "قفلة.",
            "الاختبار ده ناجح لو الـ exception ده اترمى.",
            "سعر سالب.",
            R`المفروض [[require]] ترمي.`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[./gradlew test]] بيطبع [[BUILD SUCCESSFUL]]، والتقرير في [[app/build/reports/tests/testDebugUnitTest/index.html]].

لما الشرط يبقى [[> 1000]]: [[discount_isAppliedAboveThreshold]] بيقع برسالة [[expected:<900.0> but was:<1000.0>]]. والاسم الواضح بيقولك المشكلة فين من غير ما تفتح الكود.

واختبار الـ CartViewModel في الكود تحت. ده شغال من غير MainDispatcherRule لأن CartViewModel مش بيستخدم coroutines. والـ ViewModel اللي فيه [[viewModelScope]] محتاج الـ rule اللي تحته.`,
          solCode: R`class CartViewModelTest {
    @Test
    fun addItem_updatesCountAndTotal() {
        val vm = CartViewModel()
        vm.addItem(50.0)
        vm.addItem(25.0)
        val state = vm.uiState.value
        assertEquals(2, state.count)
        assertEquals(75.0, state.total, 0.001)
    }
}

// للـ ViewModels اللي فيها viewModelScope
class MainDispatcherRule(
    private val dispatcher: TestDispatcher = UnconfinedTestDispatcher()
) : TestWatcher() {
    override fun starting(description: Description) = Dispatchers.setMain(dispatcher)
    override fun finished(description: Description) = Dispatchers.resetMain()
}

class NotesViewModelTest {
    @get:Rule
    val mainRule = MainDispatcherRule()

    @Test
    fun blankTitle_isIgnored() = runTest {
        val repo = FakeNotesRepository()
        val vm = NotesViewModel(repo)
        vm.onAddClicked("   ")
        assertEquals(0, repo.added.size)
    }
}`
        },
        {
          cmd: "Compose UI tests",
          title: "تختبر شاشة Compose إزاي؟ (createComposeRule و onNodeWithText و performClick)",
          desc: R`اختبار الـ UI بيعمل اللي اليوزر بيعمله: يدوّر على حاجة على الشاشة، يدوس، يكتب، ويتأكد من النتيجة.

• [[@get:Rule val composeRule = createComposeRule()]]: الـ rule اللي بتجهّز Compose للاختبار. [[@get:Rule]] معناها «حط annotation الـ Rule على الـ getter» (JUnit بيدوّر عليها هناك).
• [[composeRule.setContent { ... }]]: اعرض الـ composable اللي هتختبره، لوحده من غير التطبيق كله.
• الدوّارة (finders): [[onNodeWithText("زوّد")]]، و [[onNodeWithContentDescription("...")]]، و [[onNodeWithTag("cart")]] (لو حطيت [[Modifier.testTag("cart")]] على العنصر).
• الأفعال: [[performClick()]] و [[performTextInput("Sara")]] و [[performScrollTo()]].
• التأكيدات: [[assertIsDisplayed()]] و [[assertExists()]] و [[assertDoesNotExist()]] و [[assertIsEnabled()]].

الاختبارات دي مكانها [[src/androidTest/]] وبتشتغل على emulator أو موبايل: [[./gradlew connectedAndroidTest]]. وممكن تشتغل على الـ JVM كمان مع Robolectric.

وعشان الاختبار يبقى سهل، اختبر الـ screen الـ stateless (اللي بياخد state و lambdas، درس state hoisting) بقيم ثابتة، بدل الشاشة اللي فيها ViewModel وشبكة.`,
          example: R`class CounterScreenTest {
    @get:Rule
    val composeRule = createComposeRule()
    @Test
    fun clickingButton_incrementsCounter() {
        composeRule.setContent { Counter() }
        composeRule.onNodeWithText("العدد: 0").assertIsDisplayed()
        composeRule.onNodeWithText("زوّد").performClick()
        composeRule.onNodeWithText("العدد: 1").assertIsDisplayed()
    }
    @Test
    fun typingName_showsGreeting() {
        composeRule.setContent { Counter() }
        composeRule.onNodeWithText("أهلًا يا Sara").assertDoesNotExist()
        composeRule.onNodeWithText("اسمك").performTextInput("Sara")
        composeRule.onNodeWithText("أهلًا يا Sara").assertIsDisplayed()
    }
}`,
          try: R`اختبر [[PostsScreen]] الـ stateless: اعمل نسخة منها بتاخد [[state: PostsUiState]] و [[onRetry: () -> Unit]]. اكتب ٣ اختبارات: Loading بيعرض spinner (حط عليه [[testTag("loading")]])، و Error بيعرض الرسالة والضغط بينادي onRetry (عدّاد في الاختبار)، و Success بيعرض العناوين.`,
          flag: "script",
          deep: {
            why: R`الـ unit tests بتتأكد إن المنطق صح، بس مش إن الزرار موجود ومتوصل بيه. اختبار الـ UI بيمسك حاجات زي: حد شال الـ onClick بالغلط، أو رسالة الغلط مش ظاهرة، أو حالة Empty بتعرض شاشة بيضا.`,
            how: R`Compose بيعمل «semantics tree» موازية لشجرة الـ UI: فيها النصوص والأدوار (زرار، checkbox) والـ content descriptions والـ test tags. الاختبارات بتدوّر فيها (ونفس الشجرة دي هي اللي TalkBack بيقراها، فلو العنصر مش لاقيه الاختبار، غالبًا الـ accessibility كمان مش لاقياه).

الـ rule بيستنى لوحده لحد ما Compose يبقى «idle» (مفيش recomposition أو animation شغالة) قبل كل خطوة، فمش محتاج [[Thread.sleep]].

[[onNodeWithText]] بيدوّر على النص بالظبط افتراضيًا. و [[substring = true]] للبحث جزئي. ولو فيه أكتر من عنصر بنفس النص، بيقع ويقولك؛ استخدم [[onAllNodesWithText(...)]].

[[createAndroidComposeRule<MainActivity>()]] لو عايز تختبر Activity كاملة (مع Hilt محتاج إعداد إضافي بـ [[HiltAndroidRule]]).

و [[composeRule.onRoot().printToLog("TAG")]] بيطبع الـ semantics tree في Logcat: أول حاجة تعملها لما الاختبار مش لاقي عنصر.`,
            when: "الشاشات المهمة (login، الدفع، الفورم)، وكل حالات الـ UI state. ومتحاولش تغطي كل pixel: الاختبارات دي أبطأ من الـ unit tests.",
            mistakes: R`تختبر الشاشة الكاملة اللي بتنادي API حقيقي فالاختبار يقع لما النت يقع. وتدوّر بنص بيتغير بالترجمة (الاختبار يقع على موبايل لغته مختلفة): استخدم [[testTag]] أو [[stringResource]] في الاختبار. وتحط [[Thread.sleep]] بدل ما تسيب الـ rule يستنى.`
          },
          lines: [
            "كلاس الاختبار (في src/androidTest).",
            R`[[@get:Rule]]: الـ annotation على الـ getter.`,
            "الـ rule اللي بتشغّل Compose.",
            R`[[@Test]].`,
            "السلوك المتوقع في الاسم.",
            "اعرض الـ Counter لوحده.",
            "في الأول العدد صفر.",
            "دوس الزرار.",
            "العدد بقى 1.",
            "قفلة.",
            R`[[@Test]].`,
            "اختبار تاني.",
            "اعرضه من جديد (كل اختبار بيبدأ نضيف).",
            "الترحيب مش موجود في الأول.",
            R`لاقي الحقل بالـ label واكتب فيه.`,
            "الترحيب ظهر.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[./gradlew connectedAndroidTest]] بيبني تطبيقين (التطبيق وتطبيق الاختبار)، يسطّبهم على الجهاز، ويشغّل الاختبارات. التقرير في [[app/build/reports/androidTests/connected/]].

الحل تحت. لاحظ إن الاختبار مش محتاج ViewModel ولا شبكة: بيدي الـ state مباشرة. و [[var retries = 0]] في الاختبار عشان نتأكد إن الـ lambda اتنادت فعلًا.`,
          solCode: R`@Composable
fun PostsContent(state: PostsUiState, onRetry: () -> Unit) {
    when (state) {
        PostsUiState.Loading -> CircularProgressIndicator(Modifier.testTag("loading"))
        is PostsUiState.Error -> Button(onClick = onRetry) { Text(state.message) }
        is PostsUiState.Success -> LazyColumn { items(state.posts, key = { it.id }) { Text(it.title) } }
    }
}

class PostsContentTest {
    @get:Rule
    val composeRule = createComposeRule()

    @Test
    fun loading_showsSpinner() {
        composeRule.setContent { PostsContent(PostsUiState.Loading, onRetry = { }) }
        composeRule.onNodeWithTag("loading").assertIsDisplayed()
    }

    @Test
    fun error_clickRetry_callsCallback() {
        var retries = 0
        composeRule.setContent { PostsContent(PostsUiState.Error("مفيش نت"), onRetry = { retries++ }) }
        composeRule.onNodeWithText("مفيش نت").performClick()
        assertEquals(1, retries)
    }

    @Test
    fun success_showsTitles() {
        val posts = listOf(Post(1, "أول بوست", ""), Post(2, "تاني بوست", ""))
        composeRule.setContent { PostsContent(PostsUiState.Success(posts), onRetry = { }) }
        composeRule.onNodeWithText("تاني بوست").assertIsDisplayed()
    }
}`
        },
        {
          cmd: "Logcat و debugging",
          title: "تلاقي البق إزاي؟ (Log و Logcat والـ stack trace والـ breakpoints و Layout Inspector)",
          desc: R`أدواتك لما حاجة مش شغالة:

١. [[Log]]: [[Log.d(TAG, "رسالة")]]. المستويات: [[v]] (verbose) و [[d]] (debug) و [[i]] (info) و [[w]] (warning) و [[e]] (error). و [[Log.e(TAG, "رسالة", e)]] بيطبع الـ exception بالـ stack trace كله.

٢. [[Logcat]] في Android Studio: كل الـ logs من الجهاز. الفلتر بيتكتب كلمات:
• [[package:mine]]: تطبيقك بس.
• [[tag:NotesVM]]: tag معين.
• [[level:error]]: من الـ error وطالع.
• وتجمعهم: [[package:mine level:warn]].

٣. الـ crash: دوّر في Logcat على [[FATAL EXCEPTION]]. تحتها نوع الـ exception والرسالة، وبعدين السطور اللي بتبدأ بـ [[at]]: كل سطر دالة في السلسلة. أول سطر فيه اسم الـ package بتاعك هو غالبًا مكان المشكلة، ودوس عليه يوديك للسطر. ولو فيه [[Caused by:]] تحت، اقراه: ده السبب الأصلي.

٤. الـ debugger: دوس جنب رقم السطر يعمل breakpoint (نقطة حمرا)، وشغّل بزرار Debug (الحشرة). البرنامج هيقف عند السطر، وتشوف قيم كل المتغيرات، وتمشي سطر سطر (F8) أو تدخل جوه دالة (F7).

٥. [[Layout Inspector]] (Tools ثم Layout Inspector): بيوريك شجرة الـ UI الحقيقية وهي شغالة، ومقاس كل عنصر والـ modifiers، وعدد مرات الـ recomposition لكل composable.

٦. [[App Inspection]]: Database Inspector (جداول Room وتعدّل فيها)، و Network Inspector (الـ requests والـ responses)، و Background Task Inspector.`,
          example: R`private const val TAG = "NotesVM"
class NotesViewModel(private val repo: NotesRepository) : ViewModel() {
    fun refresh() {
        Log.d(TAG, "refresh بدأ")
        viewModelScope.launch {
            try {
                val count = repo.refresh()
                Log.i(TAG, "refresh خلص: $count ملاحظة")
            } catch (e: IOException) {
                Log.e(TAG, "refresh وقع", e)
            }
        }
    }
}`,
          try: R`حط الـ logs دي في ViewModel عندك، وفلتر Logcat بـ [[package:mine tag:NotesVM]]. اقفل النت وشوف الـ error والـ stack trace. بعدين حط breakpoint على سطر [[repo.refresh()]]، وشغّل بـ Debug، وامشي سطر سطر. وفي الآخر افتح Layout Inspector وفعّل عدد الـ recompositions وانت بتكتب في TextField.`,
          flag: "script",
          deep: {
            why: R`هتقضي وقت في الـ debugging أكتر ما بتكتب كود جديد. المبتدئ بيغيّر حاجات عشوائي لحد ما تشتغل، والمحترف بيقرا الـ stack trace ويحط breakpoint ويعرف السبب في دقايق.`,
            how: R`[[Log]] بيكتب في buffer دايري جوه الجهاز، و Logcat (أو [[adb logcat]]) بيقراه. Logs التطبيقات التانية والنظام كمان هناك، عشان كده الفلتر مهم.

الـ logs بتفضل في الـ release build ومتاحة لأي حد يوصّل الموبايل بـ adb. فمتكتبش توكنات أو بيانات شخصية في log أبدًا. وفيه مشاريع بتشيل [[Log.d]] و [[Log.v]] من الـ release بـ قواعد R8 ([[-assumenosideeffects]])، أو بتستخدم مكتبة [[Timber]] اللي بتشغّل الـ logs في الـ debug بس.

الـ crashes عند اليوزرز الحقيقيين مش هتشوفها في Logcat. محتاج أداة crash reporting زي Firebase Crashlytics، أو تشوفها في Play Console تحت Android vitals ثم Crashes and ANRs.

ومن الترمنال: [[adb logcat -s NotesVM]] (tag واحد)، و [[adb logcat *:E]] (errors بس)، و [[adb logcat -c]] (فضّي الـ buffer).

والـ stack trace في نسخة release متقلبة أسماؤها (R8 بيغيّر أسماء الكلاسات لحروف)، فمحتاج ملف [[mapping.txt]] عشان ترجّعها (درس R8).`,
            when: R`Log للحاجات اللي عايز تتابعها وهي شغالة (خصوصًا timing و coroutines، لأن الـ breakpoint بيغيّر التوقيت). Debugger لما عايز تفهم ليه قيمة غلط. Layout Inspector لمشاكل الشكل والـ recomposition الزيادة.`,
            mistakes: R`تقرا أول سطر في الـ stack trace بس وتتجاهل [[Caused by]]. وتسيب [[println]] بدل Log (بيظهر بـ tag [[System.out]] وصعب تفلتره). وتطبع بيانات حساسة في الـ logs. وتنسى إن Logcat ممكن يبقى مفلتر على جهاز أو process قديم فتفتكر إن مفيش logs.`
          },
          lines: [
            R`الـ TAG ثابت لكل الكلاس (العرف إنه اسم الكلاس).`,
            "ViewModel.",
            "دالة.",
            R`[[Log.d]]: debug.`,
            "coroutine.",
            "try.",
            "نفترض إن refresh بترجّع العدد.",
            R`[[Log.i]]: معلومة.`,
            "لو وقع.",
            R`[[Log.e]] بالـ exception: بيطبع الـ stack trace كامل.`,
            "قفلة catch.",
            "قفلة launch.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`في Logcat هتشوف حاجة زي:
[[D  refresh بدأ]]
[[E  refresh وقع]]
[[java.net.UnknownHostException: Unable to resolve host "api.example.com": No address associated with hostname]]
وتحتها سطور [[at ...]] بتنزل لحد سطر الـ repository بتاعك.

ومع الـ breakpoint: البرنامج بيقف وتقدر تشوف [[this]] (الـ ViewModel) وكل properties بتاعته في تاب Variables. وفي Layout Inspector: الـ TextField والـ composables اللي بتقرا الـ state بتاعه بيزيد عدد الـ recompositions بتاعهم مع كل حرف، والباقي ثابت (skipped). لو عنصر ملوش علاقة عداده بيزيد، ده مكان تحسين (الدرس الجاي).`
        },
        {
          cmd: "الأداء",
          title: "أساسيات الأداء في Compose و Android: release build و derivedStateOf و key و Baseline Profiles",
          desc: R`أول قاعدة: متقيسش الأداء في الـ debug build. الـ debug فيه أدوات تتبّع كتير وكود مش متحسّن، فممكن يبان بطيء وهو في الـ release ناعم. اختبر على release (أو build type اسمه benchmark) وعلى موبايل حقيقي متوسط، مش موبايلك الغالي.

أشهر الحاجات في Compose:
• متعملش شغل تقيل في الـ composable نفسه: الـ sort والـ filter والـ format يا إما في الـ ViewModel، يا إما [[remember(input) { ... }]] عشان يتحسب بس لما الـ input يتغير.
• [[key]] في [[items]] بتاعة LazyColumn (درس LazyColumn).
• [[derivedStateOf]]: لما تحسب قيمة من state بيتغير كتير، والنتيجة نفسها بتتغير قليل. المثال الكلاسيكي: «اظهر زرار ارجع لفوق لو اليوزر نزل أكتر من ٥ عناصر». الـ [[firstVisibleItemIndex]] بيتغير مع كل scroll، بس الـ Boolean بيتغير مرة. مع derivedStateOf، الـ recomposition بيحصل لما الـ Boolean يتغير بس.
• اقرا الـ state في أضيق مكان ممكن، فالجزء اللي بيترسم تاني يبقى صغير.

وفي التطبيق كله:
• أي شغل تقيل برا الـ main thread (coroutines و Dispatchers).
• [[R8]] شغال في الـ release (درس R8): بيصغّر ويسرّع.
• [[Baseline Profiles]]: ملف بيقول لـ Android أنهي كود يتترجم مقدمًا وقت التسطيب، فأول فتح والـ scroll بيبقوا أسرع بشكل ملحوظ. بتتعمل بمكتبة Macrobenchmark.

والقياس: Android Studio Profiler (CPU والذاكرة)، و [[LeakCanary]] لتسريب الذاكرة في الـ debug، و Android vitals في Play Console (الـ ANRs والبطء عند اليوزرز الحقيقيين).`,
          example: R`@Composable
fun ProductsList(products: List<Product>, modifier: Modifier = Modifier) {
    val listState = rememberLazyListState()
    val scope = rememberCoroutineScope()
    val showScrollToTop by remember {
        derivedStateOf { listState.firstVisibleItemIndex > 5 }
    }
    val sorted = remember(products) { products.sortedBy { it.price } }
    Box(modifier) {
        LazyColumn(state = listState) {
            items(sorted, key = { it.id }) { product ->
                Text("$__{product.title}: $__{product.price}", Modifier.padding(16.dp))
            }
        }
        if (showScrollToTop) {
            SmallFloatingActionButton(
                onClick = { scope.launch { listState.animateScrollToItem(0) } },
                modifier = Modifier.align(Alignment.BottomEnd).padding(16.dp)
            ) { Text("↑") }
        }
    }
}`,
          try: R`افتح Layout Inspector واعرض الـ recomposition counts. اعمل نسخة من غير [[derivedStateOf]] ([[val show = listState.firstVisibleItemIndex > 5]]) واعمل scroll، وقارن عداد [[ProductsList]] في الحالتين. بعدين ابني release ([[./gradlew assembleRelease]] بتوقيع debug مؤقتًا) وقارن نعومة الـ scroll بالـ debug.`,
          flag: "script",
          deep: {
            why: R`التطبيق التقيل أو اللي بيعلّق بياخد تقييمات وحشة واليوزرز بيمسحوه، و Google Play بيقلل ظهور التطبيقات اللي نسبة الـ ANRs والـ crashes فيها عالية (Android vitals). والأهم: أغلب مشاكل الأداء في Compose سببها أخطاء بسيطة سهل تتفاداها لو عرفتها.`,
            how: R`Compose بيعدّي على ٣ مراحل لكل frame: composition (مين يترسم)، و layout (المقاسات)، و drawing (الرسم). لو قريت state في مرحلة متأخرة، المراحل اللي قبلها مش بتتعاد. مثلًا [[Modifier.offset { IntOffset(x, 0) }]] (النسخة اللي بتاخد lambda) بتقرا x في الـ layout بس، فمفيش recomposition مع كل حركة.

الـ skipping: Compose بيتنط على composable لو الـ parameters بتاعته متغيرتش. من Kotlin 2.0.20 فيه «strong skipping» شغال افتراضيًا، فأغلب الـ composables بقت skippable حتى لو parameters نوعها List عادية، ومحتاجتش تعلّم classes بـ [[@Stable]] و [[@Immutable]] زي زمان إلا في حالات قليلة.

[[derivedStateOf]] بيعمل state جديد بيعتمد على states تانية، وبيبلّغ اللي بيقراه بس لما النتيجة نفسها تتغير. ومش محتاجه لو النتيجة بتتغير بنفس معدل الـ input (زي [["$__{first} $__{last}"]])، ساعتها [[remember(first, last)]] أو حساب عادي كفاية.

و Baseline Profiles: الـ ART بيترجم الكود وقت التشغيل (JIT) لحد ما يعرف المهم. الـ profile بيقوله مقدمًا، فبيتترجم AOT وقت التسطيب من Play.`,
            when: "خلي الأساسيات (key، الشغل التقيل برا الـ composable، release للقياس) عادة من الأول. والتحسينات التانية لما تقيس وتلاقي مشكلة فعلًا.",
            mistakes: R`تحكم على الأداء من الـ debug. وتحط [[derivedStateOf]] في كل حتة بدون داعي (هي نفسها ليها تكلفة). وتعمل [[sortedBy]] جوه الـ composable من غير remember مع لستة كبيرة. وتقرا [[listState.firstVisibleItemIndex]] مباشرة في composable كبير فيترسم مع كل pixel scroll.`
          },
          lines: [
            R`[[@Composable]].`,
            "لستة منتجات.",
            "حالة الـ scroll.",
            "scope لـ coroutines من جوه أحداث الـ UI.",
            "Boolean...",
            R`...بيتغير بس لما يعدّي الـ 5، مش مع كل scroll.`,
            "قفلة remember.",
            R`الترتيب بيتحسب بس لما [[products]] تتغير.`,
            "Box عشان الزرار يبقى فوق اللستة.",
            "اللستة بالـ state بتاعها.",
            R`[[key]] ثابت لكل منتج.`,
            "سطر لكل منتج.",
            "قفلة items.",
            "قفلة LazyColumn.",
            "لو نزل كفاية...",
            "زرار صغير...",
            R`...الضغطة بتبدأ coroutine تعمل scroll لأول اللستة.`,
            "في الركن تحت.",
            "قفلة الزرار.",
            "قفلة if.",
            "قفلة Box.",
            "قفلة."
          ],
          sol: R`من غير derivedStateOf: عداد recompositions بتاع ProductsList بيزيد مع كل عنصر بيعدّي في الـ scroll (لأنه بيقرا [[firstVisibleItemIndex]] اللي بيتغير طول الوقت). ومع derivedStateOf: بيزيد مرة لما الزرار يظهر ومرة لما يختفي.

والـ release: الـ scroll في لستة طويلة بيبقى أنعم بشكل واضح عن الـ debug على نفس الموبايل. عشان كده لو حد قالك «Compose بطيء» أول سؤال: «جربته release؟».

ولتوقيع الـ release بمفتاح الـ debug مؤقتًا (للتجربة على جهازك بس، مش للرفع):`,
          solCode: R`android {
    buildTypes {
        release {
            isMinifyEnabled = true
            signingConfig = signingConfigs.getByName("debug")
        }
    }
}`
        }
      ]
    },
    {
      t: "البناء والنشر",
      l: 3,
      n: "debug و release والـ flavors، والتوقيع بالـ keystore، و APK و AAB، و R8، و Play Console والـ tracks",
      items: [
        {
          cmd: "build variants و signing",
          title: "buildTypes و productFlavors والتوقيع: تبني نسخة staging ونسخة prod متوقّعة إزاي؟",
          desc: R`كل build في Android هو «variant» = build type × flavor.

• [[buildTypes]]: [[debug]] (افتراضي، متوقّع بمفتاح debug تلقائي، وفيه debugging) و [[release]] (للنشر). وتقدر تخلي الـ debug ليه [[applicationIdSuffix = ".debug"]] فيتسطّب جنب نسخة الـ release على نفس الموبايل.
• [[productFlavors]]: نسخ مختلفة من نفس التطبيق: [[staging]] و [[prod]] (سيرفرات مختلفة)، أو [[free]] و [[paid]]. لازم تحدد [[flavorDimensions]].
• [[buildConfigField]]: ثابت بيتولد في كلاس [[BuildConfig]]، فتكتب في الكود [[BuildConfig.API_URL]] وكل flavor ليه قيمته. محتاج [[buildFeatures { buildConfig = true }]].

النتيجة: ٤ variants: [[stagingDebug]] و [[stagingRelease]] و [[prodDebug]] و [[prodRelease]]. وتختار من Build Variants على الشمال، أو [[./gradlew assembleProdRelease]].

التوقيع (signing): Android مش بيسطّب أي تطبيق مش متوقّع. الـ [[keystore]] ملف فيه المفتاح الخاص بتاعك، وبتعمله مرة بـ [[keytool]] أو من Build ثم Generate Signed Bundle. والقاعدة الذهبية: كلمات السر والملف نفسه برا git. في المثال بتتقري من environment variables (ودا اللي بيتعمل على CI)، أو من ملف [[keystore.properties]] متجاهَل في [[.gitignore]].`,
          example: R`android {
    signingConfigs {
        create("release") {
            storeFile = file(System.getenv("KEYSTORE_PATH") ?: "release.jks")
            storePassword = System.getenv("KEYSTORE_PASSWORD")
            keyAlias = "upload"
            keyPassword = System.getenv("KEY_PASSWORD")
        }
    }
    buildTypes {
        debug {
            applicationIdSuffix = ".debug"
        }
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
            signingConfig = signingConfigs.getByName("release")
        }
    }
    flavorDimensions += "env"
    productFlavors {
        create("staging") {
            dimension = "env"
            buildConfigField("String", "API_URL", "\"https://staging.example.com/\"")
        }
        create("prod") {
            dimension = "env"
            buildConfigField("String", "API_URL", "\"https://api.example.com/\"")
        }
    }
    buildFeatures {
        buildConfig = true
    }
}`,
          try: R`اعمل keystore بالأمر اللي في الحل، وحطه برا فولدر المشروع. ضيف الـ flavors دي، واستخدم [[BuildConfig.API_URL]] في الـ baseUrl بتاع Retrofit. ابني [[./gradlew assembleStagingDebug]] وسطّبه، وابني prodRelease بالـ environment variables. واتأكد إن [[*.jks]] في [[.gitignore]].`,
          flag: "script",
          deep: {
            why: R`في الشغل الحقيقي محتاج تجرّب على سيرفر staging من غير ما تلمس داتا اليوزرز، ونفس الكود يطلع على السيرفر الحقيقي. والتوقيع هو اللي بيثبت إن التحديث جاي منك: Android مش هيسطّب تحديث متوقّع بمفتاح مختلف فوق النسخة القديمة.`,
            how: R`AGP بيعمل task لكل variant: [[assembleStagingDebug]] و [[bundleProdRelease]]... وكل variant ليه فولدر source خاص اختياري: [[src/staging/]] و [[src/debug/]] (مثلًا أيقونة مختلفة للـ staging عشان متتلخبطش على الموبايل).

[[signingConfigs.getByName("release")]]: ده Kotlin DSL، و [[create("release") { }]] بيعمل config جديد بالاسم ده.

[[buildConfigField]] قيمته بتتكتب كود Java حرفيًا، عشان كده النص محتاج علامات تنصيص جوه علامات تنصيص: [["\"https://...\""]].

[[System.getenv("X") ?: "release.jks"]]: الـ [[?:]] من درس null safety، لأن getenv بترجّع null لو المتغير مش موجود.

الـ secrets اللي في التطبيق نفسه (API keys في BuildConfig): أي حاجة في الـ APK ممكن تتقري بأدوات فك بسيطة، حتى مع R8. فمفاتيح الـ API الحساسة فعلًا مكانها السيرفر، والتطبيق يكلم السيرفر بتاعك.

ومع Play App Signing (الدرس الجاي) المفتاح ده اسمه upload key: Google بتوقّع التطبيق النهائي بمفتاح تاني عندها.`,
            when: "أول ما يبقى عندك سيرفر staging، أو قبل أول رفعة على Play. والـ debug suffix من أول يوم.",
            mistakes: R`تعمل commit للـ keystore أو كلمة السر في [[build.gradle.kts]]. وتنسى الـ keystore والباسورد ومتعملهمش backup. وتغيّر الـ [[applicationId]] بالـ flavor من غير ما تاخد بالك إنه بقى تطبيق تاني على Play. وتحط API key سري في BuildConfig وتفتكر إنه مستخبي.`
          },
          lines: [
            R`[[android]].`,
            "إعدادات التوقيع.",
            R`config اسمه release.`,
            "ملف الـ keystore من environment variable أو اسم افتراضي.",
            "باسورد الملف من environment (مش مكتوب في الكود).",
            R`اسم المفتاح جوه الملف.`,
            "باسورد المفتاح.",
            "قفلة.",
            "قفلة signingConfigs.",
            "الـ build types.",
            "debug:",
            R`الـ id بيبقى [[com.sara.notes.debug]]، فيتسطّب جنب الـ release.`,
            "قفلة.",
            "release:",
            "R8 شغال (الدرس بعد الجاي).",
            "شيل الـ resources اللي مش مستخدمة.",
            "قواعد R8.",
            "يتوقّع بالـ config اللي فوق.",
            "قفلة.",
            "قفلة buildTypes.",
            R`بُعد للـ flavors اسمه env.`,
            "الـ flavors.",
            "staging:",
            "من بُعد env.",
            "ثابت في BuildConfig بسيرفر الـ staging.",
            "قفلة.",
            "prod:",
            "نفس البُعد.",
            "السيرفر الحقيقي.",
            "قفلة.",
            "قفلة productFlavors.",
            R`فعّل توليد [[BuildConfig]].`,
            "شغّل.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`أمر الـ keystore تحت (هيسألك على الباسورد والاسم والبلد). وبعد ما تبني: [[app/build/outputs/apk/staging/debug/app-staging-debug.apk]]، ولو سطّبت الـ staging debug والـ prod release هتلاقي التطبيقين جنب بعض على الموبايل.

ولو الـ environment variables مش متحددة، البناء بتاع release هيقع بـ [[Keystore file ... not found]] أو [[keystore password was incorrect]]، وده أحسن من إنه يبني بتوقيع غلط.`,
          solCode: R`keytool -genkeypair -v -keystore ~/keys/notes-upload.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload

export KEYSTORE_PATH=~/keys/notes-upload.jks
export KEYSTORE_PASSWORD='...'
export KEY_PASSWORD='...'
./gradlew assembleProdRelease`
        },
        {
          cmd: "بناء ونشر التطبيق: APK و AAB",
          title: "APK ولا AAB؟ تبني نسخة release للرفع على Google Play إزاي؟",
          desc: R`فيه شكلين للتطبيق المبني:
• [[APK]] (Android Package): ملف بيتسطّب على طول. بتبعته لحد يجرّبه، أو تسطّبه بـ [[adb install]].
• [[AAB]] (Android App Bundle): مش بيتسطّب مباشرة. بترفعه على Google Play، و Play بيعمل منه APKs صغيرة مخصوصة لكل موبايل (حسب المعالج، وكثافة الشاشة، واللغة). فاليوزر بينزّل حجم أصغر.

Google Play بيطلب AAB لكل التطبيقات الجديدة من أغسطس 2021. والـ APK لسه ليه استخدامات: التجربة، والتوزيع برا Play، ومتاجر تانية.

و AAB معناه إن Play هو اللي بيوقّع الـ APKs النهائية (Play App Signing): انت بتوقّع الـ AAB بمفتاح اسمه upload key، و Google عندها مفتاح التوقيع الحقيقي (app signing key) محفوظ عندها. الميزة الكبيرة: لو ضاع منك الـ upload key، تقدر تطلب من Play Console تغييره ومش هتخسر التطبيق. (في النظام القديم قبل كده، المفتاح لو ضاع كنت مش هتقدر تحدّث التطبيق تاني خالص).

قبل أي رفعة:
• [[versionCode]] أكبر من اللي فات (Play بيرفض نفس الرقم).
• [[./gradlew lintRelease]] بيمسك مشاكل زي ترجمات ناقصة أو APIs أحدث من الـ minSdk.
• جرّب الـ release build نفسه على موبايل (R8 ممكن يكسر حاجة مش بتظهر في الـ debug).`,
          example: R`./gradlew assembleDebug
./gradlew lintRelease
./gradlew bundleRelease
ls app/build/outputs/bundle/release/
./gradlew assembleRelease
adb install -r app/build/outputs/apk/release/app-release.apk`,
          try: R`ابني [[bundleRelease]] (لو عندك flavors: [[bundleProdRelease]]) ولاحظ حجم الـ AAB. وبعدين ابني [[assembleRelease]] وقارن حجمه بالـ debug APK. ولو عايز تشوف الـ APKs اللي Play هيعملها من الـ AAB، استخدم أداة [[bundletool]] من Google.`,
          deep: {
            why: R`ده آخر خطوة بين الكود واليوزر. ولو فهمت الفرق بين APK و AAB و upload key و app signing key، مش هتقع في أكبر غلطة كانت بتحصل زمان: مفتاح ضاع وتطبيق مبقاش ينفع يتحدث.`,
            how: R`[[bundleRelease]] بيعمل: compile للكود، و R8 (تصغير)، و dex، وتجميع الـ resources، وبعدين الـ bundle وتوقيعه. الـ AAB جواه كل حاجة لكل الأجهزة، و Play بيقسّمه (split APKs).

[[adb install -r]]: الـ [[-r]] معناها reinstall مع الحفاظ على الداتا. ولو المفتاح مختلف عن النسخة المتسطبة، هيقع بـ [[INSTALL_FAILED_UPDATE_INCOMPATIBLE]]، والحل تمسح النسخة القديمة الأول.

[[lintRelease]] بيكتب تقرير HTML في [[app/build/reports/]]. و lint بيقع لو فيه errors (زي [[MissingTranslation]] أو [[NewApi]]) في الـ release، وده كويس.

وفيه [[versionCode]] و [[versionName]] في Gradle. في CI بيبقى الـ versionCode رقم الـ build أو من الوقت عشان ميتكررش.

ومن 2026 Google بتطبّق التحقق من هوية المطور (developer verification) كمان على التطبيقات اللي بتتسطّب برا Play على الموبايلات المعتمدة، بالتدريج حسب البلد. لو هتوزع APK برا Play، تابع الشروط دي في صفحة Android developer verification.`,
            when: R`AAB لـ Play دايمًا. APK للتجربة، وللمتاجر التانية، أو لعميل عايز ملف يسطّبه.`,
            mistakes: R`ترفع debug APK أو AAB متوقّع بمفتاح الـ debug: Play بيرفضه. وتنسى تزوّد [[versionCode]]. وتختبر الـ debug بس وترفع release عمرك ما شغّلته. وتمسح الـ upload key «عشان مش محتاجه» قبل ما تتأكد إن Play App Signing متفعّل.`
          },
          lines: [
            "نسخة debug للتجربة.",
            "افحص الكود بقواعد lint على الـ release.",
            "AAB للرفع على Play.",
            R`الملف بيطلع هنا: [[app-release.aab]].`,
            "APK release (للتجربة أو التوزيع برا Play).",
            R`سطّبه على الموبايل فوق النسخة الموجودة ([[-r]]).`
          ],
          sol: R`[[app/build/outputs/bundle/release/app-release.aab]] حجمه أكبر شوية من الـ APK لأن فيه resources كل الأجهزة، بس اللي اليوزر بينزّله فعلًا من Play أصغر من الـ APK الكامل. والـ release APK غالبًا أصغر من الـ debug بشكل واضح بسبب R8 و shrinkResources.

وآخر سطر في الترمنال [[BUILD SUCCESSFUL]]. لو وقع في الـ lint، افتح التقرير اللي الرسالة بتشاور عليه وصلّح الـ errors (أو لو متأكد إنها مش مشكلة، تقدر تتجاهل قاعدة معينة في [[lint { disable += "..." }]]، بس متعملهاش كعادة).`
        },
        {
          cmd: "R8 و ProGuard",
          title: "R8: بيصغّر التطبيق ويخفي الأسماء، وقواعد keep، و mapping.txt",
          desc: R`[[R8]] أداة في الـ AGP بتشتغل على الـ release لما [[isMinifyEnabled = true]]:
• shrinking: بتشيل الكلاسات والدوال اللي محدش بيستخدمها (حتى من المكتبات). التطبيق بيصغر كتير.
• optimization: بتحسّن الكود (inline لدوال صغيرة، وتشيل branches مش بتتنفذ).
• obfuscation: بتغيّر الأسماء لحروف قصيرة ([[NotesRepository]] يبقى [[a.b]]). الحجم بيقل، وفك التطبيق بيبقى أصعب شوية (مش مستحيل).

و [[isShrinkResources = true]] بتشيل الصور والـ layouts اللي مش مستخدمة.

المشكلة: R8 بيحلل الكود وقت البناء. أي حاجة بتتنادى بالـ reflection (بالاسم وقت التشغيل) R8 مش هيشوفها، فممكن يشيلها أو يغيّر اسمها والتطبيق يقع في الـ release بس. هنا بتكتب قواعد في [[proguard-rules.pro]] (الاسم من ProGuard، الأداة القديمة اللي R8 حل محلها وبيقرا نفس القواعد):
• [[-keep class ... { *; }]]: متلمسش الكلاس ده ولا أي حاجة جواه.
• [[-keepattributes]]: حافظ على معلومات زي الـ annotations والـ generics.
• [[-dontwarn]]: تجاهل تحذير عن كلاس ناقص.

أغلب المكتبات الحديثة (Retrofit و Room و kotlinx.serialization و Hilt) بتجيب قواعدها معاها لوحدها. اللي بيحتاج قواعد غالبًا: مكتبات JSON بالـ reflection زي Gson، أو كود بتاعك بيستخدم reflection.

[[mapping.txt]] في [[app/build/outputs/mapping/release/]]: الجدول اللي بيرجّع [[a.b]] لاسمها الحقيقي. لازم تحتفظ بيه لكل نسخة اترفعت، وارفعه على Play Console (بيترفع لوحده مع الـ AAB) عشان الـ stack traces في Android vitals تبقى مقروءة.`,
          example: R`-keep class com.sara.notes.data.remote.dto.** { *; }
-keepattributes Signature, *Annotation*
-keep class com.sara.notes.plugins.ExportPlugin
-dontwarn org.slf4j.**`,
          try: R`شغّل [[./gradlew assembleRelease]] بـ [[isMinifyEnabled = false]] وبعدين true، وقارن الحجم. افتح الـ APK في Android Studio (Build ثم Analyze APK) وشوف أسماء الكلاسات جوه [[classes.dex]]. بعدين اعمل crash مقصود في الـ release وفك الـ stack trace بـ retrace (Android Studio بيعملها لو حطيت الـ mapping، أو الأداة [[retrace]] في الـ SDK).`,
          flag: "script",
          deep: {
            why: R`R8 بيصغّر التطبيق بنسب كبيرة، وده معناه تحميل أسرع وتسطيب أكتر في الأماكن اللي النت فيها غالي. وكمان بيحسّن الأداء. بس هو كمان أشهر سبب لـ «شغال في الـ debug وبيقع في الـ release»، فلازم تفهمه.`,
            how: R`R8 بيبدأ من «نقط الدخول» (الـ Activities والـ components اللي في الـ manifest، وأي حاجة عليها keep) وبيمشي في كل حاجة بتتنادى منهم. اللي موصلّوش يتشال. عشان كده الـ reflection مشكلة: [[Class.forName("...")]] نص، و R8 مش بيعرف إنه نداء.

الـ [[**]] في القواعد معناها «أي package تحت ده»، و [[{ *; }]] «كل الـ members».

Gson مثال كلاسيكي: بيقرا أسماء الـ fields وقت التشغيل عشان يطابقها مع الـ JSON. لو R8 غيّر [[title]] لـ [[a]]، الـ parsing بيرجّع null من غير ولا error. أما kotlinx.serialization فبيولّد الكود وقت الترجمة، فشغال مع R8 من غير قواعد خاصة لكلاساتك تقريبًا. ده سبب من أسباب تفضيله في المشاريع الجديدة.

ومن AGP 8 فيه «full mode» شغال افتراضيًا، وبيعمل تحسينات أقوى (وبيكسر أكتر لو فيه reflection من غير قواعد).

[[-assumenosideeffects class android.util.Log { public static *** d(...); }]] قاعدة مشهورة بتشيل [[Log.d]] من الـ release.`,
            when: R`دايمًا في الـ release. والقواعد تكتبها لما تستخدم reflection أو مكتبة بتطلب كده في الـ README بتاعها.`,
            mistakes: R`[[-keep class ** { *; }]] أو تقفل R8 خالص «عشان الـ crash يروح»: كده خسرت كل الفايدة. وتنسى تحتفظ بالـ mapping فالـ crash reports تبقى حروف. ومتجرّبش الـ release قبل الرفع. وتفتكر إن R8 بيحمي الأسرار في الكود: مش حماية حقيقية.`
          },
          lines: [
            R`الـ DTOs دي بتتحوّل بـ Gson (reflection)، فاحتفظ بكل كلاساتها وأسماء الـ fields بتاعتها.`,
            "Gson محتاج معلومات الـ generics والـ annotations وقت التشغيل.",
            R`كلاس بيتنادى بالاسم بـ [[Class.forName]]: متشيلهوش ولا تغيّر اسمه.`,
            "مكتبة بتشاور على كلاس اختياري مش عندنا: متطلّعش تحذير."
          ],
          sol: R`مع R8 الـ APK بيصغر بشكل ملحوظ (في تطبيق Compose بسيط ممكن من عشرات الميجا لكام ميجا). وفي Analyze APK هتشوف كلاسات اسمها حروف زي [[a]] و [[b]]، وكلاسات تانية بأسماءها الحقيقية: دي اللي عليها keep أو الـ Activities.

الـ crash في الـ release بيطلع [[at a.b.c(SourceFile:1)]]. بعد retrace بالـ mapping بيرجع [[at com.sara.notes.data.NotesRepository.refresh(NotesRepository.kt:24)]].`
        },
        {
          cmd: "Play Console والـ tracks",
          title: "ترفع تطبيقك على Google Play إزاي؟ (الحساب، والـ tracks، و closed testing، والمراجعة)",
          desc: R`الخطوات بالترتيب:

١. حساب مطور على [[Play Console]]: رسوم مرة واحدة (25 دولار)، وتحقق من الهوية. فيه حساب شخصي (personal) وحساب شركة (organization، محتاج D-U-N-S number).

٢. App: اسم، ولغة افتراضية، ومجاني ولا مدفوع (المجاني مينفعش يتحول مدفوع بعدين).

٣. الـ Store listing: وصف قصير وطويل، وأيقونة 512×512، وصورة feature graphic، و screenshots.

٤. App content (إجباري): رابط privacy policy، ونموذج Data safety (بتجمع إيه من داتا اليوزر وليه)، والتصنيف العمري (content rating)، والجمهور المستهدف، والإعلانات.

٥. الـ tracks (مسارات الرفع):
• Internal testing: لحد 100 tester، والنسخة بتوصل في دقايق. للتجربة السريعة.
• Closed testing: مجموعة محددة بالإيميل أو Google Group.
• Open testing: أي حد يقدر ينضم من صفحة التطبيق.
• Production: الكل. وتقدر تعمل staged rollout (تبدأ بنسبة زي 10% وتزوّد).

مهم للحسابات الشخصية الجديدة (اللي اتعملت بعد نوفمبر 2023): قبل ما تقدر تطلب الوصول لـ production، لازم closed test فيه 12 tester على الأقل مشتركين لمدة 14 يوم متواصلين. خطط لده من بدري.

٦. كل نسخة: ترفع الـ AAB، وتكتب release notes، وتبعت للمراجعة. المراجعة ممكن تاخد من ساعات لكام يوم، وأول مرة غالبًا أطول.

وكل سنة Google بترفع الـ targetSdk المطلوب. من 31 أغسطس 2026 التطبيقات الجديدة والتحديثات لازم targetSdk 36 (Android 16) على الأقل.`,
          example: R`android {
    defaultConfig {
        applicationId = "com.sara.notes"
        minSdk = 24
        targetSdk = 36
        versionCode = 12
        versionName = "1.3.0"
    }
}`,
          try: R`(من غير ما تدفع) افتح صفحة Play Console Help واقرا شروط الـ target API والـ testing requirements للحسابات الجديدة. وجهّز checklist لتطبيقك: privacy policy (ممكن صفحة على GitHub Pages)، والـ screenshots، ونموذج Data safety (اكتب كل داتا بتجمعها، حتى الـ crash reports)، و 12 tester من أصحابك.`,
          flag: "script",
          deep: {
            why: R`تطبيق على Play بلينك حقيقي في الـ CV أقوى بكتير من repo على GitHub. وكتير من الرفض بيحصل بسبب حاجات إدارية مش كود: Data safety ناقص، أو privacy policy مش موجودة، أو صلاحية حساسة من غير مبرر. لو عارفهم من الأول هتوفر أسابيع.`,
            how: R`الـ [[applicationId]] هو هوية التطبيق على Play للأبد: مينفعش يتغير بعد أول رفعة. و [[versionCode]] لازم يزيد في كل AAB بيترفع على أي track، حتى internal.

Play App Signing بيتفعّل تلقائيًا مع أول AAB. ومن Play Console تقدر تنزّل شهادة مفتاح التوقيع (SHA-1 و SHA-256)، وهتحتاجها لو بتستخدم Google Sign-In أو Firebase أو Maps، لأن التوقيع الحقيقي بقى بتاع Google مش الـ upload key.

[[Pre-launch report]]: Play بيشغّل تطبيقك على موبايلات حقيقية وبيطلّع crashes ومشاكل accessibility، ببلاش مع أي رفعة على testing track.

و [[Android vitals]] بعد النشر: نسبة الـ crashes والـ ANRs. لو عدّت حدود معينة، Play ممكن يقلل ظهور التطبيق في البحث ويحط تحذير في صفحته.

الأتمتة: [[Gradle Play Publisher]] أو [[fastlane supply]] بيرفعوا الـ AAB من CI بـ service account.

والسياسات بتتغير كل كام شهر (الصلاحيات، والـ target API، والتحقق من الهوية)، فالمصدر الصح دايمًا Play Console Help و Policy Center، مش فيديو من سنتين.`,
            when: "لما يبقى عندك نسخة شغالة ومتجرّبة، ويفضّل تبدأ internal testing بدري جدًا عشان تكتشف مشاكل التوقيع والـ release من الأول.",
            mistakes: R`تنسى إن الحساب الشخصي الجديد محتاج closed test 14 يوم وتوعد عميل بتاريخ نشر. و Data safety مش مطابق للي التطبيق بيعمله فعلًا (مكتبة analytics بتجمع داتا وانت قايل لأ). وتسيب [[com.example]] في الـ applicationId. وترفع للـ production على طول من غير ما تجرّب على internal.`
          },
          lines: [
            R`[[android]].`,
            R`[[defaultConfig]].`,
            "هوية التطبيق على Play للأبد.",
            "أقدم Android مدعوم.",
            "المطلوب على Play من أغسطس 2026.",
            "لازم يزيد مع كل AAB بيترفع.",
            "اللي بيظهر لليوزر في صفحة التطبيق.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`الـ checklist قبل أول رفعة:
• [[applicationId]] نهائي ومش com.example.
• targetSdk بالرقم المطلوب وقت الرفع.
• AAB متوقّع بـ upload key محفوظ في مكانين (ومعاه الباسوردات).
• privacy policy على رابط شغال.
• Data safety مطابق للمكتبات اللي فيها (analytics و crash reporting و ads بيجمعوا داتا).
• Content rating و target audience.
• Store listing: أيقونة 512×512، و feature graphic 1024×500، وعلى الأقل ٢ screenshots.
• Internal testing الأول، وبعدين closed test بـ 12 tester لـ 14 يوم (للحساب الشخصي الجديد)، وبعدين تطلب production.`
        }
      ]
    }
]);
