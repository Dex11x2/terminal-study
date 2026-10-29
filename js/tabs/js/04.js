// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "الدوال",
      l: 1,
      n: "تكتب دالة بأكتر من شكل، وتتعامل مع الباراميترات، وتبعت دوال لدوال",
      projects: [
        { lvl: 'صغير', t: R`آلة حاسبة بـ object دوال`, what: R`object مفاتيحه العمليات ([["+"]] و [["-"]] و [["*"]] و [["/"]] و [["%"]]) وقيمه arrow functions، ودالة [[calc(a, op, b)]] بتدوّر عليه بدل switch. من دروس «function و arrow» و «switch ولا object lookup».`, done: R`[[calc(6, "*", 7)]] 42، والعملية المش موجودة بترجّع رسالة، وإضافة عملية جديدة ([["**"]]) سطر واحد في الـ object من غير ما تلمس [[calc]].` },
        { lvl: 'صغير', t: R`logger بمستويات`, what: R`[[log(level = "info", ...parts)]] بتطبع الوقت ([[new Date().toISOString()]]) والمستوى بحروف كبيرة وكل الـ parts جنب بعض. من درس «default و rest و spread».`, done: R`[[log("warn", "disk", 91, "%")]] بيطبع سطر فيه [[WARN]] و [[disk 91 %]]، و [[log(undefined, "hi")]] بيطبع [[INFO]].` },
        { lvl: 'متوسط', t: R`مصنع خصومات`, what: R`[[makeDiscount(percent)]] و [[makeCoupon(code, amount, minOrder)]] بيرجّعوا دوال بتاخد الإجمالي وترجّع الجديد، و [[applyAll(total, ...rules)]] بتطبقهم بالترتيب. من درس «higher-order functions» و «default و rest و spread».`, done: R`[[applyAll(1000, makeDiscount(10), makeCoupon("EID", 50, 500))]] بترجّع 850. الكوبون على طلب 300 مبيطبقش، والإجمالي عمره ما بيبقى سالب.` },
        { lvl: 'متوسط', t: R`validator بيتركّب`, what: R`دوال صغيرة زي [[required]] و [[minLength(n)]] و [[isEmail]]، كل واحدة بترجّع رسالة أو null، و [[rules(...fns)]] بترجّع دالة بتشغّلهم كلهم على قيمة وتجمع الرسايل. من وحدة «الدوال» كلها و «string methods».`, done: R`[[rules(required, minLength(8))("")]] بترجّع array فيها رسالة «مطلوب»، و [[rules(required, minLength(8))("abc")]] فيها رسالة «قصير» بس، وقيمة سليمة بترجّع [[[]]]. وتقدر تزود قاعدة جديدة من غير ما تعدّل [[rules]].` },
        { lvl: 'كبير', t: R`pipeline لتنضيف طلب`, what: R`[[pipe(...fns)]] بتاخد دوال وترجّع دالة واحدة بتعدّي القيمة عليهم بالترتيب. اعمل خطوات: [[trimFields]] و [[toNumbers]] و [[addTotal]] و [[validate]]، وكل خطوة بترجّع object جديد من غير ما تعدّل القديم (spread). ولفّ كل خطوة بـ [[withLog]] من الدرس. واختبرها بـ [[check]] على طلب سليم وطلب ناقص وطلب كميته نص. من وحدة «الدوال» و «القيم والأنواع» و «المتغيرات والنصوص».`, done: R`الطلب السليم بيطلع وفيه total صح، والطلب الأصلي لسه زي ما هو بعد الـ pipeline، والطلب البايظ بيطلع وفيه [[errors]] بتقول أنهي حقل، واللوج فيه سطر لكل خطوة. و [[pipe()]] من غير دوال بترجّع القيمة زي ما هي.`, ext: R`زوّد [[once]] لخطوة مكلفة، وخلي [[validate]] يوقّف الـ pipeline بدري، وعدّ وقت كل خطوة.` },
        { lvl: 'فكرة', t: R`أدواتك الصغيرة`, what: R`فكّر في ٣ حاجات بتتكرر في كودك (تقريب فلوس، تنسيق تاريخ، اختصار نص طويل بـ «…»، تحويل أرقام عربي لإنجليزي) واعملهم دوال صغيرة بـ defaults معقولة، وواحدة منهم على الأقل higher-order.`, done: R`كل دالة ليها ٣ اختبارات بتعدّي، وكلها بتشتغل من غير ما تبعت كل الـ arguments.`, ext: R`اجمعهم في ملف واحد واستخدمه في مشاريع الوحدات الجاية.` }
      ],
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
          practice: [
            { lvl: 'سريع', t: R`حوّل [[function triple(n) { return n * 3; }]] لـ arrow في سطر واحد.`, done: R`[[triple(4)]] بترجّع 12، ومفيش [[return]] ولا [[{ }]] في السطر.` },
            { lvl: 'تطبيق', t: R`[[toProduct(name, price)]] arrow بترجّع object، في سطر واحد.`, done: R`[[toProduct("Mug", 120)]] بترجّع [[{ name: 'Mug', price: 120 }]]، ومن غير القوسين حوالين الـ object بترجّع undefined.` },
            { lvl: 'تحدي', t: R`نادي [[sayHi()]] قبل ما تعرّفها، مرة وهي [[function sayHi() {}]] ومرة [[const sayHi = () => {}]].`, done: R`الأولى بتشتغل، والتانية بتوقع بـ [[ReferenceError: Cannot access 'sayHi' before initialization]].` }
          ],
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

## ٨. recursion: دالة بتنادي نفسها

الدالة ممكن تنادي نفسها. ده اسمه **recursion**، وبيبقى أوضح من اللوب لما الداتا نفسها متداخلة (فولدر جواه فولدرات، تعليق عليه ردود، قايمة جواها قوايم).

~~~js recursion.js
function sumTo(n) {
  if (n <= 0) return 0;          // الـ base case: هنا بنقف
  return n + sumTo(n - 1);       // نفس المشكلة بس أصغر بواحد
}
console.log(sumTo(100));
~~~

~~~text الناتج · Node 24.22.1
5050
~~~

**أي recursion محتاج حاجتين:**

| الحتة | بتعمل إيه | لو نسيتها |
|---|---|---|
| الـ base case ([[if (n <= 0) return 0]]) | أصغر حالة، إجابتها معروفة من غير نداء تاني | الدالة بتنادي نفسها للأبد لحد ما الـ stack يتملي |
| الخطوة ([[n + sumTo(n - 1)]]) | بتحل جزء وبتدّي الباقي لنفس الدالة بمدخل **أصغر** | لو المدخل مبيصغرش (مثلًا [[sumTo(n)]])، نفس النتيجة: مبتقفش |

### بتمشي إزاي من جوه

كل نداء بيستنى اللي بعده يخلص. فـ [[sumTo(3)]] بتبقى:

~~~text
sumTo(3) = 3 + sumTo(2)
               2 + sumTo(1)
                   1 + sumTo(0)
                       0          <- base case، ومن هنا بنرجع لفوق
               2 + 1 = 3
3 + 3 = 6
~~~

كل نداء مستني بيتحفظ في الـ **call stack** (نفس السطور اللي بتشوفها في الـ stack trace، درس «اقرا الـ error»).

### والـ stack ليه حد

~~~js
let depth = 0;
function dive() { depth++; dive(); }      // مفيش base case
try { dive(); } catch (e) { console.log(e.name + ':', e.message, '| depth', depth); }
try { sumTo(100000); } catch (e) { console.log('sumTo(100000):', e.name, e.message); }
~~~

~~~text الناتج · Node 24.22.1
RangeError: Maximum call stack size exceeded | depth 12502
sumTo(100000): RangeError Maximum call stack size exceeded
~~~

- **حوالي ١٢ ألف نداء** على Node 24 وبعدها [[RangeError]]. الرقم بيختلف حسب حجم كل نداء والمتصفح، فمتعتمدش عليه.
- يعني [[sumTo]] الـ recursive **أضعف** من اللوب اللي في تمرين sumTo: اللوب عدّ لـ ١٠٠ مليون في حوالي 68ms من غير أي مشكلة. فلما المشكلة «عدّ لحد n» استخدم لوب. و V8 مبيعملش tail call optimization: جرّبت نسخة [[tail(n, acc)]] النداء فيها آخر حاجة، و [[tail(100000)]] وقعت بنفس الـ [[RangeError]].

### فين recursion بيكسب فعلًا: الداتا المتداخلة

~~~js
const tree = { name: 'src', children: [
  { name: 'a.js' },
  { name: 'lib', children: [{ name: 'b.js' }, { name: 'c.js' }] },
] };
const files = (node) => node.children ? node.children.flatMap(files) : [node.name];
console.log(files(tree));
~~~

~~~text الناتج
[ 'a.js', 'b.js', 'c.js' ]
~~~

- لو العنصر فيه [[children]]: هات الملفات من كل واحد منهم (بنفس الدالة) و [[flatMap]] بتلمّهم في array واحدة.
- لو مفيهوش: ده ملف، والإجابة [[[node.name]]]. ده الـ base case.

بلوب عادي كنت هتحتاج stack بإيدك. والعمق هنا عمق الفولدرات (عشرات مثلًا)، مش آلاف، فالـ stack مش مشكلة. وهتقابل نفس الشكل في الـ deep copy (درس «reference و copy») و deep equal (وحدة أسئلة انترفيو).

---

## الخلاصة

| | declaration | expression | arrow |
|---|---|---|---|
| الشكل | [[function f() {}]] | [[const f = function () {}]] | [[const f = () => ...]] |
| hoisting (تتنادي قبل سطرها) | أيوة | لأ | لأ |
| return من غير كلمة return | لأ | لأ | أيوة لو مفيش [[{ }]] |
| [[new]] | أيوة | أيوة | لأ |
| [[this]] بتاعتها | أيوة | أيوة | لأ، بتاخدها من برّه |

arrow للـ callbacks والدوال الصغيرة، و declaration للدوال الكبيرة. ولو بترجّع object من arrow: [[({ ... })]].
- recursion: base case وخطوة بتصغّر، والـ stack بيقع بعد حوالي ١٢ ألف نداء، فاستخدمه للداتا المتداخلة مش للعدّ.`,
          lines: [
            R`function declaration: بتعرّف دالة اسمها [[add]] بتاخد باراميترين. ولأنها declaration، JS بيسجّلها كاملة قبل ما ينفّذ أي سطر (hoisting)، فتقدر تناديها حتى من سطر قبل السطر ده.`,
            R`بترجّع ناتج الجمع للي نادى الدالة. في الجسم اللي بين [[{ }]] الـ [[return]] لازمة: من غيرها الدالة بتشتغل عادي بس بترجّع [[undefined]].`,
            R`نهاية [[add]].`,
            R`function expression: دالة من غير اسم متحطة كقيمة في المتغير [[multiply]]. على عكس الـ declaration، مينفعش تناديها قبل السطر ده، لأن [[const]] لسه مالوش قيمة (TDZ) وهترمي ReferenceError.`,
            R`نفس قواعد الجسم العادي: لازم [[return]] صريحة عشان الناتج يطلع برّه الدالة.`,
            R`نهاية الدالة. الـ [[;]] هنا لأن السطر كله تعيين متغير ([[const multiply = ...]])، مش تعريف دالة زي [[add]].`,
            R`arrow function في سطر واحد: من غير [[{ }]]، الـ expression اللي بعد [[=>]] بيترجّع لوحده (implicit return). ده الشكل اللي هتشوفه كتير في الـ callbacks الصغيرة.`,
            R`بترجّع object جديد فيه [[name]] (اختصار لـ [[name: name]]) و [[active: true]]. القوسين حوالين الـ object ضروريين: من غيرهم JS بيفهم [[{]] بداية جسم دالة، فيا يطلع SyntaxError يا الدالة ترجّع [[undefined]].`,
            R`arrow بجسم كامل بين [[{ }]]: هنا مفيش return تلقائي، فلو عايز ترجّع حاجة لازم تكتب [[return]]. و [[...items]] (rest) بيلم كل الـ arguments اللي تتبعت، أي عدد، في array واحدة.`,
            R`بتلف على كل عنصر في [[items]] وتطبعه في سطر لوحده. والـ callback اللي جوه [[forEach]] نفسه arrow، وده الاستخدام المعتاد ليها.`,
            R`نهاية [[logAll]].`,
            R`نداء عادي بيرجّع [[5]]. ولاحظ إن شكل النداء واحد مهما كانت الدالة اتعرّفت بأنهي شكل.`,
            R`نداء الـ arrow زي العادية بالظبط، ورجّعت [[16]] من غير ما نكتب [[return]].`,
            R`بترجّع object جديد [[{ name: "Sara", active: true }]]، وكل نداء بيعمل object منفصل في الذاكرة مش نفس الـ object.`,
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
          practice: [
            { lvl: 'سريع', t: R`[[greet(name = "ضيف")]] وجرّب [[greet()]] و [[greet(undefined)]] و [[greet(null)]].`, done: R`الأولتين بيرجعوا «أهلًا يا ضيف»، و [[greet(null)]] بترجّع «أهلًا يا null» (الـ default للـ undefined بس).` },
            { lvl: 'تطبيق', t: R`[[sumAll(...nums)]] بتجمع أي عدد أرقام.`, done: R`[[sumAll()]] 0، و [[sumAll(1, 2, 3)]] 6، و [[sumAll(...[4, 5])]] 9.` },
            { lvl: 'تحدي', t: R`[[createUser({ name, role = "user", active = true } = {})]] بترجّع object. جرّب [[createUser()]] و [[createUser({ name: "Ali", role: null })]] و [[Math.max(...[])]].`, done: R`[[createUser()]] بيرجّع role "user" و active true من غير error، والتانية role بتاعها null مش "user"، و [[Math.max(...[])]] بترجّع [[-Infinity]].` }
          ],
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
            R`دالة بباراميترين ليهم قيم افتراضية: لو الـ argument متبعتش (أو اتبعت [[undefined]]) الباراميتر بياخد القيمة اللي بعد [[=]]. ده بيوفّر عليك [[if (!name) name = ...]] جوه الدالة.`,
            R`بترجّع نص متركّب بـ template literal: كل [[$__{...}]] بيتحط مكانه قيمة المتغير، فبيطلع التحية وبعدها فاصلة ومسافة وبعدها الاسم.`,
            R`نهاية [[greet]].`,
            R`مفيش ولا argument، فالاتنين خدوا القيمة الافتراضية ورجّعت [["Hi, Guest"]].`,
            R`[[undefined]] الصريحة بتتعامل كإنك مبعتّش حاجة، فـ [[name]] خد [["Guest"]] و [[greeting]] خد [["Hey"]]. دي الطريقة لو عايز تسيب الأول على الافتراضي وتغيّر التاني.`,
            R`[[null]] قيمة حقيقية مش «مفيش»، فالـ default مبيشتغلش و [[name]] بقى [[null]] ويطلع [["Hi, null"]]. لو عايز تعامل [[null]] زي [[undefined]] استخدم [[name ?? "Guest"]] جوه الدالة.`,
            R`[[...nums]] (rest parameter) بيلم كل الـ arguments في array حقيقية اسمها [[nums]]، مهما كان عددهم وحتى لو صفر. ولازم يبقى آخر باراميتر في الدالة.`,
            R`[[reduce]] بتمشي على الـ array وتجمع كل رقم على اللي قبله ([[a]] المجموع لحد دلوقتي و [[b]] الرقم الحالي). والـ [[0]] في الآخر قيمة البداية: من غيرها [[sum()]] من غير أرقام هترمي TypeError (Reduce of empty array with no initial value).`,
            R`نهاية [[sum]].`,
            R`جوه الدالة [[nums]] بقت array فيها 1 و 2 و 3، فالناتج [[6]]. ولو بعت 10 أرقام هتشتغل بنفس الكود.`,
            R`array عادية فيها 3 درجات، هنستخدمها نشوف الـ [[...]] لما تتكتب في النداء بدل التعريف.`,
            R`هنا [[...]] اسمها spread: بتفرد عناصر الـ array كـ arguments منفصلة، كإنك كتبت [[Math.max(90, 75, 88)]]. من غيرها [[Math.max(scores)]] بترجّع [[NaN]] لأنها مستنية أرقام مش array.`,
            R`الباراميتر object بيتفكك على طول (destructuring): بناخد [[name]] و [[role]] و [[active]] منه، والاتنين الأخيرين ليهم default لو مش موجودين. و [[= {}]] في الآخر عشان لو ناديت [[createUser()]] من غير حاجة، متحاولش تفكك [[undefined]] وترمي TypeError.`,
            R`بترجّع object جديد بالـ shorthand: [[{ name }]] معناها [[{ name: name }]]، يعني الـ key اسمه زي اسم المتغير.`,
            R`نهاية [[createUser]].`,
            R`النداء بيتقري لوحده لأن كل قيمة جنب اسمها، والترتيب مش مهم. الناتج [[{ name: "Sara", role: "user", active: false }]]: [[role]] مش موجودة فخدت الـ default، و [[active]] اتبعتت [[false]] فالـ default متستخدمش (لأن [[false]] مش [[undefined]]).`,
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
          practice: [
            { lvl: 'سريع', t: R`[[repeat(n, fn)]] بتنادي fn عدد n مرة وبتبعتلها رقم اللفة.`, done: R`[[repeat(3, i => console.log(i))]] بيطبع 0 و 1 و 2.` },
            { lvl: 'تطبيق', t: R`[[makeDiscount(percent)]] بترجّع دالة بتاخد السعر.`, done: R`[[const sale = makeDiscount(20);]] وبعدين [[sale(500)]] بترجّع 400، وتقدر تعمل خصمين مختلفين من نفس الدالة.` },
            { lvl: 'تحدي', t: R`[[once(fn)]] بترجّع دالة بتشغّل fn أول مرة بس، وبعد كده بترجّع نفس النتيجة الأولى.`, done: R`[[const init = once(() => { console.log("init"); return 42; });]] وبعدين [[init(); init();]]: «init» بتتطبع مرة واحدة، والمرتين بيرجعوا 42.` }
          ],
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
            R`دالة higher-order لأنها بتاخد دالة كـ argument: [[times]] عدد المرات، و [[action]] الحاجة اللي تتعمل كل مرة. فـ [[repeat]] بتتحكم في «كام مرة»، واللي بيناديها يقرر «يعمل إيه».`,
            R`loop بتلف [[times]] مرة، وكل لفة تنادي [[action]] وتبعتلها رقم اللفة [[i]] (من 0). [[action]] هنا متغير شايل دالة، فبنناديه بـ [[()]] زي أي دالة.`,
            R`نهاية [[repeat]].`,
            R`بنبعت arrow function كـ callback، فـ [[repeat]] تناديها 3 مرات وتطبع «مرة 0» و«مرة 1» و«مرة 2». غيّر الـ callback ونفس [[repeat]] تعمل حاجة تانية خالص من غير ما تلمس كودها.`,
            R`الشكل التاني من higher-order: دالة بترجّع دالة. بتاخد [[factor]] وتصنع دالة ضرب مخصوصة ليه.`,
            R`الدالة الراجعة بتاخد [[x]] وتضربه في [[factor]]. ورغم إن [[multiplier]] هتخلص وترجع، الدالة الجديدة فاكرة [[factor]] بتاعها (ده الـ closure).`,
            R`نهاية [[multiplier]].`,
            R`[[multiplier(2)]] بترجّع دالة [[factor]] بتاعها 2، ونحفظها في [[double]]. فـ [[double]] دلوقتي دالة عادية تقدر تناديها.`,
            R`نفس المصنع بـ 3: دالة منفصلة ليها [[factor]] بتاعها، ومش بتأثر على [[double]].`,
            R`[[5 * 2]] يعني [[10]]: الـ [[factor]] اللي اتحفظ وقت [[multiplier(2)]] لسه موجود.`,
            R`[[5 * 3]] يعني [[15]]: كل دالة فاكرة الـ [[factor]] بتاعها هي بس.`,
            R`بنبعت [[double]] نفسها (من غير [[()]]) لـ [[map]]، فـ map تناديها على كل عنصر. لو كتبت [[map(double())]] كنت هتنادي double فورًا وتبعت ناتجها ([[NaN]]) بدل الدالة، فـ map ترمي TypeError.`,
            R`بتاخد أي عدد دوال ([[...fns]]) وترجّع دالة جديدة. لما تتنادى بـ [[x]]، [[reduce]] بيعدّي القيمة على الدوال بالترتيب: ناتج كل دالة يبقى مدخل اللي بعدها.`,
            R`أول قوسين بيبنوا الدالة المركّبة، والتانيين بيشغّلوها على [[1]]: [[double(1)]] يطلع 2، وبعدين [[triple(2)]] يطلع 6.`,
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
