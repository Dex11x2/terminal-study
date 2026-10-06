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
          teach: R`## الفكرة في سطر

بدل ما تكتب النوع بإيدك جنب القيمة، بتسأل TS: «القيمة دي نوعها إيه؟» ([[typeof]])، «أسماء خصايصه إيه؟» ([[keyof]])، «والخاصية دي نوعها إيه؟» ([[T[K]]]). التلاتة بيشتغلوا وقت الفحص بس، ومش بيطلع منهم أي سطر في الـ JS.

كل الأنواع اللي تحت طالعة من TypeScript 6.0.3 نفسه على ويندوز 11 (طلبنا منه يكتب النوع الكامل لكل اسم، زي ما المحرر بيوريك لما تحط الماوس)، والأخطاء من [[npx tsc --strict --noEmit]]، ونفس النتايج طلعت من TS 7.0.2.

---

## ١. القيمة الأصلية

~~~text app.ts
const config = { apiUrl: "https://api.example.com", retries: 3, debug: false };
~~~

ده object عادي جدًا في JS. و TS بيستنتج نوعه لوحده (type inference، درس المستوى ١):

~~~text النوع اللي TS استنتجه
const config: { apiUrl: string; retries: number; debug: boolean; }
~~~

لاحظ إن [[3]] بقت [[number]] و [["https://..."]] بقت [[string]]: TS بيوسّع (widening) قيم خصايص الـ object لأنها ممكن تتغير بعدين. ده هيفرق في درس [[as const]].

---

## ٢. [[typeof config]]: نوع القيمة

~~~text app.ts
type Config = typeof config;
~~~

- [[type Config =]] بيعرّف اسم لنوع (type alias).
- [[typeof]] هنا **في مكان نوع** (بعد [[=]] في سطر [[type]])، فمعناها: «هات نوع المتغير ده».

~~~text الناتج
type Config = { apiUrl: string; retries: number; debug: boolean; }
~~~

> [[typeof]] ليها معنيين: في كود عادي زي [[if (typeof x === "string")]] دي JS وبترجع نص وقت التشغيل. في مكان نوع دي TS وبتطلّع نوع وقت الفحص. السياق هو اللي بيحدد.

---

## ٣. [[keyof Config]]: أسماء الخصايص

~~~text app.ts
type ConfigKey = keyof Config;
~~~

[[keyof]] بياخد نوع object ويرجّع **union** (يعني «واحد من دول») من أسماء خصايصه، كل اسم كـ literal:

~~~text الناتج
type ConfigKey = "apiUrl" | "retries" | "debug"
~~~

العلامة [[|]] بين الأنواع معناها «أو». يعني [[ConfigKey]] مش أي string: هو واحد من التلات أسماء دول بس.

---

## ٤. الدالة [[getSetting]]: الكل مع بعض

~~~text app.ts
function getSetting<K extends ConfigKey>(key: K): Config[K] {
  return config[key];
}
~~~

نفكها حتة حتة:

| الحتة | معناها |
|---|---|
| [[<K ...>]] | باراميتر نوع (generic): نوع بيتحدد وقت النداء |
| [[extends ConfigKey]] | شرط: K لازم يبقى واحد من أسماء الخصايص |
| [[(key: K)]] | الـ argument نفسه نوعه K |
| [[: Config[K]]] | نوع الرجوع: نوع الخاصية اللي اسمها K بالظبط |
| [[config[key]]] | قراية عادية في JS بالأقواس المربعة |

[[Config[K]]] اسمه **indexed access type**: نفس فكرة [[obj[key]]] بس على الأنواع. ولما تنادي:

~~~text app.ts
const r = getSetting("retries");
~~~

TS بيحط [[K = "retries"]]، فنوع الرجوع [[Config["retries"]]] يعني [[number]]:

~~~text الناتج
const r: number
~~~

وجرّبنا اسم مش موجود:

~~~text خطأ tsc
getSetting("timeout");
error TS2345: Argument of type '"timeout"' is not assignable to parameter of type '"apiUrl" | "retries" | "debug"'.
~~~

### ليه الـ generic؟

لو كتبتها من غير K، كده: [[function getLoose(key: ConfigKey) { return config[key]; }]]، الناتج بيبقى union كل الأنواع:

~~~text الناتج
const x: string | number | boolean
~~~

الـ generic هو اللي بيربط «المفتاح اللي بعته» بـ «نوع القيمة اللي راجعة». ولو شغّلت الملف بـ [[npx tsx]] و [[console.log(getSetting("retries"), getSetting("apiUrl"))]] هيطبع [[3 https://api.example.com]]: وقت التشغيل دي قراية عادية.

---

## ٥. [[User["role"]]]: تنزل جوه نوع مكتوب

~~~text app.ts
type User = { id: string; role: "admin" | "user"; address: { city: string } };
type Role = User["role"];
type City = User["address"]["city"];
~~~

هنا مفيش [[typeof]] لأن [[User]] أصلًا نوع. الأقواس المربعة بتاخد نوع خاصية، وتقدر تكررها عشان تنزل مستوى:

~~~text الناتج
type Role = "admin" | "user"
type City = string
~~~

ولو كتبت اسم خاصية مش موجود: [[Config["nope"]]] بيطلّع TS2339 (Property 'nope' does not exist).

---

## ٦. [[(typeof ROLES)[number]]]: union من array

~~~text app.ts
const ROLES = ["admin", "user", "guest"] as const;
type AnyRole = (typeof ROLES)[number];
~~~

من جوه لبرة:

1. [[as const]] بيخلي الـ array ثابت (درسه في الكاتيجوري الجاية)، فنوعه [[readonly ["admin", "user", "guest"]]] مش [[string[]]].
2. [[typeof ROLES]] بيطلّع النوع ده.
3. [[[number]]] معناها «نوع العنصر اللي في أي index رقمي»، يعني أي عنصر.

~~~text الناتج
type AnyRole = "admin" | "user" | "guest"
~~~

ومن غير [[as const]] كان الناتج [[string]] بس، لأن TS كان هيوسّع العناصر.

---

## ٧. الأخطاء اللي هتقابلك

~~~text خطأ tsc
type X = typeof User;
error TS2693: 'User' only refers to a type, but is being used as a value here.

type K = keyof config;
error TS2749: 'config' refers to a value, but is being used as a type here. Did you mean 'typeof config'?
~~~

القاعدة: [[typeof]] بتاخد **قيمة** (حاجة موجودة وقت التشغيل)، و [[keyof]] بتاخد **نوع**. فمع object عادي لازم الاتنين: [[keyof typeof config]].

---

## الخلاصة

| تكتب | بتاخد | بترجّع |
|---|---|---|
| [[typeof x]] | قيمة | نوعها |
| [[keyof T]] | نوع | union أسماء خصايصه |
| [[T["k"]]] | نوع ومفتاح | نوع الخاصية دي |
| [[T[keyof T]]] | نوع | union كل أنواع القيم ([[string or number or boolean]] في config) |
| [[Arr[number]]] | نوع array أو tuple | نوع العنصر |

والمكسب: تغيّر [[config]]، وكل الأنواع اللي طالعة منه تتغير لوحدها.`,
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
          teach: R`## الفكرة في سطر

[[Partial]] و [[Required]] و [[Readonly]] دوال بس للأنواع: بتديها نوع بين [[< >]]، وترجّعلك نسخة منه متعدّلة. الأصل مبيتغيرش، والنسخة بتتحدّث لوحدها لما الأصل يتغير.

كل الناتج تحت من TypeScript 6.0.3 على ويندوز 11 ([[npx tsc --strict --noEmit]] للأخطاء، و [[npx tsx]] للتشغيل)، ونفس الأخطاء طلعت من TS 7.0.2.

---

## ١. الموديل

~~~text app.ts
type User = { id: string; name: string; email: string; bio?: string };
~~~

[[?]] بعد اسم الخاصية معناها «اختيارية»: ممكن تبقى موجودة وممكن لأ.

---

## ٢. [[Partial<Omit<User, "id">>]]: من جوه لبرة

~~~text app.ts
type UserPatch = Partial<Omit<User, "id">>;
~~~

### الخطوة ١: [[Omit<User, "id">]]

[[Omit]] بيشيل خصايص بالاسم (درسه الجاي). شلنا [[id]] لأن العميل مش المفروض يغيّره:

~~~text الناتج
{ name: string; email: string; bio?: string | undefined; }
~~~

### الخطوة ٢: [[Partial<...>]]

بيحط [[?]] على **كل** خاصية:

~~~text الناتج
type UserPatch = { name?: string | undefined; email?: string | undefined; bio?: string | undefined; }
~~~

ليه [[| undefined]] ظهرت؟ لأن الخاصية الاختيارية في TS (من غير إعداد [[exactOptionalPropertyTypes]]) معناها «مش موجودة، أو موجودة وقيمتها undefined». المحرر بيكتبها صريحة.

---

## ٣. الدالة والنداءين

~~~text app.ts
function updateUser(id: string, patch: UserPatch) {
  return { id, ...patch };
}
updateUser("u1", { name: "Sara" });
updateUser("u1", { age: 5 });
~~~

- [[{ id, ...patch }]]: object جديد فيه [[id]]، وبعده [[...]] (spread) بينسخ كل خصايص [[patch]] جواه.
- النداء الأول بيبعت اللي اتغير بس، ومقبول لأن كله اختياري. ولو طبعناه: [[{ id: 'u1', name: 'Sara' }]].
- النداء التاني فيه خاصية مش في [[User]] أصلًا:

~~~text خطأ tsc
error TS2353: Object literal may only specify known properties, and 'age' does not exist in type 'Partial<Omit<User, "id">>'.
~~~

> فخ: [[updateUser("u1", {})]] مقبول، لأن object فاضي ماشي مع «كله اختياري». لو محتاج حاجة واحدة على الأقل، افحصها في الكود.

---

## ٤. [[Required<Settings>]]: العكس

~~~text app.ts
type Settings = { theme?: "light" | "dark"; lang?: "ar" | "en" };
const defaults: Required<Settings> = { theme: "light", lang: "ar" };
~~~

[[Required]] بيشيل كل [[?]]:

~~~text الناتج
type Required<Settings> = { theme: "light" | "dark"; lang: "ar" | "en"; }
~~~

فلو نسيت حاجة في القيم الافتراضية:

~~~text خطأ tsc
const defaults: Required<Settings> = { theme: "light" };
error TS2741: Property 'lang' is missing in type '{ theme: "light"; }' but required in type 'Required<Settings>'.
~~~

---

## ٥. [[Readonly<User>]]: للقراية بس

~~~text app.ts
const frozen: Readonly<User> = { id: "1", name: "A", email: "a@example.com" };
frozen.name = "B";
~~~

بيحط [[readonly]] قبل كل خاصية:

~~~text الناتج
{ readonly id: string; readonly name: string; readonly email: string; readonly bio?: string | undefined; }
~~~

~~~text خطأ tsc
error TS2540: Cannot assign to 'name' because it is a read-only property.
~~~

> ده فحص TS بس. في الـ JS اللي بيطلع، [[frozen]] object عادي ومش [[Object.freeze]].

---

## ٦. حل التجربة: [[merge]] وفخ undefined

~~~text merge.ts
function merge(s: Settings): Required<Settings> {
  return { ...defaults, ...s };
}
console.log(merge({ theme: "dark" }));
console.log(merge({ lang: undefined }));
~~~

الـ spread بيكتب من الشمال لليمين: الافتراضي الأول، وبعدين اللي المستخدم بعته فوقه.

~~~text الناتج (npx tsx merge.ts)
{ theme: 'dark', lang: 'ar' }
{ theme: 'light', lang: undefined }
~~~

السطر التاني [[lang]] فيه [[undefined]] مع إن نوع الرجوع بيقول [["ar" | "en"]]، و [[tsc --strict]] ساكت. لو شغّلت [[--exactOptionalPropertyTypes]]:

~~~text خطأ tsc
error TS2379: Argument of type '{ lang: undefined; }' is not assignable to parameter of type 'Settings' with 'exactOptionalPropertyTypes: true'.
~~~

---

## الخلاصة

| النوع | بيعمل إيه | تستخدمه في |
|---|---|---|
| [[Partial<T>]] | كل الخصايص اختيارية | PATCH و forms على مراحل |
| [[Required<T>]] | مفيش ولا خاصية اختيارية | الإعدادات بعد دمج الافتراضي |
| [[Readonly<T>]] | كل الخصايص للقراية بس | state و props |

والتلاتة **سطحيين**: بيأثروا على المستوى الأول من الخصايص بس، مش على الـ objects اللي جواها.`,
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

والـ merge زي الكود تحت: [[merge({ theme: "dark" })]] بترجع [[{ theme: 'dark', lang: 'ar' }]]. الفخ: [[merge({ lang: undefined })]] بترجع [[{ theme: 'light', lang: undefined }]]، لأن الـ spread بيكتب undefined فوق الـ default، و TS ساكت مع إن النوع بيقول Required. الإعداد [[exactOptionalPropertyTypes]] بيمسكها (TS2379)، وهو موجود في الـ tsconfig اللي [[tsc --init]] بيعمله في TS 6 و TS 7.`,
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
          teach: R`## الفكرة في سطر

من موديل واحد بتطلّع كل الأشكال اللي محتاجها: [[Pick]] بياخد خصايص بالاسم، و [[Omit]] بيشيل خصايص بالاسم، و [[Record]] بيعمل قاموس مفاتيحه وقيمه انت محددهم.

الأنواع تحت طالعة من TypeScript 6.0.3 (النوع الكامل زي ما المحرر بيوريه)، والأخطاء من [[npx tsc --strict --noEmit]] على ويندوز 11، واتأكدنا منها على TS 7.0.2.

---

## ١. الموديل

~~~text app.ts
type Role = "admin" | "editor" | "viewer";
type User = { id: string; name: string; email: string; password: string; role: Role };
~~~

[[Role]] union من ٣ نصوص ثابتة (literal types): أي متغير نوعه [[Role]] لازم يبقى واحد منهم بالظبط.

---

## ٢. [[Omit]]: شيل

~~~text app.ts
type PublicUser = Omit<User, "password">;
type NewUser = Omit<User, "id">;
~~~

[[Omit<T, K>]]: «T من غير الخصايص اللي في K». ولو عايز تشيل أكتر من واحدة: [[Omit<User, "id" | "password">]].

~~~text الناتج
type PublicUser = { id: string; name: string; email: string; role: Role; }
type NewUser = { password: string; name: string; email: string; role: Role; }
~~~

([[NewUser]] مثلًا للـ create: الـ id القاعدة هي اللي بتعمله.)

---

## ٣. [[Pick]]: خد

~~~text app.ts
type UserPreview = Pick<User, "id" | "name">;
~~~

[[Pick<T, K>]] العكس: «من T خد الخصايص اللي في K بس».

~~~text الناتج
type UserPreview = { id: string; name: string; }
~~~

---

## ٤. الفرق المهم: مين بيمسك الغلطة الإملائية

جرّبنا الاتنين باسم غلط ([[pasword]] بـ s واحدة):

~~~text app.ts
type Typo = Omit<User, "pasword">;
type BadPick = Pick<User, "pasword">;
~~~

~~~text خطأ tsc (على سطر Pick بس)
error TS2344: Type '"pasword"' does not satisfy the constraint 'keyof User'.
~~~

و [[Omit]] عدّت من غير ولا كلمة، والنتيجة لسه فيها الباسورد:

~~~text الناتج
type Typo = { password: string; id: string; name: string; email: string; role: Role; }
~~~

ليه؟ لأن تعريفهم في مكتبة TS مختلف:

| | الشرط على K | الغلطة الإملائية |
|---|---|---|
| [[Pick<T, K extends keyof T>]] | لازم يبقى من مفاتيح T | خطأ TS2344 |
| [[Omit<T, K extends keyof any>]] | أي string أو number أو symbol | بتعدّي بصمت |

---

## ٥. [[Record<K, V>]]: قاموس

~~~text app.ts
const permissions: Record<Role, string[]> = {
  admin: ["*"],
  editor: ["posts:write"],
  viewer: ["posts:read"],
};
~~~

[[Record<K, V>]] معناها «object كل مفتاح فيه من نوع K، وكل قيمة من نوع V». ولما K تبقى union، كل عضو فيها بيبقى مفتاح **إجباري**:

~~~text الناتج
type Record<Role, string[]> = { admin: string[]; editor: string[]; viewer: string[]; }
~~~

و [[string[]]] يعني array من strings.

### Record بمفتاح string

~~~text app.ts
const cache: Record<string, UserPreview> = {};
~~~

هنا أي مفتاح مسموح، فمفيش حاجة إجبارية، و [[{}]] مقبول. بس خد بالك: [[cache["u9"]]] نوعها [[UserPreview]]، مع إن وقت التشغيل القيمة [[undefined]]. لو شغّلت [[noUncheckedIndexedAccess]] النوع بيبقى [[UserPreview | undefined]] ويجبرك تفحص.

### المفتاح الناقص

~~~text app.ts
const labels: Record<Role, string> = { admin: "مدير", editor: "محرر" };
~~~

~~~text خطأ tsc
error TS2741: Property 'viewer' is missing in type '{ admin: string; editor: string; }' but required in type 'Record<Role, string>'.
~~~

---

## ٦. التجربة: ضيف دور [[owner]]

بعد [[type Role = "admin" | "editor" | "viewer" | "owner"]] طلع خطأ في كل قاموس محتاج يتحدّث:

~~~text خطأ tsc
l03.ts(6,7): error TS2741: Property 'owner' is missing in type '{ admin: string[]; editor: string[]; viewer: string[]; }' but required in type 'Record<Role, string[]>'.
l03.ts(12,7): error TS2739: Type '{ admin: string; editor: string; }' is missing the following properties from type 'Record<Role, string>': viewer, owner
~~~

لاحظ الكود اتغير: TS2741 لما خاصية واحدة ناقصة، و TS2739 لما أكتر من واحدة. (و TS 7 بيرتب الأسماء في الرسالة التانية [[owner, viewer]].) و [[cache]] مطلعش فيه حاجة لأن مفاتيحه [[string]].

---

## الخلاصة

| تكتب | بيطلّع | يمسك الاسم الغلط؟ |
|---|---|---|
| [[Pick<User, "id">]] | الخصايص دي بس | أيوه |
| [[Omit<User, "password">]] | كل حاجة ما عداها | لأ |
| [[Record<Role, V>]] | object كل دور فيه مفتاح إجباري | أيوه، والناقص كمان |
| [[Record<string, V>]] | قاموس مفتوح | مفيش حاجة يمسكها |

وتذكير: [[Omit]] بيغيّر النوع بس. الـ password لسه في الـ object نفسه لحد ما تشيلها بإيدك.`,
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
          sol: R`بعد ما تضيف [[owner]]: [[permissions]] بيطلّع Property 'owner' is missing in type ... but required in type 'Record<Role, string[]>' (TS2741)، و [[labels]] بيطلّع TS2739 (is missing the following properties ...: viewer, owner) لأن ناقصه اتنين. و [[cache]] مش بيتأثر لأن مفاتيحه [[string]]. (و [[labels]] كان فيها خطأ [[viewer]] من الأول.) يعني [[Record<Role, ...>]] بيجبرك تفتكر كل مكان لازم يتحدّث.

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
          teach: R`## الفكرة في سطر

الدالة نفسها فيها كل المعلومات: باراميتراتها ونوع اللي بترجعه. [[ReturnType]] و [[Parameters]] بيطلّعوا الأنواع دي منها، و [[Awaited]] بيفك الـ Promise لو الدالة async.

الأنواع تحت طالعة من TypeScript 6.0.3 على ويندوز 11، والتشغيل بـ [[npx tsx]] على Node 24.

---

## ١. الدالة: محدش كتب نوع رجوعها

~~~text app.ts
async function getDashboard(userId: string) {
  return { userId, stats: { orders: 12, revenue: 3400 }, updatedAt: new Date() };
}
~~~

- [[async]] معناها إن الدالة **دايمًا** بترجع Promise، حتى لو جواها [[return]] لقيمة عادية.
- [[{ userId, ... }]] اختصار لـ [[{ userId: userId, ... }]].
- مفيش [[: نوع]] بعد الأقواس، فـ TS استنتج نوع الرجوع لوحده.

---

## ٢. [[ReturnType<typeof getDashboard>]]

~~~text app.ts
type DashboardPromise = ReturnType<typeof getDashboard>;
~~~

من جوه لبرة:

1. [[typeof getDashboard]]: نوع الدالة نفسها (هي قيمة، فلازم [[typeof]]).
2. [[ReturnType<...>]]: «لو ده نوع دالة، هات نوع اللي بترجعه».

~~~text الناتج
type DashboardPromise = Promise<{ userId: string; stats: { orders: number; revenue: number; }; updatedAt: Date; }>
~~~

الشكل كله ملفوف في [[Promise<...>]] لأن الدالة async. ولو نسيت [[typeof]]:

~~~text خطأ tsc
type Bad = ReturnType<getDashboard>;
error TS2749: 'getDashboard' refers to a value, but is being used as a type here. Did you mean 'typeof getDashboard'?
~~~

---

## ٣. [[Awaited<...>]]: فك الـ Promise

~~~text app.ts
type Dashboard = Awaited<DashboardPromise>;
~~~

~~~text الناتج
type Dashboard = { userId: string; stats: { orders: number; revenue: number; }; updatedAt: Date; }
~~~

ده الشكل اللي في إيدك بعد [[await getDashboard(...)]]. و [[Awaited]] بيفك أكتر من طبقة: [[Awaited<Promise<Promise<number>>>]] طلعت [[number]].

---

## ٤. [[Parameters<typeof getDashboard>]]

~~~text app.ts
type Args = Parameters<typeof getDashboard>;
~~~

~~~text الناتج
type Args = [userId: string]
~~~

ده **tuple**: array طوله ثابت وكل خانة ليها نوع. و [[userId:]] جواه مجرد اسم للخانة بيساعد المحرر، النوع هو [[string]].

---

## ٥. استخدامهم

~~~text app.ts
function renderStats(d: Dashboard) {
  return $__btorders: $__{d.stats.orders}$__bt;
}
function logCall(...args: Args) {
  console.log("getDashboard", args[0]);
}
~~~

- [[$__bt...$__bt]] template literal، و [[$__{...}]] جواه بيحط قيمة. TS عارف إن [[d.stats.orders]] رقم من غير ما حد كتب نوع [[Dashboard]] بإيده.
- [[...args: Args]] (rest parameter) معناها «خد كل الـ arguments في array»، ونوعه [[Args]] فالدالة دي بتاخد نفس باراميترات [[getDashboard]] بالظبط.

شغلناهم:

~~~text app.ts
logCall("u1");
console.log(renderStats(await getDashboard("u1")));
~~~

~~~text الناتج (npx tsx)
getDashboard u1
orders: 12
~~~

> [[await]] برّه أي دالة (top-level await) محتاج الملف يبقى ES module: [["type": "module"]] في package.json. من غيره tsc بيطلّع TS1309 و tsx بيقول Top-level await is currently not supported with the "cjs" output format.

---

## ٦. [[ReturnType<typeof setTimeout>]]

~~~text app.ts
type Timer = ReturnType<typeof setTimeout>;
~~~

نوع الـ timer بيختلف حسب البيئة، وجرّبنا الاتنين:

| البيئة | [[Timer]] طلع |
|---|---|
| مع [[@types/node]] ([[--types node]]) | [[NodeJS.Timeout]] |
| مع [[lib: dom]] بس (متصفح) | [[number]] |

فلو كتبت [[let t: number = setTimeout(...)]] في مشروع Node هيطلع خطأ. [[ReturnType]] بيجيب الصح في الحالتين.

---

## ٧. التجربة: [[unread: 3]]

زودنا [[unread: 3]] جوه [[stats]] و [[$__{d.stats.unread}]] في الـ template، و tsc عدّى من غير أي تعديل في الأنواع، والناتج بقى [[orders: 12, unread: 3]].

---

## الخلاصة

| تكتب | بيطلّع |
|---|---|
| [[ReturnType<typeof f>]] | نوع رجوع f (Promise لو async) |
| [[Awaited<T>]] | اللي جوه الـ Promise |
| [[Awaited<ReturnType<typeof f>>]] | شكل الداتا بعد await |
| [[Parameters<typeof f>]] | tuple الباراميترات |

متنساش [[typeof]]: الدالة قيمة، والـ utility types دي بتاخد أنواع.`,
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
          teach: R`## الفكرة في سطر

mapped type زي [[for]] بس على الأنواع: بيلف على كل مفتاح في نوع، ولكل مفتاح بيحدد نوع جديد (وممكن اسم جديد). النتيجة نوع بنفس المفاتيح مربوط بالأصل.

الأنواع تحت طالعة من TypeScript 6.0.3 على ويندوز 11، والأخطاء من [[npx tsc --strict --noEmit]]، ونفسها على TS 7.0.2.

---

## ١. الأصل

~~~text app.ts
type SignupForm = { email: string; password: string; age: number };
~~~

---

## ٢. [[FormErrors<T>]]: سطر سطر

~~~text app.ts
type FormErrors<T> = { [K in keyof T]?: string };
~~~

| الحتة | معناها |
|---|---|
| [[FormErrors<T>]] | نوع generic: بياخد أي نوع T |
| [[keyof T]] | union أسماء خصايص T |
| [[[K in keyof T]]] | «لكل K من الأسماء دي»: ده الـ loop |
| [[?]] | الخاصية الناتجة اختيارية |
| [[: string]] | قيمتها رسالة خطأ |

ولما نديله [[SignupForm]]:

~~~text الناتج
type FormErrors<SignupForm> = { email?: string | undefined; password?: string | undefined; age?: string | undefined; }
~~~

لاحظ [[age]] قيمتها بقت [[string]] مع إنها في الأصل [[number]]: احنا قلنا «لكل مفتاح، string»، ومش بنستخدم النوع الأصلي هنا.

---

## ٣. [[Touched<T>]]: من غير [[?]]

~~~text app.ts
type Touched<T> = { [K in keyof T]: boolean };
const touched: Touched<SignupForm> = { email: true, password: false, age: false };
const bad: Touched<SignupForm> = { email: true };
~~~

~~~text الناتج
type Touched<SignupForm> = { email: boolean; password: boolean; age: boolean; }
~~~

ولأن مفيش [[?]]، كل حقل إجباري:

~~~text خطأ tsc
error TS2739: Type '{ email: true; }' is missing the following properties from type 'Touched<SignupForm>': password, age
~~~

أما [[errors]] اللي فيها [[email]] بس فمقبولة لأن [[FormErrors]] كله اختياري.

---

## ٤. [[Setters<T>]]: تغيير الأسامي بـ [[as]]

~~~text app.ts
type Setters<T> = {
  [K in keyof T as $__btset$__{Capitalize<string & K>}$__bt]: (value: T[K]) => void;
};
~~~

ده أصعب سطر في الدرس، نفكه من جوه لبرة:

### الخطوة ١: [[string & K]]

[[keyof T]] ممكن يطلّع أسامي نوعها [[string]] أو [[number]] أو [[symbol]]. و [[&]] (intersection) هنا معناها «الجزء من K اللي هو string»، عشان [[Capitalize]] مبيقبلش غير string. من غيرها:

~~~text خطأ tsc
error TS2344: Type 'K' does not satisfy the constraint 'string'.
  Type 'keyof T' is not assignable to type 'string'.
    Type 'string | number | symbol' is not assignable to type 'string'.
~~~

### الخطوة ٢: [[Capitalize<...>]]

utility type جاهز بيكبّر أول حرف: [["email"]] تبقى [["Email"]].

### الخطوة ٣: [[$__btset$__{...}$__bt]]

template literal **type**: نفس شكل الـ template string في JS، بس بيعمل نوع نص. [["Email"]] تبقى [["setEmail"]].

### الخطوة ٤: [[as ...]]

[[as]] بعد [[K in keyof T]] معناها «سمّي المفتاح الجديد كذا بدل K» (key remapping).

### الخطوة ٥: القيمة [[(value: T[K]) => void]]

نوع دالة بتاخد [[value]] من نفس نوع الحقل الأصلي ([[T[K]]]: indexed access) ومبترجعش حاجة ([[void]]).

~~~text الناتج
type FormSetters = { setEmail: (value: string) => void; setPassword: (value: string) => void; setAge: (value: number) => void; }
~~~

و [[setAge]] بتاخد [[number]] لأن [[T["age"]]] رقم. ولو شلت [[Capitalize]] الأسامي بتطلع [[setemail]] و [[setpassword]] و [[setage]].

---

## ٥. التجربة: ضيف [[phone: string]]

~~~text خطأ tsc
error TS2741: Property 'phone' is missing in type '{ email: true; password: false; age: false; }' but required in type 'Touched<SignupForm>'.
~~~

و [[FormSetters]] بقى فيه [[setPhone: (value: string) => void]] من غير ما تلمسه.

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[{ [K in keyof T]: X }]] | لكل مفتاح في T، القيمة X |
| [[T[K]]] جوه الـ loop | نوع الحقل الأصلي |
| [[?]] و [[-?]] | ضيف أو شيل «اختياري» |
| [[readonly]] و [[-readonly]] | ضيف أو شيل «للقراية بس» |
| [[as NewName]] | غيّر اسم المفتاح، و [[never]] بيشيله |

و [[Partial]] و [[Required]] و [[Readonly]] و [[Record]] كلهم مكتوبين بالشكل ده بالظبط.`,
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
          teach: R`## الفكرة في سطر

conditional type هو [[if]] للأنواع، مكتوب بشكل الـ ternary بتاع JS: [[شرط ? لو_آه : لو_لأ]]. والشرط دايمًا [[A extends B]] يعني «هل A ينفع يتحط مكان B؟».

الأنواع تحت طالعة من TypeScript 6.0.3 على ويندوز 11 (والأخطاء من [[npx tsc --strict --noEmit]])، ونفس النتايج على TS 7.0.2. ومفيش أي سطر هنا بيطلع في الـ JS: كله أنواع.

---

## ١. أبسط شكل: [[IsString<T>]]

~~~text app.ts
type IsString<T> = T extends string ? "yes" : "no";
type A = IsString<"hi">;
type B = IsString<42>;
~~~

| الحتة | معناها |
|---|---|
| [[T extends string]] | الشرط: هل T نوع من string؟ |
| [[?]] | لو آه... |
| [["yes"]] | ...الناتج النوع ده |
| [[:]] | غير كده... |
| [["no"]] | ...الناتج ده |

~~~text الناتج
type A = "yes"
type B = "no"
~~~

[["hi"]] literal نوعه جزء من [[string]]، و [[42]] لأ.

---

## ٢. لما T تبقى union: التوزيع

جرّبنا نبعت union:

~~~text app.ts
type Mix = IsString<"a" | 1>;
~~~

~~~text الناتج
type Mix = "yes" | "no"
~~~

TS طبّق الشرط على كل عضو لوحده وجمع النتايج: [[IsString<"a">]] و [[IsString<1>]]. ده اسمه **distributive conditional type**. ولو مش عايزه، حط الطرفين بين أقواس مربعة:

~~~text app.ts
type NoDist<T> = [T] extends [string] ? "yes" : "no";
type Mix2 = NoDist<"a" | 1>;
~~~

~~~text الناتج
type Mix2 = "no"
~~~

كده الـ union اتفحص كوحدة واحدة، وهو مش كله string.

---

## ٣. [[Exclude]] و [[Extract]]: التوزيع في الشغل

~~~text app.ts
type Status = "idle" | "loading" | "success" | "error";
type Done = Exclude<Status, "idle" | "loading">;
type Busy = Extract<Status, "loading">;
~~~

~~~text الناتج
type Done = "success" | "error"
type Busy = "loading"
~~~

[[Exclude<T, U>]] متعرّف في مكتبة TS كده: [[T extends U ? never : T]]. يعني لكل عضو: لو بيطابق U يبقى [[never]] (نوع ملوش قيم)، غير كده يفضل. و [[never]] جوه union بيختفي. و [[Extract]] العكس: بيخلّي اللي بيطابق بس.

---

## ٤. [[NonNullable]]

~~~text app.ts
type MaybeUser = { name: string } | null | undefined;
type SureUser = NonNullable<MaybeUser>;
~~~

~~~text الناتج
type SureUser = { name: string; }
~~~

شال [[null]] و [[undefined]]. (تعريفه دلوقتي [[T & {}]]: [[{}]] معناها «أي قيمة مش null ولا undefined».)

---

## ٥. [[infer]]: تطلّع نوع من جوه نوع

~~~text app.ts
type ElementOf<T> = T extends (infer E)[] ? E : never;
type N = ElementOf<number[]>;
~~~

[[infer E]] معناها: «لو T شكلها array من حاجة، سمّي الحاجة دي E». TS بيطابق [[number[]]] مع [[(infer E)[]]] فيلاقي E = [[number]].

~~~text الناتج
type N = number
type E2 = never      (ElementOf<string>: مش array، فراح للـ never)
~~~

ونفس الفكرة مع Promise:

~~~text app.ts
type Unwrap<T> = T extends Promise<infer V> ? V : T;
type U = Unwrap<Promise<string>>;
~~~

~~~text الناتج
type U = string
type U2 = number     (Unwrap<number>: مش Promise، فرجع T زي ما هو)
~~~

ده تقريبًا اللي [[Awaited]] بيعمله، و [[ReturnType]] و [[Parameters]] مكتوبين بـ [[infer]] برضه.

---

## ٦. حل التجربة

~~~text app.ts
type ArgOf<F> = F extends (arg: infer A) => any ? A : never;
type X = ArgOf<(x: number) => void>;
type X2 = ArgOf<string>;
type Typo = Exclude<Status, "idel">;
~~~

~~~text الناتج
type X = number
type X2 = never
type Typo = "idle" | "loading" | "success" | "error"
~~~

[[Exclude]] مبيشترطش إن اللي بتشيله موجود، فالغلطة الإملائية عدّت ومشالتش حاجة. النسخة المحمية من الـ solCode:

~~~text app.ts
type StrictExclude<T, U extends T> = Exclude<T, U>;
type Bad = StrictExclude<Status, "idel">;
~~~

~~~text خطأ tsc
error TS2344: Type '"idel"' does not satisfy the constraint 'Status'.
~~~

[[U extends T]] هنا constraint على الباراميتر (زي generics)، مش conditional: بيجبر U يبقى من أعضاء T.

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[T extends U ? X : Y]] | لو T ينفع مكان U يبقى X، غير كده Y |
| T union | الشرط بيتوزع على كل عضو |
| [[[T] extends [U]]] | من غير توزيع |
| [[infer N]] | سمّي حتة من النوع واستخدمها في X |
| [[never]] في union | بيختفي، وده سر [[Exclude]] |`,
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
    }
]);
