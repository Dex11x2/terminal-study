// تكملة تاب rn: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/rn/01.js (شرح حقول الدرس في أوله)
MORE("rn", [
    {
      t: "Expo والبداية",
      l: 1,
      n: "تعمل مشروع بـ Expo، وتشغّله على موبايلك، وتفهم Expo Go والـ development build و app.json",
      items: [
        {
          cmd: "create-expo-app",
          title: "تعمل أول مشروع وتفهم الفولدرات بتاعته",
          desc: R`Expo هو الـ framework الموصى بيه رسميًا لـ React Native (زي ما Next.js بالنسبة لـ React على الويب). بيدّيك routing بالملفات (Expo Router)، ومكتبات جاهزة للكاميرا والموقع والتخزين، وأدوات build ونشر في السحابة (EAS).

[[npx create-expo-app@latest]] بيعمل مشروع TypeScript فيه Expo Router. الشاشات في [[src/app/]] (في القوالب الأقدم كانت [[app/]] في الجذر)، وكل ملف فيها شاشة. وإعدادات التطبيق (الاسم، والأيقونة، والصلاحيات) في [[app.json]].`,
          example: R`npx create-expo-app@latest rn-lab
cd rn-lab
npx expo start
# دوس a يفتح Android emulator، أو i لـ iOS simulator (ماك بس)، أو w للمتصفح
# أو امسح الـ QR code بتطبيق Expo Go على موبايلك
npm run reset-project`,
          try: R`اعمل المشروع وافتحه في VS Code. دوّر على: ملف الشاشة الرئيسية، والـ layout، و [[app.json]]. وبعدين شغّل [[npx expo start]] وافتحه على موبايلك بـ Expo Go (نفس شبكة الواي فاي)، وغيّر نص في الشاشة واحفظ: التغيير ظهر في كام ثانية؟`,
          deep: {
            why: R`من غير Expo، تعمل مشروع RN «bare» فيه فولدرات android و ios لازم تعرف تتعامل معاهم (Gradle و Xcode و CocoaPods) من أول يوم. Expo بيأجّل ده، وفي معظم المشاريع مش هتحتاجه أبدًا. والـ React Native team نفسه بيقول في الـ docs «استخدم framework زي Expo».`,
            how: R`القالب الافتراضي في SDK 57 بيعمل: [[src/app/_layout.tsx]] (الـ layout الجذر)، و [[src/app/index.tsx]] (الشاشة الرئيسية)، و [[src/components]] و [[src/hooks]] و [[src/constants]]، و [[assets/]] للصور والأيقونات، و [[tsconfig.json]] فيه alias [[@/*]] بيشاور على [[src/]]. و [[package.json]] فيه [["main": "expo-router/entry"]] يعني نقطة البداية هي الـ router.

[[npx expo start]] بيشغّل Metro (الـ bundler بتاع RN، زي Vite للويب). Metro بيحوّل الـ TS/JSX لـ JS bundle ويبعته للتطبيق، ومع كل حفظ بيبعت التغيير بس (Fast Refresh) والـ state بتفضل.

[[reset-project]] سكربت في القالب بيشيل الشاشات المثال ويسيبلك مشروع فاضي تبدأ منه. وفي القالب ملف [[AGENTS.md]] للأدوات زي Claude Code، بيقول «متثقش في ذاكرتك عن Expo، اقرا الـ docs بتاعة نسختك».

ملحوظة: أنا (كاتب الدرس) عملت المشروع ده فعلًا وشغّلت عليه typecheck و jest و [[expo export]]، بس مقدرتش أشغّله على موبايل أو emulator، فالخطوات بتاعة Expo Go من الـ docs.`,
            when: R`أي مشروع RN جديد. الحالة الوحيدة اللي ممكن تبدأ فيها من غير Expo: تطبيق native موجود عايز تضيف فيه شاشات RN (brownfield)، ودي حتى Expo بقى بيدعمها.`,
            mistakes: R`تعمل المشروع جوه مسار فيه مسافات أو حروف عربي: Metro و Gradle ساعات بيقعوا. والموبايل مش شايف الـ dev server: لازم يكون على نفس الشبكة، أو شغّل [[npx expo start --tunnel]]. وتحط شاشات أو components عادية جوه [[src/app/]]: أي ملف هناك بيبقى route، فحط الـ components برّه.`
          },
          teach: R`## الفكرة: ٤ أوامر، اتنين منهم مرة واحدة في عمر المشروع

[[create-expo-app]] بيعمل المشروع، و [[cd]] بيدخلك فيه، و [[expo start]] هتشغّله كل يوم، و [[reset-project]] بتشيل الشاشات المثال مرة واحدة. كله اتشغّل على ويندوز 11 بـ Node 24.19 و npm 11.17، وكان القالب [[expo-template-default@sdk-57]].

---

## ١. [[npx create-expo-app@latest rn-lab]]

| الحتة | معناها |
|---|---|
| [[npx]] | نزّل الباكدج وشغّلها من غير تسطيب global |
| [[create-expo-app]] | أداة Expo لعمل مشروع |
| [[@latest]] | آخر نسخة، عشان تاخد آخر SDK |
| [[rn-lab]] | اسم الفولدر والمشروع |

~~~text الناتج
Creating rn-lab using the expo-template-default@sdk-57 template.
✔ Downloaded and extracted project files.
> npm install
added 607 packages, and audited 608 packages in 1m

29 vulnerabilities (11 moderate, 18 high)

✅ Your project is ready!

To run your project, navigate to the directory and run one of the following npm commands.

- cd rn-lab
- npm run android
- npm run ios # you need to use macOS to build the iOS project - use the Expo app if you need to do iOS development without a Mac
- npm run web
~~~

- [[expo-template-default@sdk-57]]: القالب الافتراضي، بتاع SDK 57.
- [[npm install]]: نزّل ٦٠٧ باكدج لوحده، في دقيقة ونص تقريبًا.
- [[29 vulnerabilities]]: npm audit لاقي ثغرات معروفة في باكدجات بيعتمد عليها القالب (أغلبها أدوات وقت التطوير). **متعملش [[npm audit fix --force]]**: بيغيّر نسخ مكتبات native ويكسر المشروع (درس «npx expo install»).
- [[npm run ios]] جنبه ملاحظة: build لـ iOS محتاج ماك، ومن غير ماك تستخدم تطبيق Expo Go على الآيفون.

### الملفات اللي اتعملت

~~~text rn-lab
AGENTS.md              تعليمات لأدوات الـ AI: «Expo بيتغير، اقرا docs نسختك»
app.json               إعدادات التطبيق: الاسم والأيقونة والـ scheme والـ plugins
assets/images/         الأيقونات والـ splash
package.json           "main": "expo-router/entry" والـ scripts
scripts/reset-project.js
src/app/_layout.tsx    الـ layout الجذر (بيعمل tabs في القالب ده)
src/app/index.tsx      الشاشة الرئيسية = الـ route /
src/app/explore.tsx    شاشة تانية = /explore
src/components/        components عادية (برّه app/ عشان متبقاش routes)
src/hooks/  src/constants/
tsconfig.json          "@/*" -> "./src/*"
~~~

- كل ملف في [[src/app/]] شاشة، واسمه هو الـ URL بتاعها. ده Expo Router.
- [[@/*]] في [[tsconfig.json]]: اختصار، فتكتب [[import X from '@/components/X']] بدل [[../../components/X]].
- [[app.json]] مفيهوش [[newArchEnabled]] (درس New Architecture) وفيه [["scheme": "rnlab"]] للـ deep links.

---

## ٢. [[cd rn-lab]]

[[cd]] = change directory. لازم تبقى جوه الفولدر عشان الأوامر الجاية تلاقي [[package.json]].

---

## ٣. [[npx expo start]]

بيشغّل Metro، الـ bundler بتاع React Native: بيحوّل الـ TypeScript و JSX لملف JavaScript واحد (bundle) ويبعته للتطبيق.

~~~text الناتج
Starting project at C:\Users\ali\rn-lab
Using src/app as the root directory for Expo Router.
React Compiler enabled
Starting Metro Bundler

Waiting on http://localhost:5975

Logs for your project will appear below.
~~~

- [[Using src/app as the root directory]]: Expo Router لقى الشاشات في [[src/app]].
- [[React Compiler enabled]]: القالب مفعّل React Compiler في [[app.json]] ([[experiments.reactCompiler]])، بيعمل memo لوحده.
- [[Waiting on http://localhost:5975]]: إحنا شغّلناه بـ [[--port 5975]]، ومن غيره الافتراضي [[8081]].

### الـ QR والحروف (من الـ docs)

في ترمنال حقيقي (TTY) بيطبع كمان QR code وقايمة اختصارات. الناتج فوق من غيرهم لأنه اتشغّل في الخلفية. والاختصارات:

| الحرف | بيعمل إيه |
|---|---|
| [[a]] | يفتح على Android emulator أو موبايل موصّل (محتاج Android SDK) |
| [[i]] | iOS simulator (ماك بس) |
| [[w]] | يفتح نسخة الويب في المتصفح (ده اللي اتجرّب هنا) |
| [[r]] | reload للتطبيق |
| [[m]] | يفتح الـ dev menu |

والـ QR بتمسحه بكاميرا الآيفون أو من جوه Expo Go على Android، والموبايل لازم يبقى على نفس الواي فاي. مفيش موبايل هنا، فالجزء ده من الـ docs.

ولما تحفظ ملف، Metro بيبعت الملف اللي اتغير بس (Fast Refresh)، والـ state بتفضل زي ما هي. Ctrl+C يقفله.

---

## ٤. [[npm run reset-project]]

[[npm run X]] بيشغّل الـ script اللي اسمه X في [[package.json]]، وهنا [[node ./scripts/reset-project.js]]. بيسألك سؤال واحد:

~~~text الناتج
Do you want to move existing files to /example instead of deleting them? (Y/n): y
📁 /example directory created.
➡️ /src moved to /example/src.
➡️ /scripts moved to /example/scripts.

📁 New /src/app directory created.
📄 src/app/index.tsx created.
📄 src/app/_layout.tsx created.

✅ Project reset complete. Next steps:
1. Run $__btnpx expo start$__bt to start a development server.
2. Edit src/app/index.tsx to edit the main screen.
3. Put all your application code in /src, only screens and layout files should be in /src/app.
4. Delete the /example directory when you're done referencing it.
~~~

- [[(Y/n)]]: الحرف الكبير هو الافتراضي لو دوست Enter. [[y]] بينقل القديم لـ [[example/]] تتفرج عليه، و [[n]] بيمسحه.
- الملفين الجداد صغيرين جدًا:

~~~text src/app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
~~~

[[Stack]] navigator بيحط الشاشات فوق بعض (زي الرجوع في أي تطبيق). و [[index.tsx]] فيه [[View]] و [[Text]] بيقولك «Edit src/app/index.tsx to edit this screen.».

> [[example/]] موجود في [[.gitignore]] بتاع القالب، فمش هيترفع على git. امسحه لما تخلص منه، لأن [[tsconfig.json]] بيفحص كل ملفات [[.tsx]] في المشروع.

---

## الخلاصة

| الأمر | إمتى |
|---|---|
| [[npx create-expo-app@latest name]] | مرة، أول المشروع |
| [[npx expo start]] | كل يوم، وسيبه شغال |
| [[npm run reset-project]] | مرة، لو عايز تبدأ من صفحة بيضا |

والقاعدة الأهم: [[src/app/]] للشاشات بس، وأي component تاني برّه.`,
          lines: [
            "بيعمل مشروع Expo جديد بـ TypeScript و Expo Router.",
            "ادخل الفولدر.",
            "شغّل Metro (الـ dev server) وهيطبع QR code وقايمة اختصارات.",
            "بيشيل الشاشات المثال ويبدأك من مشروع نضيف."
          ],
          sol: R`هتلاقي [[src/app/index.tsx]] (الشاشة الرئيسية) و [[src/app/_layout.tsx]] (الـ layout اللي بيلف كل الشاشات، في القالب الحالي بيعمل tabs)، و [[app.json]] فيه [[name]] و [[slug]] و [[scheme]] و [[plugins]].

بعد الحفظ، التغيير المفروض يظهر في أقل من ثانيتين (Fast Refresh) من غير ما التطبيق يعيد التشغيل. لو Expo Go قال «Could not connect to development server»: اتأكد إن الموبايل والكمبيوتر على نفس الواي فاي، أو إن الـ firewall مش قافل البورت 8081، أو استخدم [[--tunnel]].`
        },
        {
          cmd: "Expo Go و development build",
          title: "Expo Go ولا development build: إمتى كل واحد؟",
          desc: R`Expo Go تطبيق جاهز من المتجر، جواه RN ومجموعة ثابتة من مكتبات Expo. بتفتح بيه مشروعك من غير build. سريع جدًا للتعلم، بس مينفعش تضيف مكتبة native مش جواه، ولا تغيّر اسم التطبيق أو الأيقونة أو الصلاحيات.

الـ development build هو «Expo Go بتاعك»: تطبيق بتعمله build لمشروعك انت (بكل مكتباته)، ومعاه [[expo-dev-client]] اللي بيوصله بـ Metro زي Expo Go. أي مشروع حقيقي بيوصل له بسرعة: push notifications على Android، أو مكتبة native بنسخة غير اللي جوه Expo Go (زي Reanimated)، أو إعداد في app.json.`,
          example: R`# Expo Go: مفيش build، امسح الـ QR وخلاص
npx expo start
# development build محلي (محتاج Android Studio أو Xcode)
npx expo install expo-dev-client
npx expo run:android
# أو في السحابة بـ EAS (مش محتاج Android Studio)
npx eas-cli@latest build --profile development --platform android
npx expo start --dev-client`,
          try: R`اكتب قايمة بـ ٣ حاجات مينفعش تعملها في Expo Go. وبعدين افتح صفحة المكتبة بتاعة [[expo-notifications]] في الـ docs وشوف مكتوب إيه عن Expo Go على Android.`,
          deep: {
            why: R`أشهر مطب للمبتدئين: يعملوا التطبيق كله على Expo Go، وأول ما يضيفوا مكتبة native أو push notifications يلاقوا «Cannot find native module» أو «not supported in Expo Go»، ويفتكروا المشروع باظ. الفكرة ببساطة: الكود الـ native لازم يكون متضمن في التطبيق اللي بتشغّله.`,
            how: R`Expo Go فيه نسخة واحدة من كل مكتبة Expo بتاعة SDK معين، وبيدعم الـ SDK الأخير بس (فلو مشروعك على SDK أقدم، Expo Go الجديد مش هيفتحه). JS بتاعك بيتحمّل فيه من Metro.

الـ development build: [[expo run:android]] بيعمل [[prebuild]] (يولّد فولدر android من app.json والـ plugins)، وبعدين Gradle يعمل APK debug ويركّبه على الـ emulator أو الموبايل. أو [[eas build --profile development]] بيعمل نفس الكلام على سيرفرات Expo ويديك رابط تنزّل منه. بعد كده انت بتشتغل عادي: [[npx expo start]] والتطبيق بيوصل بـ Metro، والتغييرات في JS بتظهر فورًا. بتعيد الـ build بس لما تضيف مكتبة native أو تغيّر إعداد native.

من SDK 53 الـ push notifications (remote) مش شغالة في Expo Go على Android، والـ local notifications شغالة. أي حاجة فيها config plugin (زي [[expo-secure-store]] بإعدادات Face ID) محتاجة build عشان الإعداد يتطبق.`,
            when: R`Expo Go: أول يوم، والتجارب، والدروس. development build: من أول ما المشروع يبقى حقيقي، وده غالبًا أول أسبوع. الـ docs نفسها بتقول «Expo Go للتعلم، و development builds للتطبيقات الحقيقية».`,
            mistakes: R`تضيف مكتبة native وتفضل تفتح بـ Expo Go. وتعيد الـ build كل ما تغيّر JS (مش محتاج، Metro بيبعته). وتنسى إن الـ development build مرتبط بالمكتبات الـ native وقت ما اتعمل: لو ضفت مكتبة جديدة لازم build جديد. و [[npx expo start]] من غير [[--dev-client]] ممكن يفتح Expo Go بدل الـ build بتاعك لو الاتنين متركبين.`
          },
          teach: R`## الفكرة: الكود الـ native لازم يكون جوه التطبيق اللي بتفتحه

تطبيق RN فيه جزئين: JavaScript بتاعك (بيتبعت من Metro وبيتغير كل ثانية)، وكود native (RN نفسه ومكتبات زي الكاميرا) متجمّع جوه ملف التطبيق. Expo Go تطبيق جاهز الجزء الـ native فيه ثابت. الـ development build تطبيق انت بتجمّعه، فالجزء الـ native فيه هو بتاع مشروعك. المثال ٣ طرق للتشغيل، هنفكهم بالترتيب.

> اتجرّب على ويندوز من غير Android SDK ولا موبايل: [[expo install]] و [[expo start]] اشتغلوا، و [[run:android]] وقف عند الـ SDK (الناتج تحت). خطوات Expo Go و EAS من الـ docs.

---

## ١. Expo Go: [[npx expo start]]

نفس أمر درس «create-expo-app». بيشغّل Metro ويطبع QR. تنزّل Expo Go من المتجر، وتمسح الـ QR، فـ Expo Go ينزّل الـ JS bundle من جهازك ويشغّله.

مفيش build ولا Android Studio. بس Expo Go بيدعم آخر SDK بس، وجواه مكتبات Expo بتاعة الـ SDK ده بس.

---

## ٢. [[npx expo install expo-dev-client]]

[[expo-dev-client]] مكتبة بتحط جوه تطبيقك الحاجات اللي بتخلّي Expo Go مفيد: شاشة تختار منها الـ dev server، وقايمة dev، والاتصال بـ Metro.

~~~text الناتج
› Installing 1 SDK 57.0.0 compatible native module using npm
~~~

و [[package.json]] اتضاف فيه [["expo-dev-client": "~57.0.19"]]. الـ [[~]] معناها «أي 57.0.x»، يعني تصليحات بس. ليه [[expo install]] مش [[npm install]]؟ في الدرس الجاي.

---

## ٣. [[npx expo run:android]]

بيعمل ٣ حاجات ورا بعض:

1. **prebuild**: يولّد فولدر [[android/]] من [[app.json]] والـ plugins.
2. **Gradle**: أداة البناء بتاعة Android، بتجمّع الكود الـ native وكودك في ملف APK.
3. يركّب الـ APK على emulator أو موبايل موصّل بـ USB، ويشغّل Metro.

على جهاز مفيهوش Android SDK:

~~~text الناتج
✔ Created native directory
- Updating package.json
✔ Updated package.json | no changes
- Running prebuild
✔ Finished prebuild
Failed to resolve the Android SDK path. Default install location not found: C:\Users\ali\AppData\Local\Android\Sdk. Use ANDROID_HOME to set the Android SDK location.
Error: 'adb' is not recognized as an internal or external command,
operable program or batch file.
~~~

- الـ prebuild نجح: فولدر [[android/]] اتعمل (من غير SDK).
- بعدها وقف: بيدوّر على الـ SDK في المكان الافتراضي، أو في متغير البيئة [[ANDROID_HOME]].
- [[adb]] (Android Debug Bridge): الأداة اللي بتكلّم الموبايل أو الـ emulator. جاية مع الـ SDK.

يعني الطريقة دي محتاجة Android Studio (فيه الـ SDK والـ emulator) و JDK. و [[run:ios]] محتاج ماك و Xcode.

> فولدر [[android/]] اللي اتعمل ده متعدّلش فيه، وهو في [[.gitignore]]. مسحته بعد التجربة.

---

## ٤. [[npx eas-cli@latest build --profile development --platform android]]

نفس اللي فات بس على سيرفرات Expo (من الـ docs، محتاج حساب Expo):

| الحتة | معناها |
|---|---|
| [[eas-cli@latest]] | أداة EAS (Expo Application Services)، آخر نسخة |
| [[build]] | اعمل build في السحابة |
| [[--profile development]] | الإعدادات من [[eas.json]] تحت [["development"]]: build فيه dev client |
| [[--platform android]] | Android بس (والتاني [[ios]] أو [[all]]) |

في الآخر بيديك لينك و QR تنزّل منه الـ APK على موبايلك. مش محتاج Android Studio خالص. تفاصيل [[eas.json]] في المستوى ٣.

---

## ٥. [[npx expo start --dev-client]]

نفس Metro، بس بيقول للـ QR والحروف «افتح الـ development build بتاعي مش Expo Go».

~~~text الناتج
Starting project at C:\Users\ali\rn-lab
Using src/app as the root directory for Expo Router.
Starting Metro Bundler

Waiting on http://localhost:5976

Logs for your project will appear below.
~~~

بعد كده الشغل عادي: تحفظ ملف JS والتغيير يظهر. بتعيد الـ build بس لما تضيف مكتبة native أو تغيّر إعداد native في [[app.json]].

---

## المقارنة

| | Expo Go | development build |
|---|---|---|
| بتجيبه منين | المتجر | انت بتعمله (محلي أو EAS) |
| المكتبات الـ native | الموجودة جواه بس | أي مكتبة في مشروعك |
| تغيير الاسم والأيقونة والصلاحيات | لأ | أيوه |
| remote push notifications على Android | لأ (من SDK 53) | أيوه |
| أول تشغيل | ثواني | build: دقايق |
| إمتى تعيد البناء | أبدًا | لما تضيف حاجة native بس |

---

## الخلاصة

Expo Go للتعلم والتجارب. أول ما تحتاج مكتبة native مش جواه، أو إعداد native، اعمل development build مرة: [[expo install expo-dev-client]]، وبعدين [[run:android]] (لو عندك SDK) أو [[eas build --profile development]]، وكمّل شغل عادي بـ [[expo start --dev-client]].`,
          lines: [
            "Metro، وتفتح بـ Expo Go.",
            R`ضيف [[expo-dev-client]]: ده اللي بيخلي الـ build يوصل بـ Metro ويبقى فيه قايمة dev.`,
            R`build محلي: [[prebuild]] وبعدين Gradle، ويركّب على الـ emulator. محتاج Android SDK و JDK.`,
            R`نفس الكلام على سيرفرات EAS، وتنزّل الـ APK على موبايلك من رابط. محتاج حساب Expo.`,
            "شغّل Metro والتطبيق الـ dev build بتاعك يوصله."
          ],
          sol: R`٣ حاجات مينفعش في Expo Go: (١) أي مكتبة native مش جوه Expo Go (مثلًا مكتبة دفع أو خرائط بإعدادات خاصة، أو نسخة مختلفة من مكتبة موجودة). (٢) تغيير حاجة native في app.json زي اسم الـ package أو الأيقونة أو صلاحيات Android/iOS الإضافية أو config plugins. (٣) الـ push notifications على Android (من SDK 53).

وصفحة expo-notifications مكتوب فيها: الـ push notifications مش متاحة في Expo Go على Android من SDK 53، ومحتاج development build، والـ local notifications لسه شغالة.`
        },
        {
          cmd: "npx expo install",
          title: "ليه تركّب المكتبات بـ npx expo install مش npm install؟",
          desc: R`كل Expo SDK متجرّب مع نسخ معينة من المكتبات (Reanimated و gesture-handler و async-storage، وكمان مكتبات JS زي FlashList). [[npx expo install pkg]] بيختار النسخة المتوافقة مع الـ SDK بتاعك ويركّبها بالـ package manager بتاعك. [[npm install pkg]] بيجيب آخر نسخة، وممكن تبقى مش متوافقة وتوقع التطبيق.

للمكتبات الـ JS البحتة (zod، react-hook-form، TanStack Query) الاتنين زي بعض، بس خليها عادة: كل حاجة بـ [[expo install]].`,
          example: R`npx expo install @tanstack/react-query expo-secure-store expo-sqlite
npx expo install --dev jest-expo jest @testing-library/react-native @types/jest
npx expo install --check
npx expo install --fix
npx expo-doctor`,
          try: R`في الـ lab ركّب [[@shopify/flash-list]] مرة بـ [[npx expo install]] وشوف النسخة في package.json، وبعدين قارنها بـ [[npm view @shopify/flash-list version]]. نفس الرقم؟`,
          deep: {
            why: R`المكتبة الـ native فيها كود Kotlin و Swift متكتب لنسخة RN معينة. لو النسخة مش متوافقة، الـ build بيقع أو الأسوأ: التطبيق بيشتغل ويقع عند المستخدم لما يفتح الشاشة دي. [[expo install]] بيشيل عنك التخمين.`,
            how: R`[[expo]] نفسه فيه ملف [[bundledNativeModules.json]] فيه النطاق المسموح لكل مكتبة معروفة في الـ SDK ده. [[expo install]] بيقراه (وبيسأل API بتاع Expo لو فيه نت) ويركّب النسخة المناسبة. المكتبات اللي مش في القايمة بتتركّب بآخر نسخة عادي.

[[--dev]]: يحطهم في devDependencies. وأي حاجة بعد [[--]] بتتبعت للـ package manager زي ما هي، بس [[-- --save-dev]] مش بديل مضمون لـ [[--dev]]: في SDK 57 المكتبات اللي Expo بيحدد نسختها (jest-expo و jest و @types/jest) راحت dependencies، و @testing-library/react-native بس راح devDependencies (اتجرّب).

[[--check]] بيقولك مين مش متوافق، و [[--fix]] بيصلّحهم. ودول أهم أمرين بعد ترقية الـ SDK ([[npx expo install expo@latest]] وبعدين [[--fix]]).

و [[expo install]] بيضيف الـ config plugin للمكتبة في [[app.json]] لو ليها واحد (زي [[expo-secure-store]] و [[expo-sqlite]] و [[expo-localization]]).

ملحوظة من الـ lab: لما جربت، [[npx expo install @shopify/flash-list]] ركّب 2.0.2 مع إن آخر نسخة على npm كانت 2.3.x، وده بالظبط الهدف: النسخة اللي Expo متأكد منها للـ SDK ده.`,
            when: R`دايمًا في مشروع Expo. وبعد أي ترقية SDK، أو لما [[expo-doctor]] يشتكي.`,
            mistakes: R`[[npm i react-native-reanimated@latest]] في مشروع Expo، وبعدين crash مش مفهوم. وتكتب [[-- --save-dev]] بدل [[--dev]] فنص المكتبات يروح dependencies. وتعمل [[npm audit fix --force]] على مشروع Expo: بيغيّر نسخ مكتبات native لنسخ مش متوافقة ويكسر المشروع.`
          },
          teach: R`## الفكرة: Expo بيختار النسخة، وبعدين npm بيركّب

[[npx expo install]] مش package manager جديد. هو بيسأل «النسخة الصح من المكتبة دي للـ SDK بتاعي كام؟»، وبعدين بينادي npm (أو yarn أو pnpm أو bun، حسب ملف الـ lock اللي في المشروع) بالنسخة دي. كل الأوامر اتشغّلت على مشروع Expo SDK 57 على ويندوز بـ Node 24.

---

## ١. [[npx expo install @tanstack/react-query expo-secure-store expo-sqlite]]

٣ مكتبات في أمر واحد، مفصولين بمسافة:

~~~text الناتج (آخره)
added 5 packages, and audited 613 packages in 13s
› Added config plugins: expo-secure-store, expo-sqlite
~~~

وده اللي اتكتب في [[package.json]]:

~~~text package.json
"@tanstack/react-query": "^5.104.1",
"expo-secure-store": "~57.0.4",
"expo-sqlite": "~57.0.4",
~~~

### ليه [[^]] مرة و [[~]] مرة؟

| الرمز | معناه | مين |
|---|---|---|
| [[~57.0.4]] | أي 57.0.x من 57.0.4 وطالع (تصليحات بس) | مكتبات Expo، النسخة جاية من جدول الـ SDK |
| [[^5.104.1]] | أي 5.x.x من 5.104.1 وطالع | TanStack Query: مكتبة JS مش في الجدول، فاتركّبت آخر نسخة عادي |

### [[Added config plugins]]

expo-secure-store و expo-sqlite ليهم config plugin، فالأمر ضافهم في [[app.json]] لوحده:

~~~text app.json (الفرق)
       ],
+      "expo-secure-store",
+      "expo-sqlite"
     ],
~~~

لما شغّلت نفس الأمر تاني قال [[up to date]]، يعني الأمر آمن تكرره.

---

## ٢. [[npx expo install --dev jest-expo jest @testing-library/react-native @types/jest]]

[[--dev]] بيحطهم في [[devDependencies]]: باكدجات للتطوير والاختبار بس، مش جوه التطبيق.

~~~text الناتج
› Installing 3 SDK 57.0.0 compatible native modules and 1 other package using npm
> npm install --save-dev @testing-library/react-native
~~~

~~~text package.json
"devDependencies": {
  "@testing-library/react-native": "^14.0.1",
  "@types/jest": "29.5.14",
  "@types/react": "~19.2.2",
  "jest": "~29.7.0",
  "jest-expo": "~57.0.5",
  "typescript": "~6.0.3"
},
~~~

- [[3 SDK 57.0.0 compatible ...]]: التلاتة اللي Expo عارف نسختهم (jest-expo و jest و @types/jest). الكلمة «native modules» في الرسالة معناها هنا «باكدجات في جدول الـ SDK».
- [[1 other package]]: @testing-library/react-native مش في الجدول، فاتركّبت آخر نسخة.

### ليه [[--dev]] مش [[-- --save-dev]]؟

[[--]] معناها «اللي بعدي يروح لـ npm زي ما هو». فممكن تفتكر إن [[-- --save-dev]] هيعمل نفس الحاجة. جربتها على نفس المشروع:

~~~text package.json بعد -- --save-dev
"dependencies": {
  "@types/jest": "29.5.14",
  "jest": "~29.7.0",
  "jest-expo": "~57.0.5",
  ...
"devDependencies": {
  "@testing-library/react-native": "^14.0.1",
~~~

التلاتة اللي Expo حدد نسختهم راحوا [[dependencies]] غلط. فاستخدم [[--dev]] بتاع Expo نفسه (مكتوب في [[npx expo install --help]]: «Save the dependencies as devDependencies»).

---

## ٣. [[npx expo install --check]]

بيقارن كل اللي في [[package.json]] بجدول الـ SDK. في المشروع النضيف:

~~~text الناتج
Dependencies are up to date
~~~

عشان أشوفه بيشتكي، ركّبت FlashList غلط بـ [[npm i @shopify/flash-list@latest]] وشغّلته تاني:

~~~text الناتج
The following packages should be updated for best compatibility with the installed expo version:
  @shopify/flash-list@2.3.3 - expected version: 2.0.2
Your project may not work correctly until you install the expected versions of the packages.
Found outdated dependencies
~~~

و exit code بتاعه 1 (فشل)، فينفع تحطه في CI يوقف الـ build.

---

## ٤. [[npx expo install --fix]]

نفس الفحص، بس بيصلّح:

~~~text الناتج
› Installing 1 SDK 57.0.0 compatible native module using npm
> npm install
~~~

و [[package.json]] رجع [["@shopify/flash-list": "2.0.2"]]. ده أهم أمر بعد ترقية الـ SDK.

---

## ٥. [[npx expo-doctor]]

فحص أشمل (٢١ فحص). مع نفس FlashList الغلط:

~~~text الناتج
✖ Check that packages match versions required by installed Expo SDK

⚠️ Minor version mismatches
package              expected  found
@shopify/flash-list  2.0.2     2.3.3

1 package out of date.
Advice:
Use 'npx expo install --check' to review and upgrade your dependencies.
To ignore specific packages, add them to "expo.install.exclude" in package.json.
~~~

[[Minor version mismatches]]: الفرق في الرقم التاني (2.**0** و 2.**3**). و [[expo.install.exclude]] لو انت قاصد نسخة تانية ومش عايز تحذير.

---

## ٦. التجربة: [[expo install]] ضد [[npm view]]

~~~text الناتج
npx expo install @shopify/flash-list   ->  "@shopify/flash-list": "2.0.2"
npm view @shopify/flash-list version   ->  2.3.3
~~~

[[npm view X version]] بيقولك آخر نسخة منشورة على npm. الفرق مقصود: Expo اختبر 2.0.2 مع RN 0.86. والجدول ده موجود جوه المشروع في [[node_modules/expo/bundledNativeModules.json]]، وفيه مثلًا [["@shopify/flash-list": "2.0.2"]].

ولو مفيش نت، [[EXPO_OFFLINE=1]] بيخليه يستخدم الجدول اللي جوه بس:

~~~text الناتج (EXPO_OFFLINE=1 npx expo install --check)
Dependency validation is unreliable in offline-mode
Dependencies are up to date
~~~

> [[EXPO_OFFLINE=1 npx ...]] بالشكل ده bash (أو Git Bash). في PowerShell: [[$env:EXPO_OFFLINE=1; npx expo install --check]].

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[npx expo install pkg]] | يركّب النسخة المتوافقة، ويضيف الـ plugin لو موجود |
| [[npx expo install --dev pkg]] | نفس الكلام في devDependencies |
| [[npx expo install --check]] | يقولك مين مش متوافق (ويفشل لو فيه) |
| [[npx expo install --fix]] | يصلّحهم |
| [[npx expo-doctor]] | فحص المشروع كله |

ومتعملش [[npm audit fix --force]] في مشروع Expo، ده بيعمل عكس [[--fix]] بالظبط.`,
          lines: [
            "يركّب ٣ مكتبات بالنسخ المتوافقة مع الـ SDK، ويضيف plugins بتاعتهم في app.json.",
            R`أدوات الاختبار كـ devDependencies بـ [[--dev]].`,
            "يقولك مين نسخته مش متوافقة.",
            "يصلّحهم.",
            "فحص أشمل للمشروع."
          ],
          sol: R`هتلاقي نسخة أقدم من آخر نسخة على npm في الغالب. في تجربتي على SDK 57: [[expo install]] حط [["@shopify/flash-list": "2.0.2"]]، و [[npm view]] قال 2.3.x. ده مقصود: Expo اختبر 2.0.x مع RN 0.86.

لو لقيتهم نفس الرقم، ده معناه إن آخر نسخة هي نفسها المتوافقة. ولو [[expo install]] وقع برسالة شبكة، شغّله بـ [[EXPO_OFFLINE=1]] وهيستخدم الجدول اللي جوه الـ SDK من غير ما يسأل السيرفر.`
        },
        {
          cmd: "app.json و prebuild",
          title: "app.json والـ config plugins و prebuild: فين الإعدادات الـ native؟",
          desc: R`في مشروع Expo مفيش فولدر [[android]] و [[ios]] بتعدّل فيه بإيدك. كل الإعدادات (اسم التطبيق، و package name، والأيقونة، والصلاحيات، والـ scheme للـ deep links) بتتكتب في [[app.json]] أو [[app.config.ts]]، و [[npx expo prebuild]] بيولّد الفولدرات دي منها. الفكرة اسمها Continuous Native Generation (CNG).

الـ config plugin دالة بتعدّل على الملفات الـ native وقت الـ prebuild: [[expo-camera]] مثلًا بيضيف رسالة إذن الكاميرا في Info.plist والصلاحية في AndroidManifest.`,
          example: R`// app.config.ts
import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Tasks',
  slug: 'tasks',
  scheme: 'tasks',
  version: '1.0.0',
  android: { package: 'com.example.tasks' },
  ios: { bundleIdentifier: 'com.example.tasks' },
  plugins: [
    'expo-router',
    'expo-secure-store',
    ['expo-image-picker', { photosPermission: 'التطبيق محتاج صورك عشان تغيّر صورة البروفايل.' }],
  ],
  extra: { apiUrl: process.env.EXPO_PUBLIC_API_URL },
};

export default config;`,
          try: R`حوّل [[app.json]] في الـ lab لـ [[app.config.ts]] زي المثال، وشغّل [[npx expo config --type public]] وشوف الناتج النهائي. وبعدين (لو عندك مساحة) جرّب [[npx expo prebuild --platform android]] ودوّر في [[android/app/src/main/AndroidManifest.xml]] على الصلاحيات اللي اتضافت.`,
          flag: "script",
          deep: {
            why: R`لو عدّلت في فولدر android بإيدك، أول ما ترقّي الـ SDK أو تعمل prebuild تاني التعديل بيضيع، أو بيبقى عندك ملفات native لازم تصونها لوحدك مع كل ترقية. CNG بيخلي مصدر الحقيقة ملف واحد صغير تقدر تراجعه في PR.`,
            how: R`[[app.config.ts]] بيتقري وقت الـ build والـ start (مش جوه التطبيق)، فتقدر تقرا [[process.env]] وتعمل منطق (مثلًا اسم مختلف لنسخة الـ staging). الناتج بيبقى متاح في التطبيق من [[expo-constants]] ([[Constants.expoConfig]]).

[[npx expo prebuild]] بياخد قالب android/ios للـ SDK بتاعك، ويطبّق الإعدادات، ويشغّل الـ plugins بالترتيب. من SDK 57 [[prebuild]] بيمسح الفولدرات ويولّدها من جديد افتراضيًا، فأي تعديل يدوي بيروح. عشان كده الـ template بيحط [[/android]] و [[/ios]] في [[.gitignore]].

لو محتاج تعديل native مش موجود في أي plugin، تكتب plugin صغير بنفسك ([[withAndroidManifest]] و [[withInfoPlist]] من [[expo/config-plugins]]) بدل ما تعدّل الملف.

[[EXPO_PUBLIC_*]] متغيرات بتتحط جوه الـ JS bundle وقت الـ build، فمتحطش فيها أسرار (تفاصيل في درس الـ env في المستوى ٣).`,
            when: R`أي تغيير native: صلاحيات، أو اسم، أو أيقونة، أو splash، أو deep link scheme. وابدأ بـ app.json، وحوّل لـ app.config.ts لما تحتاج منطق أو env.`,
            mistakes: R`تعدّل AndroidManifest.xml بإيدك وبعدين prebuild يمسحه. وتغيّر [[android.package]] أو [[ios.bundleIdentifier]] بعد ما التطبيق اترفع على المتجر: ده تطبيق جديد بالنسبة للمتجر. وتحط API key سري في [[extra]] أو [[EXPO_PUBLIC_]]: أي حد يفك الـ APK هيشوفه. وتضيف plugin ومتعملش build جديد فتستغرب إن الإعداد مش شغال.`
          },
          teach: R`## الفكرة: ملف واحد صغير، ومنه بيتولّد مشروع Android و iOS

بدل ما تعدّل في ملفات Android (XML و Gradle) و iOS (plist و Xcode) بإيدك، بتكتب الإعدادات في ملف واحد، و [[npx expo prebuild]] بيولّد منه الفولدرات. المثال نفس [[app.json]] بس مكتوب TypeScript ([[app.config.ts]])، عشان تقدر تقرا متغيرات بيئة وتكتب منطق.

> اتجرّب على مشروع Expo SDK 57 على ويندوز: [[expo config]] و [[prebuild --platform android]] اشتغلوا. iOS من الـ docs (الناتج تحت).

---

## ١. [[// app.config.ts]] و [[import type { ExpoConfig } from 'expo/config';]]

- السطر الأول تعليق بيقولك اسم الملف. مكانه جذر المشروع جنب [[package.json]].
- [[import type]]: بنستورد **نوع** بس، مش كود. TypeScript بيستخدمه للفحص وبيشيله خالص من الناتج.
- [[ExpoConfig]]: النوع اللي فيه كل الإعدادات المسموحة. فايدته إن المحرر يكمّلك، ولو كتبت اسم غلط (زي [[nmae]]) يطلّع خطأ.
- [[expo/config]]: جزء من باكدج expo نفسها.

---

## ٢. [[const config: ExpoConfig = {]]

[[const config]] متغير اسمه config، و [[: ExpoConfig]] بعده معناها «نوعه ExpoConfig». والـ [[{]] بداية object الإعدادات.

### الهوية

| السطر | معناه |
|---|---|
| [[name: 'Tasks']] | الاسم اللي تحت الأيقونة على الموبايل |
| [[slug: 'tasks']] | اسم المشروع عند Expo (في روابط EAS). حروف صغيرة وشرطات |
| [[scheme: 'tasks']] | للـ deep links: لينك زي [[tasks://profile]] بيفتح التطبيق |
| [[version: '1.0.0']] | النسخة اللي المستخدم بيشوفها في المتجر |

### المعرّف لكل نظام

- [[android: { package: 'com.example.tasks' }]]: الـ package name. اسم فريد على Google Play بشكل domain مقلوب (example.com يبقى com.example). **مينفعش يتغير بعد النشر**: لو اتغير، المتجر يعتبره تطبيق تاني.
- [[ios: { bundleIdentifier: 'com.example.tasks' }]]: نفس الفكرة على App Store.

### [[plugins]]

قايمة config plugins، وكل واحد بيعدّل الملفات الـ native وقت الـ prebuild. فيه شكلين:

| الشكل | مثال | معناه |
|---|---|---|
| string | [['expo-router']] و [['expo-secure-store']] | شغّل الـ plugin بإعداداته الافتراضية |
| array من عنصرين | سطر [[expo-image-picker]] في المثال | اسم الـ plugin، وبعده object إعدادات |

[[photosPermission]] هي الرسالة اللي iOS بيعرضها لما التطبيق يطلب الصور. ولازم المكتبة تكون متسطبة ([[npx expo install expo-image-picker]]) وإلا [[expo config]] بيقع. جربت أضيف [[expo-camera]] وهو مش متسطب:

~~~text الناتج
PluginError: Failed to resolve plugin for module "expo-camera" relative to "C:\Users\ali\rn-lab". Do you have node modules installed?
~~~

### [[extra: { apiUrl: process.env.EXPO_PUBLIC_API_URL }]]

- [[extra]]: أي قيم انت عايزها، بتوصل للتطبيق من [[Constants.expoConfig.extra]] (باكدج [[expo-constants]]).
- [[process.env.X]]: متغير البيئة X وقت ما الملف بيتقري. الملف ده بيتنفذ على جهازك وقت [[start]] و [[build]]، مش على الموبايل.
- [[EXPO_PUBLIC_]] في أول الاسم: Expo بيحط المتغيرات دي جوه الـ JS bundle، يعني أي حد يفك التطبيق يشوفها. فمفيش أسرار هنا.

---

## ٣. [[export default config;]]

Expo بيقرا الحاجة اللي الملف بيصدّرها [[default]]. من غيرها مفيش إعدادات.

> لما [[app.config.ts]] بيصدّر object زي هنا، هو اللي بيكسب، و [[app.json]] اللي جنبه مش بيتقري. لو عايز تبني فوق [[app.json]]، صدّر دالة بتاخد [[{ config }]] وترجّع [[{ ...config, name: '...' }]].

---

## ٤. التجربة: [[npx expo config --type public]]

بيشغّل الملف ويطبع الإعدادات النهائية. [[--type public]] يعني الإعدادات اللي بتتبعت للتطبيق (من غير الحاجات الداخلية):

~~~text الناتج (مختصر)
{
  name: 'Tasks',
  slug: 'tasks',
  scheme: 'tasks',
  version: '1.0.0',
  plugins: [
    'expo-router',
    'expo-secure-store',
    [
      'expo-image-picker',
      {
        photosPermission: 'التطبيق محتاج صورك عشان تغيّر صورة البروفايل.'
      }
    ]
  ],
  sdkVersion: '57.0.0',
  platforms: [ 'ios', 'android', 'web' ],
  android: {
    package: 'com.example.tasks',
    permissions: [ 'android.permission.RECORD_AUDIO' ]
  },
  ios: { bundleIdentifier: 'com.example.tasks' },
  extra: { apiUrl: undefined, router: {} }
}
~~~

- [[sdkVersion]] و [[platforms]]: Expo ضافهم لوحده.
- [[permissions: RECORD_AUDIO]]: plugin الـ image picker ضافها (عشان تصوير فيديو بصوت). انت مكتبتهاش.
- [[apiUrl: undefined]]: المتغير مش متعرّف. ومع [[EXPO_PUBLIC_API_URL=https://api.example.com npx expo config --type public]] (bash):

~~~text الناتج
  extra: {
    apiUrl: 'https://api.example.com',
    router: {}
~~~

- [[router: {}]]: plugin الـ expo-router ضاف مكانه في [[extra]].

---

## ٥. [[npx expo prebuild --platform android]]

~~~text الناتج
- Creating native directory (./android)
✔ Created native directory
- Updating package.json
✔ Updated package.json
- Running prebuild
✔ Finished prebuild
~~~

ودوّرت في اللي اتولّد:

~~~text android/app/src/main/AndroidManifest.xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" .../>
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
<uses-permission android:name="android.permission.VIBRATE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="32" .../>
<data android:scheme="tasks"/>
~~~

~~~text android/app/build.gradle
namespace 'com.example.tasks'
applicationId 'com.example.tasks'
versionName "1.0.0"
~~~

- كل سطر في [[app.config.ts]] ليه مكان هنا: [[scheme]] بقى [[android:scheme="tasks"]]، و [[package]] بقى [[applicationId]]، و [[version]] بقى [[versionName]].
- [[maxSdkVersion="32"]]: الصلاحية دي مطلوبة على Android 12L وأقدم بس.
- [[Updated package.json]]: غيّر [["android": "expo start --android"]] لـ [["android": "expo run:android"]]، لأن فيه فولدر native دلوقتي.

وعلى ويندوز، [[--platform ios]] مش بيولّد حاجة:

~~~text الناتج
⚠️  Skipping generating the iOS native project files. Run npx expo prebuild again from macOS or Linux to generate the iOS project.
~~~

بعد ما بصيت، مسحت [[android/]]. هو في [[.gitignore]] أصلًا، و [[prebuild]] بيمسحه ويولّده من جديد كل مرة (إلا لو [[--no-clean]])، فأي تعديل يدوي فيه بيضيع.

---

## الخلاصة

| عايز | بتكتب فين |
|---|---|
| اسم، أيقونة، نسخة، scheme | [[app.json]] أو [[app.config.ts]] |
| صلاحيات ورسايلها | الـ plugin بتاع المكتبة (أو [[android.permissions]]) |
| قيمة من env | [[app.config.ts]] + [[process.env]]، ومن غير أسرار |
| تعديل native مش موجود في أي plugin | plugin صغير بتكتبه، مش تعديل في [[android/]] |

[[npx expo config]] بيوريك اللي هيتطبق فعلًا، و [[prebuild]] بيحوّله لملفات native.`,
          lines: [
            "نوع الإعدادات من expo، فالمحرر هيكمّلك.",
            "object فيه كل إعدادات التطبيق.",
            "الاسم اللي تحت الأيقونة.",
            "معرّف المشروع عند Expo.",
            R`للـ deep links: [[tasks://...]] بيفتح التطبيق.`,
            R`النسخة اللي المستخدم بيشوفها (versionName على Android و CFBundleShortVersionString على iOS).`,
            "الـ package name، ومينفعش يتغير بعد النشر.",
            "نفس الفكرة لـ iOS.",
            "الـ config plugins.",
            "الـ router plugin.",
            "plugin بتاع التخزين الآمن.",
            "plugin بإعداد: رسالة الإذن اللي بتظهر للمستخدم على iOS.",
            "قفلة.",
            R`قيم إضافية بتوصل للتطبيق عن طريق [[Constants.expoConfig.extra]].`,
            "قفلة.",
            "لازم export default."
          ],
          sol: R`[[npx expo config --type public]] بيطبع الإعدادات النهائية بعد ما الملف اتنفذ: هتلاقي [[name: 'Tasks']] والـ plugins، و [[extra.apiUrl]] بالقيمة اللي في الـ env (أو undefined لو مش متعرّفة).

بعد [[prebuild]] هتلاقي في AndroidManifest صلاحيات اتضافت من plugin الـ image picker: في تجربتي على SDK 57 كانت [[android.permission.RECORD_AUDIO]] (عشان تصوير الفيديو بصوت) و [[READ_EXTERNAL_STORAGE]] و [[WRITE_EXTERNAL_STORAGE]] بـ [[maxSdkVersion="32"]]، و [[applicationId 'com.example.tasks']] في [[android/app/build.gradle]]. وفي [[ios/*/Info.plist]] (من الـ docs: على ويندوز [[prebuild --platform ios]] بيقول «Skipping generating the iOS native project files. Run npx expo prebuild again from macOS or Linux») مفتاح [[NSPhotoLibraryUsageDescription]] بالرسالة العربي. متعدّلش حاجة هناك: امسح الفولدرات بعد ما تبص ([[rm -rf android ios]]).`
        }
      ]
    }
]);
