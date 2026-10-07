// تكملة تاب rn: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/rn/01.js (شرح حقول الدرس في أوله)
MORE("rn", [
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
