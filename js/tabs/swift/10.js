// تكملة تاب swift: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/swift/01.js (شرح حقول الدرس في أوله)
MORE("swift", [
    {
      t: "الاختبارات والـ debugging",
      l: 3,
      n: "Swift Testing بـ @Test و #expect، و XCTest القديم، والـ breakpoints و LLDB، و Instruments و Memory Graph",
      items: [
        {
          cmd: "Swift Testing",
          title: "تكتب unit tests بـ Swift Testing: @Test و #expect و #require والـ arguments، وإيه الفرق عن XCTest",
          desc: R`Swift Testing هو framework الاختبارات الجديد من Apple (من Xcode 16 و Swift 6، وشغال على Linux و Windows كمان). بيحل محل XCTest في الـ unit tests الجديدة، والاتنين ممكن يعيشوا في نفس المشروع.

الأساسيات:
• [[import Testing]] و [[@testable import MyApp]] (الـ [[@testable]] بيفتحلك الحاجات اللي [[internal]] في التطبيق).
• [[@Test func something() { }]]: اختبار. ممكن يبقى [[async]] و [[throws]]، وممكن جوه struct (الـ struct بيبقى suite، وبيتعمل من جديد لكل test، فمفيش state بتتسرب بين الاختبارات).
• [[@Test("وصف بالعربي")]]: اسم يظهر في التقرير.
• [[#expect(a == b)]]: لو غلط بيسجل فشل ويكمّل. والرسالة بتوريك القيم الحقيقية: [[(applyDiscount(...) → 150.0) == 160]].
• [[try #require(x)]]: لو فشل بيوقف الاختبار ده. ومع optional بيفكه: [[let first = try #require(items.first)]].
• [[#expect(throws: SomeError.x) { try f() }]]: بيتأكد إن الكود رمى الخطأ ده.
• [[@Test(arguments: [...])]]: نفس الاختبار على قيم كتير، وكل قيمة بتظهر لوحدها في التقرير.
• [[@Suite]] و tags و [[.disabled("سبب")]] للتنظيم.

XCTest (القديم، وهتلاقيه في كل مشروع موجود): [[final class PriceTests: XCTestCase]]، وكل method اسمها لازم يبدأ بـ [[test]]، و [[XCTAssertEqual(a, b)]] و [[XCTAssertTrue]] و [[XCTAssertThrowsError]] و [[XCTUnwrap]]. ولسه هو الوحيد للـ UI tests ([[XCUIApplication]]) واختبارات الأداء.

التشغيل: في Xcode [[Cmd+U]]، أو الماسة جنب الاختبار. ومن الترمنال [[swift test]] للـ packages، أو [[xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 16']] للتطبيقات (حط اسم أي simulator موجود عندك).

إيه اللي تختبره؟ الـ logic: الحسابات، والـ validation، والـ view models (بـ fake services)، وفك الـ JSON. مش لازم تختبر إن [[Text]] بيعرض نص.`,
          example: R`import Testing
@testable import PriceKit

struct PriceTests {
  @Test func discountReducesPrice() {
    #expect(applyDiscount(200, percent: 25) == 150)
  }
  @Test("خصم أكبر من 100% بيرمي error")
  func invalidPercentThrows() {
    #expect(throws: PriceError.invalidPercent(150)) {
      try checkedDiscount(100, percent: 150)
    }
  }
  @Test(arguments: [(100.0, 10.0, 90.0), (50, 50, 25), (80, 0, 80)])
  func manyDiscounts(price: Double, percent: Double, expected: Double) {
    #expect(applyDiscount(price, percent: percent) == expected)
  }
  @Test func bucketsAreSorted() throws {
    let buckets = priceBuckets([30, 10, 20])
    let first = try #require(buckets.first)
    #expect(first == [10, 20])
  }
}`,
          try: R`في الـ package بتاع درس SPM حط الملف ده في [[Tests/PriceKitTests/PriceTests.swift]] وشغّل [[swift test]]. وبعدين غيّر [[== 150]] لـ [[== 160]] واقرا رسالة الفشل. وأخيرًا اكتب test للـ [[PostsViewModel]] من درس MVVM بـ fake service بيفشل، وتأكد إن الحالة بقت [[.failed]].`,
          flag: "script",
          deep: {
            why: R`الاختبارات هي اللي بتخليك تعدّل في كود عمره سنة من غير ما تخاف. وفي الشركات، الـ pull request من غير tests لـ logic جديد غالبًا مش هيتقبل. وفي الانترفيو، «إزاي بتختبر view model بيكلم API؟» سؤال شبه ثابت، والإجابة: protocol + fake + unit test.`,
            how: R`[[@Test]] و [[#expect]] macros: الـ [[#expect]] بيفك الـ expression وقت الـ compile، فلما يفشل يقدر يطبع قيمة كل جزء (مش بس «false»). والاختبارات بتشتغل بالتوازي افتراضيًا (على عكس XCTest)، وده سبب إن الـ suite struct بيتعمل لكل test، وسبب إن الـ shared state بين الاختبارات خطر.

[[@Test(arguments:)]] مع array من tuples: كل tuple بيتفك على الـ parameters بالترتيب. و [[(50, 50, 25)]] بتتقري Double لأن أول tuple حدد النوع.

الـ package ده ([[PriceKit]] بالاختبارات دي واختبارات الـ view model) اتجرب بـ [[swift test]] على Linux بـ Swift 6.0 وتاني بـ Swift 6.4: 6 اختبارات عدّوا.`,
            when: R`unit tests لأي logic جديد، وخصوصًا الـ bugs: قبل ما تصلّح bug اكتب test بيفشل بسببه، وبعدين صلّح. وUI tests (XCTest) قليلة ولأهم سيناريو بس (login، والشراء)، لأنها بطيئة وبتتكسر بسهولة.`,
            mistakes: R`تختبر تفاصيل التنفيذ بدل السلوك (إن method اتنادت 3 مرات). واختبارات بتكلم API حقيقي فتفشل لما النت يقع. واختبارات معتمدة على ترتيب التشغيل أو على state مشتركة (Swift Testing بيشغّل بالتوازي فهتظهر عشوائيًا). وتستخدم [[#expect]] على optional ثم تكمل عليه بدل [[#require]].`
          },
          teach: R`## الملف ده بيعمل إيه؟

٤ اختبارات للـ package بتاع درس SPM ([[PriceKit]]): الخصم بيقلل السعر صح، والنسبة الغلط بترمي error، ونفس الخصم على ٣ حالات مرة واحدة، والتقسيم لمجموعات بيرتّب.

كل الناتج هنا من [[swift test]] على Swift 6.4 في Docker (لينكس): الملف ده في [[Tests/PriceKitTests/PriceTests.swift]]، ومعاه اختبارات درس MVVM. Swift Testing و XCTest الاتنين شغالين على لينكس. تشغيل الاختبارات من Xcode ([[Cmd+U]]) و [[xcodebuild test]] من docs بتاعة Apple.

---

## ١. الـ imports

~~~swift
import Testing
@testable import PriceKit
~~~

- [[import Testing]]: framework الاختبارات الجديد.
- [[@testable import PriceKit]]: [[@testable]] بيخلي الاختبارات تشوف الحاجات اللي [[internal]] (مش [[public]]) جوه الـ module.

---

## ٢. الـ suite: [[struct PriceTests]]

~~~swift
struct PriceTests {
~~~

struct فيه اختبارات = **suite** (مجموعة). Swift Testing بيعمل نسخة جديدة منه لكل اختبار، فمفيش state بتتسرب من اختبار للتاني. والاختبارات بتشتغل **بالتوازي** افتراضيًا.

---

## ٣. أبسط اختبار: [[@Test]] و [[#expect]]

~~~swift
  @Test func discountReducesPrice() {
    #expect(applyDiscount(200, percent: 25) == 150)
  }
~~~

- [[@Test]]: macro بيقول «الدالة دي اختبار». الاسم أي حاجة (مش لازم يبدأ بـ [[test]] زي XCTest).
- [[#expect(...)]]: لو الشرط غلط بيسجّل فشل ويكمّل باقي الاختبار.

٢٠٠ ناقص ٢٥٪ = ١٥٠، فعدّى. ولما غيّرناها لـ [[== 160]] (الـ try):

~~~text الناتج (Swift 6.4، لينكس)
✘ Test discountReducesPrice() recorded an issue at PriceTests.swift:6:5: Expectation failed: applyDiscount(200, percent: 25) == 160
↳ applyDiscount(200, percent: 25) == 160 → false
↳   applyDiscount(200, percent: 25) → 150.0
↳   160 → 160.0
~~~

نقراه: الملف والسطر والعمود ([[6:5]])، والشرط كله طلع [[false]]، وقيمة كل جزء: الدالة رجّعت [[150.0]]. ده لأن [[#expect]] macro بيفك الـ expression وقت الـ compile، فيقدر يطبع كل حتة من غير ما تضيف [[print]].

---

## ٤. اختبار باسم، وبيتأكد من error

~~~swift
  @Test("خصم أكبر من 100% بيرمي error")
  func invalidPercentThrows() {
    #expect(throws: PriceError.invalidPercent(150)) {
      try checkedDiscount(100, percent: 150)
    }
  }
~~~

- [[@Test("...")]]: اسم مقروء بيظهر في التقرير بدل اسم الدالة.
- [[#expect(throws: X) { ... }]]: الكود اللي جوه الأقواس **لازم** يرمي الخطأ ده بالظبط. ولو مرماش، أو رمى حاجة تانية، يفشل. (عشان يقارن، [[PriceError]] لازم [[Equatable]].)

~~~text الناتج
✔ Test "خصم أكبر من 100% بيرمي error" passed after 0.002 seconds.
~~~

---

## ٥. نفس الاختبار على كذا قيمة: [[arguments:]]

~~~swift
  @Test(arguments: [(100.0, 10.0, 90.0), (50, 50, 25), (80, 0, 80)])
  func manyDiscounts(price: Double, percent: Double, expected: Double) {
    #expect(applyDiscount(price, percent: percent) == expected)
  }
~~~

- [[arguments:]]: array من ٣ tuples. كل tuple بيتفك على الـ ٣ parameters بالترتيب.
- [[(50, 50, 25)]] من غير [[.0]] بتتقري Double، لأن أول tuple حدد النوع.
- كل حالة بتتشغل لوحدها:

~~~text الناتج (مختصر)
◇ Test case passing 3 arguments price → 80.0, percent → 0.0, expected → 80.0 to manyDiscounts(price:percent:expected:) started.
✔ Test manyDiscounts(price:percent:expected:) with 3 test cases passed after 0.001 seconds.
~~~

---

## ٦. [[#require]]: لو فشل، وقّف

~~~swift
  @Test func bucketsAreSorted() throws {
    let buckets = priceBuckets([30, 10, 20])
    let first = try #require(buckets.first)
    #expect(first == [10, 20])
  }
}
~~~

- [[buckets.first]] optional. [[try #require(...)]] بيفكه، ولو [[nil]] بيرمي فالاختبار يقف هنا (بدل ما يكمّل على قيمة مش موجودة).
- عشان كده الدالة [[throws]].
- [[[30, 10, 20]]] بعد الترتيب والتقسيم لمجموعات من ٢: أول مجموعة [[[10, 20]]].

---

## ٧. التشغيل كله

~~~text الناتج من swift test (Swift 6.4، لينكس، مختصر)
✔ Test discountReducesPrice() passed after 0.001 seconds.
✔ Test bucketsAreSorted() passed after 0.001 seconds.
✔ Test manyDiscounts(price:percent:expected:) with 3 test cases passed after 0.001 seconds.
✔ Test searchFilters() passed after 0.001 seconds.
✔ Test "خصم أكبر من 100% بيرمي error" passed after 0.002 seconds.
✔ Test showsErrorWhenOffline() passed after 0.002 seconds.
✔ Suite PriceTests passed after 0.002 seconds.
✔ Suite PostsViewModelTests passed after 0.002 seconds.
✔ Test run with 6 tests in 2 suites passed after 0.003 seconds.
~~~

٦ = الـ ٤ دول + اختبارين درس MVVM. ولاحظ الترتيب مش زي ترتيب الكود: بيشتغلوا بالتوازي.

---

## ٨. الـ solCode: اختبار view model

~~~swift
@MainActor
struct PostsViewModelTests {
  @Test func showsErrorWhenOffline() async {
    let viewModel = PostsViewModel(service: FakePostsService(shouldFail: true))
    await viewModel.load()
    guard case .failed(let message) = viewModel.phase else {
      Issue.record("كان المفروض الحالة تبقى failed")
      return
    }
    #expect(message.contains("النت"))
  }
}
~~~

- [[@MainActor]] على الـ suite لأن الـ view model [[@MainActor]].
- [[async]] لأن [[load()]] async.
- [[Issue.record("...")]]: سجّل فشل برسالة بإيدك (هنا لأن الحالة مش [[failed]]).

---

## ٩. نفس الكلام بـ XCTest القديم

جربنا نفس الأفكار في XCTest جنبهم في نفس الـ test target:

~~~swift
import XCTest
@testable import PriceKit

final class PriceXCTests: XCTestCase {
  func testDiscount() {
    XCTAssertEqual(applyDiscount(200, percent: 25), 150)
  }
  func testInvalidPercentThrows() {
    XCTAssertThrowsError(try checkedDiscount(100, percent: 150))
  }
  func testFirstBucket() throws {
    let first = try XCTUnwrap(priceBuckets([30, 10, 20]).first)
    XCTAssertEqual(first, [10, 20])
  }
}
~~~

~~~text الناتج (Swift 6.4، لينكس، مختصر)
Test Case 'PriceXCTests.testDiscount' passed (0.001 seconds)
Test Case 'PriceXCTests.testFirstBucket' passed (0.0 seconds)
Test Case 'PriceXCTests.testInvalidPercentThrows' passed (0.0 seconds)
	 Executed 3 tests, with 0 failures (0 unexpected) in 0.002 (0.002) seconds
~~~

[[swift test]] بيشغّل الاتنين: XCTest الأول وبتقريره، وبعده Swift Testing.

| Swift Testing | XCTest |
|---|---|
| [[@Test func anyName()]] | [[func testSomething()]] جوه [[XCTestCase]] |
| [[#expect(a == b)]] | [[XCTAssertEqual(a, b)]] |
| [[try #require(x)]] | [[try XCTUnwrap(x)]] |
| [[#expect(throws:)]] | [[XCTAssertThrowsError]] |
| [[@Test(arguments:)]] | loop بإيدك |
| بالتوازي افتراضيًا | ورا بعض افتراضيًا |

## الخلاصة

- [[@Test]] = اختبار، و [[#expect]] بيكمّل لو فشل، و [[#require]] بيوقف.
- رسالة الفشل فيها القيم الحقيقية، فمش محتاج [[print]].
- اختبر الـ logic (حسابات، validation، view models بـ fake)، مش شكل الـ View.`,
          lines: [
            R`[[Testing]]: الـ framework الجديد.`,
            R`[[@testable]]: يفتح الـ internal في PriceKit للاختبار.`,
            "struct = suite، وبيتعمل من جديد لكل test.",
            R`[[@Test]] على function: ده اختبار.`,
            R`[[#expect]]: لو غلط بيسجل فشل بالقيم الحقيقية.`,
            "قفلة.",
            R`[[@Test("...")]] باسم بيظهر في التقرير.`,
            "الـ function.",
            R`[[#expect(throws:)]]: لازم يرمي الخطأ ده بالظبط.`,
            "الكود اللي المفروض يرمي.",
            "قفلة.",
            "قفلة.",
            R`[[arguments:]] 3 حالات، كل tuple بيتفك على الـ parameters.`,
            "3 parameters بالترتيب.",
            "نفس الـ expect لكل حالة.",
            "قفلة.",
            R`[[throws]] عشان [[#require]] ممكن يرمي.`,
            "دالة من الـ package.",
            R`[[#require]]: يفك الـ optional، ولو nil يوقف الاختبار.`,
            "مقارنة arrays.",
            "قفلة.",
            "قفلة الـ suite."
          ],
          sol: R`[[swift test]] بيطبع حاجة زي:
[[✔ Test discountReducesPrice() passed after 0.001 seconds.]]
[[◇ Test case passing 3 arguments price → 80.0, percent → 0.0, expected → 80.0 to manyDiscounts(price:percent:expected:) started.]]
[[✔ Test run with 4 tests in 1 suite passed after 0.001 seconds.]]

ولما تغيرها لـ 160:
(على Swift 6.4):
[[✘ Test discountReducesPrice() recorded an issue at PriceTests.swift:6:5: Expectation failed: applyDiscount(200, percent: 25) == 160]]
[[↳   applyDiscount(200, percent: 25) → 150.0]]
[[↳   160 → 160.0]]
لاحظ إنه بيوريك القيمة الحقيقية (150) من غير ما تضيف print.

اختبار الـ view model (اتجرب وعدّى):`,
          solCode: R`@MainActor
struct PostsViewModelTests {
  @Test func showsErrorWhenOffline() async {
    let viewModel = PostsViewModel(service: FakePostsService(shouldFail: true))
    await viewModel.load()
    guard case .failed(let message) = viewModel.phase else {
      Issue.record("كان المفروض الحالة تبقى failed")
      return
    }
    #expect(message.contains("النت"))
  }
}`
        },
        {
          cmd: "الـ debugging و Instruments",
          title: "تلاقي الـ bug بـ breakpoints و LLDB (po و p و bt)، وتلاقي البطء والـ leaks بـ Instruments و Memory Graph",
          desc: R`[[print]] كويس في الأول، بس بعد شوية هتحتاج أدوات Xcode:

1. Breakpoints: دوس على رقم السطر في Xcode فيظهر سهم أزرق. لما التطبيق يوصل للسطر ده يقف، وتقدر تشوف كل المتغيرات في الـ Variables View تحت. وتمشي سطر سطر: Step Over ([[F6]])، و Step Into ([[F7]]) جوه الدالة، و Continue ([[Ctrl+Cmd+Y]]).
   • breakpoint بشرط: كليك يمين ← Edit Breakpoint ← Condition ([[items.count == 0]]): يقف بس لما الشرط يتحقق.
   • breakpoint بيطبع من غير ما يقف: Action ← Log Message، وعلّم «Automatically continue». ده [[print]] من غير ما تعدّل الكود.
   • Exception و Swift Error breakpoints (من تاب الـ Breakpoints): يوقف لحظة ما error يترمي، حتى لو اتمسك.

2. LLDB console (تحت لما البرنامج واقف):
   • [[po x]]: اطبع الـ object بوصفه. • [[p x]]: اطبع القيمة (في Xcode الحديث [[p]] بقى ذكي وبيختار). • [[v]]: كل المتغيرات المحلية بسرعة. • [[bt]]: الـ backtrace (مين نادى مين لحد هنا). • [[expr x = 5]]: غيّر قيمة وانت واقف وكمّل. • [[c]]: كمّل.

3. لما التطبيق يقع: Xcode بيقف على السطر وبيكتب السبب (زي [[Unexpectedly found nil]] أو [[Index out of range]]). اقرا الـ backtrace في الـ Debug Navigator من فوق لتحت لحد أول سطر من كودك.

4. Debug View Hierarchy (زرار الطبقات تحت): بيوريك الشاشة 3D وكل View فين، مفيد لما حاجة مش ظاهرة.

5. Debug Memory Graph (زرار التلات دواير): بيوريك كل الـ objects اللي في الذاكرة، وعلامة بنفسجي على الـ leaks. لو قفلت شاشة ولسه الـ view model بتاعها موجود = leak (غالبًا [[[weak self]]] ناقصة).

6. Instruments (Product ← Profile أو [[Cmd+I]]): أداة قياس على build الـ Release:
   • Time Profiler: الكود بيقضي وقته فين (لما التطبيق بطيء أو بيتقطع).
   • Allocations و Leaks: الذاكرة بتزيد ليه.
   • SwiftUI instrument: أنهي Views بيتعاد حساب body بتاعها كتير.
   • Network: الطلبات ومدتها.

وفي الـ SwiftUI: [[let _ = Self._printChanges()]] جوه [[body]] (للـ debugging بس) بيطبع إيه اللي خلّى الـ View يتحسب تاني.`,
          example: R`# اكتبهم في الـ console تحت لما البرنامج يقف على breakpoint
po viewModel.phase
p posts.count
v
bt
expr viewModel.searchText = "swift"
c
# breakpoint بشرط من الـ console بدل الماوس
breakpoint set --file PostsViewModel.swift --line 30 --condition 'posts.isEmpty'
# من الترمنال: قوالب Instruments المتاحة على جهازك
xcrun xctrace list templates`,
          try: R`حط breakpoint في [[load()]] بتاعة الـ view model، وشغّل، ولما يقف اكتب [[po phase]] و [[bt]]. وبعدين اعمل leak مقصود (شيل [[[weak self]]] من closure متخزن في class)، وافتح وقفل الشاشة كذا مرة، وافتح Debug Memory Graph ودوّر على الـ objects المتكررة.`,
          flag: "console",
          deep: {
            why: R`الفرق بين junior و mid غالبًا مش في كتابة الكود، في سرعة إيجاد المشكلة. اللي بيعرف breakpoint بشرط و [[bt]] و Memory Graph بيحل في 10 دقايق اللي غيره بيقعد فيه يوم بـ [[print]].`,
            how: R`LLDB هو الـ debugger اللي تحت Xcode. لما البرنامج يقف على breakpoint، LLDB يقدر يقرا ذاكرة البرنامج ويشغّل كود Swift جواه ([[expr]]). [[po]] بينادي [[description]] (أو [[debugDescription]]) على الـ object، و [[v]] (اختصار [[frame variable]]) بيقرا الذاكرة مباشرة من غير ما يشغّل كود، فأسرع وأأمن.

Instruments بيشتغل بالـ sampling: كل ميلي ثانية بياخد صورة من الـ stack بتاع كل thread، وبعدين بيجمّع: الدالة اللي ظهرت في أغلب الصور هي اللي واكلة الوقت. عشان كده لازم Release build على جهاز حقيقي لو أمكن: الـ Debug build والـ Simulator أرقامهم مش حقيقية.

[[xcrun xctrace]] الـ command line بتاع Instruments، مفيد في CI.`,
            when: R`breakpoints لأي bug منطقي (القيمة غلط فين؟). Memory Graph بعد أي feature فيها closures أو delegates. Time Profiler لما حد يقولك «بطيء» قبل ما تخمّن. و SwiftUI instrument لما الـ scrolling بيتقطع.`,
            mistakes: R`تقيس الأداء على Debug build. وتسيب [[print]] كتير في كود الإنتاج (استخدم [[Logger]] من [[os]] بدلها). وتتجاهل الـ warnings البنفسجي (Runtime Issues) في Xcode: غالبًا تحديث UI من thread غلط أو مشكلة SwiftUI. وتحسن أداء حتة من غير ما تقيس فتطلع مش هي المشكلة.`
          },
          teach: R`## الأوامر دي بتعمل إيه؟

دي أوامر LLDB، الـ debugger اللي تحت Xcode. بتكتبها في الـ console لما البرنامج يقف على breakpoint: تطبع قيم، وتشوف المتغيرات، وتعرف مين نادى مين، وتغيّر قيمة وتكمّل. وفي الآخر أمر ترمنال بيعرض قوالب Instruments.

### اتجرّب فين؟

LLDB موجود في Swift على لينكس، فعملنا برنامج صغير شبه الـ view model ([[PostsViewModel]] فيه [[phase]] و [[searchText]] و [[load]])، وبنيناه بـ [[swiftc -g]] (‏[[-g]] = حط معلومات الـ debug)، وشغّلنا كل أوامر المثال عليه بجد في Swift 6.4 على لينكس (Docker). أزرار Xcode (Variables View و Debug Memory Graph و View Hierarchy) و Instruments و [[xcrun xctrace]] على الماك بس، فدول من docs بتاعة Apple.

البرنامج اللي جربنا عليه:

~~~swift
struct Post { let id: Int; let title: String }
enum Phase { case idle, loading, loaded([Post]) }
final class PostsViewModel {
  var phase = Phase.idle
  var searchText = ""
  func load(_ posts: [Post]) {
    phase = .loading
    let count = posts.count
    phase = .loaded(posts)
    print("loaded", count, "search:", searchText)
  }
}
let viewModel = PostsViewModel()
viewModel.load([])
viewModel.load([Post(id: 1, title: "SwiftUI"), Post(id: 2, title: "Kotlin")])
~~~

---

## ١. breakpoint بشرط (آخر أمر في المثال، بس بيتعمل الأول)

~~~bash
breakpoint set --file PostsViewModel.swift --line 9 --condition 'posts.isEmpty'
~~~

- [[breakpoint set]]: حط breakpoint.
- [[--file]] و [[--line]]: فين بالظبط. في المثال [[30]]، وفي ملفنا السطر [[9]] ([[phase = .loaded(posts)]]).
- [[--condition 'posts.isEmpty']]: يقف **بس** لو الشرط ده صح. ده نفس اللي بتعمله بالماوس من Edit Breakpoint ← Condition.

~~~text الناتج (Swift 6.4، لينكس)
Breakpoint 1: where = app$__btPostsViewModel.load(_:) + 169 at PostsViewModel.swift:9:21, address = 0x0000000000001489
~~~

بعد [[run]] وقف أول نداء بس (القايمة الفاضية):

~~~text الناتج
* thread #1, name = 'app', stop reason = breakpoint 1.1
    frame #0: 0x0000555555555489 app$__btPostsViewModel.load(posts=0 values) at PostsViewModel.swift:9:21
   8   	    let count = posts.count
-> 9   	    phase = .loaded(posts)
~~~

السهم [[->]] = السطر اللي **لسه هيتنفذ**. يعني [[phase]] لسه [[.loading]].

---

## ٢. [[po]] و [[p]]

~~~bash
po viewModel.phase
p posts.count
~~~

~~~text الناتج
(lldb) po viewModel.phase
app.Phase.loading

(lldb) p posts.count
(Int) 0
~~~

- [[po]] (print object): بيطبع **الوصف** بتاع القيمة (زي [[print]]). [[app]] اسم الـ module.
- [[p]] (print): بيطبع القيمة **ونوعها** بين قوسين: [[(Int) 0]].

---

## ٣. [[v]]: كل المتغيرات

~~~text الناتج
(lldb) v
([app.Post]) posts = 0 values {}
(app.PostsViewModel) self = 0x000055555556c070 (phase = loading, searchText = "")
(Int) count = 0
~~~

[[v]] اختصار [[frame variable]]: كل المتغيرات المحلية في الدالة دي، بيقراها من الذاكرة مباشرة من غير ما يشغّل كود (أسرع وأأمن من [[po]]). [[self]] = الـ view model نفسه، و [[0x...]] عنوانه في الذاكرة. ونفس المعلومات دي اللي بتظهر في Variables View في Xcode.

---

## ٤. [[bt]]: مين نادى مين

~~~text الناتج
(lldb) bt
* thread #1, name = 'app', stop reason = breakpoint 1.1
  * frame #0: 0x0000555555555489 app$__btPostsViewModel.load(posts=0 values) at PostsViewModel.swift:9:21
    frame #1: 0x0000555555556299 app$__btmain at PostsViewModel.swift:14:11
    frame #2: 0x00007ffff73e4601 libc.so.6$__bt___lldb_unnamed_symbol_2a580 + 129
    frame #3: 0x00007ffff73e4718 libc.so.6$__bt__libc_start_main + 136
    frame #4: 0x00005555555550b5 app$__bt_start + 37
~~~

backtrace: الـ stack من فوق لتحت. [[frame #0]] احنا فين دلوقتي ([[load]] سطر ٩)، و [[frame #1]] مين ناداها ([[main]] سطر ١٤ = [[viewModel.load([])]]). والباقي كود النظام ([[libc]]) اللي شغّل البرنامج. في crash حقيقي، اقرا من فوق لتحت لحد أول سطر من **كودك**.

---

## ٥. [[expr]] و [[c]]

~~~bash
expr viewModel.searchText = "swift"
c
~~~

~~~text الناتج
(lldb) expr viewModel.searchText = "swift"
() $R0 = {}
(lldb) c
loaded 0 search: swift
loaded 2 search: swift
Process 45 resuming
Process 45 exited with status = 0 (0x00000000)
~~~

- [[expr]]: شغّل كود Swift جوه البرنامج وهو واقف. هنا غيّرنا [[searchText]] من غير ما نعدّل الكود ونبني تاني. [[()]] = الأمر ده مش بيرجّع قيمة.
- [[c]] (continue): كمّل.
- الـ [[print]] طبع [[swift]] اللي حطيناها. والنداء التاني (بوستين) **مقفش**، لأن [[posts.isEmpty]] بقت [[false]]: ده شغل الشرط.

---

## ٦. [[xcrun xctrace list templates]] (من docs بتاعة Apple)

على الماك بيعرض قوالب Instruments المتاحة (Time Profiler و Allocations و Leaks و SwiftUI وغيرهم). [[xcrun]] بيشغّل أداة من أدوات Xcode، و [[xctrace]] النسخة الترمنال من Instruments (مفيدة في CI).

| الأمر | اختصار لـ | بيعمل إيه |
|---|---|---|
| [[po x]] | print object | الوصف |
| [[p x]] | print | القيمة والنوع |
| [[v]] | frame variable | كل المتغيرات المحلية |
| [[bt]] | backtrace | سلسلة النداءات |
| [[expr x = 5]] | expression | يغيّر قيمة وهو واقف |
| [[c]] | continue | يكمّل |
| [[breakpoint set ... --condition]] | | يقف بشرط |

## الخلاصة

- breakpoint بشرط + [[v]] + [[bt]] بيحلوا أغلب الـ bugs أسرع من [[print]].
- [[expr]] بيخليك تجرب تصليح من غير build جديد.
- البطء والـ leaks مكانهم Instruments و Memory Graph على Release build، مش التخمين.`,
          lines: [
            R`[[po]]: اطبع وصف الـ object.`,
            R`[[p]]: اطبع القيمة.`,
            R`[[v]]: كل المتغيرات المحلية.`,
            R`[[bt]]: backtrace، مين نادى مين.`,
            R`[[expr]]: غيّر قيمة وانت واقف.`,
            R`[[c]]: كمّل التشغيل.`,
            "breakpoint بيقف بس لو القايمة فاضية.",
            R`في الترمنال: [[xctrace]] بيعرض قوالب Instruments زي Time Profiler و Leaks.`
          ],
          sol: R`لما يقف في [[load()]]: [[po phase]] بيطبع حاجة زي [[PostsViewModel.Phase.idle]] (أو [[.loading]] حسب مكان الـ breakpoint)، و [[bt]] بيوريك السلسلة من [[load()]] لفوق لحد كود SwiftUI اللي نادى [[.task]].

وفي الـ leak: بعد ما تفتح وتقفل الشاشة 3 مرات، Memory Graph هيوريك 3 نسخ من الـ class بتاعك لسه عايشة وعلامة تحذير بنفسجي، ولو دوست على واحدة هتشوف السهم من الـ closure للـ object والعكس: ده الـ retain cycle. رجّع [[[weak self]]] وكرر: لازم ميفضلش غير اللي مفتوح.`
        }
      ]
    }
]);
