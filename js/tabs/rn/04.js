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

مقدرتش أعمل build فعلًا (محتاج حساب Expo ومفاتيح المتاجر). الشكل ده من الـ docs ومن [[eas build --help]] على eas-cli 24.8 اللي ركّبته.`,
            when: R`أول ما تحتاج development build أو تبعت نسخة لحد. والـ profiles ممكن تزيد: [[staging]] بـ API تاني، أو [[extends]] عشان تورّث من profile تاني.`,
            mistakes: R`ترفع build بـ developmentClient للمتجر. و [[distribution: "internal"]] على iOS وتستغرب إن الموبايل مش راضي يركّب (الجهاز مش مسجل). وتزوّد versionCode بإيدك وكمان autoIncrement شغال. وتحط أسرار في [[env]] جوه eas.json وهو في Git.`
          },
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

مقدرتش أشغّل [[eas build]] (محتاج حساب)، بس شغّلت [[npx expo export --platform android]] على الـ lab وطلّع Hermes bytecode bundle ([[.hbc]]، حوالي 3.8MB)، وده الجزء الـ JS من الـ build.`,
            when: R`preview لكل feature محتاجة تتجرب على موبايلات الفريق. production قبل كل رفع للمتجر. development لما تضيف مكتبة native. ومع [[--auto-submit]] (أو EAS Workflows) الـ build بيترفع للمتجر لوحده.`,
            mistakes: R`تمسح الـ keystore أو تعمل واحد جديد لتطبيق موجود على Play: المتجر هيرفض التحديث. و [[.env]] في [[.gitignore]] وتفتكر إن EAS هيشوفه (مش هيشوفه، استخدم EAS env). و build فشل وتقرا آخر سطر بس: الخطأ الحقيقي غالبًا فوق في مرحلة [[prebuild]] أو install. ومكتبة native جديدة ومعملتش development build جديد.`
          },
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

مجربتش submit (محتاج حسابات مدفوعة)، والأوامر من [[eas submit --help]] على eas-cli 24.8.`,
            when: R`بعد كل production build عايز يوصل للمستخدمين. ولأغلب التحديثات اللي JS بس، EAS Update (القسم الجاي) أسرع بكتير ومن غير review.`,
            mistakes: R`تجرّب [[eas submit]] قبل ما ترفع أول AAB يدوي: «Google Play API: Package not found». وتنسى Data safety فالتطبيق يترفض. وترفع على production track على طول بدل internal. وتنسى زرار حذف الحساب.`
          },
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

مجربتش [[eas env:set]] (محتاج حساب)، والأوامر من [[eas env:set --help]] على eas-cli 24.8 ([[env:create]] بقت deprecated لصالح [[env:set]]).`,
            when: R`أي مشروع فيه أكتر من backend (dev و staging و prod). و variants لو الفريق بيجرّب على موبايلاته الشخصية.`,
            mistakes: R`سر في [[EXPO_PUBLIC_]] (API key لخدمة مدفوعة): أي حد يفك الـ APK ياخده. استخدم الـ backend كوسيط. و [[process.env[name]]] بمتغير: Metro مش هيبدّله. وتغيّر [[.env]] ومتعملش restart لـ [[expo start]]. وتغيّر [[android.package]] بتاع production بعد النشر.`
          },
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

مجربتش [[eas update]] نفسه (محتاج حساب)، بس جزء الـ export شغال في الـ lab، والـ flags من [[eas update --help]] على eas-cli 24.8.`,
            when: R`bug fixes و تعديلات UI و نصوص و منطق JS. مش لأي تغيير native (مكتبة native جديدة، أو صلاحية، أو أيقونة، أو ترقية SDK): دول build جديد.`,
            mistakes: R`update بـ JS بينادي مكتبة native مش موجودة في الـ build المتركب: crash عند كل المستخدمين. (الـ runtimeVersion موجود عشان يمنع ده.) وتنسى [[--environment]] فالـ API URL يبقى undefined. وتنشر 100% على طول من غير rollout. وتنسى إن المستخدم محتاج يفتح التطبيق مرتين عشان يشوف التحديث بالإعدادات الافتراضية.`
          },
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
    },
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "الأسئلة اللي بتتكرر في انترفيوهات React Native، بإجابة تقولها في دقيقة والأسئلة اللي بتيجي بعدها",
      items: [
        {
          cmd: "RN بيشتغل إزاي من جوه",
          title: "React Native بيشتغل إزاي من جوه؟ (threads و JSI و Fabric)",
          desc: R`إجابة في دقيقة: «كودي JS/TS بيتعمله bundle بـ Metro ويشتغل على Hermes جوه التطبيق. React بيحسب شجرة الـ components على الـ JS thread. الـ New Architecture شالت الـ bridge القديم: JS بيكلم C++ مباشرة عن طريق JSI. Fabric هو الـ renderer: بيبني shadow tree في C++، و Yoga بيحسب الـ layout (flexbox)، وبعدين التغييرات بتتطبق على native views على الـ UI thread. و TurboModules هي الـ native modules (كاميرا، تخزين) بتتحمّل lazily وبـ types متولّدة. عشان كده الـ UI native حقيقي، والمنطق JS.»`,
          example: R`# JS thread:   React render + منطقك + events handlers
# UI thread:   رسم الـ native views + اللمس + Reanimated worklets
# JSI:         JS <-> C++ مباشرة، sync أو async، من غير JSON
# Fabric:      shadow tree في C++ + Yoga layout -> native views
# TurboModules: native modules lazy بـ Codegen types
# Hermes:      محرك JS بيشغّل bytecode متجهّز وقت الـ build`,
          try: R`قول الإجابة بصوتك في دقيقة من غير ما تبص. وبعدين جاوب على السؤال اللي بعده: «ليه الـ scroll بيفضل شغال والتطبيق مش بيرد على الضغطات؟»`,
          deep: {
            why: R`بيختبر إنك فاهم الأداة مش بس بتستخدمها، وإن معلوماتك مش قديمة (الـ bridge). والإجابة دي بتفتح الباب لأسئلة الأداء اللي بعدها.`,
            how: R`نقط لو اتسألت أكتر: Hermes بيعمل precompile للـ JS لـ bytecode وقت الـ build (الـ [[.hbc]] اللي طلع في [[expo export]] في الـ lab)، فالـ startup أسرع وذاكرة أقل من JIT. و Hermes V1 هو الجيل الجديد. الـ bridge القديم كان async و batched و JSON، فأي حاجة sync (قياس view) كانت مستحيلة. JSI بيسمح بـ host objects: JS ماسك reference لـ object في C++. و Fabric بيدعم concurrent React (transitions، و Suspense). و Codegen بيولّد الـ glue code من specs مكتوبة بـ TS.`,
            when: R`أسئلة بتيجي بعدها: «إيه الفرق بين الـ bridge و JSI؟»، و «ليه الـ New Architecture مهمة للمكتبات؟»، و «إيه اللي بيحصل لما تدوس زرار؟» (native touch على الـ UI thread، يتبعت لـ JS، الـ handler يعمل setState، React يحسب، Fabric يطبّق)، و «Expo Go بيشغّل كودك إزاي من غير build؟» (فيه الـ native جاهز، وبيحمّل الـ JS bundle من Metro).`,
            mistakes: R`«RN بيحوّل الكود لـ native» (لأ، الـ views native والكود JS). و «RN بيستخدم WebView» (ده Capacitor/Cordova). و «الـ bridge» كأنه الحاضر. و «RN single-threaded» (الـ JS thread واحد، بس فيه UI thread وغيره).`
          },
          sol: R`الإجابة على «الـ scroll شغال والضغطات لأ»: الـ scroll بيتعمل native على الـ UI thread، فمش محتاج JS. لكن [[onPress]] handler في JS، والـ JS thread مشغول (render تقيل، أو loop، أو JSON كبير بيتعمل له parse). فالضغطة بتستنى في الطابور. الحل: قلّل الشغل على الـ JS thread (memo، وتقسيم الشغل، و [[startTransition]] للتحديثات غير العاجلة)، وخلي الـ animations والـ gestures على الـ UI thread بـ Reanimated و gesture-handler.`
        },
        {
          cmd: "ليه القايمة بطيئة",
          title: "«القايمة بتقطّع وفيها بياض وانت بتعمل scroll»: تعمل إيه؟",
          desc: R`إجابة في دقيقة: «أول حاجة أقيس على release build على موبايل متوسط، مش dev. بعدين أدوّر بالترتيب: (١) الـ renderItem تقيل؟ صور كبيرة، أو components كتير، أو حسابات في الـ render. (٢) re-renders زيادة؟ الـ Profiler يوريني لو كل الصفوف بتعيد رسم لما حاجة تتغير، وأصلّح بـ memo و callbacks ثابتة أو الـ React Compiler. (٣) keyExtractor ثابت من الـ id. (٤) الصور بحجم العرض و cache (expo-image). (٥) لو لسه، FlashList بدل FlatList عشان الـ recycling، مع getItemType لو فيه أنواع. والـ FlatList جوه ScrollView من أول الحاجات اللي أشوفها.»`,
          example: R`# الترتيب:
# 1. release build + Perf Monitor (JS FPS و UI FPS)
# 2. React DevTools Profiler: مين بيعيد الرسم؟
# 3. renderItem: صور بحجمها، ومفيش حسابات تقيلة، و memo
# 4. keyExtractor ثابت، ومفيش FlatList جوه ScrollView
# 5. FlashList + getItemType
npx expo run:android --variant release`,
          try: R`خد شاشة قايمة من مشروعك (أو شاشة المهام في الـ lab) وامشي على الـ checklist: قيس في release، وشوف الـ Profiler، ودوّر على الأخطاء الخمسة. اكتب أول حاجة لقيتها.`,
          deep: {
            why: R`أشهر سؤال عملي في انترفيوهات RN، لأن كل تطبيق فيه قوايم وكل فريق قابل المشكلة دي. الإجابة الكويسة بتبين إنك بتقيس الأول ومش بتجرب حلول عشوائية.`,
            how: R`نقط لو اتسألت أكتر: JS FPS واطي و UI FPS عالي = المشكلة في JS (render). الاتنين واطيين = الـ native views تقيلة (ظلال كتير، أو صور ضخمة، أو nesting عميق). و [[windowSize]] و [[initialNumToRender]] و [[maxToRenderPerBatch]] في FlatList بتوازن بين البياض والذاكرة. و [[getItemLayout]] لو ارتفاع العنصر ثابت (FlatList بيقدر يقفز من غير ما يقيس). و [[removeClippedSubviews]] على Android. و FlashList v2 مش محتاجة estimatedItemSize.`,
            when: R`أسئلة بتيجي بعدها: «إيه الفرق بين FlatList و FlashList؟» (unmount/mount مقابل recycling)، و «إيه مشكلة الـ state جوه عنصر في FlashList؟» (بيفضل مع الـ cell)، و «إمتى تستخدم ScrollView؟»، و «إزاي تعمل infinite scroll؟» (onEndReached + useInfiniteQuery + شرط isFetchingNextPage).`,
            mistakes: R`«هحط FlashList» كأول وآخر إجابة من غير قياس. و «هقيس في dev». و «هعمل memo لكل حاجة». ونسيان الصور، وهي السبب في نص الحالات.`
          },
          lines: [
            "release build محلي عشان القياس يبقى حقيقي."
          ],
          sol: R`إجابة قوية بتذكر: القياس على release، والتفرقة بين JS و UI FPS، وسبب واحد على الأقل من الخمسة بمثال (مثلًا «كان فيه [[onPress={() => ...}]] inline بيكسر الـ memo في كل صف»، أو «الصور كانت 3000px في مربع 80»). ولو لقيت في الـ lab إن [[TaskRow]] ملفوف في [[memo]] بس [[onPress]] بيتعمل inline في [[renderItem]]، يبقى ده بالظبط نوع الحاجة اللي بتقولها: مع الـ React Compiler شغال غالبًا مش هتفرق، ومن غيره الـ memo مالوش تأثير.`
        },
        {
          cmd: "التوكن تحفظه فين",
          title: "«هتحفظ التوكن فين في تطبيق الموبايل؟ وليه مش AsyncStorage؟»",
          desc: R`إجابة في دقيقة: «access token و refresh token في expo-secure-store، يعني Keychain على iOS و Keystore على Android، لأنهم مشفّرين بمفاتيح النظام. AsyncStorage مش مشفّر، وأي حد عنده backup أو جهاز rooted يقراه. الـ access قصير العمر، والـ refresh أطول وبيتعمله rotation على السيرفر. في الـ client عندي API wrapper بيحط الـ Bearer، ولو رجع 401 بيعمل refresh مرة واحدة حتى لو فيه طلبات كتير مع بعض (single-flight)، ولو الـ refresh فشل بعمل sign out. وفي الخروج بمسح الاتنين وبقول للسيرفر يلغي الـ refresh.»`,
          example: R`# access: SecureStore، عمر قصير (دقايق)
# refresh: SecureStore، عمر أطول + rotation على السيرفر
# 401 -> refresh واحد مشترك -> أعد الطلب مرة
# refresh فشل -> signOut -> Stack.Protected يرجّع للـ login
# logout -> امسح الاتنين + POST /api/auth/logout`,
          try: R`قول الإجابة بصوتك، وبعدين جاوب: «طب لو حد عمل reverse engineering للـ APK، يقدر ياخد التوكن؟» و «ليه مش cookies زي الويب؟»`,
          deep: {
            why: R`سؤال بيجمع الأمان والشبكة والـ state في سؤال واحد، وبيبان منه لو انت نقلت عادات الويب (localStorage) للموبايل من غير تفكير.`,
            how: R`نقط أكتر: SecureStore بيحمي البيانات وهي مخزّنة (at rest). وهي في الذاكرة وقت التشغيل، أي كود بيشتغل جوه تطبيقك يقدر يقراها. الـ reverse engineering للـ APK بيطلّع الكود والـ [[EXPO_PUBLIC_*]]، مش التوكنات (دي على جهاز المستخدم بس). و certificate pinning حماية إضافية ضد MITM في التطبيقات الحساسة (بنوك)، وليها تكلفة (لما الشهادة تتغير لازم update). والـ biometrics: [[requireAuthentication]] في SecureStore أو [[expo-local-authentication]] قبل عمليات حساسة. وعلى السيرفر: كشف إعادة استخدام الـ refresh token يلغي كل الجلسات.`,
            when: R`أسئلة بتيجي بعدها: «إزاي تتعامل مع ٣ طلبات رجعوا 401 مع بعض؟» (درس [[refresh token]])، و «التطبيق يعرف إزاي إن المستخدم لسه داخل أول ما يفتح؟» (يقرا من SecureStore والـ splash ظاهرة، درس [[Stack.Protected]])، و «ليه مش cookies؟» (ممكن، بس RN networking مع cookies أقل وضوحًا، والـ Bearer header أبسط ومتحكم فيه، والـ backend بيدعم الاتنين).`,
            mistakes: R`«AsyncStorage لأنه أسهل». و «Redux persist» (بيكتب في AsyncStorage). و «الـ JWT مشفّر فمش مشكلة» (الـ JWT signed مش encrypted، أي حد يقرا الـ payload). و «هحط الـ API secret في التطبيق».`
          },
          sol: R`«reverse engineering للـ APK»: بيطلّع الكود والـ assets وأي قيمة في الـ bundle (زي [[EXPO_PUBLIC_API_URL]])، بس التوكنات مش في الـ APK أصلًا، دي بتتعمل بعد الـ login وبتتخزن على جهاز المستخدم في Keychain أو Keystore. الخطر الحقيقي: سر ثابت حطيته في الكود (API key مدفوع)، وده لازم يبقى على السيرفر.

«ليه مش cookies؟»: ممكن، بس في RN مفيش sandbox المتصفح اللي بيدّي [[httpOnly]] قيمته (مفيش XSS بنفس المعنى، ومفيش [[document.cookie]])، والـ Bearer في header واضح وسهل تتحكم فيه وتختبره. المهم مكان التخزين وعمر التوكن والـ rotation، مش الشكل.`
        },
        {
          cmd: "OTA إمتى مينفعش",
          title: "«تقدر تصلّح أي bug بـ OTA update؟»",
          desc: R`إجابة في دقيقة: «لأ. الـ OTA بيبدّل الـ JS bundle والـ assets بس. أي تغيير native محتاج build جديد ويعدّي على المتجر: مكتبة native جديدة أو ترقية نسختها، أو ترقية الـ Expo SDK أو RN، أو تغيير في app.json بيأثر على native (صلاحيات، وأيقونة، و splash، و package name)، أو config plugin. عشان أمنع update يوصل لـ build مش متوافق بستخدم runtimeVersion، ويفضّل بسياسة fingerprint عشان تتغير لوحدها. وبنشر بـ rollout بنسبة وعندي rollback بـ republish. وقانونيًا: المتاجر بتسمح بتحديثات JS مبتغيرش الغرض الأساسي للتطبيق.»`,
          example: R`# OTA ينفع: bug في JS، نص، ستايل، منطق، صورة في assets
# OTA مينفعش: مكتبة native، ترقية SDK، صلاحية جديدة، أيقونة، splash، package name
# الحماية: runtimeVersion (fingerprint) + rollout % + republish للرجوع`,
          try: R`صنّف الحاجات دي (OTA ولا build): تغيير لون زرار، و إضافة [[expo-camera]]، و تصليح حساب الخصم، و ترقية [[@shopify/flash-list]] من 2.0 لـ 2.3، و تغيير اسم التطبيق، و ترجمة جديدة في ملف JSON.`,
          deep: {
            why: R`سؤال بيختبر إنك فاهم الحدود بين JS و native، وإنك اشتغلت على تطبيق في الإنتاج فعلًا، مش بس دروس. والإجابة الغلط هنا («أيوة أي حاجة») بتوقع تطبيقات حقيقية.`,
            how: R`نقط أكتر: التطبيق بيحمّل الـ update في الفتحة اللي بعد النشر افتراضيًا. الـ assets (صور) بتتحدث مع الـ update. لو التطبيق وقع أول ما حمّل update جديد، [[expo-updates]] عنده error recovery بيرجع للـ bundle اللي قبله في حالات معينة، بس متعتمدش عليه. وفيه code signing للـ updates لو عايز تضمن إن محدش يقدر يبعت bundle مزوّر. والـ channels بتخليك تجرّب على preview الأول.`,
            when: R`أسئلة بتيجي بعدها: «إزاي تعرف إن الـ update اللي نشرته مش بيوقع التطبيق؟» (rollout 10% و monitoring زي Sentry مع الـ update id، وبعدين زوّد)، و «المستخدم اللي مفتحش التطبيق شهر هياخد إيه؟» (آخر update لنفس الـ runtime)، و «إيه الـ runtimeVersion؟».`,
            mistakes: R`«أي حاجة». و «OTA بيحتاج review» (مش بيحتاج، ده الهدف). ونسيان إن ترقية نسخة مكتبة native (حتى minor) تغيير native. و «هغيّر الأيقونة بـ OTA».`
          },
          sol: R`تغيير لون زرار: OTA. إضافة [[expo-camera]]: build (مكتبة native وصلاحية جديدة). تصليح حساب الخصم: OTA. ترقية FlashList من 2.0 لـ 2.3: OTA، لأن FlashList v2 مكتوبة JS بالكامل ومفيهاش native code، والـ fingerprint مبيتغيرش (اتجرّب: نفس الـ hash قبل وبعد الترقية). بس لو المكتبة فيها native code (زي Reanimated أو expo-camera)، أي ترقية حتى minor = build. تغيير اسم التطبيق: build (الاسم native في Info.plist و strings.xml). ترجمة جديدة في JSON جوه المشروع: OTA (asset/JS).`
        },
        {
          cmd: "Expo ولا bare",
          title: "«Expo ولا React Native CLI (bare)؟ ومش Expo بيقيّدك؟»",
          desc: R`إجابة في دقيقة: «Expo هو الـ framework الموصى بيه رسميًا من فريق React Native. الفكرة القديمة إن Expo بيقيّدك كانت صحيحة أيام Expo Go بس. دلوقتي مع development builds و config plugins تقدر تستخدم أي مكتبة native، وتكتب native modules بنفسك بـ Expo Modules API (Swift و Kotlin)، ولو محتاج تعدّل حاجة native بتكتب config plugin. ومعاك Expo Router و EAS Build و Update. الـ bare لسه منطقي لو عندك تطبيق native موجود بتضيف فيه RN، أو فريق native عايز يمسك الفولدرات بإيده، وحتى هنا تقدر تستخدم مكتبات Expo.»`,
          example: R`# Expo (managed + CNG): app.json + plugins -> prebuild يولّد android/ios
# development build: أي مكتبة native
# Expo Modules API: تكتب native module بـ Swift/Kotlin
# bare: android/ios في Git وانت بتعدّل فيهم بإيدك (وتقدر تستخدم expo modules برضه)
npx create-expo-app@latest
npx @react-native-community/cli init MyApp`,
          try: R`قول الإجابة بصوتك، وبعدين جاوب: «عايز تضيف SDK دفع من بنك محلي ملوش مكتبة RN، هتعمل إيه في مشروع Expo؟»`,
          deep: {
            why: R`سؤال شائع جدًا خصوصًا من ناس خبرتهم RN قديمة. الإجابة بتبين إنك متابع التغييرات (CNG، و development builds، و New Architecture) مش حافظ آراء من ٢٠٢٠.`,
            how: R`نقط أكتر: CNG (Continuous Native Generation) معناه الفولدرات الـ native ناتج مش مصدر، فترقية الـ SDK بقت أسهل بكتير. و Expo Modules API بيدّيك DSL بـ Swift و Kotlin لكتابة modules متوافقة مع الـ New Architecture من غير C++. و config plugin بيعدّل Gradle أو Info.plist أو AppDelegate وقت الـ prebuild. و [[npx expo prebuild]] لو عايز تشوف الفولدرات أو «تطلع» منها. وEAS اختياري: تقدر تعمل build بـ Gradle و Xcode عادي على مشروع Expo.`,
            when: R`أسئلة بتيجي بعدها: «إيه الفرق بين Expo Go والـ development build؟»، و «إيه الـ config plugin؟»، و «إزاي بتعمل upgrade لـ SDK؟» ([[npx expo install expo@latest]] و [[--fix]] وقراية الـ changelog و [[expo-doctor]] وتجربة على build)، و «EAS مجاني؟».`,
            mistakes: R`«Expo مينفعش معاه native code» (معلومة قديمة). و «Expo يعني Expo Go». و «bare أحسن في الأداء» (نفس RN ونفس الأداء). و «لازم EAS مع Expo».`
          },
          lines: [
            "مشروع Expo (الموصى بيه).",
            "مشروع RN من غير framework (نادرًا ما تحتاجه)."
          ],
          sol: R`SDK دفع ملوش مكتبة RN في مشروع Expo: (١) أكتب Expo Module صغير بـ Kotlin و Swift بيلف الـ SDK بتاع البنك ([[npx create-expo-module --local]])، ويعرض لـ JS دالة زي [[startPayment(amount)]]. (٢) لو الـ SDK محتاج إعدادات في Gradle أو Info.plist، أكتب config plugin (أو الـ module نفسه يجي بواحد). (٣) development build عشان أجرّب. مفيش حاجة من دي محتاجة أسيب Expo أو أعدّل في فولدر android بإيدي.`
        }
      ]
    }
]);
