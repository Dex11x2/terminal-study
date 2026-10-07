// تكملة تاب rn: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/rn/01.js (شرح حقول الدرس في أوله)
MORE("rn", [
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
          teach: R`## الفكرة: شجرة الفولدرات هي خريطة التطبيق

المثال مش كود، ده **شجرة ملفات**. Expo Router بيبص على فولدر [[src/app]] ويعمل من كل ملف شاشة، ومن مكان الملف بيطلع الـ URL بتاعها. يعني انت مش بتكتب «الشاشة دي اسمها كذا وبتفتح لما كذا»، الاسم والمكان هما الإعداد.

جربنا الشجرة دي بالظبط في مشروع [[create-expo-app]] جديد (Expo SDK 57، expo-router 57.0.25) على نسخة الويب ([[npx expo start --web]]) وفتحناها في Chrome headless.

---

## ١. قواعد الأسامي: ٥ أنواع ملفات

| الاسم | معناه | مثال من الشجرة |
|---|---|---|
| [[اسم.tsx]] | شاشة، والـ URL هو اسم الملف | [[sign-in.tsx]] = [[/sign-in]] |
| [[index.tsx]] | الشاشة الافتراضية للفولدر (زي [[index.html]]) | [[(tabs)/index.tsx]] = [[/]] |
| [[[id].tsx]] | route ديناميكي: القوسين المربعين معناهم «أي قيمة هنا» | [[tasks/[id].tsx]] = [[/tasks/42]] |
| [[_layout.tsx]] | مش شاشة: إطار بيلف كل الشاشات اللي في فولدره | Stack أو Tabs |
| [[(اسم)/]] | group: فولدر للتنظيم بس، ومبيظهرش في الـ URL | [[(app)]] و [[(tabs)]] |
| [[+not-found.tsx]] | أي مسار ملوش ملف | [[/nope]] |

الشرطة السفلية [[_]] في [[_layout]] وعلامة [[+]] في [[+not-found]] علامات خاصة: الـ router بيعرف منها إن الملف ده مش شاشة عادية.

---

## ٢. نمشي على الشجرة سطر سطر

~~~text الشجرة
src/app/
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
  +not-found.tsx         # أي مسار مش موجود
~~~

- [[src/app/_layout.tsx]]: أول ملف بيتشغّل. فيه الحاجات اللي التطبيق كله محتاجها (الـ providers زي الـ session و TanStack Query) والـ navigator الأولاني. الملف نفسه مش ليه URL.
- [[sign-in.tsx]]: جنب الـ layout الجذر، فهو شاشة في الـ Stack الجذر، والـ URL بتاعه [[/sign-in]].
- [[(app)/]]: group. القوسين معناهم «الفولدر ده للتنظيم». كل الشاشات اللي محتاجة login جواه، فنقدر نحميهم مرة واحدة (درس [[Stack.Protected]]).
- [[(app)/_layout.tsx]]: Stack تاني جوه الأول. هو اللي بيخلي التفاصيل تفتح فوق التابات.
- [[(tabs)/_layout.tsx]]: بيرجّع [[<Tabs />]]، فكل ملف جنبه بقى تاب.
- [[(tabs)/index.tsx]]: [[index]] جوه [[(tabs)]] جوه [[(app)]]. شيل الـ groups الاتنين يفضل [[index]] في الجذر، يعني [[/]].
- [[(tabs)/settings.tsx]]: بنفس الحساب [[/settings]]، مش [[/(app)/(tabs)/settings]].
- [[tasks/]]: فولدر عادي من غير قوسين، فاسمه **بيظهر** في الـ URL.
- [[tasks/[id].tsx]]: [[/tasks/]] وبعدها أي قيمة. لو فتحت [[/tasks/42]] الشاشة بتستلم [[id = "42"]] (درس params).
- [[+not-found.tsx]]: أي URL ملوش ملف بيروح هنا.

---

## ٣. الـ URL بيتحسب إزاي؟

خد مسار الملف، شيل منه [[src/app]] والامتداد، وشيل أي فولدر بين قوسين، وشيل [[index]] من الآخر:

~~~text الحساب
src/app/(app)/(tabs)/settings.tsx
        (app)/(tabs)/settings          ← من غير src/app و .tsx
                     settings          ← من غير الـ groups
URL:  /settings
~~~

---

## ٤. اللي طلع لما شغلناه

### الـ sitemap

[[/_sitemap]] شاشة Expo Router بيعملها لوحده في وضع التطوير. على الويب في SDK 57 بتظهر الملفات كشجرة، والـ layouts بتتفتح بضغطة. بعد ما فتحناها كلها، الروابط اللي فيها كانت:

~~~text الناتج (Chrome، روابط /_sitemap)
/  /settings  /notifications  /feed  /notes  /checkout  /new-task  /tasks/[id]  /sign-in  /+not-found
~~~

(الـ lab فيه شاشات زيادة من دروس تانية: notifications و feed و notes و checkout و new-task.) لاحظ إن مفيش ولا رابط فيه [[(app)]] ولا [[(tabs)]].

### مسار مش موجود

فتحنا [[/nope]] فظهر نص [[+not-found.tsx]]:

~~~text الناتج (Chrome)
URL /nope
BODY الصفحة مش موجودة ارجع
~~~

### الـ typed routes

[[experiments.typedRoutes: true]] موجود في [[app.json]] بتاع القالب. أول ما [[expo start]] اشتغل، اتعمل ملف [[.expo/types/router.d.ts]] فيه كل المسارات كأنواع TypeScript. ومسار غلط في الكود:

~~~ts
router.push('/taskz/1');
~~~

[[npx tsc --noEmit]] رفضه:

~~~text الناتج (tsc)
error TS2345: Argument of type '"/taskz/1"' is not assignable to parameter of type 'RelativePathString | ExternalPathString | "/sign-in" | ...'
~~~

يعني TypeScript عارف كل المسارات اللي عندك، وأي غلطة إملائية بتتمسك قبل ما تشغّل.

---

## ٥. الـ deep links

كل شاشة ليها URL، فاللينك [[lab://tasks/7]] (الـ scheme من [[scheme]] في [[app.json]]) بيفتح نفس الشاشة على الموبايل. ده من الـ docs ومتجربش هنا (مفيش موبايل ولا emulator). على الويب نفس الفكرة: فتحنا [[http://localhost:5980/tasks/1]] مباشرة والشاشة اشتغلت.

---

## الخلاصة

| عايز | اعمل |
|---|---|
| شاشة جديدة | ملف [[.tsx]] فيه [[export default]] |
| الشاشة الرئيسية لفولدر | [[index.tsx]] |
| id في المسار | [[[id].tsx]] |
| Stack أو Tabs لمجموعة شاشات | [[_layout.tsx]] في فولدرهم |
| تجمّع من غير ما يظهر في الـ URL | فولدر [[(اسم)]] |
| صفحة 404 | [[+not-found.tsx]] |

- الـ components والـ hooks برّه [[src/app]] (في [[src/components]] مثلًا)، وإلا هتتحول شاشات.
- الـ groups مبتظهرش في الـ URL، والفولدرات العادية بتظهر.`,
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
          sol: R`[[/_sitemap]] بيعرض الملفات كشجرة، والـ layouts ([[(app)/_layout.tsx]] و [[(tabs)/_layout.tsx]]) بتتفتح بضغطة (ده شكلها في SDK 57). بعد ما تفتحهم هتلاقي روابط [[/]] و [[/settings]] و [[/tasks/[id]]] و [[/sign-in]] و [[/+not-found]]. مفيش [[(app)]] ولا [[(tabs)]] في أي رابط.

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
            how: R`Stack في Expo Router هو native stack بتاع React Navigation (في SDK 57 نسخة منه متضمّنة جوه expo-router نفسه): الانتقالات والـ header native فعلًا (UINavigationController على iOS، و Fragments على Android). [[screenOptions]] على الـ Stack بتطبّق على كل الشاشات، و [[options]] على Screen معين بتغلبها.

[[name]] هو المسار النسبي للملف من غير الامتداد ([[tasks/[id]]] و [[(tabs)]]). مش لازم تكتب كل شاشة: اللي مش مكتوبة بتتضاف بإعدادات افتراضية، بس الترتيب والـ options بتتحدد من المكتوب.

من جوه الشاشة: [[<Stack.Screen options={{ title: data?.title }} />]] بيحدّث الـ header من البيانات (موجود في شاشة التفاصيل في الـ lab). و [[headerRight: () => <Button />]] لزرار في الـ header.

[[router.push]] بيضيف للـ history دايمًا، و [[router.navigate]] زيه إلا لو الشاشة المطلوبة هي اللي فوق أصلًا (جربناها بـ [[renderRouter]] في SDK 57: الـ stack [[index, a, b]] وبعد [[navigate('/a')]] بقى [[index, a, b, a]]، يعني مبيرجعش للـ a القديمة)، و [[router.replace]] بعد login أو onboarding عشان الرجوع ميرجعش لهم. و [[presentation: 'modal']] بيفتح الشاشة من تحت لفوق (sheet على iOS).`,
            when: R`Stack للتدفقات اللي فيها رجوع. Modal للمهام المستقلة القصيرة (إنشاء، فلترة، تأكيد). و [[replace]] بعد أي خطوة مش المفروض يرجع لها.`,
            mistakes: R`[[headerShown: false]] على الـ Stack كله وتنسى إن شاشة التفاصيل كده مفيهاش زرار رجوع على Android. وشاشة tabs جوه stack وكل واحد فيهم header فيظهر header مزدوج (الحل [[headerShown: false]] على [[(tabs)]] زي المثال). و [[router.push('/')]] بعد login بدل [[replace]]. واسم في [[name]] مش مطابق لمسار ملف: تحذير «No route named ...».`
          },
          teach: R`## الفكرة: layout بيرجّع Stack، وكل Screen جواه إعدادات شاشة

الملف ده هو [[src/app/(app)/_layout.tsx]]. كل الشاشات اللي في فولدر [[(app)]] هتتفتح فوق بعض زي كوتشينة: آخر واحدة فوق، و«رجوع» بيشيلها. جربناه في الـ lab (SDK 57) على الويب في Chrome headless، والسلوك الـ native (السحب للرجوع و الـ sheet على iOS) من الـ docs.

---

## ١. الـ import

~~~ts
import { Stack } from 'expo-router';
~~~

[[Stack]] component جاهز من expo-router. في SDK 57 هو نسخة من native stack بتاع React Navigation متضمّنة جوه expo-router نفسه (مش محتاج تركّب [[@react-navigation/native-stack]] لوحدها).

---

## ٢. الـ layout

~~~ts
export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerBackTitle: 'رجوع' }}>
~~~

- [[export default]]: إجباري في أي ملف جوه [[src/app]]، Expo Router بيدوّر على الـ default export.
- [[<Stack>]]: من غير أي حاجة جواه كان هيشتغل برضه، وكل الشاشات هتاخد الإعدادات الافتراضية.
- [[screenOptions]]: إعدادات بتتطبّق على **كل** الشاشات في الـ Stack. القوسين المزدوجين [[{{ }}]]: الخارجيين معناهم «JavaScript جوه JSX»، والداخليين object.
- [[headerBackTitle: 'رجوع']]: النص اللي جنب سهم الرجوع على iOS. على Android مفيش نص جنب السهم أصلًا.

---

## ٣. الـ Screens: كل سطر شاشة

~~~ts
<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
<Stack.Screen name="tasks/[id]" options={{ title: 'تفاصيل المهمة' }} />
<Stack.Screen name="new-task" options={{ presentation: 'modal', title: 'مهمة جديدة' }} />
~~~

[[name]] هو مسار الملف من فولدر الـ layout، من غير [[.tsx]]:

| [[name]] | الملف | [[options]] |
|---|---|---|
| [[(tabs)]] | فولدر [[(tabs)]] كله (فيه layout تاني) | [[headerShown: false]]: التابات ليها header بتاعها، فلو سبنا ده هيظهر header فوق header |
| [[tasks/[id]]] | [[tasks/[id].tsx]] | [[title]]: العنوان اللي فوق |
| [[new-task]] | [[new-task.tsx]] | [[presentation: 'modal']]: تطلع من تحت بدل من الجنب |

و [[options]] على شاشة بتغلب [[screenOptions]] اللي على الـ Stack لو الاتنين حددوا نفس الحاجة.

### هو أنا لازم أكتب كل الشاشات؟

لأ. أي ملف في الفولدر مش مكتوب بيتضاف لوحده بإعدادات افتراضية. بتكتب [[Stack.Screen]] بس للشاشة اللي محتاجة إعداد.

---

## ٤. اللي ظهر على الويب

فتحنا شاشة التفاصيل من القايمة:

~~~text الناتج (Chrome)
URL /tasks/1
BODY اشتري لبن التاب الحالي: info التعليقات
~~~

العنوان طلع «اشتري لبن» مش «تفاصيل المهمة»، لأن الشاشة نفسها فيها [[<Stack.Screen options={{ title: data?.title }} />]] (درس params)، واللي جوه الشاشة بيغلب اللي في الـ layout. والـ tab bar اختفى، لأن [[tasks/[id]]] في الـ Stack اللي **فوق** التابات.

---

## ٥. الحل (solCode): شاشة [[new-task]]

~~~ts
import { router } from 'expo-router';
import { Button, View } from 'react-native';

export default function NewTask() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="حفظ" onPress={() => router.back()} />
    </View>
  );
}
~~~

- [[router]]: object جاهز للتنقل من أي حتة (مش hook، فممكن تستخدمه برّه component كمان).
- [[Button]]: زرار RN البسيط، [[title]] هو النص.
- [[onPress={() => router.back()}]]: الضغطة بتشيل الشاشة اللي فوق، وده بيقفل الـ modal.
- [[flex: 1]]: الـ View ياخد الشاشة كلها.

وفي تاب المهام: [[<Link href="/new-task">مهمة جديدة</Link>]]. لاحظ الـ href من غير [[(app)]].

~~~text الناتج (Chrome)
بعد الضغط على «مهمة جديدة»:  URL /new-task   BODY مهمة جديدة حفظ
بعد الضغط على «حفظ»:         URL /           (رجعنا لتاب المهام)
~~~

---

## ٦. أوامر التنقل

| الأمر | بيعمل إيه | إمتى |
|---|---|---|
| [[router.push('/x')]] | يحط شاشة فوق، دايمًا | فتح تفاصيل |
| [[router.navigate('/x')]] | زي push، إلا لو x هي الشاشة اللي فوق أصلًا فمبيعملش حاجة | Link بيستخدمه افتراضيًا |
| [[router.replace('/x')]] | يبدّل الشاشة الحالية، فمفيش رجوع ليها | بعد login أو onboarding |
| [[router.back()]] | يشيل اللي فوق | زرار حفظ أو إلغاء |
| [[router.dismissTo('/x')]] | يقفل الشاشات لحد ما يوصل لـ x | آخر خطوة في wizard |

---

## الخلاصة

- [[_layout.tsx]] بيرجّع [[<Stack>]]، فشاشات الفولدر بتتفتح فوق بعض.
- [[screenOptions]] للكل، و [[options]] لشاشة، واللي جوه الشاشة نفسها بيغلب الاتنين.
- [[name]] = مسار الملف من غير الامتداد، ومش لازم تكتب كل الشاشات.
- [[presentation: 'modal']] للشاشات القصيرة المستقلة، و [[headerShown: false]] على [[(tabs)]] عشان ميبقاش فيه header مزدوج.`,
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
            how: R`[[Tabs]] هو bottom tabs بتاع React Navigation (نسخة متضمّنة جوه expo-router في SDK 57). كل تاب بيحتفظ بالـ state بتاعه (الـ scroll، والبيانات) لما تنقل بين التابات، لأن الشاشات مش بتتشال. ولو التاب نفسه فولدر فيه [[_layout.tsx]] بـ Stack، التاب بيبقى ليه history خاص بيه (تفتح تفاصيل جوه التاب والـ tab bar يفضل ظاهر).

[[tabBarIcon]] بتاخد [[{ focused, color, size }]] فتغيّر الأيقونة لما التاب يتختار. [[@expo/vector-icons]] فيه Ionicons و MaterialIcons وغيرهم. القالب الجديد في SDK 57 مش بيركّبه (بيستخدم صور و expo-symbols)، فركّبه بـ [[npx expo install @expo/vector-icons]].

في الـ lab: الـ Stack في [[(app)/_layout.tsx]] جواه [[(tabs)]] وشاشة [[tasks/[id]]]، فالتفاصيل بتفتح فوق التابات والـ tab bar بيختفي. ولو عايز التفاصيل جوه التاب (والـ bar ظاهر)، حط [[tasks/[id].tsx]] جوه فولدر التاب واعمله Stack.

[[NativeTabs]]: بيستخدم UITabBarController و Material bottom navigation الحقيقيين (شكل iOS 26 الـ liquid glass مثلًا)، بس الـ API ممكن يتغير بين الـ SDKs.`,
            when: R`٣ لـ ٥ أقسام رئيسية متساوية. أكتر من كده: drawer أو شاشة «المزيد». و NativeTabs لو الشكل الأصلي مهم وموافق إن الـ API يتغير.`,
            mistakes: R`تفتح شاشة تفاصيل من تاب فتلاقي الـ tab bar ظاهر وانت مش عايزه (أو العكس) لأنك حاطط الملف في المكان الغلط. و [[name]] مش مطابق لاسم الملف (index مش home). وأيقونة من مكتبة مش متركبة فيظهر مربع فاضي.`
          },
          teach: R`## الفكرة: نفس فكرة Stack، بس الشاشات جنب بعض مش فوق بعض

الملف ده [[src/app/(app)/(tabs)/_layout.tsx]]. بيرجّع [[<Tabs>]] بدل [[<Stack>]]، فكل ملف في فولدر [[(tabs)]] بقى زرار في شريط تحت. والـ [[Tabs.Screen]] بيحدد عنوان وأيقونة كل تاب. جربناه في الـ lab (SDK 57) على الويب في Chrome headless.

---

## ١. الـ imports

~~~ts
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
~~~

- [[@expo/vector-icons]]: مكتبة أيقونات (فيها Ionicons و MaterialIcons وغيرهم). القالب الجديد مش بيركّبها، فركّبها بـ [[npx expo install @expo/vector-icons]] (في الـ lab ركّب نسخة 15.1.1).
- [[Ionicons]]: مجموعة واحدة منهم، الأيقونة بتتحدد بـ [[name]].
- [[Tabs]]: الـ bottom tab navigator من expo-router.

---

## ٢. [[<Tabs screenOptions>]]

~~~ts
<Tabs screenOptions={{ tabBarActiveTintColor: '#2563eb' }}>
~~~

زي Stack: [[screenOptions]] على كل التابات. [[tabBarActiveTintColor]] لون التاب المختار (أيقونته ونصه). [[#2563eb]] لون أزرق مكتوب hex (أحمر وأخضر وأزرق، كل واحد خانتين من 00 لـ ff).

---

## ٣. [[Tabs.Screen]]: سطر بسطر

~~~ts
<Tabs.Screen
  name="index"
  options={{ title: 'المهام', tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} /> }}
/>
~~~

- [[name="index"]]: الملف [[index.tsx]] اللي جنب الـ layout. لازم يطابق اسم الملف بالظبط (مش [[home]]).
- [[title: 'المهام']]: النص اللي تحت الأيقونة، وعنوان الـ header كمان.
- [[tabBarIcon]]: **دالة** مش أيقونة. الـ navigator بينديها وبيبعتلها object فيه:
  - [[color]]: اللون الصح حسب التاب مختار ولا لأ (هنا الأزرق أو الرمادي).
  - [[size]]: الحجم المناسب للنظام.
  - [[focused]]: true لو التاب مختار (مش مستخدمة هنا، بس مفيدة لو عايز أيقونة مختلفة للمختار).
- [[({ color, size }) =>]]: destructuring للـ object ده، وبنرجّع [[<Ionicons>]] باللون والحجم اللي جايين. فإحنا مش بنحدد اللون بإيدينا، الـ navigator هو اللي بيقرر.

التاب التاني نفس الشكل بالظبط: [[name="settings"]] و أيقونة [[settings-outline]].

---

## ٤. اللي ظهر على الويب

بعد الـ login، الشريط اللي تحت كان فيه (من [[innerText]] بتاع الصفحة):

~~~text الناتج (Chrome، الـ tab bar)
/               المهام
/settings       الإعدادات
/notifications  3 الإشعارات
~~~

التاب التالت جاي من الحل: [[tabBarBadge: 3]] حط الرقم 3 في دايرة على التاب. (الأيقونات نفسها بتترسم بخط أيقونات، فمش بتظهر كنص.)

ولما دوسنا على «الإعدادات»، نص شاشة المهام فضل موجود في الصفحة جنب نص الإعدادات: الـ Tabs مش بيشيل الشاشة اللي سبتها، فلما ترجعلها تلاقي الـ scroll والبيانات زي ما هي.

---

## ٥. الحل (solCode): تاب الإشعارات

~~~ts
// src/app/(app)/(tabs)/notifications.tsx
export default function Notifications() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>مفيش إشعارات جديدة</Text>
    </View>
  );
}
// في (tabs)/_layout.tsx:
// <Tabs.Screen name="notifications" options={{ title: 'الإشعارات', tabBarBadge: 3 }} />
~~~

خطوتين: ملف جديد في نفس الفولدر (فبقى تاب لوحده)، وسطر [[Tabs.Screen]] عشان العنوان والـ badge. [[tabBarBadge]] بياخد رقم أو نص، ولو [[undefined]] الـ badge بيختفي.

### الجزء التاني من التجربة

فتحنا [[/tasks/1]] من تاب المهام: الـ body كان [[اشتري لبن التاب الحالي: info التعليقات]] من غير أي تاب. يعني التفاصيل فوق التابات كلها، ومفيش تاب إعدادات تدوس عليه. ده لأن [[tasks/[id]]] في الـ Stack اللي في [[(app)]] مش جوه [[(tabs)]].

| عايز | حط [[tasks/[id].tsx]] فين |
|---|---|
| التفاصيل تغطي التابات (الشائع) | في [[(app)/tasks/]] جنب [[(tabs)]] زي الـ lab |
| التفاصيل جوه التاب والشريط ظاهر | في فولدر التاب نفسه، والتاب يبقى فولدر فيه [[_layout.tsx]] بـ Stack |

---

## الخلاصة

- [[_layout.tsx]] بيرجّع [[<Tabs>]]، وكل ملف جنبه بقى تاب.
- [[name]] = اسم الملف، و [[title]] النص، و [[tabBarIcon]] دالة بتستلم [[color]] و [[size]] و [[focused]].
- [[tabBarBadge]] رقم على التاب، و [[href: null]] بيخبّي ملف من الشريط.
- التابات بتفضل محفوظة لما تنقل بينها.
- [[NativeTabs]] (من [[expo-router/unstable-native-tabs]]) هو اللي القالب الجديد بيستخدمه، بس الـ API بتاعه لسه unstable.`,
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
          teach: R`## الفكرة: الـ URL هو اللي بيوصّل البيانات للشاشة

شاشة التفاصيل مش بتستلم المهمة نفسها من القايمة. بتستلم **الـ id بس** من الـ URL ([[/tasks/42]])، وبتجيب المهمة بنفسها من السيرفر. وأي حاجة اختيارية (زي التاب المفتوح) بتيجي في الـ query string ([[?tab=comments]]). جربنا الشاشة دي في الـ lab (SDK 57) على الويب، مع API صغير وهمي على port 5981.

---

## ١. الـ imports

~~~ts
import { useQuery } from '@tanstack/react-query';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { api } from '@/lib/api';
~~~

- [[useQuery]]: بيجيب البيانات ويخزنها (قسم TanStack Query الجاي).
- [[Link]] للتنقل، و [[Stack]] عشان نغيّر عنوان الـ header من جوه الشاشة، و [[useLocalSearchParams]] لقراية الـ params.
- [[@/lib/api]]: [[@]] اختصار لفولدر [[src]] (متعرّف في [[tsconfig.json]] تحت [[paths]]). و [[api]] دالة [[fetch]] صغيرة بتحط الـ base URL والتوكن (درس «API client بالتوكن»).

---

## ٢. النوع

~~~ts
type Task = { id: number; title: string; done: boolean };
~~~

شكل المهمة اللي السيرفر بيرجّعها. ده TypeScript بس، مفيش فحص وقت التشغيل.

---

## ٣. قراية الـ params

~~~ts
const { id, tab = 'info' } = useLocalSearchParams<{ id: string; tab?: string }>();
~~~

من جوه لبرة:

1. [[useLocalSearchParams]] بيرجّع object فيه كل params الشاشة: اللي في المسار ([[id]] من [[[id].tsx]]) واللي في الـ query ([[tab]]).
2. [[<{ id: string; tab?: string }>]]: generic بيقول لـ TypeScript شكل الـ object. [[?]] بعد [[tab]] معناها ممكن متجيش. ده نوع بس، مش validation.
3. [[{ id, tab = 'info' }]]: destructuring، و [[= 'info']] قيمة افتراضية لو [[tab]] مش في الـ URL.

**كل القيم strings.** [[/tasks/42]] بيدّي [[id = "42"]] مش [[42]]، لأن الـ URL نص. لو محتاج رقم: [[Number(id)]].

---

## ٤. جيب المهمة

~~~ts
const { data } = useQuery({ queryKey: ['tasks', id], queryFn: () => api<Task>($__bt/api/tasks/$__{id}$__bt) });
~~~

- [[queryKey: ['tasks', id]]]: اسم الـ cache، وفيه الـ id، فكل مهمة ليها مكان لوحدها.
- [[queryFn]]: الدالة اللي بتجيب. [[$__bt/api/tasks/$__{id}$__bt]] template literal: [[$__{id}]] بتتبدّل بالقيمة، فيبقى [[/api/tasks/1]].
- [[api<Task>]]: بنقول إن الرد شكله [[Task]]، فـ [[data]] نوعه [[Task | undefined]] ([[undefined]] لحد ما الرد يوصل).

---

## ٥. الـ JSX

~~~ts
<Stack.Screen options={{ title: data?.title ?? 'تحميل...' }} />
<Text>التاب الحالي: {tab}</Text>
<Link href={{ pathname: '/tasks/[id]', params: { id, tab: 'comments' } }}>التعليقات</Link>
~~~

- [[<Stack.Screen options>]] **جوه الشاشة**: بيغيّر الـ header بتاعها هي. [[data?.title]]: [[?.]] معناها «لو [[data]] موجودة هات [[title]]، وإلا [[undefined]]». و [[??]]: «لو اللي قبلي [[null]] أو [[undefined]] خد اللي بعدي». فالعنوان «تحميل...» لحد ما البيانات توصل.
- [[{tab}]]: بنعرض الـ param.
- [[href]] كـ object: [[pathname]] هو شكل المسار بالأقواس زي اسم الملف، و [[params]] بيملا [[[id]]] والباقي يروح query. فده بيبقى [[/tasks/1?tab=comments]].

---

## ٦. اللي حصل في Chrome

~~~text الناتج (Chrome + الـ API الوهمي)
ضغطة على المهمة 1 في القايمة:
  URL   /tasks/1
  BODY  اشتري لبن التاب الحالي: info التعليقات
  طلب   GET /api/tasks/1  (معاه Authorization: Bearer ...)

ضغطة على «التعليقات»:
  URL   /tasks/1?tab=comments
  BODY  اشتري لبن التاب الحالي: comments التعليقات
  طلب   مفيش
~~~

ليه مفيش طلب تاني؟ الـ key لسه [[['tasks', '1']]] (الـ id متغيرش)، والبيانات لسه fresh ([[staleTime]] ٣٠ ثانية في الـ provider). ولما دوسنا Back من [[?tab=comments]] رجعنا للقايمة على طول: الـ Link فتح نفس الشاشة اللي فوق، فالـ params بتاعتها اتحدثت بدل ما شاشة جديدة تتحط فوقها.

---

## ٧. الحل (solCode)

~~~ts
<TaskRow
  task={item}
  onPress={() => router.push({ pathname: '/tasks/[id]', params: { id: item.id } })}
/>
~~~

نفس شكل الـ [[href]]، بس من الكود بدل [[<Link>]]. [[item.id]] رقم، والنوع مسموح (expo-router بيحوّله نص في الـ URL). في الـ lab الضغطة على الصف فتحت [[/tasks/1]] زي ما شفنا فوق.

### المسار الغلط

~~~ts
router.push('/taskz/1');
~~~

~~~text الناتج (npx tsc --noEmit)
error TS2345: Argument of type '"/taskz/1"' is not assignable to parameter of type 'RelativePathString | ExternalPathString | "/sign-in" | ...'
~~~

الأنواع دي جاية من [[.expo/types/router.d.ts]] اللي [[expo start]] بيعمله. قبل أول [[expo start]] الملف مش موجود، فمفيش خطأ.

---

## الخلاصة

| الحاجة | منين |
|---|---|
| [[id]] في [[/tasks/42]] | اسم الملف [[[id].tsx]] |
| [[tab]] في [[?tab=comments]] | الـ query string |
| القراية | [[useLocalSearchParams<...>()]] |
| النوع | دايمًا string، اعمل [[Number()]] لو محتاج |
| الفتح | [[<Link href={{ pathname, params }}>]] أو [[router.push]] |

ابعت id، والشاشة تجيب بياناتها بنفسها. كده الـ deep link والـ refresh بيشتغلوا لأن الـ URL فيه كل اللي الشاشة محتاجاه.`,
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
          sol: R`كل صف بيفتح [[/tasks/1]] و [[/tasks/2]]... والـ header بيتغير لعنوان المهمة لما البيانات تيجي. و [[router.push('/taskz/1')]] بيطلّع [[error TS2345]]: [["/taskz/1"]] مش assignable للـ parameter، والنوع اللي في الرسالة union فيه كل المسارات اللي عندك ([["/sign-in"]] وغيره).

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
          teach: R`## الفكرة: الشاشة المحمية «مش موجودة» لحد ما يبقى فيه token

[[Stack.Protected]] بيلف شاشات وبياخد [[guard]] (true أو false). لو false، Expo Router بيتعامل كأن الشاشات دي مش في التطبيق أصلًا، فأي محاولة توصلها بتروح لأول شاشة متاحة. والـ layout الجذر بيقرا الـ token من الـ session ويحطه في الـ guard.

جربنا الملف ده في الـ lab (SDK 57) على الويب، والاختبار اللي في الحل بـ Jest (jest-expo 57 و RNTL 14.0.1).

---

## ١. الـ imports

~~~ts
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SessionProvider, useSession } from '@/lib/session';
~~~

- [[* as SplashScreen]]: هات كل اللي في المكتبة في object واحد اسمه [[SplashScreen]]. الـ splash هي الصورة اللي بتظهر أول ما التطبيق يفتح.
- [[SessionProvider]] و [[useSession]]: الـ context بتاع التوكن (الكود كامل في درس SecureStore).

---

## ٢. سيب الـ splash ظاهرة

~~~ts
SplashScreen.preventAutoHideAsync();
~~~

السطر ده برّه أي component، فبيتنفذ مرة واحدة أول ما الملف يتحمّل. معناه: «متشيلش الـ splash لوحدك، أنا هقولك إمتى». ليه؟ لأن قراية التوكن async، ولو عرضنا الشاشات قبل ما نعرف، المستخدم المسجّل هيشوف شاشة الدخول لحظة.

---

## ٣. [[RootNavigator]]: سطر سطر

~~~ts
function RootNavigator() {
  const { token, isLoading } = useSession();
  useEffect(() => { if (!isLoading) SplashScreen.hideAsync(); }, [isLoading]);
  if (isLoading) return null;
~~~

- [[useSession()]]: [[token]] (string أو null) و [[isLoading]] (لسه بنقرا التخزين؟).
- [[useEffect(..., [isLoading])]]: يشتغل كل ما [[isLoading]] تتغير. أول ما تبقى false: [[hideAsync()]] تشيل الـ splash.
- [[if (isLoading) return null]]: لسه مش عارفين، فمنرسمش حاجة. [[null]] في React معناها «مفيش UI»، والـ splash لسه فوق.

ليه component منفصل؟ [[useSession]] لازم يتنادى **تحت** [[SessionProvider]]. لو ناديناه في [[RootLayout]] نفسه، هيبقى فوق الـ provider ومش هيلاقي الـ context.

---

## ٤. الـ guards

~~~ts
<Stack screenOptions={{ headerShown: false }}>
  <Stack.Protected guard={!!token}>
    <Stack.Screen name="(app)" />
  </Stack.Protected>
  <Stack.Protected guard={!token}>
    <Stack.Screen name="sign-in" />
  </Stack.Protected>
</Stack>
~~~

- [[!!token]]: [[!]] مرة بتقلب القيمة لـ boolean معكوس، ومرتين بترجّعها boolean صح. فـ [[!!'abc']] = [[true]] و [[!!null]] = [[false]].
- [[!token]]: العكس. فدايمًا واحد بس من الاتنين متاح.
- [[name="(app)"]]: الـ group كله (كل الشاشات اللي جواه) محمي بسطر واحد.

| الحالة | [[(app)]] | [[sign-in]] | بتفتح على |
|---|---|---|---|
| مفيش token | مش موجود | موجود | [[/sign-in]] |
| فيه token | موجود | مش موجود | [[/]] |

ولما الـ token يتغير (login أو logout)، الـ guard بيتغير، والتحويل بيحصل لوحده من غير [[router.replace]].

---

## ٥. [[RootLayout]]

~~~ts
export default function RootLayout() {
  return (
    <SessionProvider>
      <RootNavigator />
    </SessionProvider>
  );
}
~~~

الـ provider فوق، والـ navigator تحته. (في الـ lab لفّينا كمان بـ [[QueryProvider]] من درس TanStack Query.)

---

## ٦. اللي حصل في Chrome

~~~text الناتج (Chrome + API وهمي)
فتح /  من غير token        →  URL /sign-in
فتح /tasks/7 من غير token  →  URL /sign-in   (الـ deep link اتمنع)
login صح                   →  URL /          وطلب GET /api/tasks معاه Bearer acc-123
ضغطة «خروج» في الإعدادات   →  URL /sign-in
~~~

> على الويب: [[expo-secure-store]] ملوش نسخة ويب. أول تشغيل وقع بـ [[ExpoSecureStore.default.getValueWithKeyAsync is not a function]]، فالـ lab استخدم بديل بـ localStorage على الويب بس عشان نجرّب التدفق. ده **مش آمن** ومش للإنتاج.

---

## ٧. الحل (solCode): اختبار بـ [[renderRouter]]

~~~ts
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
~~~

layout صغير للاختبار: [[index]] محمية بـ prop، و [[sign-in]] برّه أي حماية.

~~~ts
const router = renderRouter({
  _layout: () => <Layout loggedIn={false} />,
  index: () => <Text>Home</Text>,
  'sign-in': () => <Text>Sign in</Text>,
}, { initialUrl: '/' });
await router;
~~~

- [[renderRouter]] من [[expo-router/testing-library]]: بيعمل تطبيق Expo Router في الذاكرة. الـ object الأول هو «فولدر [[app]]»: كل مفتاح اسم ملف، وكل قيمة الـ component بتاعه. [[_layout]] هو الـ layout.
- [[initialUrl: '/']]: افتح على [[/]] (يعني [[index]] المحمية).
- [[await router]]: في النسخ دي [[renderRouter]] بيرجّع حاجة تتعمل لها [[await]] (طبعنا [[typeof router.then]] فطلع [[function]]). من غير [[await]] بيطلع «render function has not been called».

~~~ts
expect(await screen.findByText('Sign in')).toBeOnTheScreen();
expect(router.getPathname()).toBe('/sign-in');
expect(screen.queryByText('Home')).toBeNull();
~~~

- [[findByText]]: يستنى لحد ما النص يظهر. [[toBeOnTheScreen()]]: موجود في الشاشة.
- [[router.getPathname()]]: الـ URL الحالي، لازم يبقى [[/sign-in]].
- [[queryByText]]: زي [[getByText]] بس بيرجّع [[null]] بدل ما يرمي error لو مش لاقي، فينفع مع [[toBeNull()]].

~~~text الناتج (jest)
PASS src/__tests__/protected.test.tsx
  √ guest is sent to sign-in
  √ logged in stays on /
~~~

(الاختبار التاني نفس الكود بـ [[loggedIn={true}]]، والـ pathname فضل [[/]].)

والطريقة اللي في الـ docs [[expect(screen).toHavePathname('/')]] جربناها لوحدها ووقعت:

~~~text الناتج (jest)
TypeError: screen.getPathname is not a function
~~~

عشان كده الحل بيستخدم [[router.getPathname()]].

---

## الخلاصة

- [[Stack.Protected guard={...}]]: الشاشات جواه موجودة بس لو الـ guard بـ true.
- guard للمسجّلين ([[!!token]]) وواحد للضيوف ([[!token]])، والتحويل بيحصل لوحده لما الـ token يتغير.
- [[isLoading]] + [[preventAutoHideAsync]] + [[hideAsync]] = مفيش flash لشاشة الدخول.
- ده حماية للـ UI بس. السيرفر لازم يرفض أي طلب من غير توكن صح.`,
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
          teach: R`## الفكرة: TanStack Query محتاج حد يقوله «المستخدم رجع» و «النت رجع»

الملف ده provider بتحطه مرة واحدة في الـ root layout. بيعمل [[QueryClient]] واحد للتطبيق كله، وبيوصّل [[AppState]] بتاع RN بـ [[focusManager]] بتاع TanStack. والحل بيوصّل NetInfo بـ [[onlineManager]]. على الويب TanStack بيسمع أحداث المتصفح لوحده، وعلى الموبايل مفيش متصفح، فانت اللي بتوصّل.

جربنا الملفين في الـ lab (SDK 57، TanStack Query 5.104، NetInfo 12.0.1) على الويب في Chrome headless، مع API وهمي. سلوك [[AppState]] على موبايل حقيقي من الـ docs (مفيش جهاز هنا).

---

## ١. الـ imports

~~~ts
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import { useEffect, type PropsWithChildren } from 'react';
import { AppState, Platform } from 'react-native';
~~~

- [[QueryClient]]: الـ cache نفسه. و [[QueryClientProvider]]: بيحطه في context عشان أي [[useQuery]] تحت يلاقيه.
- [[focusManager]]: الحتة في TanStack اللي بتقرر «التطبيق قدام المستخدم ولا لأ».
- [[type PropsWithChildren]]: نوع props فيها [[children]]. كلمة [[type]] معناها إنه نوع بس، بيتشال من الـ JavaScript.
- [[AppState]]: بيقول التطبيق [[active]] (قدام المستخدم) ولا [[background]] ولا [[inactive]] (iOS، زي لما مركز الإشعارات مفتوح). و [[Platform.OS]]: [['ios']] أو [['android']] أو [['web']].

---

## ٢. الـ client

~~~ts
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
});
~~~

- برّه أي component: بيتعمل مرة واحدة. لو جوه component، كل render يعمل client جديد والـ cache يضيع.
- [[defaultOptions.queries]]: إعدادات لكل الـ queries.
- [[staleTime: 30_000]]: البيانات «fresh» لمدة ٣٠ ألف ميلي ثانية = ٣٠ ثانية. الـ [[_]] جوه الرقم مجرد فاصل للقراية (numeric separator)، [[30_000]] هي [[30000]]. وطول ما البيانات fresh، مفيش refetch تلقائي.
- [[retry: 1]]: لو الطلب فشل، جرّب مرة كمان بس (الافتراضي ٣).

---

## ٣. [[useAppStateFocus]]

~~~ts
function useAppStateFocus() {
  useEffect(() => {
    const sub = AppState.addEventListener('change', (status) => {
      if (Platform.OS !== 'web') focusManager.setFocused(status === 'active');
    });
    return () => sub.remove();
  }, []);
}
~~~

- اسمه بيبدأ بـ [[use]] فهو custom hook (بيستخدم hooks جواه).
- [[useEffect(..., [])]]: الـ array الفاضي معناه «مرة واحدة بعد أول render».
- [[AppState.addEventListener('change', ...)]]: كل ما حالة التطبيق تتغير، الدالة بتتنادى بالحالة الجديدة. وبترجّع object فيه [[remove()]].
- [[status === 'active']]: true لو التطبيق قدام المستخدم. و [[focusManager.setFocused(true)]] بيقول لـ TanStack «رجعنا»، فأي query عليها observer والـ data بتاعتها stale بتتجاب تاني.
- [[Platform.OS !== 'web']]: على الويب TanStack بيسمع [[visibilitychange]] بنفسه، فمش محتاجين ندخل.
- [[return () => sub.remove()]]: الـ cleanup. لو الـ component اتشال، نشيل الـ listener.

---

## ٤. [[QueryProvider]]

~~~ts
export function QueryProvider({ children }: PropsWithChildren) {
  useAppStateFocus();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
~~~

بيشغّل الربط، وبيلف التطبيق بالـ provider. في [[src/app/_layout.tsx]]: [[<QueryProvider><SessionProvider>...]].

---

## ٥. «المستخدم رجع» على الويب

على الويب الـ [[if]] بتاعنا بيتخطى، والشغل كله من listener بتاع TanStack نفسه. عملنا في Chrome الصفحة hidden وبعدين visible (زي ما تروح تاب تاني وترجع)، وعدّينا الطلبات:

~~~text الناتج (Chrome، شاشة المهام مفتوحة)
رجعنا بعد أقل من ٣٠ ثانية:  []
رجعنا بعد أكتر من ٣٠ ثانية: ["GET /api/tasks"]
~~~

ده [[staleTime]] بالظبط: قبل ٣٠ ثانية البيانات fresh فمفيش طلب. على الموبايل نفس الكلام بيحصل لما [[AppState]] يرجع [[active]] (من الـ docs).

---

## ٦. الحل (solCode): NetInfo

~~~ts
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

onlineManager.setEventListener((setOnline) =>
  NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  }),
);
~~~

من جوه لبرة:

1. [[NetInfo.addEventListener(fn)]]: كل ما حالة الشبكة تتغير، [[fn]] بتتنادى بـ [[state]]. [[state.isConnected]] true أو false (أو null لو لسه مش عارف، عشان كده [[!!]]). وبترجّع دالة unsubscribe.
2. [[(setOnline) => ...]]: TanStack بيدّينا دالة [[setOnline]]، وإحنا بنناديها بالحالة.
3. [[onlineManager.setEventListener]]: بيسجّل ده بدل الـ listener بتاعه، وبياخد الـ unsubscribe اللي رجع عشان يشيله لو احتاج.

السطر ده برّه أي component (في الـ lab ملف لوحده بيتعمله import في الـ root layout).

### جربناه بقطع النت في Chrome

~~~text الناتج (Chrome)
navigator.onLine  false
فتحنا مهمة 2:  BODY تحميل... التاب الحالي: info   طلبات []
رجّعنا النت:   BODY ذاكر RN التاب الحالي: info    طلبات ["GET /api/tasks","GET /api/tasks/2"]
~~~

وهو offline الـ query اتحطت في pause (مفيش طلب ومفيش error)، وأول ما النت رجع كمّلت لوحدها، وكمان قايمة المهام القديمة (stale) اتجابت تاني.

---

## الخلاصة

| الحاجة | على الويب | على الموبايل |
|---|---|---|
| المستخدم رجع | TanStack بيسمع [[visibilitychange]] لوحده | [[AppState]] → [[focusManager.setFocused]] |
| النت رجع | TanStack بيسمع [[online]] لوحده | NetInfo → [[onlineManager.setEventListener]] |

- [[QueryClient]] واحد برّه أي component.
- [[staleTime]] بيحدد إمتى البيانات تستاهل تتجاب تاني لما المستخدم يرجع.
- متنساش [[sub.remove()]] في الـ cleanup.`,
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
          teach: R`## الفكرة: غيّر الشاشة الأول، وابعت للسيرفر، ولو فشل ارجع

[[useToggleTask]] custom hook بيرجّع mutation بتقلب مهمة (خلصت ولا لأ). بدل ما يستنى السيرفر، بيعدّل الـ cache فورًا (optimistic update)، ولو الطلب فشل بيرجّع النسخة القديمة، وفي الآخر بيجيب القايمة من السيرفر عشان يتأكد.

جربناه في الـ lab (TanStack Query 5.104) على الويب في Chrome headless، مع API وهمي بيتأخر ٨٠٠ ميلي ثانية في الـ PATCH عشان نشوف الفرق بعينينا.

---

## ١. الـ imports والنوع

~~~ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

type Task = { id: number; title: string; done: boolean };
~~~

- [[useMutation]]: للعمليات اللي بتغيّر حاجة على السيرفر (POST و PATCH و DELETE).
- [[useQueryClient]]: بيرجّع نفس الـ [[QueryClient]] اللي في الـ provider، عشان نقرا ونعدّل الـ cache.

---

## ٢. [[mutationFn]]: الطلب نفسه

~~~ts
mutationFn: (t: Task) => api<Task>($__bt/api/tasks/$__{t.id}$__bt, { method: 'PATCH', body: JSON.stringify({ done: !t.done }) }),
~~~

- بتاخد المهمة [[t]] (اللي هنبعتها في [[mutate(task)]]).
- [[method: 'PATCH']]: تعديل جزء من الحاجة.
- [[body: JSON.stringify({ done: !t.done })]]: [[!t.done]] عكس الحالة الحالية، و [[JSON.stringify]] بيحوّل الـ object لنص عشان يتبعت.

---

## ٣. [[onMutate]]: قبل الطلب

~~~ts
onMutate: async (t) => {
  await qc.cancelQueries({ queryKey: ['tasks'] });
  const previous = qc.getQueryData<Task[]>(['tasks']);
  qc.setQueryData<Task[]>(['tasks'], (old) => old?.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)));
  return { previous };
},
~~~

| السطر | بيعمل إيه | ليه |
|---|---|---|
| [[cancelQueries]] | يلغي أي جلب شغال للقايمة | لو رد قديم وصل بعد تعديلنا هيمسحه |
| [[getQueryData]] | ياخد نسخة من القايمة الحالية | عشان نرجعلها لو فشل |
| [[setQueryData]] | يعدّل الـ cache فورًا | الشاشة تتغير من غير انتظار |
| [[return { previous }]] | اللي بيترجع اسمه context | بيوصل لـ [[onError]] و [[onSettled]] |

### الـ [[map]] من جوه

- [[old?.map(...)]]: [[old]] هي القايمة الحالية، و [[?.]] عشان لو مفيش قايمة في الـ cache متقعش.
- [[x.id === t.id ? ... : x]]: لكل مهمة: لو هي اللي بنقلبها اعمل نسخة جديدة، غير كده سيبها زي ما هي.
- [[{ ...x, done: !x.done }]]: [[...x]] (spread) بينسخ كل خانات المهمة في object جديد، وبعدين [[done]] بتتكتب فوقها بالعكس.

ليه نسخة جديدة ومش [[x.done = true]]؟ React و TanStack بيعرفوا إن حاجة اتغيرت لما الـ reference يتغير. لو عدّلت نفس الـ object، مفيش حد هيعرف.

---

## ٤. [[onError]] و [[onSettled]]

~~~ts
onError: (_err, _t, ctx) => qc.setQueryData(['tasks'], ctx?.previous),
onSettled: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
~~~

- [[onError]] بتاخد ٣ حاجات: الـ error، والمتغير اللي اتبعت، والـ context. والـ [[_]] في أول الاسم عُرف بين المبرمجين معناه «مش هستخدمه». و [[ctx?.previous]] هي النسخة اللي حفظناها، فبنرجّعها.
- [[onSettled]]: بيتنادى في الآخر سواء نجح أو فشل. [[invalidateQueries]] بيعلّم [[['tasks']]] إنها قديمة، فبتتجاب تاني من السيرفر. وبيطابق كمان أي key بيبدأ بـ [[['tasks']]] زي [[['tasks', '1']]].

---

## ٥. اللي حصل في Chrome

### نجاح

~~~text الناتج (Chrome)
بعد الضغطة بـ 150ms:  الشاشة: done   (السيرفر لسه مردّش)
بعد ما خلص:          الطلبات ["PATCH /api/tasks/1", "GET /api/tasks"]
~~~

العلامة اتقلبت فورًا، والـ GET اللي بعد الـ PATCH هو [[invalidateQueries]] بتاع [[onSettled]].

### فشل (السيرفر بيرجّع 500 بعد 800ms)

~~~text الناتج (Chrome، حالة المهمة 1 بعد الضغطة)
100ms   done
400ms   done
700ms   done
1000ms  todo
1500ms  todo
الطلبات ["PATCH /api/tasks/1", "GET /api/tasks"]
~~~

العلامة اتقلبت، وفضلت كده لحد ما الـ 500 وصل، وبعدين رجعت ([[onError]])، وبعدين القايمة اتجابت تاني. ومفيش retry للـ PATCH: الـ mutations افتراضيًا [[retry: 0]].

---

## ٦. الحل (solCode)

~~~ts
onError: (_err, _t, ctx) => {
  qc.setQueryData(['tasks'], ctx?.previous);
  Alert.alert('مقدرناش نحفظ', 'اتأكد من النت وجرّب تاني');
},
// في الشاشة:
const toggle = useToggleTask();
// <TaskRow task={item} onPress={() => toggle.mutate(item)} />
~~~

- [[onError]] بقت بـ [[{ }]] عشان فيها سطرين.
- [[Alert.alert(title, message)]]: dialog بتاع النظام على iOS و Android. على الويب في الـ lab **مظهرش أي dialog** (Chrome مسجّلش أي [[dialog]] event)، لأن [[Alert.alert]] في react-native-web 0.21 دالة فاضية، فلو التطبيق هيشتغل ويب كمان، اعرض الرسالة بـ component بتاعك.
- [[toggle.mutate(item)]]: بيبدأ الـ mutation بالمهمة، وده اللي بيوصل لـ [[mutationFn]] و [[onMutate]] كـ [[t]].

---

## الخلاصة

| المرحلة | الدالة | فيها إيه |
|---|---|---|
| قبل الطلب | [[onMutate]] | cancel، احفظ القديم، عدّل الـ cache، رجّع [[{ previous }]] |
| الطلب | [[mutationFn]] | PATCH |
| فشل | [[onError]] | رجّع [[ctx.previous]] وقول للمستخدم |
| في الآخر | [[onSettled]] | [[invalidateQueries]] |

- الـ optimistic للحاجات الصغيرة (toggle و like)، مش للدفع.
- التعديل دايمًا نسخة جديدة ([[...x]])، مش تعديل في نفس الـ object.`,
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
          teach: R`## الفكرة: القايمة بتتجاب صفحة صفحة، والسحب بيعيدها

[[Feed]] component فيه [[useInfiniteQuery]] (بيجيب صفحات ويحفظها كلها) و [[FlatList]] (بيطلب الصفحة الجاية لما المستخدم يقرّب من الآخر، وفيه [[RefreshControl]] للسحب لتحت). جربناه في الـ lab على الويب في Chrome headless مع API وهمي فيه ٥٠ بوست، والاختبار اللي في الحل بـ Jest.

---

## ١. نوع الصفحة

~~~ts
type Page = { items: { id: number; title: string }[]; nextCursor: number | null };
~~~

كل رد من السيرفر فيه [[items]] (array من البوستات) و [[nextCursor]]: علامة «كمّل من هنا» للصفحة الجاية، أو [[null]] لو خلصنا. [[number | null]] معناها رقم أو null.

---

## ٢. [[useInfiniteQuery]]

~~~ts
const q = useInfiniteQuery({
  queryKey: ['feed'],
  queryFn: ({ pageParam }) => api<Page>($__bt/api/posts?cursor=$__{pageParam}&limit=20$__bt),
  initialPageParam: 0,
  getNextPageParam: (last) => last.nextCursor,
});
~~~

- [[queryFn]] بتستلم [[pageParam]]: الـ cursor بتاع الصفحة دي، وبيتحط في الـ URL. [[limit=20]]: ٢٠ عنصر في الصفحة.
- [[initialPageParam: 0]]: أول صفحة بتبدأ من [[0]].
- [[getNextPageParam: (last) => last.nextCursor]]: بعد كل صفحة، TanStack بيسأل «الصفحة الجاية بأنهي cursor؟». [[last]] هي آخر صفحة وصلت. لو رجّعنا [[null]]، يبقى [[q.hasNextPage]] بـ false.

### الـ cursor ماشي إزاي مع الـ API الوهمي

~~~text الطلبات (Chrome)
GET /api/posts?cursor=0&limit=20    → بوست 1..20   nextCursor 20
GET /api/posts?cursor=20&limit=20   → بوست 21..40  nextCursor 40
GET /api/posts?cursor=40&limit=20   → بوست 41..50  nextCursor null
~~~

---

## ٣. نفرد الصفحات

~~~ts
const items = q.data?.pages.flatMap((p) => p.items) ?? [];
~~~

[[q.data.pages]] array من الصفحات: [[[صفحة1, صفحة2]]]، وكل صفحة جواها [[items]]. [[flatMap]] بياخد [[items]] من كل صفحة ويحطهم ورا بعض في array واحد. و [[?? []]]: لو لسه مفيش data، array فاضي.

---

## ٤. الـ [[FlatList]]: الخصائص

| الخاصية | بتعمل إيه |
|---|---|
| [[testID="feed"]] | اسم للاختبار يلاقيه بيه |
| [[data={items}]] | العناصر |
| [[keyExtractor]] | مفتاح فريد لكل عنصر، string ([[String(p.id)]]) |
| [[renderItem]] | بيرسم عنصر واحد. بيستلم [[{ item }]] |
| [[onEndReached]] | بتتنادى لما نقرّب من الآخر |
| [[onEndReachedThreshold={0.5}]] | «قرّبنا» = فاضل نص طول الشاشة |
| [[ListFooterComponent]] | حاجة تحت آخر عنصر: spinner وقت تحميل الجاية |
| [[refreshControl]] | السحب لتحت |

### [[onEndReached]]

~~~ts
onEndReached={() => { if (q.hasNextPage && !q.isFetchingNextPage) q.fetchNextPage(); }}
~~~

هات الجاية بشرطين: فيه صفحة جاية، ومفيش تحميل شغال دلوقتي. الشرط التاني مهم لأن [[onEndReached]] ممكن يتنادى كذا مرة ورا بعض.

### [[ActivityIndicator]]

~~~ts
ListFooterComponent={q.isFetchingNextPage ? <ActivityIndicator /> : null}
~~~

[[ActivityIndicator]] الدايرة اللي بتلف. بتظهر تحت بس وقت تحميل الصفحة الجاية.

### [[RefreshControl]]

~~~ts
refreshControl={<RefreshControl refreshing={q.isRefetching && !q.isFetchingNextPage} onRefresh={q.refetch} />}
~~~

- [[onRefresh={q.refetch}]]: لما المستخدم يسحب، أعد تحميل كل الصفحات اللي اتجابت.
- [[refreshing]]: لازم انت تقوله الـ spinner فوق ظاهر ولا لأ. [[isRefetching]] true وقت إعادة التحميل، بس كمان ممكن تبقى true وقت جلب الصفحة الجاية، فبنشيل الحالة دي بـ [[!q.isFetchingNextPage]]، عشان الـ spinner اللي فوق ميظهرش وانت بتحمّل تحت.

> على الويب مفيش «سحب لتحت»: [[RefreshControl]] في react-native-web 0.21 بيرسم [[View]] عادي وبيرمي [[onRefresh]] (شفناها في الكود بتاعه). فالسحب للتحديث جربه على موبايل، وسلوكه هناك من الـ docs.

---

## ٥. اللي حصل في Chrome (شاشة ٤٠٠×٨٠٠)

~~~text الناتج (Chrome)
فتحنا /feed:     الطلبات ["cursor=0", "cursor=20"]
scroll لتحت:    الطلبات ["cursor=40"]
آخر عنصر ظاهر:  بوست 50
~~~

لاحظ إن الصفحة التانية اتطلبت من غير scroll: ٢٠ عنصر مكانوش مالين الشاشة + نصها، فـ [[onEndReached]] اتنادى على طول. وبعد [[cursor=40]] السيرفر رجّع [[nextCursor: null]]، فمفيش ولا طلب تاني مهما نزلنا.

---

## ٦. الحل (solCode): الاختبار

~~~ts
jest.mock('@/lib/api', () => ({ api: jest.fn() }));
const mockedApi = api as jest.MockedFunction<typeof api>;
~~~

- [[jest.mock]]: أي حد يعمل import لـ [[@/lib/api]] في الاختبار ده هياخد بداله object فيه [[api]] وهمية ([[jest.fn()]]).
- [[as jest.MockedFunction<typeof api>]]: TypeScript بس، عشان يعرف إن [[api]] دلوقتي mock وفيها [[mockResolvedValueOnce]].

~~~ts
mockedApi
  .mockResolvedValueOnce({ items: [{ id: 1, title: 'بوست 1' }], nextCursor: 1 })
  .mockResolvedValueOnce({ items: [{ id: 2, title: 'بوست 2' }], nextCursor: null });
~~~

أول نداء يرجّع صفحة فيها بوست 1 و cursor 1، والتاني صفحة فيها بوست 2 و null. [[mockResolvedValueOnce]] = «المرة دي بس رجّع promise بالقيمة دي».

~~~ts
const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
await render(<QueryClientProvider client={client}><Feed /></QueryClientProvider>);
~~~

client جديد لكل اختبار (cache نضيف)، و [[retry: false]] عشان أي فشل يبان على طول. و [[render]] في RNTL 14 بيتعمل له [[await]].

~~~ts
expect(await screen.findByText('بوست 1')).toBeOnTheScreen();
await fireEvent(screen.getByTestId('feed'), 'endReached');
expect(await screen.findByText('بوست 2')).toBeOnTheScreen();
expect(mockedApi).toHaveBeenLastCalledWith('/api/posts?cursor=1&limit=20');
~~~

- [[fireEvent(..., 'endReached')]]: بينادي [[onEndReached]] بتاع الـ FlatList كأن المستخدم وصل للآخر (مفيش scroll حقيقي في Jest).
- [[toHaveBeenLastCalledWith]]: آخر نداء لـ [[api]] كان بـ cursor 1، يعني [[getNextPageParam]] أخد [[nextCursor]] من الصفحة الأولى.

~~~text الناتج (jest)
PASS src/__tests__/feed.test.tsx
  √ loads the next page on end reached (1154 ms)
~~~

---

## الخلاصة

- [[useInfiniteQuery]] = [[initialPageParam]] + [[getNextPageParam]] + [[fetchNextPage()]]، والصفحات في [[data.pages]].
- [[getNextPageParam]] يرجّع [[null]] = خلصنا.
- [[onEndReached]] دايمًا بشرط [[hasNextPage && !isFetchingNextPage]].
- [[refreshing={isRefetching && !isFetchingNextPage}]] مش [[isFetching]].`,
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
          teach: R`## الفكرة: Controller هو السلك بين الفورم والـ TextInput

في RN مفيش DOM ولا [[<input>]]، فـ [[register]] بتاع الويب ملوش حاجة يمسكها. بداله [[<Controller>]]: بيسجّل الخانة في الفورم ويدّيك [[field]] فيه القيمة ودالة التغيير، وانت بتوصّلهم بالـ [[TextInput]] بإيدك. والقواعد في schema بـ Zod.

جربنا الفورم ده في الـ lab (react-hook-form 7.89، Zod 4.6، @hookform/resolvers 5.9) على الويب في Chrome headless، والاختبارات اللي في الحل بـ Jest و RNTL 14.

---

## ١. الـ imports

~~~ts
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, TextInput, View } from 'react-native';
import { z } from 'zod';
~~~

- [[zodResolver]]: «مترجم» بيخلي react-hook-form يستخدم schema بتاعة Zod في الـ validation.
- [[useForm]]: الفورم نفسه. و [[Controller]]: خانة متحكَّم فيها.
- [[z]]: كل دوال Zod بتبدأ منه.

---

## ٢. الـ schema والنوع

~~~ts
const schema = z.object({
  email: z.email('إيميل مش صحيح'),
  password: z.string().min(8, 'الباسورد ٨ حروف على الأقل'),
});
type Form = z.infer<typeof schema>;
~~~

- [[z.object({...})]]: object فيه خانتين بقواعدهم.
- [[z.email('...')]]: لازم إيميل صحيح، والنص هو رسالة الخطأ. (ده شكل Zod 4. [[z.string().email()]] القديم لسه شغال بس deprecated.)
- [[z.string().min(8, '...')]]: نص طوله ٨ على الأقل.
- [[z.infer<typeof schema>]]: [[typeof schema]] نوع المتغير، و [[z.infer]] بيطلّع منه نوع البيانات: [[{ email: string; password: string }]]. فالنوع والقواعد مكتوبين مرة واحدة.

---

## ٣. [[useForm]]

~~~ts
export function LoginForm({ onSubmit }: { onSubmit: (v: Form) => Promise<void> }) {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });
~~~

- الـ component بياخد [[onSubmit]] من برّه: الشاشة الحقيقية تبعت دالة بتكلم السيرفر، والاختبار يبعت [[jest.fn()]].
- من اللي [[useForm]] بيرجّعه بناخد:
  - [[control]]: «الفورم» نفسه، بنديه لكل [[Controller]].
  - [[handleSubmit]]: بيلف [[onSubmit]] بالـ validation.
  - [[formState.errors]]: الأخطاء لكل خانة. و [[formState.isSubmitting]]: true وقت الإرسال.
- [[resolver: zodResolver(schema)]]: القواعد من Zod.
- [[defaultValues]]: قيم أولية، عشان الـ TextInput يبدأ بـ [['']] (نص فاضي) مش [[undefined]].

---

## ٤. الـ Controller

~~~ts
<Controller control={control} name="email" render={({ field }) => (
  <TextInput accessibilityLabel="الإيميل" value={field.value} onChangeText={field.onChange} onBlur={field.onBlur}
    keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
)} />
~~~

- [[name="email"]]: اسم الخانة، ولازم يبقى من خانات الـ schema (TypeScript بيتأكد).
- [[render]]: دالة بترسم الخانة، وبتستلم [[field]].
- التوصيل:

| من [[field]] | لـ [[TextInput]] | ليه |
|---|---|---|
| [[field.value]] | [[value]] | الخانة بتعرض قيمة الفورم |
| [[field.onChange]] | [[onChangeText]] | [[onChangeText]] بيبعت النص نفسه، و [[field.onChange]] بيقبل القيمة مباشرة |
| [[field.onBlur]] | [[onBlur]] | الفورم يعرف إن المستخدم ساب الخانة (touched) |

- [[accessibilityLabel]]: اسم الخانة لقارئ الشاشة، والاختبار بيلاقي الخانة بيه.
- [[keyboardType="email-address"]] كيبورد فيه [[@]]، و [[autoCapitalize="none"]] متكبّرش أول حرف، و [[autoComplete="email"]] الجهاز يقترح الإيميل.

على الويب، react-native-web حوّل ده لـ:

~~~text الناتج (Chrome، outerHTML)
<input autocapitalize="none" autocomplete="email" aria-label="الإيميل" type="email" value="">
<input autocapitalize="sentences" autocomplete="on" aria-label="الباسورد" type="password" value="">
~~~

[[secureTextEntry]] في خانة الباسورد بقى [[type="password"]].

---

## ٥. الأخطاء والزرار

~~~ts
{errors.email ? <Text>{errors.email.message}</Text> : null}
...
<Pressable accessibilityRole="button" disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
  <Text>{isSubmitting ? 'جاري الدخول...' : 'دخول'}</Text>
</Pressable>
~~~

- [[errors.email.message]]: الرسالة اللي كتبناها في الـ schema. و [[? :]] بترجّع [[null]] لو مفيش خطأ.
- [[handleSubmit(onSubmit)]]: **بينادي** [[handleSubmit]] دلوقتي ويرجّع دالة جديدة، ودي اللي بتتنادى مع الضغطة: تعمل validation، ولو كله تمام تنادي [[onSubmit]].
- [[disabled={isSubmitting}]]: الزرار مقفول لحد ما الـ promise بتاع [[onSubmit]] يخلص، فمفيش إرسال مرتين.

---

## ٦. اللي حصل في Chrome

~~~text الناتج (Chrome + API وهمي)
إيميل "not-an-email" وضغطة دخول:
  BODY  إيميل مش صحيح الباسورد ٨ حروف على الأقل دخول
  طلبات []
إيميل وباسورد صح:
  طلبات ["POST /api/login"]   وبعدها اتحوّلنا لـ /
~~~

---

## ٧. الحل (solCode): الاختبارين

~~~ts
const onSubmit = jest.fn();
const user = userEvent.setup();
await render(<LoginForm onSubmit={onSubmit} />);
await user.type(screen.getByLabelText('الإيميل'), 'not-an-email');
await user.press(screen.getByRole('button', { name: 'دخول' }));
~~~

- [[jest.fn()]]: دالة وهمية بتسجّل كل نداء ليها.
- [[userEvent.setup()]]: محاكاة مستخدم حقيقي (بيكتب حرف حرف ويضغط)، أدق من [[fireEvent]].
- [[getByLabelText('الإيميل')]]: بيلاقي الخانة من [[accessibilityLabel]]. و [[getByRole('button', { name: 'دخول' })]]: من [[accessibilityRole]] والنص اللي جواه.

بعدها: [[findByText('إيميل مش صحيح')]] بيستنى الرسالة، و [[not.toHaveBeenCalled()]]: [[onSubmit]] متناداش.

### المفاجأة

جربنا [[toHaveBeenCalledWith({ email, password })]] بقيم صح، والاختبار وقع:

~~~text الناتج (jest)
- Expected
+ Received
  {"email": "sara@example.com", "password": "secret123"},
+ {"currentTarget": ..., "dispatchConfig": {"registrationName": "onResponderRelease"}, "nativeEvent": {...}, ...}
~~~

[[handleSubmit]] بينادي [[onSubmit(values, event)]]: argument تاني هو الـ press event. و [[toHaveBeenCalledWith]] بيقارن **كل** الـ arguments. عشان كده الحل بيقارن الأول بس:

~~~ts
expect(onSubmit).toHaveBeenCalledTimes(1);
expect(onSubmit.mock.calls[0][0]).toEqual({ email: 'sara@example.com', password: 'secret123' });
~~~

[[mock.calls]] array فيه كل النداءات، و [[[0][0]]] = أول argument في أول نداء.

~~~text الناتج (jest)
√ shows validation errors and does not submit
√ submits valid values
~~~

---

## الخلاصة

- RN: [[Controller]] + [[field.value]] و [[field.onChange]] على [[onChangeText]]، مش [[register]].
- [[defaultValues]] دايمًا، عشان الخانات تبدأ controlled.
- [[zodResolver(schema)]] و [[z.infer]]: قواعد ونوع من مكان واحد.
- [[handleSubmit(onSubmit)]] بيبعت [[(values, event)]].`,
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
          teach: R`## الفكرة: ٣ حاجات بتخلي الفورم يتعامل مع الكيبورد

1. [[KeyboardAvoidingView]]: يزق المحتوى لفوق لما الكيبورد يفتح، عشان الخانة متتغطاش.
2. [[ScrollView]] جواه: لو الخانات أطول من الشاشة، تقدر توصل لأي واحدة.
3. [[ref]] لكل خانة و [[onSubmitEditing]]: زرار «Next» في الكيبورد ينقلك للخانة اللي بعدها.

**مهم:** سلوك الكيبورد نفسه (الزق لفوق، و resize على Android) مقدرناش نجربه، لأن مفيش موبايل ولا emulator هنا، فده من الـ docs. اللي جربناه في الـ lab على الويب في Chrome headless: التنقل بين الخانات بـ Enter، وشكل الخانات في الـ HTML.

---

## ١. الـ imports والـ refs

~~~ts
import { useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';

export default function CheckoutForm() {
  const phoneRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
~~~

- [[useRef]]: «علبة» بتفضل نفسها طول عمر الـ component، وفيها [[current]]. لما تحط [[ref={phoneRef}]] على [[TextInput]]، React بيحط الخانة نفسها في [[phoneRef.current]]، فتقدر تناديها: [[phoneRef.current.focus()]].
- [[<TextInput>]] بين [[< >]]: نوع اللي هيبقى جوه، و [[null]] القيمة الأولى (قبل ما الخانة تترسم).
- مفيش ref للخانة الأولى، لأن مفيش حد بينقل لها.

---

## ٢. [[KeyboardAvoidingView]]

~~~ts
<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
~~~

- [[flex: 1]]: ياخد الشاشة كلها. من غيره ارتفاعه بقد المحتوى، ومفيش حاجة يزقها.
- [[behavior]]: هيعمل إيه لما الكيبورد يفتح:

| القيمة | بيعمل إيه (من الـ docs) |
|---|---|
| [['padding']] | يضيف padding تحت بقد ارتفاع الكيبورد (الأنسب لـ iOS) |
| [['height']] | يصغّر ارتفاع الـ view |
| [['position']] | يحرك الـ view كلها لفوق |
| [[undefined]] | ميعملش حاجة |

- [[Platform.OS === 'ios' ? 'padding' : undefined]]: على iOS [[padding]]، وعلى Android والويب ولا حاجة، لأن Android الحديث بيصغّر الشاشة لوحده لما الكيبورد يفتح.

---

## ٣. [[ScrollView]]

~~~ts
<ScrollView contentContainerStyle={{ padding: 16, gap: 12 }} keyboardShouldPersistTaps="handled">
~~~

- [[contentContainerStyle]]: ستايل المحتوى جوه الـ scroll (مش الـ scroll نفسه). [[gap: 12]] مسافة ١٢ بين الخانات.
- [[keyboardShouldPersistTaps="handled"]]: لو الكيبورد مفتوح وضغطت زرار، الضغطة توصل للزرار. الافتراضي ([['never']]) إن أول ضغطة بتقفل الكيبورد بس، فالمستخدم يضغط مرتين.

---

## ٤. الخانات

~~~ts
<TextInput placeholder="الاسم" returnKeyType="next" submitBehavior="submit" onSubmitEditing={() => phoneRef.current?.focus()} />
<TextInput ref={phoneRef} placeholder="الموبايل" keyboardType="phone-pad" returnKeyType="next" submitBehavior="submit" onSubmitEditing={() => addressRef.current?.focus()} />
<TextInput ref={addressRef} placeholder="العنوان" multiline textAlignVertical="top" style={{ minHeight: 100 }} />
~~~

| الخاصية | معناها |
|---|---|
| [[placeholder]] | النص الرمادي لما الخانة فاضية |
| [[returnKeyType="next"]] | زرار Enter في الكيبورد مكتوب عليه Next |
| [[submitBehavior="submit"]] | Enter يبعت [[onSubmitEditing]] من غير ما يقفل الكيبورد |
| [[onSubmitEditing]] | بتتنادى لما يدوس Enter |
| [[phoneRef.current?.focus()]] | روح للخانة اللي بعدها. [[?.]] لو [[current]] لسه null متقعش |
| [[keyboardType="phone-pad"]] | كيبورد أرقام التليفون |
| [[multiline]] | كذا سطر (مفيش Next هنا، Enter بيعمل سطر جديد) |
| [[textAlignVertical="top"]] | النص يبدأ من فوق (Android بيبدأ من النص من غيره) |
| [[minHeight: 100]] | ارتفاع ١٠٠ على الأقل |

---

## ٥. اللي حصل في Chrome

كتبنا في «الاسم» ودوسنا Enter، وبعدين Enter تاني:

~~~text الناتج (Chrome، document.activeElement)
بعد Enter في الاسم:     الموبايل
بعد Enter في الموبايل:  TEXTAREA العنوان
~~~

يعني [[onSubmitEditing]] و [[focus()]] شغالين. و [[multiline]] اتحولت [[<textarea>]]. وخانة الموبايل طلعت كده:

~~~text الناتج (Chrome، outerHTML)
<input placeholder="الموبايل" enterkeyhint="next" type="tel" ...>
~~~

[[returnKeyType="next"]] بقى [[enterkeyhint="next"]] (الموبايل بيكتب Next على الزرار حتى في المتصفح)، و [[phone-pad]] بقى [[type="tel"]].

---

## ٦. التجربة على الموبايل (من الـ docs)

| من غير [[KeyboardAvoidingView]] | معاه ([[padding]] على iOS) |
|---|---|
| الخانات التحتانية تحت الكيبورد | المحتوى يتزق، والـ ScrollView يوصل لآخر خانة |

ولو فيه header فوق الشاشة (Stack)، ممكن تحتاج [[keyboardVerticalOffset]] بارتفاعه. ولو Android لسه بيغطي: جرّب [[behavior="height"]] أو مكتبة [[react-native-keyboard-controller]].

---

## الخلاصة

- [[KeyboardAvoidingView]] بـ [[flex: 1]] و [[padding]] على iOS.
- [[ScrollView]] مع [[keyboardShouldPersistTaps="handled"]].
- [[useRef]] + [[returnKeyType="next"]] + [[onSubmitEditing]] = التنقل بين الخانات.
- جرّب على iOS و Android حقيقي، الويب مش بيوريك مشكلة الكيبورد.`,
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
          teach: R`## الفكرة: دالتين بيحفظوا ويقروا الإعدادات كـ JSON

[[loadPrefs]] بتقرا الإعدادات وتكمّل الناقص من الافتراضي، و [[savePrefs]] بتعدّل جزء وتحفظ الكل. التخزين نفسه [[AsyncStorage]]: key و value، والاتنين strings، وكل حاجة فيه async.

جربنا الملف في الـ lab (async-storage 2.2.0، النسخة اللي [[npx expo install]] اختارها لـ SDK 57) بطريقتين: على الويب في Chrome headless، وبـ Jest بالـ mock الرسمي.

---

## ١. النوع والثوابت

~~~ts
import AsyncStorage from '@react-native-async-storage/async-storage';

type Prefs = { theme: 'light' | 'dark' | 'system'; lang: 'ar' | 'en' };
const KEY = 'prefs:v1';
const DEFAULTS: Prefs = { theme: 'system', lang: 'ar' };
~~~

- [[Prefs]]: [[theme]] واحدة من ٣ قيم بس، و [[lang]] واحدة من اتنين (union types).
- [[KEY]]: اسم المفتاح في التخزين. [[:v1]] رقم نسخة: لو غيّرت شكل البيانات جامد بعدين، تستخدم [[prefs:v2]] والقديم يتجاهل.
- [[DEFAULTS]]: الإعدادات لو مفيش حاجة محفوظة. ونوعه [[Prefs]]، فـ TypeScript بيتأكد إنه كامل.

---

## ٢. [[loadPrefs]]

~~~ts
export async function loadPrefs(): Promise<Prefs> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return DEFAULTS;
  try { return { ...DEFAULTS, ...JSON.parse(raw) }; } catch { return DEFAULTS; }
}
~~~

1. [[async]] و [[Promise<Prefs>]]: الدالة بترجّع promise، واللي بيناديها لازم [[await]].
2. [[await AsyncStorage.getItem(KEY)]]: بيرجّع الـ string المحفوظ، أو [[null]] لو مفيش. من غير [[await]] هتاخد promise مش النص (جربناها في Jest: [[Object.prototype.toString]] عليها طلّع [[object Promise]] بين قوسين مربعين).
3. [[if (!raw) return DEFAULTS]]: أول مرة يفتح التطبيق.
4. [[JSON.parse(raw)]]: النص يرجع object.
5. [[{ ...DEFAULTS, ...JSON.parse(raw) }]]: object جديد، فيه الافتراضي الأول وبعدين المحفوظ **فوقه**. أي خانة محفوظة بتغلب، وأي خانة ناقصة بتيجي من الافتراضي.
6. [[try { } catch { }]]: لو النص بايظ و [[JSON.parse]] رمى error، ارجع للافتراضي بدل ما التطبيق يقع.

~~~text الناتج (jest، قيم حطيناها بإيدنا في التخزين)
'{bad json'           →  {"theme":"system","lang":"ar"}
'{"theme":"light"}'   →  {"theme":"light","lang":"ar"}
~~~

السطر التاني هو إجابة سؤال [[fontSize]] في التجربة: بيانات قديمة ناقصها خانة، والـ merge كمّلها.

---

## ٣. [[savePrefs]]

~~~ts
export async function savePrefs(p: Partial<Prefs>) {
  const next = { ...(await loadPrefs()), ...p };
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
~~~

- [[Partial<Prefs>]]: نفس [[Prefs]] بس كل الخانات اختيارية، فتقدر تبعت [[{ theme: 'dark' }]] لوحدها.
- [[{ ...(await loadPrefs()), ...p }]]: هات الحالي، وحط الجديد فوقه.
- [[JSON.stringify(next)]]: الـ object يبقى نص، لأن AsyncStorage بيخزّن strings بس.
- [[return next]]: عشان الشاشة تعرض الجديد من غير ما تقرا تاني.

---

## ٤. على الويب

في الـ lab شاشة الإعدادات بتعرض [[loadPrefs()]]، وفيها زرار بيعمل [[savePrefs({ theme: 'dark' })]]:

~~~text الناتج (Chrome)
أول فتح:          {"theme":"system","lang":"ar"}
بعد الزرار:       {"theme":"dark","lang":"ar"}
localStorage['prefs:v1'] = {"theme":"dark","lang":"ar"}
بعد reload:       {"theme":"dark","lang":"ar"}
~~~

على الويب AsyncStorage بيخزّن في [[localStorage]] بنفس المفتاح. على Android بيخزّن في SQLite جوه فولدر التطبيق، وعلى iOS في ملفات (من الـ docs). وفي كل الحالات **مش مشفّر**.

---

## ٥. الحل (solCode): الاختبار

~~~ts
// jest.setup.ts
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'));
~~~

- في Jest مفيش موبايل، فالـ native module مش موجود. [[jest.mock]] بيبدّل المكتبة بنسخة الـ mock اللي المكتبة نفسها بتديها، وبتخزن في الذاكرة.
- [[jest.setup.ts]]: ملف بيتشغل قبل كل الاختبارات (متسجّل في [[package.json]] تحت [[jest.setupFiles]])، فالـ mock موجود في كل ملف.

~~~ts
test('merges saved prefs with defaults', async () => {
  expect(await loadPrefs()).toEqual({ theme: 'system', lang: 'ar' });
  await savePrefs({ theme: 'dark' });
  expect(await loadPrefs()).toEqual({ theme: 'dark', lang: 'ar' });
});
~~~

[[toEqual]] بيقارن محتوى الـ objects (مش إنهم نفس الـ object). أول قراية: الافتراضي. وبعد الحفظ: [[dark]] و [[lang]] لسه [[ar]].

~~~text الناتج (jest)
PASS src/__tests__/prefs.test.ts
~~~

---

## الخلاصة

| الحاجة | ازاي |
|---|---|
| حفظ object | [[setItem(KEY, JSON.stringify(obj))]] |
| قراية | [[JSON.parse(await getItem(KEY))]] جوه [[try]] |
| حقول جديدة | [[{ ...DEFAULTS, ...saved }]] |
| شكل جديد خالص | مفتاح جديد ([[v2]]) |

- كل حاجة [[await]].
- مش مشفّر: لا توكنات ولا باسوردات (دي في SecureStore).`,
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
          teach: R`## الفكرة: الـ session في context، والتوكنات في SecureStore

الملف ده هو [[@/lib/session]] اللي درس [[Stack.Protected]] بيستخدمه. فيه ٣ حاجات: context بيشيل [[token]] و [[isLoading]] و [[signIn]] و [[signOut]]، و provider بيقرا التوكن من التخزين المشفّر أول ما التطبيق يفتح، و hook [[useSession]] لأي شاشة.

اللي جربناه: الاختبار اللي في الحل بـ Jest (RNTL 14، SecureStore متعمله mock)، والتدفق كله على الويب في Chrome headless. التشفير نفسه (Keychain و Keystore) مش موجود غير على موبايل، فده من الـ docs.

---

## ١. الـ imports

~~~ts
import * as SecureStore from 'expo-secure-store';
import { createContext, use, useEffect, useState, type PropsWithChildren } from 'react';
~~~

- [[SecureStore]]: ٣ دوال بنستخدمها: [[getItemAsync]] و [[setItemAsync]] و [[deleteItemAsync]]. كلهم promises، والقيم strings.
- [[createContext]]: يعمل «قناة» تبعت فيها قيمة لكل الـ components اللي تحت من غير props.
- [[use]]: hook جديد في React 19 بيقرا context (أو promise). هنا بديل [[useContext]].

---

## ٢. النوع والـ context

~~~ts
type Session = { token: string | null; isLoading: boolean; signIn: (a: string, r: string) => Promise<void>; signOut: () => Promise<void> };
const SessionContext = createContext<Session | null>(null);
~~~

- [[token: string | null]]: التوكن أو [[null]] لو مش مسجّل.
- [[signIn: (a: string, r: string) => Promise<void>]]: دالة بتاخد access و refresh وبترجّع promise مفيهوش قيمة.
- [[createContext<Session | null>(null)]]: القيمة الافتراضية [[null]]، ودي اللي هتوصل لو حد استخدم الـ context برّه الـ provider.

---

## ٣. الـ provider: الحالة والقراية الأولى

~~~ts
export function SessionProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    SecureStore.getItemAsync('accessToken').then((t) => { setToken(t); setLoading(false); });
  }, []);
~~~

- [[token]] في الذاكرة يبدأ [[null]]، و [[isLoading]] يبدأ [[true]] (لسه مقريناش).
- [[useEffect(..., [])]]: مرة واحدة أول ما الـ provider يترسم.
- [[getItemAsync('accessToken')]]: يقرا القيمة اللي اسمها [[accessToken]]، أو [[null]] لو مفيش. [[.then((t) => ...)]]: لما الـ promise يخلص، حط القيمة في الـ state وقول إن القراية خلصت.

---

## ٤. [[signIn]] و [[signOut]]

~~~ts
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
~~~

- الترتيب مقصود: **احفظ الأول، وبعدين** غيّر الـ state. لو التطبيق اتقفل في النص، مش هيبقى فاكر إنه مسجّل والتوكن مش محفوظ.
- [[setToken(access)]]: [[token]] اتغير، فالـ [[guard]] في [[Stack.Protected]] اتغير، فالتطبيق بيروح [[(app)]] لوحده.
- [[signOut]] بيمسح **الاتنين**: الـ refresh token عمره أطول وبيجيب access جديد، فلو فضل كأنك مخرجتش.

---

## ٥. الـ JSX والـ hook

~~~ts
return <SessionContext value={{ token, isLoading, signIn, signOut }}>{children}</SessionContext>;
~~~

في React 19 الـ context نفسه بقى provider: [[<SessionContext value>]] بدل [[<SessionContext.Provider value>]] القديمة.

~~~ts
export function useSession() {
  const ctx = use(SessionContext);
  if (!ctx) throw new Error('useSession must be inside SessionProvider');
  return ctx;
}
~~~

[[use(SessionContext)]] بيرجّع الـ value من أقرب provider فوق. لو مفيش provider، بيرجّع الافتراضي [[null]]، فبنرمي error واضح بدل ما الشاشة تقع بعدين بـ «cannot read property token of null». وفايدة تانية: بعد الـ [[if]]، TypeScript عارف إن [[ctx]] نوعه [[Session]] مش [[null]].

---

## ٦. على الويب

~~~text الناتج (Chrome، expo-secure-store 57.0.4 الحقيقية)
TypeError: ExpoSecureStore.default.getValueWithKeyAsync is not a function
~~~

[[expo-secure-store]] ملوش نسخة ويب، فأول [[getItemAsync]] وقع. في الـ lab استخدمنا بديل بـ [[localStorage]] على الويب بس عشان نجرّب التدفق:

~~~text الناتج (Chrome، بالبديل)
بعد login:   ss:accessToken = acc-123   ss:refreshToken = ref-456
بعد «خروج»:  المفاتيح الباقية ["prefs:v1"]   (التوكنين اتمسحوا) و URL /sign-in
~~~

البديل ده **مش آمن** (localStorage أي JavaScript في الصفحة يقراه). لو التطبيق هيشتغل ويب، التوكن هناك مكانه cookie بـ [[httpOnly]].

---

## ٧. الحل (solCode): الاختبار

~~~ts
jest.mock('expo-secure-store', () => {
  const store = new Map<string, string>();
  return {
    getItemAsync: jest.fn(async (k: string) => store.get(k) ?? null),
    setItemAsync: jest.fn(async (k: string, v: string) => { store.set(k, v); }),
    deleteItemAsync: jest.fn(async (k: string) => { store.delete(k); }),
  };
});
~~~

- [[Map]]: object بيخزن key و value، فيه [[get]] و [[set]] و [[delete]]. هو «التخزين» في الذاكرة.
- كل دالة [[jest.fn(async ...)]]: دالة وهمية async بنفس اسم وشكل الحقيقية. [[store.get(k) ?? null]]: [[Map]] بترجّع [[undefined]] لو مش موجود، والحقيقية بترجّع [[null]]، فبنحوّلها.

~~~ts
const wrapper = ({ children }: PropsWithChildren) => <SessionProvider>{children}</SessionProvider>;

test('signIn stores tokens and signOut clears them', async () => {
  const { result } = await renderHook(() => useSession(), { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  await act(() => result.current.signIn('a1', 'r1'));
  expect(result.current.token).toBe('a1');
  await act(() => result.current.signOut());
  expect(result.current.token).toBeNull();
});
~~~

- [[renderHook]]: بيشغّل hook من غير شاشة. [[wrapper]]: بيلفه بالـ provider (من غيره [[useSession]] هيرمي الـ error).
- [[result.current]]: آخر قيمة رجّعها الـ hook.
- [[waitFor]]: يعيد الشرط لحد ما يعدّي، هنا لحد ما القراية الأولى تخلص.
- [[act]]: أي حاجة بتغيّر state تتعمل جواه، عشان React يخلّص التحديثات قبل ما نفحص.

~~~text الناتج (jest)
PASS src/__tests__/session.test.tsx
~~~

---

## الخلاصة

| العملية | الدالة |
|---|---|
| حفظ | [[setItemAsync(key, value)]] |
| قراية | [[getItemAsync(key)]] (null لو مفيش) |
| مسح | [[deleteItemAsync(key)]] |

- iOS: Keychain، و Android: تشفير بمفتاح في الـ Keystore (من الـ docs). الويب: مفيش.
- التوكنين في SecureStore، و [[signOut]] يمسحهم الاتنين.
- احفظ الأول وبعدين غيّر الـ state.`,
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

ملحوظة: الملف ده (والحل) اتجرّب في الـ lab على الويب بعد إعدادات metro للـ wasm والـ headers (مشروحة في «الشرح خطوة بخطوة»): الإضافة والقراية والبحث بـ [[?]] اشتغلوا، والـ SQL الملزوق وقع بـ syntax error. في Jest الـ native module مش موجود، فمحتاج mock. وبرضه اختبره على موبايل قبل ما تعتمد عليه.`,
            when: R`بيانات كتير، أو بحث وفلترة وترتيب، أو offline-first. لـ ١٠ إعدادات: AsyncStorage. ولو محتاج sync مع السيرفر بشكل كامل، فيه حلول جاهزة فوق SQLite (زي PowerSync أو ElectricSQL) بدل ما تكتب الـ sync بنفسك.`,
            mistakes: R`SQL بـ template string من input المستخدم: SQL injection حتى على الموبايل (وحتى لو مش خطر أمني كبير، علامة [[']] واحدة هتوقع الـ query). وتفتح الـ DB في كل شاشة بدل مرة. و [[ALTER TABLE]] من غير نظام migrations فالمستخدمين اللي عندهم نسخة قديمة يقعوا. وتنسى إن [[runSync]] بيجمّد الـ UI.`
          },
          teach: R`## الفكرة: ٣ دوال حوالين ملف SQLite

[[openDb]] بتفتح (أو تعمل) ملف القاعدة وتعمل الجدول، و [[addNote]] بتضيف صف، و [[listNotes]] بترجّع الصفوف. والحل بيضيف [[searchNotes]] بـ [[LIKE]]. نفس الـ SQL اللي في «تاب SQL و Prisma»، بس القاعدة جوه التطبيق.

جربنا الملف ده كله في الـ lab (expo-sqlite 57.0.4) على **الويب** في Chrome headless، بعد إعدادات صغيرة هنشرحها في الآخر. على الموبايل القاعدة ملف حقيقي في فولدر التطبيق (من الـ docs، مفيش جهاز هنا).

---

## ١. الـ import والنوع

~~~ts
import * as SQLite from 'expo-sqlite';

export type Note = { id: number; body: string; created_at: string };
~~~

- [[* as SQLite]]: كل اللي في المكتبة في object اسمه [[SQLite]]: [[SQLite.openDatabaseAsync]] و [[SQLite.SQLiteDatabase]] (النوع).
- [[Note]]: شكل الصف اللي راجع من الجدول. TypeScript بس.

---

## ٢. [[openDb]]

~~~ts
export async function openDb() {
  const db = await SQLite.openDatabaseAsync('notes.db');
  await db.execAsync($__bt
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
  $__bt);
  return db;
}
~~~

- [[openDatabaseAsync('notes.db')]]: يفتح الملف، ولو مش موجود يعمله. بيرجّع object [[db]] فيه كل الدوال.
- [[execAsync(sql)]]: ينفّذ أوامر SQL كتير ورا بعض (مفصولة بـ [[;]]) ومبيرجّعش صفوف. الـ SQL بين [[$__bt]] (template literal) عشان يبقى على كذا سطر.
- [[PRAGMA journal_mode = WAL]]: [[PRAGMA]] أوامر إعدادات خاصة بـ SQLite. WAL = Write-Ahead Logging: الكتابة بتروح ملف جنبه الأول، فالقراية والكتابة ميوقفوش بعض.
- الجدول:

| العمود | النوع | معناه |
|---|---|---|
| [[id]] | [[INTEGER PRIMARY KEY AUTOINCREMENT]] | رقم فريد، SQLite بيحطه لوحده ويزوّده |
| [[body]] | [[TEXT NOT NULL]] | نص، وممنوع يبقى فاضي (NULL) |
| [[created_at]] | [[TEXT DEFAULT CURRENT_TIMESTAMP]] | لو محدش حطه، وقت الإضافة |

- [[IF NOT EXISTS]]: لو الجدول موجود متعملش حاجة. فالدالة آمنة تتنادى كل مرة التطبيق يفتح.

---

## ٣. [[addNote]]

~~~ts
export async function addNote(db: SQLite.SQLiteDatabase, body: string) {
  const r = await db.runAsync('INSERT INTO notes (body) VALUES (?)', body);
  return r.lastInsertRowId;
}
~~~

- [[runAsync(sql, ...params)]]: للأوامر اللي بتغيّر (INSERT و UPDATE و DELETE).
- [[?]]: placeholder. القيمة [[body]] بتتبعت **لوحدها** بعد الـ SQL، و SQLite بيحطها كقيمة مش ككود. فلو فيها [[']] أو SQL، مش هتأثر.
- [[r.lastInsertRowId]]: الـ [[id]] اللي SQLite اداه للصف الجديد. و [[r]] فيه كمان [[changes]] (عدد الصفوف اللي اتغيرت).

---

## ٤. [[listNotes]]

~~~ts
export function listNotes(db: SQLite.SQLiteDatabase) {
  return db.getAllAsync<Note>('SELECT * FROM notes ORDER BY id DESC');
}
~~~

- [[getAllAsync]]: كل الصفوف كـ array من objects. ([[getFirstAsync]] أول صف بس أو null.)
- [[<Note>]]: النوع بس، مفيش فحص.
- [[ORDER BY id DESC]]: الأحدث الأول.
- مش [[async]] عشان بترجّع الـ promise على طول، واللي بيناديها يعمل [[await]].

---

## ٥. الحل (solCode): [[searchNotes]]

~~~ts
export function searchNotes(db: SQLite.SQLiteDatabase, q: string) {
  return db.getAllAsync<Note>(
    'SELECT * FROM notes WHERE body LIKE ? ORDER BY id DESC LIMIT 50',
    $__bt%$__{q}%$__bt,
  );
}
~~~

- [[LIKE ?]]: [[LIKE]] بحث بنمط. [[%]] معناها «أي حاجة، حتى لا شيء». فـ [[%it's%]] = أي body فيه [[it's]].
- الـ [[%]] جوه **القيمة** اللي بنبعتها ([[$__bt%$__{q}%$__bt]])، مش جوه الـ SQL. الـ SQL فيه [[?]] بس.
- [[LIMIT 50]]: ٥٠ صف أقصى.

---

## ٦. اللي حصل في Chrome

شاشة في الـ lab بتفتح القاعدة، وتضيف [[أول ملاحظة]] و [[it's a test]]، وتقرا، وتدوّر على [[it's]]، وبعدين تجرب نفس البحث بـ SQL مكتوب بإيدنا ([[LIKE '%it's%']]) زي اللي بيحصل لما تلزق القيمة في string:

~~~text الناتج (Chrome)
id1: 1   id2: 2   count: 2
first: {"id":2,"body":"it's a test","created_at":"2026-10-07 18:36:47"}
searchNotes(db, "it's"):  ["it's a test"]
الـ SQL الملزوق:          Error code 1: near "s": syntax error
~~~

- [[lastInsertRowId]] رجّع 1 و 2، والقايمة بالأحدث الأول.
- [[created_at]] اتملى لوحده بـ [[CURRENT_TIMESTAMP]] (بتوقيت UTC).
- [[searchNotes]] بالـ [[?]] لقى الملاحظة عادي.
- الـ SQL الملزوق وقع: علامة [[']] في [[it's]] قفلت الـ string بدري، فـ SQLite شاف [[s%']] كلام غريب. ولو حد كتب SQL كامل بدل كلمة البحث، كان هيتنفّذ (SQL injection).

---

## ٧. الويب محتاج إعدادات

أول تشغيل على الويب وقع في الـ bundling:

~~~text الناتج (expo start --web)
Unable to resolve module ./wa-sqlite/wa-sqlite.wasm
~~~

على الويب expo-sqlite بيستخدم SQLite مبني WebAssembly ([[.wasm]])، و Metro مش بيعرف الامتداد ده. الحل في [[metro.config.js]]:

~~~js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push('wasm');
config.server.enhanceMiddleware = (middleware) => (req, res, next) => {
  res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  middleware(req, res, next);
};
module.exports = config;
~~~

- [[assetExts.push('wasm')]]: اعتبر [[.wasm]] ملف asset.
- الـ headers التانيين بيخلوا المتصفح يسمح بـ [[SharedArrayBuffer]] اللي الـ worker بتاع SQLite محتاجه.

وكمان مع [[web.output: "static"]] (الافتراضي في القالب) السيرفر وقع بـ [[Worker chunk not found]]، فغيّرناها لـ [[single]] في الـ lab. على الموبايل مفيش أي حاجة من دي.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| أوامر كتير من غير نتايج | [[execAsync]] |
| INSERT و UPDATE و DELETE | [[runAsync(sql, ...params)]] → [[lastInsertRowId]] و [[changes]] |
| كل الصفوف | [[getAllAsync<T>]] |
| صف واحد | [[getFirstAsync<T>]] |

- القيم دايمًا بـ [[?]]، و [[%]] جوه القيمة.
- [[CREATE TABLE IF NOT EXISTS]] عشان الفتح يتكرر بأمان.
- افتح القاعدة مرة واحدة ([[SQLiteProvider]] و [[useSQLiteContext]])، مش في كل شاشة.`,
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
    }
]);
