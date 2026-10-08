// تكملة تاب kotlin: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/kotlin/01.js (شرح حقول الدرس في أوله)
MORE("kotlin", [
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
          teach: R`## الكود ده بيعمل إيه؟

شاشة فيها عدّاد بزرار «زوّد»، وحقل تكتب فيه اسمك، ولو كتبت حاجة يظهر «أهلًا يا ...». الاتنين state: قيم بتتغير، والشاشة بتترسم من جديد لما تتغير.

> فين اتجرّب: Compose Multiplatform 1.12.1 للـ Desktop في [[docker run --rm eclipse-temurin:21-jdk]] باختبار UI headless: داس وكتب، وعدّ الدالة اتنادت كام مرة. ولفة الموبايل (الـ Activity بتتعمل من الأول) عملناها بإننا حفظنا الـ saveable state، ورمينا الشاشة، وبنيناها تاني من المحفوظ: ده نفس اللي Android بيعمله مع الـ Bundle. وتحذير Android Studio اتجاب من [[lintDebug]] حقيقي على مشروع Android. اللفة على emulator نفسها من الـ docs.

---

## ١. سطر العدّاد

~~~kotlin
var count by remember { mutableIntStateOf(0) }
~~~

فكّه من جوه لبرة:

### [[mutableIntStateOf(0)]]

بيعمل صندوق فيه رقم ابتدائه 0، و Compose **بيراقبه**: أي composable قرا القيمة وهو بيترسم، بيتسجّل إنه معتمد عليها. ولما القيمة تتغير، بيتعاد رسمه. ونسخة [[Int]] مخصوص عشان الرقم يتخزن [[int]] عادي من غير ما يتلف في object ([[mutableStateOf(0)]] كانت هتشتغل برضه).

### [[remember { ... }]]

الدالة [[Counter]] بتتنادى من الأول مع كل تغيير. [[remember]] بتقول: أول مرة نفّذ الـ lambda واحفظ الناتج في الـ Composition، وكل مرة بعدها رجّع **نفس** الصندوق.

### [[var count by ...]]

[[by]] اسمها property delegate: بدل ما تكتب [[count.value]] و [[count.value++]]، تكتب [[count]] و [[count++]] على طول. و [[var]] لأننا هنغيّره. (محتاجة import لـ [[androidx.compose.runtime.getValue]] و [[setValue]].)

---

## ٢. القراية والكتابة

~~~kotlin
Text("العدد: $count")
Button(onClick = { count++ }) { Text("زوّد") }
~~~

الـ [[Text]] **بيقرا** [[count]]، والـ [[onClick]] **بيكتب**. دوسنا ٣ مرات وعدّينا [[Counter]] اتنادت كام مرة:

~~~text الناتج
Counter ran 1 time(s) at start
after 3 clicks: 'العدد: 3' shown; Counter ran 4 time(s)
~~~

مرة في الأول، ومرة مع كل ضغطة: ده الـ recomposition. (الـ [[Column]] inline function، فالقراية بتتحسب على [[Counter]] كلها.)

---

## ٣. الاسم: [[rememberSaveable]] و [[OutlinedTextField]]

~~~kotlin
var name by rememberSaveable { mutableStateOf("") }
...
OutlinedTextField(
    value = name,
    onValueChange = { name = it },
    label = { Text("اسمك") }
)
if (name.isNotBlank()) {
    Text("أهلًا يا $name")
}
~~~

| الحتة | معناها |
|---|---|
| [[rememberSaveable]] | زي [[remember]]، وكمان بتتحفظ في الـ saved state (الـ Bundle على Android)، فتعيش بعد اللفة |
| [[value = name]] | الحقل بيعرض اللي في الـ state، مش بيحفظ نص لوحده |
| [[onValueChange = { name = it }]] | لما اليوزر يكتب، الحقل بيبعتلك النص الجديد في [[it]] وانت تحطه في الـ state |
| [[label = { Text("اسمك") }]] | العنوان الصغير فوق الحقل (composable lambda) |
| [[name.isNotBlank()]] | فيه حرف غير المسافات؟ |

~~~text الناتج
greeting before typing exists? 0
after typing: 'أهلًا يا Sara' shown
~~~

الترحيب مكانش موجود خالص (الـ [[if]] كانت false)، ولما كتبنا [[Sara]] الـ state اتغير والـ [[if]] بقت true فظهر.

### لو مش هتحدّث الـ state

جربنا [[OutlinedTextField(value = "", onValueChange = { })]] وكتبنا [[abc]]:

~~~text الناتج
field without updating state, after typing abc: ''
~~~

الحقل فضل فاضي: هو بيعرض [[value]] بس، واحنا مغيّرناهاش.

---

## ٤. اللفة: [[remember]] ضد [[rememberSaveable]]

زوّدنا العدد لـ 5 وكتبنا [[Sara]]، وبعدين حفظنا الـ saved state ورمينا الشاشة وبنيناها تاني (اللي بيحصل في اللفة):

~~~text الناتج
before recreate: العدد: 5
saved bundle-like map: {-1jgo2q1b35o7=..., 1hj85izr3ywmo=[MutableState(value=Sara)@517716394]}
after recreate: 'العدد: 0' , field='Sara'
~~~

- المحفوظ فيه الاسم بس ([[MutableState(value=Sara)]]) ومفتاح تاني فيه حاجة داخلية بتاعة الحقل نفسه (شلنا قيمته من الناتج). العدد مش موجود، لأنه [[remember]].
- بعد البناء تاني: العدد رجع **0** والاسم فضل **Sara**. وده بالظبط اللي التجربة بتقوله، ولو غيّرت العدد لـ [[rememberSaveable]] هيتحفظ هو كمان.
- المفاتيح الغريبة دي Compose بيعملها من مكان الـ composable في الشجرة.

---

## ٥. التجربة: شيل [[remember]]

~~~kotlin
var count by mutableIntStateOf(0)
~~~

على مشروع Android، [[lintDebug]] وقّف البناء:

~~~text الناتج
State.kt:31: Error: Creating a state object during composition without using remember [UnrememberedMutableState from androidx.compose.runtime]
~~~

ولو شغّلت برضه (على Desktop، مفيش lint):

~~~text الناتج
no remember after 3 clicks: 'من غير remember: 0', NoRemember ran 4 time(s)
~~~

الدالة اتنادت ٤ مرات (يعني الضغطة **غيّرت** الـ state وعملت recomposition)، بس كل recomposition بيعمل صندوق جديد بصفر، فالرقم عمره ما بيزيد.

### وكمان: [[mutableListOf]] جوه [[remember]]

جربنا [[val list = remember { mutableListOf<String>() }]] وزرار بيعمل [[list.add("x")]] ٣ مرات:

~~~text الناتج
mutableListOf after 3 adds: 'العناصر: 0'
~~~

اللستة نفسها فيها ٣، بس Compose مش بيراقب [[MutableList]] العادية، فمحدش عمل recomposition. استخدم [[mutableStateListOf()]] أو List read-only جوه [[mutableStateOf]].

---

## الخلاصة

| الكود | النتيجة |
|---|---|
| [[var count = 0]] | مبيتحدثش أبدًا |
| [[mutableStateOf(0)]] من غير remember | بيتصفّر مع كل رسمة (و lint بيقول Error) |
| [[remember { mutableStateOf(0) }]] | بيعيش بين الرسمات، ويضيع في اللفة |
| [[rememberSaveable { mutableStateOf(0) }]] | بيعيش بعد اللفة كمان |

والـ text field: [[value]] من الـ state، و [[onValueChange]] يحدّث الـ state.`,
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
          teach: R`## الكود ده بيعمل إيه؟

شاشة بحث: حقل تكتب فيه، وتحته عدد النتايج والمنتجات اللي اسمها فيه اللي كتبته. الحقل نفسه ([[SearchBox]]) **ملوش** state: الشاشة ([[ProductsScreen]]) هي اللي ماسكة النص، وبتبعته للحقل، والحقل بيبلّغها لما اليوزر يكتب.

> فين اتجرّب: Compose Multiplatform 1.12.1 للـ Desktop في [[docker run --rm eclipse-temurin:21-jdk]]، باختبار UI headless كتب في الحقل وداس على الأزرار، وطبع كل النصوص اللي على الشاشة بعد كل خطوة.

---

## ١. [[SearchBox]]: stateless

~~~kotlin
@Composable
fun SearchBox(query: String, onQueryChange: (String) -> Unit, modifier: Modifier = Modifier) {
    OutlinedTextField(
        value = query,
        onValueChange = onQueryChange,
        placeholder = { Text("دوّر...") },
        singleLine = true,
        modifier = modifier.fillMaxWidth()
    )
}
~~~

| الحتة | معناها |
|---|---|
| [[query: String]] | النص اللي هيتعرض: **نازل** من فوق |
| [[onQueryChange: (String) -> Unit]] | دالة بتاخد النص الجديد: الحدث **طالع** لفوق |
| [[onValueChange = onQueryChange]] | بنعدّي الدالة نفسها من غير ما نلفها في [[{ }]]، لأن النوعين واحد [[(String) -> Unit]] |
| [[placeholder = { Text("دوّر...") }]] | نص باهت بيظهر لما الحقل فاضي، ويختفي أول ما تكتب |
| [[singleLine = true]] | سطر واحد، و Enter مش بيعمل سطر جديد |
| [[modifier.fillMaxWidth()]] | الـ modifier اللي جاي من برا، وفوقه عرض كامل |

مفيش [[remember]] ولا [[mutableStateOf]] هنا خالص. ده معنى stateless.

---

## ٢. [[ProductsScreen]]: صاحب الـ state

~~~kotlin
var query by rememberSaveable { mutableStateOf("") }
val shown = all.filter { it.contains(query, ignoreCase = true) }
~~~

- [[query]] متخزن هنا بـ [[rememberSaveable]] (درس remember)، فبيعيش بعد لفة الموبايل.
- [[all.filter { }]]: بيرجّع List جديدة فيها اللي الشرط بتاعه true (درس map و filter).
- [[it.contains(query, ignoreCase = true)]]: الاسم فيه النص ده؟ و [[ignoreCase = true]] يخلي [[mo]] تلاقي [[Mouse]] و [[Monitor]].
- و [[shown]] [[val]] عادي مش state: بيتحسب من جديد في كل recomposition من [[query]].

~~~kotlin
Column(Modifier.padding(16.dp)) {
    SearchBox(query = query, onQueryChange = { query = it })
    Text("$__{shown.size} نتيجة")
    shown.forEach { Text(it) }
}
~~~

- [[SearchBox(query = query, onQueryChange = { query = it })]]: ابعت القيمة، ولما يجيلك نص جديد ([[it]]) حطه في الـ state.
- [[$__{shown.size}]]: عدد العناصر. و [[shown.forEach { Text(it) }]]: سطر لكل نتيجة.

### اللي حصل فعلًا

بـ 5 منتجات، وبعدين كتبنا [[mo]]:

~~~text الناتج
start: [دوّر..., 5 نتيجة, Laptop, Mouse, Keyboard, Monitor, Mousepad]
after typing 'mo': [3 نتيجة, Mouse, Monitor, Mousepad]
~~~

الرحلة: الكتابة → الحقل نادى [[onQueryChange("mo")]] → الشاشة عملت [[query = "mo"]] → recomposition → الحقل اترسم بـ [[mo]] (فالـ placeholder اختفى)، و [[shown]] اتحسبت تاني فطلع 3. ده الـ unidirectional data flow: الـ state نازل والحدث طالع.

---

## ٣. الـ solCode: [[QuantityPicker]]

~~~kotlin
@Composable
fun QuantityPicker(quantity: Int, onQuantityChange: (Int) -> Unit) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        OutlinedButton(onClick = { onQuantityChange((quantity - 1).coerceAtLeast(1)) }) { Text("-") }
        Text("$quantity", Modifier.padding(horizontal = 16.dp))
        OutlinedButton(onClick = { onQuantityChange(quantity + 1) }) { Text("+") }
    }
}
~~~

- نفس الشكل: القيمة [[quantity]] نازلة، و [[onQuantityChange]] طالعة.
- [[(quantity - 1).coerceAtLeast(1)]]: احسب الأقل بواحد، ولو طلع أقل من 1 رجّع 1. يعني الكمية عمرها ما تنزل تحت 1.

و [[CartLine]] صاحب الـ state:

~~~kotlin
var qty by rememberSaveable { mutableIntStateOf(1) }
QuantityPicker(quantity = qty, onQuantityChange = { qty = it })
Text("الإجمالي: $__{qty * unitPrice} ج.م")
~~~

~~~text الناتج
start: [-, 1, +, الإجمالي: 85 ج.م]
after '-': [-, 1, +, الإجمالي: 85 ج.م]
after '+' x2: [-, 3, +, الإجمالي: 255 ج.م]
~~~

[[-]] عند 1 فضلت 1 ([[coerceAtLeast]])، و [[+]] مرتين بقت 3، والإجمالي 3 × 85 = 255.

### وليه ده مريح في الـ Preview؟

جربنا [[QuantityPicker(quantity = 3, onQuantityChange = { })]] لوحده ودوسنا [[+]]:

~~~text الناتج
stateless picker(3) after '+': [-, 3, +]
~~~

فضلت 3، لأن محدش بيغيّر القيمة. يعني الـ composable بيرسم اللي اتبعتله وبس، وده بالظبط اللي محتاجه في Preview أو اختبار: تبعتله أي قيمة وتشوف شكله.

---

## الخلاصة

- stateless composable = قيمة نازلة + lambda طالعة، ومفيش [[remember]] جواه.
- الـ state يتحط في أقرب أب مشترك لكل اللي محتاجينه (هنا [[ProductsScreen]] لأن الحقل والفلترة الاتنين محتاجين [[query]]).
- لو الحقل مش بيكتب: انت ناسي تحدّث الـ state في [[onValueChange]].
- نفس الشكل اللي [[TextField]] نفسه ماشي بيه: [[value]] و [[onValueChange]].`,
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
          teach: R`## الكود ده بيعمل إيه؟

بيعرّف شاشتين كـ «routes» (أنواع Kotlin)، وبيعمل [[NavHost]] يعرض شاشة البداية [[Home]]، ولما اليوزر يختار ملاحظة يروح لـ [[NoteDetails]] ومعاه الـ id، وزرار الرجوع يرجّعه.

> فين اتجرّب: الكود ده مع الـ solCode اتبنى في APK حقيقي بـ [[androidx.navigation:navigation-compose:2.9.8]] ومعاه plugin الـ serialization. واتشغّل على Compose Multiplatform 1.12.1 للـ Desktop بنسخة JetBrains من نفس المكتبة ([[org.jetbrains.androidx.navigation:navigation-compose:2.9.2]]، نفس الـ API) في [[docker run --rm eclipse-temurin:21-jdk]]، باختبار UI headless بيدوس وبيطبع الـ back stack بعد كل خطوة. زرار Back بتاع الموبايل نفسه من الـ docs.

---

## ١. الـ routes

~~~kotlin
@Serializable
object Home
@Serializable
data class NoteDetails(val id: Long)
~~~

- [[@Serializable]]: annotation من kotlinx.serialization. الـ plugin بيولّد كود يحوّل الـ object لنص ويرجّعه، والـ Navigation بيستخدم ده عشان يحفظ الـ route ويقراه.
- [[object Home]]: شاشة مش محتاجة بيانات، فـ object واحد يكفي (درس object).
- [[data class NoteDetails(val id: Long)]]: شاشة محتاجة [[id]]، فكل مرة بتعمل واحد بالـ id بتاعه: [[NoteDetails(2)]].

الـ Navigation بيحوّل الاسم والـ properties لـ route داخلي. ده اللي طبعناه:

~~~text الناتج
start route: l8.Home; stack=[null, l8.Home]
~~~

[[l8.Home]] اسم الكلاس كامل بالـ package. و [[null]] الأولانية هي الـ graph نفسه (الحاوية اللي فيها كل الشاشات)، وبعدها الشاشة الحالية.

---

## ٢. [[rememberNavController]] و [[NavHost]]

~~~kotlin
val navController = rememberNavController()
NavHost(navController = navController, startDestination = Home) {
~~~

| الحتة | معناها |
|---|---|
| [[rememberNavController()]] | بيعمل الـ [[NavHostController]] اللي بيمسك الـ back stack، و [[remember]] عشان ميتعملش من جديد مع كل رسمة |
| [[NavHost(...)]] | المكان اللي الشاشة الحالية بتترسم فيه |
| [[startDestination = Home]] | أول شاشة. بنبعت الـ object نفسه، مش نص |
| [[{ ... }]] | الخريطة: أنهي route يرسم أنهي شاشة |

---

## ٣. [[composable<Home>]]

~~~kotlin
composable<Home> {
    HomeScreen(onOpenNote = { id -> navController.navigate(NoteDetails(id)) })
}
~~~

- [[composable<Home>]]: [[< >]] بتحدد النوع (generic). «لما الـ route يبقى [[Home]] ارسم ده».
- الشاشة بتاخد lambda [[onOpenNote]]، ومتعرفش حاجة عن الـ [[navController]]. الـ NavHost هو اللي بيقرر: [[navController.navigate(NoteDetails(id))]] = حط شاشة جديدة فوق الـ stack.

دوسنا «ملاحظة 2»:

~~~text الناتج
after click 'ملاحظة 2': route=l8.NoteDetails/{id}; stack=[null, l8.Home, l8.NoteDetails/{id}]
~~~

الـ route بقى [[l8.NoteDetails/{id}]]: اسم الكلاس وبعده [[{id}]] مكان القيمة (زي URL). و [[Home]] لسه في الـ stack تحتها، عشان الرجوع.

---

## ٤. [[composable<NoteDetails>]] و [[toRoute]]

~~~kotlin
composable<NoteDetails> { backStackEntry ->
    val route = backStackEntry.toRoute<NoteDetails>()
    NoteDetailsScreen(id = route.id, onBack = { navController.popBackStack() })
}
~~~

- [[backStackEntry]]: الخانة دي في الـ stack، وفيها الـ arguments اللي اتبعتت.
- [[toRoute<NoteDetails>()]]: رجّع الـ arguments [[NoteDetails]] تاني، فتقرا [[route.id]] كـ [[Long]] على طول. الشاشة عرضت «ملاحظة رقم 2».
- [[navController.popBackStack()]]: شيل الشاشة اللي فوق وارجع للي تحتها:

~~~text الناتج
after رجوع: route=l8.Home; stack=[null, l8.Home]
~~~

---

## ٥. نفس الشاشة مرتين و [[launchSingleTop]]

نادينا [[navigate(NoteDetails(1))]] مرتين ورا بعض (زي دوستين سريعتين):

~~~text الناتج
navigate(NoteDetails(1)) twice: stack=[null, l8.Home, l8.NoteDetails/{id}, l8.NoteDetails/{id}]
with launchSingleTop twice: stack=[null, l8.Home, l8.NoteDetails/{id}]
~~~

من غير حاجة اتفتحت نسختين فوق بعض (واليوزر هيحتاج يدوس Back مرتين). مع [[navigate(NoteDetails(id)) { launchSingleTop = true }]] لو نفس الشاشة فوق خلاص، مش بيزوّد واحدة. الـ [[{ }]] بعد [[navigate]] lambda بتظبط خيارات التنقل.

---

## ٦. الـ solCode: شاشة Settings

~~~kotlin
@Serializable
object Settings
...
for (id in 1L..3L) {
    Button(onClick = { onOpenNote(id) }) { Text("ملاحظة $id") }
}
TextButton(onClick = onOpenSettings) { Text("الإعدادات") }
~~~

- [[1L..3L]]: range من 1 لـ 3 كـ [[Long]] ([[L]] = Long)، عشان [[id]] يطلع من نفس نوع [[onOpenNote: (Long) -> Unit]].
- [[onClick = onOpenSettings]]: بنعدّي الدالة على طول لأن النوعين [[() -> Unit]].
- وفي الـ NavHost (التعليق في آخر الـ solCode): [[composable<Settings> { Text("الإعدادات") }]] و [[onOpenSettings = { navController.navigate(Settings) }]].

~~~text الناتج
after الإعدادات: route=l8.Settings
~~~

[[Settings]] object فالـ route اسمه بس، من غير [[{...}]].

> ملحوظة: الـ [[HomeScreen]] في المثال بياخد [[onOpenNote]] بس، وفي الـ solCode بقى بياخد [[onOpenSettings]] كمان، فلازم تعدّل سطر [[composable<Home>]] زي التعليق.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| route من غير بيانات | [[@Serializable object Home]] |
| route ببيانات | [[@Serializable data class NoteDetails(val id: Long)]] |
| روح | [[navController.navigate(NoteDetails(5))]] |
| اقرا البيانات | [[backStackEntry.toRoute<NoteDetails>()]] |
| ارجع | [[navController.popBackStack()]] |
| متكررش نفس الشاشة | [[navigate(...) { launchSingleTop = true }]] |

والشاشات تاخد lambdas، والـ [[navController]] يفضل في الـ NavHost بس.`,
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
          teach: R`## الكود ده بيعمل إيه؟

سلة مشتريات: [[CartViewModel]] ماسك العدد والإجمالي في [[StateFlow]]، و [[CartScreen]] بيعرضهم وفيه زرار «ضيف» وزرار «فضّي». الشاشة بتقرا الـ state وبتبعت أحداث، والـ ViewModel هو اللي بيغيّر.

> فين اتجرّب: الكود كله اتبنى في APK حقيقي (lifecycle 2.10.0). واتشغّل على Compose Multiplatform 1.12.1 للـ Desktop بنسخة JetBrains من نفس المكتبات (lifecycle 2.11.0) في [[docker run --rm eclipse-temurin:21-jdk]]: الـ ViewModel لوحده كـ unit test، والشاشة باختبار UI headless. «اللفة» عملناها بإننا شلنا الشاشة ورجعناها وسبنا الـ [[ViewModelStore]] زي ما هو، وده اللي Android بيعمله مع الـ Activity. اللفة و Terminate على emulator من الـ docs.

---

## ١. الـ UI state

~~~kotlin
data class CartUiState(val count: Int = 0, val total: Double = 0.0)
~~~

كل اللي الشاشة محتاجة تعرضه في object واحد، وكل الخانات [[val]] بقيم افتراضية. فـ [[CartUiState()]] = سلة فاضية. وعشان هو [[data class]] عندك [[copy]] و [[toString]] حلو.

---

## ٢. الـ ViewModel: نسختين من نفس الـ state

~~~kotlin
class CartViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(CartUiState())
    val uiState: StateFlow<CartUiState> = _uiState.asStateFlow()
~~~

| الحتة | معناها |
|---|---|
| [[: ViewModel()]] | بيورث من [[ViewModel]] (من مكتبة lifecycle) |
| [[MutableStateFlow(CartUiState())]] | «قيمة بتتغير مع الوقت» تقدر تكتب فيها، وابتداؤها سلة فاضية |
| [[private val _uiState]] | محدش برا الكلاس يقدر يوصلها. و [[_]] في الأول عرف لاسم النسخة الداخلية |
| [[val uiState: StateFlow<CartUiState>]] | النسخة اللي الشاشة بتشوفها. نوعها [[StateFlow]] (مفيهوش [[value =]]) فالقراية بس |
| [[.asStateFlow()]] | بيلف الـ Mutable في واجهة للقراية بس، فمحدش يعمل cast ويكتب |

---

## ٣. الأحداث: [[update]] و [[value =]]

~~~kotlin
fun addItem(price: Double) {
    _uiState.update { it.copy(count = it.count + 1, total = it.total + price) }
}
fun clear() {
    _uiState.value = CartUiState()
}
~~~

- [[update { }]]: بيديك القيمة الحالية في [[it]]، وانت ترجّع الجديدة. و [[it.copy(count = ...)]] نسخة من الـ data class بخانتين متغيرين والباقي زي ما هو.
- [[value = CartUiState()]]: حط قيمة جديدة على طول، ومش محتاج القديمة.

جربنا الـ ViewModel لوحده من غير أي شاشة:

~~~text الناتج
initial: CartUiState(count=0, total=0.0)
after 3 addItem: CartUiState(count=3, total=150.0)
after clear: CartUiState(count=0, total=0.0)
~~~

وده سبب كبير للـ ViewModel: المنطق بيتختبر بـ unit test عادي.

---

## ٤. الشاشة

~~~kotlin
@Composable
fun CartScreen(viewModel: CartViewModel = viewModel()) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()
~~~

- [[viewModel: CartViewModel = viewModel()]]: الـ parameter اسمه [[viewModel]]، وافتراضيه نداء الدالة [[viewModel()]] (من [[lifecycle-viewmodel-compose]]): دوّر في الـ [[ViewModelStore]] على [[CartViewModel]]، ولو مش موجود اعمله. والنوع بيتعرف من نوع الـ parameter.
- [[collectAsStateWithLifecycle()]]: بيسمع الـ StateFlow ويحوّله لـ Compose state، فكل قيمة جديدة تعمل recomposition. و «WithLifecycle» يعني بيقف لما الشاشة تروح الخلفية.
- [[val state by ...]]: نفس [[by]] بتاعة درس remember، فتكتب [[state.count]] على طول.

~~~kotlin
Text("في السلة: $__{state.count} - الإجمالي: $__{state.total}")
Button(onClick = { viewModel.addItem(50.0) }) { Text("ضيف منتج بـ 50") }
TextButton(onClick = viewModel::clear) { Text("فضّي السلة") }
~~~

- الضغطة بتنادي دالة في الـ ViewModel (حدث طالع)، والـ state الجديد بينزل للـ Text.
- [[viewModel::clear]]: function reference: «الدالة [[clear]] بتاعة الـ object ده» كقيمة، بدل [[{ viewModel.clear() }]].

### «اللفة»: الشاشة اتشالت والـ store فضل

~~~text الناتج
CartViewModel created #695
after 3 clicks: في السلة: 3 - الإجمالي: 150.0
screen removed (store kept)
screen back: في السلة: 3 - الإجمالي: 150.0
onCleared #695
store cleared
CartViewModel created #897
screen back after clear: في السلة: 0 - الإجمالي: 0.0
~~~

- الـ ViewModel اتعمل **مرة واحدة** (#695). لما الشاشة اتشالت ورجعت، [[viewModel()]] لقاه في الـ store فرجّع نفسه، والعدد فضل 3. ده اللي بيحصل في اللفة: الـ Activity بتتعمل من الأول بس الـ store بيعيش.
- لما مسحنا الـ store (اللي بيحصل لما الشاشة تخرج نهائيًا)، اتنادت [[onCleared()]]، والمرة الجاية اتعمل ViewModel جديد (#897) بصفر. (الأرقام دي [[identityHashCode]] عشان نفرّق بين الـ objects.)
- و [[150.0]] مكتوبة بـ [[.0]] لأن [[total]] [[Double]].

---

## ٥. الـ solCode: [[SavedStateHandle]]

~~~kotlin
class CartViewModel(private val savedState: SavedStateHandle) : ViewModel() {
    val count: StateFlow<Int> = savedState.getStateFlow("count", 0)

    fun addItem() {
        savedState["count"] = count.value + 1
    }
}
~~~

- [[SavedStateHandle]]: map (key/value) بيتحفظ مع الـ saved state، فبيعيش حتى لو النظام قتل الـ process.
- [[getStateFlow("count", 0)]]: [[StateFlow]] للمفتاح [[count]]، وافتراضيه 0.
- [[savedState["count"] = ...]]: كتابة بالأقواس المربعة (operator [[set]])، والـ StateFlow بيتحدث لوحده.

~~~text الناتج
SavedStateHandle count=2 keys=[count]
restored handle count=5
~~~

بعد [[addItem()]] مرتين المفتاح [[count]] اتحفظ بـ 2. ولما عملنا handle جديد من map فيها [[count = 5]] (زي ما النظام بيرجّعه بعد process death)، الـ ViewModel بدأ من 5 مش 0.

على Android، [[viewModel()]] بتعرف تعمل ViewModel الـ constructor بتاعه [[SavedStateHandle]] لوحدها (الـ factory الافتراضي بتاع الـ Activity والـ navigation). الكود اتبنى، والسلوك ده من الـ docs.

---

## الخلاصة

- [[private val _uiState = MutableStateFlow(...)]] جوه، و [[val uiState: StateFlow = _uiState.asStateFlow()]] برا.
- غيّر بـ [[update { it.copy(...) }]].
- في الشاشة: [[viewModel()]] و [[collectAsStateWithLifecycle()]].
- الـ ViewModel بيعيش في اللفة، ويموت مع الـ process: اللي لازم يعيش بعدها يتحط في [[SavedStateHandle]] أو DataStore أو Room.`,
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
    }
]);
