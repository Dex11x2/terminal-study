// تكملة تاب kotlin: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/kotlin/01.js (شرح حقول الدرس في أوله)
MORE("kotlin", [
    {
      t: "مشروع Android من جوه",
      l: 2,
      n: "تعمل مشروع وتشغّله، و Gradle و libs.versions.toml، و AndroidManifest والـ resources، والـ Activity ودورة حياتها",
      items: [
        {
          cmd: "مشروع Android",
          title: "أول مشروع Android: تعمله إزاي، وكل فولدر فيه لازمته إيه، وتشغّله على emulator؟",
          desc: R`في Android Studio: New Project ثم Empty Activity (ده قالب Compose). هتختار:
• Name: اسم التطبيق اللي بيظهر.
• Package name: زي [[com.sara.notes]]. ده الـ [[applicationId]]، اسم تطبيقك الفريد على Play للأبد، فاختاره صح ومتسيبهوش [[com.example]].
• Minimum SDK: أقدم Android التطبيق يشتغل عليه. Android Studio بيقولك النسبة التقريبية من الأجهزة اللي هتغطيها.
• Build configuration language: سيبها Kotlin DSL ([[build.gradle.kts]]).

أهم الملفات:
• [[app/src/main/java/com/sara/notes/MainActivity.kt]]: الكود بتاعك (الفولدر اسمه java حتى لو الكود Kotlin، ده عرف قديم).
• [[app/src/main/res/]]: الـ resources (نصوص، صور، أيقونات، ألوان).
• [[app/src/main/AndroidManifest.xml]]: بطاقة تعريف التطبيق للنظام.
• [[app/build.gradle.kts]]: إعدادات الـ module والمكتبات.
• [[gradle/libs.versions.toml]]: نسخ كل المكتبات في مكان واحد.
• [[settings.gradle.kts]] و [[build.gradle.kts]] اللي برا: إعدادات المشروع كله.
• [[gradlew]] و [[gradlew.bat]]: سكربت بيشغّل نسخة Gradle المظبوطة للمشروع من غير ما تسطّبه.

التشغيل: Device Manager ثم اعمل جهاز وهمي (emulator) زي Pixel، أو وصّل موبايلك بعد ما تفعّل Developer options و USB debugging (تدوس على Build number ٧ مرات في الإعدادات). وبعدين زرار Run الأخضر. والأوامر اللي في المثال بتعمل نفس الحاجة من الترمنال.`,
          example: R`./gradlew tasks
./gradlew assembleDebug
adb devices
./gradlew installDebug
adb shell am start -n com.sara.notes/.MainActivity
adb uninstall com.sara.notes`,
          try: R`اعمل مشروع Empty Activity باسم Notes و package [[com.yourname.notes]]، وشغّله على emulator. بعدين افتح ترمنال Android Studio (تحت) وشغّل [[./gradlew assembleDebug]] (أو [[.\gradlew assembleDebug]] على ويندوز)، ودوّر على الـ APK اللي اتعمل.`,
          deep: {
            why: R`أغلب مشاكل المبتدئين في Android مش في الكود، في إنهم مش عارفين الملف المطلوب فين، أو Gradle بيقول إيه. لو فهمت الهيكل من أول يوم، أي tutorial أو مشروع حد تاني هتعرف تقراه.`,
            how: R`Android Studio هو IntelliJ IDEA ومعاه أدوات Android. البناء نفسه مش بيعمله Android Studio: بيعمله [[Gradle]] ومعاه Android Gradle Plugin ([[AGP]]). وده اللي بيخلي نفس الأمر يشتغل على جهازك وعلى سيرفر CI.

[[adb]] (Android Debug Bridge) أداة في Android SDK بتكلم الجهاز: تسطّب، وتمسح، وتقرا الـ logs، وتفتح shell. لو مش لاقيها في الترمنال، فولدر [[platform-tools]] جوه الـ SDK مش على الـ PATH.

الـ emulator بيحتاج hardware acceleration: على ويندوز Windows Hypervisor Platform، وعلى Linux الـ KVM. لو بطيء جدًا غالبًا ده مش متفعّل.

وفيه نوعين ملفات بيطلعوا: [[APK]] بيتسطّب مباشرة، و [[AAB]] بيترفع على Play (المستوى ٣).`,
            when: "مرة لكل تطبيق جديد. وأوامر adb هتحتاجها كل يوم: تمسح التطبيق وتسطّبه من الأول، أو تقرا logs من موبايل حقيقي.",
            mistakes: R`تحط المشروع في مسار فيه حروف عربي أو مسافات: على ويندوز Gradle بيرفض أو بيطلّع أخطاء غريبة، خليه في زي [[C:\dev\notes]]. وتسيب [[com.example]]: Play بيرفض أي package بيبدأ بيه. وأول build بياخد دقايق (بينزّل Gradle والمكتبات)، فمتقفلش Android Studio وانت فاكره علّق.`
          },
          teach: R`## الأوامر دي بتعمل إيه؟

الـ ٦ أوامر هي نفس اللي زرار Run الأخضر في Android Studio بيعمله، بس من الترمنال: اعرض المهام، ابني APK، شوف الأجهزة المتوصلة، سطّب، افتح التطبيق، امسحه. أول اتنين وأمر التسطيب من [[Gradle]]، والباقي من [[adb]].

> فين اتجرّب: مشروع Notes حقيقي (نفس ملفات الدروس الجاية: [[settings.gradle.kts]] و [[libs.versions.toml]] و [[app/build.gradle.kts]] و [[AndroidManifest.xml]] و [[res/]] و [[MainActivity.kt]]) اتبنى جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]]، وهي image لينكس فيها Android SDK و Java 21، بـ Gradle wrapper 9.8.1 و AGP 9.4.1، و Android SDK Platform 37 اتسطّب بـ [[sdkmanager]]. كل ناتج Gradle و adb تحت حقيقي من هناك. مفيش emulator ولا موبايل متوصل، فأوامر adb طلّعت رسايل «مفيش جهاز» الحقيقية، وشكل الناتج **مع** جهاز من الـ docs الرسمية (developer.android.com: «Android Debug Bridge»). وعلى ويندوز اتجرّب إن [[./gradlew]] و [[.\gradlew]] في PowerShell بيشغّلوا [[gradlew.bat]].

---

## ١. المشروع شكله إيه بعد New Project

قالب Empty Activity (Compose) باسم Notes و package [[com.sara.notes]] بيعمل الشجرة دي (مختصرة):

~~~text هيكل المشروع
Notes/
├── settings.gradle.kts          أنهي modules في المشروع، والمكتبات بتتنزل منين
├── build.gradle.kts             إعدادات المشروع كله (غالبًا plugins بس)
├── gradle.properties            إعدادات Gradle نفسه (ذاكرة، AndroidX)
├── local.properties             مكان الـ SDK على جهازك (متترفعش على Git)
├── gradlew  و  gradlew.bat      الـ wrapper: لينكس/ماك، وويندوز
├── gradle/
│   ├── libs.versions.toml       نسخ كل المكتبات (درس Gradle)
│   └── wrapper/                 gradle-wrapper.jar و gradle-wrapper.properties
└── app/                         الـ module بتاع التطبيق
    ├── build.gradle.kts         إعدادات الـ app: SDK ونسخ ومكتبات
    └── src/
        ├── main/
        │   ├── AndroidManifest.xml
        │   ├── java/com/sara/notes/
        │   │   ├── MainActivity.kt
        │   │   └── ui/theme/    Color.kt و Theme.kt و Type.kt
        │   └── res/             drawable و mipmap-* و values (strings و colors و themes)
        ├── test/                unit tests بتشتغل على جهازك
        └── androidTest/         tests بتشتغل على موبايل أو emulator
~~~

- [[app]] اسمه **module**: حتة من المشروع ليها build خاص بيها. المشاريع الكبيرة بيبقى فيها أكتر من module، وكل واحد ليه [[build.gradle.kts]].
- الفولدر [[java/com/sara/notes]] اسمه java حتى والكود Kotlin، والفولدرات بتمشي ورا الـ package: كل نقطة في [[com.sara.notes]] بقت فولدر.
- [[local.properties]] فيه سطر [[sdk.dir=...]]، و Android Studio بيكتبه لوحده. في الـ image اللي اتجرّب فيها مكانش موجود، لأن Gradle بيقرا مكان الـ SDK من متغير البيئة [[ANDROID_HOME]] لو الملف مش موجود.
- [[test]] و [[androidTest]] ليهم دروس في مستوى ٣.

والـ wrapper نفسه ملف صغير، ده اللي جوه [[gradle/wrapper/gradle-wrapper.properties]] في المشروع اللي اتجرّب:

~~~text gradle/wrapper/gradle-wrapper.properties (مختصر)
distributionUrl=https\://services.gradle.org/distributions/gradle-9.8.1-bin.zip
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
~~~

[[distributionUrl]]: نسخة Gradle اللي المشروع عايزها ومنين تتنزل. والـ [[\:]] هي [[:]] عادية (صيغة ملفات properties).

---

## ٢. [[./gradlew tasks]]

~~~bash
./gradlew tasks
~~~

| الحتة | معناها |
|---|---|
| [[./]] | «الملف ده في الفولدر الحالي». من غيرها الترمنال بيدوّر في الـ PATH بس |
| [[gradlew]] | Gradle **w**rapper: سكربت صغير بينزّل نسخة Gradle المكتوبة في [[gradle-wrapper.properties]] (أول مرة بس) ويشغّلها |
| [[tasks]] | اسم الـ task: «اعرض الـ tasks المهمة اللي ينفع تشغّلها» |

ليه wrapper ومش [[gradle]] على طول؟ عشان كل مشروع بيحتاج نسخة Gradle معينة. الـ wrapper بيضمن إن جهازك وجهاز زميلك وسيرفر الـ CI بيستخدموا نفس النسخة، من غير ما حد يسطّب Gradle بنفسه. وأول مرة بالظبط ده اللي حصل:

~~~text أول سطور الناتج
Downloading https://services.gradle.org/distributions/gradle-9.8.1-bin.zip
..............10%..............20%...............30%.............. ...100%
~~~

وبعدين القايمة متقسمة مجموعات (مختصرة):

~~~text الناتج (مختصر)
Tasks runnable from root project 'Notes'

Android tasks
-------------
signingReport - Displays the signing info for the base and test modules

Build tasks
-----------
assemble - Assemble main outputs for all the variants.
build - Assembles and tests this project.
bundle - Assemble bundles for all the variants.
clean - Deletes the build directory.
...
Install tasks
-------------
installDebug - Installs the Debug build.
uninstallAll - Uninstall all applications.
uninstallDebug - Uninstalls the Debug build.
...
Verification tasks
------------------
lint - Runs lint on the default variant.
test - Run unit tests for all variants.
testDebugUnitTest - Run unit tests for the debug build.
...
BUILD SUCCESSFUL in 1m 48s
~~~

لاحظ إن [[assembleDebug]] **مش** في القايمة. [[tasks]] بيعرض الـ tasks اللي ليها group بس، و AGP 9.4 مش حاطط [[assembleDebug]] في group. عشان تشوفها: [[./gradlew tasks --all]]، وفيها السطر ده:

~~~text من ناتج tasks --all
app:assembleDebug - Assembles main output for variant debug
~~~

[[app:]] قبل الاسم معناها إن الـ task دي في الـ module [[app]]. ولو كتبت [[assembleDebug]] من غير [[:app:]]، Gradle بيشغّلها في كل module عنده task بالاسم ده.

---

## ٣. [[./gradlew assembleDebug]]

~~~bash
./gradlew assembleDebug
~~~

- [[assemble]]: اجمع كل حاجة في ملف واحد جاهز. و [[Debug]]: النسخة اللي للتجربة (فيها معلومات debugging وموقّعة بمفتاح debug أوتوماتيك). وفيه [[assembleRelease]] للنشر (المستوى ٣).
- Gradle بيترجم الـ Kotlin، ويجمّع الـ resources، ويدمج الـ manifest، ويطلّع **APK** (Android Package): الملف اللي بيتسطّب على الموبايل.

~~~text الناتج (مختصر)
> Task :app:checkDebugAarMetadata
> Task :app:processDebugMainManifest
> Task :app:mergeDebugResources
> Task :app:compileDebugKotlin
> Task :app:processDebugResources
> Task :app:dexBuilderDebug
> Task :app:packageDebug
> Task :app:assembleDebug

BUILD SUCCESSFUL in 49s
36 actionable tasks: 25 executed, 11 up-to-date
~~~

كل سطر [[> Task]] خطوة. أهمهم بالترتيب:

| الـ task | بتعمل إيه |
|---|---|
| [[checkDebugAarMetadata]] | تتأكد إن المكتبات راضية عن [[compileSdk]] بتاعك (درس Gradle: هنا وقع البناء لما كان 36) |
| [[processDebugMainManifest]] | تدمج الـ manifest بتاعك مع manifests المكتبات (درس AndroidManifest) |
| [[compileDebugKotlin]] | تترجم الكود |
| [[processDebugResources]] | تجمّع الـ resources وتولّد كلاس [[R]] |
| [[dexBuilderDebug]] | تحوّل الـ bytecode لـ **dex**، الصيغة اللي Android بيشغّلها |
| [[packageDebug]] | تحط كله في الـ APK وتمضيه بمفتاح الـ debug |

و [[36 actionable tasks: 25 executed, 11 up-to-date]]: الـ [[up-to-date]] اتنطّت لأن مدخلاتها متغيرتش من آخر مرة. ده اللي بيخلي البناء التاني أسرع بكتير من الأول.

### الـ APK اتعمل فين وفيه إيه

~~~text app/build/outputs/apk/debug/
app-debug.apk          11565710 bytes
output-metadata.json
~~~

حوالي ١١ ميجا لشاشة فيها كلمة واحدة! لأن نسخة الـ debug مفيهاش R8 (اللي بيشيل الكود اللي مش مستخدم، المستوى ٣)، فمكتبات Compose كلها جواها. ولو عايز تقرا الـ APK من غير موبايل، فيه أداة في الـ SDK اسمها [[aapt2]] (في [[build-tools/<النسخة>/]]):

~~~bash
aapt2 dump badging app/build/outputs/apk/debug/app-debug.apk
~~~

~~~text الناتج (مختصر)
package: name='com.sara.notes' versionCode='1' versionName='1.0' platformBuildVersionName='17' platformBuildVersionCode='37' compileSdkVersion='37' compileSdkVersionCodename='17'
minSdkVersion:'24'
targetSdkVersion:'36'
uses-permission: name='android.permission.INTERNET'
application-label:'Notes'
application-label-ar:'ملاحظاتي'
application: label='Notes' icon='res/mipmap-anydpi-v26/ic_launcher.xml'
application-debuggable
launchable-activity: name='com.sara.notes.MainActivity'  label='' icon=''
native-code: 'arm64-v8a' 'armeabi-v7a' 'x86' 'x86_64'
~~~

ده تقريبًا كل اللي اخترته في New Project وفي الدروس الجاية، بس من جوه الـ APK: الـ package والنسخة، و [[minSdk]] و [[targetSdk]]، والاسم بالإنجليزي والعربي، و [[launchable-activity]] هي الشاشة اللي هتفتح من الأيقونة، و [[application-debuggable]] لأنها نسخة debug.

---

## ٤. [[adb devices]]

~~~bash
adb devices
~~~

[[adb]] = Android Debug Bridge: أداة في فولدر [[platform-tools]] جوه الـ SDK بتكلّم أي موبايل أو emulator متوصل. و [[devices]]: «اعرض الأجهزة».

~~~text الناتج من غير أي جهاز متوصل
* daemon not running; starting now at tcp:5037
* daemon started successfully
List of devices attached

~~~

- أول مرة [[adb]] بيشغّل **server** في الخلفية (الـ daemon) على port [[5037]]، وهو اللي بيفضل يكلّم الأجهزة. المرات اللي بعدها مش هتشوف السطرين دول.
- القايمة فاضية: مفيش جهاز.

ولما يبقى فيه أجهزة، الشكل كده (من الـ docs):

~~~text شكل الناتج مع أجهزة (من الـ docs)
List of devices attached
emulator-5554   device
0a388e93        unauthorized
~~~

| العمود | معناه |
|---|---|
| [[emulator-5554]] | الـ serial: اسم الجهاز. الـ emulator بياخد رقم port |
| [[device]] | متوصل وجاهز |
| [[unauthorized]] | موبايل حقيقي لسه موافقتش على «Allow USB debugging?» على شاشته |
| [[offline]] | متوصل بس مش بيرد، جرّب تفصل وتوصّل |

---

## ٥. [[./gradlew installDebug]]

~~~bash
./gradlew installDebug
~~~

بيعمل [[assembleDebug]] الأول لو فيه تغيير، وبعدين بيسطّب الـ APK على الجهاز المتوصل (بيستخدم adb من جوه). لو فيه أكتر من جهاز، Gradle بيسطّب عليهم كلهم. التطبيق بيتسطّب بس **مش بيفتح** لوحده، وده سبب الأمر اللي جاي. ومن غير جهاز:

~~~text الناتج
> Task :app:installDebug FAILED
[adb]: * daemon not running; starting now at tcp:5037
[adb]: * daemon started successfully

* What went wrong:
Execution failed for task ':app:installDebug' (registered by plugin 'com.android.internal.application').
> com.android.builder.testing.api.DeviceException: No connected devices!

BUILD FAILED in 59s
~~~

[[No connected devices!]] = شغّل emulator أو وصّل موبايل الأول، واتأكد إن [[adb devices]] بيقول [[device]].

---

## ٦. [[adb shell am start -n ...]]

~~~bash
adb shell am start -n com.sara.notes/.MainActivity
~~~

نفكّه:

| الحتة | معناها |
|---|---|
| [[adb shell]] | نفّذ اللي بعدي **جوه** الموبايل (اللي عليه لينكس) |
| [[am]] | Activity Manager: الأداة اللي بتشغّل الشاشات جوه Android |
| [[start]] | ابدأ Activity |
| [[-n]] | بعدها اسم الـ component بالظبط |
| [[com.sara.notes]] | الـ applicationId (اسم التطبيق) |
| [[/.MainActivity]] | الكلاس. النقطة في الأول معناها «جوه نفس الـ package»، يعني [[com.sara.notes.MainActivity]] (نفس الاسم اللي [[aapt2]] طلّعه في [[launchable-activity]]) |

~~~text الناتج هنا (مفيش جهاز)
adb: no devices/emulators found
~~~

~~~text شكل الناتج مع جهاز (من الـ docs)
Starting: Intent { cmp=com.sara.notes/.MainActivity }
~~~

---

## ٧. [[adb uninstall com.sara.notes]]

~~~bash
adb uninstall com.sara.notes
~~~

بيمسح التطبيق **وكل الداتا بتاعته** (الداتابيز والإعدادات)، فبتبدأ من الصفر زي أول تسطيب. بيطبع [[Success]] لو نجح (من الـ docs). هنا من غير جهاز طبع نفس [[adb: no devices/emulators found]]، و exit code [[1]] (يعني فشل، فلو في script هيوقفه). مفيد لما تغيّر شكل الداتابيز أو تجرّب شاشة أول تشغيل.

---

## ٨. على ويندوز

| | لينكس والماك | ويندوز (PowerShell) |
|---|---|---|
| الـ wrapper | [[./gradlew assembleDebug]] | [[.\gradlew assembleDebug]] |
| الملف اللي بيشتغل | [[gradlew]] (shell script) | [[gradlew.bat]] |
| adb | [[adb devices]] | [[adb devices]] (نفسه) |

جرّبت في PowerShell 7 فولدر فيه [[gradlew]] و [[gradlew.bat]]: [[./gradlew]] و [[.\gradlew]] الاتنين شغّلوا [[gradlew.bat]]. وفي cmd اكتب [[gradlew assembleDebug]] أو [[.\gradlew assembleDebug]]. ولو [[adb]] طلع «not recognized»، ضيف [[%LOCALAPPDATA%\Android\Sdk\platform-tools]] على الـ PATH (ده مكان الـ SDK الافتراضي على ويندوز).

وفي ترمنال Android Studio نفسه (تحت) نفس الأوامر بتشتغل، وهو بيفتح في فولدر المشروع على طول.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[./gradlew tasks]] | الـ tasks المهمة ([[--all]] للكل، زي [[assembleDebug]]) |
| [[./gradlew assembleDebug]] | يبني [[app/build/outputs/apk/debug/app-debug.apk]] |
| [[aapt2 dump badging app-debug.apk]] | يقرا الـ package والنسخ والصلاحيات من الـ APK |
| [[adb devices]] | الأجهزة المتوصلة، لازم [[device]] |
| [[./gradlew installDebug]] | يبني ويسطّب (من غير ما يفتح)، ومن غير جهاز: [[No connected devices!]] |
| [[adb shell am start -n pkg/.Activity]] | يفتح الشاشة |
| [[adb uninstall pkg]] | يمسح التطبيق بالداتا |

اللي ميتلخبطش: [[gradlew]] بيبني (على جهازك)، و [[adb]] بيكلّم الموبايل. والـ package name اللي بتختاره أول يوم هو اسم تطبيقك على Play للأبد.`,
          lines: [
            "كل المهام اللي Gradle يقدر يعملها في المشروع.",
            R`ابني نسخة debug، والـ APK بيطلع في [[app/build/outputs/apk/debug/]].`,
            R`الأجهزة المتوصلة (emulator أو موبايل). لازم تبقى [[device]] مش [[unauthorized]].`,
            "ابني وسطّب على الجهاز المتوصل.",
            "افتح الـ Activity الرئيسية من الترمنال.",
            "امسح التطبيق من الجهاز (بداتا بتاعته)."
          ],
          sol: R`الـ APK بيطلع في [[app/build/outputs/apk/debug/app-debug.apk]] (حوالي ١١ ميجا لمشروع Compose فاضي، لأن نسخة الـ debug مفيهاش R8)، وآخر سطر في الترمنال [[BUILD SUCCESSFUL in ...]]. ولو دوّرت على [[assembleDebug]] في ناتج [[./gradlew tasks]] مش هتلاقيها: هي في [[./gradlew tasks --all]].

لو [[./gradlew installDebug]] وقع بـ [[DeviceException: No connected devices!]]، أو [[adb shell am start]] قال [[adb: no devices/emulators found]]: مفيش emulator شغال ولا موبايل متوصل. شغّل واحد من Device Manager وجرّب تاني.

لو [[adb devices]] طلّع الموبايل [[unauthorized]]: بص على شاشة الموبايل، هتلاقي سؤال «Allow USB debugging?»، وافق. ولو مش ظاهر خالص: جرّب كابل تاني (فيه كابلات شحن بس)، وعلى ويندوز ممكن تحتاج USB driver بتاع الشركة.

ولو الـ build وقع برسالة فيها [[JDK]] أو [[Unsupported class file major version]]: من Settings ثم Build Tools ثم Gradle، خلي Gradle JDK هو الـ JDK اللي جاي مع Android Studio.`
        },
        {
          cmd: "Gradle و libs.versions.toml",
          title: "build.gradle.kts و libs.versions.toml: تضيف مكتبة للمشروع إزاي؟",
          desc: R`[[app/build.gradle.kts]] ده إعدادات الـ app module، ومكتوب بـ Kotlin (عشان كده الامتداد [[.kts]]). فيه ٣ أجزاء:

١. [[plugins { }]]: الـ plugins اللي بتبني المشروع. [[com.android.application]] (الـ AGP)، و [[org.jetbrains.kotlin.plugin.compose]] (مترجم Compose). ومن AGP 9 الـ Kotlin نفسها جوه الـ AGP، فمش محتاج plugin [[kotlin-android]] زي المشاريع القديمة.

٢. [[android { }]]:
• [[namespace]]: الـ package اللي فيه كلاس [[R]] (الـ resources).
• [[compileSdk]]: نسخة Android SDK اللي بتترجم عليها. والمكتبات الحديثة بتطلب رقم أدنى: Compose BOM 2026.09.00 و lifecycle 2.11.0 محتاجين [[compileSdk = 37]]، وبـ 36 البناء بيقع.
• [[minSdk]]: أقدم Android التطبيق يتسطّب عليه.
• [[targetSdk]]: نسخة Android اللي التطبيق متجرّب عليها وبيتبع قواعدها. Google Play بيطلب رقم حديث: من 31 أغسطس 2026 التطبيقات الجديدة والتحديثات لازم [[targetSdk = 36]] (Android 16) على الأقل.
• [[versionCode]]: رقم صحيح لازم يزيد مع كل رفعة على Play. و [[versionName]]: اللي اليوزر بيشوفه.

٣. [[dependencies { }]]: المكتبات. [[implementation(...)]] للتطبيق، و [[testImplementation(...)]] للاختبارات بس.

و [[libs.androidx.activity.compose]] ده جاي من [[gradle/libs.versions.toml]] (اسمه version catalog): ملف فيه كل النسخ والمكتبات في مكان واحد، بدل ما النسخ تبقى متفرقة في كل ملف. الشَرطة [[-]] في الاسم بتبقى نقطة [[.]] في الكود. وبعد أي تعديل دوس Sync Now.

و [[platform(libs.androidx.compose.bom)]]: الـ BOM (Bill of Materials) بيحدد نسخ كل مكتبات Compose المتوافقة مع بعض، فمكتبات Compose نفسها بتتكتب من غير نسخة.`,
          example: R`plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.compose)
}
android {
    namespace = "com.sara.notes"
    compileSdk = 37
    defaultConfig {
        applicationId = "com.sara.notes"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"
    }
    buildFeatures {
        compose = true
    }
}
dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    testImplementation(libs.junit)
}`,
          try: R`افتح [[gradle/libs.versions.toml]] في مشروعك وضيف مكتبة [[androidx.lifecycle:lifecycle-viewmodel-compose]] (هتحتاجها في درس الـ ViewModel): نسخة في [[[versions]]]، وسطر في [[[libraries]]]، وبعدين [[implementation(...)]] في [[app/build.gradle.kts]] واعمل Sync. ولاحظ إن Android Studio بيعلّم بالأصفر لو فيه نسخة أحدث.`,
          flag: "script",
          deep: {
            why: R`كل ميزة هتضيفها (شبكة، صور، داتابيز، تنقل) معناها مكتبة. والـ version catalog بيمنع إن نفس المكتبة تبقى بنسختين في modules مختلفة، وبيخلي التحديث في سطر واحد.`,
            how: R`Gradle بيقرا [[settings.gradle.kts]] الأول (أنهي modules موجودة، والمكتبات بتتنزل منين: [[google()]] و [[mavenCentral()]])، وبعدين [[build.gradle.kts]] بتاع كل module.

الـ [[.kts]] كود Kotlin حقيقي: [[android { }]] دالة بتاخد lambda with receiver (درس scope functions)، عشان كده الـ autocomplete شغال جواه.

[[implementation]] غير [[api]]: implementation معناها إن المكتبة دي داخلية للـ module ومش ظاهرة للي بيستخدمه، فالبناء أسرع. و [[ksp(...)]] للمكتبات اللي بتولّد كود وقت الترجمة (Room و Hilt). الـ KSP هو البديل الأسرع لـ kapt القديم، و kapt مش مدعوم مع Kotlin المدمجة في AGP 9.

[[compileSdk]] و [[targetSdk]] مش نفس الحاجة: compileSdk بيحدد الـ APIs اللي تقدر تكتبها، و targetSdk بيقول للنظام «أنا جاهز لسلوك النسخة دي» (زي edge-to-edge الإجباري من Android 15). ولو استخدمت API أحدث من minSdk، لازم تفحص [[Build.VERSION.SDK_INT]] قبلها.`,
            when: R`كل ما تضيف مكتبة، أو تحدّث نسخة، أو تجهّز release. وحدّث [[targetSdk]] مرة في السنة على الأقل عشان Play.`,
            mistakes: R`تنسخ [[implementation("group:name:1.2.3")]] من tutorial قديم جنب الـ catalog فيبقى عندك نسختين. وتحدّث مكتبة واحدة من Compose بنسخة لوحدها بدل الـ BOM فيحصل تعارض. وتستخدم [[kapt]] من tutorial قديم مع AGP 9 فالبناء يقع: استخدم [[ksp]].`
          },
          teach: R`## الملف ده بيعمل إيه؟

ده [[app/build.gradle.kts]]: الملف اللي Gradle بيقراه عشان يعرف يبني التطبيق إزاي. ٣ blocks: مين بيبني ([[plugins]])، وإعدادات Android ([[android]])، والمكتبات ([[dependencies]]). وكل اسم بيبدأ بـ [[libs.]] جاي من ملف تاني: [[gradle/libs.versions.toml]] (الـ solCode).

> فين اتجرّب: الملف ده والـ solCode زي ما هم اتحطوا في مشروع Notes حقيقي (مع [[settings.gradle.kts]] و [[build.gradle.kts]] بتاع الجذر والـ manifest والـ res والـ Activity من الدروس التانية)، واتبنوا بـ Gradle wrapper 9.8.1 جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]] (لينكس فيه Android SDK و Java 21). ونتيجة مهمة: بالنسخ دي، [[compileSdk = 36]] اللي كانت مكتوبة في الدرس **البناء وقع بيها**، فالمثال اتصلّح لـ [[compileSdk = 37]] (اتسطّب Android SDK Platform 37 بـ [[sdkmanager]]) والبناء نجح. كل ناتج تحت حقيقي من هناك. أما Sync Now والعلامات الصفرا فدي من Android Studio (مش متجرّبة هنا).

---

## ١. الملف كود Kotlin

الامتداد [[.kts]] = Kotlin Script. يعني كل اللي في الملف كود Kotlin حقيقي:

- [[plugins { ... }]] و [[android { ... }]]: دوال بتاخد lambda (درس lambdas)، والـ trailing lambda بيخلي شكلها زي «أقسام».
- جوه [[android { }]] بتكتب [[compileSdk = 37]] من غير [[android.]] قبلها. ده الـ **lambda with receiver** من درس scope functions: جوه الـ block، [[this]] هو object الإعدادات بتاع Android.
- [[=]] تعيين قيمة لـ property عادي.

عشان كده Android Studio بيعمل autocomplete جوه الملف، وبيعلّم بالأحمر لو كتبت اسم غلط.

---

## ٢. [[plugins { }]]

~~~kotlin
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.compose)
}
~~~

- الـ **plugin** حتة بتعلّم Gradle يعمل حاجة جديدة. Gradle لوحده ميعرفش يعني إيه Android.
- [[alias(...)]]: «هات الـ plugin ده من الـ version catalog»، بالـ id والنسخة المكتوبين هناك.
- [[libs.plugins.android.application]]: في الـ toml مكتوب [[android-application = { id = "com.android.application", version.ref = "agp" }]]. يعني الـ **AGP** (Android Gradle Plugin) نسخة [[9.4.1]]. ده اللي بيضيف [[android { }]] وكل الـ tasks زي [[assembleDebug]].
- [[libs.plugins.kotlin.compose]]: [[org.jetbrains.kotlin.plugin.compose]]، الـ compiler plugin بتاع Compose. نسخته نفس نسخة Kotlin ([[version.ref = "kotlin"]]) لأنه جزء من مترجم Kotlin.
- مفيش [[org.jetbrains.kotlin.android]]: من AGP 9 دعم Kotlin مدمج في الـ AGP نفسه (اسمه built-in Kotlin). المشاريع الأقدم هتلاقي فيها السطر ده.

---

## ٣. [[android { }]]

~~~kotlin
android {
    namespace = "com.sara.notes"
    compileSdk = 37
~~~

| الإعداد | معناه |
|---|---|
| [[namespace]] | الـ package اللي كلاس [[R]] بيتولد فيه ([[com.sara.notes.R]])، وبيتحط قبل الأسامي النسبية في الـ manifest زي [[.MainActivity]] |
| [[compileSdk = 37]] | نسخة Android SDK اللي الكود بيترجم عليها (37 = Android 17). بتحدد الـ APIs اللي تقدر **تكتبها** |

### ليه 37 مش 36؟

المكتبات نفسها بتقول أقل compileSdk تقبله. ده اللي حصل لما المشروع اتبنى بـ [[compileSdk = 36]] والنسخ اللي في الـ solCode:

~~~bash
./gradlew assembleDebug
~~~

~~~text الناتج (مختصر، كانوا ١١ مكتبة)
> Task :app:compileDebugKotlin
> Task :app:checkDebugAarMetadata FAILED

* What went wrong:
Execution failed for task ':app:checkDebugAarMetadata' (registered by plugin 'com.android.internal.application').
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckAarMetadataWorkAction
   > 11 issues were found when checking AAR metadata:

       1.  Dependency 'androidx.compose.material:material-ripple-android:1.12.1' requires libraries and applications that
           depend on it to compile against version 37 or later of the
           Android APIs.

           :app is currently compiled against android-36.

           Recommended action: Update this project to use a newer compileSdk
           of at least 37, for example 37.2.
       ...
      10.  Dependency 'androidx.lifecycle:lifecycle-viewmodel-compose-android:2.11.0' requires ...
BUILD FAILED in 1m 52s
~~~

- كل مكتبة Android بتتوزّع كـ **AAR** (Android Archive)، وجواها metadata فيها أقل [[compileSdk]] محتاجاه. والـ task [[checkDebugAarMetadata]] بتقارن.
- Compose 1.12.1 (اللي جاي من BOM [[2026.09.00]]) و lifecycle [[2.11.0]] محتاجين 37. الكود نفسه اترجم عادي ([[compileDebugKotlin]] عدّت)، بس AGP رفض يكمّل.
- الحل: [[compileSdk = 37]]. ده **مش** بيغيّر سلوك التطبيق على الموبايل (ده شغل [[targetSdk]])، بس بيسمحلك تترجم على APIs أحدث. وبيحتاج SDK Platform 37 متسطّب (Android Studio بيعرض ينزّله).
- [[37.2]] في الرسالة: من Android 16 فيه نسخ «minor» للـ SDK (زي 36.1 و 37.2). [[compileSdk = 37]] بيستخدم 37.0 وده كفاية هنا.

---

## ٤. [[defaultConfig { }]]

~~~kotlin
    defaultConfig {
        applicationId = "com.sara.notes"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"
    }
~~~

[[defaultConfig]]: الإعدادات اللي كل نسخ البناء بتاخدها (debug و release، المستوى ٣).

| الإعداد | معناه | القيمة هنا |
|---|---|---|
| [[applicationId]] | اسم التطبيق الفريد على الجهاز وعلى Play، مبيتغيرش بعد أول رفعة | [[com.sara.notes]] |
| [[minSdk]] | أقدم Android يتسطّب عليه، الأقدم منه مش هيشوف التطبيق على Play | 24 = Android 7.0 |
| [[targetSdk]] | آخر نسخة التطبيق متجرّب عليها، والنظام بيطبّق قواعدها | 36 = Android 16 |
| [[versionCode]] | رقم صحيح لازم يزيد مع كل رفعة على Play | 1 |
| [[versionName]] | نص بيظهر لليوزر في الإعدادات و Play | [["1.0"]] |

والطبيعي يبقى [[minSdk ≤ targetSdk ≤ compileSdk]]: هنا 24 و 36 و 37. و [[targetSdk]] ممكن يفضل أقل من [[compileSdk]] عادي، زي ما حصل هنا: ترجمنا على 37 عشان المكتبات، وفضلنا متبعين قواعد 36 لحد ما نجرّب التطبيق على 37.

والأرقام دي اتأكدنا منها من جوه الـ APK بـ [[aapt2 dump badging]] (درس «مشروع Android»):

~~~text الناتج (أول ٣ سطور)
package: name='com.sara.notes' versionCode='1' versionName='1.0' platformBuildVersionName='17' platformBuildVersionCode='37' compileSdkVersion='37' compileSdkVersionCodename='17'
minSdkVersion:'24'
targetSdkVersion:'36'
~~~

> [[namespace]] و [[applicationId]] غالبًا نفس القيمة، بس مش لازم: الأول للكود (R و package)، والتاني اسم التطبيق للعالم. ممكن تغيّر الـ package بتاع الكود بعدين، لكن applicationId بعد النشر لأ.

---

## ٥. [[buildFeatures { }]]

~~~kotlin
    buildFeatures {
        compose = true
    }
}
~~~

بتشغّل مزايا مقفولة افتراضيًا. [[compose = true]] بتقول للـ AGP إن الـ module ده بيستخدم Compose. وفيه غيرها زي [[viewBinding = true]] (درس ViewBinding) و [[buildConfig = true]].

---

## ٦. [[dependencies { }]]

~~~kotlin
dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    testImplementation(libs.junit)
}
~~~

### الكلمة اللي قبل القوس اسمها configuration

| الكلمة | المكتبة بتدخل فين |
|---|---|
| [[implementation]] | كود التطبيق، وبتتحط جوه الـ APK |
| [[testImplementation]] | الـ unit tests بس ([[src/test]])، ومش بتدخل الـ APK |
| [[androidTestImplementation]] | tests الموبايل ([[src/androidTest]]) |
| [[ksp]] | مكتبات بتولّد كود وقت الترجمة (Room و Hilt) |

### [[platform(libs.androidx.compose.bom)]]

**BOM** = Bill of Materials (قايمة مكونات): ملف مفيهوش كود، فيه بس «نسخ مكتبات Compose اللي متجرّبة مع بعض». [[platform(...)]] بتقول لـ Gradle: «خد النسخ من هنا». عشان كده سطر [[material3]] في الـ toml **ملوش** [[version]]:

~~~text gradle/libs.versions.toml
androidx-compose-material3 = { group = "androidx.compose.material3", name = "material3" }
~~~

تحدّث Compose كله بتغيير رقم واحد: [[composeBom]].

### كل مكتبة بتعمل إيه

| في الكود | المكتبة الحقيقية ([[group:name]]) | ليه |
|---|---|---|
| [[libs.androidx.compose.material3]] | [[androidx.compose.material3:material3]] | الأزرار والـ Text والـ Scaffold |
| [[libs.androidx.activity.compose]] | [[androidx.activity:activity-compose]] | [[setContent { }]] في الـ Activity |
| [[libs.androidx.lifecycle.viewmodel.compose]] | [[androidx.lifecycle:lifecycle-viewmodel-compose]] | [[viewModel()]] جوه composable |
| [[libs.junit]] | [[junit:junit:4.13.2]] | الـ unit tests |

### [[./gradlew :app:dependencies]]: شوف اللي اتنزل فعلًا

~~~bash
./gradlew :app:dependencies --configuration debugRuntimeClasspath
~~~

[[:app:dependencies]] = task الـ [[dependencies]] في الـ module [[app]]، و [[--configuration debugRuntimeClasspath]] = «المكتبات اللي هتدخل الـ APK في نسخة الـ debug» (من غيرها بيطبع كل الـ configurations، مئات السطور). الناتج شجرة، دي أولها وأول مستوى منها:

~~~text الناتج (مختصر جدًا: الشجرة كاملة ٦٠٠ سطر)
debugRuntimeClasspath - Runtime classpath of '/debug'.
+--- org.jetbrains.kotlin:kotlin-stdlib:2.4.20
+--- androidx.compose:compose-bom:2026.09.00
|    +--- androidx.compose.material3:material3:1.4.0 (c)
|    +--- androidx.compose.runtime:runtime:1.12.1 (c)
|    +--- androidx.compose.ui:ui:1.12.1 (c)
|    ...
+--- androidx.compose.material3:material3 -> 1.4.0
|    \--- androidx.compose.material3:material3-android:1.4.0
|         +--- androidx.activity:activity-compose:1.8.2 -> 1.13.0
|         ...
+--- androidx.activity:activity-compose:1.13.0 (*)
\--- androidx.lifecycle:lifecycle-viewmodel-compose:2.11.0
~~~

| الرمز | معناه |
|---|---|
| [[+---]] و [[\---]] | فرع في الشجرة. [[\---]] آخر فرع في المستوى ده |
| [[material3 -> 1.4.0]] | انت مكتبتش نسخة، فـ Gradle جابها من الـ BOM: [[1.4.0]] |
| [[activity-compose:1.8.2 -> 1.13.0]] | material3 طالبة 1.8.2، بس انت طالب 1.13.0، فـ Gradle اختار **الأعلى** |
| [[(c)]] | constraint: الـ BOM بيقول «لو حد طلب المكتبة دي، خد النسخة دي»، مش بيضيفها بنفسه |
| [[(*)]] | المكتبة دي فروعها اتطبعت فوق قبل كده، فمش هيكررها |

ده بالظبط اللي بيوريك الـ BOM شغال: سطر [[material3]] في الـ toml ملوش [[version]]، والنسخة طلعت 1.4.0. و [[junit]] مش في الشجرة دي خالص، لأنه [[testImplementation]]: بيظهر في [[debugUnitTestRuntimeClasspath]] بس.

---

## ٧. [[libs.versions.toml]] (الـ solCode)

ملف بصيغة **TOML** (صيغة إعدادات بسيطة: أقسام بين [[[ ]]] وتحتها [[اسم = قيمة]]). ٣ أقسام:

### [[[versions]]]

~~~text
[versions]
agp = "9.4.1"
kotlin = "2.4.20"
composeBom = "2026.09.00"
~~~

أرقام بس، ليها أسامي. أي مكتبة تشاور عليها بـ [[version.ref]].

### [[[libraries]]]

~~~text
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
~~~

| الحتة | معناها |
|---|---|
| [[androidx-activity-compose]] | الاسم اللي هتستخدمه في Gradle |
| [[{ ... }]] | inline table: كذا قيمة في سطر واحد |
| [[group]] و [[name]] | إحداثيات المكتبة على الـ repository (زي عنوان) |
| [[version.ref = "activityCompose"]] | النسخة من [[[versions]]] (هنا [[1.13.0]]) |
| [[version = "4.13.2"]] | (في junit) نسخة مكتوبة على طول من غير ref |

**قاعدة الاسم:** الشَرط [[-]] في الـ toml بتبقى نقط في الكود، و Gradle بيحط قبلها [[libs.]]:

~~~text التحويل
androidx-activity-compose   →   libs.androidx.activity.compose
android-application (plugin) →   libs.plugins.android.application
~~~

### [[[plugins]]]

نفس الفكرة، بس بـ [[id]] بدل group و name، وفي الكود بيبقى [[libs.plugins.]].

---

## ٨. التجربة: تضيف مكتبة

اللي الـ try بيطلبه ٣ خطوات، وكلهم ظاهرين في الـ solCode:

1. [[[versions]]]: [[lifecycle = "2.11.0"]].
2. [[[libraries]]]: [[androidx-lifecycle-viewmodel-compose = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-compose", version.ref = "lifecycle" }]].
3. [[app/build.gradle.kts]]: [[implementation(libs.androidx.lifecycle.viewmodel.compose)]]، وبعدين **Sync Now** (الشريط الأصفر فوق الملف) عشان Android Studio يقرا التغيير وينزّل المكتبة.

### لو غلطت: الأخطاء الحقيقية

اسم غلط في الكود (كتبنا [[compse]] بدل [[compose]]):

~~~text الناتج
e: file:///w/app/build.gradle.kts:23:54: Unresolved reference 'compse'.
* Where:
Build file '/w/app/build.gradle.kts' line: 23
* What went wrong:
Script compilation error:
  Line 23:     implementation(libs.androidx.lifecycle.viewmodel.compse)
                                                                ^ Unresolved reference 'compse'.
~~~

الملف كود Kotlin، فالغلط **compile error** في السكربت نفسه، وبيقولك السطر والعمود ([[23:54]]). و [[/w/]] ده مكان المشروع جوه الـ container، عندك هيبقى مسار المشروع بتاعك.

نسخة مش موجودة (غيّرنا [[lifecycle]] لـ [[2.99.0]]):

~~~text الناتج (مختصر)
> Could not resolve all files for configuration ':app:debugRuntimeClasspath'.
   > Could not find androidx.lifecycle:lifecycle-viewmodel-compose:2.99.0.
     Searched in the following locations:
       - https://dl.google.com/dl/android/maven2/androidx/lifecycle/lifecycle-viewmodel-compose/2.99.0/lifecycle-viewmodel-compose-2.99.0.pom
       - https://repo.maven.apache.org/maven2/androidx/lifecycle/lifecycle-viewmodel-compose/2.99.0/lifecycle-viewmodel-compose-2.99.0.pom
     Required by:
         project ':app'
~~~

[[Searched in the following locations]] بيوريك Gradle دوّر فين: [[google()]] (dl.google.com) و [[mavenCentral()]] (repo.maven.apache.org)، بنفس ترتيب [[settings.gradle.kts]]. ولاحظ إن الغلط ظهر في مكتبات تانية كمان، لأن [[version.ref = "lifecycle"]] بيأثر على كل مكتبة بتشاور على نفس الرقم.

---

## ٩. Gradle بيقرا إيه الأول؟

1. [[settings.gradle.kts]]: فيه [[rootProject.name = "Notes"]] و [[include(":app")]] (الـ modules)، والـ repositories اللي المكتبات بتتنزل منها ([[google()]] لمكتبات androidx، و [[mavenCentral()]] للباقي).
2. [[build.gradle.kts]] اللي في الجذر: بيعلن الـ plugins بـ [[apply false]] (يعني «حمّلها بس متطبقهاش هنا»).
3. [[app/build.gradle.kts]]: الملف اللي شرحناه.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[plugins { alias(...) }]] | AGP و Compose compiler |
| [[namespace]] | package كلاس R |
| [[compileSdk]] / [[minSdk]] / [[targetSdk]] | بترجم على / أقدم جهاز / القواعد المتبعة |
| [[checkDebugAarMetadata]] وقع | مكتبة محتاجة [[compileSdk]] أعلى |
| [[./gradlew :app:dependencies]] | النسخ اللي اتنزلت فعلًا |
| [[versionCode]] | لازم يزيد مع كل رفعة |
| [[implementation(platform(bom))]] | نسخ Compose من مكان واحد |
| [[libs.a.b.c]] | [[a-b-c]] في [[libs.versions.toml]] |

اللي ميتلخبطش: الشَرط في الـ toml نقط في الكود، ومكتبات Compose من غير نسخة عشان الـ BOM بيحددها. وبعد أي تعديل: Sync.`,
          lines: [
            R`[[plugins]]: إيه اللي هيبني المشروع.`,
            R`plugin تطبيق Android (الـ AGP)، ونسخته من الـ catalog.`,
            "plugin مترجم Compose.",
            "قفلة.",
            R`إعدادات [[android]].`,
            R`الـ package اللي فيه كلاس R.`,
            "نسخة الـ SDK اللي بنترجم عليها.",
            R`[[defaultConfig]]: إعدادات بتتطبق على كل نسخ البناء.`,
            "الاسم الفريد على Play للأبد.",
            "أقدم نسخة Android مسموحة (Android 7.0).",
            "متجرّب على Android 16، واللي Play بيطلبه في 2026.",
            "رقم البناء، لازم يزيد مع كل رفعة.",
            "النسخة اللي اليوزر بيشوفها.",
            "قفلة defaultConfig.",
            "مزايا البناء.",
            "شغّل Compose.",
            "قفلة.",
            R`قفلة [[android]].`,
            "المكتبات.",
            "الـ BOM بيحدد نسخ Compose كلها.",
            "Material 3 من غير نسخة (من الـ BOM).",
            R`[[setContent]] و Compose في الـ Activity.`,
            R`[[viewModel()]] جوه Compose.`,
            "JUnit للاختبارات بس.",
            "قفلة."
          ],
          sol: R`في [[libs.versions.toml]] بتضيف تحت [[[versions]]] سطر زي [[lifecycle = "2.11.0"]] (النسخة الأحدث وقت ما تعمل ده)، وتحت [[[libraries]]] السطر اللي في الكود تحت. وفي [[app/build.gradle.kts]] الاسم بيبقى بنقط: [[implementation(libs.androidx.lifecycle.viewmodel.compose)]].

بعد Sync لو الاسم غلط هيطلع [[Unresolved reference]] ومعاه الكلمة الغلط، زي [[Unresolved reference 'compse'.]] في ملف Gradle. ولو النسخة مش موجودة: [[Could not find androidx.lifecycle:lifecycle-viewmodel-compose:2.99.0.]] ومعاها الأماكن اللي Gradle دوّر فيها.

والكود تحت محتوى ملف [[gradle/libs.versions.toml]]. والنسخ اللي فيه مثال وقت كتابة الدرس (أواخر 2026)، و Android Studio بيحط الأحدث في المشروع الجديد.`,
          solCode: R`[versions]
agp = "9.4.1"
kotlin = "2.4.20"
composeBom = "2026.09.00"
activityCompose = "1.13.0"
lifecycle = "2.11.0"

[libraries]
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-compose-material3 = { group = "androidx.compose.material3", name = "material3" }
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
androidx-lifecycle-viewmodel-compose = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-compose", version.ref = "lifecycle" }
junit = { group = "junit", name = "junit", version = "4.13.2" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-compose = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }`
        },
        {
          cmd: "AndroidManifest و res",
          title: "AndroidManifest.xml والـ resources: الصلاحيات، والـ launcher، و strings.xml والترجمة",
          desc: R`[[AndroidManifest.xml]] بطاقة تعريف التطبيق للنظام: اسمه، وأيقونته، والصلاحيات اللي محتاجها، والـ Activities اللي فيه، وأنهي واحدة تفتح من الـ launcher.

حاجات هتشوفها:
• [[uses-permission]]: صلاحية. [[INTERNET]] لازمة لأي نداء للشبكة. الصلاحيات «الخطيرة» (الكاميرا، الموقع) لازم كمان تطلبها وقت التشغيل (درس الصلاحيات).
• [[@string/app_name]] و [[@mipmap/ic_launcher]]: علامة [[@]] معناها «resource من فولدر res»: النص اللي اسمه app_name، والأيقونة اللي اسمها ic_launcher.
• [[android:exported="true"]]: الـ Activity دي ينفع تتفتح من برا التطبيق (من الـ launcher). إجباري تكتبه لأي Activity عندها intent-filter.
• [[intent-filter]] بـ [[MAIN]] و [[LAUNCHER]]: «دي الشاشة اللي تفتح لما اليوزر يدوس على الأيقونة».

فولدر [[res/]]:
• [[values/strings.xml]]: النصوص. ولو عملت [[values-ar/strings.xml]] بنفس الأسماء، الموبايل اللي لغته عربي هياخدها لوحده.
• [[drawable/]]: صور و vector icons. و [[mipmap/]]: أيقونة التطبيق بس.
• [[values/themes.xml]] و [[colors.xml]]: الثيم (في Compose أغلب الثيم بقى في الكود).

وفي الكود: كل resource ليه رقم في كلاس [[R]] اللي بيتولد لوحده: [[R.string.app_name]] و [[R.drawable.logo]]. وفي Compose: [[stringResource(R.string.welcome, name)]] و [[painterResource(R.drawable.logo)]].

و [[android:supportsRtl="true"]] بتخلي الواجهة تتقلب يمين لشمال لوحدها في العربي.`,
          example: R`<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <application
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/Theme.Notes">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`,
          try: R`في مشروعك: كليك يمين على [[res]] ثم New ثم Android Resource File، اسمه strings و Locale = Arabic. حط فيه [[app_name]] بالعربي ونص [[welcome]] فيه [[%1$s]]. غيّر لغة الـ emulator لعربي وشوف اسم التطبيق تحت الأيقونة. وبعدين اعرض [[stringResource(R.string.welcome, "Sara")]] في Compose.`,
          flag: "script",
          deep: {
            why: R`النظام مبيعرفش حاجة عن تطبيقك غير من الـ manifest: لو نسيت INTERNET، كل نداء شبكة هيقع حتى والنت شغال: غالبًا [[SocketException: socket failed: EPERM (Operation not permitted)]] أو [[UnknownHostException]]، وعلى نسخ Android قديمة [[SecurityException: Permission denied (missing INTERNET permission?)]]. والنصوص لو اتكتبت في الكود، الترجمة هتبقى مستحيلة، وكمان lint بيحذّرك من ده.`,
            how: R`الـ manifest اللي بتكتبه مش النهائي: وقت البناء Gradle بيدمجه مع manifests المكتبات (كل مكتبة ممكن تضيف صلاحيات أو components). تقدر تشوف النتيجة من تاب Merged Manifest تحت الملف. لو مكتبة ضافت صلاحية مش عايزها: [[tools:node="remove"]].

[[R]] كلاس بيتولد وقت البناء، فيه رقم int لكل resource. عشان كده [[R.string.app_name]] نوعه Int مش String، ولازم تحوّله بـ [[getString()]] أو [[stringResource()]].

الـ qualifiers بعد الشَرطة في اسم الفولدر: [[values-ar]] (لغة)، و [[values-night]] (dark mode)، و [[drawable-xxhdpi]] (كثافة الشاشة). النظام بيختار الأنسب لوحده وقت التشغيل.

[[%1$s]] في strings.xml معناها «أول argument كنص»، و [[%2$d]] «تاني argument كرقم». ولعدد العناصر فيه [[plurals]]، ومهم جدًا في العربي (عنصر واحد، عنصرين، ٣ عناصر، ١١ عنصر).`,
            when: R`الـ manifest كل ما تضيف صلاحية، أو Activity، أو deep link، أو service. والـ strings.xml لأي نص بيظهر للمستخدم من أول يوم، حتى لو لغة واحدة.`,
            mistakes: R`تنسى INTERNET وتقعد ساعة تدوّر في كود Retrofit. وتكتب نصوص عربي في الكود على طول. وتنسى [[android:exported]] على Activity فيها intent-filter فالبناء يقع (إجباري من Android 12).`
          },
          teach: R`## الملف ده بيعمل إيه؟

ده [[app/src/main/AndroidManifest.xml]]: بيقول لنظام Android «التطبيق ده محتاج النت، وأيقونته واسمه وثيمه دول، وفيه شاشة اسمها MainActivity هي اللي تفتح من الأيقونة». والـ solCode ملفين [[strings.xml]]: نصوص التطبيق بالإنجليزي وبالعربي.

> فين اتجرّب: الـ manifest ده وملفين الـ strings زي ما هم اتحطوا في مشروع Notes حقيقي (ومعاهم [[themes.xml]] فيه [[Theme.Notes]] وأيقونة [[ic_launcher]] بسيطة عشان الـ [[@style]] و [[@mipmap]] يلاقوا حاجة)، واتبنى بـ [[./gradlew assembleDebug]] (AGP 9.4.1) جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]]. وبعدين قرينا الـ manifest المدموج، وكلاس [[R]] اللي اتولّد، والـ APK بـ [[aapt2]]، وكسرنا حاجات عمدًا عشان نشوف الأخطاء الحقيقية. والنصوص بالعربي والإنجليزي اتقروا فعلًا بـ [[getString]] في اختبار Robolectric (Android وهمي على الـ JVM). مفيش emulator، فاسم التطبيق تحت الأيقونة على موبايل حقيقي من الـ docs.

---

## ١. أول سطرين: XML

~~~text
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
~~~

- السطر الأول اسمه XML declaration: نسخة XML والترميز. [[utf-8]] عشان الحروف العربي وأي لغة تتقري صح.
- [[<manifest>]]: العنصر الأساسي، وكل حاجة جواه.
- [[xmlns:android="..."]]: [[xmlns]] = XML namespace. بيقول «أي attribute يبدأ بـ [[android:]] جاي من القاموس ده». الـ URL ده مش بيتفتح، هو اسم فريد بس. من غيره [[android:name]] متبقاش مفهومة.

قواعد XML السريعة: كل عنصر بيتفتح [[<x>]] ويتقفل [[</x>]]، أو يتقفل في نفس السطر [[<x ... />]] لو ملوش حاجة جواه. والـ attributes [[name="value"]] جوه الـ tag.

---

## ٢. [[<uses-permission>]]

~~~text
    <uses-permission android:name="android.permission.INTERNET" />
~~~

- صلاحية التطبيق محتاجها. [[INTERNET]] اسمها كامل [[android.permission.INTERNET]].
- دي صلاحية **normal**: بتتدّى أوتوماتيك وقت التسطيب، واليوزر مش بيتسأل. الصلاحيات **dangerous** (الكاميرا، الموقع، المايك) بتتكتب هنا **و** بتتطلب وقت التشغيل (درس الصلاحيات).
- لاحظ [[/>]]: العنصر ملوش محتوى، فبيتقفل في نفس السطر.

### لو نسيتها؟

شلنا السطر ده وبنينا: البناء **نجح** عادي، ومفيش ولا تحذير. وفي الـ APK اللي طلع، [[aapt2 dump permissions]] مطلّعش [[INTERNET]] خالص:

~~~text الناتج
package: com.sara.notes
permission: com.sara.notes.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION
uses-permission: name='com.sara.notes.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION'
~~~

يعني الغلط ده مش هيبان غير **وقت التشغيل** أول ما التطبيق يكلّم النت، وساعتها بيقع بـ [[SocketException: socket failed: EPERM (Operation not permitted)]] أو [[UnknownHostException]] (ده من الـ docs، مفيش موبايل هنا). عشان كده هي أشهر غلطة في أول تطبيق بيكلّم API. (والصلاحية الغريبة اللي في الناتج جاية من مكتبة، هنشوفها في الـ manifest المدموج تحت.)

---

## ٣. [[<application>]]

~~~text
    <application
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/Theme.Notes">
~~~

إعدادات التطبيق كله، وجواه كل الشاشات.

| الـ attribute | القيمة | معناها |
|---|---|---|
| [[android:icon]] | [[@mipmap/ic_launcher]] | الأيقونة من [[res/mipmap-*/]] |
| [[android:label]] | [[@string/app_name]] | الاسم تحت الأيقونة، من [[strings.xml]] |
| [[android:supportsRtl]] | [[true]] | لو لغة الجهاز عربي، الواجهة تتقلب يمين لشمال |
| [[android:theme]] | [[@style/Theme.Notes]] | الثيم من [[res/values/themes.xml]] |

### يعني إيه [[@]]؟

[[@نوع/اسم]] = «resource من فولدر res». [[@string/app_name]] معناها «النص اللي اسمه app_name في [[res/values/strings.xml]]». والنظام بيختار النسخة المناسبة للجهاز وقت التشغيل: لو الجهاز عربي ياخد من [[values-ar]].

### لو اسم الـ resource غلط

كتبنا [[@string/app_nam]] (ناقصة حرف) وبنينا:

~~~text الناتج
Execution failed for task ':app:processDebugResources' (registered by plugin 'com.android.internal.application').
> A failure occurred while executing com.android.build.gradle.internal.res.LinkApplicationAndroidResourcesTask$TaskAction
   > Android resource linking failed
     ERROR: /w/app/src/main/AndroidManifest.xml:4:5-17:19: AAPT: error: resource string/app_nam (aka com.sara.notes:string/app_nam) not found.
~~~

- **AAPT** (Android Asset Packaging Tool) هو اللي بيجمّع الـ resources ويربطها ببعض. لما مبيلاقيش [[@string/app_nam]] بيوقف البناء.
- [[4:5-17:19]]: من سطر 4 عمود 5 لحد سطر 17 عمود 19، يعني عنصر [[<application>]] كله. و [[/w/]] مكان المشروع جوه الـ container.
- [[(aka com.sara.notes:string/app_nam)]]: الاسم الكامل: [[package:نوع/اسم]].

يعني غلطة الـ resource بتتمسك وقت البناء، عكس الصلاحية الناقصة.

> القالب الحقيقي في Android Studio فيه attributes زيادة، زي [[android:roundIcon]] (أيقونة مدورة) و [[android:allowBackup]] و [[android:dataExtractionRules]] (إعدادات الـ backup). المثال شالهم عشان يقصر.

---

## ٤. [[<activity>]]

~~~text
        <activity
            android:name=".MainActivity"
            android:exported="true">
~~~

- [[<activity>]]: كل شاشة (Activity) في التطبيق **لازم** تتعلن هنا، وإلا النظام يرمي exception لما تحاول تفتحها.
- [[android:name=".MainActivity"]]: الكلاس. النقطة في الأول معناها «جوه الـ namespace»، فبتبقى [[com.sara.notes.MainActivity]].
- [[android:exported="true"]]: مسموح لتطبيقات تانية (زي الـ launcher) تفتح الشاشة دي. أي Activity فيها [[<intent-filter>]] لازم يتكتب لها exported صراحة، والتطبيق اللي targetSdk بتاعه 31 (Android 12) أو أكتر مش هيتبني من غيره.

شلنا [[android:exported="true"]] وبنينا (targetSdk 36):

~~~text الناتج
/w/app/src/main/AndroidManifest.xml:9:9-15:20 Error:
	android:exported needs to be explicitly specified for element <activity#com.sara.notes.MainActivity>. Apps targeting Android 12 and higher are required to specify an explicit value for $__btandroid:exported$__bt when the corresponding component has an intent filter defined. See https://developer.android.com/guide/topics/manifest/activity-element#exported for details.
...
> Manifest merger failed : android:exported needs to be explicitly specified for element <activity#com.sara.notes.MainActivity>. ...
~~~

الغلط جه من الـ task [[processDebugMainManifest]] اسمها **Manifest merger** (هنشرحه تحت)، ولاحظ إنه كاتب الاسم الكامل [[com.sara.notes.MainActivity]] بعد ما حط الـ namespace مكان النقطة.

---

## ٥. [[<intent-filter>]]: الشاشة اللي تفتح من الأيقونة

~~~text
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
~~~

الـ **intent** رسالة «عايز أعمل كذا» بتتبعت للنظام. والـ **intent-filter** بيقول «الشاشة دي بترد على الرسايل اللي شكلها كذا».

| السطر | معناه |
|---|---|
| [[action.MAIN]] | دي نقطة البداية للتطبيق، مش محتاجة داتا |
| [[category.LAUNCHER]] | اعرضها في قايمة التطبيقات |

الاتنين مع بعض = «لما اليوزر يدوس الأيقونة، افتح الشاشة دي». ولو مفيش Activity فيها الاتنين، التطبيق هيتسطّب بس مش هيظهر له أيقونة.

وبعدها 3 قفلات: [[</activity>]] و [[</application>]] و [[</manifest>]]، بعكس ترتيب الفتح.

[[aapt2 dump badging]] على الـ APK أكّد الكلام ده: طلّع [[launchable-activity: name='com.sara.notes.MainActivity']]، يعني الـ launcher هيلاقي الشاشة دي.

---

## الـ manifest اللي بيدخل الـ APK فعلًا (Merged Manifest)

الملف اللي كتبته مش النهائي. وقت البناء، الـ task [[processDebugMainManifest]] بتدمجه مع manifests كل المكتبات وإعدادات Gradle. النتيجة في [[app/build/intermediates/merged_manifest/debug/processDebugMainManifest/AndroidManifest.xml]]، ودي أهم الحاجات اللي فيها (مختصرة):

~~~text الـ manifest المدموج (مختصر)
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.sara.notes"
    android:versionCode="1"
    android:versionName="1.0" >
    <uses-sdk
        android:minSdkVersion="24"
        android:targetSdkVersion="36" />
    <uses-permission android:name="android.permission.INTERNET" />
    <permission
        android:name="com.sara.notes.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION"
        android:protectionLevel="signature" />
    <uses-permission android:name="com.sara.notes.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION" />
    <application
        android:appComponentFactory="androidx.core.app.CoreComponentFactory"
        android:debuggable="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        ...
        <activity
            android:name="com.sara.notes.MainActivity"
            android:exported="true" >
        ...
        <provider
            android:name="androidx.startup.InitializationProvider"
            android:authorities="com.sara.notes.androidx-startup"
            android:exported="false" >
        ...
        <receiver
            android:name="androidx.profileinstaller.ProfileInstallReceiver"
        ...
~~~

| الحاجة | جت منين |
|---|---|
| [[package]] و [[versionCode]] و [[versionName]] و [[<uses-sdk>]] | من [[build.gradle.kts]] ([[namespace]] و [[defaultConfig]]). عشان كده مبتكتبهاش في الـ manifest |
| [[android:name="com.sara.notes.MainActivity"]] | [[.MainActivity]] بتاعتك بعد ما الـ namespace اتحط مكان النقطة |
| [[DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION]] | من مكتبة [[androidx.core]]: صلاحية [[signature]] (تطبيقك بس يقدر ياخدها) بتستخدمها لحماية الـ broadcast receivers |
| [[InitializationProvider]] | من [[androidx.startup]]: بيشغّل حاجات مكتبات (emoji2 و lifecycle-process و profileinstaller) أول ما التطبيق يفتح |
| [[ProfileInstallReceiver]] | من [[profileinstaller]]: بيساعد Play يسرّع أول تشغيل |
| [[android:debuggable="true"]] | لأنها نسخة debug |

وعشان تعرف كل سطر جه منين بالظبط، فيه تقرير في [[app/build/outputs/logs/manifest-merger-debug-report.txt]]:

~~~text الناتج (أول سطور منه، المسارات مختصرة)
-- Merging decision tree log ---
manifest
ADDED from /w/app/src/main/AndroidManifest.xml:2:1-18:12
MERGED from [androidx.compose.material3:material3-android:1.4.0] .../material3/AndroidManifest.xml:17:1-22:12
MERGED from [androidx.activity:activity:1.13.0] .../activity-1.13.0/AndroidManifest.xml:17:1-22:12
...
uses-permission#android.permission.INTERNET
ADDED from /w/app/src/main/AndroidManifest.xml:3:5-67
~~~

[[ADDED]] = من ملفك، و [[MERGED from]] = من مكتبة (اسمها ونسختها بين القوسين المربعين)، و [[INJECTED]] = Gradle حطه من [[build.gradle.kts]]. في Android Studio نفس المعلومات في تاب **Merged Manifest** تحت الملف. ولو مكتبة ضافت حاجة مش عايزها: [[tools:node="remove"]] على نفس العنصر في ملفك.

---

## ٦. فولدر [[res/]] و الـ qualifiers

~~~text res في القالب (مختصر)
res/
├── drawable/          صور و vector icons
├── mipmap-hdpi/ ... mipmap-xxxhdpi/   أيقونة التطبيق بكذا مقاس
├── mipmap-anydpi-v26/ الأيقونة الـ adaptive (بتتشكّل حسب الموبايل)
├── values/
│   ├── strings.xml    النصوص الافتراضية
│   ├── colors.xml
│   └── themes.xml
└── xml/               ملفات إعدادات (backup rules)
~~~

اللي بعد الشَرطة في اسم الفولدر اسمه **qualifier**، والنظام بيختار على أساسه:

| الفولدر | بيتاخد لما |
|---|---|
| [[values]] | دايمًا (الافتراضي) |
| [[values-ar]] | لغة الجهاز عربي |
| [[values-night]] | الـ dark mode شغال |
| [[mipmap-xxhdpi]] | كثافة الشاشة عالية (حوالي 480 dpi) |

---

## ٧. الـ solCode: [[strings.xml]] بلغتين

~~~text res/values/strings.xml
<resources>
    <string name="app_name">Notes</string>
    <string name="welcome">Welcome, %1$s</string>
</resources>
~~~

~~~text res/values-ar/strings.xml
<resources>
    <string name="app_name">ملاحظاتي</string>
    <string name="welcome">أهلًا يا %1$s</string>
</resources>
~~~

- [[<resources>]]: العنصر الأساسي لأي ملف في [[values]].
- [[<string name="...">]]: الـ [[name]] هو اللي الكود بيستخدمه، **لازم يبقى هو هو** في الملفين. والنص بين الـ tags هو اللي بيتغير.
- [[%1$s]]: مكان قيمة هتتبعت وقت التشغيل. [[%]] «هنا قيمة»، و [[1$]] «الـ argument رقم 1»، و [[s]] «كنص» (string). ولرقم صحيح [[%2$d]]. الترقيم مهم في الترجمة لأن ترتيب الكلام بيختلف بين اللغات.
- [[<!-- ... -->]] اللي في أول الـ solCode تعليق XML، بيوضّح اسم كل ملف.

### لو نسيت ترجمة

شلنا [[welcome]] من ملف العربي وشغّلنا [[./gradlew lintDebug]]:

~~~text الناتج
/w/app/src/main/res/values/strings.xml:3: Error: "welcome" is not translated in "ar" (Arabic) [MissingTranslation]
    <string name="welcome">Welcome, %1$s</string>
            ~~~~~~~~~~~~~~
~~~

البناء العادي ([[assembleDebug]]) مش بيقف، بس **lint** بيعتبرها Error ([[MissingTranslation]]) و [[lintDebug]] بيقع. ووقت التشغيل الجهاز العربي هياخد النص الإنجليزي من [[values]]. ولو نص مش محتاج ترجمة (اسم براند مثلًا): [[translatable="false"]].

---

## ٨. من الكود: كلاس [[R]]

وقت البناء، AGP بيولّد كلاس اسمه [[R]] في الـ namespace ([[com.sara.notes.R]])، فيه رقم [[Int]] لكل resource:

| في الكود | معناه |
|---|---|
| [[R.string.app_name]] | رقم النص app_name، **مش** النص نفسه |
| [[R.drawable.logo]] | رقم صورة [[res/drawable/logo]] |
| [[stringResource(R.string.welcome, "Sara")]] | في Compose: النص، و [[Sara]] مكان [[%1$s]] |
| [[getString(R.string.welcome, "Sara")]] | نفس الكلام من Activity أو Context |
| [[painterResource(R.drawable.logo)]] | صورة في Compose |

### كلاس R الحقيقي

ده اللي AGP ولّده للمشروع ده (مقروء بـ [[javap]] من [[R.jar]] في [[app/build/intermediates/]]):

~~~text الناتج
public final class com.sara.notes.R$string {
  public static int app_name;
  public static int welcome;
}
public final class com.sara.notes.R$mipmap {
  public static int ic_launcher;
}
public final class com.sara.notes.R$style {
  public static int Theme_Notes;
}
~~~

- كل نوع resource كلاس جوه [[R]]: [[R$string]] هو اللي بتكتبه [[R.string]] ([[$]] هي طريقة Java في تسمية الكلاس اللي جوه كلاس).
- [[Theme.Notes]] بقت [[Theme_Notes]]: النقطة مينفعش تبقى في اسم متغير، فبتبقى [[_]]. وفي XML بتفضل [[@style/Theme.Notes]].
- القيم أرقام: [[R.string.welcome]] طلعت [[2131296355]]، يعني [[0x7f090063]] بالـ hex. [[7f]] = تطبيقك (الـ [[01]] لـ Android نفسه)، و [[09]] = النوع (string هنا)، و [[0063]] = رقم الـ resource. الأرقام دي ممكن تتغير من build لـ build، فمتحفظهاش ولا تكتبها في الكود.

و [[aapt2 dump resources]] على الـ APK بيوريك الـ resource الواحد بكل نسخه:

~~~text الناتج
    resource 0x7f090063 string/welcome
      () "Welcome, %1$s"
      (ar) "أهلًا يا %1$s"
~~~

[[()]] = النسخة الافتراضية من [[values]]، و [[(ar)]] من [[values-ar]]. رقم واحد ونسختين، والنظام بيختار وقت التشغيل.

### النتيجة: نفس السطر بلغتين

اختبار Robolectric نادى [[getString(R.string.app_name)]] و [[getString(R.string.welcome, "Sara")]] بـ ٣ لغات (بـ [[@Config(qualifiers = "...")]]):

~~~text الناتج
ResTest > english STANDARD_OUT
    R.string.welcome = 2131296355 (0x7f090063)
    Notes | Welcome, Sara
    layoutDirection = 0
ResTest > arabic STANDARD_OUT
    R.string.welcome = 2131296355 (0x7f090063)
    ملاحظاتي | أهلًا يا Sara
    layoutDirection = 1
ResTest > french STANDARD_OUT
    R.string.welcome = 2131296355 (0x7f090063)
    Notes | Welcome, Sara
    layoutDirection = 0
~~~

- نفس الرقم في التلاتة، والنص اتغيّر حسب اللغة: العربي خد من [[values-ar]]، والفرنساوي ملوش فولدر فخد الافتراضي من [[values]].
- [[layoutDirection = 1]] يعني RTL (يمين لشمال)، وده بسبب [[android:supportsRtl="true"]] مع لغة عربي. و [[0]] = LTR.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[<uses-permission>]] | صلاحية ([[INTERNET]] لأي شبكة) |
| [[<application android:...>]] | الأيقونة والاسم والثيم و RTL |
| [[@string/x]] و [[@mipmap/x]] | resource من [[res]] |
| [[<activity android:name=".X" android:exported="true">]] | شاشة، ومسموح تتفتح من برا |
| [[MAIN]] + [[LAUNCHER]] | الشاشة اللي تفتح من الأيقونة |
| [[values-ar/strings.xml]] | نفس الأسامي بالعربي، والنظام بيختار |
| [[%1$s]] | أول argument كنص |
| Merged Manifest | ملفك + المكتبات + [[build.gradle.kts]] |
| [[R.string.x]] | رقم [[Int]] زي [[0x7f090063]] |

اللي ميتلخبطش: [[R.string.x]] رقم مش نص، فلازم [[stringResource]] أو [[getString]]. ونسيان [[INTERNET]] بيوقّع كل نداء شبكة حتى والنت شغال.`,
          lines: [
            "أول سطر في أي ملف XML: النسخة والترميز.",
            R`[[manifest]]: والـ namespace اللي بيعرّف بادئة [[android:]].`,
            "صلاحية النت (مش محتاجة سؤال لليوزر).",
            R`بداية [[application]]: إعدادات التطبيق كله.`,
            R`الأيقونة من [[res/mipmap]].`,
            R`الاسم من [[strings.xml]].`,
            "يدعم الاتجاه من اليمين للشمال.",
            R`الثيم من [[res/values/themes.xml]] (Compose بيكمّل الباقي في الكود).`,
            R`[[activity]]: شاشة في التطبيق.`,
            R`الكلاس بتاعها. النقطة في الأول معناها «جوه الـ namespace».`,
            "ينفع تتفتح من برا التطبيق.",
            "بداية الـ intent-filter.",
            "دي نقطة البداية...",
            "...وتظهر في قايمة التطبيقات.",
            "قفلة intent-filter.",
            "قفلة activity.",
            "قفلة application.",
            "قفلة manifest."
          ],
          sol: R`الـ emulator بالعربي هيعرض الاسم من [[values-ar]]، وبالإنجليزي من [[values]]. ولو نسيت نص في ملف العربي، Android بياخده من الافتراضي، و [[./gradlew lintDebug]] بيقع بـ Error اسمه [[MissingTranslation]]: [["welcome" is not translated in "ar" (Arabic)]].

[[stringResource(R.string.welcome, "Sara")]] هيعرض «أهلًا يا Sara» بالعربي أو «Welcome, Sara» بالإنجليزي.`,
          solCode: R`<!-- res/values/strings.xml -->
<resources>
    <string name="app_name">Notes</string>
    <string name="welcome">Welcome, %1$s</string>
</resources>

<!-- res/values-ar/strings.xml -->
<resources>
    <string name="app_name">ملاحظاتي</string>
    <string name="welcome">أهلًا يا %1$s</string>
</resources>`
        },
        {
          cmd: "Activity و lifecycle",
          title: "الـ Activity ودورة حياتها: onCreate و onStart و onResume و onPause و onStop و onDestroy",
          desc: R`الـ [[Activity]] هي الشاشة اللي النظام بيفتحها. في تطبيقات Compose غالبًا عندك واحدة بس ([[MainActivity]])، وكل الشاشات جواها كـ composables، والتنقل بينهم بـ Navigation.

[[class MainActivity : ComponentActivity()]] معناها إنها بتورث من [[ComponentActivity]]. والنظام هو اللي بيعمل الـ object وبينادي دوال معينة في أوقات معينة. دي اسمها lifecycle callbacks، وانت بتعمل لها [[override]]:
• [[onCreate]]: أول مرة. هنا [[setContent { }]] اللي بتحط فيها الـ Compose UI.
• [[onStart]]: الشاشة بقت ظاهرة.
• [[onResume]]: الشاشة قدام واليوزر يقدر يتفاعل.
• [[onPause]]: حاجة غطّتها جزئيًا، أو بتقفل.
• [[onStop]]: مش ظاهرة خالص (اليوزر داس Home مثلًا).
• [[onDestroy]]: الـ object هيتمسح.

أهم حاجة تفهمها: لما الموبايل يلف (rotation) أو اللغة أو الـ dark mode يتغير، النظام بيعمل destroy للـ Activity ويعملها من الأول (اسمها configuration change). أي متغير عادي جوه الـ Activity بيضيع. ده سبب وجود [[rememberSaveable]] و [[ViewModel]] (دروس جاية).

و [[enableEdgeToEdge()]]: التطبيق يرسم ورا الـ status bar والـ navigation bar. من Android 15 مع targetSdk 35+ ده إجباري، فلازم تسيب مسافة بـ [[innerPadding]] اللي جاية من [[Scaffold]].

[[super.onCreate(...)]] لازم تتنادى في الأول: بتخلي الأب يعمل شغله. و [[savedInstanceState: Bundle?]] فيه state متحفوظ لو الـ Activity اتعملت تاني (nullable لأنه null أول مرة).`,
          example: R`// الـ imports اتشالت عشان المثال يقصر، و Android Studio بيضيفها بـ Alt+Enter
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d("Life", "onCreate")
        enableEdgeToEdge()
        setContent {
            NotesTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Text("أهلًا", modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }
    override fun onStart() { super.onStart(); Log.d("Life", "onStart") }
    override fun onResume() { super.onResume(); Log.d("Life", "onResume") }
    override fun onPause() { super.onPause(); Log.d("Life", "onPause") }
    override fun onStop() { super.onStop(); Log.d("Life", "onStop") }
    override fun onDestroy() { super.onDestroy(); Log.d("Life", "onDestroy") }
}`,
          try: R`حط الكود ده في MainActivity، وافتح Logcat واكتب في الفلتر [[tag:Life]]. شغّل التطبيق، وبعدين: (١) لف الـ emulator، (٢) دوس Home وارجع، (٣) دوس Back. اكتب الترتيب اللي ظهر في كل مرة.`,
          flag: "script",
          deep: {
            why: R`أشهر بقّين في تطبيقات المبتدئين: داتا بتضيع لما الموبايل يلف، وحاجة (كاميرا، location، اتصال) فاضلة شغالة والشاشة مقفولة فالبطارية بتخلص. الاتنين سببهم إنك مش عارف الـ lifecycle.`,
            how: R`[[ComponentActivity]] هي الأب الحديث، وهي [[LifecycleOwner]]: أي حاجة تقدر «تتفرج» على الـ lifecycle بدل ما تكتب كود في كل callback. Compose بيعمل كده: [[collectAsStateWithLifecycle()]] بتوقف التجميع لوحدها لما الشاشة توصل onStop.

ولو محتاج تعمل حاجة على أحداث الـ lifecycle من جوه composable: [[LifecycleEventEffect(Lifecycle.Event.ON_RESUME) { ... }]] من مكتبة lifecycle-runtime-compose.

[[AppCompatActivity]] هتشوفها في المشاريع القديمة (XML)، وهي بتورث من ComponentActivity ومعاها دعم الثيمات القديمة.

ولو النظام محتاج ذاكرة ممكن يقتل التطبيق كله وهو في الخلفية (process death). لما اليوزر يرجع، الـ Activity بتتعمل من الأول و [[savedInstanceState]] فيه اللي اتحفظ، بس الـ ViewModel نفسه بيضيع. عشان كده الداتا المهمة مكانها [[SavedStateHandle]] أو الداتابيز.`,
            when: R`أغلب الشغل في [[onCreate]] (الـ setContent). والباقي نادرًا ما هتكتبه بنفسك في Compose، بس لازم تفهم الترتيب عشان تفهم ليه الـ ViewModel موجود.`,
            mistakes: R`تحفظ داتا في متغير جوه الـ Activity وتستغرب إنها اتصفّرت مع اللفة. وتنسى [[super.onXxx()]] فيقع بـ [[SuperNotCalledException]]. وتنسى [[innerPadding]] مع edge-to-edge فالكلام يتداري تحت الـ status bar.`
          },
          teach: R`## الكود ده بيعمل إيه؟

ده [[MainActivity.kt]] تقريبًا زي ما قالب Empty Activity بيعمله، وزوّدنا عليه سطر log في كل lifecycle callback. الهدف إنك تشغّل التطبيق وتشوف في Logcat النظام بينادي أنهي دالة وإمتى.

> فين اتجرّب: الكود ده زي ما هو (ومعاه الـ imports اللي تحت و [[NotesTheme]] بسيط) اتبنى في مشروع Android حقيقي بـ [[./gradlew assembleDebug]] (AGP 9.4.1 و Kotlin 2.4.20) جوه [[docker run --rm ghcr.io/cirruslabs/flutter:stable]]. مفيش emulator ولا موبايل، فبدل Logcat شغّلنا نفس الـ Activity في اختبار **Robolectric** (مكتبة بتشغّل Android وهمي على الـ JVM، هنا Android 15) وحرّكناها في دورة حياتها، وطبعنا سطور الـ [[Log.d]] اللي بتطلع. ترتيب الـ callbacks تحت حقيقي من هناك. أما سلوك زرار Back على موبايل حقيقي فمن الـ docs الرسمية (developer.android.com: «The activity lifecycle» و «Behavior changes: Android 12»)، لأن Robolectric مبيقلّدهوش.

---

## ١. الـ imports اللي اتشالت

المثال كاتب في أوله إن الـ imports اتشالت. دي اللي Android Studio بيحطها (بـ Alt+Enter على أي اسم أحمر):

~~~kotlin
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.ui.Modifier
import com.sara.notes.ui.theme.NotesTheme
~~~

[[android.*]] جاي مع Android نفسه، و [[androidx.*]] مكتبات Jetpack اللي في [[dependencies]] (درس Gradle)، و [[NotesTheme]] من ملف [[ui/theme/Theme.kt]] اللي القالب عمله.

---

## ٢. سطر الكلاس

~~~kotlin
class MainActivity : ComponentActivity() {
~~~

- [[: ComponentActivity()]]: بيورث من [[ComponentActivity]] وبينادي الـ constructor بتاعه بالأقواس الفاضية (درس interface والوراثة). [[ComponentActivity]] [[open]]، عشان كده نقدر نورث منه.
- انت **مش** بتعمل [[MainActivity()]] بنفسك أبدًا. النظام هو اللي بيعمل الـ object لما اليوزر يفتح التطبيق (عشان كده مكتوبة في الـ manifest)، وبينادي الدوال اللي تحت في الوقت المناسب.

---

## ٣. [[onCreate]]

~~~kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d("Life", "onCreate")
        enableEdgeToEdge()
~~~

| الحتة | معناها |
|---|---|
| [[override fun onCreate]] | بنكتب نسختنا من دالة موجودة في الأب |
| [[savedInstanceState: Bundle?]] | [[Bundle]] شنطة key/value فيها state متحفوظ. و [[?]] لأنها [[null]] أول مرة، وفيها حاجة لو الـ Activity بتتعمل تاني بعد ما اتمسحت |
| [[super.onCreate(savedInstanceState)]] | [[super]] = الأب. «يا ComponentActivity اعمل شغلك الأول». لو نسيتها التطبيق يقع بـ [[SuperNotCalledException]] |
| [[Log.d("Life", "onCreate")]] | اكتب في Logcat. [[d]] = debug (المستوى)، و [[Life]] الـ tag اللي هتفلتر بيه، والتاني الرسالة |
| [[enableEdgeToEdge()]] | التطبيق يرسم ورا الـ status bar (فوق) والـ navigation bar (تحت) |

مستويات [[Log]]: [[Log.v]] (verbose) و [[Log.d]] (debug) و [[Log.i]] (info) و [[Log.w]] (warning) و [[Log.e]] (error)، وكل واحد ليه لون في Logcat.

---

## ٤. [[setContent]]: الواجهة

~~~kotlin
        setContent {
            NotesTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Text("أهلًا", modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }
~~~

من جوه لبرة:

1. [[Text("أهلًا", ...)]]: composable بيعرض نص.
2. [[Scaffold(...) { innerPadding -> ... }]]: الهيكل الأساسي لشاشة Material (فيه أماكن لـ top bar و bottom bar). الـ lambda بتاعته بتاخد parameter اسمه [[innerPadding]]: المسافات اللي الـ system bars واخدينها.
3. [[Modifier.padding(innerPadding)]]: سيب المسافة دي، وإلا «أهلًا» هيتداري تحت الـ status bar (عشان احنا عاملين edge-to-edge).
4. [[Modifier.fillMaxSize()]]: الـ Scaffold ياخد الشاشة كلها.
5. [[NotesTheme { }]]: الألوان والخطوط بتاعة التطبيق لكل اللي جواه.
6. [[setContent { }]]: من ComponentActivity (extension من مكتبة activity-compose): «الواجهة بتاعة الشاشة دي هي الـ composables دي».

كلهم trailing lambdas (درس lambdas): آخر parameter دالة، فبتتكتب برا الأقواس. وكل ده له دروس في قسم Compose.

---

## ٥. باقي الـ callbacks

~~~kotlin
    override fun onStart() { super.onStart(); Log.d("Life", "onStart") }
    override fun onResume() { super.onResume(); Log.d("Life", "onResume") }
    override fun onPause() { super.onPause(); Log.d("Life", "onPause") }
    override fun onStop() { super.onStop(); Log.d("Life", "onStop") }
    override fun onDestroy() { super.onDestroy(); Log.d("Life", "onDestroy") }
~~~

كل سطر دالة كاملة: [[override]]، ونداء الأب، و log. و [[;]] بتفصل أمرين في سطر واحد (من غيرها كنا هنكتب كل دالة في ٣ سطور).

| الـ callback | الشاشة | النظام بيناديه لما |
|---|---|---|
| [[onCreate]] | اتعملت | أول مرة، أو بعد ما اتمسحت |
| [[onStart]] | ظاهرة | هتظهر لليوزر |
| [[onResume]] | قدام وبتتفاعل | اليوزر يقدر يلمسها |
| [[onPause]] | بتفقد التركيز | dialog نظام غطّاها جزئيًا، أو أول خطوة في القفل |
| [[onStop]] | مش ظاهرة | اليوزر داس Home أو فتح تطبيق تاني |
| [[onDestroy]] | هتتمسح | بتتقفل، أو configuration change |

والترتيب دايمًا متناظر: [[onCreate]]/[[onDestroy]]، و [[onStart]]/[[onStop]]، و [[onResume]]/[[onPause]].

---

## ٦. اللي هتشوفه في Logcat (الـ try)

على الموبايل، فلتر [[tag:Life]] بيخلّي Logcat يعرض سطورنا بس. وهنا شغّلنا نفس الحركات بالكود في اختبار Robolectric:

~~~kotlin
val scenario = ActivityScenario.launch(MainActivity::class.java)
scenario.recreate()
scenario.moveToState(Lifecycle.State.CREATED)
scenario.moveToState(Lifecycle.State.RESUMED)
scenario.close()
~~~

| السطر | بيقلّد إيه |
|---|---|
| [[ActivityScenario.launch(...)]] | فتح التطبيق من الأيقونة |
| [[recreate()]] | configuration change، زي لف الموبايل |
| [[moveToState(Lifecycle.State.CREATED)]] | الشاشة مبقتش ظاهرة، زي Home |
| [[moveToState(Lifecycle.State.RESUMED)]] | رجعت للتطبيق |
| [[close()]] | الـ Activity اتقفلت خالص |

وبعد كل خطوة طبعنا سطور الـ tag [[Life]] اللي اتكتبت:

~~~text الناتج
--- launch
onCreate
onStart
onResume
--- recreate (rotation)
onPause
onStop
onDestroy
onCreate
onStart
onResume
--- Home
onPause
onStop
--- back to app
onStart
onResume
--- close
onPause
onStop
onDestroy
~~~

### أول تشغيل

[[onCreate]] ثم [[onStart]] ثم [[onResume]]: اتعملت، بقت ظاهرة، بقت قدام وتقدر تلمسها.

### (١) اللفة

٦ سطور: الـ object القديم خلص لآخره ([[onPause]] و [[onStop]] و [[onDestroy]])، وبعدين object **جديد** بدأ من الأول. ده اسمه **configuration change** (زي تغيير اللغة أو الـ dark mode): النظام بيمسح الـ object ويعمل واحد جديد عشان يحمّل الـ resources المناسبة للوضع الجديد. أي متغير عادي جوه الـ Activity ضاع، وده سبب [[rememberSaveable]] و [[ViewModel]].

### (٢) Home وبعدين رجعت

[[onPause]] و [[onStop]] بس، وفي الرجوع [[onStart]] و [[onResume]]. مفيش [[onCreate]] في الرجوع: الـ object لسه موجود بكل متغيراته.

### (٣) Back

جرّبنا كمان [[onBackPressedDispatcher.onBackPressed()]] في نفس الاختبار، ومطلعش ولا سطر والحالة فضلت [[RESUMED]]: Robolectric مبيعملش اللي النظام الحقيقي بيعمله مع Back. اللي بيحصل على موبايل (من الـ docs):

~~~text Back على Android 12 أو أحدث (من الـ docs)
onPause
onStop
~~~

من Android 12، الـ Back على الـ Activity الرئيسية (اللي بتفتح من الأيقونة) بيودّيها الخلفية بس ومبيمسحهاش، فالرجوع ليها أسرع. على Android 11 وأقدم هتشوف [[onDestroy]] بعدهم، زي آخر ٣ سطور في الناتج اللي فوق لما قفلنا بـ [[close()]].

> الاختبار اتشغّل بـ [[@Config(sdk = [35])]] (Android 15). بـ Android 16 (sdk 36) Robolectric 4.17 وقع على Java 21 هنا بـ [[Failed to interact with raw FileDescriptor internals; perhaps JRE has changed?]]، ودي مشكلة في الأداة مش في الكود.

---

## ٧. ليه ده مهم؟

| المشكلة | السبب | الحل |
|---|---|---|
| الداتا بتضيع مع اللفة | الـ object اتمسح واتعمل تاني | [[ViewModel]] أو [[rememberSaveable]] |
| الكاميرا أو الـ GPS شغالين والشاشة مقفولة | محدش وقّفهم في [[onStop]] | حاجات بتتفرج على الـ lifecycle زي [[collectAsStateWithLifecycle()]] |
| الكلام تحت الـ status bar | [[enableEdgeToEdge()]] من غير [[innerPadding]] | [[Modifier.padding(innerPadding)]] |

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[class X : ComponentActivity()]] | شاشة، والنظام هو اللي بيعملها |
| [[override fun onCreate(savedInstanceState: Bundle?)]] | أول ما تتعمل، وهنا [[setContent]] |
| [[super.onXxx()]] | لازم في كل callback |
| [[Log.d(tag, msg)]] | سطر في Logcat |
| [[enableEdgeToEdge()]] + [[innerPadding]] | ارسم ورا الـ bars وسيب مسافة |
| اللفة | destroy ثم create من جديد |
| Home ثم رجوع | [[onPause]] [[onStop]] ثم [[onStart]] [[onResume]] من غير create |

اللي ميتلخبطش: Home بيوقف الشاشة ([[onStop]]) بس مبيمسحهاش، واللفة بتمسحها وتعملها تاني. فأي state مهم مكانه برا الـ Activity.`,
          lines: [
            R`الـ Activity بتورث من [[ComponentActivity]].`,
            R`[[override]] لـ onCreate، والـ Bundle nullable.`,
            R`خلي الأب يعمل شغله الأول.`,
            R`log في Logcat بالـ tag Life.`,
            "ارسم ورا الـ system bars.",
            R`[[setContent]]: من هنا بتبدأ واجهة Compose.`,
            R`الثيم اللي Android Studio عمله للمشروع (في ملف [[ui/theme/Theme.kt]]).`,
            R`[[Scaffold]] الهيكل الأساسي للشاشة، وبيدي [[innerPadding]] مسافة الـ system bars.`,
            "نص بمسافة عشان ميتداريش.",
            "قفلة Scaffold.",
            "قفلة الثيم.",
            "قفلة setContent.",
            "قفلة onCreate.",
            R`الشاشة بقت ظاهرة. [[;]] عشان أمرين في سطر واحد.`,
            "قدام وتفاعلية.",
            "بتفقد التركيز.",
            "مبقتش ظاهرة.",
            "هتتمسح.",
            "قفلة الكلاس."
          ],
          sol: R`أول تشغيل: [[onCreate]] ثم [[onStart]] ثم [[onResume]].

(١) اللفة: [[onPause]] ثم [[onStop]] ثم [[onDestroy]]، وبعدين من الأول [[onCreate]] ثم [[onStart]] ثم [[onResume]]. يعني object جديد خالص.

(٢) Home: [[onPause]] ثم [[onStop]]. والرجوع: [[onStart]] ثم [[onResume]] (من غير onCreate، لأنها لسه موجودة).

(٣) Back (ده من الـ docs، مفيش موبايل هنا): من Android 12، الـ Activity الرئيسية (اللي بتفتح من الـ launcher) مش بتتقفل بالـ Back، النظام بيوديها الخلفية بس: هتشوف [[onPause]] ثم [[onStop]] من غير onDestroy. على Android أقدم هتشوف onDestroy كمان.`
        }
      ]
    }
]);
