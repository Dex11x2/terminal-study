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
    },
    {
      t: "القرارات والتكرار والدوال",
      l: 1,
      n: "if و when بيرجّعوا قيمة، والـ ranges والـ loops، والدوال بقيم افتراضية وأسماء",
      items: [
        {
          cmd: "if و when",
          title: "if و when في Kotlin بيرجّعوا قيمة: إزاي تختار بين حالات كتير؟",
          desc: R`[[if (شرط) { ... } else { ... }]] زي أي لغة: لو الشرط [[true]] بينفذ أول block، وإلا التاني. الفرق في Kotlin إن [[if]] «تعبير» ([[expression]]) بيرجّع قيمة، فتكتب:
[[val result = if (score >= 50) "ناجح" else "راسب"]]
وعشان كده مفيش في Kotlin الـ ternary [[? :]] بتاع Java و JavaScript، مش محتاجينه.

[[when]] هو البديل الأقوى لـ switch. ليه شكلين:
• [[when (x) { ... }]]: بيقارن x بكل فرع. الفرع بيتكتب [[قيمة -> نتيجة]]، والسهم [[->]] معناه «لو ده، يبقى ده». تقدر تحط كذا قيمة بفاصلة [["fri", "sat" -> ...]]، أو range [[in 1..5 -> ...]]، أو نوع [[is String -> ...]].
• [[when { ... }]] من غير قيمة: كل فرع شرط لوحده، وأول شرط [[true]] هو اللي بيكسب. ده بديل سلسلة [[else if]].

[[else]] هو الفرع الافتراضي. ولما تستخدم when كقيمة (على يمين [[=]])، لازم يبقى فيه [[else]] أو تكون غطيت كل الحالات (هتشوف ده مع enum و sealed).

ومعاملات المنطق: [[&&]] (و)، [[||]] (أو)، [[!]] (مش). والمقارنة [[==]] بتقارن القيمة، حتى للنصوص.`,
          example: R`fun main() {
    val score = 73
    val result = if (score >= 50) "ناجح" else "راسب"
    println(result)
    // when من غير قيمة: أول شرط صح يكسب
    val grade = when {
        score >= 85 -> "امتياز"
        score >= 75 -> "جيد جدًا"
        score >= 65 -> "جيد"
        score >= 50 -> "مقبول"
        else -> "راسب"
    }
    println("$score: $grade")
    // when بقيمة: بيقارنها بكل فرع
    val day = "fri"
    val type = when (day) {
        "fri", "sat" -> "أجازة"
        "sun" -> "أول الأسبوع"
        else -> "يوم شغل"
    }
    println(type)
    val items = 7
    val size = when (items) {
        0 -> "فاضية"
        in 1..5 -> "صغيرة"
        else -> "كبيرة"
    }
    println(size)
}`,
          try: R`اكتب دالة [[shipping(total: Int, city: String): Int]] ترجّع مصاريف الشحن: 0 لو الطلب 1000 أو أكتر، و 30 لو المدينة "cairo" أو "giza"، و 60 غير كده. استخدم [[when]] من غير قيمة. وجرّبها على (1200, "aswan") و (300, "giza") و (300, "aswan").`,
          flag: "script",
          deep: {
            why: R`في Android هتحوّل حالات لحاجة على الشاشة طول الوقت: حالة الطلب لنص ولون، نوع الرسالة لأيقونة، حالة التحميل لـ spinner أو error أو داتا. [[when]] هو الأداة الأساسية لده، ومع sealed classes المترجم بيتأكد إنك مانسيتش حالة.`,
            how: R`الفروع بتتفحص من فوق لتحت، وأول واحد يتحقق بيتنفذ والباقي بيتنط (مفيش fall-through ولا break زي switch في Java). عشان كده في [[when { }]] رتّب الشروط من الأضيق للأوسع: لو [[score >= 50]] جت الأول، الـ 90 هتطلع «مقبول».

الفرع ممكن يبقى block: [[1 -> { println("x"); "واحد" }]]، وقيمته آخر سطر فيه.

[[in 1..5]] بيسأل «هل القيمة جوه الـ range ده؟»، و [[!in]] العكس. و [[is String]] بيسأل عن النوع، ولو اتحقق المترجم بيعاملها كـ String جوه الفرع على طول (smart cast).

ومن Kotlin 2.2 فيه guard conditions: [[is Int if x > 0 -> ...]] تضيف شرط على الفرع.`,
            when: R`[[if]] لقرار بين حالتين. [[when]] من تلاتة وطالع، أو لما تقارن قيمة واحدة بحاجات كتير.`,
            mistakes: R`تكتب [[when]] كقيمة من غير [[else]] فالمترجم يقول [['when' expression must be exhaustive]]. وترتيب شروط غلط (الأوسع الأول). وتكتب [[if (x = 5)]]: Kotlin مش هتقبلها أصلًا (الـ assignment مش expression)، اكتب [[==]].`
          },
          teach: R`## البرنامج بيعمل إيه؟

بياخد درجة (73) ويقرر ناجح ولا راسب بـ [[if]]، ويحوّلها لتقدير بـ [[when]] من غير قيمة، وبعدين يستخدم [[when]] بقيمة مرتين: مع نص (اليوم) ومع رقم وrange (عدد العناصر). اتشغّل في [[docker run --rm eclipse-temurin:21-jdk]] مع Kotlin 2.4.20.

---

## ١. [[if]] بيرجّع قيمة

~~~kotlin
    val score = 73
    val result = if (score >= 50) "ناجح" else "راسب"
    println(result)
~~~

اقراها كده:
1. [[(score >= 50)]]: الشرط بين أقواس، ولازم نتيجته [[Boolean]]. [[>=]] = «أكبر من أو يساوي». 73 >= 50 → [[true]].
2. لو [[true]]: قيمة الـ if كلها [["ناجح"]]. لو [[false]]: اللي بعد [[else]].
3. القيمة دي بتتحط في [[result]].

~~~text الناتج
ناجح
~~~

في Java كنت هتكتب [[score >= 50 ? "ناجح" : "راسب"]]. Kotlin مفيهاش [[? :]] دي، لأن الـ [[if]] نفسه بيعمل نفس الشغل.

وعلامات المقارنة كلها: [[==]] (يساوي) و [[!=]] (مش يساوي) و [[<]] و [[>]] و [[<=]] و [[>=]].

---

## ٢. [[when { }]] من غير قيمة

~~~kotlin
    val grade = when {
        score >= 85 -> "امتياز"
        score >= 75 -> "جيد جدًا"
        score >= 65 -> "جيد"
        score >= 50 -> "مقبول"
        else -> "راسب"
    }
~~~

- كل سطر **فرع**: [[شرط -> نتيجة]]. السهم [[->]] بيفصل الشرط عن قيمته.
- Kotlin بتفحص من فوق لتحت، وأول شرط [[true]] بيكسب، والباقي مبيتفحصش خالص.

مع [[score = 73]]:

| الفرع | 73؟ | |
|---|---|---|
| [[score >= 85]] | false | كمّل |
| [[score >= 75]] | false | كمّل |
| [[score >= 65]] | **true** | خد «جيد» واقف |
| [[score >= 50]] | (مبيتفحصش) | |

~~~kotlin
    println("$score: $grade")
~~~

~~~text الناتج
73: جيد
~~~

### الترتيب فارق

جربنا نفس الفكرة بس [[score >= 50]] الأول ودرجة 90:

~~~kotlin
    val score = 90
    val grade = when {
        score >= 50 -> "مقبول"
        score >= 85 -> "امتياز"
        else -> "راسب"
    }
~~~

~~~text الناتج
مقبول
~~~

90 >= 50 صح، فكسب أول فرع، و «امتياز» عمرها ما هتتوصل. القاعدة: الأضيق الأول.

---

## ٣. [[when (day)]] بقيمة

~~~kotlin
    val day = "fri"
    val type = when (day) {
        "fri", "sat" -> "أجازة"
        "sun" -> "أول الأسبوع"
        else -> "يوم شغل"
    }
    println(type)
~~~

- [[when (day)]]: القيمة بين القوسين بتتقارن بـ [[==]] مع كل فرع.
- [["fri", "sat"]]: قيمتين في فرع واحد بفاصلة، يعني «fri **أو** sat».
- [[else]]: لو ولا فرع اتطابق.

~~~text الناتج
أجازة
~~~

ومفيش [[break]] زي switch في Java: الفرع اللي اتطابق بيتنفذ والـ when بيخلص.

---

## ٤. [[in 1..5]] جوه when

~~~kotlin
    val items = 7
    val size = when (items) {
        0 -> "فاضية"
        in 1..5 -> "صغيرة"
        else -> "كبيرة"
    }
    println(size)
~~~

- [[0 ->]]: يساوي صفر بالظبط؟
- [[in 1..5 ->]]: [[1..5]] range (من 1 لـ 5 والـ 5 داخلة، ليها درس جاي)، و [[in]] بتسأل «القيمة جوه الـ range ده؟».
- 7 مش صفر ومش من 1 لـ 5، فـ [[else]].

~~~text الناتج
كبيرة
~~~

---

## ٥. حاجات تانية الفرع يقدر يعملها (جربناها)

~~~kotlin
    val x: Any = "hello"
    val d = when (x) {
        is String -> "نص طوله $__{x.length}"
        else -> "حاجة تانية"
    }
~~~

~~~text الناتج
نص طوله 5
~~~

- [[Any]] = «أي نوع». [[is String]] بتسأل عن **النوع**. ولما الفرع يتحقق، المترجم بيعامل x كـ String جواه، فـ [[x.length]] اشتغلت من غير تحويل. ده اسمه **smart cast**.
- والفرع ممكن يبقى block بين [[{ }]] وقيمته آخر سطر فيه: [[1 -> { println("x"); "واحد" }]] (الـ [[;]] هنا عشان أمرين على سطر واحد).

ومن Kotlin 2.2 فيه **guard**: شرط زيادة على الفرع بـ [[if]]. جربناها على 2.4.20:

~~~kotlin
fun describe(x: Any) = when (x) {
    is Int if x > 0 -> "رقم موجب"
    is Int -> "رقم"
    else -> "حاجة تانية"
}
~~~

~~~text الناتج: describe(5) و describe(-5) و describe("x")
رقم موجب
رقم
حاجة تانية
~~~

---

## ٦. الأخطاء (جربناهم)

**[[when]] كقيمة من غير [[else]]:**

~~~text الناتج
e5a.kt:3:16: error: 'when' expression must be exhaustive. Add an 'else' branch.
    val type = when (day) {
               ^^^^
~~~

[[exhaustive]] = «مغطّي كل الاحتمالات». الـ when على يمين [[=]] لازم يرجّع قيمة دايمًا، ونص زي day ممكن يبقى أي حاجة، فلازم [[else]].

**[[if (x = 5)]] بدل [[==]]:**

~~~text الناتج
e5b.kt:3:9: error: only expressions are allowed in this context.
    if (x = 5) println(x)
        ^^^^^
~~~

[[=]] في Kotlin تعيين (assignment) ومش بيرجّع قيمة، فمينفعش يبقى شرط. ده بيمنع غلطة مشهورة في C و Java و JavaScript.

---

## ٧. التجربة

~~~text ناتج الـ solCode
0
30
60
~~~

- [[fun shipping(...): Int = when { ... }]]: دالة جسمها when واحد (درس الدوال بيشرح [[=]] دي).
- [[city.lowercase()]]: حروف صغيرة، عشان "Giza" و "giza" يبقوا زي بعض.
- [[in listOf("cairo", "giza")]]: [[in]] على List بتسأل «موجود فيها؟».

---

## الخلاصة

| الشكل | إمتى |
|---|---|
| [[if (c) a else b]] | حالتين، وكمان بيرجّع قيمة |
| [[when { c1 -> ...; c2 -> ... }]] | سلسلة شروط، أول [[true]] يكسب |
| [[when (x) { 1, 2 -> ... }]] | مقارنة قيمة واحدة بحاجات كتير |
| [[in 1..5 ->]] | جوه range |
| [[is String ->]] | نوع، ومعاه smart cast |
| [[else ->]] | لازم لما when قيمة ومش مغطّي كل حاجة |

- الترتيب: من الأضيق للأوسع. ومفيش break ولا fall-through.`,
          lines: [
            R`بداية [[main]].`,
            "الـ input.",
            R`[[if]] بيرجّع قيمة على طول في المتغير.`,
            "ناجح.",
            R`[[when]] من غير قيمة، ونتيجته بتتحط في grade.`,
            "73 مش أكبر من 85، يتنط.",
            "ولا 75.",
            R`73 >= 65: ده اللي كسب.`,
            "مش هيتفحص خلاص.",
            R`[[else]]: لو ولا شرط نفع.`,
            "قفلة when.",
            "73: جيد.",
            "القيمة اللي هنقارنها.",
            R`[[when (day)]]: بيقارن day بكل فرع.`,
            R`قيمتين في فرع واحد بفاصلة: ده اللي اتطابق.`,
            "قيمة تانية.",
            "الافتراضي.",
            "قفلة when.",
            "أجازة.",
            "عدد العناصر.",
            "when على رقم.",
            "قيمة بالظبط.",
            R`[[in 1..5]]: لو جوه الـ range.`,
            "غير كده.",
            "قفلة when.",
            "كبيرة.",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[ناجح]]
[[73: جيد]]
[[أجازة]]
[[كبيرة]]

وحل التجربة: (1200, "aswan") بـ 0، و (300, "giza") بـ 30، و (300, "aswan") بـ 60. شرط الـ 1000 لازم ييجي الأول، وإلا طلب القاهرة بـ 1200 هيدفع 30 وهو المفروض مجاني. و [[lowercase()]] عشان "Giza" بحرف كبير تتحسب.`,
          solCode: R`fun shipping(total: Int, city: String): Int = when {
    total >= 1000 -> 0
    city.lowercase() in listOf("cairo", "giza") -> 30
    else -> 60
}

fun main() {
    println(shipping(1200, "aswan"))
    println(shipping(300, "giza"))
    println(shipping(300, "aswan"))
}`
        },
        {
          cmd: "ranges و loops",
          title: "تكرر كود إزاي؟ (for و ranges بـ .. و until و downTo و step، و while و repeat)",
          desc: R`الـ [[range]] مدى أرقام من لحد:
• [[1..5]]: من 1 لـ 5 والـ 5 داخلة. علامة [[..]] معناها «لحد وشامل».
• [[0..<5]] أو [[0 until 5]]: من 0 لـ 4 (الـ 5 مش داخلة). مفيد مع الـ indexes لأنها بتبدأ من 0.
• [[10 downTo 1]]: بالعكس.
• [[step 2]]: نط اتنين اتنين: [[0..10 step 2]].

[[for (i in 1..5) { ... }]] بتعدّي على كل قيمة. وكلمة [[in]] نفسها بتسأل سؤال: [[5 in 1..10]] بترجّع [[true]].

وتقدر تعدّي على List على طول: [[for (name in names)]]. ولو محتاج الـ index كمان: [[for ((i, name) in names.withIndex())]]. الأقواس الجوانية [[(i, name)]] اسمها destructuring: بتفك كل عنصر لقيمتين.

[[while (شرط) { ... }]] بتكرر طول ما الشرط صح، ومفيدة لما مش عارف هتلف كام مرة. و [[repeat(3) { ... }]] بتكرر عدد مرات، ورقم اللفة جواها اسمه [[it]] (هتعرف [[it]] بالتفصيل في درس الـ lambdas).

[[break]] بتخرج من الـ loop، و [[continue]] بتنط للفة الجاية.`,
          example: R`fun main() {
    for (i in 1..3) print("$i ")
    println()
    for (i in 0..<3) print("$i ")
    println()
    for (i in 10 downTo 0 step 5) print("$i ")
    println()
    val fruits = listOf("تفاح", "موز", "مانجا")
    for ((index, fruit) in fruits.withIndex()) {
        println("$index: $fruit")
    }
    var tries = 0
    while (tries < 3) {
        tries++
    }
    println("tries = $tries")
    repeat(2) { println("لفة رقم $it") }
    println(5 in 1..10)
}`,
          try: R`اطبع جدول ضرب الـ 7 من 1 لـ 10 بـ for. بعدين اطبع الأرقام الزوجية من 20 لـ 0 بالعكس في سطر واحد. وفي الآخر اجمع الأرقام من 1 لـ 100 في [[var sum]] واطبعه.`,
          flag: "script",
          deep: {
            why: R`أي List على الشاشة، وأي حساب على كذا عنصر، وأي محاولة تتكرر (زي إعادة طلب للسيرفر) محتاجين تكرار. بس في Kotlin هتلاحظ إنك بتكتب for أقل من لغات تانية، لأن دوال زي [[map]] و [[filter]] و [[sumOf]] بتعمل أغلب الشغل (درس جاي).`,
            how: R`[[1..5]] بيعمل object من نوع [[IntRange]] فيه أول وآخر قيمة بس، مش List فيها الأرقام كلها، فـ [[1..1_000_000]] مش بياكل ذاكرة. والمترجم بيحوّل [[for (i in 1..n)]] لـ loop عادية زي Java بالظبط.

[[0..<n]] ظهرت في Kotlin 1.9 وهي نفس [[0 until n]]. و [[list.indices]] بترجّع [[0..<list.size]] جاهزة.

ولو عندك loops جوه بعض وعايز تخرج من الاتنين: اعمل label [[outer@ for (...)]] واكتب [[break@outer]]. علامة [[@]] هنا اسم للـ loop.

و [[do { } while (شرط)]] زي while بس بتتنفذ مرة على الأقل قبل ما تفحص.`,
            when: R`[[for]] لما عارف هتعدّي على إيه. [[while]] لما مستني حاجة تحصل. [[repeat]] لعدد مرات ثابت.`,
            mistakes: R`[[for (i in 0..list.size)]] بتعدّي آخر index وتقع بـ [[IndexOutOfBoundsException]]: استخدم [[0..<list.size]] أو [[list.indices]]. و [[for (i in 10..1)]] مبتلفش خالص (range فاضي)، محتاج [[downTo]]. و while شرطها مبيتغيرش جوه الـ loop فتلف للأبد.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيلف بـ [[for]] على ٣ أنواع ranges، وعلى List ومعاها الـ index، وبعدين [[while]] و [[repeat]]، وفي الآخر يسأل بـ [[in]]. اتشغّل في [[docker run --rm eclipse-temurin:21-jdk]] مع Kotlin 2.4.20.

---

## ١. [[for (i in 1..3)]]

~~~kotlin
    for (i in 1..3) print("$i ")
    println()
~~~

اقراها: «لكل [[i]] جوه [[1..3]]، اطبع i وبعده مسافة».

| الحتة | معناها |
|---|---|
| [[for]] | كرّر |
| [[i]] | اسم بتختاره انت، بياخد قيمة جديدة كل لفة. مش محتاج [[val]] ولا [[var]] |
| [[in]] | «جوه» |
| [[1..3]] | range: 1 و 2 و 3. علامة [[..]] = «لحد، وشامل» |
| [[print("$i ")]] | جسم الـ loop. سطر واحد فمش محتاج [[{ }]] |

اللفات: i = 1 تطبع «1 »، i = 2 «2 »، i = 3 «3 ». وبعدين [[println()]] تقفل السطر.

~~~text الناتج
1 2 3
~~~

### الـ range نفسه إيه؟

جربنا [[println(1..5)]] وطبعت [[1..5]] بس، مش الأرقام. لأن [[1..5]] object نوعه [[kotlin.ranges.IntRange]] فيه البداية والنهاية بس، مش List. لو عايز الأرقام: [[(1..5).toList()]] طبعت [[[1, 2, 3, 4, 5]]].

---

## ٢. [[0..<3]]: من غير الآخر

~~~kotlin
    for (i in 0..<3) print("$i ")
    println()
~~~

~~~text الناتج
0 1 2
~~~

[[..<]] = «لحد، **من غير** الآخر». و [[0 until 3]] نفس الحاجة بالظبط (الشكل القديم). وطبعنا [[println(0..<3)]] فطلعت [[0..2]]: يعني هي range عادي آخره 2.

ليه مفيد؟ الـ List اللي فيها 3 عناصر الـ indexes بتاعتها 0 و 1 و 2، فـ [[0..<list.size]] هو المدى الصح بالظبط.

---

## ٣. [[10 downTo 0 step 5]]

~~~kotlin
    for (i in 10 downTo 0 step 5) print("$i ")
    println()
~~~

~~~text الناتج
10 5 0
~~~

- [[downTo]]: عدّ بالتنازل. [[10 downTo 0]] = 10، 9، ...، 0.
- [[step 5]]: كل خطوة ٥ بدل ١. فبقت 10 و 5 و 0.
- [[downTo]] و [[step]] مكتوبين بين القيم من غير نقطة وأقواس. دي دوال اسمها **infix**: [[10 downTo 0]] هي نفسها [[10.downTo(0)]].

---

## ٤. على List ومعاها الـ index

~~~kotlin
    val fruits = listOf("تفاح", "موز", "مانجا")
    for ((index, fruit) in fruits.withIndex()) {
        println("$index: $fruit")
    }
~~~

فكّها من جوه:
1. [[fruits.withIndex()]]: بيحوّل كل عنصر لزوج فيه رقمه وقيمته. طبعناها لـ List صغيرة ([[listOf("a","b")]]) وطلعت:

~~~text الناتج
[IndexedValue(index=0, value=a), IndexedValue(index=1, value=b)]
~~~

2. [[(index, fruit)]]: بدل ما تاخد الزوج كله في متغير واحد، الأقواس بتفكّه لاتنين. ده اسمه **destructuring**.
3. الجسم أكتر من سطر محتمل، فبين [[{ }]].

~~~text الناتج
0: تفاح
1: موز
2: مانجا
~~~

ولو مش محتاج الـ index: [[for (fruit in fruits)]] على طول.

---

## ٥. [[while]]

~~~kotlin
    var tries = 0
    while (tries < 3) {
        tries++
    }
    println("tries = $tries")
~~~

[[while (شرط)]]: افحص الشرط، لو [[true]] نفّذ الجسم وارجع افحص تاني. [[tries++]] = زوّد واحد (لازم [[var]]).

| اللفة | tries قبل | [[tries < 3]] | tries بعد |
|---|---|---|---|
| ١ | 0 | true | 1 |
| ٢ | 1 | true | 2 |
| ٣ | 2 | true | 3 |
| - | 3 | **false**: اخرج | |

~~~text الناتج
tries = 3
~~~

لو نسيت [[tries++]] الشرط هيفضل [[true]] للأبد، والبرنامج هيلف من غير ما يخلص.

---

## ٦. [[repeat]]

~~~kotlin
    repeat(2) { println("لفة رقم $it") }
~~~

~~~text الناتج
لفة رقم 0
لفة رقم 1
~~~

[[repeat(2)]] = «نفّذ اللي بين [[{ }]] مرتين». جوه الـ [[{ }]] رقم اللفة اسمه [[it]] جاهز من غير ما تعرّفه، وبيبدأ من **0**. (الـ [[{ }]] دي اسمها lambda، ليها درس.)

---

## ٧. [[in]] كسؤال

~~~kotlin
    println(5 in 1..10)
~~~

~~~text الناتج
true
~~~

نفس كلمة [[in]] اللي في for، بس برا الـ for بتبقى سؤال: «5 جوه من 1 لـ 10؟».

---

## ٨. [[break]] و [[continue]] والـ label (جربناهم)

~~~kotlin
    outer@ for (i in 1..3) {
        for (j in 1..3) {
            if (j == 2) continue
            if (i == 2) break@outer
            println("$i,$j")
        }
    }
~~~

~~~text الناتج
1,1
1,3
~~~

- [[continue]]: سيب اللفة دي وروح للي بعدها، فـ [[j = 2]] اتنطت.
- [[outer@]]: اسم حطيناه للـ loop البرانية. و [[break@outer]] خرجت من الاتنين مرة واحدة أول ما i بقت 2. من غير الـ label، [[break]] بتخرج من الجوانية بس.

---

## ٩. الأخطاء (جربناهم)

**range بالعكس من غير [[downTo]]:** [[for (i in 10..1) println(i)]] مطبعتش ولا حاجة ومفيش error: [[10..1]] range فاضي لأن البداية أكبر من النهاية.

**[[0..list.size]] بدل [[0..<list.size]]** مع List فيها 3 عناصر:

~~~text الناتج
a
b
c
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3
	at java.base/java.util.Arrays$ArrayList.get(Arrays.java:4266)
	at E6aKt.main(e6a.kt:15)
	at E6aKt.main(e6a.kt)
~~~

[[0..3]] فيها 4 أرقام، و آخر index موجود 2. فاللفة الرابعة طلبت [[list[3]]] ووقعت: [[Index 3 out of bounds for length 3]]. ([[ArrayIndexOutOfBoundsException]] نوع من [[IndexOutOfBoundsException]] اللي في الـ deep، طالع كده لأن [[listOf]] من جوه array.) الحل: [[0..<list.size]] أو [[list.indices]]، وطبعنا [[list.indices]] وطلعت [[0..2]].

---

## ١٠. التجربة

~~~text ناتج الـ solCode (أول وآخر سطر من الجدول)
7 × 1 = 7
...
7 × 10 = 70
20 18 16 14 12 10 8 6 4 2 0
5050
5050
~~~

- [[$__{7 * i}]]: حساب جوه النص لازم بين أقواس.
- [[20 downTo 0 step 2]]: الزوجي بالعكس.
- [[sum += n]] جوه for: بيجمّع 1 + 2 + ... + 100 = 5050. و [[(1..100).sum()]] بتعمل نفس الحكاية في سطر (الأقواس حوالين الـ range عشان [[.sum()]] تتنادى على الـ range كله مش على 100).

---

## الخلاصة

| تكتب | الأرقام |
|---|---|
| [[1..5]] | 1 2 3 4 5 |
| [[0..<5]] أو [[0 until 5]] | 0 1 2 3 4 |
| [[5 downTo 1]] | 5 4 3 2 1 |
| [[0..10 step 5]] | 0 5 10 |
| [[10..1]] | ولا حاجة (فاضي) |

- [[for (x in ...)]] لما عارف هتلف على إيه، [[while]] لحد ما شرط يتغير، [[repeat(n)]] لعدد ثابت و [[it]] من 0.
- الـ indexes من 0 لـ [[size - 1]]: استخدم [[..<]] أو [[indices]].`,
          lines: [
            R`بداية [[main]].`,
            R`من 1 لـ 3 شاملة: 1 2 3. والـ for من سطر واحد مش محتاجة [[{ }]].`,
            "ينزل سطر.",
            R`[[..<]]: من 0 لـ 2 (الـ 3 مش داخلة).`,
            "ينزل سطر.",
            R`بالعكس ونط 5: 10 5 0.`,
            "ينزل سطر.",
            "List فيها 3 فواكه.",
            R`[[withIndex()]] بتديك الـ index والقيمة، والـ destructuring بيفكهم.`,
            "يطبع الرقم والفاكهة.",
            "قفلة for.",
            R`عداد بـ [[var]].`,
            "طول ما أقل من 3.",
            R`[[++]] بتزوّد واحد.`,
            "قفلة while.",
            "3.",
            R`[[repeat]]: لفتين، و [[it]] رقم اللفة من 0.`,
            R`[[in]] بتسأل: 5 جوه الـ range؟ true.`,
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[1 2 3 ]]
[[0 1 2 ]]
[[10 5 0 ]]
[[0: تفاح]]
[[1: موز]]
[[2: مانجا]]
[[tries = 3]]
[[لفة رقم 0]]
[[لفة رقم 1]]
[[true]]

وحل التجربة تحت. مجموع 1 لـ 100 هو 5050. ولاحظ إن [[(1..100).sum()]] بتعمل نفس الحكاية في سطر.`,
          solCode: R`fun main() {
    for (i in 1..10) println("7 × $i = $__{7 * i}")
    for (n in 20 downTo 0 step 2) print("$n ")
    println()
    var sum = 0
    for (n in 1..100) sum += n
    println(sum)
    println((1..100).sum())
}`
        },
        {
          cmd: "الدوال",
          title: "الدوال في Kotlin: قيم افتراضية، وأسماء الـ arguments، ودالة في سطر واحد",
          desc: R`الدالة كود ليه اسم بتناديه لما تحتاجه:
[[fun greet(name: String): String { return "أهلًا يا $name" }]]
• [[fun]] بداية التعريف، وبعدها الاسم.
• جوه [[( )]] الـ parameters، وكل واحد [[الاسم: النوع]]. هنا لازم تكتب النوع، مفيش استنتاج.
• بعد القوس [[: String]] نوع القيمة اللي بترجع، و [[return]] بترجّعها.

لو الدالة مبترجّعش حاجة (بتطبع مثلًا) متكتبش نوع. نوعها في الحقيقة [[Unit]] (زي void في Java).

مميزات Kotlin:
• قيمة افتراضية ([[default argument]]): [[greeting: String = "أهلًا"]]. لو مبعتهاش، بتاخد الافتراضي. ده بيغنيك عن تعريف نفس الدالة كذا مرة (overloading).
• أسماء الـ arguments ([[named arguments]]): [[greet(name = "Ali", greeting = "صباح الخير")]]. الترتيب ساعتها ميفرقش، والكود بيتقري أوضح بكتير لما فيه أرقام أو Booleans.
• دالة في سطر ([[single-expression]]): [[fun square(x: Int) = x * x]]. علامة [[=]] بدل [[{ return }]]، والنوع بيتستنتج.
• [[vararg]]: عدد arguments مش ثابت، وبتوصلك كـ Array.`,
          example: R`fun greet(name: String, greeting: String = "أهلًا"): String {
    return "$greeting يا $name"
}
fun square(x: Int) = x * x
fun total(vararg prices: Double): Double = prices.sum()
fun log(message: String) {
    println("[LOG] $message")
}
fun main() {
    println(greet("Sara"))
    println(greet("Omar", "صباح الخير"))
    println(greet(greeting = "مساء الفل", name = "Ali"))
    println(square(4))
    println(total(10.0, 20.5, 5.0))
    log("خلصنا")
}`,
          try: R`اكتب دالة [[price(base: Double, discountPercent: Int = 0, vat: Boolean = true): Double]] ترجّع السعر بعد الخصم، وتضيف 14% ضريبة لو [[vat]] بـ true. ناديها بـ [[price(200.0)]] و [[price(200.0, discountPercent = 10)]] و [[price(200.0, vat = false)]].`,
          flag: "script",
          deep: {
            why: R`الدوال هي اللي بتقسّم البرنامج لحتت صغيرة ليها أسماء واضحة. وفي Compose كل حتة واجهة هي دالة، والقيم الافتراضية والـ named arguments هي اللي ماشي عليها كل حاجة: [[Text(text = "...", color = ..., fontSize = ...)]] فيها أكتر من ١٥ parameter كلهم افتراضيين إلا النص.`,
            how: R`الـ parameters في Kotlin [[val]]: مينفعش تغيّر [[name]] جوه الدالة.

الدوال ممكن تعيش في أي حتة: لوحدها في الملف (top-level)، أو جوه class (method)، أو جوه دالة تانية (local function).

[[Unit]] قيمة حقيقية ليها object واحد، مش «لا شيء» زي void. وفيه نوع تاني اسمه [[Nothing]] لدالة عمرها ما بترجع خالص، زي [[fun fail(msg: String): Nothing = throw Exception(msg)]].

ولو Java هتنادي دالة فيها default arguments، Java مبتفهمش الفكرة دي، فبتحط [[@JvmOverloads]] فوق الدالة والمترجم يعمل نسخة لكل احتمال (درس Java و Kotlin).`,
            when: R`أي كود هتكتبه مرتين يبقى دالة. والـ single-expression لما الجسم سطر حساب واحد. والـ named arguments لما فيه أكتر من parameter من نفس النوع، أو Boolean: [[sendEmail(true, false)]] ملهاش معنى، [[sendEmail(urgent = true, copyMe = false)]] واضحة.`,
            mistakes: R`تنسى نوع الـ parameter: [[fun f(x)]] غلط في Kotlin. وتكتب [[fun sum(a: Int, b: Int) { a + b }]] وتستنى ترجع حاجة: من غير [[=]] أو [[return]] الدالة بترجّع Unit. وتخلط بعد ما تبدأ بـ named: لو سميت argument، اللي بعده كمان سمّيه (إلا لو في مكانه الصح).`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف ٤ دوال بأربع أشكال (عادية بقيمة افتراضية، وسطر واحد، و vararg، ودالة مبترجّعش حاجة)، وبعدين [[main]] بتناديهم. اتشغّل في [[docker run --rm eclipse-temurin:21-jdk]] مع Kotlin 2.4.20.

---

## ١. دالة كاملة: [[greet]]

~~~kotlin
fun greet(name: String, greeting: String = "أهلًا"): String {
    return "$greeting يا $name"
}
~~~

فكّ أول سطر من الشمال لليمين:

| الحتة | معناها |
|---|---|
| [[fun]] | بعرّف دالة |
| [[greet]] | اسمها |
| [[name: String]] | أول parameter: اسمه name ونوعه String. النوع **لازم** يتكتب هنا |
| [[,]] | فاصل بين الـ parameters |
| [[greeting: String = "أهلًا"]] | parameter تاني ليه **قيمة افتراضية**: لو اللي بينادي مبعتهوش، يبقى "أهلًا" |
| [[): String]] | بعد قفلة القوس: نوع القيمة اللي الدالة بترجّعها |
| [[{ return ... }]] | الجسم. [[return]] بترجّع القيمة وتخرج من الدالة |

الكلمتين اللي هتسمعهم: **parameter** هو الاسم في التعريف ([[name]])، و **argument** هو القيمة اللي بتبعتها وانت بتنادي ([["Sara"]]).

---

## ٢. سطر واحد: [[square]]

~~~kotlin
fun square(x: Int) = x * x
~~~

لما الجسم كله expression واحد، تكتب [[=]] بدل [[{ return ... }]]. ونوع الرجوع مش لازم: المترجم شايف إن [[x * x]] Int. ده اسمه **single-expression function**.

---

## ٣. عدد arguments مفتوح: [[total]]

~~~kotlin
fun total(vararg prices: Double): Double = prices.sum()
~~~

- [[vararg]] (variable number of arguments): ابعت 0 أو 1 أو 10 Doubles مفصولين بفاصلة.
- جوه الدالة [[prices]] بيوصل كـ array، و [[.sum()]] بتجمعهم.

جربنا كمان: [[total()]] من غير ولا رقم طبعت [[0.0]]. ولو الأرقام عندك جاهزة في array ابعتها بـ [[*]] قدامها (اسمها spread): [[total(*arr)]] مع [[doubleArrayOf(1.0, 2.0)]] طبعت [[3.0]].

---

## ٤. دالة مبترجّعش حاجة: [[log]]

~~~kotlin
fun log(message: String) {
    println("[LOG] $message")
}
~~~

مفيش [[: Type]] بعد القوس ومفيش [[return]]. نوع الرجوع ساعتها [[Unit]] (زي void في Java). بس [[Unit]] قيمة حقيقية: جربنا [[val r = log("x")]] و [[println(r)]]:

~~~text الناتج
[LOG] x
kotlin.Unit
~~~

---

## ٥. النداءات في [[main]]

~~~kotlin
    println(greet("Sara"))
~~~

argument واحد، فـ [[name = "Sara"]] و [[greeting]] خدت الافتراضي.

~~~kotlin
    println(greet("Omar", "صباح الخير"))
~~~

اتنين بالترتيب: الأول لـ name والتاني لـ greeting.

~~~kotlin
    println(greet(greeting = "مساء الفل", name = "Ali"))
~~~

**named arguments**: كتبت اسم الـ parameter و [[=]] قبل القيمة، فالترتيب مبقاش فارق.

~~~kotlin
    println(square(4))
    println(total(10.0, 20.5, 5.0))
    log("خلصنا")
~~~

4 × 4 = 16. و 10.0 + 20.5 + 5.0 = 35.5. و [[log]] بتطبع بنفسها، فمش محتاجة [[println]] حواليها.

~~~text الناتج كله
أهلًا يا Sara
صباح الخير يا Omar
مساء الفل يا Ali
16
35.5
[LOG] خلصنا
~~~

---

## ٦. الأخطاء (جربناهم)

**من غير نوع للـ parameter:**

~~~text الناتج: fun f(x) = x
e7a.kt:1:7: error: an explicit type is required on a value parameter.
fun f(x) = x
      ^
~~~

**[[{ }]] من غير [[=]] ولا [[return]]:**

~~~kotlin
fun sum(a: Int, b: Int) { a + b }
fun main() {
    println(sum(2, 3))
}
~~~

~~~text الناتج
kotlin.Unit
~~~

اتترجم واشتغل من غير أي error، وده الخطير: [[a + b]] اتحسب واترمى، والدالة رجّعت [[Unit]]. الصح [[fun sum(a: Int, b: Int) = a + b]].

**تخلط named و positional غلط:**

~~~text الناتج: greet(greeting = "صباح الخير", "Ali")
e7d.kt:4:13: error: no value passed for parameter 'name'.
    println(greet(greeting = "صباح الخير", "Ali"))
            ^^^^^
e7d.kt:4:44: error: mixing named and positional arguments is not allowed unless the order of the arguments matches the order of the parameters.
    println(greet(greeting = "صباح الخير", "Ali"))
                                           ^^^^^
~~~

بعد ما سميت greeting (وهو التاني) حطيت قيمة من غير اسم، فالمترجم مش عارف دي لمين. أما [[greet(name = "Ali", "صباح الخير")]] فاشتغلت وطبعت «صباح الخير يا Ali»، لأن الترتيب نفسه صح.

**تغيّر parameter جوه الدالة:**

~~~text الناتج: fun greet2(name: String) { name = "x" }
e7d.kt:2:28: error: 'val' cannot be reassigned.
fun greet2(name: String) { name = "x" }
                           ^^^^
~~~

الـ parameters في Kotlin [[val]].

---

## ٧. التجربة

~~~text ناتج الـ solCode
227.99999999999997
205.2
200.0
~~~

- [[base * (100 - discountPercent) / 100]]: 200 × 100 / 100 = 200، ومع خصم 10: 200 × 90 / 100 = 180.
- [[if (vat) afterDiscount * 1.14 else afterDiscount]]: [[if]] بيرجّع قيمة (درس if و when). 200 × 1.14 المفروض 228 بس الـ Double طلّع [[227.99999999999997]]، و 180 × 1.14 = [[205.2]].
- [[price(200.0, vat = false)]]: نطينا discountPercent (خد 0) وسمّينا vat بس. ده اللي الـ named arguments بتسمح بيه.

---

## الخلاصة

| الشكل | مثال |
|---|---|
| دالة عادية | [[fun f(a: Int): Int { return a }]] |
| قيمة افتراضية | [[fun f(a: Int = 0)]] |
| سطر واحد | [[fun f(a: Int) = a * 2]] |
| vararg | [[fun f(vararg xs: Int)]] |
| مبترجّعش (Unit) | [[fun f() { println() }]] |
| نداء بالأسماء | [[f(a = 5)]] |

- نوع كل parameter لازم يتكتب. ونوع الرجوع يتكتب مع [[{ }]]، ويتستنتج مع [[=]].
- [[{ a + b }]] من غير return = Unit من غير ما حد يقولك.`,
          lines: [
            R`دالة بـ parameter عادي وواحد ليه قيمة افتراضية، وبترجّع String.`,
            "بترجّع التحية بالاسم.",
            "قفلة الدالة.",
            R`single-expression: [[=]] بدل الجسم، والنوع Int اتستنتج.`,
            R`[[vararg]]: أي عدد Doubles، و [[sum()]] بتجمعهم.`,
            R`دالة مبترجّعش حاجة (Unit).`,
            "بتطبع بس.",
            "قفلة.",
            R`بداية [[main]].`,
            "من غير التحية: بتاخد الافتراضي.",
            "بالترتيب العادي.",
            "بالأسماء، والترتيب مختلف عادي.",
            "16.",
            "3 أسعار.",
            "نداء دالة Unit.",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[أهلًا يا Sara]]
[[صباح الخير يا Omar]]
[[مساء الفل يا Ali]]
[[16]]
[[35.5]]
[[[LOG] خلصنا]]

وحل التجربة: [[price(200.0)]] بتطبع [[227.99999999999997]] مش 228.0، لأن الـ Double مش دقيق في الكسور (1.14 مبتتخزنش بالظبط). و [[price(200.0, discountPercent = 10)]] بـ [[205.2]]، و [[price(200.0, vat = false)]] بـ [[200.0]]. للعرض استخدم [["%.2f".format(x)]] فتطلع 228.00، وللفلوس الحقيقية بيحسبوا بالقروش كـ Long أو بـ [[BigDecimal]].`,
          solCode: R`fun price(base: Double, discountPercent: Int = 0, vat: Boolean = true): Double {
    val afterDiscount = base * (100 - discountPercent) / 100
    return if (vat) afterDiscount * 1.14 else afterDiscount
}

fun main() {
    println(price(200.0))
    println(price(200.0, discountPercent = 10))
    println(price(200.0, vat = false))
}`
        }
      ]
    },
    {
      t: "null safety والمجموعات",
      l: 1,
      n: "القيمة اللي ممكن تبقى null بتتكتب بـ ?، وإزاي تتعامل معاها من غير ما التطبيق يقع، و List و Map و Set والدوال اللي عليهم",
      items: [
        {
          cmd: "المتغيرات والـ Null Safety في Kotlin",
          title: "null safety: يعني إيه String? وإمتى تستخدم ?. و ?: و !! و let؟",
          desc: R`[[null]] معناها «مفيش قيمة»: اليوزر مكتبش رقم موبايل، أو البحث ملقاش حاجة. في Java أي متغير ممكن يبقى null، ولو ناديت عليه دالة وهو null البرنامج يقع بـ [[NullPointerException]]. وده كان من أشهر أسباب الكراش في تطبيقات Android.

Kotlin بتحل ده من نوع المتغير نفسه:
• [[String]] عمره ما يبقى null. لو كتبت [[val name: String = null]] المترجم يرفض.
• [[String?]] (بعلامة استفهام [[?]] بعد النوع) معناها «String أو null». ده اسمه nullable type.

ومع النوع الـ nullable المترجم مش هيسيبك تكتب [[city.length]] على طول، لازم تتعامل مع احتمال الـ null الأول. أدواتك:
• [[?.]] (safe call): [[city?.length]]. لو city بـ null النتيجة null ومفيش كراش، وإلا الطول.
• [[?:]] (اسمها Elvis operator، لأنها شبه تسريحة Elvis لو بصيتلها جنب): [[city?.length ?: 0]]. لو اللي على الشمال null، خد اللي على اليمين.
• [[if (city != null)]]: جوه الـ if المترجم بيعرف إنها مش null ويسيبك تستخدمها عادي. ده اسمه [[smart cast]].
• [[?.let { ... }]]: نفّذ الـ block ده بس لو القيمة مش null، وجواه القيمة اسمها [[it]].
• [[!!]] (not-null assertion): «أنا متأكد إنها مش null». لو طلعت null، بيرمي NullPointerException. يعني رجّعت المشكلة بإيدك.`,
          example: R`fun findUser(id: Int): String? = if (id == 1) "Sara" else null
fun main() {
    val name: String = "Omar"
    val city: String? = null
    println(name.length)
    println(city?.length)
    println(city?.length ?: 0)
    val found: String? = findUser(1)
    if (found != null) {
        println(found.length)
    }
    val user = findUser(2)
    user?.let { println("لقيته: $it") }
    val display = findUser(1) ?: "زائر"
    println(display)
    val age = "abc".toIntOrNull() ?: 18
    println(age)
    // !! بتقول «متأكد». لو غلطان التطبيق هيقع
    val sure: String = findUser(1)!!
    println(sure.uppercase())
}`,
          try: R`اعمل [[var phone: String? = null]] واطبع «مفيش رقم» لو null، وآخر ٤ أرقام لو فيه رقم، في سطر واحد بـ [[?.]] و [[?:]] (استخدم [[takeLast(4)]]). جرّبه وهو null وبعدين حط فيه [["01012345678"]]. وبعدين جرّب [[phone!!.length]] وهو null وشوف الـ exception.`,
          flag: "script",
          deep: {
            why: R`الـ null هيجيلك من كل حتة في Android: field مش موجود في JSON جاي من السيرفر، صورة اليوزر مرفعهاش، أو intent extra محدش بعته. Kotlin بتخلي احتمال الـ null مكتوب في النوع نفسه، فالمترجم بيجبرك تفكر «لو مش موجود أعمل إيه؟» وانت بتكتب، مش لما المستخدم يفتح التطبيق.`,
            how: R`على الـ JVM [[String]] و [[String?]] نفس النوع، الفرق كله عند المترجم وقت الترجمة. وبيحط فحوصات صغيرة عند حدود الدوال العامة عشان لو Java بعتت null لـ parameter مش nullable يقع بسرعة برسالة واضحة.

الـ smart cast بيشتغل على [[val]] وعلى [[var]] المحلية اللي محدش ممكن يغيّرها في النص. أما property [[var]] في class، فممكن thread تاني يغيّرها بين الفحص والاستخدام، فالمترجم مش هيعمل smart cast. الحل: [[val c = city]] الأول، أو [[city?.let { }]].

وفيه [[lateinit var]]: «هديله قيمة بعدين قبل ما أستخدمه، ومش عايزه nullable». بيتستخدم مع properties بتتعمل بعد الـ constructor (زي binding في Activity). لو استخدمته قبل ما تديله قيمة يرمي [[UninitializedPropertyAccessException]]. وفيه [[val x by lazy { ... }]]: القيمة بتتحسب أول مرة تستخدمها بس.

ومن Java: أي قيمة جاية من كود Java من غير [[@Nullable]] أو [[@NonNull]] نوعها بيظهر [[String!]] (platform type)، والمترجم بيسيبلك المسؤولية. اعتبرها nullable لو مش متأكد.`,
            when: R`[[?]] في النوع بس لما الغياب حالة طبيعية فعلًا (اليوزر ممكن ميكونش ليه صورة). [[?.]] و [[?:]] في أغلب الحالات. [[let]] لما عايز تنفّذ كذا سطر لو القيمة موجودة. و [[!!]] تقريبًا أبدًا في كود الإنتاج.`,
            mistakes: R`[[!!]] في كل حتة عشان تسكّت المترجم: كده رجّعت NullPointerException بإيدك. وتعمل كل حاجة nullable «احتياطي» فالكود يتملي [[?.]] من غير لازمة. و [[city?.length ?: 0]] لما 0 ليها معنى تاني في البرنامج (طول فعلي صفر) فمتقدرش تفرّق بين «مفيش» و «فاضي».`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف دالة بتدوّر على يوزر وممكن ترجّع [[null]]، وبعدين بيجرّب كل طرق التعامل مع القيمة اللي ممكن تبقى null: [[?.]] و [[?:]] و [[if]] و [[?.let]] و [[!!]]. اتشغّل في [[docker run --rm eclipse-temurin:21-jdk]] مع Kotlin 2.4.20، والأخطاء اتجرّبت بملفات صغيرة.

---

## ١. دالة بترجّع [[String?]]

~~~kotlin
fun findUser(id: Int): String? = if (id == 1) "Sara" else null
~~~

- [[String?]]: علامة [[?]] بعد النوع = «String **أو** null». من غيرها الدالة مينفعش ترجّع null.
- [[if (id == 1) "Sara" else null]]: لو الرقم 1 رجّع Sara، غير كده [[null]] («مفيش»).
- الشكل [[= ...]] لأن الجسم expression واحد (درس الدوال).

---

## ٢. النوعين جنب بعض

~~~kotlin
    val name: String = "Omar"
    val city: String? = null
    println(name.length)
~~~

~~~text الناتج
4
~~~

[[name]] نوعه [[String]]، فالمترجم ضامن إنه مش null، و [[name.length]] شغالة على طول. أما [[city]] فـ [[String?]] وقيمتها null فعلًا.

جربنا الحاجتين اللي المترجم بيمنعهم:

~~~text الناتج: val name: String = null
e8a.kt:2:24: error: null cannot be a value of a non-null type 'String'.
    val name: String = null
                       ^^^^
~~~

~~~text الناتج: println(city.length) و city نوعها String?
e8b.kt:3:17: error: only safe (?.) or non-null asserted (!!.) calls are allowed on a nullable receiver of type 'String?'.
    println(city.length)
                ^
~~~

الرسالة التانية بتقولك الحلين بنفسها: [[?.]] أو [[!!.]]. و [[receiver]] = القيمة اللي قبل النقطة.

---

## ٣. [[?.]]: safe call

~~~kotlin
    println(city?.length)
~~~

~~~text الناتج
null
~~~

[[city?.length]] = «لو city مش null هات length، ولو null خلّي النتيجة كلها null ومتكملش». ولما جربناها على [[String?]] قيمتها "Giza" طلعت [[4]]. يعني نوع [[city?.length]] نفسه [[Int?]].

---

## ٤. [[?:]]: Elvis

~~~kotlin
    println(city?.length ?: 0)
~~~

~~~text الناتج
0
~~~

اقراها من الشمال: [[city?.length]] طلعت null، و [[?:]] بتقول «لو اللي على شمالي null، خد اللي على يميني». فطلعت 0، والنوع بقى [[Int]] عادي (مش nullable).

---

## ٥. [[if (x != null)]] والـ smart cast

~~~kotlin
    val found: String? = findUser(1)
    if (found != null) {
        println(found.length)
    }
~~~

~~~text الناتج
4
~~~

- [[!=]] = «مش يساوي».
- جوه الـ if المترجم **عارف** إن found مش null، فبيعاملها كـ [[String]]، و [[found.length]] اشتغلت من غير [[?.]]. ده الـ **smart cast**.

### إمتى الـ smart cast مبيشتغلش؟

جربناه على property [[var]] جوه class:

~~~kotlin
class Profile {
    var city: String? = "Cairo"
}
fun main() {
    val p = Profile()
    if (p.city != null) {
        println(p.city.length)
    }
}
~~~

~~~text الناتج
e8d.kt:7:17: error: smart cast to 'String' is impossible, because 'city' is a mutable property that could be mutated concurrently.
        println(p.city.length)
                ^^^^^^
~~~

[[mutated concurrently]] = ممكن حتة كود تانية (thread تاني) تغيّرها بين الفحص والاستخدام. الحل: [[val c = p.city]] الأول وافحص c، أو [[p.city?.let { ... }]].

---

## ٦. [[?.let { }]]

~~~kotlin
    val user = findUser(2)
    user?.let { println("لقيته: $it") }
~~~

- [[findUser(2)]] رجّعت null.
- [[?.let { ... }]]: «لو مش null نفّذ الـ block، وجواه القيمة اسمها [[it]]». هنا null، فالـ block **متنفذش خالص** ومفيش ولا سطر اتطبع.

جربناها بقيمة موجودة ([[val user: String? = "Sara"]]) وطبعت:

~~~text الناتج
لقيته: Sara
~~~

---

## ٧. [[?:]] بقيمة افتراضية

~~~kotlin
    val display = findUser(1) ?: "زائر"
    println(display)
~~~

~~~text الناتج
Sara
~~~

findUser(1) رجّعت Sara (مش null)، فـ [[?:]] خدت الشمال. ولو كانت null كانت هتبقى «زائر». و display نوعها [[String]] مش [[String?]].

---

## ٨. [[toIntOrNull()]]

~~~kotlin
    val age = "abc".toIntOrNull() ?: 18
    println(age)
~~~

~~~text الناتج
18
~~~

[["abc".toInt()]] كانت هتقع بـ [[NumberFormatException]] (درس val و var). [[toIntOrNull()]] بدلها بترجّع [[null]] (طبعناها لوحدها: [[null]]، و [["42".toIntOrNull()]] طبعت [[42]])، و [[?: 18]] حطت الافتراضي.

---

## ٩. [[!!]]

~~~kotlin
    val sure: String = findUser(1)!!
    println(sure.uppercase())
~~~

~~~text الناتج
SARA
~~~

[[!!]] = «أنا متأكد إنها مش null، حوّلها [[String]]». هنا صح فعلًا، و [[uppercase()]] حوّلتها حروف كبيرة. بس لما تبقى غلطان (من التجربة):

~~~kotlin
    var phone: String? = null
    println(phone!!.length)
~~~

~~~text الناتج
Exception in thread "main" java.lang.NullPointerException
	at E8cKt.main(e8c.kt:3)
	at E8cKt.main(e8c.kt)
~~~

البرنامج وقع، والـ stack trace بيشاور على السطر 3 (اللي فيه [[!!]]). ده بالظبط الكراش اللي null safety معمولة عشان تمنعه، و [[!!]] رجّعته بإيدك.

---

## ١٠. [[lateinit]] (من الـ deep، جربناه)

~~~kotlin
class Screen {
    lateinit var title: String
}
~~~

استخدام [[title]] قبل ما تديله قيمة:

~~~text الناتج
Exception in thread "main" kotlin.UninitializedPropertyAccessException: lateinit property title has not been initialized
	at Screen.getTitle(f1.kt:2)
	at F1Kt.main(f1.kt:27)
	at F1Kt.main(f1.kt)
~~~

[[lateinit]] بيوعد المترجم إنك هتديها قيمة قبل الاستخدام. لو خلفت الوعد بيقع برسالة أوضح من NullPointerException. ([[getTitle]] في السطر: الـ property من جوه بتتقري بدالة اسمها كده.)

---

## ١١. التجربة

~~~text ناتج الـ solCode
مفيش رقم
5678
~~~

[[phone?.takeLast(4) ?: "مفيش رقم"]]: لو null، [[?.]] بتطلّع null و [[?:]] تحط الرسالة. لو فيه رقم، [[takeLast(4)]] بترجّع آخر ٤ حروف.

---

## الخلاصة

| تكتب | لو القيمة null | لو مش null |
|---|---|---|
| [[x?.length]] | null | الطول |
| [[x?.length ?: 0]] | 0 | الطول |
| [[if (x != null) x.length]] | الـ if مبتتنفذش | الطول (smart cast) |
| [[x?.let { ... }]] | الـ block مبيتنفذش | بيتنفذ و [[it]] = x |
| [[x!!.length]] | **NullPointerException** | الطول |

- [[String]] عمره ما يبقى null، و [[String?]] المترجم بيجبرك تتعامل معاه.
- الـ smart cast مع [[val]] والمتغيرات المحلية، مش مع property [[var]].
- [[!!]] تقريبًا أبدًا.`,
          lines: [
            R`دالة بترجّع [[String?]]: الاسم لو لقته، و null لو ملقتهوش.`,
            R`بداية [[main]].`,
            R`[[String]] عادي: عمره ما يبقى null.`,
            R`[[String?]]: ممكن null، وهو null فعلًا دلوقتي.`,
            "4، مفيش أي قلق.",
            R`[[?.]]: city بـ null، فالنتيجة null ومفيش كراش.`,
            R`[[?:]]: لو الشمال null خد 0.`,
            R`نوعها [[String?]]: المترجم ميعرفش هترجع إيه.`,
            "فحص عادي.",
            R`smart cast: جوه الـ if المترجم عارف إنها مش null، فـ [[found.length]] من غير [[?.]]. 4.`,
            "قفلة if.",
            "user هنا null (رقم 2 مش موجود).",
            R`[[?.let]]: الـ block مش هيتنفذ لأنها null.`,
            R`[[?:]] بقيمة افتراضية: Sara موجودة فهي اللي هتيجي.`,
            "Sara.",
            R`[[toIntOrNull]] بترجّع null بدل ما تقع، و [[?:]] تحط 18.`,
            "18.",
            R`[[!!]]: هنا متأكدين، فالنوع بقى String.`,
            "SARA.",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[4]]
[[null]]
[[0]]
[[4]]
[[Sara]]
[[18]]
[[SARA]]

(سطر «لقيته» مش هيظهر، لأن findUser(2) رجّعت null.)

وحل التجربة: [[phone?.takeLast(4) ?: "مفيش رقم"]] بيطبع «مفيش رقم» وهو null، و [[5678]] لما تحط الرقم. و [[phone!!.length]] وهو null بيقع بـ [[NullPointerException]] وبيوقف البرنامج.`,
          solCode: R`fun lastDigits(phone: String?): String = phone?.takeLast(4) ?: "مفيش رقم"

fun main() {
    println(lastDigits(null))
    println(lastDigits("01012345678"))
}`
        },
        {
          cmd: "List و Map و Set",
          title: "List و Map و Set: والفرق بين listOf و mutableListOf",
          desc: R`الـ collections هي اللي بتشيل كذا قيمة مع بعض:
• [[List]]: عناصر بترتيب، وتوصل لأي واحد بالـ index (بيبدأ من 0): [[names[0]]] هو الأول.
• [[Set]]: عناصر من غير تكرار. لو حطيت نفس القيمة مرتين بتتحسب مرة.
• [[Map]]: مفتاح وقيمة (key-value)، زي قاموس: [[prices["قلم"]]] بترجّع سعر القلم.

وكل نوع ليه نسختين:
• [[listOf]] و [[setOf]] و [[mapOf]]: للقراية بس (read-only). مفيش [[add]] ولا [[remove]].
• [[mutableListOf]] و [[mutableSetOf]] و [[mutableMapOf]]: تقدر تضيف وتمسح وتعدّل.

في الـ Map كل عنصر بيتكتب [["قلم" to 10]]. كلمة [[to]] بتعمل [[Pair]] (قيمتين مع بعض). وقراية مفتاح مش موجود بترجّع [[null]]، عشان كده نوع [[prices["x"]]] هو [[Int?]] وبتستخدم معاه [[?:]].

لما تعمل collection فاضية لازم تقول النوع بين [[< >]]، لأن مفيش قيمة يستنتج منها: [[mutableMapOf<String, Int>()]]. الـ [[< >]] اسمها generics: «List من إيه؟».`,
          example: R`fun main() {
    val names = listOf("Sara", "Omar", "Ali")
    println(names[0])
    println(names.size)
    val cart = mutableListOf("قلم")
    cart.add("كشكول")
    cart.remove("قلم")
    println(cart)
    val prices = mapOf("قلم" to 10, "كشكول" to 25)
    println(prices["كشكول"])
    println(prices["مسطرة"] ?: 0)
    val stock = mutableMapOf<String, Int>()
    stock["قلم"] = 5
    stock["قلم"] = stock.getValue("قلم") - 1
    println(stock)
    val tags = setOf("kotlin", "android", "kotlin")
    println(tags)
    println("android" in tags)
}`,
          try: R`اعمل [[mutableMapOf<String, Int>()]] للدرجات، وضيف 3 طلاب بدرجاتهم. اطبع درجة واحد موجود وواحد مش موجود (بـ [[?: -1]]). بعدين عدّي عليهم بـ [[for ((name, grade) in grades)]] واطبع كل واحد في سطر.`,
          flag: "script",
          deep: {
            why: R`أي شاشة فيها لستة (رسايل، منتجات، أوردرات) وراها List. والـ Map للبحث السريع بالمفتاح (منتج بالـ id). وفي Compose والـ ViewModel القاعدة إنك تعرض List read-only للشاشة، عشان محدش يغيّرها من برا من غير ما الـ state يعرف.`,
            how: R`[[listOf(...)]] على الـ JVM بترجّع list بتاعة Java (لكذا عنصر [[java.util.Arrays$ArrayList]]، ولعنصر واحد [[Collections$SingletonList]])، بس من ورا interface [[List]] اللي مفيهاش add. يعني read-only مش immutable: لو حد عنده reference لنفس الـ list كـ [[MutableList]] يقدر يغيّرها، وانت هتشوف التغيير (درس الانترفيو فيه مثال).

[[mapOf]] و [[setOf]] بيحافظوا على ترتيب الإضافة ([[LinkedHashMap]] و [[LinkedHashSet]]).

[[map[key]]] بترجّع null لو المفتاح مش موجود، و [[getValue(key)]] بترمي exception، و [[getOrDefault(key, 0)]] و [[getOrPut(key) { ... }]] مفيدين جدًا للعدّادات والـ cache.

و [[in]] بتسأل «موجود؟»: على List و Set بتدوّر في العناصر، وعلى Map بتدوّر في المفاتيح. و Set أسرع بكتير من List في السؤال ده لما العناصر كتير.`,
            when: R`[[List]] افتراضيًا. [[Set]] لما التكرار ممنوع (tags، ids متعلّمة). [[Map]] لما بتدوّر بمفتاح. والـ mutable جوه دالة أو class وانت بتبني الداتا، وبرا اعرضها read-only.`,
            mistakes: R`[[names[3]]] على List فيها 3 عناصر: [[IndexOutOfBoundsException]]. استخدم [[getOrNull(3)]]. و [[val list = listOf(...)]] وتحاول [[list.add]]: مفيش add في List، محتاج mutableListOf. وتفتكر إن [[val]] معناها إن الـ list مش هتتغير: [[val cart = mutableListOf()]] ينفع تضيف فيها عادي.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعمل List للقراية بس ويقرا منها، و List بتتعدّل ويضيف ويمسح فيها، و Map يدوّر فيها بمفتاح موجود ومفتاح مش موجود، و Map فاضية يملاها، وفي الآخر Set بتشيل التكرار. اتشغّل في [[docker run --rm eclipse-temurin:21-jdk]] مع Kotlin 2.4.20.

---

## ١. [[listOf]]: List للقراية

~~~kotlin
    val names = listOf("Sara", "Omar", "Ali")
    println(names[0])
    println(names.size)
~~~

~~~text الناتج
Sara
3
~~~

- [[listOf(...)]]: List فيها العناصر دي بالترتيب. النوع اتستنتج [[List<String>]] (الـ [[< >]] بتقول «List من إيه»).
- [[names[0]]]: الأقواس المربعة [[[ ]]] = «هات العنصر رقم كذا». الترقيم (الـ index) بيبدأ من **0**، فـ 0 هو Sara و 2 هو Ali.
- [[size]]: عدد العناصر.

| index | 0 | 1 | 2 |
|---|---|---|---|
| القيمة | Sara | Omar | Ali |

---

## ٢. [[mutableListOf]]: List بتتعدّل

~~~kotlin
    val cart = mutableListOf("قلم")
    cart.add("كشكول")
    cart.remove("قلم")
    println(cart)
~~~

| السطر | cart بعده |
|---|---|
| [[mutableListOf("قلم")]] | [قلم] |
| [[add("كشكول")]]: ضيف في الآخر | [قلم, كشكول] |
| [[remove("قلم")]]: امسح أول عنصر بالقيمة دي | [كشكول] |

~~~text الناتج
[كشكول]
~~~

لاحظ إن cart [[val]] واتعدّلت عادي: [[val]] معناها إن الاسم cart هيفضل يشاور على **نفس** الـ List، مش إن الـ List من جوه متتغيرش. ولما [[println]] بتطبع List بتحطها بين [[[ ]]] وبين العناصر فاصلة.

ولو جربت [[add]] على [[listOf]]:

~~~text الناتج: val list = listOf(1, 2) ثم list.add(3)
e9b.kt:3:10: error: unresolved reference 'add' on receiver of type 'List<Int>'.
    list.add(3)
         ^^^
~~~

[[List]] مفيهاش دالة اسمها add أصلًا، دي في [[MutableList]] بس.

---

## ٣. [[mapOf]] و [[to]]

~~~kotlin
    val prices = mapOf("قلم" to 10, "كشكول" to 25)
    println(prices["كشكول"])
    println(prices["مسطرة"] ?: 0)
~~~

~~~text الناتج
25
0
~~~

- [["قلم" to 10]]: [[to]] بتعمل [[Pair]] (زوج: مفتاح وقيمة). طبعنا [[println("قلم" to 10)]] وطلعت [[(قلم, 10)]].
- [[mapOf(...)]]: Map من الأزواج دي. النوع [[Map<String, Int>]]: المفاتيح String والقيم Int.
- [[prices["كشكول"]]]: بالمفتاح بدل الـ index. 25.
- [[prices["مسطرة"]]]: مفتاح مش موجود بيرجّع [[null]] مش error، عشان كده نوعها [[Int?]]، و [[?: 0]] حطت 0 (درس null safety).

---

## ٤. [[mutableMapOf<String, Int>()]]: Map فاضية

~~~kotlin
    val stock = mutableMapOf<String, Int>()
    stock["قلم"] = 5
    stock["قلم"] = stock.getValue("قلم") - 1
    println(stock)
~~~

- فاضية، فمفيش قيم يستنتج منها النوع، فلازم [[<String, Int>]] بإيدك. والقوسين [[()]] في الآخر: بننادي الدالة من غير عناصر.
- [[stock["قلم"] = 5]]: لو المفتاح مش موجود بيتضاف، ولو موجود قيمته بتتبدل.
- [[stock.getValue("قلم")]]: بترجّع القيمة كـ [[Int]] (مش [[Int?]])، فنقدر نطرح منها. 5 - 1 = 4.

~~~text الناتج
{قلم=4}
~~~

الـ Map بتتطبع بين [[{ }]] وكل عنصر [[مفتاح=قيمة]].

**ليه مش [[stock["قلم"] - 1]]؟** جربناها:

~~~text الناتج
e9d.kt:4:33: error: operator call is prohibited on a nullable receiver of type 'Int?'. Use '?.'-qualified call instead.
    stock["قلم"] = stock["قلم"] - 1
                                ^
~~~

[[stock["قلم"]]] نوعها [[Int?]] (ممكن المفتاح ميكونش موجود)، والطرح على حاجة ممكن تبقى null ممنوع. و [[getValue]] بتحل ده بإنها تقع لو المفتاح مش موجود:

~~~text الناتج: stock.getValue("قلم") على Map فاضية
Exception in thread "main" java.util.NoSuchElementException: Key قلم is missing in the map.
	at kotlin.collections.MapsKt__MapWithDefaultKt.getOrImplicitDefaultNullable(MapWithDefault.kt:25)
	at kotlin.collections.MapsKt__MapsKt.getValue(Maps.kt:437)
	at E9cKt.main(e9c.kt:3)
	at E9cKt.main(e9c.kt)
~~~

فاستخدمها بس لما متأكد إن المفتاح موجود. وللعدّادات فيه [[getOrDefault]]: جربنا نعدّ الكلمات في [[listOf("a", "b", "a")]] بـ [[counts[w] = counts.getOrDefault(w, 0) + 1]] وطلع [[{a=2, b=1}]].

---

## ٥. [[setOf]]: من غير تكرار

~~~kotlin
    val tags = setOf("kotlin", "android", "kotlin")
    println(tags)
    println("android" in tags)
~~~

~~~text الناتج
[kotlin, android]
true
~~~

- "kotlin" اتكتبت مرتين واتحسبت مرة. والترتيب فضل زي ترتيب الإضافة.
- [[in]]: «موجود؟». على Map بتدوّر في المفاتيح.

---

## ٦. بيبقوا إيه على الـ JVM؟

طبعنا [[.javaClass.name]] لكل واحد:

| الكود | الـ class في Java |
|---|---|
| [[listOf(1, 2, 3)]] | [[java.util.Arrays$ArrayList]] |
| [[listOf(1)]] | [[java.util.Collections$SingletonList]] |
| [[mutableListOf(1)]] | [[java.util.ArrayList]] |
| [[mapOf("a" to 1, "b" to 2)]] | [[java.util.LinkedHashMap]] |
| [[setOf("a", "b")]] | [[java.util.LinkedHashSet]] |
| [[mutableMapOf<String, Int>()]] | [[java.util.LinkedHashMap]] |

[[Linked]] في الاسم معناه إن الترتيب محفوظ بترتيب الإضافة، عشان كده [[{قلم=4}]] و [[[kotlin, android]]] طلعوا بنفس الترتيب اللي كتبناه.

---

## ٧. [[names[3]]] (من الـ mistakes)

~~~text الناتج
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3
	at java.base/java.util.Arrays$ArrayList.get(Arrays.java:4266)
	at E9aKt.main(e9a.kt:9)
	at E9aKt.main(e9a.kt)
~~~

آخر index في List فيها 3 هو 2. و [[names.getOrNull(3)]] بدلها طبعت [[null]] من غير ما تقع.

---

## ٨. التجربة

~~~text ناتج الـ solCode
92
-1
Sara: 92
Omar: 78
Ali: 85
~~~

[[for ((name, grade) in grades)]]: الـ for على Map بتعدّي على كل entry (مفتاح وقيمة)، والأقواس [[(name, grade)]] بتفكها لاتنين (destructuring، زي [[withIndex()]] في درس الـ loops).

---

## الخلاصة

| | للقراية | بيتعدّل | فاضي |
|---|---|---|---|
| List | [[listOf(a, b)]] | [[mutableListOf(a)]] | [[mutableListOf<T>()]] |
| Set | [[setOf(a, b)]] | [[mutableSetOf(a)]] | [[mutableSetOf<T>()]] |
| Map | [[mapOf(k to v)]] | [[mutableMapOf(k to v)]] | [[mutableMapOf<K, V>()]] |

| القراية | لو مش موجود |
|---|---|
| [[list[i]]] | exception |
| [[list.getOrNull(i)]] | null |
| [[map[k]]] | null (النوع [[V?]]) |
| [[map.getValue(k)]] | exception |
| [[map.getOrDefault(k, d)]] | d |

- [[val]] مع mutable = الاسم ثابت، والمحتوى بيتغير.`,
          lines: [
            R`بداية [[main]].`,
            R`List read-only فيها 3 أسماء.`,
            R`أول عنصر (index 0): Sara.`,
            "عدد العناصر: 3.",
            "List ينفع تتعدّل.",
            "ضيف في الآخر.",
            "امسح القلم.",
            "[كشكول].",
            R`Map: كل عنصر مفتاح [[to]] قيمة.`,
            "25.",
            R`مفتاح مش موجود بيرجّع null، فـ [[?:]] تحط 0.`,
            R`Map فاضية ينفع تتعدّل، والنوع لازم يتكتب.`,
            "ضيف مفتاح بقيمته.",
            R`[[getValue]] بترجّع Int (مش nullable)، ونقصنا واحد.`,
            R`{قلم=4}.`,
            "Set: الـ kotlin المكررة هتتحسب مرة.",
            "[kotlin, android].",
            "موجود؟ true.",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[Sara]]
[[3]]
[[[كشكول]]]
[[25]]
[[0]]
[[{قلم=4}]]
[[[kotlin, android]]]
[[true]]

وحل التجربة تحت. [[for ((name, grade) in grades)]] بتفك كل entry لمفتاح وقيمة.`,
          solCode: R`fun main() {
    val grades = mutableMapOf<String, Int>()
    grades["Sara"] = 92
    grades["Omar"] = 78
    grades["Ali"] = 85
    println(grades["Sara"] ?: -1)
    println(grades["Mona"] ?: -1)
    for ((name, grade) in grades) {
        println("$name: $grade")
    }
}`
        },
        {
          cmd: "map و filter و reduce",
          title: "map و filter و sumOf و groupBy: تشتغل على List من غير for",
          desc: R`أغلب الـ loops في Kotlin بتتكتب بدوال جاهزة على الـ collections. كل دالة بتاخد [[lambda]]: حتة كود بين [[{ }]] بتتنفذ على كل عنصر، والعنصر جواها اسمه [[it]] (الدرس بتاع الـ lambdas جاي بالتفصيل).

الأشهر:
• [[filter { شرط }]]: بيرجّع List جديدة فيها العناصر اللي الشرط بتاعها true بس.
• [[map { تحويل }]]: بيرجّع List جديدة، كل عنصر اتحول لحاجة تانية: [[orders.map { it.customer }]] بتطلّع أسماء العملا.
• [[sumOf { }]] و [[count { }]] و [[maxByOrNull { }]]: جمع وعدّ وأكبر عنصر.
• [[any { }]] و [[all { }]] و [[none { }]]: «فيه واحد على الأقل؟» و «كلهم؟» و «ولا واحد؟».
• [[first { }]] أول واحد يطابق (ويرمي exception لو مفيش)، و [[firstOrNull { }]] بترجّع null.
• [[sortedBy { }]] و [[sortedByDescending { }]]: ترتيب.
• [[groupBy { }]]: بيقسّم لـ Map، المفتاح نتيجة الـ lambda والقيمة List.
• [[reduce]] و [[fold]]: بيجمّعوا كل العناصر في قيمة واحدة. [[{ acc, n -> acc * n }]] معناها: خد الناتج اللي فات ([[acc]]) والعنصر الحالي ورجّع الناتج الجديد. السهم [[->]] بيفصل أسماء المدخلات عن الكود.

ولا دالة فيهم بتغيّر الـ List الأصلية: كلهم بيرجّعوا List أو قيمة جديدة. وتقدر تسلسلهم: [[.filter { }.map { }]].`,
          example: R`data class Order(val customer: String, val total: Double, val paid: Boolean)
fun main() {
    val orders = listOf(
        Order("Sara", 250.0, true),
        Order("Omar", 90.0, false),
        Order("Sara", 120.0, true),
        Order("Ali", 300.0, true)
    )
    val paid = orders.filter { it.paid }
    println(paid.size)
    val names = orders.map { it.customer }.distinct()
    println(names)
    println(paid.sumOf { it.total })
    val biggest = orders.maxByOrNull { it.total }
    println(biggest?.customer)
    println(orders.any { !it.paid })
    val byCustomer = orders.groupBy { it.customer }
    println(byCustomer.mapValues { (_, list) -> list.size })
    val totals = orders.sortedByDescending { it.total }.map { it.total }
    println(totals)
    val product = listOf(1, 2, 3, 4).reduce { acc, n -> acc * n }
    println(product)
}`,
          try: R`بنفس الـ orders اطبع: (١) أسماء اللي عندهم أوردر غير مدفوع، (٢) إجمالي فلوس Sara بس، (٣) أول أوردر أكبر من 1000 أو «مفيش» بـ [[firstOrNull]] و [[?:]]، (٤) هل كل الأوردرات أكبر من 50؟ بـ [[all]].`,
          flag: "script",
          deep: {
            why: R`الـ ViewModel بتاعك هيستقبل List من السيرفر أو الداتابيز، ويحتاج يفلتر بالبحث ويرتّب ويحسب إجماليات قبل ما يبعتها للشاشة. بالدوال دي ده بيبقى سطرين بيتقروا زي الجملة، بدل loops فيها متغيرات مؤقتة.`,
            how: R`كل دالة من دول على List بتعدّي على العناصر وتعمل List جديدة. لو سلسلت ٣ دوال على List فيها مليون عنصر، هيتعمل ٣ Lists وسيطة. للحالة دي فيه [[asSequence()]]: بتخلي العناصر تعدّي واحد واحد على كل الخطوات من غير Lists وسيطة، ومبتشتغلش غير لما تطلب النتيجة ([[toList()]] أو [[first()]]). للـ Lists الصغيرة اللي على الشاشة متفرقش.

[[(_, list) -> list.size]]: الـ lambda هنا بتاخد entry من الـ Map، والأقواس بتفكها لمفتاح وقيمة، و [[_]] معناها «مش محتاج المفتاح».

[[reduce]] بتبدأ بأول عنصر وبتقع لو الـ List فاضية. [[fold(0) { acc, n -> acc + n }]] بتاخد قيمة بداية، فأأمن.

و [[data class Order]] في أول المثال: class بيشيل داتا، هنشرحه بعد درسين.`,
            when: R`في أي تحويل أو فلترة أو حساب على List. ارجع لـ [[for]] لما الكود جوه الـ loop طويل وفيه side effects (زي طباعة أو تعديل حاجات برا)، أو محتاج [[break]].`,
            mistakes: R`[[first { }]] على List ممكن ميكونش فيها العنصر: [[NoSuchElementException]]. استخدم [[firstOrNull]]. وتستنى [[orders.filter { }]] يغيّر orders نفسها: بيرجّع List جديدة لازم تحطها في متغير. و [[sortedBy]] غير [[sortBy]]: التانية بتعدّل MutableList في مكانها ومبترجّعش حاجة.`
          },
          teach: R`## البرنامج بيعمل إيه؟

عنده List فيها ٤ أوردرات، وبيطلع منها إجابات لأسئلة: كام واحد مدفوع؟ مين العملا؟ إجمالي المدفوع؟ أكبر أوردر؟ فيه حد مدفعش؟ كل عميل كام أوردر؟ وكل ده من غير ولا [[for]]. اتشغّل في [[docker run --rm eclipse-temurin:21-jdk]] مع Kotlin 2.4.20، والنتايج الوسيطة اتطبعت بـ [[println]] زيادة عشان تشوف كل خطوة.

---

## ١. الداتا

~~~kotlin
data class Order(val customer: String, val total: Double, val paid: Boolean)
~~~

[[data class]] = class بيشيل داتا (ليه درس في الكلاسات). كل [[Order]] فيه ٣ خانات: اسم العميل، والإجمالي، ومدفوع ولا لأ. ومن مميزاته إنه بيتطبع حلو. [[println(orders[0])]] طبعت:

~~~text الناتج
Order(customer=Sara, total=250.0, paid=true)
~~~

~~~kotlin
    val orders = listOf(
        Order("Sara", 250.0, true),
        Order("Omar", 90.0, false),
        Order("Sara", 120.0, true),
        Order("Ali", 300.0, true)
    )
~~~

[[Order("Sara", 250.0, true)]] بيعمل أوردر جديد بالقيم دي بالترتيب. والـ List اتكتبت على كذا سطر عشان تتقري بس.

---

## ٢. الـ lambda و [[it]] في سطر واحد

كل الدوال اللي جاية شكلها [[orders.اسم_الدالة { ... }]]. اللي بين [[{ }]] اسمه **lambda**: حتة كود الدالة بتنفذها على كل عنصر، والعنصر الحالي اسمه [[it]] جاهز. يعني [[{ it.paid }]] = «للعنصر ده، هات paid بتاعه».

---

## ٣. [[filter]]

~~~kotlin
    val paid = orders.filter { it.paid }
    println(paid.size)
~~~

[[filter]] بيعدّي على كل أوردر، ويسيب اللي الـ lambda بتاعته رجّعت [[true]] بس، في **List جديدة**:

| الأوردر | [[it.paid]] | |
|---|---|---|
| Sara 250 | true | يفضل |
| Omar 90 | false | يتشال |
| Sara 120 | true | يفضل |
| Ali 300 | true | يفضل |

~~~text الناتج
3
~~~

[[orders]] نفسها لسه فيها ٤: [[filter]] مبيغيّرش الأصل.

---

## ٤. [[map]] و [[distinct()]]

~~~kotlin
    val names = orders.map { it.customer }.distinct()
    println(names)
~~~

خطوتين متسلسلين بالنقطة:
1. [[orders.map { it.customer }]]: List جديدة بنفس العدد، كل أوردر اتحوّل لاسم عميله. طبعناها لوحدها: [[[Sara, Omar, Sara, Ali]]].
2. [[.distinct()]]: بتشيل التكرار وتسيب أول ظهور.

~~~text الناتج
[Sara, Omar, Ali]
~~~

خلي بالك: [[map]] هنا **دالة** على الـ List، مش نوع [[Map]] بتاع المفاتيح.

---

## ٥. [[sumOf]]

~~~kotlin
    println(paid.sumOf { it.total })
~~~

~~~text الناتج
670.0
~~~

على [[paid]] (المدفوع بس): 250 + 120 + 300 = 670. الـ lambda بتقول «اجمع إيه من كل عنصر»، و total نوعه Double فالناتج [[670.0]].

---

## ٦. [[maxByOrNull]] و [[?.]]

~~~kotlin
    val biggest = orders.maxByOrNull { it.total }
    println(biggest?.customer)
~~~

~~~text الناتج
Ali
~~~

- [[maxByOrNull { it.total }]]: الأوردر اللي الـ total بتاعه أكبر حاجة. بيرجّع الأوردر كله: [[Order(customer=Ali, total=300.0, paid=true)]].
- [[OrNull]]: لو الـ List فاضية بيرجّع null. جربنا على List فاضية وطبعت [[null]]. عشان كده النوع [[Order?]] ولازم [[?.customer]] (درس null safety).

---

## ٧. [[any]]

~~~kotlin
    println(orders.any { !it.paid })
~~~

~~~text الناتج
true
~~~

[[!]] = «مش»، فـ [[!it.paid]] = «مش مدفوع». [[any]] بتسأل: فيه عنصر **واحد على الأقل** الشرط ده صح عليه؟ Omar، فـ [[true]]. وبتقف أول ما تلاقي واحد.

وأخواتها جربناهم: [[orders.count { it.paid }]] طبعت [[3]]، و [[orders.none { it.total > 1000 }]] طبعت [[true]] (ولا واحد فوق 1000).

---

## ٨. [[groupBy]] و [[mapValues]]

~~~kotlin
    val byCustomer = orders.groupBy { it.customer }
    println(byCustomer.mapValues { (_, list) -> list.size })
~~~

**الخطوة ١:** [[groupBy { it.customer }]] بيعمل [[Map]]: المفتاح نتيجة الـ lambda (اسم العميل)، والقيمة List بكل الأوردرات اللي ليها نفس المفتاح. طبعناها:

~~~text byCustomer
{Sara=[Order(customer=Sara, total=250.0, paid=true), Order(customer=Sara, total=120.0, paid=true)], Omar=[Order(customer=Omar, total=90.0, paid=false)], Ali=[Order(customer=Ali, total=300.0, paid=true)]}
~~~

**الخطوة ٢:** [[mapValues { ... }]]: Map جديدة بنفس المفاتيح، وكل قيمة اتحوّلت. الـ lambda هنا:
- [[(_, list)]]: كل عنصر في الـ Map مفتاح وقيمة، والأقواس بتفكه لاتنين. [[_]] = «المفتاح، مش محتاجه».
- [[->]]: بيفصل أسماء المدخلات عن الكود. (لما فيه أسماء بنكتبها بدل [[it]].)
- [[list.size]]: عدد الأوردرات.

~~~text الناتج
{Sara=2, Omar=1, Ali=1}
~~~

---

## ٩. [[sortedByDescending]] ثم [[map]]

~~~kotlin
    val totals = orders.sortedByDescending { it.total }.map { it.total }
    println(totals)
~~~

1. [[sortedByDescending { it.total }]]: List جديدة مرتبة من الأكبر للأصغر حسب total. (طبعنا الأسماء بعد الترتيب: [[[Ali, Sara, Sara, Omar]]].)
2. [[.map { it.total }]]: خد الأرقام بس.

~~~text الناتج
[300.0, 250.0, 120.0, 90.0]
~~~

---

## ١٠. [[reduce]]

~~~kotlin
    val product = listOf(1, 2, 3, 4).reduce { acc, n -> acc * n }
    println(product)
~~~

[[reduce]] بيبدأ بأول عنصر كـ [[acc]] (accumulator: «اللي اتجمع لحد دلوقتي»)، وبعدين لكل عنصر بعده [[n]] بينفذ الـ lambda والنتيجة تبقى [[acc]] الجديد:

| الخطوة | acc | n | acc * n |
|---|---|---|---|
| ١ | 1 | 2 | 2 |
| ٢ | 2 | 3 | 6 |
| ٣ | 6 | 4 | 24 |

~~~text الناتج
24
~~~

---

## الناتج كله

~~~text الناتج
3
[Sara, Omar, Ali]
670.0
Ali
true
{Sara=2, Omar=1, Ali=1}
[300.0, 250.0, 120.0, 90.0]
24
~~~

---

## ١١. الأخطاء والبدائل (جربناهم)

**[[first { }]] ومفيش عنصر:**

~~~text الناتج: listOf(5, 12, 8).first { it > 100 }
Exception in thread "main" java.util.NoSuchElementException: Collection contains no element matching the predicate.
	at E10aKt.main(e10a.kt:7)
	at E10aKt.main(e10a.kt)
~~~

([[predicate]] = الشرط اللي في الـ lambda. والسطر 7 في ملف ٤ سطور مش غلطة: [[first]] دالة [[inline]] كودها اتحط جوه main، فالـ JVM بتعدّ سطورها بأرقام بعد آخر الملف.) [[firstOrNull]] بدلها بترجّع null.

**[[reduce]] على List فاضية:**

~~~text الناتج: emptyList<Int>().reduce { acc, n -> acc * n }
Exception in thread "main" java.lang.UnsupportedOperationException: Empty collection can't be reduced.
	at E10bKt.main(e10b.kt:39)
	at E10bKt.main(e10b.kt)
~~~

[[fold(0) { acc, n -> acc + n }]] بتبدأ من قيمة انت بتديها، فعلى List فاضية رجّعت [[0]] عادي، وعلى [[listOf(1, 2, 3, 4)]] رجّعت [[10]].

**[[sortedBy]] و [[sortBy]]:** مع [[val m = mutableListOf(3, 1, 2)]]: [[m.sortedBy { it }]] طبعت [[[1, 2, 3]]] و m فضلت [[[3, 1, 2]]]. أما [[m.sortBy { it }]] فرتبت m نفسها وبقت [[[1, 2, 3]]].

---

## ١٢. التجربة

~~~text ناتج الـ solCode
[Omar]
370.0
مفيش
true
~~~

- [[filter { !it.paid }.map { it.customer }]]: الغير مدفوع وبعدين الأسماء.
- [[filter { it.customer == "Sara" }.sumOf { it.total }]]: 250 + 120.
- [[firstOrNull { it.total > 1000 }?.customer ?: "مفيش"]]: ملقاش، فـ null، و [[?.]] كملت null، و [[?:]] حطت «مفيش».
- [[all { it.total > 50 }]]: **كلهم** فوق 50؟ أصغر واحد 90، فـ [[true]].

---

## الخلاصة

| الدالة | بترجّع | سؤالها |
|---|---|---|
| [[filter { }]] | List أقل | مين يفضل؟ |
| [[map { }]] | List بنفس العدد | كل واحد يتحوّل لإيه؟ |
| [[sumOf { }]] / [[count { }]] | رقم | اجمع / عدّ |
| [[maxByOrNull { }]] | عنصر أو null | الأكبر بإيه؟ |
| [[any]] / [[all]] / [[none]] | Boolean | فيه؟ كلهم؟ ولا واحد؟ |
| [[first { }]] / [[firstOrNull { }]] | عنصر / عنصر أو null | أول واحد يطابق |
| [[groupBy { }]] | Map من مفتاح لـ List | قسّم حسب إيه؟ |
| [[sortedBy { }]] | List مرتبة | رتّب بإيه؟ |
| [[reduce]] / [[fold(start)]] | قيمة واحدة | جمّعهم إزاي؟ |

- ولا دالة فيهم بتغيّر الـ List الأصلية. حط النتيجة في متغير.
- لو ممكن ميلاقيش: النسخة اللي فيها [[OrNull]].`,
          lines: [
            R`[[data class]] بسيط يشيل بيانات الأوردر.`,
            R`بداية [[main]].`,
            "List فيها 4 أوردرات.",
            "أوردر 1.",
            "أوردر 2 (مش مدفوع).",
            "أوردر 3.",
            "أوردر 4.",
            "قفلة الـ List.",
            R`[[filter]]: المدفوع بس.`,
            "3.",
            R`[[map]] للأسماء و [[distinct()]] بتشيل التكرار.`,
            "[Sara, Omar, Ali].",
            R`[[sumOf]]: 250 + 120 + 300 = 670.0.`,
            R`أكبر أوردر، أو null لو الـ List فاضية.`,
            R`[[?.]] لأنه ممكن null: Ali.`,
            R`[[any]]: فيه واحد مش مدفوع؟ true.`,
            R`[[groupBy]]: Map من الاسم لـ List أوردراته.`,
            R`[[mapValues]] بيحوّل كل قيمة لعددها.`,
            "ترتيب تنازلي وبعدين ناخد الإجماليات بس.",
            "طباعة الإجماليات مترتبة.",
            R`[[reduce]]: 1 × 2 × 3 × 4.`,
            "24.",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[3]]
[[[Sara, Omar, Ali]]]
[[670.0]]
[[Ali]]
[[true]]
[[{Sara=2, Omar=1, Ali=1}]]
[[[300.0, 250.0, 120.0, 90.0]]]
[[24]]

وحل التجربة: (١) [[[Omar]]]، (٢) [[370.0]]، (٣) «مفيش»، (٤) [[true]].`,
          solCode: R`data class Order(val customer: String, val total: Double, val paid: Boolean)

fun main() {
    val orders = listOf(
        Order("Sara", 250.0, true),
        Order("Omar", 90.0, false),
        Order("Sara", 120.0, true),
        Order("Ali", 300.0, true)
    )
    println(orders.filter { !it.paid }.map { it.customer })
    println(orders.filter { it.customer == "Sara" }.sumOf { it.total })
    println(orders.firstOrNull { it.total > 1000 }?.customer ?: "مفيش")
    println(orders.all { it.total > 50 })
}`
        }
      ]
    }
  ]
});
