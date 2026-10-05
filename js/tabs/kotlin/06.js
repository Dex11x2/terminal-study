// تكملة تاب kotlin: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/kotlin/01.js (شرح حقول الدرس في أوله)
MORE("kotlin", [
    {
      t: "الصورة الكبيرة والشغل",
      l: 3,
      n: "Kotlin Multiplatform بصراحة، وأسئلة الانترفيو وسوق الشغل، ومشروع كامل من الأول للآخر",
      items: [
        {
          cmd: "Kotlin Multiplatform",
          title: "Kotlin Multiplatform: تشارك كود بين Android و iOS، وإمتى يستاهل؟",
          desc: R`[[Kotlin Multiplatform]] (KMP) بيخليك تكتب كود Kotlin واحد يشتغل على Android و iOS والـ desktop والويب. المشروع بيتقسم لـ source sets:
• [[commonMain]]: كود مشترك (Kotlin عادي ومكتبات multiplatform).
• [[androidMain]] و [[iosMain]]: الحاجات الخاصة بكل منصة.

ولما الكود المشترك محتاج حاجة من المنصة، بتستخدم [[expect]] و [[actual]]: في [[commonMain]] بتكتب [[expect fun platformName(): String]] (وعد إن الدالة موجودة)، وكل منصة بتكتب [[actual fun]] بالتنفيذ بتاعها.

فيه طريقتين:
• تشارك الـ logic بس (الـ repositories والشبكة والداتابيز والـ ViewModels)، وكل منصة الـ UI بتاعها native: Compose على Android و SwiftUI على iOS.
• تشارك الـ UI كمان بـ [[Compose Multiplatform]] (من JetBrains): نفس كود Compose بيرسم على iOS.

الوضع الحالي: KMP بقى stable من نوفمبر 2023، و Google أعلنت دعمها الرسمي لمشاركة الـ business logic بيه في 2024، و Compose Multiplatform لـ iOS بقى stable في مايو 2025. ومكتبات كتير بقت multiplatform: [[Ktor]] للشبكة، و [[kotlinx.serialization]] و [[kotlinx.coroutines]]، و Room و DataStore و ViewModel من Jetpack، و [[SQLDelight]] و [[Koin]].

والصراحة: بناء وتشغيل iOS محتاج Mac و Xcode. والـ interop مع Swift لسه ليه حدود (الكود بيوصل لـ Swift عن طريق Objective-C، و Swift export لسه بيتطور)، ومكتبات الـ UI والـ tooling لـ iOS أقل من Flutter أو React Native. وفريق iOS لازم يبقى مقتنع، لأنه هيتعامل مع framework مكتوب Kotlin.`,
          example: R`// commonMain/kotlin/Greeting.kt
expect fun platformName(): String
class Greeting {
    fun greet(): String = "أهلًا من $__{platformName()}"
}
// androidMain/kotlin/Platform.android.kt
actual fun platformName(): String = "Android $__{Build.VERSION.SDK_INT}"
// iosMain/kotlin/Platform.ios.kt
actual fun platformName(): String =
    UIDevice.currentDevice.systemName() + " " + UIDevice.currentDevice.systemVersion`,
          try: R`(محتاج Mac للـ iOS) افتح [[kmp.jetbrains.com]] (الـ wizard الرسمي)، واعمل مشروع Android و iOS بـ «Share UI»، وافتحه في Android Studio بـ plugin الـ Kotlin Multiplatform. شغّل نسخة Android، وغيّر النص في [[commonMain]]. ومن غير Mac: اعمل مشروع Android و Desktop وشغّل الاتنين.`,
          flag: "script",
          deep: {
            why: R`الشركات بتدوّر على طريقة تكتب المنطق مرة بدل مرتين، من غير ما تتنازل عن الـ native. و KMP ميزته إنه بيبدأ صغير: تقدر تحط module مشترك واحد (مثلًا الـ networking) في تطبيقين موجودين من غير ما تعيد كتابة حاجة. وكمطور Android، معرفتك بـ Kotlin و Compose هي نفسها اللي محتاجها.`,
            how: R`الكود المشترك بيتترجم لكل منصة بطريقتها: لـ JVM bytecode على Android، و لـ native binary بـ LLVM على iOS (Kotlin/Native)، وبيطلع على iOS كـ framework بتستورده في Xcode.

في [[commonMain]] مينفعش تستخدم أي حاجة Java أو Android (java.io.File أو Context): الـ Kotlin standard library والمكتبات الـ multiplatform بس. وده أكبر تغيير في طريقة التفكير.

[[expect]] و [[actual]] للحاجات الصغيرة. ولحاجات أكبر، الأسلوب الأنضف interface في commonMain وتنفيذ لكل منصة يتحقن بـ DI (Koin مثلًا).

و Compose Multiplatform بيرسم بنفسه على iOS (بـ Skia)، يعني الشكل مش UIKit native، زي Flutter. وفيه طرق تحط SwiftUI جوه Compose أو العكس.

والشغل بيبقى في Android Studio أو IntelliJ IDEA مع plugin الـ Kotlin Multiplatform من JetBrains.`,
            when: R`تطبيق موجود على المنصتين والفريقين بيكتبوا نفس المنطق مرتين، أو فريق Android قوي وعايز يدخل iOS. ومش الاختيار الأنسب لو الفريق كله web (React Native أنسب)، أو محتاج أكبر مكتبة UI جاهزة وأسرع بداية (Flutter).`,
            mistakes: R`تبدأ KMP في أول تطبيق ليك قبل ما تتقن Android نفسه. وتحاول تشارك كل حاجة بما فيها الحاجات اللي native بطبيعتها (الكاميرا، والإشعارات، والـ widgets). وتتجاهل رأي مطوري iOS في الفريق. وتستخدم مكتبة Android-only (زي Retrofit) في commonMain.`
          },
          lines: [
            R`[[expect]]: وعد إن كل منصة هتدي الدالة دي.`,
            "كلاس مشترك.",
            "بيستخدم الدالة من غير ما يعرف هي منين.",
            "قفلة.",
            R`[[actual]] على Android بـ API بتاع Android.`,
            R`[[actual]] على iOS: بيستخدم UIKit من Kotlin مباشرة...`,
            "...اسم النظام ونسخته."
          ],
          sol: R`نسخة Android هتعرض «أهلًا من Android 36» (أو رقم الـ API بتاع الـ emulator)، و iOS «أهلًا من iOS 26.0» مثلًا. ولما تغيّر النص في [[commonMain]]، الاتنين بيتغيروا.

وهيكل المشروع: [[composeApp/src/commonMain]] و [[androidMain]] و [[iosMain]]، وفولدر [[iosApp]] فيه مشروع Xcode صغير بيستورد الـ framework. و [[./gradlew :composeApp:assembleDebug]] بيبني Android عادي.`
        },
        {
          cmd: "الانترفيو",
          title: "أسئلة انترفيو Kotlin و Android المشهورة، وتجهّز نفسك لسوق الشغل إزاي؟",
          desc: R`الوظايف بتتكتب بأسماء زي Android Developer و Mobile Engineer (Android). المطلوب غالبًا:
• Kotlin كويس: null safety، والـ collections، و data و sealed classes، والـ lambdas، والـ coroutines و Flow.
• Android: الـ lifecycle، والـ ViewModel، و Compose (state و recomposition و side effects)، والتنقل، و Room، و Retrofit.
• المعمارية: MVVM أو MVI، والـ repository، و Hilt، والـ unidirectional data flow.
• الاختبارات و Git، وكتير من الشركات لسه فيها Java و XML.

أسئلة بتتكرر:
١. [[val]] و [[var]] و [[const val]]؟ و [[lateinit]] و [[lazy]]؟
٢. [[==]] و [[===]]؟ (المثال تحت)
٣. [[List]] و [[MutableList]]؟ وهل [[List]] immutable فعلًا؟ (لأ، read-only. المثال تحت)
٤. data class بتولّد إيه؟ و sealed class ليه؟
٥. scope functions الفرق بينهم؟
٦. coroutines: [[launch]] و [[async]]؟ و Dispatchers؟ و structured concurrency؟ وإيه اللي بيحصل لو coroutine ابن رمى exception؟
٧. Flow و StateFlow و SharedFlow؟ و cold و hot؟
٨. ViewModel بيعيش بعد الـ rotation إزاي؟ وبعد process death؟
٩. recomposition يعني إيه؟ و [[remember]] و [[rememberSaveable]]؟ و [[LaunchedEffect]]؟
١٠. الـ memory leaks في Android: أمثلة وإزاي تلاقيها؟

والـ portfolio أهم من الشهادات: ٢-٣ تطبيقات على GitHub بـ README فيه screenshots وشرح المعمارية، وواحد منهم على الأقل فيه API حقيقي و Room واختبارات. ولو تقدر، واحد منشور على Play (حتى لو تطبيق صغير)، أو على الأقل release APK في GitHub Releases.`,
          example: R`data class User(val name: String)
fun main() {
    val a = User("Sara")
    val b = User("Sara")
    println(a == b)
    println(a === b)
    val list = mutableListOf(1, 2)
    val readOnly: List<Int> = list
    list.add(3)
    println(readOnly)
    val answer by lazy {
        println("بيتحسب دلوقتي")
        42
    }
    println("قبل")
    println(answer)
    println(answer)
    val first = listOf(1, 2, 3).asSequence().map { println("map $it"); it * 2 }.first()
    println(first)
}`,
          try: R`قبل ما تشغّل المثال، اكتب على ورقة الناتج اللي متوقعه سطر سطر، وبعدين شغّله وقارن. وبعدين جاوب بصوت عالي (أو سجّل نفسك) على ٣ أسئلة من اللي فوق في دقيقتين لكل سؤال، بمثال من كود كتبته.`,
          flag: "script",
          deep: {
            why: R`الانترفيو مش بيختبر الحفظ، بيختبر إنك فاهم ليه. كل سؤال من اللي فوق ليه درس في التاب ده. واللي بيفرّق المتقدمين: إنك تقول «في المشروع الفلاني عملت كذا عشان كذا» مش تعريف من كتاب.`,
            how: R`أسئلة الـ output (زي المثال) بتختبر فهمك للتفاصيل:
• [[==]] بتنادي equals (data class بتقارن القيم)، و [[===]] نفس الـ object.
• [[readOnly]] مجرد «نظرة» read-only على نفس الـ list، فلما الأصل اتغير، اتغيرت.
• [[lazy]] بيحسب أول مرة بس، وبعدها بيرجّع نفس القيمة (و thread-safe افتراضيًا).
• الـ sequence lazy: [[first()]] بتطلب عنصر واحد، فـ map بتتنفذ مرة واحدة بس، مش ٣.

وأسئلة الـ system design للموبايل (في المستويات الأعلى): «صمم تطبيق شات» أو «feed فيه صور بيشتغل offline». المطلوب تتكلم عن: الطبقات، و Room كـ single source of truth، والـ pagination ([[Paging 3]])، والـ caching للصور، والـ sync في الخلفية ([[WorkManager]])، والتعامل مع النت الضعيف.

وفيه غالبًا task عملي (take-home): تطبيق صغير بيجيب داتا من API ويعرضها. المهم فيه: معمارية نضيفة، وحالات loading و error و empty، واختبارات للـ ViewModel، و README بيشرح قراراتك.`,
            when: "قبل أي انترفيو بأسبوع: راجع الأسئلة دي، وافتح مشاريعك وافتكر ليه عملت كل قرار.",
            mistakes: R`تحفظ تعريفات من غير ما تقدر تكتب مثال. وتقول «عمري ما استخدمت Java» في شركة الكود بتاعها نصه Java. و portfolio فيه ١٠ تطبيقات من tutorials شبه بعض بدل ٢ حقيقيين. وتتجاهل أسئلة الـ lifecycle وتفتكرها قديمة: لسه بتتسأل في كل مكان.`
          },
          lines: [
            "data class.",
            R`بداية [[main]].`,
            "object.",
            "object تاني بنفس القيمة.",
            R`[[==]] بتقارن القيم: true.`,
            R`[[===]] نفس الـ object؟ false.`,
            "MutableList.",
            "نفس الـ list بنوع read-only.",
            "نعدّل الأصل.",
            "[1, 2, 3]: الـ read-only اتغيرت هي كمان.",
            R`[[lazy]]: مش هيتحسب دلوقتي.`,
            "هيطبع أول مرة نستخدمه بس.",
            "القيمة.",
            "قفلة.",
            "قبل.",
            "أول استخدام: بيتحسب ويطبع، وبعدين 42.",
            "تاني مرة: 42 على طول من غير حساب.",
            R`sequence: map بتتنفذ على أول عنصر بس عشان [[first()]].`,
            "2.",
            R`قفلة [[main]].`
          ],
          sol: R`الناتج:
[[true]]
[[false]]
[[[1, 2, 3]]]
[[قبل]]
[[بيتحسب دلوقتي]]
[[42]]
[[42]]
[[map 1]]
[[2]]

لو كتبت [[map 1]] و [[map 2]] و [[map 3]]، ده الفرق بين List و Sequence: مع [[listOf(1, 2, 3).map { ... }.first()]] (من غير asSequence) الـ map بتتنفذ على التلاتة الأول.`,
          solCode: R`fun main() {
    // من غير asSequence: الـ map بتتنفذ على كل العناصر الأول
    val first = listOf(1, 2, 3).map { println("map $it"); it * 2 }.first()
    println(first)
}`
        },
        {
          cmd: "مشروع كامل: تطبيق ملاحظات",
          title: "مشروع كامل من الأول للآخر: تطبيق ملاحظات بـ Compose و Room و Hilt واختبارات ونشر",
          desc: R`ده المشروع اللي يجمع التاب كله. اعمله بنفسك من الصفر، خطوة خطوة، وكل خطوة commit:

١. المشروع: Empty Activity، و package حقيقي ([[com.yourname.notes]])، و Git من أول يوم.

٢. Data layer:
• [[NoteEntity]] و [[NoteDao]] (observeAll و insert و update و delete) و [[AppDatabase]] (درس Room).
• [[NotesRepository]] بيعرض [[Flow<List<NoteEntity>>]] ودوال suspend.

٣. DI: Hilt بـ [[DataModule]] للداتابيز والـ DAO، و [[@Inject constructor]] للـ repository (درس Hilt).

٤. UI layer:
• [[NotesViewModel]] بـ [[@HiltViewModel]]: [[notes]] كـ StateFlow بـ stateIn، و [[onAdd]] و [[onToggle]] و [[onDelete]].
• [[NotesScreen]] stateless: بياخد الـ notes والـ lambdas. TextField وزرار، و LazyColumn بـ key، وكل عنصر فيه checkbox وزرار مسح.
• حالة فاضية: «لسه مفيش ملاحظات».
• Material 3 و dark mode، والنصوص في [[strings.xml]] بالعربي والإنجليزي.

٥. اختبارات:
• unit test للـ ViewModel بـ fake repository و MainDispatcherRule: عنوان فاضي مبيتضافش، و toggle بيقلب done.
• Compose UI test للـ NotesScreen: الإضافة بتنادي onAdd، والحالة الفاضية بتظهر.

٦. Release: build type release بـ R8، وتوقيع بـ keystore من environment variables، و [[bundleRelease]]، وتجربة الـ release على موبايل.

٧. النشر: internal testing على Play (لو عندك حساب)، أو GitHub Release فيه APK. و README فيه screenshots، والمعمارية في رسمة، وإزاي تشغّله.

وبعدها زوّد حاجة واحدة كل مرة: بحث، أو sync مع API (Retrofit + repository بيكتب في Room)، أو تذكير بإشعار (WorkManager و POST_NOTIFICATIONS)، أو DataStore للثيم.`,
          example: R`@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            NotesTheme {
                val vm: NotesViewModel = hiltViewModel()
                val notes by vm.notes.collectAsStateWithLifecycle()
                NotesScreen(notes = notes, onAdd = vm::onAdd, onToggle = vm::onToggle, onDelete = vm::onDelete)
            }
        }
    }
}
@Composable
fun NotesScreen(
    notes: List<NoteEntity>,
    onAdd: (String) -> Unit,
    onToggle: (NoteEntity) -> Unit,
    onDelete: (NoteEntity) -> Unit
) {
    var text by rememberSaveable { mutableStateOf("") }
    Scaffold { padding ->
        Column(Modifier.padding(padding).padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                OutlinedTextField(value = text, onValueChange = { text = it }, modifier = Modifier.weight(1f))
                Button(onClick = { onAdd(text); text = "" }) { Text(stringResource(R.string.add)) }
            }
            if (notes.isEmpty()) {
                Text(stringResource(R.string.empty_notes), Modifier.padding(top = 24.dp))
            }
            LazyColumn {
                items(notes, key = { it.id }) { note ->
                    ListItem(
                        headlineContent = { Text(note.title) },
                        leadingContent = { Checkbox(checked = note.done, onCheckedChange = { onToggle(note) }) },
                        trailingContent = { TextButton(onClick = { onDelete(note) }) { Text(stringResource(R.string.delete)) } }
                    )
                }
            }
        }
    }
}`,
          try: R`ابني المشروع بالخطوات اللي فوق، وحط لنفسك «تعريف خلصت»: التطبيق شغال بعد ما تقفله وتفتحه، وبعد الـ rotation، وفي الـ dark mode، وبالعربي والإنجليزي، و [[./gradlew test]] و [[./gradlew connectedAndroidTest]] ناجحين، والـ release build متجرّب على موبايل. وبعدين اطلب من حد يعمل review للـ repo.`,
          flag: "script",
          deep: {
            why: R`مفيش حاجة بتثبّت التعلم زي مشروع كامل بإيدك من غير tutorial: هتقابل مشاكل الدروس مبتغطيهاش (أخطاء Gradle، و KSP، و Hilt graph، و R8)، وحلها هو اللي بيعلّمك. وده بالظبط المشروع اللي تحطه في الـ CV وتتكلم عنه في الانترفيو.`,
            how: R`لاحظ في الكود: الـ Activity مش فيها منطق، بتوصّل الـ ViewModel بالشاشة بس. و [[NotesScreen]] مبتعرفش حاجة عن Hilt ولا Room ولا الـ ViewModel، بتاخد List و lambdas، فتقدر تعملها Preview واختبار UI بداتا وهمية.

[[vm::onAdd]]: function references (درس lambdas) بدل [[{ vm.onAdd(it) }]].

[[onClick = { onAdd(text); text = "" }]]: بلّغ الـ ViewModel وفضّي الحقل. والـ ViewModel هو اللي بيتحقق إن النص مش فاضي (المنطق مكانه هناك عشان يتختبر).

[[ListItem]] من Material 3: سطر جاهز فيه مكان للعنوان والأيقونة اللي قبل واللي بعد.

ولما تضيف sync مع API: الـ repository بيكتب في Room، والشاشة مبتتغيرش خالص (single source of truth). ده اختبار حقيقي إن المعمارية صح.

وللـ CI: GitHub Actions بيشغّل [[./gradlew test lint]] مع كل push (فيه تاب GitHub Actions في الموقع).`,
            when: "بعد ما تخلص المستوى ٢ وأغلب المستوى ٣. ومتستناش لحد ما تحس إنك فاهم كل حاجة: المشروع نفسه هو اللي هيفهّمك.",
            mistakes: R`تنسخ مشروع جاهز وتغيّر الاسم. وتضيف كل المكتبات والمزايا مرة واحدة فتغرق في أخطاء البناء: زوّد حاجة حاجة وكل واحدة commit. وتسيب الاختبارات للآخر فمتتكتبش. و README فاضي: اللي بيراجع الـ CV غالبًا هيقرا الـ README ومش هيشغّل الكود.`
          },
          lines: [
            R`[[@AndroidEntryPoint]]: الـ Activity بتاخد من Hilt.`,
            "الـ Activity الوحيدة.",
            "onCreate.",
            "الأب.",
            "edge-to-edge.",
            "الـ UI.",
            "الثيم.",
            "الـ ViewModel من Hilt.",
            "الـ state.",
            "الشاشة بالداتا والأحداث كـ function references.",
            "قفلة الثيم.",
            "قفلة setContent.",
            "قفلة onCreate.",
            "قفلة الـ Activity.",
            R`[[@Composable]].`,
            "شاشة stateless:",
            "الداتا،",
            "إضافة،",
            "تعليم كمخلّص،",
            "ومسح.",
            "قفلة الـ parameters.",
            "نص الحقل: state محلي في الـ UI بس.",
            R`[[Scaffold]].`,
            "عمود بمسافة الـ system bars ومسافتنا.",
            "سطر الإضافة.",
            "الحقل واخد المساحة الفاضية.",
            "الزرار: بلّغ وفضّي، والنص من strings.xml.",
            "قفلة Row.",
            "لو فاضية...",
            "...رسالة.",
            "قفلة if.",
            "اللستة.",
            "عنصر لكل ملاحظة بالـ id.",
            R`[[ListItem]] جاهز.`,
            "العنوان.",
            "checkbox على أول السطر.",
            "زرار مسح على آخره.",
            "قفلة ListItem.",
            "قفلة items.",
            "قفلة LazyColumn.",
            "قفلة Column.",
            "قفلة Scaffold.",
            "قفلة."
          ],
          sol: R`لما تخلص هيبقى عندك repo فيه:
• [[data/]]: NoteEntity و NoteDao و AppDatabase و NotesRepository.
• [[di/]]: DataModule.
• [[ui/notes/]]: NotesViewModel و NotesScreen، و [[ui/theme/]].
• [[src/test/]]: NotesViewModelTest و FakeNotesRepository و MainDispatcherRule.
• [[src/androidTest/]]: NotesScreenTest.
• README فيه screenshots فاتح وغامق، وسطر بيشرح المعمارية، وأوامر التشغيل والاختبار.

ولو وقفت عند خطوة: ارجع لدرسها في التاب ده، واقرا رسالة الغلط كاملة (خصوصًا [[Caused by]])، ودوّر بالرسالة نفسها. وده جزء من التدريب مش عطلة عنه.`,
          solCode: R`@HiltViewModel
class NotesViewModel @Inject constructor(private val repo: NotesRepository) : ViewModel() {
    val notes: StateFlow<List<NoteEntity>> = repo.notes
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    fun onAdd(title: String) {
        if (title.isBlank()) return
        viewModelScope.launch { repo.add(title.trim()) }
    }

    fun onToggle(note: NoteEntity) {
        viewModelScope.launch { repo.update(note.copy(done = !note.done)) }
    }

    fun onDelete(note: NoteEntity) {
        viewModelScope.launch { repo.delete(note) }
    }
}`
        }
      ]
    }
]);
