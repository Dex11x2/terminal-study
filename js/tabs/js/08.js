// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "scope و closures",
      l: 2,
      n: "المتغير شايفه مين، والـ hoisting، وليه الدالة بتفتكر متغيرات اتعملت برّاها",
      items: [
        {
          cmd: "scope",
          title: "المتغير ده شايفه مين؟ (lexical scope)",
          desc: R`الـ scope هو المكان اللي المتغير عايش فيه. فيه ٣ مستويات: global (الملف أو الصفحة كلها)، و function (جوه الدالة)، و block (بين [[{ }]] مع let و const).

الـ scope في JS «lexical»: بيتحدد من مكان الكود وانت بتكتبه، مش من مكان النداء. الدالة الداخلية شايفة متغيرات الدوال اللي حواليها، والعكس لأ. ولما تقرا متغير، JS بيدوّر في الـ scope الحالي، ولو ملقاهوش يطلع للي فوقه، لحد الـ global (scope chain).`,
          example: R`const app = "shop";                 // global scope
function checkout() {
  const total = 100;                // function scope
  if (total > 50) {
    const discount = 10;            // block scope
    console.log(app, total, discount);
  }
  console.log(typeof discount);     // "undefined": برا الـ block
}
function outer() {
  const secret = "x";
  function inner() {
    return secret;                  // مش لاقيه هنا، فطلع لـ outer
  }
  return inner();
}
checkout();
outer(); // "x"`,
          try: R`عرّف [[const app = "admin"]] جوه [[checkout]] قبل الـ if، وشوف الـ console.log بيطبع أنهي app (الأقرب بيكسب، ودي اسمها shadowing). وبعدين نادي [[inner()]] من برا outer واقرا الـ error.`,
          flag: "script",
          deep: {
            why: "أي bug من نوع «المتغير ده undefined ليه؟» أو «مين اللي غيّر القيمة دي؟» بيرجع للـ scope. وهو الأساس اللي الـ closures مبنية عليه، ودي أشهر سؤال انترفيو JS.",
            how: R`كل دالة وكل block بيعملوا environment جديد فيه متغيراتهم، ومعاه reference للـ environment اللي اتكتبوا جواه. البحث عن متغير بيمشي في السلسلة دي لفوق. وعشان السلسلة بتتحدد وقت الكتابة (lexical)، الدالة لو اتنادت من مكان تاني خالص، لسه شايفة المتغيرات بتاعة مكان تعريفها. ده عكس dynamic scope اللي في bash مثلًا.

الـ modules (ESM) ليها scope خاص بيها: الـ const في أول ملف module مش global، ومش بيظهر في ملف تاني غير لو عملته export. أما الـ script العادي في المتصفح، فالـ var والدوال في أوله بيبقوا على [[window]].

و [[globalThis]] هو الـ global object في أي بيئة ([[window]] في المتصفح و [[global]] في Node).`,
            when: "خلّي كل متغير في أضيق scope ممكن. الـ global للحاجات اللي فعلًا مشتركة، ويستحسن تبقى في module وتتعمل import.",
            mistakes: R`نفس اسم المتغير جوه وبرا (shadowing) فتفتكر انك بتعدّل اللي برا. وتعتمد على متغيرات global بين ملفات. وتنسى let/const فتعمل global بالغلط. وفي الانترفيو: «يعني إيه lexical scope؟» و «scope chain».`
          },
          teach: R`## الفكرة في سطرين

كل متغير ليه «حدود» عايش جواها، ودي اسمها **scope**. المثال فيه ٣ مستويات: global، وجوه دالة، وجوه block. وبعدين دالة جوه دالة عشان تشوف إن الداخلية بتشوف اللي حواليها. النواتج من تشغيله في [[app.js]] بـ Node 24.

---

## ١. global scope

~~~text app.js
const app = "shop";                 // global scope
~~~

متغير متعرّف برّه أي دالة أو block، فكل الكود في الملف شايفه.

---

## ٢. function scope و block scope

~~~text app.js
function checkout() {
  const total = 100;                // function scope
  if (total > 50) {
    const discount = 10;            // block scope
    console.log(app, total, discount);
  }
  console.log(typeof discount);     // "undefined": برا الـ block
}
~~~

- [[total]] اتعرّف جوه الدالة، فعايش جواها بس.
- [[{ }]] بتاعة الـ if اسمها **block**، و [[const]] و [[let]] جوه block عايشين جواه بس. فـ discount موجود بين القوسين دول وبس.
- السطر اللي جوه الـ if شايف التلاتة: discount من الـ block نفسه، و total من الدالة اللي حواليه، و app من الـ global.

### إزاي JS لقى app؟

لما بتكتب اسم متغير، JS بيدوّر عليه في الـ scope الحالي. لو ملقاهوش يطلع للي فوقه، وهكذا لحد الـ global. السلسلة دي اسمها **scope chain**:

~~~text البحث عن app
block بتاع الـ if   →  مش موجود
دالة checkout      →  مش موجود
global             →  "shop"  لقيته
~~~

### [[typeof discount]] برّه الـ block

[[typeof]] بيرجّع نوع القيمة كـ string. ولو المتغير مش موجود خالص مبيرميش error، بيرجّع [["undefined"]]. لو كتبت [[console.log(discount)]] بدلها:

~~~text الناتج
ReferenceError: discount is not defined
~~~

---

## ٣. دالة جوه دالة

~~~text app.js
function outer() {
  const secret = "x";
  function inner() {
    return secret;                  // مش لاقيه هنا، فطلع لـ outer
  }
  return inner();
}
~~~

inner مكتوبة **جوه** outer، فالـ scope اللي فوقها هو outer. لما تدوّر على secret ومتلاقيهوش جواها، تطلع لـ outer وتلاقيه. والعكس مش شغال: outer مش شايفة أي متغير جوه inner.

ودي معنى **lexical**: السلسلة بتتحدد من مكان كتابة الدالة في الكود، مش من المكان اللي اتنادت منه.

---

## ٤. التشغيل

~~~text app.js
checkout();
outer(); // "x"
~~~

~~~text الناتج
shop 100 10
undefined
x
~~~

(السطر الأخير طبعته بـ [[console.log(outer())]].)

---

## ٥. «جرّب»: shadowing و inner من برّه

لو ضفت [[const app = "admin";]] جوه checkout قبل الـ if:

~~~text الناتج
admin 100 10
~~~

وبعد الدالة [[console.log(app)]] لسه [[shop]]. ده **shadowing**: المتغير الداخلي «بيغطّي» على اللي برّه بنفس الاسم، لأن البحث بيقف عند أول واحد يلاقيه. الـ global متغيرتش.

ولو حطيت نفس السطر **بعد** الـ if بدل قبلها:

~~~text الناتج
ReferenceError: Cannot access 'app' before initialization
~~~

مش [["shop"]]! الاسم app بقى محجوز في الدالة من أولها، والسطر بتاعه لسه موصلش (ده TDZ، الدرس الجاي).

و [[inner()]] من برّه outer:

~~~text الناتج
ReferenceError: inner is not defined
~~~

---

## الخلاصة

| المستوى | بيتعمل بـ | عايش فين |
|---|---|---|
| global | تعريف برّه أي حاجة | الملف كله |
| function | تعريف جوه دالة | الدالة دي وأي حاجة جواها |
| block | [[let]] / [[const]] جوه [[{ }]] | الـ block ده بس |

> البحث بيطلع لفوق بس، من مكان الكتابة. وفي script عادي في المتصفح، [[var]] في الأول بيبقى خاصية على [[window]] و [[let]] لأ (جرّبتها في Chrome: [[window.gv]] طلعت 1 و [[window.gl]] طلعت undefined).`,
          lines: [
            "متغير global: الكل شايفه.",
            "دالة: ليها scope بتاعها.",
            R`[[total]] جوه الدالة بس.`,
            "block.",
            R`[[discount]] جوه الـ block ده بس.`,
            "الـ block شايف كل اللي فوقه.",
            "قفلة الـ block.",
            R`برا الـ block: [[discount]] مش موجود.`,
            "قفلة.",
            "دالة جواها دالة.",
            "متغير في الدالة الخارجية.",
            "دالة داخلية.",
            R`بتقرا [[secret]] من الـ scope اللي فوقها.`,
            "قفلة.",
            "نادي الداخلية.",
            "قفلة.",
            "شغّل.",
            "شغّل."
          ],
          sol: R`بعد ما تضيف [[const app = "admin"]] جوه checkout، الـ console.log بيطبع [[admin 100 10]]: JS بيدوّر على الاسم من الـ scope الأقرب ويطلع لبرّه، فلقى app بتاعة checkout قبل ما يوصل للـ global. الـ global نفسها متغيرتش، ولو طبعت app برّه الدالة هتلاقيها [["shop"]].

[[inner()]] من برّه outer بتطلع [[ReferenceError: inner is not defined]]: inner متعرّفة جوه outer، فمش موجودة في الـ global scope. الـ scope بيتحدد بمكان كتابة الكود (lexical)، مش بمكان النداء. ولو حطيت [[const app]] بعد الـ if بدل قبلها، هيطلع ReferenceError (TDZ) مش «shop»، لأن الاسم محجوز في الـ scope من أوله (الدرس الجاي).`
        },
        {
          cmd: "hoisting و TDZ",
          title: "ليه تقدر تنادي دالة قبل ما تكتبها؟",
          desc: R`قبل ما الكود يشتغل، JS بيعدّي على الـ scope ويسجّل كل التعريفات. ده اسمه hoisting: كأن التعريفات اتشالت لأول الـ scope.

بس كل نوع بيتسجّل بشكل مختلف: الـ function declaration بتتسجّل كاملة (تقدر تناديها قبل سطرها). و [[var]] بيتسجّل بقيمة undefined. و [[let]] و [[const]] و [[class]] بيتسجّلوا من غير قيمة، ولو لمستهم قبل سطرهم يطلع ReferenceError. الفترة دي اسمها TDZ (temporal dead zone).`,
          example: R`sayHi();                        // شغال: الدالة متسجّلة كاملة
function sayHi() { console.log("hi"); }
console.log(a);                 // undefined: var من غير قيمة
var a = 1;
greet();                        // TypeError: greet is not a function
var greet = () => console.log("hey");
console.log(b);                 // ReferenceError: Cannot access 'b' before initialization
let b = 2;`,
          try: R`شغّل الكود في ملف بـ Node، هتلاقيه وقف عند [[greet()]]. علّق السطر ده وشغّل تاني عشان توصل للـ ReferenceError. وبعدين غيّر [[var greet]] لـ [[const greet]] وشوف الرسالة اتغيرت لإيه.`,
          flag: "script",
          deep: {
            why: "بيفسّر رسايل errors غريبة زي «Cannot access before initialization» و «is not a function» على حاجة انت شايفها متعرّفة. ومن أشهر أسئلة «اتوقع الناتج».",
            how: R`الـ engine بيشتغل على مرحلتين: الأولى بيعمل الـ environment ويسجّل فيه كل الأسماء، والتانية بينفّذ سطر سطر.

في المرحلة الأولى: [[function f() {}]] بتتسجّل ومعاها جسمها. [[var x]] بيتسجّل ويتحط فيه undefined. [[let]] و [[const]] و [[class]] بيتسجّلوا «uninitialized»، وأي قراية ليهم قبل ما التنفيذ يوصل لسطرهم بترمي ReferenceError.

عشان كده [[var greet = () => ...]] بتدي TypeError مش ReferenceError: المتغير موجود وقيمته undefined، وانت بتحاول تنادي undefined.

الـ TDZ حاجة كويسة: بتمسك الغلط بدل ما تديك undefined بهدوء. وهي زمنية مش مكانية: دالة مكتوبة فوق [[let x]] تقدر تقرا x عادي لو اتنادت بعد السطر ده.`,
            when: R`استفيد من hoisting الدوال لو عايز تكتب الـ main فوق والتفاصيل تحت. غير كده، عرّف قبل ما تستخدم.`,
            mistakes: R`تفتكر إن let و const مبيتعملهمش hoisting خالص: بيتعمل، بس في TDZ. وتنادي arrow function متعرّفة تحت. وفي الانترفيو: «إيه الناتج؟» على كود زي اللي فوق، و «إيه هو TDZ؟».`
          },
          teach: R`## الفكرة في سطرين

JS مبيقراش الكود ويشغّله سطر سطر من غير تحضير. قبل التنفيذ بيعدّي على الـ scope ويسجّل كل الأسامي المتعرّفة فيه. فلما تستخدم اسم قبل سطره، النتيجة بتعتمد على **نوع التعريف**. المثال فيه ٤ أنواع، وكل واحد بيدّي نتيجة مختلفة. شغّلته في [[app.js]] بـ Node 24.

---

## ١. التسجيل قبل التنفيذ

لو تخيلنا المرحلة الأولى للملف ده، JS بيكتب لنفسه ورقة كده:

| الاسم | اتعرّف بـ | قيمته قبل التنفيذ |
|---|---|---|
| sayHi | [[function sayHi() {}]] | الدالة كاملة |
| a | [[var]] | [[undefined]] |
| greet | [[var]] | [[undefined]] |
| b | [[let]] | ممنوع اللمس (TDZ) |

وبعدين يبدأ ينفّذ من أول سطر. التسجيل ده اسمه **hoisting** (رفع)، كأن التعريفات اتشالت لفوق.

---

## ٢. function declaration

~~~text app.js
sayHi();                        // شغال: الدالة متسجّلة كاملة
function sayHi() { console.log("hi"); }
~~~

[[function اسم() {}]] مكتوبة لوحدها كجملة اسمها **function declaration**، وبتتسجّل بجسمها. فالنداء قبلها شغال: [[hi]].

---

## ٣. [[var]]

~~~text app.js
console.log(a);                 // undefined: var من غير قيمة
var a = 1;
~~~

[[var a = 1]] فيها حاجتين: تعريف (اتسجّل في المرحلة الأولى بـ undefined)، وإسناد [[= 1]] (بيحصل لما التنفيذ يوصل للسطر). فالقراية قبله بتدّي [[undefined]] من غير error.

---

## ٤. [[var]] فيها arrow function

~~~text app.js
greet();                        // TypeError: greet is not a function
var greet = () => console.log("hey");
~~~

greet زي a بالظبط: متغير var قيمته undefined لحد سطره. والـ arrow function قيمة بتتحط في المتغير، مش declaration. فـ [[greet()]] معناها «نادي undefined»:

~~~text الناتج: Node 24 (البرنامج وقف هنا)
hi
undefined
.../app.js:5
greet();                        // TypeError: greet is not a function
^

TypeError: greet is not a function
    at Object.<anonymous> (.../app.js:5:1)
~~~

اقرا الـ error: [[app.js:5]] رقم السطر، والـ [[^]] تحت مكان المشكلة، و [[5:1]] سطر 5 عمود 1. النوع **TypeError**: الاسم موجود، بس قيمته من النوع الغلط (undefined مش function).

---

## ٥. [[let]] و TDZ

علّقت سطر [[greet()]] بـ [[//]] في أوله وشغّلت تاني:

~~~text app.js
console.log(b);                 // ReferenceError: Cannot access 'b' before initialization
let b = 2;
~~~

~~~text الناتج: Node 24
hi
undefined
ReferenceError: Cannot access 'b' before initialization
~~~

b **متسجّلة** (عشان كده الرسالة مش «b is not defined»)، بس [[let]] و [[const]] و [[class]] بيفضلوا «مش جاهزين» لحد سطرهم. الفترة من أول الـ scope لحد سطر التعريف اسمها **TDZ** (temporal dead zone = المنطقة الميتة الزمنية). و initialization = أول قيمة.

---

## ٦. «جرّب»: [[const greet]]

لما غيّرت [[var greet]] لـ [[const greet]] ورجّعت النداء:

~~~text الناتج
ReferenceError: Cannot access 'greet' before initialization
~~~

نفس الغلطة، بس الرسالة بقت بتقولك المشكلة بالظبط: استخدمت greet قبل سطرها. و [[class]] نفس الحكاية: [[new C()]] قبل [[class C {}]] طلعت [[ReferenceError: Cannot access 'C' before initialization]].

---

## ٧. ليه «زمنية»؟

~~~text app.js
function f() { return x; }
f();          // ReferenceError: Cannot access 'x' before initialization
let x = 5;
f();          // 5
~~~

جرّبتها: نفس الدالة طلّعت error الأول و [[5]] بعد سطر let. اللي بيفرق **وقت** النداء، مش مكان الدالة في الملف.

---

## الخلاصة

| التعريف | قبل سطره | الرسالة |
|---|---|---|
| [[function f() {}]] | شغال كامل | |
| [[var x]] | [[undefined]] | |
| [[var f = () => {}]] ونادتها | TypeError | [[f is not a function]] |
| [[let]] / [[const]] / [[class]] | ReferenceError | [[Cannot access 'x' before initialization]] |
| اسم مش موجود خالص | ReferenceError | [[x is not defined]] |`,
          lines: [
            "نداء قبل التعريف: شغال لأن الـ declaration اتسجّلت كاملة.",
            "التعريف.",
            R`[[var a]] اتسجّل بـ undefined.`,
            "هنا بس القيمة اتحطت.",
            R`[[greet]] موجود بس قيمته undefined، ومينفعش تنادي undefined.`,
            "الدالة اتحطت هنا بس.",
            R`[[b]] في TDZ: ReferenceError.`,
            "التعريف."
          ],
          sol: R`أول تشغيل بيطبع [[hi]] وبعدين [[undefined]]، وبيقف عند [[TypeError: greet is not a function]]: [[var greet]] اتعمله hoisting بقيمة undefined، والنداء على undefined كـ function بيطلع TypeError مش ReferenceError.

بعد ما تعلّق سطر [[greet()]]: بيطبع hi و undefined وبعدين [[ReferenceError: Cannot access 'b' before initialization]]. الـ let اتعمله hoisting برضه، بس في الـ TDZ لحد سطر التعريف.

ولو خليت [[const greet]] (ورجّعت سطر النداء): الرسالة بتبقى [[ReferenceError: Cannot access 'greet' before initialization]]. يعني نفس الغلطة بقت error أوضح بيقولك المشكلة فين بالظبط، وده سبب إن const أحسن من var حتى في الدوال.`
        },
        {
          cmd: "closure",
          title: "يعني إيه closure؟",
          desc: R`الـ closure دالة فاكرة المتغيرات اللي كانت حواليها وقت ما اتعملت، حتى بعد ما الدالة اللي حواليها خلصت ورجعت.

ده بيحصل تلقائي مع كل دالة في JS، وبيستخدم في: متغيرات private محدش يوصلها غير من دوال معينة، ودوال «متظبطة» (factory)، والـ callbacks والـ event handlers اللي بتقرا متغيرات، و hooks في React.`,
          example: R`function createCounter(start = 0) {
  let count = start;
  return {
    increment() { return ++count; },
    get() { return count; },
  };
}
const c1 = createCounter();
const c2 = createCounter(10);
c1.increment();          // 1
c1.increment();          // 2
c2.increment();          // 11: كل counter ليه count بتاعه
console.log(c1.count);   // undefined: مفيش طريقة توصله غير من الدوال
console.log(c1.get());   // 2`,
          try: R`اكتب [[once(fn)]] بترجّع دالة بتنادي fn أول مرة بس، وبعد كده بترجّع نفس الناتج الأول. هتحتاج متغيرين في الـ closure: [[called]] و [[result]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          flag: "script",
          deep: {
            why: "ده السؤال رقم واحد في انترفيوهات JS. وهو اللي بيفسّر ليه الـ callbacks بتشتغل، وليه React hooks بتقرا قيم «قديمة» ساعات (stale closure)، وإزاي تعمل private state من غير classes.",
            how: R`لما دالة بتتعمل، بتاخد معاها reference للـ environment اللي اتعملت فيه (الـ scope chain من درس scope). لما [[createCounter]] بتخلص، الـ environment بتاعها كان المفروض يتمسح، بس الـ methods اللي رجعت لسه شايلة reference ليه، فالـ garbage collector مبيمسحوش.

كل نداء لـ createCounter بيعمل environment جديد، عشان كده c1 و c2 منفصلين.

الـ closure بيشيل reference للمتغير نفسه مش نسخة من قيمته. فلو المتغير اتغير بعد كده، الدالة هتشوف القيمة الجديدة. والعكس في React: كل render بيعمل دوال جديدة شايلة قيم الـ render ده، فـ [[setInterval]] اتعمل في أول render هيفضل شايف الـ state القديمة (stale closure)، والحل dependency array أو [[setCount((c) => c + 1)]] (تاب React).

وتكلفتها: أي متغير في closure عايش طول ما الدالة عايشة. لو الـ closure شايل object ضخم وأنت ناسيه في listener، ده memory leak (المستوى ٣).`,
            when: "private state، و factories، و memoize، و debounce، و once، وأي callback محتاج داتا من السياق اللي حواليه.",
            mistakes: R`تفتكر إن الـ closure بياخد نسخة من القيمة. وتنسى إن كل نداء بيعمل state جديدة، فتنادي [[createCounter()]] في كل مرة بدل ما تحفظ الناتج. وفي الانترفيو: متعرّفش closure بـ «دالة جوه دالة» بس؛ قول «دالة فاكرة الـ lexical environment بتاعها حتى بعد ما الدالة الخارجية خلصت» واديهم مثال counter.`
          },
          teach: R`## الفكرة في سطرين

في الطبيعي، متغيرات الدالة بتختفي لما الدالة تخلص. بس لو الدالة رجّعت دالة تانية بتستخدم المتغيرات دي، المتغيرات بتفضل عايشة عشانها. الدالة اللي «شايلة» متغيرات مكان ولادتها معاها اسمها **closure**. المثال بيعمل counter بالطريقة دي، والنواتج من Node 24.

---

## ١. الـ factory

~~~text app.js
function createCounter(start = 0) {
  let count = start;
  return {
    increment() { return ++count; },
    get() { return count; },
  };
}
~~~

- [[createCounter]] دالة بتعمل counter وترجّعه، فبنسميها **factory** (مصنع).
- [[start = 0]]: باراميتر بـ default.
- [[let count = start]]: متغير **محلي** جوه الدالة. [[let]] مش const لأننا هنغيّره.
- الدالة بترجّع object فيه method اتنين، والاتنين مكتوبين **جوه** createCounter، فالـ scope اللي فوقهم فيه count (درس scope).

### [[++count]]

[[++]] قبل المتغير معناها: زوّده واحد ورجّع القيمة **الجديدة**. ولو بعده ([[count++]]) بيرجّع القديمة. جرّبت: [[let n = 5; n++]] رجّعت 5 و n بقت 6، وبعدها [[++n]] رجّعت 7.

---

## ٢. اتنين counters

~~~text app.js
const c1 = createCounter();
const c2 = createCounter(10);
~~~

كل نداء لـ createCounter بيعمل **count جديد** خاص بيه. c1 شايل count بدأ من 0، و c2 شايل count تاني بدأ من 10. الـ closure هنا هو إن increment و get فاكرين count بتاع النداء اللي اتولدوا فيه.

---

## ٣. التشغيل

~~~text app.js
c1.increment();          // 1
c1.increment();          // 2
c2.increment();          // 11
~~~

~~~text الناتج
1
2
11
~~~

- createCounter **خلصت** من زمان، ومع ذلك count لسه موجود وبيزيد: 1 ثم 2. ده الـ closure.
- c2 مأثرش على c1 ولا العكس: 11 جاية من count بتاع c2.

ولو ناديت [[createCounter().increment()]] مرتين ورا بعض، الناتج [[1 1]]: كل مرة counter جديد بـ count جديد. الصح تحفظ الناتج في متغير زي c1.

---

## ٤. محدش يوصل لـ count

~~~text app.js
console.log(c1.count);   // undefined
console.log(c1.get());   // 2
~~~

count **مش خاصية** على الـ object، ده متغير في الـ closure. فـ [[c1.count]] بتدوّر على خاصية مش موجودة: [[undefined]]. ولو طبعت c1 كله:

~~~text الناتج: console.log(c1)
{ increment: [Function: increment], get: [Function: get] }
~~~

مفيش count خالص. ولو حاولت تكتب [[c1.count = 999]]، ده بيعمل خاصية جديدة اسمها count على الـ object، وملهاش علاقة بالمتغير: [[c1.get()]] فضلت [[2]]. ده **private state**: الطريقة الوحيدة توصل للقيمة هي الدوال اللي انت سمحت بيها.

---

## ٥. قبل التمرين

تمرين [[once]] تحت بيستخدم نفس الفكرة بالظبط: دالة بترجّع دالة، ومتغيرات في الـ scope **برّه** الدالة اللي بترجّعها عشان تفضل فاكرة بين النداءات. اسأل نفسك وانت بتحل: لو حطيت المتغير **جوه** الدالة اللي بترجّعها، هيتعمل جديد كل نداء ولا هيفضل واحد؟ (فكّر في [[createCounter().increment()]] اللي طلعت 1 كل مرة.)

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[let count]] جوه createCounter | الحالة اللي هتتفتكر |
| الدوال اللي بترجع | شايلة reference لـ count (closure) |
| كل نداء لـ createCounter | environment جديد و count جديد |
| [[c1.count]] | undefined: count مش خاصية |

> الـ closure بيشيل **المتغير نفسه** مش نسخة من قيمته، فلو اتغير الدالة بتشوف القيمة الجديدة.`,
          lines: [
            "دالة بتعمل counter.",
            R`[[count]] متغير محلي، المفروض يموت لما الدالة تخلص.`,
            "بترجّع object فيه دالتين.",
            R`الدالة دي شايلة [[count]] معاها (closure).`,
            "ودي نفس الـ count.",
            "قفلة الـ object.",
            "قفلة الدالة.",
            "counter أول.",
            "counter تاني منفصل تمامًا.",
            "1.",
            "2: الـ count اتفتكر بين النداءات.",
            "التاني ليه count بتاعه.",
            R`[[count]] مش خاصية على الـ object، فمحدش يقدر يعدّله من برّه.`,
            "القراية بس عن طريق الدالة."
          ],
          sol: R`[[once]] بتحتفظ بـ [[called]] و [[result]] في الـ closure. لو [[init = once((x) => x * 2)]]، يبقى [[init(5)]] بـ 10، و [[init(100)]] بـ 10 برضه، والدالة الأصلية اتنادت مرة واحدة بس.

الغلطة الشائعة إنك تحط [[let called = false]] جوه الدالة اللي بترجّعها بدل ما تحطه برّاها: ساعتها كل نداء بيعمل متغير جديد بـ false وكأن مفيش once. والغلطة التانية إنك تفحص [[if (!result)]] بدل called، فلو fn رجّعت 0 أو undefined هتتنادي تاني. ده pattern حقيقي بيستخدم في init لمرة واحدة، وبيتسأل في الانترفيو.`,
          solCode: R`function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}
let runs = 0;
const init = once((x) => { runs++; return x * 2; });
console.log(init(5), init(100), runs); // 10 10 1`,
          check: {
            lang: "js",
            starter: R`function once(fn) {
  // called و result هنا، برّا الدالة اللي هترجّعها
  return fn;
}`,
            tests: R`test("init(5) ← 10 وبعدين init(100) ← 10 برضه", () => {
  const init = once((x) => x * 2);
  expect([init(5), init(100)]).toEqual([10, 10]);
});
test("الدالة الأصلية بتتنادي مرة واحدة بس", () => {
  let runs = 0;
  const f = once(() => runs++);
  f(); f(); f();
  expect(runs).toBe(1);
});
test("لو fn رجّعت 0 أو undefined متتناديش تاني (افحص called مش result)", () => {
  let runs = 0;
  const f = once(() => { runs++; return 0; });
  f(); f();
  expect([runs, f()]).toEqual([1, 0]);
});
test("كل once ليها closure لوحدها", () => {
  const a = once(() => "a"), b = once(() => "b");
  expect([a(), b()]).toEqual(["a", "b"]);
});
test("بتعدّي الـ arguments و this", () => {
  const obj = { n: 3, get: once(function (x) { return this.n + x; }) };
  expect(obj.get(4)).toBe(7);
});`,
            solution: R`function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}`
          }
        },
        {
          cmd: "closures في loop",
          title: "ليه اللوب ده بيطبع 3 3 3 مش 0 1 2؟",
          desc: R`أشهر سؤال «اتوقع الناتج» في JS: loop بـ [[var]] جواها [[setTimeout]]. الإجابة 3 3 3، لأن كل الـ callbacks شايلة نفس المتغير [[i]]، ولما اشتغلوا (بعد ما اللوب خلص) كان بقى 3.

الحل: [[let]] بدل [[var]]. الـ let في for بيعمل متغير جديد لكل لفة، فكل callback شايل الـ i بتاعته. والحل القديم قبل let كان IIFE.`,
          example: R`for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var", i), 0);
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let", j), 0);
}
for (var k = 0; k < 3; k++) {
  ((n) => setTimeout(() => console.log("iife", n), 0))(k);
}`,
          try: R`قبل ما تشغّل، اكتب الناتج اللي متوقعه على ورقة (٩ سطور). شغّل وقارن. وبعدين غيّر الـ [[0]] في أول setTimeout لـ [[1000]]: سطور var اتأخرت للآخر، بس قيمتها لسه 3 3 3؟ ليه؟`,
          flag: "script",
          deep: {
            why: "السؤال ده بيختبر ٣ حاجات مع بعض: الـ scope بتاع var و let، والـ closures، وإن setTimeout بيشتغل بعد الكود المتزامن (event loop، المستوى ٣). ونفس المشكلة بتحصل في الحقيقة مع event listeners جوه loops.",
            how: R`مع [[var]]: فيه متغير [[i]] واحد للدالة كلها. اللوب بيلف ٣ مرات ويسجّل ٣ callbacks، وكلهم شايلين نفس المتغير. اللوب بيخلص و i بقى 3 (الشرط وقف عنده). وبعدين الـ callbacks بتشتغل وكلها تقرا 3.

مع [[let]] في رأس الـ for: الـ spec بيقول اعمل binding جديد لكل لفة وانسخ فيه القيمة، فكل callback شايل متغير مختلف.

الـ IIFE (Immediately Invoked Function Expression) بتعمل scope جديد يدويًا: [[n]] باراميتر بياخد نسخة من k كل لفة.

والـ setTimeout بـ 0 مش معناه «دلوقتي»: معناه «بعد ما الكود الحالي يخلص وأقرب فرصة». عشان كده اللوب كله بيخلص الأول.`,
            when: R`دايمًا [[let]] أو [[const]] في الـ loops ([[for (const x of arr)]]). و forEach كمان حل، لأن كل نداء للـ callback ليه scope بتاعه.`,
            mistakes: R`تفتكر إن setTimeout بـ 0 بيشتغل فورًا. وتحل المشكلة بـ let من غير ما تعرف تشرح ليه. وفي الانترفيو: اشرح الـ 3 حاجات (var واحد مشترك، الـ callbacks بتشتغل بعد اللوب، let بيعمل binding لكل لفة) واذكر حل IIFE كحل قديم.`
          },
          teach: R`## الفكرة في سطرين

٣ loops شبه بعض، كل واحدة بتسجّل ٣ دوال تشتغل «بعدين» بـ [[setTimeout]]. الفرق الوحيد: المتغير اتعرّف بـ var ولا let ولا اتنسخ في IIFE. ونتيجة الأولى مختلفة تمامًا عن الاتنين التانيين. النواتج من Node 24.

---

## ١. [[setTimeout]] بسرعة

~~~text app.js
setTimeout(() => console.log("hi"), 0);
~~~

بتاخد دالة (callback) ووقت بالملّي ثانية، ومعناها «نادي الدالة دي بعد الوقت ده **على الأقل**». و [[0]] مش معناها دلوقتي: معناها «أول ما الكود اللي شغال حاليًا يخلص». فكل الـ loops هتخلص الأول، وبعدين الدوال تشتغل (التفاصيل في درس event loop).

---

## ٢. اللوب الأولى: [[var]]

~~~text app.js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var", i), 0);
}
~~~

- [[for (بداية; شرط; خطوة)]]: ابدأ i من 0، ولف طول ما i أقل من 3، وبعد كل لفة زوّد واحد.
- [[var i]]: var مالهاش block scope، فـ i **متغير واحد** للملف (أو الدالة) كله.
- كل لفة بتسجّل arrow function بتقرا i. التلاتة شايلين **نفس** المتغير، مش قيمته وقت التسجيل.
- اللوب بتلف: 0 ثم 1 ثم 2، وبعدين i بقت 3 والشرط [[3 < 3]] false فوقفت.

وبعد اللوبات i لسه موجودة برّه:

~~~text الناتج: console.log بعد اللوبات
بعد اللوبات: i = 3 k = 3 undefined
~~~

(i و k بـ 3 لأنهم var، و [[typeof j]] بـ undefined لأن let مش موجودة برّه اللوب.) فلما الدوال تشتغل، التلاتة يقروا i دلوقتي: 3.

---

## ٣. اللوب التانية: [[let]]

~~~text app.js
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let", j), 0);
}
~~~

[[let]] في رأس الـ for ليها قاعدة خاصة: كل لفة بتاخد **j جديدة** وفيها قيمة اللفة دي. فأول دالة شايلة j قيمتها 0، والتانية j تانية قيمتها 1، والتالتة 2. كل closure ماسك متغير مختلف.

---

## ٤. اللوب التالتة: IIFE

~~~text app.js
for (var k = 0; k < 3; k++) {
  ((n) => setTimeout(() => console.log("iife", n), 0))(k);
}
~~~

IIFE = Immediately Invoked Function Expression، يعني دالة بتتعمل وتتنادى في نفس اللحظة. نفكها:

1. [[(n) => setTimeout(...)]]: arrow بتاخد باراميتر n.
2. القوسين حواليها [[( ... )]]: عشان نقدر نناديها على طول.
3. [[(k)]] في الآخر: نادها دلوقتي وابعت قيمة k.

كل نداء بيعمل **n جديد** (الباراميترات بتتعمل جديدة مع كل نداء) وفيه نسخة من k وقتها. فالـ callback شايل n مش k. ده كان الحل قبل ما let تيجي في ES2015.

---

## ٥. الناتج

~~~text الناتج: Node 24
var 3
var 3
var 3
let 0
let 1
let 2
iife 0
iife 1
iife 2
~~~

الترتيب بين المجموعات هو ترتيب التسجيل، لأن كلهم بـ 0.

---

## ٦. «جرّب»: أول setTimeout بـ 1000

~~~text الناتج: Node 24
let 0
let 1
let 2
iife 0
iife 1
iife 2
var 3
var 3
var 3
~~~

سطور var اتأخرت ثانية وبقت في الآخر، بس لسه **3**. لأن القيمة بتتقري لما الـ callback يشتغل، مش لما اتسجّل، و i كانت 3 من بدري.

---

## الخلاصة

| اللوب | كام متغير؟ | الـ callback شايل | الناتج |
|---|---|---|---|
| [[var i]] | واحد للكل | نفس i | 3 3 3 |
| [[let j]] | واحد لكل لفة | j بتاعة لفته | 0 1 2 |
| [[var k]] + IIFE | n جديد لكل نداء | n | 0 1 2 |

> الإجابة في الانترفيو في ٣ جمل: var متغير واحد مشترك، والـ callbacks بتشتغل بعد ما اللوب تخلص، و let بتعمل متغير جديد لكل لفة.`,
          lines: [
            R`[[var]]: متغير واحد للكل.`,
            R`٣ callbacks كلهم شايلين نفس [[i]]، وهيشتغلوا بعد اللوب ما يخلص: 3 3 3.`,
            "قفلة.",
            R`[[let]]: متغير جديد لكل لفة.`,
            "كل callback شايل الـ j بتاعته: 0 1 2.",
            "قفلة.",
            "var تاني.",
            R`IIFE بتاخد نسخة من k في [[n]] كل لفة: 0 1 2.`,
            "قفلة."
          ],
          sol: R`الناتج بـ 0 في كل حتة: [[var 3]] ٣ مرات، و [[let 0]] و [[let 1]] و [[let 2]]، و [[iife 0]] و [[iife 1]] و [[iife 2]]. var فيها متغير i واحد للـ loop كلها، ولما الـ callbacks اشتغلت كانت الـ loop خلصت و i بقى 3. let بتعمل j جديد لكل لفة، والـ IIFE بتعمل n جديد بنسخة من k.

بعد ما تخلي أول timeout بـ 1000: الناتج [[let 0 let 1 let 2 iife 0 iife 1 iife 2]] وبعد ثانية [[var 3 var 3 var 3]]. التأخير غيّر الترتيب بس مش القيمة، لأن القيمة مش بتتاخد وقت ما الـ setTimeout اتكتب، بتتقري وقت ما الـ callback يشتغل، و i ساعتها 3 سواء استنيت 0 ولا 1000. لو كنت متوقع 0 1 2 مع var فده بالظبط الغلط اللي السؤال بيختبره.`
        }
      ]
    }
]);
