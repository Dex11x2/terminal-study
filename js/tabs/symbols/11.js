// تكملة تاب symbols: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/symbols/01.js (شرح حقول الدرس في أوله)
MORE("symbols", [
    {
      t: "رموز TypeScript والأسماء",
      l: 2,
      n: ": و <T> و | و ?: و ! و @ و # و $ و _ : الرموز اللي بتظهر في الأنواع والأسماء",
      items: [
        {
          cmd: "x: number",
          title: "النقطتين : في TypeScript: بعدها نوع المتغير أو الـ parameter أو اللي الدالة بترجّعه",
          desc: R`في TypeScript [[let age: number = 20]] معناها age نوعها رقم. النقطتين بعد اسم أي حاجة معناها «نوعها هو». في الدوال: [[function add(a: number, b: number): number]]، والأخيرة بعد الأقواس هي نوع اللي بترجّعه.

نفس النقطتين بالمعنى ده في Python ([[def f(x: int) -> str]])، و Kotlin ([[val age: Int]])، و Swift ([[let age: Int]])، و Rust و Go من غير نقطتين ([[age int]]).

لكن النقطتين ليها معاني تانية في JS: جوه object بتفصل المفتاح عن القيمة [[{ age: 20 }]]، وفي الـ ternary [[a ? b : c]]، وبعد [[case]] في switch. وفي Python بعد if و def و for بتفتح بلوك.`,
          example: R`let age: number = 20;
const names: string[] = ["Ali", "Sara"];
function greet(name: string, times: number = 1): string {
  return name.repeat(times);
}
const user: { id: number; email?: string } = { id: 1 };`,
          flag: "script",
          try: R`افتح [[https://www.typescriptlang.org/play]] واكتب [[let n: number = "5"]] واقرا الـ error. بعدين [[function f(x: string): number { return x; }]].`,
          deep: {
            why: R`الأنواع بتمسك الأخطاء وانت بتكتب مش وانت شغّال: دالة مستنية رقم وجالها نص، أو خانة اسمها غلط. والمحرر بيكمّلك أسماء الخانات لأنه عارف النوع.`,
            how: R`الأنواع في TypeScript بتتشال خالص وقت التحويل لـ JS، يعني مفيش أي تأثير وقت التشغيل. الـ compiler ([[tsc]]) أو المحرر بس هو اللي بيفحص. وكتير مش لازم تكتب النوع لأن TS بيستنتجه (inference): [[let age = 20]] بتبقى number لوحدها.`,
            when: R`في parameters الدوال دايمًا، وفي اللي بترجّعه الدوال المهمة. والمتغيرات اللي ليها قيمة أولية سيب TS يستنتجها.`,
            mistakes: R`تفتكر الأنواع بتتفحص وقت التشغيل: داتا جاية من API ممكن تبقى غلط والنوع مش هيحميك، استخدم validation (زي zod). وتخلط بين [[: number]] (نوع) و [[= 5]] (قيمة). وتكتب [[Number]] و [[String]] بحرف كبير بدل [[number]] و [[string]].`
          },
          teach: R`## الفكرة: [[:]] بعد اسم = «نوعه»

في TypeScript لما تكتب [[اسم: نوع]] انت بتقول للـ compiler إيه اللي مسموح يتحط في الاسم ده. لو حطيت حاجة تانية، بيطلّعلك error **وانت بتكتب**، قبل ما الكود يشتغل. المثال TypeScript، وفحصناه بـ [[tsc]] (الـ compiler بتاع TypeScript، إصدار 7.0) مع [[--strict]] (الفحص الكامل)، وشغّلنا الناتج بـ Node 24 على ويندوز.

---

## ١. متغير برقم

~~~ts
let age: number = 20;
~~~

اقراه كده: [[let age]] متغير اسمه age، و [[: number]] نوعه رقم، و [[= 20]] قيمته الأولى 20. يعني النقطتين للنوع، والـ [[=]] للقيمة.

ولو حطيت نص:

~~~ts
let n: number = "5";
~~~

~~~text ناتج tsc
b.ts(1,5): error TS2322: Type 'string' is not assignable to type 'number'.
~~~

اقرا الرسالة: [[b.ts(1,5)]] يعني الملف b.ts، السطر 1، الحرف 5. و [[TS2322]] رقم الغلطة. والكلام: نوع string مينفعش يتحط في number.

---

## ٢. array من النصوص

~~~ts
const names: string[] = ["Ali", "Sara"];
~~~

[[string[]]]: النوع [[string]] وبعده [[[]]] يعني «array كل عناصرها نصوص». ونفسها [[Array<string>]] (درس [[<T>]]).

---

## ٣. دالة بأنواعها

~~~ts
function greet(name: string, times: number = 1): string {
  return name.repeat(times);
}
~~~

فيها ٣ أماكن للنقطتين:

| الجزء | معناه |
|---|---|
| [[name: string]] | الـ parameter الأول لازم نص |
| [[times: number = 1]] | التاني رقم، ولو محدش بعته قيمته 1 |
| [[): string]] | النقطتين **بعد** قوس الـ parameters: نوع اللي الدالة بترجّعه |

و [[name.repeat(times)]] بتكرر النص times مرة. جرّبناها:

~~~ts
console.log(greet("Ali"), greet("Ha", 3));
~~~

~~~text الناتج
Ali HaHaHa
~~~

ولو بعت رقم مكان النص:

~~~ts
greet(5);
~~~

~~~text ناتج tsc
error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
~~~

ولو الدالة قالت إنها بترجّع رقم ورجّعت نص:

~~~ts
function f(x: string): number { return x; }
~~~

~~~text ناتج tsc
error TS2322: Type 'string' is not assignable to type 'number'.
~~~

---

## ٤. نوع object جوه السطر

~~~ts
const user: { id: number; email?: string } = { id: 1 };
~~~

- [[{ id: number; email?: string }]] بعد النقطتين ده **نوع** مش object: بيوصف شكل الـ object. الخانات بتتفصل بـ [[;]] (أو فاصلة).
- [[id: number]] إجبارية.
- [[email?: string]] علامة الاستفهام قبل النقطتين معناها اختيارية (درس [[?:]]).
- [[= { id: 1 }]] القيمة الحقيقية: فيها id ومفيهاش email، وده مسموح.

ولو نسيت الإجبارية:

~~~ts
const u2: { id: number; email?: string } = { email: "a" };
~~~

~~~text ناتج tsc
error TS2741: Property 'id' is missing in type '{ email: string; }' but required in type '{ id: number; email?: string | undefined; }'.
~~~

---

## ٥. الأنواع بتختفي وقت التشغيل

ده الـ JavaScript اللي [[tsc]] طلّعه من المثال:

~~~javascript
let age = 20;
const names = ["Ali", "Sara"];
function greet(name, times = 1) {
    return name.repeat(times);
}
const user = { id: 1 };
~~~

كل [[: نوع]] اتشالت. يعني الأنواع فحص وقت الكتابة بس، ومش بتحمي من داتا غلط جاية من API وقت التشغيل.

### مش لازم تكتب النوع دايمًا

~~~ts
let inferred = 20;
inferred = "x";
~~~

~~~text ناتج tsc
error TS2322: Type 'string' is not assignable to type 'number'.
~~~

TS استنتج إن [[inferred]] رقم من القيمة الأولى (اسمها **inference**)، من غير ما نكتب [[: number]].

---

## ٦. النقطتين ليها معاني تانية

| فين | المعنى |
|---|---|
| [[let x: number]] | نوع (TypeScript بس) |
| [[{ age: 20 }]] | جوه object: مفتاح وقيمة |
| [[a ? b : c]] | «وإلا» في الـ ternary |
| [[case 1:]] | بعد case في switch |

---

## الخلاصة

- [[اسم: نوع]] للمتغيرات والـ parameters، و [[): نوع]] بعد قوس الدالة للي بترجّعه.
- الأنواع الأساسية بحروف صغيرة: [[number]] و [[string]] و [[boolean]]، مش [[Number]] و [[String]].
- اكتب الأنواع في parameters الدوال دايمًا، وسيب TS يستنتج المتغيرات اللي ليها قيمة.`,
          lines: [
            R`متغير نوعه number.`,
            R`array من النصوص.`,
            R`parameterين بأنواعهم، والتاني ليه قيمة افتراضية، والدالة بترجّع string.`,
            R`[[repeat]] بتكرر النص.`,
            R`قفلة الدالة.`,
            R`نوع object جوه السطر: id رقم إجباري، و email نص اختياري ([[?:]]).`
          ],
          sol: R`[[let n: number = "5"]] ← [[Type 'string' is not assignable to type 'number'.]]. والدالة ← نفس الرسالة تقريبًا لأنها بترجّع string والمكتوب number.`
        },
        {
          cmd: "<T>",
          title: "الأقواس الزاوية <T> : generics، نوع بيتحدد وقت الاستخدام زي parameter للأنواع",
          desc: R`[[Array<string>]] معناها array من النصوص. والـ [[<>]] بتاخد نوع جواها زي ما الدالة بتاخد قيمة. ولما تكتب دالة بنفسك: [[function first<T>(arr: T[]): T]] معناها «أي نوع، سمّيه T، والدالة بترجّع نفس النوع اللي جه في الـ array».

بتشوفها في كل مكان: [[Promise<User>]] و [[useState<number>(0)]] و [[Map<string, number>]] و [[Record<string, boolean>]].

نفس الفكرة في Java و C# و Kotlin و Swift و Rust: [[List<String>]]. وفي C++ اسمها templates: [[vector<int>]]. وفي Go بأقواس مربعة: [[func Map[T any]()]]. وفي Python: [[list[str]]].`,
          example: R`const ids: Array<number> = [1, 2, 3];
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
const n = first([10, 20]);
const [count, setCount] = useState<number>(0);
const cache = new Map<string, User>();`,
          flag: "script",
          try: R`في TypeScript Playground اكتب دالة [[first]] من المثال، وبعدين [[const s = first(["a", "b"])]] وقف بالماوس على s وشوف نوعها.`,
          deep: {
            why: R`من غيرها كنت هتكتب [[any]] فتخسر كل فايدة الأنواع، أو تكتب نفس الدالة مرة للأرقام ومرة للنصوص.`,
            how: R`[[T]] مجرد اسم (ممكن أي اسم، بس T و K و V عرف). وقت النداء TS بيستنتج T من الـ argument، أو انت تحدده صراحة [[first<string>(...)]]. وكله بيتشال في الـ JS النهائي.`,
            when: R`دوال وكلاسات بتشتغل على أي نوع (utilities و containers و API clients). وفي الاستخدام لما TS ميعرفش يستنتج لوحده، زي [[useState<User | null>(null)]].`,
            mistakes: R`في ملفات [[.tsx]] الـ arrow generic [[<T>(x: T) => x]] بتتلخبط مع JSX، اكتبها [[<T,>(x: T) => x]]. وتستخدم [[any]] بدل generic. وتفتكر [[<]] هنا مقارنة.`
          },
          teach: R`## الفكرة: parameter بس للأنواع

الدالة العادية بتاخد **قيمة** بين [[( )]]. الـ generic بياخد **نوع** بين [[< >]]. [[Array<number>]] يعني «Array، والنوع اللي جواها number». المثال TypeScript، وفحصناه بـ [[tsc]] 7.0 مع [[--strict]]، وشغّلنا الناتج بـ Node 24 على ويندوز. وعشان نشوف الأنواع اللي TS استنتجها طلبنا من [[tsc]] ملف [[.d.ts]] (ملف أنواع بس) بـ [[--declaration --emitDeclarationOnly]].

> المثال فيه [[useState]] (من React) و [[User]] (نوع انت معرّفه)، فعرّفناهم في أول الملف عشان الفحص يعدّي.

---

## ١. [[Array<number>]]

~~~ts
const ids: Array<number> = [1, 2, 3];
~~~

نفس [[number[]]] بالظبط، بس مكتوبة بشكل الـ generic. ولو حطيت نص:

~~~ts
const ids: Array<number> = [1, "2"];
~~~

~~~text ناتج tsc
error TS2322: Type 'string' is not assignable to type 'number'.
~~~

---

## ٢. دالة generic

~~~ts
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
~~~

نفكّها حتة حتة:

| الجزء | معناه |
|---|---|
| [[<T>]] بعد اسم الدالة | «فيه نوع هسمّيه T، هيتحدد لما حد ينادي الدالة» |
| [[arr: T[]]] | الـ parameter array من النوع ده |
| [[: T | undefined]] | بترجّع عنصر من نفس النوع، أو [[undefined]] لو الـ array فاضية |
| [[return arr[0];]] | رجّع أول عنصر |

[[T]] مجرد اسم، زي اسم parameter. العرف: T (Type)، و K و V (Key و Value).

---

## ٣. TS بيستنتج T لوحده

~~~ts
const n = first([10, 20]);
~~~

الـ array فيها أرقام، فـ TS قرر إن T = number. ده اللي ملف الأنواع طلّعه:

~~~text decl/c.d.ts
declare const n: number | undefined;
~~~

وقت التشغيل [[n]] بـ [[10]]. ولو استخدمتها في مكان مستني نص:

~~~ts
const t1: string = n;
~~~

~~~text ناتج tsc
error TS2322: Type 'number | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.
~~~

TS فاكر إن الناتج رقم (أو undefined)، وده بالظبط الفايدة: لو الدالة كانت بترجّع [[any]] ماكانش هيمسك الغلطة.

### أو تحدده انت

~~~ts
const forced = first<string>(["a"]);
const bad = first<string>([1]);
~~~

~~~text ناتج tsc
error TS2322: Type 'number' is not assignable to type 'string'.
~~~

[[first<string>]] قالت T = string صراحة، فالـ array اللي فيها رقم اترفضت.

---

## ٤. [[useState<number>(0)]]

~~~ts
const [count, setCount] = useState<number>(0);
~~~

~~~text decl/c.d.ts
declare const count: number, setCount: (v: number) => void;
~~~

- [[useState<number>]]: الـ state هيبقى رقم.
- [[(0)]]: القيمة الأولى.
- [[const [count, setCount] =]]: فك الـ array اللي راجعة (destructuring، درس [[[a, b]]]). [[count]] رقم، و [[setCount]] دالة بتاخد رقم.

هنا الـ [[<number>]] مش ضروري لأن TS هيستنتجه من الـ 0، بس بيبقى ضروري في حالة زي [[useState<User | null>(null)]]: من الـ null لوحدها TS ميعرفش إن بعدين هيبقى فيه User.

---

## ٥. [[Map<string, User>]]: نوعين

~~~ts
const cache = new Map<string, User>();
~~~

~~~text decl/c.d.ts
declare const cache: Map<string, User>;
~~~

الـ generic ممكن ياخد أكتر من نوع، بينهم فاصلة: المفاتيح نصوص، والقيم User. [[cache.set("u1", { id: 1, name: "Ali" })]] تمام، ولو حطيت مفتاح رقم هيطلع error.

---

## ٦. الأنواع بتختفي

ده الـ JavaScript اللي طلع:

~~~javascript
const ids = [1, 2, 3];
function first(arr) {
    return arr[0];
}
const n = first([10, 20]);
const [count, setCount] = useState(0);
const cache = new Map();
~~~

كل [[<...>]] اتشالت. ولما شغّلناه (مع [[useState]] بسيطة) طبع [[[ 1, 2, 3 ] 10 a a { id: 1, name: 'Ali' } 0]].

---

## الخلاصة

| تكتب | المعنى |
|---|---|
| [[Array<string>]] | array من النصوص |
| [[function f<T>(x: T): T]] | دالة بتشتغل مع أي نوع وبترجّع نفسه |
| [[f<string>(...)]] | حدد T بنفسك |
| [[Map<K, V>]] | نوعين: المفتاح والقيمة |
| [[Promise<User>]] | وعد هيرجّع User |

- [[<]] هنا مش «أصغر من»: هي بتفتح نوع.
- نفس الفكرة: Java و C# [[List<String>]]، و C++ [[vector<int>]]، و Go [[[T any]]]، و Python [[list[str]]].`,
          lines: [
            R`نفس [[number[]]] بصيغة الـ generic.`,
            R`T بيتحدد من الـ array اللي هتبعتها، والدالة بترجّع نفس النوع أو undefined.`,
            R`رجّع أول عنصر.`,
            R`قفلة الدالة.`,
            R`TS استنتج إن T هي number، فـ n نوعها [[number | undefined]].`,
            R`React: الـ state رقم.`,
            R`Map مفاتيحها نصوص وقيمها User.`
          ],
          sol: R`لما تقف على [[s]] هتلاقي [[const s: string | undefined]]. TS استنتج T = string من الـ array.`
        },
        {
          cmd: "A | B  و  A & B",
          title: "الـ | و & في أنواع TypeScript: | يعني «ده أو ده» (union)، و & يعني «الاتنين مع بعض»",
          desc: R`[[string | number]] (union) معناها القيمة ممكن تبقى نص أو رقم. وأشهر استخدام: قيم محددة [[type Status = "idle" | "loading" | "done"]]، فلو كتبت [["laoding"]] غلط TS هيقولك. و [[User | null]] يعني ممكن ميبقاش فيه يوزر.

[[A & B]] (intersection) معناها النوع فيه كل خانات A وكل خانات B مع بعض: [[type Admin = User & { permissions: string[] }]].

ده نفس شكل رموز الـ bits ومعنى قريب بالمنطق، بس هنا في الأنواع بس ومش بيتنفذ. ونفس [[|]] في Python 3.10: [[int | None]]، وفي Rust و Kotlin و Swift الفكرة موجودة بأشكال تانية.`,
          example: R`type Id = string | number;
type Status = "idle" | "loading" | "done";
let state: Status = "idle";
type Admin = User & { permissions: string[] };
function show(id: Id) {
  if (typeof id === "string") return id.toUpperCase();
  return id.toFixed(0);
}`,
          flag: "script",
          try: R`في TypeScript Playground: اكتب [[type Status]] من المثال وبعدين [[let s: Status = "loding"]] واقرا الـ error. بعدين جرّب تنادي [[id.toUpperCase()]] برة الـ if.`,
          deep: {
            why: R`الـ union بيوصف الواقع: API بيرجّع داتا أو error، قيمة ممكن تبقى null، وحالة من عدد محدود. وده بيمنع typos ويجبرك تتعامل مع كل الحالات.`,
            how: R`مع union مسموحلك تستخدم بس الحاجات المشتركة بين كل الأنواع. عشان تستخدم حاجة خاصة بنوع لازم تضيّق (narrowing) بـ [[typeof]] أو [[in]] أو مقارنة، و TS بيفهم ده جوه الـ if.`,
            when: R`[[|]] للقيم اللي ليها أكتر من شكل أو للحالات. [[&]] لدمج أنواع جاهزة بدل ما تكرر خانات.`,
            mistakes: R`تستخدم method خاصة بنوع واحد من غير narrowing فيطلع error. وتفتكر [[A & B]] بين [[string & number]] بتدي «الاتنين»: النتيجة [[never]] (مفيش قيمة نص ورقم في نفس الوقت).`
          },
          teach: R`## الفكرة: «ده أو ده» و «ده وده»

| الرمز في الأنواع | اسمه | معناه |
|---|---|---|
| [[A | B]] | union | القيمة واحدة من الاتنين |
| [[A & B]] | intersection | القيمة فيها كل خانات الاتنين مع بعض |

نفس شكل رموز الـ bits، بس هنا بين **أنواع** وبيتشالوا خالص وقت التشغيل. المثال TypeScript، وفحصناه بـ [[tsc]] 7.0 مع [[--strict]]، وشغّلنا الناتج بـ Node 24 على ويندوز. والمثال بيستخدم [[User]] من غير ما يعرّفه، فعرّفناه: [[interface User { id: number; name: string }]].

---

## ١. [[type Id = string | number;]]

~~~ts
type Id = string | number;
~~~

- [[type]] كلمة بتعمل **اسم لنوع** (type alias)، زي ما [[const]] بتعمل اسم لقيمة.
- [[string | number]]: Id ممكن تبقى نص **أو** رقم. [["u1"]] تنفع و [[7]] تنفع، و [[true]] لأ.

---

## ٢. union من قيم محددة

~~~ts
type Status = "idle" | "loading" | "done";
let state: Status = "idle";
~~~

هنا الأنواع مش [[string]] عام، دي **نصوص بعينها** (اسمها literal types). [[state]] مسموحلها ٣ قيم بس. ولو غلطت في الحروف:

~~~ts
let s: Status = "loding";
~~~

~~~text ناتج tsc
error TS2820: Type '"loding"' is not assignable to type 'Status'. Did you mean '"loading"'?
~~~

TS مسك الـ typo وكمان اقترح الصح.

---

## ٣. [[&]]: دمج نوعين

~~~ts
type Admin = User & { permissions: string[] };
~~~

[[Admin]] لازم يبقى فيه كل خانات User ([[id]] و [[name]]) **و** خانة [[permissions]] (array نصوص). جرّبنا:

~~~ts
const a: Admin = { id: 1, name: "Ali", permissions: ["delete"] };
~~~

عدّت. ولو نسيت permissions:

~~~text ناتج tsc
error TS2322: Type '{ id: number; name: string; }' is not assignable to type 'Admin'.
  Property 'permissions' is missing in type '{ id: number; name: string; }' but required in type '{ permissions: string[]; }'.
~~~

---

## ٤. narrowing: تضييق الـ union

~~~ts
function show(id: Id) {
  if (typeof id === "string") return id.toUpperCase();
  return id.toFixed(0);
}
~~~

مع union TS بيسمحلك تستخدم بس اللي موجود في **كل** الأنواع. [[toUpperCase]] للنصوص بس، و [[toFixed]] للأرقام بس. فلازم تسأل الأول:

1. [[typeof id === "string"]]: [[typeof]] بترجّع اسم نوع القيمة وقت التشغيل. جوه الـ if، TS فاهم إن id **نص**، فـ [[toUpperCase()]] مسموحة (بتكبّر الحروف).
2. بعد الـ if (اللي فيه return)، اللي فاضل من الـ union هو number بس، فـ [[toFixed(0)]] مسموحة (بتقرّب لعدد خانات عشرية، وهنا صفر).

ده اسمه **narrowing** (تضييق). شغّلناه:

~~~ts
console.log(show("ab"), show(3.7));
~~~

~~~text الناتج
AB 4
~~~

[[3.7]] اتقرّبت [["4"]] (toFixed بترجّع نص). ولو نسيت الـ if:

~~~ts
function show(id: Id) { return id.toUpperCase(); }
~~~

~~~text ناتج tsc
error TS2339: Property 'toUpperCase' does not exist on type 'Id'.
  Property 'toUpperCase' does not exist on type 'number'.
~~~

السطر التاني بيقولك السبب: لو id طلعت رقم، مفيش toUpperCase.

---

## ٥. [[&]] بين أنواع مالهاش علاقة ببعض

~~~ts
type Never = string & number;
const x: Never = "a";
~~~

~~~text ناتج tsc
error TS2322: Type '"a"' is not assignable to type 'never'.
~~~

مفيش قيمة نص ورقم في نفس الوقت، فالنوع بقى [[never]] (مستحيل). [[&]] مفيدة مع الـ objects، مش مع الأنواع البسيطة.

---

## الخلاصة

| تكتب | يعني |
|---|---|
| [[string | number]] | نص أو رقم |
| [["a" | "b"]] | واحدة من القيم دي بالظبط |
| [[User | null]] | ممكن ميبقاش فيه User |
| [[A & B]] | كل خانات A وكل خانات B |

- مع union اسأل بـ [[typeof]] (أو مقارنة) قبل ما تستخدم حاجة خاصة بنوع واحد.
- في Python 3.10+ نفس [[|]]: [[int | None]].`,
          lines: [
            R`Id ممكن تبقى نص أو رقم.`,
            R`union من ٣ قيم نصية بالظبط.`,
            R`متغير لازم يبقى واحدة من التلاتة.`,
            R`intersection: كل خانات User ومعاها permissions.`,
            R`دالة بتاخد Id.`,
            R`narrowing: جوه الـ if TS عارف إنها string.`,
            R`هنا TS عارف إنها number.`,
            R`قفلة الدالة.`
          ],
          sol: R`[[let s: Status = "loding"]] ← [[Type '"loding"' is not assignable to type 'Status'. Did you mean '"loading"'?]]. و [[id.toUpperCase()]] برة الـ if ← [[Property 'toUpperCase' does not exist on type 'Id'.]] وتحتها [[Property 'toUpperCase' does not exist on type 'number'.]] (لأن id ممكن تبقى رقم).`
        },
        {
          cmd: "name?:  و  x!",
          title: "الـ ?: خانة اختيارية في TypeScript، و ! بعد قيمة يعني «أنا متأكد إنها مش null»",
          desc: R`[[email?: string]] في نوع أو interface معناها الخانة دي ممكن متكونش موجودة. نوعها الحقيقي [[string | undefined]]. ونفس الحكاية في parameters الدالة: [[function f(name?: string)]].

[[x!]] (non-null assertion) بعد قيمة معناها «يا TypeScript، صدّقني القيمة دي مش null ولا undefined». [[document.getElementById("app")!]].

الـ [[!]] دي مبتعملش أي فحص وقت التشغيل، بتسكّت الـ compiler بس. لو طلعت null فعلًا البرنامج هيقع. والـ [[!]] قبل قيمة ([[!x]]) معناها not، وده غير دي خالص. وفي Kotlin [[!!]] و Swift [[!]] فكرة قريبة بس بيعملوا فحص ويوقعوا البرنامج بشكل واضح.`,
          example: R`interface User {
  id: number;
  email?: string;
}
const u: User = { id: 1 };
console.log(u.email?.length);
const app = document.getElementById("app")!;`,
          flag: "script",
          try: R`في Playground اكتب الـ interface وبعدين [[u.email.length]] من غير [[?.]] واقرا الـ error. بعدين جرّب [[u.email!.length]] وفكّر هيحصل إيه وقت التشغيل.`,
          deep: {
            why: R`أغلب الداتا فيها خانات مش دايمًا موجودة. و [[!]] منتشرة في الكود بس لازم تعرف إنها وعد منك مش ضمان.`,
            how: R`[[?:]] بتضيف [[undefined]] لنوع الخانة وبتسمح إنها تتشال. [[!]] بتشيل null و undefined من النوع وقت الفحص بس، والـ JS اللي بيطلع مفيهوش أي أثر ليها.`,
            when: R`[[?:]] لأي خانة اختيارية. [[!]] بس لما انت متأكد فعلًا (عنصر HTML موجود في الصفحة دايمًا مثلًا)، وغير كده افحص بـ if أو [[?.]].`,
            mistakes: R`تحط [[!]] في كل حتة عشان تسكت الأخطاء: كده لغيت فايدة TypeScript. وتخلط بين [[?:]] في النوع و [[?.]] في الاستخدام و [[? :]] في الـ ternary.`
          },
          teach: R`## الفكرة: «ممكن متكونش موجودة» و «صدّقني موجودة»

| الرمز | مكانه | معناه |
|---|---|---|
| [[?:]] | في تعريف نوع، بعد اسم الخانة | الخانة اختيارية |
| [[!]] | بعد قيمة | «أنا متأكد إنها مش null ولا undefined» (non-null assertion) |

المثال TypeScript، وفحصناه بـ [[tsc]] 7.0 مع [[--strict]] و [[--lib es2022,dom]] (عشان يعرف [[document]] بتاع المتصفح)، وشغّلنا الأجزاء اللي مش محتاجة متصفح بـ Node 24 على ويندوز.

---

## ١. [[interface]] فيه خانة اختيارية

~~~ts
interface User {
  id: number;
  email?: string;
}
~~~

- [[interface User { ... }]]: بيوصف **شكل** object اسمه User (أنواع بس، مفيش قيم).
- [[id: number;]]: خانة إجبارية رقم.
- [[email?: string;]]: علامة الاستفهام **قبل** النقطتين بتقول إن الخانة ممكن متبقاش موجودة. يعني نوعها الحقيقي [[string | undefined]].

---

## ٢. object من غير الخانة الاختيارية

~~~ts
const u: User = { id: 1 };
~~~

TS موافق لأن [[email]] اختيارية. لو شيلت [[id]] كان هيعترض.

---

## ٣. لازم تتعامل مع إنها ممكن تبقى فاضية

~~~ts
console.log(u.email?.length);
~~~

~~~text الناتج
undefined
~~~

[[?.]] (درس في «رموز المنطق») بتقف لو email مش موجودة. ولو كتبت النقطة العادية:

~~~ts
console.log(u.email.length);
~~~

~~~text ناتج tsc
error TS18048: 'u.email' is possibly 'undefined'.
~~~

TS بيقولك: email ممكن تبقى undefined، فمينفعش تدخل جواها كده.

---

## ٤. [[!]] بعد القيمة

~~~ts
const app = document.getElementById("app")!;
~~~

- [[document.getElementById("app")]] بتدوّر في الصفحة على عنصر الـ id بتاعه [[app]]، ولو ملقتهوش بترجّع [[null]]. فنوع الناتج [[HTMLElement | null]].
- [[!]] في الآخر بتقول لـ TS «شيل الـ null من النوع».

الفرق في الأنواع اللي [[tsc]] استنتجها (من ملف [[.d.ts]] اللي طلّعه بـ [[--declaration]]):

~~~text out/g.d.ts
declare const app: HTMLElement;
declare const app2: HTMLElement | null;
~~~

[[app]] (بالـ [[!]]) نوعها [[HTMLElement]] بس، و [[app2]] (من غيرها) [[HTMLElement | null]]. ولو استخدمت [[app2]] على طول:

~~~ts
const app2 = document.getElementById("app");
app2.textContent = "x";
~~~

~~~text ناتج tsc
error TS18047: 'app2' is possibly 'null'.
~~~

---

## ٥. [[!]] مبتعملش أي فحص وقت التشغيل

ده الـ JavaScript اللي طلع من المثال:

~~~javascript
const u = { id: 1 };
console.log(u.email?.length);
const app = document.getElementById("app");
~~~

الـ [[!]] **اختفت**. يعني هي وعد منك للـ compiler بس. وجرّبنا وعد كداب:

~~~ts
console.log(u.email!.length);
~~~

[[tsc]] سكت خالص، ولما شغّلنا الناتج:

~~~text الناتج
TypeError: Cannot read properties of undefined (reading 'length')
~~~

email مش موجودة فعلًا، فالبرنامج وقع. TS كان هيمسكها لولا الـ [[!]].

---

## ٦. [[?]] في parameters الدالة

~~~ts
function f(name?: string) { return name; }
f();
~~~

عدّت من غير error: [[name?]] معناها الـ argument ده ممكن ميتبعتش، وقيمته ساعتها [[undefined]].

---

## الخلاصة

| الشكل | فين | معناه |
|---|---|---|
| [[email?: string]] | تعريف نوع | خانة اختيارية |
| [[u.email?.length]] | استخدام | ادخل لو موجودة |
| [[x!]] | بعد قيمة | صدّقني مش null (من غير فحص) |
| [[!x]] | قبل قيمة | not (عكس)، حاجة تانية خالص |
| [[a ? b : c]] | قيمة | ternary |

استخدم [[!]] بس لما تبقى متأكد فعلًا (عنصر HTML موجود في الصفحة دايمًا مثلًا)، وغير كده افحص بـ if أو [[?.]].`,
          lines: [
            R`interface بيوصف شكل User.`,
            R`id إجباري.`,
            R`email اختياري: ممكن ميبقاش موجود.`,
            R`قفلة الـ interface.`,
            R`object من غير email، و TS موافق.`,
            R`لازم [[?.]] لأن email ممكن تبقى undefined: هنا [[undefined]].`,
            R`[[!]] في الآخر: النوع بقى HTMLElement من غير null.`
          ],
          sol: R`[[u.email.length]] ← [['u.email' is possibly 'undefined'.]]. و [[u.email!.length]] ← TS يسكت، لكن وقت التشغيل هيقع بـ [[TypeError: Cannot read properties of undefined (reading 'length')]] لأن email مش موجودة فعلًا.`
        },
        {
          cmd: "@decorator",
          title: "علامة @ قبل اسم فوق كلاس أو دالة: decorator، بيضيف سلوك أو معلومات من غير ما تعدّل الكود",
          desc: R`[[@]] (at) قبل اسم وفوق كلاس أو دالة أو خانة اسمها decorator. بيلف الحاجة اللي تحته ويضيف لها حاجة: تسجيل، أو صلاحيات، أو معلومات للـ framework.

في Python: [[@app.get("/users")]] في FastAPI بتسجّل الدالة كـ route، و [[@staticmethod]] و [[@property]] جاهزين في اللغة. في TypeScript و Angular: [[@Component({...})]] و [[@Injectable()]]. وفي NestJS: [[@Controller()]] و [[@Get()]].

وفي Java و Kotlin نفس الشكل اسمه annotation ([[@Override]])، ودرسه في المستوى ٣. و [[@]] في أماكن تانية: في الإيميل، وفي npm [[@scope/package]]، وفي CSS [[@media]]، وفي Python بين مصفوفتين [[a @ b]] ضرب مصفوفات.`,
          example: R`# Python: decorator بيقيس الوقت
import time
def timed(fn):
    def wrapper(*args):
        start = time.time()
        result = fn(*args)
        print(fn.__name__, time.time() - start)
        return result
    return wrapper
@timed
def slow():
    time.sleep(0.5)
slow()`,
          flag: "script",
          try: R`احفظ المثال في [[deco.py]] وشغّله بـ [[python3 deco.py]]. بعدين امسح سطر [[@timed]] وشغّله تاني وقارن.`,
          deep: {
            why: R`الـ frameworks الكبيرة (FastAPI و Flask و Angular و NestJS و Spring) مبنية عليها. لو مش فاهم إن [[@app.get]] بتسجّل الدالة، هتحس إن الكود بيشتغل بالسحر.`,
            how: R`في Python [[@timed]] فوق [[def slow]] هي بالظبط [[slow = timed(slow)]]: الدالة اتبعتت للـ decorator، واللي رجع (wrapper) أخد مكانها. في TypeScript الفكرة قريبة وبتتنفذ وقت تعريف الكلاس.`,
            when: R`إنك تستخدمها: كل يوم مع الـ frameworks. إنك تكتب واحدة بنفسك: لما نفس الكود (تسجيل أو cache أو فحص صلاحية) بيتكرر حوالين دوال كتير.`,
            mistakes: R`تحط سطر فاضي أو كود بين الـ decorator والدالة. وتنسى الأقواس لما الـ decorator محتاجها ([[@Injectable()]] مش [[@Injectable]] في Angular). وفي TypeScript القديم لازم [[experimentalDecorators]] في tsconfig لـ Angular وNest.`
          },
          teach: R`## الفكرة: [[@اسم]] فوق دالة = «لفّ الدالة دي بالاسم ده»

الـ decorator دالة بتاخد دالتك، وترجّع دالة جديدة بتعمل نفس الشغل **وزيادة** (تسجيل، قياس وقت، فحص صلاحية...). وعلامة [[@]] (بتتقري at) هي الاختصار اللي بيركّبها. المثال Python، وشغّلناه بـ Python 3.14 على ويندوز ([[python deco.py]]).

---

## ١. السطر الأول: تعليق

~~~python
# Python: decorator بيقيس الوقت
~~~

[[#]] في Python تعليق لحد آخر السطر.

---

## ٢. [[import time]]

~~~python
import time
~~~

بيجيب مكتبة [[time]] اللي جاية مع Python. منها هنستخدم [[time.time()]] (الوقت دلوقتي بالثواني كرقم عشري) و [[time.sleep()]] (استنى).

---

## ٣. الـ decorator نفسه

~~~python
def timed(fn):
    def wrapper(*args):
        start = time.time()
        result = fn(*args)
        print(fn.__name__, time.time() - start)
        return result
    return wrapper
~~~

دي دالة جوه دالة. نفكّها:

| السطر | معناه |
|---|---|
| [[def timed(fn):]] | دالة اسمها timed بتاخد **دالة** في parameter اسمه fn |
| [[def wrapper(*args):]] | جواها بنعرّف دالة جديدة. [[*args]] بتلم أي arguments تيجي في tuple (درس [[*args]] في رموز Python) |
| [[start = time.time()]] | سجّل وقت البداية |
| [[result = fn(*args)]] | شغّل الدالة الأصلية بنفس الـ arguments، و [[*]] هنا بتفردهم تاني |
| [[print(fn.__name__, time.time() - start)]] | اطبع اسم الدالة الأصلية ([[__name__]] خانة فيها اسم أي دالة)، والوقت اللي عدّى = دلوقتي ناقص البداية |
| [[return result]] | رجّع ناتج الأصلية زي ما هو، عشان اللي نادى ميحسّش بفرق |
| [[return wrapper]] | timed بترجّع الدالة الجديدة (من غير أقواس: الدالة نفسها مش تشغيلها) |

المسافات في أول السطور هي اللي بتحدد مين جوه مين: [[wrapper]] جوه [[timed]]، والسطور الأربعة جوه [[wrapper]].

---

## ٤. [[@timed]]

~~~python
@timed
def slow():
    time.sleep(0.5)
~~~

- [[def slow():]] دالة بتستنى نص ثانية ومبترجّعش حاجة.
- [[@timed]] اللي فوقها بالظبط معناها، بعد تعريف slow على طول:

~~~python
slow = timed(slow)
~~~

يعني الاسم [[slow]] بقى بيشاور على [[wrapper]]، والـ slow الأصلية بقت جوه wrapper في [[fn]]. ولازم الـ [[@]] يبقى **فوق الدالة على طول**، من غير سطر كود بينهم.

---

## ٥. النداء

~~~python
slow()
~~~

~~~text الناتج
slow 0.5002429485321045
~~~

اللي حصل بالترتيب:

1. [[slow()]] نادت wrapper فعليًا.
2. wrapper سجّلت الوقت، وشغّلت الأصلية (نامت نص ثانية).
3. طبعت [[slow]] (الاسم الأصلي من [[fn.__name__]]) والوقت.

ليه [[0.5002]] مش [[0.5]] بالظبط؟ لأن [[sleep]] بتستنى **على الأقل** المدة دي، وفيه جزء صغير من الثانية بيضيع في تشغيل الكود نفسه ورجوع النظام للبرنامج. الرقم هيختلف شوية كل مرة.

ولو مسحت سطر [[@timed]] وشغّلت تاني، مش هيتطبع حاجة: الدالة هتستنى نص ثانية وخلاص.

### نفس الشغل من غير [[@]]

~~~python
def add(a, b):
    return a + b
add = timed(add)
print(add(2, 3))
~~~

~~~text الناتج
add 9.5367431640625e-07
5
~~~

السطر [[add = timed(add)]] هو اللي [[@timed]] بيعمله. والوقت هنا [[9.5e-07]] يعني 0.00000095 ثانية (الـ [[e-07]] معناها اضرب في 10 أس سالب 7)، لأن الجمع سريع جدًا. و [[5]] ناتج الأصلية رجع سليم.

---

## ٦. ملاحظة: الاسم اتغيّر

~~~python
print(slow.__name__)
~~~

~~~text الناتج
wrapper
~~~

بعد اللف، [[slow]] هي wrapper فعلًا. في الكود الحقيقي بيحطوا [[@functools.wraps(fn)]] فوق [[def wrapper]] عشان تحتفظ باسم الأصلية ووصفها.

---

## ٧. [[@]] في أماكن تانية

| فين | مثال | المعنى |
|---|---|---|
| Python (FastAPI) | [[@app.get("/users")]] | سجّل الدالة كـ route |
| Python | [[@staticmethod]] و [[@property]] | decorators جاهزة في اللغة |
| TypeScript (Angular و NestJS) | [[@Component({...})]] و [[@Get()]] | معلومات للـ framework عن الكلاس أو الـ method |
| Java و Kotlin | [[@Override]] | annotation: معلومة للـ compiler |
| npm | [[@scope/package]] | اسم package تبع منظمة |
| CSS | [[@media]] | قاعدة خاصة |
| Python بين مصفوفتين | [[a @ b]] | ضرب مصفوفات |

لاحظ إن [[@timed]] من غير أقواس لأن timed بتاخد الدالة على طول. لما الـ decorator محتاج إعدادات بيتكتب بأقواس ([[@app.get("/users")]]): ده نداء بيرجّع decorator.

---

## الخلاصة

- [[@d]] فوق [[def f]] = [[f = d(f)]].
- الـ decorator دالة بتاخد دالة وترجّع دالة (غالبًا wrapper بتنادي الأصلية جواها).
- بتضيف سلوك حوالين الدالة من غير ما تلمس الكود بتاعها.`,
          lines: [
            R`استورد time.`,
            R`الـ decorator: دالة بتاخد دالة.`,
            R`دالة جديدة بتلف الأصلية.`,
            R`سجّل وقت البداية.`,
            R`شغّل الأصلية.`,
            R`اطبع اسمها والوقت اللي خدته.`,
            R`رجّع ناتج الأصلية.`,
            R`رجّع الدالة اللافة.`,
            R`[[@timed]] = [[slow = timed(slow)]].`,
            R`الدالة الأصلية.`,
            R`بتستنى نص ثانية.`,
            R`النداء دلوقتي بيعدّي على wrapper.`
          ],
          sol: R`مع [[@timed]] هيطبع [[slow 0.50...]] (الاسم والوقت). من غيرها مش هيطبع حاجة، الدالة هتستنى نص ثانية بس.`
        },
        {
          cmd: "#field",
          title: "الـ # قبل اسم خانة في كلاس JavaScript: خانة private حقيقية محدش يوصلها من برة",
          desc: R`في JS الحديث [[#count]] جوه class معناها خانة private: تقدر تستخدمها جوه الكلاس بس بـ [[this.#count]]، ولو حاولت من برة [[obj.#count]] بيطلع SyntaxError.

ده غير [[private]] في TypeScript: دي فحص وقت الكتابة بس، والخانة لسه موجودة عادي في الـ JS. الـ [[#]] حماية حقيقية وقت التشغيل.

قبل [[#]] الناس كانت بتكتب [[_count]] بشرطة تحتية كعُرف «متلمسش»، بس ده مجرد اتفاق ومش حماية. و [[#]] في JS مش تعليق (التعليق [[//]])، وفي CSS [[#id]] selector، وفي URL جزء بعد الـ hash.`,
          example: R`class Counter {
  #count = 0;
  increment() {
    this.#count++;
    return this.#count;
  }
}
const c = new Counter();
c.increment();
console.log(c.count);`,
          flag: "script",
          try: R`انسخ الكلاس في الـ Console، واعمل [[const c = new Counter()]] ونادي [[c.increment()]] مرتين. بعدين جرّب [[c.#count]] واقرا الـ error.`,
          deep: {
            why: R`عشان تحمي حالة الـ object الداخلية: محدش يكتب [[c.count = -5]] من برة ويبوّظ المنطق. الـ API بتاعك يبقى الـ methods بس.`,
            how: R`الـ engine بيحجز الخانة دي جوه الكلاس بشكل مخفي، والاسم مش string عادي فمفيش [[obj["#count"]]] ولا بتظهر في [[Object.keys]] ولا [[JSON.stringify]]. ولازم تتعرّف في جسم الكلاس قبل ما تستخدمها.`,
            when: R`في الكلاسات اللي ليها حالة داخلية مش عايز حد يعدّلها مباشرة. وفيه [[#method()]] كمان لدوال داخلية.`,
            mistakes: R`تفتكر [[#]] تعليق زي Python. وتستخدم [[this.#x]] من غير ما تعرّف [[#x]] في الكلاس (SyntaxError). وتفتكر [[_x]] محمية.`
          },
          teach: R`## الفكرة: [[#]] جزء من اسم الخانة، ومعناه «جوه الكلاس بس»

في كلاس JavaScript، الخانة اللي اسمها بيبدأ بـ [[#]] اسمها **private field**: الكود اللي جوه الكلاس بيشوفها، وأي كود برة مش بيقدر يوصلها خالص. المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

---

## ١. الكلاس

~~~javascript
class Counter {
  #count = 0;
  increment() {
    this.#count++;
    return this.#count;
  }
}
~~~

| السطر | معناه |
|---|---|
| [[class Counter {]] | قالب اسمه Counter بنعمل منه objects |
| [[#count = 0;]] | خانة private قيمتها الأولى 0. لازم تتعرّف هنا قبل ما تستخدمها |
| [[increment() {]] | method عامة (أي حد يناديها) |
| [[this.#count++;]] | [[this]] = الـ object الحالي، و [[++]] تزوّد واحد. جوه الكلاس مسموح |
| [[return this.#count;]] | رجّع القيمة الجديدة |

---

## ٢. من برة

~~~javascript
const c = new Counter();
c.increment();
console.log(c.count);
~~~

~~~text الناتج
undefined
~~~

- [[new Counter()]] عملت object جديد، و [[#count]] فيه بـ 0.
- [[c.increment()]] زوّدتها لـ 1 (السطر ده رجّع 1 بس مطبعناهوش).
- [[c.count]] (من غير [[#]]) دي خانة **تانية** اسمها count، ومش موجودة، فـ [[undefined]]. الـ [[#]] جزء من الاسم، مش زينة.

ولو ناديت تاني وطبعت:

~~~javascript
console.log(c.increment());
~~~

~~~text الناتج
2
~~~

القيمة اتحفظت جوه: كانت 1 وبقت 2.

---

## ٣. لو حاولت توصلها من برة

~~~javascript
console.log(c.#count);
~~~

~~~text الناتج
SyntaxError: Private field '#count' must be declared in an enclosing class
~~~

الرسالة: الخانة دي لازم تبقى متعرّفة في كلاس **حوالين** السطر ده. السطر ده برة الكلاس، فمرفوض. ولاحظ إنه **SyntaxError**: الملف كله مش بيشتغل، مش السطر ده بس. ونفس الرسالة لو استخدمت [[this.#x]] جوه كلاس من غير ما تعرّف [[#x]] فيه.

وكمان مستخبية من كل الطرق التانية:

~~~javascript
console.log(Object.keys(c), JSON.stringify(c), c["#count"]);
~~~

~~~text الناتج
[] {} undefined
~~~

[[Object.keys]] (أسماء الخانات) فاضية، و [[JSON.stringify]] (تحويل لـ JSON) فاضي، و [[c["#count"]]] بيدوّر على خانة عادية اسمها النص ده ومش لاقيها.

---

## ٤. ليه ده مهم: محدش يبوّظ الحالة

~~~javascript
c.count = -5;
console.log(c.increment(), c);
~~~

~~~text الناتج
3 Counter { count: -5 }
~~~

[[c.count = -5]] عملت خانة عامة جديدة اسمها count، والعدّاد الحقيقي [[#count]] متأثرش وكمّل لـ 3.

قارن بالعرف القديم [[_count]]:

~~~javascript
class P { _count = 0; }
const p = new P();
p._count = -5;
console.log(p._count);
~~~

~~~text الناتج
-5
~~~

الشرطة التحتية مجرد اتفاق بين المبرمجين «متلمسش»، واللغة مش بتمنع حاجة.

---

## ٥. [[#]] ضد [[private]] في TypeScript

~~~ts
class T { private count = 0; }
const t = new T();
console.log(t.count);
~~~

~~~text ناتج tsc 7.0
error TS2341: Property 'count' is private and only accessible within class 'T'.
~~~

TS اعترض، بس بص على الـ JavaScript اللي طلع:

~~~javascript
class T {
    count = 0;
}
~~~

كلمة [[private]] اتشالت، ولما شغّلناه طبع [[0]] عادي. يعني [[private]] فحص وقت الكتابة بس، و [[#]] حماية حقيقية وقت التشغيل.

---

## الخلاصة

| الشكل | مين بيمنع | وقت إيه |
|---|---|---|
| [[#count]] | JavaScript نفسها | وقت التشغيل |
| [[private count]] | TypeScript compiler | وقت الكتابة بس |
| [[_count]] | محدش، عرف | |

- [[#]] في JS **مش** تعليق (التعليق [[//]]). وفي CSS [[#id]] selector، وفي URL الجزء بعد الـ hash.`,
          lines: [
            R`كلاس.`,
            R`خانة private قيمتها الأولى 0.`,
            R`method عامة.`,
            R`جوه الكلاس عادي تستخدمها بـ [[this.#]].`,
            R`رجّع القيمة.`,
            R`قفلة الـ method.`,
            R`قفلة الكلاس.`,
            R`object جديد.`,
            R`زوّد واحد.`,
            R`[[c.count]] (من غير #) خانة تانية مش موجودة: [[undefined]].`
          ],
          sol: R`[[c.increment()]] ← [[1]] ثم [[2]]. و [[c.#count]] ← [[SyntaxError: Private field '#count' must be declared in an enclosing class]].`
        },
        {
          cmd: "$  و  _",
          title: "علامة $ والشرطة التحتية _ في أسماء المتغيرات: مسموحين، وليهم أعراف معروفة",
          desc: R`في JS أسماء المتغيرات ممكن يبقى فيها [[$]] و [[_]] زي أي حرف. عشان كده [[$]] لوحدها اسم دالة في jQuery [[$("#btn")]]، و [[_]] اسم مكتبة lodash [[_.debounce]].

أعراف هتشوفها: [[_name]] يعني «خاص، متلمسوش من برة» (اتفاق مش حماية). [[_]] لوحدها في parameter يعني «مش هستخدمه»: [[arr.map((_, i) => i)]]. و [[user$]] في Angular و RxJS يعني ده Observable. و [[$el]] في Vue خانات خاصة بالـ framework.

في Python: [[_x]] خاص بالاتفاق، و [[__x]] بيتغيّر اسمه جوه الكلاس، و [[__init__]] (dunder) دوال خاصة باللغة. وفي PHP و Perl و bash الـ [[$]] قبل أي متغير إجبارية. وفي Go الـ [[_]] بتتجاهل قيمة.`,
          example: R`const $btn = document.querySelector("#save");
const _cache = new Map();
const indexes = ["a", "b"].map((_, i) => i);
const user$ = http.get("/api/user");
const MAX_SIZE = 100;`,
          flag: "script",
          try: R`في الـ Console اكتب [[const $ = 5; const _ = 10; $ + _]]. بعدين [[["x", "y", "z"].map((_, i) => i * 2)]].`,
          deep: {
            why: R`هتقرا كود فيه الرموز دي في الأسماء وتفتكر إنها operators. لما تعرف الأعراف، الاسم نفسه بيقولك معلومة عن المتغير.`,
            how: R`قواعد الأسماء في JS: تبدأ بحرف أو [[$]] أو [[_]]، وبعدها أرقام عادي. يعني [[$]] و [[_]] حروف من ناحية اللغة، والمعنى كله اتفاق بين المبرمجين.`,
            when: R`[[_]] للـ parameter اللي مش محتاجه. [[UPPER_SNAKE]] للثوابت. [[$]] بس لو المشروع ماشي على عرف (jQuery أو Observables).`,
            mistakes: R`تسمّي متغير [[$]] أو [[_]] في مشروع فيه jQuery أو lodash فتغطي عليهم. وتفتكر [[_private]] محمية. وفي Python تفتكر [[__x]] private حقيقية.`
          },
          teach: R`## الفكرة: [[$]] و [[_]] حروف عادية في الأسماء

في JavaScript اسم المتغير ممكن يبدأ بحرف أو [[$]] أو [[_]]، وبعدها حروف وأرقام. يعني [[$]] و [[_]] من ناحية اللغة **حروف** زي a و b، ومفيش أي معنى خاص. المعنى كله **عرف** بين المبرمجين: لما تشوفهم في اسم، الاسم بيقولك معلومة عن المتغير. المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

> المثال بيستخدم [[document]] (من المتصفح) و [[http]] (من Angular)، ودول مش موجودين في Node، فعملنا نسخ بسيطة منهم عشان نشغّله.

---

## ١. [[$]] في أول الاسم: عنصر من الصفحة

~~~javascript
const $btn = document.querySelector("#save");
~~~

- [[document.querySelector("#save")]] بتدوّر في الصفحة على أول عنصر بيطابق الـ selector ده. و [[#save]] هنا CSS selector معناه «العنصر اللي الـ id بتاعه save» (مش تعليق ولا private field).
- [[$btn]]: الدولار في أول الاسم عرف قديم من أيام jQuery معناه «ده عنصر DOM» (عنصر من صفحة الـ HTML)، عشان تفرّقه عن [[btnText]] مثلًا.

---

## ٢. [[_]] في أول الاسم: داخلي

~~~javascript
const _cache = new Map();
~~~

[[new Map()]] بيعمل جدول مفاتيح وقيم فاضي. والشرطة التحتية في أول الاسم معناها «ده للاستخدام الداخلي، متلمسوش من برة». بس ده اتفاق: أي حد يقدر يقراه ويغيّره. للحماية الحقيقية في كلاس استخدم [[#]] (الدرس اللي فات).

---

## ٣. [[_]] لوحدها: «مش محتاجه»

~~~javascript
const indexes = ["a", "b"].map((_, i) => i);
console.log(indexes);
~~~

~~~text الناتج
[ 0, 1 ]
~~~

- [[map]] بتنادي الدالة على كل عنصر وبتبعتلها حاجتين: العنصر نفسه، وبعده رقمه (index).
- احنا عايزين الرقم بس، بس لازم نحط حاجة مكان الأول عشان نوصل للتاني. فسمّيناه [[_]]: اسم متغير عادي، والعرف إنه «مش هستخدمه».
- [[i]] الـ index، والدالة بترجّعه: [[0]] لـ "a" و [[1]] لـ "b".

---

## ٤. [[$]] في آخر الاسم: Observable

~~~javascript
const user$ = http.get("/api/user");
~~~

في Angular و RxJS، [[http.get]] مش بترجّع الداتا على طول، بترجّع **Observable**: حاجة هتطلّع قيمة (أو قيم) بعدين. والدولار في **آخر** الاسم عرف معناه «ده Observable مش القيمة نفسها»، فتعرف إنك محتاج تشترك فيه ([[subscribe]]) عشان توصل للداتا.

---

## ٥. حروف كبيرة و [[_]]: ثابت

~~~javascript
const MAX_SIZE = 100;
~~~

اسمه **UPPER_SNAKE_CASE**: حروف كبيرة والكلمات مفصولة بـ [[_]]. العرف ده معناه «قيمة ثابتة متحطة مرة واحدة في البرنامج» زي حدود وإعدادات.

### كل المثال مرة واحدة

~~~javascript
console.log($btn, _cache, indexes, user$, MAX_SIZE);
~~~

~~~text الناتج
{ selector: '#save' } Map(0) {} [ 0, 1 ] { observableOf: '/api/user' } 100
~~~

(أول وتالت قيمة من النسخ البسيطة اللي عملناها، و [[Map(0) {}]] يعني Map فيها صفر عناصر.)

---

## ٦. إثبات إنهم مجرد أسماء

~~~javascript
const $ = 5;
const _ = 10;
console.log($ + _);
~~~

~~~text الناتج
15
~~~

متغيرين أساميهم [[$]] و [[_]]، وجمعناهم. عشان كده jQuery اختارت [[$]] اسم لدالتها الرئيسية، و lodash اختارت [[_]]. ولو عرّفت متغير بنفس الاسم في مشروع فيه المكتبات دي، هتغطّي عليها.

وأسامي مش مسموحة:

~~~javascript
const 1abc = 1;
~~~

~~~text الناتج
SyntaxError: Invalid or unexpected token
~~~

الاسم مينفعش يبدأ برقم. و [[const my-var = 1]] بيطلّع [[SyntaxError: Missing initializer in const declaration]] لأن الشرطة [[-]] طرح، فـ JS قرت [[const my]] وبعدها [[- var]].

---

## ٧. في Python

~~~python
class A:
    def __init__(self):
        self._x = 1
        self.__y = 2
a = A()
print(a._x, a._A__y)
print(a.__y)
~~~

~~~text الناتج (Python 3.14)
1 2
AttributeError: 'A' object has no attribute '__y'
~~~

- [[_x]] عرف «داخلي» زي JS، ووصلناله عادي.
- [[__y]] (شرطتين) Python بيغيّر اسمها جوه الكلاس لـ [[_A__y]] (اسمها name mangling)، فـ [[a.__y]] مش لاقيها. بس لسه توصلها بالاسم الجديد، يعني مش private حقيقية.
- [[__init__]] (شرطتين قبل وبعد، اسمها dunder) دوال خاصة اللغة بتناديها لوحدها، [[__init__]] بتتنادي لما تعمل object جديد.

---

## الخلاصة

| الاسم | العرف |
|---|---|
| [[$btn]] | عنصر من الصفحة (DOM) |
| [[user$]] | Observable |
| [[_cache]] | داخلي، متلمسوش |
| [[(_, i) =>]] | parameter مش هستخدمه |
| [[MAX_SIZE]] | ثابت |
| [[$]] لوحدها و [[_]] لوحدها | غالبًا jQuery و lodash |

وفي PHP و Perl و bash الـ [[$]] قبل المتغير جزء من اللغة نفسها (مش عرف)، وفي Go الـ [[_]] بتتجاهل قيمة راجعة.`,
          lines: [
            R`[[$]] في أول الاسم: عرف إن ده عنصر من الـ DOM.`,
            R`[[_]] في أول الاسم: داخلي ومتلمسوش.`,
            R`[[_]] لوحدها: الـ parameter الأول مش محتاجينه، عايزين الـ index بس: [[[0, 1]]].`,
            R`[[$]] في الآخر: عرف Angular و RxJS إن ده Observable.`,
            R`حروف كبيرة و [[_]]: ثابت.`
          ],
          sol: R`[[$ + _]] ← [[15]] (مجرد متغيرين أساميهم غريبة). والـ map ← [[[0, 2, 4]]].`
        }
      ]
    }
]);
