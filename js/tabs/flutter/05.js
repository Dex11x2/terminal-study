// تكملة تاب flutter: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/flutter/01.js (شرح حقول الدرس في أوله)
MORE("flutter", [
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
    }
]);
