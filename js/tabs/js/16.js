// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "Patterns",
      l: 3,
      n: "module pattern، و Observer بـ EventEmitter، و immutability، و iterators و generators",
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

## الخلاصة

| الطريقة | الخاص | العام | بتتنفّذ كام مرة |
|---|---|---|---|
| IIFE + return object | المتغيرات جوه الدالة (closure) | اللي في الـ object الراجع | مرة، وقت التعريف |
| ES module | المتغيرات من غير [[export]] | اللي عليه [[export]] | مرة، أول import |

- [[(() => {...})()]]: القوسين الأولانيين يخلّوها قيمة، والأخيرين ينادوها.
- حط [[;]] قبل أي سطر بيبدأ بـ [[(]].
- الاتنين singleton: لو محتاج أكتر من عداد، اعمل دالة factory بترجّع object جديد كل مرة.`,
          lines: [
            "IIFE: دالة بتتنادي فورًا، والناتج في counter.",
            "state خاص.",
            "دالة مساعدة خاصة برضه.",
            "الـ API العام.",
            "بتعدّل الـ state الخاص.",
            "ودي كمان.",
            "قفلة الـ object.",
            R`[[()]] في الآخر: النداء.`,
            "1.",
            "2.",
            "الـ count مش موجود على الـ object.",
            "متغير في الـ module من غير export: خاص بالملف.",
            "دالة عامة بتعدّله.",
            "ودالة بتقراه."
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
    for (const fn of this.#handlers.get(event) ?? []) fn(...args);
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
          try: R`ضيف [[listenerCount(event)]]. وبعدين خلي handler يرمي error وشوف الـ handlers اللي بعده بتشتغل ولا لأ، وصلّحها بـ try/catch جوه emit. وقارن بـ [[EventTarget]] المدمج: [[class Cart extends EventTarget]] و [[dispatchEvent(new CustomEvent("add", { detail: "mug" }))]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الكلاس من المثال جاهز في المربع، ضيف [[listenerCount]] و try/catch جوه [[emit]].`,
          flag: "script",
          deep: {
            why: "بيفصل اللي بيحصل عن اللي بيتفاعل معاه: السلة مش لازم تعرف إن فيه badge وإشعار و analytics مستنيين. وده أساس الـ events في المتصفح و Node و WebSockets والـ state management.",
            how: R`Map من اسم الحدث لـ Set من الدوال: الـ Set بيمنع إن نفس الدالة تتسجّل مرتين، والمسح منه O(1).

[[on]] بترجّع دالة unsubscribe (closure شايل event و fn)، ودي الطريقة المعتادة في المكتبات الحديثة، ومناسبة بالظبط للـ cleanup في useEffect.

[[once]] بتسجّل wrapper بيشيل نفسه قبل ما ينادي الأصلي. المسح من Set وانت بتلف عليه آمن في JS.

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
    for (const fn of this.#handlers.get(event) ?? []) fn(...args);
  }
~~~

نفكّه من جوه لبرّه:

1. [[...args]] في تعريف الدالة اسمها **rest**: بتلم كل الـ arguments اللي بعد [[event]] في array. فـ [[emit("add", "mug")]] تبقى [[args = ["mug"]]].
2. [[this.#handlers.get(event)]]: الـ Set بتاع الحدث، أو [[undefined]].
3. [[?? []]]: الـ [[??]] اسمها nullish coalescing: لو اللي على الشمال [[null]] أو [[undefined]] خد اللي على اليمين. فلو مفيش مشتركين بنلف على array فاضية ومحصلش حاجة. (جرّبت [[emit("nobody", 1)]] على emitter جديد: مفيش error.)
4. [[for (const fn of ...)]]: لف على كل دالة.
5. [[fn(...args)]]: هنا [[...]] اسمها **spread**: بتفرد الـ array كـ arguments منفصلة. فلو [[emit("sum", 2, 3)]] الدالة بتتنادى [[fn(2, 3)]] (جرّبتها بـ handler بيطبع [[a + b]] وطلع [[sum 5]]).

> نفس الرمز [[...]]: في **تعريف** الدالة بيلم (rest)، وفي **النداء** بيفرد (spread).

### لو handler رمى error

الـ emit بينادي الدوال واحدة ورا التانية في نفس اللحظة. لو أول واحدة رمت error:

~~~text الناتج (handler أول بيرمي، وتاني بيطبع)
e.on("x", () => { throw new Error("boom"); });
                  ^

Error: boom
    at Emitter.emit (...ee2.js:12:55)
~~~

الـ handler التاني عمره ما اتنادى، والسطر اللي بعد [[emit]] كمان مشتغلش، لأن الـ error طلع لحد اللي نادى emit. ده بالظبط اللي التمرين بيطلب منك تصلّحه.

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
            "الكلاس.",
            "private: Map من اسم الحدث لـ Set دوال.",
            "اشتراك.",
            "أول مرة للحدث ده: اعمل Set.",
            "ضيف الدالة.",
            "رجّع دالة بتلغي الاشتراك.",
            "قفلة.",
            "إلغاء اشتراك.",
            R`امسح لو موجود، و [[?.]] لو الحدث ملوش مشتركين.`,
            "قفلة.",
            "إعلان.",
            R`نادي كل المشتركين بالـ arguments، و [[?? []]] لو مفيش.`,
            "قفلة.",
            "اشتراك لمرة واحدة.",
            "wrapper بيشيل نفسه وبعدين ينادي الأصلي.",
            "رجّع الإلغاء برضه.",
            "قفلة.",
            "قفلة الكلاس.",
            "instance.",
            "اشترك واحفظ دالة الإلغاء.",
            "اشتراك لمرة واحدة.",
            "الاتنين بيشتغلوا.",
            "الغي الأول.",
            "محدش بيسمع دلوقتي: مفيش حاجة بتتطبع."
          ],
          sol: R`[[listenerCount]] بترجّع [[this.#handlers.get(event)?.size ?? 0]]. في المثال قبل الـ emit بترجّع 2، وبعده 1 (الـ once شالت نفسها)، وبعد unsubscribe بترجّع 0، وآخر [[emit("add", "cap")]] مبيطبعش حاجة.

لو أول handler رمى error من غير try/catch: الـ loop بتقف، الـ handlers اللي بعده مبتشتغلش، والـ error بيطلع لحد اللي نادى emit. بعد ما تلف كل نداء بـ try/catch جوه emit، الباقي بيشتغل عادي والـ error بيتسجل بس. و [[EventTarget]] المدمج بيعمل كده لوحده: [[dispatchEvent]] بيكمّل على باقي الـ listeners وبيبلّغ الـ error كـ uncaught (في Console أحمر) من غير ما يوقف اللي بعده، والـ detail بيوصل في [[e.detail]].`,
          solCode: R`emit(event, ...args) {
  for (const fn of this.#handlers.get(event) ?? []) {
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
    for (const fn of this.#handlers.get(event) ?? []) fn(...args);
  }
  once(event, fn) {
    const off = this.on(event, (...args) => { off(); fn(...args); });
    return off;
  }
  listenerCount(event) {}
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
test("handler بيرمي error: اللي بعده بيشتغل، و emit مبترميش", () => {
  const e = new Emitter(), got = [];
  e.on("x", () => { throw new Error("boom"); });
  e.on("x", (v) => got.push(v));
  e.emit("x", 42);
  expect(got).toEqual([42]);
});
test("الـ arguments بتوصل للـ handlers", () => {
  const e = new Emitter();
  let sum = 0;
  e.on("add", (a, b) => (sum = a + b));
  e.emit("add", 2, 3);
  expect(sum).toBe(5);
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
    for (const fn of this.#handlers.get(event) ?? []) {
      try {
        fn(...args);
      } catch (err) {
        console.error($__bthandler لـ "$__{event}" وقع:$__bt, err.message);
      }
    }
  }
  once(event, fn) {
    const off = this.on(event, (...args) => { off(); fn(...args); });
    return off;
  }
  listenerCount(event) {
    return this.#handlers.get(event)?.size ?? 0;
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
            "state متداخلة.",
            "state جديدة.",
            "انسخ المستوى الأول.",
            R`[[items]] جديدة: العنصر المطلوب نسخة معدّلة، والباقي زي ما هو.`,
            "قفلة.",
            "user متغيرش فمتشارك.",
            "items اتغيرت فجديدة.",
            "العنصر التاني متغيرش فمتشارك.",
            R`مسح immutable: [[filter]].`,
            R`إضافة immutable: spread بدل push.`,
            "object متجمّد.",
            "التعديل مبيحصلش.",
            "بس اللي جوه مش متجمّد."
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
            R`[[function*]]: generator.`,
            R`كل [[yield]] قيمة، والدالة بتوقف لحد ما حد يطلب اللي بعدها.`,
            "قفلة.",
            "spread بيطلب كل القيم.",
            "generator object، لسه مشتغلش.",
            "أول next: شغّل لحد أول yield.",
            "التانية.",
            R`خلص: [[done: true]].`,
            "object عادي هنخليه iterable.",
            "الداتا.",
            R`method اسمها [[Symbol.iterator]] وهي generator، و [[yield*]] بيطلّع عناصر array.`,
            "قفلة.",
            "for...of شغال عليه.",
            "iterator helpers: lazy، فالـ Infinity مش مشكلة.",
            "async generator بيلف على API بصفحات.",
            "لف لحد ما مفيش صفحة جاية.",
            "هات الصفحة.",
            "طلّع عناصرها.",
            "اللينك بتاع الصفحة الجاية.",
            "قفلة.",
            "قفلة."
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
        }
      ]
    }
]);
