// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "الدوال",
      l: 1,
      n: "تكتب دالة بأكتر من شكل، وتتعامل مع الباراميترات، وتبعت دوال لدوال",
      items: [
        {
          cmd: "function و arrow",
          title: "الفرق بين function و arrow function",
          desc: R`فيه ٣ أشكال: function declaration ([[function add() {}]])، و function expression ([[const add = function () {}]])، و arrow function ([[const add = () => {}]]).

الـ arrow أقصر، ولو الجسم expression واحد بيرجّعه من غير [[return]]. بس فيه فروق حقيقية مش شكل بس: الـ arrow مالهاش [[this]] بتاعتها (بتاخدها من برّه)، ومينفعش تتعمل بـ [[new]]، ومفيهاش [[arguments]].

الاستخدام الشائع دلوقتي: arrow للـ callbacks والدوال الصغيرة، و function declaration للدوال الكبيرة على مستوى الملف.`,
          example: R`function add(a, b) {
  return a + b;
}
const multiply = function (a, b) {
  return a * b;
};
const square = (x) => x * x;
const toUser = (name) => ({ name, active: true });
const logAll = (...items) => {
  items.forEach((item) => console.log(item));
};
add(2, 3);        // 5
square(4);        // 16
toUser("Sara");   // { name: "Sara", active: true }`,
          try: R`حوّل [[add]] لـ arrow في سطر واحد. وبعدين امسح القوسين اللي حوالين الـ object في [[toUser]] وشغّل: هيطلع SyntaxError (Unexpected token ':')، لأن JS فهم الـ [[{]] بداية جسم دالة. ولو سبت جوه [[{ name }]] بس، مش هيطلع error، بس الدالة هترجّع undefined. فكّر ليه.`,
          flag: "script",
          deep: {
            why: "هتشوف الأشكال التلاتة في كل كود، ولازم تعرف تقراهم. والاختيار بينهم مش ذوق بس: فرق الـ this بيكسر كود حقيقي، والـ hoisting بيفرق في ترتيب الكود.",
            how: R`الدوال في JS قيم (first-class): تتحط في متغير، وتتبعت كـ argument، وترجع من دالة، وليها خصايص ([[add.name]] و [[add.length]]).

الـ function declaration بيتعملها hoisting كاملة، فتقدر تناديها قبل سطرها. الـ expression والـ arrow لأ، لأنهم متغيرات عادية (const) (درس hoisting).

الـ arrow بجسم من غير [[{ }]] بترجّع الـ expression على طول (implicit return). ولو عايز ترجّع object لازم تلفّه في قوسين [[({ })]]، وإلا JS هيفتكر الـ [[{]] بداية جسم الدالة.

وفرق الـ this هو الأهم: الدالة العادية الـ this بتاعتها بتتحدد وقت النداء، والـ arrow بتاخد this من المكان اللي اتكتبت فيه (درس this في المستوى ٢).`,
            when: R`arrow في الـ callbacks ([[map]] و [[filter]] و [[then]] و event handlers) وأي دالة صغيرة. function declaration للدوال الكبيرة اللي عايز تحطها تحت في الملف. و method عادية (مش arrow) جوه الـ objects والـ classes لما محتاج this.`,
            mistakes: R`ترجّع object من arrow من غير قوسين فترجع undefined. وتستخدم arrow كـ method في object وتستنى this تبقى الـ object. وتنسى [[return]] في arrow بجسم [[{ }]]: [[arr.map((x) => { x * 2 })]] بترجّع array كلها undefined. وفي الانترفيو: «الفرق بين arrow و regular function؟» قول this و arguments و new و hoisting.`
          },
          teach: R`## الفكرة

نفس الدالة ممكن تتكتب بـ ٣ أشكال. المثال بيكتب [[add]] و [[multiply]] و [[square]] كل واحدة بشكل، وبعدين بيوريك حالتين خاصين بالـ arrow: ترجيع object، و arrow بجسم كامل. اتشغّل في Node 24.

---

## ١. function declaration

~~~text functions.js
function add(a, b) {
  return a + b;
}
~~~

- [[function]]: الكلمة اللي بتبدأ دالة.
- [[add]]: اسمها.
- [[(a, b)]]: الباراميترات: أسماء للقيم اللي هتتبعت وقت النداء.
- [[{ ... }]]: جسم الدالة.
- [[return a + b;]]: احسب وابعت الناتج لمكان النداء. من غير [[return]] الدالة بترجّع [[undefined]].

الشكل ده بيتعمله **hoisting**: تقدر تناديه قبل سطره في الملف:

~~~text app.js
console.log(early(2));
function early(x) { return x * 10; }
~~~

~~~text الناتج
20
~~~

---

## ٢. function expression

~~~text functions.js
const multiply = function (a, b) {
  return a * b;
};
~~~

دالة من غير اسم بعد [[function]]، ومتحطة في متغير [[multiply]]. هي «قيمة» بتتعيّن زي أي رقم، عشان كده فيه [[;]] بعد [[}]]. ومش بيتعملها hoisting زي الأولى، لأنها متغير [[const]].

---

## ٣. arrow function بسطر واحد

~~~text functions.js
const square = (x) => x * x;
~~~

- [[(x)]]: الباراميتر.
- [[=>]]: السهم، ومنه الاسم arrow.
- [[x * x]]: من غير [[{ }]]، الـ expression ده **بيترجع لوحده** (implicit return).

يعني ده نفس:

~~~text functions.js
const square = function (x) { return x * x; };
~~~

---

## ٤. arrow بترجّع object: الأقواس

~~~text functions.js
const toUser = (name) => ({ name, active: true });
~~~

- [[{ name, active: true }]]: object. و [[name]] لوحدها اختصار لـ [[name: name]] (shorthand).
- الأقواس [[( )]] حوالين الـ object ضرورية. من غيرها JS بيفهم [[{]] بداية جسم دالة:

~~~text الناتج من غير القوسين (Node 24)
const toUser = (name) => { name, active: true };
                                       ^

SyntaxError: Unexpected token ':'
~~~

ولو سبت جواه [[{ name }]] بس، مفيش error، بس الدالة بترجّع [[undefined]] لأن ده بقى جسم دالة فيه سطر [[name]] ومفيش return. اتجرّب: [[const toUser2 = (name) => { name };]] وبعدين [[toUser2("Sara")]] طلعت [[undefined]].

---

## ٥. arrow بجسم كامل

~~~text functions.js
const logAll = (...items) => {
  items.forEach((item) => console.log(item));
};
~~~

- [[...items]] (rest): لمّ كل الـ arguments اللي هتتبعت في array اسمها [[items]] (الدرس اللي جاي).
- [[{ ... }]] بعد السهم: جسم كامل، فهنا لو عايز ترجّع لازم [[return]].
- [[items.forEach((item) => console.log(item))]]: لف على كل عنصر واطبعه. والـ [[(item) => ...]] جواها arrow تانية بتتبعت كـ callback.

~~~text app.js
console.log(logAll("a", "b"));
~~~

~~~text الناتج
a
b
undefined
~~~

[[undefined]] في الآخر لأن [[logAll]] ملهاش return. ونفس الغلطة مع [[map]]:

~~~text app.js
console.log([1, 2].map((x) => { x * 2 }));
~~~

~~~text الناتج
[ undefined, undefined ]
~~~

---

## ٦. النداء

~~~text Node REPL
> add(2, 3)
5
> square(4)
16
> toUser("Sara")
{ name: 'Sara', active: true }
~~~

النداء واحد للأشكال التلاتة: الاسم وبعده [[( )]] فيها القيم. [[2]] بقت [[a]] و [[3]] بقت [[b]].

---

## ٧. فروق اتجرّبت

~~~text app.js
console.log(add.name, add.length, typeof add);
const Arr = () => {};
try { new Arr(); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج
add 2 function
TypeError: Arr is not a constructor
~~~

- الدوال قيم ليها خصايص: [[name]] اسمها، و [[length]] عدد باراميتراتها.
- الـ arrow مينفعش تتعمل بـ [[new]]. و [[try { ... } catch (e) { ... }]] بتمسك الـ error بدل ما البرنامج يقع، و [[e.name]] و [[e.message]] نوعه ورسالته.
- ولو ناديت arrow (أو أي [[const]]) قبل سطرها: [[ReferenceError: Cannot access 'lateArrow' before initialization]].

---

## الخلاصة

| | declaration | expression | arrow |
|---|---|---|---|
| الشكل | [[function f() {}]] | [[const f = function () {}]] | [[const f = () => ...]] |
| hoisting (تتنادي قبل سطرها) | أيوة | لأ | لأ |
| return من غير كلمة return | لأ | لأ | أيوة لو مفيش [[{ }]] |
| [[new]] | أيوة | أيوة | لأ |
| [[this]] بتاعتها | أيوة | أيوة | لأ، بتاخدها من برّه |

arrow للـ callbacks والدوال الصغيرة، و declaration للدوال الكبيرة. ولو بترجّع object من arrow: [[({ ... })]].`,
          lines: [
            "function declaration: ليها اسم وبتتعملها hoisting.",
            R`[[return]] لازم في الجسم العادي.`,
            "قفلة.",
            "function expression: دالة من غير اسم متحطة في متغير.",
            "الجسم زي العادي.",
            R`قفلة، و [[;]] لأنه تعيين متغير.`,
            R`arrow بـ expression واحد: بترجّعه من غير [[return]].`,
            R`عشان ترجّع object لفّه في قوسين، وإلا [[{]] هتتفهم جسم دالة.`,
            R`arrow بجسم كامل: هنا لو عايز ترجّع لازم [[return]]. و [[...items]] بيلم كل الـ arguments.`,
            "لف على العناصر.",
            "قفلة.",
            "نداء عادي.",
            "نفس الشكل مع الـ arrow.",
            "رجّعت object جديد."
          ],
          sol: R`[[const add = (a, b) => a + b;]] وبترجّع 5 لـ [[add(2, 3)]]: من غير أقواس معقوفة الـ arrow بترجّع قيمة التعبير لوحدها من غير [[return]].

من غير القوسين حوالين الـ object، JS بيشوف [[{]] بداية جسم دالة، فـ [[name, active: true]] جوه جسم دالة مالهاش معنى، والـ [[:]] هي اللي بتطلع SyntaxError (Unexpected token ':'). ولو سبت [[{ name }]] بس فده جسم دالة فيه سطر واحد هو التعبير [[name]]، ومفيش [[return]]، فالدالة بترجّع undefined من غير أي error. ده أخطر من الـ SyntaxError لأنه بيعدّي بهدوء. الحل: [[(name) => ({ name, active: true })]].`
        },
        {
          cmd: "default و rest و spread",
          title: "باراميتر ليه قيمة افتراضية، ودالة بتاخد أي عدد",
          desc: R`[[function greet(name = "Guest")]] بتدي الباراميتر قيمة لو اتبعت [[undefined]] أو متبعتش خالص. و [[...nums]] (rest) بيلم أي عدد arguments في array. و [[...arr]] وقت النداء (spread) بيفرد الـ array arguments.

ولما الدالة بتاخد إعدادات كتير، الأحسن تاخد object واحد وتفكّه (destructuring) بقيم افتراضية: [[function createUser({ name, role = "user" } = {})]]. كده الترتيب ميفرقش والنداء بيتقري لوحده.`,
          example: R`function greet(name = "Guest", greeting = "Hi") {
  return $__bt$__{greeting}, $__{name}$__bt;
}
greet();                   // "Hi, Guest"
greet(undefined, "Hey");   // "Hey, Guest"
greet(null);               // "Hi, null": الـ default للـ undefined بس
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3);              // 6
const scores = [90, 75, 88];
Math.max(...scores);       // 90
function createUser({ name, role = "user", active = true } = {}) {
  return { name, role, active };
}
createUser({ name: "Sara", active: false });`,
          try: R`نادي [[createUser()]] من غير أي حاجة، وبعدين امسح [[= {}]] من الباراميتر ونادي تاني واقرا الـ error. وبعدين جرّب [[Math.max(...[])]] وشوف بترجّع إيه.`,
          flag: "script",
          deep: {
            why: "دوال بباراميترات اختيارية في كل حتة: pagination (صفحة وحجم)، و fetch helpers، و formatters. من غير defaults هتكتب [[if (x === undefined) x = ...]] في أول كل دالة.",
            how: R`الـ default بيتحسب وقت النداء مش وقت التعريف، فـ [[function f(list = [])]] بتعمل array جديدة كل مرة (عكس Python). وممكن يعتمد على باراميتر قبله: [[function f(a, b = a * 2)]].

الـ default بيشتغل مع [[undefined]] بس، فـ null و 0 و "" بيعدّوا زي ما هم.

[[...rest]] لازم يبقى آخر باراميتر، وهو array حقيقية (عكس [[arguments]] القديمة اللي array-like ومش موجودة في الـ arrow).

الـ object parameter مع destructuring هو أنضف API: [[createUser({ name: "Sara", active: false })]] بتتقري لوحدها، عكس [[createUser("Sara", undefined, false)]]. و [[= {}]] في الآخر عشان لو اتنادت من غير arguments، التفكيك ميقعش على undefined.`,
            when: R`default لأي باراميتر اختياري. rest لدوال زي [[sum]] و [[log]]. و object parameter لما الباراميترات أكتر من ٢ أو ٣، أو فيه أكتر من boolean.`,
            mistakes: R`تبعت [[null]] وتستنى الـ default يشتغل. وتنسى [[= {}]] فالنداء الفاضي يرمي «Cannot destructure property». و [[Math.max(...hugeArray)]] بمئات الآلاف من العناصر ممكن يعدّي حد الـ arguments ويرمي RangeError: استخدم reduce. وباراميترات boolean ورا بعض ([[fn(true, false, true)]]) محدش فاهم معناها.`
          },
          teach: R`## الفكرة

٣ أدوات بتخلي الدالة مرنة في الباراميترات: **default** (قيمة افتراضية لو محدش بعت)، و **rest** (لمّ أي عدد arguments في array)، و **spread** (عكسها: افرد array لـ arguments). وفي الآخر الشكل اللي هتشوفه كتير: الدالة بتاخد object واحد بإعدادات. كل اللي تحت اتشغّل في Node 24.

> **باراميتر** هو الاسم في تعريف الدالة ([[name]])، و **argument** هي القيمة اللي بتتبعت وقت النداء ([["Sara"]]).

---

## ١. default parameters

~~~text params.js
function greet(name = "Guest", greeting = "Hi") {
  return $__bt$__{greeting}, $__{name}$__bt;
}
~~~

[[name = "Guest"]] معناها: «لو [[name]] جت [[undefined]]، خليها [["Guest"]]». والـ return بيركّب الاتنين بـ template literal.

~~~text Node REPL
> greet()
'Hi, Guest'
> greet(undefined, "Hey")
'Hey, Guest'
> greet(null)
'Hi, null'
~~~

| النداء | name | greeting | ليه |
|---|---|---|---|
| [[greet()]] | [["Guest"]] | [["Hi"]] | متبعتش حاجة، فالاتنين undefined |
| [[greet(undefined, "Hey")]] | [["Guest"]] | [["Hey"]] | [[undefined]] صريحة بتشغّل الـ default، فتقدر تتخطى الأول |
| [[greet(null)]] | [[null]] | [["Hi"]] | [[null]] قيمة، مش undefined، فالـ default مشتغلش |

ونفس الكلام مع [[""]] و [[0]]: اتجرّب [[greet("")]] طلعت [['Hi, ']] و [[greet(0)]] طلعت [['Hi, 0']].

---

## ٢. rest: [[...nums]]

~~~text params.js
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
~~~

- التلات نقط قبل اسم الباراميتر معناها «لمّ كل الـ arguments اللي جاية هنا في array».
- [[nums.reduce((a, b) => a + b, 0)]]: اجمع عناصر الـ array، والجمع يبدأ من 0 (درس reduce تحت).

عشان نشوف [[nums]] حطينا [[console.log(nums)]] جوه الدالة:

~~~text الناتج
[ 1, 2, 3 ]
6
[]
0
~~~

[[sum(1, 2, 3)]] خلّت [[nums]] بـ [[[1, 2, 3]]] والمجموع 6. و [[sum()]] خلّتها array فاضية، والـ reduce رجّعت القيمة الأولية 0. الـ rest لازم يبقى **آخر** باراميتر.

---

## ٣. spread: [[...scores]] وقت النداء

~~~text params.js
const scores = [90, 75, 88];
Math.max(...scores);       // 90
~~~

[[Math.max]] بتاخد أرقام منفصلة: [[Math.max(90, 75, 88)]]. لو اديتها الـ array نفسها:

~~~text الناتج من Math.max(90, 75, 88), Math.max([90, 75]), Math.max(...[])
90 NaN -Infinity
~~~

- الـ array كـ argument واحد مش رقم، فـ NaN.
- [[...scores]] بتفرد الـ array أرقام منفصلة: نفس التلات نقط، بس هنا في **النداء** مش في التعريف، فشغلها العكس.
- array فاضية بتطلع [[-Infinity]] (سالب ما لا نهاية): أي رقم أكبر منها.

---

## ٤. object parameter بقيم افتراضية

~~~text params.js
function createUser({ name, role = "user", active = true } = {}) {
  return { name, role, active };
}
createUser({ name: "Sara", active: false });
~~~

نفكّ أول سطر:

| الحتة | معناها |
|---|---|
| [[{ name, role, active }]] جوه القوسين | الدالة بتاخد object واحد، وتطلّع منه ٣ خانات في ٣ متغيرات (destructuring) |
| [[role = "user"]] | لو الـ object مفيهوش role، خليها [["user"]] |
| [[= {}]] في الآخر | لو الدالة اتنادت من غير أي حاجة، اعتبر الـ object فاضي |
| [[return { name, role, active }]] | رجّع object بنفس الأسماء (shorthand) |

~~~text Node REPL
> createUser({ name: "Sara", active: false })
{ name: 'Sara', role: 'user', active: false }
> createUser()
{ name: undefined, role: 'user', active: true }
~~~

- الأول: [[role]] مش موجودة فخدت الـ default، و [[active]] اتبعتت [[false]] ففضلت false.
- التاني: [[= {}]] اشتغلت، فكل الـ defaults اشتغلت و [[name]] مالهاش default فبقت undefined.

من غير [[= {}]]:

~~~text الناتج (Node 24)
TypeError: Cannot destructure property 'name' of 'undefined' as it is undefined.
~~~

الدالة حاولت تطلّع [[name]] من [[undefined]].

ليه الشكل ده أحسن من [[createUser("Sara", undefined, false)]]؟ النداء بيتقري لوحده، والترتيب ميفرقش، وتقدر تسيب أي خانة.

---

## الخلاصة

| الأداة | مكانها | بتعمل إيه |
|---|---|---|
| [[x = 5]] | في التعريف | قيمة لو x جت undefined بس |
| [[...args]] | آخر باراميتر في التعريف | تلمّ الباقي في array |
| [[...arr]] | في النداء | تفرد الـ array arguments |
| [[({ a, b = 1 } = {})]] | في التعريف | تاخد object وتفكّه بـ defaults |

[[null]] مبتشغّلش الـ default، وأي options object خليه [[= {}]].`,
          lines: [
            "باراميترين ليهم قيم افتراضية.",
            "template literal بيركّبهم.",
            "قفلة.",
            "مفيش arguments: الاتنين خدوا الـ default.",
            R`[[undefined]] صريحة بتشغّل الـ default برضه، فتقدر تسيب الأول وتبعت التاني.`,
            R`[[null]] قيمة، فالـ default مبيشتغلش.`,
            R`[[...nums]] بيلم أي عدد arguments في array.`,
            "اجمعهم.",
            "قفلة.",
            R`[[nums]] بقت [[[1, 2, 3]]].`,
            "array عادية.",
            R`spread: فرد الـ array لـ arguments، زي [[Math.max(90, 75, 88)]].`,
            R`object parameter متفكك، بقيم افتراضية، و [[= {}]] لو متبعتش حاجة.`,
            "رجّع object بالـ shorthand.",
            "قفلة.",
            R`نداء بيتقري لوحده: [[role]] خدت "user".`
          ],
          sol: R`[[createUser()]] بترجّع [[{ name: undefined, role: "user", active: true }]]: الـ [[= {}]] خلّت الباراميتر object فاضي بدل undefined، والـ defaults اشتغلت.

من غير [[= {}]] بيطلع [[TypeError: Cannot destructure property 'name' of 'undefined' as it is undefined.]] لأنك بتحاول تفك undefined. عشان كده أي دالة بتاخد options object خليها دايمًا [[= {}]].

[[Math.max(...[])]] بترجّع [[-Infinity]] مش 0 ومش error: دي «القيمة المحايدة» للـ max (أي رقم أكبر منها). ولو عندك array ممكن تبقى فاضية افحص الطول الأول، وإلا هتعرض [[-Infinity]] لليوزر.`
        },
        {
          cmd: "higher-order functions",
          title: "دالة بتاخد دالة، أو بترجّع دالة",
          desc: R`الدالة اللي بتاخد دالة كـ argument أو بترجّع دالة اسمها higher-order function. والدالة اللي بتتبعت اسمها callback.

انت بتستخدمهم طول الوقت: [[map]] و [[filter]] و [[addEventListener]] و [[setTimeout]] كلهم بياخدوا callback. وتقدر تكتب بتوعك: دالة بترجّع دالة «متظبطة» بإعدادات معينة، زي [[multiplier(2)]] اللي بترجّع دالة بتضرب في 2.`,
          example: R`function repeat(times, action) {
  for (let i = 0; i < times; i++) action(i);
}
repeat(3, (i) => console.log("مرة", i));
function multiplier(factor) {
  return (x) => x * factor;
}
const double = multiplier(2);
const triple = multiplier(3);
double(5);                 // 10
triple(5);                 // 15
[1, 2, 3].map(double);     // [2, 4, 6]
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
pipe(double, triple)(1);   // 6`,
          try: R`اكتب [[withLog(fn)]] بترجّع دالة جديدة، بتطبع الـ arguments قبل ما تنادي fn وبتطبع الناتج بعدها. جرّبها على [[add]].`,
          flag: "script",
          deep: {
            why: "بتخليك تفصل «إيه اللي بيتعمل» عن «امتى وإزاي»: [[repeat]] بتعرف تكرر، والـ callback بيقرر يعمل إيه. ودي أساس React (الـ handlers والـ hooks)، و middleware في Express، و debounce و memoize في المستوى ٣.",
            how: R`عشان الدوال قيم، تقدر تحطها في متغير أو تبعتها أو ترجّعها زي أي رقم.

لما [[multiplier(2)]] بترجّع الدالة الداخلية، الدالة دي لسه فاكرة [[factor]] حتى بعد ما multiplier خلصت. ده اسمه closure، وهو درس كامل في المستوى ٢.

[[pipe]] بتركّب دوال ورا بعض: ناتج الأولى داخل التانية. و [[map(double)]] بتبعت الدالة نفسها من غير ما تناديها: لاحظ مفيش [[()]]. لو كتبت [[map(double())]] هتنادي double دلوقتي وتبعت ناتجها.`,
            when: "لما عندك منطق بيتكرر والجزء اللي بيتغير سلوك مش قيمة: retry و logging و caching و validation. وفي React: custom hooks و HOCs.",
            mistakes: R`تبعت [[fn()]] بدل [[fn]] كـ callback: [[button.addEventListener("click", save())]] بتنادي save فورًا وتبعت ناتجها. وتبعت دالة بتاخد باراميترات أكتر من اللي بيتبعتلها، زي [[["1","2"].map(parseInt)]] اللي بتبعت index كـ radix.`
          },
          teach: R`## الفكرة

في JS الدالة قيمة زي الرقم: تتحط في متغير، وتتبعت لدالة تانية، وترجع من دالة. الدالة اللي بتاخد دالة أو بترجّع دالة اسمها **higher-order function**، والدالة اللي بتتبعت اسمها **callback**. المثال فيه ٣ حالات: دالة بتاخد callback، ودالة بترجّع دالة، ودالة بتركّب دوال. اتشغّل في Node 24.

---

## ١. دالة بتاخد دالة: [[repeat]]

~~~text hof.js
function repeat(times, action) {
  for (let i = 0; i < times; i++) action(i);
}
repeat(3, (i) => console.log("مرة", i));
~~~

- [[repeat]] بتاخد رقم ([[times]]) ودالة ([[action]]).
- [[for (let i = 0; i < times; i++)]]: لف من 0 لحد قبل [[times]]. و [[i++]] يعني زوّد i واحد كل لفة.
- [[action(i)]]: نادي الدالة اللي اتبعتت، وابعتلها رقم اللفة.
- في النداء، التاني [[(i) => console.log("مرة", i)]] دالة كاملة بتتبعت كـ argument. [[repeat]] متعرفش هي هتعمل إيه: هي بس بتعرف تكرر.

~~~text الناتج
مرة 0
مرة 1
مرة 2
~~~

---

## ٢. دالة بترجّع دالة: [[multiplier]]

~~~text hof.js
function multiplier(factor) {
  return (x) => x * factor;
}
const double = multiplier(2);
const triple = multiplier(3);
~~~

- [[multiplier(2)]] مبترجّعش رقم، بترجّع **دالة** [[(x) => x * factor]].
- الدالة الراجعة فاكرة [[factor]] بـ 2 حتى بعد ما [[multiplier]] خلصت. ده اسمه **closure** (درس في المستوى ٢).
- فـ [[double]] دالة بتضرب في 2، و [[triple]] دالة تانية بتضرب في 3.

اطبع [[double]] نفسها:

~~~text الناتج من console.log(double, typeof double)
[Function (anonymous)] function
~~~

[[anonymous]] يعني «من غير اسم»: الدالة الراجعة arrow ملهاش اسم.

~~~text Node REPL
> double(5)
10
> triple(5)
15
~~~

---

## ٣. تبعت الدالة من غير ما تناديها

~~~text Node REPL
> [1, 2, 3].map(double)
[ 2, 4, 6 ]
~~~

[[map]] بتنادي الدالة اللي اديتها على كل عنصر. لاحظ [[double]] **من غير** [[()]]: بنبعت الدالة نفسها. لو كتبت [[double()]] كنت هتناديها دلوقتي من غير رقم:

~~~text الناتج من [1, 2].map(double())
TypeError: number NaN is not a function
~~~

[[double()]] رجّعت [[undefined * 2]] = NaN، و map استلمت NaN بدل دالة.

---

## ٤. [[pipe]]: دالة بتركّب دوال

~~~text hof.js
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
pipe(double, triple)(1);   // 6
~~~

السطر ده فيه سهمين، يعني دالة بترجّع دالة. نفكّه من برّه لجوه:

1. [[(...fns) =>]]: [[pipe]] بتاخد أي عدد دوال في array [[fns]].
2. [[(x) =>]]: وبترجّع دالة جديدة بتاخد قيمة البداية [[x]].
3. [[fns.reduce((v, f) => f(v), x)]]: ابدأ بـ [[x]]، وكل لفة خد الدالة الجاية [[f]] وطبّقها على القيمة الحالية [[v]].

والنداء [[pipe(double, triple)(1)]] فيه قوسين ورا بعض: الأولانيين بيعملوا الدالة، والتانيين بينادوها بـ 1. حطينا طباعة جوه الـ reduce عشان نشوف الخطوات:

~~~text الناتج
v = 1 → fn
v = 2 → fn
6
~~~

| اللفة | v | f | الناتج |
|---|---|---|---|
| ١ | 1 | double | 2 |
| ٢ | 2 | triple | 6 |

---

## ٥. حل الـ try: [[withLog]]

~~~text withLog.js
function withLog(fn) {
  return function (...args) {
    console.log("args:", args);
    const result = fn.apply(this, args);
    console.log("result:", result);
    return result;
  };
}
const add = (a, b) => a + b;
const loggedAdd = withLog(add);
loggedAdd(2, 3);
~~~

- [[withLog(fn)]] بتاخد دالة وبترجّع دالة جديدة «ملفوفة» حواليها.
- [[(...args)]]: الدالة الجديدة بتلمّ أي arguments.
- [[fn.apply(this, args)]]: نادي الدالة الأصلية وابعتلها عناصر [[args]] كـ arguments منفصلة. [[apply]] بتاخد الـ [[this]] والـ array (درس call و apply في المستوى ٢). كان ممكن [[fn(...args)]] برضه، بس apply بتحافظ على this لو اتلفّت method.
- [[return result]]: من غيرها الدالة الملفوفة هترجّع undefined.

~~~text الناتج (Node 24)
args: [ 2, 3 ]
result: 5
~~~

---

## الخلاصة

| النوع | مثال | معناه |
|---|---|---|
| بتاخد callback | [[repeat(3, fn)]] و [[arr.map(fn)]] | هي بتقرر امتى، والـ callback بيقرر إيه |
| بترجّع دالة | [[multiplier(2)]] | تعمل دوال متظبطة بإعدادات |
| بتركّب دوال | [[pipe(f, g)]] | ناتج كل واحدة يدخل اللي بعدها |

ابعت [[fn]] مش [[fn()]] لما المطلوب دالة.`,
          lines: [
            R`دالة بتاخد عدد مرات ودالة [[action]].`,
            R`بتنادي [[action]] كل مرة وتبعتلها رقم المرة.`,
            "قفلة.",
            "الـ callback بيقرر هيعمل إيه كل مرة.",
            "دالة بترجّع دالة.",
            R`الدالة الراجعة فاكرة [[factor]] (closure).`,
            "قفلة.",
            "دالة جديدة بتضرب في 2.",
            "ودالة تانية بتضرب في 3.",
            "10.",
            "15.",
            R`بعت [[double]] نفسها لـ map، من غير [[()]].`,
            "دالة بتركّب دوال: ناتج كل واحدة يدخل اللي بعدها.",
            "1 × 2 × 3 = 6."
          ],
          sol: R`[[withLog(add)(2, 3)]] المفروض تطبع [[args: [2, 3]]] وبعدها [[result: 5]] وترجّع 5. الفكرة إن withLog بتاخد دالة وبترجّع دالة: rest [[...args]] بتلم أي عدد arguments، و [[fn.apply(this, args)]] بتبعتهم زي ما هما.

الغلطة الشائعة إنك تنسى [[return r]] في الآخر: الـ log هيظهر صح، بس الدالة الجديدة هترجّع undefined وأي كود بيستخدم الناتج هيبوظ. والغلطة التانية إنك تنادي [[fn()]] وانت بتعرّف withLog (بدل ما ترجّع دالة) فتتنفّذ مرة واحدة بدري.`,
          solCode: R`function withLog(fn) {
  return function (...args) {
    console.log("args:", args);
    const result = fn.apply(this, args);
    console.log("result:", result);
    return result;
  };
}
const add = (a, b) => a + b;
const loggedAdd = withLog(add);
loggedAdd(2, 3); // args: [ 2, 3 ] ثم result: 5`
        }
      ]
    }
]);
