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
          teach: R`## الفكرة: دالة واحدة بتكلم السيرفر بدل fetch في كل شاشة

المثال ملف واحد ([[src/lib/api.ts]]) فيه حاجتين: class اسمه [[ApiError]]، ودالة [[api]] كل الشاشات بتنادي عليها. اتشغّل في مشروع Expo SDK 57 (React Native 0.86 و React 19.2) على ويندوز 11 بـ Node 24.19، والدالة نادت سيرفر وهمي صغير على [[http://127.0.0.1:5986]] من جوه اختبار Jest (مفيش موبايل ولا emulator هنا، فالـ emulator والـ IP جزء من الـ docs).

---

## ١. الـ import والـ base URL

~~~text src/lib/api.ts
import * as SecureStore from 'expo-secure-store';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:3000';
~~~

- [[import * as SecureStore]]: هات كل اللي المكتبة بتصدّره جوه object واحد اسمه [[SecureStore]]. هنستخدم منه [[getItemAsync]] بس، اللي بيقرا قيمة متخزنة مشفّرة (Keychain على iOS و Keystore على Android). درسها في قسم «التخزين على الجهاز».
- [[process.env.EXPO_PUBLIC_API_URL]]: متغير بيئة. Expo بيقرا ملف [[.env]] وقت ما بيعمل الـ bundle، وأي متغير اسمه بيبدأ بـ [[EXPO_PUBLIC_]] بيتحط قيمته جوه الكود نفسه. يعني اللي في [[.env]]:

~~~text .env
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000
~~~

- [[??]] اسمه nullish coalescing: «لو اللي على الشمال [[undefined]] أو [[null]]، خد اللي على اليمين». فلو نسيت الـ [[.env]]، الـ URL بيبقى [[http://10.0.2.2:3000]].

### ليه [[10.0.2.2]] مش [[localhost]]؟

| التطبيق شغال فين | يكتب إيه عشان يوصل لسيرفر على جهازك |
|---|---|
| Android emulator | [[http://10.0.2.2:3000]] (عنوان خاص الـ emulator بيترجمه لجهازك) |
| iOS simulator (على الماك) | [[http://localhost:3000]] عادي |
| موبايل حقيقي على نفس الواي فاي | IP جهازك، زي [[http://192.168.1.5:3000]] |
| نسخة الويب في المتصفح | [[http://localhost:3000]] |

[[localhost]] معناها «الجهاز اللي أنا شغال عليه». جوه الـ emulator، الجهاز ده هو الـ emulator نفسه، فمفيش سيرفر هناك. الجدول ده من docs الـ Android emulator و Expo.

---

## ٢. [[ApiError]]: error شايل الـ status

~~~text src/lib/api.ts
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}
~~~

- [[class ApiError extends Error]]: نوع error جديد مبني على [[Error]] العادي، فـ [[throw]] و [[try/catch]] شغالين معاه عادي.
- [[constructor(public status: number, message: string)]]: كلمة [[public]] قدام الـ parameter دي اختصار في TypeScript اسمه parameter property: بتعمل property اسمها [[status]] على الـ object وبتحط فيها القيمة، كأنك كتبت [[this.status = status]].
- [[super(message)]]: بينادي constructor بتاع [[Error]] الأب عشان [[e.message]] تتملي.

الفايدة: الشاشة تقدر تسأل [[e instanceof ApiError && e.status === 401]] وتعمل حاجة مختلفة لكل status.

---

## ٣. الدالة [[api]]: السطر الأول

~~~text src/lib/api.ts
export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
~~~

| الحتة | معناها |
|---|---|
| [[async]] | الدالة بترجّع Promise، وجواها تقدر تستخدم [[await]] |
| [[<T>]] | generic: نوع الرد بيحدده اللي بينادي، زي [[api<Task[]>('/api/tasks')]] |
| [[path: string]] | المسار بس، زي [[/api/tasks]]، من غير الـ base URL |
| [[init: RequestInit = {}]] | نفس إعدادات [[fetch]] ([[method]] و [[body]] و [[headers]])، وافتراضيًا object فاضي |
| [[Promise<T>]] | الرد بعد ما يخلص هيبقى من النوع [[T]] |

## ٤. قراية التوكن

~~~text src/lib/api.ts
  const token = await SecureStore.getItemAsync('accessToken');
~~~

[[getItemAsync]] بترجّع الـ string المتخزن، أو [[null]] لو مفيش (المستخدم لسه مدخلش). و [[await]] لأن القراية من الـ Keychain مش فورية.

## ٥. الطلب نفسه

~~~text src/lib/api.ts
  const res = await fetch($__bt$__{BASE_URL}$__{path}$__bt, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: $__btBearer $__{token}$__bt } : {}),
      ...init.headers,
    },
  });
~~~

هنفكّه من جوه:

- الـ URL مكتوب template literal (بين علامتين backtick)، و [[$__{BASE_URL}]] بتتبدل بالقيمة. فـ [[api('/api/tasks')]] بتطلب [[http://10.0.2.2:3000/api/tasks]].
- [[...init]] اسمه spread: انسخ كل خانات [[init]] (زي [[method: 'POST']] و [[body]]) جوه الـ object الجديد.
- [[headers]] بتتعمل من ٣ حاجات بالترتيب، واللي بعد بيكسب لو نفس الاسم:
  - [[Content-Type: application/json]] افتراضيًا، عشان السيرفر (Express مثلًا) يعرف إن الـ body JSON.
  - [[...(token ? { Authorization: ... } : {})]]: لو فيه توكن، ضيف header اسمه [[Authorization]] قيمته [[Bearer]] ومسافة والتوكن. لو مفيش، انشر object فاضي، يعني متضيفش حاجة. [[? :]] ده الـ ternary: «لو كذا يبقى ده، غير كده ده».
  - [[...init.headers]] في الآخر: اللي بينادي يقدر يغيّر أي header (زي رفع ملف).

## ٦. الأخطاء والرد

~~~text src/lib/api.ts
  if (!res.ok) throw new ApiError(res.status, await res.text());
  return res.status === 204 ? (undefined as T) : res.json();
}
~~~

- [[res.ok]] بيبقى [[true]] لو الـ status بين 200 و 299. أي حاجة تانية (401 و 404 و 500) بنرمي [[ApiError]] فيه الـ status ونص الرد. بنقرا [[text()]] مش [[json()]] لأن صفحة الخطأ ممكن تبقى HTML مش JSON.
- [[204]] معناها «تمام ومفيش body». لو ناديت [[res.json()]] على body فاضي بيقع. ده اللي طلع في Node 24:

~~~text الناتج
SyntaxError: Unexpected end of JSON input
~~~

عشان كده بنرجّع [[undefined]]. و [[as T]] بيقول لـ TypeScript «عارف إنه مش [[T]]، عدّيها».

---

## ٧. اتجرّب إزاي

السيرفر الوهمي بيرجّع 401 لو مفيش توكن، وبيرجّع توكن من [[/api/auth/login]]، والمهام لو الـ [[Authorization]] صح. اختبار Jest نادى الدالة ٤ مرات (والـ [[EXPO_PUBLIC_API_URL]] متظبط على السيرفر ده):

~~~text الناتج (Jest)
no token -> true 401 {"error":"expired"}
login -> { accessToken: 'a1', refreshToken: 'r1' }
tasks -> [
  { id: 1, title: 'اكتب الاختبارات', done: false },
  { id: 2, title: 'ارفع التطبيق', done: true }
]
204 -> undefined
~~~

- السطر الأول: من غير توكن، [[e instanceof ApiError]] طلعت [[true]]، والـ status [[401]]، والرسالة نص الرد.
- بعد ما خزّنا التوكن، نفس الطلب رجّع المهام. ولوج السيرفر بيوري إن الـ header اتبعت:

~~~text لوج السيرفر
GET /api/tasks auth=- ct=application/json
POST /api/auth/login auth=- ct=application/json
GET /api/tasks auth=Bearer a1 ct=application/json
POST /api/empty auth=Bearer a1 ct=application/json
~~~

> ملحوظة: في Jest مع [[jest-expo]]، [[fetch]] العادي مش بيوصل للشبكة أصلًا (بيرجّع رد فاضي من غير status). عشان كده الاختبار ده حط [[fetch]] صغير مبني على [[http]] بتاع Node. في التطبيق الحقيقي [[fetch]] بتاع RN بيكلم الشبكة عادي.

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[BASE_URL]] | من [[.env]]، وافتراضيًا [[10.0.2.2]] للـ Android emulator |
| [[ApiError]] | error فيه [[status]] عشان الشاشة تفرّق بين 401 و 422 و 500 |
| [[getItemAsync('accessToken')]] | التوكن من التخزين المشفّر |
| الـ headers | JSON افتراضيًا، و [[Bearer]] لو فيه توكن، واللي بينادي يغيّر |
| [[!res.ok]] | أي status مش 2xx يبقى error |
| [[204]] | من غير [[json()]] |

- التطبيق مش متصفح: مفيش CORS يمنعه، ومفيش cookies تلقائية، فالتوكن بيتبعت بإيدك في [[Authorization]].
- اللي في [[EXPO_PUBLIC_]] بيتحط جوه التطبيق وأي حد يقدر يقراه: URL أيوه، secret لأ.
- [[localhost]] من الـ Android emulator هو الـ emulator نفسه.`,
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
          teach: R`## الفكرة: لو الطلب رجع 401، جدّد التوكن مرة واحدة وأعد الطلب

المثال هو نفس [[api]] بتاع الدرس اللي فات، بزيادة حاجتين: دالة [[refreshAccessToken]] بتجيب توكنات جديدة، ومتغير [[refreshing]] بيضمن إن الطلبات اللي فشلت مع بعض تستنى refresh واحد بس. اتجرّب في مشروع Expo SDK 57 على ويندوز 11 (Node 24.19) باختبارات Jest: مرة بـ [[fetch]] وهمي (الـ solCode)، ومرة قدام سيرفر صغير على [[http://127.0.0.1:5986]] بيعمل rotation وبيكشف إعادة الاستخدام.

---

## ١. المتغير المشترك

~~~text src/lib/api.ts
let refreshing: Promise<string | null> | null = null;
~~~

- [[let]] مش [[const]] لأن قيمته هتتغير.
- النوع [[Promise<string | null> | null]]: يا إما [[null]] (مفيش refresh شغال دلوقتي)، يا إما Promise لسه بيشتغل وهيرجّع التوكن الجديد ([[string]]) أو [[null]] لو فشل. [[|]] في TypeScript معناها «أو».
- متعرّف برّه أي دالة (على مستوى الـ module)، فكل نداءات [[api]] في التطبيق كله شايفة نفس المتغير. ده سر الحل كله.

---

## ٢. [[refreshAccessToken]]: بتجيب توكنات جديدة

~~~text src/lib/api.ts
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = await SecureStore.getItemAsync('refreshToken');
  if (!refreshToken) return null;
~~~

لو مفيش refresh token متخزن (المستخدم مدخلش أصلًا)، مفيش حاجة نجددها: رجّع [[null]].

~~~text src/lib/api.ts
  const res = await fetch($__bt$__{BASE_URL}/api/auth/refresh$__bt, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) return null;
~~~

- [[fetch]] مباشر مش [[api]]، عشان طلب الـ refresh نفسه ميدخلش في نفس منطق الـ 401 ويعمل loop.
- [[JSON.stringify({ refreshToken })]]: بيحوّل الـ object لنص JSON. و [[{ refreshToken }]] اختصار لـ [[{ refreshToken: refreshToken }]] لما اسم الخانة واسم المتغير واحد.
- السيرفر رفض (التوكن منتهي أو ملغي): [[null]]، والمستخدم هيضطر يدخل تاني.

~~~text src/lib/api.ts
  const data: { accessToken: string; refreshToken: string } = await res.json();
  await SecureStore.setItemAsync('accessToken', data.accessToken);
  await SecureStore.setItemAsync('refreshToken', data.refreshToken);
  return data.accessToken;
}
~~~

بنخزّن **الاتنين**. السيرفر اللي بيعمل rotation بيدّيك refresh token جديد مع كل refresh وبيلغي القديم، فلو خزّنت الـ access بس، أول refresh جاي هيبعت توكن ملغي.

---

## ٣. [[api]] بعد التعديل

~~~text src/lib/api.ts
export async function api<T>(path: string, init: RequestInit = {}, retry = true): Promise<T> {
~~~

parameter تالت [[retry]] افتراضيًا [[true]]. لما نعيد الطلب بعد الـ refresh هنبعته [[false]]، فلو رجع 401 تاني (مثلًا المستخدم ملوش صلاحية فعلًا) مش هنجدد تاني ونلف في loop.

السطور اللي بعدها (قراية التوكن والـ [[fetch]] بالـ headers) هي نفسها اللي في الدرس اللي فات، بس الـ headers في سطر واحد.

### قلب الدرس: السطور الأربعة دي

~~~text src/lib/api.ts
  if (res.status === 401 && retry) {
    refreshing ??= refreshAccessToken().finally(() => { refreshing = null; });
    const newToken = await refreshing;
    if (newToken) return api<T>(path, init, false);
  }
~~~

نفكّ السطر التاني من جوه لبرة:

1. [[refreshAccessToken()]]: يبدأ الـ refresh ويرجّع Promise على طول (من غير ما يستنى).
2. [[.finally(() => { refreshing = null; })]]: لما الـ Promise يخلص (نجح أو فشل)، رجّع المتغير [[null]]، عشان المرة الجاية (بعد ١٥ دقيقة) يبدأ refresh جديد.
3. [[refreshing ??= ...]]: الـ operator ده اسمه nullish assignment: «لو [[refreshing]] قيمته [[null]] أو [[undefined]]، حط فيه القيمة دي. لو فيه قيمة، سيبه». والمهم: لو فيه قيمة، الجزء اللي على اليمين **مش بيتنفذ خالص**، فمفيش refresh تاني بيبدأ.

يعني لو ٣ طلبات رجعوا 401 في نفس اللحظة:

| الطلب | [[refreshing]] لقاه | عمل إيه |
|---|---|---|
| الأول | [[null]] | بدأ refresh وحطه في المتغير |
| التاني | Promise شغال | استنى نفس الـ Promise |
| التالت | Promise شغال | استنى نفس الـ Promise |

- [[const newToken = await refreshing]]: التلاتة بيستنوا نفس النتيجة.
- [[if (newToken) return api<T>(path, init, false)]]: لو جه توكن، أعد نفس الطلب بنفس الإعدادات، و [[retry = false]]. الطلب الجديد هيقرا التوكن الجديد من SecureStore.
- لو [[newToken]] طلع [[null]]، بنكمّل لتحت: [[!res.ok]] فيرمي [[ApiError(401)]]، والتطبيق يطلّع المستخدم.

---

## ٤. الاختبار (الـ solCode)

~~~text __tests__/refresh.test.ts
const json = (status: number, body: unknown) =>
  ({ ok: status < 400, status, json: async () => body, text: async () => JSON.stringify(body) }) as Response;
~~~

دالة صغيرة بتعمل object شبه الـ Response بتاع [[fetch]]: فيه [[ok]] و [[status]] و [[json()]] و [[text()]] بس، لأن دي اللي [[api]] بيستخدمها. و [[as Response]] بيقول لـ TypeScript يعامله كـ Response.

~~~text __tests__/refresh.test.ts
beforeEach(async () => {
  await SecureStore.setItemAsync('accessToken', 'old');
  await SecureStore.setItemAsync('refreshToken', 'r1');
});
~~~

[[beforeEach]] بيتنفذ قبل كل اختبار: توكن قديم [['old']] و refresh [['r1']]. ده شغال لأن SecureStore عليه mock بيحفظ في Map (درس «mocks للـ native modules»).

~~~text __tests__/refresh.test.ts
  let refreshCalls = 0;
  globalThis.fetch = jest.fn(async (url: string, init?: RequestInit) => {
    if (url.endsWith('/api/auth/refresh')) {
      refreshCalls++;
      return json(200, { accessToken: 'new', refreshToken: 'r2' });
    }
    const auth = (init?.headers as Record<string, string>).Authorization;
    return auth === 'Bearer new' ? json(200, [{ id: 1 }]) : json(401, { error: 'expired' });
  }) as unknown as typeof fetch;
~~~

- [[globalThis.fetch = jest.fn(...)]]: بنبدّل [[fetch]] العام بدالة وهمية. [[jest.fn]] بتسجّل كل نداء.
- طلب الـ refresh: زوّد العداد ورجّع توكنات جديدة.
- أي طلب تاني: لو الـ header [[Bearer new]] رجّع بيانات، غير كده 401. يعني التوكن القديم دايمًا مرفوض.
- [[init?.headers]]: الـ [[?.]] (optional chaining) معناها «لو [[init]] موجود هات [[headers]]، لو لأ رجّع [[undefined]] من غير ما تقع».

~~~text __tests__/refresh.test.ts
  const [a, b] = await Promise.all([api('/api/tasks'), api('/api/projects')]);
  expect(a).toEqual([{ id: 1 }]);
  expect(b).toEqual([{ id: 1 }]);
  expect(refreshCalls).toBe(1);
  expect(await SecureStore.getItemAsync('refreshToken')).toBe('r2');
~~~

[[Promise.all]] بيبدأ الطلبين مع بعض ويستنى الاتنين، زي شاشة بتجيب حاجتين في نفس اللحظة. الناتج:

~~~text الناتج (Jest)
PASS __tests__/refresh.test.ts
~~~

ولما شيلنا الـ single-flight (خلّينا السطر [[refreshing = refreshAccessToken();]] من غير [[??=]] ولا [[finally]]):

~~~text الناتج (Jest)
FAIL __tests__/noflight.test.ts
  ● refreshes once for parallel 401s and retries
    expect(received).toBe(expected) // Object.is equality
    Expected: 1
    Received: 2
~~~

---

## ٥. قدام سيرفر بيعمل rotation بجد

نفس الكلام اتجرّب قدام السيرفر الصغير: دخلنا، وبعدين خلّينا الـ access token يبقى منتهي، وبعتنا ٣ طلبات مع بعض بـ [[Promise.all]].

بالـ single-flight، لوج السيرفر:

~~~text لوج السيرفر
GET /api/tasks auth=Bearer a2
GET /api/tasks auth=Bearer a2
GET /api/tasks auth=Bearer a2
POST /api/auth/refresh
GET /api/tasks auth=Bearer a3
GET /api/tasks auth=Bearer a3
GET /api/tasks auth=Bearer a3
~~~

٣ طلبات فشلت، refresh **واحد**، والتلاتة اتعادوا بالتوكن الجديد ونجحوا.

ومن غير الـ single-flight:

~~~text لوج السيرفر
GET /api/tasks auth=Bearer a4
POST /api/auth/refresh
GET /api/tasks auth=Bearer a4
GET /api/tasks auth=Bearer a4
GET /api/tasks auth=Bearer a5
POST /api/auth/refresh
POST /api/auth/refresh
REUSE DETECTED for r5
GET /api/tasks auth=Bearer a6
~~~

٣ طلبات refresh بدل واحد. الأول خلّص قبل ما التاني والتالت يرجعوا 401، فالاتنين قروا نفس الـ refresh الجديد ([[r5]]) من SecureStore وبعتوه مع بعض. السيرفر قبل واحد ولغى [[r5]]، والتاني وصل بـ [[r5]] اللي لسه متلغي، والسيرفر اعتبره مسروق ورفضه، والطلب بتاعه رمى [[ApiError]] بـ 401. في تطبيق حقيقي ده «التطبيق بيطلّعني كل شوية».

---

## الخلاصة

| الحتة | ليه موجودة |
|---|---|
| [[refreshing]] برّه الدالة | كل الطلبات شايفة نفس الـ refresh |
| [[??=]] | يبدأ refresh بس لو مفيش واحد شغال |
| [[.finally(() => refreshing = null)]] | المرة الجاية يبدأ refresh جديد |
| [[retry = false]] في الإعادة | مفيش loop لو 401 تاني |
| تخزين الـ refresh الجديد | مع rotation، القديم بقى ملغي |
| [[fetch]] مباشر في الـ refresh | طلب الـ refresh ميدخلش في منطق الـ 401 |

- 401 = «التوكن انتهى أو مش صح» فنجدد. 403 = «مسموحلكش» فمفيش تجديد.
- الـ bug ده مش بيبان وانت بتجرب شاشة شاشة، بيبان بس لما كذا طلب يفشلوا مع بعض. عشان كده الاختبار بـ [[Promise.all]].`,
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
          teach: R`## الفكرة: الشاشة بتوصل ٤ قطع ببعض ومبتعملش حاجة لوحدها

[[sign-in.tsx]] مفيهاش فورم ولا تخزين ولا تنقّل. فيها بس: «لما الفورم يبعت قيم سليمة، ابعتها للـ API، وخزّن التوكنات». والباقي بيحصل لوحده. اتجرّب في مشروع Expo SDK 57 بـ Expo Router، في اختبار Jest بـ [[renderRouter]] (بيشغّل الـ router الحقيقي في الذاكرة) قدام سيرفر صغير على [[http://127.0.0.1:5986]] بيقبل الباسورد [[secret123]] بس.

| القطعة | مسؤولة عن | درسها |
|---|---|---|
| [[LoginForm]] | الحقول والتحقق (react-hook-form + Zod) | «react-hook-form + Controller» |
| [[api]] | الطلب والأخطاء | «API client بالتوكن» |
| [[useSession().signIn]] | SecureStore + الـ state | «SecureStore» |
| [[Stack.Protected]] | مين يشوف أنهي شاشة | «Stack.Protected» |

---

## ١. الـ imports والنوع

~~~text src/app/sign-in.tsx
import { KeyboardAvoidingView, Platform } from 'react-native';
import { api, ApiError } from '@/lib/api';
import { useSession } from '@/lib/session';
import { LoginForm } from '@/components/LoginForm';

type LoginResponse = { accessToken: string; refreshToken: string };
~~~

- [[@/]] اختصار لفولدر [[src/]]، متعرّف في [[paths]] جوه [[tsconfig.json]] في قالب Expo.
- [[LoginForm]] في [[src/components]] مش [[src/app]]: أي ملف جوه [[src/app]] Expo Router بيعتبره شاشة.
- [[type LoginResponse]]: شكل رد السيرفر، عشان [[r.accessToken]] يبقى متعرّف.

## ٢. الـ component

~~~text src/app/sign-in.tsx
export default function SignIn() {
  const { signIn } = useSession();
~~~

[[export default]] لأن Expo Router بياخد الـ default export من كل ملف route. و [[const { signIn } = ...]] ده destructuring: هات خانة [[signIn]] بس من اللي الـ hook بيرجّعه.

## ٣. [[KeyboardAvoidingView]]

~~~text src/app/sign-in.tsx
    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
~~~

- view بيزق المحتوى لفوق لما الكيبورد يطلع، عشان الكيبورد ميغطيش الحقول.
- [[{{ flex: 1, justifyContent: 'center' }}]]: القوسين الخارجيين معناهم «JavaScript جوه JSX»، والداخليين object الستايل. [[flex: 1]] ياخد الشاشة كلها، و [[justifyContent: 'center']] الفورم في النص رأسيًا.
- [[behavior]]: على iOS [['padding']] (يزوّد مسافة تحت قد الكيبورد). على Android [[undefined]] لأن النظام نفسه بيصغّر الشاشة لما الكيبورد يطلع. التفاصيل في درس «الكيبورد».

## ٤. [[onSubmit]]: قلب الشاشة

~~~text src/app/sign-in.tsx
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
~~~

1. [[values]] جاية من الفورم بعد ما Zod اتأكد منها: [[{ email, password }]].
2. [[api<LoginResponse>(...)]]: POST والـ body هو القيم كـ JSON. الـ [[Content-Type]] الـ client بيحطه لوحده.
3. [[await signIn(...)]]: بيكتب التوكنين في SecureStore وبعدين [[setToken]].
4. [[catch (e)]]: لو الـ status 401، ارمي error جديد برسالة مفهومة بدل نص السيرفر الخام ([[{"error":"invalid credentials"}]]). أي خطأ تاني (النت فاصل، 500) يطلع زي ما هو.

ليه بنرمي ومش بنعرض الرسالة هنا؟ لأن [[LoginForm]] هو اللي عنده مكان الرسالة تحت الزرار، فالشاشة بترمي والفورم يمسك (الـ solCode).

### مين نقل المستخدم؟

مفيش [[router.replace]] في الكود. اللي حصل:

1. [[signIn]] غيّر [[token]] من [[null]] لقيمة.
2. الـ root layout عمل re-render، و [[<Stack.Protected guard={!!token}>]] بقى [[true]]، و [[guard={!token}]] حوالين [[sign-in]] بقى [[false]].
3. Expo Router شاف إن الشاشة الحالية مبقتش مسموحة، فنقل لأول شاشة مسموحة ([[(app)]]) وشال [[sign-in]] من الـ history.

و [[!!token]]: أول [[!]] بتقلب القيمة لـ boolean معكوس، والتانية بترجّعها. فـ [[!!'a1']] = [[true]] و [[!!null]] = [[false]].

---

## ٥. الـ solCode: الفورم يعرض الخطأ

~~~text src/components/LoginForm.tsx
const { control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });
~~~

من [[useForm]] بناخد: [[control]] (بيتبعت لكل [[Controller]])، و [[handleSubmit]]، و [[setError]] (تحط خطأ بإيدك)، ومن [[formState]]: [[errors]] و [[isSubmitting]] ([[true]] طول ما الـ submit لسه بيشتغل).

~~~text src/components/LoginForm.tsx
const submit = handleSubmit(async (values) => {
  try {
    await onSubmit(values);
  } catch (e) {
    setError('root.server', { message: e instanceof Error ? e.message : 'حصلت مشكلة' });
  }
});
~~~

- [[handleSubmit(fn)]] بيرجّع دالة: لما تتنادى بتشغّل Zod، ولو القيم سليمة بتنادي [[fn]].
- [[await onSubmit(values)]]: بنستنى الشاشة. لو رمت، الـ [[catch]] بيمسك.
- [[setError('root.server', ...)]]: [[root]] في react-hook-form معناها «خطأ على الفورم كله مش حقل معين»، و [[.server]] اسم احنا اخترناه.
- [[e instanceof Error ? e.message : ...]]: في TypeScript الـ [[e]] جوه [[catch]] نوعه [[unknown]]، فلازم نتأكد إنه [[Error]] قبل ما نقرا [[message]].

~~~text src/components/LoginForm.tsx
{errors.root?.server ? <Text style={{ color: '#dc2626' }}>{errors.root.server.message}</Text> : null}
<Pressable onPress={submit} disabled={isSubmitting}>...
~~~

لو فيه خطأ اعرضه بالأحمر، وإلا [[null]] (مفيش حاجة). و [[disabled={isSubmitting}]] بيقفل الزرار لحد ما الطلب يخلص، فالمستخدم ميبعتش مرتين.

---

## ٦. اللي حصل في الاختبار

الاختبار رسم الـ layout الحقيقي (فيه [[Stack.Protected]]) وشاشة [[sign-in]] وشاشة المهام، وبدأ من [[/sign-in]]:

~~~text الناتج (Jest)
start: form shown true
wrong: form still shown true
right: form shown false stored refresh r8
PASS __tests__/login.test.tsx
~~~

- باسورد غلط: السيرفر رجّع 401، والنص [[الإيميل أو الباسورد غلط]] ظهر تحت الزرار، والفورم لسه موجود.
- باسورد صح: الفورم اختفى، وقايمة المهام ظهرت (الاختبار لقى [[اكتب الاختبارات]])، والـ refresh token اتخزن. ومفيش ولا سطر تنقّل في الكود.

ولوج السيرفر:

~~~text لوج السيرفر
POST /api/auth/login auth=- ct=application/json bytes=52
POST /api/auth/login auth=- ct=application/json bytes=51
GET /api/tasks auth=Bearer a8 ct=application/json bytes=0
~~~

> الـ client بيحاول refresh مع أي 401، حتى 401 بتاع الـ login. هنا مفيش refresh token متخزن، فـ [[refreshAccessToken]] رجّعت [[null]] من غير ما تبعت طلب (مفيش [[/api/auth/refresh]] في اللوج)، والخطأ كمّل عادي.

ضغطة «رجوع» على Android بعد الدخول (بتقفل التطبيق بدل ما ترجع للـ login) محتاجة جهاز، ومكتوبة من docs الـ Expo Router.

---

## الخلاصة

| الخطوة | مين |
|---|---|
| الحقول والتحقق | [[LoginForm]] + Zod |
| الطلب | [[api('/api/auth/login')]] |
| 401 لرسالة مفهومة | [[catch]] في الشاشة |
| عرض الخطأ | [[setError('root.server')]] في الفورم |
| تخزين التوكنات | [[signIn]] |
| التنقّل | [[Stack.Protected]] لوحده |

- متكتبش [[router.replace]] بعد [[signIn]]: الـ guard بيعمل كده، والاتنين مع بعض بيعملوا تنقّل مزدوج.
- اللي بيتخزن التوكن، مش الباسورد.`,
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

رسايل الإذن على iOS ([[NSLocationWhenInUseUsageDescription]] وغيرها) بتتكتب في إعدادات الـ plugin في app.json، وبتظهر في النافذة. لو مكتبتهاش، الـ plugin بيحط رسالة افتراضية إنجليزي زي «Allow $(PRODUCT_NAME) to access your location» مبتشرحش السبب، و Apple بترفض تطبيقات بسببها. (في مشروع iOS من غير Expo، غياب الرسالة خالص بيقفل التطبيق لما يطلب الإذن.) وعلى Android الـ plugins بتضيف [[<uses-permission>]] في الـ manifest.

[[Linking.openSettings()]] بيفتح صفحة إعدادات التطبيق بتاعك مباشرة.

مقدرتش أجرب نوافذ الإذن في الـ lab (محتاجة جهاز أو emulator)، بس الكود بيعدّي الـ typecheck على SDK 57.`,
            when: R`قبل أي استخدام لـ API حساس، وفي اللحظة المناسبة. وممكن شاشة «pre-permission» بتاعتك تشرح الفايدة الأول، وبعدها تطلب إذن النظام.`,
            mistakes: R`تطلب كل الصلاحيات في أول شاشة. ومتتعاملش مع الرفض فالشاشة تفضل فاضية أو تقع. وتسيب رسالة iOS الافتراضية الإنجليزي اللي مبتقولش ليه، فالـ review يرفضك. وتطلب [[background location]] وانت محتاج foreground بس فالـ review يرفضك.`
          },
          teach: R`## الفكرة: ٣ حالات، ولكل حالة تصرّف

الدالة [[ensureLocationPermission]] بترجّع [[true]] لو معانا إذن الموقع، وبتتعامل مع التلات حالات: الإذن موجود، أو لسه ينفع نسأل، أو المستخدم قفله ومينفعش نسأل تاني. نافذة الإذن نفسها بتاعة النظام ومحتاجة موبايل أو emulator، فالتلات فروع اتجرّبوا في Jest (مشروع Expo SDK 57، [[expo-location]] 57.0.20) بـ mock بيرجّع كل حالة، وإعدادات الـ plugin اتشافت بـ [[npx expo config]].

---

## ١. الـ imports

~~~text src/lib/perm.ts
import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';
~~~

- [[expo-location]]: مكتبة الموقع. كل مكتبات Expo اللي محتاجة إذن (الكاميرا، والصور، والإشعارات) فيها نفس الدالتين بنفس الشكل.
- [[Alert]]: نافذة النظام اللي فيها عنوان ورسالة وزراير.
- [[Linking]]: بيفتح لينكات وصفحات النظام. هنستخدم منه [[openSettings()]].

## ٢. اسأل عن الحالة من غير ما تطلب

~~~text src/lib/perm.ts
export async function ensureLocationPermission(): Promise<boolean> {
  const current = await Location.getForegroundPermissionsAsync();
  if (current.granted) return true;
~~~

- [[Promise<boolean>]]: الدالة async وبترجّع [[true]] أو [[false]].
- [[getForegroundPermissionsAsync()]]: «الإذن حالته إيه؟» **من غير** ما يظهر حاجة للمستخدم. [[Foreground]] يعني الموقع وانت فاتح التطبيق بس (عكس background).
- الرد object فيه:

| الخانة | القيم | معناها |
|---|---|---|
| [[status]] | [['granted']] أو [['denied']] أو [['undetermined']] | [[undetermined]] = لسه محدش سأل |
| [[granted]] | [[true]] أو [[false]] | اختصار لـ [[status === 'granted']] |
| [[canAskAgain]] | [[true]] أو [[false]] | النظام هيعرض النافذة لو طلبت؟ |
| [[expires]] | [['never']] غالبًا | إمتى الإذن ينتهي |

لو [[granted]]، خلاص.

## ٣. مقفول ومينفعش نسأل

~~~text src/lib/perm.ts
  if (!current.canAskAgain) {
    Alert.alert('الموقع مقفول', 'افتح الإعدادات واسمح للتطبيق بالموقع عشان نعرض الفروع القريبة.', [
      { text: 'مش دلوقتي', style: 'cancel' },
      { text: 'الإعدادات', onPress: () => Linking.openSettings() },
    ]);
    return false;
  }
~~~

[[canAskAgain: false]] معناها إن النظام **مش هيعرض النافذة** لو طلبت تاني (على iOS بعد أول رفض، وعلى Android بعد رفضين عادةً). فبدل ما نطلب ومفيش حاجة تحصل، بنشرح ونودّيه للإعدادات.

[[Alert.alert(title, message, buttons)]]:
- العنوان والرسالة: قول **ليه** محتاج الإذن.
- [[buttons]]: array، كل زرار object. [[style: 'cancel']] بيخليه زرار الإلغاء (على iOS بيظهر بشكل مختلف). و [[onPress]] الدالة اللي تتنفذ لما يتضغط.
- [[Linking.openSettings()]]: بيفتح صفحة إعدادات **التطبيق بتاعك** مباشرة، فالمستخدم يفعّل الموقع بضغطة.

## ٤. لسه ينفع نسأل

~~~text src/lib/perm.ts
  const answer = await Location.requestForegroundPermissionsAsync();
  return answer.granted;
}
~~~

[[requestForegroundPermissionsAsync()]] ده اللي بيظهر نافذة النظام وبيستنى المستخدم. الرد بنفس الشكل، فبنرجّع [[granted]].

---

## ٥. اتجرّب إزاي

في Jest مفيش نافذة. و [[jest-expo]] بيعمل mock للمكتبة، بس الـ mock بيرجّع [[undefined]]، فالدالة وقعت بـ:

~~~text الناتج (Jest)
TypeError: Cannot read properties of undefined (reading 'granted')
~~~

فعملنا mock بيرجّع اللي احنا عايزينه في كل مرة، وعدّينا على التلات فروع:

~~~text الناتج (Jest)
1 granted -> true request called 0
2 undetermined then user said no -> false request called 1
3 blocked -> false request called 1
alert title: الموقع مقفول | buttons: مش دلوقتي / الإعدادات
openSettings called 1
~~~

1. الإذن موجود: [[true]]، ومفيش [[request]] خالص.
2. [[undetermined]]: طلبنا مرة، والمستخدم (الـ mock) رفض، فـ [[false]].
3. [[canAskAgain: false]]: مفيش طلب جديد (العداد فضل 1)، وظهر Alert بالزرارين، والضغط على «الإعدادات» نادى [[openSettings]].

---

## ٦. رسالة الإذن على iOS والـ manifest على Android

النافذة على iOS بتعرض نص من الـ Info.plist، و Expo بيكتبه من الـ plugin في [[app.json]]:

~~~text app.json
"plugins": [
  ["expo-location", { "locationWhenInUsePermission": "بنستخدم موقعك عشان نعرض الفروع القريبة." }]
]
~~~

[[npx expo config --type introspect]] بيوريك الإعدادات النهائية من غير build. على المشروع ده:

~~~text الناتج
NSPhotoLibraryUsageDescription = "Allow $(PRODUCT_NAME) to access your photos"
NSCameraUsageDescription = "Allow $(PRODUCT_NAME) to access your camera"
NSLocationAlwaysAndWhenInUseUsageDescription = "Allow $(PRODUCT_NAME) to access your location"
NSLocationWhenInUseUsageDescription = "بنستخدم موقعك عشان نعرض الفروع القريبة."
~~~

اللي كتبناه بس اتغير. الباقي رسايل افتراضية إنجليزي حطتها الـ plugins لوحدها ([[expo-image-picker]] متسطب فحط رسايل الصور والكاميرا). الرسالة الافتراضية مش بتقول **ليه**، و Apple بترفض تطبيقات كتير بسببها، فاكتب رسالة واضحة لكل إذن بتستخدمه. و [[$(PRODUCT_NAME)]] متغير بيتبدل باسم التطبيق.

وعلى Android نفس الأمر بيطلّع الـ permissions اللي اتضافت للـ manifest، ومنها:

~~~text الناتج
android.permission.ACCESS_COARSE_LOCATION
android.permission.ACCESS_FINE_LOCATION
~~~

[[COARSE]] = موقع تقريبي (شبكة)، و [[FINE]] = دقيق (GPS).

---

## ٧. الـ solCode: نفس الشكل للصور

~~~text src/lib/perm.ts
export async function ensureMediaPermission() {
  const current = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) {
    Linking.openSettings();
    return false;
  }
  return (await ImagePicker.requestMediaLibraryPermissionsAsync()).granted;
}
~~~

نفس التلات خطوات بأسامي [[MediaLibrary]]. الفرق إنه بيفتح الإعدادات على طول من غير Alert (الأحسن تشرح الأول زي المثال). و [[(await ...).granted]]: الأقواس عشان الـ [[await]] يخلص الأول وبعدين ناخد [[granted]] من النتيجة. عدّى [[npx tsc --noEmit]] على SDK 57.

---

## الخلاصة

| الحالة | [[granted]] | [[canAskAgain]] | تعمل إيه |
|---|---|---|---|
| مسموح | [[true]] | | كمّل |
| لسه محدش سأل | [[false]] | [[true]] | [[request...Async()]] |
| مرفوض بس ينفع نسأل | [[false]] | [[true]] | [[request...Async()]] تاني |
| مقفول | [[false]] | [[false]] | اشرح و [[Linking.openSettings()]] |

- [[get...]] بيسأل عن الحالة بس، و [[request...]] هو اللي بيظهر النافذة.
- اطلب في اللحظة اللي المستخدم فاهم فيها السبب، مش أول ما التطبيق يفتح.
- اكتب رسالة iOS بنفسك في الـ plugin.`,
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
          teach: R`## الفكرة: دالتين، واحدة بتختار الصورة وواحدة بترفعها

[[pickAvatar]] بتطلب الإذن وبتفتح معرض الصور وبترجّع الصورة اللي اتختارت (أو [[null]])، و [[uploadAvatar]] بتبعتها للـ backend كـ [[multipart/form-data]]. اتجرّب في مشروع Expo SDK 57 ([[expo-image-picker]] 57.0.20): الكود عدّى [[npx tsc --noEmit]]، وفي نسخة الويب ([[npx expo export --platform web]]) في Chrome headless اخترنا صورة ورفعناها لسيرفر صغير على [[http://127.0.0.1:5986]]. معرض الصور والكاميرا على الموبايل محتاجين جهاز، فاللي يخصهم من الـ docs.

---

## ١. [[pickAvatar]]

~~~text src/lib/device.ts
import * as ImagePicker from 'expo-image-picker';

export async function pickAvatar() {
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) return null;
~~~

نفس شكل درس «permissions»: اطلب إذن الصور، ولو اترفض رجّع [[null]]. (على Android 13+ الـ picker بتاع النظام مش محتاج إذن في حالات كتير، بس الطلب مش بيضر.)

~~~text src/lib/device.ts
  const r = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.7 });
~~~

[[launchImageLibraryAsync]] بيفتح معرض الصور بتاع النظام وبيستنى المستخدم يختار أو يلغي. الإعدادات:

| الخانة | القيمة | معناها |
|---|---|---|
| [[mediaTypes]] | [[['images']]] | صور بس، من غير فيديو |
| [[allowsEditing]] | [[true]] | شاشة قص بعد الاختيار |
| [[aspect]] | [[[1, 1]]] | القص مربع (للصورة الشخصية) |
| [[quality]] | [[0.7]] | ضغط JPEG: من 0 (أقل جودة) لـ 1 (من غير ضغط) |

~~~text src/lib/device.ts
  return r.canceled ? null : r.assets[0];
}
~~~

الرد فيه [[canceled]] ([[true]] لو المستخدم قفل من غير ما يختار) و [[assets]]: array فيها الصور اللي اتختارت. واحنا عايزين واحدة، فـ [[assets[0]]].

اللي رجع في Chrome لما اخترنا [[icon.png]] من القالب:

~~~text الناتج (Chrome)
{"uri":"blob:http://127.0.0.1:5985/3da...","fileName":"icon.png","mimeType":"image/png","width":1024,"height":1024,"hasFile":true}
~~~

- [[uri]]: مكان الصورة. على الويب [[blob:]] (ملف في ذاكرة المتصفح)، وعلى الموبايل [[file://...]] في الـ cache بتاع التطبيق.
- [[fileName]] و [[mimeType]] و [[width]] و [[height]]: اسم الملف ونوعه وأبعاده.
- [[file]]: موجود على الويب بس، وده الـ [[File]] الحقيقي بتاع المتصفح.

وفي الويب الـ picker طلع input ملفات عادي بـ [[accept="image/*"]] ومن غير اختيار متعدد.

---

## ٢. [[uploadAvatar]]

~~~text src/lib/device.ts
export async function uploadAvatar(asset: ImagePicker.ImagePickerAsset, token: string) {
  const form = new FormData();
~~~

- [[ImagePicker.ImagePickerAsset]]: نوع الصورة اللي رجعت من الـ picker.
- [[FormData]]: الشكل اللي الفورمات بترفع بيه ملفات. كل [[append]] بيضيف حقل.

~~~text src/lib/device.ts
  form.append('avatar', { uri: asset.uri, name: asset.fileName ?? 'avatar.jpg', type: asset.mimeType ?? 'image/jpeg' } as unknown as Blob);
~~~

السطر الأهم:

- [[avatar]]: اسم الحقل. لازم يطابق اللي السيرفر مستنيه ([[upload.single('avatar')]] في multer).
- [[{ uri, name, type }]]: ده **شكل خاص بـ React Native**. الـ networking بتاع RN لما يلاقي object فيه [[uri]] جوه FormData بيفهم «اقرا الملف ده من الجهاز وابعته» بالاسم والنوع ده. [[??]] بيدّي اسم ونوع افتراضي لو الـ picker مرجّعش.
- [[as unknown as Blob]]: TypeScript شايف إن [[append]] بياخد [[string]] أو [[Blob]]، والـ object ده ولا ده، فبنعمل cast على مرحلتين ([[unknown]] الأول عشان TypeScript يسمح).

~~~text src/lib/device.ts
  const res = await fetch($__bt$__{process.env.EXPO_PUBLIC_API_URL}/api/me/avatar$__bt, {
    method: 'POST',
    headers: { Authorization: $__btBearer $__{token}$__bt },
    body: form,
  });
~~~

- [[fetch]] مباشر مش [[api()]]، لأن [[api()]] بيحط [[Content-Type: application/json]].
- الـ headers فيها التوكن **بس**. الـ [[Content-Type]] لازم يتحط لوحده، لأنه بيبقى [[multipart/form-data; boundary=...]]، والـ boundary نص عشوائي بيفصل الحقول عن بعض جوه الـ body. لو كتبته بإيدك من غير boundary، السيرفر مش هيعرف يقسم الـ body.
- [[body: form]]: الـ FormData نفسها.

~~~text src/lib/device.ts
  if (!res.ok) throw new Error($__btUpload failed: $__{res.status}$__bt);
  return res.json();
}
~~~

لو فشل ارمي error فيه الـ status، غير كده رجّع رد السيرفر (فيه الـ URL الجديد).

---

## ٣. اللي وصل للسيرفر (ومفاجأة الويب)

السيرفر سجّل الـ header والـ body. الـ [[Content-Type]] اتحط لوحده بـ boundary:

~~~text لوج السيرفر
POST /api/me/avatar auth=Bearer a1 ct=multipart/form-data; boundary=----WebKitFormBoundaryZMmu08jxRtVjlSnn bytes=152
~~~

بس ١٥٢ بايت بس؟ ده الـ body:

~~~text الـ body
------WebKitFormBoundaryZMmu08jxRtVjlSnn
Content-Disposition: form-data; name="avatar"

[object Object]
------WebKitFormBoundaryZMmu08jxRtVjlSnn--
~~~

المتصفح ميعرفش شكل [[{ uri, name, type }]]، فحوّل الـ object لنص [[[object Object]]] وبعته. يعني الشكل ده **بيشتغل على Android و iOS بس** (ده من docs الـ RN). لو التطبيق ليه نسخة ويب، ابعت [[asset.file]] هناك. جربناها:

~~~text لوج السيرفر
POST /api/me/avatar auth=Bearer a2 ct=multipart/form-data; boundary=----WebKitFormBoundaryBsygnuAKJPPO87Qe bytes=799188
Content-Disposition: form-data; name="avatar"; filename="icon.png"
Content-Type: image/png
~~~

الملف كله وصل (٧٩٩٠٠٥ بايت حجم الصورة + الـ boundaries)، باسمه ونوعه. ولاحظ إن [[quality]] و [[allowsEditing]] ملهمش أثر على الويب: الملف هو الأصلي.

---

## ٤. الـ solCode: شاشة البروفايل

~~~text src/app/profile.tsx
  const { token } = useSession();
  const [uri, setUri] = useState<string | null>(null);
~~~

التوكن من الـ session، و [[uri]] الصورة المعروضة ([[null]] = الصورة الافتراضية).

~~~text src/app/profile.tsx
  const change = async () => {
    const asset = await pickAvatar();
    if (!asset || !token) return;
    const previous = uri;
    setUri(asset.uri);
~~~

اختار صورة. لو لغى أو مفيش توكن، اخرج. احفظ الصورة القديمة في [[previous]]، واعرض الجديدة **فورًا** من الجهاز قبل ما الرفع يبدأ.

~~~text src/app/profile.tsx
    try {
      const r = await uploadAvatar(asset, token);
      setUri(r.url);
    } catch {
      setUri(previous);
      Alert.alert('الرفع فشل', 'جرّب تاني');
    }
  };
~~~

نجح: اعرض الـ URL اللي السيرفر رجّعه. فشل: رجّع القديمة وقول للمستخدم. ده optimistic update للملفات. و [[catch]] من غير [[(e)]] مسموح لما مش محتاج الـ error نفسه.

~~~text src/app/profile.tsx
      <Image source={uri ? { uri } : require('@/assets/images/icon.png')} style={{ width: 96, height: 96, borderRadius: 48 }} />
      <Button title="تغيير الصورة" onPress={change} />
~~~

[[Image]] من [[expo-image]]: لو فيه [[uri]] اعرضه، غير كده صورة من ملفات المشروع بـ [[require]]. و [[borderRadius: 48]] نص العرض، فالصورة بتبقى دايرة. الشاشة دي عدّت [[tsc]] واتبنت في نسخة الويب.

للكاميرا بدل المعرض: [[requestCameraPermissionsAsync()]] وبعدين [[launchCameraAsync]] بنفس الإعدادات ونفس شكل الرد (من الـ docs، محتاجة جهاز).

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| إذن الصور | [[requestMediaLibraryPermissionsAsync()]] |
| فتح المعرض | [[launchImageLibraryAsync({ mediaTypes, allowsEditing, aspect, quality })]] |
| المستخدم لغى | [[r.canceled]] |
| الصورة | [[r.assets[0].uri]] |
| الرفع على الموبايل | [[form.append('avatar', { uri, name, type })]] |
| الرفع على الويب | [[form.append('avatar', asset.file)]] |
| الـ headers | التوكن بس، من غير [[Content-Type]] |

- اسم الحقل في [[append]] = اسم الحقل في [[upload.single()]] على السيرفر.
- [[Content-Type]] بإيدك = boundary ضايع.
- اعرض الصورة من الجهاز فورًا، وارجع للقديمة لو الرفع فشل.`,
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
          teach: R`## الفكرة: إذن، ثم قراءة واحدة، ثم عنوان

[[currentCity]] بتطلب إذن الموقع، وبتاخد قراءة واحدة بدقة متوسطة، وبتحوّل الإحداثيات لاسم المدينة. اتجرّب في مشروع Expo SDK 57 ([[expo-location]] 57.0.20): الكود عدّى [[npx tsc --noEmit]]، واتشغّل في نسخة الويب في Chrome headless بموقع متظبط من الـ test (ميدان التحرير تقريبًا: 30.0444، 31.2357). القراءة من GPS موبايل حقيقي والعنوان من خدمة النظام محتاجين جهاز، فدول من الـ docs.

---

## ١. الإذن

~~~text src/lib/location.ts
import * as Location from 'expo-location';

export async function currentCity() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;
~~~

- [[requestForegroundPermissionsAsync()]]: بيطلب إذن الموقع وانت فاتح التطبيق (درس «permissions» فيه النسخة الكاملة اللي بتتعامل مع الرفض الدائم).
- [[const { status } = ...]]: destructuring، خد خانة [[status]] بس من الرد.
- مش [[granted]]: رجّع [[null]]، والشاشة تعرض حاجة من غير موقع.

## ٢. قراءة واحدة

~~~text src/lib/location.ts
  const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
~~~

[[getCurrentPositionAsync]] بيطلب قراءة **جديدة** من الجهاز وبيستنى لحد ما تيجي (ممكن ثواني جوه مبنى). و [[accuracy]] بتحدد بيستخدم إيه:

| القيمة | الدقة التقريبية (من الـ docs) | الاستخدام |
|---|---|---|
| [[Accuracy.Lowest]] | حوالي ٣ كيلو | البلد |
| [[Accuracy.Low]] | حوالي كيلو | المدينة |
| [[Accuracy.Balanced]] | حوالي ١٠٠ متر | الفروع القريبة |
| [[Accuracy.High]] | حوالي ١٠ متر | توصيل، خرائط |
| [[Accuracy.Highest]] / [[BestForNavigation]] | أدق حاجة | ملاحة، وبتاكل بطارية |

كل ما الدقة تزيد، الـ GPS يشتغل أكتر والقراءة تتأخر والبطارية تخلص أسرع.

الرد ([[pos]]) object فيه [[coords]] ([[latitude]] و [[longitude]] و [[accuracy]] بالمتر و [[altitude]] وغيرهم) و [[timestamp]].

## ٣. الإحداثيات لعنوان

~~~text src/lib/location.ts
  const [place] = await Location.reverseGeocodeAsync(pos.coords);
~~~

- reverse geocoding = من رقمين لعنوان (المدينة والشارع). على Android بيستخدم خدمة جوجل وعلى iOS خدمة Apple.
- بيرجّع **array** عناوين، و [[const [place] = ...]] بياخد أول عنصر بس. لو الـ array فاضية، [[place]] يبقى [[undefined]].

## ٤. النتيجة

~~~text src/lib/location.ts
  return { lat: pos.coords.latitude, lng: pos.coords.longitude, city: place?.city ?? null };
}
~~~

[[place?.city]]: لو [[place]] موجود هات [[city]]، لو [[undefined]] رجّع [[undefined]] من غير ما تقع. و [[?? null]] بيحوّل [[undefined]] لـ [[null]]. السطر ده مكتوب كده لأن العنوان ممكن ميرجعش خالص، وده اللي حصل فعلًا على الويب:

~~~text الناتج (Chrome)
{"lat":30.0444,"lng":31.2357,"city":null}
~~~

- الإحداثيات جت من [[navigator.geolocation]] بتاع المتصفح (expo-location على الويب بيستخدمه)، وهي نفس الموقع اللي اديناه للمتصفح.
- [[city]] طلعت [[null]]: على الويب [[reverseGeocodeAsync]] مش موجودة أصلًا. الكود بتاع المكتبة بيرجّع array فاضية وبيطبع تحذير إن الـ Geocoding API اتشال من SDK 49. يعني لو مكتبتش [[?.]]، السطر كان هيقع.

---

## ٥. الـ solCode: أقرب فرع

~~~text src/lib/location.ts
type Branch = { name: string; lat: number; lng: number };
~~~

فرع ليه اسم وإحداثيات.

~~~text src/lib/location.ts
function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
~~~

ده قانون haversine: المسافة بين نقطتين على سطح كورة (مش خط مستقيم على ورقة).

- [[R = 6371]]: نص قطر الأرض بالكيلو، فالناتج بالكيلو.
- [[rad]]: الدوال المثلثية في JavaScript بتاخد radians مش درجات، والتحويل: الدرجة × π ÷ 180.
- [[dLat]] و [[dLng]]: الفرق في خط العرض والطول.
- [[h]]: الجزء الأساسي في القانون. [[** 2]] يعني تربيع.
- [[2 * R * Math.asin(Math.sqrt(h))]]: من [[h]] للزاوية بين النقطتين من مركز الأرض، وبعدين × نص القطر = طول القوس.

~~~text src/lib/location.ts
export function nearest(me: { lat: number; lng: number }, branches: Branch[]) {
  return branches.reduce((best, b) => (distanceKm(me, b) < distanceKm(me, best) ? b : best));
}
~~~

[[reduce]] بيلف على الفروع وماسك «الأحسن لحد دلوقتي» ([[best]]). من غير قيمة بداية، أول فرع بيبقى [[best]] الأول. ومع كل فرع: لو أقرب من [[best]] خليه هو الأحسن.

المثال اللي في آخر الـ solCode اتشغّل في نفس الصفحة:

~~~text الناتج (Chrome)
{"name":"مدينة نصر","lat":30.06,"lng":31.33}
~~~

والمسافات نفسها (Node 24):

~~~text الناتج
maadi 8.95 nasr 8.94
~~~

مدينة نصر كسبت بفرق ١٠ متر بس! ودقة [[Balanced]] حوالي ١٠٠ متر، يعني في الحقيقة الفرعين على نفس البعد. لو هتعرض «أقرب فرع»، اعرض المسافة جنبه عشان المستخدم يقرر.

ولما تغيّر الموقع من Extended controls في الـ Android emulator وتنادي الدالة تاني، النتيجة بتتغير (من الـ docs، محتاج emulator).

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| الإذن | [[requestForegroundPermissionsAsync()]] |
| قراءة واحدة | [[getCurrentPositionAsync({ accuracy: Accuracy.Balanced })]] |
| الإحداثيات | [[pos.coords.latitude]] و [[pos.coords.longitude]] |
| العنوان | [[reverseGeocodeAsync(coords)]]، وممكن يرجع فاضي |
| أقرب فرع | haversine + [[reduce]] |

- [[Balanced]] كفاية لأغلب الحالات، و [[Highest]] لحاجة زي «مدينتك» بطء وبطارية على الفاضي.
- [[watchPositionAsync]] للتتبّع المستمر، ولازم [[remove()]] لما الشاشة تتقفل.
- متعتمدش على العنوان: ممكن يرجع فاضي (وعلى الويب دايمًا فاضي).`,
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
          teach: R`## الفكرة: ٣ خطوات عشان الجهاز يستقبل push

المثال بيعمل حاجتين: بيقول للتطبيق يعرض الإشعار إزاي لو جه وهو مفتوح ([[setNotificationHandler]])، ودالة [[registerForPush]] بتعمل channel على Android، وتطلب الإذن، وتجيب الـ Expo push token اللي هتبعته للـ backend. الكود اتكتب في مشروع Expo SDK 57 ([[expo-notifications]] 57.0.22) وعدّى [[npx tsc --noEmit]]. الإشعارات نفسها محتاجة موبايل (والـ push محتاج development build)، فاللي بيحصل على الجهاز من الـ docs، وجربنا اللي بيحصل في نسخة الويب.

---

## ١. الـ imports

~~~text src/lib/push.ts
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
~~~

- [[expo-constants]]: بيقرا إعدادات التطبيق ([[app.json]]) وقت التشغيل، ومنها الـ [[projectId]].
- [[expo-notifications]]: الإشعارات local و push.
- [[Platform]]: عشان [[Platform.OS]] ([['android']] أو [['ios']] أو [['web']]).

## ٢. الإشعار وانت فاتح التطبيق

~~~text src/lib/push.ts
Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldPlaySound: false, shouldSetBadge: false, shouldShowBanner: true, shouldShowList: true }),
});
~~~

افتراضيًا، لو إشعار جه والتطبيق مفتوح قدام المستخدم، **مش بيظهر**. السطر ده برّه أي component (بيتنفذ مرة لما الملف يتحمّل) وبيقول: مع كل إشعار، رجّع الإعدادات دي:

| الخانة | القيمة | معناها |
|---|---|---|
| [[shouldShowBanner]] | [[true]] | يظهر شريط فوق الشاشة |
| [[shouldShowList]] | [[true]] | يتحط في قايمة الإشعارات |
| [[shouldPlaySound]] | [[false]] | من غير صوت |
| [[shouldSetBadge]] | [[false]] | ميغيّرش الرقم اللي على أيقونة التطبيق |

[[shouldShowBanner]] و [[shouldShowList]] هما الشكل الحالي، بدل [[shouldShowAlert]] القديم.

## ٣. channel على Android

~~~text src/lib/push.ts
export async function registerForPush(): Promise<string | null> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', { name: 'عام', importance: Notifications.AndroidImportance.DEFAULT });
  }
~~~

من Android 8، كل إشعار لازم يتبع channel (قناة). المستخدم بيشوف القنوات في إعدادات التطبيق ويقفل أو يفتح كل واحدة لوحدها (مثلًا «العروض» مقفولة و «الطلبات» شغالة).

- [['default']]: الـ id، والإشعارات بتختار القناة بيه.
- [[name: 'عام']]: الاسم اللي المستخدم بيشوفه في الإعدادات.
- [[importance]]: قد إيه الإشعار مهم. [[DEFAULT]] بيصوّت ويظهر في القايمة، و [[HIGH]] بيظهر banner فوق الشاشة كمان.

## ٤. الإذن

~~~text src/lib/push.ts
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return null;
~~~

على iOS دايمًا محتاج إذن، وعلى Android من 13 (إذن [[POST_NOTIFICATIONS]]). الرفض: [[null]].

## ٥. الـ token

~~~text src/lib/push.ts
  const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
  const { data } = await Notifications.getExpoPushTokenAsync({ projectId });
  return data;
}
~~~

- [[projectId]]: id المشروع على EAS (سيرفرات Expo). بيتكتب في [[app.json]] تحت [[extra.eas.projectId]] لما تعمل [[eas init]]. السطر بيدوّر عليه في مكانين، و [[?.]] في كل خطوة عشان لو أي حاجة ناقصة يرجع [[undefined]] من غير ما يقع.
- [[getExpoPushTokenAsync({ projectId })]]: بيرجّع object، و [[data]] فيها الـ token نفسه، شكله [[ExponentPushToken[xxxxxxxx]]]. ده اللي بتبعته للـ backend يتخزن مع المستخدم (token لكل جهاز، مش لكل مستخدم).

### السيرفر بيبعت إزاي

ده من docs الـ Expo Push Service: السيرفر بيبعت POST لـ [[https://exp.host/--/api/v2/push/send]] والـ body فيه [[to]] (الـ token) و [[title]] و [[body]] و [[data]]. و Expo بيوصّله لـ FCM (Android) أو APNs (iOS).

| | Android | iOS |
|---|---|---|
| Expo Go | push مش شغال من SDK 53 | local بس |
| development build | شغال | شغال على جهاز حقيقي بس |
| channel | لازم | مفيش |
| الإذن | Android 13+ | دايمًا |

---

## ٦. الـ solCode: تذكير local والضغط عليه

~~~text src/lib/push.ts
export function scheduleReminder(taskId: number) {
  return Notifications.scheduleNotificationAsync({
    content: { title: 'تذكير', body: 'متنساش المهمة', data: { taskId } },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 10 },
  });
}
~~~

- [[content]]: العنوان والنص، و [[data]] بيانات مخفية بتوصل مع الإشعار (هنا رقم المهمة).
- [[trigger]]: إمتى يظهر. [[TIME_INTERVAL]] مع [[seconds: 10]] = بعد ١٠ ثواني. وفيه أنواع تانية زي [[DATE]] و [[DAILY]].
- بترجّع Promise فيه id الإشعار (تقدر تلغيه بيه بعدين).

~~~text src/lib/push.ts
export function useNotificationNavigation() {
  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const taskId = response.notification.request.content.data?.taskId;
      if (taskId) router.push({ pathname: '/tasks/[id]', params: { id: String(taskId) } });
    });
    return () => sub.remove();
  }, []);
}
~~~

- custom hook (اسمه بيبدأ بـ [[use]]) تحطه في الـ root layout.
- [[addNotificationResponseReceivedListener]]: بيتنادى لما المستخدم **يضغط** على إشعار.
- [[response.notification.request.content.data]]: نفس الـ [[data]] اللي حطيناها، فبناخد [[taskId]].
- [[router.push]] لشاشة المهمة. [[String(taskId)]] لأن الـ params في الـ URL نصوص.
- [[return () => sub.remove()]]: الـ cleanup بتاع [[useEffect]]، بيشيل الـ listener لما الـ component يختفي. و [[[]]] = مرة واحدة بس.

---

## ٧. على الويب

ضغطنا زرار بينادي [[scheduleReminder(42)]] وبعدين [[registerForPush()]] في نسخة الويب في Chrome headless:

~~~text الناتج (Chrome)
notif: ERR The method or property Notifications.scheduleNotificationAsync is not available on web, are you sure you've linked all the native dependencies properly?
push: null
~~~

- الإشعارات المجدولة مش موجودة على الويب خالص.
- [[registerForPush]] رجّعت [[null]] لأن المتصفح الـ headless مدّاش إذن، فالدالة وقفت عند سطر الإذن زي ما هي مكتوبة.

يعني الإشعارات لازم تتجرب على موبايل. و [[setNotificationHandler]] و [[scheduleNotificationAsync]] و الـ listener اتكتبوا وعدّوا الـ typecheck، والسلوك على الجهاز (الإشعار بيظهر بعد ١٠ ثواني، والضغط بيفتح [[/tasks/42]]) من الـ docs.

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| الشكل والتطبيق مفتوح | [[setNotificationHandler]] |
| Android | [[setNotificationChannelAsync('default', ...)]] |
| الإذن | [[requestPermissionsAsync()]] |
| الـ token | [[getExpoPushTokenAsync({ projectId })]] |
| تذكير local | [[scheduleNotificationAsync({ content, trigger })]] |
| الضغط على الإشعار | [[addNotificationResponseReceivedListener]] + [[remove()]] |

- push = development build، مش Expo Go.
- مفيش [[projectId]] = مفيش token.
- token لكل جهاز، وامسح اللي Expo يقول عليه [[DeviceNotRegistered]].`,
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
          teach: R`## الفكرة: ستايل واحد بيشتغل في الاتجاهين

المثال component فيه صف: دايرة (صورة) واسم، وبيكتب جنب الاسم الاتجاه الحالي. مفيش ولا سطر بيقول «لو عربي اعمل كذا» في الـ layout: [[row]] و [[paddingStart]] و [[textAlign]] بيتقلبوا لوحدهم لما التطبيق يبقى RTL. اتجرّب في مشروع Expo SDK 57 بـ [[expo-localization]] 57.0.2: [[npx expo config]] للـ plugin، و Jest، ونسخة الويب في Chrome headless بلغة [[ar-EG]] و [[en-US]]. القلب الفعلي على Android و iOS محتاج جهاز (development build)، فده من الـ docs.

---

## ١. الـ plugin في [[app.json]]

~~~text app.json
"plugins": [
  ["expo-localization", { "supportsRTL": true }]
]
~~~

plugin يعني كود بيعدّل ملفات الـ native وقت الـ build. [[supportsRTL: true]] معناها «التطبيق ده جاهز يتقلب لو لغة الجهاز RTL». و [[forcesRTL: true]] (مش في المثال) معناها «دايمًا RTL حتى لو الجهاز إنجليزي».

[[npx expo config --type introspect]] بيوريك اللي الـ plugin هيكتبه:

~~~text الناتج
ExpoLocalization_supportsRTL = true
[{"$":{"name":"ExpoLocalization_supportsRTL","translatable":"false"},"_":"true"}]
~~~

السطر الأول في [[Info.plist]] بتاع iOS، والتاني في [[strings.xml]] بتاع Android. ولأنها إعدادات native، أي تغيير فيها محتاج build جديد، ومش بيشتغل في Expo Go.

## ٢. الـ imports ولغة الجهاز

~~~text src/components/RtlDemo.tsx
import { getLocales } from 'expo-localization';
import { I18nManager, StyleSheet, Text, View } from 'react-native';

export function RtlDemo() {
  const lang = getLocales()[0]?.languageCode ?? 'en';
~~~

- [[getLocales()]]: array لغات الجهاز بالترتيب اللي المستخدم اختاره. [[[0]]] أول لغة.
- [[?.languageCode]]: كود اللغة بس ([['ar']] من [['ar-EG']]). و [[?? 'en']] لو مفيش.
- [[I18nManager]]: من React Native نفسه، و [[I18nManager.isRTL]] بيقول التطبيق دلوقتي RTL ولا لأ.

اللي رجع في Chrome بلغة [[ar-EG]] (مختصر):

~~~text الناتج (Chrome)
{"languageTag":"ar-EG","languageCode":"ar","textDirection":"rtl","digitGroupingSeparator":"١","decimalSeparator":"٫","regionCode":"EG",...}
~~~

و [[textDirection: "rtl"]] جاهزة. وفي Jest الـ mock بتاع [[jest-expo]] بيرجّع [[en-US]] و [[isRTL false]]:

~~~text الناتج (Jest)
getLocales -> [{"languageTag":"en-US","languageCode":"en",...,"textDirection":"ltr",...}] | isRTL false
text -> [ 'Sara Ahmed', ' (', 'LTR', ')' ]
~~~

## ٣. الـ JSX

~~~text src/components/RtlDemo.tsx
  return (
    <View style={styles.row}>
      <View style={styles.avatar} />
      <Text style={styles.name}>{lang === 'ar' ? 'سارة أحمد' : 'Sara Ahmed'} ({I18nManager.isRTL ? 'RTL' : 'LTR'})</Text>
    </View>
  );
}
~~~

صف فيه دايرة واسم. الاسم بيتغير حسب اللغة، وجنبه الاتجاه.

## ٤. الستايل: كل سطر بيعمل إيه في RTL

~~~text src/components/RtlDemo.tsx
const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingStart: 16 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#cbd5e1' },
  name: { textAlign: 'left', writingDirection: 'auto' },
});
~~~

| الستايل | LTR | RTL (على الموبايل) |
|---|---|---|
| [[flexDirection: 'row']] | من الشمال لليمين | من اليمين للشمال: الدايرة يمين |
| [[paddingStart: 16]] | مسافة على الشمال | مسافة على اليمين |
| [[textAlign: 'left']] | شمال | **يمين** (RN بيعامل [[left]] كـ «البداية») |
| [[writingDirection: 'auto']] | | النص المختلط عربي وإنجليزي يتعرض صح |

- [[Start]] و [[End]] اسمهم logical properties: «البداية» و «النهاية» بدل «شمال» و «يمين». فيه منهم [[marginStart]] و [[paddingEnd]] و [[start]] و [[end]] و [[borderStartWidth]].
- [[gap: 12]] مسافة بين العناصر، مش بتتأثر بالاتجاه.
- [[borderRadius: 20]] نص العرض، فالـ View بقى دايرة.

---

## ٥. اللي حصل على الويب

على الويب مفيش [[I18nManager]] حقيقي: [[I18nManager.isRTL]] طلعت [[undefined]] (فالنص كتب LTR) حتى بلغة عربي. والصف مااتقلبش:

~~~text الناتج (Chrome، ar-EG، من غير dir)
direction: ltr  paddingLeft: 16px  paddingRight: 0px  avatarX: 16  nameX: 68
~~~

الطريقة على الويب (اللي في الـ deep): حط [[dir]] على View أب من [[getLocales()[0].textDirection]]:

~~~text demo.tsx
<View dir={getLocales()[0]?.textDirection ?? 'ltr'}>
  <RtlDemo />
</View>
~~~

~~~text الناتج (Chrome، ar-EG، بـ dir)
width: 1280  direction: rtl  paddingLeft: 0px  paddingRight: 16px  avatarX: 1224  nameX: 1121  textAlign: left
~~~

- الصف اتقلب: الدايرة عند x = 1224، يعني آخر الشاشة على اليمين (1280 - 16 padding - 40 عرضها).
- [[paddingStart]] بقى على اليمين ([[paddingRight: 16px]]).
- [[textAlign]] فضل [[left]] على الويب (CSS عادي)، بس النص هنا عرضه قد كلامه فمفيش فرق ظاهر.

ملحوظتين: لو غيّرت [[dir]] على [[html]] بعد ما الصفحة اترسمت، الصف اتقلب بس [[paddingStart]] فضل على الشمال، لأن react-native-web بيحسبه وقت الرسم. و TypeScript مش عارف [[dir]] على [[View]] (خطأ TS2769)، لأنها خاصية الويب بس، فلو استخدمتها هتحتاج تتعامل مع النوع.

---

## ٦. الـ solCode: سهم بيتقلب

~~~text src/components/RtlDemo.tsx
export function NextArrow() {
  return <Text style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}>→</Text>;
}
~~~

الـ layout بيتقلب لوحده، بس **الأيقونات والأسهم لأ**. سهم «التالي» [[→]] في العربي لازم يشاور شمال.

- [[transform]]: array تحويلات. [[scaleX: -1]] = مراية أفقية، و [[1]] = زي ما هو.
- فـ RTL مراية، و LTR عادي.

اتجرّب في Chrome: [[transform: matrix(1, 0, 0, 1, 0, 0)]] (يعني من غير قلب) لأن [[isRTL]] على الويب مش true. على موبايل RTL هيبقى [[matrix(-1, ...)]] (من الـ docs). والأيقونات اللي معناها مش اتجاه (ساعة، play) متقلبهاش.

---

## ٧. تغيير الاتجاه وقت التشغيل

ده من الـ docs (محتاج جهاز): [[I18nManager.forceRTL(true)]] بيحفظ الاختيار، بس [[isRTL]] مش بيتغير غير لما التطبيق يتحمّل من الأول، فبعدها [[Updates.reloadAsync()]] من [[expo-updates]]. ومش بيشتغل في Expo Go.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| التطبيق يتقلب مع لغة الجهاز | [[["expo-localization", { "supportsRTL": true }]]] + build جديد |
| دايمًا RTL | [[forcesRTL: true]] |
| مسافات وأماكن | [[Start]] و [[End]] مش [[Left]] و [[Right]] |
| صف | [[row]] عادي، متكتبش [[row-reverse]] بإيدك |
| سهم أو chevron | [[scaleX: I18nManager.isRTL ? -1 : 1]] |
| الويب | [[dir]] على View أب |

- [[isRTL]] بيتحدد مرة لما التطبيق يفتح، مش بيتغير وانت شغال.
- لو قلبت [[row]] بإيدك و RN قلبه كمان، بيرجع زي ما كان.`,
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
          teach: R`## الفكرة: ملف واحد فيه كل التنسيقات

بدل ما كل شاشة تكتب [[price + ' جنيه']] بطريقتها، المثال ملف [[format.ts]] فيه ٤ دوال: سعر، وتاريخ، ورقم بأرقام لاتينية، و «من كام ساعة». كلهم مبنيين على [[Intl]]، وده جزء من JavaScript نفسها موجود في Hermes (محرك JS بتاع RN) وفي Node والمتصفح. اتشغّلوا في Node 24.19 (ICU 78.3) وفي نسخة الويب في Chrome headless، والناتج كان واحد في الاتنين. Hermes نفسه على موبايل مجربتوش، والـ docs بتقول إن ناتجه ممكن يختلف شوية (مسافة أو علامة).

---

## ١. اللغة والـ locale

~~~text src/lib/format.ts
import { getLocales } from 'expo-localization';

const lang = getLocales()[0]?.languageCode ?? 'en';
const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
~~~

- [[lang]]: أول لغة في الجهاز ([['ar']] أو [['en']] ...).
- [[locale]]: كود فيه اللغة والبلد. [[ar-EG]] = عربي مصر، و [[en-US]] = إنجليزي أمريكا. البلد بتفرق: شكل العملة والتاريخ والأرقام.
- الاتنين برّه الدوال، فبيتحسبوا مرة واحدة لما الملف يتحمّل.

## ٢. السعر

~~~text src/lib/format.ts
export const formatPrice = (n: number) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: 'EGP' }).format(n);
~~~

- [[new Intl.NumberFormat(locale, options)]]: بيعمل formatter للأرقام.
- [[style: 'currency']] + [[currency: 'EGP']]: اكتبه كعملة، والعملة جنيه مصري (EGP كود العملة العالمي).
- [[.format(n)]]: حوّل الرقم لنص.

~~~text الناتج (Node 24 و Chrome)
ar-EG price 1250   "‏١٬٢٥٠٫٠٠ ج.م.‏"
en-US price 1250   "EGP 1,250.00"
~~~

في العربي: أرقام عربية ([[١٢٥٠]])، والفاصل بين الآلاف [[٬]] والعلامة العشرية [[٫]] (مش فاصلة ونقطة)، و [[ج.م.]]. وفيه حرفين مش باينين في الأول والآخر: [[U+200F]] اسمه Right-to-Left Mark، علامة اتجاه بتخلي النص يتعرض صح جنب كلام إنجليزي. عشان كده لو قارنت الناتج بنص كتبته بإيدك ([[=== '١٬٢٥٠٫٠٠ ج.م.']]) هيطلع [[false]].

## ٣. التاريخ

~~~text src/lib/format.ts
export const formatDate = (d: Date) =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(d);
~~~

[[dateStyle]] و [[timeStyle]] أشكال جاهزة ([['short']] و [['medium']] و [['long']] و [['full']]) بدل ما تحدد اليوم والشهر بإيدك. للحظة ٧ أكتوبر ٢٠٢٦ الساعة ٤:٣٠ العصر UTC، بتوقيت القاهرة:

~~~text الناتج
ar-EG date   "٠٧‏/١٠‏/٢٠٢٦، ٧:٣٠ م"
en-US date   "Oct 7, 2026, 7:30 PM"
~~~

[[م]] = مساءً. والساعة ٧:٣٠ مش ٤:٣٠ لأن الوقت بيتعرض بالـ time zone بتاع الجهاز (القاهرة +3 في الوقت ده من السنة).

## ٤. عربي بأرقام لاتينية

~~~text src/lib/format.ts
export const formatLatinDigits = (n: number) =>
  new Intl.NumberFormat('ar-EG-u-nu-latn').format(n);
~~~

[[-u-nu-latn]] امتداد Unicode جوه الـ locale: [[u]] = «فيه إعدادات زيادة»، و [[nu]] = numbering system، و [[latn]] = لاتيني. يعني «عربي مصر بس الأرقام 0123».

~~~text الناتج
ar-EG 1250             "١٬٢٥٠"
ar-EG-u-nu-latn 1250   "1,250"
~~~

تطبيقات مصرية كتير بتستخدم الأرقام اللاتينية حتى في الواجهة العربي. ده قرار منتج، والمهم يبقى واحد في التطبيق كله.

## ٥. «من كام ساعة»

~~~text src/lib/format.ts
const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
export const hoursAgo = (h: number) => rtf.format(-h, 'hour');
~~~

- [[RelativeTimeFormat]]: وقت نسبي («من ساعة»، «بكرة»).
- [[numeric: 'auto']]: يكتب كلمات لما ينفع («أمس» بدل «قبل يوم واحد»).
- [[rtf.format(-h, 'hour')]]: السالب = في الماضي، والوحدة ساعة.
- [[rtf]] متعمل مرة برّه الدالة، لأن إنشاء formatter أتقل من استخدامه.

~~~text الناتج
ar -1 hour      "قبل ساعة واحدة"
ar -3 hour      "قبل 3 ساعات"
ar-EG -3 hour   "قبل ٣ ساعات"
en -3 hour      "3 hours ago"
ar -1 day       "أمس"
~~~

لاحظ إن [[rtf]] معمول بـ [[lang]] ([['ar']]) مش [[locale]] ([['ar-EG']]). و [['ar']] لوحدها أرقامها لاتينية ([[3]]) في بيانات CLDR 48، و [['ar-EG']] عربية ([[٣]]). فالمثال بيطلّع السعر بأرقام عربية و «قبل 3 ساعات» بأرقام لاتينية في نفس الشاشة. لو عايز شكل واحد، ابعت نفس الـ locale لكل الـ formatters.

---

## ٦. الـ solCode: خط عربي

~~~text src/components/AppText.tsx
import { useFonts } from 'expo-font';
import { Text, type TextProps } from 'react-native';

export function useAppFonts() {
  return useFonts({ Cairo: require('@/assets/fonts/Cairo-Regular.ttf'), 'Cairo-Bold': require('@/assets/fonts/Cairo-Bold.ttf') });
}
~~~

- [[useFonts]] من [[expo-font]]: بيحمّل ملفات الخطوط وبيرجّع [[[loaded, error]]]. تناديه مرة في الـ root layout، ومتعرضش الشاشات غير لما [[loaded]] يبقى [[true]].
- المفتاح ([[Cairo]] و [['Cairo-Bold']]) هو الاسم اللي هتكتبه في [[fontFamily]]. والوزن العريض ملف لوحده، لأن [[fontWeight: 'bold']] مع خط custom على Android مش بيشتغل في أغلب الحالات.
- [[require('...ttf')]]: الملف نفسه بيتحط جوه الـ bundle.

~~~text src/components/AppText.tsx
export function AppText({ style, ...props }: TextProps) {
  return <Text {...props} style={[{ fontFamily: 'Cairo', writingDirection: 'auto' }, style]} />;
}
~~~

- [[{ style, ...props }]]: خد [[style]] لوحده، والباقي كله في [[props]] (rest).
- [[{...props}]]: ابعت الباقي لـ [[Text]] زي ما هو.
- [[style={[default, style]}]]: الستايل في RN ممكن يبقى array، واللي بعد بيكسب. فالخط افتراضي، وأي ستايل بتبعته يغطي عليه.

الكود عدّى [[npx tsc --noEmit]]. تحميل الخط فعليًا محتاج ملفات Cairo في [[assets/fonts]] وتشغيل على جهاز، فالجزء ده من docs الـ [[expo-font]].

---

## الخلاصة

| عايز | الكود | الناتج بـ ar-EG |
|---|---|---|
| سعر | [[NumberFormat(locale, { style: 'currency', currency: 'EGP' })]] | ‏١٬٢٥٠٫٠٠ ج.م.‏ |
| تاريخ | [[DateTimeFormat(locale, { dateStyle, timeStyle })]] | ٠٧‏/١٠‏/٢٠٢٦، ٧:٣٠ م |
| أرقام لاتينية | [[ar-EG-u-nu-latn]] | 1,250 |
| وقت نسبي | [[RelativeTimeFormat(lang, { numeric: 'auto' })]] | قبل ٣ ساعات |
| خط | [[useFonts]] مرة + [[AppText]] | |

- ابعت نفس الـ locale لكل الـ formatters.
- متقارنش ناتج [[Intl]] بالحرف في الاختبارات: فيه علامات مخفية، والـ ICU بيختلف بين Node و Hermes.`,
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
          teach: R`## الفكرة: قايمة شات بـ ٣ أنواع صفوف، والـ views بتتعاد

المثال شاشة شات: component لصف واحد ([[MessageRow]]) بيرسم ٣ أشكال، وقايمة [[FlashList]] بترسم الرسايل. اتجرّب في مشروع Expo SDK 57 بـ [[@shopify/flash-list]] 2.0.2 (اللي [[npx expo install]] ركّبها)، في نسخة الويب في Chrome headless: قايمة فيها ٥٠٠ رسالة، وتجربة الـ like من الـ try. السرعة الحقيقية على موبايل (وفي release build) محتاجة جهاز.

---

## ١. النوع

~~~text src/components/Chat.tsx
import { FlashList } from '@shopify/flash-list';
import { Text, View } from 'react-native';

type Msg = { id: string; kind: 'text' | 'image' | 'day'; body: string };
~~~

[[kind]] نوعه union من ٣ نصوص بس: [['text']] أو [['image']] أو [['day']] (فاصل التاريخ). TypeScript هيرفض أي قيمة تانية.

## ٢. الصف

~~~text src/components/Chat.tsx
function MessageRow({ msg }: { msg: Msg }) {
  if (msg.kind === 'day') return <Text style={{ textAlign: 'center', color: '#64748b', padding: 8 }}>{msg.body}</Text>;
  return (
    <View style={{ padding: 12 }}>
      <Text>{msg.kind === 'image' ? '📷 صورة' : msg.body}</Text>
    </View>
  );
}
~~~

- فاصل التاريخ: [[Text]] لوحده في النص بلون رمادي. شجرة مختلفة خالص عن الرسالة.
- الرسالة: [[View]] فيه [[Text]]. لو صورة اكتب «📷 صورة»، غير كده النص.

## ٣. القايمة

~~~text src/components/Chat.tsx
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
}
~~~

| الـ prop | بيعمل إيه |
|---|---|
| [[data]] | الـ array كلها |
| [[keyExtractor]] | مفتاح ثابت لكل عنصر (الـ [[id]])، عشان القايمة تعرف مين هو مين لما البيانات تتغير |
| [[getItemType]] | نوع كل عنصر. FlashList بيعمل pool لكل نوع، فالـ view بتاع فاصل تاريخ مبيتعادش لرسالة |
| [[renderItem]] | بيرسم عنصر. بياخد object فيه [[item]]، و [[({ item })]] destructuring |
| [[maintainVisibleContentPosition]] | للشات: [[startRenderingFromBottom]] تبدأ من تحت (آخر رسالة)، والمكان بيفضل ثابت لما رسايل تتضاف |

نفس API بتاع FlatList تقريبًا. وفي v2 مفيش [[estimatedItemSize]]: بتقيس الأحجام لوحدها.

### recycling يعني إيه

FlatList: العنصر اللي بيطلع من الشاشة بيتشال (unmount)، واللي داخل بيتعمل جديد (mount). FlashList: بيحتفظ بعدد صغير من الـ views، واللي طلع من فوق بيتعاد للعنصر الداخل من تحت بـ props جديدة بس.

في Chrome، القايمة فيها ٥٠٠ رسالة، واللي في الصفحة فعلًا:

~~~text الناتج (Chrome)
chat rows in DOM (500 messages): 33
~~~

٣٣ صف بس للي ظاهر وشوية حواليه، مش ٥٠٠.

---

## ٤. الـ try: الـ state بتمشي مع الـ view

لو حطيت [[useState]] جوه الصف:

~~~text StateRow
function StateRow({ msg }: { msg: Msg }) {
  const [liked, setLiked] = useState(false);
  ...
~~~

قايمة ٣٠٠ رسالة، عملنا like لأول رسالة، ونزلنا لتحت:

~~~text الناتج (Chrome)
state | rows in DOM: 35 | liked: [ 'رسالة 0' ]
state | after scrolling down, liked rows visible: [ 'رسالة 66' ]
~~~

رسالة 66 عليها ♥ ومحدش داس عليها! الـ [[useState]] عايش في الـ component، والـ component ده نفسه (بالـ view بتاعه) اتعاد لرسالة 66 ومعاه [[liked = true]].

## ٥. الـ solCode: [[useRecyclingState]]

~~~text src/components/Chat.tsx
import { useRecyclingState } from '@shopify/flash-list';
import { Pressable, Text, View } from 'react-native';

function MessageRow({ msg }: { msg: Msg }) {
  const [liked, setLiked] = useRecyclingState(false, [msg.id]);
~~~

زي [[useState]] بالظبط، بس بياخد array تاني ([[[msg.id]]]): لما أي قيمة فيها تتغير (يعني الـ view اتعاد لرسالة تانية)، الـ state ترجع للقيمة الأولى ([[false]]).

~~~text src/components/Chat.tsx
  return (
    <View style={{ padding: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text>{msg.body}</Text>
      <Pressable onPress={() => setLiked(!liked)}>
        <Text>{liked ? '♥' : '♡'}</Text>
      </Pressable>
    </View>
  );
}
~~~

صف: النص على جنب، والقلب على الجنب التاني ([[space-between]]). الضغطة بتقلب [[liked]].

~~~text الناتج (Chrome)
recycling | rows in DOM: 35 | liked: [ 'رسالة 0' ]
recycling | after scrolling down, liked rows visible: []
~~~

مفيش ♥ غلط. بس خد بالك: لو رجعت لرسالة 0، الـ like بتاعها ضاع كمان، لأن الـ state اتمسحت. الحل الصح لبيانات حقيقية: الـ like جزء من الـ data (من السيرفر أو store)، والصف بيقراه من [[props]].

---

## الخلاصة

| | FlatList | FlashList |
|---|---|---|
| العنصر اللي بيطلع | unmount | الـ view بيتعاد لعنصر تاني |
| [[useState]] جوه الصف | بيضيع لما يطلع | بيظهر على عنصر تاني |
| أنواع مختلفة | | [[getItemType]] |
| حجم العنصر | | v2 بتقيسه لوحدها |

- مفتاح ثابت في [[keyExtractor]]، ومتحطش [[key]] على العنصر جوه [[renderItem]] (بيمنع إعادة الاستخدام).
- state العنصر في الـ data، أو [[useRecyclingState]] لحاجة مؤقتة.
- قيس السرعة في release build على موبايل متوسط، مش dev.`,
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
          teach: R`## الفكرة: لما مهمة واحدة تتغير، صف واحد بس يترسم

المثال قايمة مهام: صف ملفوف في [[memo]]، وقايمة بتعدّي للصف دالة [[onToggle]] ثابتة. الهدف إن قلب مهمة واحدة يعيد رسم الصف ده بس مش القايمة كلها. اتجرّب في مشروع Expo SDK 57 بطريقتين: Jest (من غير React Compiler) ونسخة الويب في Chrome headless (بالـ compiler، زي التطبيق)، وعدّينا رسم الصفوف بعداد جوه الصف. React Native DevTools والـ Profiler محتاجين التطبيق شغال على جهاز أو emulator.

---

## ١. الـ imports والنوع

~~~text src/components/TaskList.tsx
import { memo, useCallback } from 'react';
import { FlatList, Pressable, Text } from 'react-native';

type Task = { id: number; title: string; done: boolean };
~~~

[[memo]] و [[useCallback]] من React نفسها. التفاصيل الكاملة في «تاب React»، وهنا بنشوفهم في قايمة RN.

## ٢. الصف في [[memo]]

~~~text src/components/TaskList.tsx
const TaskRow = memo(function TaskRow({ task, onToggle }: { task: Task; onToggle: (id: number) => void }) {
  return (
    <Pressable onPress={() => onToggle(task.id)}>
      <Text style={{ padding: 16, textDecorationLine: task.done ? 'line-through' : 'none' }}>{task.title}</Text>
    </Pressable>
  );
});
~~~

- [[memo(Component)]]: بيرجّع نسخة من الـ component **مش بتعيد الرسم** لو الـ props هي هي. «هي هي» يعني نفس المرجع ([[===]])، مش نفس الشكل: object جديد بنفس القيم = props اتغيرت.
- [[function TaskRow(...)]] باسم جوه [[memo]] عشان الاسم يظهر في DevTools.
- [[onToggle: (id: number) => void]]: نوع الدالة: بتاخد رقم ومبترجعش حاجة.
- [[textDecorationLine: task.done ? 'line-through' : 'none']]: خط على النص لو المهمة خلصت.

## ٣. القايمة و [[useCallback]]

~~~text src/components/TaskList.tsx
export function TaskList({ tasks, onToggle }: { tasks: Task[]; onToggle: (id: number) => void }) {
  const renderItem = useCallback(({ item }: { item: Task }) => <TaskRow task={item} onToggle={onToggle} />, [onToggle]);
  return <FlatList data={tasks} keyExtractor={(t) => String(t.id)} renderItem={renderItem} />;
}
~~~

- [[useCallback(fn, [onToggle])]]: يرجّع **نفس** الدالة في كل render طول ما [[onToggle]] متغيرتش. من غيره [[renderItem]] دالة جديدة كل مرة.
- [[keyExtractor={(t) => String(t.id)}]]: FlatList عايز المفتاح نص.

ولما مهمة تتقلب: الأب بيعمل array [[tasks]] جديدة فيها object جديد للمهمة دي بس، والباقي نفس الـ objects. فـ [[memo]] بيلاقي [[task]] و [[onToggle]] زي ما هم في ٩ صفوف فبيسيبهم.

> الشرط: [[onToggle]] نفسها لازم تكون ثابتة من الأب (بـ [[useCallback]] أو الـ compiler). لو الأب كتبها inline، هي جديدة كل render، والـ [[memo]] بيبقى ملوش لازمة.

---

## ٤. العدّ في Jest (من غير compiler)

١٠ مهام، وضغطنا على مهمة ٣ مرة، وعدّينا الصفوف اللي اترسمت:

~~~text الناتج (Jest)
compiled -> false
no memo -> row renders after one toggle: 10
memo + stable onToggle -> row renders after one toggle: 1
memo + new onToggle each render -> row renders after one toggle: 10
~~~

- [[compiled -> false]]: Jest مش بيشغّل الـ React Compiler (الكود اللي اتحوّل مفيهوش علامة الـ cache بتاعته).
- من غير [[memo]]: الـ ١٠ اترسموا.
- [[memo]] + [[onToggle]] ثابتة: واحد بس.
- [[memo]] + [[onToggle]] جديدة كل مرة: الـ ١٠ تاني، الـ memo اتكسر.

## ٥. ومع الـ React Compiler (الويب)

قالب SDK 57 فيه [[experiments.reactCompiler: true]] في [[app.json]]، والـ bundle بتاع الويب فيه ٣٩ مكان عليهم علامة الـ cache بتاعة الـ compiler ([[react.memo_cache_sentinel]])، يعني اشتغل.

~~~text الناتج (Chrome، TaskList بتاع المثال)
renders after one toggle 1 task3 decoration line-through
~~~

~~~text الناتج (Chrome، نسخة من غير memo ولا useCallback)
compiler on, no memo: renders from reset+read alone 0 | after one toggle 10
~~~

المثال: صف واحد اترسم، وعليه الخط. والنسخة اللي من غير [[memo]] ولا [[useCallback]]، والـ compiler شغال، برضه رسمت الـ ١٠. ليه؟ الـ compiler بيكاش الحاجات اللي جوه الـ render بتاع الـ component (القيم، والدوال، والـ JSX). لكن FlatList بينادي [[renderItem]] بنفسه لكل صف، فبيطلع element جديد كل مرة، والـ compiler مش بيلف الصف في [[memo]] لوحده. يعني في القوايم [[memo]] على الصف لسه لازم.

---

## ٦. القياس على الجهاز

ده من docs الـ RN (محتاج تطبيق شغال):

1. [[npx expo start]] ودوس [[j]]: بيفتح React Native DevTools (نفس شكل Chrome DevTools).
2. تاب Profiler، وفعّل «Highlight updates when components render».
3. اقلب مهمة: الصفوف اللي اترسمت بتنوّر.

و «Perf Monitor» من قايمة الـ dev بيعرض FPS للـ JS thread والـ UI thread. وأي قياس نهائي على release build، لأن الـ dev mode أبطأ بكتير.

---

## الخلاصة

| الحالة | صفوف اترسمت من ١٠ |
|---|---|
| من غير memo | 10 |
| [[memo]] + [[onToggle]] ثابتة | 1 |
| [[memo]] + [[onToggle]] جديدة كل مرة | 10 |
| compiler شغال، من غير [[memo]] | 10 |

- [[memo]] بيقارن بالمرجع، فأي دالة أو object جديد في الـ props بيكسره.
- الـ compiler بيشيل عنك أغلب [[useMemo]] و [[useCallback]] جوه الـ component، بس صف القايمة لسه محتاج [[memo]].
- قيس الأول، وبعدين صلّح.`,
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
          sol: R`من غير memo ومن غير compiler: كل الصفوف الظاهرة بتتلوّن مع كل toggle (لأن [[tasks]] array جديد والأب بيعيد رسم كل حاجة). مع [[memo]] و [[onToggle]] ثابتة: الصف اللي اتغير بس. مع الـ compiler شغال ومن غير memo يدوي: كل الصفوف برضه (اتجرّب على الويب: ١٠ من ١٠)، لأن FlatList بينادي [[renderItem]] لكل صف من برّه الـ component، فالـ compiler مبيقدرش يكاش الـ JSX ده، ومبيلفّش الـ component في [[memo]] لوحده. فصفوف القوايم لسه محتاجة [[memo]].

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
          teach: R`## الفكرة: قيمة عايشة على الـ UI thread، وستايل بيتحسب منها

المثال زرار قلب: لما تدوس، القلب بيكبر لـ 1.4 ويرجع لـ 1 بحركة spring، وبعدين بينادي [[onLike]]. الحركة كلها بتتحسب برّه الـ JS thread. اتجرّب في مشروع Expo SDK 57 ([[react-native-reanimated]] 4.5.1 و [[react-native-worklets]] 0.10.1، متركبين في القالب): اختبار Jest، ونسخة الويب في Chrome headless قسنا فيها الـ transform وسط الحركة. فرق الـ UI thread عن الـ JS thread (الـ try) محتاج موبايل، لأن الويب فيه thread واحد.

---

## ١. الـ imports

~~~text src/components/LikeButton.tsx
import { Pressable, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';
~~~

| الاسم | هو إيه |
|---|---|
| [[Animated]] (default) | فيه [[Animated.View]] و [[Animated.Text]]: components بتقبل ستايل متحرك |
| [[useSharedValue]] | قيمة بتتشاف من الـ JS thread والـ UI thread |
| [[useAnimatedStyle]] | ستايل بيتحسب من shared values |
| [[withSpring]] | حركة spring (زي زنبرك: بتعدّي الهدف شوية وترجع) |
| [[withSequence]] | يشغّل كذا حركة ورا بعض |

## ٢. القيمة والستايل

~~~text src/components/LikeButton.tsx
export function LikeButton({ onLike }: { onLike: () => void }) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
~~~

- [[useSharedValue(1)]]: قيمة تبدأ بـ 1 (الحجم الطبيعي). بتقراها وتغيّرها بـ [[scale.value]]. ولما تتغير **مفيش re-render** للـ component، عكس [[useState]].
- [[useAnimatedStyle(() => (...))]]: الدالة اللي جواها اسمها **worklet**: دالة JS بتتنسخ لـ runtime JS تاني صغير شغال على الـ UI thread (ده شغل [[react-native-worklets]] والـ babel plugin بتاعه). كل ما [[scale.value]] تتغير، الدالة دي بتتنفذ هناك وبتحدّث الـ view مباشرة.
- [[transform: [{ scale: scale.value }]]]: [[scale]] بيكبّر أو يصغّر من غير ما يغيّر الـ layout حوالين العنصر.

## ٣. الزرار

~~~text src/components/LikeButton.tsx
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="إعجاب"
      onPress={() => {
        scale.value = withSequence(withSpring(1.4), withSpring(1));
        onLike();
      }}>
~~~

- [[accessibilityRole="button"]] و [[accessibilityLabel="إعجاب"]]: قارئ الشاشة بيقول «إعجاب، زرار»، والاختبار بيلاقيه بيهم ([[getByRole('button', { name: 'إعجاب' })]]).
- [[scale.value = withSequence(withSpring(1.4), withSpring(1))]]: مش بنحط رقم، بنحط **وصف حركة**: «spring لـ 1.4، وبعدها spring لـ 1». السطر ده بيتنفذ مرة واحدة على الـ JS thread، وكل الـ frames بتتحسب بعد كده على الـ UI thread.
- [[onLike()]]: الفعل نفسه (طلب للسيرفر مثلًا) على الـ JS thread عادي.

~~~text src/components/LikeButton.tsx
      <Animated.View style={style}>
        <Text>♥</Text>
      </Animated.View>
    </Pressable>
  );
}
~~~

[[Animated.View]] بياخد الستايل المتحرك. [[View]] العادي مش هيفهمه.

---

## ٤. اتجرّب إزاي

### Jest

~~~text __tests__/like.test.tsx
const onLike = jest.fn();
await render(<LikeButton onLike={onLike} />);
await fireEvent.press(screen.getByRole('button', { name: 'إعجاب' }));
expect(onLike).toHaveBeenCalledTimes(1);
~~~

~~~text الناتج (Jest)
PASS __tests__/like.test.tsx
~~~

ده محتاج الـ setup اللي في درس «mocks للـ native modules». من غيره الملف بيقع قبل ما يبدأ.

### الويب

ضغطنا القلب، وقرينا الـ transform بتاع الـ [[Animated.View]] بعد ١٠٠ مللي ثانية وبعد ١.٦ ثانية:

~~~text الناتج (Chrome)
likes 1 transform at 100ms matrix(1.31733, 0, 0, 1.31733, 0, 0) after 1.6s matrix(1, 0, 0, 1, 0, 0)
~~~

- [[matrix(a, 0, 0, d, 0, 0)]] طريقة المتصفح يكتب بيها الـ transform، و [[a]] و [[d]] هما الـ scale أفقي ورأسي. فبعد ١٠٠ms القلب كان 1.317 (في السكة لـ 1.4)، وبعد ١.٦ ثانية رجع 1.
- [[likes 1]]: [[onLike]] اتنادت مرة.

على الويب مفيش UI thread منفصل: Reanimated بيشتغل في نفس thread الصفحة. فكلام «الحركة بتفضل ناعمة والـ JS مشغول» ده على Android و iOS بس (من الـ docs).

---

## ٥. الـ try: لو الـ JS thread وقف

ده من الـ docs (محتاج جهاز): loop بيشغّل الـ JS thread ثانيتين:

~~~text loop
const end = Date.now() + 2000; while (Date.now() < end) {}
~~~

| | لو الحركة بدأت قبل الـ loop | لو ضغطت أثناء الـ loop |
|---|---|---|
| Reanimated | بتكمل ناعمة (UI thread) | الضغطة بتستنى الـ loop يخلص، لأن [[onPress]] على JS |
| [[Animated]] من غير [[useNativeDriver]] | بتقف مكانها | نفس الكلام |

يعني Reanimated بيحمي الحركة، مش الـ events. وعشان كده [[react-native-gesture-handler]] معاه: اللمس نفسه يتعالج على الـ UI thread.

---

## الخلاصة

| الحتة | بتتنفذ فين |
|---|---|
| [[useSharedValue]] | القيمة متشافة من الاتنين |
| [[useAnimatedStyle(() => ...)]] | worklet على الـ UI thread |
| [[scale.value = withSpring(...)]] | بيبدأ من JS مرة، والـ frames على UI |
| [[onPress]] و [[onLike]] | JS thread |

- [[scale.value]] تتقري جوه worklet، مش في الـ render.
- حرّك [[transform]] و [[opacity]]، مش [[width]] و [[height]] (الـ layout بيتحسب كل frame).
- عشان تنادي دالة JS عادية (زي setState) من جوه worklet: [[scheduleOnRN]].`,
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
