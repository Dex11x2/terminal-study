// تكملة تاب kotlin: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/kotlin/01.js (شرح حقول الدرس في أوله)
MORE("kotlin", [
    {
      t: "البناء والنشر",
      l: 3,
      n: "debug و release والـ flavors، والتوقيع بالـ keystore، و APK و AAB، و R8، و Play Console والـ tracks",
      items: [
        {
          cmd: "build variants و signing",
          title: "buildTypes و productFlavors والتوقيع: تبني نسخة staging ونسخة prod متوقّعة إزاي؟",
          desc: R`كل build في Android هو «variant» = build type × flavor.

• [[buildTypes]]: [[debug]] (افتراضي، متوقّع بمفتاح debug تلقائي، وفيه debugging) و [[release]] (للنشر). وتقدر تخلي الـ debug ليه [[applicationIdSuffix = ".debug"]] فيتسطّب جنب نسخة الـ release على نفس الموبايل.
• [[productFlavors]]: نسخ مختلفة من نفس التطبيق: [[staging]] و [[prod]] (سيرفرات مختلفة)، أو [[free]] و [[paid]]. لازم تحدد [[flavorDimensions]].
• [[buildConfigField]]: ثابت بيتولد في كلاس [[BuildConfig]]، فتكتب في الكود [[BuildConfig.API_URL]] وكل flavor ليه قيمته. محتاج [[buildFeatures { buildConfig = true }]].

النتيجة: ٤ variants: [[stagingDebug]] و [[stagingRelease]] و [[prodDebug]] و [[prodRelease]]. وتختار من Build Variants على الشمال، أو [[./gradlew assembleProdRelease]].

التوقيع (signing): Android مش بيسطّب أي تطبيق مش متوقّع. الـ [[keystore]] ملف فيه المفتاح الخاص بتاعك، وبتعمله مرة بـ [[keytool]] أو من Build ثم Generate Signed Bundle. والقاعدة الذهبية: كلمات السر والملف نفسه برا git. في المثال بتتقري من environment variables (ودا اللي بيتعمل على CI)، أو من ملف [[keystore.properties]] متجاهَل في [[.gitignore]].`,
          example: R`android {
    signingConfigs {
        create("release") {
            storeFile = file(System.getenv("KEYSTORE_PATH") ?: "release.jks")
            storePassword = System.getenv("KEYSTORE_PASSWORD")
            keyAlias = "upload"
            keyPassword = System.getenv("KEY_PASSWORD")
        }
    }
    buildTypes {
        debug {
            applicationIdSuffix = ".debug"
        }
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
            signingConfig = signingConfigs.getByName("release")
        }
    }
    flavorDimensions += "env"
    productFlavors {
        create("staging") {
            dimension = "env"
            buildConfigField("String", "API_URL", "\"https://staging.example.com/\"")
        }
        create("prod") {
            dimension = "env"
            buildConfigField("String", "API_URL", "\"https://api.example.com/\"")
        }
    }
    buildFeatures {
        buildConfig = true
    }
}`,
          try: R`اعمل keystore بالأمر اللي في الحل، وحطه برا فولدر المشروع. ضيف الـ flavors دي، واستخدم [[BuildConfig.API_URL]] في الـ baseUrl بتاع Retrofit. ابني [[./gradlew assembleStagingDebug]] وسطّبه، وابني prodRelease بالـ environment variables. واتأكد إن [[*.jks]] في [[.gitignore]].`,
          flag: "script",
          deep: {
            why: R`في الشغل الحقيقي محتاج تجرّب على سيرفر staging من غير ما تلمس داتا اليوزرز، ونفس الكود يطلع على السيرفر الحقيقي. والتوقيع هو اللي بيثبت إن التحديث جاي منك: Android مش هيسطّب تحديث متوقّع بمفتاح مختلف فوق النسخة القديمة.`,
            how: R`AGP بيعمل task لكل variant: [[assembleStagingDebug]] و [[bundleProdRelease]]... وكل variant ليه فولدر source خاص اختياري: [[src/staging/]] و [[src/debug/]] (مثلًا أيقونة مختلفة للـ staging عشان متتلخبطش على الموبايل).

[[signingConfigs.getByName("release")]]: ده Kotlin DSL، و [[create("release") { }]] بيعمل config جديد بالاسم ده.

[[buildConfigField]] قيمته بتتكتب كود Java حرفيًا، عشان كده النص محتاج علامات تنصيص جوه علامات تنصيص: [["\"https://...\""]].

[[System.getenv("X") ?: "release.jks"]]: الـ [[?:]] من درس null safety، لأن getenv بترجّع null لو المتغير مش موجود.

الـ secrets اللي في التطبيق نفسه (API keys في BuildConfig): أي حاجة في الـ APK ممكن تتقري بأدوات فك بسيطة، حتى مع R8. فمفاتيح الـ API الحساسة فعلًا مكانها السيرفر، والتطبيق يكلم السيرفر بتاعك.

ومع Play App Signing (الدرس الجاي) المفتاح ده اسمه upload key: Google بتوقّع التطبيق النهائي بمفتاح تاني عندها.`,
            when: "أول ما يبقى عندك سيرفر staging، أو قبل أول رفعة على Play. والـ debug suffix من أول يوم.",
            mistakes: R`تعمل commit للـ keystore أو كلمة السر في [[build.gradle.kts]]. وتنسى الـ keystore والباسورد ومتعملهمش backup. وتغيّر الـ [[applicationId]] بالـ flavor من غير ما تاخد بالك إنه بقى تطبيق تاني على Play. وتحط API key سري في BuildConfig وتفتكر إنه مستخبي.`
          },
          teach: R`## الكود بيعمل إيه؟

ده جزء [[android { }]] من [[app/build.gradle.kts]]، وبيقول لـ Gradle ٣ حاجات: التوقيع بتاع الـ release هيتعمل بأنهي مفتاح، والـ debug يبقى ليه id مختلف، وفيه نسختين من التطبيق ([[staging]] و [[prod]]) كل واحدة بتكلم سيرفر مختلف.

### اتجرّب فين؟

- الـ block ده بالحرف اتحط في مشروع Android حقيقي (AGP 9.4.1 و Gradle 9.8.1 و Java 21، جوه image فيها Android SDK 36)، وعملت keystore بأمر [[keytool]] اللي في الحل (في [[docker run --rm eclipse-temurin:21-jdk]]) بباسورد تجربة.
- بنيت [[assembleStagingDebug]] و [[assembleProdRelease]] بالـ environment variables، وقريت [[BuildConfig.java]] اللي اتولّد، وكشفت الـ APKs بـ [[aapt2]] و [[apksigner]] من الـ SDK. وجربت البناء من غير الـ variables وبباسورد غلط.
- التسطيب على الموبايل: من الـ docs.

---

## ١. التوقيع: [[signingConfigs]]

~~~kotlin
    signingConfigs {
        create("release") {
~~~

[[create("release") { }]]: اعمل signing config جديد اسمه release. الاسم ده هنستخدمه تحت. (الـ debug config موجود لوحده.)

~~~kotlin
            storeFile = file(System.getenv("KEYSTORE_PATH") ?: "release.jks")
~~~

من جوه لبرة:

1. [[System.getenv("KEYSTORE_PATH")]]: اقرا environment variable بالاسم ده. بترجّع [[String?]]: نص، أو [[null]] لو مش متحدد.
2. [[?: "release.jks"]]: الـ Elvis operator: لو اللي على الشمال null خد اللي على اليمين (درس null safety).
3. [[file(...)]]: دالة Gradle بتحوّل المسار لـ File، والمسار النسبي بيتحسب من فولدر [[app/]].

~~~kotlin
            storePassword = System.getenv("KEYSTORE_PASSWORD")
            keyAlias = "upload"
            keyPassword = System.getenv("KEY_PASSWORD")
        }
    }
~~~

- الـ keystore ملف ليه باسورد ([[storePassword]])، وجواه مفتاح أو أكتر، كل واحد ليه اسم ([[keyAlias]]) وباسورد ([[keyPassword]]).
- [[upload]]: نفس الـ [[-alias upload]] في أمر [[keytool]].
- الباسوردات مش مكتوبة في الملف: الملف ده بيتعمله commit، فأي حاجة فيه أي حد يشوفها.

---

## ٢. الـ build types

~~~kotlin
    buildTypes {
        debug {
            applicationIdSuffix = ".debug"
        }
~~~

[[applicationIdSuffix]]: كلمة بتتلزق في آخر الـ applicationId. ده اللي [[aapt2 dump badging]] قاله على الـ APK:

~~~text الناتج
app-staging-debug.apk  ->  package: name='com.sara.notes.debug' versionCode='12' versionName='1.3.0'
app-prod-release.apk   ->  package: name='com.sara.notes' versionCode='12' versionName='1.3.0'
~~~

Android بيعتبرهم تطبيقين مختلفين، فيتسطّبوا جنب بعض.

~~~kotlin
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
            signingConfig = signingConfigs.getByName("release")
        }
    }
~~~

- السطور التلاتة الأولى R8 (درس R8 بعد الجاي).
- [[signingConfigs.getByName("release")]]: هات الـ config اللي عملناه فوق بالاسم.

---

## ٣. الـ flavors

~~~kotlin
    flavorDimensions += "env"
~~~

[[flavorDimensions]]: «محاور» الـ flavors. هنا محور واحد اسمه [[env]] (environment). و [[+=]] بتضيف للستة.

~~~kotlin
    productFlavors {
        create("staging") {
            dimension = "env"
            buildConfigField("String", "API_URL", "\"https://staging.example.com/\"")
        }
~~~

[[buildConfigField(النوع, الاسم, القيمة)]]: الـ ٣ نصوص دول بيتكتبوا **كود Java** حرفيًا في كلاس [[BuildConfig]]. عشان كده القيمة فيها [[\"]] (علامة تنصيص جوه نص Kotlin): لازم الـ Java يطلع فيه نص بين علامتين.

~~~kotlin
        create("prod") {
            dimension = "env"
            buildConfigField("String", "API_URL", "\"https://api.example.com/\"")
        }
    }
    buildFeatures {
        buildConfig = true
    }
~~~

[[buildConfig = true]]: من AGP 8، [[BuildConfig]] مش بيتولّد إلا لو طلبته.

### الـ BuildConfig اللي اتولّد

لـ [[stagingDebug]] (الملف في [[app/build/generated/source/buildConfig/staging/debug/com/sara/notes/BuildConfig.java]]):

~~~java
public final class BuildConfig {
  public static final boolean DEBUG = Boolean.parseBoolean("true");
  public static final String APPLICATION_ID = "com.sara.notes.debug";
  public static final String BUILD_TYPE = "debug";
  public static final String FLAVOR = "staging";
  public static final int VERSION_CODE = 12;
  public static final String VERSION_NAME = "1.3.0";
  // Field from product flavor: staging
  public static final String API_URL = "https://staging.example.com/";
}
~~~

ولـ [[prodRelease]] نفس الشكل بـ [[API_URL = "https://api.example.com/"]]. وفي كودك: [[.baseUrl(BuildConfig.API_URL)]].

---

## ٤. الـ variants والـ tasks

flavor واحد من كل dimension × build type = ٤ variants، و Gradle عمل task لكل واحد. من [[./gradlew tasks --all]]:

~~~text الناتج (مختصر)
app:assembleProdDebug - Assembles main output for variant prodDebug
app:assembleProdRelease - Assembles main output for variant prodRelease
app:assembleStagingDebug - Assembles main output for variant stagingDebug
app:assembleStagingRelease - Assembles main output for variant stagingRelease
app:bundleProdRelease - Assembles bundle for variant prodRelease
app:assembleDebug - Assembles main outputs for all Debug variants.
app:assembleStaging - Assembles main outputs for all Staging variants.
~~~

[[assembleDebug]] بقى يبني الاتنين debug. والمخرجات:

~~~text الناتج
app/build/outputs/apk/staging/debug/app-staging-debug.apk    12,750,414 byte
app/build/outputs/apk/prod/release/app-prod-release.apk        992,154 byte
~~~

---

## ٥. الـ keystore (الحل)

~~~bash
keytool -genkeypair -v -keystore ~/keys/notes-upload.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
~~~

| الحتة | معناها |
|---|---|
| [[keytool]] | أداة بتيجي مع الـ JDK |
| [[-genkeypair]] | اعمل مفتاح خاص + عام وشهادة |
| [[-v]] | verbose: اطبع تفاصيل |
| [[-keystore ~/keys/notes-upload.jks]] | الملف (برا المشروع) |
| [[-keyalg RSA -keysize 2048]] | نوع المفتاح وطوله بالـ bits |
| [[-validity 10000]] | صالح ١٠٠٠٠ يوم (حوالي ٢٧ سنة). Play بيطلب مفتاح صالح لبعد أكتوبر 2033 (من الـ docs) |
| [[-alias upload]] | اسم المفتاح جوه الملف |

وهو بيسأل كده (الإجابات كانت متبعتة من ملف):

~~~text الناتج
Enter keystore password:  Re-enter new password:
What is your first and last name?
  [Unknown]:  What is the name of your organizational unit?
  [Unknown]:  What is the name of your organization?
  ...
Is CN=Sara, OU=Dev, O=Sara Apps, L=Cairo, ST=Cairo, C=EG correct?
  [no]:
Generating 2,048 bit RSA key pair and self-signed certificate (SHA384withRSA) with a validity of 10,000 days
[Storing /root/keys/notes-upload.jks]
~~~

لاحظ إنه مسألش على باسورد للمفتاح: الـ keystore بقى نوعه **PKCS12** افتراضيًا ([[Keystore type: PKCS12]] في [[keytool -list]])، وفيه باسورد المفتاح = باسورد الملف. فـ [[KEY_PASSWORD]] و [[KEYSTORE_PASSWORD]] نفس القيمة.

### الـ environment variables والبناء

~~~bash
export KEYSTORE_PATH=~/keys/notes-upload.jks
export KEYSTORE_PASSWORD='...'
export KEY_PASSWORD='...'
./gradlew assembleProdRelease
~~~

[[export]] في bash بيخلي المتغير متاح للبرامج اللي هتشتغل من الترمنال ده (Gradle). وفي PowerShell نفس الفكرة بـ [[$env:]]:

~~~powershell
$env:KEYSTORE_PATH = "$HOME\keys\notes-upload.jks"
$env:KEYSTORE_PATH
~~~

~~~text الناتج (pwsh)
C:\Users\ali\keys\notes-upload.jks
~~~

ويتأكد من التوقيع [[apksigner]] (في [[build-tools]] بتاع الـ SDK):

~~~text الناتج (apksigner verify --print-certs)
app-staging-debug.apk -> Signer #1 certificate DN: C=US, O=Android, CN=Android Debug
app-prod-release.apk  -> Signer #1 certificate DN: CN=Sara, OU=Dev, O=Sara Apps, L=Cairo, C=EG
~~~

الـ debug اتوقّع لوحده بمفتاح debug اللي Android Studio بيعمله، والـ release بمفتاحك.

### لو الـ variables مش موجودة أو غلط

~~~text الناتج (من غير variables)
Execution failed for task ':app:validateSigningProdRelease'
> Keystore file not set for signing config release
~~~

~~~text الناتج (باسورد غلط)
> com.android.ide.common.signing.KeytoolException: Failed to read key upload from store "/w/keys/notes-upload.jks": keystore password was incorrect
~~~

البناء بيقع بدل ما يطلّع APK متوقّع غلط، وده المطلوب.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[signingConfigs { create("release") }]] | المفتاح، والباسوردات من الـ environment |
| [[applicationIdSuffix = ".debug"]] | الـ debug يتسطّب جنب الـ release |
| [[flavorDimensions]] + [[productFlavors]] | نسخ staging و prod |
| [[buildConfigField]] + [[buildConfig = true]] | ثابت في [[BuildConfig]] لكل flavor |
| variant = flavor × build type | [[assembleStagingDebug]] و [[bundleProdRelease]] ... |

- الـ keystore والباسوردات برا git، ومعاهم backup.`,
          lines: [
            R`[[android]].`,
            "إعدادات التوقيع.",
            R`config اسمه release.`,
            "ملف الـ keystore من environment variable أو اسم افتراضي.",
            "باسورد الملف من environment (مش مكتوب في الكود).",
            R`اسم المفتاح جوه الملف.`,
            "باسورد المفتاح.",
            "قفلة.",
            "قفلة signingConfigs.",
            "الـ build types.",
            "debug:",
            R`الـ id بيبقى [[com.sara.notes.debug]]، فيتسطّب جنب الـ release.`,
            "قفلة.",
            "release:",
            "R8 شغال (الدرس بعد الجاي).",
            "شيل الـ resources اللي مش مستخدمة.",
            "قواعد R8.",
            "يتوقّع بالـ config اللي فوق.",
            "قفلة.",
            "قفلة buildTypes.",
            R`بُعد للـ flavors اسمه env.`,
            "الـ flavors.",
            "staging:",
            "من بُعد env.",
            "ثابت في BuildConfig بسيرفر الـ staging.",
            "قفلة.",
            "prod:",
            "نفس البُعد.",
            "السيرفر الحقيقي.",
            "قفلة.",
            "قفلة productFlavors.",
            R`فعّل توليد [[BuildConfig]].`,
            "شغّل.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`أمر الـ keystore تحت (هيسألك على باسورد الملف مرتين، والاسم والمؤسسة والمدينة والبلد). وبعد ما تبني: [[app/build/outputs/apk/staging/debug/app-staging-debug.apk]]، ولو سطّبت الـ staging debug والـ prod release هتلاقي التطبيقين جنب بعض على الموبايل.

ولو الـ environment variables مش متحددة، البناء بتاع release هيقع بـ [[Keystore file not set for signing config release]]، ولو الباسورد غلط بـ [[keystore password was incorrect]]، وده أحسن من إنه يبني بتوقيع غلط. ولاحظ إن [[keytool]] الحديث بيعمل keystore نوعه PKCS12، فمش هيسألك على باسورد للمفتاح: [[KEY_PASSWORD]] هو نفس [[KEYSTORE_PASSWORD]].`,
          solCode: R`keytool -genkeypair -v -keystore ~/keys/notes-upload.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload

export KEYSTORE_PATH=~/keys/notes-upload.jks
export KEYSTORE_PASSWORD='...'
export KEY_PASSWORD='...'
./gradlew assembleProdRelease`
        },
        {
          cmd: "بناء ونشر التطبيق: APK و AAB",
          title: "APK ولا AAB؟ تبني نسخة release للرفع على Google Play إزاي؟",
          desc: R`فيه شكلين للتطبيق المبني:
• [[APK]] (Android Package): ملف بيتسطّب على طول. بتبعته لحد يجرّبه، أو تسطّبه بـ [[adb install]].
• [[AAB]] (Android App Bundle): مش بيتسطّب مباشرة. بترفعه على Google Play، و Play بيعمل منه APKs صغيرة مخصوصة لكل موبايل (حسب المعالج، وكثافة الشاشة، واللغة). فاليوزر بينزّل حجم أصغر.

Google Play بيطلب AAB لكل التطبيقات الجديدة من أغسطس 2021. والـ APK لسه ليه استخدامات: التجربة، والتوزيع برا Play، ومتاجر تانية.

و AAB معناه إن Play هو اللي بيوقّع الـ APKs النهائية (Play App Signing): انت بتوقّع الـ AAB بمفتاح اسمه upload key، و Google عندها مفتاح التوقيع الحقيقي (app signing key) محفوظ عندها. الميزة الكبيرة: لو ضاع منك الـ upload key، تقدر تطلب من Play Console تغييره ومش هتخسر التطبيق. (في النظام القديم قبل كده، المفتاح لو ضاع كنت مش هتقدر تحدّث التطبيق تاني خالص).

قبل أي رفعة:
• [[versionCode]] أكبر من اللي فات (Play بيرفض نفس الرقم).
• [[./gradlew lintRelease]] بيمسك مشاكل زي ترجمات ناقصة أو APIs أحدث من الـ minSdk.
• جرّب الـ release build نفسه على موبايل (R8 ممكن يكسر حاجة مش بتظهر في الـ debug).`,
          example: R`./gradlew assembleDebug
./gradlew lintRelease
./gradlew bundleRelease
ls app/build/outputs/bundle/release/
./gradlew assembleRelease
adb install -r app/build/outputs/apk/release/app-release.apk`,
          try: R`ابني [[bundleRelease]] (لو عندك flavors: [[bundleProdRelease]]) ولاحظ حجم الـ AAB. وبعدين ابني [[assembleRelease]] وقارن حجمه بالـ debug APK. ولو عايز تشوف الـ APKs اللي Play هيعملها من الـ AAB، استخدم أداة [[bundletool]] من Google.`,
          deep: {
            why: R`ده آخر خطوة بين الكود واليوزر. ولو فهمت الفرق بين APK و AAB و upload key و app signing key، مش هتقع في أكبر غلطة كانت بتحصل زمان: مفتاح ضاع وتطبيق مبقاش ينفع يتحدث.`,
            how: R`[[bundleRelease]] بيعمل: compile للكود، و R8 (تصغير)، و dex، وتجميع الـ resources، وبعدين الـ bundle وتوقيعه. الـ AAB جواه كل حاجة لكل الأجهزة، و Play بيقسّمه (split APKs).

[[adb install -r]]: الـ [[-r]] معناها reinstall مع الحفاظ على الداتا. ولو المفتاح مختلف عن النسخة المتسطبة، هيقع بـ [[INSTALL_FAILED_UPDATE_INCOMPATIBLE]]، والحل تمسح النسخة القديمة الأول.

[[lintRelease]] بيكتب تقرير HTML في [[app/build/reports/]]. و lint بيقع لو فيه errors (زي [[MissingTranslation]] أو [[NewApi]]) في الـ release، وده كويس.

وفيه [[versionCode]] و [[versionName]] في Gradle. في CI بيبقى الـ versionCode رقم الـ build أو من الوقت عشان ميتكررش.

ومن 2026 Google بتطبّق التحقق من هوية المطور (developer verification) كمان على التطبيقات اللي بتتسطّب برا Play على الموبايلات المعتمدة، بالتدريج حسب البلد. لو هتوزع APK برا Play، تابع الشروط دي في صفحة Android developer verification.`,
            when: R`AAB لـ Play دايمًا. APK للتجربة، وللمتاجر التانية، أو لعميل عايز ملف يسطّبه.`,
            mistakes: R`ترفع debug APK أو AAB متوقّع بمفتاح الـ debug: Play بيرفضه. وتنسى تزوّد [[versionCode]]. وتختبر الـ debug بس وترفع release عمرك ما شغّلته. وتمسح الـ upload key «عشان مش محتاجه» قبل ما تتأكد إن Play App Signing متفعّل.`
          },
          teach: R`## الأوامر بتعمل إيه؟

٦ سطور هي رحلة التطبيق من الكود لإيد اليوزر: نسخة debug للتجربة، وفحص lint، و AAB للرفع على Play، و APK release، وتسطيبه على موبايل.

### اتجرّب فين؟

- الأوامر من [[./gradlew assembleDebug]] لحد [[./gradlew assembleRelease]] اتشغلت على مشروع Android حقيقي (AGP 9.4.1 و Gradle 9.8.1 و Java 21) جوه image فيها Android SDK 36، والـ release متوقّع بـ keystore تجربة (الدرس اللي فات) و R8 شغال. والملفات اتفحصت بـ [[unzip]] و [[aapt2]] و [[apksigner]] و [[jarsigner]].
- [[adb install]] محتاج موبايل أو emulator، ومفيش هنا: من الـ docs.
- على ويندوز الـ wrapper اسمه [[gradlew.bat]]، وفي PowerShell بتكتب [[.\gradlew.bat assembleDebug]] (من الـ docs)، وباقي الأوامر نفسها.

---

## ١. [[./gradlew assembleDebug]]

~~~bash
./gradlew assembleDebug
~~~

- [[./gradlew]]: الـ Gradle Wrapper: script في فولدر المشروع بينزّل نسخة Gradle المكتوبة في [[gradle/wrapper/gradle-wrapper.properties]] ويشغّلها، فكل الناس بتبني بنفس النسخة. و [[./]] يعني «الملف اللي في الفولدر ده».
- [[assemble]]: ابني الـ APK. و [[Debug]]: الـ build type.

~~~text الناتج
BUILD SUCCESSFUL in 2m 19s
41 actionable tasks: 29 executed, 12 up-to-date
~~~

- [[actionable tasks]]: Gradle قسّم البناء لخطوات (compile، و KSP، و dex، و package...). [[executed]] اتعملت فعلًا، و [[up-to-date]] متغيرش مدخلها من آخر مرة فاتخطت. عشان كده تاني بناء أسرع بكتير.
- الملف: [[app/build/outputs/apk/debug/app-debug.apk]]، حجمه **12,750,406 byte** (حوالي 12 ميجا)، ومتوقّع بمفتاح debug تلقائي.

---

## ٢. [[./gradlew lintRelease]]

~~~bash
./gradlew lintRelease
~~~

[[lint]] بيقرا الكود والـ resources والـ Gradle من غير ما يشغّلهم، وبيدوّر على مشاكل معروفة. على المشروع ده:

~~~text الناتج
Wrote HTML report to file:///w/app/build/reports/lint-results-release.html
Wrote SARIF report to file:///w/app/build/reports/lint-results-release.sarif
BUILD SUCCESSFUL
~~~

ولما فتحت التقرير لقيت warnings بس:

| القاعدة | العدد | معناها |
|---|---|---|
| [[GradleDependency]] | 5 | مكتبة Android ليها نسخة أحدث |
| [[NewerVersionAvailable]] | 4 | نفس الكلام لمكتبات Maven التانية |
| [[OldTargetApi]] | 1 | [[targetSdk = 36]] مش آخر نسخة Android |
| [[MissingApplicationIcon]] | 1 | الـ manifest مفيهوش [[android:icon]] |

الـ warnings مبتوقّفش البناء. عشان أشوف error، ضفت سطر بيستخدم [[NotificationChannel]] (موجود من Android 8، يعني API 26) والـ [[minSdk = 24]]:

~~~text الناتج
Channel.kt:6: Error: Call requires API level 26 (current min is 24): android.app.NotificationChannel() [NewApi]
fun makeChannel() = NotificationChannel("notes", "Notes", NotificationManager.IMPORTANCE_DEFAULT)

> Task :app:lintRelease FAILED
Lint found 1 error, 11 warnings.
> Lint found errors in the project; aborting build.
~~~

- [[NewApi]]: اسم القاعدة. التطبيق كان هيقع على أي موبايل Android 7 بـ [[NoSuchMethodError]] / [[NoClassDefFoundError]]، و lint مسكه قبل الرفع.
- وتحت سطر الكود lint بيحط علامات [[~]] تحت [[NotificationChannel]] بالظبط (شلتها من الصندوق).

---

## ٣. [[./gradlew bundleRelease]] و [[ls]]

~~~bash
./gradlew bundleRelease
ls app/build/outputs/bundle/release/
~~~

[[bundle]] بدل [[assemble]] = اعمل AAB بدل APK. و [[ls]] بيعرض الملفات (في PowerShell كمان [[ls]] شغال، اسم تاني لـ [[Get-ChildItem]]):

~~~text الناتج
app-release.aab    2,253,870 byte
~~~

الـ AAB ملف zip. فتحته بـ [[unzip -l]]، وده اللي جواه (مختصر):

~~~text الناتج
BUNDLE-METADATA/com.android.tools.build.obfuscation/proguard.map   16,570,201
BUNDLE-METADATA/com.android.tools.build.profiles/baseline.prof          4,177
base/dex/classes.dex                                                 1,473,880
base/lib/arm64-v8a/libandroidx.graphics.path.so                         10,096
base/lib/armeabi-v7a/libandroidx.graphics.path.so                        7,252
base/lib/x86/libandroidx.graphics.path.so                                9,284
base/lib/x86_64/libandroidx.graphics.path.so                            10,760
base/manifest/AndroidManifest.xml                                        5,393
base/resources.pb                                                       47,199
META-INF/UPLOAD.SF
META-INF/UPLOAD.RSA
~~~

- [[base/]]: الـ module الأساسي. الكود في [[dex/]]، والـ resources في [[resources.pb]] (صيغة protobuf، Play بيحوّلها).
- [[base/lib/]]: نفس المكتبة لـ ٤ معالجات ([[arm64-v8a]] الموبايلات الحديثة، و [[armeabi-v7a]] القديمة، و [[x86]] و [[x86_64]] للـ emulators). Play بيدّي كل موبايل نسخته بس.
- [[proguard.map]]: الـ mapping بتاع R8 (درس R8) جوه الـ AAB، فـ Play بيستلمه لوحده مع الرفعة ويفك الـ crashes.
- [[META-INF/UPLOAD.SF]] و [[UPLOAD.RSA]]: التوقيع بمفتاح الـ upload (اسم الـ alias). و [[jarsigner -verify]] قال [[jar verified.]].

### ليه الـ AAB أكبر من الـ APK؟

| | الحجم |
|---|---|
| [[app-release.aab]] | 2,253,870 byte |
| [[app-release.apk]] | 992,154 byte |

السبب [[proguard.map]]: مضغوط جوه الـ zip حوالي 1.36 ميجا، وده لوحده أكبر من الفرق كله. وده ملف لـ Play بس، مش بيوصل للموبايل. واللي اليوزر بينزّله من Play (split APKs، من الـ docs) فيه مكتبة المعالج بتاعه بس، و resources الشاشة واللغة بتاعته بس، فبيبقى أصغر من الـ APK الكامل. في التطبيق الصغير ده الفرق بسيط (المكتبات كلها حوالي 37 كيلو)، وفي تطبيق فيه مكتبات native تقيلة الفرق بيبقى ميجات.

---

## ٤. [[./gradlew assembleRelease]]

~~~bash
./gradlew assembleRelease
~~~

~~~text الناتج
app/build/outputs/apk/release/app-release.apk    992,154 byte
~~~

- من 12.2 ميجا (debug) لـ 0.95 ميجا: R8 شال الكود اللي محدش بيستخدمه، و [[isShrinkResources]] شال الـ resources.
- الاسم [[app-release.apk]] لأن فيه [[signingConfig]] للـ release. من غيره الملف بيطلع [[app-release-unsigned.apk]] (من الـ docs)، ومش هيتسطّب.

وتأكدت من الـ APK بأدوات الـ SDK:

~~~text الناتج (aapt2 dump badging)
package: name='com.sara.notes' versionCode='12' versionName='1.3.0' ... compileSdkVersion='36'
minSdkVersion:'24'
targetSdkVersion:'36'
~~~

~~~text الناتج (apksigner verify --verbose --print-certs)
Verifies
Verified using v1 scheme (JAR signing): false
Verified using v2 scheme (APK Signature Scheme v2): true
Signer #1 certificate DN: CN=Sara, OU=Dev, O=Sara Apps, L=Cairo, C=EG
~~~

[[v2]] نوع التوقيع اللي بيغطي الملف كله. و [[v1]] (القديم) مش محتاجينه لأن [[minSdk = 24]] (أي موبايل Android 7 وطالع بيفهم v2).

---

## ٥. [[adb install -r]] (من الـ docs)

~~~bash
adb install -r app/build/outputs/apk/release/app-release.apk
~~~

- [[adb]] (Android Debug Bridge): من [[platform-tools]] في الـ SDK، بيكلم الموبايل المتوصّل بـ USB (مع USB debugging) أو الـ emulator.
- [[-r]]: replace، يعني سطّب فوق النسخة الموجودة وخلّي الداتا.
- النجاح بيطبع [[Success]]. ولو النسخة المتسطبة متوقّعة بمفتاح تاني (مثلًا debug): [[INSTALL_FAILED_UPDATE_INCOMPATIBLE]]، والحل [[adb uninstall com.sara.notes]] الأول (الداتا هتتمسح).

---

## الخلاصة

| الأمر | بيطلّع | لمين |
|---|---|---|
| [[assembleDebug]] | [[app-debug.apk]] (12.2 ميجا هنا) | انت، للتجربة |
| [[lintRelease]] | تقرير HTML، ويقع لو فيه error | قبل أي رفعة |
| [[bundleRelease]] | [[app-release.aab]] (2.15 ميجا، فيه الـ mapping وكل المعالجات) | Google Play |
| [[assembleRelease]] | [[app-release.apk]] (0.95 ميجا) | تجربة الـ release، أو توزيع برا Play |
| [[adb install -r]] | تسطيب على الموبايل | انت |

- زوّد [[versionCode]] قبل كل رفعة، وجرّب الـ release نفسه مش الـ debug بس.`,
          lines: [
            "نسخة debug للتجربة.",
            "افحص الكود بقواعد lint على الـ release.",
            "AAB للرفع على Play.",
            R`الملف بيطلع هنا: [[app-release.aab]].`,
            "APK release (للتجربة أو التوزيع برا Play).",
            R`سطّبه على الموبايل فوق النسخة الموجودة ([[-r]]).`
          ],
          sol: R`[[app/build/outputs/bundle/release/app-release.aab]] غالبًا أكبر من الـ release APK: جواه ملف الـ mapping بتاع R8 ([[BUNDLE-METADATA/.../proguard.map]]) عشان Play يفك الـ crashes، ومكتبات كل المعالجات. في مشروع Compose صغير اتجرّب: الـ AAB كان 2.15 ميجا والـ APK 0.95 ميجا، والـ mapping لوحده حوالي 1.36 ميجا مضغوط. بس اللي اليوزر بينزّله من Play بيبقى مخصوص لموبايله. والـ release APK أصغر من الـ debug بشكل واضح بسبب R8 و shrinkResources (في نفس المشروع: 12.2 ميجا debug و 0.95 ميجا release).

وآخر سطر في الترمنال [[BUILD SUCCESSFUL]]. لو وقع في الـ lint، افتح التقرير اللي الرسالة بتشاور عليه وصلّح الـ errors (أو لو متأكد إنها مش مشكلة، تقدر تتجاهل قاعدة معينة في [[lint { disable += "..." }]]، بس متعملهاش كعادة).`
        },
        {
          cmd: "R8 و ProGuard",
          title: "R8: بيصغّر التطبيق ويخفي الأسماء، وقواعد keep، و mapping.txt",
          desc: R`[[R8]] أداة في الـ AGP بتشتغل على الـ release لما [[isMinifyEnabled = true]]:
• shrinking: بتشيل الكلاسات والدوال اللي محدش بيستخدمها (حتى من المكتبات). التطبيق بيصغر كتير.
• optimization: بتحسّن الكود (inline لدوال صغيرة، وتشيل branches مش بتتنفذ).
• obfuscation: بتغيّر الأسماء لحروف قصيرة ([[NotesRepository]] يبقى [[a.b]]). الحجم بيقل، وفك التطبيق بيبقى أصعب شوية (مش مستحيل).

و [[isShrinkResources = true]] بتشيل الصور والـ layouts اللي مش مستخدمة.

المشكلة: R8 بيحلل الكود وقت البناء. أي حاجة بتتنادى بالـ reflection (بالاسم وقت التشغيل) R8 مش هيشوفها، فممكن يشيلها أو يغيّر اسمها والتطبيق يقع في الـ release بس. هنا بتكتب قواعد في [[proguard-rules.pro]] (الاسم من ProGuard، الأداة القديمة اللي R8 حل محلها وبيقرا نفس القواعد):
• [[-keep class ... { *; }]]: متلمسش الكلاس ده ولا أي حاجة جواه.
• [[-keepattributes]]: حافظ على معلومات زي الـ annotations والـ generics.
• [[-dontwarn]]: تجاهل تحذير عن كلاس ناقص.

أغلب المكتبات الحديثة (Retrofit و Room و kotlinx.serialization و Hilt) بتجيب قواعدها معاها لوحدها. اللي بيحتاج قواعد غالبًا: مكتبات JSON بالـ reflection زي Gson، أو كود بتاعك بيستخدم reflection.

[[mapping.txt]] في [[app/build/outputs/mapping/release/]]: الجدول اللي بيرجّع [[a.b]] لاسمها الحقيقي. لازم تحتفظ بيه لكل نسخة اترفعت، وارفعه على Play Console (بيترفع لوحده مع الـ AAB) عشان الـ stack traces في Android vitals تبقى مقروءة.`,
          example: R`-keep class com.sara.notes.data.remote.dto.** { *; }
-keepattributes Signature, *Annotation*
-keep class com.sara.notes.plugins.ExportPlugin
-dontwarn org.slf4j.**`,
          try: R`شغّل [[./gradlew assembleRelease]] بـ [[isMinifyEnabled = false]] وبعدين true، وقارن الحجم. افتح الـ APK في Android Studio (Build ثم Analyze APK) وشوف أسماء الكلاسات جوه [[classes.dex]]. بعدين اعمل crash مقصود في الـ release وفك الـ stack trace بـ retrace (Android Studio بيعملها لو حطيت الـ mapping، أو الأداة [[retrace]] في الـ SDK).`,
          flag: "script",
          deep: {
            why: R`R8 بيصغّر التطبيق بنسب كبيرة، وده معناه تحميل أسرع وتسطيب أكتر في الأماكن اللي النت فيها غالي. وكمان بيحسّن الأداء. بس هو كمان أشهر سبب لـ «شغال في الـ debug وبيقع في الـ release»، فلازم تفهمه.`,
            how: R`R8 بيبدأ من «نقط الدخول» (الـ Activities والـ components اللي في الـ manifest، وأي حاجة عليها keep) وبيمشي في كل حاجة بتتنادى منهم. اللي موصلّوش يتشال. عشان كده الـ reflection مشكلة: [[Class.forName("...")]] نص، و R8 مش بيعرف إنه نداء.

الـ [[**]] في القواعد معناها «أي package تحت ده»، و [[{ *; }]] «كل الـ members».

Gson مثال كلاسيكي: بيقرا أسماء الـ fields وقت التشغيل عشان يطابقها مع الـ JSON. لو R8 غيّر [[title]] لـ [[a]]، الـ parsing بيرجّع null من غير ولا error. أما kotlinx.serialization فبيولّد الكود وقت الترجمة، فشغال مع R8 من غير قواعد خاصة لكلاساتك تقريبًا. ده سبب من أسباب تفضيله في المشاريع الجديدة.

ومن AGP 8 فيه «full mode» شغال افتراضيًا، وبيعمل تحسينات أقوى (وبيكسر أكتر لو فيه reflection من غير قواعد).

[[-assumenosideeffects class android.util.Log { public static *** d(...); }]] قاعدة مشهورة بتشيل [[Log.d]] من الـ release.`,
            when: R`دايمًا في الـ release. والقواعد تكتبها لما تستخدم reflection أو مكتبة بتطلب كده في الـ README بتاعها.`,
            mistakes: R`[[-keep class ** { *; }]] أو تقفل R8 خالص «عشان الـ crash يروح»: كده خسرت كل الفايدة. وتنسى تحتفظ بالـ mapping فالـ crash reports تبقى حروف. ومتجرّبش الـ release قبل الرفع. وتفتكر إن R8 بيحمي الأسرار في الكود: مش حماية حقيقية.`
          },
          teach: R`## الكود بيعمل إيه؟

ده محتوى ملف [[app/proguard-rules.pro]]: ٤ قواعد بتقول لـ R8 «الحاجات دي متلمسهاش». لأن R8 وهو بيبني الـ release بيشيل أي كلاس مش شايف حد بيستخدمه، وبيغيّر أسماء الباقي لحروف قصيرة. والقواعد دي للحاجات اللي بتتنادى **بالاسم** وقت التشغيل، و R8 ميقدرش يشوفها.

### اتجرّب فين؟

- القواعد دي بالحرف في مشروع Android حقيقي namespace بتاعه [[com.sara.notes]] (AGP 9.4.1، و R8 نسخة 9.4.24 حسب أول سطر في الـ mapping)، وفيه كلاس [[com.sara.notes.data.remote.dto.NoteJson]] و [[com.sara.notes.plugins.ExportPlugin]] عشان القواعد يبقى ليها حاجة تمسكها. اتبنى [[./gradlew assembleRelease]] مرة بـ [[isMinifyEnabled = false]] ومرة بـ [[true]] جوه image فيها Android SDK 36.
- قريت [[mapping.txt]] و [[seeds.txt]] و [[usage.txt]] اللي R8 كتبهم، وفكيت stack trace متلخبط بأداة [[retrace]] اللي في الـ SDK.
- Analyze APK في Android Studio وتشغيل الـ crash على موبايل: من الـ docs.

---

## ١. الفرق في الحجم

~~~text الناتج
isMinifyEnabled = false   app-release.apk   9,181,769 byte   (classes.dex + classes2.dex = 24,451,080 byte قبل الضغط)
isMinifyEnabled = true    app-release.apk     992,154 byte   (classes.dex = 1,473,880 byte)
~~~

الكود اتقلّص حوالي ١٦ مرة. أغلبه كان من المكتبات (Compose و Room و Hilt و OkHttp...): التطبيق بيستخدم جزء صغير منها، و R8 شال الباقي.

---

## ٢. القواعد سطر سطر

### [[-keep class com.sara.notes.data.remote.dto.** { *; }]]

~~~text proguard-rules.pro
-keep class com.sara.notes.data.remote.dto.** { *; }
~~~

| الحتة | معناها |
|---|---|
| [[-keep]] | متشيلش ومتغيّرش الاسم |
| [[class]] | القاعدة على كلاسات |
| [[com.sara.notes.data.remote.dto.**]] | أي كلاس في الـ package ده **أو أي package تحته**. ([[*]] واحدة = الـ package ده بس) |
| [[{ *; }]] | وكل الـ members جواه (fields و methods) |

ليه؟ لأن مكتبة زي Gson بتقرا أسماء الـ fields وقت التشغيل وتطابقها مع الـ JSON. والنتيجة في [[mapping.txt]]:

~~~text الناتج (mapping.txt)
com.sara.notes.data.remote.dto.NoteJson -> com.sara.notes.data.remote.dto.NoteJson:
    1:3:long getId():3:3 -> getId
    1:3:java.lang.String getTitle():3:3 -> getTitle
~~~

الشكل [[الاسم الأصلي -> الاسم الجديد]]. هنا الاتنين زي بعض: الكلاس والدوال فضلوا بأسمائهم.

### [[-keepattributes Signature, *Annotation*]]

R8 افتراضيًا بيشيل معلومات زيادة من الـ bytecode:
- [[Signature]]: الـ generics زي [[List<NoteJson>]]. من غيرها المكتبة تشوف [[List]] بس ومتعرفش جواها إيه.
- [[*Annotation*]]: أي attribute اسمه فيه Annotation، يعني الـ annotations زي [[@SerializedName]]. الـ [[*]] هنا wildcard في الاسم.

### [[-keep class com.sara.notes.plugins.ExportPlugin]]

كلاس بيتنادى بـ [[Class.forName("com.sara.notes.plugins.ExportPlugin")]]: الاسم نص، و R8 مش بيعتبره استخدام. من غير [[{ *; }]] هنا: الكلاس نفسه واسمه محفوظين، بس الـ members عادي يتشالوا أو يتغيروا.

~~~text الناتج (mapping.txt)
com.sara.notes.plugins.ExportPlugin -> com.sara.notes.plugins.ExportPlugin:
~~~

### [[-dontwarn org.slf4j.**]]

بعض المكتبات بتشاور على كلاسات من مكتبة تانية اختيارية مش عندك (هنا logging اسمها slf4j). R8 بيوقف البناء بـ warning [[Missing class ...]]، و [[-dontwarn]] بتقوله «عارف، كمّل». في المشروع ده مكانش فيه warning أصلًا، فالقاعدة ملهاش أثر، وده طبيعي.

---

## ٣. R8 عمل إيه في باقي الكلاسات؟

نفس الـ [[mapping.txt]] (حوالي ١٦ ميجا) لكلاسات التطبيق:

~~~text الناتج (mapping.txt، مختصر)
com.sara.notes.di.MainActivity -> com.sara.notes.di.MainActivity:
com.sara.notes.di.NotesApp -> com.sara.notes.di.NotesApp:
com.sara.notes.data.AppDatabase -> com.sara.notes.data.AppDatabase:
com.sara.notes.di.NotesViewModel -> r50:
com.sara.notes.data.NoteDao_Impl -> o50:
com.sara.notes.data.NotesApi -> p50:
com.sara.notes.di.DataModule -> R8$$REMOVED$$CLASS$$303:
~~~

ثلاث أنواع:

| النوع | مثال | ليه |
|---|---|---|
| الاسم فضل | [[MainActivity]] و [[NotesApp]] | مكتوبين في الـ manifest بالاسم، و AGP بيعمل لهم keep لوحده. و [[AppDatabase]] عشان Room بيدوّر على [[AppDatabase_Impl]] بالاسم (قاعدة جاية مع مكتبة Room نفسها: [[-keep class * extends androidx.room.RoomDatabase]]، لقيتها في [[configuration.txt]]) |
| اتغير لحروف | [[NotesViewModel -> r50]] | استخدامه واضح في الكود، فالاسم مش مهم |
| اتشال خالص | [[DataModule]] | Hilt كان بينادي دالته، و R8 حط كودها مكان النداء (inline) فالكلاس نفسه مبقاش ليه لازمة |

و R8 كتب ملفين كمان في [[app/build/outputs/mapping/release/]]:
- [[seeds.txt]]: كل اللي اتعمله keep (فيه [[MainActivity]] و [[NoteJson]] و [[ExportPlugin]]...).
- [[usage.txt]]: كل اللي اتشال. لقيت فيه [[com.sara.notes.PriceCalculator]] وكل كلاسات package [[arch]]: موجودين في الكود بس محدش بيناديهم في التطبيق، فاتشالوا.

---

## ٤. فك الـ crash: [[retrace]]

stack trace من الـ release بيبقى كده (الأسماء من الـ mapping الحقيقي):

~~~text trace.txt
java.lang.IllegalStateException: boom
    at wq.a(SourceFile:10)
    at com.sara.notes.di.MainActivity.i(SourceFile:1)
~~~

[[wq]] و [[a]] و [[i]] ملهمش معنى، و [[SourceFile]] مكان اسم الملف. بالأداة اللي في [[cmdline-tools/latest/bin]]:

~~~bash
retrace app/build/outputs/mapping/release/mapping.txt trace.txt
~~~

~~~text الناتج
java.lang.IllegalStateException: boom
    at com.sara.notes.di.Hilt_MainActivity.inject(Hilt_MainActivity.java:88)
    at com.sara.notes.di.Hilt_MainActivity$1.onContextAvailable(Hilt_MainActivity.java:42)
    at com.sara.notes.di.Hilt_MainActivity.onCreate(Hilt_MainActivity.java:54)
~~~

- [[wq.a]] رجعت [[Hilt_MainActivity$1.onContextAvailable]]، والسطر 10 في الكود المضغوط رجع السطر 42 في الملف الأصلي.
- السطرين بقوا ٣: R8 كان دمج [[inject()]] جوه [[onContextAvailable]] (inline)، والـ mapping فاكر ده فرجّع السطر الناقص.
- الـ mapping مختلف في كل build. لو ضاع، الـ crash ده مش هيتفك. عشان كده Play بياخده جوه الـ AAB لوحده (الدرس اللي فات)، ولازم تحتفظ بيه لأي APK وزّعته برا Play.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[isMinifyEnabled = true]] | شغّل R8 (هنا: 8.8 ميجا ← 0.95 ميجا) |
| [[-keep class X { *; }]] | X وكل اللي جواه زي ما هم |
| [[**]] / [[*]] | أي package تحت / الـ package ده بس |
| [[-keepattributes Signature, *Annotation*]] | حافظ على الـ generics والـ annotations |
| [[-dontwarn]] | متوقفش على كلاس ناقص اختياري |
| [[mapping.txt]] و [[seeds.txt]] و [[usage.txt]] | الأسماء الجديدة، واللي اتحفظ، واللي اتشال |
| [[retrace]] | يرجّع الـ stack trace لأسمائه |

- القواعد بس للي بيتنادى بالاسم (reflection). مكتبات زي Room و Hilt و Retrofit جايبة قواعدها معاها.`,
          lines: [
            R`الـ DTOs دي بتتحوّل بـ Gson (reflection)، فاحتفظ بكل كلاساتها وأسماء الـ fields بتاعتها.`,
            "Gson محتاج معلومات الـ generics والـ annotations وقت التشغيل.",
            R`كلاس بيتنادى بالاسم بـ [[Class.forName]]: متشيلهوش ولا تغيّر اسمه.`,
            "مكتبة بتشاور على كلاس اختياري مش عندنا: متطلّعش تحذير."
          ],
          sol: R`مع R8 الـ APK بيصغر بشكل ملحوظ (في تطبيق Compose صغير فيه Hilt و Room و Retrofit اتجرّب: release من غير R8 كان 8.8 ميجا، ومع R8 و shrinkResources بقى 0.95 ميجا). وفي Analyze APK هتشوف كلاسات اسمها حروف زي [[a]] و [[b]]، وكلاسات تانية بأسماءها الحقيقية: دي اللي عليها keep أو الـ Activities.

الـ crash في الـ release بيطلع [[at a.b.c(SourceFile:1)]]. بعد retrace بالـ mapping بيرجع [[at com.sara.notes.data.NotesRepository.refresh(NotesRepository.kt:24)]].`
        },
        {
          cmd: "Play Console والـ tracks",
          title: "ترفع تطبيقك على Google Play إزاي؟ (الحساب، والـ tracks، و closed testing، والمراجعة)",
          desc: R`الخطوات بالترتيب:

١. حساب مطور على [[Play Console]]: رسوم مرة واحدة (25 دولار)، وتحقق من الهوية. فيه حساب شخصي (personal) وحساب شركة (organization، محتاج D-U-N-S number).

٢. App: اسم، ولغة افتراضية، ومجاني ولا مدفوع (المجاني مينفعش يتحول مدفوع بعدين).

٣. الـ Store listing: وصف قصير وطويل، وأيقونة 512×512، وصورة feature graphic، و screenshots.

٤. App content (إجباري): رابط privacy policy، ونموذج Data safety (بتجمع إيه من داتا اليوزر وليه)، والتصنيف العمري (content rating)، والجمهور المستهدف، والإعلانات.

٥. الـ tracks (مسارات الرفع):
• Internal testing: لحد 100 tester، والنسخة بتوصل في دقايق. للتجربة السريعة.
• Closed testing: مجموعة محددة بالإيميل أو Google Group.
• Open testing: أي حد يقدر ينضم من صفحة التطبيق.
• Production: الكل. وتقدر تعمل staged rollout (تبدأ بنسبة زي 10% وتزوّد).

مهم للحسابات الشخصية الجديدة (اللي اتعملت بعد نوفمبر 2023): قبل ما تقدر تطلب الوصول لـ production، لازم closed test فيه 12 tester على الأقل مشتركين لمدة 14 يوم متواصلين. خطط لده من بدري.

٦. كل نسخة: ترفع الـ AAB، وتكتب release notes، وتبعت للمراجعة. المراجعة ممكن تاخد من ساعات لكام يوم، وأول مرة غالبًا أطول.

وكل سنة Google بترفع الـ targetSdk المطلوب. من 31 أغسطس 2026 التطبيقات الجديدة والتحديثات لازم targetSdk 36 (Android 16) على الأقل.`,
          example: R`android {
    defaultConfig {
        applicationId = "com.sara.notes"
        minSdk = 24
        targetSdk = 36
        versionCode = 12
        versionName = "1.3.0"
    }
}`,
          try: R`(من غير ما تدفع) افتح صفحة Play Console Help واقرا شروط الـ target API والـ testing requirements للحسابات الجديدة. وجهّز checklist لتطبيقك: privacy policy (ممكن صفحة على GitHub Pages)، والـ screenshots، ونموذج Data safety (اكتب كل داتا بتجمعها، حتى الـ crash reports)، و 12 tester من أصحابك.`,
          flag: "script",
          deep: {
            why: R`تطبيق على Play بلينك حقيقي في الـ CV أقوى بكتير من repo على GitHub. وكتير من الرفض بيحصل بسبب حاجات إدارية مش كود: Data safety ناقص، أو privacy policy مش موجودة، أو صلاحية حساسة من غير مبرر. لو عارفهم من الأول هتوفر أسابيع.`,
            how: R`الـ [[applicationId]] هو هوية التطبيق على Play للأبد: مينفعش يتغير بعد أول رفعة. و [[versionCode]] لازم يزيد في كل AAB بيترفع على أي track، حتى internal.

Play App Signing بيتفعّل تلقائيًا مع أول AAB. ومن Play Console تقدر تنزّل شهادة مفتاح التوقيع (SHA-1 و SHA-256)، وهتحتاجها لو بتستخدم Google Sign-In أو Firebase أو Maps، لأن التوقيع الحقيقي بقى بتاع Google مش الـ upload key.

[[Pre-launch report]]: Play بيشغّل تطبيقك على موبايلات حقيقية وبيطلّع crashes ومشاكل accessibility، ببلاش مع أي رفعة على testing track.

و [[Android vitals]] بعد النشر: نسبة الـ crashes والـ ANRs. لو عدّت حدود معينة، Play ممكن يقلل ظهور التطبيق في البحث ويحط تحذير في صفحته.

الأتمتة: [[Gradle Play Publisher]] أو [[fastlane supply]] بيرفعوا الـ AAB من CI بـ service account.

والسياسات بتتغير كل كام شهر (الصلاحيات، والـ target API، والتحقق من الهوية)، فالمصدر الصح دايمًا Play Console Help و Policy Center، مش فيديو من سنتين.`,
            when: "لما يبقى عندك نسخة شغالة ومتجرّبة، ويفضّل تبدأ internal testing بدري جدًا عشان تكتشف مشاكل التوقيع والـ release من الأول.",
            mistakes: R`تنسى إن الحساب الشخصي الجديد محتاج closed test 14 يوم وتوعد عميل بتاريخ نشر. و Data safety مش مطابق للي التطبيق بيعمله فعلًا (مكتبة analytics بتجمع داتا وانت قايل لأ). وتسيب [[com.example]] في الـ applicationId. وترفع للـ production على طول من غير ما تجرّب على internal.`
          },
          teach: R`## الكود بيعمل إيه؟

ده [[defaultConfig]] في [[app/build.gradle.kts]]: الـ ٥ قيم اللي Google Play بيقراها من الـ AAB أول ما ترفعه. هوية التطبيق، وأقدم وأحدث Android بيدعمه، ورقم النسخة. أي رفعة على Play Console بتتقبل أو تترفض بسببهم قبل ما حد يبص على الكود.

### اتجرّب فين؟

- الـ block ده بالحرف في مشروع Android حقيقي (AGP 9.4.1، جوه image فيها Android SDK 36)، واتبنى [[bundleRelease]] و [[assembleRelease]]، وقريت القيم من الـ APK المبني بـ [[aapt2 dump badging]] (أداة في الـ SDK).
- خطوات Play Console نفسها (الحساب، والـ tracks، والمراجعة، والسياسات): من Play Console Help، لأنها محتاجة حساب مدفوع. والسياسات بتتغير، فراجعها هناك وقت الرفع.

---

## ١. القيم واحدة واحدة

~~~kotlin
android {
    defaultConfig {
~~~

[[defaultConfig]]: الإعدادات اللي كل الـ variants بتاخدها، إلا لو flavor أو build type غيّرها (زي [[applicationIdSuffix]] في درس build variants).

~~~kotlin
        applicationId = "com.sara.notes"
~~~

- الـ id الفريد للتطبيق على الموبايل وعلى Play. صفحة التطبيق بتبقى [[play.google.com/store/apps/details?id=com.sara.notes]].
- العرف: domain بالعكس + اسم التطبيق.
- **مبيتغيرش بعد أول رفعة أبدًا**: لو غيّرته، Play يعتبره تطبيق جديد، واليوزرز القدام مش هيوصلهم تحديث. و [[com.example]] Play بيرفضه.
- مختلف عن [[namespace]] (package الكود و [[R]])، وممكن يكونوا زي بعض.

~~~kotlin
        minSdk = 24
~~~

أقدم Android يقدر يسطّب التطبيق: API 24 = Android 7.0. موبايل أقدم مش هيشوف التطبيق على Play أصلًا. وده اللي خلّى lint يمسك [[NotificationChannel]] (API 26) في درس APK و AAB.

~~~kotlin
        targetSdk = 36
~~~

- «أنا اختبرت التطبيق على Android 16 (API 36)». Android بيطبّق سلوك النسخة دي على التطبيق (صلاحيات أشد، edge-to-edge إجباري...). ولو targetSdk قديم، Android بيشغّله بـ compatibility modes.
- Play بيطلب رقم أدنى بيزيد كل سنة. حسب Play Console Help: من 31 أغسطس 2026 التطبيقات الجديدة والتحديثات لازم 36.
- مختلف عن [[compileSdk]] (الـ APIs اللي تقدر تكتبها في الكود).

~~~kotlin
        versionCode = 12
        versionName = "1.3.0"
    }
}
~~~

| | [[versionCode]] | [[versionName]] |
|---|---|---|
| النوع | رقم صحيح ([[Int]]) | نص |
| مين بيشوفه | Android و Play بس | اليوزر في صفحة التطبيق |
| القاعدة | لازم **يزيد** مع كل AAB بيترفع على أي track | أي شكل، والعرف [[major.minor.patch]] |

Play بيرفض AAB ليه نفس [[versionCode]] رفعته قبل كده، حتى لو على internal testing بس.

### القيم في الـ APK المبني

~~~text الناتج (aapt2 dump badging app-release.apk)
package: name='com.sara.notes' versionCode='12' versionName='1.3.0' platformBuildVersionName='16' platformBuildVersionCode='36' compileSdkVersion='36' compileSdkVersionCodename='16'
minSdkVersion:'24'
targetSdkVersion:'36'
uses-permission: name='android.permission.INTERNET'
~~~

- [[package: name]] هو الـ [[applicationId]].
- [[compileSdkVersionCodename='16']]: API 36 = Android 16.
- [[uses-permission]]: الصلاحيات من الـ manifest. Play بيعرضها، ولازم تبقى متسقة مع نموذج Data safety.

---

## ٢. خطوات Play Console (من Play Console Help)

| الخطوة | فيها إيه | أشهر غلطة |
|---|---|---|
| ١. الحساب | 25 دولار مرة واحدة، وتحقق هوية. personal أو organization (D-U-N-S) | |
| ٢. Create app | الاسم، واللغة، ومجاني ولا مدفوع | المجاني ميرجعش مدفوع |
| ٣. Store listing | وصف، وأيقونة 512×512، و feature graphic 1024×500، و screenshots | |
| ٤. App content | privacy policy، و Data safety، و content rating، والجمهور، والإعلانات | Data safety مش مطابق للمكتبات |
| ٥. Testing tracks | internal (لحد 100) ← closed ← open | |
| ٦. Production | رفع AAB، و release notes، ومراجعة، و staged rollout | |

### الـ tracks

| الـ track | مين يشوفه | ليه |
|---|---|---|
| Internal testing | لحد 100 tester بالإيميل | تجربة سريعة، بيوصل في دقايق |
| Closed testing | قايمة إيميلات أو Google Group | جماعة محددة |
| Open testing | أي حد من صفحة التطبيق | beta عامة |
| Production | الكل، وممكن بنسبة (staged rollout) | النشر الحقيقي |

والحساب الشخصي الجديد (من بعد نوفمبر 2023) مش هيقدر يطلب production قبل closed test فيه **12 tester** مشتركين **14 يوم متواصلين**.

### بعد أول رفعة

- **Play App Signing** بيتفعّل لوحده: الـ AAB متوقّع بالـ upload key بتاعك (اللي [[apksigner]] وراك فيه [[CN=Sara]] في درس build variants)، و Google بتوقّع الـ APKs النهائية بمفتاح تاني عندها. فالـ SHA-1 و SHA-256 اللي محتاجهم لـ Google Sign-In أو Firebase تاخدهم من Play Console (App integrity)، مش من الـ keystore بتاعك.
- **Pre-launch report**: Play بيشغّل التطبيق على موبايلات حقيقية ويطلّع crashes.
- **Android vitals**: نسبة الـ crashes والـ ANRs عند اليوزرز، والـ stack traces متفكوكة بالـ mapping اللي جه مع الـ AAB.

---

## الخلاصة

| القيمة | قاعدتها |
|---|---|
| [[applicationId]] | هوية التطبيق للأبد، مش [[com.example]] |
| [[minSdk]] | أقدم Android (24 = Android 7) |
| [[targetSdk]] | الرقم اللي Play بيطلبه وقت الرفع (36 = Android 16) |
| [[versionCode]] | يزيد مع **كل** AAB |
| [[versionName]] | اللي اليوزر بيشوفه |

- ابدأ internal testing بدري، وخطط لـ 14 يوم closed test لو حسابك شخصي جديد.`,
          lines: [
            R`[[android]].`,
            R`[[defaultConfig]].`,
            "هوية التطبيق على Play للأبد.",
            "أقدم Android مدعوم.",
            "المطلوب على Play من أغسطس 2026.",
            "لازم يزيد مع كل AAB بيترفع.",
            "اللي بيظهر لليوزر في صفحة التطبيق.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`الـ checklist قبل أول رفعة:
• [[applicationId]] نهائي ومش com.example.
• targetSdk بالرقم المطلوب وقت الرفع.
• AAB متوقّع بـ upload key محفوظ في مكانين (ومعاه الباسوردات).
• privacy policy على رابط شغال.
• Data safety مطابق للمكتبات اللي فيها (analytics و crash reporting و ads بيجمعوا داتا).
• Content rating و target audience.
• Store listing: أيقونة 512×512، و feature graphic 1024×500، وعلى الأقل ٢ screenshots.
• Internal testing الأول، وبعدين closed test بـ 12 tester لـ 14 يوم (للحساب الشخصي الجديد)، وبعدين تطلب production.`
        }
      ]
    }
]);
