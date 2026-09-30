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
    },
    {
      t: "Dart: الأخطاء والأنواع المتقدمة",
      l: 1,
      n: "exceptions صح، و generics، و mixins، و extensions، و enums فيها بيانات: الحاجات اللي هتقابلها في كود أي package",
      items: [
        {
          cmd: "try و on و rethrow",
          title: "تمسك نوع الخطأ اللي تعرف تتعامل معاه بس",
          desc: R`في Dart فيه نوعين حاجات بتترمي: [[Exception]] يعني حاجة متوقعة ممكن تحصل (النت فاصل، JSON بايظ، السيرفر رجّع 404)، و [[Error]] يعني غلطة في الكود نفسه (index بره الـ list، [[!]] على null، cast غلط). الأولى بتمسكها وتتعامل معاها، والتانية بتصلّحها في الكود.

[[on FormatException catch (e)]] بيمسك نوع معين بس، و [[catch (e, st)]] بيدّيك الـ stack trace كمان. و [[rethrow]] بيرمي نفس الخطأ تاني بعد ما تسجّله مثلًا، و [[finally]] بيتنفذ في كل الأحوال. وتعمل exception خاص بيك بـ class بيعمل [[implements Exception]].`,
          example: R`class ApiException implements Exception {
  ApiException(this.statusCode, this.message);
  final int statusCode;
  final String message;
  @override
  String toString() => 'ApiException($statusCode): $message';
}

int parseAge(String raw) {
  final age = int.parse(raw);
  if (age < 0) throw ApiException(422, 'age must be positive');
  return age;
}

int saveAge(String raw) {
  try {
    return parseAge(raw);
  } on ApiException {
    print('log: rejected $raw');
    rethrow;
  }
}

void main() {
  for (final raw in ['30', 'abc', '-5']) {
    try {
      print('age $__{saveAge(raw)}');
    } on FormatException catch (e) {
      print('not a number: $__{e.source}');
    } on ApiException catch (e, st) {
      print('invalid: $__{e.message} $__{e.statusCode}');
      print(st.toString().split('\n').first);
    } finally {
      print('checked $raw');
    }
  }
}`,
          try: "شغّل المثال بـ [[dart run]] واقرا الناتج. بعدين امسح سطر [[rethrow;]] من [[saveAge]] وشوف الـ compiler بيقول إيه، وحط مكانه [[return -1;]] وشغّل تاني: إيه اللي اتغير في ناتج [['-5']]؟ وآخر حاجة: ضيف [['']] (نص فاضي) للـ list وقول هيطبع إيه قبل ما تشغّل.",
          flag: "script",
          deep: {
            why: "لو مسكت كل حاجة بـ [[catch (e)]] هتبلع الأخطاء اللي المفروض تكسّر التطبيق وانت بتطوّر، زي null أو index غلط، وتفضل الشاشة فاضية من غير ما تعرف ليه. ولو مسكتش حاجة خالص، أول مرة النت يقطع التطبيق هيقع. الحل في النص: امسك الأنواع اللي تعرف تعمل معاها حاجة مفيدة (تعرض رسالة، تعيد المحاولة)، وسيب الباقي يطلع.",
            how: R`[[throw]] في Dart بيرمي أي object، حتى String ([[throw 'oops']])، بس دا ممنوع عرفًا والـ lint [[only_throw_errors]] بيمسكه. ارمي حاجة بتعمل implements لـ Exception أو extends لـ Error.

ترتيب الـ [[on]] مهم: أول واحد يطابق يكسب، فالأنواع المحددة الأول والعامة ([[on Exception]]) في الآخر. و [[catch (e)]] من غير [[on]] بيمسك أي حاجة، حتى الـ Errors.

الفرق في الـ stack trace: [[rethrow]] بيحافظ على الـ stack trace الأصلي (من [[parseAge]] زي ما بيطبع المثال). إنما [[throw e]] جوه الـ catch بيبدأ trace جديد من السطر ده، فتضيع مكان المشكلة الحقيقي. ولو عايز ترمي نوع تاني وتحافظ على الـ trace: [[Error.throwWithStackTrace(MyException(), st)]].

الـ exceptions الجاهزة اللي هتقابلها: [[FormatException]] (من [[int.parse]] و [[jsonDecode]] و [[DateTime.parse]])، و [[TimeoutException]] (من [[.timeout()]])، و [[SocketException]] و [[HttpException]] من dart:io، و [[ClientException]] من package http. والـ Errors: [[RangeError]] و [[TypeError]] و [[StateError]] و [[ArgumentError]] و [[UnimplementedError]].

وفي async نفس الكلام بالظبط: [[try]] حوالين [[await]]، والـ Future الفاشل بيتمسك بـ [[on]] زي أي exception عادي (درس async و await).

جوه Flutter: أي exception مش ممسوك في build أو في callback بيوصل لـ [[FlutterError.onError]]، وفي debug بيطلع الشاشة الحمرا. والأخطاء اللي بره الـ framework (Futures مش ممسوكة) بتروح لـ [[PlatformDispatcher.instance.onError]]. الاتنين دول اللي بتوصّل فيهم Sentry أو Crashlytics.`,
            when: "أي كود بيكلم حاجة بره تطبيقك: شبكة، ملفات، parsing، تخزين. وعرّف exception خاص (ApiException، NotFoundException) لما الطبقة اللي فوق محتاجة تفرّق بين الحالات وتعرض رسالة مختلفة لكل واحدة.",
            mistakes: R`[[catch (e) {}]] فاضي: الخطأ اختفى ومحدش هيعرف. على الأقل سجّله. وتمسك [[Error]] (زي [[on TypeError]]) عشان تخبّي bug بدل ما تصلّحه. و [[throw e]] بدل [[rethrow]] فيضيع الـ stack trace. وتعمل [[class MyError extends Error]] لحاجة متوقعة زي «المستخدم مش موجود»: دي Exception مش Error. وسؤال انترفيو: «إيه الفرق بين Exception و Error في Dart؟» Exception حالة متوقعة المفروض تتمسك، و Error غلطة برمجية المفروض تتصلّح، والـ linter والـ packages (زي Riverpod اللي مبيعملش retry لو الخطأ Error) بيعتمدوا على الفرق ده.`
          },
          lines: [
            "exception خاص بيك: [[implements Exception]] يعني «حالة متوقعة».",
            "constructor بيحط الكود والرسالة.",
            "كود HTTP زي 404 أو 422.",
            "رسالة تتعرض أو تتسجل.",
            "بتعيد تعريف toString...",
            "...عشان لما يتطبع يبقى مفهوم.",
            "قفلة الـ class.",
            "دالة ممكن ترمي نوعين أخطاء.",
            "[[int.parse]] بيرمي [[FormatException]] لو النص مش رقم.",
            "[[throw]]: ارمي الـ exception بتاعك لو الرقم سالب.",
            "رجّع السن.",
            "قفلة.",
            "دالة في النص بين الـ UI والـ parsing.",
            "جرّب.",
            "نادي الدالة اللي ممكن ترمي.",
            "[[on ApiException]] من غير catch: مش محتاج المتغير هنا.",
            "سجّل...",
            "...وارمي نفس الخطأ تاني لفوق بنفس الـ stack trace.",
            "قفلة الـ on.",
            "قفلة الدالة.",
            "البداية.",
            "جرّب ٣ قيم: سليمة، ومش رقم، وسالبة.",
            "try لكل قيمة لوحدها.",
            "age 30 للأولى.",
            "[[on FormatException]]: يمسك النوع ده بس، و [[e.source]] النص اللي فشل.",
            "not a number: abc.",
            "النوع التاني. [[st]] الـ stack trace.",
            "invalid: age must be positive 422.",
            "أول سطر في الـ trace: بيشاور على [[parseAge]] مش [[saveAge]]، بفضل rethrow.",
            "[[finally]]: بيتنفذ سواء نجح أو فشل.",
            "checked مع كل قيمة.",
            "قفلة try.",
            "قفلة الـ loop.",
            "قفلة main."
          ],
          sol: R`الناتج بالترتيب: [[age 30]] ثم [[checked 30]]، وبعدين [[not a number: abc]] ثم [[checked abc]]، وبعدين [[log: rejected -5]] ثم [[invalid: age must be positive 422]] ثم سطر [[#0      parseAge (...)]] ثم [[checked -5]]. لاحظ إن finally بيتنفذ في التلات حالات.

لما تمسح [[rethrow;]] الـ compiler بيرفض: [[The body might complete normally, causing 'null' to be returned, but the return type, 'int', is a potentially non-nullable type]]. لأن الدالة وعدت ترجّع int، والـ catch بيخلص من غير return. ولما تحط [[return -1;]] الكود يترجم، بس [['-5']] بقت تطبع [[log: rejected -5]] ثم [[age -1]]: الخطأ اتبلع والـ UI فاكر إن كله تمام. دا بالظبط ليه rethrow موجود.

والنص الفاضي [['']]: [[int.parse('')]] بيرمي FormatException، فهيطبع [[not a number: ]] (فاضي بعد النقطتين) ثم [[checked ]].`,
          solCode: R`// saveAge بعد استبدال rethrow (مثال على الغلط):
int saveAge(String raw) {
  try {
    return parseAge(raw);
  } on ApiException {
    print('log: rejected $raw');
    return -1; // الخطأ اتبلع: اللي فوق مش هيعرف إن فيه مشكلة
  }
}`
        },
        {
          cmd: "generics",
          title: "كود واحد يشتغل مع أي نوع ويفضل type-safe",
          desc: R`[[List<String>]] و [[Future<User>]] دي generics: الـ class مكتوب مرة، والنوع اللي جواه بيتحدد وقت الاستخدام. وتقدر تعمل بتوعك: [[class Page<T>]] لرد API فيه لستة من أي حاجة، أو دالة [[T? findById<T extends Entity>(...)]].

[[extends]] جوه الـ generic بيحط شرط: [[T extends Entity]] يعني «أي نوع، بشرط يبقى فيه id». فجوه الدالة تقدر تكتب [[item.id]] والـ compiler مطمن.`,
          example: R`class Page<T> {
  const Page(this.items, this.total);
  final List<T> items;
  final int total;

  Page<R> map<R>(R Function(T item) convert) =>
      Page(items.map(convert).toList(), total);
}

abstract class Entity {
  int get id;
}

class Todo implements Entity {
  Todo(this.id, this.title);
  @override
  final int id;
  final String title;
}

T? findById<T extends Entity>(List<T> list, int id) {
  for (final item in list) {
    if (item.id == id) return item;
  }
  return null;
}

void main() {
  final todos = [Todo(1, 'buy milk'), Todo(2, 'call mom')];
  final page = Page(todos, 40);
  final titles = page.map((t) => t.title.toUpperCase());
  print('$__{titles.items} of $__{titles.total}');
  final found = findById(todos, 2);
  print(found?.title);
  print(titles.runtimeType);
}`,
          try: "نادي [[findById([1, 2], 1)]] وشوف الـ error. وبعدين جرّب الفخ ده: [[final List<Object> objs = <String>['a']; objs.add(1);]]. هل الـ compiler مسكه؟ وإيه اللي حصل وقت التشغيل؟",
          flag: "script",
          deep: {
            why: "من غير generics يا تكتب [[TodoPage]] و [[UserPage]] و [[OrderPage]] نفس الكود ٣ مرات، يا تكتب [[Page]] واحد فيه [[List<dynamic>]] وتخسر فحص الأنواع وتعمل cast في كل حتة. الـ generics بتدّيك الاتنين: كود واحد، والـ compiler عارف إن [[page.items.first]] نوعه Todo.",
            how: R`Dart بيستنتج النوع من القيم: [[Page(todos, 40)]] بقت [[Page<Todo>]] من غير ما تكتبها، و [[page.map((t) => t.title)]] بقت [[Page<String>]] لأن الدالة بترجّع String.

الـ generics في Dart «reified»: النوع بيفضل موجود وقت التشغيل، مش بيتمسح زي Java أو TypeScript. عشان كده [[titles.runtimeType]] بيطبع [[Page<String>]]، و [[x is List<int>]] بيشتغل فعلًا.

الـ generics في Dart covariant: [[List<String>]] ينفع تتحط في متغير [[List<Object>]]. دا مريح، بس معناه إن فحص الـ [[add]] بيتأجل لوقت التشغيل: لو حطيت int في list هي في الحقيقة [[List<String>]] هيضرب [[type 'int' is not a subtype of type 'String']]. ودا من الحاجات القليلة اللي الـ compiler مش بيمسكها.

الأماكن اللي هتشوف فيها generics في Flutter كل يوم: [[State<Counter>]]، و [[FutureBuilder<List<Todo>>]]، و [[ValueNotifier<int>]]، و [[Provider<ApiClient>]] و [[AsyncNotifier<List<Todo>>]] في Riverpod، و [[Navigator.push<bool>]] لما الشاشة ترجّع نتيجة.

الـ typedef بيدّي اسم لنوع طويل: [[typedef Json = Map<String, dynamic>;]] ودي بتتكتب في معظم المشاريع.`,
            when: "أي class أو دالة بتشيل أو بتلف على بيانات من غير ما يهمها نوعها بالظبط: رد API فيه pagination، و cache، و Result<T> فيه نجاح أو فشل، و repository أساسي. ومتعملهاش لو هتستخدم نوع واحد بس.",
            mistakes: R`تسيب الـ generic من غير نوع ([[final list = [];]]) فيبقى [[List<dynamic>]] وتخسر الفحص كله: اكتب [[<String>[]]]. وتعمل [[as List<String>]] على list جاية من [[jsonDecode]]: هيضرب لأنها في الحقيقة [[List<dynamic>]]، والصح [[(json['tags'] as List).cast<String>()]] (درس null safety بعمق). وتكتب generics معقدة ٣ مستويات عشان «يبقى reusable» ومحدش يعرف يقرا الكود.`
          },
          lines: [
            "class بـ generic اسمه T: النوع بيتحدد لما حد يستخدمه.",
            "constructor.",
            "لستة من T، أيًا كان T.",
            "العدد الكلي (للـ pagination).",
            "دالة بـ generic تاني R: بتحوّل [[Page<T>]] لـ [[Page<R>]] بدالة تحويل.",
            "بتطبّق التحويل على كل عنصر وتحافظ على total.",
            "قفلة.",
            "class مجرد: أي حاجة ليها id.",
            "getter لازم أي class يطبّقه.",
            "قفلة.",
            "Todo بيحقق شرط Entity.",
            "constructor.",
            "بيعيد تعريف getter الـ id...",
            "...بـ field عادي.",
            "العنوان.",
            "قفلة.",
            "[[T extends Entity]]: أي نوع بشرط يبقى فيه id، والنتيجة [[T?]] لأن ممكن ميلاقيش.",
            "لف على اللستة.",
            "[[item.id]] مسموح لأن T أكيد Entity.",
            "قفلة الـ loop.",
            "ملقاش.",
            "قفلة.",
            "البداية.",
            "[[List<Todo>]] من القيم.",
            "[[Page<Todo>]] من غير ما تكتب النوع.",
            "[[Page<String>]]: R اتستنتجت من الدالة.",
            "[BUY MILK, CALL MOM] of 40.",
            "[[findById]] رجّعت [[Todo?]] مش Entity: الـ generic حافظ على النوع.",
            "call mom.",
            "Page<String>: النوع موجود وقت التشغيل.",
            "قفلة."
          ],
          sol: R`الناتج: [[[BUY MILK, CALL MOM] of 40]] ثم [[call mom]] ثم [[Page<String>]].

[[findById([1, 2], 1)]] مش هيترجم: [[The argument type 'List<int>' can't be assigned to the parameter type 'List<Entity>']]. الـ compiler عرف إن int مش Entity، ودا لازمة [[extends]] في الـ generic.

والفخ: الـ compiler سكت خالص، لأن [[List<String>]] يعتبر [[List<Object>]] (covariance). بس وقت التشغيل ضرب: [[type 'int' is not a subtype of type 'String' of 'value']]. الـ list في الحقيقة لسه List<String> والـ runtime فحصها عند الـ add. الغلط الشائع إنك تفتكر إن النوع المكتوب على المتغير هو اللي بيتحكم، والصح إن نوع الـ object الحقيقي هو اللي بيتفحص.`
        },
        {
          cmd: "mixin",
          title: "تضيف قدرات جاهزة لكذا class من غير وراثة",
          desc: R`الـ class في Dart بيورث من أب واحد بس ([[extends]]). إنما [[mixin]] حتة كود (fields و methods) تقدر تحطها في أي عدد classes بـ [[with]]: [[class ProductRepo extends Repository with Logger, Cache]].

و [[mixin Cache on Repository]] معناها إن الـ mixin ده يتحط بس على classes بتورث Repository، فيقدر ينادي دوالها. وانت بتستخدم mixins من Flutter من أول يوم: [[with SingleTickerProviderStateMixin]] في أي animation.`,
          example: R`mixin Logger {
  final logs = <String>[];
  void log(String msg) => logs.add('[$runtimeType] $msg');
}

abstract class Repository {
  Future<List<String>> fetchAll();
}

mixin Cache on Repository {
  List<String>? _cached;
  Future<List<String>> cachedFetch() async => _cached ??= await fetchAll();
}

class ProductRepo extends Repository with Logger, Cache {
  int calls = 0;
  @override
  Future<List<String>> fetchAll() async {
    calls++;
    log('network call $calls');
    return ['tea', 'coffee'];
  }
}

Future<void> main() async {
  final repo = ProductRepo();
  await repo.cachedFetch();
  final items = await repo.cachedFetch();
  print('$items calls=$__{repo.calls}');
  print(repo.logs);
  final Logger logger = repo;
  logger.log('done');
  print(repo.logs.length);
}`,
          try: "اعمل [[class Settings with Cache {}]] (من غير extends Repository) وشوف الـ error. وبعدين اعمل mixin تاني اسمه [[Timestamps]] فيه [[DateTime? updatedAt]] و [[void touch()]]، وضيفه على ProductRepo ونادي [[touch()]] جوه fetchAll.",
          flag: "script",
          deep: {
            why: "فيه قدرات بتتكرر في classes ملهاش أب مشترك: logging، و cache، و validation. لو حطيتها في أب واحد، كل class لازم يورث منه حتى لو مش محتاجها، ولو عايز قدرتين من أبين مختلفين مش هينفع لأن الوراثة واحدة بس. الـ mixin بيخليك تركّب القدرات زي قطع ليجو.",
            how: R`[[with A, B]] بيتقري من الشمال لليمين كأنه سلسلة: [[Repository]] ثم [[Repository+Logger]] ثم [[Repository+Logger+Cache]] ثم ProductRepo. ولو اتنين mixins فيهم method بنفس الاسم، اللي على اليمين (الأخير) هو اللي بيكسب، و [[super.method()]] جواه بينادي اللي قبله في السلسلة. عشان كده الترتيب مهم.

[[on Repository]] بيعمل حاجتين: بيسمح للـ mixin ينادي [[fetchAll()]] كأنه موجود، وبيمنع أي حد يحطه على class مش Repository (الـ error اللي في التجربة).

من Dart 3 فيه فرق واضح: [[mixin]] للـ mixins بس (مينفعش تعمل منه object)، و [[class]] عادي مينفعش يتحط بعد with إلا لو كتبته [[mixin class]]. قبل Dart 3 أي class من غير constructor كان ينفع يبقى mixin، ودا اتقفل.

الفرق بين الـ ٣ كلمات:
- [[extends]]: وراثة، أب واحد، بتاخد الكود والنوع.
- [[implements]]: عقد، أي عدد، بتاخد النوع بس ولازم تكتب كل method بنفسك.
- [[with]]: mixin، أي عدد، بتاخد الكود جاهز.

في Flutter: [[SingleTickerProviderStateMixin]] بيضيف للـ State القدرة إنه يبقى [[vsync]] لـ AnimationController، و [[AutomaticKeepAliveClientMixin]] بيخلي عنصر في ListView ميتشالش لما يخرج من الشاشة، و [[WidgetsBindingObserver]] بيسمع لحالة التطبيق (background و foreground).`,
            when: "قدرة صغيرة مستقلة بتتكرر في classes مختلفة. ولو العلاقة «هو نوع من» (Circle هو Shape) استخدم extends. ولو محتاج تبدّل التنفيذ في الاختبارات (repository حقيقي و fake) استخدم implements على abstract interface.",
            mistakes: R`تعمل mixin فيه state كتير ودوال بتعتمد على بعض، فيبقى أب مستخبي بس أصعب في القراية. وتنسى إن الترتيب في with بيفرق لما فيه method بنفس الاسم. وتعمل [[with SingleTickerProviderStateMixin]] وعندك اتنين AnimationControllers: هيضرب، والصح [[TickerProviderStateMixin]]. وسؤال انترفيو: «إيه الفرق بين extends و implements و with؟» (فوق)، و«ليه Dart معندهاش multiple inheritance؟» لأن mixins بتحل المشكلة من غير diamond problem، بسبب الترتيب الخطي.`
          },
          lines: [
            "[[mixin]]: حتة كود تتحط في أي class.",
            "field جوه الـ mixin: كل class بياخد نسخة خاصة بيه.",
            "method بتستخدم [[runtimeType]] بتاع الـ class اللي اتحطت فيه.",
            "قفلة.",
            "class مجرد فيه عقد واحد.",
            "أي repository لازم يعرف يجيب البيانات.",
            "قفلة.",
            "[[on Repository]]: الـ mixin ده يتحط بس على Repository.",
            "cache خاص بالـ mixin.",
            "[[??=]]: لو الـ cache فاضي نادي fetchAll (موجودة بفضل on) وخزّن.",
            "قفلة.",
            "وراثة واحدة + اتنين mixins.",
            "عدّاد للنداءات الحقيقية.",
            "بيطبّق العقد.",
            "الدالة الحقيقية (زي طلب شبكة).",
            "زوّد العدّاد.",
            "[[log]] جاية من Logger.",
            "النتيجة.",
            "قفلة.",
            "قفلة الـ class.",
            "البداية.",
            "object.",
            "أول مرة: بيروح للـ «شبكة».",
            "تاني مرة: من الـ cache.",
            "[tea, coffee] calls=1: اتنادت مرة واحدة بس.",
            "لستة فيها سطر واحد: اسم الـ class بين أقواس مربعة ثم network call 1.",
            "الـ mixin نوع كمان: ProductRepo يتحط في متغير Logger.",
            "نادي من خلاله.",
            "2.",
            "قفلة."
          ],
          sol: R`الناتج: [[[tea, coffee] calls=1]] ثم لستة فيها سطر log واحد (ProductRepo بين أقواس مربعة ثم network call 1) ثم [[2]].

[[class Settings with Cache {}]] مش هيترجم: [['Cache' can't be mixed onto 'Object' because 'Object' doesn't implement 'Repository']]. الـ [[on]] شرط والـ compiler بيطبّقه.

الـ Timestamps: بعد ما تضيفه ([[with Logger, Cache, Timestamps]]) وتنادي [[touch()]] جوه fetchAll، [[repo.updatedAt]] هيبقى فيه وقت أول نداء، ومش هيتغير في النداء التاني لأن التاني جه من الـ cache ومعدّاش على fetchAll. لو اتغير يبقى الـ cache مش شغال.`,
          solCode: R`mixin Timestamps {
  DateTime? updatedAt;
  void touch() => updatedAt = DateTime.now();
}

class ProductRepo extends Repository with Logger, Cache, Timestamps {
  int calls = 0;
  @override
  Future<List<String>> fetchAll() async {
    calls++;
    touch();
    log('network call $calls');
    return ['tea', 'coffee'];
  }
}`
        },
        {
          cmd: "extension",
          title: "تضيف دوال لـ String أو أي نوع مش بتاعك",
          desc: R`[[extension StringX on String]] بيضيف methods و getters لنوع موجود من غير ما تعدّل فيه ولا تورث منه: [['ali'.capitalized]] بدل [[capitalize('ali')]]. بتشتغل على أي نوع: String و num و List و DateTime و BuildContext.

و [[extension type]] (من Dart 3.3) حاجة مختلفة: نوع جديد وقت الترجمة بس فوق نوع موجود. [[UserId(42)]] وقت التشغيل هو int عادي، بس الـ compiler مش هيسيبك تبعت int مكان UserId بالغلط.`,
          example: R`extension StringX on String {
  String get capitalized => isEmpty ? this : this[0].toUpperCase() + substring(1);
  bool get isValidEmail => RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$').hasMatch(this);
}

extension PriceFormat on num {
  String get egp => '$__{toStringAsFixed(2)} EGP';
}

extension ListSum<T extends num> on Iterable<T> {
  num get sum => fold<num>(0, (a, b) => a + b);
}

extension type UserId(int value) {
  bool get isValid => value > 0;
}

void main() {
  print('ali'.capitalized);
  print('ali@mail.com'.isValidEmail);
  print(450.egp);
  print([10, 25, 15].sum.egp);
  final id = UserId(42);
  print('$__{id.value} $__{id.isValid}');
}`,
          try: "اعمل [[extension on DateTime]] فيها getter اسمه [[ago]] بيرجّع «من X دقيقة» أو «من X ساعة». وبعدين جرّب تبعت [[42]] لدالة parameter بتاعها [[UserId]]: الـ compiler هيقول إيه؟ وجرّب [[final dynamic s = 'ali'; print(s.capitalized);]].",
          flag: "script",
          deep: {
            why: "كل مشروع فيه دوال صغيرة بتتكرر: تنسيق سعر، و validation لإيميل، و «من ٥ دقايق». لو عملتها دوال عادية هتتوه في ملف utils ومحدش هيلاقيها. الـ extension بيحطها على النوع نفسه، فالـ autocomplete بيقترحها أول ما تكتب نقطة بعد String.",
            how: R`الـ extension مش بيعدّل الـ class فعلًا: الـ compiler بيحوّل [['ali'.capitalized]] لنداء دالة static وقت الترجمة. عشان كده:
- بتشتغل على النوع المعروف وقت الترجمة بس. متغير [[dynamic]] مش هيشوفها وهيضرب [[NoSuchMethodError]].
- مينفعش تضيف fields (state) جوه extension، getters و methods بس.
- لو الـ class نفسه فيه method بنفس الاسم، بتاعة الـ class هي اللي بتكسب.
- لازم تعمل import للملف اللي فيه الـ extension عشان تبان.

[[extension ListSum<T extends num> on Iterable<T>]] extension بـ generic: بتشتغل على [[List<int>]] و [[Set<double>]] وأي Iterable أرقام.

في Flutter هتلاقي extensions كتير على [[BuildContext]]: [[context.go('/home')]] في go_router و [[context.mounted]] نفسها. ومشاريع كتير بتعمل [[extension on BuildContext { ThemeData get theme => Theme.of(this); }]] عشان تكتب [[context.theme]].

[[extension type UserId(int value)]]: zero-cost wrapper. وقت التشغيل مفيش object جديد، هو int. بس وقت الترجمة [[UserId]] نوع مختلف، فدالة [[deleteUser(UserId id)]] مش هتقبل [[productId]] بالغلط. و [[package:web]] كله مبني بيها عشان JS interop.`,
            when: "دوال مساعدة صغيرة مرتبطة بنوع واحد (تنسيق، تحويل، validation). و extension type لـ ids ومبالغ من نفس النوع الأساسي عايز تمنع الخلط بينها.",
            mistakes: R`تحط business logic كبير في extension على String، فيبقى [['...'.saveToDatabase()]]: دي مكانها class. وتعمل extension باسم مستخدم في package تانية فيحصل تعارض ([[ambiguous extension member]]): اديها اسم مميز أو استخدم [[hide]] في الـ import. وتفتكر إنها هتشتغل على dynamic.`
          },
          lines: [
            "extension على String، واسمها StringX.",
            "getter: أول حرف كابيتال. [[this]] هو النص نفسه.",
            "getter بيتأكد من شكل الإيميل بـ regex بسيط.",
            "قفلة.",
            "extension على num (يعني int و double).",
            "السعر بجنيه ورقمين عشري.",
            "قفلة.",
            "extension بـ generic على أي Iterable أرقام.",
            "المجموع بـ fold.",
            "قفلة.",
            "[[extension type]]: نوع جديد فوق int، من غير تكلفة وقت التشغيل.",
            "getter خاص بالنوع ده.",
            "قفلة.",
            "البداية.",
            "Ali.",
            "true.",
            "450.00 EGP.",
            "50.00 EGP: extensionين ورا بعض.",
            "[[UserId]] بيتعمل زي class.",
            "42 true.",
            "قفلة."
          ],
          sol: R`الـ extension على DateTime: بتحسب [[DateTime.now().difference(this)]]، ولو أقل من ساعة ترجّع الدقايق، وإلا الساعات، وإلا الأيام. [[DateTime.now().subtract(const Duration(minutes: 5)).ago]] لازم تطبع «من 5 دقيقة».

بعت [[42]] مكان [[UserId]]: [[The argument type 'int' can't be assigned to the parameter type 'UserId']]. دا الهدف من extension type. والصح [[deleteUser(UserId(42))]].

والـ dynamic: بيترجم عادي، وبيضرب وقت التشغيل بـ [[NoSuchMethodError: Class 'String' has no instance getter 'capitalized']]. لأن الـ extension بتتحل وقت الترجمة من النوع المكتوب، والنوع هنا dynamic.`,
          solCode: R`extension Ago on DateTime {
  String get ago {
    final diff = DateTime.now().difference(this);
    if (diff.inMinutes < 60) return 'من $__{diff.inMinutes} دقيقة';
    if (diff.inHours < 24) return 'من $__{diff.inHours} ساعة';
    return 'من $__{diff.inDays} يوم';
  }
}

void main() {
  print(DateTime.now().subtract(const Duration(minutes: 5)).ago);
  print(DateTime.now().subtract(const Duration(hours: 3)).ago);
}`
        },
        {
          cmd: "enhanced enum",
          title: "enum فيه بيانات ودوال بدل switch في كل حتة",
          desc: R`[[enum OrderStatus { pending, shipped }]] العادي قايمة أسماء. ومن Dart 2.17 الـ enum ينفع يبقى فيه fields و constructor و methods: كل حالة ليها label بالعربي ولون، و [[isFinal]] getter، و [[fromApi]] بتحوّل النص الجاي من السيرفر.

وكل enum فيه جاهز: [[.name]] (الاسم كنص)، و [[.index]]، و [[values]] (كل الحالات). و [[switch]] على enum لازم يغطي كل الحالات، فلو ضفت حالة جديدة الـ compiler يوريك كل الأماكن اللي محتاجة تتعدل.`,
          example: R`enum OrderStatus {
  pending('في الانتظار', 0xFFFFA000),
  shipped('اتشحن', 0xFF1976D2),
  delivered('وصل', 0xFF388E3C),
  cancelled('اتلغى', 0xFFD32F2F);

  const OrderStatus(this.label, this.color);
  final String label;
  final int color;

  bool get isFinal => this == delivered || this == cancelled;

  static OrderStatus fromApi(String raw) =>
      values.asNameMap()[raw] ?? OrderStatus.pending;
}

String nextStep(OrderStatus s) => switch (s) {
  OrderStatus.pending => 'جهّز الطلب',
  OrderStatus.shipped => 'تابع الشحنة',
  OrderStatus.delivered || OrderStatus.cancelled => 'مفيش',
};

void main() {
  final s = OrderStatus.fromApi('shipped');
  print('$__{s.name} $__{s.index} $__{s.label} $__{s.isFinal}');
  print(OrderStatus.fromApi('lost'));
  print(nextStep(OrderStatus.cancelled));
  print(OrderStatus.values.where((x) => !x.isFinal).map((x) => x.label).toList());
}`,
          try: "ضيف حالة [[returned('مرتجع', 0xFF6D4C41)]] وشغّل: الـ compiler هيقف فين؟ صلّحه. وبعدين في Flutter اعرض badge لكل حالة بـ [[Chip(label: Text(s.label), backgroundColor: Color(s.color))]].",
          flag: "script",
          deep: {
            why: "الحالة (pending و shipped) بتيجي معاها بيانات: النص اللي يتعرض، واللون، وهل ينفع يتلغى. من غير enhanced enum بتكتب switch للنص في مكان، و switch للون في مكان تاني، وأول حالة جديدة تنسى تضيفها في واحد منهم. هنا كل حاجة عن الحالة في مكان واحد.",
            how: R`كل قيمة في الـ enum object ثابت (const) بيتعمل مرة واحدة، عشان كده الـ constructor لازم [[const]] وكل الـ fields لازم [[final]]. والقيم بتتكتب الأول، وبعد آخر واحدة [[;]] مش [[,]].

[[values.asNameMap()]] بترجّع [[Map<String, OrderStatus>]] من الاسم للقيمة، فـ [[['shipped']]] بترجّع القيمة أو null لو السيرفر بعت حاجة مش معروفة. وفيه كمان [[OrderStatus.values.byName('shipped')]] بس دي بترمي [[ArgumentError]] لو الاسم مش موجود، ودا مش اللي عايزه مع بيانات جاية من بره.

switch على enum exhaustive: لو نسيت حالة، الـ compiler بيرفض الـ switch expression. و [[||]] في الـ pattern بيجمع أكتر من حالة في سطر.

الـ enum ينفع يعمل [[implements]] و [[with]] (mixin)، بس مينفعش [[extends]] ولا تعمل منه object جديد.

وخلي بالك من [[.index]]: بيتغير لو رتّبت الحالات، فمتخزّنهوش في قاعدة بيانات ولا تبعته للسيرفر. خزّن [[.name]].`,
            when: "أي مجموعة حالات ثابتة معروفة: حالة طلب، ونوع مستخدم، وثيم، ولغة، وأنواع إشعارات. ولو الحالات بتيجي من السيرفر وممكن تزيد من غير تحديث التطبيق، خلي فيه قيمة احتياطية (زي pending أو unknown).",
            mistakes: R`تخزّن [[.index]] في shared_preferences أو ترسله للـ API، وبعدين ترتّب القيم فكل البيانات القديمة تتقري غلط. وتستخدم [[byName]] على نص من السيرفر فيقع التطبيق أول ما الـ backend يضيف حالة. وتكتب [[default:]] أو [[_]] في switch على enum فتقفل فحص الحالات الناقصة بإيدك.`
          },
          lines: [
            "enum فيه بيانات.",
            "كل قيمة بتنادي الـ constructor: نص ولون (ARGB).",
            "قيمة.",
            "قيمة.",
            "آخر قيمة وبعدها [[;]].",
            "constructor لازم const.",
            "field لازم final.",
            "اللون كرقم (في Flutter: [[Color(color)]]).",
            "getter: هل الحالة نهائية؟",
            "دالة static بتحوّل نص السيرفر لقيمة...",
            "...ولو مش معروف ترجع pending بدل ما تضرب.",
            "قفلة الـ enum.",
            "switch expression على الـ enum.",
            "حالة.",
            "حالة.",
            "[[||]]: حالتين نفس النتيجة.",
            "قفلة الـ switch.",
            "البداية.",
            "من نص جاي من API.",
            "shipped 1 اتشحن false.",
            "نص مش معروف: OrderStatus.pending.",
            "مفيش.",
            "[في الانتظار, اتشحن]: الحالات اللي لسه مخلصتش.",
            "قفلة."
          ],
          sol: R`بعد ما تضيف [[returned]] (وتنقل الـ [[;]] لآخرها)، الـ compiler بيقف عند [[nextStep]]: [[The type 'OrderStatus' isn't exhaustively matched by the switch cases since it doesn't match the pattern 'OrderStatus.returned']]. تصلّحه بإنك تضيف [[OrderStatus.returned => 'استلم المرتجع',]] أو تضمها لسطر مفيش. ولو عايزها حالة نهائية زوّدها في [[isFinal]] كمان، ودي الحاجة اللي الـ compiler مش هيفكّرك بيها لأنها مش switch.

ولو كنت كاتب [[_ => 'مفيش']] بدل الحالتين، الكود كان هيترجم عادي والحالة الجديدة كانت هتقع في «مفيش» من غير ما تاخد بالك.`
        }
      ]
    },
    {
      t: "كل حاجة widget",
      l: 1,
      n: "الشاشة شجرة widgets، والـ widget وصف بيتعمل من جديد كل ما حاجة تتغير، زي component في React",
      items: [
        {
          cmd: "runApp",
          title: "أول تطبيق: شجرة widgets من main للشاشة",
          desc: R`في Flutter كل حاجة widget: النص، والمسافة، والتوسيط، والشاشة كلها. والتطبيق شجرة: widget جوه widget. [[runApp]] بياخد الـ widget اللي فوق خالص ويخليه يملى الشاشة.

الشكل المعتاد: [[MaterialApp]] (الثيم والتنقل)، وجواه [[Scaffold]] (هيكل الشاشة: appBar و body و زرار عايم)، وجواه المحتوى. زي JSX بالظبط، بس بـ constructors بدل tags.`,
          example: R`import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('My first app')),
        body: const Center(child: Text('Hello Flutter')),
        floatingActionButton: FloatingActionButton(
          onPressed: () => debugPrint('tapped'),
          child: const Icon(Icons.add),
        ),
      ),
    ),
  );
}`,
          try: "امسح محتوى [[lib/main.dart]] وحط المثال ده، وشغّل. بعدين شيل الـ [[Scaffold]] وخلي [[home: const Text('Hello')]] بس، وشوف شكل النص.",
          flag: "script",
          deep: {
            why: "في Android أو iOS القديم فيه XML للشكل وكود منفصل للسلوك، ولازم تعدّل الشاشة بإيدك ([[textView.setText]]). Flutter زي React: بتوصف الشاشة لازم تبان إزاي حسب البيانات، و Flutter يتصرف.",
            how: R`الـ widget في Flutter object خفيف immutable: وصف للشكل، مش الحاجة المرسومة نفسها. بيتعمل ويترمي آلاف المرات في الثانية من غير مشكلة، زي React elements.

Flutter مبيستخدمش أزرار أو نصوص النظام (مش زي React Native اللي بيحوّل لـ views native). هو بيرسم كل بكسل بنفسه بمحرك الرسم Impeller. عشان كده الشكل واحد بالظبط على Android و iOS، وعشان كده الـ layout كله widgets: [[Center]] و [[Padding]] و [[Row]]، مش properties على العنصر زي CSS.

الـ widgets نوعين: فيه اللي بيرسم أو بيرتّب فعلًا (RichText و Padding و Row، ليهم RenderObject)، وفيه اللي بيجمّع widgets تانية (Text و Scaffold و MaterialApp وأي حاجة هتكتبها؛ Text مثلًا جواه RichText). والتطبيق كله بيبقى شجرة كبيرة، و Flutter بيحوّلها لشجرة elements ثم render objects (سؤال انترفيو في آخر التاب).

[[MaterialApp]] بيحط فوق الشجرة حاجات كتير: Theme و Navigator و Localizations و MediaQuery. أي widget تحته بيوصلها بـ [[Theme.of(context)]] وأخواتها. وفيه [[CupertinoApp]] لشكل iOS، بس معظم التطبيقات Material وبتظبط الشكل بالثيم.

وخلي بالك من الـ trailing commas: من Dart 3.7 الـ [[dart format]] هو اللي بيقرر يكسّر الشجرة سطور حسب طول السطر، وبيضيف أو يشيل الفاصلة الأخيرة بنفسه، فمتتعبش نفسك فيها. ولو عايز السلوك القديم (الفاصلة تجبره يكسّر)، حط [[trailing_commas: preserve]] تحت [[formatter:]] في [[analysis_options.yaml]].`,
            when: "كل تطبيق. MaterialApp مرة واحدة فوق خالص، و Scaffold لكل شاشة.",
            mistakes: R`تحط [[MaterialApp]] جوه كل شاشة: كده كل شاشة ليها Navigator وثيم منفصل، والتنقل والثيم يبوظوا. واحد بس فوق. وتنسى الـ Scaffold فالنص يطلع أحمر وتحته خطين أصفر: دا معناه مفيش Material فوقه يدّيله style.`
          },
          lines: [
            "مكتبة Material: فيها كل الـ widgets الجاهزة.",
            "نقطة البداية.",
            "اعرض الـ widget ده على الشاشة كلها.",
            "الـ root: بيدّي ثيم وتنقل ولغة لكل اللي تحته.",
            "[[home]]: أول شاشة. و Scaffold هيكل شاشة Material.",
            "الشريط اللي فوق وفيه العنوان.",
            "المحتوى: نص في النص بالظبط.",
            "زرار عايم تحت في الركن.",
            "الدالة اللي تتنفذ لما تدوس. [[debugPrint]] بيطبع في الترمنال.",
            "الأيقونة جوه الزرار.",
            "قفلة الزرار.",
            "قفلة الـ Scaffold.",
            "قفلة الـ MaterialApp.",
            "قفلة runApp.",
            "قفلة main."
          ],
          sol: R`المثال زي ما هو: شريط فوق مكتوب فيه [[My first app]]، و [[Hello Flutter]] في نص الشاشة بالظبط، وزرار + تحت في الركن. لما تدوس عليه الترمنال اللي فيه [[flutter run]] يطبع [[tapped]] (مش على الشاشة).

لما تخلي [[home: const Text('Hello')]] بس: كلمة Hello بتظهر لازقة في الركن اللي فوق خالص (ممكن تحت الـ status bar بتاع الموبايل)، بلون أحمر وتحتها خطين أصفر. دا مش error بيوقّف التطبيق، دا الـ style الاحتياطي اللي Flutter بيحطه لأي نص مفيش فوقه Material (Scaffold أو Material widget) عشان يلفت نظرك. ومفيش خلفية بيضا كمان، لأن الـ Scaffold هو اللي كان بيرسمها.

الغلط الشائع إنك تصلّح الشكل ده بإنك تحط [[TextStyle(color: ..., decoration: TextDecoration.none)]] على النص. الحل الصح إنك ترجّع الـ Scaffold (أو تلف المحتوى في [[Material]])، فالنص ياخد الخط والألوان من الثيم.`
        },
        {
          cmd: "StatelessWidget",
          title: "widget بتاعك بياخد بيانات ويرسمها ومفيش حاجة جواه بتتغير",
          desc: R`لما الشجرة تكبر بتقسّمها لـ widgets بتاعتك. [[StatelessWidget]] class فيه دالة [[build]] بترجّع شجرة widgets، والبيانات بتيجي من الـ constructor. زي function component في React من غير state، والـ fields هي الـ props.

كل الـ fields لازم [[final]]: الـ widget مبيتغيرش، ولو البيانات اتغيرت الأب بيعمل widget جديد بالقيم الجديدة.`,
          example: R`import 'package:flutter/material.dart';

class ProductTile extends StatelessWidget {
  const ProductTile({super.key, required this.name, required this.price, this.onTap});

  final String name;
  final double price;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(name),
      subtitle: Text('$__{price.toStringAsFixed(2)} EGP'),
      onTap: onTap,
    );
  }
}`,
          try: R`استخدمه في body: [[Column(children: [ProductTile(name: 'Tea', price: 10, onTap: () => debugPrint('tea')), const ProductTile(name: 'Coffee', price: 25)])]]. لاحظ إن التاني ينفع const والأول لأ (بسبب الدالة).`,
          flag: "script",
          deep: {
            why: "لو كتبت الشاشة كلها في build واحدة هتبقى ٣٠٠ سطر متداخلين. الـ widgets الصغيرة بتتقرا، وتتعاد في أكتر من مكان، وكمان أسرع: Flutter بيقدر يتخطى rebuild لـ widget مبيتغيرش.",
            how: R`[[build]] بتتنادى كل مرة Flutter محتاج يعرف شكل الـ widget: أول مرة يتحط في الشجرة، ولما الأب يعيد البناء ويبعت widget جديد، ولما حاجة الـ widget معتمد عليها تتغير (زي [[Theme.of(context)]] أو [[MediaQuery]]). ممكن تتنادى ٦٠ مرة في الثانية أثناء animation، فلازم تبقى سريعة ومن غير side effects: متعملش فيها طلب API ولا تكتب في ملف.

[[super.key]] اختصار لإنك تاخد [[Key? key]] وتبعته للأب. الـ key بيساعد Flutter يعرف مين مين لما widgets من نفس النوع تتحرك (درس ValueKey في المستوى ٣).

[[const]] constructor: لو كل الـ arguments ثابتة، اللي بيستخدمه يكتب [[const ProductTile(name: 'Tea', price: 10)]] والـ object يتعمل مرة واحدة بس. ولما الأب يعيد البناء، Flutter بيلاقي نفس الـ object بالظبط فبيتخطاه كله.

[[BuildContext]] هو مكان الـ widget في الشجرة. من خلاله بتوصل للحاجات اللي فوقك: الثيم، وحجم الشاشة، والـ Navigator.

المقارنة بـ React: [[function ProductTile({ name, price, onTap })]] بترجّع JSX. هنا class و build، والـ props fields final. وليه class مش دالة؟ عشان Flutter بيقارن نوع الـ widget ومكانه، وبيقدر يعمله const، ودا أسهل بالـ classes.`,
            when: "أي جزء في الشاشة بيعرض بيانات جاية من بره ومفيش حاجة جواه بتتغير لوحدها: كارت منتج، هيدر، زرار مخصوص، صف في لستة.",
            mistakes: R`تقسّم الشاشة لدوال زي [[Widget _buildHeader()]] بدل widgets: الدالة بتتنفذ مع كل rebuild للأب ومبتقدرش تبقى const ولا ليها context خاص بيها، و docs Flutter نفسها بتفضّل الـ widget. وتحط field مش final في StatelessWidget وتغيّره وتستنى الشاشة تتحدث: مش هتتحدث، دا مكانه StatefulWidget.`
          },
          lines: [
            "مكتبة Material.",
            "widget بتاعك: class بيورث StatelessWidget.",
            "constructor [[const]] بـ named parameters، و [[super.key]] بيبعت الـ key للأب.",
            "البيانات: final كلها.",
            "السعر.",
            "دالة الضغط، ممكن متتبعتش ([[VoidCallback]] = دالة من غير arguments ولا return).",
            "بتعيد تعريف build من الأب.",
            "build بتاخد context وبترجّع الشكل.",
            "ListTile: سطر جاهز فيه عنوان وتحته عنوان فرعي.",
            "العنوان.",
            "السعر برقمين بعد العلامة.",
            "وصّل الضغط للي بعت الدالة (زي onClick في props).",
            "قفلة ListTile.",
            "قفلة build.",
            "قفلة الـ class."
          ],
          sol: R`هتشوف سطرين تحت بعض: [[Tea]] وتحته [[10.00 EGP]]، و [[Coffee]] وتحته [[25.00 EGP]] (السعر برقمين بعد العلامة حتى لو بعته 10 بس، بسبب [[toStringAsFixed(2)]]). لما تدوس على Tea الترمنال يطبع [[tea]] وفيه تأثير ضغط، و Coffee مش بيعمل حاجة ولا حتى تأثير ضغط، لأن onTap بتاعها null.

ولو حاولت تكتب [[const]] قدام Tea: [[Invalid constant value]] على الـ [[() => debugPrint('tea')]]. الـ closure بيتعمل وقت التشغيل، فمستحيل الـ widget كله يبقى const. Coffee كل قيمه ثابتة (نص ورقم) فـ const تمام.

وملحوظة: [[price: 10]] من غير [[.0]] بيترجم عادي مع إن النوع double، لأن Dart بيحوّل الرقم الصحيح المكتوب في الكود لـ double لوحده.`
        },
        {
          cmd: "setState",
          title: "شاشة بتتغير لما المستخدم يدوس",
          desc: R`لما حاجة جوه الـ widget نفسه بتتغير (عدّاد، checkbox، تاب مختار)، بتستخدم [[StatefulWidget]]. هو class صغير بيعمل [[State]]، والـ State هو اللي فيه المتغيرات و build.

وعشان الشاشة تتحدث، بتغيّر المتغير جوه [[setState(() { ... })]]. دي بتقول لـ Flutter «الـ state اتغيرت، ابني الـ widget ده تاني». زي [[setCount]] في [[useState]]، بس هنا بتعدّل المتغير بنفسك جوه الدالة.`,
          example: R`import 'package:flutter/material.dart';

class Counter extends StatefulWidget {
  const Counter({super.key, this.start = 0});
  final int start;
  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  late int _count = widget.start;
  @override
  Widget build(BuildContext context) => TextButton(
        onPressed: () => setState(() => _count++),
        child: Text('Tapped $_count times'),
      );
}`,
          try: "شيل [[setState]] وخلي [[onPressed: () => _count++]] ودوس كام مرة: الرقم مش بيتغير. اعمل hot reload: فجأة يظهر الرقم الصح. دا معناه إن المتغير اتغير بس محدش قال لـ Flutter يرسم.",
          flag: "script",
          deep: {
            why: "الـ widget نفسه immutable، يعني مينفعش يغيّر نفسه. فالـ state اللي بتعيش أطول من widget واحد لازم تتحط في حتة تانية: الـ State object، اللي Flutter بيحتفظ بيه بين كل rebuild والتاني.",
            how: R`ليه classين؟ الـ [[Counter]] widget بيتعمل من جديد كل ما الأب يعيد البناء (ممكن كل frame). لو الـ count جواه كان هيرجع للصفر كل مرة. فـ Flutter بيعمل الـ [[_CounterState]] مرة واحدة ويربطه بمكان الـ widget في الشجرة (الـ element)، ولما widget جديد من نفس النوع ييجي في نفس المكان، بيحدّث [[widget]] جوه الـ State ويسيب المتغيرات زي ما هي.

[[setState]] مش بيعيد البناء على طول. بيعلّم الـ element إنه dirty، وفي الـ frame الجاي Flutter بيعيد build لكل الـ dirty elements مرة واحدة. فلو ناديت setState ٥ مرات ورا بعض، build بيحصل مرة.

الـ callback بتاع setState لازم يبقى sync ويغيّر الـ state بس. ينفع تغيّر المتغير قبلها وتنادي [[setState(() {})]] فاضية وهتشتغل، بس اكتب التغيير جواها عشان اللي يقرا يعرف إيه اللي اتغير.

الـ rebuild بيشمل الـ widget ده وكل اللي تحته، مش الشاشة كلها. عشان كده حط الـ state في أصغر widget محتاجها.

والفرق عن React: [[useState]] بيرجّع قيمة جديدة ومبتعدّلش القديمة. هنا بتعدّل الـ field نفسه ([[_count++]]) والـ setState بتقول «ابني تاني» بس. فلو عندك list، [[_items.add(x)]] جوه setState تمام، مش لازم list جديدة.`,
            when: "state محلية تخص widget واحد: حقل مفتوح ولا مقفول، التاب المختار، قيمة slider، animation. لو أكتر من شاشة محتاجة نفس البيانات، ارفعها لفوق أو استخدم Riverpod (المستوى ٢).",
            mistakes: R`تغيّر المتغير من غير setState فالشاشة متتحدثش، وتلاقيها اتحدثت فجأة بعد hot reload. وتنادي setState بعد await والشاشة اتقفلت، فيضرب [[setState() called after dispose()]]: اسأل [[if (!mounted) return;]] قبلها. وتحط async جوه setState ([[setState(() async {...})]]): Flutter بيرفضها، اعمل await الأول وبعدين setState بالنتيجة.`
          },
          lines: [
            "مكتبة Material.",
            "الجزء الثابت: StatefulWidget، وفيه الإعدادات اللي جاية من بره بس.",
            "constructor، و start ليها قيمة افتراضية.",
            "قيمة البداية (زي prop).",
            "بتعيد تعريف دالة من الأب.",
            "بيعمل الـ State. Flutter بيناديها مرة لما الـ widget يدخل الشجرة.",
            "قفلة.",
            "الـ State: هنا المتغيرات اللي بتتغير، و [[_]] عشان محدش بره الملف يحتاجها.",
            "[[widget.start]] بيقرا الـ props. و [[late]] عشان [[widget]] مش متاح غير بعد الإنشاء.",
            "بتعيد تعريف build.",
            "build هنا في الـ State مش في الـ widget.",
            "غيّر المتغير جوه setState، فـ Flutter يعيد build.",
            "النص بالقيمة الحالية.",
            "قفلة الزرار.",
            "قفلة الـ State."
          ],
          sol: R`مع [[setState]]: كل ضغطة النص يزيد [[Tapped 1 times]] ثم [[Tapped 2 times]]. من غيرها: دوس ٣ مرات والشاشة لسه [[Tapped 0 times]]، ومفيش أي error ولا warning. واعمل hot reload (r): الشاشة تقول [[Tapped 3 times]] مرة واحدة. (جرّبت ده في widget test: قبل الـ reload الـ Text كان 0، وبعد reassemble بقى 3.)

التفسير: [[_count++]] اشتغلت فعلًا ٣ مرات والـ field فيه 3، بس محدش علّم الـ element إنه dirty، فـ build متنادتش. الـ hot reload بيعمل rebuild للشجرة كلها، فـ build اتنادت وقرت القيمة الحالية. ودا بيثبت إن الـ State فاضلة بعد reload.

الغلط الشائع في التفسير: «الضغط مش شغال» أو «المتغير مش بيتغير». الاتنين غلط: المتغير بيتغير، اللي ناقص هو طلب إعادة الرسم. ونفس العَرَض هتشوفه لما تعدّل list أو object جوه State من غير setState.`
        },
        {
          cmd: "initState و dispose",
          title: "كود يشتغل مرة لما الشاشة تفتح ومرة لما تتقفل",
          desc: R`[[initState]] بيتنادى مرة واحدة لما الـ State يتعمل، قبل أول build: هنا تعمل controllers، وتبدأ تحميل البيانات، وتعمل listen. و [[dispose]] بيتنادى مرة لما الـ widget يتشال من الشجرة نهائيًا: هنا تقفل كل اللي فتحته.

زي [[useEffect]] بـ dependency array فاضية ومعاه cleanup في React، بس متقسّم على دالتين واضحين. وفيه [[didUpdateWidget]] لما الأب يبعت props جديدة.`,
          example: R`// imports: dart:async و material. و Clock نفسه StatefulWidget عادي زي Counter.
class _ClockState extends State<Clock> {
  late final Timer _timer;

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) => setState(() {}));
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Text(DateTime.now().toString().substring(11, 19));
}`,
          try: "حط الساعة في شاشة تانية بتفتحها بـ Navigator، وضيف [[debugPrint('tick')]] جوه الـ timer. ارجع من الشاشة: الـ tick وقف. امسح [[_timer.cancel()]] وجرّب تاني: الـ tick شغال والشاشة مقفولة، ومعاه error.",
          flag: "script",
          deep: {
            why: "فيه حاجات لازم تتعمل مرة واحدة مش مع كل build: تبدأ timer، تفتح اتصال، تعمل controller، تطلب بيانات. ولو فتحتها لازم تقفلها لما الشاشة تمشي، وإلا هتفضل شغالة في الخلفية تاكل بطارية وذاكرة وتنادي setState على شاشة مش موجودة.",
            how: R`دورة حياة الـ State بالترتيب:
- [[createState]]: الـ widget بيعمل الـ State.
- [[initState]]: مرة واحدة. و [[mounted]] بقت true. و [[context]] موجود، بس متستخدموش في حاجات بتعتمد على inherited widgets (زي Theme و MediaQuery)، ودي مكانها didChangeDependencies أو build.
- [[didChangeDependencies]]: بعد initState، وكل ما inherited widget انت معتمد عليه يتغير.
- [[build]]: كتير.
- [[didUpdateWidget(oldWidget)]]: الأب بعت widget جديد من نفس النوع في نفس المكان. هنا تقارن [[oldWidget.userId != widget.userId]] وتعيد التحميل لو لازم.
- [[deactivate]] ثم [[dispose]]: الـ widget اتشال. بعد dispose [[mounted]] بقت false، وأي setState هيضرب.

ترتيب [[super]]: في initState نادي [[super.initState()]] الأول، وفي dispose [[super.dispose()]] في الآخر. زي ما بتبني من الأساس وتهد من فوق.

الحاجات اللي لازم تتقفل في dispose: [[Timer]]، و [[StreamSubscription]]، و [[TextEditingController]] و [[ScrollController]] و [[AnimationController]] و [[FocusNode]]، وأي listener ضفته بـ [[addListener]].

initState مينفعش تبقى async (Flutter بيرمي error لو رجّعت Future). ابدأ العملية جواها من غير [[await]] وخزّن الـ Future في متغير (درس FutureBuilder في المستوى ٢).`,
            when: "أي controller، أو timer، أو subscription، أو تحميل بيانات أول ما الشاشة تفتح.",
            mistakes: R`تكتب [[void initState() async]]. وتنسى dispose لـ controller فيبقى memory leak. وتعمل الـ controller جوه build: كل rebuild يعمل واحد جديد والنص اللي المستخدم كتبه يروح. وتستخدم [[Theme.of(context)]] جوه initState فيطلع error، حطه في build.`
          },
          lines: [
            "الـ State بتاع widget اسمه Clock.",
            "الـ timer هيتعمل في initState، فـ [[late]].",
            "بتعيد تعريف دالة من الأب.",
            "مرة واحدة لما الـ State يتعمل.",
            "لازم الأول.",
            "ابدأ timer كل ثانية يعمل rebuild.",
            "قفلة initState.",
            "بتعيد تعريف دالة من الأب.",
            "مرة واحدة لما الـ widget يتشال نهائيًا.",
            "اقفل الـ timer. من غير السطر ده هيفضل شغال بعد ما الشاشة تتقفل.",
            "لازم في الآخر.",
            "قفلة dispose.",
            "بتعيد تعريف build.",
            "الساعة دلوقتي بالشكل HH:mm:ss.",
            "قفلة."
          ],
          sol: R`وانت في شاشة الساعة الترمنال يطبع [[tick]] كل ثانية. لما ترجع، الـ tick بيقف (ممكن tick واحد زيادة أثناء animation الرجوع، لأن الشاشة لسه في الشجرة لحد ما الـ animation يخلص). دا dispose اشتغل و [[cancel]] وقّف الـ timer.

من غير [[_timer.cancel()]]: بعد ما ترجع الـ tick مكمّل كل ثانية، ومع كل واحد error في الترمنال: [[setState() called after dispose(): _ClockState#... (lifecycle state: defunct, not mounted)]]، ومعاها شرح إن الحل تلغي الـ timer في dispose أو تسأل [[mounted]]، وإن دا ممكن يكون memory leak. الـ timer ماسك reference للـ State فمش هيتمسح من الذاكرة، ولو فتحت الشاشة ٥ مرات هيبقى عندك ٥ timers شغالين.

الغلط الشائع إنك تحل الـ error بـ [[if (mounted) setState(...)]] جوه الـ timer وتسيب الـ cancel: الـ error اختفى بس الـ timer لسه شغال في الخلفية للأبد. mounted مكانها بعد await، إنما أي حاجة انت فتحتها (timer، subscription، controller) مكان قفلها dispose.`,
          solCode: R`import 'dart:async';
import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(home: Builder(
      builder: (context) => Scaffold(
        body: Center(
          child: FilledButton(
            onPressed: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => Scaffold(appBar: AppBar(), body: const Center(child: Clock()))),
            ),
            child: const Text('open clock'),
          ),
        ),
      ),
    )));

class Clock extends StatefulWidget {
  const Clock({super.key});
  @override
  State<Clock> createState() => _ClockState();
}

class _ClockState extends State<Clock> {
  late final Timer _timer;

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      debugPrint('tick');
      setState(() {});
    });
  }

  @override
  void dispose() {
    _timer.cancel(); // امسح السطر ده عشان تشوف الـ error
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Text(DateTime.now().toString().substring(11, 19));
}`
        }
      ]
    },
    {
      t: "الـ layout",
      l: 1,
      n: "مفيش CSS: المسافات والترتيب والتوسيط كلها widgets، والقاعدة: الحدود بتنزل والأحجام بتطلع",
      items: [
        {
          cmd: "Row و Column",
          title: "رص العناصر جنب بعض أو تحت بعض",
          desc: R`[[Column]] بيرص الـ children تحت بعض، و [[Row]] جنب بعض. زي flexbox بـ [[flex-direction: column]] و [[row]].

[[mainAxisAlignment]] الترتيب على الاتجاه الأساسي (زي justify-content)، و [[crossAxisAlignment]] على الاتجاه التاني (زي align-items). و [[spacing]] مسافة ثابتة بين العناصر (زي gap).`,
          example: R`// في body بتاع Scaffold:
Row(
  spacing: 12,
  children: [
    const CircleAvatar(radius: 28, child: Icon(Icons.person)),
    Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: const [Text('Ali Hassan'), Text('Flutter developer')],
    ),
    const Spacer(),
    IconButton(onPressed: () {}, icon: const Icon(Icons.edit)),
  ],
)`,
          try: "غيّر [[crossAxisAlignment]] لـ [[center]] وبعدين [[end]] وشوف النصين بيتحركوا إزاي. وشيل الـ [[Spacer]] وحط [[mainAxisAlignment: MainAxisAlignment.spaceBetween]] على الـ Row.",
          flag: "script",
          deep: {
            why: "كل شاشة عبارة عن صفوف وأعمدة جوه بعض: هيدر فيه صورة واسم، وكارت فيه عنوان وسعر، وفورم حقول تحت بعض. Row و Column هم الـ flexbox بتاع Flutter، وهتكتبهم في كل ملف.",
            how: R`قاعدة الـ layout في Flutter: «constraints go down, sizes go up, parent sets position». الأب بيقول للابن «عرضك من كذا لكذا»، والابن بيختار حجمه جوه الحدود دي ويرجّعه، والأب يقرر مكانه.

Column بيدّي كل ابن ارتفاع غير محدود (unbounded) على الاتجاه الأساسي، ويقيسهم واحد واحد، وبعدين يوزعهم حسب [[mainAxisAlignment]]: [[start]] و [[center]] و [[end]] و [[spaceBetween]] و [[spaceAround]] و [[spaceEvenly]]. و [[crossAxisAlignment]] على العرض: [[start]] و [[center]] و [[stretch]] (يمط الابن على العرض كله).

[[mainAxisSize]]: الافتراضي [[max]] يعني Column بياخد كل الارتفاع المتاح. [[min]] ياخد على قد العيال بس، ودا المهم لما Column جوه Row أو جوه Dialog.

الاتجاهات بتفهم RTL: [[start]] في العربي يعني اليمين. عشان كده استخدم start و end مش left و right.

ومن Dart 3.10 تقدر تختصر: [[mainAxisAlignment: .center]] بدل [[MainAxisAlignment.center]] (dot shorthands)، لأن النوع معروف من الـ parameter.`,
            when: "دايمًا. Row لحاجات جنب بعض (أيقونة ونص، أزرار)، و Column لحاجات تحت بعض (فورم، كارت). ولو المحتوى أطول من الشاشة: ListView مش Column.",
            mistakes: R`نص طويل في Row فيطلع الشريط الأصفر والأسود و [[A RenderFlex overflowed by 42 pixels on the right]]: الـ Row مدّي النص عرض غير محدود، فالنص مش عارف يلف. الحل تحطه في [[Expanded]] (الدرس الجاي). و Column فيه عناصر أطول من الشاشة: نفس الـ overflow تحت، والحل ListView أو [[SingleChildScrollView]].`
          },
          lines: [
            "صف: العناصر جنب بعض (في RTL بيبدأ من اليمين).",
            "١٢ بين كل عنصر والتاني.",
            "العناصر.",
            "صورة دايرية، وجواها أيقونة لحد ما يبقى فيه صورة.",
            "عمود جوه الصف: الاسم وتحته الوصف.",
            "رصّهم من أول السطر (start) بدل التوسيط.",
            "العمود ياخد أقل ارتفاع محتاجه بس.",
            "النصين.",
            "قفلة العمود.",
            "[[Spacer]] ياخد كل المساحة الفاضية، فيزق اللي بعده للآخر.",
            "زرار أيقونة في آخر الصف.",
            "قفلة الـ children.",
            "قفلة الصف."
          ],
          sol: R`[[crossAxisAlignment]] هنا بيحرّك النصين بالنسبة لبعض، مش بالنسبة للشاشة. [[Flutter developer]] أطول، فهو اللي بيحدد عرض الـ Column ومش بيتحرك خالص. اللي بيتحرك [[Ali Hassan]]: مع [[start]] بدايته على بداية التاني، ومع [[center]] بيبقى في نص عرض التاني، ومع [[end]] آخره على آخر التاني. (قست ده في widget test: [[Ali Hassan]] اتنقل مسافة متساوية مع كل خطوة، و [[Flutter developer]] فضل مكانه.) لو الاسم كان أطول من الوصف كان الوصف هو اللي هيتحرك.

ولما تشيل الـ Spacer وتحط [[spaceBetween]]: الصورة في الأول والقلم في الآخر زي ما هم، بس الاسم والوصف راحوا في نص الصف بدل ما يفضلوا لازقين في الصورة. لأن spaceBetween بيوزّع المساحة الفاضية بالتساوي بين كل عنصرين، مش بيحطها كلها قبل آخر عنصر. دا الفرق بين Spacer (المساحة كلها في مكان واحد انت اخترته) و spaceBetween (مقسومة على كل الفواصل).

ولو سبت الـ Spacer وحطيت spaceBetween كمان، مش هتلاقي أي فرق: Spacer أكل المساحة الفاضية كلها، فمفيش حاجة فاضلة يوزّعها spaceBetween.`
        },
        {
          cmd: "Expanded",
          title: "عنصر ياخد المساحة الفاضية كلها أو نسبة منها",
          desc: R`جوه Row أو Column، [[Expanded]] بيخلي الابن ياخد كل المساحة الفاضية على الاتجاه الأساسي. ولو أكتر من واحد، [[flex]] بيقسم بينهم بالنسبة: flex 3 و flex 1 يعني ٣ أرباع وربع. زي [[flex: 1]] في CSS.

و [[Flexible]] نفس الفكرة بس الابن مش مجبر يملى نصيبه: ياخد على قده لحد الحد ده.`,
          example: R`Row(
  children: [
    const Icon(Icons.description),
    const Expanded(
      flex: 3,
      child: Text('a_very_long_file_name_that_would_overflow.pdf', overflow: TextOverflow.ellipsis),
    ),
    Expanded(
      child: FilledButton(onPressed: () {}, child: const Text('Open')),
    ),
  ],
)`,
          try: "شيل الـ Expanded من حوالين النص وشوف الشريط الأصفر والأسود. وبعدين غيّر flex لـ 1 وشوف الزرار والنص بياخدوا قد إيه.",
          flag: "script",
          deep: {
            why: "أشهر error في Flutter للمبتدئين هو الشريط الأصفر والأسود بتاع overflow، وغالبًا سببه نص أو صورة في Row من غير Expanded. وأي تقسيم بالنسبة (قايمة جانبية وتلتين محتوى) بيتعمل بيه.",
            how: R`Row بيعمل layout على مرحلتين. الأول يقيس العيال اللي مش flex (الأيقونة والأزرار العادية) ويدّيهم عرض غير محدود، فكل واحد ياخد عرضه الطبيعي. بعدين ياخد المساحة اللي فضلت ويقسمها على الـ Expanded و Flexible حسب الـ flex، ويدّي كل واحد حد محدود.

عشان كده نص من غير Expanded بياخد عرض غير محدود: مش عارف إن الشاشة خلصت، فبيطلب عرض النص كله في سطر واحد ويعمل overflow. جوه Expanded بياخد عرض محدد، فيلف لسطور أو يعمل ellipsis.

[[Expanded]] هو في الحقيقة [[Flexible(fit: FlexFit.tight)]]: الابن لازم يملى نصيبه. و [[Flexible]] العادي [[FlexFit.loose]]: الابن ياخد لحد نصيبه، ولو محتاج أقل ياخد أقل.

[[Spacer]] هو Expanded فاضي، بيزق اللي بعده.

والـ Expanded لازم يبقى ابن مباشر لـ Row أو Column أو Flex. لو حطيته جوه Padding جوه Row، هيطلع error [[Incorrect use of ParentDataWidget]]. الصح: Expanded بره والـ Padding جواه.`,
            when: "نص ممكن يطول في صف. تقسيم نسب (٢:١). عنصر يملى الباقي من الشاشة في Column (زي ListView تحت هيدر).",
            mistakes: R`ListView جوه Column من غير Expanded: الـ ListView عايز ارتفاع محدود والـ Column بيدّيه غير محدود، فيطلع [[Vertical viewport was given unbounded height]]. حطه في Expanded. و Expanded جوه حاجة مش Row ولا Column. و Expanded جوه Row جوه SingleChildScrollView أفقي: مفيش «مساحة فاضية» أصلًا لأن العرض غير محدود، فيضرب.`
          },
          lines: [
            "صف.",
            "العناصر.",
            "أيقونة بحجمها الطبيعي.",
            "النص ياخد من المساحة الفاضية...",
            "...٣ أجزاء من ٤.",
            "ومعاه عرض محدود، فيقدر يقص نفسه ويحط ... في الآخر.",
            "قفلة.",
            "الزرار ياخد الجزء الرابع (flex الافتراضي 1)...",
            "...ويتمط على عرض نصيبه.",
            "قفلة.",
            "قفلة الـ children.",
            "قفلة الصف."
          ],
          sol: R`لما تشيل الـ Expanded من حوالين النص: شريط أصفر وأسود مخطط على الحافة اليمين (أو الشمال في RTL)، ومكتوب عليه الرقم، وفي الترمنال رسالة زي [[A RenderFlex overflowed by 254 pixels on the right.]] (الرقم ده من widget test، وعندك هيختلف حسب عرض الشاشة والخط). لاحظ إن [[TextOverflow.ellipsis]] مبقاش بيعمل حاجة: النص خد عرض غير محدود، فشايف إن فيه مكان لكل الحروف ومش محتاج يقص. والزرار اختفى: الـ Expanded بتاعه خد عرض صفر، لأن مفيش مساحة فاضلة أصلًا يتقسم عليها.

ولما ترجّع الـ Expanded وتخلي flex بتاع النص 1: النص والزرار بياخدوا نفس العرض بالظبط (نص المساحة بعد الأيقونة لكل واحد؛ على شاشة عرضها 411 كانوا 193.7 و 193.7). ومع flex 3 كانوا 290.6 للنص و 96.9 للزرار، يعني ٣ لـ ١ بالظبط. الأيقونة مش داخلة في القسمة لأنها اتقاست الأول بحجمها الطبيعي.

الغلط الشائع إنك تحل الـ overflow بإنك تحط [[width]] ثابت أو تصغّر الخط: هيشتغل على موبايلك ويبوظ على شاشة أصغر. Expanded (أو Flexible) هو الحل لأنه بيدّي النص «الباقي» مهما كان.`
        },
        {
          cmd: "Container و Padding",
          title: "مسافات وخلفية وحدود وحجم ثابت حوالين أي عنصر",
          desc: R`[[Padding]] مسافة جوه حوالين الابن. و [[SizedBox]] حجم ثابت أو مسافة فاضية بين عنصرين ([[SizedBox(height: 16)]]). و [[Container]] الـ div بتاع Flutter: padding و margin ولون وحدود وزوايا مدورة وحجم في widget واحد.

القاعدة: لو محتاج حاجة واحدة استخدم الـ widget بتاعها (Padding أو SizedBox أو ColoredBox). و Container لما تحتاج كذا حاجة مع بعض.`,
          example: R`Container(
  width: double.infinity,
  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
  padding: const EdgeInsets.all(16),
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(12),
    border: Border.all(color: Colors.black12),
    boxShadow: const [BoxShadow(blurRadius: 8, color: Colors.black26)],
  ),
  child: const Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [Text('Order #1042'), SizedBox(height: 8), Text('3 items, 450 EGP')],
  ),
)`,
          try: "ضيف [[color: Colors.red]] على الـ Container نفسه (جنب decoration) وشوف الـ error. وبعدين غيّر الـ margin لـ [[EdgeInsetsDirectional.only(start: 32)]] وشغّل التطبيق بالعربي.",
          flag: "script",
          deep: {
            why: "مفيش CSS في Flutter، فمفيش [[margin: 16px]] تحطها على أي عنصر. كل مسافة ولون وحدود widget بيلف العنصر. Container و Padding و SizedBox هم الأدوات اللي هتبني بيها أي كارت.",
            how: R`Container مش render object لوحده: هو widget مجمّع، build بتاعه بيرجّع Padding و DecoratedBox و ConstrainedBox وغيرهم حسب اللي انت حاطه. عشان كده [[Padding]] لوحده أخف وأوضح لما مش محتاج غيره.

[[EdgeInsets.all(16)]] من كل ناحية، و [[symmetric(horizontal:, vertical:)]]، و [[only(left: 8)]]. وفي تطبيق عربي استخدم [[EdgeInsetsDirectional.only(start: 8)]] عشان تتقلب مع RTL.

حجم Container من غير ابن ومن غير width و height: بياخد أكبر مساحة متاحة. ومعاه ابن: بياخد على قد الابن. ولو حطيت width وهو جوه حاجة بتفرض حجم (زي ابن مباشر للشاشة كلها)، حدود الأب بتكسب، ودا سبب «حطيت width: 100 ومش بيسمع».

[[color]] و [[decoration]] مع بعض error: [[Cannot provide both a color and a decoration]]. حط اللون جوه BoxDecoration.

و [[SizedBox]] بقيمة ثابتة widget const رخيص جدًا، ودا الأحسن للمسافات بين العناصر (أو [[spacing]] في Row و Column).`,
            when: "كارت، أو badge، أو خلفية ملونة بحدود. و Padding لوحده للمسافات. و SizedBox للفراغات والأحجام الثابتة.",
            mistakes: R`Container في كل حتة حتى لو محتاج padding بس. و [[color]] مع [[decoration]] في نفس الوقت. و [[EdgeInsets.only(left: ...)]] في تطبيق عربي فالمسافة تطلع في الناحية الغلط.`
          },
          lines: [
            "صندوق: زي div عليه style.",
            "ياخد العرض كله المتاح.",
            "مسافة بره الصندوق: ١٦ يمين وشمال و٨ فوق وتحت.",
            "مسافة جوه الصندوق حوالين المحتوى.",
            "الشكل: لما تستخدم decoration، اللون بيتحط جواها مش على Container.",
            "خلفية بيضا.",
            "زوايا مدورة.",
            "حدود رفيعة.",
            "ضل خفيف.",
            "قفلة الـ decoration.",
            "المحتوى: عمود.",
            "النصوص من البداية.",
            "عنوان، ومسافة ٨ فاضية، وتفاصيل.",
            "قفلة العمود.",
            "قفلة الصندوق."
          ],
          sol: R`مع [[color: Colors.red]] جنب decoration الكود بيترجم عادي (مفيش compile error)، بس أول ما الشاشة تتبني في debug بتطلع الشاشة الحمرا ومعاها في الترمنال: [[Failed assertion: ... 'color == null || decoration == null': Cannot provide both a color and a decoration.]] وبعدها [[The color argument is just a shorthand for "decoration: BoxDecoration(color: color)".]]. يعني color نفسها بتتحول لـ BoxDecoration، فمينفعش اتنين. الحل: اللون جوه الـ BoxDecoration (وهو أصلًا هناك: [[Colors.white]]). وفي release الـ asserts مش بتشتغل، فمتعتمدش إن حد هيشوفها غيرك.

و [[EdgeInsetsDirectional.only(start: 32)]]: في تطبيق إنجليزي الكارت بيبعد 32 من الشمال، وفي العربي بيبعد 32 من اليمين وبيلزق في الشمال (في widget test بـ [[TextDirection.rtl]] الكارت كان من 0 لـ 768 على شاشة عرضها 800، وفي ltr من 32 لـ 800). عشان تشوف ده في تطبيقك: [[locale: const Locale('ar')]] مع [[flutter_localizations]] في MaterialApp، أو للتجربة السريعة لف الـ Scaffold في [[Directionality(textDirection: TextDirection.rtl, child: ...)]].

الغلط الشائع إنك تستخدم [[EdgeInsets.only(left: 32)]] وتجرّب بالإنجليزي بس، فالمسافة تطلع في الناحية الغلط عند المستخدم العربي.`
        },
        {
          cmd: "Stack",
          title: "عناصر فوق بعض: badge على أيقونة أو نص على صورة",
          desc: R`[[Stack]] بيحط الـ children فوق بعض، أول واحد تحت وآخر واحد فوق. و [[Positioned]] بيثبت ابن في مكان من حواف الـ Stack ([[top]] و [[bottom]] و [[left]] و [[right]]). زي [[position: relative]] على الأب و [[absolute]] على الابن في CSS.

اللي من غير Positioned بيتحط حسب [[alignment]] بتاع الـ Stack (الافتراضي أول الزاوية اللي فوق). و [[PositionedDirectional]] بـ start و end عشان RTL.`,
          example: R`Stack(
  clipBehavior: Clip.none,
  children: [
    const Icon(Icons.shopping_cart, size: 32),
    PositionedDirectional(
      top: -4,
      end: -6,
      child: Container(
        padding: const EdgeInsets.all(4),
        decoration: const BoxDecoration(color: Colors.red, shape: BoxShape.circle),
        child: const Text('3', style: TextStyle(color: Colors.white, fontSize: 10)),
      ),
    ),
  ],
)`,
          try: "شيل [[clipBehavior: Clip.none]] وشوف الـ badge اتقص. وبعدين اعمل صورة وتحتها نص أبيض على شريط أسود نص شفاف بـ [[Positioned(left: 0, right: 0, bottom: 0, child: ...)]].",
          flag: "script",
          deep: {
            why: "Row و Column بيرصوا جنب بعض، مش فوق بعض. أي تصميم فيه طبقات (رقم على أيقونة السلة، نص فوق صورة، زرار عايم فوق خريطة) محتاج Stack.",
            how: R`حجم الـ Stack بيتحدد من العيال اللي مش Positioned: بياخد حجم أكبر واحد فيهم. الـ Positioned مش بيأثر على الحجم، عشان كده لو كل العيال Positioned الـ Stack بياخد أكبر مساحة متاحة.

[[Positioned(top: 0, left: 0, right: 0)]] يعني لازق فوق وعلى العرض كله. و [[Positioned.fill]] يملى الـ Stack كله (مفيد لطبقة تدرج فوق صورة). و [[PositionedDirectional]] بيستخدم start و end عشان RTL.

[[clipBehavior]] الافتراضي [[Clip.hardEdge]]: أي حاجة طالعة بره حدود الـ Stack بتتقص. و [[Clip.none]] بيسيبها تبان، بس اللمس عليها بره الحدود مش هيوصل (الـ hit testing بيقف عند حدود الأب).

و [[IndexedStack]] بيعرض ابن واحد بس من العيال بس بيحتفظ بالـ state بتاع الكل، ودا اللي بيتعمل بيه bottom navigation من غير ما كل تاب يرجع من الأول.`,
            when: "badge، ونص على صورة، و loading overlay فوق الشاشة، وعناصر عايمة. لو الحاجات جنب بعض: Row و Column مش Stack.",
            mistakes: R`تبني layout كامل بـ Stack و Positioned بأرقام ثابتة زي CSS absolute: هيبوظ على أي شاشة بحجم مختلف. وتحط Positioned جوه حاجة مش Stack فيطلع error. وزرار طالع بره الـ Stack بـ Clip.none ومش بيستجيب للمس.`
          },
          lines: [
            "طبقات فوق بعض.",
            "متقصّش اللي طالع بره حدود الـ Stack (الـ badge طالع شوية).",
            "الطبقات من تحت لفوق.",
            "الأيقونة: أول طبقة، وهي اللي بتحدد حجم الـ Stack.",
            "الـ badge مثبّت، و Directional عشان يتقلب في RTL.",
            "٤ فوق الحافة.",
            "وطالع شوية من ناحية النهاية (يمين في الإنجليزي، شمال في العربي).",
            "الدايرة الحمرا.",
            "مسافة جواها.",
            "شكل دايرة بلون أحمر.",
            "الرقم بخط صغير أبيض.",
            "قفلة الـ Container.",
            "قفلة الـ Positioned.",
            "قفلة الطبقات.",
            "قفلة الـ Stack."
          ],
          sol: R`لما تشيل [[clipBehavior: Clip.none]]: الدايرة الحمرا بتتقص من فوق ومن الجنب، وتبان كأنها ربع أو نص دايرة لازقة في ركن الأيقونة. لأن الـ Stack حجمه على قد الأيقونة بس (32×32)، والـ badge بـ [[top: -4]] و [[end: -6]] طالع بره الحدود دي، والافتراضي [[Clip.hardEdge]] بيقص أي حاجة بره. مفيش error ولا warning، الشكل بس اللي بيبوظ، ودا اللي بيخلي الغلطة دي تعدّي كتير.

الصورة بالشريط: الـ Stack فيه الصورة كأول طبقة (ودي اللي بتحدد حجمه)، وفوقها Positioned بـ [[left: 0, right: 0, bottom: 0]] من غير top. كده الشريط لازق تحت، وعرضه قد الصورة بالظبط، وارتفاعه على قد النص والـ padding. واللون [[Colors.black54]] أسود بشفافية حوالي ٥٤٪. (في widget test الصورة كانت 800×200 والشريط من y=164 لـ 200 بعرض 800.)

الغلط الشائع: تنسى [[left: 0, right: 0]] وتكتب [[bottom: 0]] بس، فالشريط ياخد عرض النص بس ويلزق في الركن. أو تحط [[top: 0]] كمان فالشريط يتمط على الصورة كلها.`,
          solCode: R`import 'package:flutter/material.dart';

class CaptionedImage extends StatelessWidget {
  const CaptionedImage({super.key, required this.image, required this.caption});

  final ImageProvider image;
  final String caption;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Image(image: image, width: double.infinity, height: 200, fit: BoxFit.cover),
        Positioned(
          left: 0,
          right: 0,
          bottom: 0,
          child: Container(
            color: Colors.black54,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: Text(caption, style: const TextStyle(color: Colors.white)),
          ),
        ),
      ],
    );
  }
}

// الاستخدام:
// const CaptionedImage(image: NetworkImage('https://picsum.photos/600/400'), caption: 'Cairo, Egypt')`
        }
      ]
    },
    {
      t: "Dart بعمق",
      l: 2,
      n: "patterns على JSON وعلى الحالات، و null safety في الأماكن اللي بتوقع فيها فعلًا: fields و JSON و casts",
      items: [
        {
          cmd: "patterns بعمق",
          title: "تفك JSON وتختار حسب شكل البيانات في سطر واحد",
          desc: R`درس «records و patterns» في المستوى ١ وراك الأساس. هنا الأشكال اللي هتستخدمها في تطبيق حقيقي: map pattern ([[{'name': String name}]]) بيتأكد من المفتاح ونوع القيمة في نفس الخطوة، و list pattern ([[[final first, ...]]])، و relational ([[>= 400 && < 500]])، و logical-or ([[200 || 201]])، و object pattern على sealed class بأسماء fields مختلفة.

و [[if (json case {...})]] هو أأمن طريقة تقرا بيها JSON: لو الشكل مش مطابق الشرط false وخلاص، مفيش exception.`,
          example: R`sealed class Shape {}
class Circle extends Shape { Circle(this.r); final double r; }
class Rect extends Shape { Rect(this.w, this.h); final double w, h; }

double area(Shape s) => switch (s) {
  Circle(:final r) => 3.14 * r * r,
  Rect(w: final side, h: final h) when side == h => side * side,
  Rect(:final w, :final h) => w * h,
};

String parseUser(Object? json) {
  if (json case {'name': String name, 'age': int age} when age >= 18) {
    return '$name adult';
  }
  return switch (json) {
    {'name': String name} => '$name (no valid age)',
    [final first, ...] => 'got a list starting with $first',
    null => 'empty response',
    _ => 'unknown shape',
  };
}

String classify(int code) => switch (code) {
  200 || 201 || 204 => 'ok',
  >= 400 && < 500 => 'client error',
  >= 500 => 'server error',
  _ => 'other',
};

void main() {
  print([area(Circle(1)), area(Rect(2, 2)), area(Rect(2, 3))]);
  print(parseUser({'name': 'Ali', 'age': 30}));
  print(parseUser({'name': 'Sara', 'age': '30'}));
  print(parseUser([1, 2]));
  print(parseUser(null));
  print('$__{classify(201)} $__{classify(404)} $__{classify(503)}');
  final scores = {'ali': 90, 'sara': 75};
  for (final MapEntry(:key, :value) in scores.entries) {
    print('$key=$value');
  }
  var (a, b) = (1, 2);
  (a, b) = (b, a);
  print('$a $b');
}`,
          try: "اكتب دالة [[String describeOrder(Map<String, dynamic> json)]] بـ switch على الـ Map: لو [[{'status': 'shipped', 'tracking': String t}]] ترجّع رقم الشحنة، ولو [[{'status': 'cancelled', 'reason': String r}]] ترجّع السبب، ولو [[{'items': [_, _, ...]}]] (عنصرين أو أكتر) ترجّع «طلب كبير»، وغير كده «مش معروف». جرّبها على ٤ maps.",
          flag: "script",
          deep: {
            why: "JSON اللي جاي من API نوعه [[Map<String, dynamic>]]، يعني الـ compiler مش عارف أي حاجة عن جواه. الطريقة القديمة: [[json['age'] as int]] في كل سطر، وأول ما السيرفر يبعت [['30']] نص بدل رقم، التطبيق يضرب في حتة بعيدة. الـ patterns بتخليك تسأل «هل الشكل ده مطابق؟» وتطلّع المتغيرات بأنواعها مرة واحدة، ولو مش مطابق تقرر انت هتعمل إيه.",
            how: R`أنواع الـ patterns المهمة:
- map: [[{'name': String name}]] بيطابق لو المفتاح موجود والقيمة String. المفاتيح الزيادة في الـ Map مش مشكلة.
- list: [[[a, b]]] طول 2 بالظبط، و [[[first, ...]]] واحد أو أكتر، و [[[..., last]]] آخر عنصر، و [[[_, _, ...rest]]] بيحط الباقي في rest.
- object: [[Circle(:final r)]] بيتأكد إن النوع Circle ويطلّع [[r]]. و [[Rect(w: final side)]] لو عايز اسم متغير مختلف عن اسم الـ field.
- relational: [[>= 400]] و [[< 500]]، و [[&&]] بينهم.
- logical-or: [[200 || 201]]. لو فيه متغيرات، لازم الاتنين يطلّعوا نفس الأسماء.
- null-check [[final x?]]: يطابق لو مش null ويدّيك x من غير ?.
- [[_]] يطابق أي حاجة، و [[when]] شرط زيادة بعد ما الشكل يطابق.

الـ destructuring في for: [[for (final MapEntry(:key, :value) in map.entries)]] بيفك كل entry. و [[(a, b) = (b, a)]] swap في سطر بـ records.

exhaustiveness مع sealed: الـ compiler بيعرف إن Shape يا Circle يا Rect، فالـ switch من غير [[_]] مقبول. بس لاحظ في المثال: [[Rect(...) when side == h]] مش بتعد تغطية كاملة لـ Rect (بسبب الـ when)، فلازم [[Rect(:final w, :final h)]] بعدها. لو شلتها الـ compiler يقولك Rect مش متغطية.

[[if-case]] مقابل [[switch]]: if-case لما عندك شكل واحد بتدوّر عليه، و switch لما فيه كذا احتمال.`,
            when: "قراءة JSON من API (خصوصًا لو مش هتستخدم codegen)، و state فيها حالات (sealed + switch)، و status codes، وأي if/else طويل بيسأل عن نوع أو شكل.",
            mistakes: R`تحط case عام قبل الخاص فالخاص عمره ما يتنفذ (الـ analyzer بيقولك [[dead code]] أو [[unreachable switch case]] أحيانًا، مش دايمًا). وتفتكر إن [[{'name': String name}]] معناه إن الـ Map فيها name بس: لأ، بيطابق حتى لو فيها ١٠ مفاتيح تانية. وتكتب [[{'age': int age}]] وتنسى إن JSON فيه الأرقام العشرية [[double]]: [[30.0]] مش هتطابق int. ولو السيرفر ممكن يبعت الاتنين: [[{'age': num age}]] وبعدين [[age.toInt()]].`
          },
          lines: [
            "sealed: كل الأشكال معروفة للـ compiler.",
            "دايرة ليها نص قطر.",
            "مستطيل ليه عرض وطول.",
            "switch expression على نوع الشكل.",
            "object pattern: لو Circle طلّع r.",
            "مستطيل بأسماء متغيرات مختلفة، و [[when]] للمربع.",
            "أي مستطيل تاني. من غيره الـ switch مش exhaustive.",
            "قفلة.",
            "Object? لأن JSON ممكن يبقى أي حاجة.",
            "if-case: Map فيها name نص و age رقم، والسن 18 أو أكتر.",
            "هنا name و age متغيرات بأنواعها.",
            "قفلة الـ if.",
            "باقي الاحتمالات بـ switch.",
            "Map فيها name بس (أو age نوعه غلط).",
            "list pattern: عنصر أو أكتر.",
            "null.",
            "أي حاجة تانية.",
            "قفلة.",
            "قفلة الدالة.",
            "switch على رقم.",
            "logical-or: أي واحد من التلاتة.",
            "relational: من 400 لحد 499.",
            "500 أو أكتر.",
            "الباقي.",
            "قفلة.",
            "البداية.",
            "[3.14, 4.0, 6.0].",
            "Ali adult.",
            "Sara (no valid age): age نص مش int، فالـ if-case مطابقش.",
            "got a list starting with 1.",
            "empty response.",
            "ok client error server error.",
            "Map عادي.",
            "فك كل entry لـ key و value في الـ for نفسه.",
            "ali=90 ثم sara=75.",
            "قفلة الـ for.",
            "record destructuring لمتغيرين.",
            "swap من غير متغير مؤقت.",
            "2 1.",
            "قفلة."
          ],
          sol: R`الدالة بـ switch على الـ Map، والترتيب مهم: الحالات المحددة الأول. [[describeOrder({'status': 'shipped', 'tracking': 'EG123'})]] ترجّع رقم الشحنة، و [[{'status': 'cancelled', 'reason': 'out of stock'}]] ترجّع السبب، و [[{'items': [1, 2, 3]}]] ترجّع «طلب كبير»، و [[{'items': [1]}]] ترجّع «مش معروف» لأن [[[_, _, ...]]] محتاج عنصرين على الأقل.

الغلط الشائع: تكتب [[{'status': 'shipped'}]] من غير tracking في case قبل اللي فيه tracking، فيمسك كل الـ shipped. أو تكتب [['tracking': tracking]] من غير نوع، فيطابق حتى لو القيمة null.`,
          solCode: R`String describeOrder(Map<String, dynamic> json) => switch (json) {
  {'status': 'shipped', 'tracking': String t} => 'رقم الشحنة $t',
  {'status': 'cancelled', 'reason': String r} => 'اتلغى: $r',
  {'items': [_, _, ...]} => 'طلب كبير',
  _ => 'مش معروف',
};

void main() {
  print(describeOrder({'status': 'shipped', 'tracking': 'EG123'}));
  print(describeOrder({'status': 'cancelled', 'reason': 'out of stock'}));
  print(describeOrder({'items': [1, 2, 3]}));
  print(describeOrder({'items': [1]}));
}`
        },
        {
          cmd: "null safety بعمق",
          title: "ليه الـ compiler مش مصدّق إن الـ field مش null وانت لسه فاحصه",
          desc: R`درس «null safety» في المستوى ١ وراك [[?]] و [[??]] و [[!]]. هنا الحالات اللي بتوقع فيها في تطبيق حقيقي: field عام nullable مش بيعمله promotion حتى بعد if، و JSON اللي فيه null في النص ([[json['user']?['phones']]])، و [[as List<String>]] اللي بيضرب على بيانات jsonDecode، و [[nonNulls]] و [[?item]] جوه الـ list و [[...?]].

القاعدة: انسخ الـ field في متغير محلي قبل ما تفحصه، واقرا JSON بـ patterns أو casts آمنة، و [[!]] آخر حل مش أول حل.`,
          example: R`String? couponFor(String user) => user == 'vip' ? 'SAVE10' : null;

class Profile {
  Profile(this.bio, this._nick);
  final String? bio;
  final String? _nick;

  int bioLength() {
    final bio = this.bio;
    if (bio == null) return 0;
    return bio.length;
  }

  String nick() => _nick != null ? _nick.toUpperCase() : 'none';
}

void main() {
  final Map<String, dynamic> json = {'user': {'phones': null}};
  final phones = json['user']?['phones'] as List<String>?;
  print(phones?.first.length);
  final List<String?> raw = ['a', null, 'b'];
  print(raw.nonNulls.toList());
  final coupon = couponFor('vip');
  print(['subtotal', ?coupon, ...?phones]);
  print(Profile('hi', null).bioLength());
  print(Profile(null, 'ali').nick());
}`,
          try: "في [[bioLength]] امسح سطر [[final bio = this.bio;]] وشوف الـ error. وبعدين غيّر الـ json لـ [[{'user': {'phones': ['010', '011']}}]] وخليه جاي من [[jsonDecode]] (نص JSON حقيقي): السطر بتاع [[as List<String>?]] هيعمل إيه؟ صلّحه.",
          flag: "script",
          deep: {
            why: "الـ null safety في المستوى ١ سهلة لأن كل حاجة متغيرات محلية. في التطبيق الحقيقي البيانات في fields جوه classes، وجاية من JSON نوعه dynamic، ودول بالظبط المكانين اللي الـ compiler مبيقدرش يحميك فيهم لوحده، والناس بتحط [[!]] عشان تسكّته فترجع الـ crashes.",
            how: R`type promotion: بعد [[if (x != null)]] الـ compiler بيعامل x كأنه مش nullable، بس بشرط يبقى متأكد إن قيمته مش هتتغير بين الفحص والاستخدام. دا مضمون للمتغيرات المحلية والـ parameters. ومن Dart 3.2 للـ fields الـ private الـ final (زي [[_nick]] في المثال) لأن محدش بره الملف يقدر يعمل override ليها. إنما field عام زي [[bio]]: ممكن subclass يعمله getter بيرجّع قيمة مختلفة كل مرة، فالـ compiler بيرفض. الحل: [[final bio = this.bio;]] ثم الفحص على المحلي.

الـ null-aware chain: [[json['user']?['phones']]] لو user مش موجود السلسلة كلها بتقف وترجع null. و [[?.]] بيعمل short-circuit لباقي السلسلة كلها: [[phones?.first.length]] لو phones null مش هيكمّل لـ length.

JSON و casts: [[jsonDecode]] بيرجّع [[List<dynamic>]] و [[Map<String, dynamic>]] دايمًا، حتى لو كل العناصر نصوص. فـ [[as List<String>]] بيضرب [[type 'List<dynamic>' is not a subtype of type 'List<String>?']]. الصح [[(json['phones'] as List?)?.cast<String>()]] أو [[List<String>.from(...)]] أو pattern.

أدوات الـ collections: [[nonNulls]] بيشيل الـ nulls ويرجّع [[Iterable<String>]] مش [[Iterable<String?>]]. و [[?coupon]] جوه list literal (Dart 3.8) بيحط العنصر لو مش null بس. و [[...?phones]] بيفك list لو مش null. وفي الـ Map: [['due_at': ?dueAt]] بيحط المفتاح لو القيمة مش null.

[[Object?]] مقابل [[dynamic]]: الاتنين بيقبلوا أي حاجة، بس Object? بيجبرك تفحص النوع ([[if (x is int)]]) قبل ما تستخدمه، و dynamic بيسيبك تنادي أي حاجة وتضرب وقت التشغيل. لما تستقبل حاجة مش عارف نوعها: Object?.`,
            when: "كل model جاي من API، وكل field nullable في State أو class. ولما الـ compiler يقولك [[can't be unconditionally accessed]] على field: متحطش [[!]]، انسخه في متغير محلي.",
            mistakes: R`تحط [[!]] على field بعد ما فحصته بسطر: شغال النهارده، ولو حد غيّر الكود بين السطرين الـ crash رجع. وتكتب [[as List<String>]] على بيانات jsonDecode. وتعمل [[late]] لـ field ممكن فعلًا ميتحطش (الـ API فشل مثلًا) فيطلع [[LateInitializationError]] بدل شاشة خطأ. وسؤال انترفيو: «ليه promotion مش بيشتغل على field عام؟» لأن الـ field في Dart بيتقري من خلال getter ممكن يتعمله override، فمفيش ضمان إن القراية التانية هترجع نفس القيمة.`
          },
          lines: [
            "دالة ممكن ترجّع null.",
            "class فيه field عام nullable و field private nullable.",
            "constructor.",
            "عام: مفيش promotion عليه.",
            "private final: فيه promotion من Dart 3.2.",
            "دالة بتستخدم الـ field العام.",
            "انسخه في متغير محلي بنفس الاسم.",
            "افحص المحلي...",
            "...فيتعامل كـ String. لو فحصت this.bio مباشرة السطر ده مش هيترجم.",
            "قفلة.",
            "private final: الفحص المباشر شغال.",
            "قفلة الـ class.",
            "البداية.",
            "JSON فيه null في النص.",
            "[[?[]]]: لو user مش موجود وقف. والـ cast لـ nullable عشان القيمة null.",
            "null: السلسلة وقفت عند phones من غير ما تضرب.",
            "list فيها nulls.",
            "[a, b]، ونوعها List<String>.",
            "SAVE10.",
            "[[?coupon]] يتحط لو مش null، و [[...?phones]] يتفك لو مش null: [subtotal, SAVE10].",
            "2.",
            "ALI.",
            "قفلة."
          ],
          sol: R`لما تمسح السطر: [[The property 'length' can't be unconditionally accessed because the receiver can be 'null']] على [[bio.length]]، مع إنك فاحصه في السطر اللي قبله. لأن bio field عام، والـ compiler مش ضامن إن قراية تانية هترجع نفس القيمة.

ومع [[jsonDecode('{"user": {"phones": ["010", "011"]}}')]] السطر بيضرب وقت التشغيل: [[type 'List<dynamic>' is not a subtype of type 'List<String>?' in type cast]]. الـ list نصوص فعلًا، بس نوعها الحقيقي List<dynamic>. التصليح: [[(json['user']?['phones'] as List?)?.cast<String>()]]، وساعتها [[phones?.first.length]] تطبع 3، والـ list اللي بعدها [subtotal, SAVE10, 010, 011].

الغلط الشائع: تحل الـ error الأول بـ [[this.bio!.length]]. شغال، بس رجّعت الـ crash المحتمل بإيدك.`,
          solCode: R`import 'dart:convert';

void main() {
  final json = jsonDecode('{"user": {"phones": ["010", "011"]}}') as Map<String, dynamic>;
  final phones = (json['user']?['phones'] as List?)?.cast<String>();
  print(phones?.first.length);
  print(['subtotal', ...?phones]);
}`
        }
      ]
    },
    {
      t: "اللستات والتنقل والفورم",
      l: 2,
      n: "لستة طويلة من غير تقطيع، وشاشات بـ URLs و redirect للي مش عامل login، وفورم بيتأكد من البيانات قبل ما تتبعت",
      items: [
        {
          cmd: "ListView.builder",
          title: "لستة فيها ألف عنصر وبتتحرك ناعمة",
          desc: R`[[ListView(children: [...])]] بيعمل كل العناصر مرة واحدة، حتى اللي تحت خالص ومحدش شافها. [[ListView.builder]] بيعمل العناصر اللي ظاهرة على الشاشة بس (وشوية حواليها)، ولما تعمل scroll بيعمل الجديدة ويرمي اللي خرجت. فلستة فيها ١٠ آلاف منتج بتتكلف زي لستة فيها ١٥.

بتدّيه [[itemCount]] و [[itemBuilder]] بياخد index ويرجّع widget. و [[ListView.separated]] نفس الفكرة ومعاها فاصل بين العناصر.`,
          example: R`import 'package:flutter/material.dart';

typedef Product = ({int id, String name, double price});

class ProductList extends StatelessWidget {
  const ProductList({super.key, required this.products});
  final List<Product> products;

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: products.length,
      itemExtent: 72,
      itemBuilder: (context, index) {
        final p = products[index];
        return ListTile(
          key: ValueKey(p.id),
          leading: CircleAvatar(child: Text('$__{p.id}')),
          title: Text(p.name),
          trailing: Text('$__{p.price.toStringAsFixed(2)} EGP'),
        );
      },
    );
  }
}`,
          try: R`اعرض [[ProductList(products: List.generate(10000, (i) => (id: i, name: 'Item $i', price: i * 1.5)))]] وحط [[debugPrint('build $index')]] جوه itemBuilder. اعمل scroll وشوف الأرقام اللي بتتطبع. وبعدين بدّله بـ [[ListView(children: [for (final p in products) ...])]] ولاحظ الفرق في أول فتحة.`,
          flag: "script",
          deep: {
            why: "أي تطبيق فيه لستة بتكبر: منتجات، رسايل، إشعارات. لو اتعملت كلها مرة واحدة، أول فتحة للشاشة بتاخد وقت والذاكرة بتتملي، والـ scroll بيقطّع على الموبايلات الرخيصة. builder بيخلي التكلفة على قد اللي ظاهر بس.",
            how: R`الـ ListView جواه Sliver بيعرف مساحة الشاشة، وبيسأل itemBuilder عن الـ indexes اللي داخلة في المساحة دي بس (زائد [[cacheExtent]]، حوالي ٢٥٠ بكسل فوق وتحت، عشان الـ scroll السريع ميبانش فاضي). العناصر اللي بتخرج بتتشال من الشجرة، والـ State بتاعها بيتمسح.

[[itemExtent: 72]] بيقول إن كل العناصر ارتفاعها ثابت. من غيره الـ ListView لازم يقيس العناصر عشان يعرف مكانه، ولما تعمل jump لآخر اللستة لازم يقدّر. معاه الحساب ضرب بس. ولو الارتفاع ثابت بس مش عارفه: [[prototypeItem: ListTile(title: Text('x'))]].

الـ key: [[ValueKey(p.id)]] بيربط كل عنصر بالـ id بتاعه، فلو اللستة اترتبت أو اتمسح منها عنصر، Flutter يعرف مين مين (درس ValueKey في المستوى ٣).

الـ State بتاع العنصر بيضيع لما يخرج من الشاشة: لو فيه checkbox محلي أو TextField، لما ترجع له هتلاقيه اتصفّر. الحل الصح إن الـ state تبقى في الـ model (برا الـ widget). والحل التاني [[AutomaticKeepAliveClientMixin]].

الـ pagination (infinite scroll): [[ScrollController]] وتسمع لـ [[position.pixels >= position.maxScrollExtent - 200]] وتجيب الصفحة الجاية. أو أبسط: لما [[index == items.length - 1]] في itemBuilder، اطلب اللي بعده واعرض loader في آخر عنصر.

وللـ grids: [[GridView.builder]] بنفس الفكرة. وللشاشات اللي فيها هيدر كبير ولستة: [[CustomScrollView]] و [[SliverList.builder]] و [[SliverAppBar]].`,
            when: "أي لستة جاية من بيانات ممكن تكبر. و [[ListView(children:)]] العادي بس للحاجات الثابتة الصغيرة (صفحة إعدادات فيها ٨ سطور).",
            mistakes: R`ListView جوه Column من غير [[Expanded]] فيطلع [[Vertical viewport was given unbounded height]]. و [[shrinkWrap: true]] كحل للـ error ده: بيشتغل بس بيقتل الـ lazy loading، لأنه بيقيس كل العناصر عشان يعرف طوله، يعني رجعت لنفس مشكلة children. وتعمل حاجة تقيلة في itemBuilder (parse تاريخ، فلترة اللستة كلها) فتتكرر مع كل scroll: جهّز البيانات قبلها.`
          },
          lines: [
            "مكتبة Material.",
            "record type بسيط للمنتج (بدل class في مثال صغير).",
            "widget بياخد اللستة.",
            "constructor.",
            "البيانات.",
            "بتعيد تعريف build.",
            "build.",
            "lazy: العناصر بتتعمل وقت ما تظهر.",
            "العدد عشان يعرف امتى يقف.",
            "كل عنصر ارتفاعه 72 بالظبط: حساب أسرع وقفز أسرع.",
            "بيتنادى لكل index ظاهر بس.",
            "العنصر.",
            "سطر جاهز.",
            "key ثابت من الـ id عشان الترتيب والمسح.",
            "دايرة فيها الرقم.",
            "الاسم.",
            "السعر في الآخر.",
            "قفلة ListTile.",
            "قفلة itemBuilder.",
            "قفلة ListView.",
            "قفلة build.",
            "قفلة الـ class."
          ],
          sol: R`مع builder: أول فتحة بتطبع [[build 0]] لحد رقم صغير (حوالي ١٠ لـ ١٥ حسب طول الشاشة، زائد شوية بسبب cacheExtent). ولما تعمل scroll بتظهر أرقام جديدة بس، ولو رجعت لفوق هتلاقي [[build 0]] بيتطبع تاني: العنصر اتشال واتعمل من جديد.

مع [[ListView(children: [...])]]: الـ debugPrint في itemBuilder مش موجود أصلًا، بس الـ 10000 ListTile اتعملوا كـ objects في build قبل أول frame، وهتحس بتأخير في فتح الشاشة (في debug واضح جدًا). ولو حطيت print جوه الـ for هتلاقيه طبع ١٠ آلاف سطر مرة واحدة.

الغلط الشائع إنك تحكم إن الاتنين «زي بعض» عشان جربت على ٢٠ عنصر.`
        },
        {
          cmd: "go_router",
          title: "كل شاشة ليها URL وبتفتحها بـ id في المسار",
          desc: R`[[go_router]] هو الـ router الرسمي اللي فريق Flutter بيحافظ عليه: بتعرّف الشاشات كـ routes بمسارات زي الويب ([[/products/:id]])، وبتتنقل بـ [[context.go('/products/42')]] أو [[context.push(...)]]. ودا بيدّيك deep links (لينك يفتح شاشة جوه التطبيق) و URLs حقيقية على الويب ببلاش.

[[state.pathParameters['id']]] بيقرا الجزء المتغير في المسار، و [[state.uri.queryParameters]] بيقرا اللي بعد [[?]]. وبتربطه بـ [[MaterialApp.router(routerConfig: router)]].`,
          example: R`import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

final router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const HomeScreen(),
      routes: [
        GoRoute(
          path: 'products/:id',
          builder: (context, state) {
            final id = int.parse(state.pathParameters['id']!);
            final tab = state.uri.queryParameters['tab'] ?? 'info';
            return ProductScreen(id: id, tab: tab);
          },
        ),
      ],
    ),
  ],
);

void main() => runApp(MaterialApp.router(routerConfig: router));
// HomeScreen فيها زرار: onPressed: () => context.push('/products/42?tab=reviews')
// ProductScreen فيها: context.pop() للرجوع، و context.go('/') للرئيسية`,
          try: "اعمل الشاشتين (HomeScreen و ProductScreen) وشغّل على Chrome. افتح [[/#/products/7]] من شريط العنوان مباشرة (أو [[/products/7]] لو فعّلت path URLs): الـ tab هيبقى إيه؟ وهل فيه زرار رجوع؟ وبعدين افتح [[/products/abc]] وشوف اللي بيحصل.",
          flag: "script",
          deep: {
            why: "[[Navigator.push(MaterialPageRoute(...))]] كويس لتطبيق فيه ٣ شاشات. بس أول ما تحتاج لينك من إيميل أو إشعار يفتح منتج معين، أو التطبيق يشتغل على الويب وزرار back والـ URL يشتغلوا صح، أو تمنع شاشات من غير login، هتحتاج routing مبني على مسارات. go_router بيعمل ده فوق Router API بتاع Flutter من غير ما تكتب الكود المعقد بتاعه.",
            how: R`الـ routes متداخلة: [[products/:id]] جوه [[/]] يعني المسار الكامل [[/products/:id]]، والأهم إن الـ stack بيتبني من الشجرة: لو فتحت اللينك ده مباشرة، go_router بيحط HomeScreen تحت ProductScreen، فزرار الرجوع يرجّعك للرئيسية. الـ routes الفرعية مش بتبدأ بـ [[/]].

[[context.go(path)]] بيروح للمسار ويبني الـ stack من الشجرة، زي ما تكتب URL في المتصفح. [[context.push(path)]] بيحط الشاشة فوق الـ stack الحالي، ودا اللي عايزه لما الشاشة ترجّع نتيجة: [[final ok = await context.push<bool>('/confirm');]] والشاشة بتقفل بـ [[context.pop(true)]].

الـ parameters كلها نصوص، فانت اللي بتحوّل ([[int.parse]]). و [[state.extra]] بيبعت object كامل، بس مبيتحفظش في الـ URL، فلو المستخدم عمل refresh على الويب أو فتح deep link هيبقى null. ابعت الـ id في المسار وهات البيانات في الشاشة.

[[name:]] على الـ route يخليك تتنقل بالاسم: [[context.goNamed('product', pathParameters: {'id': '42'})]] بدل ما تبني الـ string بإيدك.

[[ShellRoute]] و [[StatefulShellRoute.indexedStack]] للشاشات اللي ليها bottom navigation ثابت: كل تاب ليه stack خاص بيه وبيحافظ على مكانه.

و [[errorBuilder]] للشاشة اللي تظهر لما المسار مش موجود أو الـ redirect رمى exception. أما exception جوه الـ builder نفسه فمبيوصلوش: دا error عادي وقت الـ build.`,
            when: "أي تطبيق فيه أكتر من كام شاشة، أو deep links، أو ويب، أو شاشات محمية بـ login. ولو تطبيق صغير جدًا من غير لينكات، Navigator العادي كفاية.",
            mistakes: R`تبعت الـ object في [[extra]] وتعتمد عليه، فالـ deep link والـ refresh يضربوا. وتنسى إن الـ path params نصوص فتعمل [[state.pathParameters['id'] as int]]. وتستخدم [[go]] وانت عايز ترجع بنتيجة، فالـ await مبيرجعش حاجة. وتحط [[/]] في أول مسار route فرعي. وتعمل [[GoRouter(...)]] جوه build فكل rebuild يعمل router جديد ويرجعك لأول شاشة: اعمله مرة واحدة بره (top-level أو في provider).`
          },
          lines: [
            "مكتبة Material.",
            "go_router (من [[flutter pub add go_router]]).",
            "الـ router: بيتعمل مرة واحدة بره أي widget.",
            "لستة الـ routes.",
            "route.",
            "المسار الرئيسي.",
            "الشاشة اللي تتعرض.",
            "routes فرعية: بتتحط فوق الرئيسية في الـ stack.",
            "route.",
            "[[:id]] جزء متغير. ومن غير [[/]] في الأول لأنه فرعي.",
            "builder بياخد state فيه تفاصيل الـ URL.",
            "اقرا الـ id كنص وحوّله لرقم.",
            "query parameter اختياري بقيمة افتراضية.",
            "ابعت القيم للشاشة كـ constructor عادي.",
            "قفلة الـ builder.",
            "قفلة الـ route.",
            "قفلة الـ routes الفرعية.",
            "قفلة.",
            "قفلة الـ routes.",
            "قفلة الـ router.",
            "[[MaterialApp.router]] بدل MaterialApp، و routerConfig هو الـ router."
          ],
          sol: R`[[/products/7]] مباشرة: ProductScreen بيظهر بـ [[tab: info]] (القيمة الافتراضية لأن مفيش [[?tab=]])، وفيه زرار رجوع في الـ AppBar لأن go_router بنى الـ stack من الشجرة وحط HomeScreen تحته. لو كنت عامل الـ route ده top-level (مش جوه [[/]]) مكانش هيبقى فيه رجوع.

[[/products/abc]]: المسار نفسه اتطابق عادي (أي نص ينفع يبقى [[:id]])، بس [[int.parse('abc')]] بيرمي FormatException جوه الـ builder وقت بناء الشاشة. go_router مش بيمسك الـ exception ده ([[errorBuilder]] بتاعه للمسارات اللي ملهاش route أو لأخطاء الـ redirect)، فهتشوف الشاشة الحمرا بتاعة Flutter في debug وفي الترمنال [[FormatException: Invalid radix-10 number]]. الحل الصح: [[int.tryParse(...)]] ولو null اعرض شاشة «المنتج مش موجود» من الـ builder نفسه.

على الويب لاحظ إن الـ URL في المتصفح بيتغير مع كل تنقل، وزرار back بتاع المتصفح بيشتغل.`
        },
        {
          cmd: "redirect",
          title: "اللي مش عامل login يروح لشاشة الدخول ويرجع مكانه بعدها",
          desc: R`[[redirect]] دالة على الـ GoRouter بتتنادى قبل أي تنقل: ترجّع null يعني «كمّل»، أو ترجّع مسار تاني يعني «روح هنا بدل كده». ودا المكان الوحيد اللي بتحط فيه قاعدة «لازم login» بدل ما تكررها في كل شاشة.

و [[refreshListenable]] بيخلي الـ router يعيد تشغيل الـ redirect لما حالة الدخول تتغير: المستخدم عمل login يتنقل لوحده، وعمل logout أو التوكن انتهى يترمي على شاشة الدخول من أي مكان.`,
          example: R`import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

final session = ValueNotifier<String?>(null);

final router = GoRouter(
  refreshListenable: session,
  redirect: (context, state) {
    final loggedIn = session.value != null;
    final atLogin = state.matchedLocation == '/login';
    if (!loggedIn && !atLogin) {
      return Uri(path: '/login', queryParameters: {'from': state.uri.toString()}).toString();
    }
    if (loggedIn && atLogin) return state.uri.queryParameters['from'] ?? '/';
    return null;
  },
  routes: [
    GoRoute(path: '/', builder: (context, state) => const Text('home')),
    GoRoute(path: '/login', builder: (context, state) => const Text('login')),
  ],
);`,
          try: "ضيف route [[/orders]]، وافتحه وانت مش عامل login: المسار في شريط العنوان بقى إيه؟ وبعدين حط زرار في شاشة login بيعمل [[session.value = 'token']]: رحت فين؟ وأخيرًا ضيف زرار logout في أي شاشة بيعمل [[session.value = null]].",
          flag: "script",
          deep: {
            why: "لو كل شاشة محمية فيها [[if (!loggedIn) Navigator.push(LoginScreen)]] هتنسى واحدة، ولينك من إشعار هيفتح شاشة الطلبات لحد مش عامل login. والـ redirect مكان واحد بيتنفذ قبل أي شاشة، سواء التنقل من زرار، أو من deep link، أو من زرار back في المتصفح.",
            how: R`الـ redirect بيتنادى في كل تنقل، وكمان كل ما الـ [[refreshListenable]] يعمل notify. [[ValueNotifier]] هنا أبسط Listenable: أي تغيير في [[.value]] بيعمل notify. في تطبيق حقيقي بيبقى ChangeNotifier بتاع الـ auth، أو stream حالة Firebase Auth، أو listener على provider في Riverpod.

[[state.matchedLocation]] المسار اللي اتطابق من غير query، و [[state.uri]] الـ URL كامل. بنحط المسار الأصلي في [[from]] عشان بعد الـ login نرجّع المستخدم لنفس المكان بدل الرئيسية. و [[Uri(...)]] بيعمل encode للـ query صح ([[/login?from=%2Forders]]).

لازم الشرطين: «مش عامل login ومش في شاشة login» يروح login، و«عامل login وفي شاشة login» يروح من مكان ما جه. من غير الشرط التاني المستخدم هيفضل واقف في login بعد ما يدخل. ومن غير [[!atLogin]] هتعمل redirect loop: login بيعمل redirect لـ login، و go_router بيوقف بعد عدد معين ويرمي error.

فيه كمان redirect على مستوى route واحد ([[GoRoute(redirect: ...)]]) لقواعد خاصة (صفحة admin بس).

الـ redirect بيتنادى sync في الغالب، فمتعملش فيه طلب شبكة. الحالة لازم تبقى جاهزة في الذاكرة (التوكن اتقرا من secure storage في main قبل runApp، درس flutter_secure_storage).

والحماية دي UX بس: الـ backend لازم يرفض أي طلب من غير توكن صحيح (درس requireAuth في «تاب Backend بـ Node» و «auth dependency» في «تاب Python و FastAPI»).`,
            when: "أي تطبيق فيه login. وكمان onboarding (أول فتحة تروح شاشة التعريف)، و«لازم تكمّل بياناتك الأول»، وصلاحيات (admin).",
            mistakes: R`redirect loop لأنك نسيت تستثني شاشة login. ونسيان [[refreshListenable]] فالمستخدم يعمل login والشاشة متتحركش لحد ما يدوس حاجة. وتقرا التوكن من secure storage جوه redirect (async) بدل ما يبقى جاهز في الذاكرة. وتفتكر إن redirect في التطبيق كفاية للأمان: أي حد يقدر يبعت request للـ API مباشرة.`
          },
          lines: [
            "مكتبة Material (فيها ValueNotifier).",
            "go_router.",
            "حالة الدخول: التوكن أو null. أي تغيير فيها بيعمل notify.",
            "الـ router.",
            "لما session تتغير، الـ redirect يتنادى تاني.",
            "بيتنادى قبل كل تنقل.",
            "عامل login؟",
            "رايح لشاشة login أصلًا؟",
            "مش عامل login ورايح لحتة تانية...",
            "...روح login وخد معاك المكان الأصلي في from (مع encoding صح).",
            "قفلة الـ if.",
            "عمل login وهو في شاشة login: رجّعه مكان ما كان رايح.",
            "null: كمّل عادي.",
            "قفلة الـ redirect.",
            "الـ routes.",
            "الرئيسية.",
            "شاشة الدخول.",
            "قفلة.",
            "قفلة الـ router."
          ],
          sol: R`لما تفتح [[/orders]] من غير login، الـ URL بيبقى [[/login?from=%2Forders]] (الـ [[/]] اتعمله encode لـ [[%2F]]) والشاشة login. لما الزرار يغيّر session، الـ router بيسمع (refreshListenable) ويشغّل redirect تاني: loggedIn بقت true و atLogin true، فيرجّعك لـ [[/orders]] من غير ما تكتب أي navigation في شاشة login.

الـ logout من أي شاشة: session بقت null، فالـ redirect يرميك على [[/login?from=...]] بالمسار اللي كنت فيه.

الغلط الشائع: تكتب [[context.go('/')]] في زرار الـ login كمان. مش محتاج، والأسوأ إنه بيبوّظ الرجوع لـ from.`,
          solCode: R`GoRoute(path: '/orders', builder: (context, state) => const Text('orders')),
GoRoute(
  path: '/login',
  builder: (context, state) => TextButton(
    onPressed: () => session.value = 'token',
    child: const Text('Login'),
  ),
),
// في أي شاشة:
TextButton(onPressed: () => session.value = null, child: const Text('Logout')),`
        },
        {
          cmd: "Form و validator",
          title: "فورم يطلّع الغلط تحت كل حقل قبل ما يبعت",
          desc: R`[[Form]] بيجمّع كذا [[TextFormField]]، وكل حقل ليه [[validator]]: دالة بتاخد النص وترجّع null لو سليم، أو رسالة الخطأ اللي تظهر تحته. و [[_formKey.currentState!.validate()]] بيشغّل كل الـ validators مرة واحدة ويرجّع true لو كلهم سليمين.

و [[TextEditingController]] بيقرا النص أو يغيّره، ولازم يتقفل في [[dispose]]. و [[autovalidateMode: AutovalidateMode.onUserInteraction]] بيخلي الخطأ يظهر وهو بيكتب بعد أول لمسة، مش من أول ما الشاشة تفتح.`,
          example: R`import 'package:flutter/material.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({super.key});
  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  final _email = TextEditingController();
  final _password = TextEditingController();
  bool _busy = false;

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _busy = true);
    await Future.delayed(const Duration(seconds: 1));
    if (!mounted) return;
    setState(() => _busy = false);
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Welcome $__{_email.text}')));
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      autovalidateMode: AutovalidateMode.onUserInteraction,
      child: Column(
        spacing: 12,
        children: [
          TextFormField(
            controller: _email,
            keyboardType: TextInputType.emailAddress,
            decoration: const InputDecoration(labelText: 'Email'),
            validator: (v) => v != null && v.contains('@') ? null : 'اكتب إيميل صحيح',
          ),
          TextFormField(
            controller: _password,
            obscureText: true,
            decoration: const InputDecoration(labelText: 'Password'),
            validator: (v) => (v ?? '').length >= 8 ? null : '8 حروف على الأقل',
          ),
          FilledButton(
            onPressed: _busy ? null : _submit,
            child: Text(_busy ? 'Signing in...' : 'Sign in'),
          ),
        ],
      ),
    );
  }
}`,
          try: "ضيف حقل «تأكيد الباسورد» بـ validator بيقارن بـ [[_password.text]]. وخلي Enter في حقل الإيميل ينقل للباسورد، و Enter في آخر حقل يعمل submit. وبعدين دوس Sign in مرتين بسرعة: الطلب بيتبعت كام مرة؟",
          flag: "script",
          deep: {
            why: "لو بعت بيانات غلط للسيرفر، المستخدم هيستنى الشبكة عشان يعرف إن الإيميل ناقصه @. والـ validation في التطبيق بيدّيه الرد فورًا وتحت الحقل الغلط بالظبط. بس مش بديل لـ validation السيرفر: أي حد يقدر يبعت request من غير التطبيق.",
            how: R`[[GlobalKey<FormState>]] مفتاح بيوصلك للـ State بتاع الـ Form من بره الشجرة بتاعته. [[currentState!.validate()]] بيلف على كل TextFormField تحته، ينادي الـ validator، ويعرض الرسايل، ويرجّع true لو كلهم رجّعوا null. وفيه [[save()]] بينادي [[onSaved]] لكل حقل، و [[reset()]] بيرجّع القيم الأولية.

الـ validator لازم sync. لو محتاج تسأل السيرفر «الإيميل ده مستخدم؟»، اعملها بعد validate: ابعت الطلب، ولو السيرفر رجّع خطأ حطه في متغير state واعرضه بـ [[InputDecoration(errorText: _serverError)]] أو في الـ validator نفسه وأعد validate.

منع الإرسال المزدوج: [[onPressed: _busy ? null : _submit]]. null بيقفل الزرار (وبيتلوّن رمادي لوحده)، فالضغطة التانية ملهاش أثر.

[[if (!mounted) return;]] بعد أي await: المستخدم ممكن يكون قفل الشاشة وهو مستني، و setState أو [[ScaffoldMessenger.of(context)]] على State اتشال بيضرب.

التنقل بين الحقول: [[textInputAction: TextInputAction.next]] بيغيّر زرار الكيبورد لـ «التالي» وبينقل الـ focus لوحده، و [[TextInputAction.done]] مع [[onFieldSubmitted: (_) => _submit()]] في آخر حقل.

وأنواع الكيبورد: [[TextInputType.emailAddress]] و [[phone]] و [[number]]، و [[autofillHints: const [AutofillHints.email]]] عشان مدير الباسوردات يملاها.`,
            when: "أي شاشة بتدخّل فيها بيانات: login، و register، و checkout، وإضافة منتج. ولو حقل واحد (بحث) مش محتاج Form، TextField و controller كفاية.",
            mistakes: R`تعمل الـ controller جوه build فكل rebuild يمسح اللي المستخدم كتبه. وتنسى dispose. وتعرض الأخطاء من أول ما الشاشة تفتح ([[AutovalidateMode.always]]) فالمستخدم يلاقي كل الحقول حمرا قبل ما يكتب. ومتقفلش الزرار وقت الإرسال فيتبعت طلبين ويتعمل طلب شراء مرتين. وتعتمد على validation التطبيق بس.`
          },
          lines: [
            "مكتبة Material.",
            "الفورم StatefulWidget لأن فيه controllers و state.",
            "constructor.",
            "بتعيد تعريف createState.",
            "بيعمل الـ State.",
            "قفلة.",
            "الـ State.",
            "مفتاح يوصلك للـ Form عشان تعمل validate.",
            "controller للإيميل.",
            "controller للباسورد.",
            "هل فيه طلب شغال دلوقتي؟",
            "بتعيد تعريف dispose.",
            "dispose.",
            "اقفل الـ controllers.",
            "والتاني.",
            "في الآخر.",
            "قفلة.",
            "الإرسال.",
            "شغّل كل الـ validators، ولو فيه غلط اقف (والرسايل ظهرت).",
            "اقفل الزرار واعرض حالة التحميل.",
            "مكان طلب الـ API الحقيقي.",
            "الشاشة ممكن تكون اتقفلت وانت مستني.",
            "رجّع الزرار.",
            "رسالة نجاح.",
            "قفلة _submit.",
            "بتعيد تعريف build.",
            "build.",
            "الـ Form.",
            "المفتاح.",
            "الأخطاء تظهر بعد ما المستخدم يلمس الحقل.",
            "الحقول تحت بعض.",
            "مسافة بينهم.",
            "الحقول.",
            "حقل إيميل.",
            "مربوط بالـ controller.",
            "كيبورد فيه @.",
            "العنوان.",
            "null يعني سليم، والنص رسالة الخطأ.",
            "قفلة.",
            "حقل باسورد.",
            "controller.",
            "النص مستخبي.",
            "العنوان.",
            "٨ حروف على الأقل.",
            "قفلة.",
            "الزرار.",
            "null وهو شغال = الزرار مقفول.",
            "النص حسب الحالة.",
            "قفلة الزرار.",
            "قفلة children.",
            "قفلة Column.",
            "قفلة Form.",
            "قفلة build.",
            "قفلة الـ State."
          ],
          sol: R`حقل التأكيد: validator بيرجّع رسالة لو [[v != _password.text]]. لاحظ إنه بيقرا الـ controller التاني مباشرة. والتنقل: [[textInputAction: TextInputAction.next]] على الإيميل والباسورد، و [[TextInputAction.done]] مع [[onFieldSubmitted: (_) => _submit()]] على التأكيد.

الضغط مرتين: الطلب بيتبعت مرة واحدة. أول ضغطة عملت [[_busy = true]] والـ rebuild خلّى onPressed null قبل الضغطة التانية. لو شلت الشرط ده ([[onPressed: _submit]]) هتلاقي الـ SnackBar ظهر مرتين، يعني الطلب اتبعت مرتين.`,
          solCode: R`TextFormField(
  controller: _password,
  obscureText: true,
  textInputAction: TextInputAction.next,
  decoration: const InputDecoration(labelText: 'Password'),
  validator: (v) => (v ?? '').length >= 8 ? null : '8 حروف على الأقل',
),
TextFormField(
  obscureText: true,
  textInputAction: TextInputAction.done,
  onFieldSubmitted: (_) => _submit(),
  decoration: const InputDecoration(labelText: 'Confirm password'),
  validator: (v) => v == _password.text ? null : 'الباسورد مش متطابق',
),`
        }
      ]
    },
    {
      t: "الداتا من الـ API",
      l: 2,
      n: "http بيجيب نص، و jsonDecode بيحوّله Map، و fromJson بيحوّله object ليه نوع، و FutureBuilder بيعرضه",
      items: [
        {
          cmd: "http",
          title: "تطلب بيانات من API وتبعت بيانات ليه",
          desc: R`package [[http]] (من فريق Dart) هو أبسط طريقة تكلم بيها أي API: [[http.get(uri)]] و [[http.post(uri, body: ...)]]، والاتنين بيرجّعوا [[Future<Response>]] فيه [[statusCode]] و [[body]] (نص). وبعدين [[jsonDecode(res.body)]] يحوّل النص لـ Map أو List.

http مش بيرمي exception لو السيرفر رجّع 404 أو 500: انت اللي لازم تبص على statusCode. وبيرمي بس لو الطلب موصلش أصلًا (مفيش نت، DNS، timeout).`,
          example: R`import 'dart:convert';
import 'package:http/http.dart' as http;

const base = 'https://jsonplaceholder.typicode.com';

class ApiException implements Exception {
  ApiException(this.statusCode, this.body);
  final int statusCode;
  final String body;
  @override
  String toString() => 'ApiException($statusCode)';
}

Future<List<Map<String, dynamic>>> fetchTodos() async {
  final uri = Uri.parse('$base/todos').replace(queryParameters: {'_limit': '3'});
  final res = await http.get(uri, headers: {'Accept': 'application/json'}).timeout(const Duration(seconds: 10));
  if (res.statusCode != 200) throw ApiException(res.statusCode, res.body);
  return (jsonDecode(res.body) as List).cast<Map<String, dynamic>>();
}

Future<Map<String, dynamic>> createTodo(String title) async {
  final res = await http.post(
    Uri.parse('$base/todos'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({'title': title, 'completed': false, 'userId': 1}),
  );
  if (res.statusCode != 201) throw ApiException(res.statusCode, res.body);
  return jsonDecode(res.body) as Map<String, dynamic>;
}

Future<void> main() async {
  final todos = await fetchTodos();
  for (final t in todos) {
    print('$__{t['id']}: $__{t['title']}');
  }
  print(await createTodo('learn http'));
}`,
          try: "اعمل مشروع [[dart create -t console api_lab]] وضيف [[dart pub add http]] وشغّل المثال. بعدين غيّر المسار لـ [[/todos/99999]] في دالة تجيب todo واحد: إيه اللي بيحصل؟ وجرّب تقطع النت وتشغّل: أنهي exception بيطلع؟",
          flag: "script",
          deep: {
            why: "أي تطبيق حقيقي بيكلم backend: يجيب المنتجات، ويبعت الطلب، ويعمل login. ولازم تعرف تفرّق بين «الطلب نجح» و«السيرفر رد بخطأ» و«الطلب موصلش أصلًا»، لأن كل واحدة ليها رسالة مختلفة للمستخدم.",
            how: R`[[import 'package:http/http.dart' as http]]: الـ [[as http]] عشان الدوال اسمها عام ([[get]] و [[post]]) فتكتب [[http.get]] ومتتلخبطش.

[[Uri]] مش String: [[Uri.parse]] للمسار، و [[replace(queryParameters: ...)]] أو [[Uri.https('host', '/path', {...})]] بيعمل encode للـ query صح (مسافات وعربي). متبنيش الـ query بـ string concatenation.

الـ body: لو بعت Map مباشرة في [[body:]] package http بيبعتها form-urlencoded مش JSON. عشان كده [[jsonEncode]] + هيدر [[Content-Type: application/json]]. ودا أشهر سبب إن Express يستقبل [[req.body]] فاضي.

الأخطاء: [[ClientException]] (من http) لما الاتصال يفشل، و [[TimeoutException]] من [[.timeout()]]، و [[FormatException]] لو الرد مش JSON (صفحة HTML من nginx مثلًا). والـ statusCode انت اللي بتفحصه وترمي exception خاص بيك (درس try و on و rethrow).

[[http.get]] المباشر بيفتح اتصال ويقفله كل مرة. لو هتعمل طلبات كتير لنفس السيرفر: [[final client = http.Client();]] واستخدم [[client.get]] (بيعيد استخدام الاتصال)، واقفله بـ [[client.close()]] في الآخر. ودا كمان اللي بيخليك تبعت [[MockClient]] في الاختبارات.

[[jsonDecode]] بيرجّع dynamic: [[List<dynamic>]] أو [[Map<String, dynamic>]]، والأرقام int أو double حسب شكلها. و JSON كبير (ميجات) بـ jsonDecode على الـ main isolate ممكن يعمل تقطيع: [[await Isolate.run(() => jsonDecode(body))]].

وفيه [[dio]] كبديل مشهور فيه interceptors و retries و progress للرفع. http كفاية لمعظم التطبيقات، ولو احتجت interceptor للتوكن اعمل class صغير زي درس «API client بالتوكن».

على Android، الطلبات لـ [[http://]] (مش https) ممنوعة افتراضيًا في release. وعلى iOS نفس الكلام (App Transport Security). في التطوير على الـ emulator الـ localhost بتاع جهازك هو [[10.0.2.2]].`,
            when: "أي كلام مع REST API. ولو الـ API بتاعك GraphQL أو Firebase أو Supabase، استخدم الـ SDK بتاعهم بدل http مباشرة.",
            mistakes: R`تبعت Map في body من غير jsonEncode. وتفتكر إن 404 هيرمي exception فتعمل [[jsonDecode]] على صفحة الخطأ. ومفيش timeout، فالطلب يفضل معلّق دقيقة على نت ضعيف والـ spinner شغال. وتكتب [[localhost]] في التطبيق وهو على الـ emulator: localhost هناك هو الـ emulator نفسه. وتعمل [[as List<Map<String, dynamic>>]] على ناتج jsonDecode فيضرب: استخدم [[cast]].`
          },
          lines: [
            "jsonDecode و jsonEncode.",
            "package http باسم مستعار.",
            "عنوان الـ API (مكانه الحقيقي config أو dart-define).",
            "exception خاص بأخطاء السيرفر.",
            "constructor.",
            "كود الرد.",
            "نص الرد (فيه رسالة الخطأ غالبًا).",
            "toString.",
            "عشان يتطبع مفهوم.",
            "قفلة.",
            "دالة بترجّع لستة Maps.",
            "بناء الـ URL بـ query من غير ما تكتب [[?]] بإيدك.",
            "GET بهيدر، ولو عدّى 10 ثواني يرمي TimeoutException.",
            "أي كود غير 200 يبقى خطأ انت بترميه.",
            "النص لـ List، و [[cast]] عشان كل عنصر Map.",
            "قفلة.",
            "POST.",
            "الطلب.",
            "العنوان.",
            "لازم تقول للسيرفر إن الـ body JSON.",
            "الـ Map لنص JSON.",
            "قفلة.",
            "الإنشاء بيرجّع 201 Created.",
            "الـ object اللي اتعمل (فيه id جديد).",
            "قفلة.",
            "البداية.",
            "هات أول ٣.",
            "لف عليهم.",
            "1: delectus aut autem وهكذا.",
            "قفلة الـ loop.",
            "{title: learn http, completed: false, userId: 1, id: 201}.",
            "قفلة."
          ],
          sol: R`الناتج: ٣ سطور شكلها [[1: delectus aut autem]] وبعدها Map فيه [[id: 201]] (jsonplaceholder بيرجّع 201 بس مش بيحفظ فعلًا).

[[/todos/99999]]: السيرفر بيرد 404 و body [[{}]]. http مش بيرمي حاجة، فلو دالتك بتفحص [[statusCode != 200]] هترمي [[ApiException(404)]]. ولو مش بتفحص، هتعمل fromJson على Map فاضي وتضرب في حتة تانية.

من غير نت: [[ClientException]] برسالة زي [[Failed host lookup]] أو [[Connection refused]] (حسب نوع الانقطاع)، ولو الشبكة موجودة بس بطيئة جدًا: [[TimeoutException after 0:00:10]]. دي اللي بتمسكها وتعرض «مفيش اتصال، حاول تاني».`,
          solCode: R`Future<Map<String, dynamic>> fetchTodo(int id) async {
  final res = await http.get(Uri.parse('$base/todos/$id')).timeout(const Duration(seconds: 10));
  if (res.statusCode == 404) throw ApiException(404, 'todo $id not found');
  if (res.statusCode != 200) throw ApiException(res.statusCode, res.body);
  return jsonDecode(res.body) as Map<String, dynamic>;
}`
        },
        {
          cmd: "fromJson و toJson",
          title: "تحوّل الـ Map اللي جاي من الـ API لـ object ليه نوع",
          desc: R`[[Map<String, dynamic>]] مينفعش تبني عليه تطبيق: كل سطر فيه [[json['title']]] ممكن تكتبه غلط، والنوع dynamic. فبتعمل class للموديل فيه [[factory Todo.fromJson(Map<String, dynamic> json)]] بيقرا ويتأكد مرة واحدة، و [[toJson()]] بيرجّع Map تتبعت للسيرفر.

الطريقة الحديثة (زي docs Flutter): switch على الـ Map بـ pattern، فلو الشكل غلط ترمي [[FormatException]] واضح في مكان واحد. و [[copyWith]] بيعمل نسخة معدّلة بدل ما تغيّر الـ object.`,
          example: R`import 'dart:convert';

class Todo {
  const Todo({required this.id, required this.title, this.done = false, this.dueAt});

  final int id;
  final String title;
  final bool done;
  final DateTime? dueAt;

  factory Todo.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {'id': int id, 'title': String title} => Todo(
          id: id,
          title: title,
          done: json['completed'] as bool? ?? false,
          dueAt: switch (json['due_at']) {
            String s => DateTime.parse(s),
            _ => null,
          },
        ),
      _ => throw FormatException('Invalid todo JSON', json),
    };
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'completed': done,
        'due_at': ?dueAt?.toIso8601String(),
      };

  Todo copyWith({String? title, bool? done}) =>
      Todo(id: id, title: title ?? this.title, done: done ?? this.done, dueAt: dueAt);
}

void main() {
  const body = '[{"id":1,"title":"buy milk","completed":true},{"id":2,"title":"call mom","due_at":"2026-10-01T09:00:00Z"}]';
  final todos = (jsonDecode(body) as List).map((e) => Todo.fromJson(e as Map<String, dynamic>)).toList();
  print(todos.map((t) => '$__{t.id} $__{t.title} $__{t.done} $__{t.dueAt?.day}').toList());
  final updated = todos[1].copyWith(done: true);
  print(jsonEncode(updated.toJson()));
  try {
    Todo.fromJson({'id': '3', 'title': 'x'});
  } on FormatException catch (e) {
    print(e.message);
  }
}`,
          try: "ضيف field اسمه [[tags]] نوعه [[List<String>]] (من JSON [[\"tags\": [\"home\"]]])، واقراه صح في fromJson، ورجّعه في toJson. وبعدين اكتب اختبار صغير: [[Todo.fromJson(todo.toJson())]] لازم يطلع نفس القيم. هل [[==]] بين الاتنين بترجّع true؟ ليه؟",
          flag: "script",
          deep: {
            why: "الـ API هو الحاجة الوحيدة في التطبيق اللي مش تحت سيطرتك: الـ backend ممكن يغيّر اسم field، أو يبعت null، أو رقم كنص. لو الـ Maps متوزعة في كل الشاشات، الغلط هيظهر في أي حتة. الـ fromJson بيخلي نقطة التحويل واحدة: يا الـ object يطلع سليم بأنواعه، يا exception واضح في مكان معروف.",
            how: R`[[factory]] مناسب لـ fromJson لأنه ممكن يرمي قبل ما يعمل object، وممكن يرجّع subclass حسب البيانات (درس named و factory في المستوى ١).

الـ pattern [[{'id': int id, 'title': String title}]] بيفحص وجود المفاتيح والأنواع مرة واحدة. الـ fields الاختيارية بتتقري بـ [[as bool?]] ومعاها [[??]] قيمة افتراضية.

التواريخ: JSON مفيهوش نوع تاريخ، فالسيرفر بيبعت نص ISO 8601، و [[DateTime.parse]] بيقراه (والـ Z معناها UTC). ولما تعرضه للمستخدم [[.toLocal()]]. وفي toJson [[toIso8601String()]].

الأسماء: السيرفر غالبًا snake_case ([[due_at]]) و Dart بـ camelCase ([[dueAt]]). التحويل مكانه fromJson و toJson بس.

[['due_at': ?dueAt?.toIso8601String()]] (Dart 3.8): المفتاح يتحط في الـ Map لو القيمة مش null بس. فرق بين «مبعتش المفتاح» و«بعته null» ممكن يفرق مع PATCH في السيرفر.

[[copyWith]]: الموديلات immutable (كل الـ fields final)، فلو عايز تعلّم todo إنه خلص بتعمل نسخة جديدة. ودا اللي بيخلي Riverpod و setState يعرفوا إن حاجة اتغيرت. عيبه إنه مبيعرفش يحط field بـ null (لأن null معناها «سيبه زي ما هو»)، ودي من الحاجات اللي freezed بيحلها.

[[==]]: الـ class العادي بيقارن بالمرجع (نفس الـ object في الذاكرة)، فنسختين بنفس القيم مش متساويين. لو محتاج مقارنة بالقيم (في الاختبارات أو [[select]] في Riverpod) لازم تعمل override لـ [[==]] و [[hashCode]]، أو تستخدم freezed (الدرس الجاي).`,
            when: "كل موديل جاي من API أو رايح له. ولو المشروع فيه ١٠ موديلات أو أكتر أو fields كتير، اكتبهم بـ json_serializable أو freezed بدل الإيد.",
            mistakes: R`[[json['id'] as int]] من غير فحص، وأول مرة السيرفر يبعت id كنص التطبيق يضرب برسالة مش واضحة بعيد عن المكان. وتنسى [[.toLocal()]] فالتواريخ تظهر متأخرة ساعتين أو تلاتة. وتعمل [[as List<String>]] على list جاية من JSON. وتحط منطق الشاشة (تنسيق سعر مثلًا) جوه الموديل: الموديل بيوصف البيانات بس.`
          },
          lines: [
            "jsonDecode و jsonEncode.",
            "الموديل.",
            "constructor بـ named parameters، و done افتراضيًا false.",
            "id.",
            "العنوان.",
            "خلصت ولا لأ.",
            "تاريخ اختياري.",
            "factory: بيقرر يرجّع object أو يرمي.",
            "switch على شكل الـ Map.",
            "لازم id رقم و title نص، وغير كده مش مطابق.",
            "id متأكد إنه int.",
            "title.",
            "اختياري: bool أو null، والافتراضي false.",
            "التاريخ: لو نص...",
            "...حوّله DateTime.",
            "...ولو مش موجود أو نوعه غلط: null.",
            "قفلة.",
            "قفلة الـ Todo.",
            "أي شكل تاني: FormatException ومعاه الـ Map للـ debugging.",
            "قفلة الـ switch.",
            "قفلة fromJson.",
            "toJson: الـ object لـ Map بأسماء السيرفر.",
            "id.",
            "title.",
            "done باسم السيرفر.",
            "[[?]] قبل القيمة: المفتاح يتحط لو التاريخ موجود بس.",
            "قفلة.",
            "copyWith: نسخة جديدة، والـ null معناها «سيبه زي ما هو».",
            "القيم الجديدة أو القديمة.",
            "قفلة الـ class.",
            "البداية.",
            "نص JSON زي اللي بيرجع من السيرفر.",
            "النص لـ List، وكل عنصر لـ Todo.",
            "[1 buy milk true null, 2 call mom false 1].",
            "نسخة معدّلة.",
            "الـ due_at موجود لأنه مش null: {...\"completed\":true,\"due_at\":\"2026-10-01T09:00:00.000Z\"}.",
            "JSON غلط: id نص.",
            "fromJson هيرمي.",
            "النوع اللي انت رميته.",
            "Invalid todo JSON.",
            "قفلة.",
            "قفلة main."
          ],
          sol: R`fromJson بيقرا tags بأمان: [[(json['tags'] as List?)?.cast<String>() ?? const []]]، و toJson بيرجّعها زي ما هي. الاختبار: [[Todo.fromJson(todo.toJson())]] بيطلع نفس القيم (id و title و done و tags)، بس [[==]] بين الاتنين بترجّع false. لأن الـ class مفيهوش [[operator ==]]، فالمقارنة بالمرجع، والاتنين objects مختلفين في الذاكرة. عشان true لازم override لـ [[==]] و [[hashCode]] (أو freezed).

الغلط الشائع: [[json['tags'] as List<String>]]، بيضرب وقت التشغيل بـ [[List<dynamic> is not a subtype of List<String>]].`,
          solCode: R`// جوه الـ class:
final List<String> tags;

// في fromJson (جوه Todo(...)):
tags: (json['tags'] as List?)?.cast<String>() ?? const [],

// في toJson:
'tags': tags,

// اختبار round-trip:
void main() {
  final t = Todo.fromJson({'id': 1, 'title': 'x', 'tags': ['home']});
  final back = Todo.fromJson(t.toJson());
  print('$__{back.tags} $__{back.title} $__{t == back}'); // [home] x false
}`
        },
        {
          cmd: "json_serializable و freezed",
          title: "fromJson و copyWith و == بتتكتب لوحدها",
          desc: R`لما الموديلات تكتر، كتابة fromJson و toJson و copyWith و [[==]] بإيدك مملة وسهل تغلط فيها. [[json_serializable]] بيولّد fromJson و toJson من annotations، و [[freezed]] بيولّد فوقها copyWith و [[==]] و [[hashCode]] و [[toString]]، وبيعمل sealed unions كمان.

الكود المتولّد بيتكتب في ملفات [[.g.dart]] و [[.freezed.dart]] جنب ملفك بأمر [[dart run build_runner build]]، أو [[watch]] يفضل شغال ويولّد مع كل حفظ.`,
          example: R`// flutter pub add json_annotation freezed_annotation dev:build_runner dev:json_serializable dev:freezed
// lib/models/todo.dart:
import 'package:freezed_annotation/freezed_annotation.dart';

part 'todo.freezed.dart';
part 'todo.g.dart';

@freezed
abstract class Todo with _$Todo {
  const factory Todo({
    required int id,
    required String title,
    @JsonKey(name: 'completed') @Default(false) bool done,
    @JsonKey(name: 'due_at') DateTime? dueAt,
  }) = _Todo;

  factory Todo.fromJson(Map<String, dynamic> json) => _$TodoFromJson(json);
}
// في الترمنال:
// dart run build_runner build
// dart run build_runner watch`,
          try: "اعمل الموديل ده وشغّل build_runner، وافتح [[todo.freezed.dart]] و [[todo.g.dart]] واقراهم. جرّب [[Todo(id: 1, title: 'a') == Todo(id: 1, title: 'a')]] و [[print(todo.copyWith(dueAt: null))]] على todo فيه تاريخ. وبعدين ابعت لـ fromJson Map فيها [[id]] نص وشوف الـ error.",
          flag: "script",
          deep: {
            why: "في تطبيق فيه ٣٠ موديل، الكود اليدوي لـ fromJson و copyWith و == بيبقى آلاف السطور، وأي field جديد لازم تفتكر تضيفه في ٥ أماكن. الـ codegen بيخلي الموديل تعريف الـ fields بس، والباقي بيتولّد صح كل مرة.",
            how: R`[[part 'todo.g.dart';]] بيقول إن الملف المتولّد جزء من نفس الـ library، فيقدر يشوف الـ private ([[_$TodoFromJson]]). واسم الـ part لازم يطابق اسم ملفك بالظبط.

freezed (من v3): الـ class لازم يبقى [[abstract class]] (أو [[sealed class]] لو فيه أكتر من factory، زي Loading و Data و Error)، و [[with _$Todo]] بيجيب الـ getters و copyWith. و [[const factory Todo({...}) = _Todo;]] بيعرّف الـ fields كـ parameters، والـ class الحقيقي [[_Todo]] متولّد.

annotations مهمة:
- [[@JsonKey(name: 'due_at')]] اسم مختلف في JSON. أو على الـ class كله [[@JsonSerializable(fieldRename: FieldRename.snake)]].
- [[@Default(false)]] قيمة افتراضية في الـ constructor وفي fromJson لو المفتاح مش موجود.
- [[DateTime]] بيتحوّل من وإلى ISO string أوتوماتيك.
- موديل جوه موديل: بيعمل fromJson ليه لوحده لو فيه fromJson.

الـ copyWith بتاع freezed بيفرّق بين «متبعتش» و «بعت null»، فـ [[copyWith(dueAt: null)]] بيمسح التاريخ فعلًا، عكس الـ copyWith اليدوي.

json_serializable لوحده (من غير freezed): [[@JsonSerializable()]] على class عادي، و [[factory X.fromJson(json) => _$XFromJson(json);]] و [[Map<String, dynamic> toJson() => _$XToJson(this);]] و [[part 'x.g.dart';]]. مناسب لو مش محتاج copyWith و ==.

الأخطاء في fromJson المتولّد: الكود فيه [[as num]] و [[as String]]، فالنوع الغلط بيرمي [[TypeError]] زي [[type 'String' is not a subtype of type 'num' in type cast]]، مش FormatException. اعمل catch ليه عند حدود الـ API لو عايز رسالة أوضح.

[[--delete-conflicting-outputs]] هتلاقيه في tutorials قديمة، النسخ الحالية من build_runner مبقتش محتاجاه.

الملفات المتولّدة: فرق بتعمله commit (عشان الـ CI والـ review يبقوا أسرع)، وفرق بتضيفه لـ .gitignore وتولّده في CI. اختار واحد وخليك عليه.`,
            when: "أكتر من ٥ موديلات، أو موديلات فيها fields كتير، أو محتاج == بالقيم (مقارنة state في Riverpod و Bloc، واختبارات). ولمشروع صغير فيه ٢ موديل، الكتابة بالإيد (الدرس اللي فات) أوضح.",
            mistakes: R`تنسى تشغّل build_runner بعد ما تضيف field فالـ compiler يقولك [[_$Todo]] مش فيه الـ getter الجديد. واسم الـ part مختلف عن اسم الملف. وتكتب [[class Todo with _$Todo]] من غير abstract في freezed 3 فيطلع error. وتعدّل في [[.g.dart]] بإيدك وأول build يمسح تعديلك.`
          },
          lines: [
            "import الـ annotations (freezed بيعمل re-export لـ json_annotation).",
            "الملف اللي freezed هيولّده (copyWith و == و toString).",
            "الملف اللي json_serializable هيولّده (fromJson و toJson).",
            "[[@freezed]]: ولّد لي الـ class ده.",
            "abstract و mixin من الملف المتولّد.",
            "الـ constructor هو تعريف الـ fields.",
            "إجباري.",
            "إجباري.",
            "اسمه completed في JSON، وافتراضيًا false.",
            "اسمه due_at في JSON، و DateTime بيتحوّل لوحده.",
            "[[_Todo]] الـ class الحقيقي المتولّد.",
            "fromJson بتنادي الدالة المتولّدة، و toJson بيتولّد لوحده.",
            "قفلة."
          ],
          sol: R`بعد [[dart run build_runner build]] هتلاقي [[todo.freezed.dart]] فيه [[copyWith]] و [[operator ==]] و [[hashCode]] و [[toString]]، و [[todo.g.dart]] فيه [[_$TodoFromJson]] و [[_$TodoToJson]] بالأسماء [['completed']] و [['due_at']].

[[Todo(id: 1, title: 'a') == Todo(id: 1, title: 'a')]] بترجّع true (مقارنة بالقيم). و [[copyWith(dueAt: null)]] بيطبع [[Todo(id: ..., dueAt: null)]]: التاريخ اتمسح فعلًا.

fromJson بـ id نص: [[_TypeError]] ورسالته [[type 'String' is not a subtype of type 'num' in type cast]]. مش FormatException، فلو بتمسك [[on FormatException]] بس هتفوتك.`
        },
        {
          cmd: "FutureBuilder",
          title: "تعرض loading لحد ما البيانات توصل وبعدين تعرضها",
          desc: R`[[FutureBuilder]] widget بياخد [[future]] ودالة [[builder]] بتتنادى كل ما حالة الـ Future تتغير: وهو شغال، ولما يخلص بنتيجة، ولما يفشل. و [[snapshot]] فيه [[connectionState]] و [[data]] و [[error]].

القاعدة الأهم: الـ Future بيتعمل مرة واحدة ويتخزّن في الـ State (في initState أو [[late]] field)، مش جوه build. لو كتبت [[future: fetchNames()]] جوه build، كل rebuild هيبعت طلب جديد.`,
          example: R`import 'package:flutter/material.dart';

Future<List<String>> fetchNames() async {
  await Future.delayed(const Duration(seconds: 1));
  return ['Ali', 'Sara'];
}

class NamesScreen extends StatefulWidget {
  const NamesScreen({super.key});
  @override
  State<NamesScreen> createState() => _NamesScreenState();
}

class _NamesScreenState extends State<NamesScreen> {
  late Future<List<String>> _future = fetchNames();

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<String>>(
      future: _future,
      builder: (context, snapshot) {
        if (snapshot.connectionState != ConnectionState.done) {
          return const Center(child: CircularProgressIndicator());
        }
        if (snapshot.hasError) {
          return TextButton(
            onPressed: () => setState(() => _future = fetchNames()),
            child: Text('Error: $__{snapshot.error}. Tap to retry'),
          );
        }
        final names = snapshot.data!;
        if (names.isEmpty) return const Center(child: Text('No names yet'));
        return ListView(children: [for (final n in names) ListTile(title: Text(n))]);
      },
    );
  }
}`,
          try: "حط [[debugPrint('fetch')]] في أول fetchNames. انقل [[fetchNames()]] من الـ field لجوه build مباشرة ([[future: fetchNames()]])، وضيف زرار بيعمل [[setState(() {})]]: دوس عليه كام مرة وعدّ الـ fetch. رجّعه، وخلي fetchNames ترمي [[Exception('offline')]] وجرّب زرار retry.",
          flag: "script",
          deep: {
            why: "أول ما شاشة تفتح وتطلب بيانات، فيه ٣ حالات لازم تتعرض: بيحمّل، ووصل، وفشل. FutureBuilder بيدّيك ده من غير ما تعمل متغيرات [[_loading]] و [[_error]] و [[_data]] بإيدك وتنسى تصفّر واحد فيهم.",
            how: R`الـ connectionState: [[none]] (مفيش future)، و [[waiting]] (شغال)، و [[done]] (خلص بنتيجة أو بخطأ). و [[active]] دي للـ Streams بس (StreamBuilder).

[[hasData]] و [[hasError]] بيقولوا الـ Future خلص بإيه. لاحظ إن لما تبدّل الـ future بواحد جديد (retry)، الـ snapshot بيرجع waiting بس [[data]] ممكن تفضل فيها النتيجة القديمة لحد ما الجديدة توصل. فالترتيب في المثال (connectionState الأول) بيعرض loader في الـ retry.

ليه مش جوه build: build بتتنادى كتير (setState في الأب، تغيير الثيم، الكيبورد فتح وغيّر MediaQuery). كل مرة [[fetchNames()]] بيعمل Future جديد، و FutureBuilder بيشوف future مختلف فيبدأ من الأول: طلب شبكة جديد، و loader يظهر ويختفي. عشان كده [[late Future<...> _future = fetchNames();]] في الـ State: [[late]] بيأجل التنفيذ لأول قراية، ودا بيحصل مرة واحدة.

والـ retry: [[setState(() => _future = fetchNames())]] بيحط future جديد فـ FutureBuilder يبدأ من الأول.

initState مينفعش تبقى async (درس initState و dispose)، ودا بالظبط ليه FutureBuilder موجود: بتبدأ العملية في initState وتسيب الـ widget يعرض الحالة.

الحدود: مفيش cache (الشاشة تتقفل وتتفتح = طلب جديد)، ومفيش refresh من شاشة تانية، ومفيش مشاركة للبيانات بين شاشتين. لما تحتاج أي حاجة من دول، Riverpod و AsyncNotifier (درس AsyncNotifier) بيحلّوها.`,
            when: "شاشة بسيطة بتحمّل حاجة مرة لما تفتح ومحدش تاني محتاجها: تفاصيل صفحة، أو إعدادات من السيرفر. ولأي حاجة أكبر: state management.",
            mistakes: R`[[future: api.fetch()]] جوه build (أشهر غلطة في Flutter). و [[snapshot.data!]] قبل ما تتأكد من الحالة فيضرب وهو لسه بيحمّل. ومتعرضش حالة الخطأ خالص فالـ loader يلف للأبد أو الشاشة تفضى. وتنسى حالة «فاضي»: اللستة رجعت [] فالشاشة بيضا والمستخدم فاكر إنها لسه بتحمّل.`
          },
          lines: [
            "مكتبة Material.",
            "دالة async بتقلّد طلب API.",
            "ثانية.",
            "النتيجة.",
            "قفلة.",
            "StatefulWidget عشان نخزّن الـ Future.",
            "constructor.",
            "بتعيد تعريف createState.",
            "الـ State.",
            "قفلة.",
            "الـ State.",
            "الـ Future بيتعمل مرة واحدة أول ما يتقري، مش مع كل build.",
            "بتعيد تعريف build.",
            "build.",
            "FutureBuilder بنوع النتيجة.",
            "الـ Future المتخزّن.",
            "بيتنادى مع كل تغيير في الحالة.",
            "لسه مخلصش (أو بيعيد بعد retry).",
            "loader.",
            "قفلة.",
            "خلص بخطأ.",
            "زرار retry.",
            "future جديد فالـ FutureBuilder يبدأ من الأول.",
            "رسالة الخطأ.",
            "قفلة.",
            "قفلة الـ if.",
            "هنا متأكدين إن فيه data.",
            "حالة الفاضي.",
            "البيانات.",
            "قفلة الـ builder.",
            "قفلة FutureBuilder.",
            "قفلة build.",
            "قفلة الـ State."
          ],
          sol: R`لما [[fetchNames()]] جوه build: كل ضغطة على الزرار بتطبع [[fetch]] تاني والـ loader يظهر ثانية. ٥ ضغطات = ٥ طلبات. ورجّعه للـ field: [[fetch]] بتتطبع مرة واحدة مهما دوست.

مع [[throw Exception('offline')]]: بعد ثانية بيظهر [[Error: Exception: offline. Tap to retry]]. الضغط عليه بيطبع fetch تاني، ويعرض loader ثانية، ويرجع نفس الخطأ (لأن الدالة لسه بترمي). لو رجّعتها سليمة وعملت hot reload ثم retry، الأسماء بتظهر.

الغلط الشائع: تعمل retry بـ [[setState(() {})]] فاضية. مفيش حاجة هتحصل، لأن الـ future نفسه متغيرش.`
        }
      ]
    },
    {
      t: "الـ state بـ Riverpod",
      l: 2,
      n: "providers بتشيل البيانات بره الـ widgets، و Notifier يغيّرها، و AsyncNotifier للي جاي من API بحالات loading و error و data",
      items: [
        {
          cmd: "ProviderScope و ref.watch",
          title: "قيمة واحدة كل الشاشات تقراها وتتحدث لما تتغير",
          desc: R`[[Riverpod]] (نسخة 3، الـ package اسمها [[flutter_riverpod]]) بيحط البيانات والخدمات في «providers» متعرّفة كمتغيرات top-level، وأي widget يقراها. [[ProviderScope]] بيلف التطبيق كله ودا المكان اللي القيم بتتخزن فيه فعلًا.

الـ widget بيبقى [[ConsumerWidget]] بدل StatelessWidget، و build بتاخد [[WidgetRef ref]] زيادة. [[ref.watch(provider)]] بيقرا القيمة ويعيد build لو اتغيرت، و [[ref.read(provider)]] بيقراها مرة من غير اشتراك (جوه onPressed).`,
          example: R`import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;

const apiBase = String.fromEnvironment('API_URL', defaultValue: 'http://10.0.2.2:3000');

final httpClientProvider = Provider<http.Client>((ref) {
  final client = http.Client();
  ref.onDispose(client.close);
  return client;
});

final baseUrlProvider = Provider<Uri>((ref) => Uri.parse(apiBase));

class ApiStatus extends ConsumerWidget {
  const ApiStatus({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final base = ref.watch(baseUrlProvider);
    return Text('API: $__{base.host}:$__{base.port}');
  }
}

void main() {
  runApp(const ProviderScope(child: MaterialApp(home: Scaffold(body: Center(child: ApiStatus())))));
}`,
          try: "شغّل مرة عادي ومرة بـ [[flutter run --dart-define=API_URL=http://192.168.1.10:8000]]. وبعدين في main اعمل override: [[ProviderScope(overrides: [baseUrlProvider.overrideWithValue(Uri.parse('https://staging.example.com'))], child: ...)]] وشوف النص. وآخر حاجة: شيل الـ ProviderScope خالص وشغّل.",
          flag: "script",
          deep: {
            why: "setState بيشتغل جوه widget واحد. أول ما شاشتين محتاجين نفس البيانات (السلة، المستخدم الحالي، الإعدادات) هتبدأ تعدّي القيم في constructors من فوق لتحت ٥ مستويات، أو تعمل singletons global يصعب اختبارها. Riverpod بيدّي كل حاجة مكان واحد، وأي widget يقراها مباشرة، وفي الاختبارات تبدّل أي provider بـ fake من غير ما تلمس الكود.",
            how: R`الـ provider نفسه (المتغير [[baseUrlProvider]]) مش القيمة: هو «وصفة» بتقول القيمة بتتعمل إزاي. القيمة بتتعمل أول مرة حد يطلبها (lazy)، وبتتخزن جوه الـ ProviderScope، وكل اللي يطلبها بعد كده ياخد نفس النسخة. عشان كده التعريف global عادي ومفيش مشكلة: الـ state نفسها مش global.

[[ref]] جوه الـ provider بيخليه يعتمد على providers تانية: [[final base = ref.watch(baseUrlProvider);]] جوه provider تاني، ولو base اتغيرت، التاني يتحسب من جديد. ودا graph تبعيات Riverpod بيديره لوحده. و [[ref.onDispose]] بيقفل الموارد لما الـ provider يتشال.

[[ref.watch]] مقابل [[ref.read]]:
- watch في build (أو جوه provider): بيشترك، والـ widget يعيد build مع كل تغيير.
- read في callbacks ([[onPressed]]): قراية مرة واحدة. read جوه build غلط، لأن الـ widget مش هيتحدث.
- [[ref.listen]] في build: ينفّذ حاجة (SnackBar، تنقل) لما القيمة تتغير من غير rebuild.

أنواع الـ widgets: [[ConsumerWidget]] بدل Stateless، و [[ConsumerStatefulWidget]] مع [[ConsumerState]] بدل Stateful (وهناك [[ref]] property متاحة في كل الدوال)، و [[Consumer(builder: ...)]] لو عايز جزء صغير بس يعيد build.

الـ autoDispose: [[Provider.autoDispose(...)]] بيمسح القيمة لما محدش يبقى بيعمل watch عليها (الشاشة اتقفلت). مناسب لبيانات شاشة واحدة.

الـ overrides: [[overrideWithValue]] و [[overrideWith]] في ProviderScope بيبدّلوا provider بقيمة تانية. دي اللي بتستخدمها في الاختبارات (درس flutter test) وفي تجهيز حاجات async قبل runApp (زي SharedPreferences).

وفيه codegen اختياري: [[@riverpod]] على دالة أو class و [[riverpod_generator]] يولّد الـ provider. نفس المفاهيم، والدروس هنا بالكتابة اليدوية عشان تفهم اللي بيتولّد.`,
            when: "أي حاجة أكتر من widget واحد محتاجها، أو خدمة (API client، repository) عايز تبدّلها في الاختبارات. والـ state المحلية البحتة (checkbox في كارت، tab مختار) خليها setState.",
            mistakes: R`تنسى [[ProviderScope]] فوق التطبيق. و [[ref.read]] جوه build فالشاشة متتحدثش. و [[ref.watch]] جوه onPressed (بيشتغل بس بيعمل اشتراكات ملهاش لازمة، والـ lint بيمسكه). وتعمل الـ provider جوه build أو جوه class ([[final p = Provider(...)]] في كل rebuild) فكل مرة provider جديد وقيمة جديدة: الـ providers تتعرّف top-level أو static final.`
          },
          lines: [
            "مكتبة Material.",
            "Riverpod لـ Flutter (من [[flutter pub add flutter_riverpod]]).",
            "http.",
            "العنوان من [[--dart-define]] وقت الـ build، ولو مش موجود عنوان الـ emulator.",
            "provider بيرجّع http.Client واحد للتطبيق كله.",
            "بيتعمل أول مرة حد يطلبه.",
            "[[ref.onDispose]]: اقفل الـ client لما الـ provider يتشال.",
            "القيمة.",
            "قفلة.",
            "provider بسيط بيرجّع الـ base URL.",
            "[[ConsumerWidget]]: زي StatelessWidget بس build بتاخد ref.",
            "constructor.",
            "بتعيد تعريف build.",
            "build بـ ref زيادة.",
            "[[ref.watch]]: اقرا واعمل rebuild لو اتغيرت.",
            "استخدمها عادي.",
            "قفلة build.",
            "قفلة الـ class.",
            "البداية.",
            "[[ProviderScope]] فوق التطبيق كله: هنا القيم بتتخزن.",
            "قفلة main."
          ],
          sol: R`عادي: [[API: 10.0.2.2:3000]]. ومع [[--dart-define=API_URL=http://192.168.1.10:8000]]: [[API: 192.168.1.10:8000]] (القيمة اتحطت وقت الترجمة، ولازم full restart مش hot reload عشان تتغير).

مع الـ override: [[API: staging.example.com:443]]. الـ port 443 لأن [[Uri.port]] بيرجّع الافتراضي للـ scheme لو مش مكتوب. ولاحظ إن ApiStatus نفسه متعدلش خالص.

من غير ProviderScope: التطبيق بيضرب أول ما ApiStatus يعمل build، والرسالة بتقول إن مفيش ProviderScope فوق الـ widget ([[No ProviderScope found]]).`
        },
        {
          cmd: "Notifier",
          title: "سلة مشتريات أي شاشة تضيف فيها وأي شاشة تشوفها",
          desc: R`[[Notifier<T>]] class فيه [[build()]] بترجّع القيمة الأولية، و methods بتغيّر [[state]]. وبتعرّفه بـ [[NotifierProvider]]. الـ widgets بتقرا القيمة بـ [[ref.watch(cartProvider)]]، وبتنادي الدوال بـ [[ref.read(cartProvider.notifier).add(...)]].

الـ state immutable: متعدّلش في الـ list ([[state.add]])، اعمل list جديدة ([[state = [...state, item]]]). Riverpod بيعرف إن حاجة اتغيرت لما [[state]] يتحط بقيمة جديدة.`,
          example: R`import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

typedef CartItem = ({String name, double price, int qty});

class CartNotifier extends Notifier<List<CartItem>> {
  @override
  List<CartItem> build() => [];

  void add(String name, double price) {
    final i = state.indexWhere((e) => e.name == name);
    if (i == -1) {
      state = [...state, (name: name, price: price, qty: 1)];
    } else {
      state = [
        for (final (j, e) in state.indexed)
          j == i ? (name: e.name, price: e.price, qty: e.qty + 1) : e,
      ];
    }
  }

  void clear() => state = [];
}

final cartProvider = NotifierProvider<CartNotifier, List<CartItem>>(CartNotifier.new);

final cartTotalProvider = Provider<double>((ref) {
  return ref.watch(cartProvider).fold(0.0, (sum, e) => sum + e.price * e.qty);
});

class CartButton extends ConsumerWidget {
  const CartButton({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(cartProvider.select((items) => items.length));
    final total = ref.watch(cartTotalProvider);
    return TextButton(
      onPressed: () => ref.read(cartProvider.notifier).add('Tea', 10),
      child: Text('$count items • $__{total.toStringAsFixed(2)} EGP'),
    );
  }
}`,
          try: "حط CartButton في شاشتين مختلفتين (AppBar في الرئيسية وشاشة المنتج) ودوس في واحدة: التانية اتحدثت؟ ضيف [[remove(String name)]] بتقلل الكمية وتشيل العنصر لما يوصل صفر. وبعدين غيّر add لـ [[state.add(...)]] بدل list جديدة وشوف اللي بيحصل للزرار.",
          flag: "script",
          deep: {
            why: "السلة محتاجاها شاشة المنتجات (زرار أضف)، و AppBar (العدد)، وشاشة الدفع (الإجمالي). لو في setState جوه شاشة واحدة، الباقيين مش هيعرفوا. Notifier بيحط الـ state ومنطق تعديلها في class واحد، بعيد عن الـ UI، وتقدر تختبره من غير ما تعمل widget خالص.",
            how: R`[[CartNotifier.new]] tear-off للـ constructor: Riverpod بيعمل الـ Notifier بنفسه أول مرة حد يطلبه، وينادي [[build()]] للقيمة الأولية. و build ممكن تعمل [[ref.watch]] لـ providers تانية، ولو اتغيرت الـ Notifier يتعمله build من جديد.

[[state]] getter و setter: أي [[state = ...]] بيقارن القيمة الجديدة بالقديمة ([[==]] أو [[identical]])، ولو مختلفة يبلّغ كل اللي عاملين watch. عشان كده [[state.add(x)]] مش بيعمل حاجة للـ UI: نفس الـ list (نفس المرجع) اتعدلت من جوه، فمفيش «تغيير» يتبلّغ. وفوق كده الـ list الافتراضية [[[]]] ممكن تبقى const في مواقف تانية فتضرب.

[[select]]: [[ref.watch(cartProvider.select((items) => items.length))]] بيعمل rebuild بس لو العدد اتغير، مش لو كمية عنصر زادت. مفيد للـ widgets اللي بتتعرض كتير.

provider مشتق: [[cartTotalProvider]] بيعمل watch على السلة ويحسب الإجمالي. بيتحسب من جديد تلقائيًا مع كل تغيير في السلة، ومفيش مكان تنسى فيه تحدّث الإجمالي. زي [[useMemo]] أو computed.

[[ref.read(cartProvider.notifier)]] بيرجّع الـ Notifier نفسه عشان تنادي methods. و [[ref.read(cartProvider)]] بيرجّع الـ state.

Riverpod 3: [[StateProvider]] و [[StateNotifierProvider]] و [[ChangeNotifierProvider]] بقوا legacy واتنقلوا لـ [[package:flutter_riverpod/legacy.dart]]. هتلاقيهم في tutorials ومشاريع قديمة، والجديد Notifier.

الاختبار من غير UI:
[[final c = ProviderContainer(); c.read(cartProvider.notifier).add('Tea', 10); expect(c.read(cartTotalProvider), 10);]]`,
            when: "state متشاركة بين شاشات وليها عمليات: سلة، فلاتر بحث، إعدادات المستخدم، مفضلة. ولو البيانات جاية من API: AsyncNotifier (الدرس الجاي).",
            mistakes: R`[[state.add()]] أو [[state[0].qty++]] بدل ما تعمل state جديدة، فالـ UI مبيتحدثش. ومنطق التعديل مكتوب في onPressed بدل method في الـ Notifier، فيتكرر في كل زرار. و [[ref.watch(cartProvider.notifier)]] في build: الـ notifier نفسه مش بيتغير فمفيش فايدة، الـ watch على القيمة. وتنادي method في Notifier من جوه build بتاع widget فتعمل loop.`
          },
          lines: [
            "مكتبة Material.",
            "Riverpod.",
            "record type لعنصر السلة.",
            "Notifier بيشيل [[List<CartItem>]].",
            "بتعيد تعريف build.",
            "القيمة الأولية: سلة فاضية.",
            "إضافة منتج.",
            "موجود قبل كده؟",
            "لأ...",
            "...list جديدة فيها القديم والجديد.",
            "موجود...",
            "...list جديدة برضه.",
            "[[indexed]] بيدّي (index, عنصر).",
            "العنصر ده يزيد كميته، والباقي زي ما هو.",
            "قفلة الـ list.",
            "قفلة الـ if.",
            "قفلة add.",
            "تفضية.",
            "قفلة الـ class.",
            "الـ provider: بيعمل CartNotifier ويشيل الـ state.",
            "provider مشتق: الإجمالي.",
            "بيتحسب من السلة، ويتحسب تاني لوحده لما تتغير.",
            "قفلة.",
            "widget بيقرا ويكتب.",
            "constructor.",
            "بتعيد تعريف build.",
            "build.",
            "[[select]]: rebuild لو العدد اتغير بس.",
            "الإجمالي.",
            "الزرار.",
            "[[ref.read]] في callback، و [[.notifier]] عشان تنادي method.",
            "النص.",
            "قفلة الزرار.",
            "قفلة build.",
            "قفلة الـ class."
          ],
          sol: R`الشاشتين بيتحدثوا مع بعض: الاتنين عاملين watch على نفس الـ provider في نفس الـ ProviderScope. بعد ضغطتين: [[1 items • 20.00 EGP]] (منتج واحد كميته 2، فالعدد 1 والإجمالي 20).

remove: لو الكمية 1 شيل العنصر، غير كده قلّل. ومع [[state.add(...)]]: الزرار مش بيتحدث خالص (الـ list اتعدلت من جوه بس محدش اتبلّغ)، ولو في مكان تاني حصل rebuild لأي سبب هتلاقي الرقم «نط» فجأة. ودا نفس سلوك setState من غير setState.`,
          solCode: R`void remove(String name) {
  state = [
    for (final e in state)
      if (e.name != name) e
      else if (e.qty > 1) (name: e.name, price: e.price, qty: e.qty - 1),
  ];
}`
        },
        {
          cmd: "AsyncNotifier",
          title: "بيانات من API ليها loading و error و data ويتحدثوا بعد الإضافة",
          desc: R`[[AsyncNotifier<T>]] زي Notifier بس [[build()]] بتاعته async: بترجّع [[Future<T>]]، والـ state بتاعه [[AsyncValue<T>]] اللي هو يا [[AsyncLoading]] يا [[AsyncData]] يا [[AsyncError]]. Riverpod بيدير الحالات دي لوحده: أول ما حد يعمل watch يبدأ التحميل، ولو فشل يحط AsyncError.

والـ methods ([[add]] مثلًا) بتكلم الـ API وبعدين تحدّث [[state]] بالنتيجة. والـ repository بيتحقن كـ provider، فتبدّله بـ fake في الاختبارات.`,
          example: R`import 'package:flutter_riverpod/flutter_riverpod.dart';

class Todo {
  const Todo(this.id, this.title);
  final int id;
  final String title;
}

abstract interface class TodoRepo {
  Future<List<Todo>> fetchAll();
  Future<Todo> create(String title);
}

final todoRepoProvider = Provider<TodoRepo>((ref) => throw UnimplementedError('override in main'));

final todosProvider = AsyncNotifierProvider<TodosNotifier, List<Todo>>(TodosNotifier.new);

class TodosNotifier extends AsyncNotifier<List<Todo>> {
  @override
  Future<List<Todo>> build() => ref.watch(todoRepoProvider).fetchAll();

  Future<void> add(String title) async {
    final created = await ref.read(todoRepoProvider).create(title);
    if (!ref.mounted) return;
    state = AsyncData([...?state.value, created]);
  }
}`,
          try: "اعمل [[HttpTodoRepo implements TodoRepo]] بيكلم الـ API (بـ http و fromJson من الدروس اللي فاتت)، واعمل override في main: [[ProviderScope(overrides: [todoRepoProvider.overrideWithValue(HttpTodoRepo())])]]. وبعدين اعمل [[FakeTodoRepo]] بيرجّع لستة ثابتة بعد ثانية، وبدّله: الشاشة اشتغلت من غير أي تعديل؟",
          flag: "script",
          deep: {
            why: "FutureBuilder بيحل الحالات التلاتة لشاشة واحدة. بس في تطبيق حقيقي اللستة دي متشاركة: شاشة الإضافة محتاجة تحدّثها، والـ badge محتاج العدد، و pull-to-refresh محتاج يعيد التحميل، والبيانات لازم تفضل موجودة لو رجعت للشاشة. AsyncNotifier بيعمل كل ده، وبيفصل منطق البيانات عن الـ widgets.",
            how: R`[[build()]] بتتنادى أول مرة حد يعمل watch. ولأنها بتعمل [[ref.watch(todoRepoProvider)]]، لو الـ repo اتغير (مستخدم تاني عمل login مثلًا) الـ build يتنادى تاني لوحده.

[[AsyncValue]] sealed class في Riverpod 3، فتعمل عليه switch exhaustive (الدرس الجاي). وفيه [[value]] (القيمة أو null)، و [[error]]، و [[isLoading]]، و [[hasValue]]، و [[requireValue]] (بيرمي لو مفيش). ولما تعمل refresh، الحالة بتبقى loading بس [[value]] لسه فيها البيانات القديمة، فتقدر تعرضها ومعاها loader صغير بدل ما تفضّي الشاشة.

[[add]]: بنكلم السيرفر الأول، ولو نجح نضيف النتيجة للـ state الموجودة ([[...?state.value]]، علامة ? عشان لو لسه بيحمّل). ولو السيرفر فشل، الـ exception بيطلع من add للـ widget اللي نادى، فيعرض SnackBar، والـ state القديمة سليمة. بديل: [[state = await AsyncValue.guard(() async {...})]] بيحوّل أي exception لـ AsyncError، بس ساعتها اللستة كلها بتختفي وتظهر شاشة خطأ عشان إضافة فشلت، ودا نادرًا اللي عايزه.

[[ref.mounted]] (جديد في Riverpod 3): بعد await ممكن يكون الـ provider اتعمله dispose (autoDispose والشاشة اتقفلت)، فتحديث state ساعتها غلط. زي [[mounted]] في State.

الـ retry التلقائي في Riverpod 3: provider فشل بـ Exception بيتعاد لوحده (بتأخير بيبدأ ٢٠٠ms ويتضاعف لحد ٦.٤ ثانية، لحد ١٠ مرات). لو الخطأ [[Error]] (bug في الكود) مش بيعيد. وتتحكم فيه بـ [[retry:]] على الـ provider أو على ProviderScope، وتقفله بدالة بترجّع null. ودا سبب تاني إن فرق Exception و Error مهم.

[[ref.invalidate(todosProvider)]] بيمسح القيمة ويعيد build. و [[ref.refresh(todosProvider.future)]] نفس الكلام ويرجّع Future تستنى عليه (مناسب لـ [[RefreshIndicator]]).

وللـ parameters (todo واحد بالـ id): [[AsyncNotifierProvider.family]] والـ id بيتبعت للـ constructor: [[ref.watch(todoProvider(42))]].

[[throw UnimplementedError(...)]] في todoRepoProvider: pattern مشهور معناه «الـ provider ده لازم يتعمله override». لو نسيت، الخطأ واضح من أول تشغيل.`,
            when: "أي بيانات جاية من API وأكتر من مكان محتاجها أو بتتعدل: لستة المنتجات، والطلبات، والبروفايل. ولقراية بسيطة من غير methods: [[FutureProvider]] كفاية ([[final p = FutureProvider((ref) => repo.fetch());]]).",
            mistakes: R`[[state = AsyncData([...state.value!, created])]] و [[!]] يضرب لو لسه بيحمّل. وتنسى [[ref.mounted]] بعد await فيطلع error من Riverpod في الـ console. وتحط [[AsyncValue.guard]] على كل عملية فأي فشل صغير يمسح الشاشة. وتعمل [[ref.watch]] جوه [[add]] بدل [[ref.read]]: في methods الـ Notifier استخدم read.`
          },
          lines: [
            "Riverpod.",
            "موديل بسيط (في مشروعك: الموديل بتاع fromJson أو freezed).",
            "constructor.",
            "id.",
            "العنوان.",
            "قفلة.",
            "العقد: أي repository لازم يعرف يجيب ويضيف.",
            "هات الكل.",
            "ضيف واحد.",
            "قفلة.",
            "provider للـ repo، ولازم يتعمله override (حقيقي في main، و fake في الاختبارات).",
            "الـ provider بتاع اللستة: الـ state بتاعه [[AsyncValue<List<Todo>>]].",
            "AsyncNotifier.",
            "بتعيد تعريف build.",
            "async: Riverpod بيحط loading لحد ما الـ Future يخلص، وبعدين data أو error.",
            "method للإضافة.",
            "كلّم السيرفر. لو فشل الـ exception يطلع للي نادى.",
            "الـ provider ممكن يكون اتقفل وانت مستني.",
            "ضيف للموجود (ولو لسه مفيش قيمة ابدأ من فاضي).",
            "قفلة add.",
            "قفلة الـ class."
          ],
          sol: R`HttpTodoRepo بيعمل [[http.get]] ويحوّل بـ [[Todo.fromJson]]، و create بيعمل POST ويحوّل الرد. بعد الـ override الشاشة (الدرس الجاي) بتعرض loader ثم اللستة الحقيقية.

ولما تبدّل بـ FakeTodoRepo: نفس الشاشة بالظبط بتشتغل بالبيانات الثابتة، من غير ما تعدّل TodosNotifier ولا الـ widget. دا الهدف من الـ repository كـ provider: الـ UI مش عارف البيانات جاية منين.

الغلط الشائع: تكتب [[HttpTodoRepo()]] مباشرة جوه build بتاع الـ Notifier بدل ما تقراه من provider، فمش هتعرف تبدّله في الاختبار.`,
          solCode: R`class FakeTodoRepo implements TodoRepo {
  final _items = [const Todo(1, 'buy milk'), const Todo(2, 'call mom')];
  @override
  Future<List<Todo>> fetchAll() async {
    await Future.delayed(const Duration(seconds: 1));
    return _items;
  }
  @override
  Future<Todo> create(String title) async => Todo(_items.length + 1, title);
}

void main() {
  runApp(ProviderScope(
    overrides: [todoRepoProvider.overrideWithValue(FakeTodoRepo())],
    child: const MaterialApp(home: Scaffold(body: TodosScreen())),
  ));
}`
        },
        {
          cmd: "loading و error و empty",
          title: "الشاشة ليها ٤ حالات مش واحدة، وكل واحدة ليها شكل",
          desc: R`أي شاشة بتعرض بيانات من الشبكة ليها ٤ حالات: بيحمّل، وحصل خطأ (ومعاه زرار «حاول تاني»)، وجه فاضي (ومعاه رسالة تشرح)، وفيه بيانات. التطبيقات الضعيفة بتعمل الأخيرة بس، والمستخدم يشوف شاشة بيضا ومش عارف ليه.

مع Riverpod 3، [[AsyncValue]] sealed، فتعمل switch بـ patterns: [[AsyncValue(:final value?)]] فيه بيانات، و [[AsyncValue(:final error?)]] فيه خطأ، والباقي loading. و [[RefreshIndicator]] لـ pull-to-refresh.`,
          example: R`// نفس ملف الدرس اللي فات: todosProvider و imports بتوع material و flutter_riverpod
class TodosScreen extends ConsumerWidget {
  const TodosScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final todos = ref.watch(todosProvider);
    return RefreshIndicator(
      onRefresh: () => ref.refresh(todosProvider.future),
      child: switch (todos) {
        AsyncValue(:final value?) when value.isEmpty => const EmptyView(),
        AsyncValue(:final value?) => ListView.builder(
            itemCount: value.length,
            itemBuilder: (context, i) => ListTile(title: Text(value[i].title)),
          ),
        AsyncValue(:final error?) => ErrorView(
            message: '$error',
            onRetry: () => ref.invalidate(todosProvider),
          ),
        _ => const Center(child: CircularProgressIndicator()),
      },
    );
  }
}
// EmptyView و ErrorView: ListView فيها أيقونة ونص (وزرار retry في ErrorView).
// لازم تبقى ListView مش Column عشان الـ pull-to-refresh يشتغل وهي فاضية.`,
          try: "اعمل FakeTodoRepo فيه flag اسمه [[fail]]. جرّب ٣ مرات: لستة فاضية، و fail = true، ولستة فيها عناصر. وفي حالة الخطأ غيّر fail لـ false (من زرار debug مثلًا) ودوس «حاول تاني». وبعدين اعمل pull-to-refresh وانت عندك بيانات: البيانات بتختفي؟",
          flag: "script",
          deep: {
            why: "على الموبايل النت بيقطع طول الوقت (مترو، أسانسير، باقة خلصت). الشاشة لازم تقول للمستخدم إيه اللي حصل وإيه اللي يعمله: «مفيش اتصال، حاول تاني» أحسن من loader بيلف للأبد. و«مفيش طلبات لسه، اطلب أول حاجة» أحسن من شاشة فاضية بيفتكرها bug.",
            how: R`ترتيب الـ cases مقصود:
١. فيه بيانات وفاضية: EmptyView.
٢. فيه بيانات: اللستة. ودي بتيجي قبل الخطأ عشان لو refresh فشل والبيانات القديمة موجودة، نفضل نعرضها (وتقدر تعرض SnackBar بالخطأ بـ [[ref.listen]]).
٣. خطأ ومفيش بيانات: ErrorView.
٤. أي حاجة تانية: أول تحميل.

[[:final value?]] الـ [[?]] pattern null-check: يطابق لو value مش null بس، ويدّيك value من غير ?. و [[when value.isEmpty]] شرط إضافي.

[[ref.refresh(todosProvider.future)]] بيعيد build ويرجّع Future بيخلص لما البيانات الجديدة توصل، و RefreshIndicator بيفضّل الـ spinner لحد ما يخلص. أثناء الـ refresh الـ AsyncValue loading بس [[value]] لسه موجودة، فالـ case التاني بيطابق والبيانات مش بتختفي. ولو عايز تعرف إنه بيعمل refresh: [[todos.isRefreshing]].

[[ref.invalidate]] في زرار retry: بيمسح الحالة ويبدأ من الأول (loader كبير)، ودا مناسب بعد خطأ.

الـ RefreshIndicator محتاج ابن scrollable. لو EmptyView كانت Column، السحب مش هيشتغل وهي فاضية. عشان كده ListView حتى لو فيها عنصرين.

رسالة الخطأ: [[$error]] بيعرض النص الخام للـ exception، كويس للتطوير. في الإنتاج اعمل دالة بتحوّل [[ClientException]] لـ «مفيش اتصال بالنت» و [[ApiException]] بـ 401 لـ «سجّل دخول تاني»، وغيره «حصل خطأ، حاول تاني».

البديل الأقدم: [[todos.when(data: ..., error: ..., loading: ...)]] لسه موجود، والـ switch بقى الأوضح مع sealed.

وبدل spinner: skeleton loaders (مستطيلات رمادي بشكل المحتوى) بتحسّس المستخدم إن التحميل أسرع. package [[skeletonizer]] مشهورة ليها.`,
            when: "كل شاشة بتعرض بيانات من الشبكة أو قاعدة البيانات. واعمل EmptyView و ErrorView widgets مشتركة في التطبيق كله عشان الشكل يبقى واحد.",
            mistakes: R`تعرض loader بس، والخطأ مبيظهرش فيفضل يلف. وتنسى حالة الفاضي. وتحط الخطأ قبل البيانات في الـ switch فأي refresh فاشل يمسح الشاشة. و RefreshIndicator حوالين Column أو Center فالسحب مش شغال في حالة الفاضي أو الخطأ. وتعرض [[Exception: SocketException: Failed host lookup...]] للمستخدم.`
          },
          lines: [
            "ConsumerWidget.",
            "constructor.",
            "بتعيد تعريف build.",
            "build.",
            "[[AsyncValue<List<Todo>>]].",
            "السحب لتحت يعيد التحميل.",
            "بيستنى لحد ما البيانات الجديدة توصل.",
            "switch expression على الحالة.",
            "فيه بيانات بس فاضية.",
            "فيه بيانات (حتى لو بيعمل refresh أو الـ refresh فشل).",
            "العدد.",
            "كل عنصر.",
            "قفلة.",
            "خطأ ومفيش بيانات.",
            "الرسالة.",
            "retry: امسح وابدأ من الأول.",
            "قفلة.",
            "غير كده: أول تحميل.",
            "قفلة الـ switch.",
            "قفلة RefreshIndicator.",
            "قفلة build.",
            "قفلة الـ class."
          ],
          sol: R`لستة فاضية: loader ثانية ثم أيقونة ونص «مفيش مهام لسه». و fail = true: loader ثم ErrorView بالرسالة (زي [[Exception: no internet]]). لاحظ إن Riverpod 3 بيعمل retry لوحده في الخلفية مع الـ Exceptions (٢٠٠ms ثم ٤٠٠ms...)، فلو غيّرت fail لـ false ممكن الشاشة تتصلّح لوحدها قبل ما تدوس. زرار «حاول تاني» بيعمل invalidate فيبدأ فورًا.

الـ pull-to-refresh مع بيانات: البيانات بتفضل ظاهرة والـ spinner بتاع السحب فوق، لأن [[value]] لسه موجودة أثناء الـ loading والـ case التاني مطابق. لو كنت حاطط [[AsyncLoading() => spinner]] كأول case، الشاشة كانت هتفضى مع كل refresh.`,
          solCode: R`class FakeTodoRepo implements TodoRepo {
  FakeTodoRepo(this.items, {this.fail = false});
  final List<Todo> items;
  bool fail;
  @override
  Future<List<Todo>> fetchAll() async {
    await Future.delayed(const Duration(seconds: 1));
    if (fail) throw Exception('no internet');
    return items;
  }
  @override
  Future<Todo> create(String title) async => Todo(items.length + 1, title);
}`
        },
        {
          cmd: "Provider و Bloc",
          title: "هتقابل Provider و Bloc في شغل حد تاني، فلازم تقراهم",
          desc: R`Riverpod مش الوحيد. [[provider]] (نفس المؤلف، أقدم) بيحط [[ChangeNotifier]] في الشجرة، وبتقراه بـ [[context.watch<CartModel>()]]. و [[flutter_bloc]] بيفصل الأحداث عن الحالة: [[Cubit]] فيه methods بتعمل [[emit(state)]]، و [[Bloc]] الكامل بياخد events ويطلّع states.

المثال نفس السلة بالاتنين جنب بعض عشان تشوف الفرق. هتقابلهم في مشاريع موجودة وفي الانترفيوهات، فلازم تعرف تقرا الكود بتاعهم وتختار ما بينهم.`,
          example: R`import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:provider/provider.dart';

class CartModel extends ChangeNotifier {
  final _items = <String>[];
  int get count => _items.length;
  void add(String item) {
    _items.add(item);
    notifyListeners();
  }
}

class CartCubit extends Cubit<List<String>> {
  CartCubit() : super(const []);
  void add(String item) => emit([...state, item]);
}

class CartPage extends StatelessWidget {
  const CartPage({super.key});

  @override
  Widget build(BuildContext context) {
    final providerCount = context.watch<CartModel>().count;
    return Column(
      children: [
        Text('Provider: $providerCount'),
        BlocBuilder<CartCubit, List<String>>(
          builder: (context, items) => Text('Bloc: $__{items.length}'),
        ),
        FilledButton(
          onPressed: () {
            context.read<CartModel>().add('tea');
            context.read<CartCubit>().add('tea');
          },
          child: const Text('Add tea'),
        ),
      ],
    );
  }
}

void main() {
  runApp(
    MultiProvider(
      providers: [ChangeNotifierProvider(create: (_) => CartModel())],
      child: BlocProvider(
        create: (_) => CartCubit(),
        child: const MaterialApp(home: Scaffold(body: CartPage())),
      ),
    ),
  );
}`,
          try: "اعمل [[flutter pub add provider flutter_bloc]] وشغّل. بعدين في CartModel شيل [[notifyListeners()]] ودوس: أنهي عدّاد وقف؟ رجّعه، وفي الـ Cubit غيّر الـ emit لـ [[state.add(item); emit(state);]]: أنهي عدّاد وقف دلوقتي؟",
          flag: "script",
          deep: {
            why: "مشاريع Flutter اللي هتشتغل عليها في شركة معمولة بأدوات مختلفة حسب سنة ما اتبدأت: كتير بـ Provider (كان الموصى بيه في docs Flutter سنين)، وكتير في الشركات الكبيرة بـ Bloc. ولو مش فاهم الفكرة ورا كل واحد هتتوه في الكود، وفي الانترفيو السؤال شبه أكيد: «بتستخدم إيه في الـ state management وليه؟».",
            how: R`Provider: [[ChangeNotifier]] class عادي فيه state mutable، وبعد كل تعديل [[notifyListeners()]] (من Flutter نفسه، مش من الـ package). و [[ChangeNotifierProvider]] بيحطه في الشجرة فوق الشاشات. [[context.watch<T>()]] بيقرا ويعمل rebuild، و [[context.read<T>()]] للـ callbacks، و [[context.select]] لجزء. العيوب: معتمد على الشجرة (لازم الـ provider فوق الـ widget، ولو لأ [[ProviderNotFoundException]] وقت التشغيل)، ونسيان notifyListeners سهل، ومفيش async state جاهزة.

Bloc: الـ state immutable، والتغيير الوحيد بـ [[emit]]. [[Cubit]] الشكل البسيط (methods بتعمل emit). و [[Bloc]] الكامل: الـ UI بيبعت events ([[bloc.add(AddItem('tea'))]]) و [[on<AddItem>((event, emit) => ...)]] بيحوّلها لـ states. ودا بيدّيك log كامل لكل event و state (BlocObserver)، وسهل تختبره (package bloc_test)، بس الكود أطول. [[BlocBuilder]] للبناء، و [[BlocListener]] للـ side effects (تنقل، SnackBar)، و [[BlocConsumer]] الاتنين.

الـ emit بيقارن بـ [[==]]: لو بعت نفس الـ object (بعد ما عدّلته من جوه) مفيش rebuild. ودا ليه الـ Bloc states غالبًا بـ freezed أو equatable.

Riverpod (الدروس اللي فاتت): مش معتمد على الشجرة (الـ providers global، والـ state في ProviderScope)، فمفيش ProviderNotFoundException، والخطأ بيتمسك وقت الترجمة. و AsyncValue جاهزة للـ async. و overrides سهلة للاختبار.

المقارنة المختصرة:
- مشروع جديد: Riverpod (أو Bloc لو الفريق متعود عليه).
- Provider: لسه شغال ومدعوم، بس للمشاريع الموجودة.
- Bloc: لما عايز قواعد صارمة وفريق كبير وكل تغيير يتسجّل كـ event.
- setState و ValueNotifier: state محلية، ودايمًا الأبسط أحسن لو كفاية (درس «state management» في المستوى ٣).`,
            when: "Provider و Bloc لما تشتغل على مشروع معمول بيهم، أو فريق اختارهم. ومتخلطش أكتر من واحد في مشروع جديد من غير سبب.",
            mistakes: R`تنسى [[notifyListeners()]] بعد التعديل في ChangeNotifier. وتعمل emit لنفس الـ list بعد ما عدّلتها فالـ Bloc مش بيعمل rebuild. و [[context.watch]] جوه onPressed (بيضرب في Provider: [[Tried to listen to a value exposed with provider, from outside of the widget tree]]). وتحط ChangeNotifierProvider تحت الشاشة اللي محتاجاه فيطلع [[ProviderNotFoundException]]. وفي الانترفيو تقول «Bloc أحسن» أو «Riverpod أحسن» من غير trade-offs.`
          },
          lines: [
            "مكتبة Material.",
            "flutter_bloc.",
            "provider.",
            "Provider: class عادي بيورث ChangeNotifier.",
            "state mutable جوه.",
            "getter للعدد.",
            "تعديل.",
            "عدّل الـ list نفسها...",
            "...وبلّغ كل اللي سامعين. من غيرها الـ UI مش هيعرف.",
            "قفلة.",
            "قفلة الـ class.",
            "Bloc: Cubit بـ state immutable.",
            "القيمة الأولية بتتبعت لـ super.",
            "[[emit]] بـ list جديدة.",
            "قفلة.",
            "شاشة عادية StatelessWidget.",
            "constructor.",
            "بتعيد تعريف build.",
            "build.",
            "Provider: [[context.watch]] بيقرا ويعمل rebuild.",
            "عمود.",
            "العيال.",
            "عدّاد Provider.",
            "Bloc: BlocBuilder بيعمل rebuild للجزء ده بس.",
            "الـ state هي اللستة.",
            "قفلة.",
            "زرار واحد بيضيف في الاتنين.",
            "callback.",
            "[[context.read]] في callbacks (نفس القاعدة في الاتنين).",
            "الـ Cubit.",
            "قفلة الـ callback.",
            "النص.",
            "قفلة الزرار.",
            "قفلة العيال.",
            "قفلة العمود.",
            "قفلة build.",
            "قفلة الـ class.",
            "البداية.",
            "runApp.",
            "providers فوق الشجرة.",
            "ChangeNotifierProvider بيعمل CartModel ويعمله dispose.",
            "BlocProvider بيعمل الـ Cubit ويقفله.",
            "الـ Cubit.",
            "التطبيق تحتهم.",
            "قفلة BlocProvider.",
            "قفلة MultiProvider.",
            "قفلة runApp.",
            "قفلة main."
          ],
          sol: R`بعد ضغطتين: [[Provider: 2]] و [[Bloc: 2]].

من غير [[notifyListeners()]]: عدّاد Provider بيفضل 0 (الـ list بتكبر جوه بس محدش اتبلّغ)، وعدّاد Bloc بيزيد عادي. وأول ما Bloc يعمل emit، ليه مش بيتحدث Provider؟ لأن BlocBuilder بيعمل rebuild لنفسه بس، مش للشاشة كلها.

ومع [[state.add(item); emit(state);]]: عدّاد Bloc بيفضل 0. الـ Cubit بيقارن الـ state الجديدة بالقديمة، ولقاهم نفس الـ object، فمعملش emit أصلًا. (والـ [[const []]] الأولية كمان هتضرب [[Unsupported operation: Cannot add to an unmodifiable list]] في أول add). وعدّاد Provider شغال. نفس الدرس بتاع Notifier في Riverpod: الـ state immutable.`
        }
      ]
    },
    {
      t: "التخزين والـ backend بتاعك",
      l: 2,
      n: "إعدادات صغيرة في shared_preferences، وبيانات كتير في SQLite، والتوكن في secure storage، والـ API اللي انت كاتبه بـ Express أو FastAPI",
      items: [
        {
          cmd: "shared_preferences",
          title: "تفتكر إعدادات المستخدم بعد ما يقفل التطبيق",
          desc: R`[[shared_preferences]] key-value بسيط بيتحفظ على الجهاز: الثيم، واللغة، وهل شاف شاشة التعريف. زي localStorage في المتصفح. بيخزّن [[String]] و [[int]] و [[double]] و [[bool]] و [[List<String>]] بس.

من نسخة 2.3 فيه ٣ APIs: [[SharedPreferences]] القديم (هيتعمله deprecate)، و [[SharedPreferencesAsync]] (كل حاجة async ومن غير cache)، و [[SharedPreferencesWithCache]] (قراية sync من cache). للكود الجديد استخدم واحد من الجداد.`,
          example: R`import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SettingsStore {
  final _prefs = SharedPreferencesAsync();

  Future<ThemeMode> loadTheme() async {
    final raw = await _prefs.getString('theme');
    return ThemeMode.values.asNameMap()[raw] ?? ThemeMode.system;
  }

  Future<void> saveTheme(ThemeMode mode) => _prefs.setString('theme', mode.name);

  Future<bool> seenOnboarding() async => await _prefs.getBool('onboarding_done') ?? false;

  Future<void> markOnboardingDone() => _prefs.setBool('onboarding_done', true);
}

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final store = SettingsStore();
  final theme = await store.loadTheme();
  runApp(MaterialApp(themeMode: theme, darkTheme: ThemeData.dark(), home: const Placeholder()));
}`,
          try: "اعمل شاشة فيها [[SegmentedButton<ThemeMode>]] (فاتح، غامق، النظام) بتنادي saveTheme وتغيّر الثيم فورًا. اقفل التطبيق خالص وافتحه: فاكر اختيارك؟ وبعدين امسح [[WidgetsFlutterBinding.ensureInitialized()]] وشغّل.",
          flag: "script",
          deep: {
            why: "المستخدم اختار الوضع الغامق، قفل التطبيق، فتحه لقاه فاتح. أو شاشة التعريف بتظهر كل مرة. الحاجات الصغيرة دي لازم تتحفظ، وقاعدة بيانات كاملة ليها كتير.",
            how: R`تحت الغطا: على Android الـ APIs الجديدة بتستخدم DataStore Preferences (الموصى بيه من Google)، والقديم SharedPreferences بتاع Android. على iOS [[NSUserDefaults]]. وعلى الويب localStorage. يعني بيانات عادية مش مشفّرة: أي حد معاه root أو backup للجهاز يقراها.

الفرق بين الـ APIs:
- [[SharedPreferencesAsync]]: كل قراية await، ودايمًا بتجيب آخر قيمة من التخزين الحقيقي. أبسط وأصح.
- [[SharedPreferencesWithCache]]: [[await SharedPreferencesWithCache.create(cacheOptions: SharedPreferencesWithCacheOptions(allowList: {'theme'}))]] مرة، وبعدين [[getString]] sync من الذاكرة. مفيد لو بتقرا كتير في build.
- [[SharedPreferences.getInstance()]]: القديم، هتلاقيه في كل الأمثلة القديمة، وليه نفس فكرة الـ cache.

خلي بالك: الـ APIs الجديدة على Android بتخزّن في مكان مختلف عن القديم، فلو بتغيّر API في تطبيق منشور لازم تنقل البيانات (الـ README بتاع الـ package فيه migration utility).

[[WidgetsFlutterBinding.ensureInitialized()]]: أي plugin بيكلم الـ native (shared_preferences، sqflite، secure storage) محتاج الـ binding يبقى جاهز. لو هتنادي حاجة زي دي في main قبل runApp، لازم السطر ده الأول.

[[ThemeMode.values.asNameMap()]] نفس فكرة enhanced enum: بنخزّن [[.name]] (نص ثابت) مش [[.index]]، ولو القيمة مش معروفة نرجع للافتراضي.

ومع Riverpod: اعمل provider للـ store، والثيم نفسه في Notifier بيحمّل من الـ store في build ويحفظ في method.`,
            when: "إعدادات وتفضيلات صغيرة: ثيم، لغة، آخر تاب مفتوح، «متعرضش ده تاني». مش لبيانات المستخدم الحقيقية (قواعد بيانات) ولا للتوكنز والباسوردات (secure storage).",
            mistakes: R`تخزّن التوكن أو الباسورد فيه: مش مشفّر. وتخزّن JSON كبير (لستة المنتجات كلها) كـ String: بطيء ومش معمول لكده. وتنسى ensureInitialized فيطلع error عن الـ binding. وتقرا بـ [[.index]] بتاع enum. وتستخدم الـ API القديم والجديد مع بعض فتلاقي القيم «اختفت» لأنهم بيخزّنوا في أماكن مختلفة على Android.`
          },
          lines: [
            "مكتبة Material (فيها ThemeMode).",
            "shared_preferences.",
            "class بيلف التخزين عشان باقي التطبيق ميعرفش التفاصيل.",
            "الـ API الجديد: كل حاجة async ومن غير cache.",
            "تحميل الثيم.",
            "النص المتخزّن أو null لو أول مرة.",
            "من النص للـ enum، ولو مش معروف: النظام.",
            "قفلة.",
            "حفظ: الاسم مش الـ index.",
            "هل شاف شاشة التعريف؟ لو مفيش قيمة يبقى لأ.",
            "علّم إنه شافها.",
            "قفلة الـ class.",
            "main بقت async.",
            "لازم قبل أي plugin قبل runApp.",
            "الـ store.",
            "حمّل الثيم قبل أول frame، فمفيش «وميض» بالثيم الغلط.",
            "شغّل بالثيم المحفوظ.",
            "قفلة main."
          ],
          sol: R`الشاشة: [[SegmentedButton<ThemeMode>]] بـ ٣ segments، و onSelectionChanged بينادي [[saveTheme]] ويحدّث متغير الثيم (في State فوق MaterialApp أو في Notifier). بعد القفل والفتح التطبيق بيفتح على الثيم اللي اخترته من أول frame، لأن main بيقراه قبل runApp.

من غير ensureInitialized: بيضرب قبل ما التطبيق يظهر برسالة إن الـ binding مش متعمله initialize ([[Binding has not yet been initialized]]) وبتقترح عليك تنادي [[WidgetsFlutterBinding.ensureInitialized()]].`,
          solCode: R`SegmentedButton<ThemeMode>(
  segments: const [
    ButtonSegment(value: ThemeMode.light, label: Text('فاتح')),
    ButtonSegment(value: ThemeMode.dark, label: Text('غامق')),
    ButtonSegment(value: ThemeMode.system, label: Text('النظام')),
  ],
  selected: {_theme},
  onSelectionChanged: (s) {
    setState(() => _theme = s.first);
    store.saveTheme(s.first);
  },
)`
        },
        {
          cmd: "sqflite",
          title: "قاعدة بيانات SQLite جوه الموبايل للبيانات الكتير",
          desc: R`لما البيانات تكبر وتحتاج بحث وترتيب (ملاحظات، رسايل offline، cache للمنتجات)، shared_preferences مش كفاية. [[sqflite]] بيدّيك SQLite حقيقي على Android و iOS: جداول، و SQL، و indexes. نفس الـ SQL اللي في «تاب SQL و Prisma».

[[openDatabase]] بيفتح الملف أو يعمله، و [[onCreate]] بيعمل الجداول أول مرة، و [[onUpgrade]] بيعدّل الجداول لما تزوّد [[version]]. وفيه دوال جاهزة: [[insert]] و [[query]] و [[update]] و [[delete]]، و [[rawQuery]] لو عايز SQL بإيدك.`,
          example: R`import 'package:path/path.dart' as p;
import 'package:sqflite/sqflite.dart';

class NotesDb {
  NotesDb._(this._db);
  final Database _db;

  static Future<NotesDb> open() async {
    final path = p.join(await getDatabasesPath(), 'notes.db');
    final db = await openDatabase(
      path,
      version: 2,
      onCreate: (db, version) async {
        await db.execute('CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, pinned INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)');
      },
      onUpgrade: (db, oldVersion, newVersion) async {
        if (oldVersion < 2) await db.execute('ALTER TABLE notes ADD COLUMN pinned INTEGER NOT NULL DEFAULT 0');
      },
    );
    return NotesDb._(db);
  }

  Future<int> add(String title) => _db.insert('notes', {'title': title, 'created_at': DateTime.now().toIso8601String()});

  Future<List<Map<String, Object?>>> search(String q) =>
      _db.query('notes', where: 'title LIKE ?', whereArgs: ['%$q%'], orderBy: 'pinned DESC, id DESC');

  Future<int> remove(int id) => _db.delete('notes', where: 'id = ?', whereArgs: [id]);
}`,
          try: "ضيف [[togglePin(int id)]] بـ [[update]]. وبعدين زوّد الـ version لـ 3 وضيف عمود [[body TEXT]] في onUpgrade (وفي onCreate كمان). جرّب على تطبيق فيه بيانات قديمة: البيانات فضلت؟ وبعدين جرّب تبني الـ where كده: [[where: \"title LIKE '%$q%'\"]] وابحث بـ [[' OR 1=1 --]].",
          flag: "script",
          deep: {
            why: "تطبيق ملاحظات أو قايمة مهام أو تطبيق لازم يشتغل من غير نت محتاج يخزّن مئات أو آلاف السجلات ويدوّر فيها ويرتّبها بسرعة. SQLite موجود جوه كل موبايل أصلًا، ومعمول بالظبط لكده.",
            how: R`[[getDatabasesPath()]] المكان الصح على كل نظام، و [[p.join]] من package path بيبني المسار. الملف بيفضل موجود لحد ما التطبيق يتمسح.

الـ migrations: الـ [[version]] رقم انت بتزوّده مع كل تغيير في الجداول. تطبيق جديد: onCreate بس (بالشكل الأحدث). تطبيق قديم عنده version 1: onUpgrade بيتنادى بـ oldVersion = 1، فبتطبّق التغييرات خطوة خطوة ([[if (oldVersion < 2)]] ثم [[if (oldVersion < 3)]]). لازم onCreate يبقى دايمًا بالشكل النهائي، و onUpgrade يوصّل أي نسخة قديمة لنفس الشكل. ودا نفس منطق migrations في Prisma بس بإيدك.

[[whereArgs]] و [[?]]: القيم بتتبعت منفصلة عن الـ SQL (parameterized)، فمفيش SQL injection. متبنيش الـ where بـ string interpolation أبدًا.

SQLite مفيهوش bool ولا datetime: bool بيبقى INTEGER (0 و 1)، والتاريخ TEXT بـ ISO 8601 (بيترتّب صح كنص) أو INTEGER millis.

النتايج [[List<Map<String, Object?>>]]، فبتحوّلها لموديل بـ fromMap زي fromJson.

[[transaction]] لو هتعمل كذا عملية لازم تنجح كلها أو متحصلش: [[await db.transaction((txn) async { ... })]]، وجواها استخدم [[txn]] مش [[db]]. و [[batch()]] لإدخال مئات الصفوف مرة واحدة أسرع بكتير من loop.

البديل: [[drift]] (كان اسمه moor) فوق SQLite: الجداول بتتعرّف بـ Dart، والـ queries type-safe بتتولّد بـ build_runner، و migrations بأدوات، و [[watch()]] بيرجّع Stream يتحدث لوحده لما الجدول يتغير. أحسن لمشروع كبير، و sqflite أبسط وأقرب لـ SQL اللي انت عارفه.

sqflite مش شغال على الويب ولا في [[flutter test]] العادي (محتاج الـ native). للاختبار على الكمبيوتر فيه [[sqflite_common_ffi]].`,
            when: "بيانات كتير أو ليها علاقات أو محتاجة بحث: وضع offline، و cache للمحتوى، وتطبيقات ملاحظات ومهام. لو كام إعداد: shared_preferences. ولو البيانات أصلًا على السيرفر ومش محتاج offline: متعملش نسخة محلية من غير سبب.",
            mistakes: R`SQL injection بـ interpolation في where. وتغيّر الجدول في onCreate وتنسى onUpgrade، فالناس اللي عندهم التطبيق يضربوا بـ [[no such column]] والتطبيقات الجديدة سليمة (فمتلاقيش الـ bug عندك). وتفتح الـ database مع كل عملية بدل مرة واحدة. وتنادي [[db]] جوه transaction بدل [[txn]] فيحصل deadlock.`
          },
          lines: [
            "بناء المسارات.",
            "sqflite.",
            "class بيلف الـ database.",
            "constructor private: الطريقة الوحيدة [[open()]].",
            "الاتصال.",
            "دالة static async بتفتح وترجّع object جاهز.",
            "مسار الملف في مكان قواعد البيانات بتاع النظام.",
            "افتح أو اعمل.",
            "المسار.",
            "رقم شكل الجداول الحالي.",
            "أول تسطيب: اعمل الجداول بآخر شكل.",
            "SQL عادي.",
            "قفلة.",
            "تطبيق قديم بـ version أقل: طبّق الفرق بس.",
            "من 1 لـ 2: ضيف العمود.",
            "قفلة.",
            "قفلة openDatabase.",
            "الـ object.",
            "قفلة open.",
            "insert بـ Map، وبيرجّع الـ id الجديد.",
            "بحث.",
            "[[?]] و whereArgs: القيمة منفصلة عن الـ SQL، فمفيش injection.",
            "مسح بالـ id.",
            "قفلة الـ class."
          ],
          sol: R`togglePin: [[rawUpdate('UPDATE notes SET pinned = 1 - pinned WHERE id = ?', [id])]] أو update بقيمة محسوبة. الـ migration لـ 3: [[if (oldVersion < 3) await db.execute('ALTER TABLE notes ADD COLUMN body TEXT');]] في onUpgrade، وتضيف [[body TEXT]] لجملة CREATE في onCreate. البيانات القديمة بتفضل، والعمود الجديد null فيها.

الـ injection: مع [[where: "title LIKE '%$q%'"]] والبحث [[' OR 1=1 --]]، الـ SQL بقى [[title LIKE '%' OR 1=1 --%']] فبيرجع كل الملاحظات. مع whereArgs بيدوّر على النص ده حرفيًا ومش بيلاقي حاجة. نفس درس SQL injection في «تاب الأمان».`,
          solCode: R`Future<int> togglePin(int id) =>
    _db.rawUpdate('UPDATE notes SET pinned = 1 - pinned WHERE id = ?', [id]);

// في open():
version: 3,
onCreate: (db, version) async {
  await db.execute('CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, body TEXT, pinned INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)');
},
onUpgrade: (db, oldVersion, newVersion) async {
  if (oldVersion < 2) await db.execute('ALTER TABLE notes ADD COLUMN pinned INTEGER NOT NULL DEFAULT 0');
  if (oldVersion < 3) await db.execute('ALTER TABLE notes ADD COLUMN body TEXT');
},`
        },
        {
          cmd: "flutter_secure_storage",
          title: "مكان آمن للتوكن بدل shared_preferences",
          desc: R`التوكن (JWT أو refresh token) هو مفتاح حساب المستخدم: لو اتسرق، أي حد يدخل بيه. [[flutter_secure_storage]] بيخزّنه في المكان الآمن بتاع النظام: [[Keychain]] على iOS، وعلى Android مشفّر بمفتاح في [[Android Keystore]] (مفتاح مبيطلعش من الـ hardware).

الاستخدام زي key-value عادي بس كله async: [[write]] و [[read]] و [[delete]] و [[deleteAll]]. والقيم String بس.`,
          example: R`import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class TokenStore {
  const TokenStore();
  static const _storage = FlutterSecureStorage();

  Future<void> save(String access, String refresh) async {
    await _storage.write(key: 'access_token', value: access);
    await _storage.write(key: 'refresh_token', value: refresh);
  }

  Future<String?> get access => _storage.read(key: 'access_token');

  Future<void> clear() => _storage.deleteAll();
}`,
          try: "في main قبل runApp اقرا التوكن ([[await const TokenStore().access]]) وحطه في الـ session بتاع درس redirect، فلو فيه توكن التطبيق يفتح على الرئيسية مباشرة. سجّل دخول، اقفل التطبيق خالص وافتحه. وبعدين امسح التطبيق من الموبايل وسطّبه تاني: التوكن لسه موجود؟",
          flag: "script",
          deep: {
            why: "shared_preferences ملف XML أو DataStore عادي في فولدر التطبيق: على موبايل عليه root، أو من backup، أو من malware بصلاحيات عالية، التوكن بيتقري كنص. الـ secure storage بيشفّر بمفاتيح محمية من الـ hardware، فحتى لو الملف اتسحب مش هيتفك.",
            how: R`على Android من نسخة 10 من الـ package: التشفير بقى RSA OAEP لتغليف المفتاح + AES-GCM للبيانات، والمفتاح في Android Keystore، والخيار القديم [[encryptedSharedPreferences]] (مبني على مكتبة Jetpack Security اللي اتعملها deprecate) بقى deprecated ونسخة 10 بتنقل بياناته. ونسخة 11 (الحالية) شالته خالص، ورفعت أقل Android مدعوم لـ 7.0 (minSdk 24). فلو جاي من نسخة أقدم من 10، عدّي على 10 الأول عشان البيانات تتنقل. وفيه [[AndroidOptions.biometric(...)]] لو عايز بصمة قبل القراية.

على iOS: Keychain. وخلي بالك إن Keychain بيفضل موجود حتى بعد ما التطبيق يتمسح (سلوك النظام)، عكس Android. فمستخدم مسح التطبيق وسطّبه تاني ممكن يلاقي نفسه عامل login. الحل الشائع: flag في shared_preferences اسمه [[first_run]]؛ لو مش موجود امسح الـ secure storage.

Android auto backup: البيانات المشفّرة ممكن تترجع من backup Google Drive على جهاز جديد، بس المفتاح مش هيترجع (في الـ Keystore)، فالقراية تفشل. الـ package بيعمل [[resetOnError]] (افتراضيًا true) فبيمسح بدل ما يضرب. أو استثني ملفاتها من الـ backup في AndroidManifest.

على الويب: شغال بس على HTTPS أو localhost، وفي الآخر مخزّن في المتصفح، فمش بنفس الأمان. التوكنز على الويب الأحسن تبقى httpOnly cookies (درس res.cookie في «تاب Backend بـ Node»).

async: كل قراية بتروح للـ native، فمتقراش في build. اقرا مرة في main أو في provider وخزّن في الذاكرة.

[[static const _storage = FlutterSecureStorage();]]: الـ class نفسه خفيف ومفيهوش state، فـ const عادي.`,
            when: "أي حاجة لو اتسرقت تدخل على حساب: access و refresh tokens، و API keys خاصة بالمستخدم، و PIN. والإعدادات العادية: shared_preferences.",
            mistakes: R`التوكن في shared_preferences. وتقرا من secure storage في كل request (بطيء): اقراه مرة وخزّنه في الذاكرة وحدّثه لما يتغير. وتنسى تمسحه في logout. وتفتكر إن مسح التطبيق على iOS بيمسحه. وتحط API key بتاع خدمة (Stripe secret، OpenAI) في التطبيق أصلًا، مشفّر أو لأ: أي حاجة في الـ APK ممكن تتطلع، الـ secrets دي مكانها السيرفر.`
          },
          lines: [
            "الـ package.",
            "class بيلف التخزين.",
            "const: مفيش state.",
            "instance واحد، و const لأنه خفيف.",
            "حفظ التوكنين بعد login.",
            "access token.",
            "refresh token.",
            "قفلة.",
            "قراية (null لو مفيش).",
            "logout: امسح الكل.",
            "قفلة."
          ],
          sol: R`في main: [[WidgetsFlutterBinding.ensureInitialized();]] ثم [[session.value = await const TokenStore().access;]] ثم runApp. لو فيه توكن، الـ redirect مش هيحوّل لـ login، والتطبيق يفتح على الرئيسية على طول.

بعد القفل والفتح: فاضل عامل login. وبعد المسح والتسطيب: على Android التوكن اتمسح (بيانات التطبيق اتمسحت)، وعلى iOS ممكن تلاقيه لسه موجود لأن الـ Keychain بيفضل. دا مش bug في كودك، دا سلوك iOS، وحله flag الـ first_run في shared_preferences.`,
          solCode: R`Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  session.value = await const TokenStore().access;
  runApp(MaterialApp.router(routerConfig: router));
}`
        },
        {
          cmd: "API client بالتوكن",
          title: "التطبيق يكلم الـ backend اللي كتبته بـ Express أو FastAPI",
          desc: R`دا الدرس اللي بيربط Flutter بباقي الموقع: الـ backend اللي عملته في «تاب Backend بـ Node» أو «تاب Python و FastAPI» فيه [[/auth/login]] بيرجّع توكن، وباقي الـ routes محمية بـ [[Authorization: Bearer <token>]]. التطبيق محتاج class واحد بيعمل login ويخزّن التوكن، ويحطه في كل طلب، ولو السيرفر رد 401 يمسح التوكن ويرجّع المستخدم لشاشة الدخول.

وعنوان السيرفر مش متكتب في الكود: [[String.fromEnvironment('API_URL')]] بيتحدد وقت الـ build بـ [[--dart-define]]. وعلى الـ emulator الـ localhost بتاع جهازك هو [[10.0.2.2]].`,
          example: R`import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

const apiUrl = String.fromEnvironment('API_URL', defaultValue: 'http://10.0.2.2:3000');

class UnauthorizedException implements Exception {}

class ApiClient {
  ApiClient({http.Client? client, this.onUnauthorized}) : _http = client ?? http.Client();
  final http.Client _http;
  final void Function()? onUnauthorized;
  final _storage = const FlutterSecureStorage();

  Future<void> login(String email, String password) async {
    final res = await _http.post(
      Uri.parse('$apiUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );
    if (res.statusCode != 200) throw UnauthorizedException();
    final {'token': String token} = jsonDecode(res.body) as Map<String, dynamic>;
    await _storage.write(key: 'token', value: token);
  }

  Future<dynamic> get(String path) async {
    final token = await _storage.read(key: 'token');
    final res = await _http.get(Uri.parse('$apiUrl$path'), headers: {
      'Accept': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    });
    if (res.statusCode == 401) {
      await _storage.delete(key: 'token');
      onUnauthorized?.call();
      throw UnauthorizedException();
    }
    if (res.statusCode >= 400) throw http.ClientException('HTTP $__{res.statusCode}', res.request?.url);
    return jsonDecode(res.body);
  }

  Future<void> logout() => _storage.delete(key: 'token');
}`,
          try: "شغّل الـ backend بتاعك (Express على 3000 أو [[fastapi dev]] على 8000) واتأكد إن [[/auth/login]] بيرجّع [[{\"token\": \"...\"}]]. شغّل التطبيق على الـ emulator بـ [[--dart-define=API_URL=http://10.0.2.2:3000]] واعمل login وهات بيانات route محمي. وبعدين جرّب على موبايل حقيقي على نفس الـ WiFi: إيه اللي لازم يتغير؟ وآخر حاجة: غيّر التوكن المتخزّن لقيمة غلط وشوف اللي بيحصل.",
          flag: "script",
          deep: {
            why: "من غير class واحد للـ API، كل شاشة بتكتب الـ headers والـ base URL وفحص 401 بنفسها، وأول ما التوكن ينتهي نص الشاشات تفضل تعرض «خطأ» والنص التاني يرجّع login. ودا الجزء اللي بيحوّل التطبيق من «demo» لتطبيق شغال مع الـ backend الحقيقي بتاعك.",
            how: R`عنوان السيرفر حسب المكان:
- Android emulator: [[10.0.2.2]] هو الـ localhost بتاع الكمبيوتر.
- iOS simulator: [[localhost]] شغال عادي.
- موبايل حقيقي: IP الكمبيوتر على الشبكة ([[ipconfig]] أو [[ip a]])، والسيرفر لازم يسمع على [[0.0.0.0]] مش 127.0.0.1 بس ([[app.listen(3000, '0.0.0.0')]] في Express، و [[fastapi dev --host 0.0.0.0]] أو [[uvicorn --host 0.0.0.0]])، والـ firewall يسمح.
- أو [[adb reverse tcp:3000 tcp:3000]] فالموبايل المتوصل USB يشوف localhost بتاع الكمبيوتر.
- الإنتاج: [[https://api.yourdomain.com]] من [[--dart-define-from-file=env/prod.json]] (درس dart-define في المستوى ٣).

HTTP من غير S: Android بيمنع cleartext في release (وفي debug التيمبليت بتاع Flutter بيسمح). للتطوير بس: [[android:usesCleartextTraffic="true"]] في manifest الـ debug. في الإنتاج HTTPS دايمًا.

CORS: مش موجود في الموبايل (دا قيد متصفح)، فالتطبيق على Android هيشتغل حتى لو السيرفر مش عامل CORS. بس نفس الكود على Flutter web هيتمنع لو الـ backend مش سامح بالـ origin (درس cors في «تاب Backend بـ Node» و «CORS و middleware» في «تاب Python و FastAPI»).

شكل الرد: المثال مستني [[{"token": "..."}]]. لو backend بتاعك بيرجّع [[access_token]] (زي OAuth2PasswordBearer في FastAPI)، عدّل الـ pattern. وخلي بالك: [[OAuth2PasswordRequestForm]] في FastAPI بياخد form-urlencoded بـ [[username]] مش JSON، فالـ body يبقى [[body: {'username': email, 'password': password}]] من غير jsonEncode.

الـ pattern [[final {'token': String token} = ...]]: لو الرد مفيهوش token نص، بيرمي StateError فورًا بدل ما يخزّن null.

401: التوكن انتهى أو اتلغى. بنمسحه ونبلّغ ([[onUnauthorized]]) فالـ session بتاع الـ router يبقى null، والـ redirect يودّي login من أي شاشة. لو عندك refresh token (درس access و refresh في «تاب Backend بـ Node»)، هنا بتحاول refresh مرة وتعيد الطلب قبل ما ترمي.

[[http.Client? client]] في الـ constructor: في الاختبارات بتبعت [[MockClient]] من [[package:http/testing.dart]] فتختبر فحص 401 من غير سيرفر.

وفي Riverpod: [[final apiProvider = Provider((ref) => ApiClient(onUnauthorized: () => ...));]] والـ repositories بتقراه.`,
            when: "أول ما التطبيق يكلم backend فيه auth. class واحد لكل الطلبات، وكل الـ repositories فوقه.",
            mistakes: R`[[localhost]] على الـ emulator. والسيرفر بيسمع على 127.0.0.1 فالموبايل الحقيقي مش شايفه. و HTTP في release فكل الطلبات تفشل بـ [[Cleartext HTTP traffic not permitted]]. والتوكن في shared_preferences. وتقرا التوكن من secure storage في كل طلب في تطبيق بيعمل طلبات كتير (هنا مقبول للتبسيط، بس الأحسن cache في الذاكرة). وتبعت JSON لـ endpoint مستني form (FastAPI OAuth2) فيرجع 422.`
          },
          lines: [
            "jsonEncode و jsonDecode.",
            "التخزين الآمن.",
            "http.",
            "العنوان من [[--dart-define]]، وافتراضيًا الكمبيوتر من الـ emulator.",
            "exception لما السيرفر يرفض التوكن.",
            "الـ client.",
            "http.Client ممكن يتبعت (للاختبارات)، و callback لما الـ session تنتهي.",
            "الاتصال.",
            "هيتنادى عند 401 (مثلًا [[session.value = null]]).",
            "التخزين.",
            "login.",
            "POST للـ backend.",
            "[[/auth/login]] في Express أو FastAPI.",
            "JSON.",
            "الإيميل والباسورد.",
            "قفلة.",
            "أي رد غير 200 يبقى بيانات غلط.",
            "pattern: الرد لازم فيه token نص، وإلا يرمي فورًا.",
            "خزّن التوكن.",
            "قفلة login.",
            "GET لأي route.",
            "هات التوكن.",
            "الطلب.",
            "JSON.",
            "التوكن في الهيدر لو موجود (collection if).",
            "قفلة الـ headers.",
            "التوكن اتلغى أو انتهى...",
            "...امسحه...",
            "...وبلّغ التطبيق (الـ router يرجّع login)...",
            "...وارمي عشان الشاشة تعرف.",
            "قفلة.",
            "أي خطأ تاني من السيرفر.",
            "الرد كـ Map أو List.",
            "قفلة get.",
            "logout.",
            "قفلة."
          ],
          sol: R`على الـ emulator مع [[API_URL=http://10.0.2.2:3000]] الـ login بيخزّن التوكن و [[get('/todos')]] بيرجّع البيانات. لو ظهر [[Connection refused]] يبقى السيرفر مش شغال أو البورت غلط. ولو ظهر 422 من FastAPI يبقى الـ endpoint مستني form مش JSON.

على موبايل حقيقي: [[API_URL]] يبقى IP الكمبيوتر (زي [[http://192.168.1.10:3000]])، والسيرفر لازم يسمع على [[0.0.0.0]]، والـ firewall يسمح بالبورت. أو [[adb reverse tcp:3000 tcp:3000]] وتسيب [[http://localhost:3000]].

توكن غلط: السيرفر بيرد 401، فالـ client بيمسح التوكن، وينادي onUnauthorized، ويرمي UnauthorizedException. لو onUnauthorized بيعمل [[session.value = null]]، الـ router بيرميك على login أوتوماتيك. الغلط الشائع إن التطبيق يعرض «خطأ» ويفضل في نفس الشاشة، لأن الـ 401 اتعامل كأي خطأ.`
        }
      ]
    },
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

لو ظهر [[No devices found]] يبقى الـ emulator مش شغال ([[flutter devices]]). وعلى Chrome لازم chromedriver شغال على بورت 4444 الأول، وإلا بيفشل.`,
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

الـ flavors على Android: [[productFlavors]] في build.gradle.kts، و [[applicationIdSuffix]] بيخلي الـ id مختلف. و [[resValue("string", "app_name", ...)]] مع [[android:label="@string/app_name"]] في AndroidManifest بيخلي الاسم مختلف. وأيقونات مختلفة: فولدر [[android/app/src/staging/res/]] بيغطّي على main. و Firebase: [[google-services.json]] في [[src/staging/]] و [[src/production/]].

[[appFlavor]] (من [[package:flutter/services.dart]]) بيرجّع اسم الـ flavor اللي اتبنى بيه، أو null. وتقدر تحط [[default-flavor: staging]] تحت [[flutter:]] في pubspec عشان متكتبش [[--flavor]] كل مرة.

على iOS الـ flavors محتاجة schemes و build configurations في Xcode، ودا شغل أكتر. كتير من الفرق بتكتفي بـ dart-define للعنوان، و flavors على Android بس.`,
            when: "dart-define من أول يوم لأي حاجة بتختلف بين البيئات. و flavors لما تحتاج نسختين متسطبين مع بعض، أو Firebase projects مختلفة، أو نسخة للـ QA باسم مختلف.",
            mistakes: R`تنادي [[String.fromEnvironment]] من غير const فترجع فاضية دايمًا. وتستنى hot reload يغيّر القيمة. وتحط secret key في dart-define وتفتكره مستخبي. وتعمل flavor على Android وتنسى إن [[flutter run]] من غير [[--flavor]] بقى يضرب لو مفيش default-flavor.`
          },
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
    },
    {
      t: "البناء والنشر",
      l: 3,
      n: "AAB موقّع بمفتاح الرفع، و Play Internal testing قبل أي حد، و iOS محتاج Mac وحساب Apple",
      items: [
        {
          cmd: "flutter build appbundle",
          title: "تبني الملف اللي بيترفع على Google Play",
          desc: R`Google Play بياخد Android App Bundle ([[.aab]]) مش APK. [[flutter build appbundle]] بيبني نسخة release (Dart متترجم AOT) لكل المعالجات في ملف واحد، و Play بيطلّع لكل موبايل APK على قده.

النسخة من [[version: 1.2.0+5]] في pubspec: قبل [[+]] الـ versionName اللي المستخدم بيشوفه، وبعدها الـ versionCode اللي لازم يزيد مع كل رفعة. وتقدر تغيّرهم من الأمر بـ [[--build-name]] و [[--build-number]].`,
          example: R`flutter clean
flutter pub get
flutter test
flutter build appbundle --release --dart-define-from-file=env/prod.json
flutter build appbundle --build-name=1.2.0 --build-number=5 --obfuscate --split-debug-info=build/symbols
ls -lh build/app/outputs/bundle/release/app-release.aab
flutter build apk --split-per-abi
flutter build appbundle --analyze-size --target-platform android-arm64`,
          try: "ابني appbundle و apk عادي، وقارن الأحجام ([[ls -lh]]). بعدين ابني بـ [[--obfuscate --split-debug-info=build/symbols]] واتفرّج على الفولدر ده فيه إيه. آخر حاجة: ارفع الـ versionCode لـ 5، وبعدين ابني بـ 4 وحاول ترفعه (أو سطّب الـ APK فوق التاني بـ [[adb install -r]]).",
          deep: {
            why: "الـ debug build كبير وبطيء ومعمول للتطوير. النسخة اللي بتروح للناس لازم تبقى release (أسرع وأصغر)، موقّعة، بنسخة أكبر من اللي قبلها، وبالإعدادات الصح للإنتاج. وأي غلطة هنا Play بيرفضها أو المستخدمين يتضرروا.",
            how: R`الناتج في [[build/app/outputs/bundle/release/app-release.aab]]. الـ AAB فيه كل حاجة (Dart مترجم لـ arm64 و armeabi-v7a و x86_64، وكل الصور بكل الكثافات)، و Play بيعمل split: موبايل arm64 بكثافة xxhdpi ياخد اللي يخصه بس. عشان كده الـ AAB أكبر من الـ APK اللي بيوصل فعلًا.

[[--obfuscate --split-debug-info=build/symbols]]: بيغيّر أسماء الـ classes والدوال في الكود المترجم لأسماء عشوائية (أصعب في الـ reverse engineering) وبيطلّع رموز الـ debug بره التطبيق (أصغر). بس الـ stack traces من المستخدمين هتبقى غير مقروءة إلا بـ [[flutter symbolize -i trace.txt -d build/symbols/app.android-arm64.symbols]]، فاحتفظ بفولدر symbols لكل release (وارفعه لـ Sentry أو Crashlytics). وخلي بالك: [[runtimeType.toString()]] و [[Enum.toString()]] بيرجّعوا أسماء متلخبطة، فمتعتمدش عليهم في منطق (استخدم [[.name]] في enum، دا مش بيتأثر).

[[flutter build apk --split-per-abi]]: APK لكل معالج، مفيد لو بتوزّع بره Play (موقعك، أو ترسله لحد).

[[--analyze-size]]: بيطلّع تقرير بحجم كل package وكل asset، وتفتحه في DevTools. لازم تحدد ABI واحد ومينفعش مع split-debug-info.

قبل الـ build: [[flutter clean]] لو غيّرت إعدادات Gradle أو flavors، و [[flutter test]] و [[flutter analyze]] (وفي CI). والتوقيع (الدرس الجاي) لازم يبقى متظبط، وإلا الـ release هيتوقّع بمفتاح debug (التيمبليت بيعمل كده عشان [[flutter run --release]] يشتغل) و Play هيرفضه.

الإعدادات اللي بيبص عليها Play: [[applicationId]] (مش com.example)، و [[targetSdk]] لازم يبقى حديث (Play بيرفع الحد الأدنى كل سنة، و Flutter الحالي بيحط 36 افتراضيًا من [[flutter.targetSdkVersion]])، و [[minSdk]] (الافتراضي 24).`,
            when: "كل release. وفي CI (GitHub Actions) مع كل tag، مع التوقيع من secrets (درس android.yml في «تاب Desktop و Mobile» بنفس الفكرة).",
            mistakes: R`ترفع نفس الـ versionCode مرتين فـ Play يرفض. وتنسى [[--dart-define-from-file]] فالنسخة تكلم سيرفر التجربة. و obfuscate من غير ما تحتفظ بالـ symbols فمتعرفش تقرا أي crash. وتبني وانت الـ release لسه بيتوقّع بمفتاح debug. وتحكم على حجم التطبيق من حجم الـ AAB.`
          },
          lines: [
            "امسح الـ build القديم (خصوصًا بعد تعديل Gradle).",
            "نزّل الـ packages.",
            "الاختبارات قبل أي release.",
            "AAB release بإعدادات الإنتاج.",
            "حدد النسخة من الأمر، واعمل obfuscate وطلّع الـ symbols بره.",
            "الملف اللي هيترفع.",
            "APK لكل معالج (للتوزيع بره Play).",
            "تقرير الحجم لـ arm64."
          ],
          sol: R`الـ AAB هيطلع أكبر من APK عادي لمعالج واحد، لأنه فيه كل المعالجات والكثافات. والمستخدم مش هينزّل الحجم ده: Play بيبعتله الجزء اللي يخصه بس.

فولدر [[build/symbols]] فيه ملفات زي [[app.android-arm64.symbols]] لكل معالج. دي اللي [[flutter symbolize]] محتاجها عشان يترجم stack trace جاي من مستخدم. لو ضاعت، أي crash في النسخة دي مش هتعرف تقراه.

versionCode 4 بعد 5: Play Console بيرفض الرفع لأن الرقم لازم يبقى أكبر من أي نسخة اترفعت قبل كده. ومع [[adb install -r]]: [[INSTALL_FAILED_VERSION_DOWNGRADE]].`
        },
        {
          cmd: "key.properties",
          title: "توقّع نسخة الـ release بمفتاح بتاعك من غير ما الباسورد يدخل Git",
          desc: R`كل تطبيق Android لازم يبقى موقّع، والتحديثات لازم تتوقّع بنفس المفتاح. مع Play App Signing: Google بيحتفظ بمفتاح التطبيق الحقيقي، وانت بتوقّع بـ «upload key» بتاعك بس. بتعمل الـ keystore بـ [[keytool]] (درس keytool في «تاب Desktop و Mobile»)، والباسوردات في ملف [[android/key.properties]] برا Git، و [[build.gradle.kts]] بيقراه.

والـ release في التيمبليت الافتراضي بيتوقّع بمفتاح debug، فلازم تغيّره للـ release config.`,
          example: R`// 1) keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
// 2) android/key.properties (وضيف السطر key.properties لـ android/.gitignore):
//    storePassword=...
//    keyPassword=...
//    keyAlias=upload
//    storeFile=/home/you/upload-keystore.jks
// 3) android/app/build.gradle.kts:
import java.io.FileInputStream
import java.util.Properties

val keystoreProperties = Properties()
val keystorePropertiesFile = rootProject.file("key.properties")
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(FileInputStream(keystorePropertiesFile))
}

android {
    signingConfigs {
        create("release") {
            keyAlias = keystoreProperties.getProperty("keyAlias")
            keyPassword = keystoreProperties.getProperty("keyPassword")
            storeFile = keystoreProperties.getProperty("storeFile")?.let { file(it) }
            storePassword = keystoreProperties.getProperty("storePassword")
        }
    }
    buildTypes {
        release {
            signingConfig = signingConfigs.getByName("release")
        }
    }
}`,
          try: "اعمل keystore تجربة والملف والتعديل، وابني [[flutter build appbundle]]. اتأكد من التوقيع بـ [[keytool -printcert -jarfile build/app/outputs/bundle/release/app-release.aab]] وقارن الـ SHA-256 بـ [[keytool -list -v -keystore ~/upload-keystore.jks]]. وبعدين غيّر اسم key.properties مؤقتًا وابني تاني: إيه اللي حصل؟",
          flag: "script",
          deep: {
            why: "لو التوقيع اتعمل بمفتاح debug، Play بيرفض. ولو الباسوردات مكتوبة في build.gradle.kts، أول push لـ GitHub وبقت مع أي حد. ولو المفتاح ضاع من غير Play App Signing، مش هتقدر تحدّث التطبيق تاني أبدًا. الترتيب ده بيحل التلاتة.",
            how: R`Play App Signing (إجباري للتطبيقات الجديدة من ٢٠٢١ مع AAB): أول رفعة بتختار «Google يولّد مفتاح التطبيق». Google بيوقّع الـ APKs اللي بتوصل للناس بمفتاح التطبيق، وانت بترفع موقّع بالـ upload key. لو الـ upload key ضاع أو اتسرّب، تطلب من Play Console reset له. عشان كده الـ SHA-1 أو SHA-256 اللي بتحطه في Firebase و Google Sign-In لازم يبقى بتاع مفتاح التطبيق من Play Console (App integrity)، مش الـ upload key بس، وإلا Google Sign-In يشتغل عندك ويقع عند المستخدمين.

[[rootProject.file("key.properties")]] يعني [[android/key.properties]]. و [[file(it)]] جوه [[android/app]] بيحل المسار نسبةً لـ [[android/app/]]، فالمسار المطلق أوضح. وعلى ويندوز الـ backslash لازم يتكتب مزدوج ([[C:\\Users\\you\\upload-keystore.jks]]).

[[if (keystorePropertiesFile.exists())]]: لو الملف مش موجود (زميلك أو CI) الـ debug يفضل شغال. بس release هيفشل برسالة عن signing config ناقص.

[[-storetype JKS]]: docs Flutter بتضيفه لـ Java 9+، لأن الافتراضي بقى PKCS12. الاتنين شغالين مع Gradle.

في CI: الـ keystore كـ base64 في secret، وتكتبه لملف في الـ workflow، وتعمل key.properties من secrets تانية. نفس فكرة درس android.yml في «تاب Desktop و Mobile».

وبعد ما تعدّل Gradle: [[flutter clean]] عشان الـ cache.`,
            when: "مرة قبل أول رفعة على Play، ومرة لكل جهاز أو CI بيبني release.",
            mistakes: R`تعمل commit لـ key.properties أو الـ jks (اعتبرهم اتسربوا واطلب reset للـ upload key). وتنسى تغيّر [[signingConfigs.getByName("debug")]] في release. ومفيش backup للـ keystore والباسورد. وتحط SHA بتاع الـ upload key بس في Firebase فـ Google Sign-In يقع في نسخة Play. وتكتب storeFile بمسار نسبي وتستغرب إنه مش لاقي الملف.`
          },
          lines: [
            "import لقراية الملف.",
            "Properties من Java.",
            "object فاضي.",
            "[[android/key.properties]].",
            "لو موجود...",
            "...اقراه.",
            "قفلة.",
            "الـ android block الموجود أصلًا (ضيف جواه).",
            "إعدادات التوقيع.",
            "config اسمه release.",
            "اسم المفتاح جوه الـ keystore.",
            "باسورد المفتاح.",
            "مسار الـ keystore (لو موجود).",
            "باسورد الـ keystore.",
            "قفلة.",
            "قفلة.",
            "نوع الـ build.",
            "release...",
            "...يتوقّع بالـ config ده بدل debug.",
            "قفلة.",
            "قفلة.",
            "قفلة android."
          ],
          sol: R`[[keytool -printcert -jarfile ...aab]] بيطبع الشهادة، و SHA-256 بتاعها لازم يطابق اللي في [[keytool -list -v]]. لو طابق SHA بتاع [[~/.android/debug.keystore]] يبقى لسه بيتوقّع بـ debug (نسيت تغيّر buildTypes).

من غير key.properties: الـ release build بيفشل في مرحلة التوقيع (Gradle بيقول إن الـ signing config مش كامل، زي إن storeFile مش متحدد). و debug بيشتغل عادي بفضل [[exists()]]. دا السلوك اللي عايزه: محدش يبني release بالغلط من غير المفتاح.

(ملحوظة: الدرس ده متكتب من docs Flutter الرسمية لـ Kotlin DSL. الـ build الحقيقي محتاج Android SDK على جهازك.)`
        },
        {
          cmd: "Play internal testing",
          title: "ترفع أول نسخة وتجرّبها على موبايلات حقيقية قبل الإنتاج",
          desc: R`Play Console فيه tracks: [[Internal testing]] (لحد ١٠٠ tester بالإيميل، وبتوصل في دقايق، ومن غير review كامل تقريبًا)، و [[Closed testing]]، و [[Open testing]]، و [[Production]]. أول رفعة دايمًا على internal: تتأكد إن الـ AAB اتقبل والتوقيع سليم والتطبيق بيشتغل من Play نفسه.

وقبل الرفع تجرّب الـ AAB محليًا بـ [[bundletool]]: بيطلّع منه APKs زي ما Play هيعمل ويسطّبها على الموبايل المتوصل.`,
          example: R`# جرّب الـ AAB محليًا قبل الرفع (bundletool من github.com/google/bundletool/releases)
java -jar bundletool.jar build-apks --bundle=build/app/outputs/bundle/release/app-release.aab --output=app.apks --ks=$HOME/upload-keystore.jks --ks-key-alias=upload
java -jar bundletool.jar install-apks --apks=app.apks
java -jar bundletool.jar get-size total --apks=app.apks
# Play Console: Create app ← Testing ← Internal testing ← Create new release ← ارفع app-release.aab
# Testers: قايمة إيميلات ← انسخ «opt-in link» وابعته ← كل tester يفتحه ويوافق ← يسطّب من Play`,
          try: "ابني الـ AAB وجرّبه بـ bundletool على موبايلك. بعدين (لو عندك حساب Play Console) ارفعه على Internal testing، وضيف إيميلك كـ tester، وسطّب من اللينك. لو مفيش حساب، اقرا قايمة «App content» في Play Console (Privacy policy و Data safety و Content rating و Target audience) واكتب إجاباتك لتطبيقك.",
          deep: {
            why: "أول رفعة على Play فيها حاجات كتير ممكن تقع: التوقيع، و targetSdk، والصلاحيات، و Data safety. لو عملتها على Production مباشرة، أي غلطة تبقى قدام كل الناس أو تتعطل في review أيام. الـ internal track بيخليك تكتشف ده وتجرّب النسخة زي ما هتوصل بالظبط، من غير review طويل.",
            how: R`الحساب: Google Play Console بـ رسوم تسجيل مرة واحدة (٢٥ دولار وقت كتابة الدرس)، وتأكيد هوية. الحسابات الشخصية الجديدة عليها شرط قبل الإنتاج: closed test مع عدد testers (كان ٢٠ واتخفض لـ ١٢) لمدة ١٤ يوم متواصلين. راجع الشروط الحالية في Play Console لأنها بتتغير.

قبل أي release، Play بيطلب تملا «App content»: رابط Privacy policy (صفحة على موقعك)، و Data safety (بتجمع إيه وبتبعته فين، بما فيها اللي الـ packages بتجمعه زي Firebase Analytics و Sentry)، و Content rating (استبيان)، و Target audience، و Ads. ولو التطبيق فيه login، لازم تدّي Google حساب تجربة للـ review، وطريقة لحذف الحساب من جوه التطبيق ومن صفحة ويب.

الـ tracks: internal للفريق (سريع جدًا)، و closed لمجموعة أكبر، و open لأي حد يشترك، و production. وتقدر تعمل promote لنفس النسخة من track للي بعده من غير رفع جديد. والإنتاج ممكن staged rollout (٥٪ ثم ٢٠٪ ...) وتوقفه لو ظهرت crashes.

bundletool: [[build-apks]] بيعمل نفس الـ split اللي Play بيعمله (لازم توقّع بـ [[--ks]] عشان يتسطّب)، و [[install-apks]] بيسطّب الـ splits المناسبة لموبايلك. ودا أقرب حاجة لتسطيب من Play من غير Play.

الـ testers بيسطّبوا من Play Store عادي بعد ما يوافقوا من اللينك، والتحديثات بتوصلهم أوتوماتيك.

والرفع الأوتوماتيك من CI: [[fastlane supply]] أو actions جاهزة بـ service account من Google Cloud، بعد أول رفعة يدوية (أول نسخة لازم يدوي).`,
            when: "أول مرة وأي نسخة جديدة: internal الأول، وبعد ما الفريق يجرّب، promote لـ closed أو production.",
            mistakes: R`ترفع على Production مباشرة. وتنسى Data safety فالـ review يترفض بسبب SDK بيجمع بيانات مش مذكورة. ومفيش حساب تجربة للـ reviewer والتطبيق كله ورا login. وتضيف testers ومحدش يفتح الـ opt-in link فمش شايفين التطبيق في Play. وتفتكر إن internal testing بيعدّي شرط الـ ١٤ يوم: الشرط على closed testing.`
          },
          lines: [
            "حوّل الـ AAB لـ APKs موقّعة زي ما Play هيعمل.",
            "سطّبها على الموبايل المتوصل (زي adb).",
            "الحجم اللي هيتنزّل فعلًا."
          ],
          sol: R`bundletool بيعمل [[app.apks]] (ملف zip فيه splits)، و [[install-apks]] بيسطّب التطبيق وهو شغال زي release بالظبط. و [[get-size total]] بيطبع MIN و MAX للتنزيل، وهتلاقيه أقل بكتير من حجم الـ AAB.

على Play: بعد الرفع على Internal testing، النسخة بتبقى جاهزة غالبًا في دقايق لساعات قليلة (أول مرة ممكن أطول)، والـ tester يفتح opt-in link ويسطّب من Play. لو [[You uploaded an APK or Android App Bundle that was signed in debug mode]] يبقى التوقيع لسه debug (الدرس اللي فات).

App content: تطبيق بيعمل login وبيبعت بيانات للـ backend بتاعك بيقول في Data safety إنه بيجمع الإيميل والاسم (Account management)، مشفّر أثناء النقل (HTTPS)، والمستخدم يقدر يطلب حذفها. الغلط الشائع إنك تقول «مش بجمع حاجة» وانت عامل Sentry أو Analytics.`
        },
        {
          cmd: "iOS",
          title: "إيه اللي محتاجه عشان التطبيق ينزل على iPhone",
          desc: R`iOS محتاج ٣ حاجات مش موجودة في Android: جهاز Mac فيه Xcode (مفيش build لـ iOS من ويندوز أو لينكس، إلا عن طريق CI فيه Mac)، و Apple Developer Program (اشتراك سنوي، ٩٩ دولار وقت كتابة الدرس)، وتوقيع بـ certificates و provisioning profiles (Xcode بيعملهم لوحده مع Automatically manage signing).

[[flutter build ipa]] بيبني الـ archive، والرفع لـ App Store Connect بـ Xcode أو تطبيق Transporter، وبعدين TestFlight للتجربة (زي internal testing) ثم review ثم App Store.`,
          example: R`# على Mac:
open ios/Runner.xcworkspace
flutter build ipa --release --dart-define-from-file=env/prod.json
ls build/ios/ipa/
open build/ios/archive/Runner.xcarchive
# أو ارفع الـ ipa بتطبيق Transporter. أو من Xcode: build/ios/archive/Runner.xcarchive في Xcode ← Distribute App ← App Store Connect
# ios/Runner/Info.plist: كل صلاحية محتاجة سبب مكتوب
#   NSCameraUsageDescription = "بنستخدم الكاميرا عشان تصوّر المنتج"`,
          try: "لو معاك Mac: افتح [[ios/Runner.xcworkspace]] في Xcode، واختار Team في Signing & Capabilities، وشغّل على simulator بـ [[flutter run]]. لو مفيش: اقرا [[ios/Runner/Info.plist]] في مشروعك واكتب قايمة الـ packages اللي عندك واللي محتاجة usage description (كاميرا، صور، موقع، إشعارات).",
          deep: {
            why: "لو هتعمل التطبيق للاتنين، لازم تعرف من الأول إن iOS محتاج Mac وحساب مدفوع ووقت review أطول، عشان متتفاجئش يوم الإطلاق. وحاجات زي usage descriptions وتسجيل الدخول بـ Apple ممكن توقّف الـ review لو مش عاملها.",
            how: R`Xcode لازم تفتح [[Runner.xcworkspace]] مش [[.xcodeproj]] (الـ workspace فيه الـ dependencies). الـ Bundle Identifier (زي applicationId) بيتحدد هنا وفي App Store Connect ولازم يتطابقوا.

الـ dependencies الـ native على iOS: تاريخيًا CocoaPods ([[pod install]] في فولدر ios، و Podfile). و Flutter بيتنقل لـ Swift Package Manager، وفي النسخ الحديثة ممكن تلاقيه مفعّل والـ plugins بتنزل بيه. لو build وقع برسالة عن pods، [[flutter clean]] ثم [[flutter pub get]] وجرّب تاني قبل ما تعدّل حاجة بإيدك.

[[flutter build ipa]] بيعمل [[build/ios/archive/Runner.xcarchive]] و (لو التوقيع سليم) [[.ipa]] في [[build/ios/ipa]]. وممكن [[--export-options-plist]] لطريقة التصدير.

Info.plist: أي API حساس (كاميرا، صور، موقع، مايك، contacts، tracking) لازم يبقى ليه مفتاح [[NS...UsageDescription]] بجملة بتشرح ليه. من غيرها التطبيق يضرب أول ما يطلب الصلاحية، و App Store بيرفض. الـ packages بتكتب في الـ README بتاعها المفاتيح المطلوبة.

TestFlight: بعد الرفع، النسخة بتظهر في App Store Connect بعد processing. التجربة الداخلية (فريقك في App Store Connect) من غير review، والخارجية (لحد ١٠ آلاف) محتاجة Beta review خفيف.

قواعد App Store اللي بتوقّف ناس كتير: لو فيه login بحسابات تانية (Google، Facebook) لازم تقدّم Sign in with Apple أو بديل بنفس الخصوصية حسب القواعد الحالية، ولازم حذف الحساب من جوه التطبيق، والمشتريات الرقمية جوه التطبيق لازم In-App Purchase (فيه استثناءات بتتغير حسب البلد)، و privacy manifest ([[PrivacyInfo.xcprivacy]]) للـ APIs الحساسة. راجع App Store Review Guidelines قبل ما تبني.

CI من غير Mac: Codemagic أو GitHub Actions على [[macos-latest]] بيبنوا ويرفعوا بـ App Store Connect API key.`,
            when: "من أول المشروع لو iOS في الخطة: اختار الـ packages اللي بتدعم iOS، واكتب usage descriptions، وخطط لـ Sign in with Apple. والرفع نفسه قبل الإطلاق بأسبوعين على الأقل عشان الـ review.",
            mistakes: R`تفتح [[.xcodeproj]] بدل workspace. وتنسى usage description فيضرب التطبيق على iPhone بس (و Android شغال عادي). وتستنى لآخر يوم عشان ترفع أول نسخة و review يطلب تعديلات. وتفتكر إن Flutter بيبني iOS من ويندوز.`
          },
          lines: [
            "افتح المشروع في Xcode (Team والتوقيع والـ Bundle ID).",
            "ابني archive و ipa للإنتاج.",
            "الناتج.",
            "افتح الـ archive في Xcode Organizer: Validate ثم Distribute للرفع."
          ],
          sol: R`على Mac: بعد اختيار الـ Team، Xcode بيعمل provisioning profile لوحده، و [[flutter run]] على الـ simulator بيشتغل (الـ simulator مش محتاج اشتراك مدفوع، الموبايل الحقيقي ممكن بحساب مجاني لمدة محدودة، والرفع محتاج الاشتراك).

قايمة usage descriptions: مثلًا [[image_picker]] محتاج [[NSCameraUsageDescription]] و [[NSPhotoLibraryUsageDescription]] (و [[NSMicrophoneUsageDescription]] لو هتصوّر فيديو)، و [[geolocator]] محتاج [[NSLocationWhenInUseUsageDescription]]. الجملة لازم تشرح الاستخدام الحقيقي بلغة المستخدم، مش «التطبيق محتاج الكاميرا».`
        }
      ]
    },
    {
      t: "الأداء",
      l: 3,
      n: "تقيس على موبايل حقيقي في profile mode، وتقلل الـ rebuilds بـ const وتقسيم الـ widgets، وتلاقي الـ jank في DevTools",
      items: [
        {
          cmd: "DevTools",
          title: "تعرف الشاشة بتقطّع ليه بدل ما تخمّن",
          desc: R`Flutter DevTools أداة في المتصفح بتتوصل بالتطبيق الشغال: Performance (كل frame أخد قد إيه وليه)، و Widget inspector (الشجرة وأحجام كل حاجة)، و CPU profiler، و Memory، و Network (كل الطلبات)، و Logging.

بتفتحها بـ [[v]] في ترمنال [[flutter run]]، أو من VS Code. والقياس الحقيقي للأداء يبقى في [[--profile]] على موبايل حقيقي، مش debug ومش emulator.`,
          example: R`flutter run --profile -d <device-id>
v        في ترمنال flutter run: افتح DevTools في المتصفح
P        شغّل/اقفل performance overlay (خطين: UI و raster)
w        اطبع شجرة الـ widgets (debugDumpApp)
t        اطبع شجرة الـ render objects
dart devtools`,
          try: "شغّل تطبيقك بـ [[--profile]] على موبايل حقيقي، وافتح DevTools ← Performance، واعمل scroll سريع في أطول لستة. دوّر على frames حمرا. اضغط على واحدة وشوف في Frame analysis أنهي thread اتأخر (UI ولا Raster). وبعدين فعّل «Track widget rebuilds» واعمل حاجة بسيطة (تدوس زرار) وشوف أنهي widgets اتبنت.",
          flag: "keys",
          deep: {
            why: "«التطبيق تقيل» مش معلومة تقدر تصلّحها. DevTools بيقولك إن frame رقم كذا أخد ٤٠ms، و٣٠ منهم في build بتاع ProductCard لأنه بيعمل parse للتاريخ ١٠٠ مرة. من غير قياس هتقضي يوم تعدّل حاجات مش هي المشكلة.",
            how: R`عشان ٦٠ frame في الثانية، كل frame عنده حوالي 16ms (و 8ms على شاشات 120Hz). Flutter بيشتغل على threadين أساسيين:
- UI thread: كود Dart بتاعك (build و layout). لو اتأخر: rebuilds كتير، أو شغل تقيل في build، أو parse JSON كبير على الـ main isolate.
- Raster thread: بيرسم على الـ GPU. لو اتأخر: effects تقيلة (blur، shadows كتير، [[saveLayer]] من Opacity على شجرة كبيرة، clip)، أو صور كبيرة أكبر من مكانها.

الـ performance overlay (P): عمودين، أي خط أحمر يعني frame فات الوقت، وتعرف من أنهي عمود مين المتأخر.

ليه profile مش debug: debug فيه JIT و assertions وأدوات، فممكن يبقى أبطأ عدة مرات. profile نفس release تقريبًا (AOT) بس سايب أدوات القياس. والـ emulator بيستخدم GPU الكمبيوتر فالأرقام ملهاش علاقة بموبايل رخيص.

Widget rebuild stats في Performance أو Flutter Inspector: بتعد كل widget اتبنى كام مرة. لو widget مبيتغيرش بيتبني مع كل frame، دا مكان const أو تقسيم (الدرس الجاي).

Memory: الـ leaks (controllers مش متقفلة، listeners) بتظهر كـ objects بتزيد ومش بتقل. و «Diff snapshots» بين قبل وبعد فتح وقفل شاشة.

Network tab: كل طلب http بالـ headers والـ body والوقت، مفيد جدًا مع الـ API client.

وفي الكود: [[debugPrintRebuildDirtyWidgets = true]] بيطبع كل rebuild في الـ console (debug بس)، و [[Timeline.startSync]] لو عايز تعلّم حتة كود بتاعك في الـ timeline.`,
            when: "لما تحس بتقطيع، وقبل كل release على أضعف موبايل عندك، ولما تلاقي البطارية أو الذاكرة بتزيد. ومش وانت بتكتب أول نسخة من الشاشة: الأول تشتغل، وبعدين تقيس.",
            mistakes: R`تقيس في debug أو على emulator وتحكم. وتعمل «تحسينات» (const في كل حتة، caching) من غير ما تقيس قبل وبعد. وتفتكر إن كل frame أحمر سببه build، وهو ممكن يبقى raster من shadow أو blur. وتسيب [[debugPrintRebuildDirtyWidgets]] شغال وتنسى.`
          },
          sol: R`في Performance، الـ frames الحمرا هي اللي عدّت الـ budget. لو العمود الأحمر UI: شوف الـ timeline (build و layout)، وغالبًا هتلاقي widget تقيل بيتبني كتير أو شغل حسابي في build. لو Raster: شوف لو فيه [[Opacity]] أو [[BackdropFilter]] أو [[ClipRRect]] أو shadows كتير في عناصر اللستة، أو صور بتتحمّل بحجمها الكامل.

Track widget rebuilds بعد ضغطة زرار: المفروض تلاقي الـ widget اللي فيه الـ state وعياله بس. لو لقيت الشاشة كلها (AppBar و header و كل اللستة) اتبنت، يبقى الـ setState أو الـ ref.watch في مكان عالي أوي، ودا الدرس الجاي.

الغلط الشائع: تعمل ده على emulator وتلاقي كله أخضر وتقول «التطبيق سريع».`
        },
        {
          cmd: "const و rebuilds",
          title: "تخلي الـ rebuild يلمس الجزء اللي اتغير بس",
          desc: R`لما [[setState]] يتنادى، الـ widget ده وكل اللي تحته بيتعمله build. لو الـ state في أول الشاشة، الشاشة كلها بتتبني مع كل ضغطة. ٣ أدوات بتحل ده: [[const]] (Flutter بيتخطى أي widget const لأنه نفس الـ object)، وتقسيم الشاشة لـ widgets صغيرة والـ state في أصغر واحدة محتاجاها، و builders صغيرة زي [[ValueListenableBuilder]] بتعيد بناء حتتها بس.

والـ [[child]] parameter في الـ builders: الجزء اللي مبيتغيرش بتبعته مرة ويتعاد استخدامه.`,
          example: R`int headerBuilds = 0;

class Header extends StatelessWidget {
  const Header({super.key});
  @override
  Widget build(BuildContext context) {
    headerBuilds++;
    return const Text('Shop');
  }
}

class _CounterPageState extends State<CounterPage> {
  int _count = 0;
  final _likes = ValueNotifier<int>(0);

  @override
  void dispose() {
    _likes.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Header(),
        Text('count $_count'),
        TextButton(onPressed: () => setState(() => _count++), child: const Text('inc')),
        ValueListenableBuilder<int>(
          valueListenable: _likes,
          builder: (context, likes, child) => Row(children: [child!, Text('$likes')]),
          child: const Icon(Icons.favorite),
        ),
        TextButton(onPressed: () => _likes.value++, child: const Text('like')),
      ],
    );
  }
}`,
          try: "اطبع [[headerBuilds]] بعد ٥ ضغطات على inc. وبعدين شيل [[const]] من قبل [[Header()]] وكرر. وبعدين ضيف [[debugPrint('page build')]] في build بتاع الصفحة، واضغط like ٥ مرات: كام مرة اتطبع؟",
          flag: "script",
          deep: {
            why: "معظم مشاكل الأداء في Flutter مش إن الـ build بطيء، إنه بيحصل لحاجات كتير ملهاش لازمة. شاشة فيها لستة ١٠٠ عنصر وعدّاد فوق: لو الـ setState على الشاشة كلها، كل ضغطة بتبني ١٠٠ عنصر. نقل الـ state لتحت أو const بيخلي التكلفة widget واحد.",
            how: R`ليه const بيشتغل: وقت الـ rebuild، الـ element بيقارن الـ widget الجديد بالقديم. لو هو نفس الـ object بالظبط ([[identical]])، Flutter مش بينادي build عليه ولا على اللي تحته. و [[const Header()]] بيرجّع نفس الـ object في كل مرة (canonicalized)، فالـ Header اتبنى مرة واحدة مهما الأب اتبنى. من غير const، كل build للأب بيعمل Header جديد، فيتعمله build.

الـ lints: [[prefer_const_constructors]] و [[prefer_const_literals_to_create_immutables]] في [[flutter_lints]] بيقولولك فين تحط const، و [[dart fix --apply]] بيحطها لوحده.

تقسيم الـ widgets: بدل [[Widget _buildHeader()]] (دالة بتتنادى مع كل build للأب)، اعمل [[class Header extends StatelessWidget]]: ليه element خاص، فيقدر يبقى const ويتخطى.

نقل الـ state لتحت: لو الـ counter بس هو اللي بيتغير، اعمل [[CounterText]] StatefulWidget صغير فيه الـ setState، والشاشة الكبيرة Stateless.

الـ builders الصغيرة: [[ValueListenableBuilder]] و [[ListenableBuilder]] و [[AnimatedBuilder]] و [[StreamBuilder]] و [[Consumer]] في Riverpod، كلهم بيعيدوا build للـ builder بتاعهم بس. و [[child]] بيتبني مرة بره ويتبعت جوه في كل مرة، فالأيقونة في المثال مش بتتبني مع كل like.

في Riverpod: [[ref.watch(p.select((s) => s.count))]] بدل الـ state كلها، و [[Consumer]] حوالين الحتة اللي محتاجاها بدل الشاشة كلها.

حاجات تانية بتفرق:
- الصور: [[Image.network(url, cacheWidth: 300)]] بيفك الصورة بالحجم اللي هيتعرض بدل ٤٠٠٠ بكسل.
- [[RepaintBoundary]] حوالين حاجة بتتحرك كتير (animation) عشان الرسم ميشملش اللي حواليها.
- [[Opacity]] على شجرة كبيرة مكلف، [[FadeTransition]] أو لون بـ alpha أخف.
- [[ListView.builder]] بدل children (درس ListView.builder).
- شغل تقيل بره build، و JSON كبير في [[Isolate.run]].`,
            when: "const دايمًا (الـ linter بيفكّرك). والتقسيم ونقل الـ state لما DevTools يوريك rebuilds كتير، أو في شاشات فيها animation أو input سريع (كتابة، slider).",
            mistakes: R`تحط الـ state في أعلى الشاشة عشان «أسهل». ودوال [[_buildX()]] بدل widgets. وتفتكر إن const على widget فيه متغير ممكن: لو أي حاجة جواه مش const، الـ compiler هيرفض. وتعمل كل حاجة ValueNotifier وتعقّد الكود عشان توفّر rebuild رخيص: build لـ Text عادي رخيص جدًا، اشتغل على اللي DevTools بيقول إنه مكلف.`
          },
          lines: [
            "عدّاد لعدد مرات بناء الـ Header (للتجربة بس).",
            "widget ثابت.",
            "const constructor.",
            "بتعيد تعريف build.",
            "build.",
            "زوّد العدّاد.",
            "النص.",
            "قفلة build.",
            "قفلة.",
            "State بتاع شاشة (CounterPage StatefulWidget عادي).",
            "state عادية بـ setState.",
            "state تانية في ValueNotifier: مش بتعيد بناء الشاشة.",
            "بتعيد تعريف dispose.",
            "dispose.",
            "الـ ValueNotifier لازم يتقفل.",
            "في الآخر.",
            "قفلة.",
            "بتعيد تعريف build.",
            "build الشاشة.",
            "عمود.",
            "العيال.",
            "[[const]]: نفس الـ object كل مرة، فـ Flutter بيتخطاه.",
            "بيتغير مع setState.",
            "setState: الشاشة كلها تعيد build (ماعدا اللي const).",
            "builder بيسمع للـ ValueNotifier بس.",
            "المصدر.",
            "بيتبني لوحده مع كل تغيير، و child جاهز.",
            "الجزء الثابت: اتعمل مرة ويتبعت للـ builder.",
            "قفلة الـ builder.",
            "تغيير القيمة: الـ builder بس اللي يتبني، مش الشاشة.",
            "قفلة العيال.",
            "قفلة العمود.",
            "قفلة build.",
            "قفلة الـ State."
          ],
          sol: R`بـ const: [[headerBuilds]] بيفضل 1 بعد ٥ ضغطات على inc. الـ Header اتبنى مرة واحدة أول ما الشاشة ظهرت، وكل rebuild للأب لقى نفس الـ object فعدّاه. من غير const: 6 (مرة أول ما ظهرت + ٥ ضغطات).

page build مع like: بيتطبع مرة واحدة بس (أول build)، والضغطات الخمسة مطبعتش حاجة. الرقم اللي جنب القلب اتغير من غير ما الشاشة تتبني، لأن ValueListenableBuilder بيعيد بناء نفسه بس. ومع inc بيتطبع مع كل ضغطة.`
        }
      ]
    },
    {
      t: "أسئلة الانترفيو",
      l: 3,
      n: "الأسئلة اللي بتتسأل في كل انترفيو Flutter: التلات شجرات، ودورة حياة الـ widgets، والـ keys، و BuildContext، واختيار الـ state management",
      items: [
        {
          cmd: "widget و element و render",
          title: "ليه Flutter فيه ٣ شجرات مش واحدة",
          desc: R`أشهر سؤال: Flutter فيه ٣ شجرات. الـ [[Widget]] وصف immutable خفيف (config) بيتعمل ويترمي مع كل build. والـ [[Element]] هو الـ instance الحقيقي في مكان معين في الشجرة، عايش طول ما الـ widget في مكانه، وهو اللي بيمسك الـ State ويقرر يعيد استخدام إيه. والـ [[RenderObject]] هو اللي بيعمل layout ويرسم فعلًا، وتقيل فبيتعاد استخدامه قد ما يقدر.

و [[BuildContext]] اللي بتاخده في build هو نفسه الـ Element.`,
          example: R`import 'package:flutter/material.dart';

class Inspect extends StatelessWidget {
  const Inspect({super.key});

  @override
  Widget build(BuildContext context) {
    final element = context as Element;
    debugPrint('widget=$__{element.widget.runtimeType} element=$__{element.runtimeType} depth=$__{element.depth}');
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final box = context.findRenderObject() as RenderBox;
      debugPrint('render=$__{box.runtimeType} size=$__{box.size}');
    });
    return const Padding(padding: EdgeInsets.all(8), child: Text('hi'));
  }
}`,
          try: "حط [[Inspect]] في [[MaterialApp(home: Center(child: Inspect()))]] وشغّل. اقرا الـ depth: ليه رقم كبير كده وانت كاتب ٣ widgets بس؟ وبعدين اضغط [[w]] ثم [[t]] في ترمنال flutter run وقارن طول الشجرتين.",
          flag: "script",
          deep: {
            why: "السؤال ده بيفرز اللي بيحفظ widgets من اللي فاهم Flutter بيشتغل إزاي. ومنه بتفهم حاجات عملية: ليه const بيوفّر، وليه الـ State بيفضل موجود مع إن الـ widget اتعمل من جديد، وليه الـ keys مهمة، وليه build ممكن يتنادى ٦٠ مرة في الثانية ومفيش مشكلة.",
            how: R`الرحلة: [[build()]] بترجّع widgets جديدة. الـ Element بيقارن كل widget جديد بالقديم اللي في نفس المكان بـ [[Widget.canUpdate]]: لو نفس الـ runtimeType ونفس الـ key، الـ element بيفضل زي ما هو، وبياخد الـ widget الجديد كـ config ([[update]])، ويبلّغ الـ RenderObject بالقيم الجديدة (زي padding اتغير). لو النوع أو الـ key مختلف، الـ element القديم (والـ State والـ RenderObject بتوعه) بيتشال ويتعمل جديد.

عشان كده:
- الـ widgets رخيصة (objects صغيرة immutable)، وبيتعملوا ويترموا عادي.
- الـ State بيعيش في الـ Element مش في الـ widget، فبيفضل بعد الـ rebuild.
- الـ RenderObject (layout و paint) هو المكلف، والنظام كله معمول عشان يتعاد استخدامه.
- لو الـ widget الجديد هو نفس الـ object القديم ([[identical]]، زي const)، الـ element بيتخطاه خالص.

أنواع الـ elements: [[StatelessElement]] و [[StatefulElement]] (للـ widgets اللي بتجمّع)، و [[RenderObjectElement]] (للي بيرسموا زي Padding و RichText). مش كل widget ليه RenderObject: Text و Container و StatelessWidget بتاعك بيرجّعوا widgets تانية، والـ render tree أقصر من الـ widget tree بكتير.

[[findRenderObject()]] من context بتاع StatelessWidget بيرجّع أقرب RenderObject تحته (هنا RenderPadding)، وبعد الـ layout بس ([[addPostFrameCallback]]) عشان الـ size تبقى معروفة.

والشجرة الرابعة لو اتسألت: الـ Layer tree اللي بيروح للـ raster thread و Impeller.

المقارنة بـ React: Widget زي React element (وصف)، و Element زي الـ fiber (الـ instance والـ state)، و RenderObject زي الـ DOM node.`,
            when: "في الانترفيو، وكل ما تحتاج تفهم ليه حاجة اتعملها rebuild أو ليه state ضاعت أو اتنقلت.",
            mistakes: R`تقول «الـ widget هو اللي بيترسم على الشاشة». وتقول إن setState «بيعيد رسم الشاشة كلها»: بيعلّم الـ element dirty، والـ build بيحصل للـ subtree ده بس، والـ RenderObjects بتتحدث مش بتتعمل من جديد. وتنسى إن BuildContext هو الـ Element، فمتعرفش تشرح ليه [[Scaffold.of(context)]] بيفشل (درس BuildContext).`
          },
          lines: [
            "مكتبة Material.",
            "widget عادي.",
            "constructor.",
            "بتعيد تعريف build.",
            "build.",
            "BuildContext هو الـ Element نفسه، فالـ cast بيشتغل.",
            "نوع الـ widget، ونوع الـ element (StatelessElement)، وعمقه في الشجرة.",
            "بعد ما الـ frame يترسم (الـ layout خلص)...",
            "...أقرب RenderObject تحت الـ element ده.",
            "RenderPadding وحجمه الحقيقي.",
            "قفلة الـ callback.",
            "Padding ليه RenderObject، و Text جواه RichText ليه واحد.",
            "قفلة build.",
            "قفلة."
          ],
          sol: R`هتلاقي [[widget=Inspect element=StatelessElement depth=...]] برقم فوق ١٠٠، ثم [[render=RenderPadding size=Size(...)]]. الـ depth كبير لأن MaterialApp لوحده بيحط عشرات الـ widgets فوقك (Theme و MediaQuery و Navigator و Overlay و Localizations و ScrollConfiguration وغيرهم)، وكل واحد element.

[[w]] (debugDumpApp) بيطبع الـ widget tree وهي طويلة جدًا، و [[t]] (debugDumpRenderTree) أقصر بكتير، لأن widgets كتير (StatelessWidget بتاعك، و Container، و Text نفسه) مالهاش RenderObject خاص، بتجمّع widgets تانية بس. دي بالظبط الإجابة: ٣ شجرات لأن كل واحدة ليها دور، واللي بيتعمل كل frame هو الأرخص.`
        },
        {
          cmd: "lifecycle",
          title: "إيه اللي بيتنادى امتى في StatelessWidget و StatefulWidget",
          desc: R`StatelessWidget ليه [[build]] بس، بتتنادى لما يدخل الشجرة ولما الأب يبعت widget جديد ولما inherited widget معتمد عليه يتغير. StatefulWidget ليه دورة كاملة في الـ State: [[createState]] ثم [[initState]] ثم [[didChangeDependencies]] ثم [[build]]، ومع كل widget جديد من الأب [[didUpdateWidget]] ثم build، وفي الآخر [[deactivate]] و [[dispose]].

وفيه دورة تانية للتطبيق كله: foreground و background و detached، وبتسمع لها بـ [[AppLifecycleListener]].`,
          example: R`class _ProbeState extends State<Probe> {
  late final AppLifecycleListener _app;

  @override
  void initState() {
    super.initState();
    debugPrint('initState');
    _app = AppLifecycleListener(onStateChange: (s) => debugPrint('app: $__{s.name}'));
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    debugPrint('didChangeDependencies');
  }

  @override
  void didUpdateWidget(Probe oldWidget) {
    super.didUpdateWidget(oldWidget);
    debugPrint('didUpdateWidget $__{oldWidget.label} -> $__{widget.label}');
  }

  @override
  void dispose() {
    _app.dispose();
    debugPrint('dispose');
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    debugPrint('build $__{widget.label}');
    return Text(widget.label);
  }
}`,
          try: "اعمل [[Probe]] StatefulWidget فيه [[final String label]]. في الأب اعرضه بـ label بيتغير مع زرار، وبعدين بـ [[key: ValueKey(label)]]، وبعدين شيله من الشجرة. اكتب ترتيب الرسايل في كل حالة. وآخر حاجة: اقفل التطبيق للـ background وارجع، وشوف رسايل app.",
          flag: "script",
          deep: {
            why: "أسئلة زي «فين تعمل طلب الـ API؟» و«فين تقفل الـ controller؟» و«ليه الـ state متحدثتش لما الأب بعت id جديد؟» كلها إجابتها في الترتيب ده. والانترفيوهات بتسأله مباشرة، وبتسأل عن الفرق بين الاتنين.",
            how: R`الترتيب بالتفصيل:
- [[createState]]: مرة واحدة لما الـ element يتعمل. متحطش فيها منطق (الـ lint [[no_logic_in_create_state]]).
- [[initState]]: مرة. controllers و subscriptions وبداية التحميل. [[context]] موجود بس متعملش [[Theme.of]] أو [[MediaQuery.of]] هنا.
- [[didChangeDependencies]]: بعد initState مباشرة، وكل ما InheritedWidget عملت عليه [[.of(context)]] يتغير (الثيم، اللغة، حجم الشاشة). المكان الصح لحاجة بتعتمد على inherited وتتعمل مرة لكل تغيير.
- [[build]]: كتير.
- [[didUpdateWidget(old)]]: الأب عمل rebuild وبعت widget جديد من نفس النوع والـ key. الـ State نفسه فاضل، و [[widget]] بقى الجديد. هنا تقارن: [[if (old.userId != widget.userId) _load();]]. من غيرها، الشاشة هتفضل تعرض بيانات المستخدم القديم.
- [[deactivate]]: اتشال من مكانه (ممكن يرجع في نفس الـ frame لو اتنقل بـ GlobalKey). نادرًا بتحتاجها.
- [[dispose]]: اتشال نهائيًا. اقفل كل حاجة. بعدها [[mounted]] false.
- [[reassemble]]: مع hot reload بس (debug).

الـ key بيغيّر كل ده: لو الـ key اتغير، مفيش didUpdateWidget، فيه dispose للقديم و createState و initState للجديد. ودي طريقة مشروعة لـ «reset» الـ state: [[key: ValueKey(userId)]].

StatelessWidget: build بس. مفيش state تعيش بين الـ builds، وأي بيانات جاية من الـ constructor أو من inherited widgets أو providers.

دورة التطبيق ([[AppLifecycleState]]): [[resumed]] (قدام المستخدم)، و [[inactive]] (مكالمة جاية، الـ app switcher)، و [[hidden]]، و [[paused]] (في الخلفية)، و [[detached]]. [[AppLifecycleListener]] (من Flutter 3.13) أبسط من [[WidgetsBindingObserver]] القديم، وليه callbacks زي [[onResume]] و [[onPause]]. استخدامات: توقف فيديو في paused، وتعيد تحميل البيانات أو تتأكد من التوكن في resumed. ولازم dispose.`,
            when: "كل StatefulWidget بتكتبه. و didUpdateWidget بالذات في أي widget بياخد id أو config من الأب وبيحمّل حاجة على أساسه.",
            mistakes: R`تحمّل البيانات في build. وتنسى didUpdateWidget فالشاشة تعرض بيانات id قديم. و [[initState]] async. و [[super.dispose()]] في الأول بدل الآخر. وفي الانترفيو: «الفرق بين Stateless و Stateful؟» الإجابة الناقصة «واحد بيتغير وواحد لأ»، والصح: الاتنين immutable كـ widgets، والـ Stateful بيعمل State object عايش في الـ element بيحتفظ بالقيم بين الـ builds وليه lifecycle.`
          },
          lines: [
            "الـ State بتاع widget اسمه Probe.",
            "listener لحالة التطبيق.",
            "بتعيد تعريف initState.",
            "مرة واحدة.",
            "الأول.",
            "رسالة.",
            "اسمع لتغييرات التطبيق (background و foreground).",
            "قفلة.",
            "بتعيد تعريف didChangeDependencies.",
            "بعد initState ومع تغيير أي inherited widget.",
            "الأول.",
            "رسالة.",
            "قفلة.",
            "بتعيد تعريف didUpdateWidget.",
            "الأب بعت widget جديد من نفس النوع والـ key.",
            "الأول.",
            "القديم والجديد.",
            "قفلة.",
            "بتعيد تعريف dispose.",
            "dispose.",
            "اقفل الـ listener.",
            "رسالة.",
            "في الآخر.",
            "قفلة.",
            "بتعيد تعريف build.",
            "build.",
            "رسالة.",
            "النص.",
            "قفلة.",
            "قفلة الـ State."
          ],
          sol: R`أول ظهور: [[initState]] ثم [[didChangeDependencies]] ثم [[build a]]. تغيير الـ label من غير key: [[didUpdateWidget a -> b]] ثم [[build b]]: نفس الـ State. ولو الأب عمل rebuild بنفس القيمة، برضه didUpdateWidget و build (إلا لو الـ widget const ونفس الـ object).

مع [[key: ValueKey(label)]] وتغيير الـ label: [[initState]] و [[didChangeDependencies]] و [[build c]] للجديد، و [[dispose]] للقديم. الـ State اتعمل من جديد لأن الـ key اختلف. ولما تشيله: [[dispose]].

الـ background: [[app: inactive]] ثم [[app: hidden]] ثم [[app: paused]]، والرجوع بالعكس لحد [[app: resumed]] (الترتيب الدقيق بيختلف شوية بين Android و iOS).

(الترتيب ده اتأكد بـ widget test على Flutter 3.47.)`
        },
        {
          cmd: "ValueKey",
          title: "ليه الـ checkbox اتنقل لعنصر تاني لما رتّبت اللستة",
          desc: R`لما عناصر من نفس النوع تتحرك في لستة (ترتيب، مسح من النص، إضافة في الأول)، Flutter بيطابق القديم بالجديد بالمكان بس. فالـ State بتاع أول عنصر بيروح لأي widget بقى أول، حتى لو ده عنصر تاني. النتيجة: checkbox «متعلّم» بيتنقل لحاجة المستخدم معلّمهاش.

[[key: ValueKey(item.id)]] بيخلي المطابقة بالـ key، فالـ State بيمشي مع العنصر بتاعه. وفيه [[ObjectKey]] و [[UniqueKey]] و [[GlobalKey]] لحالات تانية.`,
          example: R`import 'package:flutter/material.dart';

class TaskTile extends StatefulWidget {
  const TaskTile({super.key, required this.title});
  final String title;
  @override
  State<TaskTile> createState() => _TaskTileState();
}

class _TaskTileState extends State<TaskTile> {
  bool _done = false;
  @override
  Widget build(BuildContext context) => CheckboxListTile(
        title: Text(widget.title),
        value: _done,
        onChanged: (v) => setState(() => _done = v!),
      );
}

class _TaskListState extends State<TaskList> {
  final _tasks = ['milk', 'bread', 'eggs'];

  @override
  Widget build(BuildContext context) => Column(
        children: [
          for (final t in _tasks) TaskTile(key: ValueKey(t), title: t),
          TextButton(
            onPressed: () => setState(() => _tasks.insert(0, _tasks.removeLast())),
            child: const Text('rotate'),
          ),
        ],
      );
}`,
          try: "علّم milk، ودوس rotate: العلامة فضلت على milk؟ شيل [[key: ValueKey(t)]] وكرر: العلامة راحت فين؟ وبعدين جرّب [[key: UniqueKey()]]: إيه اللي بيحصل للعلامات مع كل rotate؟",
          flag: "script",
          deep: {
            why: "دا bug بيوصل للإنتاج كتير: لستة مهام أو سلة فيها state محلي (checkbox، حقل كمية، animation)، والمستخدم يمسح عنصر فالقيم تتلخبط بين العناصر. وسؤال انترفيو مشهور جدًا: «امتى تستخدم keys؟».",
            how: R`[[Widget.canUpdate(old, new)]] بيرجّع true لو [[runtimeType]] و [[key]] متساويين. من غير keys، الاتنين null، فأي TaskTile يطابق أي TaskTile في نفس المكان. بعد rotate، أول TaskTile (بقى eggs) بياخد الـ element والـ State بتاع أول واحد قديم (milk)، فـ [[_done = true]] بتاعة milk بقت على eggs. الـ title اتغير لأنه جاي من الـ widget، والـ _done فضل لأنه في الـ State.

مع keys، الـ element بتاع الأب بيدوّر بين العيال بالـ key، فيلاقي element بتاع milk في المكان التاني ويحرّكه، والـ State يمشي معاه.

أنواع الـ keys:
- [[ValueKey(id)]]: قيمة فريدة وثابتة للعنصر. الأشهر. متستخدمش الـ index: بيتغير مع الترتيب ودا نفس المشكلة.
- [[ObjectKey(obj)]]: المطابقة بـ identity الـ object لو مفيش id.
- [[UniqueKey()]]: مختلف كل مرة بيتعمل، فلو اتعمل جوه build كل rebuild يعمل element جديد ويضيّع الـ state. مفيد بس لما تعوز تجبر reset.
- [[GlobalKey]]: فريد في التطبيق كله، بيوصلك للـ State من بره ([[_formKey.currentState!.validate()]])، وبيسمح بنقل widget لمكان تاني في الشجرة من غير ما يخسر الـ state. تقيل نسبيًا، فمتستخدمهوش كبديل لـ ValueKey.
- [[PageStorageKey]]: بيحفظ مكان الـ scroll لكل تاب.

الـ keys مهمة بس بين أخوات (عيال نفس الأب). ومش محتاجها لو العناصر Stateless ومفيهاش animations: الغلط في المطابقة مش هيبان لأن كل حاجة جاية من الـ widget.

واستخدام تاني: [[key: ValueKey(userId)]] على شاشة، عشان لما الـ id يتغير الـ State يتعمل من جديد بدل ما تكتب منطق reset في didUpdateWidget.`,
            when: "أي لستة عناصرها Stateful أو فيها animation وممكن تترتب أو يتمسح منها من النص: todo list، و ReorderableListView (الـ keys إجبارية فيه)، و AnimatedList، و Dismissible (إجباري برضه).",
            mistakes: R`[[ValueKey(index)]]: بيتغير مع الترتيب فمش بيحل حاجة. و [[UniqueKey()]] جوه build فكل rebuild بيمسح الـ state. والـ key على widget جوه العنصر بدل العنصر نفسه اللي هو ابن مباشر للـ Column أو اللستة. و GlobalKey في كل عنصر في لستة طويلة.`
          },
          lines: [
            "مكتبة Material.",
            "عنصر فيه state محلي.",
            "constructor بياخد key.",
            "العنوان من الـ widget.",
            "بتعيد تعريف createState.",
            "الـ State.",
            "قفلة.",
            "الـ State.",
            "الـ state المحلي: متعلّم ولا لأ.",
            "بتعيد تعريف build.",
            "checkbox بعنوان.",
            "العنوان من الـ widget (بيتغير مع الترتيب).",
            "القيمة من الـ State (بتفضل مع الـ element).",
            "التغيير.",
            "قفلة.",
            "قفلة.",
            "State بتاع اللستة (TaskList StatefulWidget عادي).",
            "العناصر.",
            "بتعيد تعريف build.",
            "عمود.",
            "العيال.",
            "[[ValueKey(t)]]: كل عنصر مربوط بقيمته، مش بمكانه.",
            "زرار.",
            "آخر عنصر يبقى أول.",
            "النص.",
            "قفلة الزرار.",
            "قفلة العيال.",
            "قفلة الـ Column.",
            "قفلة الـ State."
          ],
          sol: R`مع [[ValueKey(t)]]: علّمت milk ودوست rotate، الترتيب بقى eggs و milk و bread، والعلامة فضلت على milk.

من غير key: الترتيب اتغير بس العلامة راحت على eggs (بقى في المكان الأول)، و milk بقى مش متعلّم. الـ State بتاع المكان الأول فضل مكانه.

مع [[UniqueKey()]] (جوه build): كل rebuild بيعمل keys جديدة، فكل العناصر بتتعمل States جديدة، والعلامات بتتمسح كلها مع أي rotate. (اتأكد من التلات حالات بـ widget test.)`
        },
        {
          cmd: "BuildContext",
          title: "ليه Scaffold.of(context) بيقولك مفيش Scaffold وهو قدامك",
          desc: R`[[BuildContext]] هو مكان الـ widget في الشجرة (الـ Element). [[Theme.of(context)]] و [[Navigator.of(context)]] و [[Scaffold.of(context)]] بيدوّروا لـ فوق من المكان ده. فلو الـ context بتاع widget فوق الـ Scaffold (زي الـ context بتاع build اللي بيرجّع الـ Scaffold نفسه)، مفيش Scaffold فوقه.

الحل: [[Builder]] بيدّيك context جديد تحت الـ Scaffold، أو تقسّم لـ widget منفصل. وبعد أي [[await]]، الـ context ممكن يكون اتشال: اسأل [[context.mounted]] الأول.`,
          example: R`import 'package:flutter/material.dart';

class SaveScreen extends StatelessWidget {
  const SaveScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Drawer(child: Text('menu')),
      body: Builder(
        builder: (inner) => FilledButton(
          onPressed: () async {
            final messenger = ScaffoldMessenger.of(inner);
            await Future.delayed(const Duration(seconds: 1));
            if (!inner.mounted) return;
            Scaffold.of(inner).openDrawer();
            messenger.showSnackBar(const SnackBar(content: Text('Saved')));
          },
          child: const Text('Save'),
        ),
      ),
    );
  }
}`,
          try: "بدّل [[inner]] بـ [[context]] بتاع build في سطر [[Scaffold.of]] ودوس: الرسالة بتقول إيه؟ رجّعه. وبعدين اعمل الشاشة دي في route بـ push، ودوس Save وارجع فورًا قبل الثانية: الـ mounted عمل إيه؟ ولو شلته؟",
          flag: "script",
          deep: {
            why: "أخطاء الـ context من أكتر الحاجات اللي بتلخبط الناس في Flutter: «مفيش Scaffold»، «مفيش Provider»، «Navigator operation requested with a context that does not include a Navigator»، و «Looking up a deactivated widget's ancestor is unsafe» بعد await. كلهم نفس الفكرة: الـ context بيدوّر لفوق من مكانه، ومكانه ممكن يكون غلط أو اتشال.",
            how: R`[[X.of(context)]] بتعمل [[context.dependOnInheritedWidgetOfExactType]] أو [[findAncestorStateOfType]]: بتطلع من الـ element ده لفوق لحد ما تلاقي. الـ context بتاع build في SaveScreen هو element بتاع SaveScreen، والـ Scaffold ابن ليه، يعني تحت، فالبحث لفوق مش هيلاقيه. [[Builder]] بيعمل element جديد تحت الـ Scaffold، فالـ inner context يلاقيه.

الفرق بين dependOn و find: [[Theme.of]] و [[MediaQuery.of]] بيسجّلوا dependency، فلو الثيم اتغير الـ widget ده يعيد build. عشان كده متتنادوش في initState (مفيش build يتعاد). و [[MediaQuery.sizeOf(context)]] أحسن من [[MediaQuery.of(context).size]] لأنه بيعيد build لما الحجم يتغير بس مش لما الكيبورد تفتح.

بعد await: الشاشة ممكن تكون اتقفلت، والـ element اتعمله unmount. استخدام الـ context ساعتها بيضرب أو بيعمل حاجة على شاشة مش موجودة. [[context.mounted]] (أو [[mounted]] في State) قبل أي استخدام بعد await. والـ lint [[use_build_context_synchronously]] بيمسكها. والحيلة التانية في المثال: خد [[ScaffoldMessenger.of(inner)]] قبل الـ await، لأن الـ messenger فوق الـ route وبيفضل عايش حتى لو الشاشة اتقفلت.

الـ context مش object تخزّنه: متحطهوش في field أو في singleton عشان تستخدمه بعدين.

في Riverpod: [[ref]] بديل context للوصول للـ providers ومش معتمد على مكانك في الشجرة، فمفيش «ProviderNotFound». بس الـ context لسه لازم للـ Theme و Navigator و ScaffoldMessenger.`,
            when: "كل ما تنادي [[.of(context)]]، وكل callback فيه await. ولو لقيت نفسك محتاج Builder كتير، دي علامة إن الشاشة محتاجة تتقسم لـ widgets.",
            mistakes: R`[[Scaffold.of(context)]] بـ context فوق الـ Scaffold. واستخدام context بعد await من غير mounted. و [[Theme.of(context)]] في initState. وتخزين الـ context في متغير global. وفي الانترفيو: «إيه هو BuildContext؟» الإجابة: هو الـ Element، يعني مكان الـ widget في الشجرة، وكل الـ [[.of]] بتدوّر لفوق منه.`
          },
          lines: [
            "مكتبة Material.",
            "شاشة.",
            "constructor.",
            "بتعيد تعريف build.",
            "الـ context هنا بتاع SaveScreen، يعني فوق الـ Scaffold.",
            "الـ Scaffold ابن للـ context ده.",
            "drawer عشان نفتحه.",
            "[[Builder]]: element جديد تحت الـ Scaffold...",
            "...و [[inner]] هو الـ context بتاعه.",
            "async callback.",
            "خد الـ messenger قبل الـ await (بيعيش أطول من الشاشة).",
            "حاجة بطيئة (حفظ على السيرفر).",
            "الشاشة ممكن تكون اتقفلت: اقف.",
            "inner تحت الـ Scaffold، فـ Scaffold.of بيلاقيه.",
            "رسالة.",
            "قفلة الـ callback.",
            "النص.",
            "قفلة الزرار.",
            "قفلة Builder.",
            "قفلة Scaffold.",
            "قفلة build.",
            "قفلة."
          ],
          sol: R`بـ context بتاع build: [[Scaffold.of() called with a context that does not contain a Scaffold.]] (والرسالة نفسها بتقترح Builder أو تقسيم الـ widget). مع [[inner]]: بعد ثانية الـ drawer بيفتح و Saved بتظهر.

لو رجعت قبل الثانية: [[inner.mounted]] بقت false، فالكود وقف، ومفيش error. لو شلت السطر: [[Scaffold.of(inner)]] على element اتشال بيطلع error زي [[Looking up a deactivated widget's ancestor is unsafe]]، والـ SnackBar (لو كان قبله) كان هيظهر في الشاشة اللي رجعتلها، لأن الـ messenger متشارك.

الغلط الشائع: تحل الأولى بـ GlobalKey للـ Scaffold. شغال، بس Builder أو widget منفصل أبسط.`
        },
        {
          cmd: "state management",
          title: "setState ولا ValueNotifier ولا Riverpod ولا Bloc: تختار إزاي",
          desc: R`مفيش إجابة واحدة، والانترفيو بيدوّر على إنك تعرف الـ trade-offs. القاعدة: ابدأ بأبسط حاجة تكفي. [[setState]] لـ state جوه widget واحد. [[ValueNotifier]] مع [[ValueListenableBuilder]] (جوه Flutter نفسه، من غير packages) لقيمة صغيرة متشاركة. وبعدين Riverpod أو Bloc لما البيانات تبقى متشاركة بين شاشات، وجاية من API، ومحتاجة تتختبر.

المثال: نفس الفكرة (عدّاد السلة) بـ ValueNotifier بس، عشان تشوف إن Flutter فيه أدوات جاهزة قبل أي package.`,
          example: R`import 'package:flutter/material.dart';

final cartCount = ValueNotifier<int>(0);

class CartBadge extends StatelessWidget {
  const CartBadge({super.key});

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<int>(
      valueListenable: cartCount,
      builder: (context, count, _) => Badge(
        isLabelVisible: count > 0,
        label: Text('$count'),
        child: const Icon(Icons.shopping_cart),
      ),
    );
  }
}

class AddButton extends StatelessWidget {
  const AddButton({super.key});

  @override
  Widget build(BuildContext context) {
    return FilledButton(onPressed: () => cartCount.value++, child: const Text('Add'));
  }
}`,
          try: "حط CartBadge في AppBar و AddButton في body، وجرّب. وبعدين فكّر واكتب: لو السلة لازم تتحفظ على السيرفر، وتظهر loading وخطأ، وتتختبر بـ fake API، وتتمسح لما المستخدم يعمل logout، إيه اللي هيوجعك في الـ ValueNotifier الـ global ده؟ وإمتى تنقله لـ Riverpod؟",
          flag: "script",
          deep: {
            why: "«بتستخدم إيه في الـ state management؟» سؤال في كل انترفيو Flutter تقريبًا. الإجابة «Bloc لأنه الأحسن» بتبين إنك مش فاهم. الإجابة الكويسة بتفرّق بين أنواع الـ state وبتشرح امتى كل أداة تكفي وامتى تبقى تقيلة.",
            how: R`أنواع الـ state:
- ephemeral (محلية): التاب المختار، و checkbox، و animation، وحقل مفتوح. setState. محدش تاني محتاجها.
- app state (متشاركة): المستخدم الحالي، والسلة، والإعدادات، والبيانات من الـ API. محتاجة مكان بره الـ widgets.

الأدوات من الأبسط:
- [[setState]]: جوه widget. أبسط حاجة، ومفيش packages.
- رفع الـ state للأب وتمريرها كـ parameters و callbacks: كويس لمستويين تلاتة.
- [[ValueNotifier]] / [[ChangeNotifier]] + [[ValueListenableBuilder]] / [[ListenableBuilder]]: جوه Flutter. كويس لقيم قليلة. بس لو global زي المثال: صعب تعمله reset في logout، وصعب تبدّله في الاختبارات، ومفيش async state جاهزة.
- [[InheritedWidget]]: الأساس اللي Theme و MediaQuery و provider مبنيين عليه. نادرًا بتكتبه بإيدك.
- Provider: ChangeNotifier في الشجرة. بسيط، ومنتشر في المشاريع القديمة.
- Riverpod: providers بره الشجرة، و AsyncValue، و overrides للاختبار، و autoDispose و family. أقل boilerplate من Bloc، ومعظم المشاريع الجديدة بتختاره.
- Bloc: events و states صريحة، وكل تغيير متسجّل، وقواعد صارمة. مناسب لفرق كبيرة ومنطق معقد. كود أكتر.

إجابة انترفيو كويسة (مثال): «setState للـ state المحلية. للـ app state بستخدم Riverpod: الـ repositories providers فبعملهم override في الاختبارات، والبيانات من الـ API AsyncNotifier فالـ loading والـ error جاهزين، والـ state immutable. واشتغلت على Bloc/Provider في مشروع X، والفرق الأساسي إن Bloc بيفصل الأحداث عن الحالة، ودا مفيد لو محتاج audit لكل تغيير، بس الكود أطول.»

المعايير اللي تقارن بيها: قابلية الاختبار (تبدّل الاعتماديات)، والـ async (loading و error)، والـ boilerplate، ومنحنى التعلم للفريق، والـ rebuilds (select و Consumer)، والـ lifecycle (dispose لما محدش محتاج).`,
            when: "في الانترفيو، وأول أسبوع في أي مشروع جديد. ومتغيّرش الأداة في نص مشروع شغال من غير سبب قوي، الاتساق أهم من «الأحسن».",
            mistakes: R`تجيب Bloc أو Riverpod لتطبيق شاشتين. أو العكس: global ValueNotifiers وsingletons في تطبيق كبير فالاختبار والـ logout بيبقوا كابوس. وتخلط ٣ أدوات في مشروع واحد. وفي الانترفيو تقول «الأحسن» من غير trade-offs، أو تقول «setState وحش» (مش وحش، هو الصح للـ state المحلية).`
          },
          lines: [
            "مكتبة Material (فيها ValueNotifier و Badge).",
            "قيمة واحدة متشاركة: أي تغيير في value بيبلّغ.",
            "widget بيعرض.",
            "constructor.",
            "بتعيد تعريف build.",
            "build.",
            "builder بيعيد بناء نفسه بس لما القيمة تتغير.",
            "المصدر.",
            "القيمة الحالية.",
            "الـ badge يختفي لو صفر.",
            "الرقم.",
            "الأيقونة.",
            "قفلة الـ Badge.",
            "قفلة الـ builder.",
            "قفلة build.",
            "قفلة.",
            "widget تاني في مكان تاني.",
            "constructor.",
            "بتعيد تعريف build.",
            "build.",
            "بيغيّر القيمة مباشرة، والـ badge يتحدث لوحده.",
            "قفلة build.",
            "قفلة."
          ],
          sol: R`الـ badge بيظهر بعد أول Add وبيزيد مع كل ضغطة، من غير أي package ومن غير setState في الشاشة.

اللي هيوجعك لما السلة تكبر:
١. الـ async: محتاج loading و error، فهتعمل ValueNotifier تاني لكل واحد وتنسّق بينهم بإيدك. AsyncNotifier بيدّيهم جاهزين.
٢. الاختبار: الـ notifier global، فكل اختبار بيأثر على اللي بعده، ومفيش طريقة نضيفة تبدّل الـ API بـ fake. Riverpod بيعمل ProviderScope جديد لكل اختبار مع overrides.
٣. الـ logout: لازم تفتكر تصفّر كل global بإيدك. في Riverpod: [[ref.invalidate]] أو تعتمد السلة على provider المستخدم فتتصفّر لوحدها لما يتغير.
٤. الـ dispose: الـ global عايش للأبد.

فالانتقال لـ Riverpod (أو Bloc) منطقي أول ما البيانات تبقى جاية من السيرفر أو متشاركة بين شاشات كتير أو محتاجة اختبارات. لحد كده ValueNotifier كفاية.`
        }
      ]
    },
    // __NEXT__
  ]
});
