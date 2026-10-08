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

في [[commonMain]] مينفعش تستخدم أي حاجة Android (زي Context)، ولا Java (زي java.io.File) طالما فيه target مش JVM زي iOS: الـ Kotlin standard library والمكتبات الـ multiplatform بس. وده أكبر تغيير في طريقة التفكير.

[[expect]] و [[actual]] للحاجات الصغيرة. ولحاجات أكبر، الأسلوب الأنضف interface في commonMain وتنفيذ لكل منصة يتحقن بـ DI (Koin مثلًا).

و Compose Multiplatform بيرسم بنفسه على iOS (بـ Skia)، يعني الشكل مش UIKit native، زي Flutter. وفيه طرق تحط SwiftUI جوه Compose أو العكس.

والشغل بيبقى في Android Studio أو IntelliJ IDEA مع plugin الـ Kotlin Multiplatform من JetBrains.`,
            when: R`تطبيق موجود على المنصتين والفريقين بيكتبوا نفس المنطق مرتين، أو فريق Android قوي وعايز يدخل iOS. ومش الاختيار الأنسب لو الفريق كله web (React Native أنسب)، أو محتاج أكبر مكتبة UI جاهزة وأسرع بداية (Flutter).`,
            mistakes: R`تبدأ KMP في أول تطبيق ليك قبل ما تتقن Android نفسه. وتحاول تشارك كل حاجة بما فيها الحاجات اللي native بطبيعتها (الكاميرا، والإشعارات، والـ widgets). وتتجاهل رأي مطوري iOS في الفريق. وتستخدم مكتبة Android-only (زي Retrofit) في commonMain.`
          },
          teach: R`## الكود ده بيعمل إيه؟

المثال ٣ ملفات في ٣ فولدرات (اسمهم **source sets**). الملف الأول في الكود المشترك بيقول «فيه دالة اسمها [[platformName]] وكل منصة هتديني نسختها»، والملفين التانيين هم النسختين: واحدة لـ Android وواحدة لـ iOS. والكلاس [[Greeting]] بيستخدم الدالة من غير ما يعرف هو شغال على أنهي منصة.

> فين اتجرّب: (١) الكود المشترك وملف Android زي ما هم (ومعاهم [[import android.os.Build]] اللي المثال شايله) اتبنوا في مشروع Kotlin Multiplatform حقيقي بـ Gradle (Kotlin 2.4.20 و AGP 9.4.1 و [[compileSdk 36]]) جوه image فيها Android SDK، و [[./gradlew assemble]] طلّع [[shared.aar]] لـ Android. (٢) الكود المشترك اتشغّل فعلًا بـ [[kotlinc]] 2.4.20 جوه [[docker run --rm eclipse-temurin:21-jdk]] مع [[actual]] للـ JVM. أما ملف iOS فمحتاج Mac و Xcode (Kotlin/Native مبيبنيش لـ iOS غير على macOS)، فهو من الـ docs بتاعة Kotlin.

---

## ١. شكل المشروع: الـ source sets

الـ wizard الرسمي ([[kmp.jetbrains.com]]) بيعمل module اسمه [[composeApp]]، وجواه:

~~~text هيكل المشروع (مختصر، من الـ docs)
composeApp/src/
├── commonMain/kotlin/    الكود المشترك: بيتبني لكل المنصات
├── androidMain/kotlin/   Android بس: يقدر يستخدم android.* و androidx.*
└── iosMain/kotlin/       iOS بس: يقدر يستخدم UIKit و Foundation
iosApp/                   مشروع Xcode صغير بيستورد الكود المشترك كـ framework
~~~

- **source set** = فولدر كود ليه dependencies وقواعد خاصة بيه. اسمه [[<المنصة>Main]] للكود و [[<المنصة>Test]] للاختبارات.
- كل منصة بتتبني من [[commonMain]] **+** الـ source set بتاعها. يعني نسخة Android = commonMain + androidMain، ونسخة iOS = commonMain + iosMain.
- السطر اللي فوق كل ملف في المثال ([[// commonMain/kotlin/Greeting.kt]]) تعليق بيقولك الملف ده مكانه فين بالظبط.

---

## ٢. الكود المشترك: [[expect]]

~~~kotlin
// commonMain/kotlin/Greeting.kt
expect fun platformName(): String
class Greeting {
    fun greet(): String = "أهلًا من $__{platformName()}"
}
~~~

| الحتة | معناها |
|---|---|
| [[expect]] | «وعد»: الدالة دي موجودة، بس الـ body بتاعها هييجي من كل منصة. عشان كده مفيش [[{ }]] ولا [[=]] بعدها |
| [[fun platformName(): String]] | دالة مبتاخدش حاجة وبترجّع نص. الـ signature ده لازم يتكرر بالظبط في كل [[actual]] |
| [[class Greeting]] | كلاس عادي في الكود المشترك |
| [[fun greet(): String = ...]] | دالة بـ expression body (درس الدوال): [[=]] بدل [[{ return ... }]] |
| [[$__{platformName()}]] | string template (درس string templates): نفّذ الدالة وحط نتيجتها جوه النص |

[[Greeting]] مش عارف ولا عايز يعرف هو على أنهي منصة. هو بينادي [[platformName()]] وخلاص، والـ compiler بيوصّل النداء بالـ [[actual]] الصح وقت بناء كل منصة.

---

## ٣. نسخة Android: [[actual]]

~~~kotlin
// androidMain/kotlin/Platform.android.kt
import android.os.Build

actual fun platformName(): String = "Android $__{Build.VERSION.SDK_INT}"
~~~

- [[actual]]: «ده تنفيذ الوعد». لازم نفس الاسم ونفس الـ parameters ونفس نوع الرجوع ونفس الـ package.
- [[Build.VERSION.SDK_INT]]: رقم الـ API level بتاع الموبايل اللي شغال عليه (Int). Android 16 = [[36]]، و Android 15 = [[35]]. ده كلاس Android، فينفع هنا في [[androidMain]] بس.
- [[import android.os.Build]]: المثال شاله عشان يقصر. من غيره [[Build]] بتبقى Unresolved reference.
- اسم الملف [[Platform.android.kt]]: عرف من الـ wizard عشان تعرف الملف لأنهي منصة من اسمه، مش شرط.

### اتبنى إزاي هنا

مشروع Gradle صغير فيه [[commonMain]] و [[androidMain]] و [[jvmMain]] (بدل iOS). ده ملف [[build.gradle.kts]] بتاعه:

~~~kotlin
plugins {
    kotlin("multiplatform") version "2.4.20"
    id("com.android.kotlin.multiplatform.library") version "9.4.1"
}
kotlin {
    jvm()
    android {
        namespace = "com.sara.shared"
        compileSdk = 36
        minSdk = 24
    }
}
~~~

- [[kotlin("multiplatform")]]: الـ plugin اللي بيفهم الـ source sets و [[expect]]/[[actual]].
- [[com.android.kotlin.multiplatform.library]]: plugin Android للـ KMP في AGP 9، وبيضيف [[android { }]] جوه [[kotlin { }]].
- [[jvm()]] و [[android { }]]: الـ **targets**، يعني المنصات اللي هيتبني لها. وفي المشروع الحقيقي هتلاقي كمان [[iosArm64()]] و [[iosSimulatorArm64()]].

~~~text الناتج (مختصر)
> Task :compileAndroidMain
> Task :compileKotlinJvm
> Task :jvmJar
> Task :bundleAndroidMainAar
> Task :assembleAndroidMain
> Task :assemble
BUILD SUCCESSFUL in 38s
~~~

[[compileAndroidMain]] ترجم commonMain + androidMain مع بعض (يعني [[Build.VERSION.SDK_INT]] اتقبل)، و [[bundleAndroidMainAar]] عمل [[build/outputs/aar/shared.aar]]: مكتبة Android يقدر أي تطبيق يضيفها.

---

## ٤. نسخة iOS

~~~kotlin
// iosMain/kotlin/Platform.ios.kt
actual fun platformName(): String =
    UIDevice.currentDevice.systemName() + " " + UIDevice.currentDevice.systemVersion
~~~

- [[UIDevice]]: كلاس من UIKit بتاع Apple (مكتوب Objective-C). Kotlin/Native بيخليك تناديه من Kotlin على طول، بعد [[import platform.UIKit.UIDevice]] (اتشال من المثال).
- [[currentDevice]]: الجهاز الحالي. و [[systemName()]] اسم النظام ([["iOS"]])، و [[systemVersion]] النسخة ([["26.0"]] مثلًا).
- [[+ " " +]]: ربط نصوص. والـ [[=]] في آخر السطر الأول معناها إن الـ expression body مكمّل في السطر اللي بعده.

ده من الـ docs، لأن بناء iOS محتاج Mac: Kotlin/Native بيحتاج Xcode عشان يعمل link لـ iOS.

---

## ٥. الكود المشترك اتشغّل فعلًا (على JVM)

عشان نشوف الفكرة شغالة من غير Mac، عملنا [[actual]] تالت للـ JVM وشغّلنا [[Greeting]]:

~~~kotlin
// jvmMain: نسخة تالتة للتجربة بس
actual fun platformName(): String = "JVM " + System.getProperty("java.version")
fun main() = println(Greeting().greet())
~~~

~~~bash
kotlinc -Xmulti-platform -Xfragments=common,jvm \
  -Xfragment-sources=common:common/Greeting.kt,jvm:jvm/Platform.jvm.kt \
  -Xfragment-refines=jvm:common \
  common/Greeting.kt jvm/Platform.jvm.kt -include-runtime -d g.jar
java -jar g.jar
~~~

~~~text الناتج
أهلًا من JVM 21.0.12.1
~~~

الـ flags دي بتعمل بإيدك اللي Gradle بيعمله لوحده: [[-Xmulti-platform]] شغّل [[expect]]/[[actual]]، و [[-Xfragments]] أسامي الـ source sets، و [[-Xfragment-refines=jvm:common]] «jvm مبني فوق common». في الشغل الحقيقي مش هتكتبها، Gradle بيكتبها.

### لو نسيت [[actual]] لمنصة

شيلنا ملف [[jvmMain]] من مشروع Gradle وبنينا تاني:

~~~text الناتج
e: file:///w/src/commonMain/kotlin/Greeting.kt:1:1 The 'expect' declaration 'platformName' has no 'actual' declaration in module '<commonMain> for JVM'.
BUILD FAILED in 17s
~~~

يعني كل target لازم يدي [[actual]] لكل [[expect]]، والغلط بيظهر وقت البناء مش وقت التشغيل.

---

## ٦. [[commonMain]] شايف إيه؟

جرّبنا سطر [[java.io.File("/tmp").name]] في [[commonMain]]:

| الـ targets | النتيجة |
|---|---|
| [[jvm()]] و [[android]] بس | اتبنى عادي، لأن الاتنين JVM فالـ JDK متاح للكود المشترك |
| زوّدنا target مش JVM ([[js]]) | [[e: .../Bad.kt:1:21 Unresolved reference 'java'.]] |

ونفس الكلام مع iOS: أول ما يبقى فيه target مش JVM، [[commonMain]] مش بيشوف غير الـ Kotlin standard library والمكتبات الـ multiplatform (Ktor و kotlinx.coroutines و kotlinx.serialization...). وحاجات Android زي [[Context]] و [[Build]] مش متاحة في [[commonMain]] أصلًا، مكانها [[androidMain]].

---

## ٧. كل حتة بتتبني لإيه

| الـ source set | بيشوف | بيتبني لـ |
|---|---|---|
| [[commonMain]] | stdlib ومكتبات multiplatform | كل المنصات |
| [[androidMain]] | + [[android.*]] و [[androidx.*]] | JVM bytecode جوه الـ APK |
| [[iosMain]] | + UIKit و Foundation | native binary بـ LLVM، بيطلع framework لـ Xcode |

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[expect fun f(): T]] | وعد في [[commonMain]] من غير body |
| [[actual fun f(): T = ...]] | التنفيذ في كل [[<منصة>Main]]، بنفس الـ signature |
| [[commonMain]] | Kotlin بس، من غير Java ولا Android (طالما فيه iOS) |
| [[actual]] ناقص | البناء يقع: [[has no 'actual' declaration]] |

اللي ميتلخبطش: [[expect]]/[[actual]] للحاجات الصغيرة زي اسم النظام. ولحاجة أكبر (تخزين، إشعارات) الأنضف interface في [[commonMain]] وتنفيذ لكل منصة يتحقن بالـ DI.`,
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
          teach: R`## الكود ده بيعمل إيه؟

ده شكل سؤال «إيه الناتج؟» اللي بيتسأل كتير في انترفيو Kotlin: كود قصير، وكل سطر [[println]] بيختبر فكرة واحدة. ٤ أفكار: المقارنة بـ [[==]] و [[===]]، والـ List اللي «read-only» مش immutable، و [[lazy]]، والـ Sequence. هنمشي عليهم واحدة واحدة.

> فين اتجرّب: المثال والـ solCode اتشغّلوا بـ [[kotlinc]] 2.4.20 جوه [[docker run --rm eclipse-temurin:21-jdk]] (Java 21)، وكل ناتج تحت هو الناتج الحقيقي.

---

## ١. [[==]] و [[===]]

~~~kotlin
data class User(val name: String)
fun main() {
    val a = User("Sara")
    val b = User("Sara")
    println(a == b)
    println(a === b)
~~~

~~~text الناتج
true
false
~~~

- [[data class]]: الـ compiler بيولّد لها [[equals()]] و [[hashCode()]] و [[toString()]] و [[copy()]] من الـ properties اللي في الـ constructor (درس الـ Data Classes).
- [[a]] و [[b]] **object**ين مختلفين في الذاكرة، كل [[User(...)]] بيعمل واحد جديد.
- [[==]]: بتنادي [[equals()]]. والـ [[equals]] بتاعة الـ data class بتقارن [[name]] بـ [[name]]، فالنتيجة [[true]].
- [[===]]: **referential equality**، يعني «هما نفس الـ object بالظبط؟». لأ، فالنتيجة [[false]].

ولو [[User]] كان كلاس عادي (من غير [[data]])، [[==]] كانت هترجّع [[false]] كمان، لأن [[equals]] الافتراضية بتقارن الـ reference. جرّبناها:

~~~kotlin
class Plain(val name: String)
println(Plain("Sara") == Plain("Sara"))
println(User("Sara"))
~~~

~~~text الناتج
false
User(name=Sara)
~~~

---

## ٢. [[List]] مش immutable

~~~kotlin
    val list = mutableListOf(1, 2)
    val readOnly: List<Int> = list
    list.add(3)
    println(readOnly)
~~~

~~~text الناتج
[1, 2, 3]
~~~

- [[mutableListOf(1, 2)]]: list تقدر تزوّد فيها وتمسح.
- [[val readOnly: List<Int> = list]]: **مش نسخة**. ده نفس الـ object، بس شايله بنوع [[List<Int>]] اللي مفيهوش [[add]]. يعني «نظرة» read-only على نفس الداتا.
- [[list.add(3)]]: عدّلنا من الأصل، فـ [[readOnly]] شافت التغيير.

الإجابة اللي الانترفيو مستنيها: [[List]] في Kotlin **read-only** (انت من خلالها مش هتعدّل)، مش **immutable** (محدش يقدر يعدّلها). وعشان نتأكد إن جواها list عادية:

~~~kotlin
println(readOnly is MutableList<*>)
println(readOnly::class.simpleName)
(readOnly as MutableList<Int>).add(99)
println(list)
~~~

~~~text الناتج
true
ArrayList
[1, 2, 99]
~~~

[[is]] بيسأل عن النوع الحقيقي وقت التشغيل، و [[as]] بيحوّل النوع. ولو عايز نسخة محدش يغيّرها، خد نسخة بـ [[list.toList()]].

---

## ٣. [[by lazy]]

~~~kotlin
    val answer by lazy {
        println("بيتحسب دلوقتي")
        42
    }
    println("قبل")
    println(answer)
    println(answer)
~~~

~~~text الناتج
قبل
بيتحسب دلوقتي
42
42
~~~

| الحتة | معناها |
|---|---|
| [[by]] | **delegation**: «القيمة دي اسأل عليها الـ object اللي بعدي» |
| [[lazy { ... }]] | متحسبش دلوقتي. أول مرة حد يقرا [[answer]] نفّذ الـ lambda واحفظ النتيجة |
| [[42]] في آخر الـ lambda | آخر سطر في الـ lambda هو قيمتها (درس lambdas) |

الترتيب بيقول كل حاجة: [[قبل]] اتطبعت **الأول** مع إن الـ [[lazy]] مكتوب فوقها، لأن الحساب استنى لحد أول [[println(answer)]]. وتاني مرة [[42]] طلعت على طول من غير «بيتحسب دلوقتي»، لأن القيمة اتحفظت.

و [[lazy]] افتراضيًا thread-safe (اسمه [[LazyThreadSafetyMode.SYNCHRONIZED]]): لو كذا thread قروا مع بعض، الحساب بيحصل مرة واحدة بس.

---

## ٤. السطر الطويل: Sequence

~~~kotlin
    val first = listOf(1, 2, 3).asSequence().map { println("map $it"); it * 2 }.first()
    println(first)
}
~~~

نفكّه بترتيب التنفيذ:

1. [[listOf(1, 2, 3)]]: list فيها ٣ أرقام.
2. [[.asSequence()]]: حوّلها **Sequence**: كل خطوة بتشتغل على عنصر عنصر، ولما حد يطلب بس.
3. [[.map { println("map $it"); it * 2 }]]: لكل عنصر اطبع [[map]] والعنصر، ورجّع ضعفه. [[it]] اسم العنصر لما الـ lambda ليها parameter واحد، و [[;]] بتفصل أمرين في سطر.
4. [[.first()]]: هات أول عنصر. ده اللي بيشغّل كل حاجة: بيطلب عنصر واحد، فالـ [[map]] بتشتغل على [[1]] بس، وبعدها [[first]] لقت اللي عايزاه ووقفت.

~~~text الناتج
map 1
2
~~~

### الـ solCode: نفس السطر من غير [[asSequence]]

~~~kotlin
fun main() {
    // من غير asSequence: الـ map بتتنفذ على كل العناصر الأول
    val first = listOf(1, 2, 3).map { println("map $it"); it * 2 }.first()
    println(first)
}
~~~

~~~text الناتج
map 1
map 2
map 3
2
~~~

[[map]] على [[List]] عادية **eager**: بتعمل list جديدة كاملة ([[[2, 4, 6]]]) الأول، وبعدين [[first()]] تاخد أولها. فالـ map اشتغلت ٣ مرات والنتيجة واحدة.

| | [[List]] | [[Sequence]] |
|---|---|---|
| إمتى بتشتغل | كل خطوة على كل العناصر، فورًا | عنصر عنصر، لما حد يطلب |
| lists وسيطة | خطوة = list جديدة | مفيش |
| هنا | [[map]] ٣ مرات | [[map]] مرة واحدة |
| أحسن لـ | lists صغيرة (أبسط وغالبًا أسرع) | داتا كبيرة أو سلسلة خطوات بتنتهي بـ [[first]] أو [[take]] |

---

## ٥. أسئلة تانية من القايمة اتجرّبت

السؤال الأول ([[const val]] و [[lateinit]]) في كود صغير:

~~~kotlin
const val MAX = 3
lateinit var token: String
fun main() {
    try { println(token) } catch (e: Exception) { println(e) }
    token = "abc"
    println(token)
    try { (listOf(1, 2) as MutableList<Int>).add(3) } catch (e: Exception) { println(e) }
}
~~~

~~~text الناتج
kotlin.UninitializedPropertyAccessException: lateinit property token has not been initialized
abc
java.lang.UnsupportedOperationException
~~~

- [[const val]]: قيمة معروفة وقت الترجمة (رقم أو نص بس، top-level أو في [[object]])، والـ compiler بيحطها مكان استخدامها على طول. [[val]] العادية بتتحسب وقت التشغيل.
- [[lateinit var]]: «هديها قيمة بعدين» لـ [[var]] من نوع مش nullable. لو قريتها قبل ما تديها قيمة: الـ exception اللي فوق. الفرق عن [[lazy]]: [[lazy]] لـ [[val]] وبتحسب نفسها، [[lateinit]] لـ [[var]] وانت اللي بتديها القيمة.
- [[listOf(1, 2)]] تحتها list مبتقبلش [[add]]، فالـ cast نجح بس الإضافة رمت [[UnsupportedOperationException]]. يعني مش كل [[List]] تقدر تعدّلها بالـ cast، بس برضه النوع مش بيضمنلك إنها immutable.

---

## الخلاصة

| السطر | الناتج | ليه |
|---|---|---|
| [[a == b]] | [[true]] | data class بتقارن القيم |
| [[a === b]] | [[false]] | objectين مختلفين |
| [[println(readOnly)]] | [[[1, 2, 3]]] | نفس الـ list بنوع read-only |
| [[answer]] أول مرة | [[بيتحسب دلوقتي]] ثم [[42]] | [[lazy]] بيحسب عند أول قراية |
| [[answer]] تاني مرة | [[42]] | محفوظة |
| sequence + [[first()]] | [[map 1]] ثم [[2]] | عنصر واحد بس اتعالج |

اللي ميتلخبطش: في الانترفيو قول «read-only» مش «immutable» لـ [[List]]، وقول إن Sequence **lazy** و List **eager**. ومع كل إجابة هات مثال من كود كتبته.`,
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
          teach: R`## الكود ده بيعمل إيه؟

ده قلب تطبيق الملاحظات: الـ Activity الوحيدة اللي بتوصّل الـ ViewModel بالشاشة، والشاشة نفسها ([[NotesScreen]]): حقل وزرار «إضافة» فوق، ورسالة لو مفيش ملاحظات، ولستة كل سطر فيها checkbox وزرار مسح. والـ solCode هو الـ ViewModel اللي ماسك المنطق. كل حتة هنا ليها درس في التاب، والدرس ده بيوريك هي بتتركب مع بعض إزاي.

> فين اتجرّب: مفيش emulator ولا موبايل هنا. اللي اتعمل: المثال والـ solCode زي ما هم اتحطوا في مشروع Android حقيقي (AGP 9.4.1 و Kotlin 2.4.20 و Compose BOM 2026.09.00 و Room 2.8.5 و Hilt 2.60.1 و KSP 2.3.12، و [[compileSdk 37]])، ومعاهم الحاجات اللي الكود محتاجها ومش مكتوبة فيه: [[NoteEntity]] و [[NoteDao]] و [[AppDatabase]] و [[NotesRepository]] و [[DataModule]]، وكلاس [[Application]] عليه [[@HiltAndroidApp]]، والنصوص في [[strings.xml]]. [[./gradlew assembleDebug]] نجح وطلّع APK. وبعدين [[NotesScreen]] نفسها اتشغّلت في اختبار Compose على الـ JVM بـ Robolectric (Android 15 وهمي) واتداس فيها على الزراير، والنتايج تحت.

---

## ١. الـ imports اللي اتشالت

المثال من غير imports عشان يقصر. أهم اللي مش واضح منين بييجي:

~~~kotlin
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.foundation.lazy.items
import androidx.compose.ui.res.stringResource
import dagger.hilt.android.AndroidEntryPoint
~~~

| الـ import | من مكتبة |
|---|---|
| [[hiltViewModel]] | [[androidx.hilt:hilt-lifecycle-viewmodel-compose]] (1.3.0). في tutorials قديمة هتلاقيه من [[androidx.hilt.navigation.compose]] |
| [[collectAsStateWithLifecycle]] | [[androidx.lifecycle:lifecycle-runtime-compose]] |
| [[@AndroidEntryPoint]] | [[com.google.dagger:hilt-android]] |
| [[items]] | امتداد لـ LazyColumn لازم يتعمله import لوحده، وإلا [[items(notes ...)]] متتعرفش |

---

## ٢. الـ Activity

~~~kotlin
@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
~~~

- [[@AndroidEntryPoint]]: «Hilt، الكلاس ده بياخد منك حاجات». وقت البناء KSP ولّد كلاس اسمه [[Hilt_MainActivity.java]] بيعمل الحقن، و Hilt بيخلي [[MainActivity]] تورث منه من ورا الستارة. من غيرها Hilt مش هيعرف يدّي الـ Activity ولا الـ ViewModel بتاعها حاجة.
- باقي السطور نفس درس «Activity و lifecycle»: [[override]] لـ [[onCreate]]، ونداء الأب، و [[enableEdgeToEdge()]] عشان التطبيق يرسم ورا الـ status bar.

> Hilt كمان محتاج كلاس [[Application]] عليه [[@HiltAndroidApp]] ومكتوب في الـ manifest ([[android:name=".NotesApp"]]). مش في المثال، بس المشروع مش هيشتغل من غيره (درس Hilt).

---

## ٣. [[setContent]]: توصيل الـ ViewModel بالشاشة

~~~kotlin
        setContent {
            NotesTheme {
                val vm: NotesViewModel = hiltViewModel()
                val notes by vm.notes.collectAsStateWithLifecycle()
                NotesScreen(notes = notes, onAdd = vm::onAdd, onToggle = vm::onToggle, onDelete = vm::onDelete)
            }
        }
~~~

| السطر | بيعمل إيه |
|---|---|
| [[NotesTheme { }]] | ألوان وخطوط التطبيق (درس Material 3 و Theme) |
| [[val vm: NotesViewModel = hiltViewModel()]] | هات الـ ViewModel. Hilt بيعمله وبيدّيه الـ repository، ولو موجود (بعد اللفة) بيرجّع نفس الـ object |
| [[vm.notes]] | [[StateFlow<List<NoteEntity>>]] من الـ ViewModel |
| [[collectAsStateWithLifecycle()]] | حوّل الـ Flow لـ State: كل ما الداتابيز تتغير الشاشة تترسم تاني، وبيوقف لما الشاشة توصل [[onStop]] |
| [[val notes by ...]] | [[by]] = delegation: [[notes]] بقت [[List<NoteEntity>]] على طول من غير [[.value]] |
| [[vm::onAdd]] | **function reference**: «الدالة [[onAdd]] بتاعة الـ object ده» من غير ما تناديها. زي [[{ vm.onAdd(it) }]] بالظبط بس أقصر (درس lambdas) |

الـ Activity مفيهاش ولا سطر منطق: بتجيب الـ state وتديه للشاشة، وتوصّل الأحداث بالـ ViewModel. ده الـ **unidirectional data flow**: الداتا نازلة لتحت ([[notes]])، والأحداث طالعة لفوق ([[onAdd]]...).

---

## ٤. [[NotesScreen]]: الـ parameters

~~~kotlin
@Composable
fun NotesScreen(
    notes: List<NoteEntity>,
    onAdd: (String) -> Unit,
    onToggle: (NoteEntity) -> Unit,
    onDelete: (NoteEntity) -> Unit
) {
~~~

- [[@Composable]]: دالة بترسم UI (درس مقدمة Compose).
- [[(String) -> Unit]]: **نوع دالة**: بتاخد [[String]] ومبترجّعش حاجة ([[Unit]]). يعني الشاشة بتقول «لما اليوزر يضيف، هنادي الدالة اللي هتديهالي بالنص».
- الشاشة **stateless**: مبتعرفش Hilt ولا Room ولا الـ ViewModel. بتاخد List و ٣ دوال وخلاص، فتقدر تختبرها بداتا وهمية (زي ما عملنا تحت).

---

## ٥. الحقل والزرار

~~~kotlin
    var text by rememberSaveable { mutableStateOf("") }
    Scaffold { padding ->
        Column(Modifier.padding(padding).padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                OutlinedTextField(value = text, onValueChange = { text = it }, modifier = Modifier.weight(1f))
                Button(onClick = { onAdd(text); text = "" }) { Text(stringResource(R.string.add)) }
            }
~~~

- [[var text by rememberSaveable { mutableStateOf("") }]]: النص اللي بيتكتب. [[mutableStateOf]] بيخلي أي تغيير يعيد رسم الشاشة، و [[rememberSaveable]] بيحفظه حتى بعد اللفة (درس remember و state). ده state **محلي** في الـ UI لأنه ملوش لازمة برا الشاشة.
- [[Scaffold { padding -> ... }]]: [[padding]] هي مسافة الـ system bars (عشان edge-to-edge).
- [[Modifier.padding(padding).padding(16.dp)]]: مسافتين ورا بعض: الـ bars الأول، وبعدين [[16.dp]] بتاعتنا. الترتيب في الـ Modifier مهم (درس الـ Modifiers).
- [[Row(verticalAlignment = Alignment.CenterVertically)]]: الحقل والزرار جنب بعض ومتوسّطين رأسيًا.
- [[OutlinedTextField(value = text, onValueChange = { text = it }, ...)]]: الحقل بيعرض [[text]]، ولما اليوزر يكتب [[it]] هو النص الجديد فبنحفظه.
- [[Modifier.weight(1f)]]: الحقل ياخد كل المساحة الفاضية في الـ Row بعد الزرار. [[1f]] رقم Float.
- [[onClick = { onAdd(text); text = "" }]]: بلّغ برا بالنص، وفضّي الحقل. الشاشة **مش** بتتأكد إن النص مش فاضي، ده شغل الـ ViewModel.
- [[stringResource(R.string.add)]]: النص من [[strings.xml]] (درس AndroidManifest و res)، فالعربي والإنجليزي من نفس السطر.

---

## ٦. الحالة الفاضية واللستة

~~~kotlin
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
~~~

- [[if (notes.isEmpty())]]: في Compose الـ [[if]] العادية بتقرر يترسم إيه. لو اللستة فاضية تظهر «لسه مفيش ملاحظات».
- [[LazyColumn]]: لستة بترسم اللي ظاهر بس (درس LazyColumn).
- [[items(notes, key = { it.id })]]: عنصر لكل ملاحظة. [[key]] بيخلي Compose يعرف كل سطر بالـ [[id]] بتاعه، فلما تمسح ملاحظة من النص الـ state بتاع باقي السطور ميتلخبطش.
- [[ListItem(...)]]: سطر جاهز من Material 3 فيه ٣ أماكن: [[headlineContent]] (العنوان)، و [[leadingContent]] (أول السطر)، و [[trailingContent]] (آخره). وكل واحد بياخد composable كـ lambda.
- [[Checkbox(checked = note.done, onCheckedChange = { onToggle(note) })]]: الـ checkbox بيعرض [[done]] بس، ولما يتداس بيبلّغ. هو مش بيغيّر نفسه: الـ ViewModel يعدّل الداتابيز، والـ Flow يرجّع اللستة الجديدة، فالشاشة تترسم.

### الشاشة اتجرّبت

اختبار Compose (بـ [[createComposeRule()]] و Robolectric) رسم [[NotesScreen]] بداتا وهمية وداس على الزراير:

~~~text الناتج
NotesScreenTest > emptyThenAdd STANDARD_OUT
    onAdd got: [اشتري لبن]
    field still has text? false
NotesScreenTest > emptyThenAdd PASSED
NotesScreenTest > toggleAndDelete STANDARD_OUT
    events: [delete 7]
    empty text shown? false
NotesScreenTest > toggleAndDelete PASSED
~~~

يعني: مع لستة فاضية ظهرت [[No notes yet]]، وكتبنا «اشتري لبن» ودوسنا Add فـ [[onAdd]] اتنادت بالنص والحقل فضي. ومع ملاحظة واحدة ([[id = 7]]) الرسالة الفاضية مظهرتش، و Delete نادت [[onDelete]] بنفس الملاحظة. ده بالظبط اختبار الـ UI اللي الخطوة ٥ في الوصف بتطلبه.

---

## ٧. الـ solCode: [[NotesViewModel]]

~~~kotlin
@HiltViewModel
class NotesViewModel @Inject constructor(private val repo: NotesRepository) : ViewModel() {
~~~

- [[@HiltViewModel]]: Hilt يعرف يعمل الـ ViewModel ده لـ [[hiltViewModel()]]. وولّد له [[NotesViewModel_Factory.java]].
- [[@Inject constructor(private val repo: NotesRepository)]]: «لما تعملني، هات [[NotesRepository]]». و Hilt بيعمل الـ repository لأن الـ constructor بتاعه عليه [[@Inject]] هو كمان، وبيدّيله الـ [[NoteDao]] من [[DataModule]].
- [[: ViewModel()]]: بيورث من [[ViewModel]] فبيعيش بعد اللفة وعنده [[viewModelScope]].

~~~kotlin
    val notes: StateFlow<List<NoteEntity>> = repo.notes
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())
~~~

[[repo.notes]] Flow جاي من Room (كل ما الجدول يتغير بيطلّع لستة جديدة). [[stateIn]] بيحوّله [[StateFlow]] ليه قيمة حالية دايمًا (درس Flow):

| الـ argument | معناه |
|---|---|
| [[viewModelScope]] | التجميع عايش طول ما الـ ViewModel عايش |
| [[SharingStarted.WhileSubscribed(5_000)]] | اشتغل طول ما فيه حد بيتفرج، ولما آخر واحد يمشي استنى ٥ ثواني قبل ما توقف (عشان اللفة متعيدش الـ query). [[5_000]] = 5000 بالـ milliseconds، والـ [[_]] للقراية بس |
| [[emptyList()]] | القيمة الأولى قبل ما Room يرد |

~~~kotlin
    fun onAdd(title: String) {
        if (title.isBlank()) return
        viewModelScope.launch { repo.add(title.trim()) }
    }
~~~

- [[title.isBlank()]]: فاضي أو مسافات بس؟ ارجع من غير ما تعمل حاجة. هنا مكان القاعدة عشان تتختبر بـ unit test من غير UI.
- [[viewModelScope.launch { }]]: ابدأ coroutine (درس coroutines)، لأن [[repo.add]] دالة [[suspend]] (Room بيكتب في الداتابيز برا الـ main thread).
- [[title.trim()]]: شيل المسافات من الأول والآخر.

~~~kotlin
    fun onToggle(note: NoteEntity) {
        viewModelScope.launch { repo.update(note.copy(done = !note.done)) }
    }
    fun onDelete(note: NoteEntity) {
        viewModelScope.launch { repo.delete(note) }
    }
}
~~~

- [[note.copy(done = !note.done)]]: [[copy]] من الـ data class: نسخة بنفس كل حاجة إلا [[done]] مقلوبة ([[!]] = not). الـ entity نفسها [[val]] ومش بتتعدّل.
- [[repo.delete(note)]]: Room بيمسح الصف بالـ primary key ([[id]]).

---

## ٨. اللي حصل وقت البناء

KSP ولّد كود لـ Room و Hilt (في [[app/build/generated/ksp/debug/]])، منه:

~~~text ملفات اتولّدت (مختارة)
AppDatabase_Impl.kt            Room: تنفيذ الداتابيز
NoteDao_Impl.kt                Room: الـ SQL الحقيقي لكل دالة في الـ DAO
Hilt_MainActivity.java         Hilt: الأب اللي بيحقن الـ Activity
NotesRepository_Factory.java   Hilt: بيعمل الـ repository
NotesViewModel_Factory.java    Hilt: بيعمل الـ ViewModel
DataModule_DbFactory.java      Hilt: من دالة db() في الـ module
~~~

وطلع تحذير واحد من Room:

~~~text الناتج
w: [ksp] .../data/Data.kt:32: Schema export directory was not provided to the annotation processor so Room cannot export the schema. ...
~~~

مش غلط: Room عايز فولدر يحفظ فيه شكل الداتابيز كـ JSON عشان الـ migrations بعدين. حلّه [[exportSchema = false]] في [[@Database]]، أو plugin [[androidx.room]] بـ [[schemaDirectory]] (أحسن لو هتغيّر الجدول بعدين).

> مع Compose BOM 2026.09.00 و lifecycle 2.11.0 لازم [[compileSdk = 37]]: بـ 36 البناء بيقع في [[checkDebugAarMetadata]] برسالة [[requires libraries and applications that depend on it to compile against version 37 or later]] (التفاصيل في درس Gradle).

---

## الخلاصة

| الحتة | مسؤوليتها |
|---|---|
| [[MainActivity]] | توصيل بس: ViewModel → شاشة، وأحداث → ViewModel |
| [[NotesScreen]] | stateless: تعرض اللي جالها وتبلّغ باللي حصل |
| [[rememberSaveable]] | نص الحقل، state محلي للـ UI |
| [[NotesViewModel]] | المنطق ([[isBlank]] و [[trim]] و [[copy]]) والـ [[StateFlow]] |
| [[NotesRepository]] + Room | الداتا، و Flow بيتحدّث لوحده |
| Hilt | بيعمل كل ده ويوصّله ببعض |

اللي ميتلخبطش: الشاشة متعرفش مين بيحفظ الداتا، والـ ViewModel ميعرفش شكل الشاشة. فتقدر تغيّر الداتابيز أو تضيف sync مع API والشاشة زي ما هي، وتختبر كل حتة لوحدها.`,
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
