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
    }
]);
