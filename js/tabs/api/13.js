// تكملة تاب api: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/api/01.js (شرح حقول الدرس في أوله)
MORE("api", [
    {
      t: "أسئلة انترفيو Backend بـ Node",
      l: 3,
      n: "الأسئلة اللي بتتكرر في انترفيوهات Node و Express، بإجابة تقولها بصوتك في دقيقة، والأسئلة اللي بتيجي بعدها",
      items: [
        {
          cmd: "event loop و blocking",
          title: "Node single-threaded، إزاي بيخدم آلاف الطلبات؟ (event loop)",
          desc: R`الـ JavaScript بتاعي بيشتغل على thread واحد، بس الـ I/O (الشبكة والقاعدة والملفات) مش بيستناه: Node بيطلب العملية من نظام التشغيل أو من thread pool بتاع libuv، ويكمّل يخدم طلبات تانية، ولما النتيجة تيجي الـ callback بتاعها يدخل طابور والـ event loop ينفّذه. فطول ما كل طلب معظم وقته مستني I/O، thread واحد بيكفي آلاف الاتصالات.

المشكلة الحقيقية الـ blocking: أي كود CPU طويل (loop على مليون عنصر، أو [[JSON.parse]] لملف ضخم، أو دالة Sync) بيوقّف الـ loop فكل الطلبات بتستنى. الحل: worker_threads، أو queue، أو تقسيم الشغل.`,
          example: R`console.log("1 sync");
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
Promise.resolve().then(() => console.log("promise"));
process.nextTick(() => console.log("nextTick"));
console.log("2 sync");
// CommonJS: 1 sync, 2 sync, nextTick, promise, وبعدين timeout و immediate (ترتيب الاتنين دول مش مضمون)`,
          try: R`شغّل الكود مرة كـ [[.cjs]] ومرة كـ [[.mjs]]، وقارن مكان [[nextTick]] و [[promise]]. وبعدين حط الـ setTimeout والـ setImmediate جوه callback بتاع [[fs.readFile]] وشوف مين الأول.`,
          flag: "script",
          deep: {
            why: "أشهر سؤال Node على الإطلاق. بيختبر إنك فاهم ليه Node سريع في الـ I/O وضعيف في الـ CPU، وده بيأثر على كل قرار: إمتى تستخدم Sync، وإمتى worker، وإزاي تكتشف إن السيرفر «مهنّج».",
            how: R`الترتيب: الكود الـ sync كله الأول. بعده microtasks: طابور [[process.nextTick]] وطابور الـ promises، وبيتفضّوا بالكامل بعد كل task. بعدها مراحل الـ loop: timers ([[setTimeout]] و [[setInterval]])، ثم poll (callbacks الـ I/O)، ثم check ([[setImmediate]])، ثم close callbacks.

تفصيلة جربناها: في CommonJS الـ nextTick قبل الـ promise. في ESM ([[.mjs]] أو [[type: module]]) الـ promise طلع قبل الـ nextTick، لأن الموديول نفسه بيتنفّذ جوه microtask فطابور الـ promises بيتفضى الأول. والـ timeout والـ immediate في المستوى الأعلى ترتيبهم مش مضمون، بس جوه callback بتاع I/O الـ immediate دايمًا الأول.

thread pool بتاع libuv (افتراضيًا ٤ threads، [[UV_THREADPOOL_SIZE]]) بيعمل fs و dns.lookup و crypto (pbkdf2 و scrypt) و zlib. الشبكة (TCP) مش بتستخدمه، بتعتمد على epoll/kqueue في النظام. عشان كده ٤ عمليات bcrypt تقيلة مع بعض ممكن تبطّأ قراية الملفات.

وتكتشف الـ blocking إزاي؟ [[perf_hooks.monitorEventLoopDelay()]] بيقيس التأخير، ولو p99 فوق ١٠٠ms فيه حاجة بتوقّف. و [[node --cpu-prof]] أو clinic.js يوريك الدالة. والتفاصيل الأعمق للـ event loop في JavaScript نفسها في درس [[event loop]] في تاب «JavaScript».`,
            when: R`أسئلة بعدها: «الفرق بين nextTick و setImmediate؟» (الأسماء معكوسة: nextTick أسرع). «إزاي تعمل حاجة تقيلة من غير ما تبلوك؟» (worker_threads أو queue، درس [[worker_threads و cluster]]). «Node multi-threaded ولا لأ؟» (الـ JS بتاعك thread واحد، و Node نفسه فيه threads للـ libuv والـ GC). «إمتى Node اختيار وحش؟»`,
            mistakes: R`«Node multi-threaded» أو «Node single-threaded فمينفعش يعمل حاجتين مع بعض»: الاتنين غلط. و «async بيخلي الكود أسرع»: async بيخلي السيرفر فاضي لغيرك وانت مستني، مش بيسرّع الحساب نفسه. و «setTimeout(fn, 0) بيتنفّذ فورًا». و nextTick recursion بيجوّع الـ loop ومفيش I/O يتنفّذ.`
          },
          teach: R`## ٦ سطور، ومين بيطبع الأول؟

المثال بيسجّل ٦ حاجات بطرق مختلفة، وكل طريقة بتحط الـ callback في **طابور** مختلف. الترتيب اللي بيطلع هو ترتيب الطوابير دي، مش ترتيب السطور. ولو فهمته تقدر تجاوب سؤال الانترفيو بالرسم مش بالحفظ.

شغّلناه على ويندوز 11 بـ Node 24.19 وفي container لينكس بـ Node 22.23، والنتايج تحت من الاتنين.

---

## السطور واحد واحد

~~~javascript
console.log("1 sync");
~~~

كود عادي (synchronous): بيتنفّذ دلوقتي، في مكانه.

~~~javascript
setTimeout(() => console.log("timeout"), 0);
~~~

[[setTimeout(fn, 0)]]: «شغّل [[fn]] بعد ٠ ملّي ثانية **على الأقل**». الـ callback بيتحط في مرحلة الـ **timers** في الـ event loop. يعني مش فورًا: لازم الكود الحالي يخلص الأول، وكمان Node بيعتبر أقل مدة ١ms.

~~~javascript
setImmediate(() => console.log("immediate"));
~~~

[[setImmediate(fn)]]: «شغّل [[fn]] في مرحلة الـ **check**»، اللي بتيجي بعد مرحلة الـ I/O في كل لفة.

~~~javascript
Promise.resolve().then(() => console.log("promise"));
~~~

[[Promise.resolve()]] promise خلصت خلاص، و [[.then(fn)]] بيحط [[fn]] في طابور الـ **microtasks**. الطابور ده بيتفضى كله أول ما الكود الحالي يخلص، قبل أي مرحلة في الـ loop.

~~~javascript
process.nextTick(() => console.log("nextTick"));
~~~

[[process.nextTick(fn)]]: طابور خاص بـ Node (مش موجود في المتصفح)، وبيتفضى هو كمان بعد الكود الحالي على طول، قبل الـ timers والـ check.

~~~javascript
console.log("2 sync");
~~~

sync تاني.

---

## النتيجة

~~~text node order.cjs (ويندوز ولينكس)
1 sync
2 sync
nextTick
promise
immediate
timeout
~~~

| الترتيب | الحاجة | ليه |
|---|---|---|
| ١ و ٢ | [[1 sync]] و [[2 sync]] | الكود الحالي بيخلص الأول دايمًا |
| ٣ | [[nextTick]] | طابور nextTick بيتفضى أول حاجة بعد الكود |
| ٤ | [[promise]] | بعده طابور الـ microtasks |
| ٥ و ٦ | [[timeout]] و [[immediate]] | مراحل الـ loop نفسه |

ليه المرة دي [[immediate]] قبل [[timeout]]؟ لأن ترتيبهم في أول الملف **مش مضمون**: الـ loop لما يبدأ بيبص على الـ timers، ولو الـ ١ms لسه معدّاش (حسب سرعة الجهاز في اللحظة دي) بيعدّيها ويروح للـ check. شغّلناه ٢٠ مرة:

~~~text الناتج (٢٠ تشغيلة)
ويندوز (Node 24):  15 timeout الأول   5 immediate الأول
لينكس (Node 22):    5 timeout الأول  15 immediate الأول
~~~

---

## نفس الكود كـ [[.mjs]]

[[.cjs]] يعني CommonJS، و [[.mjs]] يعني ES module. نفس الكود بالظبط:

~~~text node order.mjs
1 sync
2 sync
promise
nextTick
immediate
timeout
~~~

اتبدّل [[promise]] و [[nextTick]]. السبب إن الـ ES module نفسه بيتنفّذ من جوه microtask (Node بيحمّل الموديولات بـ promises). فلما الكود بتاعك يخلص، Node لسه جوه طابور الـ microtasks، فيكمّل يفضّيه ([[promise]]) قبل ما يرجع لطابور الـ nextTick.

---

## جوه callback بتاع I/O (الحل)

~~~javascript
const { readFile } = require("node:fs");
readFile(__filename, () => {
  setTimeout(() => console.log("timeout in I/O"), 0);
  setImmediate(() => console.log("immediate in I/O"));
});
~~~

- [[const { readFile } = require("node:fs")]]: هات دالة [[readFile]] من موديول الملفات. [[node:]] بيأكد إنه موديول Node المدمج.
- [[__filename]]: مسار الملف الحالي (موجود في CommonJS بس). يعني الملف بيقرا نفسه، والمهم إن فيه عملية I/O.
- الـ callback بتاع [[readFile]] بيتنفّذ في مرحلة الـ **poll** (الـ I/O). والمرحلة اللي بعدها على طول هي check، فالـ immediate دايمًا قبل الـ timeout اللي محتاج لفة كاملة:

~~~text الناتج (٥ مرات على ويندوز، ونفسه على لينكس)
immediate in I/O
timeout in I/O
~~~

---

## مراحل اللفة الواحدة

~~~text الـ event loop
timers  ←  setTimeout و setInterval
poll    ←  callbacks الـ I/O (ملفات، شبكة)
check   ←  setImmediate
close   ←  callbacks الإغلاق (socket.on("close"))
~~~

وبين كل callback والتاني، Node بيفضّي nextTick ثم الـ promises. وكل ده thread واحد: لو أي callback أخد ثانية حساب، كل اللي في الطوابير بيستنى ثانية. ده الـ blocking اللي في الـ desc.

---

## الخلاصة

- sync الأول، وبعدين nextTick والـ promises (في CommonJS بالترتيب ده، وفي ESM الـ promises الأول)، وبعدين مراحل الـ loop.
- [[setTimeout(fn, 0)]] و [[setImmediate]] في أول الملف ترتيبهم مش مضمون. جوه callback I/O: [[setImmediate]] الأول دايمًا.
- الأسماء معكوسة: [[nextTick]] أسرع من [[setImmediate]] بكتير.`,
          lines: [
            "sync.",
            "timer: مرحلة timers.",
            "مرحلة check.",
            "microtask.",
            "طابور nextTick (microtask برضه، ليه أولوية في CommonJS).",
            "sync."
          ],
          sol: R`CommonJS: [[1 sync]]، [[2 sync]]، [[nextTick]]، [[promise]]، وبعدين [[timeout]] و [[immediate]] (في ٢٠ تشغيلة على ويندوز طلع timeout الأول ١٥ مرة و immediate الأول ٥ مرات).

ESM: [[1 sync]]، [[2 sync]]، [[promise]]، [[nextTick]]، وبعدين الاتنين التانيين. السبب إن الـ ESM بيتنفّذ من جوه microtask، فالـ promises بتخلص الأول قبل ما Node يرجع لطابور الـ nextTick.

وجوه [[readFile]]: [[immediate]] قبل [[timeout]] دايمًا، لأن بعد مرحلة الـ poll (اللي فيها callback الـ I/O) الـ loop بيروح على check (setImmediate) قبل ما يلف للـ timers تاني. وفي المستوى الأعلى ترتيب timeout و immediate ممكن يتغير من تشغيلة للتانية.`,
          solCode: R`const { readFile } = require("node:fs");
readFile(__filename, () => {
  setTimeout(() => console.log("timeout in I/O"), 0);
  setImmediate(() => console.log("immediate in I/O"));
});
// immediate in I/O
// timeout in I/O`
        },
        {
          cmd: "next() والترتيب",
          title: "إزاي middleware بيشتغل في Express؟ وليه الترتيب مهم؟ (middleware order)",
          desc: R`Express بيمشي على الـ middleware والـ routes بالترتيب اللي اتسجّلوا بيه. كل واحد يا إما يرد ويقفل الطلب، يا إما ينادي [[next()]] فالطلب يروح للي بعده، يا إما [[next(err)]] فيقفز على طول لأول error middleware (اللي ليه ٤ باراميترز).

فالترتيب هو المنطق: parsing و security headers و CORS و rate limit الأول، وبعدين auth، وبعدين الـ routes، وبعدين 404، وفي الآخر الـ error handler. وأي route متسجّل قبل الـ auth مش محمي حتى لو شكله جنب routes محمية.`,
          example: R`app.get("/a", (req, res) => res.json({ user: req.user ?? null }));
app.use((req, res, next) => { req.user = "u1"; next(); });
app.get("/b", (req, res) => res.json({ user: req.user }));
app.get("/boom", async () => { throw new Error("db down"); });
app.use((err, req, res, next) => res.status(500).json({ error: "INTERNAL" }));`,
          try: R`شغّل المثال واطلب [[/a]] و [[/b]] و [[/boom]]. وبعدين انقل الـ error handler لأول الملف واطلب [[/boom]] تاني. إيه اللي اتغير، وليه؟`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم Express من جوه مش حافظ أسماء. وغلطات الترتيب من أشهر أسباب الثغرات (route من غير auth) والـ bugs (req.body فاضي، CORS مش شغال).",
            how: R`داخليًا Express عنده stack من الـ layers. كل layer ليها path و method (أو أي method في [[app.use]]). مع كل طلب بيلف عليهم بالترتيب ويشغّل اللي بيطابق. [[next()]] يعني «كمّل على الـ layer اللي بعدي». ولو ولا واحد رد، Express بيرجّع 404 الافتراضي.

الـ error middleware بيتعرف بعدد الباراميترز (٤). لما حد ينادي [[next(err)]] أو يرمي خطأ، Express بيتخطى كل الـ middleware العادي ويروح لأول error middleware بعد المكان ده. وفي Express 5، لو async handler رمى أو الـ promise اترفضت، ده بيتحول لـ [[next(err)]] لوحده (درس [[async errors في Express 5]]). في Express 4 كان الطلب بيعلّق.

أمثلة الترتيب اللي بتتسأل: [[express.json()]] قبل الـ routes وإلا [[req.body]] undefined. والـ webhook اللي محتاج raw body قبل [[express.json()]]. و CORS قبل الـ auth عشان الـ preflight (OPTIONS) ميترفضش بـ 401. و [[express.static]] قبل الـ auth لو الملفات عامة. والتفاصيل في درس [[ترتيب الـ middleware]].`,
            when: R`أسئلة بعدها: «إزاي تعمل error handler مركزي؟». «إيه اللي يحصل لو middleware منسيش ينادي next ولا رد؟» (الطلب يعلّق لحد الـ timeout). «الفرق بين app.use و app.get؟». «middleware في Nest بيختلف عن guard إزاي؟» (درس «Nest: guards و interceptors»).`,
            mistakes: R`«الترتيب مش مهم». و error handler بـ ٣ باراميترز فمش بيتنادى أبدًا. وإنك تنادي [[next()]] بعد [[res.json()]] فيحصل «Cannot set headers after they are sent». و [[res.json()]] من غير [[return]] جوه if، فالكود يكمّل ويرد مرتين.`
          },
          teach: R`## ٥ سطور = طابور، والطلب بيمشي فيه من فوق لتحت

كل [[app.get]] و [[app.use]] بيضيف «محطة» في آخر طابور. الطلب بيدخل من أول محطة، وكل محطة بتطابق الـ method والـ path يا إما ترد (والطلب يخلص)، يا إما تنادي [[next()]] (يروح للي بعدها). المثال معمول عشان يوريك إن **مكان** السطر بيغيّر النتيجة.

جربناه على Express 5.2 و Node 24 (ويندوز)، مرة بـ supertest (الكود اللي في الحل) ومرة بسيرفر حقيقي على بورت وطلبات curl.

---

## السطور

~~~javascript
app.get("/a", (req, res) => res.json({ user: req.user ?? null }));
~~~

- [[app.get("/a", handler)]]: محطة بترد على [[GET /a]] بس.
- [[(req, res) => ...]]: الـ handler. [[req]] الطلب و [[res]] الرد. مفيش [[next]] لأنه هيرد على طول.
- [[req.user ?? null]]: لو [[req.user]] مش موجود رجّع [[null]]. ([[??]] بيشتغل على undefined و null بس.)
- [[res.json(...)]]: ابعت JSON بـ 200، والطلب خلص.

~~~javascript
app.use((req, res, next) => { req.user = "u1"; next(); });
~~~

- [[app.use(fn)]] من غير path: middleware لأي method وأي path.
- [[req.user = "u1"]]: بيحط قيمة على الطلب (في الحقيقة ده مكان الـ auth).
- [[next()]]: «خلصت، ودّي الطلب للمحطة اللي بعدي». لو نسيتها ومردتش، الطلب يفضل معلّق لحد الـ timeout.

~~~javascript
app.get("/b", (req, res) => res.json({ user: req.user }));
~~~

نفس [[/a]]، بس متسجّل **بعد** الـ middleware.

~~~javascript
app.get("/boom", async () => { throw new Error("db down"); });
~~~

handler [[async]] بيرمي خطأ. الـ async function لما ترمي بترجّع Promise مرفوضة، و Express 5 بيمسك الرفض ده وينادي [[next(err)]] لوحده.

~~~javascript
app.use((err, req, res, next) => res.status(500).json({ error: "INTERNAL" }));
~~~

**٤ باراميترز**: [[err]] أولهم. Express بيعرف إن ده error handler من العدد بس ([[fn.length === 4]]). المحطات العادية بيتخطاها الخطأ، والمحطات دي بيتخطاها الطلب العادي.

---

## الطلبات

~~~bash
curl -si localhost:5861/a
~~~

~~~text الرد
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 13

{"user":null}
~~~

الطلب لقى [[/a]] قبل ما يوصل للـ middleware، فـ [[req.user]] لسه مش موجود. و [[Content-Length: 13]] = عدد حروف [[{"user":null}]].

~~~text GET /b
{"user":"u1"}
~~~

~~~text GET /boom
HTTP/1.1 500 Internal Server Error
{"error":"INTERNAL"}
~~~

| الطلب | المحطات اللي عدّى عليها | الرد |
|---|---|---|
| [[/a]] | ١ (رد) | [[{"user":null}]] |
| [[/b]] | ١ (مش مطابق) ← ٢ ([[next]]) ← ٣ (رد) | [[{"user":"u1"}]] |
| [[/boom]] | ١ ← ٢ ← ٣ (مش مطابق) ← ٤ (رمى) ← ٥ (error) | 500 [[{"error":"INTERNAL"}]] |

---

## لما الـ error handler يبقى أول سطر

نقلناه فوق خالص وطلبنا [[/boom]] تاني:

~~~text الرد
HTTP/1.1 500 Internal Server Error
Content-Security-Policy: default-src 'none'
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 2227

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
...
<pre>Error: db down<br> &nbsp; &nbsp;at file:///C:/Users/ali/.../order-app.mjs:7:38<br> ...
~~~

Express بعد الخطأ بيدوّر على error handler **بعد** المكان اللي حصل فيه الخطأ. اللي فوق ميتشافش، فمحدش مسكه، فـ Express استخدم الـ handler الافتراضي بتاعه: صفحة HTML فيها الـ stack كله (لأن [[NODE_ENV]] مش [[production]])، وطبع نفس الـ stack في الترمنال. يعني تسريب مسارات ملفاتك للعميل.

---

## الحل: supertest

~~~javascript
const r = await Promise.all(["/a", "/b", "/boom"].map((p) => request(app).get(p)));
console.log(r[0].body, r[1].body, r[2].status, r[2].body);
~~~

- [[["/a", "/b", "/boom"].map(...)]]: لكل path اعمل طلب. [[request(app).get(p)]] من supertest بيرجّع Promise.
- [[Promise.all([...])]]: استنى التلاتة، والنتايج بنفس الترتيب.
- [[r[0].body]]: الـ JSON بتاع أول رد بعد ما اتحوّل object.

~~~text الناتج
{ user: null } { user: 'u1' } 500 { error: 'INTERNAL' }
~~~

---

## الخلاصة

- الترتيب = المنطق. أي route قبل الـ auth middleware مش محمي.
- [[next()]] = كمّل. [[next(err)]] أو [[throw]] = اقفز لأول error handler **بعدك**.
- الـ error handler بـ ٤ باراميترز بالظبط، وفي آخر الملف.`,
          lines: [
            "route قبل الـ middleware: مش هيشوف req.user.",
            "middleware بيحط اليوزر ويكمّل.",
            "route بعده: شايف req.user.",
            "route بيرمي من async (Express 5 بيوديه للـ error handler).",
            "error handler بـ ٤ باراميترز في الآخر."
          ],
          sol: R`النتيجة: [[/a]] بيرجّع [[{ user: null }]] لأنه اتسجّل قبل الـ middleware، و [[/b]] بيرجّع [[{ user: "u1" }]]، و [[/boom]] بيرجّع 500 و [[{ error: "INTERNAL" }]].

لما الـ error handler يبقى أول الملف: [[/boom]] بيرجّع 500 بصفحة HTML الافتراضية بتاعة Express (فيها الـ stack في التطوير)، مش الـ JSON بتاعك. السبب إن [[next(err)]] بيدوّر على error middleware بعد مكان الخطأ، واللي فوق مش بيتشاف.`,
          solCode: R`const r = await Promise.all(["/a", "/b", "/boom"].map((p) => request(app).get(p)));
console.log(r[0].body, r[1].body, r[2].status, r[2].body);
// { user: null } { user: 'u1' } 500 { error: 'INTERNAL' }`
        },
        {
          cmd: "JWT ولا session",
          title: "JWT ولا session؟ وفين تحط التوكن؟ (JWT vs sessions)",
          desc: R`session: السيرفر بيحفظ البيانات في store (Redis)، والعميل معاه id عشوائي في كوكي httpOnly. logout والحظر فوري، بس كل طلب فيه lookup. JWT: البيانات موقّعة جوه التوكن، والسيرفر بيتحقق من التوقيع من غير ما يسأل حد. مفيش lookup، بس مفيش سحب للتوكن قبل ما يخلص.

عشان كده الشكل الشائع مع JWT: access token قصير (١٠-١٥ دقيقة) و refresh token طويل في كوكي httpOnly بيتخزن ويتلغي من السيرفر. ولموقع واحد على دومين واحد، الـ session غالبًا أبسط وأأمن.`,
          example: R`// session: الكوكي فيها id بس، والبيانات في Redis
// Set-Cookie: sid=s%3ACzl9ycc...; Path=/; HttpOnly; Secure; SameSite=Lax
// JWT: البيانات في التوكن نفسه، أي حد يقدر يقراها (مش مشفّرة، موقّعة بس)
node -e 'console.log(JSON.parse(Buffer.from(process.argv[1].split(".")[1], "base64url")))' eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3Iiwicm9sZSI6IlVTRVIiLCJleHAiOjE3OTA3MTQ3Nzd9.x`,
          try: R`خد أي JWT من تطبيق عندك وفكّ الجزء التاني بالأمر ده. إيه البيانات اللي فيه؟ ينفع يبقى فيه إيميل أو رقم تليفون؟ وبعدين فكّر: يوزر عمل logout، والـ access token بتاعه لسه فاضله ١٠ دقايق. حد سرقه. يقدر يستخدمه؟`,
          deep: {
            why: "سؤال تصميم بيبان منه إنك بتفهم المقايضات مش بتردد «JWT أحدث». والإجابة الناضجة بتقول إمتى كل واحد، وإيه اللي بيضيع مع JWT، وفين تحط التوكن.",
            how: R`النقط اللي تقولها: الـ session stateful (الحالة عند السيرفر) و JWT stateless (الحالة في التوكن). JWT مناسب لما خدمات كتير محتاجة تتحقق من غير قاعدة مشتركة، أو موبايل، أو API لطرف تالت. والـ session مناسبة لـ web app على دومين واحد.

التخزين: localStorage أي script (XSS) يقدر يقراه ويبعته برّه. الكوكي الـ httpOnly محدش يقدر يقراها بـ JS، بس بتتبعت لوحدها فمحتاجة حماية CSRF ([[SameSite=Lax]] أو Strict، وتوكن CSRF للحالات الحساسة). فالشائع: refresh في كوكي httpOnly، و access في الذاكرة.

سحب التوكن: مع JWT يا إما عمره قصير ومعاه refresh بيتلغي من القاعدة (rotation، درس «refresh rotation» في «تاب بناء مشروع كامل»)، يا إما blocklist بالـ [[jti]] في Redis، وده رجوع لـ lookup. و [[alg]]: حدد الخوارزمية في [[jwt.verify]] صريح عشان هجمات [[alg: none]] أو تبديل الخوارزمية.

الكود في درسي [[express-session]] و [[access و refresh]].`,
            when: R`أسئلة بعدها: «التوكن اتسرق، تعمل إيه؟». «فين تحط الـ JWT في الواجهة؟». «يعني إيه CSRF وليه SameSite بيساعد؟». «ليه الـ access قصير؟». «OAuth و JWT نفس الحاجة؟» (لأ: OAuth بروتوكول تفويض، و JWT شكل توكن).`,
            mistakes: R`«JWT مشفّر»: هو موقّع بس، والـ payload base64 أي حد يقراه، فمتحطش فيه بيانات حساسة. و «JWT أأمن من session». و access token عمره أيام. و logout في الواجهة بس بمسح الـ localStorage والتوكن لسه شغال.`
          },
          teach: R`## الفرق في سطرين: الكوكي فيها رقم، والـ JWT فيه البيانات نفسها

المثال بيقارن الاتنين: كوكي الـ session فيها id بس، والبيانات في Redis عند السيرفر. والـ JWT فيه البيانات جواه، وأي حد معاه التوكن يقدر يقراها من غير أي سر. وده اللي الأمر الأخير بيثبته.

شغّلنا الأمر في Git Bash و PowerShell 7 و Windows PowerShell 5.1 (Node 24)، والـ blocklist اللي في الحل على Redis 7 في Docker.

---

## ١. كوكي الـ session

~~~text Set-Cookie
Set-Cookie: sid=s%3ACzl9ycc...; Path=/; HttpOnly; Secure; SameSite=Lax
~~~

| الحتة | معناها |
|---|---|
| [[sid=]] | اسم الكوكي (session id) |
| [[s%3ACzl9ycc...]] | [[%3A]] هي [[:]] بعد الـ URL encoding، فالقيمة [[s:Czl9ycc...]]: الـ id ومعاه توقيع ([[express-session]] بيبدأها بـ [[s:]]) عشان محدش يألّف id |
| [[Path=/]] | تتبعت مع أي مسار في الموقع |
| [[HttpOnly]] | JavaScript في الصفحة ميقدرش يقراها ([[document.cookie]] مبيشوفهاش) |
| [[Secure]] | تتبعت على HTTPS بس |
| [[SameSite=Lax]] | متتبعتش مع طلبات POST جاية من موقع تاني (حماية CSRF) |

مفيش أي بيانات يوزر هنا. السيرفر بياخد الـ id ويسأل Redis: «مين ده؟».

---

## ٢. فك الـ JWT

~~~bash
node -e 'console.log(JSON.parse(Buffer.from(process.argv[1].split(".")[1], "base64url")))' eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3Iiwicm9sZSI6IlVTRVIiLCJleHAiOjE3OTA3MTQ3Nzd9.x
~~~

### شكل التوكن

الـ JWT ٣ حتت بينهم نقط: [[header.payload.signature]].

~~~text التوكن متقسّم
eyJhbGciOiJIUzI1NiJ9                                      ← header
eyJzdWIiOiI3Iiwicm9sZSI6IlVTRVIiLCJleHAiOjE3OTA3MTQ3Nzd9  ← payload
x                                                         ← signature (هنا مزيّف، مش مهم للفك)
~~~

### الأمر من جوه لبرة

1. [[node -e '...']]: [[-e]] = eval، شغّل الكود اللي بعدها بدل ملف. والتوكن بعد الكود بيبقى argument.
2. [[process.argv[1]]]: الـ arguments. مع [[-e]]، [[argv[0]]] مسار node و [[argv[1]]] أول حاجة بعد الكود، يعني التوكن.
3. [[.split(".")]]: قسّم على النقط ← مصفوفة من ٣.
4. [[[1]]]: خد التانية، الـ payload.
5. [[Buffer.from(..., "base64url")]]: فك الـ base64url (نسخة من base64 مفيهاش [[+]] و [[/]] و [[=]] عشان تمشي في URL).
6. [[JSON.parse(...)]]: النص بقى JSON، حوّله object.
7. [[console.log(...)]]: اطبع.

~~~text الناتج
{ sub: '7', role: 'USER', exp: 1790714777 }
~~~

ونفس الأمر على الحتة الأولى ([[split(".")[0]]]) طلّع [[{ alg: 'HS256' }]]: الخوارزمية اللي اتوقّع بيها.

| الحقل | معناه |
|---|---|
| [[sub]] | subject: id اليوزر |
| [[role]] | حقل حطيناه احنا |
| [[exp]] | expiry: إمتى يبطل، بالثواني من ١٩٧٠ |

[[exp: 1790714777]] بالتاريخ ([[new Date(1790714777 * 1000)]]، الـ [[* 1000]] لأن JavaScript بيحسب بالملّي ثانية) = [[2026-09-29T20:46:17.000Z]]. يعني التوكن ده **منتهي** خلاص، ومع ذلك اتفك عادي: الفك مبيتحققش من حاجة. اللي بيتحقق من التوقيع والـ [[exp]] هو [[jwt.verify]] بالسر.

الخلاصة من الأمر: الـ payload **مقروء** لأي حد (base64 مش تشفير)، بس **مش متعدّل**: لو حد غيّر [[USER]] لـ [[ADMIN]]، التوقيع مش هيطابق و [[verify]] هيرفض.

### على ويندوز

| الشيل | الأمر زي ما هو | 
|---|---|
| Git Bash و PowerShell 7 | شغال |
| Windows PowerShell 5.1 | [[SyntaxError: Unexpected token '.']]: بيشيل علامات التنصيص المزدوجة اللي جوه وهو بيبعت لـ node، فالكود بيوصل [[split(.)]] |

الحل في 5.1 (واشتغل في 7 كمان): استخدم تنصيص مفرد جوه الكود، وجوه نص PowerShell المفرد بيتكتب مرتين:

~~~powershell
node -e 'console.log(JSON.parse(Buffer.from(process.argv[1].split(''.'')[1], ''base64url'')))' eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3Iiwicm9sZSI6IlVTRVIiLCJleHAiOjE3OTA3MTQ3Nzd9.x
~~~

~~~text الناتج في الاتنين
{ sub: '7', role: 'USER', exp: 1790714777 }
~~~

---

## ٣. الحل: سحب توكن قبل ما يخلص

~~~javascript
await redis.set($__btjwt:revoked:$__{payload.jti}$__bt, "1", "EXAT", payload.exp);
~~~

- [[payload]]: اللي [[jwt.verify]] رجّعه.
- [[payload.jti]]: JWT ID، id فريد لكل توكن (بتحطه وانت بتعمل [[jwt.sign]] بـ [[jwtid: randomUUID()]]).
- [[redis.set(key, "1", ...)]] (مكتبة ioredis): خزّن مفتاح قيمته [[1]]. القيمة مش مهمة، المهم إن المفتاح موجود.
- [[$__btjwt:revoked:$__{...}$__bt]]: اسم المفتاح، و [[:]] عادة Redis لتقسيم الأسماء.
- [[EXAT payload.exp]]: المفتاح يتمسح لوحده في اللحظة دي بالظبط (بالثواني من ١٩٧٠). بعد [[exp]] التوكن مرفوض أصلًا، فمفيش لازمة للمفتاح.

~~~javascript
if (await redis.exists($__btjwt:revoked:$__{payload.jti}$__bt)) return res.status(401).json({ error: "REVOKED" });
~~~

[[exists]] بيرجّع [[1]] لو المفتاح موجود و [[0]] لو لأ. جربناه بتوكن عمره ١٥ دقيقة:

~~~text الناتج
set: OK
exists: 1
ttl: 900
exists other: 0
~~~

[[ttl: 900]]: فاضل ٩٠٠ ثانية (١٥ دقيقة) والمفتاح يتمسح، نفس عمر التوكن. وده التمن: كل طلب بقى فيه سؤال لـ Redis، زي الـ session بالظبط.

---

## الخلاصة

| | session | JWT |
|---|---|---|
| البيانات فين | Redis (السيرفر) | جوه التوكن |
| كل طلب | lookup | تحقق من التوقيع بس |
| logout أو حظر | فوري (امسح من Redis) | لحد [[exp]]، إلا لو blocklist |
| حد يقرا المحتوى | لأ، id بس | أيوه، base64 |

- JWT **موقّع مش مشفّر**: متحطش فيه حاجة سرية.
- فك التوكن مش تحقق. التحقق بـ [[jwt.verify]] والسر.`,
          lines: [
            "فك الـ payload بتاع JWT من غير أي سر: base64url عادي. (في الـ session بقى، الكوكي فيها id موقّع بس زي السطر المتعلّق فوق.)"
          ],
          sol: R`الأمر بيطبع object زي [[{ sub: "7", role: "USER", exp: 1790714777 }]]. أي حد معاه التوكن يقرا ده من غير أي مفتاح، فمينفعش يبقى فيه باسورد أو بيانات حساسة. الإيميل أحيانًا بيتحط، بس الأحسن id بس.

وسؤال الـ logout: أيوه، التوكن المسروق شغال لحد ما الـ [[exp]] يعدّي، لأن السيرفر مبيسألش حد وهو بيتحقق. عشان كده عمره قصير. ولو محتاج سحب فوري: blocklist للـ [[jti]] في Redis لحد الـ exp، أو [[tokenVersion]] على اليوزر بتزوده مع logout-all والتوكن بيحمله. أو session من الأول.`,
          solCode: R`// blocklist بسيطة في Redis لحد ما التوكن يخلص
await redis.set($__btjwt:revoked:$__{payload.jti}$__bt, "1", "EXAT", payload.exp);
// وفي requireAuth بعد jwt.verify:
if (await redis.exists($__btjwt:revoked:$__{payload.jti}$__bt)) return res.status(401).json({ error: "REVOKED" });`
        },
        {
          cmd: "scale لـ API",
          title: "الـ API بقى بطيء والمستخدمين زادوا ١٠ أضعاف، تعمل إيه؟ (How would you scale it?)",
          desc: R`أبدأ بالقياس مش بالتخمين: أنهي endpoints بطيئة، والوقت رايح فين (القاعدة، ولا CPU، ولا خدمة برّه)، من اللوجات (المدة لكل طلب) و APM و [[EXPLAIN ANALYZE]].

بعدين بالترتيب: صلّح الأرخص (index ناقص، و N+1، و pagination، ورد أصغر)، وبعدين كاش للي بيتقري كتير (Redis و HTTP cache)، وبعدين الشغل التقيل يطلع queue، وبعدين نسخ كتير ورا load balancer (والتطبيق لازم يبقى stateless)، وآخر حاجة القاعدة نفسها (pooler و read replicas).`,
          example: R`EXPLAIN ANALYZE SELECT * FROM "Order" WHERE "userId" = 'u7' ORDER BY "createdAt" DESC LIMIT 20;
-- Parallel Seq Scan on "Order" ... Rows Removed by Filter: 666638 ... Execution Time: 74.000 ms
CREATE INDEX CONCURRENTLY order_user_created_idx ON "Order" ("userId", "createdAt" DESC);
-- Index Scan using order_user_created_idx on "Order" ... Execution Time: 0.115 ms`,
          try: R`اختار أبطأ endpoint عندك وارسم رحلة الطلب: كام query؟ كام ms لكل واحدة؟ فيه طلب لخدمة برّه؟ اكتب ٣ تحسينات بالترتيب من الأرخص للأغلى، ولكل واحد إزاي هتقيس إنه نفع.`,
          deep: {
            why: "سؤال system design مصغّر. الإجابة الضعيفة «Kubernetes و microservices». الإجابة القوية بتبدأ بالقياس، وبتمشي من الأرخص للأغلى، وبتعرف إن ١٠ سيرفرات على query من غير index هيضربوا القاعدة ١٠ أضعاف.",
            how: R`النقط اللي تقولها بالترتيب:

١. قيس: p50 و p95 و p99 لكل endpoint، و slow query log، و APM (Sentry أو OpenTelemetry). والـ event loop delay لو شاكك في CPU.

٢. القاعدة أول مكان تبص فيه: index على أعمدة الـ WHERE والـ ORDER BY (مثال الـ EXPLAIN على ٢ مليون صف: من ٧٤ms لـ ٠.١١٥ms)، و N+1 (درس «indexes و N+1» في «تاب بناء مشروع كامل»)، و [[select]] للأعمدة المطلوبة بس، و pagination.

٣. كاش: HTTP cache و CDN للعام، و Redis (cache-aside) للي بيتقري كتير وبيتغير قليل، مع خطة للمسح.

٤. اطلع من الطلب: إيميلات وصور وتقارير في queue، والرد 202.

٥. horizontal: نسخ ورا load balancer، والشرط stateless: sessions و rate limit و cache في Redis، والملفات في S3، والـ cron في queue scheduler، والـ sockets بـ Redis adapter.

٦. القاعدة لما تبقى هي عنق الزجاجة: connection pooler (PgBouncer)، و read replicas للقراية، وبعدها partitioning. والـ sharding آخر حاجة خالص.

والتفاصيل في درس «scaling path» و «scaling القاعدة» في «تاب بناء مشروع كامل».`,
            when: R`أسئلة بعدها: «ليه الـ stateless مهم؟». «كاش invalidation إزاي؟». «read replica فيها مشكلة إيه؟» (replication lag: اليوزر يكتب وميلاقيش اللي كتبه). «vertical ولا horizontal؟». «إزاي تعرف إن التحسين نفع؟» (نفس المقاييس قبل وبعد).`,
            mistakes: R`تبدأ بـ microservices أو Kubernetes. أو «هنكبّر السيرفر» من غير ما تعرف المشكلة. أو كاش على كل حاجة من غير خطة مسح. أو تنسى القاعدة وتكبّر الـ API بس، فالـ connections تخلص. أو ترد بكلام عام من غير أرقام: قول «p95 كان ٢ ثانية، الـ query دي كانت ١.٨ منهم».`
          },
          teach: R`## القياس قبل أي تحسين: مثال حقيقي بالأرقام

الدرس ده إجابة انترفيو، والمثال هو أهم جملة فيها: «قِست، ولقيت الـ query دي بتقرا الجدول كله، فعملت index، والرقم نزل من كذا لكذا». هنمشي على الـ SQL سطر سطر، وبعدين على كود الحل اللي بيعدّ الـ queries.

جربنا كل ده على Postgres 16 في Docker، في جدول [[Order]] فيه ٢ مليون طلب لـ ٢٠ ألف يوزر (اليوزر [[u7]] عنده ٨٧ طلب)، و Prisma 7.10 من Node 24.

---

## ١. [[EXPLAIN ANALYZE]]

~~~sql
EXPLAIN ANALYZE SELECT * FROM "Order" WHERE "userId" = 'u7' ORDER BY "createdAt" DESC LIMIT 20;
~~~

الـ query نفسها: هات آخر ٢٠ طلب ([[ORDER BY "createdAt" DESC LIMIT 20]]) لليوزر [[u7]]. وده بالظبط اللي [[GET /api/orders]] بيعمله في الصفحة الأولى.

- [[EXPLAIN]]: «قولي هتنفّذها إزاي» (الخطة).
- [[ANALYZE]]: «ونفّذها فعلًا وقولي أخدت قد إيه».
- [[""]] حوالين [[Order]] و [[userId]]: Prisma بيعمل أسماء الجداول والأعمدة بحروف كبيرة، و Postgres من غير [[""]] بيحوّل الاسم لحروف صغيرة. و [[ORDER]] نفسها كلمة محجوزة في SQL.

~~~text الناتج (مختصر)
Limit  (actual time=58.075..73.924 rows=20 loops=1)
  ->  Gather Merge  (actual time=58.072..73.915 rows=20 loops=1)
        Workers Planned: 2
        ->  Sort  (actual time=41.339..41.341 rows=17 loops=3)
              Sort Key: "createdAt" DESC
              ->  Parallel Seq Scan on "Order"  (actual time=0.704..40.898 rows=29 loops=3)
                    Filter: ("userId" = 'u7'::text)
                    Rows Removed by Filter: 666638
Planning Time: 0.301 ms
Execution Time: 74.000 ms
~~~

الخطة بتتقري **من تحت لفوق** (الأعمق بيتنفّذ الأول):

| الخطوة | معناها |
|---|---|
| [[Parallel Seq Scan on "Order"]] | Seq = sequential: اقرا الجدول كله صف صف. و Parallel: ٣ processes بيقسموا الشغل (اتنين workers + الأساسي، عشان كده [[loops=3]]) |
| [[Rows Removed by Filter: 666638]] | كل واحد فيهم رمى حوالي ٦٦٦ ألف صف مش بتوع [[u7]]. × ٣ = الـ ٢ مليون كلهم اتقروا عشان ٨٧ صف |
| [[Sort]] | رتّب اللي فضل بالتاريخ |
| [[Gather Merge]] | لِم نتايج الـ ٣ وادمجها بالترتيب |
| [[Limit]] | خد أول ٢٠ |
| [[Execution Time: 74.000 ms]] | الوقت الحقيقي كله |

و [[actual time=0.704..40.898]]: أول صف طلع بعد 0.7ms، وآخر صف بعد 40.9ms. ٧٤ms ممكن تبان قليلة، بس دي query واحدة على قاعدة فاضية مفيش عليها حمل. اضربها في ١٠٠ طلب في الثانية وكلهم بيقروا ٢ مليون صف.

---

## ٢. الـ index

~~~sql
CREATE INDEX CONCURRENTLY order_user_created_idx ON "Order" ("userId", "createdAt" DESC);
~~~

- [[CREATE INDEX order_user_created_idx]]: اعمل index، والاسم ده انت بتختاره.
- [[ON "Order" ("userId", "createdAt" DESC)]]: على عمودين بالترتيب ده: الأول متقسّم بالـ userId، وجوه كل يوزر مترتب بالتاريخ من الأحدث. يعني نفس شكل الـ WHERE والـ ORDER BY.
- [[CONCURRENTLY]]: ابنيه من غير ما تقفل الجدول قدام الكتابة. من غيرها، أي INSERT في الجدول بيستنى لحد ما الـ index يخلص. أبطأ شوية بس الموقع شغال.

~~~text الناتج
CREATE INDEX
Time: 3323.703 ms (00:03.324)
~~~

٣.٣ ثانية لـ ٢ مليون صف. وخلي بالك: [[CONCURRENTLY]] مينفعش جوه transaction. جربناها جوه [[BEGIN]]:

~~~text الناتج
ERROR:  CREATE INDEX CONCURRENTLY cannot run inside a transaction block
~~~

---

## ٣. نفس الـ query بعد الـ index

~~~text الناتج
Limit  (actual time=0.038..0.082 rows=20 loops=1)
  ->  Index Scan using order_user_created_idx on "Order"  (actual time=0.037..0.080 rows=20 loops=1)
        Index Cond: ("userId" = 'u7'::text)
Planning Time: 0.736 ms
Execution Time: 0.115 ms
~~~

- [[Index Scan using order_user_created_idx]]: راح للـ index على طول عند [[u7]].
- مفيش [[Sort]] خالص: الـ index نفسه مترتب بـ [[createdAt DESC]]، فأول ٢٠ في الـ index هما المطلوبين، و [[rows=20]] يعني قرا ٢٠ بس.
- من ٧٤ms لـ ٠.١١٥ms: حوالي ٦٤٠ مرة أسرع.

---

## ٤. الحل: عدّ الـ queries من Prisma

~~~javascript
const prisma = new PrismaClient({ adapter, log: [{ emit: "event", level: "query" }] });
let queries = 0;
prisma.$on("query", () => queries++);
~~~

- [[log: [{ emit: "event", level: "query" }]]]: كل query يطلع كـ event بدل ما يتطبع.
- [[prisma.$on("query", fn)]]: نادي [[fn]] مع كل query. والـ event نفسه فيه [[e.query]] (الـ SQL) و [[e.duration]] (المدة بالـ ms) لو عايزهم.
- [[queries++]]: زوّد العداد.

جربناه على نفس الـ endpoint بطريقتين: loop بيجيب اليوزر لكل طلب (N+1)، و [[include: { user: true }]]:

~~~text الناتج
loop version queries: 21
include version queries: 2
~~~

٢١ = ١ للطلبات + ٢٠ (واحدة لكل طلب). وده الرقم اللي في الـ sol بالظبط: «من ٢١ لـ ٢».

---

## الخلاصة

| الخطوة | الأداة | الرقم قبل ← بعد (تجربتنا) |
|---|---|---|
| قيس الـ query | [[EXPLAIN ANALYZE]] | Seq Scan، ٧٤ms |
| index على WHERE + ORDER BY | [[CREATE INDEX CONCURRENTLY]] | Index Scan، ٠.١١٥ms |
| عدّ الـ queries | [[prisma.$on("query")]] | ٢١ ← ٢ |

- اقرا الخطة من تحت لفوق، ودوّر على [[Seq Scan]] و [[Rows Removed by Filter]] الكبير.
- كل تحسين ليه رقم قبل ورقم بعد. ده اللي بيفرق في الانترفيو.`,
          lines: [
            "شوف الخطة والوقت الحقيقي.",
            "بتقرا كل الجدول (٢ مليون صف في تجربتنا): ٧٤ms.",
            "index على الفلتر والترتيب، و CONCURRENTLY عشان ميقفلش الجدول.",
            "بعد الـ index: ٠.١١٥ms، يعني أسرع حوالي ٦٤٠ مرة."
          ],
          sol: R`مثال لإجابة كويسة على [[GET /api/orders]]:

الرحلة: auth (Redis، ١ms)، و query الطلبات (٤٠٠ms، Seq Scan)، وبعدين loop بيجيب المنتج لكل طلب (٢٠ query، N+1، ٦٠ms)، وحساب الإجمالي في JS.

التحسينات بالترتيب: (١) index مركّب على [[userId, createdAt]]: أقيس بـ EXPLAIN قبل وبعد. (٢) [[include]] أو [[in]] بدل الـ loop: أقيس عدد الـ queries في لوج Prisma من ٢١ لـ ٢. (٣) كاش للمنتجات لو لسه بطيء: أقيس hit rate و p95.

المهم إن كل خطوة ليها رقم قبل ورقم بعد، وإنك متعدّيش للأغلى إلا لو الأرخص مكفّاش.`,
          solCode: R`const prisma = new PrismaClient({ adapter, log: [{ emit: "event", level: "query" }] });
let queries = 0;
prisma.$on("query", () => queries++);
// اطلب الـ endpoint مرة، واطبع queries قبل وبعد التحسين`
        },
        {
          cmd: "idempotency",
          title: "اليوزر داس «ادفع» مرتين، أو الشبكة عملت retry: إزاي متخصمش مرتين؟ (idempotency)",
          desc: R`العملية idempotent لو تكرارها بيدّي نفس النتيجة زي مرة واحدة. GET و PUT و DELETE كده بطبيعتهم. POST لأ: مرتين يعني طلبين.

الحل: العميل بيبعت [[Idempotency-Key]] (UUID لكل محاولة شراء)، والسيرفر بيحفظ المفتاح مع النتيجة. لو نفس المفتاح جه تاني، يرجّع نفس الرد من غير ما يعمل العملية تاني. ونفس الفكرة جوه السيرفر: unique constraint، وتحديث بشرط على الحالة، و webhooks وـ jobs بتتعالج مرة مهما اتكررت.`,
          example: R`// الواجهة: مفتاح واحد لكل محاولة، ثابت مع أي retry
// fetch("/api/orders", { method: "POST", headers: { "Idempotency-Key": attemptId }, body })
model IdempotencyKey {
  key        String   @id
  userId     String
  status     Int
  response   Json
  createdAt  DateTime @default(now())
}
// SQL تحت: INSERT ... ON CONFLICT (key) DO NOTHING، ولو مدخلش يبقى تكرار`,
          try: R`اعمل [[POST /api/orders]] بيقرا [[Idempotency-Key]]: لو المفتاح موجود لنفس اليوزر رجّع الرد المحفوظ، ولو لأ اعمل الطلب واحفظ الرد. ابعت نفس الطلب ٣ مرات بنفس المفتاح بـ [[Promise.all]] (مع بعض!). كام طلب اتعمل في القاعدة؟`,
          deep: {
            why: "الشبكات بتقطع، والموبايل بيعيد، واليوزر بيدوس مرتين، والبوابة بتعيد الـ webhook، والـ queue بتعيد الـ job. في أي نظام فيه فلوس، التكرار مش حالة نادرة. والسؤال ده بيفرق بين حد بنى API لعب وحد بنى حاجة فيها دفع.",
            how: R`النقط: [[Idempotency-Key]] من العميل (مش من السيرفر، عشان الـ retry يبعت نفس المفتاح). المفتاح مربوط باليوزر (مفتاح يوزر تاني ميرجّعش رد يوزرك). والحفظ لازم atomic: [[INSERT ... ON CONFLICT DO NOTHING]] أو unique على المفتاح، مش «دوّر وبعدين اعمل» (الاتنين هيدوّروا مع بعض ويلاقوه مش موجود). والطلب التاني اللي جه والأول لسه شغال يرجع 409 «in progress» أو يستنى. والمفاتيح ليها عمر (٢٤ ساعة مثلًا) وبتتمسح. ولو نفس المفتاح جه بـ body مختلف: 422.

ده مفصّل في درس [[Idempotency-Key]] في تاب «APIs متقدمة». وجوه السيرفر: الـ webhook بشرط على الحالة و unique على id المعاملة (درس [[اختبار الـ webhook]])، والـ jobs idempotent (درس [[background jobs]])، ومع بوابات الدفع ابعت نفس المفتاح ليهم كمان (Stripe و Paymob بيدعموا حاجة زي كده).`,
            when: R`أسئلة بعدها: «POST ولا PUT idempotent؟». «إزاي تمنع race condition في الحفظ؟». «at-least-once و exactly-once؟» (الـ queues بتضمن at-least-once، و exactly-once بتعمله انت بالـ idempotency). «تمسح المفاتيح إمتى؟».`,
            mistakes: R`«بقفل الزرار في الواجهة» كحل وحيد: الـ retry بيحصل من الشبكة مش من اليوزر. و «دوّر لو موجود، وإلا اعمل» من غير unique فالتكرار المتزامن يعدّي. ومفتاح جديد مع كل retry فمفيش فايدة. ومفتاح عالمي من غير ربط باليوزر.`
          },
          teach: R`## الفكرة: المفتاح بيتحجز قبل الشغل

العميل بيبعت مع كل محاولة شراء مفتاح عشوائي ([[Idempotency-Key]])، ولو حصل retry بيبعت **نفس** المفتاح. والسيرفر بيحفظ المفتاح في جدول عليه primary key، فالقاعدة نفسها هي اللي بتمنع إن نفس المفتاح يدخل مرتين، حتى لو ٣ طلبات وصلوا في نفس اللحظة.

جربنا الحل على Express 5 و Prisma 7.10 و Postgres 16 في Docker (والـ service بتاخد ٢٠٠ms عشان الطلبات المتزامنة تتقابل فعلًا).

---

## ١. الواجهة

~~~javascript
// fetch("/api/orders", { method: "POST", headers: { "Idempotency-Key": attemptId }, body })
~~~

[[attemptId]] بيتعمل **مرة واحدة** لما اليوزر يدوس «ادفع» (مثلًا [[crypto.randomUUID()]])، ويفضل هو هو مع أي retry لنفس المحاولة. لو كل retry عمل مفتاح جديد، السيرفر هيشوف كل واحد طلب جديد ومفيش فايدة.

---

## ٢. الجدول

~~~text schema.prisma
model IdempotencyKey {
  key        String   @id
  userId     String
  status     Int
  response   Json
  createdAt  DateTime @default(now())
}
~~~

| الحقل | النوع | ليه |
|---|---|---|
| [[key]] | [[String @id]] | المفتاح نفسه، و [[@id]] = primary key: مستحيل يتكرر على مستوى القاعدة |
| [[userId]] | [[String]] | صاحبه، عشان يوزر تاني ميعرفش ياخد رد يوزر غيره بنفس المفتاح |
| [[status]] | [[Int]] | الـ HTTP status اللي اترد (و [[0]] = «لسه شغال») |
| [[response]] | [[Json]] | الرد كله، عشان يترجع زي ما هو. في Postgres بيبقى عمود [[jsonb]] |
| [[createdAt]] | [[DateTime @default(now())]] | وقت الإنشاء لوحده، عشان تمسح المفاتيح القديمة (٢٤ ساعة مثلًا) |

والسطر الأخير في المثال: نفس الفكرة بـ SQL من غير Prisma هي [[INSERT ... ON CONFLICT (key) DO NOTHING]]: «حاول تدخّل، ولو المفتاح موجود متعملش حاجة». ولو عدد الصفوف اللي دخلت صفر، يبقى ده تكرار.

---

## ٣. الحل سطر سطر

~~~javascript
router.post("/", requireAuth, async (req, res) => {
  const key = req.get("Idempotency-Key");
  if (!key) return res.status(400).json({ error: "IDEMPOTENCY_KEY_REQUIRED" });
~~~

[[req.get("...")]] بيقرا header (من غير ما يفرق حروف كبيرة وصغيرة). ومن غير مفتاح: 400. والـ [[return]] عشان الكود ميكمّلش بعد الرد.

### احجز المفتاح الأول

~~~javascript
  try {
    await db.idempotencyKey.create({ data: { key, userId: req.user.id, status: 0, response: {} } });
  } catch (e) {
~~~

أول حاجة: دخّل صف بـ [[status: 0]] (يعني «شغال»)، **قبل** ما تعمل الطلب نفسه. لو ٣ طلبات وصلوا مع بعض، التلاتة بيحاولوا [[create]]، والقاعدة بتقبل واحد بس والاتنين التانيين بيترمي عليهم خطأ.

### لو المفتاح موجود

~~~javascript
    if (e.code !== "P2002") throw e;
    const saved = await db.idempotencyKey.findUnique({ where: { key } });
~~~

- [[P2002]]: كود Prisma لـ «unique اتكسر» = المفتاح موجود. أي خطأ تاني ([[!==]]) مش شغلنا، ارميه تاني.
- [[findUnique]]: هات الصف الموجود.

~~~javascript
    if (saved.userId !== req.user.id) return res.status(422).json({ error: "KEY_REUSED" });
    if (saved.status === 0) return res.status(409).json({ error: "IN_PROGRESS" });
    return res.status(saved.status).json(saved.response);
  }
~~~

٣ حالات:

| الحالة | الرد |
|---|---|
| المفتاح بتاع يوزر تاني | 422 [[KEY_REUSED]] |
| [[status === 0]]: الطلب الأول لسه شغال | 409 [[IN_PROGRESS]]، والعميل يعيد بعد شوية |
| خلص قبل كده | نفس الـ status ونفس الرد المحفوظ |

### المفتاح جديد: اعمل الشغل

~~~javascript
  const order = await ordersService.create(req.user.id, req.body);
  await db.idempotencyKey.update({ where: { key }, data: { status: 201, response: order } });
  res.status(201).json(order);
});
~~~

اعمل الطلب، واحفظ الرد على المفتاح، وابعته.

---

## التجربة

بعتنا ٣ طلبات بنفس المفتاح مع بعض بـ [[Promise.all]]، وبعدين retry، وبعدين نفس المفتاح بيوزر تاني:

~~~text الناتج
3 parallel (correct): [
  '201 {"id":"cmuxv70gs00003kierexyfpg0","userId":"u7","amountCents":999,"createdAt":"2026-10-07T08:47:39.292Z"}',
  '409 {"error":"IN_PROGRESS"}',
  '409 {"error":"IN_PROGRESS"}'
]
retry later: 201 {"id":"cmuxv70gs00003kierexyfpg0","userId":"u7","createdAt":"2026-10-07T08:47:39.292Z","amountCents":999}
other user same key: 422 {"error":"KEY_REUSED"}
no key: 400
~~~

- طلب واحد بس اتعمل في القاعدة.
- الـ retry رجّع **نفس** الطلب (نفس الـ [[id]])، بس لاحظ ترتيب الحقول اتغير: [[jsonb]] في Postgres بيخزّن الـ object بترتيبه هو. المحتوى واحد، فمتقارنش الردود كنص.

وعملنا نسخة «غلط» بتعمل [[findUnique]] الأول وبعدين الطلب، وبعتنالها ٣ مع بعض:

~~~text الناتج
3 parallel (naive): [ '201', '500', '201' ]
~~~

والعدّ في القاعدة: **٣ طلبات** اتعملوا للنسخة دي (و ١ للصح). التلاتة سألوا «المفتاح موجود؟» في نفس اللحظة، والتلاتة لقوه مش موجود. والـ 500 جه من آخر سطر لما اتنين حاولوا يحفظوا نفس المفتاح، بس بعد ما الطلب نفسه اتعمل خلاص.

---

## الخلاصة

- المفتاح من العميل، وثابت مع الـ retry.
- احجز المفتاح بـ [[create]] (أو [[ON CONFLICT DO NOTHING]]) **قبل** الشغل، وسيب الـ primary key يرفض التكرار. «دوّر وبعدين اعمل» بيعدّي التكرار المتزامن.
- [[status: 0]] = شغال ← 409، و 201 = خلص ← رجّع المحفوظ.`,
          lines: [
            "جدول المفاتيح.",
            "المفتاح نفسه primary key، فالتكرار مستحيل على مستوى القاعدة.",
            "صاحب المفتاح.",
            "الـ status اللي اترد.",
            "الرد المحفوظ عشان يترجع زي ما هو.",
            "وقت الإنشاء عشان المسح بعد مدة.",
            "قفلة."
          ],
          sol: R`المتوقع لو التنفيذ صح: طلب واحد بس في القاعدة، والتلات ردود زي بعض (أو واحد 201 والباقيين نفس الرد المحفوظ، أو 409 «in progress» لو وصلوا والأول لسه بيتعمل).

لو لقيت ٢ أو ٣ طلبات، يبقى بتعمل [[findUnique]] وبعدين [[create]]: التلاتة دوّروا مع بعض قبل ما أي واحد يكتب. الحل إنك تحجز المفتاح الأول بـ [[create]] وتسيب الـ primary key يرفض التكرار (Prisma بيرمي P2002)، وبعدين تعمل الطلب وتحدّث الصف بالرد.`,
          solCode: R`router.post("/", requireAuth, async (req, res) => {
  const key = req.get("Idempotency-Key");
  if (!key) return res.status(400).json({ error: "IDEMPOTENCY_KEY_REQUIRED" });
  try {
    await db.idempotencyKey.create({ data: { key, userId: req.user.id, status: 0, response: {} } });
  } catch (e) {
    if (e.code !== "P2002") throw e;
    const saved = await db.idempotencyKey.findUnique({ where: { key } });
    if (saved.userId !== req.user.id) return res.status(422).json({ error: "KEY_REUSED" });
    if (saved.status === 0) return res.status(409).json({ error: "IN_PROGRESS" });
    return res.status(saved.status).json(saved.response);
  }
  const order = await ordersService.create(req.user.id, req.body);
  await db.idempotencyKey.update({ where: { key }, data: { status: 201, response: order } });
  res.status(201).json(order);
});`
        },
        {
          cmd: "استراتيجية الأخطاء",
          title: "إزاي بتتعامل مع الأخطاء في API بـ Node؟ (error handling strategy)",
          desc: R`عندي نوعين: أخطاء متوقعة (operational) زي validation أو مش موجود أو مش مسموح أو خدمة برّه واقعة، ودي بترميها كـ [[AppError]] فيها status وكود ثابت. وأخطاء bugs (undefined is not a function) ودي بتبقى 500 برسالة عامة وبتتسجّل بالـ stack وبتروح Sentry.

كل ده بيتمسك في error middleware واحد في الآخر بيرجّع نفس شكل الـ JSON دايمًا. والـ process نفسها: [[unhandledRejection]] و [[uncaughtException]] بيتسجّلوا والـ process بتقفل نضيف وتتعاد (PM2 أو Docker)، مش بتكمّل في حالة مش معروفة.`,
          example: R`export class AppError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}

app.use((err, req, res, next) => {
  if (err instanceof AppError) return res.status(err.status).json({ error: err.code, message: err.message });
  req.log.error({ err }, "unhandled error");
  res.status(500).json({ error: "INTERNAL", requestId: req.id });
});

process.on("unhandledRejection", (reason) => { logger.fatal({ err: reason }, "unhandledRejection"); shutdown(1); });
process.on("uncaughtException", (err) => { logger.fatal({ err }, "uncaughtException"); shutdown(1); });`,
          try: R`في الـ API بتاعك: ارمي [[new AppError(404, "ORDER_NOT_FOUND", "...")]] من service، وارمي [[TypeError]] عادي من service تانية، وقارن الردين واللوج. وبعدين اعمل [[Promise.reject(new Error("x"))]] برّه أي route وشوف الـ process عملت إيه.`,
          flag: "script",
          deep: {
            why: "API من غير استراتيجية بيرجّع أشكال أخطاء مختلفة في كل route، وأحيانًا بيسرّب stack traces ورسايل القاعدة للعميل، وأحيانًا بيبلع الخطأ فمحدش يعرف. والسؤال بيبين إنك شغّلت حاجة في الإنتاج.",
            how: R`النقط اللي تقولها: شكل واحد للأخطاء ([[{ error: "CODE", message }]] أو [[application/problem+json]]، درس [[problem+json]] في تاب «APIs متقدمة» ودرس «شكل الأخطاء» في «تاب بناء مشروع كامل»)، والواجهة بتعتمد على الـ code مش النص.

مكان الرمي: الـ validation في الـ middleware (400)، والـ service ترمي أخطاء الـ business (404 و 409 و 422)، ومحدش جوه الـ service يعمل [[res.status]]. والخطأ من مكتبة (Prisma P2002، أو 503 من البوابة) بيتحول لـ AppError في مكان واحد.

Express 5 بيمسك rejections الـ async handlers لوحده (درس [[async errors في Express 5]]). والـ 500 عمره ما يرجّع [[err.message]] للعميل، بس [[requestId]] عشان تدوّر بيه في اللوج (درس [[AsyncLocalStorage]]).

uncaughtException: الـ process بعدها في حالة مش معروفة (اتصال نص مفتوح، أو lock مش اتفك). الصح تسجّل، وتبطّل تقبل طلبات، وتقفل، والـ supervisor يشغّل نسخة جديدة. وفي Node الحديث الـ unhandledRejection بيقفل الـ process افتراضيًا أصلًا.

والأخطاء اللي مش بتاعتك: timeouts على أي طلب لبرّه ([[AbortSignal.timeout(5000)]])، و retry بـ backoff للحاجات الـ idempotent بس، و circuit breaker لو الخدمة واقعة كتير.`,
            when: R`أسئلة بعدها: «operational و programmer errors الفرق إيه؟». «ليه متكمّلش بعد uncaughtException؟». «إزاي تعرف إن فيه أخطاء في الإنتاج؟» (Sentry و alerts على نسبة الـ 5xx). «4xx ولا 5xx لو القاعدة وقعت؟» (503).`,
            mistakes: R`[[try/catch]] في كل route بيرجّع [[res.status(500).json(err)]] فيسرّب كل حاجة. و [[catch (e) {}]] فاضي. و [[process.on("uncaughtException", log)]] والـ process تكمّل. ورسايل خطأ مختلفة للإيميل الغلط والباسورد الغلط في login (بتقول للمهاجم مين مسجّل).`
          },
          teach: R`## ٣ طبقات: كلاس للأخطاء المتوقعة، و handler واحد، وشبكة أمان للـ process

المثال بيفرّق بين خطأ **متوقع** (الطلب مش موجود: ده رد عادي 404 برسالة مفهومة) وخطأ **bug** (undefined في حتة: ده 500 من غير تفاصيل للعميل، والتفاصيل كلها في اللوج). وفوق الاتنين: لو حاجة فلتت برّه أي route، الـ process بتسجّل وتقفل.

جربناه على Express 5.2 و pino 10 (اللوجر) مع pino-http (اللي بيحط [[req.log]] و [[req.id]])، Node 24 على ويندوز. اسم الجهاز في اللوج مستبدل بـ [[ALI-PC]].

---

## ١. [[AppError]]

~~~javascript
export class AppError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}
~~~

- [[extends Error]]: [[AppError]] نوع من [[Error]]، فبياخد [[message]] و [[stack]] زي أي خطأ.
- [[super(message)]]: نادي constructor بتاع [[Error]] بالرسالة. لازم قبل أي [[this]].
- [[this.status]]: الـ HTTP status (404 مثلًا).
- [[this.code]]: كود ثابت بحروف كبيرة ([[ORDER_NOT_FOUND]]). الواجهة بتعمل [[if]] عليه، لأن النص ممكن يتغير أو يتترجم والكود لأ.

والاستخدام في أي service:

~~~javascript
throw new AppError(404, "ORDER_NOT_FOUND", "Order not found");
~~~

---

## ٢. الـ error handler

~~~javascript
app.use((err, req, res, next) => {
~~~

٤ باراميترز = error middleware (درس «next() والترتيب»)، وفي آخر الملف.

~~~javascript
  if (err instanceof AppError) return res.status(err.status).json({ error: err.code, message: err.message });
~~~

[[instanceof AppError]]: «الخطأ ده اتعمل من [[AppError]]؟» لو أيوه، ده خطأ متوقع: رد بالـ status والكود والرسالة، ومن غير لوج error (مش مشكلة في السيرفر).

~~~text GET /orders/1 (الـ handler رمى AppError)
HTTP/1.1 404 Not Found
{"error":"ORDER_NOT_FOUND","message":"Order not found"}
~~~

~~~javascript
  req.log.error({ err }, "unhandled error");
  res.status(500).json({ error: "INTERNAL", requestId: req.id });
});
~~~

أي حاجة تانية bug:

- [[req.log]]: لوجر pino-http مربوط بالطلب ده، فكل سطر بيطلع معاه بيانات الطلب.
- [[.error({ err }, "...")]]: سطر بمستوى error. والمفتاح لازم اسمه [[err]]: pino بيطبع الخطأ اللي تحته بالـ type والرسالة والـ stack.
- [[requestId: req.id]]: id الطلب. الـ 500 مفيهوش أي تفاصيل، بس فيه الـ id ده عشان لما اليوزر يشتكي تدوّر بيه في اللوج.

جربنا route بيعمل [[undefined.name]]:

~~~text الرد
HTTP/1.1 500 Internal Server Error
{"error":"INTERNAL","requestId":"9188151f-f875-47b4-be99-5461179ce8f1"}
~~~

~~~text اللوج (سطر واحد JSON، مقطوع هنا)
{"level":50,"time":1791361961591,"pid":21756,"hostname":"ALI-PC","req":{"id":"9188151f-f875-47b4-be99-5461179ce8f1","method":"GET","url":"/bug",...},"err":{"type":"TypeError","message":"Cannot read properties of undefined (reading 'name')","stack":"TypeError: Ca...
~~~

[[level: 50]] = error في pino (30 info و 40 warn و 60 fatal). ونفس الـ [[requestId]] في الرد واللوج.

---

## ٣. شبكة الأمان للـ process

~~~javascript
process.on("unhandledRejection", (reason) => { logger.fatal({ err: reason }, "unhandledRejection"); shutdown(1); });
process.on("uncaughtException", (err) => { logger.fatal({ err }, "uncaughtException"); shutdown(1); });
~~~

- [[unhandledRejection]]: Promise اترفضت ومحدش عمل لها [[catch]] ولا [[await]] جوه try. و [[reason]] السبب (غالبًا Error).
- [[uncaughtException]]: خطأ اترمى برّه أي try ووصل لحد فوق.
- [[logger.fatal]]: أعلى مستوى (60): «الـ process هتموت».
- [[shutdown(1)]]: اقفل نضيف بـ exit code 1 (يعني فشل)، و Docker أو PM2 يشغّلوا نسخة جديدة.

### غلطة صلّحناها في السطر الأول

كان مكتوب [[logger.fatal({ reason }, ...)]]. جربناه بـ [[Promise.reject(new Error("x"))]] برّه أي route:

~~~text اللوج
{"level":60,"time":1791361963366,"pid":40904,"hostname":"ALI-PC","reason":{},"msg":"unhandledRejection"}
~~~

[[reason: {}]]! pino بيعرف يطبع الـ Error بس تحت المفتاح [[err]]. تحت أي اسم تاني بيتحوّل JSON عادي، و Error ملوش خصائص بتتطبع فبيطلع فاضي. بعد [[{ err: reason }]]:

~~~text اللوج
{"level":60,...,"err":{"type":"Error","message":"x","stack":"Error: x\n    at Timeout._onTimeout (file:///C:/Users/ali/.../errors.mjs:...
exit code: 1
~~~

ولو مفيش handler خالص، Node الحديث (من 15) بيقفل الـ process لوحده على أي unhandledRejection بـ exit code 1 (جربناها بـ [[node -e]] فيه [[Promise.reject]]). الـ handler ميزته إنه بيسجّل باللوجر بتاعك ويقفل السيرفر نضيف.

---

## ٤. [[shutdown]] (الحل)

~~~javascript
function shutdown(code) {
  server.close(() => process.exit(code));
  setTimeout(() => process.exit(code), 10_000).unref();
}
~~~

- [[server.close(cb)]]: بطّل تقبل اتصالات جديدة، ولما الطلبات اللي شغالة تخلص نادي [[cb]].
- [[process.exit(code)]]: اخرج بالكود ده.
- [[setTimeout(..., 10_000)]]: حد أقصى ١٠ ثواني، ولو لسه فيه اتصال معلّق اخرج بالعافية. و [[10_000]] = 10000، والـ [[_]] للقراية بس.
- [[.unref()]]: «التايمر ده لوحده ميخليش الـ process عايشة». لو كل حاجة خلصت قبل ١٠ ثواني، الـ process تخرج من غير ما تستنى التايمر.

---

## الخلاصة

| النوع | مثال | الرد | اللوج |
|---|---|---|---|
| متوقع ([[AppError]]) | طلب مش موجود | الـ status والكود والرسالة | مفيش error |
| bug | [[undefined.name]] | 500 [[INTERNAL]] و [[requestId]] بس | error بالـ stack |
| برّه أي طلب | Promise مرفوضة | (مفيش طلب) | fatal، والـ process تقفل بـ 1 |

- الـ 500 عمره ما يرجّع [[err.message]] ولا stack.
- مع pino: الخطأ تحت [[err]] دايمًا، وإلا هيطلع [[{}]].`,
          lines: [
            "كلاس للأخطاء المتوقعة.",
            "فيه status وكود ثابت ورسالة.",
            "قفلة.",
            "error handler واحد في الآخر.",
            "خطأ متوقع: رد بالـ status والكود.",
            "غير كده bug: سجّله بالـ stack.",
            "ورد 500 عام ومعاه id الطلب بس.",
            "قفلة.",
            "promise اترفضت ومحدش مسكها: سجّلها تحت [[err]] (عشان pino يطبع الرسالة والـ stack) واقفل نضيف.",
            "exception محدش مسكه: نفس الحاجة."
          ],
          sol: R`المتوقع: الـ AppError بيرجع 404 و [[{ error: "ORDER_NOT_FOUND", message: "..." }]] ومفيش سطر error في اللوج (أو سطر info، دي حاجة عادية). والـ TypeError بيرجع 500 و [[{ error: "INTERNAL", requestId: "..." }]] من غير أي تفاصيل، واللوج فيه سطر error بالـ stack والـ requestId نفسه.

والـ rejection برّه الـ routes: سطر fatal في اللوج والـ process بتقفل بـ exit code 1، و Docker أو PM2 يشغّلها تاني. لو الـ process كمّلت عادي، يبقى الـ handler بيسجّل بس ومش بيقفل.

ولو الـ 500 رجع فيه رسالة الـ TypeError أو stack، يبقى الـ handler بيبعت [[err.message]]. دي ثغرة تسريب معلومات.`,
          solCode: R`function shutdown(code) {
  server.close(() => process.exit(code));
  setTimeout(() => process.exit(code), 10_000).unref();
}`
        },
        {
          cmd: "streams في الانترفيو",
          title: "إزاي ترفع أو تنزّل ملف ٢ جيجا في Node؟ (streams & backpressure)",
          desc: R`مستحيل أقرا الملف كله في الذاكرة. بستخدم streams: الملف بيتقري ويتبعت حتة حتة، والذاكرة ثابتة مهما كان الحجم. وبوصّلهم بـ [[pipeline]] عشان الأخطاء والـ backpressure: لو الطرف اللي بيكتب أبطأ، القراية بتستنى بدل ما الحتت تتكوّم في الرام.

وللرفع الكبير جدًا، الأحسن إن الملف ميعدّيش على السيرفر خالص: signed upload URL والمتصفح يرفع لـ S3 مباشرة، والسيرفر ياخد إشعار لما يخلص.`,
          example: R`router.get("/files/:id/download", requireAuth, async (req, res) => {
  const file = await filesService.getMine(req.user.id, req.params.id);
  res.attachment(file.name);
  res.setHeader("Content-Length", file.size);
  await pipeline(createReadStream(file.path), res);
});`,
          try: R`اعمل ملف ١ جيجا ([[fallocate -l 1G big.bin]] أو [[dd]])، ونزّله مرة بـ [[res.send(await readFile(path))]] ومرة بالـ pipeline، وراقب الـ RSS بتاع السيرفر في الحالتين. وبعدين نزّله بـ curl بسرعة محدودة ([[--limit-rate 1M]]) وشوف الذاكرة بتعمل إيه مع pipeline.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم إن الـ RAM محدودة وإن Node عنده أداة معمولة للمشكلة دي بالظبط. وبيفتح كلام عن backpressure، وده مفهوم كتير مبيعرفوهوش.",
            how: R`النقط: ٤ أنواع streams (Readable و Writable و Duplex و Transform). الـ backpressure: [[write()]] بيرجّع false لما البافر ([[highWaterMark]]) يتملى، والمفروض تستنى [[drain]]، و pipeline بيعمل ده لوحده. و [[.pipe()]] مبيمررش الأخطاء، فـ pipeline أو [[stream.promises.pipeline]].

في HTTP: [[req]] Readable و [[res]] Writable. فالرفع ممكن يتقري stream (busboy، أو multer بـ diskStorage) من غير ما يتجمّع في الرام. وفي الإنتاج: حد أقصى للحجم، و signed URL للملفات الكبيرة (درس [[signed upload URL]] في «تاب بناء مشروع كامل»)، ومعالجة بعد الرفع في queue.

والتفاصيل والتجربة بالأرقام في درس [[streams و pipeline]].`,
            when: R`أسئلة بعدها: «يعني إيه highWaterMark؟». «إزاي تعمل Transform بتحوّل CSV لـ JSON؟». «async iterators مع streams؟» ([[for await]]). «لو اليوزر قفل الاتصال في النص؟» (pipeline بيعمل destroy للكل، فالملف بيتقفل).`,
            mistakes: R`«بقرا الملف بـ readFile وأبعته» أو «بزوّد الرام». و [[multer.memoryStorage()]] للملفات الكبيرة. و pipe من غير error handling فملف واحد بايظ بيسيب file descriptors مفتوحة.`
          },
          teach: R`## الملف بيعدّي من الديسك للشبكة حتة حتة

الـ route ده بيبعت ملف لليوزر من غير ما يحمّله كله في الرام: [[createReadStream]] بيقرا حتت صغيرة، و [[pipeline]] بيوصّلها بالرد واحدة واحدة، ولو الشبكة أبطأ من الديسك بيوقّف القراية لحد ما الحتت اللي اتبعتت تخلص (ده الـ backpressure).

جربناه على Express 5.2 و Node 24 (ويندوز) بملف ١ جيجا، وقِسنا الذاكرة من جوه السيرفر ([[process.memoryUsage().rss]] كل ١٠٠ms، وأعلى رقم وصله).

---

## السطور

~~~javascript
router.get("/files/:id/download", requireAuth, async (req, res) => {
~~~

route بـ middleware [[requireAuth]] قبل الـ handler، و [[async]] عشان فيه [[await]].

~~~javascript
  const file = await filesService.getMine(req.user.id, req.params.id);
~~~

هات بيانات الملف (المسار والاسم والحجم) من القاعدة، **بشرط** إنه بتاع اليوزر ده. [[req.params.id]] هو [[:id]] من الـ URL. من غير شرط اليوزر، أي حد يغيّر الرقم في الـ URL ينزّل ملفات غيره.

~~~javascript
  res.attachment(file.name);
  res.setHeader("Content-Length", file.size);
~~~

- [[res.attachment(name)]]: بيحط header [[Content-Disposition: attachment; filename="..."]] = «المتصفح ينزّله كملف بالاسم ده بدل ما يعرضه»، وبيحط [[Content-Type]] من امتداد الاسم.
- [[Content-Length]]: الحجم بالبايت، فالمتصفح يعرف يعرض progress bar وفاضل قد إيه.

~~~bash
curl -sI localhost:5864/files/1/download
~~~

[[-I]] = اطلب الـ headers بس (HEAD):

~~~text الناتج
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/octet-stream
Content-Disposition: attachment; filename="report.bin"
Content-Length: 1073741824
~~~

[[1073741824]] = 1024 × 1024 × 1024 = ١ جيجا. و [[application/octet-stream]] يعني «بايتات وخلاص»، لأن [[.bin]] ملوش نوع معروف.

~~~javascript
  await pipeline(createReadStream(file.path), res);
});
~~~

- [[createReadStream(path)]] من [[node:fs]]: stream بيقرا الملف حتة حتة (٦٤ كيلو كل مرة افتراضيًا، ده الـ [[highWaterMark]] بتاعه).
- [[res]]: الرد نفسه stream بتكتب فيه (Writable).
- [[pipeline(a, b)]] من [[node:stream/promises]]: وصّل [[a]] بـ [[b]]، ولو أي واحد فيهم وقع (الملف اتمسح، أو اليوزر قفل الاتصال) اقفل الاتنين. وبيرجّع Promise بتخلص لما الملف كله يتبعت، فالـ [[await]] بيستناها وأي خطأ بيروح للـ error handler.

---

## التجربة: الذاكرة

عملنا ملف ١ جيجا. على لينكس:

~~~bash
fallocate -l 1G big.bin
~~~

[[fallocate]] بيحجز المساحة على طول من غير ما يكتب، و [[-l 1G]] الطول. (جربناه في [[ubuntu:24.04]]: [[ls -l]] قال [[1073741824]].) وعلى ويندوز:

~~~powershell
fsutil file createnew big.bin 1073741824
~~~

~~~text الناتج
File C:\Users\ali\...\big.bin is created
~~~

(من غير صلاحيات أدمن، جربناه في PowerShell 7.) والنتايج، السيرفر بدأ بحوالي ٧٥ ميجا:

| التنزيل | أعلى RSS | الوقت |
|---|---|---|
| [[pipeline]] | 145 ميجا | 2.36 ثانية |
| [[res.send(await readFile(path))]] | 1103 ميجا | 1.92 ثانية |
| [[readFile]] لاتنين مع بعض | 2122 ميجا | |
| [[pipeline]] مع [[curl --limit-rate 1M]] (٨ ثواني) | 81 ميجا | |

RSS = Resident Set Size: الرام اللي الـ process ماسكاها فعلًا. و [[readFile]] بيحط الجيجا كلها في Buffer قبل ما يبعت أول بايت، فكل تنزيل = جيجا رام. ١٠ يوزرين مع بعض = ١٠ جيجا والسيرفر يقع. ومع [[pipeline]] الرقم مش بيتأثر بحجم الملف.

### [[--limit-rate 1M]]

~~~bash
curl -s -o /dev/null --limit-rate 1M http://localhost:5864/files/1/download
~~~

- [[-o /dev/null]]: ارمي الملف، مش عايزينه.
- [[--limit-rate 1M]]: curl يقرا ١ ميجا في الثانية بالكتير، كأنه يوزر على نت بطيء.

الديسك بيقرا بمئات الميجا في الثانية، والشبكة بتاخد ١ بس. من غير backpressure، القراية كانت هتخلص في ثانية والـ ١٠٢٣ ميجا الباقيين يتكوّموا في الرام مستنيين. اللي حصل: الذاكرة فضلت 81 ميجا. لما البافر بتاع الـ socket اتملى، [[res.write()]] رجّع [[false]]، و [[pipeline]] وقّف الـ read stream لحد ما الـ socket فضي ([[drain]]).

---

## سطر الحل الأخير

~~~bash
while sleep 1; do ps -o rss= -p $(pgrep -f "node server") ; done
~~~

لينكس بس: كل ثانية ([[while sleep 1]]) اطبع الـ RSS بالكيلوبايت ([[ps -o rss=]]، والـ [[=]] بتشيل عنوان العمود) للـ process اللي سطر تشغيلها فيه [[node server]] ([[pgrep -f]] بيدوّر في سطر الأمر كله). وعلى ويندوز نفس الفكرة بالـ PID:

~~~powershell
while ($true) { (Get-Process -Id 1234).WorkingSet64 / 1MB; Start-Sleep 1 }
~~~

[[WorkingSet64]] هو نفس فكرة الـ RSS على ويندوز، بالبايت، و [[/ 1MB]] بتحوّله ميجا. و [[1234]] الـ PID بتاع السيرفر بتاعك. (جربنا اللوب في PowerShell 7 و 5.1 على PID الشيل نفسه، وطبع رقم بالميجا كل ثانية زي [[80.76953125]].)

---

## الخلاصة

- [[readFile]] + [[send]] = الملف كله في الرام، لكل يوزر.
- [[pipeline(createReadStream(...), res)]] = ذاكرة ثابتة، وأخطاء وإغلاق مضبوطين، و backpressure لوحده.
- [[.pipe()]] القديم بيعمل backpressure بس مبيقفلش الـ streams لو حصل خطأ، فـ [[pipeline]] أحسن.`,
          lines: [
            "endpoint تنزيل ملف.",
            "هات بيانات الملف بتاع اليوزر ده بس.",
            "اسم الملف في Content-Disposition.",
            "الحجم عشان المتصفح يعرض progress.",
            "اقرا واكتب في الرد حتة حتة، والـ backpressure والإغلاق على pipeline.",
            "قفلة."
          ],
          sol: R`المتوقع: مع [[readFile]] الـ RSS بيطلع فوق ١ جيجا وقت كل تنزيل (ولو اتنين نزّلوا مع بعض، اتنين جيجا). ومع pipeline بيفضل ثابت تقريبًا (عشرات الميجا) مهما كان حجم الملف.

ومع [[--limit-rate 1M]]: الذاكرة لسه ثابتة، لأن الـ socket بطيء فبيرجّع false، و pipeline بيوقّف القراية لحد ما البافر يفضى. من غير backpressure، القراية كانت هتخلص في ثانية والجيجا كلها تتكوّم في الرام مستنية الشبكة.`,
          solCode: R`fallocate -l 1G big.bin
curl -s -o /dev/null --limit-rate 1M http://localhost:3000/files/1/download -H "Authorization: Bearer $TOKEN" &
while sleep 1; do ps -o rss= -p $(pgrep -f "node server") ; done`
        },
        {
          cmd: "graceful shutdown",
          title: "إزاي تعمل deploy من غير ما طلبات تضيع؟ (graceful shutdown)",
          desc: R`لما Docker أو Kubernetes أو PM2 عايزين يقفلوا النسخة القديمة، بيبعتوا SIGTERM، ولو مقفلتش في مدة (١٠ ثواني في Docker افتراضيًا) بيبعتوا SIGKILL.

على SIGTERM: ابطّل تقبل اتصالات جديدة ([[server.close()]])، وخلّي الـ health check يرجع 503 عشان الـ load balancer يبطّل يبعتلك، وسيب الطلبات اللي شغالة تخلص، واقفل الـ workers والـ queues والقاعدة و Redis، وبعدين اخرج. ومعاه timeout: لو معلّق أكتر من كذا، اخرج بالعافية.`,
          example: R`let shuttingDown = false;
app.get("/health", (req, res) => res.status(shuttingDown ? 503 : 200).json({ ok: !shuttingDown }));

process.on("SIGTERM", async () => {
  shuttingDown = true;
  logger.info("SIGTERM: draining");
  setTimeout(() => process.exit(1), 25_000).unref();
  server.close(async () => {
    await Promise.allSettled([worker.close(), db.$disconnect(), redis.quit()]);
    process.exit(0);
  });
});`,
          try: R`اعمل route بياخد ٥ ثواني، وابعتله طلب، وفي النص ابعت [[kill -TERM <pid>]]. الطلب كمّل؟ وطلب جديد بعد الـ SIGTERM اتقبل؟ جرّب نفس الحاجة من غير الـ handler.`,
          flag: "script",
          deep: {
            why: "كل deploy بيقفل نسخة. من غير إغلاق نضيف، كل deploy بيقطع طلبات شغالة (دفع في النص، أو رفع ملف)، ويسيب jobs نصها معمول، واتصالات قاعدة معلّقة. والسؤال بيبين إنك شغّلت تطبيق في الإنتاج مش على جهازك بس.",
            how: R`النقط: SIGTERM مش SIGKILL (التاني مفيش handler ليه). و [[server.close()]] بيوقّف قبول اتصالات جديدة ويستنى الموجودة، بس الـ keep-alive connections ممكن تفضل مفتوحة: [[server.closeIdleConnections()]] أو خلي Node الحديث يعملها. والـ health بـ 503 قبل الإغلاق بشوية عشان الـ load balancer يلحق يشيلك.

في Docker: [[CMD ["node", "server.js"]]] مش [[npm start]] (npm مبيوصّلش الـ signal دايمًا)، أو [[--init]]. والـ [[stop_grace_period]] أطول من الـ timeout بتاعك. وفي BullMQ [[worker.close()]] بيستنى الـ job الحالية. وفي Nest [[app.enableShutdownHooks()]].

التفاصيل والكود في درس «الإغلاق النضيف» في تاب «Node و npm».`,
            when: R`أسئلة بعدها: «الفرق بين SIGTERM و SIGKILL و SIGINT؟». «zero-downtime deploy إزاي؟» (rolling update + readiness + graceful shutdown). «websocket connections تعمل فيها إيه؟» (ابعت close للعميل عشان يعمل reconnect على نسخة تانية).`,
            mistakes: R`[[process.exit()]] على طول في SIGTERM. أو handler من غير timeout فالـ process تعلّق لحد SIGKILL. أو [[npm start]] كـ PID 1 في Docker فالـ signal مبيوصلش. ونسيان الـ workers والـ intervals فالـ process مبتخرجش لوحدها.`
          },
          teach: R`## لما SIGTERM يوصل: بطّل تستقبل، خلّص اللي في إيدك، اقفل، اخرج

SIGTERM رسالة من نظام التشغيل معناها «اقفل لو سمحت». Docker و Kubernetes و PM2 بيبعتوها في كل deploy للنسخة القديمة. المثال بيمسكها: يعلّم إنه بيقفل، ويوقّف استقبال اتصالات جديدة، ويستنى الطلبات اللي شغالة، ويقفل الاتصالات، وبعدين يخرج.

جربناه في Docker ([[node:22-slim]]، لينكس) مع Express 5، لأن ويندوز مفيهوش SIGTERM حقيقي: [[kill]] من Git Bash على ويندوز بيقفل الـ process على طول من غير ما الـ handler يتنادى. والـ worker والقاعدة و Redis في التجربة fakes بتطبع سطر لما تتقفل.

---

## السطور

~~~javascript
let shuttingDown = false;
app.get("/health", (req, res) => res.status(shuttingDown ? 503 : 200).json({ ok: !shuttingDown }));
~~~

- [[shuttingDown]]: flag، [[false]] طول ما السيرفر شغال عادي.
- [[/health]]: الـ load balancer (أو Kubernetes) بيسأله كل شوية «انت كويس؟».
- [[shuttingDown ? 503 : 200]]: الـ [[? :]] يعني «لو الشرط صح خد الأولى، وإلا التانية». وقت الإغلاق 503 (Service Unavailable)، فالـ load balancer يبطّل يبعتلك طلبات جديدة.

~~~javascript
process.on("SIGTERM", async () => {
  shuttingDown = true;
  logger.info("SIGTERM: draining");
~~~

[[process.on("SIGTERM", fn)]]: لما الـ signal توصل نادي [[fn]]. ومجرد إنك سجّلت handler، Node **مبيقفلش لوحده** على SIGTERM: القرار بقى في إيدك. و draining يعني «بنفضّي اللي في الطريق».

~~~javascript
  setTimeout(() => process.exit(1), 25_000).unref();
~~~

حد أقصى: لو لسه معلّق بعد ٢٥ ثانية، اخرج بـ 1 (فشل). و [[.unref()]] عشان التايمر ده لوحده ميمنعش الـ process إنها تخرج لو كل حاجة خلصت قبله. والـ ٢٥ لازم تبقى أقل من مهلة الـ orchestrator: Docker مستني ١٠ ثواني بس افتراضيًا وبعدها SIGKILL، فالـ ٢٥ ثانية دي مش هتلحق تشتغل إلا لو زوّدت المهلة بـ [[docker stop -t 30]] أو [[stop_grace_period: 30s]] في compose، أو تقلّل الرقم ده لأقل من ١٠.

~~~javascript
  server.close(async () => {
    await Promise.allSettled([worker.close(), db.$disconnect(), redis.quit()]);
    process.exit(0);
  });
});
~~~

- [[server]]: اللي [[app.listen()]] رجّعه.
- [[server.close(cb)]]: بطّل تقبل اتصالات جديدة **فورًا**، ولما آخر اتصال مفتوح يخلص نادي [[cb]].
- [[Promise.allSettled([...])]]: شغّل التلاتة مع بعض واستناهم كلهم، **حتى لو واحد فشل** (عكس [[Promise.all]] اللي بيقف عند أول فشل). عشان فشل Redis ميمنعش إن القاعدة تتقفل.
- [[worker.close()]] (BullMQ): بيستنى الـ job الحالية تخلص ومياخدش جديد. [[db.$disconnect()]]: يقفل pool بتاع Prisma. [[redis.quit()]]: يقفل Redis بعد ما الأوامر اللي في الطريق تخلص.
- [[process.exit(0)]]: اخرج بنجاح.

---

## التجربة

route بياخد ٥ ثواني، طلب عليه، وبعد ثانية [[docker kill --signal TERM]] (نفس اللي [[docker stop]] بيعمله في الأول)، وبعدها على طول طلب جديد:

~~~text الناتج: مع الـ handler
new request after SIGTERM: error ECONNREFUSED
{"ok":true}
~~~

~~~text لوج السيرفر
08:34:46.435 listening
08:34:48.731 SIGTERM: draining
08:34:52.522 worker closed
08:34:52.522 db disconnected
08:34:52.522 redis quit
08:34:52.522 exit 0
~~~

- الطلب الجديد اترفض ([[ECONNREFUSED]]: مفيش حد بيسمع على البورت) لأن [[server.close()]] وقّف الاستقبال. (ولما طلبناه بـ curl من ويندوز عن طريق الـ port بتاع Docker Desktop، الرسالة كانت [[curl: (52) Empty reply from server]]، لأن Docker هو اللي قبل الاتصال وبعدين قفله.)
- الطلب البطيء كمّل ورجع [[{"ok":true}]].
- الإغلاق حصل بعد حوالي ٣.٨ ثانية من الـ SIGTERM: لما الطلب البطيء خلص بالظبط. وخرج بـ [[ExitCode=0]].

~~~text الناتج: من غير handler
curl: (52) Empty reply from server
  [000]
slow curl exit=52
ExitCode=143
~~~

الطلب اللي كان شغال اتقطع في النص. و [[143]] = 128 + 15 (رقم SIGTERM): الـ process ماتت بالـ signal.

### PID 1 في Docker

لو node هو أول process في الـ container (PID 1) **ومفيش handler**، لينكس بيتجاهل SIGTERM ليه خالص. جربنا من غير [[--init]]:

~~~text الناتج
Running=true
docker stop took 10s
ExitCode=137
~~~

الـ SIGTERM ملوش أي أثر، و [[docker stop]] استنى الـ ١٠ ثواني وبعت SIGKILL ([[137]] = 128 + 9). عشان كده التجارب فوق كانت بـ [[docker run --init]]: بيحط process صغيرة (tini) هي PID 1 وتوصّل الـ signals لـ node. أو تسجّل handler زي المثال، فيبقى الكلام ده مش فارق.

---

## الحل

~~~javascript
app.get("/slow", async (req, res) => { await new Promise((r) => setTimeout(r, 5000)); res.json({ ok: true }); });
~~~

[[new Promise((r) => setTimeout(r, 5000))]]: Promise بتخلص بعد ٥ ثواني، فالـ [[await]] بيستنى، كأنه query بطيئة.

~~~bash
curl -s localhost:3000/slow & sleep 1; kill -TERM $(pgrep -f "node server.js"); wait
~~~

لينكس أو ماك: [[&]] شغّل curl في الخلفية، و [[sleep 1]] استنى ثانية، و [[kill -TERM]] ابعت SIGTERM للـ PID اللي [[pgrep -f]] لقاه، و [[wait]] استنى curl يخلص. (على ويندوز جرّبها جوه Docker أو WSL زي ما عملنا.)

---

## الخلاصة

| الخطوة | السطر |
|---|---|
| الـ load balancer يشيلك | [[/health]] يرجع 503 |
| متقبلش جديد واستنى الشغال | [[server.close(cb)]] |
| اقفل كل حاجة حتى لو واحدة فشلت | [[Promise.allSettled]] |
| اخرج نضيف | [[process.exit(0)]] |
| لو معلّق | [[setTimeout(..., 25_000).unref()]] |

- SIGKILL ملوش handler، فكل ده لازم يخلص قبل ما المهلة تخلص.
- في Docker: [[CMD ["node", "server.js"]]] أو [[--init]]، مش [[npm start]].`,
          lines: [
            "flag للحالة.",
            "الـ health يرجع 503 وانت بتقفل، فالـ load balancer يشيلك.",
            "لما SIGTERM يوصل...",
            "...علّم إنك بتقفل.",
            "سجّل.",
            "حد أقصى: لو معلّق ٢٥ ثانية اخرج بالعافية (و unref عشان ميمنعش الخروج الطبيعي).",
            "ابطّل تقبل اتصالات جديدة، ولما الموجودة تخلص...",
            "...اقفل الـ worker والقاعدة و Redis، حتى لو واحد فشل.",
            "اخرج بنجاح.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`مع الـ handler: الطلب الشغال كمّل ورجع 200 بعد الـ ٥ ثواني، وأي طلب جديد بعد الـ SIGTERM اترفض بـ connection refused (السيرفر بطّل يسمع؛ ولو بتطلبه من برّه container عن طريق port في Docker Desktop، curl بيقول [[(52) Empty reply from server]] بدلها)، والـ process خرجت بـ 0 بعد ما الطلب خلص.

من غير الـ handler: Node بيقفل فورًا على SIGTERM، والطلب الشغال بيقطع ([[curl: (52) Empty reply from server]]).

لو الـ process مخرجتش خالص مع الـ handler، يبقى فيه حاجة لسه مفتوحة (interval، أو اتصال keep-alive، أو client Redis)، والـ timeout هو اللي هيطلّعها بعد ٢٥ ثانية.`,
          solCode: R`app.get("/slow", async (req, res) => { await new Promise((r) => setTimeout(r, 5000)); res.json({ ok: true }); });
// ترمنال ١: node server.js
// ترمنال ٢: curl -s localhost:3000/slow & sleep 1; kill -TERM $(pgrep -f "node server.js"); wait
// {"ok":true}   والسيرفر خرج بعدها`
        }
      ]
    }
]);
