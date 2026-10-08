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
          teach: R`## الفكرة: خدمتين، وطلب واحد بيعدّي على الاتنين

الملف فيه سيرفرين في process واحد: A على بورت 3000 و B على 4000. A لما يجيله طلب بيكلّم B. وكل واحد بيطبع «أنا شغال في أنهي trace؟». السؤال اللي الدرس بيجاوبه: هل B هيعرف إن الطلب ده جزء من نفس الرحلة اللي بدأت عند A؟

اتشغّل في container [[node:22-slim]] (Node 22) بـ [[@opentelemetry/api]] 1.9.1 و [[sdk-node]] 0.223.0 و [[auto-instrumentations-node]] 0.81.0، مرة من غير SDK ومرة بملف [[instrumentation.mjs]] بتاع الدرس الجاي.

---

## ١. الـ imports

~~~js
import http from "node:http";
import { trace } from "@opentelemetry/api";
~~~

- [[node:http]] موديول HTTP اللي جوه Node. [[node:]] بيقول صراحة إنه من Node نفسه مش من npm.
- [[@opentelemetry/api]] الـ API بس: دوال زي [[trace.getActiveSpan()]]. لوحده مبيعملش أي حاجة (no-op)، والـ SDK هو اللي بيشغّله. عشان كده المكتبات بتعتمد على الـ API بس، والتطبيق يقرر.

---

## ٢. خدمة B

~~~js
const b = http.createServer((req, res) => {
  console.log("B got traceparent:", req.headers.traceparent);
  console.log("B active traceId:  ", trace.getActiveSpan()?.spanContext().traceId);
  res.end("ok");
});
b.listen(4000);
~~~

- [[http.createServer(fn)]] سيرفر، و [[fn]] بتتنادى مع كل طلب: [[req]] الطلب، و [[res]] الرد.
- [[req.headers.traceparent]] الهيدر اللي A المفروض يبعته. Node بيخلّي أسماء الهيدرز small letters.
- [[trace.getActiveSpan()]] الـ span «الحالي» (الخطوة اللي احنا جواها دلوقتي). من غير SDK بيرجّع [[undefined]].
- [[?.]] لو اللي قبلها [[undefined]] وقّف ورجّع [[undefined]] بدل ما يوقع.
- [[.spanContext().traceId]] رقم الرحلة كلها.

---

## ٣. خدمة A

~~~js
const a = http.createServer(async (req, res) => {
  console.log("A active traceId:  ", trace.getActiveSpan()?.spanContext().traceId);
  const r = await fetch("http://localhost:4000/stock");
  res.end(await r.text());
});
~~~

A بتطبع الـ trace id بتاعها، وتطلب من B بـ [[fetch]]، وترجّع رد B. **مفيش ولا سطر بيبعت [[traceparent]]**. ده المقصود.

---

## ٤. التشغيل

~~~js
a.listen(3000, async () => {
  await fetch("http://localhost:3000/checkout");
  a.close(); b.close();
});
~~~

لما A تبدأ تسمع: ابعت لها طلب واحد، وبعدين اقفل السيرفرين عشان السكربت يخلص لوحده.

---

## ٥. من غير SDK: [[node two.mjs]]

~~~text الناتج
A active traceId:   undefined
B got traceparent: undefined
B active traceId:   undefined
~~~

مفيش spans، ومحدش بيحط هيدر. الـ API لوحده ساكت.

---

## ٦. مع الـ SDK: [[node --import ./instrumentation.mjs two.mjs]]

~~~text الناتج
A active traceId:   df5b98572314bdc3c83ad8684d822d4d
B got traceparent: 00-df5b98572314bdc3c83ad8684d822d4d-6b2e5fe27c4d1c60-01
B active traceId:   df5b98572314bdc3c83ad8684d822d4d
~~~

نفس الـ trace id في A و B، والهيدر وصل لوحده. مين حطه؟ الـ instrumentation بتاع [[fetch]] (اسمه [[undici]]، ده اسم الـ HTTP client اللي جوه Node).

### نفك الـ [[traceparent]]

~~~text
00  -  df5b98572314bdc3c83ad8684d822d4d  -  6b2e5fe27c4d1c60  -  01
نسخة   trace id (16 byte = 32 حرف hex)    parent span id (8 byte)   flags
~~~

| الجزء | معناه |
|---|---|
| [[00]] | نسخة المعيار (W3C Trace Context) |
| الـ trace id | الرحلة كلها، نفس الرقم في كل الخدمات |
| [[6b2e5fe27c4d1c60]] | الـ span اللي بعت الطلب ده (الـ fetch في A)، فـ B يعرف أبوه مين |
| [[01]] | sampled: الـ trace ده بيتسجّل |

[[hex]] يعني كل حرف من 0-9 و a-f، وكل حرفين = byte، فـ ٣٢ حرف = ١٦ byte.

### الـ spans نفسها

الـ console exporter طبع ٤ spans، كلهم [[traceId: 'df5b...']]. بنرتبهم بالأب:

| span | من مين | [[kind]] | الأب | المدة |
|---|---|---|---|---|
| [[e90f5c...]] | undici (الـ fetch اللي في [[listen]]) | 2 = CLIENT | [[undefined]] (الـ root) | ٣٠.٨ مللي |
| [[bd53f6...]] | http: A استقبل الطلب | 1 = SERVER | [[e90f5c...]] | ١٥.٤ مللي |
| [[6b2e5f...]] | undici: A بيكلّم B | 2 = CLIENT | [[bd53f6...]] | ٩.٠ مللي |
| [[c82ce1...]] | http: B استقبل | 1 = SERVER | [[6b2e5f...]] | ٢.٥ مللي |

([[duration]] في الناتج بالمايكروثانية: [[2491.486]] = ٢.٥ مللي.)

ده الـ trace: شجرة، كل span جوه أبوه، والأب دايمًا أطول من ابنه. ولاحظ إن [[6b2e5f...]] هو نفسه الجزء الأوسط في الهيدر اللي B استقبله.

---

## ٧. trace جاي من برا

شغّلنا A من غير ما تقفل نفسها، وبعتنا لها طلب من process تاني ومعاه هيدر جاهز:

~~~text
traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
~~~

~~~text الناتج
A active traceId:   4bf92f3577b34da6a3ce929d0e0e4736
B got traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-e1da3d47d88063f4-01
B active traceId:   4bf92f3577b34da6a3ce929d0e0e4736
~~~

A مبدأتش trace جديد: كمّلت الرقم اللي جالها، والـ span بتاعها أبوه [[00f067aa0ba902b7]] (اللي في الهيدر). ده اللي بيحصل لما gateway أو frontend يبدأ الـ trace.

> الـ SDK كان بياخد حوالي ٣٠ ثانية عشان يقوم في الـ container ده (بيحمّل instrumentations كتير من فولدر متشارك مع ويندوز)، فلازم تستنى سطر [[listening]] قبل ما تبعت طلب.

---

## الخلاصة

| الكلمة | معناها |
|---|---|
| trace | رحلة طلب واحد، ليها [[traceId]] واحد |
| span | خطوة: اسم، وبداية، ومدة، وأب |
| [[kind]] | SERVER (1) للداخل، CLIENT (2) للطالع، INTERNAL (0) جوه الكود |
| [[traceparent]] | الهيدر اللي بينقل الرقم بين الخدمات |
| context propagation | الـ instrumentation بيحط الهيدر ويقراه لوحده |`,
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
          teach: R`## الفكرة: ملف بيتحمّل قبل تطبيقك ويلف كل المكتبات

الملف ده مش جزء من التطبيق. هو بيتحمّل الأول بـ [[node --import ./instrumentation.mjs app.mjs]]، يشغّل OpenTelemetry، ويلف (patch) [[http]] و Express و [[fetch]] وغيرهم، فكل طلب يطلع spans لوحده من غير ما تلمس كود التطبيق.

اتشغّل في container [[node:22-slim]] بـ [[sdk-node]] 0.223.0 و [[auto-instrumentations-node]] 0.81.0 و Express 5، مع [[app.mjs]] اللي في الحل وطلب على [[/orders/7]].

---

## ١. الـ imports

~~~js
import { register } from "node:module";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
~~~

| الاسم | جاي منين | دوره |
|---|---|---|
| [[register]] | Node نفسه | يسجّل loader hook (تحت) |
| [[NodeSDK]] | [[sdk-node]] | بيربط كل الحاجات مع بعض |
| [[ConsoleSpanExporter]] | [[sdk-trace-node]] | الـ exporter: الـ spans تروح فين (هنا الشاشة) |
| [[SimpleSpanProcessor]] | [[sdk-trace-node]] | يبعت كل span للـ exporter أول ما يخلص |
| [[getNodeAutoInstrumentations]] | [[auto-instrumentations-node]] | قايمة instrumentations جاهزة لعشرات المكتبات |
| [[resourceFromAttributes]] | [[resources]] | يوصف «مين أنا» |
| [[ATTR_SERVICE_NAME]] | [[semantic-conventions]] | ثابت قيمته النص [["service.name"]] |

---

## ٢. [[register(...)]]: الـ hook بتاع ESM

~~~js
register("@opentelemetry/instrumentation/hook.mjs", import.meta.url);
~~~

الـ instrumentation القديم بيلف الموديول وهو بيتحمّل بـ [[require]]. لكن [[import]] (ملفات [[.mjs]]) بيتحمّل بطريقة تانية، فمحتاج «hook» يدخل في التحميل ده. [[import.meta.url]] عنوان الملف الحالي، عشان Node يعرف يدوّر على الـ hook من هنا.

جرّبنا نشيل السطر ده بس:

| | بالـ hook | من غير الـ hook |
|---|---|---|
| اسم الـ root span | [[GET /orders/:id]] | [[GET]] بس |
| spans من [[instrumentation-express]] | موجودة | مش موجودة |

يعني Express (اللي [[app.mjs]] عامله [[import]]) متلفّش، فالـ span مبقاش عارف الـ route.

---

## ٣. [[new NodeSDK({...})]]

~~~js
const sdk = new NodeSDK({
  resource: resourceFromAttributes({ [ATTR_SERVICE_NAME]: "orders-api" }),
  spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
  instrumentations: [getNodeAutoInstrumentations({ "@opentelemetry/instrumentation-fs": { enabled: false } })],
});
~~~

### [[resource]]

[[{ [ATTR_SERVICE_NAME]: "orders-api" }]]: الأقواس المربعة حوالين اسم الخانة معناها «استخدم **قيمة** المتغير كاسم»، فده نفس [[{ "service.name": "orders-api" }]]. وده أهم attribute: بيه الأداة بتعرض «خدمة orders-api». والـ SDK زوّد معاه لوحده معلومات عن الجهاز والـ process:

~~~text الناتج (الـ resource)
'host.name': 'aed742dd57a1',
'process.runtime.version': '22.23.3',
'process.command': '/app/app.mjs',
'service.name': 'orders-api'
~~~

### [[spanProcessors]]

قايمة ([[[ ]]]) فيها processor واحد: [[SimpleSpanProcessor]] ماسك [[ConsoleSpanExporter]]. يعني «كل span يخلص، اطبعه على طول». للتجربة بس.

### [[instrumentations]]

[[getNodeAutoInstrumentations({...})]] كلهم، والـ object اللي جواه إعدادات لكل واحد باسمه. هنا: [[instrumentation-fs]] [[enabled: false]]، لأنه بيطلّع span لكل قراية ملف (وتحميل الموديولات نفسه قراية ملفات).

---

## ٤. [[sdk.start()]] و [[SIGTERM]]

~~~js
sdk.start();
process.on("SIGTERM", () => sdk.shutdown().finally(() => process.exit(0)));
~~~

- [[sdk.start()]] شغّل الكل. لازم قبل ما التطبيق يتحمّل، وده اللي [[--import]] بيضمنه.
- [[SIGTERM]] الإشارة اللي Docker و ECS و k8s بيبعتوها قبل ما يقفلوا الـ container.
- [[sdk.shutdown()]] ابعت اللي لسه في الـ buffer واقفل، و [[.finally(...)]] بعدها (نجح أو فشل) اخرج بـ [[0]].

---

## ٥. النتيجة: طلب واحد = ٤ spans

~~~bash
node --import ./instrumentation.mjs app.mjs
curl localhost:3000/orders/7
~~~

~~~text الرد
{"id":"7","total":250}
~~~

وعلى شاشة السيرفر ٤ objects، كلهم [[traceId: '5fb4b987efffdb8fcb23faf6a5545f03']]:

| [[name]] | من مين ([[instrumentationScope]]) | [[kind]] | الأب |
|---|---|---|---|
| [[GET /orders/:id]] | [[instrumentation-http]] | 1 (SERVER) | [[undefined]]: ده الـ root |
| [[middleware - patched]] | [[instrumentation-router]] | 0 (INTERNAL) | الـ root |
| [[request handler - /orders/:id]] | [[instrumentation-express]] | 0 | الـ middleware |
| [[request handler - /orders/:id]] | [[instrumentation-router]] | 0 | الـ express handler |

والـ root فيه attributes بالأسماء القياسية:

~~~text الناتج
'http.request.method': 'GET',
'url.path': '/orders/7',
'http.response.status_code': 200,
'http.route': '/orders/:id'
~~~

[[url.path]] المسار الحقيقي و [[http.route]] القالب. الأدوات بتجمّع بالقالب.

> الترتيب على الشاشة ترتيب **النهاية**: الـ root اتطبع الأول لأنه خلص أول ما الرد اتبعت، و spans الـ router خلصت بعده بلحظة. عشان تعرف مين جوه مين، بص على [[parentSpanContext.spanId]] مش على الترتيب.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[--import]] | الـ SDK يشتغل قبل express وغيره |
| [[register(hook.mjs)]] | من غيره موديولات ESM متتلفّش |
| [[service.name]] | اسم الخدمة في كل الأدوات |
| [[SimpleSpanProcessor + ConsoleSpanExporter]] | للتعلم. في الإنتاج OTLP مع batch |
| [[instrumentation-fs: false]] | من غير ضوضاء |
| [[shutdown]] على [[SIGTERM]] | آخر spans متضيعش مع كل deploy |`,
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

وكلهم فيهم [[service.name: 'orders-api']] في الـ resource. وكل span بيتطبع لما يخلص، فالترتيب على الشاشة ترتيب النهاية مش البداية: مع Express 5 الـ root بيتطبع الأول، لأنه بيخلص أول ما الرد يتبعت، وspans الـ router والـ handler بتخلص بعده بلحظة. متعتمدش على الترتيب، اعتمد على [[parentSpanContext]].

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
          teach: R`## الفكرة: span باسمك حوالين خطوة ليها معنى

الـ auto-instrumentation شايف الطلب والـ route، بس مش عارف إن جوه الـ route فيه خطوة اسمها «هات الطلب من القاعدة». الكود ده بيلف الخطوة دي في span اسمه [[db.findOrder]]، ويسجّل فيه الـ id، ولو فشلت يعلّمه بالأحمر.

اتشغّل بنفس [[instrumentation.mjs]] بتاع الدرس اللي فات، في container [[node:22-slim]]، وبعتنا [[/orders/7]] و [[/orders/0]]، وبعدين ضفنا [[shippingQuote]] اللي في الحل بـ route [[/ship]] (والـ fetch راح لـ httpbin.org فعلًا).

---

## ١. الـ tracer

~~~js
import { trace, SpanStatusCode } from "@opentelemetry/api";
const tracer = trace.getTracer("orders-api");
~~~

- [[trace.getTracer("orders-api")]] بيجيب tracer باسم. الاسم بيظهر في كل span بيعمله: [[instrumentationScope: { name: 'orders-api' }]]. فتعرف الـ span ده من كودك مش من مكتبة.
- [[SpanStatusCode]] ثوابت الحالة: [[UNSET]] = 0، و [[OK]] = 1، و [[ERROR]] = 2.
- من غير SDK الـ tracer ده no-op: الكود يشتغل عادي ومفيش spans.

---

## ٢. [[startActiveSpan(name, fn)]]

~~~js
async function findOrder(id) {
  return tracer.startActiveSpan("db.findOrder", async (span) => {
    ...
  });
}
~~~

بيعمل ٣ حاجات:

1. span جديد اسمه [[db.findOrder]]، أبوه الـ span الحالي (اللي الطلب جواه).
2. يخليه **active** جوه [[fn]]: أي span يتعمل جوه (query، أو fetch) هيبقى ابنه.
3. ينادي [[fn]] ويديها الـ span، ويرجّع اللي [[fn]] رجّعته. هنا [[fn]] [[async]]، فبيرجّع Promise، و [[return]] بيرجّعها لـ [[findOrder]].

---

## ٣. جوه الـ span

~~~js
    span.setAttribute("order.id", id);
    try {
      await new Promise((r) => setTimeout(r, 40));
      if (id === "0") throw new Error("order not found");
      return { id, total: 250 };
~~~

- [[setAttribute("order.id", id)]] خانة تقدر تدوّر بيها بعدين («كل الـ traces اللي order.id فيها ٧»). الاسم ثابت والقيمة متغيرة.
- [[new Promise((r) => setTimeout(r, 40))]] بيستنى ٤٠ مللي، مكان query حقيقية.
- [[id === "0"]] الـ id جاي من الـ URL نص، فبنقارن بـ [["0"]] مش [[0]].

### الـ [[catch]] والـ [[finally]]

~~~js
    } catch (err) {
      span.recordException(err);
      span.setStatus({ code: SpanStatusCode.ERROR, message: err.message });
      throw err;
    } finally {
      span.end();
    }
~~~

| السطر | ليه |
|---|---|
| [[recordException(err)]] | يضيف event اسمه [[exception]] فيه النوع والرسالة والـ stack |
| [[setStatus({ code: ERROR })]] | يعلّم الـ span إنه فشل. الـ exception لوحده مش بيغيّر الحالة |
| [[throw err]] | رجّع الخطأ لفوق، عشان الـ route يرد 404. الـ span بيسجّل بس، مش بيبلع الخطأ |
| [[finally { span.end() }]] | بيتنفذ في النجاح والفشل. span مبيخلصش مبيتبعتش أبدًا |

---

## ٤. الـ route

~~~js
app.get("/orders/:id", async (req, res) => {
  const traceId = trace.getActiveSpan()?.spanContext().traceId;
  try {
    res.json(await findOrder(req.params.id));
  } catch {
    res.status(404).json({ error: "not found", traceId });
  }
});
~~~

[[catch]] من غير [[(err)]] مسموح لو مش محتاج الخطأ. و [[traceId]] في رد الخطأ: اليوزر يبعتهولك، وتفتح الـ trace بتاعه على طول.

~~~text الردود
RESP 200 {"id":"7","total":250}
RESP 404 {"error":"not found","traceId":"60f0a296e4209887531791aff45ac486"}
~~~

---

## ٥. الـ span في الحالتين

~~~text /orders/7
  name: 'db.findOrder',
  kind: 0,
  duration: 41308.41,
  attributes: { 'order.id': '7' },
  status: { code: 0 },
  events: [],
~~~

~~~text /orders/0
  name: 'db.findOrder',
  kind: 0,
  duration: 40769.446,
  attributes: { 'order.id': '0' },
  status: { code: 2, message: 'order not found' },
  events: [
    {
      name: 'exception',
      attributes: {
        'exception.type': 'Error',
        'exception.message': 'order not found',
        'exception.stacktrace': 'Error: order not found\n' +
          '    at file:///app/custom.mjs:12:29\n' + ...
~~~

| الخانة | /orders/7 | /orders/0 |
|---|---|---|
| [[kind]] | 0 = INTERNAL (خطوة جوه الكود) | 0 |
| [[duration]] | ٤١٣٠٨ مايكروثانية ≈ ٤١ مللي | ≈ ٤١ مللي |
| [[status.code]] | 0 = UNSET (عادي، مفيش خطأ) | 2 = ERROR |
| [[events]] | فاضية | event [[exception]] بالسطر ([[custom.mjs:12]]) |

والـ [[traceId]] بتاع الـ span في الحالة التانية هو [[60f0a296...]]، نفس اللي رجع في الرد. والأب: [[request handler - /orders/:id]] (span الـ router). يعني [[db.findOrder]] اتعلّق تحت الطلب لوحده، من غير ما تبعت أي context بإيدك.

---

## ٦. الحل: [[shipping.quote]] حوالين [[fetch]]

نفس الشكل بالظبط، بس جواه [[fetch("https://httpbin.org/delay/1")]] (API بيستنى ثانية ويرد)، و attribute بالـ status. الـ spans اللي طلعت للطلب ده:

| span | [[kind]] | أبوه | المدة |
|---|---|---|---|
| [[GET /ship]] | 1 SERVER | (الـ root) | ٢.٣ ثانية |
| [[shipping.quote]] | 0 | الـ request handler | ٢.٣ ثانية |
| [[GET]] من [[instrumentation-undici]] | 2 CLIENT | [[shipping.quote]] | ٢.٣ ثانية |
| [[tls.connect]] من [[instrumentation-net]] | 0 | [[shipping.quote]] | ٠.٥٦ ثانية |
| [[tcp.connect]] | 0 | [[tls.connect]] | ٠.٢٣ ثانية |

الـ fetch اتعلّق تحت [[shipping.quote]] لأنه active. وظهر كمان إن ربع ثانية راحت في فتح الاتصال ونص ثانية في TLS: معلومة مكنتش هتعرفها من غير trace. (والمدة كلها ٢.٣ مش ١ ثانية، لأن httpbin نفسه كان بطيء ساعتها.)

---

## الخلاصة

| الحتة | القاعدة |
|---|---|
| [[getTracer("name")]] | tracer باسم الخدمة أو الموديول |
| [[startActiveSpan]] | اللي جواه يبقى ولاده |
| [[setAttribute]] | اسم ثابت وقيمة متغيرة. متحطش إيميلات ولا توكنات |
| [[recordException]] + [[setStatus(ERROR)]] | الاتنين، مش واحد |
| [[span.end()]] في [[finally]] | دايمًا |`,
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
          teach: R`## الفكرة: كل سطر لوج يقول هو تبع أنهي طلب وأنهي trace

الكود بيعمل middleware يدّي كل طلب request id (من الهيدر لو جاي، أو جديد)، ويرجّعه في الرد، ويعمل logger مخصوص للطلب ده بيحط الـ id في كل سطر. والـ trace id بيتضاف لوحده لما OpenTelemetry يبقى شغال.

اتشغّل في container [[node:22-slim]] بـ pino 10.4.0 و Express 5، مرة [[node logs.mjs]] ومرة مع OpenTelemetry. ونسخة الـ SDK في التجربة دي كان الـ exporter بتاعها ساكت (بيرمي الـ spans)، عشان الشاشة تبقى للوج بس. وضفنا middleware الحل ([[x-trace-id]]) وطلب تاني من غير هيدر.

---

## ١. الـ imports والـ logger

~~~js
import express from "express";
import pino from "pino";
import { randomUUID } from "node:crypto";

const logger = pino();
const app = express();
~~~

- [[pino()]] logger بيطبع كل سطر JSON على stdout. سريع، وده اللي CloudWatch و Loki بيحبوه.
- [[randomUUID()]] من [[node:crypto]]: رقم عشوائي فريد شكله [[5d954ef8-ce7a-493c-8c8c-091db671dfa8]].

---

## ٢. الـ middleware

~~~js
app.use((req, res, next) => {
  req.id = req.get("x-request-id") ?? randomUUID();
  res.set("x-request-id", req.id);
  req.log = logger.child({ requestId: req.id });
  next();
});
~~~

| السطر | معناه |
|---|---|
| [[req.get("x-request-id")]] | اقرا الهيدر ده من الطلب. لو مش موجود بيرجّع [[undefined]] |
| [[?? randomUUID()]] | لو [[undefined]]، اعمل id جديد |
| [[req.id = ...]] | احفظه على الطلب نفسه، عشان أي حتة بعد كده تشوفه |
| [[res.set("x-request-id", req.id)]] | رجّعه في الرد، فالعميل يقدر يقولك «الطلب ده رقمه كذا» |
| [[logger.child({ requestId })]] | logger جديد، كل سطر منه فيه [[requestId]] لوحده |
| [[req.log = ...]] | حطه على الطلب، فالـ route يكتب [[req.log.info]] |

لو جاي من Nginx أو load balancer بـ [[x-request-id]]، بتاخده زي ما هو، فنفس الرقم يبقى في لوجات Nginx ولوجاتك.

---

## ٣. الـ route

~~~js
app.get("/orders/:id", (req, res) => {
  req.log.info({ orderId: req.params.id }, "loading order");
  res.json({ ok: true });
});
~~~

[[req.log.info(obj, msg)]]: الـ object الأول بيتدمج في السطر كخانات، والنص هو [[msg]]. [[info]] مستوى اللوج، و pino بيكتبه رقم: [[30]] (و [[40]] warn، و [[50]] error).

---

## ٤. التشغيل

~~~js
const server = app.listen(3000, async () => {
  await fetch("http://localhost:3000/orders/7", { headers: { "x-request-id": "req-abc-123" } });
  server.close();
});
~~~

يبعت طلب واحد بـ request id معروف ويقفل.

---

## ٥. من غير OpenTelemetry

~~~text الناتج
{"level":30,"time":1791466863468,"pid":1,"hostname":"d636a71b7454","requestId":"req-abc-123","orderId":"7","msg":"loading order"}
{"level":30,"time":1791466863481,"pid":1,"hostname":"d636a71b7454","requestId":"1189f9ec-7fa0-405d-9630-b7289163675a","orderId":"8","msg":"loading order"}
~~~

| الخانة | منين |
|---|---|
| [[level: 30]] | [[info]] |
| [[time]] | مللي ثانية من ١٩٧٠ |
| [[pid]] و [[hostname]] | pino بيضيفهم لوحده (هنا اسم الـ container) |
| [[requestId]] | الـ child logger: [[req-abc-123]] اللي بعتناه، والطلب التاني من غير هيدر أخد UUID |
| [[orderId]] و [[msg]] | من السطر نفسه |

---

## ٦. مع OpenTelemetry

~~~bash
node --import ./instrumentation.mjs logs.mjs
~~~

~~~text الناتج
{"level":30,...,"requestId":"req-abc-123","trace_id":"069517ebf9b7e2f4275211b0f1e1385e","span_id":"5cf3945c7c59146d","trace_flags":"01","orderId":"7","msg":"loading order"}
~~~

نفس الكود، وزاد ٣ خانات:

| الخانة | معناها |
|---|---|
| [[trace_id]] | رقم الرحلة كلها (١٦ byte) |
| [[span_id]] | الـ span اللي كان active وقت السطر ده |
| [[trace_flags: "01"]] | الـ trace ده sampled (بيتسجّل) |

مين حطهم؟ [[instrumentation-pino]] (جوه الـ auto-instrumentations): بيلف pino ويسأل عن الـ span الـ active مع كل سطر.

---

## ٧. الحل: [[x-trace-id]] في الرد

~~~js
app.use((req, res, next) => {
  const traceId = trace.getActiveSpan()?.spanContext().traceId;
  if (traceId) res.set("x-trace-id", traceId);
  next();
});
~~~

[[if (traceId)]] عشان من غير SDK ميحطش هيدر فاضي. الهيدرز اللي رجعت للطلب الأول:

~~~text من غير OTel
x-request-id: req-abc-123   x-trace-id: null
~~~

~~~text مع OTel
x-request-id: req-abc-123   x-trace-id: 069517ebf9b7e2f4275211b0f1e1385e
~~~

[[null]] يعني الهيدر مش موجود. ومع OTel الرقم في الهيدر هو نفسه [[trace_id]] اللي في سطر اللوج. فالعميل يبعتلك أي رقم من الاتنين، وتلاقي اللوجات والـ trace.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[x-request-id]] أو [[randomUUID()]] | رقم لكل طلب، ومن برا لو جاي |
| [[res.set("x-request-id")]] | العميل يشوف الرقم |
| [[logger.child({ requestId })]] | الرقم في كل سطر من غير ما تكتبه |
| [[instrumentation-pino]] | [[trace_id]] و [[span_id]] لوحدهم |
| [[x-trace-id]] | الـ trace id للعميل كمان |`,
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
          teach: R`## الفكرة: الكود ثابت، ومتغيرات البيئة بتقول الـ traces رايحة فين

بدل الـ console exporter، الـ SDK بيبعت الـ spans بـ OTLP (OpenTelemetry Protocol) لأي backend بيفهمه. والمثال كله أوامر ترمنال: شغّل Jaeger، وحط ٤ متغيرات بيئة، وشغّل التطبيق، واتأكد إن Jaeger شاف الخدمة.

اتجرّب: Jaeger v2.22.0 (الـ image الرسمي [[jaegertracing/jaeger]]، حوالي ١٧٥ ميجا) في Docker، و [[two.mjs]] من أول درس بملف [[instrumentation.prod.mjs]] اللي في الحل، في container [[node:22-slim]] على نفس شبكة Docker (فالعنوان كان [[http://jaeger:4318]] بدل localhost، وبورت الـ UI على الجهاز كان 26686 عشان 16686 مش فاضي). جزء Honeycomb من الـ docs (محتاج حساب).

---

## ١. Jaeger

~~~bash
docker run -d --name jaeger -p 16686:16686 -p 4318:4318 jaegertracing/jaeger:latest
~~~

| الحتة | معناها |
|---|---|
| [[-d]] | شغّله في الخلفية |
| [[--name jaeger]] | اسم الـ container |
| [[-p 16686:16686]] | الـ UI (صفحة الويب) |
| [[-p 4318:4318]] | استقبال OTLP على HTTP. فيه كمان 4317 لـ gRPC، بس احنا بنبعت HTTP |
| [[jaegertracing/jaeger]] | Jaeger v2: image واحد فيه الاستقبال والتخزين (في الرام) والـ UI |

التخزين في الرام: لو الـ container اتقفل الـ traces بتروح. للتجربة ده كفاية.

---

## ٢. المتغيرات

~~~bash
export OTEL_SERVICE_NAME=orders-api
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
export OTEL_METRICS_EXPORTER=none
export OTEL_TRACES_SAMPLER=parentbased_traceidratio OTEL_TRACES_SAMPLER_ARG=0.2
~~~

[[export]] في bash بيخلّي المتغير يوصل لأي برنامج يتشغّل بعده من نفس الترمنال. (في PowerShell: [[$env:OTEL_SERVICE_NAME = "orders-api"]].)

| المتغير | معناه |
|---|---|
| [[OTEL_SERVICE_NAME]] | اسم الخدمة (بدل الـ resource في الكود) |
| [[OTEL_EXPORTER_OTLP_ENDPOINT]] | العنوان **الأساسي**. الـ SDK بيزوّد [[/v1/traces]] لوحده |
| [[OTEL_METRICS_EXPORTER=none]] | متبعتش metrics (Jaeger بياخد traces بس) |
| [[OTEL_TRACES_SAMPLER]] | طريقة الـ sampling (تحت) |
| [[OTEL_TRACES_SAMPLER_ARG=0.2]] | النسبة: ٢٠٪ |

---

## ٣. [[instrumentation.prod.mjs]]

~~~js
const sdk = new NodeSDK({
  instrumentations: [getNodeAutoInstrumentations({ "@opentelemetry/instrumentation-fs": { enabled: false } })],
});
sdk.start();
process.on("SIGTERM", () => sdk.shutdown().finally(() => process.exit(0)));
process.once("beforeExit", () => sdk.shutdown().catch((err) => console.error("otel:", err.message)));
~~~

الفرق عن ملف الدرس اللي فات: **مفيش** [[resource]] ولا [[spanProcessors]]. فالـ SDK بياخد الاسم من [[OTEL_SERVICE_NAME]]، والـ exporter من البيئة (الافتراضي OTLP)، وبيستخدم [[BatchSpanProcessor]]: بيجمّع الـ spans ويبعتهم دفعة كل شوية بدل كل span لوحده.

### ليه [[beforeExit]]؟

[[two.mjs]] بيخلص في أقل من ثانية، والـ batch لسه متبعتش. [[beforeExit]] حدث بيحصل لما Node مبقاش عنده شغل وقرّب يخرج، فبنعمل [[shutdown()]] اللي بيبعت اللي في الـ buffer. و [[process.once]] (مش [[on]]) عشان ميتكررش: الـ shutdown نفسه بيعمل شغل، فـ [[beforeExit]] ممكن ييجي تاني.

و [[.catch(...)]] مهمة. جرّبنا نوجّهه لبورت مفيهوش حد:

~~~text الناتج
B active traceId:   dbf70a18365b8655d9c90c68b84ec0af
otel: connect ECONNREFUSED 127.0.0.1:4318
~~~

التطبيق كمّل وطبع سطر واضح. من غير [[catch]] الـ Promise المرفوضة كانت هتبقى unhandled rejection والـ process يقع.

---

## ٤. التشغيل والتأكد

~~~bash
node --import ./instrumentation.prod.mjs two.mjs
curl -s localhost:16686/api/v3/services
~~~

~~~text الناتج
A active traceId:   0960b98a5849cd4e9cbfe19b848af280
B got traceparent: 00-0960b98a5849cd4e9cbfe19b848af280-4b380f7e62d35331-01
B active traceId:   0960b98a5849cd4e9cbfe19b848af280
{"services":["orders-api"]}
~~~

[[/api/v3/services]] الـ API بتاع Jaeger v2: الخدمات اللي وصلها منها traces. والـ trace ده في Jaeger (من الـ API بتاعه، نفس اللي بيترسم waterfall في الـ UI):

~~~text الـ trace في Jaeger
GET  client  3a0d413e...  parent -           41.5ms
GET  server  454948ba...  parent 3a0d413e... 21.3ms
GET  client  4b380f7e...  parent 454948ba... 11.8ms
GET  server  49bad6c0...  parent 4b380f7e...  3.7ms
~~~

٤ spans، كلهم اسمهم [[GET]]: الـ fetch الأولاني (root)، و A بتستقبل، و A بتكلّم B، و B بتستقبل. كل واحد جوه اللي قبله وأقصر منه. ولاحظ [[4b380f7e...]]: هو نفسه اللي في الـ [[traceparent]] اللي B استقبله.

---

## ٥. الـ sampling: [[parentbased_traceidratio]]

اسم طويل لقاعدتين:

1. **parentbased**: لو الطلب جاي ومعاه [[traceparent]]، اعمل زي الأب: لو الأب [[-01]] سجّل، لو [[-00]] متسجّلش. عشان الـ trace ميبقاش نصه متسجّل ونصه لأ.
2. **traceidratio**: لو انت أول واحد (مفيش أب)، قرّر بالـ trace id نفسه: سجّل ٢٠٪.

شغّلنا [[two.mjs]] ١٠ مرات بالـ sampler ده، باسم خدمة جديد عشان نعدّ لوحده:

~~~text اللي ظهر في Jaeger (عدد الـ spans لكل trace)
e7bbe978d6751ee0108fe042249259c4: 4
f727a96a482ff46af805f08e43f753e7: 4
~~~

trace-ين من ١٠، يعني ٢٠٪ بالظبط المرة دي. ومع إن A طبعت trace id في الـ ١٠ مرات كلهم: الـ trace اللي متسجّلش ليه رقم برضه، بس الـ spans بتاعته مش بتتبعت.

النسبة احتمالات، فـ ١٠ تشغيلات مش هتطلع ٢ بالظبط كل مرة. بس كل trace اتسجّل اتسجّل **كامل** بالـ ٤ spans، لأن A و B اتبعوا قرار الـ root.

---

## ٦. Honeycomb (من الـ docs)

~~~bash
export OTEL_EXPORTER_OTLP_ENDPOINT=https://api.honeycomb.io
export OTEL_EXPORTER_OTLP_HEADERS="x-honeycomb-team=YOUR_API_KEY"
~~~

نفس الكود من غير ولا تعديل. [[OTEL_EXPORTER_OTLP_HEADERS]] هيدرز بتتبعت مع كل طلب بشكل [[key=value]] (ولو أكتر من واحد بينهم [[,]])، وده مكان المفتاح. والمفتاح ده سر: متغير بيئة على السيرفر أو في الـ Collector، مش في الكود ولا في الـ frontend.

---

## الخلاصة

| المتغير | القيمة في المثال |
|---|---|
| [[OTEL_SERVICE_NAME]] | اسم الخدمة |
| [[OTEL_EXPORTER_OTLP_ENDPOINT]] | [[http://localhost:4318]] من غير [[/v1/traces]] |
| [[OTEL_EXPORTER_OTLP_HEADERS]] | مفتاح الـ backend لو SaaS |
| [[OTEL_METRICS_EXPORTER=none]] | لو الـ backend traces بس |
| [[OTEL_TRACES_SAMPLER=parentbased_traceidratio]] + [[ARG=0.2]] | ٢٠٪ من الـ traces الجديدة، واتبع الأب |

والكود: [[NodeSDK]] من غير exporter، و [[shutdown()]] في [[SIGTERM]] و [[beforeExit]].`,
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
          sol: R`بعد التشغيل، [[curl -s localhost:16686/api/v3/services]] يرجّع حاجة زي [[{"services":["orders-api"]}]]، وبعد ما تفتح الـ UI أو تسأل الـ API بتظهر جنبها [[jaeger]] نفسه (Jaeger بيعمل traces لنفسه). (لو رجّع فاضي على طول بعد التشغيل، استنى ثانيتين: الـ batch بيتبعت كل شوية.)

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
          teach: R`## الفكرة: Next.js بينادي [[register()]] مرة لما السيرفر يقوم

ملف [[instrumentation.ts]] ليه اسم ومكان محددين، و Next.js بيدوّر عليه لوحده. أي حاجة جوه [[register()]] بتتنفذ مرة واحدة قبل أول طلب، وده المكان المظبوط لتشغيل OpenTelemetry. والمثال فيه طريقتين: الأولى سطر واحد بـ [[@vercel/otel]]، والتانية [[NodeSDK]] بإيدك.

اتجرّب الطريقة الأولى: مشروع Next.js 16.4.0 صغير فيه صفحة [[app/products/[id]/page.tsx]] بتعمل [[fetch]] من السيرفر، و [[@vercel/otel]] 2.1.3، في container [[node:22-slim]]، و [[npm run build]] ثم [[npm start]] والـ spans راحت لـ Jaeger v2.22. الطريقة التانية (NodeSDK) ونسخ Next القديمة من الـ docs.

---

## ١. الطريقة الأولى: [[@vercel/otel]]

~~~ts
// instrumentation.ts (في جذر المشروع)
import { registerOTel } from "@vercel/otel";
export function register() {
  registerOTel({ serviceName: "shop-web" });
}
~~~

| السطر | معناه |
|---|---|
| [[instrumentation.ts]] | الاسم ده بالظبط، جنب [[app/]] (أو جوه [[src/]] لو المشروع عامل كده) |
| [[export function register()]] | الاسم ده بالظبط. Next بيناديها وقت ما السيرفر يقوم |
| [[registerOTel({ serviceName })]] | يعمل الـ SDK والـ exporter، والاسم هو [[service.name]] |

مفيش عنوان للـ backend في الكود: [[@vercel/otel]] بيقرا [[OTEL_EXPORTER_OTLP_ENDPOINT]] زي أي SDK.

### التشغيل

~~~bash
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 npm run build && npm start
~~~

خلي بالك: الصيغة [[VAR=x cmd1 && cmd2]] بتحط المتغير لـ [[cmd1]] بس، يعني [[npm start]] (اللي بيبعت الـ spans فعلًا) مش شايفه. في المثال ده مش فارقة، لأن [[http://localhost:4318]] هو العنوان الافتراضي أصلًا. بس لو الـ backend في مكان تاني (في التجربة كان [[http://jaeger:4318]]) لازم المتغير يوصل لـ [[npm start]]: حطه قدامه هو كمان، أو [[export]] الأول.

~~~text الناتج (آخر الـ build)
Route (app)
┌ ○ /_not-found
└ ƒ /products/[id]

ƒ  (Dynamic)  server-rendered on demand
~~~

[[ƒ]] يعني الصفحة بتترندر على السيرفر مع كل طلب، فكل طلب = trace.

---

## ٢. الـ trace في Jaeger

فتحنا [[/products/7]]، والصفحة بتعمل [[fetch]] لـ API تاني. ده الـ trace (المسافة قدام الاسم = ابن اللي فوقه):

~~~text الـ spans
GET /products/[id]                                   SERVER   86.1ms
  resolve page components                                       0.6ms
  prepare route module                                          6.1ms
  render route (app) /products/[id]                            50.6ms
    build component tree                                        3.9ms
    fetch GET http://jaeger:16686/api/v3/services    CLIENT   34.1ms
  NextNodeServer.clientComponentLoading                        15.2ms
    start response                                              0.1ms
~~~

- الـ root اسمه بالـ route ([[/products/[id]]])، مش الـ URL الحقيقي ([[/products/7]]): كل المنتجات بتتجمّع مع بعض.
- [[render route]] هو رسم الصفحة، والـ [[fetch]] جواه بياخد ٣٤ من الـ ٥٠ مللي. ده بالظبط نوع الإجابة اللي الـ trace بيديهالك.
- الـ [[fetch]] span جاي من [[@vercel/otel/fetch]]، والباقي من [[next.js]] نفسه.

وكمان طلعت spans لوحدها وقت قيام السيرفر ([[load instrumentation module]] و [[register instrumentation]] و [[load route module]]) من غير ما نفتح صفحة.

> لو بتقرا الأرقام من OTLP JSON مباشرة: [[kind]] هناك 2 = SERVER و 3 = CLIENT و 1 = INTERNAL، غير أرقام الـ JavaScript API (1 و 2 و 0) اللي شفناها في الـ console exporter. نفس المعنى، ترقيم مختلف.

---

## ٣. الطريقة التانية: [[NodeSDK]] بإيدك (من الـ docs)

~~~ts
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./instrumentation.node");
  }
}
~~~

| الحتة | ليه |
|---|---|
| [[async]] | عشان [[await import]] جواها |
| [[process.env.NEXT_RUNTIME]] | Next بيحط فيه [["nodejs"]] أو [["edge"]]. و [[register]] بتتنادى مرة لكل runtime |
| [[=== "nodejs"]] | NodeSDK بيستخدم موديولات Node ([[fs]] و [[http]]) اللي مش موجودة في Edge |
| [[await import("./instrumentation.node")]] | dynamic import: الملف ده مبيتحمّلش (ومبيدخلش bundle الـ Edge) غير جوه الشرط |

لو عملت [[import]] لـ NodeSDK في أول [[instrumentation.ts]] بدل كده، الـ build بيقع بأخطاء زي [[Module not found: Can't resolve 'fs']].

~~~ts
// instrumentation.node.ts
const sdk = new NodeSDK({
  resource: resourceFromAttributes({ [ATTR_SERVICE_NAME]: "shop-web" }),
  traceExporter: new OTLPTraceExporter(),
});
sdk.start();
~~~

نفس [[NodeSDK]] بتاع الدروس اللي فاتت، بس بـ [[traceExporter]]: [[OTLPTraceExporter()]] من غير عنوان (بياخده من البيئة)، و [[traceExporter]] معناها [[BatchSpanProcessor]] لوحده.

> المثال فيه [[register]] مرتين: دول **بديلين**، اختار واحد. لو حطيت الاتنين في نفس الملف TypeScript هيشتكي من دالة متعرّفة مرتين.

---

## الخلاصة

| الحاجة | القاعدة |
|---|---|
| مكان الملف | جذر المشروع جنب [[app/]]، أو [[src/]]. مش جوه [[app/]] |
| [[register()]] | بتتنادى مرة لكل runtime قبل أول طلب |
| [[@vercel/otel]] | سطر واحد، و Node و Edge |
| [[NodeSDK]] | جوه [[if (NEXT_RUNTIME === "nodejs")]] و dynamic import |
| العنوان | [[OTEL_EXPORTER_OTLP_ENDPOINT]] لازم يوصل لـ [[npm start]] نفسه |
| القياس | [[next build]] و [[next start]]، مش [[next dev]] |`,
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
    }
]);
