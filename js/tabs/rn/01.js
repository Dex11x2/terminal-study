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
            mistakes: R`[[{count && ...}]] مع رقم ممكن يبقى 0، أو [[{str && ...}]] مع string فاضي "": كلهم بيحاولوا يرسموا نص برّه Text. استخدم [[?:]] أو [[!!count &&]] أو [[count > 0 &&]]. وتحط [[onPress]] على [[View]]: مش هيشتغل، View مبيستقبلش ضغط (استخدم Pressable). وتفتكر إن [[fontWeight]] لازم string: RN الحديث بيقبل [['600']] و [[600]] الاتنين (النوع فيه 100 لحد 900 رقم و string، و [['bold']])، اللي غلط هو [['600px']] أو [['semi-bold']] بشرطة.`
          },
          teach: R`## الفكرة: كارت سعر فيه نص جوه نص

[[PriceCard]] بيعرض عنوان منتج في سطر واحد، وتحته السعر، وجنبه السعر القديم مشطوب لو موجود. فيه ٣ أفكار مهمة: كل نص جوه [[Text]]، و [[Text]] جوه [[Text]] بيورّث الستايل، والشرط في JSX لازم يرجّع حاجة آمنة.

> اتجرّب على مشروع Expo SDK 57 على الويب ([[expo start --web]]) في Chrome، في صندوق عرضه 320، والقياسات من [[getBoundingClientRect]] و [[getComputedStyle]].

---

## ١. السطر الطويل: تعريف الـ component

~~~text PriceCard.tsx
export function PriceCard({ title, price, oldPrice }: { title: string; price: number; oldPrice?: number }) {
~~~

نفكّه من الشمال:

| الحتة | معناها |
|---|---|
| [[export function PriceCard]] | component متصدّر باسمه (named export)، فبيتستورد بـ [[import { PriceCard }]] |
| [[({ title, price, oldPrice }]] | الـ props اتفكّت لمتغيرات على طول (destructuring) |
| [[: { ... }]] | نوع الـ props في TypeScript |
| [[title: string]] | العنوان نص |
| [[price: number]] | السعر رقم |
| [[oldPrice?: number]] | علامة [[?]] معناها «اختياري»: ممكن تبعته وممكن لأ، ولو مبعتهوش قيمته [[undefined]] |

---

## ٢. [[<View style={{ padding: 12, borderRadius: 12, backgroundColor: '#fff', gap: 4 }}>]]

صندوق الكارت. [[borderRadius]] الزوايا المدورة، و [[gap: 4]] مسافة 4 بين كل ولد واللي بعده (زي [[gap]] في CSS). الأولاد تحت بعض لأن View عمودي افتراضيًا.

---

## ٣. العنوان: [[numberOfLines={1}]]

~~~text PriceCard.tsx
<Text numberOfLines={1} style={{ fontSize: 16, fontWeight: '600' }}>{title}</Text>
~~~

- [[numberOfLines={1}]]: سطر واحد بس، والزيادة تتقص و «...» في الآخر.
- [[fontWeight: '600']]: تقل الخط (semi-bold). بيتكتب string أو رقم [[600]].
- [[{title}]]: القوسين معناهم «حط قيمة المتغير هنا».

جربته بعنوان طويل («سماعة بلوتوث لاسلكية بعزل ضوضاء ممتاز وبطارية طويلة»):

~~~text الناتج (Chrome)
width=264   height=21   font-size=16px   font-weight=600
text-overflow=ellipsis   white-space=nowrap   scrollWidth=382
~~~

النص محتاج 382 بكسل، والمتاح 264، فاتقص بـ «...». على الويب RN بيعمل ده بـ [[text-overflow: ellipsis]]، وعلى الموبايل النظام نفسه بيقصه.

---

## ٤. السعر: [[Text]] جوه [[Text]]

~~~text PriceCard.tsx
<Text style={{ color: '#16a34a' }}>
  {price} جنيه{' '}
  {oldPrice ? <Text style={{ textDecorationLine: 'line-through', color: '#999' }}>{oldPrice}</Text> : null}
</Text>
~~~

### [[{price} جنيه{' '}]]

- [[{price}]] الرقم، وبعده كلمة «جنيه».
- [[{' '}]]: string فيه مسافة واحدة. ليه مكتوبة كده؟ لأن JSX بيشيل المسافات والسطر الجديد اللي في آخر السطر، فمن غيرها السعر القديم هيلزق في «جنيه».

### [[oldPrice ? ... : null]]

ده الـ ternary: [[شرط ? لو صح : لو غلط]]. لو فيه [[oldPrice]] ارسم الـ Text المشطوب، غير كده [[null]]، و React مبيرسمش حاجة لـ [[null]].

### الـ Text الداخلي

- [[textDecorationLine: 'line-through']]: خط في نص الكلام (شطب). القيم التانية: [['underline']] و [['none']].
- [[color: '#999']]: رمادي.

### الوراثة: اتقاست

~~~text الناتج (Chrome)
Text الخارجي:  div   color=rgb(22, 163, 74)   font-size=14px   النص: "450 جنيه 600"
Text الداخلي:  span  color=rgb(153, 153, 153) font-size=14px   text-decoration=line-through
~~~

- الداخلي بقى [[span]] جوه الخارجي، يعني نص واحد بألوان مختلفة (على Android ده spannable string، وعلى iOS attributed string).
- حجم الخط 14 في الاتنين: محدش كتب [[fontSize]]، فالداخلي ورث الافتراضي من الخارجي. لو كتبت [[fontSize: 18]] على الخارجي، الداخلي هياخده.
- اللون: الداخلي كتب لونه، فكسب على لون الأب.

ده المكان **الوحيد** في RN اللي فيه وراثة. [[View]] مبيورّثش حاجة لأولاده.

---

## ٥. التجربة: [[&&]] مع [[oldPrice={0}]]

غيّرت الشرط لـ [[{oldPrice && <Text ...>{oldPrice}</Text>}]] وبعت [[oldPrice={0}]]:

~~~text الناتج (Chrome)
"50 جنيه 0"     <- مفيش span، الـ 0 نص عادي أخضر
~~~

ليه؟ [[a && b]] بترجّع [[a]] لو كانت falsy (زي [[0]] و [[""]] و [[null]])، غير كده بترجّع [[b]]. فـ [[0 && ...]] = [[0]]، و React بيرسم الأرقام. هنا الـ 0 جوه [[Text]] فطلع شكل غلط بس. لو نفس السطر كان جوه [[View]] مباشرة، على الموبايل التطبيق بيقع (درس «RN مش ويب»).

### حل التجربة: [[oldPrice != null]]

~~~text الناتج (Chrome)
oldPrice={0}:          "50 جنيه 0"   والـ 0 جوه span مشطوب
من غير oldPrice:       "50 جنيه "    مفيش span
~~~

[[!= null]] (بعلامة = واحدة بعد [[!]]) صح لما القيمة مش [[null]] ومش [[undefined]]. فالـ 0 بقى سعر حقيقي بيتعرض مشطوب، ولو مفيش سعر قديم مفيش حاجة.

| الشرط | [[oldPrice=600]] | [[oldPrice=0]] | من غير oldPrice |
|---|---|---|---|
| [[oldPrice ? X : null]] | X | مفيش (0 اتعامل كأنه مش موجود) | مفيش |
| [[oldPrice && X]] | X | **«0» نص عريان** | مفيش |
| [[oldPrice != null ? X : null]] | X | X بـ 0 | مفيش |

---

## الخلاصة

- أي نص، حتى رقم أو مسافة، جوه [[Text]].
- [[Text]] جوه [[Text]] = [[span]] جوه [[p]]: بيورّث الخط واللون. View مبيورّثش.
- [[numberOfLines]] للقص، و [[{' '}]] للمسافة الصريحة.
- الشروط في JSX: [[? :]] أو boolean صريح ([[!= null]] أو [[> 0]])، مش [[&&]] مع رقم.`,
          lines: [
            "الاتنين من react-native.",
            "component بـ props مكتوب نوعها زي أي React + TS.",
            "بيرجّع JSX.",
            R`صندوق الكارت. [[gap]] مسافة بين الأولاد زي CSS.`,
            R`العنوان في سطر واحد، والزيادة بتتقص بـ «...». [[fontWeight]] بيتكتب string أو رقم.`,
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
          teach: R`## الفكرة: صورتين في صف، واحدة مقاسها ثابت وواحدة بتتمد

[[Avatar]] بيرسم صورة بروفايل دايرية (من النت لو فيه رابط، وإلا صورة محلية)، وجنبها صورة من النت بتاخد باقي العرض وارتفاعها محسوب من النسبة 16:9. الدرس كله عن حاجة واحدة: الصورة من النت لازم يبقى ليها حجم.

> اتجرّب على Expo SDK 57 (expo-image 57.0.5) على الويب في Chrome، في صندوق عرضه 360. الصورة من النت [[https://picsum.photos/800/450]] (موقع بيرجّع صورة عشوائية بالمقاس اللي تطلبه).

---

## ١. الـ imports

- [[import { Image } from 'expo-image';]]: [[Image]] من مكتبة [[expo-image]] (موجودة في القالب). نفس اسم [[Image]] بتاع react-native، بس فيها cache و placeholder و transitions.
- [[import { View } from 'react-native';]]: الصندوق.

---

## ٢. [[export function Avatar({ uri }: { uri?: string })]]

prop واحد اسمه [[uri]] (Uniform Resource Identifier، يعني عنوان الصورة)، و [[?]] بتقول إنه اختياري.

---

## ٣. [[<View style={{ flexDirection: 'row', gap: 12 }}>]]

[[flexDirection: 'row']]: الأولاد جنب بعض مش تحت بعض. و [[gap: 12]] مسافة 12 بين الصورتين.

---

## ٤. الصورة الأولى: الدايرة

### [[source={uri ? { uri } : require('@/assets/images/icon.png')}]]

من جوه لبرة:

1. [[{ uri }]]: object فيه خاصية [[uri]]. ده اختصار لـ [[{ uri: uri }]]. كده بتقول «الصورة من الرابط ده».
2. [[require('@/assets/images/icon.png')]]: صورة جوه المشروع. [[require]] هنا مش بيقرا الملف وقت التشغيل: Metro بيشوفه وقت الـ bundling ويحط الصورة مع التطبيق، ويرجّع رقم بيشاور عليها. و [[@/assets]] اختصار من [[tsconfig.json]] لفولدر [[assets]].
3. [[uri ? ... : ...]]: لو فيه رابط خده، غير كده الصورة المحلية.

### [[style={{ width: 56, height: 56, borderRadius: 28 }}]]

مقاس ثابت 56×56، و [[borderRadius]] نص العرض بيقلب المربع دايرة.

### باقي الـ props

| الـ prop | معناه |
|---|---|
| [[contentFit="cover"]] | لو نسبة الصورة غير المربع، كبّرها لحد ما تملاه واقطع الزيادة. زي [[object-fit: cover]] في CSS |
| [[transition={200}]] | الصورة تظهر بـ fade في 200 ملي ثانية لما تتحمّل |
| [[accessibilityLabel="صورة البروفايل"]] | الكلام اللي قارئ الشاشة (TalkBack و VoiceOver) بيقوله |

---

## ٥. الصورة التانية: [[style={{ flex: 1, aspectRatio: 16 / 9 }}]]

- [[source={{ uri: '...' }}]]: صورة من النت. لازم object، مش string لوحده.
- [[flex: 1]]: خد كل العرض الفاضي في الصف.
- [[aspectRatio: 16 / 9]]: العرض ÷ الارتفاع = 16 ÷ 9 (يعني 1.78). فلما العرض يتعرف، الارتفاع بيتحسب.

---

## ٦. شكله وهو بيترسم

~~~text الناتج (Chrome، الصف عرضه 360)
الصف:          360 x 164
الصورة الأولى:  56 x 56    x=0    border-radius=28px   <img alt="صورة البروفايل">  natural=1024x1024
الصورة التانية: 292 x 164.3  x=68   natural=800x450
~~~

الحسبة:

| الرقم | جه منين |
|---|---|
| 292 | 360 − 56 (الأولى) − 12 (الـ gap) |
| 164.3 | 292 × 9 ÷ 16 |
| 164 (ارتفاع الصف) | أطول ولد فيه |

و [[accessibilityLabel]] بقى [[alt]] بتاع الـ [[img]] على الويب. والصورة المحلية حجمها الحقيقي 1024×1024 بس بتتعرض 56×56.

---

## ٧. التجربة

جربت ٣ نسخ في نفس الصف:

~~~text الناتج (Chrome)
من غير style خالص:          0 x 56       <- مش ظاهرة
aspectRatio بس (من غير flex): 99.5 x 56    <- ظاهرة وصغيرة
width: 200 + aspectRatio:    200 x 112.5
~~~

### من غير [[style]]

الصورة اتحمّلت فعلًا (800×450 وصلت)، بس عرضها 0، فمش ظاهرة، ومفيش أي error. React Native مش بيستنى الصورة تيجي عشان يعرف مقاسها، بيرسم الـ layout الأول. والـ 56 ارتفاع جاي من الصف: [[alignItems]] الافتراضي [[stretch]]، فبيمدّ الأولاد لارتفاع أطول واحد.

### [[aspectRatio]] من غير [[flex: 1]]

الصف مش بيمدّ أولاده في العرض، بس بيمدّهم في الارتفاع (56). فـ [[aspectRatio]] حسب العرض من الارتفاع: 56 × 16 ÷ 9 = 99.5. ظهرت، بس مش المقاس اللي عايزه.

### [[width: 200]]

عرض معروف، فالارتفاع 200 × 9 ÷ 16 = 112.5.

---

## الخلاصة

| الصورة | لازم |
|---|---|
| من النت ([[{ uri }]]) | حجم صريح: [[width]] و [[height]]، أو بُعد واحد + [[aspectRatio]] |
| محلية ([[require]]) | بتعرف حجمها، بس عادة بتديها مقاس برضه |
| أي صورة | [[accessibilityLabel]] لو ليها معنى |

ولو صورة مش ظاهرة ومفيش error: أول سؤال «عرضها وارتفاعها كام؟».`,
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
          sol: R`من غير [[style]] الصورة التانية مش هتظهر خالص: عرضها 0 (على الويب اتقاست 0×56، الارتفاع جه من الصف اللي بيمدّ أولاده) ومفيش أي error في الـ console. ده أشهر سؤال «الصورة مش ظاهرة» في RN.

و [[aspectRatio]] من غير [[flex: 1]]: الصورة بتظهر صغيرة بحجم غريب. على الويب اتقاست 99.5×56: الصف مش بيمدّ أولاده في العرض، بس بيمدّهم في الارتفاع لحد ارتفاع الصورة الأولى (56)، فالعرض اتحسب من الارتفاع (56 × 16 ÷ 9). مع [[flex: 1]] أو [[width: 200]] الحساب بيشتغل: عرض 200 يعني ارتفاع 112.5.`
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
          teach: R`## الفكرة: زرار واحد للتطبيق كله

[[AppButton]] زرار بيتعمل مرة ويتستخدم في كل الشاشات: بيستقبل الضغط، وشكله بيتغير وانت ضاغط، وبيتقفل وهو disabled أو بيحمّل، وبيقول لقارئ الشاشة إنه زرار. هنفك الـ component، وبعدين الشاشة اللي بتجربه (الـ solCode).

> اتجرّب على Expo SDK 57 على الويب في Chrome بـ playwright: ضغطت وقست الشكل قبل وأثناء وبعد.

---

## ١. [[import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';]]

| الاسم | بيعمل إيه |
|---|---|
| [[Pressable]] | يلف أي حاجة ويخليها تستقبل لمس |
| [[ActivityIndicator]] | الدايرة اللي بتلف (spinner) |
| [[StyleSheet]] | يجمع الستايلات تحت (الدرس الجاي) |
| [[Text]] | النص |

---

## ٢. [[type Props = { title: string; onPress: () => void; loading?: boolean; disabled?: boolean };]]

[[type Props]] اسم لنوع الـ props:

- [[onPress: () => void]]: دالة مبتاخدش حاجة ([[()]]) ومبترجّعش حاجة ([[void]]).
- [[loading?]] و [[disabled?]]: اختياريين، ولو مش موجودين قيمتهم [[undefined]] (يعني falsy).

---

## ٣. الـ [[Pressable]] وخصايصه

- [[onPress={onPress}]]: لما الضغطة تكمل (صباعك نزل ورفع وهو لسه على الزرار).
- [[disabled={disabled || loading}]]: الـ [[||]] معناها «أو»، يعني مقفول لو disabled أو بيحمّل.
- [[hitSlop={8}]]: مساحة اللمس أكبر 8 من كل ناحية من غير ما الشكل يكبر.
- [[accessibilityRole="button"]]: قارئ الشاشة يقول «زرار»، والاختبارات تلاقيه بـ [[getByRole('button')]].
- [[accessibilityState={{ disabled: ..., busy: loading }}]]: يقول كمان إنه معطّل أو مشغول.

---

## ٤. [[style={({ pressed }) => [...]}]]

الستايل هنا **دالة** مش object. Pressable بيناديها كل ما حالة الضغط تتغير، ويديها [[{ pressed }]] ([[true]] وانت ضاغط).

نفك اللي جواها:

~~~text AppButton.tsx
[styles.btn, pressed && styles.pressed, (disabled || loading) && styles.disabled]
~~~

- array ستايلات، بتتدمج من الشمال لليمين، والأخير بيكسب لو فيه نفس الخاصية.
- [[pressed && styles.pressed]]: لو ضاغط النتيجة [[styles.pressed]]، غير كده [[false]]، و RN بيتجاهل [[false]] و [[null]] في الـ array.
- [[(disabled || loading) && styles.disabled]]: نفس الفكرة للون الرمادي.

---

## ٥. اللي جوه الزرار

~~~text AppButton.tsx
{loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
~~~

لو بيحمّل spinner أبيض، غير كده العنوان.

---

## ٦. [[StyleSheet.create({ ... })]]

| الاسم | الستايل |
|---|---|
| [[btn]] | خلفية زرقا، [[paddingVertical: 12]] فوق وتحت، [[paddingHorizontal: 20]] يمين وشمال، زوايا 10، و [[alignItems: 'center']] عشان النص في النص |
| [[pressed]] | [[opacity: 0.7]] شفافية وانت ضاغط |
| [[disabled]] | خلفية رمادي |
| [[text]] | أبيض، 16، و [[fontWeight: '600']] |

---

## ٧. الشاشة اللي بتجربه (الـ solCode)

- [[import { AppButton } from '@/components/AppButton';]]: الزرار في [[src/components]] مش في [[src/app]]، عشان ميبقاش route.
- [[const [loading, setLoading] = useState(false);]] و [[const [count, setCount] = useState(0);]]: حالتين، بيحمّل ولا لأ، وعدد مرات الضغط.
- [[title={$__btحفظ ($__{count})$__bt}]]: template string. الـ [[$__{count}]] جواها بيتحط مكانه الرقم، فالعنوان «حفظ (0)».
- [[onPress={() => { ... }}]]: لما يتضغط:
  - [[setCount((c) => c + 1)]]: زوّد العداد. الشكل ده (دالة بتاخد القيمة القديمة) آمن حتى لو اتنادى كذا مرة ورا بعض.
  - [[setLoading(true)]]: ابدأ التحميل.
  - [[setTimeout(() => setLoading(false), 2000)]]: بعد 2000 ملي ثانية (ثانيتين) وقّف التحميل. ده بيمثّل طلب API.

---

## ٨. التجربة: ضغطت ٥ مرات ورا بعض

~~~text الناتج (Chrome)
قبل:         النص "حفظ (0)"   الخلفية rgb(37, 99, 235)   عرض 342   ارتفاع 45
وانا ضاغط:   opacity=0.7
أثناء التحميل (بعد ٤ ضغطات كمان): spinner ظاهر   aria-disabled="true"   الخلفية rgb(148, 163, 184)
بعد ثانيتين: النص "حفظ (1)"
~~~

- أول ضغطة عدّت، وحوّلت الزرار لـ loading، فالـ ٤ اللي بعدها اتجاهلوا: العداد 1 مش 5.
- [[opacity=0.7]]: ستايل [[pressed]] اشتغل وقت الضغط بس.
- [[aria-disabled]]: على الويب [[disabled]] بيتحول لخاصية accessibility بتاعة HTML.
- العرض 342 = 390 (الشاشة) − 24 − 24 (الـ padding بتاع الـ View). والارتفاع 45 = 12 + 21 (سطر النص) + 12.

لو شلت [[loading]] من [[disabled]]، كل ضغطة هتنادي [[onPress]]: ٥ ضغطات = ٥ طلبات. ده بالظبط اللي بيعمل «اتخصم مني مرتين» في الدفع.

### [[android_ripple]]

[[android_ripple={{ color: '#ffffff55' }}]] بيعمل التموّج بتاع Material لما تلمس. على Android بس (iOS والويب بيتجاهلوه)، فمقدرتش أشوفه هنا: الكلام عنه من الـ docs. و [[#ffffff55]] أبيض، والـ [[55]] في الآخر شفافية (hex: 55 = 85 من 255، يعني حوالي 33٪).

---

## الخلاصة

| الحاجة | بتعملها بـ |
|---|---|
| الضغط | [[onPress]] (و [[onLongPress]] بعد حوالي نص ثانية) |
| شكل وقت الضغط | [[style]] دالة بتاخد [[{ pressed }]] |
| منع الضغط المكرر | [[disabled]] وقت الـ loading |
| مساحة لمس أكبر | [[hitSlop]] |
| قارئ الشاشة والاختبارات | [[accessibilityRole="button"]] |`,
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
          teach: R`## الفكرة: خانة رقم موبايل بتنضّف نفسها وبتقولك لو غلط

[[PhoneField]] خانة controlled: الـ state هو اللي بيقرر الخانة فيها إيه. أي حرف بتكتبه بيعدّي على دالة بتشيل أي حاجة مش رقم، والإطار بيحمر لو الرقم مش رقم موبايل مصري صح. وبعدها الـ solCode بيورّيك إزاي «التالي» في الكيبورد ينقلك للخانة اللي بعدها.

> اتجرّب على Expo SDK 57 على الويب في Chrome: كتبت في الخانات بالكيبورد (playwright) وقريت القيم والألوان. الكيبورد بتاع الموبايل نفسه من الـ docs.

---

## ١. الـ imports والـ state

- [[import { useState } from 'react';]]: hook الـ state من React نفسها.
- [[import { Text, TextInput, View } from 'react-native';]]: [[TextInput]] هو [[input]].
- [[const [phone, setPhone] = useState('');]]: النص، وبيبدأ فاضي.

---

## ٢. [[const valid = /^01[0125]\d{8}$/.test(phone);]]

[[/.../]] ده regex (نمط بندوّر بيه في النص)، و [[.test(phone)]] بترجّع [[true]] لو النص ماشي على النمط. نفك النمط حتة حتة:

| الحتة | معناها |
|---|---|
| [[^]] | من أول النص |
| [[01]] | لازم يبدأ بـ 01 |
| [[ [0125] ]] | حرف واحد من دول: 0 أو 1 أو 2 أو 5 (فودافون، اتصالات، أورنج، وي) |
| [[\d{8}]] | [[\d]] = رقم، و [[{8}]] = ٨ مرات |
| [[$]] | لحد آخر النص، مفيش حاجة بعده |

يعني ١١ رقم بالظبط. و [[valid]] بيتحسب من جديد مع كل render، مش محتاج state لوحده.

---

## ٣. الـ label

[[<Text>رقم الموبايل</Text>]] نص عادي فوق الخانة. مفيش [[label]] بيتربط بالخانة تلقائيًا زي HTML، فبنحط [[accessibilityLabel]] على الخانة نفسها (تحت).

---

## ٤. الـ [[TextInput]] سطر سطر

### [[value={phone}]]

الخانة بتعرض اللي في الـ state. ده اللي بيخليها controlled.

### [[onChangeText={(t) => setPhone(t.replace(/\D/g, ''))}]]

من جوه لبرة:

1. [[t]]: النص الجديد كله. [[onChangeText]] بيديك النص على طول، مش event زي [[onChange]] في الويب (مفيش [[e.target.value]]).
2. [[/\D/g]]: [[\D]] (D كبيرة) = أي حاجة **مش** رقم، و [[g]] (global) = كل المرات مش أول واحدة بس.
3. [[.replace(..., '')]]: بدّل كل دول بلا شيء، يعني امسحهم.
4. [[setPhone(...)]]: احفظ النتيجة.

### خصايص الكيبورد

| الـ prop | معناه | على الويب اتحوّل لـ |
|---|---|---|
| [[keyboardType="phone-pad"]] | كيبورد أرقام التليفون | [[type="tel"]] |
| [[autoComplete="tel"]] | النظام يقترح رقمك (autofill) | [[autocomplete="tel"]] |
| [[maxLength={11}]] | أقصى ١١ حرف | [[maxlength=11]] |
| [[placeholder="01xxxxxxxxx"]] | نص باهت لما الخانة فاضية | [[placeholder]] |
| [[accessibilityLabel="رقم الموبايل"]] | اسم الخانة لقارئ الشاشة وللاختبارات | [[aria-label]] |

### الستايل

~~~text PhoneField.tsx
style={{ borderWidth: 1, borderColor: valid || !phone ? '#ccc' : '#dc2626', borderRadius: 8, padding: 10 }}
~~~

[[valid || !phone ? '#ccc' : '#dc2626']]: لو الرقم صح **أو** الخانة فاضية ([[!phone]] = مفيش نص) رمادي، غير كده أحمر. يعني مبنحمّرش الخانة قبل ما المستخدم يكتب.

---

## ٥. رسالة الخطأ

~~~text PhoneField.tsx
{!valid && phone.length === 11 ? <Text style={{ color: '#dc2626' }}>الرقم مش صحيح</Text> : null}
~~~

الرسالة تظهر بس لما يكمّل ١١ رقم والرقم غلط. وهنا [[!valid && phone.length === 11]] boolean صريح، فمفيش خطر «0 برّه Text» (درس View و Text).

---

## ٦. اللي حصل لما كتبت

~~~text الناتج (Chrome)
كتبت "01a2-3 456"       -> القيمة "0123456"       الإطار أحمر rgb(220, 38, 38)، من غير رسالة
كتبت "01312345678"      -> القيمة "01312345678"   الإطار أحمر + "الرقم مش صحيح"
كتبت "0101234567899"    -> القيمة "01012345678"   الإطار رمادي rgb(204, 204, 204)، من غير رسالة
~~~

- الحروف والشرطة والمسافة اتشالوا وانا بكتب.
- [[013...]] ١١ رقم بس التالت 3 مش في [[ [0125] ]]، فالرسالة ظهرت.
- ١٣ رقم اتقصوا ١١ بسبب [[maxLength]]، والناتج رقم صح.

> على الموبايل [[keyboardType]] بيغيّر شكل الكيبورد بس. اللصق ممكن يدخّل أي حاجة، عشان كده الـ [[replace]] والـ regex لازم يفضلوا.

---

## ٧. الـ solCode: «التالي» ينقلك للباسورد

### [[const passwordRef = useRef<TextInput>(null);]]

[[useRef]] بيعمل «علبة» ثابتة بين الـ renders، و [[<TextInput>]] نوع اللي جواها، وبتبدأ [[null]]. ولما تحط [[ref={passwordRef}]] على الخانة التانية، React بيحط الخانة نفسها في [[passwordRef.current]].

### الخانة الأولى

| الـ prop | معناه |
|---|---|
| [[onChangeText={setPhone}]] | تبعت الدالة نفسها، لأن [[setPhone]] بتاخد النص زي ما هو |
| [[returnKeyType="next"]] | زرار Enter في الكيبورد مكتوب عليه «التالي» |
| [[submitBehavior="submit"]] | لما تدوسه: ابعت submit، والكيبورد يفضل مفتوح |
| [[onSubmitEditing={() => passwordRef.current?.focus()}]] | لما تدوسه، ركّز على الخانة التانية |

[[?.]] (optional chaining): لو [[current]] لسه [[null]] متعملش حاجة بدل ما تقع.

### الخانة التانية والزرار

- [[secureTextEntry={!show}]]: النص مخفي (نقط) طول ما [[show]] بـ false.
- [[returnKeyType="done"]]: زرار «تم».
- [[onPress={() => setShow((s) => !s)}]]: اقلب [[show]].

~~~text الناتج (Chrome)
الخانتين:            type=tel enterkeyhint=next     |   type=password enterkeyhint=done
كتبت 0100 ودوست Enter -> الـ focus راح على "الباسورد"
كتبت secret ودوست "إظهار" -> الخانة بقت type=text وقيمتها "secret"، والزرار بقى "إخفاء"
~~~

[[returnKeyType]] على الويب بقى [[enterkeyhint]]، و [[secureTextEntry]] بقى [[type=password]].

---

## الخلاصة

| في الويب | في RN |
|---|---|
| [[<input type="tel">]] | [[keyboardType="phone-pad"]] |
| [[<input type="password">]] | [[secureTextEntry]] |
| [[onChange={(e) => e.target.value}]] | [[onChangeText={(t) => ...}]] |
| [[<label for>]] | [[Text]] فوق + [[accessibilityLabel]] |
| Tab للخانة الجاية | [[returnKeyType="next"]] + [[onSubmitEditing]] + [[ref]] |`,
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
          teach: R`## الفكرة: ٣ طبقات، كل واحدة ليها شغلانة

الشاشة في المثال ٣ صناديق جوه بعض: [[SafeAreaView]] بيبعد المحتوى عن الـ notch وشريط الـ gestures، وجواه [[ScrollView]] بيعمل scroll، وجواه ٣٠ فقرة. هنفك كل طبقة، وبعدين نقيس.

> اتجرّب على Expo SDK 57 (react-native-safe-area-context 5.7) على الويب في Chrome بشاشة 390×844. على الويب مفيش notch، فالـ safe area بـ 0، وشكلها على الموبايل من الـ docs.

---

## ١. الـ imports

- [[import { ScrollView, Text } from 'react-native';]]
- [[import { SafeAreaView } from 'react-native-safe-area-context';]]: من مكتبة منفصلة (موجودة في القالب)، **مش** من [[react-native]]. اللي في react-native بنفس الاسم قديم، iOS بس، و deprecated.

---

## ٢. [[<SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>]]

- [[flex: 1]]: خد الشاشة كلها.
- [[edges={['top', 'bottom']}]]: حط padding فوق (الـ notch وشريط الحالة) وتحت (شريط الـ gestures) بس. الحواف التانية [['left']] و [['right']] (بتفرق لما الموبايل يتلف بالعرض).

القيمة نفسها بتيجي من النظام: على آيفون فيه notch ممكن تبقى حوالي 47 فوق و 34 تحت، وعلى الويب 0:

~~~text الناتج (Chrome)
SafeAreaView:  height=844   padding=0px
~~~

---

## ٣. [[<ScrollView contentContainerStyle={{ padding: 16, gap: 12 }} keyboardShouldPersistTaps="handled">]]

الـ ScrollView ليه ستايلين، وده أهم حاجة في الدرس:

| الـ prop | بيتطبق على | بتحط فيه |
|---|---|---|
| [[style]] | الإطار نفسه (الشباك اللي بتبص منه) | حجمه ومكانه، غالبًا [[flex: 1]] |
| [[contentContainerStyle]] | الصندوق الطويل اللي جوه وبيتحرك | [[padding]] و [[gap]] و [[alignItems]] و [[justifyContent]] |

و [[keyboardShouldPersistTaps="handled"]]: لو الكيبورد مفتوح وضغطت زرار، الضغطة توصل للزرار. من غيره (الافتراضي [['never']]) أول ضغطة بتقفل الكيبورد بس. ده على الموبايل، مش ليه أثر على الويب.

---

## ٤. [[{Array.from({ length: 30 }, (_, i) => ( ... ))}]]

من جوه لبرة:

1. [[{ length: 30 }]]: object شبه array طوله ٣٠.
2. [[Array.from(..., fn)]]: اعمل array حقيقي من ٣٠ عنصر، وكل عنصر قيمته اللي الدالة بترجّعه.
3. [[(_, i) =>]]: الدالة بتاخد (العنصر، رقمه). العنصر مش محتاجينه فاسمه [[_]] (عرف معناه «مش مستخدم»)، و [[i]] من 0 لـ 29.
4. [[<Text key={i}>فقرة رقم {i + 1}</Text>]]: [[key]] لازم لأي عنصر في list (درس key في «تاب React»)، و [[i + 1]] عشان العد يبدأ من 1.

---

## ٥. القياس

~~~text الناتج (Chrome، شاشة 390x844)
SafeAreaView:     height=844
ScrollView:       height=844   overflow-y=auto
content container: height=950   padding=16px   gap=12px
الفقرة:           height=19، والمسافة من فقرة للي بعدها 31 (19 + 12)
~~~

- الـ content container ارتفاعه 950 = 16 + 30 × 19 + 29 × 12 + 16. ده أطول من الشاشة (844) بـ 106، فالـ ScrollView بيسمح تنزل الـ 106 دول.
- الـ ScrollView نفسه طوله الشاشة بالظبط، لأن أبوه [[flex: 1]].

---

## ٦. التجربة الأولى: [[View]] بدل [[ScrollView]]

~~~text الناتج (Chrome)
الفقرات: 30   الظاهرة كاملة: 27   آخر فقرة عند y=915 (الشاشة 844)
مفيش أي عنصر بيعمل scroll
~~~

الـ View رسم الـ ٣٠، بس الأخيرة تحت حافة الشاشة ومفيش أي طريقة توصلها، ومن غير أي error. في الويب الصفحة كانت هتعمل scroll لوحدها، في RN لأ.

---

## ٧. التجربة التانية: [[justifyContent]] في [[style]]

حطيت [[style={{ justifyContent: 'center' }}]] على الـ ScrollView:

~~~text الناتج (Chrome)
pageerror: ScrollView child layout (["justifyContent"]) must be applied through the contentContainerStyle prop.
~~~

الشاشة فضيت، لأن RN بيرمي error لما تحط ستايل بيرتّب الأولاد على الإطار بدل المحتوى. على الموبايل نفس الرسالة بتظهر كـ Invariant Violation (من الـ docs). الحل: [[contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}]]، و [[flexGrow: 1]] عشان المحتوى القصير يبقى طوله الشاشة على الأقل فيبقى فيه «نص» يتوسّط فيه.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| محتوى أطول من الشاشة (عدد محدود) | [[ScrollView]] |
| قايمة طويلة أو من API | [[FlatList]] (الدرس الجاي) |
| حجم الإطار | [[style]] على الـ ScrollView |
| padding و gap وترتيب المحتوى | [[contentContainerStyle]] |
| المحتوى ميتغطاش بالـ notch | [[SafeAreaView]] من [[react-native-safe-area-context]] أو [[useSafeAreaInsets()]] |

وشاشة جوه Stack أو Tabs بـ header: الـ navigator بيعمل الـ safe area بتاع الحتة دي، فمتكررهاش.`,
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
          sol: R`من غير ScrollView، الفقرات الأخيرة مش هتظهر ومش هتقدر توصلها (على الويب بشاشة ارتفاعها 844 ظهر ٢٧ فقرة كاملة، والباقي اتقص، والعدد بيختلف حسب الشاشة): الـ View طوله الشاشة والزيادة بتتقص. مفيش أي error.

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
          teach: R`## الفكرة: قولّه البيانات وإزاي يرسم عنصر واحد، وهو يتصرف

في [[ScrollView]] انت بترسم كل العناصر بنفسك بـ [[map]]. في [[FlatList]] انت بتديله الـ array ([[data]]) ودالة بترسم عنصر واحد ([[renderItem]])، وهو بيقرر يرسم مين وإمتى: اللي ظاهر والقريب منه بس. ده اسمه virtualization.

> اتجرّب على Expo SDK 57 على الويب في Chrome بشاشة 390×844: ٥٠٠٠ طلب مرة بـ FlatList ومرة بـ ScrollView و map، وعدّيت العناصر الموجودة فعلًا في الصفحة.

---

## ١. [[type Order = { id: string; customer: string; total: number };]]

شكل الطلب الواحد: رقم (string)، واسم العميل، والإجمالي. TypeScript هيعرف منه نوع [[item]] تحت لوحده.

---

## ٢. [[export function OrdersList({ orders }: { orders: Order[] })]]

prop واحد: [[orders]]، و [[Order[] ]] معناها array من Order.

---

## ٣. الـ [[FlatList]] prop بـ prop

### [[data={orders}]]

الـ array اللي هيترسم.

### [[keyExtractor={(o) => o.id}]]

دالة بتاخد عنصر وترجّع string ثابت ومختلف لكل عنصر. ده نفس [[key]] في React: بيه بيعرف مين اتضاف ومين اتشال لما الـ data تتغير. لازم string، عشان كده الـ id string.

### [[renderItem={({ item }) => ( ... )}]]

الدالة بتاخد object فيه [[item]] (العنصر) و [[index]] (رقمه)، وإحنا فكّينا [[item]] بس. وبترجّع شكل عنصر واحد:

~~~text OrdersList.tsx
<View style={{ padding: 16 }}>
  <Text>{item.customer}</Text>
  <Text>{item.total} جنيه</Text>
</View>
~~~

### [[ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#eee' }} />}]]

component بيترسم **بين** كل عنصرين (مش قبل الأول ولا بعد الأخير): خط ارتفاعه 1 رمادي فاتح.

### [[ListEmptyComponent={<Text ...>مفيش طلبات لسه</Text>}]]

بيظهر بدل القايمة لو [[data]] فاضية. هنا element جاهز (مش دالة)، والاتنين مقبولين.

### [[contentContainerStyle={{ paddingBottom: 24 }}]]

زي ScrollView بالظبط (FlatList مبني فوقه): ستايل المحتوى اللي بيتحرك. مسافة تحت آخر عنصر.

---

## ٤. الـ solCode: ٥٠٠٠ طلب

~~~text الـ solCode
const orders = Array.from({ length: 5000 }, (_, i) => ({
  id: String(i + 1),
  customer: $__btعميل $__{i + 1}$__bt,
  total: (i * 37) % 900 + 100,
}));
~~~

- [[Array.from({ length: 5000 }, fn)]]: ٥٠٠٠ عنصر، كل واحد اللي [[fn]] بترجّعه.
- [[(_, i) => ({ ... })]]: الأقواس [[( )]] حوالين [[{ }]] عشان JavaScript يفهم إنه object مش جسم دالة.
- [[String(i + 1)]]: الـ id string: "1" و "2" ...
- [[$__btعميل $__{i + 1}$__bt]]: template string: «عميل 1» و «عميل 2».
- [[(i * 37) % 900 + 100]]: رقم «عشوائي» ثابت: [[%]] باقي القسمة، فالناتج من 0 لـ 899، و + 100 يخليه من 100 لـ 999.

~~~text الناتج (أول عنصرين في الشاشة)
عميل 1   100 جنيه      (0 × 37 % 900 + 100)
عميل 2   137 جنيه      (1 × 37 % 900 + 100)
~~~

---

## ٥. FlatList ضد ScrollView: الأرقام

~~~text الناتج (Chrome، من فتح الصفحة لحد ما «عميل 1» ظهر)
FlatList:          أول عنصر بعد 968 ms     في الصفحة: 60 عنصر
ScrollView + map:  أول عنصر بعد 2586 ms    في الصفحة: 5000 عنصر
~~~

وبعد ثانية ونص من غير ما ألمس حاجة:

~~~text الناتج
FlatList:          131 عنصر     كل عناصر الصفحة (DOM nodes): 685
ScrollView + map:  5000 عنصر    كل عناصر الصفحة: 15029
~~~

- FlatList رسم أول دفعة ([[initialNumToRender]] افتراضيًا 10)، وبعدين بيكمّل دفعات صغيرة لحد ما يغطي «نافذة» حوالين اللي ظاهر.
- ScrollView مبيعرضش حاجة لحد ما يخلص الـ ٥٠٠٠ كلهم: ٣ عناصر لكل طلب (View و ٢ Text) = حوالي ١٥ ألف.
- الـ 968 ms فيها تحميل الصفحة نفسها، فالفرق الحقيقي في الرسم أكبر. وده على كمبيوتر: على موبايل متوسط الفرق أوضح.
- لما نزلت لتحت ([[scrollTop = 30000]]) الـ FlatList وصل لـ 251 عنصر: بيرسم وانت نازل، مش مرة واحدة.

---

## ٦. القايمة الفاضية

[[<OrdersList orders={[]} />]]:

~~~text الناتج (Chrome)
"مفيش طلبات لسه"
~~~

ولو عايزها في نص الشاشة رأسيًا: [[contentContainerStyle={{ flexGrow: 1 }}]] على الـ FlatList، و [[flex: 1]] و [[justifyContent: 'center']] على الـ empty component.

---

## الخلاصة

| الـ prop | بيعمل إيه |
|---|---|
| [[data]] | الـ array |
| [[renderItem]] | يرسم عنصر واحد من [[{ item, index }]] |
| [[keyExtractor]] | مفتاح string ثابت (مش الـ index) |
| [[ItemSeparatorComponent]] | بين كل عنصرين |
| [[ListEmptyComponent]] | لما الـ data فاضية |
| [[ListHeaderComponent]] و [[ListFooterComponent]] | فوق وتحت، بيعملوا scroll مع القايمة |
| [[extraData]] | state تاني الـ renderItem معتمد عليه |

ScrollView لمحتوى ثابت قليل، و FlatList لأي قايمة بيانات.`,
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
            mistakes: R`[[fontSize: '16px']] أو [[padding: '10px']]: غلط، أرقام بس. وتستنى [[color]] على [[View]] يأثّر على الـ Text اللي جواه: مفيش وراثة. و [[margin: 'auto']] للتوسيط: استخدم [[alignItems]] و [[justifyContent]].`
          },
          teach: R`## الفكرة: الستايل objects، والدمج array

[[Badge]] شارة صغيرة (pill) بنوعين ألوان. الستايلات متجمعة تحت في [[StyleSheet.create]]، والـ component بيختار منها، ولو النوع [['danger']] بيضيف ستايل فوق الأساسي. مفيش classes ولا cascade: كل عنصر ستايله مكتوب عليه صريح.

> اتجرّب على Expo SDK 57 على الويب في Chrome في صندوق عرضه 300، و [[npx tsc --noEmit]] للأخطاء.

---

## ١. [[export function Badge({ label, tone = 'info' }: { label: string; tone?: 'info' | 'danger' })]]

- [[tone = 'info']]: قيمة افتراضية. لو مبعتش [[tone]] بيبقى [['info']].
- [[tone?: 'info' | 'danger']]: النوع union: القيمة لازم واحدة من الاتنين دول بالظبط. لو كتبت [[tone="warning"]]، TypeScript يطلّع خطأ.

---

## ٢. [[<View style={[styles.badge, tone === 'danger' && styles.danger]}>]]

[[style]] هنا array:

1. [[styles.badge]]: الأساسي، دايمًا.
2. [[tone === 'danger' && styles.danger]]: لو danger النتيجة [[styles.danger]]، غير كده [[false]]، و RN بيتجاهل الـ [[false]].

الدمج من الشمال لليمين، واللي بعد بيكسب: [[styles.danger]] فيه [[backgroundColor]] بس، فبيغيّر اللون ويسيب الباقي زي ما هو.

---

## ٣. [[<Text style={styles.text}>{label}</Text>]]

النص ليه ستايل لوحده. لو حطيت [[color]] على الـ View، النص **مش** هياخده: View مبيورّثش.

---

## ٤. [[const styles = StyleSheet.create({ ... })]]

برّه الـ component، فالـ object بيتعمل مرة واحدة مش مع كل render. و [[StyleSheet.create]] بيخلي TypeScript يفحص كل ستايل.

### [[badge]]

| الخاصية | معناها |
|---|---|
| [[alignSelf: 'flex-start']] | العنصر ده بالذات ميتمدّش بعرض أبوه، ياخد قد محتواه |
| [[paddingHorizontal: 10]] | padding يمين وشمال (اختصار مش موجود في CSS) |
| [[paddingVertical: 4]] | padding فوق وتحت |
| [[borderRadius: 999]] | رقم أكبر من نص الارتفاع = الطرفين نص دايرة (pill) |
| [[backgroundColor: '#dbeafe']] | أزرق فاتح |

### [[danger]] و [[text]]

- [[danger: { backgroundColor: '#fee2e2' }]]: أحمر فاتح.
- [[text: { fontSize: 12, fontWeight: '600', color: '#1e293b' }]]: خط صغير تقيل، لونه رمادي غامق.

---

## ٥. القياس

~~~text الناتج (Chrome، الأب عرضه 300 وفيه padding 10)
<Badge label="جديد" />:                width=43    height=24   bg=rgb(219, 234, 254)   padding=4px 10px   radius=999px
<Badge label="ملغي" tone="danger" />:  width=48.1  height=24   bg=rgb(254, 226, 226)
النص:                                  font-size=12px   font-weight=600   color=rgb(30, 41, 59)
~~~

- العرض 43 = 10 + عرض كلمة «جديد» (حوالي 23) + 10. الارتفاع 24 = 4 + 16 (سطر النص) + 4.
- الـ danger أخد اللون الأحمر بس، والـ padding والـ radius زي ما هما.

على الويب كمان RN بيحوّل كل ستايل لـ CSS class صغيرة (زي [[r-alignSelf-k200y]])، بس ده تفصيلة داخلية: انت مبتكتبش classes.

---

## ٦. التجربة الأولى: من غير [[alignSelf]]

~~~text الناتج (Chrome)
width=280   height=24
~~~

280 = 300 − 10 − 10، يعني اتمدّ بعرض أبوه كله. ليه؟ الأب View عمودي، و [[alignItems]] الافتراضي [[stretch]]: كل ولد بيتمدّ على المحور التاني (العرض). [[alignSelf]] بيكسر القاعدة دي للعنصر ده بس.

---

## ٧. التجربة التانية: ستايل غلط و TypeScript

كتبت الستايلات دي في ملف وشغّلت [[npx tsc --noEmit]] ([[--noEmit]] = افحص الأنواع بس، متطلّعش ملفات):

~~~text الكود
a: { padding: '10px' },
b: { 'background-color': 'red' },
c: { fontWeight: 700 },
d: { fontSize: '16px' },
~~~

~~~text الناتج
BadBadge.tsx(4,8): error TS2322: Type '"10px"' is not assignable to type 'DimensionValue | undefined'.
BadBadge.tsx(5,8): error TS2353: Object literal may only specify known properties, and ''background-color'' does not exist in type 'ViewStyle | ImageStyle | TextStyle'.
BadBadge.tsx(7,8): error TS2322: Type 'string' is not assignable to type 'number'.
~~~

| السطر | ليه |
|---|---|
| [[padding: '10px']] | [[DimensionValue]] = رقم، أو نسبة string زي [['50%']]، أو [['auto']]. مفيش px |
| [['background-color']] | الخاصية مش موجودة. الاسم [[backgroundColor]] |
| [[fontWeight: 700]] | **مفيش خطأ**: النوع بيقبل 100 لحد 900 رقم أو string |
| [[fontSize: '16px']] | [[fontSize]] رقم بس |

و [[(4,8)]] يعني سطر 4 حرف 8 في الملف.

---

## الخلاصة

| CSS | React Native |
|---|---|
| [[background-color]] | [[backgroundColor]] |
| [[padding: 10px]] | [[padding: 10]] |
| [[padding: 4px 10px]] | [[paddingVertical: 4, paddingHorizontal: 10]] |
| [[class="badge danger"]] | [[style={[styles.badge, isDanger && styles.danger]}]] |
| وراثة من الأب | مفيش (إلا Text جوه Text) |
| [[:hover]] و media queries | مفيش: [[pressed]] و [[useWindowDimensions]] |`,
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
            how: R`الـ layout بيتحسب بـ Yoga (مكتبة C++ من Meta بتطبق flexbox). [[flex: 1]] في RN مش زي [[flex: 1]] في CSS بالظبط: رقم موجب يعني [[flexGrow]] بالرقم ده و [[flexBasis: 0]]، و [[flexShrink]] بيفضل على الافتراضي 0 (ده من كود Yoga نفسه؛ على الويب react-native-web بيحوّلها [[flex: 1 1 0%]])، فالعناصر اللي عليها flex بتتقسم المساحة الفاضية بالنسبة (1 و 2 يعني تلت وتلتين).

عشان [[flex: 1]] تشتغل، الأب لازم يكون ليه حجم. الجذر بتاع الشاشة بياخد حجم الشاشة من الـ navigator، فأول View لازم [[flex: 1]] عشان يمدّ، وإلا ارتفاعه قد محتواه، والولد اللي عليه [[flex: 1]] جوه أب ارتفاعه صفر = صفر.

[[position: 'absolute']] بيطلّع العنصر من الـ flow، ومكانه بالنسبة للأب المباشر (مفيش حاجة اسمها relative لازم تكتبها، كل حاجة relative افتراضيًا). و [[zIndex]] شغال بين الإخوات.

على الـ RTL: [[flexDirection: 'row']] بيتقلب لوحده لما التطبيق يبقى RTL، وده من أهم مزايا RN مع العربي (درس RTL في المستوى ٢).`,
            when: R`دايمًا. القاعدة العملية: الشاشة [[flex: 1]]، والجزء اللي بيتمدّ (المحتوى، أو الـ list) [[flex: 1]]، والباقي (header و footer) حجمه ثابت أو قد محتواه.`,
            mistakes: R`تنسى [[flex: 1]] على الجذر فالشاشة فاضية أو الـ list مش بتعمل scroll. وتكتب [[display: 'flex']] (ملهاش لازمة) أو [[display: 'grid']] (مش موجود). وتستخدم [[width: '100%']] في row عشان عنصر ياخد الباقي: ده بيزق التاني برّه الشاشة، الصح [[flex: 1]]. و [[height: '100%']] جوه ScrollView: مفيش ارتفاع ثابت تتحسب منه النسبة.`
          },
          teach: R`## الفكرة: شاشة شات = ٣ صفوف، واحد منهم بيتمدّ

الشاشة مقسومة: header ارتفاعه ثابت فوق، ومنطقة الرسايل في النص بتاخد كل اللي فاضل، و footer تحت قد محتواه. كل ده بـ flexbox، ومن غير ما تكتب [[display: flex]] لأن كل View أصلًا flex.

> اتجرّب على Expo SDK 57 على الويب في Chrome بشاشة 390×844 (من غير header للـ navigator)، وكل الأرقام من [[getBoundingClientRect]]. الـ layout على الموبايل بيتحسب بمكتبة Yoga بنفس القواعد.

---

## ١. الجذر: [[<View style={{ flex: 1 }}>]]

[[flex: 1]] معناها «خد كل المساحة الفاضية عند أبوك». أبو أول View في الشاشة هو الـ navigator (أو الشاشة نفسها)، فالجذر بياخد الشاشة كلها.

### [[flex: 1]] بالظبط إيه؟

| | [[flexGrow]] | [[flexShrink]] | [[flexBasis]] |
|---|---|---|---|
| RN على الموبايل (Yoga) | 1 | 0 | 0 |
| react-native-web (اتقاست) | 1 | 1 | 0% |

الأهم [[flexBasis: 0]]: العنصر بيبدأ من حجم صفر على المحور الأساسي، وبعدين [[flexGrow]] بيدّيله نصيبه من المساحة الفاضية. فـ [[flex: 1]] و [[flex: 2]] جنب بعض = تلت وتلتين.

---

## ٢. الـ header

~~~text ChatScreen.tsx
<View style={{ height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 }}>
~~~

| الخاصية | معناها هنا |
|---|---|
| [[height: 56]] | ارتفاع ثابت |
| [[flexDirection: 'row']] | الأولاد جنب بعض. المحور الأساسي بقى الأفقي |
| [[alignItems: 'center']] | على المحور **التاني** (الرأسي هنا): في النص |
| [[justifyContent: 'space-between']] | على المحور **الأساسي** (الأفقي): أول واحد على طرف، وآخر واحد على الطرف التاني، والباقي متوزع بينهم |
| [[paddingHorizontal: 16]] | 16 يمين وشمال |

وجواه ٣ [[Text]]: «رجوع»، و «سارة» بخط [[fontWeight: '600']]، و «⋯» (زرار قايمة).

---

## ٣. منطقة الرسايل: [[<View style={{ flex: 1, backgroundColor: '#f1f5f9' }} />]]

[[flex: 1]] تاني: خد كل اللي فاضل بعد الـ header والـ footer. و [[/>]] في الآخر يعني View فاضي من غير أولاد (هنا مكان الرسايل، في التطبيق الحقيقي FlatList).

---

## ٤. الـ footer

~~~text ChatScreen.tsx
<View style={{ flexDirection: 'row', gap: 8, padding: 8 }}>
  <View style={{ flex: 1, height: 44, borderRadius: 22, backgroundColor: '#e2e8f0' }} />
  <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#2563eb' }} />
</View>
~~~

- row، ومسافة 8 بين الاتنين، و padding 8.
- خانة الكتابة [[flex: 1]]: خد العرض الباقي.
- زرار الإرسال [[width: 44]]: ثابت. و [[borderRadius: 22]] نص الـ 44 = دايرة.
- مفيش ارتفاع للـ footer نفسه: قد محتواه.

---

## ٥. القياس

~~~text الناتج (Chrome، 390x844)
root:    y=0    w=390  h=844
header:  y=0    w=390  h=56
mid:     y=56   w=390  h=728
footer:  y=784  w=390  h=60
input:   x=8    y=792  w=322  h=44
send:    x=338  y=792  w=44   h=44
~~~

| الرقم | جه منين |
|---|---|
| mid = 728 | 844 − 56 (header) − 60 (footer) |
| footer = 60 | 8 + 44 + 8 |
| input = 322 | 390 − 8 − 8 (padding) − 8 (gap) − 44 (الزرار) |
| send x = 338 | 8 + 322 + 8 |

---

## ٦. التجربة: شيل [[flex: 1]] من ٣ أماكن

~~~text من غير flex: 1 على الجذر
root:    h=116
header:  y=0   h=56
mid:     y=56  h=0
footer:  y=56  h=60
~~~

الجذر بقى طوله قد محتواه (56 + 0 + 60 = 116). مفيش مساحة فاضية، فالـ mid بـ [[flexBasis: 0]] فضل صفر، والـ footer طلع لفوق تحت الـ header على طول.

~~~text من غير flex: 1 على الـ mid
root:    h=844
mid:     y=56  h=0
footer:  y=56  h=60
~~~

الجذر لسه 844، بس مفيش حد بياخد الفاضي: الـ footer لزق في الـ header، وتحته 728 فاضيين.

~~~text الـ footer بـ flexDirection: 'column'
footer:  y=776  h=68
input:   x=8  y=784  w=374  h=0
send:    x=8  y=792  w=44   h=44
~~~

خانة الكتابة **اختفت** (ارتفاعها 0) مع إن مكتوب [[height: 44]]. ليه؟ [[flex: 1]] بيشتغل على المحور الأساسي، وفي column المحور الأساسي هو الارتفاع. فـ [[flexBasis: 0]] كسب على [[height]]، والـ footer ارتفاعه قد محتواه فمفيش مساحة فاضية تكبر فيها. وفي نفس الوقت عرضها بقى 374 (اتمدّت بـ [[stretch]] على المحور التاني)، والزرار نزل تحتها عند x=8. و 68 = 8 + 0 + 8 (gap) + 44 + 8.

---

## الخلاصة

| القاعدة | ليه |
|---|---|
| الافتراضي [[column]] مش [[row]] | عكس الويب |
| [[justifyContent]] = المحور الأساسي، [[alignItems]] = التاني | بيتبدلوا لما [[flexDirection]] يتغير |
| [[flex: 1]] على الجذر | من غيره مفيش مساحة فاضية يتوزع منها |
| [[flex: 1]] على الجزء اللي بيتمدّ بس | الـ header والـ footer حجمهم ثابت أو قد محتواهم |
| [[flex: 1]] في row لعنصر ياخد الباقي | مش [[width: '100%']] اللي بيزق التاني برّه |`,
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

و الـ footer بـ [[column]]: الزرار ينزل تحت، وخانة الكتابة تختفي (على الويب اتقاست ارتفاعها 0 مع إن مكتوب [[height: 44]])، لأن [[flex: 1]] بقى على المحور الرأسي: [[flexBasis: 0]] بيلغي الـ height، والـ footer ارتفاعه قد محتواه فمفيش مساحة فاضية تكبر فيها. وده بيوضّح إن [[flex]] بيشتغل على المحور الأساسي بس.`
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
          teach: R`## الفكرة: grid بيعدّ أعمدته من عرض الشاشة، وظل لكل نظام

[[ProductGrid]] بيعرض أسامي منتجات في كروت: عمودين على الموبايل و ٣ على التابلت. مفيش media queries، فبنسأل عن العرض بـ [[useWindowDimensions]] ونحسب بـ JavaScript عادي. والظل بيختلف بين iOS و Android، فبنختار بـ [[Platform.select]].

> اتجرّب على Expo SDK 57 على الويب في Chrome: فتحت الصفحة بعرض 390، وبعدين غيّرت حجم النافذة لـ 768 و 767 وقست الكروت. على الويب [[Platform.OS]] بـ [['web']]، فظل iOS و Android من الـ docs.

---

## ١. الـ import

[[Platform]] و [[StyleSheet]] و [[Text]] و [[useWindowDimensions]] و [[View]]، كلهم من [[react-native]].

---

## ٢. [[const { width, fontScale } = useWindowDimensions();]]

[[useWindowDimensions()]] hook بيرجّع object فيه:

| الخاصية | معناها |
|---|---|
| [[width]] و [[height]] | مقاس النافذة بالـ dp |
| [[scale]] | كام بكسل حقيقي في الـ dp الواحد (2 أو 3 على أغلب الموبايلات) |
| [[fontScale]] | حجم الخط اللي المستخدم اختاره في الإعدادات (1 = عادي) |

وكلمة hook معناها إن الـ component بيعمل re-render لوحده لما المقاس يتغير (تلف الموبايل، أو split screen، أو تصغّر نافذة المتصفح). إحنا فكّينا [[width]] و [[fontScale]] بس.

---

## ٣. [[const columns = width >= 768 ? 3 : 2;]]

768 أو أعرض (تابلت) = ٣ أعمدة، أصغر = ٢.

---

## ٤. [[const itemWidth = (width - 16 * (columns + 1)) / columns;]]

من جوه لبرة:

1. [[columns + 1]]: عدد المسافات. ٢ عمود = ٣ مسافات (شمال، وبينهم، ويمين).
2. [[16 * (...)]]: كل مسافة 16، فده مجموعهم.
3. [[width - ...]]: العرض الباقي للكروت.
4. [[/ columns]]: نصيب الكارت الواحد.

---

## ٥. الـ JSX

- [[{names.map((n) => ( ... ))}]]: كارت لكل اسم.
- [[style={[styles.card, { width: itemWidth }]}]]: الستايل الثابت + العرض المحسوب. ده المكان الطبيعي للـ inline style: قيمة بتتحسب.
- [[key={n}]]: الاسم نفسه مفتاح (لازم يكونوا مش متكررين).
- [[numberOfLines={fontScale > 1.3 ? 2 : 1}]]: لو الخط مكبّر أكتر من 1.3 مرة اسمح بسطرين، غير كده سطر.

---

## ٦. الستايلات

### [[grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, padding: 16 }]]

row، و [[flexWrap: 'wrap']]: لما الصف يتملى، الكارت اللي بعده ينزل سطر جديد. ده grid بسيط من غير [[display: grid]] (مش موجود في RN).

### [[...Platform.select({ ... })]]

~~~text ProductGrid.tsx
...Platform.select({
  ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
  android: { elevation: 3 },
  default: { boxShadow: '0 2px 6px rgba(0,0,0,0.1)' },
}),
~~~

1. [[Platform.select({...})]]: بيرجّع القيمة بتاعة النظام اللي شغال دلوقتي. على iOS الـ object الأول، على Android التاني، وعلى أي حاجة تانية (الويب) [[default]].
2. [[...]] (spread): يفرد خصايص الـ object اللي رجع جوه ستايل [[card]]، كأنك كاتبها بإيدك.

| النظام | الظل | الخصايص |
|---|---|---|
| iOS | لون وشفافية ونعومة وإزاحة | [[shadowColor]] و [[shadowOpacity]] و [[shadowRadius]] و [[shadowOffset]] |
| Android (القديم) | رقم بيقول العنصر «عالي» قد إيه | [[elevation]] |
| الويب (و iOS و Android مع الـ New Architecture) | string زي CSS | [[boxShadow]] |

---

## ٧. القياس

~~~text الناتج (Chrome)
عرض 390:  info="web 390x844 fontScale=1"   ٦ كروت في ٣ صفوف   عرض الكارت 171      x = 16, 203
عرض 768:  info="web 768x1024 fontScale=1"  ٦ كروت في صفين     عرض الكارت 234.66   x = 16, 267, 517
عرض 767:  info="web 767x1024 fontScale=1"  ٦ كروت في ٣ صفوف   عرض الكارت 359.5    x = 16, 392
box-shadow في الكل: rgba(0, 0, 0, 0.1) 0px 2px 6px 0px
~~~

نحسبهم بالمعادلة:

| العرض | الأعمدة | (العرض − 16 × (الأعمدة + 1)) ÷ الأعمدة |
|---|---|---|
| 390 | 2 | (390 − 48) ÷ 2 = 171 |
| 768 | 3 | (768 − 64) ÷ 3 = 234.67 |
| 767 | 2 | (767 − 48) ÷ 2 = 359.5 |

- بكسل واحد (767 لـ 768) قلب الـ layout، ومن غير reload: [[useWindowDimensions]] عمل re-render.
- [[x = 16, 203]]: 16 padding، والكارت التاني عند 16 + 171 + 16.
- [[Platform.OS]] على الويب [['web']]، فـ [[Platform.select]] اختار [[default]] والظل جه من [[boxShadow]].
- [[fontScale=1]] على الويب دايمًا تقريبًا. على الموبايل لما تكبّر الخط من الإعدادات بيبقى 1.3 أو أكتر (من الـ docs).

---

## ٨. لو الفرق كبير: ملفات لكل نظام

بدل [[Platform.select]] في كل حتة، تعمل [[Button.ios.tsx]] و [[Button.android.tsx]] (أو [[Button.web.tsx]] و [[Button.tsx]])، وتستورد [[from './Button']] من غير امتداد، و Metro بيختار. القالب نفسه فيه [[app-tabs.tsx]] و [[app-tabs.web.tsx]] بالشكل ده.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تعرف النظام | [[Platform.OS]]: [['ios']] أو [['android']] أو [['web']] |
| قيمة مختلفة لكل نظام | [[Platform.select({ ios, android, default })]] |
| component مختلف خالص | ملفات [[.ios.tsx]] و [[.android.tsx]] و [[.web.tsx]] |
| layout حسب المقاس | [[useWindowDimensions()]] جوه الـ component، مش [[Dimensions.get]] برّه |
| احترام حجم الخط | [[fontScale]]، ومتقفلش [[allowFontScaling]] |`,
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

جربته على الويب بس (nativewind 4.2.7 و tailwindcss 3.4 مع Expo SDK 57)، والـ classes اتطبقت بنفس قيم نسخة StyleSheet بالظبط، بس الوضع الغامق احتاج ظبط (التفاصيل في «الشرح خطوة بخطوة»). على الموبايل متجربش، والإعداد بيختلف بين 4 و 5، فالمرجع صفحة التركيب الرسمية لنسختك.`,
            when: R`فريق بيستخدم Tailwind أصلًا، أو monorepo فيه موقع Tailwind. لو الفريق مرتاح لـ StyleSheet أو عنده design system كـ components، مش لازم تضيف طبقة تانية. وفيه بدايل تانية بنفس الفكرة زي Unistyles و Tamagui.`,
            mistakes: R`تركّب 4 وتتبع docs بتاعة 5 أو العكس. وتنسى تضيف الملفات في [[content]] بتاع tailwind config فالـ classes مش بتتطبق من غير أي error. وتتوقع كل class من الويب يشتغل. وتخلط [[className]] و [[style]] على نفس العنصر وتستغرب مين كسب.`
          },
          teach: R`## الفكرة: نفس الشاشة، مرة بـ classes ومرة بـ StyleSheet

[[EmptyState]] شاشة «مفيش نتايج» فيها عنوان وزرار «جرّب تاني»، في نص الشاشة، وليها شكل غامق. المثال مكتوب بـ NativeWind ([[className]] بتاع Tailwind)، والـ solCode نفس الشاشة بـ [[StyleSheet]]. هنفك الـ classes واحدة واحدة ونقابل كل واحدة بالستايل اللي بتتحول له.

> اتجرّب على Expo SDK 57 على الويب في Chrome: الـ solCode زي ما هو، والمثال بعد ما ركّبت nativewind 4.2.7 و tailwindcss 3.4.19 بخطوات صفحة التركيب. على Android و iOS متجربش (من الـ docs).

---

## ١. الإعداد (اللي التعليق في أول المثال بيتكلم عنه)

NativeWind مش بيشتغل بمجرد التسطيب. دي الملفات اللي عملتها:

~~~text الملفات
tailwind.config.js    content: ['./src/**/*.{js,jsx,ts,tsx}'] و presets: [require('nativewind/preset')]
global.css            @tailwind base; @tailwind components; @tailwind utilities;
babel.config.js       presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel']
metro.config.js       withNativeWind(getDefaultConfig(__dirname), { input: './global.css' })
nativewind-env.d.ts   /// <reference types="nativewind/types" />
src/app/_layout.tsx   import '../../global.css';
~~~

- [[content]]: الملفات اللي Tailwind بيدوّر فيها على أسامي الـ classes. لو ملفك مش فيها، الـ classes بتاعته مش هتتطبق ومن غير أي error.
- [[jsxImportSource: 'nativewind']]: بيخلي JSX يعدّي على NativeWind، وده اللي بيخلي [[className]] على [[View]] يشتغل.
- [[nativewind-env.d.ts]]: بيعرّف TypeScript إن [[className]] prop مقبول. وأول تشغيل لـ [[expo start]] ضافه لوحده في [[tsconfig.json]]:

~~~text الناتج
NativeWind made the following changes to your project to support TypeScript:
  - Updated ./tsconfig.json to include the nativewind-env.d.ts file
~~~

و TypeScript 6 اشتكى من [[import '../../global.css']] (TS2882: مش لاقي تعريف لملف css)، فضفت [[declare module "*.css";]] في نفس الملف. بعدها [[npx tsc --noEmit]] عدّى.

---

## ٢. الـ View: [[className="flex-1 items-center justify-center gap-3 bg-white p-6 dark:bg-slate-900"]]

| الـ class | بيتحول لـ | في الـ solCode |
|---|---|---|
| [[flex-1]] | [[flex: 1]] | [[box.flex]] |
| [[items-center]] | [[alignItems: 'center']] | نفسه |
| [[justify-center]] | [[justifyContent: 'center']] | نفسه |
| [[gap-3]] | [[gap: 12]] (كل وحدة في Tailwind = 4) | [[gap: 12]] |
| [[p-6]] | [[padding: 24]] | [[padding: 24]] |
| [[bg-white]] | [[backgroundColor: '#fff']] | لون الـ light |
| [[dark:bg-slate-900]] | نفس الخلفية بس لما الوضع غامق: [['#0f172a']] | [[dark ? '#0f172a' : '#fff']] |

[[dark:]] اسمه variant: «طبّق الـ class دي بس في الحالة دي».

---

## ٣. العنوان: [[className="text-lg font-semibold text-slate-900 dark:text-white"]]

- [[text-lg]]: [[fontSize: 18]] (ومعاها [[lineHeight: 28]]).
- [[font-semibold]]: [[fontWeight: '600']].
- [[text-slate-900]] و [[dark:text-white]]: اللون في الوضعين.

---

## ٤. الزرار

~~~text EmptyState.tsx
<Pressable onPress={onRetry} className="rounded-xl bg-blue-600 px-5 py-3 active:opacity-70">
  <Text className="font-semibold text-white">جرّب تاني</Text>
</Pressable>
~~~

| الـ class | معناها |
|---|---|
| [[rounded-xl]] | [[borderRadius: 12]] |
| [[bg-blue-600]] | [[#2563eb]] |
| [[px-5]] و [[py-3]] | [[paddingHorizontal: 20]] و [[paddingVertical: 12]] |
| [[active:opacity-70]] | [[opacity: 0.7]] وانت ضاغط. ده بديل [[style={({ pressed }) => ...}]] |

---

## ٥. الـ solCode بـ StyleSheet

اللي NativeWind بيعمله لوحده، هنا بإيدك:

- [[const dark = useColorScheme() === 'dark';]]: [[useColorScheme()]] بيرجّع [['light']] أو [['dark']] حسب إعداد الجهاز، و [[dark]] بقى boolean.
- [[style={[styles.box, { backgroundColor: dark ? '#0f172a' : '#fff' }]}]]: الستايل الثابت + اللون حسب الوضع.
- [[style={({ pressed }) => [styles.btn, pressed && { opacity: 0.7 }]}]]: بديل [[active:]].
- [[StyleSheet.create]] تحت فيه نفس القيم اللي في الجدول.

---

## ٦. القياس: النسختين جنب بعض

~~~text الناتج (Chrome، 390x844)
                 StyleSheet (solCode)        NativeWind (المثال)
الخلفية          rgb(255, 255, 255)          rgb(255, 255, 255)
padding / gap    24px / 12px                 24px / 12px
العنوان          18px، 600، rgb(15, 23, 42)   18px، 600، rgb(15, 23, 42)، line-height 28px
الزرار           -                           rgb(37, 99, 235)، padding 12px 20px، radius 12px
وقت الضغط        opacity 0.7                 opacity 0.7
الوضع الغامق      الخلفية rgb(15, 23, 42) والعنوان أبيض
~~~

- الضغطتين على «جرّب تاني» زوّدوا العداد 2 في الاتنين.
- على الويب، NativeWind بيحط الـ classes نفسها في الصفحة ([[class="... rounded-xl bg-blue-600 px-5 py-3 active:opacity-70"]]) و CSS حقيقي. على الموبايل بيحوّلها style objects (من الـ docs).

### الوضع الغامق: فرق لقيته في التجربة

- نسخة StyleSheet: لما المتصفح بقى dark، الألوان اتقلبت على طول.
- NativeWind بالإعداد الافتراضي ([[darkMode: 'media']]): [[dark:]] اشتغل مع وضع النظام، بس الصفحة رمت وقت التحميل [[Cannot manually set color scheme, as dark mode is type 'media'. Please use StyleSheet.setFlag('darkMode', 'class')]]، و Expo في وضع التطوير غطى الصفحة بطبقة الأخطاء فالزرار مبقاش بيستقبل ضغط.
- مع [[darkMode: 'class']] في [[tailwind.config.js]]: الخطأ راح والضغط و [[active:]] اشتغلوا، بس [[dark:]] مبقاش يتبع النظام لوحده على الويب، لازم تقلبه انت (من [[colorScheme.set('dark')]]).

يعني الإعداد الدقيق بيفرق بين النسخ والمنصات، وده بالظبط ليه الدرس بيقولك اتبع صفحة التركيب بتاعة نسختك.

---

## الخلاصة

| | StyleSheet | NativeWind |
|---|---|---|
| إعداد | مفيش | ٥ ملفات + import |
| الوضع الغامق | [[useColorScheme()]] وتختار اللون بإيدك | [[dark:]] |
| وقت الضغط | [[style]] دالة بـ [[pressed]] | [[active:]] |
| الطول | أطول (ستايلات تحت) | أقصر (كله على العنصر) |
| مشاركة مع موقع Tailwind | لأ | نفس الـ classes والألوان |

الاتنين بيوصلوا لنفس الستايل في الآخر. اختار NativeWind لو الفريق بيكتب Tailwind أصلًا.`,
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
