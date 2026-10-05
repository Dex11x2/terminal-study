// تكملة تاب cloud: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cloud/01.js (شرح حقول الدرس في أوله)
MORE("cloud", [
    {
      t: "OpenTelemetry والـ tracing",
      l: 3,
      n: "الطلب ده بطيء ليه؟ trace بيوريك رحلة الطلب خطوة خطوة بين الـ API والقاعدة والخدمات التانية، و OpenTelemetry الطريقة المحايدة اللي كل الأدوات بتفهمها",
      items: [
        {
          cmd: "trace و span",
          title: "trace و span و context propagation: رحلة طلب واحد",
          desc: R`الـ trace هو رحلة طلب واحد من أوله لآخره، ومكوّن من spans: كل span خطوة ليها اسم وبداية ومدة (استقبال الطلب، query على القاعدة، طلب لخدمة تانية)، وكل span ليه parent غير أول واحد. فبتشوف شجرة زي «الطلب ١٢٠٠ مللي، منهم ٩٥٠ في query واحدة».

عشان الـ trace يكمل بين خدمتين، لازم الـ trace id يتنقل معاه. ده اسمه context propagation، والمعيار W3C Trace Context: header اسمه [[traceparent]] شكله [[00-TRACE_ID-PARENT_SPAN_ID-01]]. الخدمة الأولى بتحطه في الطلب الطالع، والتانية بتقراه وتكمّل نفس الـ trace.

المثال ده خدمتين في ملف واحد (A بتكلّم B)، ولما يتشغّل بـ OpenTelemetry (الدرس الجاي) هتلاقي الاتنين بنفس الـ trace id، من غير ما تكتب سطر واحد يبعت الـ header.`,
          example: R`import http from "node:http";
import { trace } from "@opentelemetry/api";

const b = http.createServer((req, res) => {
  console.log("B got traceparent:", req.headers.traceparent);
  console.log("B active traceId:  ", trace.getActiveSpan()?.spanContext().traceId);
  res.end("ok");
});
b.listen(4000);

const a = http.createServer(async (req, res) => {
  console.log("A active traceId:  ", trace.getActiveSpan()?.spanContext().traceId);
  const r = await fetch("http://localhost:4000/stock");
  res.end(await r.text());
});
a.listen(3000, async () => {
  await fetch("http://localhost:3000/checkout");
  a.close(); b.close();
});`,
          try: R`احفظه [[two.mjs]] في فولدر فيه [[@opentelemetry/api]] وشغّله بـ [[node two.mjs]] عادي: هتشوف إيه؟ بعدين شغّله بملف [[instrumentation.mjs]] من الدرس الجاي: [[node --import ./instrumentation.mjs two.mjs]]، وقارن. وبعدين ابعت انت الـ header بإيدك: [[curl -H "traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01" localhost:3000]] (عدّل السكربت ميقفلش نفسه) وشوف الـ trace id اللي A طبعه.`,
          flag: "script",
          deep: {
            why: "اللوجات بتقولك إيه اللي حصل، والـ metrics بتقولك إن p95 عالي، بس محدش منهم بيقولك «الطلب ده بالذات بطيء عشان إيه». مع API و worker وخدمة دفع خارجية وقاعدة، الـ trace هو اللي بيوريك الوقت راح فين بالظبط، وده سؤال بيتسأل في أي incident.",
            how: R`الـ span فيه: [[traceId]] (١٦ byte، واحد لكل الرحلة)، و [[spanId]] (٨ bytes)، و [[parentSpanId]]، والاسم، والبداية والمدة، و [[kind]] (SERVER للطلب الداخل، CLIENT للطلب الطالع، INTERNAL لخطوة جوه الكود)، و attributes (زي [[http.route]] و [[db.system]])، و events (زي exception)، و status (OK أو ERROR).

الـ context propagation جوه الخدمة: OpenTelemetry بيحفظ الـ span الحالي في AsyncLocalStorage (درس [[AsyncLocalStorage]] في «تاب Backend بـ Node»)، فأي span جديد في نفس الطلب، حتى بعد await، بيعرف الـ parent بتاعه لوحده. عشان كده [[trace.getActiveSpan()]] بيشتغل في أي حتة.

وبين الخدمات: الـ instrumentation بتاع HTTP client (هنا [[fetch]]) بيعمل span من نوع CLIENT ويحط [[traceparent]] في الـ headers، والـ instrumentation بتاع HTTP server في B بيقراه ويعمل span جديد parent بتاعه هو الـ CLIENT span. نفس الفكرة بتتعمل يدويًا مع queues: تحط الـ context في الـ job data وتطلعه في الـ worker.

الـ [[traceparent]]: [[00]] الإصدار، وبعدين الـ trace id، وبعدين id الـ span الأب، وآخر حاجة flags ([[01]] = sampled، يعني الـ trace ده بيتسجّل). وفيه [[tracestate]] اختياري لبيانات خاصة بالـ vendor.

sampling: مش لازم تسجّل كل trace. الأشهر: head sampling (تقرر في أول الطلب، مثلًا ١٠٪)، والقرار بيتنقل مع الـ flags فكل الخدمات تسجّل نفس الـ traces. و tail sampling (في الـ collector، بعد ما الـ trace يخلص: خلي كل اللي فيه error أو أبطأ من ثانية).`,
            when: "أول ما يبقى عندك أكتر من خدمة، أو API بيكلّم APIs خارجية وقاعدة و cache، أو سؤال «ليه ده بطيء» مبيتجاوبش من اللوجات.",
            mistakes: R`تفتكر إن الـ trace id هو الـ request id: ممكن يبقوا نفس الحاجة، بس الـ trace بيعدّي على كل الخدمات والـ request id غالبًا محلي (الدرس الجاي بيربطهم). وتعمل propagation بـ header مخترع ([[x-trace]]) فمفيش أداة تفهمه. وتنسى الـ propagation في الـ queues فالـ worker يبدأ trace جديد مقطوع. وفي الانترفيو: «إيه الفرق بين logs و metrics و traces؟» اللوج حدث واحد بالتفصيل، والـ metric رقم متجمّع على وقت، والـ trace رحلة طلب واحد بين المكونات.`
          },
          lines: [
            "سيرفر HTTP من Node.",
            "الـ API بتاع OpenTelemetry (بيرجّع no-op لو مفيش SDK).",
            "خدمة B.",
            "اطبع الـ header اللي وصل من A.",
            "اطبع الـ trace id اللي B شغالة فيه.",
            "رد.",
            "قفلة.",
            "B على ٤٠٠٠.",
            "خدمة A.",
            "اطبع الـ trace id بتاع الطلب في A.",
            "A بتكلّم B بـ fetch (هنا الـ header بيتحط لوحده).",
            "رجّع رد B.",
            "قفلة.",
            "A على ٣٠٠٠، ولما تشتغل:",
            "ابعت طلب واحد لـ A.",
            "واقفل الاتنين عشان السكربت يخلص.",
            "قفلة."
          ],
          sol: R`بـ [[node two.mjs]] من غير SDK: التلات سطور [[undefined]]، لأن [[@opentelemetry/api]] من غيره بيرجّع no-op، ومحدش بيحط [[traceparent]].

بـ [[instrumentation.mjs]] (فيه الـ loader hook، الدرس الجاي) الناتج زي:

[[A active traceId:   2fa1034af6bbe4fb4302073471963f88]]
[[B got traceparent: 00-2fa1034af6bbe4fb4302073471963f88-3f5366a1e5111f2d-01]]
[[B active traceId:   2fa1034af6bbe4fb4302073471963f88]]

(ومعاهم الـ spans نفسها مطبوعة كـ objects من الـ console exporter.) نفس الـ trace id في A و B، والجزء الأوسط في الـ header هو الـ span الـ CLIENT اللي fetch عمله في A.

ولو بعت الـ header بإيدك بالـ curl، A هيطبع [[4bf92f3577b34da6a3ce929d0e0e4736]]: كمّل الـ trace اللي جاي من برا بدل ما يبدأ واحد جديد، وده بالظبط اللي بيحصل لما gateway أو frontend بيبدأ الـ trace.

الغلطة الشائعة: A بيطبع [[undefined]] و B بيطبع traceparent سليم. ده معناه إن fetch اتعمله instrument بس سيرفر [[node:http]] لأ، لأن الملف ESM وشغّلته من غير الـ loader hook (الدرس الجاي).`
        },
        {
          cmd: "OpenTelemetry في Node",
          title: "auto-instrumentation في Node من غير ما تلمس الكود",
          desc: R`OpenTelemetry (OTel) معيار مفتوح ومحايد: بتعمل instrument للكود مرة واحدة، وتبعت الـ traces لأي backend (Jaeger أو Grafana Tempo أو Honeycomb أو Datadog أو Sentry) من غير ما تغيّر الكود.

في Node: ملف [[instrumentation.mjs]] بيشغّل [[NodeSDK]] مع [[getNodeAutoInstrumentations()]]، وده بيعمل patch لـ http و express و pg و redis و fetch وغيرهم، فكل طلب وكل query يطلع span لوحده. والملف لازم يتحمّل قبل أي حاجة تانية: [[node --import ./instrumentation.mjs server.mjs]].

هنا بنطبع الـ spans على الشاشة بـ [[ConsoleSpanExporter]] عشان تشوفها. وفي الإنتاج بتشيله وتبعت بـ OTLP (درس [[OTLP و backend]]).`,
          example: R`import { register } from "node:module";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";

register("@opentelemetry/instrumentation/hook.mjs", import.meta.url);

const sdk = new NodeSDK({
  resource: resourceFromAttributes({ [ATTR_SERVICE_NAME]: "orders-api" }),
  spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
  instrumentations: [getNodeAutoInstrumentations({ "@opentelemetry/instrumentation-fs": { enabled: false } })],
});
sdk.start();
process.on("SIGTERM", () => sdk.shutdown().finally(() => process.exit(0)));`,
          try: R`في فولدر تجربة: [[npm i express @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/sdk-trace-node @opentelemetry/auto-instrumentations-node @opentelemetry/resources @opentelemetry/semantic-conventions]]. احفظ الملف ده [[instrumentation.mjs]]، واعمل [[app.mjs]] فيه Express بـ route [[/orders/:id]]. شغّل [[node --import ./instrumentation.mjs app.mjs]] وابعت [[curl localhost:3000/orders/7]]. كام span طلعوا؟ وإيه اسم الـ span اللي [[parentSpanContext]] بتاعه [[undefined]]؟`,
          flag: "script",
          deep: {
            why: "إنك تكتب span بإيدك لكل route وكل query مستحيل ومحدش هيحافظ عليه. الـ auto-instrumentation بيدّيك ٨٠٪ من القيمة من أول يوم: كل طلب HTTP وكل query وكل طلب خارجي بمدته. ولأنه معيار، لو غيّرت الـ backend من Jaeger لـ Honeycomb بتغيّر متغير بيئة بس.",
            how: R`[[NodeSDK]] بيجمع ٣ حاجات: resource (مين أنا: [[service.name]] وهو أهم attribute، ومن غيره الخدمة بتظهر [[unknown_service:node]])، و span processor + exporter (الـ spans تروح فين)، و instrumentations (إيه اللي يتعمله patch).

الـ instrumentation بيشتغل عن طريق إنه يلف الموديول لما يتحمّل. عشان كده الملف لازم يتحمّل قبل [[express]] و [[pg]]: لو عملت import لـ express الأول، هو اتحمّل من غير patch. ده سبب [[--import]] بدل ما تعمل import من جوه [[server.mjs]].

ESM: الـ patch القديم بيشتغل مع [[require]] بس. لو كودك [[import]] (ملفات [[.mjs]] أو [[type: module]])، لازم loader hook. السطر [[register("@opentelemetry/instrumentation/hook.mjs", ...)]] بيسجّله من جوه الملف، وده زي إنك تكتب [[--experimental-loader=@opentelemetry/instrumentation/hook.mjs]] في أمر التشغيل. من غيره هتلاقي حاجات اتعملها instrument (زي fetch وحاجات بتتحمّل بـ require من جوه مكتبات) وحاجات لأ (زي [[node:http]] اللي انت عامله import مباشرة).

[[SimpleSpanProcessor]] بيبعت كل span أول ما يخلص، ده كويس للتجربة. في الإنتاج [[BatchSpanProcessor]] (الافتراضي لو استخدمت [[traceExporter]]) بيجمّع ويبعت دفعات، أخف بكتير.

[[instrumentation-fs]] بيطلّع span لكل قراية ملف، ودي ضوضاء، فأغلب الناس بتقفله. وفيه طريقة من غير ملف خالص: [[node --import @opentelemetry/auto-instrumentations-node/register app.js]] والإعدادات كلها من متغيرات البيئة ([[OTEL_SERVICE_NAME]] وغيره).

[[sdk.shutdown()]] مع SIGTERM بيبعت الـ spans اللي لسه في الـ buffer قبل ما الـ process يموت، وإلا آخر ثواني قبل كل deploy تضيع.`,
            when: "أي API في الإنتاج بيكلّم قاعدة أو خدمات تانية. ابدأ بالـ auto-instrumentation، وضيف custom spans بس في الأماكن اللي محتاج تفهمها أكتر.",
            mistakes: R`تعمل [[import "./instrumentation.mjs"]] في أول [[server.mjs]] بدل [[--import]]: في ESM الـ imports بتتحمّل قبل ما أي كود يشتغل، فممكن express يتحمّل قبل الـ patch. وتنسى الـ loader hook مع ESM وتستغرب إن نص الـ spans ناقصة. ومن غير [[service.name]]. و [[ConsoleSpanExporter]] في الإنتاج (اللوجات هتتملي). وتسيب [[instrumentation-fs]] شغال.`
          },
          lines: [
            "register عشان نسجّل loader hook لموديولات ESM.",
            "الـ SDK اللي بيربط كل حاجة.",
            "exporter بيطبع على الشاشة، و processor بيبعت كل span أول ما يخلص.",
            "كل الـ instrumentations الجاهزة (http و express و pg و redis و fetch...).",
            "عشان نعرّف الخدمة.",
            "اسم الـ attribute القياسي service.name.",
            "من غير الـ hook ده، الموديولات اللي بتعملها import مش هتتعمل instrument.",
            "الإعدادات.",
            "اسم الخدمة (أهم attribute).",
            "الـ spans تتطبع على الشاشة فورًا.",
            "كل الـ instrumentations ماعدا fs (ضوضاء).",
            "قفلة.",
            "ابدأ (قبل ما أي كود تاني يتحمّل).",
            "مع الإيقاف: ابعت اللي فاضل وبعدين اقفل."
          ],
          sol: R`مع [[curl localhost:3000/orders/7]] هتلاقي كذا object مطبوعين، كلهم بنفس الـ [[traceId]]:

- span اسمه [[GET /orders/:id]] من [[@opentelemetry/instrumentation-http]]، و [[kind: 1]] (SERVER)، و [[parentSpanContext: undefined]]، يعني هو الـ root. وفيه attributes زي [[http.request.method]] و [[url.path]] و [[http.response.status_code: 200]].
- spans من [[instrumentation-express]] و [[instrumentation-router]] زي [[request handler - /orders/:id]]، وكمان span للـ middleware اللي Express بيحطه من جوه، والـ parent بتاعهم هو الـ span اللي فوقه.

وكلهم فيهم [[service.name: 'orders-api']] في الـ resource. والترتيب على الشاشة بيبقى من الأصغر للأكبر، لأن كل span بيتطبع لما يخلص، والـ root بيخلص آخر واحد.

الغلطة الشائعة: الـ root span اسمه [[GET]] بس من غير الـ route، ومفيش spans لـ express خالص. ده معناه إن express مكنش عليه instrument، غالبًا عشان الـ hook مش متسجّل أو الملف اتحمّل بعد express. ولو مفيش ولا span، يبقى نسيت [[--import]] أصلًا.`,
          solCode: R`// app.mjs
import express from "express";
const app = express();
app.get("/orders/:id", (req, res) => res.json({ id: req.params.id, total: 250 }));
app.listen(3000, () => console.log("listening on 3000"));

// التشغيل:
// node --import ./instrumentation.mjs app.mjs
// curl localhost:3000/orders/7`
        },
        {
          cmd: "custom span",
          title: "span بإيدك حوالين query أو API خارجي",
          desc: R`الـ auto-instrumentation بيشوف الـ HTTP والـ driver بتاع القاعدة، بس مش بيعرف إن «حساب الشحن» أو «تجهيز الفاتورة» خطوة ليها معنى. هنا بتعمل span بإيدك: [[tracer.startActiveSpan(name, fn)]] بيعمل span ويخليه الـ active جوه [[fn]]، فأي span يطلع جوه (query مثلًا) بيبقى ابنه.

القاعدة: [[span.end()]] في [[finally]] دايمًا، ولو حصل خطأ [[span.recordException(err)]] و [[setStatus]] بـ ERROR، عشان الـ backend يلوّن الـ span بالأحمر وتقدر تفلتر عليه.`,
          example: R`import express from "express";
import { trace, SpanStatusCode } from "@opentelemetry/api";

const tracer = trace.getTracer("orders-api");
const app = express();

async function findOrder(id) {
  return tracer.startActiveSpan("db.findOrder", async (span) => {
    span.setAttribute("order.id", id);
    try {
      await new Promise((r) => setTimeout(r, 40));
      if (id === "0") throw new Error("order not found");
      return { id, total: 250 };
    } catch (err) {
      span.recordException(err);
      span.setStatus({ code: SpanStatusCode.ERROR, message: err.message });
      throw err;
    } finally {
      span.end();
    }
  });
}

app.get("/orders/:id", async (req, res) => {
  const traceId = trace.getActiveSpan()?.spanContext().traceId;
  try {
    res.json(await findOrder(req.params.id));
  } catch {
    res.status(404).json({ error: "not found", traceId });
  }
});
app.listen(3000);`,
          try: R`شغّل ده بـ [[instrumentation.mjs]] من الدرس اللي فات، وابعت [[curl localhost:3000/orders/7]] و [[curl localhost:3000/orders/0]]. دوّر في الناتج على [[db.findOrder]] في الحالتين: قارن [[status]] و [[events]] و [[duration]] و [[parentSpanContext]]. وبعدين ضيف span تاني اسمه [[shipping.quote]] حوالين [[fetch]] لأي API خارجي (زي [[https://httpbin.org/delay/1]]) وشوف إن الـ fetch نفسه طلع span ابن ليه.`,
          flag: "script",
          deep: {
            why: "الـ auto-instrumentation هيقولك إن الطلب أخد ٢ ثانية وإن فيه ٤٠ query. الـ custom span هو اللي بيقولك إن الـ ٤٠ دول كلهم جوه «حساب الخصومات»، وإن الخطوة دي بالذات هي اللي بطيئة للطلبات اللي فيها كوبون. وده الفرق بين trace بيوريك أرقام و trace بيوريك قصة.",
            how: R`[[trace.getTracer("orders-api")]] بيجيب tracer باسم (بيظهر كـ [[instrumentationScope]]). ولو مفيش SDK شغال، الـ tracer بيبقى no-op والكود يشتغل عادي من غير أي تكلفة تقريبًا. فالمكتبات بتعتمد على [[@opentelemetry/api]] بس، والتطبيق هو اللي بيقرر يشغّل الـ SDK.

[[startActiveSpan(name, fn)]] بيعمل span ابن للـ span الحالي، ويخليه active جوه [[fn]]، ويرجّع اللي [[fn]] رجّعته (هنا Promise). فيه كمان [[startSpan]] من غير ما يبقى active، وده بتستخدمه لو مش عايز spans تانية تتعلق تحته.

attributes: خليها أسماء ثابتة وقيم مفيدة للبحث ([[order.id]] و [[coupon.code]] و [[items.count]]). ولأسماء معروفة استخدم semantic conventions ([[db.system]] و [[http.request.method]]) عشان الأدوات تفهمها.

[[recordException]] بيضيف event اسمه [[exception]] فيه النوع والرسالة والـ stack. و [[setStatus(ERROR)]] حاجة تانية: هو اللي بيعلّم الـ span إنه فشل. محتاج الاتنين.

[[span.end()]] لازم في [[finally]]: span مبيخلصش عمره ما بيتبعت، والـ trace يبان ناقص. ولو الـ span بيلف حاجة بترجع Promise، الـ end يبقى بعد الـ await، مش قبله.

الـ trace id في رد الخطأ: اليوزر أو الـ support يبعتلك الرقم، وتلاقي الـ trace كله في ثانية.`,
            when: "حوالي أي خطوة بيزنس مهمة (checkout، حساب، توليد PDF)، وأي API خارجي أو queue مالهوش instrumentation جاهز، وأي حاجة بتشك إنها بطيئة.",
            mistakes: R`تنسى [[span.end()]] في مسار الخطأ فالـ span ميتبعتش. و [[recordException]] من غير [[setStatus]] فالـ span يبان ناجح. و span لكل iteration في loop فيها ١٠ آلاف عنصر. و attributes فيها إيميلات أو توكنات أو الـ body كله (الـ traces بتتخزن عند طرف تالت غالبًا). وأسماء spans ديناميكية ([[db.findOrder.8812]]) بدل اسم ثابت و attribute.`
          },
          lines: [
            "Express.",
            "الـ API: جيب tracer، و SpanStatusCode للأخطاء.",
            "tracer باسم الخدمة.",
            "التطبيق.",
            "دالة القاعدة (هنا مجرد تأخير يمثّل query).",
            "span جديد اسمه db.findOrder، و active جوه الدالة.",
            "attribute عشان تقدر تدوّر بالـ id.",
            "حاول:",
            "مكان الـ query الحقيقية (٤٠ مللي).",
            "id صفر = مش موجود.",
            "رجّع الطلب.",
            "لو فشل:",
            "سجّل الـ exception كـ event جوه الـ span.",
            "وعلّم الـ span إنه ERROR.",
            "ورجّع الخطأ لفوق.",
            "في كل الحالات:",
            "اقفل الـ span (من غيرها مش هيتبعت).",
            "قفلة.",
            "قفلة startActiveSpan.",
            "قفلة الدالة.",
            "الـ route.",
            "الـ trace id بتاع الطلب ده.",
            "حاول:",
            "رجّع الطلب.",
            "لو فشل:",
            "404 ومعاه الـ trace id عشان الـ support يدوّر بيه.",
            "قفلة.",
            "قفلة الـ route.",
            "شغّل."
          ],
          sol: R`لـ [[/orders/7]]: span اسمه [[db.findOrder]]، فيه [[attributes: { 'order.id': '7' }]] و [[status: { code: 0 }]] و [[events: []]] و [[duration]] حوالي [[40000]] (بالمايكروثانية، يعني ٤٠ مللي). و [[parentSpanContext]] بتاعه بيشاور على span الـ express [[request handler - /orders/:id]]، يعني اتعلق تحت الطلب لوحده.

لـ [[/orders/0]]: الرد [[{"error":"not found","traceId":"..."}]]، و [[db.findOrder]] فيه [[status: { code: 2, message: 'order not found' }]] (2 = ERROR)، و [[events]] فيه event اسمه [[exception]] ومعاه [[exception.type: 'Error']] و [[exception.message]] و [[exception.stacktrace]]. والـ [[traceId]] اللي في الرد هو نفسه اللي في الـ spans.

ولما تضيف [[shipping.quote]] حوالين fetch، هتلاقي span [[GET]] من نوع CLIENT (kind 2) من [[instrumentation-undici]] والـ parent بتاعه [[shipping.quote]]، ومدته حوالي ثانية.

الغلطة الشائعة: [[db.findOrder]] ظاهر كـ root لوحده ([[parentSpanContext: undefined]]) بـ trace id مختلف عن الطلب. ده معناه إن الـ context ضاع، غالبًا لأنك استخدمت [[startSpan]] بدل [[startActiveSpan]] في مكان، أو عملت الـ span برا الطلب.`,
          solCode: R`async function shippingQuote(city) {
  return tracer.startActiveSpan("shipping.quote", async (span) => {
    span.setAttribute("shipping.city", city);
    try {
      const r = await fetch("https://httpbin.org/delay/1");
      span.setAttribute("http.response.status_code", r.status);
      return 50;
    } catch (err) {
      span.recordException(err);
      span.setStatus({ code: SpanStatusCode.ERROR, message: err.message });
      throw err;
    } finally {
      span.end();
    }
  });
}`
        },
        {
          cmd: "trace id في اللوج",
          title: "trace id جنب request id في كل سطر لوج",
          desc: R`اللوج بيقولك إيه اللي حصل، والـ trace بيقولك الوقت راح فين. لما يبقى في كل سطر لوج [[trace_id]]، تقدر من سطر خطأ تفتح الـ trace بتاعه، ومن span بطيء تجيب اللوجات بتاعته.

مع pino: الـ auto-instrumentation فيه [[instrumentation-pino]] بيحط [[trace_id]] و [[span_id]] و [[trace_flags]] في كل سطر لوحده. والـ request id بتاعك (من [[x-request-id]] أو UUID) بتحطه بـ [[logger.child]] زي ما هو، وترجّعه في الـ response header. الاتنين مع بعض: الـ request id اللي العميل شايفه، والـ trace id اللي أدوات الـ tracing بتفهمه.`,
          example: R`import express from "express";
import pino from "pino";
import { randomUUID } from "node:crypto";

const logger = pino();
const app = express();

app.use((req, res, next) => {
  req.id = req.get("x-request-id") ?? randomUUID();
  res.set("x-request-id", req.id);
  req.log = logger.child({ requestId: req.id });
  next();
});

app.get("/orders/:id", (req, res) => {
  req.log.info({ orderId: req.params.id }, "loading order");
  res.json({ ok: true });
});

const server = app.listen(3000, async () => {
  await fetch("http://localhost:3000/orders/7", { headers: { "x-request-id": "req-abc-123" } });
  server.close();
});`,
          try: R`سطّب [[pino]] جنب باقي الحاجات، وشغّل الملف مرتين: [[node logs.mjs]] من غير OpenTelemetry، و [[node --import ./instrumentation.mjs logs.mjs]] معاه (غيّر الـ exporter لواحد ساكت أو سيب الـ console). قارن سطر [[loading order]] في الحالتين. وبعدين ضيف middleware بيحط الـ trace id في header اسمه [[x-trace-id]] في الرد.`,
          flag: "script",
          deep: {
            why: "في incident، اليوزر بيبعتلك screenshot فيها request id أو وقت. من غير ربط، بتدوّر في اللوجات بالوقت، وبعدين تحاول تلاقي الـ trace بالوقت برضه، وممكن تلاقي ١٠٠ طلب في نفس الثانية. مع [[trace_id]] في اللوج، Grafana (Loki مع Tempo) أو Datadog أو Honeycomb بيدّوك زرار من سطر اللوج للـ trace على طول.",
            how: R`الـ request id: درس [[AsyncLocalStorage]] في «تاب Backend بـ Node» بيشرح إزاي يوصل لكل سطر لوج من غير ما تعدّيه لكل دالة، وهنا بنستخدم أبسط طريقة: [[req.log]] child logger. وخد الـ [[x-request-id]] لو جاي من برا (من Nginx أو load balancer أو frontend) عشان تربط لحد أول نقطة.

الـ trace id: [[instrumentation-pino]] بيلف pino ويضيف الحقول دي من الـ span الـ active مع كل سطر. ولو مش بتستخدم pino أو عايز تتحكم بنفسك:
[[pino({ mixin() { const s = trace.getActiveSpan(); return s ? { trace_id: s.spanContext().traceId } : {}; } })]].

الأسماء: الـ instrumentation بيكتب [[trace_id]] و [[span_id]] (بـ underscore)، ودي الأسماء اللي أغلب الأدوات بتدوّر عليها.

ممكن تخلي الـ request id هو الـ trace id نفسه (ترجّع الـ trace id في [[x-request-id]])، فيبقى رقم واحد. بس لو فيه gateway قبلك بيعمل request id بصيغته، سيب الاتنين جنب بعض.

و OpenTelemetry عنده logs signal كمان: تبعت اللوجات نفسها بـ OTLP لنفس الـ backend، وهي مربوطة بالـ trace لوحدها. بس JSON على stdout مع trace_id لسه أبسط وشغال مع أي حاجة.`,
            when: "من أول يوم تشغّل فيه tracing. التكلفة سطر، والفايدة إن كل لوج بقى لينك للـ trace.",
            mistakes: R`تعمل request id جديد في كل خدمة فمش بتقدر تربط. وتثق في [[x-request-id]] من برا من غير حد لطوله أو شكله (ممكن حد يحط فيه نص طويل أو سطر جديد يلخبط اللوج). وتلوج برا الطلب ([[setInterval]] أو worker) وتتوقع trace_id: مفيش span active هناك، فلازم تعمل span للـ job. وفي الانترفيو: «إزاي تتبع طلب واحد بين ٣ خدمات؟» الإجابة: context propagation بـ traceparent، و trace_id في كل لوج، وأداة tracing.`
          },
          lines: [
            "Express.",
            "pino: logger بيطبع JSON.",
            "لتوليد request id.",
            "logger واحد للتطبيق.",
            "التطبيق.",
            "middleware على كل طلب.",
            "خد الـ request id من برا لو موجود، أو اعمل واحد.",
            "رجّعه في الرد عشان العميل يقدر يبعتهولك.",
            "child logger فيه الـ request id في كل سطر.",
            "كمّل.",
            "قفلة.",
            "route.",
            "سطر لوج (هنا الـ instrumentation بيضيف trace_id).",
            "رد.",
            "قفلة.",
            "شغّل، ولما يشتغل:",
            "ابعت طلب واحد بـ request id معروف.",
            "واقفل.",
            "قفلة."
          ],
          sol: R`من غير OpenTelemetry:

[[{"level":30,...,"requestId":"req-abc-123","orderId":"7","msg":"loading order"}]]

ومعاه:

[[{"level":30,...,"requestId":"req-abc-123","trace_id":"c0292ceda7cb1194ca407f5b679ae214","span_id":"e81daa6cf4e50c9f","trace_flags":"01","orderId":"7","msg":"loading order"}]]

نفس السطر، بس زاد عليه [[trace_id]] و [[span_id]] و [[trace_flags]] من غير ما تغيّر ولا سطر في الكود. والـ [[trace_id]] ده نفسه اللي هتلاقيه في الـ spans.

للـ header: middleware بعد الـ instrumentation يكتب [[res.set("x-trace-id", trace.getActiveSpan()?.spanContext().traceId)]]، و [[curl -i]] يوريك الاتنين: [[x-request-id: req-abc-123]] و [[x-trace-id: ...]].

الغلطة الشائعة: مفيش [[trace_id]] في السطر حتى مع [[--import]]. ده غالبًا لأن pino اتحمّل قبل الـ instrumentation، أو [[instrumentation-pino]] مقفول، أو اللوج بيتكتب برا أي span.`,
          solCode: R`import { trace } from "@opentelemetry/api";

app.use((req, res, next) => {
  const traceId = trace.getActiveSpan()?.spanContext().traceId;
  if (traceId) res.set("x-trace-id", traceId);
  next();
});`
        },
        {
          cmd: "OTLP و backend",
          title: "ابعت الـ traces لـ Jaeger أو Tempo أو Honeycomb بـ OTLP",
          desc: R`OTLP هو البروتوكول بتاع OpenTelemetry لبعت الـ traces والـ metrics واللوجات، على HTTP بورت 4318 ([[/v1/traces]]) أو gRPC بورت 4317. وأي backend حديث بيستقبله: Jaeger (open source للتجربة والإنتاج الصغير)، و Grafana Tempo (مع Grafana، و Grafana Cloud فيه خطة مجانية)، و Honeycomb، و Datadog، و Sentry.

الحلو إن الإعدادات كلها متغيرات بيئة، فالكود هو هو والـ backend يتغير: [[OTEL_SERVICE_NAME]] و [[OTEL_EXPORTER_OTLP_ENDPOINT]] و [[OTEL_EXPORTER_OTLP_HEADERS]] (للمفاتيح). وفي الإنتاج غالبًا بتبعت لـ OpenTelemetry Collector جنب التطبيق، وهو يبعت للـ backend.`,
          example: R`docker run -d --name jaeger -p 16686:16686 -p 4318:4318 jaegertracing/jaeger:latest
export OTEL_SERVICE_NAME=orders-api
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
export OTEL_METRICS_EXPORTER=none
export OTEL_TRACES_SAMPLER=parentbased_traceidratio OTEL_TRACES_SAMPLER_ARG=0.2
node --import ./instrumentation.prod.mjs two.mjs
curl -s localhost:16686/api/v3/services
# Honeycomb بدل Jaeger: نفس الكود، متغيرين بس
export OTEL_EXPORTER_OTLP_ENDPOINT=https://api.honeycomb.io
export OTEL_EXPORTER_OTLP_HEADERS="x-honeycomb-team=YOUR_API_KEY"`,
          try: R`اعمل [[instrumentation.prod.mjs]]: نسخة من [[instrumentation.mjs]] من غير [[spanProcessors]] ولا الـ console exporter (فالـ SDK يقرا الـ exporter من البيئة ويستخدم OTLP)، وضيف سطر [[beforeExit]] (الملف كامل في الحل). شغّل Jaeger بـ Docker، ونفّذ [[two.mjs]] من أول درس بالمتغيرات دي من غير سطر الـ sampler. افتح [[http://localhost:16686]]، واختار [[orders-api]]، وافتح آخر trace: كام span؟ ومين جوه مين؟ بعدين رجّع الـ sampler بـ [[0.2]] وشغّل ١٠ مرات: كام trace ظهر؟`,
          deep: {
            why: "الـ console exporter للتعلم بس. القيمة الحقيقية في شاشة بتوريك الـ traces كـ waterfall، وتدوّر فيها بـ «كل الطلبات على /checkout اللي أبطأ من ثانية امبارح». ولأن OTLP معيار، مش مربوط بـ vendor: تبدأ بـ Jaeger ببلاش على جهازك أو VPS، وتنقل لـ Grafana Cloud أو Honeycomb بتغيير متغيرين.",
            how: R`لما [[NodeSDK]] ميبقاش معاه [[traceExporter]] ولا [[spanProcessors]]، بيقرا [[OTEL_TRACES_EXPORTER]] (الافتراضي [[otlp]]) و [[OTEL_EXPORTER_OTLP_ENDPOINT]] ويبعت على [[ENDPOINT/v1/traces]] بـ [[BatchSpanProcessor]]. وفي النسخ الحالية بيبعت metrics كمان على [[/v1/metrics]] لو مقفلتهاش بـ [[OTEL_METRICS_EXPORTER=none]]، فلو الـ backend بتاعك traces بس، اقفلها عشان متبعتش ترافيك على الفاضي.

الـ batch بيتبعت كل كام ثانية. سيرفر شغال على طول مش فارق معاه، بس script بيخلص في ثانية (زي [[two.mjs]]) هيقفل قبل ما يبعت، عشان كده [[beforeExit]] بيعمل [[shutdown()]] (وده بيبعت اللي في الـ buffer). والـ [[catch]] مهمة: من غيرها، لو الـ backend مش شغال، الـ shutdown بيرمي خطأ والـ process يقع بـ unhandled rejection.

الـ protocol: [[OTEL_EXPORTER_OTLP_PROTOCOL]] ممكن [[http/protobuf]] (الافتراضي في Node) أو [[http/json]] أو [[grpc]] (على 4317 ومحتاج exporter تاني).

الـ backends: Jaeger v2 image واحد فيه الاستقبال والتخزين في الرام والـ UI على 16686، ممتاز للتجربة وللـ dev (وللإنتاج بتوصله بـ storage). Grafana Tempo بيخزّن traces رخيص على object storage، وبيتعرض في Grafana جنب Prometheus و Loki، وفيه image اسمه [[grafana/otel-lgtm]] فيه الكل للتجربة. Honeycomb و Datadog خدمات مدفوعة (مع خطط مجانية محدودة) وبتاخد OTLP مباشرة بمفتاح في header.

الـ Collector: برنامج منفصل (container) بيستقبل OTLP من كل خدماتك، ويعمل batch و retry، ويشيل بيانات حساسة، ويعمل tail sampling، ويبعت لـ backend واحد أو أكتر. التطبيق يبعت لـ [[http://otel-collector:4318]] بس، والمفاتيح في الـ collector مش في كل خدمة.

الـ sampling: [[parentbased_traceidratio]] بـ [[0.2]] معناها: لو الطلب جاي بـ traceparent، اتبع قرار الأب (عشان الـ trace ميتقطعش)، ولو إنت الأول، سجّل ٢٠٪ بس. وده مهم لما الترافيك يكبر، لأن الـ backends بتحاسب بعدد الـ spans.`,
            when: "Jaeger على جهازك أو في docker compose بتاع الـ dev من أول ما تضيف OTel. وفي الإنتاج: Grafana (Tempo) لو عندك Prometheus و Grafana أصلًا، أو SaaS لو مش عايز تدير storage.",
            mistakes: R`[[OTEL_EXPORTER_OTLP_ENDPOINT]] فيه [[/v1/traces]] في الآخر، فالـ SDK يضيفها تاني ويبعت لـ [[/v1/traces/v1/traces]] (لو عايز مسار كامل استخدم [[OTEL_EXPORTER_OTLP_TRACES_ENDPOINT]]). وتبعت لبورت 4317 (gRPC) بـ exporter HTTP. ومفتاح Honeycomb في الكود أو في الـ frontend. و sampling ١٠٠٪ على ترافيك كبير والفاتورة تنفجر. وتنسى [[sdk.shutdown()]] فالـ batch الأخير يضيع مع كل restart.`
          },
          lines: [
            "Jaeger v2: الـ UI على 16686، واستقبال OTLP HTTP على 4318.",
            "اسم الخدمة.",
            "ابعت الـ traces هنا (الـ SDK بيضيف /v1/traces).",
            "متبعتش metrics (Jaeger بياخد traces بس).",
            "سجّل ٢٠٪ من الـ traces الجديدة، واتبع قرار الأب لو جاي من خدمة تانية.",
            "شغّل بملف الإنتاج (مفيهوش exporter في الكود، فبياخده من البيئة).",
            "اتأكد إن Jaeger شاف الخدمة.",
            "نفس الكلام لـ Honeycomb: الـ endpoint بتاعهم...",
            "...والمفتاح في header."
          ],
          sol: R`بعد التشغيل، [[curl -s localhost:16686/api/v3/services]] يرجّع حاجة زي [[{"services":["orders-api","jaeger"]}]]. (لو رجّع فاضي على طول بعد التشغيل، استنى ثانيتين: الـ batch بيتبعت كل شوية.)

في الـ UI، الـ trace بتاع [[two.mjs]] فيه ٤ spans بنفس الـ trace id، كلهم اسمهم [[GET]]: الـ fetch الأولاني (CLIENT، الـ root، مثلًا ٢٨ مللي)، وتحته A (SERVER)، وتحته الـ fetch من A لـ B (CLIENT)، وتحته B (SERVER، أقصر واحد). الـ waterfall بيوريك إن كل span جوه اللي فوقه.

مع الـ sampler بـ 0.2 و ١٠ تشغيلات: هتلاقي حوالي ٢ traces (ممكن ١ أو ٤، هي احتمالات). وكل trace ظهر ظهر كامل بالـ ٤ spans، لأن الخدمات اللي بعد الأول بتتبع قراره.

الغلطات الشائعة: الخدمة اسمها [[unknown_service:node]] (نسيت [[OTEL_SERVICE_NAME]] أو الـ resource). أو السكربت اشتغل ومفيش ولا trace في Jaeger، وده لأن الـ process قفل قبل ما الـ batch يتبعت (ناقصك [[beforeExit]]). أو السطر [[otel: connect ECONNREFUSED 127.0.0.1:4318]]، يعني Jaeger مش شغال أو البورت غلط.`,
          solCode: R`// instrumentation.prod.mjs: مفيش exporter في الكود، كله من متغيرات البيئة
import { register } from "node:module";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

register("@opentelemetry/instrumentation/hook.mjs", import.meta.url);
const sdk = new NodeSDK({
  instrumentations: [getNodeAutoInstrumentations({ "@opentelemetry/instrumentation-fs": { enabled: false } })],
});
sdk.start();
process.on("SIGTERM", () => sdk.shutdown().finally(() => process.exit(0)));
process.once("beforeExit", () => sdk.shutdown().catch((err) => console.error("otel:", err.message)));`
        },
        {
          cmd: "instrumentation.ts",
          title: "OpenTelemetry في Next.js: instrumentation.ts",
          desc: R`Next.js عنده ملف خاص اسمه [[instrumentation.ts]] في جذر المشروع (أو جوه [[src/]] لو بتستخدمه)، فيه دالة [[register()]] بتتنادى مرة واحدة لما السيرفر يقوم قبل أي طلب. ده مكان OpenTelemetry (و Sentry وغيرهم).

أسهل طريقة [[@vercel/otel]]: [[registerOTel("next-app")]] وخلاص، وبيشتغل على Node و Edge. ولو محتاج تحكم كامل، [[NodeSDK]] زي الدروس اللي فاتت، بس في ملف منفصل بيتحمّل لما [[NEXT_RUNTIME]] يبقى [[nodejs]] بس، لأن NodeSDK مش بيشتغل على Edge.

Next.js نفسه بيطلّع spans جاهزة (الـ route، والـ render، و fetch في Server Components)، ولو عايز تفاصيل أكتر شغّل بـ [[NEXT_OTEL_VERBOSE=1]].`,
          example: R`// instrumentation.ts (في جذر المشروع)
import { registerOTel } from "@vercel/otel";
export function register() {
  registerOTel({ serviceName: "shop-web" });
}
// أو تحكم كامل: instrumentation.ts بيحمّل ملف Node بس
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./instrumentation.node");
  }
}
// instrumentation.node.ts
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
const sdk = new NodeSDK({
  resource: resourceFromAttributes({ [ATTR_SERVICE_NAME]: "shop-web" }),
  traceExporter: new OTLPTraceExporter(),
});
sdk.start();`,
          try: R`في مشروع Next.js: [[npm i @vercel/otel @opentelemetry/api]] واعمل [[instrumentation.ts]] بالطريقة الأولى. شغّل Jaeger (الدرس اللي فات)، وبعدين [[OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 npm run build && npm start]]. افتح صفحة Server Component بتعمل [[fetch]] لـ API خارجي، ودوّر على الـ trace في Jaeger. وبعدين ضيف custom span حوالين حاجة في Server Action.`,
          flag: "script",
          deep: {
            why: "في Next.js الوقت ممكن يروح في حاجات مش باينة: fetch في Server Component، أو render تقيل، أو middleware، أو query في Route Handler. الـ traces بتوريك كل ده في waterfall واحد، ومع propagation لـ API الباك إند (لو Express عليه OTel) الـ trace بيكمل من Next لحد القاعدة.",
            how: R`[[register]] بتتنادى مرة في كل runtime: مرة في Node، ومرة في Edge لو عندك حاجة على Edge (زي middleware في نسخ كتير). عشان كده [[process.env.NEXT_RUNTIME]] بيفرّق. والـ dynamic import جوه الشرط بيضمن إن كود NodeSDK مبيدخلش bundle بتاع Edge أصلًا.

[[@vercel/otel]]: wrapper بيعمل الـ SDK والـ exporter (بيقرا [[OTEL_EXPORTER_OTLP_ENDPOINT]] زي أي SDK)، وبيدعم Edge، وعلى Vercel بيبعت للـ integrations بتاعة Vercel. مناسب لأغلب الحالات.

الـ spans اللي Next بيطلّعها لوحده: span للطلب ([[GET /products/[id]]])، وللـ render، ولكل [[fetch]] في السيرفر، و [[generateMetadata]]. و [[NEXT_OTEL_VERBOSE=1]] بيطلّع أكتر. والـ custom spans بنفس [[trace.getTracer("shop-web").startActiveSpan]] من الدرس اللي فات، في أي Server Component أو Server Action أو Route Handler.

الـ propagation: الـ fetch من السيرفر بيحط [[traceparent]] لوحده، فلو الـ API بتاعك عليه OTel، الـ trace بيكمل. ومن المتصفح للسيرفر ده موضوع تاني (browser instrumentation) ومش بيحصل لوحده.

الملف مكانه جذر المشروع جنب [[app/]]، أو جوه [[src/]] لو المشروع بيستخدم [[src/]]. في نسخ Next القديمة (١٣ و ١٤) كان محتاج [[experimental.instrumentationHook]] في [[next.config]]، وفي النسخ الحالية مش محتاج.

الاختبار الصح يبقى بـ [[next build]] و [[next start]]، لأن [[next dev]] بيطلّع spans زيادة للـ compile وأرقام مش شبه الإنتاج.`,
            when: "أي Next.js فيه Server Components بتجيب داتا، أو Route Handlers، أو بيكلّم API باك إند منفصل وعايز trace واحد من أول الطلب لحد القاعدة.",
            mistakes: R`تعمل import لـ NodeSDK في أول [[instrumentation.ts]] من غير شرط [[NEXT_RUNTIME]] فالـ build يقع بأخطاء modules مش موجودة في Edge. وتحط الملف جوه [[app/]] فمبيتقراش. وتفتكر إن الـ spans هتيجي من المتصفح لوحدها. وتقيس بـ [[next dev]]. وتحط مفتاح الـ backend في متغير [[NEXT_PUBLIC_]].`
          },
          lines: [
            "wrapper جاهز من Vercel.",
            "دالة بتتنادى مرة لما السيرفر يقوم.",
            "سجّل OTel باسم الخدمة (بيشتغل على Node و Edge).",
            "قفلة.",
            "البديل: نفس الدالة بس بتحمّل ملف Node...",
            "...لو الـ runtime هو Node بس.",
            "dynamic import عشان الكود ميدخلش bundle الـ Edge.",
            "قفلة الشرط.",
            "قفلة.",
            "الـ SDK.",
            "exporter بـ OTLP HTTP (بيقرا الـ endpoint من البيئة).",
            "الـ resource.",
            "اسم الـ attribute القياسي.",
            "SDK جديد.",
            "اسم الخدمة.",
            "ابعت بـ OTLP (مع batch).",
            "قفلة.",
            "ابدأ."
          ],
          sol: R`بعد [[npm start]] وفتح الصفحة، في Jaeger هتلاقي خدمة [[shop-web]]، و trace root اسمه زي [[GET /products/[id]]] (بالـ route مش الـ URL الحقيقي)، وتحته spans زي [[render route (app) /products/[id]]] و [[fetch GET https://api.example.com/...]] بمدة الـ fetch. الأسماء بالظبط ممكن تختلف شوية حسب نسخة Next.

ولو الـ API اللي بتعمله fetch عليه OTel وبيبعت لنفس Jaeger، هتلاقي spans بتاعته في نفس الـ trace تحت الـ fetch span.

الـ custom span في Server Action يظهر باسمه (مثلًا [[checkout.createOrder]]) تحت span الطلب اللي فيه الـ action.

الغلطات الشائعة: مفيش خدمة في Jaeger خالص، وده غالبًا عشان الملف مش في المكان الصح (جوه [[app/]] بدل جذر المشروع أو [[src/]])، أو المتغير [[OTEL_EXPORTER_OTLP_ENDPOINT]] مش واصل لـ [[npm start]]. أو الـ build بيقع بـ [[Module not found: Can't resolve 'fs']]، ودي NodeSDK اتعملها import من غير شرط [[NEXT_RUNTIME]].`,
          solCode: R`// app/checkout/actions.ts
"use server";
import { trace, SpanStatusCode } from "@opentelemetry/api";

const tracer = trace.getTracer("shop-web");

export async function createOrder(formData: FormData) {
  return tracer.startActiveSpan("checkout.createOrder", async (span) => {
    try {
      span.setAttribute("cart.items", Number(formData.get("items") ?? 0));
      const res = await fetch(process.env.API_URL + "/orders", { method: "POST", body: formData });
      span.setAttribute("http.response.status_code", res.status);
      return await res.json();
    } catch (err) {
      span.recordException(err as Error);
      span.setStatus({ code: SpanStatusCode.ERROR });
      throw err;
    } finally {
      span.end();
    }
  });
}`
        }
      ]
    },
    {
      t: "التكلفة والاعتمادية",
      l: 3,
      n: "فاتورة مفهومة، وموارد مش منسية، وخطة لما حاجة كبيرة تقع",
      items: [
        {
          cmd: "cost optimization",
          title: "الفاتورة كبيرة: تبدأ منين",
          desc: R`ابدأ بسؤال «الفلوس رايحة فين؟» (Cost Explorer مقسّم بالخدمة)، وبعدين بالترتيب: امسح اللي مش مستخدم، وصغّر اللي أكبر من احتياجه، واستخدم Graviton، واقفل بيئات التطوير بالليل، وبعدها Savings Plans للي شغال دايمًا و Spot للشغل اللي يستحمل يتقطع.

وخد بالك من نقل البيانات للنت (egress): أول ١٠٠ جيجا في الشهر ببلاش على مستوى الحساب، وبعدها حوالي ٠.٠٩ دولار للجيجا، وده ممكن يبقى أغلى من السيرفرات نفسها.`,
          example: R`aws ce get-cost-and-usage --time-period Start=2026-09-01,End=2026-09-29 --granularity MONTHLY --metrics UnblendedCost --group-by Type=DIMENSION,Key=SERVICE
aws compute-optimizer get-ec2-instance-recommendations --query "instanceRecommendations[].[instanceArn,finding,recommendationOptions[0].instanceType]" --output table
aws ec2 describe-spot-price-history --instance-types t4g.small --product-descriptions "Linux/UNIX" --max-items 3
aws ec2 create-vpc-endpoint --vpc-id vpc-0abc1234 --service-name com.amazonaws.eu-central-1.s3 --route-table-ids rtb-0abc1234`,
          try: "افتح Cost Explorer وقسّم آخر ٣ شهور بالخدمة وبعدين بالـ usage type. دوّر على بنود فيها [[DataTransfer-Out]] و [[NatGateway]] و [[PublicIPv4]]، واكتب لكل بند: ليه موجود، وممكن يقل إزاي.",
          deep: {
            why: "فواتير الـ cloud بتكبر بهدوء: سيرفر أكبر من اللازم من يوم التجربة، ولوجات من غير retention، و NAT Gateway بيعدّي عليه كل الترافيك لـ S3. كل واحد لوحده صغير، ومع بعض نص الفاتورة.",
            how: R`right-sizing: Compute Optimizer (محتاج تفعّله) بيبص على استخدام الـ CPU والرام لأسابيع ويقولك «أكبر من اللازم، جرّب t4g.small». و Graviton ([[t4g]] و [[m7g]]) أرخص بحوالي ٢٠٪ لنفس الأداء، ومعظم تطبيقات Node و Python بتشتغل عليه من غير تعديل (بس ابني image لـ arm64).

الالتزام: Savings Plans بتلتزم فيها بمبلغ في الساعة لسنة أو ٣، وبتاخد خصم كبير (لحد ٧٢٪) على EC2 و Fargate و Lambda. ومتلتزمش غير على الحد الأدنى اللي متأكد إنه شغال دايمًا.

Spot: سيرفرات AWS الفاضية بخصم لحد ٩٠٪، بس ممكن تتسحب بإنذار دقيقتين. مناسبة لـ workers و CI و batch، ومش لقاعدة بيانات.

الشبكة: الداخل ببلاش والخارج للنت بفلوس، وبين الـ AZs بسنت للجيجا في كل اتجاه، و NAT Gateway بياخد على الساعة وعلى كل جيجا بتعدّي. الـ VPC endpoint لـ S3 (نوع gateway، في آخر سطر) ببلاش، وبيخلّي الترافيك من private subnets لـ S3 ميعدّيش على الـ NAT. و CloudFront قدام S3 بيقلل الـ egress لأن النقل من S3 لـ CloudFront ببلاش.

وحط tags ([[project]] و [[env]]) على كل حاجة وفعّلها كـ cost allocation tags، فتعرف كل مشروع بيكلّف كام. والـ Cost Explorer API نفسه بسنت لكل طلب، فمتحطوش في cron كل دقيقة.`,
            when: "مراجعة شهرية للفاتورة، وقبل أي التزام سنوي، وأول ما بند يزيد فجأة.",
            mistakes: "تشتري Savings Plan لـ ٣ سنين على سيرفرات هتقفلها بعد شهرين. وتحط الـ API في private subnet وكل رفعة لـ S3 تعدّي على NAT. وتصغّر الـ instance على الـ CPU بس وتنسى الرام فالتطبيق يقع OOM. وتقارن سعر السيرفر وتنسى الـ egress."
          },
          lines: [
            "التكلفة الشهر ده مقسومة على الخدمات (كل طلب للـ API ده بسنت).",
            "Compute Optimizer: السيرفرات اللي أكبر من احتياجها والنوع المقترح.",
            "آخر أسعار Spot لنوع معين.",
            "طريق مباشر ببلاش من الـ VPC لـ S3، من غير NAT."
          ],
          sol: R`الجدول اللي هتطلع بيه شكله كده (الأرقام مثال):

[[EUC1-NatGateway-Hours]] و [[NatGateway-Bytes]]: موجود لأن الـ private subnets بتطلع للإنترنت من خلاله (ونازل لـ ECR و S3 كمان). يقل بـ VPC endpoint لـ S3 (ببلاش، gateway endpoint) و ECR، أو NAT واحد بدل واحد لكل AZ في dev، أو تمسحه لو مفيش private subnets فعلًا.
[[PublicIPv4:InUseAddress]] و [[IdleAddress]]: كل IP عام حوالي ٣.٦ دولار في الشهر. يقل بإنك تمسح Elastic IPs مش مربوطة، وتحط السيرفرات ورا load balancer واحد بدل IP لكل واحد.
[[DataTransfer-Out-Bytes]]: ترافيك طالع للإنترنت، غالبًا صور وملفات. يقل بـ CloudFront قدام S3 (الخروج من CloudFront أرخص وليه شريحة مجانية) وضغط الصور.

الغلطة الشائعة: تبص على الخدمة بس فتلاقي «EC2-Other» كبير ومش فاهم هو إيه؛ ده بالظبط ليه تقسّم بالـ usage type: جواه NAT و EBS و IPs. وخلي بالك إن أوامر [[aws ce]] نفسها بتتحاسب (حوالي سنت لكل طلب)، فمتحطهاش في loop كل دقيقة.`,
          solCode: R`aws ce get-cost-and-usage --time-period Start=2026-07-01,End=2026-10-01 --granularity MONTHLY --metrics UnblendedCost --group-by Type=DIMENSION,Key=USAGE_TYPE --query "ResultsByTime[].Groups[].[Keys[0],Metrics.UnblendedCost.Amount]" --output text | sort -k2 -g -r | head -20`
        },
        {
          cmd: "امسح اللي مش مستخدم",
          title: "موارد منسية بتتحاسب كل ساعة",
          desc: R`بعد أي تجربة، الحاجات دي بتفضل تتحاسب لو ممسحتهاش: السيرفرات (حتى الواقفة: الديسك والـ IP)، والـ volumes اللي مش متوصلة، والـ Elastic IPs، والـ snapshots، و NAT Gateways، و load balancers، وقواعد RDS، والـ buckets.

تحذير: كل أمر مسح هنا نهائي. اتأكد من [[get-caller-identity]] والـ region والـ ID قبل ما تدوس Enter، وخد snapshot أخير لأي حاجة فيها داتا.`,
          example: R`aws ec2 describe-volumes --filters Name=status,Values=available --query "Volumes[].[VolumeId,Size,CreateTime]" --output table
aws ec2 describe-addresses --query "Addresses[?AssociationId==null].[AllocationId,PublicIp]" --output table
aws ec2 terminate-instances --instance-ids i-0abc1234567890def
aws ec2 delete-volume --volume-id vol-0abc1234567890def
aws ec2 release-address --allocation-id eipalloc-0abc1234567890def
aws rds delete-db-instance --db-instance-identifier myapp-db-restored --final-db-snapshot-identifier myapp-db-restored-final
aws s3 rb s3://myapp-old-assets --force`,
          try: "بعد ما تخلص تجارب الدروس، لف على كل region (الـ loop في درس «Budgets و free tier») ودوّر على: instances، و volumes متاحة، و Elastic IPs مش مربوطة، و NAT Gateways، و load balancers، و RDS. وامسح بعد ما تتأكد. أو افتح Resource Explorer أو Tag Editor في الكونسول يعرضلك كل حاجة في كل الـ regions.",
          flag: "danger",
          deep: {
            why: "AWS مبيمسحش حاجة لوحده ومبيسألكش «لسه محتاجها؟». Elastic IP مش مربوط، و NAT Gateway في VPC تجربة، وقاعدة RDS اتعملت من استرجاع، ممكن يفضلوا شهور. وأول مرة تعرف بيهم هي الفاتورة.",
            how: R`[[status=available]] في الـ volumes يعني «مش متوصل بأي سيرفر»: غالبًا فضل بعد terminate لأن [[DeleteOnTermination]] كان false. و [[AssociationId==null]] في الـ addresses يعني IP محجوز ومش مربوط، وبيتحاسب.

الترتيب مهم: terminate للسيرفر الأول، وبعدين الـ volumes اللي فضلت، وبعدين الـ IPs. و NAT Gateway قبل الـ VPC.

[[delete-db-instance]] مع [[--final-db-snapshot-identifier]] بياخد snapshot أخير قبل المسح، وده اللي يرجّعك لو غلطت. والبديل [[--skip-final-snapshot]] معناه مفيش رجوع. ولو القاعدة عليها deletion protection لازم تقفلها الأول بـ [[modify-db-instance]]، وده مقصود.

[[s3 rb --force]] بيمسح كل الـ objects وبعدين الـ bucket. ولو الـ versioning شغال، النسخ القديمة بتفضل ومش هيقدر يمسح الـ bucket، فلازم تمسح الـ versions الأول أو تحط lifecycle rule تمسحها.

والأحسن من المسح بإيدك: كل حاجة اتعملت بـ Terraform، فـ [[terraform destroy]] بيمسح كل اللي عمله. وكل حاجة عليها tags فتعرف بتاعة مين.`,
            when: "آخر كل تجربة، وفي المراجعة الشهرية للفاتورة، وقبل ما تقفل مشروع.",
            mistakes: "تمسح في region غلط أو حساب غلط (الإنتاج بدل الـ dev). و [[--skip-final-snapshot]] على قاعدة فيها داتا. وتمسح السيرفر وتفتكر إن الـ Elastic IP والـ volume راحوا معاه. و [[s3 rb --force]] على bucket فيه باك أب."
          },
          lines: [
            "الديسكات اللي مش متوصلة بأي سيرفر.",
            "الـ Elastic IPs اللي مش مربوطة (بتتحاسب).",
            "امسح السيرفر نهائيًا.",
            "امسح ديسك فاضل.",
            "رجّع الـ IP لـ AWS.",
            "امسح القاعدة بعد snapshot أخير.",
            "امسح الـ bucket وكل اللي فيه."
          ],
          sol: R`السكربت تحت بيلف على كل region ويطبع بس اللي فيه حاجة. على حساب نضيف المفروض ميطبعش غير أسماء الـ regions. أي سطر تحتها زي [[volumes: vol-0abc... 8]] أو [[eips: eipalloc-...]] أو [[nat: nat-...]] ده مورد بيتحاسب. امسحه بالأوامر اللي في المثال، واستخدم [[aws ec2 delete-nat-gateway]] و [[aws elbv2 delete-load-balancer]] للباقي.

وبعد المسح، شغّل السكربت تاني: الـ NAT Gateway بيفضل ظاهر بحالة [[deleted]] شوية، والـ instance بـ [[terminated]] حوالي ساعة، ودول مش بيتحاسبوا. وفي الكونسول، Resource Explorer (بعد ما تفعّله) أو Tag Editor بـ All regions و All resource types بيعرضوا نفس الصورة من غير سكربت.

الغلطة الشائعة: تمسح الـ instance وتفتكر إن كده خلصت، والديسك فضل [[available]] لأن [[DeleteOnTermination]] كان false، أو الـ Elastic IP فضل محجوز. وتانية: [[delete-db-instance]] من غير snapshot نهائي لقاعدة فيها حاجة مهمة، أو بـ snapshot نهائي لقاعدة تجربة فيفضل الـ snapshot يتحاسب شهور.`,
          solCode: R`for r in $(aws ec2 describe-regions --query "Regions[].RegionName" --output text); do
  echo "== $r"
  aws ec2 describe-instances --region $r --filters Name=instance-state-name,Values=pending,running,stopped --query "Reservations[].Instances[].InstanceId" --output text | sed 's/^/instances: /' | grep -v ': $'
  aws ec2 describe-volumes --region $r --filters Name=status,Values=available --query "Volumes[].[VolumeId,Size]" --output text | sed 's/^/volumes: /' | grep -v ': $'
  aws ec2 describe-addresses --region $r --query "Addresses[?AssociationId==null].AllocationId" --output text | sed 's/^/eips: /' | grep -v ': $'
  aws ec2 describe-nat-gateways --region $r --filter Name=state,Values=available --query "NatGateways[].NatGatewayId" --output text | sed 's/^/nat: /' | grep -v ': $'
  aws elbv2 describe-load-balancers --region $r --query "LoadBalancers[].LoadBalancerName" --output text | sed 's/^/lb: /' | grep -v ': $'
  aws rds describe-db-instances --region $r --query "DBInstances[].DBInstanceIdentifier" --output text | sed 's/^/rds: /' | grep -v ': $'
done`
        },
        {
          cmd: "HA و DR",
          title: "السيستم يفضل شغال لو مبنى وقع، ويرجع لو region وقعت",
          desc: R`High availability معناها مفيش نقطة واحدة لو وقعت كل حاجة تقع (نسختين من التطبيق أو أكتر في AZs مختلفة، وقاعدة بيانات Multi-AZ)، و disaster recovery هي خطتك لو حاجة أكبر حصلت زي region كلها أو حد مسح الداتا.

الـ DR بيتقاس برقمين: RPO (أقصى داتا ممكن تضيع، مثلًا ٥ دقايق) و RTO (أقصى وقت لحد ما ترجع، مثلًا ساعة)، وكل ما الرقمين يصغروا التكلفة بتكبر. تحذير: Multi-AZ بيضاعف سعر القاعدة، والـ failover بيوقفها لحظات.`,
          example: R`aws rds modify-db-instance --db-instance-identifier myapp-db --multi-az --apply-immediately
aws rds reboot-db-instance --db-instance-identifier myapp-db --force-failover
aws autoscaling update-auto-scaling-group --auto-scaling-group-name myapp-web --min-size 2 --max-size 6 --desired-capacity 2
aws s3api put-bucket-versioning --bucket myapp-assets --versioning-configuration Status=Enabled
aws rds copy-db-snapshot --source-db-snapshot-identifier arn:aws:rds:eu-central-1:123456789012:snapshot:myapp-before-migration-42 --target-db-snapshot-identifier myapp-dr-copy --source-region eu-central-1 --kms-key-id alias/myapp-dr --region eu-west-1`,
          try: "على قاعدة تجربة: فعّل Multi-AZ، وشغّل سكربت بيعمل query كل ثانية، واعمل [[--force-failover]]. احسب التطبيق وقف قد إيه، وشوف رجع لوحده ولا محتاج restart (مكتبة الاتصال بتعيد المحاولة؟).",
          flag: "danger",
          deep: {
            why: "الـ AZ بتقع أحيانًا، والسيرفر الواحد بيقع أكتر. والـ DR مش للكوارث بس: الأشهر إن حد يمسح داتا أو migration تبوّظ جدول. ومن غير خطة ورقمين واضحين، هتكتشف وقت الأزمة إن الباك أب عمره يومين أو إن الاسترجاع بياخد ٦ ساعات.",
            how: R`HA على AWS: الـ load balancer نفسه في أكتر من AZ. و Auto Scaling group بحد أدنى ٢ موزعين على AZs، ولو سيرفر فشل في الـ health check بيتشال ويتعمل غيره. والتطبيق لازم stateless: الـ sessions في Redis أو قاعدة البيانات (أو JWT)، والملفات في S3 مش على ديسك السيرفر.

RDS Multi-AZ: نسخة standby في AZ تانية بتاخد كل كتابة بشكل متزامن. لو الأساسية وقعت، الـ DNS بتاع القاعدة بيتحول للـ standby (عادةً دقيقة أو اتنين). والتطبيق لازم يعيد الاتصال، فالـ pool لازم يكون متظبط على كده. والـ standby مش بيستقبل قراية في النوع العادي.

استراتيجيات الـ DR من الأرخص للأغلى: backup & restore (باك أب في region تانية، و RTO ساعات)، و pilot light (القاعدة متكررة في region تانية والباقي يتعمل وقت الحاجة)، و warm standby (نسخة صغيرة شغالة)، و active-active (الاتنين شغالين، و RTO تقريبًا صفر، وأغلى وأعقد بكتير).

[[copy-db-snapshot]] لـ region تانية بيتنفذ في الـ region اللي رايح لها، والـ snapshot المتشفّر محتاج مفتاح KMS هناك ([[--kms-key-id]]). و S3 versioning بيحمي من المسح والكتابة فوق الملفات، و Cross-Region Replication بينسخ لـ region تانية. و AWS Backup بيجمع ده كله في خطط بمواعيد.

وأهم قاعدة: باك أب مجرّبتش تسترجعه = مش باك أب. حط تمرين استرجاع كل كام شهر وقيس الـ RTO الحقيقي.`,
            when: "Multi-AZ وحد أدنى ٢ لأي إنتاج بيدفع. وخطة DR مكتوبة برقمين قبل ما تحتاجها. ولمشروع صغير، باك أب يومي في region تانية بـ RTO ساعات غالبًا كفاية.",
            mistakes: "تفتكر إن Multi-AZ باك أب: لو حد مسح جدول، المسح بيتنسخ للـ standby في نفس اللحظة. وسيرفرين والـ sessions في رام كل واحد فاليوزر بيخرج كل شوية. والباك أب في نفس الحساب ونفس الـ region، فلو الحساب اتخترق أو الـ region وقعت راح الاتنين. والرقمين RPO و RTO محدش حددهم فكل واحد فاكرهم حاجة."
          },
          lines: [
            "شغّل نسخة احتياطي متزامنة في AZ تانية (بيضاعف السعر).",
            "جرّب الـ failover بنفسك: القاعدة هتقف لحظات.",
            "على الأقل سيرفرين دايمًا، ولحد ٦ وقت الضغط.",
            "احتفظ بكل نسخة من كل ملف: المسح والكتابة فوق يترجعوا.",
            "انسخ snapshot لـ region تانية (أيرلندا) بمفتاح تشفير من هناك."
          ],
          sol: R`السكربت تحت بيعمل اتصال جديد كل ثانية ويطبع الوقت و IP السيرفر اللي رد. قبل الـ failover هتلاقي نفس الـ IP. بعد [[--force-failover]] هتلاقي سطور [[FAIL]] (connection refused أو timeout) لفترة، والمتوقع حسب AWS حوالي دقيقة لدقيقتين في Multi-AZ instance العادي، وبعدين السطور ترجع بـ IP مختلف: ده الـ standby اللي بقى primary، والـ endpoint (الاسم) هو هو لأن DNS بتاعه اتحدّث.

السكربت رجع لوحده لأنه بيفتح اتصال جديد كل مرة. التطبيق بتاعك ممكن ميرجعش: لو الـ pool ماسك اتصالات قديمة للسيرفر اللي وقع، أول طلبات بعد الـ failover هتفشل لحد ما الـ pool يكتشف إنها ميتة ويفتح جديدة، ولو المكتبة أو الـ runtime كاشين الـ DNS (زي JVM بإعدادات قديمة) ممكن تفضل تكلّم الـ IP القديم لحد restart. لو ده حصل، النتيجة اللي تكتبها: «التطبيق محتاج retry وإعدادات pool»، مش «Multi-AZ مش شغال».

والغلطة الشائعة في التجربة: تنسى إن Multi-AZ بيضاعف سعر القاعدة، فتسيبه شغال على قاعدة تجربة. رجّعه بـ [[--no-multi-az]] بعد ما تخلص.`,
          solCode: R`export PGCONNECT_TIMEOUT=2
while true; do
  if out=$(psql "$DATABASE_URL" -Atc "select inet_server_addr()" 2>&1); then echo "$(date +%T) OK $out"; else echo "$(date +%T) FAIL"; fi
  sleep 1
done
# في ترمنال تاني:
aws rds reboot-db-instance --db-instance-identifier myapp-db --force-failover
aws rds describe-events --source-identifier myapp-db --source-type db-instance --duration 30 --query "Events[].[Date,Message]" --output table`
        }
      ]
    },
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "إجابات قصيرة تتقال بصوت عالي، والأسئلة اللي بتيجي بعدها",
      items: [
        {
          cmd: "control vs convenience",
          title: "الفرق بين IaaS و PaaS و serverless؟ (What's the difference between IaaS, PaaS and serverless?)",
          desc: R`الفرق في مين بيدير إيه. في IaaS زي EC2 بتاخد سيرفر افتراضي وانت مسؤول عن نظام التشغيل والتحديثات والـ runtime والتطبيق. في PaaS زي Vercel أو RDS بتدّي الكود أو الإعدادات والمنصة بتدير السيرفرات والتحديثات.

وفي serverless زي Lambda مفيش سيرفر تشوفه خالص: كود بيشتغل على حدث، وبيكبر لوحده، وبتدفع على الطلب ووقت التنفيذ، وصفر لو مفيش ترافيك. وكل ما تطلع لفوق بتكسب سرعة وصيانة أقل، وبتخسر تحكم وبتقابل حدود زي مدة التنفيذ والـ cold start. وفي كل الحالات انت مسؤول عن الكود والبيانات والصلاحيات.`,
          try: "قول الإجابة بصوت عالي في أقل من دقيقة، وبعدين طبّقها على ٣ مشاريع من مشاريعك: كل واحد كان إيه؟",
          deep: {
            why: "بيختبر إنك فاهم الـ tradeoff مش حافظ تعريفات: تحكم أكتر وشغل أكتر، ولا راحة أكتر وحدود أكتر.",
            how: R`اربطها بـ shared responsibility: كل ما تطلع لفوق، AWS بيمسك طبقات أكتر (نظام التشغيل، والـ runtime، والـ scaling). والـ containers على Fargate في النص: انت بتدير الـ image والـ runtime جواها، و AWS بيدير السيرفرات.

والتكلفة: IaaS سعر ثابت بالساعة سواء فيه ترافيك ولا لأ. و serverless سعر لكل طلب، أرخص جدًا للترافيك القليل أو المتقطع، وممكن يبقى أغلى من سيرفر مع ترافيك عالي ومستمر.`,
            when: "إمتى تختار serverless وإمتى لأ؟ إيه هو الـ cold start وتقلله إزاي؟ فين الـ containers (ECS و Fargate) من التقسيمة دي؟ إيه هو shared responsibility model؟",
            mistakes: "إن serverless يعني «مفيش سيرفرات» حرفيًا (فيه، بس مش بتديرها). أو إن PaaS و SaaS نفس الحاجة. أو إن managed يعني انت مش مسؤول عن الأمان."
          },
          sol: R`إجابة نموذجية في أقل من دقيقة: «الفرق في مين بيدير إيه. IaaS زي EC2: سيرفر، وأنا مسؤول عن النظام والتحديثات والـ runtime، وبدفع بالساعة حتى لو مفيش ترافيك. PaaS زي Vercel أو RDS أو Render: بدّي كود أو إعدادات والمنصة بتشغّل وتحدّث وتعمل باك أب. Serverless زي Lambda: دالة بتشتغل على حدث، بتكبر لوحدها، وبدفع على الطلب، وصفر لو مفيش ترافيك، بس فيه cold start وحدود مدة. كل ما أطلع لفوق بكسب سرعة وصيانة أقل وبخسر تحكم. وفي كل الحالات الكود والبيانات والصلاحيات مسؤوليتي.»

النقط اللي لازم تتقال: (١) مين بيدير نظام التشغيل، (٢) طريقة الدفع (ساعة مقابل طلب)، (٣) التمن: تحكم وحدود و lock-in، (٤) shared responsibility. وتطبيقها على مشاريعك بيبقى جملة لكل واحد، زي: «API على VPS = IaaS، كنت أنا اللي بحدّث وبعمل باك أب»، «Next.js على Vercel = PaaS مع serverless functions للـ API routes».

الغلطة الشائعة: تقول إن serverless «مفيهوش سيرفرات» وتقف، أو تقول إنه دايمًا أرخص. الإجابة الأقوى بتقول إمتى يبقى أغلى: ترافيك عالي ومستمر.`
        },
        {
          cmd: "CloudFront + ECS + RDS",
          title: "هتعمل deploy لتطبيق Next.js و API وقاعدة بيانات على AWS إزاي؟ (How would you deploy Next.js, an API and a database on AWS?)",
          desc: R`هبدأ بسؤال عن الحجم والفريق والميزانية، لأن الإجابة بتختلف. لتطبيق إنتاج متوسط: الـ Next.js والـ API كـ containers على ECS Fargate في private subnets ورا Application Load Balancer في AZين، و CloudFront قدام كل حاجة للكاش والـ HTTPS، والملفات الثابتة والمرفوعة في S3. القاعدة RDS Postgres بـ Multi-AZ في private subnet، والـ security group بتاعها بيقبل من الـ API بس، والأسرار في Secrets Manager أو Parameter Store وبتتحقن في الـ tasks.

الـ deploy من GitHub Actions بـ OIDC: build، و push لـ ECR، و migration، و update للـ service. والمراقبة CloudWatch و Sentry، والدومين على Route 53، والبنية كلها Terraform. ولو فريق صغير وميزانية قليلة، ممكن Next.js على Vercel أو Amplify، والـ API على Fargate أو Lambda، والقاعدة RDS أو Neon.`,
          example: R`Route 53 → CloudFront → ALB → ECS Fargate (web, api) → RDS Postgres (Multi-AZ)
                      ↘ S3 (static + uploads)`,
          try: "ارسم الرسمة دي لمشروع من مشاريعك، وحط تحت كل مربع: التكلفة الشهرية التقريبية، وإيه اللي يحصل لو وقع.",
          flag: "script",
          deep: {
            why: "السؤال بيختبر إنك شايف الصورة كلها: شبكة، وأمان، وبيانات، و deploy، ومراقبة، مش خدمة واحدة.",
            how: R`الشبكة: VPC فيها public subnets للـ ALB بس، و private subnets للـ tasks والقاعدة. والـ tasks بتطلع للنت عن طريق NAT Gateway أو VPC endpoints (أرخص لـ S3 و ECR).

Next.js على أكتر من نسخة: [[output: 'standalone']] في الـ Docker image، والكاش بتاع ISR لازم يبقى مشترك بين النسخ أو متقفل، والصور المرفوعة في S3 مش على الديسك.

الـ migrations: خطوة في الـ pipeline قبل تحديث الـ service (ECS run-task بنفس الـ image)، وتكون backward compatible عشان النسخة القديمة لسه شغالة وقت الـ rolling.

الـ scaling: autoscaling على الـ CPU أو عدد الطلبات لكل target، ومع كل نسخة زيادة اتصالات أكتر للقاعدة، فـ pool صغير لكل نسخة أو RDS Proxy.`,
            when: "إزاي تعمل migrations من غير توقف؟ ISR والكاش في Next.js لما يبقى فيه أكتر من نسخة؟ التكلفة الشهرية تقريبًا كام؟ ليه مش Lambda؟ ليه مش Kubernetes؟ إزاي الـ API يوصل للقاعدة من غير ما تبقى عامة؟",
            mistakes: "تقفز على Kubernetes لتطبيق صغير. أو تحط القاعدة publicly accessible. أو تنسى الأسرار والـ CI والمراقبة. أو متسألش عن الحجم والفريق والميزانية الأول."
          },
          lines: [
            "رحلة الطلب: DNS، ثم CDN، ثم load balancer، ثم containers، ثم القاعدة.",
            "والملفات الثابتة والمرفوعة من S3 من ورا نفس الـ CDN."
          ],
          sol: R`الرسمة لمشروع متوسط (أرقام تقريبية لـ eu-central-1، بتتغير، راجعها بـ AWS Pricing Calculator):

Route 53: نص دولار للـ zone + الاستعلامات. لو وقع (نادر جدًا) الدومين مش بيتحل؛ الحماية TTL معقول.
CloudFront: على قد الترافيك، وفيه شريحة مجانية شهرية. لو وقع، ممكن تحوّل الـ DNS للـ ALB مباشرة مؤقتًا.
ALB: حوالي ٢٠ دولار في الشهر + وحدات الاستخدام. موزّع على AZين، فوقوع مبنى مش بيوقّعه.
ECS Fargate (نسختين web و ٢ api، صغيرين): عشرات الدولارات. لو task وقعت، ECS بيقوّم غيرها والـ ALB بيشيلها من الترافيك.
RDS Postgres Multi-AZ صغير: تقريبًا ضعف سعر الـ single-AZ. لو الـ primary وقع، failover في دقيقة أو اتنين، والتطبيق لازم يعيد الاتصال.
S3: سنتات للجيجا. عمليًا مش بيقع، والخطر مسح بالغلط، فالحماية versioning.
NAT Gateway (لو الـ tasks في private subnets): حوالي ٣٥ لـ ٤٠ دولار للواحد + الجيجا، وده البند اللي ناس كتير بتنساه.

الغلطة الشائعة: ترسم الرسمة وتنسى الـ NAT والـ public IPs، أو تكتب «لو وقع: مفيش مشكلة» قدام حاجة single point of failure (زي RDS من غير Multi-AZ). الإجابة القوية بتقول بصراحة: «الحاجة الوحيدة اللي وقوعها بيوقّع كل حاجة هي القاعدة، وده ليه دفعت في Multi-AZ».`
        },
        {
          cmd: "least privilege + roles",
          title: "أهم ممارسات IAM إيه؟ (What are IAM best practices?)",
          desc: R`أولًا الـ root user عليه MFA ومفيش ليه access keys ومش بيستخدم في الشغل اليومي. ثانيًا البشر بيدخلوا بهويات مؤقتة عن طريق IAM Identity Center مع MFA، مش IAM users بمفاتيح دايمة. ثالثًا أي workload، سيرفر أو Lambda أو CI، بياخد IAM role بمفاتيح مؤقتة، و GitHub Actions بـ OIDC.

رابعًا least privilege: كل role بالأفعال والموارد اللي محتاجها بس، أبدأ من managed policies وأضيّق، وأستخدم IAM Access Analyzer. وأخيرًا مراجعة دورية للصلاحيات والمفاتيح اللي مش مستخدمة، و CloudTrail شغال، ولو فيه أكتر من حساب SCPs من AWS Organizations كحد أقصى.`,
          try: "راجع حساب AWS عندك بالنقط دي واحدة واحدة، واكتب قدام كل نقطة: متطبقة ولا لأ.",
          deep: {
            why: "أغلب حوادث الأمان على AWS سببها مفتاح اتسرّب أو صلاحية أوسع من اللازم، فالسؤال بيختبر إذا كنت هتبقى خطر على الحساب ولا لأ.",
            how: R`تقييم الطلب: Deny صريح في أي policy يكسب، بعده Allow، والافتراضي ممنوع. وفيه identity-based policies (على اليوزر أو الـ role) و resource-based policies (على الـ bucket أو الـ key أو الـ Lambda)، وفي نفس الحساب يكفي Allow من واحدة منهم، وبين حسابين لازم الاتنين.

وفوقهم حدود: permission boundaries (أقصى حاجة role ممكن تاخدها حتى لو اتدّالها أكتر)، و SCPs على مستوى الـ Organization. الحدود دي مبتدّيش صلاحية، بتقفل بس.`,
            when: "الفرق بين user و role؟ identity-based و resource-based policy؟ إزاي تدّي حساب تاني صلاحية على bucket؟ لو فيه Allow و Deny يحصل إيه؟ إزاي الـ CI يدخل من غير مفاتيح؟",
            mistakes: "«بعمل IAM user لكل تطبيق وبحط المفتاح في .env». أو «بدّي AdministratorAccess وبعدين أضيّق» ومبيضيّقش أبدًا. أو نسيان MFA على الـ root."
          },
          sol: R`الجدول المتوقع لحساب شخصي جديد نسبيًا (وده غالبًا اللي هتلاقيه):

الـ root عليه MFA ومفيش ليه مفاتيح: اتأكد بـ [[get-account-summary]] (درس «root + MFA»).
البشر بيدخلوا بهوية مؤقتة (login أو Identity Center): غالبًا «لأ» لو لسه عندك access key في [[~/.aws/credentials]].
كل workload بياخد role: «لأ» لو فيه مفتاح في .env على سيرفر.
CI بـ OIDC: «لأ» لو فيه [[AWS_ACCESS_KEY_ID]] في GitHub Secrets.
least privilege: ابحث عن [[AdministratorAccess]] أو [[*]] في الـ policies.
مفاتيح ومستخدمين مش مستخدمين: [[aws iam generate-credential-report]] وبعدين [[get-credential-report]] بيدّيك CSV فيه آخر استخدام لكل باسورد ومفتاح.
CloudTrail شغال: حساب جديد فيه Event history ٩٠ يوم ببلاش، بس trail بيحفظ في S3 لازم تعمله.

الإجابة في الانترفيو بتبقى بنفس الترتيب ده: root، ثم البشر، ثم البرامج، ثم least privilege، ثم المراجعة. والغلطة الشائعة إنك تقول «بدّي كل واحد الصلاحيات اللي محتاجها» من غير ما تقول إزاي تعرف هو محتاج إيه (Access Analyzer، ورسالة AccessDenied، و [[simulate-principal-policy]]).`,
          solCode: R`aws iam generate-credential-report
aws iam get-credential-report --query Content --output text | base64 -d | cut -d, -f1,4,5,8,9,11 | column -t -s,`
        },
        {
          cmd: "direct-to-S3 upload",
          title: "إزاي تخلّي اليوزر يرفع ملف كبير على S3 بأمان؟ (How do S3 presigned URLs work?)",
          desc: R`بدل ما الملف يعدّي على السيرفر، العميل بيطلب من الـ API إذن رفع. الـ API بيتأكد إن اليوزر مسجّل ومسموح له، ويتحقق من نوع الملف، ويختار هو الـ key، ويعمل presigned URL لـ PutObject بمدة قصيرة (دقايق). الـ URL فيه توقيع SigV4 محسوب بصلاحيات الـ role بتاعة السيرفر على الـ method والـ bucket والـ key ووقت الانتهاء، والـ Content-Type كمان لو طلبت ده بـ [[signableHeaders]] (SDK v3 افتراضيًا بيسيبه برّه التوقيع). فلو أي حاجة من دول اتغيرت S3 بيرفض.

العميل بيعمل PUT مباشرة لـ S3، وبعدين يبلّغ الـ API بالـ key، والـ API يتأكد إن الملف موجود ويخصّ اليوزر ده ويحفظه. والـ bucket فاضل private، والقراية بعدين بـ presigned GET أو CloudFront signed URLs.`,
          example: R`const url = await getSignedUrl(s3, new PutObjectCommand({ Bucket, Key, ContentType }), { expiresIn: 300, signableHeaders: new Set(["content-type"]) });
await fetch(url, { method: "PUT", headers: { "Content-Type": file.type }, body: file });`,
          try: "اشرحها بصوت عالي في دقيقة، وبعدين ارسم الـ sequence diagram: المتصفح والـ API و S3، وعلّم على كل سهم مين بيتحقق من إيه.",
          flag: "script",
          deep: {
            why: "بيختبر فهمك للأمان (مين يقرر) والأداء (مين يشيل الحمل) مع بعض.",
            how: R`الـ bucket محتاج CORS يسمح بـ PUT من دومينك. والـ PUT الموقّع مبيحددش حجم، فلو محتاج حد: presigned POST مع [[content-length-range]]. وللملفات الكبيرة جدًا: multipart upload بـ URL لكل جزء.

مدة الـ URL محدودة بمدة المفاتيح اللي وقّعته: لو role بجلسة ساعة، الـ URL بيموت بعد ساعة مهما كتبت. وبعد الرفع ممكن S3 event يشغّل Lambda تفحص الملف أو تصغّر الصورة.`,
            when: "تحدد حجم أقصى إزاي؟ ملف ٥ جيجا؟ مين يمسح الملفات اللي اترفعت ومحدش استخدمها؟ (lifecycle على prefix مؤقت) الفرق بين presigned URL و CloudFront signed URL؟ إزاي تفحص الملف على فيروسات؟",
            mistakes: "إن الـ presigned URL بيخلّي الـ bucket public. أو إن العميل يختار الـ key. أو مدة بالأيام. أو نسيان CORS."
          },
          lines: [
            "السيرفر: وقّع إذن رفع لملف واحد لمدة ٥ دقايق، والـ Content-Type جوه التوقيع.",
            "المتصفح: ارفع مباشرة على S3 بنفس الـ Content-Type."
          ],
          sol: R`شرح في دقيقة: «المتصفح بيطلب من الـ API إذن رفع. الـ API بيتأكد من اليوزر والنوع والحجم المتوقع، ويختار الـ key، ويعمل presigned PUT URL لمدة دقايق، والتوقيع بصلاحيات الـ role بتاعة السيرفر. المتصفح بيرفع مباشرة على S3، و S3 بيتحقق من التوقيع والمدة والـ Content-Type. بعدها المتصفح يبعت الـ key للـ API، والـ API يتأكد إن الملف موجود وتبع اليوزر ده قبل ما يحفظه.»

الـ sequence diagram وعلى كل سهم مين بيتحقق:
١. Browser ← API: [[POST /uploads/sign]]. الـ API يتحقق: اليوزر مسجّل؟ النوع مسموح؟
٢. API ← Browser: [[{url, key}]]. الـ API هو اللي اختار الـ key ([[uploads/USER_ID/uuid]]).
٣. Browser ← S3: [[PUT url]]. S3 يتحقق: التوقيع سليم؟ المدة لسه؟ الـ Content-Type نفس اللي اتوقّع؟ الـ role اللي وقّعت ليها [[s3:PutObject]]؟ و CORS مسموح للدومين؟
٤. Browser ← API: [[POST /files {key}]]. الـ API يتحقق: الـ key بيبدأ بـ [[uploads/USER_ID/]]؟ [[HeadObject]] بيقول إنه موجود وحجمه معقول؟

نقطة تكسب بيها: مع SDK v3 الجديد، الـ presign ممكن يحط checksum لملف فاضي في الـ URL فالرفع يفشل، والحل [[requestChecksumCalculation: "WHEN_REQUIRED"]] (درس «presigned URL»). والغلطة الشائعة في الإجابة: تنسى الخطوة ٤، فأي حد يقدر يبعت key بتاع يوزر تاني.`
        },
        {
          cmd: "Cache-Control + CDN",
          title: "الـ CDN بيشتغل إزاي، وتكاش إيه ومتكاشش إيه؟ (How does CDN caching work?)",
          desc: R`الـ CDN شبكة سيرفرات قريبة من اليوزرز. أول طلب لملف في منطقة بيروح للـ origin، والـ edge بيحتفظ بالرد حسب Cache-Control والـ TTL في إعدادات الـ CDN، والطلبات اللي بعده بتتخدم من الـ edge، فالـ latency بتقل والـ origin بيرتاح. والـ cache key افتراضي الدومين والمسار، وكل ما تضيف له query strings أو headers أو cookies نسبة الـ hit بتقل.

بكاش الملفات الثابتة اللي أسماءها فيها hash لمدة طويلة مع immutable، و HTML بمدة قصيرة أو no-cache، ومبكاشش أي رد فيه بيانات يوزر إلا لو الـ key بيميّزه. ولو محتاج أغيّر حاجة فورًا بعمل invalidation، بس الأساس versioned filenames.`,
          example: R`Cache-Control: public, max-age=31536000, immutable
Cache-Control: no-cache
Cache-Control: private, no-store`,
          try: "افتح Network في DevTools على موقع كبير، وشوف Cache-Control على الـ HTML وعلى ملفات JS وعلى طلبات API، وفسّر كل واحد ليه كده.",
          flag: "script",
          deep: {
            why: "الكاش من أكبر أدوات الأداء، ومن أخطر مصادر الـ bugs: بيانات يوزر تظهر لتاني، أو نسخة قديمة مش راضية تمشي.",
            how: R`[[max-age]] للمتصفح والـ CDN، و [[s-maxage]] للـ CDN بس. [[no-cache]] يعني «خزّن بس اسأل الـ origin قبل ما تستخدم» (بـ ETag، والرد 304 لو متغيرش)، و [[no-store]] يعني متخزنش خالص. و [[stale-while-revalidate]] يقدّم القديم وهو بيجيب الجديد في الخلفية.

و [[Vary]] بيقول إن الرد بيختلف حسب header (زي [[Accept-Encoding]])، فالـ CDN يخزّن نسخة لكل قيمة. ولو كتير الـ CDN بيبقى مالوش لازمة.`,
            when: "no-cache و no-store الفرق إيه؟ Vary بيعمل إيه؟ stale-while-revalidate؟ الموقع بيعرض نسخة قديمة بعد deploy، تعمل إيه؟ إزاي تكاش API؟",
            mistakes: "إن no-cache معناها «متخزنش» (دي no-store). أو invalidation مع كل deploy كحل أساسي. أو كاش لصفحة فيها بيانات يوزر."
          },
          lines: [
            "ملف فيه hash: سنة، والمتصفح ميسألش تاني.",
            "HTML: خزّنه بس اسأل الـ origin قبل ما تستخدمه.",
            "بيانات يوزر: متتخزنش في أي مكان مشترك ولا غيره."
          ],
          sol: R`اللي هتلاقيه غالبًا في أي موقع كبير:

الـ HTML: [[no-cache]] أو [[max-age=0, must-revalidate]] أو [[private, max-age=0]]. ليه؟ الـ HTML هو اللي بيشاور على أسماء ملفات الـ JS الجديدة، فلازم يتجدد مع كل deploy.
ملفات JS و CSS اللي أسماءها فيها hash (زي [[main.3f9a2c.js]]): [[public, max-age=31536000, immutable]]. ليه؟ الاسم بيتغير لو المحتوى اتغير، فالنسخة القديمة مش هتتطلب تاني أصلًا.
طلبات API فيها بيانات يوزر: [[private, no-store]] أو [[no-cache]]، ومعاها أحيانًا [[Vary: Authorization]] أو [[Cookie]]. ليه؟ عشان CDN أو proxy ميحفظش رد يوزر ويدّيه لغيره.

وفي DevTools لاحظ عمود Size: [[(memory cache)]] أو [[(disk cache)]] معناها المتصفح مطلبش أصلًا، و [[304]] معناها سأل السيرفر ورد «متغيرش». الغلطة الشائعة: تفتكر إن [[no-cache]] يعني «متكاشش»، هو معناه «كاش بس اسأل قبل ما تستخدم»، والمنع الكامل هو [[no-store]].`
        },
        {
          cmd: "scale out vs scale up",
          title: "الفرق بين horizontal و vertical scaling؟ (Horizontal vs vertical scaling?)",
          desc: R`vertical يعني سيرفر أكبر: CPU ورام أكتر. سهل ومش محتاج تغيير في الكود، بس ليه سقف، وغالبًا فيه توقف وقت التكبير، وبيفضل نقطة فشل واحدة. horizontal يعني نسخ أكتر ورا load balancer: مالوش سقف تقريبًا، وبيدّي high availability، وممكن يتعمل أوتوماتيك مع الضغط، بس التطبيق لازم يبقى stateless: الـ sessions في Redis أو JWT، والملفات في S3، والـ cron ميشتغلش على كل النسخ.

وقواعد البيانات أصعب في الـ horizontal: بتبدأ بـ vertical و read replicas و caching، والـ sharding آخر حل. عمليًا بكبّر vertical لحد نقطة معقولة، وبصمّم التطبيق من الأول يبقى جاهز للـ horizontal.`,
          example: R`aws autoscaling update-auto-scaling-group --auto-scaling-group-name myapp-web --min-size 2 --max-size 10
aws rds modify-db-instance --db-instance-identifier myapp-db --db-instance-class db.r7g.large --apply-immediately`,
          try: "خد تطبيق من تطبيقاتك واكتب ٣ حاجات هتمنعه يشتغل على نسختين: sessions؟ ملفات على الديسك؟ cron؟ WebSockets؟",
          flag: "danger",
          deep: {
            why: "بيختبر إنك عارف ليه التطبيق مش بيكبر بمجرد إنك تزوّد سيرفرات، وإيه اللي لازم يتغير في التصميم.",
            how: R`الـ load balancer بيوزّع ويشيل النسخ اللي بتفشل في الـ health check. والـ autoscaling على metric زي CPU أو عدد الطلبات لكل target. وكل نسخة زيادة بتفتح اتصالات للقاعدة، فالـ pool لازم يتحسب على العدد الأقصى للنسخ، أو pooler زي RDS Proxy.

الـ WebSockets على أكتر من سيرفر محتاجة pub/sub (زي Redis adapter) عشان رسالة من يوزر على سيرفر توصل ليوزر على سيرفر تاني. والـ sticky sessions حل مؤقت بيبوّظ التوزيع وبيوقع مع أي سيرفر.`,
            when: "إزاي تعمل scale لقاعدة البيانات؟ read replicas و replication lag؟ WebSockets على أكتر من سيرفر؟ الـ autoscaling على أنهي metric؟",
            mistakes: "إن horizontal دايمًا أحسن. أو نسيان إن كل نسخة بتفتح اتصالات للقاعدة. أو sticky sessions كحل للـ state."
          },
          lines: [
            "horizontal: من ٢ لـ ١٠ نسخ حسب الضغط.",
            "vertical: القاعدة على سيرفر أكبر (فيه توقف قصير، وبيتحاسب أكتر)."
          ],
          sol: R`مثال لتطبيق Express عادي، التلات حاجات اللي غالبًا هتمنعه يشتغل على نسختين:

١. الـ sessions في الذاكرة ([[express-session]] من غير store): اليوزر يسجّل دخول على نسخة، والطلب التاني يروح للتانية فيطلع خارج. جرّبتها بنسختين ورا Nginx والنتيجة إن طلبات راحت للنسخة التانية ورجعت [[NOT LOGGED IN]]. الحل Redis store أو JWT.
٢. الملفات المرفوعة على الديسك ([[multer]] على [[uploads/]]): الملف موجود على نسخة واحدة، فصورة البروفايل تظهر مرة وتختفي مرة. الحل S3 أو R2.
٣. cron جوه التطبيق ([[node-cron]]): الإيميل اليومي يتبعت مرتين. الحل scheduler واحد (EventBridge أو worker منفصل أو lock في Redis).

والرابعة لو فيه: WebSockets مع Socket.IO، رسالة يوزر على نسخة مش بتوصل ليوزر على التانية من غير Redis adapter. الإجابة الكويسة في الانترفيو بتربط: «عشان كده بكبّر vertical الأول لأنه مش محتاج تغيير، بس بصمّم stateless من الأول عشان الـ horizontal يبقى متاح».`
        },
        {
          cmd: "blue-green vs canary",
          title: "إزاي تنزّل نسخة جديدة من غير ما توقّع الموقع؟ (How do blue/green and canary releases differ?)",
          desc: R`rolling بيبدّل النسخ واحدة واحدة، وده الافتراضي في ECS و Kubernetes. blue-green معناه بيئتين كاملتين: blue شغالة، وبتنزّل green جنبها وتختبرها، وبعدين تحوّل كل الترافيك مرة واحدة من الـ load balancer أو الـ DNS، والرجوع لحظي لأن blue لسه موجودة، بس بيكلف ضعف الموارد وقت التبديل.

canary معناه تبعت نسبة صغيرة (١ أو ٥ أو ١٠٪) للنسخة الجديدة، وتراقب الأخطاء والـ latency، وتزوّد تدريجي، ولو الأرقام وحشة ترجّع؛ المشكلة بتأثر على جزء صغير بس، بس محتاج مراقبة كويسة وأتمتة. وفي الاتنين قاعدة البيانات هي الصعبة: الـ migrations لازم تبقى backward compatible عشان النسختين يشتغلوا على نفس الـ schema (expand ثم contract).`,
          example: R`aws lambda update-alias --function-name hello --name live --function-version 6 --routing-config '{"AdditionalVersionWeights":{"7":0.1}}'
aws lambda update-alias --function-name hello --name live --function-version 7 --routing-config '{"AdditionalVersionWeights":{}}'`,
          try: "لو عندك Nginx، اعمل blue-green بـ upstream بيتبدّل (تاب Nginx: blue-green). ولو Lambda، جرّب الـ alias بالأوامر دي وشوف النسبة في اللوجات.",
          deep: {
            why: "كل deploy خطر، والسؤال بيختبر إنك بتقلل الخطر ده بتصميم مش بالدعاء: تقدر ترجع بسرعة، والمشكلة متأثرش على الكل.",
            how: R`الأدوات على AWS: ALB بـ weighted target groups، و Route 53 weighted records (أبطأ بسبب الـ DNS caching)، و ECS بقى فيه blue/green جاهز، و Lambda aliases بأوزان زي المثال. وفي k8s: Argo Rollouts أو Flagger.

expand/contract: عشان تمسح عمود من غير توقف، deploy أول بيبطّل يقرا العمود، وبعده migration تمسحه. وعشان تغيّر اسمه: عمود جديد، واكتب في الاتنين، وانقل الداتا، واقرا من الجديد، وبعدين امسح القديم.

و feature flags بديل أو مكمّل: الكود الجديد بينزل مقفول وبتفتحه لنسبة من اليوزرز، فتفصل الـ deploy عن الـ release.`,
            when: "إزاي تعمل migration تمسح عمود من غير توقف؟ الفرق بين canary و feature flag؟ تعرف إن الـ canary فشل إزاي؟ canary و A/B testing نفس الحاجة؟",
            mistakes: "إن blue-green بيحل مشكلة الـ migrations لوحده. أو canary من غير مراقبة ولا مقارنة بالنسخة القديمة. أو الخلط بين canary (أمان الـ deploy) و A/B testing (تجربة منتج)."
          },
          lines: [
            "canary: ٩٠٪ للنسخة 6 و ١٠٪ للنسخة 7.",
            "الأرقام كويسة؟ كل الترافيك لـ 7."
          ],
          sol: R`مع Lambda: الأمر الأول بيرجّع [[RoutingConfig]] فيه [[AdditionalVersionWeights: {"7": 0.1}]]. لو ناديت [[hello:live]] كذا مرة بـ [[aws lambda invoke]]، الرد فيه [[ExecutedVersion]] بـ [[6]] في حوالي ٩ من ١٠ مرات و [[7]] في الباقي (النسبة تقريبية وبتظهر مع عدد طلبات كبير). وفي CloudWatch Logs أسماء الـ log streams فيها رقم النسخة زي [[2026/09/29/[7]abc...]]، فتقدر تشوف النسبة وتفلتر أخطاء النسخة الجديدة لوحدها. الأمر التاني بيحوّل كل الترافيك لـ 7 ويفضّي الأوزان.

مع Nginx: blue-green معناه upstream بيشاور على [[blue]]، تشغّل [[green]] جنبه وتجرّبه مباشرة، وتغيّر الـ upstream وتعمل [[nginx -s reload]]، فالتحويل لحظي والرجوع نفس الخطوة بالعكس.

الغلطة الشائعة: تنادي [[--function-name hello]] من غير [[:live]] فكل الطلبات تروح [[$LATEST]] ومتشوفش أي تقسيم. وتانية: الـ canary من غير مراقبة ولا شرط رجوع، فبقى مجرد deploy بطيء. الإجابة القوية بتقول الشرط: «لو الأخطاء في النسخة الجديدة زادت عن كذا خلال ١٠ دقايق، رجوع أوتوماتيك».`,
          solCode: R`for i in $(seq 1 20); do aws lambda invoke --function-name hello:live --query ExecutedVersion --output text /dev/null; done | sort | uniq -c`
        },
        {
          cmd: "orchestration",
          title: "Kubernetes بيحل مشكلة إيه؟ وإمتى متستخدموش؟ (What problem does Kubernetes solve?)",
          desc: R`Kubernetes هو container orchestrator: بتوصف الحالة اللي عايزها بـ YAML (كام نسخة، وأنهي image، وكام CPU ورام، وإزاي توصلها)، وهو بيفضل يخلّي الواقع يطابقها. بيوزّع الـ containers على السيرفرات، ويعيد تشغيل اللي بيقع، ويشيل اللي بيفشل في الـ health check من الترافيك، ويعمل rolling updates و rollback، و service discovery و load balancing داخلي، و autoscaling، وإدارة إعدادات وأسرار.

قيمته الحقيقية لما يبقى عندك خدمات كتير وفرق كتير ومحتاجين منصة موحدة. ومش بستخدمه لمشروع صغير أو فريق من ٢ أو ٣ لأنه بيضيف تعقيد تشغيلي كبير؛ هناك Docker Compose على VPS أو ECS Fargate أو PaaS أنسب.`,
          example: R`kubectl scale deployment/api --replicas=5
kubectl rollout undo deployment/api`,
          try: "اشرح بصوت عالي الفرق بين Pod و Deployment و Service في ٣ جمل، وبعدين قول ليه مش هتستخدم k8s لآخر مشروع عملته.",
          deep: {
            why: "بيختبر إنك فاهم المشكلة اللي الأداة بتحلها، مش بس إنك سمعت اسمها، وإنك عندك حكم تقول «مش محتاجينها».",
            how: R`الـ control plane فيه API server، و etcd (بيخزّن الحالة المطلوبة)، و scheduler (بيختار node لكل pod)، و controllers (بتلف تقارن المطلوب بالموجود وتصلّح). وعلى كل node فيه kubelet بيشغّل الـ containers فعلًا عن طريق containerd.

الـ Pod مؤقت، والـ Deployment بيدير نسخ متشابهة، والـ Service اسم ثابت قدامهم، و Ingress أو Gateway API للدخول من برا. والـ StatefulSet للحاجات اللي ليها هوية وديسك ثابت زي قواعد البيانات.`,
            when: "Pod و Deployment و Service الفرق إيه؟ liveness و readiness؟ StatefulSet؟ الـ autoscaling (HPA) بيشتغل إزاي؟ الفرق بينه وبين ECS أو Docker Swarm؟",
            mistakes: "إن k8s هو اللي بيشغّل الـ containers نفسها (ده containerd تحت). أو إنه ضروري لأي microservices. أو إن الـ Secret فيه متشفّر."
          },
          lines: [
            "عايز ٥ نسخ: k8s يوزّعهم على السيرفرات.",
            "رجّع النسخة اللي قبلها."
          ],
          sol: R`إجابة نموذجية في ٣ جمل: «الـ Pod أصغر وحدة، container أو أكتر بيشتغلوا مع بعض وليهم IP، وهو مؤقت ممكن يموت ويتعمل غيره باسم وعنوان جديد. الـ Deployment بيقول عايز كام نسخة من Pod معين وبأنهي image، ويفضل يصلّح الواقع عشان يطابق، ويعمل rolling update و rollback. الـ Service اسم وعنوان ثابت قدام مجموعة Pods بالـ labels، وبيوزّع عليهم، فالتطبيق بيكلّم [[api]] مش IP بيتغير.»

وليه مش لآخر مشروع (مثال): «مشروع فيه API وقاعدة بيانات وفريق من ٢. k8s هيضيف control plane أدفع فيه أو أديره، و YAML و ingress وشهادات وتحديثات للـ cluster نفسه، عشان مشاكل أنا معنديش: خدمات كتير وفرق كتير. Docker Compose على VPS أو PaaS أو ECS Fargate كان كفاية.»

الغلطة الشائعة: تقول إن الـ Service هو اللي «بيشغّل» الـ pods (ده الـ Deployment)، أو تقول إن k8s «أحسن» من غير ما تقول إمتى. الانترفيوير عايز يسمع التكلفة التشغيلية، مش قايمة مميزات.`
        },
        {
          cmd: "SLO vs SLA",
          title: "الفرق بين SLI و SLO و SLA؟ (What are SLIs, SLOs and SLAs?)",
          desc: R`الـ SLI هو المقياس نفسه من ناحية اليوزر، زي نسبة الطلبات الناجحة أو نسبة الطلبات الأسرع من ٣٠٠ مللي. الـ SLO هو الهدف الداخلي للمقياس ده، زي ٩٩.٩٪ في ٣٠ يوم. والـ SLA عقد مع العميل فيه وعد وتبعات لو اتكسر، زي تعويض أو خصم، وبيبقى أقل من الـ SLO عشان يبقى فيه هامش.

والفرق بين ١٠٠٪ والـ SLO اسمه error budget: لو فاضل منه بنتحرك بسرعة ونعمل deploys، ولو خلص بنوقف الـ features ونركّز على الاستقرار. والإنذار بيبقى على سرعة صرف الميزانية، مش على كل خطأ.`,
          example: R`(30 * 24 * 60 * (1 - 0.999)).toFixed(1); // "43.2"`,
          try: "احسب الـ error budget بالدقايق لـ ٩٩.٥٪ و ٩٩.٩٥٪، وقول لكل واحد: ده محتاج إيه في البنية؟",
          flag: "script",
          deep: {
            why: "بيختبر إنك بتفكر في الاعتمادية كرقم وقرار، مش إحساس ولا «عايزينه ١٠٠٪».",
            how: R`كل ٩ زيادة بتقلل الميزانية ١٠ مرات: ٩٩٪ حوالي ٧ ساعات في الشهر، و ٩٩.٩٪ حوالي ٤٣ دقيقة، و ٩٩.٩٩٪ حوالي ٤ دقايق. والـ SLO لازم يبقى أقل من اعتمادية اللي انت معتمد عليه.

القياس: من لوجات الـ load balancer، أو من الـ metrics في التطبيق، أو synthetic checks من برا. والإنذار بـ burn rate: لو بنصرف الميزانية بسرعة تخلّصها في يومين، صحّي حد دلوقتي.`,
            when: "تختار الـ SLO إزاي؟ لو الـ error budget خلص تعمل إيه؟ تقيس الـ SLI منين؟ ٩٩.٩٩٪ محتاجة إيه؟",
            mistakes: "إن الـ SLA هو الهدف الداخلي. أو SLO بـ ١٠٠٪. أو SLI على CPU أو uptime السيرفر بدل تجربة اليوزر."
          },
          lines: [
            "ميزانية ٩٩.٩٪ في ٣٠ يوم: ٤٣.٢ دقيقة."
          ],
          sol: R`الحسبة لـ ٣٠ يوم: ٩٩.٥٪ = [[216.0]] دقيقة (حوالي ٣.٦ ساعة)، و ٩٩.٩٥٪ = [[21.6]] دقيقة.

٩٩.٥٪: سيرفر واحد كويس مع باك أب ومراقبة ممكن يوصلها، حتى لو فيه deploy بيوقف دقيقة كل مرة، ومشكلة كبيرة واحدة في الشهر ممكن تتحل في ساعتين. ٩٩.٩٥٪: ٢١ دقيقة في الشهر كله، يعني مفيش مكان لـ downtime في الـ deploy (rolling أو blue-green)، ونسختين على الأقل في AZين، وقاعدة Multi-AZ، وإنذار أوتوماتيك وحد يرد في دقايق، و rollback في أقل من ٥ دقايق. الفرق بين الرقمين مش ٠.٤٥٪، ده ١٠ أضعاف الشغل والتكلفة تقريبًا.

الغلطة الشائعة: تحسب على ٣٦٥ يوم وتقارن بأرقام على ٣٠ يوم. أو تقول SLA و SLO حاجة واحدة: الـ SLA عقد فيه تعويض، وبيبقى أقل من الـ SLO الداخلي عشان يبقى فيه هامش.`,
          solCode: R`for (const slo of [0.995, 0.9995]) console.log(slo, (30 * 24 * 60 * (1 - slo)).toFixed(1));
// 0.995 216.0
// 0.9995 21.6`
        },
        {
          cmd: "rightsize + commit + clean",
          title: "فاتورة الـ cloud زادت الضعف: هتعمل إيه؟ (How would you cut a cloud bill?)",
          desc: R`أول حاجة أقيس قبل ما أقطع: Cost Explorer مقسّم بالخدمة والـ usage type والـ tags، عشان أعرف الفلوس رايحة فين وإيه اللي زاد. بعدين السهل: موارد منسية زي volumes و Elastic IPs و snapshots وبيئات تجربة، ولوجات من غير retention. وبعدها right-sizing من أرقام الاستخدام الحقيقية، و Graviton، وإطفاء dev و staging بالليل، و S3 lifecycle أو Intelligent-Tiering.

وبعد ما الاستخدام يستقر: Savings Plans للحد الأدنى الثابت و Spot للشغل اللي يستحمل. وأبص على الشبكة: NAT Gateway والـ egress والنقل بين الـ AZs، وحلول زي VPC endpoints و CloudFront. وفي الآخر أمنع الرجوع: budgets، و anomaly detection، و tags إجبارية.`,
          example: R`aws ce get-cost-and-usage --time-period Start=2026-08-01,End=2026-09-01 --granularity MONTHLY --metrics UnblendedCost --group-by Type=DIMENSION,Key=USAGE_TYPE`,
          try: "خد فاتورة أي حساب عندك واعمل جدول: أكبر ٥ بنود، وسبب كل واحد، وخطوة تقلله.",
          deep: {
            why: "بيختبر إنك بتتعامل مع التكلفة كهندسة: قياس، ثم أولويات، ثم منع الرجوع، مش «هنصغّر السيرفرات وخلاص».",
            how: R`الترتيب مقصود: المسح والتنضيف مفيهمش أي مخاطرة. الـ right-sizing محتاج أرقام وأسابيع مراقبة. والالتزام (Savings Plans) آخر حاجة، لأنك لو التزمت على استخدام هتقلله بعدين هتدفع على حاجة مش بتستخدمها.

والبنود المخفية: NAT Gateway (بالساعة والجيجا)، و public IPv4، والنقل بين الـ AZs، وCloudWatch Logs من غير retention، والـ snapshots القديمة. و Cost Anomaly Detection بينبّه لما بند يقفز فجأة.`,
            when: "Savings Plans ولا Reserved Instances؟ Spot مناسب لإيه؟ ليه NAT Gateway غالي؟ تعرف كل فريق صرف كام إزاي؟",
            mistakes: "تبدأ بشراء Savings Plans قبل ما تنضّف. أو تصغّر من غير أرقام فالتطبيق يبطأ أو يقع. أو تنسى الـ egress والـ NAT."
          },
          lines: [
            "التكلفة مقسومة بنوع الاستخدام: هنا بيبان NatGateway و DataTransfer-Out وغيرهم."
          ],
          sol: R`جدول نموذجي لحساب صغير فيه تجارب (الأرقام مثال، بنودك هتختلف):

١. EC2 (t3.medium شغال ٢٤ ساعة، الاستخدام ٥٪): اختاروه «احتياطي». الخطوة: t4g.small (Graviton) أو إطفاء بالليل لو dev.
٢. NAT Gateway: private subnets من قالب جاهز. الخطوة: VPC endpoint لـ S3 و ECR، أو public subnet لبيئة dev.
٣. RDS Multi-AZ لقاعدة staging: حد نسخ إعدادات الإنتاج. الخطوة: single-AZ لـ staging.
٤. Public IPv4 و Elastic IPs مش مربوطة: بقايا تجارب. الخطوة: امسحها (درس «امسح اللي مش مستخدم»).
٥. CloudWatch Logs: log groups من غير retention بقالها سنة. الخطوة: [[put-retention-policy]] بـ ٣٠ يوم.

الإجابة في الانترفيو بتمشي بنفس ترتيب الجدول: أقيس (usage type، مش الخدمة بس)، أنضّف المنسي، أصغّر، وبعد ما الاستخدام يستقر Savings Plans، وفي الآخر أمنع الرجوع (budgets و anomaly detection و tags). الغلطة الشائعة: تبدأ بـ «هشتري Reserved Instances» قبل ما تعرف إن نص الفاتورة موارد منسية.`
        },
        {
          cmd: "stateless",
          title: "ليه التطبيق لازم ميحتفظش بحاجة جواه عشان يكبر؟ (Why should app servers keep no local state?)",
          desc: R`معناها إن أي نسخة من التطبيق تقدر ترد على أي طلب، لأن مفيش حاجة مهمة محفوظة جوه النسخة نفسها: الـ sessions في Redis أو قاعدة البيانات أو JWT، والملفات المرفوعة في S3 مش على الديسك، والكاش المشترك في Redis، والمهام المجدولة شغالة من مكان واحد مش على كل نسخة.

ده اللي بيخلّيني أزوّد نسخ ورا load balancer، وأبدّل أي نسخة بايظة أو أعمل deploy من غير ما اليوزر يخرج، وأشغّل autoscaling. والـ state مش بيختفي، بيتنقل لخدمات متخصصة ومُدارة.`,
          example: R`app.use(session({ store: new RedisStore({ client: redis }), secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));`,
          try: "شغّل تطبيقك نسختين ورا Nginx (upstream بسيرفرين)، وسجّل دخول، واعمل refresh كذا مرة. لو خرجت، التطبيق مش stateless.",
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم الشرط الأساسي لأي scaling أو high availability، وإن المشكلة في التصميم مش في عدد السيرفرات.",
            how: R`الحاجات اللي بتكسر الـ stateless وناس كتير مش واخدة بالها منها: sessions في الرام (الـ default في express-session)، وملفات مرفوعة على الديسك، وكاش في الرام بيختلف من نسخة للتانية، و cron جوه التطبيق بيشتغل مرة على كل نسخة (الإيميل بيتبعت ٣ مرات)، و WebSockets متوصلة بنسخة معينة.

الحلول: store خارجي للـ sessions، و S3 للملفات، و Redis للكاش المشترك، و scheduler واحد (EventBridge أو cron على worker واحد أو lock في Redis)، و pub/sub للـ WebSockets.`,
            when: "WebSockets إزاي؟ sticky sessions ليه مش حل؟ الـ cron مع ٣ نسخ؟ JWT ولا sessions؟",
            mistakes: "إن stateless يعني مفيش قاعدة بيانات. أو sticky sessions كحل نهائي. أو نسيان الـ cron والكاش المحلي."
          },
          lines: [
            "الـ sessions في Redis مش في رام السيرفر، فأي نسخة تعرف اليوزر."
          ],
          sol: R`بالكود اللي تحت (sessions في الذاكرة) ونسختين ورا Nginx، جرّبتها فعلًا والناتج كان:

[[logged in on 4101]]
[[4101: ali]] (٣ مرات)
[[4102: NOT LOGGED IN]]

يعني بعد تسجيل الدخول، أي طلب راح للنسخة التانية طلع خارج. التوزيع مش شرط يبقى بالتبادل بالظبط (كل worker في Nginx ليه عدّاد round robin لوحده)، بس مع كذا refresh هيحصل. ده الإثبات إن التطبيق مش stateless.

الحل: store خارجي ([[connect-redis]] مع Redis) زي سطر الدرس، وبعدها كل الطلبات ترجع [[ali]] مهما النسخة. الغلطة الشائعة: تحل المشكلة بـ [[ip_hash]] أو sticky sessions في Nginx؛ الأعراض تختفي، بس أول ما نسخة تقع أو تعمل deploy، كل اليوزرز اللي عليها يخرجوا، والتوزيع يبقى مش عادل.`,
          solCode: R`// sess.mjs  (PORT=4101 node sess.mjs & PORT=4102 node sess.mjs &)
import express from "express";
import session from "express-session";
const app = express();
app.use(session({ secret: "dev-secret", resave: false, saveUninitialized: false }));
app.get("/login", (req, res) => { req.session.user = "ali"; res.send("logged in on " + process.env.PORT + "\n"); });
app.get("/me", (req, res) => res.send(process.env.PORT + ": " + (req.session.user ?? "NOT LOGGED IN") + "\n"));
app.listen(process.env.PORT);
# nginx: upstream app { server 127.0.0.1:4101; server 127.0.0.1:4102; }  و  location / { proxy_pass http://app; }
curl -s -c jar -b jar localhost:8088/login
for i in 1 2 3 4; do curl -s -c jar -b jar localhost:8088/me; done`
        },
        {
          cmd: "RPO / RTO",
          title: "لو الـ region كلها وقعت، ترجع إزاي وفي قد إيه؟ (Explain RPO and RTO)",
          desc: R`بعرّف الأول رقمين مع البزنس: RPO، أقصى داتا مقبول تضيع، و RTO، أقصى وقت مقبول لحد ما نرجع، والرقمين دول بيحددوا الاستراتيجية والتكلفة. لو RPO ساعات و RTO يوم، باك أب منتظم منسوخ لـ region وحساب تاني كفاية. لو RPO دقايق، محتاج replication مستمر زي cross-region read replica أو Aurora Global Database.

ولو RTO دقايق، محتاج warm standby أو active-active مع Route 53 failover، والبنية كلها Terraform عشان تتعمل بسرعة. وفي كل الحالات الباك أب بيتختبر دوريًا باسترجاع حقيقي، والـ runbook مكتوب، لأن الـ RTO الحقيقي هو اللي قسته مش اللي افترضته.`,
          try: "لمشروع من مشاريعك: اكتب الـ RPO والـ RTO الحاليين بصراحة (آخر باك أب إمتى؟ والاسترجاع بياخد قد إيه؟)، وبعدين الرقمين اللي المفروض يبقوا.",
          deep: {
            why: "بيختبر إنك بتربط القرار التقني بالبزنس: كام دقيقة وقوع أو كام ساعة داتا الشركة تستحمل تخسر، وكام هتدفع عشان تقلل ده.",
            how: R`الاستراتيجيات من الأرخص للأغلى: backup & restore، ثم pilot light (القاعدة متكررة والباقي يتعمل وقت الحاجة)، ثم warm standby (نسخة صغيرة شغالة)، ثم active-active. كل خطوة بتقلل الـ RTO وبتزوّد التكلفة والتعقيد.

والـ HA غير الـ DR: Multi-AZ بيحميك من وقوع مبنى، مش من مسح داتا ولا من region كاملة. والباك أب لازم يبقى في حساب منفصل كمان، عشان لو الحساب نفسه اتخترق.`,
            when: "الفرق بين HA و DR؟ Multi-AZ كفاية؟ بتختبر الـ DR إزاي؟ الـ DNS failover بياخد قد إيه؟",
            mistakes: "إن Multi-AZ هو الـ DR. أو باك أب في نفس الحساب ونفس الـ region. أو أرقام من غير ما تسأل البزنس."
          },
          sol: R`مثال لإجابة صريحة لمشروع صغير على VPS:

الحالي: الباك أب [[pg_dump]] يومي الساعة ٣ الصبح على نفس السيرفر. يعني RPO الحقيقي لحد ٢٤ ساعة، ولو الديسك نفسه راح يبقى RPO لانهائي (الباك أب راح معاه). والـ RTO: عمري ما استرجعت، فمعرفوش؛ التقدير: سيرفر جديد وتسطيب وتنزيل الباك أب ٣ لـ ٤ ساعات.

المفروض: RPO ساعة و RTO ساعتين مثلًا (اسأل: خسارة يوم طلبات تكلف قد إيه؟). ده محتاج: باك أب لـ مكان تاني (S3 أو R2 في حساب منفصل) كل ساعة أو WAL archiving، أو قاعدة مُدارة فيها PITR، وسكربت أو Terraform بيقوّم السيرفر، وتجربة استرجاع حقيقية كل شهر بتقيس الوقت.

الغلطة الشائعة: تكتب RPO = «يوم» لأن الباك أب يومي وتنسى إن الباك أب على نفس الديسك، أو تكتب RTO رقم متخيّل من غير ما تكون جربت استرجاع ولو مرة. والفرق اللي الانترفيوير بيدوّر عليه: Multi-AZ ده HA مش DR، ومبيحميش من [[DELETE]] من غير [[WHERE]].`
        }
      ]
    }
]);
