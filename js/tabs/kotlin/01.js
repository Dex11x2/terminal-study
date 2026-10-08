// تاب Kotlin و Android
// كل درس: cmd (فريد، والتقدم محفوظ بيه) و title و desc و example و try، واختياري flag و deep و lines و sol و solCode.
// جوه R`...` اكتب $__{ بدل الدولار مع القوس (عشان string templates بتاعة Kotlin)، و $__bt بدل الـ backtick.
// lines: شرح لكل سطر في المثال، من غير السطور الفاضية والتعليقات (اللي بتبدأ بـ // أو #).
TAB("kotlin", {
  label: "Kotlin و Android",
  prompt: "$ ",
  lab: R`kotlinc -version
kotlinc hello.kt -include-runtime -d hello.jar && java -jar hello.jar
./gradlew assembleDebug`,
  labText: "المستوى ١ مش محتاج غير المتصفح: افتح play.kotlinlang.org وجرّب كل مثال فيه. ولما توصل لـ Android سطّب Android Studio واعمل مشروع Empty Activity، وجرّب الشاشات على emulator أو موبايلك. ولو حابب الترمنال: kotlinc بيترجم الملف لـ jar وبتشغّله بـ java -jar.",
  levels: {
    "1": ["لغة Kotlin من الصفر", "التسطيب وأول برنامج، و val و var، والشروط والـ loops والدوال، و null safety، والـ collections، والكلاسات و data class و sealed، والـ lambdas و scope functions والأخطاء"],
    "2": ["Android بـ Compose", "جوه مشروع Android، والـ Activity، و Compose والـ layout والـ state والتنقل، و ViewModel و coroutines و Flow، والشبكة والصور، و DataStore و Room والصلاحيات، وعالم Java و XML"],
    "3": ["المعمارية والجودة والنشر", "الطبقات والـ repository و Hilt، والاختبارات والـ debugging والأداء، والتوقيع و AAB و R8 و Play Console، و Kotlin Multiplatform، والانترفيو ومشروع كامل"]
  },
  categories: [
    {
      t: "البداية: أول برنامج",
      l: 1,
      n: "تكتب Kotlin فين، وأول برنامج، والمتغيرات والأنواع، ودمج القيم جوه النصوص",
      items: [
        {
          cmd: "تسطيب Kotlin",
          title: "تكتب Kotlin وتشغّلها فين؟ (Playground و Android Studio و kotlinc)",
          desc: R`عندك ٣ طرق تشغّل بيها Kotlin، وكل واحدة ليها وقتها:

١. [[Kotlin Playground]] على [[play.kotlinlang.org]]: محرر في المتصفح من غير أي تسطيب. تكتب الكود وتدوس Run. ده كفاية للمستوى ١ كله.

٢. [[Android Studio]] (أو [[IntelliJ IDEA]] للبرامج العادية): ده البيت الرسمي لـ Android. جواه كل حاجة: Kotlin و JDK و Android SDK و emulator. هتحتاجه من أول المستوى ٢. ولو عايز تجرّب كود Kotlin عادي جوه Android Studio: كليك يمين على أي فولدر ثم New ثم Scratch File واختار Kotlin.

٣. الترمنال بـ [[kotlinc]]: المترجم ([[compiler]]) بتاع Kotlin. بياخد ملف [[.kt]] ويطلّع منه ملف [[.jar]] بيشتغل على الـ [[JVM]] (الآلة اللي بتشغّل Java). عشان كده محتاج JDK متسطّب ([[java -version]] يقولك).

Kotlin لغة عملتها شركة JetBrains (اللي بتعمل IntelliJ)، وطلعت نسختها 1.0 سنة 2016. Google بقت تدعمها رسميًا للأندرويد سنة 2017، ومن 2019 بقت بتقول عليها Kotlin-first: يعني الأمثلة والمكتبات الجديدة بتطلع بـ Kotlin الأول. ومن Kotlin 2.0 (سنة 2024) فيه مترجم جديد اسمه [[K2]] أسرع بكتير.`,
          example: R`java -version
sdk install kotlin
kotlinc -version
kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar
kotlinc -script notes.main.kts`,
          try: R`افتح [[play.kotlinlang.org]] ودوس Run على الكود اللي موجود. بعدين امسحه واكتب [[fun main() { println("أنا بتعلم Kotlin") }]] وشغّله. ولو عايز الترمنال: سطّب JDK 21 و Kotlin، واعمل ملف [[hello.kt]] فيه نفس السطر، وترجمه وشغّله بالأمرين اللي في المثال.`,
          deep: {
            why: "عشان متضيعش أول يوم في التسطيب. اللغة نفسها تتعلمها في المتصفح، والتسطيب التقيل (Android Studio بالـ SDK والـ emulator، حوالي ١٠ جيجا) تأجّله لحد ما تحتاجه فعلًا في المستوى ٢.",
            how: R`[[kotlinc]] بيحوّل كود Kotlin لـ bytecode، نفس الصيغة اللي Java بتطلّعها، فبيشتغل على أي JVM. [[-include-runtime]] بيحط مكتبة Kotlin الأساسية (فيها println و listOf وغيرهم) جوه الـ jar عشان يشتغل لوحده، و [[-d]] اسم الملف اللي هيطلع.

على الأندرويد مفيش JVM عادية: فيه [[ART]] (Android Runtime). أداة اسمها D8 بتحوّل الـ bytecode لصيغة [[.dex]] اللي ART بتفهمها. وده كله بيحصل لوحده لما Gradle يبني التطبيق.

التسطيب: على Linux و macOS أسهل طريقة [[SDKMAN]] ([[sdk install java]] و [[sdk install kotlin]])، أو [[brew install kotlin]] على الماك. على ويندوز نزّل zip المترجم من صفحة Releases بتاعة Kotlin على GitHub، وحط فولدر [[bin]] على الـ PATH.

[[.main.kts]] ملف script: بيتشغّل على طول من غير main ومن غير ما تعمل jar، ينفع لسكربتات صغيرة.`,
            when: "Playground للتجارب السريعة وكل المستوى ١. Android Studio لأي حاجة Android. و kotlinc لما تحب تفهم بيحصل إيه تحت، أو تعمل أداة سطر أوامر صغيرة.",
            mistakes: R`تسطّب Android Studio قبل ما تعرف اللغة وتتوه في Gradle والـ emulator من أول يوم. وتنسى [[-include-runtime]] فالـ jar يقع أول ما الكود يستخدم حاجة من مكتبة Kotlin (أي دالة بتاخد String مثلًا) بـ [[NoClassDefFoundError: kotlin/jvm/internal/Intrinsics]]. وتسمّي الملف [[Hello World.kt]] بمسافة: خليه من غير مسافات.`
          },
          teach: R`## الأوامر دي بتعمل إيه؟

المثال ٦ أوامر ترمنال: تتأكد إن Java موجودة، تسطّب Kotlin، تتأكد من النسخة، تترجم ملف لـ jar، تشغّله، وفي الآخر تشغّل script من غير jar خالص. كل الناتج تحت اتشغّل فعلًا في [[docker run --rm eclipse-temurin:21-jdk]] (لينكس فيه JDK 21) ومعاه مترجم Kotlin 2.4.20 الرسمي (الـ zip من صفحة Releases بتاعة Kotlin على GitHub). أمر [[sdk install kotlin]] بس من الـ docs بتاعة SDKMAN، لأننا مسطّبناش SDKMAN.

> لو هتذاكر المستوى ١ من الـ Playground بس، الدرس ده للمعرفة. ارجعله لما تحب تشغّل من الترمنال.

---

## ١. [[java -version]]: فيه JVM؟

~~~bash
java -version
~~~

~~~text الناتج (eclipse-temurin:21-jdk)
openjdk version "21.0.12.1" 2026-08-18 LTS
OpenJDK Runtime Environment Temurin-21.0.12.1+1 (build 21.0.12.1+1-LTS)
OpenJDK 64-Bit Server VM Temurin-21.0.12.1+1 (build 21.0.12.1+1-LTS, mixed mode, sharing)
~~~

- [[java]] هو البرنامج اللي بيشغّل الـ **JVM** (Java Virtual Machine): «كمبيوتر وهمي» بيفهم صيغة اسمها bytecode. Kotlin بتترجم للصيغة دي، فمن غير JVM مفيش تشغيل.
- [[-version]] بيطبع النسخة ويخرج. (ملحوظة: بيطبعها على الـ stderr مش الـ stdout، فلو عملت [[java -version > v.txt]] الملف هيطلع فاضي.)
- **21** رقم النسخة، و **LTS** = Long-Term Support: نسخة بتاخد تحديثات سنين، وده اللي بتختاره. 17 و 21 الاتنين LTS.
- **Temurin** اسم «توزيعة» من JDK بتعملها مؤسسة Eclipse Adoptium. فيه توزيعات تانية (Oracle و Microsoft و Amazon Corretto)، كلهم نفس الـ Java.
- **JDK** (Java Development Kit) = الـ JVM + أدوات التطوير. Kotlin محتاجة JDK مش JRE بس.

---

## ٢. [[sdk install kotlin]]: التسطيب (من الـ docs)

[[sdk]] هو أمر **SDKMAN**: أداة على لينكس والماك بتسطّب أدوات التطوير وتبدّل بين نسخها. بعد ما تسطّب SDKMAN نفسه من موقعه، [[sdk install java]] بيسطّب JDK و [[sdk install kotlin]] بيسطّب آخر Kotlin ويحط [[kotlinc]] على الـ PATH.

| النظام | الطريقة (من الـ docs) |
|---|---|
| Linux و WSL | SDKMAN: [[sdk install kotlin]] |
| macOS | [[brew install kotlin]] أو SDKMAN |
| Windows | نزّل [[kotlin-compiler-2.x.zip]] من GitHub Releases، فكّه، وحط فولدر [[kotlinc\bin]] على الـ PATH |

اللي اتعمل هنا هو طريقة ويندوز بالظبط بس على لينكس: الـ zip اتفك في فولدر، و [[kotlinc/bin]] اتحط على الـ PATH. جوه الفولدر ده هتلاقي [[kotlinc]] و [[kotlin]] وكل واحد ليه نسخة [[.bat]] لويندوز.

---

## ٣. [[kotlinc -version]]

~~~bash
kotlinc -version
~~~

~~~text الناتج
info: kotlinc-jvm 2.4.20 (JRE 21.0.12.1+1-LTS)
~~~

- [[kotlinc]] = Kotlin compiler. و [[kotlinc-jvm]] معناها المترجم اللي بيطلّع bytecode للـ JVM (فيه كمان [[kotlinc-js]] و [[kotlinc-wasm]] في نفس الفولدر لأهداف تانية).
- **2.4.20** نسخة Kotlin. أي 2.x فيها مترجم K2.
- **(JRE 21...)**: المترجم نفسه برنامج مكتوب بـ Kotlin و Java وبيشتغل على الـ JVM، وده الـ Java اللي شغّله. عشان كده أول أمر في الترمنال بياخد كام ثانية: الـ JVM لازم تقوم الأول.

---

## ٤. [[kotlinc hello.kt -include-runtime -d hello.jar]]

الملف [[hello.kt]] (نفس الـ solCode):

~~~kotlin
fun main() {
    println("أنا بتعلم Kotlin")
}
~~~

| الحتة | معناها |
|---|---|
| [[kotlinc]] | المترجم |
| [[hello.kt]] | الملف اللي هيترجمه. [[.kt]] امتداد ملفات Kotlin |
| [[-include-runtime]] | حط مكتبة Kotlin الأساسية (الـ runtime: [[listOf]] و [[println]] وغيرهم) جوه الـ jar |
| [[-d hello.jar]] | [[d]] = destination: حط الناتج هنا. لو الاسم آخره [[.jar]] بيعمل jar، ولو اسم فولدر بيحط فيه ملفات [[.class]] |

لما الترجمة تنجح **مبيطبعش حاجة**. السكوت هنا معناه إن كله تمام. الأخطاء بس هي اللي بتظهر.

### الـ jar ده فيه إيه؟

**jar** (Java ARchive) ملف zip فيه ملفات [[.class]] (الـ bytecode) وملف تعريف. اتعدّت محتوياته بـ [[jar tf hello.jar]]:

~~~text الناتج (أول ٥ سطور)
META-INF/MANIFEST.MF
HelloKt.class
META-INF/main.kotlin_module
kotlin/ArrayIntrinsicsKt.class
kotlin/BuilderInference.class
~~~

- [[HelloKt.class]]: الكود بتاعك. المترجم سمّى الـ class من اسم الملف: [[hello.kt]] بقت [[HelloKt]] (أول حرف كبير وبعده [[Kt]]). ولما جربنا ملف اسمه [[Hello World.kt]] اتترجم عادي بس الـ class طلعت [[Hello_WorldKt]]، والمسافة هتتعبك في كل أمر ترمنال (لازم تحطه بين [[" "]])، فخلي الأسامي من غير مسافات.
- [[kotlin/...]]: دي الـ runtime اللي [[-include-runtime]] حطها: **3411** ملف، والـ jar حجمه حوالي **5.4 ميجا** (5,679,216 بايت).
- [[META-INF/MANIFEST.MF]]: فيه سطر [[Main-Class: HelloKt]]، يعني «لما حد يشغّل الـ jar ابدأ من الـ class دي».

---

## ٥. [[java -jar hello.jar]]

~~~bash
java -jar hello.jar
~~~

~~~text الناتج
أنا بتعلم Kotlin
~~~

[[-jar]] بيقول للـ JVM: «افتح الـ jar، اقرا [[Main-Class]] من الـ MANIFEST، ونادي [[main]] اللي فيها».

### من غير [[-include-runtime]]؟

ترجمنا نفس الملف من غيرها: الـ jar طلع **990 بايت** بس، فيه ٣ ملفات (الـ MANIFEST و HelloKt.class و main.kotlin_module). والغريب إنه اشتغل وطبع الجملة! السبب إن [[println]] دالة [[inline]]: المترجم بيحط مكانها [[System.out.println]] بتاعة Java على طول، فالكود مش محتاج حاجة من مكتبة Kotlin.

بس أول ما الكود يستخدم أي حاجة من المكتبة بيقع. ملف فيه دالة بتاخد [[String]]:

~~~kotlin
fun greet(name: String) = println("أهلًا يا $name")
fun main() {
    greet("Sara")
}
~~~

اتترجم من غير [[-include-runtime]] واتشغّل:

~~~text الناتج
Exception in thread "main" java.lang.NoClassDefFoundError: kotlin/jvm/internal/Intrinsics
	at GreetKt.greet(greet.kt)
	at GreetKt.main(greet.kt:3)
	at GreetKt.main(greet.kt)
Caused by: java.lang.ClassNotFoundException: kotlin.jvm.internal.Intrinsics
	at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass(BuiltinClassLoader.java:641)
	at java.base/jdk.internal.loader.ClassLoaders$AppClassLoader.loadClass(ClassLoaders.java:188)
	at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:526)
	... 3 more
~~~

إزاي تقرا ده:
- [[NoClassDefFoundError]]: الكود اتترجم وهو شايف class، ووقت التشغيل ملقاهاش.
- [[kotlin/jvm/internal/Intrinsics]]: class في الـ runtime بيستخدمها المترجم عشان يفحص إن الـ [[String]] اللي داخلة الدالة مش null (درس null safety).
- السطور اللي بتبدأ بـ [[at]] اسمها **stack trace**: مين نادى مين، من تحت لفوق: [[main]] نادت [[greet]] (السطر 3) و greet هي اللي وقعت.
- ونفس الحكاية مع [[listOf]]: جربناها وقالت [[NoClassDefFoundError: kotlin/collections/CollectionsKt]].

---

## ٦. [[kotlinc -script notes.main.kts]]

ملف بامتداد [[.main.kts]] (kts = Kotlin Script). مفيهوش [[main]]: الأوامر بتتنفذ من أول سطر:

~~~kotlin
val notes = listOf("اشتري لبن", "ذاكر Kotlin")
for (note in notes) println("- $note")
println("عدد الملاحظات: $__{notes.size}")
~~~

~~~bash
kotlinc -script notes.main.kts
~~~

~~~text الناتج
- اشتري لبن
- ذاكر Kotlin
عدد الملاحظات: 2
~~~

[[-script]] بيقول للمترجم «ترجم وشغّل على طول، من غير jar». مفيد لسكربتات صغيرة زي سكربتات bash بس بـ Kotlin. ([[listOf]] و [[for]] و [[$]] جوه النص ليهم دروس جاية.)

---

## الخلاصة

| الأمر | بيعمل إيه | الناتج |
|---|---|---|
| [[java -version]] | فيه JVM؟ | [[openjdk version "21..."]] |
| [[sdk install kotlin]] | يسطّب kotlinc | (من الـ docs) |
| [[kotlinc -version]] | نسخة المترجم | [[info: kotlinc-jvm 2.4.20 ...]] |
| [[kotlinc f.kt -include-runtime -d f.jar]] | ترجمة لـ jar شغال لوحده | مفيش ناتج لو نجح |
| [[java -jar f.jar]] | تشغيل | ناتج برنامجك |
| [[kotlinc -script f.main.kts]] | ترجمة وتشغيل script | ناتج السكربت |

- Kotlin على الجهاز = JDK + kotlinc. وعلى Android الـ bytecode بيتحوّل لـ [[.dex]] لوحده وقت البناء.
- انسى [[-include-runtime]] والـ jar يقع بـ [[NoClassDefFoundError]] أول ما يستخدم حاجة من مكتبة Kotlin.
- ترجمة ساكتة = نجحت.`,
          lines: [
            R`اتأكد إن فيه JDK متسطّب. Kotlin على الجهاز محتاجة JVM (يفضّل JDK 17 أو 21).`,
            R`سطّب Kotlin بـ SDKMAN (على Linux و macOS).`,
            R`اتأكد إن [[kotlinc]] بقى على الـ PATH، وشوف النسخة (2.x).`,
            R`ترجم [[hello.kt]] لـ jar لوحده فيه Kotlin runtime.`,
            "شغّل الـ jar على الـ JVM.",
            R`شغّل script على طول من غير ما تعمل jar.`
          ],
          sol: R`في الـ Playground هيظهر تحت المحرر: [[أنا بتعلم Kotlin]].

وفي الترمنال: [[kotlinc -version]] بيطبع حاجة زي [[info: kotlinc-jvm 2.x.x (JRE 21...)]]. الترجمة بتاخد كام ثانية أول مرة (المترجم نفسه بيشتغل على JVM فبياخد وقت يقوم)، وبعدين [[java -jar hello.jar]] يطبع نفس الجملة.

لو [[kotlinc: command not found]]: افتح ترمنال جديد بعد التسطيب، أو فولدر bin مش على الـ PATH. ولو [[JAVA_HOME is not set]] أو [[java: command not found]]: سطّب JDK الأول.`,
          solCode: R`// hello.kt
fun main() {
    println("أنا بتعلم Kotlin")
}`
        },
        {
          cmd: "مقدمة Kotlin وكتابة أول برنامج",
          title: "أول برنامج Kotlin: fun main و println و print",
          desc: R`أي برنامج Kotlin بيبدأ من دالة اسمها [[main]]. كلمة [[fun]] معناها «بعرّف دالة» (function)، والأقواس [[()]] بعد الاسم مكان المدخلات (فاضية هنا)، و [[{ }]] جواهم الأوامر اللي هتتنفذ سطر سطر من فوق لتحت.

[[println("...")]] بتطبع وتنزل سطر جديد، و [[print]] بتطبع من غير ما تنزل. النص بيتكتب بين علامتين تنصيص [[" "]].

حاجات هتلاحظها من أول سطر:
• مفيش [[;]] في آخر السطر. Kotlin بتعرف إن السطر خلص لوحدها (ينفع تكتبها، بس محدش بيكتبها).
• مفيش [[class]] إجباري زي Java: الدالة ممكن تعيش لوحدها في الملف.
• التعليق بيبدأ بـ [[//]] لحد آخر السطر، أو بين [[/* */]] لو أكتر من سطر. المترجم بيتجاهله.

و [[val name = "Omar"]] بيعرّف متغير اسمه name قيمته النص Omar (الدرس الجاي بالتفصيل). وعلامة [[$]] جوه النص معناها «حط قيمة المتغير ده هنا»: [["أهلًا يا $name"]] بتطبع «أهلًا يا Omar».

ولو بتشغّل من الترمنال (مش الـ Playground) تقدر تقرا كلام من المستخدم بـ [[readln()]]: بترجّع السطر اللي كتبه كنص.`,
          example: R`// البرنامج بيبدأ من هنا
fun main() {
    println("أهلًا يا Kotlin")
    print("السطر ده ")
    print("والكلام ده جنبه")
    println()
    // متغير، وبعدين نحطه جوه النص بـ $
    val name = "Omar"
    println("أهلًا يا $name")
    /* تعليق
       من كذا سطر */
    println(2 + 3)
}`,
          try: R`في الـ Playground اكتب برنامج يطبع اسمك في سطر، وسنك في سطر تاني، ونتيجة [[2026 - 2000]] في سطر تالت. بعدين جرّب تمسح قوس [[}]] الأخير وشغّل، واقرا رسالة الغلط.`,
          flag: "script",
          deep: {
            why: R`كل برنامج على الجهاز محتاج نقطة بداية، والـ JVM بتدوّر على [[main]]. في Android مش هتكتب main بنفسك: النظام هو اللي بيفتح الـ Activity. بس كل أساسيات اللغة بتتعلمها هنا الأول بأبسط شكل.`,
            how: R`لما تكتب [[fun main()]] في ملف [[hello.kt]]، المترجم بيعمل في الخفا class اسمها [[HelloKt]] فيها [[static void main]] زي Java بالظبط. عشان كده Kotlin و Java بيشتغلوا مع بعض في نفس المشروع.

و [[println]] في Kotlin على الـ JVM بتنادي [[System.out.println]] بتاعة Java. الفرق إنها دالة جاهزة على طول من غير import.

ونسخة أقدم من main كانت بتاخد [[args: Array<String>]] (الكلام اللي بيتكتب بعد اسم البرنامج في الترمنال). من Kotlin 1.3 بقت اختيارية.`,
            when: "أول ملف في أي تجربة أو أداة سطر أوامر. وفي الـ Playground كل مثال لازم يكون جواه main.",
            mistakes: R`تكتب [[Println]] بحرف كبير: Kotlin بتفرّق بين الحروف الكبيرة والصغيرة ([[case-sensitive]])، فهتطلع [[unresolved reference 'Println']]. وتستخدم علامة تنصيص واحدة [['Omar']]: دي في Kotlin لحرف واحد بس ([[Char]])، النص لازم [[" "]]. وتنسى قفلة [[}]] فالمترجم يقول [[Expecting '}']].`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيطبع ٤ سطور: تحية، وسطر مكوّن من [[print]] مرتين، وتحية فيها متغير، وناتج حساب. هنمشي عليه سطر سطر. كل الناتج اتشغّل بـ [[kotlinc ex.kt -include-runtime -d ex.jar && java -jar ex.jar]] في [[docker run --rm eclipse-temurin:21-jdk]] مع Kotlin 2.4.20، والأخطاء في الآخر اتجرّبت بتعديل الملف فعلًا. ونفس الكود بيشتغل في الـ Playground بالظبط.

---

## ١. التعليق

~~~kotlin
// البرنامج بيبدأ من هنا
~~~

[[//]] معناها «من هنا لآخر السطر كلام للبني آدمين». المترجم بيرميه، ومش بيدخل الـ jar أصلًا.

---

## ٢. [[fun main() {]]

~~~kotlin
fun main() {
    ...
}
~~~

| الحتة | معناها |
|---|---|
| [[fun]] | اختصار function: «بعرّف دالة» |
| [[main]] | اسم الدالة. الاسم ده بالذات هو اللي الـ JVM بتدوّر عليه وتبدأ منه |
| [[()]] | مكان المدخلات (parameters). فاضي: main مش محتاجة حاجة |
| [[{]] ... [[}]] | جسم الدالة: الأوامر اللي بتتنفذ من فوق لتحت |

المسافات الأربعة قبل كل سطر جوه ([[indentation]]) للقراية بس، المترجم مش بيهتم بيها. بس كل الناس بتكتبها، فاكتبها.

---

## ٣. [[println]] و [[print]]

~~~kotlin
    println("أهلًا يا Kotlin")
    print("السطر ده ")
    print("والكلام ده جنبه")
    println()
~~~

- [[println]] = print line: اطبع وانزل سطر جديد. المدخل بين القوسين: نص بين [[" "]] (اسمه [[String]]).
- [[print]]: اطبع بس، والمؤشر يفضل مكانه. فالـ print التانية بتكمّل على نفس السطر. لاحظ المسافة اللي في آخر [["السطر ده "]]: من غيرها الكلمتين هيلزقوا في بعض.
- [[println()]] من غير حاجة: بتطبع «سطر جديد» بس، فبتقفل السطر اللي الـ print عملته.

~~~text الناتج لحد هنا
أهلًا يا Kotlin
السطر ده والكلام ده جنبه
~~~

ومفيش [[;]] في آخر أي سطر: آخر السطر هو آخر الأمر. ([[;]] بتتكتب بس لو حطيت أمرين على نفس السطر.)

---

## ٤. متغير وجوه النص

~~~kotlin
    val name = "Omar"
    println("أهلًا يا $name")
~~~

- [[val]] (من value): «اعمل اسم اسمه name، وخليه يشاور على النص Omar». الدرس الجاي بالتفصيل.
- [[$name]] جوه النص: الـ [[$]] معناها «مش الكلمة name، حط قيمة المتغير اللي اسمه كده». ده اسمه string template (ليه درس كامل).

~~~text الناتج
أهلًا يا Omar
~~~

---

## ٥. التعليق متعدد السطور

~~~kotlin
    /* تعليق
       من كذا سطر */
~~~

[[/*]] بتفتح و [[*/]] بتقفل، وكل اللي بينهم متجاهل حتى لو سطور كتير. مفيد لما عايز تقفل حتة كود كاملة مؤقتًا.

---

## ٦. [[println(2 + 3)]]

~~~kotlin
    println(2 + 3)
~~~

[[2 + 3]] من غير علامات تنصيص يبقى **حساب** مش نص: Kotlin بتحسبه الأول (5) وبعدين تديه لـ println. لو كتبت [[println("2 + 3")]] هتطبع [[2 + 3]] زي ما هي.

~~~text الناتج
5
~~~

---

## الناتج كله

~~~text الناتج
أهلًا يا Kotlin
السطر ده والكلام ده جنبه
أهلًا يا Omar
5
~~~

---

## ٧. بيحصل إيه تحت؟

ترجمنا الملف لفولدر بـ [[kotlinc hello.kt -d out]] وبصينا فيه:

~~~text محتوى out
HelloKt.class
META-INF/main.kotlin_module
~~~

[[fun main]] اللي كتبتها لوحدها في الملف، المترجم حطها جوه class اسمها [[HelloKt]] (من اسم الملف) كـ [[static void main]]، وده الشكل اللي الـ JVM بتفهمه. تقدر تشغّلها من الفولدر على طول: [[java -cp out HelloKt]] (الـ [[-cp]] = classpath: «دوّر على الـ classes هنا»)، واشتغلت لأن الكود ده مش محتاج مكتبة Kotlin (درس التسطيب فيه الحالة اللي بيقع فيها).

---

## ٨. الأخطاء اللي في الـ deep والتجربة

جربناهم كلهم:

**[[Println]] بحرف كبير:**

~~~text الناتج
e2a.kt:2:5: error: unresolved reference 'Println'.
    Println("أهلًا")
    ^^^^^^^
~~~

- [[e2a.kt:2:5]] = اسم الملف : رقم السطر : رقم العمود. والعلامات [[^^^]] تحت بتشاور على الغلط بالظبط.
- [[unresolved reference]] = «الاسم ده مش لاقيه». Kotlin [[case-sensitive]]: println و Println اسمين مختلفين.

**نسيت [[}]] الأخيرة:**

~~~text الناتج
e2b.kt:2:21: error: syntax error: Expecting '}'.
    println("أهلًا")
                    ^
~~~

المترجم وصل لآخر الملف وهو لسه مستني القفلة، فبيشاور على آخر حاجة قراها.

**نص بين [[' ']]:**

~~~text الناتج
e2c.kt:2:13: error: too many characters in a character literal.
    println('Omar')
            ^^^^^^
~~~

[[' ']] في Kotlin لحرف واحد بس (نوع [[Char]])، و [['Omar']] ٤ حروف. النص لازم [[" "]].

ولما فيه error مفيش jar بيتعمل خالص: لازم تصلّحه الأول.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[fun main() { }]] | نقطة البداية |
| [[println(x)]] | اطبع وانزل سطر |
| [[print(x)]] | اطبع من غير سطر جديد |
| [[println()]] | سطر جديد بس |
| [[" "]] | نص (String)، و [[' ']] حرف واحد (Char) |
| [[$name]] | قيمة المتغير جوه النص |
| [[//]] و [[/* */]] | تعليقات |

- مفيش [[;]] ومفيش class إجباري.
- رسالة الخطأ أولها [[ملف:سطر:عمود]]: روح للمكان ده الأول.`,
          lines: [
            R`تعريف الدالة [[main]]: نقطة البداية.`,
            "بيطبع وينزل سطر جديد.",
            "بيطبع من غير ما ينزل سطر.",
            "ده هيتطبع جنب اللي قبله على نفس السطر.",
            R`[[println()]] فاضية: بتنزل سطر بس.`,
            R`متغير [[name]] قيمته النص Omar.`,
            R`[[$name]] جوه النص بتتبدل بقيمته.`,
            R`بداية تعليق متعدد السطور بـ [[/*]]: المترجم بيتجاهل كل اللي جواه.`,
            R`لحد [[*/]]. (السطرين دول مش كود، بس بنعدّهم هنا لأنهم مش بيبدأوا بـ //.)`,
            "بيحسب 2 + 3 ويطبع الناتج 5.",
            R`قفلة [[main]].`
          ],
          sol: R`الناتج:
[[أهلًا يا Kotlin]]
[[السطر ده والكلام ده جنبه]]
[[أهلًا يا Omar]]
[[5]]

وحل التجربة: [[println("Sara")]] ثم [[println(26)]] ثم [[println(2026 - 2000)]] اللي بتطبع 26. ولما تمسح آخر [[}]] المترجم هيقول حاجة زي [[Expecting '}']] ومعاها رقم السطر.`,
          solCode: R`fun main() {
    println("Sara")
    println(26)
    println(2026 - 2000)
}`
        },
        {
          cmd: "val و var",
          title: "val ولا var؟ والأنواع الأساسية (Int و Double و String و Boolean)",
          desc: R`المتغير اسم بيشاور على قيمة. في Kotlin فيه كلمتين:
• [[val]] (من value): بتديله قيمة مرة واحدة ومينفعش تغيّرها. ده الافتراضي، استخدمه في أغلب الكود.
• [[var]] (من variable): ينفع تغيّر قيمته بعدين، زي عداد أو مجموع.

لو حاولت تغيّر [[val]] المترجم يرفض قبل ما البرنامج يشتغل: [['val' cannot be reassigned]].

النوع ([[type]]) بيتكتب بعد الاسم وبعد نقطتين [[:]]، زي [[val price: Double = 99.5]]. بس غالبًا مش هتكتبه: Kotlin بتستنتجه من القيمة ([[type inference]]). [[val count = 3]] بقى [[Int]] لوحده. والنوع بيتحدد مرة واحدة: [[var x = 5]] وبعدين [[x = "five"]] غلط، لأن x بقت Int للأبد.

الأنواع الأساسية:
• [[Int]] رقم صحيح (لحد حوالي ٢ مليار)، و [[Long]] رقم صحيح كبير وبيتكتب بـ [[L]] في الآخر.
• [[Double]] رقم عشري زي [[19.99]].
• [[Boolean]] يا [[true]] يا [[false]].
• [[Char]] حرف واحد بين [[' ']]، و [[String]] نص بين [[" "]].

ومفيش تحويل لوحده بين الأنواع: [["25".toInt()]] بتحوّل النص لرقم، و [[n.toString()]] العكس، و [[n.toDouble()]] من Int لـ Double. والـ [[_]] جوه الرقم للقراية بس: [[1_000_000]] هو مليون.

وانتبه للقسمة: [[7 / 2]] بين رقمين صحاح بتطلّع [[3]] (بيرمي الكسر)، و [[7 / 2.0]] بتطلّع [[3.5]].`,
          example: R`fun main() {
    val city = "Cairo"
    var score = 10
    score += 5
    val price: Double = 99.5
    val count = 3
    val total = price * count
    val population = 3_000_000_000L
    val isBig: Boolean = total > 200
    val letter = 'K'
    val age = "25".toInt()
    println("$city $score $total $population $isBig $letter")
    println(age + 1)
    println(7 / 2)
    println(7 / 2.0)
    // val مينفعش يتغير: لو شلت // من السطر الجاي المترجم هيرفض
    // city = "Giza"
}`,
          try: R`اعمل [[var balance = 1000]] واخصم منه 250 بـ [[-=]] واطبعه. بعدين اعمل [[val rate = 0.14]] واطبع الضريبة [[balance * rate]]. وجرّب تكتب [[balance = 50.5]] وشوف المترجم هيقول إيه، وبعدين حوّل الرقم [["42"]] لـ Int وزوّد عليه 8.`,
          flag: "script",
          deep: {
            why: R`الكود اللي أغلب متغيراته [[val]] أسهل تقراه: لما تشوف [[val total]] بتعرف إن قيمته مش هتتغير تحت. ونص البق في البرامج سببه قيمة اتغيرت من مكان مكنتش متوقعه. والأنواع الثابتة بتخلي المترجم يمسك الغلط وانت بتكتب، مش وهو شغال على موبايل العميل.`,
            how: R`[[val]] معناها إن «الاسم» مش هيشاور على حاجة تانية، مش إن الحاجة نفسها متتغيرش من جوه. [[val list = mutableListOf(1)]] وبعدين [[list.add(2)]] شغال عادي، لأنك مغيرتش list نفسها، غيرت اللي جواها.

وفيه [[const val]]: ثابت قيمته معروفة وقت الترجمة (رقم أو نص)، وبيتكتب برا الدوال أو جوه object. زي [[const val MAX_ITEMS = 50]].

الأرقام على الـ JVM: [[Int]] بيتحول لـ [[int]] بتاع Java (سريع ومن غير object) إلا لو محتاج يبقى nullable أو جوه List. وكل الأنواع في Kotlin بتتعامل كـ objects في الكتابة: [[5.toString()]] و [[3.coerceAtLeast(5)]] شغالين.`,
            when: R`ابدأ دايمًا بـ [[val]]، وغيّرها [[var]] لما المترجم يقولك إنك محتاج تغيّرها فعلًا. واكتب النوع بنفسك لما مش واضح من القيمة، أو في الدوال العامة اللي غيرك هيستخدمها.`,
            mistakes: R`[[var]] في كل حتة بحكم العادة. ومستني [[7 / 2]] يطلّع 3.5. وتجمع Int و String وتستغرب: [[1 + "2"]] غلط، إنما [["1" + 2]] بيطلّع [["12"]] (أي حاجة بعد نص بتتحول نص). و [["abc".toInt()]] بترمي [[NumberFormatException]]: لو الكلام جاي من المستخدم استخدم [[toIntOrNull()]] اللي بترجّع null بدل ما تقع (درس null safety).`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف متغيرات من كل نوع أساسي، يغيّر واحد منهم، يحسب بيهم، ويحوّل نص لرقم، وبعدين يورّيك فخ القسمة. كل الناتج والأخطاء تحت اتشغّلوا في [[docker run --rm eclipse-temurin:21-jdk]] مع Kotlin 2.4.20.

---

## ١. [[val]]: اسم ثابت

~~~kotlin
    val city = "Cairo"
~~~

| الحتة | معناها |
|---|---|
| [[val]] | value: قيمة مرة واحدة، مينفعش تتغير |
| [[city]] | الاسم اللي هتنادي بيه القيمة |
| [[=]] | «خلّي الاسم يشاور على ده» (مش «يساوي» زي الرياضة) |
| [["Cairo"]] | القيمة. بين [[" "]] يبقى String |

مكتبناش النوع، و Kotlin عرفته لوحدها من القيمة: [[String]]. ده اسمه **type inference** (استنتاج النوع).

---

## ٢. [[var]] و [[+=]]

~~~kotlin
    var score = 10
    score += 5
~~~

- [[var]] (variable): ينفع تغيّر قيمته. النوع اتستنتج [[Int]].
- [[score += 5]] اختصار [[score = score + 5]]: خد القيمة الحالية (10) وزوّد 5 وحطها تاني. score بقت **15**.
- وفيه أخواتها: [[-=]] و [[*=]] و [[/=]]، و [[++]] (زوّد واحد).

---

## ٣. النوع مكتوب بإيدك

~~~kotlin
    val price: Double = 99.5
    val count = 3
    val total = price * count
~~~

- [[: Double]] بعد الاسم: «النوع ده بالظبط». الشكل دايمًا [[الاسم: النوع = القيمة]].
- [[count]] رقم صحيح من غير علامة عشرية، فبقى [[Int]].
- [[price * count]]: [[*]] ضرب. Double في Int الناتج Double: 99.5 × 3 = **298.5**.

---

## ٤. [[Long]] و [[_]]

~~~kotlin
    val population = 3_000_000_000L
~~~

- [[Int]] حجمه 32 bit، وأكبر قيمة فيه **2147483647** (حوالي ٢ مليار). طبعناها بـ [[println(Int.MAX_VALUE)]].
- ٣ مليار أكبر من كده، فالـ [[L]] في الآخر بتقول «ده [[Long]]» (64 bit، لحد حوالي ٩ × ١٠ أس ١٨).
- الـ [[_]] بين الأرقام للعين بس، المترجم بيشيلها: [[3_000_000_000]] هو [[3000000000]].

ولو عدّيت حد الـ Int مش هيقولك: [[Int.MAX_VALUE + 1]] طبعت **-2147483648**. الرقم «لفّ» للناحية التانية (ده اسمه overflow). عشان كده الأرقام الكبيرة [[Long]].

---

## ٥. [[Boolean]] و [[Char]]

~~~kotlin
    val isBig: Boolean = total > 200
    val letter = 'K'
~~~

- [[total > 200]] سؤال، إجابته [[true]] أو [[false]]. 298.5 أكبر من 200 فالقيمة [[true]]. النوع [[Boolean]].
- [['K']] بعلامة تنصيص واحدة = حرف واحد، نوعه [[Char]]. مش String.

---

## ٦. [[toInt()]]: من نص لرقم

~~~kotlin
    val age = "25".toInt()
~~~

[["25"]] نص (حرفين: 2 و 5)، مش رقم. [[.toInt()]] دالة على النص بتحوّله لـ [[Int]]. النقطة [[.]] معناها «نادي الدالة دي على القيمة اللي قبلي». فـ [[age + 1]] بعدين بتطلع **26** فعلًا.

---

## ٧. الطباعة

~~~kotlin
    println("$city $score $total $population $isBig $letter")
    println(age + 1)
~~~

~~~text الناتج
Cairo 15 298.5 3000000000 true K
26
~~~

لاحظ: [[population]] اتطبع من غير [[_]] ومن غير [[L]]: دول في الكود بس.

---

## ٨. فخ القسمة

~~~kotlin
    println(7 / 2)
    println(7 / 2.0)
~~~

~~~text الناتج
3
3.5
~~~

- [[7 / 2]]: الاتنين [[Int]]، فالناتج [[Int]]، والكسر بيترمي (مش بيتقرّب: 3.5 بقت 3).
- [[7 / 2.0]]: واحد منهم [[Double]]، فالحساب كله بقى Double.

---

## ٩. الأخطاء (جربناهم)

**تغيّر [[val]]** (شيلنا [[//]] من قدام [[city = "Giza"]]):

~~~text الناتج
e3a.kt:3:5: error: 'val' cannot be reassigned.
    city = "Giza"
    ^^^^
~~~

**تحط Double في Int** (من التجربة):

~~~text الناتج
e3b.kt:3:13: error: assignment type mismatch: actual type is 'Double', but 'Int' was expected.
    balance = 50.5
            ^
~~~

[[balance]] اتحدد [[Int]] من أول قيمة (1000)، والنوع مبيتغيرش أبدًا.

**[[1 + "2"]]:**

~~~text الناتج
e3c.kt:3:15: error: none of the following candidates is applicable:

fun plus(other: Int): Int:
  Argument type mismatch: actual type is 'String', but 'Int' was expected.

fun plus(other: Byte): Int:
  Argument type mismatch: actual type is 'String', but 'Byte' was expected.

fun plus(other: Short): Int:
  Argument type mismatch: actual type is 'String', but 'Short' was expected.

fun plus(other: Long): Long:
  Argument type mismatch: actual type is 'String', but 'Long' was expected.

fun plus(other: Float): Float:
  Argument type mismatch: actual type is 'String', but 'Float' was expected.

fun plus(other: Double): Double:
  Argument type mismatch: actual type is 'String', but 'Double' was expected.
    println(1 + "2")
              ^
~~~

الرسالة طويلة بس معناها بسيط: [[+]] في Kotlin دالة اسمها [[plus]]، والـ Int عنده ٦ نسخ منها كلها بتاخد أرقام، ومفيش واحدة بتاخد String. أما [["1" + 2]] فشغالة وطبعت [[12]]: الـ String عنده [[plus]] بتاخد أي حاجة وتحوّلها نص.

**[["abc".toInt()]]** (بيترجم عادي، ويقع وهو شغال):

~~~text الناتج
Exception in thread "main" java.lang.NumberFormatException: For input string: "abc"
	at java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:67)
	at java.base/java.lang.Integer.parseInt(Integer.java:662)
	at java.base/java.lang.Integer.parseInt(Integer.java:778)
	at E3dKt.main(e3d.kt:3)
	at E3dKt.main(e3d.kt)
~~~

- [[Exception]] = غلط حصل **وقت التشغيل** (مش المترجم). [[NumberFormatException]] = «النص ده مش رقم».
- السطور [[at]]: [[toInt]] من جوه بتنادي [[Integer.parseInt]] بتاعة Java، وهي اللي وقعت. السطر بتاعك هو [[e3d.kt:3]].
- [["abc".toIntOrNull()]] بدلها طبعت [[null]] من غير ما تقع (درس null safety).

---

## ١٠. التجربة: ليه [[105.00000000000001]]؟

~~~text ناتج الـ solCode
750
105.00000000000001
50
~~~

750 × 0.14 المفروض 105. بس الـ [[Double]] بيخزن الأرقام بالنظام الثنائي، و 0.14 مبتتكتبش فيه بالظبط (زي ما ⅓ مبتتكتبش بالعشري بالظبط: 0.333...). فبيطلع فرق صغير جدًا. نفس الحكاية: [[0.1 + 0.2]] طبعت [[0.30000000000000004]]. للعرض استخدم [["%.2f".format(x)]]، وللفلوس احسب بالقروش كـ Long.

---

## الخلاصة

| النوع | مثال | ملاحظة |
|---|---|---|
| [[Int]] | [[3]] | لحد 2147483647 |
| [[Long]] | [[3_000_000_000L]] | [[L]] في الآخر |
| [[Double]] | [[99.5]] | كسور بالتقريب |
| [[Boolean]] | [[true]] | نتيجة مقارنة |
| [[Char]] | [['K']] | حرف واحد |
| [[String]] | [["Cairo"]] | نص |

- [[val]] الأول دايمًا، و [[var]] لما تحتاج تغيّر فعلًا.
- النوع بيتحدد مرة واحدة (من القيمة أو بـ [[: Type]]) ومبيتغيرش.
- [[Int / Int]] بيرمي الكسر. والتحويل بإيدك: [[toInt()]] و [[toDouble()]] و [[toString()]].`,
          lines: [
            R`بداية [[main]].`,
            R`[[val]] نصي: Kotlin استنتجت إنه String.`,
            R`[[var]] لأننا هنغيّره.`,
            R`[[+=]] يعني score = score + 5، فبقى 15.`,
            R`النوع مكتوب صريح بعد [[:]].`,
            R`Int (استنتاج).`,
            R`Double في Int بيطلّع Double: 298.5.`,
            R`رقم أكبر من Int، فـ [[L]] بتخليه Long. و [[_]] للقراية بس.`,
            R`مقارنة نتيجتها Boolean.`,
            R`حرف واحد ([[Char]]) بين [[' ']].`,
            R`[[toInt()]] بتحوّل النص لرقم.`,
            R`كل القيم جوه نص واحد بـ [[$]].`,
            "26: بقى رقم فعلًا فبيتجمع.",
            "قسمة صحيحة: 3.",
            "لو واحد منهم عشري: 3.5.",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[Cairo 15 298.5 3000000000 true K]]
[[26]]
[[3]]
[[3.5]]

وحل التجربة: الرصيد 750، والضريبة بتطلع [[105.00000000000001]] مش 105.0 بالظبط: الـ Double بيخزن الكسور بالتقريب (0.14 مبتتكتبش بالظبط في النظام الثنائي)، وعشان كده الفلوس الحقيقية بتتحسب بالقروش كـ Long أو بـ [[BigDecimal]]. و [[balance = 50.5]] بتطلّع [[assignment type mismatch: actual type is 'Double', but 'Int' was expected]] لأن balance بقى Int من أول قيمة. و [["42".toInt() + 8]] بتطلّع 50.`,
          solCode: R`fun main() {
    var balance = 1000
    balance -= 250
    println(balance)
    val rate = 0.14
    println(balance * rate)
    println("42".toInt() + 8)
}`
        },
        {
          cmd: "string templates",
          title: "تحط قيم وحسابات جوه النص إزاي؟ ($ و $__{} والنص متعدد السطور)",
          desc: R`بدل ما تلزق النصوص بـ [[+]]، Kotlin بتخليك تحط القيمة جوه النص على طول. ده اسمه [[string template]]:
• [[$name]]: قيمة متغير.
• [[$__{expression}]]: أي حساب أو نداء دالة. الأقواس [[{ }]] لازمة لما يبقى فيه نقطة أو عملية: [["$__{items.size}"]] و [["$__{a + b}"]].

لو كتبت [["$items.size"]] من غير الأقواس، Kotlin هتحط قيمة items كلها وبعدها الكلام ".size" زي ما هو. ولو عايز علامة [[$]] نفسها تظهر في النص اكتب [[\$]].

النص متعدد السطور بيتكتب بين [["""]] (تلات علامات). جواه السطور بتفضل زي ما هي، والـ templates شغالة. و [[trimIndent()]] بتشيل المسافات اللي على الشمال اللي انت حاططها عشان الكود يبقى مرتب.

ولتنسيق الأرقام: [["%.2f".format(price)]] بتطلّع الرقم برقمين بعد العلامة العشرية.`,
          example: R`fun main() {
    val name = "Sara"
    val items = listOf("قلم", "كشكول")
    println("أهلًا $name")
    println("عندك $__{items.size} حاجات")
    println("الاسم فيه $__{name.length} حروف")
    val price = 12.5
    println("السعر: $__{"%.2f".format(price)} جنيه")
    println("ده مش متغير: \$name")
    val receipt = """
        العميل: $name
        المنتجات: $__{items.joinToString("، ")}
    """.trimIndent()
    println(receipt)
}`,
          try: R`اعمل متغيرين [[product = "شاحن"]] و [[qty = 3]] و [[unitPrice = 85.0]]، واطبع جملة واحدة: «اشتريت 3 شاحن بـ 255.0 جنيه» والحساب جوه النص نفسه. بعدين اعمل نص متعدد السطور فيه فاتورة صغيرة بـ [["""]].`,
          flag: "script",
          deep: {
            why: R`في Android هتبني نصوص طول الوقت: «عندك 3 رسايل»، «أهلًا يا سارة»، رابط API فيه رقم. الـ template أوضح وأقل غلط من [["عندك " + count + " رسايل"]] اللي بتنسى فيها مسافة.`,
            how: R`المترجم بيحوّل الـ template لـ [[StringBuilder]] بيلزق الأجزاء، يعني مفيش أي سعر في الأداء عن [[+]].

[[joinToString(separator)]] بتحوّل List لنص واحد وبين كل عنصر والتاني الفاصل اللي تختاره. ولها [[prefix]] و [[postfix]] و [[transform]] كمان.

في Android الحقيقي النصوص اللي بتظهر للمستخدم مكانها [[res/values/strings.xml]] مش الكود، عشان الترجمة. وهناك بتستخدم [[%1$s]] و [[%1$d]] بدل الـ templates: [[stringResource(R.string.welcome, name)]]. هتشوفه في درس الـ resources.`,
            when: "أي نص فيه قيمة متغيرة: رسايل، logs، روابط. والـ raw string لنصوص طويلة زي SQL أو JSON في الاختبارات أو regex (لأن \\ جواه مش محتاجة تتكرر).",
            mistakes: R`تنسى [[{ }]] حوالين عملية: [["$a + $b"]] بتطبع «2 + 3» مش 5. و [["$user.name"]] بتطبع user كله وبعده ".name". وتنسى [[trimIndent()]] فالفاتورة تطلع بمسافات غريبة على الشمال.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيبني نصوص فيها قيم متغيرات وحسابات ونداء دوال، من غير ما يلزق حاجة بـ [[+]]، وفي الآخر بيعمل فاتورة من كذا سطر. اتشغّل في [[docker run --rm eclipse-temurin:21-jdk]] مع Kotlin 2.4.20.

---

## ١. القيم اللي هنستخدمها

~~~kotlin
    val name = "Sara"
    val items = listOf("قلم", "كشكول")
~~~

- [[name]] نص.
- [[listOf(...)]] بتعمل List فيها العناصر اللي بين القوسين بالترتيب (ليها درس في المجموعات). المهم دلوقتي إن عندها [[size]] (العدد).

---

## ٢. [[$name]]: متغير لوحده

~~~kotlin
    println("أهلًا $name")
~~~

~~~text الناتج
أهلًا Sara
~~~

[[$]] جوه [[" "]] معناها: «اللي بعدي اسم متغير، حط قيمته هنا». Kotlin بتاخد أطول اسم صالح بعد الـ [[$]] (حروف وأرقام و [[_]]) وتقف عند أول حاجة مش منه، زي المسافة.

---

## ٣. [[$__{ }]]: أي expression

~~~kotlin
    println("عندك $__{items.size} حاجات")
    println("الاسم فيه $__{name.length} حروف")
~~~

~~~text الناتج
عندك 2 حاجات
الاسم فيه 4 حروف
~~~

- [[$__{ ... }]]: كل اللي جوه الأقواس بيتحسب الأول، والنتيجة بتتحط في النص.
- [[items.size]]: النقطة [[.]] معناها «هات من items الخاصية size». عدد العناصر 2.
- [[name.length]]: عدد الحروف في "Sara" = 4.

**ليه الأقواس لازمة هنا؟** جربنا من غيرها:

~~~kotlin
    println("$items.size")
~~~

~~~text الناتج
[قلم, كشكول].size
~~~

[[$items]] بتقف عند النقطة (النقطة مش جزء من اسم)، فاتطبعت الـ List كلها، وبعدها [[.size]] كنص عادي. ونفس الحاجة مع الحساب:

~~~kotlin
    val a = 2
    val b = 3
    println("$a + $b")
    println("$__{a + b}")
~~~

~~~text الناتج
2 + 3
5
~~~

---

## ٤. نداء دالة جوه النص: [["%.2f".format(price)]]

~~~kotlin
    val price = 12.5
    println("السعر: $__{"%.2f".format(price)} جنيه")
~~~

~~~text الناتج
السعر: 12.50 جنيه
~~~

فكّها من جوه لبرة:
1. [["%.2f"]] نص اسمه **format string**: [[%]] = «هنا هتيجي قيمة»، و [[.2]] = «رقمين بعد العلامة العشرية»، و [[f]] = float (رقم عشري).
2. [[.format(price)]] بتحط price مكان [[%.2f]]: 12.5 بقت [["12.50"]]. (جربنا [["%.1f".format(3.14159)]] وطلعت [[3.1]].)
3. [[$__{...}]] بتحط النتيجة جوه الجملة.

لاحظ إن جوه [[$__{ }]] ينفع تكتب [[" "]] تانية عادي من غير ما تقفل النص الكبير.

---

## ٥. [[\$]]: علامة الدولار نفسها

~~~kotlin
    println("ده مش متغير: \$name")
~~~

~~~text الناتج
ده مش متغير: $name
~~~

الـ [[\]] (backslash) قبل حرف اسمها **escape**: «الحرف اللي بعدي اعتبره حرف عادي مش ليه معنى خاص». ومن نفس العيلة [[\n]] (سطر جديد) و [[\"]] (علامة تنصيص جوه النص).

---

## ٦. النص متعدد السطور [["""]]

~~~kotlin
    val receipt = """
        العميل: $name
        المنتجات: $__{items.joinToString("، ")}
    """.trimIndent()
    println(receipt)
~~~

~~~text الناتج
العميل: Sara
المنتجات: قلم، كشكول
~~~

حتة حتة:
- [["""]] تلات علامات = **raw string**: النص بيكمّل لحد [["""]] التانية، والسطور الجديدة جواه بتفضل زي ما هي. والـ templates شغالة جواه عادي.
- [[items.joinToString("، ")]]: بتحوّل الـ List لنص واحد، وبين كل عنصر والتاني الفاصل اللي اديته (هنا «، »). من غيرها كانت هتطبع [[[قلم, كشكول]]] بالأقواس.
- [[.trimIndent()]]: بتشيل السطر الفاضي اللي في الأول والآخر، وبتشيل المسافات اللي على الشمال **المشتركة** بين كل السطور (هنا ٨ مسافات).

جربنا من غير [[trimIndent()]] (بنص تاني فيه سطرين) وطبعنا [[---]] بعده:

~~~text الناتج

        العميل: Sara
        المنتجات: 2

---
~~~

أول سطر فاضي: ده السطر الجديد اللي بعد [["""]] الأولى. وكمان المسافات قبل كل سطر، والسطر الأخير اللي فيه ٤ مسافات بس، كلهم اتطبعوا. ده اللي [[trimIndent()]] بتنضّفه.

---

## ٧. التجربة

~~~text ناتج الـ solCode
اشتريت 3 شاحن بـ 255.0 جنيه
المنتج: شاحن
الكمية: 3
الإجمالي: 255.0
~~~

[[qty * unitPrice]] = Int × Double، فالناتج Double: [[255.0]] (Kotlin بتطبع الـ Double دايمًا بعلامة عشرية). ولو عايزها [[255]] استخدم [["%.0f".format(...)]] أو اعمل الأسعار Int.

---

## الخلاصة

| تكتب | بيطلع |
|---|---|
| [["$name"]] | قيمة المتغير |
| [["$__{a + b}"]] | نتيجة الحساب |
| [["$__{list.size}"]] | أي حاجة فيها نقطة لازم أقواس |
| [["\$"]] | علامة [[$]] نفسها |
| [["%.2f".format(x)]] | رقم برقمين عشريين |
| [["""...""".trimIndent()]] | نص سطور من غير مسافات الكود |

- [["$a + $b"]] بتطبع «2 + 3» مش 5: الحساب لازم جوه [[$__{ }]].`,
          lines: [
            R`بداية [[main]].`,
            "متغير نصي.",
            R`List فيها عنصرين ([[listOf]] هنشرحها في درس المجموعات).`,
            R`[[$name]] بتتبدل بـ Sara.`,
            R`[[$__{}]] عشان فيه نقطة: عدد العناصر 2.`,
            "طول النص: 4 حروف.",
            "رقم عشري.",
            R`template جواه نداء دالة: بيطلّع 12.50.`,
            R`[[\$]] بتطبع علامة الدولار نفسها.`,
            R`بداية نص متعدد السطور بـ [["""]].`,
            "سطر فيه متغير.",
            R`سطر فيه دالة بتلزق العناصر بفاصلة.`,
            R`قفلة النص و [[trimIndent()]] بتشيل المسافات اللي على الشمال.`,
            "طباعة الفاتورة.",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[أهلًا Sara]]
[[عندك 2 حاجات]]
[[الاسم فيه 4 حروف]]
[[السعر: 12.50 جنيه]]
[[ده مش متغير: $name]]
[[العميل: Sara]]
[[المنتجات: قلم، كشكول]]

وحل التجربة تحت. الحساب [[$__{qty * unitPrice}]] لازم يبقى بين أقواس، والنتيجة 255.0.`,
          solCode: R`fun main() {
    val product = "شاحن"
    val qty = 3
    val unitPrice = 85.0
    println("اشتريت $qty $product بـ $__{qty * unitPrice} جنيه")
    val bill = """
        المنتج: $product
        الكمية: $qty
        الإجمالي: $__{qty * unitPrice}
    """.trimIndent()
    println(bill)
}`
        }
      ]
    }
  ]
});
