// تكملة تاب rn: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/rn/01.js (شرح حقول الدرس في أوله)
MORE("rn", [
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
    }
]);
