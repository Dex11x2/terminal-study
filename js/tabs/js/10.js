// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "prototypes و classes",
      l: 2,
      n: "الوراثة في JS بالـ prototype chain، و class شكل أوضح لنفس الفكرة، و extends و super و private fields",
      items: [
        {
          cmd: "prototype chain",
          title: "إزاي [].map موجودة وانت معرّفتهاش؟",
          desc: R`كل object في JS ليه لينك مخفي لـ object تاني اسمه الـ prototype. لما تقرا خاصية مش موجودة في الـ object، JS بيدوّر في الـ prototype، وبعدين في الـ prototype بتاعه، لحد [[Object.prototype]] وبعده null. ده اسمه prototype chain.

عشان كده [[[1, 2].map]] شغالة: map مش على الـ array نفسها، هي على [[Array.prototype]]، وكل array لينكها بيشاور عليه. والـ classes نفسها مبنية على ده.`,
          example: R`const arr = [1, 2];
Object.getPrototypeOf(arr) === Array.prototype;               // true
Object.getPrototypeOf(Array.prototype) === Object.prototype;  // true
Object.hasOwn(arr, "map");     // false: مش عنده
"map" in arr;                  // true: لقاها في السلسلة
const animal = { speak() { return $__bt$__{this.name} بيتكلم$__bt; } };
const cat = Object.create(animal);
cat.name = "Mishmish";
cat.speak();                   // "Mishmish بيتكلم"
Object.getPrototypeOf(cat) === animal;  // true
cat.speak = () => "مياو";      // shadowing: بقت على cat نفسه
animal.speak.call(cat);        // لسه موجودة على الـ prototype`,
          try: R`في Console اكتب [[console.dir([1, 2])]] وافتح [[[[Prototype]]]] جوه بعض لحد ما توصل null. وبعدين جرّب [[Object.create(null)]] وشوف مفيهوش [[toString]] خالص.`,
          flag: "script",
          deep: {
            why: "ده نظام الوراثة الحقيقي في JS، والـ class مجرد syntax فوقه. لو فاهمه، هتفهم instanceof، وليه methods الـ class مش بتتنسخ لكل instance، وإيه هو prototype pollution، وسؤال انترفيو ثابت: «اشرح prototypal inheritance».",
            how: R`اللينك ده اسمه في الـ spec [[[[Prototype]]]]، وبتقراه بـ [[Object.getPrototypeOf(obj)]]. فيه [[obj.__proto__]] القديمة، بس متستخدمهاش في كود جديد.

متتلخبطش: [[Fn.prototype]] (خاصية على الدوال) هو الـ object اللي هيبقى prototype لأي حاجة تتعمل بـ [[new Fn()]]. يعني [[Object.getPrototypeOf(new Fn()) === Fn.prototype]].

القراية بتمشي في السلسلة، بس الكتابة لأ: [[cat.speak = ...]] بتعمل خاصية جديدة على cat وتخبّي اللي في الـ prototype (shadowing)، والـ prototype متلمسش.

[[Object.create(proto)]] بتعمل object فاضي الـ prototype بتاعه proto. و [[Object.create(null)]] object من غير prototype خالص: مفيهوش toString ولا hasOwnProperty، ومفيد كـ dictionary نضيف.

و [[a instanceof B]] بيمشي في سلسلة a ويسأل: [[B.prototype]] موجود فيها؟

الـ methods على الـ prototype موجودة مرة واحدة في الذاكرة ومشتركة بين كل الـ instances، عكس لو حطيتها في الـ constructor.`,
            when: "مش هتكتب Object.create كتير في الشغل اليومي، هتستخدم class. بس هتحتاج الفهم ده في الـ debugging، وفي الانترفيو، ولما تقرا كود مكتبات قديم.",
            mistakes: R`تعدّل [[Array.prototype]] أو [[Object.prototype]] (monkey patching): بيأثر على كل الكود وكل المكتبات. وتدمج objects جاية من اليوزر من غير فحص فمفتاح زي [["__proto__"]] يعدّل الـ prototype (prototype pollution، ثغرة حقيقية اتلاقت في lodash). وتتلخبط بين [[__proto__]] و [[prototype]].`
          },
          teach: R`## الكود ده بيعمل إيه؟

جزئين: الأول بيثبت إن [[map]] مش موجودة على الـ array نفسها، موجودة «فوقها» في السلسلة. والتاني بيعمل سلسلة بإيدنا: object اسمه [[cat]] بيورث method من object اسمه [[animal]]. اتشغّل في Node 24، وكل سطر طبعناه بـ console.log.

---

## ١. مين الـ prototype بتاع الـ array؟

~~~text app.js
const arr = [1, 2];
Object.getPrototypeOf(arr) === Array.prototype;
~~~

- [[Object.getPrototypeOf(x)]]: دالة جاهزة بترجّع الـ **prototype** بتاع x، يعني الـ object اللي x بيدوّر فيه لما ميلاقيش حاجة عنده.
- [[Array.prototype]]: object واحد في JS كلها، متخزّن فيه map و filter و push وكل methods الـ arrays.
- [[===]]: هل الاتنين **نفس** الـ object بالظبط؟

~~~text الناتج
true
~~~

يعني كل array بتعملها، الـ prototype بتاعها هو نفس الـ [[Array.prototype]].

---

## ٢. وفوقه؟

~~~text app.js
Object.getPrototypeOf(Array.prototype) === Object.prototype;
~~~

~~~text الناتج
true
~~~

و [[Object.prototype]] ده آخر محطة، الـ prototype بتاعه [[null]] (طبعناه: [[Object.getPrototypeOf(Object.prototype)]] طلع [[null]]). فالسلسلة:

~~~text السلسلة
arr  →  Array.prototype  →  Object.prototype  →  null
~~~

---

## ٣. [[Object.hasOwn]] ضد [[in]]

~~~text app.js
Object.hasOwn(arr, "map");
"map" in arr;
~~~

- [[Object.hasOwn(obj, key)]] (من ES2022): الخاصية دي **على الـ object نفسه**؟ من غير ما يدوّر فوق.
- [[key in obj]]: الخاصية دي موجودة **في أي حتة في السلسلة**؟

~~~text الناتج
false
true
~~~

map مش على arr، بس [[in]] لقاها في Array.prototype. وللمقارنة: [[Object.hasOwn(arr, 0)]] و [[Object.hasOwn(arr, "length")]] طلعوا [[true]]: العناصر و length على الـ array نفسها.

---

## ٤. سلسلة بإيدك: [[Object.create]]

~~~text app.js
const animal = { speak() { return $__bt$__{this.name} بيتكلم$__bt; } };
const cat = Object.create(animal);
cat.name = "Mishmish";
~~~

- [[animal]]: object عادي فيه method واحدة. و [[$__bt...$__bt]] نص template، و [[$__{this.name}]] بتتبدل بالاسم.
- [[Object.create(animal)]]: اعمل object **فاضي** والـ prototype بتاعه animal.
- [[cat.name = "Mishmish"]]: خاصية على cat نفسه.

~~~text الناتج: console.log(cat)
{ name: 'Mishmish' }
~~~

لاحظ إن [[speak]] مش ظاهرة: هي مش على cat.

---

## ٥. القراية بتمشي في السلسلة

~~~text app.js
cat.speak();
Object.getPrototypeOf(cat) === animal;
~~~

~~~text الناتج
Mishmish بيتكلم
true
~~~

اللي حصل خطوة خطوة:

1. JS دوّر على [[speak]] في cat: مش موجودة.
2. طلع للـ prototype (animal): لقاها.
3. نادها، و **this = cat** لأن النداء كان [[cat.speak()]] (قاعدة النقطة)، فـ [[this.name]] = Mishmish.

---

## ٦. الكتابة مبتمشيش في السلسلة (shadowing)

~~~text app.js
cat.speak = () => "مياو";
animal.speak.call(cat);
~~~

- [[cat.speak = ...]]: الكتابة **دايمًا** بتحط الخاصية على cat نفسه. فبقى فيه speak على cat «بتغطّي» على اللي فوق. ده اسمه **shadowing**.
- [[animal.speak.call(cat)]]: اللي فوق لسه موجودة زي ما هي، ندهناها بـ this = cat بـ [[call]].

~~~text الناتج
مياو                    ← cat.speak()
Mishmish بيتكلم        ← animal.speak.call(cat)
~~~

و [[Object.keys(cat)]] بقت فيها [['name']] و [['speak']]، و animal ملمستش.

---

## ٧. object من غير prototype

جرّبنا [[Object.create(null)]] (من التجربة):

~~~text app.js
const o = Object.create(null);
o.toString;
"toString" in o;
String(o);
~~~

~~~text الناتج
undefined
false
TypeError: Cannot convert object to primitive value
~~~

مفيش سلسلة خالص، فمفيش toString، و [[String(o)]] مش لاقي طريقة يحوّله لنص. ده مفيد كـ dictionary نضيف من غير مفاتيح موروثة.

---

## الخلاصة

| العملية | بتعمل إيه |
|---|---|
| [[Object.getPrototypeOf(x)]] | هات الحلقة اللي فوق x |
| [[Object.create(p)]] | object جديد فوقه p |
| [[Object.hasOwn(x, k)]] | k على x نفسه؟ |
| [[k in x]] | k في أي حتة في السلسلة؟ |
| قراية [[x.k]] | دوّر في x وبعدين فوق لحد null |
| كتابة [[x.k = v]] | على x نفسه دايمًا (shadowing) |

- كل array و object و دالة جزء من سلسلة كده، والـ class (الدرس الجاي) بتبني نفس السلسلة بشكل أوضح.`,
          lines: [
            R`array عادية. هنستخدمها نشوف منين جات [[map]] و [[filter]] مع إننا عمرنا ما عرّفناهم عليها.`,
            R`كل object ليه لينك مخفي لـ object تاني اسمه الـ prototype. الـ array بتاعتنا الـ prototype بتاعها [[Array.prototype]]، وده المكان اللي فيه [[map]] و [[filter]] و [[push]] متعرّفين **مرة واحدة** لكل الـ arrays.`,
            R`و [[Array.prototype]] نفسه ليه prototype هو [[Object.prototype]] (فيه [[toString]] و [[hasOwnProperty]]). ده آخر حلقة، والـ prototype بتاعه [[null]]: هنا السلسلة بتخلص.`,
            R`[[Object.hasOwn]] بيسأل عن الخصايص اللي على الـ object **نفسه** بس، ورجّع [[false]]: [[arr]] مفيهاش [[map]] فعلًا.`,
            R`[[in]] بيدوّر في السلسلة كلها، فلاقى [[map]] على [[Array.prototype]] ورجّع [[true]]. ده نفس اللي بيحصل لما تكتب [[arr.map]]: JS بيدوّر في الـ object، ولو ملقاش يطلع للـ prototype، وهكذا لحد [[null]].`,
            R`object فيه method [[speak]] بتستخدم [[this.name]]. هنخليه prototype لـ object تاني بدل ما نكرر الـ method.`,
            R`[[Object.create]] بيعمل object فاضي جديد ويخلي الـ prototype بتاعه [[animal]]. فـ [[cat]] نفسه مفيهوش أي خاصية، بس يقدر يستخدم أي حاجة في [[animal]].`,
            R`بيحط [[name]] على [[cat]] نفسه (own property) مش على [[animal]]، فلو عملنا object تاني من نفس الـ [[animal]] مش هيشوف الاسم ده.`,
            R`[[speak]] مش على [[cat]]، فـ JS طلع في السلسلة ولقاها على [[animal]]. بس [[this]] لسه [[cat]] (اللي قبل النقطة)، فـ [[this.name]] بقت [["Mishmish"]].`,
            R`بيأكد إن اللينك المخفي بتاع [[cat]] رايح لـ [[animal]] بالظبط، ورجّع [[true]].`,
            R`الكتابة **عمرها ما بتطلع في السلسلة**: بتعمل [[speak]] جديدة على [[cat]] نفسه. ودلوقتي [[cat.speak()]] بترجّع [["مياو"]] لأن JS بيلاقيها على [[cat]] الأول وميطلعش لفوق (shadowing).`,
            R`النسخة الأصلية لسه على [[animal]] متلمستش، و [[call(cat)]] بتشغّلها بـ [[this]] هو [[cat]] فترجّع [["Mishmish بيتكلم"]]. يعني الـ shadowing خبّى الـ method على [[cat]] بس، ممسحهاش.`,
          ],
          sol: R`[[console.dir([1, 2])]] بيوريك الـ array، وجواها خانة Prototype مكتوب جنبها [[Array(0)]] وفيه map و filter وكل الـ methods، وجواه خانة Prototype تانية مكتوب جنبها [[Object]] وفيه toString و hasOwnProperty، وده آخرها: الـ prototype بتاعه null (مش هيظهرلك سطر تالت). يعني السلسلة [[arr → Array.prototype → Object.prototype → null]].

[[const o = Object.create(null)]] بيعمل object مفيش فوقيه أي حاجة: [[o.toString]] بـ undefined، و [["toString" in o]] بـ false، و [[String(o)]] أو [[$__bt$__{o}$__bt]] بتطلع [[TypeError: Cannot convert object to primitive value]]. بيستخدم كـ dictionary نضيف مفيهوش مفاتيح موروثة (عشان مفتاح زي [["constructor"]] ميضربش)، ودي نفس فكرة الـ null prototype اللي [[Object.groupBy]] بترجّعها.`
        },
        {
          cmd: "class",
          title: "تكتب class بـ constructor و methods و private fields",
          desc: R`[[class]] طريقة واضحة تعمل «قالب» لـ objects: [[constructor]] بيتنادي مع [[new]]، والـ methods بتتحط على الـ prototype (مشتركة بين كل الـ instances).

وفيه: fields ([[count = 0]])، و private fields بـ [[#]] ([[#balance]]) محدش يوصلها من برّه الكلاس خالص، و [[static]] للحاجات اللي على الكلاس نفسه مش على الـ instance، و [[get]] و [[set]] لخصايص محسوبة.

و [[typeof BankAccount]] هيطلع [["function"]]: الكلاس في الآخر constructor function فوق الـ prototypes.`,
          example: R`class BankAccount {
  static count = 0;
  #balance = 0;
  constructor(owner) {
    this.owner = owner;
    BankAccount.count++;
  }
  deposit(amount) {
    if (amount <= 0) throw new RangeError("المبلغ لازم يبقى موجب");
    this.#balance += amount;
    return this;
  }
  get balance() {
    return this.#balance;
  }
}
const acc = new BankAccount("Sara");
acc.deposit(100).deposit(50);
acc.balance;          // 150
acc.balance = 1e6;    // مفيش setter: بيتجاهل (وفي strict TypeError)
BankAccount.count;    // 1
typeof BankAccount;   // "function"`,
          try: R`ضيف [[withdraw(amount)]] بترمي error لو الرصيد مش كفاية. وبعدين جرّب تكتب [[acc.#balance]] برا الكلاس: هتلاقي SyntaxError قبل ما الملف يشتغل أصلًا. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الكلاس جاهز في المربع: ضيف [[withdraw]]، و getter اسمه [[history]] بيرجّع العمليات اللي نجحت بس بالترتيب، كل واحدة [[{ type: "deposit", amount: 100 }]] (أو [["withdraw"]]). خزّن السجل في field خاص [[#log]]، واللي بره ميقدرش يعدّل السجل حتى لو عمل push في الـ array اللي رجعتله.`,
          flag: "script",
          deep: {
            why: R`الـ classes في كل حتة: Error مخصص، و services في الباك، و SDKs زي [[new PrismaClient()]] و [[new Stripe()]]، و Web Components. ومع private fields بقى عندك encapsulation حقيقي، مش underscore بالاتفاق.`,
            how: R`[[class A {}]] بتعمل constructor function، والـ methods بتتحط على [[A.prototype]] (مش enumerable). الفروق عن الـ function القديمة: الكلاس لازم يتنادي بـ new (وإلا TypeError)، وكل الكود جواه strict mode، والكلاس في TDZ زي let (مفيش hoisting بقيمة).

الـ fields ([[count = 0]] و [[#balance = 0]]) بتتحط على كل instance لوحده، وقت الـ constructor. عشان كده arrow function كـ field بتتعمل نسخة لكل instance (ذاكرة أكتر، بس this متثبت).

الـ private fields ([[#x]]) مش خصايص عادية: مش بتظهر في [[Object.keys]] ولا [[JSON.stringify]] ولا console.log العادي (DevTools بيعرضها)، والكتابة ليها برا الكلاس SyntaxError. و [[#x in obj]] بيفحص لو الـ object عنده الـ field ده.

[[return this]] في آخر method بيخليك تعمل chaining. و [[static]] بيتقرا من الكلاس نفسه، وفيه [[static { }]] block للتهيئة.

الـ getter بيتقرا كأنه خاصية ([[acc.balance]] من غير أقواس). ولو مفيش setter، الكتابة بتتجاهل في sloppy mode وبترمي TypeError في strict.`,
            when: "لما عندك state وسلوك مرتبطين ببعض وهتعمل منهم instances كتير، أو مكتبة بتطلب كده (Error و Web Components). للداتا البسيطة، objects ودوال أبسط. وفي React الحديثة مفيش classes تقريبًا.",
            mistakes: R`تنسى [[new]]. وتبعت method كـ callback فـ this تضيع (درس this). وتحط كل حاجة في class على طريقة Java حتى لو دوال عادية كفاية. وتعتمد على [[_balance]] كـ private: أي حد يقدر يوصلها. وفي الانترفيو: «الفرق بين class و constructor function؟» الإجابة: syntax فوق نفس الـ prototypes، مع strict و new إجباري و private fields.`
          },
          teach: R`## الكود ده بيعمل إيه؟

بيعرّف «قالب» لحساب بنكي: كل حساب ليه صاحب ورصيد، والرصيد **private** محدش يقدر يلعب فيه من برّه، وتزوّده بـ [[deposit]] بس. وفي الآخر بيجرّب الحاجات اللي الكلاس بيوفّرها. اتشغّل في Node 24 كملف [[.cjs]] وكملف [[.mjs]].

---

## ١. [[class]] والـ static

~~~text app.js
class BankAccount {
  static count = 0;
~~~

- [[class BankAccount { ... }]]: بيعرّف كلاس اسمه BankAccount. العُرف إن اسم الكلاس يبدأ بحرف كبير.
- [[static count = 0;]]: خاصية على **الكلاس نفسه** مش على كل حساب. فيه [[BankAccount.count]] واحدة بس مشتركة. بنستخدمها نعدّ الحسابات اللي اتعملت.

---

## ٢. الـ private field

~~~text app.js
  #balance = 0;
~~~

- [[#balance]]: الـ [[#]] جزء من الاسم، ومعناها **private**: الخاصية دي موجودة على كل حساب، بس مفيش أي كود يقدر يقراها أو يكتبها **غير الكود اللي جوه الكلاس**.
- [[= 0]]: كل حساب جديد بيبدأ رصيده 0. ده اسمه **field**: بيتحط على كل instance لوحده وقت ما يتعمل.

---

## ٣. الـ constructor

~~~text app.js
  constructor(owner) {
    this.owner = owner;
    BankAccount.count++;
  }
~~~

- [[constructor]]: دالة خاصة بتتنادي **لوحدها** مع [[new]]. الـ arguments اللي بتبعتها لـ new بتوصل هنا.
- [[this.owner = owner]]: [[this]] هنا = الحساب الجديد (قاعدة new). فبنحط عليه خاصية **عامة** اسمها owner.
- [[BankAccount.count++]]: زوّد العداد اللي على الكلاس.

---

## ٤. method بتعدّل الرصيد

~~~text app.js
  deposit(amount) {
    if (amount <= 0) throw new RangeError("المبلغ لازم يبقى موجب");
    this.#balance += amount;
    return this;
  }
~~~

- [[deposit(amount)]]: method. كل methods الكلاس بتتحط **مرة واحدة** على [[BankAccount.prototype]]، وكل الحسابات بتشوفها من السلسلة (درس prototype chain).
- [[if (amount <= 0) throw ...]]: افحص الـ input الأول. [[throw new RangeError(...)]] بيوقف الدالة ويرمي error من نوع RangeError (قيمة برّه المدى المسموح).
- [[this.#balance += amount]]: زوّد الرصيد. ده مسموح لأننا **جوه** الكلاس.
- [[return this]]: رجّع الحساب نفسه. ده اللي بيخلّي [[acc.deposit(100).deposit(50)]] تشتغل: أول deposit بترجّع acc، فالتانية بتتنادي عليه. ده اسمه **chaining**.

---

## ٥. getter

~~~text app.js
  get balance() {
    return this.#balance;
  }
}
~~~

- [[get balance()]]: **getter**: دالة بتتقري كأنها خاصية عادية. تكتب [[acc.balance]] **من غير أقواس**، وهي بتشتغل وترجّع الرصيد.
- مفيش [[set balance()]]، يعني الرصيد **للقراية بس** من برّه.

---

## ٦. الاستخدام

~~~text app.js
const acc = new BankAccount("Sara");
acc.deposit(100).deposit(50);
acc.balance;
~~~

~~~text الناتج
BankAccount { owner: 'Sara' }      ← console.log(acc)
true                               ← acc.deposit(100) === acc
150                                ← acc.balance
~~~

لاحظ إن [[console.log(acc)]] في Node مبيعرضش [[#balance]] خالص. ولا [[Object.keys(acc)]] (طلعت [['owner']] بس) ولا [[JSON.stringify(acc)]] (طلعت [[{"owner":"Sara"}]]).

---

## ٧. تحاول تكتب الرصيد من برّه

~~~text app.js
acc.balance = 1e6;
~~~

[[1e6]] يعني 1 × 10 أس 6 = مليون. النتيجة بتفرق حسب الملف:

| الملف | اللي حصل |
|---|---|
| [[.cjs]] (من غير "use strict") | الكتابة اتجاهلت في صمت، و [[acc.balance]] فضلت [[150]] |
| [[.mjs]] (strict لوحده) | [[TypeError: Cannot set property balance of #<BankAccount> which has only a getter]] |

ولو حاولت توصل للـ private نفسه من برّه الكلاس:

~~~text app.js
console.log(acc.#balance);
~~~

~~~text الناتج
SyntaxError: Private field '#balance' must be declared in an enclosing class
~~~

ده **SyntaxError**: الملف كله مش بيشتغل، حتى السطور اللي قبل الغلطة، لأن JS بيلاقيها وهو بيقرا الكود قبل ما ينفّذه.

---

## ٨. الكلاس من جوه

~~~text app.js
BankAccount.count;
typeof BankAccount;
~~~

~~~text الناتج
1
function
~~~

- [[BankAccount.count]] = 1 (حساب واحد اتعمل). و [[acc.count]] طلعت [[undefined]]: الـ static على الكلاس مش على الـ instance.
- [[typeof BankAccount]] = [["function"]]: الكلاس في الآخر constructor function. وطبعنا [[Object.getOwnPropertyNames(BankAccount.prototype)]]:

~~~text الناتج
[ 'constructor', 'deposit', 'balance' ]
~~~

يعني deposit والـ getter على الـ prototype، و [[Object.hasOwn(acc, "deposit")]] طلعت [[false]].

ومن الفروق عن الـ function العادية: مينفعش تنادي الكلاس من غير new:

~~~text الناتج: BankAccount("x")
TypeError: Class constructor BankAccount cannot be invoked without 'new'
~~~

---

## الخلاصة

| الحتة | مكانها | مين يوصلها |
|---|---|---|
| [[static count]] | الكلاس نفسه | [[BankAccount.count]] |
| [[#balance]] | كل instance | كود الكلاس بس |
| [[this.owner]] | كل instance | أي حد |
| [[deposit]] و [[get balance]] | [[BankAccount.prototype]] | كل الـ instances بالسلسلة |

- [[return this]] في آخر method = chaining.
- getter من غير setter = خاصية للقراية بس.
- في التمرين تحت هتضيف [[withdraw]] وسجل للعمليات: بص على deposit كويس، وفكّر إيه الحالات الغلط اللي لازم ترفضها، وإيه اللي لازم ترجّعه عشان الـ chaining يفضل شغال، وفين تخزّن السجل بحيث محدش من بره يقدر يعدّله.`,
          lines: [
            R`بيعرّف كلاس: قالب نعمل منه حسابات بـ [[new BankAccount(...)]]. كل حساب object ليه رصيده، والـ methods متشاركة بينهم.`,
            R`[[static]] معناها الخاصية دي على الكلاس **نفسه** مش على كل حساب. فيه [[count]] واحد بس للكل ([[BankAccount.count]])، ومش هتلاقيه في [[acc.count]].`,
            R`private field: كل حساب بيبدأ برصيد 0، والـ [[#]] بتمنع أي كود برّه الكلاس يقرا أو يكتب الرصيد (حتى المحاولة نفسها SyntaxError). فالطريقة الوحيدة لتغييره هي [[deposit]].`,
            R`الدالة اللي بتتنادى أوتوماتيك مع [[new]]، والـ arguments اللي في [[new BankAccount("Sara")]] بتوصلها. هنا بنجهّز الحساب الجديد.`,
            R`بتحط اسم صاحب الحساب كخاصية عادية (public) على الـ instance الجديد، فأي حد يقدر يقرا [[acc.owner]].`,
            R`كل مرة حساب يتعمل نزوّد العداد المشترك اللي على الكلاس. استخدمنا اسم الكلاس مش [[this]]، لأن [[this]] هنا الحساب الجديد مش الكلاس.`,
            R`نهاية الـ [[constructor]].`,
            R`method: بتتحط على [[BankAccount.prototype]] مرة واحدة، وكل الحسابات بتستخدم نفس الدالة عن طريق الـ prototype chain بدل ما كل حساب ياخد نسخة.`,
            R`بنرفض أي مبلغ صفر أو سالب فورًا بـ error واضح. من غير الفحص ده [[deposit(-100)]] كانت هتسحب فلوس من غير ما حد يلاحظ. و [[RangeError]] نوع error مناسب لقيمة برّه المدى المسموح.`,
            R`بنزوّد الرصيد الخاص. ده مسموح لأن السطر جوه الكلاس.`,
            R`بترجّع الحساب نفسه، فتقدر تكمّل نداء تاني على طول ([[acc.deposit(100).deposit(50)]]). من غيرها [[deposit]] هترجّع [[undefined]] والنداء التاني هيرمي TypeError.`,
            R`نهاية [[deposit]].`,
            R`getter: دالة بتتقري كإنها خاصية، فتكتب [[acc.balance]] من غير [[()]]. ولأن مفيش [[set balance]]، الرصيد يتقري بس ومحدش يغيّره من برّه.`,
            R`بترجّع قيمة الـ private field. كده الرصيد ظاهر للقراية بس، والتعديل الوحيد عن طريق [[deposit]] اللي بتفحص المبلغ.`,
            R`نهاية الـ getter.`,
            R`نهاية الكلاس [[BankAccount]].`,
            R`[[new]] بيعمل object جديد، وينادي الـ [[constructor]] بـ [["Sara"]]، ويرجّع الحساب. دلوقتي [[owner]] بقى [["Sara"]]، والرصيد 0، و [[BankAccount.count]] بقى 1.`,
            R`chaining: أول [[deposit]] رجّعت [[acc]] نفسه، فاتنادت التانية عليه. الرصيد بقى 150.`,
            R`الـ getter اشتغل من غير [[()]] ورجّع [[150]].`,
            R`محاولة تغيير الرصيد لمليون. ولأن [[balance]] getter من غير setter، الكتابة بتتجاهل بالسكوت في الكود العادي، وفي strict mode (وجوه الـ modules) بترمي TypeError. والرصيد يفضل 150.`,
            R`بنقرا الـ [[static]] من الكلاس نفسه: [[1]] لأننا عملنا حساب واحد. أما [[acc.count]] كانت هترجّع [[undefined]].`,
            R`بيرجّع [["function"]]: الكلاس في الآخر constructor function بشكل أنضف، والـ methods بتتحط على الـ prototype زي ما شفنا في درس الـ prototype chain.`,
          ],
          sol: R`[[withdraw]] بتفحص إن المبلغ موجب وإنه مش أكبر من الرصيد، وترمي error لو لأ. بعد [[deposit(100).deposit(50).withdraw(30)]] الـ balance بـ 120، و [[withdraw(500)]] بترمي error برسالة فيها الرصيد والمطلوب.

[[acc.#balance]] برّه الكلاس بيطلع [[SyntaxError: Private field '#balance' must be declared in an enclosing class]] والملف كله مبيشتغلش، حتى أول console.log فيه، لأن الغلطة بتتمسك وقت الـ parsing. ده الفرق بين [[#balance]] و [[_balance]] (convention بس وأي حد يقدر يقراه). ولو نسيت [[return this]] في withdraw، الـ chaining اللي بعدها هيقع بـ [[Cannot read properties of undefined]].`,
          solCode: R`class BankAccount {
  #balance = 0;
  constructor(owner) { this.owner = owner; }
  deposit(amount) {
    if (amount <= 0) throw new RangeError("المبلغ لازم يبقى موجب");
    this.#balance += amount;
    return this;
  }
  withdraw(amount) {
    if (amount <= 0) throw new RangeError("المبلغ لازم يبقى موجب");
    if (amount > this.#balance) {
      throw new Error($__btالرصيد مش كفاية: معاك $__{this.#balance} وعايز تسحب $__{amount}$__bt);
    }
    this.#balance -= amount;
    return this;
  }
  get balance() { return this.#balance; }
}
const acc = new BankAccount("Sara");
acc.deposit(100).deposit(50).withdraw(30);
console.log(acc.balance); // 120
try { acc.withdraw(500); } catch (e) { console.log(e.message); }`,
          check: {
            lang: "js",
            starter: R`class BankAccount {
  #balance = 0;
  constructor(owner) { this.owner = owner; }
  deposit(amount) {
    if (amount <= 0) throw new RangeError("المبلغ لازم يبقى موجب");
    this.#balance += amount;
    return this;
  }
  withdraw(amount) {
    // موجب، ومش أكبر من الرصيد، و return this
  }
  get balance() { return this.#balance; }
  get history() {
    return [];
  }
}`,
            tests: R`test("deposit(100).deposit(50).withdraw(30) ← balance 120", () => expect(new BankAccount("Sara").deposit(100).deposit(50).withdraw(30).balance).toBe(120));
test("withdraw أكبر من الرصيد بترمي error، والرصيد ميتغيّرش", () => {
  const acc = new BankAccount("Ali").deposit(100);
  expect(() => acc.withdraw(500)).toThrow();
  expect(() => acc.withdraw(0)).toThrow();
  expect(acc.balance).toBe(100);
});
test("history: العمليات اللي نجحت بس، بالترتيب", () => {
  const acc = new BankAccount("Sara").deposit(100).withdraw(30);
  try { acc.withdraw(500); } catch {}
  try { acc.deposit(-1); } catch {}
  acc.deposit(5);
  expect(acc.history).toEqual([{ type: "deposit", amount: 100 }, { type: "withdraw", amount: 30 }, { type: "deposit", amount: 5 }]);
});
test("اللي بره ميقدرش يعدّل السجل", () => {
  const acc = new BankAccount("Mona").deposit(10);
  acc.history.push({ type: "deposit", amount: 1e6 });
  acc.history.length = 0;
  expect(acc.history).toEqual([{ type: "deposit", amount: 10 }]);
});
test("كل حساب ليه سجله", () => {
  const a = new BankAccount("A").deposit(1), b = new BankAccount("B");
  expect([a.history.length, b.history.length]).toEqual([1, 0]);
});
test("withdraw بترجّع this عشان الـ chaining", () => {
  const acc = new BankAccount("Omar").deposit(50);
  expect(acc.withdraw(10) === acc).toBe(true);
});`,
            solution: R`class BankAccount {
  #balance = 0;
  #log = [];
  constructor(owner) { this.owner = owner; }
  deposit(amount) {
    if (amount <= 0) throw new RangeError("المبلغ لازم يبقى موجب");
    this.#balance += amount;
    this.#log.push({ type: "deposit", amount });
    return this;
  }
  withdraw(amount) {
    if (amount <= 0) throw new RangeError("المبلغ لازم يبقى موجب");
    if (amount > this.#balance) throw new Error($__btالرصيد مش كفاية: معاك $__{this.#balance} وعايز تسحب $__{amount}$__bt);
    this.#balance -= amount;
    this.#log.push({ type: "withdraw", amount });
    return this;
  }
  get balance() { return this.#balance; }
  get history() { return this.#log.map(e => ({ ...e })); }
}`
          }
        },
        {
          cmd: "extends و super",
          title: "كلاس بيورث من كلاس تاني",
          desc: R`[[class Admin extends User]] بتخلي Admin ياخد كل methods بتاعة User، ويضيف أو يغيّر عليها. جوه الـ constructor لازم تنادي [[super(...)]] قبل ما تستخدم [[this]]، و [[super.method()]] بتنادي النسخة بتاعة الأب.

أشهر استخدام عملي: [[class NotFoundError extends Error]] عشان يبقى عندك أنواع errors تفرّق بينها بـ instanceof (درس الأخطاء).

وقبل ما تورّث، اسأل: هل ينفع أركّب (composition) بدل ما أورّث؟ غالبًا أبسط.`,
          example: R`class User {
  constructor(name) {
    this.name = name;
  }
  describe() {
    return $__btUser: $__{this.name}$__bt;
  }
}
class Admin extends User {
  constructor(name, permissions) {
    super(name);
    this.permissions = permissions;
  }
  describe() {
    return $__bt$__{super.describe()} (admin: $__{this.permissions.join(", ")})$__bt;
  }
}
const a = new Admin("Sara", ["users", "billing"]);
a.describe();          // "User: Sara (admin: users, billing)"
a instanceof Admin;    // true
a instanceof User;     // true`,
          try: R`امسح سطر [[super(name)]] وشغّل واقرا الـ error. وبعدين اعمل [[class Guest extends User]] من غير constructor خالص وجرّب [[new Guest("x").describe()]].`,
          flag: "script",
          deep: {
            why: "هتقابلها في الـ Errors المخصصة، وفي مكتبات بتطلب إنك تورّث من كلاس بتاعها (Web Components بـ HTMLElement مثلًا)، وفي أسئلة OOP في الانترفيو (تاب الانترفيو فيه OOP بالتفصيل).",
            how: R`[[extends]] بيعمل سلسلتين prototype: [[Admin.prototype]] الـ prototype بتاعه [[User.prototype]] (عشان الـ methods)، و [[Admin]] نفسه الـ prototype بتاعه [[User]] (عشان الـ static).

في كلاس بيورث، الـ this مبيتعملش لحد ما [[super()]] يتنادى، لأن الأب هو اللي بيعمل الـ object. عشان كده this قبل super بترمي ReferenceError. ولو مكتبتش constructor خالص، JS بيعمل واحد بينادي [[super(...args)]] لوحده.

[[super.describe()]] بتدوّر على describe في prototype الأب، وبتناديها بنفس الـ this. ده بيخليك تكمّل على سلوك الأب بدل ما تكرره.

تقدر تورّث من built-ins: [[class MyArray extends Array]] و [[extends Error]] و [[extends EventTarget]].`,
            when: "علاقة «نوع من» حقيقية ومستقرة (NotFoundError نوع من Error). لو بتورّث عشان تاخد دالتين بس، استخدم composition أو دوال مساعدة.",
            mistakes: R`this قبل super. وسلسلة وراثة عميقة (A extends B extends C extends D) كل تعديل فيها بيكسر حاجة. وتنسى إن الـ override بيلغي method الأب لو منادتش super. وفي الانترفيو: «composition vs inheritance؟» (تاب الانترفيو وتاب هندسة البرمجيات).`
          },
          teach: R`## الكود ده بيعمل إيه؟

كلاس أب [[User]] فيه اسم و method بتوصفه، وكلاس ابن [[Admin]] بياخد كل حاجة من User ويزوّد عليها صلاحيات، ويعدّل الوصف **من غير ما يعيد كتابة** وصف الأب. اتشغّل في Node 24.

---

## ١. الكلاس الأب

~~~text app.js
class User {
  constructor(name) {
    this.name = name;
  }
  describe() {
    return $__btUser: $__{this.name}$__bt;
  }
}
~~~

كلاس عادي زي الدرس اللي فات: constructor بيحط [[name]] على الـ instance، و method [[describe]] بترجّع نص template. [[new User("Ali").describe()]] بترجّع [[User: Ali]].

---

## ٢. [[extends]]

~~~text app.js
class Admin extends User {
~~~

[[extends User]] معناها «Admin نوع من User». JS بيوصّل سلسلتين prototype (اتأكدنا من الاتنين، طلعوا [[true]]):

- [[Object.getPrototypeOf(Admin.prototype) === User.prototype]]: أي admin لما ميلاقيش method عنده، بيدوّر في methods بتاعة User.
- [[Object.getPrototypeOf(Admin) === User]]: حتى الـ static بتاعة User بتتورث.

---

## ٣. constructor الابن و [[super()]]

~~~text app.js
  constructor(name, permissions) {
    super(name);
    this.permissions = permissions;
  }
~~~

- الـ constructor بياخد باراميتر زيادة: [[permissions]] (array صلاحيات).
- [[super(name)]]: **نادي constructor الأب** وابعتله name. هو اللي بيعمل الـ object ويحط عليه [[this.name]].
- [[this.permissions = ...]]: بعد كده بس نقدر نستخدم this ونزوّد.

ليه الترتيب ده إجباري؟ في كلاس وارث، الـ object **مبيتعملش** غير لما الأب يعمله جوه super. فـ this قبل super مش موجودة أصلًا. جرّبنا [[this.x = 1; super(n);]]:

~~~text الناتج
ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
~~~

يعني «في الكلاس الوارث (derived) لازم تنادي super قبل ما تلمس this».

---

## ٤. override و [[super.describe()]]

~~~text app.js
  describe() {
    return $__bt$__{super.describe()} (admin: $__{this.permissions.join(", ")})$__bt;
  }
}
~~~

- كتبنا [[describe]] تاني في Admin: دي اسمها **override**. لما تنادي [[a.describe()]]، JS بيلاقيها في Admin.prototype الأول فبيوقف هناك.
- [[super.describe()]]: «هات نسخة **الأب** من describe ونادِيها على نفس this». فبترجّع [[User: Sara]].
- [[this.permissions.join(", ")]]: [[join]] بتلزق عناصر الـ array في نص واحد بالفاصل اللي تديهولها: [["users, billing"]].
- والنص كله: نتيجة الأب + الزيادة بين أقواس.

---

## ٥. الاستخدام

~~~text app.js
const a = new Admin("Sara", ["users", "billing"]);
a.describe();
a instanceof Admin;
a instanceof User;
~~~

~~~text الناتج
Admin { name: 'Sara', permissions: [ 'users', 'billing' ] }   ← console.log(a)
User: Sara (admin: users, billing)
true
true
~~~

- [[name]] جت من constructor الأب (عن طريق super)، و [[permissions]] من الابن، والاتنين على نفس الـ object.
- [[a instanceof User]] = [[true]]: [[instanceof]] بيمشي في سلسلة a ويسأل «User.prototype موجود فيها؟»، وهو موجود.

---

## ٦. من غير constructor خالص

من التجربة:

~~~text app.js
class Guest extends User {}
new Guest("x").describe();
~~~

~~~text الناتج
User: x
~~~

لو مكتبتش constructor، JS بيعمل واحد لوحده كده: [[constructor(...args) { super(...args); }]]، يعني بيبعت كل حاجة للأب زي ما هي.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[class B extends A]] | B بيورث methods و static بتاعة A |
| [[super(...)]] في الـ constructor | نادي constructor الأب. إجباري قبل أي this |
| [[super.method()]] | نادي نسخة الأب من method على نفس this |
| method بنفس الاسم في الابن | override: بتغطّي على بتاعة الأب |
| مفيش constructor في الابن | JS بيبعت كل الـ arguments للأب لوحده |

- اكتب constructor في الابن بس لو عندك حاجة **زيادة** تعملها.
- استخدم الوراثة لعلاقة «نوع من» حقيقية (Admin نوع من User، و NotFoundError نوع من Error).`,
          lines: [
            R`الكلاس الأب: فيه اللي أي مستخدم محتاجه (اسم و [[describe]])، والكلاسات اللي هتورث منه هتاخد ده من غير ما تكرره.`,
            R`بيتنادى مع [[new User(...)]]، أو من الكلاس الابن عن طريق [[super(...)]].`,
            R`بيحط الاسم على الـ instance. ولما [[Admin]] ينادي [[super(name)]]، السطر ده هو اللي بيحط الاسم على الـ admin.`,
            R`نهاية constructor الأب.`,
            R`method على [[User.prototype]]، فأي [[User]] وأي كلاس ابن يقدر يناديها.`,
            R`بترجّع وصف بسيط زي [["User: Sara"]]. و [[this]] هنا هتبقى الـ instance اللي اتنادت عليه، حتى لو كان [[Admin]].`,
            R`نهاية [[describe]].`,
            R`نهاية الكلاس [[User]].`,
            R`[[extends]] بيخلي [[Admin.prototype]] يورث من [[User.prototype]]، فأي admin عنده [[describe]] وأي method تانية في [[User]] أوتوماتيك، ونضيف عليها اللي يخص الـ admin بس.`,
            R`constructor خاص بالابن، بياخد الاسم زي الأب وكمان قايمة الصلاحيات.`,
            R`بينادي constructor الأب بالاسم عشان يعمل الجزء بتاعه. في كلاس ابن لازم [[super()]] قبل أي استخدام لـ [[this]]، وإلا ReferenceError، لأن الأب هو اللي بيجهّز [[this]] أصلًا.`,
            R`بعد [[super]] بقى مسموح نستخدم [[this]]، فبنضيف الخاصية اللي الـ admin بس عنده.`,
            R`نهاية constructor الابن.`,
            R`override: [[describe]] جديدة على [[Admin.prototype]]. لما تنادي [[a.describe()]]، JS بيلاقي دي الأول في السلسلة فمبيوصلش لنسخة الأب.`,
            R`[[super.describe()]] بتنادي نسخة الأب (بنفس [[this]]) فترجّع [["User: Sara"]]، وبنكمّل عليها الصلاحيات مفصولة بـ [[join(", ")]]. كده بنعيد استخدام كود الأب بدل ما ننسخه.`,
            R`نهاية [[describe]] الجديدة.`,
            R`نهاية الكلاس [[Admin]].`,
            R`بيعمل admin: constructor [[Admin]] بينادي [[super("Sara")]] فيتحط [[name]]، وبعدين [[permissions]] تتحط.`,
            R`بيشغّل النسخة الجديدة (الـ override)، اللي جواها نادت نسخة الأب: [["User: Sara (admin: users, billing)"]].`,
            R`[[instanceof]] بيدوّر في الـ prototype chain بتاعة [[a]] على [[Admin.prototype]]، ولقاها فرجّع [[true]].`,
            R`و [[User.prototype]] برضه في السلسلة (فوق [[Admin.prototype]])، فـ [[true]]. يعني الـ admin يتعامل كـ user في أي كود مستني user.`,
          ],
          sol: R`من غير [[super(name)]] بيطلع [[ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor]]: في الكلاس الابن this مبتتعملش غير لما الأب يعملها بـ super، فأي [[this.x]] قبلها ممنوع. ولو حطيت super بعد [[this.permissions = ...]] نفس الـ error.

[[class Guest extends User {}]] من غير constructor و [[new Guest("x").describe()]] بترجّع [["User: x"]]: لو مكتبتش constructor، JS بيعملك واحد لوحده [[constructor(...args) { super(...args); }]] بيبعت كل حاجة للأب. فمتكتبش constructor غير لو عندك حاجة زيادة تعملها.`
        }
      ]
    }
]);
