// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "this",
      l: 2,
      n: "this بتتحدد وقت النداء مش وقت الكتابة، والـ arrow بتاخدها من برّه، و call و bind بيحددوها بإيدك",
      items: [
        {
          cmd: "this",
          title: "this بتشاور على إيه؟",
          desc: R`[[this]] في دالة عادية بتتحدد لحظة النداء، حسب طريقة النداء مش مكان الكتابة. ٤ قواعد بالترتيب:

١. [[new Fn()]]: this هو الـ object الجديد.
٢. [[fn.call(obj)]] أو [[apply]] أو [[bind]]: this هو obj.
٣. [[obj.fn()]]: this هو اللي قبل النقطة.
٤. [[fn()]] لوحدها: undefined في strict mode (والـ modules والـ classes)، أو الـ global object في الكود القديم.

والـ arrow function مالهاش this خالص، بتاخدها من الـ scope اللي اتكتبت فيه (الدرس الجاي).`,
          example: R`"use strict";
const user = {
  name: "Sara",
  hi() { return this?.name; },
};
user.hi();                       // "Sara": اللي قبل النقطة
const fn = user.hi;
fn();                            // undefined: من غير نقطة this = undefined
user.hi.call({ name: "Ali" });   // "Ali": انت اللي حددت
function Person(name) { this.name = name; }
const p = new Person("Omar");    // this = الـ object الجديد
const btn = { label: "Save", click() { console.log(this?.label); } };
setTimeout(btn.click, 0);        // undefined: اتبعتت من غير btn`,
          try: R`شيل [[?.]] من [[hi]] وشغّل تاني واقرا الـ TypeError. وبعدين صلّح سطر setTimeout بطريقتين: [[() => btn.click()]] و [[btn.click.bind(btn)]].`,
          flag: "script",
          deep: {
            why: R`[[this]] أكتر حاجة بتلخبط اللي جايين من Java أو Python، وسبب bugs زي «Cannot read properties of undefined (reading 'name')» لما تبعت method كـ callback. وسؤال انترفيو مضمون تقريبًا.`,
            how: R`فكّر فيها كـ باراميتر مخفي بيتبعت مع كل نداء. [[user.hi()]] معناها «نادي hi وابعت user كـ this». لما تعمل [[const fn = user.hi]]، انت خدت الدالة لوحدها، والعلاقة بـ user اتقطعت، لأن الدالة نفسها مش «ملك» الـ object، هي بس متحطوطة فيه.

نفس الحاجة لما تبعت method كـ callback: [[setTimeout(btn.click)]] و [[addEventListener("click", obj.method)]] و [[promise.then(obj.method)]] كلهم بيبعتوا الدالة من غير الـ object.

في الـ event listeners العادية (function مش arrow) الـ this هو العنصر اللي عليه الـ listener ([[currentTarget]]).

و [[new]] بيعمل ٤ حاجات: object جديد، ويربط الـ prototype بتاعه بـ [[Fn.prototype]]، وينادي Fn بـ this = الـ object ده، ويرجّعه (درس prototypes).

في الـ top level بتاع ES module الـ this بـ undefined، وفي CommonJS بـ [[module.exports]].`,
            when: "مع الـ methods في الـ objects والـ classes. ولما تبعت method كـ callback، لفّها في arrow أو bind.",
            mistakes: R`تبعت method كـ callback من غير bind. وتستخدم arrow كـ method وتستنى this تبقى الـ object. وتستخدم this جوه function عادية جوه method (callback في forEach مثلًا) وتستنى نفس this. وفي الانترفيو: «إيه الناتج؟» على كود فيه [[const f = obj.method; f()]]، واذكر القواعد الأربعة بالترتيب.`
          },
          teach: R`## الكود ده بيعمل إيه؟

بيجيب **نفس الدالة** وينادِيها بـ ٥ طرق مختلفة، وكل مرة [[this]] جواها بتطلع حاجة مختلفة. الفكرة اللي هتطلع بيها: [[this]] مش مكتوبة جوه الدالة، دي بتتحدد **لحظة النداء** من شكل سطر النداء نفسه. الكود اتشغّل كملف في Node 24، وجزء الـ setTimeout اتجرّب كمان في Chrome.

---

## ١. [["use strict";]]

~~~text app.js
"use strict";
~~~

ده نص لوحده في أول الملف، و JS فاهمه كأمر اسمه **directive**: «شغّل الملف ده في **strict mode**». الـ strict mode نسخة أصرم من JS بتقفل شوية تصرفات قديمة غلط، واللي يهمنا منها هنا واحدة بس:

> الدالة اللي تتنادي من غير حاجة قبلها، [[this]] جواها بتبقى [[undefined]].

ومن غير strict، [[this]] في الحالة دي بتبقى الـ **global object** (في المتصفح [[window]]، وفي Node [[globalThis]]). جرّبناها في ملف من غير "use strict":

~~~text app.js
function show() { return this === globalThis; }
console.log(show());
~~~

~~~text الناتج
true
~~~

وفي أي ES module أو جوه أي [[class]]، الـ strict mode شغال لوحده من غير ما تكتب السطر ده.

---

## ٢. الـ object والـ method

~~~text app.js
const user = {
  name: "Sara",
  hi() { return this?.name; },
};
~~~

- [[const user = { ... }]]: **object literal**، يعني object مكتوب بإيدك بين [[{ }]].
- [[name: "Sara"]]: خاصية (property) اسمها name وقيمتها النص Sara.
- [[hi() { ... }]]: **method**، يعني دالة متحطوطة جوه object. الشكل ده اختصار لـ [[hi: function () { ... }]].
- [[this?.name]]: اقرا name من [[this]]. والـ [[?.]] اسمها **optional chaining**: لو اللي قبلها [[undefined]] أو [[null]]، رجّع [[undefined]] بدل ما البرنامج يقع. حطّيناها عشان المثال يكمّل للآخر.

---

## ٣. قاعدة النقطة: [[user.hi()]]

~~~text app.js
user.hi();   // "Sara"
~~~

~~~text الناتج
Sara
~~~

لما الدالة تتنادي بعد نقطة، [[this]] بيبقى **اللي قبل النقطة**. هنا قبل النقطة [[user]]، فـ [[this.name]] هي [["Sara"]].

---

## ٤. الدالة لوحدها: [[fn()]]

~~~text app.js
const fn = user.hi;
fn();        // undefined
~~~

- [[user.hi]] من غير [[()]] معناها «هات الدالة نفسها، متنادِيهاش». فـ [[fn]] بقى بيشاور على **نفس** الدالة.
- [[fn()]]: نداء من غير نقطة. مفيش حاجة قبل النقطة، فـ [[this]] بـ [[undefined]] (strict mode)، و [[?.]] رجّعت undefined.

~~~text الناتج
undefined
~~~

ولو شلت [[?.]] وكتبت [[this.name]]، Node بيقول:

~~~text الناتج
TypeError: Cannot read properties of undefined (reading 'name')
~~~

يعني «بتحاول تقرا name من حاجة undefined». ده أشهر error ليه علاقة بـ this. الدرس هنا: الدالة **مش ملك** الـ object، هي بس متخزنة فيه. أول ما تاخدها لوحدها، العلاقة بـ user بتتقطع.

---

## ٥. انت اللي بتحدد: [[call]]

~~~text app.js
user.hi.call({ name: "Ali" });   // "Ali"
~~~

[[call]] method موجودة على كل دالة: بتنادي الدالة **دلوقتي**، وأول argument ليها بيبقى [[this]]. هنا بعتنا object جديد فيه name = Ali:

~~~text الناتج
Ali
~~~

تفاصيل [[call]] و [[apply]] و [[bind]] في درس «call و apply و bind».

---

## ٦. [[new]]: object جديد

~~~text app.js
function Person(name) { this.name = name; }
const p = new Person("Omar");
~~~

- [[function Person(name)]]: دالة عادية، بس اسمها بحرف كبير كعُرف إنها **constructor function** (الشكل القديم للـ class).
- [[new Person("Omar")]]: [[new]] بيعمل object فاضي جديد، وينادي Person و [[this]] = الـ object ده، وفي الآخر يرجّعه.

~~~text الناتج: console.log(p)
Person { name: 'Omar' }
~~~

ولو نسيت [[new]] ([[Person("x")]]) في strict mode، this بـ undefined، و [[this.name = ...]] بتقع:

~~~text الناتج
TypeError: Cannot set properties of undefined (setting 'name')
~~~

---

## ٧. الفخ: method كـ callback

~~~text app.js
const btn = { label: "Save", click() { console.log(this?.label); } };
setTimeout(btn.click, 0);   // undefined
~~~

- [[setTimeout(fn, 0)]]: نادي fn بعد ٠ ملي ثانية، يعني «أول ما الكود الحالي يخلص».
- [[btn.click]] من غير [[()]]: احنا بعتنا **الدالة لوحدها**، زي خطوة ٤ بالظبط. و setTimeout هي اللي هتناديها بعدين، ومش عارفة حاجة عن btn.

~~~text الناتج
undefined
~~~

وطب this كانت إيه ساعتها؟ جرّبنا نطبعها: في Node طلعت object اسمه [[Timeout]] (Node بينادي الـ callback و this = الـ timer نفسه)، وفي Chrome طلعت [[window]]. في الحالتين **مش btn**، وده المهم.

والتصليح بطريقتين (اتجرّبوا والاتنين طبعوا [[Save]]):

~~~text app.js
setTimeout(() => btn.click(), 0);     // نادي بنقطة جوه arrow
setTimeout(btn.click.bind(btn), 0);   // ثبّت this بـ bind
~~~

---

## القواعد الأربعة بالترتيب

| شكل النداء | [[this]] | في المثال |
|---|---|---|
| [[new Fn()]] | الـ object الجديد | [[new Person("Omar")]] |
| [[fn.call(obj)]] أو [[apply]] أو [[bind]] | obj | [[{ name: "Ali" }]] |
| [[obj.fn()]] | اللي قبل النقطة | [[user]] |
| [[fn()]] لوحدها | undefined (strict) أو global (من غير strict) | [[fn()]] |

## الخلاصة

- [[this]] بتتحدد وقت النداء، مش وقت الكتابة. بص على **سطر النداء**: فيه new؟ فيه call أو bind؟ فيه نقطة؟ ولا لوحدها؟
- [[obj.method]] من غير أقواس بتاخد الدالة لوحدها، فـ this بتضيع. ده اللي بيحصل في setTimeout و addEventListener و then.
- الـ arrow function مالهاش this خالص، وده موضوع الدرس الجاي.`,
          lines: [
            "strict mode: زي أي module أو class.",
            "object فيه method.",
            "خاصية.",
            R`method بتقرا [[this.name]]. الـ [[?.]] عشان المثال ميقعش.`,
            "قفلة.",
            R`قاعدة ٣: [[this]] هو user.`,
            "خدت الدالة لوحدها في متغير.",
            R`قاعدة ٤: من غير نقطة، this بـ undefined.`,
            R`قاعدة ٢: [[call]] بتحدد this بإيدك.`,
            "constructor function (الشكل القديم للـ class).",
            R`قاعدة ١: [[new]] بيعمل object جديد ويبقى هو this.`,
            "object تاني فيه method.",
            "الـ method اتبعتت لوحدها، فـ this ضاعت."
          ],
          sol: R`من غير [[?.]]، سطر [[fn()]] بيطلع [[TypeError: Cannot read properties of undefined (reading 'name')]]: في strict mode الدالة لما تتنادي من غير نقطة قبلها this بتبقى undefined، ومفيش name جوه undefined.

سطر setTimeout بعد التصليح بيطبع [["Save"]] في الطريقتين. [[() => btn.click()]] بتنادي click والنقطة موجودة، فـ this بقت btn. و [[btn.click.bind(btn)]] بتعمل دالة جديدة this فيها متثبتة على btn. الغلطة الشائعة إنك تكتب [[setTimeout(btn.click(), 0)]]: كده انت بتنادي الدالة فورًا وبتبعت ناتجها (undefined) لـ setTimeout.`
        },
        {
          cmd: "arrow و this",
          title: "ليه الـ arrow function بتحل مشكلة this جوه callback؟",
          desc: R`الـ arrow function مالهاش [[this]] بتاعتها. لما تقرا this جواها، بتاخدها من الـ scope اللي اتكتبت فيه، زي أي متغير عادي (lexical this).

ده بيخليها مثالية للـ callbacks جوه methods: [[setInterval(() => this.tick(), 1000)]] بتشوف this بتاعة الـ method. وبيخليها غلط كـ method في object، لأنها هتاخد this من برّه الـ object.`,
          example: R`const timer = {
  seconds: 0,
  startBroken() {
    setTimeout(function () {
      console.log(this?.seconds); // undefined: this مش timer
    }, 0);
  },
  start() {
    setTimeout(() => {
      this.seconds++;             // this = timer، أخدها من start
      console.log(this.seconds);  // 1
    }, 0);
  },
  bad: () => typeof this,         // arrow كـ method: this من برّه الـ object
};
timer.startBroken();
timer.start();`,
          try: R`قبل الـ arrows كان الحل [[const self = this;]] قبل الـ callback. صلّح [[startBroken]] بالطريقة دي، وبعدين بـ [[.bind(this)]] بعد الـ function.`,
          flag: "script",
          deep: {
            why: "مشكلة this جوه callbacks كانت أشهر مشكلة في JS قبل ES2015، وكان الحل [[var self = this]] في كل حتة. الـ arrows حلّتها، بس لو مش فاهم ليه، هتستخدمها في المكان الغلط.",
            how: R`الـ arrow بتعامل this زي أي متغير من برّه: بتدوّر عليها في الـ scope chain. عشان كده [[call]] و [[bind]] و [[apply]] مبيغيّروش this بتاعة arrow خالص، ومينفعش تتعمل بـ [[new]].

جوه [[start]]، الـ this هو timer (قاعدة النقطة). الـ arrow اتكتبت جوه start فبتشوف نفس الـ this.

أما [[bad]] فاتكتبت في الـ object literal، والـ object literal مش scope. فالـ this بتاعتها هي بتاعة المكان اللي فيه الـ object كله: undefined في ES module، أو [[module.exports]] في CommonJS.

وفي الـ classes، فيه شكل شائع: [[handleClick = () => { ... }]] كـ class field. هنا الـ arrow بتاخد this = الـ instance، لأن الـ fields بتتعمل جوه الـ constructor. ده كان منتشر في React class components.`,
            when: "arrow لأي callback جوه method محتاج this. method عادية (مش arrow) لأي دالة في object أو class هتتنادي بـ obj.method().",
            mistakes: R`arrow كـ method في object. و arrow كـ event listener وانت محتاج [[this]] = العنصر (استخدم [[e.currentTarget]] بدالها). وتحاول تغيّر this بتاعة arrow بـ bind. وفي الانترفيو: «ليه arrow function مالهاش this؟» و «ينفع تعمل new لـ arrow؟» (لأ، TypeError).`
          },
          teach: R`## الكود ده بيعمل إيه؟

object اسمه [[timer]] فيه ٣ methods، وكل واحدة بتجرّب [[this]] في مكان مختلف: callback بـ [[function]] عادية (بايظة)، و callback بـ arrow (شغالة)، و arrow مستخدمة كـ method (غلط). اتشغّل في Node 24 كملف [[.cjs]] وكملف [[.mjs]]، وجزء منه في Chrome.

---

## ١. الـ object والعداد

~~~text app.js
const timer = {
  seconds: 0,
~~~

[[seconds]] خاصية رقم بتبدأ من 0، وهي اللي عايزين نزوّدها من جوه callback.

---

## ٢. [[startBroken]]: callback بـ function عادية

~~~text app.js
  startBroken() {
    setTimeout(function () {
      console.log(this?.seconds);
    }, 0);
  },
~~~

- [[startBroken() { ... }]]: method. لما نناديها [[timer.startBroken()]]، الـ this **جواها هي** = timer (قاعدة النقطة).
- [[setTimeout(function () { ... }, 0)]]: بنبعت لـ setTimeout دالة جديدة مكتوبة بـ [[function]]. الدالة دي ليها **this بتاعتها**، بتتحدد لما setTimeout تناديها، ومش هي اللي بتاخدها من startBroken.
- setTimeout بتناديها من غير [[timer.]] قبلها، فـ this جواها مش timer.

~~~text الناتج
undefined
~~~

وطبعنا this نفسها جوه الـ callback: في Node طلعت object من نوع [[Timeout]]، وفي Chrome طلعت [[window]]. الاتنين مفيهمش seconds، فالنتيجة undefined.

---

## ٣. [[start]]: callback بـ arrow

~~~text app.js
  start() {
    setTimeout(() => {
      this.seconds++;
      console.log(this.seconds);
    }, 0);
  },
~~~

- [[() => { ... }]]: **arrow function**. الفرق المهم: **مالهاش this بتاعتها**. لما تكتب this جواها، JS بيدوّر عليها برّه، في المكان اللي الـ arrow **اتكتبت** فيه، بالظبط زي ما بيدوّر على أي متغير. ده اسمه **lexical this**.
- الـ arrow اتكتبت جوه [[start]]، و this بتاعة start = timer، فـ this جوه الـ arrow = timer.
- [[this.seconds++]]: زوّد seconds واحد ([[++]] = زوّد 1).

~~~text الناتج
1
~~~

---

## ٤. [[bad]]: arrow كـ method

~~~text app.js
  bad: () => typeof this,
};
~~~

- [[bad: () => ...]]: خاصية قيمتها arrow function.
- [[typeof this]]: [[typeof]] بيرجّع نوع القيمة كنص ([["object"]] أو [["undefined"]] ...).

هنا الـ arrow اتكتبت **جوه الـ object literal**، والـ [[{ }]] بتاعة الـ object **مش scope**، مش زي جسم الدالة. فالـ arrow بتطلع تدوّر على this برّه الـ object خالص، في الملف نفسه:

| مكان التشغيل | [[timer.bad()]] | ليه |
|---|---|---|
| ملف [[.cjs]] (CommonJS) | [["object"]] | this في أول الملف = [[module.exports]] |
| ملف [[.mjs]] (ES module) | [["undefined"]] | this في أول الـ module = undefined |
| Chrome (script عادي) | [["object"]] | this في أول الصفحة = [[window]] |

كلهم اتجرّبوا. وفي ولا واحدة this = timer. ولما جرّبنا [[timer.bad.call(timer)]] الناتج فضل نفسه: [[call]] مبتقدرش تغيّر this بتاعة arrow. وكمان [[new]] على arrow بيقع:

~~~text الناتج: const A = () => 1; new A();
TypeError: A is not a constructor
~~~

---

## ٥. التشغيل

~~~text app.js
timer.startBroken();
timer.start();
~~~

~~~text الناتج (Node)
undefined
1
~~~

الاتنين بيرجعوا فورًا، والـ callbacks بتشتغل بعد ما الكود المتزامن يخلص، بنفس الترتيب اللي اتسجّلت بيه.

---

## ٦. الحل القديم (الـ solCode)

قبل الـ arrows (ES2015)، كان فيه طريقتين:

~~~text app.js
  withSelf() {
    const self = this;
    setTimeout(function () {
      self.seconds++;
      console.log("self", self.seconds);
    }, 0);
  },
~~~

- [[const self = this;]]: احفظ this بتاعة الـ method في متغير عادي **قبل** الـ callback. والـ callback بيشوف [[self]] بالـ closure (أي دالة بتشوف المتغيرات اللي حواليها).

~~~text app.js
  withBind() {
    setTimeout(function () {
      this.seconds++;
      console.log("bind", this.seconds);
    }.bind(this), 0);
  },
~~~

- [[function () { ... }.bind(this)]]: [[bind]] بترجّع **نسخة** من الدالة this فيها متثبتة على القيمة اللي بعتها. والـ [[this]] اللي جوه أقواس bind اتقرت وقت تنفيذ withBind، يعني = timer.

~~~text الناتج
self 1
bind 2
~~~

الاتنين زوّدوا نفس الـ seconds (1 وبعدين 2)، يعني الاتنين شافوا timer فعلًا.

---

## الخلاصة

| | function عادية | arrow |
|---|---|---|
| ليها this بتاعتها؟ | أيوه، بتتحدد وقت النداء | لأ، بتاخدها من المكان اللي اتكتبت فيه |
| call و bind بيغيّروها؟ | أيوه | لأ |
| ينفع new؟ | أيوه | لأ (TypeError) |
| تنفع كـ method في object؟ | أيوه | لأ: this هتيجي من برّه الـ object |
| تنفع كـ callback جوه method؟ | محتاجة bind أو self | أيوه، وده استخدامها الأساسي |

القاعدة: **method = function عادية، callback جوه method = arrow**.`,
          lines: [
            "object.",
            "عداد.",
            "method بـ function عادية جوه.",
            R`callback بـ [[function]]: هتتنادي من غير object...`,
            "...فالـ this مش timer.",
            "قفلة.",
            "قفلة.",
            "method تانية.",
            "callback بـ arrow: مالهاش this بتاعتها.",
            R`فبتاخد this بتاعة [[start]]، وهي timer.`,
            "زادت.",
            "قفلة.",
            "قفلة.",
            R`arrow كـ method: this جاية من برّه الـ object، مش timer.`,
            "قفلة الـ object.",
            "شغّل الغلط.",
            "شغّل الصح."
          ],
          sol: R`بـ self: جوه الـ function العادية اكتب [[self.seconds++]] بدل this. وبـ bind: [[setTimeout(function () { ... }.bind(this), 0)]]. في الاتنين الـ callback بقى شايف timer، ولو ناديت الطريقتين ورا بعض هتلاقي seconds بتزيد (1 وبعدين 2).

[[timer.bad()]] في ملف Node بترجّع [["object"]] (this بتاع الملف CommonJS هو module.exports)، وفي ES module بترجّع [["undefined"]]، وفي Console المتصفح [["object"]] (window). المهم إنها أبدًا مش timer. والغلطة إنك تكتب [[const self = this]] جوه الـ callback نفسه: ساعتها بتاخد this الغلط. لازم تتكتب في startBroken قبل setTimeout.`,
          solCode: R`const timer = {
  seconds: 0,
  withSelf() {
    const self = this;
    setTimeout(function () {
      self.seconds++;
      console.log("self", self.seconds);
    }, 0);
  },
  withBind() {
    setTimeout(function () {
      this.seconds++;
      console.log("bind", this.seconds);
    }.bind(this), 0);
  },
};
timer.withSelf(); // self 1
timer.withBind(); // bind 2`
        },
        {
          cmd: "call و apply و bind",
          title: "تحدد this بإيدك",
          desc: R`التلاتة بيخلوك تقرر this هتبقى إيه:

[[fn.call(obj, a, b)]]: نادي دلوقتي و this = obj، والـ arguments ورا بعض.
[[fn.apply(obj, [a, b])]]: نفس الكلام بس الـ arguments في array.
[[fn.bind(obj, a)]]: متناديش، رجّع دالة جديدة this بتاعتها متثبتة دايمًا على obj، وممكن تثبّت أول arguments كمان (partial application).`,
          example: R`function intro(greeting, punct) {
  return $__bt$__{greeting}, I'm $__{this.name}$__{punct}$__bt;
}
const sara = { name: "Sara" };
intro.call(sara, "Hi", "!");          // "Hi, I'm Sara!"
intro.apply(sara, ["Hey", "."]);      // "Hey, I'm Sara."
const saraIntro = intro.bind(sara, "Hello");
saraIntro("?");                       // "Hello, I'm Sara?"
saraIntro.call({ name: "Ali" }, "!"); // "Hello, I'm Sara!": bind مبيتغيرش
const btn = { label: "Save", click() { console.log(this.label); } };
setTimeout(btn.click.bind(btn), 0);   // "Save"`,
          try: R`اكتب [[myBind(fn, ctx, ...args)]] بإيدك: بترجّع دالة بتنادي [[fn.apply(ctx, [...args, ...newArgs])]]. ده سؤال انترفيو مشهور (المستوى ٣ فيه نسخة كاملة). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          flag: "script",
          deep: {
            why: "بتحتاجهم لما تبعت method كـ callback (bind)، أو تستعير method من object لـ object تاني (call). و bind بالذات بيحل مشكلة this الضايعة في setTimeout و addEventListener.",
            how: R`[[call]] و [[apply]] بينادوا فورًا، والفرق بس في شكل الـ arguments. قبل الـ spread كان [[Math.max.apply(null, arr)]] الطريقة الوحيدة تبعت array كـ arguments، ودلوقتي [[Math.max(...arr)]] أوضح.

[[bind]] بترجّع «bound function»، والـ this فيها متثبت للأبد: call و apply و bind تاني مش بيغيّروه. الاستثناء الوحيد [[new]]، اللي بيتجاهل الـ this المتثبت.

كل [[bind]] بيعمل دالة جديدة. فلو عملت [[addEventListener("click", this.fn.bind(this))]] مش هتعرف تشيله بـ removeEventListener، لأن الـ bind التاني هيعمل دالة مختلفة. احفظ الـ bound function في متغير الأول.

واستعارة methods: [[Array.prototype.slice.call(arguments)]] كانت الطريقة القديمة لتحويل array-like لـ array، ودلوقتي [[Array.from]].`,
            when: R`[[bind]] لما تبعت method كـ callback وعايز this تفضل. [[call]] لما تستعير method أو تنادي بـ this معيّن. [[apply]] نادرًا دلوقتي.`,
            mistakes: R`[[bind]] وتفتكرها نادت الدالة. و bind جوه render أو loop فتعمل دوال جديدة كل مرة. وتحاول تعمل bind لـ arrow. وفي الانترفيو: «الفرق بين call و apply و bind؟» و «اكتب bind بإيدك».`
          },
          teach: R`## الكود ده بيعمل إيه؟

دالة واحدة [[intro]] بتستخدم [[this]]، وبنناديها ٣ مرات بـ this مختلفة بإيدنا: بـ [[call]]، وبـ [[apply]]، وبنسخة متثبتة بـ [[bind]]. وفي الآخر بنستخدم bind عشان نصلّح مشكلة setTimeout من درس this. اتشغّل في Node 24.

---

## ١. الدالة

~~~text app.js
function intro(greeting, punct) {
  return $__bt$__{greeting}, I'm $__{this.name}$__{punct}$__bt;
}
~~~

- [[greeting]] و [[punct]] (اختصار punctuation، علامة الترقيم): باراميترين عاديين.
- النص اللي بين علامتين [[$__bt]] اسمه **template literal**: نص تقدر تحط جواه قيم بـ [[$__{...}]]. فـ [[$__{greeting}]] بتتبدل بقيمة greeting، و [[$__{this.name}]] بقيمة name من this.
- الدالة نفسها مش عارفة this هتبقى إيه. ده هيتحدد **وقت النداء**.

---

## ٢. [[call]]: نادي دلوقتي و this = اللي تقوله

~~~text app.js
const sara = { name: "Sara" };
intro.call(sara, "Hi", "!");
~~~

- [[intro.call(...)]]: كل دالة في JS هي object، وعليها methods جاهزة منها [[call]].
- أول argument ([[sara]]) بيبقى **this**، والباقي ([["Hi"]] و [["!"]]) بيتبعتوا للدالة ورا بعض.

~~~text الناتج
Hi, I'm Sara!
~~~

---

## ٣. [[apply]]: نفس الكلام بس الـ arguments في array

~~~text app.js
intro.apply(sara, ["Hey", "."]);
~~~

الفرق الوحيد إن الـ arguments جوه array واحدة: [[apply(sara, ["Hey", "."])]]. وسهل تفتكرها: **a**pply = **a**rray.

~~~text الناتج
Hey, I'm Sara.
~~~

apply كانت مهمة زمان لما تكون الـ arguments عندك في array، زي [[Math.max.apply(null, [3, 9, 2])]]. دلوقتي الـ spread [[...]] بيعمل نفس الشغل: [[Math.max(...[3, 9, 2])]]، والاتنين طلّعوا [[9]].

---

## ٤. [[bind]]: متناديش، رجّع دالة جديدة

~~~text app.js
const saraIntro = intro.bind(sara, "Hello");
saraIntro("?");
~~~

- [[intro.bind(sara, "Hello")]]: **مبتنفّذش** intro. بترجّع دالة **جديدة**: this فيها متثبتة على sara، وأول argument متثبت على [["Hello"]] (ده اسمه **partial application**: تثبّت جزء من الـ arguments).
- [[saraIntro("?")]]: لما تنادي النسخة الجديدة، اللي بتبعته بييجي **بعد** المتثبت، فـ [["?"]] بقت punct.

~~~text الناتج
Hello, I'm Sara?
~~~

وطبعنا شوية معلومات عن الدالة الجديدة:

~~~text الناتج: typeof saraIntro, saraIntro.name, saraIntro.length, intro.length
function bound intro 1 2
~~~

يعني: هي function، واسمها [["bound intro"]] (Node بيعلّم إنها نسخة bind)، و [[length]] (عدد الباراميترات المتوقعة) بقى 1 بدل 2، لأن واحد اتثبت.

---

## ٥. bind مبتتغيرش

~~~text app.js
saraIntro.call({ name: "Ali" }, "!");
~~~

جرّبنا نغيّر this بـ call على النسخة المتثبتة:

~~~text الناتج
Hello, I'm Sara!
~~~

الـ [["!"]] وصلت (arguments عادية)، بس this فضلت Sara. الـ bound function this فيها متثبتة **للأبد**: لا call ولا apply ولا bind تاني يغيّروها. (الاستثناء الوحيد [[new]]، وده نادر.)

وحاجة مهمة: كل [[bind]] بيعمل دالة جديدة:

~~~text الناتج: intro.bind(sara) === intro.bind(sara)
false
~~~

عشان كده لو عملت [[addEventListener("click", obj.fn.bind(obj))]]، مش هتعرف تشيله بـ [[removeEventListener]] بـ bind تاني. احفظ النسخة في متغير الأول.

---

## ٦. الاستخدام الأشهر: callback

~~~text app.js
const btn = { label: "Save", click() { console.log(this.label); } };
setTimeout(btn.click.bind(btn), 0);
~~~

من غير bind، setTimeout كانت هتنادي click لوحدها و this تضيع (درس this). [[btn.click.bind(btn)]] بتعمل نسخة this فيها btn، و setTimeout تنادي النسخة دي:

~~~text الناتج
Save
~~~

---

## الخلاصة

| | بينادي دلوقتي؟ | الـ arguments | بيرجّع |
|---|---|---|---|
| [[fn.call(obj, a, b)]] | أيوه | ورا بعض | ناتج fn |
| [[fn.apply(obj, [a, b])]] | أيوه | في array | ناتج fn |
| [[fn.bind(obj, a)]] | لأ | تثبّت أولهم (اختياري) | دالة جديدة this فيها obj للأبد |

- call و apply للنداء مرة واحدة بـ this معيّنة. bind لما هتبعت الدالة لحد تاني يناديها بعدين.
- التمرين تحت بيطلب منك تكتب [[myBind]] بنفسك. فكّر في اللي شفته في خطوة ٤ و ٥: bind بترجّع **دالة**، والدالة دي لما تتنادي لازم تستخدم الـ this المحفوظ والـ arguments القديمة والجديدة بالترتيب.`,
          lines: [
            R`دالة بتستخدم [[this]] ومعاها باراميترين.`,
            R`[[this.name]] جاية من اللي هيتحدد وقت النداء.`,
            "قفلة.",
            "object.",
            R`[[call]]: this = sara والـ arguments ورا بعض.`,
            R`[[apply]]: نفس الكلام والـ arguments في array.`,
            R`[[bind]]: دالة جديدة this فيها sara للأبد، وأول argument متثبت.`,
            "نادي بالـ argument التاني بس.",
            "call مش قادرة تغيّر this بتاعة bound function.",
            "object فيه method بتستخدم this.",
            "bind قبل ما تبعتها، فـ this فضلت btn."
          ],
          sol: R`[[myBind(intro, sara, "Hi")("!")]] لازم ترجّع [["Hi, I'm Sara!"]]، زي bind المدمجة. والـ args اللي اتحددت وقت الـ bind بتيجي الأول، وبعدها اللي بتتبعت وقت النداء.

ولو ناديت الناتج بـ [[.call({ name: "Ali" }, "!")]] هيفضل Sara، لأن جوه الدالة اللي رجّعتها انت بتنادي [[fn.apply(ctx, ...)]] بالـ ctx المحفوظ في الـ closure وبتتجاهل this الجديدة. الغلطة الشائعة إنك ترجّع [[fn.apply(ctx, args)]] على طول بدل ما ترجّع دالة، فالدالة تتنفّذ وقت الـ bind نفسه. والنسخة دي مبتدعمش [[new]]، والمستوى ٣ بيكمّلها.`,
          solCode: R`function myBind(fn, ctx, ...args) {
  return function (...newArgs) {
    return fn.apply(ctx, [...args, ...newArgs]);
  };
}
function intro(greeting, punct) {
  return $__bt$__{greeting}, I'm $__{this.name}$__{punct}$__bt;
}
const saraIntro = myBind(intro, { name: "Sara" }, "Hi");
console.log(saraIntro("!"));                    // "Hi, I'm Sara!"
console.log(saraIntro.call({ name: "Ali" }, "?")); // "Hi, I'm Sara?"`,
          check: {
            lang: "js",
            starter: R`function myBind(fn, ctx, ...args) {
  // رجّع دالة، متنفّذش fn دلوقتي
}`,
            tests: R`function intro(greeting, punct) { return greeting + ", I'm " + this.name + punct; }
test("myBind(intro, sara, 'Hi')('!') ← \"Hi, I'm Sara!\"", () => expect(myBind(intro, { name: "Sara" }, "Hi")("!")).toBe("Hi, I'm Sara!"));
test("بترجّع دالة ومش بتنادي fn وقت الـ bind", () => {
  let calls = 0;
  const b = myBind(() => calls++, null);
  expect([typeof b, calls]).toEqual(["function", 0]);
});
test("الـ args بتاعة الـ bind الأول وبعدها بتاعة النداء", () => expect(myBind((...a) => a.join(""), null, "a", "b")("c", "d")).toBe("abcd"));
test("this متتغيرش بـ call بعد الـ bind", () => expect(myBind(intro, { name: "Sara" }, "Hi").call({ name: "Ali" }, "?")).toBe("Hi, I'm Sara?"));
test("بترجّع ناتج fn", () => expect(myBind(function () { return this.x * 2; }, { x: 21 })()).toBe(42));`,
            solution: R`function myBind(fn, ctx, ...args) {
  return function (...newArgs) {
    return fn.apply(ctx, [...args, ...newArgs]);
  };
}`
          }
        }
      ]
    }
]);
