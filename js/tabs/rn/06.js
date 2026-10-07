// تكملة تاب rn: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/rn/01.js (شرح حقول الدرس في أوله)
MORE("rn", [
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
    }
]);
