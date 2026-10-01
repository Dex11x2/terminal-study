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
            mistakes: R`تسطّب Android Studio قبل ما تعرف اللغة وتتوه في Gradle والـ emulator من أول يوم. وتنسى [[-include-runtime]] فالـ jar يقع بـ [[NoClassDefFoundError: kotlin/jvm/internal/Intrinsics]]. وتسمّي الملف [[Hello World.kt]] بمسافة: خليه من غير مسافات.`
          },
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
            how: R`[[listOf]] على الـ JVM بترجّع [[ArrayList]] بتاعة Java، بس من ورا interface [[List]] اللي مفيهاش add. يعني read-only مش immutable: لو حد عنده reference لنفس الـ list كـ [[MutableList]] يقدر يغيّرها، وانت هتشوف التغيير (درس الانترفيو فيه مثال).

[[mapOf]] و [[setOf]] بيحافظوا على ترتيب الإضافة ([[LinkedHashMap]] و [[LinkedHashSet]]).

[[map[key]]] بترجّع null لو المفتاح مش موجود، و [[getValue(key)]] بترمي exception، و [[getOrDefault(key, 0)]] و [[getOrPut(key) { ... }]] مفيدين جدًا للعدّادات والـ cache.

و [[in]] بتسأل «موجود؟»: على List و Set بتدوّر في العناصر، وعلى Map بتدوّر في المفاتيح. و Set أسرع بكتير من List في السؤال ده لما العناصر كتير.`,
            when: R`[[List]] افتراضيًا. [[Set]] لما التكرار ممنوع (tags، ids متعلّمة). [[Map]] لما بتدوّر بمفتاح. والـ mutable جوه دالة أو class وانت بتبني الداتا، وبرا اعرضها read-only.`,
            mistakes: R`[[names[3]]] على List فيها 3 عناصر: [[IndexOutOfBoundsException]]. استخدم [[getOrNull(3)]]. و [[val list = listOf(...)]] وتحاول [[list.add]]: مفيش add في List، محتاج mutableListOf. وتفتكر إن [[val]] معناها إن الـ list مش هتتغير: [[val cart = mutableListOf()]] ينفع تضيف فيها عادي.`
          },
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
    },
    {
      t: "الكلاسات",
      l: 1,
      n: "class والـ constructor، و data class، و object و companion، و enum و sealed، و interface والوراثة",
      items: [
        {
          cmd: "class",
          title: "تعمل class في Kotlin إزاي؟ (primary constructor و properties و init و private set)",
          desc: R`الـ [[class]] قالب بتعمل منه objects. كل object ليه بيانات (properties) وتصرفات (methods، يعني دوال جوه الكلاس).

في Kotlin الـ constructor بيتكتب في نفس سطر اسم الكلاس، واسمه primary constructor:
[[class BankAccount(val owner: String, initialBalance: Double = 0.0)]]
• [[val owner]] بـ val أو var: ده parameter وكمان property في نفس الوقت. تقدر تقول [[acc.owner]] من برا.
• [[initialBalance]] من غير val: parameter بس، بتستخدمه وانت بتعمل الـ object ومش بيتحفظ.

وتعمل object بنداء الكلاس كأنه دالة: [[BankAccount("Sara", 100.0)]]. مفيش [[new]] في Kotlin.

جوه الكلاس:
• [[init { }]]: كود بيتنفذ أول ما الـ object يتعمل، مكان مناسب للتحقق من القيم. [[require(شرط) { "رسالة" }]] بترمي exception لو الشرط false.
• [[var balance = initialBalance]] و [[private set]] تحتيها: أي حد يقدر يقرا balance، بس محدش يغيّرها غير الكلاس نفسه. ده اسمه encapsulation.
• [[override fun toString()]]: بتحدد الـ object يتطبع إزاي. [[override]] معناها «بغيّر دالة موجودة أصلًا في الأب» (كل الكلاسات في Kotlin بتورث من [[Any]] اللي فيها toString).

الـ visibility: [[public]] (الافتراضي، مش لازم تكتبها)، و [[private]] (جوه الكلاس بس)، و [[protected]] (الكلاس وولاده)، و [[internal]] (جوه نفس الـ module، يعني نفس مشروع Gradle).`,
          example: R`class BankAccount(val owner: String, initialBalance: Double = 0.0) {
    var balance = initialBalance
        private set
    init {
        require(initialBalance >= 0) { "الرصيد مينفعش يبقى سالب" }
    }
    fun deposit(amount: Double) {
        balance += amount
    }
    fun withdraw(amount: Double): Boolean {
        if (amount > balance) return false
        balance -= amount
        return true
    }
    override fun toString() = "$owner: $balance"
}
fun main() {
    val acc = BankAccount("Sara", 100.0)
    acc.deposit(50.0)
    println(acc.withdraw(500.0))
    println(acc.withdraw(30.0))
    println(acc)
    // السطر الجاي مش هيترجم: balance ليها private set
    // acc.balance = 1_000_000.0
}`,
          try: R`اعمل [[class Counter(private val max: Int)]] فيها [[var value = 0]] بـ [[private set]]، ودالة [[increment()]] بتزوّد واحد بس لو لسه أقل من max، ودالة [[reset()]]. جرّبها بـ max = 3 وزوّد 5 مرات واطبع value. وبعدين جرّب تكتب [[counter.value = 10]] من main.`,
          flag: "script",
          deep: {
            why: R`كل حاجة في Android كلاس: الـ Activity، والـ ViewModel، والـ Repository، والـ Room Database. وفهم الـ constructor والـ visibility هو اللي بيخليك تقرا أي كود Android. والـ [[private set]] بالذات هتشوفه في كل ViewModel: الشاشة تقرا الـ state بس، والـ ViewModel بس اللي يغيّرها.`,
            how: R`الـ property في Kotlin مش متغير عادي: هي field مخفي ومعاه getter (و setter لو var). [[acc.balance]] بتنادي getter في الخفا. وتقدر تكتب getter بنفسك: [[val isRich get() = balance > 1_000_000]] بتتحسب كل مرة تتقري، ومش بتتخزن.

الكلاسات في Kotlin [[final]] افتراضيًا: محدش يقدر يورث منها إلا لو كتبت [[open class]] (درس interface والوراثة).

ولو محتاج أكتر من طريقة تعمل بيها object: الأفضل قيم افتراضية في الـ primary constructor، وفيه كمان secondary constructor بـ [[constructor(...) : this(...)]] بس نادرًا ما هتحتاجه.

و [[lateinit var]] و [[by lazy]] (من درس null safety) أكتر مكان بيتستخدموا فيه جوه الكلاسات: property هتتعمل بعدين، أو حسابها تقيل ومش عايزه يتعمل غير لو احتاجته.`,
            when: R`لما عندك بيانات ومعاها تصرفات وقواعد (رصيد مينفعش يبقى سالب). ولو الكلاس بيشيل داتا بس من غير قواعد، [[data class]] (الدرس الجاي) أنسب.`,
            mistakes: R`تكتب [[new BankAccount(...)]] من عادة Java. وتنسى [[val]] في الـ constructor وتستغرب إن [[acc.owner]] مش موجود. وتخلي كل الـ properties [[var]] و public فأي حد يغيّر الرصيد من برا من غير ما يعدّي على قواعد [[withdraw]].`
          },
          lines: [
            R`كلاس بـ primary constructor: [[owner]] property، و [[initialBalance]] parameter بس ليه قيمة افتراضية.`,
            R`property [[var]] بتبدأ من الرصيد الأول.`,
            R`[[private set]]: القراية من أي حتة، والتغيير من جوه الكلاس بس.`,
            R`[[init]]: بيتنفذ أول ما الـ object يتعمل.`,
            R`[[require]]: لو الشرط false بيرمي IllegalArgumentException بالرسالة دي.`,
            "قفلة init.",
            "method بتزوّد الرصيد.",
            "التغيير مسموح هنا لأننا جوه الكلاس.",
            "قفلة.",
            "method بترجّع true أو false.",
            R`[[return]] بدري لو الفلوس مش كفاية.`,
            "اخصم.",
            "نجحت.",
            "قفلة.",
            R`[[override]]: شكل الطباعة بدل اسم الكلاس وعنوان في الذاكرة.`,
            "قفلة الكلاس.",
            R`بداية [[main]].`,
            R`object جديد من غير [[new]].`,
            "بقى 150.",
            "500 أكتر من 150: false.",
            "true، والرصيد بقى 120.",
            R`بيستخدم [[toString]] بتاعتنا.`,
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[false]]
[[true]]
[[Sara: 120.0]]

وحل التجربة تحت: بعد 5 زيادات بـ max = 3 القيمة 3. و [[counter.value = 10]] بتطلّع غلط من المترجم: [[cannot access 'value': it is private in 'Counter']] (الصياغة ممكن تختلف شوية حسب نسخة Kotlin).`,
          solCode: R`class Counter(private val max: Int) {
    var value = 0
        private set

    fun increment() {
        if (value < max) value++
    }

    fun reset() {
        value = 0
    }
}

fun main() {
    val counter = Counter(3)
    repeat(5) { counter.increment() }
    println(counter.value)
}`
        },
        {
          cmd: "الـ Data Classes والـ Lambdas",
          title: "data class: كلاس للبيانات بيطبع ويقارن وينسخ نفسه لوحده (toString و == و copy)",
          desc: R`كتير من الكلاسات بتشيل داتا وبس: مستخدم، منتج، رسالة. لو حطيت كلمة [[data]] قبل [[class]]، Kotlin بتكتبلك لوحدها:
• [[toString()]]: الطباعة بتطلع [[Product(id=1, title=سماعة, price=150.0)]] بدل كلام مش مفهوم.
• [[equals()]] و [[hashCode()]]: [[==]] بتقارن القيم. اتنين منتجات بنفس البيانات يبقوا متساويين.
• [[copy()]]: نسخة جديدة وانت بتغيّر حاجة واحدة بس: [[p1.copy(price = 120.0)]].
• [[componentN()]]: عشان تفك الـ object لقيم: [[val (id, title) = p1]] (destructuring).

الفرق بين [[==]] و [[===]]: [[==]] «نفس القيمة؟» (بتنادي equals)، و [[===]] «نفس الـ object بالظبط في الذاكرة؟».

وبتتكتب الـ properties [[val]] غالبًا. لو عايز تغيّر حاجة، بتعمل [[copy]] بدل ما تعدّل في الأصلي. والأسلوب ده (الـ immutability) هو اللي Compose و StateFlow مبنيين عليه: الشاشة بتعرف إن فيه تغيير لما object جديد يوصل.

وفي آخر المثال هتلاقي [[filter { it.price >= 100.0 }]]: الكود اللي بين [[{ }]] ده lambda، و [[it]] هو كل منتج. شفناه في درس map و filter، وهنشرحه بالتفصيل في درس الـ lambdas.`,
          example: R`data class Product(val id: Int, val title: String, val price: Double)
fun main() {
    val p1 = Product(1, "سماعة", 150.0)
    val p2 = Product(1, "سماعة", 150.0)
    println(p1)
    println(p1 == p2)
    println(p1 === p2)
    val discounted = p1.copy(price = 120.0)
    println(discounted)
    val (id, title) = p1
    println("$id - $title")
    val products = listOf(p1, Product(2, "كابل", 45.0), Product(3, "ساعة", 300.0))
    val premium = products.filter { it.price >= 100.0 }.map { it.title }
    println(premium)
}`,
          try: R`اعمل [[data class User(val name: String, val email: String, val isVerified: Boolean = false)]]. اعمل user، وبعدين نسخة منه verified بـ [[copy]]. اطبع الاتنين، وقارنهم بـ [[==]]. بعدين شيل كلمة [[data]] واطبع تاني وشوف الفرق في الطباعة والمقارنة.`,
          flag: "script",
          deep: {
            why: R`الـ JSON اللي جاي من الـ API، والصف اللي في Room، والـ UI state اللي الـ ViewModel بيبعته للشاشة: كلهم data classes. في Java الكلاس ده كان ٥٠ سطر getters و setters و equals و hashCode، وغالبًا كان فيه غلطة في واحدة منهم. هنا سطر واحد.`,
            how: R`الدوال المتولدة بتستخدم الـ properties اللي في الـ primary constructor بس. لو عرّفت property جوه جسم الكلاس، مش هتدخل في [[==]] ولا [[toString]].

[[copy]] بتعمل shallow copy: لو فيه property نوعها MutableList، النسختين بيشاوروا على نفس الـ list. عشان كده خلي الـ properties [[val]] وأنواعها read-only ([[List]] مش [[MutableList]]).

[[hashCode]] المتسق مع equals هو اللي بيخلي data class تشتغل صح كمفتاح في Map أو عنصر في Set.

والـ data class لازم يكون عندها parameter واحد على الأقل، ومينفعش تبقى open أو abstract. وفيه [[data object]] لحالة مفيهاش بيانات (هتشوفه في sealed).`,
            when: R`أي كلاس شغلته يشيل داتا: models من السيرفر، و entities، و UI state. ومتستخدمهاش لكلاس فيه منطق وحالة داخلية زي BankAccount، لأن [[copy]] ممكن تعمل نسخة تكسر القواعد بتاعته.`,
            mistakes: R`تحط [[var]] في data class وتعدّل في object موجود في List جوه state: Compose مش هيحس بالتغيير لأن الـ object هو هو. اعمل [[copy]]. وتستخدم [[===]] وانت قصدك تقارن القيم.`
          },
          lines: [
            R`[[data class]] بـ 3 properties.`,
            R`بداية [[main]].`,
            "منتج.",
            "منتج تاني بنفس القيم بالظبط.",
            R`[[toString]] الجاهزة: Product(id=1, title=سماعة, price=150.0).`,
            R`[[==]] بتقارن القيم: true.`,
            R`[[===]] بتقارن الـ object نفسه: false، دول اتنين.`,
            R`[[copy]] بسعر جديد، والأصلي زي ما هو.`,
            "طباعة النسخة.",
            R`destructuring: أول property وتاني property.`,
            "1 - سماعة.",
            "List فيها 3 منتجات.",
            R`[[filter]] للي سعره 100 أو أكتر، و [[map]] للعناوين بس.`,
            "[سماعة, ساعة].",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[Product(id=1, title=سماعة, price=150.0)]]
[[true]]
[[false]]
[[Product(id=1, title=سماعة, price=120.0)]]
[[1 - سماعة]]
[[[سماعة, ساعة]]]

وفي التجربة: النسختين بيتطبعوا بكل البيانات، و [[==]] بـ false لأن isVerified مختلفة. ولما تشيل [[data]]: الطباعة بتبقى حاجة زي [[User@5e2de80c]]، و [[copy]] مبقتش موجودة أصلًا فالكود مش هيترجم لحد ما تشيلها، و [[==]] بين اتنين بنفس القيم بقت false.`,
          solCode: R`data class User(val name: String, val email: String, val isVerified: Boolean = false)

fun main() {
    val user = User("Sara", "sara@mail.com")
    val verified = user.copy(isVerified = true)
    println(user)
    println(verified)
    println(user == verified)
}`
        },
        {
          cmd: "object و companion",
          title: "object و companion object: نسخة واحدة بس، ودوال على الكلاس نفسه",
          desc: R`أحيانًا عايز حاجة منها نسخة واحدة بس في البرنامج كله: إعدادات، أو cache. بدل class وتعمل منه object، اكتب [[object]] على طول:
[[object AppConfig { ... }]]
وبتوصل لها باسمها: [[AppConfig.BASE_URL]]. ده اسمه singleton، و Kotlin بتضمن إنه بيتعمل مرة واحدة وبأمان حتى مع أكتر من thread.

[[const val]] جوه object: ثابت قيمته معروفة وقت الترجمة (رقم أو نص). الاسم بحروف كبيرة بالعرف.

و [[companion object { }]] جوه class: حاجات تخص الكلاس نفسه مش كل object منه. تناديها باسم الكلاس: [[User.create("Sara")]]. ده بديل [[static]] في Java (مفيش static في Kotlin).

أشهر استخدام: factory function. تخلي الـ constructor [[private constructor]] فمحدش يعمل object مباشرة، وتعمل دالة في الـ companion بتنضّف المدخلات أو تتأكد منها الأول.

وفي Android هتشوفه كتير: [[companion object { const val TAG = "MainActivity" }]] للـ log، أو [[private const val]] برا الكلاس خالص (top-level) ودي أبسط.`,
          example: R`object AppConfig {
    const val BASE_URL = "https://api.example.com/"
    var darkMode = false
}
class User private constructor(val name: String) {
    companion object {
        private var created = 0
        fun create(name: String): User {
            created++
            return User(name.trim())
        }
        fun count() = created
    }
}
fun main() {
    println(AppConfig.BASE_URL)
    AppConfig.darkMode = true
    println(AppConfig.darkMode)
    val u = User.create("  Sara ")
    User.create("Omar")
    println("[$__{u.name}]")
    println(User.count())
}`,
          try: R`اعمل [[object Cart]] فيه [[private val items = mutableListOf<String>()]] ودوال [[add(item)]] و [[count()]]. ضيف 3 حاجات من main واطبع العدد. بعدين اعمل [[class Temperature private constructor(val celsius: Double)]] فيها companion بـ [[fromFahrenheit(f: Double)]].`,
          flag: "script",
          deep: {
            why: R`في Android محتاج حاجات «واحدة بس»: الـ Retrofit client، والـ Room database، والـ Json config. لو عملت منهم كذا نسخة هتضيع ذاكرة، وفي Room ممكن الداتا تتلخبط. الـ object أبسط طريقة لده، و Hilt (المستوى ٣) هو الطريقة الأنظف في المشاريع الكبيرة.`,
            how: R`[[object]] بيتحول لكلاس فيه field static اسمه [[INSTANCE]] بيتعمل أول مرة الكلاس يتحمّل. عشان كده Java بتناديه [[AppConfig.INSTANCE.getDarkMode()]]، إلا لو حطيت [[@JvmStatic]] أو [[@JvmField]] أو كانت [[const]].

الـ companion object هو object جوه الكلاس اسمه الافتراضي [[Companion]]. وممكن يعمل implement لـ interface، وده اللي بيخلي حاجات زي [[Json.Default]] شغالة.

وفيه object expression: [[val listener = object : OnClickListener { override fun onClick(...) { } }]]: object من غير اسم بيعمل implement لـ interface في مكانه. هتشوفه في كود Java/XML القديم.`,
            when: R`[[object]] لحاجة واحدة مفيهاش state بيتغير كتير، أو state فعلًا عام للتطبيق كله. [[companion]] للثوابت والـ factories المرتبطة بكلاس معين.`,
            mistakes: R`تحط state كتير بيتغير في object عام: أي حتة في التطبيق تقدر تغيّره، فالبق يبقى صعب تلاقيه، والاختبارات تأثر في بعض. وتحط [[Context]] أو Activity في object: الـ object عايش طول عمر التطبيق، فالـ Activity مش هتتمسح من الذاكرة (memory leak).`
          },
          lines: [
            R`[[object]]: singleton، نسخة واحدة بس.`,
            R`[[const val]]: ثابت وقت الترجمة.`,
            R`[[var]] عادي: state مشترك.`,
            "قفلة.",
            R`كلاس الـ constructor بتاعه [[private]]: محدش يعمل [[User(...)]] من برا.`,
            R`[[companion object]]: حاجات على الكلاس نفسه.`,
            R`عداد [[private]] جوه الـ companion.`,
            "factory function.",
            "زوّد العداد.",
            R`جوه الكلاس ينفع نستخدم الـ constructor الـ private، وبننضّف المسافات بـ [[trim()]].`,
            "قفلة.",
            "عدد اللي اتعملوا.",
            "قفلة الـ companion.",
            "قفلة الكلاس.",
            R`بداية [[main]].`,
            "باسم الـ object على طول.",
            "تغيير القيمة.",
            "true.",
            "من خلال الـ factory.",
            "واحد تاني.",
            "[Sara]: المسافات اتشالت.",
            "2.",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[https://api.example.com/]]
[[true]]
[[[Sara]]]
[[2]]

وحل التجربة تحت: العدد 3، و [[Temperature.fromFahrenheit(212.0).celsius]] بـ 100.0.`,
          solCode: R`object Cart {
    private val items = mutableListOf<String>()
    fun add(item: String) { items.add(item) }
    fun count() = items.size
}

class Temperature private constructor(val celsius: Double) {
    companion object {
        fun fromFahrenheit(f: Double) = Temperature((f - 32) * 5 / 9)
    }
}

fun main() {
    Cart.add("قلم")
    Cart.add("كشكول")
    Cart.add("مسطرة")
    println(Cart.count())
    println(Temperature.fromFahrenheit(212.0).celsius)
}`
        },
        {
          cmd: "enum و sealed",
          title: "enum class و sealed interface: حالات محدودة والمترجم بيتأكد إنك غطيتها كلها",
          desc: R`لما القيمة ليها عدد محدود من الاحتمالات، متستخدمش String (ممكن تكتب "paied" غلط ومحدش ياخد باله):

[[enum class Status { PENDING, PAID, SHIPPED }]]: كل قيمة object ثابت. وممكن يكون ليها properties: [[enum class Status(val label: String)]]. [[Status.entries]] بترجّع كل القيم، و [[name]] اسمها كنص.

[[sealed]] أقوى: كل حالة ممكن تكون كلاس ليه بيانات مختلفة. المثال الأشهر في Android حالة الشاشة:
• [[Loading]]: مفيش بيانات، فبيبقى [[data object]].
• [[Success(val data: ...)]]: معاه الداتا.
• [[Error(val message: String)]]: معاه رسالة الغلط.

[[sealed interface LoadState]] ومعاها الحالات تحتها بـ [[: LoadState]] (النقطتين هنا معناها «بينفذ/بيورث من»). كلمة sealed معناها إن الحالات دي بس، ومحدش يقدر يضيف حالة من مكان تاني (لازم يبقوا في نفس الـ package والـ module).

وده بيدّي ميزة كبيرة مع [[when]]: لما تغطي كل الحالات، مش محتاج [[else]]. ولو ضفت حالة جديدة بعدين، المترجم هيطلّع غلط في كل when ناقصها، فمش هتنسى تعرضها.

وجوه الفرع [[is LoadState.Success ->]] المترجم بيعمل smart cast، فتقدر تكتب [[r.data]] على طول.`,
          example: R`enum class Status(val label: String) {
    PENDING("مستني"), PAID("اتدفع"), SHIPPED("اتشحن")
}
sealed interface LoadState {
    data object Loading : LoadState
    data class Success(val data: String) : LoadState
    data class Error(val message: String) : LoadState
}
fun render(r: LoadState): String = when (r) {
    LoadState.Loading -> "بيحمّل..."
    is LoadState.Success -> "تمام: $__{r.data}"
    is LoadState.Error -> "غلط: $__{r.message}"
}
fun main() {
    val s = Status.PAID
    println(s.label)
    println(Status.entries.map { it.name })
    println(render(LoadState.Loading))
    println(render(LoadState.Success("3 منتجات")))
    println(render(LoadState.Error("مفيش نت")))
}`,
          try: R`ضيف حالة [[data object Empty : LoadState]] وشغّل: المترجم هيقولك إن when ناقصها. ضيف الفرع وخليه يرجّع «مفيش داتا». وبعدين ضيف لـ Status قيمة [[CANCELLED("اتلغى")]] واطبع كل الـ labels.`,
          flag: "script",
          deep: {
            why: R`أي شاشة بتجيب داتا ليها على الأقل ٣ حالات (بيحمّل، خلص، غلط)، وأغلب البق في الواجهات سببه حالة محدش فكر فيها: الـ spinner فضل لافف لأن حد نسي حالة الـ error. الـ sealed مع when بتخلي المترجم هو اللي يفكرك.`,
            how: R`[[enum]] كل قيمة فيه object واحد بيتعمل لما الكلاس يتحمّل، وليها [[ordinal]] (ترتيبها) و [[name]]. و [[Status.valueOf("PAID")]] بتحوّل من نص (وترمي exception لو مش موجود). و [[entries]] (من Kotlin 1.9) هي البديل الأحسن لـ [[values()]] القديمة.

الـ [[sealed]] المترجم بيعرف كل الكلاسات اللي تحتها وقت الترجمة، وده اللي بيخليه يتأكد إن when «exhaustive» (مغطية كل حاجة).

[[data object]] (من Kotlin 1.9) زي object بس الطباعة بتطلع اسمه ([[Loading]]) بدل [[LoadState$Loading@1b6d3586]].

[[sealed interface]] ولا [[sealed class]]؟ الـ interface أخف ومبيفرضش constructor، والكلاس ينفذ أكتر من interface. الـ sealed class لما الحالات محتاجة state أو constructor مشترك.`,
            when: R`[[enum]] لقيم ثابتة من غير بيانات مختلفة (حالة طلب، نوع حساب، اتجاه). [[sealed]] لما كل حالة ليها بيانات مختلفة: UI state، نتيجة عملية، أحداث (events) من الشاشة للـ ViewModel.`,
            mistakes: R`تحط [[else]] في when على sealed «احتياطي»: كده لما تضيف حالة جديدة المترجم مش هيقولك حاجة، وراحت الميزة. وتخزّن [[ordinal]] في الداتابيز: لو رتبت القيم بعدين الداتا القديمة هتتقري غلط، خزّن [[name]].`
          },
          lines: [
            R`[[enum class]] بـ property لكل قيمة.`,
            "القيم التلاتة، وكل واحدة بالـ label بتاعها.",
            "قفلة.",
            R`[[sealed interface]]: الحالات اللي تحت دي بس.`,
            R`[[data object]]: حالة من غير بيانات.`,
            "حالة معاها داتا.",
            "حالة معاها رسالة غلط.",
            "قفلة.",
            R`دالة بترجّع [[when]] على طول.`,
            R`[[Loading]] object واحد فبنقارن بيه مباشرة.`,
            R`[[is]]: لو Success، و [[r.data]] متاحة بالـ smart cast.`,
            R`آخر حالة، ومفيش [[else]] لأننا غطينا الكل.`,
            "قفلة when.",
            R`بداية [[main]].`,
            "قيمة من الـ enum.",
            "اتدفع.",
            R`[[entries]]: كل القيم، و [[name]] اسم كل واحدة.`,
            "بيحمّل...",
            "تمام: 3 منتجات.",
            "غلط: مفيش نت.",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[اتدفع]]
[[[PENDING, PAID, SHIPPED]]]
[[بيحمّل...]]
[[تمام: 3 منتجات]]
[[غلط: مفيش نت]]

ولما تضيف [[Empty]] من غير فرع، المترجم بيقول حاجة زي: [['when' expression must be exhaustive. Add the 'Empty' branch or an 'else' branch.]] ضيف [[LoadState.Empty -> "مفيش داتا"]] ويترجم.`,
          solCode: R`enum class Status(val label: String) {
    PENDING("مستني"), PAID("اتدفع"), SHIPPED("اتشحن"), CANCELLED("اتلغى")
}

sealed interface LoadState {
    data object Loading : LoadState
    data object Empty : LoadState
    data class Success(val data: String) : LoadState
    data class Error(val message: String) : LoadState
}

fun render(r: LoadState): String = when (r) {
    LoadState.Loading -> "بيحمّل..."
    LoadState.Empty -> "مفيش داتا"
    is LoadState.Success -> "تمام: $__{r.data}"
    is LoadState.Error -> "غلط: $__{r.message}"
}

fun main() {
    println(Status.entries.map { it.label })
    println(render(LoadState.Empty))
}`
        },
        {
          cmd: "interface و الوراثة",
          title: "interface و open و abstract و override: إزاي كلاس يورث من كلاس تاني؟",
          desc: R`الـ [[interface]] عقد: «أي حد بينفذني لازم يكون عنده كذا». ممكن يبقى فيه دوال من غير جسم (لازم اللي بينفذه يكتبها)، أو بجسم افتراضي. والكلاس بينفذه بـ [[: Payable]] بعد اسمه.

الوراثة (inheritance): كلاس ياخد كل حاجة من كلاس تاني ويزوّد أو يغيّر. في Kotlin:
• الكلاسات [[final]] افتراضيًا. عشان حد يورث منها لازم تكتب [[open class]]. وده عكس Java، ومقصود: الوراثة لازم تبقى قرار.
• [[abstract class]]: مينفعش تعمل منه object، لازم تورث منه. وممكن يبقى فيه حاجات abstract لازم الولاد يكتبوها.
• [[override]] قدام أي دالة أو property بتغيّرها من الأب أو من interface. إجباري، مش اختياري زي @Override في Java.
• الوراثة بتتكتب [[class FullTime(...) : Employee(name)]]: الأقواس بعد اسم الأب معناها إنك بتنادي الـ constructor بتاعه.

كلاس يورث من كلاس واحد بس، بس ينفذ أي عدد interfaces.

والفايدة الأكبر (اسمها polymorphism): List من [[Employee]] فيها أنواع مختلفة، وكل واحد بيرد على [[describe()]] بطريقته.`,
          example: R`interface Payable {
    val amount: Double
    fun describe(): String = "مبلغ $amount"
}
abstract class Employee(val name: String) : Payable
class FullTime(name: String, private val salary: Double) : Employee(name) {
    override val amount get() = salary
}
open class Freelancer(name: String, val hours: Int, val rate: Double) : Employee(name) {
    override val amount get() = hours * rate
    override fun describe() = "$name: $hours ساعة = $amount"
}
fun main() {
    val team: List<Employee> = listOf(FullTime("Sara", 15000.0), Freelancer("Omar", 40, 250.0))
    for (e in team) println(e.describe())
    println(team.sumOf { it.amount })
}`,
          try: R`اعمل [[interface Shape { fun area(): Double }]] وكلاسين [[Circle(r)]] و [[Rect(w, h)]] بينفذوه. حطهم في List واطبع مجموع المساحات. وبعدين جرّب تعمل [[class Square : Rect(...)]] من غير ما تكتب [[open]] قدام Rect وشوف المترجم هيقول إيه.`,
          flag: "script",
          deep: {
            why: R`Android كله مبني على كده: الـ Activity بتاعتك بتورث من [[ComponentActivity]] وبتعمل override لـ [[onCreate]]، والـ ViewModel بيورث من [[ViewModel]]، و Retrofit بيعملك الـ API من interface، و Room بيعمل الـ DAO من interface. والـ interface هي اللي بتخليك تبدّل التنفيذ الحقيقي بتنفيذ وهمي (fake) في الاختبارات.`,
            how: R`الـ interface في Kotlin ممكن يبقى فيه properties (من غير قيمة مخزنة) ودوال بجسم. والكلاس اللي بينفذه بيكتب اللي ناقص بس.

[[override val amount get() = salary]]: property بتتحسب من getter، والنوع اتستنتج من الـ getter. ولو كلاس بينفذ interfaceين فيهم نفس الدالة بجسم، لازم تعمل override وتختار: [[super<A>.f()]].

[[super.describe()]] بتنادي نسخة الأب جوه الـ override.

وأي دالة [[override]] بتفضل [[open]] للي بعدك. لو عايز تقفلها: [[final override fun]].

وفيه أسلوب بديل للوراثة اسمه composition: الكلاس يبقى «عنده» حاجة بدل ما «يكون» حاجة. Kotlin بتسهّله بـ [[by]]: [[class Logger(private val inner: Printer) : Printer by inner]] بيعدّي كل الدوال لـ inner لوحده.`,
            when: R`[[interface]] لما أكتر من كلاس مختلفين لازم يقدموا نفس القدرة (أو عشان الاختبارات). [[abstract class]] لما فيه كود و state مشترك فعلًا. والوراثة العميقة (أب وجد وجد الجد) ابعد عنها: صعبة تتفهم وتتغير.`,
            mistakes: R`تنسى [[open]] وتستغرب [[this type is final, so it cannot be extended]]. وتنسى [[override]] فيقول [['describe' hides member of supertype 'Payable' and needs an 'override' modifier]]. وتحط الأقواس على interface: [[: Payable()]] غلط، الـ interface ملوش constructor.`
          },
          lines: [
            R`[[interface]]: عقد.`,
            "property لازم كل واحد يحددها.",
            "دالة ليها تنفيذ افتراضي.",
            "قفلة.",
            R`[[abstract]]: مينفعش يتعمل منه object، وبينفذ Payable (من غير ما يحدد amount، فالولاد هيحددوه).`,
            R`بيورث من Employee وبينادي الـ constructor بتاعه بـ [[(name)]].`,
            R`[[override]] للـ property بـ getter.`,
            "قفلة.",
            R`[[open]]: ينفع حد يورث منه بعد كده.`,
            "amount هنا حساب.",
            R`[[override]] للدالة بشكل مختلف.`,
            "قفلة.",
            R`بداية [[main]].`,
            R`List نوعها Employee وجواها نوعين مختلفين.`,
            "كل واحد بيرد بطريقته.",
            R`[[sumOf]] على الـ property المشتركة.`,
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[مبلغ 15000.0]]
[[Omar: 40 ساعة = 10000.0]]
[[25000.0]]

FullTime استخدم [[describe]] الافتراضية من الـ interface، و Freelancer كتب نسخته.

وحل التجربة تحت: المجموع [[52.56637061435917]] (دايرة نص قطرها 2 مساحتها حوالي 12.57، ومستطيل 5 في 8 = 40)، و Square بضلع 3 مساحته [[9.0]]. ومن غير [[open]] قدام Rect المترجم بيقول [[this type is final, so it cannot be extended]].`,
          solCode: R`import kotlin.math.PI

interface Shape {
    fun area(): Double
}

class Circle(private val r: Double) : Shape {
    override fun area() = PI * r * r
}

open class Rect(private val w: Double, private val h: Double) : Shape {
    override fun area() = w * h
}

class Square(side: Double) : Rect(side, side)

fun main() {
    val shapes = listOf(Circle(2.0), Rect(5.0, 8.0))
    println(shapes.sumOf { it.area() })
    println(Square(3.0).area())
}`
        }
      ]
    },
    {
      t: "Kotlin بأسلوبها: lambdas والامتدادات والأخطاء",
      l: 1,
      n: "تزوّد دوال على كلاس مش بتاعك، والـ lambdas والدوال اللي بتاخد دوال، و let و apply وأخواتهم، و try و Result",
      items: [
        {
          cmd: "extension functions",
          title: "extension function: تضيف دالة لـ String أو أي كلاس من غير ما تلمسه",
          desc: R`عايز [["sara@mail.com".isValidEmail()]]؟ String مش بتاعتك ومتقدرش تعدّل فيها، بس Kotlin بتخليك تكتب:
[[fun String.isValidEmail(): Boolean = contains("@") && contains(".")]]
• [[String.]] قبل اسم الدالة معناها «الدالة دي هتتنادى على String». النوع ده اسمه receiver.
• جوه الدالة [[this]] هو النص نفسه، وممكن تسيبها وتكتب [[contains(...)]] على طول.

وفيه extension property: [[val String.initials: String get() = ...]]. من غير قيمة مخزنة، لازم getter.

وتقدر تعمل extension على نوع nullable: [[fun String?.orDash()]]. تتنادى على [[null]] عادي، وجواها [[this]] ممكن تبقى null.

مكتبة Kotlin نفسها معظمها extensions: [[filter]] و [[map]] و [[isNullOrBlank]] و [[toIntOrNull]] كلهم extensions على List و String. وفي Android كمان: مكتبة [[core-ktx]] فيها extensions زي [[context.getSystemService<T>()]] و [[bundleOf("id" to 5)]].`,
          example: R`fun String.isValidEmail(): Boolean = contains("@") && contains(".")
fun Double.toEgp(): String = "%.2f ج.م".format(this)
val String.initials: String
    get() = split(" ").joinToString("") { it.take(1) }
fun String?.orDash(): String = this ?: "-"
fun main() {
    println("sara@mail.com".isValidEmail())
    println("sara".isValidEmail())
    println(99.5.toEgp())
    println("Sara Ahmed".initials)
    val phone: String? = null
    println(phone.orDash())
}`,
          try: R`اكتب [[fun Int.isEven(): Boolean]] و [[fun List<Int>.secondLargest(): Int?]] (ترجّع null لو أقل من رقمين مختلفين). جرّب [[listOf(5, 9, 3, 9).secondLargest()]].`,
          flag: "script",
          deep: {
            why: R`بتخلي الكود يتقري زي الجملة: [[price.toEgp()]] بدل [[Formatter.formatEgp(price)]]. وفي Compose كل [[Modifier.padding()]] و [[Modifier.clickable()]] هي extensions على Modifier، وتقدر تعمل modifiers بتاعتك بنفس الطريقة.`,
            how: R`الـ extension مش بتغيّر الكلاس فعلًا. المترجم بيحوّلها لدالة static عادية أول parameter فيها هو الـ receiver: [[isValidEmail("sara")]]. عشان كده:
• مبتقدرش توصل لحاجة [[private]] جوه الكلاس.
• بتتحدد وقت الترجمة حسب النوع المكتوب، مش النوع الحقيقي وقت التشغيل (مفيش polymorphism).
• لو الكلاس عنده دالة بنفس الاسم والـ parameters، دالة الكلاس هي اللي بتكسب دايمًا.

ولو عرّفتها في ملف، بتعمل لها import من أي ملف تاني زي أي دالة. والعرف تحطها في ملف زي [[StringExt.kt]].`,
            when: "دوال مساعدة صغيرة على أنواع مش بتاعتك (تنسيق، تحقق، تحويل). ولو الدالة محتاجة state كتير أو منطق business حقيقي، مكانها class عادي.",
            mistakes: R`تعمل extensions لكل حاجة على [[String]] أو [[Any]] فالـ autocomplete يتملي حاجات ملهاش علاقة ببعض. وتستنى تعمل override لـ extension في كلاس ابن: مش هتشتغل زي ما متوقع.`
          },
          lines: [
            R`extension على String، و [[contains]] بتتنادى على النص نفسه (this).`,
            R`extension على Double، و [[this]] هو الرقم.`,
            "extension property نوعها String.",
            R`getter: يقسّم بالمسافة وياخد أول حرف من كل كلمة.`,
            R`extension على [[String?]]: تتنادى حتى على null.`,
            R`بداية [[main]].`,
            "true.",
            "false.",
            "99.50 ج.م.",
            "SA.",
            "null.",
            R`مفيش [[?.]]: الدالة نفسها بتتعامل مع null وبترجّع -.`,
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[true]]
[[false]]
[[99.50 ج.م]]
[[SA]]
[[-]]

وحل التجربة: [[listOf(5, 9, 3, 9).secondLargest()]] بـ 5 (الـ 9 المكررة بتتحسب مرة بسبب [[distinct()]])، و [[listOf(4, 4).secondLargest()]] بـ null.`,
          solCode: R`fun Int.isEven(): Boolean = this % 2 == 0

fun List<Int>.secondLargest(): Int? =
    distinct().sortedDescending().getOrNull(1)

fun main() {
    println(4.isEven())
    println(listOf(5, 9, 3, 9).secondLargest())
    println(listOf(4, 4).secondLargest())
}`
        },
        {
          cmd: "lambdas",
          title: "lambda يعني إيه؟ و (Int) -> Int و it و :: والـ trailing lambda",
          desc: R`الـ [[lambda]] دالة من غير اسم بتتكتب كقيمة، وتتحط في متغير أو تتبعت لدالة تانية:
[[val double = { n: Int -> n * 2 }]]
• الكود كله بين [[{ }]].
• قبل السهم [[->]] المدخلات، وبعده الجسم. آخر سطر في الجسم هو القيمة اللي بترجع (من غير return).

نوع الدالة بيتكتب [[(Int) -> Int]]: «بتاخد Int وبترجّع Int». و [[() -> Unit]]: مبتاخدش حاجة ومبترجّعش حاجة (ده نوع [[onClick]] في كل زرار في Compose).

لو الـ lambda بتاخد parameter واحد بس، ممكن متكتبش اسمه ولا السهم، وتسميه [[it]]: [[{ it * 2 }]].

الدالة اللي بتاخد دالة (higher-order function) زي [[filter]] و [[map]]: لو آخر parameter دالة، الـ lambda تتكتب برا الأقواس:
[[applyTwice(3) { it + 10 }]] بدل [[applyTwice(3, { it + 10 })]]. ولو هي الـ parameter الوحيد، الأقواس نفسها بتتشال: [[list.filter { ... }]]. ده اسمه trailing lambda، وكل Compose ماشي بيه: [[Button(onClick = { ... }) { Text("...") }]].

و [[::]] بتحوّل دالة موجودة لقيمة (function reference): [[nums.filter(::isEven)]] بدل [[nums.filter { isEven(it) }]].`,
          example: R`fun applyTwice(x: Int, op: (Int) -> Int): Int = op(op(x))
fun isEven(n: Int) = n % 2 == 0
fun main() {
    val double: (Int) -> Int = { n -> n * 2 }
    println(double(5))
    val add = { a: Int, b: Int -> a + b }
    println(add(2, 3))
    println(applyTwice(3, double))
    println(applyTwice(3) { it + 10 })
    val nums = listOf(1, 2, 3, 4, 5)
    println(nums.filter(::isEven))
    var clicks = 0
    val onClick: () -> Unit = { clicks++ }
    onClick()
    onClick()
    println(clicks)
}`,
          try: R`اكتب دالة [[retry(times: Int, action: () -> Boolean): Boolean]] بتنادي action لحد ما ترجّع true أو المحاولات تخلص. جرّبها بـ lambda بتعدّ المحاولات وترجّع true في المحاولة التالتة، واطبع عدد المحاولات.`,
          flag: "script",
          deep: {
            why: R`في Android كل حدث lambda: [[onClick]] و [[onValueChange]] و [[setOnClickListener { }]]. والـ ViewModel بياخد lambdas، والـ coroutines (مستوى ٢) بتبدأ بـ [[launch { }]] وده lambda. لو الفكرة دي مش واضحة، كود Compose هيبان كأنه سحر.`,
            how: R`الـ lambda ممكن تشوف المتغيرات اللي حواليها وتغيّرها كمان: [[clicks++]] جوه الـ lambda بتغيّر المتغير اللي برا. ده اسمه closure.

[[return]] جوه lambda عادية مش مسموح، إلا لو الدالة اللي واخداها [[inline]] (زي forEach و let)، ساعتها [[return]] بترجع من الدالة اللي برا خالص. ولو عايز ترجع من الـ lambda بس: [[return@forEach]]. علامة [[@]] هنا label باسم الدالة.

الدوال اللي زي [[filter]] و [[map]] متعلّمة [[inline]]: المترجم بيحط كود الـ lambda مكان النداء، فمفيش object بيتعمل لكل lambda ومفيش أي تكلفة في الأداء.

ولو parameter مش محتاجه: [[{ _, value -> ... }]].`,
            when: R`أي حتة بتبعت فيها «تصرف»: event handlers، والـ callbacks، والفلترة والترتيب. ولو الـ lambda كبرت لأكتر من كام سطر، طلّعها دالة ليها اسم وابعتها بـ [[::]].`,
            mistakes: R`تكتب [[{ it -> it * 2 }]]: لو سميت الـ parameter متقولش it. وتنسى إن آخر سطر هو القيمة: [[{ println(it); it > 5 }]] بترجّع Boolean عادي. وفي Compose تكتب [[onClick = doSomething()]]: كده بتنادي الدالة وقت رسم الشاشة! الصح [[onClick = { doSomething() }]] أو [[onClick = ::doSomething]].`
          },
          lines: [
            R`دالة بتاخد دالة: [[op]] نوعها [[(Int) -> Int]]، وبنناديها مرتين.`,
            "دالة عادية هنستخدمها كقيمة.",
            R`بداية [[main]].`,
            R`lambda في متغير، والنوع مكتوب، و [[n ->]] اسم المدخل.`,
            "10.",
            "lambda بـ parameterين، والأنواع جواها.",
            "5.",
            "بنبعت المتغير double: 3 ثم 6 ثم 12.",
            R`trailing lambda و [[it]]: 3 ثم 13 ثم 23.`,
            "List أرقام.",
            R`[[::isEven]]: الدالة نفسها كقيمة. [2, 4].`,
            "متغير برا الـ lambda.",
            R`lambda نوعها [[() -> Unit]] بتغيّر المتغير اللي برا (closure).`,
            "نداء.",
            "نداء تاني.",
            "2.",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[10]]
[[5]]
[[12]]
[[23]]
[[[2, 4]]]
[[2]]

وحل التجربة تحت: بيطبع [[true]] وبعدين [[3]].`,
          solCode: R`fun retry(times: Int, action: () -> Boolean): Boolean {
    repeat(times) {
        if (action()) return true
    }
    return false
}

fun main() {
    var attempts = 0
    val ok = retry(5) {
        attempts++
        attempts == 3
    }
    println(ok)
    println(attempts)
}`
        },
        {
          cmd: "scope functions",
          title: "let و apply و also و run و with: تفرق إيه عن بعض؟",
          desc: R`دول ٥ دوال بتنفذ block على object، والفرق في حاجتين: الـ object جوه الـ block اسمه إيه ([[it]] ولا [[this]])، والدالة بترجّع إيه (الـ object نفسه ولا آخر سطر).

• [[let]]: جواه [[it]]، وبترجّع آخر سطر. أشهر استخدام [[x?.let { ... }]]: «لو مش null اعمل كذا».
• [[apply]]: جواه [[this]] (فبتكتب الـ properties على طول)، وبترجّع الـ object نفسه. للتجهيز: اعمل object وظبّط قيمه.
• [[also]]: جواه [[it]]، وبترجّع الـ object نفسه. لحاجة جانبية زي log من غير ما تغيّر السلسلة.
• [[run]]: جواه [[this]]، وبترجّع آخر سطر. تحسب حاجة من object.
• [[with(x) { }]]: زي run بس بتتكتب كدالة عادية مش بنقطة.

قاعدة سهلة تفتكرها: عايز الـ object يرجع؟ [[apply]] (لو هتظبّطه) أو [[also]] (لو هتعمل حاجة جنبه). عايز نتيجة تانية؟ [[let]] (خصوصًا مع null) أو [[run]].`,
          example: R`data class User(var name: String = "", var age: Int = 0, var email: String? = null)
fun main() {
    val user = User().apply {
        name = "Sara"
        age = 25
    }
    println(user)
    val length = user.email?.let { it.length } ?: 0
    println(length)
    val greeting = user.run { "$name عندها $age سنة" }
    println(greeting)
    val saved = user.also { println("بنسجّل: $__{it.name}") }
    println(saved === user)
    with(user) {
        println(name.uppercase())
    }
}`,
          try: R`اعمل [[StringBuilder().apply { append("أهلًا "); append("يا Omar") }.toString()]] واطبعه. بعدين خد [[val input: String? = " 42 "]] وحوّله لرقم بـ [[input?.trim()?.toIntOrNull()?.let { it * 2 }]] واطبع النتيجة، وجرّبه تاني بـ null.`,
          flag: "script",
          deep: {
            why: R`هتقابلهم في كل كود Kotlin وأندرويد: [[Intent(...).apply { putExtra(...) }]]، و [[savedInstanceState?.let { }]]، و [[Room.databaseBuilder(...).build().also { INSTANCE = it }]]. لو مش فاهم الفرق، الكود هيبان ملخبط.`,
            how: R`كلهم دوال [[inline]] صغيرة في مكتبة Kotlin. [[apply]] مثلًا تعريفها تقريبًا: [[fun <T> T.apply(block: T.() -> Unit): T { block(); return this }]].

النوع [[T.() -> Unit]] ده «lambda with receiver»: جوه الـ lambda، [[this]] هو الـ T. هو ده اللي بيخليك تكتب [[name = "Sara"]] من غير [[user.name]]. ونفس الفكرة بالظبط هي اللي بتخلي Gradle Kotlin DSL شغال: [[android { compileSdk = 36 }]] الـ block ده lambda with receiver.

ومع [[this]] لو فيه اسم مكرر بين الـ object واللي برا، ممكن تتلخبط: [[this@MainActivity]] بتحدد أنهي this.`,
            when: R`[[?.let]] للـ null. [[apply]] لتجهيز object. [[also]] للـ logging أو التحقق في نص سلسلة. [[run]] و [[with]] أقل استخدامًا، لحساب حاجة من object.`,
            mistakes: R`تسلسلهم جوه بعض [[a?.let { b?.let { c.apply { } } }]] لحد ما محدش يفهم [[it]] و [[this]] بيشاوروا على إيه. اكتب if عادي أو متغيرات. و [[x?.let { } ?: run { }]] مش زي if/else بالظبط: لو الـ let رجّعت null، الـ run هتشتغل كمان.`
          },
          lines: [
            "data class كل حاجة فيها ليها قيمة افتراضية.",
            R`بداية [[main]].`,
            R`[[apply]]: object فاضي ونظبّطه، وبيرجّع الـ object.`,
            R`جوه apply [[this]] هو الـ User، فنكتب name على طول.`,
            "نفس الكلام.",
            "قفلة apply.",
            "User(name=Sara, age=25, email=null).",
            R`[[?.let]]: email بـ null فالـ let مش هتشتغل، و [[?:]] تحط 0.`,
            "0.",
            R`[[run]]: جواه this، وبيرجّع آخر سطر (النص).`,
            "Sara عندها 25 سنة.",
            R`[[also]]: جواه it، يعمل حاجة جانبية ويرجّع نفس الـ object.`,
            R`[[===]]: نفس الـ object؟ true.`,
            R`[[with]]: زي run بس كدالة عادية.`,
            "SARA.",
            "قفلة with.",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[User(name=Sara, age=25, email=null)]]
[[0]]
[[Sara عندها 25 سنة]]
[[بنسجّل: Sara]]
[[true]]
[[SARA]]

وحل التجربة: [[أهلًا يا Omar]]، وبعدين [[84]]، ولما input تبقى null النتيجة [[null]] من غير أي كراش.`,
          solCode: R`fun main() {
    val text = StringBuilder().apply {
        append("أهلًا ")
        append("يا Omar")
    }.toString()
    println(text)
    var input: String? = " 42 "
    println(input?.trim()?.toIntOrNull()?.let { it * 2 })
    input = null
    println(input?.trim()?.toIntOrNull()?.let { it * 2 })
}`
        },
        {
          cmd: "exceptions و Result",
          title: "try و catch و throw و runCatching: تتعامل مع الأخطاء إزاي؟",
          desc: R`الـ exception غلط بيحصل والبرنامج شغال: نص مش رقم، ملف مش موجود، النت فصل. لو محدش مسكه، البرنامج بيقع (في Android: التطبيق بيقفل ويظهر crash).

[[try { ... } catch (e: Exception) { ... }]]: جرّب الكود، ولو رمى exception من النوع ده نفّذ الـ catch. [[finally { }]] بتتنفذ في الحالتين (لقفل حاجة مثلًا).

وفي Kotlin [[try]] تعبير بيرجّع قيمة زي if:
[[val n = try { text.toInt() } catch (e: NumberFormatException) { -1 }]]

[[throw]] بترمي exception بنفسك. وتقدر تعمل نوع خاص بيك بيورث من [[Exception]]. وعندك اختصارات:
• [[require(شرط) { "رسالة" }]]: للمدخلات الغلط، بترمي [[IllegalArgumentException]].
• [[check(شرط)]]: لحالة غلط جوه البرنامج نفسه، بترمي [[IllegalStateException]].
• [[error("رسالة")]]: ترمي IllegalStateException على طول.

[[runCatching { ... }]] بترجّع [[Result]]: object فيه يا النتيجة يا الـ exception، من غير ما تكتب try. وعليه [[isSuccess]] و [[getOrNull()]] و [[getOrDefault(x)]] و [[exceptionOrNull()]] و [[onSuccess { }]] و [[onFailure { }]].

ومفيش في Kotlin checked exceptions زي Java: المترجم مش هيجبرك تكتب catch، وده معناه إن المسؤولية عليك تعرف الدالة ممكن ترمي إيه.`,
          example: R`class InsufficientFunds(val needed: Double) : Exception("الرصيد مش كفاية")
fun withdraw(balance: Double, amount: Double): Double {
    require(amount > 0) { "المبلغ لازم يبقى موجب" }
    if (amount > balance) throw InsufficientFunds(amount - balance)
    return balance - amount
}
fun main() {
    val n = try { "12x".toInt() } catch (e: NumberFormatException) { -1 }
    println(n)
    println("12x".toIntOrNull() ?: 0)
    try {
        withdraw(100.0, 150.0)
    } catch (e: InsufficientFunds) {
        println("$__{e.message}: ناقص $__{e.needed}")
    } finally {
        println("خلصت المحاولة")
    }
    val result = runCatching { withdraw(100.0, -5.0) }
    println(result.isFailure)
    println(result.exceptionOrNull()?.message)
    val ok = runCatching { withdraw(100.0, 40.0) }.getOrDefault(0.0)
    println(ok)
}`,
          try: R`اكتب دالة [[parseAge(text: String): Int]] بترمي [[IllegalArgumentException]] لو النص مش رقم أو الرقم برا 0 لـ 120. ناديها على [["25"]] و [["abc"]] و [["200"]] جوه [[runCatching]]، واطبع النتيجة أو رسالة الغلط بـ [[fold]].`,
          flag: "script",
          deep: {
            why: R`في Android أي نداء للشبكة أو الداتابيز ممكن يفشل، وتطبيق بيقع كل ما النت يفصل هياخد تقييمات وحشة على Play. الـ ViewModel بيمسك الـ exception ويحوّلها لحالة [[Error]] الشاشة تعرضها برسالة مفهومة وزرار «جرّب تاني».`,
            how: R`الـ exception بتطلع لفوق في سلسلة الدوال لحد ما حد يمسكها. لو وصلت للآخر من غير ما حد يمسكها، الـ thread بيقع، وفي Android ده معناه crash ورسالة في Logcat فيها [[FATAL EXCEPTION]] والـ stack trace (السلسلة اللي الغلط عدّى بيها).

امسك أضيق نوع تقدر عليه ([[IOException]] مش [[Exception]])، عشان متبلعش أخطاء برمجية حقيقية زي NullPointerException وتخبيها.

[[runCatching]] بتمسك كل حاجة، بما فيها [[CancellationException]] بتاعة الـ coroutines. لو استخدمتها جوه coroutine ممكن تبوّظ الإلغاء (الـ coroutine المفروض توقف، بس انت بلعت الإشارة). عشان كده في الـ coroutines الأسلم [[try/catch]] على أنواع محددة، أو ترمي الـ CancellationException تاني.

و [[Result]] تقدر ترجّعه من دوالك: [[fun load(): Result<User>]]. بس أغلب مشاريع Android بتعمل sealed class بتاعتها بدل كده عشان تحط أنواع أخطاء واضحة.`,
            when: R`[[try/catch]] حوالين الحاجات اللي ممكن تفشل لأسباب برا كودك: شبكة، ملفات، parsing لكلام جاي من برا. و [[require]] و [[check]] لأخطاء البرمجة. ومتمسكش exception غير لو هتعمل حاجة مفيدة بيها.`,
            mistakes: R`[[catch (e: Exception) { }]] فاضية: الغلط بيختفي ومش هتعرف ليه الشاشة فاضية. على الأقل اعمل log. وتستخدم exceptions للتحكم في سير البرنامج العادي (زي إنك ترمي exception عشان تخرج من loop). و [[runCatching]] جوه coroutines (الكلام اللي فوق).`
          },
          lines: [
            R`exception خاص بيك بيورث من [[Exception]] ومعاه بيانات زيادة.`,
            "دالة ممكن ترمي.",
            R`[[require]]: لو المبلغ مش موجب يرمي IllegalArgumentException.`,
            R`[[throw]]: نرمي الـ exception بتاعنا ومعاه الفرق.`,
            "لو كله تمام نرجّع الرصيد الجديد.",
            "قفلة.",
            R`بداية [[main]].`,
            R`[[try]] كتعبير: "12x" مش رقم، فالـ catch بترجّع -1.`,
            "-1.",
            R`البديل الأبسط من غير exception: [[toIntOrNull]].`,
            R`[[try]] block.`,
            "150 أكتر من 100: هيرمي InsufficientFunds.",
            R`[[catch]] للنوع ده بالظبط.`,
            "الرسالة والمبلغ الناقص.",
            R`[[finally]]: بتتنفذ في الحالتين.`,
            "خلصت المحاولة.",
            "قفلة.",
            R`[[runCatching]] بترجّع Result بدل ما الـ exception تطلع.`,
            "true: فشلت.",
            R`رسالة الغلط من [[require]].`,
            R`نجحت، و [[getOrDefault]] بترجّع النتيجة: 60.0.`,
            "60.0.",
            R`قفلة [[main]].`
          ],
          sol: R`ناتج المثال:
[[-1]]
[[0]]
[[الرصيد مش كفاية: ناقص 50.0]]
[[خلصت المحاولة]]
[[true]]
[[المبلغ لازم يبقى موجب]]
[[60.0]]

وحل التجربة تحت: [[سن: 25]] ثم [[غلط: abc مش رقم]] ثم [[غلط: 200 برا المدى]].`,
          solCode: R`fun parseAge(text: String): Int {
    val n = text.toIntOrNull() ?: throw IllegalArgumentException("$text مش رقم")
    require(n in 0..120) { "$n برا المدى" }
    return n
}

fun main() {
    for (t in listOf("25", "abc", "200")) {
        val msg = runCatching { parseAge(t) }.fold(
            onSuccess = { "سن: $it" },
            onFailure = { "غلط: $__{it.message}" }
        )
        println(msg)
    }
}`
        }
      ]
    },
    {
      t: "مشروع Android من جوه",
      l: 2,
      n: "تعمل مشروع وتشغّله، و Gradle و libs.versions.toml، و AndroidManifest والـ resources، والـ Activity ودورة حياتها",
      items: [
        {
          cmd: "مشروع Android",
          title: "أول مشروع Android: تعمله إزاي، وكل فولدر فيه لازمته إيه، وتشغّله على emulator؟",
          desc: R`في Android Studio: New Project ثم Empty Activity (ده قالب Compose). هتختار:
• Name: اسم التطبيق اللي بيظهر.
• Package name: زي [[com.sara.notes]]. ده الـ [[applicationId]]، اسم تطبيقك الفريد على Play للأبد، فاختاره صح ومتسيبهوش [[com.example]].
• Minimum SDK: أقدم Android التطبيق يشتغل عليه. Android Studio بيقولك النسبة التقريبية من الأجهزة اللي هتغطيها.
• Build configuration language: سيبها Kotlin DSL ([[build.gradle.kts]]).

أهم الملفات:
• [[app/src/main/java/com/sara/notes/MainActivity.kt]]: الكود بتاعك (الفولدر اسمه java حتى لو الكود Kotlin، ده عرف قديم).
• [[app/src/main/res/]]: الـ resources (نصوص، صور، أيقونات، ألوان).
• [[app/src/main/AndroidManifest.xml]]: بطاقة تعريف التطبيق للنظام.
• [[app/build.gradle.kts]]: إعدادات الـ module والمكتبات.
• [[gradle/libs.versions.toml]]: نسخ كل المكتبات في مكان واحد.
• [[settings.gradle.kts]] و [[build.gradle.kts]] اللي برا: إعدادات المشروع كله.
• [[gradlew]] و [[gradlew.bat]]: سكربت بيشغّل نسخة Gradle المظبوطة للمشروع من غير ما تسطّبه.

التشغيل: Device Manager ثم اعمل جهاز وهمي (emulator) زي Pixel، أو وصّل موبايلك بعد ما تفعّل Developer options و USB debugging (تدوس على Build number ٧ مرات في الإعدادات). وبعدين زرار Run الأخضر. والأوامر اللي في المثال بتعمل نفس الحاجة من الترمنال.`,
          example: R`./gradlew tasks
./gradlew assembleDebug
adb devices
./gradlew installDebug
adb shell am start -n com.sara.notes/.MainActivity
adb uninstall com.sara.notes`,
          try: R`اعمل مشروع Empty Activity باسم Notes و package [[com.yourname.notes]]، وشغّله على emulator. بعدين افتح ترمنال Android Studio (تحت) وشغّل [[./gradlew assembleDebug]] (أو [[.\gradlew assembleDebug]] على ويندوز)، ودوّر على الـ APK اللي اتعمل.`,
          deep: {
            why: R`أغلب مشاكل المبتدئين في Android مش في الكود، في إنهم مش عارفين الملف المطلوب فين، أو Gradle بيقول إيه. لو فهمت الهيكل من أول يوم، أي tutorial أو مشروع حد تاني هتعرف تقراه.`,
            how: R`Android Studio هو IntelliJ IDEA ومعاه أدوات Android. البناء نفسه مش بيعمله Android Studio: بيعمله [[Gradle]] ومعاه Android Gradle Plugin ([[AGP]]). وده اللي بيخلي نفس الأمر يشتغل على جهازك وعلى سيرفر CI.

[[adb]] (Android Debug Bridge) أداة في Android SDK بتكلم الجهاز: تسطّب، وتمسح، وتقرا الـ logs، وتفتح shell. لو مش لاقيها في الترمنال، فولدر [[platform-tools]] جوه الـ SDK مش على الـ PATH.

الـ emulator بيحتاج hardware acceleration: على ويندوز Windows Hypervisor Platform، وعلى Linux الـ KVM. لو بطيء جدًا غالبًا ده مش متفعّل.

وفيه نوعين ملفات بيطلعوا: [[APK]] بيتسطّب مباشرة، و [[AAB]] بيترفع على Play (المستوى ٣).`,
            when: "مرة لكل تطبيق جديد. وأوامر adb هتحتاجها كل يوم: تمسح التطبيق وتسطّبه من الأول، أو تقرا logs من موبايل حقيقي.",
            mistakes: R`تحط المشروع في مسار فيه حروف عربي أو مسافات: على ويندوز Gradle بيرفض أو بيطلّع أخطاء غريبة، خليه في زي [[C:\dev\notes]]. وتسيب [[com.example]]: Play بيرفض أي package بيبدأ بيه. وأول build بياخد دقايق (بينزّل Gradle والمكتبات)، فمتقفلش Android Studio وانت فاكره علّق.`
          },
          lines: [
            "كل المهام اللي Gradle يقدر يعملها في المشروع.",
            R`ابني نسخة debug، والـ APK بيطلع في [[app/build/outputs/apk/debug/]].`,
            R`الأجهزة المتوصلة (emulator أو موبايل). لازم تبقى [[device]] مش [[unauthorized]].`,
            "ابني وسطّب على الجهاز المتوصل.",
            "افتح الـ Activity الرئيسية من الترمنال.",
            "امسح التطبيق من الجهاز (بداتا بتاعته)."
          ],
          sol: R`الـ APK بيطلع في [[app/build/outputs/apk/debug/app-debug.apk]]، وآخر سطر في الترمنال [[BUILD SUCCESSFUL in ...]].

لو [[adb devices]] طلّع الموبايل [[unauthorized]]: بص على شاشة الموبايل، هتلاقي سؤال «Allow USB debugging?»، وافق. ولو مش ظاهر خالص: جرّب كابل تاني (فيه كابلات شحن بس)، وعلى ويندوز ممكن تحتاج USB driver بتاع الشركة.

ولو الـ build وقع برسالة فيها [[JDK]] أو [[Unsupported class file major version]]: من Settings ثم Build Tools ثم Gradle، خلي Gradle JDK هو الـ JDK اللي جاي مع Android Studio.`
        },
        {
          cmd: "Gradle و libs.versions.toml",
          title: "build.gradle.kts و libs.versions.toml: تضيف مكتبة للمشروع إزاي؟",
          desc: R`[[app/build.gradle.kts]] ده إعدادات الـ app module، ومكتوب بـ Kotlin (عشان كده الامتداد [[.kts]]). فيه ٣ أجزاء:

١. [[plugins { }]]: الـ plugins اللي بتبني المشروع. [[com.android.application]] (الـ AGP)، و [[org.jetbrains.kotlin.plugin.compose]] (مترجم Compose). ومن AGP 9 الـ Kotlin نفسها جوه الـ AGP، فمش محتاج plugin [[kotlin-android]] زي المشاريع القديمة.

٢. [[android { }]]:
• [[namespace]]: الـ package اللي فيه كلاس [[R]] (الـ resources).
• [[compileSdk]]: نسخة Android SDK اللي بتترجم عليها.
• [[minSdk]]: أقدم Android التطبيق يتسطّب عليه.
• [[targetSdk]]: نسخة Android اللي التطبيق متجرّب عليها وبيتبع قواعدها. Google Play بيطلب رقم حديث: من 31 أغسطس 2026 التطبيقات الجديدة والتحديثات لازم [[targetSdk = 36]] (Android 16) على الأقل.
• [[versionCode]]: رقم صحيح لازم يزيد مع كل رفعة على Play. و [[versionName]]: اللي اليوزر بيشوفه.

٣. [[dependencies { }]]: المكتبات. [[implementation(...)]] للتطبيق، و [[testImplementation(...)]] للاختبارات بس.

و [[libs.androidx.activity.compose]] ده جاي من [[gradle/libs.versions.toml]] (اسمه version catalog): ملف فيه كل النسخ والمكتبات في مكان واحد، بدل ما النسخ تبقى متفرقة في كل ملف. الشَرطة [[-]] في الاسم بتبقى نقطة [[.]] في الكود. وبعد أي تعديل دوس Sync Now.

و [[platform(libs.androidx.compose.bom)]]: الـ BOM (Bill of Materials) بيحدد نسخ كل مكتبات Compose المتوافقة مع بعض، فمكتبات Compose نفسها بتتكتب من غير نسخة.`,
          example: R`plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.compose)
}
android {
    namespace = "com.sara.notes"
    compileSdk = 36
    defaultConfig {
        applicationId = "com.sara.notes"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"
    }
    buildFeatures {
        compose = true
    }
}
dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    testImplementation(libs.junit)
}`,
          try: R`افتح [[gradle/libs.versions.toml]] في مشروعك وضيف مكتبة [[androidx.lifecycle:lifecycle-viewmodel-compose]] (هتحتاجها في درس الـ ViewModel): نسخة في [[[versions]]]، وسطر في [[[libraries]]]، وبعدين [[implementation(...)]] في [[app/build.gradle.kts]] واعمل Sync. ولاحظ إن Android Studio بيعلّم بالأصفر لو فيه نسخة أحدث.`,
          flag: "script",
          deep: {
            why: R`كل ميزة هتضيفها (شبكة، صور، داتابيز، تنقل) معناها مكتبة. والـ version catalog بيمنع إن نفس المكتبة تبقى بنسختين في modules مختلفة، وبيخلي التحديث في سطر واحد.`,
            how: R`Gradle بيقرا [[settings.gradle.kts]] الأول (أنهي modules موجودة، والمكتبات بتتنزل منين: [[google()]] و [[mavenCentral()]])، وبعدين [[build.gradle.kts]] بتاع كل module.

الـ [[.kts]] كود Kotlin حقيقي: [[android { }]] دالة بتاخد lambda with receiver (درس scope functions)، عشان كده الـ autocomplete شغال جواه.

[[implementation]] غير [[api]]: implementation معناها إن المكتبة دي داخلية للـ module ومش ظاهرة للي بيستخدمه، فالبناء أسرع. و [[ksp(...)]] للمكتبات اللي بتولّد كود وقت الترجمة (Room و Hilt). الـ KSP هو البديل الأسرع لـ kapt القديم، و kapt مش مدعوم مع Kotlin المدمجة في AGP 9.

[[compileSdk]] و [[targetSdk]] مش نفس الحاجة: compileSdk بيحدد الـ APIs اللي تقدر تكتبها، و targetSdk بيقول للنظام «أنا جاهز لسلوك النسخة دي» (زي edge-to-edge الإجباري من Android 15). ولو استخدمت API أحدث من minSdk، لازم تفحص [[Build.VERSION.SDK_INT]] قبلها.`,
            when: R`كل ما تضيف مكتبة، أو تحدّث نسخة، أو تجهّز release. وحدّث [[targetSdk]] مرة في السنة على الأقل عشان Play.`,
            mistakes: R`تنسخ [[implementation("group:name:1.2.3")]] من tutorial قديم جنب الـ catalog فيبقى عندك نسختين. وتحدّث مكتبة واحدة من Compose بنسخة لوحدها بدل الـ BOM فيحصل تعارض. وتستخدم [[kapt]] من tutorial قديم مع AGP 9 فالبناء يقع: استخدم [[ksp]].`
          },
          lines: [
            R`[[plugins]]: إيه اللي هيبني المشروع.`,
            R`plugin تطبيق Android (الـ AGP)، ونسخته من الـ catalog.`,
            "plugin مترجم Compose.",
            "قفلة.",
            R`إعدادات [[android]].`,
            R`الـ package اللي فيه كلاس R.`,
            "نسخة الـ SDK اللي بنترجم عليها.",
            R`[[defaultConfig]]: إعدادات بتتطبق على كل نسخ البناء.`,
            "الاسم الفريد على Play للأبد.",
            "أقدم نسخة Android مسموحة (Android 7.0).",
            "متجرّب على Android 16، واللي Play بيطلبه في 2026.",
            "رقم البناء، لازم يزيد مع كل رفعة.",
            "النسخة اللي اليوزر بيشوفها.",
            "قفلة defaultConfig.",
            "مزايا البناء.",
            "شغّل Compose.",
            "قفلة.",
            R`قفلة [[android]].`,
            "المكتبات.",
            "الـ BOM بيحدد نسخ Compose كلها.",
            "Material 3 من غير نسخة (من الـ BOM).",
            R`[[setContent]] و Compose في الـ Activity.`,
            R`[[viewModel()]] جوه Compose.`,
            "JUnit للاختبارات بس.",
            "قفلة."
          ],
          sol: R`في [[libs.versions.toml]] بتضيف تحت [[[versions]]] سطر زي [[lifecycle = "2.11.0"]] (النسخة الأحدث وقت ما تعمل ده)، وتحت [[[libraries]]] السطر اللي في الكود تحت. وفي [[app/build.gradle.kts]] الاسم بيبقى بنقط: [[implementation(libs.androidx.lifecycle.viewmodel.compose)]].

بعد Sync لو الاسم غلط هيطلع [[Unresolved reference: lifecycle]] في ملف Gradle. ولو النسخة مش موجودة: [[Could not find androidx.lifecycle:...]].

والكود تحت محتوى ملف [[gradle/libs.versions.toml]]. والنسخ اللي فيه مثال وقت كتابة الدرس (أواخر 2026)، و Android Studio بيحط الأحدث في المشروع الجديد.`,
          solCode: R`[versions]
agp = "9.4.1"
kotlin = "2.4.20"
composeBom = "2026.09.00"
activityCompose = "1.13.0"
lifecycle = "2.11.0"

[libraries]
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-compose-material3 = { group = "androidx.compose.material3", name = "material3" }
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
androidx-lifecycle-viewmodel-compose = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-compose", version.ref = "lifecycle" }
junit = { group = "junit", name = "junit", version = "4.13.2" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-compose = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }`
        },
        {
          cmd: "AndroidManifest و res",
          title: "AndroidManifest.xml والـ resources: الصلاحيات، والـ launcher، و strings.xml والترجمة",
          desc: R`[[AndroidManifest.xml]] بطاقة تعريف التطبيق للنظام: اسمه، وأيقونته، والصلاحيات اللي محتاجها، والـ Activities اللي فيه، وأنهي واحدة تفتح من الـ launcher.

حاجات هتشوفها:
• [[uses-permission]]: صلاحية. [[INTERNET]] لازمة لأي نداء للشبكة. الصلاحيات «الخطيرة» (الكاميرا، الموقع) لازم كمان تطلبها وقت التشغيل (درس الصلاحيات).
• [[@string/app_name]] و [[@mipmap/ic_launcher]]: علامة [[@]] معناها «resource من فولدر res»: النص اللي اسمه app_name، والأيقونة اللي اسمها ic_launcher.
• [[android:exported="true"]]: الـ Activity دي ينفع تتفتح من برا التطبيق (من الـ launcher). إجباري تكتبه لأي Activity عندها intent-filter.
• [[intent-filter]] بـ [[MAIN]] و [[LAUNCHER]]: «دي الشاشة اللي تفتح لما اليوزر يدوس على الأيقونة».

فولدر [[res/]]:
• [[values/strings.xml]]: النصوص. ولو عملت [[values-ar/strings.xml]] بنفس الأسماء، الموبايل اللي لغته عربي هياخدها لوحده.
• [[drawable/]]: صور و vector icons. و [[mipmap/]]: أيقونة التطبيق بس.
• [[values/themes.xml]] و [[colors.xml]]: الثيم (في Compose أغلب الثيم بقى في الكود).

وفي الكود: كل resource ليه رقم في كلاس [[R]] اللي بيتولد لوحده: [[R.string.app_name]] و [[R.drawable.logo]]. وفي Compose: [[stringResource(R.string.welcome, name)]] و [[painterResource(R.drawable.logo)]].

و [[android:supportsRtl="true"]] بتخلي الواجهة تتقلب يمين لشمال لوحدها في العربي.`,
          example: R`<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <application
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/Theme.Notes">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`,
          try: R`في مشروعك: كليك يمين على [[res]] ثم New ثم Android Resource File، اسمه strings و Locale = Arabic. حط فيه [[app_name]] بالعربي ونص [[welcome]] فيه [[%1$s]]. غيّر لغة الـ emulator لعربي وشوف اسم التطبيق تحت الأيقونة. وبعدين اعرض [[stringResource(R.string.welcome, "Sara")]] في Compose.`,
          flag: "script",
          deep: {
            why: R`النظام مبيعرفش حاجة عن تطبيقك غير من الـ manifest: لو نسيت INTERNET، كل نداء شبكة هيقع بـ [[SecurityException]] أو [[UnknownHostException]] حتى والنت شغال. والنصوص لو اتكتبت في الكود، الترجمة هتبقى مستحيلة، وكمان lint بيحذّرك من ده.`,
            how: R`الـ manifest اللي بتكتبه مش النهائي: وقت البناء Gradle بيدمجه مع manifests المكتبات (كل مكتبة ممكن تضيف صلاحيات أو components). تقدر تشوف النتيجة من تاب Merged Manifest تحت الملف. لو مكتبة ضافت صلاحية مش عايزها: [[tools:node="remove"]].

[[R]] كلاس بيتولد وقت البناء، فيه رقم int لكل resource. عشان كده [[R.string.app_name]] نوعه Int مش String، ولازم تحوّله بـ [[getString()]] أو [[stringResource()]].

الـ qualifiers بعد الشَرطة في اسم الفولدر: [[values-ar]] (لغة)، و [[values-night]] (dark mode)، و [[drawable-xxhdpi]] (كثافة الشاشة). النظام بيختار الأنسب لوحده وقت التشغيل.

[[%1$s]] في strings.xml معناها «أول argument كنص»، و [[%2$d]] «تاني argument كرقم». ولعدد العناصر فيه [[plurals]]، ومهم جدًا في العربي (عنصر واحد، عنصرين، ٣ عناصر، ١١ عنصر).`,
            when: R`الـ manifest كل ما تضيف صلاحية، أو Activity، أو deep link، أو service. والـ strings.xml لأي نص بيظهر للمستخدم من أول يوم، حتى لو لغة واحدة.`,
            mistakes: R`تنسى INTERNET وتقعد ساعة تدوّر في كود Retrofit. وتكتب نصوص عربي في الكود على طول. وتنسى [[android:exported]] على Activity فيها intent-filter فالبناء يقع (إجباري من Android 12).`
          },
          lines: [
            "أول سطر في أي ملف XML: النسخة والترميز.",
            R`[[manifest]]: والـ namespace اللي بيعرّف بادئة [[android:]].`,
            "صلاحية النت (مش محتاجة سؤال لليوزر).",
            R`بداية [[application]]: إعدادات التطبيق كله.`,
            R`الأيقونة من [[res/mipmap]].`,
            R`الاسم من [[strings.xml]].`,
            "يدعم الاتجاه من اليمين للشمال.",
            R`الثيم من [[res/values/themes.xml]] (Compose بيكمّل الباقي في الكود).`,
            R`[[activity]]: شاشة في التطبيق.`,
            R`الكلاس بتاعها. النقطة في الأول معناها «جوه الـ namespace».`,
            "ينفع تتفتح من برا التطبيق.",
            "بداية الـ intent-filter.",
            "دي نقطة البداية...",
            "...وتظهر في قايمة التطبيقات.",
            "قفلة intent-filter.",
            "قفلة activity.",
            "قفلة application.",
            "قفلة manifest."
          ],
          sol: R`الـ emulator بالعربي هيعرض الاسم من [[values-ar]]، وبالإنجليزي من [[values]]. ولو نسيت نص في ملف العربي، Android بياخده من الافتراضي (وـ lint بيحذّرك بـ [[MissingTranslation]]).

[[stringResource(R.string.welcome, "Sara")]] هيعرض «أهلًا يا Sara» بالعربي أو «Welcome, Sara» بالإنجليزي.`,
          solCode: R`<!-- res/values/strings.xml -->
<resources>
    <string name="app_name">Notes</string>
    <string name="welcome">Welcome, %1$s</string>
</resources>

<!-- res/values-ar/strings.xml -->
<resources>
    <string name="app_name">ملاحظاتي</string>
    <string name="welcome">أهلًا يا %1$s</string>
</resources>`
        },
        {
          cmd: "Activity و lifecycle",
          title: "الـ Activity ودورة حياتها: onCreate و onStart و onResume و onPause و onStop و onDestroy",
          desc: R`الـ [[Activity]] هي الشاشة اللي النظام بيفتحها. في تطبيقات Compose غالبًا عندك واحدة بس ([[MainActivity]])، وكل الشاشات جواها كـ composables، والتنقل بينهم بـ Navigation.

[[class MainActivity : ComponentActivity()]] معناها إنها بتورث من [[ComponentActivity]]. والنظام هو اللي بيعمل الـ object وبينادي دوال معينة في أوقات معينة. دي اسمها lifecycle callbacks، وانت بتعمل لها [[override]]:
• [[onCreate]]: أول مرة. هنا [[setContent { }]] اللي بتحط فيها الـ Compose UI.
• [[onStart]]: الشاشة بقت ظاهرة.
• [[onResume]]: الشاشة قدام واليوزر يقدر يتفاعل.
• [[onPause]]: حاجة غطّتها جزئيًا، أو بتقفل.
• [[onStop]]: مش ظاهرة خالص (اليوزر داس Home مثلًا).
• [[onDestroy]]: الـ object هيتمسح.

أهم حاجة تفهمها: لما الموبايل يلف (rotation) أو اللغة أو الـ dark mode يتغير، النظام بيعمل destroy للـ Activity ويعملها من الأول (اسمها configuration change). أي متغير عادي جوه الـ Activity بيضيع. ده سبب وجود [[rememberSaveable]] و [[ViewModel]] (دروس جاية).

و [[enableEdgeToEdge()]]: التطبيق يرسم ورا الـ status bar والـ navigation bar. من Android 15 مع targetSdk 35+ ده إجباري، فلازم تسيب مسافة بـ [[innerPadding]] اللي جاية من [[Scaffold]].

[[super.onCreate(...)]] لازم تتنادى في الأول: بتخلي الأب يعمل شغله. و [[savedInstanceState: Bundle?]] فيه state متحفوظ لو الـ Activity اتعملت تاني (nullable لأنه null أول مرة).`,
          example: R`// الـ imports اتشالت عشان المثال يقصر، و Android Studio بيضيفها بـ Alt+Enter
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d("Life", "onCreate")
        enableEdgeToEdge()
        setContent {
            NotesTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Text("أهلًا", modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }
    override fun onStart() { super.onStart(); Log.d("Life", "onStart") }
    override fun onResume() { super.onResume(); Log.d("Life", "onResume") }
    override fun onPause() { super.onPause(); Log.d("Life", "onPause") }
    override fun onStop() { super.onStop(); Log.d("Life", "onStop") }
    override fun onDestroy() { super.onDestroy(); Log.d("Life", "onDestroy") }
}`,
          try: R`حط الكود ده في MainActivity، وافتح Logcat واكتب في الفلتر [[tag:Life]]. شغّل التطبيق، وبعدين: (١) لف الـ emulator، (٢) دوس Home وارجع، (٣) دوس Back. اكتب الترتيب اللي ظهر في كل مرة.`,
          flag: "script",
          deep: {
            why: R`أشهر بقّين في تطبيقات المبتدئين: داتا بتضيع لما الموبايل يلف، وحاجة (كاميرا، location، اتصال) فاضلة شغالة والشاشة مقفولة فالبطارية بتخلص. الاتنين سببهم إنك مش عارف الـ lifecycle.`,
            how: R`[[ComponentActivity]] هي الأب الحديث، وهي [[LifecycleOwner]]: أي حاجة تقدر «تتفرج» على الـ lifecycle بدل ما تكتب كود في كل callback. Compose بيعمل كده: [[collectAsStateWithLifecycle()]] بتوقف التجميع لوحدها لما الشاشة توصل onStop.

ولو محتاج تعمل حاجة على أحداث الـ lifecycle من جوه composable: [[LifecycleEventEffect(Lifecycle.Event.ON_RESUME) { ... }]] من مكتبة lifecycle-runtime-compose.

[[AppCompatActivity]] هتشوفها في المشاريع القديمة (XML)، وهي بتورث من ComponentActivity ومعاها دعم الثيمات القديمة.

ولو النظام محتاج ذاكرة ممكن يقتل التطبيق كله وهو في الخلفية (process death). لما اليوزر يرجع، الـ Activity بتتعمل من الأول و [[savedInstanceState]] فيه اللي اتحفظ، بس الـ ViewModel نفسه بيضيع. عشان كده الداتا المهمة مكانها [[SavedStateHandle]] أو الداتابيز.`,
            when: R`أغلب الشغل في [[onCreate]] (الـ setContent). والباقي نادرًا ما هتكتبه بنفسك في Compose، بس لازم تفهم الترتيب عشان تفهم ليه الـ ViewModel موجود.`,
            mistakes: R`تحفظ داتا في متغير جوه الـ Activity وتستغرب إنها اتصفّرت مع اللفة. وتنسى [[super.onXxx()]] فيقع بـ [[SuperNotCalledException]]. وتنسى [[innerPadding]] مع edge-to-edge فالكلام يتداري تحت الـ status bar.`
          },
          lines: [
            R`الـ Activity بتورث من [[ComponentActivity]].`,
            R`[[override]] لـ onCreate، والـ Bundle nullable.`,
            R`خلي الأب يعمل شغله الأول.`,
            R`log في Logcat بالـ tag Life.`,
            "ارسم ورا الـ system bars.",
            R`[[setContent]]: من هنا بتبدأ واجهة Compose.`,
            R`الثيم اللي Android Studio عمله للمشروع (في ملف [[ui/theme/Theme.kt]]).`,
            R`[[Scaffold]] الهيكل الأساسي للشاشة، وبيدي [[innerPadding]] مسافة الـ system bars.`,
            "نص بمسافة عشان ميتداريش.",
            "قفلة Scaffold.",
            "قفلة الثيم.",
            "قفلة setContent.",
            "قفلة onCreate.",
            R`الشاشة بقت ظاهرة. [[;]] عشان أمرين في سطر واحد.`,
            "قدام وتفاعلية.",
            "بتفقد التركيز.",
            "مبقتش ظاهرة.",
            "هتتمسح.",
            "قفلة الكلاس."
          ],
          sol: R`أول تشغيل: [[onCreate]] ثم [[onStart]] ثم [[onResume]].

(١) اللفة: [[onPause]] ثم [[onStop]] ثم [[onDestroy]]، وبعدين من الأول [[onCreate]] ثم [[onStart]] ثم [[onResume]]. يعني object جديد خالص.

(٢) Home: [[onPause]] ثم [[onStop]]. والرجوع: [[onStart]] ثم [[onResume]] (من غير onCreate، لأنها لسه موجودة).

(٣) Back: من Android 12، الـ Activity الرئيسية (اللي بتفتح من الـ launcher) مش بتتقفل بالـ Back، النظام بيوديها الخلفية بس: هتشوف [[onPause]] ثم [[onStop]] من غير onDestroy. على Android أقدم هتشوف onDestroy كمان.`
        }
      ]
    },
    {
      t: "Compose: بناء الشاشة",
      l: 2,
      n: "الواجهة دوال @Composable: Text و Button، و Column و Row و Box، والـ Modifier، و LazyColumn للستات، و Material 3 والثيم",
      items: [
        {
          cmd: "مقدمة Jetpack Compose",
          title: "Jetpack Compose: يعني إيه @Composable، وإزاي تعمل Preview؟",
          desc: R`[[Jetpack Compose]] هو طريقة Android الحديثة لبناء الواجهة، و Google بتعتبره الافتراضي لأي تطبيق جديد. بدل ما ترسم الشاشة في XML وتربطها بالكود، بتكتبها كلها Kotlin.

كل حتة واجهة هي دالة عليها [[@Composable]]. علامة [[@]] دي اسمها annotation: معلومة زيادة للمترجم، وهنا بتقوله «دي دالة بترسم UI». وبالعرف اسمها بيبدأ بحرف كبير (زي كلاس) لأنها بتمثل حاجة على الشاشة.

الفكرة (اسمها declarative UI): انت مش بتقول «غيّر النص ده لكذا». انت بتقول «الشاشة شكلها كذا حسب الداتا دي». ولما الداتا تتغير، Compose بينادي الدالة تاني ويرسم الجديد. ده اسمه [[recomposition]].

أول عناصر:
• [[Text("...")]]: نص.
• [[Button(onClick = { ... }) { Text("...") }]]: زرار. [[onClick]] lambda بتتنفذ لما تدوس، والـ lambda التانية (برا الأقواس) محتوى الزرار.
• [[Image]] و [[Icon]]: صور وأيقونات.

و [[modifier: Modifier = Modifier]]: العرف إن أي composable بتاعك ياخد modifier اختياري، عشان اللي بيستخدمه يقدر يظبط المسافة والحجم من برا (درس الـ Modifier).

[[@Preview]] فوق composable مبياخدش parameters بيخلي Android Studio يرسمه في تاب Split أو Design من غير ما تشغّل التطبيق.`,
          example: R`// الـ imports: androidx.compose.material3.* و androidx.compose.runtime.Composable و androidx.compose.ui.tooling.preview.Preview
@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(text = "أهلًا يا $name", modifier = modifier)
}
@Composable
fun HelloButton() {
    Button(onClick = { Log.d("Btn", "اتداس") }) {
        Text("دوس هنا")
    }
}
@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    Column {
        Greeting("Sara")
        HelloButton()
    }
}`,
          try: R`حط الكود في ملف [[Greeting.kt]] جنب MainActivity، وافتح وضع Split فوق يمين المحرر. غيّر الاسم في الـ Preview وشوف الرسم بيتحدث. وبعدين ناديه من [[setContent]] في MainActivity وشغّل، ودوس الزرار وشوف الـ log في Logcat بـ [[tag:Btn]].`,
          flag: "script",
          deep: {
            why: R`Compose بيقلل كمية الكود كتير عن XML، ومفيش ربط بين ملفين (مفيش findViewById ولا ID غلط يوقع التطبيق)، والـ state بيتعرض لوحده. وكل المكتبات والأمثلة الجديدة من Google بتطلع بـ Compose. بس XML لسه في مشاريع كتير شغالة، فهتتعلمه كمان في آخر المستوى ده.`,
            how: R`plugin مترجم Compose ([[org.jetbrains.kotlin.plugin.compose]]) بيعدّل كل دالة [[@Composable]] وقت الترجمة: بيضيفلها parameter مخفي اسمه [[Composer]] بيتتبع مكانها في الشجرة، وبيسجّل هي قرت أنهي state. لما state يتغير، الـ Composer بيعرف بالظبط أنهي دوال يعيد ندهها، والباقي بيتنط (skipping).

عشان كده:
• composable مينفعش يتنادى غير من composable تاني (لأنه محتاج الـ Composer).
• الدالة ممكن تتنادى كتير جدًا وبأي ترتيب، فلازم تبقى سريعة ومن غير side effects (متعملش نداء شبكة أو تكتب في متغير برا جواها). الحاجات دي ليها أدوات خاصة زي [[LaunchedEffect]].

و Material 3 ([[androidx.compose.material3]]) هي المكتبة اللي فيها Button و Text و Card وغيرهم بتصميم Google الحالي.`,
            when: "أي شاشة جديدة في أي تطبيق جديد. والـ Preview لكل composable شغال عليه عشان تشوف التغيير في ثانية.",
            mistakes: R`تنادي composable من [[onClick]]: الـ onClick مش composable، فيقول [[@Composable invocations can only happen from the context of a @Composable function]]. الصح إنك تغيّر state في الـ onClick، والشاشة ترسم على أساسه. وتعمل شغل تقيل (قراية ملف، sort لليستة كبيرة) جوه الـ composable نفسه فيتعاد مع كل recomposition.`
          },
          lines: [
            R`[[@Composable]]: دالة بترسم UI.`,
            R`بتاخد الاسم، و [[modifier]] اختياري افتراضيه [[Modifier]] الفاضي.`,
            "نص فيه الاسم، وبنعدّي الـ modifier ليه.",
            "قفلة.",
            "composable تاني.",
            "دالة الزرار.",
            R`[[Button]]: الـ onClick بيكتب log لما اليوزر يدوس.`,
            "محتوى الزرار: نص.",
            "قفلة محتوى الزرار.",
            "قفلة الدالة.",
            R`[[@Preview]]: ارسمه في Android Studio بخلفية بيضا.`,
            "لازم composable كمان.",
            "دالة preview من غير parameters.",
            R`[[Column]]: حط اللي جوه تحت بعض (الدرس الجاي).`,
            "التحية.",
            "الزرار.",
            "قفلة Column.",
            "قفلة."
          ],
          sol: R`في الـ Preview هتشوف «أهلًا يا Sara» وتحتها زرار «دوس هنا». ومع كل تعديل وحفظ الـ Preview بيتحدث في ثواني.

ولما تشغّل وتدوس، Logcat هيطلّع سطر زي: [[D/Btn: اتداس]] (D معناها Debug).

ولو الـ Preview قال [[Render problem]]: اعمل Build ثم Refresh. ولو الـ composable بياخد parameters مالهاش قيمة افتراضية، الـ Preview مش هيعرف يرسمه مباشرة: اعمل دالة preview صغيرة بتناديه بقيم ثابتة زي ما المثال عامل.`,
          solCode: R`class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            NotesTheme {
                Scaffold { innerPadding ->
                    Column(Modifier.padding(innerPadding)) {
                        Greeting("Sara")
                        HelloButton()
                    }
                }
            }
        }
    }
}`
        },
        {
          cmd: "Column و Row و Box",
          title: "Column و Row و Box: ترتّب العناصر تحت بعض وجنب بعض وفوق بعض",
          desc: R`٣ layouts أساسية:
• [[Column]]: العناصر تحت بعض (رأسي).
• [[Row]]: جنب بعض (أفقي). وفي العربي (RTL) بتبدأ من اليمين لوحدها.
• [[Box]]: فوق بعض، زي صورة وعليها badge في الركن.

والتحكم في المكان:
• في Column: [[verticalArrangement]] (التوزيع على المحور الرأسي، زي [[Arrangement.spacedBy(8.dp)]] مسافة ثابتة بين العناصر، أو [[SpaceBetween]]) و [[horizontalAlignment]] (المحاذاة على العرض).
• في Row العكس: [[horizontalArrangement]] و [[verticalAlignment]].
• في Box: [[contentAlignment]] لكل العناصر، أو [[Modifier.align(...)]] لعنصر واحد.

[[Spacer(Modifier.width(12.dp))]]: مسافة فاضية.
[[Modifier.weight(1f)]] جوه Row أو Column: العنصر ده ياخد كل المساحة الفاضية. ولو عنصرين ليهم weight 1f يتقسموها نص ونص. الـ [[f]] بعد الرقم معناها Float.

[[dp]] وحدة المسافات والأحجام: density-independent pixels، يعني نفس الحجم الحقيقي تقريبًا على أي شاشة. و [[sp]] للخطوط، وبتكبر لو اليوزر مكبّر الخط من الإعدادات.`,
          example: R`@Composable
fun ProfileHeader(name: String, city: String) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            modifier = Modifier.size(56.dp).clip(CircleShape).background(MaterialTheme.colorScheme.primary),
            contentAlignment = Alignment.Center
        ) {
            Text(name.take(1), color = MaterialTheme.colorScheme.onPrimary)
        }
        Spacer(Modifier.width(12.dp))
        Column(modifier = Modifier.weight(1f)) {
            Text(name, style = MaterialTheme.typography.titleMedium)
            Text(city, style = MaterialTheme.typography.bodySmall)
        }
        TextButton(onClick = { }) { Text("تعديل") }
    }
}`,
          try: R`اعمل composable لكارت منتج: صورة مربعة (Box ملوّن مكانها) على جنب، وجنبها Column فيه الاسم والسعر، وتحت الكارت كله Row فيه زرارين «ضيف للسلة» و «مفضلة» واخدين نفس العرض بـ [[weight(1f)]].`,
          flag: "script",
          deep: {
            why: R`كل شاشة في أي تطبيق هي Column و Row و Box جوه بعض. لو اتقنت الـ arrangement والـ alignment والـ weight، هتعمل أي تصميم يجيلك من Figma.`,
            how: R`Compose بيقيس كل عنصر مرة واحدة بس (single pass)، فالـ layouts المتداخلة مش مشكلة في الأداء زي ما كانت في XML القديم.

الأب بيدي كل ابن «قيود» (constraints): أقل وأكتر عرض وطول مسموح. والابن بيختار مقاسه جواها. [[fillMaxWidth()]] بتقول «خد أكبر عرض مسموح».

[[weight]] بيتحسب بعد العناصر اللي ملهاش weight: Row بيقيس الـ Box والـ Spacer والزرار الأول، واللي فاضل بيروح للـ Column.

ولو العناصر أكتر من الشاشة، Column و Row مبيعملوش scroll لوحدهم. محتاج [[Modifier.verticalScroll(rememberScrollState())]] لكام عنصر، أو [[LazyColumn]] للستات الطويلة (الدرس بعد الجاي).

ولما تحتاج layout أعقد (عناصر بتترص على كذا سطر): [[FlowRow]]، أو [[ConstraintLayout]] من مكتبة منفصلة.`,
            when: "Column للفورم والشاشات العادية، و Row لسطر فيه أيقونة ونص وزرار، و Box للطبقات (badge، أو loading فوق المحتوى، أو زرار عايم).",
            mistakes: R`تحط [[fillMaxWidth]] على عنصر جوه Row وتستغرب إن اللي بعده اختفى: خد العرض كله. استخدم [[weight(1f)]]. وتحط [[weight]] برا Row أو Column فمش هيلاقيها (هي متاحة بس جوه الـ scope بتاعهم). وتخلط arrangement و alignment: الـ arrangement على المحور الرئيسي (رأسي في Column)، والـ alignment على المحور التاني.`
          },
          lines: [
            R`[[@Composable]].`,
            "بياخد الاسم والمدينة.",
            R`[[Row]]: جنب بعض.`,
            "واخد العرض كله ومسافة 16dp من كل ناحية.",
            "العناصر في نص الارتفاع.",
            "قفلة parameters الـ Row.",
            R`[[Box]] للصورة الرمزية.`,
            R`56dp، مقصوص دايرة بـ [[clip(CircleShape)]]، ولونه primary من الثيم.`,
            "اللي جواه في النص بالظبط.",
            "قفلة parameters الـ Box.",
            R`أول حرف من الاسم بلون مناسب فوق الـ primary.`,
            "قفلة Box.",
            "مسافة 12dp.",
            R`[[Column]] بياخد كل العرض الفاضي بـ [[weight(1f)]].`,
            "الاسم بخط العناوين.",
            "المدينة بخط صغير.",
            "قفلة Column.",
            R`زرار نصي على الطرف التاني، والـ onClick فاضي مؤقتًا.`,
            "قفلة Row.",
            "قفلة الدالة."
          ],
          sol: R`الشكل: دايرة ملونة فيها أول حرف، وجنبها الاسم والمدينة تحت بعض، والزرار في الطرف التاني. في العربي الترتيب بيتقلب لوحده: الدايرة على اليمين والزرار على الشمال.

وحل التجربة تحت. لاحظ إن الزرارين ليهم [[weight(1f)]] فبياخدوا نفس العرض، و [[Arrangement.spacedBy]] بتحط مسافة بينهم.`,
          solCode: R`@Composable
fun ProductCard(name: String, price: Double) {
    Card(modifier = Modifier.fillMaxWidth().padding(16.dp)) {
        Column(Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.size(64.dp).background(Color.LightGray))
                Spacer(Modifier.width(12.dp))
                Column {
                    Text(name, style = MaterialTheme.typography.titleMedium)
                    Text("$price ج.م", color = MaterialTheme.colorScheme.primary)
                }
            }
            Spacer(Modifier.height(12.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Button(onClick = { }, modifier = Modifier.weight(1f)) { Text("ضيف للسلة") }
                OutlinedButton(onClick = { }, modifier = Modifier.weight(1f)) { Text("مفضلة") }
            }
        }
    }
}`
        },
        {
          cmd: "التنسيق والـ Modifiers في Compose",
          title: "الـ Modifier: الحجم والمسافة والخلفية والضغط، وليه الترتيب بيفرق؟",
          desc: R`الـ [[Modifier]] سلسلة تعديلات على أي عنصر: الحجم، والمسافة، والخلفية، والشكل، والضغط. بتبدأ بـ [[Modifier]] وتسلسل بالنقطة:
[[Modifier.padding(8.dp).background(Color.Red).clickable { }]]

أشهرهم:
• الحجم: [[size(48.dp)]] و [[width]] و [[height]] و [[fillMaxWidth()]] و [[fillMaxSize()]].
• المسافة: [[padding(16.dp)]]، أو [[padding(horizontal = 12.dp, vertical = 6.dp)]].
• الشكل: [[background(color)]] و [[clip(RoundedCornerShape(12.dp))]] و [[border(1.dp, Color.Gray)]].
• التفاعل: [[clickable { }]].

أهم قاعدة: الترتيب بيفرق، لأن كل modifier بيلف اللي بعده. اقرا السلسلة من الشمال لليمين كأنك بتلف طبقات:
• [[background]] ثم [[padding]]: اللون تحت المسافة كمان (المسافة جوه اللون).
• [[padding]] ثم [[background]]: المسافة برا اللون (زي margin).

وعشان كده في Compose مفيش margin: الـ padding قبل الـ background هو الـ margin.

والقاعدة التانية: اللي بيعمل composable بيستقبل [[modifier: Modifier = Modifier]] ويحطه على أول عنصر جواه (الـ root). كده اللي بيستخدمه يقدر يتحكم في مكانه من برا.`,
          example: R`@Composable
fun Tag(text: String, onClick: () -> Unit, modifier: Modifier = Modifier) {
    Text(
        text = text,
        modifier = modifier
            .clip(RoundedCornerShape(12.dp))
            .background(MaterialTheme.colorScheme.secondaryContainer)
            .clickable { onClick() }
            .padding(horizontal = 12.dp, vertical = 6.dp)
    )
}
@Composable
fun OrderDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Box(Modifier.background(Color.Yellow).padding(16.dp)) { Text("background الأول") }
        Box(Modifier.padding(16.dp).background(Color.Yellow)) { Text("padding الأول") }
        Tag("Kotlin", onClick = { }, modifier = Modifier.padding(start = 16.dp))
    }
}`,
          try: R`في الـ Tag بدّل مكان [[.clickable]] و [[.padding(...)]] الأخيرة، ودوس على طرف الـ tag في الـ emulator: هتلاحظ إن منطقة الضغط صغرت. وبعدين حط [[border(2.dp, Color.Red)]] في ٣ أماكن مختلفة في السلسلة وقارن.`,
          flag: "script",
          deep: {
            why: R`أغلب مشاكل الشكل في Compose («ليه المسافة دي برا اللون؟» أو «ليه الضغط على جزء بس؟») سببها ترتيب الـ modifiers. ولما تفهم إنها طبقات بتتلف، هتعرف تعمل أي شكل.`,
            how: R`كل modifier بيلف اللي بعده في سلسلة. [[padding]] بيصغّر المساحة اللي بيديها للي بعده. فـ [[clickable]] قبل [[padding]] معناها إن منطقة الضغط تشمل المسافة (الأحسن للمستخدم)، وبعدها معناها إن المسافة مش بتستجيب.

و [[clip]] لازم ييجي قبل [[background]] و [[clickable]]، عشان اللون وتأثير الضغط (ripple) يتقصوا على الشكل الدايري.

الـ Modifier immutable: كل نقطة بترجّع Modifier جديد، فتقدر تعمل [[val cardModifier = Modifier.padding(8.dp)]] وتعيد استخدامه.

ولمساحة الضغط: Material بيوصي إن أي حاجة بتتداس متقلش عن 48dp. [[minimumInteractiveComponentSize()]] بتضمن ده.`,
            when: "في كل composable تقريبًا. واستقبل modifier في أي composable هيتستخدم في أكتر من مكان.",
            mistakes: R`[[padding]] بعد [[clickable]] وتستغرب إن الضغط على الأطراف مش شغال. و [[clip]] بعد [[background]] فاللون يطلع مربع. وتعمل composable من غير parameter [[modifier]]، فاللي بيستخدمه يلفه في Box زيادة عشان يحط padding. وتحط الـ modifier اللي جاي من برا على عنصر جوه مش على الـ root.`
          },
          lines: [
            R`[[@Composable]].`,
            R`tag بياخد نص، و [[onClick]] نوعه [[() -> Unit]]، و modifier اختياري.`,
            R`[[Text]].`,
            "النص.",
            "بنبدأ من الـ modifier اللي جاي من برا.",
            R`[[clip]] الأول: قص على شكل مستطيل بأركان دايرية.`,
            "لون الخلفية من الثيم (متقصوص على الشكل).",
            R`[[clickable]] قبل الـ padding: المسافة جوه منطقة الضغط.`,
            "المسافة الداخلية حوالين النص.",
            "قفلة Text.",
            "قفلة.",
            R`[[@Composable]].`,
            "composable للمقارنة.",
            "عناصر تحت بعض بمسافة 8dp.",
            "اللون الأول: الأصفر واخد النص والمسافة.",
            "المسافة الأول: المسافة برا والأصفر على النص بس.",
            R`الـ Tag، ومن برا بنزوّد مسافة من البداية ([[start]] بتبقى يمين في العربي).`,
            "قفلة Column.",
            "قفلة."
          ],
          sol: R`الـ Box الأول: مستطيل أصفر كبير والنص جواه بمسافة. التاني: مستطيل أصفر صغير على قد النص، ومسافة فاضية حواليه. ده الفرق بين padding و margin.

ولما تحط [[clickable]] بعد الـ padding الأخيرة: الضغط على النص نفسه بس هو اللي بيشتغل، والأطراف لأ، وتأثير الـ ripple بيظهر على مساحة النص بس.

والـ border: قبل الـ clip بيطلع مربع حوالين الشكل، وبعد الـ clip وقبل الـ padding بيطلع على حواف الشكل الدايرية، وبعد الـ padding بيطلع جوه حوالين النص بس.`
        },
        {
          cmd: "LazyColumn",
          title: "LazyColumn: لستة طويلة بترسم اللي ظاهر بس، و items و key",
          desc: R`لو عندك ١٠٠٠ ملاحظة وحطيتهم في Column، Compose هيرسم الألف مرة واحدة والتطبيق هيبقى تقيل. [[LazyColumn]] بترسم اللي ظاهر على الشاشة بس، ولما تعمل scroll بترسم الجديد وتشيل اللي خرج.

جوه LazyColumn مش بتكتب composables على طول، بتستخدم دوال بتوصف المحتوى:
• [[item { }]]: عنصر واحد (عنوان مثلًا).
• [[items(list) { note -> ... }]]: عنصر لكل حاجة في الـ List. [[note ->]] اسم العنصر.
• [[key = { it.id }]]: مفتاح فريد لكل عنصر. ده بيخلي Compose يعرف العنصر لو اتحرك أو اتمسح، فيحافظ على الـ state بتاعه والـ scroll صح.

وفيه [[LazyRow]] أفقي، و [[LazyVerticalGrid(columns = GridCells.Fixed(2))]] للشبكة.

و [[contentPadding]] مسافة حوالين المحتوى كله (من غير ما تقص الـ scroll)، و [[verticalArrangement = Arrangement.spacedBy(8.dp)]] مسافة بين العناصر.

و [[Card(onClick = { })]] كارت Material بيتداس.`,
          example: R`data class Note(val id: Long, val title: String)
@Composable
fun NotesList(notes: List<Note>, onNoteClick: (Note) -> Unit, modifier: Modifier = Modifier) {
    LazyColumn(
        modifier = modifier,
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        item {
            Text("ملاحظاتك ($__{notes.size})", style = MaterialTheme.typography.titleLarge)
        }
        items(notes, key = { it.id }) { note ->
            Card(onClick = { onNoteClick(note) }, modifier = Modifier.fillMaxWidth()) {
                Text(note.title, modifier = Modifier.padding(16.dp))
            }
        }
    }
}`,
          try: R`اعمل List فيها ٢٠٠ ملاحظة بـ [[List(200) { Note(it.toLong(), "ملاحظة رقم $it") }]] واعرضها. ضيف [[item]] في الآخر فيه «خلصت». وبعدين حوّلها لـ [[LazyVerticalGrid(columns = GridCells.Fixed(2))]] وشوف الفرق.`,
          flag: "script",
          deep: {
            why: R`أغلب شاشات التطبيقات لستات: رسايل، منتجات، أوردرات، إشعارات. و LazyColumn هي البديل الأبسط بكتير لـ RecyclerView في XML (اللي كان محتاج Adapter و ViewHolder وكلاسات كتير).`,
            how: R`الـ block اللي جوه LazyColumn مش composable: هو DSL بيسجّل «فيه عنصر هنا، وده شكله». والـ LazyColumn بيقيس الشاشة ويرسم بس العناصر اللي داخلة في المساحة، وكام عنصر زيادة قبل وبعد.

من غير [[key]]، Compose بيعرف العناصر بمكانها (الأول، التاني...). لو مسحت أول عنصر، كله بيتزق، والـ state اللي جوه العناصر (زي checkbox متعلّم) ممكن ينتقل للعنصر الغلط. مع [[key]] بيعرفهم بالـ id.

والـ key لازم يبقى فريد، ولازم ينفع يتحفظ في Bundle (رقم أو نص). لو اتكرر التطبيق بيقع بـ [[IllegalArgumentException: Key ... was already used]].

[[rememberLazyListState()]] بيديك مكان الـ scroll، و [[animateScrollToItem(0)]] (من coroutine) بترجع لأول اللستة. و [[Modifier.animateItem()]] على العنصر بيعمل animation لما يتحرك أو يتمسح.`,
            when: R`أي لستة عدد عناصرها مش ثابت أو ممكن يكبر. ولو ٥ عناصر ثابتة، Column عادي أبسط.`,
            mistakes: R`تحط LazyColumn جوه Column عليه [[verticalScroll]]: بيقع بـ [[Vertically scrollable component was measured with an infinity maximum height constraints]]. خلي اللستة نفسها هي اللي بتعمل scroll، وحط العناوين جواها بـ [[item]]. وتنسى [[key]] في لستة بتتمسح منها عناصر. وتعمل sort أو filter تقيل جوه الـ LazyColumn block: اعمله في الـ ViewModel.`
          },
          lines: [
            "الـ data class بتاع الملاحظة.",
            R`[[@Composable]].`,
            R`بياخد الملاحظات، و lambda بتتنادى لما واحدة تتداس.`,
            R`[[LazyColumn]].`,
            "الـ modifier اللي جاي من برا.",
            "مسافة حوالين المحتوى كله.",
            "8dp بين كل عنصر والتاني.",
            "قفلة الـ parameters.",
            R`[[item]]: عنصر واحد في الأول.`,
            "عنوان فيه العدد.",
            "قفلة item.",
            R`[[items]]: عنصر لكل ملاحظة، والـ id هو المفتاح.`,
            "كارت بيتداس، وبيبلّغ مين اللي اتداس.",
            "العنوان جوه الكارت.",
            "قفلة الكارت.",
            "قفلة items.",
            "قفلة LazyColumn.",
            "قفلة."
          ],
          sol: R`اللستة بتعمل scroll ناعم حتى بـ ٢٠٠ عنصر (ولو بـ ١٠٠٠٠)، لأن اللي بيترسم فعلًا هو اللي على الشاشة بس. و [[List(200) { ... }]] بتعمل List بـ 200 عنصر، و [[it]] جوه الـ lambda هو الـ index.

مع [[LazyVerticalGrid]] جوه الـ block بتستخدم نفس [[item]] و [[items]]، والعناصر بتترص عمودين. ولو عايز العنوان ياخد العرض كله: [[item(span = { GridItemSpan(maxLineSpan) }) { ... }]].`,
          solCode: R`@Composable
fun NotesGrid() {
    val notes = remember { List(200) { Note(it.toLong(), "ملاحظة رقم $it") } }
    LazyVerticalGrid(
        columns = GridCells.Fixed(2),
        contentPadding = PaddingValues(16.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(notes, key = { it.id }) { note ->
            Card { Text(note.title, Modifier.padding(16.dp)) }
        }
        item(span = { GridItemSpan(maxLineSpan) }) {
            Text("خلصت", Modifier.padding(16.dp))
        }
    }
}`
        },
        {
          cmd: "Material 3 و Theme",
          title: "Material 3: الثيم والألوان و dark mode و Scaffold و TopAppBar",
          desc: R`[[MaterialTheme]] بيلف التطبيق كله ويدي كل العناصر ٣ حاجات:
• [[colorScheme]]: الألوان بأسماء ليها معنى: [[primary]] (لون البراند)، و [[onPrimary]] (اللي بيتكتب فوقه)، و [[surface]] و [[background]] و [[error]] و [[secondaryContainer]]...
• [[typography]]: أحجام الخطوط: [[headlineSmall]] و [[titleMedium]] و [[bodyLarge]] و [[labelSmall]]...
• [[shapes]]: أشكال الأركان.

وفي الكود بتقرا منه: [[MaterialTheme.colorScheme.primary]] بدل ما تكتب لون ثابت. كده الـ dark mode بيشتغل لوحده، ولو غيّرت لون البراند بيتغير في كل حتة.

المشروع الجديد بيعمل ملف [[ui/theme/Theme.kt]] فيه composable زي [[NotesTheme]]:
• [[isSystemInDarkTheme()]]: الموبايل على الوضع الليلي؟
• dynamic color: من Android 12، الألوان ممكن تتاخد من خلفية موبايل اليوزر ([[dynamicLightColorScheme(context)]]).
• غير كده بتستخدم ألوانك: [[lightColorScheme(primary = ...)]].

و [[Scaffold]] الهيكل الجاهز للشاشة: [[topBar]] و [[bottomBar]] و [[floatingActionButton]] و [[snackbarHost]]، وبيديك [[padding]] لازم تحطه على المحتوى عشان ميتداريش تحت البارات.

و [[@OptIn(ExperimentalMaterial3Api::class)]]: بعض الـ APIs متعلّمة experimental (ممكن تتغير في نسخة جاية)، والـ OptIn بيقول «عارف ومستعد». و [[::class]] معناها «الكلاس نفسه كقيمة».`,
          example: R`@Composable
fun NotesTheme(darkTheme: Boolean = isSystemInDarkTheme(), content: @Composable () -> Unit) {
    val context = LocalContext.current
    val colors = when {
        Build.VERSION.SDK_INT >= Build.VERSION_CODES.S ->
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        darkTheme -> darkColorScheme(primary = Color(0xFF8AB4F8))
        else -> lightColorScheme(primary = Color(0xFF1A73E8))
    }
    MaterialTheme(colorScheme = colors, typography = Typography(), content = content)
}
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen() {
    Scaffold(
        topBar = { TopAppBar(title = { Text("ملاحظاتي") }) },
        floatingActionButton = { FloatingActionButton(onClick = { }) { Text("+") } }
    ) { padding ->
        Text(
            "أهلًا",
            modifier = Modifier.padding(padding).padding(16.dp),
            color = MaterialTheme.colorScheme.primary,
            style = MaterialTheme.typography.headlineSmall
        )
    }
}`,
          try: R`اعمل Preview لـ HomeScreen مرتين: [[@Preview(uiMode = Configuration.UI_MODE_NIGHT_YES)]] ومن غيرها، والاتنين ملفوفين في [[NotesTheme]]. بعدين جرّب [[Material Theme Builder]] من Google (أداة أونلاين) تطلّع ألوان من لون البراند، وحط الـ colorScheme الناتج في الثيم.`,
          flag: "script",
          deep: {
            why: R`تطبيق ألوانه مكتوبة ثابتة في كل حتة هيطلع شكله وحش في الـ dark mode، وتغيير البراند هيبقى في ١٠٠ ملف. الثيم بيخلي الشكل متسق، والـ Material components (الأزرار والكروت والـ text fields) شكلها جاهز ومظبوط للـ accessibility.`,
            how: R`[[MaterialTheme]] بيحط القيم في [[CompositionLocal]]: طريقة Compose لتعدية قيمة لكل اللي تحت في الشجرة من غير ما تعديها parameter parameter. [[LocalContext.current]] نفس الفكرة: بيجيب الـ Context من الشجرة.

[[content: @Composable () -> Unit]]: parameter نوعه composable lambda. ده اللي بيخلي [[NotesTheme { ... }]] تتكتب بالشكل ده (trailing lambda).

[[Color(0xFF1A73E8)]]: اللون بالـ hex، و [[FF]] في الأول هي الشفافية (FF = مش شفاف خالص).

[[Build.VERSION.SDK_INT >= Build.VERSION_CODES.S]]: فحص نسخة Android وقت التشغيل (S هو Android 12)، لأن الـ dynamic color مش موجود قبلها. وده الشكل اللي هتستخدمه مع أي API أحدث من الـ minSdk.

وكل component بياخد ألوانه الافتراضية من الـ scheme: الـ Button بياخد primary، والـ Card بياخد surfaceContainer... فلو ظبطت الـ scheme صح، نادرًا ما هتحدد لون بإيدك.`,
            when: R`مرة في أول المشروع تظبط الثيم، وبعدين في كل composable استخدم [[MaterialTheme.colorScheme]] و [[MaterialTheme.typography]] بدل القيم الثابتة.`,
            mistakes: R`[[Color.Black]] للنص في كل حتة فيختفي في الـ dark mode. وتنسى [[padding]] اللي جاي من Scaffold فالمحتوى يبقى تحت الـ TopAppBar. وتحط الـ Scaffold جوه composable جوه الثيم وكمان ثيم تاني جواه.`
          },
          lines: [
            R`[[@Composable]].`,
            R`الثيم: dark افتراضيه من إعدادات الموبايل، و [[content]] الشاشة اللي جواه.`,
            R`الـ Context من الشجرة (محتاجينه للـ dynamic color).`,
            R`[[when]] لاختيار الألوان.`,
            "Android 12 وطالع:",
            "ألوان من خلفية اليوزر، ليلي أو نهاري.",
            "أقدم من 12 وليلي: ألواننا الليلية.",
            "غير كده: ألواننا النهارية.",
            "قفلة when.",
            R`[[MaterialTheme]] بالألوان والخطوط، وجواه المحتوى.`,
            "قفلة.",
            R`[[@OptIn]]: TopAppBar ممكن يبقى متعلّم experimental.`,
            R`[[@Composable]].`,
            "شاشة.",
            R`[[Scaffold]].`,
            "بار فوق فيه العنوان.",
            "زرار عايم.",
            R`[[padding]]: المسافة اللي البارات واخداها.`,
            "نص.",
            "المحتوى.",
            "مسافة البارات ثم مسافتنا.",
            "لون من الثيم.",
            "خط من الثيم.",
            "قفلة Text.",
            "قفلة Scaffold.",
            "قفلة."
          ],
          sol: R`في الـ Preview الليلي الخلفية غامقة والنص فاتح لوحده، من غير ما تغيّر سطر في HomeScreen. ده لأن كل الألوان جاية من الـ colorScheme.

ملاحظة: الـ Preview مبيعرضش الـ dynamic color بألوان خلفية حقيقية، فممكن تشوف ألوان افتراضية. جرّب على emulator Android 12+ وغيّر الخلفية وشوف ألوان التطبيق بتتغير.`,
          solCode: R`@Preview(name = "Light")
@Preview(name = "Dark", uiMode = Configuration.UI_MODE_NIGHT_YES)
@Composable
fun HomePreview() {
    NotesTheme {
        HomeScreen()
    }
}`
        }
      ]
    },
    {
      t: "Compose: الـ state والتنقل",
      l: 2,
      n: "remember و mutableStateOf و rememberSaveable، ورفع الـ state لفوق، والتنقل بين الشاشات، والـ ViewModel و StateFlow",
      items: [
        {
          cmd: "remember و state",
          title: "remember و mutableStateOf و rememberSaveable: الشاشة تتحدث لوحدها إزاي؟",
          desc: R`في Compose الشاشة دالة في الـ state: لما الـ state يتغير، الدالة بتتنادى تاني (recomposition) والشاشة ترسم القيمة الجديدة. بس Compose لازم «يعرف» إن القيمة اتغيرت. متغير Kotlin عادي ([[var count = 0]]) مش هيحرّك حاجة.

• [[mutableStateOf(0)]]: صندوق قيمة Compose بيراقبه. أي composable قرا قيمته، هيتعاد رسمه لما تتغير.
• [[remember { ... }]]: افتكر القيمة دي بين مرات الرسم. من غيرها، كل recomposition هيعمل صندوق جديد بصفر.
• [[by]]: بدل ما تكتب [[count.value]] و [[count.value = 1]]، الـ [[by]] (اسمها property delegate) بتخليك تكتب [[count]] و [[count++]] على طول. محتاجة import لـ [[getValue]] و [[setValue]] (Android Studio بيقترحهم).
• [[mutableIntStateOf(0)]]: نسخة للأرقام من غير boxing (أخف شوية).

بس [[remember]] بتنسى لما الـ Activity تتعمل من الأول (rotation مثلًا). [[rememberSaveable]] بتحفظ القيمة في الـ Bundle فبتعيش بعد الـ rotation وبعد ما النظام يقتل التطبيق في الخلفية. استخدمها لأي حاجة اليوزر كتبها أو اختارها.

و [[OutlinedTextField(value, onValueChange)]]: الـ text field في Compose مبيحفظش النص لوحده. انت بتديله [[value]]، ولما اليوزر يكتب بيناديلك [[onValueChange]] بالنص الجديد وانت اللي تحدّث الـ state. لو محدثتهوش، الكتابة مش هتظهر.`,
          example: R`@Composable
fun Counter() {
    var count by remember { mutableIntStateOf(0) }
    var name by rememberSaveable { mutableStateOf("") }
    Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text("العدد: $count")
        Button(onClick = { count++ }) { Text("زوّد") }
        OutlinedTextField(
            value = name,
            onValueChange = { name = it },
            label = { Text("اسمك") }
        )
        if (name.isNotBlank()) {
            Text("أهلًا يا $name")
        }
    }
}`,
          try: R`شغّل الـ Counter، زوّد العدد لـ 5 واكتب اسمك، وبعدين لف الـ emulator. هتلاقي الاسم فضل والعدد رجع صفر. غيّر [[remember]] لـ [[rememberSaveable]] في العدد وجرّب تاني. وبعدين شيل [[remember]] خالص ([[var count by mutableIntStateOf(0)]]) وشوف Android Studio هيقول إيه.`,
          flag: "script",
          deep: {
            why: R`ده قلب Compose كله. أي حاجة بتتغير على الشاشة (نص بيتكتب، checkbox، tab مختار، dialog مفتوح) هي state. ولو حطيتها في متغير عادي أو نسيت remember، الشاشة مش هتتحدث أو هتتصفّر، وده أكتر سؤال بيتسأل من المبتدئين.`,
            how: R`[[mutableStateOf]] بيرجّع [[MutableState<T>]]: object فيه [[value]]. لما composable يقرا [[value]] وهو بيترسم، نظام اسمه snapshot بيسجّل «الـ composable ده بيعتمد على الـ state ده». ولما حد يكتب قيمة جديدة، Compose بيعلّم الـ composable ده إنه محتاج يترسم تاني في الـ frame الجاي. والقيمة الجديدة لازم تبقى «مختلفة» (بـ ==) عشان يحصل recomposition.

[[remember]] بيخزن القيمة في الـ Composition نفسه في مكان الـ composable. لو الـ composable اختفى من الشاشة (if بقت false)، الـ remember بتاعه بيتنسي.

[[rememberSaveable]] بيستخدم الـ saved instance state بتاع الـ Activity، فالقيمة لازم تتحفظ في Bundle (نصوص وأرقام و Parcelable). لأي حاجة تانية محتاج [[Saver]].

ولو عندك List بتتغير: [[mutableStateListOf()]]، أو الأحسن List عادية read-only جوه mutableStateOf وتبدّلها بواحدة جديدة.`,
            when: R`[[remember]] لـ state صغير ومؤقت يخص الـ UI (animation، dropdown مفتوح). [[rememberSaveable]] لأي حاجة اليوزر هيزعل لو ضاعت. والـ state الحقيقي بتاع الشاشة (داتا من السيرفر) مكانه الـ ViewModel.`,
            mistakes: R`[[var count = 0]] جوه composable: مبيتحدثش. و [[mutableStateOf]] من غير [[remember]]: بيتصفّر مع كل رسمة (Android Studio بيحذّرك: [[Creating a state object during composition without using remember]]). و [[val list = remember { mutableListOf<String>() }]] وتعمل [[add]]: الـ MutableList العادية Compose مش بيراقبها، فالشاشة مش هتتحدث.`
          },
          lines: [
            R`[[@Composable]].`,
            "شاشة.",
            R`عدد: [[remember]] بيفتكره بين الرسمات، و [[by]] عشان نكتب count على طول.`,
            R`اسم: [[rememberSaveable]] فبيعيش بعد الـ rotation.`,
            "عمود بمسافات.",
            "قراية count: الـ Text ده هيترسم تاني لما يتغير.",
            "كل ضغطة بتغيّر الـ state، فالشاشة بتتحدث.",
            "حقل كتابة.",
            "القيمة اللي بتظهر جواه من الـ state.",
            "لما اليوزر يكتب: نحدّث الـ state بالنص الجديد (it).",
            "العنوان الصغير فوق الحقل.",
            "قفلة الحقل.",
            "لو فيه اسم...",
            "...اعرض الترحيب.",
            "قفلة if.",
            "قفلة Column.",
            "قفلة."
          ],
          sol: R`بعد اللفة: الاسم موجود (rememberSaveable) والعدد صفر (remember اتنسى مع الـ Activity القديمة). ولما تغيّر العدد لـ [[rememberSaveable { mutableIntStateOf(0) }]] الاتنين بيفضلوا.

ولما تشيل remember، Android Studio بيعلّم السطر بالأحمر بـ lint اسمه [[UnrememberedMutableState]]، ولو شغّلت: العدد مش هيزيد أبدًا، لأن كل ضغطة بتعمل recomposition وكل recomposition بيعمل state جديد بصفر.`
        },
        {
          cmd: "state hoisting",
          title: "state hoisting: تطلّع الـ state لفوق وتخلي الـ composable يبلّغ بالأحداث",
          desc: R`الـ composable اللي جواه state بتاعه صعب تتحكم فيه من برا وصعب تختبره. الحل اسمه [[state hoisting]] (رفع الـ state): الـ composable ياخد القيمة كـ parameter، ولما حاجة تحصل يبلّغ بـ lambda:
[[SearchBox(query: String, onQueryChange: (String) -> Unit)]]

القاعدة بتتقال كده: الـ state بينزل لتحت، والأحداث بتطلع لفوق. ده اسمه unidirectional data flow (الداتا ماشية في اتجاه واحد). وده نفس اللي [[TextField]] نفسه بيعمله: [[value]] و [[onValueChange]].

النتيجة:
• [[SearchBox]] بقى stateless: بيرسم اللي اتبعتله وبس. تقدر تعمله Preview بأي قيمة، وتستخدمه في أي شاشة.
• [[ProductsScreen]] هو صاحب الـ state ([[query]])، فيقدر يستخدمه في حاجة تانية (الفلترة).

ترفع الـ state لحد فين؟ لأقرب أب مشترك لكل اللي محتاجينه. هنا الـ query محتاجها الـ SearchBox والفلترة، فمكانها ProductsScreen. ولو محتاجها كمان منطق business أو API، يطلع للـ ViewModel.`,
          example: R`@Composable
fun SearchBox(query: String, onQueryChange: (String) -> Unit, modifier: Modifier = Modifier) {
    OutlinedTextField(
        value = query,
        onValueChange = onQueryChange,
        placeholder = { Text("دوّر...") },
        singleLine = true,
        modifier = modifier.fillMaxWidth()
    )
}
@Composable
fun ProductsScreen(all: List<String>) {
    var query by rememberSaveable { mutableStateOf("") }
    val shown = all.filter { it.contains(query, ignoreCase = true) }
    Column(Modifier.padding(16.dp)) {
        SearchBox(query = query, onQueryChange = { query = it })
        Text("$__{shown.size} نتيجة")
        shown.forEach { Text(it) }
    }
}`,
          try: R`اعمل [[QuantityPicker(quantity: Int, onQuantityChange: (Int) -> Unit)]] فيه زرار [[-]] ورقم وزرار [[+]]، ومينزلش تحت 1. استخدمه في شاشة فيها سعر الوحدة 85، والإجمالي بيتحسب تحت. واعمله Preview بكمية 3 من غير أي state.`,
          flag: "script",
          deep: {
            why: R`لما الـ state يبقى في مكان واحد، فيه «مصدر حقيقة واحد» (single source of truth): مفيش نسختين من نفس القيمة يختلفوا عن بعض. والـ composables الـ stateless أسهل تتختبر وتتعاد استخدامها وتتعرض في Preview.`,
            how: R`[[onValueChange = onQueryChange]]: بنعدّي الـ lambda نفسها من غير ما نلفها، لأن النوع واحد [[(String) -> Unit]].

[[all.filter { ... }]] جوه الـ composable بتتحسب مع كل recomposition. للستة صغيرة مش مشكلة. للكبيرة: [[val shown = remember(all, query) { all.filter { ... } }]] بتتحسب بس لما all أو query يتغيروا، أو الأحسن الفلترة تبقى في الـ ViewModel.

[[shown.forEach { Text(it) }]] جوه Column: شغال للعدد الصغير، ولستة طويلة استخدم LazyColumn.

وفي الشاشات الكبيرة النمط المعتاد: composable «route» بيكلم الـ ViewModel ويجيب الـ state، وجواه composable «screen» stateless بياخد الـ state والـ lambdas. الـ screen هو اللي بتعمله Preview واختبار UI.`,
            when: R`أي composable هيتستخدم في أكتر من مكان، أو محتاج تعمله Preview أو اختبار، أو الـ state بتاعه محتاجه حد تاني. والـ state اللي محدش برا محتاجه (زي dropdown مفتوح ولا لأ) ينفع يفضل جوه.`,
            mistakes: R`ترفع كل حاجة لفوق لحد الـ Activity من غير لازمة. أو العكس: تحط state جوه SearchBox وكمان نسخة في الشاشة ويختلفوا. وتنسى تنادي [[onValueChange]] فالـ text field يبقى مقفول (اليوزر بيكتب ومفيش حاجة بتظهر).`
          },
          lines: [
            R`[[@Composable]].`,
            R`stateless: بياخد القيمة والـ lambda، ومفيش state جواه.`,
            "حقل الكتابة.",
            "القيمة من برا.",
            "أي كتابة بتطلع لفوق على طول.",
            "النص الباهت لما الحقل فاضي.",
            "سطر واحد.",
            "عرض كامل.",
            "قفلة.",
            "قفلة.",
            R`[[@Composable]].`,
            "الشاشة صاحبة الـ state.",
            "الـ state هنا.",
            R`الفلترة، و [[ignoreCase]] عشان الحروف الكبيرة والصغيرة.`,
            "عمود.",
            "بنبعت القيمة ونستقبل التغيير.",
            "عدد النتايج.",
            "كل نتيجة في سطر.",
            "قفلة Column.",
            "قفلة."
          ],
          sol: R`لما تكتب في الـ SearchBox، الحدث بيطلع للشاشة، الشاشة تغيّر [[query]]، و Compose يعيد رسم الاتنين: الـ SearchBox بالنص الجديد، واللستة متفلترة.

وحل التجربة تحت: [[QuantityPicker]] مفيهوش [[remember]] خالص، فتقدر تعمله Preview بـ [[QuantityPicker(3, { })]]. و [[coerceAtLeast(1)]] بتمنع النزول تحت 1.`,
          solCode: R`@Composable
fun QuantityPicker(quantity: Int, onQuantityChange: (Int) -> Unit) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        OutlinedButton(onClick = { onQuantityChange((quantity - 1).coerceAtLeast(1)) }) { Text("-") }
        Text("$quantity", Modifier.padding(horizontal = 16.dp))
        OutlinedButton(onClick = { onQuantityChange(quantity + 1) }) { Text("+") }
    }
}

@Composable
fun CartLine(unitPrice: Int = 85) {
    var qty by rememberSaveable { mutableIntStateOf(1) }
    Column(Modifier.padding(16.dp)) {
        QuantityPicker(quantity = qty, onQuantityChange = { qty = it })
        Text("الإجمالي: $__{qty * unitPrice} ج.م")
    }
}

@Preview
@Composable
fun QuantityPickerPreview() {
    QuantityPicker(quantity = 3, onQuantityChange = { })
}`
        },
        {
          cmd: "Navigation Compose",
          title: "تتنقل بين الشاشات إزاي؟ (Navigation Compose بـ routes من نوع @Serializable)",
          desc: R`في تطبيق Compose غالبًا Activity واحدة، والشاشات composables. مكتبة [[Navigation Compose]] ([[androidx.navigation:navigation-compose]]) بتدير مين ظاهر، والـ back stack (لستة الشاشات اللي ورا بعض، والـ Back بيرجع للي قبلها).

من نسخة 2.8 الـ routes بقت type-safe: كل شاشة نوع Kotlin عليه [[@Serializable]]:
• شاشة من غير بيانات: [[@Serializable object Home]].
• شاشة محتاجة بيانات: [[@Serializable data class NoteDetails(val id: Long)]].

الأجزاء:
• [[rememberNavController()]]: اللي بيتحكم في التنقل.
• [[NavHost(navController, startDestination = Home) { ... }]]: المكان اللي الشاشة الحالية بتترسم فيه، وجواه الخريطة.
• [[composable<Home> { ... }]]: «لما الـ route يبقى Home ارسم ده». الـ [[< >]] هنا بتحدد النوع.
• [[navController.navigate(NoteDetails(5))]]: روح للشاشة دي.
• [[backStackEntry.toRoute<NoteDetails>()]]: اقرا البيانات اللي اتبعتت.
• [[navController.popBackStack()]]: ارجع.

[[@Serializable]] محتاجة plugin الـ kotlinx.serialization في Gradle ([[org.jetbrains.kotlin.plugin.serialization]]) ومكتبة [[kotlinx-serialization-json]].

والعرف المهم: الشاشة نفسها متعرفش حاجة عن الـ navController. بتاخد lambdas زي [[onOpenNote: (Long) -> Unit]]، والـ NavHost هو اللي يقرر يعمل إيه. كده الشاشة تتعمل Preview وتتختبر لوحدها.`,
          example: R`@Serializable
object Home
@Serializable
data class NoteDetails(val id: Long)
@Composable
fun AppNavHost() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = Home) {
        composable<Home> {
            HomeScreen(onOpenNote = { id -> navController.navigate(NoteDetails(id)) })
        }
        composable<NoteDetails> { backStackEntry ->
            val route = backStackEntry.toRoute<NoteDetails>()
            NoteDetailsScreen(id = route.id, onBack = { navController.popBackStack() })
        }
    }
}`,
          try: R`اعمل شاشتين: HomeScreen فيها ٣ أزرار لملاحظات 1 و 2 و 3، و NoteDetailsScreen بتعرض «ملاحظة رقم X» وزرار رجوع. وصّلهم بالـ NavHost ده. جرّب زرار Back بتاع الموبايل، وبعدين ضيف شاشة Settings من غير بيانات.`,
          flag: "script",
          deep: {
            why: R`أي تطبيق حقيقي فيه كذا شاشة. والـ type-safe routes بتخلي المترجم يمسك الغلط: لو الشاشة محتاجة [[id]] ونسيته، مش هيترجم. في النسخ القديمة كانت الـ routes نصوص زي [["details/{id}"]] وأي غلطة إملائية بتقع وقت التشغيل.`,
            how: R`الـ Navigation بيحوّل الـ route object لـ URL داخلي من اسم الكلاس والـ properties بتاعته (بـ kotlinx.serialization)، ويحفظ الـ back stack في الـ saved state، فبيعيش بعد الـ rotation و process death.

كل entry في الـ back stack ليه lifecycle و ViewModelStore بتوعه: [[viewModel()]] جوه [[composable<NoteDetails>]] بيعمل ViewModel يعيش طول ما الشاشة دي في الـ stack، ويتمسح لما تخرج منها. وفي الـ ViewModel تقدر تقرا الـ route بـ [[savedStateHandle.toRoute<NoteDetails>()]].

خيارات التنقل: [[navigate(Home) { popUpTo<Home> { inclusive = true } }]] عشان تمسح اللي ورا (بعد login مثلًا)، و [[launchSingleTop = true]] عشان متفتحش نفس الشاشة مرتين فوق بعض.

وفيه مكتبة أحدث من Google اسمها [[Navigation 3]] ([[androidx.navigation3]]، stable من نوفمبر 2025): الـ back stack فيها بقى List انت اللي ماسكها ([[rememberNavBackStack(Home)]] و [[backStack.add(NoteDetails(5))]]) و [[NavDisplay]] بيعرض آخر عنصر. فكرتها أقرب لروح Compose، وبتدّي تحكم أكبر في الشاشات الكبيرة. Navigation Compose لسه هي اللي في أغلب المشاريع الموجودة، فاعرف الاتنين.`,
            when: "أي تطبيق فيه أكتر من شاشة. ولو شاشة واحدة فيها tabs بسيطة، ممكن state عادي يكفي.",
            mistakes: R`تبعت الـ navController للشاشات نفسها فتبقى مربوطة بالـ navigation ومتتعملش Preview. وتبعت object كبير (المنتج كله) في الـ route: ابعت الـ id بس، والشاشة تجيب الباقي من الـ repository. وتنسى plugin الـ serialization فيقع بـ [[Serializer for class 'NoteDetails' is not found]].`
          },
          lines: [
            "الـ annotation اللي بتخلي النوع ينفع route.",
            "شاشة البداية من غير بيانات.",
            "نفس الـ annotation.",
            "شاشة التفاصيل ومعاها id.",
            R`[[@Composable]].`,
            "الـ NavHost بتاع التطبيق.",
            "اللي بيتحكم في التنقل، ومتفتكر بين الرسمات.",
            "المكان اللي الشاشة الحالية بتترسم فيه، والبداية Home.",
            R`لما الـ route يبقى Home.`,
            R`الشاشة بتبلّغ بالـ id، والـ NavHost هو اللي ينقل.`,
            "قفلة.",
            R`لما الـ route يبقى NoteDetails.`,
            R`[[toRoute]]: نقرا البيانات اللي اتبعتت.`,
            "نعرض الشاشة، والرجوع بـ popBackStack.",
            "قفلة.",
            "قفلة NavHost.",
            "قفلة."
          ],
          sol: R`دوسة على «ملاحظة 2» بتفتح التفاصيل بـ [[id = 2]]، و Back (زرار الموبايل أو زرارك) بيرجع للـ Home. لاحظ إن الـ Back بتاع النظام شغال لوحده من غير ما تكتب حاجة، لأن الـ NavHost بيسمعه.

ولو دوست على نفس الملاحظة كذا مرة بسرعة، ممكن تتفتح كذا نسخة فوق بعض. الحل [[navController.navigate(NoteDetails(id)) { launchSingleTop = true }]].

وحل التجربة تحت (مع Settings).`,
          solCode: R`@Serializable
object Settings

@Composable
fun HomeScreen(onOpenNote: (Long) -> Unit, onOpenSettings: () -> Unit) {
    Column(Modifier.padding(16.dp)) {
        for (id in 1L..3L) {
            Button(onClick = { onOpenNote(id) }) { Text("ملاحظة $id") }
        }
        TextButton(onClick = onOpenSettings) { Text("الإعدادات") }
    }
}

@Composable
fun NoteDetailsScreen(id: Long, onBack: () -> Unit) {
    Column(Modifier.padding(16.dp)) {
        Text("ملاحظة رقم $id")
        Button(onClick = onBack) { Text("رجوع") }
    }
}

// في الـ NavHost:
// composable<Home> { HomeScreen(onOpenNote = { navController.navigate(NoteDetails(it)) }, onOpenSettings = { navController.navigate(Settings) }) }
// composable<Settings> { Text("الإعدادات") }`
        },
        {
          cmd: "الـ ViewModel وحفظ البيانات",
          title: "ViewModel و StateFlow: الـ state يعيش بعد الـ rotation والشاشة تقراه بـ collectAsStateWithLifecycle",
          desc: R`الـ [[ViewModel]] كلاس بيمسك state الشاشة والمنطق بتاعها، وبيعيش أطول من الـ Activity: لما الموبايل يلف والـ Activity تتعمل من الأول، نفس الـ ViewModel بيفضل بالداتا اللي فيه. وبيتمسح بس لما الشاشة تخرج نهائيًا.

والشاشة بتقرا منه state بنمط ثابت:
• [[private val _uiState = MutableStateFlow(CartUiState())]]: نسخة بتتغير، و [[private]] فمحدش يغيّرها غير الـ ViewModel. الـ [[_]] في أول الاسم عرف للنسخة الداخلية.
• [[val uiState: StateFlow<CartUiState> = _uiState.asStateFlow()]]: نسخة للقراية بس للشاشة.
• [[_uiState.update { it.copy(...) }]]: تحديث آمن: خد القيمة الحالية ([[it]]) ورجّع نسخة جديدة بـ [[copy]].

[[StateFlow]] (من مكتبة kotlinx.coroutines) قيمة بتتغير مع الوقت، وأي حد بيسمعها بيوصله كل قيمة جديدة. ودايمًا معاها قيمة حالية ([[value]]).

في Compose:
• [[viewModel()]]: بيجيب الـ ViewModel، أو بيعمله أول مرة بس. محتاجة مكتبة [[lifecycle-viewmodel-compose]].
• [[collectAsStateWithLifecycle()]]: بيحوّل الـ StateFlow لـ Compose state، وبيوقف السمع لما الشاشة تبقى في الخلفية. محتاجة [[lifecycle-runtime-compose]].

والشاشة بتبعت أحداث بنداء دوال: [[viewModel.addItem(50.0)]]. الـ state بينزل والأحداث بتطلع، نفس فكرة state hoisting بالظبط.`,
          example: R`data class CartUiState(val count: Int = 0, val total: Double = 0.0)
class CartViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(CartUiState())
    val uiState: StateFlow<CartUiState> = _uiState.asStateFlow()
    fun addItem(price: Double) {
        _uiState.update { it.copy(count = it.count + 1, total = it.total + price) }
    }
    fun clear() {
        _uiState.value = CartUiState()
    }
}
@Composable
fun CartScreen(viewModel: CartViewModel = viewModel()) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    Column(Modifier.padding(16.dp)) {
        Text("في السلة: $__{state.count} - الإجمالي: $__{state.total}")
        Button(onClick = { viewModel.addItem(50.0) }) { Text("ضيف منتج بـ 50") }
        TextButton(onClick = viewModel::clear) { Text("فضّي السلة") }
    }
}`,
          try: R`ضيف ٣ منتجات ولف الـ emulator: العدد فاضل 3. بعدين جرّب من Android Studio: شغّل التطبيق، دوس Home، ومن Logcat دوس على زرار Terminate Application (المربع الأحمر)، وارجع للتطبيق من الـ recents. العدد هيرجع صفر. ده الفرق بين config change و process death.`,
          flag: "script",
          deep: {
            why: R`من غير ViewModel أي داتا جبتها من السيرفر هتتجاب تاني مع كل لفة، وأي نداء شغال هيتلغي. وكمان الـ ViewModel بيفصل المنطق عن الرسم: الـ Composable يرسم بس، والـ ViewModel يقرر. وده اللي بيخلي المنطق يتختبر بـ unit test عادي من غير موبايل.`,
            how: R`[[viewModel()]] بيدوّر في [[ViewModelStore]] بتاع أقرب [[ViewModelStoreOwner]] (الـ Activity، أو entry الـ navigation). الـ Store ده النظام بيحافظ عليه عبر الـ configuration changes، وبيمسحه (وبينادي [[onCleared()]]) لما الـ owner يخلص فعلًا.

ولو الـ ViewModel محتاج parameters (repository مثلًا)، [[viewModel()]] لوحدها مش هتعرف تعمله. الحل factory، أو Hilt ([[hiltViewModel()]]، المستوى ٣).

process death: لو النظام قتل التطبيق في الخلفية، الـ ViewModel كمان بيروح. اللي لازم يعيش (زي نص بيتكتب أو id الشاشة) حطه في [[SavedStateHandle]]: الـ ViewModel ياخده في الـ constructor، و [[savedStateHandle.getStateFlow("query", "")]] بترجّع StateFlow متحفوظ.

[[update { }]] أأمن من [[_uiState.value = _uiState.value.copy(...)]] لو فيه أكتر من coroutine بيعدّلوا في نفس الوقت، لأنها بتعيد المحاولة لو القيمة اتغيرت في النص.

[[viewModel::clear]]: function reference للدالة على الـ object ده، بدل [[{ viewModel.clear() }]].`,
            when: "كل شاشة فيها state مش تافه أو داتا جاية من برا. الشاشات الصغيرة جدًا (dialog بسيط) ممكن rememberSaveable يكفي.",
            mistakes: R`تحط [[Context]] أو Activity أو View في الـ ViewModel: هو عايش أطول منهم فبيمسكهم في الذاكرة (memory leak). لو محتاج Context للـ resources، الأحسن متحتاجهوش (رجّع ids والشاشة تحوّلها)، أو [[AndroidViewModel]] بالـ Application context. وتعرض [[MutableStateFlow]] public فالشاشة تغيّره من برا. وتستخدم [[collectAsState()]] بدل [[collectAsStateWithLifecycle()]] فالسمع يفضل شغال والتطبيق في الخلفية.`
          },
          lines: [
            "الـ UI state كله في data class واحد بقيم افتراضية.",
            R`الـ ViewModel بيورث من [[ViewModel]].`,
            R`النسخة الداخلية اللي بتتغير، [[private]].`,
            "النسخة اللي الشاشة بتقراها (read-only).",
            "حدث من الشاشة.",
            R`[[update]]: نسخة جديدة بالعدد والإجمالي الجديد.`,
            "قفلة.",
            "حدث تاني.",
            "نرجع للحالة الأولى.",
            "قفلة.",
            "قفلة الكلاس.",
            R`[[@Composable]].`,
            R`الشاشة بتاخد الـ ViewModel، وافتراضيًا [[viewModel()]] بيجيبه أو يعمله.`,
            "نسمع الـ StateFlow كـ Compose state (وبيقف في الخلفية).",
            "عمود.",
            "بنعرض من الـ state.",
            "الضغطة حدث بيطلع للـ ViewModel.",
            R`function reference بـ [[::]].`,
            "قفلة Column.",
            "قفلة."
          ],
          sol: R`بعد اللفة: [[في السلة: 3 - الإجمالي: 150.0]] زي ما هو، لأن الـ Activity الجديدة خدت نفس الـ ViewModel.

بعد Terminate: الـ process اتقتل وكل الـ objects راحت، فالعدد صفر. لو عايز السلة تعيش بعد كده: [[SavedStateHandle]] لحاجة صغيرة، أو الأصح للسلة تتحفظ في DataStore أو Room (دروس جاية).`,
          solCode: R`// نسخة بـ SavedStateHandle: viewModel() بيبعته لوحده لو موجود في الـ constructor
class CartViewModel(private val savedState: SavedStateHandle) : ViewModel() {
    val count: StateFlow<Int> = savedState.getStateFlow("count", 0)

    fun addItem() {
        savedState["count"] = count.value + 1
    }
}`
        }
      ]
    },
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
    },
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
    },
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
  ]
});
