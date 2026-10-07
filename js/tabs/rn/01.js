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
          teach: R`## الفكرة: نفس React، بس «الطوب» مختلف

الكومبوننت في المثال React عادي جدًا: دالة بترجّع JSX. الفرق الوحيد في الحاجات اللي بتبني بيها: بدل [[div]] و [[p]] بتستخدم [[View]] و [[Text]] من مكتبة [[react-native]]. هنفك المثال سطر سطر، وبعدين نشوفه وهو بيترسم.

> فين اتجرّب؟ عملت مشروع Expo حقيقي (SDK 57، و React Native 0.86.3، و React 19.2.3) على ويندوز بـ Node 24، وشغّلته على الويب بـ [[npx expo start --web]] وقست الشكل في Chrome. مفيش موبايل ولا emulator هنا، فأي كلام عن شكله على Android و iOS من الـ docs.

---

## ١. [[import { Text, View } from 'react-native';]]

- [[import { ... } from '...']]: هات حاجات معينة من مكتبة. الأقواس [[{ }]] معناها «هات الحاجات اللي بالأسامي دي بالظبط» (named imports).
- [[react-native]]: المكتبة نفسها. فيها كل الـ core components: [[View]] و [[Text]] و [[Image]] و [[Pressable]] و [[TextInput]] وغيرهم.

مفيش [[import React]] في الأول، لأن JSX من React 17 مش محتاجه.

---

## ٢. [[export default function Hello()]]

- [[function Hello()]]: component اسمه Hello. أول حرف capital زي أي component في React.
- [[export default]]: ده الحاجة الأساسية اللي الملف بيصدّرها، فاللي يستورده يكتب [[import Hello from './Hello']] من غير أقواس.

---

## ٣. [[<View style={{ padding: 16, backgroundColor: '#eef2ff' }}>]]

### [[View]]

صندوق. على Android بيتحوّل لـ [[android.view.View]]، وعلى iOS لـ [[UIView]]، وعلى الويب (اللي جربنا عليه) لـ [[div]].

### [[style={{ ... }}]]

القوسين المزدوجين مش رمز جديد: القوس الخارجي معناه «هنا JavaScript جوه JSX»، والداخلي object عادي. يعني الستايل object، مش string ومش class.

| الخاصية | معناها |
|---|---|
| [[padding: 16]] | مسافة جوه الصندوق من كل ناحية. **رقم من غير px**: الوحدة اسمها dp (density-independent pixel)، يعني نفس الحجم تقريبًا على أي شاشة |
| [[backgroundColor]] | لون الخلفية. الاسم camelCase (حرف capital في نص الكلمة) بدل [[background-color]] بتاع CSS |
| [['#eef2ff']] | لون بالـ hex زي CSS: أزرق فاتح جدًا |

---

## ٤. [[<Text style={{ fontSize: 20 }}>أهلا من React Native</Text>]]

[[Text]] الـ component الوحيد اللي يقدر يعرض نص. على Android بيبقى TextView، وعلى iOS بيبقى UILabel. و [[fontSize: 20]] حجم الخط برضه رقم من غير وحدة.

---

## ٥. باقي السطور

[[</View>]] بتقفل الصندوق، و [[);]] بتقفل الـ [[return (]]، و [[}]] بتقفل الدالة. الأقواس [[( )]] حوالين الـ JSX عشان نقدر نكتبه على كذا سطر.

---

## ٦. شكله وهو بيترسم

قست العناصر في Chrome على شاشة عرضها 390 (مقاس موبايل):

~~~text الناتج (Expo web، Chrome)
View:  div   width=390  height=59  padding=16px  display=flex  flex-direction=column
Text:  div   x=16  y=16  height=27  font-size=20px
~~~

- الـ View أخد العرض كله (390)، والنص بدأ عند 16 من الشمال ومن فوق: ده الـ padding.
- الارتفاع 59 = 16 فوق + 27 النص + 16 تحت.
- [[display=flex]] و [[column]]: كل View في RN صندوق flexbox اتجاهه عمودي من غير ما تكتب حاجة (درس «flexbox في RN»).

---

## ٧. نسخة الويب (حل التجربة)

نفس الكومبوننت بـ [[div]] و [[p]]، اتجرّب في نفس المشروع على الويب:

~~~text الناتج (Chrome)
<p style="font-size: 20px;">أهلا من React</p>
div:  display=block   height=95
p:    margin=20px 0px
~~~

الارتفاع هنا 95 مش 59، ليه؟ لأن المتصفح بيدّي [[p]] margin افتراضي (20 فوق و 20 تحت = حجم الخط). في RN مفيش أي ستايل افتراضي مستخبي: اللي تكتبه هو اللي بيتطبق. والـ [[div]] [[display: block]]، والـ View [[flex]] دايمًا.

---

## ٨. نص برّه [[Text]]

جربت [[<View>أهلا</View>]] على الويب:

~~~text الـ Console
error: Unexpected text node: أهلا. A text node cannot be a child of a <View>.
~~~

على الويب ده error في الـ console والنص بيظهر برضه، لأن تحت الـ View فيه [[div]] يقدر يعرض نص. على Android و iOS (من الـ docs) التطبيق بيقع بـ «Text strings must be rendered within a <Text> component»، لأن الـ native view العادي معندوش طريقة يرسم بيها نص. فمتعتمدش على إن الويب «عدّاها».

---

## الخلاصة

| في الويب | في React Native |
|---|---|
| [[div]] | [[View]] (صندوق، flex عمودي افتراضيًا) |
| [[p]] و [[span]] | [[Text]] (والنص لازم يبقى جواه) |
| [[className]] و CSS | [[style]] = object، أسماء camelCase، أرقام من غير px |
| ستايل افتراضي من المتصفح | مفيش، اللي تكتبه بس |
| [[onClick]] | [[onPress]] |

كودك بيفضل JavaScript شغال على Hermes، واللي بيتغير هو اللي بيترسم: views حقيقية بتاعة النظام بدل DOM.`,
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
          teach: R`## الفكرة: ٣ طرق لنفس الشاشة

المثال فيه حاجتين: ٣ سطور تعليقات بتورّيك «نفس الشاشة» مكتوبة بالتلاتة، و ٣ أوامر كل واحد بيبدأ مشروع بطريقة منهم. هنفك الاتنين، وبعدين جدول القرار.

---

## ١. سطور التعليقات: مين بيرسم؟

~~~text المثال
React Native:  <View><Text>Hello</Text></View>       -> UIView / android.view.View حقيقيين
Flutter:       Column(children: [Text('Hello')])      -> Flutter بيرسمها بنفسه على canvas
Capacitor:     <div><p>Hello</p></div>                -> HTML جوه WebView
~~~

### React Native

[[<View><Text>Hello</Text></View>]]: JSX، وكل component بيتحول لـ view بتاع النظام نفسه. يعني الزرار والـ scroll والنص هما بتوع Android أو iOS الحقيقيين.

### Flutter

[[Column(children: [Text('Hello')])]]: ده Dart مش JSX. [[Column]] widget بيرص أولاده تحت بعض، و [[children]] قايمة الأولاد. Flutter مش بيطلب من النظام يرسم زرار: هو بيرسم كل بكسل بنفسه على مساحة رسم (canvas) بمحرك اسمه Impeller. فالشكل واحد بالظبط على كل الأجهزة.

### Capacitor

[[<div><p>Hello</p></div>]]: HTML عادي. التطبيق كله صفحة ويب جوه WebView، يعني متصفح صغير من غير شريط عنوان.

والسهم [[->]] في التعليقات مش كود، ده بس «بيتحوّل لـ».

---

## ٢. [[npx create-expo-app@latest my-app]]

| الحتة | معناها |
|---|---|
| [[npx]] | شغّل باكدج من npm من غير ما تركّبها globally |
| [[create-expo-app]] | أداة Expo اللي بتعمل مشروع React Native جديد |
| [[@latest]] | آخر نسخة من الأداة |
| [[my-app]] | اسم الفولدر |

شغّلته على ويندوز بـ Node 24 (أول سطور الناتج وآخرها):

~~~text الناتج
Creating rn-lab using the expo-template-default@sdk-57 template.
✔ Downloaded and extracted project files.
> npm install
added 607 packages, and audited 608 packages in 1m
✅ Your project is ready!
~~~

٦٠٧ باكدج ودقيقة ونص تقريبًا، لأن فيه React Native و Expo و Expo Router وأدوات الويب كمان. تفاصيل الملفات في درس «create-expo-app».

---

## ٣. [[flutter create my_app]]

[[flutter]] ده الـ CLI بتاع Flutter، ولازم يتسطب الأول (Flutter SDK). [[create]] بيعمل مشروع، و [[my_app]] بـ underscore مش شرطة، لأن اسم مشروع Dart لازم يكون حروف صغيرة و underscore بس.

> Flutter مش متسطب على الجهاز اللي اتكتب عليه الدرس، فالأمر ده من الـ docs. تجربته الكاملة في «تاب Flutter و Dart».

---

## ٤. [[npm create vite@latest my-pwa -- --template react-ts]]

| الحتة | معناها |
|---|---|
| [[npm create vite]] | بيشغّل [[create-vite]] |
| [[my-pwa]] | اسم الفولدر |
| [[--]] | اللي بعدي يروح لـ create-vite مش لـ npm |
| [[--template react-ts]] | React + TypeScript |

شغّلته (ضفت [[--no-interactive]] عشان ميسألش):

~~~text الناتج
◇  Scaffolding project in C:\Users\ali\...\my-pwa...
└  Done. Now run:

  cd my-pwa
  npm install
  npm run dev
~~~

ده موقع React عادي (تفاصيله في «تاب React»). عشان يبقى PWA بتضيف manifest و service worker، وعشان يبقى تطبيق في المتجر بتلفه بـ Capacitor.

---

## ٥. الجدول اللي التجربة بتطلبه

| | React Native | Flutter | PWA / Capacitor |
|---|---|---|---|
| اللغة | TypeScript / JavaScript | Dart | HTML و CSS و JS |
| مين بيرسم | النظام (native views) | محرك Flutter نفسه | WebView |
| مشاركة كود مع موقع React | عالية (types و Zod و API client) | تقريبًا صفر | كاملة |
| الشكل على iOS | شكل iOS الأصلي تلقائيًا | متطابق مع Android، إلا لو استخدمت Cupertino widgets | شكل موقع |
| أداء الـ lists والـ gestures | قريب من native | ممتاز | أضعف |

---

## الخلاصة

- **RN**: views حقيقية + TypeScript + مشاركة كود مع الويب.
- **Flutter**: محرك رسم خاص + Dart + شكل متطابق.
- **PWA/Capacitor**: موقعك نفسه جوه WebView، أرخص وأضعف.

السؤال الصح مش «مين أسرع»، السؤال «الفريق بيعرف إيه، وعندي كود إيه أشاركه».`,
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
          teach: R`## الفكرة: ٣ أوامر بتقولك «مشروعك على أنهي نسخة؟»

الـ New Architecture نفسها مش حاجة بتكتبها، دي طريقة RN من جوه. اللي في إيدك: تعرف مشروعك على أنهي نسخة من Expo و RN (عشان تعرف إنك عليها)، وتفحص المشروع. كله اتشغّل على مشروع Expo جديد على ويندوز بـ Node 24.

---

## ١. [[npx expo --version]]

[[npx expo]] بيشغّل Expo CLI اللي جوه المشروع نفسه (مش نسخة global)، و [[--version]] بيطبع نسختها:

~~~text الناتج
57.0.28
~~~

ده رقم الـ CLI ([[@expo/cli]])، والـ 57 في أوله هو رقم الـ SDK. كل SDK بييجي معاه CLI بنفس الرقم الكبير.

---

## ٢. [[npm ls react-native expo react]]

[[npm ls]] (ls = list) بيعرض الباكدجات المتركبة فعلًا في [[node_modules]]، ولو كتبت أسامي بيعرضها هي بس والطريق اللي جابها:

~~~text الناتج (أول سطور ومن آخره)
rn-lab@1.0.0 C:\Users\ali\rn-lab
+-- @expo/ui@57.0.22
| +-- expo@57.0.27 deduped
| +-- react-native@0.86.3 deduped
| +-- react@19.2.3 deduped
...
+-- expo@57.0.27
+-- react-native@0.86.3
$__bt-- react@19.2.3
~~~

- السطر الأول: مشروعك ومكانه.
- [[+--]] و [[$__bt--]]: فروع الشجرة. [[$__bt--]] آخر فرع.
- [[deduped]]: «نفس النسخة اللي فوق، مش متركبة مرتين». مكتبة زي [[@expo/ui]] محتاجة react-native، و npm بيقولك إنها بتستخدم نفس النسخة الأساسية. لو شفت نسختين مختلفتين من [[react-native]] في الشجرة، دي مشكلة.
- الناتج طويل (كل مكتبة بتعتمد على react بتظهر). لو عايز السطور الأساسية بس: [[npm ls react-native expo react --depth=0]].

النسخ اللي طلعت: Expo SDK 57، و React Native 0.86.3، و React 19.2.3. يعني الـ New Architecture شغالة غصب عنك، ومفيش أي إعداد بيقفلها.

---

## ٣. [[npx expo-doctor]]

أداة منفصلة (أول مرة npx بينزّلها) بتعمل فحوصات على المشروع: نسخ المكتبات متوافقة مع الـ SDK؟ [[app.json]] مكتوب صح؟ فيه باكدج متكررة؟

~~~text الناتج (مشروع جديد)
npm warn exec The following package was not found and will be installed: expo-doctor@1.20.4
Running 21 checks on your project...
21/21 checks passed. No issues detected!
~~~

- السطر الأول: npx مش لاقيها متسطبة فبينزّلها مؤقتًا.
- [[21 checks]]: ٢١ فحص، وكلهم عدّوا.

بيحتاج نت عشان يجيب جدول التوافق بتاع الـ SDK من Expo.

---

## ٤. التجربة: [[newArchEnabled: false]]

دوّرت في [[app.json]] بتاع المشروع الجديد: الكلمة مش موجودة. ضفتها بإيدي [[false]] وشغّلت الأداتين:

~~~text npx expo-doctor
20/21 checks passed. 1 checks failed. Possible issues detected:

✖ Check Expo config (app.json/ app.config.js) schema
Error validating fields in C:\Users\ali\rn-lab\app.json:
 should NOT have additional property 'newArchEnabled'.
~~~

يعني الـ schema بتاع SDK 57 مبقاش فيه الخاصية دي أصلًا، فـ expo-doctor بيعتبرها غلط ([[additional property]] = خاصية زيادة مش معروفة). و [[npx expo config]] بيعرضها في الإعدادات زي ما هي، بس مفيش حاجة في الـ build بتقراها. شيلها.

---

## ٥. الكلام اللي ورا الأرقام: إيه اللي اتغير؟

| زمان (الـ bridge) | دلوقتي (New Architecture) |
|---|---|
| كل رسالة بين JS و native بتتحول JSON | JSI: JS بينادي دوال C++ مباشرة |
| async دايمًا، في طابور | sync أو async حسب الحاجة |
| الـ renderer القديم | Fabric: بيدعم concurrent rendering و Suspense و [[startTransition]] |
| كل الـ native modules بتتحمّل مع فتح التطبيق | TurboModules: بتتحمّل أول ما تحتاجها |
| أنواع بين JS و native متكتبة بإيدك | Codegen بيولّدها من spec بـ TypeScript |

---

## الخلاصة

- [[npx expo --version]] و [[npm ls ...]]: تعرف انت فين. SDK 55 أو أحدث = New Architecture إجباري.
- [[npx expo-doctor]]: أول حاجة تشغّلها لما حاجة غريبة تحصل.
- [[newArchEnabled]] مبقاش إعداد في SDK 57: لو كتبته expo-doctor بيرفضه.
- قبل أي مكتبة native: اتأكد إنها بتدعم الـ New Architecture.`,
          lines: [
            "نسخة Expo CLI.",
            "النسخ المتركبة فعلًا من الحاجات التلاتة.",
            R`بيفحص المشروع: نسخ مش متوافقة مع الـ SDK، وإعدادات غلط في app.json. (بيحتاج نت عشان يجيب بيانات التوافق.)`
          ],
          sol: R`في SDK 57 هتلاقي [[expo@57.x]] و [[react-native@0.86.x]] و [[react@19.2.x]]. و [[newArchEnabled]] مش موجودة في [[app.json]] بتاع مشروع جديد، لأنها مبقتش إعداد أصلًا.

لو ضفت [[newArchEnabled: false]] الـ New Architecture مش هتتقفل: من SDK 55 القيمة دي بتتجاهل، وفي SDK 57 [[npx expo-doctor]] بيفشّل فحص الـ schema بـ «should NOT have additional property 'newArchEnabled'» (اتجرّب). الطريقة الوحيدة للـ legacy architecture إنك تفضل على SDK 54 أو أقدم، ودي مش فكرة كويسة في مشروع جديد.`
        }
      ]
    }
  ]
});
