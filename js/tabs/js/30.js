// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "Patterns",
      l: 3,
      n: "module pattern و factory و singleton، و Observer بـ EventEmitter، و immutability، و iterators و generators، و Strategy pattern",
      pre: [
        { to: "js/closure", why: R`الـ module pattern والـ factory والـ store كلهم متغيرات عايشة في closure` },
        { to: "js/class", why: R`الـ Emitter class فيه private field ([[#handlers]])، وده نفس اللي في الدرس ده` },
        { to: "js/import و export", why: R`الـ ES module هو الـ module pattern الحديث، وكل المشاريع هنا ملفات بتعمل import لبعض` },
        { to: "js/Generator: next و return و throw و yield*", why: R`درس iterators و generators هنا بيطبّق اللي اتشرح هناك في patterns حقيقية` },
        { to: "js/async و await", why: R`المشروع الكبير async generator بيجيب صفحات من API ويعيد المحاولة` },
      ],
      projects: [
        { lvl: 'صغير', t: R`مولّد IDs محدش يلعب فيه`, what: R`دالة [[createIdGen(prefix)]] (درس الـ module pattern) العدّاد فيها جوه الـ closure، وبترجّع object فيه [[next()]] و [[peek()]] بس. اعملها مرة كـ factory ومرة كـ ES module فيه [[export]] للدالتين بس، وقارن مين فيهم بيدّيك أكتر من عدّاد.`, done: R`[[users.next()]] بيرجّع [[user-1]] وبعدها [[user-2]]، و [[orders.next()]] بيبدأ من [[order-1]] لوحده، و [[peek()]] مبيزوّدش العدّاد، و [[Object.keys(users)]] مفيهاش العدّاد، ومفيش أي طريقة ترجّعه لصفر من برا.`, sol: R`## الناتج النهائي

~~~text node id-gen.js (Node 24)
user-1 user-2
order-1
peek: user-3 user-3 → next: user-3
keys: [ 'next', 'peek' ]
بعد المحاولة: user-4 | count من برا: undefined
~~~

~~~text node main.mjs
user-1 user-2 user-3
exports: [ 'next', 'peek' ]
TypeError: Cannot add property count, object is not extensible
~~~

**هتشوف إيه:** نسخة factory بتدّيك عدّاد لكل prefix ([[users]] و [[orders]] كل واحد بيعدّ لوحده)، ونسخة ES module فيها عدّاد واحد بس للبرنامج كله. وفي الاتنين مفيش أي طريقة توصل للعدّاد أو تصفّره من برا.

## الكود

~~~js id-gen.js
// نسخة الـ factory: كل نداء = عدّاد جديد
function createIdGen(prefix) {
  let count = 0;
  return Object.freeze({
    next: () => $__bt$__{prefix}-$__{++count}$__bt,
    peek: () => $__bt$__{prefix}-$__{count + 1}$__bt,
  });
}

const users = createIdGen("user");
const orders = createIdGen("order");

console.log(users.next(), users.next());
console.log(orders.next());
console.log("peek:", users.peek(), users.peek(), "→ next:", users.next());
console.log("keys:", Object.keys(users));
users.count = 0;            // مفيش حاجة اسمها count، و freeze بيمنع الإضافة
users.next = () => "hack";  // freeze بيمنع الاستبدال
console.log("بعد المحاولة:", users.next(), "| count من برا:", users.count);
~~~

~~~js id-gen.mjs
// نسخة الـ ES module: عدّاد واحد للبرنامج كله
let count = 0;
const prefix = "user";
export const next = () => $__bt$__{prefix}-$__{++count}$__bt;
export const peek = () => $__bt$__{prefix}-$__{count + 1}$__bt;
~~~

~~~js main.mjs
import * as ids from "./id-gen.mjs";
import { next } from "./id-gen.mjs";

console.log(ids.next(), next(), ids.peek());
console.log("exports:", Object.keys(ids));
try {
  ids.count = 0;
} catch (e) {
  console.log(e.name + ":", e.message);
}
~~~

## الشرح

- **[[let count = 0]] جوه [[createIdGen]]:** عايش في الـ closure بس. [[next]] و [[peek]] هما الوحيدين اللي شايفينه، فـ [[Object.keys(users)]] مفيهاش غيرهم.
- **[[++count]] في [[next]] و [[count + 1]] في [[peek]]:** الأولى بتزوّد وترجّع الجديد، والتانية بتحسب اللي جاي من غير ما تغيّر حاجة. عشان كده [[peek()]] مرتين ورا بعض رجّعت [[user-3]] الاتنين، وبعدها [[next()]] رجّعت نفس الرقم.
- **[[Object.freeze]]:** من غيره حد يقدر يعمل [[users.next = () => "hack"]] ويبدّل الدالة. في الـ script العادي المحاولة اتجاهلت ساكتة ([[users.next()]] رجّعت [[user-4]] مش [["hack"]])، وفي strict mode كانت هترمي [[TypeError]].
- **[[users.count = 0]]:** حتى لو اتكتبت، دي خاصية جديدة على الـ object مش المتغير اللي جوه الـ closure. والـ freeze منع إضافتها أصلًا فـ [[users.count]] لسه [[undefined]].
- **نسخة الـ module:** الـ module بيتنفّذ مرة واحدة، فـ [[ids.next()]] و [[next()]] المستوردة لوحدها بيزوّدوا نفس [[count]] (طلع [[user-1 user-2]]). و [[import * as ids]] بيدّيك «module namespace object» متقفل أصلًا، فـ [[ids.count = 0]] رمى [[TypeError]] (الـ modules دايمًا strict).

## مين بيدّيك أكتر من عدّاد؟

| | factory | ES module |
|---|---|---|
| عدد العدّادات | واحد لكل نداء ([[user]] و [[order]] و...) | واحد بس للبرنامج |
| الـ prefix | بيتبعت كـ argument | ثابت في الملف |
| في الاختبارات | كل تست يعمل واحد جديد يبدأ من 1 | الحالة بتفضل من تست للتاني |
| إمتى | IDs لأكتر من نوع، أو تحتاج تبدأ من الأول | حاجة المفروض تبقى واحدة (رقم الطلب في سيرفر واحد) |

## اللي حصل وإحنا بنبنيه

- أول نسخة كان [[peek]] فيها [[$__bt$__{prefix}-$__{count}$__bt]]، فرجّعت [[user-2]] بعد ما [[next()]] رجّع [[user-2]]، يعني «اللي فات» مش «اللي جاي». الاسم [[peek]] معناه «بص على اللي جاي»، فبقت [[count + 1]].
- جرّبنا [[users.next = ...]] من غير [[freeze]]: الاستبدال نجح وكل [[next()]] بعدها رجّعت [[hack]]. الخصوصية بتاعة الـ closure بتحمي المتغير، بس مش بتحمي الـ object اللي اترجع، فالاتنين مع بعض.

## اتقاس

[[node id-gen.js]] و [[node main.mjs]] على Node 24، والناتج فوق بالظبط.` },
        { lvl: 'صغير', t: R`range كامل بالـ generators`, what: R`[[function* range(start, end, step = 1)]] (درس iterators و generators) بتشتغل للخطوات السالبة كمان، وبترمي [[RangeError]] لو الـ step صفر أو عكس الاتجاه، و [[range(0, Infinity)]] مينفعش يقع في loop لما تاخد منه بـ [[take]].`, done: R`[[Array.from(range(5, 0, -1))]] بيرجّع 5 و 4 و 3 و 2 و 1، و [[range(0, 5, 0)]] و [[range(0, 5, -1)]] بيرموا [[RangeError]] أول ما تبدأ تلف عليهم، و [[range(0, Infinity).take(3).toArray()]] بيرجّع 0 و 1 و 2 على طول.`, sol: R`## الناتج النهائي

~~~text node demo.mjs (Node 24)
[ 0, 1, 2, 3, 4 ]
[ 5, 4, 3, 2, 1 ]
[ 0, 3, 6, 9 ]
[ 0, 0.25, 0.5, 0.75 ]
[ 0, 1, 2 ]
[]
range(0, 5, 0) اتعمل من غير error
  أول next: RangeError: step مينفعش يبقى صفر
range(0, 5, -1) اتعمل من غير error
  أول next: RangeError: step -1 عكس الاتجاه من 0 لـ 5
~~~

~~~text node --test
ℹ tests 6
ℹ pass 6
ℹ fail 0
~~~

**هتشوف إيه:** [[range]] بيعدّ لقدام وورا وبكسور، وبيرفض الـ step الصفر والـ step العكسي بـ [[RangeError]] أول ما تبدأ تلف، و [[range(0, Infinity)]] بيرجّع على طول مع [[take]].

## الكود (٣ ملفات في فولدر واحد)

~~~js range.mjs
export function* range(start, end, step = 1) {
  if (![start, end, step].every((n) => typeof n === "number" && !Number.isNaN(n))) {
    throw new TypeError("start و end و step لازم أرقام");
  }
  if (step === 0) throw new RangeError("step مينفعش يبقى صفر");
  if ((end - start) * step < 0) {
    throw new RangeError($__btstep $__{step} عكس الاتجاه من $__{start} لـ $__{end}$__bt);
  }
  if (step > 0) {
    for (let i = start; i < end; i += step) yield i;
  } else {
    for (let i = start; i > end; i += step) yield i;
  }
}
~~~

~~~js demo.mjs
import { range } from "./range.mjs";

console.log(Array.from(range(0, 5)));
console.log(Array.from(range(5, 0, -1)));
console.log(Array.from(range(0, 10, 3)));
console.log(Array.from(range(0, 1, 0.25)));
console.log(range(0, Infinity).take(3).toArray());
console.log(Array.from(range(3, 3)));

for (const [args, label] of [[[0, 5, 0], "range(0, 5, 0)"], [[0, 5, -1], "range(0, 5, -1)"]]) {
  const it = range(...args);           // لسه مرماش حاجة
  console.log(label, "اتعمل من غير error");
  try { it.next(); } catch (e) { console.log("  أول next:", e.name + ":", e.message); }
}
~~~

~~~js range.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { range } from "./range.mjs";

test("خطوة سالبة", () => assert.deepEqual([...range(5, 0, -1)], [5, 4, 3, 2, 1]));
test("الـ end مش داخل", () => assert.deepEqual([...range(0, 3)], [0, 1, 2]));
test("step صفر بيرمي أول ما تلف", () => assert.throws(() => [...range(0, 5, 0)], RangeError));
test("عكس الاتجاه بيرمي", () => assert.throws(() => [...range(0, 5, -1)], RangeError));
test("Infinity مع take", () => assert.deepEqual(range(0, Infinity).take(3).toArray(), [0, 1, 2]));
test("start = end لستة فاضية", () => assert.deepEqual([...range(3, 3)], []));
~~~

## الشرح

- **[[(end - start) * step < 0]]:** سطر واحد بيقول «الـ step ماشي عكس المسافة». لو المسافة موجبة (0 لـ 5) والـ step سالب، الضرب سالب. ولو الاتنين سالبين (5 لـ 0 بـ -1)، الضرب موجب ويعدّي.
- **loop لكل اتجاه:** [[i < end]] لما بنطلع و [[i > end]] لما بننزل. شرط واحد للاتنين مش هينفع، وده اللي كان بايظ في نسخة الدرس (تحت).
- **الفحص جوه الـ generator:** بيحصل مع أول [[next()]] مش ساعة [[range(...)]]، والـ demo بيوري ده: [[range(0, 5, 0)]] اتعمل عادي، والـ error طلع لما بدأنا. ده سلوك أي [[function*]]. ولو عايزه يرمي على طول، اعمل دالة عادية بتفحص وبعدين ترجّع generator داخلي.
- **[[range(0, Infinity).take(3)]]:** الـ generator مبيحسبش غير القيمة اللي اتطلبت، و [[take]] بتقفله بعد ٣.
- **[[typeof n === "number" && !Number.isNaN(n)]]:** [[range(0, "5")]] أو [[NaN]] كانوا هيعملوا مقارنات غريبة. [[Infinity]] رقم، فبيعدّي.

## اللي حصل وإحنا بنبنيه

بدأنا من [[range]] بتاع الدرس ([[for (let i = start; i < end; i += step)]]) وجرّبناه:

~~~text node (نسخة الدرس)
[...range(5, 0, -1)]           → []
range(0, 5, -1).take(5)        → [ 0, -1, -2, -3, -4 ]
range(0, 5, 0).take(4)         → [ 0, 0, 0, 0 ]
~~~

- العدّ لورا رجّع لستة فاضية، لأن [[5 < 0]] غلط من أول لفة. فبقى فيه loop لكل اتجاه.
- الـ step العكسي والصفر مبيوقفوش أبدًا: من غير [[take]] الـ [[[...]]] كان هيعلّق البرنامج. فبقى فيه الفحصين.
- الكسور ([[0.25]]) طلعت مظبوطة لأن 0.25 بتتكتب بالظبط في الـ binary. بس [[Array.from(range(0, 1, 0.1))]] طلّعت **١١ عنصر** مش ١٠: فيها [[0.30000000000000004]] و [[0.7999999999999999]]، وآخرها [[0.9999999999999999]] اللي أصغر من 1 فدخلت. الجمع المتكرر بيجمّع غلطة الـ floating point. الحل لو محتاج كسور: [[start + k * step]] بعدّاد صحيح [[k]] وعدد اللفات [[Math.ceil((end - start) / step)]]. جرّبناها: العدد بقى ١٠ صح، بس القيم نفسها لسه فيها [[0.30000000000000004]] (ده شكل الأرقام في الكمبيوتر)، فاعرضها بـ [[toFixed(1)]].

## اتقاس

[[node demo.mjs]] و [[node --test]] على Node 24: ٦ تستات عدّت.` },
        { lvl: 'متوسط', t: R`store صغير زي Zustand`, what: R`[[createStore(initial)]] بيجمع الوحدة كلها: الـ state مخفي جوه closure (module pattern)، و [[subscribe]] و [[emit]] من درس EventEmitter، و [[setState]] بتعمل state جديدة immutable وبتقبل object أو دالة [[(prev) => next]]، و [[Object.freeze]] على كل state جديدة. وجرّبه في ملف [[.mjs]] (strict تلقائي).`, done: R`كل subscriber بياخد [[(next, prev)]] و [[next !== prev]]، و [[setState((s) => ({ count: s.count + 1 }))]] تلات مرات بتوصّل العدد لـ 3، و [[getState().count = 99]] بيرمي [[TypeError]] (عشان الـ freeze والـ strict mode)، ودالة الإلغاء بتوقّف الإشعارات، و [[setState]] بنفس القيم بالظبط مبتبعتش إشعار.`, sol: R`## الناتج النهائي

~~~text node demo.mjs (Node 24)
change: 0 → 1 | next !== prev: true
change: 1 → 2 | next !== prev: true
change: 2 → 3 | next !== prev: true
count: 3
(مفيش سطر change فوق ده)
TypeError: Cannot assign to read only property 'count' of object '#<Object>'
بعد الإلغاء: 10 ومفيش إشعار
~~~

~~~text node --test
ℹ tests 5
ℹ pass 5
ℹ fail 0
~~~

**هتشوف إيه:** ٣ تحديثات بدالة وصّلت العدد لـ 3 وكل واحد بعت إشعار بـ [[next]] و [[prev]] مختلفين، وتحديث بنفس القيم مبعتش حاجة، والكتابة في الـ state من برا رمت [[TypeError]]، وبعد الإلغاء مفيش إشعارات.

## الكود

~~~js store.mjs
export function createStore(initial) {
  let state = Object.freeze({ ...initial });
  const listeners = new Set();

  const shallowEqual = (a, b) => {
    const ka = Object.keys(a), kb = Object.keys(b);
    return ka.length === kb.length && ka.every((k) => Object.is(a[k], b[k]));
  };

  return {
    getState: () => state,
    setState(update) {
      const patch = typeof update === "function" ? update(state) : update;
      const next = Object.freeze({ ...state, ...patch });
      if (shallowEqual(next, state)) return;      // مفيش تغيير = مفيش إشعار
      const prev = state;
      state = next;
      for (const fn of [...listeners]) fn(next, prev);
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
~~~

~~~js demo.mjs
import { createStore } from "./store.mjs";

const store = createStore({ count: 0, user: "Sara" });
const stop = store.subscribe((next, prev) =>
  console.log($__btchange: $__{prev.count} → $__{next.count} | next !== prev: $__{next !== prev}$__bt),
);

for (let i = 0; i < 3; i++) store.setState((s) => ({ count: s.count + 1 }));
console.log("count:", store.getState().count);

store.setState({ count: 3, user: "Sara" });   // نفس القيم
console.log("(مفيش سطر change فوق ده)");

try {
  store.getState().count = 99;
} catch (e) {
  console.log(e.name + ":", e.message);
}

stop();
store.setState({ count: 10 });
console.log("بعد الإلغاء:", store.getState().count, "ومفيش إشعار");
~~~

~~~js store.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { createStore } from "./store.mjs";

test("دالة التحديث بتاخد آخر state", () => {
  const s = createStore({ count: 0 });
  for (let i = 0; i < 3; i++) s.setState((p) => ({ count: p.count + 1 }));
  assert.equal(s.getState().count, 3);
});

test("الـ subscriber بياخد next و prev مختلفين", () => {
  const s = createStore({ count: 0 });
  const calls = [];
  s.subscribe((n, p) => calls.push([n.count, p.count, n !== p]));
  s.setState({ count: 1 });
  assert.deepEqual(calls, [[1, 0, true]]);
});

test("نفس القيم مبتبعتش إشعار", () => {
  const s = createStore({ count: 1 });
  let n = 0;
  s.subscribe(() => n++);
  s.setState({ count: 1 });
  assert.equal(n, 0);
});

test("الـ state متجمّدة", () => {
  const s = createStore({ count: 1 });
  assert.throws(() => { s.getState().count = 99; }, TypeError);
});

test("الإلغاء بيوقّف الإشعارات", () => {
  const s = createStore({ count: 0 });
  let n = 0;
  const stop = s.subscribe(() => n++);
  stop();
  s.setState({ count: 5 });
  assert.equal(n, 0);
});
~~~

## الشرح: كل درس في الوحدة فين

| الحتة | الدرس | بتعمل إيه |
|---|---|---|
| [[let state]] و [[listeners]] جوه [[createStore]] | module pattern | محدش يوصل لهم غير من الـ API |
| [[subscribe]] بترجّع دالة إلغاء، و [[[...listeners]]] في اللفة | EventEmitter | نفس [[on]] و [[emit]] بالظبط، ولفة على نسخة |
| [[{ ...state, ...patch }]] و [[Object.freeze]] | immutability | كل تغيير = object جديد متجمّد |

- **[[typeof update === "function" ? update(state) : update]]:** الشكلين زي Zustand و React [[setState]]. الدالة مهمة لما التحديث بيعتمد على القيمة الحالية: [[(s) => ({ count: s.count + 1 })]] بتاخد آخر state فعلًا، فالتلات مرات وصّلوا 3.
- **[[shallowEqual]] بـ [[Object.is]]:** بيقارن كل مفتاح بالـ reference. لو مفيش حاجة اتغيّرت بنرجع من غير ما نبدّل الـ state ولا نبلّغ حد، فالـ components مش هتعمل render على الفاضي.
- **الـ [[TypeError]]:** [[demo.mjs]] module فهو strict، والكتابة في object متجمّد في strict بترمي. الرسالة بتقول [[read only property 'count']].

## اللي حصل وإحنا بنبنيه

- **الـ freeze في script عادي:** جرّبنا نفس الكتابة في ملف [[.js]] من غير strict: [[s.count = 99]] اتجاهلت ساكتة و [[s.count]] فضل 1. محدش هيعرف إن فيه كود بيحاول يعدّل. عشان كده التجربة في [[.mjs]] زي ما المشروع طالب.
- **من غير [[shallowEqual]]:** أول نسخة كانت بتبلّغ على أي [[setState]]. نداءين بنفس القيم طلّعوا إشعارين. في React ده render زيادة لكل component مشترك على كل ضغطة.
- **الـ freeze سطحي:** [[setState({ user: { name: "A" } })]] وبعدين [[getState().user.name = "B"]] هتعدّي. لو الـ state فيها objects جوه objects اعمل [[deepFreeze]] في وضع التطوير بس (مكلف) أو اعتمد على [[setIn]] من تمرين immutability.

## اتقاس

[[node demo.mjs]] و [[node --test]] على Node 24.` },
        { lvl: 'متوسط', t: R`undo و redo`, what: R`تاريخ للـ state: [[past]] و [[present]] و [[future]] كلهم immutable (درس immutability)، و [[undo()]] و [[redo()]]، وأي تغيير جديد بعد undo بيمسح الـ future. وزوّد [[*history()]] generator بيطلّع كل state من الأقدم للأحدث (درس generators)، و [[on("change")]] لأي حد عايز يعرف (درس EventEmitter).`, done: R`بعد ٣ تغييرات و ٢ undo الـ [[present]] بيبقى أول تغيير، و [[redo()]] بيرجّع التاني، وتغيير جديد بعدها بيخلّي [[redo()]] مبيعملش حاجة، و [[undo()]] على تاريخ فاضي مبيرميش error، و [[Array.from(h.history())]] طوله زي عدد الـ states بالظبط.`, sol: R`## الناتج النهائي

~~~text node demo.mjs (Node 24)
٣ تغييرات:
  [set] "" → "أ"
  [set] "أ" → "أب"
  [set] "أب" → "أبت"
٢ undo:
  [undo] "أبت" → "أب"
  [undo] "أب" → "أ"
present: "أ"
redo:
  [redo] "أ" → "أب"
present: "أب"
تغيير جديد بعد undo:
  [set] "أب" → "أبج"
redo بعدها: false | canRedo: false
history: [ '', 'أ', 'أب', 'أبج' ]
undo على تاريخ فاضي: false | present: 0
history فاضي: [ 0 ]
~~~

~~~text node --test
ℹ tests 5
ℹ pass 5
ℹ fail 0
~~~

**هتشوف إيه:** محرر نص وهمي: كل تغيير بيطبع سطر من الـ listener، و undo و redo بيمشوا في التاريخ، وتغيير جديد بعد undo بيمسح الـ redo، و [[history()]] بيطلّع كل الحالات بالترتيب.

## الكود

[[emitter.mjs]] هو الـ Emitter بتاع درس EventEmitter زي ما هو.

~~~js history.mjs
import { Emitter } from "./emitter.mjs";

export function createHistory(initial) {
  const events = new Emitter();
  let h = Object.freeze({ past: Object.freeze([]), present: initial, future: Object.freeze([]) });

  const commit = (next, type) => {
    const prev = h;
    h = Object.freeze({
      past: Object.freeze(next.past),
      present: next.present,
      future: Object.freeze(next.future),
    });
    events.emit("change", { type, present: h.present, prev: prev.present });
  };

  return {
    get present() { return h.present; },
    get canUndo() { return h.past.length > 0; },
    get canRedo() { return h.future.length > 0; },
    set(value) {
      if (Object.is(value, h.present)) return;
      commit({ past: [...h.past, h.present], present: value, future: [] }, "set");
    },
    undo() {
      if (h.past.length === 0) return false;
      commit({ past: h.past.slice(0, -1), present: h.past.at(-1), future: [h.present, ...h.future] }, "undo");
      return true;
    },
    redo() {
      if (h.future.length === 0) return false;
      const [next, ...rest] = h.future;
      commit({ past: [...h.past, h.present], present: next, future: rest }, "redo");
      return true;
    },
    *history() {
      yield* h.past;
      yield h.present;
      yield* h.future;
    },
    on: (event, fn) => events.on(event, fn),
  };
}
~~~

~~~js demo.mjs
import { createHistory } from "./history.mjs";

const doc = createHistory("");
doc.on("change", (e) => console.log($__bt  [$__{e.type}] "$__{e.prev}" → "$__{e.present}"$__bt));

console.log("٣ تغييرات:");
doc.set("أ"); doc.set("أب"); doc.set("أبت");
console.log("٢ undo:");
doc.undo(); doc.undo();
console.log("present:", JSON.stringify(doc.present));
console.log("redo:");
doc.redo();
console.log("present:", JSON.stringify(doc.present));
console.log("تغيير جديد بعد undo:");
doc.set("أبج");
console.log("redo بعدها:", doc.redo(), "| canRedo:", doc.canRedo);
console.log("history:", Array.from(doc.history()));

const empty = createHistory(0);
console.log("undo على تاريخ فاضي:", empty.undo(), "| present:", empty.present);
console.log("history فاضي:", Array.from(empty.history()));
~~~

~~~js history.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHistory } from "./history.mjs";

test("٣ تغييرات و ٢ undo يرجّعوا لأول تغيير", () => {
  const h = createHistory(0);
  h.set(1); h.set(2); h.set(3);
  h.undo(); h.undo();
  assert.equal(h.present, 1);
  h.redo();
  assert.equal(h.present, 2);
});

test("تغيير جديد بعد undo بيمسح الـ future", () => {
  const h = createHistory(0);
  h.set(1); h.set(2); h.undo(); h.set(9);
  assert.equal(h.redo(), false);
  assert.equal(h.present, 9);
});

test("undo على تاريخ فاضي مبيرميش", () => {
  const h = createHistory("x");
  assert.equal(h.undo(), false);
  assert.equal(h.present, "x");
});

test("history طوله زي عدد الـ states", () => {
  const h = createHistory(0);
  h.set(1); h.set(2); h.set(3); h.undo();
  assert.deepEqual(Array.from(h.history()), [0, 1, 2, 3]);
});

test("نفس القيمة مبتتسجّلش", () => {
  const h = createHistory(0);
  h.set(0);
  assert.equal(h.canUndo, false);
});
~~~

## الشرح

التاريخ ٣ أجزاء: [[past]] (اللي فات، الأقدم الأول)، و [[present]]، و [[future]] (اللي اتعمله undo، الأقرب الأول).

| العملية | past | present | future |
|---|---|---|---|
| [[set(x)]] | + present القديم في الآخر | x | فاضي |
| [[undo()]] | من غير آخر واحد | آخر واحد في past | + present القديم في الأول |
| [[redo()]] | + present القديم | أول واحد في future | من غير أول واحد |

- **[[commit]]:** المكان الوحيد اللي بيبدّل [[h]]. بيجمّد الـ object والـ arrays الاتنين، وبيبعت [[change]] بالنوع والقيمة القديمة والجديدة. أي حد عايز يحفظ أو يرسم يسمع هنا.
- **كل عملية بتعمل arrays جديدة:** [[[...h.past, h.present]]] و [[slice(0, -1)]] و [[[h.present, ...h.future]]]. مفيش [[push]] ولا [[pop]].
- **[[future: []]] في [[set]]:** ده اللي بيخلّي تغيير جديد بعد undo يمسح الـ redo، زي أي محرر.
- **[[undo()]] و [[redo()]] بيرجّعوا boolean:** على تاريخ فاضي بيرجّعوا [[false]] من غير error، فزرار «تراجع» يقدر يسأل [[canUndo]] يتقفل ولا لأ.
- **[[*history()]] بـ [[yield*]]:** بيطلّع عناصر الـ array واحد واحد من غير ما يعمل array جديدة. [[Array.from]] بعدها طوله 4 = 3 تغييرات + الأول.
- **[[Object.is(value, h.present)]]:** [[set]] بنفس القيمة مبيسجّلش خطوة، وإلا اليوزر هيدوس undo ومفيش حاجة تتغير.

## اللي حصل وإحنا بنبنيه

أول [[undo]] كان [[const prev = h.past.pop()]]. ولأن الـ arrays متجمّدة، رمى على طول:

~~~text الناتج (node)
TypeError: Cannot delete property '1' of [object Array]
~~~

وده بالظبط فايدة الـ freeze: لو مكانش موجود، الـ [[pop]] كان هيعدّل الـ [[past]] بتاع الحالة القديمة اللي ممكن حد ماسكها (مثلًا الـ [[prev]] اللي اتبعت للـ listener)، والتاريخ يبوظ في سكوت. التصليح [[slice(0, -1)]] و [[at(-1)]].

## اتقاس

[[node demo.mjs]] و [[node --test]] على Node 24.` },
        { lvl: 'كبير', t: R`قارئ صفحات API متين`, what: R`[[async function* paginate(fetchPage, { pageSize })]] بيلف على API بصفحات (اعمل سيرفر Node صغير على localhost بيرجّع [[{ items, next }]] ومرة من كل ٣ بيرجّع 500). فيه: فحص [[pageSize]] من 1 لـ 100، وretry ٣ مرات بـ backoff (وحدة async)، و [[try/finally]] جوه الـ generator بيطبع «خلصت» حتى لو اللي بيلف عمل [[break]]، و Emitter بيطلّع [[page]] و [[retry]] و [[error]] للّوج، وكل صفحة بتترجع immutable. من وحدة Patterns كلها ووحدة async والأخطاء.`, done: R`[[for await]] على ١٠ صفحات بيجيب كل العناصر من غير تكرار حتى مع الـ 500 العشوائي، واللوج فيه سطر [[retry]] لكل فشل، و [[pageSize: 0]] أو [[pageSize: 500]] بيرمي [[RangeError]] قبل أي request، و [[break]] بعد صفحتين بيطبع «خلصت» ومفيش request تالت في لوج السيرفر، ولو السيرفر مقفول خالص بيطلع error واضح بعد ٣ محاولات بس مش loop.`, ext: R`خليه يقبل [[AbortSignal]] عشان تلغيه من برا، وزوّد cache للصفحات اللي اتجابت، واستخدمه في أداة بتصدّر داتا API حقيقي لـ CSV.`, sol: R`## الناتج النهائي

الترمنال الأول شغّال فيه السيرفر ([[node server.mjs]])، والتاني بيشغّل القارئ:

~~~text node run.mjs (Node 24)
page 1: 10 عنصر
page 2: 10 عنصر
retry page 3 محاولة 1 بعد 100ms (HTTP 500 من /items)
page 3: 10 عنصر
page 4: 10 عنصر
retry page 5 محاولة 1 بعد 100ms (HTTP 500 من /items)
page 5: 10 عنصر
page 6: 10 عنصر
retry page 7 محاولة 1 بعد 100ms (HTTP 500 من /items)
page 7: 10 عنصر
page 8: 10 عنصر
retry page 9 محاولة 1 بعد 100ms (HTTP 500 من /items)
page 9: 10 عنصر
page 10: 10 عنصر
خلصت: 10 صفحة، 100 عنصر
عناصر مختلفة: 100
~~~

~~~text node run.mjs http://localhost:8831 2   (break بعد صفحتين)
retry page 1 محاولة 1 بعد 100ms (HTTP 500 من /items)
page 1: 10 عنصر
page 2: 10 عنصر
خلصت: 2 صفحة، 20 عنصر
عناصر مختلفة: 20
~~~

~~~text لوج السيرفر للتشغيلتين
API على http://localhost:8831
#1 cursor=0 → 200 (10)
#2 cursor=10 → 200 (10)
#3 cursor=20 → 500
#4 cursor=20 → 200 (10)
#5 cursor=30 → 200 (10)
#6 cursor=40 → 500
#7 cursor=40 → 200 (10)
#8 cursor=50 → 200 (10)
#9 cursor=60 → 500
#10 cursor=60 → 200 (10)
#11 cursor=70 → 200 (10)
#12 cursor=80 → 500
#13 cursor=80 → 200 (10)
#14 cursor=90 → 200 (10)
#15 cursor=0 → 500
#16 cursor=0 → 200 (10)
#17 cursor=10 → 200 (10)
~~~

~~~text node run.mjs http://localhost:8839   (مفيش سيرفر على البورت ده)
retry page 1 محاولة 1 بعد 100ms (fetch failed)
retry page 1 محاولة 2 بعد 200ms (fetch failed)
error: فشل بعد 3 محاولات: fetch failed | السبب: fetch failed ECONNREFUSED
خلصت: 0 صفحة، 0 عنصر
exit=1
~~~

~~~text node --test
✔ كل العناصر من غير تكرار رغم الـ 500 (98.3671ms)
✔ pageSize 0 و 500 بيرموا قبل أي request (0.5523ms)
✔ break بعد صفحتين: end اتبعت ومفيش request لصفحة تالتة (14.5101ms)
✔ الصفحات متجمّدة (14.4913ms)
✔ سيرفر مقفول: error واضح بعد 3 محاولات بالظبط (30.731ms)
ℹ tests 5
ℹ pass 5
ℹ fail 0
~~~

**هتشوف إيه:** ١٠٠ عنصر من ١٠ صفحات من غير تكرار مع إن السيرفر بيقع كل تالت request، وسطر [[retry]] لكل 500. ولوج السيرفر بيأكد إن الـ [[break]] بعد صفحتين وقّف عند [[cursor=10]] (مفيش [[cursor=20]] في التشغيلة التانية)، والسيرفر المقفول بيدّي error واضح بعد ٣ محاولات بس.

## الملفات

~~~text
api-reader/
├── emitter.mjs         # الـ Emitter بتاع الدرس
├── server.mjs          # API وهمي على localhost بيرجّع 500 كل تالت request
├── paginate.mjs        # paginate + withRetry + httpPages
├── run.mjs             # القارئ من الترمنال: لوج من الأحداث
└── paginate.test.mjs   # node --test
~~~

[[emitter.mjs]] هو الـ class بتاع درس EventEmitter زي ما هو.

~~~js server.mjs
import { createServer } from "node:http";

// API وهمي: 100 عنصر، و request من كل 3 بيرجّع 500
export function startServer({ port = 0, total = 100, failEvery = 3 } = {}) {
  const items = Array.from({ length: total }, (_, i) => ({ id: i + 1, name: $__btitem-$__{i + 1}$__bt }));
  const log = [];
  let n = 0;
  const server = createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname !== "/items") { res.writeHead(404).end(); return; }
    n++;
    const cursor = Number(url.searchParams.get("cursor") ?? 0);
    const limit = Number(url.searchParams.get("limit") ?? 10);
    if (n % failEvery === 0) {
      log.push($__bt#$__{n} cursor=$__{cursor} → 500$__bt);
      res.writeHead(500, { "content-type": "application/json" }).end('{"error":"boom"}');
      return;
    }
    const page = items.slice(cursor, cursor + limit);
    const next = cursor + limit < total ? String(cursor + limit) : null;
    log.push($__bt#$__{n} cursor=$__{cursor} → 200 ($__{page.length})$__bt);
    res.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify({ items: page, next }));
  });
  return new Promise((resolve) =>
    server.listen(port, () => resolve({ server, log, url: $__bthttp://localhost:$__{server.address().port}$__bt })),
  );
}

// node server.mjs: شغّله لوحده واطبع اللوج
if (import.meta.filename === process.argv[1]) {
  const { url, log } = await startServer({ port: Number(process.env.PORT) || 8831 });
  console.log("API على", url);
  setInterval(() => { while (log.length) console.log(log.shift()); }, 200);
}
~~~

~~~js paginate.mjs
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function withRetry(fn, { attempts, baseDelay, onRetry }) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt === attempts) break;
      const delay = baseDelay * 2 ** (attempt - 1);      // 100 ثم 200 ثم 400...
      onRetry?.({ attempt, delay, error: err });
      await sleep(delay);
    }
  }
  throw new Error($__btفشل بعد $__{attempts} محاولات: $__{lastError.message}$__bt, { cause: lastError });
}

export async function* paginate(fetchPage, { pageSize = 20, attempts = 3, baseDelay = 100, events } = {}) {
  if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) {
    throw new RangeError($__btpageSize لازم رقم صحيح من 1 لـ 100، جالي $__{pageSize}$__bt);
  }
  let cursor = null;
  let pages = 0, count = 0;
  try {
    do {
      const data = await withRetry(() => fetchPage(cursor, pageSize), {
        attempts,
        baseDelay,
        onRetry: (info) => events?.emit("retry", { page: pages + 1, ...info }),
      });
      if (!Array.isArray(data?.items)) throw new TypeError("الرد مفيهوش items array");
      const items = Object.freeze(data.items.map((it) => Object.freeze({ ...it })));
      pages++;
      count += items.length;
      events?.emit("page", { page: pages, size: items.length });
      yield items;
      cursor = data.next;
    } while (cursor != null);
  } catch (err) {
    events?.emit("error", err);
    throw err;
  } finally {
    events?.emit("end", { pages, count });
  }
}

// fetchPage جاهزة لأي API بيرجّع { items, next }
export const httpPages = (base) => async (cursor, limit) => {
  const url = new URL("/items", base);
  url.searchParams.set("limit", limit);
  if (cursor != null) url.searchParams.set("cursor", cursor);
  const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
  if (!res.ok) throw new Error($__btHTTP $__{res.status} من $__{url.pathname}$__bt);
  return res.json();
};
~~~

~~~js run.mjs
import { Emitter } from "./emitter.mjs";
import { paginate, httpPages } from "./paginate.mjs";

const base = process.argv[2] ?? "http://localhost:8831";
const max = Number(process.argv[3] ?? Infinity);

const events = new Emitter();
events.on("page", (e) => console.log($__btpage $__{e.page}: $__{e.size} عنصر$__bt));
events.on("retry", (e) => console.log($__btretry page $__{e.page} محاولة $__{e.attempt} بعد $__{e.delay}ms ($__{e.error.message})$__bt));
events.on("error", (e) => console.log("error:", e.message, "| السبب:", e.cause?.message, e.cause?.cause?.code ?? ""));
events.on("end", (e) => console.log($__btخلصت: $__{e.pages} صفحة، $__{e.count} عنصر$__bt));

const ids = new Set();
let pagesSeen = 0;
try {
  for await (const items of paginate(httpPages(base), { pageSize: 10, events })) {
    for (const it of items) ids.add(it.id);
    if (++pagesSeen >= max) break;
  }
  console.log("عناصر مختلفة:", ids.size);
} catch {
  process.exitCode = 1;
}
~~~

~~~js paginate.test.mjs
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { Emitter } from "./emitter.mjs";
import { paginate, httpPages } from "./paginate.mjs";
import { startServer } from "./server.mjs";

let api;
before(async () => { api = await startServer(); });
after(() => api.server.close());

const collect = (events) => {
  const seen = [];
  for (const name of ["page", "retry", "error", "end"]) events.on(name, () => seen.push(name));
  return seen;
};

test("كل العناصر من غير تكرار رغم الـ 500", async () => {
  api.log.length = 0;
  const events = new Emitter();
  const seen = collect(events);
  const ids = [];
  for await (const items of paginate(httpPages(api.url), { pageSize: 10, baseDelay: 5, events })) {
    ids.push(...items.map((i) => i.id));
  }
  assert.equal(ids.length, 100);
  assert.equal(new Set(ids).size, 100);
  const fails = api.log.filter((l) => l.endsWith("500")).length;
  assert.ok(fails > 0, "السيرفر مرجّعش 500 خالص");
  assert.equal(seen.filter((s) => s === "retry").length, fails);
  assert.equal(seen.at(-1), "end");
});

test("pageSize 0 و 500 بيرموا قبل أي request", async () => {
  api.log.length = 0;
  for (const pageSize of [0, 500, 2.5]) {
    await assert.rejects(paginate(httpPages(api.url), { pageSize }).next(), RangeError);
  }
  assert.equal(api.log.length, 0);
});

test("break بعد صفحتين: end اتبعت ومفيش request لصفحة تالتة", async () => {
  api.log.length = 0;
  const events = new Emitter();
  let ended = null;
  events.on("end", (e) => (ended = e));
  let pages = 0;
  for await (const _ of paginate(httpPages(api.url), { pageSize: 10, baseDelay: 5, events })) {
    if (++pages === 2) break;
  }
  assert.deepEqual(ended, { pages: 2, count: 20 });
  const cursors = new Set(api.log.map((l) => l.match(/cursor=(\d+)/)[1]));
  assert.deepEqual([...cursors].sort(), ["0", "10"]);
});

test("الصفحات متجمّدة", async () => {
  const it = paginate(httpPages(api.url), { pageSize: 5, baseDelay: 5 });
  const { value } = await it.next();
  await it.return();
  assert.throws(() => value.push({}), TypeError);
  assert.throws(() => { value[0].name = "x"; }, TypeError);
});

test("سيرفر مقفول: error واضح بعد 3 محاولات بالظبط", async () => {
  const dead = await startServer();
  const url = dead.url;
  await new Promise((r) => dead.server.close(r));
  let calls = 0;
  const fetchPage = async (...a) => { calls++; return httpPages(url)(...a); };
  await assert.rejects(paginate(fetchPage, { pageSize: 10, baseDelay: 5 }).next(), (err) => {
    assert.match(err.message, /فشل بعد 3 محاولات/);
    return true;
  });
  assert.equal(calls, 3);
});
~~~

## ترتيب البناء

1. **السيرفر الأول:** [[startServer]] بيرجّع [[{ server, log, url }]] عشان التستات تشغّله على بورت عشوائي ([[port: 0]]) وتقرا اللوج من غير ما تحلّل نص.
2. **[[withRetry]] لوحدها:** دالة بتجرّب [[attempts]] مرات وتستنى [[baseDelay * 2 ** (attempt - 1)]] بين كل مرة (100 ثم 200)، وفي الآخر ترمي error جديد فيه [[cause]] الأصلي.
3. **[[paginate]]:** الـ async generator اللي بيربط الكل.
4. **[[run.mjs]]:** بيسمع للأحداث ويطبع، ومفيش [[console.log]] واحد جوه [[paginate]].
5. **التستات:** لكل سطر في المطلوب تست.

## الشرح

- **فحص [[pageSize]] أول سطر:** قبل أي [[fetch]]. وتست [[pageSize 0 و 500]] بيتأكد إن لوج السيرفر فاضي بعدها. ولأنها [[async function*]]، الـ error بيطلع من أول [[next()]] (أو أول لفة [[for await]]) كـ Promise مرفوضة، فالتست بيستخدم [[assert.rejects]].
- **[[do { ... } while (cursor != null)]]:** أول صفحة من غير cursor، وبعدين بنمشي ورا [[next]] اللي السيرفر بيرجّعه لحد ما يبقى [[null]]. ده cursor pagination: السيرفر هو اللي بيقول الصفحة اللي بعدها فين، فمفيش تكرار ولا عناصر بتتنط.
- **الـ retry جوه الصفحة الواحدة:** الصفحة اللي فشلت هي اللي بتتعاد بنفس الـ cursor (في اللوج: [[#3 cursor=20 → 500]] وبعده [[#4 cursor=20 → 200]])، فالعناصر مبتتكررش. لو الـ retry كان حوالين الـ loop كله كان هيبدأ من الأول ويجيب الصفحات القديمة تاني.
- **[[try/finally]] و [[break]]:** لما الـ [[for await]] يعمل [[break]]، بينادي [[return()]] على الـ generator، فالكود بيكمّل من الـ [[finally]] ويبعت [[end]]. ده اللي طبع «خلصت: 2 صفحة». ولأن الـ generator واقف عند [[yield]]، مفيش [[fetch]] للصفحة التالتة أصلًا.
- **[[catch]] بيبعت [[error]] ويرمي تاني:** اللوج بيعرف، واللي بينادي برضه بيعرف (exit=1). ابلع الـ error بس لو انت اللي هتتعامل معاه.
- **[[Object.freeze]] على الصفحة وكل عنصر:** اللي بيلف يقدر يقرا بس. والنسخة [[{ ...it }]] قبل الـ freeze عشان منجمّدش objects جاية من برا ممكن حد تاني بيستخدمها.
- **[[AbortSignal.timeout(5000)]] في [[httpPages]]:** سيرفر بيعلّق من غير ما يرد هيعدّ كمحاولة فاشلة بعد ٥ ثواني، بدل ما البرنامج يستنى للأبد.
- **[[{ cause: lastError }]]:** الرسالة العامة ([[فشل بعد 3 محاولات]]) ومعاها السبب الحقيقي. اللوج طلّع [[ECONNREFUSED]] من [[e.cause.cause.code]]: [[fetch]] في Node بيرمي [[TypeError: fetch failed]] والسبب الحقيقي جوه [[cause]] بتاعه.

## اللي حصل وإحنا بنبنيه

- **«خلصت» كانت بتختفي مع [[break]]:** أول نسخة كانت بتبعت [[end]] بعد الـ loop مش في [[finally]]. جرّبنا نفس الفكرة على generator صغير:

~~~js no-finally.mjs
async function* noFinally(){ yield 1; yield 2; yield 3; console.log("خلصت (من غير finally)"); }
for await (const x of noFinally()) { if (x === 2) break; }
console.log("بعد الـ break: السطر بتاع خلصت ماتطبعش");
~~~

~~~text الناتج
بعد الـ break: السطر بتاع خلصت ماتطبعش
~~~

السطر اللي بعد آخر [[yield]] متنفّذش خالص، لأن [[return()]] بيطلع من مكان الـ [[yield]] على طول. أي تنضيف (قفل اتصال، لوج، تايمر) لازم يبقى في [[finally]].

- **الشرط اللي بيشغّل السيرفر لوحده:** أول نسخة قارنت [[import.meta.url]] بـ [[process.argv[1]]] بعد ما بدّلنا الـ backslashes، ووقعت بـ [[SyntaxError: missing ) after argument list]] من escaping الـ regex. [[import.meta.filename]] (Node 20.11 وما بعده) بيرجّع المسار بنفس شكل [[process.argv[1]]] على Windows و Linux، فالمقارنة بقت سطر من غير regex.
- **التستات بـ 100ms بين المحاولات كانت بطيئة:** فبقى [[baseDelay]] option، والتستات بتبعت [[5]].

## اتقاس

- [[node server.mjs]] على البورت 8831 و [[node run.mjs]] (كامل وبـ break) واللوج فوق.
- [[node run.mjs http://localhost:8839]] على بورت مفيهوش حاجة: ٣ محاولات بالظبط و exit 1.
- [[node --test]]: ٥ تستات، كل سطر في المطلوب ليه تست.` },
        { lvl: 'فكرة', t: R`مكتبتك الصغيرة`, what: R`اختار حاجة بتكرر كتابتها: state، أو events، أو معالجة داتا كتير lazy، أو cache، واعمل لها مكتبة صغيرة بالـ patterns دي: API عام صغير والباقي مخفي، وأحداث، وداتا متتعدّلش من برا، و iterators لو فيه لستة. انت اللي بتحدد الـ API.`, done: R`فيه README فيه مثال استخدام بيشتغل لو نسخته، وتستات بـ [[node --test]] بتعدّي، ومفيش طريقة تغيّر الـ state الداخلي غير من الـ API (جرّبها بنفسك وانت بتحاول تكسرها).`, ext: R`خليها تشتغل في المتصفح و Node، وزوّد types بـ JSDoc أو TypeScript، واستخدمها في مشروع حقيقي من بتوعك بدل الكود المكرر.`, sol: R`## النسخة النموذجية: [[tiny-lru]]

اخترنا **كاش LRU** (Least Recently Used): بيحتفظ بآخر [[max]] عناصر اتستخدمت، ولما يتملى بيشيل اللي بقاله أطول وقت محدش طلبه. بنكتبه كتير (كاش لنتايج API، أو للصور، أو لحسابات تقيلة)، وبيستخدم كل pattern في الوحدة.

~~~text node readme-example.mjs (Node 24، المثال اللي في الـ README بالظبط)
اتشال: b
[ [ 'a', 1 ], [ 'c', 3 ] ]
{ hits: 1, misses: 0, size: 2, max: 2 }
~~~

~~~text node --test
✔ بيشيل الأقدم استخدامًا مش الأقدم إضافة (3.2119ms)
✔ evict بيتبعت بالمفتاح والقيمة (0.3683ms)
✔ stats بتعدّ الـ hits والـ misses ومتجمّدة (0.6419ms)
✔ مفيش طريقة توصل للـ Map من برا (0.2403ms)
✔ max غلط بيرمي (0.2462ms)
✔ اللفة على نسخة: set جوه اللفة مبيعملش loop (0.2208ms)
ℹ tests 6
ℹ pass 6
ℹ fail 0
~~~

## الملفات

~~~text
tiny-lru/
├── README.md
├── emitter.mjs           # الـ Emitter بتاع الدرس
├── lru.mjs               # المكتبة
├── readme-example.mjs    # المثال اللي في الـ README، عشان نتأكد إنه شغال
└── lru.test.mjs
~~~

~~~text README.md
# tiny-lru

كاش صغير بيحتفظ بآخر $__btmax$__bt عناصر اتستخدمت.

$__bt$__bt$__btjs
import { createLRU } from "./lru.mjs";

const cache = createLRU(2);
cache.on("evict", (key) => console.log("اتشال:", key));
cache.set("a", 1).set("b", 2);
cache.get("a");          // a بقى الأحدث
cache.set("c", 3);       // اتشال: b
console.log([...cache]); // [ [ 'a', 1 ], [ 'c', 3 ] ]
console.log(cache.stats());
$__bt$__bt$__bt

API: $__btget$__bt و $__btset$__bt (بترجّع الكاش فتقدر تكمّل عليها) و $__bthas$__bt و $__btdelete$__bt و $__btsize$__bt و $__btstats()$__bt و $__bton("evict", fn)$__bt، والكاش نفسه iterable.
~~~

~~~js lru.mjs
import { Emitter } from "./emitter.mjs";

/**
 * كاش بيحتفظ بآخر max عناصر اتستخدمت، والأقدم استخدامًا بيتشال.
 * @param {number} max
 */
export function createLRU(max) {
  if (!Number.isInteger(max) || max < 1) throw new RangeError($__btmax لازم رقم صحيح >= 1، جالي $__{max}$__bt);
  const map = new Map();          // الـ Map بيحافظ على ترتيب الإضافة: الأول = الأقدم
  const events = new Emitter();
  let hits = 0, misses = 0;

  const api = {
    get(key) {
      if (!map.has(key)) { misses++; return undefined; }
      hits++;
      const value = map.get(key);
      map.delete(key);            // نقله للآخر = «اتستخدم دلوقتي»
      map.set(key, value);
      return value;
    },
    set(key, value) {
      map.delete(key);
      map.set(key, value);
      if (map.size > max) {
        const [oldKey, oldValue] = map.entries().next().value;
        map.delete(oldKey);
        events.emit("evict", oldKey, oldValue);
      }
      return api;
    },
    has: (key) => map.has(key),
    delete: (key) => map.delete(key),
    get size() { return map.size; },
    stats: () => Object.freeze({ hits, misses, size: map.size, max }),
    *[Symbol.iterator]() {         // من الأقدم للأحدث، على نسخة
      yield* [...map.entries()];
    },
    on: (event, fn) => events.on(event, fn),
  };
  return Object.freeze(api);
}
~~~

~~~js readme-example.mjs
import { createLRU } from "./lru.mjs";

const cache = createLRU(2);
cache.on("evict", (key) => console.log("اتشال:", key));
cache.set("a", 1).set("b", 2);
cache.get("a");          // a بقى الأحدث
cache.set("c", 3);       // اتشال: b
console.log([...cache]); // [ [ 'a', 1 ], [ 'c', 3 ] ]
console.log(cache.stats());
~~~

~~~js lru.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { createLRU } from "./lru.mjs";

test("بيشيل الأقدم استخدامًا مش الأقدم إضافة", () => {
  const c = createLRU(2);
  c.set("a", 1).set("b", 2);
  c.get("a");
  c.set("c", 3);
  assert.equal(c.has("b"), false);
  assert.deepEqual([...c], [["a", 1], ["c", 3]]);
});

test("evict بيتبعت بالمفتاح والقيمة", () => {
  const c = createLRU(1);
  const out = [];
  c.on("evict", (k, v) => out.push([k, v]));
  c.set("x", 1).set("y", 2);
  assert.deepEqual(out, [["x", 1]]);
});

test("stats بتعدّ الـ hits والـ misses ومتجمّدة", () => {
  const c = createLRU(2);
  c.set("a", 1);
  c.get("a"); c.get("zzz");
  const s = c.stats();
  assert.deepEqual({ ...s }, { hits: 1, misses: 1, size: 1, max: 2 });
  assert.throws(() => { s.hits = 100; }, TypeError);
});

test("مفيش طريقة توصل للـ Map من برا", () => {
  const c = createLRU(2);
  assert.equal(Object.keys(c).includes("map"), false);
  assert.throws(() => { c.map = new Map(); }, TypeError);
  assert.throws(() => { c.get = () => 1; }, TypeError);
});

test("max غلط بيرمي", () => {
  for (const m of [0, -1, 1.5, "3"]) assert.throws(() => createLRU(m), RangeError);
});

test("اللفة على نسخة: set جوه اللفة مبيعملش loop", () => {
  const c = createLRU(3);
  c.set("a", 1).set("b", 2);
  let n = 0;
  for (const [k] of c) { n++; c.set(k + "!", 0); }
  assert.equal(n, 2);
});
~~~

## ليه التصميم ده

| الـ pattern | فين | ليه |
|---|---|---|
| module pattern | [[map]] و [[hits]] و [[misses]] جوه [[createLRU]] | المكتبة تقدر تغيّر طريقة التخزين بعدين من غير ما حد يتأثر |
| EventEmitter | [[on("evict", fn)]] | اللي بيستخدم الكاش يقدر يعمل لوج أو يقفل ملف لما عنصر يتشال، من غير ما المكتبة تعرف |
| immutability | [[Object.freeze(api)]] و [[stats()]] متجمّدة | محدش يبدّل [[get]] بتاعتك، ولا يعدّل الإحصائيات |
| iterators | [[*[Symbol.iterator]()]] | [[[...cache]]] و [[for...of]] بيشتغلوا من غير ما نصدّر الـ Map |
| factory | [[createLRU(max)]] مش singleton | كاش للصور وكاش للـ API كل واحد بحجمه |

- **ليه [[Map]]:** بيحافظ على ترتيب الإضافة، فأول عنصر فيه هو الأقدم. «اتستخدم دلوقتي» = [[delete]] و [[set]] تاني فيروح للآخر. والشيل = أول عنصر من [[map.entries().next()]]. كل العمليات O(1) من غير linked list بإيدك.
- **[[set]] بترجّع الكاش:** فتقدر تكتب [[cache.set("a", 1).set("b", 2)]] زي [[Map]] العادي.
- **API صغير عن قصد:** مفيش [[clear]] ولا TTL ولا [[peek]]. أسهل تزوّد حاجة بعدين من إنك تشيلها بعد ما ناس تستخدمها.

## اللي حصل وإحنا بنبنيه

أول نسخة من الـ iterator كانت [[yield* map.entries()]] (على الـ Map نفسه). تست «set جوه اللفة» وقع في loop، فوقفناه بعد ٢٠ لفة:

~~~text الناتج (النسخة من غير نسخة)
لسه بيلف بعد 20 لفة، آخر مفتاح: a!!!!!!!!!!
~~~

كل [[set]] بيضيف مفتاح جديد في آخر الـ Map، والـ iterator الحي بيزوره، وهكذا. نفس درس الـ Emitter: اللفة على صورة ([[[...map.entries()]]]). وبعد التصليح التست طلع ٢ لفة بالظبط.

## «حاول تكسرها»

جرّبنا من برا: [[c.map = new Map()]] و [[c.get = () => 1]] بيرموا [[TypeError]] (الـ object متجمّد والتست module فهو strict)، و [[s.hits = 100]] على الإحصائيات بيرمي برضه، و [[Object.keys(c)]] مفيهاش أي حاجة داخلية. الطريقة الوحيدة تغيّر الكاش هي [[set]] و [[delete]].

## اتقاس

[[node readme-example.mjs]] (نفس كود الـ README) و [[node --test]] على Node 24.` },
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
            { lvl: 'سريع', t: R`صلّح الباج: [[const counter = (() => { let count = 0; return { count, inc() { count++; } }; })();]] وبعدين [[counter.inc(); counter.inc(); counter.count]]. اتوقع الناتج الأول، وبعدين صلّحه بـ [[get count() { return count; }]].`, done: R`قبل التصليح [[counter.count]] بيطبع 0 مش 2 (الـ object خد نسخة من الرقم ساعة الـ return)، وبعد الـ getter بيطبع 2، و [[counter.count = 99]] مبيغيّرش العدّاد الحقيقي (في [[.mjs]] بيرمي [[TypeError: Cannot set property count of #<Object> which has only a getter]]، وفي script عادي بيتجاهل ساكت)، وتقدر تقول الفرق ده في جملة لزميل.`, sol: R`**التوقع:** [[0]] مش [[2]]. الـ object اتعمل مرة واحدة ساعة الـ [[return]]، وساعتها [[count]] كان [[0]]، فـ [[{ count }]] نسخ **الرقم** في خاصية جديدة. [[inc()]] بعد كده بيزوّد المتغير اللي جوه الـ closure، مش الخاصية.

~~~js counter-bug.js
// قبل التصليح
const counter = (() => {
  let count = 0;
  return { count, inc() { count++; } };
})();
counter.inc();
counter.inc();
console.log("قبل:", counter.count);

// بعد التصليح: getter بيقرا المتغير ساعة السؤال
const fixed = (() => {
  let count = 0;
  return {
    get count() { return count; },
    inc() { count++; },
  };
})();
fixed.inc();
fixed.inc();
console.log("بعد:", fixed.count);
fixed.count = 99;          // script عادي: بيتجاهل ساكت
console.log("بعد = 99:", fixed.count);
~~~

~~~text الناتج (node counter-bug.js، Node 24)
قبل: 0
بعد: 2
بعد = 99: 2
~~~

ونفس الملف باسم [[counter-bug.mjs]] (الـ module دايمًا strict):

~~~text الناتج (node counter-bug.mjs)
قبل: 0
بعد: 2
TypeError: Cannot set property count of #<Object> which has only a getter
~~~

**ليه كده:**

- **[[{ count, inc() {...} }]]:** اختصار لـ [[{ count: count }]]، يعني «حط القيمة الحالية». الأرقام بتتنسخ بالقيمة، فالخاصية مبقاش ليها علاقة بالمتغير.
- **[[get count() { return count; }]]:** مش خاصية فيها رقم، دي دالة بتتنادى كل ما حد يقرا [[fixed.count]]، فبترجّع قيمة المتغير **دلوقتي**.
- **مفيش setter:** فالكتابة من برا مبتوصلش للمتغير. في script عادي بتتجاهل، وفي strict mode ([[.mjs]] أو [["use strict"]]) بترمي [[TypeError]] فتعرف إن فيه حد بيحاول يلعب في العدّاد.

**الجملة لزميل:** «الـ object بياخد صورة من الرقم ساعة ما اتعمل، الـ getter بيبص على الرقم الحقيقي كل مرة».

**الغلطة الشائعة:** تصلّحها بـ [[this.count++]] جوه [[inc]]. هتشتغل، بس العدّاد بقى خاصية عادية أي حد يكتب فيها [[counter.count = -5]]، فضيّعت الخصوصية اللي الـ module pattern معمول عشانها.` },
            { lvl: 'تطبيق', t: R`ابني [[settings]] بالـ module pattern: object داخلي فيه [[theme: "dark"]] و [[lang: "ar"]]، و [[get(key)]] و [[set(key, value)]]، و [[getAll()]] بترجّع نسخة مش الأصل، و [[set]] بترفض أي key مش موجود من الأول، و [[onChange(fn)]] بتتنادى بعد كل [[set]] ناجح.`, done: R`[[const all = settings.getAll(); all.theme = "light";]] وبعدها [[settings.get("theme")]] لسه [["dark"]]، و [[settings.set("color", 1)]] بترمي Error فيه كلمة [[color]]، و [[settings.set("theme", "light")]] بتغيّرها وبتنادي الـ [[onChange]] مرة واحدة بالـ key والقيمة الجديدة.`, sol: R`~~~js settings.js
const settings = (() => {
  const data = { theme: "dark", lang: "ar" };
  const listeners = [];

  return {
    get(key) {
      return data[key];
    },
    set(key, value) {
      if (!Object.hasOwn(data, key)) {
        throw new Error($__btمفيش إعداد اسمه "$__{key}"$__bt);
      }
      data[key] = value;
      for (const fn of listeners) fn(key, value);
    },
    getAll() {
      return { ...data };          // نسخة: اللي برا يعدّل فيها براحته
    },
    onChange(fn) {
      listeners.push(fn);
    },
  };
})();

settings.onChange((key, value) => console.log("اتغيّر:", key, "=", value));

const all = settings.getAll();
all.theme = "light";
console.log("بعد ما عدّلنا النسخة:", settings.get("theme"));

try {
  settings.set("color", 1);
} catch (e) {
  console.log("Error:", e.message);
}

settings.set("theme", "light");
console.log("دلوقتي:", settings.get("theme"));
console.log("data مخفية؟", settings.data);
~~~

~~~text الناتج (node settings.js، Node 24)
بعد ما عدّلنا النسخة: dark
Error: مفيش إعداد اسمه "color"
اتغيّر: theme = light
دلوقتي: light
data مخفية؟ undefined
~~~

**ليه كده:**

- **الـ IIFE [[(() => { ... })()]]:** بتتنفّذ مرة واحدة، و [[data]] و [[listeners]] عايشين في الـ closure بتاعها. اللي برا بيشوف بس الـ object اللي اترجع، فـ [[settings.data]] بـ [[undefined]].
- **[[Object.hasOwn(data, key)]]:** الـ set بيرفض أي مفتاح مش موجود **من الأول**. لو استخدمت [[key in data]] كان [["toString"]] هيعدّي، لأن [[in]] بيدوّر في الـ prototype كمان.
- **[[{ ...data }]] في [[getAll]]:** نسخة جديدة كل مرة، فـ [[all.theme = "light"]] غيّر النسخة بس. لو رجّعت [[data]] نفسها كان أي حد يعدّل الإعدادات من غير ما يعدّي على [[set]] ومن غير ما الـ listeners يعرفوا.
- **الـ listeners بعد التغيير:** الترتيب مهم: نغيّر الأول وبعدين ننادي، فلو الـ listener قرا [[settings.get(key)]] يلاقي القيمة الجديدة. والـ set الفاشل مبيناديش حد لأن الـ throw بيطلع قبل الـ loop.

**الغلطة الشائعة:** النسخة في [[getAll]] **سطحية**. لو إعداد قيمته object (زي [[colors: { bg: ... }]])، [[all.colors.bg = ...]] هيعدّل الأصل. لو محتاجها عميقة: [[structuredClone(data)]].` },
            { lvl: 'تحدي', t: R`قارن واشرح: حوّل الـ counter لـ factory [[createCounter()]] واعمل منه اتنين. وبعدين [[store.mjs]] فيه [[let count = 0]] و [[export const inc = () => ++count]] و [[export const get = () => count]]، وملفين [[a.mjs]] و [[b.mjs]] كل واحد بيعمل import لـ [[inc]] وبيناديها مرة، و [[main.mjs]] بيعمل import للاتنين وبيطبع [[get()]].`, done: R`[[c1.inc(); c1.inc(); c2.inc();]] بيخلّي [[c1]] عند 2 و [[c2]] عند 1 (كل نداء closure جديد)، و [[node main.mjs]] بيطبع 2 مش 1 (الـ module اتنفّذ مرة واحدة والاتنين شايفين نفس [[count]])، وكتبت ٣ سطور لزميل: إمتى singleton وإمتى factory.`, sol: R`**الجزء الأول: factory**

~~~js factory.js
function createCounter() {
  let count = 0;
  return {
    inc() { return ++count; },
    get() { return count; },
  };
}
const c1 = createCounter();
const c2 = createCounter();
c1.inc(); c1.inc(); c2.inc();
console.log("c1 =", c1.get(), "| c2 =", c2.get());
~~~

~~~text الناتج (node factory.js، Node 24)
c1 = 2 | c2 = 1
~~~

**الجزء التاني: ES module** (٤ ملفات في نفس الفولدر)

~~~js store.mjs
let count = 0;
export const inc = () => ++count;
export const get = () => count;
~~~

~~~js a.mjs
import { inc } from "./store.mjs";
inc();
~~~

~~~js b.mjs
import { inc } from "./store.mjs";
inc();
~~~

~~~js main.mjs
import "./a.mjs";
import "./b.mjs";
import { get } from "./store.mjs";
console.log("get() =", get());
~~~

~~~text الناتج (node main.mjs)
get() = 2
~~~

**ليه كده:**

- **الـ factory:** كل نداء لـ [[createCounter()]] بيعمل scope جديد فيه [[count]] جديد. [[c1]] و [[c2]] كل واحد ماسك closure لوحده، فبيعدّوا لوحدهم.
- **الـ module:** [[store.mjs]] بيتنفّذ **مرة واحدة** في البرنامج كله، أول ما أي حد يعمل له import. [[a.mjs]] و [[b.mjs]] و [[main.mjs]] بياخدوا نفس النسخة (Node بيحفظ الـ module في الكاش بالـ URL بتاعه)، فالاتنين زوّدوا نفس [[count]] والناتج 2.

**التلات سطور لزميل:**

> الـ module نفسه singleton: نسخة واحدة يتشاركها كل اللي بيعمل import، ينفع للحاجات اللي المفروض تبقى واحدة في التطبيق (الإعدادات، الاتصال بالداتابيز، الـ logger).
> الـ factory بتعمل نسخة جديدة كل نداء: ينفع لما تحتاج أكتر من واحد (عدّاد لكل زرار، store لكل تاب في الاختبارات).
> ولو مش متأكد، اعمل factory وصدّر منها نسخة واحدة: [[export const counter = createCounter()]]، كده عندك الاتنين.

**الغلطة الشائعة:** تفتكر إن كل [[import]] بيشغّل الملف من الأول، فتستغرب إن الاختبارات بتأثّر في بعض. الـ singleton بيفضل شايل الحالة بين الاختبارات اللي في نفس الملف، وده سبب إن أغلب المكتبات بتصدّر factory ([[createStore]]، [[createClient]]).` },
          ],
          ref: [
            { t: "MDN: IIFE", url: "https://developer.mozilla.org/en-US/docs/Glossary/IIFE" },
            { t: "MDN: Closures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures" },
            { t: "MDN: JavaScript modules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" },
            { t: "MDN: getter", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get" },
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
            { lvl: 'سريع', t: R`محاكاة أوضة شات: [[room]] من الـ Emitter، و ٣ يوزرز كل واحد بيعمل [[room.on("message", ...)]] وبيطبع اسمه وبعده «وصلته:» والنص، ويوزر منهم بيخرج بدالة الإلغاء بعد أول رسالة.`, done: R`أول [[emit("message", "أهلًا")]] بيطبع ٣ سطور، والتانية سطرين بس، واللي خرج مبيوصلوش حاجة، وتقدر تخلّي اللي بيبعت ميشوفش رسالته (من غير ما الـ Emitter يتغير).`, sol: R`الحل بيستخدم الـ [[Emitter]] بتاع الدرس زي ما هو في ملف لوحده، والأوضة في ملف تاني.

~~~js emitter.mjs
export class Emitter {
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
~~~

~~~js chat.mjs
import { Emitter } from "./emitter.mjs";

const room = new Emitter();
const join = (name) => {
  const leave = room.on("message", (text, from) => {
    if (from === name) return;            // اللي بعت ميشوفش رسالته
    console.log($__bt$__{name} وصلته: $__{text}$__bt);
  });
  return leave;
};

join("سارة");
const leaveOmar = join("عمر");
join("منى");

room.emit("message", "أهلًا", "system");
leaveOmar();                              // عمر خرج بعد أول رسالة
console.log("---");
room.emit("message", "حد هنا؟", "system");
console.log("---");
room.emit("message", "أنا منى", "منى");
~~~

~~~text الناتج (node chat.mjs، Node 24)
سارة وصلته: أهلًا
عمر وصلته: أهلًا
منى وصلته: أهلًا
---
سارة وصلته: حد هنا؟
منى وصلته: حد هنا؟
---
سارة وصلته: أنا منى
~~~

**ليه كده:**

- **[[join(name)]]:** بتسجّل handler لكل يوزر وبترجّع دالة الإلغاء اللي [[on]] رجّعها. الـ handler عارف اسم صاحبه من الـ closure.
- **[[leaveOmar()]]:** بتنادي [[off]] على نفس الدالة بالظبط، فالرسالة التانية وصلت لاتنين بس.
- **«اللي بيبعت ميشوفش رسالته» من غير ما نغيّر الـ Emitter:** بنبعت اسم المرسل كـ argument تاني في [[emit]]، وكل handler بيقارن [[from === name]] ويرجع. الـ Emitter مبيعرفش حاجة عن الشات، هو بس بيوصّل الـ arguments زي ما هي. الرسالة التالتة من منى وصلت لسارة بس (عمر خرج، ومنى هي اللي بعتت).

**الغلطة الشائعة:** تشيل اليوزر بـ [[room.off("message", (text) => ...)]] بدالة مكتوبة من جديد. دي دالة **تانية** حتى لو نفس الكود، والـ [[Set]] بيقارن بالـ reference، فمفيش حاجة هتتشال. عشان كده [[on]] بترجّع دالة الإلغاء: محدش يحتاج يمسك الـ handler بنفسه.` },
            { lvl: 'تطبيق', t: R`ابني [[createStore(initial)]] فوق الـ Emitter: [[getState()]]، و [[setState(patch)]] بتعمل state جديدة بالـ spread وبتعمل [[emit("change", next, prev)]]، و [[subscribe(fn)]] بترجّع دالة الإلغاء. ده نفس شكل Zustand من جوه.`, done: R`بعد [[setState({ count: 1 })]] على [[{ count: 0 }]] الـ subscriber بياخد [[next.count]] بـ 1 و [[prev.count]] بـ 0، وبعد ما تنادي دالة الإلغاء [[setState]] تاني مبيطبعش حاجة، و [[getState()]] بيرجّع آخر قيمة.`, sol: R`[[emitter.mjs]] هو نفس ملف الـ Emitter بتاع الدرس (اتكتب في حل التمرين اللي فات).

~~~js store-emitter.mjs
import { Emitter } from "./emitter.mjs";

function createStore(initial) {
  const events = new Emitter();
  let state = initial;
  return {
    getState: () => state,
    setState(patch) {
      const prev = state;
      state = { ...state, ...patch };
      events.emit("change", state, prev);
    },
    subscribe: (fn) => events.on("change", fn),
  };
}

const store = createStore({ count: 0 });
const unsubscribe = store.subscribe((next, prev) =>
  console.log("change:", prev.count, "→", next.count),
);
store.setState({ count: 1 });
unsubscribe();
store.setState({ count: 2 });
console.log("getState():", store.getState());
~~~

~~~text الناتج (node store-emitter.mjs، Node 24)
change: 0 → 1
getState(): { count: 2 }
~~~

**ليه كده:**

- **[[let state]] جوه [[createStore]]:** الـ state مخفي في الـ closure، والطريقة الوحيدة لتغييره [[setState]]. ده الـ module pattern من الدرس اللي فات.
- **[[const prev = state]] قبل التغيير:** لازم نمسك المرجع القديم **قبل** ما نبدّله، عشان نبعته للـ subscriber. ولأننا مش بنعدّل في الـ object القديم (بنعمل واحد جديد بالـ spread)، [[prev]] لسه فيه [[count: 0]].
- **[[{ ...state, ...patch }]]:** المفاتيح اللي في الـ patch بتكسب، والباقي بيتنسخ. ده اللي بيخلّي [[next !== prev]]، وده اللي React و Zustand بيقارنوا بيه عشان يعرفوا إن فيه حاجة اتغيّرت.
- **[[subscribe: (fn) => events.on("change", fn)]]:** بنرجّع دالة الإلغاء اللي [[on]] رجّعها زي ما هي. بعد [[unsubscribe()]] التغيير التاني حصل (getState بيقول 2) بس محدش اتبلّغ.

**الغلطة الشائعة:** تكتب [[state.count = patch.count]] بدل الـ spread. الـ subscriber هياخد [[next]] و [[prev]] نفس الـ object، فـ [[prev.count]] هيبقى 1 برضه، وأي كود بيقارن [[next !== prev]] هيفتكر إن مفيش تغيير.` },
            { lvl: 'تحدي', t: R`اقرا وتوقّع، وبعدين قارن بـ Node: غيّر [[emit]] في نسخة من الـ Emitter بحيث تلف على الـ Set نفسه ([[for (const fn of this.#handlers.get(event) ?? [])]]) من غير النسخة. handler [[A]] بيطبع A وبيعمل [[on]] لنفس الحدث بـ handler جديد بيطبع B. اكتب توقعك لـ [[emit]] مرتين في النسختين وفي [[EventEmitter]] من [[node:events]]، وبعدين شغّل التلاتة.`, done: R`من غير النسخة الناتج [[A B | A B B]] (الجديد اتنادى في نفس اللفة)، وبالنسخة و Node الاتنين [[A | A B]]، وتقدر تقول في جملة ليه، وجرّبت كمان handler بيعمل [[off]] لـ handler بعده: بالنسخة وفي Node الاتنين بيطلّعوا [[A B]] في نفس الـ emit.`, sol: R`**التوقع قبل التشغيل:**

- **النسخة اللي بتلف على الـ Set نفسه:** الـ [[for...of]] على [[Set]] بيزور أي عنصر يتضاف وهو لسه بيلف. فـ B اللي A ضافه هيتنادى في نفس اللفة: [[A B]]، وفي التانية A بيضيف B تاني والاتنين يتنادوا: [[A B B]].
- **النسخة بـ [[[...set]]] و Node:** اللفة على صورة اتاخدت قبل ما نبدأ، فـ B الجديد مبيتناداش غير من الـ emit اللي بعده: [[A | A B]].

~~~js live-set.mjs
import { EventEmitter } from "node:events";

// نسخة الدرس: بتلف على نسخة من الـ Set
class Copying {
  #h = new Map();
  on(e, fn) { if (!this.#h.has(e)) this.#h.set(e, new Set()); this.#h.get(e).add(fn); }
  off(e, fn) { this.#h.get(e)?.delete(fn); }
  emit(e, ...a) { for (const fn of [...(this.#h.get(e) ?? [])]) fn(...a); }
}
// النسخة المعدّلة: بتلف على الـ Set نفسه
class Live {
  #h = new Map();
  on(e, fn) { if (!this.#h.has(e)) this.#h.set(e, new Set()); this.#h.get(e).add(fn); }
  off(e, fn) { this.#h.get(e)?.delete(fn); }
  emit(e, ...a) { for (const fn of this.#h.get(e) ?? []) fn(...a); }
}

function addTest(em, label) {
  const out = [];
  em.on("x", () => { out.push("A"); em.on("x", () => out.push("B")); });
  em.emit("x"); out.push("|"); em.emit("x");
  console.log(label.padEnd(9), out.join(" "));
}
function offTest(em, label) {
  const out = [];
  const b = () => out.push("B");
  em.on("x", () => { out.push("A"); em.off("x", b); });
  em.on("x", b);
  em.emit("x");
  console.log(label.padEnd(9), out.join(" "));
}
console.log("== A بيضيف handler جديد");
addTest(new Live(), "live Set");
addTest(new Copying(), "نسخة");
addTest(new EventEmitter(), "node");
console.log("== A بيشيل B اللي بعده");
offTest(new Live(), "live Set");
offTest(new Copying(), "نسخة");
offTest(new EventEmitter(), "node");
~~~

~~~text الناتج (node live-set.mjs، Node 24)
== A بيضيف handler جديد
live Set  A B | A B B
نسخة      A | A B
node      A | A B
== A بيشيل B اللي بعده
live Set  A
نسخة      A B
node      A B
~~~

**الجملة:** الـ emit لازم يلف على **صورة** من الـ handlers ساعة ما بدأ، عشان أي handler يضيف أو يشيل handlers تانيين ميغيّرش اللفة اللي شغالة. ده بالظبط سلوك [[node:events]] المكتوب في الوثائق: listeners اللي بتتضاف أو تتشال وقت الـ emit مبتأثرش على الـ emit اللي شغال.

**ليه ده مهم في الحقيقة:**

- **الإضافة:** handler بيسجّل نسخة جديدة من نفسه (زي اشتراك بيتجدّد لوحده) مع Set حي بيدخل في loop: كل لفة بتضيف عنصر والـ for بيزوره. جرّبناها بعدّاد بيوقف عند ١٠٠٠٠:

~~~js loop.mjs
class Live { #h = new Set(); on(fn){ this.#h.add(fn); } emit(){ for (const fn of this.#h) fn(); } }
class Copying { #h = new Set(); on(fn){ this.#h.add(fn); } emit(){ for (const fn of [...this.#h]) fn(); } }
for (const E of [Live, Copying]) {
  const em = new E(); let n = 0;
  const h = () => { n++; if (n > 10000) throw new Error("loop!"); em.on(() => h()); };
  em.on(h);
  try { em.emit(); console.log(E.name, "نادى", n, "مرة"); } catch (e) { console.log(E.name, e.message, "بعد", n - 1, "نداء"); }
}
~~~

~~~text الناتج (node loop.mjs)
Live loop! بعد 10000 نداء
Copying نادى 1 مرة
~~~
- **الشيل:** في الـ Set الحي، A شال B فـ B **متناداش خالص** مع إن الحدث حصل وهو كان مسجّل ساعتها. ده باج صعب تلاقيه: مثلًا [[once]] بتاع حد بيشيل listener حد تاني بالغلط.

**الغلطة الشائعة:** تفتكر إن النسخة [[[...set]]] «تقيلة» وتشيلها للأداء. هي array صغيرة بعدد الـ handlers، وتمنها أقل بكتير من باج زي ده.` },
          ],
          ref: [
            { t: "Node.js: Events", url: "https://nodejs.org/api/events.html" },
            { t: "MDN: EventTarget", url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget" },
            { t: "MDN: Private elements", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements" },
            { t: "MDN: Set", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set" },
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
            { lvl: 'سريع', t: R`اتوقع وبعدين شغّل: على [[const a = [3, 1, 2];]] إيه اللي بيتغير في [[a]] بعد [[a.toSorted()]] و [[a.toReversed()]] و [[a.with(0, 9)]] و [[a.toSpliced(0, 1)]]، وبعد [[a.sort()]]؟ وإيه ناتج [[a.sort() === a]]؟`, done: R`الأربعة الأولانيين بيرجّعوا arrays جديدة (1,2,3 و 2,1,3 و 9,1,2 و 1,2) و [[a]] بتفضل 3,1,2، وبعد [[sort()]] بتبقى 1,2,3، و [[a.sort() === a]] بيرجّع [[true]] لأن [[sort]] بيعدّل نفس الـ array ويرجّعها هي.`, sol: R`**التوقع:** الأربعة اللي اسمهم بيبدأ بـ [[to]] أو [[with]] بيرجّعوا array جديدة و [[a]] متتغيّرش، و [[sort()]] بيرتّب [[a]] نفسها ويرجّعها هي.

~~~js immut.js
const a = [3, 1, 2];
console.log("toSorted:  ", a.toSorted(), "| a =", a);
console.log("toReversed:", a.toReversed(), "| a =", a);
console.log("with(0, 9):", a.with(0, 9), "| a =", a);
console.log("toSpliced: ", a.toSpliced(0, 1), "| a =", a);
const sorted = a.sort();
console.log("sort():    ", sorted, "| a =", a);
console.log("a.sort() === a:", a.sort() === a);
~~~

~~~text الناتج (node immut.js، Node 24)
toSorted:   [ 1, 2, 3 ] | a = [ 3, 1, 2 ]
toReversed: [ 2, 1, 3 ] | a = [ 3, 1, 2 ]
with(0, 9): [ 9, 1, 2 ] | a = [ 3, 1, 2 ]
toSpliced:  [ 1, 2 ] | a = [ 3, 1, 2 ]
sort():     [ 1, 2, 3 ] | a = [ 1, 2, 3 ]
a.sort() === a: true
~~~

**ليه كده:**

- **[[toSorted]] و [[toReversed]] و [[toSpliced]] و [[with]]:** اتضافوا في ES2023 كنسخ «مبتعدّلش» من [[sort]] و [[reverse]] و [[splice]] و [[arr[i] = x]]. كل واحد بيعمل array جديدة ويسيب الأصل.
- **[[with(0, 9)]]:** زي [[a[0] = 9]] بس على نسخة. مفيدة جوه state: [[items.with(i, newItem)]] بدل [[map]] طويلة.
- **[[toSpliced(0, 1)]]:** بترجّع الـ array **من غير** العنصر اللي اتشال (عكس [[splice]] اللي بترجّع اللي اتشال).
- **[[a.sort() === a]] بـ [[true]]:** [[sort]] بترتّب في مكانها وبترجّع **نفس** الـ array. عشان كده [[const sorted = a.sort()]] خدعة: [[sorted]] و [[a]] نفس الحاجة، والأصل ضاع.

**الغلطة الشائعة:** [[const sorted = props.items.sort(...)]] في React. ده بيرتّب الـ array اللي في الـ state أو الـ props نفسها، ولأن الـ reference متغيرش، React مبيعرفش إن حاجة اتغيرت. الصح [[toSorted]] أو [[[...items].sort(...)]].` },
            { lvl: 'تطبيق', t: R`اكتب اختبار يمسك الباج وبعدين صلّحه: [[const addItem = (state, item) => { state.items.push(item); return { ...state }; };]]. التست بـ [[node:test]] و [[assert]] بيتأكد إن الأصل متغيرش وإن [[next.items !== state.items]].`, done: R`التست بيقع على الكود ده (الأصل بقى فيه عنصرين و [[next.items === state.items]] بـ [[true]] مع إن [[next !== state]])، وبعد ما تكتبها [[items: [...state.items, item] ]] التست بيعدّي، وتقدر تقول ليه React كان ممكن ميعملش re-render لـ component بيقرا [[items]] بس.`, sol: R`التست بيختبر النسختين مع بعض، عشان تشوفه بيقع على الباج ويعدّي على التصليح في نفس التشغيلة.

~~~js cart.mjs
export const addItemBuggy = (state, item) => {
  state.items.push(item);
  return { ...state };
};

export const addItem = (state, item) => ({
  ...state,
  items: [...state.items, item],
});
~~~

~~~js cart.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { addItem, addItemBuggy } from "./cart.mjs";

for (const [name, fn] of [["addItemBuggy", addItemBuggy], ["addItem", addItem]]) {
  test($__bt$__{name}: مبيعدّلش الأصل وبيرجّع items جديدة$__bt, () => {
    const state = { user: "Sara", items: [{ id: 1 }] };
    const next = fn(state, { id: 2 });

    assert.equal(state.items.length, 1, "الأصل اتعدّل");
    assert.notEqual(next.items, state.items, "next.items نفس الـ array القديمة");
    assert.deepEqual(next.items, [{ id: 1 }, { id: 2 }]);
    assert.equal(next.user, state.user);
  });
}
~~~

~~~text الناتج (node --test، Node 24، مختصر)
✖ addItemBuggy: مبيعدّلش الأصل وبيرجّع items جديدة (1.1713ms)
✔ addItem: مبيعدّلش الأصل وبيرجّع items جديدة (0.6768ms)
ℹ tests 2
ℹ pass 1
ℹ fail 1

✖ addItemBuggy: مبيعدّلش الأصل وبيرجّع items جديدة (1.1713ms)
  AssertionError [ERR_ASSERTION]: الأصل اتعدّل

  2 !== 1
~~~

**ليه كده:**

- **الباج:** [[state.items.push(item)]] بيعدّل الـ array **الأصلية**، وبعدين [[{ ...state }]] بيعمل object جديد بس خاصية [[items]] فيه بتشاور على نفس الـ array. يعني [[next !== state]] بس [[next.items === state.items]].
- **أول assert وقع:** [[state.items.length]] بقى 2. ولو شلت السطر ده، التاني ([[notEqual]]) كان هيقع برضه.
- **التصليح:** [[items: [...state.items, item] ]] بيعمل array جديدة فيها القديم والجديد، والأصل مبيتلمسش.
- **رسالة الـ assert التالتة ([["الأصل اتعدّل"]]):** هي اللي بتطلع في الفشل بدل [[2 !== 1]] لوحدها، فتعرف الباج من غير ما تفتح الكود.

**ليه React كان ممكن ميعملش re-render:** component بيقرا [[items]] بس (مثلًا [[useStore((s) => s.items)]] أو [[memo]] على [[items]]) بيقارن بـ [[Object.is(oldItems, newItems)]]. في الباج الاتنين نفس الـ array، فالمقارنة بتقول «متغيرش» والشاشة بتفضل بالعنصر القديم مع إن الداتا فيها عنصرين.

**الغلطة الشائعة:** تكتب التست [[assert.deepEqual(next.items, [...])]] بس. ده هيعدّي على الكود البايظ، لأن المحتوى صح. اللي بيمسك الباج هو مقارنة الـ reference ([[notEqual]]) وإن الأصل لسه زي ما هو.` },
            { lvl: 'تحدي', t: R`مسألة: اكتب [[setIn(obj, path, value)]] بالـ recursion، بتنسخ الطريق اللي في الـ path بس: [[setIn(state, ["user", "address", "city"], "Giza")]]. ولو حتة في النص مش موجودة، تتعمل object فاضي.`, done: R`[[next.user.address.city]] بقت [["Giza"]] و [[state.user.address.city]] لسه القديمة، و [[next.items === state.items]] و [[next.user !== state.user]] الاتنين [[true]]، و [[setIn({}, ["a", "b"], 1)]] بترجّع [[{ a: { b: 1 } }]]، و path فاضي بيرمي [[TypeError]].`, sol: R`~~~js setin.mjs
function setIn(obj, path, value) {
  if (!Array.isArray(path) || path.length === 0) {
    throw new TypeError("path لازم يبقى array فيها مفتاح واحد على الأقل");
  }
  const [key, ...rest] = path;
  const current = obj ?? {};
  const child = current[key];
  return {
    ...current,
    [key]: rest.length === 0
      ? value
      : setIn(typeof child === "object" && child !== null ? child : {}, rest, value),
  };
}

const state = {
  user: { name: "Sara", address: { city: "Cairo", street: "Tahrir" } },
  items: [{ id: 1 }],
};
const next = setIn(state, ["user", "address", "city"], "Giza");

console.log("next city:", next.user.address.city);
console.log("old city: ", state.user.address.city);
console.log("street متشال؟", next.user.address.street);
console.log("items متشاركة:", next.items === state.items);
console.log("user جديد:", next.user !== state.user);
console.log("setIn({}, [a, b], 1):", JSON.stringify(setIn({}, ["a", "b"], 1)));
try { setIn(state, [], 1); } catch (e) { console.log(e.name + ":", e.message); }
~~~

~~~text الناتج (node setin.mjs، Node 24)
next city: Giza
old city:  Cairo
street متشال؟ Tahrir
items متشاركة: true
user جديد: true
setIn({}, [a, b], 1): {"a":{"b":1}}
TypeError: path لازم يبقى array فيها مفتاح واحد على الأقل
~~~

**ليه كده:**

- **[[const [key, ...rest] = path]]:** بناخد أول مفتاح، والباقي هو المشوار اللي لسه. كل نداء بيقصّر الـ path واحد لحد ما يفضل مفتاح واحد.
- **الحالة الأساسية [[rest.length === 0]]:** آخر مفتاح، فنحط [[value]] مباشرة.
- **[[{ ...current, [key]: ... }]]:** كل مستوى في الطريق بيتعمل object جديد فيه باقي المفاتيح زي ما هي (لذلك [[street]] لسه موجود). اللي برا الطريق ([[items]]) بيتنسخ الـ reference بتاعه بس، فـ [[next.items === state.items]].
- **[[typeof child === "object" && child !== null ? child : {}]]:** لو المستوى مش موجود (أو رقم أو [[null]]) نبدأ object فاضي، فـ [[setIn({}, ["a", "b"], 1)]] بيبني [[{ a: { b: 1 } }]].
- **الـ [[TypeError]] للـ path الفاضي:** من غير الفحص، [[key]] هيبقى [[undefined]] والدالة هتحط خاصية اسمها [["undefined"]] في سكوت.

**الغلطة الشائعة:** تكتبها بـ [[structuredClone(state)]] وبعدين تعدّل. الناتج صح، بس كل حاجة اتنسخت، فـ [[next.items !== state.items]] وأي component بيقرا [[items]] هيعمل re-render من غير سبب. الفكرة كلها إنك تنسخ الطريق بس.

**ملحوظة:** الحل ده بيتعامل مع كل مستوى كـ object. لو في الطريق array ([[["items", 0, "qty"]]]) هيحوّلها لـ object، وعشان تدعمها اعمل [[Array.isArray(current) ? current.with(key, ...) : { ...current, ... }]].` },
          ],
          ref: [
            { t: "MDN: Object.freeze()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze" },
            { t: "MDN: Spread syntax", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax" },
            { t: "MDN: Array.prototype.toSorted()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted" },
            { t: "MDN: Array.prototype.with()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with" },
            { t: "MDN: structuredClone()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone" },
          ],
          pre: [{ to: "js/Array: splice و toSpliced و toReversed و with", why: R`الـ methods اللي بترجّع array جديدة بدل ما تعدّل الأصل` }],
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
            { lvl: 'سريع', t: R`**ابني:** iterator بإيدك من غير [[function*]]: object [[{ from: 1, to: 3 }]] فيه [[Symbol.iterator]] بترجّع object فيه [[next()]] بيرجّع [[{ value, done }]].`, done: R`[[Array.from(r)]] بيرجّع 1 و 2 و 3، ولو عملتها تاني بترجّع نفس الأرقام (كل لفة بتاخد iterator جديد)، و [[for (const n of r)]] بيطبع التلاتة، و [[{ from: 5, to: 1 }]] بيرجّع لستة فاضية.`, sol: R`~~~js iters.mjs
const r = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      },
    };
  },
};
console.log(Array.from(r));
console.log(Array.from(r));
for (const n of r) console.log("for:", n);
console.log(Array.from({ from: 5, to: 1, [Symbol.iterator]: r[Symbol.iterator] }));
~~~

~~~text الناتج (node iters.mjs، Node 24)
[ 1, 2, 3 ]
[ 1, 2, 3 ]
for: 1
for: 2
for: 3
[]
~~~

**ليه كده:**

- **[[[Symbol.iterator]()]]:** ده الـ «بروتوكول» اللي [[for...of]] و [[Array.from]] و [[...]] بيدوّروا عليه. أي object فيه الدالة دي يبقى **iterable**.
- **الدالة بترجّع object جديد فيه [[next()]]:** ده الـ **iterator**. كل [[next()]] بترجّع [[{ value, done }]]، ولما [[done]] تبقى [[true]] اللفة بتقف.
- **[[let current]] جوه الدالة مش على [[r]]:** كل لفة بتنادي [[r[Symbol.iterator]()]] من الأول فبتاخد [[current]] جديد يبدأ من 1. عشان كده [[Array.from(r)]] التانية رجّعت نفس الأرقام.
- **[[{ from: 5, to: 1 }]]:** أول [[next()]] بيلاقي [[5 <= 1]] غلط، فبيرجّع [[done: true]] على طول واللستة فاضية.

**الغلطة الشائعة:** تحط العدّاد على الـ object نفسه ([[this.current++]]) أو تخلّي [[Symbol.iterator]] ترجّع [[this]]. أول لفة شغالة، والتانية بترجّع لستة فاضية لأن العدّاد خلص من المرة اللي فاتت. الـ iterable لازم يدّي iterator جديد كل مرة.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[function* g() { console.log("start"); yield 1; console.log("mid"); yield 2; } const it = g(); console.log("before");]] وبعدها [[console.log(it.next())]] ٣ مرات. اكتب كل السطور بالترتيب.`, done: R`طلع: [[before]]، و [[start]]، و [[{ value: 1, done: false }]]، و [[mid]]، و [[{ value: 2, done: false }]]، و [[{ value: undefined, done: true }]]. يعني [[g()]] نفسها مبتشغّلش ولا سطر، وكل next بتكمّل لحد الـ yield اللي بعده.`, sol: R`**التوقع:** [[before]] الأول، لأن [[g()]] مبتشغّلش ولا سطر من جسم الدالة، بترجّع generator واقف عند أول سطر. وكل [[next()]] بيشغّل لحد الـ [[yield]] اللي جاي ويقف.

~~~js gen-order.js
function* g() {
  console.log("start");
  yield 1;
  console.log("mid");
  yield 2;
}
const it = g();
console.log("before");
console.log(it.next());
console.log(it.next());
console.log(it.next());
~~~

~~~text الناتج (node gen-order.js، Node 24)
before
start
{ value: 1, done: false }
mid
{ value: 2, done: false }
{ value: undefined, done: true }
~~~

**خطوة خطوة:**

1. **[[const it = g()]]:** مفيش طباعة. الجسم لسه متبدأش.
2. **[[console.log("before")]]:** أول سطر يطلع.
3. **أول [[next()]]:** الجسم بيبدأ: يطبع [[start]]، ويوصل [[yield 1]] فيقف ويرجّع [[{ value: 1, done: false }]].
4. **تاني [[next()]]:** يكمّل من بعد [[yield 1]]: يطبع [[mid]] ويقف عند [[yield 2]].
5. **تالت [[next()]]:** يكمّل لآخر الدالة من غير [[yield]]، فـ [[done: true]] و [[value]] هي قيمة الـ [[return]] (مفيش، فـ [[undefined]]).

**الغلطة الشائعة:** تتوقع [[start]] قبل [[before]] زي أي دالة عادية. ده اللي بيخلّي الـ generators «lazy»: ممكن تعمل generator لانهائي ([[naturals()]]) من غير ما البرنامج يعلّق، لأن ولا سطر بيشتغل غير لما حد يطلب قيمة.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** اعمل [[users.json]] فيه 1050 يوزر (بـ [[Array.from({ length: 1050 }, (_, i) => ({ id: i + 1 }))]])، واكتب [[function* chunk(arr, size)]] وابعتهم لـ «API» وهمي (دالة بتطبع عدد كل دفعة) على دفعات 100.`, done: R`بيطبع 11 دفعة: 10 فيهم 100 والأخيرة 50، ومجموعهم 1050، و [[size]] بصفر أو سالب بيرمي [[RangeError]] بدل ما يلف للأبد، و [[Array.from(chunk([], 3))]] بيرجّع لستة فاضية.`, sol: R`ملفين: واحد بيعمل الداتا مرة واحدة، والتاني بيقسّمها ويبعتها.

~~~js make-users.mjs
import { writeFileSync } from "node:fs";
const users = Array.from({ length: 1050 }, (_, i) => ({ id: i + 1 }));
writeFileSync("users.json", JSON.stringify(users));
console.log("كتبنا", users.length, "يوزر");
~~~

~~~js chunk.mjs
import { readFileSync } from "node:fs";

function* chunk(arr, size) {
  if (!Number.isInteger(size) || size <= 0) {
    throw new RangeError($__btsize لازم رقم صحيح أكبر من صفر، جالي $__{size}$__bt);
  }
  for (let i = 0; i < arr.length; i += size) {
    yield arr.slice(i, i + size);
  }
}

const fakeApi = (batch, n) => console.log($__btدفعة $__{n}: $__{batch.length} يوزر (من $__{batch[0].id} لـ $__{batch.at(-1).id})$__bt);

const users = JSON.parse(readFileSync("users.json", "utf8"));
let n = 0, total = 0;
for (const batch of chunk(users, 100)) {
  fakeApi(batch, ++n);
  total += batch.length;
}
console.log("المجموع:", total);
console.log("لستة فاضية:", Array.from(chunk([], 3)));
try {
  for (const b of chunk(users, 0)) console.log(b);
} catch (e) {
  console.log(e.name + ":", e.message);
}
~~~

~~~text الناتج (node make-users.mjs ثم node chunk.mjs، Node 24)
كتبنا 1050 يوزر
دفعة 1: 100 يوزر (من 1 لـ 100)
دفعة 2: 100 يوزر (من 101 لـ 200)
دفعة 3: 100 يوزر (من 201 لـ 300)
دفعة 4: 100 يوزر (من 301 لـ 400)
دفعة 5: 100 يوزر (من 401 لـ 500)
دفعة 6: 100 يوزر (من 501 لـ 600)
دفعة 7: 100 يوزر (من 601 لـ 700)
دفعة 8: 100 يوزر (من 701 لـ 800)
دفعة 9: 100 يوزر (من 801 لـ 900)
دفعة 10: 100 يوزر (من 901 لـ 1000)
دفعة 11: 50 يوزر (من 1001 لـ 1050)
المجموع: 1050
لستة فاضية: []
RangeError: size لازم رقم صحيح أكبر من صفر، جالي 0
~~~

**ليه كده:**

- **[[i += size]] و [[arr.slice(i, i + size)]]:** [[slice]] مبيشتكيش لو النهاية بعد آخر الـ array، فآخر دفعة طلعت 50 لوحدها من غير حساب خاص.
- **الفحص في أول الـ generator:** من غيره، [[size = 0]] يخلّي [[i += 0]] فالـ loop يطلّع دفعات فاضية للأبد. و [[Number.isInteger]] بيرفض كمان [[NaN]] و [[2.5]].
- **الـ [[RangeError]] بيطلع إمتى؟** مش ساعة [[chunk(users, 0)]]، لكن أول ما الـ [[for...of]] يطلب أول قيمة، لأن جسم الـ generator مبيشتغلش غير مع أول [[next()]]. عشان كده الـ try حوالين الـ loop مش حوالين النداء بس.
- **[[chunk([], 3)]]:** الشرط [[0 < 0]] غلط من أول لفة، فمفيش [[yield]] واللستة فاضية.

**ليه generator مش array of arrays؟** الدفعات بتتعمل واحدة واحدة وقت ما الـ API يبقى جاهز. لو قسمت مليون يوزر مرة واحدة، كل الدفعات هتبقى في الميموري مع بعض. ولو الـ API وقع في دفعة ٣، [[break]] بيوقف وباقي الدفعات متتعملش أصلًا.

**الغلطة الشائعة:** الفحص بـ [[if (size <= 0)]] بس. [[chunk(users, "100")]] بيعدّي الفحص ده ([["100" <= 0]] غلط)، وبعدين [[i += "100"]] بيلزق نص بدل ما يجمع: أول لفة [[i]] بقت [["0100"]] وتاني لفة [["0100100"]]. جرّبناها: الدفعات طلعت [[[ 100, 950 ]]] بدل ١١ دفعة. [[Number.isInteger]] بيقفل الباب ده.` },
            { lvl: 'تطبيق', t: R`**محاكاة:** إشارة مرور: [[function* light()]] بتلف للأبد على [["red"]] و [["green"]] و [["yellow"]]. خد أول ٧ حالات بـ [[light().take(7).toArray()]].`, done: R`بيطبع [[red green yellow red green yellow red]]، والبرنامج مبيعلّقش مع إن الـ generator لانهائي، لأن take وقفت بعد ٧.`, sol: R`~~~js light.mjs
function* light() {
  while (true) {
    yield "red";
    yield "green";
    yield "yellow";
  }
}
console.log(light().take(7).toArray().join(" "));
~~~

~~~text الناتج (node light.mjs، Node 24)
red green yellow red green yellow red
~~~

**ليه كده:**

- **[[while (true)]] جوه generator مش loop بيعلّق:** كل [[yield]] بيوقف الدالة ويرجّع قيمة. الـ loop مبيلفّش غير لما حد يطلب القيمة اللي بعدها.
- **[[.take(7)]]:** من الـ Iterator helpers (موجودة في Node 22 وما بعده وكل المتصفحات الحديثة). بتطلب ٧ قيم بس، وبعدين بتنادي [[return()]] على الـ generator فيقفل.
- **[[.toArray()]]:** بتجمع اللي طلع في array. لو ناديتها على [[light()]] نفسها من غير [[take]] كانت هتلف للأبد، فالترتيب مهم: حدّد الأول وبعدين اجمع.

**الغلطة الشائعة:** [[[...light()].slice(0, 7)]]. الـ spread بيحاول يجمع **كل** القيم قبل ما [[slice]] يشتغل، ومع generator لانهائي البرنامج بيعلّق ويكبر في الميموري لحد ما يقع. جرّبناها بميموري صغيرة عشان تقع بسرعة: [[node --max-old-space-size=64]] طلّع [[FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory]]. مع الحاجات اللانهائية: [[take]] أو [[for...of]] فيه [[break]].` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** [[function* naturals()]] لانهائية من 1، و [[f]] بتربّع الرقم وبتزوّد عدّاد. شغّل [[naturals().map(f).filter((n) => n % 2).take(3).toArray()]] واطبع العدّاد، وبعدين نفس السلسلة بـ arrays عادية على 1 لـ 1000.`, done: R`الناتج 1 و 9 و 25 والعدّاد 5 بس (الأرقام من 1 لـ 5)، لكن مع الـ arrays [[f]] بتتنادى 1000 مرة قبل ما [[filter]] يبدأ، وتقدر تقول بصوتك ليه الـ generator وقف لوحده.`, sol: R`~~~js lazy.mjs
function* naturals() {
  for (let n = 1; ; n++) yield n;
}
let calls = 0;
const f = (n) => { calls++; return n * n; };

const lazy = naturals().map(f).filter((n) => n % 2).take(3).toArray();
console.log("generator:", lazy, "| f اتنادت", calls, "مرة");

calls = 0;
const nums = Array.from({ length: 1000 }, (_, i) => i + 1);
const eager = nums.map(f).filter((n) => n % 2).slice(0, 3);
console.log("arrays:   ", eager, "| f اتنادت", calls, "مرة");
~~~

~~~text الناتج (node lazy.mjs، Node 24)
generator: [ 1, 9, 25 ] | f اتنادت 5 مرة
arrays:    [ 1, 9, 25 ] | f اتنادت 1000 مرة
~~~

**ليه 5 بالظبط:** السلسلة بتشد قيمة واحدة كل مرة من الآخر للأول. [[take]] بتطلب قيمة، [[filter]] بتطلب من [[map]]، و [[map]] بتطلب من [[naturals]]:

| الرقم | [[f(n)]] | [[filter]] | [[take]] عنده |
|---|---|---|---|
| 1 | 1 | فردي، يعدّي | 1 |
| 2 | 4 | زوجي، يترمي | 1 |
| 3 | 9 | يعدّي | 2 |
| 4 | 16 | يترمي | 2 |
| 5 | 25 | يعدّي | 3، كفاية |

بعد ما [[take]] خد ٣، نادى [[return()]] على اللي قبله فالسلسلة كلها قفلت، و [[naturals]] متطلبش منها 6 أصلًا.

**مع الـ arrays:** كل خطوة بتخلص على **كل** العناصر قبل اللي بعدها: [[map]] بتعمل array فيها 1000 مربع (1000 نداء)، وبعدين [[filter]] بتعمل array فيها 500، وبعدين [[slice]] بياخد ٣ ويرمي الباقي. ومع [[naturals()]] لانهائية مكانش ينفع أصلًا.

**الغلطة الشائعة:** تفتكر إن [[map]] على iterator بتعمل نفس اللي على array. على array بترجّع array كاملة، وعلى iterator بترجّع iterator تاني lazy. نفس الاسم، سلوك مختلف خالص في التوقيت.` }
          ],
          ref: [
            { t: "MDN: Iterators and generators", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators" },
            { t: "MDN: function*", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*" },
            { t: "MDN: Iterator.prototype.take()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/take" },
            { t: "MDN: for await...of", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of" },
          ],
          pre: [{ to: "js/iteration protocols: next و return و throw", why: R`[[Symbol.iterator]] و [[next()]] و [[{ value, done }]] من جوه` }],
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
            { lvl: 'سريع', t: R`refactor: الدالة دي شغالة بس كل نوع ملف جديد بيكبّرها: [[function exportData(rows, type) { if (type === "csv") return rows.map((r) => r.join(",")).join("\n"); else if (type === "json") return JSON.stringify(rows); else if (type === "tsv") return rows.map((r) => r.join("\t")).join("\n"); }]]. حوّلها لـ object [[exporters]] فيه دالة لكل نوع، و [[exportData]] بتختار منه، من غير ما الناتج يتغيّر.`, done: R`لنفس [[rows = [ ["a", 1], ["b", 2] ] ]] الناتج بالتلات أنواع زي النسخة القديمة حرف بحرف (قارنهم بـ [[===]] وطلع [[true]] للتلاتة)، و [[exportData(rows, "xml")]] بيرمي [[RangeError]] فيه كلمة [[xml]] بدل ما يرجّع [[undefined]] ساكت زي القديمة، وإضافة نوع [[md]] بقت سطر واحد في [[exporters]].`, sol: R`~~~js export.mjs
// القديمة زي ما هي
function exportDataOld(rows, type) {
  if (type === "csv") return rows.map((r) => r.join(",")).join("\n");
  else if (type === "json") return JSON.stringify(rows);
  else if (type === "tsv") return rows.map((r) => r.join("\t")).join("\n");
}

// الجديدة: strategy لكل نوع
const exporters = {
  csv: (rows) => rows.map((r) => r.join(",")).join("\n"),
  json: (rows) => JSON.stringify(rows),
  tsv: (rows) => rows.map((r) => r.join("\t")).join("\n"),
  md: (rows) => rows.map((r) => $__bt| $__{r.join(" | ")} |$__bt).join("\n"),
};

function exportData(rows, type) {
  if (!Object.hasOwn(exporters, type)) {
    throw new RangeError($__btنوع مش معروف: $__{type} (المتاح: $__{Object.keys(exporters).join(", ")})$__bt);
  }
  return exporters[type](rows);
}

const rows = [["a", 1], ["b", 2]];
for (const t of ["csv", "json", "tsv"]) {
  console.log(t, exportData(rows, t) === exportDataOld(rows, t));
}
console.log("القديمة مع xml:", exportDataOld(rows, "xml"));
try { exportData(rows, "xml"); } catch (e) { console.log(e.name + ":", e.message); }
console.log(exportData(rows, "md"));
~~~

~~~text الناتج (node export.mjs، Node 24)
csv true
json true
tsv true
القديمة مع xml: undefined
RangeError: نوع مش معروف: xml (المتاح: csv, json, tsv, md)
| a | 1 |
| b | 2 |
~~~

**ليه كده:**

- **[[exporters]]:** كل فرع من الـ [[if]] بقى دالة لوحدها في object، والمفتاح هو اسم النوع. ده الـ Strategy: «الطريقة» بقت قيمة تتختار، مش فرع في كود.
- **التلات [[true]]:** قارنّا كل نوع بالقديمة بـ [[===]] على نفس الـ [[rows]]، فالـ refactor مغيّرش الناتج حرف واحد. اعمل ده دايمًا قبل ما تمسح النسخة القديمة.
- **[[Object.hasOwn]]:** بيرفض أي نوع مش مكتوب في الـ object نفسه. من غيره [[exportData(rows, "toString")]] كانت هتنادي [[Object.prototype.toString]] وترجّع [["[object Object]"]] من غير أي error.
- **الـ [[RangeError]] بقايمة الأنواع المتاحة:** القديمة رجّعت [[undefined]] ساكتة، وده بيوصل لملف فاضي يتنزّل عند اليوزر. الجديدة بتقول الغلط فين وإيه المتاح.
- **[[md]]:** نوع جديد = سطر واحد في [[exporters]]، و [[exportData]] نفسها متتلمسش.

**الغلطة الشائعة:** تحوّلها لـ [[switch]] وتفتكر إنها كده بقت أنضف. الـ switch لسه دالة واحدة بتكبر مع كل نوع، ومحدش يقدر يضيف نوع من برا الملف. الـ object بيتعدّل أو يتوسّع ([[exporters.xml = ...]]) من غير ما تفتح الدالة.` },
            { lvl: 'تطبيق', t: R`ابني جدول منتجات في صفحة HTML: [[<select>]] فيه «الأرخص» و «الأغلى» و «بالاسم» و «الأحدث»، وكل اختيار اسمه key في object [[sorters]] قيمته comparator. لما الـ select يتغيّر، اعمل [[products.toSorted(sorters[select.value])]] وارسم الصفوف تاني بـ [[textContent]].`, done: R`كل اختيار بيرتّب صح (جرّب ٥ منتجات فيهم سعرين زي بعض واسم عربي)، و [[products]] الأصلية مبتتغيّرش (اطبعها بعد كل ترتيب)، وإضافة ترتيب جديد محتاجة سطر في [[sorters]] و [[<option>]] بس، ومفيش ولا [[if]] على قيمة الـ select.`, sol: R`~~~live 330 products.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>المنتجات</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
  table { border-collapse: collapse; width: 100%; max-width: 480px; }
  th, td { border-bottom: 1px solid #ddd; padding: 6px 8px; text-align: start; }
  select { font: inherit; padding: 4px; }
  #log { color: #555; font-size: 13px; }
</style>
</head>
<body>
<label>رتّب:
  <select id="sort">
    <option value="cheap">الأرخص</option>
    <option value="expensive">الأغلى</option>
    <option value="name">بالاسم</option>
    <option value="newest">الأحدث</option>
  </select>
</label>
<table>
  <thead><tr><th>المنتج</th><th>السعر</th><th>اتضاف</th></tr></thead>
  <tbody id="rows"></tbody>
</table>
<p id="log"></p>
<script>
  const products = [
    { name: "مج", price: 120, added: "2026-03-01" },
    { name: "تيشيرت", price: 250, added: "2026-05-10" },
    { name: "أجندة", price: 120, added: "2026-01-20" },
    { name: "شنطة", price: 400, added: "2026-06-02" },
    { name: "بادج", price: 30, added: "2026-04-15" },
  ];

  // كل ترتيب = comparator، والاسم = value بتاع الـ option
  const sorters = {
    cheap: (a, b) => a.price - b.price,
    expensive: (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name, "ar"),
    newest: (a, b) => b.added.localeCompare(a.added),
  };

  const select = document.querySelector("#sort");
  const tbody = document.querySelector("#rows");

  function render() {
    const sorted = products.toSorted(sorters[select.value]);
    tbody.replaceChildren(
      ...sorted.map((p) => {
        const tr = document.createElement("tr");
        for (const v of [p.name, p.price + " ج", p.added]) {
          const td = document.createElement("td");
          td.textContent = v;
          tr.append(td);
        }
        return tr;
      }),
    );
    document.querySelector("#log").textContent =
      "products الأصلية لسه: " + products.map((p) => p.name).join("، ");
  }

  select.addEventListener("change", render);
  render();
</script>
</body>
</html>
~~~

غيّر الترتيب في الـ preview، والسطر اللي تحت الجدول هيفضل بنفس الترتيب الأصلي.

~~~text الناتج (Chrome 158 headless، اخترنا كل option وقرينا الصفوف)
cheap     بادج 30 ج | مج 120 ج | أجندة 120 ج | تيشيرت 250 ج | شنطة 400 ج
expensive شنطة 400 ج | تيشيرت 250 ج | مج 120 ج | أجندة 120 ج | بادج 30 ج
name      أجندة 120 ج | بادج 30 ج | تيشيرت 250 ج | شنطة 400 ج | مج 120 ج
newest    شنطة 400 ج | تيشيرت 250 ج | بادج 30 ج | مج 120 ج | أجندة 120 ج
products الأصلية لسه: مج، تيشيرت، أجندة، شنطة، بادج
pageerrors: 0
~~~

**ليه كده:**

- **[[sorters]]:** كل مفتاح = [[value]] بتاع [[<option>]]، وكل قيمة = comparator. [[sorters[select.value]]] بيختار الـ strategy من غير ولا [[if]].
- **[[toSorted]] مش [[sort]]:** بترجّع array جديدة، فـ [[products]] بتفضل بالترتيب الأصلي (السطر اللي تحت بيأكد بعد كل تغيير).
- **السعرين زي بعض (مج وأجندة 120):** في «الأرخص» و «الأغلى» الاتنين ظهروا بنفس ترتيبهم الأصلي (مج الأول). ده لأن الـ sort في JS **stable** من ES2019: العناصر اللي الـ comparator بيقول عليها متساوية بتحافظ على ترتيبها.
- **[[localeCompare(b.name, "ar")]]:** بيرتّب الحروف العربي صح (أ قبل ب قبل ت)، مش بأرقام الـ Unicode. والتواريخ بصيغة [[YYYY-MM-DD]] بتترتّب صح كنص.
- **[[textContent]] و [[replaceChildren]]:** مفيش [[innerHTML]]، فاسم منتج فيه [[<]] هيظهر زي ما هو مش هيتنفّذ.

**إضافة ترتيب جديد:** سطر في [[sorters]] (مثلًا [[oldest: (a, b) => a.added.localeCompare(b.added)]]) و [[<option value="oldest">]]، والباقي ميتلمسش.

**الغلطة الشائعة:** comparator بيرجّع boolean ([[(a, b) => a.price > b.price]]). المفروض يرجّع رقم سالب أو صفر أو موجب، والـ boolean بيتحوّل لـ 1 أو 0 بس، فمفيش أبدًا «a قبل b». جرّبناها في Node 24: [[[5, 1, 4, 2, 3].toSorted((a, b) => a > b)]] رجّعت [[[ 5, 1, 4, 2, 3 ]]] زي ما هي، و [[(a, b) => a - b]] رجّعت [[[ 1, 2, 3, 4, 5 ]]].` },
            { lvl: 'تحدي', t: R`اكتب اختبار: ملف [[shipping.test.mjs]] بـ [[node:test]] و [[node:assert]] لـ [[shippingCost]] بتاع الدرس: الحد بالظبط ([[total: 500]] و [[499]])، و [[items: 0]] في express، وطريقة مش موجودة، و [[toString]] و [[__proto__]]، وإن strategy جديدة بتشتغل. وبعدين بوّظ الكود عمدًا (غيّر [[>=]] لـ [[>]]، وشيل [[hasOwn]]) واتأكد إن فيه تست بيقع لكل بوظة.`, done: R`[[node --test]] بيعدّي ٦ تستات على الأقل على الكود السليم، و [[>]] بدل [[>=]] بيوقّع تست الـ 500 بالظبط، وشيل [[hasOwn]] بيوقّع تست [[toString]] (بيرجّع [["[object Object]"]] بدل ما يرمي)، وكل تست اسمه بيقول بيختبر إيه.`, sol: R`الكود اتنقل من الدرس لـ module عشان التست يعمل له import (نفس الدوال بالظبط).

~~~js shipping.mjs
export const shipping = {
  standard: (order) => (order.total >= 500 ? 0 : 40),
  express: (order) => 80 + order.items * 5,
  pickup: () => 0,
};

export function shippingCost(order, method) {
  if (!Object.hasOwn(shipping, method)) {
    throw new RangeError($__btطريقة شحن مش معروفة: $__{method}$__bt);
  }
  return shipping[method](order);
}
~~~

~~~js shipping.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { shipping, shippingCost } from "./shipping.mjs";

test("standard: 500 بالظبط شحن مجاني", () => {
  assert.equal(shippingCost({ total: 500, items: 2 }, "standard"), 0);
});

test("standard: 499 بيدفع 40", () => {
  assert.equal(shippingCost({ total: 499, items: 2 }, "standard"), 40);
});

test("express: items صفر = 80 بس", () => {
  assert.equal(shippingCost({ total: 100, items: 0 }, "express"), 80);
});

test("طريقة مش موجودة بترمي RangeError فيها اسمها", () => {
  assert.throws(() => shippingCost({ total: 1, items: 1 }, "drone"), {
    name: "RangeError",
    message: /drone/,
  });
});

test("toString و __proto__ و constructor مش طرق شحن", () => {
  for (const m of ["toString", "__proto__", "constructor"]) {
    assert.throws(() => shippingCost({ total: 1, items: 1 }, m), RangeError, m);
  }
});

test("strategy جديدة بتشتغل من غير ما shippingCost تتغيّر", (t) => {
  shipping.sameDay = () => 150;
  t.after(() => delete shipping.sameDay);
  assert.equal(shippingCost({ total: 1, items: 1 }, "sameDay"), 150);
});
~~~

~~~text الناتج (node --test، Node 24، الكود السليم)
✔ standard: 500 بالظبط شحن مجاني (0.7408ms)
✔ standard: 499 بيدفع 40 (0.6466ms)
✔ express: items صفر = 80 بس (0.1226ms)
✔ طريقة مش موجودة بترمي RangeError فيها اسمها (0.5564ms)
✔ toString و __proto__ و constructor مش طرق شحن (0.1597ms)
✔ strategy جديدة بتشتغل من غير ما shippingCost تتغيّر (0.565ms)
ℹ tests 6
ℹ pass 6
ℹ fail 0
~~~

**البوظة الأولى:** [[order.total > 500]] بدل [[>=]]:

~~~text الناتج (مختصر)
✖ standard: 500 بالظبط شحن مجاني (1.2646ms)
ℹ pass 5
ℹ fail 1
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
~~~

**البوظة التانية:** [[if (!shipping[method])]] بدل [[Object.hasOwn]]:

~~~text الناتج (مختصر)
✖ toString و __proto__ و constructor مش طرق شحن (0.5146ms)
ℹ pass 5
ℹ fail 1
  AssertionError [ERR_ASSERTION]: Missing expected exception (RangeError): toString
~~~

**ليه كده:**

- **تست الحد بالظبط (500 و 499):** أغلب الباجات في الأرقام بتبقى عند الحد. تست بـ 600 و 100 بس كان هيعدّي على [[>]] و [[>=]] الاتنين، فمش بيحمي حاجة.
- **[[assert.throws(fn, { name, message: /drone/ })]]:** بيتأكد إن الـ error من النوع الصح **وإن** الرسالة فيها اسم الطريقة، عشان اللي يقرا اللوج يعرف الغلط.
- **[[toString]] و [[__proto__]] و [[constructor]]:** موجودين على أي object من الـ prototype. من غير [[hasOwn]]، [[shipping["toString"]]] دالة حقيقية فالشرط عدّى ونادى [[Object.prototype.toString]]. والتالت في [[assert.throws]] ([[m]]) هو الرسالة اللي ظهرت في الفشل: [[Missing expected exception (RangeError): toString]]، فعرفنا أنهي واحد عدّى.
- **[[t.after(() => delete shipping.sameDay)]]:** التست بيضيف strategy على object مشترك، فلازم يشيلها بعد ما يخلص، وإلا التستات اللي بعده هتلاقيها.

**الغلطة الشائعة:** تكتب التستات وتشوفها خضرا وتبطّل. تست عمرك ما شفته بيقع ممكن يكون مبيختبرش حاجة. البوظة المقصودة (اللي اسمها mutation testing) بتثبت إن كل تست بيمسك حاجة.` },
          ],
          ref: [
            { t: "MDN: First-class Function", url: "https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function" },
            { t: "MDN: Object.hasOwn()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn" },
            { t: "MDN: Array.prototype.sort()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort" },
            { t: "Node.js: Test runner", url: "https://nodejs.org/api/test.html" },
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
