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
    }
  ]
});
