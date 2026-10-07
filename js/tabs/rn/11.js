// تكملة تاب rn: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/rn/01.js (شرح حقول الدرس في أوله)
MORE("rn", [
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
          example: R`// npx expo install jest-expo jest @testing-library/react-native @types/jest --dev
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
          teach: R`## الفكرة: ارسم، دوّر، اضغط، اتأكد

المثال أول اختبار: يرسم component عداد بيبدأ من 5، يتأكد إن «Count: 5» ظاهر، يضغط الزرار، ويتأكد إن الرقم بقى 6. أول ٤ سطور تعليقات بالإعداد مرة واحدة في المشروع. كله اتشغّل في مشروع Expo SDK 57 على ويندوز 11 (Node 24.19): [[jest]] 29.7، و [[jest-expo]] 57.0.5، و [[@testing-library/react-native]] (RNTL) 14.0.1، و [[test-renderer]] 1.2.0.

---

## ١. الإعداد (التعليقات اللي فوق)

~~~powershell
npx expo install jest-expo jest @testing-library/react-native @types/jest --dev
npm i -D test-renderer@1.2
~~~

- [[npx expo install]]: بيركّب النسخ اللي SDK 57 متوافق معاها (مش آخر نسخة). و [[--dev]] بيحطهم في [[devDependencies]] (حاجات للتطوير بس، مش بتتحط في التطبيق).
- [[jest-expo]]: preset (إعدادات جاهزة) لـ Jest بيعرف يحوّل كود RN و Expo، وفيه mocks لمكتبات Expo.
- [[@types/jest]]: أنواع TypeScript لـ [[test]] و [[expect]].
- [[test-renderer@1.2]]: RNTL 14 محتاجه يرسم الشجرة من غير موبايل، والنسخة 1.2 هي اللي تناسب React 19.2. و [[-D]] = [[--save-dev]] في npm.

> اتجرّب: لو كتبت [[-- --save-dev]] بدل [[--dev]] (يعني تبعت الـ flag لـ npm)، [[jest-expo]] و [[jest]] و [[@types/jest]] راحوا [[dependencies]] و RNTL بس راح [[devDependencies]]. بـ [[--dev]] الأربعة راحوا [[devDependencies]].

~~~text package.json
"scripts": { "test": "jest" },
"jest": { "preset": "jest-expo", "setupFiles": ["./jest.setup.ts"] }
~~~

- [[npm test]] بيشغّل [[jest]].
- [[preset: "jest-expo"]]: استخدم إعدادات jest-expo.
- [[setupFiles]]: ملف بيتنفذ قبل كل ملف اختبار (فيه الـ mocks، درس «mocks للـ native modules»).

~~~text tsconfig.json
"compilerOptions": { "types": ["jest"] }
~~~

TypeScript 6 بيبدأ بـ [[types]] فاضي، فلازم تقوله «حمّل أنواع jest». من غيره Jest نفسه بيشتغل، بس [[npx tsc --noEmit]] بيقول:

~~~text الناتج
__tests__/counter.test.tsx(4,1): error TS2593: Cannot find name 'test'. Do you need to install type definitions for a test runner? ...
__tests__/counter.test.tsx(6,3): error TS2304: Cannot find name 'expect'.
~~~

---

## ٢. الاختبار سطر سطر

~~~text __tests__/counter.test.tsx
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Counter } from '@/components/Counter';
~~~

| الاسم | بيعمل إيه |
|---|---|
| [[render]] | يرسم الـ component في الذاكرة (مفيش شاشة ولا DOM) |
| [[screen]] | يدوّر في اللي اترسم: [[getByText]] و [[getByRole]] وغيرهم |
| [[fireEvent]] | يبعت event لعنصر: [[press]] و [[changeText]] |

~~~text __tests__/counter.test.tsx
test('starts at the given number and increments on press', async () => {
~~~

[[test(name, fn)]]: اختبار اسمه كذا. والدالة [[async]] لأن RNTL 14 كله async.

~~~text __tests__/counter.test.tsx
  await render(<Counter start={5} />);
~~~

ارسم العداد وابدأه من 5. و [[await]] لازم: في React 19 الرسم ممكن يستنى (Suspense)، فـ RNTL 14 خلّى [[render]] يرجّع Promise.

~~~text __tests__/counter.test.tsx
  expect(screen.getByText('Count: 5')).toBeOnTheScreen();
~~~

- [[screen.getByText('Count: 5')]]: هات العنصر اللي نصه بالظبط كده. لو مش موجود بيرمي error فالاختبار يفشل.
- [[expect(x).toBeOnTheScreen()]]: اتأكد إنه ظاهر. الـ matcher ده جاهز مع RNTL من غير setup.

~~~text __tests__/counter.test.tsx
  await fireEvent.press(screen.getByRole('button', { name: 'Increment' }));
  expect(screen.getByText('Count: 6')).toBeOnTheScreen();
});
~~~

- [[getByRole('button', { name: 'Increment' })]]: هات العنصر اللي الـ accessibility role بتاعه [[button]] واسمه (النص اللي جواه) «Increment». ده نفس اللي قارئ الشاشة بيشوفه.
- [[fireEvent.press]]: نادي [[onPress]] بتاعه. و [[await]] عشان الـ state تتحدث.
- بعدها الرقم بقى 6.

~~~text الناتج
PASS __tests__/counter.test.tsx
  √ starts at the given number and increments on press (54 ms)

Tests:       1 passed, 1 total
~~~

---

## ٣. الـ solCode: العداد نفسه

~~~text src/components/Counter.tsx
export function Counter({ start = 0 }: { start?: number }) {
  const [count, setCount] = useState(start);
~~~

[[start = 0]] قيمة افتراضية لو محدش بعتها، و [[start?: number]] يعني الـ prop اختياري. و [[useState(start)]] الـ state بتبدأ منه.

~~~text src/components/Counter.tsx
  return (
    <View>
      <Text>Count: {count}</Text>
      <Pressable accessibilityRole="button" onPress={() => setCount((c) => c + 1)}>
        <Text>Increment</Text>
      </Pressable>
    </View>
  );
}
~~~

- [[Count: {count}]]: RNTL بيجمع النص ده لـ «Count: 5»، فـ [[getByText]] لاقاه.
- [[accessibilityRole="button"]]: [[Pressable]] لوحده ملوش role. السطر ده هو اللي خلّى [[getByRole('button')]] يلاقيه.
- [[setCount((c) => c + 1)]]: الشكل اللي بياخد القيمة القديمة، أأمن من [[count + 1]].

---

## ٤. الـ try: شيل حاجات وشوف

من غير [[await]] قدام [[render]]:

~~~text الناتج
FAIL __tests__/counter-noawait.test.tsx
  ● no await on render
    $__btrender$__bt function has not been called
~~~

[[screen]] اتقري قبل ما الرسم يخلص.

ومن غير [[accessibilityRole]]:

~~~text الناتج
FAIL __tests__/counter-norole.test.tsx
  ● starts at the given number and increments on press
    Unable to find an element with role: button, name: Increment
~~~

الزرار شغال لو دوست عليه، بس قارئ الشاشة ميعرفش إنه زرار. الحل ترجّع الـ role، مش تغيّر الاختبار.

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| التركيب | [[npx expo install jest-expo jest @testing-library/react-native @types/jest --dev]] + [[test-renderer@1.2]] |
| الإعداد | [[preset: "jest-expo"]] و [[types: ["jest"]]] |
| ارسم | [[await render(<X />)]] |
| دوّر | [[screen.getByRole]] أو [[getByText]] |
| اضغط | [[await fireEvent.press(...)]] |
| اتأكد | [[expect(...).toBeOnTheScreen()]] |

- RNTL 14 = [[await]] قدام [[render]] و [[fireEvent]].
- دوّر بالـ role والنص زي المستخدم، مش بـ [[testID]].`,
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
          teach: R`## الفكرة: الشاشة الحقيقية، بس الـ API وهمي

الاختبار بيرسم شاشة المهام نفسها (ملف الـ route)، بعد ما يبدّل module الـ API بدالة بترجّع مهمة ثابتة، ويلف الشاشة في [[QueryClientProvider]]، ويستنى المهمة تظهر. اتشغّل في مشروع Expo SDK 57 بـ Jest 29.7 و RNTL 14.0.1 و [[@tanstack/react-query]] 5.104.

الشاشة اللي بنختبرها (في الـ lab):

~~~text src/app/(app)/(tabs)/index.tsx
export default function TasksScreen() {
  const { data, isPending, error } = useQuery({ queryKey: ['tasks'], queryFn: () => api<Task[]>('/api/tasks') });
  if (isPending) return <Text>بيحمّل...</Text>;
  if (error) return <Text>حصلت مشكلة: {error.message}</Text>;
  return <FlatList data={data} keyExtractor={(t) => String(t.id)} renderItem={({ item }) => <Text>{item.title}</Text>} />;
}
~~~

---

## ١. الـ imports

~~~text __tests__/tasks.test.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react-native';
import type { PropsWithChildren } from 'react';
import TasksScreen from '@/app/(app)/(tabs)/index';
~~~

- [[import type]]: بيستورد نوع بس، وبيتشال خالص من الكود بعد التحويل. [[PropsWithChildren]] = props فيها [[children]].
- [[TasksScreen]] من ملف الـ route نفسه، [[(app)]] و [[(tabs)]] groups في Expo Router (مش بيظهروا في الـ URL).

## ٢. mock للـ module كله

~~~text __tests__/tasks.test.tsx
jest.mock('@/lib/api', () => ({
  api: jest.fn(async () => [{ id: 1, title: 'اكتب الاختبارات', done: false }]),
}));
~~~

- [[jest.mock(path, factory)]]: «أي حد يعمل import للملف ده، اديله اللي الـ factory بترجّعه بدل الملف الحقيقي». فالشاشة لما تعمل [[import { api } from '@/lib/api']] بتاخد الدالة الوهمية.
- Jest بيرفع [[jest.mock]] لأول الملف لوحده (اسمها hoisting)، فبيتنفذ قبل الـ imports حتى لو مكتوب بعدهم.
- [[jest.fn(async () => [...])]]: دالة وهمية بترجّع Promise فيه مهمة واحدة، زي الحقيقية بالظبط من غير شبكة.

> ليه مش [[fetch]] الحقيقي؟ في [[jest-expo]]، [[fetch]] العام مش بيكلم الشبكة أصلًا (بيرجّع رد فاضي من غير status، اتجرّب). والأهم إن اختبار الشاشة مش محتاج يعرف تفاصيل الـ URL والـ headers.

## ٣. الـ wrapper

~~~text __tests__/tasks.test.tsx
function wrapper({ children }: PropsWithChildren) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
~~~

- [[useQuery]] محتاج [[QueryClient]] فوقيه، وإلا بيرمي error. الـ wrapper component بيلف الشاشة بيه.
- [[new QueryClient(...)]] **جوه** الـ wrapper: كل [[render]] ياخد client جديد بـ cache فاضي.
- [[retry: false]]: TanStack افتراضيًا بيعيد الطلب الفاشل ٣ مرات بتأخير بيزيد (١ ثم ٢ ثم ٤ ثواني). في الاختبار عايز الـ error يظهر على طول.

## ٤. الاختبار

~~~text __tests__/tasks.test.tsx
test('shows tasks from the API', async () => {
  await render(<TasksScreen />, { wrapper });
  expect(await screen.findByText('اكتب الاختبارات')).toBeOnTheScreen();
});
~~~

- [[render(ui, { wrapper })]]: RNTL بيلف الـ ui بالـ wrapper لوحده.
- [[findByText]] = [[waitFor]] + [[getByText]]: بيحاول كل شوية لحد ما العنصر يظهر أو ثانية تعدّي. لازم هنا لأن أول render بيعرض «بيحمّل...»، والمهام بتيجي بعد ما الـ Promise يخلص. [[getByText]] كان هيفشل.

~~~text الناتج
PASS __tests__/tasks.test.tsx
~~~

---

## ٥. الـ solCode: حالة الخطأ

~~~text __tests__/tasks.test.tsx
import { api } from '@/lib/api';

test('shows the error message', async () => {
  jest.mocked(api).mockRejectedValueOnce(new Error('Network'));
  await render(<TasksScreen />, { wrapper });
  expect(await screen.findByText('حصلت مشكلة: Network')).toBeOnTheScreen();
});
~~~

- [[import { api }]] هنا بيجيب الـ mock (مش الحقيقية)، عشان نتحكم فيه.
- [[jest.mocked(api)]]: نفس الدالة، بس TypeScript يعرف إنها mock، فـ [[mockRejectedValueOnce]] تبقى متاحة.
- [[mockRejectedValueOnce(new Error('Network'))]]: «المرة الجاية بس، ارجع Promise فاشل بالـ error ده». بعدها ترجع لسلوكها العادي، فالاختبارات التانية مش بتتأثر.
- الشاشة بتعرض [[حصلت مشكلة: {error.message}]] في [[Text]] واحد، فـ [[findByText]] بيلاقي النص كامل.

~~~text الناتج
PASS __tests__/tasks.test.tsx
  √ shows tasks from the API (68 ms)
  √ shows the error message (59 ms)
~~~

---

## ٦. الـ try: ليه الـ client جوه الـ wrapper، وليه [[retry: false]]

جربنا ٣ نسخ من نفس الملف:

| النسخة | النتيجة |
|---|---|
| زي المثال | الاختبارين عدّوا |
| [[new QueryClient()]] من غير [[retry: false]] | اختبار الخطأ فشل: [[Unable to find an element with text: حصلت مشكلة: Network]] |
| client واحد برّه الـ wrapper + [[staleTime: 60_000]] | اختبار الخطأ فشل بنفس الرسالة |

- من غير [[retry: false]]: TanStack لسه بيستنى قبل المحاولة التانية لما [[findByText]] خلّص ثانيته.
- client مشترك: اللي طلع في التاني:

~~~text الناتج (Jest)
right after render -> old tasks from cache | api calls so far 1
~~~

الاختبار التاني لقى مهام الاختبار الأول في الـ cache، ولأن البيانات لسه «fresh» ([[staleTime]] دقيقة) الـ mock اتنادى مرة واحدة بس في الملف كله، فالـ error مجاش أبدًا. ومن غير [[staleTime]] النسخة دي عدّت، بس بالصدفة، لأن ترتيب الاختبارات بقى بيأثر على النتيجة.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[jest.mock('@/lib/api', ...)]] | الشاشة تاخد بيانات ثابتة من غير شبكة |
| [[QueryClient]] جوه الـ wrapper | cache فاضي لكل اختبار |
| [[retry: false]] | الخطأ يظهر على طول |
| [[findByText]] | البيانات async |
| [[mockRejectedValueOnce]] | حالة الخطأ لاختبار واحد |

- اختبر على الأقل: البيانات، والخطأ، والقايمة الفاضية.
- لو الشاشة فيها providers تانية (session، theme)، حطهم في نفس الـ wrapper.`,
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

والـ client جوه الـ wrapper عشان كل [[render]] ياخد cache فاضي. لو برّه، الاختبار التاني بيبدأ ببيانات الأول من الـ cache. ولو الـ query ليها [[staleTime]]، مش هينادي الـ mock خالص فالـ error مش هيظهر (اتجرّب: الاختبار فشل). ومن غير staleTime بيعدّي بالصدفة لأنه بيعمل refetch.

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
          teach: R`## الفكرة: ملف setup واحد بيبدّل كل حاجة native بنسخة بتشتغل في Node

Jest بيشغّل الاختبارات في Node: مفيش Keychain ولا تخزين الموبايل ولا UI thread. المثال ملف [[jest.setup.ts]] (متسجل في [[setupFiles]] في [[package.json]]) فيه ٣ بدايل: SecureStore بـ Map في الذاكرة، و AsyncStorage بالـ mock الرسمي بتاعها، و Reanimated 4. اتشغّل في مشروع Expo SDK 57 بـ Jest 29.7 و [[jest-expo]] 57.0.5، وكل اختبارات الدروس اللي فاتت (الـ refresh، والـ login، والعداد، وشاشة المهام، والقلب) شغالة عليه.

---

## ١. ليه mock بتاعك لـ SecureStore؟

[[jest-expo]] أصلًا بيعمل mock لمكتبات Expo، بس الـ mock ده مش بيحفظ حاجة. شيلنا الـ mock بتاعنا من ملف اختبار ([[jest.unmock]]) وجربنا:

~~~text الناتج (Jest، الـ mock الافتراضي)
default mock get -> undefined
~~~

كتبنا [['abc']] وقريناها رجعت [[undefined]]. أي كود بيعتمد على إن التوكن اتخزن (الـ session، والـ refresh) هيتصرف كأنه مفيش توكن، والاختبار ممكن يعدّي من غير ما يختبر حاجة.

## ٢. SecureStore بـ Map

~~~text jest.setup.ts
jest.mock('expo-secure-store', () => {
  const store = new Map<string, string>();
  return {
    getItemAsync: jest.fn(async (k: string) => store.get(k) ?? null),
    setItemAsync: jest.fn(async (k: string, v: string) => { store.set(k, v); }),
    deleteItemAsync: jest.fn(async (k: string) => { store.delete(k); }),
  };
});
~~~

- [[jest.mock('expo-secure-store', factory)]]: أي [[import]] للمكتبة دي ياخد اللي الـ factory بترجّعه.
- [[new Map<string, string>()]]: [[Map]] جدول مفتاح وقيمة في الذاكرة. [[<string, string>]] نوع المفتاح ونوع القيمة.
- بنرجّع object فيه **نفس أسامي** الدوال الحقيقية اللي الكود بيستخدمها:
  - [[getItemAsync]]: [[store.get(k)]] بيرجّع [[undefined]] لو المفتاح مش موجود، و [[?? null]] بيحوّله [[null]] زي المكتبة الحقيقية بالظبط.
  - [[setItemAsync]] و [[deleteItemAsync]]: [[set]] و [[delete]] على الـ Map.
- [[jest.fn(async ...)]]: الدوال [[async]] زي الحقيقية (بترجّع Promise)، و [[jest.fn]] بيسجّل النداءات لو حبيت تتأكد منها.

### ليه الـ Map جوه الـ factory؟

Jest بيرفع [[jest.mock]] لأول الملف قبل أي كود، فأي متغير برّه الـ factory لسه ممتعرّفش. Jest نفسه بيمنعك. جربنا Map برّه:

~~~text الناتج (Jest)
ReferenceError: ...scope.test.ts: The module factory of $__btjest.mock()$__bt is not allowed to reference any out-of-scope variables.
Invalid variable access: store
...
Note: This is a precaution to guard against uninitialized mock variables. If it is ensured that the mock is required lazily, variable names prefixed with $__btmock$__bt (case insensitive) are permitted.
~~~

## ٣. AsyncStorage: فيه mock رسمي

~~~text jest.setup.ts
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'));
~~~

المكتبة نفسها جايبة mock جاهز في فولدر [[jest]] جواها، بيحفظ في الذاكرة. الـ factory بترجّعه بـ [[require]] زي ما هو. لو المكتبة فيها mock رسمي، استخدمه بدل ما تكتب واحد.

## ٤. Reanimated 4

~~~text jest.setup.ts
jest.mock('react-native-worklets', () => require('react-native-worklets/src/mock'));
require('react-native-reanimated').setUpTests();
~~~

- Reanimated 4 بيعتمد على [[react-native-worklets]] (كود native بيشغّل الـ worklets على الـ UI thread). في Node مفيش native، فبنبدّلها بالـ mock اللي جاي معاها.
- [[setUpTests()]]: بيجهّز Reanimated للاختبارات، فـ [[useSharedValue]] و [[useAnimatedStyle]] يشتغلوا عادي.

شيلنا سطر الـ worklets وشغّلنا اختبار [[LikeButton]]:

~~~text الناتج (Jest)
FAIL __tests__/like.test.tsx
  ● Test suite failed to run
    TypeError: Cannot read properties of undefined (reading 'loadUnpackers')
~~~

الملف كله وقع قبل ما أي اختبار يبدأ. رجّعنا السطر: [[PASS]].

---

## ٥. الـ try: الـ Map مشتركة بين الاختبارات

الـ factory بتتنفذ مرة لكل **ملف** اختبار، مش لكل اختبار. فاختبارين في نفس الملف:

~~~text __tests__/store.test.ts
test('first test writes', async () => {
  await SecureStore.setItemAsync('accessToken', 'abc');
});
test('second test sees it (shared Map)', async () => {
  console.log('second test reads ->', await SecureStore.getItemAsync('accessToken'));
});
~~~

~~~text الناتج (Jest)
second test reads -> abc
~~~

التاني شاف اللي الأول كتبه. يعني نتيجة الاختبار بتعتمد على ترتيبه.

## ٦. الـ solCode: فضّيها قبل كل اختبار

~~~text jest.setup.ts
jest.mock('expo-secure-store', () => {
  const store = new Map<string, string>();
  return {
    __store: store,
    getItemAsync: ...
~~~

ضفنا خانة [[__store]] بترجّع الـ Map نفسها. الاسم بيبدأ بـ [[__]] كإشارة إنها للاختبارات بس مش جزء من المكتبة.

~~~text __tests__/store.test.ts
beforeEach(() => {
  (jest.requireMock('expo-secure-store') as { __store: Map<string, string> }).__store.clear();
});
~~~

- [[jest.requireMock(name)]]: هات الـ mock نفسه (مش المكتبة الحقيقية).
- [[as { __store: ... }]]: TypeScript ميعرفش [[__store]] لأنها مش في أنواع المكتبة، فبنقوله شكلها.
- [[.clear()]]: فضّي الـ Map. و [[beforeEach]] قبل كل اختبار.

~~~text الناتج (Jest)
second test reads -> null
~~~

---

## الخلاصة

| المكتبة | الـ mock | ليه |
|---|---|---|
| [[expo-secure-store]] | Map في الذاكرة | الافتراضي بيرجّع [[undefined]] |
| [[async-storage]] | الرسمي بتاعها | جاهز ومتظبط |
| [[react-native-worklets]] | [[react-native-worklets/src/mock]] | وإلا [[loadUnpackers]] error |
| [[react-native-reanimated]] | [[setUpTests()]] | hooks الـ animation تشتغل في Node |

- mocks المكتبات native في [[jest.setup.ts]] مرة واحدة. mock لكودك انت ([[@/lib/api]]) في ملف الاختبار نفسه.
- المتغيرات جوه الـ factory (أو اسمها يبدأ بـ [[mock]]).
- أي state جوه mock مشتركة في الملف: فضّيها في [[beforeEach]].`,
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
    }
]);
