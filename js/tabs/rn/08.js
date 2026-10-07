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
    }
]);
