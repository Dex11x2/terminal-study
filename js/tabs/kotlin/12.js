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
    }
]);
