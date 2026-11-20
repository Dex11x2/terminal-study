// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "الأسئلة اللي بتتكرر في انترفيوهات JavaScript: إجابات تقولها بصوتك، وكود تكتبه على السبورة",
      projects: [
        { lvl: 'صغير', t: R`بنك أسئلة «إيه الناتج؟» بيصحح نفسه`, what: R`ملف [[quiz.mjs]] فيه ١٥ سؤال من درس «اتوقع الناتج» ومن الوحدات اللي فاتت (coercion و this و hoisting و event loop)، كل سؤال [[{ code, expected, rule }]]. انت بتكتب [[expected]] قبل ما تشغّل، والسكربت بيشغّل كل [[code]] بـ [[new Function]] ويقارن، ولو غلط يطبع الـ [[rule]].`, done: R`[[node quiz.mjs]] بيطبع كل سؤال وجنبه صح ولا غلط وعدد الصح من ١٥، وكل سؤال غلطت فيه بيطبع القاعدة بكلامك، والسؤال اللي فيه [[setTimeout]] أو Promise بيتصحح صح (السكربت بيستنى الناتج)، ولما تعيد بعد يومين تجيب ١٥ من ١٥.` },
        { lvl: 'صغير', t: R`includes بإيدك وفخ NaN`, what: R`[[Array.prototype.myIncludes(value, fromIndex = 0)]] بنفس شكل درس الـ polyfills، بس بالمقارنة اللي الأصلي بيستخدمها (SameValueZero): [[NaN]] بيساوي [[NaN]] و 0 بيساوي -0، و [[fromIndex]] السالب بيتحسب من الآخر، والـ holes بتتعامل كـ [[undefined]].`, done: R`[[[NaN].myIncludes(NaN)]] بيرجّع [[true]] مع إن [[[NaN].indexOf(NaN)]] بيرجّع -1، و [[[1, 2, 3].myIncludes(1, -2)]] بيرجّع [[false]] و [[[1, 2, 3].myIncludes(3, -1)]] بيرجّع [[true]]، و [[[1, , 3].myIncludes(undefined)]] بيرجّع [[true]]، وكل ده نفس اللي [[includes]] الأصلي بيرجّعه بالظبط (قارنهم في loop).` },
        { lvl: 'متوسط', t: R`مكتبة utils بتستات`, what: R`ملف [[utils.mjs]] فيه [[promiseAll]] و [[myMap]] و [[myBind]] و [[curry]] و [[deepEqual]] من دروس الوحدة، وملف [[utils.test.mjs]] بـ [[node:test]] و [[node:assert]] فيه ٣ تستات على الأقل لكل دالة، منهم حالة طرفية واحدة على الأقل (array فاضية، أو hole، أو [[new]]، أو [[NaN]]).`, done: R`[[node --test]] بيعدّي كل التستات، وكل تست بيفشل فعلًا لو بوّظت الدالة (جرّب تشيل [[if (i in this)]] أو [[Object.is]] وشوف تست بيقع)، وكل دالة بترمي [[TypeError]] لو اتبعتلها حاجة غلط (callback مش function مثلًا).` },
        { lvl: 'متوسط', t: R`انترفيو تجريبي متسجّل`, what: R`اختار ٣ أسئلة من الوحدة (واحد شرح زي null و undefined، وواحد كود زي curry، وواحد output)، وادّي نفسك ٢٠ دقيقة لكل سؤال، وسجّل صوتك وانت بتشرح وبتكتب على ورقة أو editor من غير تشغيل. بعدها شغّل الكود واسمع التسجيل.`, done: R`فيه ٣ تسجيلات، والكود اللي كتبته من غير تشغيل اشتغل من أول مرة أو مكتوب جنبه الغلطة بالظبط، وتقدر تشرح كل سؤال في دقيقتين من غير سكوت أطول من ١٠ ثواني، وكتبت لكل سؤال الحالات الطرفية اللي كان ممكن تتسأل عليها.` },
        { lvl: 'كبير', t: R`lodash صغير بتاعك`, what: R`مكتبة فيها [[debounce]] و [[throttle]] (وحدة الأداء)، و [[deepClone]] بيدعم Date و Map و Set والـ objects اللي بتشاور على نفسها بـ WeakMap، و [[deepEqual]] بنفس الدعم (درس deep equal)، و [[get(obj, "a.b.0.c", fallback)]]، و [[mapLimit(items, limit, fn)]] (فكرة Promise.all بإيدك بحد للتوازي)، و [[curry]]. كل دالة بتفحص المدخلات وبترمي [[TypeError]] برسالة واضحة.`, done: R`[[node --test]] فيه تستات للحالات الطرفية وبتعدّي: object بيشاور على نفسه بيتنسخ ويتقارن من غير stack overflow، و [[deepEqual(new Date(1), new Date(2))]] بيرجّع [[false]]، و [[mapLimit]] على ٥ مهام كل واحدة 100ms بحد 2 بياخد حوالي 300ms والنتايج بترتيب المدخلات، و [[get]] على path مش موجود بيرجّع الـ fallback من غير error، و [[node --test --experimental-test-coverage]] بيقول فوق 90٪ سطور.`, ext: R`انشرها كـ package على npm (أو GitHub Packages) بـ README و types، وزوّد [[memoize]] و [[groupBy]] و [[retry]]، وقارن أداء [[deepClone]] بتاعك بـ [[structuredClone]] برقم.` },
        { lvl: 'فكرة', t: R`اشرحها لحد تاني`, what: R`اختار سؤال من الوحدة دي حسيت إنه صعب عليك، واعمله شرح بتاعك: بوست أو فيديو قصير أو صفحة HTML تفاعلية، فيه الإجابة اللي تتقال في الانترفيو، والكود، والحالات اللي بتوقع الناس.`, done: R`الشرح فيه كود حد يقدر ينسخه ويشغّله ويطلعله نفس الناتج اللي انت كاتبه، وفيه غلطة شائعة واحدة على الأقل وإزاي تكتشفها، وحد تاني قراه وفهمه من غير ما تشرح له جنبه.`, ext: R`اعمل سلسلة لكل أسئلة الوحدة، أو حوّلها لـ quiz تفاعلي، أو سجّل نفسك بتجاوب بالإنجليزي عشان الانترفيوهات الأجنبي.` },
      ],
      items: [
        {
          cmd: "null و undefined",
          title: "إيه الفرق بين null و undefined؟ (null vs undefined)",
          desc: R`الاتنين معناهم «مفيش قيمة»، والفرق مين اللي قال كده. [[undefined]] بتحطها JS لوحدها: متغير من غير قيمة، أو خاصية مش موجودة، أو argument متبعتش، أو دالة من غير return. [[null]] بيحطها المبرمج بقصد عشان يقول «فاضي». [[typeof null]] بيطلع "object" كغلطة تاريخية، و [[null == undefined]] true لكن بـ === لأ. في JSON الـ undefined بتختفي والـ null بتفضل، والـ default parameters بتشتغل مع undefined بس.`,
          example: R`let a;
const obj = {};
function f(x) { return x; }
a;                                // undefined: متعرّف من غير قيمة
obj.missing;                      // undefined: خاصية مش موجودة
f();                              // undefined: argument متبعتش
const user = { middleName: null }; // null: قلت «مفيش» بقصد
typeof null;                      // "object"
null == undefined;                // true
null === undefined;               // false
JSON.stringify({ a: undefined, b: null }); // '{"b":null}'`,
          try: R`اكتب [[isNil(v)]] بترجّع true لـ null و undefined بس، بطريقتين: [[v == null]] و [[v === null || v === undefined]].`,
          practice: [
            { lvl: 'سريع', t: R`اتوقع على ورقة وبعدين شغّل: [[typeof undefined]] و [[typeof null]] و [[null + 1]] و [[undefined + 1]] و [[[null, undefined].join("-")]].`, done: R`الناتج بالترتيب: [["undefined"]] و [["object"]] و 1 و [[NaN]] و [["-"]]، وتقدر تقول ليه [[null]] بقى 0 و [[undefined]] بقى [[NaN]] في الجمع، وليه [[join]] حطّهم نص فاضي.` },
            { lvl: 'تطبيق', t: R`refactor فيه باج: [[const opts = { port: config.port || 3000, retries: config.retries || 3, name: config.name || "app" };]]. اليوزر بعت [[{ retries: 0, name: "" }]] قاصد. صلّحه بـ [[??]] واكتب ٣ assertions تثبت التصليح.`, done: R`قبل التصليح [[opts.retries]] بيطلع 3 و [[opts.name]] بيطلع [["app"]] (الـ [[||]] بلع 0 و [[""]])، وبعده [[retries]] بـ 0 و [[name]] نص فاضي، و [[port]] لسه 3000 لما ميتبعتش، والـ assertions بتعدّي، وتقدر تقول إمتى [[||]] لسه هو الصح.` },
            { lvl: 'تحدي', t: R`مسألة: اكتب [[pickDefined(obj)]] بتشيل كل key قيمته [[undefined]] وتسيب [[null]]، جوه الـ objects المتداخلة كمان، والـ arrays بتفضل بنفس طولها. وبعدين قارن ناتجها بـ [[JSON.parse(JSON.stringify(obj))]].`, done: R`[[pickDefined({ a: undefined, b: null, c: { d: undefined, e: 0 } })]] بيرجّع [[{ b: null, c: { e: 0 } }]]، والأصل متغيرش، و [[Date]] بيفضل [[Date]] عندك لكن الـ JSON حوّله string، وتقدر تشرح ليه [[JSON.stringify([undefined])]] بيطلع [['[null]']] مش [['[]']].` },
          ],
          flag: "script",
          deep: {
            why: "سؤال افتتاحي في انترفيوهات كتير، بيختبر إنك فاهم إن القيمتين ليهم استخدامات مختلفة مش مجرد حاجة واحدة باسمين.",
            how: R`نقط تقولها لو اتسألت أكتر: [[??]] و [[?.]] بيعاملوا الاتنين زي بعض. و [[Number(null)]] بـ 0 و [[Number(undefined)]] بـ NaN. وفي APIs كتير null معناها «اتمسحت» (PATCH بـ null بيفضّي الحقل) و undefined معناها «متلمستش». وقواعد البيانات فيها NULL بس مفيهاش undefined، و Prisma بيفرّق بينهم بنفس المعنى ده.`,
            when: "«إمتى تستخدم null بنفسك؟» (لما تقصد تفضّي قيمة)، و «typeof null؟»، و «إزاي تفحص الاتنين مرة واحدة؟» (== null أو ??).",
            mistakes: R`«الاتنين زي بعض». و «undefined يعني المتغير مش متعرّف» (ده ReferenceError، حاجة تانية). وتحط undefined بإيدك كقيمة بدل null.`
          },
          teach: R`## الفكرة في سطر

الاتنين معناهم «مفيش قيمة». [[undefined]] JS هي اللي بتحطها لوحدها، و [[null]] انت اللي بتحطها بقصد. المثال بيوريك كل مكان بتطلع فيه كل واحدة، وإزاي بيتقارنوا.

شغّلت كل سطر جوه [[console.log]] في Node 24 (المثال نفسه مكتوب من غير console.log زي ما بتكتبه في Console المتصفح، وهناك بيطبع نفس القيم).

---

## ١. أماكن [[undefined]]

~~~text app.js
let a;
const obj = {};
function f(x) { return x; }
a;
obj.missing;
f();
~~~

~~~text الناتج
undefined
undefined
undefined
~~~

| السطر | ليه undefined |
|---|---|
| [[a]] | [[let a;]] اتعرّف من غير [[=]] |
| [[obj.missing]] | الـ object مفيهوش خاصية بالاسم ده |
| [[f()]] | الباراميتر [[x]] محدش بعتله قيمة، والدالة رجّعته |

ومكان رابع: دالة من غير [[return]] بترجّع [[undefined]].

> «undefined» مش «مش متعرّف». لو استخدمت اسم عمرك ما عرّفته، ده error تاني خالص:

~~~text الناتج (Node)
ReferenceError: notDeclared is not defined
~~~

---

## ٢. [[null]]: بإيدك

~~~text app.js
const user = { middleName: null };
~~~

~~~text الناتج
{ middleName: null }
~~~

يعني «اليوزر ده معندوش اسم وسطاني، وأنا عارف كده». الفرق عن إن الخاصية مش موجودة خالص: هنا الحقل موجود وقيمته «فاضي» بقصد.

---

## ٣. [[typeof null]]

~~~text app.js
typeof null;
~~~

~~~text الناتج
object
~~~

- [[typeof]]: بيرجّع اسم النوع كـ string.
- [[null]] مش object. ده bug من أول نسخة من JavaScript سنة 1995، ومحدش يقدر يصلّحه عشان مواقع قديمة بتعتمد عليه. و [[typeof undefined]] بيرجّع [["undefined"]] عادي.

يعني لو عايز تعرف حاجة object حقيقي: [[typeof x === "object" && x !== null]].

---

## ٤. المقارنة

~~~text app.js
null == undefined;
null === undefined;
~~~

~~~text الناتج
true
false
~~~

- [[==]] (loose equality): قاعدة خاصة في اللغة: [[null]] و [[undefined]] بيساووا بعض **وبس**، ومش بيساووا أي حاجة تانية. جربت: [[null == 0]] و [[undefined == 0]] و [[null == false]] كلهم [[false]].
- [[===]] (strict): لازم نفس النوع، وهما نوعين مختلفين.

---

## ٥. JSON

~~~text app.js
JSON.stringify({ a: undefined, b: null });
~~~

~~~text الناتج
{"b":null}
~~~

- [[JSON.stringify]]: بيحوّل الـ object لنص JSON.
- JSON مفيهوش [[undefined]] أصلًا، فالخاصية [[a]] اختفت. و [[null]] موجودة في JSON ففضلت.

ده مهم في الـ APIs: لو بعتت [[{ name: undefined }]] السيرفر مش هيشوف الحقل خالص، ولو بعتت [[{ name: null }]] هيشوفه وهيفضّيه.

---

## ٦. حاجات زيادة بتتسأل (جربتها)

~~~text app.js
function g(x = "default") { return x; }
console.log(g(undefined), g(null));
console.log(null ?? "x", undefined ?? "x", 0 ?? "x");
console.log(Number(null), Number(undefined));
~~~

~~~text الناتج
default null
x x 0
0 NaN
~~~

- الـ default parameter بيشتغل مع [[undefined]] بس. [[null]] قيمة اتبعتت فعلًا.
- [[??]] بيعامل الاتنين زي بعض، ومش بيلمس [[0]].
- [[Number(null)]] بـ 0 و [[Number(undefined)]] بـ [[NaN]] (Not a Number).

---

## ٧. الـ solCode: [[isNil]]

~~~text app.js
const isNil = (v) => v == null;
const isNilStrict = (v) => v === null || v === undefined;
for (const v of [null, undefined, 0, "", false, NaN, []]) {
  console.log(v, isNil(v), isNilStrict(v));
}
~~~

- [[v == null]]: بسبب قاعدة [[==]] اللي فوق، دي true لـ [[null]] و [[undefined]] بس.
- [[v === null || v === undefined]]: نفس الكلام مكتوب صريح. [[||]] يعني «أو».
- [[for (const v of [...])]]: لف على كل قيمة في الـ array.

~~~text الناتج (Node 24)
null true true
undefined true true
0 false false
 false false
false false false
NaN false false
[] false false
~~~

السطر اللي شكله فاضي في الأول ده الـ string الفاضي [[""]]: Node بيطبعه من غير علامات. الطريقتين متطابقتين، وكل القيم «الـ falsy» التانية (0 و "" و false و NaN) طلعت false، عكس [[!v]] اللي كان هيرجّع true ليهم.

---

## الخلاصة

| | [[undefined]] | [[null]] |
|---|---|---|
| مين بيحطها | اللغة | انت بقصد |
| [[typeof]] | [["undefined"]] | [["object"]] (غلطة قديمة) |
| في JSON | بتختفي | بتفضل |
| default parameter | بيشتغل | لأ |
| [[Number(...)]] | NaN | 0 |

- [[null == undefined]] true، و [[===]] false.
- [[v == null]] هي الطريقة المختصرة تفحص الاتنين، والوحيدة اللي [[==]] فيها مقبولة.`,
          lines: [
            R`بيعرّف متغير من غير ما يدّيله قيمة، فـ JavaScript بتحط فيه [[undefined]] لوحدها. ده ينفع مع [[let]] و [[var]] بس، أما [[const]] فلازم تدّيها قيمة في نفس السطر.`,
            R`object فاضي مفيهوش أي خاصية، هنستخدمه عشان نشوف إيه اللي بيرجع لما تقرا خاصية مش موجودة.`,
            R`دالة بترجّع الباراميتر زي ما هو، عشان نشوف قيمة باراميتر محدش بعتله argument.`,
            R`[[a]] متعرّف بس محدش حط فيه قيمة، فقيمته [[undefined]]. ده غير متغير مش متعرّف خالص: ده بيرمي [[ReferenceError]].`,
            R`قراية خاصية مش موجودة بترجّع [[undefined]] من غير error. بس لو كمّلت خطوة كمان زي [[obj.missing.x]] هيرمي [[TypeError]]، وعشان كده اتعملت [[?.]].`,
            R`ناديت الدالة من غير argument، فالباراميتر [[x]] بقى [[undefined]]. JavaScript مبتشتكيش لو بعتّ arguments أقل من المطلوب، وده سبب إن الـ default parameters زي [[x = 0]] مهمة.`,
            R`[[null]] عمره ما بييجي لوحده: لازم حد يكتبه بإيده. فمعناه «فاضي بقصد»: اليوزر ده معندوش اسم وسطاني، مش إننا نسينا نحط الخاصية.`,
            R`[[typeof null]] بيرجّع [["object"]]، وده bug من أول نسخة في JavaScript ومينفعش يتصلّح عشان مواقع كتير بتعتمد عليه. فلو بتفحص «ده object؟» لازم تفحص [[x !== null]] كمان.`,
            R`[[==]] (المقارنة السايبة) بتعتبر [[null]] و [[undefined]] متساويين، ومبيساووش أي حاجة تانية زي [[0]] أو [[false]]. عشان كده [[x == null]] اختصار مقبول لـ «x فاضي بأي شكل من الاتنين».`,
            R`[[===]] (المقارنة الصارمة) بتفحص النوع كمان، والاتنين نوعين مختلفين فالناتج [[false]]. استخدمها لما الفرق بين «مش موجود» و«فاضي بقصد» يفرق معاك.`,
            R`[[JSON.stringify]] بيشيل أي خاصية قيمتها [[undefined]] كأنها مش موجودة، وبيسيب [[null]]. فلو عايز تقول للـ API «امسح القيمة دي» ابعت [[null]]، لأن [[undefined]] مش هيوصل خالص.`,
          ],
          sol: R`الطريقتين بيرجّعوا true لـ null و undefined بس، و false لـ [[0]] و [[""]] و [[false]] و [[NaN]] و [[[]]]. ده الاستثناء الوحيد اللي [[==]] فيه مقبولة في الكود المحترف: [[v == null]] بتساوي null و undefined بس، ومش بتحوّل أي حاجة تانية. ESLint بيسمح بيها بإعداد [[eqeqeq: ["error", "always", { null: "ignore" }]]].

الغلطة الشائعة إنك تكتب [[!v]] بدالها: دي بترجّع true لـ 0 و "" كمان، فحقل قيمته 0 هيتعامل كأنه مش موجود. وفي الانترفيو قول الفرق في جملة: undefined يعني «لسه مفيش قيمة» (اللغة اللي حطّاها)، و null يعني «مفيش قيمة بقصد» (انت اللي حاططها).`,
          solCode: R`const isNil = (v) => v == null;
const isNilStrict = (v) => v === null || v === undefined;
for (const v of [null, undefined, 0, "", false, NaN, []]) {
  console.log(v, isNil(v), isNilStrict(v));
}
// null true true / undefined true true / والباقي false false`
        },
        {
          cmd: "Promise.all بإيدك",
          title: "اكتب Promise.all بنفسك (implement Promise.all)",
          desc: R`بترجّع Promise جديد. بلف على العناصر، وكل واحد بحوّله Promise بـ [[Promise.resolve]] (عشان القيم العادية تشتغل). لما واحد ينجح بحط قيمته في نفس الـ index مش بـ push، عشان الترتيب يفضل زي المدخلات مهما مين خلص الأول، وبعد عدّاد. لما العدّاد يوصل للطول أعمل resolve. وأول rejection أعمل reject على طول. والـ array الفاضية ترجع [[[]]] فورًا.`,
          example: R`function promiseAll(items) {
  return new Promise((resolve, reject) => {
    const list = Array.from(items);
    const results = new Array(list.length);
    let done = 0;
    if (list.length === 0) return resolve(results);
    list.forEach((item, i) => {
      Promise.resolve(item).then((value) => {
        results[i] = value;
        done++;
        if (done === list.length) resolve(results);
      }, reject);
    });
  });
}
const slow = new Promise((r) => setTimeout(() => r("slow"), 100));
promiseAll([slow, 2, Promise.resolve(3)]).then(console.log); // ["slow", 2, 3]`,
          try: R`اكتب [[promiseAllSettled]] بنفس الطريقة، وبعدين [[promiseRace]] (أسهل بكتير: كل واحد بيعمل resolve أو reject مباشرة). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[promiseAllSettled]] و [[promiseRace]] (الاختبارات بـ promises جاهزة من غير timers).`,
          practice: [
            { lvl: 'سريع', t: R`اتوقع بصوتك وبعدين شغّل: [[Promise.all([])]] و [[Promise.all([1, Promise.reject(new Error("x")), 3])]] و [[Promise.all(5)]].`, done: R`الأول بيتحل بـ array فاضية، والتاني بيترفض بالـ error اللي رسالته [["x"]]، والتالت بيترفض بـ [[TypeError]] لأن 5 مش iterable، وتقدر تقول إن الـ promises التانية في التاني بتكمّل شغلها عادي (مفيش إلغاء).` },
            { lvl: 'تطبيق', t: R`مسألة: اكتب [[promiseAny(items)]]: أول واحد ينجح بيكسب، ولو كلهم فشلوا ترفض بـ [[new AggregateError(errors, "All promises were rejected")]] والأخطاء بترتيب المدخلات مش بترتيب الفشل.`, done: R`[[promiseAny([Promise.reject(1), Promise.resolve(2)])]] بيتحل بـ 2، ولو الاتنين مرفوضين بـ 1 و 2 الـ error [[instanceof AggregateError]] و [[errors]] فيها 1 و 2 بالترتيب ده، و [[promiseAny([])]] بيترفض بـ [[AggregateError]] على طول، وده نفس اللي [[Promise.any]] الأصلي بيعمله.` },
            { lvl: 'تحدي', t: R`محاكاة pool: اكتب [[mapLimit(items, limit, fn)]]: زي Promise.all بس مفيش أكتر من [[limit]] شغالين في نفس الوقت، والنتايج بترتيب المدخلات. جرّبه على ٥ مهام كل واحدة [[setTimeout]] بـ 100ms و [[limit]] بـ 2، وعدّاد بيقيس أكبر عدد شغال مع بعض.`, done: R`النتايج بنفس ترتيب المدخلات، والعدّاد أكبر قيمة وصلها 2، والوقت الكلي حوالي 300ms (٣ دفعات) مش 100 ولا 500، و [[mapLimit([], 2, fn)]] بيرجّع array فاضية من غير ما يعلّق، ومهمة بترمي error بترفض الكل زي Promise.all.` },
          ],
          flag: "script",
          deep: {
            why: "بيختبر فهمك للـ Promises مش حفظ الـ API: الترتيب، والعدّاد، و fail-fast، والقيم اللي مش Promises، والحالة الفاضية.",
            how: R`نقط تقولها: [[results.push]] غلط لأن الترتيب هيبقى حسب مين خلص الأول. و [[results.length]] مينفعش كعدّاد لأن [[results[2] = x]] بتخلي الطول 3 وأول عنصرين لسه فاضيين. والـ reject بعد أول مرة ملهوش تأثير لأن الـ Promise مبيتغيرش بعد ما يخلص. والباقي مبيتلغيش. ومع Array.from بيقبل أي iterable زي الأصلي.`,
            when: "«اكتب allSettled»، و «اعمل concurrency limit: شغّل n بس في نفس الوقت» (السؤال الأصعب والأشهر للـ senior)، و «retry مع exponential backoff».",
            mistakes: R`push بدل index. ونسيان الـ array الفاضية (هتفضل pending للأبد). ونسيان [[Promise.resolve]] للقيم العادية.`
          },
          teach: R`## الفكرة في سطر

[[promiseAll]] بتاخد ليستة (Promises أو قيم عادية) وبترجّع Promise واحد: بيخلص لما **كلهم** يخلصوا، بالنتايج بنفس ترتيب الليستة، وبيترفض أول ما **أي واحد** يترفض.

شغّلت المثال في Node 24، وضفت [[console.log]] جوه الـ [[then]] عشان نشوف مين خلص إمتى.

---

## ١. الهيكل: Promise جديد

~~~text app.js
function promiseAll(items) {
  return new Promise((resolve, reject) => {
    ...
  });
}
~~~

- [[new Promise((resolve, reject) => {...})]]: بتعمل Promise بإيدك. الدالة اللي جوه بتتنفذ فورًا، وبتاخد زرارين: [[resolve(value)]] (خلص بنجاح بالقيمة دي) و [[reject(error)]] (فشل).
- الـ Promise بيتحسم **مرة واحدة بس**. أي [[resolve]] أو [[reject]] بعد كده بيتجاهل. دي حاجة هنعتمد عليها.

---

## ٢. التحضير

~~~text app.js
const list = Array.from(items);
const results = new Array(list.length);
let done = 0;
if (list.length === 0) return resolve(results);
~~~

- [[Array.from(items)]]: حوّل أي iterable لـ array. كده الدالة بتقبل Set مثلًا زي [[Promise.all]] الحقيقية. جربت [[Array.from("abc")]] طلعت [[[ 'a', 'b', 'c' ]]].
- [[new Array(3)]]: array طولها 3 بس فاضية. Node بيطبعها [[[ <3 empty items> ]]].
- [[done]]: عدّاد اللي خلصوا. [[let]] عشان هيتغير.
- الحالة الفاضية: لو مفيش عناصر، مفيش [[then]] هيتنادى عشان يعمل [[resolve]]، فالـ Promise كان هيفضل pending للأبد. فبنخلص فورًا بـ [[[]]].

---

## ٣. اللفة

~~~text app.js
list.forEach((item, i) => {
  Promise.resolve(item).then((value) => {
    results[i] = value;
    done++;
    if (done === list.length) resolve(results);
  }, reject);
});
~~~

### [[Promise.resolve(item)]]

لو [[item]] Promise بيرجّعه زي ما هو، ولو قيمة عادية زي [[2]] بيلفها في Promise خلص بيها. من غيره، [[(2).then]] مش موجودة:

~~~text الناتج (Node)
x.then is not a function
~~~

### [[.then(onSuccess, reject)]]

[[then]] بتاخد دالتين: الأولى لما ينجح، والتانية لما يفشل. التانية هنا [[reject]] نفسها، يعني أول عنصر يفشل بيرفض الـ Promise الكبير على طول.

### جوه الـ onSuccess

1. [[results[i] = value]]: حط النتيجة في **مكانها** حسب الـ index، مش [[push]].
2. [[done++]]: زوّد العدّاد.
3. لو العدّاد وصل لعدد العناصر، خلصنا: [[resolve(results)]].

ليه عدّاد ومش [[results.length]]؟ جربت:

~~~text app.js
const r = []; r[2] = "x"; console.log(r.length, r);
~~~

~~~text الناتج
3 [ <2 empty items>, 'x' ]
~~~

حطيت عنصر واحد والطول بقى 3. فالطول ميقولش كام واحد خلص فعلًا.

---

## ٤. التشغيل

~~~text app.js
const slow = new Promise((r) => setTimeout(() => r("slow"), 100));
promiseAll([slow, 2, Promise.resolve(3)]).then(console.log);
~~~

- [[slow]]: Promise بيخلص بعد 100 millisecond بقيمة [["slow"]].
- [[2]]: قيمة عادية.
- [[Promise.resolve(3)]]: Promise خلص خلاص.

~~~text الناتج (مع الـ console.log اللي ضفته)
  خلص index 1 بقيمة 2 ← done=1 [ <1 empty item>, 2, <1 empty item> ]
  خلص index 2 بقيمة 3 ← done=2 [ <1 empty item>, 2, 3 ]
  خلص index 0 بقيمة "slow" ← done=3 [ 'slow', 2, 3 ]
[ 'slow', 2, 3 ] (بعد ~100ms)
~~~

- [[2]] و [[3]] خلصوا الأول (في الـ microtasks على طول)، و [["slow"]] بعد 100ms.
- مع كده الناتج [[[ 'slow', 2, 3 ]]] بنفس ترتيب المدخلات، بفضل [[results[i]]]. لو كان [[push]] كان هيطلع [[[2, 3, "slow"]]].

### حالات تانية جربتها

~~~text الناتج
empty: []
rejected: boom 30ms
Set: [ 1, 2 ]
~~~

- [[promiseAll([])]] خلصت فورًا بـ [[[]]].
- [[promiseAll([slow2(), boom])]] حيث [[slow2]] بياخد 200ms و [[boom]] بيترفض بعد 20ms: اترفضت بعد حوالي 20 إلى 30ms (التوقيت مش دقيق بالظبط)، من غير ما تستنى الـ 200ms. ده fail-fast.
- بس [[slow2]] نفسه **ماتلغاش**: بعدها بشوية لسه اشتغل وخلص (الـ log بتاعه ظهر في الآخر). Promise.all مبتلغيش الباقي.
- [[new Set([1, 2])]] اشتغلت بسبب [[Array.from]].

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[new Promise]] | نرجّع Promise واحد نتحكم إمتى يخلص |
| [[Array.from]] | يقبل أي iterable ونعرف الطول |
| [[if (length === 0)]] | وإلا pending للأبد |
| [[Promise.resolve(item)]] | القيم العادية تشتغل |
| [[results[i]]] | الترتيب زي المدخلات |
| عدّاد [[done]] | الطول مش بيعد اللي خلصوا |
| [[reject]] كتاني argument لـ [[then]] | أول فشل يرفض الكل |

> في التمرين اللي تحت هتكتب [[promiseAllSettled]] و [[promiseRace]]. فكّر: إيه اللي لازم يتغير في الـ onSuccess والـ onFailure عشان الفشل ميوقفش كل حاجة؟ وفي race، محتاج عدّاد أصلًا؟`,
          lines: [
            R`[[promiseAll]] بتاخد أي iterable (array أو Set أو generator) فيه Promises أو قيم عادية، زي [[Promise.all]] الأصلية بالظبط.`,
            R`بترجّع Promise جديد واحد بيمثّل «كلهم». الـ executor بياخد [[resolve]] و [[reject]]، واحنا اللي هنقرر إمتى نناديهم: [[resolve]] لما الكل يخلص، و [[reject]] مع أول فشل.`,
            R`[[Array.from]] بيحوّل الـ iterable لـ array عادية. محتاجينها عشان نعرف الطول من الأول، ولأن generator مثلًا ينفع يتلف عليه مرة واحدة بس.`,
            R`array فاضية بنفس عدد العناصر. هنحط كل نتيجة في الـ index بتاعها، فالترتيب يفضل زي المدخلات حتى لو التاني خلص قبل الأول.`,
            R`عدّاد للي خلصوا. مينفعش نستخدم [[results.length]] بداله لأنه ثابت من الأول، ومينفعش نعتمد على «آخر واحد خلص» لأن ترتيب الخلصان مش مضمون.`,
            R`لو الليستة فاضية مفيش [[then]] هيتنادى أصلًا عشان يعمل resolve، فالـ Promise هيفضل pending للأبد. فبنعمل resolve بـ array فاضية على طول، زي [[Promise.all]] الأصلية لما تدّيها array فاضية.`,
            R`بنلف على كل عنصر ومعاه الـ index بتاعه [[i]]، وبنعلّق handler على كل واحد في نفس اللحظة من غير ما نستنى اللي قبله. ده اللي بيخلي [[Promise.all]] أسرع من [[await]] واحد ورا التاني.`,
            R`[[Promise.resolve(item)]] بتلف أي قيمة في Promise: لو كانت Promise بترجّعها زي ما هي، ولو رقم زي [[2]] بتعمل Promise خلص بيه. كده بنعامل الاتنين بنفس الكود، ومن غيرها [[then]] على رقم هيرمي TypeError.`,
            R`بنحط النتيجة في نفس الـ index بتاع العنصر، مش [[push]]. لو استخدمنا [[push]] الترتيب هيبقى حسب مين خلص الأول، مش حسب المدخلات.`,
            R`واحد كمان خلص. العدّاد ده هو الطريقة الوحيدة نعرف بيها إن الكل وصل، لأن كل [[then]] بيشتغل لوحده في وقت مختلف.`,
            R`لو ده آخر واحد، نعمل resolve بالـ array كلها. السطر ده بيتنفذ جوه آخر Promise يخلص، أيًّا كان مكانه في الليستة.`,
            R`[[reject]] متبعتة كتاني argument لـ [[then]]، فأول عنصر يفشل بيعمل reject للـ Promise الكبير بالـ error بتاعه. وأي resolve أو reject بعد كده بيتجاهل، لأن الـ Promise مبيتغيرش بعد ما يخلص.`,
            R`نهاية الـ [[forEach]].`,
            R`نهاية الـ executor بتاع [[new Promise]].`,
            R`نهاية [[promiseAll]].`,
            R`Promise بيخلص بعد ١٠٠ms بالقيمة [["slow"]]. حطيناه الأول في الليستة عشان نثبت إن الترتيب مش حسب مين خلص الأول.`,
            R`جرّبناها بخليط: Promise بطيء، ورقم عادي، و Promise خلص على طول. الناتج [["slow"]] ثم [[2]] ثم [[3]] بنفس ترتيب المدخلات مع إن [[slow]] خلص الأخير، وده بفضل إننا حطينا كل نتيجة في الـ index بتاعها.`,
          ],
          sol: R`[[promiseAllSettled([slow, 2, Promise.reject(new Error("x"))])]] لازم ترجّع بعد 100ms: [[{ status: "fulfilled", value: "slow" }]] و [[{ status: "fulfilled", value: 2 }]] و [[{ status: "rejected", reason: Error: x }]] بنفس الترتيب، ومبتترفضش أبدًا. الفرق عن promiseAll إن الـ reject handler بيسجّل النتيجة بدل ما يرفض.

[[promiseRace]] بتلف على كل واحد وتعمل [[Promise.resolve(item).then(resolve, reject)]]: أول واحد يخلص بيحدد النتيجة، والباقي نداءاتهم على resolve أو reject بتتجاهل لأن الـ promise متحسمة. والحالة اللي بتتسأل: [[promiseRace([])]] بتفضل pending للأبد، زي [[Promise.race([])]] الحقيقية. والغلطة الشائعة إنك تنسى [[Promise.resolve(item)]] فالقيم العادية زي 2 تطلع [[item.then is not a function]].`,
          solCode: R`function promiseAllSettled(items) {
  return new Promise((resolve) => {
    const list = Array.from(items);
    const results = new Array(list.length);
    let done = 0;
    if (list.length === 0) return resolve(results);
    list.forEach((item, i) => {
      Promise.resolve(item)
        .then(
          (value) => { results[i] = { status: "fulfilled", value }; },
          (reason) => { results[i] = { status: "rejected", reason }; }
        )
        .then(() => { if (++done === list.length) resolve(results); });
    });
  });
}
function promiseRace(items) {
  return new Promise((resolve, reject) => {
    for (const item of items) Promise.resolve(item).then(resolve, reject);
  });
}
const slow = new Promise((r) => setTimeout(() => r("slow"), 100));
const fast = new Promise((r) => setTimeout(() => r("fast"), 10));
promiseAllSettled([slow, 2, Promise.reject(new Error("x"))]).then(console.log);
promiseRace([slow, fast]).then((v) => console.log("race:", v)); // race: fast`,
          check: {
            lang: "js",
            starter: R`function promiseAllSettled(items) {
  return Promise.all(items);
}
function promiseRace(items) {
  return new Promise((resolve, reject) => {
    // كل واحد: Promise.resolve(item).then(resolve, reject)
  });
}`,
            tests: R`const later = (v, steps = 5) => { let p = Promise.resolve(v); for (let i = 0; i < steps; i++) p = p.then(x => x); return p; };
const within = p => Promise.race([p, later("لسه pending", 60)]);
const rejected = msg => { const p = Promise.reject(new Error(msg)); p.catch(() => {}); return p; };
test("fulfilled و rejected وقيمة عادية، بنفس الترتيب ومبترفضش", async () => {
  const r = await within(promiseAllSettled([later("slow"), 2, rejected("x")]));
  expect([r[0], r[1], r[2].status, r[2].reason.message]).toEqual([{ status: "fulfilled", value: "slow" }, { status: "fulfilled", value: 2 }, "rejected", "x"]);
});
test("الترتيب حسب الـ input مش حسب مين خلص الأول", async () => {
  const r = await within(promiseAllSettled([later("a", 10), "b"]));
  expect(r.map(x => x.value)).toEqual(["a", "b"]);
});
test("[] ← []", async () => expect(await within(promiseAllSettled([]))).toEqual([]));
test("promiseRace: الأسرع يكسب", async () => expect(await within(promiseRace([later("slow", 10), later("fast", 1)]))).toBe("fast"));
test("promiseRace: لو الأسرع اترفض، بترفض", async () => {
  let msg = "";
  try { await within(promiseRace([later("slow", 10), rejected("fail")])); } catch (e) { msg = e.message; }
  expect(msg).toBe("fail");
});
test("promiseRace([]) بتفضل pending للأبد، زي Promise.race([])", async () => {
  const r = await Promise.race([promiseRace([]).then(() => "resolved"), later("still pending", 20)]);
  expect(r).toBe("still pending");
});`,
            solution: R`function promiseAllSettled(items) {
  return new Promise((resolve) => {
    const list = Array.from(items);
    const results = new Array(list.length);
    let done = 0;
    if (list.length === 0) return resolve(results);
    list.forEach((item, i) => {
      Promise.resolve(item)
        .then(
          (value) => { results[i] = { status: "fulfilled", value }; },
          (reason) => { results[i] = { status: "rejected", reason }; }
        )
        .then(() => { if (++done === list.length) resolve(results); });
    });
  });
}
function promiseRace(items) {
  return new Promise((resolve, reject) => {
    for (const item of items) Promise.resolve(item).then(resolve, reject);
  });
}`
          }
        },
        {
          cmd: "polyfills: map و bind",
          title: "اكتب map و bind بنفسك (polyfill)",
          desc: R`الـ polyfill كود بيعمل feature موجودة في اللغة، عشان يشتغل في بيئات قديمة، وفي الانترفيو عشان يشوفوا فاهم الـ feature من جوه. [[map]]: بلف على [[this]] (الـ array)، وبنادي الـ callback بـ (العنصر، الـ index، الـ array)، وبحط الناتج في array جديدة بنفس الطول، وبتخطى الأماكن الفاضية (holes). [[bind]]: بحفظ الدالة الأصلية ([[this]])، وبرجّع دالة جديدة بتناديها بـ [[apply]] على الـ context اللي اتحدد، مع الـ arguments المتثبتة الأول والجديدة بعدها.`,
          example: R`Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
  const result = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) result[i] = callback.call(thisArg, this[i], i, this);
  }
  return result;
};
Function.prototype.myBind = function (ctx, ...preset) {
  const fn = this;
  return function (...args) {
    return fn.apply(ctx, [...preset, ...args]);
  };
};
[1, 2, 3].myMap((x) => x * 2);                    // [2, 4, 6]
const hi = function (greet) { return greet + " " + this.name; };
hi.myBind({ name: "Sara" }, "Hi")();              // "Hi Sara"`,
          try: R`اكتب [[myFilter]] و [[myReduce]] (خد بالك من حالة من غير قيمة أولية على array فاضية: لازم TypeError). وبعدين خلي [[myBind]] تشتغل مع [[new]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[myFilter]] و [[myReduce]] و [[myBind]] اللي بتشتغل مع [[new]].`,
          practice: [
            { lvl: 'سريع', t: R`اتوقع على ورقة: إيه اللي Node هيطبعه لـ [[[1, , 3].map((x) => x * 2)]]؟ والـ callback هيتنادى كام مرة؟ وبعدين شغّله بـ [[map]] وبـ [[myMap]] بتاع الدرس.`, done: R`Node بيطبع [[2, <1 empty item>, 6]] جوه أقواس، والاتنين نفس الناتج و [[length]] بتاعهم 3، والـ callback اتنادى مرتين بس (الـ hole بيتعدّى).` },
            { lvl: 'تطبيق', t: R`مسألة: اكتب [[myCall(ctx, ...args)]] من غير [[call]] ولا [[apply]] ولا [[bind]]: حط الدالة على [[ctx]] تحت key من نوع [[Symbol()]]، وناديها، وامسحها في [[finally]].`, done: R`[[greet.myCall({ name: "Sara" }, "Hi")]] بيرجّع [["Hi Sara"]]، وبعدها [[Object.getOwnPropertySymbols(ctx).length]] بيرجّع 0 (مفيش أثر)، ولو الدالة رمت error الـ symbol برضه بيتمسح، و [[ctx]] اللي فيه key اسمه [[fn]] أصلًا مبيتبوّظش.` },
            { lvl: 'تحدي', t: R`اكتب اختبار: زميلك كتب [[myMap]] من غير [[if (i in this)]] ومن غير [[thisArg]]. اكتب بـ [[node:test]] تستات تمسك الغلطتين دول وحاجة تالتة من عندك، من غير ما تقرا الكود بتاعه، وشغّلها على نسخته وعلى نسخة الدرس.`, done: R`على نسخة الدرس كل التستات بتعدّي، وعلى نسخة زميلك على الأقل تستين بيقعوا: واحد بيعدّ نداءات الـ callback على [[[1, , 3]]] (المفروض 2)، وواحد بيتأكد إن [[this]] جوه callback عادي ([[function]] مش arrow) هو الـ [[thisArg]].` },
          ],
          flag: "script",
          deep: {
            why: "بيختبر this، و prototypes، و call و apply، والـ closures في سؤال واحد. و map و reduce و bind و debounce و Promise.all هم أشهر ٥ polyfills بتتسأل.",
            how: R`نقط تقولها: [[function]] مش arrow عشان this تبقى الـ array أو الدالة. و [[i in this]] عشان الـ sparse arrays ([[[1, , 3]]]): الـ map الأصلية بتسيب الـ holes فاضية. و thisArg التاني لـ map. والـ bind الحقيقية لما تتنادي بـ new بتتجاهل ctx، والنسخة الكاملة بتفحص [[new.target]]. وقول إنك في كود حقيقي مش هتعدّل الـ prototypes المدمجة، ده للانترفيو بس.`,
            when: "«اكتب reduce»، و «اكتب call من غير call» (حط الدالة كخاصية مؤقتة على الـ object ونادي)، و «اكتب flat بـ recursion».",
            mistakes: R`arrow function للـ polyfill فـ this تضيع. ونسيان الـ index والـ array في الـ callback. وتعدّل الـ prototype في كود إنتاج.`
          },
          teach: R`## الفكرة في سطر

بنكتب [[myMap]] بتعمل اللي [[map]] بتعمله، و [[myBind]] بتعمل اللي [[bind]] بتعمله، وبنحطهم على الـ prototype عشان كل array وكل دالة تقدر تناديهم. المفتاح في الاتنين هو [[this]].

شغّلت المثال في Node 24، وضفت تجارب تانية تحت.

---

## ١. [[myMap]]

~~~text app.js
Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
  const result = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) result[i] = callback.call(thisArg, this[i], i, this);
  }
  return result;
};
~~~

### [[Array.prototype.myMap = function ...]]

- [[Array.prototype]]: الـ object اللي كل الـ arrays بتورث منه. أي method تتحط عليه تبقى متاحة لـ [[[1, 2, 3].myMap(...)]].
- [[function]] مش arrow: لما تنادي [[arr.myMap()]]، [[this]] جوه الدالة بيبقى [[arr]]. الـ arrow معندهاش [[this]] بتاعها، بتاخده من المكان اللي اتكتبت فيه. جربت arrow على الـ prototype في ملف CommonJS:

~~~text الناتج (Node)
undefined
~~~

[[this.length]] طلع [[undefined]] لأن [[this]] بقى [[module.exports]] (object فاضي)، مش الـ array.

### فحص الـ callback

[[typeof callback !== "function"]]: لو حد بعت حاجة مش دالة ارمي [[TypeError]] زي الأصلية:

~~~text الناتج
TypeError: 5 is not a function
TypeError: number 5 is not a function
~~~

الأول من [[myMap(5)]] والتاني من [[map(5)]] الأصلية. نفس النوع، والرسالة قريبة.

### اللفة

- [[new Array(this.length)]]: array جديدة بنفس الطول (map مبتغيّرش الأصلية).
- [[i in this]]: [[in]] بيسأل «فيه عنصر في الـ index ده أصلًا؟». في [[[1, , 3]]] (sparse array، فيها خانة فاضية) [[1 in arr]] بـ false و [[0 in arr]] بـ true.
- [[callback.call(thisArg, this[i], i, this)]]: نادي الـ callback، و [[call]] أول argument فيها هو الـ [[this]] جوه الـ callback، والباقي arguments عادية: العنصر، والـ index، والـ array كلها.

~~~text الناتج
[ 2, 4, 6 ]
[ 10, <1 empty item>, 30 ] [ 10, <1 empty item>, 30 ]
[ '>a02', '>b12' ]
~~~

- [[[1, 2, 3].myMap((x) => x * 2)]] = [[[2, 4, 6]]].
- الخانة الفاضية فضلت فاضية في [[myMap]] وفي [[map]] الأصلية بالظبط.
- الأخير: [[["a","b"].myMap(function (v, i, arr) { return this.p + v + i + arr.length; }, { p: ">" })]]: [[this.p]] جه من [[thisArg]]، و [[i]] و [[arr.length]] اتبعتوا صح.

---

## ٢. [[myBind]]

~~~text app.js
Function.prototype.myBind = function (ctx, ...preset) {
  const fn = this;
  return function (...args) {
    return fn.apply(ctx, [...preset, ...args]);
  };
};
~~~

- [[Function.prototype]]: كل الدوال بتورث منه، فـ [[hi.myBind(...)]] تشتغل.
- [[(ctx, ...preset)]]: أول argument هو الـ [[this]] اللي عايزينه، و [[...preset]] (rest) بيلم أي arguments بعده في array.
- [[const fn = this]]: [[this]] هنا هي الدالة اللي اتنادت عليها [[myBind]] ([[hi]]). بنحفظها في متغير لأن الدالة اللي جوه ليها [[this]] بتاعها.
- [[return function (...args)]]: بنرجّع دالة جديدة. لما تتنادى بعدين، بتلم الـ arguments الجديدة في [[args]].
- [[fn.apply(ctx, [...])]]: [[apply]] زي [[call]] بس الـ arguments بتتبعت array. [[[...preset, ...args]]] يعني المتثبتين الأول وبعدين الجداد.
- الدالة الجديدة فاكرة [[fn]] و [[ctx]] و [[preset]] بعد ما [[myBind]] خلصت: ده closure.

### التشغيل

~~~text app.js
const hi = function (greet) { return greet + " " + this.name; };
hi.myBind({ name: "Sara" }, "Hi")();
~~~

~~~text الناتج
Hi Sara
~~~

[[myBind({ name: "Sara" }, "Hi")]] رجّعت دالة، و [[()]] اللي بعدها نادتها من غير arguments. جوه: [[fn.apply({ name: "Sara" }, ["Hi"])]].

### مقارنة بـ [[call]] و [[apply]] ومن غير حاجة

~~~text الناتج
Yo Mona Ahlan Omar
x undefined
TypeError: Cannot read properties of undefined (reading 'name')
~~~

- [[hi.call({ name: "Mona" }, "Yo")]] و [[hi.apply({ name: "Omar" }, ["Ahlan"])]]: بينادوا فورًا. [[bind]] بترجّع دالة تتنادى بعدين.
- [[hi("x")]] من غير أي حاجة في ملف CommonJS عادي: [[this]] بقى الـ global object، ومفيهوش [[name]]، فطلع [[x undefined]].
- نفس السطر في ES module (strict mode): [[this]] بقى [[undefined]] فوقع بالـ TypeError.

وتثبيت جزء من الـ arguments:

~~~text app.js
const add = function (a, b, c) { return a + b + c; };
add.myBind(null, 1)(2, 3);
add.myBind(null, 1, 2)(3);
~~~

~~~text الناتج
6 6
~~~

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[function]] مش arrow | [[this]] يبقى الـ array أو الدالة |
| [[i in this]] | الخانات الفاضية تفضل فاضية |
| [[callback.call(thisArg, el, i, arr)]] | نفس arguments الأصلية |
| [[const fn = this]] | نحفظ الدالة قبل ما ندخل دالة جديدة |
| [[...preset]] و [[...args]] | المتثبتين الأول وبعدين الجداد |
| [[fn.apply(ctx, [...])]] | نادي بالـ this اللي اخترناه |

> في التمرين اللي تحت: [[myFilter]] قريبة جدًا من [[myMap]] (فكّر: إمتى تحط العنصر؟). و [[myReduce]] محتاجة تفرّق بين «مفيش قيمة أولية» و «القيمة الأولية undefined»: افتكر إن [[...init]] array، وطولها بيقولك اتبعت كام. و [[new]] مع [[myBind]]: ابحث عن [[new.target]].`,
          lines: [
            R`بنضيف method اسمها [[myMap]] على [[Array.prototype]]، فكل array في البرنامج تقدر تناديها. ولازم [[function]] مش arrow: الـ arrow مالهاش [[this]] بتاعها، فمش هتعرف الـ array اللي اتنادت عليها. في كود حقيقي متعدّلش prototypes الجاهزة، دي للتعلّم والانترفيو.`,
            R`لو الـ callback مش دالة بنرمي [[TypeError]] زي [[map]] الأصلية بالظبط. من غير الفحص ده الـ error هيطلع من جوه اللفة برسالة أقل وضوحًا، أو مش هيطلع خالص لو الـ array فاضية.`,
            R`array جديدة بنفس الطول، فاضية من جوه. [[map]] عمرها ما بتعدّل الأصلية، دايمًا بترجّع واحدة جديدة.`,
            R`لفة عادية على الـ indexes من 0 لآخر الـ array. و [[this]] هنا هي الـ array اللي ناديت عليها [[myMap]].`,
            R`[[i in this]] بيفحص إن الخانة دي فيها عنصر فعلًا، فالخانات الفاضية (زي اللي في [[new Array(3)]]) بتتخطى وتفضل فاضية في الناتج زي الأصلية. و [[callback.call(thisArg, ...)]] بتنادي الدالة بالـ [[this]] اللي اليوزر اختاره، وبنفس التلات arguments: العنصر والـ index والـ array كلها.`,
            R`نهاية الـ [[for]].`,
            R`بترجّع الـ array الجديدة والأصلية زي ما هي، وده اللي بيخلي [[map]] آمنة في الـ chaining.`,
            R`نهاية [[myMap]].`,
            R`نفس الفكرة على [[Function.prototype]]: كل دالة هيبقى عندها [[myBind]]. بتاخد الـ [[this]] اللي عايزين نثبّته ([[ctx]])، و [[...preset]] أي arguments عايزين نثبّتها من الأول.`,
            R`جوه [[myBind]]، [[this]] هي الدالة اللي ناديناها عليها (زي [[hi]] تحت). بنحفظها في [[fn]] لأن الدالة اللي هنرجّعها هيبقى ليها [[this]] تاني خالص.`,
            R`بترجّع دالة جديدة ومبتنديش حاجة دلوقتي: [[bind]] بتجهّز بس، والنداء الحقيقي بيحصل بعدين لما حد ينادي الدالة الراجعة.`,
            R`[[apply]] بتنادي الأصلية بـ [[ctx]] كـ [[this]]، وبتاخد الـ arguments كـ array: المتثبتة الأول وبعدها اللي جت وقت النداء. النسخة دي مبتدعمش [[new]] زي [[bind]] الأصلية، وده غالبًا كفاية في الانترفيو.`,
            R`نهاية الدالة الراجعة.`,
            R`نهاية [[myBind]].`,
            R`تجربة: كل عنصر مضروب في 2 والناتج [[2, 4, 6]] في array جديدة، نفس ناتج [[map]] الأصلية.`,
            R`دالة عادية (مش arrow) بتقرا [[this.name]]، فقيمة [[this]] بتتحدد وقت النداء. لو ناديتها لوحدها مش هتلاقي [[name]] اللي انت عايزه، وده بالظبط اللي [[bind]] بيحلّه.`,
            R`[[myBind]] ثبّتت [[this]] على [[{ name: "Sara" }]] وثبّتت أول argument [["Hi"]]، والقوسين [[()]] في الآخر بينادوا الدالة الراجعة من غير arguments زيادة، فالناتج [["Hi Sara"]].`,
          ],
          sol: R`[[[1, 2, 3, 4].myFilter((x) => x % 2 === 0)]] بترجّع [[[2, 4]]]، و [[[1, 2, 3].myReduce((a, b) => a + b)]] بـ 6، و [[[].myReduce((a, b) => a + b)]] بترمي [[TypeError: Reduce of empty array with no initial value]] زي الأصلية بالظبط. عشان تفرّق بين «مفيش قيمة أولية» و «القيمة الأولية undefined» استخدم rest [[...init]] وافحص [[init.length]]، مش [[init === undefined]].

myBind مع new: جوه الدالة اللي بترجّعها افحص [[new.target]]، ولو موجود اعمل [[new fn(...preset, ...args)]] وتجاهل الـ ctx. النتيجة: [[new (Point.myBind(null, 1))(2)]] بترجّع [[Point { x: 1, y: 2 }]] و [[instanceof Point]] بـ true. من غير الفحص ده النسخة البسيطة بترجّع [[{}]] فاضي و instanceof بـ false، لأن this راحت للـ ctx مش للـ object الجديد.`,
          solCode: R`Array.prototype.myFilter = function (callback, thisArg) {
  if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) result.push(this[i]);
  }
  return result;
};
Array.prototype.myReduce = function (callback, ...init) {
  if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
  let i = 0;
  let acc;
  if (init.length > 0) {
    acc = init[0];
  } else {
    while (i < this.length && !(i in this)) i++;
    if (i >= this.length) throw new TypeError("Reduce of empty array with no initial value");
    acc = this[i++];
  }
  for (; i < this.length; i++) if (i in this) acc = callback(acc, this[i], i, this);
  return acc;
};
Function.prototype.myBind = function (ctx, ...preset) {
  const fn = this;
  function bound(...args) {
    if (new.target) return new fn(...preset, ...args);
    return fn.apply(ctx, [...preset, ...args]);
  }
  if (fn.prototype) bound.prototype = Object.create(fn.prototype);
  return bound;
};
function Point(x, y) { this.x = x; this.y = y; }
const P = Point.myBind(null, 1);
console.log(new P(2), new P(2) instanceof Point); // Point { x: 1, y: 2 } true`,
          check: {
            lang: "js",
            starter: R`Array.prototype.myFilter = function (callback, thisArg) {
  // ...
};
Array.prototype.myReduce = function (callback, ...init) {
  // init.length بيفرّق بين «مفيش قيمة أولية» و «القيمة الأولية undefined»
};
Function.prototype.myBind = function (ctx, ...preset) {
  const fn = this;
  return function (...args) {
    return fn.apply(ctx, [...preset, ...args]);
  };
};`,
            tests: R`test("[1, 2, 3, 4].myFilter(زوجي) ← [2, 4]", () => expect([1, 2, 3, 4].myFilter((x) => x % 2 === 0)).toEqual([2, 4]));
test("myFilter بتبعت (value, index, array)", () => expect(["a", "b", "c"].myFilter((v, i, arr) => i > 0 && arr.length === 3)).toEqual(["b", "c"]));
test("[1, 2, 3].myReduce(جمع) ← 6، ومع قيمة أولية 10 ← 16", () => expect([[1, 2, 3].myReduce((a, b) => a + b), [1, 2, 3].myReduce((a, b) => a + b, 10)]).toEqual([6, 16]));
test("[].myReduce من غير قيمة أولية ← TypeError", () => {
  let err;
  try { [].myReduce((a, b) => a + b); } catch (e) { err = e; }
  expect(err instanceof TypeError).toBe(true);
});
test("القيمة الأولية undefined مش زي مفيش قيمة: [1].myReduce(f, undefined) ← [undefined, 1]", () => expect([1].myReduce((a, b) => [a, b], undefined)).toEqual([undefined, 1]));
test("[].myReduce(f, 0) ← 0", () => expect([].myReduce((a, b) => a + b, 0)).toBe(0));
test("myBind مع new: new (Point.myBind(null, 1))(2) instanceof Point و x = 1 و y = 2", () => {
  function Point(x, y) { this.x = x; this.y = y; }
  const P = Point.myBind(null, 1);
  const p = new P(2);
  expect([p instanceof Point, p.x, p.y]).toEqual([true, 1, 2]);
});`,
            solution: R`Array.prototype.myFilter = function (callback, thisArg) {
  if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) result.push(this[i]);
  }
  return result;
};
Array.prototype.myReduce = function (callback, ...init) {
  if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
  let i = 0;
  let acc;
  if (init.length > 0) {
    acc = init[0];
  } else {
    while (i < this.length && !(i in this)) i++;
    if (i >= this.length) throw new TypeError("Reduce of empty array with no initial value");
    acc = this[i++];
  }
  for (; i < this.length; i++) if (i in this) acc = callback(acc, this[i], i, this);
  return acc;
};
Function.prototype.myBind = function (ctx, ...preset) {
  const fn = this;
  function bound(...args) {
    if (new.target) return new fn(...preset, ...args);
    return fn.apply(ctx, [...preset, ...args]);
  }
  if (fn.prototype) bound.prototype = Object.create(fn.prototype);
  return bound;
};`
          }
        },
        {
          cmd: "curry",
          title: "اكتب دالة curry (currying)",
          desc: R`الـ currying بيحوّل دالة بتاخد كذا argument مرة واحدة [[f(a, b, c)]] لسلسلة دوال كل واحدة بتاخد جزء [[f(a)(b)(c)]]. الـ implementation: بقارن عدد الـ arguments اللي اتجمعت بـ [[fn.length]] (عدد باراميترات الدالة). لو كفاية بنادي الدالة، ولو لأ برجّع دالة بتجمع الباقي وتنادي نفسها تاني. الفايدة العملية: تعمل نسخ «متظبطة» من دالة عامة، زي [[addTax]] بنسبة ثابتة.`,
          example: R`function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...more) => curried.apply(this, [...args, ...more]);
  };
}
const add3 = (a, b, c) => a + b + c;
const add = curry(add3);
add(1)(2)(3);    // 6
add(1, 2)(3);    // 6
add(1)(2, 3);    // 6
const withTax = curry((ratePct, price) => (price * (100 + ratePct)) / 100);
const addVat = withTax(14);
addVat(100);     // 114`,
          try: R`اكتب [[sum(1)(2)(3)()]] بيرجّع 6 بأي عدد نداءات، ويخلص لما تناديه من غير arguments. ده سؤال تاني مشهور بنفس الفكرة. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[sum]].`,
          practice: [
            { lvl: 'سريع', t: R`اتوقع وبعدين شغّل بـ [[curry]] بتاع الدرس: [[curry((...a) => a.length)(1, 2)]] و [[curry((...a) => a.length)()]] و [[((a, b = 2) => {}).length]] و [[curry((a, b = 2) => a + b)(1)]].`, done: R`الناتج: 2 و 0 و 1 و 3، وتقدر تشرح إن [[fn.length]] مبيعدّش الـ rest parameter ولا أي باراميتر بعد أول default، فالـ curry بينادي الدالة على طول في الحالات دي.` },
            { lvl: 'تطبيق', t: R`ابني على بيانات حقيقية الشكل: [[users.json]] فيه ٢٠ يوزر ([[{ name, role, city }]])، و [[const filterBy = curry((key, value, list) => list.filter((o) => o[key] === value))]]، واعمل منها [[admins]] و [[fromCairo]] جاهزين.`, done: R`[[admins(users)]] بيرجّع اليوزرز اللي [[role]] بتاعهم [["admin"]] بس، و [[fromCairo(admins(users))]] بيجمع الشرطين، و [[filterBy("role", "admin", users)]] مرة واحدة بيرجّع نفس نتيجة [[admins(users)]]، ولستة فاضية بترجّع لستة فاضية.` },
            { lvl: 'تحدي', t: R`مسألة: اكتب [[pipe(...fns)]] و [[compose(...fns)]]، واستخدمهم مع [[curry]]: [[const split = curry((sep, s) => s.split(sep));]] و [[pipe((s) => s.trim(), (s) => s.toLowerCase(), split(" "))]].`, done: R`الـ pipe على [["  Hello World "]] بيرجّع [["hello", "world"]]، و [[compose]] بنفس الدوال بالعكس بيرجّع نفس الناتج، و [[pipe()]] من غير دوال بترجّع المدخل زي ما هو، وتقدر تقول الفرق بين currying و partial application في جملتين.` },
          ],
          flag: "script",
          deep: {
            why: "بيختبر closures و recursion و fn.length و rest/spread. وفكرته (partial application) موجودة في الشغل الحقيقي حتى لو مش بالاسم ده: [[bind]] مع arguments، و factories، و middleware.",
            how: R`نقط تقولها: [[fn.length]] بيعد الباراميترات قبل أول واحد ليه default أو rest، فمع [[(a, b = 1) => ...]] الطول 1، ومع [[(...args)]] صفر، فالـ curry مش هيشتغل صح معاهم. وكل نداء جزئي بيعمل closure جديد شايل الـ args اللي اتجمعت، فتقدر تعيد استخدام [[add(1)]] مع أرقام مختلفة من غير ما يتلخبطوا. والفرق بين currying (argument واحد كل مرة) و partial application (تثبيت جزء).`,
            when: "«الفرق بين currying و partial application؟»، و «sum(1)(2)(3)» بكل أشكاله، و «compose و pipe».",
            mistakes: R`تعدّل [[args]] المتجمعة (push) فالنداءات الجزئية تتلخبط مع بعض: اعمل array جديدة كل مرة. وتنسى الحالة اللي فيها arguments أكتر من المطلوب.`
          },
          teach: R`## الفكرة في سطر

[[curry(fn)]] بترجّع نسخة من [[fn]] تقدر تبعتلها الـ arguments على دفعات. كل مرة بتعدّ اللي اتجمع: لو كفاية تنادي [[fn]]، ولو لأ ترجّع دالة تستنى الباقي.

شغّلت المثال في Node 24، وضفت سطر [[console.log]] جوه [[curried]] يطبع الـ arguments اللي اتجمعت كل مرة.

---

## ١. [[fn.length]]

~~~text app.js
const add3 = (a, b, c) => a + b + c;
console.log(add3.length);
~~~

~~~text الناتج
3
~~~

[[length]] على دالة = عدد الباراميترات اللي مكتوبة. ده اللي [[curry]] بتعرف منه «محتاج كام؟».

بس فيه استثناء: بيعد لحد أول باراميتر ليه default أو rest:

~~~text الناتج
1 0
~~~

ده [[((a, b = 1) => a).length]] و [[((...r) => r).length]]. مع دوال زي دي [[curry]] هتنادي بدري.

---

## ٢. [[curry]] سطر سطر

~~~text app.js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...more) => curried.apply(this, [...args, ...more]);
  };
}
~~~

1. [[curry(fn)]] مش بتنادي [[fn]]: بترجّع دالة اسمها [[curried]].
2. [[function curried(...args)]]: دالة **ليها اسم** عشان تقدر تنادي نفسها من جوه. [[...args]] بيلم كل اللي اتبعت في array.
3. [[args.length >= fn.length]]: اتجمع كفاية (أو أكتر)؟ نادي الأصلية بيهم. [[apply(this, args)]] بتبعت الـ array كـ arguments منفصلة، وبتعدّي [[this]] زي ما هو لو كانت method.
4. لو مش كفاية: رجّع arrow بتستنى [[...more]]، ولما تتنادى تنادي [[curried]] تاني بـ [[[...args, ...more]]]: اللي فات واللي جه، في array **جديدة**.

ليه array جديدة ومش [[args.push(...more)]]؟ لأن [[args]] محفوظة في الـ closure. لو عدّلتها، أي نداء تاني من نفس الدالة الجزئية هيلاقيها متغيرة.

---

## ٣. التشغيل

~~~text app.js
const add = curry(add3);
add(1)(2)(3);
add(1, 2)(3);
add(1)(2, 3);
~~~

~~~text الناتج (مع الـ console.log اللي ضفته)
  curried اتنادت بـ [ 1 ] ← محتاجين 3
  curried اتنادت بـ [ 1, 2 ] ← محتاجين 3
  curried اتنادت بـ [ 1, 2, 3 ] ← محتاجين 3
6
  curried اتنادت بـ [ 1, 2 ] ← محتاجين 3
  curried اتنادت بـ [ 1, 2, 3 ] ← محتاجين 3
6
  curried اتنادت بـ [ 1 ] ← محتاجين 3
  curried اتنادت بـ [ 1, 2, 3 ] ← محتاجين 3
6
~~~

- [[add(1)(2)(3)]]: [[curried]] اتنادت ٣ مرات، والـ array كبرت لحد ما بقت 3.
- [[add(1, 2)(3)]]: أول مرة جه اتنين، فمرتين بس.
- [[add(1)(2, 3)]]: نفس الكلام بالعكس.

وجربت كمان:

~~~text الناتج
function
6
~~~

- [[typeof add(1)]] = [["function"]]: لسه مستنية.
- [[add(1, 2, 3, 4)]] = 6: [[>=]] بتسمح بأكتر من المطلوب، و [[add3]] بتتجاهل الرابع.

---

## ٤. الاستخدام العملي: ضريبة

~~~text app.js
const withTax = curry((ratePct, price) => (price * (100 + ratePct)) / 100);
const addVat = withTax(14);
addVat(100);
~~~

~~~text الناتج
  curried اتنادت بـ [ 14 ] ← محتاجين 2
  curried اتنادت بـ [ 14, 100 ] ← محتاجين 2
114
  curried اتنادت بـ [ 14, 250 ] ← محتاجين 2
285
~~~

- [[withTax(14)]]: ثبّتنا النسبة 14٪، فرجعت دالة [[addVat]] فاكرة [[[14]]].
- [[addVat(100)]]: [[100 × 114 ÷ 100 = 114]].
- [[addVat(250)]]: [[250 × 114 ÷ 100 = 285]]، ومن غير ما تتلخبط بالنداء اللي قبله، لأن كل نداء بيعمل array جديدة.
- ليه [[price * (100 + ratePct) / 100]] مش [[price * 1.14]]؟ عشان الضرب في كسر عشري ممكن يطلع أرقام غريبة: جربت [[100 * 1.14]] في Node وطلعت [[113.99999999999999]] (درس floating point)، والضرب في أرقام صحيحة الأول أأمن.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[fn.length]] | عدد الباراميترات المطلوبة |
| [[function curried]] بالاسم | تنادي نفسها |
| [[>=]] | arguments زيادة مسموحة |
| [[[...args, ...more]]] | array جديدة كل مرة، فالنسخ الجزئية متتلخبطش |
| closure | كل دالة جزئية فاكرة اللي اتجمع لحد عندها |

> في التمرين اللي تحت ([[sum(1)(2)(3)()]]) مفيش [[fn.length]] تعرف منه إمتى تخلص، فالنهاية هي النداء الفاضي. وخلي بالك من الـ starter: فيه مجموع global، وده بالظبط اللي الاختبار الرابع بيمسكه.`,
          lines: [
            R`[[curry]] بتاخد دالة عادية بكذا باراميتر، وبترجّع نسخة تقدر تدّيها الـ arguments على دفعات بدل مرة واحدة.`,
            R`بترجّع دالة ليها اسم [[curried]] عشان تقدر تنادي نفسها في السطر الجاي. و [[...args]] بتجمع اللي اتبعت في النداء ده في array.`,
            R`[[fn.length]] عدد الباراميترات اللي الدالة الأصلية متعرّفة بيها. لو اللي اتجمع لحد دلوقتي كفاية بننادي الأصلية بيه ونرجّع الناتج. خلي بالك: الباراميتر اللي ليه default أو [[...rest]] مبيتحسبش في [[length]]، فـ curry دي مش هتشتغل صح مع الدوال دي.`,
            R`لو مش كفاية، بنرجّع دالة جديدة مستنية الباقي ([[...more]]). لما تتنادى بتلزق القديم على الجديد وتنادي [[curried]] تاني، فتتأكد هل كفاية ولا لسه. والـ arrow هنا بتحافظ على [[this]] بتاع النداء الأول.`,
            R`نهاية [[curried]].`,
            R`نهاية [[curry]].`,
            R`دالة جمع عادية بتلات باراميترات، فـ [[fn.length]] بتاعها 3. ده الرقم اللي [[curry]] هتستناه قبل ما تحسب.`,
            R`[[add]] النسخة الـ curried من [[add3]]. لسه محسبتش حاجة، هي بس مستنية arguments.`,
            R`كل نداء بياخد argument واحد: [[add(1)]] بترجّع دالة، و [[(2)]] بترجّع دالة، و [[(3)]] أخيرًا بتكمّل التلاتة وتحسب 6.`,
            R`أول نداء بياخد اتنين مرة واحدة فيفضل ناقص واحد بس، والنداء التاني بيكمّله. نفس الناتج 6.`,
            R`العكس: واحد الأول واتنين بعده. يعني [[curry]] دي مرنة، وأي تقسيمة للـ arguments بتوصل لنفس الناتج.`,
            R`الاستخدام الحقيقي: دالة ضريبة عامة بتاخد النسبة الأول والسعر بعدها، و [[curry]] بتخلينا نثبّت النسبة مرة. ترتيب الباراميترات مهم: اللي بيتثبّت الأول، واللي بيتغير كل مرة في الآخر.`,
            R`ادّيناها النسبة بس، فرجعت دالة مستنية السعر ومتظبطة على ١٤٪ (ضريبة القيمة المضافة في مصر). تقدر تستخدمها في أي مكان محتاج دالة بتاخد سعر، زي [[prices.map(addVat)]].`,
            R`بيحسب [[100 * 114 / 100]] = 114. ضربنا في ١١٤ الأول وقسمنا بعدين بدل [[price * 1.14]]، لأن [[100 * 1.14]] في JavaScript بتطلع [[113.99999999999999]].`,
          ],
          sol: R`[[sum(1)(2)(3)()]] بترجّع 6، و [[sum(5)()]] بترجّع 5، و [[sum(1)(2)(3)(4)(10)()]] بترجّع 20. الفكرة إن كل نداء فيه رقم بيرجّع دالة جديدة شايلة المجموع لحد دلوقتي في الـ closure، والنداء الفاضي هو اللي بيرجّع الرقم.

الفرق عن curry اللي فوق إن هنا مفيش عدد arguments معروف ([[fn.length]])، فلازم إشارة للنهاية، وهي النداء الفاضي. الغلطة الشائعة إنك تخزّن المجموع في متغير برّه الدالة (global)، فنداء [[sum(1)(2)()]] التاني يبدأ من المجموع القديم. ولو نسيت [[()]] في الآخر هتطبع [[[Function: next]]] بدل الرقم.`,
          solCode: R`function sum(a) {
  return function next(b) {
    if (b === undefined) return a;
    return sum(a + b);
  };
}
console.log(sum(1)(2)(3)());        // 6
console.log(sum(5)());              // 5
console.log(sum(1)(2)(3)(4)(10)()); // 20`,
          check: {
            lang: "js",
            starter: R`let total = 0;
function sum(a) {
  total += a;
  return function next(b) {
    if (b === undefined) return total;
    return sum(b);
  };
}`,
            tests: R`test("sum(1)(2)(3)() ← 6", () => expect(sum(1)(2)(3)()).toBe(6));
test("sum(5)() ← 5", () => expect(sum(5)()).toBe(5));
test("sum(1)(2)(3)(4)(10)() ← 20", () => expect(sum(1)(2)(3)(4)(10)()).toBe(20));
test("كل سلسلة مستقلة (مفيش مجموع global): a = sum(1)، و a(2)() ← 3، و a(10)() ← 11", () => {
  const a = sum(1);
  expect([a(2)(), a(10)()]).toEqual([3, 11]);
});
test("النداء الفاضي بس اللي بيرجّع رقم", () => expect(typeof sum(1)(2)).toBe("function"));`,
            solution: R`function sum(a) {
  return function next(b) {
    if (b === undefined) return a;
    return sum(a + b);
  };
}`
          }
        },
        {
          cmd: "deep equal",
          title: "قارن اتنين objects بالمحتوى (deep equal)",
          desc: R`=== بيقارن الـ reference، فمحتاج دالة recursive. الأول لو [[Object.is(a, b)]] يبقى متساويين (بتغطي الـ primitives و NaN ونفس الـ reference). لو واحد فيهم مش object أو null يبقى مختلفين. لو واحد array والتاني لأ مختلفين. بعد كده أقارن عدد المفاتيح، وبعدين كل مفتاح موجود في التاني وقيمته متساوية بنفس الدالة.`,
          example: R`function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => Object.hasOwn(b, k) && deepEqual(a[k], b[k]));
}
deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }); // true
deepEqual({ a: 1 }, { a: "1" });                       // false
deepEqual([1, 2], { 0: 1, 1: 2 });                     // false
deepEqual(NaN, NaN);                                   // true
deepEqual(new Date(1), new Date(2));                   // true! غلط: حدود النسخة دي
deepEqual(/a/g, /b/i);                                 // true! غلط برضه`,
          try: R`ضيف دعم لـ Date (قارن [[getTime()]]) و RegExp (قارن [[source]] و [[flags]]) و Map و Set. وبعدين جرّب object بيشاور على نفسه ([[a.self = a]]) وشوف الـ stack overflow، وفكّر إزاي تحلها بـ WeakMap للأزواج اللي اتقارنت. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[deepEqual]] مع Date و RegExp و Map و Set، والـ object اللي بيشاور على نفسه.`,
          practice: [
            { lvl: 'سريع', t: R`اتوقع بـ [[deepEqual]] بتاع الدرس: [[deepEqual([1, 2, 3], [1, 2, 3])]] و [[deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 })]] و [[deepEqual({ a: undefined }, { b: undefined })]] و [[deepEqual(0, -0)]] و [[deepEqual(new Date(1), new Date(2))]].`, done: R`الناتج: [[true]] و [[true]] و [[false]] و [[false]] و [[true]]. الأخير مفاجأة: الـ Date ملوش keys خاصة بيه فالدالة بتشوف اتنين objects فاضيين، و 0 و -0 مختلفين عشان [[Object.is]]، وتقدر تقول إمتى ده يبقى bug.` },
            { lvl: 'تطبيق', t: R`قارن: ليه [[JSON.stringify(a) === JSON.stringify(b)]] مش deep equal؟ جرّب [[{ a: 1, b: 2 }]] مقابل [[{ b: 2, a: 1 }]]، و [[{ a: undefined }]] مقابل [[{}]]، و [[NaN]] مقابل [[null]] جوه array، واكتب جدول صغير بالنتيجة بالطريقتين.`, done: R`الـ JSON بيقول [[false]] للأولى (ترتيب المفاتيح) و [[true]] للتانية و [[true]] للتالتة ([[NaN]] بيتحوّل [[null]])، و [[deepEqual]] بيقول [[true]] و [[false]] و [[false]]، والجدول فيه الست نتايج دول.` },
            { lvl: 'تحدي', t: R`مسألة: اكتب [[diff(a, b)]] بترجّع لستة الـ paths اللي فيها اختلاف، بالـ recursion، و [[Object.is]] للقيم البسيطة.`, done: R`[[diff({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 }, d: 4 })]] بيرجّع [["b.c", "d"]]، و [[diff(x, x)]] بيرجّع لستة فاضية، و key موجود في الأول بس بيظهر، والـ arrays بتطلع paths زي [["items.0"]].` },
          ],
          flag: "script",
          deep: {
            why: "بيختبر recursion، والفرق بين الـ reference والقيمة، والحالات الحدية (null و NaN و arrays مقابل objects). وهي نفس الفكرة اللي ورا [[expect(x).toEqual(y)]] في الـ tests و [[assert.deepStrictEqual]] في Node.",
            how: R`نقط تقولها: [[typeof null]] بـ "object" فلازم فحص null لوحده. و [[Object.is]] بدل === عشان NaN. والـ prototype مش بيتقارن هنا (instance من class ممكن يساوي object عادي بنفس المفاتيح)، والنسخ الكاملة بتقارن [[Object.getPrototypeOf]]. والتعقيد O(n) في عدد القيم كلها. والمراجع الدائرية محتاجة تتبّع الأزواج اللي بتتقارن. وفي الشغل: [[node:util]] فيه [[isDeepStrictEqual]] جاهز.`,
            when: R`«اكتب deep clone» (نفس الـ recursion، واذكر structuredClone)، و «flatten object لمفاتيح بنقط» ([[{a: {b: 1}}]] → [[{"a.b": 1}]])، و «get(obj, 'a.b.c')».`,
            mistakes: R`تقارن بـ [[JSON.stringify]]: ترتيب المفاتيح بيفرق، و undefined بيختفي، و NaN بتبقى null. ونسيان فحص null. ونسيان إن [[[]]] و [[{}]] الفاضيين ليهم نفس عدد المفاتيح.`
          },
          teach: R`## الفكرة في سطر

[[===]] على objects بيسأل «ده نفس الـ object في الميموري؟» مش «جواهم نفس الحاجة؟». [[deepEqual]] بتنزل جوه الاتنين وتقارن كل مفتاح، وبتنادي نفسها (recursion) لما القيمة تبقى object أو array.

شغّلت المثال في Node 24، وجربت حالات زيادة.

---

## ١. ليه [[===]] مش كفاية

~~~text الناتج (Node)
false false true false true
~~~

ده بالترتيب:

| التعبير | الناتج | ليه |
|---|---|---|
| [[{a:1} === {a:1}]] | false | اتنين objects مختلفين في الميموري |
| [[NaN === NaN]] | false | قاعدة في الأرقام العشرية: NaN مبيساويش حاجة، ولا نفسه |
| [[Object.is(NaN, NaN)]] | true | [[Object.is]] بتعتبرهم متساويين |
| [[Object.is(0, -0)]] | false | بتفرّق بين الصفر الموجب والسالب |
| [[0 === -0]] | true | [[===]] مبتفرّقش |

---

## ٢. الدالة سطر سطر

~~~text app.js
function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => Object.hasOwn(b, k) && deepEqual(a[k], b[k]));
}
~~~

### السطر ١: نفس القيمة؟

[[Object.is(a, b)]]: لو نفس الرقم أو النص، أو نفس الـ object بالظبط، أو الاتنين NaN، خلصنا: متساويين.

### السطر ٢: واحد فيهم مش object؟

لو وصلنا هنا يبقى مش متساويين بـ [[Object.is]]. لو أي واحد primitive (رقم، نص، boolean...) يبقى مختلفين ومفيش حاجة ننزل جواها.

- [[typeof a !== "object"]]: [[typeof]] بيرجّع [["object"]] للـ objects والـ arrays.
- [[a === null]]: لازم فحص لوحده لأن [[typeof null]] بيرجّع [["object"]] برضه (جربت: [[object object true]] لـ [[typeof null]] و [[typeof []]] و [[Array.isArray([])]]).
- [[||]]: لو أي شرط من دول صح.

### السطر ٣: array قدام object؟

[[Array.isArray(a) !== Array.isArray(b)]]: لو واحد array والتاني لأ، مختلفين. ليه محتاجينه؟ لأن مفاتيحهم ممكن تبقى زي بعض:

~~~text الناتج
[ '0', '1' ] [ '0', '1' ]
~~~

ده [[Object.keys([1, 2])]] و [[Object.keys({ 0: 1, 1: 2 })]]: نفس المفاتيح بالظبط (والمفاتيح دايمًا strings).

### السطور ٤ و ٥ و ٦: عدد المفاتيح

[[Object.keys(x)]]: array بأسماء المفاتيح بتاعة الـ object نفسه. لو العدد مختلف، مختلفين، ووفّرنا اللفة.

### السطر ٧: كل مفتاح

- [[keysA.every(fn)]]: true لو [[fn]] رجّعت true لكل عنصر، وبتقف عند أول false.
- [[Object.hasOwn(b, k)]]: [[b]] فيه المفتاح ده نفسه؟
- [[deepEqual(a[k], b[k])]]: قارن القيمتين **بنفس الدالة**. لو القيمة object، الدالة هتنزل جواه، وهكذا لحد ما توصل لـ primitives.
- [[&&]]: الاتنين لازم يبقوا صح. ولو [[hasOwn]] false، الـ recursion مش بيتنادى أصلًا.

ليه [[hasOwn]] مهم؟ جربت [[deepEqual({a:1, b:undefined}, {a:1, c:undefined})]]: نفس العدد، و [[a.b]] و [[b.b]] الاتنين [[undefined]]، بس النتيجة [[false]] صح بسبب [[hasOwn]].

---

## ٣. التشغيل

~~~text app.js
deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] });
deepEqual({ a: 1 }, { a: "1" });
deepEqual([1, 2], { 0: 1, 1: 2 });
deepEqual(NaN, NaN);
~~~

~~~text الناتج
true
false
false
true
~~~

خلينا نمشي ورا الأول:

1. الـ objects الخارجية مختلفة في الميموري، والاتنين objects مش arrays، والمفاتيح [[["a"]]] و [[["a"]]].
2. [[deepEqual([1, {b: 2}], [1, {b: 2}])]]: الاتنين arrays، المفاتيح [[["0", "1"]]].
3. [[deepEqual(1, 1)]]: [[Object.is]] ← true.
4. [[deepEqual({b: 2}, {b: 2})]] ← [[deepEqual(2, 2)]] ← true.
5. كله true فالنتيجة true.

والتاني: [[deepEqual(1, "1")]] ← مش [[Object.is]]، و [[typeof 1]] مش [["object"]] ← false.

### حالات تانية جربتها

~~~text الناتج
true
false
false
false true
~~~

| التعبير | الناتج |
|---|---|
| [[deepEqual({a:1,b:2}, {b:2,a:1})]] | true، الترتيب مش مهم |
| [[JSON.stringify]] لنفس الاتنين ومقارنة النصوص | false، عشان كده JSON مش حل |
| [[deepEqual(0, -0)]] | false، بسبب [[Object.is]] |
| [[deepEqual([], {})]] و [[deepEqual([], [])]] | false و true، بفضل فحص الـ array |

---

## ٤. اللي النسخة دي مش بتعرفه

~~~text الناتج
true []
true [] a g
true
RangeError: Maximum call stack size exceeded
~~~

- [[deepEqual(new Date(1), new Date(2))]] رجّعت **true** غلط: [[Object.keys(new Date(1))]] بـ [[[]]]، يعني الـ Date معندهاش مفاتيح عادية (التاريخ متخزن جوه بطريقة تانية)، فاتنين Dates أي كانوا شكلهم «متساويين».
- [[deepEqual(/a/g, /b/i)]]: **true** غلط برضه. السطر التاني في الناتج فيه [[Object.keys(/a/g)]] بـ [[[]]]، وبعدها [[/a/g.source]] بـ [[a]] و [[/a/g.flags]] بـ [[g]]: دول اللي المفروض يتقارنوا.
- [[new Map([ [1, 1] ])]] و [[new Map([ [2, 2] ])]]: true غلط، لنفس السبب.
- object بيشاور على نفسه ([[x.self = x]]): الدالة بتنزل في [[self]] ثم [[self]] ثم... للأبد لحد ما الـ call stack (المكان اللي بيتسجل فيه كل نداء لسه مخلصش) يتملي.

ودي بالظبط اللي التمرين اللي تحت بيطلبها.

---

## الخلاصة

| الفحص | بيمسك إيه |
|---|---|
| [[Object.is]] | نفس القيمة، و NaN |
| [[typeof]] و [[null]] | primitive قدام object |
| [[Array.isArray]] | array قدام object بنفس المفاتيح |
| عدد [[Object.keys]] | مفتاح زيادة أو ناقص |
| [[hasOwn]] + recursion | كل قيمة بنفس الدالة |

> في التمرين: فكّر إزاي تعرف إن [[a]] Date أو RegExp أو Map أو Set، وإيه اللي تقارنه في كل واحد بدل المفاتيح. وللـ object اللي بيشاور على نفسه: محتاج «تفتكر» الأزواج اللي بدأت تقارنها قبل كده، والـ [[WeakMap]] بتشيل object كمفتاح.`,
          lines: [
            R`دالة recursive: بتقارن قيمتين، ولو لقت جواهم objects أو arrays بتنادي نفسها على كل جزء لحد ما توصل لقيم بسيطة.`,
            R`[[Object.is]] زي [[===]] بس بتعتبر [[NaN]] بيساوي [[NaN]]. لو القيمتين نفس الحاجة أو نفس الـ reference نخلص بـ [[true]] على طول من غير لف. وخلي بالك إنها بتفرّق بين [[0]] و [[-0]]، فـ [[deepEqual(0, -0)]] بتطلع [[false]].`,
            R`لو وصلنا هنا يبقى القيمتين مش متساويين، فلو أي واحدة فيهم مش object (رقم أو نص مثلًا) أو [[null]] يبقوا مختلفين. فحص [[null]] لازم لوحده لأن [[typeof null]] بيرجّع [["object"]]، ومن غيره [[Object.keys(null)]] هيرمي error.`,
            R`array و object عادي ممكن يبقى ليهم نفس المفاتيح ([["0"]] و [["1"]])، فبنفرّق بينهم الأول. من غير السطر ده المثال التالت تحت كان هيطلع [[true]] غلط.`,
            R`[[Object.keys]] بترجّع أسامي الخصايص بتاعة [[a]] نفسه بس (مش اللي ورثها)، وفي array بترجّع الـ indexes كنصوص. ولأن Date و Map مالهمش مفاتيح من النوع ده، الدالة دي هتشوف أي اتنين Date متساويين، فمحتاجة فحص زيادة لو هتقارنهم.`,
            R`نفس الكلام لـ [[b]]. محتاجين الاتنين عشان نقارن العدد.`,
            R`لو العدد مختلف يبقوا مختلفين أكيد، ونوفّر اللفة. والفحص ده كمان بيمسك حالة إن [[b]] فيه مفتاح زيادة مش في [[a]]، لأن السطر الجاي بيلف على مفاتيح [[a]] بس.`,
            R`[[every]] بترجّع [[true]] لو كل مفتاح عدّى: [[Object.hasOwn(b, k)]] بتتأكد إن المفتاح موجود في [[b]] (عشان [[{ a: undefined }]] ميساويش [[{ b: undefined }]])، و [[deepEqual]] بتنادي نفسها على القيمتين. وأول مفتاح يفشل اللفة بتقف.`,
            R`نهاية [[deepEqual]].`,
            R`objects متداخلة: array جواها object. الـ [[===]] هنا هتدّي [[false]] لأنهم objects مختلفة في الذاكرة، بس [[deepEqual]] بتنزل لحد الأرقام وتلاقيها متساوية فترجّع [[true]].`,
            R`[[1]] و [["1"]]: [[Object.is]] بتقول مختلفين، وواحد منهم مش object فبنرجّع [[false]]. لو كنا استخدمنا [[==]] بدل [[Object.is]] كانوا هيطلعوا متساويين غلط.`,
            R`array و object ليهم نفس المفاتيح والقيم، وفحص [[Array.isArray]] هو اللي مسكهم وقال [[false]].`,
            R`[[NaN === NaN]] بـ [[false]] في JavaScript، بس [[Object.is]] بتقول [[true]]، فـ [[deepEqual]] بتعتبرهم متساويين. ده اللي عادة عايزه لما تقارن داتا.`,
            R`حدود النسخة دي بصراحة: تاريخين مختلفين بيطلعوا [[true]] غلط، لأن [[Object.keys(new Date(1))]] بترجّع [[[]]]: الوقت متخزن جوه الـ Date في خانة داخلية مش مفتاح، فالدالة شايفة اتنين objects فاضيين. نفس الكلام لـ [[Map]] و [[Set]]. التمرين تحت بيصلّحها.`,
            R`نفس الغلطة مع الـ regex: [[/a/g]] و [[/b/i]] مالهمش مفاتيح عادية ([[Object.keys(/a/g)]] بـ [[[]]]، و [[lastIndex]] مش enumerable)، فبيطلعوا متساويين. الصح تقارن [[a.source]] (النص [["a"]]) و [[a.flags]] (النص [["g"]]).`,
          ],
          sol: R`بعد الإضافات: [[deepEqual(new Date(1), new Date(2))]] بترجّع false (النسخة الأصلية كانت بترجّع true غلط، لأن الـ Date معندهاش keys فبتبان متساوية)، ونفس المشكلة مع Map و Set: الأصلية بتقول [[new Map([ [1, 1] ])]] بتساوي [[new Map([ [2, 2] ])]]. ونفسها مع الـ regex: [[deepEqual(/a/g, /b/i)]] في الأصلية [[true]]، وفي الحل [[false]]، و [[deepEqual(/a/g, /a/g)]] [[true]] (جرّبت الاتنين في Node 24). الحل إنك تفحص النوع بـ instanceof وتقارن [[getTime()]] للـ Date، و [[source]] و [[flags]] للـ RegExp، و size وكل مفتاح للـ Map، و has للـ Set.

الـ object اللي بيشاور على نفسه بيوقّع النسخة الأصلية بـ [[RangeError: Maximum call stack size exceeded]]. الحل [[WeakMap]] بتسجّل كل زوج [[a → b]] دخلت تقارنه، ولو قابلته تاني ترجّع true (افترضنا إنهم متساويين لحد ما يثبت العكس). مع الحل، اتنين objects كل واحد بيشاور على نفسه بيطلعوا متساويين. ولـ Set جوه objects المقارنة بـ has بتقارن بالـ reference، ودي حدود مقبولة في الانترفيو لو قلتها.`,
          solCode: R`function deepEqual(a, b, seen = new WeakMap()) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
  if (seen.get(a) === b) return true;
  seen.set(a, b);
  if (a instanceof Date) return a.getTime() === b.getTime();
  if (a instanceof RegExp) return a.source === b.source && a.flags === b.flags;
  if (a instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [k, v] of a) if (!b.has(k) || !deepEqual(v, b.get(k), seen)) return false;
    return true;
  }
  if (a instanceof Set) {
    if (a.size !== b.size) return false;
    for (const v of a) if (!b.has(v)) return false;
    return true;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => Object.hasOwn(b, k) && deepEqual(a[k], b[k], seen));
}
const x = { v: 1 }; x.self = x;
const y = { v: 1 }; y.self = y;
console.log(deepEqual(x, y));                                  // true
console.log(deepEqual(new Date(1), new Date(2)));              // false
console.log(deepEqual(/a/g, /b/i), deepEqual(/a/g, /a/g));     // false true
console.log(deepEqual(new Map([["a", [1]]]), new Map([["a", [1]]]))); // true`,
          check: {
            lang: "js",
            starter: R`function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => Object.hasOwn(b, k) && deepEqual(a[k], b[k]));
}`,
            tests: R`test("objects و arrays متداخلة", () => expect([deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }), deepEqual({ a: 1 }, { a: "1" }), deepEqual([1, 2], { 0: 1, 1: 2 })]).toEqual([true, false, false]));
test("Date: new Date(1) و new Date(2) مش متساويين (الأصلية كانت بتقول true)", () => expect([deepEqual(new Date(1), new Date(2)), deepEqual(new Date(5), new Date(5))]).toEqual([false, true]));
test("Map: بالمفاتيح والقيم", () => expect([deepEqual(new Map([[1, 1]]), new Map([[2, 2]])), deepEqual(new Map([["a", [1]]]), new Map([["a", [1]]]))]).toEqual([false, true]));
test("RegExp: بالـ source والـ flags (الأصلية كانت بتقول /a/g زي /b/i)", () => expect([deepEqual(/a/g, /b/i), deepEqual(/a/g, /a/i), deepEqual(/a/g, /a/g)]).toEqual([false, false, true]));
test("Set: نفس العناصر", () => expect([deepEqual(new Set([1, 2]), new Set([2, 1])), deepEqual(new Set([1]), new Set([2]))]).toEqual([true, false]));
test("Date مش زي {} فاضي", () => expect(deepEqual(new Date(1), {})).toBe(false));
test("NaN زي NaN", () => expect(deepEqual({ x: NaN }, { x: NaN })).toBe(true));
test("اتنين بيشاوروا على نفسهم ← true من غير stack overflow (WeakMap)", () => {
  const x = { v: 1 }; x.self = x;
  const y = { v: 1 }; y.self = y;
  expect(deepEqual(x, y)).toBe(true);
});`,
            solution: R`function deepEqual(a, b, seen = new WeakMap()) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
  if (seen.get(a) === b) return true;
  seen.set(a, b);
  if (a instanceof Date) return a.getTime() === b.getTime();
  if (a instanceof RegExp) return a.source === b.source && a.flags === b.flags;
  if (a instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [k, v] of a) if (!b.has(k) || !deepEqual(v, b.get(k), seen)) return false;
    return true;
  }
  if (a instanceof Set) {
    if (a.size !== b.size) return false;
    for (const v of a) if (!b.has(v)) return false;
    return true;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => Object.hasOwn(b, k) && deepEqual(a[k], b[k], seen));
}`
          }
        },
        {
          cmd: "debounce و throttle في الانترفيو",
          title: "تكتب debounce و throttle بإيدك على السبورة بالحالات اللي بيسألوا عليها",
          desc: R`سؤال «اكتب debounce» بيتسأل في أغلب انترفيوهات الـ frontend، وبعده على طول «طب و throttle؟». المطلوب مش النسخة اللي في ٥ سطور وبس: لازم [[this]] والـ arguments يوصلوا للدالة الأصلية، و [[cancel()]]، ونسخة [[leading]] بتنفّذ أول نداء فورًا، و throttle مبيرميش آخر نداء.

الفكرة نفسها واستخدامها في البحث والـ scroll متشرحة في درس «debounce و throttle» (وحدة الأداء والذاكرة). الدرس ده عن الكتابة تحت ضغط الانترفيو، والأسئلة اللي بتيجي بعد الكود، وإزاي تختبرهم من غير ما تستنى الوقت بجد.`,
          example: R`function debounce(fn, ms, { leading = false } = {}) {
  let timer = null;
  function debounced(...args) {
    const callNow = leading && timer === null;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!leading) fn.apply(this, args);
    }, ms);
    if (callNow) fn.apply(this, args);
  }
  debounced.cancel = () => { clearTimeout(timer); timer = null; };
  return debounced;
}
function throttle(fn, ms) {
  let last = -Infinity, timer = null, lastArgs, lastThis;
  return function (...args) {
    lastArgs = args; lastThis = this;
    const wait = ms - (Date.now() - last);
    if (wait <= 0) { last = Date.now(); fn.apply(this, args); return; }
    if (timer === null) timer = setTimeout(() => {
      timer = null; last = Date.now(); fn.apply(lastThis, lastArgs);
    }, wait);
  };
}
const search = debounce((q) => console.log("search", q), 100);
search("j"); search("ja"); search("jav");          // بعد 100ms: search jav
const save = debounce((n) => console.log("save", n), 100, { leading: true });
save(1); save(2);                                   // فورًا: save 1
const move = throttle((i) => console.log("move", i), 50);
for (let i = 1; i <= 5; i++) move(i);               // فورًا move 1، وبعد 50ms move 5`,
          try: R`ضيف [[flush()]] للـ debounce: لو فيه نداء مستني، نفّذه دلوقتي حالًا وامسح الـ timer، ولو مفيش متعملش حاجة. وبعدين ضيف للـ throttle خيار [[{ trailing: false }]] بيلغي النداء الأخير. جرّب [[search("x"); search.flush();]] واتأكد إنه طبع فورًا ومطبعش تاني بعد 100ms.`,
          practice: [
            { lvl: 'سريع', t: R`اقرا وتوقّع: نفس الكتابة بتوصل للاتنين: [[const d = debounce((q) => console.log("debounce", q), 100)]] و [[const t = throttle((q) => console.log("throttle", q), 100)]]، والنداءات [[d(q); t(q);]] بتحصل عند 0 و 50 و 120 و 300ms بالنصوص [["a"]] و [["ab"]] و [["abc"]] و [["abcd"]] (اعملها بـ [[setTimeout]] لكل وقت). اكتب على ورقة اللي هيتطبع بالترتيب، وبعدين شغّل.`, done: R`الناتج في Node 24 (اتشغّل ٣ مرات وطلع نفس الترتيب): [[throttle a]] و [[throttle ab]] و [[throttle abc]] و [[debounce abc]] و [[throttle abcd]] و [[debounce abcd]]. وتقدر تقول ليه [["a"]] و [["ab"]] اختفوا من الـ debounce (كل نداء جديد بيلغي اللي قبله لحد ما ييجي سكوت 100ms)، وليه الـ throttle مضيّعش ولا كلمة.` },
            { lvl: 'تطبيق', t: R`صلّح الكود البايظ: [[function debounceBad(fn, ms) { return (...a) => setTimeout(() => fn(...a), ms); }]] فيه غلطتين. جرّبه بـ [[const g = debounceBad(() => calls++, 10); g(); g(); g();]] وبعد 30ms اطبع [[calls]]، وبـ [[const o = { n: 7, f: debounceBad(function () { console.log(this?.n); }, 10) }; o.f();]].`, done: R`قبل التصليح [[calls]] بـ 3 (مفيش [[clearTimeout]] فكل نداء عمل timer لوحده) و [[this?.n]] بـ [[undefined]] (الـ arrow اللي راجعة مالهاش [[this]]، و [[fn(...a)]] بتنادي من غير object). بعد ما ترجّع [[function]] عادية وتحفظ الـ timer وتنادي [[fn.apply(this, a)]]: [[calls]] بـ 1 و [[this?.n]] بـ 7.` },
            { lvl: 'تحدي', t: R`اكتب اختبار: ملف [[debounce.test.mjs]] بـ [[node:test]] بيختبر الاتنين من غير ما يستنى وقت حقيقي، بـ [[mock.timers.enable({ apis: ["setTimeout", "Date"] })]] و [[mock.timers.tick(ms)]]. على الأقل: debounce بينفّذ آخر نداء بس بعد [[ms]] من آخر نداء، و [[cancel()]] بيمنعه، و throttle بينفّذ الأول فورًا والأخير في آخر الفترة، و [[this]] بيوصل.`, done: R`[[node --test]] بيعدّي كل الاختبارات في أقل من ثانية (مش مستني 100ms بجد)، ولو شلت [[clearTimeout(timer)]] من الـ debounce اختبار واحد على الأقل بيقع، ولو شلت [[lastArgs]] من الـ throttle وخليته ينادي بالـ args الأولانية، اختبار «الأخير في آخر الفترة» بيقع.` },
          ],
          flag: "script",
          deep: {
            why: "السؤال ده بيختبر closures (الـ timer فاضل عايش بين النداءات)، و this و apply، والـ event loop (setTimeout مش بيستنى بالظبط)، والتفكير في الحالات الطرفية، كلهم في ١٥ سطر. واللي بيكتب النسخة البسيطة بس ومبيعرفش يرد على «طب لو عايز أول نداء يتنفّذ فورًا؟» بياخد نص الدرجة.",
            how: R`debounce بيحفظ timer واحد في closure: كل نداء بيعمل [[clearTimeout]] للقديم ويعمل واحد جديد، فالدالة مبتتنفذش غير لما النداءات تسكت [[ms]]. نسخة [[leading]] بتنفّذ لو مفيش timer شغال ([[timer === null]])، وبتستخدم الـ timer كـ «فترة سكوت» بس.

throttle بيحفظ وقت آخر تنفيذ ([[last]]). لو عدّى [[ms]] بينفّذ فورًا، ولو لأ بيحجز تنفيذ واحد في آخر الفترة بآخر arguments وصلت ([[lastArgs]])، فمفيش نداء أخير بيضيع.

الاتنين بيرجّعوا [[function]] عادية مش arrow عشان ياخدوا [[this]] بتاع اللي نادى، وبيستخدموا [[fn.apply(this, args)]] عشان يعدّوه للأصلية. واختبارهم بيبقى بـ fake timers ([[mock.timers]] في Node، أو [[vi.useFakeTimers()]] في Vitest) بدل ما الاختبار يستنى وقت حقيقي.`,
            when: R`في الانترفيو: اكتب النسخة البسيطة الأول وقول إنها شغالة، وبعدين زوّد [[this]] و [[cancel]] و [[leading]] لوحدك قبل ما يتسألوا. وفي الشغل: [[lodash.debounce]] أو الـ hook الجاهز في مكتبتك، إلا لو المشروع صغير ومش عايز dependency. وللـ animation والـ scroll البصري، throttle بـ [[requestAnimationFrame]] أحسن من رقم ثابت.`,
            mistakes: R`ترجّع arrow function فـ [[this]] يضيع. وتنسى [[clearTimeout]] فيبقى «delay» مش debounce. وتعمل [[debounce(fn, 300)]] جوه component بيترسم كل مرة (في React مثلًا) فكل رسمة بيبقى ليها timer جديد ومفيش حاجة بتتلغي: لازم تتعمل مرة واحدة ([[useMemo]] أو [[useRef]]). وتنسى [[cancel()]] لما الصفحة أو الـ component يتقفل، فالدالة بتتنادى على حاجة اتمسحت. و throttle من غير trailing بيضيّع آخر قيمة (آخر مكان للـ scroll مثلًا).`
          },
          teach: R`## الفكرة في سطر

debounce: «استنى لحد ما الناس تسكت، ونفّذ آخر طلب». throttle: «نفّذ مرة كل فترة، مهما الطلبات كترت». الكود اتشغّل على ويندوز 11 بـ Node 24.22، وشرح الفكرة والاستخدام في الصفحة موجود في درس «debounce و throttle» في وحدة الأداء والذاكرة.

---

## ١. الفرق في جدول

نفس ٥ نداءات ورا بعض بسرعة:

| | debounce (trailing) | debounce بـ [[leading]] | throttle |
|---|---|---|---|
| أول نداء | مبيتنفّذش دلوقتي | بيتنفّذ فورًا | بيتنفّذ فورًا |
| النداءات اللي في النص | كل واحد بيلغي اللي قبله | بتتجاهل وبتطوّل فترة السكوت | واحد بس منهم بيتحجز لآخر الفترة |
| إمتى بيتنفّذ تاني | بعد [[ms]] من **آخر** نداء | بعد سكوت [[ms]] وييجي نداء جديد | كل [[ms]] بالكتير مرة |
| مثال | البحث وانت بتكتب | زرار «احفظ» ميتضغطش مرتين | الـ scroll و [[mousemove]] |

---

## ٢. debounce سطر سطر

~~~text app.js
function debounce(fn, ms, { leading = false } = {}) {
  let timer = null;
~~~

- [[{ leading = false } = {}]]: الباراميتر التالت object، وبنفكّه (destructuring) ونحط قيمة افتراضية. و [[= {}]] اللي في الآخر عشان لو محدش بعت التالت خالص، منفكّش [[undefined]] (كان هيرمي TypeError).
- [[let timer = null]]: رقم الـ timer الحالي. ده عايش في الـ closure بين كل النداءات، وهو اللي بيخلّي النداء الجديد يعرف إن فيه قديم مستني.

~~~text app.js
  function debounced(...args) {
    const callNow = leading && timer === null;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!leading) fn.apply(this, args);
    }, ms);
    if (callNow) fn.apply(this, args);
  }
~~~

1. [[function debounced]] مش arrow: عشان [[this]] جواها يبقى اللي نادى ([[obj.save()]] ← [[obj]]). الـ arrow مالهاش [[this]] بتاعها.
2. [[callNow]]: «نفّذ دلوقتي» لو احنا في وضع [[leading]] **و** مفيش فترة سكوت شغالة. بنحسبها **قبل** ما نعمل timer جديد، وإلا [[timer]] هيبقى رقم دايمًا.
3. [[clearTimeout(timer)]]: الغي القديم. [[clearTimeout(null)]] مبيعملش حاجة ومبيرميش، فمش محتاجين [[if]].
4. [[setTimeout(() => {...}, ms)]]: الـ arrow هنا مقصودة: بتاخد [[this]] و [[args]] من [[debounced]].
5. [[timer = null]] جوه الـ timer: الفترة خلصت، فأول نداء بعدها يتعامل كـ «أول مرة» تاني (مهم للـ leading).
6. [[fn.apply(this, args)]]: نادي الأصلية بنفس الـ [[this]] ونفس الـ arguments كـ array. [[apply]] زي [[call]] بس بتاخد الـ arguments array.

~~~text app.js
  debounced.cancel = () => { clearTimeout(timer); timer = null; };
  return debounced;
}
~~~

الدوال objects، فينفع نعلّق عليها خاصية. [[cancel]] بتلغي النداء المستني، ودي اللي بتناديها لما الصفحة أو الـ component يتقفل.

---

## ٣. throttle سطر سطر

~~~text app.js
function throttle(fn, ms) {
  let last = -Infinity, timer = null, lastArgs, lastThis;
~~~

- [[last]]: وقت آخر تنفيذ بالـ milliseconds. بيبدأ [[-Infinity]] (سالب ما لا نهاية) عشان أول نداء يتنفّذ فورًا: أي وقت ناقص [[-Infinity]] بـ [[Infinity]]، أكبر من أي [[ms]].
- [[lastArgs]] و [[lastThis]]: آخر حاجة وصلت، عشان النداء المتحجز في آخر الفترة يتنفّذ بآخر قيمة مش بأول قيمة.

~~~text app.js
  return function (...args) {
    lastArgs = args; lastThis = this;
    const wait = ms - (Date.now() - last);
    if (wait <= 0) { last = Date.now(); fn.apply(this, args); return; }
    if (timer === null) timer = setTimeout(() => {
      timer = null; last = Date.now(); fn.apply(lastThis, lastArgs);
    }, wait);
  };
}
~~~

1. [[Date.now() - last]]: عدّى قد إيه من آخر تنفيذ. [[wait]]: فاضل قد إيه لحد ما يبقى مسموح.
2. [[wait <= 0]]: الفترة خلصت، نفّذ فورًا وسجّل الوقت.
3. غير كده، لو مفيش نداء محجوز، احجز واحد بعد [[wait]] بالظبط. ولو فيه واحد محجوز خلاص، النداء ده بس بيحدّث [[lastArgs]].

---

## ٤. التشغيل

~~~text الناتج (Node 24)
save 1
move 1
move 5
search jav
~~~

| السطر | اتطبع إمتى | ليه |
|---|---|---|
| [[save 1]] | فورًا، قبل أي timer | [[leading]]: أول نداء اتنفّذ، و [[save(2)]] جه وفترة السكوت شغالة فاتجاهل |
| [[move 1]] | فورًا | [[last]] كان [[-Infinity]]، فـ [[wait]] سالب |
| [[move 5]] | بعد حوالي 50ms | النداءات من 2 لـ 5 حجزت timer واحد، و [[lastArgs]] كان [[5]] ساعتها |
| [[search jav]] | بعد حوالي 100ms | [[j]] و [[ja]] اتلغوا بـ [[clearTimeout]]، وفضل آخر واحد بس |

جرّبت كمان الحالة اللي بتتسأل في الانترفيو: نسخة debounce بترجّع arrow وبتنادي [[fn(...a)]] على [[{ n: 7, f }]] طبعت [[undefined]] بدل 7، ونسخة من غير [[clearTimeout]] اتنادت ٣ مرات ونفّذت ٣ مرات.

---

## ٥. اختبرهم من غير ما تستنى

الاختبار اللي بيستنى 100ms حقيقية بطيء وبيفشل ساعات لو الجهاز مشغول. Node فيه fake timers جوه [[node:test]]:

~~~text debounce.test.mjs
import { test, mock } from "node:test";
import assert from "node:assert/strict";
test("debounce: آخر نداء بس", () => {
  mock.timers.enable({ apis: ["setTimeout", "Date"] });
  const calls = [];
  const f = debounce((x) => calls.push(x), 100);
  f(1); mock.timers.tick(60); f(2); mock.timers.tick(60);
  assert.deepEqual(calls, []);
  mock.timers.tick(40);
  assert.deepEqual(calls, [2]);
  mock.timers.reset();
});
~~~

- [[mock.timers.enable]]: بيبدّل [[setTimeout]] و [[Date]] بنسخة مزيفة الوقت فيها مبيتحركش لوحده.
- [[mock.timers.tick(60)]]: «حرّك الساعة 60ms»، وأي timer وقته جه بيتنفّذ فورًا.
- بعد 60 + 60 = 120ms مفيش حاجة اتنفّذت، لأن [[f(2)]] عند 60 لغت الأول وبدأت عدّ جديد. بعد 40 كمان (100 من آخر نداء) [[calls]] بقت [[[2]]].

~~~text الناتج (node --test، مع اختبار throttle واختبار this)
✔ debounce: آخر نداء بس، بعد 100ms من آخر نداء (2.0846ms)
✔ throttle: الأول فورًا والأخير في آخر الفترة (0.3279ms)
✔ this بيوصل (0.9489ms)
ℹ tests 3
ℹ pass 3
~~~

الاختبار كله خلص في ٢ ملي ثانية مع إنه «بيستنى» 160ms. وفي Vitest نفس الفكرة: [[vi.useFakeTimers()]] و [[vi.advanceTimersByTime(100)]].

---

## ٦. الأسئلة اللي بتيجي بعد الكود

| السؤال | الإجابة المختصرة |
|---|---|
| ليه [[function]] مش arrow؟ | عشان [[this]] بتاع اللي نادى يوصل للأصلية بـ [[apply]] |
| لو المستخدم فضل يكتب ١٠ ثواني؟ | debounce مش هينفّذ ولا مرة؛ الحل خيار [[maxWait]] (زي lodash) بينفّذ غصب عنه كل فترة |
| throttle بـ [[requestAnimationFrame]]؟ | بدل رقم ثابت، نفّذ مرة كل frame: احجز بـ [[requestAnimationFrame]] لو مفيش حاجة محجوزة |
| إزاي تستخدمه في React؟ | اعمله مرة واحدة بـ [[useMemo]] أو [[useRef]]، ونادي [[cancel()]] في الـ cleanup بتاع [[useEffect]] |
| الدالة الأصلية بترجّع قيمة؟ | debounce مش بيرجّعها (النداء بيحصل بعدين)؛ لو محتاجها رجّع Promise |

---

## الخلاصة

| الدالة | بتحفظ إيه في الـ closure | القاعدة |
|---|---|---|
| debounce | [[timer]] واحد | كل نداء يلغي القديم ويبدأ عدّ جديد |
| debounce بـ [[leading]] | [[timer]] كفترة سكوت | نفّذ لو مفيش فترة شغالة، وطوّلها مع كل نداء |
| throttle | [[last]] و [[timer]] و [[lastArgs]] | نفّذ لو عدّى [[ms]]، وإلا احجز واحد بآخر قيمة |

- رجّع [[function]] عادية ونادي [[fn.apply(this, args)]].
- [[cancel()]] جزء من الإجابة، مش زيادة.
- اختبرهم بـ fake timers، مش بـ [[await sleep(100)]].`,
          lines: [
            R`[[debounce]] بتاخد الدالة الأصلية، والمدة بالـ milliseconds، و object خيارات فيه [[leading]] (افتراضي [[false]]). الـ [[= {}]] الأخيرة بتخلّي النداء من غير خيارات ميقعش.`,
            R`رقم الـ timer الحالي، أو [[null]] لو مفيش حاجة مستنية. عايش في الـ closure، فكل النداءات اللي جاية شايفة نفس المتغير.`,
            R`الدالة اللي هترجع للمستخدم. [[function]] عادية مش arrow عشان [[this]] جواها يبقى اللي نادى، و [[...args]] بتلم كل الـ arguments في array.`,
            R`في وضع [[leading]]، نفّذ دلوقتي لو مفيش فترة سكوت شغالة. بنحسبها قبل ما نعمل timer جديد، لأن بعده [[timer]] هيبقى رقم دايمًا.`,
            R`الغي الـ timer القديم لو فيه. ده قلب الـ debounce: من غيره كل نداء هيتنفّذ متأخر بس، ومش هيتلغى حاجة.`,
            R`ابدأ عدّ جديد. الـ arrow هنا مقصودة: بتاخد [[this]] و [[args]] من [[debounced]] اللي حواليها.`,
            R`الفترة خلصت: رجّع [[timer]] لـ [[null]] عشان أول نداء بعد كده يتعامل كأنه أول مرة (مهم للـ leading).`,
            R`في الوضع العادي (trailing) نفّذ الأصلية هنا، بآخر arguments و [[this]]. [[apply]] بتاخد الـ [[this]] والـ arguments كـ array.`,
            R`قفلة الـ timer، والمدة [[ms]] اللي بيستناها.`,
            R`في وضع [[leading]] التنفيذ بيحصل هنا فورًا، والـ timer اللي فوق بيشتغل بس كفترة سكوت.`,
            R`نهاية [[debounced]].`,
            R`[[cancel]] خاصية متعلّقة على الدالة نفسها (الدوال objects)، بتلغي أي نداء مستني. بتناديها لما الصفحة أو الـ component يتقفل.`,
            R`رجّع الدالة الجديدة، وهي اللي هتستخدمها مكان الأصلية في الـ event listener.`,
            R`نهاية [[debounce]].`,
            R`[[throttle]]: نفّذ مرة بالكتير كل [[ms]].`,
            R`[[last]] وقت آخر تنفيذ، وبيبدأ [[-Infinity]] عشان أول نداء يتنفّذ فورًا. [[timer]] للنداء المحجوز، و [[lastArgs]] و [[lastThis]] آخر حاجة وصلت.`,
            R`الدالة اللي بترجع، [[function]] عادية برضه عشان [[this]].`,
            R`احفظ آخر arguments وآخر [[this]] مع كل نداء، عشان النداء المحجوز ينفّذ بأحدث قيمة مش بأقدم واحدة.`,
            R`[[wait]] = فاضل قد إيه لحد ما يبقى مسموح. [[Date.now() - last]] = عدّى قد إيه من آخر تنفيذ بالـ milliseconds.`,
            R`لو الفترة خلصت ([[wait]] صفر أو سالب): سجّل الوقت، ونفّذ فورًا، واخرج بـ [[return]].`,
            R`غير كده: لو مفيش نداء محجوز، احجز واحد بعد [[wait]] بالظبط. ولو فيه واحد محجوز، النداء ده كفاية إنه حدّث [[lastArgs]] فوق.`,
            R`لما الحجز ييجي: فضّي [[timer]]، وسجّل الوقت، ونفّذ بآخر قيمة. كده آخر نداء عمره ما بيضيع.`,
            R`قفلة الحجز، والمدة هي [[wait]] مش [[ms]]، عشان التنفيذ ييجي في آخر الفترة بالظبط.`,
            R`نهاية الدالة اللي بترجع.`,
            R`نهاية [[throttle]].`,
            R`[[search]] نسخة debounced من دالة بتطبع، بمدة 100ms.`,
            R`٣ نداءات ورا بعض: كل واحد بيلغي اللي قبله، فبعد 100ms من آخر واحد بيتطبع [[search jav]] بس.`,
            R`[[save]] debounce بـ [[leading: true]]: أول نداء يتنفّذ فورًا.`,
            R`[[save(1)]] بيطبع [[save 1]] فورًا، و [[save(2)]] جه وفترة السكوت شغالة فاتجاهل. ده اللي بيمنع زرار «احفظ» يبعت مرتين.`,
            R`[[move]] نسخة throttled بمدة 50ms.`,
            R`٥ نداءات في نفس اللحظة: الأول بيطبع [[move 1]] فورًا، والباقي بيحجزوا نداء واحد بيطبع [[move 5]] بعد 50ms. الناتج كله بالترتيب: [[save 1]] و [[move 1]] و [[move 5]] و [[search jav]].`,
          ],
          sol: R`[[flush]] بتشوف لو فيه timer مستني: تلغيه وتنفّذ الأصلية بآخر [[args]] و [[this]] (لازم تحفظهم في الـ closure زي [[lastArgs]] في الـ throttle)، وترجّع [[timer]] لـ [[null]]. [[search("x"); search.flush();]] بيطبع [[search x]] فورًا، ومبيطبعش حاجة تاني بعد 100ms لأن الـ timer اتلغى (جرّبتها في Node 24).

[[{ trailing: false }]] في الـ throttle: لو [[trailing]] بـ [[false]] متحجزش timer خالص، فالنداءات اللي في النص بتضيع. بـ ٥ نداءات ورا بعض بيتطبع [[move 1]] بس. ده مناسب لزرار مش عايز تكرره، ومش مناسب للـ scroll لأن آخر مكان هيضيع.`,
          solCode: R`function debounce(fn, ms) {
  let timer = null, lastArgs, lastThis;
  function debounced(...args) {
    lastArgs = args; lastThis = this;
    clearTimeout(timer);
    timer = setTimeout(() => { timer = null; fn.apply(lastThis, lastArgs); }, ms);
  }
  debounced.cancel = () => { clearTimeout(timer); timer = null; };
  debounced.flush = () => {
    if (timer === null) return;
    clearTimeout(timer); timer = null;
    fn.apply(lastThis, lastArgs);
  };
  return debounced;
}
const search = debounce((q) => console.log("search", q), 100);
search("x");
search.flush(); // search x فورًا، ومفيش حاجة بعد 100ms`
        },
        {
          cmd: "memoize",
          title: "تحفظ نتيجة دالة عشان متتحسبش تاني بنفس المدخلات (memoize)",
          desc: R`[[memoize(fn)]] بترجّع نسخة من [[fn]] بتفتكر: أول مرة تتنادى بمدخلات معينة بتحسب وتحفظ النتيجة في [[Map]]، وأي مرة بعد كده بنفس المدخلات بترجّع المحفوظ من غير ما تحسب. ده بيحوّل [[fib(50)]] من حاجة مبتخلصش لـ أقل من ملي ثانية.

السؤال في الانترفيو مش بس «اكتبها»: هيسألك المفتاح بيتعمل إزاي لو فيه أكتر من argument، وليه [[cache.has]] مش [[if (cache.get(key))]]، وإيه اللي يحصل للميموري، وإزاي تعمل memoize لدالة async من غير ما تحفظ الفشل.`,
          example: R`function memoize(fn, keyFn = (...args) => JSON.stringify(args)) {
  const cache = new Map();
  return function (...args) {
    const key = keyFn(...args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
let calls = 0;
const square = memoize((n) => { calls++; return n * n; });
console.log(square(4), square(4), square(5), calls); // 16 16 25 2
const fib = memoize((n) => (n < 2 ? n : fib(n - 1) + fib(n - 2)));
console.log(fib(50));                                 // 12586269025`,
          try: R`ضيف خيار [[max]]: الـ cache ميشيلش أكتر من [[max]] نتيجة، ولما يتملي يمسح **أقدم واحدة اتستخدمت** (LRU). الـ [[Map]] بتحافظ على ترتيب الإضافة، فلما تقرا مفتاح امسحه وحطه تاني عشان يروح للآخر، والأقدم يبقى [[cache.keys().next().value]]. اكتب [[memoize]] الأساسية في المربع اللي تحت ودوس «شغّل واختبر».`,
          practice: [
            { lvl: 'سريع', t: R`قارن وقيس: [[function slowFib(n) { return n < 2 ? n : slowFib(n - 1) + slowFib(n - 2); }]]. قيس بـ [[performance.now()]] تلات حاجات: [[slowFib(32)]]، و [[const wrapped = memoize(slowFib)]] ونداء [[wrapped(32)]] مرتين، و [[fib(32)]] بتاع الدرس.`, done: R`على جهازي (Node 24): [[slowFib(32)]] حوالي 21ms، و [[wrapped(32)]] أول مرة حوالي 22ms (مفيش أي فرق!) وتاني مرة 0.008ms، و [[fib(32)]] بتاع الدرس 0.1ms. وتقدر تشرح ليه: [[slowFib]] بتنادي نفسها مش [[wrapped]]، فالـ recursion جوه مبيعدّيش على الـ cache خالص؛ الـ memo بيفيد الـ recursion بس لو الدالة بتنادي النسخة الـ memoized.` },
            { lvl: 'تطبيق', t: R`صلّح الكود البايظ: [[const bad = (fn) => { const c = {}; return (x) => c[x] || (c[x] = fn(x)); };]] فيه باج لما الدالة ترجّع [[0]] أو [[""]] أو [[false]]. وكمان نسخة بتعمل المفتاح [[args.join()]]: جرّب [[m(1, 2)]] و [[m("1,2")]].`, done: R`مع [[bad(() => 0)]] ونداء [[z(1)]] ٣ مرات، الدالة الأصلية بتتنادى ٣ مرات مش مرة (الـ [[0]] falsy فالـ [[||]] بيحسب تاني)، وبعد ما تستخدم [[Map]] و [[has]] بتتنادى مرة. و [[[1, 2].join()]] و [[["1,2"].join()]] الاتنين [["1,2"]] فالنداءين بياخدوا نفس النتيجة غلط، و [[JSON.stringify]] بيفرّق بينهم: الأول بيبقى [[[1,2]]] والتاني فيه علامات التنصيص حوالين [["1,2"]].` },
            { lvl: 'تحدي', t: R`محاكاة: [[memoizeAsync(fn)]] لدالة بتجيب يوزر من API (اعملها [[async (id) => { hits++; if (id < 0) throw new Error("bad id"); return { id }; }]]). المطلوب: نداءين في نفس اللحظة لنفس [[id]] يعملوا request واحد بس (احفظ الـ Promise نفسه مش النتيجة)، ولو الـ Promise اترفض يتشال من الـ cache عشان المحاولة الجاية تجرّب تاني.`, done: R`[[await Promise.all([getUser(1), getUser(1)])]] بيرجّع نفس الـ object مرتين ([[a === b]] بـ [[true]]) و [[hits]] بـ 1. وبـ [[memoize]] بتاع الدرس زي ما هو، [[getUser(-1)]] مرتين بيرمي [[bad id]] مرتين بس [[hits]] بيزيد مرة واحدة (الفشل اتحفظ!). بعد ما تضيف [[.catch((e) => { cache.delete(key); throw e; })]] المحاولة التانية بتنادي الدالة تاني فعلًا.` },
          ],
          flag: "script",
          deep: {
            why: "memoize بيختبر closures (الـ cache فاضل عايش)، و Map، والتفكير في المفتاح والميموري. وهي الفكرة اللي ورا useMemo و React.memo و reselect، وورا الـ dynamic programming في أسئلة الخوارزميات (fib و climbing stairs و coin change).",
            how: R`الـ cache [[Map]] جوه closure: المفتاح بيتعمل من الـ arguments، والقيمة النتيجة. [[JSON.stringify(args)]] مفتاح كويس للأرقام والنصوص والـ objects البسيطة، و [[keyFn]] بتخلّي اللي بيستخدمها يختار مفتاح تاني (مثلًا [[(user) => user.id]]).

[[cache.has(key)]] مش [[cache.get(key)]] عشان النتيجة ممكن تبقى [[0]] أو [[undefined]]. و [[fn.apply(this, args)]] عشان [[this]] يوصل.

الـ recursion بيستفيد بس لو الدالة بتنادي النسخة الـ memoized ([[fib]] نفسها memoized هنا). [[fib(50)]] من غير memo محتاجة حوالي ٤٠ مليار نداء، ومعاه ٥١ حساب بس.

الميموري: الـ cache بيكبر للأبد. الحلول: حد أقصى بـ LRU، أو [[WeakMap]] لو الـ argument object واحد (بيتمسح لما الـ object يتمسح)، أو مدة صلاحية.`,
            when: R`دالة pure (نفس المدخلات دايمًا نفس الناتج ومن غير side effects)، وغالية، وبتتنادى بنفس المدخلات كتير: حسابات، وparsing، وفلترة لستة كبيرة بنفس الفلتر. متعملهاش لدالة بتقرا الوقت أو random أو state برّه، ولا لدالة رخيصة (الـ [[JSON.stringify]] نفسه ممكن يبقى أغلى من الحساب).`,
            mistakes: R`[[if (cache.get(key))]] فالنتايج الـ falsy بتتحسب كل مرة. و [[args.join()]] أو [[String(args)]] كمفتاح فـ [[(1, 2)]] و [[("1,2")]] بيتلخبطوا. و [[JSON.stringify]] نفسه بيخلّي [[undefined]] و [[null]] نفس المفتاح ([[[undefined]]] و [[[null]]] الاتنين [["[null]"]])، وبيحترم ترتيب المفاتيح، فـ [[{ a: 1, b: 2 }]] و [[{ b: 2, a: 1 }]] مفتاحين مختلفين والنتيجة بتتحسب مرتين. و memoize لدالة async بتحفظ الـ Promise المرفوض. ونسيان إن الـ cache مبيتمسحش أبدًا.`
          },
          teach: R`## الفكرة في سطر

[[memoize(fn)]] بترجّع دالة جديدة معاها كراسة ([[Map]]): قبل ما تحسب بتبص في الكراسة، ولو لقت الإجابة بترجّعها، ولو ملقتهاش بتحسب وتكتب. الكود اتشغّل على ويندوز 11 بـ Node 24.22.

---

## ١. الدالة سطر سطر

~~~text app.js
function memoize(fn, keyFn = (...args) => JSON.stringify(args)) {
  const cache = new Map();
~~~

- [[fn]]: الدالة الأصلية اللي عايزين نسرّعها.
- [[keyFn]]: دالة بتحوّل الـ arguments لمفتاح واحد. القيمة الافتراضية [[JSON.stringify(args)]]: [[square(4)]] مفتاحها النص [["[4]"]]، و [[add(1, 2)]] مفتاحها [["[1,2]"]].
- [[const cache = new Map()]]: الكراسة. متعرّفة **برّه** الدالة اللي بترجع، فبتفضل عايشة بين كل النداءات (closure، درس «closure» في المستوى ٢). وكل [[memoize(...)]] ليها كراسة لوحدها.

~~~text app.js
  return function (...args) {
    const key = keyFn(...args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
~~~

1. [[function (...args)]]: [[function]] عادية عشان [[this]]، و [[...args]] بتلم الـ arguments في array.
2. [[keyFn(...args)]]: اعمل المفتاح.
3. [[cache.has(key)]]: المفتاح موجود؟ رجّع المحفوظ. لازم [[has]] مش [[get]]: لو النتيجة [[0]]، [[if (cache.get(key))]] هيشوفها false ويحسب تاني.
4. [[fn.apply(this, args)]]: احسب بالدالة الأصلية بنفس [[this]] ونفس الـ arguments.
5. [[cache.set(key, result)]] و [[return result]]: اكتب في الكراسة ورجّع.

---

## ٢. التشغيل

~~~text app.js
let calls = 0;
const square = memoize((n) => { calls++; return n * n; });
console.log(square(4), square(4), square(5), calls);
const fib = memoize((n) => (n < 2 ? n : fib(n - 1) + fib(n - 2)));
console.log(fib(50));
~~~

~~~text الناتج (Node 24)
16 16 25 2
12586269025
~~~

- [[calls]] بـ 2 مش 3: [[square(4)]] التانية جت من الكراسة. [[calls]] بيتقري **بعد** ما الـ ٣ نداءات اتنفذوا لأن الـ arguments بتتحسب من الشمال لليمين قبل [[console.log]].
- [[fib]] بتنادي [[fib]] نفسها، و [[fib]] هنا هي النسخة الـ memoized، فكل [[fib(k)]] بيتحسب مرة واحدة بس: ٥١ حساب لـ [[fib(50)]]. من غير memo، [[fib(50)]] بتنادي نفسها حوالي ٤٠ مليار مرة.

### قيست الفرق

~~~text الناتج (Node 24، ويندوز 11)
slowFib(32) 21.0 ms
memo fib(32) 0.096 ms
memoize(slowFib)(32) first 22.3 ms
second 0.008 ms
~~~

السطر التالت هو الفخ: [[memoize(slowFib)]] أول مرة بنفس بطء الأصلية، لأن [[slowFib]] جواها بتنادي [[slowFib]] الأصلية مش النسخة الـ memoized. الكراسة بتستفيد منها بس النداءات اللي **بتعدّي عليها**.

---

## ٣. المفتاح: الحتة اللي بتتسأل عليها

~~~text الناتج (node -e)
[null] [null] 1,2 1,2
~~~

ده [[JSON.stringify([undefined])]] و [[JSON.stringify([null])]] و [[[1, 2].join()]] و [[["1,2"].join()]]:

| المفتاح | المشكلة | الحل |
|---|---|---|
| [[args.join()]] أو [[String(args)]] | [[(1, 2)]] و [[("1,2")]] نفس المفتاح | [[JSON.stringify(args)]] بيحط علامات التنصيص |
| [[JSON.stringify(args)]] | [[undefined]] و [[null]] نفس المفتاح، والدوال والـ Map بتتحوّل [[null]] أو [[{}]] | [[keyFn]] مخصوصة للحالة دي |
| [[JSON.stringify]] لـ object كبير | تحويله لنص ممكن ياخد وقت أكتر من الحساب نفسه | [[keyFn]] بترجّع [[user.id]] بس |
| object كـ مفتاح مباشرة | الـ [[Map]] بتقارن بالـ reference، فـ object جديد بنفس المحتوى مفتاح جديد | [[WeakMap]] لو ده المقصود (وبتتمسح لوحدها) |

---

## ٤. الميموري و async

الكراسة بتكبر للأبد: لو الدالة بتتنادى بمليون مدخل مختلف، فيه مليون نتيجة في الميموري (درس «memory leaks»). الحل الشائع LRU (Least Recently Used): حد أقصى، ولما تتملي امسح أقدم حاجة اتستخدمت. ده المطلوب في «جرّب».

ومع دالة async، اللي بيتحفظ هو الـ Promise. ده كويس (نداءين في نفس اللحظة بيعملوا request واحد)، بس الـ Promise المرفوض بيتحفظ كمان:

~~~text الناتج (Node 24)
true 1
bad id
bad id 2
~~~

- [[true 1]]: [[getUser(1)]] مرتين في [[Promise.all]] رجّعوا نفس الـ object و [[hits]] بـ 1.
- [[getUser(-1)]] مرتين: الاتنين رموا [[bad id]]، بس [[hits]] بقى 2 بس (1 للـ id 1 و 1 للـ -1)، يعني المحاولة التانية مجرّبتش تاني: الفشل اتحفظ. الحل [[.catch]] بتمسح المفتاح وترمي الـ error تاني (التمرين التالت).

---

## الخلاصة

| النقطة | ليه | اللي تقوله في الانترفيو |
|---|---|---|
| [[Map]] في closure | الكراسة تعيش بين النداءات | كل [[memoize]] ليها cache لوحدها |
| [[has]] مش [[get]] | النتيجة ممكن تبقى [[0]] أو [[undefined]] | [[if (cache.get(k))]] بيحسب الـ falsy تاني |
| [[JSON.stringify(args)]] | مفتاح لأكتر من argument | ومعاه [[keyFn]] للحالات الخاصة |
| الـ recursion | لازم تنادي النسخة الـ memoized | [[memoize(slowFib)]] مبيسرّعش أول نداء |
| الميموري و async | الكراسة مبتتمسحش، والفشل بيتحفظ | LRU، و [[cache.delete]] في الـ [[catch]] |`,
          lines: [
            R`[[memoize]] بتاخد الدالة الأصلية، ودالة اختيارية بتعمل المفتاح من الـ arguments. الافتراضي [[JSON.stringify(args)]]، فـ [[(1, 2)]] مفتاحها النص [["[1,2]"]].`,
            R`الكراسة: [[Map]] من المفتاح للنتيجة. متعرّفة برّه الدالة اللي بترجع فبتفضل عايشة بين النداءات، وكل نداء لـ [[memoize]] بيعمل واحدة جديدة.`,
            R`الدالة اللي بترجع وهتستخدمها بدل الأصلية. [[function]] عادية عشان [[this]]، و [[...args]] بتلم الـ arguments في array.`,
            R`اعمل المفتاح من الـ arguments بالدالة اللي اتبعتت أو الافتراضية.`,
            R`المفتاح موجود؟ رجّع النتيجة المحفوظة من غير حساب. [[has]] مش [[get]] عشان النتيجة لو [[0]] أو [[undefined]] متتحسبش كل مرة.`,
            R`مش موجود: احسب بالدالة الأصلية بنفس [[this]] ونفس الـ arguments. [[apply]] بتاخد الـ arguments كـ array.`,
            R`اكتب النتيجة في الكراسة عشان المرة الجاية.`,
            R`رجّع النتيجة اللي اتحسبت لسه، وهي نفس اللي هيرجع من الكراسة في النداءات الجاية.`,
            R`نهاية الدالة اللي بترجع.`,
            R`نهاية [[memoize]].`,
            R`عدّاد بيقول الدالة الأصلية اتنادت كام مرة فعلًا، عشان نشوف الكراسة بتشتغل.`,
            R`[[square]] نسخة memoized من دالة بتزوّد العدّاد وترجّع المربّع.`,
            R`[[square(4)]] الأولى بتحسب، والتانية من الكراسة، و [[square(5)]] مفتاح جديد فبتحسب. فـ [[calls]] بـ 2 مش 3، والناتج [[16 16 25 2]].`,
            R`[[fib]] بتنادي [[fib]] نفسها، وهي هنا النسخة الـ memoized، فكل رقم بيتحسب مرة واحدة. لو [[fib]] كانت بتنادي نسخة مش memoized، الكراسة مكانتش هتفيد الـ recursion.`,
            R`[[fib(50)]] بتخلص فورًا بـ ٥١ حساب. من غير memo كانت هتحتاج حوالي ٤٠ مليار نداء. والرقم [[12586269025]] أقل من [[Number.MAX_SAFE_INTEGER]] فمظبوط؛ بعد [[fib(78)]] الأرقام بتبدأ تبقى تقريبية ومحتاج [[BigInt]].`,
          ],
          sol: R`LRU بـ [[Map]]: لما تلاقي المفتاح، امسحه وحطه تاني ([[cache.delete(key); cache.set(key, value)]]) عشان يروح لآخر الترتيب. ولما تضيف جديد و [[cache.size]] عدّى [[max]]، امسح [[cache.keys().next().value]] (أول مفتاح = أقدم واحد اتستخدم).

جرّبت بـ [[max: 2]]: [[f(1); f(2); f(1); f(3);]] بيمسح [[2]] مش [[1]] (لأن [[1]] اتستخدم تاني)، فـ [[f(1)]] بعدها من الكراسة و [[f(2)]] بتتحسب تاني، والـ [[calls]] بيزيد ٤ مرات بالظبط: 1 و 2 و 3 وبعدين 2 تاني.`,
          solCode: R`function memoize(fn, { max = Infinity, keyFn = (...a) => JSON.stringify(a) } = {}) {
  const cache = new Map();
  return function (...args) {
    const key = keyFn(...args);
    if (cache.has(key)) {
      const value = cache.get(key);
      cache.delete(key); cache.set(key, value); // روح لآخر الترتيب
      return value;
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    if (cache.size > max) cache.delete(cache.keys().next().value);
    return result;
  };
}
let calls = 0;
const f = memoize((n) => { calls++; return n * 10; }, { max: 2 });
f(1); f(2); f(1); f(3); // الكراسة: 1 و 3 (اتمسح 2)
f(1); f(2);
console.log(calls); // 4`,
          check: {
            lang: "js",
            starter: R`function memoize(fn) {
  // رجّع دالة بتفتكر النتايج
}`,
            tests: R`test("نفس المدخلات ← الأصلية بتتنادى مرة واحدة", () => {
  let calls = 0;
  const sq = memoize((n) => { calls++; return n * n; });
  expect([sq(4), sq(4), sq(4), calls]).toEqual([16, 16, 16, 1]);
});
test("مدخلات مختلفة ← نتايج مختلفة", () => {
  const sq = memoize((n) => n * n);
  expect([sq(2), sq(3)]).toEqual([4, 9]);
});
test("النتيجة 0 أو undefined بتتحفظ برضه (has مش get)", () => {
  let calls = 0;
  const zero = memoize(() => { calls++; return 0; });
  const none = memoize(() => { calls++; });
  zero(1); zero(1); none(1); none(1);
  expect(calls).toBe(2);
});
test("أكتر من argument: (1, 2) غير (2, 1) وغير (\"1,2\")", () => {
  const f = memoize((...a) => a.length + ":" + a.join("-"));
  expect([f(1, 2), f(2, 1), f("1,2")]).toEqual(["2:1-2", "2:2-1", "1:1,2"]);
});
test("this بيوصل للدالة الأصلية", () => {
  const obj = { base: 10, add: memoize(function (n) { return this.base + n; }) };
  expect(obj.add(5)).toBe(15);
});
test("fib recursive بالـ memo بيخلص فورًا", () => {
  const fib = memoize((n) => (n < 2 ? n : fib(n - 1) + fib(n - 2)));
  expect(fib(70)).toBe(190392490709135);
});`,
            solution: R`function memoize(fn, keyFn = (...args) => JSON.stringify(args)) {
  const cache = new Map();
  return function (...args) {
    const key = keyFn(...args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}`
          }
        },
        {
          cmd: "deepClone و structuredClone",
          title: "تنسخ object نسخة عميقة: بإيدك بـ WeakMap ولا structuredClone",
          desc: R`«اكتب deepClone» بيتسأل بعد deep equal على طول، وهو نفس الـ recursion بس بيبني بدل ما يقارن. المطلوب يتعامل مع Date و RegExp و Map و Set، ومع object بيشاور على نفسه (circular) من غير stack overflow، وده بيتحل بـ [[WeakMap]] بتفتكر كل object اتنسخ ونسخته.

وفي الشغل الإجابة الأولى [[structuredClone(value)]]: مدمجة في المتصفح و Node، وبتعمل كل ده لوحدها. الانترفيو عايز يسمع الاتنين: إزاي تكتبها، وإيه اللي [[structuredClone]] مبتعملوش (الدوال، والـ class prototype)، وليه [[JSON.parse(JSON.stringify(x))]] مش نسخة.`,
          example: R`function deepClone(value, seen = new WeakMap()) {
  if (typeof value !== "object" || value === null) return value;
  if (seen.has(value)) return seen.get(value);
  if (value instanceof Date) return new Date(value.getTime());
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);
  if (value instanceof Map) {
    const out = new Map();
    seen.set(value, out);
    for (const [k, v] of value) out.set(k, deepClone(v, seen));
    return out;
  }
  if (value instanceof Set) {
    const out = new Set();
    seen.set(value, out);
    for (const v of value) out.add(deepClone(v, seen));
    return out;
  }
  const out = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
  seen.set(value, out);
  for (const key of Object.keys(value)) out[key] = deepClone(value[key], seen);
  return out;
}
const user = { name: "Sara", born: new Date(0), tags: new Set(["admin"]), scores: [1, [2, 3], 4] };
user.self = user;
const a = deepClone(user);
const b = structuredClone(user);
console.log(a !== user, a.self === a, b.self === b);                    // true true true
console.log(a.born instanceof Date, a.tags.has("admin"), a.scores[1] !== user.scores[1]); // true true true
class Point { constructor(x) { this.x = x; } double() { return this.x * 2; } }
console.log(deepClone(new Point(3)).double(), structuredClone(new Point(3)) instanceof Point); // 6 false`,
          try: R`جرّب [[structuredClone({ save() {} })]] واقرا الـ error، وبعدين نفس الـ object بـ [[deepClone]] بتاعك. وبعدين اعمل object فيه حتتين بيشاوروا على نفس الـ array ([[const shared = [1]; const o = { x: shared, y: shared };]]) واتأكد إن في النسخة [[c.x === c.y]] لسه [[true]]. اكتب [[deepClone]] في المربع اللي تحت ودوس «شغّل واختبر».`,
          practice: [
            { lvl: 'سريع', t: R`اقرا وتوقّع: [[const o = { d: new Date(0), u: undefined, n: NaN, m: new Map([ [1, 2] ]) }; const o2 = JSON.parse(JSON.stringify(o)); console.log(o2, typeof o2.d);]]، وبعدين [[const c = {}; c.c = c; JSON.stringify(c);]]. اكتب الناتج على ورقة قبل ما تشغّل.`, done: R`الناتج في Node 24: [[{ d: '1970-01-01T00:00:00.000Z', n: null, m: {} } string]]: الـ Date بقت نص، و [[u]] اختفى خالص، و [[NaN]] بقى [[null]]، والـ Map بقت object فاضي. والتاني بيرمي [[TypeError]] رسالته بتبدأ بـ [[Converting circular structure to JSON]]. وتقدر تقول ٤ حاجات JSON بيبوّظها في النسخ.` },
            { lvl: 'تطبيق', t: R`صلّح الكود البايظ: نسخة [[deepClone]] فيها [[seen.set(value, out)]] بعد اللفة على المفاتيح مش قبلها (يعني بعد ما ينسخ العيال). جرّبها على [[const o = { v: 1 }; o.self = o;]].`, done: R`قبل التصليح بترمي [[RangeError: Maximum call stack size exceeded]]: لما بتوصل لـ [[o.self]] الـ [[seen]] لسه فاضي، فبتبدأ تنسخ [[o]] من الأول للأبد. بعد ما تنقل [[seen.set]] قبل اللفة: [[c.self === c]] بـ [[true]]، وتقدر تشرح في سطر ليه لازم تسجّل النسخة **قبل** ما تنزل جوه.` },
            { lvl: 'تحدي', t: R`قارن وقيس: array فيها ١٠٠ ألف object بالشكل [[{ id: i, name: "user" + i, tags: ["a", "b"], meta: { score: i % 7 } }]]. قيس بـ [[performance.now()]] الوقت بتاع [[deepClone]] و [[structuredClone]] و [[JSON.parse(JSON.stringify(x))]]، كل واحدة مرتين.`, done: R`عندي (Node 24، ويندوز 11) طلع [[deepClone]] حوالي 190–210ms، و [[structuredClone]] حوالي 205ms، و JSON حوالي 100–110ms. يعني JSON أسرع **للداتا البسيطة** دي، بس بيبوّظ Date و Map و undefined (التمرين الأول). كتبت الأرقام بتاعتك، وجملة إمتى تستخدم أنهي واحدة.` },
          ],
          flag: "script",
          deep: {
            why: "deepClone بيختبر recursion، والتفرقة بين الأنواع (Date و Map مش زي object عادي)، والمراجع الدائرية، وده نفس اللي بيحصل في state management (نسخة مستقلة قبل التعديل)، وفي إرسال الداتا لـ Web Worker أو [[postMessage]] (اللي بيستخدم نفس خوارزمية structuredClone).",
            how: R`القيم البسيطة (primitives) بترجع زي ما هي لأنها مبتتغيرش. الـ objects بتتفصّل حسب النوع: Date بـ [[getTime()]]، و RegExp بـ [[source]] و [[flags]]، و Map و Set بلفة على العناصر، والـ arrays والـ objects بلفة على [[Object.keys]].

الـ [[WeakMap]] اسمها [[seen]]: من الأصل للنسخة. قبل ما تنزل جوه أي object بتسجّل نسخته الفاضية، فلو قابلته تاني (circular أو حتتين بيشاوروا على نفس الحاجة) بترجّع نفس النسخة. [[WeakMap]] مش [[Map]] عشان المفاتيح متفضلش ماسكة الميموري بعد ما النسخ يخلص.

[[Object.create(Object.getPrototypeOf(value))]] بتحافظ على الـ prototype، فالـ methods بتاعة الـ class بتشتغل في النسخة، وده فرق عن [[structuredClone]] اللي بترجّع object عادي. بس الـ class اللي فيها private fields ([[#x]]) النسخة مبيبقاش فيها الـ field، والـ methods اللي بتستخدمه بترمي TypeError.`,
            when: R`في الشغل: [[structuredClone]] لأي داتا عادية (JSON-like و Date و Map و Set). [[deepClone]] بإيدك لو محتاج تحافظ على class instances أو تنسخ دوال (بالـ reference)، أو مكتبة زي [[lodash.cloneDeep]]. وفي React و Redux غالبًا مش محتاج deep clone خالص: نسخة سطحية للمستوى اللي بيتغير بس (درس «immutability»)، أو Immer.`,
            mistakes: R`[[JSON.parse(JSON.stringify(x))]] كـ deep clone: Date بتبقى نص، و undefined بيختفي، و NaN بيبقى null، والـ Map بتبقى [[{}]]، والـ circular بيرمي. وتسجّل في [[seen]] بعد النسخ مش قبله فالـ circular يوقع. وتنسخ مفاتيح الـ Map كمان (غالبًا الـ key المفروض يفضل نفس الـ reference). وتفتكر إن [[structuredClone]] بتنسخ الدوال: بترمي [[DataCloneError]].`
          },
          teach: R`## الفكرة في سطر

[[deepClone]] بتمشي على الـ object مستوى مستوى، وكل حاجة مش primitive بتعمل لها نسخة جديدة من نفس النوع. و [[seen]] دفتر بيفتكر «الأصل ده نسخته فين»، فالـ object اللي بيشاور على نفسه ميخلّيهاش تلف للأبد. الكود اتشغّل على ويندوز 11 بـ Node 24.22.

---

## ١. الدالة سطر سطر

~~~text app.js
function deepClone(value, seen = new WeakMap()) {
  if (typeof value !== "object" || value === null) return value;
  if (seen.has(value)) return seen.get(value);
~~~

1. [[seen = new WeakMap()]]: الدفتر، بيتعمل مرة واحدة في أول نداء، وبيتبعت لكل نداء جوه. [[WeakMap]] زي [[Map]] بس مفاتيحها objects بس، ومبتمنعش الـ object يتمسح من الميموري.
2. أي حاجة مش object (رقم، نص، boolean، [[undefined]]، دالة) أو [[null]]: رجّعها زي ما هي. الـ primitives مبتتغيرش أصلًا، فمفيش داعي لنسخة. (الدالة [[typeof]] بتاعها [["function"]] فبترجع بنفس الـ reference.)
3. [[seen.has(value)]]: نسخنا الـ object ده قبل كده؟ رجّع نفس النسخة. ده اللي بيحل الـ circular.

~~~text app.js
  if (value instanceof Date) return new Date(value.getTime());
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);
~~~

- Date: [[getTime()]] بيرجّع الوقت كرقم milliseconds، و [[new Date(رقم)]] بتعمل تاريخ جديد بنفس الوقت.
- RegExp: [[source]] نص الـ pattern ([["x"]]) و [[flags]] الحروف ([["gi"]]). (نفس السبب اللي خلّى [[deepEqual]] يحتاجهم: [[Object.keys(/a/g)]] فاضية.)

~~~text app.js
  if (value instanceof Map) {
    const out = new Map();
    seen.set(value, out);
    for (const [k, v] of value) out.set(k, deepClone(v, seen));
    return out;
  }
~~~

- [[seen.set(value, out)]] **قبل** اللفة: لو قيمة جوه الـ Map بتشاور على الـ Map نفسها، هتلاقيها في الدفتر.
- [[for (const [k, v] of value)]]: اللفة على Map بتدّي [[[key, value]]]، وبنفكّهم.
- [[out.set(k, deepClone(v, seen))]]: المفتاح زي ما هو (نفس الـ reference، زي lodash)، والقيمة بتتنسخ.
- الـ Set نفس الكلام بالظبط، بس عناصر من غير مفاتيح.

~~~text app.js
  const out = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
  seen.set(value, out);
  for (const key of Object.keys(value)) out[key] = deepClone(value[key], seen);
  return out;
}
~~~

- [[? :]]: لو array ابدأ بـ [[[]]]، غير كده [[Object.create(proto)]]: object فاضي الـ prototype بتاعه نفس prototype الأصل، فلو الأصل [[new Point(3)]]، النسخة فيها [[double()]].
- [[Object.keys(value)]]: المفاتيح بتاعة الـ object نفسه (في الـ array: [["0"]] و [["1"]]...).
- كل قيمة بتتنسخ بنفس الدالة ونفس الدفتر.

---

## ٢. التشغيل

~~~text الناتج (Node 24)
true true true
true true true
6 false
~~~

| السطر | يعني إيه |
|---|---|
| [[a !== user]] | النسخة object جديد مش نفس الأصل |
| [[a.self === a]] | الـ [[self]] في النسخة بيشاور على النسخة مش على الأصل، بفضل [[seen]] |
| [[b.self === b]] | [[structuredClone]] بتعمل نفس الحكاية لوحدها |
| [[a.born instanceof Date]] | الـ Date رجعت Date مش نص |
| [[a.scores[1] !== user.scores[1]]] | الـ array اللي جوه array اتنسخت كمان، مش بس المستوى الأول |
| [[6 false]] | [[deepClone]] حافظ على الـ class فـ [[double()]] اشتغلت، و [[structuredClone]] رجّعت object عادي مش [[Point]] |

---

## ٣. اللي [[structuredClone]] مبتعملوش

~~~text الناتج (Node 24)
DataCloneError save() {} could not be cloned.
ok
~~~

- [[structuredClone({ save() {} })]] بترمي [[DataCloneError]]: الدوال مبتتنسخش (ممكن تكون closure شايلة state مستحيل يتنقل).
- [[deepClone]] بتاعنا بيرجّع نفس الدالة (السطر التاني: [[save()]] رجّعت [[ok]]). ده مقبول غالبًا، بس قوله: الدالة مشتركة مش منسوخة.

| | [[structuredClone]] | [[deepClone]] بإيدك | [[JSON.parse(JSON.stringify())]] |
|---|---|---|---|
| Date و RegExp و Map و Set | بتنسخهم صح | صح لو كتبتهم | بيبوّظهم (نص و [[{}]]) |
| circular | شغال | شغال بـ [[seen]] | بيرمي [[TypeError]] |
| الدوال | بترمي [[DataCloneError]] | بترجع نفس الدالة | بتختفي من غير ما تقول |
| class instance | بترجع object عادي | بيحافظ على الـ prototype | object عادي |
| [[undefined]] و [[NaN]] | بتحافظ عليهم | بيحافظ عليهم | الأول بيختفي والتاني بيبقى [[null]] |

---

## ٤. قيست السرعة

array فيها ١٠٠ ألف object بسيط (أرقام ونصوص و array صغيرة و object جوه)، مرتين:

~~~text الناتج (Node 24، ويندوز 11)
deepClone 212 ms
structuredClone 208 ms
JSON 98 ms
deepClone 192 ms
structuredClone 204 ms
JSON 109 ms
~~~

JSON أسرع بحوالي الضعف **في الداتا البسيطة دي**، لأن الـ parser بتاعه متظبط جامد. بس ده مش سبب تستخدمه كنسخة: الجدول اللي فوق بيوضح هو بيبوّظ إيه. الإجابة اللي تقولها: «[[structuredClone]] افتراضيًا، وبإيدك لو محتاج prototype أو حاجة مخصوصة».

---

## الخلاصة

| الخطوة | ليه | لو نسيتها |
|---|---|---|
| primitive ← رجّعه | مبيتغيرش أصلًا | ولا حاجة، بس لف مالوش لازمة |
| [[seen.has]] أول حاجة | نفس الأصل ← نفس النسخة | الـ circular يوقّع بـ stack overflow |
| [[seen.set]] قبل النزول جوه | العيال اللي بتشاور على الأب تلاقيه | نفس الـ stack overflow |
| Date و RegExp و Map و Set لوحدهم | مالهمش مفاتيح عادية | نسخة فاضية من غير بيانات |
| [[Object.create(proto)]] | الـ methods تفضل شغالة | النسخة object عادي |`,
          lines: [
            R`[[deepClone]] بتاخد القيمة، ودفتر [[seen]] (WeakMap من الأصل للنسخة) بيتعمل في أول نداء ويتبعت لكل النداءات اللي جوه.`,
            R`أي حاجة مش object (رقم، نص، [[undefined]]، دالة) أو [[null]]: رجّعها زي ما هي. الـ primitives مبتتعدّلش فمش محتاجة نسخة، و [[null]] لازم لوحده لأن [[typeof null]] بـ [["object"]].`,
            R`الـ object ده اتنسخ قبل كده؟ رجّع نفس النسخة. ده اللي بيخلّي object بيشاور على نفسه ميلفّش للأبد، وبيخلّي حتتين بيشاوروا على نفس الحاجة يفضلوا كده في النسخة.`,
            R`Date: اعمل تاريخ جديد بنفس الوقت بالـ milliseconds. لو سبتها للفة المفاتيح تحت، هتطلع object فاضي لأن الـ Date مالهاش مفاتيح عادية.`,
            R`RegExp: نفس الـ pattern ([[source]]) ونفس الـ flags ([[g]] و [[i]]...). برضه مالهاش مفاتيح عادية.`,
            R`Map: محتاجة لفة خاصة على [[[key, value]]] بدل [[Object.keys]].`,
            R`النسخة الجديدة، فاضية لسه.`,
            R`سجّلها في الدفتر **قبل** ما تنزل جوه، عشان لو قيمة جوه بتشاور على الـ Map نفسها تلاقي النسخة.`,
            R`لف على كل زوج: المفتاح زي ما هو (نفس الـ reference)، والقيمة بتتنسخ بنفس الدالة ونفس الدفتر.`,
            R`رجّع نسخة الـ Map، وكل القيم اللي جواها بقت نسخ مستقلة عن الأصل.`,
            R`نهاية فرع الـ Map.`,
            R`Set: نفس فكرة الـ Map بس عناصر من غير مفاتيح.`,
            R`Set جديدة فاضية هتبقى النسخة، وبنعملها قبل اللفة عشان نسجّلها في الدفتر.`,
            R`سجّلها في الدفتر قبل اللفة، لنفس السبب.`,
            R`كل عنصر بيتنسخ ويتضاف.`,
            R`رجّع نسخة الـ Set بعد ما كل عنصر اتنسخ واتضاف بنفس الترتيب.`,
            R`نهاية فرع الـ Set.`,
            R`array أو object: لو array ابدأ بـ [[[]]]، غير كده object فاضي الـ prototype بتاعه زي الأصل، فلو الأصل instance من class الـ methods تفضل شغالة في النسخة.`,
            R`سجّل النسخة في الدفتر قبل اللفة. لو السطر ده اتنقل بعد اللفة، object بيشاور على نفسه هيوقّع بـ [[RangeError: Maximum call stack size exceeded]].`,
            R`لف على مفاتيح الأصل نفسه، وكل قيمة اتنسخت بنفس الدالة. في الـ array المفاتيح [["0"]] و [["1"]]...`,
            R`رجّع الـ array أو الـ object الجديد، ولو ده أول نداء يبقى ده الناتج النهائي للنسخة كلها.`,
            R`نهاية [[deepClone]].`,
            R`object فيه نص و Date و Set و array جواها array: كل نوع بيعدّي على فرع مختلف.`,
            R`[[self]] بيشاور على الـ object نفسه (circular). [[JSON.stringify(user)]] هنا هيرمي TypeError.`,
            R`النسخة بالدالة اللي كتبناها: نداء واحد من برّه، والـ [[seen]] بيتعمل جواه لوحده.`,
            R`النسخة بالدالة المدمجة في Node والمتصفح.`,
            R`[[true true true]]: النسخة object جديد، و [[self]] في كل نسخة بيشاور على النسخة نفسها مش على الأصل.`,
            R`[[true true true]]: الـ Date رجعت Date، والـ Set فيها [["admin"]]، والـ array اللي جوه اتنسخت كمان (مش نفس الـ reference).`,
            R`class صغيرة فيها method، عشان نشوف مين بيحافظ على الـ prototype.`,
            R`[[6 false]]: [[deepClone]] حافظ على [[Point]] فـ [[double()]] اشتغلت، و [[structuredClone]] رجّعت object عادي فـ [[instanceof Point]] بـ [[false]].`,
          ],
          sol: R`[[structuredClone({ save() {} })]] بترمي [[DataCloneError]] ورسالتها في Node 24 [[save() {} could not be cloned.]]، و [[deepClone]] بيرجّع object فيه نفس الدالة، و [[c.save()]] بتشتغل.

والـ shared: [[const shared = [1]; const o = { x: shared, y: shared }; const c = deepClone(o);]] بيدّي [[c.x === c.y]] بـ [[true]] و [[c.x !== shared]] بـ [[true]]: أول مرة [[shared]] اتنسخ واتسجّل في [[seen]]، وتاني مرة اتجاب من الدفتر. من غير [[seen]] كان هيبقى فيه نسختين مختلفتين، و [[c.x.push(2)]] مكانتش هتبان في [[c.y]] زي الأصل. [[structuredClone(o)]] بتعمل نفس الحكاية.`,
          solCode: R`const shared = [1];
const o = { x: shared, y: shared, save() { return "ok"; } };
const c = deepClone(o);
console.log(c.x === c.y, c.x !== shared, c.save()); // true true ok
try {
  structuredClone(o);
} catch (e) {
  console.log(e.name, e.message); // DataCloneError save() { return "ok"; } could not be cloned.
}`,
          check: {
            lang: "js",
            starter: R`function deepClone(value, seen = new WeakMap()) {
  // رجّع نسخة عميقة
}`,
            tests: R`test("primitives بترجع زي ما هي", () => expect([deepClone(5), deepClone("x"), deepClone(null), deepClone(undefined)]).toEqual([5, "x", null, undefined]));
test("objects و arrays متداخلة مستقلة عن الأصل", () => {
  const src = { a: { b: [1, { c: 2 }] } };
  const copy = deepClone(src);
  copy.a.b[1].c = 99;
  expect([src.a.b[1].c, copy !== src, copy.a.b !== src.a.b, Array.isArray(copy.a.b)]).toEqual([2, true, true, true]);
});
test("Date بتتنسخ Date جديدة بنفس الوقت", () => {
  const d = new Date(5000), c = deepClone({ d }).d;
  expect([c instanceof Date, c !== d, c.getTime()]).toEqual([true, true, 5000]);
});
test("RegExp بنفس الـ source والـ flags", () => {
  const r = deepClone(/ab+/gi);
  expect([r instanceof RegExp, r.source, r.flags]).toEqual([true, "ab+", "gi"]);
});
test("Map و Set بتتنسخ والقيم اللي جواها كمان", () => {
  const inner = { n: 1 };
  const m = deepClone(new Map([["k", inner]]));
  const s = deepClone(new Set([1, 2]));
  expect([m instanceof Map, m.get("k").n, m.get("k") !== inner, s instanceof Set, [...s]]).toEqual([true, 1, true, true, [1, 2]]);
});
test("circular: النسخة بتشاور على نفسها من غير stack overflow", () => {
  const o = { v: 1 }; o.self = o;
  const c = deepClone(o);
  expect([c.self === c, c !== o]).toEqual([true, true]);
});
test("حتتين بيشاوروا على نفس الـ array ← نفس النسخة", () => {
  const shared = [1];
  const c = deepClone({ x: shared, y: shared });
  expect([c.x === c.y, c.x !== shared]).toEqual([true, true]);
});`,
            solution: R`function deepClone(value, seen = new WeakMap()) {
  if (typeof value !== "object" || value === null) return value;
  if (seen.has(value)) return seen.get(value);
  if (value instanceof Date) return new Date(value.getTime());
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);
  if (value instanceof Map) {
    const out = new Map();
    seen.set(value, out);
    for (const [k, v] of value) out.set(k, deepClone(v, seen));
    return out;
  }
  if (value instanceof Set) {
    const out = new Set();
    seen.set(value, out);
    for (const v of value) out.add(deepClone(v, seen));
    return out;
  }
  const out = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
  seen.set(value, out);
  for (const key of Object.keys(value)) out[key] = deepClone(value[key], seen);
  return out;
}`
          }
        },
        {
          cmd: "اتوقع الناتج",
          title: "أسئلة «إيه الناتج؟» المشهورة (output questions)",
          desc: R`أسئلة سريعة بتختبر coercion و this والـ sort والـ floating point. الطريقة: متخمنش، قول القاعدة بصوتك. [[+]] مع string بيلزق، والعمليات التانية ([[-]] و [[*]]) بتحوّل لأرقام. الـ arrays والـ objects بيتحوّلوا string ([[[]]] بقى [[""]]، و [[{}]] بقى [["[object Object]"]]). و [[sort()]] من غير دالة بيرتّب كنصوص. والـ arrow بتاخد this من الدالة اللي حواليها.

وفي آخر الشرح سؤالين ترتيب للـ event loop (setTimeout و then و await مع بعض)، وسؤال [[this]] فيه ٩ نداءات لنفس الدوال بأشكال مختلفة.`,
          example: R`console.log([] + []);              // ""
console.log([] + {});              // "[object Object]"
console.log(1 + "2" - 1);          // 11
console.log("5" * "2");            // 10
console.log(typeof typeof 1);      // "string"
console.log([1, 2, 3] + "");       // "1,2,3"
console.log(0.1 * 3 === 0.3);      // false
console.log([3, 20, 100].sort());  // [100, 20, 3]
console.log(!!"false");            // true
const obj = { name: "A", get() { return () => this.name; } };
console.log(obj.get()());          // "A"`,
          try: R`غطّي التعليقات، واكتب إجابتك لكل سطر، وبعدين شغّل. وبعدين حل سؤالين الترتيب (event loop) وسؤال [[this]] في آخر الشرح قبل ما تبص على الإجابة. وضيف ٣ أسئلة من عندك من الدروس اللي فاتت (hoisting و closures في loop من المستوى ٢، و microtasks من المستوى ٣).`,
          practice: [
            { lvl: 'سريع', t: R`اتوقع على ورقة وبعدين شغّل: [[console.log(typeof NaN, [] == false, null >= 0, null == 0)]]، وبعدها [[console.log(1); setTimeout(() => console.log(2)); Promise.resolve().then(() => console.log(3)); queueMicrotask(() => console.log(4)); console.log(5);]].`, done: R`الأول بيطبع [[number true true false]]، والتاني بيطبع 1 و 5 و 3 و 4 و 2 بالترتيب ده، وتقدر تقول القاعدة ورا كل واحدة (مثلًا [[>=]] بيحوّل لرقم لكن [[==]] مع [[null]] ليه قاعدة لوحده).` },
            { lvl: 'تطبيق', t: R`صلّح الكود البايظ بطريقتين لكل واحد: [[for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));]] (المفروض 0 1 2)، و [[["1", "7", "11"].map(parseInt)]] (المفروض 1 و 7 و 11).`, done: R`قبل التصليح الأول بيطبع 3 تلات مرات والتاني [[1, NaN, 3]]. بعده الأول بيطبع 0 و 1 و 2 (بـ [[let]] أو بـ IIFE)، والتاني 1 و 7 و 11 (بـ [[map(Number)]] أو [[map((s) => parseInt(s, 10))]])، وتقدر تشرح إن [[parseInt]] خد الـ index كـ radix.` },
            { lvl: 'تحدي', t: R`اشرحها: اكتب ٥ أسئلة «إيه الناتج؟» من عندك، كل واحد بيختبر قاعدة مختلفة من الوحدات اللي فاتت (hoisting و this و closures و microtasks و sort)، وكل سؤال معاه الإجابة والشرح في سطرين لزميل. ادّيهم لحد يحلهم.`, done: R`كل سؤال اتشغّل والناتج المكتوب صح، ومفيش سؤالين بيختبروا نفس القاعدة، والزميل حلّهم ولو غلط في واحد الشرح بتاعك وصّله للإجابة من غير ما تكلمه.` },
          ],
          flag: "script",
          deep: {
            why: "الأسئلة دي بتتسأل كـ warm-up، والمقصود مش إنك تكون حافظ، المقصود تشرح القاعدة. الإجابة الصح من غير سبب بتتحسب نص درجة.",
            how: R`القواعد اللي بتحل أغلبهم: [[+]] لو أي طرف string (بعد تحويل الـ objects لـ primitive) بيبقى لزق نصوص، وإلا جمع. [[1 + "2"]] بقت "12"، و [["12" - 1]] بقت 11. الـ array بتتحوّل بـ [[join(",")]]، والـ object العادي بـ [["[object Object]"]]. [[typeof]] دايمًا بيرجّع string، فـ typeof بتاعه "string". أي string مش فاضي truthy حتى "false". والـ arrow جوه method بتاخد this بتاعة الـ method، اللي هي obj.`,
            when: R`بيتسألوا مع أسئلة hoisting ([[console.log(x); var x = 1]])، و closures في loop، وترتيب الـ event loop، و this في callbacks. كلهم في دروس فوق.`,
            mistakes: R`تجاوب بسرعة من غير ما تقول القاعدة. وتفتكر إن [[{} + []]] في Console زي [[[] + {}]]: في أول السطر الـ [[{}]] ممكن يتفهم block فالناتج 0، فالأسئلة دي بتتكتب جوه console.log عشان تتجنب ده.`
          },
          teach: R`## الفكرة في سطر

١١ سطر كل واحد بيختبر قاعدة واحدة في اللغة. الطريقة: لكل سطر قول القاعدة الأول، وبعدين الناتج بيطلع لوحده.

شغّلت المثال في Node 24. Node بيطبع الـ strings من غير علامات تنصيص، فالـ string الفاضي بيطلع سطر فاضي.

~~~text الناتج (Node 24)

[object Object]
11
10
string
1,2,3
false
[ 100, 20, 3 ]
true
A
~~~

---

## ١. [[+]] مع arrays و objects

~~~text app.js
console.log([] + []);
console.log([] + {});
~~~

[[+]] مبيعرفش يجمع arrays، فبيحوّل الاتنين لـ primitive الأول. الـ array بتتحوّل بـ [[join(",")]]، والـ object العادي بيتحوّل للنص [["[object Object]"]]:

| القيمة | بقت | ليه |
|---|---|---|
| [[[]]] | [[""]] | [[join(",")]] على array فاضية بيدّي نص فاضي |
| [[{}]] | [["[object Object]"]] | الـ object العادي بيستخدم [[toString]] الافتراضية |
| [[[1, 2, 3]]] | [["1,2,3"]] | العناصر بينهم فاصلة من غير مسافات |

ولما واحد على الأقل يبقى string، [[+]] بيلزق: [[""]] + [[""]] = [[""]]، و [[""]] + [["[object Object]"]] = [["[object Object]"]]. جربت [[JSON.stringify([] + [])]] عشان أشوف الفاضي: طلع [[""]].

---

## ٢. [[+]] قدام [[-]] و [[*]]

~~~text app.js
console.log(1 + "2" - 1);
console.log("5" * "2");
~~~

السطر الأول من الشمال لليمين:

1. [[1 + "2"]]: فيه string، فـ [[+]] بيلزق: [["12"]]. (جربت: [[12]].)
2. [["12" - 1]]: [[-]] ملهاش معنى مع نصوص، فبتحوّل لأرقام: [[12 - 1 = 11]].

[[*]] زي [[-]]: [["5" * "2"]] = [[10]] رقم.

---

## ٣. [[typeof typeof 1]]

~~~text app.js
console.log(typeof typeof 1);
~~~

من جوه لبرّه:

1. [[typeof 1]] = [["number"]]، وده **string**.
2. [[typeof "number"]] = [["string"]].

[[typeof]] دايمًا بيرجّع string، فـ [[typeof typeof]] أي حاجة = [["string"]].

---

## ٤. array + [[""]]

~~~text app.js
console.log([1, 2, 3] + "");
~~~

نفس قاعدة ١: [[join(",")]] = [["1,2,3"]]. ده بالظبط اللي بيحصل لما تحط array جوه template string.

---

## ٥. الأرقام العشرية

~~~text app.js
console.log(0.1 * 3 === 0.3);
~~~

الكمبيوتر بيخزّن الأرقام بالـ binary (base 2)، و [[0.1]] ملهاش تمثيل مظبوط فيه، زي ما [[1/3]] ملهاش تمثيل مظبوط بالعشري. فـ [[0.1 * 3]] طلعت:

~~~text الناتج
0.30000000000000004
~~~

مش [[0.3]]، فالمقارنة false. (الحل في الفلوس: اشتغل بالقروش كأرقام صحيحة.)

---

## ٦. [[sort()]] من غير دالة

~~~text app.js
console.log([3, 20, 100].sort());
~~~

[[sort()]] من غير compare function بتحوّل كل حاجة لـ string وترتّب حرف حرف زي القاموس: [["100"]] قبل [["20"]] لأن [["1"]] قبل [["2"]]، و [["20"]] قبل [["3"]]. جربت:

~~~text الناتج
[ '100', '20', '3' ] true [ 3, 20, 100 ]
~~~

- ترتيب النصوص [[["100","20","3"]]] نفس الترتيب.
- [["100" < "20"]] = true.
- والحل: [[sort((a, b) => a - b)]] = [[[ 3, 20, 100 ]]]. الدالة بترجّع سالب لو [[a]] يتحط الأول.

---

## ٧. [[!!"false"]]

~~~text app.js
console.log(!!"false");
~~~

- [[!]] بيحوّل لـ boolean ويعكس، و [[!!]] بيحوّل بس.
- أي string مش فاضي truthy، مهما كان مكتوب فيه. جربت [[Boolean("")]] و [[Boolean("0")]] و [[Boolean(" ")]]: [[false true true]].

---

## ٨. arrow جوه method

~~~text app.js
const obj = { name: "A", get() { return () => this.name; } };
console.log(obj.get()());
~~~

1. [[get() { ... }]]: method عادية (اختصار [[get: function () {...}]]).
2. [[obj.get()]]: اتنادت بنقطة على [[obj]]، فـ [[this]] جوه [[get]] = [[obj]]. ورجّعت arrow.
3. الـ arrow معندهاش [[this]] بتاعها، بتاخده من [[get]]: يعني [[obj]].
4. [[()]] التانية نادت الـ arrow: [[obj.name]] = [["A"]].

جربت حالتين قريبين في ES module:

~~~text الناتج
undefined
TypeError: Cannot read properties of undefined (reading 'name')
~~~

- لو جوه [[get]] رجّعنا [[function]] عادية بدل arrow، [[this]] جواها اتحدد ساعة ما اتنادت من غير نقطة، فبقى [[undefined]] (وكتبت [[this?.name]] فطلع [[undefined]]).
- لو خدنا [[get]] نفسها في متغير وناديناها من غير [[obj.]]، [[this]] جوه [[get]] بقى [[undefined]]، والـ arrow ورثت [[undefined]] فوقعت.

يعني الـ arrow مش «مربوطة بـ obj»، هي مربوطة بـ this بتاعة الدالة اللي حواليها **ساعة ما اتنادت**.

---

## ٩. الـ solCode

~~~text app.js
console.log(typeof hoisted);
var hoisted = 1;
for (var i = 0; i < 3; i++) setTimeout(() => console.log("loop", i), 0);
setTimeout(() => console.log("T"), 0);
Promise.resolve().then(() => console.log("P"));
console.log("S");
~~~

~~~text الناتج (Node 24)
undefined
S
P
loop 3
loop 3
loop 3
T
~~~

- [[typeof hoisted]]: [[var]] بيتعرّف (hoisting) في أول الملف بقيمة [[undefined]]، والقيمة 1 بتتحط لما السطر يتنفذ.
- [[var i]]: متغير واحد للّفة كلها. الـ ٣ timers بيشتغلوا بعد ما اللفة خلصت و [[i]] بقت 3. (بـ [[let]] كل لفة ليها [[i]] بتاعها فتطلع 0 1 2، وجربتها: [[loop 0]] و [[loop 1]] و [[loop 2]].)
- الترتيب: الكود العادي الأول ([[S]])، وبعدين الـ microtasks (الـ [[then]]: [[P]])، وبعدين الـ timers بالترتيب اللي اتسجلوا بيه (الـ ٣ loops وبعدين [[T]]).

---

## ١٠. فخ [[{} + []]]

~~~text الناتج (node -p '{} + []')
0
~~~

لما [[{}]] تبقى أول السطر، JS بتفهمها block فاضي مش object، فالباقي [[+[]]] = [[+""]] = [[0]]. وفي نص تعبير ([[console.log({} + [])]]) بتبقى object عادي. عشان كده كل الأسئلة فوق جوه [[console.log]].

---

## ١١. event loop: اتوقع الترتيب

ده أشهر سؤال ترتيب، وفيه كل الأنواع مرة واحدة:

~~~text order.mjs
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve()
  .then(() => { console.log("3"); setTimeout(() => console.log("4"), 0); })
  .then(() => console.log("5"));
queueMicrotask(() => console.log("6"));
(async () => { console.log("7"); await null; console.log("8"); })();
console.log("9");
~~~

اكتب إجابتك قبل ما تكمّل. القاعدة: الكود العادي كله الأول، وبعدين **كل** الـ microtasks (الـ [[then]] و [[queueMicrotask]] واللي بعد [[await]])، حتى اللي بتتضاف وهي بتشتغل، وبعدين timer واحد، وبعدين الـ microtasks تاني لو فيه، وهكذا (درس «microtasks و macrotasks»).

~~~text الناتج (node order.mjs، Node 24)
1 7 9 3 6 8 5 2 4
~~~

| الدور | اللي اتطبع | ليه |
|---|---|---|
| الكود العادي | [[1]] و [[7]] و [[9]] | الـ async function بتشتغل عادي لحد أول [[await]]، فـ [[7]] بيطلع قبل [[9]] |
| طابور الـ microtasks | [[3]] و [[6]] و [[8]] | التلاتة اتحطوا في الطابور بالترتيب ده وقت الكود العادي |
| microtask جديد | [[5]] | الـ [[then]] التانية مبتدخلش الطابور غير لما الأولى تخلص، فجت بعد [[8]] |
| الـ timers | [[2]] وبعده [[4]] | [[2]] اتسجّل الأول، و [[4]] اتسجّل من جوه [[3]] |

### سؤال تاني: [[await]] على async function

~~~text order2.mjs
async function a() { console.log("a1"); await b(); console.log("a2"); }
async function b() { console.log("b"); }
console.log("start");
setTimeout(() => console.log("timeout"), 0);
a();
new Promise((resolve) => { console.log("executor"); resolve(); }).then(() => console.log("then"));
console.log("end");
~~~

~~~text الناتج (Node 24)
start a1 b executor end a2 then timeout
~~~

- [[b()]] بتتنفذ فورًا جوه [[a]] (مفيش [[await]] جوه [[b]])، فـ [[b]] بيطلع بعد [[a1]] على طول.
- الدالة اللي بتتبعت لـ [[new Promise]] (اسمها executor) بتشتغل **فورًا** مش بعدين، فـ [[executor]] قبل [[end]].
- [[a2]] قبل [[then]]: الاتنين microtasks، و [[await b()]] اتسجّل الأول. (حسب مدونة V8 عن «faster async functions»، في Node 10 وأقدم الـ [[await]] كان بياخد لفات زيادة و [[then]] كان بيطلع قبل [[a2]]؛ ده من الـ docs مش متجرّب هنا، فلو لقيت إجابة قديمة بالعكس ده السبب.)

---

## ١٢. this: اتوقع الناتج

~~~text this.mjs
const o = {
  name: "o",
  regular() { return this?.name; },
  arrow: () => typeof this,
  inner() { return [1].map(function () { return this?.name; })[0]; },
  innerArrow() { return [1].map(() => this.name)[0]; },
};
const f = o.regular;
console.log(o.regular(), f(), o.arrow(), o.inner(), o.innerArrow());
console.log(o.regular.call({ name: "c" }), f.bind({ name: "b" }).bind({ name: "b2" })());
class User { name = "u"; greet() { return this.name; } hi = () => this.name; }
const { greet, hi } = new User();
console.log(hi());
greet();
~~~

~~~text الناتج (node this.mjs، Node 24)
o undefined undefined undefined o
c b
u
TypeError: Cannot read properties of undefined (reading 'name')
~~~

القاعدة اللي بتحل كل ده: [[this]] في [[function]] عادية بيتحدد **ساعة النداء** من اللي قبل النقطة، والـ arrow مالهاش [[this]] بتاعها وبتاخده من المكان اللي اتكتبت فيه (درس «this» في المستوى ٢).

| النداء | الناتج | ليه |
|---|---|---|
| [[o.regular()]] | [[o]] | اتنادت بنقطة على [[o]]، فـ [[this]] هو [[o]] |
| [[f()]] | [[undefined]] | نفس الدالة بس من غير نقطة، وفي module (strict) [[this]] بيبقى [[undefined]]، و [[?.]] منعت الـ error |
| [[o.arrow()]] | [[undefined]] | الـ arrow اتكتبت في أعلى الملف، و [[this]] في أعلى الـ ES module بـ [[undefined]]. في ملف CommonJS ([[.cjs]]) نفس السطر طلع [[object]] لأن [[this]] هناك [[module.exports]] |
| [[o.inner()]] | [[undefined]] | الـ [[function]] اللي جوه [[map]] بتتنادى من [[map]] من غير object، فـ [[this]] جواها مش [[o]] |
| [[o.innerArrow()]] | [[o]] | الـ arrow أخدت [[this]] من [[innerArrow]]، وهي اتنادت على [[o]] |
| [[o.regular.call({ name: "c" })]] | [[c]] | [[call]] بتحدد [[this]] بإيدك للنداء ده |
| [[bind]] مرتين | [[b]] | [[bind]] التانية ملهاش تأثير: الدالة المربوطة [[this]] بتاعها ثابت للأبد |
| [[hi()]] بعد ما اتفكّت | [[u]] | class field بـ arrow: اتعملت في الـ constructor وأخدت [[this]] بتاع الـ instance |
| [[greet()]] بعد ما اتفكّت | [[TypeError]] | method عادية اتفصلت عن الـ object، والـ class دايمًا strict، فـ [[this]] بـ [[undefined]] |

السطر الأخير هو نفس باج [[onClick={this.handleClick}]] في React الـ class components، وحله إما [[bind]] في الـ constructor أو arrow كـ class field زي [[hi]].

---
## الخلاصة

| القاعدة | المثال | الناتج |
|---|---|---|
| [[+]] مع أي string = لزق | [[1 + "2"]] | [["12"]] |
| [[-]] و [[*]] = أرقام | [["12" - 1]] | [[11]] |
| array ← [[join(",")]]، object ← [["[object Object]"]] | [[[] + {}]] | [["[object Object]"]] |
| [[typeof]] بيرجّع string | [[typeof typeof 1]] | [["string"]] |
| [[0.1]] مش مظبوطة بالـ binary | [[0.1 * 3 === 0.3]] | [[false]] |
| [[sort()]] بترتّب كنصوص | [[[3, 20, 100].sort()]] | [[[100, 20, 3]]] |
| أي string مش فاضي truthy | [[!!"false"]] | [[true]] |
| arrow بتاخد this من اللي حواليها | [[obj.get()()]] | [["A"]] |
| الكود العادي ← كل الـ microtasks ← timer | [[setTimeout]] و [[then]] و [[await]] | [[1 7 9 3 6 8 5 2 4]] |
| [[this]] بيتحدد ساعة النداء من اللي قبل النقطة | [[const f = o.regular; f()]] | [[undefined]] في module |`,
          lines: [
            R`[[+]] مع arrays بيحوّلهم primitive الأول، والـ array الفاضية بتتحوّل لنص فاضي. نص فاضي + نص فاضي = [[""]]، مش array ولا [[0]].`,
            R`الـ array بقت [[""]]، والـ object العادي بيتحوّل لنص بـ [[toString]] فيبقى الكلمتين [[object Object]] جوه قوسين مربعين، ولزقهم بيدّي النص ده. هتشوفه كتير لما تحط object جوه نص بالغلط.`,
            R`[[+]] بيتنفذ من الشمال لليمين: [[1 + "2"]] فيها نص فبيلزق ويبقى [["12"]]. وبعدين [[-]] مالهاش معنى مع النصوص، فبتحوّل [["12"]] لرقم 12 وتطرح 1 = 11. [[+]] هي الوحيدة اللي بتفضّل النصوص.`,
            R`[[*]] زي [[-]] و [[/]] شغالة على أرقام بس، فبتحوّل النصين لأرقام وتضرب = 10 كرقم. ولو أي نص منهم مش رقم زي [["a"]] الناتج [[NaN]].`,
            R`[[typeof 1]] بيرجّع النص [["number"]]، و [[typeof]] على أي نص بيرجّع [["string"]]. فـ [[typeof typeof]] أي حاجة دايمًا [["string"]].`,
            R`لما array تتلزق مع نص بتتحوّل نص بنفس طريقة [[join(",")]]: العناصر بينهم فاصلة من غير مسافات ولا أقواس. ده بيحصل كمان لو حطيت array جوه template string.`,
            R`الأرقام العشرية متخزنة binary، و [[0.1]] مينفعش تتمثّل بالظبط، فـ [[0.1 * 3]] بتطلع [[0.30000000000000004]] ومش [[===]] لـ [[0.3]]. قارن بفرق صغير زي [[Math.abs(a - b) < Number.EPSILON]] أو اشتغل بالقروش كأرقام صحيحة.`,
            R`[[sort()]] من غير دالة مقارنة بيحوّل العناصر نصوص ويرتّبها حرف حرف: [["100"]] قبل [["20"]] لأن [["1"]] قبل [["2"]]. وكمان بيعدّل الـ array نفسها. للأرقام اكتب [[sort((a, b) => a - b)]].`,
            R`[[!!]] بتحوّل أي قيمة لـ boolean. النص [["false"]] مش فاضي، وأي نص مش فاضي truthy مهما كان مكتوب فيه، فالناتج [[true]]. خلي بالك منها لما تقرا قيم من query string أو [[localStorage]]، لأنها بتيجي نصوص.`,
            R`[[get]] method عادية بترجّع arrow function. الـ arrow مالهاش [[this]] بتاعها، فبتاخد [[this]] من المكان اللي اتكتبت فيه، يعني [[this]] بتاع [[get]] وقت ما اتنادت.`,
            R`[[obj.get()]] اتنادت كـ method على [[obj]] فـ [[this]] جواها [[obj]]، والـ arrow اللي رجعت شايلة نفس الـ [[this]]، والقوسين التانيين نادوها فطبعت [["A"]]. لو [[get]] نفسها كانت arrow، [[this]] كان هييجي من برّه الـ object والناتج مش هيبقى [["A"]].`,
          ],
          sol: R`الناتج الحقيقي في Node: سطر فاضي (string فاضي)، [[[object Object]]]، [[11]]، [[10]]، [[string]]، [[1,2,3]]، [[false]]، [[[ 100, 20, 3 ]]]، [[true]]، [[A]]. (Node بيطبع الـ strings من غير quotes.) الأسباب في سطر: [[+]] مع object بيحوّله string، و [[-]] و [[*]] بيحوّلوا لأرقام، و typeof بترجّع string دايمًا، و sort من غير compare بترتّب كنصوص، و [["false"]] string مش فاضي فـ truthy، والـ arrow أخدت this من get.

أمثلة للأسئلة اللي تضيفها: [[console.log(typeof x); var x = 1;]] بتطبع [[undefined]]، و [[for (var i = 0; i < 3; i++) setTimeout(() => console.log(i))]] بتطبع [[3 3 3]]، و [[setTimeout(() => console.log("T")); Promise.resolve().then(() => console.log("P")); console.log("S");]] بتطبع [[S P T]]. لو غلطت في أكتر من ٣ من العشرة الأصليين، ارجع لدروس «القيم والأنواع» قبل الانترفيو.`,
          solCode: R`console.log(typeof hoisted); // undefined
var hoisted = 1;
for (var i = 0; i < 3; i++) setTimeout(() => console.log("loop", i), 0); // 3 3 3
setTimeout(() => console.log("T"), 0);
Promise.resolve().then(() => console.log("P"));
console.log("S");
// S ثم P ثم loop 3 ×3 ثم T`
        }
      ]
    }
]);
