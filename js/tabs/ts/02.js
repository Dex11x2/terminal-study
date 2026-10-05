// تكملة تاب ts: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ts/01.js (شرح حقول الدرس في أوله)
MORE("ts", [
    {
      t: "تطلّع أنواع من أنواع",
      l: 2,
      n: "بدل ما تكتب نفس الشكل مرتين، خده من الكود الموجود أو عدّل عليه بالـ utility types",
      items: [
        {
          cmd: "keyof و typeof و T[K]",
          title: "تاخد الأنواع من الكود الموجود بدل ما تكررها",
          desc: R`[[typeof x]] في مكان نوع بيطلّع نوع المتغير x. و [[keyof T]] بيطلّع union أسماء الخصايص. و [[T["name"]]] (indexed access) بيطلّع نوع خاصية واحدة.

التلاتة مع بعض بيخلوا الكود هو المصدر الوحيد: تغيّر الـ object، والأنواع اللي طالعة منه تتغير لوحدها.`,
          example: R`const config = { apiUrl: "https://api.example.com", retries: 3, debug: false };
type Config = typeof config;       // { apiUrl: string; retries: number; debug: boolean }
type ConfigKey = keyof Config;     // "apiUrl" | "retries" | "debug"
function getSetting<K extends ConfigKey>(key: K): Config[K] {
  return config[key];
}
const r = getSetting("retries");   // number
type User = { id: string; role: "admin" | "user"; address: { city: string } };
type Role = User["role"];          // "admin" | "user"
type City = User["address"]["city"]; // string
const ROLES = ["admin", "user", "guest"] as const;
type AnyRole = (typeof ROLES)[number]; // "admin" | "user" | "guest"`,
          try: R`ضيف خاصية [[timeout: 5000]] لـ [[config]] ولاحظ إن [[ConfigKey]] اتحدّث لوحده، و [[getSetting("timeout")]] بقى مسموح. وبعدين جرّب [[type X = typeof User]] وشوف ليه غلط.`,
          flag: "script",
          deep: {
            why: R`لو عندك object إعدادات أو ليستة ثوابت وكتبت نوعها بإيدك جنبها، هتنسى تحدّث واحد منهم. وفي مشروع حقيقي كان فيه [[role: IUser["role"]]] بدل ما يكرر union الأدوار: لو دور اتضاف في الموديل، بيوصل هنا لوحده.`,
            how: R`[[typeof]] ليه معنيين حسب المكان: في كود عادي ([[typeof x === "string"]]) ده JS بيرجع string وقت التشغيل، وفي مكان نوع ([[type C = typeof config]]) ده TS بيطلّع النوع وقت الفحص. والتاني بيشتغل على القيم بس (متغيرات ودوال و imports)، مش على الأنواع.

[[keyof T]] بيطلّع union من أسماء الخصايص كـ literals. ولو T فيها index signature زي [[{ [key: string]: number }]] الناتج [[string | number]]، لأن مفاتيح JS الرقمية بتتحول strings.

[[T[K]]] بيقرا نوع خاصية. و [[T[keyof T]]] بيطلّع union كل أنواع القيم. ومع array: [[Arr[number]]] نوع العنصر، وده اللي بيخلي [[(typeof ROLES)[number]]] يطلّع union القيم من ليستة [[as const]].`,
            when: "ثوابت وإعدادات عايز نوعها منها، وأنواع مكتبات مش مصدّرة (خدها بـ [[typeof]] أو [[ReturnType]])، وخصايص من موديل كبير زي [[User[\"role\"]]].",
            mistakes: R`[[typeof]] على نوع مش قيمة: [[typeof User]] و User نوع. و [[keyof obj]] من غير [[typeof]] فيطلع خطأ لأن obj قيمة، والصح [[keyof typeof obj]]. وتستغرب إن [[Object.keys(obj)]] مش راجعة [[keyof]] (راجع object types في المستوى ١).`
          },
          lines: [
            "object عادي في الكود.",
            R`[[typeof]] في مكان نوع: النوع بتاع config.`,
            "أسماء خصايصه كـ union.",
            "K مفتاح من المفاتيح، والناتج نوع الخاصية دي بالظبط.",
            "قراية بالمفتاح.",
            "قفلة.",
            R`[[r]] نوعها number، مش union كل الأنواع.`,
            "نوع فيه خاصية literal و object جواه.",
            R`indexed access: نوع خاصية واحدة. زي [[IUser["role"]]] في مشروع حقيقي.`,
            "ينفع تنزل جوه.",
            "ليستة ثابتة.",
            R`[[[number]]] يعني «نوع أي عنصر»: union القيم.`
          ],
          sol: R`بعد ما تضيف [[timeout: 5000]]: [[ConfigKey]] بقى [["apiUrl" | "retries" | "debug" | "timeout"]] لوحده، و [[getSetting("timeout")]] مسموح ونوعه [[number]]، من غير ما تلمس أي نوع.

و [[type X = typeof User]] بيطلّع 'User' only refers to a type, but is being used as a value here (TS2693). [[typeof]] في مكان النوع بتاخد نوع قيمة موجودة وقت التشغيل (متغير أو دالة)، و [[User]] نوع ملوش قيمة. لو عايز النوع نفسه اكتب [[type X = User]].`
        },
        {
          cmd: "Partial و Required و Readonly",
          title: "نسخة من النوع كل خصايصه اختيارية، أو إجبارية، أو للقراية بس",
          desc: R`[[Partial<T>]] بيحط [[?]] على كل خصايص T: مثالي لـ PATCH أو form بيتملي على مراحل. [[Required<T>]] العكس: بيشيل كل [[?]]. و [[Readonly<T>]] بيحط [[readonly]] على الكل.

التلاتة utility types جاهزة في TS، مش محتاج تسطّب حاجة.`,
          example: R`type User = { id: string; name: string; email: string; bio?: string };
type UserPatch = Partial<Omit<User, "id">>;
function updateUser(id: string, patch: UserPatch) {
  return { id, ...patch };
}
updateUser("u1", { name: "Sara" });
updateUser("u1", { age: 5 }); // خطأ: age مش في User
type Settings = { theme?: "light" | "dark"; lang?: "ar" | "en" };
const defaults: Required<Settings> = { theme: "light", lang: "ar" };
const frozen: Readonly<User> = { id: "1", name: "A", email: "a@example.com" };
frozen.name = "B"; // خطأ: readonly`,
          try: R`امسح [[lang]] من [[defaults]] وشوف [[Required]] بيمسكها. وبعدين اعمل [[function merge(s: Settings): Required<Settings>]] ترجّع [[{ ...defaults, ...s }]].`,
          flag: "script",
          deep: {
            why: "من غيرهم هتكتب [[UserPatch]] بإيدك نسخة من User بعلامات استفهام، وأول ما تضيف خاصية لـ User تنسى تضيفها هنا. الـ utility types بتخلي الأنواع المشتقة تتبع الأصل لوحدها.",
            how: R`دول mapped types مكتوبين في مكتبة TS نفسها (lib.es5.d.ts)، مثلًا [[type Partial<T> = { [P in keyof T]?: T[P] }]]: بيلف على كل مفتاح ويحط [[?]]. هتكتب زيهم في درس mapped types.

التلاتة سطحيين: [[Partial<User>]] بيخلي [[address]] اختيارية، بس لو موجودة لازم تبقى كاملة. لو عايز عمق محتاج نوع recursive بتكتبه انت (DeepPartial).

و [[Partial]] مع PATCH فيه فخ: [[{}]] مقبول، يعني request فاضي يعدّي. لو محتاج «حاجة واحدة على الأقل»، افحص ده في الكود (أو Zod بـ refine).

و [[Readonly]] فحص وقت الكتابة بس، ومبيعملش [[Object.freeze]].`,
            when: "[[Partial]] للتحديث الجزئي وللـ forms. و [[Required]] للإعدادات بعد ما تدمج الافتراضي. و [[Readonly]] للـ state والـ props اللي مينفعش تتعدّل.",
            mistakes: R`[[Partial<User>]] لـ PATCH ومعاه [[id]] و [[createdAt]]: العميل يقدر يبعت id جديد. شيلهم بـ [[Omit]] الأول. وتفتكر إن Partial عميق.`
          },
          lines: [
            "موديل فيه خاصية اختيارية.",
            R`كل الخصايص اختيارية ما عدا id اللي اتشال خالص ([[Omit]] في الدرس الجاي).`,
            "تحديث جزئي.",
            "دمج بسيط.",
            "قفلة.",
            "ابعت اللي اتغير بس.",
            "خاصية مش موجودة: مرفوضة.",
            "إعدادات كلها اختيارية.",
            R`القيم الافتراضية لازم تغطي كل حاجة، فبنستخدم [[Required]].`,
            "نسخة للقراية بس.",
            "ممنوع التعديل."
          ],
          sol: R`بعد ما تمسح [[lang]]: Property 'lang' is missing in type '{ theme: "light"; }' but required in type 'Required<Settings>' (TS2741).

والـ merge زي الكود تحت: [[merge({ theme: "dark" })]] بترجع [[{ theme: 'dark', lang: 'ar' }]]. الفخ: [[merge({ lang: undefined })]] بترجع [[{ theme: 'light', lang: undefined }]]، لأن الـ spread بيكتب undefined فوق الـ default، و TS ساكت مع إن النوع بيقول Required. الإعداد [[exactOptionalPropertyTypes]] بيمسكها (TS2379)، وهو موجود في الـ tsconfig اللي [[tsc --init]] بيعمله في TS 7.`,
          solCode: R`type Settings = { theme?: "light" | "dark"; lang?: "ar" | "en" };
const defaults: Required<Settings> = { theme: "light", lang: "ar" };
function merge(s: Settings): Required<Settings> {
  return { ...defaults, ...s };
}
console.log(merge({ theme: "dark" })); // { theme: 'dark', lang: 'ar' }`
        },
        {
          cmd: "Pick و Omit و Record",
          title: "تاخد جزء من نوع، أو تعمل قاموس مفاتيحه معروفة",
          desc: R`[[Pick<User, "id" | "name">]] نوع فيه الخاصيتين دول بس. و [[Omit<User, "password">]] كل حاجة ما عدا password. و [[Record<K, V>]] object مفاتيحه من نوع K وقيمه من نوع V: [[Record<Role, string[]>]] لازم فيه مفتاح لكل دور.`,
          example: R`type Role = "admin" | "editor" | "viewer";
type User = { id: string; name: string; email: string; password: string; role: Role };
type PublicUser = Omit<User, "password">;
type UserPreview = Pick<User, "id" | "name">;
type NewUser = Omit<User, "id">;
const permissions: Record<Role, string[]> = {
  admin: ["*"],
  editor: ["posts:write"],
  viewer: ["posts:read"],
};
const cache: Record<string, UserPreview> = {};
const labels: Record<Role, string> = { admin: "مدير", editor: "محرر" }; // خطأ: viewer ناقص`,
          try: R`ضيف دور [[owner]] لـ [[Role]] وشوف كل الـ Records اللي محتاجة تتحدّث. وبعدين جرّب [[Omit<User, "pasword">]] بغلطة إملائية ولاحظ إن TS مش بيعترض.`,
          flag: "script",
          deep: {
            why: "الموديل الواحد بيطلع منه أشكال كتير: اللي بيرجع للـ client من غير password، واللي بيتبعت في الإنشاء من غير id، واللي في القوايم فيه حاجتين بس. لو كتبتهم بإيدك، كل تعديل في الموديل يتعمل في خمس أماكن.",
            how: R`[[Pick<T, K>]] بياخد K من مفاتيح T بس ([[K extends keyof T]])، فأي اسم غلط يطلع خطأ. [[Omit<T, K>]] معمول بـ [[Pick<T, Exclude<keyof T, K>>]]، و K فيه مش مقيد بمفاتيح T ([[K extends keyof any]])، فغلطة إملائية في اسم الخاصية مش بتطلع خطأ، والخاصية اللي كنت عايز تشيلها بتفضل موجودة.

[[Record<K, V>]] هو [[{ [P in K]: V }]]. لو K union literals، كل مفتاح إجباري (بيمسك الناقص). لو K هي [[string]]، أي مفتاح مسموح، وقراية مفتاح مش موجود نوعها V مش [[V | undefined]]، إلا لو شغّلت [[noUncheckedIndexedAccess]].

و [[Omit]] على union مبيتوزعش على أعضائه: [[Omit<A | B, "x">]] بيطلّع المفاتيح المشتركة بس، وتخسر الـ discriminated union. ده فخ متقدم بس بيحصل.`,
            when: "[[Omit]] لإخفاء حاجات حساسة وللـ create DTOs. و [[Pick]] لأشكال صغيرة للقوايم. و [[Record]] لأي قاموس: الصلاحيات حسب الدور، والترجمات، والـ cache.",
            mistakes: R`تفتكر إن [[Omit<User, "password">]] بيشيل الـ password من الداتا نفسها: النوع بيتمسح، والـ password لسه في الـ object لو مشلتهاش بإيدك أو بـ select. وغلطة إملائية في Omit محدش بيمسكها. و [[Record<string, any>]] كنوع لكل حاجة: ده any بشكل تاني.`
          },
          lines: [
            "الأدوار.",
            "موديل كامل فيه password.",
            "كل حاجة ما عدا password: ده اللي يرجع للـ client.",
            "حاجتين بس للقوايم.",
            "للإنشاء: الـ id بيتعمل في القاعدة.",
            "قاموس مفتاحه دور وقيمته ليستة صلاحيات.",
            "كل دور...",
            "...لازم...",
            "...يبقى موجود.",
            "قفلة.",
            R`[[Record<string, T>]]: أي مفتاح string (cache بالـ id مثلًا).`,
            R`[[Record<Role, ...>]] بيمسك الدور الناقص: لو ضفت دور جديد، كل القواميس دي تطلّع خطأ.`
          ],
          sol: R`بعد ما تضيف [[owner]]: [[permissions]] و [[labels]] بيطلّعوا Property 'owner' is missing in type ... but required in type 'Record<Role, ...>' (TS2741). و [[cache]] مش بيتأثر لأن مفاتيحه [[string]]. (و [[labels]] كان فيها خطأ [[viewer]] من الأول.) يعني [[Record<Role, ...>]] بيجبرك تفتكر كل مكان لازم يتحدّث.

و [[Omit<User, "pasword">]] مش بيطلّع ولا خطأ، والنوع الناتج لسه فيه [[password]]. [[Omit]] بتقبل أي string كمفتاح، فالغلطة الإملائية بتسرّب الباسورد في [[PublicUser]]. [[Pick]] بقى بتمسكها، لأنها بتشترط [[K extends keyof T]].`
        },
        {
          cmd: "ReturnType و Parameters و Awaited",
          title: "نوع اللي دالة بترجعه أو بتاخده، من غير ما تكتبه بإيدك",
          desc: R`[[ReturnType<typeof fn>]] نوع اللي الدالة بترجعه، و [[Parameters<typeof fn>]] tuple باراميتراتها، و [[Awaited<T>]] بيفك الـ Promise: [[Awaited<Promise<User>>]] هو User.

مفيدين جدًا مع دوال مكتبات مش مصدّرة أنواعها، ومع دوال async بتاعتك: [[Awaited<ReturnType<typeof getUser>>]] هو شكل اللي هترجعه بعد await.`,
          example: R`async function getDashboard(userId: string) {
  return { userId, stats: { orders: 12, revenue: 3400 }, updatedAt: new Date() };
}
type DashboardPromise = ReturnType<typeof getDashboard>; // Promise<{ ... }>
type Dashboard = Awaited<DashboardPromise>;               // الشكل من غير Promise
type Args = Parameters<typeof getDashboard>;              // [userId: string]
function renderStats(d: Dashboard) {
  return $__btorders: $__{d.stats.orders}$__bt;
}
function logCall(...args: Args) {
  console.log("getDashboard", args[0]);
}
type Timer = ReturnType<typeof setTimeout>;`,
          try: R`ضيف خاصية [[unread: 3]] جوه [[stats]] في الدالة، واكتب [[d.stats.unread]] في [[renderStats]]: هتلاقيها متاحة من غير ما تعدّل أي نوع.`,
          flag: "script",
          deep: {
            why: "كتير النوع موجود فعلًا بس مش متصدّر: دالة من مكتبة بترجع object معقد، أو دالة بتاعتك نوعها متستنتج. بدل ما تنسخه بإيدك (ويتقادم)، بتطلّعه من الدالة نفسها.",
            how: R`التلاتة conditional types بـ [[infer]] (آخر درس في الكاتيجوري دي). [[ReturnType<T>]] تقريبًا [[T extends (...args: any) => infer R ? R : any]]: «لو T دالة، هات نوع اللي بترجعه».

محتاجين نوع الدالة مش الدالة: [[ReturnType<getDashboard>]] غلط لأن getDashboard قيمة، والصح [[ReturnType<typeof getDashboard>]].

[[Awaited<T>]] بيفك Promises متداخلة كمان ([[Promise<Promise<X>>]] يبقى X)، وده نفس اللي [[await]] بيعمله وقت التشغيل. من غيره، [[ReturnType]] لدالة async بيدّيك [[Promise<...>]] وانت عايز الداتا.

وفيه كمان [[ConstructorParameters]] و [[InstanceType]] للكلاسات، بنفس الفكرة.`,
            when: "نوع ناتج دالة Prisma أو Supabase أو أي query معقد، وأنواع الـ timers، ولما تعمل wrapper لدالة (retry أو logging) بنفس باراميتراتها.",
            mistakes: R`تنسى [[typeof]] جوه [[ReturnType]]. وتستخدم [[ReturnType]] لدالة async وتستنى الداتا نفسها، فتلاقي [[Promise]]: ضيف [[Awaited]]. وتعتمد على نوع متستنتج من دالة بتتغير كتير كأنه API ثابت، فأي تعديل فيها يكسر أماكن بعيدة: اكتب نوع الرجوع صريح في الدوال المهمة.`
          },
          lines: [
            "دالة async نوع رجوعها متستنتج ومحدش كتبه.",
            "بترجع object فيه stats و Date.",
            "قفلة.",
            "النوع اللي راجع من الدالة: Promise لأنها async.",
            R`[[Awaited]] فك الـ Promise: ده شكل الداتا بعد await.`,
            "باراميترات الدالة كـ tuple.",
            "دالة بتاخد الداتا من غير ما حد يكتب نوعها.",
            "TS عارف إن orders رقم.",
            "قفلة.",
            "نفس باراميترات الدالة الأصلية بالظبط.",
            R`[[args[0]]] نوعها string.`,
            "قفلة.",
            "الكلاسيكية: نوع الـ timer بيفرق بين Node والمتصفح، فخده من الدالة نفسها."
          ],
          sol: R`بعد ما تضيف [[unread: 3]] جوه [[stats]]، [[d.stats.unread]] بيبقى متاح في [[renderStats]] ونوعه [[number]] من غير ما تغيّر [[Dashboard]]. لأن [[Dashboard]] متحسب من الدالة نفسها: [[Awaited<ReturnType<typeof getDashboard>>]].

ولو شغلت [[renderStats(await getDashboard("u1"))]] بعد ما تزوّد [[unread]] في الـ template هتاخد [[orders: 12, unread: 3]]. ولو لقيت Property 'unread' does not exist، يبقى انت كاتب نوع [[Dashboard]] بإيدك في حتة تانية بدل ما تشتقه.`
        },
        {
          cmd: "mapped types",
          title: "تلف على مفاتيح نوع وتعمل منه نوع جديد",
          desc: R`mapped type بيلف على مفاتيح: [[{ [K in keyof T]: ... }]]. كده تقدر تعمل نسخة من أي نوع بنفس المفاتيح وأنواع مختلفة، زي نوع أخطاء الـ form: لكل حقل رسالة خطأ اختيارية.

وبـ [[as]] جوه المفتاح تقدر تغيّر الأسماء نفسها (key remapping)، زي تحويل [[age]] لـ [[setAge]].`,
          example: R`type SignupForm = { email: string; password: string; age: number };
type FormErrors<T> = { [K in keyof T]?: string };
type Touched<T> = { [K in keyof T]: boolean };
const errors: FormErrors<SignupForm> = { email: "إيميل غلط" };
const touched: Touched<SignupForm> = { email: true, password: false, age: false };
const bad: Touched<SignupForm> = { email: true }; // خطأ: password و age ناقصين
type Setters<T> = {
  [K in keyof T as $__btset$__{Capitalize<string & K>}$__bt]: (value: T[K]) => void;
};
type FormSetters = Setters<SignupForm>;
// { setEmail: (value: string) => void; setPassword: ...; setAge: (value: number) => void }`,
          try: R`ضيف حقل [[phone: string]] لـ [[SignupForm]] ولاحظ إن [[touched]] بقى ناقص حقل، و [[FormSetters]] بقى فيه [[setPhone]] لوحده.`,
          flag: "script",
          deep: {
            why: "أي نوع مرتبط بنوع تاني «لكل حقل حاجة»: أخطاء الـ validation، وحالة touched، وقيم أولية، وصلاحيات لكل عمود. لو كتبتهم بإيدك، كل حقل جديد محتاج يتضاف في ٤ أنواع. الـ mapped type بيربطهم بالأصل.",
            how: R`[[[K in keyof T]]] زي for loop على الأنواع: K بياخد كل مفتاح من union المفاتيح، والقيمة بتتحسب لكل واحد. وتقدر تستخدم [[T[K]]] عشان توصل لنوع الحقل الأصلي.

المعدّلات: [[?]] تضيف اختياري، و [[-?]] تشيله (كده [[Required]] معمول)، و [[readonly]] و [[-readonly]] بنفس الشكل.

و [[as]] بعد المفتاح بيغيّر اسمه، ومعاه template literal types و [[Capitalize]] بتعمل أسماء جديدة. ولو الاسم الجديد [[never]]، المفتاح بيتشال: [[as T[K] extends Function ? never : K]] بيشيل كل الـ methods.

و [[Partial]] و [[Required]] و [[Readonly]] و [[Record]] كلهم mapped types مكتوبين كده في lib.es5.d.ts.`,
            when: "أنواع الـ forms (errors و touched)، وأنواع مشتقة من موديل (كل الحقول optional أو nullable)، وأسماء setters أو events. في كود التطبيق العادي هتستخدم الجاهز (Partial و Record) أكتر ما تكتب بنفسك.",
            mistakes: R`mapped types معقدة في كود التطبيق محدش في الفريق يقدر يقراها: لو نوع عادي بيوصل لنفس النتيجة، اكتبه. ونسيان [[string & K]] مع [[Capitalize]]، لأن مفاتيح keyof ممكن تبقى number أو symbol.`
          },
          lines: [
            "شكل form.",
            "لكل حقل في T، رسالة خطأ اختيارية.",
            "لكل حقل، boolean إجباري.",
            "مفيش غير خطأ الإيميل، ومقبول لأن كله اختياري.",
            "لازم كل الحقول.",
            R`ناقص حقول، و [[Touched]] مش اختياري: خطأ.`,
            "نوع بيغيّر أسماء المفاتيح.",
            R`[[as]] بيعيد تسمية كل مفتاح ([[age]] بقت [[setAge]])، والقيمة دالة بتاخد نوع الحقل ([[T[K]]]).`,
            "قفلة.",
            R`الناتج فيه [[setEmail]] و [[setPassword]] و [[setAge]]، كل واحدة بنوعها.`
          ],
          sol: R`بعد ما تضيف [[phone: string]]: [[touched]] بيطلّع Property 'phone' is missing in type '{ email: true; password: false; age: false; }' but required in type 'Touched<SignupForm>'. و [[errors]] مبيطلعش خطأ، لأن [[FormErrors]] كل خصايصه اختيارية بـ [[?]].

و [[FormSetters]] لو حطيت الماوس عليه هتلاقي [[setPhone: (value: string) => void]] اتضافت لوحدها. لو ظهرت [[setphone]] بحرف صغير، انت ناسي [[Capitalize]].`
        },
        {
          cmd: "conditional types",
          title: "نوع بيتغير حسب شرط، وأنواع جاهزة مبنية على الفكرة دي",
          desc: R`[[T extends string ? "yes" : "no"]] زي ternary بس للأنواع. ولما T تبقى union، الشرط بيتطبق على كل عضو لوحده (distributive)، وده اللي عامل [[Exclude]] و [[Extract]]. (و [[NonNullable]] بيوصل لنفس النتيجة، بس حاليًا معمول [[T & {}]].)

و [[infer]] جوه الشرط بيطلّع نوع من جوه نوع تاني، زي نوع العنصر من array أو نوع الداتا من Promise.`,
          example: R`type IsString<T> = T extends string ? "yes" : "no";
type A = IsString<"hi">;                           // "yes"
type B = IsString<42>;                             // "no"
type Status = "idle" | "loading" | "success" | "error";
type Done = Exclude<Status, "idle" | "loading">;   // "success" | "error"
type Busy = Extract<Status, "loading">;            // "loading"
type MaybeUser = { name: string } | null | undefined;
type SureUser = NonNullable<MaybeUser>;            // { name: string }
type ElementOf<T> = T extends (infer E)[] ? E : never;
type N = ElementOf<number[]>;                      // number
type Unwrap<T> = T extends Promise<infer V> ? V : T;
type U = Unwrap<Promise<string>>;                  // string`,
          try: R`اكتب [[type ArgOf<F> = F extends (arg: infer A) => any ? A : never]] وجرّبه على [[(x: number) => void]]. وبعدين جرّب [[Exclude<Status, "idel">]] بغلطة إملائية وشوف إن مفيش خطأ.`,
          flag: "script",
          deep: {
            why: "في كود التطبيق هتستخدم الجاهز منهم أكتر ما تكتب: [[NonNullable]] بعد فحص null، و [[Exclude]] عشان تشيل حالة من union، و [[ReturnType]] و [[Awaited]] اللي هما conditional types. وفهم الفكرة بيخليك تقرا أنواع المكتبات وتفهم رسايل الأخطاء الطويلة.",
            how: R`الشكل [[T extends U ? X : Y]]: لو T assignable لـ U يبقى X، غير كده Y. الشرط بيتحسب وقت الفحص، ومفيش حاجة منه في الـ JS.

لما T باراميتر generic ويتبعتله union، الشرط بيتوزع (distributive): [[IsString<"a" | 1>]] بيبقى [[IsString<"a"> | IsString<1>]] يعني [["yes" | "no"]]. وده سر [[Exclude<T, U> = T extends U ? never : T]]: كل عضو بيطابق U بيبقى never، و never بيختفي من الـ union. و [[NonNullable<T>]] حاليًا معمول [[T & {}]]، ونفس النتيجة: بيشيل null و undefined.

[[infer]] بيعلن متغير نوع جوه الشرط، و TS بيملاه من المطابقة. ده اللي عاملين بيه [[ReturnType]] و [[Parameters]] و [[Awaited]].

ولو مش عايز التوزيع، حط الاتنين بين أقواس مربعة: [[[T] extends [string] ? X : Y]].`,
            when: "[[NonNullable]] و [[Exclude]] و [[Extract]] في كود عادي. وتكتب conditional type بنفسك نادرًا: في مكتبة، أو helper نوع بيتكرر في المشروع.",
            mistakes: R`[[Exclude]] على object type وتستنى يشيل خاصية: ده بيشيل أعضاء من union، و [[Omit]] هو اللي بيشيل خصايص. وغلطة إملائية في Exclude مش بتطلّع خطأ. و conditional types متداخلة ٥ مستويات في كود التطبيق.`
          },
          lines: [
            R`لو T جزء من string يبقى [["yes"]]، غير كده [["no"]].`,
            R`[["hi"]] string، فالناتج yes.`,
            "42 مش string، فالناتج no.",
            "union حالات.",
            R`[[Exclude]]: شيل الحالتين دول.`,
            R`[[Extract]]: خلّي اللي بيطابق بس.`,
            "نوع ممكن يبقى null أو undefined.",
            R`[[NonNullable]]: شيل null و undefined.`,
            R`[[infer E]]: «لو T array، سمّي نوع العنصر E ورجّعه».`,
            R`[[number]].`,
            R`نفس الفكرة مع Promise (ده تقريبًا [[Awaited]]).`,
            R`[[string]].`
          ],
          sol: R`[[ArgOf<(x: number) => void>]] بيطلع [[number]]، لأن [[infer A]] بتمسك نوع الباراميتر. ولو جربته على حاجة مش دالة زي [[ArgOf<string>]] بيطلع [[never]].

و [[Exclude<Status, "idel">]] مش بيطلّع خطأ، والناتج هو الأربع حالات زي ما هم [["idle" | "loading" | "success" | "error"]]، لأن مفيش حاجة اسمها idel تتشال. [[Exclude]] مش بتشترط إن اللي بتشيله موجود. لو عايز حماية، اعمل نسخة بتاعتك: [[type StrictExclude<T, U extends T> = Exclude<T, U>]].`,
          solCode: R`type ArgOf<F> = F extends (arg: infer A) => any ? A : never;
type X = ArgOf<(x: number) => void>; // number
type Status = "idle" | "loading" | "success" | "error";
type StrictExclude<T, U extends T> = Exclude<T, U>;
type Done = StrictExclude<Status, "idle" | "loading">; // "success" | "error"
// type Bad = StrictExclude<Status, "idel">; // خطأ: "idel" مش من Status`
        }
      ]
    },
    {
      t: "تقول لـ TS حاجة هو مش عارفها",
      l: 2,
      n: "as const و satisfies آمنين، و as و ! مسؤوليتك انت، و .d.ts لمكتبات من غير أنواع",
      items: [
        {
          cmd: "as const",
          title: "تثبّت القيم بدل ما TS يوسّعها لـ string و number",
          desc: R`[[as const]] بعد object أو array بيقول لـ TS: «دي قيم ثابتة». كل الخصايص تبقى [[readonly]]، والقيم تفضل literals ([["GET"]] مش string)، والـ arrays تبقى tuples للقراية بس.

ده مش كذب على الـ compiler زي [[as]] العادية: هو بس بيمنع الـ widening، وأي تعديل بعد كده يطلع خطأ.`,
          example: R`const routes = { home: "/", login: "/login", admin: "/admin" } as const;
type Path = (typeof routes)[keyof typeof routes]; // "/" | "/login" | "/admin"
const methods = ["GET", "POST"] as const;
type Method = (typeof methods)[number];           // "GET" | "POST"
routes.home = "/home"; // خطأ: readonly
function go(path: Path) { return path; }
go(routes.login);
go("/signup"); // خطأ: مش من الـ routes
const loose = { method: "GET" };
function send(m: Method) { return m; }
send(loose.method); // خطأ: string أوسع من Method`,
          try: R`ضيف [[as const]] على [[loose]] وشوف الخطأ الأخير اختفى. وبعدين حاول تعمل [[methods.push("PUT")]].`,
          flag: "script",
          deep: {
            why: "ثوابت المشروع (مسارات، وأدوار، وحالات، ومفاتيح إعدادات) محتاجها قيم وقت التشغيل وأنواع وقت الكتابة. [[as const]] بيخليك تكتبها مرة واحدة كقيمة، وتطلّع منها النوع.",
            how: R`TS عادةً بيوسّع (widening) الـ literals في الأماكن اللي ممكن تتغير: خصايص الـ objects وعناصر الـ arrays. [[{ method: "GET" }]] نوعها [[{ method: string }]] لأن ممكن تكتب [[obj.method = "PUT"]] بعدين.

[[as const]] (const assertion) بيقول: متوسّعش. النتيجة: كل الخصايص [[readonly]] وبعمق، والقيم literals، والـ arrays [[readonly]] tuples. وده مش [[Object.freeze]]: وقت التشغيل الـ object عادي وممكن يتعدّل لو حد تجاهل الأنواع.

ومع [[typeof]] و [[keyof]] و [[[number]]] بتطلّع unions من القيم: [[(typeof routes)[keyof typeof routes]]] و [[(typeof methods)[number]]].

ومن TS 5.0 فيه [[const]] type parameters ([[function f<const T>(x: T)]]) بتعمل نفس الأثر على الـ arguments من غير ما اللي بينادي يكتب [[as const]].`,
            when: "ثوابت بتتستخدم كقيم وأنواع مع بعض، وبدل enum. وقيم بترجع من hook كـ tuple ([[return [value, setValue] as const]]).",
            mistakes: R`تفتكر إن [[as const]] زي [[as SomeType]]: التانية بتكذب على TS، الأولى لأ. وتستخدمه على object هيتعدّل فعلًا (state مثلًا)، فكل تعديل يطلع خطأ readonly.`
          },
          lines: [
            "object مسارات ثابت.",
            "union كل القيم من الـ object.",
            "tuple ثابت.",
            "union عناصره.",
            R`[[as const]] خلّى الخصايص readonly.`,
            "دالة بتقبل مسار معروف بس.",
            "من الـ object: مقبول.",
            "مسار مكتوب بإيدك ومش موجود: مرفوض.",
            R`من غير [[as const]]: نوع [[method]] بقى string.`,
            "دالة مستنية Method.",
            R`string مش مقبولة مكان [["GET" | "POST"]].`
          ],
          sol: R`بعد [[const loose = { method: "GET" } as const]]، نوع [[loose.method]] بقى [["GET"]] مش string، فـ [[send(loose.method)]] بيعدّي.

و [[methods.push("PUT")]] بيطلّع Property 'push' does not exist on type 'readonly ["GET", "POST"]' (TS2339). [[as const]] بيخلي الـ array tuple للقراية بس. ولاحظ إن الحماية دي من TS بس: وقت التشغيل الـ array عادي و push موجودة، فلو عايز تمنعها فعلًا استخدم [[Object.freeze]].`
        },
        {
          cmd: "satisfies",
          title: "تتأكد إن القيمة ماشية مع نوع، من غير ما تخسر نوعها الدقيق",
          desc: R`[[value satisfies Type]] بيفحص إن القيمة مطابقة للنوع، بس سايب نوعها المستنتج زي ما هو. عكس [[const x: Type = value]] اللي بيخلي النوع هو Type ويضيّع التفاصيل.

مثالي للإعدادات والقواميس: عايز TS يمسك مفتاح ناقص أو قيمة غلط، وعايز كمان يعرف القيم بالظبط.`,
          example: R`type Theme = Record<"primary" | "danger", string | [number, number, number]>;
const annotated: Theme = { primary: "#0af", danger: [255, 0, 0] };
annotated.primary.toUpperCase(); // خطأ: ممكن تبقى tuple
const checked = {
  primary: "#0af",
  danger: [255, 0, 0],
} satisfies Theme;
checked.primary.toUpperCase();
checked.danger.map((c) => c / 255);
const bad = { primary: "#0af" } satisfies Theme; // خطأ: danger ناقصة`,
          try: R`ضيف مفتاح [[secondary]] لـ [[checked]] وشوف [[satisfies]] بيرفضه. وبعدين جرّب [[as Theme]] بدل [[satisfies Theme]] في آخر سطر ولاحظ إن الخطأ اختفى، وده بالظبط خطر [[as]].`,
          flag: "script",
          deep: {
            why: "في مشروع حقيقي فيه ملفات إعدادات وقواميس كتير: routes، وألوان، وترجمات، وصلاحيات. عايز تمسك الغلط فيها (مفتاح ناقص أو اسم غلط)، من غير ما النوع يبقى عام لدرجة إنك تعمل cast كل ما تستخدمها. قبل TS 4.9 كان لازم تختار واحدة من الاتنين.",
            how: R`فيه ٣ طرق تربط قيمة بنوع، وكل واحدة مختلفة:

[[const x: T = v]] (annotation): بيفحص إن v مطابقة لـ T، ونوع x بقى T. أي تفاصيل أدق بتضيع.

[[const x = v as T]] (assertion): مبيفحصش بجد، بيقول «اعتبرها T» طالما مش مستحيلة تمامًا. خطر.

[[const x = v satisfies T]]: بيفحص زي الـ annotation بالظبط (وكمان الخصايص الزيادة)، بس نوع x هو النوع المستنتج من v. فتكسب الاتنين.

ومع [[as const]]: [[{ ... } as const satisfies Config]] بيثبّت القيم ويفحصها في نفس الوقت.

وفي Prisma هتلاقي النمط ده في الـ docs: [[{ select: { id: true } } satisfies Prisma.UserDefaultArgs]]، فالـ args بتتفحص، ونوعها الدقيق بيروح لـ [[GetPayload]] (المستوى ٣).`,
            when: "إعدادات و routes و themes وقواميس ترجمة، و Prisma select و include، وأي object عايز تتأكد من شكله ومحتاج نوعه الدقيق بعدين.",
            mistakes: R`تستخدم [[as]] مكان [[satisfies]] عشان «بيعمل نفس الحاجة»: لأ، as بيسكّت الأخطاء. وتفتكر إن satisfies بيغيّر حاجة وقت التشغيل: بيتمسح زي أي نوع.`
          },
          lines: [
            "كل لون يا string يا tuple RGB.",
            "بـ annotation: النوع بقى Theme، والتفاصيل ضاعت.",
            "TS مش فاكر إن primary كانت string.",
            "نفس الـ object...",
            "...string...",
            "...و tuple...",
            R`...بـ [[satisfies]]: اتفحص على Theme، والنوع الدقيق فضل.`,
            "TS عارف إن primary هنا string.",
            "وإن danger هنا tuple أرقام.",
            "وبرضه بيمسك المفتاح الناقص زي الـ annotation."
          ],
          sol: R`[[secondary: "#333"]] في [[checked]] بيطلّع Object literal may only specify known properties, and 'secondary' does not exist in type 'Theme' (TS2353). [[satisfies]] بيفحص الشكل كامل: مفاتيح زيادة أو ناقصة.

ولما تكتب [[{ primary: "#0af" } as Theme]] الخطأ بتاع [[danger]] الناقصة بيختفي. [[as]] بيقبل أي حاجة «قريبة كفاية» من النوع، ولو طبعت [[bad.danger]] هتاخد [[undefined]] مع إن النوع بيقول string أو tuple، وده بالظبط الـ bug اللي [[satisfies]] كان هيمنعه.`
        },
        {
          cmd: "as",
          title: "تقول للـ compiler «ثق فيا، أنا عارف النوع»",
          desc: R`[[value as User]] (type assertion) بيغيّر نوع القيمة في عين TS من غير أي فحص وقت التشغيل. لو كنت غلطان، مفيش خطأ دلوقتي، والـ crash بعدين في مكان تاني.

الاستخدامات المقبولة قليلة: عنصر DOM انت متأكد من نوعه، أو بعد فحص TS مش قادر يفهمه. وأي داتا من برّه (API و JSON و req.body) مكانها التحقق الحقيقي (Zod) مش [[as]].`,
          example: R`type User = { id: string; name: string };
const input = document.getElementById("email") as HTMLInputElement;
input.value = "you@example.com";
const user = JSON.parse('{"id": 1}') as User;
console.log(user.name.toUpperCase()); // TypeError وقت التشغيل
const n = "5" as number; // خطأ: Conversion of type 'string' to type 'number' may be a mistake
const forced = "5" as unknown as number;
console.log(forced.toFixed(2)); // TypeError برضه`,
          try: R`غيّر السطر الرابع لـ [[const user: unknown = JSON.parse('{"id": 1}')]] وحاول تقرا [[user.name]]: TS هيجبرك تفحص. وبعدين دوّر في مشروعك بـ [[grep -rn "as unknown as" src]] وشوف كام واحدة.`,
          flag: "script",
          deep: {
            why: "TS مش دايمًا عارف كل حاجة: [[getElementById]] ممكن ترجع أي عنصر، و [[JSON.parse]] بترجع any. و [[as]] موجود عشان تقوله معلومة هو ناقصها. المشكلة إنه بيتستخدم كتير بمعنى «اسكت» بدل «أنا متأكد».",
            how: R`[[as T]] مبيطلّعش أي كود: بيتمسح، والقيمة زي ما هي. و TS بيسمح بيه طالما النوعين «ممكن يتقابلوا» (comparable: شبه assignable في أي اتجاه بس أرخى، مثلًا لو خاصية نوعها union يكفي إن عضو واحد منه يطابق، عشان كده [[{ primary: "#0af" } as Theme]] في درس satisfies عدّى من غير خطأ)، فـ [[HTMLElement as HTMLInputElement]] مسموح لأن input نوع من HTMLElement، و [[string as number]] ممنوع.

[[as unknown as T]] بيعدّي الحماية دي: أي حاجة تتحول لـ unknown، و unknown تتحول لأي حاجة. وفي مشروع حقيقي كان فيه [[(data ?? []) as unknown as DbRow[]]] على نتيجة query: لو شكل الجدول اتغير، TS مش هيقول، والصفحة تقع.

وفيه شكل قديم [[<User>value]] بيعمل نفس الحاجة، بس مبيشتغلش في ملفات .tsx لأنه بيتلخبط مع JSX.

البدائل الأأمن بالترتيب: narrowing بفحص حقيقي، أو type guard، أو Zod للداتا الخارجية، أو [[satisfies]] لو عايز تتأكد من شكل قيمة انت كاتبها.`,
            when: "عناصر DOM لما تكون متأكد (أو [[querySelector<HTMLInputElement>]] مع فحص null)، و mocks في الاختبارات، وبعد فحص TS مش بيفهمه. غير كده، دوّر على بديل.",
            mistakes: R`[[await res.json() as User]] و [[req.body as {...}]]: الاتنين موجودين في مشاريع حقيقية، والاتنين بيصدّقوا أي داتا جاية من برّه. و [[as any]] عشان error يختفي: كده خبّيت الـ bug مش صلّحته. وفي الانترفيو: «as بيحوّل القيمة» غلط، مبيحوّلش أي حاجة وقت التشغيل.`
          },
          lines: [
            "النوع.",
            R`[[getElementById]] بترجع [[HTMLElement | null]]، و as بيقول «ده input وموجود». لو الـ id غلط، هيقع.`,
            "TS دلوقتي فاكر إن فيه value.",
            "أخطر استخدام: داتا من برّه. مفيش أي فحص، و id هنا رقم أصلًا.",
            "TS ساكت، ووقت التشغيل: Cannot read properties of undefined.",
            "as مبيسمحش بتحويل بين نوعين ملهمش علاقة ببعض.",
            R`بس [[as unknown as]] بتعدّي أي حاجة لأي حاجة: علامة إن فيه حاجة غلط.`,
            "string على إنها number، والنتيجة crash."
          ],
          sol: R`مع [[const user: unknown]]، [[user.name]] بيطلّع 'user' is of type 'unknown' (TS18046). لازم تفحص قبلها، زي الكود تحت، والناتج [[الداتا مفيهاش name]] بدل الـ TypeError اللي كان بيحصل مع [[as User]].

و [[grep -rn "as unknown as" src]]: كل سطر بيطلع هو مكان كسرت فيه فحص TS مرتين. لو مطلعش حاجة ممتاز، ولو لقيت كتير غالبًا عند API responses أو mocks في الاختبارات. الأولى تتصلح بـ Zod (المستوى ٣)، والتانية مقبولة أكتر.`,
          solCode: R`const user: unknown = JSON.parse('{"id": 1}');
if (typeof user === "object" && user !== null && "name" in user && typeof user.name === "string") {
  console.log(user.name.toUpperCase());
} else {
  console.log("الداتا مفيهاش name");
}`
        },
        {
          cmd: "! (non-null)",
          title: "علامة التعجب بعد القيمة، وليه تبعد عنها",
          desc: R`[[value!]] (non-null assertion) بتقول لـ TS «القيمة دي مش null ولا undefined، ثق فيا». بتشيل الخطأ، بس مبتعملش أي فحص: لو القيمة فعلًا undefined، الكود هيقع وقت التشغيل.

البديل تقريبًا دايمًا أحسن: فحص صريح بـ if مع رسالة خطأ واضحة، أو [[?.]] و [[??]]، أو validation للـ env مرة واحدة أول ما التطبيق يقوم.`,
          example: R`const url = process.env.DATABASE_URL!; // string، ولو ناقص: undefined يعدّي
const key = process.env.API_KEY;
if (!key) throw new Error("API_KEY ناقص في .env");
const el = document.querySelector("#app")!;
const app = document.querySelector("#app");
if (!app) throw new Error("#app مش موجود في الصفحة");
app.textContent = "جاهز";
const byId = new Map<string, number>([["a", 1]]);
const v = byId.get("b")!;
console.log(v.toFixed(1)); // TypeError`,
          try: R`في مشروعك شغّل [[grep -rn "process.env.[A-Z_]*!" src]] وعدّ كام متغير بيئة عليه [[!]]. كل واحد فيهم ممكن يعدّي undefined بصمت لو .env ناقص. والحل في درس Zod للـ env في المستوى ٣.`,
          flag: "script",
          deep: {
            why: "[[!]] أسرع طريقة تخلي الخط الأحمر يختفي، عشان كده بتنتشر. بس هي بتحوّل خطأ واضح وقت الكتابة لخطأ غامض وقت التشغيل: «Cannot read properties of undefined» في سطر بعيد عن السبب.",
            how: R`[[x!]] بتشيل [[null]] و [[undefined]] من نوع x، وبتتمسح تمامًا من الـ JS. يعني [[process.env.URL!]] في الـ JS هي [[process.env.URL]] بالظبط، ومفيش أي فحص.

وفي مشروع حقيقي كان فيه [[process.env.SUPABASE_SERVICE_ROLE_KEY!]] في كذا ملف. لو المتغير ناقص على السيرفر، الـ client بيتعمل بـ undefined، والخطأ بيطلع من جوه المكتبة برسالة ملهاش علاقة بالسبب.

الفحص الصريح ([[if (!key) throw ...]]) نفس عدد السطور تقريبًا، بيدّي رسالة واضحة في المكان الصح، و TS بيضيّق النوع بعده.

فيه حالات [[!]] فيها مقبول: قيمة اتحققت منها سطر فوق بطريقة TS مش فاهمها، و refs في React بعد mount (وحتى دي، الفحص أحسن).`,
            when: "نادرًا جدًا، ولما تبقى متأكد ١٠٠٪ ومش قادر تثبت لـ TS. في الـ env والـ DOM و [[Map.get]]، لأ: افحص.",
            mistakes: R`[[!]] على كل [[process.env]]، والتطبيق يقوم «عادي» ويقع أول ما حد يستخدم الخدمة. و [[user!.name]] عشان خطأ strictNullChecks يختفي. وفي الانترفيو: «! بيتأكد إن القيمة موجودة» غلط، مبيتأكدش من حاجة.`
          },
          lines: [
            R`[[!]] شالت undefined من النوع. لو المتغير ناقص، الغلط هيظهر بعدين في مكان بعيد.`,
            R`من غير [[!]]: النوع [[string | undefined]].`,
            "فحص صريح: رسالة واضحة، و TS بيضيّق النوع لـ string بعدها.",
            R`[[!]] على عنصر DOM: لو الـ id اتغير، هيقع في مكان تاني.`,
            R`نفس الحاجة من غير [[!]].`,
            "فحص صريح.",
            "آمن، و TS عارف إنه موجود.",
            "Map فيها مفتاح واحد.",
            R`[[!]] على [[get]] لمفتاح مش موجود.`,
            "crash: Cannot read properties of undefined."
          ],
          sol: R`المطلوب هنا عدّ مش ناتج ثابت. كل سطر زي [[src/env.ts:1:const url = process.env.DATABASE_URL!;]] بيتحسب واحد. أما [[const k = process.env.API_KEY;]] من غير [[!]] مش هيطلع، وده كويس لأن TS هيجبرك تفحصه.

لو العدد صفر ومشروعك فيه env كتير، اتأكد إنك بتدوّر في الفولدر الصح (ممكن [[app]] أو [[lib]] مش [[src]]). ولاحظ إن الـ grep ممكن يمسك [[process.env.X!== "a"]] لو مكتوبة من غير مسافة، ودي مقارنة مش non-null، فبص على كل سطر بعينك. وكل [[!]] حقيقي فيهم قراره: يا فحص صريح بيرمي خطأ واضح، يا تنقله لملف env واحد بـ Zod.`
        },
        {
          cmd: ".d.ts و @types",
          title: "مكتبة JS من غير أنواع: الأنواع بتيجي منين",
          desc: R`ملف [[.d.ts]] (declaration file) فيه أنواع بس من غير كود. المكتبات الحديثة بتيجي بأنواعها جواها. والمكتبات القديمة المكتوبة JS أنواعها في باكدج منفصلة اسمها [[@types/اسم-المكتبة]] من مشروع DefinitelyTyped: [[npm i -D @types/express]].

ولو مفيش أنواع خالص، بتكتب [[declare module "lib"]] في ملف .d.ts عندك وتوصف فيه اللي بتستخدمه بس.`,
          example: R`// src/types/modules.d.ts: مفيش import ولا export على المستوى الأعلى
declare module "legacy-sms" {
  export function sendSms(to: string, text: string): Promise<{ id: string }>;
}
declare module "*.svg" {
  const src: string;
  export default src;
}
declare module "untyped-lib";`,
          try: R`في مشروع Express، امسح [[@types/express]] ([[npm rm -D @types/express]]) وشغّل [[npx tsc --noEmit]]: هتشوف [[Could not find a declaration file for module 'express']]. وبعدين رجّعه.`,
          flag: "script",
          deep: {
            why: "TS محتاج يعرف شكل كل حاجة بتستوردها. ومكتبات كتير اتكتبت JS قبل TS، ومش هتتعاد كتابتها. الـ declaration files بتوصفها من برّه، فتاخد autocomplete وفحص من غير ما حد يلمس كود المكتبة.",
            how: R`لما تكتب [[import x from "lib"]]، TS بيدوّر على الأنواع بالترتيب: خانة [[types]] أو [[exports]] في package.json بتاع المكتبة (المكتبات الحديثة زي zod و axios)، وبعدين [[node_modules/@types/lib]]. لو ملقاش، ومع [[strict]]: خطأ TS7016 «Could not find a declaration file for module».

الـ [[@types/*]] باكدجات منفصلة بيكتبها المجتمع (DefinitelyTyped)، ونسختها لازم تمشي مع نسخة المكتبة ([[@types/express@5]] مع express 5). وبتتسطّب [[-D]] لأنها للفحص بس.

فيه نوعين @types: اللي بتستوردها (express) بتشتغل لوحدها، واللي بتضيف globals ([[@types/node]] بيضيف [[process]] و [[Buffer]]، و [[@types/jest]] بيضيف [[describe]]). وفي TS 6 و 7، [[types]] في tsconfig افتراضيًا [[[]]]، فالنوع التاني لازم تكتبه: [["types": ["node"]]].

[[declare module "x" { ... }]] في ملف .d.ts بيعرّف أنواع لمكتبة. ومهم إن الملف يكون ambient (مفيهوش import ولا export على المستوى الأعلى)، لأن لو فيه، [[declare module]] بتبقى «تعديل على مكتبة موجودة» (module augmentation، المستوى ٣) مش تعريف جديد. وملفات .d.ts لازم تكون جوه [[include]] في tsconfig.`,
            when: "أي مكتبة بتطلّع TS7016. وملفات assets ([[*.svg]] و [[*.css]]) لو الـ bundler مش مغطيها. وتضيف globals زي [[window.dataLayer]].",
            mistakes: R`تسطّب [[@types/x]] لمكتبة أصلًا فيها أنواعها (زي axios): الباكدج دي بتبقى stub قديم ملوش لازمة. وتسطّب @types في dependencies مش devDependencies. وملف .d.ts فيه [[import]] في أوله فالـ [[declare module]] يبطل يعرّف مكتبة جديدة. و [[declare module "lib";]] من غير body وتنساه: كل حاجة من المكتبة any للأبد.`
          },
          lines: [
            "أنواع لمكتبة JS ملهاش أنواع.",
            "بتوصف الدوال اللي بتستخدمها بس، مش المكتبة كلها.",
            "قفلة.",
            R`wildcard: أي import لملف .svg...`,
            "...بيرجع string (الـ bundler بيحوّله لـ URL)...",
            "...كـ default export.",
            "قفلة.",
            R`أقصر شكل: المكتبة موجودة وكل حاجة منها [[any]]. حل مؤقت بس.`
          ],
          sol: R`بعد [[npm rm -D @types/express]] و [[npx tsc --noEmit]] هتشوف: [[error TS7016: Could not find a declaration file for module 'express'.]] وبعدها [['.../node_modules/express/index.js' implicitly has an 'any' type]] واقتراح [[npm i --save-dev @types/express]]. ومعاه أخطاء TS7006 على [[req]] و [[res]] في كل handler، لأنهم بقوا any.

لو مطلعش أي خطأ، يا [[strict]] (أو [[noImplicitAny]]) مقفول، يا فيه نسخة من [[@types/express]] في [[node_modules]] في فولدر أعلى (TS بيدوّر لفوق). وبعد [[npm i -D @types/express]] الأخطاء بتختفي.`
        }
      ]
    },
    {
      t: "Classes في TS",
      l: 2,
      n: "private و protected و #private، و parameter properties، و abstract و implements، و override، و decorators وإزاي NestJS بيستخدمها",
      items: [
        {
          cmd: "public و private و protected",
          title: "private بتاعة TS ولا #private بتاعة JS: مين بيحمي بجد؟",
          desc: R`الـ class في TS هو نفس الـ class بتاع JS (شوف درس [[class]] في «تاب JavaScript»)، وفوقه كلمات بتحدد مين يوصل لكل خاصية: [[public]] (الافتراضي، أي حد)، و [[private]] (كود جوه الكلاس ده بس)، و [[protected]] (الكلاس ده والكلاسات اللي بتورث منه).

المهم: [[private]] و [[protected]] أنواع، يعني بيتمسحوا زي أي نوع. الفحص بيحصل وقت الكتابة بس، ووقت التشغيل الخاصية عادية خالص: بتظهر في [[JSON.stringify]] وأي حد يقدر يقراها بـ [[as any]]. أما [[#secret]] فده private حقيقي من JS نفسه، والـ runtime هو اللي بيمنع.`,
          example: R`class Account {
  public owner: string;
  private pin: string;
  protected balance = 0;
  #secret = "s3cr3t";
  constructor(owner: string, pin: string) {
    this.owner = owner;
    this.pin = pin;
  }
  check(pin: string) { return pin === this.pin; }
}
class Savings extends Account {
  addInterest() { this.balance *= 1.1; }
}
const acc = new Account("sara", "1234");
acc.owner;
acc.pin; // خطأ: Property 'pin' is private and only accessible within class 'Account'
acc.balance; // خطأ: Property 'balance' is protected ...
acc.#secret; // خطأ: Property '#secret' is not accessible outside class 'Account'
console.log((acc as any).pin);    // "1234"
console.log(acc["pin"]);          // "1234"، ومن غير أي خطأ
console.log(JSON.stringify(acc)); // {"owner":"sara","pin":"1234","balance":0}`,
          try: R`شيل السطور التلاتة اللي فيها خطأ وشغّل الملف ([[npx tsc --strict]] وبعدين [[node]] على الناتج، أو [[npx tsx]]). بعدها غيّر [[private pin]] لـ [[#pin]] (ومعاها كل [[this.pin]] لـ [[this.#pin]]) وشغّل تاني: آخر ٣ سطور بقوا بيطبعوا إيه؟ وجرّب تكتب method في [[Savings]] بترجّع [[this.#pin]].`,
          flag: "script",
          deep: {
            why: R`أي كلاس ليه جزء «واجهة» بتتنادى من برّه، وجزء تفاصيل داخلية لو حد اعتمد عليها هتكسره أول ما تغيّرها. الـ modifiers بتقول ده بوضوح، والمحرر بيخفي الحاجات الـ private من الـ autocomplete. وده سؤال انترفيو ثابت: «الفرق بين private و #private؟».`,
            how: R`[[private pin]] بيخلي TS يرفض [[acc.pin]] برّه الكلاس بخطأ TS2341، و [[protected]] بيرفضها برّه الكلاس والكلاسات الوارثة (TS2445). بس في الـ JS الناتج مفيش أي أثر: الخاصية عادية على الـ object. وفيه باب خلفي معروف ومقصود: [[acc["pin"]]] بالأقواس المربعة TS بيسمح بيها من غير خطأ، وكمان [[as any]].

[[#pin]] حاجة تانية: ده جزء من JS نفسه (ES2022). الـ engine بيخزّنها برّه الخصايص العادية، فمش بتظهر في [[Object.keys]] ولا [[JSON.stringify]] ولا [[acc["#pin"]]]، والوصول ليها برّه الكلاس SyntaxError في JS و TS18013 في TS. ولو الـ target أقدم من ES2022، TS بيحوّلها لـ WeakMap عشان يحافظ على نفس الحماية.

فرق تاني: [[#pin]] مش بتتورث للوصول. [[Savings]] مش شايفة [[#pin]] بتاعة الأب خالص، زي [[private]] بالظبط. لو عايز الابن يوصل، يبقى [[protected]] (ودي ملهاش مقابل في JS).

وفي الحالتين الـ private حسب الكلاس مش حسب الـ object: method في [[Account]] تقدر تقرا [[other.#pin]] من instance تاني من نفس الكلاس.`,
            when: R`[[private]] كفاية لكود التطبيق العادي (services و controllers)، وهو اللي هتلاقيه في NestJS وأغلب الكود. [[#private]] لما الحماية لازم تبقى حقيقية: مكتبة بتنشرها، أو حاجة حساسة مش عايزها تطلع في log أو response. و [[protected]] بس لما فيه وراثة فعلًا.`,
            mistakes: R`تفتكر إن [[private]] بيخبي البيانات: [[res.json(user)]] هيطلّع الـ [[passwordHash]] الـ private عادي. وتخلط بين الاتنين في نفس الكلاس ([[private #x]] ممنوعة أصلًا). وتعمل [[protected]] لكل حاجة «احتياطي» فالكلاسات الوارثة تعتمد على تفاصيل الأب. وفي الانترفيو: «TS private بيتفحص وقت الكتابة بس وبيتمسح، و #private بيتفحص وقت التشغيل من الـ engine».`
          },
          lines: [
            "بداية الكلاس.",
            R`[[public]] هو الافتراضي، كتابته اختيارية بس بتوضّح.`,
            R`[[private]]: كود الكلاس ده بس (فحص TS).`,
            R`[[protected]]: الكلاس ده والكلاسات اللي بتورث منه.`,
            R`private حقيقي من JS نفسه، بيتفحص وقت التشغيل.`,
            "الـ constructor بياخد القيم...",
            "...ويحطها في الخصايص.",
            R`جوه الكلاس عادي نقرا [[pin]].`,
            "قفلة.",
            R`method بتقارن من غير ما تكشف [[pin]] نفسه.`,
            "قفلة الكلاس.",
            "كلاس بيورث.",
            R`[[protected]] متاحة هنا لأنه ابن.`,
            "قفلة.",
            "instance.",
            "public: مسموح.",
            R`private: TS بيرفض (TS2341).`,
            R`protected: TS بيرفض برّه الكلاس والأبناء (TS2445).`,
            R`[[#]]: TS بيرفض، والـ JS نفسه كان هيرمي SyntaxError.`,
            R`بس [[private]] مش حماية وقت التشغيل: [[as any]] بتوصل للقيمة.`,
            R`وحتى من غير as: الأقواس المربعة باب خلفي مسموح في TS.`,
            R`والخاصية الـ private بتطلع في JSON، أما [[#secret]] لأ.`
          ],
          sol: R`بعد ما تشيل السطور الغلط، الناتج مع [[private pin]]: [[1234]] مرتين، وبعدين [[{"owner":"sara","pin":"1234","balance":0}]]. يعني private مخبية الـ pin عن TS بس.

بعد ما تحوّلها لـ [[#pin]]: [[npx tsc --strict]] هيرفض [[acc["pin"]]] بـ Property 'pin' does not exist on type 'Account'، لأن مفيش خاصية اسمها pin أصلًا، فشيل السطر ده. والباقي بيطبع [[undefined]] وبعدين [[{"owner":"sara","balance":0}]]: الـ pin اختفى من الـ JSON. والـ method اللي في [[Savings]] بترجّع [[this.#pin]] بتطلّع TS18013: الابن مش شايف [[#pin]] بتاعة الأب. (ونفس الكلام مع [[private pin]]: الابن بياخد TS2341، لأن private مش protected.)

الغلط الشائع: تفتكر إن [[(acc as any).pin]] هيطلع undefined مع [[private]]. لأ، private بتتمسح.`,
          solCode: R`class Account {
  public owner: string;
  #pin: string;
  protected balance = 0;
  constructor(owner: string, pin: string) {
    this.owner = owner;
    this.#pin = pin;
  }
  check(pin: string) { return pin === this.#pin; }
}
class Savings extends Account {
  addInterest() { this.balance *= 1.1; }
  // leak() { return this.#pin; } // خطأ TS18013: الابن مش شايفها
}
const acc = new Account("sara", "1234");
console.log((acc as any).pin);    // undefined
console.log(JSON.stringify(acc)); // {"owner":"sara","balance":0}
console.log(acc.check("1234"));   // true`
        },
        {
          cmd: "parameter properties و readonly",
          title: "تعرّف الخاصية وتملاها من الـ constructor في سطر واحد",
          desc: R`لو كتبت [[public]] أو [[private]] أو [[protected]] أو [[readonly]] قبل باراميتر في الـ constructor، TS بيعمل خاصية بنفس الاسم ويحط فيها القيمة لوحده. ده اسمه parameter property، وبيوفّر تلات سطور لكل خاصية: التعريف، والباراميتر، و [[this.x = x]].

و [[readonly]] على خاصية معناها تتكتب مرة واحدة: في تعريفها أو في الـ constructor، وبعد كده لأ، حتى من جوه الكلاس. ودي فحص TS بس، زي private.`,
          example: R`class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: "EGP" | "USD",
  ) {}
  add(other: Money): Money {
    if (other.currency !== this.currency) throw new Error("عملات مختلفة");
    return new Money(this.amount + other.amount, this.currency);
  }
}
const total = new Money(100, "EGP").add(new Money(50, "EGP"));
console.log(total.amount); // 150
total.amount = 0; // خطأ: Cannot assign to 'amount' because it is a read-only property
class Config {
  readonly port: number;
  constructor() {
    this.port = Number(process.env.PORT ?? 3000);
  }
  bump() { this.port++; } // خطأ: برّه الـ constructor حتى جوه الكلاس
}`,
          try: R`اكتب [[class Product]] بـ parameter properties: [[id]] رقم [[public readonly]]، و [[name]] [[public]] عادي، و [[price]] [[private]]. وضيف method اسمها [[priceWithVat()]] بترجّع السعر × 1.14 مقرّب. غيّر الاسم من برّه، وجرّب تغيّر [[id]] وتقرا [[price]] من برّه، واطبع [[JSON.stringify]] للمنتج.`,
          flag: "script",
          deep: {
            why: R`كلاسات الـ services في الباك (وأي حاجة فيها dependency injection زي NestJS) constructor بتاعها مليان dependencies. من غير parameter properties كل dependency بتتكتب ٣ مرات. ومع [[readonly]] بتضمن إن محدش يبدّل الـ repository أو القيمة بعد ما الـ object اتعمل.`,
            how: R`[[constructor(public readonly amount: number)]] بيتحول في الـ JS لخاصية [[amount]] و [[this.amount = amount]] أول سطر في الـ constructor (وبعد [[super()]] لو فيه وراثة). يعني ده من الحاجات القليلة في TS اللي بتطلّع كود حقيقي مش أنواع بس، زي [[enum]].

وعشان كده مبيشتغلش مع [[node file.ts]] (type stripping)، و [[erasableSyntaxOnly]] في tsconfig بيرفضه بخطأ TS1294. ولو مشروعك ماشي على الطريقة دي، اكتب الخاصية والتعيين بإيدك. tsx و Vite و tsc بيفهموه عادي.

[[readonly]] بيتفحص بـ TS2540، ومش [[Object.freeze]]: وقت التشغيل الخاصية عادية وممكن تتغير لو حد عدّى الأنواع. وبيمنع إعادة التعيين بس مش التعديل جوه: [[readonly items: string[]]] بيسمح بـ [[this.items.push()]]، فلو عايز الليستة نفسها متتغيرش [[readonly string[]]].

وخاصية عادية من غير قيمة أولية ومش بتتملى في الـ constructor بتطلّع خطأ TS2564 مع [[strict]] ([[strictPropertyInitialization]]). الحل: قيمة أولية، أو تملاها في الـ constructor، أو [[name!: string]] لو حاجة تانية بتملاها (زي ORM أو framework).`,
            when: R`parameter properties في services و controllers والكلاسات اللي constructor بتاعها بياخد dependencies. و [[readonly]] على أي خاصية مش المفروض تتغير: ids، و dependencies، و value objects زي [[Money]].`,
            mistakes: R`تنسى الـ modifier ([[constructor(amount: number)]]) فمفيش خاصية بتتعمل، و [[this.amount]] يطلع خطأ. وتفتكر إن [[readonly]] بيجمّد الـ object. وتحط [[!]] على كل خاصية عشان TS2564 يسكت. وتستخدم parameter properties في مشروع شغال على [[node file.ts]] مباشرة فيقع. وفي الانترفيو: «parameter properties مش erasable، ليه ده مهم دلوقتي؟» بسبب type stripping و [[erasableSyntaxOnly]].`
          },
          lines: [
            "كلاس لقيمة فلوس.",
            "الـ constructor...",
            R`[[public readonly]] قبل الباراميتر: خاصية اتعملت واتملت لوحدها ومتتغيرش.`,
            "نفس الكلام، والنوع union من عملتين.",
            R`جسم الـ constructor فاضي: TS هو اللي هيكتب [[this.amount = amount]].`,
            R`method بترجّع [[Money]] جديد بدل ما تعدّل (عشان readonly).`,
            "متجمعش عملتين مختلفين.",
            "instance جديد بالمجموع.",
            "قفلة.",
            "قفلة الكلاس.",
            "جمع قيمتين.",
            "150.",
            R`[[readonly]]: TS2540 من برّه.`,
            "كلاس تاني بـ readonly عادي من غير parameter property.",
            "تعريف من غير قيمة...",
            "...ولازم تتملى في الـ constructor (وإلا TS2564).",
            "التعيين الوحيد المسموح.",
            "قفلة.",
            "حتى جوه الكلاس: TS2540 برّه الـ constructor.",
            "قفلة الكلاس."
          ],
          sol: R`[[priceWithVat()]] لسعر 1000 بترجّع [[1140]]، والـ JSON بيطلع [[{"id":1,"name":"كيبورد ميكانيكال","price":1000}]]: الـ [[price]] الـ private بتطلع عادي، لأن private فحص TS بس.

و [[p.id = 2]] بيطلّع TS2540 (Cannot assign to 'id' because it is a read-only property)، و [[p.price]] بيطلّع TS2341 (Property 'price' is private). أما [[p.name = ...]] مفيهوش مشكلة.

لو نسيت الـ modifier قبل [[price]] (كتبت [[price: number]] بس)، مش هتبقى خاصية أصلًا، و [[this.price]] جوه [[priceWithVat]] هيطلّع Property 'price' does not exist.`,
          solCode: R`class Product {
  constructor(
    public readonly id: number,
    public name: string,
    private price: number,
  ) {}
  priceWithVat(): number {
    return Math.round(this.price * 1.14);
  }
}
const p = new Product(1, "كيبورد", 1000);
p.name = "كيبورد ميكانيكال";
console.log(p.priceWithVat());   // 1140
console.log(JSON.stringify(p));  // {"id":1,"name":"كيبورد ميكانيكال","price":1000}
// p.id = 2;   // خطأ TS2540
// p.price;    // خطأ TS2341`
        },
        {
          cmd: "abstract و implements",
          title: "interface ولا abstract class: عقد بس، ولا عقد ومعاه كود؟",
          desc: R`[[class X implements Notifier]] بيخلي TS يتأكد إن الكلاس فيه كل اللي الـ interface طالبه. ده فحص بس: مبيورّثش أي كود، ومبيطلّعش حاجة في الـ JS.

[[abstract class]] كلاس مينفعش تعمل منه [[new]]، معمول عشان حد يورث منه. ممكن يبقى فيه كود حقيقي مشترك، و members معلّمة [[abstract]] من غير كود، وأي ابن لازم يكتبها.

الفرق المختصر: الـ interface عقد بس، وتقدر تطبّق كذا واحد. والـ abstract class عقد ومعاه كود مشترك، وتورث من واحد بس.`,
          example: R`interface Notifier {
  send(to: string, text: string): Promise<void>;
}
abstract class BaseNotifier implements Notifier {
  abstract readonly channel: string;
  protected abstract deliver(to: string, text: string): Promise<void>;
  async send(to: string, text: string) {
    console.log($__bt[$__{this.channel}] → $__{to}$__bt);
    await this.deliver(to, text);
  }
}
class SmsNotifier extends BaseNotifier {
  readonly channel = "sms";
  protected async deliver(to: string, text: string) {
    console.log("SMS:", text);
  }
}
class FakeNotifier implements Notifier {
  sent: string[] = [];
  async send(to: string, text: string) { this.sent.push(text); }
}
const n: Notifier = new SmsNotifier();
await n.send("+2010...", "كود التفعيل 4821");
new BaseNotifier(); // خطأ: Cannot create an instance of an abstract class
class EmailNotifier extends BaseNotifier {} // خطأ: missing implementations for 'channel', 'deliver'`,
          try: R`كمّل [[EmailNotifier]] صح (channel بـ [["email"]] و deliver بتطبع). واكتب [[async function notifyAll(list: Notifier[], to: string, text: string)]] بتبعت لكلهم مع بعض، وجرّبها مرة على SMS و Email، ومرة على [[FakeNotifier]] واطبع [[sent]]. وبعدين امسح الأنواع من باراميترات [[send]] في [[FakeNotifier]] وشوف [[implements]] بيدّيها أنواع ولا لأ.`,
          flag: "script",
          deep: {
            why: R`كود الباك مليان «حاجة واحدة وليها كذا تنفيذ»: إشعارات SMS و Email و Push، وتخزين ملفات local و S3، ودفع بـ Stripe أو Paymob. لو باقي الكود بيعتمد على الـ interface بس، تقدر تبدّل التنفيذ أو تحط fake في الاختبارات من غير ما تلمس حاجة. وده أساس الـ dependency injection اللي NestJS قايم عليه.`,
            how: R`[[implements]] مبيغيّرش نوع الكلاس ولا بيضيف حاجة: بيعمل فحص إن الكلاس assignable للـ interface. ولأن TS structural، [[FakeNotifier]] كان هيتقبل مكان [[Notifier]] حتى من غير [[implements]]. الفايدة إن الخطأ بيطلع عند تعريف الكلاس، مش في مكان بعيد بتستخدمه فيه.

ومهم: [[implements]] مبيدّيش أنواع لباراميترات الـ methods. [[send(to, text)]] في كلاس بيطبّق Notifier الباراميترات فيها implicit any (TS7006 مع strict). لازم تكتب الأنواع تاني.

[[abstract class]] بيفضل موجود في الـ JS ككلاس عادي (كلمة abstract بس هي اللي بتتمسح)، فتقدر تحط فيه كود مشترك زي [[send]] اللي بيطبع وبعدين ينادي [[deliver]]. ده نمط اسمه template method: الأب بيحدد الخطوات، والابن بيملا الخطوة اللي بتختلف. و [[new BaseNotifier()]] بيطلّع TS2511، وابن ناقصه member بيطلّع TS2654.

والـ interface بيتمسح خالص، فمينفعش [[x instanceof Notifier]]. الـ abstract class ينفع معاه instanceof، وده من أسباب إن NestJS بيستخدم abstract class كـ token للـ DI (قيمة موجودة وقت التشغيل) لما عايز «interface» يتحقن.`,
            when: R`interface لما عايز عقد بس (وده الأغلب، وأسهل في الاختبارات). abstract class لما فيه كود مشترك حقيقي بين كل التنفيذات، أو محتاج قيمة وقت التشغيل (instanceof أو DI token). ولو الكود المشترك صغير، composition (تبعت الـ helper كـ dependency) غالبًا أبسط من الوراثة.`,
            mistakes: R`تعمل abstract class وكل members فيه abstract ومفيهوش كود: ده interface بشكل أتقل. وتفتكر إن [[implements]] بيورّث كود أو أنواع للباراميترات. وتحاول [[instanceof]] على interface. وفي الانترفيو: «interface vs abstract class» الإجابة: عقد بس (وتطبّق كذا واحد، وبيتمسح) مقابل عقد وكود مشترك (وراثة من واحد، وموجود وقت التشغيل).`
          },
          lines: [
            "العقد: أي notifier لازم يبقى فيه send.",
            "التوقيع بس من غير كود.",
            "قفلة.",
            R`[[abstract]]: مينفعش [[new]] منه، و [[implements]] بيتأكد إنه ماشي مع العقد.`,
            R`خاصية abstract: كل ابن لازم يحددها.`,
            R`method abstract و protected: الابن يكتبها، ومحدش ينادي عليها من برّه.`,
            "كود حقيقي مشترك بين كل الأبناء...",
            "...بيطبع القناة (اللي الابن حددها)...",
            "...وينادي الخطوة اللي بتختلف.",
            "قفلة.",
            "قفلة الكلاس.",
            "ابن حقيقي.",
            "حدد القناة.",
            "وكتب الخطوة الناقصة.",
            "بيبعت SMS (هنا بيطبع بس).",
            "قفلة.",
            "قفلة الكلاس.",
            R`كلاس تاني خالص بيطبّق نفس العقد من غير وراثة: مفيد في الاختبارات.`,
            "بيحفظ الرسايل بدل ما يبعتها.",
            R`[[implements]] مبيدّيش أنواع للباراميترات، فلازم تكتبها.`,
            "قفلة.",
            R`المتغير نوعه الـ interface، فأي تنفيذ ينفع.`,
            R`بيطبع [[[sms] → +2010...]] وبعدين الرسالة.`,
            "TS2511: مينفعش instance من abstract.",
            "TS2654: الابن لازم يكتب كل الـ abstract members."
          ],
          sol: R`[[notifyAll]] على SMS و Email بيطبع ٤ سطور: [[[sms] → sara]] و [[SMS: طلبك اتشحن]] و [[[email] → sara]] و [[EMAIL: sara طلبك اتشحن]] (الترتيب ده لأن الـ console.log الأول في كل send بيحصل قبل أي await). ومع [[FakeNotifier]] مفيش حاجة بتتطبع، و [[fake.sent]] بيطلع [[[ 'omar: test' ]]].

ولما تمسح الأنواع من [[send(to, text)]] في [[FakeNotifier]]: [[tsc --strict]] بيطلّع TS7006 (Parameter 'to' implicitly has an 'any' type). يعني [[implements]] بيفحص بس، ومبيدّيش أنواع.`,
          solCode: R`// ... Notifier و BaseNotifier و SmsNotifier زي المثال
class EmailNotifier extends BaseNotifier {
  readonly channel = "email";
  protected async deliver(to: string, text: string) {
    console.log("EMAIL:", to, text);
  }
}
class FakeNotifier implements Notifier {
  sent: string[] = [];
  async send(to: string, text: string) {
    this.sent.push($__bt$__{to}: $__{text}$__bt);
  }
}
async function notifyAll(list: Notifier[], to: string, text: string) {
  await Promise.all(list.map((n) => n.send(to, text)));
}
await notifyAll([new SmsNotifier(), new EmailNotifier()], "sara", "طلبك اتشحن");
const fake = new FakeNotifier();
await notifyAll([fake], "omar", "test");
console.log(fake.sent); // [ 'omar: test' ]`
        },
        {
          cmd: "override",
          title: "تتأكد إن الـ method اللي بتكتبها في الابن بتغيّر method موجودة فعلًا في الأب",
          desc: R`[[override]] قبل method أو خاصية في الابن بتقول: «دي بتغيّر حاجة موجودة في الأب». لو مفيش حاجة بالاسم ده في الأب (غلطة إملائية، أو حد غيّر اسمها في الأب)، TS بيطلّع خطأ.

ومع [[noImplicitOverride]] في tsconfig بيبقى العكس كمان: أي member بيغيّر حاجة في الأب لازم يتكتب قبله [[override]]، فمفيش override بيحصل من غير ما تقصد. الوراثة نفسها ([[extends]] و [[super]]) في درس «extends و super» في «تاب JavaScript».`,
          example: R`class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
  toJSON() { return { status: this.status, message: this.message }; }
}
class NotFoundError extends HttpError {
  override name = "NotFoundError";
  constructor(what: string) {
    super(404, $__bt$__{what} مش موجود$__bt);
  }
  override toJSON() {
    return { ...super.toJSON(), hint: "اتأكد من الـ id" };
  }
  override toJSONN() { return {}; } // خطأ TS4117: مفيش toJSONN في الأب، Did you mean 'toJSON'?
}
const err = new NotFoundError("المنتج");
console.log(err.name, JSON.stringify(err));
// NotFoundError {"status":404,"message":"المنتج مش موجود","hint":"اتأكد من الـ id"}`,
          try: R`شيل السطر الغلط، وشغّل [[npx tsc --strict --noImplicitOverride]]. بعدين امسح كلمة [[override]] من السطرين وشغّل تاني. وأخيرًا رجّعها، وغيّر اسم [[toJSON]] في [[HttpError]] بس لـ [[toBody]] (من غير ما تلمس الابن): إيه اللي حصل، وكان هيحصل إيه لو مفيش [[override]]؟`,
          flag: "script",
          deep: {
            why: R`الوراثة فيها bug صامت كلاسيكي: الأب اتغيّر اسم method فيه، أو انت كتبت الاسم غلط في الابن، فالابن بقى بيعرّف method جديدة محدش بينادي عليها، والسلوك القديم رجع من غير أي خطأ. [[override]] بيحوّل ده لخطأ compile.`,
            how: R`[[override]] (من TS 4.3) فحص بس وبيتمسح. لو مكتوب على member مش موجود في الأب: TS4113، أو TS4117 لما يلاقي اسم قريب ويقترحه ([[Did you mean 'toJSON'?]]).

[[noImplicitOverride]] مش جزء من [[strict]]، لازم تشغّله لوحده. معاه، أي member بيغيّر حاجة في الأب من غير [[override]] بيطلّع TS4114 (This member must have an 'override' modifier). ده بيشمل الخصايص كمان: [[name]] هنا بتغيّر [[Error.prototype.name]]، فلازم [[override]].

وبيشتغل مع [[abstract]]: لما الابن يكتب member كان abstract في الأب، [[override]] مسموح بس مش إجباري حتى مع noImplicitOverride، لأن مفيش كود بيتغيّر.

و [[super.toJSON()]] بينادي نسخة الأب، فتضيف عليها بدل ما تكتبها من الأول.`,
            when: R`شغّل [[noImplicitOverride]] في أي مشروع فيه وراثة (errors مخصصة، أو كلاسات framework زي NestJS، أو أي base class). تكلفته صفر.`,
            mistakes: R`تفتكر إن [[noImplicitOverride]] جوه [[strict]]. وتفتكر إن [[override]] بيعمل حاجة وقت التشغيل: الـ override بيحصل بسبب الـ prototype chain سواء كتبتها ولا لأ. وفي الانترفيو: «إيه اللي بيحصل لو الأب غيّر اسم method والابن كان عاملها override؟» من غير الكلمة: ولا خطأ، والابن بقى فيه method يتيمة. معاها: خطأ compile.`
          },
          lines: [
            "error أساسي بـ status (parameter property).",
            "constructor.",
            R`لازم [[super()]] قبل ما [[this]] يتستخدم.`,
            "قفلة.",
            R`[[JSON.stringify]] بينادي [[toJSON]] لو موجودة.`,
            "قفلة الكلاس.",
            "ابن متخصص.",
            R`[[name]] موجودة في [[Error]]، فالكلمة لازمة مع noImplicitOverride.`,
            "constructor بياخد اسم الحاجة.",
            "بيبني الرسالة وينادي الأب.",
            "قفلة.",
            R`بيغيّر [[toJSON]] بتاعة الأب، و TS متأكد إنها موجودة.`,
            R`بياخد نسخة الأب بـ [[super]] ويضيف عليها.`,
            "قفلة.",
            R`غلطة إملائية: [[override]] مسك إن مفيش حاجة بالاسم ده في الأب.`,
            "قفلة الكلاس.",
            "instance.",
            R`الاسم اتغير، و [[toJSON]] بتاعة الابن هي اللي اشتغلت.`
          ],
          sol: R`لما تمسح [[override]] وتشغّل بـ [[--noImplicitOverride]]: خطأين TS4114 (This member must have an 'override' modifier because it overrides a member in the base class 'HttpError')، واحد على [[name]] وواحد على [[toJSON]].

ولما ترجّعها وتغيّر اسم الأب لـ [[toBody]]: [[override toJSON()]] في الابن بيطلّع TS4113 (This member cannot have an 'override' modifier because it is not declared in the base class 'HttpError')، ومعاه TS2339 على [[super.toJSON()]] لأنها مبقتش موجودة. يعني الـ compiler قالك فورًا إن الابن بقى بيغيّر حاجة مش موجودة. ومن غير [[override]] كان الكود هيعدّي عادي، والابن بقى بيعرّف [[toJSON]] جديدة، وJSON هيطبع نسخة الابن، وأي كود كان بينادي [[toBody]] هيشتغل بنسخة الأب ومن غير الـ hint، ومحدش هيعرف.`
        },
        {
          cmd: "decorators",
          title: "دالة بتلف method أو class وتغيّر سلوكها: decorators بتاعة TC39",
          desc: R`الـ decorator دالة بتتكتب فوق class أو method أو field بـ [[@]]: [[@logged]]. بتستلم الحاجة اللي عليها، وتقدر ترجّع بديل ليها (مثلًا method ملفوفة بتطبع log قبل ما تنادي الأصلية).

من TS 5.0، [[@decorator]] من غير أي إعدادات معناها decorators الرسمية بتاعة JS (اقتراح TC39 في المرحلة ٣). كل decorator بياخد باراميترين: الحاجة نفسها، و [[context]] فيه اسمها ونوعها و [[addInitializer]]. وده غير النسخة القديمة [[experimentalDecorators]] اللي NestJS لسه عليها (الدرس الجاي)، والاتنين مش متوافقين.

ومهم: Node (جرّبت على 22) لسه مبيشغّلش decorators لوحده، فـ TS لازم يحوّلها: [[target]] يبقى [[es2022]] أو أقل. [[tsc --init]] بيحط [[esnext]]، ومعاه الـ [[@]] بتفضل زي ما هي في الـ JS و Node يقع بـ SyntaxError.`,
          example: R`type Method<This, Args extends unknown[], R> = (this: This, ...args: Args) => R;
function logged<This, Args extends unknown[], R>(
  target: Method<This, Args, R>,
  context: ClassMethodDecoratorContext<This, Method<This, Args, R>>,
) {
  const name = String(context.name);
  return function (this: This, ...args: Args): R {
    console.log($__bt→ $__{name}($__{args.join(", ")})$__bt);
    return target.call(this, ...args);
  };
}
function bound(_target: unknown, context: ClassMethodDecoratorContext) {
  context.addInitializer(function (this: any) {
    this[context.name] = this[context.name].bind(this);
  });
}
class Cart {
  total = 0;
  @logged
  add(price: number) {
    this.total += price;
    return this.total;
  }
  @bound
  reset() {
    this.total = 0;
  }
}
const cart = new Cart();
cart.add(50);    // → add(50)
const { reset } = cart;
reset();         // من غير bound: TypeError، لأن this بقت undefined
console.log(cart.total); // 0`,
          try: R`اكتب decorator اسمه [[@measure]] بيطبع الوقت اللي الـ method أخدته بـ [[performance.now()]]، ويشتغل صح مع method عادية ومع method [[async]] (لو الناتج Promise استنى يخلص قبل ما تطبع). جرّبه على method بتجمع مليون رقم، و method async فيها [[setTimeout]] 120ms. وبعدين غيّر [[--target]] لـ [[esnext]] وشغّل الناتج بـ node.`,
          flag: "script",
          deep: {
            why: R`فيه منطق بيتكرر حوالين methods كتير ومالوش علاقة بشغلها: log، وقياس وقت، و cache، و retry، وصلاحيات. الـ decorator بيخليك تكتبه مرة وتحطه بسطر فوق أي method بدل ما تنسخه جوه كل واحدة. وده اللي frameworks زي NestJS و Angular و TypeORM بانيين عليه شكلهم كله.`,
            how: R`method decorator بيتنادي مرة واحدة وقت تعريف الكلاس (مش مع كل نداء)، وبياخد الـ method الأصلية و context. لو رجّع دالة، هي اللي بتتحط مكان الأصلية على الـ prototype. عشان كده [[logged]] بترجّع wrapper بينادي [[target.call(this, ...args)]].

[[context.addInitializer]] بيسجّل دالة بتشتغل مع كل instance جديد، ودي اللي [[bound]] بيستخدمها عشان يربط [[this]] (مشكلة this لما تفصل method اتشرحت في «تاب JavaScript»).

فيه أنواع context لكل حاجة: [[ClassMethodDecoratorContext]] و [[ClassFieldDecoratorContext]] و [[ClassDecoratorContext]] و [[ClassAccessorDecoratorContext]]، والأخيرة مع كلمة جديدة [[accessor]] ([[@observed accessor count = 0]]) بتعمل getter و setter تقدر تلفهم.

وفيه [[context.metadata]] (من TS 5.2) تحط فيه بيانات تقراها بعدين من [[Class[Symbol.metadata]]]، بس محتاج [[Symbol.metadata]] يكون موجود: على Node 22 مش موجود، و [[context.metadata]] بيطلع undefined لحد ما تعمل polyfill ([[Symbol.metadata ??= Symbol("Symbol.metadata")]]).

والفرق الكبير عن القديم: الرسمية مفيهاش parameter decorators (زي [[@Body()]] على باراميتر)، ومفيهاش [[emitDecoratorMetadata]]. ومش كل الأدوات بتحوّلها: tsc و esbuild (tsx و Vite) بيحوّلوها، بس [[node file.ts]] (type stripping) لأ.`,
            when: R`منطق مشترك حوالين methods في كلاسات انت كاتبها (log و cache و retry و measure) لو المشروع أصلًا class-based. لو الكود functions عادية، higher-order function ([[withLog(fn)]]) أبسط ومش محتاجة أي إعداد. ولو شغال في NestJS أو Angular، انت ماشي على نظامهم، مش على الرسمية.`,
            mistakes: R`تشغّل [[target: esnext]] (افتراضي [[tsc --init]]) وتستغرب SyntaxError عند [[@]]. وتخلط بين الـ API القديم [[(target, key, descriptor)]] والجديد [[(value, context)]] فتنسخ decorator من مقال قديم ميشتغلش. وتنسى [[this]] في الـ wrapper ([[target(...args)]] بدل [[target.call(this, ...args)]]) فالـ method تفقد الـ instance. و wrapper لـ method async بيعمل [[result.finally(...)]] ويسيبه: لو الـ Promise اترفضت هيبقى عندك unhandled rejection زيادة، استخدم [[result.then(done, done)]]. وفي الانترفيو: «الـ decorator بيتنادي إمتى؟» مرة واحدة وقت تعريف الكلاس، مش مع كل نداء.`
          },
          lines: [
            "نوع مساعد لأي method: this وباراميترات ونوع رجوع.",
            R`decorator generic عشان يحافظ على نوع الـ method اللي بيلفها.`,
            "الباراميتر الأول: الـ method الأصلية.",
            R`التاني: [[context]]، فيه الاسم و [[kind]] و [[addInitializer]].`,
            "بداية الجسم.",
            "اسم الـ method من الـ context.",
            R`بيرجّع دالة جديدة هتتحط مكان الأصلية.`,
            "log قبل النداء.",
            R`ينادي الأصلية بنفس [[this]] ونفس الـ arguments.`,
            "قفلة الـ wrapper.",
            "قفلة الـ decorator.",
            R`decorator تاني مش بيرجّع حاجة، فالـ method بتفضل زي ما هي.`,
            R`[[addInitializer]]: كود بيشتغل مع كل [[new Cart()]].`,
            R`بيحط على الـ instance نسخة مربوطة بـ [[bind]].`,
            "قفلة.",
            "قفلة.",
            "الكلاس.",
            "field عادي.",
            R`الـ decorator فوق الـ method على طول.`,
            "method عادية.",
            "تعديل.",
            "رجوع.",
            "قفلة.",
            R`[[@bound]] على reset.`,
            "method.",
            "تصفير.",
            "قفلة.",
            "قفلة الكلاس.",
            "instance.",
            R`بيطبع [[→ add(50)]] قبل ما يجمع.`,
            R`فصلنا الـ method عن الـ object.`,
            R`اشتغلت صح لأن [[bound]] ربطها.`,
            "0."
          ],
          sol: R`الناتج شكله كده (الأرقام بتختلف حسب الجهاز): [[sum: 5ms]] وبعدين [[499999500000]]، وبعدين [[slow: 121ms]] وبعدين [[تمام]]. المهم إن وقت [[slow]] حوالي 120ms أو أكتر: لو طلعلك 0ms يبقى طبعت الوقت أول ما الـ Promise اترجعت، مش لما خلصت.

الحيلة: لو الناتج [[instanceof Promise]]، اطبع في [[then]]. واستخدم [[result.then(done, done)]] مش [[result.finally(done)]]، لأن finally بترجّع Promise جديدة ولو الأصلية اترفضت، الجديدة دي كمان هتترفض ومحدش ماسكها. ورجّع [[result]] الأصلي زي ما هو عشان اللي بينادي يعمل await و catch عادي.

ومع [[--target esnext]]: tsc بيعدّي من غير أخطاء، بس [[node]] على الناتج بيقع بـ [[SyntaxError: Invalid or unexpected token]] عند [[@measure]]، لأن TS ساب الـ decorator زي ما هو و Node مبيفهموش.`,
          solCode: R`function measure<This, Args extends unknown[], R>(
  target: (this: This, ...args: Args) => R,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => R>,
) {
  const name = String(context.name);
  return function (this: This, ...args: Args): R {
    const start = performance.now();
    const result = target.call(this, ...args);
    const done = () => console.log($__bt$__{name}: $__{(performance.now() - start).toFixed(0)}ms$__bt);
    if (result instanceof Promise) result.then(done, done);
    else done();
    return result;
  };
}
class Reports {
  @measure
  sum(n: number) {
    let s = 0;
    for (let i = 0; i < n; i++) s += i;
    return s;
  }
  @measure
  async slow() {
    await new Promise((r) => setTimeout(r, 120));
    return "تمام";
  }
}
const r = new Reports();
console.log(r.sum(1_000_000));
console.log(await r.slow());
// npx tsc --strict --target es2022 --module nodenext --types node measure.ts && node measure.js`
        },
        {
          cmd: "experimentalDecorators و NestJS",
          title: "NestJS بيعرف يحقن الـ dependencies من نوع الباراميتر إزاي؟",
          desc: R`NestJS (زي Angular و TypeORM) مبني على النسخة القديمة من الـ decorators: [[experimentalDecorators]] مع [[emitDecoratorMetadata]] في tsconfig. ولحد NestJS 12، التمبلت بتاع [[nest new]] لسه بيحط الاتنين.

الخيار التاني هو السر: TS بيكتب في الـ JS أنواع باراميترات الـ constructor كقيم ([[design:paramtypes]]). فلما تكتب [[constructor(private readonly db: Db)]]، Nest بيقرا الـ metadata، يلاقي [[Db]]، يعمل منه instance (أو ياخد الموجود)، ويبعته. ده الـ dependency injection. المثال بيبني نسخة صغيرة من الفكرة دي بـ [[reflect-metadata]].

وفي Nest الشكل كده: [[@Controller("users")]] على الكلاس، و [[@Get(":id")]] على الـ method، و [[@Param("id")]] و [[@Body()]] على الباراميترات، و [[@Injectable()]] على الـ service. التفاصيل في «تاب Backend بـ Node».`,
          example: R`// npm i reflect-metadata
// npx tsc --strict --target es2023 --module nodenext --types node --experimentalDecorators --emitDecoratorMetadata di.ts
import "reflect-metadata";
type Ctor<T = unknown> = new (...args: any[]) => T;
function Injectable(): ClassDecorator {
  return () => {};
}
function resolve<T>(cls: Ctor<T>): T {
  const deps: Ctor[] = Reflect.getMetadata("design:paramtypes", cls) ?? [];
  return new cls(...deps.map((d) => resolve(d)));
}
@Injectable()
class Db {
  query(sql: string) { return [{ id: 1, sql }]; }
}
@Injectable()
class UsersService {
  constructor(private readonly db: Db) {}
  findAll() { return this.db.query("select * from users"); }
}
const users = resolve(UsersService);
console.log(users.findAll()); // [ { id: 1, sql: 'select * from users' } ]`,
          try: R`شغّل المثال بـ tsc بالإعدادات اللي في التعليق وبعدين [[node di.js]]. بعدها شغّله بـ [[npx tsx di.ts]] وقارن. وأخيرًا ضيف [[@Injectable() class Mailer]] الـ constructor بتاعه بياخد [[UsersService]] و [[Db]]، وفيه method [[welcomeAll()]] بترجّع [[welcome #1]] لكل user، واطلبه بـ [[resolve(Mailer)]].`,
          flag: "script",
          deep: {
            why: R`NestJS من أكتر الـ backends المطلوبة في إعلانات الشغل، وشكله مختلف تمامًا عن Express: كل حاجة كلاس عليه decorators، ومحدش بيعمل [[new]] بإيده. لو مش فاهم إن ده كله TS metadata وقت الـ build، الأخطاء زي «Nest can't resolve dependencies of UsersService (?)» هتبان سحر.`,
            how: R`مع [[experimentalDecorators]]، الـ decorators بتشتغل بالتوقيع القديم: class decorator بياخد الـ constructor، و method decorator بياخد [[(target, key, descriptor)]]، وفيه parameter decorators ([[@Body()]] و [[@Inject(TOKEN)]]) اللي الرسمية معندهاش خالص. وده السبب الأساسي إن Nest فاضل عليها.

ومع [[emitDecoratorMetadata]]، على أي كلاس أو method عليها decorator، TS بيضيف في الـ JS نداء زي [[__metadata("design:paramtypes", [Db])]]. يعني نوع اتحول لقيمة وقت التشغيل، وده الاستثناء الوحيد تقريبًا لقاعدة «الأنواع بتتمسح». وبيشتغل بس لو النوع كلاس (قيمة موجودة): لو الباراميتر interface أو union، الـ metadata بتبقى [[Object]] ومفيش حاجة تتحقن. عشان كده Nest بيستخدم كلاسات أو [[@Inject("TOKEN")]].

[[reflect-metadata]] polyfill بيضيف [[Reflect.getMetadata]]، و Nest بيستورده لوحده. والـ [[resolve]] في المثال بيعمل instance جديد كل مرة، أما Nest بيعمل instance واحد لكل provider (singleton) جوه الـ module ويعيد استخدامه.

الـ metadata بيكتبها tsc بس (و SWC لو شغلت الخيار ده فيه). esbuild (tsx و Vite) مبيكتبهاش، فـ [[resolve]] بيلاقي مفيش dependencies ويعمل [[new UsersService()]] من غير Db.

واتنين في tsconfig بتاع Nest لازم تعرفهم: [[strictPropertyInitialization: false]] (عشان DTOs زي [[class CreateUserDto { name: string }]] من غير constructor)، و [[target]] ES2023 مش esnext.`,
            when: R`في مشروع NestJS أو Angular أو TypeORM: سيب الإعدادات زي ما التمبلت عاملها ومتحاولش تحوّل للرسمية. في كود جديد مش مربوط بـ framework منهم: الرسمية (الدرس اللي فات)، أو من غير decorators خالص.`,
            mistakes: R`تشغّل Nest بـ tsx أو esbuild فيطلع [[Cannot read properties of undefined]] على dependency، أو Nest يقول can't resolve. وتكتب [[import type { Db }]] أو النوع interface فالـ metadata تبقى Function أو Object بدل الكلاس (جرّبتها بـ [[import type]] وطلعت [[[Function: Function]]]). ودوائر: A محتاج B و B محتاج A، والحل في Nest [[forwardRef]]. وتنسخ decorator رسمي في مشروع شغال بـ [[experimentalDecorators]] أو العكس. وفي الانترفيو: «إزاي Nest بيعرف يحقن من غير ما تقوله؟» الإجابة: [[emitDecoratorMetadata]] بيكتب أنواع الـ constructor كـ [[design:paramtypes]]، و Nest بيقراها بـ [[reflect-metadata]].`
          },
          lines: [
            R`polyfill بيضيف [[Reflect.getMetadata]] و [[Reflect.defineMetadata]].`,
            R`نوع «أي كلاس ينفع يتعمل منه [[new]]».`,
            R`decorator بالتوقيع القديم، زي [[@Injectable()]] في Nest.`,
            R`مبيعملش حاجة: وجوده بس بيخلي TS يكتب metadata الكلاس.`,
            "قفلة.",
            "الـ container بتاعنا: بيبني أي كلاس بالـ dependencies بتاعته.",
            R`بيقرا أنواع باراميترات الـ constructor اللي TS كتبها كقيم.`,
            "يبني كل dependency (بنفس الطريقة) ويبعتهم للـ constructor.",
            "قفلة.",
            "decorator على الكلاس.",
            R`dependency مفيهاش dependencies.`,
            "بترجّع داتا وهمية.",
            "قفلة.",
            "service تانية.",
            "بتعتمد على Db...",
            R`[[private readonly db: Db]]: parameter property، و TS كتب [[Db]] في الـ metadata.`,
            R`بتستخدم الـ db اللي اتحقن.`,
            "قفلة.",
            R`محدش كتب [[new Db()]]: الـ container هو اللي عملها.`,
            R`بيطبع الصف، يعني [[db]] اتحقن صح.`
          ],
          sol: R`بـ tsc و node: بيطبع [[[ { id: 1, sql: 'select * from users' } ]]].

بـ [[npx tsx di.ts]]: [[TypeError: Cannot read properties of undefined (reading 'query')]]. esbuild مكتبش [[design:paramtypes]]، فـ [[resolve]] لقى ليستة فاضية وعمل [[new UsersService()]] من غير Db. ده بالظبط اللي بيحصل لو شغلت Nest بأداة مبتكتبش decorator metadata.

و [[resolve(Mailer).welcomeAll()]] بيطبع [[[ 'welcome #1' ]]]، و [[Reflect.getMetadata("design:paramtypes", Mailer)]] بيطلع [[[ [class UsersService], [class Db] ]]]: الـ container بنى UsersService (ومعاها Db) وبنى Db تانية لـ Mailer. في Nest كانوا هيبقوا نفس الـ Db (singleton).`,
          solCode: R`// نفس المثال، وتحت UsersService:
@Injectable()
class Mailer {
  constructor(private readonly users: UsersService, private readonly db: Db) {}
  welcomeAll() {
    return this.users.findAll().map((u) => $__btwelcome #$__{u.id}$__bt);
  }
}
console.log(resolve(Mailer).welcomeAll());                      // [ 'welcome #1' ]
console.log(Reflect.getMetadata("design:paramtypes", Mailer));  // [ [class UsersService], [class Db] ]`
        },
        {
          cmd: "generic classes",
          title: "كلاس واحد يشتغل مع أي نوع ويفضل فاكره",
          desc: R`زي الدوال الـ generic (درس [[generics]])، الكلاس ممكن ياخد باراميتر نوع: [[class TtlCache<K, V>]]. كل instance بيتثبّت على نوع: [[new TtlCache<number, User>()]]، وبعد كده كل الـ methods عارفة إن المفتاح number والقيمة User.

وتقدر تحط constraint زي الدوال: [[class Repository<T extends { id: number }>]].`,
          example: R`class TtlCache<K, V> {
  #store = new Map<K, { value: V; expires: number }>();
  constructor(private readonly ttlMs: number) {}
  set(key: K, value: V): void {
    this.#store.set(key, { value, expires: Date.now() + this.ttlMs });
  }
  get(key: K): V | undefined {
    const hit = this.#store.get(key);
    if (!hit || hit.expires < Date.now()) return undefined;
    return hit.value;
  }
}
type User = { id: number; name: string };
const users = new TtlCache<number, User>(60_000);
users.set(1, { id: 1, name: "sara" });
console.log(users.get(1)?.name); // "sara"
users.set("1", { id: 1, name: "sara" }); // خطأ: string مش number
const loose = new TtlCache(1000); // K و V بقوا unknown
loose.set("x", 5);                // أي حاجة تعدّي`,
          try: R`اكتب [[class Repository<T extends { id: number }>]] فيه [[add(item)]] و [[findById(id)]] و [[all()]] على [[Map]] private. جرّبه على [[User]] وعلى [[Product]] ([[id]] و [[title]] و [[price]]). وبعدين جرّب [[new Repository<string>()]] و [[users.add({ id: 2 })]].`,
          flag: "script",
          deep: {
            why: R`الـ repositories والـ caches والـ queues والـ stores شكلها واحد مهما كان نوع الداتا. من غير generics يا تكتب كلاس لكل نوع، يا تستخدم [[any]] وتخسر الفحص. والـ SDKs مليانة الشكل ده ([[new Map<K, V>]] نفسه كلاس generic).`,
            how: R`باراميتر النوع بيتحدد مع [[new]]: يا تكتبه صريح [[new TtlCache<number, User>(...)]]، يا TS يستنتجه من arguments الـ constructor. في [[TtlCache]] الـ constructor بياخد [[ttlMs]] بس، فمفيش حاجة يستنتج منها K و V، فبيبقوا [[unknown]] وأي حاجة تعدّي. عشان كده اكتبهم لما الـ constructor مبيكشفهمش.

الـ static members مينفعش تستخدم باراميترات النوع ([[static empty: T]] بيطلّع TS2302)، لأن الـ static واحد للكلاس كله، والـ T بتختلف مع كل instance.

والـ generics بتتمسح زي أي نوع: [[new TtlCache<number, User>()]] و [[new TtlCache<string, Product>()]] نفس الكلاس وقت التشغيل، فمينفعش تسأل الـ instance «انت T بتاعك إيه؟».

وتقدر تحط default: [[class Page<T = unknown>]]، و constraint زي الدوال بالظبط.`,
            when: R`كلاسات «حاوية» لداتا: cache، و repository، و event emitter بأنواع events، و result wrapper. لو الكلاس بيتعامل مع نوع واحد بس، متعملوش generic.`,
            mistakes: R`[[new Cache()]] من غير أنواع فكله unknown (أو any في كود قديم). و generic كلاس بـ ٤ باراميترات محدش فاهمها. وتفتكر إنك تقدر تعمل [[new T()]] جوه الكلاس: T نوع ومش موجود وقت التشغيل، لازم تبعت الكلاس نفسه كباراميتر ([[ctor: new () => T]]).`
          },
          lines: [
            R`كلاس بنوعين: المفتاح [[K]] والقيمة [[V]].`,
            R`[[Map]] private بنفس الأنواع، وكل قيمة معاها وقت انتهاء.`,
            "parameter property: مدة الصلاحية.",
            R`[[set]] بياخد K و V بس.`,
            "بيخزن القيمة ووقت انتهائها.",
            "قفلة.",
            R`[[get]] بترجّع V أو undefined.`,
            "بيدوّر.",
            "مش موجود أو انتهى: undefined.",
            "القيمة بنوعها V.",
            "قفلة.",
            "قفلة الكلاس.",
            "نوع.",
            "instance ثابت على number و User.",
            "مسموح.",
            R`TS عارف إن الناتج User، فـ [[name]] بتكمّل.`,
            R`المفتاح لازم number: TS2345.`,
            R`من غير أنواع ومن غير arguments توضّحها: K و V بقوا [[unknown]].`,
            "فأي نوع مقبول، والفحص راح."
          ],
          sol: R`الناتج [[sara]] وبعدين [[[ 350 ]]]. و [[users.findById(1)]] نوعها [[User | undefined]]، فلازم [[?.]] أو فحص.

و [[new Repository<string>()]] بيطلّع TS2344 (Type 'string' does not satisfy the constraint '{ id: number; }')، و [[users.add({ id: 2 })]] بيطلّع TS2741 (Property 'name' is missing): الـ repository فاكر إنه بتاع User.

ولو كتبت الكلاس من غير constraint ([[class Repository<T>]])، [[item.id]] جوه [[add]] هتطلّع Property 'id' does not exist on type 'T'. الـ constraint هو اللي بيقول لـ TS إن أي T فيها id.`,
          solCode: R`class Repository<T extends { id: number }> {
  #items = new Map<number, T>();
  add(item: T): T {
    this.#items.set(item.id, item);
    return item;
  }
  findById(id: number): T | undefined {
    return this.#items.get(id);
  }
  all(): T[] {
    return [...this.#items.values()];
  }
}
type User = { id: number; name: string };
type Product = { id: number; title: string; price: number };
const users = new Repository<User>();
users.add({ id: 1, name: "sara" });
console.log(users.findById(1)?.name);           // sara
const products = new Repository<Product>();
products.add({ id: 7, title: "ماوس", price: 350 });
console.log(products.all().map((p) => p.price)); // [ 350 ]`
        }
      ]
    }
]);
