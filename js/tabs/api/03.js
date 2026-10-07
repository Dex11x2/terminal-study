// تكملة تاب api: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/api/01.js (شرح حقول الدرس في أوله)
MORE("api", [
    {
      t: "Middleware والتنظيم",
      l: 1,
      n: "كل طلب بيعدّي على طبقات بالترتيب، والمشروع بيتقسم routes و controllers و services",
      items: [
        {
          cmd: "middleware",
          title: "دالة بتشتغل قبل الـ route وتقرر يكمّل ولا لأ",
          desc: R`الـ middleware دالة [[(req, res, next)]] بتقرا الطلب أو تعدّل عليه، وبعدين يا إما ترد وتنهي، يا إما تنادي [[next()]] فالطلب يكمّل للي بعدها.

[[express.json()]] middleware، و auth middleware، و logger middleware. كلهم نفس الشكل.`,
          example: R`function logger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    console.log(req.method, req.originalUrl, res.statusCode, Date.now() - start + "ms");
  });
  next();
}

function requireApiKey(req, res, next) {
  if (!process.env.API_KEY || req.get("x-api-key") !== process.env.API_KEY) return res.status(401).json({ error: "Bad key" });
  next();
}

app.use(logger);
app.get("/api/admin/stats", requireApiKey, (req, res) => res.json({ tasks: tasks.length }));`,
          try: R`شيل [[next()]] من logger وجرّب أي طلب: هيفضل معلّق. رجّعها، وجرّب [[/api/admin/stats]] بـ [[-H "x-api-key: ..."]] صح وغلط.`,
          flag: "script",
          deep: {
            why: "حاجات كتير لازم تحصل لكل الطلبات أو لمجموعة منها: قراية JSON، وتسجيل، وتحقق من التوكن، و rate limit. بدل ما تكررها في كل route، بتكتبها مرة كـ middleware وتركّبها.",
            how: R`Express جواه stack: array فيها كل [[app.use]] و [[app.get]] بالترتيب اللي اتكتبوا بيه. مع كل طلب بيبدأ من أول واحد: لو الـ path مطابق، بينادي الدالة ويدّيها [[next]]. لما تنادي [[next()]]، Express ينقل للي بعده. ولو رديت ([[res.json]]) من غير next، السلسلة تقف هنا.

[[next(err)]] بأي argument (غير الكلمتين [["route"]] و [["router"]]) معناها «حصل خطأ»: Express بيتخطى كل الـ middleware العادية ويروح لأول error middleware (اللي ليها ٤ arguments). و [[next("route")]] بيتخطى باقي handlers الـ route الحالي بس، و [[next("router")]] بيخرج من الـ router كله.

[[app.use(path, fn)]] بيطابق أي method وأي عنوان بيبدأ بالـ path. [[app.get(path, fn)]] GET بس والعنوان بالظبط. وتقدر تحط أكتر من middleware في route واحد: [[app.post("/x", auth, validate, handler)]]، وبيتنفذوا بالترتيب.

[[res.on("finish")]] بيتنادى بعد ما الرد يتبعت، فده المكان الصح تقيس فيه المدة وتعرف الـ status النهائي. و [[req.originalUrl]] العنوان الكامل حتى لو الـ middleware متركّب على path جزئي.`,
            when: R`أي حاجة مشتركة: auth، و logging، و rate limit، و CORS، و validation، وتحميل حاجة من الداتابيز قبل الـ handler (زي [[loadTask]] يجيب المهمة ويحطها في [[req.task]]).`,
            mistakes: R`تنسى [[next()]] في فرع من الفروع فالطلب يتعلق. أو العكس: تنادي [[next()]] بعد ما رديت، فاللي بعدك يحاول يرد تاني ويطلع [[Cannot set headers after they are sent]]. الحل: [[return res.status(...)]] دايمًا. وفي مشروع حقيقي كان middleware بيبدّل [[res.send]] بنسخة بتسجّل كل رد 4xx. ده بيشتغل بس هش، و [[res.on("finish")]] أنضف وبيمسك كل الردود.`
          },
          teach: R`## دالتين بنفس الشكل، وشغلانتين مختلفتين

المثال فيه middleware بيسجّل كل طلب ([[logger]])، و middleware بيقفل route على اللي معاه مفتاح ([[requireApiKey]])، وبعدين بنركّبهم. اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1، والطلبات بـ curl من Git Bash على بورت تاني غير ٣٠٠٠.

---

## الشكل اللي لازم تحفظه

~~~text
function اسم(req, res, next) {
  ...
  next();   أو   return res.status(...).json(...);
}
~~~

أي middleware بياخد ٣ حاجات: الطلب، والرد، و [[next]] (دالة Express مدّيهالك، لما تناديها بيعدّي الطلب للي بعدك). وفي الآخر لازم يعمل **واحدة من اتنين**: يرد ويقفل، أو ينادي [[next()]].

---

## ١. الـ logger

### [[const start = Date.now();]]

[[Date.now()]] الوقت دلوقتي بالـ millisecond (رقم كبير بيعد من سنة ١٩٧٠). بنحفظه عشان نطرح منه بعدين.

### [[res.on("finish", () => { ... })]]

- [[res]] بيطلع **events** (أحداث)، و [[.on(اسم, دالة)]] معناها «لما الحدث ده يحصل نادي الدالة دي».
- [["finish"]] بيحصل بعد ما الرد يتبعت كله.

ليه مش نطبع على طول؟ لأن دلوقتي لسه محدش رد، فـ [[res.statusCode]] لسه مش معروف. احنا بنسجّل «ابقى فكّرني لما يخلص».

### [[console.log(req.method, req.originalUrl, res.statusCode, Date.now() - start + "ms")]]

| الحتة | مثال |
|---|---|
| [[req.method]] | [[GET]] |
| [[req.originalUrl]] | [[/api/admin/stats]]، العنوان الكامل بالـ query |
| [[res.statusCode]] | [[200]]، الرقم اللي اتبعت فعلًا |
| [[Date.now() - start + "ms"]] | المدة: الطرح الأول، وبعدين [[+ "ms"]] بيلزقها في نص |

### [[next();]]

الـ logger مش بيرد، فلازم يعدّي الطلب. والسطر ده بيتنفذ **قبل** الـ finish (اللي هيحصل بعدين).

---

## ٢. [[requireApiKey]]

~~~text
if (!process.env.API_KEY || req.get("x-api-key") !== process.env.API_KEY) return res.status(401).json({ error: "Bad key" });
next();
~~~

- [[process.env.API_KEY]] متغير بيئة: المفتاح الصح، مش مكتوب في الكود.
- [[req.get("x-api-key")]] بيقرا header من الطلب. الاسم مش حساس لحروف كبيرة وصغيرة. و [[x-]] في الأول عادة قديمة لـ headers مش رسمية.
- الشرط الأول [[!process.env.API_KEY]]: لو المتغير مش متظبط، ارفض الكل. من غيره، طلب من غير header هيبقى [[undefined !== undefined]] = [[false]]، فيعدّي!
- لو الشرط صح: [[return]] رد 401، ومفيش [[next]]، فالـ handler عمره ما بيشتغل.
- لو الاتنين تمام: [[next()]].

---

## ٣. التركيب

| السطر | معناه |
|---|---|
| [[app.use(logger)]] | شغّله على **كل** الطلبات، أي method وأي عنوان |
| [[app.get("/api/admin/stats", requireApiKey, handler)]] | على الـ route ده بس: [[requireApiKey]] الأول، ولو نادى [[next]] يشتغل الـ handler |

فطلب [[GET /api/admin/stats]] بيمشي كده:

~~~text
logger  ->  requireApiKey  ->  handler
  next()       next() أو 401      res.json
~~~

---

## ٤. نجرّب

شغّلنا السيرفر والمتغير متظبط. في Git Bash:

~~~bash
API_KEY=s3cret node server.js
~~~

[[API_KEY=s3cret]] قبل الأمر بيحط المتغير للأمر ده بس. في PowerShell بيبقى سطرين: [[$env:API_KEY = "s3cret"]] وبعدين [[node server.js]].

~~~bash
curl -s -w " [%{http_code}]\n" localhost:3000/api/admin/stats -H "x-api-key: s3cret"
curl -s -w " [%{http_code}]\n" localhost:3000/api/admin/stats -H "x-api-key: wrong"
curl -s -w " [%{http_code}]\n" localhost:3000/api/admin/stats
curl -s -w " [%{http_code}]\n" localhost:3000/nope
~~~

~~~text الناتج
{"tasks":1} [200]
{"error":"Bad key"} [401]
{"error":"Bad key"} [401]
<!DOCTYPE html>... [404]
~~~

~~~text الناتج في ترمنال السيرفر (الـ logger)
GET /api/admin/stats 200 5ms
GET /api/admin/stats 401 1ms
GET /api/admin/stats 401 1ms
GET /nope 404 2ms
~~~

- الـ logger سجّل **حتى** الـ 401 والـ 404، لأنه متركّب على الكل وبيسجّل بعد الـ finish.
- المدة بالـ ms هتختلف عندك، وأول طلب بعد التشغيل غالبًا أبطأ شوية.

ومن غير [[API_KEY]] خالص (شغّلنا [[node server.js]] بس)، **التلات طلبات** رجعوا [[401]]، حتى اللي معاه [[s3cret]]. ده الشرط الأول بيشتغل.

### من PowerShell

~~~powershell
Invoke-RestMethod http://localhost:3000/api/admin/stats -Headers @{ 'x-api-key' = 's3cret' }
~~~

~~~text الناتج (pwsh 7 و Windows PowerShell 5.1)
tasks
-----
    1
~~~

[[-Headers @{ ... }]] بياخد hashtable: [[@{ اسم = قيمة }]]. ومن غير المفتاح، [[Invoke-RestMethod]] بيرمي خطأ على الـ 401 (عكس [[fetch]])، وجواه [[{"error":"Bad key"}]].

---

## ٥. لو نسيت [[next()]]

شلنا [[next()]] من الـ logger بس:

~~~bash
curl -m 3 localhost:3000/api/admin/stats -H "x-api-key: s3cret"
~~~

~~~text الناتج
curl: (28) Operation timed out after 3004 milliseconds with 0 bytes received
~~~

- [[-m 3]] أقصى وقت ٣ ثواني، وإلا curl يقطع. [[(28)]] رقم خطأ الـ timeout في curl.
- ولا سطر اتطبع في اللوج: محدش رد، فـ [[finish]] محصلش.

الطلب وقف عند الـ logger: لا رد ولا عدّى. ده أشهر سبب لـ «الطلب معلّق».

---

## الخلاصة

| middleware | بيعمل إيه | بينادي [[next]]؟ |
|---|---|---|
| [[logger]] | يسجّل بعد ما الرد يخلص | دايمًا |
| [[requireApiKey]] | يتأكد من المفتاح | لو صح بس، وإلا يرد 401 |

- كل middleware: يا يرد، يا [[next()]]. مفيش تالت.
- [[app.use(fn)]] على الكل، و [[app.get(path, fn, handler)]] على route واحد.
- [[return res...]] عشان متكمّلش بعد الرد.`,
          lines: [
            "middleware: الطلب، والرد، و next اللي بتكمّل.",
            "سجّل وقت البداية.",
            "لما الرد يخلص ويتبعت...",
            "اطبع الـ method والعنوان والـ status والمدة.",
            "قفلة الـ listener.",
            "كمّل للي بعدي. من غيرها الطلب يفضل معلّق.",
            "قفلة.",
            "middleware بيحمي route.",
            "المفتاح غلط أو مش مبعوت، أو API_KEY مش متظبط في البيئة؟ رد وانهي، ومفيش next. (من غير الشرط الأول، لو المتغير ناقص والطلب من غير header، undefined هتساوي undefined والطلب يعدّي).",
            "المفتاح صح؟ كمّل.",
            "قفلة.",
            "[[app.use]]: شغّل logger على كل الطلبات.",
            "middleware على route واحد بس: بيتحط قبل الـ handler."
          ],
          sol: R`من غير [[next()]]: [[curl localhost:3000/api/admin/stats]] بيفضل مستني ومبيرجعش حاجة، ولو حطيت [[-m 3]] curl بيقطع بـ [[curl: (28) Operation timed out]]. ومفيش سطر لوج كمان، لأن [[finish]] مبيحصلش إلا لما رد يتبعت. الـ middleware لازم يا يرد يا ينادي [[next()]]، غير كده الطلب بيتعلّق للأبد.

بعد ما ترجّعها وتشغّل السيرفر بـ [[API_KEY=s3cret node --watch server.js]]: بالمفتاح الصح [[{"tasks":1}]]، وبالغلط أو من غيره [[401]] و [[{"error":"Bad key"}]]. واللوج بيطبع سطر لكل طلب زي [[GET /api/admin/stats 401 1ms]].

لو المفتاح الصح نفسه رجّع 401: اتأكد إن [[API_KEY]] متعرّف في نفس الترمنال اللي فيه السيرفر (أو في .env ومتحمّل)، لأن الشرط [[!process.env.API_KEY]] بيرفض كل حاجة لو مش موجود، وده مقصود.`
        },
        {
          cmd: "ترتيب الـ middleware",
          title: "ليه سطر في المكان الغلط بيبوّظ السيرفر كله",
          desc: R`Express بيمشي على الـ middleware بالترتيب اللي كتبتها بيه، فالترتيب جزء من المنطق.

اللي بيجهّز الطلب (helmet و cors و json و logger) الأول، وبعدين الـ routes، وبعدين 404 لأي حاجة ملقتش route، وآخر حاجة error handler.`,
          example: R`app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);
app.use("/api/auth/login", loginLimiter);

app.get("/health", healthCheck);
app.use("/api/auth", authRouter);
app.use("/api/tasks", requireAuth, tasksRouter);

app.use(notFound);
app.use(errorHandler);`,
          try: R`انقل [[app.use(express.json())]] تحت الـ routes وجرّب POST: [[req.body]] هيبقى undefined. وانقل [[notFound]] فوق الـ routes: كل حاجة هتبقى 404.`,
          flag: "script",
          deep: {
            why: "أغلب «الـ middleware مش شغال» سببه الترتيب مش الكود: auth بعد الـ route فالـ route مكشوف، أو json بعد الـ route فالـ body فاضي، أو error handler في النص فمبيمسكش أخطاء اللي تحته.",
            how: R`كل طلب بيعدّي على الـ stack من فوق لتحت، وأول حاجة ترد بتنهي الرحلة. فاسأل عن كل middleware: «محتاج يشتغل قبل مين؟».

helmet و cors فوق عشان حتى رد 401 أو 429 ياخد الـ headers. لو CORS تحت الـ rate limiter، رد 429 هيوصل للمتصفح من غير [[Access-Control-Allow-Origin]]، فالواجهة تشوف «CORS error» بدل «Too many requests»، وتفضل تدوّر في المكان الغلط.

[[notFound]] مجرد middleware من غير path بعد كل الـ routes: لو الطلب وصله، معناها محدش رد. و [[errorHandler]] بـ ٤ arguments، و Express بيعرفه من عدد الـ arguments، فلازم تكتب الأربعة حتى لو مش هتستخدم [[next]].

و [[app.use("/api/tasks", requireAuth, tasksRouter)]] بيحمي الـ router ده بس، و [[/health]] فوقه مش محمي. ده أوضح من إنك تحط auth على كل حاجة وتعمل استثناءات بـ if.`,
            when: "كل ما تضيف middleware اسأل مكانه فين. والشكل ده (security، ثم parsing، ثم logging، ثم routes، ثم 404، ثم errors) ينفع لأغلب الـ APIs.",
            mistakes: R`في مشروع حقيقي كان الـ handler بتاع الـ rate limiter العام بيسجّل [[req.user?.id]] مع كل رد 429، والـ limiter نفسه متركّب قبل auth، فالقيمة دايمًا guest واللوج ملوش فايدة. وتحط auth جوه الـ controller بدل الـ route، فأول route جديد تنساه فيه يبقى مفتوح.`
          },
          teach: R`## الملف ده هو «مسار» كل طلب

المثال مفيهوش كود جديد، فيه **ترتيب**: ١٢ سطر بيقولوا كل طلب هيعدّي على إيه وبأنهي ترتيب. Express بيمشي عليهم من فوق لتحت، وأول واحد يرد بيقفل الرحلة. عشان نجرّبه بجد، شغّلناه على ويندوز 11 (Node 24.19، Express 5.2.1، helmet 8.3، cors 2.8) والحاجات اللي لسه مالهاش درس عملناها نسخ صغيرة: [[requireAuth]] بيقبل أي header [[Authorization]]، و [[loginLimiter]] بيعدّي على طول، والـ routers فيها route أو اتنين.

---

## ١. السطور واحد واحد

| # | السطر | بيعمل إيه | ليه هنا |
|---|---|---|---|
| ١ | [[app.use(helmet())]] | يحط security headers على كل رد | الأول، عشان حتى ردود 401 و 404 تاخدها |
| ٢ | [[app.use(cors(corsOptions))]] | يقول للمتصفح مين مسموحله يكلّم الـ API | قبل الـ auth، عشان طلب الـ preflight يترد من غير توكن |
| ٣ | [[app.use(express.json())]] | يقرا الـ body | قبل أي route محتاج [[req.body]] |
| ٤ | [[app.use(requestLogger)]] | يسجّل كل طلب | قبل الـ routes عشان يشوفهم كلهم |
| ٥ | [[app.use("/api/auth/login", loginLimiter)]] | حد للمحاولات على login بس | قبل route الـ login نفسه |
| ٦ | [[app.get("/health", healthCheck)]] | «السيرفر عايش؟» | قبل أي auth |
| ٧ | [[app.use("/api/auth", authRouter)]] | login و register | من غير توكن، طبعًا |
| ٨ | [[app.use("/api/tasks", requireAuth, tasksRouter)]] | المهام | [[requireAuth]] قبل الـ router، فكل المهام محمية |
| ٩ | [[app.use(notFound)]] | 404 بـ JSON | بعد كل الـ routes: لو وصل هنا يبقى محدش رد |
| ١٠ | [[app.use(errorHandler)]] | يرد على أي خطأ | آخر حاجة، بـ ٤ arguments |

و [[app.use(path, ...)]] بيطابق أي عنوان **بيبدأ** بالـ path، فـ [[/api/tasks]] و [[/api/tasks/5]] الاتنين بيدخلوا سطر ٨.

---

## ٢. نشوف أثر كل سطر

### helmet و cors على رد عادي

~~~bash
curl -si localhost:3000/health
~~~

~~~text الناتج
HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self';base-uri 'self';...
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 11

{"ok":true}
~~~

- كل السطور من [[Content-Security-Policy]] لـ [[X-XSS-Protection]] من helmet (تفاصيلها في درس [[helmet]]). ولاحظ إن [[X-Powered-By: Express]] **اختفى**.
- [[Access-Control-Allow-Origin]] من cors، وقيمته الـ origin اللي في [[corsOptions]] (احنا حطيناه [[http://localhost:5173]]، بورت Vite).

### باقي الطلبات

~~~text الناتج
GET  /api/tasks                         {"error":"Login required"}   [401]
POST /api/tasks  + Authorization        {"title":"t"}                [201]
POST /api/auth/login                    {"token":"t","body":{"email":"a@b.c"}}  [200]
GET  /nope                              {"error":"Route not found"}  [404]
POST /api/tasks  body: {bad             {"error":"Expected property name or '}' in JSON at position 1 (line 1 column 2)"}  [400]
~~~

- [[/api/tasks]] من غير توكن: [[requireAuth]] رد 401، والـ router مشتغلش.
- [[/api/auth/login]] اشتغل من غير توكن لأنه في router تاني مش وراه [[requireAuth]].
- [[/nope]] ملقاش route فنزل لحد [[notFound]].
- الـ JSON البايظ: [[express.json()]] (سطر ٣) رمى خطأ، و Express **قفز** على كل اللي بعده لحد [[errorHandler]]، اللي رجّع JSON بدل صفحة HTML.

وده لوج الطلبات:

~~~text الناتج في ترمنال السيرفر
GET /health 200
GET /api/tasks 401
POST /api/tasks 201
POST /api/auth/login 200
GET /nope 404
~~~

خمس سطور لـ ٦ طلبات: طلب الـ JSON البايظ **مش متسجّل**! لأن الخطأ حصل في سطر ٣ والـ logger في سطر ٤، فالقفزة للـ errorHandler عدّت من فوقه. لو عايز اللوج يمسك كل حاجة، حطه قبل [[express.json()]]. يعني الترتيب مش بيأثر على الردود بس، بيأثر على اللي انت شايفه.

### الـ preflight

~~~bash
curl -si -X OPTIONS localhost:3000/api/tasks -H "Origin: http://localhost:5173" -H "Access-Control-Request-Method: POST"
~~~

~~~text الناتج
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: http://localhost:5173
Vary: Origin, Access-Control-Request-Headers
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
~~~

المتصفح قبل [[POST]] بـ JSON من موقع تاني بيبعت [[OPTIONS]] يسأل «مسموحلي؟». cors (سطر ٢) رد 204 بنفسه قبل ما الطلب يوصل لـ [[requireAuth]]. لو cors كان تحت الـ auth، الـ preflight (اللي مبيبعتش توكن أصلًا) كان هياخد 401 والمتصفح يرفض الطلب الحقيقي.

---

## ٣. التجربتين بتوع الـ try

### [[express.json()]] تحت الـ routes

~~~text الناتج
POST /api/tasks  + Authorization + {"title":"t"}   {}                [201]
POST /api/auth/login + {"email":"a@b.c"}             {"token":"t"}     [200]
POST /api/tasks  body: {bad  (من غير توكن)            {"error":"Login required"}  [401]
~~~

- الـ route رد قبل ما الـ body يتقري، فـ [[req.body?.title]] بقى [[undefined]]، و [[{ title: undefined }]] بيتحول لـ [[{}]] في JSON (المفاتيح اللي قيمتها undefined بتتشال).
- و [[body]] اختفى من رد الـ login لنفس السبب.
- والـ JSON البايظ بقى 401 مش 400: [[requireAuth]] رد قبل ما حد يحاول يقرا الـ body.

### [[notFound]] فوق كل حاجة

~~~text الناتج
GET /health        {"error":"Route not found"} [404]
GET /api/tasks     {"error":"Route not found"} [404]
...كله 404، حتى الـ OPTIONS
~~~

[[notFound]] بيرد على أي حاجة ومبينادي [[next()]]، فمحدش تحته اشتغل، واللوج نفسه فضي.

---

## الخلاصة

~~~text
security (helmet, cors)
   parsing (json)
      logging
         limiters
            routes (health, auth, المحمي)
               notFound
                  errorHandler
~~~

- اسأل عن كل سطر: «لازم يشتغل قبل مين؟».
- الخطأ بيقفز لأول error handler تحته، ويعدّي من فوق أي middleware عادي في الطريق (حتى الـ logger).
- [[notFound]] و [[errorHandler]] آخر سطرين دايمًا.`,
          lines: [
            "security headers أول حاجة، عشان تتحط على كل رد حتى ردود الأخطاء.",
            "CORS قبل الـ routes، عشان طلبات الـ preflight (OPTIONS) تترد من غير ما توصل لـ auth.",
            "اقرا الـ body قبل أي حاجة محتاجاه.",
            "سجّل كل طلب.",
            "حد أشد لمحاولات login بس، قبل route الـ auth.",
            "health check قبل الـ auth، عشان Docker أو Nginx يسألوه من غير توكن.",
            "routes الـ auth (login و register) مش محتاجة توكن.",
            "كل routes المهام محمية: auth الأول وبعدين الـ router.",
            "أي طلب وصل هنا ملقاش route: 404 بـ JSON.",
            "error handler آخر واحد، بـ ٤ arguments."
          ],
          sol: R`لما [[express.json()]] ييجي بعد الـ routes: الـ route بيشتغل الأول و [[req.body]] بـ [[undefined]]، فأي [[req.body.title]] بيرمي TypeError، والـ route اللي بيستخدم [[req.body?.title]] بيرجّع 400. الـ body اتقري فعلًا بس بعد ما الرد اتبعت.

ولما [[notFound]] ييجي فوق الـ routes: كل طلب، حتى [[/health]]، بيرجّع [[404]] و [[{"error":"Route not found"}]]، لأن notFound بيرد على أي حاجة ومبينادي [[next()]]، فمحدش تحته بيشتغل.

القاعدة: Express بيعدّي على الـ middleware بالترتيب اللي اتكتب بيه. اللي بيجهّز الطلب (helmet و cors و json) فوق، والـ routes في النص، و notFound و errorHandler آخر حاجة.`
        },
        {
          cmd: "express.Router",
          title: "قسّم الـ routes على ملفات",
          desc: R`[[express.Router()]] «app صغير» ليه routes و middleware بتوعه، بتعمله لكل جزء (tasks و users و auth) في ملف وتركّبه على path.

جوه الـ router العناوين نسبية: [[router.get("/:id")]] متركّب على [[/api/tasks]] يبقى فعليًا [[/api/tasks/:id]].`,
          example: R`// routes/tasks.routes.js
import { Router } from "express";
import * as tasks from "../controllers/tasks.controller.js";

const router = Router();
router.get("/", tasks.list);
router.post("/", tasks.create);
router.get("/:id", tasks.getOne);
router.patch("/:id", tasks.update);
router.delete("/:id", tasks.remove);
export default router;

// app.js
app.use("/api/tasks", tasksRouter);`,
          try: R`انقل routes المهام لـ [[routes/tasks.routes.js]] واتأكد إن كل curl لسه شغال. وبعدين اعمل router تاني لـ [[/api/users]] بنفس الشكل.`,
          flag: "script",
          deep: {
            why: "API حقيقي فيه عشرات الـ endpoints. في ملف واحد بيبقى ألف سطر ومحدش يلاقي حاجة، وكل تعديل بيعمل conflicts في Git. الـ router بيدّي كل جزء ملفه ومسؤوليته.",
            how: R`الـ Router نفسه middleware: [[app.use("/api/tasks", router)]] معناها «أي طلب بيبدأ بـ [[/api/tasks]] ابعته للـ router ده». Express بيشيل الجزء المتطابق من [[req.url]] قبل ما يدّيه للـ router، فالـ router شايف [[/5]] بدل [[/api/tasks/5]]، والعنوان الكامل موجود في [[req.originalUrl]]، والجزء المتشال في [[req.baseUrl]].

الـ router ليه stack لوحده، فـ [[router.use(requireAuth)]] جواه بيحمي كل routes الملف ده بس.

لو الـ router متركّب على path فيه param زي [[/api/projects/:projectId/tasks]]، الـ router مش هيشوف [[projectId]] إلا لو عملته بـ [[Router({ mergeParams: true })]].

وفي Express 5 اتشال [[app.del]] (بقى [[delete]] بس)، واتشال الشكل القديم [[router.param(fn)]] اللي بياخد دالة من غير اسم، والاسم بقى من غير [[:]] في أوله: [[router.param("id", fn)]] مش [[":id"]].`,
            when: "من أول ما يبقى عندك أكتر من resource: router لكل resource أو لكل feature.",
            mistakes: R`تنسى [[mergeParams]] في nested router، فـ [[req.params.projectId]] يطلع undefined وانت متأكد إنه في العنوان. وتكتب [[router.get("/api/tasks/:id")]] جوه router متركّب أصلًا على [[/api/tasks]]، فالعنوان الحقيقي يبقى [[/api/tasks/api/tasks/:id]].`
          },
          teach: R`## ملف لكل resource

المثال ملفين: [[routes/tasks.routes.js]] فيه كل routes المهام على «app صغير» اسمه router، وسطر واحد في [[app.js]] بيركّب الـ router ده على [[/api/tasks]]. اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1، بفولدر فيه [[app.js]] و [[routes/]] و [[controllers/]]، والطلبات بـ curl من Git Bash على بورت تاني غير ٣٠٠٠.

---

## ١. [[import { Router } from "express";]]

[[Router]] دالة جوه Express بتعمل router جديد. بالأقواس لأنها named export (Express بيصدّرها باسمها جنب الـ default).

## ٢. [[import * as tasks from "../controllers/tasks.controller.js";]]

- [[* as tasks]] معناها «هات **كل** اللي الملف ده بيصدّره، وحطه في object واحد اسمه [[tasks]]». فلو الملف فيه [[export const list = ...]] و [[export const create = ...]]، تبقى [[tasks.list]] و [[tasks.create]].
- [[../]] يعني «اطلع فولدر لفوق»: احنا في [[routes/]]، والـ controller في [[controllers/]] جنبه.
- [[.js]] في آخر المسار **لازم** في ES Modules على Node. من غيرها Node مبيلاقيش الملف.

الـ controller اللي جربنا بيه بسيط، كل دالة فيه [[(req, res) => ...]]، و [[getOne]] بيرجّع شوية معلومات عن العنوان (هتلاقيها تحت).

## ٣. [[const router = Router();]]

router جديد فاضي. ليه [[get]] و [[post]] و [[use]] زي [[app]] بالظبط.

## ٤. الخمس سطور

| السطر | المسار جوه الـ router | المسار الحقيقي بعد التركيب |
|---|---|---|
| [[router.get("/", tasks.list)]] | [[/]] | [[GET /api/tasks]] |
| [[router.post("/", tasks.create)]] | [[/]] | [[POST /api/tasks]] |
| [[router.get("/:id", tasks.getOne)]] | [[/:id]] | [[GET /api/tasks/:id]] |
| [[router.patch("/:id", tasks.update)]] | [[/:id]] | [[PATCH /api/tasks/:id]] |
| [[router.delete("/:id", tasks.remove)]] | [[/:id]] | [[DELETE /api/tasks/:id]] |

لاحظ إننا بنمرر [[tasks.list]] **من غير أقواس**: بنسلّم الدالة نفسها لـ Express عشان يناديها هو مع كل طلب. لو كتبت [[tasks.list()]] هتتنادى مرة واحدة دلوقتي، وده غلط.

## ٥. [[export default router;]]

بيصدّر الـ router كحاجة أساسية للملف، عشان [[app.js]] يستورده بأي اسم.

## ٦. [[app.use("/api/tasks", tasksRouter);]]

في [[app.js]] (ومعاه [[import tasksRouter from "./routes/tasks.routes.js"]] فوق):

> «أي طلب عنوانه بيبدأ بـ [[/api/tasks]]، ابعته للـ router ده.»

---

## ٧. نجرّب

~~~text الناتج
curl -s localhost:3000/api/tasks                  [{"id":1,"title":"buy milk","done":false}]
curl -s -X PATCH localhost:3000/api/tasks/5       {"updated":"5"}
curl -s -X DELETE localhost:3000/api/tasks/5      [204]
curl -s localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"t"}'
                                                  {"id":2,"title":"t"}
~~~

### الـ router شايف إيه؟

[[getOne]] بيرجّع ٣ خانات من [[req]]:

~~~bash
curl -s "localhost:3000/api/tasks/5?x=1"
~~~

~~~text الناتج
{"id":5,"url":"/5?x=1","baseUrl":"/api/tasks","originalUrl":"/api/tasks/5?x=1"}
~~~

| الخانة | القيمة | معناها |
|---|---|---|
| [[req.url]] | [[/5?x=1]] | Express **شال** [[/api/tasks]] قبل ما يدّي الطلب للـ router، فالـ router شايف [[/5]] بس |
| [[req.baseUrl]] | [[/api/tasks]] | الجزء اللي اتشال (مكان التركيب) |
| [[req.originalUrl]] | [[/api/tasks/5?x=1]] | العنوان الأصلي كامل، ودا اللي تستخدمه في اللوجات |

وده سبب إن الـ router مش محتاج يعرف هو متركّب فين: تقدر تنقله لـ [[/api/v2/tasks]] من سطر واحد في [[app.js]].

---

## ٨. الـ users router (solCode)

نفس الشكل بالظبط في ملف تاني، و [[app.use("/api/users", usersRouter)]]:

~~~text الناتج
curl -s localhost:3000/api/users      [{"id":1,"name":"Mona"}]
curl -s localhost:3000/api/users/3    {"id":3}
~~~

[[Number(req.params.id)]] حوّلت [["3"]] لرقم، عشان كده [[3]] من غير تنصيص.

---

## ٩. الغلطتين المشهورتين

### المسار الكامل جوه الـ router

لو كتبت [[router.get("/api/tasks/:id", ...)]] جوه router متركّب على [[/api/tasks]]:

~~~text الناتج
curl localhost:3000/api/tasks/5               404
curl localhost:3000/api/tasks/api/tasks/5     {"id":5,"url":"/api/tasks/5","baseUrl":"/api/tasks","originalUrl":"/api/tasks/api/tasks/5"}
~~~

البادئة اتحطت مرتين.

### نسيت [[export default router]]

~~~text الناتج
file:///.../app.js:3
import usersRouter from "./routes/users.routes.js";
       ^^^^^^^^^^^
SyntaxError: The requested module './routes/users.routes.js' does not provide an export named 'default'
~~~

السيرفر مقامش أصلًا: ES Modules بيتأكد من الـ imports قبل ما أي سطر يشتغل.

---

## الخلاصة

| الملف | فيه |
|---|---|
| [[routes/tasks.routes.js]] | [[Router()]] + مسارات **نسبية** ([[/]] و [[/:id]]) + [[export default]] |
| [[app.js]] | [[import]] + [[app.use("/api/tasks", router)]] |

- المسار الحقيقي = مكان التركيب + المسار جوه الـ router.
- جوه الـ router: [[req.url]] من غير البادئة، و [[req.originalUrl]] كامل.
- مرر الدالة من غير [[()]].`,
          lines: [
            "Router من Express.",
            "كل دوال الـ controller في object واحد اسمه tasks.",
            "router جديد.",
            "[[GET /api/tasks]].",
            "[[POST /api/tasks]].",
            "[[GET /api/tasks/:id]].",
            "تعديل.",
            "مسح.",
            "صدّره عشان app يركّبه.",
            "في app.js: ركّب الـ router على [[/api/tasks]]."
          ],
          sol: R`بعد النقل كل الـ curl بيرجّع نفس الردود بالظبط: [[GET /api/tasks]] و [[GET /api/tasks/1]] و [[POST /api/tasks]] إلخ. جوه الـ router المسارات بتتكتب نسبية ([[/]] و [[/:id]])، و [[app.use("/api/tasks", tasksRouter)]] هو اللي بيحط البادئة.

أشهر غلطتين: تكتب [[router.get("/api/tasks/:id", ...)]] جوه الـ router، فالمسار الحقيقي يبقى [[/api/tasks/api/tasks/:id]] وكله يطلع 404. أو تنسى [[export default router]]، فالسيرفر يقع وهو بيقوم عند سطر الـ import نفسه بـ [[SyntaxError: The requested module './routes/users.routes.js' does not provide an export named 'default']]. (ولو المشروع CommonJS ونسيت [[module.exports = router]]، الـ [[require]] بيرجّع object فاضي و Express يقع بـ [[TypeError: argument handler must be a function]].)

لـ users نفس الشكل: ملف [[routes/users.routes.js]]، و [[app.use("/api/users", usersRouter)]]، و [[curl localhost:3000/api/users/3]] يرجّع [[{"id":3}]].`,
          solCode: R`// routes/users.routes.js
import { Router } from "express";

const router = Router();
router.get("/", (req, res) => res.json([{ id: 1, name: "Mona" }]));
router.get("/:id", (req, res) => res.json({ id: Number(req.params.id) }));
export default router;

// app.js
import usersRouter from "./routes/users.routes.js";
app.use("/api/users", usersRouter);`
        },
        {
          cmd: "routes / controllers / services",
          title: "كل طبقة ليها شغلانة واحدة",
          desc: R`الـ route بيقول «العنوان ده يروح لمين»، والـ controller بيقرا الطلب ويرد (HTTP بس)، والـ service فيها المنطق الحقيقي وبتكلّم الداتابيز ومتعرفش حاجة عن req و res.

الفايدة: الـ service تقدر تناديها من route، أو من cron job، أو من سكربت، أو من اختبار، من غير Express خالص.`,
          example: R`// controllers/tasks.controller.js
export async function create(req, res) {
  const task = await tasksService.create(req.user.id, req.body);
  res.status(201).json(task);
}

// services/tasks.service.js
export async function create(userId, data) {
  const count = await prisma.task.count({ where: { userId } });
  if (count >= 500) throw new AppError(409, "Task limit reached");
  return prisma.task.create({ data: { title: data.title, userId } });
}`,
          try: R`قسّم مشروعك لـ controllers و services. وبعدين اكتب سكربت صغير [[scripts/count.js]] بيستورد الـ service ويطبع عدد المهام من غير ما يشغّل Express. لو احتجت تستورد حاجة من Express في السكربت، يبقى فيه منطق HTTP دخل الـ service.`,
          flag: "script",
          deep: {
            why: "لما المنطق كله جوه الـ route، مبتقدرش تعيد استخدامه: الـ cron job اللي بيقفل المهام القديمة لازم ينسخ نفس الكود، والاختبار لازم يعمل طلب HTTP كامل عشان يختبر حسبة. والملف بيكبر لحد ما محدش يفهمه.",
            how: R`القاعدة: كل طبقة بتعرف اللي تحتها بس. الـ route بيعرف الـ controller، والـ controller بيعرف الـ service، والـ service بتعرف الداتابيز. عمر الـ service ما تستورد [[express]] أو تلمس [[res]].

الـ controller رقيق: يقرا من [[req.params]] و [[req.body]] و [[req.user]]، وينادي service، ويختار الـ status. والـ validation ممكن تبقى middleware قبله (درس [[validate(schema)]]).

الأخطاء بتطلع من الـ service كـ [[AppError]] فيها status، والـ controller مش بيمسكها أصلًا: في Express 5 أي خطأ من async handler بيروح لوحده لـ error middleware.

وفيه شكلين للفولدرات: حسب الطبقة ([[controllers/]] و [[services/]]) أو حسب الـ feature ([[modules/tasks/]] وجواه [[tasks.routes.js]] و [[tasks.controller.js]] و [[tasks.service.js]]). في مشروع حقيقي فيه أكتر من ٢٥ feature كان كل واحد في فولدره، ودا أسهل لما المشروع يكبر لأن كل حاجة تخص الـ feature في مكان واحد. وتنظيم الفولدرات حسب الـ feature بالتفصيل في درس «feature folders» في تاب «بناء مشروع كامل».`,
            when: R`من أول ما يبقى فيه منطق أكتر من «هات من الداتابيز ورجّع». مشروع صغير جدًا (٣ endpoints) ممكن يعيش في ملف واحد، وده مش عيب.`,
            mistakes: R`service بتاخد [[req]] كله أو بترجع [[res.json]]، فمتقدرش تناديها من cron. و controller فيه ١٠٠ سطر حسابات. وفي مشروع حقيقي كان فيه service واحدة للأدمن أكتر من ٣٨٠٠ سطر فيها كل حاجة الأدمن بيعملها: قسّم حسب الـ feature، مش حسب مين بيستخدمها.`
          },
          teach: R`## نفس العملية، متقسمة على ملفين

المثال عملية واحدة («ضيف مهمة») متقسمة نصين: **controller** بيتعامل مع HTTP (يقرا من [[req]] ويرد بـ [[res]])، و **service** فيها القاعدة الحقيقية (حد أقصى ٥٠٠ مهمة لكل يوزر) وبتكلّم الداتابيز. الاتنين بيتكلموا بدوال وبيانات عادية.

جرّبناه على ويندوز 11 (Node 24.19، Express 5.2.1). درس Prisma لسه جاي، فعملنا ملف [[db.js]] فيه [[prisma]] وهمي في الذاكرة بنفس الدوال ([[task.count]] و [[task.create]] و [[$disconnect]]) عشان نجرّب التقسيمة نفسها. وعشان نوصل للحد بسرعة خلينا الحد ٢ بدل ٥٠٠ وقت التجربة، وحطينا middleware صغير بيعمل [[req.user = { id: 7 }]] مكان الـ auth اللي لسه جاي.

---

## ١. الـ controller

~~~text controllers/tasks.controller.js
export async function create(req, res) {
  const task = await tasksService.create(req.user.id, req.body);
  res.status(201).json(task);
}
~~~

### [[export async function create(req, res)]]

- [[export]] عشان الـ router يستورده ([[tasks.create]] في الدرس اللي فات).
- [[async]] لأن جواه [[await]]: الداتابيز بتاخد وقت، والدالة دي بترجّع promise.

### [[await tasksService.create(req.user.id, req.body)]]

- [[tasksService]] الـ service، متستوردة فوق بـ [[import * as tasksService from "../services/tasks.service.js"]].
- بنديها **بيانات** مش الطلب: [[req.user.id]] (رقم اليوزر، الـ auth middleware بيحطه بعدين) و [[req.body]].
- [[await]] استنى النتيجة. لو الـ service رمت خطأ، السطر ده بيرمي هو كمان، والدالة بتقف.

### [[res.status(201).json(task)]]

الـ controller هو اللي **بيختار الـ status**، لأن ده قرار HTTP. الـ service متعرفش يعني إيه 201.

---

## ٢. الـ service

~~~text services/tasks.service.js
export async function create(userId, data) {
  const count = await prisma.task.count({ where: { userId } });
  if (count >= 500) throw new AppError(409, "Task limit reached");
  return prisma.task.create({ data: { title: data.title, userId } });
}
~~~

### [[export async function create(userId, data)]]

نفس الاسم [[create]] بس في ملف تاني، ومفيش تعارض لأن كل ملف module لوحده. الـ parameters عادية: رقم و object. **مفيش [[req]] ولا [[res]].**

### [[await prisma.task.count({ where: { userId } })]]

- [[prisma.task]] جدول المهام. [[count]] بيعدّ الصفوف.
- [[{ where: { userId } }]] الشرط: مهام اليوزر ده بس. [[{ userId }]] اختصار لـ [[{ userId: userId }]].

### [[if (count >= 500) throw new AppError(409, "Task limit reached")]]

ده **قاعدة بيزنس**: قرار من المنتج، مش من HTTP. لو اتعدّى الحد:

- [[throw]] بيوقف الدالة ويطلّع الخطأ لبرة.
- [[AppError]] class بتاعتنا (درس [[error middleware]]) بتشيل status ورسالة. الـ service بتقول «409» كمعلومة جوه الخطأ، بس مش بترد بنفسها.
- 409 Conflict: الطلب بيتعارض مع حالة موجودة.

### [[return prisma.task.create({ data: { title: data.title, userId } })]]

- [[data: { title: data.title, userId }]] بنختار الحقول بإيدنا: [[title]] من اللي جاي، و [[userId]] من الـ controller. لو الـ body فيه [[role]] أو [[userId]] تاني مش هيوصلوا.
- [[return]] بيرجّع الـ promise، و [[await]] اللي في الـ controller هو اللي بيستنى.

---

## ٣. نجرّب (والحد ٢)

ابتدينا بمهمة واحدة لليوزر ٧ في الداتابيز الوهمية، وبعتنا نفس الطلب مرتين، والـ body فيه [[role]] و [[userId: 1]] كمان:

~~~bash
curl -s -w " [%{http_code}]\n" localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"t","role":"ADMIN","userId":1}'
~~~

~~~text الناتج
{"id":2,"title":"t","userId":7} [201]
{"error":"Task limit reached"} [409]
~~~

- الأولى: كان فيه ١ (أقل من ٢)، فاتعملت. [[userId]] طلع [[7]] من [[req.user]] مش [[1]] اللي في الـ body، و [[role]] اتشال.
- التانية: بقوا ٢، فالـ service رمت [[AppError]]. الـ controller **ممسكهاش** خالص: Express 5 مسك الـ promise المرفوضة وبعتها لـ error handler اللي قرا [[err.status]] (درس «async errors في Express 5»).

---

## ٤. السكربت (solCode): نفس الـ service من غير Express

~~~text scripts/count.js
import * as tasksService from "../services/tasks.service.js";
import { prisma } from "../db.js";

console.log("tasks:", await tasksService.count());
await prisma.$disconnect();
~~~

- السكربت بينادي [[tasksService.count()]]، ودي دالة لازم تضيفها في الـ service جنب [[create]] (مش في المثال): [[export async function count() { return prisma.task.count(); }]].
- [[await]] في أول مستوى في الملف (top-level await) شغال في ES Modules من غير [[async function]].
- [[prisma.$disconnect()]] بيقفل الاتصال بالداتابيز. من غيره Prisma الحقيقي بيسيب الاتصال مفتوح والسكربت ميخلصش.

~~~bash
node scripts/count.js
~~~

~~~text الناتج
tasks: 1
~~~

وخلص لوحده بـ exit code 0، من غير ما يفتح بورت ولا يستورد [[express]]. ده الاختبار الحقيقي للتقسيمة: لو الـ service محتاجة [[req]] أو [[res]] عشان تشتغل، مكنتش هتقدر تناديها من هنا.

---

## الخلاصة

| الطبقة | بتعرف | متعرفش | مثال |
|---|---|---|---|
| route | العنوان والـ method | المنطق | [[router.post("/", tasks.create)]] |
| controller | [[req]] و [[res]] والـ status | الداتابيز | يقرا [[req.user.id]] ويرد 201 |
| service | قواعد البيزنس والداتابيز | HTTP | الحد ٥٠٠ و [[prisma.task.create]] |

- الـ service بتاخد بيانات عادية وبترجّع بيانات أو ترمي [[AppError]].
- الـ controller مش محتاج [[try/catch]] في Express 5.
- لو قدرت تنادي الـ service من سكربت من غير Express، التقسيمة صح.`,
          lines: [
            "الـ controller: بياخد من req ويرد بـ res، ومفيش منطق.",
            "بينادي الـ service بالبيانات اللي محتاجاها بس، مش req كله.",
            "يرد 201.",
            "قفلة.",
            "الـ service: دالة عادية، مفيهاش req ولا res.",
            "قاعدة من قواعد البيزنس: حد أقصى للمهام.",
            "لو عدّاه، ارمي خطأ بـ status، والـ error middleware يرد.",
            "اعمل المهمة في الداتابيز ورجّعها.",
            "قفلة."
          ],
          sol: R`[[node scripts/count.js]] بيطبع حاجة زي [[tasks: 1]] ويقفل لوحده، من غير ما يفتح بورت ولا يستورد express. ده الاختبار: الـ service بتاخد بيانات عادية (userId و data) وبترجّع بيانات أو ترمي [[AppError]]، ومتعرفش حاجة عن [[req]] و [[res]].

لو لقيت نفسك محتاج تعمل [[req]] وهمي أو تستورد express في السكربت، يبقى فيه منطق HTTP دخل الـ service: زي [[res.status(404)]] جوه الـ service بدل [[throw new AppError(404, ...)]]، أو إنها بتقرا [[req.user.id]] بنفسها بدل ما الـ controller يبعته. رجّع ده للـ controller.

ولو السكربت فضل مفتوح ومقفلش، يبقى فيه اتصال (Prisma مثلًا) لسه مفتوح: اعمل [[await prisma.$disconnect()]] في آخره.`,
          solCode: R`// scripts/count.js
import * as tasksService from "../services/tasks.service.js";
import { prisma } from "../db.js";

console.log("tasks:", await tasksService.count());
await prisma.$disconnect();`
        }
      ]
    }
]);
