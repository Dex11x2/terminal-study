// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("flutter", {
  label: "Flutter و Dart",
  prompt: "$ ",
  lab: R`flutter doctor
flutter create flutter_lab
cd flutter_lab && flutter run`,
  labText: "سطّب Flutter SDK و Android Studio، و flutter doctor يقولك إيه ناقص. دي تقنية مش مستخدمة في مشاريعك لسه، فابدأ من المستوى ١.",
  levels: {"1":["Dart والأساس","لغة Dart، و widgets، و layout، و hot reload"],"2":["التطبيق الحقيقي","لستات و go_router وفورم، و http و JSON، و Riverpod، والتخزين، وربط الـ backend بتاعك"],"3":["الجودة والنشر والانترفيو","الاختبارات، والبيئات، والتوقيع والرفع على Play، والأداء، وأسئلة الانترفيو"]},
  categories: [
    {
      t: "التسطيب وأول تشغيل",
      l: 1,
      n: "Flutter SDK جواه Dart، و flutter doctor بيقولك ناقصك إيه، و hot reload هو اللي بيخلي الشغل سريع",
      items: [
        {
          cmd: "flutter doctor",
          title: "اعرف جهازك ناقصه إيه قبل أول تطبيق",
          desc: R`[[flutter doctor]] بيفحص كل حاجة Flutter محتاجها على جهازك: الـ SDK نفسه، و Android toolchain، و Android Studio، و VS Code، والأجهزة المتوصلة. وقدام كل سطر علامة: سليم، أو ناقص، أو تحذير.

Flutter SDK فولدر واحد جواه أداة [[flutter]] و Dart SDK، فمش محتاج تسطّب Dart لوحده. على ويندوز تقدر تبني Android و Web و Windows، إنما iOS محتاج Mac.

ومش لازم كل السطور تبقى سليمة. اللي يهمك السطور اللي تخص المنصة اللي هتبني ليها: لو هتعمل Android بس، تحذير Visual Studio مش مشكلة.`,
          example: R`flutter --version
dart --version
flutter doctor
flutter doctor -v
flutter doctor --android-licenses
flutter upgrade`,
          try: "شغّل [[flutter doctor]] واقرا كل سطر مش سليم. صلّح Android licenses بالأمر بتاعها، وشغّله تاني لحد ما سطر Android toolchain يبقى سليم.",
          deep: {
            why: "Flutter بيعتمد على أدوات كتير مش بتاعته: Android SDK و JDK و Gradle للأندرويد، و Xcode للـ iOS، و Chrome للويب، و Visual Studio لتطبيقات ويندوز. لو واحدة ناقصة أو نسختها غلط، الـ build بيقع برسالة Gradle طويلة ملهاش علاقة بالمشكلة. doctor بيقولك الناقص في سطر واضح قبل ما تتوه.",
            how: R`Flutter SDK عبارة عن git repo على جهازك. جواه أداة [[flutter]] نفسها (مكتوبة بـ Dart)، و Dart SDK في [[bin/cache/dart-sdk]]، ونسخ جاهزة من الـ engine (الجزء المكتوب بـ C++ اللي بيرسم). عشان كده [[flutter upgrade]] بيحدّث الكل مع بعض.

doctor بيعدّي على قايمة: Flutter نفسه (النسخة والـ channel والمسار)، و Android toolchain (مكان الـ SDK، والـ build-tools، والـ JDK، والرخص)، و Chrome، و Visual Studio (لتطبيقات ويندوز بس)، و Android Studio، و VS Code، والأجهزة المتوصلة، والنت. و [[-v]] بيطبع تحت كل سطر التفاصيل: أنهي Java بيستخدم ومنين.

الـ JDK: Flutter بيستخدم الـ JDK اللي جاي مع Android Studio. ولو عايز غيره: [[flutter config --jdk-dir <path>]].

الـ channel: خليك على stable. الـ beta والـ main للي عايز يجرّب ميزات لسه منزلتش.`,
            when: "أول حاجة بعد التسطيب، وبعد أي تحديث لـ Android Studio أو Flutter، وأول ما build يقع برسالة غريبة.",
            mistakes: R`تحط Flutter SDK في مسار فيه مسافات أو محتاج صلاحيات admin زي [[C:\Program Files]]: حطه في حاجة زي [[C:\dev\flutter]]. ونفس الكلام للمشروع نفسه: مسار فيه حروف عربي (زي فولدر اسمه «اوامر») بيخلي Android Gradle Plugin يرفض يبني على ويندوز برسالة [[non-ASCII characters]]، فخلي مشاريع Flutter في مسار إنجليزي من غير مسافات. وتلاقي نسختين Flutter على الـ PATH: [[where flutter]] (ويندوز) أو [[which flutter]] يقولك أنهي اللي شغالة.`
          },
          lines: [
            "نسخة Flutter والـ channel ونسخة Dart اللي جواه.",
            "Dart جاي مع Flutter، مش محتاج تسطّبه لوحده.",
            "افحص الأدوات كلها وقولي إيه ناقص.",
            "نفس الفحص بالتفاصيل: المسارات والنسخ، ودا اللي تبعته لو بتسأل حد.",
            "وافق على رخص Android SDK (أشهر تحذير في الأول).",
            "حدّث Flutter لآخر نسخة stable."
          ],
          sol: R`أول مرة غالبًا هتلاقي سطر [[Android toolchain]] عليه [[!]] أو [[✗]] ومعاه [[Some Android licenses not accepted]] وتحته الأمر اللي يصلّحها: [[flutter doctor --android-licenses]]. شغّله واكتب [[y]] لكل رخصة. ولو قال [[cmdline-tools component is missing]]، افتح Android Studio ثم SDK Manager ثم تاب SDK Tools وعلّم Android SDK Command-line Tools، وبعدين ارجع للرخص.

النتيجة الصح: [[[✓] Flutter (Channel stable, ...)]] و [[[✓] Android toolchain]] و [[[✓] Connected device]]. والسطور التانية ممكن تفضل [[✗]] عادي: على ويندوز Visual Studio مطلوب لتطبيقات Windows desktop بس، و [[Cannot find Chrome]] يهمك لو هتبني ويب. آخر سطر زي [[Doctor found issues in 2 categories.]]، والمهم مش إن الرقم يبقى صفر، المهم الفئات اللي تخص المنصة بتاعتك.

الغلط الشائع: تطارد كل سطر أحمر لحد الصفر وتسطّب Visual Studio (جيجات كتير) وانت مش هتبني Windows أصلًا. ولو الأمر نفسه قال [['flutter' is not recognized]] أو [[command not found]]، يبقى فولدر [[flutter/bin]] مش على الـ PATH، أو محتاج تفتح ترمنال جديد بعد ما ضفته.`
        },
        {
          cmd: "flutter create",
          title: "مشروع جديد وتعرف كل فولدر فيه لازمته إيه",
          desc: R`[[flutter create my_app]] بيعمل مشروع كامل وفيه تطبيق عدّاد شغال. الكود بتاعك كله في [[lib/]]، ونقطة البداية [[lib/main.dart]]. والـ packages والإعدادات في [[pubspec.yaml]] (زي package.json).

وجنبهم فولدرات [[android/]] و [[ios/]] و [[web/]]: دي مشاريع native حقيقية، Flutter بيحط تطبيقك جواها وقت الـ build. في الأول مش هتلمسها غير في حاجات قليلة (صلاحيات، أيقونة، توقيع).`,
          example: R`flutter create my_app
flutter create --org com.yourname --platforms android,web my_app
flutter create --empty scratch
cd my_app
ls lib test android
flutter pub get`,
          try: "اعمل مشروع بـ [[--empty]] ومشروع عادي، وقارن [[lib/main.dart]] في الاتنين. وبعدين افتح [[pubspec.yaml]] واقرا كل سطر فيه.",
          deep: {
            why: "تطبيق Flutter مش كود Dart بس: محتاج مشروع Gradle للأندرويد، ومشروع Xcode للـ iOS، وصفحة HTML للويب، وكلهم متظبطين على نسخة Flutter اللي عندك. create بيعمل ده كله صح من أول مرة.",
            how: R`أهم الملفات:

[[lib/main.dart]] فيه [[main()]] اللي بتنادي [[runApp]]. أي ملف تاني بتعمله في lib بتستورده بـ [[import 'package:my_app/...']]، و [[my_app]] ده الـ [[name]] اللي في pubspec.

[[pubspec.yaml]] فيه الاسم، والنسخة ([[version: 1.0.0+1]])، ونسخة Dart المسموحة ([[environment: sdk:]])، و [[dependencies]] و [[dev_dependencies]]، وقسم [[flutter:]] للصور والخطوط. و [[pubspec.lock]] فيه النسخ بالظبط (زي package-lock.json) ويتعمله commit في التطبيقات.

[[analysis_options.yaml]] قواعد الـ lint (بيبدأ بـ flutter_lints)، و [[flutter analyze]] بيشغّلها. و [[test/]] فيه اختبار جاهز للعدّاد.

[[android/app/build.gradle.kts]] فيه الـ applicationId والـ minSdk والتوقيع. و [[android/app/src/main/AndroidManifest.xml]] فيه الصلاحيات واسم التطبيق. و [[build/]] و [[.dart_tool/]] متولّدين ومتجاهلين في .gitignore.

[[--org com.yourname]] بيخلي الـ applicationId يبقى [[com.yourname.my_app]]. دا اسم التطبيق للأبد على Play Store، فاختاره صح من الأول.`,
            when: "كل تطبيق جديد. و [[--empty]] لما تجرّب حاجة صغيرة من غير ما تمسح كود العدّاد كل مرة.",
            mistakes: R`اسم فيه شَرطة زي [[my-app]]: الأمر بيرفضه لأن الاسم لازم يبقى Dart identifier، اكتب [[my_app]]. وتسيب الـ org الافتراضي [[com.example]]: Play Console بيرفض أي package بيبدأ بيه، وتغييره بعدين محتاج تعديل في كذا ملف. وتعمل commit لـ [[build/]]، أو تمسح [[pubspec.lock]] كل شوية فالنسخ تتغير من غير ما تاخد بالك.`
          },
          lines: [
            "مشروع جديد فيه تطبيق العدّاد.",
            "حدد الـ org (أول جزء في اسم التطبيق على Play) والمنصات اللي عايزها بس.",
            "مشروع فاضي: main.dart صغير من غير العدّاد والتعليقات، للتجارب.",
            "ادخل المشروع.",
            "الكود، والاختبارات، ومشروع Android.",
            "نزّل الـ packages اللي في pubspec.yaml (زي [[npm install]])."
          ],
          sol: R`[[lib/main.dart]] في مشروع [[--empty]] حوالي ١٦ سطر: [[main]] بتنادي [[runApp(const MainApp())]]، و [[MainApp]] بيرجّع [[MaterialApp]] جواه Scaffold ونص [[Hello World!]] في النص. في المشروع العادي الملف أكتر من ١٢٠ سطر: [[MyApp]] و [[MyHomePage]] (StatefulWidget) و [[_counter]] و [[setState]]، وتعليقات كتير بتشرح كل حاجة. والفرق التاني: مشروع --empty مفيهوش فولدر [[test/]]، والعادي فيه [[widget_test.dart]] بيختبر العدّاد.

في [[pubspec.yaml]] (بعد ما تشيل التعليقات): [[name]] (اسم الـ package اللي بتستخدمه في import)، و [[description]]، و [[publish_to: 'none']] (عشان متنشرهوش على pub.dev بالغلط)، و [[version: 1.0.0+1]] (اسم النسخة + رقم الـ build)، و [[environment: sdk: ^3.x]] (نسخة Dart اللي عندك وقت الإنشاء)، و [[dependencies]] فيها flutter و [[cupertino_icons]]، و [[dev_dependencies]] فيها [[flutter_test]] و [[flutter_lints]]، وآخر حاجة [[uses-material-design: true]]. مشروع --empty مفيهوش cupertino_icons ونسخته [[0.1.0+1]].

الغلط الشائع إنك تفتكر إن --empty «ناقص» ومش هيشتغل: هو نفس المشروع بالظبط بفولدرات android و ios و web، الفرق في main.dart والتعليقات بس.`
        },
        {
          cmd: "flutter run",
          title: "شغّل التطبيق على موبايل أو emulator أو المتصفح",
          desc: R`[[flutter run]] بيبني التطبيق ويسطّبه على الجهاز ويفضل متوصل بيه: اللوج بيظهر في الترمنال، وتقدر تعمل hot reload. لو فيه أكتر من جهاز، [[-d]] بتختار. و [[flutter devices]] بيعرض الموبايلات والـ emulators والمتصفح والويندوز.

أول build للأندرويد بياخد دقايق (Gradle بينزّل حاجات)، وبعد كده ثواني.`,
          example: R`flutter devices
flutter emulators
flutter emulators --launch Pixel_8
flutter run
flutter run -d chrome
flutter run -d emulator-5554
flutter run --release`,
          try: "شغّل مشروع العدّاد على emulator وعلى Chrome في نفس الوقت من ترمنالين. دوس على الزرار كام مرة في كل واحد، ولاحظ إن كل واحد ليه عدّاده.",
          deep: {
            why: "لازم تشوف التطبيق شغال على جهاز حقيقي بسرعة وانت بتكتب. run بيعمل البناء والتسطيب والتوصيل في أمر واحد بدل ما تبني APK وتنقله بإيدك.",
            how: R`فيه ٣ أوضاع بناء:

debug (الافتراضي): Dart بيشتغل بـ JIT (بيترجم وهو شغال)، وفيه assertions وشريط DEBUG فوق، وبيدعم hot reload. بطيء عن قصد، فمتحكمش على أداء التطبيق منه.

profile ([[--profile]]): الكود متترجم AOT زي release بالظبط، بس سايب أدوات قياس الأداء شغالة. دا اللي بتقيس بيه في DevTools. ومش شغال على الـ emulator، محتاج موبايل حقيقي.

release ([[--release]]): AOT، ومضغوط، ومن غير أي أدوات debugging. دا اللي بيتنشر.

AOT يعني Dart بيتحوّل لكود ARM native قبل ما يوصل الموبايل، مش JavaScript جوه WebView زي Capacitor. عشان كده تطبيق Flutter بيبدأ بسرعة ومش محتاج متصفح.

على الأندرويد، run بيشغّل Gradle يبني APK debug، ويسطّبه بـ adb، ويفتح اتصال مع الـ Dart VM اللي جوه التطبيق. نفس [[adb]] اللي في تاب «Desktop و Mobile»، فتقدر تستخدم [[adb devices]] و [[adb logcat]] عادي. والموبايل الحقيقي محتاج Developer options و USB debugging.`,
            when: "طول ما انت بتطوّر: [[flutter run]] في ترمنال، والكود في VS Code (أو زرار Run في VS Code نفسه، بيعمل نفس الحاجة).",
            mistakes: R`تحكم إن التطبيق «تقيل» من debug mode: جرّب [[--profile]] على موبايل حقيقي الأول. والـ emulator على ويندوز بطيء جدًا لأن hardware acceleration مقفول: فعّل Windows Hypervisor Platform من Windows Features. وأكتر من جهاز متوصل فالأمر يسألك كل مرة: استخدم [[-d]].`
          },
          lines: [
            "الأجهزة الجاهزة دلوقتي، وقدام كل واحد الـ id بتاعه.",
            "الـ emulators المتسطّبة (بتعملها من Device Manager في Android Studio).",
            "شغّل emulator بالـ id بتاعه من اللستة.",
            "ابني وشغّل على الجهاز الوحيد المتوصل (أو يسألك تختار).",
            "شغّل على Chrome كموقع.",
            "اختار جهاز معين بالـ id.",
            "نسخة release: سريعة، ومن غير hot reload ولا debugging."
          ],
          sol: R`في الترمنال الأول: [[flutter emulators --launch <id>]] واستنى لحد ما يفتح، وبعدين [[flutter run -d emulator-5554]] (الـ id من [[flutter devices]]). وفي التاني [[flutter run -d chrome]]. كل ترمنال هيقولك [[Flutter run key commands.]] ومعاها قايمة المفاتيح، والـ Chrome هيفتح tab لوحده.

النتيجة: لو دوست ٣ مرات في الـ emulator ومرة في Chrome، الأول يقول 3 والتاني 1. لأن دول تطبيقين منفصلين تمامًا: كل واحد ليه نسخة من الكود متبنية للمنصة بتاعته (APK على الأندرويد، و JavaScript أو WebAssembly في المتصفح)، وكل واحد ليه ذاكرته. مفيش أي state متشاركة بينهم. (وتقدر تعمل ده من ترمنال واحد بـ [[flutter run -d all]]، و r ساعتها بيعمل reload للاتنين.)

المشاكل الشائعة: [[No supported devices connected]] يعني الـ emulator لسه مفتحش أو الـ id غلط، فارجع لـ [[flutter devices]]. وأول build للأندرويد ممكن يقف كذا دقيقة على [[Running Gradle task 'assembleDebug'...]]: دا طبيعي أول مرة، مش معلّق.`
        },
        {
          cmd: "hot reload",
          title: "تشوف تعديلك في ثانية والتطبيق فاضل في نفس الشاشة",
          desc: R`وانت شغّال بـ [[flutter run]] اضغط [[r]] في الترمنال (أو احفظ الملف في VS Code) والتعديل يظهر في أقل من ثانية، والتطبيق فاضل في نفس الشاشة ونفس الـ state: العدّاد لسه على 7. زي Fast Refresh في React.

[[R]] الكبيرة hot restart: بيشغّل الكود من [[main()]] من الأول والـ state بتتصفّر، بس في ثواني. والقاعدة: عدّلت في [[build]] يبقى r. عدّلت في [[main]] أو [[initState]] أو متغير global يبقى R. عدّلت Kotlin أو AndroidManifest أو ضفت plugin يبقى تقفل وتشغّل تاني.`,
          example: R`r        hot reload: inject changed code, rebuild widgets, keep state
R        hot restart: rerun main(), all state resets
h        list every key flutter run understands
d        detach: stop flutter run, leave the app running
q        quit: stop the app and flutter run
Ctrl+S   in VS Code with the Flutter extension: save triggers hot reload`,
          try: "في تطبيق العدّاد، دوس لحد ما يوصل 5، وغيّر [[seedColor]] واضغط r: اللون اتغير والعدّاد لسه 5. غيّر القيمة الأولية للعدّاد من 0 لـ 10 واضغط r: مفيش حاجة حصلت. اضغط R: بدأ من 10.",
          flag: "keys",
          deep: {
            why: "من غير hot reload كل تعديل صغير في لون أو مسافة معناه build وتسطيب ورجوع لنفس الشاشة، يعني دقيقة. في يوم شغل دي ساعات ضايعة. و Flutter مبني من الأول على إن التعديل يظهر في ثانية.",
            how: R`في debug mode الـ Dart VM شغال بـ JIT جوه التطبيق. لما تضغط r، الأداة بتشوف الملفات اللي اتغيرت، وتترجمها، وتبعتها للـ VM. الـ VM بيبدّل تعريفات الدوال والكلاسات وهو شغال، والـ objects الموجودة في الذاكرة زي ما هي. وبعدين Flutter بيعمل rebuild للشجرة كلها، فكل [[build]] بيتنادى تاني بالكود الجديد.

وعشان الـ objects متلمستش: قيم الـ fields في الـ State فاضلة زي ما هي، و [[initState]] مش هيتنادى تاني، والمتغيرات الـ global والـ static بتعتبر state فمش بتتحسب تاني. و [[main()]] مش بيتنادى.

hot restart بيرمي الـ Dart state كله ويشغّل [[main()]] من الأول، بس من غير ما يعيد بناء الجزء الـ native. والـ full restart (q وتشغيل تاني) هو الوحيد اللي بيعيد بناء Kotlin و Swift.

فيه حالات hot reload بيقولك فيها إنه محتاج restart: لو غيّرت enum لـ class أو العكس، أو غيّرت generic type ([[class A<T>]] بقت [[class A<T, V>]]).

وفي release مفيش JIT، فمفيش hot reload خالص: الكود متترجم AOT وثابت.`,
            when: "طول الوقت وانت بتعدّل UI. و R لما تعدّل حاجة بتتنفذ مرة واحدة في الأول، أو لما التطبيق يبان في حالة غريبة بعد reload.",
            mistakes: R`تعدّل القيمة الأولية لمتغير وتضغط r وتفتكر إن الكود مش شغال، وهي بس محتاجة R. وتضيف package فيها كود native (كاميرا، إشعارات) وتعمل hot restart، فيطلعلك [[MissingPluginException]]: الـ plugins الجديدة محتاجة full restart. وتنسى إن الـ state باقية، فتختبر شاشة وهي في حالة مستحيل مستخدم جديد يوصلها.`
          },
          sol: R`التلات خطوات والنتيجة المتوقعة:

١. تغيّر [[seedColor: Colors.deepPurple]] لـ [[Colors.green]] وتضغط r: الترمنال يكتب حاجة زي [[Reloaded 1 of 700 libraries in 400ms]]، والـ AppBar والزرار يبقوا أخضر، والعدّاد لسه 5. لأن اللون جوه [[build]] بتاع MyApp، و reload بيعيد build بالكود الجديد ويسيب الـ State زي ما هي.

٢. تغيّر [[int _counter = 0;]] لـ [[int _counter = 10;]] وتضغط r: الرقم لسه 5. الـ reload نجح فعلًا، بس الـ field ده اتحط مرة واحدة لما الـ State اتعمل، والـ State object القديم لسه عايش بقيمته. مش bug ومش إن الملف متحفظش.

٣. تضغط R: [[Restarted application in ...ms]]، والعدّاد يبدأ من 10 واللون أخضر. الـ State اتعملت من جديد فقرت القيمة الأولية الجديدة. القاعدة اللي تطلع بيها: لو التعديل في حاجة بتتنفذ «مرة واحدة» (قيمة أولية، initState، main)، r مش هتبيّنه ومحتاج R.`
        }
      ]
    },
    {
      t: "Dart: المتغيرات والدوال",
      l: 1,
      n: "لغة شبه TypeScript و Java، بس الـ null مقفول عليه من الأول",
      items: [
        {
          cmd: "مقدمة Dart ودالة main()",
          title: "برنامج Dart بيبدأ منين، وبتطبع وتعرّف متغير بنوعه إزاي؟",
          desc: R`[[Dart]] لغة Google عملتها، وهي اللغة اللي بتكتب بيها تطبيقات [[Flutter]] كلها. كل widget في Flutter هو كود Dart، فلو فهمت أساسيات اللغة الأول، كود Flutter هيبقى مقروء.

كل برنامج Dart بيبدأ من دالة اسمها [[main]]. لما تشغّل الملف، Dart بيدوّر عليها وينفّذ اللي جواها سطر سطر من فوق لتحت. وفي Flutter نفس الكلام: [[main]] هي اللي بتنادي [[runApp]] (درس «runApp»).

الرموز اللي هتشوفها في أول سطر:
• [[void main()]]: [[void]] معناها الدالة مش بترجّع قيمة، و [[()]] مكان الـ parameters (فاضي هنا).
• [[{ }]]: جسم الدالة، كل اللي بينهم بيتنفّذ.
• [[;]]: آخر كل جملة. Dart بيطلّع error لو نسيتها.
• [[//]]: تعليق، Dart بيتجاهل باقي السطر.

[[print()]] بتطبع اللي جواها في الـ console. والنص بين علامتين تنصيص مفردة [['...']] أو مزدوجة [["..."]].

المتغير بتكتب نوعه قبل اسمه:
• [[String]] نص: [['Khaled']].
• [[int]] رقم صحيح: [[5]].
• [[double]] رقم بكسور: [[4.8]].
• [[bool]] صح أو غلط: [[true]] أو [[false]].

وعشان تحط قيمة متغير جوه نص: [[$]] قبل اسمه ([['Hi $name']])، ولو عايز حساب أو أي expression حطه بين [[$__{ }]] ([['$__{count + 1}']]).

الدرس الجاي («final و const») بيوريك إمتى تكتب النوع بنفسك وإمتى تسيب Dart يستنتجه بـ [[var]] و [[final]].`,
          example: R`// كل برنامج Dart بيبدأ من main
void main() {
  print('Hello, Dart!');

  String developer = 'Khaled';
  int appsCount = 5;
  double rating = 4.8;
  bool isAvailable = true;

  print('$developer built $appsCount apps, rating $rating');
  print('Next year: $__{appsCount + 1} apps');
  print('Available: $isAvailable');
}`,
          try: R`افتح [[dartpad.dev]] في المتصفح (مش محتاج تسطّب حاجة)، امسح الكود اللي فيه والصق المثال واضغط Run. بعدين جرّب ٣ حاجات واحدة واحدة وشوف الرسالة اللي تطلع: امسح [[;]] من آخر سطر الـ print الأول، وبعدين غيّر [[int appsCount = 5;]] لـ [[int appsCount = '5';]]، وبعدين غيّر [[appsCount + 1]] لـ [[appsCount * 2]].`,
          flag: "script",
          deep: {
            why: R`في Flutter بتكتب widgets جوه widgets، ولو مش فاهم الـ [[{ }]] والـ [[;]] والأنواع، الأخطاء هتبان كأنها مشاكل Flutter وهي في الحقيقة Dart. وكمان الـ type checker بتاع Dart بيمسك أخطاء زي «حطيت نص في متغير رقم» وانت بتكتب، قبل ما تشغّل التطبيق.`,
            how: R`Dart بيشتغل بطريقتين: وانت بتطوّر بيشغّل الكود بـ JIT (بيترجمه وهو شغال)، ودا اللي بيخلي hot reload يعدّل التطبيق في ثانية من غير ما يبدأ من الأول. ولما تعمل build للنسخة اللي هتنزل على المتجر بيترجمه AOT لـ machine code مرة واحدة قبل التشغيل، فالتطبيق بيفتح أسرع.

[[$]] جوه النص اسمها string interpolation: Dart بيبدّل [[$developer]] بقيمته. من غير الأقواس، [[$]] بتاخد اسم متغير بس، فـ [['$appsCount + 1']] هتطبع «5 + 1» مش 6. عشان كده الحساب لازم [[$__{ }]].`,
            when: R`أول حاجة قبل أي widget. وكل ما تحب تجرب حتة Dart لوحدها (دالة أو حساب) جرّبها في DartPad أو في ملف [[.dart]] تشغّله بـ [[dart run file.dart]].`,
            mistakes: R`تنسى [[;]] فيطلعلك [[Expected to find ';'.]]. تحط نص في متغير [[int]] فيطلعلك error قبل التشغيل. تكتب [[$appsCount + 1]] من غير أقواس وتستغرب إن الحساب متعملش. وتكتب [[Print]] أو [[Main]] بحرف كبير: Dart بيفرّق بين الحروف الكبيرة والصغيرة.`
          },
          lines: [
            R`نقطة البداية: [[void]] = مش بترجّع حاجة، و [[{]] بداية جسم الدالة.`,
            R`أول طباعة. الـ [[;]] بتقفل الجملة.`,
            R`متغير نوعه [[String]] (نص).`,
            R`متغير نوعه [[int]] (رقم صحيح).`,
            R`متغير نوعه [[double]] (رقم بكسور).`,
            R`متغير نوعه [[bool]] (صح أو غلط).`,
            R`[[$]] قبل اسم المتغير بتحط قيمته جوه النص.`,
            R`حساب جوه النص لازم بين [[$__{ }]].`,
            R`الـ bool بيتطبع [[true]] أو [[false]].`,
            R`[[}]] قفلة الدالة: البرنامج خلص.`
          ],
          sol: R`الناتج في DartPad:
[[Hello, Dart!]]
[[Khaled built 5 apps, rating 4.8]]
[[Next year: 6 apps]]
[[Available: true]]

لما تمسح [[;]]: DartPad بيعلّم على السطر بالأحمر والرسالة [[Expected to find ';'.]]، ولو ضغطت Run مفيش ولا سطر بيتطبع، حتى السطور اللي قبل الغلطة. يعني Dart بيفحص الملف كله قبل ما ينفّذ أي حاجة. (لو شغّلت الملف بـ [[dart run]] نفس الغلطة بتظهر بصيغة [[Expected ';' after this.]].)

لما تكتب [[int appsCount = '5';]]: برضه مفيش حاجة بتشتغل، والـ error [[A value of type 'String' can't be assigned to a variable of type 'int'.]] ده الـ type checker: [['5']] نص مش رقم.

ولما تغيّر لـ [[appsCount * 2]]: السطر بيطبع [[Next year: 10 apps]].`
        },
        {
          cmd: "final و const",
          title: "متغير مبيتغيرش، والفرق بين وقت التشغيل ووقت الترجمة",
          desc: R`[[var]] متغير عادي و Dart بيستنتج نوعه ([[var n = 1]] يبقى int للأبد). [[final]] بيتحط مرة واحدة ومش بيتغير، وقيمته ممكن تتحسب وقت التشغيل. [[const]] قيمته لازم تبقى معروفة وقت الترجمة، ودا اللي Flutter بيستفيد منه في الأداء.

القاعدة: اكتب [[final]] في كل حتة، و [[var]] بس لما هتغيّر القيمة، و [[const]] للثوابت الحقيقية وللـ widgets اللي مبتتغيرش.`,
          example: R`void main() {
  var count = 0;
  count++;
  final now = DateTime.now();
  const maxItems = 50;
  String name = 'Ali';
  double price = 9.99;
  final tags = ['a'];
  tags.add('b');
  const days = ['sat', 'sun'];
  // days.add('mon');  runtime error: Unsupported operation
  print('$name paid $__{price * 2} at $now, max $maxItems, $count');
}`,
          try: "شغّل المثال في DartPad (dartpad.dev) أو بـ [[dart run]]. شيل التعليق من [[days.add]] وشوف الـ error. وبعدين جرّب [[const now = DateTime.now();]] وشوف الـ compiler بيقول إيه.",
          flag: "script",
          deep: {
            why: "لو كل متغير ممكن يتغير في أي وقت، لازم تتبّع كل سطر عشان تعرف قيمته. final بيقولك «دا مش هيتغير» فتقرا الكود أسرع، والـ compiler بيمنعك لو غلطت. و const في Flutter بيخلي الـ widget يتعمل مرة واحدة ويتشارك بدل ما يتعمل تاني مع كل rebuild.",
            how: R`Dart لغة statically typed: كل متغير ليه نوع معروف وقت الترجمة، حتى لو كتبت [[var]] (الـ compiler بيستنتجه). الأنواع الأساسية: [[int]] و [[double]] (والاتنين تحت [[num]])، و [[String]]، و [[bool]]، و [[List]] و [[Map]] و [[Set]]. و [[dynamic]] بيقفل الفحص خالص (زي any في TypeScript)، فابعد عنه.

الفرق بين final و const: [[final now = DateTime.now()]] تمام لأن القيمة بتتحسب مرة وقت التشغيل. إنما [[const now = DateTime.now()]] error لأن الوقت مش معروف وقت الترجمة.

و const مش على المتغير بس، على القيمة نفسها: [[const ['sat', 'sun']]] list متجمّدة بالكامل. وأي قيمتين const متطابقتين هما نفس الـ object في الذاكرة، فـ [[identical(const [1], const [1])]] بترجع true.

والفرق عن JavaScript: [[const]] في JS زي [[final]] هنا (المرجع ثابت والمحتوى يتغير). const بتاعة Dart أقوى.

النصوص: [[$name]] للمتغير، و [[$__{user.name}]] لأي expression، وعلامة تنصيص واحدة أو اتنين زي بعض، وتلات علامات لنص على كذا سطر.`,
            when: "final افتراضيًا لأي متغير محلي أو field. و const لأي ثابت (أرقام، ألوان، مسافات) ولأي widget كل اللي جواه ثابت. و var لما القيمة هتتغير فعلًا.",
            mistakes: R`تفتكر إن [[final list]] معناها list متجمّدة، وهي المرجع بس. وتكتب [[dynamic]] أو تسيب النوع يبقى dynamic من غير ما تاخد بالك ([[var x;]] من غير قيمة)، فتخسر فحص الأنواع. وفي الانترفيو: «إيه الفرق بين final و const؟» الإجابة الناقصة «الاتنين مبيتغيروش»، والصح إن const محسوبة وقت الترجمة ومتجمّدة بالكامل ومتشاركة.`
          },
          lines: [
            "نقطة البداية لأي برنامج Dart.",
            "متغير عادي، نوعه int من القيمة، وينفع يتغير.",
            "يزيد واحد.",
            "[[final]]: يتحط مرة واحدة، وقيمته بتتحسب وقت التشغيل.",
            "[[const]]: قيمة ثابتة معروفة وقت الترجمة.",
            "نوع مكتوب صريح بدل var.",
            "رقم عشري.",
            "الـ list نفسها final، بس محتواها يتغير عادي.",
            "فبنضيف عنصر من غير مشكلة.",
            "[[const]] بتجمّد الـ list كلها: أي add هيضرب وقت التشغيل.",
            "[[$name]] جوه النص بتحط القيمة، و [[$__{...}]] لأي expression.",
            "قفلة main."
          ],
          sol: R`المثال زي ما هو بيطبع سطر واحد شبه [[Ali paid 19.98 at 2026-09-29 22:06:10.477578, max 50, 1]] (الوقت هيبقى وقتك انت).

لما تشيل التعليق من [[days.add('mon')]] الكود بيترجم عادي، بس وقت التشغيل بيضرب: [[Unsupported operation: Cannot add to an unmodifiable list]]. يعني const مجمّدة الـ list نفسها، مش المتغير بس. وقارنها بـ [[tags.add('b')]] اللي عدّت عادي لأن final بتثبّت المرجع بس.

و [[const now = DateTime.now();]] مش بيترجم أصلًا: الـ analyzer بيقول [[The constructor being called isn't a const constructor]] و [[Const variables must be initialized with a constant value]]. لأن الوقت مش معروف وقت الترجمة. لو لقيت نفسك بتكتب [[const]] وبيزعّق، غالبًا اللي محتاجه [[final]].`
        },
        {
          cmd: "null safety",
          title: "المتغير ده ممكن يبقى فاضي ولا لأ؟",
          desc: R`في Dart أي نوع مش بيقبل null إلا لو قلت. [[String name]] لازم فيه نص دايمًا، و [[String? name]] ممكن يبقى null. والـ compiler مش هيسيبك تستخدم متغير [[?]] كأنه موجود قبل ما تتأكد.

أدوات التعامل: [[?.]] ينادي لو مش null، و [[??]] قيمة بديلة، و [[??=]] يحط قيمة لو فاضي، و [[!]] «أنا متأكد إنه مش null» (ولو طلع null التطبيق يضرب). و [[late]] يعني «هتتحط بعدين قبل أول استخدام».`,
          example: R`String? findUser(int id) => id == 1 ? 'Ali' : null;

void main() {
  String? name = findUser(2);
  print(name?.length);
  print(name ?? 'Guest');
  if (name != null) print(name.toUpperCase());
  name ??= 'Unknown';
  print(name.length);
  final ali = findUser(1)!;
  print(ali.length);
  late final String token;
  token = 'abc';
  print(token);
}`,
          try: "امسح سطر [[name ??= 'Unknown';]] وشوف الـ compiler بيقول إيه على [[name.length]]. وبعدين غيّر [[findUser(1)!]] لـ [[findUser(5)!]] وشغّل: ده الـ crash اللي ! بيجيبه.",
          flag: "script",
          deep: {
            why: "أشهر crash في أي لغة: «null is not an object» أو NullPointerException، بيحصل في وقت التشغيل عند المستخدم. Dart بتنقل المشكلة لوقت الترجمة: لو ممكن يبقى null لازم تتعامل معاه قبل ما الكود يترجم أصلًا.",
            how: R`من Dart 3 الـ null safety إجباري و sound: لو النوع مش [[?]]، مستحيل القيمة تبقى null وقت التشغيل. والـ compiler بيستفيد من ده ويشيل فحوصات null من الكود المترجم، فالكود أسرع كمان.

[[String?]] في الحقيقة نوع أوسع من [[String]]: يا String يا Null. عشان كده تقدر تحط String في String? بس مش العكس.

flow analysis: لما تكتب [[if (name != null)]] الـ compiler بيعمل «promotion» جوه الـ if ويعامل name كـ String. بيشتغل على المتغيرات المحلية والـ parameters، ومن Dart 3.2 على الـ private final fields. إنما field عام في class مش بيتعمله promotion، لأن ممكن getter أو subclass يرجّع قيمة مختلفة كل مرة. الحل: انسخه في متغير محلي الأول ([[final n = this.name;]]).

[[!]] مش بيحوّل حاجة: بيعمل فحص وقت التشغيل ويرمي error لو null. يعني بترجع للمشكلة القديمة بإيدك.

[[late]] ليه استخدامين: متغير non-nullable هتديله قيمة بعدين (في [[initState]] مثلًا)، أو قيمة تقيلة تتحسب أول مرة تتقري بس ([[late final data = loadBigFile();]]). لو قريته قبل ما يتحط: [[LateInitializationError]].`,
            when: "كل يوم: أي حاجة جاية من API أو من المستخدم ممكن تكون null، فخليها [[?]] واتعامل معاها بـ [[??]] أو if. و late للـ controllers اللي بتتعمل في initState.",
            mistakes: R`تحط [[!]] في كل حتة عشان الـ errors تسكت: كده رجعت الـ crashes، بس المرة دي انت اللي كاتبها. وتستخدم [[late]] لحاجة ممكن فعلًا متتحطش، فالتطبيق يضرب في حالة نادرة: لو ممكن متبقاش موجودة خليها [[?]]. وفي الانترفيو: «إيه الفرق بين [[late String x]] و [[String? x]]؟» late معناه «هتبقى موجودة أكيد قبل الاستخدام، ولو لأ اضرب»، و ? معناه «ممكن فعلًا تبقى فاضية، والكود لازم يتعامل مع ده».`
          },
          lines: [
            "دالة بترجّع [[String?]]: يا نص يا null.",
            "البداية.",
            "[[?]] بعد النوع: المتغير ده مسموح يبقى null.",
            "[[?.]]: لو null يرجّع null بدل ما يضرب. هنا بيطبع null.",
            "[[??]]: لو null خد القيمة اللي بعدها. بيطبع Guest.",
            "جوه الـ if الـ compiler عارف إنه String، فتستخدمه عادي.",
            "[[??=]]: حط القيمة دي لو المتغير فاضي بس.",
            "من هنا name مش null أكيد، فـ [[.length]] من غير ?.",
            "[[!]]: «متأكد إنه مش null». لو طلع null هنا التطبيق يضرب.",
            "ali نوعه String عادي.",
            "[[late]]: المتغير هيتحط بعدين، والفحص بيتأجل لوقت التشغيل.",
            "أول وآخر مرة يتحط فيها (final).",
            "لو قريته قبل ما يتحط هنا الـ compiler هيمسكها (متغير محلي definitely unassigned)، إنما في field أو حالة مش مضمونة هيضرب [[LateInitializationError]] وقت التشغيل.",
            "قفلة."
          ],
          sol: R`المثال الأصلي بيطبع: [[null]] ثم [[Guest]] ثم [[7]] (طول Unknown) ثم [[3]] ثم [[abc]]. ومفيش سطر للـ if لأن name كانت null.

لما تمسح [[name ??= 'Unknown';]] الكود مش بيترجم: [[The property 'length' can't be unconditionally accessed because the receiver can be 'null']] (ولو بـ [[dart run]]: [[Property 'length' cannot be accessed on 'String?' because it is potentially null]]). الـ compiler شايف إن name لسه ممكن تبقى null، وبيقترح [[?.]] أو [[!]]. الصح هنا [[?.]] أو [[??]]، مش [[!]].

ولما تغيّر لـ [[findUser(5)!]] الكود بيترجم عادي، بس وقت التشغيل: [[Null check operator used on a null value]] على السطر ده بالظبط. دا الفرق كله: من غير ! الـ compiler كان هيحميك، ومع ! انت اللي قلت «متأكد» وطلعت مش متأكد.`
        },
        {
          cmd: "named parameters",
          title: "دالة بتاخد arguments بالاسم وبعضها إجباري",
          desc: R`في Dart فيه ٣ أنواع parameters: positional عادية بالترتيب، و named جوه [[{}]] بتتبعت بالاسم ([[greet(name: 'Ali')]])، و optional positional جوه أقواس مربعة. الـ named اختيارية إلا لو كتبت قبلها [[required]]، ولازم يا تبقى [[?]] يا ليها قيمة افتراضية.

دا اللي هتشوفه في كل widget في Flutter: [[Text('Hi', style: ..., maxLines: 2)]]. والـ arrow [[=>]] اختصار لدالة فيها expression واحدة بترجّع قيمتها.`,
          example: R`int add(int a, int b) => a + b;

String greet({required String name, String greeting = 'Hi', int? age}) {
  final suffix = age == null ? '' : ' ($age)';
  return '$greeting, $name$suffix';
}

String shout(String text, [int times = 1]) => text.toUpperCase() * times;

void main() {
  print(add(2, 3));
  print(greet(name: 'Ali'));
  print(greet(age: 30, name: 'Sara', greeting: 'Hello'));
  print(shout('hey', 2));
  final twice = (int x) => x * 2;
  print([1, 2, 3].map(twice).toList());
}`,
          try: "نادي [[greet()]] من غير name وشوف الـ error. وبعدين شيل [[required]] وشوف الـ compiler بيطلب إيه تاني.",
          flag: "script",
          deep: {
            why: "دالة فيها ٥ parameters بالترتيب زي [[createUser('Ali', 30, true, false, null)]] محدش يعرف يقراها: true دي إيه؟ الـ named بتخلي كل قيمة جنبها اسمها، و required بيخلي الـ compiler يمسك لو نسيت واحدة مهمة. ودا السبب إن كل widgets Flutter مكتوبة كده.",
            how: R`قواعد الـ named: اللي من غير [[required]] لازم يبقى ليه default أو نوعه [[?]]، لأن null safety مش هتسمح إنه يفضل من غير قيمة. والقيمة الافتراضية لازم تبقى const.

والفرق عن JavaScript: في JS بتعمل object وتفكّه ([[function greet({ name, age })]])، ودا object حقيقي بيتعمل في الذاكرة. في Dart الـ named parameters جزء من اللغة نفسها، فمفيش object ولا تكلفة، والـ compiler بيفحص الأسماء والأنواع.

الدوال في Dart objects عادية (first-class): تتخزن في متغير، وتتبعت لدالة، وترجع من دالة. ودا اللي بتستخدمه في [[onPressed: () { ... }]] في كل زرار. و closure زي JS: الدالة بتفتكر المتغيرات اللي حواليها.

[[=>]] مش زي JS بالظبط: بعده expression واحدة بس، مش block. [[() => print('x')]] تمام، إنما [[() => { ... }]] معناها حاجة تانية خالص (دالة بترجّع Set أو Map literal)، ودا فخ.`,
            when: "named لأي دالة فيها أكتر من ٢ parameters أو فيها bool. و positional للحاجات الواضحة من غير اسم ([[add(a, b)]]).",
            mistakes: R`تكتب [[() => { setState(...) }]] زي React فتتفاجئ بسلوك غريب أو warning: في Dart يا [[() => setState(...)]] يا [[() { setState(...); }]]. وتنسى إن named من غير required ومن غير default لازم تبقى [[?]]، فالـ compiler يزعّق. وتحط [[required]] على parameter ليه default: دا compile error أصلًا (Required named parameters can't have a default value)، يا required يا default، مش الاتنين.`
          },
          lines: [
            "دالة عادية بـ parameters بالترتيب، و [[=>]] يعني «رجّع القيمة دي».",
            "named جوه [[{}]]: [[name]] إجباري، و [[greeting]] ليه قيمة افتراضية، و [[age]] ممكن null.",
            "لو فيه سن نحطه بين قوسين.",
            "رجّع النص.",
            "قفلة الدالة.",
            "optional positional بين أقواس مربعة: [[times]] ممكن متتبعتش وتبقى 1.",
            "البداية.",
            "5.",
            "Hi, Ali: الباقي خد الافتراضي.",
            "الترتيب مش مهم في الـ named. بيطبع Hello, Sara (30).",
            "HEYHEY.",
            "دالة من غير اسم متخزنة في متغير، زي arrow function في JS.",
            "الدوال بتتبعت لدوال تانية: [2, 4, 6].",
            "قفلة."
          ],
          sol: R`المثال بيطبع: [[5]] ثم [[Hi, Ali]] ثم [[Hello, Sara (30)]] ثم [[HEYHEY]] ثم [[[2, 4, 6]]].

[[greet()]] من غير name مش بيترجم: [[The named parameter 'name' is required, but there's no corresponding argument]]. الغلط اتمسك قبل التشغيل، ودا اللي بيحصل لما تنسى [[child]] أو [[onPressed]] في widget.

ولما تشيل [[required]] من غير ما تغيّر حاجة تانية، الغلط بيتنقل لتعريف الدالة نفسها: [[The parameter 'name' can't have a value of 'null' because of its type, but the implicit default value is 'null']]. يعني الـ compiler بيقولك اختار واحدة من تلاتة: [[required]]، أو قيمة افتراضية ([[String name = 'Guest']])، أو تخلي النوع [[String?]]. ناس كتير بتتوقع إن شيل required هيعدّي عادي ويبقى name فاضي، ودا مش بيحصل مع null safety.`
        },
        {
          cmd: "List و Map و Set",
          title: "القوايم والقواميس والمجموعات وإزاي تلف عليها",
          desc: R`[[List]] زي array في JS، و [[Map]] زي object أو Map (مفتاح وقيمة)، و [[Set]] قيم من غير تكرار. والنوع جوه أقواس: [[List<String>]] و [[Map<String, int>]].

وفيه حاجة هتستخدمها كتير في Flutter: [[if]] و [[for]] جوه الـ list نفسها، و [[...]] (spread) تفك list جوه list. ودي اللي بتبني بيها لستة widgets.`,
          example: R`void main() {
  final names = ['Ali', 'Sara', 'Omar'];
  names.add('Mona');
  final long = names.where((n) => n.length > 3).toList();
  final upper = names.map((n) => n.toUpperCase()).toList();
  final prices = {'tea': 10, 'coffee': 25};
  prices['juice'] = 15;
  print(prices['milk'] ?? 0);
  final tags = ['dart', 'flutter', 'dart'].toSet();
  final isAdmin = true;
  final menu = ['Home', if (isAdmin) 'Admin', for (final n in names) 'User $n', ...long];
  for (final entry in prices.entries) print('$__{entry.key}: $__{entry.value}');
  print('$upper $tags $menu');
}`,
          try: "غيّر [[isAdmin]] لـ false وشوف menu. وبعدين اشيل [[.toList()]] من سطر [[upper]] واطبعه: هتلاقي شكل مختلف (Iterable مش List).",
          flag: "script",
          deep: {
            why: "كل شاشة تقريبًا فيها لستة: منتجات، رسايل، إعدادات. ولازم تفلترها وتحوّلها لـ widgets. الأدوات دي هي اللي هتكتب بيها ده من غير loops طويلة.",
            how: R`[[where]] و [[map]] مش بيرجّعوا List، بيرجّعوا [[Iterable]] lazy: مفيش حاجة بتتحسب لحد ما حد يقرا. عشان كده [[toList()]] في الآخر. ودا مختلف عن JS اللي فيها filter و map بيرجّعوا array على طول. وخد بالك: Iterable لو لفّيت عليه مرتين، الدالة بتتنفذ مرتين.

قراءة مفتاح مش موجود من Map بترجّع null (عشان كده نوع [[prices['tea']]] هو [[int?]] مش int)، مش error. و [[containsKey]] لو محتاج تفرّق بين «مش موجود» و «موجود وقيمته null».

collection if و for: [[if (isAdmin) 'Admin']] جوه الـ list بيحط العنصر لو الشرط صح بس. وفي Flutter بتكتب [[children: [Header(), if (loading) Spinner(), for (final p in products) ProductTile(p)]]] بدل ما تبني list بـ add. ومن Dart 3.8 تقدر تكتب [[?item]] جوه الـ list فيتحط لو مش null بس.

وأهم دوال تانية: [[firstWhere]] و [[any]] و [[every]] و [[fold]] (زي reduce بقيمة بداية) و [[sort]] (بيرتّب في مكانها زي JS).`,
            when: "أي بيانات فيها أكتر من عنصر. و Set لما التكرار ممنوع (tags، ids متختارة)، و Map للبحث بالمفتاح.",
            mistakes: R`تنسى [[toList()]] وتبعت Iterable لحاجة مستنية List فيطلع type error. وتعدّل list وانت بتلف عليها بـ for فيضرب [[Concurrent modification]]. وتستخدم [[list.map(...)]] عشان side effects ([[print]] مثلًا) ومتعملش toList، فمفيش حاجة بتتنفذ أصلًا لأنه lazy: استخدم for أو [[forEach]].`
          },
          lines: [
            "البداية.",
            "List<String>، النوع اتستنتج.",
            "ضيف في الآخر.",
            "[[where]] زي filter في JS، و [[toList()]] عشان ترجع List.",
            "[[map]] بيحوّل كل عنصر.",
            "Map<String, int>.",
            "ضيف أو عدّل مفتاح.",
            "مفتاح مش موجود بيرجّع null، فـ [[??]] تدّي بديل: 0.",
            "Set: dart المكررة بتتشال.",
            "متغير للشرط اللي جاي.",
            "collection if و for و spread جوه الـ list نفسها.",
            "لف على الـ Map مفتاح وقيمة.",
            "[ALI, SARA, OMAR, MONA] و {dart, flutter} والـ menu.",
            "قفلة."
          ],
          sol: R`الأصلي آخر سطر فيه: [[[ALI, SARA, OMAR, MONA] {dart, flutter} [Home, Admin, User Ali, User Sara, User Omar, User Mona, Sara, Omar, Mona]]]. ولما [[isAdmin]] تبقى false، [[Admin]] بتختفي من menu بس والباقي زي ما هو: [[[Home, User Ali, ...]]]. (والـ analyzer ممكن يقولك [[Dead code]] على [['Admin']] لأنه شايف إن الشرط دايمًا false، ودا طبيعي في التجربة دي.)

ولما تشيل [[.toList()]] من سطر upper، نفس الأسماء بتطبع بين أقواس عادية بدل المربعة: [[(ALI, SARA, OMAR, MONA)]]. دا شكل طباعة الـ Iterable: لسه مش List، وكل مرة تلف عليه الـ map بتتنفذ من جديد. لو بعته لحاجة مستنية [[List<String>]] الـ compiler هيرفض.`
        }
      ]
    },
    {
      t: "Dart: الكلاسات والـ async",
      l: 1,
      n: "كل حاجة object، والـ constructors ليها أشكال، والـ async شبه JS بالظبط",
      items: [
        {
          cmd: "class",
          title: "تعمل نوع بيانات خاص بيك بحقوله ودواله",
          desc: R`الـ class بيجمع البيانات والدوال اللي بتشتغل عليها. [[Product(this.name, this.price)]] أقصر constructor: بياخد القيم ويحطها في الـ fields على طول. وأي اسم بيبدأ بـ [[_]] يبقى private على مستوى الملف كله، ومفيش كلمة private.

والـ getter ([[get isCheap]]) قيمة محسوبة بتتقري كأنها field. وكل قيمة في Dart object من class، حتى [[int]] و [[null]].`,
          example: R`class Product {
  Product(this.name, this.price);

  final String name;
  double price;
  int _views = 0;

  bool get isCheap => price < 100;
  int get views => _views;
  void view() => _views++;
}

void main() {
  final p = Product('Mouse', 80)..view()..view();
  p.price = 120;
  print('$__{p.name} cheap=$__{p.isCheap} views=$__{p.views}');
}`,
          try: "ضيف [[toString()]] بـ [[@override]] ترجّع [[Product(Mouse, 120)]] واطبع [[p]] نفسه. وبعدين حاول تعمل [[p.name = 'X']] وشوف الـ error.",
          flag: "script",
          deep: {
            why: "من غير classes بتلف بـ Maps: [[product['price']]] ممكن تكتبها غلط ومحدش يقولك. الـ class بيدّي كل حقل اسم ونوع، والـ compiler يمسك الغلط، والـ editor يكمّل وانت بتكتب. وكل widget في Flutter class.",
            how: R`[[new]] اختيارية ومحدش بيكتبها: [[Product('Mouse', 80)]] كفاية.

الـ fields الـ final لازم تتحط قبل ما جسم الـ constructor يبدأ، يا بـ [[this.x]] يا في initializer list (الدرس الجاي). ودا اللي بيضمن إن [[final String name]] مستحيل يبقى null.

الـ privacy في Dart على مستوى الـ library (الملف)، مش الـ class. يعني أي كود في نفس الملف يقدر يقرا [[_views]]، وأي ملف تاني لأ. عشان كده الـ State في Flutter اسمها [[_CounterState]]: محدش بره الملف يحتاجها.

الـ cascade [[..]] بينادي على نفس الـ object ويرجّع الـ object مش نتيجة الدالة. هتشوفه في [[Paint()..color = Colors.red..strokeWidth = 2]].

كل class بيورث من [[Object]] ضمنيًا، وتقدر تعمل [[extends]] لوراثة واحدة، و [[implements]] لأي عدد interfaces (أي class ينفع يبقى interface)، و [[with]] للـ mixins. ومن Dart 3 فيه modifiers زي [[sealed]] و [[final class]] و [[interface class]] بتتحكم مين يورث.

ومن Dart 3.13 فيه primary constructors: [[class Point(final int x, final int y);]] بتعرّف الـ fields والـ constructor في سطر. هتلاقيها في كود جديد، بس معظم الكود والأمثلة لسه بالشكل العادي.`,
            when: "أي بيانات ليها شكل ثابت: موديل جاي من API، أو إعدادات، أو حالة شاشة. وكل widget هتكتبه.",
            mistakes: R`تحط [[_]] وتفتكر إن ملف تاني في نفس الفولدر هيشوفه: لأ، الـ privacy بالملف. وتخلي كل الـ fields مش final فأي حتة تعدّل فيها وتتوه مين غيّر إيه: خليها final وغيّر بنسخة جديدة ([[copyWith]]). وتنسى [[@override]] وانت بتعيد تعريف method، فلو كتبت الاسم غلط بتعمل method جديدة من غير ما تاخد بالك.`
          },
          lines: [
            "تعريف class.",
            "constructor: [[this.name]] بتحط الـ argument في الـ field على طول.",
            "field مبيتغيرش بعد الإنشاء.",
            "field يتغير.",
            "[[_]] في الأول = private على مستوى الملف.",
            "getter: قيمة محسوبة بتتقري من غير أقواس.",
            "getter بيطلّع الـ private field للقراءة بس.",
            "method بتزوّد العدّاد.",
            "قفلة الـ class.",
            "البداية.",
            "اعمل object من غير new، و [[..]] (cascade) بينادي method على نفس الـ object ويرجّعه هو.",
            "عدّل الـ field اللي مش final.",
            "Mouse cheap=false views=2.",
            "قفلة."
          ],
          sol: R`بعد ما تضيف [[toString]] و [[print(p)]]، الناتج: [[Mouse cheap=false views=2]] ثم [[Product(Mouse, 120.0)]]. لاحظ [[120.0]] مش 120: price نوعه double، و [[dart run]] بيطبع الـ double بالعلامة العشرية. (في DartPad ممكن يطلع 120 لأنه بيشتغل على JavaScript ومفيهاش فرق بين int و double.) لو عايزها 120 بالظبط: [[price.toStringAsFixed(0)]].

ومن غير toString كان هيطبع [[Instance of 'Product']]، ودا الشكل اللي هتشوفه في اللوج لأي class مش عامل override.

و [[p.name = 'X']] مش بيترجم: [['name' can't be used as a setter because it's final]]. و [[@override]] مهم: لو كتبت [[tostring]] غلط من غيره هتعمل method جديدة ساكتة، ومعاه الـ analyzer بيقولك إن مفيش حاجة في الأب بالاسم ده.`,
          solCode: R`class Product {
  Product(this.name, this.price);

  final String name;
  double price;
  int _views = 0;

  bool get isCheap => price < 100;
  int get views => _views;
  void view() => _views++;

  @override
  String toString() => 'Product($name, $__{price.toStringAsFixed(0)})';
}

void main() {
  final p = Product('Mouse', 80)..view()..view();
  p.price = 120;
  print(p); // Product(Mouse, 120)
  // p.name = 'X'; // error: 'name' can't be used as a setter because it's final
}`
        },
        {
          cmd: "named و factory",
          title: "أكتر من طريقة تعمل بيها object من نفس النوع",
          desc: R`الـ class يقدر يبقى ليه constructors بأسماء: [[User.guest()]] و [[User.fromJson(json)]]. والـ initializer list بعد [[:]] بتحط قيم الـ fields قبل ما جسم الـ constructor يشتغل.

و [[factory]] constructor مش لازم يعمل object جديد: ممكن يرجّع واحد من cache، أو subclass، أو يحسب حاجات قبل ما ينادي الـ constructor الحقيقي. ودا الشكل اللي بيتكتب بيه [[fromJson]] في كل تطبيق.`,
          example: R`class User {
  const User(this.name, this.age);
  const User.guest() : this('Guest', 0);
  User.adult(this.name) : age = 18;

  factory User.fromJson(Map<String, dynamic> json) {
    return User(json['name'] as String, json['age'] as int);
  }

  final String name;
  final int age;
}

void main() {
  const g = User.guest();
  final u = User.fromJson({'name': 'Ali', 'age': 30});
  print('$__{g.name} $__{u.name} $__{User.adult('Sara').age}');
}`,
          try: "ابعت [[{'name': 'Ali', 'age': '30'}]] (السن نص) لـ fromJson وشوف الـ error بيقول إيه. وبعدين ضيف [[toJson()]] بترجّع Map.",
          flag: "script",
          deep: {
            why: "object واحد بيتعمل من أماكن مختلفة: من فورم، أو من JSON جاي من API، أو بقيم افتراضية. بدل constructor واحد فيه ١٠ parameters اختيارية وشروط، كل طريقة ليها اسم واضح.",
            how: R`ترتيب إنشاء الـ object: الأول الـ initializer list (والـ [[this.x]])، وبعدين constructor الأب (super)، وبعدين جسم الـ constructor. الـ fields الـ final لازم تتحط قبل الجسم، عشان كده مينفعش تكتب [[age = 18;]] جوه الجسم لـ field final.

[[factory]] مفيهوش [[this]]: مفيش object اتعمل لسه، وهو لازم يرجّع object بنفسه. عشان كده ينفع:
- يرجّع من cache: [[factory Logger(String name) => _cache.putIfAbsent(name, () => Logger._internal(name));]]
- يرجّع subclass حسب البيانات ([[Shape.fromJson]] يرجّع Circle أو Square).
- يعمل validation أو parsing قبل الإنشاء، زي fromJson.

[[const]] constructor: كل الـ fields لازم final، ومفيش جسم. ولما تناديه بـ const بقيم ثابتة، Dart بيعمل object واحد بس في الذاكرة لأي استدعاء بنفس القيم. ودا نفس اللي بيحصل في [[const Text('Hi')]].

في Dart 3 تقدر تكتب fromJson بـ pattern matching بدل [[as]]، ودا اللي docs Flutter بتستخدمه دلوقتي (درس «fromJson و toJson» في المستوى ٢).`,
            when: "fromJson و toJson في أي موديل جاي من API. و named constructors لحالات جاهزة (empty، guest، initial). و factory لـ singleton أو cache.",
            mistakes: R`تكتب [[json['age']]] من غير [[as int]] فالنوع يفضل dynamic ويعدّي أي حاجة لحد ما يضرب بعيد عن مكان الغلط. وتفتكر إن [[factory]] لازم يرجّع object جديد. وتخلي field مش final وتستغرب إن const constructor مش راضي.`
          },
          lines: [
            "class فيه كذا constructor.",
            "الأساسي، و const عشان كل الـ fields final.",
            "named constructor بيحوّل (redirect) للأساسي بقيم ثابتة.",
            "initializer list بعد [[:]]: بتحط age قبل الجسم.",
            "factory: بيقرا Map ويقرر هو هيرجّع إيه.",
            "[[as]] بيأكد النوع، ولو غلط يرمي error واضح.",
            "قفلة الـ factory.",
            "حقل الاسم.",
            "حقل السن. كلهم final فينفع const constructor.",
            "قفلة الـ class.",
            "البداية.",
            "object ثابت وقت الترجمة.",
            "من Map (زي JSON بعد ما يتفك).",
            "Guest Ali 18.",
            "قفلة."
          ],
          sol: R`لما تبعت [[{'name': 'Ali', 'age': '30'}]] الكود بيترجم عادي (لأن القيم dynamic)، ووقت التشغيل بيضرب جوه fromJson بالظبط: [[type 'String' is not a subtype of type 'int' in type cast]]، والـ stack بيشاور على سطر [[json['age'] as int]]. دا اللي [[as]] بيعمله: بيوقّف الغلط عند الباب بدل ما القيمة الغلط تدخل التطبيق وتضرب بعدين في حتة ملهاش علاقة. ولو الـ API فعلًا بيبعت السن نص، الحل [[int.parse(json['age'] as String)]]، مش إنك تشيل الـ as.

و toJson بترجّع Map بنفس المفاتيح اللي fromJson بيقراها، فـ [[print(u.toJson())]] يطبع [[{name: Ali, age: 30}]]. الغلط الشائع إنك تكتب المفاتيح بشكل مختلف في الاتجاهين ([[userName]] هنا و [[name]] هناك) فالبيانات تروح وترجع ناقصة.`,
          solCode: R`class User {
  const User(this.name, this.age);
  const User.guest() : this('Guest', 0);
  User.adult(this.name) : age = 18;

  factory User.fromJson(Map<String, dynamic> json) {
    return User(json['name'] as String, json['age'] as int);
  }

  Map<String, dynamic> toJson() => {'name': name, 'age': age};

  final String name;
  final int age;
}

void main() {
  final u = User.fromJson({'name': 'Ali', 'age': 30});
  print(u.toJson()); // {name: Ali, age: 30}
  User.fromJson({'name': 'Ali', 'age': '30'});
  // Unhandled exception: type 'String' is not a subtype of type 'int' in type cast
}`
        },
        {
          cmd: "records و patterns",
          title: "ترجّع أكتر من قيمة وتفكّها وتختار حسب شكل البيانات",
          desc: R`من Dart 3 الدالة تقدر ترجّع record: [[(double, double)]] أو بأسماء [[({int total, int done})]]، من غير ما تعمل class عشان حاجة صغيرة. وتفكّها على طول: [[final (lat, lng) = location();]].

والـ patterns بتخليك تسأل عن شكل البيانات: [[switch]] كـ expression بترجّع قيمة، وكل case بيفحص النوع والقيم ويطلّع متغيرات. ومع [[sealed class]] الـ compiler بيتأكد إنك غطّيت كل الحالات.`,
          example: R`(double, double) location() => (30.04, 31.23);

sealed class Result {}
class Ok extends Result { Ok(this.data); final String data; }
class Failure extends Result { Failure(this.code); final int code; }

String describe(Result r) => switch (r) {
  Ok(:var data) => 'got $data',
  Failure(code: 404) => 'not found',
  Failure(:var code) when code >= 500 => 'server error $code',
  Failure() => 'failed',
};

void main() {
  final (lat, lng) = location();
  final stats = (total: 10, done: 4);
  print('$lat $lng $__{stats.total - stats.done} $__{describe(Failure(503))}');
}`,
          try: "امسح سطر [[Failure() => 'failed']] وشوف الـ compile error. وبعدين ضيف [[class Loading extends Result {}]] وشوف الـ compiler بيطلب منك تضيف حالة.",
          flag: "script",
          deep: {
            why: "قبل Dart 3 لو دالة محتاجة ترجّع قيمتين كنت بتعمل class أو ترجّع List وتفتكر مين فين. ولو عندك حالات (نجاح، فشل، تحميل) كنت بتكتب if و is و cast، وتنسى حالة. records و patterns بيحلّوا الاتنين، والـ compiler بيمسك الحالة المنسية.",
            how: R`الـ record قيمة immutable ليها شكل ثابت: الـ positional بتتقري بـ [[$1]] و [[$2]]، والـ named بأسمائها. واتنين records بنفس الشكل والقيم بيبقوا [[==]] لوحدهم، من غير ما تكتب [[operator ==]]. مناسب لقيم صغيرة بترجع من دالة، مش بديل لموديل مستخدم في التطبيق كله.

الـ patterns بتشتغل في كذا مكان:
- فك في تعريف: [[final (lat, lng) = location();]] أو [[final (:total, :done) = stats;]].
- [[switch]] statement أو expression: كل case pattern، وأول واحد يطابق يكسب.
- [[if (json case {'name': String name})]]: يطابق شكل الـ Map ونوع القيمة ويطلّع name في نفس الخطوة. لو المفتاح مش موجود أو النوع غلط، الشرط false بس، مفيش exception.

exhaustiveness: مع [[sealed class]] أو enum أو bool، الـ compiler بيعرف كل الاحتمالات. switch expression لازم يغطي الكل، ولو ضفت subclass جديد لـ Result (زي Loading)، كل switch مش مغطيه هيطلّع compile error. ودا بالظبط اللي بتحتاجه في state الشاشة: loading و data و error.

والـ [[_]] pattern بيطابق أي حاجة (default). ومن Dart 3.7 [[_]] كمان wildcard في الـ parameters: [[(_, _) => ...]] من غير تعارض أسماء.`,
            when: "دالة بترجّع قيمتين أو تلاتة مرتبطين. و state ليها حالات محددة (sealed). وقراءة JSON بشكل آمن (if-case أو switch على الـ Map).",
            mistakes: R`تستخدم records لموديل كبير متشارك في التطبيق كله: مفيش methods ولا اسم للنوع في رسايل الـ errors، اعمل class. وتكتب [[_]] في switch على sealed class فتقفل فحص الـ exhaustiveness بإيدك، وأي حالة جديدة هتعدّي من غير ما تاخد بالك. وتنسى إن ترتيب الـ cases مهم: [[Failure()]] لو جه قبل [[Failure(code: 404)]] هياكله.`
          },
          lines: [
            "الدالة بترجّع record فيه رقمين، من غير class.",
            "[[sealed]]: الـ subclasses كلها لازم تبقى في نفس الملف، فالـ compiler عارفهم كلهم.",
            "نجاح ومعاه بيانات.",
            "فشل ومعاه كود.",
            "switch كـ expression بترجّع String.",
            "لو Ok، طلّع الـ data في متغير.",
            "لو Failure والكود 404 بالظبط.",
            "لو Failure والكود 500 أو أكتر ([[when]] شرط زيادة).",
            "أي Failure تاني. لو شلت السطر ده الكود مش هيترجم، لأن فيه حالة ناقصة.",
            "قفلة الـ switch.",
            "البداية.",
            "فك الـ record لمتغيرين في سطر.",
            "record بأسماء: [[stats.total]] بدل [[$1]].",
            "30.04 31.23 6 server error 503.",
            "قفلة."
          ],
          sol: R`لما تمسح [[Failure() => 'failed']] الكود مش بيترجم: [[The type 'Result' isn't exhaustively matched by the switch cases since it doesn't match the pattern 'Failure(code: int())']]. الـ compiler لقى Failure بكود زي 400 مش داخل في 404 ولا في [[>= 500]]، وبيقولك بالظبط أنهي شكل ناقص. لاحظ إن [[when]] مش بيتحسب في الـ exhaustiveness، فالحالة اللي فيها when لوحدها مش بتغطي Failure.

ولما تضيف [[class Loading extends Result {}]]: [[... doesn't match the pattern 'Loading()']]. تصلّحه بـ [[Loading() => 'loading...']]. وده بالظبط اللي بتستفيده من sealed: كل switch في التطبيق مش مغطي الحالة الجديدة هيقف لحد ما تصلّحه. الغلط الشائع إنك تسكّته بـ [[_ => '']]، وساعتها أي حالة جديدة بعد كده هتعدّي من غير ما حد ياخد باله.`,
          solCode: R`sealed class Result {}
class Ok extends Result { Ok(this.data); final String data; }
class Failure extends Result { Failure(this.code); final int code; }
class Loading extends Result {}

String describe(Result r) => switch (r) {
  Ok(:var data) => 'got $data',
  Failure(code: 404) => 'not found',
  Failure(:var code) when code >= 500 => 'server error $code',
  Failure() => 'failed',
  Loading() => 'loading...',
};

void main() => print(describe(Loading())); // loading...`
        },
        {
          cmd: "async و await",
          title: "تستنى نتيجة بطيئة من غير ما الشاشة تهنج",
          desc: R`[[Future<T>]] هو Promise بتاع Dart: قيمة هتيجي بعدين (رد API، قراءة ملف). والدالة اللي فيها [[async]] بترجّع Future، وجواها [[await]] بيستنى من غير ما يوقّف التطبيق. والأخطاء بـ [[try]] و [[on]] و [[catch]] عادي، زي الكود الـ sync بالظبط.

Dart شغال على thread واحد (event loop زي JS)، فالـ await مش بيوقّف الرسم: الشاشة بتفضل ترد لحد ما النتيجة توصل.`,
          example: R`Future<String> fetchName(int id) async {
  await Future.delayed(const Duration(seconds: 1));
  if (id < 0) throw FormatException('bad id', id);
  return 'User $id';
}

Future<void> main() async {
  final name = await fetchName(1);
  final both = await Future.wait([fetchName(2), fetchName(3)]);
  print('$name $both');
  try {
    await fetchName(-1);
  } on FormatException catch (e) {
    print('error: $__{e.message} ($__{e.source})');
  }
}`,
          try: "بدّل [[Future.wait]] بـ await لكل واحد ورا التاني واحسب الوقت بـ [[Stopwatch]]: ثانيتين بدل ثانية. وبعدين شيل await من [[fetchName(1)]] واطبع name.",
          flag: "script",
          deep: {
            why: "طلب API ممكن ياخد ثانيتين. لو الكود وقف يستنى، الشاشة هتقف ومش هترد على اللمس، وأندرويد ممكن يقولك «التطبيق مش بيستجيب». الـ Future بيخلي الشغل البطيء يستنى على جنب والـ UI شغال.",
            how: R`Dart شغال بـ event loop على isolate واحد (الـ main isolate)، زي JS. الـ await بيقسم الدالة: اللي قبله بيتنفذ، وبعدين الدالة بتسيب الـ event loop يشتغل (يرسم frames ويرد على اللمس)، ولما الـ Future يخلص الباقي بيتحط في الطابور ويكمّل.

فيه طابورين: microtask queue (بيخلص الأول دايمًا، وفيه تكملة الـ Futures)، و event queue (timers و I/O واللمس). عشان كده [[Future.delayed(Duration.zero)]] مش بيتنفذ «دلوقتي»، بيروح آخر الطابور.

الفرق عن JS: [[then]] و [[catchError]] موجودين زي Promise، بس اكتب async و await دايمًا. و [[Future.wait]] زي Promise.all. ومن Dart 3 فيه كمان [[await (f1(), f2()).wait]] بيرجّع record بأنواع مختلفة.

async مش threads: لو عملت loop تقيلة (parse JSON ضخم، معالجة صورة) جوه async، هتوقّف الـ UI برضه، لأن الكود نفسه على نفس الـ thread. الحل [[Isolate.run(() => heavyWork())]] (أو [[compute]] في Flutter) بيشغّلها على isolate تاني بذاكرة منفصلة.

وخد بالك: Future من غير await ومن غير catch، لو فشل، الـ error بيطلع «unhandled» في اللوج والكود اللي بعده كمّل كأن مفيش حاجة. الـ lint [[unawaited_futures]] بيمسكها.`,
            when: "أي حاجة بتاخد وقت: شبكة، ملفات، قاعدة بيانات، تخزين. وفي Flutter بتنادي الـ async في initState أو في onPressed، ومش جوه build.",
            mistakes: R`تنسى [[await]] فالمتغير يبقى [[Future<String>]] مش String، وتطبعه تلاقي [[Instance of 'Future<String>']]. وترمي [[ArgumentError]] أو تمسك بـ [[catch (e)]] عام: دا Error يعني bug، والـ catch العام بيبلع الـ bugs مع الأخطاء المتوقعة، فارمي Exception وامسكه بـ [[on]] (درس try و on و rethrow). وتعمل await ورا بعض لحاجات مستقلة (٣ طلبات = ٣ ثواني) بدل Future.wait (ثانية). وبعد await في Flutter تستخدم [[context]] والشاشة ممكن تكون اتقفلت: اسأل [[if (!context.mounted) return;]] الأول.`
          },
          lines: [
            "دالة async بترجّع Future<String>.",
            "استنى ثانية (زي طلب شبكة). [[const Duration]] عشان القيمة ثابتة.",
            "الـ throw جوه async بيتحوّل لـ Future فاشل. و FormatException نوع Exception (حالة متوقعة)، مش Error.",
            "الـ return بيبقى قيمة الـ Future.",
            "قفلة.",
            "main نفسها ينفع تبقى async.",
            "[[await]]: استنى النتيجة. ثانية.",
            "[[Future.wait]]: الاتنين مع بعض، فثانية مش اتنين.",
            "User 1 [User 2, User 3].",
            "الأخطاء بتتمسك عادي.",
            "await على Future هيفشل.",
            "[[on FormatException]]: امسك النوع اللي متوقعه بس، والباقي يطلع لفوق.",
            "error: bad id (-1).",
            "قفلة try.",
            "قفلة main."
          ],
          sol: R`مع [[Future.wait]] الاتنين بياخدوا حوالي [[1000ms]] (الـ Stopwatch طلّع 1007 عندي)، ولما تكتب await لكل واحد ورا التاني بياخدوا حوالي [[2000ms]]. لأن Future.wait بيبدأ الطلبين مع بعض ويستنى الأبطأ، إنما await ورا await بيبدأ التاني بعد ما الأول يخلص. والناتج نفسه واحد في الحالتين: [[[User 2, User 3]]].

ولما تشيل await من [[fetchName(1)]] وتطبع name: [[Instance of 'Future<String>']]. الكود بيترجم عادي والـ analyzer مش بيعترض، لأن تخزين Future في متغير كلام صح. المشكلة إنك فاكر إنه String. لو حاولت تعمل [[name.length]] ساعتها بس الـ compiler هيقولك إن Future مفيهوش length.`,
          solCode: R`Future<String> fetchName(int id) async {
  await Future.delayed(const Duration(seconds: 1));
  return 'User $id';
}

Future<void> main() async {
  final sw = Stopwatch()..start();
  final both = await Future.wait([fetchName(2), fetchName(3)]);
  print('wait: $both $__{sw.elapsedMilliseconds}ms'); // ~1000ms

  sw.reset();
  final a = await fetchName(2);
  final b = await fetchName(3);
  print('sequential: $__{[a, b]} $__{sw.elapsedMilliseconds}ms'); // ~2000ms

  final name = fetchName(1); // من غير await
  print(name); // Instance of 'Future<String>'
}`
        },
        {
          cmd: "Stream",
          title: "قيم كتير بتوصل على مراحل مش قيمة واحدة",
          desc: R`الـ Future قيمة واحدة بتيجي مرة. الـ [[Stream<T>]] سلسلة قيم بتيجي على مدار الوقت: رسايل chat، أو موقع GPS، أو تقدّم رفع ملف، أو تغييرات قاعدة بيانات realtime.

بتسمع عليه بـ [[listen]] (وتقفل الاشتراك بـ [[cancel]])، أو بـ [[await for]] جوه دالة async. وتعمل stream بنفسك بدالة [[async*]] و [[yield]]، أو بـ [[StreamController]]. وفي Flutter بتعرضه بـ [[StreamBuilder]].`,
          example: R`import 'dart:async';

Stream<int> countdown(int from) async* {
  for (var i = from; i >= 0; i--) {
    await Future.delayed(const Duration(milliseconds: 300));
    yield i;
  }
}

Future<void> main() async {
  await for (final n in countdown(3)) print(n);
  final controller = StreamController<String>();
  final sub = controller.stream.listen((msg) => print('got $msg'));
  controller.add('hello');
  await controller.close();
  await sub.cancel();
}`,
          try: "اعمل listen تاني على [[controller.stream]] وشوف الـ error. وبعدين غيّره لـ [[StreamController<String>.broadcast()]] وجرّب تاني.",
          flag: "script",
          deep: {
            why: "فيه بيانات مش بتيجي مرة وخلاص: رسايل جديدة، ومكان المستخدم بيتحرك، وحالة تسجيل الدخول بتتغير. لو استخدمت Future هتضطر تسأل كل شوية (polling). الـ Stream بيقولك أول ما حاجة تتغير.",
            how: R`نوعين streams: single-subscription (الافتراضي) ينفع يتسمع مرة واحدة بس، ولو حد تاني عمل listen هيضرب [[Bad state: Stream has already been listened to]]. و broadcast ([[StreamController.broadcast()]] أو [[stream.asBroadcastStream()]]) أي عدد يسمع، بس اللي يشترك متأخر مش بياخد القديم.

الـ subscription بيفضل شغال لحد ما الـ stream يخلص أو تعمل [[cancel]]. في Flutter لو عملت listen في initState ونسيت cancel في dispose، الـ callback هيفضل يتنادى بعد ما الشاشة تتقفل، و [[setState]] هيضرب [[setState() called after dispose()]]، ودا memory leak.

الـ Stream ليه دوال زي List: [[map]] و [[where]] و [[take]] و [[distinct]]، وكلها بترجّع stream جديد. و [[await for]] بيوقف الدالة لحد ما الـ stream يخلص، فلو stream مبيخلصش (زي حالة تسجيل الدخول) الكود اللي بعده مش هيتنفذ أبدًا.

في Flutter، [[StreamBuilder(stream: ..., builder: (context, snapshot) => ...)]] بيعمل listen و cancel لوحده ويعيد البناء مع كل قيمة جديدة. وأمثلة حقيقية: [[FirebaseAuth.instance.authStateChanges()]]، و realtime في [[supabase_flutter]]، و [[onConnectivityChanged]] في connectivity_plus.`,
            when: "بيانات realtime، أو أحداث متكررة (sensors، موقع)، أو حالة بتتغير وأكتر من مكان عايز يعرف. لو قيمة واحدة: Future.",
            mistakes: R`تعمل listen ومتعملش cancel. وتعمل listen مرتين على single-subscription stream. وتعمل [[StreamBuilder(stream: repo.watchMessages())]] جوه build، فكل rebuild يعمل stream جديد ويبدأ من الأول: اعمله مرة في initState وخزّنه.`
          },
          lines: [
            "StreamController موجود في dart:async.",
            "[[async*]]: دالة بترجّع Stream بدل Future.",
            "loop من الرقم لحد صفر.",
            "استنى شوية بين كل قيمة.",
            "[[yield]]: ابعت قيمة للي سامع، وكمّل.",
            "قفلة الـ loop.",
            "قفلة الدالة: الـ stream بيخلص هنا.",
            "البداية.",
            "[[await for]]: خد كل قيمة أول ما توصل، ويكمّل بعد ما الـ stream يخلص. بيطبع 3 2 1 0.",
            "controller: stream بتبعت فيه بإيدك.",
            "[[listen]] بيرجّع subscription، ودي اللي بتقفلها بعدين.",
            "ابعت قيمة: got hello.",
            "اقفل الـ stream (يبعت done).",
            "الغي الاشتراك. في Flutter دي مكانها dispose.",
            "قفلة."
          ],
          sol: R`المثال الأصلي بيطبع [[3]] و [[2]] و [[1]] و [[0]] (كل واحد بعد ٣٠٠ms) وبعدين [[got hello]].

لما تعمل listen تاني على نفس الـ controller العادي، البرنامج بيضرب على سطر الـ listen التاني نفسه: [[Bad state: Stream has already been listened to.]]. الـ stream العادي single-subscription: مستمع واحد بس طول عمره، حتى لو الأول عمل cancel.

ولما تغيّره لـ [[StreamController<String>.broadcast()]] الاتنين بيشتغلوا: [[got hello]] ثم [[second hello]]. بس خد بالك من الفرق التاني: في broadcast لو عملت listen بعد [[add]]، القيمة دي ضاعت عليك، مفيش buffer. عشان كده لو محتاج آخر قيمة للي بيشترك متأخر (زي حالة تسجيل الدخول)، ده شغل ValueNotifier أو Riverpod مش broadcast stream.`,
          solCode: R`import 'dart:async';

Future<void> main() async {
  final controller = StreamController<String>.broadcast();
  final sub = controller.stream.listen((msg) => print('got $msg'));
  final sub2 = controller.stream.listen((msg) => print('second $msg'));
  controller.add('hello'); // got hello, second hello
  await controller.close();
  await sub.cancel();
  await sub2.cancel();
}`
        }
      ]
    }
  ]
});
