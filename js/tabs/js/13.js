// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "async: الـ Promises و await",
      l: 2,
      n: "callbacks ثم Promises ثم async/await، و Promise.all وأخواتها، و fetch صح، و async جوه loops",
      projects: [
        { lvl: 'صغير', t: R`retry بسيط`, what: R`[[retry(fn, { times = 3, delay = 200 } = {})]] بتنادي fn، ولو فشلت تستنى delay وتحاول تاني لحد times، وتطبع رقم كل محاولة. من دروس Promise و async و await.`, done: R`دالة بتفشل مرتين وتنجح التالتة ← retry بترجّع قيمتها بعد ٣ محاولات في حوالي 400ms. دالة بتفشل دايمًا ← بيترمي آخر error بعد [[times]] محاولات بالظبط. و [[times: 1]] ← محاولة واحدة ومفيش استنا.` },
        { lvl: 'صغير', t: R`عدّاد تنازلي بـ await`, what: R`صفحة فيها زرار «ابدأ» بيعد من 5 لـ 0 في عنصر بـ [[for]] و [[await wait(1000)]]، والزرار بيتقفل ([[disabled]]) لحد ما يخلص، وفي الآخر «يلا!». من درس async و await ووحدة الـ DOM.`, done: R`الأرقام بتتغير كل ثانية تقريبًا، والضغط على الزرار وهو شغال مبيبدأش عدّاد تاني، وبعد ما يخلص الزرار بيرجع يشتغل والعد بيبدأ من 5 تاني.` },
        { lvl: 'متوسط', t: R`بروفايل GitHub`, what: R`input لاسم يوزر وزرار، بيجيب [[https://api.github.com/users/NAME]] و [[https://api.github.com/users/NAME/repos]] بـ [[Promise.all]]، ويعرض الاسم والصورة وأعلى ٥ repos بالنجوم، مع «بيحمّل...»، و 404 بتطلع «اليوزر مش موجود»، وأي error تاني رسالة عامة، والضغط مرة تانية بيلغي الطلب القديم بـ AbortController. من دروس الوحدة ووحدة الـ DOM.`, done: R`يوزر موجود ← طلبين بيبدأوا مع بعض في Network. يوزر مش موجود ← «اليوزر مش موجود» مش صفحة فاضية. ضغطتين ورا بعض ← طلبات الأولى canceled والنتيجة بتاعة التانية. والنت مقطوع (Offline في DevTools) ← رسالة مفهومة.` },
        { lvl: 'متوسط', t: R`بحث بيلغي القديم`, what: R`input بحث على API منتجات (زي [[https://dummyjson.com/products/search?q=]] أو أي API عندك)، كل حرف بيلغي الطلب اللي قبله بـ AbortController، والنتايج بتتعرض في لستة مع «بيحمّل...» و «مفيش نتايج». من دروس fetch و AbortController و async و await.`, done: R`كتابة [[phone]] بسرعة ← في Network الطلبات القديمة canceled، والنتيجة اللي ظاهرة دايمًا بتاعة آخر نص. الـ AbortError مبيظهرش كرسالة غلط. والـ input الفاضي بيمسح النتايج من غير request.` },
        { lvl: 'كبير', t: R`downloader بحد أقصى ومحاولات`, what: R`سكربت Node بياخد لستة URLs من ملف JSON، ويجيبهم بـ [[pool]] (٣ في نفس الوقت بالكتير)، ولكل طلب [[AbortSignal.timeout]]، و retry مرتين لو الشبكة فشلت أو 5xx بس (مش 4xx). كل نتيجة [[{ url, ok, status, ms, error }]]، وفي الآخر جدول بـ [[console.table]] وكود خروج ١ لو فيه فشل. وكل خطوة بتتكتب في لوج بالوقت، والأخطاء [[HttpError]] بـ status و cause. من الوحدة دي ووحدة الأخطاء.`, done: R`لستة فيها URL سليم و 404 ودومين مش موجود وواحد أبطأ من الـ timeout: الجدول بيقول ١ نجح و ٣ فشلوا وسبب كل واحد، والـ 404 اتجرب مرة واحدة بس، والدومين الغلط ٣ مرات. عدّاد [[active]] مبيعدّيش ٣. ملف JSON بايظ أو لستة فاضية ← رسالة واضحة وكود ١. والتشغيل مرتين بيدّي نفس الجدول.`, ext: R`خلّي الـ retry يستنى أكتر كل مرة (exponential backoff)، واحفظ الـ responses في ملفات، ولو التشغيل اتقطع في النص يكمّل من اللي فاضل بس.` },
        { lvl: 'فكرة', t: R`لوحة بيانات لحاجة بتحبها`, what: R`اختار API مجاني (طقس، أو أسعار عملات، أو ماتشات، أو أفلام) واعمل صفحة بتجيب أكتر من endpoint مع بعض، وبتعرض اللي نجح حتى لو حاجة فشلت (allSettled)، وزرار تحديث بيلغي القديم. انت اللي بتختار الـ API والشكل.`, done: R`الصفحة بتشتغل لما endpoint واحد يفشل (غيّر الـ URL بتاعه وجرّب)، ومفيش [[await]] جوه forEach، وكل fetch بيفحص [[res.ok]].`, ext: R`زوّد cache في [[Map]] بحيث نفس الطلب في خلال ٣٠ ثانية ميتبعتش تاني، وزرار «جرّب تاني» للحتة اللي فشلت لوحدها.` },
      ],
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
          practice: [
            { lvl: 'سريع', t: R`اقرا وتوقّع: [[console.log("1"); new Promise((r) => { console.log("2"); r(); }).then(() => console.log("3")); console.log("4");]]. اكتب الترتيب على ورقة وبعدين شغّله.`, done: R`الترتيب [[1 2 4 3]]: الـ executor اللي جوه [[new Promise]] بيشتغل فورًا (sync)، والـ then بس هي اللي بتستنى. ولو كتبت [[1 4 2 3]] ارجع لجملة «الـ executor بيتنادي على طول».` },
            { lvl: 'تطبيق', t: R`refactor: عندك دالة قديمة بـ callback: [[loadUser(id, cb)]] بتستنى 300ms بـ setTimeout وبتنادي [[cb(new Error("id غلط"))]] لو [[id <= 0]] أو [[cb(null, { id, name: "Sara" })]]. اكتب [[loadUserP(id)]] بترجّع Promise بتلفها بـ [[new Promise]] من غير ما تغيّر loadUser نفسها.`, done: R`[[loadUserP(1).then((u) => console.log(u.name))]] بيطبع [[Sara]] بعد حوالي 300ms، و [[loadUserP(0).catch((e) => console.log(e.message))]] بيطبع [[id غلط]]، و [[loadUser]] الأصلية لسه شغالة بالـ callback زي الأول.` },
            { lvl: 'تحدي', t: R`محاكاة بوابة ماتش: اكتب [[createGate()]] بـ [[Promise.withResolvers()]] بترجّع [[{ wait, open }]]. ٣ مشجعين بينادوا [[gate.wait().then(() => console.log("دخل", name))]]، وبعد ثانية [[gate.open()]]، وبعدها [[gate.open()]] تاني، وبعدها مشجع رابع بيوصل متأخر وبينادي wait.`, done: R`محدش بيطبع قبل الثانية. بعد أول open التلاتة بيطبعوا «دخل» بنفس ترتيب ما وصلوا، و open التانية مبتعملش حاجة ومفيش error (الـ Promise بيتحسم مرة واحدة). والرابع بيدخل على طول لأن الـ Promise خلص خلاص.` },
          ],
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

## ٦. unhandled rejection: ليه Node بيوقّع البرنامج كله

من Node 15 الوضع الافتراضي إن أي Promise اترفض ومحدش مسكه **بيوقّع الـ process**، زي throw محدش مسكه بالظبط. قبل كده كان بيطبع تحذير ويكمّل، وده كان بيخبّي bugs لحد ما السيرفر يبقى في حالة غريبة. Node بيقرر إن الـ Promise «ملوش handler» بعد ما الكود المتزامن والـ microtasks يخلصوا، فـ [[.catch]] لازم يتحط قبل كده.

الوضع ده بيتغيّر بـ flag اسمه [[--unhandled-rejections]]. جرّبت كل وضع على [[Promise.reject(new Error("x"))]] وبعده timer بيطبع «كمّل»، من غير أي listener:

| الوضع | اللي حصل (Node 24) | كود الخروج |
|---|---|---|
| [[throw]] (الافتراضي) | البرنامج وقع بالـ stack، و «كمّل» متطبعتش | 1 |
| [[warn]] | طبع [[UnhandledPromiseRejectionWarning: Error: x]] على stderr وكمّل | 0 |
| [[none]] | ساكت خالص وكمّل، ودي أخطر حاجة | 0 |
| [[strict]] | وقع حتى لو فيه [[unhandledRejection]] listener | 1 |

> متغيّرش الافتراضي عشان «التحذير يختفي». الصح إنك تمسك الـ rejection في مكانه ([[.catch]] أو [[await]] جوه try)، وتحط handler عام يسجّل أي حاجة فلتت ويخرج. ده درس «الأخطاء العامة: unhandledrejection و uncaughtException» في وحدة الأخطاء.

والمتصفح مختلف: الصفحة **مبتقعش**، بس بيكتب [[Uncaught (in promise)]] في Console وبيطلّع event اسمه [[unhandledrejection]] على [[window]] (نفس الدرس).

---

## ٧. Promise.try: كود ممكن يرمي sync أو async في سلسلة واحدة

مشكلة: دالة بترجّع Promise، بس جواها سطر ممكن يرمي **قبل** ما الـ Promise يتعمل. الـ [[.catch]] مش هيشوفه:

~~~text pt.mjs
function readConfig(text) {
  return JSON.parse(text);
}
function readConfigAsync(text) {
  return Promise.resolve(readConfig(text));
}
try {
  readConfigAsync("{").catch((e) => console.log("catch اتنادت؟"));
} catch (e) { console.log("لأ: اترمى sync:", e.name); }
~~~

~~~text الناتج (Node 24)
لأ: اترمى sync: SyntaxError
~~~

[[readConfig("{")]] رمت وهي بتتحسب كـ argument لـ [[Promise.resolve]]، يعني قبل ما يبقى فيه Promise أصلًا، فالـ [[.catch]] عمره ما اتنادى. اللي بينادي الدالة لازم يحط try **و** catch، وده سهل يتنسي.

[[Promise.try(fn, ...args)]] (ES2025، موجودة في Node 24 والمتصفحات الحديثة) بتنادي [[fn]] **على طول** وتحوّل أي نتيجة لـ Promise: لو رجّعت قيمة يبقى fulfilled، ولو رمت يبقى rejected، ولو رجّعت Promise بتستناه:

~~~text pt.mjs
Promise.try(readConfig, "{").catch((e) => console.log("Promise.try:", e.name));
Promise.try(readConfig, '{"port":3000}').then((c) => console.log("port", c.port));
Promise.try(async () => { throw new Error("async"); }).catch((e) => console.log("async:", e.message));
console.log(Promise.try(() => 5) instanceof Promise);
console.log("sync انتهى");
~~~

~~~text الناتج (Node 24)
true
sync انتهى
Promise.try: SyntaxError
port 3000
async: async
~~~

- [[Promise.try(readConfig, "{")]]: الـ arguments بعد الدالة بتتبعتلها، فده زي [[readConfig("{")]] بس الـ throw بقى rejection.
- الدالة اتنادت **فورًا** (sync)، بس الـ [[then]] و [[catch]] بيتنادوا بعدين كـ microtasks، عشان كده «sync انتهى» اتطبعت الأول.
- الفرق عن [[Promise.resolve().then(fn)]] (الحيلة القديمة، وبتمسك الـ throw برضه): هناك [[fn]] بتتأجّل لـ microtask، وهنا بتتنفّذ في نفس اللحظة.

| الطريقة | الـ throw المتزامن | [[fn]] بتتنفّذ إمتى |
|---|---|---|
| [[Promise.resolve(fn())]] | بيطلع برّه كـ throw عادي، والـ catch مش شايفه | فورًا |
| [[Promise.resolve().then(fn)]] | بيبقى rejection | بعدين، في microtask |
| [[Promise.try(fn)]] | بيبقى rejection | فورًا |
| [[async () => fn()]] ونداها | بيبقى rejection | فورًا |

آخر سطر: أي دالة [[async]] بتعمل نفس الحماية، فـ [[Promise.try]] مفيدة بالذات لما مش عايز تكتب wrapper، أو مع مكتبات بتاخد callback ممكن يرجّع قيمة أو Promise.

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
- حط catch في آخر كل سلسلة، وإلا Node هيقفل البرنامج (الافتراضي من Node 15، ويتغيّر بـ [[--unhandled-rejections]] بس متغيّروش).
- [[Promise.try(fn)]] بتخلّي الـ throw المتزامن rejection، فـ [[.catch]] واحد يمسك الاتنين.`,
          lines: [
            R`دالة [[wait]] بتاخد عدد milliseconds وبترجّع Promise بيخلص بعد المدة دي. هي نسخة من [[setTimeout]] تقدر تعمل عليها [[then]] أو [[await]].`,
            R`[[new Promise]] بياخد دالة (executor) بتتنفذ على طول، وبيدّيها [[resolve]]. بنسلّم [[resolve]] نفسها للـ [[setTimeout]]، فأول ما الوقت يخلص بتتنادى والـ Promise يبقى fulfilled. مفيش [[reject]] هنا لأن الاستنا مبيفشلش.`,
            R`نهاية [[wait]].`,
            R`[[getUser]] بتمثّل API وهمي: بترجّع Promise فيه يوزر بعد شوية، أو بتفشل لو الـ id غلط. كده نجرّب حالة النجاح وحالة الفشل من غير شبكة.`,
            R`الـ executor هنا بياخد [[resolve]] (نجاح) و [[reject]] (فشل). الـ Promise بيفضل pending لحد ما واحدة منهم تتنادى، وأول واحدة بس هي اللي بتحسب: أي نداء بعدها بيتجاهَل.`,
            R`[[setTimeout]] بيأجّل الرد ٣٠٠ms عشان يقلّد وقت الطلب على الشبكة. من غيره الـ Promise هيخلص بسرعة جدًا ومش هتحس إن فيه استنا.`,
            R`لو الـ id صفر أو سالب بننادي [[reject]] ومعاها [[Error]] (مش نص)، عشان اللي يمسكه يلاقي [[message]] و stack trace يعرف منهم الغلط حصل فين.`,
            R`غير كده بننادي [[resolve]] بالـ object بتاع اليوزر، والقيمة دي هي اللي هتوصل لأول [[then]].`,
            R`نهاية دالة الـ [[setTimeout]]، و [[300]] هي المدة بالـ milliseconds.`,
            R`نهاية الـ executor والـ [[new Promise]].`,
            R`نهاية [[getUser]].`,
            R`النداء نفسه مبيستناش حاجة: بيرجّع Promise لسه pending على طول، والكود بيكمّل. اللي بعده بيقول «لما يخلص اعمل كذا».`,
            R`[[then]] بتتنادى لما الـ Promise ينجح ومعاها القيمة (اليوزر). اللي الدالة بترجّعه (الاسم) بيبقى قيمة Promise جديد، وده اللي بيخلّي السلسلة تكمّل.`,
            R`[[then]] التانية بتستلم الاسم اللي رجع من اللي قبلها وتطبعه: «الاسم: Sara». كل [[then]] بتشتغل بس بعد ما اللي قبلها تخلص.`,
            R`[[catch]] بتمسك أي reject أو error اترمى في أي خطوة قبلها في السلسلة. جرّب [[getUser(0)]] وهتلاقي الـ [[then]] الاتنين اتخطّوا ووصلنا هنا على طول بـ «فشل: id غلط».`,
            R`[[finally]] بتتنادى في الحالتين، نجاح أو فشل، ومبتاخدش القيمة. مكانها الطبيعي إنك تقفل loading spinner أو تنضّف حاجة.`,
            R`استخدام [[wait]]: بعد ٥٠٠ms الـ Promise بيخلص والـ [[then]] تطبع. ولأن الكود مبيقفش، أي سطر بعده هيتنفذ قبل الطباعة دي.`,
            R`[[Promise.withResolvers]] بترجّع Promise ومعاه [[resolve]] و [[reject]] بتوعه برّه الـ executor، فتقدر تخلّصه من مكان تاني خالص (زي event listener). موجودة في Node 22 والمتصفحات الحديثة.`
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
          practice: [
            { lvl: 'سريع', t: R`ابني زرار «حمّل البروفايل» و [[<p id="out">]]: الـ click بينادي [[async function load()]] بتكتب «بيحمّل...» وبعدين [[await getUser(1)]] (من درس Promise) وتكتب الاسم، ولو [[getUser(0)]] تكتب «فشل: » والرسالة. وجرّب [[console.log(load())]].`, done: R`النص بيبقى «بيحمّل...» حوالي 300ms وبعدين [[Sara]]، ومع id صفر «فشل: id غلط». و [[console.log(load())]] بيطبع [[Promise { <pending> }]] مش الاسم: async دايمًا بترجّع Promise.` },
            { lvl: 'تطبيق', t: R`refactor: حوّل سلسلة [[getUser(1).then(...).then(...).catch(...).finally(...)]] اللي في درس Promise لـ [[async function show(id)]] بـ await و try/catch/finally، ونادي [[await show(1)]] وبعدها [[await show(0)]].`, done: R`[[show(1)]] بتطبع [[الاسم: Sara]] وبعدين [[خلص]]، و [[show(0)]] بتطبع [[فشل: id غلط]] وبعدين [[خلص]]: نفس ناتج سلسلة الـ then بالظبط، ومفيش ولا then فاضلة في الكود.` },
            { lvl: 'تحدي', t: R`قارن وقيس بـ [[console.time]]: (أ) [[await wait(300); await wait(300);]] ورا بعض، و (ب) [[const a = wait(300), b = wait(300); await a; await b;]]. وبعدين في (ب) خلّي [[a]] يترفض بعد 100ms و [[b]] 500ms، وحط الكل جوه try/catch.`, done: R`(أ) حوالي 600ms و (ب) حوالي 300ms لأن الاتنين بدأوا مع بعض. والفخ: لما a يترفض وانت لسه مستني b، Node بيقع ويخرج بكود ١ حتى إن فيه try/catch، لأن محدش كان عامل await على a ساعة ما اترفض (unhandled rejection). و [[await Promise.all([a, b])]] بتمسكه صح في الـ catch.` },
          ],
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
            R`[[async]] قبل الدالة بتخليها ترجّع Promise دايمًا: اللي بترجّعه بـ [[return]] بيبقى قيمة الـ Promise، وأي error بيترمي جواها بيبقى reject. وكمان بتسمح تستخدم [[await]] جواها.`,
            R`[[try]] بيلف كل الخطوات، فلو أي [[await]] اترفض أو أي [[throw]] حصل، التنفيذ ينط على [[catch]] بدل ما الـ error يطلع برّه الدالة.`,
            R`[[await]] بيوقف الدالة دي بس (مش البرنامج كله) لحد ما الـ [[fetch]] يرجّع الرد، و [[res]] بيبقى object الـ Response. الـ body نفسه لسه مقريناهوش.`,
            R`[[fetch]] بيترفض بس لو الشبكة وقعت؛ لو السيرفر رد بـ 404 أو 500 بيعتبرها نجاح. فبنفحص [[res.ok]] (true للـ status من 200 لـ 299) ونرمي error بنفسنا عشان يروح للـ [[catch]].`,
            R`[[res.json]] بتقرا الـ body وتحوّله لـ object، وهي كمان بترجّع Promise فلازم [[await]]. لو الرد مش JSON صالح هترمي SyntaxError وهيوصل للـ [[catch]] برضه.`,
            R`الطلب ده محتاج [[user.id]] من اللي قبله، فلازم يستناه. ده المكان الصح للـ [[await]] ورا بعض؛ لو الطلبين مستقلين يبقى [[Promise.all]] أسرع.`,
            R`[[await]] ينفع في أي حتة في expression، فهنا بنقرا الـ JSON بتاع الطلبات جوه الـ object اللي راجع على طول. الدالة بترجّع Promise قيمته object فيه اليوزر وطلباته.`,
            R`[[catch]] بيستلم الـ error من أي خطوة فوق: شبكة وقعت، أو status غلط، أو JSON بايظ.`,
            R`[[console.error]] بيسجّل الـ error كامل (رسالة و stack) في الـ console كـ error مش log عادي، عشان تلاقيه وانت بتعمل debug.`,
            R`بدل ما نرمي الـ error لبرّه، بنرجّع [[null]] كقيمة واضحة معناها «فشل». اللي نادى الدالة يفحص [[null]] بدل ما يحتاج [[try]] بنفسه. ده اختيار تصميم: أحيانًا الأحسن ترمي.`,
            R`نهاية [[catch]].`,
            R`نهاية [[loadDashboard]].`,
            R`top-level await: [[await]] برّه أي دالة. شغال بس في ES modules (ملف [[.mjs]] أو [[type="module"]])، وفي script عادي هيدّي SyntaxError.`,
            R`من غير [[await]] مش بتاخد النتيجة، بتاخد الـ Promise نفسه وهو لسه pending. ده غلط شائع: تنسى [[await]] وتلاقي [[Promise { pending }]] بدل الداتا.`,
            R`بيطبع [[true]]: دليل إن أي دالة [[async]] بترجّع Promise مهما كانت بترجّع إيه جوّاها.`
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
          practice: [
            { lvl: 'سريع', t: R`اقرا وتوقّع: [[await Promise.all([1, wait(100).then(() => 2), Promise.resolve(3)])]] و [[await Promise.all([])]] هيرجّعوا إيه؟ وبعدين شغّلهم في ملف [[.mjs]] (بـ wait بتاعة درس Promise).`, done: R`الأول [[[ 1, 2, 3 ]]] بنفس ترتيب الـ array مش ترتيب الخلصان، والقيمة العادية [[1]] بتتعامل كأنها Promise خلص. والتاني [[[]]] على طول.` },
            { lvl: 'تطبيق', t: R`محاكاة dashboard: ٣ دوال وهمية: [[getUser]] تنجح بعد 200ms، و [[getOrders]] تنجح بعد 300ms، و [[getAds]] تفشل بعد 100ms. حمّلهم مرة بـ [[Promise.all]] ومرة بـ [[Promise.allSettled]]، واعرض اللي نجح، وللي فشل «الإعلانات مش متاحة».`, done: R`الـ all بيترفض بعد حوالي 100ms برسالة getAds ومبيرجّعش ولا قيمة حتى اللي نجحوا. والـ allSettled بيخلص بعد حوالي 300ms ومعاك الـ user والـ orders، و [[status: 'rejected']] للـ ads ومعاه [[reason.message]]، والصفحة بتعرض الاتنين و «الإعلانات مش متاحة».` },
            { lvl: 'تحدي', t: R`مسألة: اكتب [[withTimeout(promise, ms)]] بـ [[Promise.race]]، وبعدين [[firstOk(fns, ms)]] بتنادي كل الدوال وتاخد أول واحدة تنجح في خلال ms بـ [[Promise.any]] و withTimeout. جرّبها لما واحدة بس تنجح، ولما كلهم يفشلوا، ولما [[fns]] فاضية.`, done: R`لما واحدة تنجح بترجّع قيمتها حتى لو التانيين فشلوا قبلها. لما كلهم يفشلوا بيترمي [[AggregateError]] رسالته [[All promises were rejected]] و [[e.errors.length]] بيساوي عدد الدوال (وفيهم [[timeout]] للي اتأخرت). ومع لستة فاضية برضه AggregateError على طول، مش Promise بيستنى للأبد.` },
          ],
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
            R`helper صغير: بياخد path، يعمل [[fetch]]، ويحوّل الرد لـ JSON. كل نداء ليه بيرجّع Promise، وده اللي هنبعته لـ [[Promise.all]] تحت. (مش بيفحص [[res.ok]]، فده للتجربة بس.)`,
            R`[[Promise.all]] بتاخد array من Promises بقت شغالة بالفعل، وتستنى الكل يخلص. النتيجة array بنفس ترتيب الطلبات (مش ترتيب اللي خلص الأول)، فبنفكها لـ ٣ متغيرات بالـ destructuring.`,
            R`الطلب الأول ([[/me]]): بيبدأ فورًا أول ما السطر يتنفذ، مش لما [[Promise.all]] تتنادى. قيمته هتروح لـ [[user]].`,
            R`الطلب التاني ([[/orders]]) بيتبعت في نفس الوقت من غير ما يستنى الأول، وقيمته تروح لـ [[orders]].`,
            R`الطلب التالت ([[/settings]])، وقيمته تروح لـ [[settings]]. الوقت الكلي بقى وقت أبطأ طلب، مش مجموع التلاتة.`,
            R`نهاية الـ array. لو أي طلب فشل، [[Promise.all]] بتترفض فورًا بالـ error بتاعه ومش هتدّيك نتايج الباقيين (رغم إنهم بيكمّلوا في الخلفية).`,
            R`[[Promise.allSettled]] بتستنى الكل مهما حصل ومبتترفضش أبدًا. كل عنصر في النتيجة object فيه [[status]] ([[fulfilled]] أو [[rejected]]) ومعاه [[value]] أو [[reason]].`,
            R`بنسيب الناجحين بس ([[status]] بـ [[fulfilled]])، ونطلّع من كل واحد [[value]] بتاعه، يعني الداتا اللي رجعت.`,
            R`ونفس الفكرة للفاشلين: [[reason]] هو الـ error اللي اترفض بيه، فتقدر تسجّله أو تعرضه من غير ما يبوّظ الناجحين.`,
            R`[[timeout]] بترجّع Promise ملوش غير نهاية واحدة: يترفض بـ Error بعد ms. الـ [[_]] معناها إننا مش محتاجين [[resolve]].`,
            R`[[Promise.race]] بتاخد نتيجة أول واحد يخلص، نجاح أو فشل. لو الطلب أبطأ من ٣ ثواني الـ [[timeout]] يكسب ويرمي error. بس خلي بالك: الطلب مش بيتلغي وبيكمّل في الخلفية؛ عشان تلغيه فعلًا محتاج AbortController.`,
            R`[[Promise.any]] بتاخد أول واحد **ينجح** وبتتجاهل الفشل. مفيدة مع سيرفرات بديلة (mirrors). لو كلهم فشلوا بترمي AggregateError فيه [[errors]] بكل الأسباب.`
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
          practice: [
            { lvl: 'سريع', t: R`اقرا وتوقّع وبعدين جرّب في ملف [[.mjs]]: [[const r = await fetch("https://example.com/nope")]]، هل هيترمي error؟ اطبع [[r.ok]] و [[r.status]]، وبعدين اقرا [[await r.text()]] مرتين ورا بعض.`, done: R`مفيش error: بيطبع [[false 404]]. والقراية التانية بتقع بـ [[TypeError: Body is unusable: Body has already been read]]: الـ body بيتقري مرة واحدة.` },
            { lvl: 'تطبيق', t: R`ابني [[getJSON(url, { timeout = 5000 } = {})]]: بتعمل fetch بـ [[AbortSignal.timeout(timeout)]]، وترمي [[HttpError]] فيه [[status]] لو [[!res.ok]]، وفي الـ catch تفرّق بين ٣ أنواع بـ [[err.name]]. جرّبها على 404، وعلى [[timeout: 1]]، وعلى دومين مش موجود.`, done: R`الـ 404 بيطلع HttpError فيه [[status: 404]]. الـ timeout بيطلع [[err.name === "TimeoutError"]] (مش AbortError). والدومين الغلط بيطلع [[TypeError]] رسالته [[fetch failed]] والسبب الحقيقي في [[err.cause]]. والتلاتة رسايلهم لليوزر مختلفة.` },
            { lvl: 'تحدي', t: R`محاكاة بحث وانت بتكتب: استخدم [[search(q)]] اللي في الدرس، ونادي [[search("a")]] و [[search("ab")]] و [[search("abc")]] ورا بعض من غير await، وخزّن الـ ٣ Promises واطبع [[await Promise.all]] بتاعتهم. جرّبها على endpoint بيتأخر (مثلًا سيرفر Node صغير على localhost بيرد بعد 300ms).`, done: R`أول اتنين [[undefined]] (اتلغوا والـ catch رجّع من غير قيمة) والتالت بس فيه نتيجة [["abc"]]. وفي المتصفح، تاب Network بيكتب canceled جنب أول طلبين. ولو شلت [[controller?.abort()]] التلاتة بيرجعوا وأي واحد ممكن يوصل الأخير ويكتب فوق النتيجة الصح.` },
          ],
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
| [[options.signal ?? AbortSignal.timeout(8000)]] | استخدم الـ signal اللي اتبعت، ولو مفيش، اعمل واحدة بتلغي بعد 8 ثواني. خلي بالك: لو اتبعت signal الـ timeout بيضيع، والحل بـ [[AbortSignal.any]] في الجزء ٦ |

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

## ٦. AbortSignal.any: timeout وإلغاء مع بعض

فيه مشكلة في [[api]] فوق: [[signal: options.signal ?? AbortSignal.timeout(8000)]]. لو اللي نادى بعت signal (زي [[search]])، الـ timeout **بيضيع**، فطلب البحث ممكن يفضل معلّق للأبد. محتاج signal واحد بيتلغي لو **أي** واحد من الاتنين حصل. ده [[AbortSignal.any([...])]] (Node 20.3+ وكل المتصفحات الحديثة):

~~~text any.mjs
const user = new AbortController();
const signal = AbortSignal.any([user.signal, AbortSignal.timeout(300)]);
await fetch(url, { signal });
~~~

- [[AbortSignal.any(signals)]]: بتاخد array من الـ signals وترجّع signal جديد بيتعمله abort أول ما **أول** واحد فيهم يتلغي.
- [[signal.reason]]: سبب الإلغاء، بياخده من الـ signal اللي اتلغى الأول.

جرّبتها على سيرفر محلي بيرد بعد ٢ ثانية، ٣ مرات: مرة سيبت الـ timeout يخلص، ومرة عملت [[user.abort()]] بعد 100ms، ومرة [[user.abort(new Error("اليوزر قفل الصفحة"))]] بعد 50ms:

~~~text الناتج (Node 24)
TimeoutError | The operation was aborted due to timeout | 316 ms | reason: TimeoutError
AbortError | This operation was aborted | 108 ms | reason: AbortError
Error | اليوزر قفل الصفحة | 63 ms | reason: Error
~~~

- الأول: محدش لغى، فالـ timeout كسب بعد حوالي 300ms، والـ error اسمه [[TimeoutError]].
- التاني: اليوزر لغى الأول، والـ error [[AbortError]].
- التالت: [[abort(reason)]] بسبب بتاعك: الـ fetch بيرمي **السبب نفسه** (Error برسالتك)، فـ [[err.name === "AbortError"]] مش هتمسكه. افحص [[signal.aborted]] بدل الاسم لو بتبعت أسباب.

والتصليح في [[api]]:

~~~text app.mjs
const timeout = AbortSignal.timeout(8000);
const signal = options.signal ? AbortSignal.any([options.signal, timeout]) : timeout;
~~~

وكده [[search]] بيقدر يلغي الطلب القديم، وكل طلب برضه ليه حد أقصى ٨ ثواني. ولو signal من اللي في الـ array كان متلغي من الأول، الناتج بيبقى متلغي على طول ([[AbortSignal.any([AbortSignal.abort()]).aborted]] بـ [[true]]).

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[if (!res.ok) throw]] | fetch مبترميش على 404 و 500 |
| [[JSON.stringify(body)]] و Content-Type | fetch بتبعت نص، والسيرفر لازم يعرف إنه JSON |
| [[AbortSignal.timeout(ms)]] | الطلب ميفضلش معلّق للأبد ([[TimeoutError]]) |
| [[new AbortController()]] و [[abort()]] | تلغي طلب بإيدك ([[AbortError]]) |
| [[encodeURIComponent]] | أي input من اليوزر في الـ URL |
| [[res.json()]] أو [[res.text()]] | مرة واحدة بس للـ body |
| [[AbortSignal.any([a, b])]] | signal بيتلغي مع أول واحد فيهم: إلغاء اليوزر والـ timeout مع بعض |`,
          lines: [
            R`helper للـ API: بياخد path وخيارات. الـ destructuring بيطلّع [[body]] لوحده (عشان هنحوّله لنص)، والباقي كله في [[options]]. و [[= {}]] بتخلي نداءه من غير خيارات ميرميش error.`,
            R`بيعمل الطلب على عنوان الـ API ومعاه object الإعدادات اللي جاي، و [[await]] بيستنى الرد.`,
            R`بيفرد كل الخيارات اللي اتبعتت ([[method]] وغيرها) جوه إعدادات [[fetch]]. لازم ييجي الأول عشان اللي تحته يكتب فوقه.`,
            R`بنحط [[Content-Type]] بـ JSON كافتراضي، وبعدين نفرد [[options.headers]]، فأي header بعته اللي نادى الدالة (زي Authorization) يتضاف أو يغطّي الافتراضي.`,
            R`[[fetch]] مبيفهمش objects في الـ body، لازم نص. فلو فيه [[body]] بنحوّله بـ [[JSON.stringify]]، ولو مفيش بنبعت [[undefined]] (طلب GET ملوش body أصلًا).`,
            R`لو اللي نادى بعت [[signal]] بتاعه بنستخدمه، وغير كده [[AbortSignal.timeout]] بيلغي الطلب بعد ٨ ثواني. من غيره طلب معلّق ممكن يفضل مستني للأبد. (الإلغاء بالـ timeout الـ error بتاعه اسمه [[TimeoutError]].) ولو اتبعت signal الـ timeout مبيتحطش خالص، فلو عايز الاتنين ادمجهم بـ [[AbortSignal.any([options.signal, AbortSignal.timeout(8000)])]].`,
            R`نهاية إعدادات [[fetch]].`,
            R`404 و 500 مبيرفضوش الـ Promise، فبنرمي error بنفسنا، ومعاه الـ status ونص الرد اللي غالبًا فيه سبب المشكلة من السيرفر، فالـ debugging يبقى أسهل.`,
            R`الـ status [[204]] (No Content) معناه مفيش body، و [[res.json]] عليه بترمي SyntaxError، فبنرجّع [[null]]. غير كده بنحوّل الرد لـ JSON.`,
            R`نهاية [[api]].`,
            R`استخدامه: POST والـ body object عادي، والـ helper بيحوّله لنص ويضيف الـ header. لو مكانش الـ [[await]] هنا، أي error هيبقى unhandled rejection.`,
            R`[[controller]] برّه الدالة عشان يفضل موجود بين كل نداء والتاني، ويشاور على controller آخر بحث لسه شغال.`,
            R`[[search]] بتتنادى مع كل حرف بيكتبه اليوزر في خانة البحث، فممكن طلبات كتير تبقى شغالة في نفس الوقت.`,
            R`قبل أي طلب جديد بنلغي القديم. من غير كده رد قديم بطيء ممكن يوصل بعد الجديد ويكتب فوقه نتايج غلط. و [[?.]] عشان أول مرة [[controller]] لسه [[undefined]].`,
            R`controller جديد للطلب ده بالذات. الـ controller بيتلغي مرة واحدة بس، فمينفعش نعيد استخدام القديم.`,
            R`[[try]] عشان نفرّق بين الإلغاء المقصود وبين الـ errors الحقيقية.`,
            R`[[encodeURIComponent]] بيحوّل المسافات والـ [[&]] والعربي لشكل آمن في الـ URL، وإلا [[&]] في كلمة البحث هتتقري parameter جديد. وبنبعت [[controller.signal]]، فده بيغطّي الـ timeout الافتراضي (الطلب ده مبقاش ليه حد ٨ ثواني).`,
            R`لو حصل error (شبكة، status غلط، أو إلغاء) بييجي هنا.`,
            R`لما بنعمل [[abort]]، [[fetch]] بيترفض بـ error اسمه [[AbortError]]. ده إحنا اللي عملناه عن قصد، فبنرجع بهدوء من غير ما نعرض رسالة غلط لليوزر.`,
            R`أي error تاني (شبكة أو 500) حقيقي، فبنرميه تاني عشان اللي نادى [[search]] يتعامل معاه.`,
            R`نهاية [[catch]].`,
            R`نهاية [[search]].`
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
          practice: [
            { lvl: 'سريع', t: R`صلّح الكود البايظ: [[async function saveAll(ids) { ids.forEach(async (id) => { await save(id); }); console.log("تم حفظ الكل"); }]] (بـ save اللي في الدرس). اليوزر بيشوف «تم حفظ الكل» قبل ما أي حاجة تتحفظ. صلّحها مرة ورا بعض ومرة مع بعض.`, done: R`قبل التصليح «تم حفظ الكل» أول سطر وبعدها [[saved 1]] و [[saved 2]] و [[saved 3]]. بعد التصليح «تم حفظ الكل» آخر سطر في الحالتين: بـ [[for...of]] في حوالي 300ms، وبـ [[await Promise.all(ids.map(save))]] في حوالي 100ms.` },
            { lvl: 'تطبيق', t: R`ابني [[inBatches(items, size, fn)]] بتشغّل كل [[size]] مع بعض بـ Promise.all، والدفعة اللي بعدها بعد ما اللي قبلها تخلص، وترجّع كل النتايج بنفس ترتيب الـ input. جرّبها على 5 عناصر و size 2، و fn بتستنى 100ms وترجّع [[x * 10]]، وعلى array فاضية.`, done: R`النتيجة [[[ 10, 20, 30, 40, 50 ]]] بالترتيب في حوالي 300ms (٣ دفعات: ٢ و ٢ و ١)، مش 500 ولا 100. والـ array الفاضية بترجّع [[[]]] من غير ما تنادي fn.` },
            { lvl: 'تحدي', t: R`محاكاة كاشير: اكتب [[pool(items, limit, fn)]]: أول ما واحد يخلص اللي بعده يبدأ على طول، فدايمًا شغالين [[limit]] (زي ٣ كاشير قدامهم طابور). حط عدّاد [[active]] بيزيد قبل الـ await ويقل بعده واحفظ أكبر قيمة. خلّي الزباين الفردي ياخدوا 150ms والزوجي 100ms.`, done: R`النتايج بنفس ترتيب الـ input حتى لو الزباين خلصوا بترتيب تاني، وأكبر [[active]] بيساوي [[limit]] بالظبط ومبيعدّيهوش. ومع [[limit]] أكبر من عدد العناصر، أكبر active بيساوي عدد العناصر ومفيش worker بيعلّق.` },
          ],
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
            R`[[wait]] بترجّع Promise بيخلص بعد ms، وبنستخدمها نقلّد وقت حفظ حقيقي على سيرفر.`,
            R`[[save]] حفظ وهمي: بيستنى ١٠٠ms، يطبع «saved» والـ id، ويرجّعه. كده نشوف بالطباعة الترتيب والوقت لكل طريقة loop.`,
            R`٣ ids هنحفظهم بأكتر من طريقة ونقارن.`,
            R`[[forEach]] بتنادي الدالة لكل عنصر بس مبتستناش الـ Promise اللي بترجّعه، فالتلاتة بيبدأوا مع بعض والـ loop بتخلص على طول. ومينفعش تعمل [[await]] على [[forEach]] نفسها لأنها بترجّع [[undefined]].`,
            R`السطر ده بيتطبع قبل أي «saved»، وده الدليل إن [[forEach]] مستنتش. لو بعدها كود معتمد إن الحفظ خلص، هيشتغل على داتا لسه متحفظتش.`,
            R`[[for...of]] بتحترم [[await]]: اللفة الجاية مش بتبدأ غير لما اللي قبلها تخلص. استخدمها لما الترتيب مهم أو السيرفر مش هيستحمل طلبات كتير مع بعض.`,
            R`كل حفظ بيستنى اللي قبله، فالتلاتة بياخدوا ٣٠٠ms تقريبًا، وبيتطبعوا 1 و 2 و 3 بالترتيب.`,
            R`نهاية [[for...of]].`,
            R`[[map]] بتبدأ التلاتة مع بعض وترجّع array Promises، و [[Promise.all]] تستناهم. الوقت ١٠٠ms تقريبًا بدل ٣٠٠، والنتايج بترتيب الـ ids. بس لو واحد فشل الكل بيترفض.`,
            R`batches: [[i]] بيزيد ٢ كل لفة، فبنشتغل على دفعات ٢ في المرة. ده الحل الوسط لما الـ ids كتير وعايز سرعة من غير ما تضرب السيرفر بألف طلب مرة واحدة.`,
            R`[[slice]] بتاخد الدفعة الحالية (عنصرين)، و [[Promise.all]] بتشغّلهم مع بعض، و [[await]] بيستناهم قبل الدفعة اللي بعدها.`,
            R`نهاية loop الـ batches.`,
            R`[[Array.fromAsync]] بتعدّي على العناصر وتستنى دالة الـ map لكل عنصر قبل اللي بعده (ورا بعض زي [[for...of]])، وترجّع array النتايج. موجودة في Node 22 والمتصفحات الحديثة.`
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
