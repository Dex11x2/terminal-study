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

خلي بالك: مع إعدادات ioredis الافتراضية، [[redis.ping()]] وRedis واقع ممكن يفضل مستني لحد ما يعيد المحاولة كذا مرة، فالـ [[/readyz]] ياخد ثواني قبل ما يرد. الأفضل عميل للـ health بـ [[enableOfflineQueue: false]] و [[maxRetriesPerRequest: 1]]، أو [[Promise.race]] مع timeout ثانية.

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

process.on("SIGTERM", async () => { await posthog.shutdown(); });`,
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
          lines: [
            "SDK بتاع السيرفر.",
            "العميل بمفتاح المشروع، على سيرفرات أوروبا.",
            "سجّل حدث:",
            "مين (id المستخدم، مش إيميله).",
            "اسم الحدث: اسم وفعل، بصيغة ثابتة.",
            "تفاصيل هتفلتر بيها بعدين.",
            "قفلة.",
            "لما السيرفر يقفل، ابعت الأحداث اللي لسه متبعتتش."
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
          example: R`export async function isEnabled(key, { userId, tenantId } = {}) {
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
          lines: [
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
    },
    {
      t: "scaling والتكلفة والتسليم",
      l: 3,
      n: "المستخدمين زادوا: تكبّر بأنهي ترتيب، والفاتورة الشهرية جاية منين، وإزاي تسلّم مشروع حد تاني يقدر يشغّله",
      items: [
        {
          cmd: "scaling path",
          title: "المستخدمين زادوا ١٠ أضعاف: تعمل إيه بالترتيب",
          desc: R`قيس الأول وشوف فين عنق الزجاجة. بعدين صلّح الكود (indexes، و N+1، وكاش). بعدين كبّر السيرفر (vertical). وبعدين شغّل كذا نسخة ورا load balancer (horizontal).

الـ horizontal شرطه إن التطبيق يكون stateless: مفيش أي حاجة مهمة جوه الـ process. الـ sessions في القاعدة أو Redis، والملفات في S3، والـ cron في الـ queue، والـ sockets بـ Redis adapter، والـ rate limit والكاش في Redis.`,
          example: R`services:
  api:
    image: ghcr.io/you/myapp-api:1.4.0
    deploy:
      replicas: 3
    environment:
      REDIS_URL: redis://redis:6379
  worker:
    image: ghcr.io/you/myapp-api:1.4.0
    command: ["node", "dist/worker.js"]
  redis:
    image: redis:8-alpine`,
          try: R`شغّل ٣ نسخ من الـ api ورا Nginx (upstream على [[api:3000]]). سجّل دخول، وارفع صورة، وافتح socket، وشغّل الـ jobs. أي حاجة بتبوظ لما الطلب يروح لنسخة تانية، تبقى state لسه جوه الـ process. طلّعها.`,
          flag: "script",
          deep: {
            why: "أول رد فعل لما الموقع يبطأ «نكبّر السيرفر» أو «Kubernetes». بس لو المشكلة index ناقص، ١٠ سيرفرات هيضربوا القاعدة ١٠ أضعاف، وهتبقى أوحش. والترتيب الصح بيوفر فلوس ووقت.",
            how: R`١. قيس: الـ traces في Sentry، واستعلامات pg_stat_statements، و CPU والرام للسيرفر والقاعدة، و load test بـ k6 بشكل الترافيك المتوقع.

٢. صلّح الكود. ده غالبًا أكبر مكسب: index واحد، أو include بدل loop، أو كاش لصفحة الكورس.

٣. vertical: سيرفر أكبر. من غير أي تغيير في الكود، وبسعر معقول، بس ليه سقف، ولو وقع كل حاجة بتقع.

٤. افصل القاعدة على سيرفر لوحدها أو managed، عشان التطبيق والقاعدة ميتخانقوش على نفس الرام.

٥. horizontal: نسخ كتير ورا Nginx أو load balancer. وهنا شرط الـ stateless. [[replicas: 3]] في compose بيشغّل ٣ نسخ من غير ports ثابتة، و Nginx بيوصلهم بالاسم. وفي الـ deploy، النسخ بتتبدل واحدة واحدة، فالإغلاق النضيف لازم (تاب «Node و npm»).

٦. الشغل التقيل في workers منفصلة، بتكبّرها لوحدها. والـ worker هنا نفس الـ image بس بيشغّل ملف تاني.

٧. CDN للملفات والصفحات العامة.

٨. القاعدة نفسها: pooling، و read replicas، وده الدرس الجاي.

والـ socket.io على كذا نسخة محتاج Redis adapter عشان النسخ تكلّم بعض، و sticky sessions في الـ load balancer (نفس المستخدم يروح لنفس النسخة) وإلا هيطلع 400. والـ autoscaling والـ managed containers في تاب «Cloud و DevOps».`,
            when: "لما القياس يقول. مش قبل أول مستخدم. بس خلي التطبيق stateless من أول يوم، لأنه مش بيكلّف حاجة في الأول وبيوفر وجع كبير بعدين.",
            mistakes: R`في مشاريع حقيقية، ٣ حاجات كانت هتبوظ أول ما تبقى نسختين. rate limiter في الذاكرة، فكل نسخة بتعد لوحدها والحد بيتضاعف. و pub/sub للشات في الذاكرة (ومكتوب في الكود «سيرفر واحد بس»). و node-cron جوه السيرفر، فكل job هتشتغل مرتين. وكمان الملفات المرفوعة في فولدر uploads على السيرفر نفسه، فمع نسختين نص الصور يرجع 404. ومن الغلطات كمان: Kubernetes لمشروع فيه ١٠٠ مستخدم. أو تكبّر سيرفرات التطبيق والمشكلة في القاعدة.`
          },
          lines: [
            "الخدمات:",
            "الـ API.",
            "image متعملها tag بنسخة، مش latest.",
            "إعدادات التشغيل:",
            "٣ نسخ. Nginx بيوزّع عليهم بالاسم api.",
            "المتغيرات:",
            "كل الـ state المشتركة في Redis، مش في الذاكرة.",
            "الـ worker.",
            "نفس الـ image...",
            "...بس بيشغّل ملف الـ worker، وبيكبر لوحده.",
            "Redis: للـ queues، والكاش، والـ rate limit، والـ socket adapter.",
            "image صغيرة."
          ],
          sol: R`الحاجات اللي هتبوظ لما الطلب يروح لنسخة تانية، بالترتيب اللي غالبًا هتقابله:

١. الـ rate limit: [[express-rate-limit]] بيخزن في الذاكرة افتراضيًا، فمع ٣ نسخ الحد الحقيقي بقى ٦٠ مش ٢٠. الحل store في Redis. ٢. الـ socket.io: الإشعار بيوصل بس لو المستخدم متصل بنفس النسخة اللي عملت [[notify]]، والـ polling ممكن يرجع [[Session ID unknown]] من غير sticky sessions. الحل Redis adapter، و [[ip_hash]] في Nginx أو websocket بس. ٣. الملفات: لو فيه أي حاجة بتتحفظ على الديسك المحلي، النسخة التانية مش شايفاها. الحل S3 أو R2. ٤. الـ cron جوه الـ API بيشتغل ٣ مرات. الحل job scheduler في الـ worker.

الـ login نفسه غالبًا مش هيبوظ: الـ JWT متوقّع بنفس السر في التلاتة، والـ refresh session في القاعدة. لو بيبوظ، يبقى السر مختلف بين النسخ، أو فيه كاش في متغير في الذاكرة. وأي state فضلت جوه الـ process بعد التجربة دي، هي اللي هتوقعك يوم الترافيك الحقيقي.`,
          solCode: R`# nginx.conf
upstream api {
  server api:3000;   # Docker DNS بيوزّع على الـ 3 replicas
}
server {
  listen 80;
  location /socket.io/ {
    proxy_pass http://api;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
  location / {
    proxy_pass http://api;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}

# docker compose up -d --scale api=3
# docker compose logs -f api   # شوف الطلبات بتتوزع على api-1 و api-2 و api-3`
        },
        {
          cmd: "scaling القاعدة",
          title: "القاعدة بقت هي عنق الزجاجة",
          desc: R`لما التطبيق بقى نسخ كتير، القاعدة بتبقى المكان اللي كله بيضرب فيه. الترتيب: استعلامات و indexes الأول، وبعدين connection pooling، وبعدين قاعدة أكبر، وبعدين read replicas للقراية، وبعدين تقسيم الجداول الكبيرة. وفي Prisma فيه extension بيوزّع القراية على الـ replicas والكتابة على الـ primary لوحده.`,
          example: R`import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { readReplicas } from "@prisma/extension-read-replicas";

const primary = new PrismaClient({ adapter: new PrismaPg({ connectionString: config.DATABASE_URL }) });
const replica = new PrismaClient({ adapter: new PrismaPg({ connectionString: config.DATABASE_REPLICA_URL }) });
export const db = primary.$extends(readReplicas({ replicas: [replica] }));

const courses = await db.course.findMany({ where: { published: true } });
const fresh = await db.$primary().order.findUnique({ where: { id: orderId } });`,
          try: R`اعمل replica بـ Docker (فيه images جاهزة بـ streaming replication)، أو استخدم قاعدة مُدارة فيها replica. وقّف الـ replication شوية، واعمل طلب ودفعة، واقرا حالة الطلب مرة من الـ replica ومرة بـ [[$primary()]]. هتشوف الـ lag بعينك.`,
          flag: "script",
          deep: {
            why: "التطبيق بيتكبّر بسهولة: نسخة زيادة. أما القاعدة فصعبة، لأن فيه مصدر واحد للحقيقة. وكل اتصال جديد بيها ليه تمن في الرام، فكتر النسخ ممكن يوقّعها حتى لو الاستعلامات سريعة.",
            how: R`الـ connections: كل اتصال بـ PostgreSQL بيبقى process على السيرفر وبياكل رام. والافتراضي حوالي ١٠٠ اتصال. لو عندك ١٠ نسخ، وكل واحدة فيها pool بـ ١٠، يبقى خلصوا. والـ serverless أسوأ، لأن كل function ممكن تفتح اتصال. الحل pooler زي PgBouncer بوضع transaction، أو الـ pooler بتاع المزوّد (Supabase عندها واحد)، وحد للـ pool في كل نسخة.

الـ read replicas: نسخة من القاعدة بتستقبل التغييرات من الـ primary باستمرار، وبتخدم القراية بس. بس النسخ بيبقى متأخر شوية، ملّي ثواني أو ثواني (replication lag). فلو الطالب دفع وفتح «كورساتي» في نفس اللحظة، والقراية راحت للـ replica، ممكن ميلاقيش الكورس. عشان كده القراية اللي بعد كتابة على طول ([[read-your-writes]]) بتروح للـ primary بـ [[$primary()]].

في Prisma 7 كل client محتاج driver adapter ([[@prisma/adapter-pg]])، والـ client نفسه بيتولّد في المسار اللي بتحدده في الـ schema. والـ extension بيبعت أي قراية للـ replica، وأي كتابة أو transaction للـ primary لوحده.

وبعد كده: تقسيم الجداول الكبيرة بالتاريخ (partitioning)، زي اللوجات والأحداث بالشهر. وأرشفة الداتا القديمة. والـ sharding (كل مجموعة عملاء على قاعدة) آخر حل خالص، لأنه بيعقّد كل حاجة.`,
            when: "لما القاعدة تبقى هي اللي CPU بتاعها عالي، أو الاتصالات قربت تخلص. والـ pooling بدري لو شغال serverless.",
            mistakes: R`إنك تبعت كل القراية للـ replica، بما فيها اللي بعد كتابة على طول، فالمستخدم يشوف داتا قديمة ويفتكر إن الدفع فشل. أو serverless من غير pooler، فالاتصالات تخلص. أو تكبّر القاعدة كل شهر بدل ما تصلّح index ناقص.`
          },
          lines: [
            "الـ client المتولّد من الـ schema (Prisma 7).",
            "الـ driver adapter بتاع PostgreSQL.",
            "extension توزيع القراية.",
            "client للـ primary، اللي بيستقبل الكتابة.",
            "client للـ replica.",
            "client واحد بيوزّع لوحده: القراية للـ replica، والكتابة للـ primary.",
            "قراية عادية، بتروح للـ replica.",
            "قراية بعد دفع على طول، لازم من الـ primary عشان الـ lag."
          ],
          sol: R`الطريقة الأسهل عشان توقف الـ replication من غير ما تكسر حاجة: على الـ replica نفسها [[SELECT pg_wal_replay_pause();]]. الـ replica بتفضل تستقبل التغييرات بس مبتطبقهاش. تتأكد بـ [[SELECT pg_is_wal_replay_paused();]] (ترجع t)، وترجّعها بـ [[pg_wal_replay_resume()]].

وهي واقفة، اعمل طلب وادفعه. [[db.order.findUnique]] (بيروح للـ replica) هيرجّع [[null]] للطلب الجديد، أو [[PENDING]] لطلب قديم اتدفع. و [[db.$primary().order.findUnique]] هيرجّع [[PAID]]. وعلى الـ replica [[SELECT now() - pg_last_xact_replay_timestamp();]] بتقولك الـ lag بالثواني، وهيفضل يزيد طول ما هي واقفة. أول ما تعمل resume، الاتنين يتطابقوا في أقل من ثانية.

ده بالظبط سبب إن صفحة «بعد الدفع» و [[GET /orders/:id]] وأي قراية بعد كتابة لنفس المستخدم لازم تبقى [[$primary()]]. ولو الطلب اتعمل ورجع [[null]] من الـ replica في الوضع العادي من غير pause، يبقى الـ lag عندك كبير أصلًا، وده محتاج مراقبة.`,
          solCode: R`-- على الـ replica
SELECT pg_wal_replay_pause();
SELECT pg_is_wal_replay_paused();                    -- t
SELECT now() - pg_last_xact_replay_timestamp() AS lag;

-- بعد التجربة
SELECT pg_wal_replay_resume();`
        },
        {
          cmd: "التكلفة",
          title: "المشروع بيكلّف كام في الشهر، وليه",
          desc: R`كل قرار في المعمارية ليه سعر شهري. فيه تكاليف ثابتة (السيرفر، والقاعدة)، وتكاليف بتزيد مع الاستخدام (الباندويث، والتخزين، وعمولة الدفع، والإيميلات، ونداءات الـ AI). اعمل جدول قبل الإطلاق، وحط تنبيه ميزانية على كل حساب سحابي.

الأرقام في المثال تقريبية للتوضيح بس. الأسعار بتتغير، وراجع صفحة كل مزوّد.`,
          example: R`السيرفر (VPS للـ api والـ worker)        ثابت: من 10 لـ 50 دولار حسب المزوّد والحجم
PostgreSQL مُدارة بباك أب تلقائي           ثابت: من حوالي 15 دولار، وبيزيد مع الحجم
Redis                                    صغير، أو على نفس السيرفر في الأول
الفيديو والصور (تخزين + CDN)             متغير: بالـ GB المتخزن والـ GB اللي بيتفرج
الإيميل                                  مجاني لحد معين، وبعدين بعدد الإيميلات
Sentry و PostHog والـ uptime              الخطط المجانية كفاية في الأول
بوابة الدفع                              متغير: نسبة من كل عملية + مبلغ ثابت`,
          try: R`اعمل الجدول ده لمشروعك بأسعار حقيقية من صفحات المزوّدين. احسب التكلفة لـ ١٠٠ طالب، و ١٠٠٠، و ١٠٠٠٠، واقسمها على عدد الطلاب. بعدين قارنها بسعر الكورس بعد ما تشيل عمولة البوابة.`,
          flag: "script",
          deep: {
            why: "مشاريع كتير بتنجح في الاستخدام وتخسر فلوس، لأن التكلفة بتكبر أسرع من الإيراد. وأكبر فواتير الصدمة بتيجي من حاجة محدش حسبها: باندويث فيديو، أو لوجات، أو staging منسي شغال.",
            how: R`في منصة كورسات، أكبر تكلفة متغيرة هي الفيديو. ساعة فيديو 720p ممكن توصل لحوالي جيجا. يعني ١٠٠٠ طالب بيتفرجوا ١٠ ساعات في الشهر معناها حوالي ١٠ تيرا باندويث. لو المزوّد بيحاسب على خروج الداتا (egress) بالجيجا، الرقم ده لوحده ممكن يبقى أكبر من كل الباقي. عشان كده خدمات الفيديو المتخصصة، أو التخزين اللي مبيحاسبش على الـ egress، بتفرق جدًا. وده قرار معمارية، مش قرار محاسبة.

فكّر في unit economics: التكلفة لكل طالب نشط في الشهر، قصاد الإيراد منه بعد عمولة البوابة. لو الرقم الأول بيقرب من التاني، الـ scaling هيخسّرك.

حاجات بتتنسي: الـ staging شغال ٢٤ ساعة بنفس حجم الإنتاج. واللوجات والـ traces بتتحاسب بالحجم. ونداءات الـ AI بالتوكن، ومع كل مستخدم (تاب «الذكاء الاصطناعي»). والخطط المجانية ليها حدود، وبعضها بيوقف المشروع لو مفيش نشاط فترة.

تنبيه الميزانية على كل حساب سحابي (مثلًا عند ٥٠٪ و ١٠٠٪) بياخد دقيقتين، وبيمنع فاتورة بالآلاف من bug في loop.`,
            when: "قبل ما تختار المزوّدين، وقبل الإطلاق، وكل شهر بص على الفاتورة وقارنها بعدد المستخدمين.",
            mistakes: "إنك تعرض الفيديو mp4 مباشرة من VPS أو من bucket من غير CDN. أو مفيش تنبيه ميزانية. أو تشترك في خدمات مُدارة غالية قبل ما تحتاجها. أو تنسى عمولة البوابة وانت بتسعّر. أو تسيب بيئات تجربة شغالة شهور."
          },
          lines: [
            "الحوسبة: ثابتة، وبتكبر لما تحتاج نسخ أكتر.",
            "القاعدة: الباك أب التلقائي و PITR هما اللي بتدفع فيهم.",
            "Redis: غالبًا رخيص في الأول.",
            "أخطر بند متغير في منصة فيديو: الباندويث.",
            "بيزيد مع عدد المستخدمين والإشعارات.",
            "أدوات المراقبة ليها خطط مجانية معقولة في البداية.",
            "العمولة بتتشال من كل عملية، فحطها في التسعير."
          ],
          sol: R`الشكل المتوقع: التكلفة الكلية بتزيد، بس التكلفة لكل طالب بتقل كتير. مثال بأرقام تقريبية (حط أسعار مزودينك الحقيقية): عند ١٠٠ طالب، السيرفر والقاعدة ثابتين حوالي ٣٠ لـ ٦٠ دولار في الشهر، يعني نص دولار تقريبًا لكل طالب. عند ١٠٠٠ نفس السيرفر غالبًا كفاية، فالطالب بسنتات. عند ١٠٠٠٠ البند اللي بيكبر هو الفيديو (التخزين والـ bandwidth)، وده اللي هيحدد التكلفة.

عمولة البوابة بند مختلف: نسبة من كل عملية (مع مبلغ ثابت ساعات)، فهي بتكبر مع المبيعات مش مع عدد الطلاب. اطرحها من سعر الكورس الأول. مثلًا كورس بـ ٥٠٠ جنيه وعمولة حوالي ٣٪ وجنيهات ثابتة، يفضلك حوالي ٤٨٠. قارن ده بتكلفة الطالب الشهرية مضروبة في عدد الشهور اللي بيتفرج فيها.

الغلطة الأشهر إن الفيديو يتحسب ثابت. طالب واحد بيتفرج على ١٠ ساعات بجودة عالية ممكن يسحب أكتر من ١٠ جيجا. والتانية إن الخطط المجانية (Sentry و PostHog والإيميل) تتحسب مجانية للأبد. حط الحد اللي بعده بتدفع، واحسب إمتى هتوصله.`
        },
        {
          cmd: "التوثيق والتسليم",
          title: "مشروع حد تاني يقدر يشغّله من غيرك",
          desc: R`المشروع اللي بيشتغل بس وانت موجود مش مشروع خلصان. التسليم معناه ٣ حاجات. أولًا حد جديد يشغّل المشروع على جهازه في ربع ساعة من الـ README. تانيًا يعرف يعمل deploy ويتصرف في المشاكل المشهورة من الـ runbook. تالتًا الحسابات والمفاتيح بقت باسم صاحب المشروع، مش باسمك.`,
          example: R`# myapp
## تشغيل على جهازك
pnpm i && cp apps/api/.env.example apps/api/.env && docker compose up -d db redis && pnpm dev
## المعمارية
web (Next.js) بيكلّم api (Express)، و api بيكلّم PostgreSQL، و worker بياخد jobs من Redis. الرسمة في docs/architecture.md
## النشر
merge على main، و CI بيعمل deploy على staging لوحده. الإنتاج: tag بيبدأ بـ v، وبعدين موافقة
## لما حاجة تقع
docs/runbook.md: الدفع مش بيتفعّل، الديسك مليان، الإيميلات مش بتوصل، ترجّع نسخة قديمة
## الحسابات والمفاتيح
مين صاحب الدومين و Paymob والسحابة والإيميل، والمفاتيح في password manager الشركة، مش هنا`,
          try: R`ادّي الـ repo لحد (أو لنفسك على جهاز تاني) من غير أي كلام. سجّل كل سؤال سأله، وكل خطوة وقف فيها. كل واحدة منهم سطر ناقص في الـ README.`,
          flag: "script",
          deep: {
            why: "المطوّر اللي بيمشي من المشروع بياخد معاه نص المعرفة. والعميل اللي استلم كود من غير توثيق هيدفع لمطوّر جديد أسبوعين عشان يفهم. والحسابات اللي على إيميلك الشخصي بتخلي العميل رهينة ليك، حتى لو مش قصدك.",
            how: R`حزمة التسليم فيها:
[[README.md]]: التشغيل على الجهاز، والسكربتات، والمعمارية في فقرة.
[[.env.example]]: كامل ومطابق للكود، ولازم يتفحص (config.ts هو الحقيقة).
[[docs/architecture.md]]: رسمة، والـ ERD، ومين بيكلّم مين.
[[docs/adr/]]: القرارات المهمة وسببها.
[[docs/runbook.md]]: لكل مشكلة مشهورة، إزاي تعرفها (الـ alert أو اللوج) وخطوات حلها.
توثيق الـ API: OpenAPI أو collection في Postman.
قايمة بالمشاكل المعروفة والديون التقنية، بصراحة.
فيديو قصير بيمشي على الكود.

والحسابات: الدومين، والـ DNS، والسيرفر، والقاعدة، وحساب التاجر في بوابة الدفع (باسم الشركة القانوني)، ومزوّد الإيميل، و OAuth app بتاع جوجل، ومتاجر التطبيقات. كل ده ينتقل لصاحب المشروع. وبعد التسليم، صلاحياتك تتشال أو تتقلل، والأسرار تتغير.

والتوثيق يعيش في الـ repo جنب الكود، ويتحدّث في نفس الـ PR اللي بيغيّر الحاجة (بند في الـ definition of done). التوثيق القديم الغلط أسوأ من مفيش توثيق، لأنه بيودّي في حتة غلط وانت واثق.`,
            when: "من أول يوم، مش آخر أسبوع. الـ README بيتكتب مع الـ skeleton، والـ runbook مع أول مشكلة في الإنتاج.",
            mistakes: R`في مشروع حقيقي، [[.env.example]] كان فيه اسم متغير غير اللي الكود بيقراه، ومفيش ولا متغير لبوابة الدفع الأساسية. أي حد جديد مش هيعرف يشغّل الدفع. وفي مشروع تاني، جذر المشروع كان فيه حوالي ٤٠ ملف FIX و REPORT محدش بيقراهم. مكانهم runbook واحد و ADRs قليلة. ومن الغلطات كمان: حسابات باسم المطوّر، أو أسرار في الـ README.`
          },
          lines: [
            "أمر واحد: سطّب، وانسخ الإعدادات، وشغّل القاعدة و Redis، وشغّل التطوير.",
            "المعمارية في سطرين، والتفاصيل في ملف.",
            "النشر: staging لوحده، والإنتاج بـ tag وموافقة.",
            "المشاكل المشهورة وحلها في الـ runbook.",
            "الحسابات ملك مين، والمفاتيح فين. عمرها ما تتكتب هنا."
          ],
          sol: R`النتيجة الطبيعية لأول مرة: ٥ لـ ١٠ أسئلة. أشهرها: «نسخة Node كام؟» (حط [[.nvmrc]] أو [[engines]])، و «pnpm مش موجود» (اكتب [[corepack enable]])، و «الـ migrations مش شغالة» (سطر [[pnpm db:migrate]] ناقص)، و «مفيش داتا» (سطر الـ seed ناقص)، و «متغير X مش موجود» يعني [[.env.example]] ناقص، و «أعمل login بإيه؟» (يوزر تجربة في الـ seed).

كل سؤال من دول سطر في الـ README، والهدف إن حد جديد يشغّل المشروع في أقل من ١٥ دقيقة من غير ما يكلمك. ولو وقف في حاجة محتاجة حساب خارجي (Paymob، أو S3)، اكتب إزاي يشتغل من غيرها على جهازه: مثلًا وضع fake للبوابة، أو MinIO بدل S3.

علامة إنك خلصت: تكرر التجربة مع حد تاني (أو في container فاضي بـ [[git clone]] جديد)، ويشغّل من غير ولا سؤال.`
        }
      ]
    },
    {
      t: "مفاهيم الأنظمة الموزعة",
      l: 3,
      n: "الكلمات اللي بتتقال في أي system design: consistency و read-your-writes، و CAP و PACELC، و sharding و consistent hashing، و load balancers",
      items: [
        {
          cmd: "consistency و read-your-writes",
          title: "strong ولا eventual consistency، و «المستخدم لازم يشوف اللي كتبه»",
          desc: R`strong consistency معناها إن أي قراية بعد كتابة بتشوف الكتابة دي، من أي مكان. و eventual consistency معناها إن النسخ هتتفق «في الآخر»، بس ممكن قراية تشوف قيمة قديمة لفترة قصيرة. قاعدة PostgreSQL واحدة strong. وأول ما تضيف replica، أو كاش، أو search index، أو CDN، بقى عندك نسخ، والنسخ دي eventual.

المشكلة اللي بتبان للمستخدم: كتب تعليق وعمل refresh ومش لاقيه، لأن القراية راحت لـ replica متأخرة. الحل اسمه read-your-writes: المستخدم ده بالذات يقرا من الـ primary لفترة قصيرة بعد ما يكتب، والباقي يقرا من الـ replicas عادي.`,
          example: R`const STICKY_MS = 5000;

export function readYourWrites(req, res, next) {
  const lastWrite = Number(req.cookies.lw) || 0;
  req.read = Date.now() - lastWrite < STICKY_MS ? db.$primary() : db;
  if (!["GET", "HEAD"].includes(req.method)) {
    res.cookie("lw", String(Date.now()), { httpOnly: true, secure: true, sameSite: "lax", maxAge: STICKY_MS });
  }
  next();
}

router.get("/courses/:id/comments", readYourWrites, async (req, res) => {
  res.json({ data: await req.read.comment.findMany({ where: { courseId: req.params.id }, orderBy: { id: "desc" }, take: 20 }) });
});`,
          try: R`ارجع لدرس «scaling القاعدة» (فيه [[readReplicas]] و [[$primary()]]). ضيف الـ middleware ده، وتخيل replica متأخرة ٣ ثواني: اكتب جدول بـ ٤ أعمدة (الطلب، ومن مين، ويروح فين، ويشوف الجديد؟) لـ: الشخص اللي كتب بعد ثانية، وشخص تاني بعد ثانية، ونفس الشخص من موبايله بعد ثانية، ونفس الشخص بعد ١٠ ثواني.`,
          flag: "script",
          deep: {
            why: "أغلب الأنظمة الكبيرة eventual في أجزاء منها، ده مش عيب، ده تمن الـ scale. بس المستخدم مش مهتم بالمصطلح، مهتم إن «الحاجة اللي عملتها اختفت». والانترفيوز بتسأل: «أنهي أجزاء في تصميمك محتاجة strong وأنهي ينفع eventual؟» وده السؤال اللي بيفرّق.",
            how: R`strong بتيجي بتمن: كل كتابة لازم تستنى إن كل النسخ (أو أغلبها) تأكد، أو كل قراية تروح لمكان واحد. ده latency أعلى وأضعف لو جزء من الشبكة وقع. eventual أسرع وأرخص، بس لازم الكود والمنتج يستحملوا قراية قديمة.

قرر لكل داتا لوحدها. الرصيد، والمخزون، وحالة الدفع، والصلاحيات: strong (من الـ primary، وغالبًا جوه transaction). عدد المشاهدات، واللايكات، والتوصيات، ونتايج البحث: eventual عادي، وتأخير ثانية أو دقيقة محدش هيلاحظه.

ضمانات بين الاتنين ليها أسامي: read-your-writes (انت تشوف اللي كتبته)، و monotonic reads (متشوفش حاجة وبعدين تختفي لما تعمل refresh، يعني متتنقلش لـ replica أقدم)، و causal consistency (الرد ميظهرش قبل التعليق اللي بيرد عليه).

الـ middleware: cookie [[lw]] بوقت آخر كتابة، وأي قراية في الـ ٥ ثواني اللي بعدها تروح للـ primary. الرقم أكبر من الـ lag المعتاد بتاع الـ replica (قيسه بـ [[pg_stat_replication]] أو مقياس المزوّد). العيب إن الـ cookie مربوطة بالمتصفح: نفس الشخص من موبايله مش هيشوفها. البديل تخزين وقت آخر كتابة لكل مستخدم في Redis. وفيه طريقة أدق: تخزن الـ LSN (موقع الكتابة في الـ WAL) وتتأكد إن الـ replica عدّته.

والكاش نفس الموضوع: بعد التعديل امسح الكاش (درس «طبقات الكاش»)، أو ارجع النتيجة الجديدة للمستخدم من الـ response نفسه، والواجهة تحدّث الـ state (optimistic update) بدل ما تعمل refetch.`,
            when: "أول ما يبقى عندك replica، أو كاش بـ TTL، أو search index منفصل، أو أكتر من region. وفي الانترفيو كل ما ترسم نسختين من أي داتا.",
            mistakes: R`تقرا الرصيد أو حالة الطلب من replica قبل ما تقرر حاجة. أو تفتكر إن eventual يعني «ممكن تضيع». لأ، معناها «هتوصل متأخر». أو تحط كل حاجة على الـ primary عشان تريّح دماغك، فالـ replicas مالهاش لازمة. وفي الانترفيو: متقولش «هستخدم strong consistency في كل حاجة» من غير ما تقول التمن.`
          },
          lines: [
            "المدة اللي المستخدم يقرا فيها من الـ primary بعد ما يكتب.",
            "middleware بيختار مصدر القراية لكل طلب.",
            "إمتى آخر مرة الشخص ده كتب (من cookie).",
            "كتب من قريب؟ اقرا من الـ primary. غير كده من الـ replicas.",
            "الطلب ده كتابة (POST و PATCH و DELETE)؟",
            "سجّل وقتها في cookie بتعيش نفس المدة.",
            "قفلة.",
            "كمّل.",
            "قفلة.",
            "route قراية بيستخدم المصدر اللي اتختار.",
            "التعليقات. اللي لسه كاتب هيشوف تعليقه.",
            "قفلة."
          ],
          sol: R`الجدول المتوقع: (١) نفس الشخص بعد ثانية، من نفس المتصفح → الـ cookie موجودة → primary → يشوف تعليقه. (٢) شخص تاني بعد ثانية → مفيش cookie → replica → ممكن ميشوفوش، وده مقبول. (٣) نفس الشخص من موبايله بعد ثانية → الـ cookie على المتصفح التاني → replica → ممكن ميشوفوش، ودي الحالة اللي الـ cookie مبتغطيهاش (الحل Redis بالـ userId). (٤) نفس الشخص بعد ١٠ ثواني → الـ cookie خلصت → replica → يشوفه، لأن الـ lag (٣ ثواني) عدّى.

لو الـ lag وصل ١٠ ثواني في الزحمة، الحالة (٤) هتفشل. عشان كده الـ STICKY_MS بيتظبط على الـ lag الحقيقي، مع مراقبة وتنبيه لو الـ lag عدّى رقم معين.`
        },
        {
          cmd: "CAP و PACELC",
          title: "CAP و PACELC بكلام بسيط",
          desc: R`CAP بتقول: لما الشبكة تتقطع بين نسختين من الداتا (Partition)، لازم تختار: يا ترفض الطلبات عشان متقولش حاجة غلط (Consistency)، يا ترد بالداتا اللي عندك حتى لو قديمة (Availability). مينفعش الاتنين في نفس اللحظة. والتقطيع ده هيحصل، فالسؤال الحقيقي: لما يحصل، هتختار إيه؟

PACELC بتكمّل: وحتى لو الشبكة سليمة (Else)، فيه اختيار تاني كل يوم: Latency ولا Consistency. تستنى النسخ كلها تأكد (أبطأ وأدق)، ولا ترد بسرعة وتزامن بعدين.`,
          example: R`الموقف: قاعدتين في القاهرة وفرانكفورت، والشبكة بينهم وقعت دقيقتين
CP (اختيار الـ consistency): فرانكفورت ترفض الكتابة لحد ما الاتصال يرجع. الحجز والدفع والرصيد لازم كده
AP (اختيار الـ availability): الاتنين يكتبوا، ولما الشبكة ترجع تحل التعارض. سلة المشتريات واللايكات ينفع كده
PACELC في الأيام العادية: PostgreSQL بـ synchronous replica يستنى النسخة (EC)، والـ async replica بترد على طول (EL)
أمثلة: PostgreSQL قاعدة واحدة = CP عمليًا. DynamoDB و Cassandra = AP/EL افتراضيًا، وفيها خيار قراية strong
حل التعارض في AP: آخر كتابة تكسب (last-write-wins)، أو دمج (CRDT)، أو تسأل المستخدم
في الانترفيو: متقولش «هختار CA». الـ partition مش اختيار، هي بتحصل`,
          try: "خد منصة الكورسات، واكتب لكل جزء اختيارك لو الشبكة اتقطعت بين region مصر و region أوروبا: الدفع وتفعيل الكورس، وتقدم الطالب في الدروس، والتعليقات، وعدد المشاهدات، وتغيير الباسورد. واكتب جنب كل واحد: المستخدم هيشوف إيه وقت التقطيع؟",
          flag: "script",
          deep: {
            why: "CAP أشهر كلمة في أسئلة system design، وأكتر كلمة بتتقال غلط. المحاور مش عايز التعريف، عايز يشوفك بتربطها بقرار: «في الجزء ده هختار أرفض، وفي الجزء ده هختار أرد بقديم، وده السبب».",
            how: R`الـ C في CAP معناها linearizability: كل الناس بيشوفوا نفس آخر قيمة، كأن فيه نسخة واحدة. مش الـ C بتاعة ACID (القيود والقواعد جوه القاعدة). دي فرقة بتتسأل.

والـ A معناها إن كل نسخة شغالة لازم ترد (بنجاح) على أي طلب. مش «uptime ٩٩.٩٩٪».

ليه «CA» مش اختيار؟ لأن أي نظام على أكتر من جهاز ممكن الشبكة بينهم تقع. نظام على جهاز واحد مفيهوش partition أصلًا، بس ده مش موزّع. فالاختيار الفعلي CP ولا AP، ووقت التقطيع بس.

PACELC أهم في الشغل اليومي، لأن التقطيع نادر، بس الـ latency كل طلب. مثال: replica في region تاني. لو كل كتابة بتستنى تأكيده (synchronous)، كل كتابة زادت ٥٠ ملّي ثانية أو أكتر. لو مش بتستنى (async)، سريعة، بس لو الـ primary وقع ممكن آخر كام كتابة تضيع. وده بالظبط اختيار EC ولا EL.

القاعدة العملية: الحاجات اللي غلطها بيتحوّل فلوس أو صلاحيات → CP و EC. والحاجات اللي غلطها بيتحوّل رقم قديم شوية → AP و EL. ونفس المنتج فيه الاتنين.

وحل التعارضات في AP: last-write-wins أبسط حاجة، بس بتضيّع كتابات (لو اتنين عدّلوا في نفس الوقت، واحد بيروح). الـ CRDTs (زي عداد بيتجمع، أو set بيتدمج) بتدمج من غير ما تضيّع، وده اللي بيخلي Google Docs و Figma شغالين أوفلاين وبعدين يتدمجوا.`,
            when: "أول ما تصمم حاجة على أكتر من region، أو تختار قاعدة NoSQL موزّعة، أو تتسأل في انترفيو «لو الشبكة وقعت بين الـ data centers، إيه اللي بيحصل؟».",
            mistakes: R`«اخترت CA». أو إنك تقول CAP وتعرّف C كـ ACID consistency. أو إنك تقول «النظام بتاعي AP» على النظام كله، مع إن الدفع جواه لازم CP. أو تفتكر إن eventual consistency معناها داتا بتضيع. أو تنسى الـ PACELC خالص، مع إن الـ latency هي اللي بتفرق كل يوم.`
          },
          lines: [
            "الموقف: نسختين، والشبكة بينهم وقعت.",
            "CP: ترفض بدل ما تقول حاجة غلط. للفلوس والحجز.",
            "AP: ترد وتكتب، وتصلّح بعدين. للحاجات اللي تستحمل.",
            "PACELC: حتى من غير تقطيع، تستنى النسخ (أدق) ولا ترد على طول (أسرع).",
            "أمثلة مشهورة لكل ناحية.",
            "لو اخترت AP، لازم تقول هتحل التعارض إزاي.",
            "الغلطة اللي بتتسأل: CA مش اختيار في نظام موزّع."
          ],
          sol: R`إجابة معقولة: الدفع وتفعيل الكورس → CP: region أوروبا يرفض أو يحوّل للـ region الأساسي، والمستخدم يشوف «الدفع مش متاح دلوقتي، جرّب بعد دقايق» بدل ما يدفع مرتين. تقدم الطالب → AP: يتسجّل محليًا ويتدمج بعدين بأكبر قيمة (التقدم مبيرجعش لورا، ده CRDT بسيط اسمه max). التعليقات → AP: تظهر لأهل الـ region ده الأول وبعدين للكل. عدد المشاهدات → AP: عدّادات في كل region وبتتجمع. تغيير الباسورد → CP: لازم يوصل للكل، وإلا الباسورد القديم يفضل شغال في region تاني.

المستخدم في CP بيشوف رسالة خطأ واضحة. وفي AP بيشوف داتا ناقصة شوية. لو كتبت «كله CP» أو «كله AP»، ارجع لكل سطر واسأل: الغلط هنا تمنه إيه؟`
        },
        {
          cmd: "sharding و consistent hashing",
          title: "sharding: تقسيم الداتا على قواعد، و consistent hashing",
          desc: R`الـ sharding معناه إن الداتا بتتقسم على كذا قاعدة، وكل قاعدة (shard) عليها جزء. بيتعمل لما قاعدة واحدة (حتى أكبر واحدة) مبقتش مستحملة الكتابة أو الحجم. ده آخر خطوة في درس «scaling القاعدة»، مش أولها.

التقسيم بيحتاج مفتاح (shard key). ٣ طرق مشهورة: hash للمفتاح، أو ranges (من كذا لكذا)، أو tenant (كل عميل أو مجموعة عملاء على shard). و consistent hashing طريقة بتوزّع المفاتيح على الـ shards، ولما تضيف shard جديد جزء صغير بس من الداتا يتنقل.`,
          example: R`class HashRing {
  constructor(nodes, vnodes = 100) { this.points = []; nodes.forEach((n) => this.add(n, vnodes)); }
  hash(s) { return crypto.createHash("md5").update(s).digest().readUInt32BE(0); }
  add(node, vnodes = 100) {
    for (let i = 0; i < vnodes; i++) this.points.push({ h: this.hash($__bt$__{node}#$__{i}$__bt), node });
    this.points.sort((a, b) => a.h - b.h);
  }
  get(key) {
    const h = this.hash(key);
    let lo = 0, hi = this.points.length;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (this.points[mid].h < h) lo = mid + 1; else hi = mid; }
    return this.points[lo % this.points.length].node;
  }
}
const ring = new HashRing(["db-a", "db-b", "db-c"]);
const shard = ring.get(tenantId);`,
          try: R`حط ١٠٠٠٠ مفتاح ([[tenant-0]] لـ [[tenant-9999]]) على [[HashRing]] بـ ٣ shards، واحفظ كل مفتاح راح فين. ضيف shard رابع وعد كام مفتاح اتنقل. وبعدين كرر نفس الكلام بـ [[hash(key) % 3]] وبعدين [[% 4]]. قارن النسبتين.`,
          flag: "script",
          deep: {
            why: "الـ sharding هو الطريقة الوحيدة للكتابة إنها تكبر أفقيًا بعد حدود جهاز واحد. بس بيعقّد كل حاجة: joins بين shards، و transactions بين shards، والتقارير، والـ migrations. عشان كده بيتسأل في الانترفيو: عايزين يعرفوا إنك عارف إزاي، وإمتى متعملوش.",
            how: R`hash sharding: [[shard = hash(key) % N]]. توزيع متساوي، بس لو N اتغيرت (زودت shard) أغلب المفاتيح بتتنقل (في التجربة حوالي ٧٥٪ من ٣ لـ ٤). ده معناه نقل تقريبًا كل الداتا.

consistent hashing بيحل ده: المفاتيح والـ shards كلهم نقط على دايرة (أرقام الـ hash)، وكل مفتاح بيروح لأول shard بعده على الدايرة. لما تضيف shard، بياخد المفاتيح اللي قبله بس، يعني حوالي 1/N (في التجربة ٢٥٪ من ٣ لـ ٤). والـ virtual nodes (كل shard ليه ١٠٠ نقطة مش واحدة) بتخلي التوزيع متساوي، وبتخلي الـ shard الجديد ياخد حتة صغيرة من كل واحد بدل ما ياخد كتير من جار واحد. Cassandra و DynamoDB والـ caches الموزعة بتستخدم الفكرة دي.

range sharding: [[users A-M]] على shard و [[N-Z]] على تاني، أو بالتاريخ. الـ range queries سهلة ([[WHERE createdAt BETWEEN]] بتروح shard واحد). بس فيه hot spots: كل الكتابة الجديدة بتروح لآخر range.

tenant sharding: كل tenant (أو مجموعة tenants صغيرة) على shard. ده الأنسب لـ SaaS: كل queries العميل على shard واحد، فالـ joins والـ transactions شغالة عادي، والعميل الكبير ممكن ياخد shard لوحده. محتاج جدول صغير (directory) بيقول كل tenant فين، بدل hash، عشان تقدر تنقل عميل معين.

اختيار المفتاح أهم قرار: لازم يكون موجود في أغلب الـ queries (وإلا كل query بيسأل كل الـ shards، scatter-gather)، وتوزيعه متساوي (مش كله عند عميل واحد). والـ ids لازم تبقى فريدة على كل الـ shards (UUID أو Snowflake، مش auto-increment).

قبل الـ sharding اعمل: indexes، و replicas للقراية، وكاش، وقاعدة أكبر، و partitioning جوه نفس القاعدة (PostgreSQL declarative partitioning)، وأرشفة. ولو لازم، أدوات زي Citus لـ PostgreSQL بتعمل sharding من غير ما تعيد كتابة التطبيق.`,
            when: "لما قاعدة واحدة (بعد كل التحسينات والـ replicas) مش مستحملة الكتابة أو الحجم، أو العملاء محتاجين عزل أو داتا في بلد معين. في منتج جديد: تقريبًا أبدًا في أول سنة.",
            mistakes: R`sharding بدري «عشان نبقى جاهزين». أو shard key مش موجود في أغلب الـ queries. أو [[hash % N]] من غير خطة لما N يتغير. أو auto-increment ids على كل shard فتتكرر. أو تنسى إن الـ unique constraint على مستوى shard واحد بس (الإيميل unique في shard، مش في النظام كله). وفي الانترفيو: «إزاي تعمل resharding من غير توقف؟» (كتابة مزدوجة، ونسخ الداتا القديمة، وبعدين تحويل القراية، زي expand/contract).`
          },
          lines: [
            "دايرة الـ hash.",
            "بتبدأ بالـ nodes، وكل واحد ليه ١٠٠ نقطة.",
            "hash رقمي من 0 لـ 4 مليار.",
            "إضافة node:",
            "١٠٠ نقطة بأسماء مختلفة لنفس الـ node على الدايرة.",
            "رتّب النقط.",
            "قفلة.",
            "المفتاح ده يروح فين؟",
            "الـ hash بتاعه.",
            "بحث ثنائي...",
            "...على أول نقطة بعده على الدايرة.",
            "ولو عدّى آخر نقطة، يلف لأول واحدة.",
            "قفلة.",
            "قفلة.",
            "دايرة بـ ٣ قواعد.",
            "الـ tenant ده على أنهي قاعدة."
          ],
          sol: R`النتيجة الفعلية على ١٠٠٠٠ مفتاح: consistent hashing من ٣ لـ ٤ shards نقل حوالي ٢٥٪ من المفاتيح (قريب من 1/4، وده المتوقع لأن الـ shard الجديد بياخد ربع الدايرة). و [[% 3]] ثم [[% 4]] نقل حوالي ٧٥٪.

يعني مع modulo، إضافة shard معناها نقل تلات أرباع الداتا، ومع الدايرة ربعها بس، ومن كل الـ shards بالتساوي (بسبب الـ virtual nodes).

لو قلّلت [[vnodes]] لـ 1، هتلاقي التوزيع مش متساوي خالص (shard ممكن ياخد ٥٠٪)، وده ليه الـ virtual nodes موجودة.`
        },
        {
          cmd: "load balancer",
          title: "الـ load balancer: round-robin و least-connections، و L4 ولا L7",
          desc: R`الـ load balancer بيوزّع الطلبات على كذا نسخة من التطبيق، وبيشيل النسخة اللي وقعت من التوزيع (health checks). ده اللي بيخلي الـ scaling الأفقي ممكن.

خوارزميات التوزيع: round-robin (بالدور، الافتراضي)، و least-connections (للنسخة اللي عندها أقل طلبات شغالة دلوقتي)، و hash (نفس العميل لنفس النسخة). ونوعين حسب هو فاهم إيه: L4 بيشوف TCP بس (IP و port)، و L7 بيفهم HTTP (الـ path، والـ headers، والـ cookies).`,
          example: R`upstream api {
    least_conn;
    server 10.0.0.11:3000 max_fails=3 fail_timeout=10s;
    server 10.0.0.12:3000 max_fails=3 fail_timeout=10s;
    server 10.0.0.13:3000 backup;
    keepalive 32;
}
server {
    listen 443 ssl;
    server_name api.myapp.com;
    location /socket.io/ {
        proxy_pass http://api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
    location / {
        proxy_pass http://api;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_next_upstream error timeout http_502 http_503;
    }
}`,
          try: R`شغّل ٣ نسخ من API صغير على ports مختلفة، كل واحدة بترد باسمها بعد ٥٠ ملّي ثانية، ما عدا واحدة «عيانة» بترد بعد ٢ ثانية. حطهم ورا Nginx مرة بالافتراضي (round-robin) ومرة بـ [[least_conn]]. ابعت ٣٠ طلب، طلب كل ٣٠ ملّي ثانية من غير ما تستنى الرد، وعد كل نسخة خدت كام، واحسب متوسط وقت الرد. وبعدين وقّف نسخة وشوف إيه اللي بيحصل للطلبات.`,
          flag: "script",
          deep: {
            why: "من غير load balancer، التطبيق نسخة واحدة: لو وقعت أو اتعملها deploy، الموقع وقع. ومعاه، تقدر تزوّد نسخ، وتعمل deploy نسخة نسخة من غير توقف، وتشيل النسخة العيانة لوحدها. وفي الانترفيو، هو أول مربع بيترسم بعد الـ client.",
            how: R`round-robin ممتاز لو كل الطلبات شبه بعض في الوقت. بس لو فيه طلبات تقيلة (تقرير، أو رفع ملف)، نسخة ممكن يتجمع عليها تقيل وهي بتاخد نفس الدور. least-connections بيبص على الشغل الفعلي دلوقتي، فبيوزّع أحسن مع طلبات مختلفة المدة. والـ hash ([[ip_hash]] أو hash على cookie) بيخلي نفس العميل يروح لنفس النسخة (sticky sessions)، ودي محتاجها مع WebSocket أحيانًا، بس بتبوّظ التوزيع. الأحسن إن التطبيق يبقى stateless (الجلسات في القاعدة أو Redis، و socket.io بـ Redis adapter) ومتحتاجش sticky.

L4 (TCP): أسرع وأرخص، بيعدّي أي بروتوكول (قواعد بيانات، أو gRPC، أو TLS زي ما هو). مبيعرفش الـ path ولا الـ headers. أمثلة: AWS NLB، و HAProxy في mode tcp، و Nginx stream.

L7 (HTTP): بيفك الـ TLS، وبيقدر يوجّه [[/api]] لخدمة و [[/]] لخدمة، ويضيف headers ([[X-Forwarded-For]])، ويعيد الطلب على نسخة تانية لو الأولى رجعت 502، ويعمل rate limit وكاش. أمثلة: Nginx، و AWS ALB، و Cloudflare، و Caddy، و Traefik.

الـ health checks: Nginx المفتوح بيعمل passive (لو [[max_fails]] طلبات فشلت، يشيل النسخة [[fail_timeout]]). والـ active checks (يسأل [[/health]] كل شوية) في Nginx Plus أو HAProxy أو الـ load balancers المُدارة. ولازم [[/health]] يبقى خفيف (درس «health و uptime»).

[[proxy_next_upstream]]: لو النسخة وقعت أثناء الطلب، Nginx يجرب التانية. خلي بالك: ده آمن للـ GET. و Nginx افتراضيًا مش بيعيد POST إلا لو ضفت [[non_idempotent]]، وده مقصود، لأن الدفع ممكن يتعمل مرتين.

[[keepalive]] مع [[Connection ""]] بيخلي Nginx يعيد استخدام الاتصالات للـ upstream بدل ما يفتح TCP جديد مع كل طلب. و WebSocket محتاج [[Upgrade]] و [[Connection "upgrade"]] في location لوحده. وحتى الـ load balancer نفسه ممكن يقع، فالمُدار (ALB) بيبقى أكتر من جهاز ورا DNS واحد، أو اتنين Nginx بـ IP عائم.`,
            when: "أول ما يبقى عندك أكتر من نسخة من التطبيق، أو محتاج deploy من غير توقف. وعلى PaaS زي Render و Railway و Fly فيه load balancer جاهز، بس لازم تعرف هو بيعمل إيه.",
            mistakes: R`sticky sessions عشان الجلسة في ذاكرة النسخة. أو [[/health]] تقيل بيسأل كل حاجة فالنسخ تطلع وتدخل. أو إعادة POST على نسخة تانية بعد timeout. أو تنسى [[X-Forwarded-For]] و [[trust proxy]] فكل الطلبات جاية من IP الـ load balancer. أو WebSocket من غير Upgrade headers فيفضل يعمل polling. وفي الانترفيو: «L4 ولا L7 لـ API عادي؟» L7، لأنك محتاج routing بالـ path و retries و headers، وL4 لما البروتوكول مش HTTP أو محتاج أقل latency.`
          },
          lines: [
            "مجموعة نسخ التطبيق.",
            "وزّع على النسخة اللي عندها أقل طلبات شغالة.",
            "نسخة، ولو فشلت ٣ مرات تتشال ١٠ ثواني.",
            "نسخة تانية بنفس الإعداد.",
            "نسخة احتياطي، مبتاخدش طلبات غير لو الباقي وقع.",
            "خلي ٣٢ اتصال مفتوحين للنسخ بدل اتصال جديد كل طلب.",
            "قفلة.",
            "الـ server اللي بيستقبل من الإنترنت.",
            "HTTPS.",
            "الدومين.",
            "مسار الـ WebSocket:",
            "ابعت للمجموعة.",
            "HTTP 1.1 لازم للـ upgrade.",
            "مرّر طلب الـ upgrade...",
            "...وخلي الاتصال يتحول WebSocket.",
            "قفلة.",
            "باقي الطلبات:",
            "ابعت للمجموعة.",
            "HTTP 1.1 عشان الـ keepalive.",
            "امسح Connection عشان الاتصال يفضل مفتوح.",
            "IP العميل الحقيقي للتطبيق.",
            "لو النسخة وقعت أو رجعت 502 أو 503، جرّب التانية (مش للـ POST افتراضيًا).",
            "قفلة.",
            "قفلة."
          ],
          sol: R`النتيجة في تجربة فعلية: round-robin وزّع ١٠ و ١٠ و ١٠ بالظبط، ومتوسط الرد حوالي ٧٠٠ ملّي ثانية، لأن تلت الطلبات راحت للنسخة العيانة واستنت ٢ ثانية. و [[least_conn]] بعت للنسخة العيانة طلب واحد بس و ١٥ و ١٤ للباقيين، ومتوسط الرد نزل لحوالي ١٢٠. السبب: النسخة العيانة فضل عليها اتصالات مفتوحة، فـ least_conn شافها «مشغولة» وبعت لغيرها.

خلي بالك: لو بعت الـ ٣٠ طلب في نفس اللحظة بـ [[Promise.all]]، الاتنين هيوزّعوا ١٠ و ١٠ و ١٠، لأن لحظة التوزيع كل النسخ عندها صفر اتصالات. الفرق بيبان بس لما الطلبات بتوصل على فترات، وده الواقع.

لما توقف نسخة: الطلبات اللي كانت رايحة لها بتفشل بـ [[connect() failed (111: Connection refused)]] في لوج Nginx، و [[proxy_next_upstream]] بيعيدها على نسخة تانية، فالـ GET بيعدّي (في التجربة الـ ٣٠ اتوزعوا ١٥ و ١٥ من غير ولا error). والنسخة بتتشال فترة وبعدين Nginx يجرّبها تاني. والـ POST اللي كان رايح ليها بيرجع 502، وده مقصود.`
        }
      ]
    },
    {
      t: "تدريب system design",
      l: 3,
      n: "٧ أسئلة مشهورة بإجابة مترتبة: المتطلبات والأرقام، والـ API، والداتا، وبعدين scaling والمشاكل",
      items: [
        {
          cmd: "URL shortener",
          title: "صمّم خدمة تقصير لينكات",
          desc: R`أي سؤال system design بيمشي بنفس الخطوات. ابدأ بالمتطلبات وأرقام تقريبية، وبعدين الـ API، وبعدين الداتا، وبعدين الشكل العام، وفي الآخر scaling والمشاكل. خد ٥ دقايق في المتطلبات قبل ما ترسم أي مربع، واسأل الشخص اللي قدامك.

وخدمة تقصير اللينكات فيها قراية أكتر من الكتابة بكتير، فالتصميم كله بيتبني حوالين تحويل سريع ورخيص.`,
          example: R`المتطلبات: تقصير، وتحويل سريع، وإحصائيات بسيطة. 100 مليون لينك في الشهر (≈ 40 كتابة في الثانية)، والقراية 100 ضعف (≈ 4000 في الثانية)
الـ API: POST /links {url} بيرجّع {code}، و GET /:code بيحوّل بـ 301 أو 302
الداتا: links(code PK, url, userId, createdAt, expiresAt)، والضغطات في جدول لوحده أو stream
الكود: 7 حروف base62 = 62^7 ≈ 3.5 تريليون. من counter متحوّل base62 (مفيش تصادم)، أو عشوائي مع unique
القراية: Redis قدام القاعدة، و CDN أو edge للّينكات المشهورة
الإحصائيات: الضغطة تروح queue وتتجمع بعدين، مش UPDATE counter مع كل تحويل
المشاكل: لينكات ضارة (فحص وبلاغات)، و rate limit على الإنشاء، و 301 بيتكاش في المتصفح فالإحصائيات تضيع`,
          try: "جاوب السؤال بصوت عالي في ٣٥ دقيقة، بالترتيب ده، ومعاك ورقة. سجّل نفسك. بعدين شوف: سألت عن المتطلبات قبل ما ترسم؟ حسبت أرقام؟ قلت trade-off واحد على الأقل بكلمة «بس»؟",
          flag: "script",
          deep: {
            why: "السؤال ده بيتسأل كتير لأنه صغير كفاية يتحل في ٤٥ دقيقة، وفيه كل الأفكار الأساسية: قراية كتير، وكاش، وتوليد ids فريدة، وتحليلات مش لازم تبقى لحظية.",
            how: R`الأرقام التقريبية بتفرق في القرار. ١٠٠ مليون في الشهر على حوالي ٢.٦ مليون ثانية يطلعوا حوالي ٤٠ كتابة في الثانية، وده قليل جدًا. والقراية حوالي ٤٠٠٠ في الثانية، ودي اللي محتاجة كاش. والتخزين: ٥٠٠ بايت للينك، يعني حوالي ٥٠ جيجا في الشهر، وحوالي ٦ تيرا في ١٠ سنين، وده عادي.

توليد الكود فيه ٣ طرق. الأولى counter متحوّل base62: مفيش تصادم، بس الـ counter الواحد نقطة ضعف، والأكواد متسلسلة وسهل تتخمن. الحل إن كل سيرفر ياخد range من الأرقام، أو Snowflake IDs. التانية عشوائي، ولو حصل تصادم (نادر مع ٣.٥ تريليون) الـ unique بيرفض وتجرب تاني. والتالتة hash للـ URL: نفس اللينك بياخد نفس الكود، بس لازم تتعامل مع التصادمات.

الـ 301 (دايم) المتصفح بيحفظه، فالطلب التاني مبيوصلكش. أحمال أقل، بس الإحصائيات تضيع. والـ 302 (مؤقت) كل ضغطة بتعدّي عليك. اختار حسب هل الإحصائيات جزء من المنتج ولا لأ، وقول ده بصوت عالي. الـ trade-off المعلن ده هو اللي بيتقيّم.

وممكن تتسأل عن مسح اللينكات المنتهية: job بيمسحها، أو التحقق من [[expiresAt]] وقت القراية.`,
            when: R`أسئلة المتابعة المتوقعة: «لو عايز custom alias؟» (unique، ومحجوز من الكود العشوائي). «تمنع التخمين إزاي؟» (عشوائي وطول أكبر). «الإحصائيات لحظية؟» (stream و counters مجمعة في Redis). «multi-region؟» (القراية من الـ edge، والكتابة في region واحدة).`,
            mistakes: "إنك تبدأ ترسم microservices قبل ما تسأل على الأرقام. أو تحسب auto-increment ids من غير ما تفكر في التخمين. أو تنسى الكاش مع إن القراية ١٠٠ ضعف. أو متقولش أي trade-off، وكل اختيار بتقوله كأنه الصح الوحيد."
          },
          lines: [
            "المتطلبات والأرقام الأول. القرار كله مبني على إن القراية أكتر بكتير.",
            "API صغيرة: إنشاء وتحويل.",
            "جدول بسيط، والكود هو الـ primary key. والضغطات مفصولة عشان متبطّأش التحويل.",
            "حساب المساحة المتاحة، وطريقتين للتوليد بميزة كل واحدة.",
            "القراية بتتخدم من الذاكرة ومن أقرب مكان للزائر.",
            "الإحصائيات مش لازم تبقى لحظية، فبتروح queue.",
            "المشاكل والـ trade-off: الـ 301 أسرع بس بيضيّع الإحصائيات."
          ],
          sol: R`الإجابة النموذجية بالترتيب ده، وكل حتة ليها وقت: (١) ٥ دقايق أسئلة: قراية قد إيه نسبة للكتابة؟ اللينك بينتهي؟ custom alias؟ إحصائيات قد إيه دقيقة؟ (٢) أرقام: ٤٠ كتابة و ٤٠٠٠ قراية في الثانية، والتخزين حوالي ١٠٠ مليون × ٥٠٠ بايت ≈ ٥٠ جيجا في الشهر، يعني حوالي ٦٠٠ جيجا في السنة. (٣) الـ API والداتا. (٤) الرسمة: client ← CDN ← API ← Redis ← PostgreSQL، والضغطات ← queue ← worker ← جدول إحصائيات. (٥) التعمق في جزء واحد: توليد الكود. (٦) المشاكل والـ trade-offs.

الـ trade-offs اللي لازم تتقال بـ «بس»: الـ counter مفيهوش تصادم، بس الأكواد متتابعة وسهل حد يخمّن اللينكات، فممكن تخلطه أو تزود bits عشوائية. و 301 بيخلي المتصفح يكاش التحويل ويخفف الحمل، بس الضغطات اللي بعد كده مبتوصلكش، فلو الإحصائيات مهمة استخدم 302. و Redis بيخدم ٤٠٠٠ قراية بسهولة، بس محتاج تسخين ومساحة، فكاش الـ hot links بس.

علامات إن إجابتك ضعيفة: رسمت قبل ما تسأل، أو مقلتش ولا رقم، أو قلت «microservices» و «Kafka» من غير ما الأرقام تطلبهم. ٤٠ كتابة في الثانية قاعدة واحدة بتشيلها وهي نايمة.`
        },
        {
          cmd: "chat app",
          title: "صمّم تطبيق شات",
          desc: R`الشات فيه ٣ مشاكل مع بعض. اتصال دايم مع ملايين الأجهزة، ورسايل لازم متضيعش ولا تتكرر ولا يتلخبط ترتيبها، وتوزيع الرسالة على أعضاء محادثة ممكن يكونوا متصلين بسيرفرات مختلفة. الإجابة بتمشي على الترتيب نفسه: المتطلبات والأرقام، وبعدين الاتصال، وبعدين حفظ الرسالة وتوزيعها، وبعدين الأوفلاين والمشاكل.`,
          example: R`المتطلبات: شات 1:1 وجروبات لحد 500، أونلاين وأوفلاين، الرسايل متضيعش، والتاريخ كامل. 1 مليون مستخدم يومي × 50 رسالة ≈ 600 رسالة في الثانية، والذروة ×5
الاتصال: WebSocket لكل جهاز، وكل سيرفر عارف مين متصل عنده (في Redis بـ TTL)
الإرسال: الرسالة تتحفظ الأول (id ووقت)، وبعدين تتوزع على أعضاء المحادثة
بين السيرفرات: Redis pub/sub أو adapter، لأن المستقبل ممكن يكون على سيرفر تاني
الداتا: messages(conversationId, id, senderId, body, createdAt) و index على (conversationId, id)
الأوفلاين: push notification، ولما يرجع يسحب الرسايل من بعد آخر id عنده
المشاكل: الترتيب (id متزايد لكل محادثة)، والتكرار (clientMessageId)، والجروبات الكبيرة (fan-out)`,
          try: "ارسم الشكل ده على ورقة، وامشي على رسالة من «أحمد بيكتب» لحد «منى شافتها»، ومنى على سيرفر تاني. بعدين كرر ومنى أوفلاين. كل خطوة مش عارف فيها مين بيكلّم مين، تبقى فجوة في التصميم.",
          flag: "script",
          deep: {
            why: "الشات بيختبر إنك فاهم الاتصالات الدايمة، والتوزيع بين السيرفرات، والفرق بين «اتبعتت» و «اتحفظت» و «وصلت». وده نفس اللي في الإشعارات، والمزادات، واللوحات اللايف.",
            how: R`الحفظ قبل التوزيع هو أهم قرار. الرسالة بتتكتب في القاعدة، وبعدين تتبعت. لو السيرفر وقع بعد الحفظ، الرسالة موجودة، والمستقبل هيسحبها. ولو وقع قبل الحفظ، الـ client معندوش تأكيد، فبيعيد الإرسال. وعشان الإعادة متعملش رسالة مكررة، الـ client بيبعت [[clientMessageId]] عشوائي، والسيرفر عليه unique.

الترتيب: الوقت من أجهزة مختلفة مش مضمون. فالسيرفر بيدّي id متزايد لكل محادثة، والعرض بيرتّب بيه. والـ client بيسحب «كل اللي بعد آخر id عندي» لما يرجع.

الـ fan-out: في محادثة 1:1 أو جروب صغير، ابعت لكل عضو متصل (fan-out on write). أما في جروب فيه آلاف، ابعت event صغير «فيه جديد»، والـ clients بتسحب بنفسها (fan-out on read). وحالة القراية (sent و delivered و read) بتتخزن لكل عضو: آخر id وصله، وآخر id قراه.

الحضور (أونلاين): heartbeat كل ٣٠ ثانية، بيجدد key في Redis بـ TTL. لو الـ key خلص، يبقى أوفلاين.

الداتا: PostgreSQL مقسّم بالوقت بيستحمل كويس في البداية. وفي أحجام ضخمة جدًا، قواعد زي Cassandra أو ScyllaDB بمفتاح [[conversationId]]، لأنها مبنية للكتابة الكتير.`,
            when: R`أسئلة المتابعة: «end-to-end encryption؟» (المفاتيح على الأجهزة، والسيرفر مبيشوفش النص). «الصور والملفات؟» (signed upload، والرسالة فيها رابط بس). «البحث في الرسايل؟» (index منفصل). «الترتيب مع رسايل وصلت متأخر؟»`,
            mistakes: "إنك توزّع قبل ما تحفظ. أو تعتمد على وقت الجهاز في الترتيب. أو تنسى إن المستقبل ممكن يكون على سيرفر تاني. أو polling كل ثانية بدل اتصال دايم. أو تعامل جروب فيه ١٠ آلاف زي محادثة بين اتنين."
          },
          lines: [
            "المتطلبات والأرقام: حوالي ٦٠٠ رسالة في الثانية في المتوسط، والذروة خمس أضعاف.",
            "اتصال دايم لكل جهاز، ومكان كل مستخدم متسجّل في Redis.",
            "احفظ الأول، وبعدين وزّع. ده اللي بيضمن إن الرسايل متضيعش.",
            "السيرفرات بتكلّم بعض عن طريق Redis.",
            "جدول الرسايل، و index بيجيب المحادثة بالترتيب بسرعة.",
            "الأوفلاين بياخد push، ولما يرجع يسحب اللي فاته.",
            "المشاكل الصعبة، وحل كل واحدة في كلمتين."
          ],
          sol: R`الرحلة الصح لرسالة من أحمد لمنى، ومنى على سيرفر تاني: (١) أحمد يبعت على الـ WebSocket بتاعه لسيرفر A رسالة فيها [[clientMessageId]]. (٢) سيرفر A يتأكد إن أحمد عضو في المحادثة، ويحفظ الرسالة في القاعدة ويدّيها [[id]] متزايد جوه المحادثة. (٣) يرد على أحمد بـ ack فيه الـ id (علامة ✓). (٤) يبعت الرسالة على Redis pub/sub (أو الـ adapter) لـ channel المحادثة أو channel منى. (٥) سيرفر B، اللي منى متصلة عنده، بياخدها ويبعتها على الـ socket بتاع منى. (٦) جهاز منى يرد بـ delivered، ولما تفتح المحادثة بـ read ومعاه آخر id قرته، والحالة دي بترجع لأحمد بنفس الطريق (✓✓).

ومنى أوفلاين: الخطوات ١ لـ ٣ زي ما هي، وفي الخطوة ٤ السيستم بيشوف إنها مش متصلة (مفيش presence ليها في Redis)، فيبعت push notification بدل الـ socket. لما ترجع، التطبيق بيطلب [[GET /conversations/:id/messages?after=LAST_ID]] ويسحب كل اللي فاته.

الفجوات اللي بتظهر عادة: الحفظ بعد الإرسال بدل قبله (فلو السيرفر وقع الرسالة تضيع)، ومفيش [[clientMessageId]] فإعادة الإرسال بعد انقطاع النت تعمل رسالتين، والترتيب بالوقت بتاع الجهاز بدل id السيرفر.`
        },
        {
          cmd: "booking system",
          title: "صمّم نظام حجز من غير حجز مزدوج",
          desc: R`نظام الحجز (حصص في جيم، أو مواعيد دكتور، أو كراسي في كورس أونلاين) مشكلته الأساسية إن اتنين بيحجزوا آخر مكان في نفس اللحظة. الحل إن القاعدة هي اللي تحكم، مش الكود: update مشروط ذري، أو قيد unique، أو exclusion constraint للأوقات اللي بتتداخل. ولو فيه دفع، الحجز بيتعمل «hold» بمهلة لحد ما الدفع يخلص.`,
          example: R`المتطلبات: حجز حصة أو ميعاد، ومكانين لنفس الكرسي ممنوع، وإلغاء، ودفع اختياري، والزحمة وقت فتح الحجز
الـ API: GET /slots?date= و POST /bookings {slotId} (مع Idempotency-Key) و DELETE /bookings/:id
الداتا: slots(id, startsAt, capacity, booked) و bookings(slotId, userId, status) و unique(slotId, userId)
الحجز: UPDATE slots SET booked = booked + 1 WHERE id = $1 AND booked < capacity، ولو رجع 0 صفوف يبقى اتملى
المواعيد المتداخلة: exclusion constraint على (resource, tstzrange) أو SELECT ... FOR UPDATE جوه transaction
مع الدفع: status HELD و expiresAt بعد 10 دقايق، و job بيفك الـ holds اللي خلصت
المشاكل: المواعيد بتتخزن UTC وتتعرض بتوقيت المكان، والـ no-show، وقايمة انتظار، و queue وقت الزحمة`,
          try: R`اعمل جدول slots فيه حصة بـ capacity 1، واكتب سكربت بيبعت ٥٠ طلب حجز مع بعض بـ [[Promise.all]]. جرّب مرة بـ «اقرا booked وبعدين اعمل update»، ومرة بالـ UPDATE المشروط. عد الحجوزات في الحالتين.`,
          flag: "script",
          deep: {
            why: "الحجز المزدوج مش bug نادر. أول ما يبقى فيه حصة مشهورة وفتح الحجز الساعة ٩، مية واحد بيضغطوا في نفس الثانية. والكود اللي بيقرا وبعدين يكتب بيعدّي أكتر من واحد على آخر مكان.",
            how: R`الـ UPDATE المشروط بيعمل الفحص والزيادة في خطوة واحدة ذرية. القاعدة بتقفل الصف وهي بتعدّله، فالطلب التاني بيستنى، وبعدين يلاقي [[booked < capacity]] مبقتش صح، فيرجع 0 صفوف. ومع [[unique(slotId, userId)]] نفس الشخص ميحجزش مرتين. والاتنين يتعملوا في transaction واحدة، مع insert الحجز نفسه.

والمواعيد بمدد مختلفة (دكتور، أو ملعب ساعة ونص) مشكلتها التداخل، مش العدد. PostgreSQL عنده exclusion constraint: [[EXCLUDE USING gist (resource_id WITH =, during WITH &&)]]، وده محتاج extension اسمه btree_gist. القاعدة نفسها بترفض أي حجزين بيتداخلوا لنفس المكان. وبديله [[SELECT ... FOR UPDATE]] على صف المكان جوه transaction، وبعدين تتأكد من التداخل بنفسك.

الـ hold: الحجز بيبقى HELD لحد ما الدفع يخلص، ومعاه [[expiresAt]]. الـ webhook بيحوّله CONFIRMED، والـ job بيرجّع الأماكن اللي الـ hold بتاعها خلص. وده بالظبط نفس فلو الطلبات في منصة الكورسات.

الوقت: خزّن [[timestamptz]] بـ UTC، واعرض بتوقيت المكان (Africa/Cairo مثلًا)، مش بتوقيت جهاز المستخدم. وخلي بالك إن مصر رجّعت التوقيت الصيفي، فالفرق عن UTC بيتغير خلال السنة. عمره ما تحسبه رقم ثابت.

و [[Idempotency-Key]] من الـ client بيمنع إن الضغطة المزدوجة تعمل حجزين.`,
            when: R`أسئلة المتابعة: «optimistic ولا pessimistic locking؟». «لو القاعدة موزعة على أكتر من سيرفر؟». «overbooking مقصود زي الطيران؟». «فتح الحجز لـ ١٠٠ ألف في نفس الثانية؟» (virtual waiting room و queue).`,
            mistakes: R`إنك تعمل الفحص في الكود ([[if (slot.booked < slot.capacity)]]) وبعدين تكتب. أو lock في ذاكرة Node، وده شغال على نسخة واحدة بس. أو تحسب التوقيت بفرق ساعات ثابت. أو تنسى تفك الـ holds، فالحصة تبان مليانة وهي فاضية.`
          },
          lines: [
            "المتطلبات، ومنها الزحمة وقت الفتح. دي اللي بتحدد التصميم.",
            "الـ API، والحجز معاه مفتاح عشان الضغطة المزدوجة.",
            "الجداول، والـ unique بيمنع نفس الشخص يحجز مرتين.",
            "الفحص والزيادة في خطوة ذرية واحدة. ده قلب الإجابة.",
            "للمواعيد بمدد مختلفة: القاعدة بترفض التداخل بنفسها.",
            "الحجز المدفوع بيتمسك لفترة محددة، وبعدين يتفك لوحده.",
            "المشاكل الحقيقية: التوقيت، والناس اللي مبتجيش، والانتظار، والزحمة."
          ],
          sol: R`بـ «اقرا وبعدين اكتب» العدد مش ثابت، بس دايمًا أكبر من 1. جربناها مرتين: مرة [[31]] حجز ناجح، ومرة [[44]]، على كرسي واحد. والأغرب إن [[booked]] في جدول slots فضل [[1]]: كل الطلبات قرت 0 وكتبت 1 فوق بعض (lost update)، فالعداد نفسه بيكدب. يعني مش بس حجز مزدوج، ده كمان مفيش طريقة تعرف من الجدول إنه حصل.

بالـ UPDATE المشروط: دايمًا [[1]] حجز ناجح و [[49]] رجعوا 0 صفوف، و [[booked = 1]]. القاعدة بتقفل الصف وقت التحديث، فالطلب التاني بيستنى الأول يخلص، وبعدين الشرط [[booked < capacity]] بيتقيّم على القيمة الجديدة.

لو الطريقة الأولى طلعت 1 عندك، غالبًا الـ pool فيه connection واحدة أو الطلبات بتتبعت ورا بعض مش مع بعض. تأكد إنها [[Promise.all]] وإن الـ pool فيه ١٠ connections على الأقل. وخلي بالك إن [[unique(slotId, userId)]] بيمنع نفس اليوزر يحجز مرتين، بس مش بيمنع ٥٠ يوزر مختلفين على كرسي واحد. ده شغل الـ UPDATE المشروط.`,
          solCode: R`import pg from "pg";
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 20 });
await pool.query("DROP TABLE IF EXISTS bookings, slots");
await pool.query("CREATE TABLE slots (id int PRIMARY KEY, capacity int NOT NULL, booked int NOT NULL DEFAULT 0)");
await pool.query("CREATE TABLE bookings (slot_id int REFERENCES slots(id), user_id int, UNIQUE (slot_id, user_id))");

async function naive(userId) {
  const { rows: [s] } = await pool.query("SELECT booked, capacity FROM slots WHERE id = 1");
  if (s.booked >= s.capacity) return false;
  await pool.query("UPDATE slots SET booked = $1 WHERE id = 1", [s.booked + 1]);
  await pool.query("INSERT INTO bookings VALUES (1, $1)", [userId]);
  return true;
}
async function conditional(userId) {
  const c = await pool.connect();
  try {
    await c.query("BEGIN");
    const { rowCount } = await c.query("UPDATE slots SET booked = booked + 1 WHERE id = 1 AND booked < capacity");
    if (rowCount === 0) { await c.query("ROLLBACK"); return false; }
    await c.query("INSERT INTO bookings VALUES (1, $1)", [userId]);
    await c.query("COMMIT");
    return true;
  } catch (e) { await c.query("ROLLBACK"); throw e; } finally { c.release(); }
}
for (const [name, fn] of [["naive", naive], ["conditional", conditional]]) {
  await pool.query("TRUNCATE bookings; DELETE FROM slots; INSERT INTO slots VALUES (1, 1, 0)");
  const ok = (await Promise.all(Array.from({ length: 50 }, (_, i) => fn(i + 1)))).filter(Boolean).length;
  const { rows: [r] } = await pool.query("SELECT (SELECT count(*) FROM bookings) AS bookings, booked FROM slots");
  console.log(name, "ok:", ok, "rows:", r.bookings, "booked:", r.booked);
}
await pool.end();
// naive ok: 31 rows: 31 booked: 1
// conditional ok: 1 rows: 1 booked: 1`
        },
        {
          cmd: "news feed",
          title: "صمّم news feed (زي فيسبوك أو تويتر)",
          desc: R`الـ feed هو «آخر البوستات من الناس اللي بتتابعهم». المشكلة الأساسية: القراية أكتر من الكتابة بكتير، وكل بوست لازم يوصل لآلاف أو ملايين. فيه طريقتين: fan-out on write (أول ما حد ينشر، البوست يتحط في feed كل متابع جاهز)، و fan-out on read (لما حد يفتح، تجمع بوستات اللي بيتابعهم وقتها). والإجابة الصح غالبًا الاتنين مع بعض.`,
          example: R`المتطلبات: نشر بوست، و feed مترتب بالوقت (وبعدين بالأهمية)، و follow. 100 مليون مستخدم يومي، كل واحد يفتح الـ feed 10 مرات، وبينشر 0.5 بوست ≈ 12 ألف قراية و 600 كتابة في الثانية
الـ API: POST /posts و GET /feed?cursor= (cursor pagination) و POST /follows/:userId
الداتا: posts(id, authorId, body, createdAt) و follows(followerId, followeeId) و feed جاهز لكل مستخدم في Redis (sorted set بالوقت، آخر 800 id)
الكتابة (fan-out on write): البوست يتحفظ، وبعدين job يحط الـ id في feed كل متابع
المشاهير: حساب عنده 10 مليون متابع مبيتعملوش fan-out. بيتجاب وقت القراية ويتدمج (hybrid)
القراية: ids من Redis، وبعدين البوستات نفسها من كاش (بالـ id) مع اسم الكاتب وعدد اللايكات
المشاكل: الـ ranking، والبوست المتمسح (يتفلتر وقت القراية)، والمستخدم اللي مفتحش من شهور (متعملوش fan-out)`,
          try: "ارسم الشكل على ورقة، وامشي على «منى نشرت بوست» لحد ما يظهر في feed أحمد. كرر لما منى حسابها فيه ٥ مليون متابع. وبعدين جاوب: أحمد عمل unfollow لمنى، إمتى بوستاتها تختفي من الـ feed بتاعه؟",
          flag: "script",
          deep: {
            why: "الـ feed بيجمع أهم أفكار الـ scale في سؤال واحد: قراية أكتر بكتير من الكتابة، و precomputation ضد on-demand، و hot keys (المشاهير)، وكاش على كذا طبقة، و pagination مظبوطة. وبيتسأل كتير بصيغ تانية: timeline، أو activity feed، أو «آخر النشاطات» في أي SaaS.",
            how: R`fan-out on write: القراية سريعة جدًا (feed جاهز، مجرد قراية من Redis)، بس الكتابة تقيلة: بوست من حساب عنده ١٠٠٠ متابع = ١٠٠٠ كتابة. ولحساب عنده ١٠ مليون، ده مستحيل يخلص في وقت معقول، وأغلبهم مش هيفتحوا أصلًا.

fan-out on read: الكتابة رخيصة (سطر واحد)، بس القراية تقيلة: هات كل اللي بتتابعهم، وهات آخر بوستات كل واحد، ورتّب. مع ٥٠٠ متابَع ده بطيء.

الـ hybrid: الناس العاديين fan-out on write. والمشاهير (أكتر من عدد معين من المتابعين) بيتعلّموا، ومبيتعملهمش fan-out. لما أحمد يفتح الـ feed: خد الـ feed الجاهز، وضيف عليه آخر بوستات المشاهير اللي بيتابعهم (دول قليلين ومتكاشين)، ورتّب. ده اللي تويتر وصفه زمان.

الـ feed في Redis بيشيل ids بس، مش البوست. البوست نفسه في كاش لوحده بالـ id. كده التعديل أو المسح بيتعمل في مكان واحد، والـ feed بيتفلتر وقت القراية (لو البوست ممسوح، اتخطاه).

الـ pagination: cursor (آخر id أو وقت شفته)، مش offset، لأن الـ feed بيتغير وانت بتقلّب (درس «pagination»). والـ ranking: البداية بالوقت، وبعدين score (تفاعل، وقرب، ونوع المحتوى)، وده بيتحسب offline ويتخزن مع الـ id.

والمستخدمين اللي مش نشطين: متعملهمش fan-out. لما يرجعوا، ابنِ الـ feed بتاعهم بـ fan-out on read مرة واحدة.`,
            when: R`أسئلة المتابعة: «اللايكات والتعليقات بتتحدث إزاي؟» (عدادات في Redis وبتتكتب للقاعدة على دفعات). «feed مرتب بالأهمية مش بالوقت؟» (ranking service و features). «realtime؟» (event صغير «فيه جديد» بـ WebSocket والـ client يسحب). «إعلانات في الـ feed؟» (بتتدمج وقت القراية).`,
            mistakes: "fan-out on write للكل بما فيهم المشاهير. أو fan-out on read للكل. أو تخزين البوست كامل في كل feed. أو offset pagination. أو إنك متسألش على نسبة القراية للكتابة، مع إنها اللي بتحدد التصميم كله. أو تنسى إن الـ unfollow والـ block والبوست الممسوح لازم يتفلتروا."
          },
          lines: [
            "المتطلبات والأرقام: القراية ٢٠ ضعف الكتابة. ده اللي بيبرر الـ precomputation.",
            "API صغيرة، والـ feed بـ cursor.",
            "البوستات والمتابعات في القاعدة، والـ feed الجاهز ids بس في Redis.",
            "النشر: احفظ، وبعدين وزّع في الخلفية.",
            "الحسابات الكبيرة مبتتوزعش، بتتجاب وقت القراية.",
            "القراية: ids جاهزة، وبعدين تفاصيل كل بوست من الكاش.",
            "المشاكل: الترتيب، والممسوح، والمستخدمين النايمين."
          ],
          sol: R`«منى نشرت» (حساب عادي): الـ API يحفظ في posts ويرجّع 201 على طول. job في الـ queue يجيب متابعين منى على دفعات، ولكل واحد [[ZADD feed:<userId> <createdAt> <postId>]] و [[ZREMRANGEBYRANK]] عشان يفضل آخر ٨٠٠. أحمد يفتح: [[ZREVRANGE]] يجيب ids، والبوستات من الكاش، والصفحة تظهر.

منى عندها ٥ مليون: مفيش fan-out. أحمد يفتح: الـ feed الجاهز + آخر بوستات الحسابات الكبيرة اللي بيتابعهم (متكاشة، كل حساب قايمة واحدة للكل) ← merge بالوقت ← أول ٢٠.

الـ unfollow: الأبسط إن الـ feed يتفلتر وقت القراية بقايمة المتابعات الحالية (متكاشة)، فالبوستات تختفي فورًا. وفي الخلفية job ينضّف ids منى من feed أحمد. لو قلت «بعد ما الـ feed يتبني من جديد» من غير فلترة، المحاور هيسأل: «والمستخدم شايفها لحد إمتى؟».`
        },
        {
          cmd: "notification system",
          title: "صمّم نظام إشعارات (push و email و SMS و in-app)",
          desc: R`نظام الإشعارات بيستقبل «حصل حدث» من أي خدمة (طلب اتدفع، أو تعليق جديد، أو كورس بيبدأ بكرة)، ويقرر مين يوصله إيه وعلى أنهي قناة، ويبعت من غير ما يزعج ولا يكرر ولا يضيع. القلب هو queue بين «الحدث» و «الإرسال»، وتفضيلات المستخدم، و idempotency.`,
          example: R`المتطلبات: in-app و push و email و SMS، وتفضيلات لكل نوع وقناة، ومواعيد هدوء، ومحدش ياخد نفس الإشعار مرتين. 10 مليون إشعار في اليوم، والذروة 5 أضعاف (حملة أو حدث كبير)
الـ API الداخلي: notify({ userId, type, data, idempotencyKey }) من أي خدمة، و GET /notifications?cursor= و POST /notifications/read
الداتا: notifications(id, userId, type, data, readAt, createdAt) و preferences(userId, type, channel, enabled) و devices(userId, pushToken) و deliveries(notificationId, channel, status, attempts)
التدفق: الحدث ← queue ← worker يقرا التفضيلات والقوالب ← queue لكل قناة ← worker لكل مزوّد (FCM و SES و SMS)
الموثوقية: retry بـ backoff، و dead letter queue، و idempotencyKey unique، ومزوّد احتياطي للـ SMS
الإزعاج: تجميع (digest: «٥ تعليقات جديدة»)، و rate limit لكل مستخدم، و quiet hours بتوقيت المستخدم
المشاكل: push tokens بتنتهي (امسحها لما المزوّد يقول invalid)، والـ unsubscribe في كل إيميل، والإشعار العاجل (OTP) يعدّي الطابور`,
          try: "امشي على «طالب دفع تمن كورس» من الـ webhook لحد ما يوصله إيميل وإشعار in-app، والمدرّب يوصله push. بعدين افترض إن مزوّد الإيميل واقع ساعة: إيه اللي بيحصل للإيميلات؟ والطالب هيشوف إيه؟",
          flag: "script",
          deep: {
            why: "كل منتج فيه إشعارات، وأغلبها بيتبني عشوائي: كل feature بتبعت إيميل بنفسها. والنتيجة إيميلات مكررة، ومحدش عارف يقفل نوع معين، والمزوّد لما يقع الإيميلات تضيع. السؤال بيختبر queues، و retries، و idempotency، والتفكير في المستخدم.",
            how: R`الفصل: الخدمة اللي حصل فيها الحدث بتنادي [[notify]] وخلاص، ومتعرفش أي حاجة عن القنوات. ده بيحط job في queue ويرجع فورًا. كده الـ checkout ميبطأش عشان SES بطيء.

الـ router worker: بيقرا تفضيلات المستخدم (عايز الإيميل ده؟ على أنهي قناة؟)، وبيعمل صف في notifications (ده الـ in-app، بيظهر في الجرس)، وبيحط job لكل قناة مفعّلة في queue لوحدها. كل قناة queue منفصلة، فلو الـ SMS واقع، الإيميل والـ push شغالين.

الـ idempotency: [[idempotencyKey]] (مثلًا [[order-paid:<orderId>]]) عليه unique. الـ webhook ممكن يوصل مرتين، والـ job ممكن يتعاد، والإشعار لازم يتبعت مرة. نفس فكرة «webhook الدفع».

الـ retries: كل مزوّد بيفشل أحيانًا. retry بـ exponential backoff (١٠ ثواني، دقيقة، ٥ دقايق...)، وبعد عدد معين الـ job يروح DLQ ويتسجّل في deliveries بـ failed، وحد يشوفه. لو المزوّد واقع ساعة، الإيميلات بتستنى في الـ queue وتتبعت لما يرجع، و BullMQ بيعمل ده (درس «background jobs»).

الأولوية: OTP أو استعادة باسورد مينفعش يستنى ورا حملة تسويق فيها مليون إيميل. queue منفصلة (أو priority) للعاجل.

الإزعاج: لو حصل ٢٠ تعليق في دقيقة، ابعت «٢٠ تعليق جديد» مش ٢٠ إشعار. ده delay صغير وتجميع بالـ userId والنوع. و quiet hours: الـ push مش العاجل يستنى الصبح بتوقيت المستخدم.

الـ push: كل جهاز ليه token، والـ tokens بتموت (التطبيق اتمسح). لما FCM يرجّع [[UNREGISTERED]] امسح الـ token، وإلا هتفضل تبعت لأجهزة مش موجودة. تفاصيل الـ web push في درس «web push».`,
            when: R`أسئلة المتابعة: «إزاي تضمن الترتيب؟» (غالبًا مش مهم، ولو مهم partition بالـ userId). «تتبع الفتح والضغط؟» (pixel و redirect links، مع الخصوصية). «١٠٠ مليون إشعار في حملة؟» (batch APIs للمزوّد، وتوزيع على ساعات). «realtime في الجرس؟» (WebSocket أو SSE بيبعت event وقت ما صف in-app يتعمل).`,
            mistakes: "إرسال الإيميل جوه الـ request. أو queue واحدة لكل القنوات فقناة واقعة بتوقف الكل. أو من غير idempotency فالطالب ياخد «تم الدفع» ٣ مرات. أو OTP ورا حملة تسويق. أو إيميلات من غير unsubscribe (ضد قوانين كتير، والمزوّد ممكن يقفل حسابك). أو تفضل تبعت لـ push tokens ميتة."
          },
          lines: [
            "المتطلبات: القنوات، والتفضيلات، ومن غير تكرار. والأرقام بالذروة.",
            "دالة داخلية واحدة لأي خدمة، و API للجرس في الواجهة.",
            "الجداول: الإشعار نفسه، والتفضيلات، والأجهزة، وحالة كل إرسال.",
            "الحدث بيعدّي على queues، و worker لكل قناة.",
            "الموثوقية: إعادة، ومكان للفاشل، ومفتاح ضد التكرار، ومزوّد بديل.",
            "احترام المستخدم: تجميع، وحد، ومواعيد هدوء.",
            "المشاكل العملية: tokens ميتة، وإلغاء الاشتراك، والعاجل."
          ],
          sol: R`المسار: webhook الدفع بيحدّث الطلب في transaction، وبعدها [[notify({ userId: student, type: "order.paid", idempotencyKey: "order-paid:" + orderId })]] و [[notify({ userId: instructor, type: "course.sold", ... })]]. الـ router يلاقي تفضيلات الطالب: email + in-app، فيعمل صف notifications (يظهر في الجرس فورًا) و job في queue الإيميل. والمدرّب: push، فـ job في queue الـ push، والـ worker يجيب tokens أجهزته ويبعت لـ FCM.

المزوّد واقع ساعة: jobs الإيميل تفشل وتتعاد بـ backoff، وتفضل في الـ queue. الطالب شايف الإشعار في الجرس (in-app مش معتمد على المزوّد)، والكورس مفتوح (التفعيل مش مستني الإيميل). ولما المزوّد يرجع، الإيميلات تتبعت. ولو المحاولات خلصت قبل ما يرجع، الـ jobs في DLQ وتعيدها بإيدك أو تحوّل لمزوّد تاني.

لو قلت «الإيميل هيضيع» أو «الدفع هيفشل»، يبقى الإيميل لسه جوه الـ request.`
        },
        {
          cmd: "file storage",
          title: "صمّم خدمة تخزين ملفات (زي Google Drive أو Dropbox)",
          desc: R`خدمة تخزين الملفات فيها حاجتين منفصلين تمامًا: الـ metadata (اسم الملف، وفولدره، وصاحبه، والصلاحيات، والنسخ) في قاعدة عادية، والـ bytes نفسها في object storage (S3 أو R2). والملفات الكبيرة بتترفع أجزاء (chunks) مباشرة من المتصفح لـ S3 بـ signed URLs، والسيرفر مبيشيلش أي bytes.`,
          example: R`المتطلبات: رفع وتنزيل ملفات لحد 10 جيجا، وفولدرات، ومشاركة بصلاحيات، ونسخ قديمة، ومزامنة بين الأجهزة. 50 مليون مستخدم، و 10 جيجا في المتوسط ≈ 500 بيتابايت
الـ API: POST /files/uploads (يرجّع uploadId و URLs للأجزاء) و POST /files/uploads/:id/complete و GET /files/:id/download (يرجّع signed URL) و GET /changes?cursor=
الداتا: files(id, ownerId, parentId, name, currentVersionId) و versions(id, fileId, size, sha256, storageKey, createdAt) و shares(fileId, userId, role)
الرفع: S3 multipart upload، كل جزء 8 ميجا بـ presigned URL، والمتصفح بيرفع الأجزاء بالتوازي ويعيد الفاشل بس
الـ dedup: نفس الـ sha256 = نفس الـ object في S3، والـ version بتشاور عليه (ويتحذف بعد آخر مرجع)
التنزيل: signed URL قصير، أو CDN مع signed cookies للملفات المشهورة، و Range requests للاستكمال
المشاكل: الصلاحيات الموروثة من الفولدر، والمزامنة والتعارض (نسختين اتعدلوا أوفلاين)، وفحص الفيروسات، و multipart uploads متعلّقة تتمسح`,
          try: R`ارجع لدرس «signed upload URL» في التاب ده. كبّره لـ multipart: اكتب الـ endpoints التلاتة (create و sign part و complete) بـ [[@aws-sdk/client-s3]] ([[CreateMultipartUploadCommand]] و [[UploadPartCommand]] مع [[getSignedUrl]] و [[CompleteMultipartUploadCommand]]). بعدين جاوب: المتصفح رفع ٧ أجزاء من ١٠ والنت قطع، إزاي يكمّل من غير ما يبدأ من الأول؟`,
          flag: "script",
          deep: {
            why: "السؤال بيختبر إنك فاصل بين الـ metadata والـ blobs، وإنك مش بتعدّي ملفات ضخمة على سيرفرات التطبيق، وإنك فاهم الرفع المتقطع والمزامنة. ونفس الأفكار في أي منتج فيه رفع (فيديوهات الكورسات، ومستندات العملاء).",
            how: R`الـ metadata والـ bytes: القاعدة فيها جدول files بشجرة ([[parentId]])، وكل تعديل بيعمل version جديدة. الـ bytes في S3 بمفتاح ملوش معنى (hash أو uuid)، مش اسم الملف، عشان إعادة التسمية والنقل يبقوا تعديل صف في القاعدة بس، من غير ما تنقل bytes.

multipart upload: S3 بيسمح بلحد ١٠٠٠٠ جزء، وكل جزء (ما عدا الأخير) ٥ ميجا على الأقل. السيرفر بيبدأ الـ upload ويدّي المتصفح presigned URL لكل جزء. المتصفح بيرفع ٤ أجزاء مع بعض، وبيحفظ الـ ETag بتاع كل جزء. ولو النت قطع، [[ListParts]] بيقول إيه اللي وصل، فيكمّل الباقي بس. وفي الآخر complete بالـ ETags، و S3 بيجمّعهم ملف واحد. وlifecycle rule بتمسح الـ uploads اللي متكملتش بعد يوم أو أسبوع، وإلا هتدفع تمن أجزاء محدش شايفها.

الـ dedup: sha256 للملف (أو لكل chunk في الأنظمة الأكبر). لو الـ hash موجود، مفيش رفع أصلًا (Dropbox بيعمل كده على مستوى الـ blocks). بيوفّر تخزين كتير. بس خلي بالك من الخصوصية: dedup بين مستخدمين مختلفين ممكن يكشف إن «الملف ده موجود عند حد».

المزامنة: كل تغيير بيتسجّل في journal بـ رقم متزايد. الجهاز بيسأل [[GET /changes?cursor=]] («إيه اللي اتغير من آخر مرة؟») أو بياخد push إن فيه جديد. التعارض: لو نسختين اتعدلوا أوفلاين من نفس الـ version، متعملش overwrite: احفظ الاتنين («file (conflicted copy)»)، وده اللي Dropbox بيعمله.

الصلاحيات: موروثة من الفولدر. فحص الصلاحية بيطلع لفوق في الشجرة (مع كاش)، أو بتتخزن منسوخة على كل ملف وتتحدث لما الفولدر يتغير. والتنزيل دايمًا signed URL قصير بعد فحص الصلاحية، مش bucket public.

الأرقام: ٥٠٠ بيتابايت يعني التكلفة هي كل حاجة. نقل الملفات القديمة لـ storage class أرخص (S3 Glacier أو Infrequent Access)، وتكلفة الـ egress (التنزيل) كبيرة، ودي ليه R2 (من غير egress) بيتذكر.`,
            when: R`أسئلة المتابعة: «مشاركة بلينك عام؟» (token في الـ URL، وصلاحية قراية، وانتهاء). «معاينة PDF والصور؟» (job بيعمل thumbnails بعد الرفع). «حد أقصى للمساحة؟» (مجموع الـ sizes لكل مستخدم، بيتحدث في نفس transaction الـ version). «البحث جوه الملفات؟» (استخراج النص وindex منفصل).`,
            mistakes: "الملفات بتعدّي على سيرفر التطبيق. أو اسم الملف هو مفتاح S3، فإعادة التسمية بقت نسخ. أو رفع الملف الكبير كطلب واحد، فلو قطع عند ٩٥٪ يبدأ من الأول. أو bucket public. أو overwrite وقت التعارض. أو multipart uploads متعلّقة من غير lifecycle rule."
          },
          lines: [
            "المتطلبات والحجم. نص مليار جيجا يعني التكلفة والتخزين هما القرار.",
            "API: بداية رفع، وإنهاء، وتنزيل، وتغييرات للمزامنة.",
            "الشجرة والنسخ والمشاركة في القاعدة، والـ bytes مجرد مفتاح.",
            "الرفع أجزاء مباشرة لـ S3 بالتوازي، والفاشل بس بيتعاد.",
            "نفس المحتوى يتخزن مرة واحدة.",
            "التنزيل من S3 أو CDN مباشرة، ويقدر يكمّل من نص الملف.",
            "المشاكل: الصلاحيات، والتعارض، والأمان، والتنضيف."
          ],
          sol: R`الـ endpoints: (١) [[POST /files/uploads]] يعمل [[CreateMultipartUploadCommand]] ويخزن [[uploadId]] و key في جدول uploads بحالة pending، ويرجّع uploadId وعدد الأجزاء. (٢) [[GET /files/uploads/:id/parts/:n]] يعمل [[getSignedUrl(s3, new UploadPartCommand({ Bucket, Key, UploadId, PartNumber: n }), { expiresIn: 3600 })]] بعد ما يتأكد إن الـ upload بتاع المستخدم ده. (٣) [[POST /files/uploads/:id/complete]] بياخد قايمة فيها [[{ PartNumber, ETag }]] لكل جزء ويعمل [[CompleteMultipartUploadCommand]]، وبعدها يعمل version و file في transaction.

الـ ETag بيرجع في header الرد بتاع كل PUT، والمتصفح محتاج الـ bucket CORS يحط [[ETag]] في [[ExposeHeaders]]، وإلا مش هيقدر يقراه. دي أشهر مشكلة.

الاستكمال: المتصفح بيحفظ uploadId والـ ETags في IndexedDB. لما يرجع، يسأل السيرفر، والسيرفر يعمل [[ListPartsCommand]] ويرجّع أرقام الأجزاء اللي وصلت، فيرفع ٨ و ٩ و ١٠ بس.`
        },
        {
          cmd: "rate limiter service",
          title: "صمّم rate limiter كخدمة لكل الـ APIs",
          desc: R`الـ rate limiter بيحدد كل عميل (IP، أو user، أو API key) يقدر يعمل كام طلب في وقت معين، ويرد 429 لو عدّى. لما يبقى عندك سيرفرات كتير، العداد لازم يبقى في مكان مشترك (Redis)، والفحص لازم يبقى ذري وسريع جدًا لأنه قدام كل طلب.

الخوارزميات المشهورة: fixed window (عداد لكل دقيقة)، و sliding window، و token bucket (سطل بيتملى بمعدل ثابت وكل طلب بياخد token). الـ token bucket بيسمح بـ burst قصير ومتوسط ثابت، وده اللي أغلب الـ APIs الكبيرة بتستخدمه.`,
          example: R`المتطلبات: حدود لكل API key حسب الخطة (free 10/ث، pro 100/ث)، وحدود لكل IP على الـ login، وكل السيرفرات بتشوف نفس العداد، وإضافة أقل من 1ms للطلب
المكان: middleware في الـ gateway أو في كل نسخة، والعدادات في Redis (cluster لو الحجم كبير)
الخوارزمية: token bucket لكل key: tokens و lastRefill في hash، وسكربت Lua واحد يحسب ويخصم في خطوة ذرية
الرد: 429 مع Retry-After، و headers زي RateLimit-Limit و RateLimit-Remaining و RateLimit-Reset
القواعد: جدول rules(plan, route, capacity, refillPerSec) متكاش في الذاكرة، وبيتحدث من غير deploy
لو Redis وقع: fail open للـ API العادي (عدّي الطلبات، وسجّل)، و fail closed للـ login والـ OTP
المشاكل: hot keys (عميل واحد بيضرب جامد)، ودقة الساعات بين السيرفرات (استخدم وقت Redis)، والـ multi-region (حد لكل region أو sync متأخر)`,
          try: R`اكتب token bucket في Redis بسكربت Lua ([[redis.defineCommand]] في ioredis): capacity 10 و refill 5 في الثانية. ابعت ١٢ طلب ورا بعض واطبع النتيجة، واستنى ثانية وابعت طلب كمان. بعدين جاوب: ليه Lua ومش [[GET]] وبعدين [[SET]] من Node؟`,
          flag: "script",
          deep: {
            why: "الـ rate limiting بيحمي من الـ abuse، والتخمين، والـ scraping، وعميل واحد بكود فيه loop يوقّع الكل. وبيدّيك طريقة تبيع بيها خطط (الـ pro بياخد حدود أعلى). والسؤال بيختبر الخوارزميات، والذرية في نظام موزّع، والـ trade-off بين الدقة والسرعة والتوافر.",
            how: R`fixed window: [[INCR key:minute]] مع TTL. أبسط حاجة، بس عنده مشكلة الحافة: ١٠٠ طلب في آخر ثانية من دقيقة و ١٠٠ في أول ثانية من اللي بعدها = ٢٠٠ في ثانيتين والحد ١٠٠ في الدقيقة.

sliding window log: timestamp لكل طلب في sorted set، وتعد اللي في آخر ٦٠ ثانية. دقيق، بس بياكل ذاكرة (صف لكل طلب). و sliding window counter: عداد الدقيقة الحالية + عداد اللي قبلها مضروب في النسبة الباقية. تقريب ممتاز ورخيص (Cloudflare بتستخدمه).

token bucket: السطل فيه لحد capacity، وبيتملى بـ refill في الثانية. كل طلب بياخد واحد. مفيش؟ 429. بيسمح بـ burst لحد الـ capacity، وبعدين بمتوسط الـ refill. ومش محتاج timer: وقت الطلب بتحسب اتملى قد إيه من آخر مرة ([[(now - ts) * rate]]).

الذرية: لو كل سيرفر عمل GET وبعدين حسب وبعدين SET، طلبين في نفس اللحظة من سيرفرين هيقروا نفس القيمة والاتنين يعدّوا. سكربت Lua بيتنفذ في Redis كخطوة واحدة، محدش يتدخل في النص. وكمان بيوفّر round trips (واحدة بدل ٣).

الوقت: لو كل سيرفر بيبعت وقته، والساعات مختلفة شوية، الحسابات تتلخبط. الأدق [[redis.call("TIME")]] جوه السكربت.

لو Redis وقع: قرار منتج. الـ API العادي: fail open (عدّي من غير حد، وتنبيه)، لأن وقوع الـ API كله أسوأ من إن الحد يتعدّى دقايق. الـ login والـ OTP: fail closed، أو حد في الذاكرة لكل نسخة كاحتياطي.

الـ headers: [[Retry-After]] بالثواني بيقول للعميل يستنى قد إيه. و [[RateLimit-*]] (draft في IETF، ومكتبات زي express-rate-limit بتدعمه) بيخلي العملاء المحترمين يبطّأوا قبل ما يخبطوا الحد.

الحجم: ١٠٠ ألف طلب في الثانية = ١٠٠ ألف سكربت Lua في الثانية. Redis واحد بيستحمل ده غالبًا، وأكتر من كده Redis Cluster بالـ key (كل عميل على shard). وبديل للحجم الضخم: عداد محلي في كل نسخة بيتزامن مع Redis كل ثانية، وده أقل دقة وأسرع بكتير.`,
            when: R`أسئلة المتابعة: «حد لكل endpoint مختلف؟» (القواعد بـ route). «عميل عنده ١٠٠ سيرفر وكلهم بنفس الـ key؟» (نفس الـ bucket، ده المطلوب). «حد يومي مع حد في الثانية؟» (bucketين، والطلب لازم يعدّي الاتنين). «multi-region؟» (حد لكل region = الحد الكلي / عدد الـ regions، أو تزامن متأخر ومقبول).`,
            mistakes: "عداد في ذاكرة كل نسخة (الحد الحقيقي بقى الحد × عدد النسخ). أو GET ثم SET من غير ذرية. أو fixed window ونسيان مشكلة الحافة. أو 429 من غير Retry-After فالعملاء يعيدوا فورًا ويزودوا الضغط. أو الحد بالـ IP بس لـ API بمفاتيح (شركة كاملة ورا IP واحد). أو fail closed على الـ API كله فوقوع Redis وقّع كل حاجة."
          },
          lines: [
            "المتطلبات: حدود بالخطة، ومشتركة بين السيرفرات، وسريعة جدًا.",
            "الفحص قدام الطلب، والعدادات في مكان واحد مشترك.",
            "token bucket في Redis، والحساب والخصم خطوة واحدة.",
            "الرد اللي بيقول للعميل يستنى قد إيه.",
            "القواعد في جدول، فتتغير من غير deploy.",
            "قرار واضح لو Redis وقع، ومختلف حسب خطورة الـ endpoint.",
            "المشاكل في الأحجام الكبيرة."
          ],
          sol: R`النتيجة في تجربة فعلية: الـ ١٢ طلب ورا بعض طلّعوا [[111111111100]]، يعني أول ١٠ عدّوا (الـ capacity) وآخر ٢ اترفضوا. وبعد ثانية: الطلب عدّى، وفاضل ٤ tokens (السطل اتملى ٥ في الثانية، وخدنا واحد).

ليه Lua: الـ GET والـ SET من Node خطوتين، وبينهم طلب تاني من سيرفر تاني ممكن يقرا نفس القيمة، فالاتنين يعدّوا على نفس الـ token. السكربت بيتنفذ في Redis كوحدة واحدة، ومحدش يقدر يدخل في النص. وكمان رحلة واحدة للشبكة بدل اتنين.

الغلطة الشائعة: تنسى [[PEXPIRE]] فكل key اتعمل مرة بيعيش للأبد في Redis.`,
          solCode: R`redis.defineCommand("takeToken", { numberOfKeys: 1, lua: $__bt
local cap = tonumber(ARGV[1]); local rate = tonumber(ARGV[2]); local now = tonumber(ARGV[3])
local b = redis.call("HMGET", KEYS[1], "tokens", "ts")
local tokens = tonumber(b[1]) or cap; local ts = tonumber(b[2]) or now
tokens = math.min(cap, tokens + (now - ts) / 1000 * rate)
local ok = 0
if tokens >= 1 then tokens = tokens - 1; ok = 1 end
redis.call("HSET", KEYS[1], "tokens", tokens, "ts", now)
redis.call("PEXPIRE", KEYS[1], math.ceil(cap / rate * 1000))
return { ok, math.floor(tokens) }$__bt });

export async function allow(key, capacity, perSec) {
  const [ok, left] = await redis.takeToken($__btrl:$__{key}$__bt, capacity, perSec, Date.now());
  return { ok: ok === 1, left };
}`
        }
      ]
    }
]);
