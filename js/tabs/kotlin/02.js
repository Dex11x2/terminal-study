// تكملة تاب kotlin: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/kotlin/01.js (شرح حقول الدرس في أوله)
MORE("kotlin", [
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
    }
]);
