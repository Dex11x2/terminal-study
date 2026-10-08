// تكملة تاب arch: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/arch/01.js (شرح حقول الدرس في أوله)
MORE("arch", [
    {
      t: "الأمان والأداء",
      l: 3,
      n: "قبل الإطلاق: الحماية على مستوى التطبيق كله، والكاش، والاستعلامات البطيئة، وسرعة الصفحة عند الزائر",
      items: [
        {
          cmd: "security baseline",
          title: "طبقات حماية بتتحط مرة واحدة في app.ts",
          desc: R`فيه حماية بتتحط مرة واحدة على التطبيق كله، بالترتيب الصح. headers أمان، و CORS لدومين الواجهة بس، وحد لحجم الـ body، و rate limit على الـ auth، و trust proxy عشان الـ IP الحقيقي يوصل من ورا Nginx. وبعد كده كل ميزة ليها أسئلة أمان خاصة بيها، والـ deep فيه قايمة لميزات المنتج ده.

OWASP والتشيك ليست العامة في تاب «الأمان».`,
          example: R`import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

const app = express();
app.set("trust proxy", "loopback");
app.use(helmet());
app.use("/webhooks", webhooksRouter);
app.use(cors({ origin: [config.WEB_ORIGIN], credentials: true }));
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());
app.use("/auth", rateLimit({ windowMs: 15 * 60e3, limit: 20, standardHeaders: "draft-8", legacyHeaders: false }));
app.use(routes);
app.use(errorHandler);`,
          try: R`ابعت ٢١ طلب login ورا بعض، والأخير لازم يرجع 429. بعدين ابعت طلب من origin تاني بـ [[curl -H "Origin: https://evil.example"]] وبص على الـ headers اللي رجعت. وابعت JSON حجمه ميجا، ولازم يرجع 413.`,
          flag: "script",
          deep: {
            why: "الحماية اللي بتتعمل في كل route لوحده لازم هتتنسي في route. أما اللي على مستوى التطبيق فبتتحط مرة واحدة، وبتحمي أي route جديد لوحدها. وكل ميزة في المنتج بتفتح باب مختلف، ولازم تسأل عليه وانت بتبنيها، مش بعد الإطلاق.",
            how: R`الترتيب مقصود. [[trust proxy]] بـ [["loopback"]] معناها: صدّق X-Forwarded-For بس لو الاتصال نفسه جاي من [[127.0.0.1]] أو [[::1]]، يعني من Nginx على نفس السيرفر، فـ [[req.ip]] بيبقى IP الزائر الحقيقي. من غيرها، كل الناس هيبقى ليهم IP الـ Nginx، والـ rate limit هيقفل الموقع كله بسبب شخص واحد. وبلاش [[1]] («صدّق أول hop مهما كان»): لو التطبيق اتفتح للإنترنت من غير Nginx (port مكشوف، أو حد شال الـ proxy)، أي حد يبعت X-Forwarded-For مزيف ويعدّي الـ rate limit. ولو الـ proxy في container تاني أو load balancer، حط الـ subnet بتاعه بدل loopback (مثلًا [[["loopback", "172.18.0.0/16"]]]). والـ webhooks قبل CORS والـ json لأن البوابة سيرفر مش متصفح، ولأن كل بوابة ليها parser خاص (Stripe محتاجة [[express.raw]]).

[[helmet]] بيحط headers زي HSTS، و nosniff، و frame-ancestors. و CORS بقايمة origins محددة مع credentials، ومينفعش [[*]]. و [[limit: "100kb"]] بيمنع حد يبعت JSON بـ ١٠٠ ميجا يملّي الرام. والـ rate limit هنا في الذاكرة، ولما يبقى عندك أكتر من نسخة لازم store في Redis.

وأسئلة الأمان لكل ميزة في المنتج ده:
الـ auth: rate limit، ورسالة واحدة للغلط، والتوكنات فين، والـ reset مرة واحدة.
الدفع: السعر من السيرفر، والـ HMAC، والمبلغ، والحالة الذرية.
الرفع: قايمة أنواع، وحجم حقيقي، و bucket مش public، وممنوع SVG و HTML من المستخدمين.
الـ realtime: التحقق في الـ handshake، والتأكد من العضوية قبل join.
الأدمن: الدور من القاعدة، و 2FA، و audit log.
البحث: validation، وترتيب من قايمة، ومفيش نصوص بتتلزق في query.
المحتوى اللي بيكتبه المستخدم: React بيعمل escape لوحده، والخطر في [[dangerouslySetInnerHTML]] وفي أي داتا بتتحط جوه [[<script>]].`,
            when: "أول ما تعمل app.ts. وراجع قايمة الميزات دي مع كل ميزة جديدة، وقبل الإطلاق مع التشيك ليست في تاب «الأمان».",
            mistakes: R`في مشاريع حقيقية لقينا ٤ غلطات. rate limiter بيثق في أول قيمة في X-Forwarded-For، والقيمة دي أي حد يقدر يكتبها بنفسه ويعدّي الحد. و routes تطوير فضلت في الإنتاج، واحدة بترمي error عن قصد عشان تجرب Sentry (أي حد يقدر يستهلك الكوتة بيها)، وواحدة بتعرض المستخدمين. واسم المستخدم بيتكتب جوه [[<script>]] في الصفحة من غير escape، فأي حد يكتب اسمه كود JavaScript يشتغل عند كل اللي يشوفوه (stored XSS). وتوكن «افتكرني» متخزن في القاعدة زي ما هو، في cookie من غير secure.`
          },
          teach: R`## ترتيب الـ middleware في app.ts هو الحماية

كل [[app.use]] بيتنفذ بالترتيب لكل طلب، فالترتيب نفسه جزء من الأمان. جربنا الملف ده بـ Express 5 و helmet 8 و cors 2.8 و express-rate-limit 8.7 و cookie-parser (ويندوز 11، Node 24) على [[localhost:6020]]، وأوامر الـ solCode بـ curl من Git Bash. الـ routes في التجربة: [[/auth/login]] بيرجع 401 دايمًا، و [[/courses]]، و webhook وهمي.

---

## ١. الـ imports

[[helmet]] (headers أمان)، و [[cors]]، و [[cookieParser]] (بيقرا الـ cookies في [[req.cookies]])، و [[{ rateLimit }]] (named export من express-rate-limit).

---

## ٢. [[app.set("trust proxy", "loopback");]]

ورا Nginx، الاتصال اللي بيوصل لـ Express جاي من Nginx، مش من الزائر. Nginx بيكتب IP الزائر في header اسمه [[X-Forwarded-For]] (XFF). و [[trust proxy]] بيقول لـ Express إمتى يصدّق الـ header ده. [[loopback]] اسم جاهز في Express معناه [[127.0.0.1/8]] و [[::1]]: «صدّق الـ XFF بس لو الاتصال نفسه جاي من نفس الجهاز». بعدها [[req.ip]] بيبقى IP الزائر مش IP الـ Nginx.

النسخة الأولى من الدرس كانت [[app.set("trust proxy", 1)]]: «صدّق أول hop قدامي، مين ما كان». جربنا الاتنين من غير Nginx: التطبيق في container (Node 22) على شبكة Docker، والمهاجم container تاني بيبعت ٢١ طلب login، وبعدين طلبين بـ XFF مزيف. وبعدين طلب من [[127.0.0.1]] جوه نفس الـ container، زي ما Nginx على نفس السيرفر هيعمل:

~~~text الناتج
=== trust proxy = 1
401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 429
XFF 1.2.3.4: 401 {"ip":"1.2.3.4","socket":"172.20.0.5"}
XFF 5.6.7.8: 401 {"ip":"5.6.7.8","socket":"172.20.0.5"}
--- from 127.0.0.1 (like Nginx on the same server):
401 {"ip":"9.9.9.9","socket":"127.0.0.1"}
=== trust proxy = loopback
401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 429
XFF 1.2.3.4: 429
XFF 5.6.7.8: 429
--- from 127.0.0.1 (like Nginx on the same server):
401 {"ip":"9.9.9.9","socket":"127.0.0.1"}
~~~

- [[socket]] هو IP الاتصال الحقيقي ([[req.socket.remoteAddress]])، و [[ip]] هو [[req.ip]] اللي الـ rate limit بيعد بيه.
- بـ [[1]]: المهاجم اتقفل بعد ٢٠، فكتب [[X-Forwarded-For: 1.2.3.4]] وبقى «زائر جديد» (401 مش 429)، وكل رقم جديد = ٢٠ محاولة باسورد كمان.
- بـ [[loopback]]: الاتصال جاي من [[172.20.0.5]]، مش loopback، فالـ header اتجاهل، وفضل 429.
- والطلب من [[127.0.0.1]]: الاتنين صدّقوا [[9.9.9.9]]، يعني ورا Nginx على نفس السيرفر [[loopback]] شغال زي [[1]] بالظبط.

ولو الـ proxy مش على نفس الجهاز (container تاني، أو load balancer)، حط الـ IP أو الـ subnet بتاعه: [[app.set("trust proxy", ["loopback", "172.18.0.0/16"])]].

---

## ٣. [[app.use(helmet());]]

بيحط حوالي ١٣ header على كل رد:

~~~text الناتج (من رد /courses)
Content-Security-Policy: default-src 'self';base-uri 'self';...;frame-ancestors 'self';object-src 'none';script-src 'self';...
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: no-referrer
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
~~~

| الـ header | بيمنع إيه |
|---|---|
| [[Content-Security-Policy]] | سكربتات من دومينات تانية، و [[frame-ancestors]] بيمنع حد يحطك في iframe |
| [[Strict-Transport-Security]] | المتصفح يكلّمك HTTP عادي سنة كاملة ([[31536000]] ثانية) |
| [[X-Content-Type-Options: nosniff]] | المتصفح يخمّن نوع الملف (ملف نصي يتشغّل JS) |
| [[X-Frame-Options]] | نفس فكرة frame-ancestors للمتصفحات القديمة |

ومفيش [[X-Powered-By: Express]]: helmet شاله، فمش بتعلن إنت شغال على إيه.

---

## ٤. [[app.use("/webhooks", webhooksRouter);]]

قبل CORS والـ JSON العام، لأن البوابة سيرفر مش متصفح، وكل بوابة ليها parser (Stripe عايزة [[express.raw]]). في التجربة الـ webhook عنده [[express.json()]] بتاعه، وحده الافتراضي ١٠٠ كيلو برضه:

~~~text الناتج
{"error":{"code":"TOO_LARGE","message":"الطلب كبير"}} 413   ← /webhooks/paymob
~~~

---

## ٥. [[app.use(cors({ origin: [config.WEB_ORIGIN], credentials: true }));]]

- [[origin]]: array فيها دومين الواجهة بس ([[http://localhost:3000]] في التجربة).
- [[credentials: true]]: المتصفح يقدر يبعت cookies ويقرا الرد. ومعاها مينفعش [[*]].

~~~text الناتج
--- evil origin:
HTTP/1.1 200 OK
Vary: Origin
Access-Control-Allow-Credentials: true
(مفيش Access-Control-Allow-Origin)
--- good origin:
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
~~~

الطلب من [[evil.example]] رجع **200** والسيرفر نفّذه عادي. الفرق إن [[Access-Control-Allow-Origin]] مش موجود، فالمتصفح مش هيدّي الصفحة الغريبة الرد. CORS قرار المتصفح، مش حماية للسيرفر من curl. و [[Vary: Origin]] بيقول للـ CDN إن الرد بيختلف حسب الـ Origin فميخلطش بينهم.

---

## ٦. [[app.use(express.json({ limit: "100kb" }));]]

~~~text الناتج
1000008                                          ← حجم big.json بالـ byte
{"error":{"code":"TOO_LARGE","message":"الطلب كبير"}} 413
~~~

[[node -e '...JSON.stringify({ x: "a".repeat(1e6) })' > big.json]] عمل ملف ميجا تقريبًا (مليون [[a]] + ٨ حروف الـ JSON). الـ parser رمى خطأ [[type: "entity.too.large"]]، والـ error handler بتاعنا حوّله 413 (Payload Too Large).

## ٧. [[app.use(cookieParser());]]

بيقرا header الـ [[Cookie]] ويحطه object في [[req.cookies]] (منه بيتقري الـ refresh token).

---

## ٨. [[app.use("/auth", rateLimit({ windowMs: 15 * 60e3, limit: 20, standardHeaders: "draft-8", legacyHeaders: false }));]]

- [["/auth"]]: على مسارات الـ auth بس.
- [[windowMs: 15 * 60e3]]: [[60e3]] = ٦٠٠٠٠ ملّي = دقيقة، يعني ربع ساعة.
- [[limit: 20]]: ٢٠ طلب لكل IP في الربع ساعة.
- [[standardHeaders: "draft-8"]]: headers بالشكل الجديد [[RateLimit]] و [[RateLimit-Policy]]، و [[legacyHeaders: false]] يلغي القديمة ([[X-RateLimit-*]]).

~~~text الناتج
401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 401 429
HTTP/1.1 429 Too Many Requests
RateLimit: "20-in-15min"; r=0; t=899
RateLimit-Policy: "20-in-15min"; q=20; w=900; pk=:YmIwY2Q1MTM2YWU1:
Retry-After: 899
~~~

- [[r=0]] فاضل صفر طلبات، و [[t=899]] ثانية لحد ما النافذة تتصفّر.
- [[q=20]] الحد، و [[w=900]] النافذة بالثواني.
- [[Retry-After]] نفس الرقم بالثواني.

والرد نفسه نص مش JSON: [[Too many requests, please try again later.]]. لو الواجهة بتتوقع شكل الأخطاء بتاعك، ضيف [[handler]] أو [[message]] بالـ JSON في الإعدادات.

---

## ٩. [[app.use(routes);]] و [[app.use(errorHandler);]]

الـ routes بعد كل الحمايات، والـ error handler **آخر** حاجة: Express بيعرفه لأنه دالة بـ ٤ arguments، وبيوصله أي خطأ من أي حاجة قبله.

---

## الخلاصة

| السطر | اللي شفناه |
|---|---|
| [[trust proxy, "loopback"]] | IP صح ورا Nginx على نفس الجهاز، و XFF مزيّف من برّه بيتجاهل |
| [[helmet()]] | CSP و HSTS و nosniff، ومفيش X-Powered-By |
| webhooks الأول | parser خاص لكل بوابة |
| [[cors]] | الرد بيرجع 200، بس من غير Allow-Origin للغريب |
| [[limit: "100kb"]] | ميجا → 413 |
| [[rateLimit]] | الطلب ٢١ → 429 و [[Retry-After: 899]] |
| [[errorHandler]] آخر | بيلقط كل حاجة |`,
          lines: [
            "headers الأمان.",
            "CORS.",
            "قراية الـ cookies (الـ refresh token).",
            "الـ rate limiter.",
            "التطبيق.",
            "صدّق X-Forwarded-For بس لو الاتصال جاي من نفس الجهاز (Nginx)، فـ req.ip يبقى IP الزائر الحقيقي، ومحدش من برّه يقدر يزوّره.",
            "headers الأمان على كل الردود.",
            "الـ webhooks قبل CORS والـ json، لأن كل بوابة ليها parser خاص.",
            "CORS لدومين الواجهة بس، ومعاه cookies.",
            "JSON لحد ١٠٠ كيلو بس.",
            "اقرا الـ cookies.",
            "٢٠ طلب كل ربع ساعة لكل IP على مسارات الـ auth.",
            "كل الـ routes.",
            "الـ error handler في الآخر خالص."
          ],
          sol: R`الـ login: أول ٢٠ طلب بيرجعوا الرد العادي (401 لو الباسورد غلط)، والـ ٢١ بيرجع [[429]] ومعاه headers زي [[RateLimit: "20-in-15min"; r=0; t=900]] و [[Retry-After: 900]] (ده شكل draft-8). لو كل الطلبات عدّت، اتأكد إن الـ rateLimit متسجّل قبل الـ routes، وإن [[trust proxy]] مظبوط لو ورا Nginx، وإلا كل الناس ليهم نفس الـ IP.

الـ origin الغريب: الطلب بيرجع [[200]] عادي! بس مفيش [[Access-Control-Allow-Origin]] في الرد، فالمتصفح هو اللي بيمنع الصفحة الغريبة إنها تقرا الرد. يعني CORS مش حماية للسيرفر، ده قرار المتصفح. هتلاقي كمان headers الـ helmet زي [[Content-Security-Policy]] و [[Strict-Transport-Security]]، ومفيش [[X-Powered-By]]. ومن [[http://localhost:3000]] هتلاقي [[Access-Control-Allow-Origin: http://localhost:3000]] و [[Access-Control-Allow-Credentials: true]].

الـ JSON الـ ١ ميجا بيرجع [[413]] و [[TOO_LARGE]]. لو رجع 500، يبقى الـ errorHandler بتاعك مش بيتعامل مع [[err.type === "entity.too.large"]] (السطر ده موجود في درس «شكل الأخطاء»)، والـ body parser رمى خطأ الـ handler مش فاهمه.`,
          solCode: R`for i in $(seq 1 21); do
  curl -s -o /dev/null -w '%{http_code} ' -H "Content-Type: application/json" -d '{"email":"a@b.c","password":"x"}' localhost:4000/auth/login
done; echo
# 401 401 ... 401 429

curl -s -D - -o /dev/null -H "Origin: https://evil.example" localhost:4000/courses

node -e 'process.stdout.write(JSON.stringify({ x: "a".repeat(1e6) }))' > big.json
curl -s -w ' %{http_code}\n' -H "Content-Type: application/json" --data-binary @big.json localhost:4000/courses
# {"error":{"code":"TOO_LARGE",...}} 413`
        },
        {
          cmd: "طبقات الكاش",
          title: "كل طلب يتخدم من أقرب مكان ممكن",
          desc: R`الكاش ليه طبقات. المتصفح والـ CDN بيحفظوا الردود العامة بـ [[Cache-Control]]. والتطبيق بيحفظ نتايج الاستعلامات في Redis. والقاعدة عندها كاش خاص بيها في الرام. أشهر نمط في التطبيق اسمه cache-aside: دوّر في الكاش الأول، ولو مش موجود هات من القاعدة واحفظ بـ TTL. ولما الداتا تتغير، امسح الـ key.`,
          example: R`const reviveDates = (k, v) => (typeof v === "string" && k.endsWith("At") ? new Date(v) : v);
export async function getCourse(slug) {
  const key = $__btcourse:$__{slug}:v1$__bt;
  const hit = await redis.get(key);
  if (hit) return JSON.parse(hit, reviveDates);
  const course = await db.course.findUnique({ where: { slug }, include: { lessons: { select: { id: true, title: true, isPreview: true } } } });
  if (course) await redis.set(key, JSON.stringify(course), "EX", 300);
  return course;
}
export async function updateCourse(id, data) {
  const course = await db.course.update({ where: { id }, data });
  await redis.del($__btcourse:$__{course.slug}:v1$__bt);
  return course;
}`,
          try: R`قيس زمن [[GET /courses/:slug]] ١٠٠ مرة من غير كاش ومع كاش. بعدين عدّل عنوان الكورس من الأدمن، وتأكد إن الصفحة جابت الجديد على طول. بعدين علّق سطر الـ del وكرر، ولاحظ إن القديم فضل ٥ دقايق.`,
          flag: "script",
          deep: {
            why: "صفحة الكورس بتتفتح آلاف المرات وبتتغير مرة في الأسبوع. لو كل فتحة بتسأل القاعدة بـ join، القاعدة هتتعب على داتا مبتتغيرش. الكاش بيشيل الحمل ده عنها.",
            how: R`ابدأ من أقرب طبقة للزائر:

١. المتصفح والـ CDN: الـ API العام يرد بـ [[Cache-Control: public, max-age=60, stale-while-revalidate=300]]، يعني الـ CDN يخدم النسخة دقيقة، وبعدها يخدم القديمة وهو بيجيب الجديدة في الخلفية. وأي حاجة خاصة بمستخدم ([[/me/...]]) بترد بـ [[private, no-store]]. والملفات اللي في اسمها hash ([[app.3f9a.js]]) بتتكاش سنة بـ [[immutable]].

٢. Next.js عنده الكاش بتاعه لنتايج الـ fetch والصفحات. التفاصيل في تاب «Next.js».

٣. Redis في التطبيق: المثال. الـ TTL شبكة أمان لو نسيت تمسح في مكان. و [[:v1]] في الـ key بيخليك تلغي كل الكاش القديم مرة واحدة لو شكل الداتا اتغير. و [[redis]] هنا عميل ioredis تاني في [[lib/redis.ts]] بالإعدادات العادية، مش اتصال BullMQ اللي فيه [[maxRetriesPerRequest: null]] (ده بيخلي أي أمر يستنى للأبد لو Redis وقع). وخلي [[enableOfflineQueue: false]] ولفّ الـ get والـ set في try/catch، عشان لو Redis وقع تكمّل من القاعدة.

٤. القاعدة: الـ indexes وكاش الصفحات بتاعها في الرام. ده الدرس الجاي.

مشاكل لازم تعرفها. الـ stampede: الـ key يخلص، وألف طلب يلاقوه فاضي مع بعض، فيروحوا كلهم للقاعدة في نفس اللحظة. الحل lock، أو stale-while-revalidate، أو TTL فيه عشوائية بسيطة. ولو Redis وقع، التطبيق لازم يكمّل من القاعدة، أبطأ بس شغال. وأي حاجة فيها فلوس، زي السعر وقت إنشاء الطلب، بتتقري من القاعدة دايمًا، مش من الكاش.`,
            when: "بعد ما تقيس وتلاقي حاجة بتتقري كتير وبتتغير قليل. متحطش كاش على كل حاجة من أول يوم.",
            mistakes: R`إنك تكاش داتا مستخدم تحت key مشترك، فمستخدم يشوف داتا غيره، ودي أخطر غلطة كاش. أو كاش من غير TTL ومن غير مسح. أو الـ CDN يكاش رد فيه [[Set-Cookie]]. وفي مشروع حقيقي، الـ service worker كان cache-first باسم نسخة ثابت في الكود، فالزوار فضلوا يشوفوا المحتوى القديم لحد ما حد يفتكر يغيّر الرقم يدوي. وفي مشاريع Next.js اللي راجعناها مكانش فيه أي كاش للداتا خالص، فكل زيارة بتسأل القاعدة.`
          },
          teach: R`## cache-aside: دوّر في Redis، ولو مش موجود هات من القاعدة واحفظ

[[getCourse]] بتسأل Redis الأول، ولو ملقتش بتجيب الكورس بدروسه من القاعدة وتحفظه ٥ دقايق. و [[updateCourse]] بتعدّل في القاعدة وتمسح الـ key. جربناهم بـ ioredis 6 على Redis 8 و Prisma 7 على PostgreSQL 18 (الاتنين Docker، ويندوز 11، Node 24)، على كورس فيه ٢٢ درس، وشغّلنا قياس الـ solCode.

---

## ٠. [[const reviveDates = (k, v) => (typeof v === "string" && k.endsWith("At") ? new Date(v) : v);]]

دالة صغيرة هنديها لـ [[JSON.parse]] في الخطوة ٢ (اسمها reviver). [[JSON.parse]] بيناديها مع كل حقل: [[k]] اسم الحقل، و [[v]] قيمته، واللي بترجعه هو اللي بيتحط. لو الحقل نص واسمه بيخلص بـ [[At]] ([[createdAt]] و [[updatedAt]] و [[paidAt]]...)، رجّعه [[new Date(v)]]. غير كده سيبه زي ما هو. السبب في الخطوة ٢.

## ١. [[const key = $__btcourse:$__{slug}:v1$__bt;]]

اسم الـ key: نوع الحاجة، والـ slug، ورقم نسخة. لو شكل الداتا المتخزنة اتغير (ضفت حقل)، بتغيّر [[v1]] لـ [[v2]] في الكود، فكل القديم بيتجاهل لوحده ويموت بالـ TTL.

## ٢. [[const hit = await redis.get(key);]] و [[if (hit) return JSON.parse(hit, reviveDates);]]

Redis بيخزن نصوص، فبنحفظ JSON ونفكه. لو [[hit]] بـ [[null]] (مش موجود) نكمّل للقاعدة.

والـ JSON مفيهوش نوع Date: [[JSON.stringify]] بيحوّل الـ [[Date]] لنص زي [["2026-10-08T11:30:12.345Z"]]، و [[JSON.parse]] العادي بيسيبه نص. النسخة الأولى من الدرس كانت [[JSON.parse(hit)]] بس، وجربنا الفرق:

~~~text الناتج
plain parse  | db: Date | cache: String string
   TypeError: b.createdAt.getFullYear is not a function
with reviver | db: Date | cache: Date object
   cache createdAt.getFullYear(): 2026
~~~

يعني نفس الدالة بترجع [[Date]] أول مرة (من القاعدة) ونص تاني مرة (من الكاش)، وأي كود بيعمل [[course.createdAt.getTime()]] كان هيقع لما الرد ييجي من الكاش بس، وده bug مبيظهرش في أول تجربة. الـ [[reviveDates]] بيرجّعها [[Date]] في الحالتين. (لو بتبعت الكورس للواجهة JSON على طول، الاتنين هيتحولوا لنفس النص في الآخر، بس الكود اللي في النص بيشوف نفس النوع.)

## ٣. [[db.course.findUnique({ where: { slug }, include: { lessons: { select: { id: true, title: true, isPreview: true } } } })]]

[[include]] بيجيب العلاقة مع الكورس، و [[select]] جواها بيحدد خانات الدروس: من غير [[videoKey]]، عشان الكاش ده عام ومحدش يطلع منه مكان الفيديو.

~~~text الناتج (خانات اللي اتخزن)
id,slug,title,summary,priceCents,published,level,enrollCount,coverKey,coverReady,instructorId,createdAt,lessons | lessons: 22
~~~

## ٤. [[if (course) await redis.set(key, JSON.stringify(course), "EX", 300);]]

- [[if (course)]]: منكاشش [[null]] (slug مش موجود)، وإلا كورس يتعمل بعدها يفضل «مش موجود» ٥ دقايق.
- [["EX", 300]]: ينتهي بعد ٣٠٠ ثانية.

~~~text الناتج
TTL: 300
~~~

[[redis.ttl(key)]] فاضل كام ثانية (-1 لو من غير مدة، و -2 لو مش موجود).

---

## ٥. [[updateCourse]]: عدّل وبعدين امسح

[[db.course.update]] الأول، وبعدين [[redis.del]] بالـ slug اللي رجع من التعديل. الطلب الجاي هيلاقي الكاش فاضي فيجيب الجديد.

~~~text الناتج
with del -> title: SQL 2026 TTL: 300
without del -> title: SQL TTL: 300
~~~

من غير الـ [[del]] (التجربة بتاعة الـ [[try]])، العنوان فضل القديم لحد ما الـ ٣٠٠ ثانية يخلصوا. ده دور الـ TTL: شبكة أمان، مش طريقة التحديث.

---

## ٦. القياس (الـ solCode)

1. [[await getCourse(slug)]] مرة عشان الكاش يتملي.
2. [[performance.now()]] وقت بالملّي بكسور، و ١٠٠ نداء، والمتوسط [[/ 100]].
3. وبعدين ١٠٠ نداء وقبل كل واحد [[redis.del]]، يعني كل مرة من القاعدة.

~~~text الناتج
مع كاش 0.49 ms
من غير كاش 4.28 ms
~~~

حوالي ٩ مرات. والقاعدة هنا على نفس الجهاز ومش عليها ضغط، والرقم التاني فيه كمان أمر [[del]]. في الإنتاج الفرق الأهم إن القاعدة مبتشوفش الطلبات دي أصلًا.

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| اسم فيه نسخة | [[course:$__{slug}:v1]] |
| موجود؟ رجّعه | [[redis.get]] + [[JSON.parse(hit, reviveDates)]] |
| مش موجود؟ القاعدة واحفظ ٥ دقايق | [[redis.set(key, json, "EX", 300)]] |
| اتعدل؟ امسح | [[redis.del(key)]] بعد الـ update |
| نسيت المسح؟ | الـ TTL بيصلّحها بعد ٥ دقايق |

والتواريخ بترجع من JSON نصوص لو مرجّعتهاش بـ reviver، والداتا الخاصة بمستخدم متتحطش تحت key عام.`,
          lines: [
            "JSON مفيهوش تواريخ: أي حقل اسمه بيخلص بـ At وقيمته نص، رجّعه Date.",
            "هات كورس بالـ slug.",
            "الـ key، ومعاه رقم نسخة.",
            "دوّر في Redis.",
            "لقيته؟ رجّعه من غير ما تلمس القاعدة، والتواريخ Date زي ما القاعدة بترجعها.",
            "ملقيتوش؟ هاته من القاعدة بالدروس (من غير روابط الفيديو).",
            "احفظه ٥ دقايق (EX بالثواني).",
            "رجّعه.",
            "قفلة.",
            "تعديل كورس.",
            "عدّل في القاعدة.",
            "امسح الكاش بتاعه، عشان الطلب الجاي يجيب الجديد.",
            "رجّعه.",
            "قفلة."
          ],
          sol: R`من غير كاش كل طلب بيعمل استعلامين (الكورس ودروسه)، ومع كاش بيبقى [[GET]] واحد من Redis. جربناها ١٠٠ مرة على نفس الجهاز (القاعدة و Redis في Docker): حوالي [[0.5]] لـ [[0.8 ms]] مع كاش، و [[4.3]] لـ [[4.7 ms]] من غير (والرقم التاني فيه كمان أمر [[del]] قبل كل طلب). على جهازك القاعدة و Redis قريبين، فالفرق هنا صغير بالأرقام. في الإنتاج، والقاعدة عليها ضغط والاستعلام أتقل، الفرق بيكبر، والأهم إن القاعدة مبتشوفش الطلبات دي أصلًا.

بعد التعديل مع [[redis.del]]: أول طلب بيجيب العنوان الجديد على طول. ولما تعلّق الـ del: الصفحة بتفضل تعرض القديم، و [[TTL course:SLUG:v1]] في redis-cli بيقولك فاضل كام ثانية (لحد 300). بعد ما يخلص، الجديد يظهر لوحده. ده بالظبط دور الـ TTL: شبكة أمان، مش طريقة التحديث.

لو الجديد ظهر على طول حتى من غير del، يبقى الطلب مش بيعدّي على [[getCourse]] أصلًا (مثلًا Next.js بيجيب من القاعدة مباشرة)، أو الـ key بيتكتب بشكل مختلف في المكانين.`,
          solCode: R`// قياس بسيط
const slug = "sql-basics";
await getCourse(slug); // سخّن الكاش
let t = performance.now();
for (let i = 0; i < 100; i++) await getCourse(slug);
console.log("مع كاش", ((performance.now() - t) / 100).toFixed(2), "ms");

await redis.del("course:" + slug + ":v1");
t = performance.now();
for (let i = 0; i < 100; i++) { await redis.del("course:" + slug + ":v1"); await getCourse(slug); }
console.log("من غير كاش", ((performance.now() - t) / 100).toFixed(2), "ms");

// redis-cli TTL course:sql-basics:v1`
        },
        {
          cmd: "indexes و N+1",
          title: "الاستعلام البطيء: لاقيه وصلّحه",
          desc: R`أشهر سببين للبطء: عمود بتفلتر بيه من غير index، فالقاعدة بتقرا الجدول كله (Seq Scan). و N+1، يعني query للقايمة وبعدين query لكل عنصر فيها جوه loop. [[EXPLAIN ANALYZE]] بيوريك القاعدة عملت إيه، و [[pg_stat_statements]] بيوريك أتقل الاستعلامات في الإنتاج.

مثال N+1: [[for (const c of courses) await db.lesson.count({ where: { courseId: c.id } })]]، ده ٢١ query لـ ٢٠ كورس. والحل: [[findMany({ include: { _count: { select: { lessons: true } } } })]]، وده query واحد.`,
          example: R`EXPLAIN ANALYZE SELECT * FROM "Order" WHERE "userId" = 'u_1' ORDER BY "createdAt" DESC LIMIT 20;
CREATE INDEX CONCURRENTLY order_user_created_idx ON "Order" ("userId", "createdAt" DESC);
EXPLAIN ANALYZE SELECT * FROM "Order" WHERE "userId" = 'u_1' ORDER BY "createdAt" DESC LIMIT 20;
SELECT query, calls, round(mean_exec_time) AS ms FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;`,
          try: R`اعمل مليون طلب بسكربت seed. شغّل أول سطر وشوف Seq Scan والوقت. اعمل الـ index وشغّله تاني، وشوف Index Scan والفرق. بعدين شغّل Prisma بـ [[log: ["query"]]] وافتح صفحة فيها loop، وعدّ الاستعلامات في الترمنال.`,
          flag: "script",
          deep: {
            why: "الصفحة اللي كانت بتفتح في ٥٠ ملّي ثانية وفيها ١٠٠ صف، بتاخد ٥ ثواني بمليون صف. والسبب تقريبًا دايمًا index ناقص أو N+1. ومفيش كاش ولا سيرفر أكبر هيحل ده بجد.",
            how: R`اقرا [[EXPLAIN ANALYZE]] من جوه لبرّه. [[Seq Scan]] معناها قرا الجدول كله. و [[Index Scan]] أو [[Index Only Scan]] معناها راح على طول بالـ index. وقارن [[rows]] المتوقعة بالفعلية، و [[actual time]] لكل خطوة. ولو فيه [[Sort]] بعد الـ scan، الـ index مش مغطي الترتيب.

الـ index المركّب ترتيب أعمدته مهم. أعمدة المساواة الأول ([[userId]])، وبعدين عمود الترتيب أو المدى ([[createdAt]]). و [[("userId", "createdAt" DESC)]] بيخدم الـ WHERE والـ ORDER BY والـ LIMIT مع بعض، فالقاعدة بتقرا ٢٠ صف بس.

وكل index ليه تمن: كل insert أو update بيحدّثه. متعملش index على كل عمود.

[[CONCURRENTLY]] بيعمل الـ index من غير ما يقفل الكتابة على الجدول، ودي مهمة في الإنتاج. بس مينفعش جوه transaction، فلو بتعمله بـ Prisma migration، عدّل الـ SQL بإيدك في ملف لوحده. وفي الـ schema نفسها بتكتب [[@@index([userId, createdAt(sort: Desc)])]].

[[pg_stat_statements]] extension محتاج يتفعّل على السيرفر، والقواعد المُدارة (managed) غالبًا بتفعّله. وبيجمع كل query بشكل عام من غير القيم، وعدد مرات تشغيله، ومتوسط وقته. رتّب بـ [[total_exec_time]]: query سريعة بتتنادى مليون مرة ممكن تبقى أتقل من واحدة بطيئة بتتنادى مرة.

التفاصيل في تاب «PostgreSQL» وتاب «SQL و Prisma».`,
            when: "لما صفحة تبطأ، أو Sentry يوريك endpoint بطيء. وراجع أتقل ١٠ استعلامات مرة في الشهر.",
            mistakes: R`إنك تحط كاش على استعلام بطيء بدل ما تصلّحه. أو index على كل عمود. أو [[CREATE INDEX]] من غير CONCURRENTLY على جدول كبير في الإنتاج، فتقف الكتابة دقايق. أو [[WHERE lower(email) = ...]] من غير expression index على [[lower(email)]]. وفي مشروع حقيقي، أعمدة عليها [[@unique]] كان عليها [[@@index]] كمان، والـ unique أصلًا بيعمل index، فبقوا اتنين بيتحدّثوا مع كل كتابة.`
          },
          teach: R`## ٤ أوامر SQL: شوف الخطة، اعمل index، شوف تاني، ودوّر على الأتقل

جربنا الأربع سطور على PostgreSQL 18 في Docker بـ [[psql]]، على مليون طلب لـ ١٠ آلاف مستخدم (seed الـ solCode)، والـ container متشغّل بـ [[-c shared_preload_libraries=pg_stat_statements]]. وجزء الـ N+1 جربناه بـ Prisma 7 (ويندوز 11، Node 24).

> الـ seed القديم في الـ solCode كان بيعمل طلبات لـ [[u_0]] لحد [[u_9999]] من غير ما المستخدمين يبقوا موجودين، وجدول [[Order]] عليه foreign key لـ [[User]]، فوقع: [[ERROR: insert or update on table "Order" violates foreign key constraint "Order_userId_fkey"]]. ضفنا [[INSERT INTO "User"]] قبله. والـ INSERT بتاع المليون خد حوالي ١٥ ثانية.
>
> ولو عامل الـ schema بتاعة درس «schema.prisma»، فيها أصلًا [[@@index([userId, createdAt])]] على Order، فاحذفه الأول عشان تشوف الفرق.

---

## ١. [[EXPLAIN ANALYZE SELECT * FROM "Order" WHERE "userId" = 'u_1' ORDER BY "createdAt" DESC LIMIT 20;]]

[[EXPLAIN]] بيوريك الخطة اللي القاعدة اختارتها، و [[ANALYZE]] بينفّذ الاستعلام فعلًا ويكتب الأوقات الحقيقية.

~~~text الناتج (مختصر)
Limit (actual time=36.386..48.993 rows=20)
  ->  Gather Merge (rows=20)
        Workers Planned: 2
        Workers Launched: 2
        ->  Sort (actual time=28.226..28.228 rows=17.33 loops=3)
              Sort Key: "createdAt" DESC
              Sort Method: quicksort  Memory: 27kB
              ->  Parallel Seq Scan on "Order" (cost=0.00..23900.33 rows=42) (actual time=8.090..28.131 rows=33.33 loops=3)
                    Filter: ("userId" = 'u_1'::text)
                    Rows Removed by Filter: 333300
Execution Time: 49.021 ms
~~~

اقراها من تحت لفوق (من جوه لبرّه):

1. [[Parallel Seq Scan]]: قرا الجدول كله، مقسوم على ٣ processes ([[loops=3]]: الأساسي + [[Workers Launched: 2]]). كل واحد رمى حوالي ٣٣٣ ألف صف ([[Rows Removed by Filter]]) ولقى حوالي ٣٣.
2. [[rows=42]] في الـ cost تقدير القاعدة لكل worker، و [[rows=33.33]] الفعلي. قريبين، فالإحصائيات كويسة.
3. [[Sort]]: رتّب اللي لقاهم بـ [[createdAt DESC]].
4. [[Gather Merge]]: جمع نتايج الـ workers مرتبة.
5. [[Limit]]: خد ٢٠.

[[actual time=أول..آخر]] بالملّي: إمتى طلع أول صف وإمتى آخر واحد.

---

## ٢. [[CREATE INDEX CONCURRENTLY order_user_created_idx ON "Order" ("userId", "createdAt" DESC);]]

- [[("userId", "createdAt" DESC)]]: index مركّب. الصفوف فيه متجمعة بالمستخدم، وجوه كل مستخدم مرتبة بالأحدث. عمود المساواة الأول، وعمود الترتيب بعده.
- [[CONCURRENTLY]]: يتبني من غير ما يقفل الكتابة على الجدول (أبطأ شوية: خد حوالي ١.٤ ثانية هنا). ومينفعش جوه transaction:

~~~text الناتج
BEGIN;
CREATE INDEX CONCURRENTLY x_idx ON "Order"(status);
ERROR:  CREATE INDEX CONCURRENTLY cannot run inside a transaction block
~~~

---

## ٣. نفس الاستعلام تاني

~~~text الناتج
Limit (actual time=0.035..0.068 rows=20)
  ->  Index Scan using order_user_created_idx on "Order" (actual time=0.034..0.064 rows=20)
        Index Cond: ("userId" = 'u_1'::text)
        Index Searches: 1
Execution Time: 0.085 ms
~~~

- [[Index Scan]]: راح للـ index على طول، وقرا ٢٠ صف بس ووقف.
- مفيش [[Sort]] خالص: الـ index متخزن بالترتيب المطلوب.
- [[49.021]] → [[0.085]] ملّي: حوالي ٥٧٠ مرة.

---

## ٤. [[SELECT query, calls, round(mean_exec_time) AS ms FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;]]

[[pg_stat_statements]] view بيجمّع كل استعلام اتنفذ: النص بعد ما القيم تتحول [[$1]] و [[$2]]، وعدد المرات ([[calls]])، ومتوسط الوقت ([[mean_exec_time]] بالملّي). محتاج [[CREATE EXTENSION pg_stat_statements]] في القاعدة، ومن غير [[shared_preload_libraries]] هيقولك إنه مش متحمّل.

~~~text الناتج (أول ٣)
 query                                                                  | calls |  ms
 INSERT INTO "Order" (...) SELECT $1 || g, $2 || (g % $3), ...          |     1 | 14808
 CREATE INDEX CONCURRENTLY order_user_created_idx ON "Order" (...)      |     1 |  1407
 INSERT INTO "Course" (...) SELECT $1 || g, ...                         |     1 |   868
~~~

الـ seed نفسه طلع الأتقل. و [[ORDER BY total_exec_time]] (الوقت الكلي = المتوسط × عدد المرات) عشان استعلام ٢ ملّي بيتنادى مليون مرة يظهر فوق.

---

## ٥. N+1 (الـ solCode)

[[new PrismaClient({ adapter, log: [{ emit: "event", level: "query" }] })]] بيطلّع event مع كل استعلام، و [[db.$on("query", () => n++)]] بيعدّهم.

~~~text الناتج
3 courses -> loop: 4
    SELECT "Course"."id", "Course"."slug", ... FROM "Course" ...
    SELECT "Lesson"."id", ... FROM "Lesson" WHERE ...
    SELECT "Lesson"."id", ... FROM "Lesson" WHERE ...
    SELECT "Lesson"."id", ... FROM "Lesson" WHERE ...
3 courses -> include: 2
100 courses -> loop: 101
100 courses -> include: 2
100 courses -> _count: 1
~~~

- الـ loop: استعلام للقايمة + واحد لكل كورس = N+1.
- [[include: { lessons: true }]]: ٢ مهما كان العدد (الكورسات، وبعدين كل الدروس بـ [[IN (...)]]).
- [[include: { _count: { select: { lessons: true } } }]] (اللي في الـ desc): استعلام واحد لو محتاج العدد بس.

---

## الخلاصة

| الأداة | بتقولك إيه |
|---|---|
| [[EXPLAIN ANALYZE]] | الخطة الفعلية: [[Seq Scan]] ولا [[Index Scan]]، وفيه [[Sort]] ولا لأ |
| index [[(userId, createdAt DESC)]] | ٤٩ ملّي → ٠.٠٨٥ ملّي، ومن غير Sort |
| [[CONCURRENTLY]] | من غير قفل، وبرّه أي transaction |
| [[pg_stat_statements]] | أتقل استعلامات بالوقت الكلي |
| log الـ queries | N+1: ١٠١ استعلام بقوا ٢ |`,
          lines: [
            "خطة التنفيذ الفعلية ووقتها. قبل الـ index هتلاقي Seq Scan وبعدين Sort.",
            "index مركّب على المستخدم والتاريخ، من غير ما يقفل الكتابة.",
            "نفس الاستعلام تاني. هتلاقي Index Scan ومفيش Sort، والوقت أقل بكتير.",
            "أتقل ١٠ استعلامات في القاعدة: عدد مرات التشغيل ومتوسط الوقت بالملّي ثانية."
          ],
          sol: R`على مليون طلب ومستخدم عنده ١٠٠ طلب: قبل الـ index الـ plan كان [[Parallel Seq Scan on "Order"]] ومعاه [[Workers Launched: 2]]، والوقت حوالي [[34 ms]]. بعد الـ index بقى [[Index Scan using order_user_created_idx]]، والوقت حوالي [[0.07 ms]]، ومفيش [[Sort]] خالص، لأن الـ index متخزن بالترتيب اللي الاستعلام عايزه. الأرقام بتختلف حسب جهازك، بس الفرق بالمئات.

آخر سطر (pg_stat_statements) هيرجع [[relation "pg_stat_statements" does not exist]] لو الـ extension مش شغال: محتاج [[shared_preload_libraries = 'pg_stat_statements']] في الإعدادات، و restart، و [[CREATE EXTENSION pg_stat_statements]]. في القواعد المُدارة غالبًا بيبقى شغال من الأول.

الـ N+1: صفحة بتلف على ٣ كورسات وتجيب دروس كل واحد لوحده بتطلّع [[4]] استعلامات في الترمنال (١ + ٣)، ومع ١٠٠ كورس بتبقى ١٠١. بعد [[include: { lessons: true }]] بقوا [[2]] مهما كان العدد. ولو [[CREATE INDEX CONCURRENTLY]] وقع بـ [[cannot run inside a transaction block]]، يبقى انت شغّله جوه migration أو BEGIN، شغّله لوحده.`,
          solCode: R`-- seed: مليون طلب على ١٠ آلاف مستخدم (المستخدمين الأول، عشان الـ foreign key)
INSERT INTO "User" (id, name, email)
SELECT 'u_' || g, 'User ' || g, 'u' || g || '@example.com' FROM generate_series(0, 9999) g;
INSERT INTO "Order" (id, "userId", "courseId", "amountCents", currency, status, "createdAt")
SELECT 'o' || g, 'u_' || (g % 10000), 'COURSE_ID', 50000, 'EGP', 'PAID', now() - (g || ' seconds')::interval
FROM generate_series(1, 1000000) g;
ANALYZE "Order";

// N+1 وعدّ الاستعلامات
const db = new PrismaClient({ adapter, log: [{ emit: "event", level: "query" }] });
let n = 0;
db.$on("query", () => n++);
const courses = await db.course.findMany();
for (const c of courses) await db.lesson.findMany({ where: { courseId: c.id } });
console.log("loop:", n);            // 1 + عدد الكورسات
n = 0;
await db.course.findMany({ include: { lessons: true } });
console.log("include:", n);         // 2`
        },
        {
          cmd: "CDN و Core Web Vitals",
          title: "الموقع يبان سريع عند الزائر، مش عند جهازك بس",
          desc: R`جوجل بتقيس السرعة بـ ٣ أرقام من زوار حقيقيين، عند الـ 75th percentile. LCP أكبر عنصر ظهر في قد إيه، والمطلوب ٢.٥ ثانية أو أقل. و INP الصفحة بترد على الضغطة في قد إيه، والمطلوب ٢٠٠ ملّي ثانية أو أقل. و CLS الحاجات بتتنطط وهي بتحمّل قد إيه، والمطلوب 0.1 أو أقل.

أكبر فرق بييجي من ٣ حاجات: الصور والملفات من CDN بحجم وصيغة صح، و JavaScript أقل في المتصفح، ومقاسات محجوزة للصور والإعلانات.`,
          example: R`import Image from "next/image";
<Image src={course.coverUrl} alt={course.title} width={1200} height={675} sizes="(max-width: 768px) 100vw, 800px" fetchPriority="high" loading="eager" />

import { onLCP, onINP, onCLS } from "web-vitals";
const send = (m) => navigator.sendBeacon("/api/vitals", JSON.stringify({ name: m.name, value: m.value, rating: m.rating, page: location.pathname }));
onLCP(send); onINP(send); onCLS(send);`,
          try: R`افتح صفحة كورس على موبايل حقيقي بـ 4G، وشغّل Lighthouse بـ throttling. شوف أنهي عنصر هو الـ LCP. ضيف [[fetchPriority="high"]] و [[loading="eager"]] للغلاف وقيس تاني. بعدين ركّب web-vitals واجمع الأرقام من زوار حقيقيين أسبوع.`,
          flag: "script",
          deep: {
            why: "جهازك سريع ونتك سريع، والطالب على موبايل متوسط و 4G بتقطع. الصفحة اللي بتفتح عندك في ثانية ممكن تاخد ٦ عنده، ونص الناس بيقفلوا قبل ما تفتح. والأرقام دي بتأثر على ترتيبك في جوجل كمان.",
            how: R`LCP غالبًا صورة الغلاف أو العنوان الكبير. عشان يبقى سريع: السيرفر يرد بسرعة (كاش أو SSR)، والصورة من CDN بصيغة AVIF أو WebP بالمقاس المناسب، ومتبقاش lazy. و [[fetchPriority="high"]] بيقول للمتصفح «دي أولوية». بس next/image بيحط [[loading="lazy"]] افتراضيًا حتى لو حطيت [[fetchPriority]] (جربناها في Next 16.4)، فلازم معاه [[loading="eager"]] أو تستخدم [[preload]] لوحده. وفي Next 16، الـ [[priority]] القديمة بقت deprecated، والبديل [[preload]]، أو [[fetchPriority]]، أو [[loading="eager"]]. والصور من دومين تاني محتاجة [[images.remotePatterns]] في next.config.

INP بيتأثر بالـ JavaScript. أي task طويلة على الـ main thread بتأخر رد الضغطة. قلل الـ JS: Server Components للحاجات اللي مش تفاعلية، وحمّل المكونات التقيلة ([[dynamic import]]) لما تتطلب، ومتستوردش مكتبة كاملة عشان دالة واحدة.

CLS: [[width]] و [[height]] على كل صورة، عشان المتصفح يحجز مكانها قبل ما تحمّل. ومكان محجوز للبانرات. والخطوط بـ next/font، اللي بيظبط مقاسات الخط البديل عشان النص ميتنططش لما الخط الحقيقي يحمّل.

والـ CDN (زي Cloudflare قدام الـ VPS) بيخدم الملفات من أقرب مدينة للزائر. الملفات اللي في اسمها hash بتتكاش سنة، والـ HTML لفترة قصيرة أو مبيتكاشش خالص. والفيديو مكانه خدمة فيديو بـ HLS، مش mp4 من السيرفر.

Lighthouse قياس معمل. الحقيقة من زوار حقيقيين: مكتبة web-vitals في كودك، أو تقرير CrUX بتاع جوجل. وقياس INP لازم يبقى من زوار حقيقيين، لأنه محتاج تفاعل.`,
            when: "قبل الإطلاق على الصفحات العامة (الرئيسية، والكورسات، وصفحة الكورس)، وبعد أي تغيير كبير في الواجهة.",
            mistakes: "إنك تحسّن رقم Lighthouse على اللابتوب بتاعك وبس. أو تعمل lazy لصورة الـ LCP نفسها. أو تنسى width و height فالصفحة تتنطط. أو تستورد مكتبة تواريخ أو أيقونات كاملة. أو تعرض الفيديو mp4 مباشرة من السيرفر."
          },
          teach: R`## صورة الـ LCP بأولوية ومقاسات محجوزة، والأرقام من زوار حقيقيين

السطرين الأولانيين صورة الغلاف بـ [[next/image]]، والتلاتة اللي بعدهم بيقيسوا LCP و INP و CLS في متصفح الزائر ويبعتوهم للسيرفر. جربناهم في Next.js 16.4 (React 19) و web-vitals 6.2 بـ [[next build]] و [[next start]] (ويندوز 11، Node 24)، وفتحنا الصفحة في Chrome headless بـ playwright بشاشة موبايل (٤١٢×٨٢٣) و throttling (نت 1.6 ميجابت و latency ١٥٠ ملّي، و CPU أبطأ ٤ مرات). الصورة ٤٠٠٠×٢٢٥٠ JPEG حجمها ٦.٨ ميجا. Lighthouse مش متسطب هنا، فجزؤه من وثائق جوجل.

> اكتشفنا إن [[fetchPriority="high"]] لوحده مش كفاية في Next 16: الـ HTML اللي طلع كان [[<img fetchPriority="high" loading="lazy" ...>]]. يعني صورة الـ LCP نفسها lazy، ودي بالظبط الغلطة اللي الـ [[mistakes]] بيحذر منها. ضفنا [[loading="eager"]] للمثال.

---

## ١. [[import Image from "next/image";]]

component بيطلّع [[<img>]] عادي، بس بيعمل [[srcset]] بمقاسات كتير، والصور بتعدّي على [[/_next/image]] اللي بيصغّرها ويحوّلها WebP أو AVIF حسب المتصفح.

## ٢. [[<Image src alt width={1200} height={675} sizes="..." fetchPriority="high" loading="eager" />]]

### [[width={1200} height={675}]]

مش مقاس العرض، دي **النسبة** (١٦:٩). المتصفح بيحجز مكان الصورة قبل ما تحمّل، فالمحتوى اللي تحتها ميتنططش. وقسناها:

~~~text الناتج (من web-vitals)
{"msg":"web-vital","name":"CLS","value":0,"rating":"good","page":"/ar/courses/sql"}
~~~

### [[sizes="(max-width: 768px) 100vw, 800px"]]

بيقول للمتصفح الصورة هتتعرض بأنهي عرض: على شاشة ٧٦٨ أو أقل عرض الشاشة كله ([[100vw]])، وغير كده ٨٠٠ بكسل. المتصفح بيضرب ده في كثافة الشاشة ويختار من الـ [[srcSet]]:

~~~text الناتج (الـ srcSet اللي Next طلّعه، مختصر)
/_next/image?url=%2Fcover-big.jpg&w=640&q=75 640w, ...&w=750 750w, ...&w=828 828w, ...&w=1080 1080w,
...&w=1200 1200w, ...&w=1920 1920w, ...&w=2048 2048w, ...&w=3840 3840w
~~~

الموبايل (٤١٢ × كثافة 2.625 = ١٠٨٢) طلب [[w=1200]]، والسيرفر رد [[image/webp]] حجمها ٢٠١٧٩٨ byte بدل ٦.٨ ميجا. و [[q=75]] الجودة الافتراضية.

### [[fetchPriority="high"]] و [[loading="eager"]]

| اللي كتبناه | اللي طلع في الـ HTML | preload؟ |
|---|---|---|
| ولا حاجة | [[loading="lazy"]] | لأ |
| [[fetchPriority="high"]] | [[fetchPriority="high" loading="lazy"]] | لأ |
| + [[loading="eager"]] | [[fetchPriority="high" loading="eager"]] | أيوه [[<link rel="preload" as="image" imageSrcSet=...>]] |
| [[preload]] لوحده | من غير lazy | أيوه |

وقسنا ٣ مرات لكل واحدة:

~~~text الناتج
prio  LCP 2228ms (IMG) img request started at 424ms | LCP 2204ms ... at 446ms | LCP 2232ms ... at 439ms
eager LCP 2260ms (IMG) img request started at 218ms | LCP 2240ms ... at 201ms | LCP 2220ms ... at 193ms
~~~

- عنصر الـ LCP هو الـ [[IMG]] زي ما الدرس بيقول.
- مع [[eager]] الطلب بدأ بعد حوالي ٢٠٠ ملّي بدل ٤٤٠: المتصفح عرفه من الـ preload في الـ [[<head>]] من غير ما يستنى الـ layout.
- الـ LCP نفسه طلع قريب في الحالتين هنا (حوالي ٢.٢ ثانية)، لأن الصفحة دي مفيهاش حاجة تانية بتتحمّل، والوقت كله في تنزيل الصورة على نت بطيء. في صفحة حقيقية فيها CSS و JS بيتنافسوا على النت، البداية المبكرة هي اللي بتفرق.

---

## ٣. [[import { onLCP, onINP, onCLS } from "web-vitals";]]

مكتبة جوجل الصغيرة اللي بتحسب المقاييس بنفس طريقة Chrome. كل دالة بتاخد callback بيتنادى لما الرقم يبقى جاهز (غالبًا لما الزائر يسيب الصفحة أو يخفيها).

## ٤. [[const send = (m) => navigator.sendBeacon("/api/vitals", JSON.stringify({ name, value, rating, page }));]]

- [[m.name]] اسم المقياس، و [[m.value]] الرقم (ملّي للـ LCP و INP، ومن غير وحدة للـ CLS)، و [[m.rating]] [[good]] أو [[needs-improvement]] أو [[poor]].
- [[navigator.sendBeacon]]: POST صغير المتصفح بيضمن إرساله حتى والصفحة بتتقفل، عكس [[fetch]] اللي ممكن يتلغي.

## ٥. [[onLCP(send); onINP(send); onCLS(send);]]

في التجربة حطيناهم جوه [[useEffect]] في client component. والسيرفر (الـ solCode: [[app/api/vitals/route.ts]]) طبع اللي وصله:

~~~text الناتج (next.log)
{"msg":"web-vital","name":"LCP","value":2228,"rating":"good","page":"/ar/courses/sql"}
{"msg":"web-vital","name":"INP","value":0,"rating":"good","page":"/ar/courses/sql"}
{"msg":"web-vital","name":"CLS","value":0,"rating":"good","page":"/ar/courses/sql"}
~~~

الـ LCP ٢٢٢٨ ملّي ([[good]] لأنه تحت ٢٥٠٠). و INP صفر لأن الضغطة كانت على عنوان مفيش عليه JavaScript. و [[new Response(null, { status: 204 })]] رد فاضي.

---

## الخلاصة

| المقياس | الحد الكويس (p75) | اللي بيحسّنه في المثال |
|---|---|---|
| LCP | ≤ ٢.٥ ثانية | [[sizes]] + WebP من [[/_next/image]] + [[fetchPriority]] و [[loading="eager"]] |
| INP | ≤ ٢٠٠ ملّي | JS أقل (مش في السطور دي) |
| CLS | ≤ 0.1 | [[width]] و [[height]] |

والقياس الحقيقي من الزوار بـ web-vitals و [[sendBeacon]]، مش من Lighthouse على جهازك.`,
          lines: [
            "component الصور بتاع Next.js.",
            "صورة الغلاف: مقاسات محجوزة (CLS)، و sizes عشان يختار المقاس الصح، وأولوية عالية و eager لأنها الـ LCP (next/image بيحط lazy افتراضيًا حتى مع fetchPriority).",
            "مكتبة القياس من زوار حقيقيين.",
            "ابعت كل رقم للسيرفر بـ sendBeacon، وده بيوصل حتى لو الزائر قفل الصفحة.",
            "اسمع على التلات مقاييس."
          ],
          sol: R`في Lighthouse (وضع Mobile، وهو بيعمل throttling لوحده) هتلاقي في قسم Diagnostics بند [[Largest Contentful Paint element]] بيقولك مين الـ LCP. في صفحة كورس غالبًا هو صورة الغلاف. قبل [[fetchPriority="high"]] و [[loading="eager"]] هتلاقي الصورة بتبدأ تحمل متأخر في الـ waterfall بعد الـ CSS والـ JS. بعدهم بتبدأ بدري مع أول الطلبات (جربناها في Chrome بـ throttling: الطلب بدأ عند حوالي ٢٠٠ ملّي بدل ٤٤٠)، والـ LCP بيقل بقد ما الصورة كانت مستنية ورا ملفات تانية. في صفحة صغيرة مفيهاش حاجة تانية بتتحمّل، الفرق في الـ LCP نفسه ممكن ميبانش. الرقم نفسه بيختلف كل تشغيلة، فشغّل ٣ مرات وخد المتوسط. المقاييس الرسمية: LCP كويس تحت 2.5 ثانية، و INP تحت 200ms، و CLS تحت 0.1.

الـ web-vitals من الزوار الحقيقيين هتلاقيها أوحش من Lighthouse على جهازك غالبًا، وده الطبيعي: أجهزة أضعف ونت أبطأ. بص على الـ p75 مش المتوسط، لأن ده اللي جوجل بيقيس بيه.

لو الـ LCP طلع نص مش صورة، يبقى [[fetchPriority]] على الصورة مش هيفرق، ركّز على الفونت والـ CSS. ولو CLS عالي، دوّر على صورة من غير [[width]] و [[height]] أو banner بيظهر فوق المحتوى بعد التحميل.`,
          solCode: R`// app/api/vitals/route.ts: استقبل الأرقام (وابعتها لـ PostHog أو خزّنها)
export async function POST(req: Request) {
  const m = await req.json(); // { name: "LCP", value: 2310.5, rating: "good", page: "/courses/sql" }
  console.log(JSON.stringify({ msg: "web-vital", ...m }));
  return new Response(null, { status: 204 });
}`
        }
      ]
    }
]);
