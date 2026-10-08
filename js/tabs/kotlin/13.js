// تكملة تاب kotlin: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/kotlin/01.js (شرح حقول الدرس في أوله)
MORE("kotlin", [
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
          teach: R`## الكود بيعمل إيه؟

فيه حاجتين: [[PriceCalculator]] (الكود الحقيقي، مكانه [[src/main]]) و [[PriceCalculatorTest]] (الاختبار، مكانه [[src/test]]). كل دالة عليها [[@Test]] بتنادي الكود بقيمة معينة وتتأكد إن النتيجة هي المتوقعة. لو النتيجة غلط، الاختبار «بيقع» وبيقولك المتوقع كان إيه وطلع إيه.

### اتجرّب فين؟

- الكلاسين زي ما هم، والحل ([[CartViewModelTest]] و [[MainDispatcherRule]] و [[NotesViewModelTest]])، واختبارين زيادة بـ MockK و Turbine، اتشغلوا في مشروع Android حقيقي (AGP 9.4.1 و Kotlin 2.4.20 و JUnit 4.13.2 و kotlinx-coroutines-test 1.10.2 و MockK 1.14.11 و Turbine 1.2.1) بـ [[./gradlew testDebugUnitTest]] جوه image فيها Android SDK 36 و Java 21. كلهم عدّوا.
- وبوّظت الشرط عن قصد عشان نشوف شكل الاختبار الواقع.

---

## ١. الكود اللي هنختبره

~~~kotlin
class PriceCalculator {
    fun finalPrice(price: Double): Double {
        require(price >= 0) { "السعر مينفعش يبقى سالب" }
        return if (price >= 1000) price * 0.9 else price
    }
}
~~~

- [[require(شرط) { رسالة }]]: لو الشرط false بترمي [[IllegalArgumentException]] بالرسالة دي. يعني «المدخل ده غلط».
- [[if (...) a else b]] في Kotlin بترجّع قيمة، فـ [[return if ...]] بيرجّع واحدة من الاتنين.
- [[price * 0.9]]: خصم 10%. يعني 1000 تبقى 900.

الكلاس ده Kotlin عادي، مفيهوش ولا حاجة من Android، وده اللي بيخليه يتختبر على الـ JVM في ثواني.

---

## ٢. كلاس الاختبار

~~~kotlin
class PriceCalculatorTest {
    private val calc = PriceCalculator()
~~~

- الاسم العرف: اسم الكلاس + [[Test]]، ونفس الـ package، بس في [[src/test/java/...]].
- [[calc]] property: JUnit 4 بيعمل **object جديد من كلاس الاختبار لكل [[@Test]]**، فكل اختبار بياخد [[calc]] جديد ومفيش اختبار بيأثر على التاني.
- الـ imports اللي محتاجها: [[org.junit.Test]] و [[org.junit.Assert.assertEquals]].

### الاختبار الأول

~~~kotlin
    @Test
    fun discount_isAppliedAboveThreshold() {
        assertEquals(900.0, calc.finalPrice(1000.0), 0.001)
    }
~~~

- [[@Test]]: JUnit بيدوّر على الدوال اللي عليها الـ annotation دي ويشغّلها.
- الاسم بيوصف **السلوك**: «الخصم بيتطبق فوق الحد». لما يقع، الاسم لوحده بيقولك إيه اللي باظ.
- [[assertEquals(expected, actual, delta)]]: المتوقع الأول ([[900.0]])، بعدين الحقيقي ([[calc.finalPrice(1000.0)]]).
- [[0.001]] اسمه delta: الفرق المسموح. ليه؟ لأن الـ Double مش دقيق في الكسور: [[0.1 + 0.2]] بيطلع [[0.30000000000000004]] مش [[0.3]]. فبنقول «لو الفرق أقل من 0.001 اعتبرهم زي بعض».

### الاختبار التاني

~~~kotlin
    @Test
    fun noDiscount_belowThreshold() {
        assertEquals(500.0, calc.finalPrice(500.0), 0.001)
    }
~~~

تحت الـ 1000: السعر زي ما هو.

### اختبار الـ exception

~~~kotlin
    @Test(expected = IllegalArgumentException::class)
    fun negativePrice_throws() {
        calc.finalPrice(-1.0)
    }
}
~~~

- [[expected = IllegalArgumentException::class]]: الاختبار **ينجح** لو الـ exception ده اترمى، ويقع لو مترماش.
- [[::class]]: الكلاس نفسه كقيمة.
- مفيش assert هنا: الـ [[require]] هي اللي المفروض ترمي.

---

## ٣. التشغيل

~~~bash
./gradlew testDebugUnitTest
~~~

[[./gradlew test]] بيشغّل اختبارات كل الـ variants (debug و release)، و [[testDebugUnitTest]] الـ debug بس (أسرع). التقرير XML في [[app/build/test-results/testDebugUnitTest/]] و HTML في [[app/build/reports/tests/testDebugUnitTest/index.html]]. ده اللي طلع في الـ XML:

~~~text الناتج (TEST-com.sara.notes.PriceCalculatorTest.xml)
<testsuite name="com.sara.notes.PriceCalculatorTest" tests="3" skipped="0" failures="0" errors="0" time="0.004"
<testcase name="negativePrice_throws" time="0.001"/>
<testcase name="noDiscount_belowThreshold" time="0.001"/>
<testcase name="discount_isAppliedAboveThreshold" time="0.0"/>
~~~

٣ اختبارات، صفر وقعوا، في ٤ ملي ثانية. ده اللي نقصده بـ «سريعة».

### لما الكود يبوظ

غيّرت [[>= 1000]] لـ [[> 1000]]:

~~~text الناتج
PriceCalculatorTest > discount_isAppliedAboveThreshold FAILED
    java.lang.AssertionError at PriceCalculatorTest.kt:10

java.lang.AssertionError: expected:<900.0> but was:<1000.0>
~~~

- اسم الاختبار بيقولك المشكلة: الخصم مش بيتطبق عند الحد.
- [[expected:<900.0> but was:<1000.0>]]: لو كنت كتبت [[assertEquals(actual, expected)]] بالعكس، كانت الرسالة هتقول «expected 1000» وتلخبطك.
- [[PriceCalculatorTest.kt:10]]: رقم السطر في الاختبار.

---

## ٤. الحل: اختبار ViewModel

~~~kotlin
    @Test
    fun addItem_updatesCountAndTotal() {
        val vm = CartViewModel()
        vm.addItem(50.0)
        vm.addItem(25.0)
        val state = vm.uiState.value
        assertEquals(2, state.count)
        assertEquals(75.0, state.total, 0.001)
    }
~~~

الـ ٣ خطوات: **Arrange** ([[CartViewModel()]])، **Act** ([[addItem]] مرتين)، **Assert** (العدد 2 والإجمالي 75). و [[uiState.value]]: القيمة الحالية في الـ StateFlow. عدّى في 0.1 ثانية. الـ [[CartViewModel]] ده مفيهوش coroutines ([[update]] على الـ StateFlow متزامنة)، فمش محتاج حاجة زيادة.

### الـ ViewModel اللي فيه [[viewModelScope]]

[[viewModelScope.launch]] بيشتغل على [[Dispatchers.Main]] (الـ UI thread بتاع Android). وفي الـ JVM مفيش Android ولا main thread، فلازم تبدّله:

~~~kotlin
class MainDispatcherRule(
    private val dispatcher: TestDispatcher = UnconfinedTestDispatcher()
) : TestWatcher() {
    override fun starting(description: Description) = Dispatchers.setMain(dispatcher)
    override fun finished(description: Description) = Dispatchers.resetMain()
}
~~~

- [[TestWatcher]]: كلاس من JUnit بيدّيك دوال بتتنادى قبل كل اختبار ([[starting]]) وبعده ([[finished]]).
- [[Dispatchers.setMain(...)]]: من الآن، [[Dispatchers.Main]] = الـ dispatcher ده. و [[resetMain()]] ترجّعه.
- [[UnconfinedTestDispatcher()]]: بيشغّل الـ coroutine **فورًا** في نفس الـ thread، فبعد [[launch]] على طول الكود اللي جواه يكون اتنفذ.

~~~kotlin
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
}
~~~

- [[@get:Rule]]: JUnit بيدوّر على الـ rules على الـ getter، و Kotlin بيحط الـ annotation على الـ field افتراضيًا، فـ [[get:]] بتقوله «حطها على الـ getter».
- [[= runTest { }]]: الاختبار كله جوه [[runTest]]، فتقدر تنادي suspend functions، والـ [[delay]] بيتخطى من غير ما يستنى.
- [[FakeNotesRepository]]: repository وهمي بلستة في الذاكرة. وعشان ده يشتغل، الـ ViewModel لازم ياخد **interface** ([[NotesRepository]]) والـ fake يعملها implement. ده الشكل اللي جربته:

~~~kotlin
class FakeNotesRepository : NotesRepository {
    val added = mutableListOf<String>()
    override val notes = MutableStateFlow<List<String>>(emptyList())
    override suspend fun add(title: String) {
        added += title
        notes.value = notes.value + title
    }
}
~~~

[[blankTitle_isIgnored]] عدّى: [[onAddClicked("   ")]] منادتش [[add]] خالص.

### زيادة: MockK و Turbine

نفس الاختبار بـ mock بدل fake، و Flow بـ Turbine (الاتنين عدّوا):

~~~kotlin
val repo = mockk<NotesRepository>(relaxed = true)
every { repo.notes } returns flowOf(emptyList())
NotesViewModel(repo).onAddClicked("  اشتري لبن ")
coVerify(exactly = 1) { repo.add("اشتري لبن") }
~~~

- [[mockk<T>(relaxed = true)]]: object وهمي، و [[relaxed]] يعني أي دالة متتعرّفش بترجّع قيمة فاضية بدل ما ترمي.
- [[every { } returns x]]: لما حد يطلب [[repo.notes]] رجّع x.
- [[coVerify(exactly = 1) { }]]: اتأكد إن الـ suspend fun دي اتنادت مرة واحدة بالقيمة دي (بعد [[trim()]]).

~~~kotlin
vm.notes.test {
    assertEquals(emptyList<String>(), awaitItem())
    vm.onAddClicked("ذاكر Kotlin")
    assertEquals(listOf("ذاكر Kotlin"), awaitItem())
}
~~~

[[test { }]] من Turbine بتسمع للـ Flow، و [[awaitItem()]] بتستنى القيمة الجاية. لو جت قيمة زيادة متوقعتهاش، الاختبار بيقع في الآخر.

---

## ٥. ليه المنطق ميتكتبش بـ Android

شغّلت ViewModel فيه [[Log.d(...)]] في unit test عادي:

~~~text الناتج
java.lang.RuntimeException: Method d in android.util.Log not mocked. See https://developer.android.com/r/studio-ui/build/not-mocked for details.
~~~

الـ [[android.jar]] اللي الـ unit tests بتشوفه فيه أسماء الدوال بس من غير تنفيذ. عشان كده المنطق يتكتب Kotlin عادي، أو تستخدم Robolectric (في الدرس الجاي).

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[src/test/]] | unit tests على الـ JVM، من غير موبايل |
| [[@Test]] | دالة اختبار، وكل اختبار object جديد |
| [[assertEquals(expected, actual, delta)]] | المتوقع الأول، و delta للـ Double |
| [[@Test(expected = X::class)]] | ينجح لو X اترمى |
| [[runTest { }]] | لـ suspend و coroutines، والـ delay بيتخطى |
| [[MainDispatcherRule]] | بيبدّل [[Dispatchers.Main]] للـ ViewModels |
| fake / [[mockk]] / Turbine | repository وهمي، و mock، واختبار Flow |
| [[./gradlew testDebugUnitTest]] | التشغيل، والتقرير في [[app/build/reports/tests/]] |`,
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
          teach: R`## الكود بيعمل إيه؟

بيعرض الـ [[Counter]] (من درس remember و state) لوحده، وبيعمل اللي اليوزر بيعمله: يدوّر على نص على الشاشة، يدوس على زرار، يكتب في حقل، وبعدين يتأكد إن الشاشة اتغيرت صح.

### اتجرّب فين؟

- مفيش emulator ولا موبايل هنا، فـ [[./gradlew connectedAndroidTest]] من الـ docs.
- بدل كده شغّلت **نفس الاختبارات بالحرف** على الـ JVM بـ **Robolectric 4.17** (Android وهمي بيشتغل جوه الـ JVM): حطيتهم في [[src/test]] وزوّدت [[@RunWith(RobolectricTestRunner::class)]] فوق الكلاس، وشغّلت [[./gradlew testDebugUnitTest]] في مشروع Android حقيقي (AGP 9.4.1 و Compose BOM 2026.06.01 و Java 21). اختبارين الـ Counter و ٣ اختبارات الحل عدّوا كلهم.
- مع Robolectric و SDK 36 على Java 21 احتجت أزوّد للـ test JVM: [[--add-exports=java.base/jdk.internal.access=ALL-UNNAMED]]، وإلا كل اختبار بيقع بـ [[Failed to interact with raw FileDescriptor internals]].

---

## ١. الـ rule

~~~kotlin
class CounterScreenTest {
    @get:Rule
    val composeRule = createComposeRule()
~~~

- [[createComposeRule()]]: بتجهّز Activity فاضية تعرض فيها الـ composable، وبتديك أدوات الدوّارة والأفعال. محتاجة مكتبة [[androidx.compose.ui:ui-test-junit4]]، و [[ui-test-manifest]] في [[debugImplementation]] (فيها الـ Activity الفاضية في الـ manifest).
- [[@get:Rule]]: JUnit بيقرا الـ rules من الـ getter، فـ [[get:]] بتحط الـ annotation هناك.
- الـ rule بيستنى لوحده لحد ما Compose يخلّص أي recomposition أو animation قبل كل سطر، فمفيش [[Thread.sleep]].

---

## ٢. الاختبار الأول: الزرار

~~~kotlin
    @Test
    fun clickingButton_incrementsCounter() {
        composeRule.setContent { Counter() }
~~~

[[setContent { }]]: اعرض الـ composable ده بس، من غير باقي التطبيق.

قبل ما نكمل: الاختبار بيدوّر في إيه؟ Compose بيعمل **semantics tree**: شجرة فيها النصوص والأدوار والأفعال لكل عنصر. طبعتها بـ [[composeRule.onRoot().printToString()]] للـ Counter، وده الناتج (مختصر):

~~~text الناتج
Node #1 at (l=0.0, t=0.0, r=312.0, b=211.0)px
 |-Node #3 at (l=16.0, t=16.0, r=24.0, b=51.0)px
 | Text = '[العدد: 0]'
 |-Node #4 at (l=16.0, t=59.0, r=74.0, b=111.0)px
 | Role = 'Button'
 | Text = '[زوّد]'
 | Actions = [..., OnClick, RequestFocus, ...]
 | MergeDescendants = 'true'
 |-Node #7 at (l=16.0, t=119.0, r=296.0, b=195.0)px
   EditableText = ''
   IsEditable = 'true'
   Text = '[اسمك]'
   Actions = [..., OnClick, ..., SetText, ...]
   MergeDescendants = 'true'
~~~

- كل [[Node]] عنصر، ومعاه مكانه بالـ pixels ([[l]] شمال، [[t]] فوق، [[r]] يمين، [[b]] تحت).
- الزرار [[Role = 'Button']] وجواه النص [[زوّد]]. [[MergeDescendants = 'true']] يعني الـ Text اللي جوه الزرار اتدمج فيه، فلما تدوّر على «زوّد» بتلاقي الزرار نفسه (اللي عنده [[OnClick]]).
- الـ TextField عنده [[Text = '[اسمك]']] (الـ label اتدمج فيه) و [[SetText]].

~~~kotlin
        composeRule.onNodeWithText("العدد: 0").assertIsDisplayed()
~~~

- [[onNodeWithText("...")]]: دوّر على عنصر **واحد** نصه كده بالظبط.
- [[assertIsDisplayed()]]: اتأكد إنه ظاهر على الشاشة.

~~~kotlin
        composeRule.onNodeWithText("زوّد").performClick()
        composeRule.onNodeWithText("العدد: 1").assertIsDisplayed()
    }
~~~

[[performClick()]] بيدوس، والـ rule بيستنى الـ recomposition، وبعدين النص بقى [[العدد: 1]]. عدّى.

### لو التأكيد غلط

جربت [[onNodeWithText("العدد: 5").assertIsDisplayed()]]:

~~~text الناتج
java.lang.AssertionError: Assert failed: The component with Text + InputText + EditableText contains 'العدد: 5' (ignoreCase: false) is not displayed!
~~~

الرسالة بتقولك بيدوّر على إيه بالظبط. أول حاجة تعملها ساعتها: اطبع الشجرة اللي فوق وشوف النص الحقيقي.

---

## ٣. الاختبار التاني: الكتابة

~~~kotlin
    @Test
    fun typingName_showsGreeting() {
        composeRule.setContent { Counter() }
        composeRule.onNodeWithText("أهلًا يا Sara").assertDoesNotExist()
~~~

- كل [[@Test]] بيبدأ بشاشة جديدة، فلازم [[setContent]] تاني.
- [[assertDoesNotExist()]]: العنصر مش في الشجرة خالص (الـ [[if (name.isNotBlank())]] لسه false).

~~~kotlin
        composeRule.onNodeWithText("اسمك").performTextInput("Sara")
        composeRule.onNodeWithText("أهلًا يا Sara").assertIsDisplayed()
    }
}
~~~

- [[onNodeWithText("اسمك")]]: بيلاقي الـ TextField عن طريق الـ label (Node #7 فوق).
- [[performTextInput("Sara")]]: بيكتب النص (عن طريق الـ [[SetText]] / [[InsertTextAtCursor]] اللي في Actions)، فـ [[onValueChange]] بتتنادى والـ state يتغير.
- بعدها الترحيب ظهر. عدّى.

---

## ٤. الحل: شاشة stateless

~~~kotlin
@Composable
fun PostsContent(state: PostsUiState, onRetry: () -> Unit) {
    when (state) {
        PostsUiState.Loading -> CircularProgressIndicator(Modifier.testTag("loading"))
        is PostsUiState.Error -> Button(onClick = onRetry) { Text(state.message) }
        is PostsUiState.Success -> LazyColumn { items(state.posts, key = { it.id }) { Text(it.title) } }
    }
}
~~~

- بتاخد الـ state والـ lambda من برا، فالاختبار يديها أي حالة على طول من غير ViewModel ولا شبكة.
- [[Modifier.testTag("loading")]]: الـ spinner مفيهوش نص، فبنديله اسم للاختبار بس.
- [[is PostsUiState.Error]]: [[is]] بتشيك النوع وبتعمل smart cast، فـ [[state.message]] متاحة.

~~~kotlin
    @Test
    fun loading_showsSpinner() {
        composeRule.setContent { PostsContent(PostsUiState.Loading, onRetry = { }) }
        composeRule.onNodeWithTag("loading").assertIsDisplayed()
    }
~~~

[[onNodeWithTag]] بيدوّر بالـ testTag. و [[onRetry = { }]] lambda فاضية لأننا مش محتاجينها هنا.

~~~kotlin
    @Test
    fun error_clickRetry_callsCallback() {
        var retries = 0
        composeRule.setContent { PostsContent(PostsUiState.Error("مفيش نت"), onRetry = { retries++ }) }
        composeRule.onNodeWithText("مفيش نت").performClick()
        assertEquals(1, retries)
    }
~~~

[[var retries = 0]] عدّاد في الاختبار نفسه، والـ lambda بتزوّده. بعد الضغطة [[retries]] بقى 1، يعني الزرار متوصّل بـ [[onRetry]] فعلًا.

~~~kotlin
        val posts = listOf(Post(1, "أول بوست", ""), Post(2, "تاني بوست", ""))
        composeRule.setContent { PostsContent(PostsUiState.Success(posts), onRetry = { }) }
        composeRule.onNodeWithText("تاني بوست").assertIsDisplayed()
~~~

لستة ثابتة، ونتأكد إن العنوان ظاهر.

### الوقت

~~~text الناتج (من تقارير الـ XML)
clickingButton_incrementsCounter   30.303s
typingName_showsGreeting            1.298s
loading_showsSpinner                0.443s
error_clickRetry_callsCallback      0.23s
success_showsTitles                 0.242s
~~~

أول اختبار Robolectric بياخد وقت عشان بيحمّل Android الوهمي، والباقي أقل من ثانية. وعلى emulator (من الـ docs) أبطأ لأنه بيبني APK للاختبار ويسطّبه الأول.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[createComposeRule()]] + [[@get:Rule]] | تجهّز Compose للاختبار |
| [[setContent { }]] | تعرض composable لوحده |
| [[onNodeWithText]] / [[onNodeWithTag]] | تدوّر في الـ semantics tree |
| [[performClick()]] / [[performTextInput()]] | تعمل زي اليوزر |
| [[assertIsDisplayed()]] / [[assertDoesNotExist()]] | تتأكد |
| [[onRoot().printToString()]] أو [[printToLog]] | تشوف الشجرة لما متلاقيش عنصر |
| [[src/androidTest]] + [[connectedAndroidTest]] | على موبايل (أو [[src/test]] + Robolectric على الـ JVM) |`,
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
          teach: R`## الكود بيعمل إيه؟

ViewModel بيكتب ٣ رسايل في الـ log: واحدة لما الـ refresh يبدأ، وواحدة لما يخلص بعدد الملاحظات، وواحدة لو وقع ومعاها الـ exception كله. والرسايل دي بتشوفها في Logcat وانت بتجرّب.

### اتجرّب فين؟

- الكلاس زي ما هو اتترجم في مشروع Android حقيقي (AGP 9.4.1 و Kotlin 2.4.20)، و [[repo]] repository وهمي بيرجّع 3، وواحد تاني بيرمي [[UnknownHostException]] (زي ما بيحصل لما النت مقفول).
- مفيش موبايل، فشغّلته في unit test بـ **Robolectric** (Android وهمي على الـ JVM)، و Robolectric بيطبع اللوجات بنفس شكل [[adb logcat]] لما تقوله [[ShadowLog.stream = System.out]]. الناتج تحت حقيقي.
- Logcat في Android Studio والـ debugger و Layout Inspector و App Inspection: من الـ docs.

---

## ١. الـ TAG

~~~kotlin
private const val TAG = "NotesVM"
~~~

- [[TAG]]: اسم قصير بيتكتب جنب كل رسالة، وبيه بتفلتر Logcat ([[tag:NotesVM]]).
- [[const val]]: ثابت وقت الترجمة (نص أو رقم بس). و [[private]] برا الكلاس = الملف ده بس يشوفه.
- العرف: اسم الكلاس أو اختصاره، وأقل من 23 حرف (Android قديم كان بيرفض أطول من كده).

---

## ٢. الرسايل

~~~kotlin
class NotesViewModel(private val repo: NotesRepository) : ViewModel() {
    fun refresh() {
        Log.d(TAG, "refresh بدأ")
~~~

[[Log]] كلاس في [[android.util]]، والحرف بعد النقطة هو المستوى:

| الدالة | المستوى | الحرف في Logcat | امتى |
|---|---|---|---|
| [[Log.v]] | verbose | V | تفاصيل كتير جدًا |
| [[Log.d]] | debug | D | وانت بتطوّر |
| [[Log.i]] | info | I | حدث مهم عادي |
| [[Log.w]] | warning | W | حاجة غريبة بس مكمّلين |
| [[Log.e]] | error | E | حاجة فشلت |

~~~kotlin
        viewModelScope.launch {
            try {
                val count = repo.refresh()
                Log.i(TAG, "refresh خلص: $count ملاحظة")
~~~

[[$count]] string template: القيمة بتتحط جوه النص.

~~~kotlin
            } catch (e: IOException) {
                Log.e(TAG, "refresh وقع", e)
            }
~~~

النسخة اللي بـ ٣ parameters: التالت [[Throwable]]، و Log بيطبع نوعه ورسالته والـ stack trace كله تحت رسالتك. و [[UnknownHostException]] نوع من [[IOException]]، فالـ catch بيمسكه.

### الناتج

~~~text الناتج (Robolectric، repository بيرجّع 3 وبعدين repository من غير نت)
D/NotesVM: refresh بدأ
I/NotesVM: refresh خلص: 3 ملاحظة
D/NotesVM: refresh بدأ
E/NotesVM: refresh وقع
java.net.UnknownHostException: Unable to resolve host "api.example.com": No address associated with hostname
    at com.sara.notes.FakeOffline.refresh(LogTests.kt:14)
    at com.sara.notes.logs.NotesViewModel$refresh$1.invokeSuspend(Logs.kt:17)
    at kotlin.coroutines.jvm.internal.BaseContinuationImpl.resumeWith(ContinuationImpl.kt:34)
    at kotlinx.coroutines.internal.DispatchedContinuationKt.resumeCancellableWith(DispatchedContinuation.kt:375)
    ...
~~~

الشكل [[مستوى/TAG: الرسالة]]. و Logcat في Android Studio بيزوّد قبلها الوقت والـ PID (رقم الـ process) واسم الـ package (من الـ docs).

---

## ٣. تقرا الـ stack trace إزاي

خد السطور اللي فوق واحد واحد:

1. [[java.net.UnknownHostException]]: نوع الـ exception. و [[Unable to resolve host "api.example.com"]]: الموبايل معرفش يحوّل اسم السيرفر لـ IP، يعني غالبًا مفيش نت.
2. [[at com.sara.notes.FakeOffline.refresh(LogTests.kt:14)]]: أول سطر = آخر دالة كانت شغالة، والملف ورقم السطر بين الأقواس. ده المكان اللي الـ exception اترمى منه.
3. [[at com.sara.notes.logs.NotesViewModel$refresh$1.invokeSuspend(Logs.kt:17)]]: مين نادى عليها. [[$refresh$1]] هو الـ lambda اللي جوه [[launch]] في دالة [[refresh]]، و [[invokeSuspend]] اسم الدالة اللي Kotlin بيولّدها للـ coroutine. و [[Logs.kt:17]] هو سطر [[val count = repo.refresh()]].
4. السطور اللي بعدها [[kotlin.coroutines]] و [[kotlinx.coroutines]]: مكتبات، مش كودك.

القاعدة: نزّل لحد **أول سطر فيه الـ package بتاعك** ([[com.sara.notes]]). ولو تحت فيه [[Caused by:]] (exception جوه exception)، روح للأخير: ده السبب الأصلي.

وفي crash حقيقي Logcat بيكتب فوق ده سطر [[FATAL EXCEPTION: main]] واسم الـ process (من الـ docs).

---

## ٤. ليه [[Log]] مينفعش في unit test عادي

نفس الـ ViewModel في JUnit من غير Robolectric:

~~~text الناتج
java.lang.RuntimeException: Method d in android.util.Log not mocked. See https://developer.android.com/r/studio-ui/build/not-mocked for details.
~~~

الـ unit tests بتشوف [[android.jar]] فاضي (أسماء الدوال بس). فاللي فيه [[Log]] يا إما Robolectric، يا إما مكتبة زي Timber، يا إما المنطق يتفصل عن الـ logging.

---

## ٥. الفلتر في Logcat و adb

| تكتب | يعني |
|---|---|
| [[package:mine]] | تطبيقك بس |
| [[tag:NotesVM]] | الـ TAG ده |
| [[level:error]] | E وطالع |
| [[package:mine level:warn]] | الاتنين مع بعض |
| [[adb logcat -s NotesVM]] | من الترمنال: tag واحد ([[-s]] = silent لكل الباقي) |
| [[adb logcat *:E]] | كل الـ tags ([[*]])، errors بس |
| [[adb logcat -c]] | فضّي الـ buffer |

([[adb]] = Android Debug Bridge، أداة الـ SDK اللي بتكلم الموبايل. الأوامر دي من الـ docs.)

---

## ٦. الأدوات التانية (من الـ docs)

- **breakpoint**: دوس جنب رقم السطر (نقطة حمرا)، وشغّل بـ Debug (أيقونة الحشرة). لما يوصل للسطر بيقف، وتاب Variables بيوريك [[this]] و [[count]] وكل حاجة. F8 = السطر الجاي (Step Over)، و F7 = ادخل جوه الدالة (Step Into).
- **Layout Inspector**: شجرة الـ UI وهي شغالة، والمقاسات، وعداد الـ recompositions لكل composable.
- **App Inspection**: Database Inspector (جداول Room) و Network Inspector.

---

## الخلاصة

| الأداة | امتى |
|---|---|
| [[Log.d/i/w/e(TAG, msg)]] | تتابع اللي بيحصل، خصوصًا التوقيت والـ coroutines |
| [[Log.e(TAG, msg, e)]] | تطبع الـ exception بالـ stack trace |
| الـ stack trace | أول سطر فيه الـ package بتاعك، و [[Caused by]] في الآخر |
| breakpoint | عايز تشوف قيم المتغيرات |
| Layout Inspector | مشاكل الشكل والـ recomposition |

- متكتبش توكنات ولا بيانات شخصية في الـ log: بتفضل في الـ release.`,
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
          teach: R`## الكود بيعمل إيه؟

لستة منتجات مترتبة بالسعر، ولما اليوزر ينزل أكتر من ٥ عناصر يظهر زرار صغير «↑» يرجّعه لأول اللستة. وفيه ٣ تحسينات صغيرة: [[derivedStateOf]] عشان الشاشة متترسمش مع كل scroll، و [[remember(products)]] عشان الترتيب ميتحسبش كل مرة، و [[key]] في اللستة.

### اتجرّب فين؟

- الكود زي ما هو اتترجم في مشروع Android حقيقي (AGP 9.4.1 و Kotlin 2.4.20 و Compose BOM 2026.06.01).
- مفيش موبايل ولا Layout Inspector، فعملت قياس بديل: نسختين من نفس الفكرة (مع وبدون [[derivedStateOf]]) جوه اختبار Compose بـ Robolectric على الـ JVM، وعدّيت كام مرة الـ composable اتعمله recomposition وأنا بعمل scroll عنصر عنصر ٢٠ مرة. الأرقام تحت حقيقية.
- وبنيت الـ debug والـ release وقارنت الحجم. نعومة الـ scroll على موبايل و Profiler و Macrobenchmark: من الـ docs.

---

## ١. حالة الـ scroll

~~~kotlin
@Composable
fun ProductsList(products: List<Product>, modifier: Modifier = Modifier) {
    val listState = rememberLazyListState()
    val scope = rememberCoroutineScope()
~~~

- [[modifier: Modifier = Modifier]]: العرف في Compose: كل composable بياخد modifier من اللي بيناديه، والقيمة الافتراضية [[Modifier]] الفاضي.
- [[rememberLazyListState()]]: object فيه مكان الـ scroll. أهم حاجة فيه [[firstVisibleItemIndex]]: رقم أول عنصر ظاهر فوق. وبيتغير **مع كل عنصر بيعدّي**.
- [[rememberCoroutineScope()]]: scope مربوط بالـ composable، عشان نبدأ coroutine من جوه [[onClick]] (الـ scroll animation دالة suspend).

---

## ٢. [[derivedStateOf]]: القلب

~~~kotlin
    val showScrollToTop by remember {
        derivedStateOf { listState.firstVisibleItemIndex > 5 }
    }
~~~

من جوه لبرة:

1. [[listState.firstVisibleItemIndex > 5]]: Boolean. لو اليوزر نزل من 0 لـ 20، الرقم بيتغير ٢٠ مرة، بس الـ Boolean بيتغير **مرة واحدة** (لما يعدّي الـ 5).
2. [[derivedStateOf { }]]: state جديد محسوب من states تانية. بيعيد الحساب كل ما [[firstVisibleItemIndex]] يتغير، بس **مبيبلّغش** اللي بيقراه إلا لما النتيجة نفسها تتغير.
3. [[remember { }]]: عشان الـ derivedStateOf نفسه يتعمل مرة واحدة، مش object جديد مع كل recomposition.
4. [[by]]: نقرا [[showScrollToTop]] كـ Boolean على طول بدل [[.value]].

### القياس

نفس الشاشة مرتين، وفيها [[SideEffect { compositions++ }]] (بيتنفذ بعد كل composition ناجح)، وعملت [[scrollToItem(i)]] من 1 لـ 20:

~~~text الناتج
بدون derivedStateOf: 21 composition
مع derivedStateOf: 2 composition
~~~

- **21** = مرة أول ما الشاشة اترسمت + 20 مرة، واحدة مع كل عنصر. لأن الـ composable كان بيقرا [[firstVisibleItemIndex]] مباشرة، فأي تغيير فيه = recomposition للشاشة كلها.
- **2** = مرة في الأول + مرة لما العنصر بقى 6 والـ Boolean بقى true. الـ 18 scroll التانيين محدش اتبلّغ بيهم.

ومتحطوش في كل حتة: لو النتيجة بتتغير بنفس سرعة الـ input (زي [["$__{first} $__{last}"]])، derivedStateOf مش هيوفّر حاجة وهو نفسه ليه تكلفة.

---

## ٣. [[remember(products)]]: متحسبش كل مرة

~~~kotlin
    val sorted = remember(products) { products.sortedBy { it.price } }
~~~

- [[sortedBy { it.price }]]: لستة جديدة مترتبة بالسعر من الأصغر. بتعدي على اللستة كلها كل مرة تتنادى.
- [[remember(products) { }]]: احسب مرة واحفظ النتيجة، ومتحسبش تاني إلا لو [[products]] اتغيرت (الـ parameter اسمه key). من غيرها، كل recomposition (حتى بسبب حاجة ملهاش علاقة) = ترتيب من جديد.

---

## ٤. اللستة و [[key]]

~~~kotlin
    Box(modifier) {
        LazyColumn(state = listState) {
            items(sorted, key = { it.id }) { product ->
                Text("$__{product.title}: $__{product.price}", Modifier.padding(16.dp))
            }
        }
~~~

- [[Box]]: العناصر فوق بعض، فالزرار يبقى فوق اللستة.
- [[state = listState]]: نفس الـ state اللي بنقرا منه فوق.
- [[key = { it.id }]]: كل عنصر ليه هوية ثابتة. لو الترتيب اتغير أو عنصر اتمسح، Compose يعرف مين هو مين ويحرّكهم بدل ما يعيد رسم كله (درس LazyColumn).

---

## ٥. الزرار

~~~kotlin
        if (showScrollToTop) {
            SmallFloatingActionButton(
                onClick = { scope.launch { listState.animateScrollToItem(0) } },
                modifier = Modifier.align(Alignment.BottomEnd).padding(16.dp)
            ) { Text("↑") }
        }
    }
}
~~~

- [[if (showScrollToTop)]]: هنا بنقرا الـ Boolean، وده اللي بيعمل الـ recomposition مرتين بس.
- [[scope.launch { listState.animateScrollToItem(0) }]]: [[animateScrollToItem]] suspend (بتاخد وقت الحركة)، فلازم coroutine.
- [[Modifier.align(Alignment.BottomEnd)]]: الركن تحت في آخر السطر (يمين في الإنجليزي، شمال في العربي RTL). [[align]] متاحة بس جوه [[Box]].

---

## ٦. debug ولا release؟

بنيت نفس المشروع بالطريقتين:

~~~text الناتج
app-debug.apk                       12,750,406 byte  (12.2 MB)
app-release.apk (من غير R8)          9,181,769 byte  (8.8 MB)
app-release.apk (R8 + shrinkResources) 992,154 byte  (0.95 MB)
~~~

- الـ debug فيه الكود كله من غير تحسين، وفيه معلومات debugging، و ART بيشغّله بشكل أبطأ عشان الـ debugger. فقياس الأداء عليه بيكدب.
- الـ release بـ R8 (الكود اتقلّص من [[classes.dex]] و [[classes2.dex]] حجمهم مع بعض حوالي 23 ميجا قبل الضغط لملف واحد 1.4 ميجا).

وجوه الـ release APK لقيت:

~~~text الناتج
assets/dexopt/baseline.prof    4177 byte
~~~

ده **Baseline Profile**: مكتبات Compose نفسها جاية بـ profile جاهز، و AGP بيحطه في التطبيق. لما التطبيق يتسطّب، Android بيترجم الكود اللي في القايمة دي مقدمًا (AOT)، بدل ما يستنى الـ JIT يكتشفه وانت بتستخدمه. وتقدر تعمل profile لكودك انت بمكتبة Macrobenchmark (من الـ docs).

---

## الخلاصة

| الحاجة | بتحل إيه | الرقم هنا |
|---|---|---|
| [[derivedStateOf]] | state بيتغير كتير ونتيجته بتتغير قليل | 21 ← 2 composition |
| [[remember(key) { }]] | حساب تقيل في كل recomposition | |
| [[key = { it.id }]] | اللستة تعرف كل عنصر | |
| release + R8 | الـ debug مش مقياس | 12.2 ميجا ← 0.95 ميجا |
| Baseline Profile | أول فتح والـ scroll | [[baseline.prof]] جوه الـ APK |

- قيس الأول (Layout Inspector و Profiler)، وبعدين حسّن.`,
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
    }
]);
