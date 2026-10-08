// تكملة تاب kotlin: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/kotlin/01.js (شرح حقول الدرس في أوله)
MORE("kotlin", [
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
]);
