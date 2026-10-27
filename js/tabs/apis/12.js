// تكملة تاب apis: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/apis/01.js (شرح حقول الدرس في أوله)
MORE("apis", [
    {
      t: "RabbitMQ",
      l: 3,
      n: "broker بيوزّع الرسايل: exchanges بتوجّه بالـ routing key، و queues بتشيل، و ack و prefetch بيحددوا مين ياخد إيه، والرسايل اللي بتفشل بتروح dead-letter queue",
      items: [
        {
          cmd: "RabbitMQ: exchanges و queues",
          title: "الـ producer بيبعت لـ exchange، والـ exchange بيوزّع على الـ queues",
          desc: R`في RabbitMQ الـ producer مبيبعتش لـ queue مباشرة: بيبعت لـ exchange ومعاه routing key (زي [[order.paid.eg]])، والـ exchange بيشوف الـ bindings ويحط نسخة من الرسالة في كل queue الـ binding بتاعها مطابق. والـ consumer بيقرا من queue، ولما يخلص يعمل ack فالرسالة تتشال.

[[durable]] على الـ queue معناها إن الـ queue نفسها تفضل بعد restart، و [[persistent: true]] على الرسالة معناها إنها تتكتب على الديسك. محتاج الاتنين عشان الرسالة تعيش بعد restart.`,
          example: R`import amqp from "amqplib";
const conn = await amqp.connect("amqp://guest:guest@localhost:5672");
const ch = await conn.createConfirmChannel();
await ch.assertExchange("orders", "topic", { durable: true });
await ch.assertQueue("emails", { durable: true });
await ch.assertQueue("shipping-eg", { durable: true });
await ch.bindQueue("emails", "orders", "order.#");
await ch.bindQueue("shipping-eg", "orders", "order.paid.eg");
for (const key of ["order.paid.eg", "order.paid.sa", "order.refunded.eg"]) {
  ch.publish("orders", key, Buffer.from(JSON.stringify({ orderId: 9001, key })), { persistent: true, contentType: "application/json" });
}
await ch.waitForConfirms();
console.log("published 3");
await ch.consume("emails", (msg) => {
  console.log("emails got", msg.fields.routingKey, msg.content.toString());
  ch.ack(msg);
});
setTimeout(() => conn.close(), 500);`,
          try: R`شغّل RabbitMQ بـ [[docker run -d --name rabbit -p 127.0.0.1:5672:5672 -p 127.0.0.1:15672:15672 rabbitmq:4.4.0-management-alpine]]، واعمل [[npm i amqplib]]، واحفظ المثال [[rabbit.mjs]] وشغّله. بعدين:
1. [[docker exec rabbit rabbitmqctl list_queues name durable messages]]: كام رسالة في [[shipping-eg]] وليه؟
2. ابعت لـ [[shipping-eg]] رسالة [[persistent: false]] وواحدة [[persistent: true]]، واعمل [[docker restart rabbit]]، وشوف العدد.
3. جرّب [[assertQueue("tmp", { durable: false })]]: إيه اللي بيحصل في RabbitMQ 4.4؟`,
          flag: "script",
          deep: {
            why: "RabbitMQ هو الـ broker الأشهر للـ queues بين خدمات مكتوبة بلغات مختلفة: بروتوكول AMQP مفتوح، وليه clients في كل لغة، والـ routing فيه مرن (رسالة واحدة تروح لكذا queue حسب نوعها). ولو فهمت exchange و binding و queue، هتفهم أي broker تاني.",
            how: R`الرحلة: producer → exchange → (bindings) → queue → consumer.

أنواع الـ exchange:
- [[direct]]: الـ routing key لازم يساوي الـ binding key بالظبط.
- [[topic]]: الـ key كلمات بينها نقط، و [[*]] = كلمة واحدة بالظبط، و [[#]] = صفر كلمة أو أكتر. فـ [[order.#]] بتطابق [[order.paid.eg]] و [[order.refunded.eg]]، و [[order.*]] متطابقش [[order.paid.eg]] (تلات كلمات).
- [[fanout]]: يتجاهل الـ key ويبعت لكل الـ queues المربوطة (زي pub/sub بس كل مشترك ليه queue بتشيل).
- [[headers]]: يطابق على الـ headers بدل الـ key (نادر).
- الـ default exchange (اسمه [[""]]): كل queue مربوطة بيه باسمها، فـ [[sendToQueue("x")]] = publish على [[""]] بـ key [[x]].

[[createConfirmChannel]]: channel فيه publisher confirms، يعني الـ broker بيرد «استلمت» على كل رسالة، و [[waitForConfirms()]] بيستنى الردود. من غيرها الـ publish بيرجع فورًا ومتعرفش الرسالة وصلت ولا لأ.

[[assertExchange]] و [[assertQueue]] idempotent: لو موجودين بنفس الإعدادات مبيعملوش حاجة، ولو موجودين بإعدادات مختلفة بيرموا error ([[PRECONDITION_FAILED]]). عشان كده كل خدمة بتعمل assert للي محتاجاه وقت التشغيل.

الـ queue types في RabbitMQ 4: [[classic]] (الافتراضي، نسخة واحدة على node واحد)، و [[quorum]] (متكررة على أكتر من node بـ Raft، وده المطلوب للحاجات المهمة في cluster)، و [[stream]] (log زي Kafka). والـ classic queue mirroring اتشالت في 4.0. والـ transient queue (مش durable ومش exclusive) ممنوعة افتراضيًا في 4.x: الـ broker بيقفل الاتصال بـ error.`,
            when: "خدمات محتاجة routing مرن (رسالة واحدة لأكتر من مستهلك حسب نوعها)، أو خدمات بلغات مختلفة محتاجة broker واحد، أو شغل لازم يتوزع على workers بـ ack. ولو كلها Node وعندك Redis، BullMQ أبسط (درس «BullMQ ولا RabbitMQ ولا Kafka» تحت).",
            mistakes: R`تبعت لـ exchange مفيش queue مربوطة بيه فالرسالة تضيع من غير أي error (الـ publish بينجح). تنسى [[persistent: true]] فالرسايل تتمسح مع restart رغم إن الـ queue durable. تستخدم [[order.*]] وانت تقصد [[order.#]]. تعمل publish من غير confirms وتفتكر إن «مفيش exception» = وصلت. تفتح connection جديد لكل رسالة (connection واحد للـ process، و channels جواه).`
          },
          teach: R`## الرسالة بتعدّي على exchange قبل الـ queue

السكريبت بيعمل exchange اسمه [[orders]] من نوع [[topic]]، و queues اتنين، ويربطهم بقواعد، ويبعت ٣ رسايل بـ routing keys مختلفة، وبعدين يستهلك من queue [[emails]].

اتجرّب على ويندوز 11 بـ Node 24.22، و [[amqplib]] 2.2.0، و RabbitMQ 4.4.0 في Docker ([[rabbitmq:4.4.0-management-alpine]]). البورت اتعمله map على [[5679]] بدل [[5672]] عشان ميتعارضش مع حاجة تانية على الجهاز: غيّر الرقم بس.

~~~bash
docker run -d --name rabbit -p 127.0.0.1:5672:5672 -p 127.0.0.1:15672:15672 rabbitmq:4.4.0-management-alpine
~~~

- [[5672]] بورت AMQP (البروتوكول اللي الـ clients بتكلّمه).
- [[15672]] الـ management UI: افتح [[http://localhost:15672]] بـ [[guest]] / [[guest]] وهتشوف الـ queues والرسايل والـ bindings.
- [[-management]] في الـ tag = الصورة فيها plugin الـ UI. و [[alpine]] = أصغر.
- [[127.0.0.1:]] قبل البورت: متاح من جهازك بس، مش من الشبكة.

---

## ١. الاتصال والـ channel

~~~js
const conn = await amqp.connect("amqp://guest:guest@localhost:5672");
const ch = await conn.createConfirmChannel();
~~~

- [[amqp://user:pass@host:port]]: عنوان الـ broker.
- الـ connection = اتصال TCP واحد. والـ channel = «جلسة» خفيفة جوه الـ connection، وكل الأوامر بتتبعت عليه. القاعدة: connection واحد للـ process، و channel لكل حاجة بتعملها بالتوازي.
- [[ConfirmChannel]]: الـ broker بيرد بـ ack على كل publish. ده غير الـ ack بتاع الـ consumer: ده «الـ broker استلم رسالتك وكتبها».

## ٢. الـ topology: exchange و queues و bindings

~~~js
await ch.assertExchange("orders", "topic", { durable: true });
await ch.assertQueue("emails", { durable: true });
await ch.assertQueue("shipping-eg", { durable: true });
await ch.bindQueue("emails", "orders", "order.#");
await ch.bindQueue("shipping-eg", "orders", "order.paid.eg");
~~~

| السطر | المعنى |
|---|---|
| [[assertExchange("orders", "topic")]] | exchange بيوجّه بأنماط على الـ routing key |
| [[assertQueue("emails")]] | queue بتشيل الرسايل لحد ما حد يستهلكها |
| [[bindQueue("emails", "orders", "order.#")]] | أي key بيبدأ بـ [[order.]] يروح [[emails]] |
| [[bindQueue("shipping-eg", ..., "order.paid.eg")]] | الطلبات المدفوعة في مصر بس تروح الشحن |

[[assert]] = «اعمله لو مش موجود». فتشغيل السكريبت مرتين مش بيعمل حاجة مكررة.

## ٣. النشر

~~~js
ch.publish("orders", key, Buffer.from(JSON.stringify({ orderId: 9001, key })), { persistent: true, contentType: "application/json" });
~~~

من جوه لبرة:
1. [[JSON.stringify(...)]]: الـ object يبقى نص.
2. [[Buffer.from(...)]]: النص يبقى bytes، لأن RabbitMQ مبيعرفش غير bytes.
3. [[publish(exchange, routingKey, content, options)]].
4. [[persistent: true]]: اكتب الرسالة على الديسك (deliveryMode 2). و [[contentType]] مجرد معلومة للمستهلك.

~~~js
await ch.waitForConfirms();
~~~

استنى لحد ما الـ broker يأكد كل الرسايل. لو واحدة اترفضت، السطر ده بيرمي error.

## ٤. الاستهلاك

~~~js
await ch.consume("emails", (msg) => {
  console.log("emails got", msg.fields.routingKey, msg.content.toString());
  ch.ack(msg);
});
~~~

[[consume]] بيسجّل consumer: الـ broker بيزق الرسايل (push)، والدالة بتتنادى مع كل رسالة. [[msg.fields.routingKey]] الـ key اللي اتبعتت بيه، و [[msg.content]] Buffer. و [[ch.ack(msg)]] = خلصت، امسحها. و [[setTimeout(() => conn.close(), 500)]] بس عشان السكريبت يخلص.

~~~text الناتج
published 3
emails got order.paid.eg {"orderId":9001,"key":"order.paid.eg"}
emails got order.paid.sa {"orderId":9001,"key":"order.paid.sa"}
emails got order.refunded.eg {"orderId":9001,"key":"order.refunded.eg"}
~~~

[[order.#]] طابقت التلاتة.

## ٥. شوف جوه الـ broker

~~~bash
docker exec rabbit rabbitmqctl list_queues name type durable messages
docker exec rabbit rabbitmqctl list_bindings source_name destination_name routing_key
~~~

~~~text الناتج
name	type	durable	messages
shipping-eg	classic	true	1
emails	classic	true	0
source_name	destination_name	routing_key
	shipping-eg	shipping-eg
	emails	emails
orders	emails	order.#
orders	shipping-eg	order.paid.eg
~~~

- [[shipping-eg]] فيها [[1]]: من التلاتة، [[order.paid.eg]] بس طابقت، ومحدش استهلكها.
- [[emails]] فيها [[0]]: السكريبت استهلك التلاتة وعمل ack.
- الـ bindings اللي الـ source بتاعها فاضي: الـ default exchange ([[""]])، وكل queue مربوطة بيه باسمها لوحدها.
- [[type classic]]: النوع الافتراضي.

## ٦. durable و persistent بعد restart

بعتنا لـ [[shipping-eg]] رسالة [[persistent: false]] وواحدة [[persistent: true]] فبقى فيها [[3]]، وعملنا [[docker restart]]:

~~~text الناتج (قبل وبعد الـ restart)
shipping-eg	true	3
shipping-eg	true	2
~~~

الرسالة اللي مش persistent ضاعت، رغم إن الـ queue durable.

وجرّبنا queue مش durable:

~~~text الناتج
Error: Connection closed: 541 (INTERNAL-ERROR) with message "INTERNAL_ERROR - Feature $__bttransient_nonexcl_queues$__bt is deprecated.
By default, this feature is not permitted anymore.
~~~

في RabbitMQ 4.x الـ queue المؤقتة لازم تبقى [[exclusive: true]]: بتاعة connection واحد وبتتمسح لما يقفل. [[assertQueue("", { exclusive: true })]] رجّعت اسم متولّد زي [[amq.gen-rrAvi8-RQ_eXbMVxaHJWSQ]]. ودي اللي بتستخدمها مع [[fanout]] لما كل process عايزة نسخة لحظية.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| exchange | بيستقبل من الـ producer ويوجّه بالـ routing key |
| binding | القاعدة: «الـ key ده يروح الـ queue دي» |
| queue | بتشيل لحد ما consumer يعمل ack |
| [[topic]] | [[*]] كلمة واحدة، و [[#]] أي عدد |
| [[durable]] + [[persistent]] | الاتنين مع بعض = الرسالة تعيش بعد restart |
| confirms | الـ broker أكد إنه استلم |`,
          lines: [
            "استورد مكتبة amqplib (الـ client بتاع AMQP في Node).",
            "اتصل بالـ broker: connection TCP واحد للـ process كلها.",
            "افتح channel فيه publisher confirms: الـ broker هيأكد كل رسالة.",
            "اعمل exchange اسمه orders من نوع topic (بيوجّه بأنماط)، و durable يفضل بعد restart.",
            "queue للإيميلات، durable.",
            "queue للشحن في مصر، durable.",
            "اربط emails بكل key بيبدأ بـ order. (الـ # = أي عدد كلمات).",
            "اربط shipping-eg بالـ key ده بالظبط.",
            "لف على ٣ أنواع أحداث.",
            "انشر على orders بالـ key، والمحتوى JSON في Buffer، و persistent يتكتب على الديسك.",
            "قفلة الـ for.",
            "استنى تأكيد الـ broker لكل الرسايل.",
            "اطبع إن النشر خلص.",
            "سجّل consumer على queue الإيميلات: الدالة بتتنادى مع كل رسالة.",
            "اطبع الـ routing key والمحتوى.",
            "ack: الرسالة خلصت، امسحها من الـ queue.",
            "قفلة الـ callback.",
            "اقفل الاتصال بعد نص ثانية عشان السكريبت يخلص."
          ],
          sol: R`1. [[shipping-eg]] فيها [[1]]: [[order.paid.eg]] بس طابقت الـ binding بتاعها، ومحدش استهلكها. و [[emails]] فيها [[0]] لأن السكريبت استهلك التلاتة.
2. قبل الـ restart: [[3]] (الأولى + الاتنين الجداد). بعده: [[2]]. الرسالة اللي [[persistent: false]] اتمسحت مع إن الـ queue durable.
3. الـ connection بيتقفل بـ [[541 (INTERNAL-ERROR)]] و [[Feature transient_nonexcl_queues is deprecated]]. في RabbitMQ 4.x الـ queue المؤقتة لازم تبقى [[exclusive: true]].

(اتجرّب على RabbitMQ 4.4.0 في Docker و Node 24.22.)`,
          solCode: R`import amqp from "amqplib";
const conn = await amqp.connect("amqp://guest:guest@localhost:5672");
const ch = await conn.createConfirmChannel();
const { queue } = await ch.assertQueue("", { exclusive: true });
console.log("exclusive queue:", queue);
ch.sendToQueue("shipping-eg", Buffer.from("not persistent"), { persistent: false });
ch.sendToQueue("shipping-eg", Buffer.from("persistent"), { persistent: true });
await ch.waitForConfirms();
await conn.close();`
        },
        {
          cmd: "ack و nack و prefetch",
          title: "مين ياخد كام رسالة، وإيه اللي بيحصل لو الـ worker وقع",
          desc: R`الـ broker بيعتبر الرسالة «اتسلمت ولسه» (unacked) لحد ما الـ consumer يعمل [[ack]]. لو الـ channel اتقفل أو الـ worker وقع قبل الـ ack، الرسالة بترجع للـ queue وتروح لحد تاني ومعاها [[redelivered: true]].

[[prefetch(n)]] = أقصى عدد رسايل unacked عند الـ consumer في نفس الوقت. من غيره الـ broker بيرمي كل الرسايل على أول worker، فالـ worker البطيء بياخد كل حاجة والسريع قاعد. و [[nack(msg, false, true)]] بيرجّع الرسالة للـ queue، و [[nack(msg, false, false)]] بيرفضها (تتمسح أو تروح dead-letter).`,
          example: R`import amqp from "amqplib";
const conn = await amqp.connect("amqp://guest:guest@localhost:5672");
const pub = await conn.createConfirmChannel();
await pub.assertQueue("jobs", { durable: true, arguments: { "x-queue-type": "quorum" } });
for (let i = 1; i <= 8; i++) pub.sendToQueue("jobs", Buffer.from(String(i)), { persistent: true });
await pub.waitForConfirms();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function worker(name, ms, prefetch) {
  const ch = await conn.createChannel();
  await ch.prefetch(prefetch);
  await ch.consume("jobs", async (msg) => {
    await sleep(ms);
    console.log(name, "done job", msg.content.toString());
    ch.ack(msg);
  });
}
await worker("slow", 300, Number(process.argv[2] ?? 1));
await worker("fast", 50, Number(process.argv[2] ?? 1));
await sleep(1500);
await conn.close();`,
          try: R`احفظه [[workers.mjs]] وشغّله مرتين: [[node workers.mjs 1]] و [[node workers.mjs 0]] (الـ [[0]] = مفيش حد). مين خلّص كام job في كل مرة؟

وبعدين اكتب consumer بيعمل [[nack(msg, false, true)]] لكل رسالة (رسالة «مسمومة» بتفشل دايمًا)، وعدّ كام مرة اتسلمت في ثانيتين.`,
          flag: "script",
          deep: {
            why: "أغلب مشاكل الـ queues في الإنتاج من هنا: رسايل بتتعمل مرتين لأن الـ ack اتعمل متأخر والـ worker وقع، أو رسايل ضاعت لأن الـ ack اتعمل قبل الشغل، أو worker واحد مخنوق والباقي فاضيين لأن مفيش prefetch، أو رسالة مسمومة بتلف للأبد وبتاكل CPU.",
            how: R`أوضاع الـ ack:
- manual ack (الافتراضي في amqplib، [[noAck: false]]): انت بتقول امتى خلصت. اعمل ack **بعد** ما الشغل يخلص ويتحفظ. ده at-least-once: لو وقعت بعد الشغل وقبل الـ ack، الرسالة هترجع وتتعمل تاني، فالـ consumer لازم يبقى idempotent.
- [[noAck: true]] (auto ack): الـ broker بيعتبرها خلصت أول ما يبعتها. أسرع، بس لو الـ worker وقع الرسالة ضاعت (at-most-once).

[[ack(msg, allUpTo)]]: الـ argument التاني [[true]] = أكّد كل اللي قبلها على نفس الـ channel. و [[nack(msg, allUpTo, requeue)]]: [[requeue=true]] ترجع الـ queue، و [[false]] ترفضها نهائيًا (تتمسح، أو تروح للـ dead-letter exchange لو الـ queue ليها واحد: الدرس الجاي). و [[reject]] زي nack لرسالة واحدة.

الـ ack لازم يتبعت على **نفس الـ channel** اللي الرسالة جت عليه، وإلا الـ channel بيتقفل بـ [[PRECONDITION_FAILED - unknown delivery tag]].

[[prefetch]] (اسمه في AMQP [[basic.qos]]): ١ = توزيع عادل تمامًا (fair dispatch) بس كل رسالة بتستنى round-trip. القيمة العملية بين ١٠ و ١٠٠ حسب مدة الشغل. و [[0]] = مفيش حد، وده الافتراضي لو منادتش prefetch.

الـ quorum queue ([[x-queue-type: quorum]]) بتعد المحاولات اللي فشلت بسبب إن الـ consumer وقع في header [[x-delivery-count]]، وليها [[delivery-limit]] افتراضي ٢٠ في RabbitMQ 4: بعدها الرسالة بتتشال (أو تروح dead-letter). أما [[nack]] مع [[requeue=true]] فبيزوّد [[x-acquired-count]] بس، ومش بيتعد في الحد، فالرسالة المسمومة بتلف للأبد.`,
            when: "manual ack مع prefetch في أي worker بيعمل شغل حقيقي. auto ack للحاجات اللي لو ضاعت مش مهم (metrics تقريبية). و requeue=true بس للأخطاء المؤقتة الواضحة، ومع حد للمحاولات.",
            mistakes: R`ack قبل الشغل (أو [[noAck: true]]) فلو الـ worker وقع الرسالة ضاعت. نسيان الـ ack خالص فالرسايل تتراكم unacked وبعد prefetch رسايل الـ consumer يقف. [[nack(..., true)]] لكل error فالرسالة المسمومة تلف آلاف المرات في الثانية. مفيش prefetch فـ worker واحد ياخد ١٠٠ ألف رسالة في الذاكرة. ack على channel غير اللي استلم.`
          },
          teach: R`## نفس الـ ٨ jobs، مرة بـ prefetch ومرة من غيره

السكريبت بيحط ٨ jobs في queue، وبيشغّل workers اتنين على نفس الـ connection: [[slow]] بياخد ٣٠٠ms في الـ job، و [[fast]] بياخد ٥٠ms. الـ prefetch بييجي من الـ command line.

اتجرّب على ويندوز 11 بـ Node 24.22 و [[amqplib]] 2.2.0 و RabbitMQ 4.4.0 في Docker.

---

## ١. queue من نوع quorum

~~~js
await pub.assertQueue("jobs", { durable: true, arguments: { "x-queue-type": "quorum" } });
~~~

[[arguments]] إعدادات إضافية للـ queue، أساميها بتبدأ بـ [[x-]]. و [[x-queue-type: quorum]] = queue متكررة بـ Raft (على node واحد هنا، بس نفس الكود في cluster من ٣). الـ quorum لازم تبقى durable، وبتعد المحاولات الفاشلة.

## ٢. النشر

~~~js
for (let i = 1; i <= 8; i++) pub.sendToQueue("jobs", Buffer.from(String(i)), { persistent: true });
~~~

[[sendToQueue]] = publish على الـ default exchange باسم الـ queue. المحتوى الرقم كنص.

## ٣. الـ worker

~~~js
async function worker(name, ms, prefetch) {
  const ch = await conn.createChannel();
  await ch.prefetch(prefetch);
  await ch.consume("jobs", async (msg) => {
    await sleep(ms);
    console.log(name, "done job", msg.content.toString());
    ch.ack(msg);
  });
}
~~~

- كل worker ليه channel لوحده، لأن الـ prefetch بيتحسب لكل channel (consumer).
- [[prefetch(n)]]: ميبعتليش أكتر من [[n]] رسايل من غير ack.
- [[sleep(ms)]] بيمثّل الشغل. والـ ack **بعد** الشغل.
- [[process.argv[2] ?? 1]]: أول argument بعد اسم الملف، ولو مش موجود [[1]]. و [[??]] = «لو [[null]] أو [[undefined]]».

## ٤. التشغيل

~~~bash
node workers.mjs 1
node workers.mjs 0
~~~

~~~text الناتج: prefetch 1
fast done job 2
fast done job 3
fast done job 4
fast done job 5
slow done job 1
fast done job 6
fast done job 8
slow done job 7
~~~

[[slow]] أخد job 1 وقعد فيها ٣٠٠ms، وفي الوقت ده [[fast]] خلّص ٤. النتيجة: fast عمل ٦ و slow عمل ٢.

~~~text الناتج: prefetch 0 (مفيش حد)
slow done job 1
slow done job 2
slow done job 3
slow done job 4
slow done job 5
slow done job 6
slow done job 7
slow done job 8
~~~

[[slow]] اشترك الأول، والـ broker رمى عليه الـ ٨ مرة واحدة. [[fast]] اشترك بعده ملقاش حاجة، والشغل خد ٨ × ٣٠٠ = ٢.٤ ثانية بدل أقل من ثانية.

---

## ٥. الـ worker وقع قبل الـ ack

جربنا consumer [[A]] بياخد الرسالة ويقفل الـ channel من غير ack، وبعده consumer [[B]]:

~~~js
await a.consume("jobs", (msg) => {
  console.log("A got", msg.content.toString(), "redelivered:", msg.fields.redelivered);
  a.close();
});
~~~

~~~text الناتج
A got receipt-9001 redelivered: false
B got receipt-9001 redelivered: true delivery-count: 1
~~~

الرسالة رجعت للـ queue وراحت لـ [[B]]، و [[redelivered: true]] بتقول «ممكن تكون اتعملت قبل كده». و [[x-delivery-count: 1]] = محاولة واحدة فشلت (الـ header ده في الـ quorum queue).

## ٦. الرسالة المسمومة

~~~js
await ch.consume("jobs", (msg) => { n++; ch.nack(msg, false, true); });
~~~

~~~text الناتج (بعد ثانيتين)
deliveries: 352 last headers: { 'x-acquired-count': 351 }
~~~

٣٥٢ مرة في ثانيتين، والرسالة لسه في الـ queue. [[requeue=true]] بيرجّعها فورًا، و [[x-acquired-count]] بيزيد بس [[x-delivery-count]] لأ، فالـ delivery-limit (٢٠) مبيوقفهاش. الحل: [[nack(msg, false, false)]] مع dead-letter queue (الدرس الجاي).

---

## الخلاصة

| الأمر | معناه |
|---|---|
| [[ack(msg)]] | خلصت، امسحها |
| [[nack(msg, false, true)]] | فشلت، رجّعها الـ queue (ولو مسمومة هتلف للأبد) |
| [[nack(msg, false, false)]] | فشلت، ارفضها (تتمسح أو تروح dead-letter) |
| [[prefetch(n)]] | أقصى n رسايل من غير ack عند الـ consumer |
| [[redelivered: true]] | الرسالة اتسلمت قبل كده ومحدش أكدها |

- ack **بعد** الشغل، فالرسالة ممكن تتعمل مرتين: الـ consumer لازم idempotent.`,
          lines: [
            "استورد amqplib.",
            "اتصل بالـ broker.",
            "channel فيه confirms للنشر.",
            "queue من نوع quorum (متكررة وبتعد المحاولات الفاشلة)، ولازم durable.",
            "انشر ٨ jobs، كل واحدة رقمها كنص، persistent.",
            "استنى تأكيد الـ broker.",
            "دالة sleep بتستنى عدد ملّي ثانية (بتمثّل الشغل).",
            "worker بياخد اسم، ومدة الشغل، والـ prefetch.",
            "كل worker ليه channel لوحده، لأن الـ prefetch بيتحسب لكل channel.",
            "مبعتليش أكتر من prefetch رسايل من غير ack (٠ = مفيش حد).",
            "اشترك في الـ queue: الدالة async بتتنادى مع كل رسالة.",
            "اعمل الشغل.",
            "اطبع مين خلّص أنهي job.",
            "ack بعد الشغل، مش قبله.",
            "قفلة الـ callback.",
            "قفلة الدالة.",
            "شغّل worker بطيء (٣٠٠ms) بالـ prefetch اللي في الـ command line (افتراضيًا ١).",
            "وworker سريع (٥٠ms).",
            "استنى ثانية ونص لحد ما الشغل يخلص.",
            "اقفل الاتصال."
          ],
          sol: R`مع [[node workers.mjs 1]]: [[fast]] بيعمل ٦ و [[slow]] بيعمل ٢ (الترتيب: fast 2 و 3 و 4 و 5، وبعدين slow 1، وبعدين fast 6 و 8، و slow 7).

مع [[node workers.mjs 0]]: [[slow]] بيعمل الـ ٨ كلهم، لأنه اشترك الأول والـ broker رماهم عليه مرة واحدة، و [[fast]] ملقاش حاجة.

الرسالة اللي بتتعمل [[nack(msg, false, true)]]: اتسلمت ٣٥٢ مرة في ثانيتين في تجربتنا، و [[x-acquired-count]] وصل ٣٥١، والرسالة لسه في الـ queue. الـ requeue مبيتعدّش في الـ delivery-limit، فلازم [[requeue=false]] و dead-letter.

(اتجرّب على RabbitMQ 4.4.0 في Docker و Node 24.22.)`,
          solCode: R`import amqp from "amqplib";
const conn = await amqp.connect("amqp://guest:guest@localhost:5672");
const ch = await conn.createConfirmChannel();
await ch.assertQueue("jobs", { durable: true, arguments: { "x-queue-type": "quorum" } });
ch.sendToQueue("jobs", Buffer.from("always-fails"), { persistent: true });
await ch.waitForConfirms();
let n = 0, last;
await ch.consume("jobs", (msg) => { n++; last = msg.properties.headers; ch.nack(msg, false, true); });
await new Promise((r) => setTimeout(r, 2000));
console.log("deliveries:", n, "last headers:", last);
await conn.close();`
        },
        {
          cmd: "RabbitMQ dead-letter",
          title: "retry بتأخير، وبعد آخر محاولة الرسالة تروح DLQ",
          desc: R`الـ queue ممكن يبقى ليها dead-letter exchange ([[x-dead-letter-exchange]]): أي رسالة بتترفض ([[nack]] من غير requeue)، أو بتعدّي الـ TTL بتاعها، أو الـ queue اتملت، بتتنقل لهناك بدل ما تتمسح، ومعاها header [[x-death]] بيقول جت منين وليه.

بنفس الفكرة تعمل retry بتأخير: queue اسمها [[emails.retry]] من غير consumers، ليها TTL ثانية، والـ dead-letter بتاعها هو الـ queue الأصلية. الرسالة الفاشلة تتحط فيها، تستنى ثانية، وترجع. وبعد آخر محاولة: [[nack]] فتروح [[emails.dlq]] وحد يبص عليها.`,
          example: R`import amqp from "amqplib";
const conn = await amqp.connect("amqp://guest:guest@localhost:5672");
const ch = await conn.createConfirmChannel();
const q = { "x-queue-type": "quorum" };
await ch.assertQueue("emails.dlq", { durable: true, arguments: q });
await ch.assertQueue("emails.retry", { durable: true, arguments: { ...q, "x-message-ttl": 1000, "x-dead-letter-exchange": "", "x-dead-letter-routing-key": "emails.q" } });
await ch.assertQueue("emails.q", { durable: true, arguments: { ...q, "x-dead-letter-exchange": "", "x-dead-letter-routing-key": "emails.dlq" } });
ch.sendToQueue("emails.q", Buffer.from(JSON.stringify({ to: "bad@@example.com" })), { persistent: true, messageId: "evt-77" });
await ch.waitForConfirms();
await ch.prefetch(10);
await ch.consume("emails.q", async (msg) => {
  const attempt = (msg.properties.headers["x-attempt"] ?? 0) + 1;
  try {
    throw new Error("invalid address");
  } catch (err) {
    console.log("attempt", attempt, "failed:", err.message);
    if (attempt < 3) {
      ch.sendToQueue("emails.retry", msg.content, { persistent: true, messageId: msg.properties.messageId, headers: { "x-attempt": attempt } });
      await ch.waitForConfirms();
      ch.ack(msg);
    } else {
      ch.nack(msg, false, false);
    }
  }
});`,
          try: R`شغّله وبعد ٣ ثواني افتح الـ management UI ([[http://localhost:15672]]) على queue [[emails.dlq]] واعمل «Get messages» (اختار Nack message requeue true عشان متتمسحش). إيه اللي في [[x-death]]؟ وبعدين غيّر الـ TTL لـ ٥٠٠٠ وشوف الفرق في التوقيت.`,
          flag: "script",
          deep: {
            why: "من غير dead-letter، الرسالة اللي بتفشل يا إما تتمسح (ضاعت ومحدش عرف)، يا إما تلف للأبد (الدرس اللي فات). والـ retry الفوري بيضرب الخدمة اللي واقعة أصلًا. الـ DLQ بيحوّل الفشل لحاجة تتشاف وتتعاد بإيدك بعد ما تصلح السبب. (نفس الفكرة في BullMQ في درس [[dead-letter queue]] فوق في التاب ده).",
            how: R`إعدادات الـ queue (كلها في [[arguments]] وقت الـ assert):
- [[x-dead-letter-exchange]]: الـ exchange اللي الرسايل الميتة تروحله. [[""]] = الـ default exchange، فالـ routing key هو اسم الـ queue.
- [[x-dead-letter-routing-key]]: الـ key اللي تتبعت بيه (من غيره بتتبعت بالـ key الأصلي).
- [[x-message-ttl]]: الرسالة تموت بعد كام ملّي ثانية في الـ queue.
- [[x-delivery-limit]] (quorum): بعد كام محاولة فاشلة (الـ consumer وقع أو الرسالة اترجعت بـ modify) تموت. الافتراضي ٢٠ في RabbitMQ 4.

أسباب الموت في [[x-death]]: [[rejected]] (nack أو reject من غير requeue)، و [[expired]] (TTL)، و [[maxlen]] (الـ queue اتملت)، و [[delivery_limit]].

ليه بنعيد النشر في [[emails.retry]] بنفسنا بدل nack؟ عشان نتحكم في عدد المحاولات بـ header بتاعنا ([[x-attempt]])، وعشان التأخير. والترتيب مهم: انشر في الـ retry، **استنى الـ confirm**، وبعدين ack الأصلية. لو عكست ووقعت في النص، الرسالة ضاعت.

التأخير المتزايد (exponential backoff): queues retry كتير بـ TTL مختلفة ([[emails.retry.1s]] و [[.10s]] و [[.60s]])، أو plugin [[rabbitmq_delayed_message_exchange]] (مش مدمج، ومحتاج تركيبه: من الـ docs).

ولو عايز ضمان إن الـ dead-lettering نفسه ميضيعش في quorum queue: [[x-dead-letter-strategy: at-least-once]] مع [[x-overflow: reject-publish]] (من docs RabbitMQ). الافتراضي at-most-once.

لو الـ queue موجودة بإعدادات مختلفة، الـ assert بيفشل بـ [[PRECONDITION_FAILED]]. والـ policies ([[rabbitmqctl set_policy]]) طريقة أحسن تحدد بيها DLX و TTL من غير ما تغيّر الكود.`,
            when: "أي consumer بيعمل حاجة ممكن تفشل لسبب مؤقت (خدمة إيميل واقعة، rate limit) أو دائم (داتا غلط). المؤقت: retry بتأخير. الدائم: DLQ على طول، مفيش لازمة تعيد.",
            mistakes: R`requeue=true لكل error بدل DLQ. ack الأصلية قبل ما النشر في الـ retry يتأكد. DLQ محدش بيبص عليها (اعمل alert على عدد الرسايل فيها). تعيد رسايل الـ DLQ قبل ما تصلح السبب. تنسى إن الـ TTL على queue بتموّت من أول الـ queue بس، فرسالة TTL طويل قدّام بتأخر اللي وراها لو بتحط TTL مختلف لكل رسالة ([[expiration]]).`
          },
          teach: R`## ٣ queues: الشغل، والانتظار، والمقبرة

السكريبت بيعمل ٣ queues، ويبعت إيميل لعنوان غلط، والـ consumer بيفشل كل مرة: أول مرتين يرجّعه بعد ثانية، والتالتة يرفضه فيروح الـ DLQ.

اتجرّب على ويندوز 11 بـ Node 24.22 و [[amqplib]] 2.2.0 و RabbitMQ 4.4.0 في Docker. الناتج تحت من نفس الكود ومعاه طباعة الوقت من البداية.

---

## ١. الـ queues

~~~js
const q = { "x-queue-type": "quorum" };
await ch.assertQueue("emails.dlq", { durable: true, arguments: q });
~~~

[[emails.dlq]] queue عادية، مفيش حاجة مميزة فيها. «dead-letter» دي وظيفة مش نوع.

~~~js
await ch.assertQueue("emails.retry", { durable: true, arguments: { ...q, "x-message-ttl": 1000, "x-dead-letter-exchange": "", "x-dead-letter-routing-key": "emails.q" } });
~~~

- [[...q]]: انسخ [[x-queue-type]] جوه الـ object الجديد (spread).
- [[x-message-ttl: 1000]]: الرسالة تموت بعد ثانية.
- ولما تموت: تروح الـ default exchange ([[""]]) بـ key [[emails.q]]، يعني ترجع للـ queue الأصلية. ومفيش consumer على [[emails.retry]] أصلًا: هي «غرفة انتظار».

~~~js
await ch.assertQueue("emails.q", { durable: true, arguments: { ...q, "x-dead-letter-exchange": "", "x-dead-letter-routing-key": "emails.dlq" } });
~~~

الـ queue الأصلية: اللي يترفض منها يروح [[emails.dlq]].

~~~text الرحلة
emails.q  --nack-->  emails.dlq
emails.q  --consumer ينشر-->  emails.retry  --بعد ثانية (expired)-->  emails.q
~~~

## ٢. الرسالة

~~~js
ch.sendToQueue("emails.q", Buffer.from(JSON.stringify({ to: "bad@@example.com" })), { persistent: true, messageId: "evt-77" });
~~~

[[messageId]] id للرسالة بنحطه احنا (هيفيد في الـ idempotency وفي البحث في الـ DLQ).

## ٣. الـ consumer

~~~js
const attempt = (msg.properties.headers["x-attempt"] ?? 0) + 1;
~~~

[[msg.properties.headers]] الـ headers بتاعة الرسالة. أول مرة مفيش [[x-attempt]] فـ [[?? 0]] تخليها صفر، والمحاولة رقم ١.

~~~js
if (attempt < 3) {
  ch.sendToQueue("emails.retry", msg.content, { persistent: true, messageId: msg.properties.messageId, headers: { "x-attempt": attempt } });
  await ch.waitForConfirms();
  ch.ack(msg);
} else {
  ch.nack(msg, false, false);
}
~~~

- لسه فيه محاولات: انشر نفس المحتوى في الـ retry ومعاه رقم المحاولة، واستنى الـ confirm، وبعدين ack الأصلية. الترتيب ده بيضمن إن الرسالة موجودة في مكان واحد على الأقل طول الوقت.
- آخر محاولة: [[nack]] من غير requeue، والـ queue تبعتها للـ DLX.

~~~text الناتج
0.0s attempt 1 failed: invalid address
1.0s attempt 2 failed: invalid address
2.0s attempt 3 failed: invalid address
~~~

ثانية بالظبط بين كل محاولة: ده الـ TTL.

## ٤. اللي في الـ DLQ

قرينا الرسالة من [[emails.dlq]] بـ [[ch.get]] (سحب رسالة واحدة من غير consumer):

~~~text الناتج
in DLQ: {"to":"bad@@example.com"} evt-77
x-first-death-reason: expired | queue: emails.retry
[{"queue":"emails.q","reason":"rejected","count":1},{"queue":"emails.retry","reason":"expired","count":1}]
~~~

[[x-death]] قايمة، الأحدث الأول: آخر موتة كانت [[rejected]] من [[emails.q]] (الـ nack)، وقبلها [[expired]] من [[emails.retry]]. و [[x-first-death-*]] أول مرة ماتت فيها خالص. الـ [[count]] [[1]] مش [[2]] لأننا بنعيد النشر كرسالة جديدة في كل retry، فالـ [[x-death]] القديم مبيتنقلش.

> عدد الرسايل في [[rabbitmqctl list_queues]] للـ quorum queues بيتحدث كل كام ثانية، فلو شفت [[0]] على طول بعد التجربة استنى شوية. الـ UI و API بيقولوا [[1]].

---

## الخلاصة

| الإعداد | معناه |
|---|---|
| [[x-dead-letter-exchange]] | الرسايل الميتة تروح فين |
| [[x-dead-letter-routing-key]] | بأي key |
| [[x-message-ttl]] | تموت بعد كام ms |
| [[x-delivery-limit]] | تموت بعد كام محاولة فاشلة (quorum، افتراضي ٢٠) |
| [[x-death]] | الـ header اللي بيحكي جت منين وليه |

- retry = انشر في queue انتظار واستنى الـ confirm، وبعدين ack.
- الـ DLQ محتاجة حد يبص عليها: alert على عددها.`,
          lines: [
            "استورد amqplib.",
            "اتصل بالـ broker.",
            "channel فيه confirms.",
            "إعدادات مشتركة: quorum queue.",
            "الـ DLQ: queue عادية بتشيل الرسايل الميتة.",
            "queue الانتظار: الرسالة تموت بعد ثانية وترجع لـ emails.q عن طريق الـ default exchange.",
            "الـ queue الأصلية: اللي يترفض منها يروح emails.dlq.",
            "ابعت إيميل لعنوان غلط، ومعاه messageId.",
            "استنى التأكيد.",
            "لحد ١٠ رسايل unacked في نفس الوقت.",
            "consumer على الـ queue الأصلية.",
            "رقم المحاولة من header بتاعنا (أول مرة مش موجود فبيبقى ١).",
            "جرّب الشغل.",
            "الشغل بيفشل دايمًا في المثال.",
            "امسك الـ error.",
            "اطبع رقم المحاولة والسبب.",
            "لو لسه فيه محاولات:",
            "انشر نسخة في queue الانتظار ومعاها رقم المحاولة.",
            "استنى إن الـ broker استلمها.",
            "وبعدين ack الأصلية.",
            "آخر محاولة:",
            "ارفضها من غير requeue: الـ queue تبعتها للـ DLQ.",
            "قفلة الـ if.",
            "قفلة الـ catch.",
            "قفلة الـ callback."
          ],
          sol: R`في الـ UI على [[emails.dlq]] هتلاقي الرسالة ومعاها headers: [[x-attempt: 2]] (اللي احنا حاطينه)، و [[x-death]] فيها اتنين: [[emails.q]] بسبب [[rejected]]، و [[emails.retry]] بسبب [[expired]]، و [[x-first-death-reason: expired]].

ولو خليت الـ TTL ٥٠٠٠: المحاولات تبقى عند ٠ و ٥ و ١٠ ثواني بدل ٠ و ١ و ٢. (لازم تمسح [[emails.retry]] الأول من الـ UI، أو تغيّر اسمها، لأن الـ assert بإعدادات مختلفة بيفشل بـ [[PRECONDITION_FAILED]].)

(اتجرّب على RabbitMQ 4.4.0 في Docker و Node 24.22.)`
        }
      ]
    }
]);
