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
    }
  ]
});
