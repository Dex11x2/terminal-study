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
          teach: R`## الكود بيعمل إيه؟

كلاسين بس: [[NotesRepository]] (الـ data layer) و [[NotesViewModel]] (الـ UI layer). الـ repository هو اللي يعرف الداتا جاية منين (Room ولا السيرفر)، والـ ViewModel بيكلم الـ repository بس ومبيعرفش حاجة عن Room ولا Retrofit. والشاشة (مش في المثال) بتكلم الـ ViewModel بس.

### اتجرّب فين؟

- الكلاسين زي ما هم، ومعاهم [[NoteEntity]] و [[NoteDao]] (Room) و [[NotesApi]] (Retrofit) و [[NoteDto]] و [[toEntity()]] من الحل، اتترجموا في مشروع Android حقيقي (AGP 9.4.1 و Kotlin 2.4.20 و Room 2.8.5 و KSP) بـ [[./gradlew assembleDebug]] جوه image فيها Android SDK 36: [[BUILD SUCCESSFUL]].
- نفس شكل الـ ViewModel ده (بـ repository وهمي) اتختبر بـ unit tests حقيقية في درس unit tests.
- تشغيل الشاشة على موبايل: من الـ docs (مفيش emulator).

---

## الصورة قبل الكود

| الطبقة | الكلاس | بيعرف مين؟ |
|---|---|---|
| UI | الشاشة (composable) | الـ ViewModel بس |
| UI | [[NotesViewModel]] | الـ repository بس |
| Data | [[NotesRepository]] | الـ DAO والـ API |
| Data sources | [[NoteDao]] (Room) و [[NotesApi]] (Retrofit) | ولا حد من اللي فوقهم |

الأسهم نازلة لتحت بس: محدش تحت يعرف مين فوقه. والـ state بيطلع من Room للشاشة، والأحداث (ضغطة زرار) بتنزل من الشاشة للـ repository. ده الـ **unidirectional data flow**.

---

## ١. الـ repository

~~~kotlin
class NotesRepository(
    private val dao: NoteDao,
    private val api: NotesApi
) {
~~~

- [[private val dao: NoteDao]] جوه أقواس الـ constructor: بيعرّف parameter و property في نفس الوقت. [[private]] يعني محدش برا الكلاس يقدر يوصل لـ [[repo.dao]].
- الـ repository **مش بيعمل** الـ DAO ولا الـ API بنفسه ([[Room.databaseBuilder]] أو [[Retrofit.Builder]] مش هنا). بياخدهم جاهزين من برا. ده اسمه dependency injection، وده اللي بيخلي الاختبار سهل: في الاختبار تدّيله DAO وهمي. (الدرس الجاي Hilt بيعمل ده لوحده.)
- [[NoteDao]] و [[NotesApi]] interfaces: Room و Retrofit بيكتبوا التنفيذ.

### القراية: Flow من Room

~~~kotlin
    val notes: Flow<List<NoteEntity>> = dao.observeAll()
~~~

- [[observeAll()]] في الـ DAO عليها [[@Query("SELECT * FROM notes ...")]] وبترجّع [[Flow]]: كل ما جدول notes يتغير، بتبعت اللستة الجديدة (درس Room).
- الشاشة **دايمًا** بتقرا من هنا، يعني من Room. ده الـ **single source of truth**: مصدر واحد للحقيقة.

### المزامنة مع السيرفر

~~~kotlin
    suspend fun refresh() {
        val remote = api.getNotes()
        dao.upsertAll(remote.map { it.toEntity() })
    }
~~~

١. [[suspend]]: دالة بتستنى (شبكة وداتابيز) من غير ما تقفل الـ thread، ولازم تتنادى من coroutine (درس coroutines).

٢. [[api.getNotes()]]: Retrofit بيعمل [[GET /notes]] ويرجّع [[List<NoteDto>]]. الـ DTO (Data Transfer Object) هو شكل الـ JSON اللي جاي من السيرفر.

٣. [[remote.map { it.toEntity() }]]: [[map]] بتعدي على كل عنصر وتحوّله، و [[it]] هو العنصر الحالي. [[toEntity()]] extension function من الحل:

~~~kotlin
fun NoteDto.toEntity() = NoteEntity(id = id, title = title)
~~~

[[NoteDto.]] قبل اسم الدالة معناها «دالة جديدة على NoteDto» (درس extension functions)، فتنادى [[dto.toEntity()]] كأنها جوه الكلاس.

٤. [[dao.upsertAll(...)]]: [[@Upsert]] = insert لو الـ id مش موجود، و update لو موجود. فلو السيرفر رجّع نفس الملاحظة تاني مش هتتكرر.

لاحظ إن [[refresh()]] **مبترجّعش** حاجة. هي بتكتب في Room، و [[notes]] اللي فوق هتبعت اللستة الجديدة لوحدها.

### الإضافة

~~~kotlin
    suspend fun add(title: String) {
        dao.insert(NoteEntity(title = title))
    }
}
~~~

[[NoteEntity(title = title)]]: الـ id بـ 0 من القيمة الافتراضية، و Room بيديله رقم جديد. وتاني: مفيش رجوع لقيمة، الـ Flow بيبلّغ.

---

## ٢. الـ ViewModel

~~~kotlin
class NotesViewModel(private val repo: NotesRepository) : ViewModel() {
~~~

- [[: ViewModel()]]: بيورث من [[ViewModel]] بتاع AndroidX، فبيعيش بعد لف الشاشة وعنده [[viewModelScope]].
- بياخد الـ repository بس. مفيش [[NoteDao]] ولا [[NotesApi]] هنا خالص.

### الـ state للشاشة

~~~kotlin
    val notes: StateFlow<List<NoteEntity>> = repo.notes
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())
~~~

[[stateIn]] بتحوّل الـ [[Flow]] لـ [[StateFlow]] (Flow ليه قيمة حالية دايمًا، والشاشة تقراه بـ [[collectAsStateWithLifecycle()]]):

| الحتة | معناها |
|---|---|
| [[viewModelScope]] | الـ coroutine اللي بتسمع لـ Room بتتلغي لما الـ ViewModel يموت |
| [[SharingStarted.WhileSubscribed(5_000)]] | اسمع لـ Room طول ما فيه شاشة بتسمع، ولما آخر واحدة تمشي استنى ٥ ثواني قبل ما توقف (عشان لف الشاشة مياخدش query جديد) |
| [[5_000]] | ٥٠٠٠ ملي ثانية. الـ [[_]] بس للقراية زي الفاصلة |
| [[emptyList()]] | القيمة الأولى لحد ما Room يرد |

### حدث: إضافة

~~~kotlin
    fun onAddClicked(title: String) {
        if (title.isBlank()) return
        viewModelScope.launch { repo.add(title.trim()) }
    }
~~~

- الاسم [[onAddClicked]]: الشاشة بتقول «حصل إيه» (الزرار اتداس)، والـ ViewModel هو اللي يقرر يعمل إيه.
- [[isBlank()]]: فاضي أو مسافات بس، فمنضيفش. ده منطق، ومكانه الـ ViewModel مش الـ composable، عشان يتختبر من غير UI (في درس unit tests اختبار [[blankTitle_isIgnored]] بيتأكد من السطر ده بالظبط وعدّى).
- [[viewModelScope.launch { }]]: يبدأ coroutine عشان [[add]] دالة suspend.
- [[trim()]]: يشيل المسافات من الأول والآخر.

### حدث: refresh

~~~kotlin
    fun onRefresh() {
        viewModelScope.launch {
            runCatching { repo.refresh() }
        }
    }
}
~~~

[[runCatching { }]] بتشغّل الكود، ولو رمى exception بتمسكه وترجّعه في [[Result]] بدل ما التطبيق يقع. هنا النتيجة متجاهلة: لو مفيش نت، الـ refresh فشل بس الملاحظات القديمة لسه ظاهرة من Room.

---

## ٣. الحل: رسالة لما الـ refresh يفشل

~~~kotlin
private val _message = MutableStateFlow<String?>(null)
val message = _message.asStateFlow()
~~~

- [[_message]] الـ [[MutableStateFlow]] (اللي يتكتب فيه) private، و [[message]] نسخة read-only للشاشة. العرف: الـ [[_]] في أول الاسم للنسخة الخاصة.
- [[String?]] و [[null]]: مفيش رسالة في الأول.

~~~kotlin
        try {
            repo.refresh()
        } catch (e: IOException) {
            _message.value = "مقدرناش نحدّث، اللي ظاهر محفوظ عندك"
        }
~~~

[[IOException]] بس (مشاكل شبكة)، مش أي exception. وده أحسن من [[runCatching]] لأن [[runCatching]] بتمسك كمان [[CancellationException]] اللي الـ coroutines بتستخدمها عشان تتلغي. الكود ده اتترجم في نفس المشروع.

---

## الخلاصة

| | الـ repository | الـ ViewModel |
|---|---|---|
| بياخد في الـ constructor | الـ DAO والـ API | الـ repository |
| بيعرض | [[Flow]] للقراية و [[suspend fun]] للعمليات | [[StateFlow]] للشاشة ودوال أحداث [[onXxx]] |
| بيعرف عن Room و Retrofit؟ | أيوه | لأ |
| بيعرف عن Compose؟ | لأ | لأ |

- الشاشة بتقرا من Room دايمًا، والشبكة بتكتب في Room: مصدر واحد.
- كل كلاس بياخد اللي محتاجه في الـ constructor، فتبدّله بـ fake في الاختبار.`,
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
          teach: R`## الكود بيعمل إيه؟

بيوصّل كل حاجة ببعض من غير ما تكتب [[new]] ولا factory: Hilt بيعرف إن الشاشة محتاجة [[NotesViewModel]]، والـ ViewModel محتاج [[NotesRepository]]، والـ repository محتاج [[NoteDao]]، والـ DAO جاي من [[AppDatabase]]، والداتابيز محتاجة [[Context]]. وبيكتب الكود اللي بيعملهم بالترتيب ده **وقت البناء**.

### اتجرّب فين؟

- المثال زي ما هو اتبنى في مشروع Android حقيقي (AGP 9.4.1 و Kotlin 2.4.20 و KSP 2.3.12 و Hilt 2.60.1 و [[androidx.hilt:hilt-lifecycle-viewmodel-compose:1.3.0]] و Room 2.8.5) بـ [[./gradlew assembleDebug]] جوه image فيها Android SDK 36: [[BUILD SUCCESSFUL]]. وقريت الكود اللي Hilt ولّده، وهنشوف منه تحت.
- شيلت [[provideNoteDao]] عن قصد وبنيت تاني عشان نشوف الغلط الحقيقي، وبعدين الحل ([[NetworkModule]]) اتبنى برضه.
- نسخة 1.4.0 من [[hilt-lifecycle-viewmodel-compose]] رفضت تتبني بـ [[compileSdk 36]] (بتطلب 37)، عشان كده 1.3.0.
- فتح التطبيق على موبايل: من الـ docs.

---

## ١. نقطة البداية: [[@HiltAndroidApp]]

~~~kotlin
@HiltAndroidApp
class NotesApp : Application()
~~~

- [[Application]]: كلاس Android بيتعمل مرة واحدة أول ما الـ process يبدأ، قبل أي Activity.
- [[@HiltAndroidApp]]: Hilt بيولّد كلاس اسمه [[Hilt_NotesApp]] بيعمل «الحاوية» الكبيرة (اسمها [[SingletonComponent]]) اللي هتعيش طول عمر التطبيق. وده اللي اتولّد فعلًا:

~~~text الملفات اللي Hilt ولّدها (مختصرة)
Hilt_NotesApp.java
DaggerNotesApp_HiltComponents_SingletonC.java
DataModule_ProvideDatabaseFactory.java
DataModule_ProvideNoteDaoFactory.java
NotesRepository_Factory.java
NotesViewModel_Factory.java
Hilt_MainActivity.java
~~~

- ولازم تسجّل الكلاس في [[AndroidManifest.xml]]، وإلا Android هيستخدم [[Application]] العادي ومحدش هيعمل الحاوية:

~~~text AndroidManifest.xml
<application android:name=".NotesApp" ...>
~~~

---

## ٢. الوصفات: [[@Module]]

~~~kotlin
@Module
@InstallIn(SingletonComponent::class)
object DataModule {
~~~

- [[@Module]]: «الكلاس ده فيه وصفات». محتاجه للحاجات اللي **مش بتاعتك**: [[AppDatabase]] بتتعمل بـ [[Room.databaseBuilder]] مش بـ constructor تقدر تحط عليه [[@Inject]].
- [[@InstallIn(SingletonComponent::class)]]: الوصفات دي متاحة في الحاوية الكبيرة. [[::class]] معناها «الكلاس نفسه» مش object منه.
- [[object]] مش [[class]]: نسخة واحدة ثابتة ومفيهاش state، فـ Hilt بينادي الدوال على طول.

### وصفة الداتابيز

~~~kotlin
    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): AppDatabase =
        Room.databaseBuilder(context, AppDatabase::class.java, "notes.db").build()
~~~

- [[@Provides]]: «لو حد طلب [[AppDatabase]] (نوع الـ return)، نادي الدالة دي». اسم الدالة نفسه مش مهم لـ Hilt، المهم النوع.
- [[@Singleton]]: اعملها **مرة واحدة** واحفظها. من غيرها كل حد يطلب داتابيز هياخد واحدة جديدة.
- [[@ApplicationContext context: Context]]: الدالة محتاجة Context، و Hilt بيديها الـ Application context (مش Activity، عشان الداتابيز عايشة أطول من أي شاشة).
- [[= ...]] بعد الدالة: دالة جسمها سطر واحد بيرجّع قيمته (expression body).

في الكود المولّد [[@Singleton]] بقت كده:

~~~java
this.provideDatabaseProvider = DoubleCheck.provider(new SwitchingProvider<AppDatabase>(singletonCImpl, 0));
~~~

[[DoubleCheck]] بيحفظ أول نسخة ويرجّعها كل مرة بعد كده (وآمن مع أكتر من thread).

### وصفة الـ DAO

~~~kotlin
    @Provides
    fun provideNoteDao(db: AppDatabase): NoteDao = db.noteDao()
}
~~~

- الدالة محتاجة [[db: AppDatabase]]، و Hilt عارف يعمله من الوصفة اللي فوق. يعني الوصفات بتعتمد على بعض.
- مفيش [[@Singleton]]: Room أصلًا بيرجّع نفس الـ DAO من نفس الداتابيز. والكود المولّد:

~~~java
NoteDao noteDao() {
  return DataModule_ProvideNoteDaoFactory.provideNoteDao(provideDatabaseProvider.get());
}
~~~

---

## ٣. كلاساتك: [[@Inject constructor]]

~~~kotlin
class NotesRepository @Inject constructor(private val dao: NoteDao) {
    val notes = dao.observeAll()
}
~~~

- [[@Inject constructor(...)]]: «Hilt، انت اللي تعمل الكلاس ده، باللي في الـ constructor». ولما تحط annotation على الـ constructor في Kotlin لازم تكتب كلمة [[constructor]] صريحة.
- مفيش module للـ repository: الكلاس بتاعك، فـ [[@Inject]] كفاية.

Hilt ولّد [[NotesRepository_Factory.java]]، والسطر المهم فيه:

~~~java
public static NotesRepository newInstance(NoteDao dao) {
  return new NotesRepository(dao);
}
~~~

ده بالظبط الكود اللي كنت هتكتبه بإيدك.

---

## ٤. الـ ViewModel: [[@HiltViewModel]]

~~~kotlin
@HiltViewModel
class NotesViewModel @Inject constructor(private val repo: NotesRepository) : ViewModel() {
    val notes = repo.notes.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())
}
~~~

- [[@HiltViewModel]]: الـ ViewModel ده Hilt بيعمله. والـ ViewModels ليها حاوية خاصة ([[ViewModelComponent]]) بتتعمل لكل ViewModel.
- ومن غير Hilt كنت محتاج [[ViewModelProvider.Factory]] بإيدك عشان الـ ViewModel ليه parameter.

وفي الحاوية المولّدة:

~~~java
case 0: // com.sara.notes.di.NotesViewModel
return (T) new NotesViewModel(viewModelCImpl.notesRepository());
...
NotesRepository notesRepository() {
  return new NotesRepository(singletonCImpl.noteDao());
}
~~~

السلسلة كلها: ViewModel ← repository ← DAO ← الداتابيز (المحفوظة) ← Context.

---

## ٥. الـ Activity والشاشة

~~~kotlin
@AndroidEntryPoint
class MainActivity : ComponentActivity() {
~~~

[[@AndroidEntryPoint]]: Hilt ولّد [[Hilt_MainActivity]]، والـ plugin بتاع Gradle بيخلي [[MainActivity]] تورث منه وقت البناء. وده جزء منه:

~~~java
public abstract class Hilt_MainActivity extends ComponentActivity implements GeneratedComponentManagerHolder {
  ...
  @Override
  public ViewModelProvider.Factory getDefaultViewModelProviderFactory() {
    return DefaultViewModelFactories.getActivityFactory(this, super.getDefaultViewModelProviderFactory());
  }
~~~

يعني الـ Activity بقى ليها factory بيعرف يعمل أي [[@HiltViewModel]]. ولو نسيت [[@AndroidEntryPoint]]، الـ Activity مش هيبقى فيها الكلام ده، و [[hiltViewModel()]] هيقع وقت التشغيل (الرسالة في «أشهر الأخطاء» تحت من الـ docs).

~~~kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            val vm: NotesViewModel = hiltViewModel()
            val notes by vm.notes.collectAsStateWithLifecycle()
            Text("عندك $__{notes.size} ملاحظة")
        }
    }
}
~~~

- [[hiltViewModel()]]: زي [[viewModel()]] بس بيستخدم factory بتاع Hilt. الـ import: [[androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel]].
- [[val vm: NotesViewModel]]: النوع لازم يتكتب عشان [[hiltViewModel()]] تعرف تعمل أنهي ViewModel.
- [[collectAsStateWithLifecycle()]] و [[by]]: الـ StateFlow بقى Compose state، والشاشة تترسم تاني لما الرقم يتغير.

---

## ٦. لو حاجة ناقصة: البناء بيقع

شيلت دالة [[provideNoteDao]] من الـ module وبنيت:

~~~text الناتج
error: [Dagger/MissingBinding] com.sara.notes.data.NoteDao cannot be provided without an @Provides-annotated method.
  ...
      com.sara.notes.data.NoteDao is injected at
          [...ViewModelC] com.sara.notes.di.NotesRepository(dao)
      com.sara.notes.di.NotesRepository is injected at
          [...ViewModelC] com.sara.notes.di.NotesViewModel(repo)
...
> Task :app:hiltJavaCompileDebug FAILED
BUILD FAILED in 1m 3s
~~~

اقراها من تحت لفوق: الـ ViewModel طالب repository، والـ repository طالب [[NoteDao]]، ومفيش وصفة لـ [[NoteDao]]. الغلط ظهر في [[hiltJavaCompileDebug]] قبل ما التطبيق يتعمل أصلًا.

---

## ٧. الحل: [[NetworkModule]]

~~~kotlin
    @Provides
    @Singleton
    fun provideJson(): Json = Json { ignoreUnknownKeys = true }
~~~

[[Json]] من kotlinx.serialization، و [[ignoreUnknownKeys = true]]: لو السيرفر بعت حقول زيادة، تجاهلها بدل ما تقع.

~~~kotlin
    @Provides
    @Singleton
    fun provideNotesApi(json: Json): NotesApi = Retrofit.Builder()
        .baseUrl("https://api.example.com/")
        .addConverterFactory(json.asConverterFactory("application/json".toMediaType()))
        .build()
        .create(NotesApi::class.java)
~~~

- [[json: Json]] جاي من الوصفة اللي فوقها.
- [[asConverterFactory]] من [[retrofit2.converter.kotlinx.serialization]]، و [[toMediaType()]] من [[okhttp3.MediaType.Companion]] (الاتنين محتاجين import).
- [[.create(NotesApi::class.java)]]: Retrofit بيعمل تنفيذ الـ interface. [[::class.java]] الكلاس بصيغة Java لأن Retrofit مكتوب Java.

وبعدها الـ repository بياخد الـ API بإضافة parameter بس:

~~~kotlin
class NotesRepository @Inject constructor(
    private val dao: NoteDao,
    private val api: NotesApi
)
~~~

مفيش ولا سطر اتغير في الـ ViewModel ولا الـ Activity. البناء عدّى.

---

## الخلاصة

| الـ annotation | مكانها | معناها |
|---|---|---|
| [[@HiltAndroidApp]] | كلاس الـ Application (+ [[android:name]] في الـ manifest) | ابدأ الحاوية |
| [[@AndroidEntryPoint]] | الـ Activity | الـ Activity دي بتاخد من Hilt |
| [[@Inject constructor]] | كلاساتك | Hilt يعملها لوحده |
| [[@Module]] + [[@InstallIn]] | object | وصفات للحاجات اللي مش بتاعتك |
| [[@Provides]] | دالة في الـ module | النوع اللي بترجّعه هو اللي بتوفّره |
| [[@Singleton]] | على [[@Provides]] أو الكلاس | نسخة واحدة |
| [[@HiltViewModel]] + [[hiltViewModel()]] | الـ ViewModel والشاشة | من غير factory |

- كل حاجة ناقصة بتطلع وقت البناء برسالة فيها السلسلة كلها.
- Hilt بيكتب كود Java عادي ([[new NotesRepository(...)]]) بدالك، مفيش سحر وقت التشغيل.`,
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
          teach: R`## الكود بيعمل إيه؟

فيه حاجتين: [[PriceCalculator]] (الكود الحقيقي، مكانه [[src/main]]) و [[PriceCalculatorTest]] (الاختبار، مكانه [[src/test]]). كل دالة عليها [[@Test]] بتنادي الكود بقيمة معينة وتتأكد إن النتيجة هي المتوقعة. لو النتيجة غلط، الاختبار «بيقع» وبيقولك المتوقع كان إيه وطلع إيه.

### اتجرّب فين؟

- الكلاسين زي ما هم، والحل ([[CartViewModelTest]] و [[MainDispatcherRule]] و [[NotesViewModelTest]])، واختبارين زيادة بـ MockK و Turbine، اتشغلوا في مشروع Android حقيقي (AGP 9.4.1 و Kotlin 2.4.20 و JUnit 4.13.2 و kotlinx-coroutines-test 1.10.2 و MockK 1.14.11 و Turbine 1.2.1) بـ [[./gradlew testDebugUnitTest]] جوه image فيها Android SDK 36 و Java 21. كلهم عدّوا.
- وبوّظت الشرط عن قصد عشان نشوف شكل الاختبار الواقع.

---

## ١. الكود اللي هنختبره

~~~kotlin
class PriceCalculator {
    fun finalPrice(price: Double): Double {
        require(price >= 0) { "السعر مينفعش يبقى سالب" }
        return if (price >= 1000) price * 0.9 else price
    }
}
~~~

- [[require(شرط) { رسالة }]]: لو الشرط false بترمي [[IllegalArgumentException]] بالرسالة دي. يعني «المدخل ده غلط».
- [[if (...) a else b]] في Kotlin بترجّع قيمة، فـ [[return if ...]] بيرجّع واحدة من الاتنين.
- [[price * 0.9]]: خصم 10%. يعني 1000 تبقى 900.

الكلاس ده Kotlin عادي، مفيهوش ولا حاجة من Android، وده اللي بيخليه يتختبر على الـ JVM في ثواني.

---

## ٢. كلاس الاختبار

~~~kotlin
class PriceCalculatorTest {
    private val calc = PriceCalculator()
~~~

- الاسم العرف: اسم الكلاس + [[Test]]، ونفس الـ package، بس في [[src/test/java/...]].
- [[calc]] property: JUnit 4 بيعمل **object جديد من كلاس الاختبار لكل [[@Test]]**، فكل اختبار بياخد [[calc]] جديد ومفيش اختبار بيأثر على التاني.
- الـ imports اللي محتاجها: [[org.junit.Test]] و [[org.junit.Assert.assertEquals]].

### الاختبار الأول

~~~kotlin
    @Test
    fun discount_isAppliedAboveThreshold() {
        assertEquals(900.0, calc.finalPrice(1000.0), 0.001)
    }
~~~

- [[@Test]]: JUnit بيدوّر على الدوال اللي عليها الـ annotation دي ويشغّلها.
- الاسم بيوصف **السلوك**: «الخصم بيتطبق فوق الحد». لما يقع، الاسم لوحده بيقولك إيه اللي باظ.
- [[assertEquals(expected, actual, delta)]]: المتوقع الأول ([[900.0]])، بعدين الحقيقي ([[calc.finalPrice(1000.0)]]).
- [[0.001]] اسمه delta: الفرق المسموح. ليه؟ لأن الـ Double مش دقيق في الكسور: [[0.1 + 0.2]] بيطلع [[0.30000000000000004]] مش [[0.3]]. فبنقول «لو الفرق أقل من 0.001 اعتبرهم زي بعض».

### الاختبار التاني

~~~kotlin
    @Test
    fun noDiscount_belowThreshold() {
        assertEquals(500.0, calc.finalPrice(500.0), 0.001)
    }
~~~

تحت الـ 1000: السعر زي ما هو.

### اختبار الـ exception

~~~kotlin
    @Test(expected = IllegalArgumentException::class)
    fun negativePrice_throws() {
        calc.finalPrice(-1.0)
    }
}
~~~

- [[expected = IllegalArgumentException::class]]: الاختبار **ينجح** لو الـ exception ده اترمى، ويقع لو مترماش.
- [[::class]]: الكلاس نفسه كقيمة.
- مفيش assert هنا: الـ [[require]] هي اللي المفروض ترمي.

---

## ٣. التشغيل

~~~bash
./gradlew testDebugUnitTest
~~~

[[./gradlew test]] بيشغّل اختبارات كل الـ variants (debug و release)، و [[testDebugUnitTest]] الـ debug بس (أسرع). التقرير XML في [[app/build/test-results/testDebugUnitTest/]] و HTML في [[app/build/reports/tests/testDebugUnitTest/index.html]]. ده اللي طلع في الـ XML:

~~~text الناتج (TEST-com.sara.notes.PriceCalculatorTest.xml)
<testsuite name="com.sara.notes.PriceCalculatorTest" tests="3" skipped="0" failures="0" errors="0" time="0.004"
<testcase name="negativePrice_throws" time="0.001"/>
<testcase name="noDiscount_belowThreshold" time="0.001"/>
<testcase name="discount_isAppliedAboveThreshold" time="0.0"/>
~~~

٣ اختبارات، صفر وقعوا، في ٤ ملي ثانية. ده اللي نقصده بـ «سريعة».

### لما الكود يبوظ

غيّرت [[>= 1000]] لـ [[> 1000]]:

~~~text الناتج
PriceCalculatorTest > discount_isAppliedAboveThreshold FAILED
    java.lang.AssertionError at PriceCalculatorTest.kt:10

java.lang.AssertionError: expected:<900.0> but was:<1000.0>
~~~

- اسم الاختبار بيقولك المشكلة: الخصم مش بيتطبق عند الحد.
- [[expected:<900.0> but was:<1000.0>]]: لو كنت كتبت [[assertEquals(actual, expected)]] بالعكس، كانت الرسالة هتقول «expected 1000» وتلخبطك.
- [[PriceCalculatorTest.kt:10]]: رقم السطر في الاختبار.

---

## ٤. الحل: اختبار ViewModel

~~~kotlin
    @Test
    fun addItem_updatesCountAndTotal() {
        val vm = CartViewModel()
        vm.addItem(50.0)
        vm.addItem(25.0)
        val state = vm.uiState.value
        assertEquals(2, state.count)
        assertEquals(75.0, state.total, 0.001)
    }
~~~

الـ ٣ خطوات: **Arrange** ([[CartViewModel()]])، **Act** ([[addItem]] مرتين)، **Assert** (العدد 2 والإجمالي 75). و [[uiState.value]]: القيمة الحالية في الـ StateFlow. عدّى في 0.1 ثانية. الـ [[CartViewModel]] ده مفيهوش coroutines ([[update]] على الـ StateFlow متزامنة)، فمش محتاج حاجة زيادة.

### الـ ViewModel اللي فيه [[viewModelScope]]

[[viewModelScope.launch]] بيشتغل على [[Dispatchers.Main]] (الـ UI thread بتاع Android). وفي الـ JVM مفيش Android ولا main thread، فلازم تبدّله:

~~~kotlin
class MainDispatcherRule(
    private val dispatcher: TestDispatcher = UnconfinedTestDispatcher()
) : TestWatcher() {
    override fun starting(description: Description) = Dispatchers.setMain(dispatcher)
    override fun finished(description: Description) = Dispatchers.resetMain()
}
~~~

- [[TestWatcher]]: كلاس من JUnit بيدّيك دوال بتتنادى قبل كل اختبار ([[starting]]) وبعده ([[finished]]).
- [[Dispatchers.setMain(...)]]: من الآن، [[Dispatchers.Main]] = الـ dispatcher ده. و [[resetMain()]] ترجّعه.
- [[UnconfinedTestDispatcher()]]: بيشغّل الـ coroutine **فورًا** في نفس الـ thread، فبعد [[launch]] على طول الكود اللي جواه يكون اتنفذ.

~~~kotlin
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
}
~~~

- [[@get:Rule]]: JUnit بيدوّر على الـ rules على الـ getter، و Kotlin بيحط الـ annotation على الـ field افتراضيًا، فـ [[get:]] بتقوله «حطها على الـ getter».
- [[= runTest { }]]: الاختبار كله جوه [[runTest]]، فتقدر تنادي suspend functions، والـ [[delay]] بيتخطى من غير ما يستنى.
- [[FakeNotesRepository]]: repository وهمي بلستة في الذاكرة. وعشان ده يشتغل، الـ ViewModel لازم ياخد **interface** ([[NotesRepository]]) والـ fake يعملها implement. ده الشكل اللي جربته:

~~~kotlin
class FakeNotesRepository : NotesRepository {
    val added = mutableListOf<String>()
    override val notes = MutableStateFlow<List<String>>(emptyList())
    override suspend fun add(title: String) {
        added += title
        notes.value = notes.value + title
    }
}
~~~

[[blankTitle_isIgnored]] عدّى: [[onAddClicked("   ")]] منادتش [[add]] خالص.

### زيادة: MockK و Turbine

نفس الاختبار بـ mock بدل fake، و Flow بـ Turbine (الاتنين عدّوا):

~~~kotlin
val repo = mockk<NotesRepository>(relaxed = true)
every { repo.notes } returns flowOf(emptyList())
NotesViewModel(repo).onAddClicked("  اشتري لبن ")
coVerify(exactly = 1) { repo.add("اشتري لبن") }
~~~

- [[mockk<T>(relaxed = true)]]: object وهمي، و [[relaxed]] يعني أي دالة متتعرّفش بترجّع قيمة فاضية بدل ما ترمي.
- [[every { } returns x]]: لما حد يطلب [[repo.notes]] رجّع x.
- [[coVerify(exactly = 1) { }]]: اتأكد إن الـ suspend fun دي اتنادت مرة واحدة بالقيمة دي (بعد [[trim()]]).

~~~kotlin
vm.notes.test {
    assertEquals(emptyList<String>(), awaitItem())
    vm.onAddClicked("ذاكر Kotlin")
    assertEquals(listOf("ذاكر Kotlin"), awaitItem())
}
~~~

[[test { }]] من Turbine بتسمع للـ Flow، و [[awaitItem()]] بتستنى القيمة الجاية. لو جت قيمة زيادة متوقعتهاش، الاختبار بيقع في الآخر.

---

## ٥. ليه المنطق ميتكتبش بـ Android

شغّلت ViewModel فيه [[Log.d(...)]] في unit test عادي:

~~~text الناتج
java.lang.RuntimeException: Method d in android.util.Log not mocked. See https://developer.android.com/r/studio-ui/build/not-mocked for details.
~~~

الـ [[android.jar]] اللي الـ unit tests بتشوفه فيه أسماء الدوال بس من غير تنفيذ. عشان كده المنطق يتكتب Kotlin عادي، أو تستخدم Robolectric (في الدرس الجاي).

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[src/test/]] | unit tests على الـ JVM، من غير موبايل |
| [[@Test]] | دالة اختبار، وكل اختبار object جديد |
| [[assertEquals(expected, actual, delta)]] | المتوقع الأول، و delta للـ Double |
| [[@Test(expected = X::class)]] | ينجح لو X اترمى |
| [[runTest { }]] | لـ suspend و coroutines، والـ delay بيتخطى |
| [[MainDispatcherRule]] | بيبدّل [[Dispatchers.Main]] للـ ViewModels |
| fake / [[mockk]] / Turbine | repository وهمي، و mock، واختبار Flow |
| [[./gradlew testDebugUnitTest]] | التشغيل، والتقرير في [[app/build/reports/tests/]] |`,
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
          teach: R`## الكود بيعمل إيه؟

بيعرض الـ [[Counter]] (من درس remember و state) لوحده، وبيعمل اللي اليوزر بيعمله: يدوّر على نص على الشاشة، يدوس على زرار، يكتب في حقل، وبعدين يتأكد إن الشاشة اتغيرت صح.

### اتجرّب فين؟

- مفيش emulator ولا موبايل هنا، فـ [[./gradlew connectedAndroidTest]] من الـ docs.
- بدل كده شغّلت **نفس الاختبارات بالحرف** على الـ JVM بـ **Robolectric 4.17** (Android وهمي بيشتغل جوه الـ JVM): حطيتهم في [[src/test]] وزوّدت [[@RunWith(RobolectricTestRunner::class)]] فوق الكلاس، وشغّلت [[./gradlew testDebugUnitTest]] في مشروع Android حقيقي (AGP 9.4.1 و Compose BOM 2026.06.01 و Java 21). اختبارين الـ Counter و ٣ اختبارات الحل عدّوا كلهم.
- مع Robolectric و SDK 36 على Java 21 احتجت أزوّد للـ test JVM: [[--add-exports=java.base/jdk.internal.access=ALL-UNNAMED]]، وإلا كل اختبار بيقع بـ [[Failed to interact with raw FileDescriptor internals]].

---

## ١. الـ rule

~~~kotlin
class CounterScreenTest {
    @get:Rule
    val composeRule = createComposeRule()
~~~

- [[createComposeRule()]]: بتجهّز Activity فاضية تعرض فيها الـ composable، وبتديك أدوات الدوّارة والأفعال. محتاجة مكتبة [[androidx.compose.ui:ui-test-junit4]]، و [[ui-test-manifest]] في [[debugImplementation]] (فيها الـ Activity الفاضية في الـ manifest).
- [[@get:Rule]]: JUnit بيقرا الـ rules من الـ getter، فـ [[get:]] بتحط الـ annotation هناك.
- الـ rule بيستنى لوحده لحد ما Compose يخلّص أي recomposition أو animation قبل كل سطر، فمفيش [[Thread.sleep]].

---

## ٢. الاختبار الأول: الزرار

~~~kotlin
    @Test
    fun clickingButton_incrementsCounter() {
        composeRule.setContent { Counter() }
~~~

[[setContent { }]]: اعرض الـ composable ده بس، من غير باقي التطبيق.

قبل ما نكمل: الاختبار بيدوّر في إيه؟ Compose بيعمل **semantics tree**: شجرة فيها النصوص والأدوار والأفعال لكل عنصر. طبعتها بـ [[composeRule.onRoot().printToString()]] للـ Counter، وده الناتج (مختصر):

~~~text الناتج
Node #1 at (l=0.0, t=0.0, r=312.0, b=211.0)px
 |-Node #3 at (l=16.0, t=16.0, r=24.0, b=51.0)px
 | Text = '[العدد: 0]'
 |-Node #4 at (l=16.0, t=59.0, r=74.0, b=111.0)px
 | Role = 'Button'
 | Text = '[زوّد]'
 | Actions = [..., OnClick, RequestFocus, ...]
 | MergeDescendants = 'true'
 |-Node #7 at (l=16.0, t=119.0, r=296.0, b=195.0)px
   EditableText = ''
   IsEditable = 'true'
   Text = '[اسمك]'
   Actions = [..., OnClick, ..., SetText, ...]
   MergeDescendants = 'true'
~~~

- كل [[Node]] عنصر، ومعاه مكانه بالـ pixels ([[l]] شمال، [[t]] فوق، [[r]] يمين، [[b]] تحت).
- الزرار [[Role = 'Button']] وجواه النص [[زوّد]]. [[MergeDescendants = 'true']] يعني الـ Text اللي جوه الزرار اتدمج فيه، فلما تدوّر على «زوّد» بتلاقي الزرار نفسه (اللي عنده [[OnClick]]).
- الـ TextField عنده [[Text = '[اسمك]']] (الـ label اتدمج فيه) و [[SetText]].

~~~kotlin
        composeRule.onNodeWithText("العدد: 0").assertIsDisplayed()
~~~

- [[onNodeWithText("...")]]: دوّر على عنصر **واحد** نصه كده بالظبط.
- [[assertIsDisplayed()]]: اتأكد إنه ظاهر على الشاشة.

~~~kotlin
        composeRule.onNodeWithText("زوّد").performClick()
        composeRule.onNodeWithText("العدد: 1").assertIsDisplayed()
    }
~~~

[[performClick()]] بيدوس، والـ rule بيستنى الـ recomposition، وبعدين النص بقى [[العدد: 1]]. عدّى.

### لو التأكيد غلط

جربت [[onNodeWithText("العدد: 5").assertIsDisplayed()]]:

~~~text الناتج
java.lang.AssertionError: Assert failed: The component with Text + InputText + EditableText contains 'العدد: 5' (ignoreCase: false) is not displayed!
~~~

الرسالة بتقولك بيدوّر على إيه بالظبط. أول حاجة تعملها ساعتها: اطبع الشجرة اللي فوق وشوف النص الحقيقي.

---

## ٣. الاختبار التاني: الكتابة

~~~kotlin
    @Test
    fun typingName_showsGreeting() {
        composeRule.setContent { Counter() }
        composeRule.onNodeWithText("أهلًا يا Sara").assertDoesNotExist()
~~~

- كل [[@Test]] بيبدأ بشاشة جديدة، فلازم [[setContent]] تاني.
- [[assertDoesNotExist()]]: العنصر مش في الشجرة خالص (الـ [[if (name.isNotBlank())]] لسه false).

~~~kotlin
        composeRule.onNodeWithText("اسمك").performTextInput("Sara")
        composeRule.onNodeWithText("أهلًا يا Sara").assertIsDisplayed()
    }
}
~~~

- [[onNodeWithText("اسمك")]]: بيلاقي الـ TextField عن طريق الـ label (Node #7 فوق).
- [[performTextInput("Sara")]]: بيكتب النص (عن طريق الـ [[SetText]] / [[InsertTextAtCursor]] اللي في Actions)، فـ [[onValueChange]] بتتنادى والـ state يتغير.
- بعدها الترحيب ظهر. عدّى.

---

## ٤. الحل: شاشة stateless

~~~kotlin
@Composable
fun PostsContent(state: PostsUiState, onRetry: () -> Unit) {
    when (state) {
        PostsUiState.Loading -> CircularProgressIndicator(Modifier.testTag("loading"))
        is PostsUiState.Error -> Button(onClick = onRetry) { Text(state.message) }
        is PostsUiState.Success -> LazyColumn { items(state.posts, key = { it.id }) { Text(it.title) } }
    }
}
~~~

- بتاخد الـ state والـ lambda من برا، فالاختبار يديها أي حالة على طول من غير ViewModel ولا شبكة.
- [[Modifier.testTag("loading")]]: الـ spinner مفيهوش نص، فبنديله اسم للاختبار بس.
- [[is PostsUiState.Error]]: [[is]] بتشيك النوع وبتعمل smart cast، فـ [[state.message]] متاحة.

~~~kotlin
    @Test
    fun loading_showsSpinner() {
        composeRule.setContent { PostsContent(PostsUiState.Loading, onRetry = { }) }
        composeRule.onNodeWithTag("loading").assertIsDisplayed()
    }
~~~

[[onNodeWithTag]] بيدوّر بالـ testTag. و [[onRetry = { }]] lambda فاضية لأننا مش محتاجينها هنا.

~~~kotlin
    @Test
    fun error_clickRetry_callsCallback() {
        var retries = 0
        composeRule.setContent { PostsContent(PostsUiState.Error("مفيش نت"), onRetry = { retries++ }) }
        composeRule.onNodeWithText("مفيش نت").performClick()
        assertEquals(1, retries)
    }
~~~

[[var retries = 0]] عدّاد في الاختبار نفسه، والـ lambda بتزوّده. بعد الضغطة [[retries]] بقى 1، يعني الزرار متوصّل بـ [[onRetry]] فعلًا.

~~~kotlin
        val posts = listOf(Post(1, "أول بوست", ""), Post(2, "تاني بوست", ""))
        composeRule.setContent { PostsContent(PostsUiState.Success(posts), onRetry = { }) }
        composeRule.onNodeWithText("تاني بوست").assertIsDisplayed()
~~~

لستة ثابتة، ونتأكد إن العنوان ظاهر.

### الوقت

~~~text الناتج (من تقارير الـ XML)
clickingButton_incrementsCounter   30.303s
typingName_showsGreeting            1.298s
loading_showsSpinner                0.443s
error_clickRetry_callsCallback      0.23s
success_showsTitles                 0.242s
~~~

أول اختبار Robolectric بياخد وقت عشان بيحمّل Android الوهمي، والباقي أقل من ثانية. وعلى emulator (من الـ docs) أبطأ لأنه بيبني APK للاختبار ويسطّبه الأول.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[createComposeRule()]] + [[@get:Rule]] | تجهّز Compose للاختبار |
| [[setContent { }]] | تعرض composable لوحده |
| [[onNodeWithText]] / [[onNodeWithTag]] | تدوّر في الـ semantics tree |
| [[performClick()]] / [[performTextInput()]] | تعمل زي اليوزر |
| [[assertIsDisplayed()]] / [[assertDoesNotExist()]] | تتأكد |
| [[onRoot().printToString()]] أو [[printToLog]] | تشوف الشجرة لما متلاقيش عنصر |
| [[src/androidTest]] + [[connectedAndroidTest]] | على موبايل (أو [[src/test]] + Robolectric على الـ JVM) |`,
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
          teach: R`## الكود بيعمل إيه؟

ViewModel بيكتب ٣ رسايل في الـ log: واحدة لما الـ refresh يبدأ، وواحدة لما يخلص بعدد الملاحظات، وواحدة لو وقع ومعاها الـ exception كله. والرسايل دي بتشوفها في Logcat وانت بتجرّب.

### اتجرّب فين؟

- الكلاس زي ما هو اتترجم في مشروع Android حقيقي (AGP 9.4.1 و Kotlin 2.4.20)، و [[repo]] repository وهمي بيرجّع 3، وواحد تاني بيرمي [[UnknownHostException]] (زي ما بيحصل لما النت مقفول).
- مفيش موبايل، فشغّلته في unit test بـ **Robolectric** (Android وهمي على الـ JVM)، و Robolectric بيطبع اللوجات بنفس شكل [[adb logcat]] لما تقوله [[ShadowLog.stream = System.out]]. الناتج تحت حقيقي.
- Logcat في Android Studio والـ debugger و Layout Inspector و App Inspection: من الـ docs.

---

## ١. الـ TAG

~~~kotlin
private const val TAG = "NotesVM"
~~~

- [[TAG]]: اسم قصير بيتكتب جنب كل رسالة، وبيه بتفلتر Logcat ([[tag:NotesVM]]).
- [[const val]]: ثابت وقت الترجمة (نص أو رقم بس). و [[private]] برا الكلاس = الملف ده بس يشوفه.
- العرف: اسم الكلاس أو اختصاره، وأقل من 23 حرف (Android قديم كان بيرفض أطول من كده).

---

## ٢. الرسايل

~~~kotlin
class NotesViewModel(private val repo: NotesRepository) : ViewModel() {
    fun refresh() {
        Log.d(TAG, "refresh بدأ")
~~~

[[Log]] كلاس في [[android.util]]، والحرف بعد النقطة هو المستوى:

| الدالة | المستوى | الحرف في Logcat | امتى |
|---|---|---|---|
| [[Log.v]] | verbose | V | تفاصيل كتير جدًا |
| [[Log.d]] | debug | D | وانت بتطوّر |
| [[Log.i]] | info | I | حدث مهم عادي |
| [[Log.w]] | warning | W | حاجة غريبة بس مكمّلين |
| [[Log.e]] | error | E | حاجة فشلت |

~~~kotlin
        viewModelScope.launch {
            try {
                val count = repo.refresh()
                Log.i(TAG, "refresh خلص: $count ملاحظة")
~~~

[[$count]] string template: القيمة بتتحط جوه النص.

~~~kotlin
            } catch (e: IOException) {
                Log.e(TAG, "refresh وقع", e)
            }
~~~

النسخة اللي بـ ٣ parameters: التالت [[Throwable]]، و Log بيطبع نوعه ورسالته والـ stack trace كله تحت رسالتك. و [[UnknownHostException]] نوع من [[IOException]]، فالـ catch بيمسكه.

### الناتج

~~~text الناتج (Robolectric، repository بيرجّع 3 وبعدين repository من غير نت)
D/NotesVM: refresh بدأ
I/NotesVM: refresh خلص: 3 ملاحظة
D/NotesVM: refresh بدأ
E/NotesVM: refresh وقع
java.net.UnknownHostException: Unable to resolve host "api.example.com": No address associated with hostname
    at com.sara.notes.FakeOffline.refresh(LogTests.kt:14)
    at com.sara.notes.logs.NotesViewModel$refresh$1.invokeSuspend(Logs.kt:17)
    at kotlin.coroutines.jvm.internal.BaseContinuationImpl.resumeWith(ContinuationImpl.kt:34)
    at kotlinx.coroutines.internal.DispatchedContinuationKt.resumeCancellableWith(DispatchedContinuation.kt:375)
    ...
~~~

الشكل [[مستوى/TAG: الرسالة]]. و Logcat في Android Studio بيزوّد قبلها الوقت والـ PID (رقم الـ process) واسم الـ package (من الـ docs).

---

## ٣. تقرا الـ stack trace إزاي

خد السطور اللي فوق واحد واحد:

1. [[java.net.UnknownHostException]]: نوع الـ exception. و [[Unable to resolve host "api.example.com"]]: الموبايل معرفش يحوّل اسم السيرفر لـ IP، يعني غالبًا مفيش نت.
2. [[at com.sara.notes.FakeOffline.refresh(LogTests.kt:14)]]: أول سطر = آخر دالة كانت شغالة، والملف ورقم السطر بين الأقواس. ده المكان اللي الـ exception اترمى منه.
3. [[at com.sara.notes.logs.NotesViewModel$refresh$1.invokeSuspend(Logs.kt:17)]]: مين نادى عليها. [[$refresh$1]] هو الـ lambda اللي جوه [[launch]] في دالة [[refresh]]، و [[invokeSuspend]] اسم الدالة اللي Kotlin بيولّدها للـ coroutine. و [[Logs.kt:17]] هو سطر [[val count = repo.refresh()]].
4. السطور اللي بعدها [[kotlin.coroutines]] و [[kotlinx.coroutines]]: مكتبات، مش كودك.

القاعدة: نزّل لحد **أول سطر فيه الـ package بتاعك** ([[com.sara.notes]]). ولو تحت فيه [[Caused by:]] (exception جوه exception)، روح للأخير: ده السبب الأصلي.

وفي crash حقيقي Logcat بيكتب فوق ده سطر [[FATAL EXCEPTION: main]] واسم الـ process (من الـ docs).

---

## ٤. ليه [[Log]] مينفعش في unit test عادي

نفس الـ ViewModel في JUnit من غير Robolectric:

~~~text الناتج
java.lang.RuntimeException: Method d in android.util.Log not mocked. See https://developer.android.com/r/studio-ui/build/not-mocked for details.
~~~

الـ unit tests بتشوف [[android.jar]] فاضي (أسماء الدوال بس). فاللي فيه [[Log]] يا إما Robolectric، يا إما مكتبة زي Timber، يا إما المنطق يتفصل عن الـ logging.

---

## ٥. الفلتر في Logcat و adb

| تكتب | يعني |
|---|---|
| [[package:mine]] | تطبيقك بس |
| [[tag:NotesVM]] | الـ TAG ده |
| [[level:error]] | E وطالع |
| [[package:mine level:warn]] | الاتنين مع بعض |
| [[adb logcat -s NotesVM]] | من الترمنال: tag واحد ([[-s]] = silent لكل الباقي) |
| [[adb logcat *:E]] | كل الـ tags ([[*]])، errors بس |
| [[adb logcat -c]] | فضّي الـ buffer |

([[adb]] = Android Debug Bridge، أداة الـ SDK اللي بتكلم الموبايل. الأوامر دي من الـ docs.)

---

## ٦. الأدوات التانية (من الـ docs)

- **breakpoint**: دوس جنب رقم السطر (نقطة حمرا)، وشغّل بـ Debug (أيقونة الحشرة). لما يوصل للسطر بيقف، وتاب Variables بيوريك [[this]] و [[count]] وكل حاجة. F8 = السطر الجاي (Step Over)، و F7 = ادخل جوه الدالة (Step Into).
- **Layout Inspector**: شجرة الـ UI وهي شغالة، والمقاسات، وعداد الـ recompositions لكل composable.
- **App Inspection**: Database Inspector (جداول Room) و Network Inspector.

---

## الخلاصة

| الأداة | امتى |
|---|---|
| [[Log.d/i/w/e(TAG, msg)]] | تتابع اللي بيحصل، خصوصًا التوقيت والـ coroutines |
| [[Log.e(TAG, msg, e)]] | تطبع الـ exception بالـ stack trace |
| الـ stack trace | أول سطر فيه الـ package بتاعك، و [[Caused by]] في الآخر |
| breakpoint | عايز تشوف قيم المتغيرات |
| Layout Inspector | مشاكل الشكل والـ recomposition |

- متكتبش توكنات ولا بيانات شخصية في الـ log: بتفضل في الـ release.`,
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
          teach: R`## الكود بيعمل إيه؟

لستة منتجات مترتبة بالسعر، ولما اليوزر ينزل أكتر من ٥ عناصر يظهر زرار صغير «↑» يرجّعه لأول اللستة. وفيه ٣ تحسينات صغيرة: [[derivedStateOf]] عشان الشاشة متترسمش مع كل scroll، و [[remember(products)]] عشان الترتيب ميتحسبش كل مرة، و [[key]] في اللستة.

### اتجرّب فين؟

- الكود زي ما هو اتترجم في مشروع Android حقيقي (AGP 9.4.1 و Kotlin 2.4.20 و Compose BOM 2026.06.01).
- مفيش موبايل ولا Layout Inspector، فعملت قياس بديل: نسختين من نفس الفكرة (مع وبدون [[derivedStateOf]]) جوه اختبار Compose بـ Robolectric على الـ JVM، وعدّيت كام مرة الـ composable اتعمله recomposition وأنا بعمل scroll عنصر عنصر ٢٠ مرة. الأرقام تحت حقيقية.
- وبنيت الـ debug والـ release وقارنت الحجم. نعومة الـ scroll على موبايل و Profiler و Macrobenchmark: من الـ docs.

---

## ١. حالة الـ scroll

~~~kotlin
@Composable
fun ProductsList(products: List<Product>, modifier: Modifier = Modifier) {
    val listState = rememberLazyListState()
    val scope = rememberCoroutineScope()
~~~

- [[modifier: Modifier = Modifier]]: العرف في Compose: كل composable بياخد modifier من اللي بيناديه، والقيمة الافتراضية [[Modifier]] الفاضي.
- [[rememberLazyListState()]]: object فيه مكان الـ scroll. أهم حاجة فيه [[firstVisibleItemIndex]]: رقم أول عنصر ظاهر فوق. وبيتغير **مع كل عنصر بيعدّي**.
- [[rememberCoroutineScope()]]: scope مربوط بالـ composable، عشان نبدأ coroutine من جوه [[onClick]] (الـ scroll animation دالة suspend).

---

## ٢. [[derivedStateOf]]: القلب

~~~kotlin
    val showScrollToTop by remember {
        derivedStateOf { listState.firstVisibleItemIndex > 5 }
    }
~~~

من جوه لبرة:

1. [[listState.firstVisibleItemIndex > 5]]: Boolean. لو اليوزر نزل من 0 لـ 20، الرقم بيتغير ٢٠ مرة، بس الـ Boolean بيتغير **مرة واحدة** (لما يعدّي الـ 5).
2. [[derivedStateOf { }]]: state جديد محسوب من states تانية. بيعيد الحساب كل ما [[firstVisibleItemIndex]] يتغير، بس **مبيبلّغش** اللي بيقراه إلا لما النتيجة نفسها تتغير.
3. [[remember { }]]: عشان الـ derivedStateOf نفسه يتعمل مرة واحدة، مش object جديد مع كل recomposition.
4. [[by]]: نقرا [[showScrollToTop]] كـ Boolean على طول بدل [[.value]].

### القياس

نفس الشاشة مرتين، وفيها [[SideEffect { compositions++ }]] (بيتنفذ بعد كل composition ناجح)، وعملت [[scrollToItem(i)]] من 1 لـ 20:

~~~text الناتج
بدون derivedStateOf: 21 composition
مع derivedStateOf: 2 composition
~~~

- **21** = مرة أول ما الشاشة اترسمت + 20 مرة، واحدة مع كل عنصر. لأن الـ composable كان بيقرا [[firstVisibleItemIndex]] مباشرة، فأي تغيير فيه = recomposition للشاشة كلها.
- **2** = مرة في الأول + مرة لما العنصر بقى 6 والـ Boolean بقى true. الـ 18 scroll التانيين محدش اتبلّغ بيهم.

ومتحطوش في كل حتة: لو النتيجة بتتغير بنفس سرعة الـ input (زي [["$__{first} $__{last}"]])، derivedStateOf مش هيوفّر حاجة وهو نفسه ليه تكلفة.

---

## ٣. [[remember(products)]]: متحسبش كل مرة

~~~kotlin
    val sorted = remember(products) { products.sortedBy { it.price } }
~~~

- [[sortedBy { it.price }]]: لستة جديدة مترتبة بالسعر من الأصغر. بتعدي على اللستة كلها كل مرة تتنادى.
- [[remember(products) { }]]: احسب مرة واحفظ النتيجة، ومتحسبش تاني إلا لو [[products]] اتغيرت (الـ parameter اسمه key). من غيرها، كل recomposition (حتى بسبب حاجة ملهاش علاقة) = ترتيب من جديد.

---

## ٤. اللستة و [[key]]

~~~kotlin
    Box(modifier) {
        LazyColumn(state = listState) {
            items(sorted, key = { it.id }) { product ->
                Text("$__{product.title}: $__{product.price}", Modifier.padding(16.dp))
            }
        }
~~~

- [[Box]]: العناصر فوق بعض، فالزرار يبقى فوق اللستة.
- [[state = listState]]: نفس الـ state اللي بنقرا منه فوق.
- [[key = { it.id }]]: كل عنصر ليه هوية ثابتة. لو الترتيب اتغير أو عنصر اتمسح، Compose يعرف مين هو مين ويحرّكهم بدل ما يعيد رسم كله (درس LazyColumn).

---

## ٥. الزرار

~~~kotlin
        if (showScrollToTop) {
            SmallFloatingActionButton(
                onClick = { scope.launch { listState.animateScrollToItem(0) } },
                modifier = Modifier.align(Alignment.BottomEnd).padding(16.dp)
            ) { Text("↑") }
        }
    }
}
~~~

- [[if (showScrollToTop)]]: هنا بنقرا الـ Boolean، وده اللي بيعمل الـ recomposition مرتين بس.
- [[scope.launch { listState.animateScrollToItem(0) }]]: [[animateScrollToItem]] suspend (بتاخد وقت الحركة)، فلازم coroutine.
- [[Modifier.align(Alignment.BottomEnd)]]: الركن تحت في آخر السطر (يمين في الإنجليزي، شمال في العربي RTL). [[align]] متاحة بس جوه [[Box]].

---

## ٦. debug ولا release؟

بنيت نفس المشروع بالطريقتين:

~~~text الناتج
app-debug.apk                       12,750,406 byte  (12.2 MB)
app-release.apk (من غير R8)          9,181,769 byte  (8.8 MB)
app-release.apk (R8 + shrinkResources) 992,154 byte  (0.95 MB)
~~~

- الـ debug فيه الكود كله من غير تحسين، وفيه معلومات debugging، و ART بيشغّله بشكل أبطأ عشان الـ debugger. فقياس الأداء عليه بيكدب.
- الـ release بـ R8 (الكود اتقلّص من [[classes.dex]] و [[classes2.dex]] حجمهم مع بعض حوالي 23 ميجا قبل الضغط لملف واحد 1.4 ميجا).

وجوه الـ release APK لقيت:

~~~text الناتج
assets/dexopt/baseline.prof    4177 byte
~~~

ده **Baseline Profile**: مكتبات Compose نفسها جاية بـ profile جاهز، و AGP بيحطه في التطبيق. لما التطبيق يتسطّب، Android بيترجم الكود اللي في القايمة دي مقدمًا (AOT)، بدل ما يستنى الـ JIT يكتشفه وانت بتستخدمه. وتقدر تعمل profile لكودك انت بمكتبة Macrobenchmark (من الـ docs).

---

## الخلاصة

| الحاجة | بتحل إيه | الرقم هنا |
|---|---|---|
| [[derivedStateOf]] | state بيتغير كتير ونتيجته بتتغير قليل | 21 ← 2 composition |
| [[remember(key) { }]] | حساب تقيل في كل recomposition | |
| [[key = { it.id }]] | اللستة تعرف كل عنصر | |
| release + R8 | الـ debug مش مقياس | 12.2 ميجا ← 0.95 ميجا |
| Baseline Profile | أول فتح والـ scroll | [[baseline.prof]] جوه الـ APK |

- قيس الأول (Layout Inspector و Profiler)، وبعدين حسّن.`,
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
          teach: R`## الكود بيعمل إيه؟

ده جزء [[android { }]] من [[app/build.gradle.kts]]، وبيقول لـ Gradle ٣ حاجات: التوقيع بتاع الـ release هيتعمل بأنهي مفتاح، والـ debug يبقى ليه id مختلف، وفيه نسختين من التطبيق ([[staging]] و [[prod]]) كل واحدة بتكلم سيرفر مختلف.

### اتجرّب فين؟

- الـ block ده بالحرف اتحط في مشروع Android حقيقي (AGP 9.4.1 و Gradle 9.8.1 و Java 21، جوه image فيها Android SDK 36)، وعملت keystore بأمر [[keytool]] اللي في الحل (في [[docker run --rm eclipse-temurin:21-jdk]]) بباسورد تجربة.
- بنيت [[assembleStagingDebug]] و [[assembleProdRelease]] بالـ environment variables، وقريت [[BuildConfig.java]] اللي اتولّد، وكشفت الـ APKs بـ [[aapt2]] و [[apksigner]] من الـ SDK. وجربت البناء من غير الـ variables وبباسورد غلط.
- التسطيب على الموبايل: من الـ docs.

---

## ١. التوقيع: [[signingConfigs]]

~~~kotlin
    signingConfigs {
        create("release") {
~~~

[[create("release") { }]]: اعمل signing config جديد اسمه release. الاسم ده هنستخدمه تحت. (الـ debug config موجود لوحده.)

~~~kotlin
            storeFile = file(System.getenv("KEYSTORE_PATH") ?: "release.jks")
~~~

من جوه لبرة:

1. [[System.getenv("KEYSTORE_PATH")]]: اقرا environment variable بالاسم ده. بترجّع [[String?]]: نص، أو [[null]] لو مش متحدد.
2. [[?: "release.jks"]]: الـ Elvis operator: لو اللي على الشمال null خد اللي على اليمين (درس null safety).
3. [[file(...)]]: دالة Gradle بتحوّل المسار لـ File، والمسار النسبي بيتحسب من فولدر [[app/]].

~~~kotlin
            storePassword = System.getenv("KEYSTORE_PASSWORD")
            keyAlias = "upload"
            keyPassword = System.getenv("KEY_PASSWORD")
        }
    }
~~~

- الـ keystore ملف ليه باسورد ([[storePassword]])، وجواه مفتاح أو أكتر، كل واحد ليه اسم ([[keyAlias]]) وباسورد ([[keyPassword]]).
- [[upload]]: نفس الـ [[-alias upload]] في أمر [[keytool]].
- الباسوردات مش مكتوبة في الملف: الملف ده بيتعمله commit، فأي حاجة فيه أي حد يشوفها.

---

## ٢. الـ build types

~~~kotlin
    buildTypes {
        debug {
            applicationIdSuffix = ".debug"
        }
~~~

[[applicationIdSuffix]]: كلمة بتتلزق في آخر الـ applicationId. ده اللي [[aapt2 dump badging]] قاله على الـ APK:

~~~text الناتج
app-staging-debug.apk  ->  package: name='com.sara.notes.debug' versionCode='12' versionName='1.3.0'
app-prod-release.apk   ->  package: name='com.sara.notes' versionCode='12' versionName='1.3.0'
~~~

Android بيعتبرهم تطبيقين مختلفين، فيتسطّبوا جنب بعض.

~~~kotlin
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
            signingConfig = signingConfigs.getByName("release")
        }
    }
~~~

- السطور التلاتة الأولى R8 (درس R8 بعد الجاي).
- [[signingConfigs.getByName("release")]]: هات الـ config اللي عملناه فوق بالاسم.

---

## ٣. الـ flavors

~~~kotlin
    flavorDimensions += "env"
~~~

[[flavorDimensions]]: «محاور» الـ flavors. هنا محور واحد اسمه [[env]] (environment). و [[+=]] بتضيف للستة.

~~~kotlin
    productFlavors {
        create("staging") {
            dimension = "env"
            buildConfigField("String", "API_URL", "\"https://staging.example.com/\"")
        }
~~~

[[buildConfigField(النوع, الاسم, القيمة)]]: الـ ٣ نصوص دول بيتكتبوا **كود Java** حرفيًا في كلاس [[BuildConfig]]. عشان كده القيمة فيها [[\"]] (علامة تنصيص جوه نص Kotlin): لازم الـ Java يطلع فيه نص بين علامتين.

~~~kotlin
        create("prod") {
            dimension = "env"
            buildConfigField("String", "API_URL", "\"https://api.example.com/\"")
        }
    }
    buildFeatures {
        buildConfig = true
    }
~~~

[[buildConfig = true]]: من AGP 8، [[BuildConfig]] مش بيتولّد إلا لو طلبته.

### الـ BuildConfig اللي اتولّد

لـ [[stagingDebug]] (الملف في [[app/build/generated/source/buildConfig/staging/debug/com/sara/notes/BuildConfig.java]]):

~~~java
public final class BuildConfig {
  public static final boolean DEBUG = Boolean.parseBoolean("true");
  public static final String APPLICATION_ID = "com.sara.notes.debug";
  public static final String BUILD_TYPE = "debug";
  public static final String FLAVOR = "staging";
  public static final int VERSION_CODE = 12;
  public static final String VERSION_NAME = "1.3.0";
  // Field from product flavor: staging
  public static final String API_URL = "https://staging.example.com/";
}
~~~

ولـ [[prodRelease]] نفس الشكل بـ [[API_URL = "https://api.example.com/"]]. وفي كودك: [[.baseUrl(BuildConfig.API_URL)]].

---

## ٤. الـ variants والـ tasks

flavor واحد من كل dimension × build type = ٤ variants، و Gradle عمل task لكل واحد. من [[./gradlew tasks --all]]:

~~~text الناتج (مختصر)
app:assembleProdDebug - Assembles main output for variant prodDebug
app:assembleProdRelease - Assembles main output for variant prodRelease
app:assembleStagingDebug - Assembles main output for variant stagingDebug
app:assembleStagingRelease - Assembles main output for variant stagingRelease
app:bundleProdRelease - Assembles bundle for variant prodRelease
app:assembleDebug - Assembles main outputs for all Debug variants.
app:assembleStaging - Assembles main outputs for all Staging variants.
~~~

[[assembleDebug]] بقى يبني الاتنين debug. والمخرجات:

~~~text الناتج
app/build/outputs/apk/staging/debug/app-staging-debug.apk    12,750,414 byte
app/build/outputs/apk/prod/release/app-prod-release.apk        992,154 byte
~~~

---

## ٥. الـ keystore (الحل)

~~~bash
keytool -genkeypair -v -keystore ~/keys/notes-upload.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
~~~

| الحتة | معناها |
|---|---|
| [[keytool]] | أداة بتيجي مع الـ JDK |
| [[-genkeypair]] | اعمل مفتاح خاص + عام وشهادة |
| [[-v]] | verbose: اطبع تفاصيل |
| [[-keystore ~/keys/notes-upload.jks]] | الملف (برا المشروع) |
| [[-keyalg RSA -keysize 2048]] | نوع المفتاح وطوله بالـ bits |
| [[-validity 10000]] | صالح ١٠٠٠٠ يوم (حوالي ٢٧ سنة). Play بيطلب مفتاح صالح لبعد أكتوبر 2033 (من الـ docs) |
| [[-alias upload]] | اسم المفتاح جوه الملف |

وهو بيسأل كده (الإجابات كانت متبعتة من ملف):

~~~text الناتج
Enter keystore password:  Re-enter new password:
What is your first and last name?
  [Unknown]:  What is the name of your organizational unit?
  [Unknown]:  What is the name of your organization?
  ...
Is CN=Sara, OU=Dev, O=Sara Apps, L=Cairo, ST=Cairo, C=EG correct?
  [no]:
Generating 2,048 bit RSA key pair and self-signed certificate (SHA384withRSA) with a validity of 10,000 days
[Storing /root/keys/notes-upload.jks]
~~~

لاحظ إنه مسألش على باسورد للمفتاح: الـ keystore بقى نوعه **PKCS12** افتراضيًا ([[Keystore type: PKCS12]] في [[keytool -list]])، وفيه باسورد المفتاح = باسورد الملف. فـ [[KEY_PASSWORD]] و [[KEYSTORE_PASSWORD]] نفس القيمة.

### الـ environment variables والبناء

~~~bash
export KEYSTORE_PATH=~/keys/notes-upload.jks
export KEYSTORE_PASSWORD='...'
export KEY_PASSWORD='...'
./gradlew assembleProdRelease
~~~

[[export]] في bash بيخلي المتغير متاح للبرامج اللي هتشتغل من الترمنال ده (Gradle). وفي PowerShell نفس الفكرة بـ [[$env:]]:

~~~powershell
$env:KEYSTORE_PATH = "$HOME\keys\notes-upload.jks"
$env:KEYSTORE_PATH
~~~

~~~text الناتج (pwsh)
C:\Users\ali\keys\notes-upload.jks
~~~

ويتأكد من التوقيع [[apksigner]] (في [[build-tools]] بتاع الـ SDK):

~~~text الناتج (apksigner verify --print-certs)
app-staging-debug.apk -> Signer #1 certificate DN: C=US, O=Android, CN=Android Debug
app-prod-release.apk  -> Signer #1 certificate DN: CN=Sara, OU=Dev, O=Sara Apps, L=Cairo, C=EG
~~~

الـ debug اتوقّع لوحده بمفتاح debug اللي Android Studio بيعمله، والـ release بمفتاحك.

### لو الـ variables مش موجودة أو غلط

~~~text الناتج (من غير variables)
Execution failed for task ':app:validateSigningProdRelease'
> Keystore file not set for signing config release
~~~

~~~text الناتج (باسورد غلط)
> com.android.ide.common.signing.KeytoolException: Failed to read key upload from store "/w/keys/notes-upload.jks": keystore password was incorrect
~~~

البناء بيقع بدل ما يطلّع APK متوقّع غلط، وده المطلوب.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[signingConfigs { create("release") }]] | المفتاح، والباسوردات من الـ environment |
| [[applicationIdSuffix = ".debug"]] | الـ debug يتسطّب جنب الـ release |
| [[flavorDimensions]] + [[productFlavors]] | نسخ staging و prod |
| [[buildConfigField]] + [[buildConfig = true]] | ثابت في [[BuildConfig]] لكل flavor |
| variant = flavor × build type | [[assembleStagingDebug]] و [[bundleProdRelease]] ... |

- الـ keystore والباسوردات برا git، ومعاهم backup.`,
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
          sol: R`أمر الـ keystore تحت (هيسألك على باسورد الملف مرتين، والاسم والمؤسسة والمدينة والبلد). وبعد ما تبني: [[app/build/outputs/apk/staging/debug/app-staging-debug.apk]]، ولو سطّبت الـ staging debug والـ prod release هتلاقي التطبيقين جنب بعض على الموبايل.

ولو الـ environment variables مش متحددة، البناء بتاع release هيقع بـ [[Keystore file not set for signing config release]]، ولو الباسورد غلط بـ [[keystore password was incorrect]]، وده أحسن من إنه يبني بتوقيع غلط. ولاحظ إن [[keytool]] الحديث بيعمل keystore نوعه PKCS12، فمش هيسألك على باسورد للمفتاح: [[KEY_PASSWORD]] هو نفس [[KEYSTORE_PASSWORD]].`,
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
          teach: R`## الأوامر بتعمل إيه؟

٦ سطور هي رحلة التطبيق من الكود لإيد اليوزر: نسخة debug للتجربة، وفحص lint، و AAB للرفع على Play، و APK release، وتسطيبه على موبايل.

### اتجرّب فين؟

- الأوامر من [[./gradlew assembleDebug]] لحد [[./gradlew assembleRelease]] اتشغلت على مشروع Android حقيقي (AGP 9.4.1 و Gradle 9.8.1 و Java 21) جوه image فيها Android SDK 36، والـ release متوقّع بـ keystore تجربة (الدرس اللي فات) و R8 شغال. والملفات اتفحصت بـ [[unzip]] و [[aapt2]] و [[apksigner]] و [[jarsigner]].
- [[adb install]] محتاج موبايل أو emulator، ومفيش هنا: من الـ docs.
- على ويندوز الـ wrapper اسمه [[gradlew.bat]]، وفي PowerShell بتكتب [[.\gradlew.bat assembleDebug]] (من الـ docs)، وباقي الأوامر نفسها.

---

## ١. [[./gradlew assembleDebug]]

~~~bash
./gradlew assembleDebug
~~~

- [[./gradlew]]: الـ Gradle Wrapper: script في فولدر المشروع بينزّل نسخة Gradle المكتوبة في [[gradle/wrapper/gradle-wrapper.properties]] ويشغّلها، فكل الناس بتبني بنفس النسخة. و [[./]] يعني «الملف اللي في الفولدر ده».
- [[assemble]]: ابني الـ APK. و [[Debug]]: الـ build type.

~~~text الناتج
BUILD SUCCESSFUL in 2m 19s
41 actionable tasks: 29 executed, 12 up-to-date
~~~

- [[actionable tasks]]: Gradle قسّم البناء لخطوات (compile، و KSP، و dex، و package...). [[executed]] اتعملت فعلًا، و [[up-to-date]] متغيرش مدخلها من آخر مرة فاتخطت. عشان كده تاني بناء أسرع بكتير.
- الملف: [[app/build/outputs/apk/debug/app-debug.apk]]، حجمه **12,750,406 byte** (حوالي 12 ميجا)، ومتوقّع بمفتاح debug تلقائي.

---

## ٢. [[./gradlew lintRelease]]

~~~bash
./gradlew lintRelease
~~~

[[lint]] بيقرا الكود والـ resources والـ Gradle من غير ما يشغّلهم، وبيدوّر على مشاكل معروفة. على المشروع ده:

~~~text الناتج
Wrote HTML report to file:///w/app/build/reports/lint-results-release.html
Wrote SARIF report to file:///w/app/build/reports/lint-results-release.sarif
BUILD SUCCESSFUL
~~~

ولما فتحت التقرير لقيت warnings بس:

| القاعدة | العدد | معناها |
|---|---|---|
| [[GradleDependency]] | 5 | مكتبة Android ليها نسخة أحدث |
| [[NewerVersionAvailable]] | 4 | نفس الكلام لمكتبات Maven التانية |
| [[OldTargetApi]] | 1 | [[targetSdk = 36]] مش آخر نسخة Android |
| [[MissingApplicationIcon]] | 1 | الـ manifest مفيهوش [[android:icon]] |

الـ warnings مبتوقّفش البناء. عشان أشوف error، ضفت سطر بيستخدم [[NotificationChannel]] (موجود من Android 8، يعني API 26) والـ [[minSdk = 24]]:

~~~text الناتج
Channel.kt:6: Error: Call requires API level 26 (current min is 24): android.app.NotificationChannel() [NewApi]
fun makeChannel() = NotificationChannel("notes", "Notes", NotificationManager.IMPORTANCE_DEFAULT)

> Task :app:lintRelease FAILED
Lint found 1 error, 11 warnings.
> Lint found errors in the project; aborting build.
~~~

- [[NewApi]]: اسم القاعدة. التطبيق كان هيقع على أي موبايل Android 7 بـ [[NoSuchMethodError]] / [[NoClassDefFoundError]]، و lint مسكه قبل الرفع.
- وتحت سطر الكود lint بيحط علامات [[~]] تحت [[NotificationChannel]] بالظبط (شلتها من الصندوق).

---

## ٣. [[./gradlew bundleRelease]] و [[ls]]

~~~bash
./gradlew bundleRelease
ls app/build/outputs/bundle/release/
~~~

[[bundle]] بدل [[assemble]] = اعمل AAB بدل APK. و [[ls]] بيعرض الملفات (في PowerShell كمان [[ls]] شغال، اسم تاني لـ [[Get-ChildItem]]):

~~~text الناتج
app-release.aab    2,253,870 byte
~~~

الـ AAB ملف zip. فتحته بـ [[unzip -l]]، وده اللي جواه (مختصر):

~~~text الناتج
BUNDLE-METADATA/com.android.tools.build.obfuscation/proguard.map   16,570,201
BUNDLE-METADATA/com.android.tools.build.profiles/baseline.prof          4,177
base/dex/classes.dex                                                 1,473,880
base/lib/arm64-v8a/libandroidx.graphics.path.so                         10,096
base/lib/armeabi-v7a/libandroidx.graphics.path.so                        7,252
base/lib/x86/libandroidx.graphics.path.so                                9,284
base/lib/x86_64/libandroidx.graphics.path.so                            10,760
base/manifest/AndroidManifest.xml                                        5,393
base/resources.pb                                                       47,199
META-INF/UPLOAD.SF
META-INF/UPLOAD.RSA
~~~

- [[base/]]: الـ module الأساسي. الكود في [[dex/]]، والـ resources في [[resources.pb]] (صيغة protobuf، Play بيحوّلها).
- [[base/lib/]]: نفس المكتبة لـ ٤ معالجات ([[arm64-v8a]] الموبايلات الحديثة، و [[armeabi-v7a]] القديمة، و [[x86]] و [[x86_64]] للـ emulators). Play بيدّي كل موبايل نسخته بس.
- [[proguard.map]]: الـ mapping بتاع R8 (درس R8) جوه الـ AAB، فـ Play بيستلمه لوحده مع الرفعة ويفك الـ crashes.
- [[META-INF/UPLOAD.SF]] و [[UPLOAD.RSA]]: التوقيع بمفتاح الـ upload (اسم الـ alias). و [[jarsigner -verify]] قال [[jar verified.]].

### ليه الـ AAB أكبر من الـ APK؟

| | الحجم |
|---|---|
| [[app-release.aab]] | 2,253,870 byte |
| [[app-release.apk]] | 992,154 byte |

السبب [[proguard.map]]: مضغوط جوه الـ zip حوالي 1.36 ميجا، وده لوحده أكبر من الفرق كله. وده ملف لـ Play بس، مش بيوصل للموبايل. واللي اليوزر بينزّله من Play (split APKs، من الـ docs) فيه مكتبة المعالج بتاعه بس، و resources الشاشة واللغة بتاعته بس، فبيبقى أصغر من الـ APK الكامل. في التطبيق الصغير ده الفرق بسيط (المكتبات كلها حوالي 37 كيلو)، وفي تطبيق فيه مكتبات native تقيلة الفرق بيبقى ميجات.

---

## ٤. [[./gradlew assembleRelease]]

~~~bash
./gradlew assembleRelease
~~~

~~~text الناتج
app/build/outputs/apk/release/app-release.apk    992,154 byte
~~~

- من 12.2 ميجا (debug) لـ 0.95 ميجا: R8 شال الكود اللي محدش بيستخدمه، و [[isShrinkResources]] شال الـ resources.
- الاسم [[app-release.apk]] لأن فيه [[signingConfig]] للـ release. من غيره الملف بيطلع [[app-release-unsigned.apk]] (من الـ docs)، ومش هيتسطّب.

وتأكدت من الـ APK بأدوات الـ SDK:

~~~text الناتج (aapt2 dump badging)
package: name='com.sara.notes' versionCode='12' versionName='1.3.0' ... compileSdkVersion='36'
minSdkVersion:'24'
targetSdkVersion:'36'
~~~

~~~text الناتج (apksigner verify --verbose --print-certs)
Verifies
Verified using v1 scheme (JAR signing): false
Verified using v2 scheme (APK Signature Scheme v2): true
Signer #1 certificate DN: CN=Sara, OU=Dev, O=Sara Apps, L=Cairo, C=EG
~~~

[[v2]] نوع التوقيع اللي بيغطي الملف كله. و [[v1]] (القديم) مش محتاجينه لأن [[minSdk = 24]] (أي موبايل Android 7 وطالع بيفهم v2).

---

## ٥. [[adb install -r]] (من الـ docs)

~~~bash
adb install -r app/build/outputs/apk/release/app-release.apk
~~~

- [[adb]] (Android Debug Bridge): من [[platform-tools]] في الـ SDK، بيكلم الموبايل المتوصّل بـ USB (مع USB debugging) أو الـ emulator.
- [[-r]]: replace، يعني سطّب فوق النسخة الموجودة وخلّي الداتا.
- النجاح بيطبع [[Success]]. ولو النسخة المتسطبة متوقّعة بمفتاح تاني (مثلًا debug): [[INSTALL_FAILED_UPDATE_INCOMPATIBLE]]، والحل [[adb uninstall com.sara.notes]] الأول (الداتا هتتمسح).

---

## الخلاصة

| الأمر | بيطلّع | لمين |
|---|---|---|
| [[assembleDebug]] | [[app-debug.apk]] (12.2 ميجا هنا) | انت، للتجربة |
| [[lintRelease]] | تقرير HTML، ويقع لو فيه error | قبل أي رفعة |
| [[bundleRelease]] | [[app-release.aab]] (2.15 ميجا، فيه الـ mapping وكل المعالجات) | Google Play |
| [[assembleRelease]] | [[app-release.apk]] (0.95 ميجا) | تجربة الـ release، أو توزيع برا Play |
| [[adb install -r]] | تسطيب على الموبايل | انت |

- زوّد [[versionCode]] قبل كل رفعة، وجرّب الـ release نفسه مش الـ debug بس.`,
          lines: [
            "نسخة debug للتجربة.",
            "افحص الكود بقواعد lint على الـ release.",
            "AAB للرفع على Play.",
            R`الملف بيطلع هنا: [[app-release.aab]].`,
            "APK release (للتجربة أو التوزيع برا Play).",
            R`سطّبه على الموبايل فوق النسخة الموجودة ([[-r]]).`
          ],
          sol: R`[[app/build/outputs/bundle/release/app-release.aab]] غالبًا أكبر من الـ release APK: جواه ملف الـ mapping بتاع R8 ([[BUNDLE-METADATA/.../proguard.map]]) عشان Play يفك الـ crashes، ومكتبات كل المعالجات. في مشروع Compose صغير اتجرّب: الـ AAB كان 2.15 ميجا والـ APK 0.95 ميجا، والـ mapping لوحده حوالي 1.36 ميجا مضغوط. بس اللي اليوزر بينزّله من Play بيبقى مخصوص لموبايله. والـ release APK أصغر من الـ debug بشكل واضح بسبب R8 و shrinkResources (في نفس المشروع: 12.2 ميجا debug و 0.95 ميجا release).

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
          teach: R`## الكود بيعمل إيه؟

ده محتوى ملف [[app/proguard-rules.pro]]: ٤ قواعد بتقول لـ R8 «الحاجات دي متلمسهاش». لأن R8 وهو بيبني الـ release بيشيل أي كلاس مش شايف حد بيستخدمه، وبيغيّر أسماء الباقي لحروف قصيرة. والقواعد دي للحاجات اللي بتتنادى **بالاسم** وقت التشغيل، و R8 ميقدرش يشوفها.

### اتجرّب فين؟

- القواعد دي بالحرف في مشروع Android حقيقي namespace بتاعه [[com.sara.notes]] (AGP 9.4.1، و R8 نسخة 9.4.24 حسب أول سطر في الـ mapping)، وفيه كلاس [[com.sara.notes.data.remote.dto.NoteJson]] و [[com.sara.notes.plugins.ExportPlugin]] عشان القواعد يبقى ليها حاجة تمسكها. اتبنى [[./gradlew assembleRelease]] مرة بـ [[isMinifyEnabled = false]] ومرة بـ [[true]] جوه image فيها Android SDK 36.
- قريت [[mapping.txt]] و [[seeds.txt]] و [[usage.txt]] اللي R8 كتبهم، وفكيت stack trace متلخبط بأداة [[retrace]] اللي في الـ SDK.
- Analyze APK في Android Studio وتشغيل الـ crash على موبايل: من الـ docs.

---

## ١. الفرق في الحجم

~~~text الناتج
isMinifyEnabled = false   app-release.apk   9,181,769 byte   (classes.dex + classes2.dex = 24,451,080 byte قبل الضغط)
isMinifyEnabled = true    app-release.apk     992,154 byte   (classes.dex = 1,473,880 byte)
~~~

الكود اتقلّص حوالي ١٦ مرة. أغلبه كان من المكتبات (Compose و Room و Hilt و OkHttp...): التطبيق بيستخدم جزء صغير منها، و R8 شال الباقي.

---

## ٢. القواعد سطر سطر

### [[-keep class com.sara.notes.data.remote.dto.** { *; }]]

~~~text proguard-rules.pro
-keep class com.sara.notes.data.remote.dto.** { *; }
~~~

| الحتة | معناها |
|---|---|
| [[-keep]] | متشيلش ومتغيّرش الاسم |
| [[class]] | القاعدة على كلاسات |
| [[com.sara.notes.data.remote.dto.**]] | أي كلاس في الـ package ده **أو أي package تحته**. ([[*]] واحدة = الـ package ده بس) |
| [[{ *; }]] | وكل الـ members جواه (fields و methods) |

ليه؟ لأن مكتبة زي Gson بتقرا أسماء الـ fields وقت التشغيل وتطابقها مع الـ JSON. والنتيجة في [[mapping.txt]]:

~~~text الناتج (mapping.txt)
com.sara.notes.data.remote.dto.NoteJson -> com.sara.notes.data.remote.dto.NoteJson:
    1:3:long getId():3:3 -> getId
    1:3:java.lang.String getTitle():3:3 -> getTitle
~~~

الشكل [[الاسم الأصلي -> الاسم الجديد]]. هنا الاتنين زي بعض: الكلاس والدوال فضلوا بأسمائهم.

### [[-keepattributes Signature, *Annotation*]]

R8 افتراضيًا بيشيل معلومات زيادة من الـ bytecode:
- [[Signature]]: الـ generics زي [[List<NoteJson>]]. من غيرها المكتبة تشوف [[List]] بس ومتعرفش جواها إيه.
- [[*Annotation*]]: أي attribute اسمه فيه Annotation، يعني الـ annotations زي [[@SerializedName]]. الـ [[*]] هنا wildcard في الاسم.

### [[-keep class com.sara.notes.plugins.ExportPlugin]]

كلاس بيتنادى بـ [[Class.forName("com.sara.notes.plugins.ExportPlugin")]]: الاسم نص، و R8 مش بيعتبره استخدام. من غير [[{ *; }]] هنا: الكلاس نفسه واسمه محفوظين، بس الـ members عادي يتشالوا أو يتغيروا.

~~~text الناتج (mapping.txt)
com.sara.notes.plugins.ExportPlugin -> com.sara.notes.plugins.ExportPlugin:
~~~

### [[-dontwarn org.slf4j.**]]

بعض المكتبات بتشاور على كلاسات من مكتبة تانية اختيارية مش عندك (هنا logging اسمها slf4j). R8 بيوقف البناء بـ warning [[Missing class ...]]، و [[-dontwarn]] بتقوله «عارف، كمّل». في المشروع ده مكانش فيه warning أصلًا، فالقاعدة ملهاش أثر، وده طبيعي.

---

## ٣. R8 عمل إيه في باقي الكلاسات؟

نفس الـ [[mapping.txt]] (حوالي ١٦ ميجا) لكلاسات التطبيق:

~~~text الناتج (mapping.txt، مختصر)
com.sara.notes.di.MainActivity -> com.sara.notes.di.MainActivity:
com.sara.notes.di.NotesApp -> com.sara.notes.di.NotesApp:
com.sara.notes.data.AppDatabase -> com.sara.notes.data.AppDatabase:
com.sara.notes.di.NotesViewModel -> r50:
com.sara.notes.data.NoteDao_Impl -> o50:
com.sara.notes.data.NotesApi -> p50:
com.sara.notes.di.DataModule -> R8$$REMOVED$$CLASS$$303:
~~~

ثلاث أنواع:

| النوع | مثال | ليه |
|---|---|---|
| الاسم فضل | [[MainActivity]] و [[NotesApp]] | مكتوبين في الـ manifest بالاسم، و AGP بيعمل لهم keep لوحده. و [[AppDatabase]] عشان Room بيدوّر على [[AppDatabase_Impl]] بالاسم (قاعدة جاية مع مكتبة Room نفسها: [[-keep class * extends androidx.room.RoomDatabase]]، لقيتها في [[configuration.txt]]) |
| اتغير لحروف | [[NotesViewModel -> r50]] | استخدامه واضح في الكود، فالاسم مش مهم |
| اتشال خالص | [[DataModule]] | Hilt كان بينادي دالته، و R8 حط كودها مكان النداء (inline) فالكلاس نفسه مبقاش ليه لازمة |

و R8 كتب ملفين كمان في [[app/build/outputs/mapping/release/]]:
- [[seeds.txt]]: كل اللي اتعمله keep (فيه [[MainActivity]] و [[NoteJson]] و [[ExportPlugin]]...).
- [[usage.txt]]: كل اللي اتشال. لقيت فيه [[com.sara.notes.PriceCalculator]] وكل كلاسات package [[arch]]: موجودين في الكود بس محدش بيناديهم في التطبيق، فاتشالوا.

---

## ٤. فك الـ crash: [[retrace]]

stack trace من الـ release بيبقى كده (الأسماء من الـ mapping الحقيقي):

~~~text trace.txt
java.lang.IllegalStateException: boom
    at wq.a(SourceFile:10)
    at com.sara.notes.di.MainActivity.i(SourceFile:1)
~~~

[[wq]] و [[a]] و [[i]] ملهمش معنى، و [[SourceFile]] مكان اسم الملف. بالأداة اللي في [[cmdline-tools/latest/bin]]:

~~~bash
retrace app/build/outputs/mapping/release/mapping.txt trace.txt
~~~

~~~text الناتج
java.lang.IllegalStateException: boom
    at com.sara.notes.di.Hilt_MainActivity.inject(Hilt_MainActivity.java:88)
    at com.sara.notes.di.Hilt_MainActivity$1.onContextAvailable(Hilt_MainActivity.java:42)
    at com.sara.notes.di.Hilt_MainActivity.onCreate(Hilt_MainActivity.java:54)
~~~

- [[wq.a]] رجعت [[Hilt_MainActivity$1.onContextAvailable]]، والسطر 10 في الكود المضغوط رجع السطر 42 في الملف الأصلي.
- السطرين بقوا ٣: R8 كان دمج [[inject()]] جوه [[onContextAvailable]] (inline)، والـ mapping فاكر ده فرجّع السطر الناقص.
- الـ mapping مختلف في كل build. لو ضاع، الـ crash ده مش هيتفك. عشان كده Play بياخده جوه الـ AAB لوحده (الدرس اللي فات)، ولازم تحتفظ بيه لأي APK وزّعته برا Play.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[isMinifyEnabled = true]] | شغّل R8 (هنا: 8.8 ميجا ← 0.95 ميجا) |
| [[-keep class X { *; }]] | X وكل اللي جواه زي ما هم |
| [[**]] / [[*]] | أي package تحت / الـ package ده بس |
| [[-keepattributes Signature, *Annotation*]] | حافظ على الـ generics والـ annotations |
| [[-dontwarn]] | متوقفش على كلاس ناقص اختياري |
| [[mapping.txt]] و [[seeds.txt]] و [[usage.txt]] | الأسماء الجديدة، واللي اتحفظ، واللي اتشال |
| [[retrace]] | يرجّع الـ stack trace لأسمائه |

- القواعد بس للي بيتنادى بالاسم (reflection). مكتبات زي Room و Hilt و Retrofit جايبة قواعدها معاها.`,
          lines: [
            R`الـ DTOs دي بتتحوّل بـ Gson (reflection)، فاحتفظ بكل كلاساتها وأسماء الـ fields بتاعتها.`,
            "Gson محتاج معلومات الـ generics والـ annotations وقت التشغيل.",
            R`كلاس بيتنادى بالاسم بـ [[Class.forName]]: متشيلهوش ولا تغيّر اسمه.`,
            "مكتبة بتشاور على كلاس اختياري مش عندنا: متطلّعش تحذير."
          ],
          sol: R`مع R8 الـ APK بيصغر بشكل ملحوظ (في تطبيق Compose صغير فيه Hilt و Room و Retrofit اتجرّب: release من غير R8 كان 8.8 ميجا، ومع R8 و shrinkResources بقى 0.95 ميجا). وفي Analyze APK هتشوف كلاسات اسمها حروف زي [[a]] و [[b]]، وكلاسات تانية بأسماءها الحقيقية: دي اللي عليها keep أو الـ Activities.

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
          teach: R`## الكود بيعمل إيه؟

ده [[defaultConfig]] في [[app/build.gradle.kts]]: الـ ٥ قيم اللي Google Play بيقراها من الـ AAB أول ما ترفعه. هوية التطبيق، وأقدم وأحدث Android بيدعمه، ورقم النسخة. أي رفعة على Play Console بتتقبل أو تترفض بسببهم قبل ما حد يبص على الكود.

### اتجرّب فين؟

- الـ block ده بالحرف في مشروع Android حقيقي (AGP 9.4.1، جوه image فيها Android SDK 36)، واتبنى [[bundleRelease]] و [[assembleRelease]]، وقريت القيم من الـ APK المبني بـ [[aapt2 dump badging]] (أداة في الـ SDK).
- خطوات Play Console نفسها (الحساب، والـ tracks، والمراجعة، والسياسات): من Play Console Help، لأنها محتاجة حساب مدفوع. والسياسات بتتغير، فراجعها هناك وقت الرفع.

---

## ١. القيم واحدة واحدة

~~~kotlin
android {
    defaultConfig {
~~~

[[defaultConfig]]: الإعدادات اللي كل الـ variants بتاخدها، إلا لو flavor أو build type غيّرها (زي [[applicationIdSuffix]] في درس build variants).

~~~kotlin
        applicationId = "com.sara.notes"
~~~

- الـ id الفريد للتطبيق على الموبايل وعلى Play. صفحة التطبيق بتبقى [[play.google.com/store/apps/details?id=com.sara.notes]].
- العرف: domain بالعكس + اسم التطبيق.
- **مبيتغيرش بعد أول رفعة أبدًا**: لو غيّرته، Play يعتبره تطبيق جديد، واليوزرز القدام مش هيوصلهم تحديث. و [[com.example]] Play بيرفضه.
- مختلف عن [[namespace]] (package الكود و [[R]])، وممكن يكونوا زي بعض.

~~~kotlin
        minSdk = 24
~~~

أقدم Android يقدر يسطّب التطبيق: API 24 = Android 7.0. موبايل أقدم مش هيشوف التطبيق على Play أصلًا. وده اللي خلّى lint يمسك [[NotificationChannel]] (API 26) في درس APK و AAB.

~~~kotlin
        targetSdk = 36
~~~

- «أنا اختبرت التطبيق على Android 16 (API 36)». Android بيطبّق سلوك النسخة دي على التطبيق (صلاحيات أشد، edge-to-edge إجباري...). ولو targetSdk قديم، Android بيشغّله بـ compatibility modes.
- Play بيطلب رقم أدنى بيزيد كل سنة. حسب Play Console Help: من 31 أغسطس 2026 التطبيقات الجديدة والتحديثات لازم 36.
- مختلف عن [[compileSdk]] (الـ APIs اللي تقدر تكتبها في الكود).

~~~kotlin
        versionCode = 12
        versionName = "1.3.0"
    }
}
~~~

| | [[versionCode]] | [[versionName]] |
|---|---|---|
| النوع | رقم صحيح ([[Int]]) | نص |
| مين بيشوفه | Android و Play بس | اليوزر في صفحة التطبيق |
| القاعدة | لازم **يزيد** مع كل AAB بيترفع على أي track | أي شكل، والعرف [[major.minor.patch]] |

Play بيرفض AAB ليه نفس [[versionCode]] رفعته قبل كده، حتى لو على internal testing بس.

### القيم في الـ APK المبني

~~~text الناتج (aapt2 dump badging app-release.apk)
package: name='com.sara.notes' versionCode='12' versionName='1.3.0' platformBuildVersionName='16' platformBuildVersionCode='36' compileSdkVersion='36' compileSdkVersionCodename='16'
minSdkVersion:'24'
targetSdkVersion:'36'
uses-permission: name='android.permission.INTERNET'
~~~

- [[package: name]] هو الـ [[applicationId]].
- [[compileSdkVersionCodename='16']]: API 36 = Android 16.
- [[uses-permission]]: الصلاحيات من الـ manifest. Play بيعرضها، ولازم تبقى متسقة مع نموذج Data safety.

---

## ٢. خطوات Play Console (من Play Console Help)

| الخطوة | فيها إيه | أشهر غلطة |
|---|---|---|
| ١. الحساب | 25 دولار مرة واحدة، وتحقق هوية. personal أو organization (D-U-N-S) | |
| ٢. Create app | الاسم، واللغة، ومجاني ولا مدفوع | المجاني ميرجعش مدفوع |
| ٣. Store listing | وصف، وأيقونة 512×512، و feature graphic 1024×500، و screenshots | |
| ٤. App content | privacy policy، و Data safety، و content rating، والجمهور، والإعلانات | Data safety مش مطابق للمكتبات |
| ٥. Testing tracks | internal (لحد 100) ← closed ← open | |
| ٦. Production | رفع AAB، و release notes، ومراجعة، و staged rollout | |

### الـ tracks

| الـ track | مين يشوفه | ليه |
|---|---|---|
| Internal testing | لحد 100 tester بالإيميل | تجربة سريعة، بيوصل في دقايق |
| Closed testing | قايمة إيميلات أو Google Group | جماعة محددة |
| Open testing | أي حد من صفحة التطبيق | beta عامة |
| Production | الكل، وممكن بنسبة (staged rollout) | النشر الحقيقي |

والحساب الشخصي الجديد (من بعد نوفمبر 2023) مش هيقدر يطلب production قبل closed test فيه **12 tester** مشتركين **14 يوم متواصلين**.

### بعد أول رفعة

- **Play App Signing** بيتفعّل لوحده: الـ AAB متوقّع بالـ upload key بتاعك (اللي [[apksigner]] وراك فيه [[CN=Sara]] في درس build variants)، و Google بتوقّع الـ APKs النهائية بمفتاح تاني عندها. فالـ SHA-1 و SHA-256 اللي محتاجهم لـ Google Sign-In أو Firebase تاخدهم من Play Console (App integrity)، مش من الـ keystore بتاعك.
- **Pre-launch report**: Play بيشغّل التطبيق على موبايلات حقيقية ويطلّع crashes.
- **Android vitals**: نسبة الـ crashes والـ ANRs عند اليوزرز، والـ stack traces متفكوكة بالـ mapping اللي جه مع الـ AAB.

---

## الخلاصة

| القيمة | قاعدتها |
|---|---|
| [[applicationId]] | هوية التطبيق للأبد، مش [[com.example]] |
| [[minSdk]] | أقدم Android (24 = Android 7) |
| [[targetSdk]] | الرقم اللي Play بيطلبه وقت الرفع (36 = Android 16) |
| [[versionCode]] | يزيد مع **كل** AAB |
| [[versionName]] | اللي اليوزر بيشوفه |

- ابدأ internal testing بدري، وخطط لـ 14 يوم closed test لو حسابك شخصي جديد.`,
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
