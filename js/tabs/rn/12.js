// تكملة تاب rn: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/rn/01.js (شرح حقول الدرس في أوله)
MORE("rn", [
    {
      t: "البناء والنشر بـ EAS",
      l: 3,
      n: "eas.json والـ profiles، و EAS Build في السحابة، و Submit للمتاجر، والـ env والنسخ",
      items: [
        {
          cmd: "eas.json",
          title: "eas.json: تلات profiles للـ development و preview و production",
          desc: R`EAS (Expo Application Services) بيعمل build لتطبيقك على سيرفرات Expo، فمش محتاج Android Studio ولا ماك عشان تطلّع ملف للمتجر. [[eas.json]] فيه profiles: [[development]] (development build فيه dev client)، و [[preview]] (APK أو build داخلي تبعته للفريق)، و [[production]] (للمتاجر).

[[eas build:configure]] بيعمل الملف، و [[eas init]] بيربط المشروع بحساب Expo ويحط [[projectId]] في app.json. محتاج حساب Expo (فيه خطة مجانية بعدد builds محدود في الشهر وطابور انتظار).`,
          example: R`{
  "cli": { "version": ">= 16.0.0", "appVersionSource": "remote" },
  "build": {
    "development": { "developmentClient": true, "distribution": "internal", "environment": "development" },
    "preview": { "distribution": "internal", "android": { "buildType": "apk" }, "environment": "preview", "channel": "preview" },
    "production": { "autoIncrement": true, "environment": "production", "channel": "production" }
  },
  "submit": {
    "production": { "android": { "track": "internal" } }
  }
}`,
          try: R`في الـ lab شغّل [[npx eas-cli@latest build:configure]] (هيطلب login) وقارن الملف اللي اتعمل بالمثال. وجاوب: ليه [[preview]] عامل [[buildType: "apk"]] و [[production]] لأ؟`,
          deep: {
            why: R`من غير profiles، هتلاقي نفسك بتبعت للفريق build فيه الـ dev menu، أو بترفع للمتجر build بيكلم الـ staging API. الـ profiles بتخلي كل نوع build ليه إعدادات ثابتة ومتراجعة في Git.`,
            how: R`[[developmentClient: true]] بيضيف [[expo-dev-client]] ويعمل debug build بيوصل بـ Metro. [[distribution: "internal"]] معناه build تتوزع برابط (APK على Android، و ad-hoc على iOS محتاج تسجيل UDID الأجهزة) مش للمتجر.

Android: الـ production بيطلّع AAB (Android App Bundle) لأن Google Play بيطلبه، والـ APK للتوزيع المباشر. عشان كده preview بـ [[buildType: "apk"]]: تنزّله وتركّبه على طول.

[[appVersionSource: "remote"]]: رقم الـ build (versionCode و buildNumber) بيتخزن عند EAS، و [[autoIncrement]] بيزوده كل build، فمش هتنسى تزوده وتترفض من المتجر لأن الرقم متكرر. الـ [[version]] اللي المستخدم بيشوفه (1.2.0) لسه في app.json وانت بتغيّره.

[[environment]] بيقول أنهي EAS environment variables تتحمّل وقت الـ build (development أو preview أو production)، و [[channel]] بيربط الـ build بقناة EAS Update (القسم الجاي).

مقدرتش أعمل build فعلًا (محتاج حساب Expo ومفاتيح المتاجر). الشكل ده من الـ docs ومن [[eas build --help]] على eas-cli 24.11 اللي ركّبته.`,
            when: R`أول ما تحتاج development build أو تبعت نسخة لحد. والـ profiles ممكن تزيد: [[staging]] بـ API تاني، أو [[extends]] عشان تورّث من profile تاني.`,
            mistakes: R`ترفع build بـ developmentClient للمتجر. و [[distribution: "internal"]] على iOS وتستغرب إن الموبايل مش راضي يركّب (الجهاز مش مسجل). وتزوّد versionCode بإيدك وكمان autoIncrement شغال. وتحط أسرار في [[env]] جوه eas.json وهو في Git.`
          },
          teach: R`## الفكرة: ملف واحد بيقول لـ EAS «اعمل أنهي نوع build»

[[eas.json]] ملف JSON في جذر المشروع جنب [[app.json]]. [[app.json]] بيقول التطبيق **هو** إيه (اسم، و package، وأيقونة)، و [[eas.json]] بيقول **تبنيه إزاي**: debug ولا release، APK ولا AAB، للفريق ولا للمتجر. وكل طريقة اسمها **profile**.

> اتجرّب على مشروع Expo SDK 57 جديد ([[npx create-expo-app@latest]]) على ويندوز، و eas-cli 24.11. الـ build نفسه على سيرفرات Expo محتاج حساب فمتعملش، بس الملف اتفحص بنفس المكتبة اللي eas-cli بيقرا بيها ([[@expo/eas-json]]) والناتج تحت.

---

## ١. [[cli]]: إعدادات الأداة نفسها

~~~json
"cli": { "version": ">= 16.0.0", "appVersionSource": "remote" }
~~~

- [[version]]: أقل نسخة eas-cli مسموح تشغّل الأوامر على المشروع ده. [[>=]] يعني «أكبر من أو يساوي». فايدته إن حد في الفريق بنسخة قديمة جدًا ميعملش build بسلوك مختلف. نسختي كانت [[24.11.0]] فتعدّي.
- [[appVersionSource]]: مين ماسك **رقم الـ build** (مش رقم النسخة):

| القيمة | رقم الـ build بيتخزن فين |
|---|---|
| [["remote"]] | على سيرفرات EAS، وبيزيد لوحده مع [[autoIncrement]] |
| [["local"]] | في [[app.json]] ([[android.versionCode]] و [[ios.buildNumber]]) وانت بتغيّره |

> فيه رقمين مختلفين: [[version]] ([[1.3.0]]) اللي المستخدم بيشوفه في المتجر وانت بتغيّره في app.json، و **رقم الـ build** ([[versionCode]] على Android و [[buildNumber]] على iOS) اللي المتجر بيرفض أي رفع بيه لو اترفع قبل كده.

---

## ٢. [[build]]: التلات profiles

كل مفتاح جوه [[build]] اسم profile، وتختاره بـ [[--profile]] (أو [[-e]]) في [[eas build]].

### [[development]]

~~~json
"development": { "developmentClient": true, "distribution": "internal", "environment": "development" }
~~~

- [[developmentClient: true]]: يضيف [[expo-dev-client]] ويعمل debug build. التطبيق ده مفيهوش كودك جوه، بيوصل بـ Metro على جهازك زي Expo Go، بس فيه المكتبات الـ native بتاعتك.
- [[distribution: "internal"]]: يتوزع برابط تبعته للناس، مش للمتجر.
- [[environment: "development"]]: أنهي مجموعة EAS environment variables تتحمّل وقت الـ build (درس [[env و app variants]]).

### [[preview]]

~~~json
"preview": { "distribution": "internal", "android": { "buildType": "apk" }, "environment": "preview", "channel": "preview" }
~~~

- [[android: { buildType: "apk" }]]: إعداد لـ Android بس. ممكن تحط [[ios: {...}]] جنبه لإعدادات iOS.
- [[buildType]] ليه قيمتين بس: [[apk]] (ملف تركّبه على طول) و [[app-bundle]] (AAB للمتجر، وده الافتراضي).
- [[channel: "preview"]]: الـ build ده هياخد تحديثات EAS Update اللي بتتبعت على قناة [[preview]] بس (القسم الجاي).

### [[production]]

~~~json
"production": { "autoIncrement": true, "environment": "production", "channel": "production" }
~~~

- مفيهوش [[distribution]]، فالافتراضي [[store]]: للمتجر. ومفيهوش [[buildType]]، فـ Android بيطلّع AAB.
- [[autoIncrement: true]]: زوّد رقم الـ build كل مرة (مع [[appVersionSource: "remote"]] الرقم بيزيد على السيرفر).

---

## ٣. [[submit]]: إعدادات الرفع للمتجر

~~~json
"submit": { "production": { "android": { "track": "internal" } } }
~~~

نفس الفكرة: profile اسمه [[production]] بيستخدمه [[eas submit]]. [[track: "internal"]] يعني ارفع على مسار الـ internal testing في Play Console مش للناس كلها (درس [[eas submit]]).

---

## ٤. التجربة: الملف بعد ما EAS يفهمه

عشان أشوف eas-cli هيقرا الملف إزاي من غير حساب، استخدمت المكتبة بتاعته [[@expo/eas-json]] ([[EasJsonUtils.getBuildProfileAsync]]) في سكريبت Node صغير:

~~~text الناتج (اتشغّل على ويندوز)
android preview     {"credentialsSource":"remote","distribution":"internal","environment":"preview","channel":"preview","buildType":"apk"}
android production  {"credentialsSource":"remote","distribution":"store","autoIncrement":true,"environment":"production","channel":"production"}
android development {"credentialsSource":"remote","distribution":"internal","developmentClient":true,"environment":"development"}
submit              {"track":"internal","releaseStatus":"completed","changesNotSentForReview":false}
~~~

- [[credentialsSource: "remote"]]: المفاتيح (keystore والشهادات) على EAS. الافتراضي لو مكتبتهوش.
- [[distribution: "store"]] في production: اتحطت لوحدها.
- [[releaseStatus: "completed"]] في submit: الافتراضي، يعني النسخة تتنشر على الـ track على طول. لو التطبيق لسه draft في Play Console (عمره ما اتنشر)، Play بيقبل بس [[releaseStatus: "draft"]] (من الـ docs).

وجربت أغلط مرتين:

~~~text buildType: "ipa"
eas.json is not valid.
- "build.preview.android.buildType" must be one of [apk, app-bundle]
~~~

~~~text "distrbution" (حرف ناقص)
eas.json is not valid.
- "build.preview.distrbution" is not allowed
~~~

يعني الملف ليه schema ثابت، والغلطة الإملائية بتتمسك قبل ما الـ build يبدأ.

ولما حاولت [[npx eas-cli@latest config -p android -e preview]] (اللي بيعرض نفس الكلام من السيرفر) من غير login:

~~~text الناتج
An Expo user account is required to proceed.
Either log in with eas login or set the EXPO_TOKEN environment variable if you're using EAS CLI on CI
~~~

---

## ٥. إزاي الملف بيتعمل أصلًا

| الأمر | بيعمل إيه |
|---|---|
| [[eas init]] | يعمل مشروع على expo.dev ويحط [[extra.eas.projectId]] في app.json |
| [[eas build:configure]] | يعمل [[eas.json]] بالتلات profiles |

الاتنين محتاجين حساب، فالشكل ده من الـ docs ومن [[--help]].

---

## الخلاصة

| الـ profile | لمين | الملف على Android | بيوصل بـ Metro؟ |
|---|---|---|---|
| [[development]] | انت والمطورين | APK (debug) | أيوة |
| [[preview]] | الفريق والـ QA | APK | لأ، الـ JS جوه |
| [[production]] | المتجر | AAB | لأ |

- [[app.json]] = التطبيق هو إيه، و [[eas.json]] = تبنيه إزاي.
- رقم الـ build غير رقم النسخة، و [[autoIncrement]] مع [[remote]] بيشيل عنك تزويده.
- [[channel]] هو اللي بيربط الـ build بالتحديثات اللي هتبعتها بعدين.`,
          sol: R`الملف اللي [[build:configure]] بيعمله فيه التلات profiles وغالبًا [[appVersionSource: "remote"]] و [[autoIncrement]] في production و submit profile فاضي. الفرق إن مثالنا ضاف [[environment]] و [[channel]] و [[buildType: "apk"]] و [[track]].

APK في preview عشان أي حد في الفريق يدوس على الرابط ويركّبه مباشرة. production بـ AAB لأن Play Store بيطلب AAB للتطبيقات الجديدة، وهو بيولّد APKs صغيرة مخصوصة لكل جهاز. AAB نفسه مينفعش يتركّب مباشرة على موبايل.`
        },
        {
          cmd: "eas build",
          title: "eas build: من الكود لملف APK أو AAB أو IPA، والمفاتيح",
          desc: R`[[eas build -p android --profile preview]] بيرفع المشروع لسيرفرات EAS، اللي بتعمل [[npm install]] و [[prebuild]] و Gradle (أو Xcode للـ iOS)، وبيديك رابط للملف وصفحة فيها الـ logs.

أول مرة، EAS بيسألك عن المفاتيح (credentials): على Android الـ keystore اللي بيوقّع التطبيق، وعلى iOS الشهادات والـ provisioning profiles (محتاج حساب Apple Developer مدفوع). سيب EAS يعملهم ويحفظهم، أو ارفع اللي عندك لو التطبيق موجود على المتجر قبل كده. و [[--local]] بيعمل نفس الـ build على جهازك لو عندك الأدوات.`,
          example: R`npm i -g eas-cli
eas login
eas init
eas build -p android --profile preview
eas build -p android --profile production
eas build -p ios --profile production
eas build -p android --profile development --local
eas credentials`,
          try: R`اعمل preview build لـ Android من الـ lab، ونزّل الـ APK على موبايلك. وبعدين افتح صفحة الـ build في expo.dev وشوف مراحل الـ log: فين الـ prebuild؟ وفين Gradle؟ وكام دقيقة أخد؟`,
          deep: {
            why: R`بناء تطبيق iOS كان محتاج ماك و Xcode، و Android محتاج Android Studio و Gradle وإعدادات signing بتضيّع أيام. EAS بيخلي الـ build أمر واحد من أي جهاز (حتى ويندوز)، وده سبب كبير إن فرق الويب بقت تقدر تطلّع تطبيقات.`,
            how: R`[[eas build]] بيعمل archive لمشروعك (محترم [[.gitignore]] و [[.easignore]])، ويرفعه. السيرفر بيشغّل: install، و [[expo prebuild]] (لو مفيش فولدرات native)، والـ config plugins، وبعدين [[./gradlew bundleRelease]] أو [[xcodebuild]]. و [[EXPO_PUBLIC_*]] بتتحط وقت الـ bundle هنا، من الـ EAS environment اللي في الـ profile.

الـ keystore على Android: المفتاح اللي بيثبت إنك صاحب التطبيق. مع Google Play App Signing، جوجل ماسكة مفتاح التوقيع النهائي، وانت ماسك «upload key». لو ضاع الـ upload key ممكن تطلب reset من جوجل، بس لو مش مفعّل Play App Signing وضاع المفتاح، مش هتقدر تحدّث التطبيق أبدًا. EAS بيخزن المفاتيح، و [[eas credentials]] بيخليك تنزّل نسخة (خزّنها في مكان آمن).

iOS: محتاج Apple Developer Program (سنوي)، و EAS بيعمل الشهادات والـ profiles عن طريق حسابك.

[[--local]]: نفس الخطوات على جهازك، محتاج JDK و Android SDK (أو ماك و Xcode). و [[npx expo run:android --variant release]] أبسط منه لو عايز build محلي بسرعة.

في «تاب Desktop و Mobile» فيه نفس الأفكار (keytool و versionCode و Play) لكن بـ Gradle يدوي، ومفيد تبص عليه عشان تفهم إيه اللي EAS بيعمله عنك.

مقدرتش أشغّل [[eas build]] (محتاج حساب)، بس شغّلت [[npx expo export --platform android]] على الـ lab وطلّع Hermes bytecode bundle ([[.hbc]]، حوالي 3.7MB)، وده الجزء الـ JS من الـ build.`,
            when: R`preview لكل feature محتاجة تتجرب على موبايلات الفريق. production قبل كل رفع للمتجر. development لما تضيف مكتبة native. ومع [[--auto-submit]] (أو EAS Workflows) الـ build بيترفع للمتجر لوحده.`,
            mistakes: R`تمسح الـ keystore أو تعمل واحد جديد لتطبيق موجود على Play: المتجر هيرفض التحديث. و [[.env]] في [[.gitignore]] وتفتكر إن EAS هيشوفه (مش هيشوفه، استخدم EAS env). و build فشل وتقرا آخر سطر بس: الخطأ الحقيقي غالبًا فوق في مرحلة [[prebuild]] أو install. ومكتبة native جديدة ومعملتش development build جديد.`
          },
          teach: R`## الفكرة: الكود بيطلع من جهازك، والتطبيق بيرجعلك رابط

[[eas build]] بيضغط مشروعك ويرفعه لسيرفرات Expo، وهناك بيتعمل نفس اللي كان المفروض يتعمل على جهازك بـ Android Studio أو Xcode، وفي الآخر بياخدك على رابط فيه ملف التطبيق. المثال ٨ أوامر بالترتيب اللي هتحتاجهم.

> eas-cli 24.11 اتشغّل على ويندوز: [[--version]] و [[--help]] لكل أمر، و [[expo export]] و [[expo prebuild]] (الجزء اللي بيحصل على السيرفر). الـ build الحقيقي والـ login والمفاتيح محتاجين حساب Expo (و Apple Developer للـ iOS) فمتعملوش، والكلام عنهم من الـ docs.

---

## ١. [[npm i -g eas-cli]]

- [[npm i]] = [[npm install]]، و [[-g]] = global: الأداة تتسطب مرة على الجهاز كله ويبقى عندك أمر اسمه [[eas]] في أي فولدر.
- من غير تسطيب: [[npx eas-cli@latest]] بينزّل آخر نسخة ويشغّلها. أنا استخدمت ده:

~~~powershell
npx eas-cli@latest --version
~~~

~~~text الناتج
eas-cli/24.11.0 win32-x64 node-v24.19.0
~~~

[[win32-x64]] يعني ويندوز ٦٤ بت، وبعده نسخة Node.

---

## ٢. [[eas login]]

بيسألك على إيميل وباسورد حساب expo.dev ويحفظ الجلسة على جهازك. وعلى CI (GitHub Actions مثلًا) مفيش حد يكتب باسورد، فبتحط token في متغير [[EXPO_TOKEN]]. تعرف انت داخل ولا لأ بـ [[eas whoami]]:

~~~text الناتج (من غير login)
Not logged in
~~~

## ٣. [[eas init]]

بيعمل مشروع على expo.dev ويربطه بالفولدر ده، بإنه يكتب [[extra.eas.projectId]] (رقم UUID) في [[app.json]]. كل الأوامر اللي بعده بتعرف المشروع من الرقم ده.

---

## ٤. [[eas build -p android --profile preview]]

| الحتة | معناها |
|---|---|
| [[build]] | اعمل build |
| [[-p android]] | [[-p]] = [[--platform]]، والقيم [[android]] أو [[ios]] أو [[all]] |
| [[--profile preview]] | خد الإعدادات من [[build.preview]] في eas.json. لو مكتبتهوش، الافتراضي [[production]] |

من غير login الأمر بيقف على طول:

~~~text الناتج
An Expo user account is required to proceed.
Either log in with eas login or set the EXPO_TOKEN environment variable if you're using EAS CLI on CI
    Error: build command failed.
~~~

ومع حساب، اللي بيحصل (من الـ docs وصفحة الـ build على expo.dev):

1. يعمل archive لمشروعك، ومش بيرفع اللي في [[.gitignore]] (زي [[node_modules]]) ولا اللي في [[.easignore]] لو موجود.
2. على السيرفر: [[npm install]].
3. [[npx expo prebuild]]: يولّد فولدر [[android]] من app.json والـ plugins.
4. Gradle يعمل compile ويوقّع بالـ keystore.
5. يرفع الملف ويديك رابط و QR code.

### الخطوة ٣ على جهازي

جربت نفس الـ prebuild محليًا ([[npx expo prebuild --platform android --no-install]]، و [[--no-install]] يعني متعملش [[npm install]] تاني):

~~~text الناتج
- Creating native directory (./android)
✔ Created native directory
- Updating package.json
✔ Updated package.json
- Running prebuild
✔ Finished prebuild
~~~

~~~text android/app/build.gradle
applicationId 'com.example.tasks'
versionCode 1
versionName "1.3.0"
~~~

[[versionName]] جاي من [[version]] في app.json. و [[versionCode 1]] ده رقم الـ build: مع [[appVersionSource: "remote"]] EAS بيبدّله وقت الـ build بالرقم اللي على السيرفر.

### والجزء الـ JS: [[npx expo export --platform android]]

~~~text الناتج (آخره)
› android bundles (1):
_expo/static/js/android/entry-7997267fc0afef356e7c7406516b6617.hbc (3.7MB)

› Files (1):
metadata.json (2.8KB)

Exported: dist
~~~

- [[.hbc]] = Hermes bytecode: كودك كله متحوّل لـ bytecode لمحرك Hermes. أول بايتات الملف [[c61fbc03c103191f]]، وده الـ magic number بتاع Hermes، وبعده رقم نسخة الـ bytecode ([[98]]).
- الرقم الطويل في الاسم hash من المحتوى: لو الكود اتغير، الاسم بيتغير.
- [[metadata.json]] وفولدر [[assets]] (٤١ ملف صور وخطوط): كل الـ assets بأسامي hash.

الملف ده هو اللي بيتحط جوه الـ APK.

---

## ٥. [[--profile production]] و [[-p ios]]

- [[eas build -p android --profile production]]: نفس الخطوات، بس AAB موقّع لـ Google Play، ورقم الـ build بيزيد ([[autoIncrement]]).
- [[eas build -p ios --profile production]]: على ماك في سيرفرات EAS، بـ Xcode، وبيطلّع [[.ipa]]. أول مرة بيطلب يدخل على حساب Apple Developer بتاعك عشان يعمل الشهادة والـ provisioning profile. حتى لو انت على ويندوز.

| المنصة | الملف | تركّبه إزاي |
|---|---|---|
| Android preview | [[.apk]] | تنزّله على الموبايل وتفتحه |
| Android production | [[.aab]] | مينفعش يتركّب مباشرة. Play بيولّد منه APKs لكل جهاز |
| iOS production | [[.ipa]] | عن طريق TestFlight أو App Store بس |

---

## ٦. [[--local]]

~~~text من eas build --help
--local      Run build locally [experimental]
~~~

نفس الخطوات بس على جهازك بدل السيرفر: محتاج JDK و Android SDK (أو ماك و Xcode للـ iOS). كلمة [[experimental]] مكتوبة في الـ help نفسه، والـ docs بتقول إنه شغال على macOS و Linux، وعلى ويندوز من جوه WSL. ولو كل اللي عايزه build محلي سريع: [[npx expo run:android --variant release]].

---

## ٧. [[eas credentials]]

قايمة تفاعلية للمفاتيح اللي EAS شايلها: تنزّل نسخة من الـ keystore، أو ترفع keystore قديم لتطبيق موجود على Play، أو تمسح شهادة iOS. نزّل نسخة من الـ keystore وخزّنها برّه الجهاز.

> الـ template بتاع Expo حاطط [[*.jks]] و [[*.p12]] و [[*.key]] و [[*.mobileprovision]] في [[.gitignore]]، عشان المفاتيح متترفعش على Git بالغلط.

---

## الخلاصة

| الأمر | إمتى |
|---|---|
| [[eas login]] و [[eas init]] | مرة واحدة لكل مشروع |
| [[--profile preview]] | APK للفريق |
| [[--profile production]] | AAB أو IPA للمتجر |
| [[--profile development --local]] | development build على جهازك |
| [[eas credentials]] | تنزّل أو ترفع المفاتيح |

- الـ build على السيرفر = [[npm install]] + [[prebuild]] + Gradle أو Xcode + توقيع. أي غلطة في مرحلة منهم بتبان في الـ log بتاعها.
- الـ keystore هو هوية التطبيق على Play: ضياعه من غير Play App Signing = مفيش تحديثات تاني.`,
          lines: [
            "ركّب EAS CLI (أو استخدم npx eas-cli@latest من غير تركيب).",
            "ادخل بحساب Expo.",
            "اربط المشروع بـ EAS (بيحط projectId في app.json).",
            "APK داخلي تركّبه على طول.",
            "AAB للـ Play Store.",
            "IPA للـ App Store (محتاج حساب Apple Developer).",
            "development build على جهازك من غير سيرفرات EAS.",
            "إدارة المفاتيح: تنزّل نسخة أو ترفع مفتاح موجود."
          ],
          sol: R`هتلاقي في الـ log مراحل زي: Spin up build environment، و Install dependencies، و Prebuild (توليد فولدر android من app.json والـ plugins)، و Run gradlew، و Upload artifacts. أول build بياخد غالبًا من ١٠ لـ ٢٠ دقيقة على الخطة المجانية (فيه طابور)، والـ builds اللي بعدها أسرع لو فيه cache.

لو الـ APK اتركّب بس بيقع أول ما يفتح: شوف [[adb logcat]] (في «تاب Desktop و Mobile»)، وغالبًا مكتبة native مش متوافقة (شغّل [[npx expo install --check]]) أو env variable ناقصة.`
        },
        {
          cmd: "eas submit",
          title: "eas submit: ترفع للـ Play Store والـ App Store",
          desc: R`[[eas submit -p android --latest]] بياخد آخر production build ويرفعه لـ Google Play (على track زي [[internal]] أو [[production]])، و [[-p ios]] بيرفعه لـ App Store Connect و TestFlight. أو [[eas build --auto-submit]] بيعمل الاتنين ورا بعض.

المتطلبات: على Play، أول رفع للتطبيق لازم يتعمل يدوي من Play Console مرة واحدة، وبعدين service account key (JSON) عشان EAS يرفع. على iOS، حساب Apple Developer و App Store Connect API key (EAS بيساعدك تعمله). وبعد الرفع فيه review من المتجر نفسه، ودي مش في إيدك.`,
          example: R`eas submit -p android --latest --profile production
eas submit -p ios --latest
eas build -p android --profile production --auto-submit
# Play Console: Internal testing -> Closed -> Open -> Production
# App Store Connect: TestFlight -> App Review -> Release`,
          try: R`اكتب checklist لأول نشر على Play: إيه اللي لازم يكون جاهز في Play Console قبل ما [[eas submit]] يشتغل؟ (فكّر في: الحساب، وصفحة المتجر، و Data safety، و privacy policy، والتقييم العمري، وأول AAB.)`,
          deep: {
            why: R`الـ build مش نهاية المشوار. الرفع للمتاجر فيه خطوات يدوية كتير بتتنسى، وأخطاء بتاخد أيام مراجعة. [[eas submit]] بيشيل جزء الرفع نفسه، بس لازم تعرف إيه اللي حواليه.`,
            how: R`Android: Google Play Developer account (رسوم مرة واحدة). أول AAB بيترفع يدوي من Play Console عشان يتعمل التطبيق ويتقفل الـ package name. بعد كده EAS محتاج Google Service Account بصلاحية على التطبيق، والـ JSON key بيتحط في [[eas credentials]] أو [[serviceAccountKeyPath]] في submit profile. الـ tracks: internal (لحد ١٠٠ tester، من غير review طويل)، و closed و open testing، و production. الحسابات الشخصية الجديدة على Play عليها شرط closed testing لعدد من الـ testers لمدة قبل ما تقدر تنشر production (اتأكد من الشروط الحالية في Play Console لأنها بتتغير).

iOS: Apple Developer Program (سنوي)، والتطبيق بيتعمل في App Store Connect. [[eas submit -p ios]] بيرفع لـ TestFlight، ومن هناك تبعت للـ review. Apple بتراجع كل نسخة، وبترفض لأسباب زي: صلاحيات من غير شرح، أو login بـ social من غير Sign in with Apple، أو تطبيق هو موقع ملفوف ومفيهوش قيمة كتطبيق.

الحاجات المطلوبة في المتجرين: privacy policy URL، و Data safety (Play) و Privacy nutrition labels (Apple) بيقولوا بتجمع إيه، و screenshots، وتقييم عمري، و حذف الحساب من جوه التطبيق لو فيه تسجيل (مطلوب في الاتنين، وفيه درس [[حذف الحساب]] في «تاب الأمان»).

مجربتش submit (محتاج حسابات مدفوعة)، والأوامر من [[eas submit --help]] على eas-cli 24.11.`,
            when: R`بعد كل production build عايز يوصل للمستخدمين. ولأغلب التحديثات اللي JS بس، EAS Update (القسم الجاي) أسرع بكتير ومن غير review.`,
            mistakes: R`تجرّب [[eas submit]] قبل ما ترفع أول AAB يدوي: «Google Play API: Package not found». وتنسى Data safety فالتطبيق يترفض. وترفع على production track على طول بدل internal. وتنسى زرار حذف الحساب.`
          },
          teach: R`## الفكرة: الملف جاهز، فاضل توصّله للمتجر

[[eas build]] طلّعلك AAB أو IPA. [[eas submit]] بياخد الملف ده ويرفعه لـ Google Play Console أو App Store Connect بدل ما تفتح الموقع وترفعه بإيدك. بعد الرفع، المراجعة والنشر على المتجر نفسه.

> اتشغّل [[eas submit --help]] على eas-cli 24.11 على ويندوز. الرفع نفسه محتاج حساب Expo وحساب Play Developer أو Apple Developer مدفوعين فمتعملش، والخطوات اللي بعده من الـ docs.

---

## ١. [[eas submit -p android --latest --profile production]]

| الحتة | معناها |
|---|---|
| [[-p android]] | ارفع لـ Google Play |
| [[--latest]] | خد آخر build اتعمل للمنصة دي على EAS |
| [[--profile production]] | إعدادات الرفع من [[submit.production]] في eas.json (هنا [[track: "internal"]]) |

[[--latest]] واحد من ٤ طرق تختار بيهم الملف، ومينفعش تكتب أكتر من واحد:

~~~text من eas submit --help
--latest     Submit the latest build for specified platform
--id=<value>     ID of the build to submit
--path=<value>   Path to the .apk/.aab/.ipa file
--url=<value>    App archive url
~~~

يعني ممكن ترفع ملف اتعمل على جهازك ([[--path]]) مش لازم من EAS Build.

### محتاج إيه قبلها على Play

1. **أول AAB يترفع بإيدك** من Play Console. Play API مبيعرفش يعمل تطبيق جديد، فلو جربت [[eas submit]] الأول هتاخد خطأ إن الـ package مش موجود.
2. **Google Service Account**: حساب «روبوت» في Google Cloud ليه صلاحية على التطبيق في Play Console، ومفتاحه ملف JSON. EAS بيستخدمه عشان يرفع باسمك. بتحطه في [[eas credentials]] أو بمساره في [[serviceAccountKeyPath]] جوه الـ submit profile.

### الـ tracks: [[# Play Console: Internal testing -> Closed -> Open -> Production]]

السطر ده تعليق (بيبدأ بـ [[#]])، بيوضح الترتيب اللي النسخة بتمشي فيه:

| الـ track | مين بيشوفه |
|---|---|
| internal | لحد ١٠٠ tester بالإيميل، وبيوصل بسرعة |
| closed | مجموعة tester انت بتحددها |
| open | أي حد يشترك من صفحة التطبيق |
| production | كل الناس |

والحسابات الشخصية الجديدة على Play عليها شرط closed testing بعدد testers لمدة معينة قبل production. الأرقام بتتغير، فشوفها في Play Console.

---

## ٢. [[eas submit -p ios --latest]]

نفس الفكرة لـ App Store Connect. مفيش [[--profile]] فبياخد [[production]] لو موجود. EAS بيطلب App Store Connect API key (أو يعمله لك بحسابك). الملف بيوصل TestFlight الأول:

### [[# App Store Connect: TestFlight -> App Review -> Release]]

- **TestFlight**: تطبيق Apple لتوزيع النسخ التجريبية. الـ internal testers (فريقك) بيجربوا على طول، والـ external محتاجين مراجعة خفيفة.
- **App Review**: ناس في Apple بتراجع كل نسخة. وأشهر أسباب الرفض: صلاحية من غير شرح، أو login بـ Google من غير Sign in with Apple، أو تطبيق هو موقع ملفوف.
- **Release**: بعد الموافقة تنشر يدوي أو أوتوماتيك.

وفيه flags للـ iOS بس في الـ help: [[--what-to-test]] (النص اللي بيظهر للـ testers في TestFlight) و [[-g]] (مجموعات الـ testers).

---

## ٣. [[eas build -p android --profile production --auto-submit]]

[[--auto-submit]] (أو [[-s]]): بعد ما الـ build يخلص، اعمل submit بالـ submit profile **اللي ليه نفس الاسم** ([[production]] هنا). ولو عايز profile تاني: [[--auto-submit-with-profile=اسمه]]. الاتنين من [[eas build --help]].

---

## الخلاصة

| الخطوة | Android | iOS |
|---|---|---|
| حساب | Play Developer (رسوم مرة واحدة) | Apple Developer Program (سنوي) |
| قبل أول submit | أول AAB يدوي + service account JSON | التطبيق متعمل في App Store Connect |
| الأمر | [[eas submit -p android --latest]] | [[eas submit -p ios --latest]] |
| أول مكان بيوصله | الـ track اللي في eas.json | TestFlight |
| المراجعة | Play review | App Review |

- [[eas submit]] بيرفع بس. صفحة المتجر، و Data safety، و privacy policy، والتقييم العمري، وحذف الحساب كلها شغلك قبلها.
- ابدأ بـ internal أو TestFlight، مش production على طول.`,
          lines: [
            "ارفع آخر build لـ Play بإعدادات profile الـ production في submit.",
            "ارفع آخر build iOS لـ TestFlight.",
            "build وبعده submit أوتوماتيك."
          ],
          sol: R`checklist معقول: (١) Google Play Developer account متفعّل. (٢) التطبيق متعمل في Play Console بنفس [[android.package]]. (٣) أول AAB مرفوع يدوي على internal testing. (٤) Store listing: اسم، ووصف، وأيقونة 512، و feature graphic، و screenshots. (٥) Privacy policy URL. (٦) Data safety form. (٧) Content rating questionnaire. (٨) Target audience. (٩) لو فيه تسجيل: طريقة حذف الحساب من التطبيق ومن رابط ويب. (١٠) Service account JSON بصلاحية release، ومتحط في [[eas credentials]] أو المسار في eas.json. بعدها [[eas submit -p android --latest]] يشتغل.`
        },
        {
          cmd: "env و app variants",
          title: "EAS env والـ app variants: staging و production على نفس الموبايل",
          desc: R`الـ env variables في Expo نوعين: [[EXPO_PUBLIC_*]] بتتحط جوه الـ JS bundle (أي حد يقدر يشوفها)، والباقي بيتقري وقت الـ build بس في [[app.config.ts]] (مش جوه التطبيق). على جهازك بتيجي من [[.env]]، وعلى EAS بتتعرّف بـ [[eas env:set]] لكل environment (development و preview و production)، وبيتحمّلوا حسب [[environment]] في eas.json.

والـ app variants: تغيّر [[name]] و [[android.package]] و [[ios.bundleIdentifier]] حسب الـ environment في app.config.ts، فتقدر تركّب «Tasks (Preview)» جنب «Tasks» على نفس الموبايل.`,
          example: R`// app.config.ts
import type { ExpoConfig } from 'expo/config';

const variant = process.env.APP_VARIANT ?? 'production';
const suffix = variant === 'production' ? '' : $__bt.$__{variant}$__bt;

const config: ExpoConfig = {
  name: variant === 'production' ? 'Tasks' : $__btTasks ($__{variant})$__bt,
  slug: 'tasks',
  version: '1.3.0',
  runtimeVersion: { policy: 'appVersion' },
  android: { package: $__btcom.example.tasks$__{suffix}$__bt },
  ios: { bundleIdentifier: $__btcom.example.tasks$__{suffix}$__bt },
};

export default config;
// eas env:set preview --name EXPO_PUBLIC_API_URL --value https://staging-api.example.com --visibility plaintext
// eas env:set preview --name APP_VARIANT --value preview --visibility plaintext`,
          try: R`اعمل الملف ده في الـ lab، وشغّل [[APP_VARIANT=preview npx expo config --type public]] ومرة من غير المتغير، وقارن [[name]] و [[android.package]]. وبعدين فكّر: ليه [[SENTRY_AUTH_TOKEN]] مينفعش يبدأ بـ [[EXPO_PUBLIC_]]؟`,
          flag: "script",
          deep: {
            why: R`الفريق محتاج يجرّب على الـ staging من غير ما يمسح التطبيق الحقيقي من موبايله، والـ QA محتاج يعرف هو فاتح أنهي نسخة. ولو خلطت الـ env، هتلاقي production build بيكلم الـ staging API (أو العكس، وده أسوأ).`,
            how: R`[[app.config.ts]] بيتنفذ في Node وقت [[expo start]] أو [[prebuild]] أو الـ build على EAS، فأي [[process.env]] متاح هناك (حتى الأسرار). الناتج (الـ config) بيتحط في التطبيق ([[Constants.expoConfig]])، فمتحطش سر في الناتج نفسه.

[[EXPO_PUBLIC_*]]: Metro بيبدّل [[process.env.EXPO_PUBLIC_API_URL]] بالقيمة حرفيًا في الكود. أي حاجة تانية في [[process.env]] جوه كود التطبيق هتبقى undefined. وده مقصود: عشان متسرّبش أسرار بالغلط.

EAS environments: [[eas env:set]] بيخزن المتغير على EAS بـ visibility: [[plaintext]] (بيظهر)، و [[sensitive]] (مخفي في الـ logs)، و [[secret]] (مش بيتقري برّه الـ build خالص). والـ build بياخد متغيرات الـ environment المكتوب في الـ profile. و [[eas env:pull]] بينزّلهم في [[.env.local]] للتطوير. و [[eas update]] محتاج [[--environment]] من SDK 55 عشان الـ bundle ياخد نفس القيم.

package مختلف = تطبيق مختلف بالنسبة للنظام (تخزين منفصل، وأيقونة منفصلة)، فتقدر تركّب الاتنين.

مجربتش [[eas env:set]] (محتاج حساب)، والأوامر من [[eas env:set --help]] على eas-cli 24.11 ([[env:create]] بقت deprecated لصالح [[env:set]]).`,
            when: R`أي مشروع فيه أكتر من backend (dev و staging و prod). و variants لو الفريق بيجرّب على موبايلاته الشخصية.`,
            mistakes: R`سر في [[EXPO_PUBLIC_]] (API key لخدمة مدفوعة): أي حد يفك الـ APK ياخده. استخدم الـ backend كوسيط. و [[process.env[name]]] بمتغير: Metro مش هيبدّله. وتغيّر [[.env]] ومتعملش restart لـ [[expo start]]. وتغيّر [[android.package]] بتاع production بعد النشر.`
          },
          teach: R`## الفكرة: ملف config واحد بيطلّع نسختين مختلفتين

[[app.config.ts]] كود TypeScript بيتنفذ على جهازك (أو على سيرفر EAS) وقت الـ build، فيقدر يقرا متغيرات البيئة ([[process.env]]) ويغيّر الإعدادات على أساسها. هنا بيقرا [[APP_VARIANT]]: لو [[preview]] يطلّع تطبيق اسمه وـ package بتاعه مختلفين، فيتركّب جنب تطبيق الـ production على نفس الموبايل.

> اتجرّب على مشروع Expo SDK 57 على ويندوز: [[expo config]] في Git Bash و PowerShell، و [[expo export --platform web]] مع headless Chrome عشان أشوف الـ env جوه الـ bundle. [[eas env:set]] محتاج حساب، والكلام عنه من [[eas env:set --help]] والـ docs.

---

## ١. [[import type { ExpoConfig } from 'expo/config';]]

[[import type]] بيجيب **نوع** بس عشان المحرر يكمّلك ويطلّع خطأ لو كتبت إعداد مش موجود. ومش بيبقى ليه أثر في الكود اللي بيتنفذ.

---

## ٢. [[const variant = process.env.APP_VARIANT ?? 'production';]]

من جوه لبرة:

- [[process.env]]: object فيه كل متغيرات البيئة وقت تشغيل الملف. ده Node، مش الموبايل.
- [[.APP_VARIANT]]: متغير احنا اخترنا اسمه. لو مش متعرّف، قيمته [[undefined]].
- [[??]] (nullish coalescing): «لو اللي على الشمال [[undefined]] أو [[null]]، خد اللي على اليمين». فلو محدش عرّف المتغير، الـ variant يبقى [[production]]. ده الاختيار الآمن: الـ build العادي يطلع production.

## ٣. [[const suffix = variant === 'production' ? '' : $__bt.$__{variant}$__bt;]]

- [[a ? b : c]] (ternary): لو الشرط صح خد [[b]]، وإلا [[c]].
- [['']]: string فاضي، يعني الـ production مالوش لاحقة.
- [[$__bt.$__{variant}$__bt]] template string (بين علامتين backtick): [[$__{variant}]] بيتبدّل بقيمة المتغير، فلو الـ variant [[preview]] يبقى [[.preview]].

---

## ٤. الـ config نفسه

| السطر | مع [[preview]] | من غير متغير |
|---|---|---|
| [[name]] | [[Tasks (preview)]] | [[Tasks]] |
| [[slug: 'tasks']] | نفسه | نفسه |
| [[version: '1.3.0']] | نفسه | نفسه |
| [[runtimeVersion: { policy: 'appVersion' }]] | نفسه | نفسه |
| [[android.package]] | [[com.example.tasks.preview]] | [[com.example.tasks]] |
| [[ios.bundleIdentifier]] | [[com.example.tasks.preview]] | [[com.example.tasks]] |

- [[slug]] ثابت: الاتنين نفس المشروع على EAS (نفس الـ builds والـ updates).
- [[runtimeVersion]]: للـ EAS Update (درس [[runtimeVersion]] الجاي). [[appVersion]] يعني الـ runtime = [[version]].
- الـ package المختلف هو السر: Android و iOS بيعتبروا كل package تطبيق منفصل، ليه أيقونة وتخزين منفصلين.

و [[export default config;]]: Expo بيقرا اللي الملف بيصدّره. وطالما بيصدّر object، [[app.json]] اللي جنبه مش بيتقري خالص.

---

## ٥. التجربة: [[npx expo config --type public]]

في Git Bash (أو لينكس والماك) بتحط المتغير قبل الأمر على نفس السطر، فيبقى موجود للأمر ده بس:

~~~bash
APP_VARIANT=preview npx expo config --type public
~~~

~~~text الناتج
{
  name: 'Tasks (preview)',
  slug: 'tasks',
  version: '1.3.0',
  description: undefined,
  sdkVersion: '57.0.0',
  platforms: [ 'ios', 'android', 'web' ],
  runtimeVersion: { policy: 'appVersion' },
  android: { package: 'com.example.tasks.preview' },
  ios: { bundleIdentifier: 'com.example.tasks.preview' }
}
~~~

وفي PowerShell الصيغة دي مش شغالة. بتعرّف المتغير بـ [[$env:]] الأول:

~~~powershell
$env:APP_VARIANT = "preview"; npx expo config --type public --json
~~~

~~~text الناتج
{"name":"Tasks (preview)","slug":"tasks","version":"1.3.0","runtimeVersion":{"policy":"appVersion"},"android":{"package":"com.example.tasks.preview"},"ios":{"bundleIdentifier":"com.example.tasks.preview"},"sdkVersion":"57.0.0","platforms":["ios","android","web"]}
~~~

[[--json]] بيطبع سطر JSON واحد بدل الشكل الملوّن. وخلي بالك: [[$env:APP_VARIANT]] بيفضل متعرّف لحد ما تقفل الترمنال (أو [[Remove-Item Env:APP_VARIANT]]). ومن غير المتغير:

~~~text الناتج
name  pkg               runtimeVersion
----  ---               --------------
Tasks com.example.tasks @{policy=appVersion}
~~~

[[sdkVersion]] و [[platforms]] Expo ضافهم لوحده.

---

## ٦. [[EXPO_PUBLIC_]] جوه الكود: اتجرّب

عملت ملف في التطبيق نفسه:

~~~ts
export const API_URL = process.env.EXPO_PUBLIC_API_URL;
export const TOKEN = process.env.SENTRY_AUTH_TOKEN;
const key = 'EXPO_PUBLIC_API_URL';
export const DYNAMIC = process.env[key];
~~~

وعملت له [[console.log]] وبنيت الويب بالمتغيرين:

~~~bash
EXPO_PUBLIC_API_URL=https://staging-api.example.com SENTRY_AUTH_TOKEN=sntrys_SECRET123 npx expo export --platform web
~~~

جوه الـ JS اللي طلع، Metro كتب القيمة حرفيًا مكان أول سطر، والتاني فضل زي ما هو:

~~~text من dist/_expo/static/js/web/entry-....js
const t="https://staging-api.example.com",n=process.env.SENTRY_AUTH_TOKEN
~~~

وفتحت الصفحة في Chrome headless:

~~~text console
env https://staging-api.example.com undefined undefined
~~~

| المتغير | النتيجة في التطبيق | ليه |
|---|---|---|
| [[process.env.EXPO_PUBLIC_API_URL]] | القيمة | بيبدأ بـ [[EXPO_PUBLIC_]] ومكتوب بالاسم صريح، فـ Metro بدّله |
| [[process.env.SENTRY_AUTH_TOKEN]] | [[undefined]] | مش [[EXPO_PUBLIC_]]، فمبيدخلش الـ bundle. وده اللي عايزينه للأسرار |
| [[process.env[key]]] | [[undefined]] | الاسم في متغير، و Metro بيدوّر على الكلام المكتوب نصًا بس |

> يعني أي حاجة [[EXPO_PUBLIC_]] **مكتوبة كنص صريح جوه الـ JS**. اللي يفك الـ APK أو يفتح الـ bundle في المتصفح يشوفها.

---

## ٧. [[eas env:set]] (التعليقات في آخر المثال)

~~~text من eas env:set --help
$ eas env:set [ENVIRONMENT] [--name <value>] [--value <value>]
  [--type string|file] [--visibility plaintext|sensitive|secret] [--scope project|account]
~~~

- [[preview]] بعد [[env:set]]: الـ environment. الافتراضيين [[development]] و [[preview]] و [[production]]، وهم نفس الكلمة اللي في [[environment]] جوه eas.json.
- [[--name]] و [[--value]]: الاسم والقيمة.
- [[--visibility]]:

| القيمة | معناها |
|---|---|
| [[plaintext]] | بيظهر في الموقع والـ logs. لـ URL مثلًا |
| [[sensitive]] | مخفي في الـ logs |
| [[secret]] | مش بيتقري برّه سيرفرات EAS خالص. للـ tokens |

فلما [[eas build --profile preview]] يشتغل، بيحمّل متغيرات environment [[preview]]، فـ [[APP_VARIANT]] يبقى [[preview]] و app.config.ts يطلّع النسخة التانية. و [[eas env:pull]] بينزّلهم في [[.env.local]] على جهازك.

---

## الخلاصة

| | وقت الـ build (app.config.ts) | جوه التطبيق |
|---|---|---|
| [[EXPO_PUBLIC_X]] | موجود | موجود ومكتوب جوه الـ bundle |
| أي متغير تاني | موجود | [[undefined]] |

- متغير زي [[APP_VARIANT]] يغيّر [[name]] و [[package]]، فتركّب نسختين جنب بعض.
- السر عمره ما يبدأ بـ [[EXPO_PUBLIC_]]، ومكانه EAS env بـ [[secret]].
- اكتب [[process.env.EXPO_PUBLIC_X]] بالاسم صريح، مش [[process.env[name]]].`,
          lines: [
            "نوع الـ config.",
            "الـ variant من env (بيتقري وقت الـ build).",
            "لاحقة للـ package في غير الإنتاج.",
            "الـ config.",
            "اسم مختلف يبان تحت الأيقونة.",
            "نفس المشروع على EAS.",
            "النسخة اللي بتظهر للمستخدم.",
            "للـ EAS Update (القسم الجاي).",
            "package مختلف = تطبيق منفصل على الموبايل.",
            "نفس الكلام لـ iOS.",
            "قفلة.",
            "export default."
          ],
          sol: R`مع [[APP_VARIANT=preview]]: [[name: 'Tasks (preview)']] و [[android.package: 'com.example.tasks.preview']]. من غيره: [[Tasks]] و [[com.example.tasks]].

[[SENTRY_AUTH_TOKEN]] بيستخدمه الـ build عشان يرفع source maps لـ Sentry، يعني مكانه وقت الـ build بس. لو بقى [[EXPO_PUBLIC_]]، هيتحط نص صريح جوه الـ JS bundle في كل موبايل، وأي حد يقدر يستخدمه يرفع أو يمسح في مشروعك على Sentry. عرّفه كـ [[secret]] في EAS env.`
        }
      ]
    },
    {
      t: "التحديثات OTA بـ EAS Update",
      l: 3,
      n: "تصلّح bug في JS وتوصّله للمستخدمين في دقايق من غير متجر، وتعرف إمتى مينفعش",
      items: [
        {
          cmd: "eas update",
          title: "eas update: تبعت JS جديد للتطبيقات المتركبة من غير review",
          desc: R`التطبيق فيه جزئين: native (اتبنى واتراجع في المتجر) و JS bundle. [[expo-updates]] بيخلي التطبيق يسأل سيرفر EAS وهو بيفتح: «فيه bundle أحدث لنسختي؟»، ولو فيه ينزّله ويستخدمه (افتراضيًا في الفتحة الجاية). [[eas update --channel production --environment production --message "fix"]] بيعمل export للـ JS ويرفعه.

كل build مربوط بـ [[channel]] (من eas.json)، وكل update بيروح على branch، والـ channel بيشاور على branch. وفيه rollout بنسبة ([[--rollout-percentage 10]]) و rollback ([[eas update:republish]]).`,
          example: R`npx expo install expo-updates
eas update:configure
eas update --channel preview --environment preview --message "تجربة شاشة الطلبات"
eas update --channel production --environment production --message "fix: crash في السلة" --rollout-percentage 10
eas update:list
eas update:republish --group <update-group-id> --destination-channel production
eas channel:rollout production --action view`,
          try: R`اعمل preview build فيه [[expo-updates]] وركّبه. غيّر نص في شاشة، واعمل [[eas update --channel preview]]، واقفل التطبيق وافتحه مرتين. إمتى التغيير ظهر؟ وبعدين ضيف مكتبة native وحاول تعمل update: إيه اللي هيحصل للتطبيق المتركب؟`,
          deep: {
            why: R`bug في حساب السلة اكتشفته يوم الخميس بالليل: من غير OTA، بترفع build وتستنى review من Apple (ساعات لأيام) والمستخدمين ينزّلوا التحديث. مع EAS Update التصليح يوصل في دقايق. ده من أكبر مزايا RN/Expo قدام native و Flutter في الإنتاج.`,
            how: R`[[eas update]] بيشغّل [[expo export]] (نفس اللي شغّلته في الـ lab للـ android والويب)، ويرفع الـ bundle والـ assets، ويسجّلهم كـ update group على branch. [[--environment]] بيحمّل EAS env variables عشان [[EXPO_PUBLIC_*]] تبقى نفس قيم الـ build (إجباري من SDK 55).

التطبيق وهو بيفتح بيبعت [[runtimeVersion]] و [[channel]] بتوعه. السيرفر بيرجّع آخر update على الـ branch المربوط بالـ channel ده، وبـ نفس الـ runtimeVersion بس (الدرس الجاي). افتراضيًا ([[checkAutomatically: ON_LOAD]] و [[fallbackToCacheTimeout: 0]]) التطبيق بيفتح بالـ bundle الموجود فورًا وبينزّل الجديد في الخلفية، فالتغيير بيظهر في الفتحة اللي بعدها. ولو عايز تطبّقه فورًا: [[Updates.checkForUpdateAsync()]] و [[fetchUpdateAsync()]] و [[reloadAsync()]] (مثلًا بعد ما تسأل المستخدم).

الـ rollout: جزء من الأجهزة بياخد الـ update الجديد والباقي القديم، وتزوّد النسبة لو مفيش crashes. والـ rollback: [[update:republish]] لـ update قديم، أو [[eas update:roll-back-to-embedded]] يرجّع للـ bundle اللي جوه الـ build.

والقانون: المتاجر بتسمح بتحديث JS/assets اللي مبيغيرش الغرض الأساسي للتطبيق. متستخدمش OTA عشان تعدّي feature كانت هتترفض في الـ review.

مجربتش [[eas update]] نفسه (محتاج حساب)، بس جزء الـ export شغال في الـ lab، والـ flags من [[eas update --help]] على eas-cli 24.11.`,
            when: R`bug fixes و تعديلات UI و نصوص و منطق JS. مش لأي تغيير native (مكتبة native جديدة، أو صلاحية، أو أيقونة، أو ترقية SDK): دول build جديد.`,
            mistakes: R`update بـ JS بينادي مكتبة native مش موجودة في الـ build المتركب: crash عند كل المستخدمين. (الـ runtimeVersion موجود عشان يمنع ده.) وتنسى [[--environment]] فالـ API URL يبقى undefined. وتنشر 100% على طول من غير rollout. وتنسى إن المستخدم محتاج يفتح التطبيق مرتين عشان يشوف التحديث بالإعدادات الافتراضية.`
          },
          teach: R`## الفكرة: تبدّل الـ JS جوه تطبيق متركّب، من غير المتجر

التطبيق المتركّب على الموبايل فيه جزء native (اتبنى بـ Gradle أو Xcode) وملف JS bundle (الـ [[.hbc]] اللي شفناه في درس [[eas build]]). [[eas update]] بيبني bundle جديد ويرفعه، ومكتبة [[expo-updates]] جوه التطبيق بتنزّله وتشغّله بداله.

> اتجرّب على مشروع Expo SDK 57 على ويندوز: [[npx expo install expo-updates]] و [[expo prebuild]] و [[expo export]] (نفس الـ bundle اللي [[eas update]] بيرفعه)، و [[--help]] لكل أوامر eas-cli 24.11. الرفع والـ rollout والـ rollback محتاجين حساب Expo فمتعملوش، والكلام عنهم من الـ docs والـ help.

---

## ١. [[npx expo install expo-updates]]

[[expo install]] (مش [[npm install]]) بيختار النسخة المتوافقة مع الـ SDK:

~~~text الناتج
› Installing 1 SDK 57.0.0 compatible native module using npm
> npm install
~~~

~~~text package.json
"expo-updates": "~57.0.25",
~~~

دي مكتبة **native**، يعني محتاجة build جديد. الـ updates مش هتشتغل غير على build فيه المكتبة دي.

## ٢. [[eas update:configure]]

محتاج حساب، فمن الـ docs: بيكتب في [[app.json]] حاجتين، وبيضيف [[channel]] لكل profile في [[eas.json]]:

~~~json
"runtimeVersion": { "policy": "appVersion" },
"updates": { "url": "https://u.expo.dev/<projectId>" }
~~~

- [[updates.url]]: السيرفر اللي التطبيق هيسأله. [[<projectId>]] هو الـ UUID اللي [[eas init]] حطه.
- [[runtimeVersion]]: مين ياخد أنهي update (الدرس الجاي).

حطيت نفس السطرين بإيدي (بـ projectId وهمي) وعملت [[npx expo prebuild --platform android]]، ودي السطور اللي اتضافت في [[AndroidManifest.xml]]:

~~~text android/app/src/main/AndroidManifest.xml
<meta-data android:name="expo.modules.updates.ENABLED" android:value="true"/>
<meta-data android:name="expo.modules.updates.EXPO_RUNTIME_VERSION" android:value="@string/expo_runtime_version"/>
<meta-data android:name="expo.modules.updates.EXPO_UPDATES_CHECK_ON_LAUNCH" android:value="ALWAYS"/>
<meta-data android:name="expo.modules.updates.EXPO_UPDATES_LAUNCH_WAIT_MS" android:value="0"/>
<meta-data android:name="expo.modules.updates.EXPO_UPDATE_URL" android:value="https://u.expo.dev/00000000-0000-0000-0000-000000000000"/>
~~~

| السطر | معناه |
|---|---|
| [[ENABLED true]] | الـ updates شغالة في الـ build ده |
| [[EXPO_RUNTIME_VERSION]] | قيمته في [[strings.xml]]: [[1.3.0]] (نفس [[version]] لأن السياسة [[appVersion]]) |
| [[CHECK_ON_LAUNCH ALWAYS]] | اسأل السيرفر كل ما التطبيق يفتح |
| [[LAUNCH_WAIT_MS 0]] | متستناش الرد: افتح بالـ bundle اللي عندك فورًا |
| [[EXPO_UPDATE_URL]] | السيرفر |

السطرين [[ALWAYS]] و [[0]] هم السبب إن التحديث بيبان **في الفتحة التانية**: الفتحة الأولى بتشتغل بالقديم وبتنزّل الجديد في الخلفية، والتانية بتشغّل الجديد.

والـ [[channel]]؟ مش في الملف ده. EAS Build بيحطه وقت الـ build من [[channel]] اللي في الـ profile.

---

## ٣. [[eas update --channel preview --environment preview --message "..."]]

| الـ flag | معناه |
|---|---|
| [[--channel preview]] | التحديث ده للـ builds اللي الـ channel بتاعها [[preview]] |
| [[--environment preview]] | حمّل EAS env variables بتاعة [[preview]] قبل ما تبني الـ bundle، عشان [[EXPO_PUBLIC_*]] تبقى نفس قيم الـ build |
| [[--message]] (أو [[-m]]) | وصف يظهر في القايمة وفي expo.dev |

والـ help بيقول صراحة عن [[--environment]]:

~~~text من eas update --help
Required for projects using Expo SDK 55 or greater.
~~~

### بيعمل إيه خطوة بخطوة

1. يشغّل [[npx expo export]] ويطلّع فولدر [[dist]] ([[--input-dir]] الافتراضي [[dist]]).
2. يرفع الـ bundle والـ assets لـ EAS.
3. يسجّلهم كـ **update group** (update لـ Android وواحد لـ iOS) على الـ branch اللي الـ channel بيشاور عليه.

والـ export ده شغّلته:

~~~text npx expo export --platform android
› android bundles (1):
_expo/static/js/android/entry-7997267fc0afef356e7c7406516b6617.hbc (3.7MB)

› Files (1):
metadata.json (2.8KB)

Exported: dist
~~~

التطبيق مش بينزّل كل الـ ٤١ asset مع كل update: كل asset اسمه hash من محتواه، فاللي عنده نفس الـ hash مش بيتنزّل تاني.

### channel و branch

- **channel**: اسم ثابت جوه الـ build ([[preview]] و [[production]]).
- **branch**: قايمة updates مترتبة. الـ channel بيشاور على branch.
- [[--channel preview]] أول مرة بيعمل branch بنفس الاسم ويربطهم. وبعدين تقدر تخلي [[production]] يشاور على branch تاني من غير build جديد.

---

## ٤. [[--rollout-percentage 10]]

~~~text من eas update --help
Percentage of users this update should be immediately available to. Users not in the rollout
will be served the previous latest update on the branch ... must be an integer between 1 and 100.
When not specified, this defaults to 100.
~~~

يعني ١٠٪ من الأجهزة بس هتاخد التحديث، والباقي بيفضل على اللي قبله. لو مفيش crashes، تزوّد النسبة.

---

## ٥. المتابعة والرجوع

| الأمر | بيعمل إيه |
|---|---|
| [[eas update:list]] | آخر الـ updates (لكل branch أو [[--all]]) ومعاها الـ group id |
| [[eas update:republish --group <update-group-id> --destination-channel production]] | ينشر update قديم من جديد كأنه الأحدث. ده الـ rollback |
| [[eas update:roll-back-to-embedded]] | يرجّع الأجهزة للـ bundle اللي جوه الـ build نفسه |
| [[eas channel:rollout production --action view]] | يعرض حالة rollout شغال على القناة. و [[--action]] قيمها [[create]] و [[edit]] و [[end]] و [[view]] |

[[<update-group-id>]] في المثال مكان تحط فيه الـ id من [[update:list]]، مش حاجة تتكتب كده.

ومن غير login، أي واحد فيهم بيقف بنفس الرسالة:

~~~text الناتج
An Expo user account is required to proceed.
    Error: update command failed.
~~~

---

## الخلاصة

| | build جديد | [[eas update]] |
|---|---|---|
| بيغيّر | native + JS | JS والـ assets بس |
| بيعدّي على المتجر | أيوة | لأ |
| بيوصل للناس | لما ينزّلوا التحديث من المتجر | الفتحة التانية بعد النشر |

- [[expo-updates]] لازم يكون في الـ build، والـ [[channel]] جاي من eas.json.
- [[--environment]] إجباري من SDK 55، وإلا [[EXPO_PUBLIC_*]] ممكن تطلع [[undefined]].
- ابدأ بـ [[--rollout-percentage]] صغير، والرجوع بـ [[update:republish]].`,
          lines: [
            "المكتبة اللي جوه التطبيق وبتسأل عن التحديثات.",
            R`بيضيف [[updates.url]] و [[runtimeVersion]] في app.json و [[channel]] في eas.json.`,
            "update لقناة الـ preview.",
            "update للإنتاج لـ 10% من الأجهزة الأول.",
            "القايمة.",
            "rollback: ترجّع update قديم كأنه الأحدث.",
            "حالة الـ rollout على القناة."
          ],
          sol: R`بالإعدادات الافتراضية: أول فتحة بعد الـ update التطبيق بيفتح بالقديم وبينزّل الجديد في الخلفية، والفتحة التانية بيظهر التغيير. لو عايزه يبان أسرع، اعمل [[checkForUpdateAsync]] و [[fetchUpdateAsync]] و [[reloadAsync]] بنفسك.

ولو ضفت مكتبة native وعملت update بنفس الـ runtimeVersion: التطبيق المتركب هياخد الـ JS الجديد اللي بيستورد module مش موجود، فيقع بـ «Cannot find native module» عند الناس. لو الـ runtimeVersion بسياسة [[fingerprint]] (أو زوّدت الـ version مع [[appVersion]])، الـ update هيتسجل لـ runtime جديد، والتطبيقات القديمة مش هتاخده أصلًا، وده الصح: المكتبة الـ native محتاجة build جديد.`
        },
        {
          cmd: "runtimeVersion",
          title: "runtimeVersion: مين ياخد أنهي update، وليه ده بيمنع الـ crash",
          desc: R`[[runtimeVersion]] عقد بين الـ build والـ update: «الـ JS ده متوافق مع الـ native ده». التطبيق بياخد updates بنفس الـ runtimeVersion بتاعه بس. لو غيّرت أي حاجة native، لازم الـ runtimeVersion يتغير، وإلا update جديد ممكن يوصل لـ build قديم ويوقعه.

السياسات: [[{ policy: 'appVersion' }]] (الافتراضي بعد [[update:configure]]): الـ runtime هو [[version]] من app.json، فلازم تفتكر تزوّده مع كل تغيير native. [[{ policy: 'fingerprint' }]]: Expo بيحسب hash من كل حاجة native (المكتبات، والـ config، والـ plugins)، فبيتغير لوحده لما حاجة native تتغير. أو string ثابت بتديره بإيدك.`,
          example: R`// app.json -> expo
// "runtimeVersion": { "policy": "fingerprint" }
// "updates": { "url": "https://u.expo.dev/<projectId>" }
npx @expo/fingerprint fingerprint:generate --platform android
eas fingerprint:compare
eas update --channel production --environment production --message "fix: السعر بالعملة"
eas build -p android --profile production`,
          try: R`اكتب سيناريو: build 1.3.0 على المتجر بـ [[appVersion]]. ضفت [[expo-camera]] ونسيت تزوّد الـ version، وعملت [[eas update]]. إيه اللي هيحصل للمستخدمين؟ وإيه اللي كان هيحصل لو السياسة [[fingerprint]]؟`,
          deep: {
            why: R`أخطر غلطة في OTA: update بيوقع التطبيق عند كل المستخدمين، والأسوأ إن التصليح نفسه لازم يوصل بـ update تاني، ولو التطبيق بيقع قبل ما يلحق ينزّل، مفيش حل غير build جديد من المتجر. runtimeVersion هو خط الدفاع ده.`,
            how: R`وقت الـ build، الـ runtimeVersion بيتحسب ويتحط جوه التطبيق. وقت [[eas update]]، بيتحسب تاني من المشروع الحالي ويتسجل مع الـ update. السيرفر بيدّي كل تطبيق الـ updates اللي بنفس القيمة بتاعته بس.

[[appVersion]]: بسيط ومفهوم (1.3.0)، بس معتمد على إنك تفتكر. لو زوّدت [[version]] لكل release حتى لو JS بس، التطبيقات القديمة مش هتاخد updates الإصدار الجديد، وده ممكن يكون مقصود.

[[fingerprint]]: [[@expo/fingerprint]] (dependency في [[expo]] نفسه، شفتها في الـ lab) بيعمل hash من [[package.json]] للمكتبات الـ native، والـ config plugins، وملفات native لو موجودة، والـ app config اللي بيأثر على native. تغيير JS بس = نفس الـ fingerprint = الـ update يوصل. تغيير native = fingerprint جديد = محتاج build. [[eas fingerprint:compare]] بيوريك الفرق بين build و update أو بين commits.

ومع الـ CI: فيه workflows بتقارن الـ fingerprint، ولو اتغير تعمل build، ولو لأ تعمل update بس.

جربت ده في الـ lab بـ [[npx @expo/fingerprint fingerprint:generate]]: تعديل في ملف component (JS) طلّع نفس الـ hash بالظبط، وتغيير [[orientation]] في app.json (إعداد native) طلّع hash مختلف. و [[eas fingerprint:compare]] محتاج حساب فمجربتوش.`,
            when: R`fingerprint لأغلب المشاريع الجديدة (بيشيل عنك التذكر). appVersion لو عايز تحكم واضح بالأرقام وفريقك منظّم. و string يدوي لو عندك فولدرات native بتعدّل فيها بإيدك.`,
            mistakes: R`[[appVersion]] ومكتبة native جديدة من غير ما تزوّد [[version]]: crash بـ OTA. و [[fingerprint]] وتستغرب إن الـ update مش واصل للناس: حاجة native اتغيرت (حتى نسخة patch لمكتبة) فالـ runtime اختلف، ومحتاج build. وتعمل update قبل ما الـ build الجديد يتنشر فعلًا في المتجر.`
          },
          teach: R`## الفكرة: رقم بيقول «الـ JS ده يمشي على أنهي native»

كل build بيتولد وجواه قيمة اسمها [[runtimeVersion]]، وكل update بيترفع ومعاه قيمة. السيرفر بيدّي التطبيق الـ updates اللي **بنفس القيمة بالظبط** بس. المثال بيستخدم سياسة [[fingerprint]]: القيمة hash بيتحسب من كل حاجة native في المشروع.

> اتجرّب على مشروع Expo SDK 57 على ويندوز: [[npx @expo/fingerprint fingerprint:generate]] و [[fingerprint:diff]] مع تعديلات مختلفة، و [[expo prebuild]] بالسياستين. [[eas fingerprint:compare]] و [[eas update]] و [[eas build]] محتاجين حساب، فمن الـ help والـ docs.

---

## ١. السطور اللي في [[app.json]] (التعليقات الأولى في المثال)

~~~json
"runtimeVersion": { "policy": "fingerprint" },
"updates": { "url": "https://u.expo.dev/<projectId>" }
~~~

السطور دي جوه [[expo]] في app.json، والمثال كاتبها كتعليقات ([[//]]) عشان يوضح مكانها بس.

| السياسة | الـ runtimeVersion بيبقى | بيتغير إمتى |
|---|---|---|
| [[{ policy: 'appVersion' }]] | [[version]] (مثلًا [[1.3.0]]) | لما انت تغيّر [[version]] |
| [[{ policy: 'fingerprint' }]] | hash طويل | لوحده لما حاجة native تتغير |
| [[runtimeVersion: '5']] | النص ده | لما انت تغيّره |

### الفرق جوه الـ build

عملت [[npx expo prebuild --platform android]] بالسياستين وبصيت في [[android/app/src/main/res/values/strings.xml]]:

~~~text مع appVersion
<string name="expo_runtime_version">1.3.0</string>
~~~

~~~text مع fingerprint
<string name="expo_runtime_version">file:fingerprint</string>
~~~

مع [[fingerprint]] مفيش رقم مكتوب. [[file:fingerprint]] معناها إن القيمة بتتحسب وقت الـ build نفسه وتتحط في ملف جوه التطبيق.

---

## ٢. [[npx @expo/fingerprint fingerprint:generate --platform android]]

- [[@expo/fingerprint]]: باكدج من Expo، جاية مع [[expo]] نفسها ([[npm ls]] ورّاني [[expo@57.0.27]] تحتها [[@expo/fingerprint@0.20.13]]).
- [[fingerprint:generate]]: احسب البصمة للمشروع الحالي.
- [[--platform android]]: احسبها لـ Android (كل منصة ليها بصمة).

الناتج JSON طويل. أوله:

~~~text الناتج (مختصر)
{"sources":[
  {"type":"file","filePath":".gitignore","reasons":["bareGitIgnore"],"hash":"1b3d2a4e..."},
  {"type":"file","filePath":"eas.json","reasons":["easBuild"],"hash":"cc9d1bcb..."},
  {"type":"file","filePath":"assets/images/icon.png","reasons":["expoConfigExternalFile"],...},
  ...
 ],
 "hash":"dfd184d25c6c94fb428fc722296169d628ab060b"}
~~~

- [[sources]]: كل حاجة دخلت في الحساب، ولكل واحدة hash، و [[reasons]] بتقول ليه دخلت. كانوا ٦٦ مصدر، وأنواع الأسباب: [[expoConfig]] (الإعدادات)، و [[expoConfigPlugins]]، و [[expoAutolinkingAndroid]] (فولدرات android في المكتبات الـ native)، و [[package:react-native]]، و [[packageJson:scripts]]، و [[easBuild]]، والأيقونات.
- [[hash]] اللي في الآخر: البصمة النهائية، وهي دي اللي بتبقى الـ runtimeVersion.

### التجربة: إيه اللي بيغيّر البصمة؟

غيّرت حاجة واحدة كل مرة ورجّعتها:

| التغيير | البصمة | النتيجة |
|---|---|---|
| ولا حاجة | [[dfd184d2...]] | |
| نص في [[src/app/index.tsx]] (JS) | [[dfd184d2...]] | نفسها: update يكفي |
| [[@shopify/flash-list]] 2.0.3 و 2.3.3 (JS بس) | [[dfd184d2...]] | نفسها |
| [[orientation]] في app.json | [[017b6616...]] | اتغيرت: build |
| [[npx expo install expo-camera]] | [[d99675c7...]] | اتغيرت: build |
| [[version]] من 1.3.0 لـ 1.3.1 | [[2852f340...]] | اتغيرت (الـ version بيتكتب في الـ native كـ [[versionName]]) |

و [[fingerprint:diff]] بين قبل وبعد [[expo-camera]] قال السبب بالظبط:

~~~text الناتج (ملخّص)
added    dir      node_modules/expo-camera/android     expoAutolinkingAndroid
changed  contents expoAutolinkingConfig:android         expoAutolinkingAndroid
~~~

يعني المكتبة فيها فولدر [[android]] (كود Kotlin)، وده native. [[flash-list]] v2 مفيهاش، فمأثرتش.

> [[eas.json]] نفسه من المصادر ([[easBuild]])، فأي تعديل فيه (حتى إن Git يحوّل نهايات السطور لـ CRLF) بيغيّر البصمة. ده حصل معايا في التجربة.

---

## ٣. [[eas fingerprint:compare]]

~~~text من eas fingerprint:compare --help
$ eas fingerprint:compare [HASH1...] [HASH2...] [--build-id <value>...] [--update-id <value>...]
HASH1  If provided alone, HASH1 is compared against the current project's fingerprint.
~~~

نفس فكرة [[fingerprint:diff]] بس بيجيب البصمة من EAS: من غير arguments بيقارن المشروع الحالي بآخر build، أو تديله [[--build-id]] أو [[--update-id]]. محتاج حساب.

---

## ٤. القرار: [[eas update]] ولا [[eas build]]

السطرين الأخيرين في المثال هم القرار:

| البصمة الحالية | الأمر | ليه |
|---|---|---|
| زي بصمة الـ build اللي على المتجر | [[eas update --channel production ...]] | الـ native زي ما هو، فالـ JS الجديد هيلاقي كل اللي محتاجه |
| مختلفة | [[eas build -p android --profile production]] | الـ update هيتسجّل لـ runtime مفيش عليه ولا تطبيق متركّب، فمحدش هياخده |

السيرفر بيقارن نص الـ runtimeVersion بس: مش بيفهم «أقدم» و «أحدث». أي اختلاف = مش متوافق.

---

## الخلاصة

- التطبيق بياخد الـ updates اللي ليها **نفس** الـ runtimeVersion بتاعه، والباقي بيتجاهله.
- [[appVersion]]: انت مسؤول تزوّد [[version]] مع أي تغيير native. لو نسيت، الـ update يوصل لـ build مش متوافق ويوقعه.
- [[fingerprint]]: الـ hash بيتغير لوحده مع أي تغيير native (مكتبة فيها android أو ios، أو plugin، أو إعداد native)، ومبيتغيرش مع تعديل JS أو مكتبة JS بس.
- اتأكد بـ [[fingerprint:generate]] قبل ما تقرر update ولا build.`,
          lines: [
            R`بصمة الـ native للمشروع الحالي (JSON فيه [[hash]] ومصادره). [[@expo/fingerprint]] جاي مع expo.`,
            "قارن البصمة بين build و update أو commits.",
            "لو البصمة زي الـ build: update يكفي.",
            "لو اتغيرت: build جديد للمتجر."
          ],
          sol: R`مع [[appVersion]]: الـ build والـ update الاتنين runtime [[1.3.0]]، فالـ update بيوصل لكل المستخدمين. الـ JS الجديد بيستورد [[expo-camera]] اللي مش موجود في الـ native بتاع الـ build، فالشاشة (أو التطبيق كله لو الـ import في الـ root) بتقع بـ «Cannot find native module 'ExpoCamera'». التصليح: [[update:republish]] للـ update القديم فورًا، وبعدين build جديد بـ 1.4.0.

مع [[fingerprint]]: إضافة [[expo-camera]] غيّرت الـ package.json والـ plugins، فالـ fingerprint اتغير، والـ update اتسجل لـ runtime جديد مفيش build عليه، فمحدش من المستخدمين خده. محدش وقع، وانت تعرف إنك محتاج build.`
        }
      ]
    }
]);
