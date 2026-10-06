// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
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
          teach: R`## الكود ده بيعمل إيه؟

بيعمل دالتين بيرجّعوا Promises بإيدنا: [[wait]] (استنى وقت معيّن)، و [[getUser]] (API وهمي بياخد 300ms وينجح أو يفشل). وبعدين بيوصّل سلسلة [[then]] و [[catch]] و [[finally]] على getUser. اتشغّل في Node 24، وزوّدنا قدام كل سطر مطبوع الوقت من أول البرنامج بالملي ثانية (ms) عشان تشوف الترتيب.

---

## ١. [[wait]]: أبسط Promise

~~~text app.js
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
~~~

- [[new Promise(executor)]]: بيعمل Promise جديد. الـ **executor** هو الدالة اللي بتديهاله، وبتشتغل **فورًا**، وبياخد منه دالة اسمها [[resolve]].
- [[resolve]]: لما تناديها، الـ Promise بيخلص بنجاح (fulfilled).
- [[setTimeout(resolve, ms)]]: نادي resolve بعد ms ملي ثانية.

يعني [[wait(500)]] بيرجّع Promise بيخلص بعد نص ثانية.

---

## ٢. [[getUser]]: نجاح أو فشل

~~~text app.js
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) reject(new Error("id غلط"));
      else resolve({ id, name: "Sara" });
    }, 300);
  });
}
~~~

- الـ executor هنا بياخد دالتين: [[resolve]] و [[reject]]. [[reject]] بتخلّي الـ Promise يفشل (rejected) بالسبب اللي تديهوله.
- [[setTimeout(() => { ... }, 300)]]: بنقلّد طلب شبكة بياخد 300ms.
- [[reject(new Error("id غلط"))]] لو id صفر أو سالب، و [[resolve({ id, name: "Sara" })]] غير كده. و [[{ id, name: "Sara" }]] اختصار [[{ id: id, name: "Sara" }]].

### الـ Promise ليه ٣ حالات

طبعنا Promise من getUser في ٣ أوقات:

~~~text الناتج
   0ms Promise { <pending> }                        ← لحظة النداء
 407ms Promise { { id: 1, name: 'Sara' } }          ← بعد ما نجح
 407ms Promise { <rejected> Error: id غلط ... }     ← getUser(0) بعد ما فشل
~~~

| الحالة | معناها |
|---|---|
| pending | لسه مخلصش |
| fulfilled | نجح ومعاه قيمة |
| rejected | فشل ومعاه سبب (error) |

ولما يخلص (نجح أو فشل) **مبيتغيرش تاني**. ولو ناديت resolve أو reject تاني، بيتجاهلهم.

---

## ٣. السلسلة

~~~text app.js
getUser(1)
  .then((user) => user.name)
  .then((name) => console.log("الاسم:", name))
  .catch((err) => console.log("فشل:", err.message))
  .finally(() => console.log("خلص"));
~~~

نمشيها حلقة حلقة:

1. [[getUser(1)]]: بيرجّع Promise pending **على طول**، والكود بيكمّل.
2. [[.then((user) => user.name)]]: «لما ينجح، خد القيمة (user) ورجّع name منها». كل then بترجّع **Promise جديد** قيمته اللي الـ callback رجّعه، يعني هنا [["Sara"]].
3. [[.then((name) => console.log(...))]]: اللي بعدها بتاخد [["Sara"]] وتطبعها.
4. [[.catch((err) => ...)]]: لو **أي** حلقة قبلها فشلت (الـ Promise الأصلي أو throw جوه then)، التنفيذ بينط هنا على طول.
5. [[.finally(() => ...)]]: بتشتغل في الحالتين، ومبتاخدش قيمة.

---

## ٤. الترتيب الحقيقي

~~~text app.js
wait(500).then(() => console.log("بعد نص ثانية"));
const { promise, resolve } = Promise.withResolvers();
~~~

- [[Promise.withResolvers()]] (ES2024): بترجّع object فيه [[promise]] و [[resolve]] و [[reject]] جاهزين، فتقدر تنادي resolve **من برّه** الـ executor (من event مثلًا). جرّبنا نعمل resolve بعد 700ms من setTimeout تانية.

~~~text الناتج
   2ms آخر سطر متزامن
 312ms الاسم: Sara
 313ms خلص
 502ms بعد نص ثانية
 705ms withResolvers: اتحلّت من برّه
~~~

لاحظ إن [[آخر سطر متزامن]] (console.log عادي في آخر الملف) اتطبع **الأول**: كل الـ Promises بتسجّل اللي هيحصل وتسيب الكود يكمّل، والـ callbacks بتشتغل بعدين.

---

## ٥. الفشل (التجربة)

مع [[getUser(0)]] بنفس السلسلة:

~~~text الناتج
فشل: id غلط
خلص
~~~

الاتنين then اتخطّوا خالص، والـ catch مسك. ولما رمينا [[throw new Error("x")]] جوه أول then (مع getUser(1)):

~~~text الناتج
فشل: x
خلص
~~~

نفس الـ catch مسك الاتنين: الرفض الأصلي وأي throw جوه then.

### Promise فشل ومحدش عمله catch

جرّبنا [[getUser(0)]] لوحده من غير catch (في ملف تجربة getUser فيه في أول سطر):

~~~text الناتج
C:\Users\ali\code\app.js:4
      if (id <= 0) reject(new Error("id غلط"));
                          ^

Error: id غلط
    at Timeout._onTimeout (C:\Users\ali\code\app.js:4:27)

Node.js v24.19.0
~~~

ده اسمه **unhandled rejection**، و Node بيقفل البرنامج كله بـ exit code 1. في المتصفح بيظهر [[Uncaught (in promise)]] أحمر في Console.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[new Promise((resolve, reject) => ...)]] | تعمل Promise وتقرر إمتى ينجح أو يفشل |
| [[.then(fn)]] | لما ينجح. اللي fn بترجّعه يروح للحلقة اللي بعدها |
| [[.catch(fn)]] | لو أي حاجة قبلها فشلت |
| [[.finally(fn)]] | في الحالتين |
| [[Promise.withResolvers()]] | promise و resolve و reject في متغيرات |

- كل then بترجّع Promise جديد، فالسلسلة ممكن تطول. **ولو نسيت return جوه then، الحلقة اللي بعدها هتاخد undefined**.
- حط catch في آخر كل سلسلة، وإلا Node هيقفل البرنامج.`,
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
          teach: R`## الكود ده بيعمل إيه؟

دالة [[loadDashboard]] بتجيب يوزر، وبعده طلباته (محتاجة id اليوزر)، وبترجّعهم مع بعض. لو أي حاجة فشلت، بتسجّل الـ error وترجّع [[null]]. مكتوبة بـ [[async]] و [[await]] فشكلها سطر ورا سطر، بس من تحت كلها Promises.

اتشغّل في Node 24 كملف [[.mjs]] (عشان الـ await اللي في أول الملف). و [[api.example.com]] مش API حقيقي، فجرّبنا عليه مرة، ومرة على سيرفر صغير محلي فيه [[/users/1]] و [[/orders]].

---

## ١. [[async function]]

~~~text app.mjs
async function loadDashboard(userId) {
~~~

كلمة [[async]] قبل function بتعمل حاجتين:

1. الدالة **دايمًا بترجّع Promise**. لو رجّعت قيمة عادية، بتتلف في Promise ناجح. ولو رمت error، الـ Promise بيفشل.
2. بتسمح تستخدم [[await]] جواها.

---

## ٢. الطلب الأول

~~~text app.mjs
  try {
    const res = await fetch($__bthttps://api.example.com/users/$__{userId}$__bt);
    if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt);
~~~

- [[try {]]: أي await جواه يفشل، التنفيذ ينط على الـ catch.
- [[fetch(url)]]: بتبعت طلب HTTP وبترجّع Promise بالرد (Response).
- [[await]]: «وقّف **الدالة دي** لحد ما الـ Promise يخلص، وهات قيمته». الدالة بس هي اللي بتقف، باقي البرنامج شغال عادي.
- [[res.ok]]: [[true]] لو الـ status بين 200 و 299. fetch **مبترميش** error على 404 أو 500، فبنفحص بنفسنا.
- [[res.status]]: الرقم نفسه (404 مثلًا).

~~~text app.mjs
    const user = await res.json();
~~~

[[res.json()]] بتقرا جسم الرد وتحوّله لـ object، وده كمان Promise (الجسم ممكن يكون لسه بيوصل)، فمحتاج await تاني.

---

## ٣. الطلب التاني

~~~text app.mjs
    const ordersRes = await fetch($__bthttps://api.example.com/orders?user=$__{user.id}$__bt);
    return { user, orders: await ordersRes.json() };
~~~

- الطلب ده **محتاج** [[user.id]]، فلازم يستنى الأول. لو الطلبين مستقلين كنا هنشغّلهم مع بعض بـ Promise.all (الدرس الجاي).
- [[?user=...]]: الـ query string: بيانات زيادة في الـ URL بعد [[?]].
- [[{ user, orders: await ordersRes.json() }]]: [[await]] ينفع جوه أي expression، حتى جوه object.

اللي السيرفر المحلي شافه:

~~~text الناتج
[server] /users/1
[server] /orders?user=1
~~~

طلبين ورا بعض، والتاني فيه id من الأول.

---

## ٤. الـ catch

~~~text app.mjs
  } catch (err) {
    console.error("فشل التحميل:", err);
    return null;
  }
}
~~~

- [[console.error]]: زي console.log بس على قناة الأخطاء (stderr).
- [[return null]]: رجّع قيمة واضحة معناها «مفيش داتا»، بدل ما الـ error يطلع للي نادى.

---

## ٥. النداء

~~~text app.mjs
const data = await loadDashboard(1);
~~~

ده **top-level await**: await في أول الملف من غير async function، شغال في ES modules بس (ملف [[.mjs]] أو [[type="module"]]).

~~~text الناتج: على api.example.com
فشل التحميل: [TypeError: fetch failed] {
  [cause]: Error: getaddrinfo ENOTFOUND api.example.com
      at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26) {
    errno: -3008,
    code: 'ENOTFOUND',
    syscall: 'getaddrinfo',
    hostname: 'api.example.com'
  }
}
null
~~~

الدومين مش موجود: الـ DNS (اللي بيحوّل اسم الدومين لـ IP) رد بـ [[ENOTFOUND]]، فـ fetch رمت [[TypeError: fetch failed]] وجواها السبب في [[cause]]. والـ catch طبعه ورجّع null.

~~~text الناتج: على السيرفر المحلي
{"user":{"id":1,"name":"Sara"},"orders":[{"id":10,"total":250}]}
~~~

---

## ٦. من غير await

~~~text app.mjs
const p = loadDashboard(2);
console.log(p instanceof Promise);
~~~

~~~text الناتج
true
فشل التحميل: Error: HTTP 404
    at loadDashboard (file:///C:/Users/ali/code/app.mjs:...)
    ...
~~~

- من غير await، [[p]] هو الـ **Promise** نفسه مش النتيجة. و [[instanceof Promise]] بـ true.
- لاحظ الترتيب: [[true]] اتطبعت **قبل** رسالة الفشل. الدالة اشتغلت لحد أول await ورجعت Promise فورًا، والسطر اللي بعدها كمّل، وباقي الدالة اشتغل بعدين.
- [[/users/2]] مش موجود في السيرفر المحلي، فرجع 404، و [[!res.ok]] رمت.

---

## ٧. نسيت await (التجربة)

~~~text app.mjs
const user = res.json();
console.log(user, user.id);
~~~

~~~text الناتج
Promise { <pending> } undefined
~~~

[[user]] بقى Promise مش object، و [[user.id]] بـ undefined. والكود **مبيقعش**: الـ URL التاني هيبقى [[orders?user=undefined]]. ده أشهر bug في الـ async.

---

## الخلاصة

| الكتابة | معناها |
|---|---|
| [[async function f()]] | f بترجّع Promise دايمًا |
| [[await p]] | وقّف الدالة دي لحد ما p يخلص، وهات قيمته، أو ارمي الـ error |
| [[try/catch]] حوالين await | بيمسك أي Promise فشل |
| [[await]] في أول ملف ESM | top-level await |
| نداء async من غير await | بتاخد Promise مش النتيجة |

- كل await ورا التاني بيستنى اللي قبله. ده صح لو التاني محتاج الأول، وبطء من غير لازمة لو مستقلين.
- [[res.ok]] لازم تتفحص، fetch مبترميش على 404 و 500.`,
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
          teach: R`## الكود ده بيعمل إيه؟

٤ طرق تستنى كذا Promise مع بعض: [[Promise.all]] (كلهم لازم ينجحوا)، و [[Promise.allSettled]] (هات نتيجة كل واحد مهما حصل)، و [[Promise.race]] (أول واحد يخلص)، و [[Promise.any]] (أول واحد ينجح).

اتشغّل في Node 24 كملف [[.mjs]] على سيرفر صغير محلي بدل [[api.example.com]]، وكل مسار بيرد بعد وقت محدد: [[/me]] و [[/orders]] و [[/settings]] 300ms، و [[/a]] و [[/b]] 100ms (و [[/b]] بيرد 500 بنص مش JSON)، و [[/slow]] 5 ثواني، و [[/mirror1]] 400ms و [[/mirror2]] 200ms. وقِسنا الوقت حوالين كل خطوة.

---

## ١. الـ helper

~~~text app.mjs
const api = (path) => fetch($__bthttps://api.example.com$__{path}$__bt).then((r) => r.json());
~~~

- arrow function بتاخد path، وتعمل fetch، و [[.then((r) => r.json())]] تحوّل الرد لـ object.
- بترجّع Promise. ولاحظ إنها **مبتفحصش** [[r.ok]]، وده هيبان تحت.

---

## ٢. [[Promise.all]]

~~~text app.mjs
const [user, orders, settings] = await Promise.all([
  api("/me"),
  api("/orders"),
  api("/settings"),
]);
~~~

من جوه لبرّه:

1. **وانت بتبني الـ array**، كل [[api(...)]] بيتنادي، فالـ ٣ طلبات **بيبدأوا فورًا مع بعض**. الـ array فيها ٣ Promises.
2. [[Promise.all([...])]]: بترجّع Promise واحد بيخلص لما **كلهم** يخلصوا، وقيمته array بالنتايج **بنفس ترتيب** الـ array، مش بترتيب الوصول.
3. [[await]]: استنى.
4. [[const [user, orders, settings] = ...]]: array destructuring: أول نتيجة في user، والتانية في orders، والتالتة في settings.

~~~text الناتج
all: 362ms { path: '/me' } { path: '/orders' } { path: '/settings' }
ورا بعض: 955ms
~~~

الـ ٣ مع بعض خدوا وقت **واحد** منهم تقريبًا (300ms + شوية). ولما جرّبنا [[await]] ورا بعض للـ ٣، خدوا 300 + 300 + 300.

### لو واحد فشل

جرّبنا [[Promise.all([api("/a"), api("/b")])]]: [[/b]] رجّع 500 ونص مش JSON، و api مبتفحصش ok، فـ [[r.json()]] وقعت:

~~~text الناتج
SyntaxError: Unexpected token 'o', "not json" is not valid JSON
~~~

all **فشلت كلها** بالـ error ده، ونتيجة [[/a]] الناجحة ضاعت. ده اسمه **fail-fast**.

---

## ٣. [[Promise.allSettled]]

~~~text app.mjs
const results = await Promise.allSettled([api("/a"), api("/b")]);
~~~

بتستنى الكل مهما حصل، **ومبتفشلش أبدًا**. بترجّع لكل Promise object بيوصف حصله إيه:

~~~text الناتج: console.log(results)
[
  { status: 'fulfilled', value: { path: '/a' } },
  {
    status: 'rejected',
    reason: SyntaxError: Unexpected token 'o', "not json" is not valid JSON
        at JSON.parse (<anonymous>)
        ...
  }
]
~~~

- [[status]]: [["fulfilled"]] (نجح) أو [["rejected"]] (فشل).
- [[value]]: القيمة لو نجح. [[reason]]: الـ error لو فشل.

~~~text app.mjs
const ok = results.filter((r) => r.status === "fulfilled").map((r) => r.value);
const failed = results.filter((r) => r.status === "rejected").map((r) => r.reason);
~~~

- [[filter]]: سيب العناصر اللي الشرط عليها true بس. و [[map]]: حوّل كل عنصر لحاجة تانية.
- فـ ok = قيم الناجحين، و failed = أسباب الفاشلين. طبعناهم (وحوّلنا كل reason لنص بـ [[e.name + ": " + e.message]]):

~~~text الناتج
ok: [ { path: '/a' } ] failed: [ $__btSyntaxError: Unexpected token 'o', "not json" is not valid JSON$__bt ]
~~~

---

## ٤. [[Promise.race]] للـ timeout

~~~text app.mjs
const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms));
const fast = await Promise.race([api("/slow"), timeout(3000)]);
~~~

- [[timeout(ms)]]: Promise **بيفشل** بعد ms. و [[_]] اسم باراميتر معناه «مش محتاجه» (resolve مش مستخدمة).
- [[Promise.race([...])]]: بتاخد نتيجة **أول واحد يخلص**، نجح أو فشل.
- [[/slow]] بياخد 5 ثواني، و timeout بعد 3، فالـ timeout كسب:

~~~text الناتج
race: timeout 3011ms
~~~

خلي بالك: الطلب نفسه **فضل شغال** في الخلفية لحد ما خلص. race مبتلغيش حاجة (الإلغاء الحقيقي بـ AbortController، الدرس الجاي).

---

## ٥. [[Promise.any]]

~~~text app.mjs
const first = await Promise.any([api("/mirror1"), api("/mirror2")]);
~~~

أول واحد **ينجح**، وبتتجاهل الفاشلين:

~~~text الناتج
any: { path: '/mirror2' } 217ms
~~~

[[/mirror2]] أسرع (200ms) فكسب. ولو **كلهم** فشلوا:

~~~text الناتج: Promise.any على اتنين rejected
AggregateError: All promises were rejected [ 'x1', 'x2' ]
~~~

[[AggregateError]] error فيه [[errors]]: array بكل الأسباب.

---

## ٦. المقارنة بالوقت (الـ solCode)

~~~text app.mjs
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const a = () => wait(500), b = () => wait(1000), c = () => wait(1500);
console.time("ورا بعض");
await a(); await b(); await c();
console.timeEnd("ورا بعض");
console.time("Promise.all");
await Promise.all([a(), b(), c()]);
console.timeEnd("Promise.all");
~~~

- [[console.time("اسم")]] بيبدأ ساعة بالاسم ده، و [[console.timeEnd("اسم")]] بيطبع الوقت من ساعتها.

~~~text الناتج
ورا بعض: 3.020s
Promise.all: 1.509s
~~~

ورا بعض = 0.5 + 1 + 1.5 = 3 ثواني. مع بعض = وقت **أطولهم** بس (1.5).

---

## الخلاصة

| الدالة | بتخلص إمتى | لو فيه فشل |
|---|---|---|
| [[Promise.all]] | لما كلهم ينجحوا | بتفشل فورًا بأول error |
| [[Promise.allSettled]] | لما كلهم يخلصوا | مبتفشلش، كل واحد ليه status |
| [[Promise.race]] | أول واحد يخلص | لو الأول فشل، بتفشل |
| [[Promise.any]] | أول واحد ينجح | بتفشل بـ AggregateError لو كلهم فشلوا |

- الطلبات بتبدأ **لحظة ما تنادي الدالة**، مش لحظة الـ await. والدوال دي بتستنى بس، ومبتلغيش حاجة.
- وكمان القيم اللي مش Promises بتتقبل عادي: [[Promise.all([1, Promise.resolve(2), "three"])]] رجّعت 1 و 2 و [['three']] بالترتيب.`,
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
          teach: R`## الكود ده بيعمل إيه؟

جزئين: دالة [[api]] واحدة تستخدمها في المشروع كله بدل fetch مكررة (بتبعت JSON، وبتحط timeout، وبترمي error على 404 و 500)، ودالة [[search]] بتلغي طلب البحث القديم كل ما اليوزر يكتب حرف جديد.

اتشغّل في Node 24 كملف [[.mjs]] على سيرفر صغير محلي بدل [[api.example.com]]، والسيرفر بيطبع كل طلب بيوصله: الـ method والمسار والـ Content-Type والـ body. وجزء [[res.ok]] والـ timeout اتجرّب كمان في Chrome.

---

## ١. توقيع الدالة

~~~text app.mjs
async function api(path, { body, ...options } = {}) {
~~~

- [[path]]: المسار، زي [["/orders"]].
- التاني object خيارات، وبنفكّه:
- [[body]]: الداتا اللي هتتبعت، كـ object عادي.
- [[...options]]: اسمها **rest**: «كل الخصايص الباقية (method و headers و signal...) حطها في object اسمه options». فـ body اتشالت منه.
- [[= {}]]: لو مبعتش خيارات خالص.

---

## ٢. نداء fetch

~~~text app.mjs
  const res = await fetch($__bthttps://api.example.com$__{path}$__bt, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
    body: body ? JSON.stringify(body) : undefined,
    signal: options.signal ?? AbortSignal.timeout(8000),
  });
~~~

fetch بتاخد URL و object خيارات. نبنيه سطر سطر:

| السطر | معناه |
|---|---|
| [[...options]] | **spread**: انسخ كل الخيارات اللي اتبعتت (زي [[method: "POST"]]) |
| [[headers: { ... }]] | الـ headers: معلومات زيادة مع الطلب |
| [[Content-Type: application/json]] | قول للسيرفر «الـ body ده JSON» |
| [[...options.headers]] | وزوّد أي headers اتبعتت (ولو فيها Content-Type تغطّي على الافتراضي) |
| [[body ? JSON.stringify(body) : undefined]] | لو فيه body حوّله لنص JSON. fetch مبتبعتش object، بتبعت نص |
| [[options.signal ?? AbortSignal.timeout(8000)]] | استخدم الـ signal اللي اتبعت، ولو مفيش، اعمل واحدة بتلغي بعد 8 ثواني |

- [[??]] اسمها **nullish coalescing**: «لو اللي على الشمال null أو undefined، خد اللي على اليمين».
- [[AbortSignal.timeout(ms)]]: signal جاهزة بتلغي الطلب لوحدها بعد الوقت ده.

---

## ٣. فحص الرد

~~~text app.mjs
  if (!res.ok) throw new Error($__btHTTP $__{res.status}: $__{await res.text()}$__bt);
  return res.status === 204 ? null : res.json();
}
~~~

- [[res.ok]]: true لو الـ status من 200 لـ 299. fetch **مبترميش** error على 404 أو 500، الرد بيوصل عادي. جرّبنا [[fetch("/nope")]] من غير الدالة:

~~~text الناتج
fetch 404 بس: false 404 Not Found
~~~

يعني [[ok]] = false، و [[status]] = 404، و [[statusText]] = Not Found، ومفيش error. ونفس الحاجة في Chrome: ok بـ [[false]] و status بـ [[404]] من غير error.

- [[await res.text()]]: اقرا نص الرد وحطه في رسالة الـ error، عشان تعرف السيرفر قال إيه.
- [[res.status === 204]]: 204 = «No Content»، نجح بس مفيش body. لو ناديت json عليه هيقع، فبنرجّع null.

~~~text الناتج: await api("/nope")
HTTP 404: {"error":"Not found"}
~~~

ومن الحاجات اللي اتجرّبت: الـ body **بيتقري مرة واحدة**. بعد [[res.text()]] جرّبنا [[res.json()]]:

~~~text الناتج
TypeError: Body is unusable: Body has already been read
~~~

---

## ٤. POST

~~~text app.mjs
await api("/orders", { method: "POST", body: { productId: 5 } });
~~~

~~~text الناتج
[server] POST /orders application/json {"productId":5}
POST: { id: 7, productId: 5 }
~~~

السيرفر استلم method = POST، و Content-Type = JSON، والـ body نص JSON. وجرّبنا [[DELETE]] على مسار بيرد 204: الدالة رجّعت [[null]] من غير ما تقع.

### الـ timeout

جرّبنا [[api("/slow", { signal: AbortSignal.timeout(300) })]] على مسار بياخد 10 ثواني:

~~~text الناتج
timeout: TimeoutError: The operation was aborted due to timeout
~~~

اسمه [[TimeoutError]]. وفي Chrome نفس التجربة طلّعت [[TimeoutError: signal timed out]].

---

## ٥. [[search]]: الغي القديم

~~~text app.mjs
let controller;
async function search(q) {
  controller?.abort();
  controller = new AbortController();
~~~

- [[let controller;]]: متغير برّه الدالة، بيفتكر الـ controller بتاع **آخر** بحث. [[let]] مش const لأننا هنغيّره.
- [[controller?.abort()]]: لو فيه بحث قبل كده، الغيه. و [[?.]] عشان أول مرة controller بـ undefined.
- [[new AbortController()]]: object فيه حاجتين: [[signal]] (بتتبعت مع الطلب)، و [[abort()]] (بتلغيه).

~~~text app.mjs
  try {
    return await api($__bt/search?q=$__{encodeURIComponent(q)}$__bt, { signal: controller.signal });
~~~

- [[encodeURIComponent(q)]]: بيحوّل أي حروف خاصة أو عربي لشكل آمن في الـ URL. جرّبنا:

~~~text الناتج: encodeURIComponent("قهوة & شاي")
%D9%82%D9%87%D9%88%D8%A9%20%26%20%D8%B4%D8%A7%D9%8A
~~~

المسافة بقت [[%20]]، و [[&]] بقت [[%26]]. من غيرها، الـ [[&]] كانت هتقطع الـ query لحتتين.

- [[{ signal: controller.signal }]]: اربط الطلب ده بالـ controller، فلو حد عمل abort، الطلب يتلغي.
- [[return await]]: await هنا مهمة: من غيرها، لو الطلب اتلغى، الـ catch اللي تحت مش هيمسكه.

~~~text app.mjs
  } catch (err) {
    if (err.name === "AbortError") return;
    throw err;
  }
}
~~~

- الإلغاء بيرمي error اسمه [[AbortError]]. ده مش مشكلة، احنا اللي لغيناه، فرجّع من غير حاجة.
- أي error تاني (404، timeout) ارميه عادي.

### التجربة

نادينا ٣ بحوث ورا بعض بسرعة: [["ق"]] ثم [["قه"]] ثم [["قهوة & شاي"]]:

~~~text الناتج
   اتلغى: ق | This operation was aborted
   اتلغى: قه | This operation was aborted
   [server] GET /search?q=قهوة & شاي application/json -
results: undefined undefined { q: 'قهوة & شاي' }
~~~

أول اتنين اتلغوا قبل ما يوصلوا للسيرفر أصلًا، ورجّعوا undefined. وآخر واحد بس هو اللي وصل ورجع. ده بالظبط اللي محتاجه في autocomplete: رد قديم بطيء ميكتبش فوق رد جديد.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[if (!res.ok) throw]] | fetch مبترميش على 404 و 500 |
| [[JSON.stringify(body)]] و Content-Type | fetch بتبعت نص، والسيرفر لازم يعرف إنه JSON |
| [[AbortSignal.timeout(ms)]] | الطلب ميفضلش معلّق للأبد ([[TimeoutError]]) |
| [[new AbortController()]] و [[abort()]] | تلغي طلب بإيدك ([[AbortError]]) |
| [[encodeURIComponent]] | أي input من اليوزر في الـ URL |
| [[res.json()]] أو [[res.text()]] | مرة واحدة بس للـ body |`,
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
          teach: R`## الكود ده بيعمل إيه؟

بيحفظ ٣ عناصر بدالة [[save]] بتاخد 100ms، بـ ٥ طرق: [[forEach]] (غلط)، و [[for...of]] (واحد ورا واحد)، و [[Promise.all]] (كلهم مع بعض)، و batches (اتنين اتنين)، و [[Array.fromAsync]]. اتشغّل في Node 24 كملف [[.mjs]]، وقدام كل سطر مطبوع الوقت من أول البرنامج.

---

## ١. التجهيز

~~~text app.mjs
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const save = async (id) => { await wait(100); console.log("saved", id); return id; };
const ids = [1, 2, 3];
~~~

- [[wait(ms)]]: Promise بيخلص بعد ms (درس Promise).
- [[save]]: async arrow function: بتستنى 100ms (كأنها بتكلم قاعدة بيانات)، وتطبع، وترجّع الـ id.

---

## ٢. [[forEach]]: مبتستناش

~~~text app.mjs
ids.forEach(async (id) => { await save(id); });
console.log("forEach خلصت؟ لأ، لسه محدش اتحفظ");
~~~

- [[forEach]] بتنادي الـ callback لكل عنصر. الـ callback هنا [[async]]، فبيرجّع Promise.
- بس forEach **بترمي** اللي الـ callback بيرجّعه، ومبتستناش حاجة. هي نفسها بترجّع [[undefined]] (طبعناها).

~~~text الناتج
   2ms forEach خلصت؟ لأ، لسه محدش اتحفظ | forEach رجّعت: undefined
 109ms saved 1
 110ms saved 2
 110ms saved 3
~~~

السطر اللي بعد forEach اتطبع عند 2ms، قبل أي حفظ. والـ ٣ اتحفظوا مع بعض بعد كده، ومحدش استناهم.

---

## ٣. [[for...of]]: واحد ورا واحد

~~~text app.mjs
for (const id of ids) {
  await save(id);
}
~~~

- [[for (const id of ids)]]: لف على عناصر الـ array، وكل لفة id بقيمة عنصر.
- [[await]] جوه الـ loop: الـ loop **نفسها** بتقف لحد ما save تخلص، وبعدين تروح للفة اللي بعدها.

~~~text الناتج
 266ms saved 1
 376ms saved 2
 484ms saved 3
~~~

كل واحد بعد اللي قبله بـ 100ms تقريبًا: 300ms كلهم. ده الصح لو الترتيب مهم، أو كل عملية محتاجة اللي قبلها.

---

## ٤. [[Promise.all]] مع [[map]]: كلهم مع بعض

~~~text app.mjs
const saved = await Promise.all(ids.map((id) => save(id)));
~~~

من جوه لبرّه:

1. [[ids.map((id) => save(id))]]: map بتنادي save لكل عنصر **فورًا**، وبترجّع array فيها ٣ Promises. (map زي forEach مبتستناش، بس على الأقل بترجّع الـ Promises.)
2. [[Promise.all([...])]]: Promise واحد بيستنى الـ ٣.
3. [[await]]: استنى، وهات النتايج بالترتيب.

~~~text الناتج
 592ms saved 1
 592ms saved 2
 593ms saved 3
 593ms saved = [ 1, 2, 3 ]
~~~

الـ ٣ في نفس اللحظة: 100ms كلهم. أسرع، بس لو عندك ١٠ آلاف عنصر، هتبعت ١٠ آلاف طلب في نفس الوقت.

---

## ٥. batches: اتنين اتنين

~~~text app.mjs
for (let i = 0; i < ids.length; i += 2) {
  await Promise.all(ids.slice(i, i + 2).map(save));
}
~~~

- [[for (let i = 0; i < ids.length; i += 2)]]: loop عادية بس بتزوّد i اتنين كل لفة: i = 0 ثم 2.
- [[ids.slice(i, i + 2)]]: هات العناصر من i لحد قبل i + 2. فأول لفة [[slice(0, 2)]] = 1 و 2، والتانية [[slice(2, 4)]] = 3 بس (مفيش رابع).
- [[.map(save)]]: نفس [[.map((id) => save(id))]]، بنبعت الدالة نفسها.
- [[await Promise.all(...)]]: استنى الدفعة كلها قبل اللي بعدها.

~~~text الناتج
 702ms saved 1
 702ms saved 2
 812ms saved 3
~~~

1 و 2 مع بعض، وبعد 100ms الـ 3. حل وسط: سريع، ومش بتضرب السيرفر بكل حاجة مرة واحدة.

---

## ٦. [[Array.fromAsync]]

~~~text app.mjs
const all = await Array.fromAsync(ids, async (id) => save(id));
~~~

بتلف على ids، وتنادي الدالة لكل عنصر، و**تستنى كل واحد قبل اللي بعده**، وترجّع array بالنتايج:

~~~text الناتج
 921ms saved 1
1030ms saved 2
1139ms saved 3
1139ms all = [ 1, 2, 3 ]
~~~

يعني زي for...of بالظبط، بس بترجّع array في سطر واحد.

---

## ٧. لو save فشلت (التجربة والـ solCode)

خلّينا save ترمي error لـ id 2:

~~~text app.mjs
try {
  for (const id of ids) await save(id);
} catch (e) { console.log("for...of:", e.message); }
try {
  await Promise.all(ids.map(save));
} catch (e) { console.log("Promise.all:", e.message); }
~~~

~~~text الناتج
saved 1
for...of: فشل حفظ 2
saved 1
Promise.all: فشل حفظ 2
saved 3
~~~

- **for...of**: الـ catch مسك الـ error، والـ loop وقفت، فـ 3 **متحفظش**.
- **Promise.all**: الـ catch مسك أول فشل، بس [[saved 3]] اتطبعت **بعده**: الـ ٣ كانوا بدأوا خلاص، و Promise.all بتفشل من غير ما تلغي الباقي.

وجرّبنا **forEach** بنفس الـ save جوه try:

~~~text الناتج: Node
مفيش error هنا
saved 1
file:///C:/Users/ali/code/app.mjs:2
...
Error: فشل حفظ 2

Node.js v24.19.0
~~~

الـ try **مامسكش حاجة** (السطر اللي بعد forEach اتطبع عادي)، والـ error طلع unhandled rejection، و Node قفل البرنامج بـ exit code 1 قبل ما يوصل لـ saved 3. وفي Chrome نفس الكود طبع [[saved 1]] و [[saved 3]]، والـ error ظهر أحمر في Console ومحدش مسكه.

---

## الخلاصة

| الطريقة | الوقت (3 × 100ms) | الترتيب | الـ error |
|---|---|---|---|
| [[forEach(async ...)]] | مبتستناش خالص | مع بعض ومحدش مستني | بيضيع (unhandled) |
| [[for...of]] + await | ~300ms | واحد ورا واحد | try بيمسكه والباقي يقف |
| [[Promise.all(map)]] | ~100ms | مع بعض | try بيمسكه، والباقي يكمّل |
| batches | ~200ms | n في المرة | زي Promise.all جوه كل دفعة |
| [[Array.fromAsync]] | ~300ms | واحد ورا واحد | try بيمسكه والباقي يقف (اتجرّبت) |

- **متستخدمش forEach مع async أبدًا**. ونفس المشكلة في [[filter(async ...)]]: جرّبناها و رجّعت الـ ٣ عناصر كلهم، لأن كل Promise بيعتبر true.`,
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

لما save ترمي لـ id 2: مع forEach الـ error مش بيتمسك بأي try/catch حواليها، وبيطلع unhandled rejection: Node بيقفل البرنامج بـ exit code 1 قبل ما id 3 يتحفظ، وفي المتصفح id 3 بيتحفظ عادي والـ error بيظهر أحمر في Console. مع for...of الـ try/catch بيمسكه، و id 3 مبيتحفظش لأن الـ loop وقفت. مع Promise.all الـ catch بيمسكه بعد 100ms، بس id 3 بيتحفظ برضه لأن الـ promises كانت بدأت كلها، و Promise.all بترفض عند أول فشل من غير ما تلغي الباقي. لو عايز كل النتايج استخدم allSettled.`,
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
