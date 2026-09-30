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
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("rn", {
  label: "React Native و Expo",
  prompt: "$ ",
  lab: R`npx create-expo-app@latest rn-lab
cd rn-lab
npx expo start`,
  labText: "مشروع Expo بـ TypeScript و Expo Router. افتحه على موبايلك بـ Expo Go، أو اعمل development build لما تضيف مكتبات native. الاختبارات بـ jest-expo و React Native Testing Library بتشتغل من غير موبايل.",
  levels: {"1":["الأساس","RN بيفرق عن الويب في إيه، و Expo، والـ core components، والستايل و flexbox"],"2":["تطبيقات حقيقية","Expo Router، و TanStack Query، والفورمات، والتخزين، والـ backend بالتوكن، والصلاحيات وأجهزة الموبايل، والعربي و RTL"],"3":["الإنتاج والانترفيو","الأداء، والاختبارات، و EAS Build و Submit و Update، وأسئلة الانترفيو"]},
  categories: [
    {
      t: "React Native بيعمل إيه",
      l: 1,
      n: "نفس React اللي تعرفه، بس بدل الـ DOM بيرسم views حقيقية بتاعة Android و iOS",
      items: [
        {
          cmd: "RN مش ويب",
          title: "React Native إيه، وإيه اللي بيفرق عن React في المتصفح؟",
          desc: R`React Native هو React نفسه: components و props و state و hooks، وكل اللي اتعلمته في «تاب React» شغال زي ما هو. الفرق في «فين بيترسم»: React في المتصفح بيعمل عناصر DOM ([[div]] و [[span]])، و React Native بيعمل views حقيقية بتاعة النظام: [[View]] بتبقى [[android.view.View]] على Android و [[UIView]] على iOS، و [[Text]] بتبقى TextView أو UILabel.

يعني مفيش HTML ولا CSS ولا [[document]] ولا [[window.localStorage]]. فيه components جاهزة من [[react-native]] ([[View]] و [[Text]] و [[Image]] و [[Pressable]] و [[TextInput]])، وستايل بـ JavaScript objects شبه CSS، وكل حاجة flexbox. والكود بتاعك (JS/TS) بيشتغل على محرك اسمه Hermes جوه التطبيق، مش في متصفح.`,
          example: R`import { Text, View } from 'react-native';

export default function Hello() {
  return (
    <View style={{ padding: 16, backgroundColor: '#eef2ff' }}>
      <Text style={{ fontSize: 20 }}>أهلا من React Native</Text>
    </View>
  );
}`,
          try: R`قارن الكومبوننت ده بنفسه في React للويب: اكتب نسخة الويب بـ [[div]] و [[p]] و [[className]]. وبعدين جرّب في الذهن (أو في مشروع الـ lab لما نعمله) تكتب نص مباشرة جوه [[View]] من غير [[Text]]: إيه اللي هيحصل؟`,
          flag: "script",
          deep: {
            why: R`عشان تكتب تطبيق موبايل حقيقي (من الـ Play Store والـ App Store، مش موقع في WebView) بنفس المهارات اللي عندك في React و TypeScript، وبكود واحد للنظامين. الشركات بتحبه لأن فريق الويب يقدر يشتغل على الموبايل، ولأن فيه منطق مشترك كتير (الـ API client، والـ validation بـ Zod، والـ types) بين الموقع والتطبيق.`,
            how: R`التطبيق فيه جزئين: كود native (Kotlin/Java و Swift/Objective-C) فيه RN نفسه والمكتبات، وملف JS bundle فيه كودك. لما التطبيق يفتح، Hermes بيشغّل الـ bundle. React بيحسب شجرة الـ components زي الويب بالظبط، بس الـ renderer بتاع RN (اسمه Fabric) بيحوّلها لـ native views بدل DOM nodes. والـ layout بيتحسب بمكتبة اسمها Yoga بتطبّق flexbox على الـ native views.

عشان كده: مفيش CSS cascade (الستايل مش بيتورّث غير جوه [[Text]] المتداخل)، ومفيش selectors، والوحدات أرقام من غير px (اسمها density-independent pixels، يعني نفس الحجم تقريبًا على الشاشات المختلفة). والأحداث مش [[onClick]]، دي [[onPress]].

وكل الأدوات بتاعة JS شغالة: [[fetch]] و [[Promise]] و [[setTimeout]] و [[Intl]] موجودين. اللي مش موجود هو أي حاجة ليها علاقة بالمتصفح: [[document]] و [[window.location]] و [[localStorage]] و [[FormData]] بتاع الـ DOM بشكله الكامل. ولأي API من الجهاز (كاميرا، موقع، تخزين آمن) بتستخدم مكتبة native.`,
            when: R`لما عايز تطبيق موبايل حقيقي والفريق بيعرف React. لو المطلوب موقع يشتغل كويس على الموبايل وخلاص، PWA أو موقع responsive أرخص بكتير. ولو عندك موقع وعايز تحطه في Play Store بسرعة، Capacitor في «تاب Desktop و Mobile» بيلف الموقع في WebView.`,
            mistakes: R`تفتكر إنه «موقع جوه تطبيق» (ده Capacitor/Cordova، مش RN). وتكتب نص برا [[Text]]: خطأ «Text strings must be rendered within a <Text> component». وتستخدم مكتبة React للويب بتلمس الـ DOM (مكتبة UI أو charts مبنية على div و SVG في الـ DOM) وتستغرب إنها مش شغالة: المكتبة لازم تكون مكتوبة لـ React Native. وفي الانترفيو: «RN بيحوّل كودك لـ native code؟» لأ، كودك بيفضل JS بيشتغل على Hermes، واللي native هو الـ views والمكتبات.`
          },
          lines: [
            R`بتستورد الـ components من [[react-native]]، مش من HTML.`,
            "component عادي زي React بالظبط.",
            "بيرجّع JSX.",
            R`[[View]] زي [[div]]: صندوق للـ layout. الستايل object، والأرقام من غير px.`,
            R`أي نص لازم يبقى جوه [[Text]].`,
            "قفلة الـ View.",
            "قفلة الـ return.",
            "قفلة الدالة."
          ],
          sol: R`نسخة الويب: [[<div style={{ padding: 16, backgroundColor: '#eef2ff' }}><p style={{ fontSize: 20 }}>...</p></div>]] أو بـ [[className]] و CSS. الفرق: في RN مفيش [[className]] ولا ملف CSS، والستايل دايمًا object، و [[p]] بقى [[Text]].

ولو كتبت نص مباشرة جوه [[View]] (زي [[<View>أهلا</View>]]) التطبيق بيقع بـ «Text strings must be rendered within a <Text> component». في الويب ده عادي لأن أي عنصر ممكن يبقى جواه نص، في RN النص ليه component مخصوص لأن الـ native view العادي مبيعرفش يرسم نص.`,
          solCode: R`// نسخة الويب
export default function Hello() {
  return (
    <div style={{ padding: 16, backgroundColor: '#eef2ff' }}>
      <p style={{ fontSize: 20 }}>أهلا من React</p>
    </div>
  );
}`
        },
        {
          cmd: "RN ولا Flutter",
          title: "React Native ولا Flutter ولا PWA: تختار إزاي؟",
          desc: R`التلاتة بيطلّعوا تطبيق لـ Android و iOS من كود واحد، بس بطرق مختلفة. React Native بيرسم native views حقيقية ولغته TypeScript. Flutter (في «تاب Flutter و Dart») بيرسم كل بكسل بنفسه بمحرك رسم خاص (Impeller)، ولغته Dart. و PWA أو Capacitor موقع ويب بيشتغل في متصفح أو WebView.

القرار غالبًا مش تقني بحت: الفريق بيعرف إيه؟ فيه موقع React تشارك معاه كود؟ محتاج شكل مطابق 100% على النظامين ولا شكل كل نظام؟ في مصر والخليج الاتنين (RN و Flutter) مطلوبين في الشغل تقريبًا بنفس الدرجة.`,
          example: R`# نفس الشاشة بالتلاتة
# React Native:  <View><Text>Hello</Text></View>       -> UIView / android.view.View حقيقيين
# Flutter:       Column(children: [Text('Hello')])      -> Flutter بيرسمها بنفسه على canvas
# Capacitor:     <div><p>Hello</p></div>                -> HTML جوه WebView
npx create-expo-app@latest my-app
flutter create my_app
npm create vite@latest my-pwa -- --template react-ts`,
          try: R`اكتب لنفسك جدول صغير فيه ٤ أعمدة: اللغة، الرسم، مشاركة الكود مع موقع React، والشكل على iOS. واملاه للتلاتة. وبعدين افتكر مشروع حقيقي (مثلًا تطبيق للموقع بتاعك اللي معمول بـ Next.js و Node) واختار واحد وقول السبب في جملتين.`,
          deep: {
            why: R`السؤال ده بيتسأل في كل انترفيو موبايل، وفي أول اجتماع لأي مشروع. لو اخترت غلط، هتدفع التمن بعدين: فريق بيتعلم لغة جديدة، أو تطبيق تقيل في WebView، أو مكتبة مهمة مش موجودة.`,
            how: R`React Native: JS على Hermes، والـ UI views أصلية فشكلها وإحساسها (scroll، والـ text selection، والـ accessibility) بتاع النظام تلقائيًا. تقدر تشارك types و Zod schemas و API client و hooks مع موقع React أو Next.js (monorepo). مع Expo بقى فيه أدوات كاملة: build في السحابة، و OTA updates، و routing بالملفات.

Flutter: Dart بيتعمله compile لـ native code (AOT)، والـ UI بيترسم بمحرك Flutter نفسه، فالشكل متطابق بكسل ببكسل على كل الأجهزة، والأداء في الـ animations التقيلة ممتاز. بس مفيش مشاركة كود مع موقع JS، والـ widgets بتقلّد شكل النظام مش هي نفسها.

PWA / Capacitor: أرخص وأسرع لو عندك موقع. بس الأداء والإحساس أقل (خصوصًا الـ lists الطويلة والـ gestures)، والـ APIs المتاحة أقل على iOS.`,
            when: R`RN: الفريق بيعرف React، أو فيه موقع React/Next عايز تشارك معاه، أو محتاج OTA updates. Flutter: فريق جديد أو بيعرف Dart، أو UI مخصصة جدًا ومتطابقة على الكل، أو animations كتير. PWA/Capacitor: تطبيق بسيط فوق موقع موجود، أو MVP بسرعة. ولو اتسألت في انترفيو، قول «حسب الفريق والكود الموجود» ووضّح الـ trade-offs، مش «RN أحسن».`,
            mistakes: R`«Flutter أسرع دايمًا»: الفرق في معظم التطبيقات (فورمات و lists و API) مش هيحس بيه المستخدم، والـ New Architecture في RN قفلت جزء كبير من الفجوة. و «RN يعني كود واحد 100%»: لأ، هتكتب شوية كود مخصوص لكل نظام (permissions، و keyboard، وشكل الـ header). و «PWA زي التطبيق»: على iOS لسه فيه قيود على الـ push notifications والتخزين والـ background.`
          },
          lines: [
            "ينشئ مشروع React Native بـ Expo (الطريقة الموصى بيها رسميًا).",
            R`ينشئ مشروع Flutter (تفاصيله في «تاب Flutter و Dart»).`,
            "مشروع React عادي للويب ممكن تعمله PWA أو تلفه بـ Capacitor."
          ],
          sol: R`جدول معقول:

RN: TypeScript، views أصلية، مشاركة كود عالية مع React/Next (types و Zod و API client)، شكل iOS أصلي تلقائيًا.

Flutter: Dart، محرك رسم خاص، مشاركة كود مع موقع JS تقريبًا صفر، شكل متطابق على الكل (Cupertino widgets بتقلّد iOS).

Capacitor/PWA: HTML/CSS/JS، WebView، مشاركة كود كاملة مع الموقع، إحساس ويب.

ولموقع Next.js + Node: RN مع Expo، لأنك هتشارك الـ types والـ Zod schemas مع الـ backend والموقع، والفريق مش هيتعلم لغة جديدة. لو اخترت Flutter السبب المقبول يكون «الفريق بيعرف Dart» أو «UI مخصصة جدًا»، مش «أسرع».`
        },
        {
          cmd: "New Architecture",
          title: "يعني إيه New Architecture، وليه الـ bridge اتشال؟",
          desc: R`زمان RN كان بيوصّل JS بالـ native عن طريق «bridge»: كل رسالة بين الاتنين بتتحول JSON وتتبعت async في طابور. ده كان بطيء في الحاجات اللي محتاجة رد فوري (scroll، animations، قياس حجم view).

الـ New Architecture شالت الـ bridge وحطت مكانه JSI: JS يقدر ينادي دوال C++ مباشرة، ومن غير JSON. وفوقها: Fabric (الـ renderer الجديد، بيدعم features بتاعة React 18/19 زي transitions)، و TurboModules (الـ native modules بتتحمّل لما تحتاجها بس). من React Native 0.82 مبقاش فيه اختيار: الـ New Architecture هي الوحيدة، وفي Expo من SDK 55 مبقاش ينفع تقفلها.`,
          example: R`# شوف نسخة RN والـ SDK في مشروعك
npx expo --version
npm ls react-native expo react
# Expo SDK 57 (المستقرة في سبتمبر 2026): React Native 0.86 و React 19.2
# Hermes هو المحرك الافتراضي، والـ New Architecture شغالة دايمًا
npx expo-doctor`,
          try: R`في مشروع الـ lab (الدرس الجاي) شغّل [[npm ls react-native expo react]] وشوف الأرقام. وبعدين دوّر في [[app.json]] على [[newArchEnabled]]: موجودة؟ ولو ضفتها بـ false هيحصل إيه؟`,
          deep: {
            why: R`عشان تفهم ليه مكتبات قديمة كتير مبقتش شغالة (كانت معتمدة على الـ bridge)، وليه لازم تتأكد إن أي مكتبة native بتدعم الـ New Architecture قبل ما تركّبها. وده سؤال انترفيو ثابت: «إيه الفرق بين الـ bridge و JSI؟».`,
            how: R`JSI (JavaScript Interface): طبقة C++ بتخلّي Hermes يمسك references لـ objects في C++ وينادي دوالها sync أو async. مفيش serialization لـ JSON، فالبيانات الكبيرة (صورة، buffer) بتعدّي من غير نسخ.

Fabric: الشجرة بتاعة الـ UI بقت في C++ ومشتركة بين الـ threads، فـ RN يقدر يقيس ويرسم sync لما يحتاج (زي [[useLayoutEffect]] اللي بقى شغال صح)، ويدعم concurrent rendering و [[startTransition]] و Suspense.

TurboModules: الـ native module (كاميرا، secure store) بيتحمّل أول مرة تناديه، مش مع فتح التطبيق، فالـ startup أسرع. والـ types بتاعته بتتولّد من spec مكتوب بـ TypeScript (Codegen)، فمفيش لخبطة بين اللي JS مستنيه واللي native بيرجّعه.

Bridgeless mode: مفيش bridge خالص حتى للتوافق. والمكتبات القديمة اللي لسه بتستخدم الـ API القديم بتشتغل عن طريق طبقة interop لو محظوظ، وإلا هتقع.`,
            when: R`كل مشروع جديد عليها أوتوماتيك. بتحتاج تفكر فيها لما تختار مكتبة native (بص في reactnative.directory على علامة New Architecture)، أو لما ترقّي مشروع قديم من SDK 54 أو أقدم.`,
            mistakes: R`تركّب مكتبة آخر تحديث ليها من ٣ سنين وتلاقي crash أو «TurboModuleRegistry.getEnforcing: 'X' could not be found». وتفتكر إن الـ New Architecture بتخلي كودك JS أسرع: هي بتسرّع التواصل مع الـ native والرسم، بس re-render زيادة أو list تقيلة هيفضلوا بطيئين. وتقول في الانترفيو «RN بيستخدم bridge» كأنها المعلومة الحالية: قول «كان، ودلوقتي JSI».`
          },
          lines: [
            "نسخة Expo CLI.",
            "النسخ المتركبة فعلًا من الحاجات التلاتة.",
            R`بيفحص المشروع: نسخ مش متوافقة مع الـ SDK، وإعدادات غلط في app.json. (بيحتاج نت عشان يجيب بيانات التوافق.)`
          ],
          sol: R`في SDK 57 هتلاقي [[expo@57.x]] و [[react-native@0.86.x]] و [[react@19.2.x]]. و [[newArchEnabled]] مش موجودة في [[app.json]] بتاع مشروع جديد، لأنها مبقتش إعداد أصلًا.

لو ضفت [[newArchEnabled: false]] مش هيحصل حاجة: من SDK 55 القيمة دي بتتجاهل، و [[expo-doctor]] ممكن ينبهك إنها ملهاش لازمة. الطريقة الوحيدة للـ legacy architecture إنك تفضل على SDK 54 أو أقدم، ودي مش فكرة كويسة في مشروع جديد.`
        }
      ]
    },
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

الـ development build هو «Expo Go بتاعك»: تطبيق بتعمله build لمشروعك انت (بكل مكتباته)، ومعاه [[expo-dev-client]] اللي بيوصله بـ Metro زي Expo Go. أي مشروع حقيقي بيوصل له بسرعة: push notifications على Android، أو مكتبة native زي FlashList بنسخة مختلفة، أو إعداد في app.json.`,
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
          desc: R`كل Expo SDK متجرّب مع نسخ معينة من المكتبات الـ native (Reanimated و FlashList و async-storage وغيرهم). [[npx expo install pkg]] بيختار النسخة المتوافقة مع الـ SDK بتاعك ويركّبها بالـ package manager بتاعك. [[npm install pkg]] بيجيب آخر نسخة، وممكن تبقى مش متوافقة وتوقع التطبيق.

للمكتبات الـ JS البحتة (zod، react-hook-form، TanStack Query) الاتنين زي بعض، بس خليها عادة: كل حاجة بـ [[expo install]].`,
          example: R`npx expo install @tanstack/react-query expo-secure-store expo-sqlite
npx expo install jest-expo jest @testing-library/react-native @types/jest -- --save-dev
npx expo install --check
npx expo install --fix
npx expo-doctor`,
          try: R`في الـ lab ركّب [[@shopify/flash-list]] مرة بـ [[npx expo install]] وشوف النسخة في package.json، وبعدين قارنها بـ [[npm view @shopify/flash-list version]]. نفس الرقم؟`,
          deep: {
            why: R`المكتبة الـ native فيها كود Kotlin و Swift متكتب لنسخة RN معينة. لو النسخة مش متوافقة، الـ build بيقع أو الأسوأ: التطبيق بيشتغل ويقع عند المستخدم لما يفتح الشاشة دي. [[expo install]] بيشيل عنك التخمين.`,
            how: R`[[expo]] نفسه فيه ملف [[bundledNativeModules.json]] فيه النطاق المسموح لكل مكتبة معروفة في الـ SDK ده. [[expo install]] بيقراه (وبيسأل API بتاع Expo لو فيه نت) ويركّب النسخة المناسبة. المكتبات اللي مش في القايمة بتتركّب بآخر نسخة عادي.

[[-- --save-dev]]: أي حاجة بعد [[--]] بتتبعت للـ package manager، فدي بتخليها devDependency.

[[--check]] بيقولك مين مش متوافق، و [[--fix]] بيصلّحهم. ودول أهم أمرين بعد ترقية الـ SDK ([[npx expo install expo@latest]] وبعدين [[--fix]]).

و [[expo install]] بيضيف الـ config plugin للمكتبة في [[app.json]] لو ليها واحد (زي [[expo-secure-store]] و [[expo-sqlite]] و [[expo-localization]]).

ملحوظة من الـ lab: لما جربت، [[npx expo install @shopify/flash-list]] ركّب 2.0.2 مع إن آخر نسخة على npm كانت 2.3.x، وده بالظبط الهدف: النسخة اللي Expo متأكد منها للـ SDK ده.`,
            when: R`دايمًا في مشروع Expo. وبعد أي ترقية SDK، أو لما [[expo-doctor]] يشتكي.`,
            mistakes: R`[[npm i react-native-reanimated@latest]] في مشروع Expo، وبعدين crash مش مفهوم. وتنسى [[--]] قبل [[--save-dev]] فالـ flag يروح لـ expo مش لـ npm. وتعمل [[npm audit fix --force]] على مشروع Expo: بيغيّر نسخ مكتبات native لنسخ مش متوافقة ويكسر المشروع.`
          },
          lines: [
            "يركّب ٣ مكتبات بالنسخ المتوافقة مع الـ SDK، ويضيف plugins بتاعتهم في app.json.",
            R`أدوات الاختبار كـ devDependencies (اللي بعد [[--]] بيروح لـ npm).`,
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

بعد [[prebuild]] هتلاقي في AndroidManifest صلاحيات زي [[android.permission.READ_MEDIA_IMAGES]] (أو ما يعادلها حسب نسخة المكتبة) اتضافت من plugin الـ image picker، وفي [[ios/*/Info.plist]] مفتاح [[NSPhotoLibraryUsageDescription]] بالرسالة العربي. متعدّلش حاجة هناك: امسح الفولدرات بعد ما تبص ([[rm -rf android ios]]).`
        }
      ]
    },
    {
      t: "الـ core components",
      l: 1,
      n: "View و Text و Image و Pressable و TextInput و ScrollView و FlatList: البدايل بتاعة div و p و img و button و input",
      items: [
        {
          cmd: "View و Text",
          title: "View بدل div و Text بدل p: والفرق اللي هيوقعك",
          desc: R`[[View]] صندوق للـ layout والستايل، زي [[div]]. و [[Text]] الوحيد اللي يقدر يعرض نص. وده أكبر فرق: النص مينفعش يبقى برّه [[Text]]، حتى رقم أو مسافة.

[[Text]] جوه [[Text]] بيعمل زي [[span]] جوه [[p]]: بيورّث الخط واللون من الأب، وده المكان الوحيد في RN اللي فيه وراثة ستايل. و [[numberOfLines]] بيقص النص بـ «...»، و [[selectable]] بيخلي المستخدم يقدر ينسخه.`,
          example: R`import { Text, View } from 'react-native';

export function PriceCard({ title, price, oldPrice }: { title: string; price: number; oldPrice?: number }) {
  return (
    <View style={{ padding: 12, borderRadius: 12, backgroundColor: '#fff', gap: 4 }}>
      <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: '600' }}>{title}</Text>
      <Text style={{ color: '#16a34a' }}>
        {price} جنيه{' '}
        {oldPrice ? <Text style={{ textDecorationLine: 'line-through', color: '#999' }}>{oldPrice}</Text> : null}
      </Text>
    </View>
  );
}`,
          try: R`غيّر [[{oldPrice ? ... : null}]] لـ [[{oldPrice && <Text>...</Text>}]] وابعت [[oldPrice={0}]]. إيه اللي هيحصل؟ وليه ده أخطر في RN منه في الويب؟`,
          flag: "script",
          deep: {
            why: R`في الويب لو كتبت [[{count && <Badge />}]] و count بـ 0، هيظهر «0» على الشاشة وخلاص. في RN نفس الغلطة بتوقع التطبيق كله، لأن «0» نص برّه [[Text]]. فلازم تفهم قاعدة النص من أول يوم.`,
            how: R`[[View]] بيتحول لـ native view عادي مبيعرفش يرسم نص. [[Text]] بيتحول لـ TextView/UILabel، والـ [[Text]] المتداخلة بتتجمع في نص واحد بـ styles مختلفة (spannable string على Android و attributed string على iOS)، فمينفعش تحط [[View]] جوه [[Text]] بطريقة مضمونة، وفيه ستايلات View كتير (زي padding على Text المتداخل) مش بتتطبق.

الوراثة: [[Text]] الداخلي بياخد [[fontSize]] و [[color]] و [[fontFamily]] من [[Text]] الخارجي بس. [[View]] مبيورّثش أي حاجة لأولاده، فلو عايز خط موحد للتطبيق كله اعمل component [[AppText]] بستايل افتراضي واستخدمه في كل مكان.

[[{' '}]] لازم عشان JSX بيشيل المسافات في آخر السطر. و [[gap]] شغال في RN زي CSS الحديث (من 0.71).`,
            when: R`[[View]] لأي صندوق أو layout، و [[Text]] لأي نص. واعمل components فوقهم للتصميم بتاعك (AppText و Card و Row) بدل ما تكرر الستايل.`,
            mistakes: R`[[{count && ...}]] مع رقم ممكن يبقى 0، أو [[{str && ...}]] مع string فاضي "": كلهم بيحاولوا يرسموا نص برّه Text. استخدم [[?:]] أو [[!!count &&]] أو [[count > 0 &&]]. وتحط [[onPress]] على [[View]]: مش هيشتغل، View مبيستقبلش ضغط (استخدم Pressable). وتكتب [[fontWeight: 600]] رقم: النوع string ([['600']]).`
          },
          lines: [
            "الاتنين من react-native.",
            "component بـ props مكتوب نوعها زي أي React + TS.",
            "بيرجّع JSX.",
            R`صندوق الكارت. [[gap]] مسافة بين الأولاد زي CSS.`,
            R`العنوان في سطر واحد، والزيادة بتتقص بـ «...». [[fontWeight]] string.`,
            "Text خارجي بلون أخضر.",
            R`السعر ومسافة صريحة [[{' '}]] عشان JSX بيشيل المسافة في آخر السطر.`,
            R`Text داخلي بيورّث حجم الخط ويغيّر اللون ويشطب. و [[? :]] بترجّع null لو مفيش سعر قديم.`,
            "قفلة الـ Text الخارجي.",
            "قفلة الكارت.",
            "قفلة الـ return.",
            "قفلة الدالة."
          ],
          sol: R`مع [[oldPrice={0}]] و [[&&]]: [[0 && ...]] بترجّع [[0]]، و React Native بيحاول يرسمها. هي جوه [[Text]] الخارجي هنا فهتظهر «0» جنب السعر (غلط في الشكل بس). لكن لو نفس الـ pattern كان مباشرة جوه [[View]]، التطبيق بيقع بـ «Text strings must be rendered within a <Text> component».

عشان كده في RN خليها قاعدة: الشروط في JSX بـ [[? :]] أو بـ boolean صريح. والسعر 0 أصلًا قيمة حقيقية، فالشرط الصح [[oldPrice != null]] مش truthiness.`,
          solCode: R`{oldPrice != null ? (
  <Text style={{ textDecorationLine: 'line-through', color: '#999' }}>{oldPrice}</Text>
) : null}`
        },
        {
          cmd: "Image و expo-image",
          title: "تعرض صورة من النت أو من الـ assets",
          desc: R`[[Image]] من react-native بيعرض صورة، و [[expo-image]] (موجود في القالب) أحسن في أغلب الحالات: cache على الديسك، و placeholder، و transitions، ودعم WebP و AVIF و SVG.

أهم فرق عن [[img]]: صورة من النت لازم تديها أبعاد ([[width]] و [[height]] أو [[aspectRatio]])، لأن RN مش بيعرف حجمها قبل ما تتحمّل. والصورة المحلية بـ [[require('./logo.png')]] بتعرف حجمها لوحدها.`,
          example: R`import { Image } from 'expo-image';
import { View } from 'react-native';

export function Avatar({ uri }: { uri?: string }) {
  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <Image
        source={uri ? { uri } : require('@/assets/images/icon.png')}
        style={{ width: 56, height: 56, borderRadius: 28 }}
        contentFit="cover"
        transition={200}
        accessibilityLabel="صورة البروفايل"
      />
      <Image source={{ uri: 'https://picsum.photos/800/450' }} style={{ flex: 1, aspectRatio: 16 / 9 }} />
    </View>
  );
}`,
          try: R`شيل [[style]] من الصورة التانية خالص وشوف هتظهر ولا لأ. وبعدين رجّع [[aspectRatio]] من غير [[flex: 1]]: إيه اللي حصل؟`,
          flag: "script",
          deep: {
            why: R`الصور أكبر سبب لبطء التطبيقات واستهلاك الذاكرة والباقة. [[expo-image]] بيحل أغلبها: بيعمل cache فالصورة مش بتتنزل كل مرة تفتح الشاشة، وبيصغّر الصورة لحجم العرض في الذاكرة.`,
            how: R`[[source]] بياخد [[{ uri }]] لصورة من النت أو ملف على الجهاز (زي الصورة اللي راجعة من image picker)، أو رقم من [[require]] لصورة جوه الـ bundle. Metro بيحوّل [[require]] لـ asset وبيختار [[@2x]] و [[@3x]] حسب كثافة الشاشة لو موجودين.

صورة من النت من غير أبعاد حجمها 0×0، فمش هتظهر خالص ومن غير أي خطأ. [[aspectRatio]] مع عرض معروف ([[flex: 1]] في row، أو [[width: '100%']]) بيحسب الارتفاع.

[[contentFit]] في expo-image هو [[object-fit]] بتاع CSS ([[cover]] و [[contain]])، و [[Image]] العادي اسمه [[resizeMode]]. و [[placeholder]] بياخد blurhash أو thumbhash يظهر لحد ما الصورة تيجي. و [[cachePolicy]] افتراضيًا [['disk']].`,
            when: R`[[expo-image]] لأي صورة من النت أو قايمة صور. [[Image]] العادي كفاية لأيقونة محلية صغيرة. وللـ SVG كأيقونات، expo-image بيعرضه كصورة، ولو محتاج تغيّر لونه استخدم مكتبة أيقونات أو [[react-native-svg]].`,
            mistakes: R`صورة من النت من غير width/height: مبتظهرش ومفيش error. و [[source="https://..."]] string بدل [[{ uri: ... }]]. و HTTP مش HTTPS: iOS بيمنعه افتراضيًا و Android من 9 كمان. وتعرض صورة 4000×3000 في مربع 56×56 في list فيها 200 عنصر: الذاكرة بتتملي. اطلب من الـ backend نسخة صغيرة (thumbnail).`
          },
          lines: [
            "Image من expo-image (نفس الاسم، API أغنى).",
            "View للـ layout.",
            "صورة بروفايل، والـ uri اختياري.",
            "بيرجّع JSX.",
            "صف فيه الصورتين.",
            "بداية الصورة الأولى.",
            R`لو فيه uri نجيبها من النت، وإلا صورة محلية بـ [[require]] (الـ alias [[@/assets]] من tsconfig).`,
            "أبعاد ثابتة، و borderRadius نص العرض يعمل دايرة.",
            R`زي [[object-fit: cover]].`,
            "fade لما الصورة تيجي.",
            "اسم للـ screen reader.",
            "قفلة الصورة.",
            R`صورة من النت: [[flex: 1]] ياخد العرض الباقي، و [[aspectRatio]] يحسب الارتفاع.`,
            "قفلة الصف.",
            "قفلة الـ return.",
            "قفلة الدالة."
          ],
          sol: R`من غير [[style]] الصورة التانية مش هتظهر خالص (حجمها 0×0) ومفيش أي error في الـ console. ده أشهر سؤال «الصورة مش ظاهرة» في RN.

و [[aspectRatio]] من غير [[flex: 1]]: الصورة برضه مش هتظهر أو هتظهر بحجم غريب، لأن مفيش عرض معروف يتحسب منه الارتفاع (الـ row مش بيمدّ أولاده في العرض). مع [[flex: 1]] أو [[width: 200]] الحساب بيشتغل: عرض 200 يعني ارتفاع 112.5.`
        },
        {
          cmd: "Pressable",
          title: "زرار بـ Pressable: onPress و pressed و hitSlop",
          desc: R`مفيش [[button]] ولا [[onClick]]. [[Pressable]] بيلف أي حاجة ويخليها تستقبل ضغط: [[onPress]] و [[onLongPress]] و [[onPressIn]]. و [[style]] ممكن تبقى دالة بتاخد [[{ pressed }]] عشان تغيّر الشكل وقت الضغط (بديل [[:active]]).

فيه كمان [[Button]] جاهز بس شكله مش قابل للتخصيص تقريبًا، فالتطبيقات الحقيقية بتعمل زرار خاص بيها فوق [[Pressable]].`,
          example: R`import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

type Props = { title: string; onPress: () => void; loading?: boolean; disabled?: boolean };

export function AppButton({ title, onPress, loading, disabled }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, (disabled || loading) && styles.disabled]}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { backgroundColor: '#2563eb', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center' },
  pressed: { opacity: 0.7 },
  disabled: { backgroundColor: '#94a3b8' },
  text: { color: '#fff', fontSize: 16, fontWeight: '600' },
});`,
          try: R`استخدم [[AppButton]] في شاشة بزرار بيعمل [[setTimeout]] ثانيتين وهو [[loading]]. اضغطه كذا مرة بسرعة: [[onPress]] اتنادت كام مرة؟ وبعدين ضيف [[android_ripple={{ color: '#ffffff55' }}]] وجرّبه على Android.`,
          flag: "script",
          deep: {
            why: R`الزرار أكتر component هتكتبه. لو اتعمل صح مرة (حالة الضغط، و disabled، و loading، والـ accessibility، ومساحة لمس كفاية) كل التطبيق هيبقى أحسن، ولو كل شاشة عاملة زرار بطريقتها هتلاقي ١٠ أشكال مختلفة.`,
            how: R`[[Pressable]] مبني على نظام الـ responder في RN: لما صباعك يلمس الشاشة، بيحدد مين «صاحب» اللمسة. [[onPressIn]] أول ما تلمس، و [[onPressOut]] لما ترفع، و [[onPress]] لو رفعت صباعك وانت لسه جوه العنصر، و [[onLongPress]] بعد 500ms تقريبًا.

[[style]] كدالة: RN بيناديها مع [[{ pressed }]] كل ما الحالة تتغير. والـ array في الستايل بيتدمج من الشمال لليمين، والقيم [[false]] و [[null]] بتتجاهل، فـ [[pressed && styles.pressed]] نظيفة.

[[hitSlop]] بيكبّر مساحة اللمس من غير ما يكبّر الشكل: Apple و Google بينصحوا بـ 44 و 48 نقطة على الأقل. و [[accessibilityRole="button"]] بيخلي TalkBack و VoiceOver يقولوا «زرار»، وده برضه اللي بيخلي [[getByRole('button')]] في الاختبارات يلاقيه.

[[disabled]] بيمنع الضغط فعلًا، وبس لازم تغيّر الشكل بنفسك.`,
            when: R`أي حاجة بتتضغط: زرار، أو صف في list، أو كارت. [[TouchableOpacity]] القديم لسه شغال بس [[Pressable]] هو الموصى بيه.`,
            mistakes: R`[[onPress={save()}]] بدل [[onPress={save}]]: بتنادي الدالة وقت الرسم. وزرار 24×24 من غير hitSlop: المستخدمين هيضغطوا جنبه. ومفيش حماية من الضغط المتكرر في عمليات زي الدفع: الـ [[disabled]] وقت الـ loading أو [[isPending]] من useMutation. وتنسى [[accessibilityRole]] فالاختبار بـ [[getByRole]] مش لاقيه.`
          },
          lines: [
            "الأدوات: Pressable للضغط، و ActivityIndicator للـ spinner.",
            "نوع الـ props.",
            "زرار التطبيق.",
            "بيرجّع JSX.",
            "بداية الـ Pressable.",
            "الحدث الأساسي.",
            "ممنوع يتضغط وهو disabled أو بيحمّل.",
            "٨ نقط زيادة في مساحة اللمس من كل ناحية.",
            "قارئ الشاشة يقول «زرار».",
            "ويقول إنه معطّل أو مشغول.",
            R`ستايل دالة: [[pressed]] بيتغير وقت اللمس، والـ array بيدمج، والـ false بيتجاهل.`,
            "spinner وقت التحميل، والعنوان غير كده.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة الدالة.",
            R`[[StyleSheet.create]] للستايلات (الدرس الجاي).`,
            "شكل الزرار.",
            "شكله وقت الضغط.",
            "شكله وهو معطّل.",
            "النص.",
            "قفلة."
          ],
          sol: R`مع [[disabled={disabled || loading}]]، [[onPress]] بتتنادي مرة واحدة: أول ضغطة بتحوّل الزرار لـ loading والضغطات اللي بعدها بتتجاهل. لو شلت [[loading]] من الـ disabled، هتتنادي مع كل ضغطة (وده اللي بيعمل طلبين دفع).

[[android_ripple]] بيعمل التموّج بتاع Material على Android بس، و iOS بيتجاهله (هناك الـ opacity كفاية).`,
          solCode: R`import { useState } from 'react';
import { View } from 'react-native';
import { AppButton } from '@/components/AppButton';

export default function Demo() {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <View style={{ padding: 24 }}>
      <AppButton
        title={$__btحفظ ($__{count})$__bt}
        loading={loading}
        onPress={() => {
          setCount((c) => c + 1);
          setLoading(true);
          setTimeout(() => setLoading(false), 2000);
        }}
      />
    </View>
  );
}`
        },
        {
          cmd: "TextInput",
          title: "TextInput: value و onChangeText والكيبورد المناسب",
          desc: R`[[TextInput]] هو [[input]]. بتعمله controlled زي الويب بالظبط، بس الحدث اسمه [[onChangeText]] وبيدّيك النص مباشرة (مش event). ومفيش [[type]]: بدلها props بتتحكم في الكيبورد: [[keyboardType]] ([['email-address']] و [['number-pad']] و [['phone-pad']])، و [[secureTextEntry]] للباسورد، و [[autoCapitalize]] و [[autoComplete]] و [[returnKeyType]].

ومفيش [[label]] مرتبط تلقائيًا: اكتب [[Text]] فوقه، وحط [[accessibilityLabel]] على الـ input نفسه.`,
          example: R`import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export function PhoneField() {
  const [phone, setPhone] = useState('');
  const valid = /^01[0125]\d{8}$/.test(phone);
  return (
    <View style={{ gap: 6 }}>
      <Text>رقم الموبايل</Text>
      <TextInput
        value={phone}
        onChangeText={(t) => setPhone(t.replace(/\D/g, ''))}
        keyboardType="phone-pad"
        autoComplete="tel"
        maxLength={11}
        placeholder="01xxxxxxxxx"
        accessibilityLabel="رقم الموبايل"
        style={{ borderWidth: 1, borderColor: valid || !phone ? '#ccc' : '#dc2626', borderRadius: 8, padding: 10 }}
      />
      {!valid && phone.length === 11 ? <Text style={{ color: '#dc2626' }}>الرقم مش صحيح</Text> : null}
    </View>
  );
}`,
          try: R`ضيف خانة باسورد بـ [[secureTextEntry]] وزرار «إظهار» بيقلبها. وخلي خانة الموبايل لما تدوس Enter/Next على الكيبورد تنقلك لخانة الباسورد (هتحتاج [[useRef]] و [[returnKeyType]] و [[onSubmitEditing]]).`,
          flag: "script",
          deep: {
            why: R`الفورمات على الموبايل تجربتها بتعتمد على الكيبورد: كيبورد أرقام لرقم التليفون، وإيميل من غير capital أول حرف، والـ autofill للباسورد، و «التالي» بينقلك للخانة اللي بعدها. التفاصيل دي بتفرق جدًا في معدل التسجيل.`,
            how: R`[[value]] + [[onChangeText]] = controlled input: كل حرف بيعمل setState والـ input بيعرض الـ state. ممكن تعدّل النص قبل ما تحفظه (زي شيل أي حاجة مش رقم هنا). وفيه [[onChange]] كمان بيدّيك event فيه [[nativeEvent.text]]، بس [[onChangeText]] أبسط.

[[keyboardType]] بيغيّر شكل الكيبورد بس، مش بيمنع إدخال حاجة تانية (اللصق مثلًا)، فالـ validation لازم تفضل. [[autoComplete]] بيدّي hint للنظام للـ autofill (Android) و [[textContentType]] لـ iOS. [[secureTextEntry]] بيخفي النص وبيمنع النسخ.

التنقل بين الخانات: [[ref]] على الـ TextInput التاني، و [[returnKeyType="next"]] على الأول، و [[onSubmitEditing={() => nextRef.current?.focus()}]]. و [[submitBehavior="submit"]] لو عايز الكيبورد يفضل مفتوح.

[[multiline]] بيعمل textarea، وعلى Android محتاج [[textAlignVertical="top"]] عشان النص يبدأ من فوق.`,
            when: R`أي إدخال نص. وفي الفورمات الكبيرة بتستخدمه مع react-hook-form عن طريق [[Controller]] (درس الفورمات في المستوى ٢).`,
            mistakes: R`[[onChange={(e) => setX(e.target.value)}]] من عادة الويب: مفيش [[e.target.value]] في RN. وتفتكر إن [[keyboardType="number-pad"]] بيضمن أرقام بس. وتنسى [[autoCapitalize="none"]] في الإيميل فأول حرف يبقى capital والـ login يفشل. ومفيش [[accessibilityLabel]] فالاختبار بـ [[getByLabelText]] مش لاقي الخانة.`
          },
          lines: [
            "useState عادي.",
            "الـ components.",
            "خانة رقم موبايل مصري.",
            "النص في state.",
            "validation بسيط: 01 وبعدها 0 أو 1 أو 2 أو 5 وبعدها ٨ أرقام.",
            "بيرجّع JSX.",
            "صندوق الخانة.",
            R`الـ label نص عادي فوق الخانة.`,
            "بداية TextInput.",
            "controlled: القيمة من الـ state.",
            R`[[onChangeText]] بيدّيك النص مباشرة، وبنشيل أي حاجة مش رقم.`,
            "كيبورد أرقام التليفون.",
            "hint للـ autofill.",
            "أقصى عدد حروف.",
            "نص باهت لما الخانة فاضية.",
            "اسم الخانة لقارئ الشاشة وللاختبارات.",
            "ستايل، والإطار أحمر لو الرقم غلط.",
            "قفلة.",
            "رسالة خطأ لما يكمّل ١١ رقم والرقم غلط.",
            "قفلة الصندوق.",
            "قفلة الـ return.",
            "قفلة الدالة."
          ],
          sol: R`لما تدوس «التالي» في خانة الموبايل المفروض الـ focus ينتقل للباسورد والكيبورد يتغير لكيبورد حروف عادي. زرار «إظهار» بيقلب [[secureTextEntry]] والنص يبان.

لو [[passwordRef.current?.focus()]] مش بيعمل حاجة: اتأكد إنك حاطط [[ref={passwordRef}]] على الـ TextInput نفسه مش على View حواليه. ولو الكيبورد بيتقفل ويفتح تاني بين الخانتين: ده عادي على Android مع [[returnKeyType="next"]] من غير [[submitBehavior="submit"]].`,
          solCode: R`import { useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

export function LoginFields() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const passwordRef = useRef<TextInput>(null);
  return (
    <View style={{ gap: 8 }}>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => passwordRef.current?.focus()}
        accessibilityLabel="رقم الموبايل"
      />
      <TextInput
        ref={passwordRef}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!show}
        returnKeyType="done"
        accessibilityLabel="الباسورد"
      />
      <Pressable accessibilityRole="button" onPress={() => setShow((s) => !s)}>
        <Text>{show ? 'إخفاء' : 'إظهار'}</Text>
      </Pressable>
    </View>
  );
}`
        },
        {
          cmd: "ScrollView و SafeArea",
          title: "الشاشة مش بتعمل scroll لوحدها: ScrollView و SafeAreaView",
          desc: R`في الويب الصفحة بتعمل scroll لوحدها. في RN لأ: لو المحتوى أطول من الشاشة، الزيادة بتتقص. عشان تعمل scroll لازم تلف المحتوى في [[ScrollView]].

والحاجة التانية: الشاشات الحديثة فيها notch وشريط حالة فوق وشريط gestures تحت، والتطبيق بيترسم تحتهم (edge-to-edge، وده إجباري على Android الحديث). [[SafeAreaView]] من [[react-native-safe-area-context]] (أو [[useSafeAreaInsets]]) بيحط padding بالمقاس الصح عشان المحتوى ميتغطاش.`,
          example: R`import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }} keyboardShouldPersistTaps="handled">
        {Array.from({ length: 30 }, (_, i) => (
          <Text key={i}>فقرة رقم {i + 1}</Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}`,
          try: R`شيل الـ [[ScrollView]] وسيب الفقرات في [[View]]: الفقرات الأخيرة راحت فين؟ وبعدين حط [[justifyContent: 'center']] في [[style]] بتاع الـ ScrollView بدل [[contentContainerStyle]] واقرا التحذير.`,
          flag: "script",
          deep: {
            why: R`أول شاشة «About» أو «Settings» هتكتبها هتلاقي آخرها مقصوص، أو العنوان تحت الـ notch على iPhone. الاتنين بيبانوا على أجهزة معينة بس، فلازم تعرفهم قبل ما المستخدمين يبعتوا screenshots.`,
            how: R`[[ScrollView]] بيرسم كل أولاده مرة واحدة (حتى اللي برّه الشاشة). ده تمام لـ 30 فقرة، ومصيبة لـ 1000 عنصر: هنا [[FlatList]] (الدرس الجاي).

عنده ستايلين: [[style]] للإطار الخارجي (حجمه في الشاشة، غالبًا [[flex: 1]])، و [[contentContainerStyle]] للمحتوى اللي جوه (padding و gap و alignItems). [[justifyContent]] و [[alignItems]] مكانهم الـ content container، و RN بيطلّع خطأ لو حطيتهم في [[style]].

[[keyboardShouldPersistTaps="handled"]]: من غيرها أول ضغطة على زرار والكيبورد مفتوح بتقفل الكيبورد بس ومش بتضغط الزرار.

SafeArea: [[SafeAreaView]] من [[react-native-safe-area-context]] (مش من react-native، اللي هناك iOS بس و deprecated). [[edges]] بتختار أنهي حواف. ولو عايز الخلفية تفضل ممتدة تحت الـ notch والمحتوى بس اللي ينزل، استخدم [[useSafeAreaInsets()]] وحط [[paddingTop: insets.top]] بنفسك. وخد بالك: شاشات جوه Stack أو Tabs من Expo Router الـ header والـ tab bar بيعملوا الـ safe area بتاعتهم، فمتكررهاش.`,
            when: R`ScrollView: شاشة محتواها محدود (فورم، صفحة تفاصيل، إعدادات). أي قايمة من API أو طويلة: FlatList. SafeArea: أي شاشة مفيهاش header من الـ navigator.`,
            mistakes: R`[[FlatList]] جوه [[ScrollView]] بنفس الاتجاه: تحذير «VirtualizedLists should never be nested» والـ virtualization بتبوظ. استخدم [[ListHeaderComponent]] في الـ FlatList بدل كده. و [[SafeAreaView]] من [[react-native]] بدل safe-area-context. و [[flex: 1]] ناقص على الأب فالـ ScrollView ارتفاعه صفر أو بياخد المحتوى كله ومش بيعمل scroll.`
          },
          lines: [
            "ScrollView من react-native.",
            "SafeAreaView من safe-area-context، مش من react-native.",
            "شاشة.",
            "بيرجّع JSX.",
            "ياخد الشاشة كلها، ويبعد عن الـ notch وشريط الـ gestures.",
            R`الإطار بيعمل scroll، و [[contentContainerStyle]] ستايل المحتوى نفسه. و [[handled]] عشان الضغطات توصل والكيبورد مفتوح.`,
            "٣٠ فقرة للتجربة.",
            R`كل عنصر في map محتاج [[key]] زي React.`,
            "قفلة الـ map.",
            "قفلة الـ ScrollView.",
            "قفلة الـ SafeArea.",
            "قفلة الـ return.",
            "قفلة الدالة."
          ],
          sol: R`من غير ScrollView، الفقرات اللي بعد حوالي ١٥-٢٠ (حسب حجم الشاشة) مش هتظهر ومش هتقدر توصلها: الـ View طوله الشاشة والزيادة بتتقص. مفيش أي error.

ومع [[justifyContent]] في [[style]]: RN بيرمي Invariant Violation فيه «ScrollView child layout (["justifyContent"]) must be applied through the contentContainerStyle prop». انقلها لـ [[contentContainerStyle]]، ولو عايز المحتوى في النص لما يكون قصير ضيف [[flexGrow: 1]] هناك كمان.`
        },
        {
          cmd: "FlatList",
          title: "FlatList: قايمة طويلة بترسم اللي ظاهر بس",
          desc: R`[[FlatList]] بياخد [[data]] (array) و [[renderItem]] (دالة بترسم عنصر واحد) و [[keyExtractor]] (مفتاح لكل عنصر). بيرسم العناصر اللي ظاهرة والقريبة منها بس (virtualization)، فقايمة فيها 10,000 عنصر بتشتغل.

فيه props جاهزة لكل حاجة بتحتاجها في قايمة: [[ListEmptyComponent]] لما تكون فاضية، و [[ListHeaderComponent]] و [[ListFooterComponent]]، و [[ItemSeparatorComponent]]، و [[onEndReached]] للتحميل الزيادة، و [[refreshControl]] للسحب لتحت. ولو محتاج أقسام بعناوين: [[SectionList]].`,
          example: R`import { FlatList, Text, View } from 'react-native';

type Order = { id: string; customer: string; total: number };

export function OrdersList({ orders }: { orders: Order[] }) {
  return (
    <FlatList
      data={orders}
      keyExtractor={(o) => o.id}
      renderItem={({ item }) => (
        <View style={{ padding: 16 }}>
          <Text>{item.customer}</Text>
          <Text>{item.total} جنيه</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#eee' }} />}
      ListEmptyComponent={<Text style={{ padding: 24, textAlign: 'center' }}>مفيش طلبات لسه</Text>}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}`,
          try: R`اعمل [[orders]] فيها 5000 عنصر بـ [[Array.from]] واعرضها مرة بـ [[FlatList]] ومرة بـ [[ScrollView]] و map. لاحظ الوقت لحد ما الشاشة تظهر. وبعدين ابعت array فاضي وشوف الـ empty state.`,
          flag: "script",
          deep: {
            why: R`معظم شاشات التطبيقات قوايم: منتجات، رسايل، طلبات، إشعارات. [[ScrollView]] + map بيرسم كله مرة واحدة، فشاشة بـ 1000 عنصر بتاخد ثواني تفتح وبتاكل الذاكرة. [[FlatList]] بيحل ده، وهو اللي هيتسألك عنه في أي انترفيو RN.`,
            how: R`FlatList مبني على [[VirtualizedList]]: بيحسب إيه اللي في الشاشة، ويرسم «نافذة» حواليه ([[windowSize]] افتراضيًا 21، يعني 10 شاشات فوق و 10 تحت)، والعناصر اللي بعيد بتتشال من الشجرة. [[initialNumToRender]] (افتراضيًا 10) كام عنصر يترسم أول مرة.

[[keyExtractor]] بيرجّع string ثابت لكل عنصر، زي [[key]] في React بالظبط (reconciliation في «تاب React»). من غيره بيدوّر على [[item.key]] أو [[item.id]]، وبعدين الـ index.

[[renderItem]] بتاخد [[{ item, index }]]. وأي component بتمرره لـ [[ItemSeparatorComponent]] أو [[ListHeaderComponent]] ممكن يبقى component أو element.

FlatList بيعمل re-render للعناصر لما [[data]] تتغير (مقارنة بالمرجع). لو الـ renderItem معتمد على state تاني (العنصر المختار مثلًا)، ابعته في [[extraData]] وإلا الشكل مش هيتحدث.

الأداء بعمق (FlashList و memo و getItemLayout) في المستوى ٣.`,
            when: R`أي قايمة جاية من API أو ممكن تطول. [[ScrollView]] للمحتوى الثابت القليل. و [[FlashList]] من Shopify لما القايمة كبيرة جدًا أو العناصر تقيلة.`,
            mistakes: R`[[keyExtractor={(_, i) => String(i)}]]: نفس مشكلة الـ key بالـ index. و [[data]] بتتعمل من جديد كل render ([[data={orders.filter(...)}]] من غير useMemo): شغالة بس بتعيد حسابات. وتحط FlatList جوه ScrollView. ونسيان [[extraData]] لما الـ selection في state بره الـ data.`
          },
          lines: [
            "FlatList من react-native.",
            "نوع العنصر.",
            "component بياخد الطلبات.",
            "بيرجّع JSX.",
            "بداية القايمة.",
            "الـ array.",
            "مفتاح ثابت لكل عنصر (string).",
            R`بترسم عنصر واحد، و [[item]] نوعه Order تلقائيًا.`,
            "صندوق العنصر.",
            "اسم العميل.",
            "الإجمالي.",
            "قفلة الصندوق.",
            "قفلة الـ renderItem.",
            "خط بين كل عنصرين.",
            "لو الـ array فاضي.",
            "ستايل المحتوى زي ScrollView.",
            "قفلة الـ FlatList.",
            "قفلة الـ return.",
            "قفلة الدالة."
          ],
          sol: R`مع 5000 عنصر، الـ FlatList بيظهر فورًا تقريبًا لأنه بيرسم أول 10 بس وبيكمّل وانت بتنزل. الـ ScrollView بيتأخر ثانية أو أكتر (حسب الجهاز) قبل ما يظهر أي حاجة، والـ scroll بعدها ممكن يبقى تقيل، والذاكرة أعلى بكتير (شوفها في الـ Performance Monitor من قايمة الـ dev).

ومع array فاضي: النص «مفيش طلبات لسه» في النص. ولو مش ظاهر في النص رأسيًا ضيف [[flexGrow: 1]] للـ [[contentContainerStyle]] و [[flex: 1]] + [[justifyContent: 'center']] للـ empty component.`,
          solCode: R`const orders = Array.from({ length: 5000 }, (_, i) => ({
  id: String(i + 1),
  customer: $__btعميل $__{i + 1}$__bt,
  total: (i * 37) % 900 + 100,
}));
// <OrdersList orders={orders} />
// <OrdersList orders={[]} />`
        }
      ]
    },
    {
      t: "الستايل و flexbox",
      l: 1,
      n: "StyleSheet، و flexbox بافتراضات مختلفة عن الويب، و Platform والأبعاد، و NativeWind لو بتحب Tailwind",
      items: [
        {
          cmd: "StyleSheet",
          title: "StyleSheet: CSS من غير cascade ولا selectors",
          desc: R`الستايل في RN objects بأسماء camelCase ([[backgroundColor]] مش [[background-color]])، والأرقام من غير وحدة (بتتحسب dp)، وفيه نسب مئوية كـ string ([['50%']]). [[StyleSheet.create]] بيجمعهم في مكان واحد تحت الـ component، وبيدّيك autocomplete وفحص للأنواع.

مفيش cascade ولا selectors ولا [[:hover]] ولا media queries. كل عنصر بياخد ستايله صريح. وعشان تدمج: array [[style={[styles.base, active && styles.active]}]]، والأخير بيكسب.`,
          example: R`import { StyleSheet, Text, View } from 'react-native';

export function Badge({ label, tone = 'info' }: { label: string; tone?: 'info' | 'danger' }) {
  return (
    <View style={[styles.badge, tone === 'danger' && styles.danger]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#dbeafe',
  },
  danger: { backgroundColor: '#fee2e2' },
  text: { fontSize: 12, fontWeight: '600', color: '#1e293b' },
});`,
          try: R`شيل [[alignSelf: 'flex-start']] وشوف الـ badge بقى عرضه قد إيه. وبعدين جرّب تكتب [[padding: '10px']] أو [['background-color': 'red']] وشوف TypeScript قال إيه.`,
          flag: "script",
          deep: {
            why: R`لو جاي من CSS، أول أسبوع هتدوّر على الـ cascade والـ classes. فهم إن كل حاجة صريحة ومحلية بيوفّر وقت، وبيوضّح ليه الـ design system في RN بيتعمل كـ components (Button و Card و AppText) مش كـ classes.`,
            how: R`[[StyleSheet.create]] في RN الحديث بيرجّع نفس الـ object تقريبًا (مبقاش فيه تحويل لأرقام IDs زي زمان)، فالفايدة الأساسية: الأنواع، والتنظيم، وإن الـ object بيتعمل مرة واحدة برّه الـ render. الـ inline style [[style={{...}}]] شغال عادي ومش كارثة في الأداء، بس بيتعمل object جديد كل render.

الأسماء: [[paddingHorizontal]] و [[paddingVertical]] و [[marginHorizontal]] اختصارات مش موجودة في CSS. والـ shorthand زي [[border: '1px solid red']] مش موجود: [[borderWidth]] و [[borderColor]] و [[borderStyle]]. والظل: [[boxShadow]] (string زي CSS، مدعوم من 0.76 على الـ New Architecture) أو القديم [[shadowColor]]/[[elevation]].

[[StyleSheet.hairlineWidth]] أرفع خط الشاشة تقدر ترسمه. و [[StyleSheet.absoluteFill]] اختصار لـ [[position: 'absolute']] بكل الحواف 0.

الـ theme (فاتح/غامق): [[useColorScheme()]] بيرجّع [['light']] أو [['dark']]، وبتختار ألوانك منه. والقالب فيه [[use-theme]] hook بيعمل كده.`,
            when: R`StyleSheet للستايلات الثابتة، و inline للحاجات اللي بتتحسب (عرض من state، لون من prop). ولو الفريق بيحب Tailwind: NativeWind (آخر درس في الـ category دي).`,
            mistakes: R`[[fontSize: '16px']] أو [[padding: '10px']]: غلط، أرقام بس. و [[fontWeight: 700]] رقم بدل string. وتستنى [[color]] على [[View]] يأثّر على الـ Text اللي جواه: مفيش وراثة. و [[margin: 'auto']] للتوسيط: استخدم [[alignItems]] و [[justifyContent]].`
          },
          lines: [
            "StyleSheet من react-native.",
            "badge بنوعين ألوان.",
            "بيرجّع JSX.",
            R`array ستايلات: الأساسي، والـ danger لو الشرط صح ([[false]] بيتجاهل).`,
            "النص.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة الدالة.",
            "كل الستايلات في مكان واحد برّه الـ component.",
            "الـ badge.",
            "ميتمدّش بعرض الأب: ياخد قد محتواه.",
            "padding يمين وشمال.",
            "padding فوق وتحت.",
            "رقم كبير = pill كاملة.",
            "لون الخلفية.",
            "قفلة.",
            "اللون البديل.",
            "ستايل النص (مش بيتورث من الـ View).",
            "قفلة."
          ],
          sol: R`من غير [[alignSelf: 'flex-start']] الـ badge بيتمدّ بعرض الأب كله، لأن افتراضي [[alignItems]] في RN هو [[stretch]] (زي الويب في flex column). [[alignSelf]] بيخلي العنصر ده بالذات ياخد قد محتواه.

[[padding: '10px']]: TypeScript بيقول إن النوع مش متوافق مع [[DimensionValue]]، ولو شغّلته من غير typecheck الـ padding مش هيتطبق. و [[background-color]]: TS بيقول إن الخاصية مش موجودة في [[ViewStyle]] (Object literal may only specify known properties).`
        },
        {
          cmd: "flexbox في RN",
          title: "flexbox في RN: column افتراضي و flex: 1",
          desc: R`كل [[View]] في RN هو flex container من غير ما تكتب [[display: flex]]، والفرق عن الويب في الافتراضيات: [[flexDirection]] افتراضيًا [[column]] (مش row)، و [[alignContent]] [[flex-start]]، و [[flexShrink]] 0. و [[flex: 1]] معناها «خد كل المساحة الفاضية» وده أكتر سطر هتكتبه.

باقي الـ properties زي CSS: [[justifyContent]] على المحور الأساسي، و [[alignItems]] على المحور التاني، و [[gap]] و [[flexWrap]] و [[position: 'absolute']].`,
          example: R`import { Text, View } from 'react-native';

export default function ChatScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 }}>
        <Text>رجوع</Text>
        <Text style={{ fontWeight: '600' }}>سارة</Text>
        <Text>⋯</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: '#f1f5f9' }} />
      <View style={{ flexDirection: 'row', gap: 8, padding: 8 }}>
        <View style={{ flex: 1, height: 44, borderRadius: 22, backgroundColor: '#e2e8f0' }} />
        <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#2563eb' }} />
      </View>
    </View>
  );
}`,
          try: R`شيل [[flex: 1]] من أول View (الجذر) وشوف الشاشة. وبعدين شيله من الـ View الرمادي في النص. وأخيرًا غيّر الـ footer لـ [[flexDirection: 'column']] وشوف إيه اللي اتكسر.`,
          flag: "script",
          deep: {
            why: R`كل layout في RN flexbox، مفيش grid ولا float. أغلب مشاكل «الشاشة فاضية» أو «العنصر مش ظاهر» سببها [[flex: 1]] ناقص في مكان، أو إنك متوقع row والافتراضي column.`,
            how: R`الـ layout بيتحسب بـ Yoga (مكتبة C++ من Meta بتطبق flexbox). [[flex: 1]] في RN مش زي [[flex: 1]] في CSS بالظبط: رقم موجب يعني [[flexGrow]] بالرقم ده و [[flexShrink: 1]] و [[flexBasis: 0]]، فالعناصر اللي عليها flex بتتقسم المساحة الفاضية بالنسبة (1 و 2 يعني تلت وتلتين).

عشان [[flex: 1]] تشتغل، الأب لازم يكون ليه حجم. الجذر بتاع الشاشة بياخد حجم الشاشة من الـ navigator، فأول View لازم [[flex: 1]] عشان يمدّ، وإلا ارتفاعه قد محتواه، والولد اللي عليه [[flex: 1]] جوه أب ارتفاعه صفر = صفر.

[[position: 'absolute']] بيطلّع العنصر من الـ flow، ومكانه بالنسبة للأب المباشر (مفيش حاجة اسمها relative لازم تكتبها، كل حاجة relative افتراضيًا). و [[zIndex]] شغال بين الإخوات.

على الـ RTL: [[flexDirection: 'row']] بيتقلب لوحده لما التطبيق يبقى RTL، وده من أهم مزايا RN مع العربي (درس RTL في المستوى ٢).`,
            when: R`دايمًا. القاعدة العملية: الشاشة [[flex: 1]]، والجزء اللي بيتمدّ (المحتوى، أو الـ list) [[flex: 1]]، والباقي (header و footer) حجمه ثابت أو قد محتواه.`,
            mistakes: R`تنسى [[flex: 1]] على الجذر فالشاشة فاضية أو الـ list مش بتعمل scroll. وتكتب [[display: 'flex']] (ملهاش لازمة) أو [[display: 'grid']] (مش موجود). وتستخدم [[width: '100%']] في row عشان عنصر ياخد الباقي: ده بيزق التاني برّه الشاشة، الصح [[flex: 1]]. و [[height: '100%']] جوه ScrollView: مفيش ارتفاع ثابت تتحسب منه النسبة.`
          },
          lines: [
            "الـ components.",
            "شاشة شات.",
            "بيرجّع JSX.",
            "الجذر ياخد الشاشة كلها.",
            "header: ارتفاع ثابت، و row، والعناصر في النص رأسيًا ومتوزعة أفقيًا.",
            "يمين/شمال حسب اتجاه اللغة.",
            "العنوان.",
            "زرار القايمة.",
            "قفلة الـ header.",
            R`منطقة الرسايل: [[flex: 1]] تاخد كل اللي فاضل.`,
            "footer: row بمسافة بين العناصر.",
            "خانة الكتابة تاخد العرض الباقي.",
            "زرار الإرسال عرضه ثابت.",
            "قفلة الـ footer.",
            "قفلة الجذر.",
            "قفلة الـ return.",
            "قفلة الدالة."
          ],
          sol: R`من غير [[flex: 1]] على الجذر: الـ header والـ footer يظهروا ورا بعض فوق، والمنطقة الرمادية تختفي (ارتفاعها صفر)، لأن الجذر بقى ارتفاعه قد محتواه، فمفيش «مساحة فاضية» يوزعها.

من غير [[flex: 1]] على الـ View الرمادي: الـ footer يطلع لتحت الـ header على طول وتحته فراغ أبيض.

و الـ footer بـ [[column]]: خانة الكتابة تبقى فوق والزرار تحتها، وخانة الكتابة ارتفاعها بيتحسب غلط لأن [[flex: 1]] بقى على المحور الرأسي. وده بيوضّح إن [[flex]] بيشتغل على المحور الأساسي بس.`
        },
        {
          cmd: "Platform و الأبعاد",
          title: "Platform.OS و useWindowDimensions: كود لكل نظام وكل شاشة",
          desc: R`[[Platform.OS]] بيقولك [['ios']] ولا [['android']] ولا [['web']]، و [[Platform.select({ ios: ..., android: ..., default: ... })]] بيختار قيمة. ولو الفرق كبير، اعمل ملفين: [[Button.ios.tsx]] و [[Button.android.tsx]]، و Metro هيختار المناسب لوحده.

ومفيش media queries: [[useWindowDimensions()]] بيدّيك [[width]] و [[height]] و [[fontScale]]، وبيتحدث لما الشاشة تلف أو تتقسم، فتعمل layout مختلف للتابلت بـ if عادي.`,
          example: R`import { Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export function ProductGrid({ names }: { names: string[] }) {
  const { width, fontScale } = useWindowDimensions();
  const columns = width >= 768 ? 3 : 2;
  const itemWidth = (width - 16 * (columns + 1)) / columns;
  return (
    <View style={styles.grid}>
      {names.map((n) => (
        <View key={n} style={[styles.card, { width: itemWidth }]}>
          <Text numberOfLines={fontScale > 1.3 ? 2 : 1}>{n}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, padding: 16 },
  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 3 },
      default: { boxShadow: '0 2px 6px rgba(0,0,0,0.1)' },
    }),
  },
});`,
          try: R`شغّل التطبيق على الويب ([[w]] في expo start) وصغّر وكبّر نافذة المتصفح: عدد الأعمدة بيتغير؟ وبعدين كبّر حجم الخط من إعدادات الموبايل (Accessibility) وشوف [[fontScale]].`,
          flag: "script",
          deep: {
            why: R`«كود واحد» مش معناه «مفيش فروق». الظل، وشكل الـ header، والكيبورد، والصلاحيات بيختلفوا. وفيه تابلت وموبايلات صغيرة ومستخدمين مكبّرين الخط لأقصى حد. لازم تعرف تتعامل مع ده من غير ما تكرر الشاشة.`,
            how: R`[[Platform]] ثابت وقت التشغيل، و Metro بيعمل dead-code elimination للـ [[Platform.OS === 'ios']] في الـ build بتاع Android. وامتدادات الملفات: [[.ios.tsx]] و [[.android.tsx]] و [[.native.tsx]] (الاتنين) و [[.web.tsx]]، و الـ import بيكون من غير الامتداد ([[import { Button } from './Button']]). القالب نفسه فيه [[app-tabs.web.tsx]] و [[app-tabs.tsx]] بالشكل ده.

[[useWindowDimensions]] أحسن من [[Dimensions.get('window')]] لأنه hook وبيعمل re-render لما الحجم يتغير (تلف الشاشة، أو split screen، أو الويب). [[fontScale]] حجم الخط اللي المستخدم اختاره: لو 1.5 يبقى كل [[fontSize]] بيتضرب في 1.5 تلقائيًا، فالتصميم لازم يستحمل.

الظل: iOS بيستخدم [[shadow*]]، و Android القديم [[elevation]]، و [[boxShadow]] الجديد (string زي CSS) شغال على الاتنين مع الـ New Architecture، فممكن تبسّط لـ [[boxShadow]] بس لو مش هتدعم حاجة قديمة.`,
            when: R`[[Platform.select]] للفروق الصغيرة (ظل، padding، behavior الكيبورد). ملفات [[.ios]]/[[.android]] للفروق الكبيرة. و [[useWindowDimensions]] لأي layout بيتغير مع الحجم.`,
            mistakes: R`[[Dimensions.get('window')]] برّه الـ component: القيمة بتتحسب مرة ومش بتتحدث. و [[if (Platform.OS === 'ios')]] منتشرة في كل حتة بدل ما تتجمع في component واحد. و [[allowFontScaling={false}]] على كل النصوص عشان التصميم ميبوظش: كده بتكسر الـ accessibility لناس محتاجاها فعلًا، الأحسن [[maxFontSizeMultiplier]].`
          },
          lines: [
            "كل الأدوات من react-native.",
            "grid منتجات.",
            "عرض الشاشة ومقياس الخط، وبيتحدثوا لوحدهم.",
            "تابلت 3 أعمدة، وموبايل 2.",
            "عرض الكارت: العرض ناقص المسافات ومقسوم على الأعمدة.",
            "بيرجّع JSX.",
            "الـ grid.",
            "لكل اسم.",
            "كارت بالعرض المحسوب.",
            "لو الخط كبير نسمح بسطرين.",
            "قفلة الكارت.",
            "قفلة الـ map.",
            "قفلة الـ grid.",
            "قفلة الـ return.",
            "قفلة الدالة.",
            "الستايلات.",
            R`row و [[flexWrap]] بيعمل grid بسيط.`,
            "الكارت.",
            "padding.",
            "زوايا.",
            "خلفية.",
            R`نفرد قيمة [[Platform.select]] جوه الستايل.`,
            "ظل iOS.",
            "ظل Android.",
            R`الويب وأي حاجة تانية: [[boxShadow]].`,
            "قفلة.",
            "قفلة الكارت.",
            "قفلة."
          ],
          sol: R`على الويب: لما النافذة 768 أو أعرض بيبقى ٣ أعمدة، وأصغر بيبقى ٢، والكروت بتتظبط مع كل تغيير في الحجم من غير reload، لأن [[useWindowDimensions]] بيعمل re-render.

ولما تكبّر الخط من الإعدادات، [[fontScale]] بيبقى أكبر من 1 (مثلًا 1.3 أو 1.5)، والنص بيكبر في كل التطبيق تلقائيًا، وأسماء المنتجات بتاخد سطرين بدل ما تتقص من أولها. لو شفت [[fontScale]] 1 دايمًا على الويب ده طبيعي، المتصفح مش بيبعته بنفس الطريقة.`
        },
        {
          cmd: "NativeWind",
          title: "NativeWind: تكتب classes بتاعة Tailwind في React Native",
          desc: R`لو بتحب Tailwind في «تاب HTML و CSS» أو في مشاريع Next، [[NativeWind]] بيخليك تكتب [[className="flex-1 items-center bg-white dark:bg-slate-900"]] على components الـ RN، وبيحوّلها لـ style objects وقت الـ build.

النسخة المستقرة وقت كتابة الدرس (سبتمبر 2026) هي 4.x ومبنية على Tailwind v3، ونسخة 5 (مبنية على Tailwind v4) لسه release candidate. الإعداد محتاج babel و metro و tailwind config، فاتبع صفحة الـ installation بتاعة النسخة اللي هتركّبها بالظبط.`,
          example: R`// بعد إعداد NativeWind 4 (tailwind.config.js و global.css و babel و metro)
import { Pressable, Text, View } from 'react-native';

export function EmptyState({ onRetry }: { onRetry: () => void }) {
  return (
    <View className="flex-1 items-center justify-center gap-3 bg-white p-6 dark:bg-slate-900">
      <Text className="text-lg font-semibold text-slate-900 dark:text-white">مفيش نتايج</Text>
      <Pressable onPress={onRetry} className="rounded-xl bg-blue-600 px-5 py-3 active:opacity-70">
        <Text className="font-semibold text-white">جرّب تاني</Text>
      </Pressable>
    </View>
  );
}`,
          try: R`اكتب نفس الكومبوننت بـ [[StyleSheet]] من غير NativeWind، وقارن: كام سطر؟ وإيه اللي محتاج تعمله بإيدك عشان [[dark:]] و [[active:]] يشتغلوا؟`,
          flag: "script",
          deep: {
            why: R`فرق كتير بيستخدموا Tailwind على الويب، و NativeWind بيخليهم يشاركوا نفس الـ design tokens (الألوان، والمسافات) ونفس طريقة التفكير بين الموقع والتطبيق.`,
            how: R`NativeWind بيحوّل الـ classes لـ style objects (جزء وقت الـ build بـ babel و metro، وجزء وقت التشغيل للحاجات اللي بتتغير زي [[dark:]] و [[active:]] والـ breakpoints). وبيضيف [[className]] كـ prop على components الـ RN عن طريق TypeScript declaration ([[nativewind-env.d.ts]]).

مش كل Tailwind شغال: أي حاجة ملهاش مقابل في RN (grid، و hover على الموبايل، وبعض الـ selectors) مش هتشتغل أو ليها بديل. و [[active:]] بيشتغل على Pressable. والـ breakpoints ([[md:]]) بتتحسب من عرض الشاشة.

متجربتوش في الـ lab بتاعي (الإعداد تقيل وبيختلف بين 4 و 5)، فالكود فوق للتوضيح، والمرجع هو صفحة التركيب الرسمية لنسختك.`,
            when: R`فريق بيستخدم Tailwind أصلًا، أو monorepo فيه موقع Tailwind. لو الفريق مرتاح لـ StyleSheet أو عنده design system كـ components، مش لازم تضيف طبقة تانية. وفيه بدايل تانية بنفس الفكرة زي Unistyles و Tamagui.`,
            mistakes: R`تركّب 4 وتتبع docs بتاعة 5 أو العكس. وتنسى تضيف الملفات في [[content]] بتاع tailwind config فالـ classes مش بتتطبق من غير أي error. وتتوقع كل class من الويب يشتغل. وتخلط [[className]] و [[style]] على نفس العنصر وتستغرب مين كسب.`
          },
          lines: [
            "نفس components الـ RN.",
            "empty state.",
            "بيرجّع JSX.",
            R`[[className]] بدل [[style]]: نفس Tailwind، و [[dark:]] للوضع الغامق.`,
            "النص.",
            R`[[active:]] بيشتغل وقت الضغط على Pressable.`,
            "نص الزرار.",
            "قفلة.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة الدالة."
          ],
          sol: R`نسخة StyleSheet حوالي ٢٥ سطر بدل ١١، ولازم تعمل بنفسك: [[useColorScheme()]] عشان تختار ألوان الـ dark، و [[style={({ pressed }) => ...}]] على الـ Pressable بدل [[active:]]. وده بالظبط اللي NativeWind بيوفّره. في المقابل، StyleSheet مفيهوش أي إعداد ولا build step إضافي.`,
          solCode: R`import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

export function EmptyState({ onRetry }: { onRetry: () => void }) {
  const dark = useColorScheme() === 'dark';
  return (
    <View style={[styles.box, { backgroundColor: dark ? '#0f172a' : '#fff' }]}>
      <Text style={[styles.title, { color: dark ? '#fff' : '#0f172a' }]}>مفيش نتايج</Text>
      <Pressable onPress={onRetry} style={({ pressed }) => [styles.btn, pressed && { opacity: 0.7 }]}>
        <Text style={styles.btnText}>جرّب تاني</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  title: { fontSize: 18, fontWeight: '600' },
  btn: { borderRadius: 12, backgroundColor: '#2563eb', paddingHorizontal: 20, paddingVertical: 12 },
  btnText: { color: '#fff', fontWeight: '600' },
});`
        }
      ]
    },
    {
      t: "Expo Router",
      l: 2,
      n: "كل ملف في src/app شاشة: stacks و tabs و params، وحماية الشاشات بتسجيل الدخول",
      items: [
        {
          cmd: "file-based routing",
          title: "كل ملف في src/app بيبقى شاشة: index و [id] و _layout",
          desc: R`Expo Router بيعمل زي App Router في «تاب Next.js»: الملف [[src/app/settings.tsx]] هو الشاشة [[/settings]]، و [[index.tsx]] هو الجذر بتاع الفولدر، و [[[id].tsx]] route ديناميكي، و [[_layout.tsx]] بيلف كل الشاشات اللي في فولدره ويحدد نوع التنقل (Stack ولا Tabs).

والفولدر اللي اسمه بين قوسين [[(tabs)]] اسمه group: بيجمّع شاشات تحت layout واحد من غير ما يظهر في الـ URL. والتنقل بـ [[<Link href="/settings">]] أو [[router.push('/settings')]]، وكل شاشة ليها URL حقيقي، فالـ deep links ([[myapp://tasks/42]]) شغالة من غير أي إعداد.`,
          example: R`src/app/
  _layout.tsx            # الجذر: providers + Stack
  sign-in.tsx            # /sign-in
  (app)/
    _layout.tsx          # Stack للشاشات اللي محتاجة login
    (tabs)/
      _layout.tsx        # Tabs
      index.tsx          # /  (تاب المهام)
      settings.tsx       # /settings
    tasks/
      [id].tsx           # /tasks/42
  +not-found.tsx         # أي مسار مش موجود`,
          try: R`اعمل الشجرة دي في الـ lab (ملفات فاضية بتعمل [[export default function]] وترجع [[<Text>]] باسم الشاشة). وبعدين افتح [[/_sitemap]] في الويب ([[w]] في expo start) أو من الموبايل: هتلاقي كل الـ routes. وجرّب [[npx uri-scheme open rnlab://tasks/7 --android]] لو عندك emulator.`,
          deep: {
            why: R`في React Navigation العادي بتكتب كل الشاشات والتنقل بإيدك في config كبير، والـ deep links محتاجة جدول منفصل. Expo Router بيخلي هيكل الملفات هو الـ config، فالـ deep links والـ typed routes والويب بيشتغلوا لوحدهم، ولو جاي من Next.js هتحس إنك في البيت.`,
            how: R`Expo Router مبني فوق React Navigation: [[Stack]] هو native stack navigator (نفس انتقالات iOS و Android الأصلية)، و [[Tabs]] هو bottom tabs. الـ router بيقرا فولدر [[src/app]] وقت الـ build (عن طريق Metro) ويبني منه شجرة navigators.

[[_layout.tsx]] بيرجّع navigator ([[<Stack />]] أو [[<Tabs />]] أو [[<Slot />]] لو من غير navigator)، وكل ملف في نفس الفولدر بيبقى screen جواه. الفولدرات المتداخلة بتعمل navigators متداخلة: هنا Stack جواه Tabs، فشاشة التفاصيل [[tasks/[id]]] بتفتح فوق التابات (من غير tab bar)، وده السلوك اللي المستخدم متعود عليه.

الـ groups [[(app)]] و [[(tabs)]] مش بتظهر في الـ URL: [[/settings]] مش [[/(app)/(tabs)/settings]]. و [[+not-found.tsx]] للمسارات المجهولة. والملفات اللي بتبدأ بـ [[+]] زي [[+html.tsx]] و [[+api.ts]] ليها معاني خاصة (API routes على السيرفر، زي Next).

مع [[experiments.typedRoutes]] في app.json (مفعّل في القالب)، Expo بيولّد [[.expo/types/router.d.ts]] وقت [[expo start]]، فـ [[router.push('/taskz/1')]] بيطلع خطأ TypeScript. جربتها في الـ lab: المسار الغلط اتمسك بـ [[@ts-expect-error]] والصح عدّى.`,
            when: R`أي مشروع Expo جديد (القالب بيبدأ بيه). React Navigation لوحده لسه موجود ومناسب لمشاريع قديمة أو لو عايز تحكم كامل من غير ملفات.`,
            mistakes: R`تحط components أو hooks جوه [[src/app]] فتتحول شاشات وتظهر في الـ sitemap. وتنسى [[export default]] في ملف الشاشة: «missing the required default export». واسمين بيعملوا نفس المسار ([[settings.tsx]] و [[settings/index.tsx]]): خطأ. وتتوقع إن الـ group بيظهر في الـ URL.`
          },
          lines: [
            "فولدر الشاشات.",
            "layout الجذر.",
            "شاشة تسجيل الدخول.",
            "group ميظهرش في الـ URL.",
            "layout الشاشات المحمية.",
            "group التابات.",
            "layout التابات.",
            "أول تاب.",
            "تاني تاب.",
            "فولدر عادي بيظهر في المسار.",
            "route ديناميكي: [id] بياخد أي قيمة.",
            "شاشة الـ 404."
          ],
          sol: R`[[/_sitemap]] المفروض يعرض: [[/]] و [[/settings]] و [[/sign-in]] و [[/tasks/[id]]] و [[/_sitemap]] نفسه. مفيش [[(app)]] ولا [[(tabs)]] في أي مسار.

لما عملت export للويب في الـ lab بنفس الشجرة، Expo طلّع صفحات static لـ [[/]] و [[/sign-in]] و [[/settings]] و [[/tasks/[id]]] وغيرهم. ولو [[uri-scheme]] فتح التطبيق على شاشة المهمة 7، يبقى الـ scheme في app.json مظبوط والـ deep link شغال من غير أي كود.`
        },
        {
          cmd: "Stack",
          title: "Stack: تفتح شاشة فوق شاشة، وتغيّر العنوان والزراير",
          desc: R`[[<Stack />]] في [[_layout.tsx]] بيخلي الشاشات تتفتح فوق بعض بانتقال النظام، وفيه زرار رجوع وسحب للرجوع على iOS. إعدادات كل شاشة (العنوان، والـ header، ونوع العرض [[modal]]) بتتكتب في [[<Stack.Screen name="..." options={{...}} />]] جوه الـ layout، أو من جوه الشاشة نفسها بـ [[<Stack.Screen options={...} />]] لما العنوان جاي من البيانات.

والتنقل: [[router.push]] (يضيف شاشة)، و [[router.replace]] (يبدّل الحالية، مفيش رجوع)، و [[router.back]]، و [[router.dismissTo]].`,
          example: R`// src/app/(app)/_layout.tsx
import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: 'رجوع' }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="tasks/[id]" options={{ title: 'تفاصيل المهمة' }} />
      <Stack.Screen name="new-task" options={{ presentation: 'modal', title: 'مهمة جديدة' }} />
    </Stack>
  );
}`,
          try: R`ضيف شاشة [[new-task.tsx]] فيها زرار «حفظ» بيعمل [[router.back()]]، وافتحها من تاب المهام بـ [[<Link href="/new-task">]]. جرّب مرة بـ [[presentation: 'modal']] ومرة من غيرها وشوف الفرق في الانتقال.`,
          flag: "script",
          deep: {
            why: R`تقريبًا كل تدفق في التطبيق Stack: قايمة ثم تفاصيل ثم تعديل. لازم تعرف تتحكم في العنوان والزراير وإمتى تستخدم push ولا replace، وإلا المستخدم هيدوس رجوع ويلاقي نفسه في شاشة الـ login تاني.`,
            how: R`Stack في Expo Router هو [[@react-navigation/native-stack]] تحت: الانتقالات والـ header native فعلًا (UINavigationController على iOS، و Fragments على Android). [[screenOptions]] على الـ Stack بتطبّق على كل الشاشات، و [[options]] على Screen معين بتغلبها.

[[name]] هو المسار النسبي للملف من غير الامتداد ([[tasks/[id]]] و [[(tabs)]]). مش لازم تكتب كل شاشة: اللي مش مكتوبة بتتضاف بإعدادات افتراضية، بس الترتيب والـ options بتتحدد من المكتوب.

من جوه الشاشة: [[<Stack.Screen options={{ title: data?.title }} />]] بيحدّث الـ header من البيانات (موجود في شاشة التفاصيل في الـ lab). و [[headerRight: () => <Button />]] لزرار في الـ header.

[[router.push]] بيضيف للـ history دايمًا، و [[router.navigate]] بيرجع للشاشة لو موجودة في الـ stack بدل ما يضيف نسخة تانية، و [[router.replace]] بعد login أو onboarding عشان الرجوع ميرجعش لهم. و [[presentation: 'modal']] بيفتح الشاشة من تحت لفوق (sheet على iOS).`,
            when: R`Stack للتدفقات اللي فيها رجوع. Modal للمهام المستقلة القصيرة (إنشاء، فلترة، تأكيد). و [[replace]] بعد أي خطوة مش المفروض يرجع لها.`,
            mistakes: R`[[headerShown: false]] على الـ Stack كله وتنسى إن شاشة التفاصيل كده مفيهاش زرار رجوع على Android. وشاشة tabs جوه stack وكل واحد فيهم header فيظهر header مزدوج (الحل [[headerShown: false]] على [[(tabs)]] زي المثال). و [[router.push('/')]] بعد login بدل [[replace]]. واسم في [[name]] مش مطابق لمسار ملف: تحذير «No route named ...».`
          },
          lines: [
            "Stack من expo-router.",
            "layout.",
            "بيرجّع JSX.",
            "إعدادات لكل الشاشات: نص زرار الرجوع على iOS.",
            "التابات من غير header من الـ Stack (عندها header بتاعها).",
            "عنوان شاشة التفاصيل.",
            "شاشة بتتفتح modal.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة الدالة."
          ],
          sol: R`بـ [[presentation: 'modal']] الشاشة بتطلع من تحت كـ sheet على iOS (والشاشة اللي وراها باينة)، وعلى Android بانتقال مختلف حسب النسخة. ومن غيرها بتدخل من الجنب زي أي push. و [[router.back()]] بيقفلها في الحالتين.

لو الشاشة مفتحتش ولقيت «Unmatched Route»: اتأكد إن الملف في نفس فولدر الـ layout ([[src/app/(app)/new-task.tsx]]) وإن الـ href بدون الـ groups ([[/new-task]]).`,
          solCode: R`// src/app/(app)/new-task.tsx
import { router } from 'expo-router';
import { Button, View } from 'react-native';

export default function NewTask() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="حفظ" onPress={() => router.back()} />
    </View>
  );
}
// في تاب المهام:
// <Link href="/new-task">مهمة جديدة</Link>`
        },
        {
          cmd: "Tabs",
          title: "Tabs: شريط تابات تحت بأيقونات",
          desc: R`[[<Tabs />]] في [[_layout.tsx]] بيعمل bottom tab bar، وكل ملف في الفولدر بيبقى تاب. بتحدد العنوان والأيقونة لكل تاب بـ [[<Tabs.Screen name="..." options={{ title, tabBarIcon }} />]]، ولو عايز تخبّي ملف من التابات: [[href: null]].

القالب الجديد في SDK 57 بيستخدم [[NativeTabs]] من [[expo-router/unstable-native-tabs]] (تابات native حقيقية، بشكل iOS الحديث)، بس الـ API بتاعها لسه «unstable» واسمها بيقول كده. [[Tabs]] العادي (JS) ثابت ومتوثق، وده اللي هنبدأ بيه.`,
          example: R`// src/app/(app)/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#2563eb' }}>
      <Tabs.Screen
        name="index"
        options={{ title: 'المهام', tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: 'الإعدادات', tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} /> }}
      />
    </Tabs>
  );
}`,
          try: R`ضيف تاب تالت «الإشعارات» فيه badge بعدد ([[tabBarBadge: 3]]). وبعدين افتح شاشة تفاصيل مهمة من تاب المهام، وروح تاب الإعدادات وارجع: لسه على شاشة التفاصيل ولا رجعت للقايمة؟`,
          flag: "script",
          deep: {
            why: R`الـ tabs هي الـ navigation الرئيسي في أغلب التطبيقات (٣-٥ أقسام). لازم تعرف تركّبها جوه Stack صح، وإلا هتلاقي tab bar ظاهر في شاشات المفروض تكون full screen، أو header مكرر.`,
            how: R`[[Tabs]] هو [[@react-navigation/bottom-tabs]]. كل تاب بيحتفظ بالـ state بتاعه (الـ scroll، والبيانات) لما تنقل بين التابات، لأن الشاشات مش بتتشال. ولو التاب نفسه فولدر فيه [[_layout.tsx]] بـ Stack، التاب بيبقى ليه history خاص بيه (تفتح تفاصيل جوه التاب والـ tab bar يفضل ظاهر).

[[tabBarIcon]] بتاخد [[{ focused, color, size }]] فتغيّر الأيقونة لما التاب يتختار. [[@expo/vector-icons]] فيه Ionicons و MaterialIcons وغيرهم. القالب الجديد في SDK 57 مش بيركّبه (بيستخدم صور و expo-symbols)، فركّبه بـ [[npx expo install @expo/vector-icons]].

في الـ lab: الـ Stack في [[(app)/_layout.tsx]] جواه [[(tabs)]] وشاشة [[tasks/[id]]]، فالتفاصيل بتفتح فوق التابات والـ tab bar بيختفي. ولو عايز التفاصيل جوه التاب (والـ bar ظاهر)، حط [[tasks/[id].tsx]] جوه فولدر التاب واعمله Stack.

[[NativeTabs]]: بيستخدم UITabBarController و Material bottom navigation الحقيقيين (شكل iOS 26 الـ liquid glass مثلًا)، بس الـ API ممكن يتغير بين الـ SDKs.`,
            when: R`٣ لـ ٥ أقسام رئيسية متساوية. أكتر من كده: drawer أو شاشة «المزيد». و NativeTabs لو الشكل الأصلي مهم وموافق إن الـ API يتغير.`,
            mistakes: R`تفتح شاشة تفاصيل من تاب فتلاقي الـ tab bar ظاهر وانت مش عايزه (أو العكس) لأنك حاطط الملف في المكان الغلط. و [[name]] مش مطابق لاسم الملف (index مش home). وأيقونة من مكتبة مش متركبة فيظهر مربع فاضي.`
          },
          lines: [
            R`مكتبة أيقونات (ركّبها بـ [[npx expo install @expo/vector-icons]]).`,
            "Tabs من expo-router.",
            "layout التابات.",
            "بيرجّع JSX.",
            "لون التاب المختار لكل التابات.",
            "بداية تاب.",
            R`[[index.tsx]] في نفس الفولدر.`,
            "العنوان والأيقونة، واللون والحجم جايين من الـ navigator.",
            "قفلة.",
            "تاب تاني.",
            R`[[settings.tsx]].`,
            "أيقونة مختلفة.",
            "قفلة.",
            "قفلة Tabs.",
            "قفلة الـ return.",
            "قفلة الدالة."
          ],
          sol: R`التاب التالت بيظهر بـ badge أحمر فيه 3. ملف [[notifications.tsx]] جنب [[settings.tsx]] و [[<Tabs.Screen name="notifications" options={{ title: 'الإشعارات', tabBarBadge: 3 }} />]].

ولما تفتح التفاصيل من تاب المهام في هيكل الـ lab، التفاصيل فوق التابات كلها (الـ tab bar مختفي)، فمفيش تاب إعدادات تروحله من غير ما ترجع. لو نقلت [[tasks/[id]]] جوه فولدر التاب مع Stack، هتلاقي التفاصيل محفوظة لما تروح الإعدادات وترجع، لأن كل تاب بيحتفظ بالـ stack بتاعه.`,
          solCode: R`// src/app/(app)/(tabs)/notifications.tsx
import { Text, View } from 'react-native';

export default function Notifications() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>مفيش إشعارات جديدة</Text>
    </View>
  );
}
// في (tabs)/_layout.tsx:
// <Tabs.Screen name="notifications" options={{ title: 'الإشعارات', tabBarBadge: 3 }} />`
        },
        {
          cmd: "params",
          title: "تبعت params لشاشة وتقراها: useLocalSearchParams و Link",
          desc: R`الـ route [[tasks/[id].tsx]] بياخد [[id]] من المسار، وبتقراه بـ [[useLocalSearchParams<{ id: string }>()]]. وأي params زيادة بتتبعت query string ([[/tasks/42?tab=comments]]) وبتتقري بنفس الطريقة.

وللتنقل: [[<Link href={{ pathname: '/tasks/[id]', params: { id: 42 } }}>]] أو [[router.push({ pathname, params })]]. مع typed routes، TypeScript بيجبرك تبعت [[id]] وبيرفض مسار مش موجود. والقيم دايمًا بتوصل strings: الـ URL مفيهوش أرقام.`,
          example: R`// src/app/(app)/tasks/[id].tsx
import { useQuery } from '@tanstack/react-query';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { api } from '@/lib/api';

type Task = { id: number; title: string; done: boolean };

export default function TaskDetails() {
  const { id, tab = 'info' } = useLocalSearchParams<{ id: string; tab?: string }>();
  const { data } = useQuery({ queryKey: ['tasks', id], queryFn: () => api<Task>($__bt/api/tasks/$__{id}$__bt) });
  return (
    <View style={{ flex: 1, padding: 16, gap: 8 }}>
      <Stack.Screen options={{ title: data?.title ?? 'تحميل...' }} />
      <Text>التاب الحالي: {tab}</Text>
      <Link href={{ pathname: '/tasks/[id]', params: { id, tab: 'comments' } }}>التعليقات</Link>
    </View>
  );
}`,
          try: R`في شاشة القايمة خلّي كل صف يفتح التفاصيل بـ [[router.push({ pathname: '/tasks/[id]', params: { id: item.id } })]]. وبعدين جرّب تكتب [[router.push('/taskz/1')]] وشوف TypeScript قال إيه (لازم تكون شغّلت [[expo start]] مرة عشان الأنواع تتولّد).`,
          flag: "script",
          deep: {
            why: R`كل شاشة تفاصيل محتاجة id. ولو فهمت إن الـ params جزء من الـ URL، هتفهم ليه مينفعش تبعت objects كبيرة فيها، وليه الشاشة لازم تجيب بياناتها بنفسها (وده اللي بيخلي الـ deep links والـ refresh يشتغلوا).`,
            how: R`[[useLocalSearchParams]] بيرجّع params الشاشة الحالية (المسار + الـ query). وفيه [[useGlobalSearchParams]] بيرجّع params الـ route اللي فوق خالص، وبيعمل re-render لكل الشاشات لما يتغير، فـ Local هو الافتراضي الصح.

الـ generic [[<{ id: string }>]] مجرد نوع (مفيش validation)، فلو محتاج رقم: [[Number(id)]]، ولو القيمة ممكن تيجي array (نفس المفتاح مرتين في الـ query) النوع الحقيقي [[string | string[]]].

[[router.setParams({ tab: 'comments' })]] بيغيّر params الشاشة الحالية من غير ما يفتح شاشة جديدة (مفيد للفلاتر).

ليه متبعتش الـ object كله؟ الـ params بتتحول string في الـ URL، والـ deep link أو إعادة فتح التطبيق مش هيبقى معاه غير الـ id. الصح: ابعت id، والشاشة تجيب بـ [[useQuery]] بنفس الـ key، ولو القايمة جابت العنصر قبل كده ممكن تستخدم [[initialData]] أو [[placeholderData]] من الـ cache (درس TanStack Query).

جربت في الـ lab: [[router.push({ pathname: '/tasks/[id]', params: { id: 42 } })]] عدّت الـ typecheck (الرقم مسموح في الإدخال)، و [[router.push('/taskz/42')]] اتمسكت.`,
            when: R`id في المسار لأي «عنصر» (منتج، مهمة، مستخدم). query params للحاجات الاختيارية (تاب، فلتر، ترتيب).`,
            mistakes: R`[[params: { task: JSON.stringify(task) }]]: بيشتغل لحد ما حد يفتح deep link أو البيانات تتغير. و [[id === 42]] والـ id string فالشرط دايمًا false. و [[useGlobalSearchParams]] في كل حتة فكل الشاشات بتعيد الرسم. وتنسى إن [[typedRoutes]] بيحتاج [[expo start]] يولّد الأنواع، فتفتكر إن الـ typing مش شغال.`
          },
          lines: [
            "useQuery للبيانات.",
            "Link و Stack و hook الـ params.",
            "الـ components.",
            "الـ API client (درس الـ backend).",
            "نوع المهمة.",
            "الشاشة.",
            R`[[id]] من المسار، و [[tab]] من الـ query، بقيمة افتراضية. كلهم strings.`,
            "نجيب المهمة بالـ id، والـ key فيه الـ id.",
            "بيرجّع JSX.",
            "الصندوق.",
            "عنوان الـ header من البيانات.",
            "نعرض الـ param.",
            "Link لنفس الشاشة بـ query مختلف (مع typed routes، pathname متفحوص).",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة الدالة."
          ],
          sol: R`كل صف بيفتح [[/tasks/1]] و [[/tasks/2]]... والـ header بيتغير لعنوان المهمة لما البيانات تيجي. و [[router.push('/taskz/1')]] بيطلّع خطأ TS بيقول إن [["/taskz/1"]] مش assignable لنوع [[Href]].

لو مفيش خطأ: الأنواع لسه متولّدتش (شغّل [[npx expo start]] مرة، وهيعمل [[.expo/types/router.d.ts]] و [[expo-env.d.ts]])، أو [[typedRoutes]] مش مفعّل في app.json.`,
          solCode: R`<TaskRow
  task={item}
  onPress={() => router.push({ pathname: '/tasks/[id]', params: { id: item.id } })}
/>`
        },
        {
          cmd: "Stack.Protected",
          title: "تحمي الشاشات بتسجيل الدخول: Stack.Protected و Redirect",
          desc: R`الطريقة الحالية في Expo Router: في الـ layout الجذر، لف الشاشات المحمية في [[<Stack.Protected guard={!!token}>]] وشاشة الـ login في [[<Stack.Protected guard={!token}>]]. لو الـ guard بـ false، الشاشات دي كأنها مش موجودة: أي محاولة توصلها (حتى deep link) بتتحوّل لأول شاشة متاحة، ولما الـ token يتغير التحويل بيحصل لوحده.

الطريقة الأقدم لسه شغالة: في layout الشاشات المحمية، لو مفيش session ارجع [[<Redirect href="/sign-in" />]].`,
          example: R`// src/app/_layout.tsx
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SessionProvider, useSession } from '@/lib/session';

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { token, isLoading } = useSession();
  useEffect(() => { if (!isLoading) SplashScreen.hideAsync(); }, [isLoading]);
  if (isLoading) return null;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!token}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!token}>
        <Stack.Screen name="sign-in" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SessionProvider>
      <RootNavigator />
    </SessionProvider>
  );
}`,
          try: R`اكتب اختبار بـ [[renderRouter]] من [[expo-router/testing-library]] فيه layout بـ [[Stack.Protected guard={false}]] حوالين [[index]]، وشاشة [[sign-in]] برّه. اتأكد إن المستخدم اتحوّل لـ [[/sign-in]]. (الـ setup بتاع jest في المستوى ٣، والحل تحت شغال زي ما هو.)`,
          flag: "script",
          deep: {
            why: R`أشهر bugs الـ auth في الموبايل: الشاشة المحمية بتظهر ثانية قبل التحويل، أو زرار الرجوع بعد الـ login بيرجّعك لشاشة الـ login، أو deep link بيفتح شاشة محمية من غير login. Stack.Protected بيحل التلاتة بـ declarative code بدل useEffect و router.replace في كل حتة.`,
            how: R`لما [[guard]] يبقى false، Expo Router بيشيل الشاشات دي من الـ navigator. لو المستخدم واقف عليها، بيتنقل لأول شاشة متاحة، والـ history بتاع الشاشات المحمية بيتمسح (فالرجوع مش هيرجّعه). فلما [[signOut]] يخلّي الـ token بـ null، التطبيق بيروح [[sign-in]] لوحده، ولما [[signIn]] يحط token، بيروح [[(app)]].

[[isLoading]]: أول ما التطبيق يفتح، الـ token لسه بيتقري من SecureStore (async). لو رسمت الـ Stack قبل ما تعرف، هيفتح sign-in ثانية وبعدين يقفز. عشان كده بنرجّع [[null]] ونسيب الـ splash screen ظاهرة ([[preventAutoHideAsync]]) لحد ما نعرف، وبعدين [[hideAsync]].

ده حماية UI بس. الحماية الحقيقية على السيرفر: كل endpoint بيتأكد من التوكن ([[requireAuth]] في «تاب Backend بـ Node»). أي حد ممكن يعدّل التطبيق أو ينادي الـ API مباشرة.

في الـ lab عملت اختبارين بـ [[renderRouter]]: مع [[guard={false}]] الـ pathname بقى [[/sign-in]] و Home مش ظاهرة، ومع [[guard]] true فضل [[/]]. ملحوظة: في النسخ اللي جربتها (expo-router 57 مع RNTL 14) [[renderRouter]] بيرجّع promise، و [[expect(screen).toHavePathname()]] المكتوبة في الـ docs مشتغلتش، فاستخدمت [[result.getPathname()]].`,
            when: R`أي تطبيق فيه login. ونفس الفكرة لحاجات تانية: onboarding لازم يخلص الأول، أو شاشات للأدمن بس ([[guard={user.role === 'admin'}]]).`,
            mistakes: R`[[useEffect(() => { if (!token) router.replace('/sign-in') })]] في كل شاشة: flash للمحتوى ولخبطة في الـ history. وتنسى حالة [[isLoading]] فالمستخدم المسجّل يشوف شاشة الـ login لحظة كل مرة يفتح. وتعتمد على الحماية دي كأنها security. وتحط الـ provider جوه الـ component اللي بيستخدم [[useSession]] نفسه (لازم يكون فوقه، عشان كده فيه [[RootNavigator]] منفصل).`
          },
          lines: [
            "Stack.",
            "التحكم في الـ splash screen.",
            "useEffect.",
            "الـ session من context (الكود الكامل في درس الـ session).",
            "خلي الـ splash ظاهرة لحد ما نقولها.",
            "component منفصل عشان يقدر يستخدم useSession تحت الـ provider.",
            "التوكن وهل لسه بنقراه.",
            "لما القراية تخلص، شيل الـ splash.",
            "لسه مش عارفين: متعرضش حاجة (الـ splash فوق).",
            "بيرجّع JSX.",
            "Stack الجذر.",
            "الشاشات دي موجودة بس لو فيه token.",
            "كل الـ group المحمي.",
            "قفلة.",
            "ودي موجودة بس لو مفيش token.",
            "شاشة الدخول.",
            "قفلة.",
            "قفلة Stack.",
            "قفلة الـ return.",
            "قفلة.",
            "الـ layout الجذر.",
            "بيرجّع JSX.",
            "الـ provider فوق كل حاجة.",
            "الـ navigator.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`الاختبار المفروض يعدّي: الـ pathname [[/sign-in]] ونص «Sign in» ظاهر و «Home» لأ. غيّر [[guard]] لـ true في اختبار تاني: الـ pathname يفضل [[/]].

لو لقيت «render function has not been called»: انت مش عامل [[await]] على [[renderRouter]] (في RNTL 14 الـ render بقى async). ولو [[toHavePathname]] قال «getPathname is not a function»: استخدم القيمة اللي [[renderRouter]] رجّعها زي الحل.`,
          solCode: R`import { renderRouter, screen } from 'expo-router/testing-library';
import { Stack } from 'expo-router';
import { Text } from 'react-native';

function Layout({ loggedIn }: { loggedIn: boolean }) {
  return (
    <Stack>
      <Stack.Protected guard={loggedIn}>
        <Stack.Screen name="index" />
      </Stack.Protected>
      <Stack.Screen name="sign-in" />
    </Stack>
  );
}

test('guest is sent to sign-in', async () => {
  const router = renderRouter({
    _layout: () => <Layout loggedIn={false} />,
    index: () => <Text>Home</Text>,
    'sign-in': () => <Text>Sign in</Text>,
  }, { initialUrl: '/' });
  await router;
  expect(await screen.findByText('Sign in')).toBeOnTheScreen();
  expect(router.getPathname()).toBe('/sign-in');
  expect(screen.queryByText('Home')).toBeNull();
});`
        }
      ]
    },
    {
      t: "بيانات السيرفر بـ TanStack Query",
      l: 2,
      n: "نفس useQuery و useMutation من تاب React، بس مع AppState والنت المقطوع والسحب للتحديث والقوايم اللانهائية",
      items: [
        {
          cmd: "useQuery في RN",
          title: "TanStack Query في RN: نفس الـ API، بس مين بيقول «التطبيق رجع»؟",
          desc: R`[[useQuery]] و [[useMutation]] زي ما اتعلمتهم في «تاب React» بالظبط. الفرق إن TanStack Query على الويب بيعرف إن المستخدم رجع للصفحة من event الـ focus بتاع المتصفح، وبيعرف إن النت رجع من [[online]]. في RN مفيش الاتنين، فلازم توصلهم بنفسك: [[AppState]] للتطبيق لما يرجع من الخلفية، و [[@react-native-community/netinfo]] للنت.

من غيرهم، [[refetchOnWindowFocus]] مش هيعمل حاجة، والبيانات مش هتتحدث لما المستخدم يرجع للتطبيق بعد ساعة.`,
          example: R`import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import { useEffect, type PropsWithChildren } from 'react';
import { AppState, Platform } from 'react-native';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
});

function useAppStateFocus() {
  useEffect(() => {
    const sub = AppState.addEventListener('change', (status) => {
      if (Platform.OS !== 'web') focusManager.setFocused(status === 'active');
    });
    return () => sub.remove();
  }, []);
}

export function QueryProvider({ children }: PropsWithChildren) {
  useAppStateFocus();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}`,
          try: R`ركّب [[@react-native-community/netinfo]] بـ [[npx expo install]] وضيف [[onlineManager.setEventListener]] زي الحل. وبعدين في شاشة المهام ضيف [[console.log('fetch')]] في الـ queryFn: اقفل التطبيق للخلفية دقيقة وارجع، اتطبع؟`,
          flag: "script",
          deep: {
            why: R`على الموبايل المستخدم بيسيب التطبيق ويرجعله طول اليوم، والنت بيقطع في الأسانسير والمترو. من غير الربط ده، هيشوف بيانات قديمة لحد ما يقفل التطبيق خالص، أو الطلبات هتفشل وهو offline بدل ما تستنى.`,
            how: R`[[focusManager]] و [[onlineManager]] في TanStack Query هما اللي بيقرروا «هل أعيد التحميل دلوقتي». على الويب بيسمعوا events المتصفح لوحدهم. في RN بتقولهم انت: [[AppState]] بيبعت [['active']] لما التطبيق يبقى قدام المستخدم و [['background']] أو [['inactive']] غير كده، فبتنادي [[focusManager.setFocused]]. ومع [[refetchOnWindowFocus: true]] (الافتراضي)، كل query الـ data بتاعتها stale وعليها observer هتعيد التحميل لما التطبيق يرجع [[active]].

[[onlineManager.setEventListener]] بيسجل listener بيقول online/offline. لما يبقى offline، الـ queries بتتحط في pause بدل ما تفشل، ولما النت يرجع بتكمل (networkMode الافتراضي [['online']]).

[[staleTime: 30_000]]: البيانات تفضل fresh ٣٠ ثانية، فالتنقل السريع بين الشاشات مش بيعمل طلبات. تفاصيل staleTime و gcTime في «تاب React».

والـ [[Platform.OS !== 'web']] لأن على الويب TanStack بيسمع الـ focus بنفسه.

جربت الـ provider ده في الـ lab، والاختبار بتاع شاشة المهام بيلفها بـ QueryClientProvider جديد بـ [[retry: false]]. الـ AppState نفسه محتاج جهاز حقيقي عشان تشوفه.`,
            when: R`مرة واحدة في الـ root layout لأي تطبيق بيستخدم TanStack Query. وممكن كمان [[useRefreshOnFocus]] صغير يعمل refetch لما الشاشة ترجع focus في الـ navigator ([[useFocusEffect]] من expo-router).`,
            mistakes: R`تفتكر إن [[refetchOnWindowFocus]] شغال لوحده في RN. وتعمل [[new QueryClient()]] جوه component فيتعمل واحد جديد كل render والـ cache يروح. وتنسى [[sub.remove()]] في الـ cleanup. و [[staleTime: 0]] (الافتراضي) مع شاشات كتير بتعرض نفس البيانات: طلبات كتير مالهاش لازمة.`
          },
          lines: [
            "العميل والـ provider والـ focusManager.",
            "hooks.",
            "AppState بيقول التطبيق قدام المستخدم ولا في الخلفية.",
            "client واحد برّه أي component.",
            "البيانات fresh ٣٠ ثانية، ومحاولة إعادة واحدة لو فشل.",
            "قفلة.",
            "hook بيربط AppState بـ TanStack.",
            "effect مرة واحدة.",
            "اسمع تغيير حالة التطبيق.",
            R`[[active]] يعني قدام المستخدم = focused.`,
            "قفلة.",
            "cleanup.",
            "قفلة.",
            "قفلة.",
            "provider بنحطه في الـ root layout.",
            "شغّل الربط.",
            "الـ provider.",
            "قفلة."
          ],
          sol: R`بعد ما ترجع من الخلفية، هتلاقي [[fetch]] اتطبع مرة، لأن البيانات عدّى عليها أكتر من [[staleTime]] (٣٠ ثانية) والتطبيق بقى [[active]]. لو رجعت بعد ١٠ ثواني بس، مش هيتطبع (لسه fresh).

ومع NetInfo: اقفل الواي فاي والداتا وافتح شاشة جديدة: الـ query هتفضل [[fetchStatus: 'paused']] (مش error)، وأول ما النت يرجع هتكمل لوحدها.`,
          solCode: R`import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

onlineManager.setEventListener((setOnline) =>
  NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  }),
);`
        },
        {
          cmd: "useMutation و invalidate",
          title: "تعدّل على السيرفر وتحدّث القايمة: useMutation و invalidateQueries",
          desc: R`نفس اللي في «تاب React»: [[useMutation]] للـ POST و PATCH و DELETE، وبعد النجاح [[queryClient.invalidateQueries({ queryKey: ['tasks'] })]] عشان القايمة تتحدث. و [[isPending]] بتقفل الزرار وقت الإرسال.

الفرق في الموبايل إن النت أبطأ وبيقطع، فالـ optimistic update (تغيّر الشاشة قبل ما السيرفر يرد، وترجع لو فشل) بيفرق في الإحساس أكتر من الويب. زي علامة ✓ على مهمة: المستخدم مستني يشوفها فورًا.`,
          example: R`import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

type Task = { id: number; title: string; done: boolean };

export function useToggleTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (t: Task) => api<Task>($__bt/api/tasks/$__{t.id}$__bt, { method: 'PATCH', body: JSON.stringify({ done: !t.done }) }),
    onMutate: async (t) => {
      await qc.cancelQueries({ queryKey: ['tasks'] });
      const previous = qc.getQueryData<Task[]>(['tasks']);
      qc.setQueryData<Task[]>(['tasks'], (old) => old?.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)));
      return { previous };
    },
    onError: (_err, _t, ctx) => qc.setQueryData(['tasks'], ctx?.previous),
    onSettled: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  });
}`,
          try: R`استخدم [[useToggleTask]] في [[TaskRow]]: الضغطة تعمل [[toggle.mutate(task)]]. وبعدين خلّي السيرفر (أو mock) يرجّع 500: شوف العلامة بتتقلب وترجع. ضيف [[Alert.alert('مقدرناش نحفظ')]] في [[onError]].`,
          flag: "script",
          deep: {
            why: R`كل تطبيق فيه أفعال: like، و حفظ، و حذف، وتعليم كمقروء. لو المستخدم استنى ثانية ونص على 3G عشان يشوف العلامة، هيحس إن التطبيق بطيء أو هيضغط تاني. والـ optimistic update بيخلي الإحساس فوري، والـ rollback بيحافظ على الصح.`,
            how: R`[[onMutate]] بيشتغل قبل الطلب: بنلغي أي refetch شغال (عشان ميكتبش فوق التعديل بتاعنا)، ونحفظ نسخة من الـ cache، ونعدّل الـ cache فورًا بـ [[setQueryData]] (immutable update زي React). اللي بنرجّعه بيبقى [[context]] في [[onError]] و [[onSettled]].

[[onError]] بيرجّع النسخة القديمة. و [[onSettled]] (نجاح أو فشل) بيعمل invalidate عشان نتأكد إن الشاشة مطابقة للسيرفر في الآخر.

الـ key [[['tasks']]] بيطابق [[['tasks', id]]] كمان (prefix matching)، فشاشة التفاصيل بتتحدث برضه. تفاصيل الـ query key factory في «تاب React».

في RN خلي بالك من الـ Alert: [[Alert.alert]] native dialog، مش [[window.alert]].

الـ pattern ده هو نفسه اللي في «تاب React» (درس optimistic update)، مكتوب بـ types هنا ومتفحوص بالـ typecheck في الـ lab، والـ rollback محتاج API أو MSW عشان تشوفه بعينك.`,
            when: R`optimistic: أفعال صغيرة ونسبة فشلها قليلة (toggle، like، إعادة ترتيب). invalidate بس: إنشاء عنصر جديد محتاج id من السيرفر، أو عمليات فيها فلوس (دفع) لازم تستنى تأكيد السيرفر.`,
            mistakes: R`تنسى [[cancelQueries]] فـ refetch قديم يرجع ويمسح التعديل. وتعدّل الـ array نفسه ([[old.find(...).done = true]]) بدل نسخة جديدة فالشاشة متتحدثش. و optimistic في الدفع. ومفيش رسالة للمستخدم لما الـ rollback يحصل فيفتكر إنه بيتهيأله.`
          },
          lines: [
            "hooks الـ mutation والـ client.",
            "الـ API client.",
            "نوع المهمة.",
            "custom hook لتقليب حالة مهمة.",
            "الـ cache.",
            "بيرجّع الـ mutation.",
            "الطلب نفسه: PATCH بالعكس.",
            "قبل الطلب:",
            "الغي أي تحميل شغال للقايمة.",
            "احفظ نسخة للرجوع.",
            "عدّل الـ cache فورًا (immutable).",
            "النسخة القديمة بتروح لـ onError.",
            "قفلة.",
            "لو فشل: رجّع القديم.",
            "في الآخر: هات من السيرفر عشان نتأكد.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`الضغطة بتقلب الشطب على المهمة فورًا من غير أي انتظار. ولما السيرفر يرجّع 500: العلامة بترجع زي ما كانت بعد ما الطلب يفشل (بعد الـ retry لو فيه، والـ mutations افتراضيًا [[retry: 0]])، والـ Alert بيظهر. وبعد [[onSettled]] القايمة بتتجاب تاني.

لو العلامة مش بتتقلب خالص: غالبًا الـ key مش مطابق (القايمة [[['tasks']]] و انت بتعدّل [[['task']]])، أو [[TaskRow]] ملفوف في [[memo]] والـ prop اللي بيتغير مش واصل له.`,
          solCode: R`import { Alert } from 'react-native';
// جوه useToggleTask:
onError: (_err, _t, ctx) => {
  qc.setQueryData(['tasks'], ctx?.previous);
  Alert.alert('مقدرناش نحفظ', 'اتأكد من النت وجرّب تاني');
},
// في الشاشة:
const toggle = useToggleTask();
// <TaskRow task={item} onPress={() => toggle.mutate(item)} />`
        },
        {
          cmd: "pull to refresh و infinite",
          title: "السحب للتحديث والتحميل اللانهائي: RefreshControl و useInfiniteQuery",
          desc: R`حاجتين المستخدم متوقعهم في أي قايمة موبايل: يسحب لتحت يحدّث، ولما يوصل للآخر يتحمّل زيادة. الأولى [[refreshControl={<RefreshControl refreshing={...} onRefresh={refetch} />}]] على الـ FlatList. والتانية [[useInfiniteQuery]] مع [[onEndReached]].

[[useInfiniteQuery]] بيخزّن الصفحات في [[data.pages]]، و [[getNextPageParam]] بيقوله رقم (أو cursor) الصفحة الجاية من آخر رد، و [[fetchNextPage()]] بيجيبها.`,
          example: R`import { useInfiniteQuery } from '@tanstack/react-query';
import { ActivityIndicator, FlatList, RefreshControl, Text } from 'react-native';
import { api } from '@/lib/api';

type Page = { items: { id: number; title: string }[]; nextCursor: number | null };

export function Feed() {
  const q = useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam }) => api<Page>($__bt/api/posts?cursor=$__{pageParam}&limit=20$__bt),
    initialPageParam: 0,
    getNextPageParam: (last) => last.nextCursor,
  });
  const items = q.data?.pages.flatMap((p) => p.items) ?? [];
  return (
    <FlatList
      testID="feed"
      data={items}
      keyExtractor={(p) => String(p.id)}
      renderItem={({ item }) => <Text style={{ padding: 16 }}>{item.title}</Text>}
      onEndReached={() => { if (q.hasNextPage && !q.isFetchingNextPage) q.fetchNextPage(); }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={q.isFetchingNextPage ? <ActivityIndicator /> : null}
      refreshControl={<RefreshControl refreshing={q.isRefetching && !q.isFetchingNextPage} onRefresh={q.refetch} />}
    />
  );
}`,
          try: R`اكتب اختبار بيعمل mock لـ [[api]] يرجّع صفحتين، ويتأكد إن الصفحة التانية بتظهر بعد [[fireEvent(screen.getByTestId('feed'), 'endReached')]]. وبعدين فكّر: لو السيرفر عنده 3 صفحات بس، إيه اللي بيمنع [[fetchNextPage]] بعد الأخيرة؟`,
          flag: "script",
          deep: {
            why: R`feed أو قايمة طلبات أو منتجات بـ ١٠ آلاف عنصر مينفعش تتجاب مرة واحدة. والسحب للتحديث عادة عند المستخدمين لدرجة إن لو مش موجود هيفتكروا التطبيق مهنّج.`,
            how: R`[[onEndReached]] بيتنادي لما المسافة لآخر القايمة تبقى أقل من [[onEndReachedThreshold]] × طول الشاشة (0.5 = نص شاشة)، فالصفحة الجاية بتبدأ تتحمل قبل ما المستخدم يوصل للآخر. ممكن يتنادي أكتر من مرة، عشان كده الشرط [[!q.isFetchingNextPage]].

[[getNextPageParam]] لو رجّع [[null]] أو [[undefined]] يبقى [[hasNextPage]] بـ false. والـ cursor ([[nextCursor]]) أحسن من رقم الصفحة: لو فيه عناصر جديدة اتضافت فوق، الـ offset بيكرر أو بيفوّت عناصر (درس [[cursor pagination]] في «تاب APIs متقدمة»).

[[refetch]] في infinite query بيعيد تحميل كل الصفحات المتحمّلة بالترتيب (عشان الـ cursors تفضل صح)، فلو المستخدم نزل ٢٠ صفحة، السحب هيعمل ٢٠ طلب. لو ده مشكلة، [[maxPages]] أو إنك تعمل [[resetQueries]] بدل refetch.

[[refreshing]] لازم تبقى boolean متحكم فيه: [[isRefetching]] (مش [[isFetching]] لأنها بتبقى true وقت تحميل الصفحة الجاية كمان، فالـ spinner يظهر فوق غلط).

جربت الـ Feed ده في الـ lab باختبار: mock لصفحتين، وبعد [[endReached]] الصفحة التانية ظهرت وآخر نداء كان [[/api/posts?cursor=1&limit=20]].`,
            when: R`infinite: feeds وقوايم طويلة. pagination بأرقام: جداول أدمن على الويب أكتر منها موبايل. والسحب للتحديث في أي قايمة بيانات بتتغير.`,
            mistakes: R`[[onEndReached={q.fetchNextPage}]] من غير شرط: طلبات مكررة للصفحة نفسها. و [[refreshing={q.isFetching}]]. و [[data.pages]] تعرضها مباشرة بدل [[flatMap]]. و [[onEndReached]] بيتنادي فورًا لما القايمة أقصر من الشاشة (وده ساعات مطلوب وساعات لأ). والـ FlatList جوه ScrollView فـ onEndReached بيتنادي على طول.`
          },
          lines: [
            "infinite query.",
            "الـ components.",
            "الـ API client.",
            "شكل الصفحة من السيرفر: عناصر و cursor للجاية.",
            "الـ feed.",
            "بداية الـ query.",
            "key.",
            R`كل صفحة بـ [[pageParam]] (الـ cursor).`,
            "أول صفحة.",
            R`الـ cursor الجاي من آخر صفحة، و [[null]] يعني خلصنا.`,
            "قفلة.",
            "نفرد كل الصفحات في array واحد.",
            "بيرجّع JSX.",
            "القايمة.",
            "testID للاختبار.",
            "العناصر.",
            "مفتاح.",
            "رسم عنصر.",
            "لما نقرّب من الآخر: هات الجاية لو فيه ومفيش تحميل شغال.",
            "ابدأ لما يفضل نص شاشة.",
            "spinner تحت وقت تحميل الجاية.",
            "السحب للتحديث: الـ spinner فوق بس وقت الـ refetch.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`الاختبار بيعدّي: أول صفحة بتظهر ([[findByText('بوست 1')]])، وبعد الـ [[endReached]] التانية بتظهر، والـ mock اتنادى بـ cursor=1.

وبعد الصفحة الأخيرة، السيرفر بيرجّع [[nextCursor: null]]، فـ [[getNextPageParam]] بيرجّع null و [[hasNextPage]] بيبقى false، والشرط في [[onEndReached]] بيمنع أي طلب. لو السيرفر بيرجّع [[nextCursor: 0]] للأخيرة بالغلط، هتفضل تجيب الصفحة الأولى في loop.`,
          solCode: R`import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Feed } from '@/components/Feed';
import { api } from '@/lib/api';

jest.mock('@/lib/api', () => ({ api: jest.fn() }));
const mockedApi = api as jest.MockedFunction<typeof api>;

test('loads the next page on end reached', async () => {
  mockedApi
    .mockResolvedValueOnce({ items: [{ id: 1, title: 'بوست 1' }], nextCursor: 1 })
    .mockResolvedValueOnce({ items: [{ id: 2, title: 'بوست 2' }], nextCursor: null });
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  await render(<QueryClientProvider client={client}><Feed /></QueryClientProvider>);
  expect(await screen.findByText('بوست 1')).toBeOnTheScreen();
  await fireEvent(screen.getByTestId('feed'), 'endReached');
  expect(await screen.findByText('بوست 2')).toBeOnTheScreen();
  expect(mockedApi).toHaveBeenLastCalledWith('/api/posts?cursor=1&limit=20');
});`
        }
      ]
    },
    {
      t: "الفورمات والكيبورد",
      l: 2,
      n: "react-hook-form بـ Controller بدل register، و Zod، والكيبورد اللي بيغطي الخانات",
      items: [
        {
          cmd: "react-hook-form + Controller",
          title: "react-hook-form في RN: ليه Controller بدل register؟",
          desc: R`في الويب [[register('email')]] بيوصّل الـ input بالـ DOM مباشرة. في RN مفيش DOM ولا [[ref]] بيقرا القيمة، فبتستخدم [[<Controller>]]: بيدّيك [[field.value]] و [[field.onChange]] و [[field.onBlur]] وانت بتوصّلهم بـ [[TextInput]] ([[onChangeText={field.onChange}]]).

الـ validation بـ Zod زي «تاب React» بالظبط ([[zodResolver(schema)]])، ونفس الـ schema ممكن تبقى مشتركة مع الـ backend.`,
          example: R`import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, TextInput, View } from 'react-native';
import { z } from 'zod';

const schema = z.object({
  email: z.email('إيميل مش صحيح'),
  password: z.string().min(8, 'الباسورد ٨ حروف على الأقل'),
});
type Form = z.infer<typeof schema>;

export function LoginForm({ onSubmit }: { onSubmit: (v: Form) => Promise<void> }) {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });
  return (
    <View style={{ gap: 8, padding: 16 }}>
      <Controller control={control} name="email" render={({ field }) => (
        <TextInput accessibilityLabel="الإيميل" value={field.value} onChangeText={field.onChange} onBlur={field.onBlur}
          keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
      )} />
      {errors.email ? <Text>{errors.email.message}</Text> : null}
      <Controller control={control} name="password" render={({ field }) => (
        <TextInput accessibilityLabel="الباسورد" value={field.value} onChangeText={field.onChange} secureTextEntry />
      )} />
      {errors.password ? <Text>{errors.password.message}</Text> : null}
      <Pressable accessibilityRole="button" disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
        <Text>{isSubmitting ? 'جاري الدخول...' : 'دخول'}</Text>
      </Pressable>
    </View>
  );
}`,
          try: R`اكتب اختبار بـ RNTL: اكتب إيميل غلط واضغط «دخول»، واتأكد إن رسالتين الخطأ ظهروا وإن [[onSubmit]] متناداش. وبعدين اختبار تاني بقيم صح. (الحل في آخر الدرس، وفيه مفاجأة صغيرة في [[toHaveBeenCalledWith]].)`,
          flag: "script",
          deep: {
            why: R`الفورمات على الموبايل فيها نفس مشاكل الويب (validation، ورسايل خطأ، ومنع الإرسال المتكرر) وزيادة: كل حرف بـ setState في فورم كبير ممكن يبقى تقيل. react-hook-form بيقلل الـ re-renders، و Zod بيوحّد القواعد مع السيرفر.`,
            how: R`[[Controller]] بيسجّل الحقل في الفورم ويدّيك [[field]] ([[value]] و [[onChange]] و [[onBlur]] و [[ref]] و [[name]]) و [[fieldState]] ([[error]] و [[isTouched]]). [[field.onChange]] بيقبل القيمة مباشرة، ودي بالظبط اللي [[onChangeText]] بيبعتها، فالتوصيل سطر واحد. الـ re-render بيحصل للـ Controller ده بس، مش الفورم كله.

[[handleSubmit(onSubmit)]] بيرجّع دالة: بتشغّل الـ validation، ولو سليم تنادي [[onSubmit(values, event)]]. [[isSubmitting]] بتفضل true لحد ما الـ promise بتاع [[onSubmit]] يخلص، فالزرار بيتقفل لوحده.

[[z.email()]] في Zod 4 (الشكل الجديد، و [[z.string().email()]] لسه شغال بس deprecated). والرسايل بالعربي بتتكتب في الـ schema نفسها.

جربت الفورم ده في الـ lab باختبارين بـ [[userEvent]]: الأول ظهرت فيه رسالتين الخطأ ومفيش submit، والتاني اتنادت [[onSubmit]] بالقيم.`,
            when: R`أي فورم فيه أكتر من خانتين أو validation. لخانة بحث واحدة، [[useState]] كفاية.`,
            mistakes: R`[[{...register('email')}]] على TextInput من عادة الويب: مش هيشتغل. و [[onChange={field.onChange}]] بدل [[onChangeText]]: هيبعت event object بدل النص. وتنسى [[defaultValues]] فالـ TextInput يبدأ uncontrolled بـ undefined ويطلع تحذير. و [[{errors.email && <Text>}]]: آمن هنا لأنه object أو undefined، بس الأحسن تتعود على [[? :]] في RN.`
          },
          lines: [
            "resolver بيربط Zod بـ react-hook-form.",
            "Controller و useForm.",
            "components الـ RN.",
            "Zod.",
            "الـ schema.",
            "إيميل برسالة عربي (شكل Zod 4).",
            "باسورد ٨ حروف على الأقل.",
            "قفلة.",
            "النوع من الـ schema.",
            R`الفورم بياخد [[onSubmit]] من برّه (أسهل في الاختبار).`,
            "الفورم: control للـ Controllers، و handleSubmit، والأخطاء، وحالة الإرسال.",
            "Zod بيعمل الـ validation.",
            R`قيم أولية عشان الـ inputs تبقى controlled من الأول.`,
            "قفلة.",
            "بيرجّع JSX.",
            "الصندوق.",
            R`Controller للإيميل، و [[render]] بتاخد [[field]].`,
            R`نوصّل [[value]] و [[onChangeText]] و [[onBlur]].`,
            "إعدادات كيبورد الإيميل.",
            "قفلة.",
            "رسالة الخطأ.",
            "Controller للباسورد.",
            "الباسورد مخفي.",
            "قفلة.",
            "رسالة الخطأ.",
            R`[[handleSubmit]] بيعمل validation وبعدين ينادي onSubmit.`,
            "النص بيتغير وقت الإرسال.",
            "قفلة.",
            "قفلة الصندوق.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`الاختبار الأول: بعد الضغط، «إيميل مش صحيح» و «الباسورد ٨ حروف على الأقل» ظاهرين و [[onSubmit]] مش متنادية.

المفاجأة في التاني: [[expect(onSubmit).toHaveBeenCalledWith({ email, password })]] بتفشل، لأن [[handleSubmit]] بينادي [[onSubmit(values, event)]]، والـ event هنا الـ press event اللي RNTL بعته. فاتأكد من أول argument بس: [[onSubmit.mock.calls[0][0]]]. وده اللي حصل معايا في الـ lab بالظبط.`,
          solCode: R`import { render, screen, userEvent } from '@testing-library/react-native';
import { LoginForm } from '@/app/sign-in';

test('shows validation errors and does not submit', async () => {
  const onSubmit = jest.fn();
  const user = userEvent.setup();
  await render(<LoginForm onSubmit={onSubmit} />);
  await user.type(screen.getByLabelText('الإيميل'), 'not-an-email');
  await user.press(screen.getByRole('button', { name: 'دخول' }));
  expect(await screen.findByText('إيميل مش صحيح')).toBeOnTheScreen();
  expect(screen.getByText('الباسورد ٨ حروف على الأقل')).toBeOnTheScreen();
  expect(onSubmit).not.toHaveBeenCalled();
});

test('submits valid values', async () => {
  const onSubmit = jest.fn().mockResolvedValue(undefined);
  const user = userEvent.setup();
  await render(<LoginForm onSubmit={onSubmit} />);
  await user.type(screen.getByLabelText('الإيميل'), 'sara@example.com');
  await user.type(screen.getByLabelText('الباسورد'), 'secret123');
  await user.press(screen.getByRole('button', { name: 'دخول' }));
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit.mock.calls[0][0]).toEqual({ email: 'sara@example.com', password: 'secret123' });
});`
        },
        {
          cmd: "الكيبورد",
          title: "الكيبورد بيغطي الخانة: KeyboardAvoidingView والتنقل بين الخانات",
          desc: R`لما الكيبورد يفتح، بياخد نص الشاشة، والخانة اللي في الآخر (وزرار الإرسال) بيتغطوا. [[KeyboardAvoidingView]] بيزق المحتوى لفوق، و [[behavior="padding"]] هو اللي بيشتغل كويس على iOS. على Android، مع الـ edge-to-edge، النظام غالبًا بيعمل resize للشاشة لوحده، فكتير بتسيب [[behavior]] بـ undefined هناك.

وفي فورم فيه خانات كتير: [[ScrollView]] مع [[keyboardShouldPersistTaps="handled"]]، و [[returnKeyType="next"]] و [[onSubmitEditing]] بـ ref للخانة الجاية.`,
          example: R`import { useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';

export default function CheckoutForm() {
  const phoneRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }} keyboardShouldPersistTaps="handled">
        <TextInput placeholder="الاسم" returnKeyType="next" submitBehavior="submit" onSubmitEditing={() => phoneRef.current?.focus()} />
        <TextInput ref={phoneRef} placeholder="الموبايل" keyboardType="phone-pad" returnKeyType="next" submitBehavior="submit" onSubmitEditing={() => addressRef.current?.focus()} />
        <TextInput ref={addressRef} placeholder="العنوان" multiline textAlignVertical="top" style={{ minHeight: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}`,
          try: R`حط ١٠ خانات بدل ٣، وجرّب على iOS simulator أو موبايل: الخانة الأخيرة بتبان لما تكتب فيها؟ وبعدين شيل [[KeyboardAvoidingView]] وجرّب تاني. (على الويب مش هتشوف الفرق، ده سلوك موبايل.)`,
          flag: "script",
          deep: {
            why: R`«الكيبورد مغطي زرار الدفع» من أكتر الشكاوى في تطبيقات RN، وبيبان على أجهزة معينة بس. لو اتظبط مرة في component الفورم الأساسي، كل الفورمات هتبقى تمام.`,
            how: R`[[KeyboardAvoidingView]] بيسمع أحداث ظهور الكيبورد ويحسب ارتفاعه، وبعدين حسب [[behavior]]: [[padding]] بيضيف padding تحت بقدّ الكيبورد، و [[height]] بيصغّر ارتفاع الـ view، و [[position]] بيحرك الـ view كلها. لو فيه header فوق الشاشة (Stack)، ساعات تحتاج [[keyboardVerticalOffset]] بارتفاع الـ header عشان الحساب يبقى مظبوط.

على Android: الـ edge-to-edge بقى إجباري على النسخ الحديثة، وسلوك الـ resize بيتحدد في إعدادات التطبيق، فجرّب على جهاز حقيقي قبل ما تضيف behavior. ولو محتاج تحكم أكتر أو animations مع الكيبورد، فيه مكتبة [[react-native-keyboard-controller]] (مكتبة native، محتاجة development build).

[[submitBehavior="submit"]] بيخلي الكيبورد يفضل مفتوح وانت بتنقل بين الخانات، بدل ما يتقفل ويتفتح. و [[Keyboard.dismiss()]] بيقفله بالكود (مثلًا لما تضغط برّه).

مقدرتش أجرب سلوك الكيبورد في الـ lab (مفيش جهاز)، فده من الـ docs وتجارب عامة: جرّبه على الجهازين قبل ما تعتمد عليه.`,
            when: R`أي شاشة فيها TextInput في النص أو تحت. شاشة بحث فيها خانة فوق بس مش محتاجاه.`,
            mistakes: R`[[behavior="padding"]] على Android كمان فيحصل مسافة مزدوجة. و [[KeyboardAvoidingView]] من غير [[flex: 1]] فمش بيعمل حاجة. ونسيان [[keyboardShouldPersistTaps]] فالزرار محتاج ضغطتين. و [[multiline]] على Android من غير [[textAlignVertical="top"]] فالنص يبدأ من النص.`
          },
          lines: [
            "refs للتنقل بين الخانات.",
            "الأدوات.",
            "فورم.",
            "ref للموبايل.",
            "ref للعنوان.",
            "بيرجّع JSX.",
            R`بيزق المحتوى لفوق. [[padding]] على iOS، و Android غالبًا بيعمل resize لوحده.`,
            "scroll، والضغطات بتوصل والكيبورد مفتوح.",
            R`[[next]] على الكيبورد ينقلك للموبايل ومن غير ما يقفل الكيبورد.`,
            "كيبورد أرقام، وينقلك للعنوان.",
            "خانة كذا سطر، والنص يبدأ من فوق.",
            "قفلة.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`مع [[KeyboardAvoidingView]] و [[padding]] على iOS: لما تدوس على الخانة الأخيرة، المحتوى بيتزق لفوق والـ ScrollView يقدر يوصلها. من غيره: الخانات اللي في النص التحتاني بتبقى تحت الكيبورد ومش هتشوف انت بتكتب إيه.

على Android الحديث غالبًا هتلاقي الفرق أقل (النظام بيصغّر الشاشة). لو الخانة لسه متغطية، جرّب [[behavior="height"]] على Android، أو [[react-native-keyboard-controller]].`
        }
      ]
    },
    {
      t: "التخزين على الجهاز",
      l: 2,
      n: "AsyncStorage للإعدادات، و SecureStore للتوكنات، و expo-sqlite للبيانات الكتير والـ offline",
      items: [
        {
          cmd: "AsyncStorage",
          title: "AsyncStorage: localStorage بتاع الموبايل، بس async",
          desc: R`[[@react-native-async-storage/async-storage]] هو أقرب حاجة لـ [[localStorage]]: key/value strings، بيفضل بعد ما التطبيق يتقفل. الفرق إن كل العمليات async: [[await AsyncStorage.getItem('k')]]، وإن القيم strings بس، فالـ objects بـ [[JSON.stringify]] و [[JSON.parse]].

مش مشفّر. أي حاجة فيها أسرار (توكنات، باسوردات) مكانها SecureStore (الدرس الجاي). AsyncStorage للحاجات العادية: اللغة، والـ theme، وهل المستخدم شاف الـ onboarding.`,
          example: R`import AsyncStorage from '@react-native-async-storage/async-storage';

type Prefs = { theme: 'light' | 'dark' | 'system'; lang: 'ar' | 'en' };
const KEY = 'prefs:v1';
const DEFAULTS: Prefs = { theme: 'system', lang: 'ar' };

export async function loadPrefs(): Promise<Prefs> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return DEFAULTS;
  try { return { ...DEFAULTS, ...JSON.parse(raw) }; } catch { return DEFAULTS; }
}

export async function savePrefs(p: Partial<Prefs>) {
  const next = { ...(await loadPrefs()), ...p };
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
  return next;
}`,
          try: R`اكتب اختبار jest لـ [[loadPrefs]] و [[savePrefs]] باستخدام الـ mock الرسمي ([[jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'))]]). وبعدين فكّر: لو ضفت حقل جديد [[fontSize]] في Prefs، المستخدمين القدام هيحصلهم إيه؟`,
          flag: "script",
          deep: {
            why: R`كل تطبيق محتاج يفتكر حاجات صغيرة بين الجلسات. وغلطة إنك تعامله زي localStorage (sync) أو تحط فيه توكنات منتشرة جدًا، والتانية ثغرة أمنية حقيقية.`,
            how: R`على Android بيتخزن في SQLite جوه فولدر التطبيق، وعلى iOS في ملفات، والاتنين private للتطبيق بس مش مشفّرين: جهاز rooted أو backup ممكن يقراهم.

كل العمليات promises، فمش هتقدر تقرا الإعدادات «قبل أول render». الحل: حالة loading (أو splash screen) لحد ما تقرا، أو تستخدم Zustand مع [[persist]] بـ storage AsyncStorage (نفس فكرة «تاب React»).

الـ key فيه [[:v1]]: لو غيّرت شكل البيانات جامد، تغيّر لـ v2 وتتجاهل القديم. والـ merge مع [[DEFAULTS]] بيحل مشكلة الحقول الجديدة: المستخدم القديم معندوش [[fontSize]] محفوظ، فبياخد القيمة الافتراضية. و [[try/catch]] حوالين [[JSON.parse]] عشان بيانات بايظة متوقعش التطبيق.

جربت الملف ده في الـ lab باختبار jest بالـ mock الرسمي: أول قراية رجّعت الـ defaults، وبعد [[savePrefs({ theme: 'dark' })]] رجّعت [[dark]] ومعاها [[lang: 'ar']].

ملحوظة نسخ: [[expo install]] في SDK 57 ركّب async-storage 2.2.0، مع إن npm فيه 3.x. التزم بنسخة الـ SDK.`,
            when: R`إعدادات، و flags بسيطة، و cache صغير. للبيانات الكبيرة أو اللي محتاجة بحث وفلترة: SQLite. للأسرار: SecureStore. ولو عايز sync وأسرع بكتير، فيه [[react-native-mmkv]] (محتاج development build).`,
            mistakes: R`توكنات في AsyncStorage. و [[AsyncStorage.setItem('user', user)]] من غير stringify فيتخزن «[object Object]». و [[const theme = AsyncStorage.getItem('theme')]] من غير await فـ theme بقى promise. وتخزن ميجات فيه (قوايم كاملة): بطيء، وعلى Android فيه حد للحجم.`
          },
          lines: [
            "المكتبة.",
            "شكل الإعدادات.",
            "المفتاح، و v1 عشان لو غيّرنا الشكل بعدين.",
            "القيم الافتراضية.",
            "قراية.",
            "async دايمًا.",
            "مفيش حاجة محفوظة: الافتراضي.",
            "ادمج المحفوظ فوق الافتراضي، ولو البيانات بايظة ارجع للافتراضي.",
            "قفلة.",
            "حفظ جزء من الإعدادات.",
            "اقرا القديم وادمج.",
            "خزّن string.",
            "رجّع الجديد.",
            "قفلة."
          ],
          sol: R`الاختبار: [[loadPrefs()]] أول مرة بترجع [[{ theme: 'system', lang: 'ar' }]]، وبعد [[savePrefs({ theme: 'dark' })]] بترجع [[{ theme: 'dark', lang: 'ar' }]]. الـ mock بيحتفظ بالقيم في الذاكرة طول ملف الاختبار.

ولو ضفت [[fontSize]]: المستخدمين القدام عندهم JSON من غيره، و [[{ ...DEFAULTS, ...JSON.parse(raw) }]] بتكمّله من الـ defaults، فمفيش مشكلة. لو كنت كتبت [[return JSON.parse(raw)]] بس، [[prefs.fontSize]] هيبقى undefined عندهم.`,
          solCode: R`// jest.setup.ts
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

// src/__tests__/prefs.test.ts
import { loadPrefs, savePrefs } from '@/lib/prefs';

test('merges saved prefs with defaults', async () => {
  expect(await loadPrefs()).toEqual({ theme: 'system', lang: 'ar' });
  await savePrefs({ theme: 'dark' });
  expect(await loadPrefs()).toEqual({ theme: 'dark', lang: 'ar' });
});`
        },
        {
          cmd: "SecureStore",
          title: "SecureStore: التوكنات في Keychain و Keystore",
          desc: R`[[expo-secure-store]] بيخزّن strings مشفّرة: على iOS في الـ Keychain، وعلى Android مشفّرة بمفتاح في الـ Keystore. ده مكان الـ access token والـ refresh token، أي حاجة لو اتسرقت حد يقدر يدخل بيها على حساب المستخدم.

الـ API بسيط: [[setItemAsync]] و [[getItemAsync]] و [[deleteItemAsync]]. القيم strings وصغيرة (فيه حد للحجم تاريخيًا حوالي 2KB على iOS)، فمتخزنش فيه بيانات كبيرة.`,
          example: R`import * as SecureStore from 'expo-secure-store';
import { createContext, use, useEffect, useState, type PropsWithChildren } from 'react';

type Session = { token: string | null; isLoading: boolean; signIn: (a: string, r: string) => Promise<void>; signOut: () => Promise<void> };
const SessionContext = createContext<Session | null>(null);

export function SessionProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    SecureStore.getItemAsync('accessToken').then((t) => { setToken(t); setLoading(false); });
  }, []);
  const signIn = async (access: string, refresh: string) => {
    await SecureStore.setItemAsync('accessToken', access);
    await SecureStore.setItemAsync('refreshToken', refresh);
    setToken(access);
  };
  const signOut = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    setToken(null);
  };
  return <SessionContext value={{ token, isLoading, signIn, signOut }}>{children}</SessionContext>;
}

export function useSession() {
  const ctx = use(SessionContext);
  if (!ctx) throw new Error('useSession must be inside SessionProvider');
  return ctx;
}`,
          try: R`اعمل mock لـ [[expo-secure-store]] في [[jest.setup.ts]] بـ Map في الذاكرة (الحل تحت)، واكتب اختبار بيعمل [[renderHook]] لـ [[useSession]] جوه الـ provider، ويعمل [[signIn]] ويتأكد إن [[token]] اتغير. وبعدين: ليه [[signOut]] بيمسح الاتنين مش الـ access بس؟`,
          flag: "script",
          deep: {
            why: R`على الويب التوكن الأمن في cookie بـ [[httpOnly]]. على الموبايل مفيش cookies بنفس الشكل، والتطبيق نفسه بيمسك التوكن. لو اتخزن في AsyncStorage، أي حد عنده backup من الجهاز أو جهاز rooted يقراه. SecureStore بيستخدم تخزين النظام المشفّر المخصص للأسرار.`,
            how: R`iOS Keychain: التشفير والمفاتيح بيديرهم النظام، وممكن تحدد إمتى القيمة تبقى متاحة ([[keychainAccessible]] زي [[AFTER_FIRST_UNLOCK]] أو [[WHEN_UNLOCKED]]). ملحوظة: عناصر الـ Keychain ممكن تفضل بعد ما التطبيق يتمسح ويتركّب تاني على iOS، فلو عايز «تركيب جديد = خروج»، افتكر flag في AsyncStorage (بيتمسح مع التطبيق) وامسح الـ SecureStore لو مش موجود.

Android: القيمة بتتشفّر بمفتاح AES متخزن في الـ Keystore، والنص المشفّر نفسه في SharedPreferences. ولو المستخدم غيّر إعدادات قفل الشاشة ممكن المفاتيح تتلغي والقراية ترجع null أو error، فالتطبيق لازم يتعامل مع ده كأنه «مفيش session».

[[requireAuthentication: true]] بيطلب بصمة أو Face ID قبل القراية (محتاج development build وإعداد [[faceIDPermission]] في الـ plugin).

الـ provider فوق هو اللي في الـ lab بالظبط، و [[use(SessionContext)]] و [[<SessionContext value>]] شكل React 19. وفي الاختبارات عملت mock لـ SecureStore بـ Map، لأن الـ native module مش موجود في Jest.`,
            when: R`access token و refresh token، ومفاتيح API خاصة بالمستخدم، وأي سر صغير. المقارنة الكاملة في «تاب Flutter و Dart» (درس [[flutter_secure_storage]] بيعمل نفس الفكرة).`,
            mistakes: R`توكن في AsyncStorage أو في Zustand persist. و [[signOut]] بيمسح الـ access بس والـ refresh يفضل، فأي حد معاه الجهاز يرجع يدخل. وتخزن object كبير (بيانات المستخدم كلها) في SecureStore. وتفتكر إن SecureStore بيحمي من كل حاجة: مالوير على جهاز مفتوح أو ثغرة XSS في WebView ممكن تنادي الكود بتاعك نفسه.`
          },
          lines: [
            "المكتبة.",
            R`[[use]] بتاع React 19 لقراية الـ context.`,
            "شكل الـ session.",
            "الـ context.",
            "الـ provider.",
            "التوكن في الذاكرة.",
            "لسه بنقراه من التخزين؟",
            "أول ما يفتح:",
            "اقرا التوكن من التخزين المشفّر وخلّص الـ loading.",
            "قفلة.",
            "تسجيل الدخول:",
            "خزّن الـ access.",
            "وخزّن الـ refresh.",
            "وحدّث الـ state، فالـ Stack.Protected يحوّل لوحده.",
            "قفلة.",
            "تسجيل الخروج:",
            "امسح الـ access.",
            "وامسح الـ refresh.",
            "التوكن null، فيروح sign-in لوحده.",
            "قفلة.",
            R`React 19: الـ context نفسه provider ([[<SessionContext value>]]).`,
            "قفلة.",
            "hook للاستخدام.",
            "اقرا الـ context.",
            "خطأ واضح لو اتستخدم برّه الـ provider.",
            "رجّعه.",
            "قفلة."
          ],
          sol: R`الاختبار: بعد [[await act(() => result.current.signIn('a1', 'r1'))]] الـ [[token]] بقى [['a1']]، وفي الـ Map التوكنين موجودين. بعد [[signOut]] الاتنين اتمسحوا و [[token]] بقى null.

ليه الاتنين؟ الـ refresh token أخطر من الـ access: عمره أطول بكتير (أيام أو أسابيع)، وبيجيب access جديد. لو فضل على الجهاز بعد الخروج، «الخروج» مجرد شكل. والأحسن كمان تبعت للسيرفر يلغيه ([[POST /api/auth/logout]]) عشان لو اتسرق قبل كده ميشتغلش.`,
          solCode: R`// jest.setup.ts
jest.mock('expo-secure-store', () => {
  const store = new Map<string, string>();
  return {
    getItemAsync: jest.fn(async (k: string) => store.get(k) ?? null),
    setItemAsync: jest.fn(async (k: string, v: string) => { store.set(k, v); }),
    deleteItemAsync: jest.fn(async (k: string) => { store.delete(k); }),
  };
});

// src/__tests__/session.test.tsx
import { act, renderHook, waitFor } from '@testing-library/react-native';
import type { PropsWithChildren } from 'react';
import { SessionProvider, useSession } from '@/lib/session';

const wrapper = ({ children }: PropsWithChildren) => <SessionProvider>{children}</SessionProvider>;

test('signIn stores tokens and signOut clears them', async () => {
  const { result } = await renderHook(() => useSession(), { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  await act(() => result.current.signIn('a1', 'r1'));
  expect(result.current.token).toBe('a1');
  await act(() => result.current.signOut());
  expect(result.current.token).toBeNull();
});`
        },
        {
          cmd: "expo-sqlite",
          title: "expo-sqlite: قاعدة بيانات SQL على الموبايل للبيانات الكتير والـ offline",
          desc: R`لو التطبيق محتاج يشتغل من غير نت (ملاحظات، مسودات، cache لآلاف العناصر مع بحث وفلترة)، AsyncStorage مش كفاية. [[expo-sqlite]] بيدّيك SQLite حقيقي على الجهاز: نفس الـ SQL اللي في «تاب SQL و Prisma».

[[openDatabaseAsync('notes.db')]] بيفتح (أو يعمل) الملف، و [[execAsync]] لأوامر كتير من غير نتايج (CREATE TABLE)، و [[runAsync(sql, ...params)]] للـ INSERT و UPDATE، و [[getAllAsync]] و [[getFirstAsync]] للقراية. والـ params بـ [[?]] دايمًا، مش template strings.`,
          example: R`import * as SQLite from 'expo-sqlite';

export type Note = { id: number; body: string; created_at: string };

export async function openDb() {
  const db = await SQLite.openDatabaseAsync('notes.db');
  await db.execAsync($__bt
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
  $__bt);
  return db;
}

export async function addNote(db: SQLite.SQLiteDatabase, body: string) {
  const r = await db.runAsync('INSERT INTO notes (body) VALUES (?)', body);
  return r.lastInsertRowId;
}

export function listNotes(db: SQLite.SQLiteDatabase) {
  return db.getAllAsync<Note>('SELECT * FROM notes ORDER BY id DESC');
}`,
          try: R`ضيف [[searchNotes(db, q)]] بتدوّر بـ [[LIKE]] في [[body]]. وفكّر: لو كتبتها [[$__bt... LIKE '%$__{q}%'$__bt]] إيه اللي ممكن يحصل لو q فيها علامة [[']]؟ (وبعدين: [[SQLiteProvider]] و [[useSQLiteContext]] بيعملوا إيه؟)`,
          flag: "script",
          deep: {
            why: R`تطبيقات كتير لازم تشتغل في المترو والأماكن اللي النت فيها ضعيف: تطبيق مندوبين، أو ملاحظات، أو قايمة منتجات للبيع offline. SQLite هو الحل القياسي، والـ SQL اللي بتعرفه شغال زي ما هو.`,
            how: R`الملف بيتخزن في فولدر التطبيق. كل الدوال async ([[...Async]])، وفيه نسخ sync ([[runSync]]) بس بتوقف الـ JS thread فبلاش منها في الشاشات.

[[PRAGMA journal_mode = WAL]] بيخلي القراية والكتابة ما يوقفوش بعض، وده أسرع لأغلب التطبيقات. [[CREATE TABLE IF NOT EXISTS]] بيخلي الدالة آمنة تتنادي كل مرة. وللـ migrations: [[PRAGMA user_version]] بيحفظ رقم النسخة جوه الملف، فتقراه وتطبّق التغييرات اللي بعده بالترتيب.

الـ placeholders [[?]] بتبعت القيمة منفصلة عن الـ SQL فمفيش SQL injection (نفس فكرة «تاب SQL و Prisma»). و [[getAllAsync<Note>]] generic للنوع بس، مفيش validation.

[[SQLiteProvider]] component بيفتح الـ DB مرة واحدة وبيشغّل [[onInit]] (مكان الـ migrations)، و [[useSQLiteContext()]] بيدّيك الـ db في أي شاشة. وممكن تستخدم Drizzle ORM فوقه لو عايز queries بـ types.

ملحوظة: الملف ده في الـ lab بيعدّي الـ typecheck، بس SQLite نفسه native فمقدرتش أشغّله في Jest ولا من غير جهاز. على الويب expo-sqlite محتاج إعدادات إضافية (wasm و headers)، فاختبره على موبايل.`,
            when: R`بيانات كتير، أو بحث وفلترة وترتيب، أو offline-first. لـ ١٠ إعدادات: AsyncStorage. ولو محتاج sync مع السيرفر بشكل كامل، فيه حلول جاهزة فوق SQLite (زي PowerSync أو ElectricSQL) بدل ما تكتب الـ sync بنفسك.`,
            mistakes: R`SQL بـ template string من input المستخدم: SQL injection حتى على الموبايل (وحتى لو مش خطر أمني كبير، علامة [[']] واحدة هتوقع الـ query). وتفتح الـ DB في كل شاشة بدل مرة. و [[ALTER TABLE]] من غير نظام migrations فالمستخدمين اللي عندهم نسخة قديمة يقعوا. وتنسى إن [[runSync]] بيجمّد الـ UI.`
          },
          lines: [
            "المكتبة.",
            "نوع الصف.",
            "فتح القاعدة.",
            "بيعمل الملف لو مش موجود.",
            "أوامر كتير مرة واحدة:",
            "WAL: قراية وكتابة من غير ما يوقفوا بعض.",
            "الجدول لو مش موجود.",
            "قفلة الـ SQL.",
            "رجّع الـ db.",
            "قفلة.",
            "إضافة.",
            R`[[?]] والقيمة منفصلة: مفيش injection.`,
            "الـ id الجديد.",
            "قفلة.",
            "القراية.",
            "كل الصفوف بنوع Note.",
            "قفلة."
          ],
          sol: R`لو كتبت الـ query بـ template string، علامة [[']] في كلمة البحث (زي «it's») هتقفل الـ string بدري ويطلع syntax error، وأسوأ من كده ممكن حد يكتب SQL كامل. الصح [[?]] والـ [[%]] جوه القيمة نفسها.

[[SQLiteProvider]]: بتحطه فوق الشاشات بـ [[databaseName]] و [[onInit]] (فيها CREATE TABLE والـ migrations)، و [[useSQLiteContext()]] بيرجّع نفس الـ db في أي component تحته، فمفيش فتح متكرر.`,
          solCode: R`export function searchNotes(db: SQLite.SQLiteDatabase, q: string) {
  return db.getAllAsync<Note>(
    'SELECT * FROM notes WHERE body LIKE ? ORDER BY id DESC LIMIT 50',
    $__bt%$__{q}%$__bt,
  );
}`
        }
      ]
    },
    {
      t: "الـ backend بتاعك من الموبايل",
      l: 2,
      n: "API client بالتوكن، و refresh مرة واحدة لما يرجع 401، و localhost اللي مش شغال من الـ emulator",
      items: [
        {
          cmd: "API client بالتوكن",
          title: "API client واحد: base URL، و Bearer token، وأخطاء واضحة",
          desc: R`بدل [[fetch]] متكرر في كل شاشة، اعمل دالة [[api<T>(path, init)]] واحدة: بتحط الـ base URL، وبتقرا التوكن من SecureStore وتحطه في [[Authorization: Bearer]]، وبترمي [[ApiError]] فيه الـ status لو الرد مش ok. كل الـ hooks بتاعة TanStack Query بتستخدمها.

الـ base URL من [[process.env.EXPO_PUBLIC_API_URL]]. وخد بالك: [[localhost]] من جوه الـ Android emulator هو الـ emulator نفسه مش جهازك، فالـ backend بتاعك على [[http://10.0.2.2:3000]]، وعلى موبايل حقيقي لازم IP جهازك على الشبكة ([[http://192.168.1.5:3000]]) أو tunnel.`,
          example: R`import * as SecureStore from 'expo-secure-store';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:3000';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = await SecureStore.getItemAsync('accessToken');
  const res = await fetch($__bt$__{BASE_URL}$__{path}$__bt, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: $__btBearer $__{token}$__bt } : {}),
      ...init.headers,
    },
  });
  if (!res.ok) throw new ApiError(res.status, await res.text());
  return res.status === 204 ? (undefined as T) : res.json();
}`,
          try: R`شغّل الـ backend من «تاب Backend بـ Node» على جهازك، وحط [[EXPO_PUBLIC_API_URL=http://10.0.2.2:3000]] في [[.env]] في مشروع الـ Expo، وجيب [[/api/tasks]] من الـ emulator. وبعدين جرّب من موبايلك الحقيقي: إيه اللي لازم يتغير؟`,
          flag: "script",
          deep: {
            why: R`الـ backend اللي عملته للموقع (Node أو FastAPI أو PHP) هو نفسه اللي التطبيق هيكلمه. client واحد بيضمن إن كل الطلبات فيها التوكن، وكل الأخطاء بنفس الشكل، ولما تيجي تضيف refresh token (الدرس الجاي) تعدّل في مكان واحد.`,
            how: R`[[fetch]] في RN موجود وشبه المتصفح. الفرق: مفيش cookies تلقائية بنفس الشكل ومفيش CORS (CORS حماية في المتصفح بس، فطلبات التطبيق مش بتتمنع بسببه، بس لو هتعمل نسخة ويب من نفس التطبيق هتحتاجه، تفاصيله في «تاب Backend بـ Node» درس [[cors]]).

[[EXPO_PUBLIC_*]]: Expo بيقرا [[.env]] وبيبدّل [[process.env.EXPO_PUBLIC_X]] بالقيمة جوه الـ bundle وقت الـ build. لازم تكتبها كده بالظبط (مش [[process.env['EXPO_PUBLIC_' + name]]]). وأي حاجة فيها بتبقى مكشوفة في التطبيق، فالـ URL تمام، والـ secret key لأ.

الشبكة: Android emulator بيشوف جهازك على [[10.0.2.2]]، و iOS simulator بيشوف [[localhost]] عادي لأنه بيشتغل على الماك نفسه. الموبايل الحقيقي محتاج IP الكمبيوتر على الواي فاي، والـ server لازم يسمع على [[0.0.0.0]] مش [[127.0.0.1]]. و HTTP (مش HTTPS) بيتمنع افتراضيًا في release builds على Android و iOS، فالإنتاج لازم HTTPS.

[[ApiError]] بـ status بيخليك تفرّق في الشاشة: 401 يروح login، و 422 يعرض أخطاء الفورم، و 500 رسالة عامة. و 204 مفيهوش body فـ [[res.json()]] كانت هتقع.

الكود ده (بزيادة الـ refresh) موجود في الـ lab ومتغطي باختبار.`,
            when: R`أي تطبيق بيكلم API. ولو الـ API كبير فيه OpenAPI spec، ممكن تولّد client بالأنواع (زي orval أو openapi-typescript) فوق نفس الفكرة.`,
            mistakes: R`[[http://localhost:3000]] من الـ Android emulator: «Network request failed». والـ server بيسمع على 127.0.0.1 فالموبايل مش شايفه. وحط API secret في [[EXPO_PUBLIC_]]. وتنسى [[Content-Type: application/json]] فـ Express مش بيقرا الـ body. وتعمل [[res.json()]] قبل ما تشوف [[res.ok]] فرسالة الخطأ HTML تطلع «JSON Parse error».`
          },
          lines: [
            "التوكن من التخزين المشفّر.",
            "الـ URL من الـ env، وافتراضيًا الـ emulator بيشوف جهازك على 10.0.2.2.",
            "error فيه الـ status.",
            R`[[public status]] في الـ constructor بيعمل property.`,
            "الرسالة.",
            "قفلة.",
            "قفلة.",
            "الدالة الوحيدة اللي الشاشات بتستخدمها.",
            "اقرا التوكن.",
            "الطلب.",
            "أي إعدادات من المستدعي (method و body).",
            "الـ headers:",
            "JSON افتراضيًا.",
            "التوكن لو موجود.",
            "والمستدعي يقدر يغيّر أي header.",
            "قفلة.",
            "قفلة.",
            "أي status مش 2xx يبقى error فيه الـ status والرسالة.",
            "204 مفيهوش body، غير كده JSON.",
            "قفلة."
          ],
          sol: R`من الـ emulator بـ [[10.0.2.2:3000]] المفروض توصل للـ API وترجع المهام. لو «Network request failed»: اتأكد إن السيرفر شغال، وإنك عملت restart لـ [[expo start]] بعد ما عدّلت [[.env]] (القيم بتتقري وقت الـ bundle).

على موبايل حقيقي: غيّر لـ IP جهازك ([[ipconfig]] أو [[ip a]]) زي [[http://192.168.1.5:3000]]، وخلي Express يسمع على [[0.0.0.0]] ([[app.listen(3000, '0.0.0.0')]])، وافتح البورت في الـ firewall. أو استخدم tunnel (ngrok أو cloudflared) فيبقى عندك HTTPS كمان.`
        },
        {
          cmd: "refresh token",
          title: "الـ access انتهى: refresh مرة واحدة حتى لو ١٠ طلبات رجعوا 401",
          desc: R`الـ access token عمره قصير (١٥ دقيقة مثلًا) والـ refresh عمره أطول. لما طلب يرجع 401، الـ client يبعت الـ refresh token لـ [[/api/auth/refresh]]، ياخد توكنات جديدة، ويعيد الطلب مرة واحدة. ولو الـ refresh فشل: خروج.

المشكلة الحقيقية: الشاشة بتعمل ٣ طلبات مع بعض، التلاتة يرجعوا 401، والتلاتة يبعتوا refresh. ولو السيرفر بيعمل rotation (كل refresh بيلغي القديم)، التاني والتالت هيفشلوا والمستخدم هيخرج. الحل: promise واحد مشترك للـ refresh (single-flight).`,
          example: R`let refreshing: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = await SecureStore.getItemAsync('refreshToken');
  if (!refreshToken) return null;
  const res = await fetch($__bt$__{BASE_URL}/api/auth/refresh$__bt, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) return null;
  const data: { accessToken: string; refreshToken: string } = await res.json();
  await SecureStore.setItemAsync('accessToken', data.accessToken);
  await SecureStore.setItemAsync('refreshToken', data.refreshToken);
  return data.accessToken;
}

export async function api<T>(path: string, init: RequestInit = {}, retry = true): Promise<T> {
  const token = await SecureStore.getItemAsync('accessToken');
  const res = await fetch($__bt$__{BASE_URL}$__{path}$__bt, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: $__btBearer $__{token}$__bt } : {}), ...init.headers },
  });
  if (res.status === 401 && retry) {
    refreshing ??= refreshAccessToken().finally(() => { refreshing = null; });
    const newToken = await refreshing;
    if (newToken) return api<T>(path, init, false);
  }
  if (!res.ok) throw new ApiError(res.status, await res.text());
  return res.status === 204 ? (undefined as T) : res.json();
}`,
          try: R`اكتب اختبار jest: [[fetch]] mock بيرجّع 401 لأي طلب بتوكن قديم، و 200 للتوكن الجديد، ويعد نداءات [[/api/auth/refresh]]. نادي [[api]] مرتين مع بعض بـ [[Promise.all]] واتأكد إن الـ refresh اتنادى مرة واحدة. وبعدين امسح [[refreshing ??=]] وخليها نداء مباشر: الاختبار هيقول إيه؟`,
          flag: "script",
          deep: {
            why: R`ده من أكتر الـ bugs اللي بتوصل للإنتاج في تطبيقات الموبايل: «التطبيق بيطلّعني كل شوية». وبيحصل بس لما شاشة تعمل أكتر من طلب في نفس اللحظة والتوكن منتهي، فمش بيبان وانت بتجرّب شاشة شاشة.`,
            how: R`[[refreshing]] متغير على مستوى الـ module. أول طلب يلاقيه null فيبدأ refresh ويحطه فيه ([[??=]] يعني «لو null حط القيمة»). الطلبات اللي بعده في نفس اللحظة تلاقيه موجود فتستنى نفس الـ promise. لما يخلص، [[finally]] بيرجّعه null عشان المرة الجاية (بعد ١٥ دقيقة) يعمل refresh جديد.

[[retry = false]] في النداء التاني بيمنع loop: لو الطلب رجع 401 تاني حتى بالتوكن الجديد، يرمي error بدل ما يعمل refresh تاني.

لو [[refreshAccessToken]] رجّع null (مفيش refresh token أو السيرفر رفضه)، الطلب الأصلي بيرمي [[ApiError(401)]]. وفي الـ app: [[QueryCache]] بـ [[onError]] يشوف 401 وينادي [[signOut()]]، فالـ Stack.Protected يرجّع المستخدم للـ login.

على السيرفر (في «تاب Backend بـ Node» درس [[access و refresh]]): الـ refresh rotation مع كشف إعادة الاستخدام، يعني لو refresh قديم اتبعت تاني يبقى حد سرقه فتلغي كل الجلسات. وده بالظبط ليه الـ single-flight مهم: من غيره التطبيق نفسه هيبان كأنه «سارق».

جربت ده في الـ lab: طلبين مع بعض رجعوا 401، والـ refresh اتنادى مرة واحدة، والاتنين رجعوا البيانات، و [[refreshToken]] الجديد اتخزن.`,
            when: R`أي تطبيق بـ JWT قصير العمر. لو الـ backend بيستخدم sessions طويلة ومفيش refresh، مش محتاجه.`,
            mistakes: R`refresh في كل طلب فشل من غير single-flight. ومفيش [[retry=false]] فيحصل loop لا نهائي لو السيرفر بيرجّع 401 لسبب تاني (صلاحيات). وتحفظ الـ access الجديد وتنسى الـ refresh الجديد (مع rotation، القديم بقى ملغي). وتعمل refresh لـ 403: ده «مسموحلكش» مش «التوكن انتهى».`
          },
          lines: [
            "promise مشترك للـ refresh، null لو مفيش واحد شغال.",
            "بيجيب توكنات جديدة.",
            "الـ refresh من التخزين المشفّر.",
            "مفيش؟ يبقى لازم login.",
            "نبعته للسيرفر.",
            "POST.",
            "JSON.",
            "الـ refresh في الـ body.",
            "قفلة.",
            "السيرفر رفض: null.",
            "التوكنات الجديدة.",
            "خزّن الـ access الجديد.",
            "وخزّن الـ refresh الجديد (rotation: القديم بقى ملغي).",
            "رجّع الـ access.",
            "قفلة.",
            R`نفس الـ client، و [[retry]] بيمنع loop.`,
            "التوكن الحالي.",
            "الطلب.",
            "الإعدادات.",
            "الـ headers بالتوكن.",
            "قفلة.",
            "401 وأول محاولة:",
            "لو مفيش refresh شغال ابدأ واحد، ولما يخلص فضّي المتغير. لو فيه، استنى نفسه.",
            "التوكن الجديد (أو null).",
            "أعد الطلب مرة واحدة بس.",
            "قفلة.",
            "أي خطأ تاني (أو الـ refresh فشل).",
            "النجاح.",
            "قفلة."
          ],
          sol: R`الاختبار بيعدّي: [[refreshCalls]] بـ 1، والطلبين رجعوا [[[{ id: 1 }]]]، و [[refreshToken]] في الـ store بقى [['r2']].

لو شلت الـ single-flight، [[refreshCalls]] هيبقى 2، والاختبار يفشل بـ «Expected: 1, Received: 2». ومع سيرفر بيعمل rotation وكشف إعادة الاستخدام، التاني كان هيترفض (الـ r1 اتلغى) وكمان ممكن يلغي كل جلسات المستخدم.`,
          solCode: R`import * as SecureStore from 'expo-secure-store';
import { api } from '@/lib/api';

const json = (status: number, body: unknown) =>
  ({ ok: status < 400, status, json: async () => body, text: async () => JSON.stringify(body) }) as Response;

beforeEach(async () => {
  await SecureStore.setItemAsync('accessToken', 'old');
  await SecureStore.setItemAsync('refreshToken', 'r1');
});

test('refreshes once for parallel 401s and retries', async () => {
  let refreshCalls = 0;
  globalThis.fetch = jest.fn(async (url: string, init?: RequestInit) => {
    if (url.endsWith('/api/auth/refresh')) {
      refreshCalls++;
      return json(200, { accessToken: 'new', refreshToken: 'r2' });
    }
    const auth = (init?.headers as Record<string, string>).Authorization;
    return auth === 'Bearer new' ? json(200, [{ id: 1 }]) : json(401, { error: 'expired' });
  }) as unknown as typeof fetch;

  const [a, b] = await Promise.all([api('/api/tasks'), api('/api/projects')]);
  expect(a).toEqual([{ id: 1 }]);
  expect(b).toEqual([{ id: 1 }]);
  expect(refreshCalls).toBe(1);
  expect(await SecureStore.getItemAsync('refreshToken')).toBe('r2');
});`
        },
        {
          cmd: "login من التطبيق",
          title: "شاشة الـ login كاملة: فورم، ثم API، ثم SecureStore، ثم التحويل لوحده",
          desc: R`دلوقتي كل القطع موجودة: [[LoginForm]] (react-hook-form + Zod)، و [[api]] (الـ client)، و [[useSession().signIn]] (SecureStore + state)، و [[Stack.Protected]] (التحويل). شاشة [[sign-in.tsx]] بتوصلهم ببعض في كام سطر.

والـ backend بيرجّع التوكنات في الـ JSON body (مش cookie) للتطبيق. لو الـ backend بتاعك معمول للويب بـ refresh في cookie [[httpOnly]]، محتاج endpoint أو mode للموبايل يرجّع الـ refresh في الـ body.`,
          example: R`// src/app/sign-in.tsx
import { KeyboardAvoidingView, Platform } from 'react-native';
import { api, ApiError } from '@/lib/api';
import { useSession } from '@/lib/session';
import { LoginForm } from '@/components/LoginForm';

type LoginResponse = { accessToken: string; refreshToken: string };

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <LoginForm
        onSubmit={async (values) => {
          try {
            const r = await api<LoginResponse>('/api/auth/login', { method: 'POST', body: JSON.stringify(values) });
            await signIn(r.accessToken, r.refreshToken);
          } catch (e) {
            if (e instanceof ApiError && e.status === 401) throw new Error('الإيميل أو الباسورد غلط');
            throw e;
          }
        }}
      />
    </KeyboardAvoidingView>
  );
}`,
          try: R`عدّل [[LoginForm]] عشان يعرض الخطأ اللي [[onSubmit]] بيرميه تحت الزرار (استخدم [[setError('root', ...)]] من react-hook-form). وتتبّع بعينك: بعد [[signIn]]، مين اللي نقل المستخدم لشاشة المهام؟ (مفيش [[router.replace]] في الكود.)`,
          flag: "script",
          deep: {
            why: R`ده التدفق اللي هتكتبه في كل تطبيق، وبيجمع أغلب اللي فات. لو فهمت مين مسؤول عن إيه (الفورم عن الإدخال، والـ client عن الشبكة، والـ session عن التخزين، والـ router عن التنقل)، هتعرف تغيّر أي جزء (Google Sign-In، أو OTP بالموبايل) من غير ما تكسر الباقي.`,
            how: R`[[signIn]] بيكتب التوكنات في SecureStore وبعدين [[setToken(access)]]. الـ [[RootNavigator]] بيعمل re-render، و [[guard={!!token}]] بقى true، فـ [[(app)]] بقت متاحة و [[sign-in]] مبقتش، والـ router بينقل لوحده ويمسح شاشة الـ login من الـ history. ده ليه مفيش [[router.replace]].

الأخطاء: [[LoginForm]] بيستنى الـ promise. لو رمى، [[handleSubmit]] بيعيد رمي الخطأ (react-hook-form مش بيبلعه)، فالأحسن تمسكه جوه الفورم وتحطه في [[setError('root.server', { message })]] وتعرض [[errors.root?.server?.message]].

فرّق بين 401 من الـ login (بيانات غلط) و 401 من أي طلب تاني (توكن انتهى). الـ client بتاعنا بيحاول refresh مع أي 401، فلو مفيش refresh token (مستخدم مش داخل) هيرجع null ويكمّل للـ error عادي. ولو عايز تبقى أدق، ابعت [[retry=false]] لطلب الـ login.

[[LoginForm]] هنا في [[components]] (برّه [[src/app]]) عشان ميبقاش route. في الـ lab كنت عامله [[export]] من ملف الشاشة نفسه وده شغال، بس أنضف كده.`,
            when: R`أي تطبيق بـ email/password. لتسجيل الدخول بـ Google أو Apple: [[expo-auth-session]] أو مكتبات المزود، وبعدين نفس [[signIn]] بالتوكنات اللي الـ backend بتاعك رجّعها بعد ما اتأكد من المزود. وApple بيطلب Sign in with Apple لو فيه أي social login تاني على iOS.`,
            mistakes: R`[[router.replace('/')]] بعد [[signIn]] وكمان [[Stack.Protected]]: تنقل مزدوج وأحيانًا flash. وتعرض رسالة السيرفر الخام للمستخدم (stack trace أو SQL). وتخزن الباسورد عشان «تذكرني»: لأ، التوكن هو اللي بيتخزن. وتنسى إن [[isSubmitting]] بيقفل الزرار بس لو [[onSubmit]] بترجع promise بتستنى فعلًا.`
          },
          lines: [
            "KeyboardAvoidingView.",
            "الـ client والـ error.",
            "الـ session.",
            "الفورم (برّه src/app عشان ميبقاش شاشة).",
            "شكل الرد.",
            "الشاشة.",
            "signIn من الـ context.",
            "بيرجّع JSX.",
            "الفورم في النص، والكيبورد مبيغطيهوش.",
            "الفورم.",
            "لما القيم تبقى سليمة:",
            "حاول.",
            "POST للـ login.",
            R`خزّن التوكنات وحدّث الـ state، و [[Stack.Protected]] ينقل لوحده.`,
            "لو فشل:",
            "401 هنا معناه بيانات غلط: رسالة مفهومة.",
            "أي خطأ تاني يطلع زي ما هو.",
            "قفلة.",
            "قفلة onSubmit.",
            "قفلة الفورم.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`اللي بينقل المستخدم هو [[Stack.Protected]] في الـ root layout: [[signIn]] غيّر [[token]]، فالـ guard اتقلب، و Expo Router شال [[sign-in]] من الشاشات المتاحة ونقل لأول شاشة متاحة ([[(app)]]، يعني تاب المهام). ولو دست رجوع على Android، التطبيق هيقفل بدل ما يرجع للـ login.

وعرض الخطأ: في [[LoginForm]] لف النداء في try/catch وحط [[setError('root.server', { message: e.message })]]، واعرض [[errors.root?.server?.message]] تحت الزرار. وخلي [[onSubmit]] في الفورم async بيستنى، عشان [[isSubmitting]] يفضل true لحد ما يخلص.`,
          solCode: R`// جوه LoginForm
const { control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });
const submit = handleSubmit(async (values) => {
  try {
    await onSubmit(values);
  } catch (e) {
    setError('root.server', { message: e instanceof Error ? e.message : 'حصلت مشكلة' });
  }
});
// ...
// {errors.root?.server ? <Text style={{ color: '#dc2626' }}>{errors.root.server.message}</Text> : null}
// <Pressable onPress={submit} disabled={isSubmitting}>...`
        }
      ]
    },
    {
      t: "الصلاحيات وأجهزة الموبايل",
      l: 2,
      n: "تطلب الإذن صح، وتستخدم الكاميرا والصور والموقع والإشعارات، وتعرف إيه اللي محتاج جهاز حقيقي",
      items: [
        {
          cmd: "permissions",
          title: "الصلاحيات: تسأل إمتى، وتعمل إيه لو المستخدم رفض",
          desc: R`أي حاجة حساسة (الكاميرا، والصور، والموقع، والإشعارات، والمايك) محتاجة إذن من المستخدم وقت التشغيل. كل مكتبة Expo بتدّيك نفس الشكل: [[getXPermissionsAsync()]] (الحالة من غير سؤال) و [[requestXPermissionsAsync()]] (يسأل)، والرد فيه [[granted]] و [[status]] و [[canAskAgain]].

القاعدة الذهبية: اسأل في اللحظة اللي المستخدم فاهم فيها ليه (لما يضغط «تغيير الصورة»)، مش أول ما التطبيق يفتح. ولو رفض ومينفعش تسأل تاني ([[canAskAgain: false]])، النظام مش هيعرض السؤال خالص، فوجّهه للإعدادات بـ [[Linking.openSettings()]].`,
          example: R`import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';

export async function ensureLocationPermission(): Promise<boolean> {
  const current = await Location.getForegroundPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) {
    Alert.alert('الموقع مقفول', 'افتح الإعدادات واسمح للتطبيق بالموقع عشان نعرض الفروع القريبة.', [
      { text: 'مش دلوقتي', style: 'cancel' },
      { text: 'الإعدادات', onPress: () => Linking.openSettings() },
    ]);
    return false;
  }
  const answer = await Location.requestForegroundPermissionsAsync();
  return answer.granted;
}`,
          try: R`اكتب نفس الدالة لـ [[ImagePicker.requestMediaLibraryPermissionsAsync]]. وعلى موبايل: ارفض الإذن مرتين (Android) وشوف [[canAskAgain]] بقى إيه، وجرّب زرار الإعدادات.`,
          flag: "script",
          deep: {
            why: R`لو سألت عن ٤ صلاحيات أول ما التطبيق يفتح، أغلب الناس هترفض، ومرة الرفض الدائم مفيش رجوع منها غير من الإعدادات. وApple بترفض تطبيقات بتطلب صلاحيات من غير سبب واضح أو برسالة مبهمة.`,
            how: R`[[status]] ممكن يبقى [['granted']] أو [['denied']] أو [['undetermined']] (لسه متسألش). [[canAskAgain]] بيبقى false لما النظام نفسه مش هيعرض السؤال تاني: على iOS بعد أول رفض، وعلى Android بعد رفضين عادة (أو «Don't ask again»).

فيه صلاحيات بمستويات: الموقع [[foreground]] و [[background]] (التانية محتاجة مبرر قوي للمتاجر)، والصور على iOS ممكن «limited» (صور مختارة بس)، و Android 13+ بيفرّق بين الصور والفيديو.

رسايل الإذن على iOS ([[NSLocationWhenInUseUsageDescription]] وغيرها) بتتكتب في إعدادات الـ plugin في app.json، وبتظهر في النافذة. من غيرها iOS بيقفل التطبيق لما يطلب الإذن. وعلى Android الـ plugins بتضيف [[<uses-permission>]] في الـ manifest.

[[Linking.openSettings()]] بيفتح صفحة إعدادات التطبيق بتاعك مباشرة.

مقدرتش أجرب نوافذ الإذن في الـ lab (محتاجة جهاز أو emulator)، بس الكود بيعدّي الـ typecheck على SDK 57.`,
            when: R`قبل أي استخدام لـ API حساس، وفي اللحظة المناسبة. وممكن شاشة «pre-permission» بتاعتك تشرح الفايدة الأول، وبعدها تطلب إذن النظام.`,
            mistakes: R`تطلب كل الصلاحيات في أول شاشة. ومتتعاملش مع الرفض فالشاشة تفضل فاضية أو تقع. وتنسى رسالة الـ plugin على iOS فيقع التطبيق. وتطلب [[background location]] وانت محتاج foreground بس فالـ review يرفضك.`
          },
          lines: [
            "مكتبة الموقع (نفس الشكل في كل المكتبات).",
            "Alert و Linking.",
            "بترجع true لو معانا الإذن.",
            "الحالة من غير ما نسأل.",
            "موجود: خلاص.",
            "مرفوض ومينفعش نسأل:",
            "نشرح ونعرض الإعدادات.",
            "زرار إلغاء.",
            "زرار بيفتح إعدادات التطبيق.",
            "قفلة.",
            "مفيش إذن.",
            "قفلة.",
            "لسه ممكن نسأل: اسأل.",
            "النتيجة.",
            "قفلة."
          ],
          sol: R`على Android بعد رفضين، [[canAskAgain]] بيبقى false والطلب التالت بيرجع denied فورًا من غير نافذة. زرار «الإعدادات» بيفتح صفحة التطبيق وتقدر تفعّل الإذن من هناك، ولما ترجع [[getForegroundPermissionsAsync]] هترجع granted (ممكن تعيد الفحص لما التطبيق يرجع active بـ AppState).

على iOS [[canAskAgain]] بيبقى false بعد أول رفض على طول.`,
          solCode: R`import * as ImagePicker from 'expo-image-picker';
import { Linking } from 'react-native';

export async function ensureMediaPermission() {
  const current = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) {
    Linking.openSettings();
    return false;
  }
  return (await ImagePicker.requestMediaLibraryPermissionsAsync()).granted;
}`
        },
        {
          cmd: "image picker ورفع صورة",
          title: "تختار صورة أو تصوّر، وترفعها للـ backend بـ FormData",
          desc: R`[[expo-image-picker]] بيفتح معرض الصور ([[launchImageLibraryAsync]]) أو الكاميرا ([[launchCameraAsync]]) بواجهة النظام، ويرجّع [[assets]] فيها [[uri]] (ملف على الجهاز) و [[width]] و [[height]] و [[mimeType]]. لو المستخدم لغى: [[canceled: true]].

والرفع: [[FormData]] بتضيف فيها object شكله [[{ uri, name, type }]] (ده شكل خاص بـ RN مش [[Blob]] زي المتصفح)، وتبعته بـ [[fetch]] من غير [[Content-Type]] يدوي، والـ backend بيستقبله بـ [[multer]] زي أي رفع من الويب («تاب Backend بـ Node»). ولو محتاج كاميرا جوه الشاشة نفسها (scanner، أو preview)، [[expo-camera]] بـ [[CameraView]].`,
          example: R`import * as ImagePicker from 'expo-image-picker';

export async function pickAvatar() {
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) return null;
  const r = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.7 });
  return r.canceled ? null : r.assets[0];
}

export async function uploadAvatar(asset: ImagePicker.ImagePickerAsset, token: string) {
  const form = new FormData();
  form.append('avatar', { uri: asset.uri, name: asset.fileName ?? 'avatar.jpg', type: asset.mimeType ?? 'image/jpeg' } as unknown as Blob);
  const res = await fetch($__bt$__{process.env.EXPO_PUBLIC_API_URL}/api/me/avatar$__bt, {
    method: 'POST',
    headers: { Authorization: $__btBearer $__{token}$__bt },
    body: form,
  });
  if (!res.ok) throw new Error($__btUpload failed: $__{res.status}$__bt);
  return res.json();
}`,
          try: R`اعمل شاشة بروفايل فيها صورة ([[expo-image]]) وزرار «تغيير». اختار صورة واعرضها فورًا من [[asset.uri]] قبل ما الرفع يخلص، ولو فشل ارجع للقديمة. وضيف زرار «تصوير» بـ [[launchCameraAsync]] (محتاج [[requestCameraPermissionsAsync]]).`,
          flag: "script",
          deep: {
            why: R`صورة البروفايل، وصور المنتجات، وصور الإيصالات: رفع الصور من أكتر الـ features في أي تطبيق. وفيه تفاصيل خاصة بالموبايل: الصور من الكاميرا بتبقى ٥-١٠ ميجا، والنت بطيء، والـ FormData ليها شكل مختلف.`,
            how: R`[[launchImageLibraryAsync]] بيفتح الـ picker بتاع النظام (على Android 13+ فيه Photo Picker مش محتاج صلاحية أصلًا في حالات كتير، بس طلب الإذن مش بيضر). [[allowsEditing]] و [[aspect]] بيدّوا المستخدم يقص الصورة. [[quality: 0.7]] بيضغط JPEG. لو محتاج تصغير حقيقي للأبعاد (4000px لـ 1024px) استخدم [[expo-image-manipulator]] قبل الرفع.

[[uri]] بيبقى [[file://...]] على الجهاز. الـ networking بتاع RN بيفهم إن object فيه [[uri]] جوه FormData معناه «اقرا الملف ده وابعته»، وده ليه الشكل مش Blob. TypeScript مش عارف الشكل ده فبنعمل cast.

متحطش [[Content-Type: multipart/form-data]] بإيدك: الـ boundary لازم يتحط تلقائيًا، ولو كتبته من غيره السيرفر مش هيعرف يفصل الأجزاء. عشان كده مش بنستخدم [[api()]] اللي بيحط JSON.

على السيرفر: [[multer]] بـ [[upload.single('avatar')]] (نفس اسم الحقل)، مع حد للحجم وفحص النوع (درس [[multer]] في «تاب Backend بـ Node»).

[[expo-camera]]: [[<CameraView>]] component للكاميرا جوه شاشتك، و [[useCameraPermissions()]] hook للإذن، وبيقرا barcodes و QR.

الكود ده في الـ lab وبيعدّي الـ typecheck. الـ picker والرفع نفسهم محتاجين جهاز.`,
            when: R`image-picker: المستخدم بيختار أو بياخد صورة ويخلص. expo-camera: تجربة كاميرا جوه التطبيق (QR، أو فلاتر، أو تصوير متكرر). ولصور كبيرة كتير: رفع مباشر لـ S3 بـ presigned URL بدل ما تعدّي على سيرفرك.`,
            mistakes: R`[[Content-Type: 'multipart/form-data']] يدوي: السيرفر بيرجّع «Boundary not found» أو الملف فاضي. وترفع الصورة الأصلية ١٠ ميجا على 3G. واسم الحقل في [[append]] مختلف عن اللي في [[upload.single()]]: [[req.file]] undefined. وتنسى إن المستخدم ممكن يلغي فـ [[r.assets[0]]] تقع.`
          },
          lines: [
            "المكتبة.",
            "اختيار صورة.",
            "اطلب الإذن.",
            "مرفوض: مفيش صورة.",
            "افتح المعرض: صور بس، وقص مربع، وضغط 70%.",
            "لو لغى null، غير كده أول صورة.",
            "قفلة.",
            "الرفع.",
            "FormData.",
            R`شكل RN: object فيه [[uri]] واسم ونوع. الـ cast عشان TS متوقع Blob.`,
            "fetch مباشر (مش api() لأنه بيحط JSON).",
            "POST.",
            R`التوكن بس، ومن غير [[Content-Type]]: الـ boundary بيتحط لوحده.`,
            "الـ body هو الـ FormData.",
            "قفلة.",
            "فشل: error برقم الـ status.",
            "الرد (الـ URL الجديد مثلًا).",
            "قفلة."
          ],
          sol: R`الصورة الجديدة بتظهر فورًا من [[asset.uri]] (عرض محلي)، والرفع بيحصل في الخلفية. لو فشل، ترجع [[previousUri]] وتعرض Alert. وده نفس فكرة الـ optimistic update بس للملفات.

للتصوير: [[await ImagePicker.requestCameraPermissionsAsync()]] وبعدين [[launchCameraAsync({ quality: 0.7, allowsEditing: true, aspect: [1, 1] })]] بنفس شكل الرد. على الـ iOS simulator مفيش كاميرا، فجرّب على جهاز.`,
          solCode: R`import { Image } from 'expo-image';
import { useState } from 'react';
import { Alert, Button, View } from 'react-native';
import { pickAvatar, uploadAvatar } from '@/lib/device';
import { useSession } from '@/lib/session';

export default function Profile() {
  const { token } = useSession();
  const [uri, setUri] = useState<string | null>(null);
  const change = async () => {
    const asset = await pickAvatar();
    if (!asset || !token) return;
    const previous = uri;
    setUri(asset.uri);
    try {
      const r = await uploadAvatar(asset, token);
      setUri(r.url);
    } catch {
      setUri(previous);
      Alert.alert('الرفع فشل', 'جرّب تاني');
    }
  };
  return (
    <View style={{ alignItems: 'center', gap: 12, padding: 24 }}>
      <Image source={uri ? { uri } : require('@/assets/images/icon.png')} style={{ width: 96, height: 96, borderRadius: 48 }} />
      <Button title="تغيير الصورة" onPress={change} />
    </View>
  );
}`
        },
        {
          cmd: "location",
          title: "الموقع: getCurrentPositionAsync والعنوان والدقة",
          desc: R`[[expo-location]] بيدّيك مكان الجهاز: [[getCurrentPositionAsync({ accuracy })]] مرة واحدة، أو [[watchPositionAsync]] لتتبّع مستمر وانت في الشاشة، و [[reverseGeocodeAsync(coords)]] بيحوّل الإحداثيات لعنوان (المدينة، والشارع).

الدقة بتفرق: [[Accuracy.Balanced]] (حوالي ١٠٠ متر، سريعة وبتوفر البطارية) كفاية لـ «الفروع القريبة»، و [[High]] لتطبيقات التوصيل والخرائط. والـ background location (وانت مقفول التطبيق) قصة تانية خالص: صلاحية منفصلة ومبرر للمتاجر.`,
          example: R`import * as Location from 'expo-location';

export async function currentCity() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;
  const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
  const [place] = await Location.reverseGeocodeAsync(pos.coords);
  return { lat: pos.coords.latitude, lng: pos.coords.longitude, city: place?.city ?? null };
}`,
          try: R`اعرض «أقرب فرع» من array فروع ثابتة بإحداثياتها: احسب المسافة بـ haversine (دالة صغيرة) واختار الأقرب. وعلى الـ Android emulator غيّر الموقع من Extended controls وشوف النتيجة بتتغير.`,
          flag: "script",
          deep: {
            why: R`«الفروع القريبة»، وعنوان التوصيل التلقائي، و check-in الموظفين: الموقع من أكتر الـ features المطلوبة، ومن أكتر اللي بتستهلك بطارية وبتترفض في الـ review لو اتعملت غلط.`,
            how: R`[[getCurrentPositionAsync]] بيطلب قراءة جديدة من الـ GPS أو الشبكة، وممكن ياخد ثواني (خصوصًا جوه مبنى). [[getLastKnownPositionAsync]] بيرجّع آخر قراءة عند النظام فورًا (ممكن تكون قديمة أو null)، فتقدر تعرض بيها حاجة سريعة وبعدين تحدّث.

[[watchPositionAsync(options, callback)]] بيرجّع subscription لازم تعمله [[remove()]] لما الشاشة تتقفل (في cleanup بتاع useEffect)، وإلا الـ GPS يفضل شغال والبطارية تخلص.

[[reverseGeocodeAsync]] بيستخدم خدمة النظام (Google على Android و Apple على iOS)، والنتيجة ممكن تبقى باللغة بتاعة الجهاز أو فاضية في بعض المناطق، فمتعتمدش عليها كعنوان توصيل من غير ما المستخدم يأكد.

الـ background: [[requestBackgroundPermissionsAsync]] و [[startLocationUpdatesAsync]] مع [[expo-task-manager]]، ومحتاج development build، وجوجل وأبل بيطلبوا تبرير وفيديو.

مجربتش القراءة الفعلية (محتاجة جهاز أو emulator)، والكود متفحوص بالـ typecheck.`,
            when: R`Balanced + مرة واحدة لمعظم الحالات. watch في شاشة خريطة أو تتبع رحلة وهي مفتوحة. background بس لو ده جوهر التطبيق (توصيل، رياضة).`,
            mistakes: R`[[Accuracy.Highest]] لحاجة زي «مدينتك» فيستنى كتير ويستهلك البطارية. و watch من غير remove. وتفترض إن [[reverseGeocodeAsync]] دايمًا بيرجّع عنصر. وتبعت الموقع للسيرفر كل ثانية.`
          },
          lines: [
            "المكتبة.",
            "مدينة المستخدم.",
            "إذن الـ foreground بس.",
            "مرفوض: null.",
            "قراءة واحدة بدقة متوسطة (أسرع وأوفر).",
            "إحداثيات لعنوان، وممكن ترجع فاضية.",
            "النتيجة، والمدينة ممكن تبقى null.",
            "قفلة."
          ],
          sol: R`دالة المسافة (haversine) بترجع كيلومترات، و [[branches.reduce]] بيختار الأقل. على الـ emulator لما تغيّر الموقع من Extended controls ثم تنادي الدالة تاني، الفرع الأقرب بيتغير. لو [[getCurrentPositionAsync]] علّق كتير على الـ emulator: ابعت موقع من الـ Extended controls الأول (الـ emulator ساعات ملوش موقع مبدئي).`,
          solCode: R`type Branch = { name: string; lat: number; lng: number };

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function nearest(me: { lat: number; lng: number }, branches: Branch[]) {
  return branches.reduce((best, b) => (distanceKm(me, b) < distanceKm(me, best) ? b : best));
}
// nearest({ lat: 30.04, lng: 31.24 }, [{ name: 'المعادي', lat: 29.96, lng: 31.25 }, { name: 'مدينة نصر', lat: 30.06, lng: 31.33 }])`
        },
        {
          cmd: "notifications",
          title: "الإشعارات: local و push، و Expo push token، ومحتاج development build",
          desc: R`[[expo-notifications]] بيعمل نوعين: local (التطبيق بيجدول إشعار لنفسه: «تذكير بعد ساعة») و push (السيرفر بتاعك بيبعت للجهاز). للـ push: التطبيق بياخد إذن، ويطلب [[ExpoPushToken]] بـ [[getExpoPushTokenAsync({ projectId })]]، ويبعته للـ backend يتخزن مع المستخدم. السيرفر بعدها يبعت POST لـ Expo Push API، و Expo يوصّله لـ FCM (Android) و APNs (iOS).

مهم: الـ push مش شغال في Expo Go على Android من SDK 53. محتاج development build، ومحتاج [[projectId]] من EAS، وعلى iOS جهاز حقيقي.`,
          example: R`import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldPlaySound: false, shouldSetBadge: false, shouldShowBanner: true, shouldShowList: true }),
});

export async function registerForPush(): Promise<string | null> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', { name: 'عام', importance: Notifications.AndroidImportance.DEFAULT });
  }
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return null;
  const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
  const { data } = await Notifications.getExpoPushTokenAsync({ projectId });
  return data;
}`,
          try: R`جدول إشعار local بعد ١٠ ثواني بـ [[scheduleNotificationAsync]] (ده شغال حتى في Expo Go). وضيف [[addNotificationResponseReceivedListener]] بيفتح شاشة المهمة لما المستخدم يضغط على الإشعار ([[data: { taskId }]]).`,
          flag: "script",
          deep: {
            why: R`الإشعارات أهم أداة لرجوع المستخدمين (طلبك اتشحن، رسالة جديدة). وفيها تفاصيل كتير بتختلف بين Android و iOS وبين Expo Go والـ build، فلازم تعرف الخريطة قبل ما تبدأ عشان متضيعش يوم في «ليه التوكن مش بيطلع».`,
            how: R`[[setNotificationHandler]] بيحدد إزاي الإشعار يظهر لو جه والتطبيق مفتوح (افتراضيًا مش بيظهر). [[shouldShowBanner]] و [[shouldShowList]] هما الشكل الحالي (بدل [[shouldShowAlert]] القديم).

Android 8+ محتاج notification channel قبل أي إشعار، والمستخدم بيتحكم في كل channel لوحده من الإعدادات. Android 13+ محتاج إذن [[POST_NOTIFICATIONS]] ([[requestPermissionsAsync]] بيطلبه).

الـ push token: [[getExpoPushTokenAsync]] بيرجّع [[ExponentPushToken[...]]] مرتبط بـ [[projectId]] (بيتحط في app.json لما تعمل [[eas init]]). الـ backend بيخزنه، ويبعت:
[[POST https://exp.host/--/api/v2/push/send]] بـ [[{ to, title, body, data }]]. أو تتعامل مع FCM و APNs مباشرة بـ [[getDevicePushTokenAsync]] لو عايز تحكم كامل.

الضغط على الإشعار: [[addNotificationResponseReceivedListener]] بيدّيك [[response.notification.request.content.data]]، فتعمل [[router.push]] للشاشة. ولو التطبيق كان مقفول خالص، [[useLastNotificationResponse()]] أو [[getLastNotificationResponseAsync()]].

الكود ده من docs الـ SDK الحالية ومتفحوص بالـ typecheck في الـ lab. الإشعارات نفسها محتاجة جهاز (و push محتاج development build)، فمقدرتش أجربها.`,
            when: R`local: تذكيرات، ومؤقتات، وحاجات التطبيق عارفها. push: أي حدث على السيرفر (طلب، رسالة، دفع). ومتبعتش push لكل حاجة: المستخدم هيقفلها كلها.`,
            mistakes: R`تجرّب الـ push في Expo Go على Android وتستغرب إن التوكن مش بيطلع. وتنسى الـ channel على Android. ومفيش [[projectId]] فـ [[getExpoPushTokenAsync]] يرمي error. وتخزن توكن واحد للمستخدم بدل توكن لكل جهاز. وتتجاهل الـ receipts من Expo (فيها [[DeviceNotRegistered]] يعني امسح التوكن ده).`
          },
          lines: [
            R`[[projectId]] من إعدادات التطبيق.`,
            "المكتبة.",
            "Platform.",
            "الإشعار لو جه والتطبيق مفتوح:",
            "يظهر banner وفي القايمة، من غير صوت أو badge.",
            "قفلة.",
            "تسجيل الجهاز للـ push.",
            "Android محتاج channel:",
            "channel افتراضي باسم عربي يظهر في الإعدادات.",
            "قفلة.",
            "اطلب الإذن (Android 13+ و iOS).",
            "مرفوض: null.",
            "الـ projectId من EAS.",
            "التوكن اللي هنبعته للـ backend.",
            "رجّعه.",
            "قفلة."
          ],
          sol: R`الإشعار الـ local بيظهر بعد ١٠ ثواني حتى لو التطبيق في الخلفية. لو التطبيق مفتوح، بيظهر بس لأن [[setNotificationHandler]] بيقول [[shouldShowBanner: true]]. ولما تضغط عليه، الـ listener بياخد [[taskId]] من [[data]] ويفتح [[/tasks/42]].

لو مظهرش على Android: اتأكد إن الـ channel اتعمل وإن الإذن granted، وإن «عدم الإزعاج» مقفول.`,
          solCode: R`import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useEffect } from 'react';

export function scheduleReminder(taskId: number) {
  return Notifications.scheduleNotificationAsync({
    content: { title: 'تذكير', body: 'متنساش المهمة', data: { taskId } },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 10 },
  });
}

export function useNotificationNavigation() {
  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const taskId = response.notification.request.content.data?.taskId;
      if (taskId) router.push({ pathname: '/tasks/[id]', params: { id: String(taskId) } });
    });
    return () => sub.remove();
  }, []);
}`
        }
      ]
    },
    {
      t: "العربي و RTL",
      l: 2,
      n: "التطبيق بيتقلب يمين لشمال لوحده لو اتظبط صح: I18nManager و start/end والأرقام والخطوط",
      items: [
        {
          cmd: "I18nManager و RTL",
          title: "RTL في RN: التطبيق كله بيتقلب، بس محتاج reload",
          desc: R`في RN الـ RTL على مستوى التطبيق كله مش عنصر عنصر: لما [[I18nManager.isRTL]] يبقى true، كل [[flexDirection: 'row']] بيتقلب، و [[marginStart]] بتبقى يمين، و [[textAlign: 'left']] بتبقى يمين كمان، والـ navigation (زرار الرجوع والسحب) بتتقلب. وده بيحصل لوحده لو لغة الجهاز عربي والتطبيق بيدعم RTL.

في Expo، دعم RTL بيتظبط في plugin [[expo-localization]] في app.json ([[supportsRTL]]، و [[forcesRTL]] لو التطبيق عربي بس). وتغيير الاتجاه وقت التشغيل ([[I18nManager.forceRTL(true)]]) مش بيتطبق غير بعد ما التطبيق يعيد التحميل ([[Updates.reloadAsync()]])، ومش شغال في Expo Go.`,
          example: R`// app.json -> expo.plugins
// ["expo-localization", { "supportsRTL": true }]
import { getLocales } from 'expo-localization';
import { I18nManager, StyleSheet, Text, View } from 'react-native';

export function RtlDemo() {
  const lang = getLocales()[0]?.languageCode ?? 'en';
  return (
    <View style={styles.row}>
      <View style={styles.avatar} />
      <Text style={styles.name}>{lang === 'ar' ? 'سارة أحمد' : 'Sara Ahmed'} ({I18nManager.isRTL ? 'RTL' : 'LTR'})</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingStart: 16 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#cbd5e1' },
  name: { textAlign: 'left', writingDirection: 'auto' },
});`,
          try: R`ضيف [[forcesRTL: true]] في إعدادات الـ plugin واعمل development build (أو غيّر لغة الـ emulator لعربي). الصف اتقلب؟ الـ [[paddingStart]] راح فين؟ و [[textAlign: 'left']] عمل إيه؟ وبعدين حط أيقونة سهم [[→]] في زرار «التالي»: محتاج تقلبها بإيدك؟`,
          flag: "script",
          deep: {
            why: R`لو بتعمل تطبيق للسوق المصري أو الخليجي، العربي مش feature إضافية. تطبيق عربي بـ layout شمال ليمين بيبان «مترجم» ورخيص. والخبر الحلو إن RN بيعمل أغلب الشغل لوحده لو ماكتبتش [[left]] و [[right]] في كل حتة.`,
            how: R`[[I18nManager.isRTL]] بيتحدد وقت فتح التطبيق من لغة النظام والإعدادات (native)، وبعدها ثابت. Yoga بيقلب محور الـ row، والـ properties الـ logical ([[marginStart]] و [[paddingEnd]] و [[start]] و [[end]] و [[borderStartWidth]]) بتتقلب. [[left]] و [[right]] بتتقلب كمان افتراضيًا في RN (عكس CSS)، بس الأوضح تكتب start/end عشان أي حد يقرا الكود يفهم.

[[textAlign: 'left']] في RTL بيتحول يمين (بيتعامل كـ «start»). و [[writingDirection: 'auto']] بيخلي النص المختلط (عربي فيه كلمة English أو رقم) يتعرض صح.

الأيقونات الاتجاهية (أسهم، و chevron) مش بتتقلب لوحدها: [[transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]]]. والأيقونات اللي ليها معنى ثابت (ساعة، play) متقلبهاش.

الـ plugin: [[supportsRTL]] بيسمح للتطبيق يتقلب لما لغة الجهاز RTL (في SDK 57 ده بيتظبط من plugin الـ localization، والـ docs بتوضح إزاي تقفله بـ false). [[forcesRTL]] بيجبره RTL دايمًا. والتغيير وقت التشغيل: [[I18nManager.allowRTL]] و [[forceRTL]] وبعدين [[Updates.reloadAsync()]] من [[expo-updates]].

على الويب: [[getLocales()[0].textDirection]] وتحطه [[dir]] على الـ root View.

الكود متفحوص بالـ typecheck، و [[getLocales]] شغالة في Jest (الـ mock بتاع jest-expo). شكل الـ RTL الفعلي محتاج جهاز.`,
            when: R`أي تطبيق فيه عربي. وخليها من أول يوم: تحويل تطبيق كامل مكتوب بـ left/right لـ RTL بعدين شغل أسبوع.`,
            mistakes: R`[[marginLeft]] و [[paddingRight]] في كل حتة، وبعدين تكتشف إن الشكل مش متناسق. وتقلب الـ layout بإيدك بـ [[flexDirection: isRTL ? 'row-reverse' : 'row']] وفي نفس الوقت RN بيقلبه، فيرجع زي ما كان! وتتوقع إن [[forceRTL]] يتطبق فورًا. وتنسى الأيقونات الاتجاهية. وفي Expo Go تجرّب الـ forceRTL وتستغرب إنه مش شغال.`
          },
          lines: [
            "لغات الجهاز.",
            "I18nManager.",
            "صف فيه صورة واسم.",
            "أول لغة في إعدادات الجهاز.",
            "بيرجّع JSX.",
            "الصف: بيتقلب لوحده في RTL.",
            "الصورة: في RTL بتبقى يمين.",
            "الاسم وحالة الاتجاه.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة.",
            "الستايلات.",
            R`row عادي، و [[paddingStart]] بدل [[paddingLeft]].`,
            "الصورة.",
            R`[[left]] في RTL بيتعامل كـ start (يمين)، و [[auto]] للنص المختلط.`,
            "قفلة."
          ],
          sol: R`مع RTL: الصورة بقت يمين والاسم شمالها، و [[paddingStart]] بقى على اليمين، و [[textAlign: 'left']] بقى محاذي يمين، والنص بيقول RTL. كل ده من غير ولا سطر زيادة.

السهم [[→]] كنص مش هيتقلب، فـ «التالي» هيشاور ناحية الرجوع في العربي. الحل: اختار السهم حسب [[I18nManager.isRTL]]، أو اقلب الأيقونة بـ [[scaleX: -1]]. ولو لقيت الـ layout ماتقلبش: انت غالبًا في Expo Go، أو الـ plugin مش في app.json، أو معملتش build جديد بعد ما ضفته.`,
          solCode: R`import { I18nManager, Text } from 'react-native';

export function NextArrow() {
  return <Text style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}>→</Text>;
}`
        },
        {
          cmd: "الأرقام والخطوط العربي",
          title: "الأرقام والعملة والتواريخ بالعربي، والخط العربي",
          desc: R`[[Intl]] شغال في Hermes: [[new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' })]] بيكتب السعر بالعربي، و [[Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium' })]] للتاريخ، و [[Intl.RelativeTimeFormat('ar')]] لـ «قبل 3 ساعات». وقرّر: أرقام عربية (٠١٢٣) ولا لاتينية (0123)؟ [[ar-EG]] بيطلّع عربية، و [[ar-EG-u-nu-latn]] بيخليها لاتينية مع باقي النص عربي.

والخط: خط النظام الافتراضي بيعرض عربي كويس، بس لو عايز خط زي Cairo أو IBM Plex Sans Arabic، حمّله بـ [[expo-font]] ([[useFonts]] أو الـ config plugin) وحطه في component [[AppText]] واحد.`,
          example: R`import { getLocales } from 'expo-localization';

const lang = getLocales()[0]?.languageCode ?? 'en';
const locale = lang === 'ar' ? 'ar-EG' : 'en-US';

export const formatPrice = (n: number) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: 'EGP' }).format(n);

export const formatDate = (d: Date) =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(d);

export const formatLatinDigits = (n: number) =>
  new Intl.NumberFormat('ar-EG-u-nu-latn').format(n);

const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
export const hoursAgo = (h: number) => rtf.format(-h, 'hour');`,
          try: R`شغّل الدوال دي في Node ([[node -e]]) بـ [[ar-EG]] و [[en-US]] وقارن الناتج بالناتج في التطبيق (Hermes). وبعدين حمّل خط Cairo بـ [[useFonts]] واعمل [[AppText]] بيستخدمه.`,
          flag: "script",
          deep: {
            why: R`«١٬٢٥٠٫٠٠ ج.م.‏» ولا «EGP 1,250.00» ولا «1250 جنيه»؟ ده قرار منتج بيتكرر في كل شاشة. لو كل واحد كتب التنسيق بإيده هتلاقي ٤ أشكال في نفس التطبيق، و [[Intl]] بيحل ده بدالة واحدة.`,
            how: R`Hermes بيدعم [[Intl]] (NumberFormat و DateTimeFormat و RelativeTimeFormat و PluralRules وغيرهم) على Android و iOS، بس الناتج ممكن يختلف شوية عن Node أو Chrome لأن كل واحد معتمد على بيانات ICU مختلفة. عشان كده اختبر الشكل النهائي على جهاز، ومتكتبش اختبارات بتقارن string بالحرف مع ناتج Intl.

[[-u-nu-latn]] امتداد Unicode في الـ locale معناه «numbering system لاتيني». كتير من التطبيقات المصرية بتستخدم الأرقام اللاتينية حتى في الواجهة العربية، وده قرار منتج.

[[Intl.NumberFormat]] بتاخد وقت تتعمل، فاعملها مرة برّه الدالة لو هتستخدمها في list كبيرة (زي [[rtf]] في المثال).

الخطوط: [[expo-font]] بـ [[useFonts({ Cairo: require('./assets/fonts/Cairo.ttf') })]] وقت التشغيل، أو من SDK حديث الـ config plugin بتاعه بيحط الخط جوه الـ build فيبقى جاهز من أول frame. وخلي بالك إن [[fontWeight]] مع خط custom على Android محتاج ملف منفصل لكل وزن ([[Cairo-Bold]]) في أغلب الحالات.

جربت الدوال دي في Node 22 وقت الكتابة: [[formatPrice(1250)]] بـ [[ar-EG]] طلعت أرقام عربية وعملة ج.م.، و [[ar-EG-u-nu-latn]] طلعت 1,250 بأرقام لاتينية. ناتج Hermes نفسه مجربتوش.`,
            when: R`أي رقم أو سعر أو تاريخ بيظهر للمستخدم. والترجمة نفسها (النصوص) بـ [[i18next]] زي «تاب React» (درس [[react-i18next]])، بنفس الـ API تقريبًا في RN مع [[expo-localization]] بدل اكتشاف لغة المتصفح.`,
            mistakes: R`[[price + ' جنيه']] في كل حتة. و [[toLocaleString()]] من غير locale فيطلع حسب الجهاز (ساعات إنجليزي في نص عربي). واختبارات بتقارن ناتج Intl بالحرف وتفشل على CI. وتحمّل الخط في كل شاشة بدل مرة في الـ root layout.`
          },
          lines: [
            "لغة الجهاز.",
            "أول لغة.",
            "locale التنسيق.",
            "تنسيق السعر.",
            "عملة بالـ locale.",
            "تنسيق التاريخ.",
            "تاريخ ووقت.",
            "عربي بأرقام لاتينية.",
            R`[[-u-nu-latn]] = numbering system لاتيني.`,
            "formatter واحد يتعمل مرة.",
            "«قبل 3 ساعات» أو «3 hours ago»."
          ],
          sol: R`في Node 22: [[new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(1250)]] بتطلع حاجة زي «‏١٬٢٥٠٫٠٠ ج.م.‏» (أرقام عربية وعلامات اتجاه مخفية)، و [[en-US]] بتطلع «EGP 1,250.00»، و [[ar-EG-u-nu-latn]] بتطلع «1,250». و [[rtf.format(-3, 'hour')]] بـ [['ar']] طلعت «قبل 3 ساعات» بأرقام لاتينية، لأن [['ar']] لوحدها في بيانات CLDR الحديثة أرقامها لاتينية، أما [['ar-EG']] فعربية. فلو عايز شكل واحد في التطبيق كله، ابعت نفس الـ locale لكل الـ formatters.

في التطبيق ممكن تلاقي اختلاف صغير (مسافة أو علامة). ده طبيعي، وده سبب إن الاختبارات متقارنش الـ string بالحرف.`,
          solCode: R`// src/components/AppText.tsx
import { useFonts } from 'expo-font';
import { Text, type TextProps } from 'react-native';

export function useAppFonts() {
  return useFonts({ Cairo: require('@/assets/fonts/Cairo-Regular.ttf'), 'Cairo-Bold': require('@/assets/fonts/Cairo-Bold.ttf') });
}

export function AppText({ style, ...props }: TextProps) {
  return <Text {...props} style={[{ fontFamily: 'Cairo', writingDirection: 'auto' }, style]} />;
}`
        }
      ]
    },
    {
      t: "الأداء",
      l: 3,
      n: "قوايم سريعة بـ FlashList، و re-renders أقل مع React Compiler، و animations على الـ UI thread بـ Reanimated",
      items: [
        {
          cmd: "FlashList",
          title: "FlashList: قايمة بتعيد استخدام الـ views بدل ما تعمل جديد",
          desc: R`FlatList بيعمل component جديد لكل عنصر بيدخل الشاشة ويمسح اللي بيطلع. [[FlashList]] من Shopify بيعمل recycling: الـ view اللي طلع من فوق بيتعاد استخدامه للعنصر اللي داخل من تحت بـ props جديدة، زي RecyclerView في Android و UICollectionView في iOS. النتيجة: scroll أنعم وذاكرة أقل وشاشات بيضا أقل وانت بتنزل بسرعة.

الـ API تقريبًا نفس FlatList: [[data]] و [[renderItem]] و [[keyExtractor]]. في v2 (اللي شغالة على الـ New Architecture بس) مبقتش محتاج [[estimatedItemSize]]. ولو القايمة فيها أنواع مختلفة (رسالة نص، وصورة، وتاريخ)، [[getItemType]] بيخلي كل نوع يتعاد استخدامه من نوعه.`,
          example: R`import { FlashList } from '@shopify/flash-list';
import { Text, View } from 'react-native';

type Msg = { id: string; kind: 'text' | 'image' | 'day'; body: string };

function MessageRow({ msg }: { msg: Msg }) {
  if (msg.kind === 'day') return <Text style={{ textAlign: 'center', color: '#64748b', padding: 8 }}>{msg.body}</Text>;
  return (
    <View style={{ padding: 12 }}>
      <Text>{msg.kind === 'image' ? '📷 صورة' : msg.body}</Text>
    </View>
  );
}

export function Chat({ messages }: { messages: Msg[] }) {
  return (
    <FlashList
      data={messages}
      keyExtractor={(m) => m.id}
      getItemType={(m) => m.kind}
      renderItem={({ item }) => <MessageRow msg={item} />}
      maintainVisibleContentPosition={{ startRenderingFromBottom: true }}
    />
  );
}`,
          try: R`في [[MessageRow]] ضيف [[const [liked, setLiked] = useState(false)]] وزرار ♥ بيقلبها. اعمل like لأول رسالة، وانزل لتحت بسرعة: هتلاقي رسالة تانية عليها ♥ من غير ما تدوس. ليه؟ وصلّحها بـ [[useRecyclingState]].`,
          flag: "script",
          deep: {
            why: R`القوايم هي أكتر مكان بيبان فيه إن تطبيق RN «بطيء»: شاشة بيضا وانت بتعمل scroll سريع، أو تقطيع في feed فيه صور. FlashList بيحل أغلب ده من غير ما تغيّر طريقة تفكيرك، وده بيتسأل في الانترفيو: «FlatList ولا FlashList وليه؟».`,
            how: R`FlatList: كل عنصر بيخرج من الـ window بيتعمله unmount، وكل عنصر داخل mount جديد: إنشاء native views، و layout، وتشغيل الـ hooks من الأول. على موبايل متوسط مع عناصر تقيلة ده بيبان كـ blank cells.

FlashList: بيحتفظ بـ pool من الـ cells. العنصر اللي بيدخل بياخد cell موجودة ويتعمل لها re-render بالـ props الجديدة بس، وده أرخص بكتير من mount. [[getItemType]] بيعمل pool لكل نوع، فـ cell الصورة متتعادش كـ cell نص (وده كان هيعمل تغيير كبير في الشجرة).

العيب: الـ state المحلي جوه العنصر ([[useState]]) بيفضل مع الـ cell، مش مع الـ item. فلما الـ cell تتعاد لرسالة تانية، الـ state القديمة معاها. الحل: الـ state تبقى في البيانات نفسها (أو store)، أو [[useRecyclingState(initial, [item.id])]] اللي بيعمل reset لما الـ item يتغير. ونفس الكلام لـ shared values بتاعة Reanimated.

v2: مكتوبة من جديد للـ New Architecture، بتقيس أحجام العناصر sync فمبقتش محتاجة تقدير، وفيها [[masonry]] و [[maintainVisibleContentPosition]] للشات.

في الـ lab: شاشة المهام بـ FlashList شغالة في اختبار Jest (العناصر بتظهر، مع تحذير act من الـ recycler)، و [[expo install]] في SDK 57 ركّب 2.0.2. الإحساس الحقيقي بالسرعة محتاج جهاز، ويفضل release build.`,
            when: R`قوايم طويلة أو عناصرها تقيلة (صور، كروت)، أو feeds بيعمل فيها المستخدم scroll كتير. لقايمة ٢٠ عنصر ثابتة، FlatList كفاية. وقبل ما تغيّر المكتبة: اتأكد إن الـ renderItem نفسه مش تقيل (memo، وصور بحجمها).`,
            mistakes: R`[[useState]] جوه العنصر (مثال الـ like) فتلاقي state عنصر ظاهرة على عنصر تاني. و [[key]] جوه renderItem على العنصر الخارجي: بيمنع الـ recycling (كل key جديد = mount جديد). وتقيس الأداء في dev mode: الـ dev بطيء جدًا، قيس في release build ([[npx expo run:android --variant release]]).`
          },
          lines: [
            "FlashList.",
            "الـ components.",
            "رسالة بنوع.",
            "صف رسالة.",
            "فاصل التاريخ شكل تاني خالص.",
            "بيرجّع JSX.",
            "صندوق.",
            "النص أو علامة صورة.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة.",
            "الشات.",
            "بيرجّع JSX.",
            "القايمة.",
            "البيانات.",
            "مفتاح ثابت.",
            "pool لكل نوع: cell الصورة متتعادش لنص.",
            "رسم عنصر.",
            "للشات: يبدأ من تحت ويحافظ على المكان لما رسايل تتضاف.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`الـ ♥ بيظهر على رسالة مدستش عليها لأن الـ [[useState]] عايش في الـ cell، والـ cell اتعادت لرسالة تانية ومعاها [[liked = true]]. في FlatList مكانش هيحصل (unmount بيمسح الـ state)، بس كان هيحصل حاجة تانية: الـ like يضيع لما ترجع لفوق.

[[useRecyclingState(false, [msg.id])]] بيعمل reset للقيمة لما [[msg.id]] يتغير، فالـ cell المعادة تبدأ بـ false. بس لاحظ إن الـ like نفسه لسه بيضيع لما الرسالة تطلع وترجع. الحل الصح لبيانات حقيقية: الـ liked جزء من الـ data (من السيرفر أو store)، والعنصر بيقراه من props.`,
          solCode: R`import { useRecyclingState } from '@shopify/flash-list';
import { Pressable, Text, View } from 'react-native';

function MessageRow({ msg }: { msg: Msg }) {
  const [liked, setLiked] = useRecyclingState(false, [msg.id]);
  return (
    <View style={{ padding: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text>{msg.body}</Text>
      <Pressable onPress={() => setLiked(!liked)}>
        <Text>{liked ? '♥' : '♡'}</Text>
      </Pressable>
    </View>
  );
}`
        },
        {
          cmd: "re-renders و React Compiler",
          title: "re-renders في RN: React Compiler، و memo، وإمتى بيفرقوا",
          desc: R`نفس قواعد «تاب React»: component بيعيد الرسم لما الـ state بتاعته أو الأب يتغير. في RN التكلفة أوضح لأن الـ JS thread واحد وبيعمل كل حاجة (المنطق، والـ render، والـ events)، فلو اتشغل بـ re-renders كتير، الضغطات بتتأخر والـ scroll بيقطّع.

القالب في SDK 57 مفعّل React Compiler ([[experiments.reactCompiler: true]] في app.json): بيعمل memoization تلقائي للـ components والقيم وقت الـ build، فأغلب [[useMemo]] و [[useCallback]] و [[memo]] اللي كنت بتكتبها بإيدك مبقتش لازمة. بس لازم تفهم إيه اللي بيعمله عشان تعرف لما مش بيكفي.`,
          example: R`import { memo, useCallback } from 'react';
import { FlatList, Pressable, Text } from 'react-native';

type Task = { id: number; title: string; done: boolean };

const TaskRow = memo(function TaskRow({ task, onToggle }: { task: Task; onToggle: (id: number) => void }) {
  return (
    <Pressable onPress={() => onToggle(task.id)}>
      <Text style={{ padding: 16, textDecorationLine: task.done ? 'line-through' : 'none' }}>{task.title}</Text>
    </Pressable>
  );
});

export function TaskList({ tasks, onToggle }: { tasks: Task[]; onToggle: (id: number) => void }) {
  const renderItem = useCallback(({ item }: { item: Task }) => <TaskRow task={item} onToggle={onToggle} />, [onToggle]);
  return <FlatList data={tasks} keyExtractor={(t) => String(t.id)} renderItem={renderItem} />;
}`,
          try: R`افتح React Native DevTools (دوس [[j]] في expo start)، وفعّل «Highlight updates» في تاب الـ Profiler. قلّب مهمة واحدة: كام صف اتلوّن؟ جرّب مرة بـ [[memo]] ومرة من غيره، ومرة والـ React Compiler مقفول ([[reactCompiler: false]]).`,
          flag: "script",
          deep: {
            why: R`«التطبيق تقيل» في RN غالبًا مش من RN نفسه، من re-renders زيادة: context كبير بيتغير كل ثانية، أو دالة جديدة كل render بتكسر الـ memo في list فيها ٥٠٠ عنصر. لازم تعرف تقيس قبل ما تصلّح.`,
            how: R`RN فيه threads أساسية: الـ JS thread (كودك و React)، والـ UI/main thread (الرسم واللمس في النظام)، وخيط layout. لو الـ JS thread مشغول ١٠٠ms في render، أي [[onPress]] بيستنى، وأي animation مكتوبة بـ JS بتقف. الـ UI نفسه (الـ scroll الأصلي) بيفضل شغال، عشان كده تلاقي الـ scroll ماشي والعناصر بيضا (JS مش ملاحق يرسمها).

React Compiler: babel plugin بيحلل كل component ويعمل cache تلقائي للـ JSX والقيم المشتقة والدوال، كأنك كتبت [[useMemo]] و [[useCallback]] في كل حتة صح. بيفترض إنك ماشي على قواعد React (مفيش تعديل للـ props أو الـ state مباشرة، ومفيش side effects في الـ render). لو component مخالف، الـ compiler بيسيبه من غير تحسين. التفاصيل في «تاب React» (درس [[React Compiler]]).

من غير compiler: [[memo]] على الصف + [[useCallback]] للـ callback اللي نازل له، وإلا الـ memo مالوش لازمة لأن [[onToggle]] جديدة كل مرة. والـ [[renderItem]] نفسه لو inline بيتعمل جديد كل render.

القياس: React Native DevTools (نفس Chrome DevTools، فيه React Profiler و Components)، و «Perf Monitor» من قايمة الـ dev بيعرض FPS للـ JS و UI. والحكم النهائي على release build على موبايل متوسط، مش dev على موبايلك الغالي.

جربت الـ template في الـ lab: [[reactCompiler: true]] موجود، و [[babel-plugin-react-compiler]] متركب، والـ bundle اتبنى بيه في [[expo export]].`,
            when: R`خلي الـ compiler شغال. وفكّر في memo يدوي لما: الـ Profiler يوريك صفوف بتعيد رسم من غير سبب، أو مكتبة بتقارن props بالمرجع (زي FlatList و [[extraData]]). ومتعملش memo لكل حاجة من غير قياس.`,
            mistakes: R`[[memo]] على الصف و [[onToggle={() => toggle(id)}]] inline من الأب: الـ memo اتكسر. و context واحد فيه كل حاجة (user و theme و cart و socket) فأي تغيير بيعيد رسم التطبيق كله. وتقيس في dev mode وتستنتج إن RN بطيء. و [[console.log]] كتير في الـ render: في dev بيبطّأ جدًا.`
          },
          lines: [
            "memo و useCallback (لو مفيش compiler).",
            "الـ components.",
            "نوع.",
            "صف ملفوف في memo: مش بيعيد الرسم غير لو props اتغيرت (بالمرجع).",
            "بيرجّع JSX.",
            "الضغطة بتبعت الـ id.",
            "العنوان، مشطوب لو خلصت.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة الـ memo.",
            "القايمة.",
            R`[[renderItem]] ثابت طول ما [[onToggle]] ثابتة (والأب لازم يعمل onToggle بـ useCallback كمان).`,
            "القايمة.",
            "قفلة."
          ],
          sol: R`من غير memo ومن غير compiler: كل الصفوف الظاهرة بتتلوّن مع كل toggle (لأن [[tasks]] array جديد والأب بيعيد رسم كل حاجة). مع [[memo]] و [[onToggle]] ثابتة: الصف اللي اتغير بس. مع الـ compiler شغال ومن غير memo يدوي: غالبًا نفس نتيجة الـ memo، لأن الـ compiler عمل التحسين ده لوحده.

لو لقيت كل الصفوف بتتلوّن حتى مع memo: [[onToggle]] جاية من الأب من غير [[useCallback]] (أو الـ compiler مقفول)، فكل render دالة جديدة.`
        },
        {
          cmd: "Reanimated",
          title: "Reanimated: animations على الـ UI thread مش على JS",
          desc: R`[[Animated]] المدمج شغال للحاجات البسيطة، بس [[react-native-reanimated]] هو المعيار: الـ animation بتتحسب على الـ UI thread، فحتى لو الـ JS thread مشغول (بيعمل render أو بيحلل JSON)، الحركة بتفضل ناعمة 60 أو 120fps.

الأساس: [[useSharedValue(1)]] قيمة عايشة على الـ UI thread، و [[useAnimatedStyle(() => ({ ... }))]] ستايل بيتحسب منها، و [[withSpring]] و [[withTiming]] بيحركوها. وفي Reanimated 4 (اللي مع SDK 57، مع [[react-native-worklets]]) فيه كمان CSS animations و transitions بالشكل اللي تعرفه من CSS.`,
          example: R`import { Pressable, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';

export function LikeButton({ onLike }: { onLike: () => void }) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="إعجاب"
      onPress={() => {
        scale.value = withSequence(withSpring(1.4), withSpring(1));
        onLike();
      }}>
      <Animated.View style={style}>
        <Text>♥</Text>
      </Animated.View>
    </Pressable>
  );
}`,
          try: R`ضيف في الشاشة زرار بيعمل loop تقيل على JS ([[const end = Date.now() + 2000; while (Date.now() < end) {}]]) وبعدين اضغط الـ like أثناءه. وقارن بنسخة بـ [[Animated]] المدمج من غير [[useNativeDriver]]. (محتاج جهاز أو emulator، في Jest مفيش animation حقيقية.)`,
          flag: "script",
          deep: {
            why: R`الـ animations والـ gestures هي أكتر حاجة بتفرّق «تطبيق حاسس إنه native» عن «موقع في تطبيق». وأي animation على الـ JS thread هتقطّع في أسوأ وقت (وقت تحميل البيانات بالظبط). وده سؤال انترفيو ثابت: «إيه الـ worklet؟».`,
            how: R`[[useAnimatedStyle]] بتاخد دالة worklet: دالة JS بيتعملها نسخ لـ runtime JS تاني صغير شغال على الـ UI thread (مكتبة [[react-native-worklets]] بتعمل ده في Reanimated 4، و babel plugin بيجهّز الدوال). لما [[scale.value]] تتغير، الـ worklet بتتنفذ هناك وتحدّث الـ native view مباشرة من غير ما تعدّي على React أو الـ JS thread.

[[scale.value = withSpring(1.4)]] من الـ JS thread بيبعت «ابدأ animation» مرة واحدة، والـ frames كلها بتتحسب على الـ UI thread. [[withSequence]] بيشغّلهم ورا بعض.

مع gestures ([[react-native-gesture-handler]]، متركب في القالب): الـ gesture نفسه بيتعالج على الـ UI thread، فـ drag أو swipe بيتبع الصباع من غير أي تأخير.

الاختبارات: في الـ lab احتجت [[jest.mock('react-native-worklets', () => require('react-native-worklets/src/mock'))]] و [[require('react-native-reanimated').setUpTests()]] في الـ jest setup، وإلا الاختبار بيقع بـ «Cannot read properties of undefined (reading 'loadUnpackers')». بعدها الاختبار ضغط الزرار واتأكد إن [[onLike]] اتنادت.

وجوه FlashList: الـ shared value بتفضل مع الـ cell المعادة، فاعملها reset لما الـ item يتغير (الـ docs بتاعة FlashList فيها المثال ده).`,
            when: R`أي animation مرتبطة بلمس أو scroll، أو لازم تفضل ناعمة وقت التحميل. انتقالات بسيطة (fade لما عنصر يظهر): الـ layout animations في Reanimated ([[entering={FadeIn}]]) أو CSS transitions في v4. و [[Animated]] المدمج مع [[useNativeDriver: true]] كفاية لـ opacity و transform بسيطين.`,
            mistakes: R`تقرا [[scale.value]] جوه الـ render (مش جوه worklet): مش reactive ومش هيتحدث. وتنادي دالة JS عادية (setState) من جوه worklet مباشرة: لازم [[scheduleOnRN]] (أو [[runOnJS]] القديمة). وتنسى الـ jest setup فكل الاختبارات تقع. وتعمل animation لـ [[width]] و [[height]] بدل [[transform]]: الـ layout بيتحسب كل frame وأتقل.`
          },
          lines: [
            "الـ components.",
            "Reanimated: الـ View المتحرك والـ hooks والـ animations.",
            "زرار like بـ نبضة.",
            "قيمة عايشة على الـ UI thread.",
            "ستايل بيتحسب منها على الـ UI thread (worklet).",
            "بيرجّع JSX.",
            "الزرار.",
            "دور.",
            "اسم.",
            "لما يتضغط:",
            "كبّر لـ 1.4 ورجّع لـ 1 بـ spring: كله على الـ UI thread.",
            "والفعل نفسه على JS.",
            "قفلة.",
            R`[[Animated.View]] بياخد الستايل المتحرك.`,
            "القلب.",
            "قفلة.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`أثناء الـ loop (الـ JS thread واقف ثانيتين): الضغطة نفسها مش هتتسجل غير بعد ما الـ loop يخلص، لأن [[onPress]] على JS. لكن لو الـ animation كانت بدأت قبل الـ loop، هتكمل ناعمة على Reanimated، وهتقف مكانها لو [[Animated]] من غير native driver.

الدرس: Reanimated بيحمي الحركة نفسها، مش الـ events. عشان كده gesture-handler + Reanimated مع بعض: اللمس والحركة الاتنين على الـ UI thread.`
        }
      ]
    },
    {
      t: "الاختبارات",
      l: 3,
      n: "jest-expo و React Native Testing Library (v14 بقت async)، و mocks للـ native modules، وشاشات فيها API",
      items: [
        {
          cmd: "jest-expo + RNTL",
          title: "أول اختبار: jest-expo و React Native Testing Library",
          desc: R`الاختبارات في RN بتشتغل بـ Jest (مش Vitest زي «تاب React»)، مع [[jest-expo]] preset اللي بيعمل mocks للـ native modules بتاعة Expo ويظبط babel. و [[@testing-library/react-native]] (RNTL) بيدّيك نفس فلسفة Testing Library: [[render]] و [[screen.getByRole]] و [[getByText]] و [[userEvent]].

مفيش DOM ولا jsdom: RNTL بيرسم الشجرة في test renderer ويدوّر فيها. وفي v14 (اللي مع React 19) [[render]] و [[fireEvent]] و [[act]] بقوا async، فلازم [[await]]. والـ matchers زي [[toBeOnTheScreen()]] جاهزة من غير setup.`,
          example: R`// npx expo install jest-expo jest @testing-library/react-native @types/jest -- --save-dev
// npm i -D test-renderer@1.2
// package.json: "scripts": { "test": "jest" }, "jest": { "preset": "jest-expo", "setupFiles": ["./jest.setup.ts"] }
// tsconfig.json: "compilerOptions": { "types": ["jest"] }
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Counter } from '@/components/Counter';

test('starts at the given number and increments on press', async () => {
  await render(<Counter start={5} />);
  expect(screen.getByText('Count: 5')).toBeOnTheScreen();
  await fireEvent.press(screen.getByRole('button', { name: 'Increment' }));
  expect(screen.getByText('Count: 6')).toBeOnTheScreen();
});`,
          try: R`اعمل [[Counter]] ([[Text]] فيه [[Count: {count}]] و [[Pressable]] بـ [[accessibilityRole="button"]] جواه Text «Increment»)، وشغّل [[npm test]]. بعدين شيل [[await]] من قدام [[render]] وشوف إيه اللي بيحصل. وشيل [[accessibilityRole]] وشوف [[getByRole]] بيقول إيه.`,
          flag: "script",
          deep: {
            why: R`مفيش موبايل في الـ CI، ومش هتفتح التطبيق وتدوس على كل زرار بعد كل تعديل. اختبارات الـ components بتشتغل في ثواني على أي جهاز، وبتمسك الـ bugs في المنطق والعرض (الشروط، والفورمات، وحالات loading و error).`,
            how: R`[[jest-expo]] preset بيعمل: transform بـ [[babel-preset-expo]] لكل الملفات (حتى اللي في node_modules بتاعة RN)، و mocks لأغلب [[expo-*]] modules، ويشغّل الاختبارات في بيئة شبه iOS افتراضيًا (فيه presets لكل منصة).

RNTL v14: بيستخدم [[test-renderer]] بدل [[react-test-renderer]] القديم (deprecated)، ومحتاجه كـ peer dependency بنسخة تناسب React عندك ([[test-renderer@1.2]] لـ React 19.2). في الـ lab npm جاب 1.3 لوحده، وركّبت 1.2 بإيدي عشان يطابق React 19.2.3.

[[await render()]]: الـ rendering في React 19 async (Suspense و [[use()]])، فـ RNTL بقى async عشان يستنى. [[fireEvent.press]] بيبعت event واحد لأقرب عنصر عنده [[onPress]]، و [[userEvent.press]] (الدرس الجاي) بيحاكي الضغطة كاملة (pressIn و pressOut).

[[getByRole('button', { name })]] بيدوّر بالـ accessibility role والاسم (النص اللي جوه أو [[accessibilityLabel]]). وده بيجبرك تكتب components accessible، وده كويس.

TypeScript 6 بيبدأ بـ [[types]] فاضي، فمن غير [[types: ["jest"]]] في tsconfig هتلاقي «Cannot find name 'test'» في الـ typecheck (مع إن jest نفسه شغال). حصلت معايا في الـ lab بالظبط.`,
            when: R`أي component فيه منطق، وأي hook، وأي دالة في [[lib/]]. و E2E على موبايل حقيقي (Maestro أو Detox) لتدفقات قليلة مهمة (login، والدفع)، مش لكل حاجة.`,
            mistakes: R`تنسى [[await]] مع RNTL 14: التأكيدات بتشتغل قبل ما الشجرة تترسم، والاختبار يفشل أو يعدّي بالصدفة. وتستخدم [[getByTestId]] في كل حتة بدل [[getByRole]] و [[getByText]]. و [[react-test-renderer]] القديم مع RNTL 14. وتختبر snapshots كبيرة لكل شاشة: بتتكسر مع أي تعديل ومحدش بيقراها.`
          },
          lines: [
            "render يرسم، و screen يدوّر، و fireEvent يبعت events.",
            "الكومبوننت.",
            "الاختبار async لأن RNTL 14 كله async.",
            R`[[await render]].`,
            R`النص ظاهر. [[toBeOnTheScreen]] matcher جاهز.`,
            R`دوّر على الزرار بالدور والاسم واضغطه، و [[await]] كمان.`,
            "النص اتغير.",
            "قفلة."
          ],
          sol: R`[[npm test]] المفروض يطبع PASS واختبار واحد passed.

من غير [[await]] قدام [[render]]: الاختبار بيفشل بـ «$__btrender$__bt function has not been called»، لأن [[screen]] اتقري قبل ما الـ render يخلص (ده اللي طلعلي في الـ lab على RNTL 14). ومن غير [[accessibilityRole="button"]]: [[getByRole('button', ...)]] بيفشل بـ «Unable to find an element with role: button, name: Increment»، مع إن الزرار شغال. الحل الصح إنك ترجّع الـ role (مش إنك تغيّر الاختبار لـ getByText)، لأن قارئ الشاشة كمان محتاجه.

في الـ lab الاختبار ده عدّى على SDK 57 (jest 29 و RNTL 14.0.1 و test-renderer 1.2).`,
          solCode: R`import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export function Counter({ start = 0 }: { start?: number }) {
  const [count, setCount] = useState(start);
  return (
    <View>
      <Text>Count: {count}</Text>
      <Pressable accessibilityRole="button" onPress={() => setCount((c) => c + 1)}>
        <Text>Increment</Text>
      </Pressable>
    </View>
  );
}`
        },
        {
          cmd: "اختبار شاشة فيها API",
          title: "تختبر شاشة بتجيب بيانات: QueryClient جديد، و mock للـ API، و findBy",
          desc: R`شاشة المهام بتستخدم [[useQuery]] و [[api()]]. في الاختبار: اعمل [[jest.mock('@/lib/api')]] يرجّع بيانات ثابتة، ولف الشاشة في [[QueryClientProvider]] بـ client جديد لكل اختبار و [[retry: false]]، واستنى العنصر بـ [[findByText]] (بيستنى لحد ثانية) بدل [[getByText]].

نفس الفكرة لأي provider: لو الشاشة بتستخدم [[useSession]] أو theme، اعمل [[wrapper]] بيلفها. و MSW بيشتغل في RN كمان لو عايز تعمل mock على مستوى الشبكة زي «تاب React»، بس mock للـ module أبسط لأغلب الحالات.`,
          example: R`import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react-native';
import type { PropsWithChildren } from 'react';
import TasksScreen from '@/app/(app)/(tabs)/index';

jest.mock('@/lib/api', () => ({
  api: jest.fn(async () => [{ id: 1, title: 'اكتب الاختبارات', done: false }]),
}));

function wrapper({ children }: PropsWithChildren) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

test('shows tasks from the API', async () => {
  await render(<TasksScreen />, { wrapper });
  expect(await screen.findByText('اكتب الاختبارات')).toBeOnTheScreen();
});`,
          try: R`ضيف اختبار تاني: الـ [[api]] يرمي [[new Error('Network')]]، والشاشة لازم تعرض «حصلت مشكلة: Network». هتحتاج [[jest.mocked(api).mockRejectedValueOnce(...)]]. وبعدين: ليه الـ QueryClient بيتعمل جوه الـ wrapper مش برّه؟`,
          flag: "script",
          deep: {
            why: R`أغلب الشاشات بتجيب بيانات، وأغلب الـ bugs في الحالات اللي مش بتشوفها وانت بتجرب: القايمة فاضية، أو السيرفر وقع، أو البيانات فيها حقل null. الاختبار ده بيخليك تجرّب كل حالة في ثانية.`,
            how: R`[[jest.mock('@/lib/api', factory)]] بيبدّل الـ module كله في الملف ده (jest بيرفعه لأول الملف تلقائيًا، hoisting)، فالشاشة لما تعمل [[import { api }]] تاخد الـ mock. و [[jest.fn(async () => ...)]] بترجع promise زي الحقيقية.

client جديد لكل اختبار: الـ cache بتاع TanStack Query لو مشترك، الاختبار التاني هياخد بيانات الأول من الـ cache ومش هينادي الـ mock خالص. و [[retry: false]] عشان اختبار الـ error ميستناش ٣ محاولات بـ backoff (كان هياخد ثواني ويعدّي الـ timeout).

[[findByText]] = [[waitFor]] + [[getByText]]: بيعيد المحاولة لحد ما العنصر يظهر أو الوقت يخلص. البيانات بتيجي async فـ [[getByText]] كان هيفشل.

في الـ lab الشاشة بتستخدم FlashList، والاختبار عدّى بس طلّع تحذيرات «not wrapped in act» من داخل FlashList (الـ recycler بيعمل setState في layout effect). مش بتفشّل الاختبار، بس لو مضايقاك ممكن تعمل mock لـ FlashList بـ FlatList في الـ setup.

والـ alias [[@/]] شغال في Jest لأن jest-expo و babel-preset-expo بيقروا [[paths]] من tsconfig.`,
            when: R`كل شاشة فيها بيانات: اختبر success و empty و error على الأقل. والمنطق اللي في الـ hooks ممكن تختبره لوحده بـ [[renderHook]].`,
            mistakes: R`QueryClient واحد لكل الاختبارات فالنتايج تعتمد على الترتيب. ونسيان [[retry: false]] فاختبار الـ error ياخد وقت أو يفشل بـ timeout. و [[getByText]] بدل [[findByText]] للبيانات. و mock لـ [[fetch]] العالمي في كل اختبار بدل mock للـ api module: أعقد وبيربط الاختبار بتفاصيل الشبكة.`
          },
          lines: [
            "TanStack Query.",
            "RNTL.",
            "نوع children.",
            "الشاشة الحقيقية (ملف الـ route نفسه).",
            "بدّل module الـ API كله:",
            "دالة وهمية بترجّع مهمة واحدة.",
            "قفلة.",
            "wrapper بيلف الشاشة في الـ providers.",
            "client جديد لكل render، ومن غير retry.",
            "الـ provider.",
            "قفلة.",
            "الاختبار.",
            "ارسم بالـ wrapper.",
            R`استنى المهمة تظهر ([[findBy]] بيستنى).`,
            "قفلة."
          ],
          sol: R`الاختبار التاني بيعدّي: [[jest.mocked(api).mockRejectedValueOnce(new Error('Network'))]] وبعدين [[await screen.findByText('حصلت مشكلة: Network')]]. لو استنى أكتر من ثانية وفشل: غالبًا [[retry]] مش false، فـ TanStack بيعيد المحاولة بتأخير قبل ما يوصل للـ error.

والـ client جوه الـ wrapper عشان كل [[render]] ياخد cache فاضي. لو برّه، الاختبار التاني ممكن يلاقي البيانات في الـ cache من الأول ومينادي الـ mock خالص، فالـ error مش هيظهر.

ملحوظة: الشاشة في الـ lab بتعرض النص كده: [[<Text>حصلت مشكلة: {error.message}</Text>]]، فالنص الكامل في Text واحد و [[findByText]] بيلاقيه.`,
          solCode: R`import { api } from '@/lib/api';

test('shows the error message', async () => {
  jest.mocked(api).mockRejectedValueOnce(new Error('Network'));
  await render(<TasksScreen />, { wrapper });
  expect(await screen.findByText('حصلت مشكلة: Network')).toBeOnTheScreen();
});`
        },
        {
          cmd: "mocks للـ native modules",
          title: "SecureStore و AsyncStorage و Reanimated مش موجودين في Jest: تعمل mock إزاي",
          desc: R`Jest بيشتغل في Node، مفيش Keychain ولا SQLite ولا UI thread. [[jest-expo]] بيعمل mocks لأغلب مكتبات Expo، بس الـ mocks دي غالبًا بترجع undefined، فلو الكود بتاعك بيعتمد على إن القيمة اتخزنت (زي الـ session أو الـ refresh token)، محتاج mock بيحفظ فعلًا.

الحل: [[jest.setup.ts]] (في [[setupFiles]]) فيه [[jest.mock]] لكل module native: SecureStore بـ Map في الذاكرة، و AsyncStorage بالـ mock الرسمي بتاعها، و Reanimated بـ [[setUpTests()]]. والمكتبات اللي عندها mock رسمي استخدمه بدل ما تكتب واحد.`,
          example: R`// jest.setup.ts
jest.mock('expo-secure-store', () => {
  const store = new Map<string, string>();
  return {
    getItemAsync: jest.fn(async (k: string) => store.get(k) ?? null),
    setItemAsync: jest.fn(async (k: string, v: string) => { store.set(k, v); }),
    deleteItemAsync: jest.fn(async (k: string) => { store.delete(k); }),
  };
});
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'));
jest.mock('react-native-worklets', () => require('react-native-worklets/src/mock'));
require('react-native-reanimated').setUpTests();`,
          try: R`شيل سطر mock الـ worklets وشغّل اختبار [[LikeButton]]: إيه الخطأ؟ وبعدين: الـ Map في mock الـ SecureStore مشتركة بين كل الاختبارات في نفس الملف، إزاي تفضّيها قبل كل اختبار؟`,
          flag: "script",
          deep: {
            why: R`أول ما تكتب اختبار لحاجة بتلمس الجهاز، هتلاقي «Cannot find native module 'ExpoSecureStore'» أو اختبار بيعدّي بس مش بيختبر حاجة لأن الـ mock بيرجّع undefined. لازم تعرف تعمل mock بسلوك حقيقي بسيط.`,
            how: R`[[setupFiles]] بيتنفذ قبل كل ملف اختبار، و [[jest.mock(name, factory)]] بيسجل البديل لأي [[import]] بعد كده. الـ factory بتتنفذ مرة لكل ملف اختبار (كل ملف ليه module registry منفصل)، فالـ Map جديدة لكل ملف ومشتركة بين الاختبارات جوه نفس الملف. عشان تفضّيها: رجّع الـ Map من الـ mock (مثلًا [[__store]]) وفي [[beforeEach]] اعمل [[clear()]]، أو اكتب القيم المطلوبة في [[beforeEach]] زي اختبار الـ refresh token في الـ lab.

المتغيرات جوه الـ factory لازم تتعرّف جواها (أو يبدأ اسمها بـ [[mock]])، لأن jest بيرفع [[jest.mock]] لأول الملف قبل أي كود.

Reanimated 4: بيعتمد على [[react-native-worklets]] (native). mock الـ worklets + [[setUpTests()]] بيخلوا [[useSharedValue]] و [[useAnimatedStyle]] يشتغلوا sync في الاختبار. وفيه [[withReanimatedTimer]] و [[advanceAnimationByTime]] لو عايز تختبر قيم وسط الـ animation.

Expo Router: [[expo-router/testing-library]] فيه [[renderRouter]] بيعمل mock لنظام الملفات (درس [[Stack.Protected]]).

كل الـ setup ده هو اللي في الـ lab، و ١٢ اختبار في ٩ ملفات عدّوا عليه (Counter، والفورم، والـ refresh، والـ session، والـ prefs، وشاشة المهام بحالتين، والـ feed، والـ router، والـ like).`,
            when: R`mock للـ native modules في الـ setup مرة واحدة. mock لموديولاتك انت ([[@/lib/api]]) في ملف الاختبار نفسه، لأن كل اختبار محتاج سلوك مختلف.`,
            mistakes: R`mock بيرجّع undefined لكل حاجة فالاختبار بيعدّي من غير ما يختبر. و Map مشتركة بين الاختبارات فالنتيجة تعتمد على الترتيب. ومتغير من برّه الـ factory: «The module factory of jest.mock() is not allowed to reference any out-of-scope variables». و mock لـ [[react-native]] كله: بيكسر RNTL.`
          },
          lines: [
            "mock للتخزين المشفّر:",
            "Map في الذاكرة بدل الـ Keychain.",
            "رجّع الدوال بنفس الأسماء:",
            "القراية من الـ Map، و null لو مش موجود زي الحقيقية.",
            "الكتابة.",
            "المسح.",
            "قفلة.",
            "قفلة.",
            "AsyncStorage عندها mock رسمي:",
            "بنستخدمه زي ما هو.",
            "Reanimated 4 محتاج mock للـ worklets.",
            "وتجهيز الاختبارات بتاعته."
          ],
          sol: R`من غير mock الـ worklets، ملف اختبار [[LikeButton]] بيقع قبل ما يبدأ: «TypeError: Cannot read properties of undefined (reading 'loadUnpackers')» (ده اللي طلعلي في الـ lab على Reanimated 4.5 و worklets 0.10).

والتفضية: رجّع الـ store من الـ mock واعمله [[clear]] قبل كل اختبار.`,
          solCode: R`// jest.setup.ts: رجّع الـ Map
jest.mock('expo-secure-store', () => {
  const store = new Map<string, string>();
  return {
    __store: store,
    getItemAsync: jest.fn(async (k: string) => store.get(k) ?? null),
    setItemAsync: jest.fn(async (k: string, v: string) => { store.set(k, v); }),
    deleteItemAsync: jest.fn(async (k: string) => { store.delete(k); }),
  };
});

// في ملف الاختبار
beforeEach(() => {
  (jest.requireMock('expo-secure-store') as { __store: Map<string, string> }).__store.clear();
});`
        }
      ]
    },
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
          sol: R`تغيير لون زرار: OTA. إضافة [[expo-camera]]: build (مكتبة native وصلاحية جديدة). تصليح حساب الخصم: OTA. ترقية FlashList من 2.0 لـ 2.3: build (فيها native code، والـ fingerprint هيتغير). تغيير اسم التطبيق: build (الاسم native في Info.plist و strings.xml). ترجمة جديدة في JSON جوه المشروع: OTA (asset/JS).`
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
  ]
});
