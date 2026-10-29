// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "Patterns",
      l: 3,
      n: "module pattern و factory و singleton، و Observer بـ EventEmitter، و immutability، و iterators و generators، و Strategy pattern",
      projects: [
        { lvl: 'صغير', t: R`مولّد IDs محدش يلعب فيه`, what: R`دالة [[createIdGen(prefix)]] (درس الـ module pattern) العدّاد فيها جوه الـ closure، وبترجّع object فيه [[next()]] و [[peek()]] بس. اعملها مرة كـ factory ومرة كـ ES module فيه [[export]] للدالتين بس، وقارن مين فيهم بيدّيك أكتر من عدّاد.`, done: R`[[users.next()]] بيرجّع [[user-1]] وبعدها [[user-2]]، و [[orders.next()]] بيبدأ من [[order-1]] لوحده، و [[peek()]] مبيزوّدش العدّاد، و [[Object.keys(users)]] مفيهاش العدّاد، ومفيش أي طريقة ترجّعه لصفر من برا.` },
        { lvl: 'صغير', t: R`range كامل بالـ generators`, what: R`[[function* range(start, end, step = 1)]] (درس iterators و generators) بتشتغل للخطوات السالبة كمان، وبترمي [[RangeError]] لو الـ step صفر أو عكس الاتجاه، و [[range(0, Infinity)]] مينفعش يقع في loop لما تاخد منه بـ [[take]].`, done: R`[[Array.from(range(5, 0, -1))]] بيرجّع 5 و 4 و 3 و 2 و 1، و [[range(0, 5, 0)]] و [[range(0, 5, -1)]] بيرموا [[RangeError]] أول ما تبدأ تلف عليهم، و [[range(0, Infinity).take(3).toArray()]] بيرجّع 0 و 1 و 2 على طول.` },
        { lvl: 'متوسط', t: R`store صغير زي Zustand`, what: R`[[createStore(initial)]] بيجمع الوحدة كلها: الـ state مخفي جوه closure (module pattern)، و [[subscribe]] و [[emit]] من درس EventEmitter، و [[setState]] بتعمل state جديدة immutable وبتقبل object أو دالة [[(prev) => next]]، و [[Object.freeze]] على كل state جديدة. وجرّبه في ملف [[.mjs]] (strict تلقائي).`, done: R`كل subscriber بياخد [[(next, prev)]] و [[next !== prev]]، و [[setState((s) => ({ count: s.count + 1 }))]] تلات مرات بتوصّل العدد لـ 3، و [[getState().count = 99]] بيرمي [[TypeError]] (عشان الـ freeze والـ strict mode)، ودالة الإلغاء بتوقّف الإشعارات، و [[setState]] بنفس القيم بالظبط مبتبعتش إشعار.` },
        { lvl: 'متوسط', t: R`undo و redo`, what: R`تاريخ للـ state: [[past]] و [[present]] و [[future]] كلهم immutable (درس immutability)، و [[undo()]] و [[redo()]]، وأي تغيير جديد بعد undo بيمسح الـ future. وزوّد [[*history()]] generator بيطلّع كل state من الأقدم للأحدث (درس generators)، و [[on("change")]] لأي حد عايز يعرف (درس EventEmitter).`, done: R`بعد ٣ تغييرات و ٢ undo الـ [[present]] بيبقى أول تغيير، و [[redo()]] بيرجّع التاني، وتغيير جديد بعدها بيخلّي [[redo()]] مبيعملش حاجة، و [[undo()]] على تاريخ فاضي مبيرميش error، و [[Array.from(h.history())]] طوله زي عدد الـ states بالظبط.` },
        { lvl: 'كبير', t: R`قارئ صفحات API متين`, what: R`[[async function* paginate(fetchPage, { pageSize })]] بيلف على API بصفحات (اعمل سيرفر Node صغير على localhost بيرجّع [[{ items, next }]] ومرة من كل ٣ بيرجّع 500). فيه: فحص [[pageSize]] من 1 لـ 100، وretry ٣ مرات بـ backoff (وحدة async)، و [[try/finally]] جوه الـ generator بيطبع «خلصت» حتى لو اللي بيلف عمل [[break]]، و Emitter بيطلّع [[page]] و [[retry]] و [[error]] للّوج، وكل صفحة بتترجع immutable. من وحدة Patterns كلها ووحدة async والأخطاء.`, done: R`[[for await]] على ١٠ صفحات بيجيب كل العناصر من غير تكرار حتى مع الـ 500 العشوائي، واللوج فيه سطر [[retry]] لكل فشل، و [[pageSize: 0]] أو [[pageSize: 500]] بيرمي [[RangeError]] قبل أي request، و [[break]] بعد صفحتين بيطبع «خلصت» ومفيش request تالت في لوج السيرفر، ولو السيرفر مقفول خالص بيطلع error واضح بعد ٣ محاولات بس مش loop.`, ext: R`خليه يقبل [[AbortSignal]] عشان تلغيه من برا، وزوّد cache للصفحات اللي اتجابت، واستخدمه في أداة بتصدّر داتا API حقيقي لـ CSV.` },
        { lvl: 'فكرة', t: R`مكتبتك الصغيرة`, what: R`اختار حاجة بتكرر كتابتها: state، أو events، أو معالجة داتا كتير lazy، أو cache، واعمل لها مكتبة صغيرة بالـ patterns دي: API عام صغير والباقي مخفي، وأحداث، وداتا متتعدّلش من برا، و iterators لو فيه لستة. انت اللي بتحدد الـ API.`, done: R`فيه README فيه مثال استخدام بيشتغل لو نسخته، وتستات بـ [[node --test]] بتعدّي، ومفيش طريقة تغيّر الـ state الداخلي غير من الـ API (جرّبها بنفسك وانت بتحاول تكسرها).`, ext: R`خليها تشتغل في المتصفح و Node، وزوّد types بـ JSDoc أو TypeScript، واستخدمها في مشروع حقيقي من بتوعك بدل الكود المكرر.` },
      ],
      items: [
        {
          cmd: "module pattern و IIFE",
          title: "تعمل state خاص ومتاح بس من دوال معينة",
          desc: R`الـ IIFE دالة بتتعرّف وتتنادي في نفس اللحظة: [[(() => { ... })()]]. قبل الـ ES modules كانت الطريقة الوحيدة تعمل scope خاص في ملف، عشان متغيراتك متتلخبطش مع باقي الـ scripts في الصفحة.

والـ module pattern: IIFE بترجّع object فيه الـ API العام بس، والمتغيرات الداخلية فاضلة في الـ closure، محدش يوصلها. النهاردة ES modules بتعمل ده لوحدها، بس هتشوف الـ pattern في كود قديم، وفي الـ bundles، وفي أسئلة الانترفيو.`,
          example: R`const counter = (() => {
  let count = 0;
  const log = (msg) => console.log($__bt[counter] $__{msg}$__bt);
  return {
    inc() { count++; log(count); return count; },
    reset() { count = 0; log("reset"); },
  };
})();
counter.inc();          // [counter] 1
counter.inc();          // [counter] 2
counter.count;          // undefined: مخفي
// نفس الفكرة بـ ES module: store.js
let items = [];
export const add = (x) => { items = [...items, x]; };
export const getAll = () => items;`,
          try: R`حوّل الـ counter لملف module: المتغير في أول الملف من غير export، والدوال بـ export. وبعدين اعمل import للملف من ملفين مختلفين واتأكد إنهم شايفين نفس الـ count (الـ module بيتنفّذ مرة واحدة).`,
          practice: [
            { lvl: 'سريع', t: R`صلّح الباج: [[const counter = (() => { let count = 0; return { count, inc() { count++; } }; })();]] وبعدين [[counter.inc(); counter.inc(); counter.count]]. اتوقع الناتج الأول، وبعدين صلّحه بـ [[get count() { return count; }]].`, done: R`قبل التصليح [[counter.count]] بيطبع 0 مش 2 (الـ object خد نسخة من الرقم ساعة الـ return)، وبعد الـ getter بيطبع 2، و [[counter.count = 99]] مبيغيّرش العدّاد الحقيقي (في [[.mjs]] بيرمي [[TypeError: Cannot set property count of #<Object> which has only a getter]]، وفي script عادي بيتجاهل ساكت)، وتقدر تقول الفرق ده في جملة لزميل.` },
            { lvl: 'تطبيق', t: R`ابني [[settings]] بالـ module pattern: object داخلي فيه [[theme: "dark"]] و [[lang: "ar"]]، و [[get(key)]] و [[set(key, value)]]، و [[getAll()]] بترجّع نسخة مش الأصل، و [[set]] بترفض أي key مش موجود من الأول، و [[onChange(fn)]] بتتنادى بعد كل [[set]] ناجح.`, done: R`[[const all = settings.getAll(); all.theme = "light";]] وبعدها [[settings.get("theme")]] لسه [["dark"]]، و [[settings.set("color", 1)]] بترمي Error فيه كلمة [[color]]، و [[settings.set("theme", "light")]] بتغيّرها وبتنادي الـ [[onChange]] مرة واحدة بالـ key والقيمة الجديدة.` },
            { lvl: 'تحدي', t: R`قارن واشرح: حوّل الـ counter لـ factory [[createCounter()]] واعمل منه اتنين. وبعدين [[store.mjs]] فيه [[let count = 0]] و [[export const inc = () => ++count]] و [[export const get = () => count]]، وملفين [[a.mjs]] و [[b.mjs]] كل واحد بيعمل import لـ [[inc]] وبيناديها مرة، و [[main.mjs]] بيعمل import للاتنين وبيطبع [[get()]].`, done: R`[[c1.inc(); c1.inc(); c2.inc();]] بيخلّي [[c1]] عند 2 و [[c2]] عند 1 (كل نداء closure جديد)، و [[node main.mjs]] بيطبع 2 مش 1 (الـ module اتنفّذ مرة واحدة والاتنين شايفين نفس [[count]])، وكتبت ٣ سطور لزميل: إمتى singleton وإمتى factory.` },
          ],
          flag: "script",
          deep: {
            why: "encapsulation: الـ state الداخلي متاح بس من دوال محددة، فمحدش يقدر يبوّظه من برّه. ودي فكرة أساسية في أي تصميم، وسؤال انترفيو شائع: «إزاي تعمل private variables في JS؟» (closures، أو #private في classes، أو module scope).",
            how: R`الأقواس حوالين الدالة بتخليها expression، والأقواس اللي بعدها بتناديها. كل المتغيرات جوه بتعيش في الـ closure بتاع الـ methods اللي رجعت.

الـ module pattern ليه عيوب: مينفعش تعمل منه أكتر من instance (لو محتاج كذا واحد، دالة factory زي [[createCounter]] من درس closure)، وصعب تختبره أو تعمل reset للـ state بتاعه.

الـ ES module نفسه singleton بنفس الطريقة: الملف بيتنفّذ مرة واحدة، وأي حد بيعمل import بياخد نفس الـ state. ده اللي بيخلي [[export const prisma = new PrismaClient()]] يشتغل كـ instance واحد في المشروع كله.

الـ bundlers زي Vite لسه بيطلّعوا ملفات فيها IIFEs ساعات، عشان يضمنوا scope منفصل لو الملف اتحمّل كـ script عادي.`,
            when: "في كود جديد: ES module بمتغيرات مش exported. IIFE لو بتكتب script صغير هيتحط في صفحة مباشرة (widget أو bookmarklet) أو محتاج async في مكان مفيهوش top-level await.",
            mistakes: R`تنسى الـ [[;]] قبل سطر بيبدأ بـ [[(]]: السطر اللي قبله هيتنادي كدالة. وتعمل singleton لحاجة محتاجة instances كتير. و state global في module على سيرفر: مشترك بين كل الـ requests وكل اليوزرز.`
          },
          teach: R`## الفكرة في سطر

عايز متغير ([[count]]) محدش يقدر يلمسه غير دالتين بس ([[inc]] و [[reset]]). المثال بيعمل ده بطريقتين: الطريقة القديمة (IIFE بترجّع object)، والطريقة الحديثة (ملف ES module). كل الكود هنا اتشغّل على ويندوز 11 بـ Node 24.19.

---

## ١. الـ IIFE: دالة بتتعرّف وتتنادي في نفس السطر

IIFE اختصار Immediately Invoked Function Expression، يعني «دالة بتتنادي فورًا». شكلها من برّه:

~~~text الهيكل
(() => { ... })()
 ^^^^^^^^^^^^^   ^^
 الدالة نفسها    النداء
~~~

- [[() => { ... }]] دالة arrow عادية من غير اسم.
- القوسين اللي **حواليها** بيخلّوها expression (قيمة)، زي ما [[(2 + 3)]] قيمة.
- القوسين [[()]] اللي **بعدها** بينادوها على طول، زي [[f()]] بالظبط.

ليه لازم القوسين اللي حواليها؟ لو كتبت [[function () { ... }()]] في أول السطر، JavaScript بيفهمها **تعريف** دالة (declaration) مش قيمة، والتعريف لازم له اسم:

~~~text الناتج (Node 24)
function () { return 1; }();
^^^^^^^^

SyntaxError: Function statements require a function name
~~~

### اللي جوه الـ IIFE

~~~text app.js
const counter = (() => {
  let count = 0;
  const log = (msg) => console.log($__bt[counter] $__{msg}$__bt);
  return {
    inc() { count++; log(count); return count; },
    reset() { count = 0; log("reset"); },
  };
})();
~~~

خطوة خطوة:

1. [[let count = 0]]: متغير **جوه** الدالة. أي متغير جوه دالة مش شايفه حد برّه الدالة دي.
2. [[const log = (msg) => ...]]: دالة مساعدة صغيرة بتطبع أي رسالة وقبلها [[[counter]]]. الـ backticks مع [[$__{msg}]] اسمها template literal: بتحط قيمة [[msg]] جوه النص. وهي كمان خاصة، محدش برّه يقدر يناديها.
3. [[return { inc() {...}, reset() {...} }]]: الدالة بترجّع object فيه دالتين. [[inc() { ... }]] اختصار لـ [[inc: function () { ... }]] (اسمه method shorthand).
4. [[inc]]: بتزوّد [[count]] بواحد ([[count++]])، وتطبعه، وترجّعه.
5. [[reset]]: بترجّع [[count]] صفر وتطبع [["reset"]].
6. [[})()]]: قفلة الدالة، وقفلة القوسين اللي حواليها، والنداء. اللي اترجّع (الـ object) بيتحط في [[counter]].

### إزاي [[inc]] لسه شايفة [[count]] والدالة خلصت؟

الدالة الكبيرة اشتغلت مرة واحدة وخلصت. عادةً المتغيرات اللي جواها بتتمسح، بس هنا [[inc]] و [[reset]] لسه بيستخدموا [[count]]، فـ JavaScript بيسيبه عايش معاهم. ده اسمه **closure** (درس «closure» في نفس التاب): الدالة بتفتكر المتغيرات اللي كانت حواليها وقت ما اتعملت.

### التشغيل

ضيف تحت الكود:

~~~text app.js
counter.inc();
counter.inc();
console.log(counter.count);
console.log(Object.keys(counter));
console.log(typeof count);
counter.reset();
console.log(counter.inc());
~~~

~~~text الناتج
[counter] 1
[counter] 2
undefined
[ 'inc', 'reset' ]
undefined
[counter] reset
[counter] 1
1
~~~

| السطر | الناتج | ليه |
|---|---|---|
| [[counter.inc()]] مرتين | [[1]] ثم [[2]] | نفس الـ [[count]] بيزيد |
| [[counter.count]] | [[undefined]] | الـ object مفيهوش خاصية اسمها count |
| [[Object.keys(counter)]] | [['inc', 'reset']] | ده كل اللي ظاهر برّه: الـ API العام |
| [[typeof count]] | [[undefined]] | برّه الـ IIFE مفيش متغير اسمه count أصلًا |
| [[console.log(counter.inc())]] | [[[counter] 1]] وبعده [[1]] | السطر الأول من [[log]] جوه inc، والتاني القيمة اللي inc رجّعتها |

يعني الطريقة الوحيدة تغيّر [[count]] هي [[inc]] و [[reset]]. ده اللي اسمه **encapsulation**.

### الفخ المشهور: [[return { count, inc }]]

عايز تقرا العداد من برّه، فتحط [[count]] في الـ object اللي راجع:

~~~text trap.mjs
const counter = (() => {
  let count = 0;
  return { count, inc() { count++; } };
})();
counter.inc(); counter.inc();
console.log(counter.count);
~~~

~~~text الناتج (Node 24)
0
~~~

مش 2. [[{ count }]] اختصار لـ [[{ count: count }]]: بياخد **نسخة** من الرقم ساعة الـ [[return]] (كان 0) ويحطها في خاصية جديدة. الأرقام بتتنسخ بالقيمة، فالخاصية دي ملهاش علاقة بالمتغير اللي جوه، و [[inc]] بتزوّد المتغير بس. التصليح: getter، يعني دالة بتتنادى كل ما حد يقرا الخاصية:

~~~text fix.mjs
return { get count() { return count; }, inc() { count++; } };
~~~

~~~text الناتج (Node 24)
2
TypeError: Cannot set property count of #<Object> which has only a getter
~~~

- [[get count() { ... }]]: [[counter.count]] بقت بتنادي الدالة دي، فبترجّع قيمة المتغير **دلوقتي** (2).
- [[counter.count = 99]] في ملف [[.mjs]] (strict mode تلقائي) بيرمي الـ TypeError اللي فوق لأن مفيش setter، وفي script عادي من غير strict بيتجاهل ساكت والعداد يفضل 2. في الحالتين العداد الحقيقي محمي.

### فخ الـ [[;]]

لو السطر اللي قبل الـ IIFE مفيهوش [[;]]:

~~~text app.js
const a = 1
(() => console.log("hi"))()
~~~

~~~text الناتج
(() => console.log("hi"))()
^

TypeError: 1 is not a function
~~~

JavaScript قرا السطرين كأنهم [[const a = 1(() => ...)()]]: يعني بيحاول ينادي [[1]] كدالة. عشان كده كود قديم كتير بيكتب [[;(() => { ... })()]] بـ [[;]] في الأول.

---

## ٢. نفس الفكرة بـ ES module

النهاردة الملف نفسه بقى scope خاص. التلات سطور الأخيرة في المثال بيتحطوا في ملف لوحدهم:

~~~text store.mjs
let items = [];
export const add = (x) => { items = [...items, x]; };
export const getAll = () => items;
~~~

- [[let items = []]]: من غير [[export]]، فهو خاص بالملف زي [[count]] جوه الـ IIFE.
- [[export]]: الكلمة دي بس اللي بتخلي الحاجة ظاهرة للملفات التانية.
- [[add]]: بتعمل array جديدة فيها القديم ([[...items]] بيفرد العناصر) وبعده [[x]]. (ليه array جديدة مش [[push]]؟ درس «immutability».)
- [[getAll]]: بترجّع الـ array.
- الامتداد [[.mjs]] بيقول لـ Node «ده ES module». لو عايز [[.js]] عادي، حط [["type": "module"]] في [[package.json]].

وملف تاني بيستخدمه:

~~~text use.mjs
import { add, getAll } from "./store.mjs";
import * as store from "./store.mjs";
add("mug"); add("cap");
console.log(getAll());
console.log(store.items);
console.log(Object.keys(store));
~~~

~~~powershell
node use.mjs
~~~

~~~text الناتج
[ 'mug', 'cap' ]
undefined
[ 'add', 'getAll' ]
~~~

- [[import { add, getAll }]]: هات الحاجتين دول بالاسم.
- [[import * as store]]: هات **كل** اللي متصدّر في object واحد اسمه store. ومع ذلك [[store.items]] بـ [[undefined]]، لأن items مش متصدّر. نفس نتيجة [[counter.count]] بالظبط.

---

## ٣. الـ solCode: الـ module بيتنفّذ مرة واحدة

الحل فيه ٣ ملفات. حطيت سطر [[console.log]] زيادة في أول counter عشان نشوف هو بيتنفّذ كام مرة:

~~~text counter.mjs
console.log("counter.mjs اتنفّذ");
let count = 0;
export function inc() { return ++count; }
export const get = () => count;
~~~

~~~text a.mjs
import { inc } from "./counter.mjs";
export const fromA = () => inc();
~~~

~~~text main.mjs
import { fromA } from "./a.mjs";
import { inc, get } from "./counter.mjs";
fromA(); fromA(); inc();
console.log(get());
~~~

- [[++count]]: زوّد الأول وبعدين رجّع القيمة الجديدة ([[count++]] بترجّع القديمة).
- [[a.mjs]] بيعمل import لـ counter، و [[main.mjs]] بيعمل import لـ counter **و** a.

~~~text الناتج
counter.mjs اتنفّذ
3
~~~

السطر الأول اتطبع **مرة واحدة** مع إن ملفين عملوا import. Node بينفّذ الملف أول مرة بس، ويحفظ النتيجة، وأي import بعد كده بياخد نفس النسخة. فالـ [[fromA()]] مرتين و [[inc()]] مرة كلهم بيعدّوا على نفس [[count]] فطلع [[3]]. ده اللي اسمه **singleton**: نسخة واحدة في البرنامج كله.

> لو سمّيت الملفات [[.js]] من غير [["type": "module"]]، Node 24 بيحاول يخمّن ويطبع تحذير [[MODULE_TYPELESS_PACKAGE_JSON]]، ولو [[package.json]] فيه [["type": "commonjs"]] صراحةً بيقع بـ [[SyntaxError: Cannot use import statement outside a module]]. جرّبت الاتنين.

### تقدر تعدّل متغير مستورد؟

لو صدّرت المتغير نفسه ([[export let count = 0]]) وحاولت تزوّده من ملف تاني:

~~~text ro2.mjs
import { count } from "./ro.mjs";
count++;
~~~

~~~text الناتج
count++;
     ^

TypeError: Assignment to constant variable.
~~~

الـ import **read-only** من ناحية اللي بيستورد. التعديل لازم يحصل من جوه الـ module نفسه بدالة زي [[inc]].

---

## ٤. factory ولا singleton

كل اللي فوق (الـ IIFE والـ ES module) بيدّيك **نسخة واحدة** في البرنامج كله: ده اسمه **singleton**. أوقات محتاج كذا نسخة مستقلة (عداد لكل زرار، cart لكل يوزر)، فبتعمل **factory**: دالة عادية بترجّع object جديد بـ closure جديد كل ما تناديها.

~~~text factory.mjs
function createCounter(start = 0) {
  let count = start;
  return { inc() { return ++count; }, get count() { return count; } };
}
const a = createCounter(), b = createCounter(10);
a.inc(); a.inc(); b.inc();
console.log(a.count, b.count);
const { inc } = a; inc();
console.log(a.count);
~~~

~~~text الناتج (Node 24)
2 11
3
~~~

- [[createCounter(start = 0)]]: دالة عادية مش IIFE، و [[= 0]] قيمة افتراضية لو محدش بعت [[start]].
- كل نداء بيعمل [[count]] جديد، فـ [[a]] و [[b]] مستقلين: 2 و 11.
- [[const { inc } = a]]: بنطلّع الدالة من الـ object ونناديها لوحدها، ولسه شغالة (بقى 3)، لأنها مش محتاجة [[this]]، شايفة [[count]] من الـ closure.

### نفس الكلام بـ class: الفرق في [[this]]

~~~text klass.mjs
class Counter { #n = 0; inc() { return ++this.#n; } }
const c = new Counter();
const { inc } = c;
inc();
~~~

~~~text الناتج (Node 24)
TypeError: Cannot read properties of undefined (reading '#n')
~~~

الـ method جوه class بتعتمد على [[this]]، ولما بتتنادى لوحدها [[this]] بيبقى [[undefined]] (درس «this»). الـ factory بالـ closure مبيقعش في الفخ ده، فبتقدر تبعت [[a.inc]] كـ callback على طول ([[button.onclick = a.inc]]). والـ class أحسن لو هتعمل آلاف النسخ (الـ methods متشاركة على الـ prototype مش متنسخة لكل object) أو محتاج [[instanceof]].

### singleton كسول (lazy)

ساعات النسخة الواحدة غالية (اتصال بقاعدة بيانات)، فمش عايز تعملها غير أول ما حد يطلبها:

~~~text db.mjs
let instance;
export function getDb() {
  return (instance ??= createDb());
}
~~~

[[??=]] معناها «لو [[instance]] بـ null أو undefined، حط فيه الناتج ده». أول نداء بيعمل الـ db، والباقي بياخدوا نفس النسخة: جرّبتها بعداد جوه [[createDb]] و [[getDb() === getDb()]] طلعت [[true]] والعداد [[1]].

| | singleton | factory |
|---|---|---|
| كام نسخة | واحدة في البرنامج كله، أي import بياخدها | نسخة جديدة مع كل نداء للدالة |
| الشكل | ES module بمتغيرات، أو IIFE، أو [[getDb()]] كسول | [[createX(options)]] بترجّع object |
| ينفع فين | config، و logger، و pool اتصالات DB واحد | state لكل يوزر أو كل request أو كل component |
| الاختبار | صعب: الـ state فاضل من تست للتاني، محتاج [[reset]] | سهل: كل تست يعمل نسخة جديدة |
| الخطر | على سيرفر: state مشترك بين كل اليوزرز | نسيان إن كل نسخة ليها state منفصل |

> اختيار الـ strategy (الطريقة) وقت التشغيل pattern تاني ليه درس لوحده: «Strategy pattern» في نفس الوحدة. ولو عايز تتحكّم في قراية وكتابة خصايص object كلها (مش خاصية واحدة بـ getter)، ده «Proxy و Reflect».

---

## الخلاصة

| الطريقة | الخاص | العام | بتتنفّذ كام مرة |
|---|---|---|---|
| IIFE + return object | المتغيرات جوه الدالة (closure) | اللي في الـ object الراجع | مرة، وقت التعريف |
| ES module | المتغيرات من غير [[export]] | اللي عليه [[export]] | مرة، أول import |

- [[(() => {...})()]]: القوسين الأولانيين يخلّوها قيمة، والأخيرين ينادوها.
- حط [[;]] قبل أي سطر بيبدأ بـ [[(]].
- الاتنين singleton: لو محتاج أكتر من عداد، اعمل دالة factory بترجّع object جديد كل مرة.
- [[return { count }]] بينسخ الرقم مرة واحدة: عشان تقرا القيمة الحالية استخدم [[get count()]].`,
          lines: [
            R`IIFE: arrow function بتتعرّف وتتنادى في نفس اللحظة، واللي بترجّعه بيتحط في [[counter]]. الفايدة إن جسمها scope خاص، فأي متغير جواه مش هيبان برّه. ده كان شكل الـ modules قبل [[import]] و [[export]].`,
            R`state خاص: متعرّف جوه الـ IIFE، فمفيش كود برّه يقدر يقراه أو يغيّره مباشرة. الدوال اللي راجعة بس هي اللي شايفاه عن طريق الـ closure.`,
            R`دالة مساعدة بتطبع الرسالة وقبلها اسم الـ module بين أقواس مربعة. هي كمان خاصة: مش راجعة في الـ object، فمحدش برّه يقدر يناديها، وتقدر تغيّرها أو تمسحها من غير ما تكسر حد.`,
            R`الـ object ده هو الـ API العام: أي حاجة جواه هتبقى متاحة على [[counter]]، وأي حاجة مش فيه تفضل مخفية.`,
            R`بتزوّد [[count]] الخاص، وتطبعه بـ [[log]]، وترجّع القيمة الجديدة. دي الطريقة الوحيدة اللي العداد يزيد بيها من برّه.`,
            R`بترجّع [[count]] لـ 0 وتطبع [[reset]]. والدالتين بيعدّلوا **نفس** [[count]] لأنهم اتعملوا في نفس النداء للـ IIFE.`,
            R`نهاية الـ object اللي راجع.`,
            R`نهاية الـ arrow function. القوسين اللي حواليها بيخلّوها expression، و [[()]] الأخيرة هي اللي بتناديها فورًا. من غير [[()]] دي [[counter]] كان هيبقى الدالة نفسها مش الـ object.`,
            R`[[count]] بقى 1، والـ [[log]] الخاصة طبعت السطر بالاسم والرقم.`,
            R`بقى 2: الـ state محفوظ بين النداءات جوه الـ closure.`,
            R`بترجّع [[undefined]]: [[count]] متغير جوه الـ IIFE مش خاصية على الـ object. فلو حد كتب [[counter.count = 100]] هيحط خاصية جديدة ملهاش علاقة بالعداد الحقيقي، ومش هيبوّظه.`,
            R`في ES modules كل ملف ليه scope لوحده، فـ [[items]] من غير [[export]] خاص بالملف ده تلقائي: نفس فايدة الـ IIFE من غير اللفّة.`,
            R`[[export]] بيخلي [[add]] متاحة لأي ملف يعمل [[import]]. بتضيف العنصر بإنها تعمل array جديدة ([[...items]] وبعدها [[x]]) بدل [[push]]، فاللي ماسك الـ array القديمة مش هيلاقيها اتغيرت من تحته.`,
            R`بترجّع الـ array الحالية للقراية. [[items]] نفسه مش [[export]]، فمحدش برّه يقدر يعمله reassign، بس اللي أخد الـ array يقدر يعمل فيها [[push]]، فلو عايز حماية كاملة رجّع نسخة.`,
          ],
          sol: R`بـ module: [[let count = 0]] في أول الملف من غير export، والدوال بـ export. لو ملفين a و b عملوا import لـ inc وناديتها ٣ مرات من الاتنين، [[get()]] هترجّع 3، يعني الاتنين بيعدّوا على نفس العداد. ولو حطيت [[console.log]] في أول الملف هيطبع مرة واحدة بس مهما عملت import من كام ملف.

و [[import * as c from "./counter.js"]] وبعدين [[c.count]] بـ undefined: المتغير مش متصدّر فمش موجود برّه، زي [[counter.count]] في نسخة الـ IIFE. الغلطة الشائعة إنك تعمل [[export let count]] وتحاول تعمل [[count++]] من ملف تاني: هيطلع TypeError لأن الـ imports read-only، والتعديل لازم يبقى من جوه الـ module.`,
          solCode: R`// counter.js
let count = 0;
export function inc() { return ++count; }
export const get = () => count;
// a.js
import { inc } from "./counter.js";
export const fromA = () => inc();
// main.js
import { fromA } from "./a.js";
import { inc, get } from "./counter.js";
fromA(); fromA(); inc();
console.log(get()); // 3: نفس النسخة`
        },
        {
          cmd: "EventEmitter",
          title: "تعمل pub/sub: حد بيعلن، وأي حد مهتم بيسمع",
          desc: R`الـ Observer pattern: object بيعلن عن أحداث ([[emit]])، وأي كود تاني يشترك فيها ([[on]]) ويلغي اشتراكه ([[off]]) من غير ما الطرفين يعرفوا بعض. ده اللي ورا [[addEventListener]] في المتصفح، و [[EventEmitter]] في Node، والـ stores زي Zustand.

و «اكتب EventEmitter بإيدك» من أشهر أسئلة انترفيو JS العملية: بيختبر Map و Set و closures و this في سؤال واحد.`,
          example: R`class Emitter {
  #handlers = new Map();
  on(event, fn) {
    if (!this.#handlers.has(event)) this.#handlers.set(event, new Set());
    this.#handlers.get(event).add(fn);
    return () => this.off(event, fn);
  }
  off(event, fn) {
    this.#handlers.get(event)?.delete(fn);
  }
  emit(event, ...args) {
    const fns = [...(this.#handlers.get(event) ?? [])];
    for (const fn of fns) fn(...args);
  }
  once(event, fn) {
    const off = this.on(event, (...args) => { off(); fn(...args); });
    return off;
  }
}
const cart = new Emitter();
const unsubscribe = cart.on("add", (item) => console.log("اتضاف", item));
cart.once("add", () => console.log("أول منتج!"));
cart.emit("add", "mug");
unsubscribe();
cart.emit("add", "cap");`,
          try: R`ضيف [[listenerCount(event)]]. وبعدين خلي handler يرمي error وشوف الـ handlers اللي بعده بتشتغل ولا لأ، وصلّحها بـ try/catch جوه emit. وقارن بـ [[EventTarget]] المدمج: [[class Cart extends EventTarget]] و [[dispatchEvent(new CustomEvent("add", { detail: "mug" }))]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الكلاس من المثال جاهز في المربع: ضيف [[listenerCount(event)]]، و [[waitFor(event)]] اللي بترجّع Promise بتتحل بالـ arguments بتاعة أول [[emit]] للـ event ده (كـ array)، ومتسيبش listener وراها.`,
          practice: [
            { lvl: 'سريع', t: R`محاكاة أوضة شات: [[room]] من الـ Emitter، و ٣ يوزرز كل واحد بيعمل [[room.on("message", ...)]] وبيطبع اسمه وبعده «وصلته:» والنص، ويوزر منهم بيخرج بدالة الإلغاء بعد أول رسالة.`, done: R`أول [[emit("message", "أهلًا")]] بيطبع ٣ سطور، والتانية سطرين بس، واللي خرج مبيوصلوش حاجة، وتقدر تخلّي اللي بيبعت ميشوفش رسالته (من غير ما الـ Emitter يتغير).` },
            { lvl: 'تطبيق', t: R`ابني [[createStore(initial)]] فوق الـ Emitter: [[getState()]]، و [[setState(patch)]] بتعمل state جديدة بالـ spread وبتعمل [[emit("change", next, prev)]]، و [[subscribe(fn)]] بترجّع دالة الإلغاء. ده نفس شكل Zustand من جوه.`, done: R`بعد [[setState({ count: 1 })]] على [[{ count: 0 }]] الـ subscriber بياخد [[next.count]] بـ 1 و [[prev.count]] بـ 0، وبعد ما تنادي دالة الإلغاء [[setState]] تاني مبيطبعش حاجة، و [[getState()]] بيرجّع آخر قيمة.` },
            { lvl: 'تحدي', t: R`اقرا وتوقّع، وبعدين قارن بـ Node: غيّر [[emit]] في نسخة من الـ Emitter بحيث تلف على الـ Set نفسه ([[for (const fn of this.#handlers.get(event) ?? [])]]) من غير النسخة. handler [[A]] بيطبع A وبيعمل [[on]] لنفس الحدث بـ handler جديد بيطبع B. اكتب توقعك لـ [[emit]] مرتين في النسختين وفي [[EventEmitter]] من [[node:events]]، وبعدين شغّل التلاتة.`, done: R`من غير النسخة الناتج [[A B | A B B]] (الجديد اتنادى في نفس اللفة)، وبالنسخة و Node الاتنين [[A | A B]]، وتقدر تقول في جملة ليه، وجرّبت كمان handler بيعمل [[off]] لـ handler بعده: بالنسخة وفي Node الاتنين بيطلّعوا [[A B]] في نفس الـ emit.` },
          ],
          flag: "script",
          deep: {
            why: "بيفصل اللي بيحصل عن اللي بيتفاعل معاه: السلة مش لازم تعرف إن فيه badge وإشعار و analytics مستنيين. وده أساس الـ events في المتصفح و Node و WebSockets والـ state management.",
            how: R`Map من اسم الحدث لـ Set من الدوال: الـ Set بيمنع إن نفس الدالة تتسجّل مرتين، والمسح منه O(1).

[[on]] بترجّع دالة unsubscribe (closure شايل event و fn)، ودي الطريقة المعتادة في المكتبات الحديثة، ومناسبة بالظبط للـ cleanup في useEffect.

[[once]] بتسجّل wrapper بيشيل نفسه قبل ما ينادي الأصلي.

[[emit]] بيلف على نسخة ([[[...set]]]) مش الـ Set نفسه: من غيرها handler بيعمل [[on]] وهو شغّال كان الجديد هيتنادى في نفس اللفة (الـ Set بيلف على اللي بيتضاف أثناء اللفة)، و Node مش كده. بالنسخة اللي بيتضاف أو يتشال أثناء emit بيأثر من الـ emit الجاي بس.

الـ emit متزامن: كل الـ handlers بتشتغل فورًا بالترتيب قبل ما emit ترجع، ولو واحد رمى error الباقي مش هيشتغل. Node EventEmitter نفس الكلام، وفيه حالة خاصة: [[emit("error")]] من غير listener بيرمي الـ error ويوقع البرنامج.

في المتصفح [[EventTarget]] جاهز، وأي class يقدر يورث منه ويستخدم [[addEventListener]] و [[dispatchEvent]].`,
            when: "مكونات مستقلة محتاجة تعرف إن حاجة حصلت: إشعارات، و plugins، و WebSocket messages، و state بسيط مشترك. ولو التدفق بقى معقد وصعب تتبّعه، state management واضح أحسن.",
            mistakes: R`تنسى تلغي الاشتراك فيبقى memory leak (درس «memory leaks»). و handlers كتير بتعدّل نفس الـ state فالترتيب يفرق ومحدش فاهم. وتسمّي الأحداث strings عشوائية: خليها ثوابت. وفي الانترفيو افتكر: on و off و emit و once، وإن on بترجّع unsubscribe.`
          },
          teach: R`## الفكرة في سطر

السلة ([[cart]]) بتعلن «اتضاف منتج» ([[emit]])، وأي حتة كود مهتمة تكون اشتركت قبلها ([[on]]) فتتنادى. الكلاس [[Emitter]] كله دفتر: لكل اسم حدث، ليستة الدوال اللي مستنياه. الكود اتشغّل على ويندوز 11 بـ Node 24.19.

---

## ١. الدفتر: [[#handlers = new Map()]]

~~~text app.js
class Emitter {
  #handlers = new Map();
~~~

- [[class Emitter]]: قالب بنعمل منه objects بـ [[new Emitter()]].
- [[#handlers]]: الـ [[#]] في أول الاسم معناها **private field**: خاصية متاحة جوه الكلاس بس. لو حاولت توصلها من برّه:

~~~text الناتج
class A { #x = 1 } ; new A().#x
                            ^

SyntaxError: Private field '#x' must be declared in an enclosing class
~~~

ده حتى مش error وقت التشغيل: الملف كله مبيشتغلش. و [[cart.handlers]] من غير [[#]] بترجّع [[undefined]] لأنها خاصية تانية مش موجودة.

- [[new Map()]]: الـ Map زي object بس مخصوص لـ key ← value. هنا الـ key اسم الحدث ([["add"]]) والـ value **Set** من الدوال:

~~~text شكل الدفتر بعد سطرين on
Map {
  "add" => Set { handler1, handler2 }
}
~~~

ليه Set مش array؟ الـ Set مبيقبلش نفس القيمة مرتين، فلو سجّلت نفس الدالة مرتين هتتنادى مرة واحدة (جرّبتها: [[on("x", f)]] مرتين ثم [[emit]] طبع [[f 1]] مرة). وكمان [[delete]] منه مباشرة من غير ما تدوّر على index.

---

## ٢. [[on]]: الاشتراك

~~~text app.js
  on(event, fn) {
    if (!this.#handlers.has(event)) this.#handlers.set(event, new Set());
    this.#handlers.get(event).add(fn);
    return () => this.off(event, fn);
  }
~~~

1. [[this.#handlers.has(event)]]: فيه Set للحدث ده؟ و [[!]] بتعكس: «لو **مفيش**».
2. [[.set(event, new Set())]]: اعمل Set فاضي للحدث ده (أول مشترك).
3. [[.get(event).add(fn)]]: هات الـ Set وضيف الدالة فيه.
4. [[return () => this.off(event, fn)]]: رجّع دالة لو ناديتها تلغي الاشتراك. الدالة دي closure فاكرة [[event]] و [[fn]]، فاللي بيستخدمك مش محتاج يحتفظ بيهم. و [[this]] جوه arrow function بتفضل [[this]] بتاع [[on]] (درس «arrow و this»)، فـ [[this.off]] شغالة.

---

## ٣. [[off]]: إلغاء الاشتراك

~~~text app.js
  off(event, fn) {
    this.#handlers.get(event)?.delete(fn);
  }
~~~

- [[get(event)]] ممكن يرجّع [[undefined]] لو محدش اشترك في الحدث ده خالص.
- [[?.]] اسمها optional chaining: لو اللي قبلها [[undefined]] أو [[null]] وقّف ورجّع [[undefined]] بدل ما يرمي error. جرّبت [[new Map().get("x")?.delete(1)]] ورجّعت [[undefined]] من غير مشاكل.
- [[delete(fn)]]: شيل الدالة من الـ Set (بترجّع [[true]] لو كانت موجودة و [[false]] لو لأ).

---

## ٤. [[emit]]: الإعلان

~~~text app.js
  emit(event, ...args) {
    const fns = [...(this.#handlers.get(event) ?? [])];
    for (const fn of fns) fn(...args);
  }
~~~

نفكّه من جوه لبرّه:

1. [[...args]] في تعريف الدالة اسمها **rest**: بتلم كل الـ arguments اللي بعد [[event]] في array. فـ [[emit("add", "mug")]] تبقى [[args = ["mug"]]].
2. [[this.#handlers.get(event)]]: الـ Set بتاع الحدث، أو [[undefined]].
3. [[?? []]]: الـ [[??]] اسمها nullish coalescing: لو اللي على الشمال [[null]] أو [[undefined]] خد اللي على اليمين. فلو مفيش مشتركين بننسخ array فاضية ومحصلش حاجة. (جرّبت [[emit("nobody", 1)]] على emitter جديد: مفيش error.)
4. [[[...( ... )]]]: الـ spread جوه [[[ ]]] بيعمل array جديدة فيها عناصر الـ Set وقت النداء ده. ليه نسخة؟ تحت في «handler بيشترك وهو شغّال».
5. [[for (const fn of fns)]]: لف على كل دالة في النسخة.
6. [[fn(...args)]]: هنا [[...]] اسمها **spread**: بتفرد الـ array كـ arguments منفصلة. فلو [[emit("sum", 2, 3)]] الدالة بتتنادى [[fn(2, 3)]] (جرّبتها بـ handler بيطبع [[a + b]] وطلع [[sum 5]]).

> نفس الرمز [[...]]: في **تعريف** الدالة بيلم (rest)، وفي **النداء** أو جوه [[[ ]]] بيفرد (spread).

### handler بيشترك وهو شغّال: ليه النسخة

الـ [[for...of]] على [[Set]] بيلف على العناصر **الحالية** وأي عنصر يتضاف أثناء اللفة. يعني لو handler عمل [[on]] لنفس الحدث وهو شغّال، والـ emit بيلف على الـ Set نفسه، الـ handler الجديد هيتنادى في **نفس** الـ emit. جرّبت النسختين قدام [[EventEmitter]] من [[node:events]] بنفس الكود: handler [[A]] بيطبع A وبيشترك بـ handler جديد بيطبع B، و [[emit]] مرتين بينهم [[|]]:

~~~text الناتج (Node 24)
من غير نسخة (for of على الـ Set):  A B | A B B
بالنسخة [...set]:                  A | A B
node:events EventEmitter:          A | A B
~~~

من غير نسخة الـ B اتنادى في أول emit، وفي التاني A ضاف B تاني فاتنادوا الاتنين. بالنسخة، اللي اتضاف بيبدأ يسمع من الـ emit **الجاي**، وده نفس Node (اللي بيعمل نسخة من الـ listeners جوه [[emit]]). ونفس القاعدة في الإلغاء: لو A عمل [[off]] لـ B وهو شغّال، B لسه هيتنادى في الـ emit ده (Node طبع [[A B]] برضه)، ومن الـ emit الجاي لأ. لو عايز العكس (الإلغاء يأثر فورًا) ده قرار تصميم، بس اكتبه في التوثيق عشان محدش يتفاجئ.

### لو handler رمى error

الـ emit بينادي الدوال واحدة ورا التانية في نفس اللحظة. لو أول واحدة رمت error:

~~~text الناتج (handler أول بيرمي، وتاني بيطبع)
e.on("x", () => { throw new Error("boom"); });
                  ^

Error: boom
    at Emitter.emit (...ee2.js:12:55)
~~~

الـ handler التاني عمره ما اتنادى، والسطر اللي بعد [[emit]] كمان مشتغلش، لأن الـ error طلع لحد اللي نادى emit. ده بالظبط اللي «جرّب» بيطلب منك تصلّحه.

---

## ٥. [[once]]: اشتراك لمرة واحدة

~~~text app.js
  once(event, fn) {
    const off = this.on(event, (...args) => { off(); fn(...args); });
    return off;
  }
~~~

بدل ما نسجّل [[fn]] نفسها، بنسجّل دالة تانية (wrapper) بتعمل حاجتين:

1. [[off()]]: تلغي اشتراكها هي. [[off]] هنا الدالة اللي [[on]] رجّعتها.
2. [[fn(...args)]]: تنادي الدالة الأصلية بنفس الـ arguments.

إزاي الـ wrapper بيستخدم [[off]] وهي لسه بتتعرّف في نفس السطر؟ لأن الـ wrapper مش بيشتغل دلوقتي، بيشتغل بعدين وقت الـ emit، ووقتها [[off]] تكون اتحطلها قيمة.

---

## ٦. الاستخدام والناتج

~~~text app.js
const cart = new Emitter();
const unsubscribe = cart.on("add", (item) => console.log("اتضاف", item));
cart.once("add", () => console.log("أول منتج!"));
cart.emit("add", "mug");
unsubscribe();
cart.emit("add", "cap");
~~~

~~~text الناتج
اتضاف mug
أول منتج!
~~~

| الخطوة | الدفتر بعدها | اتطبع |
|---|---|---|
| [[on("add", ...)]] | [[add → { log }]] | |
| [[once("add", ...)]] | [[add → { log, wrapper }]] | |
| [[emit("add", "mug")]] | [[add → { log }]] (الـ wrapper شال نفسه) | [[اتضاف mug]] و [[أول منتج!]] |
| [[unsubscribe()]] | [[add → { }]] | |
| [[emit("add", "cap")]] | زي ما هو | ولا حاجة |

الترتيب في الناتج هو ترتيب الاشتراك، لأن الـ Set بيحافظ على ترتيب الإضافة.

---

## الخلاصة

- Map من اسم الحدث لـ Set من الدوال: ده كل الـ EventEmitter.
- [[on]] بترجّع دالة unsubscribe (closure)، و [[once]] wrapper بيشيل نفسه قبل ما ينادي الأصلي.
- [[emit]] بينادي الكل فورًا وبالترتيب، و [[?? []]] بتحميه لو مفيش مشتركين، بس مفيش حماية لو handler رمى error.
- [[?.]] وقّف لو undefined، و [[??]] بديل لو null/undefined، و [[...]] بيلم في التعريف ويفرد في النداء.`,
          lines: [
            R`بيعرّف قالب اسمه [[Emitter]]. كل [[new Emitter()]] هيبقى دفتر مستقل بالمشتركين بتوعه، فالسلة ليها دفتر والإشعارات ليها دفتر.`,
            R`الدفتر نفسه: [[Map]] المفتاح فيه اسم الحدث ([["add"]]) والقيمة [[Set]] فيه الدوال المستنية. الـ [[#]] بتخليه private، فمحدش من برّه الكلاس يقدر يمسح أو يضيف من غير [[on]] و [[off]].`,
            R`[[on]] = «اشترك»: بتاخد اسم الحدث والدالة اللي هتتنادى لما يحصل.`,
            R`أول مرة حد يشترك في الحدث ده مفيش [[Set]] ليه، فبنعمله. من غير السطر ده، السطر اللي بعده هيعمل [[get(event).add]] على [[undefined]] ويرمي error.`,
            R`بنضيف الدالة للـ [[Set]]. ولأنه [[Set]] مش array، لو نفس الدالة اتسجّلت مرتين هتتسجّل مرة واحدة بس، فمش هتتنادى مرتين بالغلط.`,
            R`بترجّع دالة تلغي الاشتراك ده بالظبط (closure شايل [[event]] و [[fn]]). فاللي اشترك يقدر يلغي من غير ما يحتاج يفتكر هو اشترك في إيه وبأنهي دالة.`,
            R`نهاية [[on]].`,
            R`[[off]] = «الغي الاشتراك»: بتاخد نفس الاتنين اللي اتسجّلوا.`,
            R`بتمسح الدالة من الـ [[Set]]. و [[?.]] بتمنع الـ error لو الحدث ده عمره ما كان ليه مشتركين: من غيرها [[get]] هترجّع [[undefined]] و [[.delete]] عليها هيرمي.`,
            R`نهاية [[off]].`,
            R`[[emit]] = «اعلن»: بتاخد اسم الحدث، وأي arguments بعده ([[...args]]) بتتجمّع في array عشان تتبعت للمشتركين زي ما هي.`,
            R`بناخد **نسخة** من الـ [[Set]] في array ([[[...set]]]) قبل ما نلف. و [[?? []]] بتخلي النسخة array فاضية لو مفيش مشتركين، بدل ما [[...undefined]] يرمي error. النسخة دي بتخلي handler بيشترك أو بيلغي وهو شغّال ميغيّرش اللفة دي، زي [[EventEmitter]] بتاع Node بالظبط.`,
            R`بتلف على النسخة وتنادي كل دالة بنفس الـ arguments بالترتيب اللي اشتركوا بيه.`,
            R`نهاية [[emit]].`,
            R`[[once]] = «اشترك لمرة واحدة»: الدالة تتنادى أول مرة الحدث يحصل وبعدها تتشال لوحدها.`,
            R`بنسجّل دالة وسيطة (wrapper) بدل الدالة الأصلية. أول ما تتنادى بتلغي اشتراكها ([[off()]]) **الأول**، وبعدين تنادي الأصلية. لو الترتيب اتعكس والدالة الأصلية عملت [[emit]] لنفس الحدث، الـ wrapper هيتنادى تاني.`,
            R`بنرجّع دالة الإلغاء برضه، عشان لو حبيت تلغي قبل ما الحدث يحصل أصلًا.`,
            R`نهاية [[once]].`,
            R`نهاية الكلاس.`,
            R`سلة جديدة، ودفترها فاضي.`,
            R`اشترك في [[add]] بدالة بتطبع، واحفظ دالة الإلغاء في [[unsubscribe]] عشان تستخدمها بعدين.`,
            R`اشترك لمرة واحدة بس: الرسالة دي هتظهر مع أول منتج ومش هتتكرر.`,
            R`أول إعلان: الاتنين بيتنادوا بالترتيب اللي اشتركوا بيه، فيطبع «اتضاف mug» وبعدها «أول منتج!». والـ [[once]] شال نفسه.`,
            R`الغي الاشتراك الأول بالدالة اللي اتحفظت.`,
            R`تاني إعلان: الأول اتلغى والـ [[once]] شال نفسه، فمحدش بيسمع ومفيش حاجة بتتطبع. ده بيثبت إن الإلغاء شغّال.`,
          ],
          sol: R`[[listenerCount]] بترجّع [[this.#handlers.get(event)?.size ?? 0]]. في المثال قبل الـ emit بترجّع 2، وبعده 1 (الـ once شالت نفسها)، وبعد unsubscribe بترجّع 0، وآخر [[emit("add", "cap")]] مبيطبعش حاجة.

لو أول handler رمى error من غير try/catch: الـ loop بتقف، الـ handlers اللي بعده مبتشتغلش، والـ error بيطلع لحد اللي نادى emit. بعد ما تلف كل نداء بـ try/catch جوه emit، الباقي بيشتغل عادي والـ error بيتسجل بس. و [[EventTarget]] المدمج بيعمل كده لوحده: [[dispatchEvent]] بيكمّل على باقي الـ listeners وبيبلّغ الـ error كـ uncaught (في Console أحمر) من غير ما يوقف اللي بعده، والـ detail بيوصل في [[e.detail]].`,
          solCode: R`emit(event, ...args) {
  for (const fn of [...(this.#handlers.get(event) ?? [])]) {
    try {
      fn(...args);
    } catch (err) {
      console.error($__bthandler لـ "$__{event}" وقع:$__bt, err);
    }
  }
}
listenerCount(event) {
  return this.#handlers.get(event)?.size ?? 0;
}
// والبديل المدمج
class Cart extends EventTarget {}
const cart = new Cart();
cart.addEventListener("add", (e) => console.log("اتضاف", e.detail));
cart.dispatchEvent(new CustomEvent("add", { detail: "mug" }));`,
          check: {
            lang: "js",
            starter: R`class Emitter {
  #handlers = new Map();
  on(event, fn) {
    if (!this.#handlers.has(event)) this.#handlers.set(event, new Set());
    this.#handlers.get(event).add(fn);
    return () => this.off(event, fn);
  }
  off(event, fn) {
    this.#handlers.get(event)?.delete(fn);
  }
  emit(event, ...args) {
    const fns = [...(this.#handlers.get(event) ?? [])];
    for (const fn of fns) fn(...args);
  }
  once(event, fn) {
    const off = this.on(event, (...args) => { off(); fn(...args); });
    return off;
  }
  listenerCount(event) {}
  waitFor(event) {}
}`,
            tests: R`test("listenerCount: 2 وبعد الـ once 1 وبعد unsubscribe 0", () => {
  const cart = new Emitter(), counts = [];
  const unsubscribe = cart.on("add", () => {});
  cart.once("add", () => {});
  counts.push(cart.listenerCount("add"));
  cart.emit("add", "mug");
  counts.push(cart.listenerCount("add"));
  unsubscribe();
  counts.push(cart.listenerCount("add"));
  expect(counts).toEqual([2, 1, 0]);
});
test("event محدش سمعه ← 0 مش undefined", () => expect(new Emitter().listenerCount("nope")).toBe(0));
test("waitFor بترجّع Promise", () => expect(new Emitter().waitFor("x") instanceof Promise).toBe(true));
test("waitFor بتتحل بأول emit بس، والـ arguments كـ array", async () => {
  const e = new Emitter();
  const p = e.waitFor("ready");
  e.emit("ready", 1, 2);
  e.emit("ready", 3);
  expect(await p).toEqual([1, 2]);
});
test("waitFor متسيبش listener وراها", async () => {
  const e = new Emitter();
  const p = e.waitFor("ready");
  const before = e.listenerCount("ready");
  e.emit("ready", "ok");
  await p;
  expect([before, e.listenerCount("ready")]).toEqual([1, 0]);
});`,
            solution: R`class Emitter {
  #handlers = new Map();
  on(event, fn) {
    if (!this.#handlers.has(event)) this.#handlers.set(event, new Set());
    this.#handlers.get(event).add(fn);
    return () => this.off(event, fn);
  }
  off(event, fn) {
    this.#handlers.get(event)?.delete(fn);
  }
  emit(event, ...args) {
    const fns = [...(this.#handlers.get(event) ?? [])];
    for (const fn of fns) fn(...args);
  }
  once(event, fn) {
    const off = this.on(event, (...args) => { off(); fn(...args); });
    return off;
  }
  listenerCount(event) {
    return this.#handlers.get(event)?.size ?? 0;
  }
  waitFor(event) {
    return new Promise((resolve) => this.once(event, (...args) => resolve(args)));
  }
}`
          }
        },
        {
          cmd: "immutability",
          title: "تعدّل داتا من غير ما تلمس الأصل",
          desc: R`immutable update معناها: بدل ما تعدّل الـ object أو الـ array، تعمل نسخة جديدة فيها التعديل، والأجزاء اللي متغيرتش تفضل متشاركة. ده اللي React و Redux و Zustand بيطلبوه، لأنهم بيعرفوا إن حاجة اتغيرت بمقارنة الـ reference ([[prev !== next]]).

الأدوات: spread للـ objects والـ arrays، و [[map]] للتعديل، و [[filter]] للمسح، و [[toSorted]] و [[with]] بدل sort و [[arr[i] = x]]. و [[Object.freeze]] بيمنع التعديل فعلًا، بس سطحي.`,
          example: R`const state = { user: { name: "Sara" }, items: [{ id: 1, qty: 1 }, { id: 2, qty: 3 }] };
const next = {
  ...state,
  items: state.items.map((it) => (it.id === 1 ? { ...it, qty: it.qty + 1 } : it)),
};
next.user === state.user;        // true: اللي متغيرش متشارك
next.items === state.items;      // false: array جديدة
next.items[1] === state.items[1]; // true: العنصر اللي متغيرش متشارك
const removed = state.items.filter((it) => it.id !== 1);
const added = [...state.items, { id: 3, qty: 1 }];
const frozen = Object.freeze({ a: 1, nested: { b: 2 } });
frozen.a = 99;                   // اتجاهل (TypeError في strict)
frozen.nested.b = 99;            // اتغير: freeze سطحي`,
          try: R`اكتب [[updateQty(state, id, qty)]] بترجّع state جديدة، واتأكد بـ === إن الأصل متغيرش وإن اللي متغيرش لسه متشارك. وبعدين اكتب [[deepFreeze(obj)]] بـ recursion. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[updateQty]] و [[deepFreeze]].`,
          practice: [
            { lvl: 'سريع', t: R`اتوقع وبعدين شغّل: على [[const a = [3, 1, 2];]] إيه اللي بيتغير في [[a]] بعد [[a.toSorted()]] و [[a.toReversed()]] و [[a.with(0, 9)]] و [[a.toSpliced(0, 1)]]، وبعد [[a.sort()]]؟ وإيه ناتج [[a.sort() === a]]؟`, done: R`الأربعة الأولانيين بيرجّعوا arrays جديدة (1,2,3 و 2,1,3 و 9,1,2 و 1,2) و [[a]] بتفضل 3,1,2، وبعد [[sort()]] بتبقى 1,2,3، و [[a.sort() === a]] بيرجّع [[true]] لأن [[sort]] بيعدّل نفس الـ array ويرجّعها هي.` },
            { lvl: 'تطبيق', t: R`اكتب اختبار يمسك الباج وبعدين صلّحه: [[const addItem = (state, item) => { state.items.push(item); return { ...state }; };]]. التست بـ [[node:test]] و [[assert]] بيتأكد إن الأصل متغيرش وإن [[next.items !== state.items]].`, done: R`التست بيقع على الكود ده (الأصل بقى فيه عنصرين و [[next.items === state.items]] بـ [[true]] مع إن [[next !== state]])، وبعد ما تكتبها [[items: [...state.items, item] ]] التست بيعدّي، وتقدر تقول ليه React كان ممكن ميعملش re-render لـ component بيقرا [[items]] بس.` },
            { lvl: 'تحدي', t: R`مسألة: اكتب [[setIn(obj, path, value)]] بالـ recursion، بتنسخ الطريق اللي في الـ path بس: [[setIn(state, ["user", "address", "city"], "Giza")]]. ولو حتة في النص مش موجودة، تتعمل object فاضي.`, done: R`[[next.user.address.city]] بقت [["Giza"]] و [[state.user.address.city]] لسه القديمة، و [[next.items === state.items]] و [[next.user !== state.user]] الاتنين [[true]]، و [[setIn({}, ["a", "b"], 1)]] بترجّع [[{ a: { b: 1 } }]]، و path فاضي بيرمي [[TypeError]].` },
          ],
          flag: "script",
          deep: {
            why: "الـ bugs اللي سببها «حد عدّل الداتا دي من ورايا» من أصعب الأنواع في التتبّع. والـ immutability بتخلّي التغيير واضح: الـ reference الجديد = فيه تغيير. وده اللي بيخلي React.memo و useMemo و undo/redo و time-travel debugging ممكنين.",
            how: R`الفكرة اسمها structural sharing: لما تعدّل عنصر واحد في array فيها ألف، مش بتنسخ الألف object، بتعمل array جديدة (ألف reference) والـ objects نفسها متشاركة إلا اللي اتغير. فالتكلفة أقل بكتير من deep clone.

كل مستوى في الطريق للحاجة اللي اتغيرت لازم يبقى جديد: الـ state، والـ items، والعنصر نفسه. أي مستوى تعدّله في مكانه هيكسر مقارنة الـ reference.

[[Object.freeze]] بيخلي الخصايص read-only ويمنع الإضافة والمسح، في المستوى الأول بس. في strict mode أي محاولة تعديل بترمي TypeError، وده مفيد في التطوير عشان تمسك التعديلات الغلط.

لما الـ state بتبقى متداخلة جدًا والـ spreads بتكتر، مكتبة Immer بتخليك تكتب كأنك بتعدّل ([[draft.items[0].qty++]]) وهي بتعمل النسخ الـ immutable. و Redux Toolkit بيستخدمها جوّاه (createSlice)، و Zustand عنده middleware اختياري ليها ([[zustand/middleware/immer]]) لازم تسطّب immer وتلف بيه الـ store، ومن غيره لازم تعمل النسخ الـ immutable بنفسك.`,
            when: "أي state في React أو store، وأي داتا مشتركة بين أجزاء كتير من الكود، ودوال utility (خليها pure: متعدّلش مدخلاتها).",
            mistakes: R`[[state.items.push(x); setItems(state.items)]]: نفس الـ reference فمفيش render. وتنسخ المستوى الأول بس وتعدّل جوه: [[{ ...state }.user.name = "x"]] عدّل الأصل. وتعمل deep clone للـ state كلها مع كل تعديل: بطيء وبيكسر المقارنات. وتفتكر إن freeze عميق.`
          },
          teach: R`## الفكرة في سطر

عايزين نزوّد الـ [[qty]] بتاع المنتج رقم 1 من غير ما نلمس الـ [[state]] القديمة: نعمل نسخة جديدة **للطريق بس** اللي بيوصل للحاجة اللي اتغيرت، والباقي يفضل نفس الـ objects القديمة. كل الكود اتشغّل على ويندوز 11 بـ Node 24.19.

---

## ١. الـ state

~~~text app.js
const state = { user: { name: "Sara" }, items: [{ id: 1, qty: 1 }, { id: 2, qty: 3 }] };
~~~

object فيه حاجتين: [[user]] (object) و [[items]] (array فيها 2 objects). كل object أو array جوه المتغير ده هو **reference**: عنوان في الذاكرة، مش نسخة (درس «reference و copy»). و [[===]] على objects بتسأل «ده **نفس** الـ object؟» مش «شكلهم زي بعض؟».

---

## ٢. التعديل الـ immutable

~~~text app.js
const next = {
  ...state,
  items: state.items.map((it) => (it.id === 1 ? { ...it, qty: it.qty + 1 } : it)),
};
~~~

### [[{ ...state, ... }]]

الـ [[...]] جوه [[{ }]] اسمها **object spread**: انسخ كل خصايص [[state]] في object جديد. يعني [[next.user]] هيبقى **نفس** [[state.user]] (النسخ سطحي: الـ reference بيتنسخ مش الـ object اللي جواه). وبعد الـ spread بنكتب [[items: ...]] فبتغطي على [[items]] اللي اتنسخت.

### [[state.items.map(...)]]

[[map]] بتلف على كل عنصر وبترجّع **array جديدة** فيها اللي الدالة رجّعته لكل عنصر. والأصل مبيتلمسش.

### [[it.id === 1 ? ... : it]]

الـ [[? :]] اسمها ternary: «لو الشرط صح خد اللي بعد [[?]]، غير كده خد اللي بعد [[:]]».

- العنصر اللي الـ id بتاعه 1: [[{ ...it, qty: it.qty + 1 }]]، object **جديد** فيه كل خصايص [[it]] والـ [[qty]] متغطية بقيمة جديدة.
- أي عنصر تاني: [[it]] نفسه، من غير نسخ.

القوسين حوالين الـ ternary كله بعد [[=>]] مش ضروريين، بس بيخلّوا الكود أوضح.

### الناتج

~~~text app.js
console.log(next.user === state.user);
console.log(next.items === state.items);
console.log(next.items[1] === state.items[1]);
console.log(next.items[0] === state.items[0]);
console.log(state.items[0].qty, next.items[0].qty);
console.log(JSON.stringify(next));
~~~

~~~text الناتج
true
false
true
false
1 2
{"user":{"name":"Sara"},"items":[{"id":1,"qty":2},{"id":2,"qty":3}]}
~~~

| المقارنة | الناتج | ليه |
|---|---|---|
| [[next.user === state.user]] | [[true]] | الـ spread نسخ الـ reference، ومحدش لمس user |
| [[next.items === state.items]] | [[false]] | [[map]] عملت array جديدة |
| [[next.items[1] === state.items[1]]] | [[true]] | الـ ternary رجّع [[it]] نفسه |
| [[next.items[0] === state.items[0]]] | [[false]] | العنصر اللي اتغير بقى object جديد |
| [[qty]] قديم وجديد | [[1 2]] | الأصل زي ما هو |

ده اسمه **structural sharing**: كل مستوى على الطريق للتغيير جديد (الـ state، والـ items، والعنصر)، وكل اللي جنب الطريق متشارك. فـ React مثلًا يقدر يعرف إن [[user]] متغيرش بمقارنة [[===]] واحدة.

### الفخ: النسخ السطحي

~~~text app.js
const copy = { ...state };
copy.user.name = "X";
console.log(state.user.name);
~~~

~~~text الناتج
X
~~~

[[copy]] object جديد، بس [[copy.user]] هو نفسه [[state.user]]، فالتعديل وصل للأصل.

---

## ٣. مسح وإضافة من غير تعديل

~~~text app.js
const removed = state.items.filter((it) => it.id !== 1);
const added = [...state.items, { id: 3, qty: 1 }];
~~~

- [[filter]]: array جديدة فيها العناصر اللي الشرط بتاعها [[true]] بس. هنا كل حاجة إلا id 1. والـ [[!==]] عكس [[===]].
- [[[...state.items, x]]]: الـ spread جوه [[[ ]]] بيفرد العناصر القديمة في array جديدة وبعدها العنصر الجديد. ده البديل الـ immutable لـ [[push]].

~~~text الناتج
[ { id: 2, qty: 3 } ] 2
3 2
~~~

[[removed]] فيها عنصر واحد، و [[added]] فيها 3، و [[state.items.length]] لسه 2 في الحالتين. وبنفس الفكرة [[toSorted()]] و [[with(i, x)]] بدل [[sort()]] و [[arr[i] = x]]: [[[3, 1, 2].toSorted()]] رجّعت [[[ 1, 2, 3 ]]] و [[with(0, 9)]] رجّعت [[[ 9, 1, 2 ]]] والأصل فضل [[[ 3, 1, 2 ]]].

---

## ٤. [[Object.freeze]]: امنع التعديل فعلًا

~~~text app.js
const frozen = Object.freeze({ a: 1, nested: { b: 2 } });
frozen.a = 99;
frozen.nested.b = 99;
console.log(frozen);
console.log(Object.isFrozen(frozen), Object.isFrozen(frozen.nested));
~~~

~~~text الناتج
{ a: 1, nested: { b: 99 } }
true false
~~~

- [[Object.freeze(obj)]] بيجمّد الـ object ويرجّعه: مفيش تعديل ولا إضافة ولا مسح خصايص. جرّبت [[f.b = 2; delete f.a]] على object متجمّد وفضل [[{ a: 1 }]].
- [[frozen.a = 99]] اتجاهل **بهدوء** من غير أي رسالة.
- [[frozen.nested.b = 99]] **اتنفّذ**: الـ freeze على المستوى الأول بس، و [[nested]] object تاني محدش جمّده. و [[Object.isFrozen]] بتأكد ده: [[true]] للبرّاني و [[false]] للي جوه.

### في strict mode

لو الملف في أوله [["use strict";]] (أو ES module، لأنه strict لوحده):

~~~text الناتج
frozen.a = 99;
         ^

TypeError: Cannot assign to read only property 'a' of object '#<Object>'
~~~

نفس السطر بقى بيرمي error بدل ما يتجاهل، وده أحسن وانت بتطوّر: بتمسك أي حد بيحاول يعدّل.

---

## الخلاصة

| عايز | بدل | استخدم |
|---|---|---|
| تعدّل خاصية | [[obj.x = 1]] | [[{ ...obj, x: 1 }]] |
| تعدّل عنصر في array | [[arr[i].qty++]] | [[map]] + ternary + spread |
| تمسح | [[splice]] | [[filter]] |
| تضيف | [[push]] | [[[...arr, x]]] |
| ترتّب | [[sort()]] | [[toSorted()]] |

- الـ spread سطحي: كل مستوى على طريق التغيير لازم يتنسخ بنفسه.
- [[Object.freeze]] سطحي برضه، وبيتجاهل بهدوء إلا في strict mode.`,
          lines: [
            R`state متداخلة: object فيه [[user]] (object) و [[items]] (array من objects). عايزين نزوّد [[qty]] بتاع العنصر رقم 1 **من غير ما نلمس** [[state]] الأصلية.`,
            R`بنبني object جديد بدل ما نعدّل القديم. ده اللي React و Redux محتاجينه عشان يعرفوا إن حاجة اتغيرت بمقارنة الـ reference بـ [[===]].`,
            R`بينسخ خصايص المستوى الأول من [[state]] في الـ object الجديد. النسخ سطحي: [[next.user]] و [[state.user]] نفس الـ object مش نسخة منه.`,
            R`[[items]] جديدة بتغطّي على اللي اتنسخت فوق. [[map]] بترجّع array جديدة: العنصر اللي [[id]] بتاعه 1 بيتعمله نسخة ([[...it]]) بـ [[qty]] زيادة واحد، والباقي بيرجع زي ما هو (نفس الـ object).`,
            R`نهاية [[next]].`,
            R`[[true]]: [[user]] متغيرش، فالاتنين بيشاوروا على نفس الـ object. ده مقصود: بننسخ اللي اتغيّر بس، فالنسخ رخيص و React يعرف إن الجزء ده متغيرش.`,
            R`[[false]]: [[items]] array جديدة لأن جواها عنصر اتغيّر. أي كود بيقارن الـ reference هيعرف إن فيه تغيير.`,
            R`[[true]]: العنصر التاني ([[id: 2]]) متغيرش، فـ [[map]] رجّعته هو نفسه، والعنصر الأول بس هو اللي اتعمله نسخة جديدة.`,
            R`مسح immutable: [[filter]] بترجّع array جديدة من غير العنصر اللي [[id]] بتاعه 1، والأصلية لسه فيها العنصرين. بدل [[splice]] اللي بيعدّل الأصل.`,
            R`إضافة immutable: array جديدة فيها كل العناصر القديمة وبعدها العنصر الجديد. [[push]] كانت هتعدّل [[state.items]] نفسها، فـ React مكانش هيلاحظ التغيير لأن الـ reference هو هو.`,
            R`[[Object.freeze]] بيقفل الـ object: مينفعش تضيف أو تمسح أو تغيّر خصايصه. وبيرجّع نفس الـ object بعد ما يتقفل.`,
            R`التعديل مبيحصلش و [[frozen.a]] تفضل 1. في الكود العادي بيتجاهل بالسكوت، وفي strict mode (والـ modules) بيرمي TypeError.`,
            R`ده اتغيّر فعلًا: [[freeze]] سطحي، بيقفل المستوى الأول بس، و [[nested]] object منفصل مش متجمّد. لو عايز كل المستويات لازم تعمل freeze لكل object جوه (deep freeze).`,
          ],
          sol: R`[[updateQty(state, 1, 5)]]: [[state.items[0].qty]] لسه 1 و [[next.items[0].qty]] بـ 5. و [[next.user === state.user]] بـ true، و [[next.items === state.items]] بـ false، و [[next.items[1] === state.items[1]]] بـ true (اللي متغيرش متشارك)، و [[next.items[0] === state.items[0]]] بـ false (اتعمل object جديد).

في [[deepFreeze]] جمّد الـ object الأول وبعدين ادخل جوه: كده لو فيه object بيشاور على نفسه، الـ [[Object.isFrozen]] هتوقف الـ recursion. لو جمّدت في الآخر بعد الـ recursion، object زي [[a.self = a]] هيعمل [[Maximum call stack size exceeded]]. وبعد deepFreeze [[f.nested.b = 99]] بتتجاهل بهدوء، وفي strict بتطلع [[TypeError: Cannot assign to read only property 'b']].`,
          solCode: R`function updateQty(state, id, qty) {
  return {
    ...state,
    items: state.items.map((it) => (it.id === id ? { ...it, qty } : it)),
  };
}
function deepFreeze(obj) {
  Object.freeze(obj);
  for (const value of Object.values(obj)) {
    if (typeof value === "object" && value !== null && !Object.isFrozen(value)) deepFreeze(value);
  }
  return obj;
}
const state = { user: { name: "Sara" }, items: [{ id: 1, qty: 1 }, { id: 2, qty: 3 }] };
const next = updateQty(state, 1, 5);
console.log(state.items[0].qty, next.items[0].qty, next.user === state.user, next.items[1] === state.items[1]);
// 1 5 true true`,
          check: {
            lang: "js",
            starter: R`function updateQty(state, id, qty) {
  const item = state.items.find((it) => it.id === id);
  item.qty = qty;
  return state;
}
function deepFreeze(obj) {
  return Object.freeze(obj);
}`,
            tests: R`const make = () => ({ user: { name: "Sara" }, items: [{ id: 1, qty: 1 }, { id: 2, qty: 3 }] });
test("الأصل ميتغيرش والجديد فيه qty 5", () => {
  const state = make(), next = updateQty(state, 1, 5);
  expect([state.items[0].qty, next.items[0].qty]).toEqual([1, 5]);
});
test("اللي اتغير بقى object جديد: state و items والعنصر", () => {
  const state = make(), next = updateQty(state, 1, 5);
  expect([next === state, next.items === state.items, next.items[0] === state.items[0]]).toEqual([false, false, false]);
});
test("اللي متغيرش لسه متشارك: user والعنصر التاني", () => {
  const state = make(), next = updateQty(state, 1, 5);
  expect([next.user === state.user, next.items[1] === state.items[1]]).toEqual([true, true]);
});
test("deepFreeze بتجمّد اللي جوه كمان", () => {
  const f = deepFreeze({ a: 1, nested: { b: 2, list: [1] } });
  expect([Object.isFrozen(f), Object.isFrozen(f.nested), Object.isFrozen(f.nested.list)]).toEqual([true, true, true]);
});
test("deepFreeze على object بيشاور على نفسه ميقعش (جمّد الأول وبعدين ادخل)", () => {
  const a = { x: 1 };
  a.self = a;
  expect(Object.isFrozen(deepFreeze(a))).toBe(true);
});`,
            solution: R`function updateQty(state, id, qty) {
  return {
    ...state,
    items: state.items.map((it) => (it.id === id ? { ...it, qty } : it)),
  };
}
function deepFreeze(obj) {
  Object.freeze(obj);
  for (const value of Object.values(obj)) {
    if (typeof value === "object" && value !== null && !Object.isFrozen(value)) deepFreeze(value);
  }
  return obj;
}`
          }
        },
        {
          cmd: "iterators و generators",
          title: "إزاي for...of بيشتغل، وتعمل sequence بتتحسب واحدة واحدة",
          desc: R`أي object عنده method اسمها [[Symbol.iterator]] بترجّع iterator (object فيه [[next()]] بترجّع [[{ value, done }]]) يبقى iterable، وده اللي بيخلي [[for...of]] و [[...spread]] و destructuring يشتغلوا على arrays و strings و Map و Set.

الـ generator ([[function*]]) أسهل طريقة تعمل iterator: كل [[yield]] بيطلّع قيمة ويوقف الدالة لحد ما حد يطلب اللي بعدها. فتقدر تعمل sequence طويلة أو لانهائية من غير ما تحسبها كلها. و ES2025 ضاف iterator helpers: [[map]] و [[filter]] و [[take]] و [[toArray]] مباشرة على الـ iterators.`,
          example: R`function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) yield i;
}
[...range(0, 5)];                   // [0, 1, 2, 3, 4]
const it = range(0, 2);
it.next();                          // { value: 0, done: false }
it.next();                          // { value: 1, done: false }
it.next();                          // { value: undefined, done: true }
const playlist = {
  songs: ["a", "b"],
  *[Symbol.iterator]() { yield* this.songs; },
};
for (const song of playlist) console.log(song);
range(0, Infinity).filter((n) => n % 2).take(3).toArray(); // [1, 3, 5]
async function* pages(url) {
  for (let next = url; next; ) {
    const data = await fetch(next).then((r) => r.json());
    yield data.items;
    next = data.nextUrl;
  }
}`,
          try: R`اكتب [[function* fibonacci()]] لانهائية، وخد أول ١٠ أرقام بـ [[.take(10).toArray()]]. وبعدين استخدم [[pages]] مع [[for await (const items of pages(url))]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[function* fibonacci()]] بـ [[next()]] مباشرة.`,
          practice: [
            { lvl: 'سريع', t: R`ابني iterator بإيدك من غير [[function*]]: object [[{ from: 1, to: 3 }]] فيه [[Symbol.iterator]] بترجّع object فيه [[next()]] بيرجّع [[{ value, done }]].`, done: R`[[Array.from(r)]] بيرجّع 1 و 2 و 3، ولو عملتها تاني بترجّع نفس الأرقام (كل لفة بتاخد iterator جديد)، و [[for (const n of r)]] بيطبع التلاتة، و [[{ from: 5, to: 1 }]] بيرجّع لستة فاضية.` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية: اعمل [[users.json]] فيه 1050 يوزر (بـ [[Array.from({ length: 1050 }, (_, i) => ({ id: i + 1 }))]])، واكتب [[function* chunk(arr, size)]] وابعتهم لـ «API» وهمي (دالة بتطبع عدد كل دفعة) على دفعات 100.`, done: R`بيطبع 11 دفعة: 10 فيهم 100 والأخيرة 50، ومجموعهم 1050، و [[size]] بصفر أو سالب بيرمي [[RangeError]] بدل ما يلف للأبد، و [[Array.from(chunk([], 3))]] بيرجّع لستة فاضية.` },
            { lvl: 'تحدي', t: R`قارن وقيس: [[function* naturals()]] لانهائية من 1، و [[f]] بتربّع الرقم وبتزوّد عدّاد. شغّل [[naturals().map(f).filter((n) => n % 2).take(3).toArray()]] واطبع العدّاد، وبعدين نفس السلسلة بـ arrays عادية على 1 لـ 1000.`, done: R`الناتج 1 و 9 و 25 والعدّاد 5 بس (الأرقام من 1 لـ 5)، لكن مع الـ arrays [[f]] بتتنادى 1000 مرة قبل ما [[filter]] يبدأ، وتقدر تقول بصوتك ليه الـ generator وقف لوحده.` },
          ],
          flag: "script",
          deep: {
            why: "بتفسّر إزاي for...of و spread بيشتغلوا على أي حاجة. والـ generators مفيدة للداتا الكبيرة أو اللانهائية (IDs، و pagination، و streams)، لأنك بتحسب اللي محتاجه بس. و async generators هي الطريقة النضيفة تلف على API بصفحات.",
            how: R`iteration protocol: [[obj[Symbol.iterator]()]] بيرجّع iterator، و for...of بينادي [[next()]] لحد [[done: true]]. الـ arrays وغيرها عاملين كده جاهز.

نداء [[range(0, 5)]] مبينفّذش أي حاجة: بيرجّع generator object. كل [[next()]] بيشغّل الدالة لحد أول [[yield]] ويوقف، والمتغيرات المحلية فاضلة. ده lazy evaluation. و [[yield*]] بيسلّم لـ iterable تاني.

الـ iterator helpers (ES2025، موجودة في Node 22 والمتصفحات الحديثة) lazy كمان: [[filter]] و [[take]] مبيعملوش arrays وسطانية، فينفع تشتغل على [[range(0, Infinity)]] من غير ما البرنامج يقف. عكس Array methods اللي بتعمل array كاملة في كل خطوة.

[[async function*]] بيعمل async iterator: next بترجّع Promise، وبتلف عليه بـ [[for await...of]]. Node streams و [[readline]] كمان async iterables، فتقدر تقرا ملف ضخم سطر سطر بـ for await. و [[Array.fromAsync]] بتجمّعه في array.

والـ generators كانت أساس async/await قبل ما يبقى جزء من اللغة (مكتبة co).`,
            when: "pagination من API، وقراية ملفات أو streams كبيرة، و sequences لانهائية، وتعريف iteration لـ data structure بتاعتك (tree أو linked list في تاب DSA).",
            mistakes: R`تفتكر إن نداء الـ generator بيشغّله. وتلف على نفس الـ generator مرتين: التانية فاضية لأنه اتستهلك. وتعمل [[[...range(0, Infinity)]]]: البرنامج هيقف. و arrow function مينفعش تبقى generator.`
          },
          teach: R`## الفكرة في سطر

[[for...of]] و [[...]] مش سحر: بيطلبوا من الحاجة «هات اللي بعده» ([[next()]]) لحد ما تقول «خلصت» ([[done: true]]). والـ generator دالة بتعرف ترد على الطلب ده قيمة قيمة. كل الكود اتشغّل على ويندوز 11 بـ Node 24.19 (ملف [[.mjs]]).

---

## ١. الـ iterator من غير أي generator

قبل ما نكتب generator، نشوف إزاي array عادية بتتلف:

~~~text app.js
const arr = [10, 20];
const ai = arr[Symbol.iterator]();
console.log(ai.next(), ai.next(), ai.next());
~~~

~~~text الناتج
{ value: 10, done: false } { value: 20, done: false } { value: undefined, done: true }
~~~

- [[Symbol.iterator]]: اسم method خاص (مش string، اسمه Symbol عشان ميتلخبطش مع أي خاصية عادية). أي حاجة عندها الـ method دي اسمها **iterable**.
- لما تناديها بترجّع **iterator**: object فيه [[next()]].
- كل [[next()]] بترجّع [[{ value, done }]]: القيمة، وهل خلصنا.

ده بالظبط اللي [[for...of]] بيعمله من جوه. ولو حاجة ملهاش [[Symbol.iterator]]، زي object عادي:

~~~text الناتج
[...{ a: 1 }]
TypeError: {(intermediate value)} is not iterable
~~~

---

## ٢. [[function* range]]

~~~text app.js
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) yield i;
}
~~~

- [[function*]]: النجمة بعد [[function]] بتخليها **generator function**. (مفيش arrow generator.)
- [[step = 1]]: default parameter، لو مدّيتش step يبقى 1.
- [[for (let i = start; i < end; i += step)]]: loop عادية من start لحد قبل end.
- [[yield i]]: «طلّع [[i]] ووقّف هنا». الدالة بتتجمّد في السطر ده بكل متغيراتها لحد ما حد يطلب القيمة الجاية.

### نداء الـ generator مبيشغّلوش

ده أهم حاجة في الدرس. خليني أحط [[console.log]] جوه generator عشان نشوف إمتى بيشتغل:

~~~text app.js
function* demo() { console.log("  بدأ"); yield 1; console.log("  كمّل"); yield 2; console.log("  خلص"); }
const d = demo();
console.log("قبل أول next");
console.log(d.next());
console.log(d.next());
console.log(d.next());
~~~

~~~text الناتج
قبل أول next
  بدأ
{ value: 1, done: false }
  كمّل
{ value: 2, done: false }
  خلص
{ value: undefined, done: true }
~~~

1. [[demo()]] مطبعش «بدأ»: رجّع object من نوع [[[object Generator]]] بس.
2. أول [[next()]]: شغّل من الأول لحد أول [[yield]] ووقف.
3. تاني [[next()]]: كمّل من مكان ما وقف لحد [[yield]] اللي بعده.
4. تالت [[next()]]: كمّل لآخر الدالة، ومفيش yield، فـ [[done: true]].

ده اسمه **lazy evaluation**: مفيش قيمة بتتحسب غير لما حد يطلبها.

### سطور المثال

~~~text app.js
[...range(0, 5)];
const it = range(0, 2);
it.next();
it.next();
it.next();
~~~

~~~text الناتج
[ 0, 1, 2, 3, 4 ]
{ value: 0, done: false }
{ value: 1, done: false }
{ value: undefined, done: true }
~~~

- [[[...range(0, 5)]]]: الـ spread بينادي [[next()]] لحد [[done]] ويحط كل القيم في array. و [[range(0, 10, 3)]] طلّعت [[[ 0, 3, 6, 9 ]]].
- [[it]] فيه رقمين بس، فالتالتة [[done: true]] و [[value: undefined]].
- الـ generator بيتستهلك مرة واحدة: [[next()]] تاني بعد كده بترجّع [[done: true]] على طول، و [[[...it]]] بترجّع [[[]]]. ولو عملت [[const r = range(0, 3)]] و [[[...r], [...r]]] طلع [[[ 0, 1, 2 ] []]]. عايز تلف تاني؟ نادي [[range()]] تاني.

---

## ٣. تخلي object بتاعك iterable

~~~text app.js
const playlist = {
  songs: ["a", "b"],
  *[Symbol.iterator]() { yield* this.songs; },
};
for (const song of playlist) console.log(song);
~~~

~~~text الناتج
a
b
~~~

- [[*[Symbol.iterator]() { ... }]]: method جوه object. الـ [[*]] في الأول تخليها generator، والأقواس المربعة [[[ ]]] معناها «اسم الـ method هو قيمة الـ expression ده» (computed key)، يعني [[Symbol.iterator]].
- [[yield* this.songs]]: [[yield*]] بالنجمة معناها «طلّع كل قيم الـ iterable ده واحدة واحدة». يعني زي [[for (const s of this.songs) yield s]] في سطر.
- وبكده [[for...of]] اشتغل، وكمان [[[...playlist]]] طلّعت [[[ 'a', 'b' ]]]، و [[const [first] = playlist]] خدت [['a']]: الـ destructuring بيستخدم نفس البروتوكول.

---

## ٤. iterator helpers على تسلسل لانهائي

~~~text app.js
range(0, Infinity).filter((n) => n % 2).take(3).toArray();
~~~

~~~text الناتج
[ 1, 3, 5 ]
~~~

نفكّها بالترتيب:

| الخطوة | بتعمل إيه |
|---|---|
| [[range(0, Infinity)]] | generator لانهائي: 0، 1، 2، ... مفيش حاجة اتحسبت لسه |
| [[.filter((n) => n % 2)]] | سيب الأرقام اللي [[n % 2]] بتاعها truthy. [[%]] باقي القسمة: [[0 % 2]] بـ 0 (falsy) و [[1 % 2]] بـ 1 (truthy)، فبيعدّي الفردي بس |
| [[.take(3)]] | خد أول 3 وبعدها قول done |
| [[.toArray()]] | اطلب القيم فعلًا وحطها في array |

ليه مقعدش للأبد؟ لأن الـ helpers دي (ES2025) **lazy**: [[toArray]] بتطلب من [[take]]، و [[take]] من [[filter]]، و [[filter]] من [[range]]، قيمة قيمة. بعد ما [[take]] ياخد 3 بيوقف الطلب كله، فـ [[range]] وصل لـ 5 بس. ولو كتبت [[[...range(0, Infinity)]]] الـ spread هيطلب لحد done اللي مش هييجي، والبرنامج هيعلّق.

---

## ٥. async generator: صفحات API

~~~text app.js
async function* pages(url) {
  for (let next = url; next; ) {
    const data = await fetch(next).then((r) => r.json());
    yield data.items;
    next = data.nextUrl;
  }
}
~~~

- [[async function*]]: generator و async مع بعض، فتقدر تكتب [[await]] جواه. و [[next()]] بتاعه بترجّع **Promise** (جرّبت: [[p.next() instanceof Promise]] بـ [[true]]، ونوعه [[[object AsyncGenerator]]]).
- [[for (let next = url; next; )]]: loop بـ ٣ أجزاء: البداية [[next = url]]، والشرط [[next]] (يكمّل طول ما فيه لينك)، والجزء التالت فاضي لأننا بنحدّث [[next]] جوه.
- [[await fetch(next).then((r) => r.json())]]: هات الصفحة وحوّل الرد JSON.
- [[yield data.items]]: طلّع عناصر الصفحة دي ووقّف.
- [[next = data.nextUrl]]: لما حد يطلب اللي بعده، خد لينك الصفحة الجاية. لو [[null]] الشرط يبقى false والـ loop تخلص.

### تشغيله

جرّبته على سيرفر Node صغير على [[localhost]] بيرجّع صفحتين: الأولى [[{ items: ["a", "b"], nextUrl: ".../items?page=2" }]] والتانية [[{ items: ["c"], nextUrl: null }]]:

~~~text app.js
for await (const items of pages($__bt$__{base}/items?page=1$__bt)) console.log("صفحة:", items);
console.log(await Array.fromAsync(pages($__bt$__{base}/items?page=1$__bt)));
~~~

~~~text الناتج
  السيرفر: طلب /items?page=1
صفحة: [ 'a', 'b' ]
  السيرفر: طلب /items?page=2
صفحة: [ 'c' ]
  السيرفر: طلب /items?page=1
  السيرفر: طلب /items?page=2
[ [ 'a', 'b' ], [ 'c' ] ]
~~~

- [[for await (... of ...)]]: زي [[for...of]] بس بيستنى الـ Promise بتاع كل [[next()]]. لازم يبقى جوه async function أو في ES module (top-level).
- لاحظ الترتيب: صفحة 2 مطلبتش غير **بعد** ما الـ loop طبعت صفحة 1. الـ lazy شغال مع الشبكة كمان.
- [[Array.fromAsync]]: بتلف على الـ async iterable كله وتجمّعه في array.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[Symbol.iterator]] | الـ method اللي بتخلي أي حاجة iterable |
| [[next()]] | بترجّع [[{ value, done }]] |
| [[function*]] و [[yield]] | دالة بتطلّع قيمة وتوقف لحد الطلب الجاي |
| [[yield*]] | طلّع كل قيم iterable تاني |
| [[.filter().take().toArray()]] | helpers lazy على أي iterator |
| [[async function*]] و [[for await]] | نفس الكلام بس كل قيمة جاية من Promise |

- نداء الـ generator مبيشغّلوش، وبيتستهلك مرة واحدة.
- مع حاجة لانهائية: [[take]] قبل أي حاجة بتطلب لحد done.`,
          lines: [
            R`النجمة بعد [[function]] بتخليها generator: لما تناديها مبتشتغلش، بترجّع object تقدر تطلب منه القيم واحدة واحدة.`,
            R`loop عادية، بس [[yield i]] بيطلّع القيمة ويوقف الدالة مكانها لحد ما حد يطلب القيمة الجاية، وبعدها تكمّل من نفس النقطة. فالأرقام بتتحسب عند الطلب بس، ومفيش array بتتعمل في الذاكرة.`,
            R`نهاية [[range]].`,
            R`الـ spread بيطلب القيم كلها لحد ما الـ generator يخلص ويحطها في array: من [[0]] لـ [[4]]. والـ [[end]] نفسه مش داخل لأن الشرط [[i < end]].`,
            R`بيعمل generator object بس، ولا سطر جوه [[range]] اشتغل لسه. الكود بيبدأ مع أول [[next()]].`,
            R`أول [[next]] بيشغّل الدالة لحد أول [[yield]] ويرجّع [[value: 0]] و [[done: false]] (يعني لسه فيه).`,
            R`بيكمّل من بعد الـ [[yield]] اللي فات، الـ loop تلف لفة، ويقف عند الـ [[yield]] الجاي: [[value: 1]].`,
            R`[[i]] بقى 2 والشرط فشل، فالدالة خلصت: [[done: true]] و [[value: undefined]]. وأي [[next]] بعد كده هيرجّع نفس الحاجة.`,
            R`object عادي مش array، هنخليه iterable عشان [[for...of]] والـ spread يشتغلوا عليه.`,
            R`الداتا اللي الـ iteration هتطلّعها.`,
            R`[[Symbol.iterator]] هو الاسم اللي [[for...of]] والـ spread بيدوّروا عليه في أي object. كتبناه generator (النجمة قبله)، و [[yield*]] بيطلّع عناصر [[this.songs]] واحد واحد كإنها [[yield]] منفصلة. من غيره [[for...of]] على الـ object ده كان هيرمي TypeError إنه مش iterable.`,
            R`نهاية [[playlist]].`,
            R`[[for...of]] لقى [[Symbol.iterator]] فنادى الـ generator وطبع [[a]] وبعدها [[b]].`,
            R`[[range(0, Infinity)]] generator مبيخلصش أبدًا. الـ iterator helpers ([[filter]] و [[take]] على الـ iterator نفسه، في Node 22 وما بعده والمتصفحات الحديثة) lazy: بيطلبوا قيمة قيمة، و [[take(3)]] بيوقف بعد 3 أرقام فردية، فـ [[toArray()]] بترجّع [[1]] و [[3]] و [[5]]. لو حوّلته array الأول بالـ spread كان البرنامج هيفضل يلف للأبد.`,
            R`async generator: بيجمع [[async]] (يقدر يعمل [[await]]) مع [[yield]] (يطلّع قيم واحدة واحدة). مناسب لـ API بيرجّع الداتا صفحات، وبيتلف عليه بـ [[for await...of]].`,
            R`loop من غير خطوة في الآخر: بتبدأ بأول URL وتفضل طول ما [[next]] فيه قيمة. التحديث بيحصل جوه الـ loop في آخر سطر.`,
            R`بتجيب الصفحة الحالية وتحوّل الرد لـ JSON، والـ [[await]] بيوقف الـ generator لحد ما الرد ييجي من غير ما يوقّف باقي البرنامج. في كود حقيقي افحص [[r.ok]] قبل [[json()]]، لأن [[fetch]] مبيرميش error على 404 أو 500.`,
            R`بيطلّع عناصر الصفحة دي للي بيلف ويوقف. الصفحة الجاية مش هتتجاب غير لما اللي بيلف يطلب، فلو عمل [[break]] بعد أول صفحة مفيش requests زيادة.`,
            R`لينك الصفحة الجاية من رد السيرفر. في آخر صفحة بيبقى [[null]] أو مش موجود، فشرط الـ loop يفشل والـ generator يخلص.`,
            R`نهاية الـ loop.`,
            R`نهاية [[pages]].`,
          ],
          sol: R`[[fibonacci().take(10).toArray()]] بترجّع [[[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]]]. الـ generator فيه [[while (true)]] بس مش بيعلّق، لأن كل [[yield]] بيوقف لحد ما حد يطلب القيمة الجاية، و take(10) بتطلب 10 بس. لو كتبت [[[...fibonacci()]]] البرنامج هيعلّق للأبد (أو يقع بـ out of memory) لأن spread بتطلب لحد done.

مع [[for await (const items of pages(url))]]: كل لفة بتجيب صفحة، وبتقف لما [[nextUrl]] يبقى null. [[for await]] لازم تبقى جوه async function أو ESM (top-level). و [[take]] و [[toArray]] (iterator helpers) موجودين في Node 22 والمتصفحات الحديثة، فلو طلعلك [[take is not a function]] يبقى الـ runtime قديم.`,
          solCode: R`function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
console.log(fibonacci().take(10).toArray()); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
async function* pages(url) {
  for (let next = url; next; ) {
    const data = await fetch(next).then((r) => r.json());
    yield data.items;
    next = data.nextUrl;
  }
}
for await (const items of pages("https://api.example.com/items?page=1")) {
  console.log(items.length);
}`,
          check: {
            lang: "js",
            starter: R`function* fibonacci() {
  // while (true) و yield
}`,
            tests: R`const first = (it, n) => { const out = []; for (const x of it) { if (out.length === n) break; out.push(x); } return out; };
test("أول 10 ← 0 1 1 2 3 5 8 13 21 34", () => expect(first(fibonacci(), 10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]));
test("next() بيرجّع { value, done: false }", () => {
  const it = fibonacci();
  it.next();
  expect(it.next()).toEqual({ value: 1, done: false });
});
test("لانهائي: الـ 50 بيطلع 7778742049 من غير ما يخلص", () => {
  const it = fibonacci();
  let v;
  for (let i = 0; i < 50; i++) v = it.next();
  expect([v.value, v.done]).toEqual([7778742049, false]);
});
test("كل generator ليه حالته: اتنين مع بعض مستقلين", () => {
  const a = fibonacci(), b = fibonacci();
  a.next(); a.next(); a.next();
  expect([a.next().value, b.next().value]).toEqual([2, 0]);
});`,
            solution: R`function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}`
          }
        },
        {
          cmd: "Strategy pattern",
          title: "تختار طريقة الحساب وقت التشغيل من غير if/else طويلة",
          desc: R`الـ Strategy pattern: بدل دالة فيها [[switch]] بيكبر مع كل طريقة جديدة (شحن عادي، وسريع، واستلام من الفرع)، بتحط كل طريقة في دالة لوحدها جوه object، والدالة الأساسية بتختار الطريقة بالاسم وتناديها. الطريقة الجديدة بقت سطر بيتضاف، مش تعديل في كود شغّال.

ده نفس اللي بتعمله وانت بتبعت comparator لـ [[sort]]، أو strategy لمكتبة login زي Passport، أو طريقة دفع في checkout. وبيتسأل في الانترفيو كـ «إزاي تشيل الـ switch ده؟».`,
          example: R`const shipping = {
  standard: (order) => (order.total >= 500 ? 0 : 40),
  express: (order) => 80 + order.items * 5,
  pickup: () => 0,
};
function shippingCost(order, method) {
  if (!Object.hasOwn(shipping, method)) {
    throw new RangeError($__btطريقة شحن مش معروفة: $__{method}$__bt);
  }
  return shipping[method](order);
}
const order = { total: 350, items: 3 };
console.log(shippingCost(order, "standard"));                     // 40
console.log(shippingCost(order, "express"));                      // 95
console.log(shippingCost({ total: 600, items: 1 }, "standard")); // 0
shipping.sameDay = () => 150;
console.log(shippingCost(order, "sameDay"));                      // 150
try { shippingCost(order, "toString"); } catch (e) { console.log(e.message); }`,
          try: R`ضيف strategy اسمها [[weight]] بتحسب 10 جنيه لكل كيلو ([[order.kg]]) وأقل حاجة 30، من غير ما تلمس [[shippingCost]]. وبعدين شيل سطر [[Object.hasOwn]] وجرّب [[shippingCost(order, "toString")]] و [[shippingCost(order, "constructor")]] وشوف بيرجّعوا إيه. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[applyDiscount]] و [[registerDiscount]] بالـ strategies.`,
          practice: [
            { lvl: 'سريع', t: R`refactor: الدالة دي شغالة بس كل نوع ملف جديد بيكبّرها: [[function exportData(rows, type) { if (type === "csv") return rows.map((r) => r.join(",")).join("\n"); else if (type === "json") return JSON.stringify(rows); else if (type === "tsv") return rows.map((r) => r.join("\t")).join("\n"); }]]. حوّلها لـ object [[exporters]] فيه دالة لكل نوع، و [[exportData]] بتختار منه، من غير ما الناتج يتغيّر.`, done: R`لنفس [[rows = [ ["a", 1], ["b", 2] ] ]] الناتج بالتلات أنواع زي النسخة القديمة حرف بحرف (قارنهم بـ [[===]] وطلع [[true]] للتلاتة)، و [[exportData(rows, "xml")]] بيرمي [[RangeError]] فيه كلمة [[xml]] بدل ما يرجّع [[undefined]] ساكت زي القديمة، وإضافة نوع [[md]] بقت سطر واحد في [[exporters]].` },
            { lvl: 'تطبيق', t: R`ابني جدول منتجات في صفحة HTML: [[<select>]] فيه «الأرخص» و «الأغلى» و «بالاسم» و «الأحدث»، وكل اختيار اسمه key في object [[sorters]] قيمته comparator. لما الـ select يتغيّر، اعمل [[products.toSorted(sorters[select.value])]] وارسم الصفوف تاني بـ [[textContent]].`, done: R`كل اختيار بيرتّب صح (جرّب ٥ منتجات فيهم سعرين زي بعض واسم عربي)، و [[products]] الأصلية مبتتغيّرش (اطبعها بعد كل ترتيب)، وإضافة ترتيب جديد محتاجة سطر في [[sorters]] و [[<option>]] بس، ومفيش ولا [[if]] على قيمة الـ select.` },
            { lvl: 'تحدي', t: R`اكتب اختبار: ملف [[shipping.test.mjs]] بـ [[node:test]] و [[node:assert]] لـ [[shippingCost]] بتاع الدرس: الحد بالظبط ([[total: 500]] و [[499]])، و [[items: 0]] في express، وطريقة مش موجودة، و [[toString]] و [[__proto__]]، وإن strategy جديدة بتشتغل. وبعدين بوّظ الكود عمدًا (غيّر [[>=]] لـ [[>]]، وشيل [[hasOwn]]) واتأكد إن فيه تست بيقع لكل بوظة.`, done: R`[[node --test]] بيعدّي ٦ تستات على الأقل على الكود السليم، و [[>]] بدل [[>=]] بيوقّع تست الـ 500 بالظبط، وشيل [[hasOwn]] بيوقّع تست [[toString]] (بيرجّع [["[object Object]"]] بدل ما يرمي)، وكل تست اسمه بيقول بيختبر إيه.` },
          ],
          flag: "script",
          deep: {
            why: R`عشان الكود اللي بيختار يفضل ثابت والطرق تتغيّر لوحدها. كل طريقة جديدة (شحن، خصم، تصدير، دفع) في الـ switch معناها تفتح دالة شغالة وتعدّل فيها وتخاطر تكسر الحالات القديمة. بالـ strategy الإضافة سطر جديد، وكل طريقة تتختبر لوحدها. ودي فكرة «مفتوح للإضافة، مقفول للتعديل» (Open/Closed) من غير كلام كبير.`,
            how: R`في JavaScript الدوال قيم، فالـ strategy مش محتاجة interface ولا class زي Java: object (أو [[Map]]) من الاسم للدالة، وكل الدوال ليها نفس الشكل (نفس الـ arguments ونفس نوع الراجع). الدالة اللي بتختار بتعمل حاجتين: تتأكد إن الاسم موجود فعلًا ([[Object.hasOwn]]، عشان [[toString]] و [[constructor]] موجودين على أي object من الـ prototype)، وتنادي.

لو الـ strategy محتاجة إعدادات، اعملها بـ factory: [[const percent = (p) => (amount) => amount * (1 - p / 100)]]، فـ [[percent(20)]] strategy جاهزة شايلة الـ 20 في closure. ولو الطرق جاية من برّه (plugins) اعمل [[register(name, fn)]] بتفحص إن [[fn]] دالة قبل ما تحفظها.

الـ [[sort(comparator)]] نفسها Strategy: الـ sort بتعرف ترتّب، وانت بتديها «إزاي تقارن».`,
            when: R`لما يبقى عندك ٣ طرق أو أكتر لنفس الحاجة وبيزيدوا: حساب شحن أو خصم أو ضريبة، وتصدير لأكتر من صيغة، وطرق دفع أو login، وترتيب وفلترة في جدول، و validation rules. لو هما طريقتين ومش هيزيدوا، [[if]] واحدة أوضح ومش محتاج pattern.`,
            mistakes: R`تختار بـ [[shipping[method]]] من غير [[Object.hasOwn]]: [[method = "toString"]] بيرجّع [["[object Object]"]] و [["constructor"]] بيرجّع الـ order نفسه بدل error. وتسيب الاسم الغلط يرجّع [[undefined]] ساكت بدل [[RangeError]] بالاسم. وتخلّي كل strategy ليها شكل arguments مختلف فالدالة اللي بتختار تبدأ يبقى فيها [[if]] تاني. وتعمل strategies لحاجة فيها حالتين بس.`
          },
          teach: R`## الفكرة في سطر

عندك أكتر من طريقة لحساب نفس الحاجة (مصاريف الشحن). بدل ما تحطهم كلهم في [[switch]] جوه دالة واحدة، كل طريقة دالة لوحدها في object، والدالة الأساسية بتختار بالاسم. اتشغّل كله على ويندوز 11 بـ Node 24.

---

## ١. المشكلة: الـ switch اللي بيكبر

~~~text before.mjs
function shippingCostOld(order, method) {
  switch (method) {
    case "standard": return order.total >= 500 ? 0 : 40;
    case "express": return 80 + order.items * 5;
    case "pickup": return 0;
  }
}
console.log(shippingCostOld({ total: 350, items: 3 }, "expres"));
~~~

~~~text الناتج (Node 24)
undefined
~~~

مشكلتين:

1. كل طريقة جديدة معناها تفتح الدالة دي وتزوّد [[case]]، وكل مرة ممكن تكسر واحدة قديمة.
2. غلطة إملائية ([["expres"]] من غير s) رجّعت [[undefined]] ساكت، وأي حساب بعدها هيبقى [[NaN]] من غير ما حد يعرف ليه.

---

## ٢. الـ strategies: object من الدوال

~~~text app.mjs
const shipping = {
  standard: (order) => (order.total >= 500 ? 0 : 40),
  express: (order) => 80 + order.items * 5,
  pickup: () => 0,
};
~~~

- [[shipping]]: object عادي، كل key اسم طريقة، وكل value **دالة**. في JavaScript الدالة قيمة زي الرقم، فينفع تتحط في object.
- [[(order) => (...)]]: arrow function بتاخد الطلب وترجّع رقم. الأقواس حوالين الـ ternary للوضوح بس.
- [[order.total >= 500 ? 0 : 40]]: الـ ternary: لو الإجمالي 500 أو أكتر الشحن 0، غير كده 40.
- [[80 + order.items * 5]]: 80 ثابت و 5 لكل قطعة. الـ [[*]] قبل الـ [[+]] زي الرياضة.
- [[pickup: () => 0]]: مش محتاجة الطلب أصلًا، فمفيش arguments. ده عادي: اللي بينادي هيبعت [[order]] وهي هتتجاهله.

القاعدة الوحيدة: **كل الدوال ليها نفس الشكل** (بتاخد order وبترجّع رقم)، فاللي بيختار مش محتاج يعرف هي بتحسب إزاي.

---

## ٣. اللي بيختار: [[shippingCost]]

~~~text app.mjs
function shippingCost(order, method) {
  if (!Object.hasOwn(shipping, method)) {
    throw new RangeError($__btطريقة شحن مش معروفة: $__{method}$__bt);
  }
  return shipping[method](order);
}
~~~

1. [[Object.hasOwn(shipping, method)]]: الـ object ده فيه key بالاسم ده **بتاعه هو**؟ و [[!]] بتعكس: «لو مفيش».
2. [[throw new RangeError(...)]]: ارمي error بالاسم الغلط نفسه. [[RangeError]] معناها «القيمة برّه المسموح». الـ backticks مع [[$__{method}]] بتحط الاسم جوه الرسالة.
3. [[shipping[method]]]: هات الدالة بالاسم (الأقواس المربعة عشان الاسم جوه متغير).
4. [[(order)]] بعدها على طول: ناديها بالطلب، ورجّع اللي رجّعته.

### ليه [[hasOwn]] مش [[shipping[method]]] وخلاص؟

أي object عادي بيورث خصايص من [[Object.prototype]] زي [[toString]] و [[constructor]]. شيلت سطر الـ [[hasOwn]] وجرّبت:

~~~text الناتج (Node 24، من غير hasOwn)
shippingCost(order, "toString")     →  [object Object]
shippingCost(order, "constructor")  →  { total: 350, items: 3 }
shippingCost(order, "fast")         →  TypeError: shipping[method] is not a function
~~~

- [[toString]] اتنادت كـ «طريقة شحن» ورجّعت نص بدل رقم.
- [[constructor]] هو [[Object]] نفسه، و [[Object(order)]] بيرجّع الـ order زي ما هو.
- الاسم اللي مش موجود خالص وقع بـ error مش واضح هو انهي اسم.

لو الاسم جاي من يوزر (query string أو فورم)، ده باب لنتايج غريبة. [[hasOwn]] بيقفل الحالات دي كلها برسالة واحدة واضحة. والبديل: [[new Map()]] بدل الـ object، لأن [[map.get("toString")]] بترجّع [[undefined]] (جرّبتها)، فتفحص بـ [[map.has(method)]].

---

## ٤. التشغيل

~~~text app.mjs
const order = { total: 350, items: 3 };
console.log(shippingCost(order, "standard"));
console.log(shippingCost(order, "express"));
console.log(shippingCost({ total: 600, items: 1 }, "standard"));
shipping.sameDay = () => 150;
console.log(shippingCost(order, "sameDay"));
try { shippingCost(order, "toString"); } catch (e) { console.log(e.message); }
~~~

~~~text الناتج (Node 24)
40
95
0
150
طريقة شحن مش معروفة: toString
~~~

| السطر | الناتج | ليه |
|---|---|---|
| [[standard]] على 350 | 40 | أقل من 500 فالشحن مش مجاني |
| [[express]] على 3 قطع | 95 | 80 ثابت وبعدها 3 × 5 = 15 |
| [[standard]] على 600 | 0 | عدّى الـ 500 فالشحن مجاني |
| [[sameDay]] | 150 | strategy جديدة اتضافت سطر واحد ومحدش لمس [[shippingCost]] |
| [[toString]] | الرسالة | [[hasOwn]] رفض الاسم الموروث ورمى RangeError بالاسم |

السطر [[shipping.sameDay = ...]] هو كل الفكرة: طريقة جديدة من غير ما تفتح الدالة اللي شغالة.

---

## ٥. Strategy حواليك من غير ما تاخد بالك

الـ [[sort]] و [[toSorted]] بيعرفوا يرتّبوا، وانت بتديهم «إزاي تقارن اتنين» كدالة. يعني الـ comparator هو الـ strategy:

~~~text sort.mjs
const products = [{ name: "mug", price: 120 }, { name: "cap", price: 90 }, { name: "bag", price: 300 }];
const sorters = {
  cheap: (a, b) => a.price - b.price,
  name: (a, b) => a.name.localeCompare(b.name),
};
console.log(products.toSorted(sorters.cheap).map((p) => p.name).join(" "));
console.log(products.toSorted(sorters.name).map((p) => p.name).join(" "));
~~~

~~~text الناتج (Node 24)
cap mug bag
bag cap mug
~~~

- [[a.price - b.price]]: رقم سالب معناه «a الأول»، فالترتيب تصاعدي بالسعر.
- [[localeCompare]]: بتقارن نصين حسب اللغة (وبتشتغل مع العربي).
- [[toSorted]]: زي [[sort]] بس بترجّع array جديدة ومبتغيّرش الأصلية (درس «sort و toSorted»).

ونفس الفكرة في Passport.js ([[passport.use(new GoogleStrategy(...))]])، وفي اختيار طريقة الدفع، وفي الـ validation rules.

---

## ٦. strategy ليها إعدادات: factory

لو عايز خصم 20٪ وخصم 35٪، متكتبش دالتين متكررين. اعمل دالة **بتعمل** strategy:

~~~text percent.mjs
const percent = (p) => (amount) => amount * (1 - p / 100);
const discounts = { summer: percent(20), vip: percent(35) };
console.log(discounts.summer(200), discounts.vip(200));
~~~

~~~text الناتج (Node 24)
160 130
~~~

[[percent(20)]] بترجّع دالة جديدة فاكرة [[p = 20]] في الـ closure (درس «closure»)، وبعدين [[discounts.summer(200)]] بتحسب [[200 * 0.8]]. ده factory زي اللي في «module pattern و IIFE» بس بيطلّع دوال.

> خلي بالك من الأرقام العشرية: [[19.99 * 0.9]] بتطلع [[17.991]]. في الفلوس قرّب بـ [[Math.round(x * 100) / 100]] أو احسب بالقروش (أرقام صحيحة).

---

## الخلاصة

| الحتة | دورها |
|---|---|
| object (أو [[Map]]) من الدوال | كل طريقة لوحدها، بنفس شكل الـ arguments والراجع |
| [[Object.hasOwn]] أو [[map.has]] | يرفض الأسامي الغلط والموروثة زي [[toString]] برسالة واضحة |
| الدالة اللي بتختار | تفحص وتنادي، ومبتتغيّرش لما طريقة تتضاف |
| factory زي [[percent(20)]] | strategy ليها إعدادات من غير تكرار |

- الـ switch اللي بيكبر مع كل حالة جديدة هو العلامة إنك محتاج Strategy.
- طريقتين ومش هيزيدوا؟ [[if]] عادية أوضح.`,
          lines: [
            R`object الـ strategies: كل key اسم طريقة شحن، وكل قيمة دالة بتحسب المصاريف. الدوال قيم في JavaScript فينفع تتخزّن في object زي الأرقام.`,
            R`الشحن العادي: لو [[order.total]] 500 أو أكتر يبقى 0، غير كده 40. الـ [[? :]] اسمها ternary: شرط وبعدين قيمة لو صح وقيمة لو غلط.`,
            R`الشحن السريع: 80 ثابت و 5 لكل قطعة. نفس شكل اللي فوقه بالظبط: بياخد [[order]] ويرجّع رقم، ودي القاعدة اللي بتخلّي الطرق تتبدّل.`,
            R`الاستلام من الفرع ببلاش. مش محتاجة الطلب فمفيش arguments، و JavaScript بيتجاهل الـ [[order]] اللي هيتبعتلها.`,
            R`قفلة الـ object.`,
            R`الدالة اللي بتختار: بتاخد الطلب واسم الطريقة. هي اللي باقي الكود بيناديها، ومش هتتغيّر لما طريقة جديدة تتضاف.`,
            R`[[Object.hasOwn]] بتتأكد إن الاسم key **بتاع** [[shipping]] نفسه مش موروث. من غيرها [[toString]] و [[constructor]] كانوا هيتنادوا كطرق شحن ويرجّعوا حاجات غريبة.`,
            R`بنرمي [[RangeError]] (قيمة برّه المسموح) والاسم الغلط جوه الرسالة، فاللي بيقرا اللوج يعرف على طول إيه اللي اتبعت بدل [[undefined]] ساكت.`,
            R`قفلة الـ if.`,
            R`[[shipping[method]]] بتجيب الدالة بالاسم اللي في المتغير، و [[(order)]] بعدها بتناديها بالطلب. اللي رجّعته الـ strategy هو اللي بيرجع.`,
            R`قفلة [[shippingCost]].`,
            R`طلب للتجربة: إجماليه 350 جنيه وفيه 3 قطع.`,
            R`بيطبع 40: الإجمالي أقل من 500، فالشحن العادي مش مجاني.`,
            R`بيطبع 95: الـ 80 الثابتين وبعدهم 3 قطع في 5 = 15.`,
            R`بيطبع 0: طلب تاني إجماليه 600، عدّى الـ 500 فالشحن العادي مجاني. نفس الـ strategy بتدّي نتيجة مختلفة حسب الطلب.`,
            R`بنضيف طريقة جديدة (توصيل في نفس اليوم بـ 150) سطر واحد، من غير ما نفتح [[shippingCost]] ولا نلمس الطرق القديمة. دي فايدة الـ pattern كلها.`,
            R`بيطبع 150: الدالة اللي بتختار لقت الطريقة الجديدة لوحدها.`,
            R`اسم موروث من [[Object.prototype]]: [[hasOwn]] بيرفضه فبيترمي الـ RangeError، والـ [[catch]] بيطبع «طريقة شحن مش معروفة: toString» بدل ما البرنامج يقع.`,
          ],
          sol: R`[[weight]]: [[shipping.weight = (order) => Math.max(30, order.kg * 10)]]، فـ [[{ kg: 2 }]] بيطلع 30 (عشرين أقل من الحد) و [[{ kg: 7 }]] بيطلع 70، ومن غير ما تعدّل [[shippingCost]].

من غير [[Object.hasOwn]] (جرّبتها على Node 24): [[shippingCost(order, "toString")]] بيرجّع [["[object Object]"]] (الـ [[toString]] الموروثة اتنادت كأنها طريقة شحن)، و [[shippingCost(order, "constructor")]] بيرجّع الـ order نفسه [[{ total: 350, items: 3 }]] (لأن [[constructor]] هو [[Object]] و [[Object(order)]] بيرجّعه زي ما هو)، و [[shippingCost(order, "fast")]] بيرمي [[TypeError: shipping[method] is not a function]] من غير ما يقول الاسم. بـ [[hasOwn]] التلاتة بيرموا [[RangeError]] برسالة فيها الاسم.

حل المربع تحت: object [[discounts]] فيه [[none]] و [[percent10]] و [[flat50]]، و [[applyDiscount]] بتفحص بـ [[hasOwn]] وتنادي، و [[registerDiscount]] بترفض اللي مش دالة بـ [[TypeError]] والكود الموجود قبل كده بـ [[Error]].`,
          solCode: R`shipping.weight = (order) => Math.max(30, order.kg * 10);
console.log(shippingCost({ kg: 2 }, "weight")); // 30
console.log(shippingCost({ kg: 7 }, "weight")); // 70
// حل المربع
const discounts = {
  none: (amount) => amount,
  percent10: (amount) => amount * 0.9,
  flat50: (amount) => Math.max(0, amount - 50),
};
function applyDiscount(amount, code) {
  if (!Object.hasOwn(discounts, code)) throw new RangeError($__btكود خصم مش معروف: $__{code}$__bt);
  return discounts[code](amount);
}
function registerDiscount(code, fn) {
  if (typeof fn !== "function") throw new TypeError("الخصم لازم يبقى function");
  if (Object.hasOwn(discounts, code)) throw new Error($__btالكود $__{code} موجود قبل كده$__bt);
  discounts[code] = fn;
}`,
          check: {
            lang: "js",
            starter: R`// كمّل الـ strategies: percent10 (خصم 10٪) و flat50 (50 جنيه، ومينزلش تحت الصفر)
const discounts = {
  none: (amount) => amount,
};
// اختار الـ strategy بالاسم، وارمي RangeError فيه الكود لو مش موجود (حتى لو toString)
function applyDiscount(amount, code) {}
// ضيف strategy جديدة: TypeError لو fn مش دالة، و Error لو الكود موجود قبل كده
function registerDiscount(code, fn) {}`,
            tests: R`test("none و percent10 و flat50", () => expect([applyDiscount(200, "none"), applyDiscount(200, "percent10"), applyDiscount(200, "flat50")]).toEqual([200, 180, 150]));
test("flat50 مينزلش تحت الصفر", () => expect(applyDiscount(30, "flat50")).toBe(0));
test("كود مش موجود ← RangeError فيه اسم الكود", () => expect(() => applyDiscount(100, "BLACKFRIDAY")).toThrow("BLACKFRIDAY"));
test("اسم موروث زي toString مش strategy", () => expect(() => applyDiscount(100, "toString")).toThrow("toString"));
test("registerDiscount بيضيف strategy بتشتغل على طول", () => {
  registerDiscount("half", (amount) => amount / 2);
  expect(applyDiscount(300, "half")).toBe(150);
});
test("fn مش دالة ← TypeError", () => expect(() => registerDiscount("bad", 50)).toThrow(/function/));
test("كود موجود قبل كده ← Error", () => expect(() => registerDiscount("none", (a) => a)).toThrow("none"));`,
            solution: R`const discounts = {
  none: (amount) => amount,
  percent10: (amount) => amount * 0.9,
  flat50: (amount) => Math.max(0, amount - 50),
};
function applyDiscount(amount, code) {
  if (!Object.hasOwn(discounts, code)) throw new RangeError($__btكود خصم مش معروف: $__{code}$__bt);
  return discounts[code](amount);
}
function registerDiscount(code, fn) {
  if (typeof fn !== "function") throw new TypeError("الخصم لازم يبقى function");
  if (Object.hasOwn(discounts, code)) throw new Error($__btالكود $__{code} موجود قبل كده$__bt);
  discounts[code] = fn;
}`
          }
        }
      ]
    }
]);
