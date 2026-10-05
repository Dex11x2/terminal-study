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
    }
]);
