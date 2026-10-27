// تكملة تاب arch: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/arch/01.js (شرح حقول الدرس في أوله)
MORE("arch", [
    {
      t: "Microservices: الأخطاء والداتا الموزعة",
      l: 3,
      n: "مفيش transaction بين خدمتين: saga بخطوات وتعويض لكل خطوة، وكل مستهلك بيستحمل نفس الرسالة مرتين، و trace id واحد بيمشي مع الطلب في كل الخدمات",
      items: [
        {
          cmd: "saga و compensation",
          title: "عملية على خدمتين: كل خطوة ليها عكس لو اللي بعدها فشل",
          desc: R`في monolith: [[BEGIN]]، احجز المخزون، اعمل الطلب، ادفع، [[COMMIT]]، ولو أي حاجة فشلت [[ROLLBACK]]. بين خدمتين كل واحدة ليها قاعدتها، فمفيش transaction واحدة.

الـ saga: سلسلة transactions محلية، كل واحدة في خدمة، وبتنشر حدث يشغّل اللي بعدها. ولو خطوة فشلت، الخطوات اللي اتعملت قبلها بتتلغي بـ **compensation**: عملية عكسية حقيقية (رجّع المخزون، الغي الطلب، رجّع الفلوس)، مش rollback. والحالة في النص ([[PENDING]]) بتبان لليوزر، فلازم تبقى حالة واضحة في الداتا.`,
          example: R`await ch.consume("orders.payment-results", (msg) => {
  const evt = JSON.parse(msg.content);
  const order = orders.get(evt.orderId);
  if (order?.status === "PENDING") {
    if (msg.fields.routingKey === "payment.succeeded") {
      order.status = "CONFIRMED";
    } else {
      order.status = "CANCELLED";
      stock += order.qty;
    }
  }
  ch.ack(msg);
});`,
          try: R`على ديمو «خدمتين بـ docker compose»: payments بترفض أي طلب أكبر من ٥٠٠٠٠ (٥٠٠ جنيه). اعمل طلب [[{"qty":2,"totalCents":60000}]]، وبعد ثانية هات الطلب. الحالة إيه؟ والمخزون؟ وبص في [[docker compose logs orders payments --no-log-prefix]] على الخطوات بالترتيب.`,
          flag: "script",
          deep: {
            why: "أي عملية business بتلمس أكتر من خدمة (طلب ودفع ومخزون وشحن) هتقابل الفشل في النص. من غير saga واضحة: مخزون محجوز لطلبات اتلغت، أو فلوس اتخصمت لطلب مش موجود، ومحدش يعرف الحالة الحقيقية. وسؤال «إزاي تعمل transaction بين خدمتين» من أشهر أسئلة الانترفيو.",
            how: R`الخطوات في الديمو:
1. orders: احجز المخزون، الطلب [[PENDING]]، انشر [[order.created]] (transaction محلية).
2. payments: ادفع أو ارفض، انشر [[payment.succeeded]] أو [[payment.failed]].
3. orders: لو نجح [[CONFIRMED]]. لو فشل: **compensation** = [[CANCELLED]] ورجّع المخزون.

نوعين:
- **choreography** (الديمو): مفيش مدير. كل خدمة بتسمع وتنشر. بسيط لخطوتين أو تلاتة، وكل خدمة مستقلة. بس مع ٦ خطوات صعب تعرف «الـ saga دي فين دلوقتي» من غير ما تقرا كل الخدمات.
- **orchestration**: خدمة (أو workflow engine زي Temporal، أو AWS Step Functions) بتمسك الـ saga: «ابعت للدفع، استنى، لو فشل ابعت للمخزون رجّع». الحالة في مكان واحد، وأسهل في الـ timeouts والمراقبة، وفيه نقطة مركزية.

قواعد:
- **الحالات الوسطى ظاهرة**: [[PENDING]] حالة حقيقية، والـ UI بيعرضها («بنأكد الدفع»). مفيش isolation زي الـ transaction: حد تاني ممكن يشوف الطلب في النص.
- **الـ compensation idempotent**: ممكن الحدث يوصل مرتين. الشرط [[order?.status === "PENDING"]] بيمنع إن المخزون يرجع مرتين (الحدث المكرر بيلاقي [[CANCELLED]] فمبيعملش حاجة). ده نفس الشرط اللي بيحمي من حدث متأخر بعد ما الطلب اتأكد.
- **مش كل حاجة ليها عكس**: الإيميل اتبعت، فالعكس إيميل «اتلغى». خلي الخطوات اللي ملهاش عكس (pivot) في الآخر: ابعت الإيميل بعد الدفع، مش قبله.
- **timeout للـ saga**: لو payments مردتش خالص؟ job بيدوّر على [[PENDING]] أقدم من ١٥ دقيقة ويقرر (يسأل payments، أو يلغي). من غيره، طلبات بتفضل [[PENDING]] للأبد.
- **النشر بـ outbox**: لو orders حفظت ووقعت قبل ما تنشر، الـ saga مبتبدأش أصلًا (درس [[transactional outbox]] في تاب «APIs متقدمة»).

two-phase commit (2PC) بين قواعد الخدمات: نظريًا موجود، عمليًا مش بيتعمل في microservices: بيقفل الموارد مستني كل الأطراف، وأي طرف يقع يوقّف الكل، والـ brokers والـ APIs الخارجية (Stripe) مبتدعموش.`,
            when: "أي عملية بتكتب في أكتر من خدمة ولازم تنجح كلها أو تتلغي كلها: طلب ودفع، وحجز وتأكيد، وتحويل فلوس. ولو الخطوتين ممكن يبقوا في خدمة واحدة، ده غالبًا أحسن من saga.",
            mistakes: R`compensation مش idempotent فالمخزون يرجع مرتين. مفيش timeout فالطلبات تتعلق [[PENDING]]. خطوة ملهاش عكس (إيميل، أو شحن) في أول الـ saga. حدث متأخر ([[payment.succeeded]] بعد ما الطلب اتلغى بالـ timeout) بيرجّع الطلب [[CONFIRMED]] من غير شرط على الحالة. تفتكر إن الـ compensation = rollback (الحدث الأول اتشاف واتعمل عليه حاجات).`
          },
          teach: R`## طلب بـ ٦٠٠ جنيه، والدفع بيرفض

المثال هو الـ consumer اللي في orders (من [[orders/server.mjs]] في ديمو «خدمتين بـ docker compose»، من غير سطور اللوج). هو اللي بيكمّل الـ saga أو بيعوّضها.

اتجرّب على الديمو ده بـ Docker Desktop على ويندوز 11.

---

## ١. الحدث

~~~js
const evt = JSON.parse(msg.content);
const order = orders.get(evt.orderId);
~~~

[[msg.content]] Buffer، و [[JSON.parse]] بيقبله (بيحوّله نص الأول). و [[evt.orderId]] من payments.

## ٢. الشرط

~~~js
if (order?.status === "PENDING") {
~~~

[[?.]] (optional chaining): لو [[order]] [[undefined]] (طلب مش موجود)، النتيجة [[undefined]] من غير error. وبنكمّل بس لو الطلب لسه [[PENDING]]. ده بيخلي الـ handler idempotent: حدث مكرر أو متأخر مبيغيرش طلب اتحسم.

## ٣. نجح أو فشل

~~~js
if (msg.fields.routingKey === "payment.succeeded") {
  order.status = "CONFIRMED";
} else {
  order.status = "CANCELLED";
  stock += order.qty;
}
~~~

الـ routing key هو نوع الحدث. والـ [[else]] هو الـ compensation: الطلب يتلغي، والمخزون اللي اتحجز في الخطوة ١ يرجع.

## ٤. التجربة

~~~bash
curl -s -X POST localhost:8080/api/orders -H "content-type: application/json" -d '{"qty":2,"totalCents":60000}'
curl -s localhost:8080/api/orders/9006
~~~

~~~text الناتج
{"id":9006,"qty":2,"totalCents":60000,"status":"PENDING"}
{"id":9006,"qty":2,"totalCents":60000,"status":"CANCELLED","stock":2}
~~~

المخزون كان ٢ قبل الطلب، والطلب حجز ٢ (بقى ٠)، والـ compensation رجّعهم: ٢.

## ٥. الخطوات في اللوج

~~~text الناتج (docker compose logs orders payments --no-log-prefix، مرتّب بالوقت)
{"svc":"orders","traceId":"dee957635ccad6380868e336996d70dd","msg":"order created, event published","orderId":9006,"eventId":"e9ccef8b-10c0-4ed5-abc3-1a152250076f"}
{"svc":"payments","traceId":"dee957635ccad6380868e336996d70dd","msg":"charged","orderId":9006,"status":"declined"}
{"svc":"orders","traceId":"dee957635ccad6380868e336996d70dd","msg":"compensated: stock released","orderId":9006,"stock":2}
{"svc":"orders","traceId":"dee957635ccad6380868e336996d70dd","msg":"payment result","orderId":9006,"event":"payment.failed","status":"CANCELLED"}
~~~

| الخطوة | الخدمة | transaction محلية | الحدث |
|---|---|---|---|
| ١ | orders | حجز ٢، [[PENDING]] | [[order.created]] |
| ٢ | payments | رفض (أكبر من ٥٠٠٠٠) | [[payment.failed]] |
| ٣ | orders | compensation: رجّع ٢، [[CANCELLED]] | (خلاص) |

---

## الخلاصة

- saga = transactions محلية + أحداث بينهم + compensation لكل خطوة.
- الحالة الوسطى ([[PENDING]]) حقيقية وظاهرة.
- الشرط على الحالة بيخلي الـ compensation idempotent.
- choreography (الديمو) لخطوات قليلة، و orchestration (Temporal، أو Step Functions) لما تكتر.`,
          lines: [
            "استهلك نتايج الدفع من queue الطلبات.",
            "فك الحدث.",
            "هات الطلب من داتا orders.",
            "كمّل بس لو الطلب لسه مستني (الحدث المكرر أو المتأخر مبيعملش حاجة).",
            "لو الدفع نجح:",
            "أكّد الطلب.",
            "لو فشل:",
            "compensation: الغي الطلب.",
            "ورجّع المخزون اللي اتحجز.",
            "قفلة الـ if الجوانية.",
            "قفلة الـ if البرانية.",
            "ack.",
            "قفلة الـ consumer."
          ],
          sol: R`الطلب بيرجع [[PENDING]] الأول، وبعد ثانية [[CANCELLED]]، والمخزون رجع زي ما كان قبل الطلب. واللوج بالترتيب: [[order created]] من orders، و [[charged ... declined]] من payments، و [[compensated: stock released]] و [[payment result ... CANCELLED]] من orders، وكلهم بنفس الـ [[traceId]].

(اتجرّب بـ Docker Desktop على ويندوز 11.)`
        },
        {
          cmd: "idempotency بين الخدمات",
          title: "نفس الحدث أو نفس الطلب مرتين، والأثر مرة واحدة",
          desc: R`بين الخدمات، الرسالة الواحدة ممكن توصل مرتين في أي وقت: الـ broker بيعيدها لو الـ ack ضاع، والـ caller بيعمل retry لو الـ timeout خلص والرد كان في الطريق، والـ outbox relay بينشر تاني لو وقع قبل ما يعلّم. فكل مستهلك وكل endpoint بيكتب لازم يبقى idempotent.

الطريقة: id ثابت بيتولد عند المصدر ([[eventId]] للحدث، و [[orderId]] أو [[Idempotency-Key]] للطلب)، والمستهلك بيسجّله **في مخزن دايم** في نفس الـ transaction مع الأثر، ولو شافه قبل كده يرجّع نفس النتيجة من غير ما يعيد الشغل.`,
          example: R`curl -s -u guest:guest -X POST "localhost:15672/api/exchanges/%2F/events/publish" -H "content-type: application/json" -d '{"properties":{"headers":{"traceparent":"00-dee957635ccad6380868e336996d70dd-0000000000000001-01"}},"routing_key":"order.created","payload":"{\"eventId\":\"e9ccef8b-10c0-4ed5-abc3-1a152250076f\",\"orderId\":9006,\"totalCents\":60000}","payload_encoding":"string"}'
docker compose logs payments --no-log-prefix | tail -2
docker compose exec -T orders node -e 'fetch("http://payments:3000/charges",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({orderId:9002,totalCents:25000})}).then(async r=>console.log(r.status, await r.text()))'`,
          try: R`على الديمو بعد درس «saga و compensation»: خد الـ [[eventId]] والـ [[traceId]] بتوع طلب 9006 من [[docker compose logs orders]]، وحطهم في أول أمر، وشغّله: payments عملت إيه؟ وبعدين شغّل التالت مرتين ورا بعض. ليه أول مرة مقالتش [[duplicate]] رغم إن 9002 اتدفع قبل كده؟`,
          flag: "script",
          deep: {
            why: "at-least-once هو الواقع في كل الـ brokers والـ HTTP retries. خدمة الدفع اللي مش idempotent بتخصم مرتين، وخدمة المخزون بتحجز مرتين، وده بيحصل في الإنتاج تحت الضغط بالظبط (deploys، و timeouts، و rebalances)، مش في التطوير.",
            how: R`المفاتيح:
- **للأحداث**: [[eventId]] بيتولد مرة عند الـ producer ([[randomUUID()]] جوه الـ outbox)، ونفس الـ id في كل إعادة. المستهلك بيسجّل [[(consumer, eventId)]] (inbox).
- **للطلبات المتزامنة**: [[Idempotency-Key]] header من الـ client (درس [[Idempotency-Key]] في المستوى ١ من تاب «APIs متقدمة»)، أو مفتاح business طبيعي: [[orderId]] في الدفع (طلب واحد = دفعة واحدة). الديمو بيستخدم الـ [[orderId]]: [[charges.has(orderId)]].
- **في المكالمات لبرّه**: ابعت نفس المفتاح للمزوّد (Stripe بيقبل [[Idempotency-Key]]) عشان retry منك ميعملش دفعتين عنده.

المخزن لازم يبقى **دايم**: الديمو حاطط [[processed]] و [[charges]] في الذاكرة، فلما payments اتعملها restart (في درس «HTTP ولا events») نسيت إن 9002 اتدفع، والنداء الأول قبل التكرار عمل دفعة **جديدة**. في الحقيقة: جدول [[processed_events]] بـ PRIMARY KEY، و [[INSERT ... ON CONFLICT DO NOTHING]] في نفس الـ transaction مع الأثر (درس «Kafka idempotent consumer» في تاب «APIs متقدمة»). و UNIQUE على [[charges.order_id]] كمان، كحماية أخيرة.

في الديمو الترتيب: انشر النتيجة، استنى الـ confirm، سجّل الـ eventId، ack. لو وقعت بعد النشر وقبل التسجيل، الحدث هيتعاد ونتيجة الدفع تتنشر تاني: ومستهلك orders عنده الشرط [[status === "PENDING"]] فمش هيتأثر. كل خطوة في السلسلة بتحمي نفسها.

ومدة الاحتفاظ: سجل الـ ids لازم يعيش أطول من أي retry ممكن (أيام). بعدها امسح القديم بـ job.`,
            when: "كل consumer وكل endpoint بيكتب ويتنادى من خدمة تانية. والـ GET و PUT بقيمة كاملة idempotent بطبيعتهم، فالشغل الحقيقي في POST وفي العمليات اللي بتزوّد (عدّاد، أو رصيد).",
            mistakes: R`سجل الـ ids في الذاكرة أو في Redis من غير persistence. الـ eventId بيتولد عند كل إعادة نشر. تسجّل الـ id قبل الشغل في transaction منفصلة (لو الشغل فشل، الإعادة هتتعدّى ومحدش هيعمل الشغل). تفتكر إن «exactly once» في الـ broker بيكفي. retry في الـ client من غير Idempotency-Key على POST.`
          },
          teach: R`## حدث مكرر، و retry على HTTP

الأمر الأول بينشر نسخة تانية من [[order.created]] بتاع طلب 9006 (بنفس الـ [[eventId]]) عن طريق HTTP API بتاع الـ management plugin، كأن الـ broker عاد الرسالة. التاني بيبص على لوج payments. والتالت بينادي [[POST /charges]] من جوه container الـ orders لطلب اتدفع قبل كده.

اتجرّب على ديمو «خدمتين بـ docker compose»، من Git Bash على ويندوز 11.

---

## ١. نشر من الـ management API

~~~bash
curl -s -u guest:guest -X POST "localhost:15672/api/exchanges/%2F/events/publish" -H "content-type: application/json" -d '{...}'
~~~

| الحتة | معناها |
|---|---|
| [[-u guest:guest]] | Basic auth للـ management API |
| [[%2F]] | الـ vhost [[/]] مكتوب URL-encoded (الـ [[/]] = [[%2F]]) |
| [[events/publish]] | انشر على exchange اسمه [[events]] |
| [[properties.headers.traceparent]] | نفس الـ header اللي الخدمات بتبعته |
| [[routing_key]] | [[order.created]] |
| [[payload]] | المحتوى كنص، والـ [[\"]] علامة تنصيص جوه JSON جوه JSON |
| [[payload_encoding: string]] | المحتوى نص مش base64 |

~~~text الناتج
{"routed":true}
~~~

[[routed: true]]: الرسالة راحت لـ queue واحدة على الأقل (queue الـ payments).

> الـ endpoint ده للتجربة والـ debugging بس، مش للإنتاج.

## ٢. payments عملت إيه

~~~text الناتج (docker compose logs payments --no-log-prefix | tail -2)
{"svc":"payments","traceId":"dee957635ccad6380868e336996d70dd","msg":"charged","orderId":9006,"status":"declined"}
{"svc":"payments","traceId":"dee957635ccad6380868e336996d70dd","msg":"duplicate event skipped","eventId":"e9ccef8b-10c0-4ed5-abc3-1a152250076f"}
~~~

السطر الأول من المرة الأصلية، والتاني من النسخة المكررة: [[processed.has(evt.eventId)]] لقاه، فـ ack من غير شغل ومن غير ما ينشر نتيجة تانية.

~~~js
if (processed.has(evt.eventId)) {
  log(traceId, "duplicate event skipped", { eventId: evt.eventId });
  return ch.ack(msg);
}
~~~

ليه ack مش nack؟ الرسالة «اتعملت» فعلًا. لو عملت nack هترجع تاني وتلف.

## ٣. retry على HTTP

~~~bash
docker compose exec -T orders node -e '...'
~~~

- [[exec -T]]: نفّذ جوه container الـ orders من غير terminal تفاعلي (T = no TTY)، عشان نكلّم [[payments:3000]] من جوه الشبكة (مفيش port برّه).
- [[node -e]]: نفّذ الكود ده.
- [[fetch(...).then(async r => ...)]]: ابعت، واطبع الـ status والـ body.

~~~text الناتج (مرتين ورا بعض)
201 {"orderId":9002,"totalCents":25000,"status":"succeeded"}
201 {"orderId":9002,"totalCents":25000,"status":"succeeded","duplicate":true}
~~~

التانية [[duplicate: true]]: نفس النتيجة من غير دفعة جديدة. بس **الأولى** عملت دفعة جديدة لطلب 9002، رغم إنه اتدفع قبل كده! السبب: [[docker compose stop payments]] في درس «HTTP ولا events» مسح الـ [[Map]] اللي في الذاكرة. سجل الـ idempotency لازم يبقى في قاعدة.

---

## الخلاصة

| المصدر | المفتاح | المستهلك |
|---|---|---|
| broker أعاد حدث | [[eventId]] من الـ producer | inbox: [[(consumer, eventId)]] |
| client عمل retry | [[Idempotency-Key]] أو [[orderId]] | جدول بالمفتاح + النتيجة المحفوظة |
| انت بتنادي مزوّد برّه | نفس المفتاح | المزوّد (Stripe) |

- المخزن دايم وفي نفس الـ transaction مع الأثر، مش في الذاكرة.
- المكرر: ack ورجّع النتيجة القديمة، متعيدش الشغل.`,
          lines: [
            "انشر نسخة مكررة من order.created (نفس الـ eventId) على exchange الـ events عن طريق management API.",
            "شوف آخر سطرين في لوج payments.",
            "نادي POST /charges من جوه الشبكة لطلب اتدفع قبل كده."
          ],
          sol: R`payments طبعت [[duplicate event skipped]] بنفس الـ [[eventId]]، ومنشرتش نتيجة تانية، فطلب 9006 فضل [[CANCELLED]] والمخزون متغيرش.

والـ HTTP: أول مرة [[201]] من غير [[duplicate]]، والتانية [[duplicate: true]]. الأولى عملت دفعة جديدة لأن payments اتعملها stop و start في درس «HTTP ولا events» فالـ [[Map]] اللي في الذاكرة اتمسح. ده بالظبط ليه سجل الـ idempotency لازم يبقى في قاعدة.

(اتجرّب بـ Docker Desktop على ويندوز 11.)`
        },
        {
          cmd: "tracing بين الخدمات",
          title: "trace id واحد بيمشي مع الطلب في HTTP و في الرسايل",
          desc: R`طلب واحد بيعدّي على gateway و orders و RabbitMQ و payments، وكل واحد بيكتب لوج لوحده. من غير id مشترك، مستحيل تعرف أنهي سطر في payments يخص أنهي طلب.

المعيار W3C Trace Context: header اسمه [[traceparent]] شكله [[00-<trace-id>-<span-id>-<flags>]]. أول خدمة بتعمله، وكل خدمة بتبعته مع أي نداء HTTP أو رسالة بتطلّعها، وبتكتب الـ trace-id في كل سطر لوج. ومع OpenTelemetry ده بيحصل لوحده، والـ spans بتتبعت لـ Jaeger أو Tempo وتشوف الطلب كله كرسمة زمنية.`,
          example: R`const newTraceparent = () => "00-" + randomBytes(16).toString("hex") + "-" + randomBytes(8).toString("hex") + "-01";
const traceparent = req.headers.traceparent ?? newTraceparent();
const traceId = traceparent.split("-")[1];
ch.publish("events", "order.created", Buffer.from(JSON.stringify({ eventId, orderId: order.id, totalCents })), { persistent: true, messageId: eventId, headers: { traceparent } });
const r = await fetch(process.env.PAYMENTS_URL + "/charges", { method: "POST", headers: { "content-type": "application/json", traceparent }, body: JSON.stringify({ orderId: order.id, totalCents }), signal: AbortSignal.timeout(2000) });
const incomingTraceId = msg.properties.headers.traceparent.split("-")[1];`,
          try: R`على الديمو: اعمل طلب وانت باعت [[traceparent]] بنفسك:
[[curl -s -X POST localhost:8080/api/orders -H "content-type: application/json" -H "traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01" -d '{"qty":1,"totalCents":1000}']]
وبعدين [[docker compose logs --no-log-prefix | grep 4bf92f3577b34da6a3ce929d0e0e4736]]. كام سطر ومن أنهي خدمات؟ وجرّب نفس الكلام بـ [[?mode=sync]].`,
          flag: "script",
          deep: {
            why: "أول bug في production في نظام موزع: «الطلب ده اتأخر ١٠ ثواني فين؟» أو «ليه الطلب ده اتلغى؟». من غير trace id، بتفتح لوج كل خدمة وتدوّر بالوقت وتخمّن. ومعاه، grep واحد (أو بحث واحد في Grafana) بيطلّع الحكاية كلها.",
            how: R`شكل [[traceparent]] (W3C Trace Context):
- [[00]]: الإصدار.
- trace-id: ١٦ byte = ٣٢ حرف hex. ثابت للطلب كله في كل الخدمات.
- parent-id (span-id): ٨ bytes = ١٦ حرف hex. id الخطوة اللي نادت. المفروض كل خدمة تعمل span-id جديد لنفسها وتبعته للي بعدها (الديمو بيبعت نفس الـ header زي ما هو للتبسيط، فالـ trace-id صح بس شجرة الـ spans لأ).
- flags: [[01]] = sampled (اتسجّل).

الديمو بيعمله بإيده عشان تشوف الفكرة: [[randomBytes(16).toString("hex")]] ٣٢ حرف hex. و [[??]]: لو الطلب جاي بـ traceparent (من الـ frontend أو gateway) خده، وإلا اعمل واحد. وفي الرسايل: الـ header بيتحط في [[headers]] بتاعة رسالة RabbitMQ (أو Kafka headers)، والمستهلك بيقراه من [[msg.properties.headers]].

في الحقيقة: OpenTelemetry. الـ auto-instrumentation بتاعه في Node بيعمل كل ده لوحده لـ [[http]] و [[fetch]] و Express و [[pg]] و [[amqplib]] و Kafka: بيقرا الـ header، ويعمل spans، ويحقن الـ header في أي نداء طالع، ويبعت الـ spans لـ collector (درس [[OpenTelemetry في Node]] في تاب «Cloud و DevOps»). والـ logger (pino) ممكن يضيف [[trace_id]] لكل سطر لوحده.

الـ gateway: nginx بيعدّي الـ headers زي ما هي افتراضيًا (فالـ traceparent بتاع الـ client بيوصل). والـ gateways الحديثة (Envoy، و Traefik، و nginx بـ module الـ otel) بتعمل span لنفسها.

وخلي بالك: متثقش في traceparent جاي من الإنترنت لأي حاجة غير الربط (ممكن حد يبعت نفس الـ id لكل طلباته). الـ sampling بيتقرر عندك.`,
            when: "من أول ما يبقى عندك خدمتين أو worker. حتى في monolith مع queue: الـ job بتاعة BullMQ تشيل الـ traceparent بتاع الطلب اللي عملها.",
            mistakes: R`كل خدمة بتعمل trace id جديد فمفيش ربط. الـ id في HTTP بس ومش في رسايل الـ queue (فالحكاية بتتقطع عند أول broker). اللوج نص حر مش JSON فصعب تدوّر بالحقل. تعمل header باسم من عندك ([[x-request-id]] لوحده) بدل المعيار فالأدوات متفهمهوش. sampling ١٠٠٪ في الإنتاج على حجم كبير (تكلفة).`
          },
          teach: R`## الـ header بيتولد مرة، وبيتنقل في كل خطوة

المثال ٦ سطور من الديمو: توليد الـ traceparent، وأخده من الطلب، واستخراج الـ trace-id، وحقنه في رسالة RabbitMQ، وفي نداء HTTP، وقراه في المستهلك.

اتجرّب على ديمو «خدمتين بـ docker compose»، من Git Bash على ويندوز 11.

---

## ١. التوليد

~~~js
const newTraceparent = () => "00-" + randomBytes(16).toString("hex") + "-" + randomBytes(8).toString("hex") + "-01";
~~~

- [[randomBytes(16)]] (من [[node:crypto]]): ١٦ byte عشوائية. و [[toString("hex")]]: كل byte حرفين hex، يعني ٣٢ حرف.
- [[randomBytes(8)]]: الـ span-id، ١٦ حرف.
- النتيجة زي: [[00-c7e6a242edd7f0cf2e39e11447fccaa5-<16 hex>-01]].

## ٢. خده لو موجود

~~~js
const traceparent = req.headers.traceparent ?? newTraceparent();
const traceId = traceparent.split("-")[1];
~~~

Node بيخلي أسامي الـ headers small letters. و [[??]] = لو مش موجود ([[undefined]]) اعمل جديد. و [[split("-")[1]]] = الجزء التاني = الـ trace-id.

## ٣. في الرسالة

~~~js
ch.publish("events", "order.created", ..., { persistent: true, messageId: eventId, headers: { traceparent } });
~~~

[[{ traceparent }]] اختصار لـ [[{ traceparent: traceparent }]]. الـ header بيتخزن مع الرسالة في RabbitMQ، وبيوصل للمستهلك حتى لو بعد ساعة.

## ٤. في HTTP

~~~js
const r = await fetch(..., { headers: { "content-type": "application/json", traceparent }, ... });
~~~

نفس الـ header في نداء payments المتزامن.

## ٥. عند المستهلك

~~~js
const incomingTraceId = msg.properties.headers.traceparent.split("-")[1];
~~~

payments بتقراه من الرسالة وتحطه في كل سطر لوج، وبتبعته تاني مع [[payment.succeeded]].

## ٦. grep واحد

~~~bash
docker compose logs --no-log-prefix | grep c7e6a242edd7f0cf2e39e11447fccaa5
~~~

~~~text الناتج (مرتّب بالوقت)
{"svc":"orders","traceId":"c7e6a242edd7f0cf2e39e11447fccaa5","msg":"order created, event published","orderId":9001,"eventId":"be4b8cc2-acd3-442d-a97b-1e30de263b5c"}
{"svc":"payments","traceId":"c7e6a242edd7f0cf2e39e11447fccaa5","msg":"charged","orderId":9001,"status":"succeeded"}
{"svc":"orders","traceId":"c7e6a242edd7f0cf2e39e11447fccaa5","msg":"payment result","orderId":9001,"event":"payment.succeeded","status":"CONFIRMED"}
~~~

٣ سطور من خدمتين وعدّوا على broker، والـ id ربطهم.

## ٧. ومع OpenTelemetry

كل اللي فوق بيتعمل لوحده بالـ auto-instrumentation (درس [[OpenTelemetry في Node]] في تاب «Cloud و DevOps»)، وبدل grep بتفتح الـ trace في Jaeger أو Grafana Tempo وتشوف كل span بمدته: gateway، و orders، و publish، و consume في payments، و publish، و consume في orders.

---

## الخلاصة

| الحتة | فين |
|---|---|
| توليد | أول خدمة (أو الـ gateway، أو الـ frontend) |
| HTTP | header [[traceparent]] |
| رسايل | headers الرسالة ([[msg.properties.headers]] في amqplib) |
| اللوج | حقل [[traceId]] في كل سطر JSON |
| الأداة | OpenTelemetry بيعمل الكل، و Jaeger أو Tempo للعرض |`,
          lines: [
            "اعمل traceparent جديد: إصدار 00، و trace-id من ١٦ byte، و span-id من ٨، و flags 01.",
            "خد الـ traceparent من الطلب لو جاي، وإلا اعمل جديد.",
            "الـ trace-id هو الجزء التاني بعد أول شرطة.",
            "انشر الحدث والـ traceparent في headers الرسالة.",
            "النداء المتزامن: الـ traceparent في headers الـ HTTP.",
            "عند المستهلك: اقرا الـ trace-id من headers الرسالة."
          ],
          sol: R`مع الـ traceparent بتاعك: ٣ سطور فيهم [[4bf92f3577b34da6a3ce929d0e0e4736]]: [[order created]] من orders، و [[charged]] من payments، و [[payment result]] من orders. وبـ [[?mode=sync]]: سطرين: [[charged (http)]] من payments و [[sync order]] من orders، لأن الـ header اتبعت مع الـ fetch.

(اتجرّب بـ Docker Desktop على ويندوز 11.)`
        }
      ]
    }
]);
