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
          teach: R`## البرنامج بيعمل إيه؟

بيطبع سطر ترحيب، وبيعرّف ٤ متغيرات من ٤ أنواع مختلفة، وبعدين بيحط قيمهم جوه نصوص ويطبعها. كل اللي تحت اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5) بـ [[dart run main.dart]]، والأخطاء اتجربت بتعديل الملف فعلًا.

---

## ١. التعليق

~~~dart
// كل برنامج Dart بيبدأ من main
~~~

[[//]] معناها «من هنا لآخر السطر كلام للبني آدم مش للكمبيوتر». Dart بيتجاهله خالص، فممكن تكتب فيه عربي أو أي حاجة.

---

## ٢. [[void main() {]]

~~~dart
void main() {
~~~

السطر ده فيه ٤ حتت:

| الحتة | معناها |
|---|---|
| [[void]] | نوع اللي الدالة بترجّعه. void = «ولا حاجة»، الدالة بتعمل شغل ومش بترجّع قيمة |
| [[main]] | اسم الدالة. الاسم ده بالذات هو اللي Dart بيدوّر عليه أول ما يشغّل الملف |
| [[()]] | مكان الـ parameters (القيم اللي الدالة بتستلمها). فاضي هنا |
| [[{]] | بداية جسم الدالة. كل اللي لحد [[}]] اللي في الآخر هو البرنامج |

لو مفيش [[main]] في الملف، [[dart run]] بيرفض يشغّله أصلًا. وفي Flutter نفس الكلام: [[lib/main.dart]] فيه [[main]] وهي اللي بتنادي [[runApp]].

---

## ٣. أول طباعة

~~~dart
  print('Hello, Dart!');
~~~

- [[print]] دالة جاهزة في اللغة بتطبع اللي جوه القوسين في الترمنال (أو الـ console في DartPad).
- [['Hello, Dart!']] نص (String). بين علامتين تنصيص مفردة، ولو كتبته بـ [["..."]] نفس الحاجة بالظبط.
- [[;]] آخر الجملة. في Dart إجبارية مش اختيارية زي JavaScript.

~~~text الناتج
Hello, Dart!
~~~

### لو نسيت [[;]]

مسحتها من السطر ده وشغّلت:

~~~text dart run
main.dart:2:23: Error: Expected ';' after this.
  print('Hello, Dart!')
                      ^
~~~

- [[2:23]] يعني سطر ٢ عمود ٢٣، والسهم [[^]] بيشاور على المكان.
- ومفيش ولا سطر اتطبع، حتى [[Hello]] نفسه. Dart بيترجم الملف كله الأول، ولو فيه error مبينفّذش حاجة.
- [[dart analyze]] (والـ editor) بيقول نفس الغلطة بصيغة تانية: [[Expected to find ';'.]].

---

## ٤. المتغيرات الأربعة

~~~dart
  String developer = 'Khaled';
  int appsCount = 5;
  double rating = 4.8;
  bool isAvailable = true;
~~~

الشكل كل مرة: **النوع، بعده الاسم، بعده [[=]] والقيمة، بعده [[;]]**.

| النوع | يعني | القيمة هنا |
|---|---|---|
| [[String]] | نص | [['Khaled']] |
| [[int]] | integer: رقم صحيح من غير كسور | [[5]] |
| [[double]] | رقم بكسور (العلامة العشرية) | [[4.8]] |
| [[bool]] | boolean: صح أو غلط بس | [[true]] |

- [[=]] هنا مش «يساوي» بتاعة الرياضة، معناها «حط القيمة اللي على اليمين في المتغير اللي على الشمال».
- الأسامي بالشكل ده [[appsCount]] (أول كلمة small وكل كلمة بعدها أول حرف capital) اسمه camelCase، ودا العرف في Dart للمتغيرات والدوال.
- Dart بيفرّق بين الكبير والصغير: [[String]] نوع، إنما [[string]] مش موجود.

### النوع بيتفحص قبل التشغيل

غيّرت السطر لـ [[int appsCount = '5';]]:

~~~text dart run
main.dart:2:19: Error: A value of type 'String' can't be assigned to a variable of type 'int'.
  int appsCount = '5';
                  ^
~~~

[['5']] بين علامتين تنصيص يبقى نص، حتى لو شكله رقم. والمتغير قال من الأول إنه [[int]]، فالـ compiler رفض قبل ما يشغّل حاجة.

---

## ٥. [[$]] جوه النص (string interpolation)

~~~dart
  print('$developer built $appsCount apps, rating $rating');
~~~

[[$]] قبل اسم متغير جوه النص معناها «حط قيمة المتغير ده هنا». Dart بيبدّل كل [[$اسم]] بقيمته قبل ما يطبع:

~~~text الناتج
Khaled built 5 apps, rating 4.8
~~~

---

## ٦. حساب جوه النص: [[$__{ }]]

~~~dart
  print('Next year: $__{appsCount + 1} apps');
~~~

[[$]] لوحدها بتاخد **اسم** بس وتقف عند أول حاجة مش جزء من الاسم. فلو كتبت [['$appsCount + 1']] جربتها وطلعت:

~~~text الناتج
5 + 1
~~~

يعني حط 5 وكمّل الباقي كنص عادي. عشان أي حساب أو expression (أي حاجة بتتحسب لقيمة) لازم تتحط بين [[$__{]] و [[}]]:

~~~text الناتج
Next year: 6 apps
~~~

---

## ٧. طباعة الـ bool وقفلة الدالة

~~~dart
  print('Available: $isAvailable');
}
~~~

الـ bool بيتحوّل لنص [[true]] أو [[false]] جوه الجملة. و [[}]] بتقفل جسم [[main]]: البرنامج خلص.

~~~text الناتج الكامل (dart run)
Hello, Dart!
Khaled built 5 apps, rating 4.8
Next year: 6 apps
Available: true
~~~

---

## ٨. اتأكد من الأنواع بنفسك

كل قيمة في Dart تعرف نوعها، و [[.runtimeType]] بيقولهولك. جربت:

~~~dart
  print(4.8.runtimeType);
  print(true.runtimeType);
~~~

~~~text الناتج
double
bool
~~~

مفيدة لما تبقى مش متأكد Dart شايف المتغير إيه.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[void main() { }]] | نقطة البداية، ومش بترجّع حاجة |
| [[;]] | آخر كل جملة، ونسيانها يوقف الملف كله |
| [[النوع الاسم = القيمة;]] | تعريف متغير، والنوع بيتفحص قبل التشغيل |
| [[$name]] | قيمة متغير جوه نص |
| [[$__{a + 1}]] | أي حساب جوه نص |

> الأخطاء في Dart بتطلع قبل التشغيل مش وانت شغال: دي ميزة. اقرا رقم السطر والعمود في الرسالة الأول.`,
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
  // days.add('mon'); // runtime error: Unsupported operation
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
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف متغيرات بالطرق الأربعة اللي في Dart ([[var]] و [[final]] و [[const]] والنوع الصريح)، ويوريك إن [[final]] بتثبّت المتغير بس، إنما [[const]] بتجمّد القيمة نفسها. اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5)، وكل error تحت اتجرّب بتعديل الملف.

---

## ١. [[var]]: متغير عادي

~~~dart
  var count = 0;
  count++;
~~~

- [[var]] (variable) معناها «عرّف متغير، واستنتج نوعه من القيمة». القيمة [[0]] فالنوع بقى [[int]]، **وفضل int للأبد**. [[var]] مش زي [[var]] بتاعة JavaScript اللي تقبل أي حاجة بعدين.
- [[count++]] اختصار [[count = count + 1]]: زوّد واحد. فـ count بقت 1.

جربت أحط فيه نص بعدها ([[count = 'x';]]):

~~~text dart run
Error: A value of type 'String' can't be assigned to a variable of type 'int'.
~~~

---

## ٢. [[final]]: يتحط مرة واحدة

~~~dart
  final now = DateTime.now();
~~~

- [[final]] معناها «المتغير ده هياخد قيمة مرة واحدة ومش هيتغير بعدها». النوع هنا كمان بيتستنتج ([[DateTime]]).
- [[DateTime.now()]] بيرجّع الوقت دلوقتي. قيمته مش معروفة غير **وقت التشغيل** (runtime)، ودا مسموح مع final.

لو حاولت تغيّره:

~~~text dart run (بعد ما ضفت f = 2 لمتغير final)
Error: Can't assign to the final variable 'f'.
~~~

---

## ٣. [[const]]: ثابت وقت الترجمة

~~~dart
  const maxItems = 50;
~~~

[[const]] أقوى من final: القيمة لازم تبقى معروفة **وقت الترجمة** (compile time)، يعني قبل ما البرنامج يشتغل. [[50]] رقم مكتوب في الكود، فتمام.

جربت [[const now = DateTime.now();]] (التجربة اللي في «جرّب»):

~~~text dart run
Error: Cannot invoke a non-'const' constructor where a const expression is expected.
Try using a constructor or factory that is 'const'.
  const now = DateTime.now();
                       ^^^
~~~

والـ analyzer (اللي بيظهر في الـ editor) بيقول نفس المعنى في رسالتين: [[Const variables must be initialized with a constant value]] و [[The constructor being called isn't a const constructor]]. الوقت مستحيل يبقى معروف قبل التشغيل.

| | [[var]] | [[final]] | [[const]] |
|---|---|---|---|
| تغيّره بعدين؟ | آه | لأ | لأ |
| القيمة تتحسب وقت التشغيل؟ | آه | آه | لأ، لازم معروفة وقت الترجمة |
| المحتوى جوه list يتغير؟ | آه | آه | لأ، متجمّد |

---

## ٤. النوع الصريح

~~~dart
  String name = 'Ali';
  double price = 9.99;
~~~

بدل [[var]] كتبت النوع بنفسك. الاتنين نفس النتيجة، والفرق في القراية بس. والعرف في Dart: اكتب [[final]] أو [[var]] للمتغيرات المحلية وسيب الاستنتاج، والنوع الصريح في الـ fields وparameters الدوال.

---

## ٥. [[final]] مع list: المرجع ثابت والمحتوى لأ

~~~dart
  final tags = ['a'];
  tags.add('b');
~~~

- [[['a']]] أقواس مربعة = [[List]] (لستة). نوعها [[List<String>]].
- [[final]] ثبّتت **المتغير** tags: مينفعش تكتب [[tags = ['x'];]] بعدها.
- إنما اللستة نفسها object عادي يتعدّل، فـ [[add]] (ضيف عنصر في الآخر) عدّت. tags دلوقتي [[[a, b]]].

---

## ٦. [[const]] مع list: كل حاجة متجمّدة

~~~dart
  const days = ['sat', 'sun'];
  // days.add('mon'); // runtime error: Unsupported operation
~~~

شيلت أول [[//]] من السطر التاني (التعليق التاني بيفضل تعليق) وشغّلت. الكود **اترجم عادي** وضرب وهو شغال:

~~~text dart run
Unhandled exception:
Unsupported operation: Cannot add to an unmodifiable list
#0      UnmodifiableListMixin.add (dart:_internal/list.dart:112:5)
#1      main (file:///w/main.dart:11:8)
~~~

- [[Unhandled exception]]: حصل error ومحدش مسكه، فالبرنامج وقف.
- [[unmodifiable list]]: لستة متتعدلش. [[const]] عملت اللستة نفسها متجمّدة، مش المتغير بس.
- السطور اللي بتبدأ بـ [[#0]] و [[#1]] اسمها stack trace: مين نادى مين لحد الغلطة. [[main.dart:11:8]] = سطر ١١ عمود ٨ في ملفك.

> لاحظ: [[dart analyze]] على المثال الأصلي بيطلّع warning واحد: [[The value of the local variable 'days' isn't used]]، لأن days متعرّفة ومحدش بيستخدمها (السطر اللي بيستخدمها متعلّق). warning مش error، فالبرنامج بيشتغل.

### قيمتين const متطابقتين = object واحد

~~~dart
  print(identical(const [1], const [1]));
  print(identical([1], [1]));
~~~

~~~text الناتج
true
false
~~~

[[identical]] بتسأل «دول نفس الحاجة في الذاكرة؟». الـ const اتعملت مرة واحدة واتشاركت، والعادية اتعملت مرتين. ودا اللي Flutter بيستفيد منه لما تكتب [[const Text('Hi')]].

---

## ٧. سطر الطباعة

~~~dart
  print('$name paid $__{price * 2} at $now, max $maxItems, $count');
~~~

[[$name]] قيمة متغير، و [[$__{price * 2}]] حساب (لازم الأقواس). الناتج اللي طلعلي:

~~~text الناتج
Ali paid 19.98 at 2026-10-07 18:36:29.284777, max 50, 1
~~~

- [[19.98]] = 9.99 × 2.
- الوقت بصيغة [[سنة-شهر-يوم ساعة:دقيقة:ثانية.ميكروثانية]]، وهيطلعلك وقتك انت.
- [[1]] قيمة count بعد [[++]].

---

## الخلاصة

- [[final]] افتراضيًا، و [[var]] لو هتغيّر القيمة، و [[const]] للي معروف وقت الترجمة.
- [[final]] بتثبّت المتغير، و [[const]] بتجمّد القيمة كلها.
- [[const]] مع حاجة وقت تشغيل ([[DateTime.now()]]) = compile error. وتعديل const list = runtime error.`,
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
          teach: R`## البرنامج بيعمل إيه؟

دالة بتدوّر على يوزر وممكن متلاقيهوش (ترجّع [[null]])، والبرنامج بيجرّب كل أداة في Dart للتعامل مع القيمة اللي ممكن تبقى فاضية: [[?]] و [[?.]] و [[??]] و [[if]] و [[??=]] و [[!]] و [[late]]. اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5)، والأخطاء اتجربت بتعديل الملف.

---

## ١. الدالة: [[String?]] و [[=>]] و [[? :]]

~~~dart
String? findUser(int id) => id == 1 ? 'Ali' : null;
~~~

نفكّها من الشمال:

- [[String?]]: نوع اللي الدالة بترجّعه. [[String]] لوحدها معناها «نص أكيد». الـ [[?]] بعد النوع معناها «نص **أو** [[null]]». و [[null]] يعني «مفيش قيمة».
- [[findUser(int id)]]: اسم الدالة، وبتاخد parameter اسمه [[id]] نوعه [[int]].
- [[=>]] (arrow): اختصار لـ [[{ return ...; }]]. الدالة بترجّع قيمة الـ expression اللي بعده على طول.
- [[id == 1]]: [[==]] مقارنة («هل يساوي؟») بترجّع [[true]] أو [[false]]. مش زي [[=]] اللي بتحط قيمة.
- [[شرط ? أ : ب]]: اسمها ternary (conditional) operator. لو الشرط true خد [[أ]]، غير كده خد [[ب]]. فـ id بـ 1 يرجّع [['Ali']]، وأي رقم تاني يرجّع [[null]].

ودي أول حاجة null safety بتعملها: النوع **نفسه** بيقولك إن ممكن ميبقاش فيه قيمة. جربت أكتب [[String s = null;]]:

~~~text dart run
Error: A value of type 'Null' can't be assigned to a variable of type 'String'.
~~~

---

## ٢. متغير ممكن يبقى null

~~~dart
  String? name = findUser(2);
~~~

[[findUser(2)]] رجّعت [[null]]، و name نوعه [[String?]] فقبلها.

### من غير أي أداة: الـ compiler بيرفض

لو كتبت [[print(name.length);]] على طول (التجربة اللي في «جرّب»، لما تمسح سطر [[??=]]):

~~~text dart run
Error: Property 'length' cannot be accessed on 'String?' because it is potentially null.
Try accessing using ?. instead.
~~~

[[length]] طول النص. والـ compiler شايف إن name ممكن تبقى null، ومفيش طول لحاجة مش موجودة، فمش هيترجم. الـ editor بيقول نفس الكلام: [[The property 'length' can't be unconditionally accessed because the receiver can be 'null']].

---

## ٣. [[?.]]: نادي لو موجود بس

~~~dart
  print(name?.length);
~~~

[[?.]] اسمها null-aware access: «لو name مش null هات length، ولو null رجّع null على طول من غير ما تضرب».

~~~text الناتج
null
~~~

---

## ٤. [[??]]: قيمة بديلة

~~~dart
  print(name ?? 'Guest');
~~~

[[أ ?? ب]]: «لو أ مش null خده، لو null خد ب». ونوع النتيجة [[String]] عادي (مش ?) لأن البديل نص أكيد.

~~~text الناتج
Guest
~~~

---

## ٥. [[if (name != null)]]: الـ promotion

~~~dart
  if (name != null) print(name.toUpperCase());
~~~

- [[!=]] «مش بيساوي».
- جوه الـ if الـ compiler **فاهم** إن name أكيد مش null، فبيعامله كـ [[String]] وتنادي [[toUpperCase()]] (حوّل لحروف كبيرة) من غير أي ?. ودا اسمه type promotion.
- هنا name كانت null، فالسطر ده **مطبعش حاجة**.

---

## ٦. [[??=]]: حط قيمة لو فاضي

~~~dart
  name ??= 'Unknown';
  print(name.length);
~~~

- [[name ??= 'Unknown']] = «لو name null حط فيه [['Unknown']]، ولو فيه قيمة سيبه». نفس [[name = name ?? 'Unknown']].
- بعد السطر ده الـ compiler عارف إن name مستحيل يبقى null، فـ [[name.length]] عدّت من غير ?.

~~~text الناتج
7
~~~

[['Unknown']] ٧ حروف.

---

## ٧. [[!]]: «أنا متأكد»

~~~dart
  final ali = findUser(1)!;
  print(ali.length);
~~~

- [[!]] بعد قيمة اسمها null assertion (أو bang operator): «أنا متأكد إن دي مش null، عاملها كـ String».
- [[findUser(1)]] رجّعت [['Ali']] فعدّت، و ali نوعها [[String]]:

~~~text الناتج
3
~~~

### لما تطلع مش متأكد

غيّرت [[findUser(1)!]] لـ [[findUser(5)!]]. الكود **اترجم عادي**، واشتغل لحد السطر ده وضرب:

~~~text dart run
null
Guest
7
Unhandled exception:
Null check operator used on a null value
#0      main (file:///w/main.dart:10:26)
~~~

التلات سطور الأولانيين اتطبعوا عادي، والـ crash على سطر ١٠ عمود ٢٦ بالظبط: مكان الـ [[!]].

[[!]] مش بيحل حاجة: بيعمل فحص وقت التشغيل ولو لقى null يرمي error. يعني الـ compiler كان هيحميك، وانت قلتله «سيبني».

---

## ٨. [[late]]: هتتحط بعدين

~~~dart
  late final String token;
  token = 'abc';
  print(token);
~~~

- [[late]]: «المتغير ده نوعه [[String]] (مش null)، بس القيمة هتيجي بعدين، قبل أول ما حد يقراه».
- [[final]] معاها: يتحط مرة واحدة بس.
- [[token = 'abc';]] أول وآخر تعيين، وبعدين بنطبعه:

~~~text الناتج
abc
~~~

جربت الغلطتين:

| الغلطة | اللي حصل (dart run) |
|---|---|
| [[print(token)]] قبل ما يتحط (متغير محلي) | compile error: [[Late variable 'token' without initializer is definitely unassigned.]] |
| [[token = 'b';]] تاني بعد [['abc']] | compile error: [[Late final variable 'token' definitely assigned.]] |
| field [[late]] في class واتقرا قبل ما يتحط | runtime: [[LateInitializationError: Field 't' has not been initialized.]] |

يعني في المتغير المحلي الـ compiler بيلحقك، إنما في field جوه class الفحص بيتأجل لوقت التشغيل. ودا الاستخدام الحقيقي لـ late في Flutter: controller بيتعمل في [[initState]].

---

## الناتج الكامل

~~~text dart run
null
Guest
7
3
abc
~~~

خمس سطور مش ست: سطر الـ if متنفذش لأن name كانت null.

---

## الخلاصة

| الأداة | معناها | لو null |
|---|---|---|
| [[String?]] | ممكن تبقى null | مسموح |
| [[x?.prop]] | نادي لو موجود | يرجّع null |
| [[x ?? y]] | بديل | ياخد y |
| [[x ??= y]] | حط لو فاضي | x بقت y |
| [[if (x != null)]] | جوه الـ if بقت أكيدة | الـ if متتنفذش |
| [[x!]] | «متأكد» | crash وقت التشغيل |
| [[late]] | هتتحط قبل الاستخدام | error (compile أو runtime) |

> رتّب اختياراتك: [[?.]] و [[??]] و [[if]] الأول، و [[!]] آخر حاجة ولما تبقى متأكد فعلًا.`,
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
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف ٣ دوال، كل واحدة بنوع parameters مختلف (positional و named و optional positional)، وبعدين دالة من غير اسم متخزنة في متغير. اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5)، والأخطاء اتجربت بتعديل الملف.

---

## ١. positional + [[=>]]

~~~dart
int add(int a, int b) => a + b;
~~~

- [[int]] في الأول: الدالة بترجّع رقم صحيح.
- [[(int a, int b)]]: two **positional** parameters، يعني بيتبعتوا بالترتيب. أول قيمة تروح a، والتانية b. وكل واحد ليه نوع.
- [[=> a + b]]: الـ arrow معناها «رجّع قيمة الـ expression دي». نفس [[{ return a + b; }]] بالظبط، بس في سطر.

> [[=>]] بعدها **expression واحدة** بس. مش زي arrow function في JavaScript اللي تقبل [[{ ... }]] كـ block.

---

## ٢. named parameters جوه [[{ }]]

~~~dart
String greet({required String name, String greeting = 'Hi', int? age}) {
~~~

الأقواس المعقوفة [[{ }]] **جوه** أقواس الـ parameters معناها: دول named، بيتبعتوا بالاسم مش بالترتيب. وفيهم ٣ أشكال:

| الـ parameter | الشكل | لو متبعتش |
|---|---|---|
| [[required String name]] | [[required]] = إجباري | compile error |
| [[String greeting = 'Hi']] | ليه قيمة افتراضية (default) | ياخد [['Hi']] |
| [[int? age]] | النوع nullable ([[?]]) | ياخد [[null]] |

وفيه قاعدة: named parameter **لازم** يبقى واحد من التلاتة دول. شيلت [[required]] من name وسيبت الباقي زي ما هو:

~~~text dart run
Error: The parameter 'name' can't have a value of 'null' because of its type 'String', but the implicit default value is 'null'.
Try adding either an explicit non-'null' default value or the 'required' modifier.
~~~

يعني: «لو محدش بعت name هيبقى null، والنوع [[String]] مش بيقبل null». فاختار: [[required]]، أو default، أو [[String?]].

---

## ٣. جسم greet

~~~dart
  final suffix = age == null ? '' : ' ($age)';
  return '$greeting, $name$suffix';
}
~~~

- [[شرط ? أ : ب]] (ternary): لو مفيش سن، suffix نص فاضي [['']]. لو فيه، [[' (30)']].
- [[return]]: رجّع القيمة دي من الدالة وخلّص. هنا محتاجينها لأن الجسم [[{ }]] مش [[=>]].
- [[$name$suffix]]: متغيرين لازقين في بعض جوه النص، كل [[$]] بتقف عند آخر الاسم.

---

## ٤. optional positional بين [[[ ]]]

~~~dart
String shout(String text, [int times = 1]) => text.toUpperCase() * times;
~~~

- [[text]] positional إجباري.
- [[[int times = 1]]]: الأقواس المربعة معناها «positional بس اختياري». لو متبعتش ياخد 1.
- [[text.toUpperCase()]]: النص بحروف كبيرة.
- [[* times]]: في Dart ضرب نص في رقم بيكرره. جربت [[print('ab' * 3);]] وطلع [[ababab]].

---

## ٥. النداءات

~~~dart
  print(add(2, 3));
  print(greet(name: 'Ali'));
  print(greet(age: 30, name: 'Sara', greeting: 'Hello'));
  print(shout('hey', 2));
~~~

~~~text الناتج
5
Hi, Ali
Hello, Sara (30)
HEYHEY
~~~

- [[name: 'Ali']]: الاسم، بعده [[:]]، بعده القيمة. greeting خد [['Hi']] و age خد null فمفيش قوسين.
- النداء التالت مكتوب بترتيب مختلف عن التعريف (age الأول) وشغال عادي: الـ named **الترتيب مش مهم فيها**.
- [[shout('hey', 2)]]: 2 راحت لـ times. ولو ناديت [[shout('hey')]] بيطبع [[HEY]] (جربتها).

### غلطتين الـ compiler بيمسكهم

| اللي كتبته | الرسالة (dart run) |
|---|---|
| [[greet()]] من غير name | [[Required named parameter 'name' must be provided.]] |
| [[greet(name: 'A', nick: 'b')]] اسم مش موجود | [[No named parameter with the name 'nick'.]] |

والـ editor (analyzer) بيقول الأولى كده: [[The named parameter 'name' is required, but there's no corresponding argument]]. ودي نفس الرسالة اللي هتشوفها لما تنسى [[child]] أو [[onPressed]] في widget.

---

## ٦. دالة في متغير

~~~dart
  final twice = (int x) => x * 2;
  print([1, 2, 3].map(twice).toList());
~~~

- [[(int x) => x * 2]]: دالة **من غير اسم** (anonymous function). بتاخد x وترجّع ضعفه. واتخزنت في متغير اسمه twice. الدوال في Dart قيم عادية زي الأرقام والنصوص.
- نوعها: [[print(twice.runtimeType)]] طلعت [[(int) => int]]، يعني «دالة بتاخد int وترجّع int».
- [[[1, 2, 3].map(twice)]]: [[map]] بتعدّي على كل عنصر في اللستة وتبعته للدالة. بعتنالها twice نفسها (من غير قوسين: الدالة مش نتيجتها).
- [[.toList()]]: map بترجّع Iterable، و toList بتحوّله List (درس «List و Map و Set»).

~~~text الناتج
[2, 4, 6]
~~~

### فخ [[=> { }]]

جربت [[final f = () => {1};]] و [[print(f())]]:

~~~text الناتج
{1}
~~~

مطبعش 1، رجّع **Set** فيها 1. لأن بعد [[=>]] الـ [[{ }]] بتتقري كـ Set أو Map literal مش block. عشان كده في Flutter بتكتب [[onPressed: () => doIt()]] أو [[onPressed: () { doIt(); }]]، مش الاتنين مع بعض.

---

## الخلاصة

| الشكل | التعريف | النداء |
|---|---|---|
| positional | [[f(int a)]] | [[f(1)]] بالترتيب |
| named | [[f({required int a, int b = 0, int? c})]] | [[f(a: 1)]] بالاسم، أي ترتيب |
| optional positional | [[f(int a, [int b = 1])]] | [[f(1)]] أو [[f(1, 2)]] |
| arrow | [[=> expression]] | expression واحدة بس |`,
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
          teach: R`## البرنامج بيعمل إيه؟

بيعمل لستة أسماء ويفلترها ويحوّلها، وقاموس أسعار يضيف فيه ويقرا منه، و Set بتشيل التكرار، وفي الآخر لستة بتتبني بـ [[if]] و [[for]] و [[...]] جواها. اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5)، وكل [[runtimeType]] تحت طبعته فعلًا.

---

## ١. [[List]]: لستة

~~~dart
  final names = ['Ali', 'Sara', 'Omar'];
  names.add('Mona');
~~~

- الأقواس المربعة [[[ ]]] = List، والعناصر بالترتيب وبيتعدّوا من 0 ([[names[0]]] = Ali).
- النوع اتستنتج من القيم: [[print(names.runtimeType)]] طلع [[List<String>]]. الـ [[<String>]] اسمها type argument: «لستة **نصوص**». لو حاولت تضيف رقم فيها الـ compiler يرفض.
- [[final]] بتثبّت المتغير بس، فـ [[add]] (ضيف في الآخر) شغالة. names بقت ٤.

---

## ٢. [[where]]: فلتر

~~~dart
  final long = names.where((n) => n.length > 3).toList();
~~~

من جوه لبرة:

1. [[(n) => n.length > 3]]: دالة من غير اسم، بتاخد اسم n وترجّع true لو طوله أكتر من ٣.
2. [[names.where(...)]]: بتسيب العناصر اللي الدالة رجّعت لها true بس. زي [[filter]] في JavaScript.
3. [[.toList()]]: where مش بترجّع List، بترجّع [[Iterable]]. ودي ليها كلام تحت.

النتيجة: [[[Sara, Omar, Mona]]] (Ali ٣ حروف بس).

### الـ Iterable كسلان (lazy)

جربت where بدالة فيها print ومن غير toList:

~~~text الناتج
before
check Ali
check Sara
check Omar
[Sara, Omar]
~~~

[[before]] اتطبعت **الأول**، والفحص محصلش غير لما [[toList()]] طلبت النتيجة. يعني where و map بيجهزوا «وصفة» ومش بينفّذوها لحد ما حد يقرا.

---

## ٣. [[map]]: حوّل كل عنصر

~~~dart
  final upper = names.map((n) => n.toUpperCase()).toList();
~~~

[[map]] بتعدّي على كل عنصر وتحطه مكانه نتيجة الدالة. فـ upper = [[[ALI, SARA, OMAR, MONA]]].

ومن غير [[toList()]] (التجربة التانية في «جرّب»):

~~~text الناتج
(ALI, SARA, OMAR, MONA)
~~~

أقواس عادية مش مربعة: ده شكل طباعة الـ Iterable. ونوعه الحقيقي [[MappedListIterable<String, String>]]. ولو حطيته في متغير نوعه [[List<String>]]:

~~~text dart run
Error: A value of type 'Iterable<String>' can't be assigned to a variable of type 'List<String>'.
~~~

---

## ٤. [[Map]]: مفتاح وقيمة

~~~dart
  final prices = {'tea': 10, 'coffee': 25};
  prices['juice'] = 15;
  print(prices['milk'] ?? 0);
~~~

- [[{ مفتاح: قيمة, ... }]] = Map. النوع [[Map<String, int>]]: المفاتيح نصوص والقيم أرقام. (طبعت runtimeType وطلع [[_Map<String, int>]]: الـ [[_]] في الأول معناها class داخلي جوه Dart بينفّذ Map.)
- [[prices['juice'] = 15]]: الأقواس المربعة بالمفتاح. لو المفتاح موجود بتعدّل قيمته، لو مش موجود بتضيفه.
- [[prices['milk']]]: مفتاح مش موجود **مش error**، بيرجّع [[null]]. عشان كده نوع القراية [[int?]].
- [[?? 0]]: لو null خد 0.

~~~text الناتج
0
~~~

---

## ٥. [[Set]]: من غير تكرار

~~~dart
  final tags = ['dart', 'flutter', 'dart'].toSet();
~~~

[[toSet()]] بتحوّل اللستة Set، و Set مبتقبلش نفس القيمة مرتين، فـ [['dart']] التانية اتشالت: [[{dart, flutter}]]. والـ Set بتتكتب بـ [[{ }]] من غير [[:]].

جربت [[add]] على Set: إضافة قيمة موجودة رجّعت [[false]] (متضافتش)، وقيمة جديدة رجّعت [[true]].

---

## ٦. collection if و for و spread

~~~dart
  final isAdmin = true;
  final menu = ['Home', if (isAdmin) 'Admin', for (final n in names) 'User $n', ...long];
~~~

اللستة دي بتتبني من ٤ حتت، بالترتيب:

| الحتة | بتعمل إيه | اللي اتحط |
|---|---|---|
| [['Home']] | عنصر عادي | Home |
| [[if (isAdmin) 'Admin']] | **collection if**: العنصر يتحط لو الشرط true بس | Admin |
| [[for (final n in names) 'User $n']] | **collection for**: عنصر لكل اسم | User Ali ... User Mona |
| [[...long]] | **spread**: النقط التلاتة بتفك لستة long وتحط عناصرها هنا | Sara, Omar, Mona |

مفيش أقواس [[{ }]] بعد if و for هنا، ومفيش [[;]]: دول جزء من اللستة مش جمل. ودا الشكل اللي هتبني بيه [[children: [...]]] في Flutter.

ولما [[isAdmin]] تبقى [[false]] (أول تجربة)، Admin بس بتختفي. والـ analyzer بيقول [[Dead code]] على [['Admin']] لأنه شايف إن الشرط دايمًا false: warning مش error.

---

## ٧. لف على الـ Map

~~~dart
  for (final entry in prices.entries) print('$__{entry.key}: $__{entry.value}');
~~~

- [[prices.entries]]: الـ Map كأزواج، كل زوج نوعه [[MapEntry<String, int>]] (اتطبع كده: [[MapEntry(tea: 10)]]).
- [[for (final entry in ...)]]: لف على كل زوج، واحد واحد.
- [[entry.key]] المفتاح و [[entry.value]] القيمة. ولأنهم فيهم نقطة لازم [[$__{ }]] جوه النص.

~~~text الناتج
tea: 10
coffee: 25
juice: 15
~~~

الترتيب هو ترتيب الإضافة: Map في Dart افتراضيًا بتحافظ عليه.

---

## ٨. الطباعة الأخيرة

~~~dart
  print('$upper $tags $menu');
~~~

~~~text الناتج
[ALI, SARA, OMAR, MONA] {dart, flutter} [Home, Admin, User Ali, User Sara, User Omar, User Mona, Sara, Omar, Mona]
~~~

List بـ [[[ ]]]، و Set بـ [[{ }]]، و Iterable (لو نسيت toList) بـ [[( )]]. من شكل الأقواس في اللوج تعرف النوع.

---

## الخلاصة

| النوع | الشكل | مميزاته |
|---|---|---|
| [[List<T>]] | [[[a, b]]] | مرتّبة، بالـ index، تقبل تكرار |
| [[Map<K, V>]] | [[{k: v}]] | بالمفتاح، والمفتاح الناقص = null |
| [[Set<T>]] | [[{a, b}]] | من غير تكرار |

> [[where]] و [[map]] بيرجّعوا Iterable lazy: كمّلهم بـ [[toList()]] لو محتاج List.`,
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
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف نوع جديد اسمه [[Product]] فيه اسم وسعر وعدّاد مشاهدات، ويعمل منه object ويزوّد المشاهدات مرتين ويغيّر السعر ويطبع. اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5)، والـ solCode والأخطاء اتجربوا كمان.

---

## ١. [[class Product {]]

~~~dart
class Product {
~~~

[[class]] بتعرّف **نوع جديد**، زي [[String]] و [[int]] بس انت اللي عامله. الـ class «قالب»، وكل حاجة بتتعمل منه اسمها object (أو instance). والعرف: اسم الـ class بيبدأ بحرف كبير (PascalCase).

---

## ٢. الـ constructor

~~~dart
  Product(this.name, this.price);
~~~

- الـ constructor دالة **اسمها نفس اسم الـ class**، وبتتنادى لما تعمل object جديد. مالهاش نوع رجوع.
- [[this]] معناها «الـ object اللي بيتعمل دلوقتي». و [[this.name]] في الـ parameters اختصار: «القيمة اللي هتيجي هنا حطها على طول في الـ field اللي اسمه name».
- ومفيش جسم ([[;]] بدل [[{ }]]) لأن مفيش حاجة تانية محتاجين نعملها.

من غير الاختصار كان هيبقى أطول بكتير، ومش هينفع أصلًا مع [[final]] (درس «named و factory» بيشرح ليه).

---

## ٣. الـ fields

~~~dart
  final String name;
  double price;
  int _views = 0;
~~~

الـ fields هي البيانات اللي كل object شايلها:

| الـ field | النوع | يتغير؟ | ملاحظة |
|---|---|---|---|
| [[name]] | [[String]] | لأ ([[final]]) | بيتحط مرة في الـ constructor |
| [[price]] | [[double]] | آه | |
| [[_views]] | [[int]] | آه | بيبدأ من 0، و [[_]] = private |

### [[_]]: private

أي اسم بيبدأ بـ underscore يبقى **private على مستوى الملف**. يعني أي كود في نفس الملف يشوفه، إنما أي ملف تاني يعمل [[import]] للملف ده ميقدرش يوصل لـ [[_views]]. ومفيش كلمة [[private]] في Dart أصلًا.

### [[price]] نوعها double وبعتنا 80

جربت [[print(Product('Mouse', 80).price)]]:

~~~text الناتج
80.0
~~~

[[80]] مكتوبة من غير كسور، بس Dart حوّلها [[80.0]] لأن الـ field نوعه [[double]].

---

## ٤. الـ getters والـ method

~~~dart
  bool get isCheap => price < 100;
  int get views => _views;
  void view() => _views++;
}
~~~

- [[get]]: getter. «field محسوب»: بيتقري **من غير أقواس** ([[p.isCheap]] مش [[p.isCheap()]])، بس كل مرة بيحسب من جديد. [[price < 100]] مقارنة بترجّع bool.
- [[int get views => _views;]]: بيطلّع قيمة [[_views]] للقراية بس. اللي بره الملف يقدر يقرا views، بس مفيش setter (طريقة كتابة)، فميقدرش يغيّرها.
- [[void view() => _views++;]]: method (دالة جوه class). بتزوّد العدّاد واحد. [[void]] لأنها مش بترجّع حاجة مهمة.
- [[}]] قفلة الـ class.

جربت أكتب في getter: [[p.isCheap = true;]]:

~~~text dart run
Error: The setter 'isCheap' isn't defined for the type 'Product'.
~~~

---

## ٥. [[main]]: نعمل object

~~~dart
  final p = Product('Mouse', 80)..view()..view();
~~~

نفكّها بالترتيب:

1. [[Product('Mouse', 80)]]: نادي الـ constructor. name = Mouse و price = 80.0. ومفيش [[new]]: موجودة في اللغة بس اختيارية ومحدش بيكتبها.
2. [[..view()]]: الـ **cascade** (نقطتين). «نادي view على نفس الـ object، ورجّع الـ object نفسه مش نتيجة view». فـ _views بقت 1.
3. [[..view()]] تاني: _views بقت 2، والنتيجة لسه الـ object.
4. [[final p =]]: p بقى شايل الـ object.

لو كتبت [[.view()]] بنقطة واحدة، p كان هياخد نتيجة view نفسها ([[void]]) مش الـ Product. جربتها و [[p.name]] بعدها طلّع: [[This expression has type 'void' and can't be used.]]

---

## ٦. تغيير field وطباعة

~~~dart
  p.price = 120;
  print('$__{p.name} cheap=$__{p.isCheap} views=$__{p.views}');
~~~

- [[p.price = 120;]]: price مش final فتتغير. وبعدها isCheap بقت false لوحدها، لأنها بتتحسب من price كل مرة.
- [[$__{p.name}]]: جوه النص لازم [[$__{ }]] لأن فيه نقطة.

~~~text الناتج
Mouse cheap=false views=2
~~~

---

## ٧. الـ solCode: [[toString]] و [[@override]]

لو طبعت [[print(p)]] من غير حاجة، بيطلع [[Instance of 'Product']]: Dart ميعرفش يوصف الـ object. فالحل:

~~~dart
  @override
  String toString() => 'Product($name, $__{price.toStringAsFixed(0)})';
~~~

- كل class بيورث من [[Object]] لوحده، و [[Object]] فيه [[toString()]]. و [[print]] بتناديها.
- [[@override]] اسمها annotation: «أنا قاصد أكتب نسخة جديدة من method موجودة في الأب». لو كتبت الاسم غلط ([[tostring]] بحرف صغير)، الـ analyzer بيقول: [[The method doesn't override an inherited method.]] فتاخد بالك.
- جوه الـ class تقدر تكتب [[$name]] على طول من غير [[this.]] ولا نقطة.
- [[price.toStringAsFixed(0)]]: الرقم كنص بـ 0 أرقام بعد العلامة. جربت من غيرها ([[$price]]) وطلع [[Product(Mouse, 120.0)]]، ومعاها:

~~~text الناتج (solCode)
Product(Mouse, 120)
~~~

### و [[p.name = 'X']]

~~~text dart analyze
'name' can't be used as a setter because it's final.
~~~

و [[dart run]] بيقول نفس المعنى بصيغة تانية: [[The setter 'name' isn't defined for the type 'Product'.]] الـ field الـ final ملوش setter أصلًا.

---

## الخلاصة

| الحاجة | الشكل | معناها |
|---|---|---|
| constructor | [[Product(this.name, this.price);]] | القيم تروح للـ fields على طول |
| private | [[_views]] | مستخبي عن أي ملف تاني |
| getter | [[bool get isCheap => ...;]] | قيمة محسوبة من غير أقواس |
| cascade | [[obj..a()..b()]] | نادي على نفس الـ object ورجّعه |
| [[@override]] | فوق [[toString]] | بتعيد تعريف method من الأب |`,
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
          teach: R`## البرنامج بيعمل إيه؟

class [[User]] واحد ليه ٤ constructors: الأساسي، و [[guest]] بقيم جاهزة، و [[adult]] بسن ثابت، و [[fromJson]] بيقرا Map. وفي main بنعمل object بكل طريقة. اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5)، والـ solCode والأخطاء اتجربوا كمان.

---

## ١. الـ constructor الأساسي و [[const]]

~~~dart
  const User(this.name, this.age);
~~~

- [[User(this.name, this.age)]]: نفس اللي في درس «class»: القيم تروح للـ fields على طول.
- [[const]] قبله: constructor ينفع يتنادى **وقت الترجمة**. شرطه إن كل الـ fields تبقى [[final]] (وهي كده تحت)، ومفيش جسم.

---

## ٢. named constructor بيحوّل للأساسي

~~~dart
  const User.guest() : this('Guest', 0);
~~~

- [[User.guest]]: اسم الـ class، نقطة، اسم تختاره. ده **named constructor**: طريقة تانية تعمل بيها User. Dart مفيهوش overloading (دالتين بنفس الاسم)، فالأسامي دي هي البديل.
- [[:]] بعد القوسين: من هنا الكلام بيتنفذ **قبل** جسم الـ constructor.
- [[this('Guest', 0)]]: هنا [[this(...)]] بأقواس معناها «نادي الـ constructor الأساسي بالقيم دي». اسمها redirecting constructor.
- وهو كمان [[const]]، فـ [[const User.guest()]] ينفع.

---

## ٣. initializer list

~~~dart
  User.adult(this.name) : age = 18;
~~~

- [[this.name]] بياخد الاسم من اللي بيناديه.
- [[: age = 18]]: الـ **initializer list**: بتحط قيمة لـ field قبل ما الجسم يبدأ. age هنا [[final]]، والـ final لازم ياخد قيمته **قبل** الجسم.

جربت أكتب الـ final جوه الجسم بدلها ([[U2(String n) { name = n; }]]):

~~~text dart run
Error: The setter 'name' isn't defined for the type 'U2'.
Error: Final field 'name' is not initialized.
~~~

لما الجسم بيبدأ، الـ object خلاص اتعمل، والـ final اتقفل. عشان كده [[this.x]] أو initializer list.

- و [[adult]] مش [[const]]، فـ [[const User.adult('x')]] بيطلّع [[Cannot invoke a non-'const' constructor where a const expression is expected.]] (جربتها).

---

## ٤. [[factory]] و [[fromJson]]

~~~dart
  factory User.fromJson(Map<String, dynamic> json) {
    return User(json['name'] as String, json['age'] as int);
  }
~~~

- [[factory]]: constructor **مش بيعمل object لوحده**. انت اللي لازم ترجّع object بـ [[return]]. ومفيش [[this]] جواه، لأن مفيش object لسه.
- [[Map<String, dynamic> json]]: الـ parameter Map مفاتيحه نصوص، وقيمه [[dynamic]]. [[dynamic]] يعني «أي نوع، ومتفحصش». ودا شكل أي JSON بعد ما يتفك ([[jsonDecode]] بيرجّع كده).
- [[json['name']]]: القيمة نوعها dynamic، فالـ compiler ميعرفش هي إيه.
- [[as String]]: **cast**: «أنا بقولك إنها String». لو طلعت مش String، يرمي error هنا على طول.
- [[return User(...)]]: بينادي الأساسي ويرجّع الناتج.

ليه factory هنا وانت ممكن تعمل نفس الحكاية في دالة عادية؟ لأن الاستخدام بيبقى زي أي constructor: [[User.fromJson(data)]]، وكل الموديلات في Flutter بتتكتب كده.

---

## ٥. الـ fields

~~~dart
  final String name;
  final int age;
}
~~~

الاتنين [[final]]، ودا اللي سمح بـ [[const]] في الأساسي و guest. لو واحد فيهم مش final، [[const User(...)]] مش هيترجم.

---

## ٦. [[main]]

~~~dart
  const g = User.guest();
  final u = User.fromJson({'name': 'Ali', 'age': 30});
  print('$__{g.name} $__{u.name} $__{User.adult('Sara').age}');
~~~

- [[const g]]: object اتعمل وقت الترجمة. وجربت: [[identical(User.guest(), User.guest())]] بـ const الاتنين رجّعت [[true]] (نفس الـ object في الذاكرة)، و [[identical(User('a', 1), User('a', 1))]] من غير const رجّعت [[false]].
- [[{'name': 'Ali', 'age': 30}]]: Map مكتوب على طول، زي JSON.
- [[User.adult('Sara').age]]: اعمل object ونادي age منه في نفس الحتة.

~~~text الناتج
Guest Ali 18
~~~

---

## ٧. لما الـ JSON يبقى غلط

في التجربة بعتنا السن نص: [[{'name': 'Ali', 'age': '30'}]]. الكود **ترجم عادي** (القيم dynamic، محدش فحص)، وضرب وقت التشغيل:

~~~text dart run (الـ solCode)
{name: Ali, age: 30}
Unhandled exception:
type 'String' is not a subtype of type 'int' in type cast
#0      new User.fromJson (file:///w/main.dart:7:53)
#1      main (file:///w/main.dart:19:8)
~~~

- [[type 'String' is not a subtype of type 'int' in type cast]]: «القيمة String، وانت قلت [[as int]]».
- [[new User.fromJson]] و [[7:53]]: الغلطة جوه fromJson، عمود ٥٣ هو [[as int]] بالظبط. يعني [[as]] وقّف القيمة الغلط عند الباب.
- وأول سطر [[{name: Ali, age: 30}]] جه من [[toJson()]] في الـ solCode قبل الغلطة.

---

## ٨. [[toJson]] في الـ solCode

~~~dart
  Map<String, dynamic> toJson() => {'name': name, 'age': age};
~~~

العكس: method عادية بترجّع Map بنفس المفاتيح اللي fromJson بيقراها. والاتنين لازم يتفقوا على أسامي المفاتيح.

---

## الخلاصة

| الشكل | الكود | إمتى |
|---|---|---|
| أساسي | [[User(this.name, this.age)]] | الطريقة العادية |
| named + redirect | [[User.guest() : this('Guest', 0)]] | قيم جاهزة |
| initializer list | [[User.adult(this.name) : age = 18]] | تحط final قبل الجسم |
| factory | [[factory User.fromJson(...) { return ...; }]] | parsing أو cache أو subclass |
| const | [[const User(...)]] | كل الـ fields final، و object واحد لنفس القيم |`,
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
          teach: R`## البرنامج بيعمل إيه؟

دالة بترجّع إحداثيتين مرة واحدة في **record**، ونوع نتيجة ليه حالتين بس ([[Ok]] و [[Failure]])، ودالة بتوصف النتيجة بـ [[switch]] بيفحص شكل البيانات. اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5)، والأخطاء اتجربت بتعديل الملف.

---

## ١. دالة بترجّع record

~~~dart
(double, double) location() => (30.04, 31.23);
~~~

- [[(double, double)]] في مكان نوع الرجوع: **record type**، «قيمتين، الأولى double والتانية double». مش محتاج تعمل class عشان ترجّع حاجتين.
- [[(30.04, 31.23)]]: الـ record نفسه، قيم بين قوسين ومفصولة بـ [[,]].

جربت أطبعه وأقرا أول قيمة:

~~~text الناتج
(30.04, 31.23)
30.04
~~~

التاني جه من [[location().$1]]: الـ positional fields بتتقري بـ [[$1]] و [[$2]] (بتبدأ من 1 مش 0). و record بنفس القيم بيساوي التاني لوحده: [[(1, 2) == (1, 2)]] طلعت [[true]].

---

## ٢. [[sealed class]] و subclasses

~~~dart
sealed class Result {}
class Ok extends Result { Ok(this.data); final String data; }
class Failure extends Result { Failure(this.code); final int code; }
~~~

- [[Result]]: الأب. والـ [[{}]] فاضية: مالوش fields.
- [[extends Result]]: «Ok نوع من Result» (وراثة). أي مكان مستني Result يقبل Ok أو Failure.
- [[sealed]]: «الأبناء كلهم في الملف ده ومفيش غيرهم». فالـ compiler **عارف** إن Result يا Ok يا Failure، ودا اللي هيخليه يمسك الحالة الناقصة تحت. وكمان sealed class مينفعش تعمل منه object مباشرة ([[Result()]]).
- كل subclass مكتوب في سطر: constructor و field.

---

## ٣. [[switch]] كـ expression

~~~dart
String describe(Result r) => switch (r) {
~~~

- [[switch (r)]] بعد [[=>]]: هنا switch **expression** بترجّع قيمة، مش جملة. كل case شكله [[pattern => قيمة,]]، وأول pattern يطابق يكسب.
- وبيخلص بـ [[};]] (القوس وبعده [[;]] لأنه آخر الـ expression).

### case بـ case

~~~dart
  Ok(:var data) => 'got $data',
~~~

[[Ok(...)]] هنا **object pattern**: «لو r نوعه Ok». و [[:var data]] جواه: «خد الـ field اللي اسمه data وحطه في متغير اسمه data». الـ [[:]] قبل الاسم اختصار لـ [[data: var data]].

~~~dart
  Failure(code: 404) => 'not found',
~~~

«لو Failure **و** الـ code بيساوي 404 بالظبط». القيمة الثابتة pattern لوحدها.

~~~dart
  Failure(:var code) when code >= 500 => 'server error $code',
~~~

طلّع code، وبعدين [[when]] (guard): شرط زيادة. لو false، يكمّل للـ case اللي بعده.

~~~dart
  Failure() => 'failed',
};
~~~

أي Failure فاضل (400 مثلًا). جربت الحالات كلها:

~~~text describe(Ok('x')), Failure(404), Failure(400), Failure(503)
[got x, not found, failed, server error 503]
~~~

### exhaustiveness: الـ compiler بيعدّ الحالات

مسحت سطر [[Failure() => 'failed']]:

~~~text dart run
Error: The type 'Result' is not exhaustively matched by the switch cases since it doesn't match 'Failure(code: int())'.
Try adding a wildcard pattern or cases that match 'Failure()'.
~~~

- [[exhaustively]]: «مغطي كل الاحتمالات». الـ compiler لقى Failure كوده مش 404 ومش داخل في when، وكتبلك شكله: [[Failure(code: int())]].
- الـ [[when]] **مش بيتحسب** في التغطية: الـ compiler مش بيحاول يفهم الشرط.

وضفت [[class Loading extends Result {}]] من غير ما ألمس الـ switch:

~~~text dart analyze
The type 'Result' isn't exhaustively matched by the switch cases since it doesn't match the pattern 'Loading()'.
~~~

ودي الفايدة كلها: ضفت حالة، وكل switch ناسيها وقف لحد ما تضيف [[Loading() => 'loading...']] (ده الـ solCode، وطبع [[loading...]]).

---

## ٤. [[main]]: فك record

~~~dart
  final (lat, lng) = location();
~~~

**destructuring**: الشمال pattern فيه متغيرين، فأول قيمة راحت lat والتانية lng. وأنواعهم [[double]] (اتأكدت بـ runtimeType).

~~~dart
  final stats = (total: 10, done: 4);
~~~

record بـ **أسماء**: [[stats.total]] بدل [[$1]]. نوعه اتطبع [[({int done, int total})]]: الـ named جوه [[{ }]]، و Dart بيرتّبهم أبجديًا في الطباعة. وتفكّه بـ [[final (:total, :done) = stats;]] (جربتها وطلعت [[10 4]]).

~~~dart
  print('$lat $lng $__{stats.total - stats.done} $__{describe(Failure(503))}');
~~~

~~~text الناتج
30.04 31.23 6 server error 503
~~~

---

## ٥. pattern مع Map: [[if-case]]

مش في المثال بس هتحتاجه مع JSON:

~~~dart
  if (json case {'name': String name}) print('name=$name');
~~~

«لو json فيه مفتاح name وقيمته String، حطها في name». جربتها على [[{'name': 'Ali'}]] وطلعت [[name=Ali]]، وعلى مفتاح مش موجود ([[{'age': int age}]]) الشرط بقى false بس من غير exception.

---

## الخلاصة

| الحاجة | الشكل | معناها |
|---|---|---|
| record | [[(1, 2)]] أو [[(a: 1, b: 2)]] | أكتر من قيمة من غير class |
| فك | [[final (x, y) = rec;]] | قيمة لكل متغير |
| sealed | [[sealed class Result {}]] | الأبناء معروفين كلهم |
| object pattern | [[Ok(:var data)]] | النوع + طلّع field |
| guard | [[when code >= 500]] | شرط زيادة، مش بيتحسب في التغطية |

> متسكّتش الـ exhaustiveness بـ [[_ => ...]] على sealed class: كده أي حالة جديدة هتعدّي من غير ما الـ compiler يقولك.`,
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
          teach: R`## البرنامج بيعمل إيه؟

دالة بتمثّل طلب API: بتستنى ثانية وترجّع اسم، أو ترمي error لو الـ id سالب. والـ main بتستناها مرة، وبعدين تبعت طلبين مع بعض، وبعدين تمسك الـ error. اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5)، والأوقات تحت متقاسة بـ [[Stopwatch]] فعلًا.

---

## ١. [[Future<String>]] و [[async]]

~~~dart
Future<String> fetchName(int id) async {
~~~

- [[Future<String>]]: «String هيوصل **بعدين**». زي Promise في JavaScript. الدالة مش بترجّع الاسم نفسه، بترجّع وعد بيه.
- [[async]] قبل [[{]]: الدالة دي asynchronous. معناها حاجتين: تقدر تستخدم [[await]] جواها، وأي [[return]] بيتلف تلقائي في Future. فانت بتكتب [[return 'User $id';]] (String) والدالة بترجّع [[Future<String>]].

---

## ٢. [[await Future.delayed]]

~~~dart
  await Future.delayed(const Duration(seconds: 1));
~~~

- [[Duration(seconds: 1)]]: مدة زمنية، ثانية. [[seconds:]] named parameter. و [[const]] لأن القيمة معروفة وقت الترجمة.
- [[Future.delayed(...)]]: Future بيخلص بعد المدة دي. هنا بيمثّل وقت الشبكة.
- [[await]]: «استنى الـ Future ده يخلص، وبعدين كمّل السطر اللي بعده». الاستنا ده **مش بيوقّف البرنامج**: Dart بيسيب الدالة على جنب ويشتغل في حاجات تانية (في Flutter: يرسم الشاشة ويرد على اللمس)، ولما الثانية تخلص يرجع يكمّل.

---

## ٣. [[throw]] جوه async

~~~dart
  if (id < 0) throw FormatException('bad id', id);
  return 'User $id';
}
~~~

- [[throw]]: ارمي error ووقّف الدالة.
- [[FormatException('bad id', id)]]: نوع جاهز في Dart، معناه «البيانات شكلها غلط». أول argument الرسالة ([[message]])، والتاني القيمة اللي سببت المشكلة ([[source]]).
- في دالة async الـ throw مش بيضرب على طول: بيخلّي الـ Future **يفشل**، واللي بيعمل await هو اللي يستلم الـ error.
- [[return 'User $id';]]: لو كله تمام، دي قيمة الـ Future.

---

## ٤. [[main]] نفسها async

~~~dart
Future<void> main() async {
  final name = await fetchName(1);
~~~

- [[Future<void>]]: main بقت async، فبترجّع Future مالوش قيمة ([[void]]). Dart بيستنى الـ Future ده يخلص قبل ما يقفل البرنامج.
- [[await fetchName(1)]]: استنى. name نوعه [[String]] مش Future، لأن await «فك» الـ Future.

جربت أقيس الوقت بعد السطر ده: [[1007ms]]. ثانية + شوية.

### من غير await

ده التجربة التانية في «جرّب». [[final name = fetchName(1);]] و [[print(name);]]:

~~~text الناتج
Instance of 'Future<String>'
~~~

الكود ترجم عادي، بس name بقى الوعد نفسه مش الاسم. ولو كتبت [[fetchName(1).length]]:

~~~text dart run
Error: The getter 'length' isn't defined for the type 'Future<String>'.
~~~

---

## ٥. [[Future.wait]]: اتنين مع بعض

~~~dart
  final both = await Future.wait([fetchName(2), fetchName(3)]);
  print('$name $both');
~~~

نفكّها من جوه لبرة:

1. [[fetchName(2)]] و [[fetchName(3)]]: الاتنين **بيبدأوا دلوقتي** وكل واحد رجّع Future.
2. [[[ ... ]]]: لستة فيها الـ Futures.
3. [[Future.wait(...)]]: Future واحد بيخلص لما **كلهم** يخلصوا، وقيمته لستة النتايج بنفس الترتيب. زي [[Promise.all]].
4. [[await]]: استنى. both نوعه [[List<String>]] (اتطبع كده بـ runtimeType).

الوقت اللي اتقاس بعد الخطوة دي: [[2009ms]] من أول البرنامج، يعني الاتنين خدوا **ثانية واحدة** مع بعض مش اتنين.

~~~text الناتج
User 1 [User 2, User 3]
~~~

### ورا بعض بدل مع بعض (الـ solCode)

~~~text الناتج (solCode)
wait: [User 2, User 3] 1007ms
sequential: [User 2, User 3] 2002ms
Instance of 'Future<String>'
~~~

- [[Stopwatch()..start()]]: ساعة إيقاف، والـ cascade [[..]] بيشغّلها ويرجّعها هي.
- [[sw.elapsedMilliseconds]]: الوقت من ساعة start بالميلي ثانية (1000 = ثانية). و [[sw.reset()]] بيرجّعها صفر.
- [[await]] ورا [[await]]: التاني مبيبدأش غير لما الأول يخلص، فـ ٢ ثانية. نفس النتيجة، ضعف الوقت.

---

## ٦. [[try]] و [[on]] و [[catch]]

~~~dart
  try {
    await fetchName(-1);
  } on FormatException catch (e) {
    print('error: $__{e.message} ($__{e.source})');
  }
}
~~~

- [[try { }]]: «جرّب الكود ده، ولو رمى error متقعش».
- [[await fetchName(-1)]]: الـ Future فشل، والـ await بيحوّل الفشل ده لـ exception عادي في السطر ده. يعني نفس [[try]] بتاعة الكود العادي بتمسكه.
- [[on FormatException]]: امسك النوع ده **بس**. أي نوع تاني يعدّي لفوق.
- [[catch (e)]]: حط الـ error في متغير اسمه e عشان تقرا منه.
- [[e.message]] و [[e.source]]: الرسالة والقيمة اللي اتبعتوا في الـ throw.

~~~text الناتج
error: bad id (-1)
~~~

### لو النوع مش متطابق

جربت [[on ArgumentError]] بدل [[on FormatException]]: الـ catch متنفذش، والـ error عدّى وقفل البرنامج:

~~~text dart run
Unhandled exception:
FormatException: bad id
#0      fetchName (file:///w/main.dart:3:15)
<asynchronous suspension>
~~~

[[<asynchronous suspension>]] في الـ stack trace معناها «هنا الدالة كانت مستنية await».

---

## ٧. ترتيب التنفيذ: event loop

Dart بيشغّل كودك على thread واحد. جربت ده:

~~~dart
  final f = Future.delayed(Duration.zero, () => print('event: delayed zero'));
  scheduleMicrotask(() => print('microtask'));
  print('sync');
~~~

~~~text الناتج
sync
microtask
event: delayed zero
~~~

الكود العادي الأول، وبعدين طابور الـ microtasks (فيه تكملة الـ Futures)، وبعدين طابور الـ events (timers والشبكة واللمس). حتى [[Duration.zero]] بيستنى دوره.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[Future<T>]] | قيمة T هتوصل بعدين |
| [[async]] | الدالة ترجّع Future، وتقدر تعمل await جواها |
| [[await f]] | استنى من غير ما توقّف الشاشة، وخد القيمة |
| [[Future.wait([...])]] | ابدأ الكل مع بعض واستنى الأبطأ |
| [[on Type catch (e)]] | امسك نوع error معين |

> await ورا await للحاجات المستقلة = وقت ضايع. و Future من غير await = قيمة مش هي اللي انت فاكرها.`,
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
          teach: R`## البرنامج بيعمل إيه؟

جزئين: الأول دالة بتطلّع عدّ تنازلي 3 و 2 و 1 و 0، رقم كل ٣٠٠ ميلي ثانية، والـ main بتاخدهم واحد واحد. والتاني [[StreamController]] بنبعت فيه رسالة بإيدنا ومستمع بيستلمها. اتشغّل في [[docker run --rm dart:stable]] (Dart 3.13.5)، والأوقات متقاسة فعلًا.

---

## ١. [[import 'dart:async';]]

~~~dart
import 'dart:async';
~~~

[[import]] بيجيب كود من مكتبة تانية. [[dart:]] في الأول معناها مكتبة جاية مع Dart نفسها. و [[Future]] و [[Stream]] موجودين من غير import، إنما [[StreamController]] لأ، فمحتاجينه.

---

## ٢. [[Stream<int>]] و [[async*]]

~~~dart
Stream<int> countdown(int from) async* {
~~~

- [[Stream<int>]]: «أرقام هتوصل **واحد ورا التاني** على مدار الوقت». الـ Future قيمة واحدة، الـ Stream سلسلة.
- [[async*]] (بالنجمة): الدالة دي **generator** بيطلّع stream. [[async]] من غير نجمة بترجّع Future، و [[async*]] بترجّع Stream.

---

## ٣. الـ loop و [[yield]]

~~~dart
  for (var i = from; i >= 0; i--) {
    await Future.delayed(const Duration(milliseconds: 300));
    yield i;
  }
}
~~~

- [[for (var i = from; i >= 0; i--)]]: الـ for الكلاسيكي بـ ٣ حتت: ابدأ i من [[from]]، كمّل طول ما [[i >= 0]]، وبعد كل لفة [[i--]] (نقّص واحد). فـ i هتبقى 3 ثم 2 ثم 1 ثم 0.
- [[await Future.delayed(...)]]: استنى ٣٠٠ ميلي ثانية من غير ما توقّف حاجة.
- [[yield i]]: «ابعت i للي سامع، **وكمّل** من هنا». مش زي [[return]] اللي بتخلّص الدالة.
- لما الـ loop تخلص والدالة توصل [[}]]، الـ stream بيبعت إشارة «خلصت» (done).

ملحوظة: الدالة مش بتبدأ تشتغل غير لما حد يسمع على الـ stream.

---

## ٤. [[await for]]

~~~dart
Future<void> main() async {
  await for (final n in countdown(3)) print(n);
~~~

- [[for (final n in ...)]] زي اللفة على List، بس [[await]] قبلها معناها «كل عنصر استناه لحد ما يوصل».
- الـ loop **مش بتخلص** غير لما الـ stream يبعت done. فالسطر اللي بعدها بيستنى العدّ كله.

حطيت وقت جنب كل رقم:

~~~text الناتج
3 316ms
2 619ms
1 920ms
0 1221ms
~~~

كل رقم بعد التاني بـ ٣٠٠ms تقريبًا. والـ ١٦ms الزيادة في الأول وقت تشغيل البرنامج نفسه.

---

## ٥. [[StreamController]]

~~~dart
  final controller = StreamController<String>();
~~~

الـ [[async*]] بتعمل stream من كود. إنما لو القيم جاية من برّه (رسالة وصلت، زرار اتداس) بتحتاج controller: object ليه طرفين:

| الطرف | بتعمل بيه إيه |
|---|---|
| [[controller.add(x)]] | تبعت قيمة |
| [[controller.stream]] | الـ Stream اللي الناس بتسمع عليه |
| [[controller.close()]] | تقفل وتبعت done |

---

## ٦. [[listen]] و subscription

~~~dart
  final sub = controller.stream.listen((msg) => print('got $msg'));
  controller.add('hello');
~~~

- [[listen(...)]]: سجّل دالة تتنادى مع كل قيمة. الـ [[(msg) => print(...)]] دالة من غير اسم.
- [[listen]] بترجّع [[StreamSubscription]]، خزّناها في sub عشان نقفلها بعدين.
- [[add('hello')]]: ابعت قيمة.

### القيمة مش بتوصل في نفس اللحظة

جربت [[print('after add')]] بعد الـ add على طول، و [[onDone]] في الـ listen:

~~~text الناتج
after add
got hello
done
closed
~~~

[[after add]] اتطبعت **قبل** [[got hello]]: الـ controller مش بينادي المستمع جوه add، بيحط القيمة في الطابور وبتوصل بعد الكود العادي ما يخلص (زي ما شفنا في درس «async و await»).

---

## ٧. القفل

~~~dart
  await controller.close();
  await sub.cancel();
}
~~~

- [[close()]]: مفيش قيم تاني، والمستمعين ياخدوا done. بترجّع Future فبنعمل await.
- [[sub.cancel()]]: الغي الاشتراك. هنا الـ stream خلص أصلًا، بس العادة دي هي اللي هتحميك في Flutter: لو عملت listen في [[initState]]، لازم [[cancel]] في [[dispose]]، وإلا الدالة تفضل تتنادى بعد ما الشاشة تتقفل.

~~~text الناتج الكامل
3
2
1
0
got hello
~~~

---

## ٨. مستمعين اتنين: single-subscription و broadcast

جربت listen تاني على نفس [[controller.stream]] (سطر جديد بعد سطر الـ sub). العدّ 3 2 1 0 اتطبع عادي، وبعدين:

~~~text dart run
Unhandled exception:
Bad state: Stream has already been listened to.
#0      _StreamController._subscribe (dart:async/stream_controller.dart:695:7)
...
#3      main (file:///w/main.dart:14:21)
~~~

- [[Bad state]]: العملية مش مسموحة في الحالة دي.
- الـ StreamController العادي **single-subscription**: مستمع واحد بس طول عمره. والـ stack بيشاور على سطر الـ listen التاني.

والحل في الـ solCode: [[StreamController<String>.broadcast()]] (named constructor). أي عدد يسمع:

~~~text الناتج (solCode)
got hello
second hello
~~~

بس الـ broadcast مش بيحفظ قيم: اللي يعمل listen بعد الـ add مش هياخدها.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[Stream<T>]] | قيم كتير على مدار الوقت |
| [[async*]] + [[yield]] | دالة بتطلّع stream، و yield تبعت وتكمّل |
| [[await for]] | خد القيم واحدة واحدة، والـ loop تخلص مع done |
| [[StreamController]] | تبعت فيه بإيدك بـ add، والناس تسمع على stream |
| [[listen]] / [[cancel]] | اشترك / الغي (في Flutter: initState / dispose) |
| [[.broadcast()]] | أكتر من مستمع، ومن غير حفظ للقديم |`,
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
