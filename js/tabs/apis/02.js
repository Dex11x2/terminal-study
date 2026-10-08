// تكملة تاب apis: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/apis/01.js (شرح حقول الدرس في أوله)
MORE("apis", [
    {
      t: "الأخطاء والقوايم",
      l: 1,
      n: "شكل خطأ واحد في كل الـ API، وقوايم بتتقسّم وتتفلتر من غير ما توقّع السيرفر",
      items: [
        {
          cmd: "problem+json",
          title: "شكل واحد لكل أخطاء الـ API",
          desc: R`RFC 9457 (Problem Details) بيحدد شكل JSON للأخطاء: [[type]] و [[title]] و [[status]] و [[detail]] و [[instance]]، ومعاهم أي حقول زيادة زي [[errors]] للـ validation. والـ Content-Type بيبقى [[application/problem+json]].

الفايدة إن العميل يكتب كود واحد يقرا بيه أي خطأ من أي endpoint، بدل ما كل route يرجّع شكل مختلف.`,
          example: R`import { STATUS_CODES } from "node:http";
export const problem = (status: number, title: string, detail?: string, extra: object = {}) =>
  Object.assign(new Error(title), { status, title, detail, extra });
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) err = problem(422, "Unprocessable Content", "Validation failed", { errors: err.issues });
  const status = Number.isInteger(err?.status) ? err.status : 500;
  if (status >= 500) console.error(err);
  const body = status >= 500
    ? { title: "Internal Server Error", status }
    : { title: err.title ?? STATUS_CODES[status], status, detail: err.detail ?? err.message, ...err.extra };
  res.status(status).type("application/problem+json").json({ type: "about:blank", ...body, instance: req.originalUrl });
});
throw problem(409, "Conflict", "Order 9001 is already shipped", { orderId: "9001" });`,
          try: R`ارمي [[problem(409, ...)]] من route، وابعت JSON مكسور، وابعت body ناقص حقل. اتأكد إن التلاتة راجعين بنفس الشكل، وإن الـ Content-Type هو [[application/problem+json]]. وبعدين ارمي [[new Error("db password is x")]] واتأكد إن الرسالة مبتطلعش للعميل.`,
          flag: "script",
          deep: {
            why: R`من غير اتفاق، كل route بيرجّع خطأ بشكل: [[{ error: "..." }]] هنا، و [[{ message: "..." }]] هناك. والفرونت بيتملى سطور زي [[err.response?.data?.message || err.response?.data?.error?.message || "حصل خطأ"]]. وفي مشاريع حقيقية لنفس الشخص، backend بيرجّع [[{ status: "error", message }]] والتاني بيرجّع [[{ error: { message } }]]، فكود الأخطاء في الفرونت مكنش ينفع يتنقل من مشروع للتاني.`,
            how: R`الحقول الأساسية:

[[type]]: URI بيعرّف نوع المشكلة، زي [[https://example.com/problems/out-of-credit]]، وممكن يبقى صفحة توثيق. لو مش موجود معناه [[about:blank]]، يعني «المشكلة هي معنى الـ status نفسه»، وساعتها [[title]] يبقى اسم الـ status.

[[title]]: ملخص ثابت لنوع المشكلة (مبيتغيّرش من مرة للتانية). [[detail]]: شرح الحالة دي بالذات («رصيدك ٣٠ والعملية بـ ٥٠»). [[status]]: نفس كود HTTP، عشان لو الـ body اتنقل لوحده (في log مثلًا). [[instance]]: بيعرّف الحالة دي بالذات، والناس بتحط فيه المسار أو request ID.

وأي حقول تانية مسموحة (extension members): [[errors]] للـ validation، أو [[balance]]، أو [[retryAfter]]. العميل اللي مش فاهمها بيتجاهلها.

RFC 9457 طلع سنة 2023 وحل محل RFC 7807، ونفس الشكل تقريبًا. فيه frameworks بتطلّعه لوحدها (Spring و ASP.NET). في Express بتعمله بـ error handler واحد زي المثال. و Express 5 بيبعت أي promise مرفوض من handler للـ error handler تلقائيًا، فمش محتاج [[try/catch]] في كل route (الأساس في تاب «Backend بـ Node»). و [[express.json()]] لما الـ JSON يبقى مكسور بيرمي error معاه [[status]] 400، فالـ handler ده بيطلّعه صح من غير كود زيادة.`,
            when: "من أول يوم في أي API جديد. ولو API قديم، ابدأ بيه في الـ version الجديد.",
            mistakes: R`ترجّع [[err.message]] و [[err.stack]] في أخطاء الـ 500: رسايل Prisma فيها أسماء الجداول والأعمدة. و [[title]] بيتغير مع كل حالة (ده مكانه [[detail]]). و status في الـ body مختلف عن status الـ HTTP. وتنسى الـ Content-Type، فالعملاء اللي بيفرّقوا بيه ميعرفوش إن ده problem.`
          },
          teach: R`## error handler واحد، وشكل واحد لكل الأخطاء

الفكرة: أي route يرمي error، و middleware واحد في الآخر يمسكه ويحوّله لـ JSON بشكل ثابت (RFC 9457). المثال ٣ حتت: helper اسمه [[problem]] بيعمل الـ error، و error handler بيحوّله رد، وسطر بيورّي الاستخدام.

اتجرّب على ويندوز 11: Express 5.2.1 و Zod 4.6 على Node 24.19 (بورت ٦٠٠٣)، و curl 8.22 من Git Bash. الـ routes كانت ٣: إلغاء بيرمي [[problem(409, ...)]]، و [[POST /orders]] بيعمل [[parse]] لـ [[{ productId: string, qty: number }]]، و [[/boom]] بيرمي [[new Error("db password is x")]].

---

## ١. [[STATUS_CODES]]

~~~ts
import { STATUS_CODES } from "node:http";
~~~

object جاهز في Node فيه اسم كل status. [[node:]] قبل الاسم معناها «موديول من جوه Node نفسه» مش من npm:

~~~bash
node -e 'const { STATUS_CODES } = require("node:http"); console.log(STATUS_CODES[404], "|", STATUS_CODES[422])'
~~~

~~~text الناتج
Not Found | Unprocessable Entity
~~~

بنستخدمه عشان لو الـ error مفيهوش [[title]]، الـ title يبقى اسم الـ status.

---

## ٢. الـ helper: [[problem]]

~~~ts
export const problem = (status: number, title: string, detail?: string, extra: object = {}) =>
  Object.assign(new Error(title), { status, title, detail, extra });
~~~

- [[(...) =>]] arrow function. و [[: number]] و [[: string]] أنواع TypeScript.
- [[detail?]] العلامة [[?]] معناها الـ parameter اختياري.
- [[extra: object = {}]] لو مبعتّوش، قيمته object فاضي.
- [[new Error(title)]] error عادي، عشان يبقى فيه stack وتقدر ترميه بـ [[throw]].
- [[Object.assign(target, source)]] بيلزق حقول [[source]] على [[target]] ويرجّعه. فالنتيجة Error عليه [[status]] و [[title]] و [[detail]] و [[extra]].

---

## ٣. الـ error handler سطر سطر

~~~ts
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
~~~

Express بيعرف إن ده error handler من إن الدالة ليها **٤** parameters. لو كتبت ٣ بس، هيعتبرها middleware عادي ومش هيدّيلها الأخطاء. والـ [[_]] في أول [[_next]] عُرف بين المبرمجين معناه «مش هستخدمه، بس لازم يبقى موجود». ولازم يتسجّل **بعد** كل الـ routes.

~~~ts
  if (err instanceof ZodError) err = problem(422, "Unprocessable Content", "Validation failed", { errors: err.issues });
~~~

[[instanceof]] بيسأل «الـ error ده من نوع ZodError؟». لو أيوه، بنحوّله problem بـ 422، و [[err.issues]] (قايمة غلطات الحقول) بتروح في [[errors]].

~~~ts
  const status = Number.isInteger(err?.status) ? err.status : 500;
~~~

- [[err?.status]] الـ [[?.]] (optional chaining): لو [[err]] نفسه null متقعش، رجّع undefined.
- [[Number.isInteger]] بيتأكد إنه رقم صحيح.
- [[شرط ? أ : ب]] (ternary): لو الشرط صح خد أ، وإلا ب. يعني أي error من غير status صحيح = 500.

~~~ts
  if (status >= 500) console.error(err);
~~~

الـ 5xx بس بتتسجّل في الـ console، لأنها غلطتك. الـ 4xx غلطة العميل.

~~~ts
  const body = status >= 500
    ? { title: "Internal Server Error", status }
    : { title: err.title ?? STATUS_CODES[status], status, detail: err.detail ?? err.message, ...err.extra };
~~~

- للـ 500: عنوان عام **بس**. مفيش [[err.message]] ولا stack، لأن الرسالة ممكن يبقى فيها أسماء جداول أو باسوردات.
- غير كده: [[??]] (nullish coalescing) معناها «لو اللي على الشمال null أو undefined، خد اللي على اليمين». فالـ title يا اللي حطيته يا اسم الـ status، والـ detail يا اللي حطيته يا رسالة الـ error.
- [[...err.extra]] بيفرد الحقول الزيادة (زي [[orderId]] أو [[errors]]) جوه الـ body.

~~~ts
  res.status(status).type("application/problem+json").json({ type: "about:blank", ...body, instance: req.originalUrl });
~~~

- [[.type(...)]] بيحط الـ Content-Type. و [[.json()]] بيحترمه لو اتحط قبله.
- [[type: "about:blank"]] يعني «المشكلة هي معنى الـ status نفسه».
- [[req.originalUrl]] المسار كامل زي ما الطلب جه.

---

## ٤. الاستخدام والناتج

~~~ts
throw problem(409, "Conflict", "Order 9001 is already shipped", { orderId: "9001" });
~~~

### 409 من [[problem]]

~~~bash
curl -i -X POST localhost:6003/orders/9001/cancellation
~~~

~~~text الناتج
HTTP/1.1 409 Conflict
Content-Type: application/problem+json; charset=utf-8

{"type":"about:blank","title":"Conflict","status":409,"detail":"Order 9001 is already shipped","orderId":"9001","instance":"/orders/9001/cancellation"}
~~~

[[orderId]] ظهر في المستوى الأول من الـ JSON لأن [[...err.extra]] فرده.

### 400 من JSON مكسور

~~~bash
curl -i -X POST localhost:6003/orders -H 'Content-Type: application/json' -d '{"productId": "7",'
~~~

~~~text الناتج
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json; charset=utf-8

{"type":"about:blank","title":"Bad Request","status":400,"detail":"Expected double-quoted property name in JSON at position 18 (line 1 column 19)","instance":"/orders"}
~~~

مكتبناش كود للحالة دي: [[express.json()]] رمى error عليه [[status: 400]]، والـ handler طلّعه. [[position 18]] مكان الحرف اللي وقف عنده الـ parser (العد من صفر): بعد الفاصلة الـ JSON خلص وهو مستني اسم حقل.

### 422 من Zod

~~~bash
curl -i -X POST localhost:6003/orders -H 'Content-Type: application/json' -d '{"productId":"7"}'
~~~

~~~text الناتج
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/problem+json; charset=utf-8

{"type":"about:blank","title":"Unprocessable Content","status":422,"detail":"Validation failed","errors":[{"expected":"number","code":"invalid_type","path":["qty"],"message":"Invalid input: expected number, received undefined"}],"instance":"/orders"}
~~~

سطر الـ status بيقول [[Unprocessable Entity]] (الاسم اللي Node لسه بيستخدمه، شفناه في [[STATUS_CODES]] فوق)، والـ title [[Unprocessable Content]] (اسمه في RFC 9110). نفس الرقم، والعميل بيعتمد على الرقم.

### 500 من غير تسريب

~~~bash
curl -i localhost:6003/boom
~~~

~~~text الناتج
HTTP/1.1 500 Internal Server Error
Content-Type: application/problem+json; charset=utf-8

{"type":"about:blank","title":"Internal Server Error","status":500,"instance":"/boom"}
~~~

و console السيرفر طبع [[Error: db password is x]] ومعاه الـ stack. الرسالة عندك، مش عند العميل.

---

## ٥. route مش موجود؟

الـ handler ده بيمسك الأخطاء اللي اترمت **من** routes. لو طلبت مسار مالوش route خالص، Express بيرجّع صفحة HTML بتاعته ([[Cannot POST /nothing]])، لأن مفيش error اترمى أصلًا. الحل middleware قبل الـ error handler وبعد كل الـ routes:

~~~ts
app.use((req, _res, next) => next(problem(404, "Not Found", $__btNo route for $__{req.method} $__{req.path}$__bt)));
~~~

[[next(err)]] بيبعت الـ error للـ handler. جرّبناه:

~~~text الناتج
HTTP/1.1 404 Not Found
Content-Type: application/problem+json; charset=utf-8

{"type":"about:blank","title":"Not Found","status":404,"detail":"No route for POST /nothing","instance":"/nothing"}
~~~

---

## الخلاصة

| الحقل | معناه |
|---|---|
| [[type]] | نوع المشكلة (URI)، و [[about:blank]] = «معنى الـ status» |
| [[title]] | اسم ثابت للنوع |
| [[status]] | نفس رقم HTTP |
| [[detail]] | شرح الحالة دي بالذات |
| [[instance]] | المسار أو request ID |
| أي حقل زيادة | [[errors]] و [[orderId]]... |

- الـ Content-Type [[application/problem+json]].
- error handler واحد بـ ٤ parameters، بعد كل الـ routes.
- الـ 500 من غير رسالة ولا stack.`,
          lines: [
            "[[STATUS_CODES]] جاهز في Node: اسم كل status (404 = «Not Found»)، عشان الـ title يبقى ثابت.",
            "helper بيعمل Error عادي ومعاه status و title و detail وحقول زيادة...",
            "...بإنه يلزق الحقول دي على الـ Error.",
            "الـ error handler: Express بيعرفه من إن ليه ٤ parameters.",
            "خطأ Zod يبقى 422، والـ issues بتاعته تبقى حقل errors.",
            "أي error من غير status صحيح يبقى 500.",
            "الـ 500 بس بتتسجّل، لأنها غلط عندك مش عند العميل.",
            "الـ body:",
            "لو 500: عنوان عام بس، من غير رسالة ولا stack، عشان متسرّبش تفاصيل.",
            "غير كده: title ثابت (اسم الـ status لو مفيش)، والرسالة في detail، والحقول الزيادة.",
            "الرد بالـ Content-Type الصح، و instance هو المسار اللي حصل فيه الخطأ.",
            "قفلة.",
            "الاستخدام من أي route: ارمي، والـ handler يتصرف."
          ],
          sol: R`التلاتة بيرجعوا [[Content-Type: application/problem+json; charset=utf-8]] ونفس الشكل: [[type]] و [[title]] و [[status]] و [[detail]] و [[instance]]. الـ 409 فيه [[orderId]] زيادة، والـ JSON المكسور بيرجّع 400 و [[title: "Bad Request"]] والـ detail فيه رسالة الـ parser، والحقل الناقص بيرجّع 422 ومعاه [[errors]] من Zod فيها [[path: ["qty"]]].

والـ [[new Error("db password is x")]] بيرجّع [[{"type":"about:blank","title":"Internal Server Error","status":500,"instance":"/boom"}]] بس. الرسالة الحقيقية بتظهر في console السيرفر، ومفيش [[detail]] ولا stack في الرد. لو شفت [[db password]] في الرد، يبقى الـ error اللي رميته عليه [[status]] رقم أقل من 500، أو الـ handler بيبعت [[err.message]] من غير ما يفرّق.

حاجة هتلاحظها: سطر الـ status بيقول [[422 Unprocessable Entity]] والـ title بيقول [[Unprocessable Content]]. الأول الاسم القديم اللي Node لسه بيستخدمه، والتاني اسمه في RFC 9110، والعميل بيعتمد على الرقم مش الاسم. ولو الأخطاء لسه راجعة HTML فيها [[Cannot POST]]، يبقى الـ handler متسجّل قبل الـ routes، أو ليه ٣ parameters بس.`,
          solCode: R`curl -i -X POST localhost:3000/orders/9001/cancellation      # الـ route بيعمل throw problem(409, ...)
# HTTP/1.1 409 Conflict
# Content-Type: application/problem+json; charset=utf-8
# {"type":"about:blank","title":"Conflict","status":409,"detail":"Order 9001 is already shipped","orderId":"9001","instance":"/orders/9001/cancellation"}

curl -i -X POST localhost:3000/orders -H 'Content-Type: application/json' -d '{"productId": "7",'
# HTTP/1.1 400 Bad Request
# {"type":"about:blank","title":"Bad Request","status":400,"detail":"Expected double-quoted property name in JSON at position 18 (line 1 column 19)","instance":"/orders"}

curl -i -X POST localhost:3000/orders -H 'Content-Type: application/json' -d '{"productId":"7"}'
# HTTP/1.1 422 Unprocessable Entity
# {"type":"about:blank","title":"Unprocessable Content","status":422,"detail":"Validation failed","errors":[{"expected":"number","code":"invalid_type","path":["qty"],"message":"Invalid input: expected number, received undefined"}],"instance":"/orders"}

curl -i localhost:3000/boom                                  # الـ route بيعمل throw new Error("db password is x")
# HTTP/1.1 500 Internal Server Error
# {"type":"about:blank","title":"Internal Server Error","status":500,"instance":"/boom"}
# والرسالة الحقيقية في console السيرفر بس`
        },
        {
          cmd: "offset pagination",
          title: "قسّم القايمة صفحات بالرقم",
          desc: R`[[?page=3&limit=20]] يعني «عدّي أول ٤٠ وهات ٢٠». سهلة، والعميل يقدر يروح لأي صفحة، وتعرض «صفحة ٣ من ١٢».

مشاكلها: القاعدة بتقرا وترمي كل الصفوف اللي قبل الصفحة، فالصفحة ١٠٠٠ بطيئة. ولو حد ضاف عنصر وانت بتقلّب، العناصر بتتزحلق: تشوف عنصر مرتين، أو يفوتك واحد.`,
          example: R`const PageQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
app.get("/products", async (req, res) => {
  const { page, limit } = PageQuery.parse(req.query);
  const [items, total] = await db.$transaction([
    db.product.findMany({ orderBy: [{ createdAt: "desc" }, { id: "desc" }], skip: (page - 1) * limit, take: limit }),
    db.product.count(),
  ]);
  res.json({ items, page, limit, total, totalPages: Math.ceil(total / limit) });
});`,
          try: R`اعمل seed بـ ٥٠٠ منتج وجرّب [[?page=2&limit=10]] و [[?limit=500]] و [[?page=0]]. وبعدين وانت على صفحة ٢ ضيف منتج جديد واطلب صفحة ٣، ولاحظ إن أول عنصر فيها هو آخر عنصر كان في صفحة ٢.`,
          flag: "script",
          deep: {
            why: "مفيش API بيرجّع جدول كامل: ١٠٠ ألف صف في رد واحد يتعب ذاكرة السيرفر والشبكة والمتصفح كلهم. الـ pagination بتحدد أقصى حجم للرد، و offset أبسط شكل ليها.",
            how: R`[[skip]] و [[take]] في Prisma بيتحولوا لـ [[OFFSET]] و [[LIMIT]] في SQL. القاعدة مبتقدرش تقفز على طول للصف رقم ١٠٠٠٠، لازم تمشي على الـ index وتعدّ ١٠٠٠٠ صف وترميهم. فالوقت بيزيد مع رقم الصفحة. في جداول صغيرة (آلاف) مش هتحس، وفي ملايين هتحس جدًا.

الترتيب لازم يبقى ثابت وفريد: لو رتبت بـ createdAt بس، وفيه صفين ليهم نفس الوقت، ترتيبهم ممكن يتغير بين طلب والتاني، فعنصر يظهر في صفحتين. عشان كده [[id]] كـ tie-breaker.

[[count()]] على جدول كبير مكلّف هو كمان (Postgres بيعدّ فعلًا). في الجداول الكبيرة يا تكاش العدد، يا تستغنى عنه وتقول «فيه صفحة جاية» بس.

وفيه شكل تاني للرد: الـ items في الـ body، والمعلومات في headers زي [[X-Total-Count]] و [[Link]] (GitHub بيعمل كده). الاتنين مقبولين، المهم الثبات.`,
            when: "لوحات الأدمن، والجداول اللي فيها أرقام صفحات، والبيانات الصغيرة أو اللي مش بتتغير كتير.",
            mistakes: R`مفيش حد أقصى لـ limit. وترتيب مش فريد. و [[page]] بيبدأ من صفر في endpoint ومن واحد في التاني. و [[Number(req.query.page)]] من غير validation، فـ [[?page=abc]] يبقى NaN و Prisma يرمي 500.`
          },
          teach: R`## «عدّي كام وهات كام»

الـ endpoint بياخد رقم الصفحة وحجمها من الـ query string، ويحسب منهم «عدّي كام صف»، ويرجّع الصفحة ومعاها معلومات تعرض بيها «صفحة ٢ من ٥٠».

اتجرّب على ويندوز 11: Express 5.2.1 و Zod 4.6 على Node 24.19 (بورت ٦٠٠٤)، و curl 8.22 من Git Bash. المنتجات كانت ٥٠٠ في الذاكرة بنفس الـ seed اللي في الـ solCode (كل منتج بعد اللي قبله بدقيقة)، والـ stand-in بيعمل [[findMany]] و [[count]] زي Prisma. وجزء «ليه بطيئة» اتجرّب على PostgreSQL 18.6 حقيقي في Docker بمليون صف.

---

## ١. الـ schema بتاع الـ query: [[PageQuery]]

~~~ts
const PageQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
~~~

كل حاجة في الـ query string بتوصل **نص**: [[?page=2]] بيبقى [[req.query.page === "2"]]. فنفك [[page]] حلقة حلقة:

| الحلقة | بتعمل إيه |
|---|---|
| [[z.coerce.number()]] | حوّل النص لرقم ([[Number("2")]] = 2). coerce يعني «اجبر النوع» |
| [[.int()]] | لازم رقم صحيح، مش 2.5 |
| [[.min(1)]] | أقل حاجة 1. الصفحات بتبدأ من 1 |
| [[.default(1)]] | لو مش مبعوت خالص، خليه 1 |

و [[limit]] نفس الكلام ومعاه [[.max(100)]]: من غيره حد يطلب [[?limit=1000000]] والسيرفر يحاول يرجّع الجدول كله.

---

## ٢. الحساب: [[skip]] و [[take]]

~~~ts
  const { page, limit } = PageQuery.parse(req.query);
~~~

[[{ page, limit } = ...]] اسمها destructuring: خد الحقلين دول من الـ object وحط كل واحد في متغير باسمه.

~~~ts
    db.product.findMany({ orderBy: [{ createdAt: "desc" }, { id: "desc" }], skip: (page - 1) * limit, take: limit }),
~~~

- [[orderBy]]: رتّب بالأحدث الأول ([[desc]] = descending، تنازلي). ولو اتنين ليهم نفس الوقت، بالـ [[id]] (اسمه tie-breaker، «فاصل التعادل»)، عشان الترتيب يبقى ثابت كل مرة.
- [[skip: (page - 1) * limit]]: عدّي الصفوف اللي في الصفحات اللي قبل. الصفحة ٣ بـ ٢٠ = عدّي ٤٠.
- [[take: limit]]: هات ٢٠.

Prisma بيترجمهم لـ SQL: [[ORDER BY ... LIMIT 20 OFFSET 40]].

~~~ts
  const [items, total] = await db.$transaction([ findMany(...), db.product.count() ]);
~~~

[[$transaction([...])]] بيشغّل الاستعلامين مع بعض في transaction واحدة، وبيرجّع array بنتايجهم بنفس الترتيب. و [[const [items, total] =]] destructuring للـ array: أول نتيجة في [[items]] والتانية في [[total]].

~~~ts
  res.json({ items, page, limit, total, totalPages: Math.ceil(total / limit) });
~~~

[[{ items, page }]] اختصار لـ [[{ items: items, page: page }]]. و [[Math.ceil]] بيقرّب لفوق: ٥٠١ منتج على ١٠ = ٥٠.١، يعني ٥١ صفحة (الأخيرة فيها منتج واحد).

---

## ٣. نشغّله

~~~bash
curl -s "localhost:6004/products?page=2&limit=10"
~~~

~~~text الناتج (الأسماء بس، وبعدين الباقي)
Product 490, Product 489, Product 488, ..., Product 481
{"page":2,"limit":10,"total":500,"totalPages":50}
~~~

الصفحة الأولى ٥٠٠ لـ ٤٩١، فالتانية تبدأ من ٤٩٠. ومن غير أي query: ٢٠ عنصر، وأولهم [[Product 500]]، و [[totalPages]] ٢٥.

### القيم الغلط

~~~bash
curl -s "localhost:6004/products?limit=500"
curl -s "localhost:6004/products?page=0"
curl -s "localhost:6004/products?page=abc"
~~~

~~~text الناتج (حقل errors بس من كل رد، والتلاتة 422)
{"origin":"number","code":"too_big","maximum":100,"inclusive":true,"path":["limit"],"message":"Too big: expected number to be <=100"}
{"origin":"number","code":"too_small","minimum":1,"inclusive":true,"path":["page"],"message":"Too small: expected number to be >=1"}
{"expected":"number","code":"invalid_type","received":"NaN","path":["page"],"message":"Invalid input: expected number, received NaN"}
~~~

- [[inclusive: true]] يعني الحد نفسه مسموح (١٠٠ تمام، ١٠١ لأ).
- [[NaN]] (Not a Number): ده اللي [[Number("abc")]] بيرجّعه. من غير Zod كان هيوصل لـ Prisma ويعمل 500.

---

## ٤. مشكلة الزحلقة

~~~bash
curl -s -X POST localhost:6004/products -H 'Content-Type: application/json' -d '{"name":"NEW"}'
curl -s "localhost:6004/products?page=3&limit=10"
~~~

~~~text الناتج
Product 481, Product 480, Product 479, ..., Product 472
total 501 totalPages 51
~~~

[[Product 481]] كان **آخر** عنصر في صفحة ٢، ودلوقتي **أول** عنصر في صفحة ٣. المنتج الجديد دخل أول القايمة وزق كل حاجة خطوة، و [[OFFSET 20]] لسه بيعدّ ٢٠ من الأول. فالمستخدم اللي بيقلّب هيشوف ٤٨١ مرتين.

---

## ٥. ليه الصفحات البعيدة بطيئة؟

على Postgres 18.6 في Docker، جدول مليون منتج وعليه index على [[("createdAt" DESC, id DESC)]]، و [[EXPLAIN ANALYZE]] بيشغّل الاستعلام ويقول عمل إيه بالظبط:

~~~text صفحة ٢ (OFFSET 20)
Limit (actual time=0.061..0.065 rows=20.00 loops=1)
  ->  Index Scan using "product_createdAt_id_idx" on product (actual time=0.057..0.061 rows=40.00 loops=1)
Execution Time: 0.077 ms
~~~

~~~text صفحة ٤٥٠٠١ (OFFSET 900000)
Limit (actual time=133.142..133.146 rows=20.00 loops=1)
  ->  Index Scan using "product_createdAt_id_idx" on product (actual time=0.005..108.057 rows=900020.00 loops=1)
Execution Time: 133.157 ms
~~~

السطر المهم [[rows=]] بتاع الـ Index Scan: في الصفحة القريبة قرا ٤٠ صف عشان يرجّع ٢٠. في البعيدة قرا **٩٠٠٠٢٠** صف ورمى ٩٠٠٠٠٠ منهم، والوقت طلع من ٠.٠٧ ملي ثانية لـ ١٣٣. الـ index بيرتّب، بس مبيقدرش يقفز على الصف رقم ٩٠٠ ألف: لازم يعدّ.

و [[count(*)]] على نفس الجدول:

~~~text الناتج (جزء)
->  Parallel Seq Scan on product (actual time=0.013..23.096 rows=333333.33 loops=3)
Execution Time: 46.895 ms
~~~

Postgres لف على الجدول كله (Seq Scan = scan متسلسل) بـ ٣ عمّال مع بعض، كل واحد حوالي تلت مليون صف. عشان كده العدد الكلي في الجداول الكبيرة بيتكاش أو بيتشال.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[?page=3&limit=20]] | الصفحة التالتة، ٢٠ في الصفحة |
| [[z.coerce.number().int().min(1)]] | نص لرقم صحيح من ١ وطالع |
| [[.max(100)]] | سقف للحجم |
| [[skip: (page - 1) * limit]] | عدّي اللي قبل (OFFSET) |
| [[take: limit]] | هات كام (LIMIT) |
| [[orderBy]] بحقلين | ترتيب ثابت، و id للتعادل |
| [[totalPages]] | [[Math.ceil(total / limit)]] |

- سهلة وفيها «روح لصفحة ٧»، بس الصفحات البعيدة بتبطأ، والعناصر بتتزحلق لو البيانات اتغيرت.
- الحل للقوايم الكبيرة والمتغيرة: الدرس الجاي ([[cursor pagination]]).`,
          lines: [
            "شكل الـ query.",
            "[[coerce]] لأن كل حاجة في query string نص. أقل صفحة ١، والافتراضي ١.",
            "الحد الأقصى ١٠٠: من غيره حد يطلب [[limit=1000000]] ويوقّع السيرفر.",
            "قفلة.",
            "الـ endpoint.",
            "اقرا واتحقق (لو غلط Zod يرمي، والـ handler يرجّع 422).",
            "استعلامين في transaction واحدة: الصفحة والعدد الكلي.",
            "ترتيب ثابت (createdAt وبعده id عشان التعادل)، وعدّي اللي قبل الصفحة، وهات limit.",
            "العدد الكلي عشان «صفحة كام من كام».",
            "قفلة.",
            "الرد: العناصر ومعاها معلومات الصفحات.",
            "قفلة."
          ],
          sol: R`[[?page=2&limit=10]] بيرجّع من [[Product 490]] لـ [[Product 481]] (الأحدث الأول)، ومعاهم [[page: 2]] و [[limit: 10]] و [[total: 500]] و [[totalPages: 50]]. و [[?limit=500]] بيرجّع 422 بـ [[too_big]] و [[maximum: 100]]، و [[?page=0]] بيرجّع 422 بـ [[too_small]]. لو [[?limit=500]] رجّعلك ٥٠٠ عنصر، يبقى الـ [[max(100)]] ناقص.

وبعد ما تضيف منتج جديد، صفحة ٣ بتبدأ بـ [[Product 481]]، اللي كان آخر عنصر في صفحة ٢، و total بقى ٥٠١. المنتج الجديد دخل أول القايمة وزق كل حاجة خطوة، فالـ offset ٢٠ بقى بيشاور على عنصر شفته قبل كده. ولو اتمسح منتج بدل ما يتضاف، هيحصل العكس: عنصر يفوتك خالص ومتعرفش.

ده مش bug في كودك، ده طبيعة الـ offset، وحلّه في الدرس الجاي (cursor). ولو ماشفتش العنصر المكرر، اتأكد إن المنتج الجديد [[createdAt]] بتاعه أحدث من الباقي، وإن الترتيب [[desc]].`,
          solCode: R`# seed (مرة واحدة): 500 منتج، كل واحد بعد اللي قبله بدقيقة
# await db.product.createMany({ data: Array.from({ length: 500 }, (_, i) => ({ name: $__btProduct $__{i + 1}$__bt, createdAt: new Date(Date.UTC(2026, 0, 1) + (i + 1) * 60_000) })) });

curl -s "localhost:3000/products?page=2&limit=10"
# items: Product 490 ... Product 481 | "page":2,"limit":10,"total":500,"totalPages":50

curl -s "localhost:3000/products?limit=500"    # 422: "code":"too_big","maximum":100,"path":["limit"]
curl -s "localhost:3000/products?page=0"       # 422: "code":"too_small","minimum":1,"path":["page"]

# الزحلقة: وانت على صفحة 2، حد ضاف منتج جديد
curl -s -X POST localhost:3000/products -H 'Content-Type: application/json' -d '{"name":"NEW"}'
curl -s "localhost:3000/products?page=3&limit=10"
# أول عنصر: Product 481، وده كان آخر عنصر في صفحة 2. و "total":501`
        },
        {
          cmd: "cursor pagination",
          title: "قسّم القايمة بمؤشر مش برقم صفحة",
          desc: R`بدل «عدّي ٤٠»، العميل بيقول «هات اللي بعد العنصر ده»: [[?after=eyJ...&limit=20]]. الـ cursor نص متحوّل بـ base64url (encoded، مش مشفّر: أي حد يقدر يفكّه) فيه مكان آخر عنصر شافه (الوقت والـ id). القاعدة بتروح للمكان ده على طول بالـ index، فالصفحة الألف بنفس سرعة الأولى، ومفيش تكرار لو اتضافت عناصر.

العيب: مفيش «روح لصفحة ٧»، ومفيش عدد صفحات. مناسب للـ feeds والشات والـ infinite scroll والـ APIs العامة. والرد فيه [[links.next]] جاهز، ودي أبسط صورة من فكرة HATEOAS: الرد بيقولك تروح فين بعد كده.`,
          example: R`app.get("/messages", async (req, res) => {
  const limit = Math.min(Math.max(Math.trunc(Number(req.query.limit)) || 20, 1), 100);
  const after = typeof req.query.after === "string" ? decodeCursor(req.query.after) : null;
  const rows = await db.message.findMany({
    where: after ? { OR: [{ createdAt: { lt: after.createdAt } }, { createdAt: after.createdAt, id: { lt: after.id } }] } : {},
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
  });
  const items = rows.slice(0, limit);
  const last = items.at(-1);
  const next = rows.length > limit && last ? encodeCursor({ createdAt: last.createdAt, id: last.id }) : null;
  res.json({ items, nextCursor: next, links: { next: next && $__bt/messages?limit=$__{limit}&after=$__{next}$__bt } });
});`,
          try: R`اكتب [[encodeCursor]] و [[decodeCursor]] بـ [[Buffer.from(JSON.stringify(c)).toString("base64url")]] والعكس (ورجّع createdAt لـ Date). اعمل seed بـ ٢٠٠ رسالة، وامشي على الصفحات بـ [[links.next]] لحد ما يرجع null، وعدّ: لازم ٢٠٠ بالظبط من غير تكرار، حتى لو ضفت رسايل جديدة في النص.`,
          flag: "script",
          deep: {
            why: "offset بيبطأ مع الصفحات العميقة وبيكرر عناصر لما البيانات تتغير. الـ feeds والشات بيتغيروا كل ثانية، والمستخدم بيعمل scroll لتحت كتير. الـ cursor بيحل الاتنين.",
            how: R`الفكرة اسمها keyset pagination: بدل ما القاعدة تعدّ وترمي، بتدوّر بالـ index على «أول صف بعد المفتاح ده». لو فيه index على [[(createdAt, id)]]، ده seek واحد مهما كانت الصفحة عميقة.

الشرط في المثال ترجمة لـ [[(createdAt, id) < (lastCreatedAt, lastId)]]: يا أقدم، يا نفس الوقت و id أصغر. الـ id موجود عشان لو عنصرين ليهم نفس الوقت بالظبط ميضيعش واحد. وفي Postgres ينفع تكتبها row comparison مباشرة في SQL.

الـ cursor opaque: العميل مش المفروض يفهمه أو يبنيه. بتعمله encode بـ base64url عشان يبقى آمن في الـ URL، وعشان تقدر تغيّر محتواه بعدين من غير ما تكسر حد. ولو عايز تمنع التلاعب بيه، وقّعه بـ HMAC.

Prisma عنده option جاهز [[cursor]] (مع [[skip: 1]])، بس بيشتغل على حقل فريد واحد. الشرط اليدوي أوضح لما الترتيب بحقلين.

HATEOAS (Hypermedia as the Engine of Application State) معناها إن الرد نفسه فيه لينكات للخطوات الجاية: [[next]] و [[prev]] و [[self]]، أو حتى [[cancel]] على طلب لسه ممكن يتلغي. REST «الكامل» بيطلبها، وفي الواقع أغلب الـ APIs بتستخدمها في الـ pagination بس، في الـ body أو في [[Link]] header (RFC 8288) زي GitHub.`,
            when: "أي قايمة بتكبر من غير حد، أو بتتحدّث باستمرار، أو معروضة كـ infinite scroll. و offset للوحات الأدمن اللي محتاجة أرقام صفحات.",
            mistakes: R`ترتيب بحقل مش فريد من غير tie-breaker. والترتيب في الاستعلام مختلف عن اللي الـ cursor اتعمل بيه. و cursor عبارة عن id صريح والعميل بيبني أرقام بنفسه. ونسيان الـ index على [[(createdAt, id)]] فالميزة كلها تروح. وتفتكر إنك تقدر تحسب «صفحة كام» بالـ cursor.`
          },
          teach: R`## «هات اللي بعد ده»

بدل رقم صفحة، العميل بيبعت **مؤشر** (cursor) على آخر عنصر شافه، والسيرفر بيرجّع اللي بعده. الـ cursor ده نص فيه وقت آخر عنصر والـ id بتاعه، متحوّل لشكل آمن في الـ URL. هنفك الـ endpoint، وبعدين [[encodeCursor]] و [[decodeCursor]] من الـ solCode، وبعدين نمشي على كل الصفحات ونعدّ.

اتجرّب على ويندوز 11: Express 5.2.1 على Node 24.19 (بورت ٦٠٠٤)، و curl 8.22 من Git Bash. الرسايل ٢٠٠ في الذاكرة زي الـ seed اللي في الـ sol: كل ٤ رسايل ليهم **نفس الثانية بالظبط** (عشان نختبر التعادل)، والـ stand-in بيعمل [[where]] و [[OR]] و [[lt]] و [[orderBy]] زي Prisma. وجزء السرعة اتجرّب على PostgreSQL 18.6 في Docker.

---

## ١. [[limit]] من غير Zod

~~~ts
  const limit = Math.min(Math.max(Math.trunc(Number(req.query.limit)) || 20, 1), 100);
~~~

نفكه من جوه لبرة:

| الخطوة | الحتة | [[?limit=-5]] | [[?limit=abc]] |
|---|---|---|---|
| ١ | [[Number(req.query.limit)]] | -5 | NaN |
| ٢ | [[Math.trunc(...)]] شيل الكسر | -5 | NaN |
| ٣ | «أو ٢٠»: لو falsy خد ٢٠ | -5 | 20 |
| ٤ | [[Math.max(..., 1)]] مش أقل من ١ | 1 | 20 |
| ٥ | [[Math.min(..., 100)]] مش أكتر من ١٠٠ | 1 | 20 |

«أو» في الخطوة ٣ هي [[||]] في الكود. [[NaN]] و [[0]] falsy، يعني JavaScript بيعتبرهم «لأ» في الشروط، فبياخدوا الافتراضي. جرّبنا الاتنين: [[?limit=-5]] رجّع عنصر واحد، و [[?limit=abc]] رجّع ٢٠.

---

## ٢. فك الـ cursor

~~~ts
  const after = typeof req.query.after === "string" ? decodeCursor(req.query.after) : null;
~~~

[[typeof x === "string"]] بيتأكد إن [[after]] نص واحد (ممكن يوصل array لو اتكرر في الـ URL). لو موجود نفكه، ولو لأ يبقى [[null]] = أول صفحة.

### [[encodeCursor]] و [[decodeCursor]] (من الـ solCode)

~~~ts
function encodeCursor(c: Cursor): string {
  return Buffer.from(JSON.stringify(c)).toString("base64url");
}
~~~

- [[JSON.stringify(c)]]: الـ object يبقى نص JSON. الـ Date بيتحوّل لنص ISO لوحده.
- [[Buffer.from(...)]]: النص يبقى bytes.
- [[.toString("base64url")]]: الـ bytes تتكتب بحروف وأرقام و [[-]] و [[_]] بس، فتتحط في URL من غير مشاكل. base64 العادي فيه [[+]] و [[/]] و [[=]] ودول ليهم معنى في الـ URL، والنسخة url بتبدّلهم.

~~~ts
function decodeCursor(s: string): Cursor {
  try {
    const { createdAt, id } = JSON.parse(Buffer.from(s, "base64url").toString("utf8"));
    const date = new Date(createdAt);
    if (typeof id !== "string" || Number.isNaN(date.getTime())) throw new Error();
    return { createdAt: date, id };
  } catch {
    throw problem(400, "Bad Request", "Invalid cursor");
  }
}
~~~

العكس بالظبط، ومعاه فحص:

- [[Buffer.from(s, "base64url").toString("utf8")]] يرجّع النص.
- [[JSON.parse]] يرجّع الـ object. لو النص زبالة بيرمي.
- [[new Date(createdAt)]] النص يرجع Date. ولو مش تاريخ، [[getTime()]] بيرجّع NaN.
- [[try]] و [[catch]]: أي error جوه الـ try (من الـ parse أو من الـ throw بتاعنا) بيروح للـ catch، اللي بيرمي 400 بدل 500.

~~~bash
curl -s -w " %{http_code}\n" "localhost:6004/messages?after=garbage"
~~~

~~~text الناتج
{"type":"about:blank","title":"Bad Request","status":400,"detail":"Invalid cursor","instance":"/messages?after=garbage"} 400
~~~

---

## ٣. الاستعلام: «اللي بعد آخر عنصر»

~~~ts
    where: after ? { OR: [{ createdAt: { lt: after.createdAt } }, { createdAt: after.createdAt, id: { lt: after.id } }] } : {},
~~~

[[lt]] = less than (أصغر من). والشرط بالكلام: هات الرسايل اللي **يا** وقتها أقدم من آخر واحدة، **يا** نفس وقتها بالظبط والـ id بتاعها أصغر. ولو مفيش cursor: [[{}]] يعني من غير شرط.

~~~ts
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
~~~

- الترتيب لازم يبقى **نفس** الحقلين اللي في الـ cursor وبنفس الاتجاه، وإلا «اللي بعد» ملهاش معنى.
- [[limit + 1]]: بنطلب واحد زيادة. لو جه، يبقى فيه صفحة كمان. حيلة بتغنيك عن [[count]].

~~~ts
  const items = rows.slice(0, limit);
  const last = items.at(-1);
  const next = rows.length > limit && last ? encodeCursor({ createdAt: last.createdAt, id: last.id }) : null;
~~~

- [[slice(0, limit)]] بيرجّع أول [[limit]] عنصر بس (الزيادة كانت للمعرفة).
- [[.at(-1)]] آخر عنصر في الـ array.
- [[&&]] يعني «و»: لو جه أكتر من limit **و** فيه آخر عنصر، اعمل cursor منه. غير كده [[null]].

~~~ts
  res.json({ items, nextCursor: next, links: { next: next && $__bt/messages?limit=$__{limit}&after=$__{next}$__bt } });
~~~

[[next && ...]]: لو [[next]] null، النتيجة null. ولو فيه cursor، النتيجة اللينك. فالعميل مش محتاج يبني URL: ياخد [[links.next]] زي ما هو.

---

## ٤. نشوفه

~~~bash
curl -s "localhost:6004/messages?limit=3"
~~~

~~~text الناتج (بعد ما اتضافت رسالتين جداد، ومتقسّم على سطور عشان يتقري)
{"items":[{"id":"m202","text":"new B",...},{"id":"m201","text":"new A",...},{"id":"m200","text":"msg 200","createdAt":"2026-01-01T00:00:49.000Z"}],
 "nextCursor":"eyJjcmVhdGVkQXQiOiIyMDI2LTAxLTAxVDAwOjAwOjQ5LjAwMFoiLCJpZCI6Im0yMDAifQ",
 "links":{"next":"/messages?limit=3&after=eyJjcmVhdGVkQXQiOiIyMDI2LTAxLTAxVDAwOjAwOjQ5LjAwMFoiLCJpZCI6Im0yMDAifQ"}}
~~~

نفك الـ cursor ده:

~~~bash
node -e "console.log(Buffer.from('eyJjcmVhdGVkQXQiOiIyMDI2LTAxLTAxVDAwOjAwOjQ5LjAwMFoiLCJpZCI6Im0yMDAifQ','base64url').toString())"
~~~

~~~text الناتج
{"createdAt":"2026-01-01T00:00:49.000Z","id":"m200"}
~~~

أي حد يقدر يفكه. ده encoding مش تشفير. والصفحة اللي بعده:

~~~text الناتج (الـ id والوقت)
m199 2026-01-01T00:00:49.000Z
m198 2026-01-01T00:00:49.000Z
m197 2026-01-01T00:00:49.000Z
~~~

التلاتة **نفس الثانية** بتاعة m200. لو الشرط كان «أقدم من» بس، كانوا هيضيعوا. الشق التاني من الـ OR ([[id: { lt }]]) هو اللي جابهم.

---

## ٥. المشي على كل الصفحات (الـ solCode)

~~~ts
let url: string | null = "/messages?limit=15";
while (url) {
  const body: any = await (await fetch(BASE + url)).json();
  // ...
  url = body.links.next;
}
~~~

- [[string | null]]: المتغير يا نص يا null.
- [[while (url)]]: كمّل طول ما فيه لينك. آخر صفحة [[links.next]] بيبقى null فاللفة بتقف.
- [[await (await fetch(...)).json()]]: الأول استنى الرد، وبعدين استنى قراية الـ body كـ JSON.
- [[new Set()]] و [[seen.add(m.id)]]: الـ Set مبيشيلش تكرار، فحجمه = عدد الـ ids المختلفة.
- في الصفحة التالتة بيضيف رسالتين جداد (كأن حد بعت وانت بتعمل scroll).

~~~bash
BASE=http://localhost:6004 node walk.ts
~~~

~~~text الناتج
{ pages: 14, count: 200, unique: 200 }
~~~

[[BASE=... node]] بيحط متغير بيئة للأمر ده بس، والسكربت بيقراه بـ [[process.env.BASE]]. والنتيجة: ٢٠٠ عدّة و ٢٠٠ مختلفين، يعني مفيش تكرار ومفيش حاجة فاتت، حتى مع الإضافة في النص. ١٤ صفحة لأن ٢٠٠ على ١٥ = ١٣ صفحة كاملة وصفحة فيها ٥. والرسالتين الجداد مظهروش لأنهم **أحدث** من أول صفحة، والمشي ماشي لتحت.

### من غير الـ tie-breaker

شغّلنا نسخة من السيرفر الشرط فيها [[{ createdAt: { lt: after.createdAt } }]] بس:

~~~text الناتج
{ pages: 13, count: 188, unique: 188 }
~~~

١٢ رسالة ضاعوا: كل مرة آخر عنصر في الصفحة كان ليه «إخوات» في نفس الثانية، والشرط عدّاهم.

---

## ٦. ليه أسرع؟

على Postgres 18.6 بمليون صف و index على [[("createdAt" DESC, id DESC)]]، الصفحة اللي بعد العنصر رقم ١٠٠ (يعني بعد حوالي ٩٩٩٩٠٠ صف من الأول):

~~~text الناتج
Limit (actual time=0.013..0.016 rows=21.00 loops=1)
  ->  Index Scan using "product_createdAt_id_idx" on product (actual time=0.012..0.014 rows=21.00 loops=1)
        Index Cond: (ROW("createdAt", id) < ROW('2026-01-01 01:40:00+00'::timestamp with time zone, 100))
Execution Time: 0.034 ms
~~~

[[Index Cond]]: Postgres قفز في الـ index على المكان على طول، وقرا ٢١ صف بس ([[limit + 1]]). قارنها بالـ OFFSET في الدرس اللي فات: ٩٠٠ ألف صف و ١٣٣ ملي ثانية. والشرط ده [[ROW(a, b) < ROW(x, y)]] هو نفس الـ OR بتاعنا مكتوب في SQL مباشرة (row comparison).

---

## الخلاصة

| الحتة | ليه |
|---|---|
| ترتيب بـ [[createdAt]] ثم [[id]] | ترتيب ثابت وفريد |
| الـ cursor = [[{ createdAt, id }]] لآخر عنصر | «كمّل من هنا» |
| [[base64url]] | يتحط في URL. مش تشفير |
| [[OR]]: أقدم، أو نفس الوقت و id أصغر | من غير الشق التاني بتضيع عناصر |
| [[take: limit + 1]] | تعرف فيه صفحة جاية ولا لأ |
| [[links.next]] | العميل ميبنيش URLs |
| cursor بايظ | 400 مش 500 |

- سريع في أي عمق ومفيش تكرار، بس مفيش «صفحة ٧ من ١٢».
- محتاج index على نفس حقول الترتيب.`,
          lines: [
            "الـ endpoint.",
            "العدد بين ١ و ١٠٠: من غير الحد الأدنى، limit سالب كان هيعدّي لـ take.",
            "لو فيه cursor فكّه، ولو مفيش يبقى أول صفحة.",
            "هات الصفوف...",
            "...اللي بعد آخر عنصر شافه: وقت أقدم، أو نفس الوقت و id أصغر.",
            "نفس الترتيب اللي الـ cursor اتعمل بيه بالظبط.",
            "هات واحد زيادة: لو جه، يبقى فيه صفحة كمان.",
            "قفلة.",
            "رجّع limit بس، والزيادة كانت للمعرفة.",
            "آخر عنصر هيترجع.",
            "الـ cursor الجاي من آخر عنصر، أو null لو مفيش صفحات تانية.",
            "الرد، ومعاه لينك الصفحة الجاية جاهز (HATEOAS على خفيف).",
            "قفلة."
          ],
          sol: R`العدد النهائي ٢٠٠ بالظبط و ٢٠٠ id مختلف، حتى مع رسالتين جداد اتضافوا في النص (في الحل: ١٤ صفحة بـ [[limit=15]]). الرسايل الجديدة مبتظهرش في المشي ده لأنها أحدث من أول صفحة، والـ cursor بيكمّل من «بعد آخر عنصر شفته» مهما اتضاف قبله. ولو فكّيت أي cursor بـ [[Buffer.from(c, "base64url").toString()]] هتلاقي JSON فيه [[createdAt]] و [[id]].

عشان تختبر الـ tie-breaker بجد، خلي كذا رسالة في الـ seed ليهم نفس [[createdAt]] بالظبط (الحل بيدّي كل ٤ رسايل نفس الثانية) واستخدم limit مش من مضاعفات ٤. لو شلت شرط [[id: { lt: after.id }]] وسبت [[createdAt: { lt }]] بس، العدد هيطلع أقل من ٢٠٠: الرسايل اللي ليها نفس وقت آخر عنصر في الصفحة بتضيع.

وفي [[decodeCursor]] متسيبش [[JSON.parse]] يرمي لوحده: cursor بايظ ([[?after=garbage]]) لازم يرجّع 400 مش 500. أما رجوع [[createdAt]] لـ Date، فالأهم إنك تفحص إنه تاريخ صحيح. ولو المشي مبيخلصش أبدًا، يبقى [[links.next]] بيرجع حتى في آخر صفحة: اتأكد إنك طلبت [[limit + 1]] وبتقارن بـ [[rows.length > limit]].`,
          solCode: R`// cursor.ts
type Cursor = { createdAt: Date; id: string };

function encodeCursor(c: Cursor): string {
  return Buffer.from(JSON.stringify(c)).toString("base64url");
}
function decodeCursor(s: string): Cursor {
  try {
    const { createdAt, id } = JSON.parse(Buffer.from(s, "base64url").toString("utf8"));
    const date = new Date(createdAt);
    if (typeof id !== "string" || Number.isNaN(date.getTime())) throw new Error();
    return { createdAt: date, id };
  } catch {
    throw problem(400, "Bad Request", "Invalid cursor");
  }
}

// walk.ts: امشي على كل الصفحات بـ links.next وعدّ
const BASE = process.env.BASE ?? "http://localhost:3000";
const seen = new Set<string>();
let url: string | null = "/messages?limit=15";
let pages = 0;
let count = 0;
while (url) {
  const body: any = await (await fetch(BASE + url)).json();
  for (const m of body.items) seen.add(m.id);
  count += body.items.length;
  pages++;
  if (pages === 3) {
    // رسايل جديدة وصلت واحنا في النص
    for (const text of ["new A", "new B"]) {
      await fetch(BASE + "/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
    }
  }
  url = body.links.next;
}
console.log({ pages, count, unique: seen.size }); // { pages: 14, count: 200, unique: 200 }`
        },
        {
          cmd: "filter و sort",
          title: "فلترة وترتيب من الـ query من غير ثغرات",
          desc: R`الفلترة في query string: [[?status=paid&minTotal=100&q=ahmed&sort=-createdAt]]. العلامة [[-]] قبل الحقل معناها تنازلي. والقاعدة الذهبية: whitelist. كل فلتر وكل حقل ترتيب مسموح بيه متعرّف في schema، وأي حاجة تانية مرفوضة.

ومهما كانت الفلاتر، شرط الملكية ([[userId]]) ثابت ومش جاي من العميل.`,
          example: R`const ListQuery = z.object({
  status: z.enum(["pending", "paid", "shipped"]).optional(),
  minTotal: z.coerce.number().nonnegative().optional(),
  q: z.string().trim().min(2).max(100).optional(),
  sort: z.enum(["createdAt", "-createdAt", "total", "-total"]).default("-createdAt"),
});
app.get("/orders", requireAuth, async (req, res) => {
  const { status, minTotal, q, sort } = ListQuery.parse(req.query);
  const field = sort.replace("-", "") as "createdAt" | "total";
  const items = await db.order.findMany({
    where: { userId: req.user.id, status, total: minTotal === undefined ? undefined : { gte: minTotal }, customerName: q ? { contains: q, mode: "insensitive" } : undefined },
    orderBy: [{ [field]: sort.startsWith("-") ? "desc" : "asc" }, { id: "asc" }], take: 50,
  });
  res.json({ items });
});`,
          try: R`جرّب [[?sort=-total]] و [[?sort=password]] و [[?status=deleted]]: الأول يشتغل، والتانيين 422. وبعدين فكّر: لو [[sort]] كان [[z.string()]] على جدول المستخدمين، و حد بعت [[?sort=passwordHash]]، هيعرف إيه من ترتيب النتايج؟`,
          flag: "script",
          deep: {
            why: "كل عميل عايز الداتا بشكل مختلف. من غير فلاتر في السيرفر، الفرونت بيسحب كل حاجة ويفلتر عنده، وده بطيء وبيكشف بيانات مش المفروض توصله.",
            how: R`الـ query string كله نصوص: [[?minTotal=100]] بيوصل كـ [[req.query.minTotal === "100"]]. و [[?status=a&status=b]] بيوصل array. وممكن [[?filter[x]=1]] يوصل object حسب الـ query parser. عشان كده Zod قبل أي استخدام: بيحوّل الأنواع وبيرفض الأشكال الغريبة.

أشكال مشهورة للفلاتر: حقول مباشرة ([[?status=paid]])، و range بـ prefix أو suffix ([[?minTotal=]] و [[?createdAfter=]])، أو صيغة زي [[?total[gte]=100]] (Stripe بيعمل كده). اختار شكل واحد وامشي عليه في كل الـ API.

الترتيب: [[sort=-createdAt,total]] شكل مشهور (JSON:API). ولازم whitelist لسببين: الترتيب بحقل من غير index على جدول كبير بيعمل full scan، والترتيب بحقل سري (زي passwordHash أو resetToken) بيكشف معلومات: لو قدرت ترتّب المستخدمين بالـ hash وتشوف مين قبل مين، تقدر تستنتج حروف منه بالتدريج (sort oracle).

البحث النصي بـ [[contains]] و [[insensitive]] في Postgres بيتحول لـ ILIKE، ومبيستخدمش index عادي. لو الجدول كبير محتاج trigram index أو full-text search (التفاصيل في تاب «PostgreSQL»).`,
            when: "أي endpoint بيرجّع قايمة. ابدأ بالفلاتر اللي الواجهة محتاجاها فعلًا، مش كل حقل في الجدول.",
            mistakes: R`تبعت [[req.query]] زي ما هو لـ [[where]]: العميل يبعت [[?userId=5]] ويشوف طلبات حد تاني، أو يبعت object فيه operators. وترتيب بأي حقل. وفلتر الملكية يبقى اختياري. وبحث من غير حد أدنى للطول، فـ [[?q=a]] يرجّع نص الجدول.`
          },
          teach: R`## الفلاتر في قايمة مقفولة

العميل بيقول عايز إيه في الـ query string، والسيرفر بيقبل بس اللي في القايمة اللي هو كاتبها (whitelist، يعني «القايمة البيضا»: المسموح بالاسم، وأي حاجة تانية مرفوضة). وفوق كل الفلاتر شرط ثابت: الطلبات بتاعتك انت بس.

اتجرّب على ويندوز 11: Express 5.2.1 و Zod 4.6 على Node 24.19 (بورت ٦٠٠٤)، و curl 8.22 من Git Bash. الطلبات كانت ٤ في الذاكرة: ٣ بتوع المستخدم [[u1]] (مجموعهم ١٢٠ و ٤٠ و ٩٠٠) وواحد بتاع [[u2]] بـ ٥٠٠٠، والـ stand-in بيفهم [[where]] و [[gte]] و [[contains]] و [[orderBy]] زي Prisma.

---

## ١. الـ query بيوصل إزاي؟

قبل الكود، شوف [[req.query]] الخام في Express 5 (route بيرجّعه زي ما هو):

~~~text الناتج
?minTotal=100        => {"minTotal":"100"}
?status=a&status=b   => {"status":["a","b"]}
?filter[x]=1         => {"filter[x]":"1"}
~~~

- الرقم وصل **نص** [["100"]].
- الاسم المتكرر وصل **array**.
- الأقواس المربعة فضلت جزء من الاسم، لأن الـ query parser الافتراضي في Express 5 هو البسيط ([[simple]]). في Express 4 كان الافتراضي [[extended]] وكان بيعملها object. يعني شكل [[req.query]] مش مضمون، وعشان كده Zod قبل أي استخدام.

---

## ٢. الـ whitelist: [[ListQuery]]

~~~ts
const ListQuery = z.object({
  status: z.enum(["pending", "paid", "shipped"]).optional(),
  minTotal: z.coerce.number().nonnegative().optional(),
  q: z.string().trim().min(2).max(100).optional(),
  sort: z.enum(["createdAt", "-createdAt", "total", "-total"]).default("-createdAt"),
});
~~~

| الحقل | القاعدة | ليه |
|---|---|---|
| [[status]] | [[z.enum([...])]]: واحدة من ٣ قيم بالظبط | مفيش حالة مخترعة |
| [[minTotal]] | [[coerce.number()]] و [[nonnegative()]] (مش سالب) | النص يبقى رقم، ومفيش [[-1]] |
| [[q]] | [[trim()]] يشيل المسافات من الأطراف، وبعدين من ٢ لـ ١٠٠ حرف | بحث بحرف واحد بيرجّع نص الجدول |
| [[sort]] | ٤ اختيارات بس، والافتراضي [[-createdAt]] | مفيش ترتيب بأي عمود |

و [[.optional()]] معناها الفلتر ده مش لازم. و [[z.object]] بيرمي أي حقل مش متعرّف فيه من النتيجة.

---

## ٣. الـ handler

~~~ts
  const { status, minTotal, q, sort } = ListQuery.parse(req.query);
  const field = sort.replace("-", "") as "createdAt" | "total";
~~~

- الحقول اللي مش مبعوتة بتبقى [[undefined]] (إلا [[sort]] ليه default).
- [[sort.replace("-", "")]]: شيل الشرطة، فـ [["-total"]] يبقى [["total"]].
- [[as "createdAt" | "total"]]: كلام لـ TypeScript بس، «النوع واحد من الاتنين دول». مبيعملش حاجة وقت التشغيل.

~~~ts
    where: { userId: req.user.id, status, total: minTotal === undefined ? undefined : { gte: minTotal }, customerName: q ? { contains: q, mode: "insensitive" } : undefined },
~~~

| الشرط | معناه |
|---|---|
| [[userId: req.user.id]] | من التوكن، مش من العميل. ثابت دايمًا |
| [[status]] | لو undefined، Prisma بيتجاهله |
| [[total: { gte: minTotal }]] | [[gte]] = greater than or equal، أكبر من أو يساوي |
| [[customerName: { contains: q, mode: "insensitive" }]] | الاسم فيه النص ده، من غير فرق بين capital و small |

[[mode: "insensitive"]] على Postgres بيتحول لـ [[ILIKE]] (من docs Prisma).

~~~ts
    orderBy: [{ [field]: sort.startsWith("-") ? "desc" : "asc" }, { id: "asc" }], take: 50,
~~~

- [[{ [field]: ... }]] الأقواس المربعة حوالين اسم الحقل اسمها computed key: اسم الحقل هو **قيمة** المتغير [[field]]، يعني [[{ total: "desc" }]].
- [[startsWith("-")]]: لو فيه شرطة يبقى تنازلي ([[desc]])، وإلا تصاعدي ([[asc]]).
- [[{ id: "asc" }]] للتعادل، و [[take: 50]] سقف.

---

## ٤. نشغّله

[[TOKEN]] في الأوامر متغير bash فيه توكن [[u1]].

### الترتيب بالمجموع تنازلي

~~~bash
curl -s "localhost:6004/orders?sort=-total" -H "Authorization: Bearer $TOKEN"
~~~

~~~text الناتج (مختصر)
{"items":[{"id":"o3",...,"total":900,...},{"id":"o1",...,"total":120,...},{"id":"o2",...,"total":40,...}]}
~~~

ومن غير [[sort]] الافتراضي الأحدث الأول: [[o3 2026-03-03, o2 2026-03-02, o1 2026-03-01]].

### بحث ومبلغ مع بعض

~~~bash
curl -s "localhost:6004/orders?q=AHMED&minTotal=100" -H "Authorization: Bearer $TOKEN"
~~~

~~~text الناتج (الـ id والاسم والمجموع)
o3 ahmed samir 900, o1 Ahmed Ali 120
~~~

[[AHMED]] لقى [[ahmed samir]] و [[Ahmed Ali]] (insensitive)، و [[minTotal=100]] شال طلب الـ ٤٠.

### المرفوض

~~~text الناتج (errors بس، وكلهم 422)
?sort=password       {"code":"invalid_value","values":["createdAt","-createdAt","total","-total"],"path":["sort"],...}
?status=deleted      {"code":"invalid_value","values":["pending","paid","shipped"],"path":["status"],...}
?q=a                 {"origin":"string","code":"too_small","minimum":2,"path":["q"],...}
?minTotal=-1         {"origin":"number","code":"too_small","minimum":0,"path":["minTotal"],...}
?status=paid&status=shipped   {"code":"invalid_value",...,"path":["status"],...}
~~~

الأخير مهم: الـ array اللي شفناه في أول الدرس مش واحدة من القيم المسموحة، فاترفض بدل ما يوصل للقاعدة بشكل غريب.

### محاولة تشوف طلبات حد تاني

~~~bash
curl -s "localhost:6004/orders?userId=u2" -H "Authorization: Bearer $TOKEN"
~~~

~~~text الناتج (الـ id وصاحبه)
o3:u1, o2:u1, o1:u1
~~~

[[userId]] مش في الـ schema، فـ [[z.object]] شاله، والشرط الثابت من التوكن هو اللي اتطبق. طلب [[u2]] (الـ ٥٠٠٠) مظهرش.

---

## ٥. ليه الترتيب لازم whitelist؟

لو [[sort]] كان [[z.string()]] على جدول مستخدمين، [[?sort=passwordHash]] مش هيرجّع الـ hash نفسه، بس **ترتيب** النتايج بيقول مين الـ hash بتاعه أكبر من مين. المهاجم يعمل حسابات بباسوردات يعرفها، ويشوف الضحية بينهم فين، ويضيّق المدى. ده اسمه sort oracle. والسبب التاني: الترتيب بعمود مالوش index على جدول كبير بيخلي القاعدة تلف على الجدول كله.

---

## الخلاصة

| الحتة | الفكرة |
|---|---|
| [[z.object({...})]] | الفلاتر المسموحة بس، والباقي بيتشال |
| [[z.enum]] | قيم محددة (حالة، وترتيب) |
| [[z.coerce.number()]] | الأرقام بتوصل نصوص |
| [[-total]] | الشرطة = تنازلي |
| [[userId: req.user.id]] | الملكية من التوكن، مش من الـ query |
| [[undefined]] في [[where]] | Prisma بيتجاهل الفلتر |
| [[{ id: "asc" }]] و [[take]] | ترتيب ثابت وسقف |

- متبعتش [[req.query]] لـ [[where]] زي ما هو أبدًا.
- الترتيب نفسه ممكن يسرّب بيانات.`,
          lines: [
            "كل الفلاتر المسموحة في مكان واحد.",
            "الحالة من قايمة ثابتة بس.",
            "أقل مبلغ: رقم مش سالب.",
            "بحث نصي: من ٢ لـ ١٠٠ حرف.",
            "الترتيب من ٤ اختيارات بس، والافتراضي الأحدث الأول.",
            "قفلة.",
            "الـ endpoint، ومحتاج تسجيل دخول.",
            "اقرا واتحقق. أي فلتر مش في الـ schema بيتشال.",
            "اسم الحقل من غير العلامة.",
            "الاستعلام.",
            "شرط الملكية ثابت، والفلاتر اللي مش مبعوتة undefined و Prisma بيتجاهلها.",
            "الترتيب المطلوب، و id كـ tie-breaker، وحد ٥٠ (أو pagination من الدرسين اللي فاتوا).",
            "قفلة.",
            "الرد.",
            "قفلة."
          ],
          sol: R`[[?sort=-total]] بيرجّع طلباتك من الأكبر للأصغر ([[900]] ثم [[120]] ثم [[40]]). و [[?sort=password]] بيرجّع 422 بـ [[invalid_value]] والقيم المسموحة، وكذلك [[?status=deleted]]. وجرّب كمان [[?userId=u2]]: هترجع طلباتك انت بس، لأن [[z.object]] بتشيل أي حقل مش متعرّف، وشرط الملكية ثابت من التوكن.

إجابة سؤال التفكير: هيعرف الـ hash نفسه، حرف حرف. الترتيب بيكشف مقارنة: لو المهاجم عمل حسابات بباسوردات يعرفها (فيعرف الـ hash بتاعها)، وطلب [[?sort=passwordHash]]، مكان الضحية بين حساباته بيقوله الـ hash بتاعها أكبر ولا أصغر من كل واحد. ولو كرر بحسابات جديدة، بيضيّق المدى زي binary search لحد ما يطلّع الـ hash، وبعدها يعمل brute force عليه offline. ونفس الكلام على [[resetToken]] وأي حقل سري. ده اسمه sort oracle: ترتيب شكله «بريء» بيتحول لتسريب.

والإجابة القوية في الانترفيو: الـ whitelist بتحمي من حاجتين، التسريب ده، والترتيب بعمود من غير index على جدول كبير (full scan). ومتعتمدش على «مش هنرجّع الحقل ده في الرد»: الترتيب بيكشفه من غير ما يظهر.`,
          solCode: R`curl -s "localhost:3000/orders?sort=-total" -H "Authorization: Bearer $TOKEN"
# {"items":[{"total":900,...},{"total":120,...},{"total":40,...}]}

curl -s "localhost:3000/orders?sort=password" -H "Authorization: Bearer $TOKEN"
# 422: "code":"invalid_value","values":["createdAt","-createdAt","total","-total"],"path":["sort"]

curl -s "localhost:3000/orders?status=deleted" -H "Authorization: Bearer $TOKEN"
# 422: "code":"invalid_value","values":["pending","paid","shipped"],"path":["status"]

curl -s "localhost:3000/orders?userId=u2" -H "Authorization: Bearer $TOKEN"
# 200 بطلباتك انت بس: z.object شالت userId، والشرط الثابت هو اللي اتطبق`
        }
      ]
    }
]);
