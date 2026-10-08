// تكملة تاب kotlin: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/kotlin/01.js (شرح حقول الدرس في أوله)
MORE("kotlin", [
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
    }
]);
