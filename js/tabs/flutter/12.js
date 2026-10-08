// تكملة تاب flutter: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/flutter/01.js (شرح حقول الدرس في أوله)
MORE("flutter", [
    {
      t: "الاختبارات",
      l: 3,
      n: "widget tests بتشتغل في ثواني من غير موبايل، و integration tests بتشغّل التطبيق الحقيقي على جهاز",
      items: [
        {
          cmd: "flutter test",
          title: "تختبر شاشة بتدوس وتكتب فيها من غير موبايل",
          desc: R`الـ widget test بيبني الـ widget في بيئة وهمية (من غير شاشة ولا emulator)، وتقدر تكتب في الحقول وتدوس الأزرار وتتأكد من اللي ظاهر. بيشتغل بـ [[flutter test]] في ثواني، وفي CI.

[[testWidgets]] بتدّيك [[tester]]: [[pumpWidget]] يبني، و [[tap]] و [[enterText]] يتفاعلوا، و [[pump]] يرسم frame (بعد أي تغيير لازم pump عشان الشاشة تتحدث). و [[find.text]] و [[find.byType]] بيدوّروا، و [[expect(..., findsOneWidget)]] بيتأكد.`,
          example: R`// test/login_form_test.dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/login_form.dart';

void main() {
  Widget app() => const MaterialApp(home: Scaffold(body: LoginForm()));

  testWidgets('empty fields show both errors', (tester) async {
    await tester.pumpWidget(app());
    await tester.tap(find.text('Sign in'));
    await tester.pump();
    expect(find.text('اكتب إيميل صحيح'), findsOneWidget);
    expect(find.text('8 حروف على الأقل'), findsOneWidget);
  });

  testWidgets('valid input signs in', (tester) async {
    await tester.pumpWidget(app());
    await tester.enterText(find.byType(TextFormField).first, 'ali@mail.com');
    await tester.enterText(find.byType(TextFormField).last, 'secret123');
    await tester.tap(find.byType(FilledButton));
    await tester.pump();
    expect(find.text('Signing in...'), findsOneWidget);
    await tester.pump(const Duration(seconds: 1));
    await tester.pump();
    expect(find.text('Welcome ali@mail.com'), findsOneWidget);
  });
}`,
          try: "حط LoginForm من درس «Form و validator» في [[lib/login_form.dart]] وشغّل [[flutter test]]. بعدين بدّل آخر [[pump(const Duration(seconds: 1))]] و [[pump()]] بـ [[pumpAndSettle()]] بس: الاختبار نجح؟ ليه؟ واكتب اختبار تالت لـ TodosScreen بـ FakeTodoRepo فاضي (ProviderScope مع overrides) بيتأكد إن «مفيش مهام لسه» ظاهرة.",
          flag: "script",
          deep: {
            why: "كل ما التطبيق يكبر، تعديل في validator أو provider ممكن يكسر شاشة مش واخد بالك منها، وتكتشفه من تقييم نجمة واحدة على Play. الـ widget tests بتشغّل سيناريوهات المستخدم الأساسية في ثواني مع كل commit، وأرخص بكتير من إنك تجرّب بإيدك.",
            how: R`فيه ٣ أنواع اختبارات في Flutter:
- unit ([[test()]] من package test): دالة أو class من غير UI. أسرع حاجة. زي اختبار CartNotifier بـ [[ProviderContainer]].
- widget ([[testWidgets]]): widget أو شاشة في بيئة وهمية. المثال هنا.
- integration: التطبيق الحقيقي على جهاز (الدرس الجاي).

الوقت في widget tests وهمي (fake async): مفيش حاجة بتحصل لوحدها. [[pump()]] بيرسم frame واحد، و [[pump(Duration)]] بيقدّم الساعة الوهمية المدة دي (فالـ [[Future.delayed]] بتاع ثانية بيخلص فورًا)، و [[pumpAndSettle()]] بيفضل يرسم frames لحد ما مفيش animations. بس pumpAndSettle مش بيقدّم الوقت لـ timers لو مفيش frames مستنية، ودا سبب إنه مش كفاية بعد Future.delayed.

الـ finders: [[find.text]] و [[find.byType]] و [[find.byIcon]] و [[find.byKey(const ValueKey('submit'))]] (أثبت حاجة لو النص ممكن يتغير أو يتترجم)، و [[find.widgetWithText(ListTile, 'milk')]]. والـ matchers: [[findsOneWidget]] و [[findsNothing]] و [[findsNWidgets(3)]].

الشبكة: الـ widget tests بتمنع طلبات HTTP الحقيقية (بترجع 400)، ودا مقصود. عشان كده الـ repository لازم يبقى provider تقدر تعمله override بـ fake:
[[ProviderScope(overrides: [todoRepoProvider.overrideWithValue(FakeRepo([]))], child: ...)]]

الـ plugins (shared_preferences، secure storage) مش موجودة في الاختبار: كل واحد فيه mock ([[SharedPreferencesAsyncPlatform.instance = InMemorySharedPreferencesAsync.empty()]] و [[FlutterSecureStorage.setMockInitialValues({})]])، أو الأحسن تعمل override للـ store نفسه.

golden tests: [[expectLater(find.byType(ProductCard), matchesGoldenFile('card.png'))]] بتقارن شكل الـ widget بصورة محفوظة، و [[flutter test --update-goldens]] بيحدّثها.

[[flutter test --coverage]] بيطلّع [[coverage/lcov.info]].`,
            when: "السيناريوهات المهمة: login، و checkout، و الفورمز، وحالات loading و error و empty. ومع أي bug بتصلّحه: اختبار يمسكه عشان ميرجعش. ومتختبرش كل widget صغير بيعرض نص.",
            mistakes: R`تنسى [[pump()]] بعد tap فالاختبار يشوف الشاشة القديمة. و [[pumpAndSettle]] مع [[CircularProgressIndicator]] ظاهر: الـ animation مبيخلصش فيضرب timeout. وتختبر بـ HTTP حقيقي. وتدوّر بـ [[find.text]] على نص بيتغير مع الترجمة، فالاختبارات تقع لما حد يعدّل كلمة: استخدم keys للحاجات المهمة. والـ widget محتاج MaterialApp أو Scaffold فوقه (Directionality و Theme و ScaffoldMessenger) وانت بتبنيه لوحده.`
          },
          teach: R`## الكود ده بيعمل إيه؟

ملف اختبار فيه اختبارين لـ [[LoginForm]] (من درس «Form و validator»): الأول بيدوس Sign in والحقول فاضية ويتأكد إن رسالتين الخطأ ظهروا، والتاني بيكتب إيميل وباسورد صح ويدوس ويتأكد من «Signing in...» وبعدين رسالة الترحيب. حطيت الـ LoginForm في [[lib/login_form.dart]] في مشروع اسمه [[my_app]]، والملف ده في [[test/login_form_test.dart]]، وشغّلت [[flutter test]] جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44). مفيش موبايل ولا emulator.

~~~text flutter test test/login_form_test.dart
00:00 +0: loading /w/app/test/login_form_test.dart
00:00 +0: empty fields show both errors
00:00 +1: valid input signs in
00:01 +2: All tests passed!
~~~

[[+1]] و [[+2]] عدد اللي نجح لحد دلوقتي، و [[00:01]] الوقت: ثانية للاتنين.

---

## ١. الـ imports

~~~dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/login_form.dart';
~~~

- [[flutter_test]]: جاية مع أي مشروع [[flutter create]] في [[dev_dependencies]]. فيها [[testWidgets]] و [[find]] و [[expect]].
- [[package:my_app/...]]: ملف من مشروعك نفسه. [[my_app]] هو [[name:]] في [[pubspec.yaml]]، و [[login_form.dart]] جوه [[lib/]].

---

## ٢. دالة بتبني الشاشة

~~~dart
void main() {
  Widget app() => const MaterialApp(home: Scaffold(body: LoginForm()));
~~~

- [[main]]: [[flutter test]] بيشغّل main بتاعة كل ملف بينتهي بـ [[_test.dart]] جوه [[test/]].
- [[app()]]: دالة صغيرة عشان كل اختبار يبني نسخة جديدة.
- ليه [[MaterialApp]] و [[Scaffold]]؟ الـ [[TextFormField]] محتاج Theme واتجاه الكتابة، و [[ScaffoldMessenger.of(context)]] (اللي بيعرض الـ SnackBar) محتاج Scaffold فوقه. لوحده الـ LoginForm هيضرب.

---

## ٣. الاختبار الأول: الحقول فاضية

~~~dart
  testWidgets('empty fields show both errors', (tester) async {
    await tester.pumpWidget(app());
    await tester.tap(find.text('Sign in'));
    await tester.pump();
    expect(find.text('اكتب إيميل صحيح'), findsOneWidget);
    expect(find.text('8 حروف على الأقل'), findsOneWidget);
  });
~~~

- [[testWidgets('اسم', (tester) async { ... })]]: اختبار widget. الاسم بيظهر في الناتج، و [[tester]] هو اللي بيبني ويدوس ويكتب.
- [[pumpWidget(app())]]: ابني الشاشة وارسم أول frame.
- [[find.text('Sign in')]]: «دوّر على widget فيه النص ده». ده **finder**: وصف للي بتدوّر عليه، مش الـ widget نفسه.
- [[tap(...)]]: دوس عليه. الـ [[_submit]] بيتنادى، والـ validators بيشتغلوا.
- [[pump()]]: ارسم frame جديد. من غيره الشاشة لسه زي ما كانت قبل الضغطة، والرسايل مش هتظهر.
- [[expect(finder, findsOneWidget)]]: «لازم يبقى فيه واحد بالظبط». لو صفر أو اتنين الاختبار يقع.

---

## ٤. الاختبار التاني: بيانات صح

~~~dart
    await tester.enterText(find.byType(TextFormField).first, 'ali@mail.com');
    await tester.enterText(find.byType(TextFormField).last, 'secret123');
    await tester.tap(find.byType(FilledButton));
    await tester.pump();
    expect(find.text('Signing in...'), findsOneWidget);
~~~

- [[find.byType(TextFormField)]]: كل الحقول من النوع ده (اتنين). [[.first]] الإيميل، و [[.last]] الباسورد.
- [[enterText(finder, 'نص')]]: اكتب في الحقل كأن المستخدم كتب.
- [[find.byType(FilledButton)]]: الزرار بنوعه بدل نصه.
- بعد [[pump()]]: [[_busy]] بقى true، فالزرار بيقول «Signing in...».

~~~dart
    await tester.pump(const Duration(seconds: 1));
    await tester.pump();
    expect(find.text('Welcome ali@mail.com'), findsOneWidget);
  });
}
~~~

- الـ LoginForm فيه [[await Future.delayed(const Duration(seconds: 1))]]. في الاختبار **الوقت وهمي**: محدش بيستنى ثانية بجد.
- [[pump(const Duration(seconds: 1))]]: قدّم الساعة الوهمية ثانية وارسم. الـ Future.delayed خلص، و [[setState]] و [[showSnackBar]] اتنادوا.
- [[pump()]] تاني: frame كمان عشان الـ SnackBar يتبني.

### التجربة: [[pumpAndSettle()]] بدل الاتنين

~~~text flutter test
pumpAndSettle advanced fake time: 700ms, busy=true
Expected: exactly one matching candidate
  Actual: _TextWidgetFinder:<Found 0 widgets with text "Welcome ali@mail.com": []>
~~~

قِست الساعة الوهمية: [[pumpAndSettle]] قدّمها 700ms بس، لأنه بيرسم frames لحد ما الـ animations تخلص (ripple الزرار) وبيوقف. الـ delay ثانية، فلسه «Signing in...». الوقت المحدد = [[pump(Duration)]].

---

## ٥. التجربة التالتة: [[TodosScreen]] (الـ solCode)

~~~dart
testWidgets('empty todos', (tester) async {
  await tester.pumpWidget(ProviderScope(
    overrides: [todoRepoProvider.overrideWithValue(FakeTodoRepo([]))],
    child: const MaterialApp(home: Scaffold(body: TodosScreen())),
  ));
  expect(find.byType(CircularProgressIndicator), findsOneWidget);
  await tester.pump(const Duration(seconds: 1));
  await tester.pump();
  expect(find.text('مفيش مهام لسه'), findsOneWidget);
});
~~~

- [[ProviderScope(overrides: [...])]]: نفس الـ override بتاع main، بس بـ repo فاضي.
- أول frame: لسه بيحمّل، فالـ spinner موجود.
- [[pump(1s)]]: الـ [[Future.delayed]] بتاع الـ FakeTodoRepo خلص، و [[pump()]] رسم EmptyView.

~~~text flutter test
00:01 +3: /w/app/test/todos_screen_test.dart: empty todos
~~~

ليه مش [[pumpAndSettle()]] من الأول؟ لأن [[CircularProgressIndicator]] animation مبتخلصش، فـ pumpAndSettle هيفضل يستنى لحد ما يضرب timeout.

### والشبكة الحقيقية؟

جربت [[http.get]] حقيقي للـ API الوهمي جوه [[testWidgets]]:

~~~text flutter test
status=400 body=""
~~~

الـ widget tests بتقفل الشبكة عمدًا وبترجّع 400 لأي طلب. عشان كده الـ repo لازم يبقى provider تبدّله بـ fake.

---

## ٦. golden test (من الـ deep)

~~~dart
await expectLater(find.byType(LoginForm), matchesGoldenFile('goldens/login_form.png'));
~~~

جربته ٣ مرات:

~~~text flutter test
Could not be compared against non-existent file: "goldens/login_form.png"
~~~

~~~text flutter test --update-goldens
00:00 +1: All tests passed!
~~~

وبعد ما غيّرت نص الزرار لـ «Log in»:

~~~text flutter test
Golden "goldens/login_form.png": Pixel test failed, 0.25%, 1221px diff detected.
~~~

وعمل فولدر [[test/failures/]] فيه الصورة القديمة والجديدة وصورة الفرق.

و [[flutter test --coverage]] عمل [[coverage/lcov.info]] فيه كل سطر في [[lib/login_form.dart]] اتنفذ كام مرة.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[testWidgets(name, (tester) async {...})]] | اختبار widget من غير جهاز |
| [[pumpWidget]] | ابني |
| [[tap]] / [[enterText]] | دوس واكتب |
| [[pump()]] | frame واحد بعد أي تغيير |
| [[pump(Duration)]] | قدّم الوقت الوهمي (timers و delays) |
| [[pumpAndSettle()]] | لحد ما الـ animations تخلص، مش لحد ما الـ timers تخلص |
| [[find.text]] / [[find.byType]] + [[findsOneWidget]] | دوّر واتأكد |

> بعد أي tap: pump. بعد أي delay: pump بالمدة. وأي spinner ظاهر = متستخدمش pumpAndSettle.`,
          lines: [
            "flutter_test جاية مع كل مشروع.",
            "flutter_test.",
            "الشاشة اللي بتختبرها.",
            "البداية.",
            "الـ widget جوه MaterialApp و Scaffold عشان Theme و SnackBar يشتغلوا.",
            "اختبار widget.",
            "ابني.",
            "دوس الزرار.",
            "ارسم frame بعد التغيير.",
            "رسالة الإيميل ظاهرة مرة.",
            "ورسالة الباسورد.",
            "قفلة.",
            "اختبار تاني.",
            "ابني.",
            "اكتب في أول حقل.",
            "وفي آخر حقل.",
            "دوس.",
            "frame.",
            "الزرار في حالة التحميل.",
            "قدّم الوقت الوهمي ثانية: الـ Future.delayed خلص.",
            "frame تاني عشان الـ setState والـ SnackBar.",
            "رسالة الترحيب.",
            "قفلة.",
            "قفلة main."
          ],
          sol: R`[[flutter test]] بيطبع [[All tests passed!]] للاتنين.

مع [[pumpAndSettle()]] لوحدها بعد [[Signing in...]] الاختبار بيقع: [[Found 0 widgets with text "Welcome ali@mail.com"]]. لأن pumpAndSettle بيرسم frames لحد ما مفيش animations، والزرار خلص الـ animation بتاعه بسرعة، فرجع قبل ما الساعة الوهمية توصل ثانية، والـ Future.delayed لسه مستني. عشان تقدّم الوقت لازم [[pump(Duration)]].

الاختبار التالت: [[pumpWidget(ProviderScope(overrides: [todoRepoProvider.overrideWithValue(FakeTodoRepo([]))], child: const MaterialApp(home: Scaffold(body: TodosScreen()))))]]، ثم [[expect(find.byType(CircularProgressIndicator), findsOneWidget)]]، ثم [[pump(const Duration(seconds: 1))]] (لو الـ fake فيه delay) أو [[pumpAndSettle()]]، ثم [[expect(find.text('مفيش مهام لسه'), findsOneWidget)]].`,
          solCode: R`testWidgets('empty todos', (tester) async {
  await tester.pumpWidget(ProviderScope(
    overrides: [todoRepoProvider.overrideWithValue(FakeTodoRepo([]))],
    child: const MaterialApp(home: Scaffold(body: TodosScreen())),
  ));
  expect(find.byType(CircularProgressIndicator), findsOneWidget);
  await tester.pump(const Duration(seconds: 1));
  await tester.pump();
  expect(find.text('مفيش مهام لسه'), findsOneWidget);
});`
        },
        {
          cmd: "integration_test",
          title: "تشغّل التطبيق الحقيقي على موبايل وتدوس فيه أوتوماتيك",
          desc: R`الـ integration test بيشغّل التطبيق كله على جهاز حقيقي أو emulator: الـ plugins الحقيقية، والشبكة الحقيقية (أو staging)، والـ rendering الحقيقي. بنفس API الـ widget tests ([[tester.tap]] و [[find]])، بس بعد [[IntegrationTestWidgetsFlutterBinding.ensureInitialized()]].

الملفات في فولدر [[integration_test/]] وبتشغّلها بـ [[flutter test integration_test]] والجهاز متوصل. أبطأ بكتير من widget tests، فبتعمل منها قليل: السيناريوهات الأساسية من أول لآخر.`,
          example: R`// flutter pub add 'dev:integration_test:{"sdk":"flutter"}'
// integration_test/app_test.dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:my_app/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('counter increments on a real device', (tester) async {
    app.main();
    await tester.pumpAndSettle();
    expect(find.text('0'), findsOneWidget);
    await tester.tap(find.byIcon(Icons.add));
    await tester.pumpAndSettle();
    expect(find.text('1'), findsOneWidget);
  });
}
// flutter test integration_test/app_test.dart -d emulator-5554
// flutter test integration_test -d chrome   (محتاج chromedriver شغال)`,
          try: "في مشروع العدّاد الافتراضي ضيف الـ package والملف، وشغّل على الـ emulator. اتفرّج على التطبيق وهو بيتفتح والزرار بيتداس لوحده. وبعدين خلي الاختبار يدوس ٣ مرات ويتأكد من 3، وشغّله تاني.",
          flag: "script",
          deep: {
            why: "الـ widget tests بيمثّلوا الـ plugins والشبكة، فمش هيمسكوا إن الكاميرا محتاجة صلاحية مش مكتوبة في AndroidManifest، أو إن الـ release build فيه مشكلة obfuscation، أو إن الـ API الحقيقي غيّر شكل الرد. الـ integration test بيجرّب التجميعة كلها زي ما المستخدم هيشوفها.",
            how: R`[[IntegrationTestWidgetsFlutterBinding]] binding بيشتغل جوه التطبيق الحقيقي وبيبعت النتايج للأداة على الكمبيوتر. [[app.main()]] بيشغّل main بتاعتك زي ما هي، فكل حاجة حقيقية.

الوقت هنا حقيقي مش وهمي: [[pumpAndSettle]] بيستنى فعلًا. ولو فيه طلب شبكة، استنى على حاجة تظهر بدل وقت ثابت (loop صغيرة بـ [[pump(Duration(milliseconds: 100))]] لحد ما [[find]] يلاقي).

الـ backend: شغّل ضد staging أو backend محلي بـ [[--dart-define=API_URL=...]]، مش الإنتاج. أو اعمل override للـ repositories بـ fakes في main مخصوص للاختبار ([[-t integration_test/main_test.dart]]).

في CI: على GitHub Actions تقدر تشغّل Android emulator (action زي reactivecircus/android-emulator-runner) وده بطيء، أو ترفع الاختبارات لـ Firebase Test Lab يشغّلها على موبايلات حقيقية كتير.

[[flutter drive]] الطريقة الأقدم، وبتحتاجها لو عايز تاخد screenshots أو تقيس أداء ([[traceAction]] وتطلّع timeline).

والأداء: integration test في profile mode ([[flutter drive --profile]]) بيقيس الـ frame times على موبايل حقيقي، ودا الرقم اللي يعتمد عليه، مش debug.`,
            when: "٢ لـ ٥ سيناريوهات أساسية (login، الشراء، إضافة عنصر) قبل كل release، وفي CI ليلي. والتفاصيل الكتير في widget tests لأنها أسرع ١٠٠ مرة.",
            mistakes: R`تحط كل الاختبارات integration فالـ CI ياخد ساعة. وتشغّلها على الإنتاج فتعمل طلبات وحسابات حقيقية. وتستخدم [[pump(Duration(seconds: 3))]] ثابت للشبكة فالاختبار يبقى flaky (يعدّي مرة ويقع مرة). وتنسى [[ensureInitialized()]] فتطلع رسايل غريبة عن الـ binding.`
          },
          teach: R`## الكود ده بيعمل إيه؟

اختبار بيشغّل تطبيق العدّاد الافتراضي (اللي [[flutter create]] بيعمله) كله، ويتأكد إن الرقم 0، ويدوس [[+]]، ويتأكد إنه بقى 1. نفس كلام الـ widget test بالظبط، الفرق إنه بيشتغل **جوه التطبيق الحقيقي على جهاز**.

إيه اللي اتشغّل هنا وإيه اللي من الـ docs: مفيش موبايل ولا emulator، فالتشغيل على الجهاز نفسه من الـ docs. اللي اتعمل فعلًا جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44): الـ package اتضافت، والملف عدّى [[flutter analyze]] من غير مشاكل، ونفس جسم الاختبار (والـ solCode) اتشغّل كـ widget test عادي على نفس التطبيق ونجح، وجربت أمر التشغيل على emulator مش موجود عشان تشوف الرسالة.

---

## ١. السطور اللي فوق: تجهيز

~~~dart
// flutter pub add 'dev:integration_test:{"sdk":"flutter"}'
// integration_test/app_test.dart
~~~

- [[flutter pub add 'dev:...']]: [[dev:]] معناها تتحط في [[dev_dependencies]] (للتطوير بس، مش جوه التطبيق المنشور). و [[{"sdk":"flutter"}]] معناها إن الـ package جاية مع Flutter نفسه مش من pub.dev. والـ quotes حوالين الكلام كله عشان الترمنال ميفهمش [[{ }]] و [[" "]] غلط. بعد التشغيل الـ pubspec بقى فيه:

~~~text pubspec.yaml
  integration_test:
    sdk: flutter
~~~

- المسار: الملفات دي في فولدر [[integration_test/]] جنب [[test/]] مش جواه.

---

## ٢. الـ imports

~~~dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:my_app/main.dart' as app;
~~~

- [[material.dart]]: عشان [[Icons.add]].
- [[flutter_test]]: نفس [[testWidgets]] و [[find]] و [[expect]] بتوع الدرس اللي فات.
- [[integration_test]]: فيها الـ binding بتاع الأجهزة.
- [[my_app/main.dart' as app]]: ملف main بتاع تطبيقك نفسه. [[as app]] عشان [[main]] بتاعته متتلخبطش مع [[main]] بتاعة ملف الاختبار، فبتناديها [[app.main()]].

---

## ٣. الـ binding

~~~dart
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
~~~

الـ binding هو الحتة اللي بتربط Flutter بالمكان اللي شغال فيه. في الـ widget tests بيبقى [[TestWidgetsFlutterBinding]] (بيئة وهمية ووقت وهمي). السطر ده بيبدّله بواحد شغال **جوه التطبيق الحقيقي على الجهاز**، وبيبعت النتايج للترمنال على الكمبيوتر. لازم يبقى أول سطر.

---

## ٤. الاختبار

~~~dart
  testWidgets('counter increments on a real device', (tester) async {
    app.main();
    await tester.pumpAndSettle();
    expect(find.text('0'), findsOneWidget);
    await tester.tap(find.byIcon(Icons.add));
    await tester.pumpAndSettle();
    expect(find.text('1'), findsOneWidget);
  });
}
~~~

- [[app.main()]]: شغّل التطبيق زي ما المستخدم بيفتحه: [[runApp]] الحقيقية، بالـ plugins الحقيقية.
- [[pumpAndSettle()]]: استنى لحد ما الشاشة تهدى (مفيش animations). هنا الوقت **حقيقي**، فبيستنى فعلًا.
- [[find.text('0')]]: الرقم في نص الشاشة.
- [[find.byIcon(Icons.add)]]: دوّر بالأيقونة بدل النص: زرار الـ [[+]] العايم.
- [[tap]] ثم [[pumpAndSettle]] ثم [[expect(find.text('1'), ...)]]: الرقم زاد.

نفس الجسم ده (من غير الـ binding) كـ widget test على نفس الـ [[lib/main.dart]] اللي [[flutter create]] عمله:

~~~text flutter test
00:00 +0: counter increments (same body, widget-test binding)
00:00 +1: three taps (solCode)
00:01 +2: All tests passed!
~~~

---

## ٥. التشغيل (السطرين اللي تحت)

~~~text الأوامر
flutter test integration_test/app_test.dart -d emulator-5554
flutter test integration_test -d chrome   (محتاج chromedriver شغال)
~~~

- [[flutter test <ملف أو فولدر>]]: نفس الأمر بتاع الـ widget tests، بس بيبني التطبيق ويسطّبه على الجهاز الأول.
- [[-d emulator-5554]]: [[-d]] اختصار [[--device-id]]: أنهي جهاز. [[emulator-5554]] الاسم اللي [[flutter devices]] بيدّيه لأول Android emulator.
- [[integration_test]] من غير اسم ملف: كل الملفات اللي في الفولدر.

هنا مفيش emulator، فجربت الأمر عشان تشوف الرسالة:

~~~text flutter test integration_test/app_test.dart -d emulator-5554
No supported devices found with name or id matching 'emulator-5554'.

The following devices were found:
Linux (desktop) • linux • linux-x64 • Ubuntu 24.04.3 LTS ...
~~~

ومع emulator شغال (من الـ docs): أول مرة بياخد دقيقة أو اتنين يبني ويسطّب، والتطبيق بيفتح قدامك والزرار بيتداس لوحده، وفي الآخر [[All tests passed!]].

---

## ٦. الـ solCode: ٣ ضغطات

~~~dart
for (var i = 0; i < 3; i++) {
  await tester.tap(find.byIcon(Icons.add));
  await tester.pumpAndSettle();
}
expect(find.text('3'), findsOneWidget);
~~~

- [[for (var i = 0; i < 3; i++)]]: كرر ٣ مرات: [[i]] بيبدأ 0، ويزيد 1 ([[i++]]) بعد كل لفة، والشرط [[i < 3]].
- كل لفة: دوس واستنى. من غير الـ pumpAndSettle جوه اللفة، الضغطة التانية ممكن تحصل قبل ما الشاشة تتحدث.

ونجح في الناتج اللي فوق ([[three taps (solCode)]]).

---

## الخلاصة

| | widget test | integration test |
|---|---|---|
| فين | [[test/]] | [[integration_test/]] |
| الـ binding | وهمي (تلقائي) | [[IntegrationTestWidgetsFlutterBinding.ensureInitialized()]] |
| الوقت | وهمي | حقيقي |
| الـ plugins والشبكة | لأ (fakes) | حقيقية |
| التشغيل | [[flutter test]] | [[flutter test integration_test -d <device>]] |
| السرعة | ثواني | دقايق |

> نفس الـ API ([[tap]] و [[find]] و [[expect]])، بس على التطبيق كله وعلى جهاز. قليل منها للسيناريوهات المهمة، والباقي widget tests.`,
          lines: [
            "Material (فيها Icons).",
            "نفس API الـ widget tests.",
            "الـ binding بتاع الأجهزة الحقيقية.",
            "main بتاعة التطبيق نفسه.",
            "البداية.",
            "لازم أول سطر.",
            "اختبار.",
            "شغّل التطبيق زي ما المستخدم بيفتحه.",
            "استنى لحد ما الشاشة تهدى.",
            "العدّاد 0.",
            "دوس زرار +.",
            "استنى.",
            "بقى 1.",
            "قفلة.",
            "قفلة main."
          ],
          sol: R`[[flutter test integration_test/app_test.dart -d emulator-5554]] بيبني التطبيق (أول مرة دقيقة أو اتنين)، ويسطّبه، والتطبيق بيفتح على الـ emulator والرقم بيبقى 1 لوحده، وفي الترمنال [[All tests passed!]].

للـ ٣ ضغطات: loop بـ [[for (var i = 0; i < 3; i++)]] فيها tap و pumpAndSettle، ثم [[expect(find.text('3'), findsOneWidget)]].

لو ظهر [[No supported devices found with name or id matching 'emulator-5554']] يبقى الـ emulator مش شغال أو اسمه مختلف ([[flutter devices]] بيعرض الأسامي). وعلى Chrome لازم chromedriver شغال على بورت 4444 الأول، وإلا بيفشل.`,
          solCode: R`for (var i = 0; i < 3; i++) {
  await tester.tap(find.byIcon(Icons.add));
  await tester.pumpAndSettle();
}
expect(find.text('3'), findsOneWidget);`
        }
      ]
    },
    {
      t: "البيئات والشكل",
      l: 3,
      n: "نفس الكود بعناوين مختلفة للـ dev و staging والإنتاج، وأيقونة وشاشة بداية بتاعتك بدل بتوع Flutter",
      items: [
        {
          cmd: "dart-define و flavors",
          title: "نسخة dev بتكلم سيرفر التجربة ونسخة الإنتاج بتكلم الحقيقي",
          desc: R`عنوان الـ API و مفتاح Sentry وغيرهم بيختلفوا بين التطوير والإنتاج. [[--dart-define=API_URL=...]] أو [[--dart-define-from-file=env/prod.json]] بيحطوا القيم وقت الـ build، والكود بيقراها بـ [[String.fromEnvironment('API_URL')]] كـ const.

و flavors خطوة أكبر: نسختين من التطبيق بـ applicationId مختلف ([[com.shop.app.staging]] و [[com.shop.app]])، فتتسطّب الاتنين جنب بعض على نفس الموبايل وبأسماء وأيقونات مختلفة. بتتعرّف في [[build.gradle.kts]] (و Xcode schemes في iOS)، وبتشغّلها بـ [[--flavor staging]]، والكود يعرف هو أنهي بـ [[appFlavor]].`,
          example: R`// lib/env.dart
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';

class Env {
  static const apiUrl = String.fromEnvironment('API_URL', defaultValue: 'http://10.0.2.2:3000');
  static const sentryDsn = String.fromEnvironment('SENTRY_DSN');
  static const isStaging = bool.fromEnvironment('STAGING');
  static String get flavor => appFlavor ?? 'dev';
  static bool get showDebugBanner => kDebugMode || isStaging;
}
// env/staging.json:  {"API_URL": "https://staging-api.example.com", "STAGING": true}
// env/prod.json:     {"API_URL": "https://api.example.com", "SENTRY_DSN": "https://...@sentry.io/1"}
// flutter run --dart-define-from-file=env/staging.json
// flutter build appbundle --flavor production --dart-define-from-file=env/prod.json
// android/app/build.gradle.kts جوه android { }:
//   buildFeatures { resValues = true }
//   flavorDimensions += "default"
//   productFlavors {
//     create("staging") { dimension = "default"; applicationIdSuffix = ".staging"; resValue("string", "app_name", "Shop Staging") }
//     create("production") { dimension = "default"; resValue("string", "app_name", "Shop") }
//   }`,
          try: "اعمل [[env/dev.json]] و [[env/prod.json]] واعرض [[Env.apiUrl]] في الشاشة. شغّل بكل واحد. وبعدين غيّر القيمة في الملف واعمل hot reload: اتغيرت؟ ومن غير [[--dart-define-from-file]] خالص، [[Env.sentryDsn]] بيرجّع إيه؟",
          flag: "script",
          deep: {
            why: "لو العنوان متكتب في الكود، هتغيّره بإيدك قبل كل release وأكيد مرة هتنسى وتنزّل نسخة بتكلم سيرفر التجربة، أو العكس: تجرّب على بيانات عملاء حقيقية. والـ flavors بتخليك تسطّب نسخة التجربة جنب الحقيقية على موبايلك من غير ما واحدة تمسح التانية.",
            how: R`[[String.fromEnvironment]] و [[bool.fromEnvironment]] و [[int.fromEnvironment]] const، يعني القيمة بتتحط وقت الترجمة وبتبقى جزء من الكود المترجم. عشان كده:
- لازم تتكتب كـ [[const]] (أو static const). لو ناديتها من غير const وقت التشغيل هترجع الافتراضي.
- تغييرها محتاج build جديد (أو full restart)، مش hot reload.
- الـ compiler بيشيل الكود الميت: [[if (Env.isStaging) {...}]] مش هيبقى موجود في نسخة الإنتاج أصلًا.

[[--dart-define-from-file]] بيقبل JSON أو [[.env]]، وتقدر تكرره. الملفات دي فيها عناوين، ولو فيها حاجة حساسة متعملهاش commit (وفي CI اعملها من secrets).

مهم جدًا: أي قيمة في dart-define موجودة جوه الـ APK وأي حد يقدر يطلّعها. DSN بتاع Sentry عادي (معمول يبقى public)، إنما secret key لأي خدمة (Stripe secret، OpenAI) مكانه السيرفر بس.

الـ flavors على Android: [[productFlavors]] في build.gradle.kts، و [[applicationIdSuffix]] بيخلي الـ id مختلف. و [[resValue("string", "app_name", ...)]] (من AGP 9 لازم معاه [[buildFeatures { resValues = true }]]، وإلا Gradle يقول [[the feature is disabled]]) مع [[android:label="@string/app_name"]] في AndroidManifest بيخلي الاسم مختلف. وأيقونات مختلفة: فولدر [[android/app/src/staging/res/]] بيغطّي على main. و Firebase: [[google-services.json]] في [[src/staging/]] و [[src/production/]].

[[appFlavor]] (من [[package:flutter/services.dart]]) بيرجّع اسم الـ flavor اللي اتبنى بيه، أو null. وتقدر تحط [[default-flavor: staging]] تحت [[flutter:]] في pubspec عشان متكتبش [[--flavor]] كل مرة.

على iOS الـ flavors محتاجة schemes و build configurations في Xcode، ودا شغل أكتر. كتير من الفرق بتكتفي بـ dart-define للعنوان، و flavors على Android بس.`,
            when: "dart-define من أول يوم لأي حاجة بتختلف بين البيئات. و flavors لما تحتاج نسختين متسطبين مع بعض، أو Firebase projects مختلفة، أو نسخة للـ QA باسم مختلف.",
            mistakes: R`تنادي [[String.fromEnvironment]] من غير const فترجع فاضية دايمًا. وتستنى hot reload يغيّر القيمة. وتحط secret key في dart-define وتفتكره مستخبي. وتعمل flavor على Android وتنسى إن [[flutter run]] من غير [[--flavor]] بقى يضرب لو مفيش default-flavor.`
          },
          teach: R`## الكود ده بيعمل إيه؟

بيحط كل الإعدادات اللي بتختلف بين البيئات (عنوان الـ API، و Sentry، وهل دي نسخة staging) في class واحد اسمه [[Env]]، والقيم نفسها مش مكتوبة في الكود: بتيجي من الأمر وقت الـ build. وفي الآخر تعريف flavors على Android عشان نسخة staging تتسطّب جنب الإنتاج.

كل اللي تحت اتشغّل في [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44.0، Dart 3.12.0، Android Gradle Plugin 9.0.1) على مشروع [[flutter create]] اسمه [[shop]]. القيم اتطبعت بـ [[flutter test]] صغير بيطبع كل حقل في [[Env]]، والشاشة اتشافت بـ [[flutter run -d web-server]] و Chrome headless.

---

## ١. الـ imports

~~~text lib/env.dart
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
~~~

- [[foundation.dart]] فيها [[kDebugMode]]: const بيبقى [[true]] في نسخة debug و [[false]] في profile و release.
- [[services.dart]] فيها [[appFlavor]]: اسم الـ flavor اللي التطبيق اتبنى بيه.

---

## ٢. [[String.fromEnvironment]]

~~~text السطر
static const apiUrl = String.fromEnvironment('API_URL', defaultValue: 'http://10.0.2.2:3000');
~~~

نفكّه حتة حتة:

- [[static]]: الحقل بتاع الـ class نفسه، فبتكتب [[Env.apiUrl]] من غير ما تعمل object.
- [[const]]: القيمة بتتحسب **وقت الترجمة** مش وقت التشغيل. دي أهم كلمة في السطر (تحت هنشوف إيه اللي بيحصل من غيرها).
- [[String.fromEnvironment('API_URL', ...)]]: «هات القيمة اللي اسمها [[API_URL]] من الـ defines اللي اتبعتت للـ compiler».
- [[defaultValue:]]: لو محدش بعت [[API_URL]]. و [[10.0.2.2]] هو عنوان جهازك من جوه Android emulator ([[localhost]] جوه الـ emulator هو الـ emulator نفسه).

السطرين اللي بعده نفس الفكرة:

- [[String.fromEnvironment('SENTRY_DSN')]] من غير default: لو مش موجود بيرجّع نص فاضي [[""]]، مش [[null]].
- [[bool.fromEnvironment('STAGING')]]: بيرجّع [[true]] لو القيمة [[true]]، وإلا [[false]]. وفيه [[int.fromEnvironment]] للأرقام.

---

## ٣. الـ getters

~~~text السطرين
static String get flavor => appFlavor ?? 'dev';
static bool get showDebugBanner => kDebugMode || isStaging;
~~~

- [[get]]: getter، يعني حقل بيتحسب كل ما تقراه. و [[appFlavor]] و [[kDebugMode]] نفسهم const جوه Flutter (في السورس: [[const String? appFlavor = String.fromEnvironment('FLUTTER_APP_FLAVOR') != '' ...]])، يعني الـ flavor هو كمان define اسمه [[FLUTTER_APP_FLAVOR]] بيحطه [[--flavor]].
- [[=>]]: اختصار [[{ return ...; }]].
- [[??]]: «لو اللي على الشمال null خد اللي على اليمين». فمن غير flavor بيرجّع [[dev]].
- [[||]]: «أو». البانر يظهر في debug، أو في نسخة staging حتى لو release.

---

## ٤. بتبعت القيم إزاي: ملف JSON

~~~text env/staging.json
{"API_URL": "https://staging-api.example.com", "STAGING": true}
~~~

~~~text env/prod.json
{"API_URL": "https://api.example.com", "SENTRY_DSN": "https://abc@sentry.io/1"}
~~~

كل مفتاح في الملف بيبقى define بنفس الاسم. والـ [[true]] في JSON بيتحول للنص [[true]] اللي [[bool.fromEnvironment]] بيفهمه.

شغّلت نفس الاختبار ٤ مرات: من غير حاجة، وبملف staging، وبملف prod، وبـ [[--dart-define]] مباشرة:

~~~bash
flutter test test/env_test.dart
flutter test test/env_test.dart --dart-define-from-file=env/staging.json
flutter test test/env_test.dart --dart-define-from-file=env/prod.json
flutter test test/env_test.dart --dart-define=API_URL=https://x.test --dart-define=STAGING=true
~~~

~~~text الناتج (مختصر)
== من غير حاجة
apiUrl=http://10.0.2.2:3000
sentryDsn="" isEmpty=true
isStaging=false flavor=dev showDebugBanner=true
== staging.json
apiUrl=https://staging-api.example.com
sentryDsn="" isEmpty=true
isStaging=true flavor=dev showDebugBanner=true
== prod.json
apiUrl=https://api.example.com
sentryDsn="https://abc@sentry.io/1" isEmpty=false
isStaging=false flavor=dev showDebugBanner=true
== --dart-define مرتين
apiUrl=https://x.test
sentryDsn="" isEmpty=true
isStaging=true flavor=dev showDebugBanner=true
~~~

اقرا الناتج:

- من غير أي define: [[apiUrl]] الافتراضي، و [[sentryDsn]] نص فاضي (عشان كده الكود بيسأل [[isNotEmpty]] مش [[!= null]]).
- [[showDebugBanner]] [[true]] في كله، لأن [[flutter test]] شغال debug، فـ [[kDebugMode]] [[true]].
- [[--dart-define=KEY=VALUE]] بيتكرر لكل قيمة. الملف أنضف لما القيم تكتر.

### من غير [[const]]

ضفت للاختبار سطر بينادي [[String.fromEnvironment('API_URL')]] من غير const، جوه string interpolation:

~~~text الناتج حتى مع --dart-define=API_URL=https://x.test
nonConst=""
~~~

فاضي، مع إن [[Env.apiUrl]] في نفس التشغيلة طلع [[https://x.test]]. القيمة موجودة وقت الترجمة بس، والنداء العادي وقت التشغيل مبيلاقيش حاجة.

### على الشاشة، و hot reload

شغّلت [[flutter run -d web-server --web-port 5996 --dart-define-from-file=env/dev.json]] بشاشة بتعرض الحقول، وصوّرتها بـ Chrome headless:

~~~text اللي اتعرض
apiUrl: http://localhost:3000
sentryDsn: ""
flavor: dev
staging: false
~~~

غيّرت [[env/dev.json]] لـ [[http://changed:9999]] وعملت [[r]] (hot reload) و [[R]] (hot restart) وفتحت الصفحة من جديد: لسه [[localhost:3000]]. لما قفلت [[flutter run]] بـ [[q]] وشغّلته تاني، ظهر [[http://changed:9999]]. والسبب باين في الـ process اللي [[flutter run]] بيشغّله للترجمة:

~~~text جزء من سطر الـ frontend server (ps)
... --target=dartdevc ... -DAPI_URL=http://localhost:3000 -DFLUTTER_VERSION=3.44.0 ...
~~~

الـ defines بتتبعت للـ compiler كـ [[-DAPI_URL=...]] مرة واحدة وهو بيبدأ. فأي تغيير محتاج [[flutter run]] جديد.

---

## ٥. الـ flavors في [[build.gradle.kts]]

~~~text android/app/build.gradle.kts جوه android { }
buildFeatures { resValues = true }
flavorDimensions += "default"
productFlavors {
    create("staging") { dimension = "default"; applicationIdSuffix = ".staging"; resValue("string", "app_name", "Shop Staging") }
    create("production") { dimension = "default"; resValue("string", "app_name", "Shop") }
}
~~~

- [[flavorDimensions]]: «محور» الـ flavors. محور واحد اسمه [[default]] كفاية لـ staging و production، و [[+=]] بتضيفه للقايمة.
- [[productFlavors { create("staging") {...} }]]: عرّف flavor اسمه staging، وكل flavor لازم يقول هو على أنهي محور ([[dimension]]).
- [[applicationIdSuffix = ".staging"]]: بيلزق [[.staging]] في آخر الـ applicationId، فيبقى تطبيق تاني في نظر Android.
- [[resValue("string", "app_name", "Shop Staging")]]: بيعمل string resource اسمه [[app_name]] بالقيمة دي للـ flavor ده بس. ولازم في [[AndroidManifest.xml]] تخلي [[android:label="@string/app_name"]].
- [[buildFeatures { resValues = true }]]: من AGP 9 الـ [[resValue]] مقفول افتراضيًا. من غير السطر ده البناء وقع بالرسالة دي:

~~~text الناتج من غير resValues
* What went wrong:
A problem occurred configuring project ':app'.
> Product Flavor staging contains custom resource values, but the feature is disabled.
~~~

بعد إضافته:

~~~bash
flutter build apk --debug --flavor staging --dart-define-from-file=env/staging.json
~~~

~~~text الناتج
Running Gradle task 'assembleStagingDebug'...                     591.6s
✓ Built build/app/outputs/flutter-apk/app-staging-debug.apk
~~~

اسم الـ task [[assembleStagingDebug]]: Gradle بيركّب اسم الـ flavor مع نوع الـ build. والـ ١٠ دقايق دي أول مرة بس (Gradle نزّل نفسه والـ dependencies و CMake)، وبعدها بتبقى أقل بكتير.

واتأكدت من الـ APK بـ [[aapt2 dump badging]] (أداة من Android SDK build-tools بتقرا الـ manifest من جوه الـ APK):

~~~text الناتج
package: name='com.shop.shop.staging' versionCode='1' versionName='1.0.0' ...
application-label:'Shop Staging'
~~~

الـ id بقى [[com.shop.shop.staging]] والاسم [[Shop Staging]]، فيتسطّب جنب [[com.shop.shop]] من غير ما يمسحه.

### [[appFlavor]] و [[default-flavor]]

~~~bash
flutter test --flavor staging test/env_test.dart
~~~

~~~text الناتج
isStaging=false flavor=staging showDebugBanner=true
~~~

[[appFlavor]] رجّع [[staging]]، ومن غير [[--flavor]] كان [[null]] فـ [[Env.flavor]] رجّع [[dev]]. ولما حطيت [[default-flavor: staging]] تحت [[flutter:]] في [[pubspec.yaml]] واتشال [[--flavor]] من الأمر، طلع برضه [[flavor=staging]].

ومن غير [[--flavor]] ومن غير default-flavor، [[flutter build apk --debug]] بنى الـ flavors الاتنين وبعدين وقع:

~~~text الناتج
Gradle build failed to produce an .apk file. It's likely that this file was generated under /w/app/build, but the tool couldn't find it.
~~~

---

## ٦. أوامر البناء في التعليقات

| الأمر | بيعمل إيه |
|---|---|
| [[flutter run --dart-define-from-file=env/staging.json]] | تشغيل للتطوير بقيم staging |
| [[flutter build appbundle --flavor production --dart-define-from-file=env/prod.json]] | AAB الإنتاج: flavor production وقيم prod |

الـ flavor بيحدد **التطبيق** (الـ id والاسم والأيقونة)، والـ dart-define بيحدد **القيم جوه الكود**. الاتنين مستقلين، فلازم تبعت الاتنين.

---

## الخلاصة

- [[String.fromEnvironment]] و [[bool.fromEnvironment]] لازم [[const]]، والقيمة بتتحط وقت الترجمة. من غير const بترجع الافتراضي.
- تغيير قيمة define محتاج [[flutter run]] أو build جديد، مش hot reload ولا hot restart.
- مفتاح مش موجود: [[String]] بيرجّع [[""]]، و [[bool]] بيرجّع [[false]].
- الـ flavor على Android: [[productFlavors]] و [[applicationIdSuffix]]، و [[resValue]] محتاج [[buildFeatures { resValues = true }]] من AGP 9.
- بعد ما تعرّف flavors، كل أمر محتاج [[--flavor]] أو [[default-flavor]] في pubspec.
- أي قيمة في define موجودة جوه التطبيق وتتقري، فمفيش secret keys هنا.`,
          lines: [
            "kDebugMode.",
            "appFlavor.",
            "مكان واحد لكل الإعدادات.",
            "القيمة من [[--dart-define]] أو الملف، وإلا الافتراضي.",
            "من غير افتراضي: نص فاضي لو مش موجود.",
            "bool: false لو مش موجود.",
            "اسم الـ flavor أو dev.",
            "إظهار أدوات التطوير في debug أو staging.",
            "قفلة."
          ],
          sol: R`مع [[--dart-define-from-file=env/dev.json]] الشاشة بتعرض عنوان dev، ومع prod عنوان الإنتاج. تعديل الملف + hot reload: مفيش تغيير، ولا حتى hot restart مضمون. لازم تقفل وتشغّل [[flutter run]] من جديد لأن القيمة اتترجمت جوه الكود.

من غير الملف: [[Env.sentryDsn]] نص فاضي [['']] (مش null)، و [[Env.apiUrl]] القيمة الافتراضية. فاكتب الكود على الأساس ده: [[if (Env.sentryDsn.isNotEmpty) initSentry()]].`
        },
        {
          cmd: "أيقونة و splash",
          title: "أيقونة التطبيق وشاشة البداية بتاعتك بدل لوجو Flutter",
          desc: R`الأيقونة على Android محتاجة ٥ مقاسات + adaptive icon (خلفية وصورة أمامية)، وعلى iOS أكتر من ١٥ مقاس. [[flutter_launcher_icons]] بياخد صورة واحدة ١٠٢٤ في ١٠٢٤ ويولّد الكل. و [[flutter_native_splash]] نفس الفكرة لشاشة البداية (اللي بتظهر لحد ما Flutter يجهز)، ومعاها إعدادات Android 12 اللي ليها قواعد خاصة.

الإعدادات في [[pubspec.yaml]]، وبعدين أمر واحد لكل واحد.`,
          example: R`# flutter pub add dev:flutter_launcher_icons dev:flutter_native_splash
# في آخر pubspec.yaml:
flutter_launcher_icons:
  android: true
  ios: true
  image_path: assets/icon.png
  adaptive_icon_background: "#0F172A"
  adaptive_icon_foreground: assets/icon_foreground.png
  remove_alpha_ios: true
flutter_native_splash:
  color: "#0F172A"
  image: assets/splash.png
  android_12:
    color: "#0F172A"
    image: assets/splash.png
# في الترمنال:
# dart run flutter_launcher_icons
# dart run flutter_native_splash:create`,
          try: "اعمل أيقونة ١٠٢٤ في ١٠٢٤ (ممكن مربع بلون وحرف)، وشغّل الأمرين، وبعدين [[git status]] وشوف الملفات اللي اتغيرت في android و ios و web. اعمل full restart (مش hot reload) وشوف الأيقونة والـ splash. وعلى موبايل Android 12 أو أحدث: الـ splash شكله إيه؟",
          deep: {
            why: "الأيقونة والـ splash أول حاجة المستخدم بيشوفها، و Play Console بيطلب أيقونة. عملهم بإيدك معناه تفتح Android Studio و Xcode وتحط عشرات الصور بمقاسات مختلفة، وتعيد ده كل ما المصمم يغيّر لون.",
            how: R`flutter_launcher_icons بيكتب في [[android/app/src/main/res/mipmap-*]] (المقاسات)، و [[mipmap-anydpi-v26]] (الـ adaptive icon: XML بيقول الخلفية لون كذا والأمامية الصورة دي)، و [[ios/Runner/Assets.xcassets/AppIcon.appiconset]].

adaptive icon (Android 8+): كل موبايل بيقص الأيقونة بشكل مختلف (دايرة، مربع مدوّر، squircle). الصورة الأمامية لازم يبقى المهم فيها في النص (حوالي ٦٦٪ من المساحة)، والباقي ممكن يتقص. عشان كده صورة منفصلة للـ foreground بهوامش شفافة.

[[remove_alpha_ios: true]]: App Store بيرفض أيقونة فيها شفافية.

الـ splash الـ native بيظهر قبل ما Flutter يشتغل (وقت تحميل الـ engine)، فمينفعش يبقى widget. flutter_native_splash بيكتب في [[drawable]] و [[styles.xml]] على Android، و LaunchScreen.storyboard على iOS، و index.html على الويب.

Android 12+ فيه splash API إجباري: أيقونة في دايرة في النص على لون خلفية، ومفيش صورة كاملة الشاشة. عشان كده قسم [[android_12]] منفصل، والصورة فيه بتتقص في دايرة.

لو التطبيق محتاج يحمّل حاجة قبل أول شاشة (توكن، إعدادات): الأحسن تخلي main يعمل ده بسرعة قبل runApp. ولو هياخد وقت، الـ package فيها [[FlutterNativeSplash.preserve()]] و [[remove()]] تخلي الـ splash ظاهر لحد ما تخلص.`,
            when: "مرة قبل أول release، وكل ما الهوية البصرية تتغير. وفي flavors: أيقونة مختلفة لـ staging (نفس الأيقونة وعليها شريط) عشان متتلخبطش بين النسختين.",
            mistakes: R`صورة صغيرة (٥١٢) فالأيقونة تطلع مغبّشة على الشاشات الكبيرة. وصورة foreground من غير هوامش فالـ launcher يقص اللوجو. و hot reload وتستغرب إن الأيقونة متغيرتش: دي ملفات native محتاجة build جديد، وأحيانًا تمسح التطبيق من الموبايل لأن الـ launcher عامل cache. وتنسى [[android_12]] فالـ splash على الموبايلات الجديدة يطلع أيقونة التطبيق على خلفية بيضا.`
          },
          teach: R`## الكود ده بيعمل إيه؟

مفيش كود Dart هنا خالص: إعدادات YAML في آخر [[pubspec.yaml]] لـ package-ين، وكل واحد ليه أمر بيقرا الإعدادات ويكتب ملفات Android و iOS والويب بدالك. اتشغّل كله في [[ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44.0) على مشروع [[shop]] فيه كل المنصات، بصور اتعملت بسكريبت Dart صغير: أيقونة ١٠٢٤ في ١٠٢٤ (دايرة زرقا على خلفية [[#0F172A]])، وصورة أمامية شفافة، وصورة splash.

---

## ١. [[flutter pub add dev:flutter_launcher_icons dev:flutter_native_splash]]

- [[pub add]]: ضيف package لـ pubspec ونزّلها.
- [[dev:]] قبل الاسم: حطها تحت [[dev_dependencies]] مش [[dependencies]]. دي أدوات بتشغّلها انت على جهازك، ومش داخلة في التطبيق اللي بيوصل للمستخدم.

~~~text اللي اتضاف في pubspec.yaml
dev_dependencies:
  ...
  flutter_lints: ^6.0.0
  flutter_launcher_icons: ^0.14.4
  flutter_native_splash: ^2.4.8
~~~

[[^0.14.4]] يعني «0.14.4 أو أحدث من غير ما توصل 0.15».

---

## ٢. قسم [[flutter_launcher_icons:]]

~~~text pubspec.yaml
flutter_launcher_icons:
  android: true
  ios: true
  image_path: assets/icon.png
  adaptive_icon_background: "#0F172A"
  adaptive_icon_foreground: assets/icon_foreground.png
  remove_alpha_ios: true
~~~

| المفتاح | معناه |
|---|---|
| [[android: true]] و [[ios: true]] | ولّد للمنصتين دول |
| [[image_path]] | الصورة الأصلية، ١٠٢٤ في ١٠٢٤ عشان أكبر مقاس مطلوب (أيقونة App Store) |
| [[adaptive_icon_background]] | لون خلفية الـ adaptive icon على Android 8+. لازم بين [[" "]] لأن [[#]] في YAML بداية تعليق |
| [[adaptive_icon_foreground]] | الصورة اللي فوق الخلفية، وفيها هوامش شفافة |
| [[remove_alpha_ios]] | شيل الشفافية من أيقونات iOS لأن App Store بيرفضها |

### الأمر: [[dart run flutter_launcher_icons]]

[[dart run <package>]] بيشغّل البرنامج اللي جوه الـ package (فولدر [[bin/]] فيها).

~~~text الناتج
     FLUTTER LAUNCHER ICONS (v0.14.4)
• Creating default icons Android
• Creating adaptive icons Android
• No colors.xml file found in your Android project
• Creating colors.xml file and adding it to your Android project
• Overwriting the default Android launcher icon with a new icon
• Creating mipmap xml file Android
• Overwriting default iOS launcher icon with new icon
No platform provided

✓ Successfully generated launcher icons
~~~

[[No platform provided]] معناها إن الويب والديسكتوب متطلبوش (مفيش [[web:]] في الإعدادات)، فاتسابوا.

### المقاسات اللي اتعملت على Android

قريت عرض وطول كل [[ic_launcher.png]] من الـ header بتاع الـ PNG:

~~~text الناتج
mipmap-hdpi 72x72
mipmap-mdpi 48x48
mipmap-xhdpi 96x96
mipmap-xxhdpi 144x144
mipmap-xxxhdpi 192x192
~~~

[[mipmap]] فولدر الأيقونات، و [[mdpi]] لحد [[xxxhdpi]] كثافة الشاشة (dpi = dots per inch): [[mdpi]] هو الأساس (48)، و [[xxxhdpi]] أربع أضعافه (192). كل موبايل بياخد الفولدر اللي على قد شاشته. ده سبب الصورة الكبيرة: التصغير من ١٠٢٤ نضيف، والتكبير من ٥١٢ بيغبّش.

### الـ adaptive icon

~~~text mipmap-anydpi-v26/ic_launcher.xml
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
  <background android:drawable="@color/ic_launcher_background"/>
  <foreground>
      <inset
          android:drawable="@drawable/ic_launcher_foreground"
          android:inset="16%" />
  </foreground>
</adaptive-icon>
~~~

- [[anydpi-v26]]: لأي كثافة، من Android 8 (API 26) وفوق. الموبايلات الأقدم بتاخد الـ PNG العادي.
- [[background]]: اللون، و [[@color/ic_launcher_background]] متعرّف في [[values/colors.xml]] اللي الأمر عمله بقيمة [[#0F172A]].
- [[foreground]] مع [[inset="16%"]]: الصورة الأمامية متصغّرة ١٦٪ من كل ناحية، عشان الـ launcher لما يقص دايرة أو squircle ميقصش اللوجو.

---

## ٣. قسم [[flutter_native_splash:]]

~~~text pubspec.yaml
flutter_native_splash:
  color: "#0F172A"
  image: assets/splash.png
  android_12:
    color: "#0F172A"
    image: assets/splash.png
~~~

- [[color]]: لون الشاشة كلها، و [[image]]: صورة في النص. ده للـ Android القديم و iOS والويب.
- [[android_12:]]: قسم تاني لأن Android 12 (API 31) وفوق بيرسم الـ splash بنفسه بقواعده: لون خلفية وأيقونة في دايرة. المسافة قبل [[color]] و [[image]] جوه القسم ده معناها إنهم تبعه.

### الأمر: [[dart run flutter_native_splash:create]]

[[:create]] بعد اسم الـ package معناها «شغّل البرنامج اللي اسمه create جواها».

~~~text الناتج (مختصر)
[Android] Creating default splash images
[Android] Creating default android12splash images
[Android] Creating dark mode android12splash images
[Android] Updating launch background(s) with splash image path...
[Android] Creating android/app/src/main/res/values-v31/styles.xml and adding it to your Android project
[Android] Creating android/app/src/main/res/values-night-v31/styles.xml and adding it to your Android project
[iOS] Creating  images
[iOS] Updating ios/Runner/Info.plist for status bar hidden/visible
[Web] Creating images
[Web] Creating CSS
[Web] Updating index.html

✅ Native splash complete.
~~~

[[values-v31]] يعني «الإعدادات دي لـ API 31 وفوق» (Android 12)، و [[night]] للـ dark mode. وجوه [[values-v31/styles.xml]]:

~~~text جزء من values-v31/styles.xml
<item name="android:windowSplashScreenBackground">#0F172A</item>
<item name="android:windowSplashScreenAnimatedIcon">@drawable/android12splash</item>
~~~

ودول المفتاحين اللي Android 12 بيقراهم: لون الخلفية، والأيقونة اللي في الدايرة.

### على الويب

شغّلت [[flutter run -d web-server]] وصوّرت الصفحة بعد ٣٠٠ مللي ثانية، قبل ما Flutter يخلص تحميل: الشاشة كلها لون [[#0F172A]] والدايرة الزرقا في النص. ده [[<picture id="splash">]] اللي الأمر حطه في [[web/index.html]]، وسكريبت بيشيله أول ما Flutter يرسم أول frame.

---

## ٤. [[git status]]: اتغير إيه؟

عملت commit قبل الأمرين، وبعدهم [[git status --short]] (أول حرف: [[M]] متعدّل، [[??]] ملف جديد Git ميعرفوش):

~~~text الناتج (مختصر)
 M android/app/src/main/res/mipmap-hdpi/ic_launcher.png   (والـ ٤ التانيين)
?? android/app/src/main/res/mipmap-anydpi-v26/
?? android/app/src/main/res/values/colors.xml
 M android/app/src/main/res/drawable/launch_background.xml
 M android/app/src/main/res/values/styles.xml
 M android/app/src/main/res/values-night/styles.xml
?? android/app/src/main/res/values-v31/
?? android/app/src/main/res/values-night-v31/
?? android/app/src/main/res/drawable-xxhdpi/   (وكل الكثافات و night)
 M ios/Runner/Assets.xcassets/AppIcon.appiconset/Contents.json
 M ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-20x20@1x.png   (و ٢٠ مقاس تاني)
 M ios/Runner/Base.lproj/LaunchScreen.storyboard
 M ios/Runner/Info.plist
 M web/index.html
?? web/splash/
~~~

كل ده ملفات native، فـ hot reload مش هيشوفها: لازم build جديد. واعمل commit للملفات دي، هي جزء من المشروع.

### لو منصة ناقصة

نقلت فولدر [[ios]] بره المشروع مؤقتًا وشغّلت أمر الأيقونات تاني، والإعدادات لسه فيها [[ios: true]]:

~~~text الناتج
Unhandled exception:
PathNotFoundException: Cannot open file, path = 'ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-20x20@1x.png' (OS Error: No such file or directory, errno = 2)
~~~

فلو مشروعك من غير iOS خلي [[ios: false]].

---

## الخلاصة

| الخطوة | الأمر أو المفتاح | النتيجة |
|---|---|---|
| ١ | [[flutter pub add dev:...]] | الـ packages في dev_dependencies |
| ٢ | [[flutter_launcher_icons:]] + [[dart run flutter_launcher_icons]] | ٥ مقاسات Android و adaptive icon و ٢١ مقاس iOS |
| ٣ | [[flutter_native_splash:]] + [[dart run flutter_native_splash:create]] | splash لـ Android القديم و Android 12 و iOS والويب |

- صورة ١٠٢٤ في ١٠٢٤، والـ foreground بهوامش لأن الـ launcher بيقص.
- [[android_12]] قسم لوحده لأن Android 12 بيرسم الـ splash بقواعده.
- الألوان بين [[" "]] في YAML.
- الملفات native: build جديد، مش hot reload، وممكن تمسح التطبيق من الموبايل عشان الـ launcher يحدّث الأيقونة.`,
          lines: [
            "إعدادات الأيقونة.",
            "ولّد لـ Android.",
            "ولـ iOS.",
            "الصورة الأساسية (١٠٢٤ في ١٠٢٤).",
            "adaptive icon: لون الخلفية.",
            "والصورة الأمامية بهوامش شفافة.",
            "App Store مش بيقبل شفافية.",
            "إعدادات الـ splash.",
            "لون الخلفية.",
            "الصورة في النص.",
            "Android 12 وأحدث ليهم قواعد خاصة...",
            "...لون...",
            "...وأيقونة في دايرة."
          ],
          sol: R`[[dart run flutter_launcher_icons]] بيطبع [[Successfully generated launcher icons]]، و [[git status]] بيوري ملفات جديدة ومعدّلة في [[android/app/src/main/res/mipmap-*]] و [[mipmap-anydpi-v26/]] و [[ios/Runner/Assets.xcassets/AppIcon.appiconset/]]. والـ splash بيعدّل [[drawable]] و [[values/styles.xml]] و [[values-night]] وفولدرات [[values-v31]] لـ Android 12، و [[web/index.html]].

hot reload مش هيغيّر حاجة: لازم تقفل وتعمل [[flutter run]] (وأحيانًا تمسح التطبيق من الموبايل عشان الـ launcher يحدّث الأيقونة).

على Android 12+: الـ splash أيقونة صغيرة في دايرة في نص الشاشة على اللون بتاع [[android_12]]، مش الصورة الكاملة. ولو مشروعك فيه platform ناقص (عملته بـ [[--platforms android]] بس) والإعدادات فيها [[ios: true]]، الأمر بيضرب [[PathNotFoundException]] على ملفات ios، فخليها false.`
        }
      ]
    }
]);
