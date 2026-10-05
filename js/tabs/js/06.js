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
    },
    {
      t: "APIs المتصفح",
      l: 3,
      n: "IntersectionObserver و ResizeObserver، ورفع الملفات بمعاينة و progress، ودورة حياة الصفحة و bfcache، و pushState",
      items: [
        {
          cmd: "IntersectionObserver",
          title: "تعرف إن عنصر ظهر على الشاشة إزاي؟ (infinite scroll و reveal)",
          desc: R`[[IntersectionObserver]] بيقولك لما عنصر يدخل أو يخرج من الشاشة (أو من عنصر أب بيعمل scroll)، من غير ما تسمع لـ [[scroll]] وتحسب المقاسات بنفسك. بتعمله مرة بـ callback وخيارات، وبعدين [[observe(el)]] لأي عدد عناصر.

أشهر استخدامين: infinite scroll (عنصر فاضي في آخر الليستة اسمه sentinel، أول ما يقرّب من الشاشة حمّل الصفحة الجاية)، وأنيميشن عند الظهور (ضيف كلاس لما الكارت يظهر، وبطّل تراقبه). و [[rootMargin: "300px"]] بيوسّع منطقة الشاشة ٣٠٠ بكسل، فالتحميل يبدأ قبل ما اليوزر يوصل للآخر. و [[threshold: 0.2]] يعني «لما ٢٠٪ من العنصر يظهر».`,
          example: R`const feed = document.querySelector("#feed");
const sentinel = document.querySelector("#sentinel");
let page = 1, loading = false, done = false;
async function loadMore() {
  if (loading || done) return;
  loading = true;
  try {
    const res = await fetch($__bt/api/posts?page=$__{page}$__bt);
    const posts = await res.json();
    if (posts.length === 0) done = true;
    for (const p of posts) {
      const li = document.createElement("li");
      li.textContent = p.title;
      feed.append(li);
    }
    page++;
  } finally {
    loading = false;
  }
  if (!done) { io.unobserve(sentinel); io.observe(sentinel); }
}
const io = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) loadMore();
}, { rootMargin: "300px" });
io.observe(sentinel);
const reveal = new IntersectionObserver((entries, obs) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    e.target.classList.add("visible");
    obs.unobserve(e.target);
  }
}, { threshold: 0.2 });
document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));`,
          try: R`اعمل صفحة فيها [[<ul id="feed">]] وبعدها [[<div id="sentinel">]]، واستبدل الـ fetch بـ [[https://jsonplaceholder.typicode.com/posts?_page=$__{page}&_limit=5]]. افتح Network وانزل: الطلبات بتحصل إمتى؟ وبعدين شيل سطر [[unobserve/observe]] وخلي الـ limit 2 على شاشة كبيرة: التحميل بيكمّل لوحده ولا بيقف؟`,
          flag: "script",
          deep: {
            why: "الطريقة القديمة: [[scroll]] listener بيشتغل عشرات المرات في الثانية، وجواه [[getBoundingClientRect()]] لكل عنصر، وده بيجبر المتصفح يحسب الـ layout كل مرة (layout thrashing، تاب HTML و CSS) فالـ scroll يقطّع على الموبايل. IntersectionObserver بيعمل الحساب ده جوه المتصفح بكفاءة ويناديك بس لما الحالة تتغير.",
            how: R`الـ callback بيتنادى مرة أول ما تعمل observe (بالحالة الحالية)، وبعدين كل ما العنصر يعدّي threshold دخول أو خروج. كل entry فيه [[isIntersecting]] و [[intersectionRatio]] (نسبة الظاهر) و [[target]] و [[boundingClientRect]]. الـ callback بيشتغل async بعد الـ frame، مش أثناء الـ scroll.

الفخ الشهير: لو الصفحة الأولى قصيرة والـ sentinel لسه ظاهر بعد التحميل، مفيش «تغيير» في الحالة (كان ظاهر وفضل ظاهر)، فالـ callback مش هيتنادى تاني والتحميل يقف. [[unobserve]] ثم [[observe]] بيجبره يبعت entry جديد بالحالة الحالية، فلو لسه ظاهر يحمّل الصفحة اللي بعدها.

و [[loading]] بيمنع طلبين مع بعض (الـ callback ممكن يتنادى تاني قبل ما الأول يخلص)، و [[done]] بيوقف لما السيرفر يرجّع ليستة فاضية. و [[finally]] بيضمن إن loading يرجع false حتى لو الطلب فشل.

في الـ reveal: [[unobserve]] بعد أول ظهور عشان الأنيميشن يحصل مرة، ومنراقبش عناصر خلاص. وللصور مش محتاج JS أصلًا: [[<img loading="lazy">]] بيعمل lazy loading لوحده.`,
            when: R`infinite scroll، و lazy loading لحاجات تقيلة (فيديو، خرايط، iframes، charts)، وأنيميشن عند الظهور، وتحديد القسم الحالي في جدول المحتويات، و analytics «الإعلان اتشاف». وفي React فيه hooks جاهزة زي [[react-intersection-observer]]، أو [[useEffect]] + ref (تاب React).`,
            mistakes: R`تنسى الفخ ده فالتحميل يقف على الشاشات الكبيرة. ومفيش حماية من التحميل المزدوج. وتنسى [[disconnect()]] لما الـ component يتشال (memory leak، درس memory leaks). و [[threshold: 1]] على عنصر أطول من الشاشة: عمره ما هيبقى ظاهر ١٠٠٪. وفي infinite scroll: الفوتر بقى مستحيل توصله، وزرار back بيرجّعك لأول الليستة؛ فكّر في زرار «حمّل أكتر» أو احفظ الصفحة في الـ URL.`
          },
          lines: [
            "الليستة.",
            "عنصر فاضي في آخرها: لما يظهر نحمّل.",
            "رقم الصفحة، وحماية من طلبين مع بعض، ووقفة لما الداتا تخلص.",
            "دالة التحميل.",
            "بيحمّل فعلًا أو خلصنا: متعملش حاجة.",
            "علّم إننا بنحمّل.",
            R`[[try/finally]] عشان loading يرجع false مهما حصل.`,
            "الصفحة الحالية.",
            "حوّل الرد لـ array.",
            "ليستة فاضية: مفيش أكتر.",
            "ضيف كل بوست.",
            "عنصر لكل بوست.",
            "بـ textContent: آمن.",
            "ضيفه.",
            "قفلة.",
            "الصفحة الجاية المرة الجاية.",
            R`[[finally]]: بيتنفذ في النجاح والفشل.`,
            "افتح الباب لتحميل جديد.",
            "قفلة.",
            R`الفخ: لو الـ sentinel لسه ظاهر، الـ observer مش هيبلّغ تاني. ده بيجبره يبلّغ بالحالة الحالية.`,
            "قفلة.",
            "الـ observer.",
            R`[[isIntersecting]]: الـ sentinel دخل المنطقة.`,
            R`[[rootMargin]]: ابدأ قبل الآخر بـ ٣٠٠ بكسل.`,
            "ابدأ المراقبة (وبيتنادى مرة فورًا بالحالة الحالية).",
            "observer تاني للأنيميشن.",
            "ممكن كذا عنصر في نفس الـ callback.",
            "مش ظاهر: عدّي.",
            R`ضيف الكلاس (والـ CSS فيه transition).`,
            "بطّل تراقبه: الأنيميشن مرة واحدة.",
            "قفلة.",
            "لما ٢٠٪ منه يظهر.",
            R`راقب كل العناصر اللي عليها [[.reveal]].`
          ],
          sol: R`الطلبات بتحصل قبل ما توصل للآخر بشوية (الـ 300px)، وكل طلب بيضيف ٥ عناصر. ولما [[_page]] يعدّي 20 (١٠٠ بوست ÷ ٥) السيرفر بيرجّع [[[]]] فـ [[done = true]] والطلبات تقف.

من غير سطر [[unobserve/observe]] وبـ limit 2 على شاشة كبيرة: بيحمّل الصفحة الأولى، والعنصرين مش مالين الشاشة، فالـ sentinel لسه ظاهر، وبيقف هنا. ولو عملت scroll بسيط لفوق ولتحت يحمّل تاني (لأن الحالة اتغيرت). ده بالظبط الـ bug اللي بيظهر على الشاشات الكبيرة بس ومحدش بيلاحظه على اللابتوب. مع السطر، بيحمّل لوحده لحد ما الشاشة تتملي.`
        },
        {
          cmd: "ResizeObserver",
          title: "مكوّن يتصرف حسب مقاسه هو، مش مقاس الشاشة",
          desc: R`[[ResizeObserver]] بيناديك لما عنصر يتغير مقاسه، مهما كان السبب: الشاشة اتغيرت، أو sidebar اتقفل، أو المحتوى زاد. [[window.resize]] بيعرف مقاس الشاشة بس، والكارت ممكن يكون في عمود ضيق على شاشة كبيرة.

الـ entry فيه [[contentBoxSize[0].inlineSize]] (العرض) و [[blockSize]] (الطول)، وفيه [[contentRect]] الأقدم بـ [[width]] و [[height]].

قبل ما تكتب JS: لو كل اللي عايزه تغيير شكل حسب عرض الأب، [[@container]] في CSS بيعمل ده من غير JS (درس «container queries» في تاب HTML و CSS). ResizeObserver للحاجات اللي CSS ميقدرش عليها: canvas، و charts، وحساب عدد عناصر، ومحرر نص.`,
          example: R`const card = document.querySelector(".card");
const ro = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const width = entry.contentBoxSize[0].inlineSize;
    entry.target.dataset.size = width < 400 ? "s" : width < 700 ? "m" : "l";
  }
});
ro.observe(card);
const canvas = document.querySelector("canvas");
new ResizeObserver(([entry]) => {
  const { width, height } = entry.contentRect;
  canvas.width = Math.round(width * devicePixelRatio);
  canvas.height = Math.round(height * devicePixelRatio);
  draw();
}).observe(canvas.parentElement);
function draw() {
  const ctx = canvas.getContext("2d");
  ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);
}`,
          try: R`حط الكارت جوه div عرضه [[resize: horizontal; overflow: auto]] عشان تقدر تسحبه بالماوس، واكتب CSS لـ [[.card[data-size="s"]]] يخلي الصورة فوق النص. اسحب وشوف الـ data-size بيتغير في Elements. وبعدين اعمل نفس الشكل بـ [[container-type: inline-size]] و [[@container (width < 400px)]] من غير JS. أنهي أسهل؟`,
          flag: "script",
          deep: {
            why: "الـ components بقت بتتحط في أماكن مختلفة: نفس الكارت في grid بـ ٤ أعمدة وفي sidebar ضيق. الـ media queries بتسأل عن الشاشة، والسؤال الصح «أنا عرضي كام». و canvas بالذات لازم تعرف مقاسه بالبكسل الحقيقي وإلا الرسمة تبقى مغبشة.",
            how: R`المتصفح بيحسب المقاسات في الـ layout، وبعده (قبل الرسم) بيبعت للـ ResizeObservers التغييرات مرة في الـ frame. فمفيش حاجة زي resize event بيتنادى ١٠٠ مرة، ومش محتاج debounce غالبًا.

[[contentBoxSize]] array لأن عنصر ممكن يتقسم (multi-column)، وعادةً [[[0]]]. و [[inlineSize]] العرض في الكتابة الأفقية (عربي أو إنجليزي). و [[borderBoxSize]] لو عايز المقاس بالـ padding والـ border.

الـ canvas له مقاسين: الـ CSS (بيتحكم فيه الـ layout) والداخلي [[canvas.width]] (عدد البكسلات). لو الداخلي أقل، الرسمة بتتمط وتغبش. [[devicePixelRatio]] بـ 2 أو 3 على شاشات الموبايل، فبنضرب فيه. وتغيير [[canvas.width]] بيمسح الرسمة، فلازم [[draw()]] بعده.

لو غيّرت جوه الـ callback حاجة بتغيّر مقاس نفس العنصر، ممكن تدخل loop، والمتصفح بيوقفها ويطبع [[ResizeObserver loop completed with undelivered notifications]] في الـ console. غالبًا مش خطر بس معناه إن التصميم بيتذبذب.`,
            when: R`charts و canvas و محررات، و virtualized lists (تحسب كام صف يظهر)، و «اعرض ٣ tags والباقي +2». ولتغيير الشكل بس: container queries أولًا.`,
            mistakes: R`ResizeObserver لحاجة CSS يقدر عليها. وتنسى [[ro.disconnect()]] لما العنصر يتشال. وتغيّر مقاس العنصر المراقب جوه الـ callback (loop). و [[canvas.width = el.clientWidth]] من غير devicePixelRatio فالرسمة مغبشة على الموبايل.`
          },
          lines: [
            "الكارت.",
            "observer واحد ينفع لكذا عنصر.",
            "كل عنصر اتغير مقاسه.",
            "العرض الجديد.",
            R`[[data-size]] يستخدمه الـ CSS: [[.card[data-size="s"]]].`,
            "قفلة الـ loop.",
            "قفلة.",
            "ابدأ المراقبة.",
            "canvas.",
            R`راقب الأب، و [[[entry]]] بتاخد أول entry.`,
            "مقاسه بالـ CSS pixels.",
            R`بالبكسلات الحقيقية: [[devicePixelRatio]] 2 أو 3 على الموبايل.`,
            "والطول.",
            "تغيير المقاس بيمسح الرسمة، فارسم تاني.",
            "راقب أب الـ canvas.",
            "رسمة بسيطة.",
            "الـ context بتاع الرسم 2D.",
            "ربع المساحة.",
            "قفلة."
          ],
          sol: R`لما تسحب الـ div تحت 400px الـ [[data-size]] يبقى [["s"]] والـ CSS يقلب الترتيب، وبين 400 و 700 [["m"]]. التغيير بيحصل مع السحب نفسه من غير تأخير ومن غير debounce.

نسخة CSS: [[.wrap { container-type: inline-size }]] على الأب، و [[@container (width < 400px) { .card { flex-direction: column } }]]. نفس النتيجة، ومفيش JS، وبتشتغل قبل ما الـ JS يتحمّل (من غير flash). عشان كده للشكل استخدم CSS، وخلي ResizeObserver للحاجات اللي محتاجة رقم في JS (الـ canvas مثلًا).`
        },
        {
          cmd: "input type=file",
          title: "تختار صور وتعاينها قبل الرفع إزاي؟",
          desc: R`[[<input type="file">]] بيفتح اختيار الملفات. [[accept="image/png,image/jpeg,image/webp"]] أو [[accept="image/*"]] بيفلتر اللي يظهر (اقتراح بس، اليوزر يقدر يختار أي حاجة)، و [[multiple]] يسمح بأكتر من ملف، وعلى الموبايل [[capture="environment"]] بيفتح الكاميرا.

[[input.files]] ليستة [[File]]: كل واحد فيه [[name]] و [[size]] (بالبايت) و [[type]] (MIME زي [["image/png"]]). و [[URL.createObjectURL(file)]] بيعمل URL مؤقت ([[blob:...]]) تحطه في [[img.src]] فتعرض الصورة من غير ما ترفعها، وبعد ما تخلص [[URL.revokeObjectURL(url)]] عشان الذاكرة.`,
          example: R`// HTML: <input type="file" id="pics" accept="image/png,image/jpeg,image/webp" multiple> <div id="preview"></div>
const input = document.querySelector("#pics");
const preview = document.querySelector("#preview");
const MAX = 2 * 1024 * 1024;
let urls = [];
input.addEventListener("change", () => {
  urls.forEach((u) => URL.revokeObjectURL(u));
  urls = [];
  preview.replaceChildren();
  for (const file of input.files) {
    if (!file.type.startsWith("image/")) continue;
    if (file.size > MAX) {
      preview.append($__bt$__{file.name}: أكبر من 2MB. $__bt);
      continue;
    }
    const url = URL.createObjectURL(file);
    urls.push(url);
    const img = document.createElement("img");
    img.src = url;
    img.alt = file.name;
    img.width = 120;
    preview.append(img);
  }
});`,
          try: R`اختار ٣ صور منهم واحدة أكبر من 2MB وملف PDF (غيّر الـ accept لـ [[*/*]] عشان يظهر). إيه اللي اتعرض؟ وبعدين غيّر اسم ملف [[.txt]] لـ [[.png]] واختاره: [[file.type]] بيقول إيه؟ وآخر حاجة: اعرض تحت كل صورة حجمها بالـ KB ومقاسها بالبكسل ([[img.naturalWidth]] بعد [[img.onload]]).`,
          flag: "script",
          deep: {
            why: "صورة بروفايل، وصور منتجات، ومرفقات. المعاينة قبل الرفع بتوفر وقت اليوزر والباندويدث، والفحص في المتصفح بيقول «الملف كبير» فورًا بدل ما يستنى رفع ٢٠ ميجا يترفض في الآخر.",
            how: R`[[File]] نوع من [[Blob]] (داتا binary) ومعاه اسم وتاريخ تعديل. المتصفح مبيقراش الملف لما تختاره، بيدّيك reference بس. [[createObjectURL]] بيربط الـ reference ده بـ URL جوه الصفحة، فالـ img بيقرا من الديسك مباشرة، وده أسرع وأخف من [[FileReader.readAsDataURL]] (اللي بيحوّل الملف كله نص base64 في الذاكرة، أكبر بحوالي الثلث).

كل URL بيفضل شايل الملف في الذاكرة لحد ما تعمل revoke أو الصفحة تتقفل، فلو اليوزر اختار صور ١٠ مرات من غير revoke، الذاكرة بتتراكم.

[[file.type]] المتصفح بيخمّنه من الامتداد (مش من محتوى الملف)، و [[accept]] اقتراح لنافذة الاختيار. يعني الاتنين للراحة (UX) مش للأمان. السيرفر لازم يفحص الحجم وأول bytes في الملف (magic bytes) ويعيد تسمية الملف (درس «multer» في تاب Backend بـ Node، و «presigned URL» في تاب Cloud و DevOps). ولو عايز تصغّر الصورة قبل الرفع: ارسمها على canvas بمقاس أصغر و [[canvas.toBlob(cb, "image/webp", 0.8)]].`,
            when: R`أي رفع ملفات. و [[multiple]] للمعارض والمرفقات. والتصغير في المتصفح للصور الكبيرة من الموبايل (١٢ ميجا بكسل) قبل ما ترفعها.`,
            mistakes: R`تعتمد على accept أو file.type كأمان. و createObjectURL من غير revoke. و FileReader base64 لملفات كبيرة. وتعرض [[file.name]] بـ innerHTML (اسم الملف input من اليوزر: [["<img onerror=...>.png"]] اسم ملف قانوني). وتنسى إن اختيار نفس الملف مرتين مش بيطلق [[change]] (اعمل [[input.value = ""]] بعد ما تخلص).`
          },
          lines: [
            "الـ input.",
            "مكان المعاينة.",
            "٢ ميجا بالبايت.",
            "الـ URLs المؤقتة عشان نمسحها بعدين.",
            R`[[change]]: اليوزر اختار ملفات.`,
            "امسح الـ URLs القديمة من الذاكرة.",
            "وفضّي الليستة.",
            "وامسح المعاينات القديمة.",
            R`[[input.files]]: ليستة File.`,
            R`مش صورة (الـ accept اقتراح بس): عدّي.`,
            R`[[size]] بالبايت.`,
            R`رسالة كنص: [[append]] بنص آمن زي textContent.`,
            "وكمّل للملف اللي بعده.",
            "قفلة.",
            R`[[blob:...]]: الصورة من الديسك من غير رفع.`,
            "احفظه عشان revoke.",
            "img جديد.",
            "الـ src هو الـ blob URL.",
            "alt باسم الملف (property مش HTML، فآمن).",
            "عرض المعاينة.",
            "اعرضه.",
            "قفلة الـ loop.",
            "قفلة."
          ],
          sol: R`الصورتين الصغيرين بيظهروا، والكبيرة بيظهر مكانها «اسمها: أكبر من 2MB.»، والـ PDF مش بيظهر خالص (اتنط بـ continue لأن type بتاعه [["application/pdf"]]).

الـ [[.txt]] اللي اسمه [[.png]]: [[file.type]] بـ [["image/png"]]، والـ img بيظهر مكسور. ده الدليل إن النوع جاي من الامتداد، ودي بالظبط الحركة اللي حد هيعملها عشان يرفع حاجة مش صورة على السيرفر بتاعك.

الحجم: [[(file.size / 1024).toFixed(0) + " KB"]]، والمقاس لازم يستنى التحميل: [[img.onload = () => caption.textContent += $__bt $__{img.naturalWidth}×$__{img.naturalHeight}$__bt]]. قبل الـ onload الـ naturalWidth بـ 0.`
        },
        {
          cmd: "drag and drop و progress",
          title: "تسحب ملف وترفعه بشريط تقدم إزاي؟",
          desc: R`السحب والإفلات: على العنصر اللي هيستقبل اسمع لـ [[dragover]] واعمل [[preventDefault()]] (من غيرها المتصفح مش هيسمح بالإفلات هنا وهيفتح الملف في التاب)، و [[drop]] واعمل [[preventDefault()]] واقرا [[e.dataTransfer.files]] (نفس نوع [[input.files]]). و [[dragenter]] و [[dragleave]] عشان تغيّر الشكل.

شريط التقدم: [[XMLHttpRequest]] عنده [[xhr.upload.onprogress]] بيقولك اترفع كام byte من كام. [[fetch]] مفيهوش حدث تقدم للرفع. فلحد النهارده لو عايز progress bar للرفع بتستخدم XHR (أو مكتبة زي axios، اللي هي XHR من تحت في المتصفح).`,
          example: R`const zone = document.querySelector("#drop");
const bar = document.querySelector("progress");
zone.addEventListener("dragover", (e) => {
  e.preventDefault();
  zone.classList.add("over");
});
zone.addEventListener("dragleave", () => zone.classList.remove("over"));
zone.addEventListener("drop", (e) => {
  e.preventDefault();
  zone.classList.remove("over");
  for (const file of e.dataTransfer.files) upload(file);
});
function upload(file) {
  const fd = new FormData();
  fd.append("file", file);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/upload");
  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) bar.value = e.loaded / e.total;
  };
  xhr.onload = () => console.log(xhr.status, xhr.responseText);
  xhr.onerror = () => console.log("النت وقع");
  xhr.send(fd);
}`,
          try: R`اعمل سيرفر Express صغير فيه [[POST /api/upload]] بـ multer (تاب Backend بـ Node)، وافتح DevTools ← Network ← Throttling ← «Slow 4G»، واسحب صورة ٥ ميجا. الشريط بيتحرك؟ وبعدين زوّد زرار «إلغاء» بيعمل [[xhr.abort()]]، و keyboard fallback: الـ zone يبقى [[<label>]] فيه [[<input type="file">]] مخفي، عشان اللي مبيستخدمش ماوس.`,
          flag: "script",
          deep: {
            why: "رفع ملف كبير على نت بطيء من غير أي مؤشر، اليوزر بيفتكر إن الموقع علّق فيعمل refresh ويضيّع الرفع. والسحب والإفلات متوقع في أي dashboard أو محرر.",
            how: R`[[dragover]] بيتنادى كل كام ملّي ثانية وانت ساحب فوق العنصر، و [[preventDefault]] فيه هي اللي بتقول للمتصفح «العنصر ده بيقبل drop». [[dragleave]] بيحصل كمان لما تعدّي فوق عنصر ابن جوه الـ zone، فالشكل ممكن يرمش؛ الحل عداد بـ dragenter/dragleave أو [[pointer-events: none]] على الأبناء وقت السحب.

XHR بيبعت الـ body وبيطلق [[upload.progress]] كل ما جزء يخرج من الجهاز. [[lengthComputable]] بتبقى true لما الحجم الكلي معروف (مع FormData و File دايمًا معروف). والتقدم ده «اتبعت من الجهاز»، مش «السيرفر حفظه»؛ بعد ١٠٠٪ لسه فيه وقت لحد [[onload]].

ليه fetch لأ؟ [[fetch]] بيدّيك download progress عن طريق [[res.body.getReader()]] (تقرا الرد chunk chunk). بس الرفع: المواصفات فيها streaming request body ([[body: ReadableStream]] مع [[duplex: "half"]])، وده مدعوم في Chromium بس ومحتاج HTTP/2، وحتى معاه اللي بتعدّه هو اللي الـ stream بتاعك سلّمه للمتصفح مش اللي وصل للشبكة فعلًا. فمفيش طريقة بسيطة ومضمونة. عشان كده XHR لسه موجود ومش deprecated.

للملفات الكبيرة (فيديو): ارفع مباشرة لـ S3/R2 بـ presigned URL من غير ما تعدّي على سيرفرك (بـ XHR PUT برضه عشان الـ progress)، أو multipart/resumable uploads (tus) عشان لو النت قطع تكمّل.`,
            when: R`أي رفع أكبر من كام ميجا، أو على موبايل. والسحب للـ dashboards والمحررات، مع input عادي دايمًا.`,
            mistakes: R`تنسى preventDefault في dragover فالمتصفح يفتح الصورة بدل ما يرفعها. و progress بـ fetch. وتحط [[Content-Type]] بإيدك مع FormData. وتعتبر ١٠٠٪ نجاح قبل ما [[onload]] يقول status 200. ومفيش بديل للكيبورد والموبايل (السحب مش شغال على iOS Safari من الملفات). وفي الانترفيو: «إزاي تعمل progress bar لرفع ملف؟» الإجابة XHR upload.onprogress، وليه fetch مبيعملهاش.`
          },
          lines: [
            "منطقة الإفلات.",
            R`[[<progress>]]: قيمته من 0 لـ 1.`,
            "وانت ساحب فوقها.",
            R`لازم: من غيرها الـ drop مش هيحصل.`,
            "شكل «سيبه هنا».",
            "قفلة.",
            "خرج برّه: رجّع الشكل.",
            "أفلت.",
            "امنع المتصفح يفتح الملف.",
            "رجّع الشكل.",
            R`[[dataTransfer.files]]: نفس [[input.files]].`,
            "قفلة.",
            "الرفع.",
            "multipart body.",
            R`الملف تحت اسم [[file]] (زي ما multer مستنيه).`,
            "XHR عشان الـ progress.",
            "POST على الـ endpoint.",
            R`[[upload.onprogress]]: اترفع كام من كام.`,
            "حدّث الشريط.",
            "قفلة.",
            R`[[onload]]: السيرفر رد (ممكن 4xx، افحص status).`,
            R`[[onerror]]: مشكلة شبكة.`,
            "ابعت.",
            "قفلة."
          ],
          sol: R`مع Slow 4G والـ ٥ ميجا الشريط بيتحرك تدريجيًا على مدار ثواني، وبعد ما يوصل ١٠٠٪ فيه لحظة لحد ما [[onload]] يطبع [[200]] والرد (السيرفر لسه بيكتب الملف).

الإلغاء: خزّن الـ xhr في متغير برّه، والزرار [[xhr.abort()]]، واسمع لـ [[xhr.onabort]] ورجّع الشريط 0. في Network الطلب هيظهر «(canceled)».

الـ fallback: [[<label id="drop"><input type="file" hidden multiple> اسحب هنا أو اضغط للاختيار</label>]]، والضغط على الـ label بيفتح اختيار الملفات لوحده، و [[change]] على الـ input بتنادي نفس [[upload]]. كده الكيبورد (Tab ثم Enter) والموبايل شغالين.`
        },
        {
          cmd: "visibilitychange و bfcache",
          title: "تعرف إن اليوزر ساب الصفحة أو رجعلها إزاي؟",
          desc: R`[[visibilitychange]]: الصفحة بقت مخفية (اليوزر غيّر التاب، أو صغّر، أو قفل الشاشة، أو ساب التطبيق على الموبايل) أو ظهرت تاني. ده آخر حدث مضمون تقريبًا على الموبايل، فأي حفظ مسودة أو إرسال analytics يبقى هنا، بـ [[navigator.sendBeacon]] اللي بيبعت حتى لو الصفحة بتتقفل.

[[beforeunload]]: الحدث اللي يطلّع «متأكد إنك عايز تخرج؟». استخدمه بس لما فيه تغييرات مش محفوظة، وشيله أول ما تتحفظ.

وbfcache (back/forward cache): لما اليوزر يضغط back، المتصفح بيرجّع الصفحة زي ما هي من الذاكرة (JS و state و scroll) من غير تحميل. [[pageshow]] بـ [[e.persisted === true]] بيقولك إنها رجعت من الـ bfcache، فحدّث الداتا اللي ممكن تكون قدمت.`,
          example: R`const form = document.querySelector("#post-form");
function warn(e) {
  e.preventDefault();
  e.returnValue = "";
}
form.addEventListener("input", () => window.addEventListener("beforeunload", warn));
form.addEventListener("submit", () => window.removeEventListener("beforeunload", warn));
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "hidden") return;
  const draft = JSON.stringify(Object.fromEntries(new FormData(form)));
  navigator.sendBeacon("/api/draft", draft);
});
window.addEventListener("pageshow", (e) => {
  if (e.persisted) console.log("رجعت من الـ bfcache: حدّث السلة والإشعارات");
});
window.addEventListener("pagehide", (e) => console.log("pagehide، هتتحفظ في bfcache؟", e.persisted));`,
          try: R`افتح الصفحة، واكتب في الفورم، وجرّب تقفل التاب: الرسالة ظهرت؟ اعمل submit وجرّب تاني. وبعدين روح لصفحة تانية وارجع بـ back وبص على Console (فعّل Preserve log). وآخر حاجة: DevTools ← Application ← Back/forward cache ← «Test back/forward cache»: الصفحة eligible؟ ولو لأ، إيه السبب اللي بيقوله؟`,
          flag: "script",
          deep: {
            why: "اليوزر كتب بوست طويل وقفل التاب بالغلط. أو فتح الموبايل بعد ساعة ولقى السلة قديمة. أو الـ analytics بتقول إن نص الزيارات «ملهاش نهاية». كل ده دورة حياة الصفحة، وأغلب المواقع بتتعامل معاها غلط بـ [[unload]].",
            how: R`[[beforeunload]]: [[preventDefault()]] هي الطريقة الحديثة، و [[returnValue = ""]] للمتصفحات القديمة. والرسالة نفسها بتاعة المتصفح ومتقدرش تغيّرها. وبيطلع بس لو اليوزر اتفاعل مع الصفحة قبل كده. وإضافة الـ listener بس وقت الحاجة مهمة لأن وجود beforeunload طول الوقت بيمنع الـ bfcache في بعض المتصفحات (Firefox مثلًا).

[[unload]] متستخدمهاش: مش بتتنادى بشكل موثوق على الموبايل (النظام بيقفل التطبيق من غير ما يسأل)، ووجودها بيمنع الـ bfcache، و Chrome بيلغيها تدريجيًا. البديل [[visibilitychange]] (hidden) للحفظ، و [[pagehide]] لو محتاج لحظة الخروج نفسها.

[[sendBeacon(url, data)]] بيبعت POST صغير (حوالي 64KB كحد) والمتصفح بيكمّله حتى لو الصفحة اتقفلت، ومبيرجّعش رد. البديل الحديث [[fetch(url, { method: "POST", body, keepalive: true })]].

الـ bfcache بيجمّد الصفحة كلها: الـ timers واقفة، والـ promises متعلقة، ولما ترجع بتكمّل. أسباب إن الصفحة متدخلوش: [[unload]] listener، أو WebSocket أو IndexedDB transaction مفتوحين، أو (تاريخيًا) [[Cache-Control: no-store]] على الـ HTML. والـ DevTools test بيقولك السبب بالظبط.`,
            when: R`حفظ مسودات، و analytics نهاية الزيارة، و pause للفيديو والـ polling لما التاب مخفي (توفير بطارية وrequests)، وتحديث داتا حساسة للوقت لما الصفحة ترجع (سلة، رصيد، إشعارات).`,
            mistakes: R`[[unload]] لأي حاجة. و beforeunload متسجل على طول. و [[fetch]] عادي في visibilitychange من غير keepalive فيتلغي. وتفترض إن الصفحة «فتحت من جديد» لما اليوزر يرجع بـ back فمتحدّثش الداتا. و polling شغال في تاب مخفي طول اليوم.`
          },
          lines: [
            "الفورم.",
            "دالة التحذير (باسم عشان نقدر نشيلها).",
            "الطريقة الحديثة.",
            "للمتصفحات القديمة.",
            "قفلة.",
            "أول ما يكتب: فعّل التحذير (إضافة نفس الدالة مرتين مبتعملش حاجة).",
            "اتحفظ: شيل التحذير.",
            "التاب اتخفى أو ظهر.",
            "يهمنا لما يتخفى بس.",
            "المسودة كـ JSON.",
            R`[[sendBeacon]]: بيكمّل حتى لو الصفحة اتقفلت.`,
            "قفلة.",
            "الصفحة ظهرت.",
            R`[[persisted]]: رجعت من الـ bfcache، مش تحميل جديد.`,
            "قفلة.",
            R`[[pagehide]] بدل unload.`
          ],
          sol: R`قبل الـ submit: قفل التاب بيطلّع رسالة المتصفح «Leave site?» (أو بالعربي حسب لغة المتصفح)، ونصها ثابت. بعد الـ submit مفيش رسالة لأن الـ listener اتشال. لو مطلعتش خالص، غالبًا مكتبتش حاجة بجد (المتصفح بيطلب تفاعل).

الـ back: Console فيها [[pagehide، هتتحفظ في bfcache؟ true]] وبعد الرجوع [[رجعت من الـ bfcache...]]. ولاحظ إن الـ input لسه فيه اللي كتبته والـ scroll مكانه: ده الـ bfcache.

لو الـ test قال «not eligible» الأسباب الشائعة: listener على [[unload]] (من مكتبة أو analytics)، أو الصفحة مفتوحة من DevTools بطريقة معيّنة، أو WebSocket مفتوح. وفي الحالة دي back بتعمل تحميل كامل و [[persisted]] بـ false.`
        },
        {
          cmd: "pushState و popstate",
          title: "تغيّر الـ URL من غير تحميل صفحة جديدة إزاي؟ (راوتر صغير)",
          desc: R`[[history.pushState(state, "", "/about")]] بيغيّر الـ URL في الشريط ويضيف خطوة في الـ history من غير ما يطلب الصفحة من السيرفر. و [[replaceState]] نفس الكلام بس بيستبدل الخطوة الحالية (للفلاتر والبحث). ومفيش حاجة بتتعرض لوحدها: انت اللي بترسم المحتوى المناسب.

و [[popstate]] بيتنادى لما اليوزر يضغط back أو forward، فتقرا [[location.pathname]] وترسم. ده كل الـ SPA router (React Router و Next.js client navigation) من تحت: اعترض ضغطة اللينك، و pushState، وارسم، واسمع لـ popstate.`,
          example: R`const content = document.querySelector("#content");
const pages = { "/": "الرئيسية", "/about": "عننا", "/contact": "كلمنا" };
function render(path) {
  content.textContent = pages[path] ?? "404: الصفحة مش موجودة";
  document.title = pages[path] ?? "مش موجود";
}
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-link]");
  if (!a || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  const path = new URL(a.href).pathname;
  if (path === location.pathname) return;
  history.pushState({ path }, "", path);
  render(path);
});
window.addEventListener("popstate", () => render(location.pathname));
render(location.pathname);`,
          try: R`اعمل [[index.html]] فيه ٣ لينكات [[<a href="/about" data-link>]] و [[<main id="content">]]، وشغّله بـ [[npx serve -s]] (الـ [[-s]] بيرجّع index.html لأي path). اتنقل، واضغط back و forward، واعمل refresh على [[/about]]. وبعدين شغّله بـ [[npx serve]] من غير [[-s]] واعمل refresh على [[/about]]: إيه اللي حصل؟ وجرّب Ctrl+Click على لينك.`,
          flag: "script",
          deep: {
            why: "تحميل الصفحة كلها مع كل ضغطة بيضيّع الـ state (فيديو شغال، فورم نص مكتوب) وبيحمّل الـ JS والـ CSS تاني. الـ SPA بيغيّر الجزء اللي اتغير بس. بس اليوزر لسه متوقع إن back يشتغل، وإن اللينك يتنسخ ويتبعت، وإن refresh يرجّعه لنفس المكان، و pushState هو اللي بيحافظ على ده.",
            how: R`[[pushState]] بيغيّر [[location]] ويضيف entry في الـ history stack ومبيطلقش أي event. [[popstate]] بيتنادى لما الـ entry الحالي يتغير بـ back/forward (أو [[history.back()]])، مش لما تعمل pushState بنفسك. عشان كده بتنادي [[render]] بإيدك بعد pushState.

الـ [[state]] (أول argument) object بيتحفظ مع الـ entry وبيرجعلك في [[e.state]] وقت popstate، مفيد لحاجات زي مكان الـ scroll. لازم يبقى قابل للنسخ (structured clone): مفيش دوال ولا عناصر DOM.

شرط اللينك: [[e.button !== 0]] (مش الزرار الشمال) وأزرار Ctrl/Cmd/Shift معناها «افتح في تاب جديد»، فسيبها للمتصفح. و [[data-link]] عشان اللينكات الخارجية أو التحميلات تفضل عادية.

السيرفر: لما اليوزر يعمل refresh على [[/about]]، المتصفح بيطلب [[/about]] من السيرفر فعلًا. لو السيرفر مش عارفه هيرد 404. لازم أي path مش ملف يرجّع [[index.html]] (درس «SPA» في تاب Nginx: [[try_files $uri /index.html]]).

وفيه Navigation API الأحدث ([[navigation.addEventListener("navigate", ...)]]) بيعترض كل التنقلات في مكان واحد بدل click و popstate. دعمه اتسع في 2025/2026، بس اتأكد من caniuse قبل ما تعتمد عليه من غير fallback.`,
            when: R`لما تبني SPA صغير من غير framework، أو تحط الفلاتر والتابات في الـ URL ([[replaceState]]). وفي React/Next استخدم الراوتر بتاعهم، بس افهم إن ده اللي تحته.`,
            mistakes: R`تستنى popstate بعد pushState. ومتعملش render في الأول ([[render(location.pathname)]]) فالـ refresh يعرض صفحة فاضية. والسيرفر مش راجع index.html. وتعترض Ctrl+Click. وتنسى [[document.title]] والـ focus (قارئات الشاشة مش هتعرف إن الصفحة اتغيرت: حرّك الـ focus للعنوان الجديد). و pushState لكل حرف في البحث فالـ back يبقى ١٠٠ خطوة (استخدم replaceState).`
          },
          lines: [
            "المكان اللي هنرسم فيه.",
            "الصفحات: path ← محتوى.",
            "ارسم حسب الـ path.",
            R`[[??]] للـ 404.`,
            "والعنوان في التاب.",
            "قفلة.",
            "listener واحد للّينكات كلها (event delegation).",
            R`لينك داخلي عليه [[data-link]].`,
            "مش لينك، أو Ctrl/Cmd/Shift/زرار تاني: سيبه للمتصفح.",
            "امنع التحميل.",
            R`الـ path من اللينك (href بيبقى URL كامل).`,
            "نفس الصفحة: متضيفش خطوة.",
            "غيّر الـ URL وضيف خطوة في الـ history.",
            "ارسم بنفسك: pushState مبيعملش حاجة تانية.",
            "قفلة.",
            R`back/forward: ارسم الـ path الجديد.`,
            "أول تحميل (أو refresh على أي path)."
          ],
          sol: R`مع [[serve -s]]: التنقل من غير تحميل (Network مفيهاش طلبات HTML جديدة)، و back/forward بيغيّروا المحتوى والعنوان، و refresh على [[/about]] بيرجّع «عننا» لأن السيرفر رجّع index.html والسطر الأخير رسم الـ path.

من غير [[-s]]: refresh على [[/about]] بيطلع 404 من السيرفر نفسه، والـ JS بتاعك مشتغلش أصلًا. ده أشهر bug بعد نشر SPA، والحل في السيرفر مش في الـ JS.

Ctrl+Click بيفتح تاب جديد عادي لأن الشرط سابه للمتصفح، والتاب الجديد بيطلب [[/about]] من السيرفر (فمحتاج [[-s]] برضه).`
        }
      ]
    }
]);
