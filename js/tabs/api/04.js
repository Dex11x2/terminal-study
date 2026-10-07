// تكملة تاب api: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/api/01.js (شرح حقول الدرس في أوله)
MORE("api", [
    {
      t: "الأخطاء والإعدادات",
      l: 1,
      n: "مكان واحد يرد على كل الأخطاء، و Express 5 بيمسك أخطاء async لوحده، والإعدادات متحققة قبل أول طلب",
      items: [
        {
          cmd: "error middleware",
          title: "مكان واحد يرد على كل الأخطاء",
          desc: R`بدل ما كل route يكتب [[res.status(500)]]، بترمي خطأ من أي مكان، و middleware واحد في الآخر بـ ٤ arguments [[(err, req, res, next)]] بيحوّله لرد JSON.

اعمل class للأخطاء المتوقعة فيه status ورسالة تتعرض للمستخدم، وأي خطأ تاني يبقى 500 برسالة عامة، والتفاصيل في اللوج بس.`,
          example: R`// lib/errors.js
export class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// middlewares/error.js
export const notFound = (req, res) => res.status(404).json({ error: "Route not found" });

export function errorHandler(err, req, res, next) {
  const status = err.status ?? err.statusCode ?? 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: status >= 500 ? "Internal server error" : err.message });
}`,
          try: R`في [[getTask]] اكتب [[throw new AppError(404, "Task not found")]] بدل [[res.status(404)]]. وفي route تاني اكتب [[throw new Error("db password is 123")]] واتأكد إن الرد «Internal server error» والرسالة الحقيقية في الترمنال بس.`,
          flag: "script",
          deep: {
            why: R`من غير مكان واحد للأخطاء، كل route بيرد بشكل مختلف: واحد [[{ message }]] وواحد [[{ error }]] وواحد نص. والأخطر إن رسالة خطأ داتابيز توصل للمستخدم وفيها أسماء جداول أو استعلامات. و Express لوحده بيرجّع صفحة HTML فيها الـ stack في التطوير.`,
            how: R`Express بيعرف الـ error middleware من عدد الـ arguments: ٤. لما أي middleware ينادي [[next(err)]] أو يرمي خطأ (أو في Express 5 async function ترجع promise مرفوض)، Express بيتخطى كل الـ middleware العادية ويدوّر على أول error middleware بعد مكان الخطأ.

لو الرد اتبدأ خلاص ([[res.headersSent]]) وحصل خطأ في النص (مثلًا وانت بتبعت stream)، مينفعش تغيّر الـ status. الصح هنا [[return next(err)]] عشان الـ handler الافتراضي بتاع Express يقفل الاتصال.

الأخطاء اللي جاية من مكتبات ليها أشكال مختلفة: body-parser بيحط [[status]] (400 أو 413)، و multer بيرمي [[MulterError]] ليه [[code]]، و zod بيرمي [[ZodError]]، و Prisma بيرمي خطأ فيه [[code]] زي [[P2002]] (قيمة مكررة) و [[P2025]] (مش موجود). الـ error handler الناضج بيحوّل دول لـ status صح: ZodError لـ 400، و P2002 لـ 409، و P2025 لـ 404.

والـ stack يتسجل في اللوج دايمًا (درس [[pino]])، ويروح للمستخدم في التطوير بس لو حبيت.`,
            when: "في كل API من أول يوم. وهو المكان الوحيد اللي بيقرر شكل الخطأ اللي الواجهة بتشوفه.",
            mistakes: R`في مشروع حقيقي كان الـ error handler بيقارن [[error.message]] بنصوص ثابتة زي «File too large...» عشان يعرف الـ status، فلو حد عدّل الرسالة في مكان تاني، الـ status يبوظ. استخدم class أو [[code]]. وفي مشروع تاني كان بيرجّع [[err.message]] لأي خطأ حتى الـ 500، فرسايل Mongo الداخلية كانت بتوصل للمستخدم. وتكتب ٣ arguments بس، فـ Express يعامله كـ middleware عادي ومبيتناداش على الأخطاء خالص.`
          },
          teach: R`## ملفين: نوع خطأ، ومكان واحد يرد عليه

المثال فيه ٣ حاجات: class اسمها [[AppError]] للأخطاء اللي احنا متوقعينها (زي «المهمة مش موجودة»)، و [[notFound]] لأي عنوان ملوش route، و [[errorHandler]] اللي بيحوّل أي خطأ لرد JSON. اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1، والطلبات بـ curl من Git Bash على بورت تاني غير ٣٠٠٠.

---

## ١. [[class AppError extends Error]]

~~~text lib/errors.js
export class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
~~~

| السطر | معناه |
|---|---|
| [[class AppError]] | نوع جديد من الـ objects، اسمه AppError |
| [[extends Error]] | بيورث من [[Error]] اللي في JavaScript: فيه [[message]] و [[stack]] (مكان الخطأ)، وينفع يترمي بـ [[throw]] |
| [[constructor(status, message)]] | الدالة اللي بتشتغل مع [[new AppError(404, "...")]] |
| [[super(message)]] | نادي constructor بتاع [[Error]] الأصلي عشان يحط [[message]] ويحسب الـ [[stack]]. لازم يتنادى قبل أي [[this]] |
| [[this.status = status]] | زوّد خانة [[status]] على الخطأ ده |

فـ [[throw new AppError(404, "Task not found")]] بيرمي خطأ عادي، بس شايل معاه الرقم اللي المفروض يترد.

---

## ٢. [[notFound]]

~~~text
export const notFound = (req, res) => res.status(404).json({ error: "Route not found" });
~~~

middleware عادي (من غير [[next]] لأنه دايمًا بيرد). بيتسجّل **بعد كل الـ routes**، فلو طلب وصله يبقى محدش رد. بيبدّل صفحة [[Cannot GET /x]] الـ HTML بـ JSON.

---

## ٣. [[errorHandler(err, req, res, next)]]

### ٤ arguments

Express بيعرف إن دي error handler من **عدد** الـ parameters: ٤. فـ [[next]] لازم تتكتب حتى لو مش مستخدمة. وبيتنادى بس لما يحصل خطأ: [[throw]] جوه handler، أو [[next(err)]]، أو middleware زي [[express.json()]] فشل.

### [[const status = err.status ?? err.statusCode ?? 500;]]

[[??]] بياخد أول قيمة مش [[undefined]] ولا [[null]]، من الشمال لليمين:

| الخطأ | [[err.status]] | النتيجة |
|---|---|---|
| [[new AppError(404, ...)]] | [[404]] | 404 |
| JSON بايظ من [[express.json()]] | [[400]] (body-parser بيحطه) | 400 |
| مكتبات بتستخدم [[statusCode]] | [[undefined]] | [[err.statusCode]] |
| [[new Error("...")]] عادي | [[undefined]] | 500 |

### [[if (status >= 500) console.error(err);]]

أخطاء السيرفر بس بتتسجّل كاملة بالـ stack. أخطاء العميل (4xx) طبيعية ومش محتاجة تملا اللوج.

### [[res.status(status).json({ error: status >= 500 ? "Internal server error" : err.message })]]

[[? :]] if قصيرة: لو 500 أو أكتر، رسالة عامة. غير كده، رسالة الخطأ زي ما هي (لأن احنا اللي كاتبينها في [[AppError]]).

---

## ٤. نجرّب

ركّبناهم في الآخر: [[app.use(notFound)]] وبعدين [[app.use(errorHandler)]]. و [[getTask]] بقى بيرمي بدل ما يرد:

~~~text
if (!t) throw new AppError(404, "Task not found");
~~~

وزوّدنا route بيرمي خطأ عادي فيه سر: [[throw new Error("db password is 123")]].

~~~text الناتج
curl localhost:3000/api/tasks/999          {"error":"Task not found"} [404]
curl localhost:3000/api/tasks/1            {"id":1,"title":"buy milk"} [200]
curl localhost:3000/boom                   {"error":"Internal server error"} [500]
curl localhost:3000/nope                   {"error":"Route not found"} [404]
curl ... -d "{bad"                         {"error":"Expected property name or '}' in JSON at position 1 (line 1 column 2)"} [400]
~~~

- [[999]]: الـ [[throw]] وقف الـ handler، و Express قفز للـ errorHandler، اللي قرا [[status: 404]].
- [[/boom]]: المستخدم شاف «Internal server error» بس. والسر راح للترمنال:

~~~text الناتج في ترمنال السيرفر
Error: db password is 123
    at file:///.../server.js:23:40
    at Layer.handleRequest (...\node_modules\router\lib\layer.js:152:17)
    ...
~~~

[[server.js:23:40]] = الملف، السطر ٢٣، الحرف ٤٠: مكان الـ [[throw]] بالظبط.

- الـ JSON البايظ بقى JSON نضيف بـ 400 بدل صفحة HTML (قارنه بدرس [[express.json()]]).

---

## ٥. لو كتبت ٣ arguments بس

جرّبنا نفس الـ handler بـ [[(err, req, res)]]:

~~~text الناتج
curl localhost:3000/api/tasks/999
<!DOCTYPE html>
...
<pre>Error: Task not found<br> &nbsp; &nbsp;at file:///.../server.js:20:17 ...
[404]
~~~

Express عامله كـ middleware عادي ومنادهوش على الخطأ، فالخطأ وصل للـ handler الافتراضي بتاع Express: صفحة HTML فيها الـ stack كله ومسارات الملفات على السيرفر. (الـ 404 لسه صح لأن الـ handler الافتراضي بيقرا [[err.status]] هو كمان.)

---

## الخلاصة

~~~text
throw new AppError(404, "...")   ->  status 404، الرسالة توصل للمستخدم
throw new Error("...")           ->  status 500، "Internal server error"، والتفاصيل في اللوج
express.json() فشل              ->  status 400 من body-parser
عنوان مش موجود                   ->  notFound، 404
~~~

- الـ error handler بـ ٤ arguments وآخر حاجة في الملف.
- رسايل 5xx متوصلش للمستخدم أبدًا.
- [[AppError]] للأخطاء المتوقعة، وأي حاجة تانية 500 لوحدها.`,
          lines: [
            "خطأ متوقع ليه status.",
            "بياخد الرقم والرسالة.",
            "الرسالة تتحط زي أي Error عادي.",
            "ويشيل الـ status معاه.",
            "قفلة الـ constructor.",
            "قفلة الـ class.",
            "لأي عنوان ملوش route: 404 بـ JSON بدل صفحة HTML.",
            "٤ arguments: كده Express يعرف إنه error handler. [[next]] لازم تتكتب حتى لو مش مستخدمة.",
            "الـ status من الخطأ لو موجود (body-parser بيحط [[status]])، وإلا 500.",
            "أخطاء السيرفر بس تتسجل بالتفاصيل.",
            "رسالة المستخدم للأخطاء المتوقعة، ورسالة عامة لأي 500 عشان منسرّبش تفاصيل.",
            "قفلة."
          ],
          sol: R`[[GET /api/tasks/999]] بيرجّع [[404]] و [[{"error":"Task not found"}]]: الـ [[throw]] وصل للـ errorHandler، وهو قرا [[err.status]] ورجّع الرسالة زي ما هي لأنها أقل من 500.

والـ route اللي بيرمي [[new Error("db password is 123")]] بيرجّع [[500]] و [[{"error":"Internal server error"}]] بس، والرسالة الحقيقية والـ stack بيطلعوا في ترمنال السيرفر من [[console.error(err)]]. ده المطلوب: اليوزر ميشوفش أي تفاصيل داخلية، وانت تشوفها كلها.

لو الرد طلع صفحة HTML فيها الـ stack، يبقى الـ errorHandler مش متسجّل، أو متسجّل قبل الـ routes، أو دالته فيها ٣ parameters بس (Express بيعرف الـ error handler من إن ليه ٤: [[err, req, res, next]]).`
        },
        {
          cmd: "async errors في Express 5",
          title: "await فشل جوه route: مين بيمسكه؟",
          desc: R`في Express 5، لو async handler أو middleware رمى خطأ أو promise اترفض، Express بيمسكه ويبعته لـ error middleware لوحده.

فمش محتاج [[try/catch]] و [[next(err)]] في كل controller. في Express 4 ده مكنش بيحصل: الخطأ بيبقى unhandled rejection والسيرفر يقع. عشان كده هتلاقي في الكود القديم [[try/catch]] في كل دالة، أو [[asyncHandler]]، أو مكتبة [[express-async-errors]].`,
          example: R`// Express 5: كفاية كده
router.get("/:id", async (req, res) => {
  const task = await tasksService.getById(req.params.id);
  if (!task) throw new AppError(404, "Task not found");
  res.json(task);
});

// Express 4: لازم تمسكه بإيدك
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// ده مش هيتمسك في أي نسخة: الخطأ بيحصل بعد ما الـ handler خلص
router.get("/later", (req, res) => { setTimeout(() => { throw new Error("boom"); }, 10); });`,
          try: R`اعمل route async بيرمي خطأ وجرّبه على Express 5، وشوف رد الـ error handler. وبعدين في فولدر تاني [[npm i express@4]] وجرّب نفس الكود: السيرفر هيقع بـ unhandled rejection (Node 15 وأحدث بيقفل العملية عليه).`,
          flag: "script",
          deep: {
            why: "أغلب كود الـ backend async: داتابيز، و APIs خارجية، وملفات. لو كل دالة محتاجة try/catch عشان الخطأ ميوقعش السيرفر، هتنسى مرة، والمرة دي هي اللي هتوقع الإنتاج.",
            how: R`Express 5 بعد ما ينادي أي handler بيبص على اللي رجع: لو promise (وأي async function بترجع promise)، بيمسك الرفض ويبعته لـ [[next(err)]]. فأي [[throw]] جوه async function، أو [[await]] لحاجة اترفضت، بيوصل للـ error handler لوحده.

الشرط إن الـ promise يرجع فعلًا من الـ handler. لو كتبت [[promise.then(...)]] من غير [[return]]، أو الخطأ حصل جوه [[setTimeout]] أو callback قديم أو event emitter، Express مش شايفه. ده بيبقى uncaught exception أو unhandled rejection على مستوى العملية كلها، و Node بيقفل العملية عليه. عشان كده في درس «الإغلاق النضيف» في تاب «Node و npm» فيه [[process.on("unhandledRejection")]] كشبكة أمان أخيرة، مش كطريقة معالجة.

والـ services لسه ممكن تمسك أخطاء بعينها وتحوّلها: [[catch (e) { if (e.code === "P2002") throw new AppError(409, "Email already used"); throw e; }]]. المهم ترمي الباقي تاني ومتبلعهوش.`,
            when: R`كل مشروع جديد: Express 5 و async handlers من غير try/catch. ولو شغال على مشروع Express 4: [[asyncHandler]] حوالين كل async route، أو ترقّي لـ 5 (وخد بالك من تغييرات الـ paths).`,
            mistakes: R`في مشروع حقيقي على Express 5 كان كل controller فيه [[try { ... } catch (e) { next(e); }]]. مش غلط، بس مئات السطور ملهاش لازمة ومصدر نسيان. وتكتب [[catch (e) { console.log(e) }]] وخلاص، فالطلب يتعلق من غير رد والخطأ يضيع. وتفتكر إن Express 5 بيمسك الأخطاء في [[setTimeout]] أو [[stream.on("error")]]: مبيمسكش غير الـ promise اللي راجع من الـ handler.`
          },
          teach: R`## ٣ حالات: خطأ بيتمسك لوحده، وخطأ محتاج غلاف، وخطأ محدش يقدر يمسكه

المثال ٣ أجزاء: route async على Express 5 بيرمي من غير [[try/catch]]، والغلاف [[asyncHandler]] اللي كان لازم في Express 4، و route بيرمي جوه [[setTimeout]] ومحدش بيمسكه. جرّبنا الكود نفسه على Express 5.2.1 وعلى Express 4.22.3 (فولدرين)، على ويندوز 11 بـ Node 24.19، وجزء Express 4 اتجرّب كمان على لينكس ([[node:22-alpine]] في Docker). وفي الكل فيه error handler في الآخر بيرد [[{ error }]]، و [[tasksService.getById]] نسخة صغيرة بترجّع مهمة لـ id [["1"]] و [[null]] لأي حاجة تانية.

---

## ١. الـ route في Express 5

~~~text
router.get("/:id", async (req, res) => {
  const task = await tasksService.getById(req.params.id);
  if (!task) throw new AppError(404, "Task not found");
  res.json(task);
});
~~~

- [[async (req, res) => {...}]] الـ handler دالة async، يعني **بترجّع promise** دايمًا.
- [[await tasksService.getById(...)]] لو الـ service رمت (الداتابيز وقعت مثلًا)، الـ [[await]] بيرمي نفس الخطأ هنا.
- [[throw new AppError(404, ...)]] جوه دالة async معناه «الـ promise اترفض بالخطأ ده».

Express 5 بعد ما ينادي الـ handler بيبص على اللي رجع: لو promise، بيستنى، ولو اترفض بيبعت الخطأ لـ [[next(err)]] لوحده.

~~~text الناتج (Express 5)
curl localhost:3000/api/tasks/1     {"id":1,"title":"buy milk"} [200]
curl localhost:3000/api/tasks/999   {"error":"Task not found"} [404]
~~~

والسيرفر فاضل شغال.

### نفس الكود على Express 4

~~~text الناتج (Express 4، ويندوز)
curl: (56) Recv failure: Connection was reset
~~~

~~~text الناتج (Express 4، لينكس)
curl: (52) Empty reply from server
~~~

~~~text الناتج في ترمنال السيرفر
file:///.../server.js:14
  if (!task) throw new AppError(404, "Task not found");
                   ^

AppError: Task not found
  status: 404
}

Node.js v24.19.0
~~~

Express 4 مبيبصش على الـ promise خالص، فالرفض مكانش ليه صاحب (unhandled rejection)، و Node من نسخة 15 بيقفل العملية كلها عليه. الطلب ده اتقطع، وكل الطلبات اللي بعده كمان، لأن السيرفر نفسه مات. curl بيوصف نفس الحاجة بكلام مختلف حسب النظام: على لينكس [[(52)]] «الاتصال اتقفل من غير رد»، وعلى ويندوز [[(56)]] «الاتصال اتقطع».

---

## ٢. [[asyncHandler]]: الحل في Express 4

~~~text
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
~~~

نفكه من برة لجوه:

1. [[asyncHandler]] بياخد [[fn]]: الـ handler الـ async بتاعك.
2. بيرجّع **handler جديد** [[(req, res, next) => ...]]، وده اللي Express بيناديه.
3. جواه: [[fn(req, res, next)]] بينادي الـ handler بتاعك فيرجّع promise.
4. [[Promise.resolve(...)]] بيضمن إنه promise حتى لو [[fn]] مش async.
5. [[.catch(next)]] لو الـ promise اترفض، نادي [[next]] بالخطأ، وده بالظبط اللي بيودّيه للـ error handler.

والاستخدام: [[router.get("/wrapped/:id", asyncHandler(async (req, res) => {...}))]].

~~~text الناتج
curl localhost:3000/api/tasks/wrapped/999   {"error":"Task not found"} [404]   (Express 4 و Express 5)
~~~

ده اللي Express 5 بقى بيعمله من جوه، عشان كده مش محتاجه في المشاريع الجديدة.

---

## ٣. [[/later]]: محدش يقدر يمسكه

~~~text
router.get("/later", (req, res) => { setTimeout(() => { throw new Error("boom"); }, 10); });
~~~

- [[setTimeout(دالة, 10)]] «نادي الدالة دي بعد ١٠ millisecond».
> سجّلنا [[/later]] **قبل** [[/:id]] في الـ router، وإلا [[:id]] كان هيطابق كلمة later (درس [[app.get و app.post]]).

- الـ handler نفسه بيخلص **فورًا** ومبيرجّعش promise. بعد ١٠ms الدالة اللي جوه بترمي، وساعتها Express خلاص مبقاش شايف حاجة.

~~~text الناتج (curl، وتحته ترمنال السيرفر، في Express 5 و Express 4)
curl: (56) Recv failure: Connection was reset

router.get("/later", (req, res) => { setTimeout(() => { throw new Error("boom"); }, 10); });
                                                        ^
Error: boom
~~~

السيرفر وقع في النسختين. ده **uncaught exception**: خطأ مرمي برة أي حاجة ماسكاه.

---

## ٤. الحل (solCode)

~~~text
router.get("/later", async (req, res) => {
  await new Promise((r) => setTimeout(r, 10));
  throw new Error("boom");
});
~~~

- [[new Promise((r) => setTimeout(r, 10))]] promise بيخلص بعد ١٠ms: [[r]] (resolve) بيتنادى من الـ setTimeout.
- [[await]] الـ handler بيستنى جوه نفسه، فالـ [[throw]] اللي بعده بيحصل **جوه** الـ promise اللي Express ماسكه.

~~~text الناتج (Express 5)
curl localhost:3000/api/tasks/later   {"error":"Internal server error"} [500]
~~~

والسيرفر لسه شغال. على Express 4 بنفس الشكل ده وقع (محتاج [[asyncHandler]] حواليه)، وده اللي التعليق في الـ solCode بيقوله.

---

## الخلاصة

| الحالة | Express 5 | Express 4 |
|---|---|---|
| [[throw]] أو [[await]] فشل جوه async handler | يوصل للـ error handler | السيرفر يقع |
| نفس الكلام ملفوف بـ [[asyncHandler]] | يوصل (الغلاف زيادة) | يوصل |
| [[throw]] جوه [[setTimeout]] أو callback | السيرفر يقع | السيرفر يقع |
| [[await]] لـ promise فيه الانتظار، وبعدين [[throw]] | يوصل | يقع من غير غلاف |

- Express بيمسك بس الـ promise اللي **راجع** من الـ handler.
- أي callback قديم: حوّله لـ promise وخليه [[await]].
- لو اشتغلت على Express 4: [[asyncHandler]] حوالين كل async route.`,
          lines: [
            "async handler عادي، مفيش try/catch.",
            "لو الـ service رمت خطأ أو الداتابيز وقعت، Express 5 بيمسكه.",
            "و throw بإيدك برضه بيوصل للـ error handler.",
            "رد عادي لو كله تمام.",
            "قفلة.",
            "الحل القديم في Express 4: غلاف بيمسك الـ promise ويبعته لـ next.",
            "خطأ جوه callback بعدين: Express مش شايفه، والعملية كلها ممكن تقع."
          ],
          sol: R`على Express 5: الـ route الـ async اللي بيرمي بيرجّع رد الـ error handler عادي (مثلًا [[{"error":"Task not found"}]] بـ 404) والسيرفر فاضل شغال. Express 5 بيمسك الـ promise المرفوضة ويبعتها لـ [[next(err)]] لوحده.

على Express 4 بنفس الكود: [[curl]] بيطلع [[curl: (52) Empty reply from server]] (على لينكس، وعلى ويندوز [[curl: (56) Recv failure: Connection was reset]])، والسيرفر بيقع ويطبع الـ stack و [[Node.js v22...]] ويخرج بكود 1، لأن الـ rejection محدش مسكها و Node من 15 بيقفل العملية عليها. لفّ الـ handler بـ [[asyncHandler]] والمشكلة تتحل.

و [[/later]] بيوقّع السيرفر في النسختين: الـ throw جوه [[setTimeout]] بيحصل بعد ما الـ handler خلص، فمحدش ماسكه (uncaught exception). الحل تحوّله لـ promise وتعمله await، أو تنادي [[next(err)]] جوه الـ callback.`,
          solCode: R`// Express 5 أو Express 4 مع الغلاف
router.get("/later", async (req, res) => {
  await new Promise((r) => setTimeout(r, 10));
  throw new Error("boom"); // دلوقتي بيوصل للـ error handler
});`
        },
        {
          cmd: "config.js بـ zod",
          title: "الإعدادات من البيئة، متحققة من أول ثانية",
          desc: R`الإعدادات (البورت، ورابط الداتابيز، وسر الـ JWT) بتيجي من متغيرات البيئة، و [[config.js]] واحد بيقراها ويتحقق منها بـ zod عشان السيرفر يقع وهو بيقوم لو حاجة ناقصة.

القيم بتدخل [[process.env]] بـ [[node --env-file=.env server.js]] في Node الحديث أو بمكتبة dotenv (التفاصيل في درس «.env و متغيرات البيئة» في تاب «Node و npm»). بس [[process.env]] كله strings وممكن أي حاجة تبقى ناقصة، فالأحسن تعرف ده من أول ثانية، مش بعد ساعة في نص طلب.`,
          example: R`// config.js
import { z } from "zod";

const Env = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().default(3000),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  CORS_ORIGINS: z.string().transform((s) => s.split(",").map((o) => o.trim())),
});

export const config = Env.parse(process.env);`,
          try: R`امسح [[JWT_SECRET]] من .env وشغّل السيرفر: لازم يقع فورًا برسالة فيها اسم المتغير. وبعدين بدّل كل [[process.env.X]] في المشروع بـ [[config.X]]، ودوّر بـ [[grep -rn "process.env" src]] واتأكد إن مفيش غير config.js.`,
          flag: "script",
          deep: {
            why: R`متغير ناقص على السيرفر بيبان متأخر: أول ما حد يعمل login، [[jwt.sign]] ياخد undefined ويقع. أو الأسوأ: fallback زي [[process.env.SECRET || "change-me"]] فالسيرفر يشتغل بسر معروف للعالم. التحقق وقت التشغيل بيحوّل ده لخطأ واضح قبل أول طلب.`,
            how: R`[[--env-file=.env]] (Node 20.6 وأحدث) بيقرا الملف ويحط القيم في [[process.env]] قبل ما أي كود يشتغل، فمش محتاج dotenv. ولو الملف مش موجود بيطلع خطأ، و [[--env-file-if-exists]] نسخته اللي متقعش. و dotenv بيعمل نفس الحاجة من جوه الكود ([[import "dotenv/config"]]، ولازم يبقى أول import).

zod بيعدّي على [[process.env]] ويطلّع object جديد بالأنواع الصح: PORT رقم مش string، و CORS_ORIGINS array. و [[parse]] بيرمي [[ZodError]] فيه كل المشاكل مرة واحدة، مش أول واحدة بس. والمفاتيح اللي مش في الـ schema بتتشال، فـ [[config]] فيه اللي انت عرّفته بس.

وكل الكود بعد كده بيستورد [[config]] بدل ما يقرا [[process.env]] في ٥٠ مكان، فتعرف كل الإعدادات من ملف واحد، والـ editor بيكمّلك الأسماء.

واعمل [[.env.example]] فيه نفس الأسماء من غير قيم ويدخل Git، عشان أي حد (أو انت على سيرفر جديد) يعرف محتاج إيه.`,
            when: "أي تطبيق هيتشغّل في أكتر من بيئة. نفس الفكرة في Next.js (مكتبة t3-env) وفي FastAPI (pydantic-settings).",
            mistakes: R`في مشروع حقيقي كان فيه endpoints للـ debug (منها واحد بيعيد تعيين باسوردات كل اليوزرز) محمية بـ [[if (process.env.NODE_ENV !== "production")]]. لو السيرفر اتشغّل من غير NODE_ENV (وده بيحصل كتير)، الـ endpoints دي تبقى مفتوحة للعالم. خليها بـ allow-list ([[=== "development"]]) مش deny-list، والأحسن متتسجّلش في كود الإنتاج أصلًا. وفي نفس المشروع سر الـ JWT كان ليه fallback ثابت لو NODE_ENV مش production: نفس المشكلة. وتفتكر إن [[.env]] بيتقري لوحده: Node مبيقراهوش من غير [[--env-file]] أو dotenv.`
          },
          teach: R`## ملف واحد يقرا الإعدادات ويرفض الناقص

[[config.js]] بيوصف الإعدادات اللي التطبيق محتاجها (schema)، ويقارن بيها [[process.env]] أول ما السيرفر يقوم. لو حاجة ناقصة أو غلط، السيرفر يقع فورًا برسالة فيها اسمها. لو كله تمام، بيصدّر object نضيف بالأنواع الصح. اتشغّل على ويندوز 11 بـ Node 24.19 و zod 4.6، وعملنا ملف [[show.js]] صغير بيعمل [[import { config } from "./config.js"]] ويطبعه.

---

## ١. [[import { z } from "zod";]]

zod مكتبة بتوصف «شكل» البيانات وتتحقق منه. [[z]] هو الـ object اللي فيه كل الأدوات ([[z.object]] و [[z.string]] وغيرهم). بتتسطّب بـ [[npm i zod]].

## ٢. [[const Env = z.object({ ... })]]

[[z.object]] بيقول «متوقع object فيه المفاتيح دي، وكل مفتاح بالقواعد دي». ده **الـ schema**. نمشي على المفاتيح:

### [[NODE_ENV: z.enum(["development", "test", "production"]).default("development")]]

- [[z.enum([...])]] لازم القيمة تبقى **واحدة من دول بالظبط**.
- [[.default("development")]] لو المتغير مش موجود، خد دي بدل ما ترفض.

### [[PORT: z.coerce.number().int().default(3000)]]

- [[process.env]] كل قيمه **نصوص**: [[PORT=4000]] بيوصل [["4000"]].
- [[z.coerce.number()]] بيحوّل النص لرقم الأول ([[Number("4000")]])، وبعدين يتأكد إنه رقم.
- [[.int()]] رقم صحيح من غير كسور.
- [[.default(3000)]] لو مش موجود.

### [[DATABASE_URL: z.url()]]

لازم يبقى عنوان URL سليم، زي [[postgresql://app:pw@localhost:5432/tasks]]. ([[z.url()]] شكل zod 4، وفي zod 3 كانت [[z.string().url()]].)

### [[JWT_SECRET: z.string().min(32)]]

نص طوله ٣٢ حرف على الأقل. سر قصير زي [[abc]] سهل يتخمّن، فبيترفض من أول يوم.

### [[CORS_ORIGINS: z.string().transform((s) => s.split(",").map((o) => o.trim()))]]

من جوه لبرة:

1. [[z.string()]] لازم نص.
2. [[.transform(دالة)]] بعد التحقق، غيّر القيمة بالدالة دي.
3. [[s.split(",")]] قسّم النص عند كل فاصلة: array.
4. [[.map((o) => o.trim())]] شيل المسافات من كل عنصر.

فـ [["http://localhost:5173, https://app.example.com"]] بتبقى array فيها عنوانين نضاف.

## ٣. [[export const config = Env.parse(process.env);]]

- [[Env.parse(...)]] بيتحقق من [[process.env]] كله مرة واحدة. لو فيه مشاكل، بيرمي [[ZodError]] فيه **كل** المشاكل مش أول واحدة. لو تمام، بيرجّع object جديد بالقيم المتحولة.
- المفاتيح اللي مش في الـ schema (و [[process.env]] فيه عشرات زي [[PATH]] و [[USERNAME]]) بتتشال.
- [[export const config]] أي ملف تاني يعمل [[import { config }]].

ولأن السطر ده في أول مستوى في الملف، بيتنفذ **أول ما حد يستورد config.js**، يعني وقت تشغيل السيرفر قبل [[app.listen]].

---

## ٤. نجرّب: ملف .env سليم

~~~text .env
DATABASE_URL=postgresql://app:pw@localhost:5432/tasks
JWT_SECRET=0123456789abcdef0123456789abcdef
CORS_ORIGINS=http://localhost:5173, https://app.example.com
PORT=4000
~~~

~~~bash
node --env-file=.env show.js
~~~

[[--env-file=.env]] بيقول لـ Node «اقرا الملف ده وحط كل سطر [[KEY=value]] في [[process.env]] قبل ما تشغّل الكود». نفس الأمر بيشتغل في PowerShell و CMD.

~~~text الناتج
{
  NODE_ENV: 'development',
  PORT: 4000,
  DATABASE_URL: 'postgresql://app:pw@localhost:5432/tasks',
  JWT_SECRET: '0123456789abcdef0123456789abcdef',
  CORS_ORIGINS: [ 'http://localhost:5173', 'https://app.example.com' ]
}
~~~

- [[NODE_ENV]] مش في الملف، فأخد الـ default.
- [[PORT: 4000]] **من غير** علامات تنصيص: بقى number.
- [[CORS_ORIGINS]] بقى array والمسافة اللي بعد الفاصلة اتشالت.

ولو شلنا [[PORT]] من الملف خالص: [[3000 number]].

---

## ٥. نجرّب: ملف فيه غلطتين

~~~text bad.env
DATABASE_URL=not a url
CORS_ORIGINS=x
~~~

~~~text الناتج
file:///.../config.js:12
export const config = Env.parse(process.env);
                          ^

ZodError: [
  {
    "code": "invalid_format",
    "format": "url",
    "path": [
      "DATABASE_URL"
    ],
    "message": "Invalid URL"
  },
  {
    "expected": "string",
    "code": "invalid_type",
    "path": [
      "JWT_SECRET"
    ],
    "message": "Invalid input: expected string, received undefined"
  }
]

Node.js v24.19.0
~~~

نقرا كل مشكلة:

| الخانة | معناها |
|---|---|
| [[path]] | اسم المتغير اللي فيه المشكلة |
| [[code]] | نوعها: [[invalid_format]] الشكل غلط، [[invalid_type]] النوع غلط |
| [[message]] | الشرح: [[received undefined]] يعني مش موجود أصلًا |

المشكلتين طلعوا مع بعض، فبتصلّح مرة واحدة. والسيرفر مقامش: ولا بورت اتفتح.

### سر قصير و [[NODE_ENV]] غلط

~~~text short.env
JWT_SECRET=abc
NODE_ENV=prod
...
~~~

~~~text الناتج (الرسايل بس)
"path": [ "NODE_ENV" ]    "message": "Invalid option: expected one of \"development\"|\"test\"|\"production\""
"path": [ "JWT_SECRET" ]  "message": "Too small: expected string to have >=32 characters"
~~~

[[prod]] مش [[production]]، فالـ enum رفضها. وده بالظبط النوع اللي بيعدّي من غير تحقق ويخلّي كود «لو production» ميشتغلش.

---

## ٦. حاجات اتجرّبت وتفرق معاك

| الحالة | النتيجة |
|---|---|
| [[PORT=abc]] | [[Invalid input: expected number, received NaN]] |
| [[PORT=]] (فاضي) | [[0]]! [[Number("")]] بيطلع صفر، والـ default مبيشتغلش لأن القيمة مش undefined |
| [[PORT=5000]] في الترمنال و [[PORT=4000]] في .env | [[5000]]: [[--env-file]] مبيغطّيش على متغير موجود فعلًا |
| [[--env-file=nope.env]] والملف مش موجود | [[node.exe: nope.env: not found]] والبرنامج ميقومش |

---

## الخلاصة

| الأداة | بتعمل إيه |
|---|---|
| [[z.enum([...]).default(x)]] | قيمة من قايمة، أو x |
| [[z.coerce.number()]] | نص لرقم |
| [[z.url()]] | لازم URL سليم |
| [[z.string().min(32)]] | نص ٣٢ حرف أو أكتر |
| [[.transform(fn)]] | غيّر القيمة بعد التحقق |
| [[Env.parse(process.env)]] | اتحقق دلوقتي، وارمي كل المشاكل مرة واحدة |

- [[process.env]] كله نصوص، وأي حاجة فيه ممكن تبقى ناقصة.
- باقي المشروع يستورد [[config]] ومحدش يقرا [[process.env]] غير config.js.
- السيرفر يقع وهو بيقوم أحسن ما يقع في نص طلب.`,
          lines: [
            "zod: مكتبة بتوصف شكل البيانات وتتحقق منها.",
            "شكل البيئة اللي التطبيق محتاجها.",
            "واحدة من ٣ قيم بس، والافتراضي development.",
            "[[coerce]] بيحوّل الـ string لرقم، والافتراضي 3000.",
            "لازم يبقى URL سليم.",
            "سر الـ JWT لازم ٣٢ حرف على الأقل، فالسر الضعيف يتمسك بدري.",
            "قايمة origins مفصولة بفاصلة تتحول لـ array.",
            "قفلة.",
            "اتحقق دلوقتي، ولو فيه غلط ارمي خطأ فيه كل الحقول الناقصة. وصدّر النتيجة متحولة ونضيفة."
          ],
          sol: R`من غير [[JWT_SECRET]] السيرفر بيقع فورًا قبل ما يسمع على أي بورت، و الرسالة فيها [[ZodError]] وجواها الـ path بتاعه [[JWT_SECRET]] و [[Invalid input: expected string, received undefined]]. ولو حطيته قصير ([[JWT_SECRET=abc]]) الرسالة بتبقى [[Too small: expected string to have >=32 characters]]. ده الهدف: تعرف المشكلة وانت بتقوم، مش أول ما يوزر يحاول يعمل login.

بعد التبديل، [[grep -rn "process.env" src]] المفروض يطلّع سطر واحد بس: [[Env.parse(process.env)]] في config.js. وكمان هتلاحظ إن [[config.PORT]] بقى number مش string، و [[config.CORS_ORIGINS]] array جاهزة.

لو السيرفر قام عادي والمتغير ممسوح، يبقى فيه نسخة تانية منه في الترمنال نفسه ([[echo $JWT_SECRET]]) أو [[.env]] تاني بيتقري. ولو وقع بسبب [[DATABASE_URL]] كمان، ده طبيعي: حطه في .env.`
        }
      ]
    },
    {
      t: "Validation: متصدّقش أي حاجة جاية",
      l: 2,
      n: "كل body و params و query بيتحقق منهم قبل ما يوصلوا للـ service",
      items: [
        {
          cmd: "validate(schema)",
          title: "middleware واحد يتحقق من أي طلب بـ zod",
          desc: R`بتوصف شكل البيانات بـ zod schema، و middleware واحد بيتحقق: لو غلط يرد 400 بكل المشاكل، ولو صح يحط النسخة النضيفة في [[req.body]].

النسخة النضيفة متحولة (trim، وتاريخ بقى Date) ومن غير حقول زيادة: [[z.object]] بيشيل أي مفتاح مش متعرّف، فحد يبعت [[role: "ADMIN"]] مبيوصلش للـ service.`,
          example: R`import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  dueDate: z.coerce.date().optional(),
  priority: z.enum(["low", "normal", "high"]).default("normal"),
});

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: "Invalid input", issues: z.flattenError(result.error).fieldErrors });
  req.body = result.data;
  next();
};

router.post("/", validate(createTaskSchema), tasks.create);`,
          try: R`ابعت [[{"title":"  ","priority":"urgent","role":"ADMIN"}]] وشوف الأخطاء. وبعدين ابعت body صح فيه [[role]] واطبع [[req.body]] في الـ controller: الحقل مش هيبقى موجود. واعمل نسخة من الـ middleware لـ [[req.params]].`,
          flag: "script",
          deep: {
            why: R`الواجهة مش الوحيدة اللي بتكلّم الـ API: أي حد بـ curl أو Postman يبعت أي حاجة. التحقق في الواجهة للراحة، والتحقق في السيرفر هو الحماية. ومن غيره: عنوان بطول مليون حرف، أو object بدل string يوصل Mongo، أو تاريخ [["yesterday"]] يوقع الداتابيز بـ 500.`,
            how: R`zod schema بتعمل حاجتين مع بعض: تتحقق (النوع والطول والقيم المسموحة) وتحوّل (trim، و coerce لرقم أو تاريخ، و default). و [[safeParse]] بيرجّع [[{ success: true, data }]] أو [[{ success: false, error }]]، و [[error.issues]] فيها كل مشكلة بالحقل ([[path]]) والرسالة والكود. و [[z.flattenError]] بيحوّلها لـ object: اسم الحقل وقايمة رسايله.

[[z.object]] افتراضيًا بيشيل أي مفتاح مش في الـ schema (strip). [[z.strictObject]] بيرفضه بخطأ، و [[z.looseObject]] بيعدّيه. للـ body، الـ strip هو اللي بيحميك من mass assignment.

نفس الفكرة للـ query بس خلي بالك: [[req.query]] في Express 5 getter، فمتقدرش تكتب [[req.query = result.data]]. حط النتيجة في [[req.validatedQuery]] أو [[res.locals]]. وللقيم المنطقية في الـ query استخدم [[z.stringbool()]] عشان [["false"]] تبقى false فعلًا.

والـ schema ممكن تتشارك مع الواجهة في monorepo، فالفورم في React والـ API بيتحققوا بنفس القواعد. ولو الـ backend TypeScript، [[z.infer<typeof createTaskSchema>]] بيدّيك النوع من غير ما تكتبه مرتين.`,
            when: "كل endpoint بياخد input: body و params و query، من غير استثناء، حتى endpoints الأدمن.",
            mistakes: R`في مشروع حقيقي على Zod 4 كانت الرسايل مكتوبة بـ [[{ required_error: "Email is required" }]]، والـ option دي اتشالت في Zod 4 واتبدلت بـ [[error]]، فالرسالة المخصصة مبتظهرش. وفي نفس المشروع رد الـ validation كان بيرجّع قيمة كل حقل غلط، فلو الباسورد مش مطابق للشروط، الباسورد نفسه بيرجع في الرد وممكن يتسجل في لوجات. وتتحقق من [[req.body]] وتنسى [[req.params]] و [[req.query]].`
          },
          teach: R`## schema بتوصف الطلب، و middleware بيتحقق

المثال ٣ أجزاء: [[createTaskSchema]] بتقول «الـ body بتاع إضافة مهمة شكله كده»، و [[validate]] دالة بتعمل middleware من أي schema، والسطر الأخير بيركّبهم قبل الـ controller. اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و zod 4.6، والـ controller في التجربة بيطبع [[req.body]] اللي وصله ويرجّعه.

---

## ١. الـ schema

~~~text
export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  dueDate: z.coerce.date().optional(),
  priority: z.enum(["low", "normal", "high"]).default("normal"),
});
~~~

كل حقل سلسلة قواعد بتتنفذ **بالترتيب من الشمال لليمين**:

### [[title: z.string().trim().min(1).max(200)]]

1. [[z.string()]] لازم نص.
2. [[.trim()]] شيل المسافات من الأول والآخر (ده **تحويل** مش فحص).
3. [[.min(1)]] بعد الـ trim، حرف واحد على الأقل. عشان كده [["  "]] بيترفض: بقى [[""]] قبل ما يتفحص.
4. [[.max(200)]] ٢٠٠ حرف بالكتير.

### [[dueDate: z.coerce.date().optional()]]

- [[z.coerce.date()]] بيعمل [[new Date(القيمة)]] الأول، وبعدين يتأكد إن التاريخ سليم. JSON مفيهوش نوع تاريخ، فالتاريخ بييجي نص زي [["2026-12-31"]].
- [[.optional()]] مش لازم يتبعت.

### [[priority: z.enum([...]).default("normal")]]

واحدة من ٣ قيم، ولو مش مبعوتة خالص تبقى [["normal"]].

---

## ٢. [[validate]]: دالة بتعمل middleware

~~~text
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: "Invalid input", issues: z.flattenError(result.error).fieldErrors });
  req.body = result.data;
  next();
};
~~~

### [[(schema) => (req, res, next) => {...}]]

سهمين: [[validate]] بتاخد schema وبترجّع **middleware**. فـ [[validate(createTaskSchema)]] middleware جاهز للإضافة، و [[validate(updateTaskSchema)]] تاني للتعديل، من نفس الكود.

### [[schema.safeParse(req.body)]]

- [[parse]] (اللي في درس config) بيرمي خطأ. [[safeParse]] **مبيرميش**، بيرجّع object:

~~~text
{ success: true,  data: {...النسخة النضيفة...} }
{ success: false, error: ZodError }
~~~

مناسب هنا لأننا عايزين نرد 400 بنفسنا مش نوقع.

### [[z.flattenError(result.error).fieldErrors]]

[[result.error.issues]] قايمة طويلة (زي اللي شفناها في درس config). [[z.flattenError]] بيحوّلها لشكل أبسط: [[fieldErrors]] object، كل حقل وقايمة رسايله. ده اللي الواجهة تحطه تحت كل input في الفورم.

### [[req.body = result.data;]]

بنبدّل الـ body الأصلي بالنسخة اللي zod طلّعها: متعملها trim، والتاريخ بقى Date، والـ default اتحط، والحقول الزيادة اتشالت.

### [[next();]]

كمّل للـ controller.

---

## ٣. [[router.post("/", validate(createTaskSchema), tasks.create);]]

الـ middleware بين المسار والـ controller، فالـ controller مش بيشتغل غير لو البيانات سليمة.

---

## ٤. نجرّب

### الـ body الغلط من الـ try

~~~bash
curl -s localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"  ","priority":"urgent","role":"ADMIN"}'
~~~

~~~text الناتج [400]
{"error":"Invalid input","issues":{"title":["Too small: expected string to have >=1 characters"],"priority":["Invalid option: expected one of \"low\"|\"normal\"|\"high\""]}}
~~~

- غلطتين، والاتنين رجعوا مع بعض.
- [[role]] مش في الأخطاء: [[z.object]] مبيعترضش على حقول زيادة، بيشيلها بس.
- [[\"]] في الناتج: علامة تنصيص جوه نص JSON بتتكتب كده.

### الـ body الصح ومعاه [[role]]

~~~text الناتج [201]
{"title":"hi","priority":"normal"}
~~~

~~~text الناتج في ترمنال السيرفر
controller got: { title: 'hi', priority: 'normal' }
~~~

اتبعت [[" hi "]] و [[role: "ADMIN"]]. الـ controller استلم [["hi"]] من غير مسافات، و [[priority]] بالـ default، و [[role]] **مش موجود**. ده الحماية من mass assignment.

### التاريخ

~~~text الناتج
{"title":"x","dueDate":"2026-12-31"}   ->  {"title":"x","dueDate":"2026-12-31T00:00:00.000Z","priority":"normal"} [201]
{"title":"x","dueDate":"yesterday"}    ->  {"error":"Invalid input","issues":{"dueDate":["Invalid input: expected date, received Date"]}} [400]
~~~

- التاريخ السليم بقى Date، ولما اترجع JSON اتكتب بصيغة ISO بتوقيت UTC ([[Z]] في الآخر).
- [["yesterday"]] [[new Date("yesterday")]] بيطلع «Invalid Date»، ودا لسه object من نوع Date، عشان كده الرسالة غريبة شوية ([[received Date]]). المهم إنه اترفض بـ 400 مش 500.

### حقل ناقص، ومفيش body خالص

~~~text الناتج
{"priority":"high"}     ->  {"error":"Invalid input","issues":{"title":["Invalid input: expected string, received undefined"]}} [400]
POST من غير body        ->  {"error":"Invalid input","issues":{}} [400]
~~~

التانية الـ [[issues]] فاضية! لأن [[req.body]] نفسه [[undefined]]، فالغلطة على الـ object كله مش على حقل معين، و [[fieldErrors]] فيها أخطاء الحقول بس. الغلطة دي موجودة في [[formErrors]]: جرّبناها، [[z.flattenError]] رجّع [[{"formErrors":["Invalid input: expected object, received undefined"],"fieldErrors":{}}]]. لو عايز الرد يبقى مفهوم في الحالة دي، رجّع الاتنين.

---

## ٥. نسخة الـ params (solCode)

~~~text
const IdParams = z.object({ id: z.coerce.number().int().positive() });
router.get("/:id", validateParams(IdParams), tasks.getOne);
~~~

[[validateParams]] نفس [[validate]] بالظبط، بس بيقرا ويكتب [[req.params]]. و [[positive()]] أكبر من صفر.

~~~text الناتج
/api/tasks/abc   {"error":"Invalid params","issues":{"id":["Invalid input: expected number, received NaN"]}} [400]
/api/tasks/5     {"id":5,"type":"number"} [200]
/api/tasks/0     {"error":"Invalid params","issues":{"id":["Too small: expected number to be >0"]}} [400]
~~~

- الـ controller شاف [[id]] **رقم** ([[typeof]] = number) مش [["5"]].
- [[0]] اترفض، عكس فحص [[Number.isInteger]] في درس [[req.params]] اللي كان بيعدّيه.
- [[req.params = result.data]] اشتغل في Express 5. لكن [[req.query]] مينفعش يتبدّل كده (getter)، فنسخة الـ query تحط النتيجة في مكان تاني زي [[res.locals]].

---

## الخلاصة

| الأداة | بتعمل إيه |
|---|---|
| [[.trim()]] / [[z.coerce.*]] / [[.default()]] | بتحوّل القيمة |
| [[.min()]] / [[.max()]] / [[z.enum()]] / [[.positive()]] | بتفحص |
| [[z.object]] | بيشيل أي حقل مش متعرّف |
| [[safeParse]] | نتيجة من غير ما يرمي |
| [[z.flattenError(e).fieldErrors]] | الأخطاء لكل حقل |

- [[validate(schema)]] middleware واحد لكل الـ endpoints.
- بعد التحقق، بدّل [[req.body]] بـ [[result.data]]، وإلا الحقول الزيادة لسه موجودة.
- التحويل بيحصل بالترتيب: [[trim]] قبل [[min]].`,
          lines: [
            "zod.",
            "schema لإضافة مهمة: ده «العقد» بتاع الـ endpoint.",
            "نص، يتشال منه المسافات، ومش فاضي، وأقصاه ٢٠٠ حرف.",
            "تاريخ اختياري، و [[coerce]] بيحوّل النص لـ Date.",
            "واحدة من ٣ قيم، ولو مش مبعوتة تبقى normal.",
            "قفلة.",
            "دالة بتاخد schema وترجّع middleware.",
            "[[safeParse]] مبيرميش خطأ، بيرجّع نتيجة فيها success.",
            "غلط؟ 400 ومعاه الأخطاء لكل حقل.",
            "صح؟ بدّل الـ body بالنسخة المتحققة.",
            "كمّل.",
            "قفلة.",
            "ركّبه قبل الـ controller، فالـ controller بيستلم بيانات مضمونة."
          ],
          sol: R`الـ body الغلط بيرجّع [[400]] وفيه خطأين بس: [[title]] ([[Too small: expected string to have >=1 characters]]، لأن [[trim()]] بيشتغل قبل [[min(1)]] فالمسافات بقت string فاضي) و [[priority]] ([[Invalid option: expected one of "low"|"normal"|"high"]]). و [[role]] مش في الأخطاء خالص: zod مبيعترضش على حقول زيادة، بيشيلها بس.

والـ body الصح [[{"title":" hi ","role":"ADMIN"}]] بيوصل للـ controller كده: [[{ title: "hi", priority: "normal" }]]. اتعمله trim، واتحط الـ default، و [[role]] اتشال لأن [[z.object]] بيرجّع الحقول اللي في الـ schema بس. ده اللي بيحميك من mass assignment.

لو لقيت [[role]] لسه موجود، يبقى نسيت [[req.body = result.data]] وبتستخدم الـ body الأصلي. ونسخة الـ params تحت: [[/api/tasks/abc]] بيرجّع 400 و [[Invalid input: expected number, received NaN]]، و [[/api/tasks/5]] بيوصل فيه [[req.params.id]] رقم مش string.`,
          solCode: R`export const validateParams = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.params);
  if (!result.success) return res.status(400).json({ error: "Invalid params", issues: z.flattenError(result.error).fieldErrors });
  req.params = result.data;
  next();
};

const IdParams = z.object({ id: z.coerce.number().int().positive() });
router.get("/:id", validateParams(IdParams), tasks.getOne); // req.params.id رقم`
        },
        {
          cmd: "express-validator",
          title: "طريقة التحقق التانية اللي هتلاقيها في مشاريع كتير",
          desc: R`[[express-validator]] بيتحقق بسلسلة دوال على كل حقل زي [[body("email").isEmail()]]، وبعدين [[validationResult(req)]] بيجمع الأخطاء.

أقدم من zod ومنتشر جدًا في مشاريع Express. الفرق: zod بيوصف شكل البيانات في schema تستخدمها في أي مكان (الواجهة، والـ config، والأنواع)، و express-validator مربوط بـ Express وبالطلب.`,
          example: R`import { body, param, validationResult, matchedData } from "express-validator";

const rules = [
  param("id").isInt({ min: 1 }).toInt(),
  body("title").optional().isString().trim().isLength({ min: 1, max: 200 }),
  body("done").optional().isBoolean().toBoolean(),
];

router.patch("/:id", rules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const data = matchedData(req);
  res.json(data);
});`,
          try: R`نفّذ نفس قواعد [[createTaskSchema]] بـ express-validator وقارن طول الكود ووضوح الأخطاء. وجرّب تشيل سطر [[validationResult]]: الـ route هيكمّل عادي بالبيانات الغلط.`,
          flag: "script",
          deep: {
            why: "هتلاقيه في مشاريع كتير (في مشاريع حقيقية كان متسطّب جنب zod في نفس المشروع). لازم تقراه وتفهمه حتى لو هتختار zod في مشروعك الجديد.",
            how: R`كل [[body("x")]] بيرجّع middleware بيشتغل على [[req.body.x]] وبيسجّل النتيجة جوه الطلب نفسه، بس مش بيوقف الطلب. التوقف مسؤوليتك: [[validationResult(req)]] بيقرا اللي اتسجّل، وانت اللي بترد 400. عشان كده الغلطة المشهورة إن حد يكتب القواعد وينسى الخطوة دي، فالقواعد ملهاش أي تأثير.

الـ sanitizers زي [[trim]] و [[toInt]] و [[toBoolean]] بتعدّل القيمة في الطلب. و [[matchedData(req)]] بيرجّع بس الحقول اللي كان عليها قواعد، ودي الطريقة الصح تاخد البيانات بدل [[req.body]] كله.

وفيه [[checkSchema]] لو عايز تكتب القواعد كـ object بدل سلسلة. والفرق في الفلسفة: express-validator بيتحقق من «الطلب»، و zod بيتحقق من «البيانات» في أي مكان.`,
            when: "مشروع قايم بيستخدمه: كمّل بيه ومتخلطش. مشروع جديد: zod غالبًا أحسن لأنك هتستخدمه في الـ config والواجهة والأنواع كمان.",
            mistakes: R`تنسى [[validationResult]]. وتستخدم [[req.body]] بعد التحقق بدل [[matchedData]] فالحقول الزيادة تعدّي. وتخلط المكتبتين في نفس المشروع، فكل endpoint شكل أخطائه مختلف والواجهة تحتار.`
          },
          teach: R`## قواعد على كل حقل، وانت اللي بتوقف الطلب

المثال route تعديل مهمة ([[PATCH /api/tasks/:id]]): array فيها ٣ قواعد (للـ id وللعنوان ولـ done)، وبعدين الـ handler بيسأل «فيه أخطاء؟» ويرد. اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و express-validator 7.3، والطلبات بـ curl من Git Bash، والـ router متركّب على [[/api/tasks]].

---

## ١. [[import { body, param, validationResult, matchedData } from "express-validator";]]

| الاسم | بيعمل إيه |
|---|---|
| [[body("x")]] | قاعدة على [[req.body.x]] |
| [[param("x")]] | قاعدة على [[req.params.x]] (وفيه [[query("x")]] للـ query) |
| [[validationResult(req)]] | يجمع الأخطاء اللي القواعد سجّلتها على الطلب |
| [[matchedData(req)]] | يرجّع الحقول اللي عليها قواعد وعدّت بس |

بتتسطّب بـ [[npm i express-validator]].

---

## ٢. القواعد

~~~text
const rules = [
  param("id").isInt({ min: 1 }).toInt(),
  body("title").optional().isString().trim().isLength({ min: 1, max: 200 }),
  body("done").optional().isBoolean().toBoolean(),
];
~~~

كل سطر **middleware**، والـ array كلها بتتحط في الـ route، و Express بيشغّلهم ورا بعض. والسلسلة بتتنفذ بالترتيب، وفيها نوعين: **validators** بتفحص (أسماءها بتبدأ بـ [[is]])، و **sanitizers** بتعدّل القيمة ([[trim]] و [[to...]]).

### [[param("id").isInt({ min: 1 }).toInt()]]

- [[isInt({ min: 1 })]] رقم صحيح ١ أو أكتر.
- [[toInt()]] حوّل [["5"]] لـ [[5]].

### [[body("title").optional().isString().trim().isLength({ min: 1, max: 200 })]]

- [[optional()]] لو الحقل مش مبعوت خالص، اتجاهل باقي السلسلة. ده PATCH، فاليوزر ممكن يعدّل [[done]] بس.
- [[isString()]] لازم نص.
- [[trim()]] شيل المسافات.
- [[isLength({ min: 1, max: 200 })]] الطول بعد الـ trim من ١ لـ ٢٠٠.

### [[body("done").optional().isBoolean().toBoolean()]]

- [[isBoolean()]] بيقبل [[true]] و [[false]] وكمان النصوص [["true"]] و [["false"]] و [["1"]] و [["0"]] (جرّبناها: [["1"]] بقت [[true]] و [["0"]] بقت [[false]]، و [["yes"]] اترفضت).
- [[toBoolean()]] بيحوّلها لـ boolean حقيقي.

---

## ٣. الـ handler

### [[router.patch("/:id", rules, (req, res) => {...})]]

الـ array بين المسار والـ handler. القواعد بتشتغل الأول، وكل واحدة بتنادي [[next()]] **دايمًا**، حتى لو الحقل غلط: بتسجّل الغلطة على الطلب وتكمّل.

### [[const errors = validationResult(req);]]

اقرا الأخطاء اللي اتسجّلت.

### [[if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });]]

- [[isEmpty()]] [[true]] لو مفيش أخطاء.
- [[errors.array()]] الأخطاء كـ array.
- ده **السطر الوحيد** اللي بيوقف الطلب. من غيره القواعد ملهاش لازمة.

### [[const data = matchedData(req); res.json(data);]]

الحقول اللي عليها قواعد، بعد التحويل. رجّعناها عشان نشوفها.

---

## ٤. نجرّب

### طلب سليم ومعاه حقل زيادة

~~~bash
curl -s -X PATCH localhost:3000/api/tasks/5 -H "Content-Type: application/json" -d '{"title":" new ","done":"true","role":"ADMIN"}'
~~~

~~~text الناتج [200]
{"id":5,"title":"new","done":true}
~~~

- [[id]] بقى رقم (من [[toInt]])، و [[title]] اتعمله trim، و [[done]] بقى [[true]] boolean مع إنه اتبعت نص.
- [[role]] مش موجود: [[matchedData]] بيرجّع الحقول اللي ليها قواعد بس.

### كل حاجة غلط

~~~bash
curl -s -X PATCH localhost:3000/api/tasks/abc -H "Content-Type: application/json" -d '{"title":"","done":"maybe"}'
~~~

~~~text الناتج [400]
{"errors":[
  {"type":"field","value":"abc","msg":"Invalid value","path":"id","location":"params"},
  {"type":"field","value":"","msg":"Invalid value","path":"title","location":"body"},
  {"type":"field","value":"maybe","msg":"Invalid value","path":"done","location":"body"}
]}
~~~

(قسّمناه على سطور عشان يتقري، الرد الحقيقي سطر واحد.)

| الخانة | معناها |
|---|---|
| [[type]] | [[field]]: الغلطة على حقل |
| [[value]] | القيمة اللي اتبعتت. خلي بالك: بترجع زي ما هي، فلو الحقل باسورد هيرجع في الرد |
| [[msg]] | [[Invalid value]] لكل حاجة، إلا لو كتبت [[.withMessage("...")]] |
| [[path]] | اسم الحقل |
| [[location]] | جه منين: [[params]] أو [[body]] أو [[query]] |

### body فاضي

~~~text الناتج [200]
{"id":5}
~~~

[[title]] و [[done]] الاتنين [[optional()]]، فعدّوا، و [[matchedData]] مفيهوش غير الـ id.

---

## ٥. الـ solCode: قواعد الإضافة

~~~text
body("title").isString().trim().isLength({ min: 1, max: 200 }).withMessage("title is required"),
body("dueDate").optional().isISO8601().toDate(),
body("priority").optional().isIn(["low", "normal", "high"]).withMessage("bad priority"),
~~~

- [[title]] من غير [[optional()]]: لازم.
- [[isISO8601()]] تاريخ بصيغة ISO زي [[2026-12-31]]، و [[toDate()]] يحوّله Date.
- [[isIn([...])]] واحدة من القايمة.
- [[withMessage]] بيغيّر [[msg]] للقاعدة اللي قبله.
- [[{ priority: "normal", ...matchedData(req) }]] express-validator مفيهوش default زي zod، فبنحطه بإيدنا: [[...]] بيفرد الحقول، واللي اتبعت بيغطي على [["normal"]].

~~~text الناتج
{"title":"  ","priority":"urgent","role":"ADMIN"}
  -> {"errors":[{"type":"field","value":"","msg":"title is required","path":"title","location":"body"},
               {"type":"field","value":"urgent","msg":"bad priority","path":"priority","location":"body"}]} [400]

{"title":" hi ","dueDate":"2026-12-31","role":"ADMIN"}
  -> {"priority":"normal","title":"hi","dueDate":"2026-12-31T00:00:00.000Z"} [201]
~~~

نفس القواعد من غير [[withMessage]] رجّعت [["msg":"Invalid value"]] للاتنين.

### لو شلت [[validationResult]]

route بنفس القواعد بيرد على طول بـ [[req.body]] و [[matchedData(req)]]:

~~~text الناتج [200]
{"body":{"title":"","priority":"urgent","role":"ADMIN"},"matched":{}}
~~~

- الطلب الغلط **عدّى بـ 200**.
- [[req.body]] فيه كل حاجة، حتى [[role]]، و [[title]] بقى [[""]] لأن [[trim]] عدّل عليه.
- [[matchedData]] فاضي لأنه بيرجّع الحقول **الصح** بس، وكلها كانت غلط.

---

## الخلاصة: express-validator قصاد zod

| | express-validator | zod |
|---|---|---|
| القواعد | سلسلة middleware على الطلب | schema لوحدها، تتستخدم في أي مكان |
| الغلط بيوقف الطلب؟ | لأ، لازم [[validationResult]] | الـ [[validate]] بتاعك بيرد 400 |
| الحقول الزيادة | [[matchedData]] بيشيلها، [[req.body]] لأ | [[result.data]] من غيرها |
| الـ default | بإيدك | [[.default()]] |
| الرسالة الافتراضية | [[Invalid value]] | وصف للغلطة |

- القواعد بتسجّل بس، و [[validationResult]] هو اللي بيوقف.
- خد البيانات من [[matchedData(req)]] مش [[req.body]].`,
          lines: [
            "الدوال: قواعد للـ body وللـ params، وجمع الأخطاء، واستخراج الحقول المتحققة بس.",
            "array من القواعد، وكل واحدة middleware.",
            "الـ id رقم صحيح أكبر من صفر، وحوّله لرقم.",
            "العنوان اختياري، ولو موجود نص طوله من ١ لـ ٢٠٠ بعد trim.",
            "done اختياري ولازم boolean، ويتحول.",
            "قفلة.",
            "القواعد قبل الـ handler.",
            "اجمع أي أخطاء حصلت.",
            "لو فيه، 400 بالقايمة.",
            "[[matchedData]] بيرجّع الحقول اللي عليها قواعد بس، فحقل زيادة زي role بيتشال.",
            "رجّعها للتجربة.",
            "قفلة."
          ],
          sol: R`نفس القواعد بـ express-validator: [[body("title").isString().trim().isLength({ min: 1, max: 200 })]] و [[body("dueDate").optional().isISO8601().toDate()]] و [[body("priority").optional().isIn(["low", "normal", "high"])]]. نفس الـ body الغلط بيرجّع 400 و [[errors]] فيها عنصرين، كل واحد شكله [[{"type":"field","value":"urgent","msg":"Invalid value","path":"priority","location":"body"}]]. الرسالة الافتراضية [[Invalid value]] لكل حاجة، فلو عايز رسايل واضحة لازم [[.withMessage()]] على كل قاعدة. والـ default بتاع priority مش موجود لوحده: محتاج [[.default("normal")]].

من غير [[validationResult]]: الطلب الغلط بيعدّي بـ 200 والـ handler بيشوف [[{"title":"","priority":"urgent","role":"ADMIN"}]]. القواعد بتسجّل الأخطاء بس ومبتوقفش حاجة، ودي أشهر غلطة مع المكتبة دي. و [[matchedData(req)]] هو اللي بيشيل [[role]]؛ [[req.body]] نفسه لسه فيه.

المقارنة: zod schema واحد بيدّيك التحقق والتحويل والـ type، وتقدر تستخدمه في الواجهة كمان. express-validator أطول، بس مبني على validator.js وكويس لو المشروع قديم ومستخدمه.`,
          solCode: R`const createRules = [
  body("title").isString().trim().isLength({ min: 1, max: 200 }).withMessage("title is required"),
  body("dueDate").optional().isISO8601().toDate(),
  body("priority").optional().isIn(["low", "normal", "high"]).withMessage("bad priority"),
];

router.post("/", createRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const data = { priority: "normal", ...matchedData(req) };
  res.status(201).json(data);
});`
        }
      ]
    }
]);
