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
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("flutter", {
  label: "Flutter و Dart",
  prompt: "$ ",
  lab: R`flutter doctor
flutter create flutter_lab
cd flutter_lab && flutter run`,
  labText: "سطّب Flutter SDK و Android Studio، و flutter doctor يقولك إيه ناقص. دي تقنية مش مستخدمة في مشاريعك لسه، فابدأ من المستوى ١.",
  levels: {"1":["Dart والأساس","لغة Dart، و widgets، و layout، و hot reload"],"2":["تطبيق حقيقي","state، و navigation، و forms، و http و JSON، والتخزين"],"3":["النشر والانترفيو","البناء والتوقيع، و packages، والأداء، وأسئلة الانترفيو"]},
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
          ]
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
          ]
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
          ]
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
          }
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
          ]
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
            "لو قريته قبل ما يتحط كان هيضرب [[LateInitializationError]].",
            "قفلة."
          ]
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
            mistakes: R`تكتب [[() => { setState(...) }]] زي React فتتفاجئ بسلوك غريب أو warning: في Dart يا [[() => setState(...)]] يا [[() { setState(...); }]]. وتنسى إن named من غير required ومن غير default لازم تبقى [[?]]، فالـ compiler يزعّق. وتحط [[required]] على parameter ليه default، ملوش لازمة.`
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
        },
        {
          cmd: "async و await",
          title: "تستنى نتيجة بطيئة من غير ما الشاشة تهنج",
          desc: R`[[Future<T>]] هو Promise بتاع Dart: قيمة هتيجي بعدين (رد API، قراءة ملف). والدالة اللي فيها [[async]] بترجّع Future، وجواها [[await]] بيستنى من غير ما يوقّف التطبيق. والأخطاء بـ [[try]] و [[catch]] عادي.

Dart شغال على thread واحد (event loop زي JS)، فالـ await مش بيوقّف الرسم: الشاشة بتفضل ترد لحد ما النتيجة توصل.`,
          example: R`Future<String> fetchName(int id) async {
  await Future.delayed(const Duration(seconds: 1));
  if (id < 0) throw ArgumentError('bad id');
  return 'User $id';
}

Future<void> main() async {
  final name = await fetchName(1);
  final both = await Future.wait([fetchName(2), fetchName(3)]);
  print('$name $both');
  try {
    await fetchName(-1);
  } catch (e) {
    print('error: $e');
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
            mistakes: R`تنسى [[await]] فالمتغير يبقى [[Future<String>]] مش String، وتطبعه تلاقي [[Instance of 'Future<String>']]. وتعمل await ورا بعض لحاجات مستقلة (٣ طلبات = ٣ ثواني) بدل Future.wait (ثانية). وبعد await في Flutter تستخدم [[context]] والشاشة ممكن تكون اتقفلت: اسأل [[if (!context.mounted) return;]] الأول.`
          },
          lines: [
            "دالة async بترجّع Future<String>.",
            "استنى ثانية (زي طلب شبكة). [[const Duration]] عشان القيمة ثابتة.",
            "الـ throw جوه async بيتحوّل لـ Future فاشل.",
            "الـ return بيبقى قيمة الـ Future.",
            "قفلة.",
            "main نفسها ينفع تبقى async.",
            "[[await]]: استنى النتيجة. ثانية.",
            "[[Future.wait]]: الاتنين مع بعض، فثانية مش اتنين.",
            "User 1 [User 2, User 3].",
            "الأخطاء بتتمسك عادي.",
            "await على Future هيفشل.",
            "الـ catch بيمسك الـ exception.",
            "error: Invalid argument(s): bad id.",
            "قفلة try.",
            "قفلة main."
          ]
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
          ]
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

الـ widgets نوعين: فيه اللي بيرسم أو بيرتّب فعلًا (Text و Padding و Row، ليهم RenderObject)، وفيه اللي بيجمّع widgets تانية (Scaffold و MaterialApp وأي حاجة هتكتبها). والتطبيق كله بيبقى شجرة كبيرة، و Flutter بيحوّلها لشجرة elements ثم render objects (سؤال انترفيو في آخر التاب).

[[MaterialApp]] بيحط فوق الشجرة حاجات كتير: Theme و Navigator و Localizations و MediaQuery. أي widget تحته بيوصلها بـ [[Theme.of(context)]] وأخواتها. وفيه [[CupertinoApp]] لشكل iOS، بس معظم التطبيقات Material وبتظبط الشكل بالثيم.

وخلي بالك من الـ trailing commas: الفاصلة بعد آخر argument بتخلي [[dart format]] يكسّر الشجرة سطور بالشكل ده، فتقراها بسهولة.`,
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
          ]
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
          ]
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
            when: "state محلية تخص widget واحد: حقل مفتوح ولا مقفول، التاب المختار، قيمة slider، animation. لو أكتر من شاشة محتاجة نفس البيانات، ارفعها لفوق أو استخدم Provider (المستوى ٢).",
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
        }
      ]
    },
    // __NEXT__
  ]
});
