// تكملة تاب ts: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ts/01.js (شرح حقول الدرس في أوله)
MORE("ts", [
    {
      t: "Generics",
      l: 2,
      n: "دالة أو نوع بياخد النوع نفسه كباراميتر، فيشتغل مع أي حاجة من غير ما يخسر الدقة",
      items: [
        {
          cmd: "generics",
          title: "دالة واحدة تشتغل مع أي نوع ومتنساش هو إيه",
          desc: R`generic يعني النوع نفسه باراميتر. [[function first<T>(arr: T[]): T | undefined]]: لو بعتلها [[string[]]] ترجع string، ولو [[User[]]] ترجع User. الـ [[T]] بيتحدد مع كل نداء، وغالبًا TS بيستنتجه لوحده من الـ arguments.

من غير generics عندك اختيارين وحشين: دالة لكل نوع، أو [[any]] وتخسر النوع.`,
          example: R`function firstAny(arr: any[]) { return arr[0]; }
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
const a = firstAny(["x"]);                  // any: خسرنا النوع
const n = first([10, 20]);                  // number | undefined
const u = first([{ id: 1, name: "Sara" }]); // { id: number; name: string } | undefined
const s = first<string>(["a", "b"]);        // T اتكتب صريح
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}
const p = pair("age", 27);                  // [string, number]`,
          try: R`اكتب [[function last<T>(arr: T[]): T | undefined]]، وجرّبها على ليستة users وشوف المحرر بيكمّلك [[.name]] على الناتج. وبعدين غيّرها لـ [[any[]]] ولاحظ التكملة راحت.`,
          flag: "script",
          deep: {
            why: "فيه كود كتير منطقه مش فارق معاه النوع: أول عنصر، و cache، و API wrapper، و [[useState]]، و Promise. الـ generic بيخلي الكود ده مكتوب مرة واحدة، والنوع الحقيقي بيعدّي من أوله لآخره.",
            how: R`[[T]] زي متغير بس للأنواع. لما تنادي [[first([10, 20])]]، TS بيقارن الـ argument ([[number[]]]) بالباراميتر ([[T[]]]) ويستنتج إن T هي number، وبعدين يحط number مكان T في نوع الرجوع.

وكل ده وقت الفحص بس: الـ [[<T>]] بيتمسح زي باقي الأنواع، ودالة [[first]] في الـ JS دالة عادية جدًا.

وانت بتستخدم generics طول الوقت من غير ما تاخد بالك: [[Array<T>]] و [[Promise<T>]] و [[Map<K, V>]] و [[useState<T>]] و [[Record<K, V>]]. لما تكتب [[useState<User | null>(null)]] انت بتحدد T بنفسك، لأن [[null]] لوحدها مش كفاية يستنتج منها.

والاسم [[T]] عرف بس. لو فيه أكتر من واحد أو المعنى مش واضح، سمّيهم: [[TData]] و [[TError]].`,
            when: "دالة أو كلاس أو hook منطقه واحد لأنواع مختلفة: helpers للـ arrays، و fetch wrapper، و hooks زي [[useLocalStorage<T>]]، ومكونات زي [[Select<T>]].",
            mistakes: R`[[<T>]] مستخدم في مكان واحد بس زي [[function log<T>(x: T): void]]: ملوش لازمة، اكتب [[unknown]]. و generic في نوع الرجوع بس زي [[function get<T>(): T]]: ده [[as]] متنكّر، اللي بينادي بيختار T على مزاجه والدالة مبتفحصش حاجة. وفي مشروع حقيقي كان فيه [[fetchTeam<T = any>(...): Promise<T | null>]] بترجع [[(await r.json()) as T]]: شكلها آمن وهي بتصدّق أي حاجة السيرفر بعتها.`
          },
          teach: R`## المثال بيعمل إيه؟

بيكتب نفس الدالة (هات أول عنصر) مرتين: مرة بـ [[any]] ومرة بـ generic، ويقارن النوع اللي بيطلع. وبعدين دالة بـ ٢ generics. كله بيعدّي من غير أخطاء، فالمهم الأنواع اللي TS استنتجها، وسألنا عنها الـ compiler (TypeScript 6.0.3، و 7.0.2 نفس الأنواع). واتشغّل بـ [[tsx]].

---

## ١. من غير generic

~~~text app.ts
function firstAny(arr: any[]) { return arr[0]; }
const a = firstAny(["x"]);
~~~

~~~text النوع
a: any
~~~

اللي داخل [[any[]]]، فاللي خارج [[any]]. بعتنا ليستة strings، والنوع ضاع: [[a.toFixed()]] أو [[a.nmae]] هيعدّوا من غير خطأ.

---

## ٢. بـ generic

~~~text app.ts
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
~~~

### [[<T>]]

الأقواس الزاوية بعد اسم الدالة بتعرّف **باراميتر نوع** اسمه [[T]]. زي parameter عادي، بس قيمته نوع مش قيمة. و [[T]] مجرد اسم (اختصار Type)، ممكن تسميه أي حاجة.

### [[arr: T[]]]

الـ parameter ليستة من T، أيًا كان T.

### [[: T | undefined]]

بترجّع عنصر من نفس النوع، أو undefined لو الليستة فاضية. نفس الـ T اللي دخلت هي اللي خارجة: ده الرابط اللي [[any]] بيضيّعه.

---

## ٣. TS بيستنتج T من النداء

~~~text app.ts
const n = first([10, 20]);
const u = first([{ id: 1, name: "Sara" }]);
const s = first<string>(["a", "b"]);
~~~

~~~text الأنواع
n: number | undefined
u: { id: number; name: string; } | undefined
s: string | undefined
~~~

- [[first([10, 20])]]: TS قارن [[number[]]] بـ [[T[]]]، فـ T = number.
- التاني: T = شكل الـ object كامل، فالمحرر هيكمّلك [[u?.name]].
- [[first<string>(...)]]: تقدر تكتب T بنفسك بين [[< >]] وقت النداء. نادرًا ما تحتاج، غير لما مفيش حاجة يستنتج منها (زي [[useState<User | null>(null)]]).

---

## ٤. أكتر من باراميتر نوع

~~~text app.ts
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}
const p = pair("age", 27);
~~~

- [[<K, V>]]: اتنين باراميترات نوع، بفاصلة. K للمفتاح و V للقيمة.
- [[: [K, V]]]: بترجّع tuple، الأول من نوع K والتاني من نوع V.

~~~text النوع
p: [string, number]
~~~

لاحظ إن K طلعت [[string]] مش [["age"]]: TS بيوسّع الـ literal في الحالة دي. ولو بعت [[pair("age" as const, 27)]] النوع بيبقى [[["age", number]]].

---

## ٥. الناتج وقت التشغيل

~~~text الناتج: console.log(a, n, u, s, p, first([]))
x 10 { id: 1, name: 'Sara' } a [ 'age', 27 ] undefined
~~~

[[first([])]] رجّعت undefined فعلًا، وده سبب [[| undefined]] في النوع. والـ [[<T>]] و [[<K, V>]] اتمسحوا خالص من الـ JS: [[first]] دالة عادية بترجّع [[arr[0]]].

---

## الخلاصة

| | [[any[]]] | [[<T>(arr: T[])]] |
|---|---|---|
| [[first([10, 20])]] | [[any]] | [[number | undefined]] |
| التكملة في المحرر | مفيش | موجودة |
| الغلطات الإملائية | بتعدّي | بتتمسك |

- [[<T>]] باراميتر نوع، و TS غالبًا بيستنتجه من الـ arguments.
- الـ generic مفيد لما T بتربط اللي داخل باللي خارج. لو T في مكان واحد بس، [[unknown]] كفاية.`,
          lines: [
            R`من غير generic: [[any]] داخل و any خارج.`,
            R`[[<T>]] باراميتر نوع. اللي داخل array من T، واللي خارج T أو undefined.`,
            "نفس الكود JS بالظبط.",
            "قفلة.",
            R`[[a]] نوعها any، والمحرر مش هيساعدك.`,
            R`TS استنتج إن T هي number من الـ array.`,
            "هنا T بقى شكل الـ object كامل.",
            "ممكن تحدد T بنفسك، بس نادرًا ما تحتاج.",
            "أكتر من باراميتر نوع.",
            "بيرجع tuple.",
            "قفلة.",
            "كل مكان في الـ tuple بنوعه."
          ],
          sol: R`مع [[last<T>]] الناتج نوعه [[{ id: number; name: string } | undefined]]، فلما تكتب [[u?.]] المحرر بيكمّلك [[id]] و [[name]]. والناتج [[Omar]]، و [[last([])]] بترجع [[undefined]] (وده سبب [[| undefined]] في النوع).

مع [[any[]]] الناتج [[any]]: التكملة بتروح، وأي غلطة إملائية زي [[u.nmae]] بتعدّي من غير خطأ وترجع undefined وقت التشغيل.`,
          solCode: R`function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
const users = [{ id: 1, name: "Sara" }, { id: 2, name: "Omar" }];
const u = last(users);
console.log(u?.name); // Omar`
        },
        {
          cmd: "generic constraints",
          title: "تشترط إن النوع اللي هيتبعت فيه حاجة معينة",
          desc: R`[[<T extends { id: string }>]] معناها T أي نوع، بشرط يكون فيه [[id]] string. كده جوه الدالة تقدر تستخدم [[item.id]]، ولسه النوع الكامل بيرجع زي ما هو.

و [[<K extends keyof T>]] أشهر شرط: K لازم تكون اسم خاصية موجودة في T.`,
          example: R`function byId<T extends { id: string }>(items: T[]): Record<string, T> {
  return Object.fromEntries(items.map((it) => [it.id, it] as const));
}
const users = [{ id: "u1", name: "Sara" }, { id: "u2", name: "Omar" }];
const map = byId(users);
map["u1"]?.name;
byId([{ name: "no id" }]); // خطأ: مفيش id، فـ TS بيقول إن name خاصية مش معروفة
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((it) => it[key]);
}
const names = pluck(users, "name");
pluck(users, "email"); // خطأ: "email" مش من مفاتيح العنصر`,
          try: R`اكتب [[function sortBy<T, K extends keyof T>(items: T[], key: K)]] وجرّبها بـ [["name"]] وبمفتاح مش موجود. وبعدين شيل [[extends keyof T]] وشوف الأخطاء اللي هتظهر جوه الدالة.`,
          flag: "script",
          deep: {
            why: "من غير شرط، T ممكن تبقى أي حاجة حتى number، فـ TS مش هيسيبك تقرا [[item.id]] جوه الدالة. الشرط بيقول «أنا محتاج الحد الأدنى ده»، وفي نفس الوقت النوع الكامل مبيضيعش، زي ما هيحصل لو كتبت [[items: { id: string }[]]].",
            how: R`[[T extends X]] في الـ generics معناها «T لازم تكون assignable لـ X»، مش وراثة كلاسات. أي نوع فيه على الأقل شكل X يعدّي (structural typing).

الفرق بينها وبين باراميتر عادي: [[function f(items: { id: string }[])]] بترجع [[{ id: string }]] وتنسى الباقي. و [[function f<T extends { id: string }>(items: T[])]] بترجع T بكل خصايصه.

[[keyof T]] بيطلّع union أسماء الخصايص ([["id" | "name"]])، و [[K extends keyof T]] بيخلي K واحدة منهم. و [[T[K]]] (indexed access) هو نوع الخاصية دي. الاتنين مع بعض بيدّوك دوال زي [[pluck]] و [[sortBy]] و [[groupBy]] آمنة ١٠٠٪.

و [[as const]] جوه [[byId]] بيخلي [[[it.id, it]]] tuple صريح. هنا مش إجباري: لأن الـ array مكتوبة جوه النداء نفسه، TS بياخد شكلها من باراميتر [[Object.fromEntries]] ويفهمها tuple لوحده ويطلّع [[{ [k: string]: T }]]. بس لو حطيت الأزواج في متغير لوحده الأول ([[const pairs = items.map((it) => [it.id, it])]])، كل زوج نوعه هيبقى [[(string | T)[]]] والناتج any، وساعتها [[as const]] هو اللي بيصلّحها.`,
            when: "أي generic محتاج يستخدم حاجة من T جوه الدالة: [[id]] أو [[length]] أو [[createdAt]]. و [[keyof]] لأي دالة بتاخد اسم خاصية كـ string.",
            mistakes: R`تكتب [[T extends any]] أو [[T extends object]] وتفتكر ده شرط مفيد. وتكتب الباراميتر [[key: string]] بدل [[K extends keyof T]]، فأي غلطة إملائية في اسم الخاصية تعدّي وترجع undefined.`
          },
          teach: R`## المثال بيعمل إيه؟

دالتين generic بشروط: [[byId]] بتحوّل ليستة لقاموس بالـ id، وشرطها إن العناصر فيها [[id]]. و [[pluck]] بتطلّع خاصية واحدة من كل عنصر، وشرطها إن اسم الخاصية موجود فعلًا. اتفحص بـ TypeScript 6.0.3 و 7.0.2، واتشغّل بـ [[tsx]].

---

## ١. ليه محتاجين شرط أصلًا؟

generic من غير شرط معناه T ممكن تبقى أي حاجة، حتى number. فـ TS مش هيسيبك تقرا أي خاصية منها:

~~~text app.ts
function noC<T>(item: T) { return item.id; }
~~~

~~~text الناتج: npx tsc --noEmit
error TS2339: Property 'id' does not exist on type 'T'.
~~~

---

## ٢. [[byId]]: [[T extends { id: string }]]

~~~text app.ts
function byId<T extends { id: string }>(items: T[]): Record<string, T> {
  return Object.fromEntries(items.map((it) => [it.id, it] as const));
}
~~~

### الشرط

[[T extends { id: string }]] معناها «T أي نوع، **بشرط** يبقى فيه [[id]] string». [[extends]] هنا مش وراثة كلاسات، معناها «لازم يتحط مكان». فـ [[it.id]] بقت مسموحة.

### نوع الرجوع: [[Record<string, T>]]

[[Record<K, V>]] نوع جاهز معناه «object مفاتيحه من نوع K وقيمه من نوع V». يعني قاموس: أي نص ← عنصر.

### الجسم من جوه لبرة

1. [[items.map((it) => [it.id, it] as const)]]: كل عنصر يبقى زوج [[[id، العنصر]]]. و [[as const]] بيخلي الزوج tuple صريح.
2. [[Object.fromEntries(...)]]: بتاخد ليستة أزواج وتعمل منها object: أول عنصر في الزوج مفتاح، والتاني قيمة.

~~~text الناتج: console.log(map)
{ u1: { id: 'u1', name: 'Sara' }, u2: { id: 'u2', name: 'Omar' } }
~~~

### الشرط أحسن من نوع ثابت

~~~text app.ts
const users = [{ id: "u1", name: "Sara" }, { id: "u2", name: "Omar" }];
const map = byId(users);
map["u1"]?.name;
~~~

~~~text النوع
map: Record<string, { id: string; name: string; }>
~~~

T اتستنتج بالشكل **الكامل**، فـ [[name]] لسه موجودة. قارن بدالة parameter بتاعها [[{ id: string }[]]] من غير generic: جرّبناها، والناتج نوعه [[{ id: string; }]] بس، و [[name]] ضاعت.

و [[?.]] في [[map["u1"]?.name]] لأن المفتاح ممكن ميكونش موجود: [[map["zzz"]?.name]] رجّعت undefined.

### من غير id

~~~text app.ts
byId([{ name: "no id" }]);
~~~

~~~text الناتج: npx tsc --noEmit
app.ts(7,9): error TS2353: Object literal may only specify known properties, and 'name' does not exist in type '{ id: string; }'.
~~~

الرسالة غريبة شوية: TS قاس الـ object المكتوب مباشرة على الشرط [[{ id: string }]]، فلقى [[name]] زيادة (excess property check). ولو بعته في متغير الأول ([[const v = { name: "no id" }; byId([v])]]) الرسالة بتبقى أوضح:

~~~text الناتج
error TS2741: Property 'id' is missing in type '{ name: string; }' but required in type '{ id: string; }'.
~~~

---

## ٣. [[pluck]]: [[K extends keyof T]]

~~~text app.ts
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((it) => it[key]);
}
~~~

### [[keyof T]]

بيطلّع أسماء خصايص T كـ union. لعناصر [[users]]:

~~~text النوع: keyof عنصر من users
"name" | "id"
~~~

(TS 7 بيكتبها [["id" | "name"]]: الترتيب في العرض بس.)

### [[K extends keyof T]]

K لازم تبقى واحد من الأسماء دي. فـ [[it[key]]] مضمونة موجودة.

### [[T[K][]]]

نقراها على مرحلتين:
1. [[T[K]]] اسمها indexed access: «نوع الخاصية K في T». لو K = [["name"]] يبقى [[string]].
2. [[[]]] بعدها: ليستة منه. فالناتج [[string[]]].

~~~text app.ts
const names = pluck(users, "name");
pluck(users, "email");
~~~

~~~text الناتج: npx tsc --noEmit (TypeScript 6)
app.ts(12,14): error TS2345: Argument of type '"email"' is not assignable to parameter of type '"name" | "id"'.
~~~

~~~text الناتج: نفس الأمر بـ TypeScript 7
app.ts(12,14): error TS2345: Argument of type '"email"' is not assignable to parameter of type '"id" | "name"'.
~~~

نفس الخطأ ونفس المكان، والفرق ترتيب الـ union في الرسالة بس.

~~~text الناتج: console.log(names)
[ 'Sara', 'Omar' ]
~~~

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[<T extends { id: string }>]] | أي T بشرط فيه id string، ومن غير ما الباقي يضيع |
| [[keyof T]] | union أسماء خصايص T |
| [[<K extends keyof T>]] | K اسم خاصية موجود في T |
| [[T[K]]] | نوع الخاصية دي |
| [[Record<string, T>]] | قاموس: نص ← T |

الشرط بيقول «أنا محتاج الحد الأدنى ده»، و T بيفضل شايل النوع الكامل.`,
          lines: [
            R`T أي نوع بشرط فيه [[id]] string، والناتج قاموس من id للعنصر.`,
            R`مسموح نقرا [[it.id]] بسبب الشرط. و [[as const]] بيخلي الزوج tuple.`,
            "قفلة.",
            "ليستة فيها id و name.",
            R`T اتستنتج بالشكل الكامل، مش [[{ id }]] بس.`,
            R`فـ [[name]] لسه موجودة في الناتج. و [[?.]] لأن المفتاح ممكن ميكونش موجود.`,
            "object من غير id: الشرط رفضه.",
            R`K لازم تكون مفتاح من مفاتيح T، والناتج ليستة من نوع الخاصية دي ([[T[K]]]).`,
            "قراية الخاصية بالاسم.",
            "قفلة.",
            R`[[string[]]]، لأن name نوعها string.`,
            "مفتاح مش موجود."
          ],
          sol: R`[[sortBy(users, "name")]] بيرجّع [[[ 'Omar', 'Sara' ]]]، و [[sortBy(users, "email")]] بيطلّع: Argument of type '"email"' is not assignable to parameter of type '"id" | "name"' (TS2345). والمحرر بيقترحلك المفتاحين دول بس.

ولما تشيل [[extends keyof T]]، الخطأ بيتنقل لجوه الدالة: [[a[key]]] بيطلّع Type 'K' cannot be used to index type 'T' (TS2536)، لأن K بقت أي نوع، و TS مش ضامن إنها مفتاح في T.`,
          solCode: R`function sortBy<T, K extends keyof T>(items: T[], key: K): T[] {
  return [...items].sort((a, b) => (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0));
}
const users = [{ id: "u2", name: "Sara" }, { id: "u1", name: "Omar" }];
console.log(sortBy(users, "name").map((u) => u.name)); // [ 'Omar', 'Sara' ]`
        },
        {
          cmd: "generic types و defaults",
          title: "نوع بياخد نوع تاني، زي رد API شكله ثابت والداتا بتتغير",
          desc: R`الـ type والـ interface ممكن ياخدوا باراميترات أنواع زي الدوال: [[type ApiResponse<T> = { data: T }]]، وتستخدمه [[ApiResponse<User[]>]].

والباراميتر ممكن يبقى ليه قيمة افتراضية [[<T = unknown>]]، وشرط [[<T extends object>]]، زي باراميترات الدوال بالظبط.`,
          example: R`type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: string };
type Paginated<T> = { items: T[]; page: number; total: number };
type Product = { id: string; title: string; price: number };
type ProductsRes = ApiResponse<Paginated<Product>>;
function handle(res: ProductsRes) {
  if (res.ok) return res.data.items.map((p) => p.title);
  return [res.error];
}
type Box<T = string> = { value: T };
const b1: Box = { value: "hi" };
const b2: Box<number> = { value: 5 };`,
          try: R`اعمل [[type Result<T, E = string>]] يا نجاح بـ T يا فشل بـ E، واستخدمه كنوع رجوع لدالة [[parseAge(input: string): Result<number>]].`,
          flag: "script",
          deep: {
            why: "في أي API شكل الرد ثابت (data و error و pagination) والداتا بس اللي بتتغير. من غير generic type، هتكتب [[UsersResponse]] و [[ProductsResponse]] و [[OrdersResponse]] كلهم نسخ من بعض. غيّر شكل الرد مرة، وعدّل عشرين نوع.",
            how: R`[[type ApiResponse<T> = ...]] زي دالة بتشتغل على الأنواع: بتاخد T وترجع نوع. [[ApiResponse<User>]] بيبدّل كل T بـ User. ومع [[interface]] نفس الفكرة: [[interface Paginated<T> { items: T[] }]].

مع الأنواع (مش الدوال) TS مبيستنتجش T: لازم تكتبه، إلا لو فيه default. والـ default بيتكتب زي باراميترات الدوال، والباراميترات اللي ليها default لازم في الآخر.

والـ utility types اللي في المستوى ده كلها generic types مكتوبة بنفس الطريقة: [[Partial<T>]] و [[Record<K, V>]] و [[Promise<T>]].`,
            when: "شكل رد API موحّد، و pagination، و [[Result<T, E>]]، وأنواع props لكومبوننت عام زي [[Table<Row>]].",
            mistakes: R`[[type ApiResponse<T = any>]]: الـ default any بيخلي أي حد ينسى T ياخد any من غير ما يحس، خليه [[unknown]]. و generics متداخلة ٤ مستويات محدش فاهمها: سمّي الأنواع اللي في النص ([[ProductsRes]]).`
          },
          teach: R`## المثال بيعمل إيه؟

بيعمل نوعين generic لشكل رد API: [[ApiResponse<T>]] (نجح ومعاه داتا، أو فشل) و [[Paginated<T>]] (صفحة من أي حاجة)، ويركّبهم جوه بعض لرد فيه صفحة منتجات. وفي الآخر نوع بـ default. اتفحص بـ TypeScript 6.0.3 و 7.0.2، واتشغّل بـ [[tsx]].

---

## ١. نوع بياخد نوع

~~~text app.ts
type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: string };
type Paginated<T> = { items: T[]; page: number; total: number };
~~~

- [[ApiResponse<T>]]: [[<T>]] بعد اسم الـ type معناها إن النوع ده بياخد نوع تاني كباراميتر، زي الدالة بالظبط بس للأنواع.
- الرد union من شكلين (discriminated union على [[ok]]): نجاح فيه [[data]] نوعها T، أو فشل فيه [[error]].
- [[ok: true]] هنا literal type: القيمة [[true]] بالظبط، مش أي boolean. وده اللي بيخلي [[if (res.ok)]] يضيّق.
- [[Paginated<T>]]: [[items]] ليستة T، ومعاها رقم الصفحة والعدد الكلي.

---

## ٢. التركيب

~~~text app.ts
type Product = { id: string; title: string; price: number };
type ProductsRes = ApiResponse<Paginated<Product>>;
~~~

نقراها من جوه لبرة:

1. [[Paginated<Product>]]: كل T بقت Product، يعني [[{ items: Product[]; page; total }]].
2. [[ApiResponse<...>]]: كل T بقت الصفحة دي.

ده اللي الـ compiler شايفه:

~~~text النوع
type ProductsRes = { ok: false; error: string; } | { ok: true; data: Paginated<Product>; }
~~~

(TS 6 بيعرض فرع الفشل الأول. الترتيب في العرض بس، مش بيفرق.)

---

## ٣. الاستخدام

~~~text app.ts
function handle(res: ProductsRes) {
  if (res.ok) return res.data.items.map((p) => p.title);
  return [res.error];
}
~~~

- [[if (res.ok)]]: جوه الـ if النوع بقى فرع النجاح، فـ [[res.data.items]] هي [[Product[]]]، و [[p.title]] string.
- بعد الـ if: فاضل فرع الفشل، فـ [[res.error]] موجودة.
- نوع الرجوع اتستنتج [[string[]]] من الفرعين.

~~~text الناتج: handle على رد ناجح فيه منتج واحد، وعلى رد فاشل
[ 'Pen' ]
[ 'timeout' ]
~~~

---

## ٤. default للباراميتر

~~~text app.ts
type Box<T = string> = { value: T };
const b1: Box = { value: "hi" };
const b2: Box<number> = { value: 5 };
~~~

- [[<T = string>]]: لو محدش حدد T، تبقى string.
- [[b1: Box]] من غير [[< >]] يعني [[Box<string>]]:

~~~text الأنواع
b1: Box<string>
b2: Box<number>
~~~

والإثبات إن الـ default اتطبق:

~~~text الناتج: const bad: Box = { value: 5 }
error TS2322: Type 'number' is not assignable to type 'string'.
~~~

خلي بالك: مع الأنواع، TS **مبيستنتجش** T من القيمة زي ما بيعمل مع الدوال. يا تكتبه، يا ياخد الـ default. ولو مفيش default ونسيته ([[const x: ApiResponse = ...]]) بيطلّع [[TS2314: Generic type 'ApiResponse' requires 1 type argument(s).]]

---

## الخلاصة

| الكتابة | معناها |
|---|---|
| [[type Box<T> = { value: T }]] | نوع بياخد نوع |
| [[Box<number>]] | استبدل T بـ number |
| [[ApiResponse<Paginated<Product>>]] | generics جوه بعض، تتقري من جوه لبرة |
| [[<T = string>]] | لو T متكتبتش، تبقى string |

شكل الرد يتكتب مرة واحدة، والداتا بس اللي بتتغير.`,
          lines: [
            "رد API: يا نجاح وفيه data نوعها T، يا فشل وفيه error.",
            "صفحة من أي حاجة.",
            "شكل المنتج.",
            "generics جوه بعض: رد فيه صفحة منتجات.",
            "دالة بتستقبل الرد.",
            R`بعد [[res.ok]]، TS عارف إن [[items]] منتجات و [[p.title]] string.`,
            "فرع الفشل.",
            "قفلة.",
            "باراميتر ليه قيمة افتراضية.",
            "من غير ما تحدد، T هي string.",
            "أو تحدده."
          ],
          sol: R`الحل تحت: [[Result<number>]] معناها [[E]] أخدت الـ default بتاعها string. [[parseAge("27")]] بعد الفحص بـ [[if (r.ok)]] بتديك [[r.value + 1]] = [[28]]، و [[parseAge("abc")]] بترجع [[{ ok: false, error: '«abc» مش سن صحيح' }]].

الغلطة الشائعة: تعمل [[{ ok: boolean; value?: T; error?: E }]] object واحد. ساعتها [[if (r.ok)]] مش بتضيّق حاجة، و [[r.value]] هتفضل [[number | undefined]]. الـ union بـ [[ok: true]] و [[ok: false]] هو اللي بيخلي TS يعرف أنهي حالة.`,
          solCode: R`type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E };
function parseAge(input: string): Result<number> {
  const n = Number(input);
  if (!Number.isInteger(n) || n < 0 || n > 150) {
    return { ok: false, error: $__bt«$__{input}» مش سن صحيح$__bt };
  }
  return { ok: true, value: n };
}
const r = parseAge("27");
if (r.ok) console.log(r.value + 1); // 28
else console.log(r.error);
console.log(parseAge("abc")); // { ok: false, error: '«abc» مش سن صحيح' }`
        }
      ]
    }
]);
