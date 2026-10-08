// تكملة تاب arch: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/arch/01.js (شرح حقول الدرس في أوله)
MORE("arch", [
    {
      t: "المراقبة والباك أب",
      l: 3,
      n: "تعرف إن فيه مشكلة قبل العميل، وتعرف الناس بتستخدم المنتج إزاي، وترجع لو القاعدة ضاعت",
      items: [
        {
          cmd: "Sentry",
          title: "تعرف بالخطأ قبل ما العميل يكلمك",
          desc: R`أداة تتبع الأخطاء بتمسك أي error مش متوقع، في السيرفر أو في المتصفح، ومعاه الـ stack والطلب وإيه اللي حصل قبله. وبتجمّع الأخطاء المتشابهة في issue واحد، وتبعتلك تنبيه. في Node بتتعمل في ملف [[instrument.mjs]] بيتحمّل قبل التطبيق: [[node --import ./instrument.mjs dist/server.js]].

وفي Next.js: [[npx @sentry/wizard@latest -i nextjs]] بيظبط كل حاجة.`,
          example: R`import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.APP_ENV,
  release: process.env.GIT_SHA,
  tracesSampleRate: 0.1,
  dataCollection: { userInfo: false, cookies: false },
});

worker.on("failed", (job, err) => Sentry.captureException(err, { tags: { queue: job?.queueName, job: job?.name } }));`,
          try: R`اعمل route تجربة بيرمي error، شغّله مرة، وشوف الـ issue في Sentry ومعاه environment و release. بعدين امسح الـ route. وظبط alert يوصلك على Telegram أو الإيميل لما يظهر issue جديد في production.`,
          flag: "script",
          deep: {
            why: "من غير تتبع للأخطاء، أول مرة هتعرف فيها بالمشكلة لما عميل يكلمك، وده لو كلمك أصلًا. أغلب الناس بتقفل وتمشي. واللوجات لوحدها محتاجة حد يدوّر فيها، إنما تتبع الأخطاء بيجيلك لحد عندك.",
            how: R`الـ init لازم يحصل قبل أي import تاني، عشان الـ SDK يلحق يراقب http و express والقاعدة. عشان كده [[--import]]. وفي النسخ الحالية من SDK، أخطاء Express بتتمسك لوحدها بعد الـ init بالطريقة دي. النسخ الأقدم كانت محتاجة [[Sentry.setupExpressErrorHandler(app)]]، فراجع وثائق نسختك.

[[environment]] بيفصل أخطاء staging عن production. و [[release]] (رقم الـ commit) بيوريك الخطأ بدأ مع أنهي deploy، وبيربط الـ source maps. والـ source maps للواجهة بتترفع في CI، عشان الـ stack يبان بأسماء الملفات الحقيقية مش الكود المضغوط.

[[tracesSampleRate: 0.1]] معناها إنه بيقيس أداء ١٠٪ من الطلبات بس، عشان الكوتة والتكلفة. و [[dataCollection: { userInfo: false, cookies: false }]] معناها إنه مش بيبعت IPs و cookies (ده في SDK نسخة 11. في نسخة 10 وقبلها كان الاختيار [[sendDefaultPii: false]] وكان هو الافتراضي، إنما في 11 الاختيار ده اتشال وبيتجاهل من غير أي تحذير، والافتراضي بقى إنه يبعت الـ IP والكوكيز، فلازم تقفلهم بنفسك). والـ [[Sentry.setUser({ id })]] في requireAuth بـ id بس، من غير إيميل.

والأخطاء اللي بتحصل برّه الـ requests، زي الـ jobs، لازم تبعتها بنفسك بـ [[captureException]]. المثال بيعمل ده لأي job فشلت.

التنبيهات: issue جديد، أو issue رجع بعد ما اتقفل (regression)، أو عدد الأخطاء زاد فجأة. وخليها قليلة، لأن التنبيهات الكتير محدش بيقراها. وفيه بديل self-hosted متوافق مع نفس الـ SDK اسمه GlitchTip.`,
            when: "قبل الإطلاق. ومع كل deploy اتأكد إن الـ release اتسجّل.",
            mistakes: R`في المشاريع الحقيقية اللي راجعناها، Sentry كان في مشروع واحد بس. وفي المشروع ده كان فيه route عام بيرمي error عن قصد للتجربة، وفضل في الإنتاج. ومن الغلطات كمان: إنك تبعت بيانات شخصية (إيميلات، أو bodies فيها باسوردات). أو متسجّلش release فمتعرفش أنهي deploy كسر الحاجة. أو تنبيه على كل خطأ فتبطل تبص عليهم.`
          },
          teach: R`## الإعداد في ملف لوحده بيتحمّل قبل التطبيق، وسطر للـ jobs

المثال جزئين: [[Sentry.init]] (ده اللي بيتحط في [[instrument.mjs]])، وسطر في ملف الـ worker بيبعت أي job فشلت. جربناه بـ [[@sentry/node]] 11.5 و Express 5 و BullMQ 6 على Redis 8 (Docker، ويندوز 11، Node 24). ومفيش حساب Sentry هنا، فعملنا سيرفر صغير على [[127.0.0.1:6041]] بيستقبل اللي الـ SDK بيبعته ويطبعه، والـ DSN بيشاور عليه: [[http://pubkey@127.0.0.1:6041/1]]. يعني اللي تحت هو اللي الـ SDK بعته فعلًا، بس شكل الـ issue في لوحة Sentry من الـ docs.

---

## ١. [[import * as Sentry from "@sentry/node";]]

[[import * as Sentry]] يعني «هات كل اللي المكتبة بتصدّره في object واحد اسمه Sentry»، فبنكتب [[Sentry.init]] و [[Sentry.captureException]].

---

## ٢. [[Sentry.init({ ... })]]

### [[dsn: process.env.SENTRY_DSN]]

DSN = Data Source Name: عنوان المشروع في Sentry، فيه مفتاح عام والـ host ورقم المشروع. الـ SDK بيبعت الأحداث على [[/api/<رقم المشروع>/envelope/]]:

~~~text الناتج (اللي وصل للسيرفر الوهمي)
"path":"/api/1/envelope/?sentry_version=7&sentry_key=pubkey&sentry_client=sentry.javascript.node%2F11.5.0"
~~~

ولو [[SENTRY_DSN]] فاضي، الـ SDK مبيبعتش حاجة ومبيقعش، وده مناسب للتطوير على جهازك.

### [[environment: process.env.APP_ENV]] و [[release: process.env.GIT_SHA]]

بيتبعتوا مع كل خطأ:

~~~text الناتج
"exception":"Error: sentry test","environment":"staging","release":"abc123"
~~~

في اللوحة بتفلتر بيهم: أخطاء production بس، والخطأ ده بدأ مع أنهي commit.

### [[tracesSampleRate: 0.1]]

قياس الأداء (traces) لـ ١٠٪ من الطلبات بس. [[0.1]] = عشر. الأخطاء نفسها بتتبعت كلها، دي حاجة تانية.

### [[dataCollection: { userInfo: false, cookies: false }]]

في نسخة 11 الافتراضي إن الـ SDK يبعت بيانات الزائر. شغّلنا نفس الطلب ([[Cookie: rt=secret]] و [[Authorization: Bearer xyz]]) مرة من غير السطر ده ومرة بيه:

~~~text الناتج (من غير dataCollection)
"user":{"ip_address":"::1"}
"request":{"cookies":{"rt":"secret"},"headers":{...,"cookie":"[Filtered]","authorization":"[Filtered]"}}
~~~

~~~text الناتج (بـ dataCollection)
"request":{"url":"http://localhost:6040/debug-sentry?email=a@b.c","headers":{...,"authorization":"[Filtered]"},"query":"email=a@b.c"}
~~~

- من غيره: الـ IP اتبعت ([[::1]] هو localhost في IPv6)، والأخطر إن الـ header بتاع الـ cookie اتفلتر بس نفس القيمة اتبعتت في [[cookies]]: الـ refresh token بقى في Sentry.
- بيه: مفيش [[user]] ولا [[cookies]]. بس الـ query string لسه بيتبعت ([[email=a@b.c]])، فمتحطش بيانات شخصية في الـ URLs.

### [[});]]

قفلة الـ init.

---

## ٣. [[node --import ./instrument.mjs dist/server.js]]

[[--import]] بيحمّل الملف ده قبل التطبيق. الـ SDK لازم يتحمّل قبل express والقاعدة عشان يلحق «يلف» المكتبات دي ويراقبها.

---

## ٤. [[worker.on("failed", (job, err) => Sentry.captureException(err, { tags: { queue: job?.queueName, job: job?.name } }));]]

- [[worker]]: الـ Worker بتاع BullMQ (درس «background jobs»).
- [[.on("failed", ...)]]: الدالة دي بتشتغل كل ما job تفشل، ومعاها الـ job والخطأ.
- [[Sentry.captureException(err, ...)]]: ابعت الخطأ ده بنفسك. الأخطاء اللي برّه أي طلب HTTP محدش هيمسكها لوحده.
- [[tags]]: حقول تفلتر بيها في اللوحة.
- [[job?.queueName]]: [[?.]] لأن BullMQ ممكن ينادي الـ failed من غير job في حالات نادرة، فمنقعش.

جربناها بـ job اسمها [[welcome]] في queue [[emails]] بترمي [[SMTP timeout]]:

~~~text الناتج
"exception":"Error: SMTP timeout","environment":"staging","release":"abc123","tags":{"queue":"emails","job":"welcome"}
~~~

---

## ٥. الـ solCode: route تجربة و [[setupExpressErrorHandler]]

- [[app.get("/debug-sentry", () => { throw new Error("sentry test"); })]]: route بيرمي عن قصد. بعد التجربة اتمسح (أي حد يقدر يخلّص الكوتة بيه).
- [[Sentry.setupExpressErrorHandler(app)]] بعد الـ routes وقبل الـ errorHandler بتاعك: بيبعت الخطأ لـ Sentry وبيعدّيه للي بعده.

~~~text الناتج
{"error":{"code":"INTERNAL"}} 500
~~~

المستخدم شاف رد عام، و Sentry وصله الخطأ كامل. وفتحنا الـ route مرتين ورا بعض، ووصل حدث واحد بس: الـ SDK فيه integration اسمه Dedupe بيشيل الخطأ المكرر اللي ورا بعض على طول. وفي اللوحة، الأخطاء اللي ليها نفس الـ stack بتتجمع في issue واحد وعدد الـ events بيزيد (من الـ docs).

---

## الخلاصة

| السطر | اللي شفناه |
|---|---|
| [[dsn]] | الأحداث رايحة على [[/api/1/envelope/]] |
| [[environment]] و [[release]] | [["staging"]] و [["abc123"]] مع كل خطأ |
| [[dataCollection]] | من غيره الـ IP والـ cookies (فيها التوكن) بيتبعتوا |
| [[--import]] | الـ init قبل أي حاجة |
| [[captureException]] في [[failed]] | أخطاء الـ jobs بالـ queue واسم الـ job |`,
          lines: [
            "SDK بتاع Node.",
            "الإعداد، ولازم يتحمّل قبل أي حاجة تانية:",
            "عنوان المشروع في Sentry، من البيئة.",
            "staging ولا production.",
            "رقم الـ commit، عشان تعرف الخطأ بدأ مع أنهي deploy.",
            "قيس أداء ١٠٪ من الطلبات بس.",
            "متبعتش IPs و cookies (SDK نسخة 11).",
            "قفلة.",
            "في ملف الـ worker: أي job فشلت، ابعتها لـ Sentry باسم الـ queue والـ job."
          ],
          sol: R`بعد ما تفتح الـ route مرة، في Sentry تحت Issues هيظهر issue جديد عنوانه نص الخطأ (مثلًا [[Error: sentry test]])، وجواه الـ stack trace بأسماء ملفاتك، وفي الـ tags [[environment: staging]] و [[release]] بقيمة الـ GIT_SHA. ولو فتحت الـ route ١٠ مرات، هيفضل issue واحد والـ Events بقوا ١٠، لأن Sentry بيجمع الأخطاء اللي ليها نفس الـ stack.

لو مفيش حاجة ظهرت: اتأكد إن [[SENTRY_DSN]] واصل (اطبع [[Boolean(process.env.SENTRY_DSN)]])، وإن [[Sentry.init]] بيتنادي قبل ما express يتعمل import (في ملف [[instrument.js]] بيتحمّل بـ [[node --import ./instrument.js]])، ولو على نسخة SDK قديمة، اتأكد إنك سجّلت [[Sentry.setupExpressErrorHandler(app)]] قبل الـ errorHandler بتاعك، لأن من غيره الـ errorHandler بيبلع الخطأ ويرد 500 و Sentry ميعرفش. (في نسخة 11 الخطأ بيوصل حتى من غيره، وتسجيله مش بيضر.)

الـ alert: في Alerts اعمل rule من نوع Issue alert، شرطها «A new issue is created» والفلتر [[environment = production]]، والـ action إيميل أو integration. وجرّبه بخطأ في staging بعد ما تشيل الفلتر مؤقتًا. ولو الـ stack فيه أسماء ملفات غريبة زي [[dist/index.js:1:23456]]، محتاج ترفع الـ source maps.`,
          solCode: R`// instrument.js: node --import ./instrument.js dist/server.js
import * as Sentry from "@sentry/node";
Sentry.init({ dsn: process.env.SENTRY_DSN, environment: process.env.APP_ENV, release: process.env.GIT_SHA, tracesSampleRate: 0.1, dataCollection: { userInfo: false, cookies: false } });

// app.ts
import * as Sentry from "@sentry/node";
app.get("/debug-sentry", () => { throw new Error("sentry test"); });
// ... الـ routes
Sentry.setupExpressErrorHandler(app);
app.use(errorHandler);`
        },
        {
          cmd: "structured logs",
          title: "لوج تقدر تدوّر فيه",
          desc: R`اللوج يبقى JSON، سطر لكل حدث، وفيه حقول تقدر تفلتر بيها: المستوى، والـ request id، والـ orderId. pino بيكتب JSON بسرعة على stdout، و pino-http بيسجّل كل طلب بمدته والـ status بتاعه، وبيدّي كل طلب id ترجع بيه للمشكلة.

وأي باسورد أو توكن بيتشال من اللوج قبل ما يتكتب (redact).`,
          example: R`import pino from "pino";
import pinoHttp from "pino-http";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  redact: ["req.headers.authorization", "req.headers.cookie", "*.password", "*.token"],
});
app.use(pinoHttp({
  logger,
  genReqId: (req, res) => { const id = req.headers["x-request-id"] ?? crypto.randomUUID(); res.setHeader("x-request-id", id); return id; },
}));

req.log.info({ orderId: order.id, amountCents: order.amountCents }, "order created");`,
          try: R`اعمل طلب، وخد الـ [[x-request-id]] من الرد، ودوّر عليه في اللوج بـ [[grep]] و [[jq]]. بعدين ابعت login وتأكد إن الباسورد مش ظاهر. وفي التطوير، شغّل السيرفر ووجّه الناتج لـ [[pino-pretty]] عشان يتقري.`,
          flag: "script",
          deep: {
            why: "لما عميل يقول «الدفع وقع الساعة ٣»، محتاج تلاقي طلبه بالظبط في وسط مليون سطر. النص الحر زي «something went wrong» مبيتدوّرش فيه. الـ JSON بحقول ثابتة بيتفلتر بأمر واحد.",
            how: R`المستويات: [[fatal]] و [[error]] و [[warn]] و [[info]] و [[debug]]. في الإنتاج info، ولو بتدوّر على مشكلة debug لفترة. و pino بيكتبهم أرقام (error بـ 50، و info بـ 30).

الـ request id هو الخيط اللي بيربط كل حاجة. Nginx ممكن يعمله ([[$request_id]]) ويبعته في header، أو التطبيق بيعمله. بيرجع للـ client في header الرد، وبيتكتب مع كل سطر لوج للطلب ده. وحطه كمان في داتا أي job بتتعمل من الطلب، وفي رد الخطأ، عشان الدعم يطلبه من العميل.

pino بيكتب على stdout بسرعة ومن غير ما يوقف الـ event loop، و Docker أو المنصة بيجمعوا. في التطوير [[pino-pretty]] بيخليه مقروء. وفي الإنتاج بتبعت اللوجات لمكان تدوّر فيه: Grafana Loki، أو Better Stack، أو Axiom. وخلي بالك إن ليها تكلفة بالحجم ومدة الاحتفاظ. وحدود حجم لوجات Docker في تاب «Docker».

سجّل الأحداث بالـ ids (orderId، و userId)، مش الداتا كلها. وممنوع تسجّل bodies طلبات الـ auth، أو التوكنات، أو محتوى رسايل المستخدمين.`,
            when: "من أول يوم. واتفق على أسماء الحقول (orderId مش order_id في مكان و id في مكان تاني).",
            mistakes: R`في مشروع حقيقي، الـ logger كان بيعمل [[fs.appendFileSync]] مع كل طلب. ده بيوقف الـ event loop لحد ما الديسك يكتب. وكان بيسجّل الـ status code قبل ما الرد يتبعت، فكل الطلبات طالعة 200 في اللوج. وكان بيعمل rotation بإيده. pino-http بيستنى الـ response يخلص. وفي مشروع تاني كان محتوى رسايل الشات بيتكتب في اللوج. في المقابل، مشروع Python كان عامل حاجة صح: لوج JSON فيه request id، و regex بيشيل توكنات البوت قبل الكتابة.`
          },
          teach: R`## logger واحد بيكتب JSON، و middleware بيسجّل كل طلب بـ id

المثال ٣ حاجات: [[logger]] أساسي من pino، و pino-http كـ middleware بيسجّل كل طلب ويدّيه id، وسطر لوج من جوه route. جربناه بـ pino 10 و pino-http 11 و Express 5 (ويندوز 11، Node 24) على [[localhost:6040]]، وأوامر الـ solCode بـ curl من Git Bash، و [[jq]] جوه [[ubuntu:24.04]] (Docker) لأنه مش متسطب على ويندوز.

---

## ١. الـ imports

[[pino]] الـ logger نفسه، و [[pinoHttp]] الـ middleware. الاتنين default export، فبنكتب اسم من عندنا من غير [[{ }]].

---

## ٢. [[export const logger = pino({ ... });]]

### [[level: process.env.LOG_LEVEL ?? "info"]]

[[??]] = «لو الشمال [[undefined]] أو [[null]] خد اليمين». يعني [[info]] لو مفيش متغير بيئة. والمستويات بالترتيب: [[fatal]] (60) و [[error]] (50) و [[warn]] (40) و [[info]] (30) و [[debug]] (20) و [[trace]] (10). المستوى [[info]] معناه «اكتب ٣٠ وأعلى»، فـ [[debug]] بيتجاهل.

### [[redact: ["req.headers.authorization", "req.headers.cookie", "*.password", "*.token"]]]

مسارات جوه سطر اللوج، قيمتها بتتبدل بـ [[[Redacted]]] قبل الكتابة. و [[*]] = «أي مفتاح في المستوى ده».

---

## ٣. [[app.use(pinoHttp({ logger, genReqId: ... }))]]

- [[logger]]: نفس الـ logger، فنفس الإعدادات والـ redact.
- [[genReqId: (req, res) => { ... }]]: دالة بتدّي كل طلب id:
  - [[req.headers["x-request-id"] ?? crypto.randomUUID()]]: لو Nginx (أو اللي قدامنا) بعت id خده، وإلا اعمل UUID جديد ([[crypto.randomUUID]] موجودة global في Node).
  - [[res.setHeader("x-request-id", id)]]: رجّعه للـ client في الرد، عشان العميل أو الدعم يقولولك عليه.
  - [[return id]]: pino-http بيحطه في [[req.id]] وفي كل سطر لوج للطلب ده.

pino-http بيكتب سطر [[request completed]] بعد ما الرد يخلص، ومعاه الـ status و [[responseTime]] بالملّي.

> خلي بالك: الـ id اللي جاي من الـ header بيتصدّق زي ما هو. ورا Nginx ده المطلوب، بس لو التطبيق مكشوف، أي حد يبعت id من عنده. حط حد لطوله، أو اقبله من الـ proxy بس.

---

## ٤. [[req.log.info({ orderId: order.id, amountCents: order.amountCents }, "order created");]]

[[req.log]] logger مربوط بالطلب ده (pino-http عامله)، فأي سطر منه فيه [[req]] و [[req.id]] لوحده. الـ argument الأول object حقول، والتاني الرسالة ([[msg]]).

~~~text الناتج (السطر الأول، مختصر)
{"level":30,"time":1791459810304,"pid":46896,"hostname":"ALI-PC","req":{"id":"35e9548c-...","method":"POST","url":"/orders",...,"headers":{...,"authorization":"[Redacted]"}},"orderId":"o_1","amountCents":50000,"msg":"order created"}
{"level":30,...,"req":{"id":"35e9548c-...",...},"res":{"statusCode":201,"headers":{...,"x-request-id":"35e9548c-..."}},"responseTime":5,"msg":"request completed"}
~~~

- [[level: 30]] = info. و [[time]] بالملّي من ١٩٧٠.
- [[authorization]] بقى [[[Redacted]]].
- السطرين نفس [[req.id]]. وطلب تاني بعتنا فيه [[x-request-id: from-nginx-123]] خد الـ id ده بالظبط.

---

## ٥. الـ solCode سطر سطر

### [[RID=$(curl -s -D - -o /dev/null -X POST ... | grep -i x-request-id | cut -d' ' -f2 | tr -d '\r')]]

- [[$(...)]]: نفّذ وحط الناتج في المتغير [[RID]].
- [[curl -s -D - -o /dev/null]]: [[-s]] من غير progress، و [[-D -]] اطبع الـ headers على الشاشة، و [[-o /dev/null]] ارمي الـ body.
- [[grep -i x-request-id]]: السطر ده بس، من غير فرق حروف.
- [[cut -d' ' -f2]]: قسّم بالمسافة وخد الحتة التانية (القيمة).
- [[tr -d '\r']]: HTTP بينهي كل header بـ [[\r\n]]، فبنشيل الـ [[\r]] وإلا الـ grep اللي بعده مش هيلاقي حاجة.

~~~text الناتج
RID=35e9548c-c628-4dc7-b174-4f3090c409ce
~~~

### [[grep "$RID" app.log | jq -c '{msg, id: .req.id, orderId, status: .res.statusCode}']]

[[jq]] بيقرا JSON. [[-c]] سطر واحد. و [[{msg, id: .req.id, ...}]] بيعمل object جديد: [[msg]] لوحدها اختصار [[msg: .msg]].

~~~text الناتج
{"msg":"order created","id":"35e9548c-c628-4dc7-b174-4f3090c409ce","orderId":"o_1","status":null}
{"msg":"request completed","id":"35e9548c-c628-4dc7-b174-4f3090c409ce","orderId":null,"status":201}
~~~

ده الطلب كله من وسط اللوج بأمرين.

### الـ login و [[grep -c hunter22 app.log]]

~~~text الناتج
"body":{"email":"a@b.c","password":"[Redacted]"},"msg":"login attempt"
grep -c hunter22: 0
~~~

[[grep -c]] بيعد السطور. صفر يعني الباسورد مكتوبش في أي مكان. وجربنا سطر تاني بـ [[{ data: { user: { password } } }]]:

~~~text الناتج
"data":{"user":{"password":"hunter22"}},"msg":"deep"
grep -c hunter22: 1
~~~

[[*.password]] بتمسك مستوى واحد بس تحت الجذر. عشان كده متعملش log للـ body كله أصلًا.

### [[node dist/server.js | npx pino-pretty]]

[[|]] بيوصّل خرج السيرفر لـ pino-pretty اللي بيحوّل كل سطر لشكل مقروء:

~~~text الناتج
[14:43:30.304] INFO (46896): order created
    req: { "id": "35e9548c-...", "method": "POST", "url": "/orders", ... }
    orderId: "o_1"
    amountCents: 50000
~~~

ده للتطوير بس. الإنتاج JSON خام، لأن أدوات البحث (Loki و Better Stack و Axiom) بتقراه كده.

---

## الخلاصة

| الحاجة | الكود | النتيجة |
|---|---|---|
| JSON سطر لكل حدث | [[pino()]] | [[level]] و [[time]] و [[msg]] وحقولك |
| id لكل طلب | [[genReqId]] + header الرد | كل سطور الطلب بنفس [[req.id]] |
| حقول بتتفلتر بيها | [[req.log.info({ orderId }, "...")]] | [[grep]] + [[jq]] |
| أسرار | [[redact]] | [[[Redacted]]]، مستوى واحد بس لـ [[*]] |`,
          lines: [
            "pino: logger سريع بيكتب JSON.",
            "middleware بيسجّل كل طلب HTTP.",
            "الـ logger الأساسي...",
            "...المستوى من البيئة، والافتراضي info...",
            "...وأي حقل من دول بيتشال قبل الكتابة.",
            "قفلة.",
            "سجّل كل طلب...",
            "...بنفس الـ logger...",
            "...وكل طلب ليه id: من الـ header لو جاي من Nginx، أو جديد. وبيرجع للـ client في الرد.",
            "قفلة.",
            "جوه أي route: سطر بحقول تقدر تدوّر بيها، والـ request id بيتحط لوحده."
          ],
          sol: R`كل سطر في اللوج JSON واحد. الطلب اللي خدت الـ [[x-request-id]] بتاعه هتلاقيله سطرين على الأقل: [[{"msg":"order created","orderId":"o_1",...}]] و [[{"msg":"request completed","res":{"statusCode":201},...}]]، وفي الاتنين [[req.id]] هو نفس القيمة. ده اللي بيربط كل سطور الطلب الواحد ببعض.

الـ login: الـ header بتاع [[authorization]] هيظهر [[[Redacted]]]، ولو بتعمل log لـ [[{ body: req.body }]] هتلاقي [["password":"[Redacted]"]]. و [[grep -c]] على الباسورد الحقيقي في ملف اللوج لازم يرجع 0. خلي بالك إن [[*.password]] بتمسك مستوى واحد بس: [[{ body: { password } }]] بتتمسك، بس [[{ data: { user: { password } } }]] لأ. عشان كده متعملش log للـ body كله أصلًا.

pino-pretty بيحوّل كل سطر لشكل زي [[[22:21:11.085] INFO (20726): request completed]] وتحته الحقول. ده للتطوير بس، الإنتاج JSON خام عشان أدوات البحث تقراه.`,
          solCode: R`RID=$(curl -s -D - -o /dev/null -X POST localhost:4000/orders -H "Authorization: Bearer $TOKEN" | grep -i x-request-id | cut -d' ' -f2 | tr -d '\r')
grep "$RID" app.log | jq -c '{msg, id: .req.id, orderId, status: .res.statusCode}'

curl -s -o /dev/null -H "Content-Type: application/json" -d '{"email":"a@b.c","password":"hunter22"}' localhost:4000/auth/login
grep -c hunter22 app.log        # 0

node dist/server.js | npx pino-pretty`
        },
        {
          cmd: "health و uptime",
          title: "السيرفر عايش؟ والقاعدة عايشة؟",
          desc: R`endpoint اسمه [[/healthz]] بيقول «الـ process شغال» من غير ما يلمس أي حاجة تانية. و [[/readyz]] بيتأكد إن القاعدة و Redis بيردوا. الأول بيستخدمه الـ orchestrator (Kubernetes، أو Docker Swarm، أو Docker مع أداة زي autoheal) عشان يعمل restart لو السيرفر هنج. Docker لوحده بيعلّم الـ container إنه unhealthy بس. والتاني بيستخدمه الـ load balancer عشان ميبعتش طلبات لنسخة مش جاهزة.

وبرّه السيرفر خالص، خدمة uptime بتضرب رابطك كل دقيقة من كذا مكان، وتبعتلك لو وقع.`,
          example: R`app.get("/healthz", (req, res) => res.json({ ok: true, version: process.env.GIT_SHA }));
app.get("/readyz", async (req, res) => {
  try {
    await db.$queryRaw$__btSELECT 1$__bt;
    await redis.ping();
    res.json({ ok: true });
  } catch (e) {
    req.log.error(e, "readiness failed");
    res.status(503).json({ ok: false });
  }
});`,
          try: R`وقّف Redis بـ [[docker stop]] واطلب الاتنين. [[/healthz]] لازم يفضل 200، و [[/readyz]] يرجع 503 من غير أي تفاصيل. بعدين سجّل رابطك في خدمة uptime مجانية، واقفل السيرفر، وشوف التنبيه وصل بعد قد إيه.`,
          flag: "script",
          deep: {
            why: "السيرفر ممكن يكون «شغال» والقاعدة واقعة، فكل طلب بيرجع 500. وممكن السيرفر كله يقع الساعة ٢ بالليل، ومحدش يعرف لحد الصبح. الـ health checks بتخلي الأدوات تعالج لوحدها، والـ uptime monitor بيصحّيك.",
            how: R`فيه فرق بين liveness و readiness، وده مهم. الـ liveness ([[/healthz]]) لازم يبقى بسيط جدًا. لو خليته يسأل القاعدة، والقاعدة هنجت ثانيتين، الـ orchestrator (Kubernetes أو Swarm أو autoheal) هيعمل restart لكل نسخ التطبيق مع بعض، وتبقى المشكلة أكبر. والـ readiness ([[/readyz]]) هو اللي بيسأل التوابع، ولو فشل، النسخة بتخرج من الـ load balancer مؤقتًا بس، من غير restart.

في compose بتعمل [[healthcheck]] بيضرب [[/healthz]]، وتقدر تستخدم [[depends_on]] بشرط [[service_healthy]]. التفاصيل في تاب «Docker».

خدمة الـ uptime (زي UptimeRobot أو Better Stack، أو Uptime Kuma لو عايز تشغّلها بنفسك) لازم تبقى برّه السيرفر، عشان لو السيرفر وقع هي لسه شغالة. بتضرب الرابط العام كل دقيقة، وتبعت تنبيه بعد فشلين ورا بعض (Telegram، أو SMS، أو إيميل). وخليها تراقب كمان انتهاء شهادة SSL وتجديد الدومين.

وفيه نوع تاني اسمه heartbeat، للـ jobs. الـ job بتضرب رابط لما تخلص بنجاح، ولو الرابط محدش ضربه في الميعاد، يجيلك تنبيه. ده أهم حاجة لسكربت الباك أب، لأن السكربت اللي بيفشل في صمت أخطر حاجة.`,
            when: "قبل الإطلاق. والـ heartbeat مع أول cron job.",
            mistakes: R`في مشروعين حقيقيين، الـ health endpoint كان بيرجّع رسالة خطأ القاعدة زي ما هي للي بيطلبه. رد عام ([[{ ok: false }]]) وتفاصيل الخطأ في اللوج. ومن الغلطات كمان: إنك تحط الـ liveness بيسأل القاعدة فتعمل restart storm. أو تراقب من نفس السيرفر. أو تنبيهات بتروح إيميل محدش بيفتحه.`
          },
          teach: R`## endpointين: واحد بيقول «أنا عايش»، وواحد بيقول «أنا جاهز»

[[/healthz]] بيرد على طول من غير ما يلمس أي حاجة. و [[/readyz]] بيسأل القاعدة و Redis، ولو أي واحد فشل بيرد 503 عام والتفاصيل في اللوج. جربناهم بـ Express 5 و Prisma 7 (PostgreSQL 18) و ioredis 6 (Redis 8)، والقاعدة و Redis في Docker (ويندوز 11، Node 24)، و [[req.log]] من pino-http.

---

## ١. [[app.get("/healthz", (req, res) => res.json({ ok: true, version: process.env.GIT_SHA }));]]

- مفيش [[async]] ومفيش [[await]]: مبيستناش أي حاجة برّه الـ process.
- [[version]]: رقم الـ commit من متغير البيئة، فتعرف من برّه أنهي نسخة شغالة (مفيد بعد الـ deploy).

~~~text الناتج
{"ok":true,"version":"abc123"} 200 0.007226s
~~~

[[curl -w " %{http_code} %{time_total}s"]] بيطبع الـ status والوقت بعد الرد.

---

## ٢. [[app.get("/readyz", async (req, res) => { try { ... } catch (e) { ... } });]]

### جوه [[try]]

- [[await db.$queryRaw$__btSELECT 1$__bt;]]: أصغر استعلام ممكن: القاعدة بترد؟ و [[$queryRaw]] بالـ backticks (tagged template) بيبعت SQL خام بأمان.
- [[await redis.ping();]]: Redis بيرد بـ [[PONG]].
- [[res.json({ ok: true });]]: الاتنين ردوا.

### [[catch (e)]]

- [[req.log.error(e, "readiness failed");]]: التفاصيل (نوع الخطأ والرسالة والـ stack) في اللوج بس.
- [[res.status(503).json({ ok: false });]]: 503 = Service Unavailable، من غير أي تفاصيل للي بيسأل.

~~~text الناتج (القاعدة و Redis شغالين)
{"ok":true} 200 0.075739s
~~~

---

## ٣. التجربة: وقّفنا Redis بـ [[docker stop]]

~~~text الناتج
{"ok":true,"version":"abc123"} 200 0.003230s     ← /healthz
{"ok":false} 503 73.259418s                       ← /readyz
~~~

- [[/healthz]] فضل 200: الـ process نفسه سليم، فالـ orchestrator ميعملوش restart.
- [[/readyz]] رجّع 503 صح، بس بعد **٧٣ ثانية**. السبب في إعدادات ioredis الافتراضية:

~~~text الناتج (من اللوج ومن إعدادات ioredis 6)
"err":{"type":"MaxRetriesPerRequestError","message":"Reached the max retries per request limit (which is 20)..."
maxRetriesPerRequest: 20   enableOfflineQueue: true
retryStrategy: Math.min(Math.pow(2, times - 1) * 50, 5000) + jitter
~~~

يعني الـ [[ping]] بيتحط في طابور (offline queue) ويستنى ٢٠ محاولة إعادة اتصال، والمهلة بتتضاعف لحد ٥ ثواني. والـ load balancer أو Kubernetes بيستنى الـ check ثواني قليلة، فيعتبر الطلب timeout، وكل طلب من دول ماسك connection طول المدة.

الحل عميل Redis خاص بالـ health:

~~~javascript
const redis = new Redis(process.env.REDIS_URL, { enableOfflineQueue: false, maxRetriesPerRequest: 1 });
~~~

~~~text الناتج (نفس التجربة بالعميل ده)
{"ok":false} 503 0.109427s
"err":{"type":"Error","message":"Stream isn't writeable and enableOfflineQueue options is false"
~~~

١٠٠ ملّي بدل ٧٣ ثانية. والتفاصيل في اللوج بس، والرد [[{"ok":false}]].

---

## ٤. مين بيسأل مين

| الـ endpoint | مين بيسأله | لو فشل |
|---|---|---|
| [[/healthz]] | الـ orchestrator (Kubernetes liveness، أو Docker [[healthcheck]] + autoheal) | restart |
| [[/readyz]] | الـ load balancer (Kubernetes readiness) | تخرج من التوزيع مؤقتًا، من غير restart |
| الرابط العام | خدمة uptime برّه السيرفر (UptimeRobot، أو Better Stack، أو Uptime Kuma) | تنبيه ليك |

ليه [[/healthz]] ميسألش القاعدة؟ لو القاعدة هنجت ثانيتين، كل النسخ هتفشل الـ liveness مع بعض، وكلها تتعمل restart مع بعض، والمشكلة تكبر. خدمات الـ uptime نفسها مجربناهاش هنا (من وثائقها).

---

## الخلاصة

- [[/healthz]]: سريع ومن غير توابع، ومعاه رقم النسخة.
- [[/readyz]]: القاعدة و Redis، و 503 عام، والتفاصيل في اللوج.
- عميل Redis للـ health بـ [[enableOfflineQueue: false]] و [[maxRetriesPerRequest: 1]]، وإلا الـ check بياخد أكتر من دقيقة.
- المراقبة من برّه السيرفر، والـ jobs بـ heartbeat.`,
          lines: [
            "الـ process شغال. من غير أي توابع، ومعاه رقم النسخة.",
            "جاهز يستقبل طلبات؟",
            "جرّب...",
            "...القاعدة بترد...",
            "...و Redis بيرد...",
            "...يبقى جاهز.",
            "لو أي واحد فشل...",
            "...سجّل التفاصيل في اللوج...",
            "...ورد 503 عام، من غير أي تفاصيل داخلية.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`وRedis شغال: الاتنين [[200]]، و [[/healthz]] بيرجع [[{"ok":true,"version":"abc123"}]]. بعد [[docker stop]] للـ Redis: [[/healthz]] لسه [[200]] بنفس الرد، و [[/readyz]] بيرجع [[503]] و [[{"ok":false}]] بس. تفاصيل الخطأ (connection refused والـ host والـ port) موجودة في اللوج تحت [["readiness failed"]]، مش في الرد.

خلي بالك: مع إعدادات ioredis الافتراضية، [[redis.ping()]] وRedis واقع بيفضل مستني ٢٠ محاولة إعادة اتصال (جربناها بـ ioredis 6: الـ [[/readyz]] رد بعد ٧٣ ثانية). الأفضل عميل للـ health بـ [[enableOfflineQueue: false]] و [[maxRetriesPerRequest: 1]]، أو [[Promise.race]] مع timeout ثانية.

خدمة الـ uptime (UptimeRobot أو Better Stack مثلًا) بتفحص كل دقيقة أو خمسة حسب الخطة، ومعظمها بيستنى فحصين أو تلاتة فاشلين قبل ما تبعت، فالتنبيه بيوصل بعد من دقيقة لـ ١٠ تقريبًا. الرقم ده هو أقل وقت هتعرف فيه إن السيرفر وقع. سجّل [[/healthz]] مش [[/readyz]]، إلا لو عايز تتنبّه لما القاعدة تقع كمان.`
        },
        {
          cmd: "PostHog",
          title: "الناس بتستخدم المنتج إزاي فعلًا",
          desc: R`اللوجات بتقول السيستم عمل إيه. أما الـ product analytics فبتقول المستخدمين عملوا إيه: كام واحد فتح صفحة كورس، وكام ضغط «اشتري»، وكام دفع فعلًا، وكام اتفرج على أول درس. أدوات زي PostHog بتجمّع الأحداث دي وتعملك منها funnels و retention.

الأحداث المهمة، زي الدفع، بتتبعت من السيرفر. والضغطات والصفحات بتتبعت من المتصفح.`,
          example: R`import { PostHog } from "posthog-node";

export const posthog = new PostHog(config.POSTHOG_KEY, { host: "https://eu.i.posthog.com" });

posthog.capture({
  distinctId: order.userId,
  event: "course purchased",
  properties: { courseId: order.courseId, amount: order.amountCents / 100, currency: "EGP" },
});

process.on("SIGTERM", async () => { await posthog.shutdown(); process.exit(0); });`,
          try: R`عرّف ٤ أحداث للـ core loop: [[course viewed]]، و [[checkout started]]، و [[course purchased]]، و [[lesson completed]]. ابعتهم، واعمل funnel في PostHog، وشوف الناس بتقع في أنهي خطوة.`,
          flag: "script",
          deep: {
            why: "من غير أرقام، كل قرار في المنتج بيبقى تخمين. ممكن تقضي شهر تبني ميزة، والمشكلة الحقيقية إن ٧٠٪ من الناس بيقفلوا صفحة الدفع. الـ funnel بيوريك فين الناس بتقع بالظبط.",
            how: R`ابدأ بأحداث قليلة وواضحة حوالين الـ core loop، وسمّيها بنفس الطريقة: «اسم وفعل»، small، وبصيغة الماضي. الـ funnel بيوريك النسبة بين كل خطوة والتانية. والـ activation بيجاوب على سؤال: كام واحد اتفرج على أول درس في أول ٢٤ ساعة؟ ودي أحسن علامة إنه هيكمل. والـ retention بيوريك كام واحد رجع بعد أسبوع وبعد شهر.

أحداث الفلوس من السيرفر: مانع الإعلانات بيوقف سكربتات الـ analytics في المتصفح، والسيرفر هو اللي عارف الحقيقة. أما الصفحات والضغطات فمن posthog-js في المتصفح. وبعد الـ login، [[posthog.identify(userId)]] بيربط اللي عمله قبل ما يسجّل بحسابه.

[[shutdown]] مهم، لأن المكتبة بتجمّع الأحداث وتبعتها على دفعات. لو الـ process قفلت من غير shutdown، آخر أحداث بتضيع.

والخصوصية: ابعت ids مش إيميلات أو أرقام تليفونات. ولو عندك زوار من أوروبا، محتاج موافقة على الـ cookies، وسيرفرات أوروبية (الـ host في المثال) أو تشغّلها بنفسك. والـ session replay لازم يخفي الـ inputs.

ونفس الأداة بتعمل feature flags و A/B tests، يعني تفتح ميزة لـ ١٠٪ من الناس وتقارن.`,
            when: "من الإطلاق. الأحداث اللي متسجّلتش من الأول مش هتقدر تجيبها بعدين.",
            mistakes: "إنك تعتمد على autocapture بس من غير أحداث بأسماء واضحة، فيبقى عندك داتا كتير ومفيش إجابة. أو نفس الحدث بأسماء مختلفة ([[purchase]] و [[Course Bought]]). أو تبعت إيميلات وتليفونات. أو أحداث الفلوس من المتصفح بس."
          },
          teach: R`## حدث واحد من السيرفر، والمكتبة بتبعته على دفعات

المثال بيعمل client لـ PostHog، ويسجّل حدث «اشترى كورس» من السيرفر، ويتأكد إن الأحداث اللي لسه في الذاكرة تتبعت قبل ما الـ process يقفل. جربناه بـ posthog-node 5.55 (Node 24 على ويندوز، و Node 22 في Docker لتجربة الـ SIGTERM). ومفيش حساب PostHog هنا، فالـ [[host]] كان سيرفر صغير على [[127.0.0.1:6041]] بيطبع اللي بيوصله. الـ funnels واللوحة نفسها من وثائق PostHog.

---

## ١. [[import { PostHog } from "posthog-node";]]

[[{ PostHog }]] named export: الكلاس اسمه كده بالظبط. و posthog-node للسيرفر، و posthog-js للمتصفح (الـ solCode فيه الاتنين).

## ٢. [[export const posthog = new PostHog(config.POSTHOG_KEY, { host: "https://eu.i.posthog.com" });]]

- [[config.POSTHOG_KEY]]: مفتاح المشروع (بيبدأ بـ [[phc_]]). ده مفتاح عام، نفسه اللي بيتحط في المتصفح، بيكتب أحداث بس.
- [[host]]: سيرفرات PostHog في أوروبا ([[eu]]). لو مشروعك على أمريكا بيبقى [[us.i.posthog.com]]، ولو مشغّله بنفسك عنوانك.
- [[export const]]: client واحد للتطبيق كله.

---

## ٣. [[posthog.capture({ distinctId, event, properties })]]

- [[distinctId: order.userId]]: مين عمل الحدث. id المستخدم، مش إيميله. لازم يبقى نفس الـ id اللي الواجهة بتستخدمه بعد [[identify]]، وإلا الـ funnel يشوفه شخصين.
- [[event: "course purchased"]]: «اسم وفعل»، small، ماضي. ونفس الاسم في كل مكان.
- [[properties: { courseId, amount: order.amountCents / 100, currency: "EGP" }]]: تفاصيل هتفلتر بيها. [[amountCents / 100]] لأن الفلوس متخزنة قروش، و PostHog هيجمعها بالجنيه.

> [[capture]] مش بيبعت على طول: بيحط الحدث في طابور في الذاكرة، والمكتبة بتبعت دفعة كل شوية أو لما الطابور يكبر.

اللي وصل للسيرفر الوهمي (حدثين، واحد من المثال وواحد [[lesson completed]] من الـ solCode):

~~~text الناتج
POST /batch/ | events: 2
   {"event":"course purchased","distinct_id":"u_17","properties":{"courseId":"c_3","amount":499,"currency":"EGP"},"lib":"posthog-node"}
   {"event":"lesson completed","distinct_id":"u_17","properties":{"courseId":"c_3","lessonId":"l_1"},"lib":"posthog-node"}
~~~

الاتنين في طلب واحد على [[/batch/]]: ده التجميع. و [[49900 / 100 = 499]].

---

## ٤. [[process.on("SIGTERM", async () => { await posthog.shutdown(); process.exit(0); });]]

- [[SIGTERM]]: الإشارة اللي Docker و Kubernetes بيبعتوها عشان يقفلوا الـ process ([[docker stop]]).
- [[posthog.shutdown()]]: ابعت اللي في الطابور واقفل.
- [[process.exit(0)]]: اخرج. **مهم**: أول ما تسجّل listener لـ SIGTERM، Node مبيخرجش لوحده. النسخة الأولى من المثال مكانش فيها السطر ده، وجربناها في container:

~~~text الناتج
$ time docker stop teach-arch0506-ph
real	0m10.923s
~~~

الأحداث اتبعتت، بس الـ process فضل شغال، و Docker استنى ١٠ ثواني وبعدين قتله بـ SIGKILL. في السيرفر الحقيقي الترتيب: اقفل الـ HTTP server، وبعدين [[shutdown]]، وبعدين اخرج (الإغلاق النضيف في تاب «Node و npm»).

ومن غير [[shutdown]] خالص (الـ process خرج على طول بعد الـ capture): السيرفر الوهمي موصلوش ولا حدث. يعني آخر أحداث قبل كل deploy بتضيع.

> على ويندوز، [[kill -TERM]] من Git Bash بيقفل Node على طول من غير ما الـ handler يشتغل، عشان كده جربنا الـ SIGTERM في Docker (لينكس).

---

## ٥. الـ solCode

- [[posthog.capture("course viewed", { courseId })]] في المتصفح: posthog-js، والـ distinctId بيتحط لوحده (anonymous لحد الـ [[identify]]).
- [[course purchased]] من السيرفر، من [[markPaid]] بعد [[count === 1]] بس: الـ webhook ممكن يوصل مرتين، والحدث لازم يتسجل مرة.
- [[lesson completed]] من السيرفر بـ [[req.user.id]].

---

## الخلاصة

| السطر | ليه |
|---|---|
| [[distinctId]] = userId | نفس الشخص في الواجهة والسيرفر |
| اسم الحدث ثابت | الـ funnel بيدوّر بالاسم |
| أحداث الفلوس من السيرفر | مانع الإعلانات مبيوقفهاش، والسيرفر عارف الحقيقة |
| [[shutdown()]] ثم [[exit]] | آخر دفعة متضيعش، والـ process يخرج في ثانية مش ١٠ |`,
          lines: [
            "SDK بتاع السيرفر.",
            "العميل بمفتاح المشروع، على سيرفرات أوروبا.",
            "سجّل حدث:",
            "مين (id المستخدم، مش إيميله).",
            "اسم الحدث: اسم وفعل، بصيغة ثابتة.",
            "تفاصيل هتفلتر بيها بعدين.",
            "قفلة.",
            "لما السيرفر يقفل، ابعت الأحداث اللي لسه متبعتتش، وبعدين اخرج (الـ listener بيلغي الخروج الافتراضي)."
          ],
          sol: R`بعد ما تبعت الأحداث، هتلاقيها في Activity (أو Events) بعد ثواني. الـ funnel بالترتيب [[course viewed]] ← [[checkout started]] ← [[course purchased]] ← [[lesson completed]]، وكل خطوة جنبها نسبة اللي كملوا. المهم إن [[distinctId]] يبقى نفسه في الأربعة للمستخدم الواحد، وإلا الـ funnel هيطلع صفر من خطوة لخطوة.

القراية المتوقعة لمنتج جديد: أكبر وقعة غالبًا بين viewed و checkout started (السعر أو صفحة الكورس مش مقنعة)، والتانية بين checkout started و purchased (مشكلة في الدفع أو البوابة). لو الوقعة التانية كبيرة، روح لـ Sentry ولوجات الـ webhook قبل ما تغيّر التصميم.

أشهر غلطة: أحداث الواجهة بـ anonymous id، وأحداث السيرفر بـ userId، فالمستخدم بيبان شخصين. نادي [[posthog.identify(user.id)]] في الواجهة بعد الدخول. وغلطة تانية: [[course purchased]] من صفحة الـ redirect بدل الـ webhook، فالأرقام بتتضرب في المرات اللي الناس بتعمل فيها refresh.`,
          solCode: R`// الواجهة (posthog-js)
posthog.capture("course viewed", { courseId });
posthog.capture("checkout started", { courseId, amount: priceCents / 100 });

// السيرفر: من markPaid بعد ما count === 1 بس
posthog.capture({ distinctId: order.userId, event: "course purchased", properties: { courseId: order.courseId, amount: order.amountCents / 100, currency: "EGP" } });

// السيرفر: لما الطالب يخلّص درس
posthog.capture({ distinctId: req.user.id, event: "lesson completed", properties: { courseId, lessonId } });`
        },
        {
          cmd: "feature flags",
          title: "feature flags عمليًا: ميزة مقفولة في الإنتاج، وتفتحها لنسبة من الناس",
          desc: R`الـ feature flag شرط في الكود بيقرر الميزة تظهر ولا لأ، من غير deploy جديد. بيفصل «الكود نزل» عن «الناس شافت الميزة»: الكود بيتدمج في main ويتنشر مقفول، وبعدين تفتحه للفريق، وبعدين لـ ١٠٪ من المستخدمين، وبعدين للكل. ولو حصلت مشكلة تقفله في ثانية.

فيه ٣ مستويات. الأبسط متغير بيئة (مقفول أو مفتوح لكل الناس، ومحتاج restart). وبعده جدول flags في القاعدة (أو Redis) فيه نسبة وقايمة tenants. وبعده أداة زي PostHog (نفس اللي في درس «PostHog») أو Unleash أو GrowthBook، بتديك لوحة ونسب و A/B tests.`,
          example: R`import crypto from "node:crypto";
export async function isEnabled(key, { userId, tenantId } = {}) {
  const flag = await flagCache.get(key);
  if (!flag || !flag.enabled) return false;
  if (tenantId && flag.tenantIds.includes(tenantId)) return true;
  if (!userId) return flag.percent >= 100;
  const h = crypto.createHash("sha256").update($__bt$__{key}:$__{userId}$__bt).digest();
  return h.readUInt32BE(0) % 100 < flag.percent;
}

router.get("/checkout/config", requireAuth, async (req, res) => {
  const newCheckout = await isEnabled("new-checkout", { userId: req.user.id, tenantId: req.tenant?.id });
  res.json({ data: { newCheckout } });
});

export const isEnabledPH = (key, userId) => posthog.isFeatureEnabled(key, userId);`,
          try: R`اعمل جدول [[FeatureFlag]] (key unique، و enabled، و percent، و tenantIds، و updatedAt، و owner، و removeBy). وابعت ١٠٠٠٠ userId مختلف لـ [[isEnabled]] بـ percent 10، وعد كام واحد اتفتح له. بعدين ارفع النسبة لـ 30: هل كل اللي كانوا جوه الـ 10 لسه جوه؟ وجرّب نفس الـ userId على flagين مختلفين بنفس النسبة.`,
          flag: "script",
          deep: {
            why: "من غير flags، الميزة الكبيرة بتفضل في branch أسابيع، وبتبعد عن main كل يوم، والـ merge في الآخر بيبقى وجع. والنشر بيبقى لحظة مخيفة: الكل بيشوف الميزة مرة واحدة، ولو فيها مشكلة الحل rollback للنسخة كلها. الـ flag بيخليك تنشر كل يوم وتفتح بالتدريج وتقفل من غير deploy.",
            how: R`النسبة لازم تبقى ثابتة لنفس الشخص: لو اتحسبت بـ [[Math.random()]]، المستخدم هيشوف الميزة في طلب وميشوفهاش في اللي بعده. عشان كده بنعمل hash لـ [[key:userId]] وناخد باقي القسمة على ١٠٠. نفس الشخص بياخد نفس الرقم دايمًا، وبما إن الـ key جزء من الـ hash، الـ ١٠٪ بتوع flag مش هما نفس الـ ١٠٪ بتوع flag تاني. ولما النسبة تزيد من ١٠ لـ ٣٠، اللي كانوا جوه بيفضلوا جوه (رقمهم أقل من ١٠ فأكيد أقل من ٣٠).

[[tenantIds]]: في SaaS بتفتح الميزة لعملاء معينين الأول (beta customers)، أو لـ workspace الفريق بتاعك. وده أهم من النسبة في B2B، لأن نص الشركة شايف الميزة ونصها لأ بيعمل لخبطة.

الكاش: الـ flags بتتسأل مع كل طلب، فبتتقري من ذاكرة بتتحدث كل ٣٠ ثانية (أو Redis pub/sub لما تتغير). وأدوات زي PostHog بتعمل local evaluation: بتنزّل تعريفات الـ flags وتحسب في السيرفر بتاعك من غير طلب شبكة لكل سؤال (محتاج personal API key أو feature flags secure key حسب نسخة الـ SDK، فارجع للتوثيق).

الواجهة بتسأل السيرفر (زي [[/checkout/config]])، أو تاخد الـ flags مع بيانات المستخدم أول ما الصفحة تفتح. ومتحطش القرار في الواجهة لوحدها لو الميزة فيها صلاحيات أو فلوس: السيرفر برضه لازم يتأكد.

تنضيف الـ flags: كل flag هو [[if]] زيادة وطريقين لازم يتختبروا. بعد ما الميزة توصل ١٠٠٪ وتستقر أسبوعين، امسح الـ flag والكود القديم. عشان كده الجدول فيه [[owner]] و [[removeBy]]، ومراجعة شهرية للـ flags اللي فات معادها.

أنواعها: release flag (مؤقت، لميزة جديدة)، و kill switch (دايم، يقفل حاجة تقيلة وقت الأزمات زي البحث أو التوصيات)، و experiment (A/B بقياس في PostHog)، و permission flag (ميزة لخطة معينة، ودي أحسن تبقى في جدول الخطط مش flags).`,
            when: "ميزة كبيرة هتاخد أكتر من كام يوم، أو ميزة خطيرة (الدفع، أو الـ auth)، أو تجربة محتاج تقيس أثرها. ومش لكل تغيير صغير.",
            mistakes: R`[[Math.random()]] بدل hash ثابت. أو flags ملهاش صاحب ولا ميعاد تتشال، فبعد سنة عندك ٢٠٠ flag محدش عارف أنهي فيهم شغال. أو flag بيتسأل من القاعدة مع كل طلب من غير كاش. أو القرار في الواجهة بس. أو flags متداخلة (flag جوه flag) فبقى فيه ٨ تركيبات محدش اختبرها. وفي الانترفيو: «الفرق بين feature flag و canary deploy؟» الـ canary بيوجّه نسبة من الترافيك لنسخة جديدة من الكود كله، والـ flag بيفتح ميزة واحدة جوه نفس النسخة لمستخدمين بعينهم.`
          },
          teach: R`## دالة واحدة بتقول: الميزة دي مفتوحة للشخص ده؟

[[isEnabled]] بتاخد اسم الـ flag ومين بيسأل، وبتمشي على ٤ أسئلة بالترتيب: موجود ومفتوح؟ الـ workspace في قايمة الـ beta؟ فيه مستخدم أصلًا؟ ورقمه الثابت أقل من النسبة؟ جربنا الدالة بـ Node 24 (ويندوز 11)، والـ [[flagCache]] في التجربة [[Map]] في الذاكرة بدل الجدول، على ١٠٠٠٠ مستخدم ([[u-0]] لـ [[u-9999]]).

---

## ١. [[import crypto from "node:crypto";]]

مكتبة الـ hash اللي جاية مع Node. النسخة الأولى من المثال مكانش فيها السطر ده، ومن غيره في ملف ESM ([[.mjs]] أو [[type: module]]) اسم [[crypto]] بيشاور على Web Crypto، ودي مفيهاش [[createHash]]:

~~~text الناتج (من غير الـ import)
TypeError: crypto.createHash is not a function
~~~

---

## ٢. [[export async function isEnabled(key, { userId, tenantId } = {})]]

- [[{ userId, tenantId } = {}]]: الـ argument التاني object بنفكه لاسمين (destructuring)، و [[= {}]] قيمة افتراضية: لو حد نادى [[isEnabled("x")]] من غيره، ميقعش.
- [[async]] لأن الـ cache ممكن يبقى Redis.

### [[const flag = await flagCache.get(key);]]

تعريف الـ flag: [[{ enabled, percent, tenantIds }]]. من كاش في الذاكرة بيتحدث كل ٣٠ ثانية، مش من القاعدة مع كل طلب.

### [[if (!flag || !flag.enabled) return false;]]

[[||]] = «أو». مش موجود (اسم غلط، أو اتمسح) أو مقفول؟ لأ. ده الـ **kill switch**: [[enabled = false]] بيقفل الميزة للكل، حتى الـ beta.

### [[if (tenantId && flag.tenantIds.includes(tenantId)) return true;]]

[[includes]] بيدوّر في الـ array. workspace في قايمة الـ beta؟ مفتوح لكل اللي فيه، من غير ما نبص على النسبة.

### [[if (!userId) return flag.percent >= 100;]]

طلب من غير مستخدم (زائر مش عامل login): مفيش حاجة نعمل لها hash، فمفتوح بس لو الميزة وصلت ١٠٠٪.

~~~text الناتج
anonymous: false | beta tenant, anon: true | missing flag: false
kill switch, beta tenant: false
~~~

---

## ٣. الرقم الثابت: [[crypto.createHash("sha256").update($__bt$__{key}:$__{userId}$__bt).digest()]]

- [[$__bt$__{key}:$__{userId}$__bt]]: template literal بيعمل نص زي [[new-checkout:u-42]].
- [[createHash("sha256")]]: hash نوعه SHA-256، و [[digest()]] بيرجّع ٣٢ byte.
- [[h.readUInt32BE(0)]]: أول ٤ bytes كرقم من 0 لحوالي ٤.٣ مليار (BE = Big Endian، أول byte هو الأكبر).
- [[% 100]]: باقي القسمة على ١٠٠، يعني رقم من 0 لـ 99.

~~~text الناتج
digest bytes: 32 | first 4: aab7742d | readUInt32BE(0): 2864149549 | % 100: 49
~~~

[[aab7742d]] بالـ hex = ٢٨٦٤١٤٩٥٤٩، وباقي قسمته على ١٠٠ = ٤٩. يعني [[u-42]] رقمه في [[new-checkout]] هو ٤٩ دايمًا: مفتوح له لو النسبة ٥٠ أو أكتر.

### [[return h.readUInt32BE(0) % 100 < flag.percent;]]

[[<]] مش [[<=]]: الأرقام من 0 لـ 99، فـ [[< 10]] = عشر أرقام (0 لـ 9) = ١٠٪.

~~~text الناتج
percent 10: 993 | percent 30: 2958 | left after raise: 0
new-search 10%: 979 | in both flags: 103
percent 0 with <= : 104 users | with < : 0
~~~

- ١٠٪ من ١٠٠٠٠ = حوالي ١٠٠٠ (طلع ٩٩٣، لأنه توزيع hash مش عد مظبوط).
- لما النسبة بقت ٣٠، صفر خرجوا: اللي رقمه أقل من ١٠ أكيد أقل من ٣٠.
- flag تاني بنفس النسبة فتح لـ ٩٧٩، والمشتركين بين الاتنين ١٠٣ بس، يعني حوالي ١٠٪ من الـ ١٠٪، لأن اسم الـ flag جزء من النص اللي اتعمله hash. لو شلته، نفس الـ ١٠٠٠ شخص هيبقوا حقل تجارب لكل ميزة.
- بـ [[<=]] النسبة صفر كانت هتفتح لـ ١٠٤ مستخدم (اللي رقمهم 0).

وليه مش [[Math.random()]]؟ نفس المستخدم في ٥ طلبات ورا بعض بنسبة ٥٠٪:

~~~text الناتج
Math.random same user 5 requests: false false true false false
~~~

الميزة بتظهر وتختفي مع كل refresh.

---

## ٤. الـ route: [[router.get("/checkout/config", requireAuth, async (req, res) => { ... })]]

- [[requireAuth]] الأول، فـ [[req.user.id]] موجود.
- [[req.tenant?.id]]: [[?.]] (optional chaining) = لو [[req.tenant]] مش موجود رجّع [[undefined]] بدل ما يقع.
- [[res.json({ data: { newCheckout } })]]: [[{ newCheckout }]] اختصار [[{ newCheckout: newCheckout }]]. الواجهة بتقرا [[data.newCheckout]] وتعرض الـ checkout الجديد أو القديم. والسيرفر نفسه برضه بيسأل [[isEnabled]] قبل ما ينفّذ أي حاجة في الطريق الجديد.

## ٥. [[export const isEnabledPH = (key, userId) => posthog.isFeatureEnabled(key, userId);]]

نفس السؤال لـ PostHog (الـ client من درس «PostHog»): النسب وقوايم الـ beta بتتظبط من اللوحة. ده من وثائق posthog-node، ومجربناهوش على سيرفر PostHog حقيقي.

---

## الخلاصة

| السؤال | السطر | لو أيوه |
|---|---|---|
| مش موجود أو مقفول؟ | [[!flag]] أو [[!flag.enabled]] | [[false]] (kill switch) |
| workspace beta؟ | [[tenantIds.includes]] | [[true]] |
| مفيش مستخدم؟ | [[!userId]] | [[percent >= 100]] |
| رقمه أقل من النسبة؟ | [[sha256(key:userId) % 100 < percent]] | [[true]] |

الرقم ثابت للشخص ومختلف بين الـ flags، وزيادة النسبة مبتطلّعش حد.`,
          lines: [
            "مكتبة الـ hash بتاعة Node (في ملف ESM من غيرها crypto بيبقى Web Crypto ومفيهوش createHash).",
            "الدالة الوحيدة اللي الكود بيسأل بيها.",
            "تعريف الـ flag من كاش في الذاكرة بيتحدث كل شوية.",
            "مش موجود أو مقفول؟ لأ.",
            "الـ workspace في قايمة المسموحين؟ أيوه.",
            "مفيش مستخدم (طلب مجهول)؟ مفتوح بس لو ١٠٠٪.",
            "hash لاسم الـ flag مع رقم المستخدم...",
            "...ورقم من 0 لـ 99 ثابت للشخص ده. أقل من النسبة؟ مفتوح.",
            "قفلة.",
            "الواجهة بتسأل السيرفر إيه الميزات المفتوحة.",
            "اسأل عن الـ flag للمستخدم والـ workspace.",
            "رجّع النتيجة، والواجهة تعرض الـ checkout الجديد أو القديم.",
            "قفلة.",
            "نفس الفكرة بـ PostHog (الـ client من درس «PostHog»): النسب والقوايم بتتظبط من اللوحة."
          ],
          sol: R`مع percent 10 على ١٠٠٠٠ مستخدم: حوالي ١٠٠٠ (في تجربة فعلية طلع ١٠٥٩، يعني ١٠.٦٪). الفرق الصغير طبيعي لأنه توزيع hash مش عد مظبوط.

لما ترفعها لـ 30: كل اللي كانوا جوه الـ 10 لسه جوه (صفر خرجوا)، لأن رقمهم أقل من 10 فأكيد أقل من 30. وده اللي بيخلي الـ rollout التدريجي مريح: محدش بيشوف الميزة وبعدين تختفي منه.

نفس الـ userId على flagين: ممكن يبقى جوه واحد وبرّه التاني، لأن الـ key جزء من الـ hash. لو شلت الـ key من الـ hash، نفس الـ ١٠٪ من الناس هيبقوا حقل تجارب لكل الميزات.

الغلطة الشائعة: [[h.readUInt32BE(0) % 100 <= percent]] (بـ =)، فـ percent 0 بيفتح لـ ١٪ من الناس.`
        },
        {
          cmd: "backups و DR",
          title: "لو القاعدة راحت النهارده، ترجع في قد إيه؟",
          desc: R`الباك أب اللي عمرك ما رجّعته مش باك أب، ده أمل. كل يوم نسخة من القاعدة بـ [[pg_dump]]، متشفّرة، على مكان برّه السيرفر. وكل شهر رجّع نسخة على قاعدة فاضية وتأكد إنها سليمة.

وفيه رقمين لازم تحددهم. RPO: ممكن تخسر داتا قد إيه (يوم؟ ساعة؟). و RTO: هترجع شغال في قد إيه.`,
          example: R`pg_dump "$DATABASE_URL" -Fc -f "backup-$(date +%F).dump"
rclone copy "backup-$(date +%F).dump" offsite:myapp-backups/db/
createdb myapp_restore_test
pg_restore -d myapp_restore_test --no-owner "backup-$(date +%F).dump"
psql -d myapp_restore_test -c 'SELECT count(*) FROM "Order";'`,
          try: R`اعمل الخطوات دي على قاعدة التجربة. احسب الوقت من أول أمر لآخر أمر، وده الـ RTO بتاعك الحقيقي. قارن عدد الطلبات في النسخة بالأصل. بعدين امسح النسخة المحلية ونزّلها من المكان البعيد ورجّعها تاني.`,
          deep: {
            why: "القاعدة بتضيع لأسباب كتير: ديسك باظ، أو migration غلط، أو [[DELETE]] من غير WHERE، أو اختراق، أو المزوّد قفل الحساب. في منصة كورسات، ده معناه طلبات مدفوعة واشتراكات ضاعت، وناس دفعت ومحدش عارف مين.",
            how: R`[[-Fc]] صيغة custom مضغوطة، و pg_restore بيقدر يرجّع منها جدول واحد، أو يشتغل بالتوازي بـ [[-j]]. ونسخة [[pg_dump]] لازم تكون نفس نسخة السيرفر أو أحدث.

الـ dump اليومي معناه RPO بـ ٢٤ ساعة، يعني ممكن تخسر يوم كامل. لو ده كتير، فيه PITR (point-in-time recovery). القاعدة بتحفظ الـ WAL باستمرار، فتقدر ترجع لأي دقيقة. القواعد المُدارة بتقدمه في خطط معينة، وده سبب قوي تدفع فيها.

قاعدة 3-2-1: ٣ نسخ، على نوعين مختلفين من التخزين، وواحدة منهم برّه المكان. والنسخة برّه تبقى متشفّرة (بـ openssl أو age، وتفاصيلها في تاب «الأمان»)، والباسورد يتقري من ملف أو متغير بيئة، مش من سطر الأوامر. والاحتفاظ مثلًا ٧ يومي، و ٤ أسبوعي، و ١٢ شهري.

وفيه حاجات غير القاعدة لازم يتعملها باك أب: الملفات المرفوعة (فعّل versioning على الـ bucket)، والأسرار (.env في password manager)، وإعدادات DNS.

واختبار الرجوع يتأتمت: job شهري بيرجّع آخر نسخة على قاعدة فاضية، ويعد صفوف الجداول المهمة، ويضرب heartbeat لو نجح. والـ DR runbook: خطوات مكتوبة إزاي تبني سيرفر من الصفر وترجّع القاعدة وتغيّر الـ DNS. جرّبها مرة، والوقت اللي هتاخده هو الـ RTO الحقيقي. سكربتات حقيقية للباك أب في تاب «من مشاريعي»، و psql في تاب «PostgreSQL».`,
            when: "قبل أول مستخدم حقيقي. واختبار الرجوع كل شهر، وبعد أي تغيير في طريقة الباك أب.",
            mistakes: R`إن الباك أب يبقى على نفس السيرفر أو نفس الديسك. أو متجرّبش الرجوع أبدًا. أو السكربت يفشل في صمت شهور، والحل heartbeat monitor. أو تنسى الملفات المرفوعة. وفي مشروع حقيقي، الباك أب كان ممتاز: pg_dump متشفّر ومرفوع برّه السيرفر. بس باسورد التشفير كان بيتبعت في سطر الأوامر، فأي حد على السيرفر يقدر يشوفه في [[ps]]. الحل [[-pass file:]] أو متغير بيئة.`
          },
          teach: R`## نسخة، وترفعها برّه، وترجّعها على قاعدة فاضية وتعد

الأوامر الخمسة دورة كاملة: [[pg_dump]] يعمل نسخة، و [[rclone]] يرفعها برّه السيرفر، و [[createdb]] و [[pg_restore]] يرجّعوها على قاعدة تجربة، و [[psql]] يعد الصفوف. جربنا أوامر PostgreSQL على PostgreSQL 18 (الأدوات من نفس الـ image، في container على نفس شبكة Docker، والقاعدة فيها ٦ جداول و ١٠٠٠ طلب). و [[rclone]] مش متسطب هنا ومحتاج حساب تخزين، فسطره من وثائق rclone.

---

## ١. [[pg_dump "$DATABASE_URL" -Fc -f "backup-$(date +%F).dump"]]

- [["$DATABASE_URL"]]: عنوان القاعدة ([[postgresql://user:pass@host:5432/db]]). الـ [[" "]] عشان لو فيه رموز ميتكسرش.
- [[-Fc]]: [[-F]] = format، و [[c]] = custom: ملف مضغوط، و [[pg_restore]] يقدر يرجّع منه جدول واحد ([[-t]]) أو بالتوازي ([[-j 4]]).
- [[-f]]: اسم الملف.
- [[$(date +%F)]]: [[date]] بالصيغة [[%F]] = [[2026-10-08]]. فكل يوم ملف باسمه.

~~~text الناتج
-rw-r--r-- 1 root root 15536 Oct  8 13:34 backup-2026-10-08.dump
pg_dump (PostgreSQL) 18.6
~~~

١٥ كيلو لـ ٦ جداول و ١٠٠٠ طلب. و [[pg_restore -l]] بيعرض اللي جوه الملف من غير ما يرجّعه (فيه ٦ سطور [[TABLE DATA]]، واحد لكل جدول). ونسخة [[pg_dump]] لازم تبقى زي السيرفر أو أحدث، وإلا بيرفض ([[server version mismatch]]).

---

## ٢. [[rclone copy "backup-$(date +%F).dump" offsite:myapp-backups/db/]] (من الـ docs)

- [[rclone]]: أداة بتنسخ لأي تخزين (S3، و R2، و Backblaze، و Google Drive).
- [[copy]]: انسخ (من غير ما تمسح حاجة في الناحية التانية).
- [[offsite:]]: اسم «remote» عملته قبل كده بـ [[rclone config]] فيه المفاتيح والـ endpoint، وبعده المسار جوه الـ bucket.

برّه السيرفر لأن الديسك اللي باظ أو الحساب اللي اتقفل بياخدوا معاهم أي نسخة على نفس المكان.

---

## ٣. [[createdb myapp_restore_test]]

قاعدة فاضية جديدة على نفس السيرفر. عمرك ما تجرّب الرجوع على القاعدة الأصلية.

## ٤. [[pg_restore -d myapp_restore_test --no-owner "backup-$(date +%F).dump"]]

- [[-d]]: رجّع جوه القاعدة دي.
- [[--no-owner]]: متحاولش تخلي صاحب الجداول نفس اليوزر الأصلي. لو بترجّع بيوزر تاني (مثلًا على سيرفر جديد) من غيره بيطلع errors على [[ALTER ... OWNER TO]].

ولو رجّعت على قاعدة فيها الجداول أصلًا:

~~~text الناتج
pg_restore: error: could not execute query: ERROR:  relation "Comment" already exists
~~~

عشان كده قاعدة فاضية.

## ٥. [[psql -d myapp_restore_test -c 'SELECT count(*) FROM "Order";']]

- [[-c]]: نفّذ الأمر ده واخرج.
- [["Order"]] بين double quotes لأن [[ORDER]] كلمة محجوزة في SQL، ولأن Prisma بيعمل الأسامي بحرف capital.
- والـ [[' ']] حوالين الأمر كله عشان الـ shell ميلمسش الـ [[" "]] اللي جواه.

~~~text الناتج
 count 
-------
  1000
(1 row)
~~~

ونفس الأمر على الأصل رجّع ١٠٠٠. لو الرقمين مختلفين، النسخة ناقصة.

---

## ٦. الـ solCode: [[time ( ... && ... )]]

- [[( ... )]]: الأوامر كلها في subshell واحد، و [[time]] بيقيس الكل.
- [[&&]]: كمّل بس لو اللي قبله نجح. لو التنزيل فشل، متحاولش ترجّع ملف مش موجود.
- [[rm backup.dump]] وبعدين [[rclone copy offsite:.../backup.dump .]]: امسح النسخة المحلية ونزّلها من برّه، عشان تختبر النسخة اللي برّه فعلًا.

~~~text الناتج (dump و createdb و restore و count، من غير rclone)
real	0m0.622s
~~~

أقل من ثانية لأن القاعدة صغيرة. ده مش الـ RTO بتاعك: قاعدة ١٠ جيجا ممكن تاخد نص ساعة في الـ restore لوحده. قيسه على نسخة بحجم الإنتاج.

---

## الخلاصة

| الخطوة | الأمر | ليه |
|---|---|---|
| نسخة | [[pg_dump -Fc]] | مضغوطة، ورجوع جزئي أو بالتوازي |
| برّه السيرفر | [[rclone copy]] | الديسك أو الحساب ممكن يروحوا |
| قاعدة تجربة | [[createdb]] | متلمسش الأصل |
| رجوع | [[pg_restore --no-owner]] | من غير مشاكل اليوزرز |
| تأكد | [[SELECT count(*)]] | قارن بالأصل |

- RPO = من آخر نسخة لحد الوقعة (يومي = ممكن تخسر يوم). RTO = الوقت اللي قسته في الـ solCode + وقت ما تعرف وتقرر.`,
          lines: [
            "نسخة من القاعدة بصيغة custom مضغوطة، واسمها فيه التاريخ.",
            "ارفعها لمكان برّه السيرفر (S3 أو R2 أو غيره) بـ rclone.",
            "اعمل قاعدة فاضية للتجربة.",
            "رجّع النسخة عليها، من غير ما يحاول يغيّر ownership.",
            "اتأكد إن الداتا رجعت فعلًا: عد الطلبات وقارنها بالأصل."
          ],
          sol: R`على قاعدة تجربة صغيرة الخطوات كلها بتاخد أقل من ثانية (جربناها: [[real 0m0.381s]] والملف ١٩ كيلو). ده مش الـ RTO الحقيقي بتاعك: القاعدة الحقيقية بـ ١٠ جيجا ممكن تاخد نص ساعة أو أكتر في الـ restore لوحده. عشان كده قيسه على نسخة بحجم الإنتاج، وضيف عليه وقت إنك تعرف إن فيه مشكلة وتقرر ترجع.

الـ count في النسخة لازم يساوي الأصل وقت الـ dump بالظبط. لو الأصل زاد بعدها، الفرق ده هو الداتا اللي هتضيع لو رجعت من النسخة دي، وده الـ RPO بتاعك (من آخر backup لحد الوقعة).

مشاكل شائعة: [[pg_dump: error: aborting because of server version mismatch]] يعني الـ pg_dump عندك أقدم من السيرفر، استخدم نفس النسخة أو أحدث. و [[pg_restore]] بيطلّع warnings عن الـ owner لو نسيت [[--no-owner]]. ولو الـ rclone مش متظبط، [[rclone config]] الأول. والنسخة اللي منزلتهاش ورجّعتها بإيدك، اعتبرها مش موجودة.`,
          solCode: R`time (
  pg_dump "$DATABASE_URL" -Fc -f backup.dump &&
  rclone copy backup.dump offsite:myapp-backups/db/ &&
  rm backup.dump &&
  rclone copy offsite:myapp-backups/db/backup.dump . &&
  createdb myapp_restore_test &&
  pg_restore -d myapp_restore_test --no-owner backup.dump &&
  psql -d myapp_restore_test -c 'SELECT count(*) FROM "Order";'
)
psql "$DATABASE_URL" -c 'SELECT count(*) FROM "Order";'
dropdb myapp_restore_test`
        }
      ]
    }
]);
