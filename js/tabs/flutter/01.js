// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
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
          teach: R`## الأوامر دي بتعمل إيه؟

ست أوامر بتسأل بيها Flutter عن نفسه وعن جهازك: نسختك إيه، و Dart نسخته إيه، والأدوات اللي حواليه ناقص منها إيه، وبعدين تصلّح أشهر نقص (رخص Android) وتحدّث. كل الناتج تحت حقيقي من Docker image رسمي فيه Flutter و Android SDK ([[ghcr.io/cirruslabs/flutter:stable]] على Ubuntu 24.04)، فشكل السطور زي جهازك بالظبط، بس الأدوات اللي ناقصة ممكن تختلف.

---

## ١. [[flutter --version]]

~~~bash
flutter --version
~~~

[[--version]] (اتنين شَرطة + كلمة كاملة) flag معناه «اطبع النسخة واخرج». الناتج:

~~~text الناتج
Flutter 3.44.0 • channel [user-branch] • unknown source
Framework • revision 559ffa3f75 (5 months ago) • 2026-05-15 14:13:13 -0700
Engine • hash fcf463a2242790d1fdcd9d044f533080f5022e18 (revision 4c525dac5e) (4 months ago) • 2026-05-15 19:00:04.000Z
Tools • Dart 3.12.0 • DevTools 2.57.0
~~~

| السطر | معناه |
|---|---|
| [[Flutter 3.44.0]] | رقم النسخة: major.minor.patch |
| [[channel]] | الفرع اللي بتاخد منه التحديثات. على جهازك المفروض يبقى [[stable]]. هنا [[[user-branch]]] لأن الـ image متسطّب بطريقة مش رسمية |
| [[Framework • revision]] | الجزء المكتوب بـ Dart (الـ widgets)، و revision رقم الـ commit في git |
| [[Engine]] | الجزء المكتوب بـ C++ اللي بيرسم على الشاشة |
| [[Tools • Dart 3.12.0]] | نسخة Dart اللي جوه Flutter، و DevTools أداة الـ debugging |

---

## ٢. [[dart --version]]

~~~bash
dart --version
~~~

~~~text الناتج
Dart SDK version: 3.12.0 (stable) (Fri May 8 01:51:14 2026 -0700) on "linux_x64"
~~~

نفس الرقم اللي في سطر [[Tools]] فوق: [[dart]] ده اللي جاي **جوه** Flutter SDK (في [[bin/cache/dart-sdk]])، مش حاجة متسطّبة لوحدها. و [[linux_x64]] يعني لينكس على معالج 64-bit. لو طلعلك رقم مختلف عن اللي في [[flutter --version]]، يبقى عندك Dart تاني متسطّب ومتقدم عليه في الـ PATH.

---

## ٣. [[flutter doctor]]

~~~bash
flutter doctor
~~~

[[doctor]] subcommand (أمر فرعي جوه flutter) بيفحص كل أداة Flutter محتاجها. الناتج المختصر:

~~~text الناتج
Doctor summary (to see all details, run flutter doctor -v):
[!] Flutter (Channel [user-branch], 3.44.0, on Ubuntu 24.04.3 LTS 6.6.87.2-microsoft-standard-WSL2, locale en_US.UTF-8)
    ! Flutter version 3.44.0 on channel [user-branch] at /sdks/flutter
      Currently on an unknown channel. Run $__btflutter channel$__bt to switch to an official channel.
[✓] Android toolchain - develop for Android devices (Android SDK version 36.0.0)
[✗] Chrome - develop for the web (Cannot find Chrome executable at google-chrome)
    ! Cannot find Chrome. Try setting CHROME_EXECUTABLE to a Chrome executable.
[✗] Linux toolchain - develop for Linux desktop
    ✗ clang++ is required for Linux development.
    ✗ CMake is required for Linux development.
[✓] Connected device (1 available)
[✓] Network resources

! Doctor found issues in 3 categories.
~~~

(شلت كام سطر نصايح من النص عشان الطول.)

### العلامات

| العلامة | معناها |
|---|---|
| [[[✓]]] | سليم |
| [[[!]]] | شغال بس فيه تحذير |
| [[[✗]]] | ناقص، والمنصة دي مش هتتبني |

### كل سطر بيقول إيه هنا

- **Flutter** [[[!]]]: الـ channel مش معروف. ده بسبب الـ Docker image، وعلى جهاز متسطّب صح هيبقى [[[✓] Flutter (Channel stable, ...)]].
- **Android toolchain** [[[✓]]]: Android SDK موجود (نسخة 36). ده اللي يهمك لو هتبني Android.
- **Chrome** [[[✗]]]: مفيش Chrome في الـ container، فمش هيعرف يشغّل ويب بـ [[-d chrome]]. والحل اللي بيقوله: متغير بيئة اسمه [[CHROME_EXECUTABLE]] فيه مسار Chrome.
- **Linux toolchain** [[[✗]]]: أدوات بناء تطبيقات لينكس desktop (clang++ و CMake). على ويندوز مكانه سطر **Visual Studio** لتطبيقات Windows، وعلى الماك **Xcode** (من الـ docs).
- **Connected device**: جهاز واحد متاح، اللي هو لينكس نفسه كـ desktop.
- **Network resources**: يقدر يوصل لسيرفرات Google ويحمّل packages.

آخر سطر [[Doctor found issues in 3 categories.]]: ٣ فئات فيهم مشكلة. **مش لازم يبقى صفر**: هنا لو هتبني Android بس، كله تمام.

---

## ٤. [[flutter doctor -v]]

~~~bash
flutter doctor -v
~~~

[[-v]] (verbose) = «بالتفاصيل». كل سطر بيتفتح وتحته المسارات والنسخ. جزء Android:

~~~text الناتج (جزء)
[✓] Android toolchain - develop for Android devices (Android SDK version 36.0.0) [2.9s]
    • Android SDK at /opt/android-sdk-linux
    • Emulator version 36.3.10.0 (build_id 14472402) (CL:N/A)
    • Platform android-36, build-tools 36.0.0
    • ANDROID_HOME = /opt/android-sdk-linux
    • Java binary at: /usr/bin/java
      This JDK was found in the system PATH.
      To manually set the JDK path, use: $__btflutter config --jdk-dir="path/to/jdk"$__bt.
    • Java version OpenJDK Runtime Environment (build 21.0.9+10-Ubuntu-124.04)
    • All Android licenses accepted.
~~~

- [[[2.9s]]] جنب كل فئة: الفحص خد قد إيه.
- [[Android SDK at]]: مكان الـ SDK. و [[ANDROID_HOME]] متغير البيئة اللي بيشاور عليه.
- [[Platform android-36, build-tools 36.0.0]]: نسخة Android API اللي هتبني بيها، وأدوات البناء.
- [[Java binary at]] و [[Java version]]: أنهي JDK (أداة Java اللي Gradle بيحتاجها) هيتستخدم ومنين. هنا لقاه في الـ PATH، وعلى جهازك غالبًا هيلاقي اللي جاي مع Android Studio. ولو عايز غيره: [[flutter config --jdk-dir]].
- [[All Android licenses accepted.]]: الرخص اتوافق عليها.

ده الناتج اللي تبعته لو بتسأل حد عن مشكلة، مش المختصر.

---

## ٥. [[flutter doctor --android-licenses]]

~~~bash
flutter doctor --android-licenses
~~~

Google مش بتسيبك تبني Android قبل ما توافق على رخص الـ SDK. الأمر ده بيعرض كل رخصة ويسألك [[(y/N)]]: تكتب [[y]] وتدوس Enter لكل واحدة. في الـ image كانت متوافق عليها قبل كده، فبعد ما لف على الـ SDK قال:

~~~text الناتج (آخر سطر)
All SDK package licenses accepted.
~~~

ولو قال [[cmdline-tools component is missing]]، يبقى ناقصك Android SDK Command-line Tools: من Android Studio ثم SDK Manager ثم SDK Tools.

---

## ٦. [[flutter upgrade]]

~~~bash
flutter upgrade
~~~

بيحدّث Flutter SDK لآخر نسخة في الـ channel بتاعك (Flutter SDK أصلًا git repo، فده بيعمل [[git fetch]] و pull)، ومعاه Dart والـ engine. في الـ image ده مش هينفع لأن الـ repo مالوش remote رسمي (وقف عند [[git fetch --tags]])، فالسلوك هنا من الـ docs: يطبع النسخة الجديدة، أو [[Flutter is already up to date on channel stable]] لو انت على الأخيرة. وبعد أي upgrade شغّل [[flutter doctor]] تاني.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[flutter --version]] | نسخة Flutter والـ channel و Dart اللي جواه |
| [[dart --version]] | نسخة Dart (لازم تطابق) |
| [[flutter doctor]] | فحص سريع بعلامات ✓ و ! و ✗ |
| [[flutter doctor -v]] | نفس الفحص بالمسارات والنسخ |
| [[flutter doctor --android-licenses]] | توافق على رخص Android |
| [[flutter upgrade]] | تحدّث Flutter كله |

> صلّح الفئات اللي تخص المنصة اللي هتبني ليها بس. [[[✗]]] على Linux toolchain أو Visual Studio مش مهم لو هتعمل Android.`,
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
          teach: R`## الأوامر دي بتعمل إيه؟

[[flutter create]] بيعمل فولدر مشروع كامل جاهز يشتغل. المثال بيعمله بـ ٣ أشكال (عادي، وبـ org ومنصات محددة، وفاضي)، ويدخل المشروع ويبص على الفولدرات المهمة وينزّل الـ packages. كله اتشغّل في [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44.0، Dart 3.12.0)، والناتج تحت منه.

---

## ١. [[flutter create my_app]]

~~~bash
flutter create my_app
~~~

[[create]] subcommand، و [[my_app]] اسم المشروع واسم الفولدر اللي هيتعمل.

~~~text الناتج
Creating project my_app...
Resolving dependencies in $__btmy_app$__bt...
Downloading packages...
Got dependencies in $__btmy_app$__bt.
Wrote 131 files.

All done!
...
In order to run your application, type:

  $ cd my_app
  $ flutter run

Your application code is in my_app/lib/main.dart.
~~~

- [[Resolving dependencies]] و [[Got dependencies]]: create شغّل [[flutter pub get]] لوحده في الآخر، فالمشروع جاهز على طول.
- [[Wrote 131 files.]]: ١٣١ ملف لكل المنصات.
- وآخر سطرين بيقولولك الخطوة الجاية.

### الاسم لازم Dart identifier

جربت [[flutter create my-app]]:

~~~text الناتج
"my-app" is not a valid Dart package name. Try "my_app" instead.

The name should consist of lowercase words separated by underscores, "like_this". Use only basic Latin letters and Arabic digits: [a-z0-9_], and ensure the name is a valid Dart identifier (i.e. it does not start with a digit and is not a reserved word).
~~~

الاسم حروف صغيرة و [[_]] بس، ومبيبدأش برقم. (و «Arabic digits» هنا يقصد الأرقام العادية 0-9، اسمها كده بالإنجليزي.)

---

## ٢. [[--org]] و [[--platforms]]

~~~bash
flutter create --org com.yourname --platforms android,web my_app
~~~

- [[--org com.yourname]]: الـ organization، بيتكتب بالمقلوب زي الدومين ([[yourname.com]] تبقى [[com.yourname]]). Flutter بيلزق فيه اسم المشروع فيبقى الـ **applicationId** (اسم التطبيق الفريد على Play Store).
- [[--platforms android,web]]: المنصات اللي عايزها بس، مفصولة بـ [[,]] من غير مسافات. من غيره بيعمل كل المنصات.

عملته باسم [[my_app2]] عشان ميتعارضش مع الأولاني، وبصيت جوه:

~~~text ls my_app2
analysis_options.yaml  android  lib  my_app2.iml  pubspec.lock  pubspec.yaml  README.md  test  web
~~~

~~~text grep في android/app/build.gradle.kts
8:    namespace = "com.yourname.my_app2"
19:        applicationId = "com.yourname.my_app2"
~~~

مفيش [[ios]] ولا [[windows]] ولا [[linux]] ولا [[macos]]: بس اللي طلبته. والـ applicationId بقى [[com.yourname.my_app2]]. ومن غير [[--org]] بيبقى [[com.example.my_app]]، و Play بيرفض أي حاجة بتبدأ بـ [[com.example]].

---

## ٣. [[--empty]]

~~~bash
flutter create --empty scratch
~~~

نفس المشروع بكل المنصات، بس [[lib/main.dart]] صغير (٢٠ سطر بدل ١٢٢ اتعدّوا بـ [[wc -l]]) ومن غير فولدر [[test/]]. ده الملف كله:

~~~text scratch/lib/main.dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text('Hello World!'),
        ),
      ),
    );
  }
}
~~~

- [[import 'package:flutter/material.dart';]]: هات widgets الـ Material Design.
- [[main]] بتنادي [[runApp]] بالـ widget الأساسي (درس «runApp»).
- [[MainApp]] class بيورث [[StatelessWidget]] (درس «StatelessWidget»)، ودالة [[build]] بترجّع الشاشة: [[MaterialApp]] جواه [[Scaffold]] (هيكل صفحة) جواه [[Center]] جواه [[Text]].

مكان كويس تجرّب فيه حاجة من غير ما تمسح كود العدّاد.

---

## ٤. [[cd my_app]] و [[ls lib test android]]

~~~bash
cd my_app
ls lib test android
~~~

[[cd]] (change directory) ادخل الفولدر. و [[ls]] بأكتر من اسم بيعرض كل واحد تحت عنوانه:

~~~text الناتج
android:
app
build.gradle.kts
gradle
gradle.properties
gradlew
gradlew.bat
local.properties
my_app_android.iml
settings.gradle.kts

lib:
main.dart

test:
widget_test.dart
~~~

| الفولدر/الملف | فيه إيه |
|---|---|
| [[lib/]] | كودك. [[main.dart]] نقطة البداية |
| [[test/]] | الاختبارات. [[widget_test.dart]] بيختبر إن العدّاد بيزيد |
| [[android/]] | مشروع Android حقيقي بـ Gradle. [[build.gradle.kts]] إعدادات البناء بلغة Kotlin script، و [[gradlew]] (و [[gradlew.bat]] لويندوز) Gradle wrapper بيشغّل نسخة Gradle المظبوطة |
| [[android/app/]] | فيه [[build.gradle.kts]] بتاع التطبيق (applicationId و minSdk) و [[src/main/AndroidManifest.xml]] (الصلاحيات) |
| [[pubspec.yaml]] | اسم المشروع والـ packages |
| [[pubspec.lock]] | النسخ بالظبط اللي اتنزّلت |
| [[analysis_options.yaml]] | قواعد الـ lint |
| [[ios/]] و [[web/]] و [[windows/]] و [[linux/]] و [[macos/]] | مشاريع كل منصة |

ولو عملت [[ls]] لوحده في my_app هتلاقي كمان [[README.md]] و [[my_app.iml]] (ملف إعدادات لـ Android Studio و IntelliJ).

---

## ٥. [[flutter pub get]]

~~~bash
flutter pub get
~~~

[[pub]] مدير الـ packages بتاع Dart (زي npm). و [[get]] بيقرا [[pubspec.yaml]] وينزّل اللي فيه:

~~~text الناتج
Resolving dependencies...
Downloading packages...
  clock 1.1.2 (1.1.3 available)
  cupertino_icons 1.0.9 (2.0.0 available)
  ...
Got dependencies!
8 packages have newer versions incompatible with dependency constraints.
Try $__btflutter pub outdated$__bt for more information.
~~~

- [[cupertino_icons 1.0.9 (2.0.0 available)]]: نزّل 1.0.9، وفيه 2.0.0 بس مش مسموحة بالقيد اللي في pubspec.
- [[incompatible with dependency constraints]]: القيود مانعة النسخ الأحدث. ده عادي ومش error.

### [[pubspec.yaml]] بعد ما تشيل التعليقات

~~~text pubspec.yaml
name: my_app
description: "A new Flutter project."
publish_to: 'none' # Remove this line if you wish to publish to pub.dev
version: 1.0.0+1
environment:
  sdk: ^3.12.0
dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.8
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^6.0.0
flutter:
  uses-material-design: true
~~~

- [[version: 1.0.0+1]]: قبل [[+]] النسخة اللي المستخدم بيشوفها، وبعده رقم الـ build (لازم يزيد مع كل رفع على Play).
- [[sdk: ^3.12.0]]: الـ [[^]] (caret) معناها «3.12.0 أو أي نسخة أحدث **من غير ما الرقم الأولاني يتغير**»، يعني أقل من 4.0.0. ونفس المعنى في [[^1.0.8]] (ليه 2.0.0 متنزلتش).
- [[dependencies]]: packages التطبيق نفسه. و [[dev_dependencies]]: للتطوير بس (الاختبارات والـ lint)، مش بتدخل التطبيق.
- و [[uses-material-design: true]]: ضيف خط أيقونات Material.

ومشروع [[--empty]] الفرق في pubspec بتاعه: [[version: 0.1.0+1]] ومفيهوش [[cupertino_icons]].

---

## ٦. اتأكد إن المشروع سليم

شغّلت على المشروع العادي:

~~~text flutter analyze
Analyzing my_app...
No issues found! (ran in 12.7s)
~~~

~~~text flutter test
00:00 +0: loading /w/my_app/test/widget_test.dart
00:00 +0: Counter increments smoke test
00:00 +1: All tests passed!
~~~

[[+1]] = اختبار واحد عدّى. والاتنين ليهم دروس في المستوى ٣.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[flutter create my_app]] | مشروع العدّاد كامل لكل المنصات |
| [[--org com.yourname]] | الـ applicationId يبقى [[com.yourname.my_app]] |
| [[--platforms android,web]] | المنصات دي بس |
| [[--empty]] | main.dart صغير ومن غير test/ |
| [[flutter pub get]] | ينزّل اللي في pubspec.yaml |

> اختار الـ org صح من الأول، واسم المشروع بـ [[_]] مش [[-]].`,
          lines: [
            "مشروع جديد فيه تطبيق العدّاد.",
            "حدد الـ org (أول جزء في اسم التطبيق على Play) والمنصات اللي عايزها بس.",
            "مشروع فاضي: main.dart صغير من غير العدّاد والتعليقات، للتجارب.",
            "ادخل المشروع.",
            "الكود، والاختبارات، ومشروع Android.",
            "نزّل الـ packages اللي في pubspec.yaml (زي [[npm install]])."
          ],
          sol: R`[[lib/main.dart]] في مشروع [[--empty]] ٢٠ سطر: [[main]] بتنادي [[runApp(const MainApp())]]، و [[MainApp]] بيرجّع [[MaterialApp]] جواه Scaffold ونص [[Hello World!]] في النص. في المشروع العادي الملف أكتر من ١٢٠ سطر: [[MyApp]] و [[MyHomePage]] (StatefulWidget) و [[_counter]] و [[setState]]، وتعليقات كتير بتشرح كل حاجة. والفرق التاني: مشروع --empty مفيهوش فولدر [[test/]]، والعادي فيه [[widget_test.dart]] بيختبر العدّاد.

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
          teach: R`## الأوامر دي بتعمل إيه؟

أول تلات أوامر بيسألوا «فين الأجهزة اللي أقدر أشغّل عليها؟» ويفتحوا emulator، والأربعة الباقيين بيبنوا التطبيق ويشغّلوه على جهاز معين. اتشغّلوا في [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44.0). الـ container مفيهوش موبايل ولا emulator ولا Chrome، فالناتج تحت هو اللي بيحصل فعلًا في الحالة دي، والتشغيل على موبايل أو emulator حقيقي من الـ docs. والتشغيل الناجح اتجرّب على جهاز [[web-server]] وفتحته في Chrome.

---

## ١. [[flutter devices]]

~~~bash
flutter devices
~~~

بيعرض كل جهاز Flutter يقدر يشغّل عليه دلوقتي:

~~~text الناتج
Found 1 connected device:
  Linux (desktop) • linux • linux-x64 • Ubuntu 24.04.3 LTS 6.6.87.2-microsoft-standard-WSL2

Run "flutter emulators" to list and start any available device emulators.
~~~

كل سطر جهاز، وعواميده مفصولة بـ [[•]]:

| العمود | هنا | معناه |
|---|---|---|
| الاسم | [[Linux (desktop)]] | للبني آدم |
| الـ **id** | [[linux]] | اللي بتكتبه بعد [[-d]] |
| المنصة | [[linux-x64]] | نوع الجهاز والمعالج |
| تفاصيل | [[Ubuntu 24.04.3 ...]] | نظام التشغيل |

على جهازك مع emulator مفتوح و Chrome متسطّب هتلاقي سطور زي [[sdk gphone64 x86 64 • emulator-5554 • android-x64 • Android 15 (API 35) (emulator)]] و [[Chrome (web) • chrome • web-javascript • Google Chrome ...]] (الشكل ده من الـ docs).

---

## ٢. [[flutter emulators]]

~~~bash
flutter emulators
~~~

الـ emulators (موبايلات وهمية) المتسطّبة، مش الشغالة:

~~~text الناتج
No emulators available.

To create a new emulator, run 'flutter emulators --create [--name xyz]'.
~~~

مفيش هنا. على جهازك بتعملها من Android Studio (Device Manager)، وساعتها كل سطر فيه id زي [[Pixel_8]].

---

## ٣. [[flutter emulators --launch Pixel_8]]

~~~bash
flutter emulators --launch Pixel_8
~~~

[[--launch]] + الـ id = افتح الـ emulator ده. هنا مفيش، فقال:

~~~text الناتج
No emulator found that matches 'Pixel_8'.
~~~

ولو موجود بيفتح الشباك، وبعد ما يكمّل الـ boot يظهر في [[flutter devices]] باسم زي [[emulator-5554]]. لاحظ: الـ id في القايمتين مختلف ([[Pixel_8]] اسم الـ emulator، و [[emulator-5554]] اسم الجهاز الشغال).

---

## ٤. [[flutter run]]

~~~bash
flutter run
~~~

لازم تبقى جوه فولدر المشروع. بيعمل ٣ حاجات: يبني التطبيق للجهاز، ويسطّبه، ويفضل متوصل بيه. لو فيه جهاز واحد بيختاره، ولو أكتر بيسألك. هنا الجهاز الوحيد لينكس desktop، فحاول يبني تطبيق لينكس:

~~~text الناتج
Launching lib/main.dart on Linux in debug mode...
Building Linux application...
Error: CMake is required for Linux development.
~~~

- [[in debug mode]]: الوضع الافتراضي (الجدول تحت).
- والـ error هو نفس سطر [[Linux toolchain]] الأحمر في [[flutter doctor]]. يعني اللي doctor بيقوله بيظهر هنا بالظبط.

---

## ٥. [[flutter run -d chrome]]

~~~bash
flutter run -d chrome
~~~

[[-d]] (device) + الـ id. هنا مفيش Chrome في الـ container:

~~~text الناتج
No supported devices found with name or id matching 'chrome'.

The following devices were found:
Linux (desktop) • linux • linux-x64 • Ubuntu 24.04.3 LTS 6.6.87.2-microsoft-standard-WSL2
~~~

ولما يبقى فيه Chrome، بيبني التطبيق JavaScript ويفتح tab لوحده.

### اللي اشتغل فعلًا: [[-d web-server]]

بديل من غير Chrome جوه الـ container: Flutter يبني الويب ويخدمه على port وانت تفتحه من أي متصفح:

~~~bash
flutter run -d web-server --web-port 5990 --web-hostname 0.0.0.0
~~~

~~~text الناتج
Launching lib/main.dart on Web Server in debug mode...
lib/main.dart is being served at http://0.0.0.0:5990

Flutter run key commands.
r Hot reload. 🔥🔥🔥
R Hot restart.
h List all available interactive commands.
d Detach (terminate "flutter run" but leave application running).
c Clear the screen
q Quit (terminate the application on the device).
~~~

فتحت [[http://localhost:5990]] في Chrome، وظهر تطبيق العدّاد وعليه شريط [[DEBUG]] أحمر في الركن، ودوست الزرار ٥ مرات والرقم بقى 5. والقايمة اللي تحت هي المفاتيح اللي [[flutter run]] بيستناها وهو شغال (درس «hot reload»).

---

## ٦. [[flutter run -d emulator-5554]]

~~~bash
flutter run -d emulator-5554
~~~

نفس الفكرة بالـ id بتاع emulator. هنا مفيش:

~~~text الناتج
No supported devices found with name or id matching 'emulator-5554'.
~~~

على جهازك مع emulator شغال (من الـ docs): [[Running Gradle task 'assembleDebug'...]] (أول مرة دقايق)، وبعدين [[✓ Built build/app/outputs/flutter-apk/app-debug.apk]] والتطبيق يفتح، ونفس قايمة المفاتيح.

---

## ٧. [[flutter run --release]]

~~~bash
flutter run --release
~~~

[[--release]] بيغيّر وضع البناء. الـ ٣ أوضاع:

| الوضع | الـ flag | Dart بيشتغل إزاي | hot reload | الاستخدام |
|---|---|---|---|---|
| debug | (الافتراضي) | JIT: بيترجم وهو شغال | آه | التطوير |
| profile | [[--profile]] | AOT | لأ | قياس الأداء (موبايل حقيقي) |
| release | [[--release]] | AOT ومضغوط | لأ | اللي بيتنشر |

- JIT (Just-In-Time): الكود بيتترجم وقت التشغيل، ودا اللي بيسمح بتبديله وهو شغال.
- AOT (Ahead-Of-Time): الكود بيتترجم لكود الجهاز (ARM على الموبايل) قبل التشغيل، فبيفتح أسرع ومفيش تعديل وهو شغال.

مفيش جهاز هنا فده من الـ docs: من غير شريط DEBUG، وأسرع بكتير، و [[r]] مش موجودة في القايمة.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[flutter devices]] | الأجهزة الجاهزة والـ id بتاع كل واحد |
| [[flutter emulators]] | الـ emulators المتسطّبة |
| [[flutter emulators --launch ID]] | افتح emulator |
| [[flutter run]] | ابني وسطّب واتوصل (debug) |
| [[flutter run -d ID]] | على جهاز معين |
| [[flutter run --release]] | نسخة سريعة من غير debugging |

> لو [[flutter run]] قال إنه مش لاقي جهاز، ارجع لـ [[flutter devices]] وانسخ الـ id من هناك بالظبط.`,
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

المشاكل الشائعة: [[No supported devices found with name or id matching 'emulator-5554'.]] يعني الـ id غلط أو الـ emulator لسه مفتحش (وتحتها Flutter بيعرض الأجهزة اللي لقاها)، و [[No supported devices connected.]] يعني مفيش أي جهاز خالص، فارجع لـ [[flutter devices]]. وأول build للأندرويد ممكن يقف كذا دقيقة على [[Running Gradle task 'assembleDebug'...]]: دا طبيعي أول مرة، مش معلّق.`
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
          teach: R`## المفاتيح دي بتعمل إيه؟

دي مش أوامر تكتبها في ترمنال فاضي. دي حروف بتدوسها **في الترمنال اللي فيه [[flutter run]] شغال**، وكل حرف بيبعت أمر للتطبيق اللي شغال. اتجرّبت كلها على مشروع العدّاد في [[docker run ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44.0) بـ [[flutter run -d web-server]]، والتطبيق مفتوح في Chrome، ونفّذت «جرّب» خطوة خطوة. اللوج والنتايج تحت حقيقية.

---

## ١. القايمة: [[h]]

لما [[flutter run]] يخلص البناء بيطبع:

~~~text الناتج
Flutter run key commands.
r Hot reload. 🔥🔥🔥
R Hot restart.
h List all available interactive commands.
d Detach (terminate "flutter run" but leave application running).
c Clear the screen
q Quit (terminate the application on the device).
~~~

دي القايمة المختصرة. [[h]] (help) بيطبع القايمة كاملة. جزء منها:

~~~text الناتج بعد h (جزء)
r Hot reload. 🔥🔥🔥
R Hot restart.
v Open Flutter DevTools.
w Dump widget hierarchy to the console.                                               (debugDumpApp)
p Toggle the display of construction lines.                                  (debugPaintSizeEnabled)
b Toggle platform brightness (dark and light mode).                        (debugBrightnessOverride)
P Toggle performance overlay.                                    (WidgetsApp.showPerformanceOverlay)
~~~

- الحروف حساسة للكبير والصغير: [[r]] غير [[R]]، و [[p]] غير [[P]].
- و [[v]] بيفتح DevTools، و [[p]] بيرسم حدود كل widget (مفيد في الـ layout)، و [[b]] بيقلب dark mode. والكلام اللي بين قوسين على اليمين اسم الخاصية في Flutter اللي الحرف بيغيّرها.

---

## ٢. [[r]]: hot reload

الخطوة الأولى في «جرّب»: دوست الزرار ٥ مرات، وغيّرت في [[lib/main.dart]]:

~~~dart
        colorScheme: .fromSeed(seedColor: Colors.deepPurple),
~~~

لـ [[Colors.green]]، وحفظت، ودوست [[r]]:

~~~text الناتج
Performing hot reload...                                           255ms
Reloaded application in 257ms.
~~~

- [[seedColor]]: اللون اللي Material بيطلّع منه ألوان التطبيق كلها.
- [[.fromSeed(...)]] بنقطة في الأول: ده الشكل اللي [[flutter create]] بيكتبه دلوقتي، اختصار لـ [[ColorScheme.fromSeed(...)]] (اسمه dot shorthand، من Dart 3.10). Dart عارف إن [[colorScheme]] مستني [[ColorScheme]]، فمش لازم تكتب اسم الـ class. في كود أقدم هتلاقيه بالاسم كامل، والاتنين واحد.
- **النتيجة في المتصفح**: الشريط اللي فوق والزرار بقوا أخضر فاتح، **والرقم لسه 5**.
- [[257ms]]: ربع ثانية. على موبايل الرسالة بتبقى شكل [[Reloaded 1 of 700 libraries in 400ms]] (عدد ملفات Dart اللي اتبعتت من اللي متحمّلين)، وعلى الويب زي ما فوق.

ليه الرقم فضل 5؟ hot reload بيبعت الكود الجديد للتطبيق وهو شغال، ويستبدل الدوال القديمة، وبعدين ينادي [[build]] لكل widget تاني. إنما الـ **objects** الموجودة (ومنها الـ State اللي فيه [[_counter]]) متلمستش.

---

## ٣. [[r]] تاني بعد تعديل القيمة الأولية

غيّرت:

~~~dart
  int _counter = 0;
~~~

لـ [[int _counter = 10;]] ودوست [[r]]:

~~~text الناتج
Performing hot reload...                                           691ms
Reloaded application in 705ms.
~~~

الـ reload **نجح**، بس الرقم في المتصفح **لسه 5**. لأن [[= 10]] قيمة أولية بتتحط مرة واحدة لما الـ State object يتعمل، والـ object ده اتعمل من بدري وعايش بقيمته. مش bug.

---

## ٤. [[R]]: hot restart

دوست [[R]] (shift + r):

~~~text الناتج
Performing hot restart...                                          295ms
Restarted application in 296ms.
~~~

**النتيجة**: الرقم بقى **10**، واللون لسه أخضر. hot restart رمى كل الـ state وشغّل [[main()]] من الأول، فالـ State اتعمل من جديد وقرا القيمة الجديدة. بس من غير ما يعيد بناء الجزء الـ native، فلسه في ثانية.

| | [[r]] reload | [[R]] restart | قفل وتشغيل تاني |
|---|---|---|---|
| الـ state (العدّاد) | فاضل | بيتصفّر | بيتصفّر |
| [[main()]] و [[initState]] | مش بيتنادوا | بيتنادوا | بيتنادوا |
| تعديل Kotlin/Swift أو plugin جديد | لأ | لأ | آه |
| الوقت هنا | ٢٥٧ms | ٢٩٦ms | بناء كامل |

---

## ٥. [[d]] و [[q]]

- [[q]] (quit): بيقفل التطبيق نفسه و [[flutter run]]. دوسته وطلع:

~~~text الناتج
Application finished.
~~~

- [[d]] (detach): بيقفل [[flutter run]] بس ويسيب التطبيق شغال على الجهاز (من غير reload بعد كده). الوصف من القايمة اللي فوق، ومجرّبتهوش هنا.
- و [[c]] بيمسح الترمنال.

---

## ٦. [[Ctrl+S]] في VS Code

لو شغّلت التطبيق من VS Code (F5 أو Run) بـ Flutter extension، مش محتاج تدوس [[r]]: الحفظ نفسه بيعمل hot reload. ده من الـ docs (مفيش VS Code في الـ container). ولو شغال من ترمنال بـ [[flutter run]]، الحفظ لوحده مش بيعمل حاجة، لازم [[r]].

---

## الخلاصة

| المفتاح | بيعمل إيه | الـ state |
|---|---|---|
| [[r]] | الكود الجديد + build تاني | فاضلة |
| [[R]] | من [[main()]] تاني | بتتصفّر |
| [[h]] | كل المفاتيح | |
| [[d]] | سيب التطبيق واقفل flutter run | |
| [[q]] | اقفل الاتنين | |

> عدّلت في [[build]]: [[r]]. عدّلت قيمة أولية أو [[initState]] أو [[main]]: [[R]]. عدّلت native أو ضفت plugin: اقفل وشغّل تاني.`,
          sol: R`التلات خطوات والنتيجة المتوقعة:

١. تغيّر [[seedColor: Colors.deepPurple]] لـ [[Colors.green]] وتضغط r: الترمنال يكتب حاجة زي [[Reloaded 1 of 700 libraries in 400ms]]، والـ AppBar والزرار يبقوا أخضر، والعدّاد لسه 5. لأن اللون جوه [[build]] بتاع MyApp، و reload بيعيد build بالكود الجديد ويسيب الـ State زي ما هي.

٢. تغيّر [[int _counter = 0;]] لـ [[int _counter = 10;]] وتضغط r: الرقم لسه 5. الـ reload نجح فعلًا، بس الـ field ده اتحط مرة واحدة لما الـ State اتعمل، والـ State object القديم لسه عايش بقيمته. مش bug ومش إن الملف متحفظش.

٣. تضغط R: [[Restarted application in ...ms]]، والعدّاد يبدأ من 10 واللون أخضر. الـ State اتعملت من جديد فقرت القيمة الأولية الجديدة. القاعدة اللي تطلع بيها: لو التعديل في حاجة بتتنفذ «مرة واحدة» (قيمة أولية، initState، main)، r مش هتبيّنه ومحتاج R.`
        }
      ]
    }
  ]
});
