// تكملة تاب sweng: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/sweng/01.js (شرح حقول الدرس في أوله)
MORE("sweng", [
    {
      t: "الـ state والـ side effects",
      l: 1,
      n: "الداتا متتغيرش من تحت إيدك، والحسبة بعيدة عن الداتابيز والشبكة",
      items: [
        {
          cmd: "immutability",
          title: "متعدّلش الداتا، اعمل نسخة جديدة",
          desc: R`immutability معناها إنك متعدّلش object أو array موجود، وبدل كده تعمل نسخة جديدة فيها التغيير: [[{ ...user, name: 'Ali' }]] بدل [[user.name = 'Ali']]، و [[[...items, newItem]]] بدل [[items.push(newItem)]]. لأن الـ object ممكن يكون متشارك في أكتر من مكان، والتعديل في مكان بيغيّره في الكل من غير ما حد يعرف.

و React أصلًا مبيشوفش التغيير لو عدّلت نفس الـ object، لأنه بيقارن بالمرجع (reference).`,
          example: R`type Cart = { readonly items: readonly string[]; readonly coupon?: string };

const cart: Cart = { items: ["book"] };

// قبل: بيعدّل الأصل، وأي حد ماسك cart اتغير عنده من غير ما يعرف
// cart.items.push("pen");

const withPen: Cart = { ...cart, items: [...cart.items, "pen"] };
const withCoupon: Cart = { ...withPen, coupon: "SAVE10" };
const sorted = withPen.items.toSorted();

console.log(cart.items, withPen.items, withCoupon.coupon, sorted);
// [ 'book' ] [ 'book', 'pen' ] SAVE10 [ 'book', 'pen' ]

const settings = Object.freeze({ theme: "dark" });
// settings.theme = "light";  خطأ في TypeScript، ووقت التشغيل مبيتغيرش`,
          try: R`في component React عندك فيه [[useState]] لـ array أو object، دوّر على [[push]] أو [[splice]] أو تعديل خانة مباشر قبل الـ setter. جرّب التعديل المباشر وشوف الشاشة مش بتتحدث، وبعدين النسخة الجديدة بالـ spread وشوفها بتتحدث.`,
          flag: "script",
          deep: {
            why: R`لما الداتا بتتعدّل من أكتر من مكان، مبقاش فيه حد يقدر يقولك قيمتها إيه في لحظة معينة من غير ما يتتبع كل اللي لمسها. bugs زي «الكارت اتغير لوحده» سببها غالبًا array متشاركة: حد اتعمل له نسخة من المرجع مش من الداتا، وعدّل فيها. ومع immutability، عشان تعرف الداتا اتغيرت، بتقارن المرجع بس ([[prev !== next]])، وده اللي React و Zustand و Redux مبنيين عليه.`,
            how: R`الـ objects والـ arrays في JavaScript بتتنقل بالمرجع: [[const b = a]] مش نسخة، ده اسم تاني لنفس الحاجة في الذاكرة، وأي تعديل من [[b]] بيبان في [[a]].

الـ spread ([[...]]) بيعمل shallow copy: المستوى الأول بس جديد. لو جوه الـ object فيه object تاني، النسخة والأصل لسه متشاركين فيه. عشان كده لما تعدّل حاجة عميقة، تنسخ كل مستوى في الطريق: [[{ ...user, address: { ...user.address, city: 'Cairo' } }]]. ولو عايز نسخة عميقة كاملة: [[structuredClone(obj)]] (موجودة في Node والمتصفحات).

الدوال اللي بتعدّل الأصل ([[push]] و [[pop]] و [[splice]] و [[sort]] و [[reverse]]) ليها بدايل بترجع array جديدة: spread، و [[filter]]، و [[toSorted]] و [[toReversed]] و [[toSpliced]] و [[with(index, value)]] (من ES2023).

و [[const]] مش immutability: بيمنع إنك تربط الاسم بقيمة تانية، بس المحتوى يتعدّل عادي. اللي بيمنع التعديل: [[readonly]] و [[Readonly<T>]] و [[as const]] في TypeScript (وقت الكتابة بس)، و [[Object.freeze]] وقت التشغيل (وبرضه shallow). وفي ملفات ES modules (أو strict mode) الكتابة على object متجمّد بترمي [[TypeError]]، وفي غيرها بتتجاهل بسكوت.`,
            when: "الـ state في React أو أي store. الداتا اللي بتتشارك بين دوال أو modules. الإعدادات. وأي دالة بتاخد array أو object: متعدّلش الـ input بتاعها.",
            mistakes: R`[[items.sort()]] على array جاية من props أو state: بتعدّل الأصل، والـ UI يا مبيتحدثش يا بيتحدث غلط. و [[const]] وتفتكر الـ object بقى ثابت. و spread مستوى واحد وانت بتعدّل حاجة عميقة، فتعدّل في الأصل من غير ما تاخد بالك. ومش لازم كل حاجة immutable: متغير محلي جوه دالة بتبني فيه array بـ [[push]] وترجّعه في الآخر ده تمام، محدش تاني شايفه.`
          },
          teach: R`## الفكرة

المثال كارت مشتريات: بدل ما نعدّل الكارت نفسه، كل تغيير بيعمل نسخة جديدة والأصل يفضل زي ما هو. هنشوف الأول المشكلة اللي بتحصل لما نعدّل object متشارك، وبعدين نفك الـ spread و [[readonly]] و [[toSorted]] و [[Object.freeze]]. اتشغّل بـ [[npx tsx]] و [[node]] على Node 24.19، والأخطاء من [[tsc --strict]] (TypeScript 7.0)، والحل بـ React 19.3 في jsdom، على ويندوز.

---

## ١. المشكلة: اسمين لنفس الـ object

~~~text demo.mjs
const cart = { items: ["book"] };
const alias = cart;
alias.items.push("pen");
console.log("shared:", cart.items);
~~~

~~~text الناتج
shared: [ 'book', 'pen' ]
~~~

[[alias = cart]] مش بتنسخ: الاتنين بيشاوروا على **نفس** الـ object في الذاكرة (reference). فالتعديل من [[alias]] ظهر في [[cart]]. في مشروع حقيقي الاسمين بيبقوا في ملفين مختلفين، ومحدش يعرف مين غيّر إيه.

---

## ٢. النوع: [[readonly]]

~~~text main.ts
type Cart = { readonly items: readonly string[]; readonly coupon?: string };
~~~

- [[readonly items]]: مينفعش تحط array تانية مكان [[items]].
- [[readonly string[]]]: والـ array نفسها مينفعش تتعدّل: TypeScript بيشيل منها [[push]] و [[sort]] وأخواتهم.
- [[coupon?]]: الـ [[?]] معناها الخانة اختيارية.

لو حاولت تعدّل:

~~~text الناتج: npx tsc --noEmit --strict
im1.ts(3,12): error TS2339: Property 'push' does not exist on type 'readonly string[]'.
im1.ts(4,6): error TS2540: Cannot assign to 'coupon' because it is a read-only property.
~~~

ده فحص وقت الكتابة بس: [[readonly]] بتتمسح مع باقي الأنواع، ومبتحميش حاجة وقت التشغيل.

---

## ٣. نسخة جديدة بالـ spread

~~~text main.ts
const withPen: Cart = { ...cart, items: [...cart.items, "pen"] };
const withCoupon: Cart = { ...withPen, coupon: "SAVE10" };
~~~

الـ [[...]] اسمها spread، يعني «افرد اللي جوه هنا»:

- [[{ ...cart, ... }]]: object جديد، فيه كل خانات [[cart]]، وبعدين أي خانة مكتوبة بعدها بتكسب. فـ [[items]] اتبدلت.
- [[[...cart.items, "pen"]]]: array جديدة فيها عناصر القديمة وبعدها [["pen"]].
- [[withCoupon]]: نسخة من [[withPen]] بخانة زيادة. لا [[cart]] ولا [[withPen]] اتلمسوا.

بس خد بالك: الـ spread بينسخ **أول مستوى** بس (shallow copy):

~~~text الناتج: copy = { ...cart } ثم copy === cart, copy.items === cart.items
false true
~~~

الـ object جديد ([[false]])، بس [[items]] جواه لسه نفس الـ array ([[true]]). عشان كده المثال بيعمل array جديدة لـ [[items]] كمان.

---

## ٤. [[toSorted]] مش [[sort]]

~~~text الناتج: arr.toSorted() ثم arr.sort()
[ 'pen', 'book' ] [ 'book', 'pen' ]
[ 'book', 'pen' ]
~~~

[[toSorted]] (من ES2023) رجّعت array جديدة مترتبة والأصل زي ما هو. و [[sort]] رتّبت الأصل نفسه. ونفس الحكاية: [[toReversed]] بدل [[reverse]]، و [[toSpliced]] بدل [[splice]].

~~~text الناتج: npx tsx main.ts
[ 'book' ] [ 'book', 'pen' ] SAVE10 [ 'book', 'pen' ]
~~~

الأصل لسه فيه [[book]] بس، وكل نسخة فيها التغيير بتاعها.

---

## ٥. [[Object.freeze]]: حماية وقت التشغيل

~~~text main.ts
const settings = Object.freeze({ theme: "dark" });
~~~

TypeScript بيعلّم على الكتابة ([[TS2540]] زي فوق)، ولو الكود اتشغّل برضه في ES module:

~~~text الناتج: node demo.mjs
TypeError: Cannot assign to read only property 'theme' of object '#<Object>'
~~~

ملفات الـ ES modules بتشتغل strict mode، فالكتابة على object متجمّد بترمي خطأ. وفي سكربت عادي مش strict بتتجاهل بسكوت. و [[freeze]] كمان shallow: object جوه object مبيتجمّدش.

---

## ٦. حل التمرين: React

React بيقارن الـ state القديم بالجديد بـ [[Object.is]] (نفس المرجع؟). لو نفس المرجع، مبيرسمش.

~~~text Todos.tsx
function addWrong(text: string) {
  todos.push({ id: Date.now(), text, done: false });
  setTodos(todos);
}
~~~

[[push]] عدّل نفس الـ array، و [[setTodos(todos)]] بعت نفس المرجع، فـ React شاف «مفيش تغيير».

~~~text Todos.tsx
setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
setTodos((prev) => prev.filter((t) => t.id !== id));
~~~

- [[(prev) => ...]]: بنبعت لـ [[setTodos]] دالة بتاخد الـ state الحالي وترجّع الجديد.
- إضافة: array جديدة بالـ spread.
- تعديل: [[map]] بترجّع array جديدة، والعنصر اللي اتغير بس بياخد object جديد.
- مسح: [[filter]] بترجّع array جديدة من غيره.

رسمنا الـ component في jsdom (متصفح وهمي في Node) وضغطنا الزراير:

~~~text الناتج
start: 1 todos
after add (wrong): 1 todos
after add: 3 todos
after remove: 2 todos
~~~

بعد [[add (wrong)]] الشاشة فضلت [[1]] مع إن الـ array فيها ٢. وبعد [[add]] الصح بقت [[3]]، لأن العنصر اللي اتعمله push من قبل كان موجود وظهر مع أول render. ده اللي بيخلي الـ bug ده صعب: الداتا بتظهر متأخرة مع زرار ملوش علاقة.

---

## الخلاصة

| بيعدّل الأصل | البديل اللي بيرجّع نسخة |
|---|---|
| [[obj.x = 1]] | [[{ ...obj, x: 1 }]] |
| [[arr.push(v)]] | [[[...arr, v]]] |
| [[arr.sort()]] | [[arr.toSorted()]] |
| [[arr.splice(i, 1)]] | [[arr.filter(...)]] أو [[arr.toSpliced(i, 1)]] |

- [[const]] مش immutability: بيمنع تغيير الاسم بس، مش المحتوى.
- [[readonly]] وقت الكتابة، و [[Object.freeze]] وقت التشغيل، والاتنين shallow.
- React بيقارن بالمرجع: لازم state جديد عشان يرسم.`,
          lines: [
            "[[readonly]] بيخلي TypeScript يمنع أي تعديل على الخانات والـ array نفسها ([[push]] مش موجودة على array متعلّم readonly).",
            "الكارت الأصلي.",
            "نسخة جديدة: كل الخانات زي ما هي ([[...cart]])، والـ items array جديدة فيها القديم و pen.",
            "نسخة من النسخة بكوبون. الأصل والنسخة اللي قبلها زي ما هم.",
            "[[toSorted]] بترجع array جديدة مترتبة، عكس [[sort]] اللي بترتّب الأصل نفسه.",
            "الأصل لسه فيه book بس.",
            "[[Object.freeze]] بيقفل الـ object وقت التشغيل كمان، مش بس في TypeScript."
          ],
          sol: R`شغّلت الحل في jsdom، وده اللي حصل بالظبط: البداية [[1 todos]]، وبعد زرار [[add (wrong)]] فضلت [[1 todos]]. الـ push عدّل الـ array، بس [[setTodos(todos)]] بعت نفس المرجع، و React بيقارن بـ [[Object.is]] فشاف إن مفيش تغيير ومرسمش. وبعد زرار [[add]] الصح الشاشة بقت [[3 todos]] مش ٢! لأن العنصر اللي اتعمله push كان موجود فعلًا في الـ array، وظهر مع أول render جه بعده.

ده اللي بيخلي الـ bug ده مرعب في مشروع حقيقي: الداتا بتظهر «متأخرة» مع ضغطة زرار ملهاش علاقة، فتدوّر على المشكلة في المكان الغلط. والحل نسخة جديدة دايمًا: [[setTodos(prev => [...prev, item])]] للإضافة، و [[map]] مع [[{ ...t, done: !t.done }]] للتعديل، و [[filter]] للمسح، و [[toSorted]] بدل [[sort]].

وخد بالك إن الـ spread بينسخ أول مستوى بس: لو عدّلت [[t.address.city]] مباشرة لسه بتعدّل الأصل. ولو عملت [[prev.push]] جوه [[setTodos(prev => ...)]]، الـ StrictMode في التطوير بيشغّل الـ updater مرتين فالعنصر يتضاف مرتين: دي علامة إنك بتعدّل مش بتنسخ.`,
          solCode: R`import { useState } from "react";

type Todo = { id: number; text: string; done: boolean };

export function Todos() {
  const [todos, setTodos] = useState<Todo[]>([{ id: 1, text: "buy milk", done: false }]);

  // غلط: بيعدّل نفس الـ array، و React بيقارن بـ Object.is فبيلاقيه هو هو ومش بيرسم
  function addWrong(text: string) {
    todos.push({ id: Date.now(), text, done: false });
    setTodos(todos);
  }

  // صح: array جديدة، ولو بتعدّل عنصر: object جديد للعنصر ده بس
  function add(text: string) {
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
  }
  function toggle(id: number) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }
  function remove(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <>
      <p>{todos.length} todos</p>
      <button id="wrong" onClick={() => addWrong("pen")}>add (wrong)</button>
      <button id="right" onClick={() => add("pen")}>add</button>
      <button id="toggle" onClick={() => toggle(1)}>toggle</button>
      <button id="remove" onClick={() => remove(1)}>remove</button>
    </>
  );
}`
        },
        {
          cmd: "pure functions",
          title: "الحسبة لوحدها، والداتابيز والشبكة على الأطراف",
          desc: R`الـ pure function بترجع نفس النتيجة لنفس المدخلات، ومبتعملش أي side effect: مبتقراش داتابيز، ولا بتكتب ملف، ولا بتعدّل متغير برّاها، ولا بتعتمد على [[Date.now()]] أو [[Math.random()]].

الفكرة العملية اسمها functional core, imperative shell: قواعد البيزنس في دوال pure سهل تفهمها وتختبرها، والـ I/O في طبقة رفيعة برّا بتجيب الداتا، وتنادي الدوال الـ pure، وتحفظ أو تبعت النتيجة.`,
          example: R`type Sale = { amount: number; refunded: boolean };

// core: pure. مفيش I/O ولا وقت ولا random، ومبتعدّلش المدخلات
const netRevenue = (sales: readonly Sale[]): number =>
  sales.filter((s) => !s.refunded).map((s) => s.amount).reduce((sum, a) => sum + a, 0);

// shell: بيجيب ويبعت بس، ومفيهوش أي قرار
async function dailyReport(load: () => Promise<Sale[]>, send: (msg: string) => void) {
  const sales = await load();
  send($__btRevenue today: $__{netRevenue(sales)}$__bt);
}

const fakeLoad = async () => [
  { amount: 10, refunded: false },
  { amount: 5, refunded: true },
];
dailyReport(fakeLoad, console.log); // Revenue today: 10`,
          try: R`اختار دالة في مشروعك فيها حسبة و [[await prisma...]] أو [[fetch]] في نفس المكان. اطلّع الحسبة لدالة pure بتاخد الداتا كـ parameter، واكتب لها اختبار vitest من غير أي mock. قارن بصعوبة اختبار الدالة الأصلية.`,
          flag: "script",
          deep: {
            why: R`الدالة اللي بتحسب وبتكلم الداتابيز في نفس الوقت مينفعش تختبرها غير لو عندك داتابيز أو mocks كتير. ولو فيها [[new Date()]]، نتيجتها بتتغير كل يوم، فالاختبار ينجح النهارده ويقع بكرة. الـ pure function بتختبرها بسطر: مدخلات ونتيجة متوقعة. ولما يحصل bug، بتكرره بنفس المدخلات بالظبط.`,
            how: R`الـ side effect أي حاجة الدالة بتعملها غير إنها ترجع قيمة: تكتب في داتابيز أو ملف، أو تبعت request، أو تطبع، أو تعدّل parameter أو متغير global، أو تقرا حاجة بتتغير لوحدها (الوقت، و random، و env).

الـ pure function ليها صفتين: deterministic (نفس المدخلات نفس النتيجة دايمًا)، ومفيش side effects. والنتيجة إنك تقدر تناديها أي عدد مرات، أو تحفظ نتيجتها (memoization)، أو تشغّلها بالتوازي من غير قلق.

البرنامج من غير side effects ملوش لازمة، فالهدف مش إنك تلغيها، الهدف إنك تزقها للأطراف. الترتيب: هات الداتا (I/O)، احسب (pure)، احفظ أو ابعت (I/O). والقرارات كلها في الجزء الـ pure.

الوقت و random: خدهم كـ parameter ([[now = Date.now()]]) بدل ما تقراهم جوه الدالة. في الإنتاج بياخد القيمة الافتراضية، وفي الاختبار بتبعت وقت ثابت.

والـ pipeline ([[filter]] ثم [[map]] ثم [[reduce]]) أسلوب functional: كل خطوة دالة صغيرة بترجع نسخة جديدة، والسلسلة بتتقري زي وصف للي عايزه. بس لو الـ array ضخمة جدًا، كل خطوة بتعمل array مؤقتة، فساعتها loop واحد أسرع (قيس الأول، تاب DSA).`,
            when: "حسابات الأسعار والخصومات والضرايب، والتحقق من الصلاحيات، وتحويل الداتا (من شكل الداتابيز لشكل الـ API)، و reducers في React. أي منطق بيزنس.",
            mistakes: R`دالة شكلها pure بس بتعدّل الـ input ([[items.sort()]] جوه دالة حسبة)، فاللي نادى عليها اتغيرت الداتا عنده. و [[Date.now()]] مستخبية جوه حسبة، فالاختبارات بتقع في آخر الشهر بس. وفي React، الـ render نفسه لازم يبقى pure (مفيش fetch ولا تعديل state جواه)، والـ side effects مكانها event handlers و [[useEffect]]، و StrictMode بيعمل render مرتين في التطوير عشان يكشف ده.`
          },
          teach: R`## الفكرة

المثال تقرير مبيعات يومي متقسّم جزئين: **core** (الحسبة، pure) و **shell** (اللي بيجيب الداتا ويبعت النتيجة). هنفك الاتنين، ونشوف الـ pipeline خطوة خطوة، وبعدين نشغّل اختبارات الحل من غير أي mock. اتشغّل بـ [[npx tsx]] على Node 24.19 و Vitest 5.0 على ويندوز.

---

## ١. يعني إيه pure؟

دالة pure ليها شرطين: نفس المدخلات بتطلّع نفس النتيجة دايمًا، ومبتغيّرش أي حاجة برّاها. دي دالة **مش** pure:

~~~text demo.ts
let calls = 0;
const impure = (x: number) => x + (++calls);
console.log(impure(1), impure(1));
~~~

~~~text الناتج
2 3
~~~

نفس المدخل [[1]] طلّع نتيجتين، لأنها بتقرا وبتعدّل متغير برّاها ([[++calls]] بتزوّد واحد قبل ما تستخدمه). ونفس المشكلة مع [[Date.now()]] و [[Math.random()]] وقراية داتابيز: النتيجة بتتغير من غير ما المدخلات تتغير.

---

## ٢. الـ core: [[netRevenue]]

~~~text main.ts
type Sale = { amount: number; refunded: boolean };

const netRevenue = (sales: readonly Sale[]): number =>
  sales.filter((s) => !s.refunded).map((s) => s.amount).reduce((sum, a) => sum + a, 0);
~~~

- [[readonly Sale[]]]: الدالة مسموحلها تقرا الـ array بس، مش تعدّلها. لو حد حاول [[sales.push]] جواها، [[tsc]] هيعترض.
- السطر التاني pipeline (سلسلة): كل خطوة بترجّع حاجة جديدة والخطوة اللي بعدها بتشتغل عليها. نشغّلها خطوة خطوة على البيعتين:

| الخطوة | بتعمل إيه | الناتج |
|---|---|---|
| [[filter((s) => !s.refunded)]] | تسيب البيعات اللي **مش** مرتجعة | [[[ { amount: 10, refunded: false } ]]] |
| [[map((s) => s.amount)]] | تحوّل كل بيعة لمبلغها بس | [[[ 10 ]]] |
| [[reduce((sum, a) => sum + a, 0)]] | تجمع المبالغ بداية من صفر | [[10]] |

مفيش داتابيز ولا وقت ولا طباعة: array داخلة ورقم طالع.

---

## ٣. الـ shell: [[dailyReport]]

~~~text main.ts
async function dailyReport(load: () => Promise<Sale[]>, send: (msg: string) => void) {
  const sales = await load();
  send($__btRevenue today: $__{netRevenue(sales)}$__bt);
}
~~~

- [[load: () => Promise<Sale[]>]]: parameter نوعه دالة من غير مدخلات بترجّع [[Promise]] فيه array مبيعات. في الإنتاج دي query على الداتابيز.
- [[send: (msg: string) => void]]: دالة بتاخد نص ومبترجّعش حاجة. في الإنتاج دي إيميل أو رسالة Slack.
- [[await load()]]: استنى الداتا (I/O).
- [[$__bt...$__{...}$__bt]] (template string): نص فيه قيمة محسوبة جواه. هنا بننادي الحسبة الـ pure.

مفيش أي قرار في الـ shell: هات، احسب بالـ core، ابعت. وعشان [[load]] و [[send]] جايين من برّه، نقدر نبدّلهم في التجربة:

~~~text main.ts
const fakeLoad = async () => [
  { amount: 10, refunded: false },
  { amount: 5, refunded: true },
];
dailyReport(fakeLoad, console.log);
~~~

[[async () => [...]]] دالة بترجّع [[Promise]] جاهز بالداتا، و [[console.log]] مكان الإيميل.

~~~text الناتج: npx tsx main.ts
Revenue today: 10
~~~

الـ ٥ المرتجعة اتشالت، فالصافي ١٠.

---

## ٤. حل التمرين: [[invoiceTotal]]

~~~text invoice.ts
export function invoiceTotal(lines: readonly Line[], customer: Customer): number {
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const discount = customer.isVip && subtotal >= 1000 ? subtotal * 0.1 : 0;
  return subtotal - discount;
}
~~~

- بتاخد اللي محتاجاه بس ([[lines]] و [[customer]])، مش الـ order كله زي ما Prisma رجّعه.
- [[customer.isVip && subtotal >= 1000 ? ... : 0]]: لو VIP **و** الإجمالي ١٠٠٠ أو أكتر، الخصم ١٠٪، غير كده صفر.
- والـ shell ([[invoiceForOrder]]) متعلّق في الحل: سطر يجيب الـ order من الداتابيز، وسطر ينادي [[invoiceTotal]].

الاختبارات بتبعت داتا في سطر وتقارن رقم:

~~~text الناتج: npx vitest run --reporter=verbose
 ✓ pure/invoice.test.ts > no discount for normal customers 1ms
 ✓ pure/invoice.test.ts > 10% for VIP from 1000 0ms
 ✓ pure/invoice.test.ts > no VIP discount under 1000 0ms
      Tests  3 passed (3)
~~~

| الاختبار | الحسبة | المتوقع |
|---|---|---|
| عميل عادي | ٦٠٠ × ٢ = ١٢٠٠، مفيش خصم | [[1200]] |
| VIP على ١٠٠٠ | ٥٠٠ × ٢ = ١٠٠٠، ناقص ١٠٪ | [[900]] |
| VIP تحت ١٠٠٠ | ٩٩٩، تحت الحد | [[999]] |

مفيش [[vi.mock]] ولا داتابيز ولا [[await]]، والاختبار التالت بيمسك الحد بالظبط ([[>=]] مش [[>]]).

---

## الخلاصة

- pure: نفس المدخلات نفس النتيجة، ومفيش side effects.
- القرارات والحسبة في الـ core، والـ I/O في shell رفيع: هات، احسب، ابعت.
- الوقت والـ random يدخلوا parameters، عشان الدالة تفضل pure وسهلة الاختبار.
- الـ core بيتختبر من غير mocks، والـ shell باختبار integration واحد.`,
          lines: [
            "شكل البيعة.",
            "دالة pure: بتاخد array وترجع رقم. [[readonly]] بيضمن إنها مش هتعدّل فيها.",
            "pipeline: شيل المرتجع، وخد المبالغ، واجمعهم. filter و map كل واحدة بترجع array جديدة، و reduce بترجع الرقم النهائي.",
            "الـ shell: الدالة اللي بتكلم العالم. الـ load والـ send جايين من برا، فتقدر تبدّلهم.",
            "I/O: هات الداتا.",
            "نادِ الحسبة الـ pure، وابعت النتيجة (I/O تاني).",
            "قفلة.",
            "بدل الداتابيز في التجربة: دالة بترجع داتا ثابتة.",
            "بيعة عادية.",
            "بيعة اترجعت.",
            "قفلة.",
            "شغّل التقرير، و [[console.log]] مكان الإيميل. بيطبع [[Revenue today: 10]]."
          ],
          sol: R`الـ ٣ اختبارات خضرا، ومن غير [[vi.mock]] ولا داتابيز ولا [[await]]: بتبعت array و object وتقارن رقم. قارن ده باختبار الدالة الأصلية: كنت محتاج mock لـ [[prisma.order.findUnique]] يرجّع شكل الـ include بالظبط، ولو حد غيّر الـ query (زوّد [[select]] مثلًا) الاختبار يقع مع إن الحسبة سليمة.

والـ shell اللي فضل ([[invoiceForOrder]]) سطرين: يجيب ويبعت للدالة. ده مش محتاج unit test، بيتغطى باختبار integration واحد على داتابيز حقيقية (درس «هرم الاختبارات»).

علامة إن الفصل ناقص: الدالة الـ pure لسه بتنادي [[new Date()]] أو [[Math.random()]] أو بتعدّل الـ array اللي داخلالها. الوقت يدخل parameter ([[now: Date]]) وكذلك الـ random. والغلط التاني إنك تبعت الـ order كله زي ما Prisma رجّعه: ابعت اللي الدالة محتاجاه بس ([[lines]] و [[customer]])، فالأنواع تبقى صغيرة والاختبار يبني الداتا في سطر.`,
          solCode: R`// invoice.ts
export type Line = { price: number; qty: number };
export type Customer = { isVip: boolean };

// قبل: async function invoiceTotal(orderId) { const order = await prisma.order.findUnique(...); ...حسبة...; }
// بعد: الحسبة pure، والـ I/O برا
export function invoiceTotal(lines: readonly Line[], customer: Customer): number {
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const discount = customer.isVip && subtotal >= 1000 ? subtotal * 0.1 : 0;
  return subtotal - discount;
}

// الـ shell: سطرين، ومفيهوش قرار
// export async function invoiceForOrder(id: string) {
//   const order = await prisma.order.findUniqueOrThrow({ where: { id }, include: { lines: true, customer: true } });
//   return invoiceTotal(order.lines, order.customer);
// }

// invoice.test.ts
import { it, expect } from "vitest";
import { invoiceTotal } from "./invoice";

it("no discount for normal customers", () => {
  expect(invoiceTotal([{ price: 600, qty: 2 }], { isVip: false })).toBe(1200);
});
it("10% for VIP from 1000", () => {
  expect(invoiceTotal([{ price: 500, qty: 2 }], { isVip: true })).toBe(900);
});
it("no VIP discount under 1000", () => {
  expect(invoiceTotal([{ price: 999, qty: 1 }], { isVip: true })).toBe(999);
});`
        }
      ]
    },
    {
      t: "Code smells",
      l: 1,
      n: "علامات إن الكود محتاج refactoring، وأمثلة حقيقية من مشاريع اتبنت بسرعة",
      items: [
        {
          cmd: "code smells",
          title: "علامات إن الكود محتاج يتصلّح",
          desc: R`الـ code smell علامة مش bug: الكود شغال، بس شكله بيقول إن تعديله هيبقى صعب. أشهرهم: دالة طويلة، وكود متكرر، و parameters كتير، و boolean بيقلب سلوك الدالة، و god object، وأرقام من غير أسماء، وكود ميت محدش بيناديه.

المثال بيصلّح اتنين مع بعض: ٥ parameters ورا بعض (سهل تبدّل اتنين من نفس النوع ومحدش ياخد باله) بقوا object بأسماء، والـ boolean اللي كان بيقلب الدالة بقى دالة تانية باسمها.`,
          example: R`// قبل: 5 parameters ورا بعض، وآخرهم boolean محدش فاهمه من برا
// createUser("you@example.com", "Ali", "0100", 30, true);  الاسم والإيميل متبدّلين، و true دي إيه؟

type NewUser = { name: string; email: string; phone?: string };

function createUser({ name, email, phone = "" }: NewUser) {
  return { id: crypto.randomUUID(), name, email, phone, role: "member" as const };
}
function createAdmin(user: NewUser) {
  return { ...createUser(user), role: "admin" as const };
}

const admin = createAdmin({ email: "you@example.com", name: "Ali" });
console.log(admin.name, admin.role); // Ali admin`,
          try: R`دوّر في مشروعك على دالة بتاخد ٤ parameters أو أكتر، أو نداء فيه [[true]] أو [[false]] أو [[undefined, undefined]]. حوّلها لـ object parameter (أو لدالتين لو الـ boolean بيقسمها نصين)، وسيب TypeScript يدلّك على كل الأماكن اللي محتاجة تتغير.`,
          flag: "script",
          deep: {
            why: R`الـ smells بتدّيك لغة ومقياس. بدل «الكود ده وحش»، تقول «الدالة دي بتاخد ٦ parameters وفيها flag»، ودي حاجة محددة ليها علاج معروف. ومهمة في الـ code review، وفي الانترفيو لما يدّيك كود ويقولك «إيه رأيك فيه؟».`,
            how: R`أشهر الـ smells وعلاجها (من كتاب Refactoring):

دالة طويلة: Extract Function (درس «small functions»).
كود متكرر: دالة واحدة من تالت مرة (درس DRY).
parameters كتير: Parameter Object زي المثال. ولو نفس المجموعة بتتنقل مع بعض في كل مكان ([[lat, lng]] أو [[startDate, endDate]])، دي data clump، اعملها نوع لوحدها.
flag argument ([[render(true)]]): لو بيختار بين سلوكين مختلفين، دالتين بأسماء. ولو بيعدّل تفصيلة، options بأسماء ([[listUsers({ includeDeleted: true })]]). ولو الاختيار بيتحدد وقت التشغيل، union ([[format: 'csv' | 'json']]) وجدول من القيمة للدالة، وده strategy في أبسط شكل (المستوى ٢، درس «over-engineering»).
booleans متعارضة ([[isLoading]] و [[isError]] و [[isSuccess]] مع بعض): حالة واحدة [[status: 'loading' | 'error' | 'success']]، فالتركيبات المستحيلة تبقى مستحيلة في النوع نفسه.
god object: قسّمه على المسؤولية (الدرس الجاي).
primitive obsession: كل حاجة string و number، فـ [[userId]] و [[orderId]] ممكن يتبدّلوا. العلاج أنواع أدق (تاب TypeScript).
feature envy: دالة بتقرا من object تاني أكتر من نفسها: انقلها جنب الداتا.
shotgun surgery: تغيير صغير محتاج تعدّل ١٠ ملفات: المعلومة متفرقة، لمّها.
dead code: دوال و exports محدش بيناديها: امسحها (Git فاكرها)، وأداة زي knip بتلاقيها.

ولما تفك الـ object في الـ parameters ([[{ name, email }: NewUser]])، TypeScript بيتأكد إن الخانات المطلوبة موجودة، وإن مفيش خانة غلط لو بتبعت object literal مباشرة.`,
            when: "في الـ code review، وقبل ما تضيف ميزة في كود قديم (نضّف الحتة اللي هتشتغل فيها الأول)، ولما حاجة بسيطة تاخد وقت أطول من المتوقع لأن «الكود معقد».",
            mistakes: R`تعامل الـ smell كقانون: مش كل دالة ٣٠ سطر محتاجة تتقسم، ومش كل boolean parameter غلط ([[force = false]] بقيمة افتراضية في job مقبول لحد ما يتضاف تاني وتالت). الـ smell سؤال: «ده بيصعّب التغيير هنا؟». وتقسّم لدالتين وتنسخ الكود المشترك فيهم، والصح إن واحدة تبني على التانية زي [[createAdmin]]. وrefactoring ضخم لكل الـ smells في نفس PR فيه ميزة جديدة، فالمراجعة تبقى مستحيلة: الـ refactoring في PR لوحده ومعاه اختبارات.`
          },
          teach: R`## الفكرة

المثال بيصلّح smell-ين مع بعض: دالة بـ ٥ parameters ورا بعض، وآخرهم [[true]] بيقلب سلوكها. هنشوف الأول الغلطة اللي الشكل القديم بيسمح بيها، وبعدين نفك النسخة الجديدة. اتشغّل بـ [[npx tsx]] على Node 24.19، والأخطاء من [[tsc --strict]] (TypeScript 7.0) على ويندوز.

---

## ١. الـ smell: parameters ورا بعض

~~~text قبل
createUser("you@example.com", "Ali", "0100", 30, true);
~~~

الدالة القديمة كانت [[createUser(name, email, phone, age, isAdmin)]]. النداء ده بعت الإيميل مكان الاسم والاسم مكان الإيميل، والاتنين [[string]]، فـ TypeScript مش هيعترض:

~~~text الناتج
{ name: 'you@example.com', email: 'Ali' }
~~~

اليوزر اتسجّل باسم هو إيميله. و [[true]] في الآخر محدش يعرف معناها من غير ما يفتح الدالة.

---

## ٢. Parameter Object

~~~text main.ts
type NewUser = { name: string; email: string; phone?: string };

function createUser({ name, email, phone = "" }: NewUser) {
  return { id: crypto.randomUUID(), name, email, phone, role: "member" as const };
}
~~~

- [[type NewUser]]: كل الـ parameters بقوا خانات بأسماء في نوع واحد. و [[phone?]] اختياري، فمش محتاج تبعت [[undefined]] في النص.
- [[{ name, email, phone = "" }: NewUser]]: الدالة بتاخد object واحد وبتفكّه (destructuring) في متغيرات. و [[phone = ""]] قيمة افتراضية لو التليفون مش موجود.
- [[crypto.randomUUID()]]: بيعمل id عشوائي فريد (UUID). [[crypto]] موجود في Node والمتصفح من غير import.
- [[{ id, name, email, ... }]]: لما اسم الخانة زي اسم المتغير، بتكتبه مرة واحدة (shorthand).
- [[role: "member" as const]]: من غير [[as const]] النوع كان هيبقى [[string]]. بيها النوع [["member"]] بالظبط.

ودلوقتي لو كتبت اسم خانة غلط:

~~~text الناتج: createUser({ name: "Ali", emial: "x@example.com" })
cs1.ts(11,27): error TS2561: Object literal may only specify known properties, but 'emial' does not exist in type 'NewUser'. Did you mean to write 'email'?
~~~

وتبديل الاسم بالإيميل بقى مستحيل، لأن كل قيمة مكتوب جنبها هي إيه.

---

## ٣. الـ boolean بقى دالة باسمها

~~~text main.ts
function createAdmin(user: NewUser) {
  return { ...createUser(user), role: "admin" as const };
}
~~~

بدل [[createUser(..., true)]]: دالة اسمها بيقول هي بتعمل إيه. وجواها بتبني على [[createUser]] (فمفيش تكرار)، والـ spread [[...]] بيحط كل خانات اليوزر العادي وبعدين [[role]] بتكسب.

~~~text main.ts
const admin = createAdmin({ email: "you@example.com", name: "Ali" });
~~~

لاحظ إن الإيميل مكتوب **قبل** الاسم، والترتيب مبقاش يفرق.

~~~text الناتج: console.log(admin)
{
  id: '22f1d705-8d07-44a6-a8f3-dda0edb4e816',
  name: 'Ali',
  email: 'you@example.com',
  phone: '',
  role: 'admin'
}
~~~

الـ id هيطلع مختلف كل مرة. والتليفون [[""]] (نص فاضي) من القيمة الافتراضية، والمثال بيطبع [[Ali admin]].

---

## ٤. حل التمرين: [[sendEmail]]

القديم: [[sendEmail("you@example.com", "Welcome", "<h1>Hi</h1>", undefined, undefined, true)]]. الجديد:

- نوع [[Email]] فيه [[to]] و [[subject]] و [[body]] مطلوبين، و [[cc?]] و [[replyTo?]] اختياريين.
- الـ [[true]] (يعني HTML) بقت دالتين: [[sendHtml]] و [[sendText]]، وكل واحدة بتحط [[contentType]] بتاعها.

~~~text الناتج: npx tsx sol.ts
text/html undefined
support@example.com
~~~

النداء الأول مبعتش [[cc]] فطلعت [[undefined]] من غير ما نكتب [[undefined]] بإيدنا. والتاني بعت [[replyTo]] بالاسم.

---

## الخلاصة

| الـ smell | العلاج |
|---|---|
| parameters كتير ورا بعض | object بأسماء (Parameter Object) |
| boolean بيقلب الدالة | دالتين بأسماء |
| booleans متعارضة | [[status]] واحد بـ union |
| دالة طويلة | Extract Function |
| كود متكرر | دالة واحدة (DRY) |
| أرقام من غير أسماء | constants |
| كود ميت | امسحه، Git فاكره |

- الـ smell مش bug: الكود شغال، بس تعديله هيبقى صعب.
- بعد ما تغيّر التوقيع، [[tsc --noEmit]] بيطلّعلك كل نداء قديم محتاج يتغير.`,
          lines: [
            "الـ parameters بقت نوع واحد بأسماء، والتليفون اختياري ([[?]]) بدل ما تبعت [[undefined]] في النص.",
            "الدالة بتاخد object وتفكّه، والاختياري ليه قيمة افتراضية.",
            R`بترجّع user عادي. [[as const]] بيخلي النوع [["member"]] بالظبط مش أي string.`,
            "قفلة.",
            "الأدمن دالة لوحده بدل [[createUser(..., true)]]، والنداء نفسه بيقول بيعمل إيه.",
            "بتبني على العادية وبتغيّر الـ role بس، فمفيش كود متكرر.",
            "قفلة.",
            "النداء بالأسماء: الترتيب مبقاش يفرق، ومستحيل تبدّل الاسم بالإيميل.",
            "بيطبع [[Ali admin]]."
          ],
          sol: R`بعد ما تغيّر التوقيع لـ object، شغّل [[tsc --noEmit]]: TypeScript هيطلّع خطأ في كل نداء قديم لسه بيبعت parameters ورا بعض، ودي بالظبط قايمة الأماكن اللي محتاجة تتغير. خلّصها لحد ما تبقى صفر. ولو فيه boolean زي [[isHtml]] بيقسم الدالة نصين، الحل دالتين ([[sendHtml]] و [[sendText]]) زي الحل. الناتج [[text/html undefined]] ثم [[support@example.com]]: الخانات الاختيارية ([[cc]] و [[replyTo]]) بقت بالاسم، ومفيش [[undefined, undefined]].

الغلط الشائع إنك تعمل object parameter بـ type [[any]] أو [[Record<string, unknown>]]: كده خسرت الـ checklist، ونداء فيه [[{ emial: ... }]] بغلطة إملائية هيعدّي. استخدم type مسمّى زي [[Email]]، و TypeScript هيطلّع خطأ على الخانة الغلط.

وفي الانترفيو: «ليه object parameter؟» الإجابة: النداء بيتقري من غير ما تفتح الدالة، والترتيب مبقاش مهم فمينفعش تبدّل الاسم والإيميل، وتقدر تضيف خانة اختيارية من غير ما تكسر ولا نداء قديم.`,
          solCode: R`// قبل: sendEmail("you@example.com", "Welcome", "<h1>Hi</h1>", undefined, undefined, true);
// آخر true دي «html»؟ ولا «urgent»؟ والـ undefined دي إيه؟

type Email = { to: string; subject: string; body: string; cc?: string[]; replyTo?: string };

function sendText(email: Email) {
  return { ...email, contentType: "text/plain" };
}
function sendHtml(email: Email) {
  return { ...email, contentType: "text/html" };
}

const sent = sendHtml({ to: "you@example.com", subject: "Welcome", body: "<h1>Hi</h1>" });
console.log(sent.contentType, sent.cc); // text/html undefined
console.log(sendText({ to: "you@example.com", subject: "Hi", body: "x", replyTo: "support@example.com" }).replyTo);`
        },
        {
          cmd: "god object",
          title: "ملف واحد شايل كل حاجة",
          desc: R`الـ god object (أو god component في React) حاجة واحدة شايلة مسؤوليات كتير ملهاش علاقة ببعض. أي تعديل في أي feature بيعدّي عليها، وكل الناس بتتخانق عليها في الـ merge conflicts، ومحدش فاهمها كلها. العلاج: قسّم على المسؤولية مش على الحجم، فكل feature في hook أو component أو module لوحده، والأب بيجمّعهم.`,
          example: R`import { useState } from "react";

// قبل: الـ checkout فيه 44 useState، منهم 6 للكوبون لوحده
// const [couponCode, setCouponCode] = useState(""); const [couponLoading, ...] ...

type CouponState = { status: "idle" | "loading" | "valid" | "invalid"; discount: number };

export function useCoupon(validate: (code: string) => Promise<number | null>) {
  const [state, setState] = useState<CouponState>({ status: "idle", discount: 0 });
  async function apply(code: string) {
    setState({ status: "loading", discount: 0 });
    const discount = await validate(code);
    setState(discount === null ? { status: "invalid", discount: 0 } : { status: "valid", discount });
  }
  return { ...state, apply };
}

// الأب بقى بيجمّع بس: const coupon = useCoupon(api.validateCoupon); const shipping = useShipping();`,
          try: R`افتح أكبر component عندك واعدّ الـ [[useState]] والـ [[useEffect]]. جمّع اللي بيتغيروا مع بعض (كل حاجة ليها علاقة بالكوبون مثلًا)، واطلّعهم في custom hook لوحده، وشوف الـ component الأصلي خسر كام سطر.`,
          flag: "script",
          deep: {
            why: R`الملف الضخم بيتكوّن تدريجيًا: كل feature جديدة «هنحطها هنا بسرعة». في مشروع حقيقي كانت صفحة الـ checkout component واحد أكتر من ٦٠٠٠ سطر فيه ٤٤ [[useState]] و ٢٦ [[useEffect]]: كوبونات، ومدة اشتراك، وإضافات، وطرق دفع، ورفع إيصال. وفي الـ backend ملف admin service واحد فيه أكتر من ٨٠ دالة لكل جداول المشروع، والاتنين اتنسخوا زي ما هم لمشاريع تانية. أي تعديل بسيط محتاج تفهم آلاف السطور، وأي state ممكن يبوّظ feature تانية، واستحالة تكتب اختبار لحتة واحدة.`,
            how: R`الـ god object عكس Single Responsibility (أول مبدأ في SOLID): كل module يبقى ليه سبب واحد يتغير.

إزاي تقسّم component ضخم: جمّع الـ state اللي بيتغير مع بعض في custom hook زي [[useCoupon]]. واطلّع كل جزء UI بيعرض حاجة واحدة في component لوحده ([[CouponBox]] و [[PaymentMethods]] و [[OrderSummary]]). والحسابات (الإجمالي بعد الخصم) دوال pure برّا الـ component خالص. والأب بيبقى «مايسترو»: بينادي الـ hooks ويوزّع على الأطفال.

ولاحظ في المثال إن ٤ booleans للكوبون (loading و valid و error و ...) بقوا [[status]] واحد، فمستحيل الكوبون يبقى «بيحمّل» و «مرفوض» في نفس الوقت.

وإزاي تقسّم service ضخم: كل feature ليها module ([[users.service]] و [[orders.service]] و [[coupons.service]])، والـ admin routes تنادي الـ services دي بدل ما يبقى ليها service خاص فيه نسخة تانية من كل حاجة.

ومتقسّمش مرة واحدة. كل مرة تلمس الملف عشان feature، اطلّع الحتة اللي بتشتغل فيها بس، ودي اسمها boy scout rule: سيب الكود أنضف شوية من ما لقيته. وقبل ما تقسّم كود حساس زي الـ checkout، اكتب اختبار e2e بيغطي الحالة الأساسية (المستوى ٣، درس «هرم الاختبارات»).`,
            when: "لما الملف يعدّي كام مية سطر وفيه أكتر من feature، أو لما كل PR بيلمس نفس الملف، أو لما تعمل scroll كتير عشان تلاقي الـ state اللي بتدوّر عليها.",
            mistakes: R`تقسّم على الشكل مش المعنى: [[Checkout1.tsx]] و [[Checkout2.tsx]] كل واحد ٣٠٠٠ سطر. وتطلّع hooks بس تسيبها تعتمد على بعض بـ ١٠ parameters. و prop drilling لعمق ٥ مستويات بعد التقسيم، وساعتها context أو store صغير لحالة الـ checkout أحسن (تاب React). وفي الناحية التانية: متعملش ٥٠ ملف لـ feature بسيطة، التقسيم لما يبقى فيه سبب.`
          },
          teach: R`## الفكرة

component الـ checkout كان فيه ٤٤ [[useState]]، منهم ٦ للكوبون بس. المثال بيطلّع كل حاجة الكوبون في custom hook اسمه [[useCoupon]]، والـ checkout يبقى بيجمّع بس. هنفك الـ hook سطر سطر، وبعدين نشغّله فعلًا. اتشغّل بـ React 19.3 جوه jsdom (متصفح وهمي في Node) بـ [[npx tsx]] على Node 24.19، ويندوز.

---

## ١. الحالة كلها في نوع واحد

~~~text useCoupon.ts
type CouponState = { status: "idle" | "loading" | "valid" | "invalid"; discount: number };
~~~

القديم كان فيه booleans منفصلة ([[couponLoading]] و [[couponValid]] و [[couponError]] ...)، ومفيش حاجة تمنع إن اتنين منهم يبقوا [[true]] في نفس الوقت. هنا [[status]] **قيمة واحدة** من ٤:

| [[status]] | معناها |
|---|---|
| [["idle"]] | لسه محدش طبّق كوبون |
| [["loading"]] | بنسأل السيرفر |
| [["valid"]] | مقبول، و [[discount]] فيه الخصم |
| [["invalid"]] | مرفوض |

فالحالة المستحيلة («بيحمّل ومرفوض») بقت مستحيلة في النوع نفسه.

---

## ٢. الـ hook

~~~text useCoupon.ts
export function useCoupon(validate: (code: string) => Promise<number | null>) {
  const [state, setState] = useState<CouponState>({ status: "idle", discount: 0 });
~~~

- custom hook: دالة عادية اسمها بيبدأ بـ [[use]] وبتستخدم hooks تانية جواها. React بيعرفها من الاسم ده.
- [[validate]]: parameter نوعه دالة بتاخد الكود وترجّع [[Promise]] فيه رقم الخصم أو [[null]] لو مرفوض. جاية من برّه، ففي الإنتاج بتبقى API حقيقي، وفي الاختبار دالة وهمية.
- [[useState<CouponState>(...)]]: state واحدة بدل ٦. الـ [[<CouponState>]] بيقول نوعها، والقيمة الأولى [["idle"]] وخصم صفر.

---

## ٣. [[apply]]: الفعل الوحيد

~~~text useCoupon.ts
  async function apply(code: string) {
    setState({ status: "loading", discount: 0 });
    const discount = await validate(code);
    setState(discount === null ? { status: "invalid", discount: 0 } : { status: "valid", discount });
  }
  return { ...state, apply };
}
~~~

1. حالة [["loading"]] (الزرار يتقفل مثلًا).
2. [[await validate(code)]]: استنى رد السيرفر.
3. لو [[null]] يبقى مرفوض، غير كده مقبول بالخصم. و [[{ status: "valid", discount }]] اختصار لـ [[discount: discount]].
4. [[return { ...state, apply }]]: الـ hook بيرجّع [[status]] و [[discount]] (من الـ spread) والفعل [[apply]]. ده كل اللي الـ component محتاج يشوفه.

شغّلنا الـ hook جوه component صغير وسجّلنا الحالة في كل render، بـ [[validate]] وهمية بتقبل [[SAVE50]] بس:

~~~text الناتج
example SAVE50: idle 0 -> loading 0 -> valid 50
example NOPE: idle 0 -> loading 0 -> invalid 0
~~~

كل render بيشوف حالة واحدة واضحة، ومفيش لحظة فيها حالتين مع بعض.

---

## ٤. حل التمرين: الـ hook والـ component

الـ hook في الحل زوّد حاجتين: الكود نفسه بقى state جوه الـ hook ([[code]] و [[setCode]])، و [[validate(code.trim().toUpperCase())]] بتشيل المسافات وتكبّر الحروف قبل ما تسأل.

~~~text Checkout.tsx
const coupon = useCoupon(validateCoupon);
return (
  <form onSubmit={(e) => { e.preventDefault(); coupon.apply(); }}>
    <input value={coupon.code} onChange={(e) => coupon.setCode(e.target.value)} />
    <button disabled={coupon.status === "loading"}>Apply</button>
    {coupon.status === "invalid" && <p role="alert">Invalid coupon</p>}
    <output>Total: {subtotal - coupon.discount}</output>
  </form>
);
~~~

- [[e.preventDefault()]]: يمنع المتصفح يعمل reload للصفحة لما الفورم يتبعت.
- [[value]] و [[onChange]]: الـ input متوصّل بالـ state (controlled input).
- [[disabled={coupon.status === "loading"}]]: الزرار مقفول وقت السؤال، فمحدش يدوس مرتين.
- [[شرط && <p>...]]: لو الشرط [[true]] اعرض الرسالة، غير كده ولا حاجة.
- مفيش ولا [[useState]] للكوبون في الـ component: بيعرض بس.

كتبنا في الـ input ودوسنا Apply، بـ subtotal = ٢٠٠:

~~~text الناتج: الإجمالي | رسالة الخطأ
start | Total: 200 | -
save50 | Total: 150 | -
nope | Total: 200 | Invalid coupon
~~~

[["  save50 "]] بمسافات وحروف صغيرة اتقبل بعد [[trim]] و [[toUpperCase]] والإجمالي بقى ١٥٠. و [["nope"]] اترفض فالخصم رجع صفر وظهرت الرسالة.

---

## الخلاصة

| قبل | بعد |
|---|---|
| ٦ [[useState]] للكوبون في الـ checkout | [[useCoupon]] واحد |
| booleans ممكن تتعارض | [[status]] واحد من ٤ قيم |
| [[fetch]] جوه الـ component | [[validate]] جاية من برّه، فتتبدّل في الاختبار |

- قسّم على المسؤولية مش على الحجم: الـ state اللي بيتغير مع بعض في hook واحد.
- hook واحد [[useCheckout]] فيه كل حاجة ده نقل للـ god object، مش تقسيم.
- قسّم شوية شوية: كل مرة تلمس الملف، اطلّع الحتة اللي بتشتغل فيها.`,
          lines: [
            "من React.",
            "حالة الكوبون كلها في نوع واحد، والـ status قيمة واحدة بدل كذا boolean.",
            "custom hook مسؤول عن الكوبون بس. الـ validate جاية من برا (API حقيقي، أو fake في الاختبار).",
            "state واحدة بدل ٦.",
            "الفعل الوحيد اللي الـ hook بيعرضه.",
            "ابدأ التحميل.",
            "اسأل السيرفر: الكوبون ده بيخصم كام؟",
            "null يعني مرفوض، غير كده مقبول بالخصم.",
            "قفلة apply.",
            "الـ component ياخد الحالة والفعل بس، ومش شايف التفاصيل.",
            "قفلة."
          ],
          sol: R`الـ component الكبير هتلاقي فيه عادةً ٣ أو ٤ مجموعات state بتتغير مع بعض: الكوبون (الكود، والتحميل، والخطأ، والخصم)، والشحن، والدفع. كل مجموعة تبقى custom hook زي [[useCoupon]] في الحل، والـ component يبقى [[const coupon = useCoupon(api.validateCoupon)]] ويعرض بس. جرّبت الـ hook لوحده: [[save50]] بمسافات بترجع [[valid 50]]، و [[nope]] بترجع [[invalid 0]].

التقسيم صح لو الـ hook مش محتاج state من الأب غير اللي بيتبعتله، والـ component مابقاش فيه ولا [[useState]] ليه علاقة بالكوبون. ولو الـ hook محتاج [[setShipping]] من الأب عشان يشتغل، يبقى المجموعتين مش مستقلين فعلًا: يا تدمجهم، يا الـ hook ياخد callback.

الغلط الشائع: hook واحد [[useCheckout]] فيه كل الـ state. ده نقل الـ god object لملف تاني من غير ما يقسمه. ولو الـ hook بيرجّع ١٥ حاجة، يبقى لسه شايل أكتر من مسؤولية.`,
          solCode: R`import { useState } from "react";

type CouponState = { status: "idle" | "loading" | "valid" | "invalid"; discount: number };

// hooks/useCoupon.ts: كل حاجة الكوبون في مكان واحد
export function useCoupon(validate: (code: string) => Promise<number | null>) {
  const [code, setCode] = useState("");
  const [state, setState] = useState<CouponState>({ status: "idle", discount: 0 });
  async function apply() {
    setState({ status: "loading", discount: 0 });
    const discount = await validate(code.trim().toUpperCase());
    setState(discount === null ? { status: "invalid", discount: 0 } : { status: "valid", discount });
  }
  return { code, setCode, ...state, apply };
}

// Checkout.tsx: بيجمّع بس، ومبقاش فيه ولا useState للكوبون
export function Checkout({ subtotal, validateCoupon }: { subtotal: number; validateCoupon: (c: string) => Promise<number | null> }) {
  const coupon = useCoupon(validateCoupon);
  return (
    <form onSubmit={(e) => { e.preventDefault(); coupon.apply(); }}>
      <input value={coupon.code} onChange={(e) => coupon.setCode(e.target.value)} />
      <button disabled={coupon.status === "loading"}>Apply</button>
      {coupon.status === "invalid" && <p role="alert">Invalid coupon</p>}
      <output>Total: {subtotal - coupon.discount}</output>
    </form>
  );
}`
        }
      ]
    }
]);
