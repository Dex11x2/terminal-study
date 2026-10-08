// تكملة تاب flutter: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/flutter/01.js (شرح حقول الدرس في أوله)
MORE("flutter", [
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
          teach: R`## الأوامر دي بتعمل إيه؟

٨ أوامر بالترتيب اللي بتعمله قبل أي release: تنضّف، وتنزّل الـ packages، وتختبر، وتبني الـ AAB اللي بيترفع على Play، وبعدين APK للتوزيع بره Play، وتقرير بالحجم. كلهم اتشغّلوا بجد في [[ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44.0، والصورة فيها Android SDK 36 و Java 21، يعني [[flutter doctor]] قال Android toolchain ✓) على مشروع [[flutter create]] اسمه [[shop]] وفيه [[env/prod.json]].

---

## ١. [[flutter clean]]

~~~text الناتج
Deleting ephemeral...                                                8ms
Deleting .flutter-plugins-dependencies...                            1ms
~~~

بيمسح فولدر [[build/]] و [[.dart_tool/]] والملفات المؤقتة اللي Flutter بيولّدها لكل منصة ([[ephemeral]]). المرة الجاية Gradle هيبني من الصفر. مهم بعد ما تعدّل [[build.gradle.kts]] أو flavors، عشان ميبنيش بإعدادات قديمة متخزنة.

## ٢. [[flutter pub get]]

~~~text الناتج
Got dependencies!
~~~

[[clean]] مسح [[.dart_tool/package_config.json]] (اللي بيقول كل package مكانها فين)، فلازم ينزل تاني.

## ٣. [[flutter test]]

~~~text الناتج
00:01 +2: All tests passed!
~~~

[[+2]] عدد الاختبارات اللي عدّت. لو أي اختبار وقع، متبنيش release.

---

## ٤. [[flutter build appbundle --release --dart-define-from-file=env/prod.json]]

- [[build appbundle]]: ابني Android App Bundle.
- [[--release]]: Dart بيتترجم AOT (Ahead Of Time: لكود الآلة قبل التشغيل) من غير أدوات الـ debug. ده الافتراضي أصلًا لـ appbundle، بس كتابته بتوضح.
- [[--dart-define-from-file=env/prod.json]]: قيم الإنتاج (درس «dart-define و flavors»).

~~~text الناتج
Running Gradle task 'bundleRelease'...                            185.2s
✓ Built build/app/outputs/bundle/release/app-release.aab (43.7MB)
~~~

[[bundleRelease]] اسم الـ task اللي Flutter طلبه من Gradle. والـ ٣ دقايق دي لأن [[clean]] مسح كل حاجة.

### ليه ٤٣ ميجا؟

الـ AAB ملف zip، فبصيت جواه بـ [[unzip -l]]:

~~~text الناتج (مختصر)
  2687888  base/lib/arm64-v8a/libapp.so
 11579872  base/lib/arm64-v8a/libflutter.so
  2884172  base/lib/armeabi-v7a/libapp.so
  8451900  base/lib/armeabi-v7a/libflutter.so
  2753424  base/lib/x86_64/libapp.so
 12856776  base/lib/x86_64/libflutter.so
  3109056  BUNDLE-METADATA/com.android.tools.build.debugsymbols/arm64-v8a/libapp.so.sym
 18511576  BUNDLE-METADATA/com.android.tools.build.debugsymbols/arm64-v8a/libflutter.so.sym
  ...
~~~

- [[libapp.so]]: كودك Dart مترجم. [[libflutter.so]]: الـ engine. ونسخة من الاتنين لكل معالج: [[arm64-v8a]] (أغلب الموبايلات)، و [[armeabi-v7a]] (الموبايلات القديمة ٣٢ بت)، و [[x86_64]] (الـ emulators وأجهزة Chromebook).
- [[BUNDLE-METADATA/...debugsymbols]]: رموز debug بيستخدمها Play Console عشان يقرا الـ native crashes. مبتروحش للموبايل.

فالرقم ده مش اللي المستخدم بينزّله (درس «Play internal testing» بيقيس ده بـ bundletool).

---

## ٥. النسخة و obfuscate

~~~bash
flutter build appbundle --build-name=1.2.0 --build-number=5 --obfuscate --split-debug-info=build/symbols
~~~

- [[--build-name=1.2.0]]: الـ versionName (اللي المستخدم بيشوفه). بيغطّي على اللي قبل [[+]] في [[version: 1.0.0+1]] في pubspec، للـ build ده بس (الملف نفسه مبيتغيرش).
- [[--build-number=5]]: الـ versionCode، الرقم اللي لازم يزيد مع كل رفعة.
- [[--obfuscate]]: أسماء الـ classes والدوال في الكود المترجم تبقى عشوائية.
- [[--split-debug-info=build/symbols]]: لازم مع obfuscate. بيطلّع رموز الـ debug بره التطبيق في الفولدر ده.

~~~text الناتج
Running Gradle task 'bundleRelease'...                             86.2s
✓ Built build/app/outputs/bundle/release/app-release.aab (42.1MB)
~~~

أسرع (٨٦ ثانية) لأن Gradle عنده cache من المرة اللي فاتت، وأصغر بـ ١.٦ ميجا لأن الرموز طلعت بره. والفولدر:

~~~text ls -l build/symbols
-rw-r--r-- 1 root root 1463512 app.android-arm64.symbols
-rw-r--r-- 1 root root 1232532 app.android-arm.symbols
-rw-r--r-- 1 root root 1462856 app.android-x64.symbols
~~~

ملف لكل معالج. دول اللي [[flutter symbolize -i trace.txt -d build/symbols/app.android-arm64.symbols]] محتاجهم عشان يرجّع الأسماء الحقيقية في stack trace جاي من مستخدم (الأمر ده من docs Flutter، لأن مفيش crash حقيقي هنا). احفظهم مع كل release.

## ٦. [[ls -lh build/app/outputs/bundle/release/app-release.aab]]

~~~text الناتج
-rw-r--r-- 1 root root 41M Oct  7 19:58 build/app/outputs/bundle/release/app-release.aab
~~~

[[-l]] تفاصيل، و [[-h]] الحجم بوحدات مقروءة. [[41M]] هنا و [[42.1MB]] في Flutter نفس الحجم: [[ls]] بيقسم على ١٠٢٤×١٠٢٤ و Flutter على مليون.

---

## ٧. [[flutter build apk]] و [[--split-per-abi]]

قبل الـ split، بنيت APK عادي للمقارنة:

~~~text flutter build apk
✓ Built build/app/outputs/flutter-apk/app-release.apk (43.4MB)
~~~

ده «fat APK»: فيه الـ ٣ معالجات. وبعدين:

~~~text flutter build apk --split-per-abi
✓ Built build/app/outputs/flutter-apk/app-armeabi-v7a-release.apk (12.5MB)
✓ Built build/app/outputs/flutter-apk/app-arm64-v8a-release.apk (15.3MB)
✓ Built build/app/outputs/flutter-apk/app-x86_64-release.apk (16.7MB)
~~~

ABI = Application Binary Interface، يعني نوع المعالج. كل APK فيه معالج واحد، فحوالي تلت الحجم. ولو بتبعت التطبيق لحد بره Play، ابعتله [[arm64-v8a]].

### الـ versionCode اتغير لوحده

قريت الـ manifest بـ [[aapt2 dump badging]] (من Android SDK build-tools):

~~~text الناتج
app-release.apk              versionCode='1'
app-armeabi-v7a-release.apk  versionCode='1001'
app-arm64-v8a-release.apk    versionCode='2001'
app-x86_64-release.apk       versionCode='4001'
minSdkVersion:'24'
targetSdkVersion:'36'
~~~

مع [[--split-per-abi]] Flutter بيضيف رقم لكل معالج (١٠٠٠ و ٢٠٠٠ و ٤٠٠٠) فوق الـ versionCode بتاعك، عشان الـ ٣ ملفات ميبقاش ليهم نفس الرقم. و [[minSdk 24]] و [[targetSdk 36]] هما الافتراضي في Flutter ده (من [[flutter.minSdkVersion]] و [[flutter.targetSdkVersion]] في build.gradle.kts).

---

## ٨. [[flutter build appbundle --analyze-size --target-platform android-arm64]]

- [[--analyze-size]]: اطبع حجم كل حاجة جوه التطبيق.
- [[--target-platform android-arm64]]: معالج واحد بس، لأن التقرير بيحلل الكود المترجم لمعالج واحد.

~~~text الناتج (مختصر)
    dex                                                                   230 KB
    lib                                                                     6 MB
    Dart AOT symbols accounted decompressed size                            3 MB
      package:flutter                                                       1 MB
      dart:core                                                           240 KB
      ...
      package:shop/
        main.dart                                                           2 KB
    res                                                                    26 KB
A summary of your AAB analysis can be found at: /root/.flutter-devtools/aab-code-size-analysis_01.json

To analyze your app size in Dart DevTools, run the following command:
dart devtools --appSizeBase=/root/.flutter-devtools/aab-code-size-analysis_01.json
✓ Built build/app/outputs/bundle/release/app-release.aab (15.6MB)
~~~

- [[dex]]: كود Java/Kotlin (الـ embedding و plugins). [[lib]]: الـ [[.so]]. [[res]]: الصور والـ XML.
- تحت [[Dart AOT symbols]]: كل package وحجمها. كود تطبيقك ([[main.dart]]) ٢ كيلو بس، والباقي Flutter و Dart نفسهم. في تطبيق حقيقي هنا بتلاقي الـ package اللي تقيلة.
- الـ JSON بيتفتح في DevTools كرسم مربعات تقدر تدخل جواها.
- والـ AAB هنا ١٥.٦ ميجا لأنه arm64 بس.

---

## ٩. وللمقارنة: الويب

~~~bash
flutter build web --release --dart-define-from-file=env/prod.json
~~~

~~~text الناتج (مختصر)
Font asset "MaterialIcons-Regular.otf" was tree-shaken, reducing it from 1645184 to 7800 bytes (99.5% reduction).
✓ Built build/web
~~~

~~~text الأحجام (du -sh و ls -l)
40M   build/web
37M   build/web/canvaskit
1.4M  build/web/assets
1885215  main.dart.js
~~~

[[tree-shaken]]: Flutter شال كل الأيقونات اللي الكود مبيستخدمهاش من الخط، فبقى ٧ كيلو بدل ١.٦ ميجا (ونفس الكلام بيحصل في الـ APK). و [[canvaskit]] فيه أكتر من نسخة من محرك الرسم (WASM)، والمتصفح بينزّل واحدة بس، و [[main.dart.js]] (١.٨ ميجا) هو كودك وكود Flutter مترجم JavaScript.

---

## الحاجات اللي ماتجربتش هنا

- رفع versionCode أقل: Play Console بيرفض، و [[adb install -r]] بيدّي [[INSTALL_FAILED_VERSION_DOWNGRADE]]. ده من docs Android لأن مفيش موبايل متوصل بالـ container.
- [[flutter symbolize]] من docs Flutter.

## الخلاصة

| الأمر | الناتج هنا |
|---|---|
| [[flutter clean]] + [[pub get]] + [[test]] | بداية نضيفة واختبارات عدّت |
| [[build appbundle --release]] | AAB ٤٣.٧ ميجا (٣ معالجات + رموز debug) |
| [[--build-name --build-number --obfuscate --split-debug-info]] | ٤٢.١ ميجا وفولدر symbols فيه ملف لكل معالج |
| [[build apk]] / [[--split-per-abi]] | ٤٣.٤ ميجا / ١٢.٥ و ١٥.٣ و ١٦.٧ ميجا |
| [[--analyze-size --target-platform android-arm64]] | تقرير حجم + JSON لـ DevTools |

- حجم الـ AAB مش حجم التنزيل.
- [[--build-number]] لازم يزيد مع كل رفعة، و [[--split-per-abi]] بيزوّد عليه ١٠٠٠ أو ٢٠٠٠ أو ٤٠٠٠.
- obfuscate من غير حفظ فولدر symbols يعني crashes متتقريش.`,
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
// 2) android/key.properties (تيمبليت flutter create الحالي بيتجاهله أصلًا في android/.gitignore، اتأكد إن السطر موجود):
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
          teach: R`## الكود ده بيعمل إيه؟

٣ خطوات: تعمل مفتاح (keystore) مرة واحدة، وتكتب الباسوردات في ملف Git بيتجاهله، وتخلي Gradle يقرا الملف ده ويوقّع بيه نسخة الـ release بدل مفتاح debug. اتعمل كله بجد في [[ghcr.io/cirruslabs/flutter:stable]] (Flutter 3.44.0، Java 21، AGP 9.0.1) بباسورد تجربة [[test123456]]، والرفع على Play من الـ docs.

---

## ١. [[keytool -genkey]]

~~~bash
keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
~~~

[[keytool]] أداة جاية مع Java بتعمل وتقرا المفاتيح والشهادات.

| الجزء | معناه |
|---|---|
| [[-genkey]] | اعمل مفتاح جديد (زوج public و private) وشهادة |
| [[-v]] | verbose: اطبع تفاصيل |
| [[-keystore ~/upload-keystore.jks]] | الملف اللي هيتحفظ فيه، و [[~]] فولدر الـ home |
| [[-keyalg RSA -keysize 2048]] | نوع المفتاح وطوله بالـ bits |
| [[-validity 10000]] | صالح ١٠٠٠٠ يوم (حوالي ٢٧ سنة). Play بيطلب صلاحية لبعد ٢٠٣٣ |
| [[-alias upload]] | اسم المفتاح جوه الملف (الملف ممكن يشيل أكتر من مفتاح) |

الأمر ده بيسأل عن الباسورد واسمك وبلدك. عشان يتشغّل من غير أسئلة ضفت [[-storepass test123456 -keypass test123456 -dname "CN=Ali, O=Shop, C=EG"]]:

~~~text الناتج
Generating 2,048 bit RSA key pair and self-signed certificate (SHA384withRSA) with a validity of 10,000 days
	for: CN=Ali, O=Shop, C=EG
[Storing /root/upload-keystore.jks]
~~~

[[self-signed]]: الشهادة موقّعة بنفس المفتاح، ودا الطبيعي في Android (مش زي HTTPS). و [[CN]] الاسم، و [[O]] الشركة، و [[C]] البلد.

---

## ٢. [[android/key.properties]]

~~~text android/key.properties
storePassword=test123456
keyPassword=test123456
keyAlias=upload
storeFile=/root/upload-keystore.jks
~~~

ملف [[.properties]]: سطور [[key=value]]. ويندوز: [[storeFile=C:\\Users\\ali\\upload-keystore.jks]] بـ backslash مزدوج.

هل Git هيشوفه؟

~~~bash
git check-ignore -v android/key.properties
~~~

~~~text الناتج
android/.gitignore:12:key.properties	android/key.properties
~~~

[[check-ignore -v]] بيقول أنهي قاعدة بتتجاهل الملف: السطر ١٢ في [[android/.gitignore]]. تيمبليت [[flutter create]] الحالي فيه أصلًا [[key.properties]] و [[**/*.keystore]] و [[**/*.jks]]. لو مشروعك قديم ومفيهوش، ضيفهم قبل أول commit.

---

## ٣. [[build.gradle.kts]]: قراية الملف

~~~text android/app/build.gradle.kts (فوق)
import java.io.FileInputStream
import java.util.Properties

val keystoreProperties = Properties()
val keystorePropertiesFile = rootProject.file("key.properties")
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(FileInputStream(keystorePropertiesFile))
}
~~~

الملف ده Kotlin (الـ [[.kts]] = Kotlin script).

- [[import]]: لازم في أول الملف خالص، قبل [[plugins { }]].
- [[val]]: متغير مبيتغيرش. و [[Properties()]] class من Java بيقرا ملفات [[key=value]]، وبيبدأ فاضي.
- [[rootProject.file("key.properties")]]: [[rootProject]] هو فولدر [[android/]]، فده [[android/key.properties]].
- [[if (...exists())]]: اقرا بس لو الملف موجود، عشان زميلك اللي معندوش الملف يقدر يبني debug.
- [[FileInputStream(...)]]: افتح الملف للقراية، و [[.load(...)]] حمّل السطور جوه الـ Properties.

## ٤. [[signingConfigs]]

~~~text جوه android { }
signingConfigs {
    create("release") {
        keyAlias = keystoreProperties.getProperty("keyAlias")
        keyPassword = keystoreProperties.getProperty("keyPassword")
        storeFile = keystoreProperties.getProperty("storeFile")?.let { file(it) }
        storePassword = keystoreProperties.getProperty("storePassword")
    }
}
~~~

- [[create("release")]]: إعداد توقيع جديد اسمه release (فيه واحد اسمه debug موجود لوحده).
- [[getProperty("keyAlias")]]: هات القيمة من الملف، أو [[null]] لو مش موجودة.
- [[?.let { file(it) }]]: [[?.]] يعني «لو مش null بس». و [[let]] بتاخد القيمة في [[it]]، و [[file(it)]] بيحوّل النص لملف. فلو مفيش storeFile، النتيجة null من غير crash في الـ configuration.

## ٥. [[buildTypes]]

~~~text
buildTypes {
    release {
        signingConfig = signingConfigs.getByName("release")
    }
}
~~~

التيمبليت كان فيه [[signingConfigs.getByName("debug")]] وتعليق [[Signing with the debug keys for now, so flutter run --release works]]. التغيير ده هو اللي بيخلي الـ release يتوقّع بمفتاحك.

---

## ٦. البناء والتأكد

~~~text flutter build appbundle
Running Gradle task 'bundleRelease'...                             59.9s
✓ Built build/app/outputs/bundle/release/app-release.aab (43.7MB)
~~~

### مين وقّع الملف؟

~~~bash
keytool -printcert -jarfile build/app/outputs/bundle/release/app-release.aab
~~~

[[-printcert -jarfile]]: اطبع شهادة اللي وقّع الملف ده (AAB و APK بيتوقّعوا بنفس طريقة ملفات JAR).

~~~text الناتج (مختصر)
Signer #1:
Certificate #1:
Owner: CN=Ali, O=Shop, C=EG
Valid from: Wed Oct 07 20:02:59 GMT 2026 until: Sun Feb 22 20:02:59 GMT 2054
Certificate fingerprints:
	 SHA1: 38:34:37:C2:97:70:FB:45:F2:D5:6B:47:EC:6D:D3:E5:45:A0:FF:C8
	 SHA256: 67:F4:A9:2C:79:98:DE:2E:27:11:78:82:4D:69:5F:F5:90:17:F9:CD:9F:BB:03:31:97:DA:A5:70:C8:67:B7:49
~~~

### قارنه بالـ keystore

~~~bash
keytool -list -v -keystore ~/upload-keystore.jks
~~~

~~~text الناتج (مختصر)
Keystore type: PKCS12
Alias name: upload
Owner: CN=Ali, O=Shop, C=EG
	 SHA256: 67:F4:A9:2C:79:98:DE:2E:27:11:78:82:4D:69:5F:F5:90:17:F9:CD:9F:BB:03:31:97:DA:A5:70:C8:67:B7:49
~~~

نفس الـ SHA256، فالتوقيع بمفتاحك. الـ fingerprint (بصمة) ده hash للشهادة: رقم قصير بيميّزها. ومفتاح debug ([[~/.android/debug.keystore]] بباسورد [[android]]) بصمته [[BD:B4:F5:91:...]] مختلفة خالص. لو لقيتها هي اللي في الـ AAB، يبقى نسيت تغيّر buildTypes.

و [[Keystore type: PKCS12]] رغم إن الامتداد [[.jks]]: Java 9 وفوق بيعمل PKCS12 افتراضيًا، والامتداد مجرد اسم. Gradle بيقرا الاتنين.

### من غير key.properties

غيّرت اسم الملف مؤقتًا وبنيت release:

~~~text الناتج (مختصر)
* What went wrong:
Execution failed for task ':app:signReleaseBundle'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.FinalizeBundleTask$BundleToolRunnable
   > java.lang.NullPointerException (no error message)
~~~

[[signReleaseBundle]] هي خطوة التوقيع، و [[storeFile]] كان null. وتحتها Flutter عرض صندوق «Flutter Fix» بيتكلم عن AGP 9 و [[android.newDsl]]: ملوش علاقة، متصدّقوش. ومن غير الملف برضه [[flutter build apk --debug]] اتبنى عادي ([[✓ Built build/app/outputs/flutter-apk/app-debug.apk]]) بفضل [[exists()]].

---

## الخلاصة

| الخطوة | فين | ليه |
|---|---|---|
| [[keytool -genkey ... -alias upload]] | مرة واحدة على جهازك | المفتاح نفسه، احفظ منه backup |
| [[key.properties]] | [[android/]] ومتجاهَل في Git | الباسوردات بره الكود |
| [[Properties().load(...)]] | build.gradle.kts | يقرا الملف لو موجود |
| [[signingConfigs.create("release")]] | جوه android | إعداد التوقيع |
| [[getByName("release")]] في buildTypes | جوه android | الـ release يتوقّع بيه بدل debug |
| [[keytool -printcert -jarfile]] | بعد البناء | تتأكد بالـ SHA256 |

- مع Play App Signing ده «upload key» بس، و Google بيوقّع للمستخدمين بمفتاح تاني (Firebase و Google Sign-In محتاجين SHA بتاعه من Play Console).
- الـ release من غير الملف بيقع في [[signReleaseBundle]] بـ NullPointerException، والـ debug يفضل شغال.`,
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

من غير key.properties: الـ release build بيفشل في مرحلة التوقيع: [[Execution failed for task ':app:signReleaseBundle']] وتحتها [[java.lang.NullPointerException (no error message)]] (لأن storeFile بقى null)، و Flutter بيعرض تحتها صندوق «Flutter Fix» عن AGP 9 ملوش علاقة بالمشكلة. و debug بيشتغل عادي بفضل [[exists()]]. دا السلوك اللي عايزه: محدش يبني release بالغلط من غير المفتاح.

(اتجرّب في [[ghcr.io/cirruslabs/flutter:stable]] بـ Flutter 3.44.0 و AGP 9.0.1. والرفع على Play و Play App Signing من الـ docs.)`
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
          teach: R`## الأوامر دي بتعمل إيه؟

قبل ما ترفع الـ AAB على Play، بتعمل بنفسك اللي Play هيعمله: تقسّمه APKs لكل نوع موبايل، وتسطّبها، وتعرف المستخدم هينزّل قد إيه. ده بـ [[bundletool]]، أداة Google اللي Play نفسه بيستخدمها. وبعدها خطوات Play Console (دي من الـ docs، محتاجة حساب).

اتشغّل في [[ghcr.io/cirruslabs/flutter:stable]] (Java 21) بـ bundletool 1.18.3 (نزّلت [[bundletool-all-1.18.3.jar]] من صفحة releases وسمّيته [[bundletool.jar]])، على الـ AAB الموقّع من الدرس اللي فات (٤٣.٧ ميجا).

---

## ١. [[build-apks]]

~~~bash
java -jar bundletool.jar build-apks --bundle=build/app/outputs/bundle/release/app-release.aab --output=app.apks --ks=$HOME/upload-keystore.jks --ks-key-alias=upload
~~~

- [[java -jar bundletool.jar]]: شغّل برنامج Java متغلّف في ملف JAR.
- [[build-apks]]: الأمر الفرعي: طلّع APKs من bundle.
- [[--bundle=...]]: الـ AAB.
- [[--output=app.apks]]: الناتج. [[.apks]] ملف zip فيه كل الـ APKs.
- [[--ks=$HOME/upload-keystore.jks]]: الـ keystore اللي هيوقّع بيه. [[$HOME]] متغير فيه فولدر الـ home. من غير توقيع Android مش هيسطّب.
- [[--ks-key-alias=upload]]: اسم المفتاح جوه الـ keystore.

الأمر بالشكل ده بيسألك على باسورد الـ keystore. عشان يتشغّل في سكريبت ضفت [[--ks-pass=pass:test123456]] ([[pass:]] معناها الباسورد مكتوب بعدها، وفيه [[file:]] لو في ملف).

~~~text ls -l app.apks
-rw-r--r-- 1 root root 131269148 app.apks
~~~

١٣١ ميجا، أكبر من الـ AAB نفسه! بص جواه:

~~~text unzip -l app.apks (مختصر)
     2757  toc.pb
 14766309  splits/base-arm64_v8a.apk
 14766309  splits/base-arm64_v8a_2.apk
 14766309  splits/base-arm64_v8a_3.apk
 12013801  splits/base-armeabi_v7a.apk
    12783  splits/base-hdpi.apk
   513543  splits/base-master.apk
   800263  splits/base-master_2.apk
 16171231  splits/base-x86_64.apk
    12787  splits/base-xhdpi.apk
  ...
~~~

- [[base-master.apk]]: الجزء المشترك (الكود Java و الـ manifest والـ assets).
- [[base-arm64_v8a.apk]] وأخواتها: الـ [[.so]] لمعالج واحد.
- [[base-hdpi.apk]] و [[xhdpi]] و ...: الصور لكثافة شاشة واحدة.
- [[_2]] و [[_3]]: نفس الأجزاء لنطاقات Android مختلفة (هتبان تحت).
- [[toc.pb]]: الفهرس اللي بيقول أنهي APK لأنهي موبايل.

الموبايل الواحد بياخد [[master]] + معالجه + كثافته بس.

## ٢. [[get-size total]]

~~~bash
java -jar bundletool.jar get-size total --apks=app.apks
~~~

~~~text الناتج
MIN,MAX
6572922,7334608
~~~

بالـ bytes، ودا حجم **التنزيل** (مضغوط): من ٦.٦ لـ ٧.٣ ميجا حسب الموبايل، قصاد ٤٣.٧ ميجا للـ AAB. ولو عايز التفاصيل:

~~~bash
java -jar bundletool.jar get-size total --apks=app.apks --dimensions=SDK,ABI
~~~

~~~text الناتج (مختصر)
SDK,ABI,MIN,MAX
24-28,armeabi-v7a,6572922,6575086
24-28,arm64-v8a,7166794,7168958
29-31,arm64-v8a,7168935,7171098
32-,arm64-v8a,7168936,7171096
32-,x86_64,7332443,7334603
~~~

[[SDK]] نطاق نسخ Android (24-28 يعني Android 7 لـ 9، و [[32-]] يعني 12L وفوق): ده سبب [[_2]] و [[_3]]. موبايل arm64 حديث بينزّل حوالي ٧.٢ ميجا.

## ٣. [[install-apks]]

~~~bash
java -jar bundletool.jar install-apks --apks=app.apks
~~~

بيسأل الموبايل المتوصل بـ adb عن معالجه وكثافته ونسخة Android، ويسطّب الـ splits المناسبة بس. هنا مفيش موبايل متوصل بالـ container، فده اللي طلع:

~~~text الناتج
E/adb: * daemon not running; starting now at tcp:5037
E/adb: * daemon started successfully
[BT:1.18.3] Error: No connected devices found.
~~~

يعني الأمر شغّل adb ودوّر ملقاش. على جهازك مع موبايل فيه USB debugging هيسطّب التطبيق كأنه نازل من Play.

---

## ٤. Play Console (من الـ docs)

الخطوات اللي في تعليقات المثال، بالترتيب:

| الخطوة | فين |
|---|---|
| ١. Create app: الاسم واللغة وتطبيق ولا لعبة ومجاني ولا لأ | الصفحة الرئيسية |
| ٢. App content: Privacy policy و Data safety و Content rating و Target audience | Policy ← App content |
| ٣. Create new release وارفع [[app-release.aab]] | Testing ← Internal testing |
| ٤. Testers: قايمة إيميلات | نفس الصفحة، تاب Testers |
| ٥. انسخ opt-in link وابعته | Testers |
| ٦. كل tester يفتح اللينك ويوافق ويسطّب من Play | موبايل الـ tester |

وأول رفعة لازم يدوي من الموقع، وبعدها ممكن من CI.

---

## الخلاصة

- [[build-apks]] بيعمل اللي Play بيعمله: APKs مقسومة (master + معالج + كثافة) لكل نطاق Android، وموقّعة بـ [[--ks]].
- [[get-size total]] هو الرقم الحقيقي للتنزيل: هنا حوالي ٧ ميجا قصاد AAB ٤٣.٧.
- [[install-apks]] محتاج موبايل متوصل بـ adb.
- internal testing الأول، وبعدها promote لنفس النسخة.`,
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
          teach: R`## الأوامر دي بتعمل إيه؟

بتفتح المشروع في Xcode عشان تظبط التوقيع، وتبني نسخة الـ App Store، وتشوف الناتج، وتفتحه في Xcode عشان ترفعه. وفي الآخر مثال على صلاحية في [[Info.plist]].

الأوامر دي بتشتغل على Mac بس، فالناتج بتاعها من docs Flutter و Apple. اللي اتجرّب بجد (في [[ghcr.io/cirruslabs/flutter:stable]] على لينكس، Flutter 3.44.0) هو: إن الأمر مش موجود على لينكس أصلًا، وقراية ملفات [[ios/]] في مشروع [[flutter create]].

---

## الأول: ليه Mac؟

على لينكس:

~~~bash
flutter build ipa
~~~

~~~text الناتج
Could not find a subcommand named "ipa" for "flutter build".

Did you mean one of these?
  apk
~~~

و [[flutter build -h]] على نفس الجهاز بيعرض [[aar]] و [[apk]] و [[appbundle]] و [[bundle]] و [[linux]] و [[web]] بس. Flutter بيخفي [[ipa]] و [[ios]] لأن البناء محتاج Xcode، و Xcode على macOS بس. ونفس الكلام على ويندوز.

---

## ١. [[open ios/Runner.xcworkspace]]

- [[open]]: أمر macOS بيفتح الملف بالبرنامج بتاعه (هنا Xcode). زي ما تدوس عليه دبل كليك.
- [[Runner]]: اسم مشروع iOS اللي Flutter بيعمله.
- [[.xcworkspace]] مش [[.xcodeproj]]: الـ workspace بيضم مشروعك + الـ dependencies (Pods). لو فتحت الـ project لوحده، الـ plugins مش هتتبني.

~~~text ls ios (من مشروع flutter create)
Flutter  Runner  RunnerTests  Runner.xcodeproj  Runner.xcworkspace
~~~

في Xcode: Runner ← Signing & Capabilities ← Team (حسابك) و Automatically manage signing. والـ Bundle Identifier متسجّل في المشروع:

~~~text grep في ios/Runner.xcodeproj/project.pbxproj
PRODUCT_BUNDLE_IDENTIFIER = com.shop.shop;
~~~

ده نفس الـ id اللي هتعمل بيه التطبيق في App Store Connect، ولازم يتطابقوا.

## ٢. [[flutter build ipa --release --dart-define-from-file=env/prod.json]]

- [[ipa]] = iOS App Store Package، الملف اللي بيترفع.
- [[--release]] و [[--dart-define-from-file]]: نفس معناهم في Android.

الأمر بيعمل Xcode archive، وبعدين يصدّر منه [[.ipa]] لو التوقيع سليم. ورقم النسخة جاي من pubspec برضه:

~~~text من ios/Runner/Info.plist
<key>CFBundleShortVersionString</key>
<string>$(FLUTTER_BUILD_NAME)</string>
<key>CFBundleVersion</key>
<string>$(FLUTTER_BUILD_NUMBER)</string>
~~~

[[$(...)]] متغيرات بيملاها Xcode وقت البناء: [[FLUTTER_BUILD_NAME]] هو اللي قبل [[+]] في [[version:]]، و [[FLUTTER_BUILD_NUMBER]] اللي بعدها (نفس [[--build-name]] و [[--build-number]]).

## ٣. [[ls build/ios/ipa/]]

حسب الـ docs بتلاقي [[<اسم التطبيق>.ipa]] وملفات التصدير. لو مفيش ipa، يبقى التوقيع فيه مشكلة واقرا رسالة الـ build.

## ٤. [[open build/ios/archive/Runner.xcarchive]]

بيفتح الـ archive في Xcode Organizer. هناك: Validate App (فحص قبل الرفع)، و Distribute App ← App Store Connect. أو ترفع الـ ipa بتطبيق Transporter من الـ Mac App Store.

---

## ٥. الصلاحيات في [[Info.plist]]

~~~text ios/Runner/Info.plist
<key>NSCameraUsageDescription</key>
<string>بنستخدم الكاميرا عشان تصوّر المنتج</string>
~~~

[[Info.plist]] ملف XML فيه إعدادات التطبيق كأزواج [[<key>]] و قيمة. [[NS...UsageDescription]] هي الجملة اللي iOS بيعرضها للمستخدم وهو بيسأله على الصلاحية.

مشروع [[flutter create]] جديد فيه ٢٦ [[<key>]] (زي [[CFBundleDisplayName]] و [[UILaunchStoryboardName]] و [[UISupportedInterfaceOrientations]])، ومفيهوش ولا [[UsageDescription]] واحد. يعني كل package بتطلب صلاحية (كاميرا، صور، موقع، مايك) لازم تضيف مفتاحها بإيدك، وإلا التطبيق بيقفل أول ما يطلبها على iPhone.

---

## الخلاصة

| الخطوة | الأمر | محتاج |
|---|---|---|
| التوقيع والـ Bundle ID | [[open ios/Runner.xcworkspace]] | Mac + Xcode + حساب Apple |
| البناء | [[flutter build ipa --release]] | Mac (على لينكس وويندوز الأمر مش موجود) |
| الرفع | Organizer أو Transporter | Apple Developer Program |
| التجربة | TestFlight | بعد الرفع |

- افتح [[.xcworkspace]] دايمًا.
- النسخة من pubspec عن طريق [[FLUTTER_BUILD_NAME]] و [[FLUTTER_BUILD_NUMBER]].
- أي صلاحية محتاجة [[NS...UsageDescription]] في Info.plist.`,
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
    }
]);
