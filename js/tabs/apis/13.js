// تكملة تاب apis: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/apis/01.js (شرح حقول الدرس في أوله)
MORE("apis", [
    {
      t: "Kafka و CDC",
      l: 3,
      n: "log متخزن متقسم partitions: الترتيب لكل key، و consumer groups بتوزّع الـ partitions، والـ offset بيقول وصلت لفين. والمستهلك لازم يستحمل التكرار، والتغييرات ممكن تطلع من الـ WAL بتاع Postgres نفسه",
      items: [
        {
          cmd: "Kafka: topics و partitions",
          title: "الـ topic متقسم partitions، ونفس الـ key دايمًا في نفس الـ partition",
          desc: R`Kafka مش queue بتمسح الرسالة بعد ما تتقري: هو log متخزن على الديسك، كل رسالة بتتضاف في آخره وليها رقم (offset)، وبتفضل موجودة لحد ما مدة الـ retention تخلص (افتراضيًا ٧ أيام)، مهما اتقرت كام مرة.

الـ topic متقسم partitions عشان يتوزع على أكتر من broker وأكتر من consumer. والـ producer بيختار الـ partition من الـ key: نفس الـ key (رقم الطلب، أو اليوزر) دايمًا في نفس الـ partition، فأحداثه بتتقري **بالترتيب**. أما بين الـ partitions مفيش ترتيب مضمون.`,
          example: R`import { KafkaJS } from "@confluentinc/kafka-javascript";
const kafka = new KafkaJS.Kafka({ kafkaJS: { clientId: "shop-api", brokers: ["localhost:9092"], logLevel: KafkaJS.logLevel.ERROR }, "broker.address.family": "v4" });
const producer = kafka.producer({ kafkaJS: { idempotent: true } });
await producer.connect();
for (let i = 1; i <= 3; i++) {
  for (const user of ["sara", "omar", "ali"]) {
    const [r] = await producer.send({
      topic: "orders",
      messages: [{ key: user, value: JSON.stringify({ user, step: i }), headers: { "event-type": "order.updated" } }],
    });
    console.log(user, "step", i, "-> partition", r.partition, "offset", r.baseOffset);
  }
}
await producer.disconnect();`,
          try: R`شغّل Kafka: [[docker run -d --name kafka -p 9092:9092 apache/kafka:4.4.0]]، واعمل topic بـ ٣ partitions:
[[docker exec kafka /opt/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic orders --partitions 3 --replication-factor 1]]

بعدين [[npm i @confluentinc/kafka-javascript]] وشغّل المثال [[produce.mjs]] مرتين. أرقام الـ partitions اتغيرت؟ والـ offsets؟ وبعدين اعمل [[--describe --topic orders]].`,
          flag: "script",
          deep: {
            why: "Kafka هو العمود الفقري للـ events في شركات كتير: كل خدمة بتنشر أحداثها، وأي خدمة جديدة تقدر تقرا التاريخ كله من الأول. وفهم الـ partitions والـ keys هو الفرق بين نظام أحداثه بترتيبها ونظام بيشحن طلب قبل ما يتدفع.",
            how: R`المصطلحات:
- **broker**: سيرفر Kafka. والـ cluster كذا broker.
- **topic**: اسم لمجموعة أحداث ([[orders]]).
- **partition**: log مرتب جوه الـ topic. كل partition على broker (leader) ونسخ على brokers تانية (replicas) حسب [[replication-factor]].
- **offset**: رقم الرسالة جوه الـ partition، بيبدأ من [[0]] ويزيد. كل partition ليها offsets بتاعتها.
- **KRaft**: Kafka 4 بيدير الـ metadata بنفسه بـ Raft. ZooKeeper اتشال خالص في 4.0. والصورة الرسمية [[apache/kafka]] بتشتغل node واحد (broker و controller) من غير أي إعدادات.

اختيار الـ partition: لو فيه key، [[hash(key) % عدد الـ partitions]] (murmur2، نفس الـ hash في Java والـ client ده: جربنا نفس الـ keys بـ [[kafka-console-producer.sh]] ونزلوا في نفس الـ partitions). ولو مفيش key، الـ client بيوزّع بنفسه.

خد بالك: لو زوّدت عدد الـ partitions بعدين ([[--alter --partitions 6]])، الـ hash بيتغير فنفس الـ key ممكن يروح partition تانية، والترتيب القديم مع الجديد مش مضمون. ومينفعش تقلل الـ partitions أصلًا. فاختار العدد من الأول على قد أقصى عدد consumers متوقع (كل partition بيقراها consumer واحد بس جوه الـ group).

الـ client: [[@confluentinc/kafka-javascript]] هو client Confluent الرسمي لـ Node، مبني على librdkafka (نفس مكتبة C اللي clients Python و Go و .NET مبنية عليها)، وفيه API شبه KafkaJS (الـ [[KafkaJS]] namespace). KafkaJS نفسه مبقاش بيتطور من ٢٠٢٣. والإعدادات اللي بره [[kafkaJS: {}]] إعدادات librdkafka مباشرة ([[broker.address.family]]).

[[idempotent: true]]: الـ broker بيدّي الـ producer id ويعد رسايله، فلو الـ producer عمل retry لرسالة وصلت فعلًا (الرد بس اللي ضاع)، الـ broker بيتجاهل النسخة التانية. ده بيمنع التكرار من الـ producer، مش من الـ consumer.

[[headers]]: metadata زي HTTP headers (نوع الحدث، أو trace id)، من غير ما تفك الـ value.`,
            when: "أحداث كتير (آلاف لملايين في الثانية)، أو أكتر من خدمة محتاجة نفس الأحداث بشكل مستقل، أو محتاج replay (تعيد قراية الأحداث من تاريخ معين)، أو stream processing و analytics. لـ background jobs بسيطة، BullMQ أو RabbitMQ أسهل (آخر درس في القسم ده).",
            mistakes: R`أحداث نفس الطلب من غير key (أو بـ key عشوائي) فتتوزع على partitions وتتقري بترتيب غلط. key واحد لكل حاجة (زي [["orders"]]) فكل الحمل على partition واحدة. partitions قليلة (consumer واحد بس يقدر يشتغل) أو كتير جدًا (overhead على الـ cluster). تزوّد الـ partitions لـ topic شغال وتفتكر الترتيب هيفضل. تفتكر إن Kafka بيمسح الرسالة بعد ما تتقري.`
          },
          teach: R`## ٩ أحداث، ٣ يوزرز، ٣ partitions

السكريبت بيبعت لكل يوزر ٣ أحداث بالترتيب، والـ key هو اسم اليوزر، وبيطبع كل رسالة نزلت في أنهي partition وبأنهي offset.

اتجرّب على ويندوز 11 بـ Node 24.22 و [[@confluentinc/kafka-javascript]] 1.11.0 (librdkafka جوه)، و Kafka 4.4.0 في Docker ([[apache/kafka:4.4.0]]، node واحد KRaft).

> المكتبة فيها binary جاهز بيتنزّل وقت [[npm i]]. ولو npm عندك بيمنع الـ install scripts، هيقولك، واسمح للباكدج دي بس ([[npm install-scripts approve @confluentinc/kafka-javascript]] وبعدين [[npm rebuild]]).

---

## ١. Kafka والـ topic

~~~bash
docker run -d --name kafka -p 9092:9092 apache/kafka:4.4.0
docker exec kafka /opt/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic orders --partitions 3 --replication-factor 1
~~~

- [[9092]] البورت الافتراضي للـ clients. والصورة الرسمية بتقول للـ clients «كلموني على [[localhost:9092]]» (advertised listener)، فلازم البورت يبقى نفسه برّه.
- [[kafka-topics.sh]] الأداة الرسمية، موجودة جوه الصورة في [[/opt/kafka/bin]].
- [[--bootstrap-server]] أول broker تتصل بيه، ومنه بتعرف الباقي.
- [[--partitions 3]] و [[--replication-factor 1]] (نسخة واحدة: عندنا broker واحد).

~~~text الناتج
Created topic orders.
~~~

## ٢. الـ client

~~~js
const kafka = new KafkaJS.Kafka({ kafkaJS: { clientId: "shop-api", brokers: ["localhost:9092"], logLevel: KafkaJS.logLevel.ERROR }, "broker.address.family": "v4" });
~~~

- [[kafkaJS: {...}]] إعدادات بنفس أسامي KafkaJS: [[clientId]] اسم بيظهر في أدوات المراقبة، و [[brokers]] نقطة البداية، و [[logLevel.ERROR]] اطبع الأخطاء بس (من غيرها بيطبع رسايل زي [[Producer disconnected]]).
- [[broker.address.family: v4]] إعداد librdkafka: اتصل بـ IPv4 بس. احنا ربطنا البورت على [[127.0.0.1]] بس، و [[localhost]] على ويندوز بيجرب [[::1]] (IPv6) الأول ويستنى ثانيتين يفشل في كل اتصال. لو عملت [[-p 9092:9092]] من غير IP مش هتحتاجه غالبًا.

~~~js
const producer = kafka.producer({ kafkaJS: { idempotent: true } });
await producer.connect();
~~~

producer مفيهوش تكرار من الـ retries (الـ deep بيشرح).

## ٣. الإرسال

~~~js
const [r] = await producer.send({
  topic: "orders",
  messages: [{ key: user, value: JSON.stringify({ user, step: i }), headers: { "event-type": "order.updated" } }],
});
~~~

- [[messages]] array: ممكن تبعت كذا رسالة في طلب واحد.
- [[key]]: اللي بيحدد الـ partition. و [[value]]: المحتوى (نص أو Buffer). و [[headers]]: metadata.
- [[send]] بيرجّع array فيها نتيجة لكل partition اتكتب فيها، و [[const [r] =]] بياخد أول عنصر (destructuring).

~~~text الناتج
sara step 1 -> partition 2 offset 0
omar step 1 -> partition 1 offset 0
ali step 1 -> partition 0 offset 0
sara step 2 -> partition 2 offset 1
omar step 2 -> partition 1 offset 1
ali step 2 -> partition 0 offset 1
sara step 3 -> partition 2 offset 2
omar step 3 -> partition 1 offset 2
ali step 3 -> partition 0 offset 2
~~~

- [[sara]] دايمًا partition 2، و [[omar]] دايمًا 1، و [[ali]] دايمًا 0: الـ hash بتاع الـ key.
- الـ offset بيبدأ من صفر **في كل partition لوحدها**. فـ «offset 2» مش رقم عالمي: لازم تقول partition كام.
- أحداث سارة: 0 و 1 و 2 في نفس الـ partition = بالترتيب. لكن مين قبل مين بين سارة وعمر؟ مش مضمون عند الـ consumer.

> لما جربنا بأسامي [[user-1]] و [[user-2]] و [[user-3]]، التلاتة نزلوا في partition 2 بالصدفة. الـ hash مبيضمنش توزيع متساوي لعدد keys صغير.

لو شغلته تاني: نفس الـ partitions، والـ offsets بتكمّل (3 و 4 و 5): الرسايل القديمة لسه موجودة.

## ٤. وصف الـ topic

~~~bash
docker exec kafka /opt/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --describe --topic orders
~~~

~~~text الناتج
Topic: orders	TopicId: E3YEsTJQTqOG6kt0gQbX3Q	PartitionCount: 3	ReplicationFactor: 1	Configs: min.insync.replicas=1,segment.bytes=1073741824
	Topic: orders	Partition: 0	Leader: 1	Replicas: 1	Isr: 1	Elr: 	LastKnownElr:
	Topic: orders	Partition: 1	Leader: 1	Replicas: 1	Isr: 1	Elr: 	LastKnownElr:
	Topic: orders	Partition: 2	Leader: 1	Replicas: 1	Isr: 1	Elr: 	LastKnownElr:
~~~

| العمود | معناه |
|---|---|
| [[Leader: 1]] | الـ broker رقم 1 هو اللي بيستقبل الكتابة للـ partition دي |
| [[Replicas]] | الـ brokers اللي عليهم نسخ |
| [[Isr]] | in-sync replicas: النسخ اللي ملحقة على الـ leader |
| [[min.insync.replicas]] | أقل عدد نسخ لازم تأكد عشان الكتابة تنجح (مع [[acks=all]]) |
| [[segment.bytes]] | الـ log بيتقسم ملفات ١ جيجا، والـ retention بيمسح segments كاملة |

في الإنتاج: ٣ brokers، و [[replication-factor 3]]، و [[min.insync.replicas=2]]: broker يقع والكتابة تكمل.

---

## الخلاصة

| | |
|---|---|
| topic | اسم لمجموعة أحداث |
| partition | log مرتب، والترتيب مضمون جواها بس |
| key | بيحدد الـ partition: نفس الـ key = نفس الـ partition = بالترتيب |
| offset | مكان الرسالة جوه الـ partition |
| الرسالة بعد ما تتقري | لسه موجودة لحد الـ retention |`,
          lines: [
            "استورد الـ KafkaJS-compatible API من client Confluent الرسمي.",
            "client باسم shop-api، وأول broker، واطبع الأخطاء بس، واتصل IPv4 بس.",
            "producer بيمنع التكرار اللي بييجي من الـ retries.",
            "اتصل.",
            "٣ جولات.",
            "في كل جولة حدث لكل يوزر.",
            "ابعت واستنى النتيجة (أول عنصر في الـ array).",
            "على topic اسمه orders.",
            "رسالة الـ key بتاعها اسم اليوزر، والـ value JSON، ونوع الحدث في header.",
            "قفلة الـ send.",
            "اطبع الـ partition والـ offset اللي اتكتبت فيهم.",
            "قفلة الـ for الجوانية.",
            "قفلة الـ for البرانية.",
            "اقفل الاتصال (بيستنى أي رسايل لسه متبعتتش)."
          ],
          sol: R`المرة التانية: نفس الـ partitions بالظبط ([[sara]] → 2، و [[omar]] → 1، و [[ali]] → 0)، والـ offsets بتكمّل من [[3]] لـ [[5]]، لأن رسايل المرة الأولى لسه في الـ log.

[[--describe]] بيطلع [[PartitionCount: 3]] و [[ReplicationFactor: 1]]، و ٣ سطور (partition لكل سطر) الـ [[Leader]] فيهم [[1]] (الـ broker الوحيد).

(اتجرّب على Kafka 4.4.0 في Docker و Node 24.22.)`
        },
        {
          cmd: "consumer groups و offsets",
          title: "الـ group بيقسّم الـ partitions على الـ consumers، والـ offset بيتحفظ لكل group",
          desc: R`الـ consumers اللي ليهم نفس الـ [[groupId]] بيتقسموا الـ partitions: كل partition بيقراها consumer واحد بس من الـ group، فالشغل بيتوزع والترتيب جوه الـ partition بيفضل. ولو consumer وقع أو اتضاف، الـ group بيعمل rebalance ويوزّع تاني.

وكل group ليه offsets بتاعته: «قريت لحد فين في كل partition». فـ group تاني (analytics) بيقرا نفس الرسايل كلها من غير ما يأثر على الأول. والـ LAG = الرسايل اللي اتكتبت ولسه الـ group مقراهاش، وده أهم رقم تراقبه.`,
          example: R`import { KafkaJS } from "@confluentinc/kafka-javascript";
const [group = "emails", name = "c1", ms = "6000"] = process.argv.slice(2);
const kafka = new KafkaJS.Kafka({ kafkaJS: { clientId: name, brokers: ["localhost:9092"], logLevel: KafkaJS.logLevel.ERROR }, "broker.address.family": "v4" });
const consumer = kafka.consumer({ kafkaJS: { groupId: group, fromBeginning: true } });
await consumer.connect();
await consumer.subscribe({ topics: ["orders"] });
await consumer.run({
  eachMessage: async ({ partition, message }) => {
    console.log(name, "p" + partition, "offset", message.offset, message.key.toString(), message.value.toString());
  },
});
setTimeout(() => consumer.disconnect(), Number(ms));`,
          try: R`بعد درس «Kafka: topics و partitions» (الـ topic فيه ٩ رسايل):
1. افتح terminal وشغّل [[node consume.mjs emails c1 15000]]، وفي terminal تاني بسرعة [[node consume.mjs emails c2 15000]]. مين أخد أنهي partitions؟
2. وهما شغالين: [[docker exec kafka /opt/kafka/bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe --group emails]].
3. شغّل الـ producer تاني وهما واقفين، واعمل [[--describe]]: كام الـ LAG؟
4. شغّل [[node consume.mjs analytics a1 15000]]: كام رسالة؟
5. رجّع group الـ emails للأول بـ [[--reset-offsets --to-earliest --topic orders --execute]] وشغّل c1 تاني.`,
          flag: "script",
          deep: {
            why: "الـ consumer group هو اللي بيخلي Kafka يعمل الاتنين: queue (جوه الـ group كل رسالة لواحد) و pub/sub (كل group بياخد نسخة). والـ offsets هي اللي بتخلي خدمة جديدة تبدأ من أول التاريخ، أو تعيد معالجة يوم كامل بعد bug، من غير ما الـ producer يعيد حاجة.",
            how: R`التوزيع: عدد الـ consumers المفيد في الـ group = عدد الـ partitions. ٣ partitions و ٤ consumers = واحد قاعد فاضي. ٣ partitions و consumer واحد = هو بياخد التلاتة.

الـ offset اللي بيتحفظ (committed offset) = **الرسالة الجاية** اللي الـ group هيقراها، مش آخر واحدة اتقرت. بيتحفظ في topic داخلي اسمه [[__consumer_offsets]]. والـ client بيعمل commit لوحده كل شوية (auto commit، افتراضيًا كل ٥ ثواني) أو انت بإيدك (الدرس الجاي).

[[fromBeginning: true]]: لو الـ group **جديد** ومالوش offset محفوظ، ابدأ من أول الـ log. من غيرها ([[auto.offset.reset=latest]]) الـ group الجديد بيشوف الرسايل الجديدة بس. ولو الـ group ليه offset محفوظ، الإعداد ده ملوش تأثير.

الـ rebalance: لما consumer يدخل أو يخرج أو يقع، الـ partitions بتتوزع تاني. الـ consumer اللي وقع من غير ما يقول (crash) بيتشال بعد [[session.timeout.ms]] (افتراضيًا ٤٥ ثانية)، وفي الوقت ده الـ partitions بتاعته واقفة. وفي Kafka 4 فيه بروتوكول rebalance جديد (KIP-848، [[group.protocol=consumer]]) بيقلل الوقفة دي، والـ client بيستخدم القديم ([[classic]]) افتراضيًا.

الـ retention: الرسايل بتتمسح بالوقت ([[retention.ms]]، افتراضيًا ٧ أيام) أو بالحجم ([[retention.bytes]])، مش لما تتقري. والـ group اللي وقف أكتر من الـ retention هيلاقي رسايله اتمسحت. فيه كمان [[cleanup.policy=compact]]: Kafka يحتفظ بآخر رسالة لكل key بس (للـ state زي «آخر عنوان لكل يوزر»).

الأدوات: [[kafka-consumer-groups.sh]] بـ [[--describe]] و [[--list]] و [[--reset-offsets]] ([[--to-earliest]] و [[--to-latest]] و [[--to-offset]] و [[--to-datetime]] و [[--shift-by]])، والـ reset لازم الـ group يبقى واقف، و [[--dry-run]] يوريك من غير ما ينفّذ.`,
            when: "consumer group لكل «استخدام» مختلف للأحداث (إيميلات، وتحليلات، وبحث)، وكذا نسخة من نفس الخدمة في نفس الـ group عشان الحمل. والـ reset لما تصلح bug وعايز تعيد معالجة فترة.",
            mistakes: R`consumers في الـ group أكتر من الـ partitions وتستغرب إن الزيادة مش بتسرّع. تستخدم groupId مختلف لكل نسخة من نفس الخدمة (كل نسخة بتعمل كل الشغل). تنسى [[fromBeginning]] لـ group جديد وتستغرب إنه مش شايف القديم. تعمل reset والـ consumers شغالين. شغل طويل جوه [[eachMessage]] أطول من [[max.poll.interval.ms]] فالـ broker يفتكر الـ consumer مات ويعمل rebalance كل شوية. متراقبش الـ LAG.`
          },
          teach: R`## consumer واحد، اتنين، و group تاني

السكريبت consumer بياخد ٣ arguments: اسم الـ group، واسم الـ consumer، ويقفل بعد كام ملّي ثانية. بيطبع كل رسالة بالـ partition والـ offset.

اتجرّب على ويندوز 11 بـ Node 24.22 و [[@confluentinc/kafka-javascript]] 1.11.0، و Kafka 4.4.0 في Docker، على الـ topic [[orders]] بتاع الدرس اللي فات (٣ partitions و ٩ رسايل).

---

## ١. الـ arguments

~~~js
const [group = "emails", name = "c1", ms = "6000"] = process.argv.slice(2);
~~~

[[process.argv]] = [[node]] واسم الملف وبعدين الـ arguments، فـ [[slice(2)]] بيشيل أول اتنين. و [[[a = "x", ...]]] destructuring بقيم افتراضية لو الـ argument مش موجود.

## ٢. الـ consumer

~~~js
const consumer = kafka.consumer({ kafkaJS: { groupId: group, fromBeginning: true } });
await consumer.connect();
await consumer.subscribe({ topics: ["orders"] });
~~~

- [[groupId]]: الـ consumers بنفس الاسم بيتقسموا الشغل.
- [[fromBeginning: true]]: group جديد يبدأ من أول الـ log.
- [[subscribe]]: الـ topics. الـ group هو اللي هيقرر أنهي partitions ليك.

~~~js
await consumer.run({
  eachMessage: async ({ partition, message }) => { ... },
});
~~~

[[run]] بيبدأ loop بيسحب الرسايل (pull، مش push زي RabbitMQ) وبينادي [[eachMessage]] لكل رسالة، بالترتيب جوه كل partition. و [[message.offset]] نص مش رقم (عشان الـ offset ممكن يعدّي حدود الـ number في JS). و [[key]] و [[value]] Buffers فـ [[toString()]].

## ٣. اتنين في نفس الـ group

~~~bash
node consume.mjs emails c1 15000
node consume.mjs emails c2 15000
~~~

~~~text الناتج (c1)
c1 p2 offset 0 sara {"user":"sara","step":1}
c1 p2 offset 1 sara {"user":"sara","step":2}
c1 p2 offset 2 sara {"user":"sara","step":3}
c1 p0 offset 0 ali {"user":"ali","step":1}
c1 p0 offset 1 ali {"user":"ali","step":2}
c1 p0 offset 2 ali {"user":"ali","step":3}
~~~

~~~text الناتج (c2)
c2 p1 offset 0 omar {"user":"omar","step":1}
c2 p1 offset 1 omar {"user":"omar","step":2}
c2 p1 offset 2 omar {"user":"omar","step":3}
~~~

[[c1]] أخد partitions 0 و 2، و [[c2]] أخد 1. كل رسالة اتقرت مرة واحدة في الـ group، وأحداث كل يوزر بالترتيب.

## ٤. الـ group من جوه

~~~bash
docker exec kafka /opt/kafka/bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe --group emails
~~~

~~~text الناتج (وهما شغالين)
GROUP   TOPIC   PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG  CONSUMER-ID                               HOST         CLIENT-ID
emails  orders  0          3               3               0    c1-dbfb6aef-7aed-4538-9b46-01c2dc9204d5  /172.17.0.1  c1
emails  orders  2          3               3               0    c1-dbfb6aef-7aed-4538-9b46-01c2dc9204d5  /172.17.0.1  c1
emails  orders  1          3               3               0    c2-e8c2e57d-7440-4782-be14-96796a7dbba7  /172.17.0.1  c2
~~~

(المسافات اتظبطت عشان العرض.)

| العمود | معناه |
|---|---|
| [[CURRENT-OFFSET]] | الـ offset المحفوظ للـ group = الرسالة **الجاية** ([[3]] بعد ما قرا 0 و 1 و 2) |
| [[LOG-END-OFFSET]] | الـ offset اللي هيتكتب فيه الحدث الجاي |
| [[LAG]] | الفرق بينهم = رسايل مستنية |
| [[HOST]] | [[172.17.0.1]] = الـ gateway بتاع شبكة Docker (الاتصال جاي من ويندوز) |

## ٥. الـ LAG

وقّفنا الـ consumers وشغلنا الـ producer تاني (٩ رسايل كمان):

~~~text الناتج
Consumer group 'emails' has no active members.

GROUP   TOPIC   PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG
emails  orders  0          3               6               3
emails  orders  1          3               6               3
emails  orders  2          3               6               3
~~~

٣ رسايل مستنية في كل partition. LAG بيزيد باستمرار = الـ consumers أبطأ من الـ producers: زوّد consumers (لحد عدد الـ partitions) أو سرّع المعالجة.

## ٦. group تاني

~~~bash
node consume.mjs analytics a1 15000
~~~

[[analytics]] قرا الـ ١٨ رسالة كلها (من offset 0 لـ 5 في كل partition): group جديد و [[fromBeginning]]، و offsets الـ [[emails]] متأثرتش.

> أول تجربة مع [[analytics]] رجّعت ٠ رسايل في ١٠ ثواني: من غير [[broker.address.family: v4]]، كل اتصال بـ [[localhost]] كان بيجرب IPv6 الأول ويستنى ثانيتين، والـ group لحق يدخل بعد ٢٠ ثانية.

## ٧. reset

~~~bash
docker exec kafka /opt/kafka/bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --group emails --topic orders --reset-offsets --to-earliest --execute
~~~

~~~text الناتج
GROUP           TOPIC           PARTITION  NEW-OFFSET
emails          orders          0          0
emails          orders          1          0
emails          orders          2          0
~~~

وبعدها [[c1]] لوحده قرا الـ ١٨ رسالة (أخد التلات partitions لأنه لوحده). و [[--topic orders:1 --to-offset 4 --dry-run]] بيوريك من غير ما ينفّذ: partition 1 بس، [[NEW-OFFSET 4]].

## ٨. الـ retention

~~~bash
docker exec kafka /opt/kafka/bin/kafka-configs.sh --bootstrap-server localhost:9092 --alter --entity-type topics --entity-name orders --add-config retention.ms=604800000
~~~

~~~text الناتج
Completed updating config for topic orders.
~~~

[[604800000]] ms = ٧ × ٢٤ × ٦٠ × ٦٠ × ١٠٠٠ = ٧ أيام (نفس الافتراضي، بس دلوقتي مكتوب على الـ topic). بعدها الـ segments الأقدم بتتمسح، سواء اتقرت ولا لأ.

---

## الخلاصة

| | |
|---|---|
| نفس الـ group | الـ partitions بتتقسم، كل رسالة لواحد |
| group مختلف | نسخة كاملة، offsets مستقلة |
| [[CURRENT-OFFSET]] | الرسالة الجاية للـ group |
| [[LAG]] | الرسايل المستنية: راقبه |
| [[fromBeginning]] | للـ group الجديد بس |
| [[--reset-offsets]] | ارجع أو اتقدم، والـ group واقف |`,
          lines: [
            "استورد الـ client.",
            "اقرا اسم الـ group واسم الـ consumer ومدة التشغيل من الـ command line، بقيم افتراضية.",
            "client باسم الـ consumer، و IPv4 بس، والأخطاء بس.",
            "consumer في الـ group ده، ولو الـ group جديد يبدأ من أول الـ log.",
            "اتصل.",
            "اشترك في topic الـ orders: الـ group هيحدد أنهي partitions ليك.",
            "ابدأ loop السحب.",
            "دالة بتتنادى لكل رسالة، ومعاها رقم الـ partition والرسالة.",
            "اطبع اسم الـ consumer والـ partition والـ offset والـ key والـ value.",
            "قفلة الدالة.",
            "قفلة الـ run.",
            "اقفل بعد المدة (عشان التجربة تخلص)."
          ],
          sol: R`1. في تجربتنا [[c1]] أخد partitions 0 و 2 (سارة وعلي)، و [[c2]] أخد partition 1 (عمر). عندك ممكن التوزيع يختلف، بس كل partition لواحد بس.
2. [[CURRENT-OFFSET 3]] و [[LOG-END-OFFSET 3]] و [[LAG 0]] لكل partition، ومعاها [[CONSUMER-ID]] بتاع كل واحد.
3. [[LAG 3]] في كل partition، و [[Consumer group 'emails' has no active members.]]
4. ١٨ رسالة: group جديد بيبدأ من الأول.
5. [[NEW-OFFSET 0]] للتلاتة، و [[c1]] لوحده بيقرا الـ ١٨.

(اتجرّب على Kafka 4.4.0 في Docker و Node 24.22.)`
        },
        {
          cmd: "Kafka idempotent consumer",
          title: "commit بعد الشغل، والتكرار بيتمسك بـ event id في نفس الـ transaction",
          desc: R`أأمن ترتيب: اعمل الشغل، وبعدين commit للـ offset. لو وقعت في النص، الرسالة هترجعلك تاني (at-least-once). والعكس (commit الأول) معناه لو وقعت الرسالة ضاعت (at-most-once).

فالتكرار جاي جاي، والحل إن المستهلك يبقى idempotent: كل حدث ليه [[eventId]]، وبتسجّله في جدول [[processed_events]] **في نفس الـ transaction** مع الشغل نفسه. لو الـ id موجود، الحدث اتعمل قبل كده: عدّيه. ده اسمه inbox pattern، والنتيجة «effectively once».`,
          example: R`import { KafkaJS } from "@confluentinc/kafka-javascript";
import pg from "pg";
const db = new pg.Pool({ connectionString: "postgres://postgres:pw@localhost:5432/postgres" });
const kafka = new KafkaJS.Kafka({ kafkaJS: { brokers: ["localhost:9092"], logLevel: KafkaJS.logLevel.ERROR }, "broker.address.family": "v4" });
const consumer = kafka.consumer({ kafkaJS: { groupId: "loyalty", fromBeginning: true, autoCommit: false } });
await consumer.connect();
await consumer.subscribe({ topics: ["payments"] });
await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const evt = JSON.parse(message.value.toString());
    const client = await db.connect();
    try {
      await client.query("BEGIN");
      const seen = await client.query("INSERT INTO processed_events (consumer, event_id) VALUES ('loyalty', $1) ON CONFLICT DO NOTHING", [evt.eventId]);
      if (seen.rowCount === 1) {
        await client.query("INSERT INTO points (user_id, points) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET points = points.points + $2", [evt.user, evt.amount]);
      }
      await client.query("COMMIT");
      console.log("offset", message.offset, evt.eventId, seen.rowCount === 1 ? "applied" : "duplicate, skipped");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
    if (process.env.CRASH_AT === message.offset) process.exit(1);
    await consumer.commitOffsets([{ topic, partition, offset: String(Number(message.offset) + 1) }]);
  },
});`,
          try: R`اعمل الجدولين:
[[CREATE TABLE processed_events (consumer text NOT NULL, event_id text NOT NULL, processed_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY (consumer, event_id));]]
[[CREATE TABLE points (user_id text PRIMARY KEY, points int NOT NULL);]]
واعمل topic اسمه [[payments]] بـ partition واحدة، وابعت ٣ أحداث: [[pay-1]] (سارة ٥٠)، و [[pay-2]] (سارة ٢٠)، و [[pay-3]] (عمر ١٠). شغّل المستهلك بـ [[CRASH_AT=1 node loyalty.mjs]] (بيقع بعد ما يعمل الحدث التاني وقبل الـ commit)، وبعدين شغّله عادي. كام نقطة مع سارة؟ وبعدين امسح سطر الـ [[if (seen.rowCount === 1)]] (خلي الـ INSERT يتنفذ دايمًا) وكرر من الأول.`,
          flag: "script",
          deep: {
            why: "«exactly once» من أشهر الأسئلة ومن أكتر الحاجات اللي بتتفهم غلط. الشبكة والـ crashes بيضمنوا إن أي رسالة ممكن توصل مرتين في وقت ما (deploy، أو rebalance، أو timeout). من غير idempotency: نقاط بتتضاف مرتين، وإيميلات بتتبعت مرتين، وفلوس بتترد مرتين.",
            how: R`ليه commit بإيدك؟ الـ auto commit بيحفظ الـ offset كل ٥ ثواني في الخلفية، بغض النظر عن إنك خلصت ولا لأ. فممكن يحفظ offset رسالة لسه بتشتغل عليها، ولو وقعت ضاعت. [[autoCommit: false]] و [[commitOffsets]] بعد الشغل = انت اللي بتحدد.

الـ offset اللي بتعمله commit = [[message.offset + 1]]: الرسالة **الجاية**. لو كتبت [[message.offset]] نفسه، آخر رسالة هتتعاد كل مرة.

ليه الـ inbox في نفس الـ transaction؟ لو سجلت الـ id في transaction والنقاط في تانية، ممكن تقع بينهم: يا النقاط اتضافت والـ id لأ (تتضاف تاني)، يا الـ id اتسجل والنقاط لأ (ضاعت). نفس الـ transaction = الاتنين مع بعض أو ولا واحد.

[[INSERT ... ON CONFLICT DO NOTHING]] و [[rowCount]]: لو الصف اتضاف [[rowCount]] = 1 (أول مرة)، ولو كان موجود = 0 (تكرار). عملية واحدة atomic حتى لو نسختين من المستهلك بيعملوا نفس الحدث في نفس اللحظة (الـ PRIMARY KEY بيمنع الاتنين).

بدائل للـ inbox:
- عملية idempotent بطبيعتها: [[SET status = 'paid']] بدل [[points = points + 20]]، أو upsert بالـ id.
- version أو offset متخزن مع الداتا: «لو الـ offset المتخزن ≥ ده، عدّي».

Exactly-once في Kafka نفسه (transactions و [[isolation.level=read_committed]]) بيضمن «اقرا من topic واكتب في topic» من غير تكرار، جوه Kafka بس. أول ما الأثر يبقى في قاعدة أو API برّه، رجعت للـ idempotency. ونضّف [[processed_events]] بعد مدة أطول من أي retry ممكن (أيام).

[[session.timeout.ms]]: الـ consumer اللي وقع بيفضل «عضو» في الـ group لحد ما المدة دي تخلص (٤٥ ثانية افتراضيًا)، فالـ partitions بتاعته واقفة. عشان كده التشغيل التاني استنى ~٣٠ ثانية.`,
            when: "أي consumer أثره مش idempotent بطبيعته: عدّادات، وفلوس، ونقاط، وإيميلات، ونداء API خارجي. وده نفس المبدأ في RabbitMQ و BullMQ و SQS: كلهم at-least-once.",
            mistakes: R`auto commit مع شغل مهم. commit قبل الشغل. commit بـ [[message.offset]] بدل [[+ 1]]. تسجيل الـ eventId في transaction منفصلة أو في Redis والأثر في Postgres. eventId بيتولّد عند المستهلك (لازم ييجي من الـ producer، ويبقى ثابت لو اتبعت تاني). تفتكر إن [[idempotent: true]] في الـ producer بيحل تكرار المستهلك.`
          },
          teach: R`## نقاط ولاء من أحداث الدفع، ومستهلك بيقع في النص

المستهلك بيقرا أحداث [[payments]]، ولكل حدث بيضيف نقاط لليوزر في Postgres. الـ offset بيتعمله commit بإيدك بعد الـ COMMIT بتاع القاعدة. ومتغير البيئة [[CRASH_AT]] بيخليه يقع بعد ما يخلص رسالة معينة وقبل الـ commit: أسوأ لحظة.

اتجرّب على ويندوز 11 بـ Node 24.22 و [[@confluentinc/kafka-javascript]] 1.11.0 و [[pg]] 8.23، و Kafka 4.4.0 و PostgreSQL 16.13 في Docker. البورت بتاع Postgres في التجربة كان [[6015]] بدل [[5432]].

---

## ١. الإعداد

~~~js
const consumer = kafka.consumer({ kafkaJS: { groupId: "loyalty", fromBeginning: true, autoCommit: false } });
~~~

[[autoCommit: false]]: متحفظش الـ offset لوحدك. احنا هنعمله بعد الشغل.

## ٢. الـ transaction

~~~js
const client = await db.connect();
await client.query("BEGIN");
~~~

[[db.connect()]] بياخد connection واحد من الـ pool. لازم، لأن الـ transaction لازم تبقى على نفس الـ connection من الـ BEGIN للـ COMMIT. و [[db.query]] العادي ممكن يروح لـ connection مختلف كل مرة.

~~~js
const seen = await client.query("INSERT INTO processed_events (consumer, event_id) VALUES ('loyalty', $1) ON CONFLICT DO NOTHING", [evt.eventId]);
~~~

- [[$1]] placeholder، وقيمته من الـ array التانية. الـ driver بيبعتها منفصلة عن الـ SQL (مفيش SQL injection).
- الـ PRIMARY KEY على [[(consumer, event_id)]]: كل مستهلك ليه سجله، فخدمة الإيميلات ممكن تعمل نفس الحدث عادي.
- [[ON CONFLICT DO NOTHING]]: لو موجود، متعملش error، بس [[rowCount]] يبقى [[0]].

~~~js
if (seen.rowCount === 1) {
  await client.query("INSERT INTO points (user_id, points) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET points = points.points + $2", [evt.user, evt.amount]);
}
await client.query("COMMIT");
~~~

أول مرة بس: upsert. [[points.points]] = القيمة القديمة في الجدول. والـ COMMIT بيحفظ الاتنين مع بعض.

~~~js
} catch (err) {
  await client.query("ROLLBACK");
  throw err;
} finally {
  client.release();
}
~~~

أي error: ارجع في الاتنين وارمي الـ error (الـ client هيعيد الرسالة). و [[finally]] بيرجّع الـ connection للـ pool في كل الحالات.

## ٣. الـ commit

~~~js
if (process.env.CRASH_AT === message.offset) process.exit(1);
await consumer.commitOffsets([{ topic, partition, offset: String(Number(message.offset) + 1) }]);
~~~

- السطر الأول للتجربة بس: اقفل الـ process فجأة بعد الـ COMMIT وقبل حفظ الـ offset.
- [[offset + 1]] = الرسالة الجاية. والـ offset نص، فـ [[Number()]] وبعدين [[String()]].

## ٤. التشغيل الأول: يقع عند offset 1

~~~bash
CRASH_AT=1 node loyalty.mjs
~~~

([[CRASH_AT=1 cmd]] في bash = متغير بيئة للأمر ده بس. في PowerShell: [[$env:CRASH_AT=1; node loyalty.mjs]].)

~~~text الناتج
offset 0 pay-1 applied
offset 1 pay-2 applied
exit 1
~~~

[[pay-2]] اتعمل والـ COMMIT نجح (سارة ٧٠)، بس الـ offset المحفوظ لسه [[1]].

## ٥. التشغيل التاني

~~~text الناتج (التوقيت جنب كل سطر)
19:31:37   (بداية التشغيل)
19:32:10 offset 1 pay-2 duplicate, skipped
19:32:10 offset 2 pay-3 applied
~~~

- [[pay-2]] رجع تاني (at-least-once)، والـ inbox مسكه.
- استنى ٣٣ ثانية: الـ consumer اللي وقع كان لسه «عضو» في الـ group لحد ما [[session.timeout.ms]] (٤٥ ثانية من آخر heartbeat) خلص.

~~~text الناتج (SELECT * FROM points)
 user_id | points
---------+--------
 omar    |     10
 sara    |     70
~~~

٥٠ + ٢٠ = ٧٠ بالظبط. من غير الـ inbox كانت هتبقى ٩٠.

---

## الخلاصة

| الترتيب | لو وقع في النص | الاسم |
|---|---|---|
| commit الأول، وبعدين الشغل | الرسالة ضاعت | at-most-once |
| الشغل، وبعدين commit | الرسالة هتتعاد | at-least-once |
| الشغل + inbox في transaction، وبعدين commit | هتتعاد وتتعدّى | effectively once |

- الـ eventId بييجي من الـ producer، مش بيتولد عند المستهلك.
- الـ inbox والأثر في نفس الـ transaction، مش في مكانين.`,
          lines: [
            "استورد client الـ Kafka.",
            "استورد pg (الـ driver بتاع Postgres).",
            "pool اتصالات بالقاعدة.",
            "client الـ Kafka.",
            "consumer في group الـ loyalty، من غير auto commit.",
            "اتصل.",
            "اشترك في topic الدفعات.",
            "ابدأ الـ loop.",
            "لكل رسالة:",
            "فك الـ JSON.",
            "خد connection واحد من الـ pool للـ transaction.",
            "جرّب:",
            "ابدأ transaction.",
            "سجّل الحدث في الـ inbox، ولو موجود متعملش حاجة.",
            "لو اتسجل دلوقتي (أول مرة):",
            "ضيف النقاط لليوزر (upsert).",
            "قفلة الـ if.",
            "احفظ الاتنين مع بعض.",
            "اطبع اتعمل ولا اتعدّى.",
            "لو حصل error:",
            "ارجع في الاتنين.",
            "وارمي الـ error عشان الرسالة تتعاد.",
            "في كل الحالات:",
            "رجّع الـ connection للـ pool.",
            "قفلة الـ try.",
            "للتجربة: اقفل فجأة بعد الشغل وقبل الـ commit.",
            "احفظ الـ offset = الرسالة الجاية.",
            "قفلة الدالة.",
            "قفلة الـ run."
          ],
          sol: R`مع الـ inbox: التشغيل الأول بيطبع [[pay-1 applied]] و [[pay-2 applied]] ويقع. التشغيل التاني (بعد ~٣٠ ثانية لحد ما الـ group يشيل الـ consumer اللي وقع) بيطبع [[offset 1 pay-2 duplicate, skipped]] و [[offset 2 pay-3 applied]]. سارة [[70]] وعمر [[10]].

من غير الـ if: نفس الخطوات بس [[pay-2]] بيتضاف مرتين، وسارة [[90]]. ده الـ bug اللي الـ inbox بيمنعه.

(اتجرّب على Kafka 4.4.0 و PostgreSQL 16.13 في Docker و Node 24.22.)`,
          solCode: R`import { KafkaJS } from "@confluentinc/kafka-javascript";
const kafka = new KafkaJS.Kafka({ kafkaJS: { brokers: ["localhost:9092"], logLevel: KafkaJS.logLevel.ERROR }, "broker.address.family": "v4" });
const producer = kafka.producer({ kafkaJS: { idempotent: true } });
await producer.connect();
await producer.send({ topic: "payments", messages: [
  { key: "sara", value: JSON.stringify({ eventId: "pay-1", user: "sara", amount: 50 }) },
  { key: "sara", value: JSON.stringify({ eventId: "pay-2", user: "sara", amount: 20 }) },
  { key: "omar", value: JSON.stringify({ eventId: "pay-3", user: "omar", amount: 10 }) },
] });
await producer.disconnect();`
        },
        {
          cmd: "CDC بـ logical decoding",
          title: "التغييرات تطلع من الـ WAL بتاع Postgres من غير ما الكود يكتب حاجة",
          desc: R`CDC (Change Data Capture): بدل ما الكود يكتب event بعد كل تعديل (أو في جدول outbox)، بتقرا التغييرات من الـ WAL (الـ log اللي Postgres بيكتب فيه كل تعديل قبل ما ينفّذه). كل INSERT و UPDATE و DELETE بيطلع بالترتيب، بعد الـ COMMIT بس، ومحدش يقدر ينساه.

في Postgres ده اسمه logical decoding: بتعمل replication slot بـ plugin، والـ slot بيفتكر وصلت لفين. Debezium بيعمل كده بالظبط وبيبعت كل تغيير لـ Kafka. والثمن: [[wal_level=logical]]، و slot مهجور بيخلي Postgres يحتفظ بالـ WAL للأبد لحد ما الديسك يتملي.`,
          example: R`CREATE TABLE products (id int PRIMARY KEY, name text NOT NULL, price_cents int NOT NULL);
SELECT slot_name, lsn FROM pg_create_logical_replication_slot('search_sync', 'test_decoding');
INSERT INTO products VALUES (1, 'كيبورد ميكانيكال', 150000), (2, 'ماوس لاسلكي', 40000);
UPDATE products SET price_cents = 35000 WHERE id = 2;
DELETE FROM products WHERE id = 1;
SELECT lsn, xid, data FROM pg_logical_slot_get_changes('search_sync', NULL, NULL);
SELECT count(*) FROM pg_logical_slot_get_changes('search_sync', NULL, NULL);
ALTER TABLE products REPLICA IDENTITY FULL;
DELETE FROM products WHERE id = 2;
SELECT data FROM pg_logical_slot_get_changes('search_sync', NULL, NULL);
SELECT slot_name, plugin, active, pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), confirmed_flush_lsn)) AS behind FROM pg_replication_slots;
SELECT pg_drop_replication_slot('search_sync');`,
          try: R`شغّل Postgres بـ [[docker run -d --name pgcdc -e POSTGRES_PASSWORD=pw postgres:16-alpine -c wal_level=logical]] ونفّذ المثال بـ [[docker exec -i pgcdc psql -U postgres]]. وقبل آخر سطر ضيف ٥٠ ألف صف ([[INSERT INTO products SELECT g, 'p' || g, 100 FROM generate_series(10, 50000) g;]]) وشوف عمود [[behind]]. وبعدين جرّب [[pg_create_logical_replication_slot]] على Postgres عادي من غير [[-c wal_level=logical]].`,
          flag: "script",
          deep: {
            why: "مشكلة الـ dual write (احفظ في القاعدة وابعت لحد تاني) ليها حلين: transactional outbox (درس [[transactional outbox]] في القسم «Queues والأحداث») أو CDC. الـ CDC مفيدة لما الكود مش بتاعك أو قديم، أو لما عايز كل تغيير في جداول معينة يروح لـ search index أو data warehouse أو cache من غير ما تلمس كل مكان بيكتب.",
            how: R`الأجزاء:
- [[wal_level]]: [[replica]] (الافتراضي) فيه معلومات كفاية للـ backup والـ streaming replication بس. [[logical]] بيضيف معلومات كفاية تطلّع منها «صف اتغير من كذا لكذا». محتاج restart.
- **replication slot**: اسم ومكان في الـ WAL. Postgres مش هيمسح أي WAL الـ slot لسه محتاجه. ده اللي بيضمن إنك متفوّتش تغيير حتى لو الـ consumer واقف يوم، وده نفس السبب اللي بيملا الديسك لو نسيته.
- **output plugin**: بيحوّل الـ WAL لشكل مقروء. [[test_decoding]] مدمج وبيطلع نص (للتعلم). [[pgoutput]] مدمج وهو اللي بيستخدمه الـ logical replication و Debezium (مع [[CREATE PUBLICATION]] بتحدد الجداول). و [[wal2json]] extension بيطلع JSON (مش موجود في الصورة الرسمية).
- [[pg_logical_slot_get_changes]]: اقرا وحرّك الـ slot (التغييرات اتاخدت). [[pg_logical_slot_peek_changes]]: اقرا من غير ما تحرّك. والـ clients الحقيقية بتستخدم بروتوكول الـ replication (streaming) مش SQL.
- [[REPLICA IDENTITY]]: إيه اللي يتكتب عن الصف القديم في UPDATE و DELETE. [[DEFAULT]] = الـ primary key بس. [[FULL]] = الصف كله (أتقل في الـ WAL).
- [[lsn]] (Log Sequence Number): مكان في الـ WAL، زي الـ offset في Kafka.

Debezium (من الـ docs): connector بيشتغل جوه Kafka Connect، بيعمل slot بـ [[pgoutput]]، وبيعمل snapshot أولي للجداول، وبعدين بيبعت كل تغيير لـ topic لكل جدول (زي [[shop.public.products]]) فيه [[before]] و [[after]] و [[op]] ([[c]] و [[u]] و [[d]] و [[r]] للـ snapshot). وفيه «outbox event router» بيقرا جدول outbox بالـ CDC بدل الـ polling: أحسن الاتنين.

CDC ولا outbox؟ الـ CDC بيطلع **تغييرات صفوف** (internal schema)، والـ outbox بيطلع **أحداث business** انت مصممها ([[order.paid]] فيها اللي المستهلك محتاجه). لو نشرت الصفوف كما هي لخدمات تانية، أي تغيير في الجدول بقى breaking change ليهم. فالـ CDC الخام أنسب للـ search index و الـ warehouse (حاجات بتاعتك)، والـ outbox للأحداث بين الخدمات.

المراقبة: [[pg_replication_slots]] و [[behind]] (WAL محجوز بسبب الـ slot). وفي Postgres 13+ [[max_slot_wal_keep_size]] بيحط حد: لو الـ slot اتأخر أكتر، Postgres بيبطّله بدل ما يملا الديسك (والـ consumer يعيد snapshot).`,
            when: "مزامنة search index أو cache أو warehouse مع جداول، أو نشر أحداث من نظام قديم مش هتعدّل كوده، أو Debezium outbox router. لمشروع صغير بيكتب أحداثه بنفسه، الـ outbox بـ polling أبسط.",
            mistakes: R`slot اتعمل للتجربة واتنسي فالـ WAL يكبر لحد ما الديسك يتملي والقاعدة تقف. تنشر تغييرات الصفوف الخام لخدمات تانية فيبقى الـ schema الداخلي عقد عام. تنسى [[REPLICA IDENTITY]] فالـ DELETE يطلع من غير الداتا اللي محتاجها. تفتكر إن الـ CDC بيشوف تغييرات اتعملت قبل الـ slot (لازم snapshot). [[wal_level=logical]] من غير ما تعمل restart.`
          },
          teach: R`## الـ WAL كـ stream أحداث

المثال بيعمل slot، ويعمل ٣ تعديلات، ويقرا التغييرات من الـ slot، وبعدين يجرب [[REPLICA IDENTITY FULL]]، ويشوف الـ slot حاجز قد إيه، ويمسحه.

اتجرّب على PostgreSQL 16.13 في Docker ([[postgres:16-alpine]] بـ [[-c wal_level=logical]])، والـ SQL اتبعت بـ [[docker exec -i <container> psql -U postgres]] من Git Bash على ويندوز 11.

---

## ١. من غير wal_level=logical

~~~text الناتج (Postgres عادي)
 wal_level
-----------
 replica

ERROR:  logical decoding requires wal_level >= logical
~~~

[[-c wal_level=logical]] بعد اسم الصورة في [[docker run]] = parameter لـ Postgres وقت التشغيل (زي ما تكتبه في [[postgresql.conf]]). على سيرفر حقيقي بيتغير بـ [[ALTER SYSTEM SET wal_level = logical]] وبعدين restart.

## ٢. الـ slot

~~~sql
SELECT slot_name, lsn FROM pg_create_logical_replication_slot('search_sync', 'test_decoding');
~~~

~~~text الناتج
  slot_name  |    lsn
-------------+-----------
 search_sync | 0/15722B0
~~~

slot اسمه [[search_sync]] بـ plugin [[test_decoding]]. و [[0/15722B0]] الـ LSN اللي بدأ منه: أي تغيير بعده الـ slot هيشوفه، وأي حاجة قبله لأ.

## ٣. التعديلات والقراية

~~~sql
INSERT INTO products VALUES (1, 'كيبورد ميكانيكال', 150000), (2, 'ماوس لاسلكي', 40000);
UPDATE products SET price_cents = 35000 WHERE id = 2;
DELETE FROM products WHERE id = 1;
SELECT lsn, xid, data FROM pg_logical_slot_get_changes('search_sync', NULL, NULL);
~~~

الـ [[NULL, NULL]] = لحد أي LSN ولأي عدد تغييرات (هات كله).

~~~text الناتج
    lsn    | xid |                       data
-----------+-----+-------------------------------------------------------------------------------
 0/15722B0 | 748 | BEGIN 748
 0/15722B0 | 748 | table public.products: INSERT: id[integer]:1 name[text]:'كيبورد ميكانيكال' price_cents[integer]:150000
 0/15723B0 | 748 | table public.products: INSERT: id[integer]:2 name[text]:'ماوس لاسلكي' price_cents[integer]:40000
 0/1572478 | 748 | COMMIT 748
 0/1572478 | 749 | BEGIN 749
 0/1572478 | 749 | table public.products: UPDATE: id[integer]:2 name[text]:'ماوس لاسلكي' price_cents[integer]:35000
 0/1572510 | 749 | COMMIT 749
 0/1572510 | 750 | BEGIN 750
 0/1572510 | 750 | table public.products: DELETE: id[integer]:1
 0/1572580 | 750 | COMMIT 750
(10 rows)
~~~

- [[xid]] رقم الـ transaction. كل statement هنا كان transaction لوحده (autocommit)، فـ ٣ transactions: 748 و 749 و 750.
- التغييرات بتطلع متجمعة بالـ transaction وبترتيب الـ COMMIT، و transaction اترجعت (ROLLBACK) مبتطلعش أصلًا.
- الـ INSERT والـ UPDATE فيهم الصف الجديد كامل بأنواعه. الـ DELETE فيه الـ primary key بس ([[id:1]]): ده [[REPLICA IDENTITY DEFAULT]].
- العربي طالع زي ما هو: الـ WAL بيشيل الـ bytes بالـ encoding بتاع القاعدة (UTF8).

~~~sql
SELECT count(*) FROM pg_logical_slot_get_changes('search_sync', NULL, NULL);
~~~

~~~text الناتج
 count
-------
     0
~~~

[[get]] حرّك الـ slot، فمفيش حاجة جديدة. لو عايز تبص من غير ما تحرّك: [[pg_logical_slot_peek_changes]].

## ٤. REPLICA IDENTITY FULL

~~~sql
ALTER TABLE products REPLICA IDENTITY FULL;
DELETE FROM products WHERE id = 2;
SELECT data FROM pg_logical_slot_get_changes('search_sync', NULL, NULL);
~~~

~~~text الناتج
 BEGIN 751
 COMMIT 751
 BEGIN 752
 table public.products: DELETE: id[integer]:2 name[text]:'ماوس لاسلكي' price_cents[integer]:35000
 COMMIT 752
~~~

- 751 فاضية: ده الـ [[ALTER TABLE]]. الـ DDL مبيطلعش في الـ logical decoding (تغيير الـ schema لازم تنقله بنفسك).
- الـ DELETE بقى فيه الصف القديم كامل: مفيد لو المستهلك محتاج يعرف الاسم أو السعر اللي اتمسح.

## ٥. الـ slot حاجز قد إيه

ضفنا ٥٠ ألف صف من غير ما نقرا:

~~~sql
SELECT slot_name, plugin, active, pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), confirmed_flush_lsn)) AS behind FROM pg_replication_slots;
~~~

من جوه لبرة:
1. [[pg_current_wal_lsn()]]: Postgres كاتب لحد فين دلوقتي.
2. [[confirmed_flush_lsn]]: الـ slot أكد لحد فين.
3. [[pg_wal_lsn_diff(a, b)]]: الفرق بالـ bytes.
4. [[pg_size_pretty]]: بالـ kB و MB.

~~~text الناتج
  slot_name  |    plugin     | active | behind
-------------+---------------+--------+---------
 search_sync | test_decoding | f      | 6760 kB
~~~

[[active = f]]: محدش متصل بالـ slot دلوقتي. و [[6760 kB]] WAL مش هيتمسح لحد ما حد يقرا. على قاعدة بتكتب جيجات في اليوم و slot منسي، ده الديسك كله في أيام.

## ٦. التنضيف

~~~sql
SELECT pg_drop_replication_slot('search_sync');
~~~

دايمًا امسح الـ slots اللي مش مستخدمة.

---

## الخلاصة

| | |
|---|---|
| [[wal_level=logical]] | شرط، ومحتاج restart |
| replication slot | بيفتكر المكان، وبيحجز الـ WAL |
| [[test_decoding]] / [[pgoutput]] | نص للتعلم / اللي Debezium بيستخدمه |
| [[get_changes]] / [[peek_changes]] | اقرا وحرّك / اقرا بس |
| [[REPLICA IDENTITY FULL]] | الصف القديم كامل في UPDATE و DELETE |
| الخطر | slot منسي = ديسك مليان: راقب [[pg_replication_slots]] |`,
          lines: [
            "جدول منتجات.",
            "اعمل replication slot بـ plugin بيطلع نص.",
            "ضيف منتجين.",
            "عدّل سعر.",
            "امسح منتج.",
            "اقرا التغييرات من الـ slot (وحرّكه).",
            "اقرا تاني: مفيش جديد.",
            "خلي الـ DELETE والـ UPDATE يكتبوا الصف القديم كامل.",
            "امسح منتج تاني.",
            "اقرا: الـ DELETE فيه الصف كامل.",
            "الـ slot حاجز قد إيه من الـ WAL.",
            "امسح الـ slot (دايمًا)."
          ],
          sol: R`بعد ٥٠ ألف صف، [[behind]] طلع [[6760 kB]] في تجربتنا، و [[active]] = [[f]]: الـ WAL ده محجوز لحد ما حد يقرا من الـ slot أو يمسحه.

وعلى Postgres عادي: [[ERROR:  logical decoding requires wal_level >= logical]]، و [[SHOW wal_level]] بيقول [[replica]].

(اتجرّب على PostgreSQL 16.13 في Docker.)`
        },
        {
          cmd: "BullMQ ولا RabbitMQ ولا Kafka",
          title: "تختار الـ broker إزاي، ومتى managed (SQS و Pub/Sub)",
          desc: R`BullMQ: background jobs لتطبيق Node، فوق Redis اللي عندك أصلًا: retries و delays و cron و dashboard. أبسط حاجة.

RabbitMQ: broker عام لأي لغة، routing مرن، و ack لكل رسالة، والرسالة بتتشال بعد ما تتعمل. مناسب لتوزيع شغل وأوامر بين خدمات.

Kafka: log متخزن ومتقسم، throughput عالي، والرسايل بتفضل أيام، وأي group جديد يقرا التاريخ. مناسب للأحداث اللي خدمات كتير محتاجاها و replay و streaming.

Managed (SQS و SNS في AWS، و Pub/Sub في Google Cloud، و Azure Service Bus): مفيش سيرفرات تديرها، وبتدفع بالرسالة. لو انت على cloud أصلًا، غالبًا ده أول اختيار.`,
          example: R`# 1. شغل في الخلفية لتطبيق Node واحد (إيميلات، صور، تقارير): BullMQ على Redis
npm i bullmq
# 2. خدمات بلغات مختلفة محتاجة توزّع شغل و routing بالنوع: RabbitMQ
docker run -d --name rabbit -p 5672:5672 -p 15672:15672 rabbitmq:4.4.0-management-alpine
# 3. أحداث بتستهلكها خدمات كتير، أو replay، أو ملايين في الدقيقة: Kafka
docker run -d --name kafka -p 9092:9092 apache/kafka:4.4.0
# 4. على AWS ومش عايز تدير broker: SQS (queue) و SNS (fan-out)، من الـ docs
aws sqs create-queue --queue-name emails --attributes VisibilityTimeout=60`,
          try: R`لكل حالة اختار واحد واكتب السبب في سطر:
1. موقع كورسات Next.js + Express، محتاج يبعت إيميل بعد الشراء ويعمل thumbnails للفيديو.
2. ٤ خدمات (Node و Python و Go)، والطلب الجديد لازم يروح للشحن لو مصر وللشريك لو السعودية.
3. تطبيق توصيل: موقع كل مندوب كل ٣ ثواني، وخدمة tracking وخدمة analytics وخدمة fraud محتاجين نفس الأحداث، و الـ analytics عايزة تعيد حساب الشهر اللي فات.
4. نفس (1) بس الفريق كله على AWS Lambda ومفيش Redis.`,
          flag: "script",
          deep: {
            why: "اختيار broker أكبر من اللازم (Kafka لموقع فيه ألف طلب في اليوم) معناه سيرفرات ومراقبة وخبرة محدش عنده. وأصغر من اللازم (pub/sub في Redis لأحداث فلوس) معناه رسايل بتضيع. وده سؤال انترفيو ثابت: «Kafka ولا RabbitMQ؟ وليه؟».",
            how: R`| | BullMQ | RabbitMQ | Kafka | SQS / Pub/Sub |
|---|---|---|---|---|
| النموذج | job queue | broker: exchanges و queues | log متقسم | queue / topic managed |
| بعد الاستهلاك | الـ job بتتشال (أو تتحفظ completed) | بتتشال بعد الـ ack | بتفضل لحد الـ retention | بتتشال بعد الـ delete / ack |
| الترتيب | تقريبًا FIFO | FIFO في الـ queue لو consumer واحد | مضمون جوه الـ partition (بالـ key) | SQS FIFO بـ group id، و Pub/Sub بـ ordering key |
| replay | لأ | لأ (إلا streams) | أيوه، بالـ offset | Pub/Sub فيه seek، و SQS لأ |
| أكتر من مستهلك لنفس الحدث | لأ (queue لكل استخدام) | queue لكل مستهلك على نفس الـ exchange | group لكل مستهلك | SNS → كذا SQS، أو subscription لكل مستهلك |
| اللغات | Node (وفيه Python و PHP و Elixir) | أي لغة (AMQP) | أي لغة | SDK الـ cloud |
| الإدارة | Redis بس | cluster و quorum queues | cluster و partitions و retention | مفيش |
| مميزات جاهزة | retries و backoff و delay و cron و priorities | routing و DLX و TTL و priorities | streaming و compaction و Connect و exactly-once جوه Kafka | DLQ و delay و scaling تلقائي |

القواعد العملية:
- **ابدأ بأبسط حاجة عندك**: Node و Redis موجود → BullMQ. معظم المشاريع مش محتاجة أكتر.
- **أوامر وشغل (do X)** → queue (BullMQ أو RabbitMQ أو SQS). **حقايق حصلت (X happened)** وكذا حد مهتم → log أو fan-out (Kafka، أو SNS → SQS، أو Pub/Sub، أو exchange في RabbitMQ).
- **replay وتاريخ** → Kafka (أو Redis Streams للحجم الصغير، أو RabbitMQ streams).
- **على cloud ومفيش فريق ops** → managed. SQS ليه [[VisibilityTimeout]] (زي الـ lock في BullMQ: الرسالة بتستخبى مدة، ولو مأتمسحتش بترجع) و DLQ بـ [[maxReceiveCount]]. و SQS standard at-least-once ومن غير ترتيب، و SQS FIFO بترتيب و dedup بس throughput أقل. و Pub/Sub (Google) push أو pull، ومعاه ordering keys و exactly-once delivery اختياري. والتفاصيل دي من docs AWS و Google: متجرّبتش هنا لأنها محتاجة حساب.
- **Kafka managed**: Confluent Cloud و Amazon MSK و Redpanda Cloud، لو محتاج Kafka ومش عايز تديره.

والمشترك في كلهم: at-least-once، فالمستهلك idempotent (درس «Kafka idempotent consumer»)، و DLQ للي بيفشل، و outbox (أو CDC) عشان الحدث ميضيعش بين القاعدة والـ broker.`,
            when: "وقت تصميم أي حاجة async بين أجزاء النظام، وفي system design interviews. ولو حد اقترح Kafka، اسأل: كام رسالة في الثانية؟ مين بيستهلك؟ محتاجين replay؟",
            mistakes: R`Kafka لـ background jobs بسيطة (مفيش retries بتأخير ولا DLQ جاهز، والـ partitions بتحدد أقصى توازي). RabbitMQ كـ event store طويل. Redis pub/sub لحاجات لازم تتعمل. تختار على حسب «الشركات الكبيرة بتستخدم إيه». تنسى إن تشغيل Kafka أو RabbitMQ في الإنتاج شغل ops حقيقي (upgrades، و disk، و monitoring).`
          },
          teach: R`## نفس السؤال، ٤ إجابات

المثال مش سكريبت بيتشغل مرة واحدة: كل سطر هو «نقطة البداية» لكل اختيار. أول ٣ اتجرّبوا في الدروس اللي فاتت (BullMQ في درس [[background jobs]] في تاب «بناء مشروع كامل»، و RabbitMQ و Kafka في القسمين دول). وسطر SQS من docs AWS: متجرّبش، لأنه محتاج حساب AWS (LocalStack بيقلّد SQS لو عايز تجرب محليًا).

---

## ١. BullMQ

~~~bash
npm i bullmq
~~~

مكتبة، مش سيرفر. الـ queue متخزنة في Redis، والـ worker process Node. لو عندك Redis للكاش أو الـ sessions، مفيش أي حاجة جديدة تديرها.

## ٢. RabbitMQ

~~~bash
docker run -d --name rabbit -p 5672:5672 -p 15672:15672 rabbitmq:4.4.0-management-alpine
~~~

سيرفر لوحده بيتكلم AMQP، و UI على [[15672]]. الـ routing (exchange و binding key) هو الميزة اللي مش موجودة في الباقي بنفس المرونة.

## ٣. Kafka

~~~bash
docker run -d --name kafka -p 9092:9092 apache/kafka:4.4.0
~~~

broker و controller في container واحد للتجربة. في الإنتاج: ٣ brokers على الأقل، وقرارات عن الـ partitions والـ retention والـ replication.

## ٤. SQS

~~~bash
aws sqs create-queue --queue-name emails --attributes VisibilityTimeout=60
~~~

(من docs AWS CLI.) [[VisibilityTimeout=60]]: لما consumer يستلم رسالة، بتستخبى ٦٠ ثانية. لو معملهاش [[delete-message]] في الوقت ده، بترجع لحد تاني. ده المقابل لـ «ack» في RabbitMQ وللـ lock في BullMQ.

---

## إزاي تقرر

اسأل بالترتيب:

1. **ده أمر ولا حدث؟** «ابعت إيميل» أمر ليه منفذ واحد → queue. «الطلب اتدفع» حدث وكذا حد مهتم → fan-out أو log.
2. **محتاج تاريخ و replay؟** أيوه → Kafka (أو Redis Streams للحجم الصغير).
3. **كام رسالة؟** آلاف في الدقيقة أي حاجة تمشي. ملايين في الدقيقة → Kafka أو managed.
4. **لغات مختلفة؟** → RabbitMQ أو Kafka أو managed، مش BullMQ.
5. **مين هيدير السيرفر؟** مفيش حد → managed أو BullMQ على Redis managed.

## الخلاصة

| الحالة | الاختيار |
|---|---|
| Node + Redis، شغل في الخلفية | BullMQ |
| routing بالنوع بين خدمات بلغات مختلفة | RabbitMQ |
| أحداث لخدمات كتير، replay، حجم كبير | Kafka |
| على cloud ومفيش ops | SQS / SNS، أو Pub/Sub |

وفي كل الحالات: at-least-once، فالمستهلك idempotent، و DLQ، و outbox.`,
          lines: [
            "BullMQ: مكتبة بس، فوق Redis اللي عندك.",
            "RabbitMQ: broker في container، بورت AMQP وبورت الـ UI.",
            "Kafka: broker و controller KRaft في container واحد.",
            "SQS: queue managed في AWS، والرسالة بتستخبى ٦٠ ثانية بعد ما حد يستلمها (من docs AWS)."
          ],
          sol: R`1. **BullMQ**: تطبيق Node واحد، والـ jobs محتاجة retries و delays، و Redis غالبًا موجود.
2. **RabbitMQ**: لغات مختلفة، و routing بالـ key ([[order.created.eg]] للشحن، و [[order.created.sa]] للشريك) على topic exchange.
3. **Kafka**: حجم كبير ومستمر، و ٣ مستهلكين مستقلين (group لكل واحد)، والـ analytics محتاجة replay (reset للـ offsets لأول الشهر، لو الـ retention أطول من شهر). والـ key = id المندوب عشان مواقعه بالترتيب.
4. **SQS** (و SNS لو أكتر من مستهلك): Lambda بتتربط بـ SQS مباشرة، ومفيش سيرفر تديره.

(إجابات مفهوم. أول ٣ أدوات اتجرّبت في الدروس اللي فاتت، و SQS من docs AWS.)`
        }
      ]
    }
]);
