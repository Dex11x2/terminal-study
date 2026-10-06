// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "الأسئلة اللي بتتكرر في انترفيوهات JavaScript: إجابات تقولها بصوتك، وكود تكتبه على السبورة",
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
            "متغير من غير قيمة.",
            "object فاضي.",
            "دالة بترجّع الباراميتر.",
            "undefined.",
            "undefined.",
            "undefined.",
            "null بقصد.",
            "الغلطة التاريخية.",
            R`[[==]] بيساويهم.`,
            R`[[===]] لأ.`,
            "JSON بيشيل undefined ويسيب null."
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
            "الدالة بتاخد أي iterable.",
            "بترجّع Promise جديد.",
            "حوّلها array عشان نعرف الطول.",
            "مكان لكل نتيجة.",
            "عدّاد اللي خلصوا.",
            "مفيش حاجة: خلص فورًا.",
            "لكل عنصر.",
            R`[[Promise.resolve]] عشان القيم العادية تتعامل زي الـ Promises.`,
            "حط النتيجة في مكانها الأصلي.",
            "زوّد العدّاد.",
            "كلهم خلصوا: resolve بالنتايج.",
            "أول فشل: reject على طول.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "Promise بطيء.",
            R`الترتيب زي المدخلات مع إن [[slow]] خلص الأخير.`
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
            R`method جديدة على كل الـ arrays، بـ function عشان [[this]] تبقى الـ array.`,
            "افحص إن الـ callback دالة زي الأصلية.",
            "array جديدة بنفس الطول.",
            "لف على العناصر.",
            R`اتخطى الأماكن الفاضية، ونادي بالـ 3 arguments و thisArg.`,
            "قفلة.",
            "رجّع الجديدة.",
            "قفلة.",
            "method جديدة على كل الدوال.",
            R`[[this]] هنا الدالة اللي اتعملها bind.`,
            "رجّع دالة جديدة.",
            "نادي الأصلية بالـ context والـ arguments المتثبتة الأول.",
            "قفلة.",
            "قفلة.",
            "جرّب map.",
            R`دالة بتستخدم [[this]].`,
            "جرّب bind."
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
            "بتاخد الدالة الأصلية.",
            "بترجّع دالة باسم عشان تنادي نفسها.",
            "الـ arguments كفاية: نادي الأصلية.",
            "مش كفاية: رجّع دالة بتجمع اللي جاي وتحاول تاني.",
            "قفلة.",
            "قفلة.",
            R`دالة بـ 3 باراميترات: [[fn.length]] بـ 3.`,
            "النسخة الـ curried.",
            "واحد واحد.",
            "اتنين وبعدين واحد.",
            "واحد وبعدين اتنين.",
            "دالة ضريبة عامة.",
            "نسخة متظبطة على ١٤٪.",
            "100 × 114 ÷ 100."
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
deepEqual(NaN, NaN);                                   // true`,
          try: R`ضيف دعم لـ Date (قارن [[getTime()]]) و Map و Set. وبعدين جرّب object بيشاور على نفسه ([[a.self = a]]) وشوف الـ stack overflow، وفكّر إزاي تحلها بـ WeakMap للأزواج اللي اتقارنت. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[deepEqual]] مع Date و Map و Set، والـ object اللي بيشاور على نفسه.`,
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
true
RangeError: Maximum call stack size exceeded
~~~

- [[deepEqual(new Date(1), new Date(2))]] رجّعت **true** غلط: [[Object.keys(new Date(1))]] بـ [[[]]]، يعني الـ Date معندهاش مفاتيح عادية (التاريخ متخزن جوه بطريقة تانية)، فاتنين Dates أي كانوا شكلهم «متساويين».
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

> في التمرين: فكّر إزاي تعرف إن [[a]] Date أو Map أو Set، وإيه اللي تقارنه في كل واحد بدل المفاتيح. وللـ object اللي بيشاور على نفسه: محتاج «تفتكر» الأزواج اللي بدأت تقارنها قبل كده، والـ [[WeakMap]] بتشيل object كمفتاح.`,
          lines: [
            "دالة recursive.",
            R`نفس القيمة أو نفس الـ reference، و [[Object.is]] بتغطي NaN.`,
            "لو واحد primitive أو null (وماتساووش فوق): مختلفين.",
            "array مقابل object: مختلفين.",
            "مفاتيح الأول.",
            "مفاتيح التاني.",
            "عدد مختلف: مختلفين.",
            "كل مفتاح موجود في التاني وقيمته متساوية بنفس الدالة.",
            "قفلة.",
            "متداخل ومتساوي.",
            "رقم مقابل string.",
            "array مقابل object بنفس المفاتيح.",
            "NaN بتساوي نفسها هنا."
          ],
          sol: R`بعد الإضافات: [[deepEqual(new Date(1), new Date(2))]] بترجّع false (النسخة الأصلية كانت بترجّع true غلط، لأن الـ Date معندهاش keys فبتبان متساوية)، ونفس المشكلة مع Map و Set: الأصلية بتقول [[new Map([ [1, 1] ])]] بتساوي [[new Map([ [2, 2] ])]]. الحل إنك تفحص النوع بـ instanceof وتقارن [[getTime()]] للـ Date، و size وكل مفتاح للـ Map، و has للـ Set.

الـ object اللي بيشاور على نفسه بيوقّع النسخة الأصلية بـ [[RangeError: Maximum call stack size exceeded]]. الحل [[WeakMap]] بتسجّل كل زوج [[a → b]] دخلت تقارنه، ولو قابلته تاني ترجّع true (افترضنا إنهم متساويين لحد ما يثبت العكس). مع الحل، اتنين objects كل واحد بيشاور على نفسه بيطلعوا متساويين. ولـ Set جوه objects المقارنة بـ has بتقارن بالـ reference، ودي حدود مقبولة في الانترفيو لو قلتها.`,
          solCode: R`function deepEqual(a, b, seen = new WeakMap()) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
  if (seen.get(a) === b) return true;
  seen.set(a, b);
  if (a instanceof Date) return a.getTime() === b.getTime();
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
          cmd: "اتوقع الناتج",
          title: "أسئلة «إيه الناتج؟» المشهورة (output questions)",
          desc: R`أسئلة سريعة بتختبر coercion و this والـ sort والـ floating point. الطريقة: متخمنش، قول القاعدة بصوتك. [[+]] مع string بيلزق، والعمليات التانية ([[-]] و [[*]]) بتحوّل لأرقام. الـ arrays والـ objects بيتحوّلوا string ([[[]]] بقى [[""]]، و [[{}]] بقى [["[object Object]"]]). و [[sort()]] من غير دالة بيرتّب كنصوص. والـ arrow بتاخد this من الدالة اللي حواليها.`,
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
          try: R`غطّي التعليقات، واكتب إجابتك لكل سطر، وبعدين شغّل. وضيف ٣ أسئلة من عندك من الدروس اللي فاتت (hoisting و closures في loop من المستوى ٢، و microtasks من المستوى ٣).`,
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

| القيمة | بقت |
|---|---|
| [[[]]] | [[""]] |
| [[{}]] | [["[object Object]"]] |
| [[[1, 2, 3]]] | [["1,2,3"]] |

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

## الخلاصة

| القاعدة | المثال |
|---|---|
| [[+]] مع أي string = لزق | [[1 + "2"]] = [["12"]] |
| [[-]] و [[*]] = أرقام | [["12" - 1]] = [[11]] |
| array ← [[join(",")]]، object ← [["[object Object]"]] | [[[] + {}]] |
| [[typeof]] بيرجّع string | [[typeof typeof 1]] |
| [[0.1]] مش مظبوطة بالـ binary | [[0.1 * 3]] |
| [[sort()]] بترتّب كنصوص | [[[3, 20, 100]]] |
| أي string مش فاضي truthy | [[!!"false"]] |
| arrow بتاخد this من اللي حواليها | [[obj.get()()]] |`,
          lines: [
            R`الاتنين بقوا [[""]]، ولزق نصين فاضيين.`,
            R`[[""]] + [["[object Object]"]].`,
            R`[["12"]] بعد اللزق، وبعدين - بتحوّله لرقم.`,
            R`[[*]] بتحوّل الاتنين أرقام.`,
            R`[[typeof 1]] بـ "number"، و typeof أي string بـ "string".`,
            "الـ array بتتحوّل بـ join.",
            "floating point: 0.30000000000000004.",
            "sort من غير دالة بيرتّب كنصوص.",
            "string مش فاضي: truthy.",
            R`arrow جوه method: [[this]] جاية من [[get]].`,
            R`[[get]] اتنادت بـ obj.get() فـ this = obj.`
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
