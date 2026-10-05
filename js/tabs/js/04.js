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
    },
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
          lines: [
            "array.",
            R`الـ prototype بتاعها هو [[Array.prototype]]، وفيه map و filter و كل الباقي.`,
            R`والـ prototype بتاع ده [[Object.prototype]]: آخر السلسلة قبل null.`,
            R`[[map]] مش خاصية على الـ array نفسها.`,
            R`بس [[in]] بيدوّر في السلسلة فلاقاها.`,
            "object فيه method.",
            R`object جديد الـ prototype بتاعه animal.`,
            "خاصية على cat نفسه.",
            R`[[speak]] مش على cat، اتلاقت في animal، و this = cat.`,
            "اتأكد من اللينك.",
            "الكتابة بتعمل خاصية على cat وتخبّي اللي فوق.",
            "النسخة الأصلية لسه على animal."
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
          try: R`ضيف [[withdraw(amount)]] بترمي error لو الرصيد مش كفاية. وبعدين جرّب تكتب [[acc.#balance]] برا الكلاس: هتلاقي SyntaxError قبل ما الملف يشتغل أصلًا. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الكلاس جاهز في المربع، ضيف [[withdraw]].`,
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
          lines: [
            "بداية الكلاس.",
            R`[[static]]: خاصية على الكلاس نفسه، مشتركة.`,
            R`private field: محدش يقراه أو يكتبه غير كود جوه الكلاس.`,
            R`[[constructor]] بيتنادي مع [[new]].`,
            "خاصية عامة على الـ instance.",
            "عدّ الـ instances على الكلاس نفسه.",
            "قفلة.",
            "method: بتتحط على الـ prototype مرة واحدة.",
            "افحص الـ input وارمي error واضح.",
            "عدّل الـ private field.",
            R`رجّع الـ instance عشان الـ chaining.`,
            "قفلة.",
            R`getter: بيتقرا كخاصية من غير [[()]].`,
            "بيرجّع الـ private field للقراية بس.",
            "قفلة.",
            "قفلة الكلاس.",
            "instance جديد.",
            "chaining لأن deposit بترجّع this.",
            "الـ getter اشتغل.",
            "مفيش setter فمحدش يقدر يغيّر الرصيد كده.",
            "static بيتقرا من الكلاس.",
            "الكلاس في الآخر function."
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
}`,
            tests: R`test("deposit(100).deposit(50).withdraw(30) ← balance 120", () => expect(new BankAccount("Sara").deposit(100).deposit(50).withdraw(30).balance).toBe(120));
test("withdraw أكبر من الرصيد بترمي error", () => expect(() => new BankAccount("Ali").deposit(100).withdraw(500)).toThrow());
test("المبلغ السالب أو الصفر بيترمي", () => {
  const acc = new BankAccount("Ali").deposit(100);
  expect(() => acc.withdraw(-5)).toThrow();
  expect(() => acc.withdraw(0)).toThrow();
});
test("السحب الفاشل ميغيّرش الرصيد", () => {
  const acc = new BankAccount("Mona").deposit(100);
  try { acc.withdraw(500); } catch {}
  expect(acc.balance).toBe(100);
});
test("withdraw بترجّع this عشان الـ chaining", () => {
  const acc = new BankAccount("Omar").deposit(50);
  expect(acc.withdraw(10) === acc).toBe(true);
});
test("تسحب الرصيد كله بالظبط ← 0", () => expect(new BankAccount("Nour").deposit(70).withdraw(70).balance).toBe(0));`,
            solution: R`class BankAccount {
  #balance = 0;
  constructor(owner) { this.owner = owner; }
  deposit(amount) {
    if (amount <= 0) throw new RangeError("المبلغ لازم يبقى موجب");
    this.#balance += amount;
    return this;
  }
  withdraw(amount) {
    if (amount <= 0) throw new RangeError("المبلغ لازم يبقى موجب");
    if (amount > this.#balance) throw new Error($__btالرصيد مش كفاية: معاك $__{this.#balance} وعايز تسحب $__{amount}$__bt);
    this.#balance -= amount;
    return this;
  }
  get balance() { return this.#balance; }
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
          lines: [
            "الكلاس الأب.",
            "constructor.",
            "خاصية.",
            "قفلة.",
            "method.",
            "بترجّع وصف.",
            "قفلة.",
            "قفلة.",
            R`[[Admin]] بيورث كل حاجة من User.`,
            "constructor بباراميتر زيادة.",
            R`[[super]] بينادي constructor الأب، ولازم قبل أي this.`,
            "خاصية زيادة.",
            "قفلة.",
            "override للـ method.",
            R`[[super.describe()]] بتجيب نسخة الأب ونكمّل عليها.`,
            "قفلة.",
            "قفلة.",
            "instance.",
            "النسخة الجديدة من describe.",
            "instanceof للكلاس نفسه.",
            "وللأب كمان، لأنه في السلسلة."
          ],
          sol: R`من غير [[super(name)]] بيطلع [[ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor]]: في الكلاس الابن this مبتتعملش غير لما الأب يعملها بـ super، فأي [[this.x]] قبلها ممنوع. ولو حطيت super بعد [[this.permissions = ...]] نفس الـ error.

[[class Guest extends User {}]] من غير constructor و [[new Guest("x").describe()]] بترجّع [["User: x"]]: لو مكتبتش constructor، JS بيعملك واحد لوحده [[constructor(...args) { super(...args); }]] بيبعت كل حاجة للأب. فمتكتبش constructor غير لو عندك حاجة زيادة تعملها.`
        }
      ]
    },
    {
      t: "modules",
      l: 2,
      n: "import و export، والفرق بين ESM و CommonJS، والـ dynamic import",
      items: [
        {
          cmd: "import و export",
          title: "تقسّم الكود على ملفات وتستورد منهم",
          desc: R`كل ملف ES module ليه scope بتاعه، ومحدش يشوف حاجة منه غير اللي عملها [[export]]. فيه نوعين: named export ([[export function add]])، وده بيتعمله import بنفس الاسم بين [[{ }]]، و default export ([[export default]]) واحد في الملف، وبيتعمله import بأي اسم.

في المتصفح: [[<script type="module" src="main.js">]]. وفي Node: [["type": "module"]] في package.json أو امتداد [[.mjs]].`,
          example: R`// math.js
export const PI = 3.14159;
export function area(r) { return PI * r * r; }
export default function round2(n) { return Math.round(n * 100) / 100; }
// main.js
import round2, { area, PI as pi } from "./math.js";
import * as math from "./math.js";
console.log(round2(area(2)), pi, math.PI);
export { area as circleArea } from "./math.js";`,
          try: R`اعمل الملفين في فولدر، وضيف [[package.json]] فيه [[{ "type": "module" }]]، وشغّل [[node main.js]]. وبعدين امسح [[.js]] من الـ import واقرا الـ error (ERR_MODULE_NOT_FOUND).`,
          flag: "script",
          deep: {
            why: "أي مشروع حقيقي عشرات الملفات. الـ modules بتخلي كل ملف مسؤول عن حاجة واحدة، ومتغيراته مش بتتلخبط مع غيره، والـ bundlers (Vite) بيشيلوا الكود اللي محدش عمله import (tree shaking).",
            how: R`الـ imports بتتقري قبل ما الكود يشتغل (static): لازم تبقى في الـ top level (مش جوه if أو function)، وبتتعمل hoisting فبتتحمّل قبل أي سطر حتى لو اتكتبت تحت، والعادة تحطها في أول الملف. والـ path لازم string ثابت. ده اللي بيخلي الأدوات تعرف شجرة الملفات كلها وتعمل tree shaking.

الـ import بيجيب live binding مش نسخة: لو الملف الأصلي غيّر قيمة [[export let count]]، اللي عامل import هيشوف الجديد. ومينفعش تعيّن قيمة للـ import نفسه.

كل module بيتنفّذ مرة واحدة بس مهما اتعمله import من كام ملف، والنتيجة بتتكاش. ES modules شغالة strict mode لوحدها.

الـ path: في Node والمتصفح لازم الامتداد ([[./math.js]])، والـ bundlers (Vite و Next) بيسامحوك. و [[import "lodash"]] من غير [[./]] معناها package من node_modules (bare specifier)، والمتصفح مبيفهمهاش لوحده من غير bundler أو import map.

و [[export ... from]] بيعمل re-export، ودي فكرة ملفات [[index.js]] اللي بتجمّع exports فولدر كامل (barrel file).`,
            when: "دايمًا في كود جديد. named exports للأغلب لأنها أوضح في البحث والـ refactoring، و default للـ components والصفحات لما الـ framework بيطلبها (Next.js pages).",
            mistakes: R`تنسى الامتداد في Node. وتخلط default و named: [[import { round2 }]] وهي default فتطلع undefined أو error. و barrel files كبيرة بتبطّأ الـ dev server والـ tests. و circular imports (a بيستورد من b و b من a) فتلاقي قيمة undefined وقت التشغيل.`
          },
          lines: [
            R`named export لثابت.`,
            "named export لدالة.",
            "default export: واحد بس في الملف.",
            R`الـ default بأي اسم، والـ named بين [[{ }]]، و [[as]] لتغيير الاسم.`,
            R`كل الـ exports في object واحد اسمه math.`,
            "استخدمهم.",
            "re-export: الملف ده بيعدّي area من math باسم تاني."
          ],
          sol: R`[[node main.js]] بيطبع [[12.57 3.14159 3.14159]]: [[area(2)]] بـ 12.566 و round2 قرّبتها، و [[pi]] هو PI بعد إعادة التسمية، و [[math.PI]] من الـ namespace.

لما تمسح [[.js]] بيطلع [[Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../math' imported from .../main.js]] ومعاه [[Did you mean to import "./math.js"?]]. في ESM الامتداد إجباري لأن Node مبيخمّنش زي CommonJS (بعض الـ bundlers زي Vite بيخمّن، فالكود يشتغل هناك ويقع في Node). ولو فيه [[package.json]] من غير [["type": "module"]]، Node 22 بيكتشف إن الملف ESM ويشغّله، بس بتحذير [[MODULE_TYPELESS_PACKAGE_JSON]] وبيحلّل الملف مرتين، فحط الـ type دايمًا.`
        },
        {
          cmd: "CommonJS و ESM",
          title: "ليه فيه require و import، وأستخدم أنهي؟",
          desc: R`CommonJS ([[require]] و [[module.exports]]) هو نظام Node القديم من قبل ما JS يبقى فيه modules. ESM ([[import]] و [[export]]) هو الرسمي في اللغة، وشغال في المتصفح و Node.

في ٢٠٢٦: اكتب ESM في أي مشروع جديد. و Node الحديث (22 و 24) بيسمح لـ [[require]] إنه يجيب ESM (require(esm)) طالما مفيهوش top-level await، فالخلط بقى أسهل من الأول. بس هتقابل CommonJS كتير في مشاريع ومكتبات قديمة.`,
          example: R`// CommonJS: utils.cjs
const path = require("node:path");
function slug(s) { return s.toLowerCase().replaceAll(" ", "-"); }
module.exports = { slug };
// ESM: app.mjs
import { slug } from "./utils.cjs";
import { readFile } from "node:fs/promises";
const pkg = JSON.parse(await readFile(new URL("./package.json", import.meta.url), "utf8"));
console.log(slug("Hello World"), import.meta.dirname);`,
          try: R`اعمل الملفين وجنبهم [[package.json]] (ولو فيه [[{}]] بس، لأن السطر التالت بيقراه)، وشغّل [[node app.mjs]]. وبعدين جرّب في ملف [[.cjs]] تكتب [[import]] واقرا الـ error. وجرّب [[__dirname]] في [[.mjs]] وشوف إنها مش موجودة.`,
          flag: "script",
          deep: {
            why: R`أشهر errors في Node: «Cannot use import statement outside a module» و «require is not defined in ES module scope» و «ERR_REQUIRE_ESM». كلهم من خلط النظامين. لازم تعرف الملف ده بيتعامل كأنهي نوع وليه.`,
            how: R`Node بيقرر نوع الملف كده: [[.mjs]] دايمًا ESM، و [[.cjs]] دايمًا CommonJS، و [[.js]] حسب [["type"]] في أقرب package.json (الافتراضي commonjs). والأحدث من كده إن Node بيحاول يكتشف ESM syntax لوحده في ملفات .js لو مفيش type، بس متعتمدش على ده، اكتب الـ type.

CommonJS: [[require]] دالة عادية بتشتغل وقت التنفيذ (sync)، وممكن تتنادي جوه if، وبترجّع الـ object بتاع [[module.exports]] نفسه (ونفس الـ object من الكاش في كل require)، ولو فكّيته بـ destructuring بتاخد القيم اللي كانت وقتها بس، مش live binding زي ESM. وفيه [[__dirname]] و [[__filename]].

ESM: الـ imports static وبتتحمّل async، وفيه top-level await (زي السطر اللي بيقرا package.json). ومفيش __dirname، بدالها [[import.meta.dirname]] و [[import.meta.filename]] (Node 20.11+) أو [[import.meta.url]].

ESM يقدر يعمل import لـ CommonJS، والـ [[module.exports]] بتبقى الـ default. والعكس: [[require(esm)]] شغال في Node 22.12+ و 20.19+ لو الـ module مفيهوش top-level await، وإلا [[await import()]].

الـ prefix [[node:]] ([[node:fs]]) بيوضح إن ده built-in مش package.`,
            when: R`ESM لكل حاجة جديدة، مع [["type": "module"]]. CommonJS لو بتعدّل مشروع قديم أو أداة config لسه بتطلبه. وتفاصيل package.json في تاب «Node و npm».`,
            mistakes: R`تحط [[import]] في ملف .js من غير type: module. وتستخدم __dirname في ESM. وتعمل [[module.exports = x]] وبعدين [[exports.y = z]] فالتانية تضيع. وتنشر مكتبة ESM بس فمشاريع CommonJS قديمة متعرفش تستخدمها.`
          },
          lines: [
            R`[[require]] دالة عادية، والـ [[node:]] بيقول إن ده module جوه Node.`,
            "دالة عادية.",
            R`CommonJS بيصدّر بتعيين [[module.exports]].`,
            R`ESM يقدر يعمل import من CommonJS، والـ [[module.exports]] بتتفك كـ named.`,
            R`fs بالـ Promises من ESM.`,
            R`top-level await شغال في ESM بس، و [[import.meta.url]] مكان الملف الحالي.`,
            R`[[import.meta.dirname]] بدل [[__dirname]].`
          ],
          sol: R`[[node app.mjs]] بيطبع [[hello-world]] ومسار الفولدر بتاعك (من [[import.meta.dirname]]). الـ ESM قدر يعمل import للـ CommonJS عادي، و [[await]] في أول الملف اشتغلت من غير async (top-level await، في ESM بس).

[[import]] في ملف [[.cjs]] بيطلع [[SyntaxError: Cannot use import statement outside a module]]. و [[console.log(__dirname)]] في [[.mjs]] بيطلع [[ReferenceError: __dirname is not defined in ES module scope]]، والبديل [[import.meta.dirname]] و [[import.meta.filename]]. ولو package.json مش موجود جنب app.mjs السطر التالت هيقع بـ [[ENOENT]]، ودي الغلطة الأشهر في التجربة دي.`
        },
        {
          cmd: "dynamic import()",
          title: "تحمّل module وقت ما تحتاجه بس",
          desc: R`[[import("./heavy.js")]] (بأقواس) دالة بترجّع Promise بالـ module، وبتشتغل في أي مكان: جوه if، أو بعد ضغطة زرار، والـ path ممكن يبقى متغير.

فايدتها: الكود التقيل (محرر نصوص، أو مكتبة charts، أو لغة ترجمة) ميتحمّلش مع الصفحة، يتحمّل لما اليوزر يحتاجه. والـ bundlers بتفصله في ملف لوحده (code splitting)، وده اللي [[React.lazy]] و [[next/dynamic]] مبنيين عليه.`,
          example: R`const btn = document.querySelector("#export");
btn.addEventListener("click", async () => {
  const { exportToPdf } = await import("./pdf-export.js");
  exportToPdf(document.body);
});
const lang = navigator.language.startsWith("ar") ? "ar" : "en";
const messages = (await import($__bt./locales/$__{lang}.js$__bt)).default;
if (import.meta.env?.DEV) {
  const { setupMocks } = await import("./mocks.js");
  setupMocks();
}`,
          try: R`في مشروع Vite (تاب React)، حط [[import()]] لملف كبير جوه onClick، واعمل [[npm run build]]: هتلاقي الملف طلع chunk لوحده في dist. وافتح Network وشوفه بيتحمّل بس لما تضغط.`,
          flag: "script",
          deep: {
            why: "حجم الـ JS أكبر سبب لبطء فتح الصفحات على الموبايل. أي كود مش محتاجه أول ما الصفحة تفتح، مكانه import().",
            how: R`[[import()]] مش دالة عادية، هي syntax خاص، بس بيرجّع Promise بـ module namespace object: فيه كل الـ named exports، والـ default في [[.default]].

الـ module بيتحمّل ويتنفّذ مرة واحدة، والنداءات اللي بعدها بترجّع نفس النسخة من الكاش.

الـ bundler بيشوف [[import("./x.js")]] ويعمل ملف لوحده (chunk). ولو الـ path فيه متغير زي [[$__btlocales/$__{lang}.js$__bt]]، Vite بيعمل chunk لكل ملف ممكن يطابق الـ pattern.

شغالة كمان في CommonJS، وده الطريقة الوحيدة CommonJS يجيب ESM فيه top-level await.`,
            when: "المودالز والصفحات التقيلة، والمكتبات الكبيرة اللي بتستخدم في feature واحدة، وملفات الترجمة، والكود اللي في dev بس.",
            mistakes: R`تعمل dynamic import لحاجة صغيرة محتاجها على طول، فتزود request من غير فايدة. وتنسى [[.default]]. ومتتعاملش مع فشل التحميل (نت ضعيف): حطها في try/catch واعرض رسالة.`
          },
          lines: [
            "زرار التصدير.",
            "الـ listener async عشان نستخدم await.",
            "حمّل الملف وقت الضغطة بس، وخد الدالة منه.",
            "استخدمها.",
            "قفلة.",
            "اختار اللغة.",
            R`path متغير، والـ default export في [[.default]].`,
            R`[[import.meta.env]] في Vite. الـ [[?.]] عشان ميقعش برّه Vite.`,
            "كود التطوير بس.",
            "شغّله.",
            "قفلة."
          ],
          sol: R`بعد [[npm run build]] هتلاقي في الـ output ملفين JS مش واحد، حاجة زي [[dist/assets/index-xxxx.js]] (صغير) و [[dist/assets/pdf-export-xxxx.js]] (الملف الكبير لوحده). الاسم فيه hash بيتغير لما المحتوى يتغير. في Network (مع [[npm run preview]]) أول ما الصفحة تفتح هتشوف index بس، ولما تضغط الزرار هتلاقي طلب جديد لـ pdf-export، ومش هيتكرر لو ضغطت تاني لأن الـ module اتعمله cache.

لو ملقتش chunk منفصل، يبقى نفس الملف متعمله import عادي (static) في حتة تانية، فـ Vite حطه في الـ bundle الأساسي. الـ dynamic import بيفصل الملف بس لو ده الطريق الوحيد ليه.`
        }
      ]
    },
    {
      t: "الأخطاء",
      l: 2,
      n: "try و catch و finally، وأنواع الـ errors، و errors مخصصة بـ cause",
      items: [
        {
          cmd: "try و catch و finally",
          title: "تمسك error قبل ما البرنامج يقع",
          desc: R`[[throw]] بيوقف الدالة ويطلع لفوق لحد أول [[try/catch]]، ولو ملقاش، البرنامج يقع (أو في المتصفح error في Console). [[catch (err)]] بتمسكه، و [[finally]] بتشتغل في الحالتين (نجح أو فشل)، ومكانها التنضيف: قفل loading أو connection.

ارمي دايمًا [[Error]] أو حاجة وارثة منه ([[TypeError]] و [[RangeError]]...)، مش string، عشان يبقى فيه [[message]] و [[stack]].`,
          example: R`function parseAge(input) {
  const age = Number(input);
  if (Number.isNaN(age)) throw new TypeError($__btمش رقم: $__{input}$__bt);
  if (age < 0) throw new RangeError("السن مينفعش يبقى سالب");
  return age;
}
try {
  parseAge("abc");
} catch (err) {
  console.log(err.name, err.message);
  if (!(err instanceof TypeError)) throw err;
} finally {
  console.log("خلصنا");
}
try { JSON.parse("{"); } catch { console.log("JSON بايظ"); }`,
          try: R`اطبع [[err.stack]] وشوف أرقام السطور. وبعدين خلي الـ try يرجّع [[return "a"]] والـ finally يرجّع [[return "b"]] جوه دالة، وشوف مين بيكسب.`,
          flag: "script",
          deep: {
            why: "الداتا الغلط والنت اللي بيقطع والـ JSON البايظ هيحصلوا أكيد. الفرق بين تطبيق محترم وتطبيق بيقع إنك تمسك الـ error في المكان الصح، وتعرض رسالة مفهومة، وتسجّل التفاصيل.",
            how: R`الـ throw بيفك الـ call stack: بيطلع من الدوال واحدة واحدة لحد ما يلاقي try. أي كود بعد الـ throw في نفس الدالة مبيشتغلش.

[[catch]] بتمسك أي حاجة اترمت، مش Error بس، عشان كده في TypeScript نوعها unknown. و [[catch {}]] من غير متغير مسموحة لو مش محتاجه (ES2019).

[[finally]] بتشتغل دايمًا، حتى لو فيه return جوه try أو catch. ولو الـ finally نفسها عملت return، بتلغي أي return أو throw قبلها، وده بيخبّي errors، فمتعملش كده.

try/catch بتمسك الـ errors المتزامنة بس. لو الـ error حصل جوه setTimeout أو Promise من غير await، الـ try اللي حوالين مش هتشوفه. مع async/await، [[await]] جوه try بيمسك رفض الـ Promise (درس async).

الأنواع المدمجة: [[TypeError]] (عملية على نوع غلط، زي نداء undefined)، و [[ReferenceError]] (متغير مش موجود)، و [[SyntaxError]] (كود أو JSON بايظ)، و [[RangeError]] (قيمة برا المدى).`,
            when: R`حوالين أي حاجة ممكن تفشل لأسباب برّه الكود: JSON.parse، و fetch، والملفات، و input اليوزر. وفي الطبقة اللي تعرف تعمل حاجة مفيدة بالـ error (تعرض رسالة، تعيد المحاولة). وفي Express فيه error middleware بيلم كله (تاب Backend بـ Node).`,
            mistakes: R`[[catch (e) {}]] فاضية: الـ error اختفى وانت مش عارف. و [[throw "error"]] كـ string: مفيش stack. وتلف كل دالة في try/catch بدل مكان واحد مناسب. وتمسك كل الـ errors وانت عايز نوع واحد: افحص النوع وارمي الباقي تاني زي المثال.`
          },
          lines: [
            "دالة بتفحص وتحوّل.",
            "حوّل لرقم.",
            R`مش رقم: ارمي [[TypeError]] برسالة واضحة. التنفيذ بيقف هنا.`,
            R`سالب: [[RangeError]].`,
            "كله تمام: رجّع.",
            "قفلة.",
            "جرّب.",
            "هترمي.",
            "مسكناه.",
            R`[[name]] نوعه و [[message]] الرسالة.`,
            "لو مش النوع اللي متوقعه، ارميه تاني لفوق بدل ما تبلعه.",
            R`[[finally]] بتشتغل في الحالتين.`,
            "تنضيف.",
            "قفلة.",
            R`[[catch]] من غير متغير لو مش محتاجه.`
          ],
          sol: R`[[err.stack]] بيطبع [[TypeError: مش رقم: abc]] وتحته سطور [[at parseAge (file.js:3:...)]] وبعدها السطر اللي ناداها. اقراه من فوق لتحت: أول سطر هو المكان اللي الـ error اترمى فيه، واللي تحته مين نادى مين.

الدالة اللي فيها [[try { return "a"; } finally { return "b"; }]] بترجّع [["b"]]: الـ finally بيشتغل دايمًا قبل ما الدالة تخرج، والـ return بتاعته بيغطّي على اللي في الـ try (وكمان بيبلع أي error اترمى). عشان كده متكتبش return جوه finally أبدًا، استخدمه للتنضيف بس. ولو finally من غير return، الدالة بترجّع [["a"]] بعد ما الـ finally يشتغل.`,
          solCode: R`function parseAge(input) {
  const age = Number(input);
  if (Number.isNaN(age)) throw new TypeError($__btمش رقم: $__{input}$__bt);
  return age;
}
try { parseAge("abc"); } catch (err) { console.log(err.stack); }
function who() {
  try { return "a"; } finally { return "b"; }
}
console.log(who()); // "b"`
        },
        {
          cmd: "custom errors و cause",
          title: "تعمل أنواع errors بتاعتك وتحافظ على السبب الأصلي",
          desc: R`[[class NotFoundError extends Error]] بتخليك تفرّق بين الأخطاء بـ [[instanceof]]: الـ NotFound يرجّع 404، والـ Validation يرجّع 400، والباقي 500.

ولما تمسك error وترمي واحد أوضح منه، ابعت الأصلي في [[{ cause: err }]] (ES2022). كده الرسالة مفهومة، والتفاصيل التقنية مضاعتش للـ debugging.`,
          example: R`class AppError extends Error {
  constructor(message, { status = 500, cause } = {}) {
    super(message, { cause });
    this.name = this.constructor.name;
    this.status = status;
  }
}
class NotFoundError extends AppError {
  constructor(what) { super($__bt$__{what} مش موجود$__bt, { status: 404 }); }
}
async function loadUser(id) {
  try {
    const res = await fetch($__bthttps://api.example.com/users/$__{id}$__bt);
    if (res.status === 404) throw new NotFoundError("اليوزر");
    return await res.json();
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError("فشل تحميل اليوزر", { cause: err });
  }
}
loadUser(1).catch((e) => console.log(e.name, e.status, e.message, e.cause?.message));`,
          try: R`شغّل الكود من غير نت (أو بدومين غلط) واطبع [[e.cause]]. وبعدين اعمل [[ValidationError]] بـ status 400 وفيه [[fields]].`,
          flag: "script",
          deep: {
            why: R`في أي backend أو تطبيق كبير، طريقة التعامل مع الـ error بتعتمد على نوعه: تعرض رسالة لليوزر؟ تعيد المحاولة؟ تسجّل وتنبّه؟ لو كله [[Error]] بـ message بس، هتقارن نصوص، وده بيبوظ أول ما حد يعدّل الرسالة.`,
            how: R`[[super(message, { cause })]] بيحط الـ message والـ cause على الـ error. و [[this.name = this.constructor.name]] بيخلي الـ name يطلع اسم الكلاس الفعلي في الـ logs والـ stack، بدل "Error".

[[cause]] بيتعرض في Node وفي DevTools مع الـ stack، فبتشوف السلسلة كاملة: «فشل تحميل اليوزر» سببه «fetch failed» سببه «ECONNREFUSED».

وفيه [[AggregateError]] لما عندك كذا error مع بعض، وده اللي [[Promise.any]] بترميه لو كله فشل.

والفكرة العامة: الطبقات التحت ترمي errors بنوع ومعنى، وطبقة واحدة فوق (error middleware في Express، أو error boundary في React) بتقرر تعمل إيه بيها.`,
            when: "في أي backend (errors بـ status codes)، وفي المكتبات، وفي أي مكان بتمسك error تقني وتحوّله لحاجة ليها معنى.",
            mistakes: R`ترمي error جديد وتضيّع الأصلي من غير cause. وترجّع [[err.message]] الداخلي لليوزر (ممكن يكون فيه تفاصيل قاعدة بيانات أو paths). وتفرّق بين الأخطاء بـ [[err.message.includes(...)]].`
          },
          lines: [
            "كلاس أساسي لأخطاء التطبيق.",
            R`بياخد رسالة وخيارات: status و cause.`,
            R`[[Error]] نفسه بيقبل [[cause]] من ES2022.`,
            "الاسم يبقى اسم الكلاس الفعلي.",
            "status للـ HTTP.",
            "قفلة.",
            "قفلة.",
            "نوع أخص.",
            "رسالة جاهزة و 404.",
            "قفلة.",
            "دالة بتجيب يوزر.",
            "جرّب.",
            "الطلب.",
            "404: ارمي النوع الواضح.",
            "رجّع الداتا.",
            "أي error.",
            "لو من أخطاءنا المعروفة عدّيه زي ما هو.",
            R`غير كده لفّه في error واضح، والأصلي في [[cause]].`,
            "قفلة.",
            "قفلة.",
            "اطبع السلسلة كلها."
          ],
          sol: R`من غير نت أو بدومين غلط، [[fetch]] نفسها بترمي [[TypeError: fetch failed]] (في المتصفح [[Failed to fetch]])، فالـ catch بيلفّها في AppError. الناتج: [[AppError 500 فشل تحميل اليوزر]] و [[e.cause]] هو الـ TypeError الأصلي، وفي Node جواه كمان [[cause]] فيه كود زي [[ENOTFOUND]]. يعني الرسالة العامة لليوزر، والسبب الحقيقي محفوظ للـ logs.

[[ValidationError]] بتورث من AppError وبتضيف [[fields]]، و [[this.name]] بيطلع [["ValidationError"]] لوحده بفضل [[this.constructor.name]]. الغلطة الشائعة إنك تعمل [[this.fields = fields]] قبل [[super(...)]] فيطلع ReferenceError.`,
          solCode: R`class ValidationError extends AppError {
  constructor(fields) {
    super("البيانات مش صحيحة", { status: 400 });
    this.fields = fields;
  }
}
const err = new ValidationError({ email: "لازم يبقى إيميل صحيح" });
console.log(err.name, err.status, err.fields, err instanceof AppError);
// ValidationError 400 { email: 'لازم يبقى إيميل صحيح' } true`
        }
      ]
    },
    {
      t: "async: الـ Promises و await",
      l: 2,
      n: "callbacks ثم Promises ثم async/await، و Promise.all وأخواتها، و fetch صح، و async جوه loops",
      items: [
        {
          cmd: "Promise",
          title: "يعني إيه Promise؟",
          desc: R`الـ Promise object بيمثّل نتيجة لسه مجتش: طلب شبكة، أو قراية ملف، أو timer. ليه ٣ حالات: pending (لسه)، و fulfilled (نجح وفيه قيمة)، و rejected (فشل وفيه سبب). ولما يخلص مبيتغيرش تاني.

بتسجّل اللي هيحصل بعد كده بـ [[.then(onSuccess)]] و [[.catch(onError)]] و [[.finally()]]، وكل واحدة بترجّع Promise جديد، فتقدر توصّلهم سلسلة. وده كان الحل لـ «callback hell»: callbacks جوه callbacks جوه callbacks.`,
          example: R`function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) reject(new Error("id غلط"));
      else resolve({ id, name: "Sara" });
    }, 300);
  });
}
getUser(1)
  .then((user) => user.name)
  .then((name) => console.log("الاسم:", name))
  .catch((err) => console.log("فشل:", err.message))
  .finally(() => console.log("خلص"));
wait(500).then(() => console.log("بعد نص ثانية"));
const { promise, resolve } = Promise.withResolvers();`,
          try: R`نادي [[getUser(0)]] وشوف أنهي then اتخطت. وبعدين ارمي error جوه أول then ([[throw new Error("x")]]) وشوف الـ catch مسكته.`,
          flag: "script",
          deep: {
            why: "كل حاجة بتاخد وقت في JS async: fetch، و قاعدة البيانات، والملفات. وأي مكتبة حديثة بترجّع Promises، و async/await نفسها مبنية عليهم. من غير ما تفهمهم هتقابل bugs زي «الداتا undefined» لأنك قريتها قبل ما توصل.",
            how: R`[[new Promise(executor)]]: الـ executor بيشتغل فورًا ومعاه دالتين، [[resolve(value)]] و [[reject(reason)]]. أول واحدة تتنادي بس هي اللي بتفرق.

[[then]] بترجّع Promise جديد قيمته اللي الـ callback رجّعه. لو الـ callback رجّع Promise، السلسلة بتستناه (flattening). ولو رمى error، الـ Promise الجديد بيبقى rejected، والسلسلة بتتخطى لأقرب catch.

الـ callbacks بتاعة then مبتشتغلش فورًا حتى لو الـ Promise خلص أصلًا: بتتحط في microtask queue وتشتغل بعد الكود المتزامن الحالي (درس event loop في المستوى ٣).

Promise اترفض ومحدش عمله catch: المتصفح بيطبع «Uncaught (in promise)»، و Node من نسخة 15 بيقفل البرنامج كله (unhandled rejection).

[[Promise.withResolvers()]] (ES2024) بترجّع promise و resolve و reject برّه الـ executor، مفيدة لما الـ resolve هيتنادي من مكان تاني (event مثلًا).`,
            when: R`هتستخدم Promises جاهزة (fetch وغيره) كل يوم، غالبًا بـ await. و [[new Promise]] بنفسك لما تلف API قديم شغال بـ callbacks (زي setTimeout أو events).`,
            mistakes: R`تنسى [[return]] جوه then فالـ then اللي بعدها تاخد undefined. وتنسى catch. وتلف Promise جاهز في [[new Promise]] من غير لزمة (explicit construction anti-pattern). وفي الانترفيو: «إيه حالات الـ Promise؟» و «callback vs promise؟».`
          },
          lines: [
            "دالة بترجّع Promise بيخلص بعد ms.",
            R`[[resolve]] بتتنادي لما الـ timer يخلص.`,
            "قفلة.",
            "API وهمي بيرجّع Promise.",
            R`الـ executor بياخد resolve و reject.`,
            "محاكاة وقت الشبكة.",
            R`فشل: [[reject]] بـ Error.`,
            R`نجح: [[resolve]] بالقيمة.`,
            "قفلة الـ timer.",
            "قفلة الـ Promise.",
            "قفلة الدالة.",
            "النداء بيرجّع Promise على طول.",
            "لما ينجح خد الاسم، والقيمة دي تروح للـ then اللي بعدها.",
            "اطبعه.",
            "أي فشل في أي مكان في السلسلة ييجي هنا.",
            "في الحالتين.",
            "استخدام wait.",
            R`[[withResolvers]]: الـ Promise و resolve بتاعه في متغيرات.`
          ],
          sol: R`[[getUser(0)]] بتطبع [[فشل: id غلط]] وبعدين [[خلص]]: الـ promise اترفضت، فالاتنين then اتخطوا ونطّت على طول للـ catch، والـ finally اشتغلت في الآخر.

لما ترمي [[throw new Error("x")]] جوه أول then (مع [[getUser(1)]])، التانية اتخطت والـ catch طبعت [[فشل: x]]: أي error جوه then بيحوّل الـ promise اللي بعدها لـ rejected. فـ catch واحدة في آخر السلسلة بتمسك الاتنين: الرفض الأصلي وأي throw بعده. لو ملقتش الرسالة خالص، غالبًا حطيت الـ catch قبل الـ then اللي فيها الـ throw.`
        },
        {
          cmd: "async و await",
          title: "تكتب كود async كأنه سطر ورا سطر",
          desc: R`[[async function]] دايمًا بترجّع Promise. وجواها [[await promise]] بتوقف الدالة دي بس (مش البرنامج) لحد ما الـ Promise يخلص، وترجّع قيمته، أو ترمي الـ error لو اترفض.

فبدل سلسلة then، بتكتب كود شكله متزامن، وبتمسك الأخطاء بـ try/catch عادي. وفي ES modules تقدر تستخدم await في أول الملف من غير async (top-level await).`,
          example: R`async function loadDashboard(userId) {
  try {
    const res = await fetch($__bthttps://api.example.com/users/$__{userId}$__bt);
    if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt);
    const user = await res.json();
    const ordersRes = await fetch($__bthttps://api.example.com/orders?user=$__{user.id}$__bt);
    return { user, orders: await ordersRes.json() };
  } catch (err) {
    console.error("فشل التحميل:", err);
    return null;
  }
}
const data = await loadDashboard(1);
const p = loadDashboard(2);
console.log(p instanceof Promise); // true`,
          try: R`امسح [[await]] من قدام [[res.json()]] واطبع [[user]]: هتلاقي [[Promise { <pending> }]]. وبعدين نادي [[loadDashboard]] من غير await وشوف إيه اللي بيتطبع الأول.`,
          flag: "script",
          deep: {
            why: "ده الشكل اللي هتكتب بيه كل كود async تقريبًا في 2026: fetch و Prisma و fs و أي SDK. أسهل في القراية من then، والـ try/catch والـ loops والـ if بيشتغلوا عادي.",
            how: R`[[async]] بتخلي الدالة ترجّع Promise دايمًا: لو رجّعت قيمة بتتلف في Promise fulfilled، ولو رمت error بيبقى rejected.

[[await x]] بيوقف تنفيذ الدالة الحالية، ويرجّع التحكم للي ناداها، والـ event loop يكمّل شغل تاني. لما الـ Promise يخلص، الدالة بتكمّل من نفس المكان (كأنها generator من جوه). عشان كده await مبتجمّدش الصفحة.

كل [[await]] ورا التاني بيستنى اللي قبله. في المثال طلب الـ orders محتاج [[user.id]] فلازم يستنى، بس لو الطلبين مستقلين، شغّلهم مع بعض بـ [[Promise.all]] (الدرس الجاي).

[[return await]] جوه try بيفرق: من غير await، الـ Promise بيترجع قبل ما يخلص، ولو اترفض الـ catch اللي في الدالة مش هتمسكه.

الـ top-level await شغال في ES modules بس (المتصفح بـ type=module، و Node مع ESM)، وبيخلّي أي module بيعمل import للملف ده يستناه.`,
            when: "أي كود async جديد. then لسه مفيدة في سلسلة قصيرة أو لما مش عايز توقف الدالة.",
            mistakes: R`تنسى await فتاخد Promise بدل القيمة. و await جوه [[forEach]] (الدرس الأخير هنا). و awaits ورا بعض لحاجات مستقلة فالصفحة تبقى أبطأ من غير سبب (waterfall). وتنسى إن fetch مبترميش error على 404 و 500، لازم تفحص [[res.ok]]. وفي الانترفيو: «async/await بيعمل إيه من تحت؟» (Promises و microtasks).`
          },
          lines: [
            "دالة async: بترجّع Promise دايمًا.",
            R`try عشان نمسك أي [[await]] يترفض.`,
            "استنى الرد.",
            R`fetch مبترميش على 404 و 500، فافحص [[ok]] بنفسك.`,
            "استنى تحويل الـ body لـ JSON.",
            "طلب محتاج نتيجة اللي قبله، فلازم يستناه.",
            R`[[await]] ينفع جوه أي expression.`,
            "أي فشل فوق ييجي هنا.",
            "سجّل.",
            "رجّع قيمة واضحة للفشل.",
            "قفلة.",
            "قفلة.",
            "top-level await: شغال في ES modules.",
            "من غير await بتاخد Promise.",
            "أي async function بترجّع Promise."
          ],
          sol: R`من غير [[await]] قدام [[res.json()]]، [[user]] بيطبع [[Promise { <pending> }]]، و [[user.id]] بـ undefined، فالـ URL التاني بيبقى [[orders?user=undefined]]. ده أشهر bug في async: الكود مبيقعش، بس بيبعت داتا غلط.

من غير await قدام loadDashboard، السطر اللي بعدها بيتطبع الأول ([[true]] من [[instanceof Promise]])، وبعدين النتيجة أو رسالة «فشل التحميل». الدالة الـ async بتشتغل لحد أول await وترجع promise فورًا، والباقي بيكمّل بعدين. ولو [[api.example.com]] مش شغال عندك، هتشوف «فشل التحميل» و [[null]]، وده برضه صح: الـ catch شغالة.`
        },
        {
          cmd: "Promise.all و allSettled",
          title: "تشغّل كذا طلب مع بعض بدل ورا بعض",
          desc: R`[[await Promise.all([a, b, c])]] بتستنى كلهم مع بعض، وترجّع array بالنتايج بنفس الترتيب. لو واحد فشل، الكل بيفشل فورًا بالـ error بتاعه.

[[Promise.allSettled]] بتستنى كلهم مهما حصل، وترجّع لكل واحد [[{ status, value }]] أو [[{ status, reason }]]. و [[Promise.race]] بترجّع أول واحد يخلص (نجح أو فشل)، و [[Promise.any]] أول واحد ينجح.`,
          example: R`const api = (path) => fetch($__bthttps://api.example.com$__{path}$__bt).then((r) => r.json());
const [user, orders, settings] = await Promise.all([
  api("/me"),
  api("/orders"),
  api("/settings"),
]);
const results = await Promise.allSettled([api("/a"), api("/b")]);
const ok = results.filter((r) => r.status === "fulfilled").map((r) => r.value);
const failed = results.filter((r) => r.status === "rejected").map((r) => r.reason);
const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms));
const fast = await Promise.race([api("/slow"), timeout(3000)]);
const first = await Promise.any([api("/mirror1"), api("/mirror2")]);`,
          try: R`اعمل ٣ دوال بـ [[wait]] (500 و 1000 و 1500 ms). استناهم ورا بعض واحسب الوقت بـ [[console.time]]، وبعدين بـ Promise.all وقارن (3 ثواني مقابل 1.5).`,
          flag: "script",
          deep: {
            why: R`صفحة dashboard بتجيب ٥ حاجات مستقلة: لو عملتهم await ورا بعض، كل طلب 300ms، يبقى 1.5 ثانية. مع Promise.all يبقوا 300ms. ده من أسهل تحسينات الأداء وأكترها تأثير، وسؤال انترفيو مشهور: «اكتب Promise.all بإيدك» (المستوى ٣).`,
            how: R`الطلبات بتبدأ لحظة ما تنادي الدوال (وانت بتبني الـ array)، مش لما تعمل await. Promise.all بس بتستنى. عشان كده [[const a = api("/a"); const b = api("/b"); await a; await b;]] برضه بيشغّلهم مع بعض، بس خطر: لو b اترفض وانت لسه مستني a، الرفض بيبقى unhandled و Node بيقفل البرنامج حتى لو جوه try/catch. فاستخدم Promise.all.

[[all]] بتفشل مع أول rejection (fail-fast)، بس الطلبات التانية مبتتلغيش، بتكمّل ونتايجها بتترمي. لو محتاج تلغيها فعلًا استخدم AbortController (الدرس الجاي).

[[race]] مفيدة للـ timeout، بس الطلب الأصلي بيفضل شغال. [[any]] بتتجاهل الفشل لحد ما واحد ينجح، ولو كلهم فشلوا ترمي [[AggregateError]] فيه كل الأسباب.

كل دول بيقبلوا أي iterable، والقيم اللي مش Promises بتتعامل كأنها نجحت.`,
            when: R`[[all]] لما كلهم لازم ينجحوا (الصفحة محتاجة الكل). [[allSettled]] لما كل واحد مستقل (رفع صور متعددة، إشعارات). [[race]] للـ timeout. [[any]] لـ mirrors أو fallback.`,
            mistakes: R`await ورا بعض لحاجات مستقلة. و Promise.all على آلاف الطلبات مرة واحدة فتضرب السيرفر أو الـ rate limit: قسّمهم batches أو استخدم مكتبة زي p-limit. وتفتكر إن race بتلغي الخاسر.`
          },
          lines: [
            "helper صغير بيجيب JSON.",
            "٣ طلبات بيبدأوا مع بعض، والنتايج بتتفك بالترتيب.",
            "الأول.",
            "التاني.",
            "التالت.",
            "قفلة: لو واحد فشل، كله يفشل.",
            "استنى الكل مهما حصل.",
            "خد الناجحين.",
            "والفاشلين وأسبابهم.",
            "Promise بيترفض بعد ms.",
            "أول واحد يخلص: الطلب أو الـ timeout.",
            "أول واحد ينجح من الاتنين."
          ],
          sol: R`الناتج حاجة زي [[ورا بعض: 3.004s]] و [[Promise.all: 1.500s]]. ورا بعض كل await بتستنى اللي قبلها (500 + 1000 + 1500)، و Promise.all بتبدأهم مع بعض فالوقت بيبقى وقت أطولهم بس.

خلي بالك إن الـ promises بتبدأ لحظة ما تنادي الدالة، مش لحظة الـ await. لو كتبت [[const pa = a(), pb = b(), pc = c();]] وبعدين [[await pa; await pb; await pc;]] هتاخد 1.5 ثانية برضه. والغلطة الشائعة العكس: تكتب [[Promise.all([await a(), await b()])]] فتستنى كل واحدة قبل ما Promise.all تشوفها وترجع لـ 3 ثواني.`,
          solCode: R`const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const a = () => wait(500), b = () => wait(1000), c = () => wait(1500);
console.time("ورا بعض");
await a(); await b(); await c();
console.timeEnd("ورا بعض");      // ~3s
console.time("Promise.all");
await Promise.all([a(), b(), c()]);
console.timeEnd("Promise.all");  // ~1.5s`
        },
        {
          cmd: "fetch و AbortController",
          title: "تعمل fetch صح: تفحص الرد وتلغي الطلب",
          desc: R`[[fetch(url, options)]] بترجّع Promise بالـ Response. خد بالك من حاجتين: fetch بتترفض بس لو النت فشل، أما 404 و 500 بيعدّوا عادي، فلازم تفحص [[res.ok]]. والـ body بيتقري مرة واحدة بـ [[res.json()]] أو [[res.text()]].

وعشان تلغي طلب (اليوزر خرج من الصفحة، أو كتب حرف جديد في البحث)، ابعت [[signal]] من [[AbortController]]، أو [[AbortSignal.timeout(ms)]] لـ timeout جاهز.`,
          example: R`async function api(path, { body, ...options } = {}) {
  const res = await fetch($__bthttps://api.example.com$__{path}$__bt, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
    body: body ? JSON.stringify(body) : undefined,
    signal: options.signal ?? AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error($__btHTTP $__{res.status}: $__{await res.text()}$__bt);
  return res.status === 204 ? null : res.json();
}
await api("/orders", { method: "POST", body: { productId: 5 } });
let controller;
async function search(q) {
  controller?.abort();
  controller = new AbortController();
  try {
    return await api($__bt/search?q=$__{encodeURIComponent(q)}$__bt, { signal: controller.signal });
  } catch (err) {
    if (err.name === "AbortError") return;
    throw err;
  }
}`,
          try: R`في Console على أي موقع، اعمل [[fetch("/not-found")]] واطبع [[res.ok]] و [[res.status]]: هتلاقيه نجح عادي بـ 404. وبعدين جرّب [[fetch(url, { signal: AbortSignal.timeout(1) })]] واقرا الـ error.`,
          flag: "script",
          deep: {
            why: R`كل تطبيق بيكلّم API. ومشاكل زي «بيعرض داتا قديمة لما أكتب بسرعة في البحث» (race condition) و «الطلب واقف دقيقة» و «بيعرض صفحة 500 كأنها داتا» كلها من fetch مكتوب من غير فحص ولا إلغاء.`,
            how: R`الـ Promise بتاع fetch بيخلص أول ما الـ headers توصل، والـ body لسه بيتقري. عشان كده [[res.json()]] Promise تاني. والـ body stream بيتقري مرة واحدة، فلو قريته بـ text مينفعش تقراه بـ json.

[[AbortController]] عنده [[signal]] بتتبعت للـ fetch، و [[abort()]] بترفض الـ Promise بـ error اسمه AbortError، والمتصفح بيقفل الـ connection فعلًا. و [[AbortSignal.timeout(ms)]] signal جاهزة بتعمل abort بعد وقت (الـ error اسمه TimeoutError). و [[AbortSignal.any([a, b])]] بتجمع اتنين.

في البحث: كل حرف بيلغي الطلب اللي قبله. من غير كده، رد قديم بطيء ممكن يوصل بعد رد جديد ويكتب فوقه.

الكوكيز: في نفس الدومين بتتبعت لوحدها. لو دومين تاني محتاج [[credentials: "include"]] والسيرفر يسمح بـ CORS (تاب المتصفح وتاب الانترفيو). و Node 18+ فيه fetch مدمج.

وفي React، مكتبة زي TanStack Query بتعمل الإلغاء والكاش وإعادة المحاولة بدالك (تاب React).`,
            when: R`helper واحد زي [[api()]] في المشروع كله بدل fetch متكررة. و AbortController في البحث والـ autocomplete و useEffect cleanup. و timeout لأي طلب لسيرفر خارجي.`,
            mistakes: R`متفحصش [[res.ok]]. وتنسى [[JSON.stringify]] أو الـ Content-Type. وتبني URL بـ query من اليوزر من غير [[encodeURIComponent]] أو [[URLSearchParams]]. وتعرض AbortError كـ error لليوزر. وتقرا الـ body مرتين.`
          },
          lines: [
            R`helper: بياخد path وخيارات، والـ body object لوحده.`,
            "الطلب.",
            "باقي الخيارات (method وغيره).",
            "JSON افتراضي، وتقدر تزود headers.",
            "حوّل الـ body لنص لو موجود.",
            "timeout افتراضي 8 ثواني لو مفيش signal.",
            "قفلة.",
            R`404 و 500 مش بيترفضوا لوحدهم: ارمي انت، ومعاك نص الرد للـ debugging.`,
            "204 مفيهوش body.",
            "قفلة.",
            "POST بـ body.",
            "الـ controller بتاع آخر بحث.",
            "دالة البحث.",
            "الغي الطلب القديم لو لسه شغال.",
            "controller جديد للطلب ده.",
            "جرّب.",
            R`[[encodeURIComponent]] عشان الحروف الخاصة والعربي، والـ signal عشان نقدر نلغيه.`,
            "لو فشل.",
            "الإلغاء مش error حقيقي: تجاهله.",
            "أي حاجة تانية ارميها.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[const res = await fetch("/not-found")]] بعدها [[res.ok]] بـ false و [[res.status]] بـ 404، ومفيش error اترمى: fetch بترفض بس لو الطلب نفسه موصلش (نت واقع، DNS، CORS). أي رد من السيرفر، حتى 404 أو 500، يعتبر نجاح. عشان كده الـ [[if (!res.ok) throw]] في الدالة ضروري.

[[AbortSignal.timeout(1)]] بتطلع error اسمه [[TimeoutError]] (في Node الرسالة [[The operation was aborted due to timeout]]، وفي Chrome [[signal timed out]]). لاحظ إنه مش [[AbortError]]: الـ catch في search بيتجاهل AbortError بس، فالـ timeout هيوصل لليوزر كـ error، وده المطلوب (إلغاء مقصود ≠ timeout).`
        },
        {
          cmd: "async في loops",
          title: "ليه await جوه forEach مش بيستنى؟",
          desc: R`[[arr.forEach(async (x) => await save(x))]] مبتستناش حاجة: forEach بتنادي الـ callback وبتتجاهل الـ Promise اللي راجع، فالكود اللي بعدها بيشتغل قبل ما أي save يخلص، والأخطاء بتضيع.

لو عايز واحد ورا واحد: [[for...of]] مع await. ولو عايزهم مع بعض: [[Promise.all(arr.map(async ...))]]. ولو كتير وعايز حد أقصى في نفس الوقت: batches أو مكتبة زي p-limit.`,
          example: R`const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const save = async (id) => { await wait(100); console.log("saved", id); return id; };
const ids = [1, 2, 3];
ids.forEach(async (id) => { await save(id); });
console.log("forEach خلصت؟ لأ، لسه محدش اتحفظ");
for (const id of ids) {
  await save(id);
}
const saved = await Promise.all(ids.map((id) => save(id)));
for (let i = 0; i < ids.length; i += 2) {
  await Promise.all(ids.slice(i, i + 2).map(save));
}
const all = await Array.fromAsync(ids, async (id) => save(id));`,
          try: R`حط [[console.time("t")]] و [[console.timeEnd("t")]] حوالين كل طريقة وقارن الوقت: for...of حوالي 300ms، و Promise.all حوالي 100ms. وبعدين خلي save ترمي error لـ id 2 وشوف مين بيمسكه ومين لأ.`,
          flag: "script",
          deep: {
            why: "bug منتشر جدًا: «بحفظ كل العناصر وبعدين أبعت رسالة نجاح»، والرسالة بتطلع قبل الحفظ، أو الـ error بيضيع ومحدش يعرف إن نص العناصر متحفظتش.",
            how: R`[[forEach]] و [[map]] و [[filter]] مبيعرفوش حاجة عن Promises. الـ async callback بيرجّع Promise، و forEach بترميه. و [[filter(async ...)]] أسوأ: كل Promise object truthy، فكل العناصر بتعدّي.

[[for...of]] جوه async function بيستنى كل لفة، فالعمليات ورا بعض. مفيد لما الترتيب مهم، أو كل واحدة معتمدة على اللي قبلها، أو عايز ترحم السيرفر.

[[Promise.all(arr.map(...))]] بيبدأ الكل مرة واحدة ويستناهم. أسرع، بس ممكن يضرب rate limit أو connection pool في قاعدة البيانات.

الـ batches حل وسط: كل مرة n بس. و [[Array.fromAsync]] (ES2026، بس موجودة في Node 22 والمتصفحات الحديثة من بدري) بتعمل array من async iterable أو بتستنى كل عنصر بالترتيب.

و [[for await (const x of stream)]] للـ async iterables زي streams وقراية ملف سطر سطر.`,
            when: R`for...of للترتيب أو الاعتمادية. Promise.all للعمليات المستقلة القليلة. batches للكتير. ومتستخدمش forEach مع async أبدًا.`,
            mistakes: R`async في forEach أو filter. و [[await]] جوه for...of لعمليات مستقلة فتبطّأ من غير سبب. و Promise.all على ١٠ آلاف insert. وفي الانترفيو: «إيه المشكلة في الكود ده؟» على forEach مع await.`
          },
          lines: [
            "helper بيستنى.",
            "حفظ وهمي بياخد 100ms.",
            "ids.",
            R`forEach بترمي الـ Promises: مفيش استنى.`,
            "بيتطبع قبل أي saved.",
            "for...of: واحد ورا واحد.",
            "كل لفة بتستنى اللي قبلها: 300ms كلهم.",
            "قفلة.",
            "مع بعض: 100ms، والنتايج بالترتيب.",
            "batches: ٢ في المرة.",
            "استنى الدفعة قبل اللي بعدها.",
            "قفلة.",
            R`[[Array.fromAsync]]: ورا بعض وترجّع array.`
          ],
          sol: R`مع [[console.time]]: forEach بتقول حوالي 0ms لأنها مبتستناش أي حاجة (الحفظ بيحصل بعدين)، و for...of حوالي 300ms، و Promise.all حوالي 100ms.

لما save ترمي لـ id 2: مع forEach الـ error مش بيتمسك بأي try/catch حواليها، وبيطلع unhandled rejection بيوقّع Node (وفي المتصفح error أحمر في Console)، و id 3 بيتحفظ عادي. مع for...of الـ try/catch بيمسكه، و id 3 مبيتحفظش لأن الـ loop وقفت. مع Promise.all الـ catch بيمسكه بعد 100ms، بس id 3 بيتحفظ برضه لأن الـ promises كانت بدأت كلها، و Promise.all بترفض عند أول فشل من غير ما تلغي الباقي. لو عايز كل النتايج استخدم allSettled.`,
          solCode: R`const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const save = async (id) => {
  await wait(100);
  if (id === 2) throw new Error("فشل حفظ " + id);
  console.log("saved", id);
};
const ids = [1, 2, 3];
try {
  for (const id of ids) await save(id); // saved 1 ثم يقف
} catch (e) { console.log("for...of:", e.message); }
try {
  await Promise.all(ids.map(save));     // saved 1 و saved 3، والـ catch بيمسك 2
} catch (e) { console.log("Promise.all:", e.message); }`
        }
      ]
    }
]);
