// تكملة تاب apis: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/apis/01.js (شرح حقول الدرس في أوله)
MORE("apis", [
    {
      t: "Queues والأحداث",
      l: 3,
      n: "queue ولا pub/sub ولا stream، ولما الـ job تفشل كل المحاولات تروح فين، وإزاي تحفظ في القاعدة وتنشر event من غير ما واحد منهم يضيع",
      items: [
        {
          cmd: "queue ولا pub/sub ولا stream",
          title: "تلات طرق لتوصيل رسالة، وكل واحدة لحاجة",
          desc: R`queue: كل رسالة بيستلمها worker واحد بس، ولو محدش فاضي بتستنى. ده شغل لازم يتعمل مرة (إيميل، أو صورة). BullMQ (درس [[background jobs]] في تاب «بناء مشروع كامل») queue فوق Redis.

pub/sub: كل المشتركين دلوقتي بيستلموا الرسالة، واللي مش متصل لحظتها ضاعت عليه. ده للإشعارات اللحظية (الـ Redis adapter في المستوى ٢).

stream: log متخزن بالترتيب، وكل مجموعة مستهلكين (consumer group) ليها مكانها فيه. كل مجموعة بتشوف كل الرسايل، وجوه المجموعة كل رسالة لواحد بس. ولو حد وقع، رسايله بتفضل pending لحد ما حد يأكدها. Redis Streams و Kafka من النوع ده.`,
          example: R`redis-cli PUBLISH order.paid '{"orderId":9001}'
redis-cli LPUSH jobs '{"type":"receipt","orderId":9001}'
redis-cli BRPOP jobs 5
redis-cli XADD orders '*' type paid orderId 9001
redis-cli XGROUP CREATE orders emails 0
redis-cli XGROUP CREATE orders analytics 0
redis-cli XREADGROUP GROUP emails worker-1 COUNT 10 STREAMS orders '>'
redis-cli XREADGROUP GROUP analytics a-1 COUNT 10 STREAMS orders '>'
redis-cli XPENDING orders emails
redis-cli XACK orders emails 1790714741624-0`,
          try: R`شغّل الأوامر بالترتيب (مع Redis من الـ lab). لاحظ رقم الـ PUBLISH، وإن BRPOP رجّع الـ job. وبعد الـ XADD خد الـ id اللي رجع واستخدمه في XACK. وبعدين افتح terminal تاني فيه [[redis-cli SUBSCRIBE order.paid]] وكرر الـ PUBLISH.`,
          deep: {
            why: "اختيار النوع الغلط بيعمل bugs مبتبانش غير تحت الضغط: إيميلات بتتبعت مرتين لأن كل السيرفرات مشتركة في pub/sub، أو أحداث بتضيع وقت deploy لأن pub/sub مبيخزّنش، أو خدمة جديدة محتاجة الأحداث القديمة ومفيش مكان فيه تاريخ.",
            how: R`queue ([[LPUSH]] و [[BRPOP]]، أو BullMQ): الرسالة بتتشال لما worker ياخدها. عشرة workers = الشغل بيتقسم عليهم. BullMQ بيضيف retries، و delays، وأولويات، وحالة لكل job، وبيحمي من إن الـ job تضيع لو الـ worker وقع في النص (بترجع للـ queue بعد ما الـ lock بتاعها يخلص).

pub/sub ([[PUBLISH]] و [[SUBSCRIBE]]): fire-and-forget. الرقم اللي PUBLISH بيرجّعه = عدد المشتركين اللي استلموا. صفر يعني الرسالة راحت في الفاضي. سريع جدًا ومناسب لـ «ابعت لكل السيرفرات دلوقتي» (امسح الكاش المحلي، أو وصّل socket)، ومش مناسب لأي حاجة لازم تتعمل.

stream ([[XADD]] و [[XREADGROUP]] و [[XACK]]): الرسايل متخزنة بـ ids متزايدة (الـ id فيه الوقت بالملّي ثانية). كل consumer group بيعرف آخر حاجة اتسلمتله. الـ [[>]] معناها «رسايل جديدة محدش في المجموعة استلمها». الرسالة بتفضل في الـ PEL (pending entries list) لحد [[XACK]]. لو worker وقع، رسالته pending، وحد تاني ياخدها بـ [[XAUTOCLAIM]] بعد مدة. والمجموعة الجديدة تقدر تبدأ من الأول (الـ [[0]] في XGROUP CREATE) وتقرا التاريخ كله. و [[MAXLEN]] مع XADD بيحدد الحجم عشان الـ stream ميكبرش للأبد.

Kafka و Redpanda: نفس فكرة الـ stream على نطاق ضخم، بـ partitions وتخزين على disk لأيام أو أسابيع. RabbitMQ: queues و exchanges (routing مرن) وفيه streams كمان. و SQS/SNS في AWS: SQS queue و SNS pub/sub. ومعظم المشاريع الصغيرة والمتوسطة BullMQ أو Redis Streams كفاية.

القاعدة: «لازم يتعمل مرة» = queue. «كل اللي مهتم يعرف، ولو فاته مش مهم» = pub/sub. «كل خدمة لازم تشوف كل حدث، بالترتيب، حتى لو كانت واقعة» = stream.

وكل التلاتة at-least-once في أحسن الأحوال: الرسالة ممكن توصل مرتين (worker عمل الشغل ووقع قبل الـ ACK). فالمستهلك لازم يبقى idempotent (نفس فكرة Idempotency-Key في المستوى ١، بالـ event id).`,
            when: "queue للشغل في الخلفية. pub/sub للإشارات اللحظية بين السيرفرات. stream لما أكتر من خدمة محتاجة نفس الأحداث، أو محتاج replay، أو event sourcing.",
            mistakes: R`pub/sub لإرسال إيميلات (كل سيرفر مشترك بيبعت، أو محدش مشترك وقت الـ deploy فمحدش بيبعت). و stream من غير XACK فالـ PEL بيكبر، ومن غير MAXLEN فالذاكرة بتكبر. وتفتكر إن أي واحد فيهم exactly-once. وسؤال انترفيو: «الفرق بين Kafka و RabbitMQ؟»: Kafka log متخزن والمستهلك بيحدد مكانه ويقدر يرجع، و RabbitMQ broker بيوزّع الرسايل ويشيلها بعد الـ ACK.`
          },
          teach: R`## نفس الرسالة، ٣ طرق توصيل في Redis

الأوامر بتبعت نفس الحدث «الطلب ٩٠٠١ اتدفع» بالتلات طرق: [[PUBLISH]] (pub/sub)، و [[LPUSH]] و [[BRPOP]] (queue بسيطة على list)، و [[XADD]] و [[XREADGROUP]] و [[XACK]] (stream بمجموعات مستهلكين). هنشغّلهم بالترتيب ونشوف كل واحد بيعمل إيه في الرسالة.

اتجرّب على Redis 8.10 في Docker ([[redis:8-alpine]])، والأوامر اتبعتت بـ [[docker exec -t <container> redis-cli ...]] من Git Bash على ويندوز 11 (الـ [[-t]] بيخلي [[redis-cli]] يطبع الشكل المقروء زي [[(integer) 1]]). نفس الأوامر بالظبط بتشتغل من PowerShell بـ [[docker exec]]، ولو [[redis-cli]] متسطب عندك اكتبها من غير [[docker exec]].

---

## ١. pub/sub: [[PUBLISH]]

~~~bash
redis-cli PUBLISH order.paid '{"orderId":9001}'
~~~

[[PUBLISH channel message]]: ابعت الرسالة لكل اللي مشتركين في الـ channel دلوقتي. [[order.paid]] اسم الـ channel (أي اسم، والنقطة مجرد عادة). والـ JSON بين [[' ']] عشان الـ shell ميلمسش علامات التنصيص اللي جواه.

~~~text الناتج
(integer) 0
~~~

[[0]] = عدد المشتركين اللي استلموا. محدش كان مشترك، فالرسالة راحت ومحدش هيشوفها أبدًا. Redis مبيخزّنهاش.

### ومع مشترك

فتحنا [[SUBSCRIBE]] في الخلفية جوه الـ container، وبعد ثانية عملنا نفس الـ PUBLISH:

~~~bash
redis-cli SUBSCRIBE order.paid
~~~

~~~text الناتج (الـ PUBLISH، وبعده اللي طبعه المشترك)
1
subscribe
order.paid
1
message
order.paid
{"orderId":9001}
~~~

الـ PUBLISH رجّع [[1]]. والمشترك طبع تأكيد الاشتراك ([[subscribe]] والـ channel وعدد اشتراكاته)، وبعدين الرسالة: النوع [[message]]، والـ channel، والمحتوى.

---

## ٢. queue: [[LPUSH]] و [[BRPOP]]

~~~bash
redis-cli LPUSH jobs '{"type":"receipt","orderId":9001}'
redis-cli BRPOP jobs 5
~~~

- [[LPUSH list value]]: حط في **أول** الـ list (L = left). الرد طول الـ list بعدها.
- [[BRPOP list timeout]]: خد من **آخر** الـ list (R = right)، و [[B]] = blocking: لو فاضية استنى لحد [[5]] ثواني. اليمين والشمال مع بعض = أول واحد دخل أول واحد يطلع (FIFO).

~~~text الناتج
(integer) 1
1) "jobs"
2) "{\"type\":\"receipt\",\"orderId\":9001}"
~~~

[[BRPOP]] بيرجّع اسم الـ list (عشان ممكن تستنى على أكتر من list) والقيمة. والـ [[\"]] دي طريقة [[redis-cli]] في عرض علامة تنصيص جوه نص.

وكررنا [[BRPOP jobs 5]]:

~~~text الناتج (بعد ٥ ثواني بالظبط، real 0m5.253s)
(nil)
~~~

الـ job اتشالت أول مرة. لو عندك ١٠ workers بيعملوا BRPOP، واحد بس هياخدها.

---

## ٣. stream: الحدث

~~~bash
redis-cli XADD orders '*' type paid orderId 9001
~~~

[[XADD stream id field value ...]]: ضيف entry للـ stream اسمه [[orders]] (بيتعمل لوحده أول مرة). و [[*]] معناها «Redis يولّد الـ id»، وبين [[' ']] عشان الـ shell ميحوّلهاش لأسامي ملفات. وبعدها أزواج: [[type=paid]] و [[orderId=9001]].

~~~text الناتج
"1791450694847-0"
~~~

الـ id جزئين: الوقت بالملّي ثانية ([[1791450694847]] = 2026-10-08 09:11:34 UTC)، ورقم تسلسل لو اتضاف أكتر من واحد في نفس الملّي.

---

## ٤. مجموعتين مستهلكين

~~~bash
redis-cli XGROUP CREATE orders emails 0
redis-cli XGROUP CREATE orders analytics 0
~~~

[[XGROUP CREATE stream group start]]: مجموعة اسمها [[emails]] وتانية [[analytics]]. و [[0]] = ابدأوا من أول الـ stream (يعني هيشوفوا الحدث اللي اتضاف قبلهم). لو كتبت [[$]] بدل [[0]]، المجموعة تشوف اللي هيتضاف بعد كده بس.

~~~text الناتج
OK
OK
~~~

---

## ٥. القراية

~~~bash
redis-cli XREADGROUP GROUP emails worker-1 COUNT 10 STREAMS orders '>'
redis-cli XREADGROUP GROUP analytics a-1 COUNT 10 STREAMS orders '>'
~~~

| الحتة | معناها |
|---|---|
| [[GROUP emails worker-1]] | أنا [[worker-1]] في مجموعة [[emails]] (اسم الـ consumer أي اسم، وبيتعمل أول مرة) |
| [[COUNT 10]] | لحد ١٠ رسايل |
| [[STREAMS orders]] | من الـ stream ده |
| [[>]] | الرسايل اللي محدش في المجموعة استلمها لسه. بين [[' ']] عشان [[>]] في الـ shell معناها «اكتب في ملف» |

~~~text الناتج (الاتنين نفس الشكل)
1) 1) "orders"
   2) 1) 1) "1791450694847-0"
         2) 1) "type"
            2) "paid"
            3) "orderId"
            4) "9001"
~~~

الشكل متداخل: الـ stream، وجواه الرسايل، وكل رسالة id وأزواج. المجموعتين استلموا **نفس** الرسالة: كل مجموعة ليها مكانها في الـ stream.

وكررنا القراية لـ [[emails]]:

~~~text الناتج
(nil)
~~~

جوه المجموعة الواحدة، الرسالة بتتسلم مرة.

---

## ٦. الـ pending والتأكيد

~~~bash
redis-cli XPENDING orders emails
~~~

~~~text الناتج
1) (integer) 1
2) "1791450694847-0"
3) "1791450694847-0"
4) 1) 1) "worker-1"
      2) "1"
~~~

عدد الرسايل اللي اتسلمت ومتأكدتش ([[1]])، وأصغر وأكبر id فيهم، وكل consumer عنده كام. الرسالة دي في الـ PEL (Pending Entries List): لو [[worker-1]] وقع دلوقتي، حد تاني ياخدها بـ [[XAUTOCLAIM]].

~~~bash
redis-cli XACK orders emails 1790714741624-0
redis-cli XACK orders emails 1791450694847-0
redis-cli XPENDING orders emails
~~~

~~~text الناتج
(integer) 0
(integer) 1
1) (integer) 0
2) (nil)
3) (nil)
4) (nil)
~~~

- أول [[XACK]] بالـ id اللي في المثال: [[0]]، لأن الـ id ده مش عندنا. لازم تستخدم الـ id اللي رجع من الـ XADD بتاعك.
- التاني بالـ id الصح: [[1]] = اتأكدت رسالة واحدة.
- [[XPENDING]] بقى صفر.

ومجموعة [[analytics]] لسه عندها الرسالة pending، لأنها مأكدتش. كل مجموعة مستقلة.

---

## الخلاصة

| | pub/sub | queue (list) | stream |
|---|---|---|---|
| الأوامر | [[PUBLISH]] و [[SUBSCRIBE]] | [[LPUSH]] و [[BRPOP]] | [[XADD]] و [[XREADGROUP]] و [[XACK]] |
| مين بيستلم | كل المشتركين **دلوقتي** | worker واحد | كل مجموعة، وواحد جوه المجموعة |
| لو محدش موجود | الرسالة ضاعت ([[0]]) | بتستنى في الـ list | بتستنى في الـ stream |
| بعد الاستلام | خلاص | اتشالت | pending لحد [[XACK]] |
| تاريخ | لأ | لأ | أيوه، مجموعة جديدة تبدأ من [[0]] |

- الرقم اللي PUBLISH بيرجّعه = كام واحد سمع.
- [[XACK]] بالـ id بتاعك، و [[0]] معناها الـ id غلط.`,
          lines: [
            "pub/sub: انشر. الرقم اللي بيرجع = كام مشترك استلم (غالبًا ٠ دلوقتي، فالرسالة ضاعت).",
            "queue بسيطة: حط job في list.",
            "worker بياخدها (ويستنى لحد ٥ ثواني لو فاضية). اتشالت من الـ list، ومحدش تاني هياخدها.",
            "stream: ضيف حدث. الـ * معناها Redis يولّد id فيه الوقت.",
            "مجموعة مستهلكين للإيميلات، تبدأ من أول الـ stream.",
            "ومجموعة تانية للتحليلات: هتشوف نفس الأحداث بشكل مستقل.",
            "worker في مجموعة الإيميلات ياخد الرسايل الجديدة.",
            "ومجموعة التحليلات تاخد نفس الرسالة.",
            "الرسايل اللي اتسلمت لمجموعة الإيميلات ولسه محدش أكدها.",
            "أكّد إن الرسالة خلصت (بالـ id اللي رجع من XADD عندك). بعدها بتتشال من الـ pending."
          ],
          sol: R`الـ PUBLISH بيرجّع [[0]] لو مفيش حد عامل SUBSCRIBE: الرسالة اتنشرت ومحدش سمعها، وخلاص ضاعت. ولما تفتح terminal بـ SUBSCRIBE وتعيد، بيرجّع [[1]] والـ terminal التاني يطبعها.

الـ BRPOP بيرجّع اسم الـ list والـ job. لو عملته تاني، هيستنى ٥ ثواني ويرجع [[(nil)]]: الـ job اتاخدت مرة واحدة.

الـ XADD بيرجّع id زي [[1790714741624-0]]. المجموعتين كل واحدة بتستلم نفس الرسالة. XPENDING لمجموعة الإيميلات بيقول [[1]] ومعاه اسم الـ worker. بعد XACK بالـ id بتاعك (مش اللي في المثال)، XPENDING يرجع [[0]]. ولو XACK رجّع [[0]]، الـ id غلط.`
        },
        {
          cmd: "dead-letter queue",
          title: "الـ job اللي فشلت كل محاولاتها تروح فين",
          desc: R`الـ job بتتعاد لحد [[attempts]] (درس [[background jobs]] في «بناء مشروع كامل»). بس لو فشلت كل المحاولات؟ لو سبتها في failed وخلاص، محدش هيبص عليها. الـ dead-letter queue (DLQ) مكان منفصل للرسايل «الميتة»: بتروحله بكل تفاصيلها وسبب الفشل، وفيه alert، وحد يبص ويصلّح ويرجّعها (redrive).

وفيه أخطاء ملهاش لازمة تتعاد أصلًا (العميل مسح الـ endpoint، أو الداتا بايظة): دي ترمي [[UnrecoverableError]] فتفشل فورًا من غير retries.`,
          example: R`import { Queue, Worker, UnrecoverableError } from "bullmq";
const webhooks = new Queue("webhooks", { connection, defaultJobOptions: { attempts: 8, backoff: { type: "exponential", delay: 30_000 } } });
const dead = new Queue("webhooks-dead", { connection });
const worker = new Worker("webhooks", async (job) => {
  const res = await deliver(job.data);
  if (res.status === 410) throw new UnrecoverableError("endpoint gone");
  if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt);
}, { connection, concurrency: 20 });
worker.on("failed", async (job, err) => {
  if (!job || (job.attemptsMade < (job.opts.attempts ?? 1) && !(err instanceof UnrecoverableError))) return;
  await dead.add("dead", { queue: job.queueName, jobId: job.id, data: job.data, error: err.message, failedAt: new Date().toISOString() });
  alerts.notify($__btwebhook job $__{job.id} is dead: $__{err.message}$__bt);
});
export async function redrive(limit = 100) {
  for (const j of await dead.getJobs(["waiting"], 0, limit - 1)) {
    await webhooks.add("deliver", j.data.data);
    await j.remove();
  }
}`,
          try: R`اعمل job بـ URL بيرجّع 500 دايمًا، بـ [[attempts: 3]] و delay ١٠٠ ملّي ثانية للتجربة. بعد ثانيتين اطبع اللي في الـ DLQ. وبعدين صلّح الـ URL (خلّي السيرفر يرجع 200) ونادي [[redrive()]].`,
          flag: "script",
          deep: {
            why: "من غير DLQ الفشل صامت: webhook لعميل مبيوصلش من أسبوع، أو إيصال دفع متبعتش، ومحدش يعرف غير لما العميل يشتكي. الـ DLQ بيحوّل «فشل» لـ «مهمة ليها صاحب»: فيه alert، وفيه مكان تشوف فيه كل الحالات، وزرار تعيدها.",
            how: R`الـ event [[failed]] على الـ Worker بيتنادى مع كل فشل، حتى لو لسه فيه محاولات. [[job.attemptsMade]] عدد المحاولات اللي حصلت، و [[job.opts.attempts]] الحد. لما يوصلوا لبعض (أو الخطأ Unrecoverable)، دي آخر مرة، فتنقلها للـ DLQ.

ليه queue منفصلة ومش سيبها في failed؟ الـ failed set في BullMQ بيتنضف بـ [[removeOnFail]]، وبيختلط فيه كل حاجة. الـ DLQ ليها صلاحيات وتنبيهات ولوحة (Bull Board بيعرضها زي أي queue). وتقدر تحط فيها سياق زيادة: السبب، والوقت، ومين العميل.

[[UnrecoverableError]]: BullMQ بيفهمه وبيوقف الـ retries فورًا. استخدمه لأي خطأ الإعادة مش هتحله: 4xx من العميل (غير 408 و 429)، أو داتا مش valid، أو resource اتمسح.

الـ redrive: بعد ما تصلّح السبب، ترجّع الـ jobs للـ queue الأصلية. خليه على دفعات وبـ rate معقول، عشان ١٠ آلاف job ميتعادوش في ثانية واحدة ويوقعوا اللي لسه قايم. ولو السبب لسه موجود، هيرجعوا للـ DLQ تاني.

خلي بالك: [[worker.on("failed")]] بيشتغل في process الـ worker. لو الـ worker وقع بين الفشل والإضافة للـ DLQ، ممكن تفوتك. للحالات الحساسة [[QueueEvents]] (بيسمع من Redis لكل الـ workers)، أو تعمل الإضافة جوه الـ processor نفسه قبل ما ترمي آخر مرة.

في الأنظمة التانية: SQS فيه redrive policy جاهزة (بعد N مرات تروح لـ queue تانية)، و RabbitMQ فيه dead-letter exchange، و Kafka مفيهوش DLQ built-in والناس بتعمل topic منفصل للرسايل البايظة.`,
            when: "أي queue فيها شغل مهم للعميل أو للفلوس: webhooks، وإيصالات، ومزامنة مع أنظمة تانية.",
            mistakes: R`retries لا نهائية على خطأ مش مؤقت (ضغط على السيرفر التاني على الفاضي). و DLQ من غير alert ولا حد بيبص عليها (بقت مقبرة). و redrive للكل مرة واحدة. وتنقل للـ DLQ مع كل فشل، مش آخر فشل بس. وتحط الـ payload كامل وفيه بيانات حساسة في DLQ مفتوحة لكل الفريق.`
          },
          teach: R`## queue للشغل، و queue تانية للي مات

المثال فيه queue أصلية للـ webhooks بمحاولات وانتظار متزايد، و worker بيوصّل. ومع كل فشل، listener بيسأل: «دي آخر مرة؟». لو أيوه، بينقل الـ job بكل تفاصيلها لـ queue تانية (الـ DLQ) وينبّه حد. وفي الآخر دالة [[redrive]] بترجّع الميتين للـ queue الأصلية بعد ما السبب يتصلّح.

اتجرّب على ويندوز 11: BullMQ 6.3 على Node 24.19، و Redis 8.10 في Docker. [[deliver]] كانت [[fetch]] POST لسيرفر تجربة على بورت ٦٠١٣ بيرجّع 500 دايمًا، ومسار [[/gone]] بيرجّع 410. و [[alerts.notify]] كانت [[console.log]]. وزي ما الـ try بيقول، خلينا [[attempts: 3]] و [[delay: 100]] بدل ٨ و ٣٠ ثانية.

---

## ١. الـ queues

~~~ts
import { Queue, Worker, UnrecoverableError } from "bullmq";
const webhooks = new Queue("webhooks", { connection, defaultJobOptions: { attempts: 8, backoff: { type: "exponential", delay: 30_000 } } });
const dead = new Queue("webhooks-dead", { connection });
~~~

- [[connection]]: إعدادات Redis، مثلًا [[{ host: "localhost", port: 6379 }]].
- [[defaultJobOptions]]: إعدادات أي job تتضاف للـ queue دي من غير ما تكررها.
- [[attempts: 8]]: المحاولة الأولى + ٧ إعادات.
- [[backoff: exponential, delay: 30_000]]: الانتظار قبل الإعادة رقم n = [[30s × 2^(n-1)]].

| بعد الفشل رقم | يستنى |
|---|---|
| ١ | ٣٠ ثانية |
| ٢ | دقيقة |
| ٣ | دقيقتين |
| ٤ | ٤ دقايق |
| ٥ | ٨ دقايق |
| ٦ | ١٦ دقيقة |
| ٧ | ٣٢ دقيقة |
| ٨ | خلاص، دي آخر محاولة |

المجموع حوالي ساعة وربع (٣٨١٠ ثانية = ٦٣.٥ دقيقة) قبل ما الـ job تموت.

[[dead]] queue عادية **محدش عامل لها Worker**، فاللي فيها بيفضل [[waiting]] لحد ما حد يبص.

---

## ٢. الـ worker

~~~ts
const worker = new Worker("webhooks", async (job) => {
  const res = await deliver(job.data);
  if (res.status === 410) throw new UnrecoverableError("endpoint gone");
  if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt);
}, { connection, concurrency: 20 });
~~~

- الدالة بتاخد [[job]]، و [[job.data]] اللي اتحط وقت [[add]].
- لو الدالة خلصت عادي = الـ job نجحت. لو رمت = فشلت، و BullMQ يقرر يعيد ولا لأ.
- [[410 Gone]]: العميل بيقول «الـ endpoint ده اتشال». [[UnrecoverableError]] بتقول لـ BullMQ «متعيدش» حتى لو فاضل محاولات.
- أي فشل تاني ([[!res.ok]] = مش 2xx): [[Error]] عادي، فيتعاد.
- [[concurrency: 20]]: الـ worker ده يشغّل ٢٠ job في نفس الوقت.

---

## ٣. الـ listener: آخر فشل بس

~~~ts
worker.on("failed", async (job, err) => {
  if (!job || (job.attemptsMade < (job.opts.attempts ?? 1) && !(err instanceof UnrecoverableError))) return;
~~~

[[failed]] بيتنادى مع **كل** فشل. الشرط بالترتيب:

- [[!job]]: في حالات نادرة BullMQ بيبعت [[job]] بـ [[undefined]]. اخرج.
- [[job.attemptsMade < (job.opts.attempts ?? 1)]]: لسه فيه محاولات. و [[?? 1]]: لو [[attempts]] مش متحطة، الافتراضي محاولة واحدة.
- [[!(err instanceof UnrecoverableError)]]: والخطأ مش نهائي.
- لو الاتنين صح: [[return]]، استنى المحاولة الجاية.

طبعنا القيم في كل فشل:

~~~text الناتج
09:12:11.921 try 1 attemptsMade before = 0
09:12:11.947 try 2 attemptsMade before = 0
  failed event: attemptsMade = 1 opts.attempts = 3 Error
  failed event: attemptsMade = 1 opts.attempts = 3 UnrecoverableError
ALERT: webhook job 2 is dead: endpoint gone
09:12:12.146 try 1 attemptsMade before = 1
  failed event: attemptsMade = 2 opts.attempts = 3 Error
09:12:12.447 try 1 attemptsMade before = 2
  failed event: attemptsMade = 3 opts.attempts = 3 Error
ALERT: webhook job 1 is dead: HTTP 500
~~~

- job ١ (بترجع 500): اتنادت ٣ مرات. جوه الـ [[failed]] الـ [[attemptsMade]] بيبقى زاد خلاص (١ ثم ٢ ثم ٣)، ولما وصل [[3]] = [[opts.attempts]]، اتنقلت.
- job ٢ (410): فشلة واحدة، و [[UnrecoverableError]] نقلها على طول.
- الانتظار: ٢٢٥ ثم ٣٠٠ ملّي تقريبًا. الـ exponential كان ١٠٠ ثم ٢٠٠، والزيادة وقت BullMQ في نقل الـ job من [[delayed]] لـ [[waiting]].

~~~ts
  await dead.add("dead", { queue: job.queueName, jobId: job.id, data: job.data, error: err.message, failedAt: new Date().toISOString() });
  alerts.notify($__btwebhook job $__{job.id} is dead: $__{err.message}$__bt);
});
~~~

[[dead.add(name, data)]]: job جديدة في الـ DLQ، والـ data فيها كل السياق: جت منين، ورقمها، وبياناتها، وليه ماتت، وإمتى.

~~~text الناتج (اللي في الـ DLQ بعد ثانيتين)
DLQ: [
  { queue: 'webhooks', jobId: '1', data: { url: 'http://localhost:6013/ok-later' }, error: 'HTTP 500', failedAt: '2026-10-08T09:12:12.450Z' },
  { queue: 'webhooks', jobId: '2', data: { url: 'http://localhost:6013/gone' }, error: 'endpoint gone', failedAt: '2026-10-08T09:12:12.000Z' }
]
counts webhooks: { failed: 2, completed: 0, waiting: 0, delayed: 0 }
~~~

---

## ٤. الـ redrive

~~~ts
export async function redrive(limit = 100) {
  for (const j of await dead.getJobs(["waiting"], 0, limit - 1)) {
    await webhooks.add("deliver", j.data.data);
    await j.remove();
  }
}
~~~

- [[dead.getJobs(["waiting"], 0, limit - 1)]]: هات الـ jobs اللي حالتها waiting، من رقم ٠ لـ ٩٩ (الطرفين محسوبين، عشان كده [[- 1]]).
- [[j.data.data]]: الـ [[data]] الأولى بتاعة job الـ DLQ، والتانية البيانات الأصلية جواها.
- أضف للأصلية **الأول**، وبعدين امسح من الـ DLQ. لو العكس ووقعت في النص، الـ job تضيع.

غيّرنا سيرفر التجربة يرجّع 200، ونادينا [[redrive()]]:

~~~text الناتج
09:12:13.963 try 3 attemptsMade before = 0
09:12:13.966 try 4 attemptsMade before = 0
  completed 3
  failed event: attemptsMade = 1 opts.attempts = 3 UnrecoverableError
ALERT: webhook job 4 is dead: endpoint gone
after redrive DLQ: { waiting: 1 } webhooks: { failed: 3, completed: 1 }
~~~

- الأولى رجعت بـ id جديد ([[3]]) ونجحت.
- التانية ([[/gone]]) رجعت ماتت تاني، لأن السبب لسه موجود (لسه بيرجّع 410). عشان كده الـ redrive بعد ما تصلّح، مش بدل التصليح.

---

## الخلاصة

| الجزء | الكود | الدور |
|---|---|---|
| الإعادة | [[attempts]] و [[backoff]] | فشل مؤقت يتحل لوحده |
| خطأ نهائي | [[UnrecoverableError]] | وقّف الإعادة فورًا |
| آخر فشل | [[attemptsMade >= opts.attempts]] أو Unrecoverable | انقل للـ DLQ |
| الـ DLQ | queue من غير Worker | الميتين بسياقهم + alert |
| الـ redrive | [[getJobs]] ثم [[add]] ثم [[remove]] | رجّعهم بعد التصليح، على دفعات |

- [[failed]] بيتنادى مع كل فشل، فالشرط هو اللي بيحدد «آخر مرة».
- الـ DLQ من غير alert = مقبرة محدش بيزورها.`,
          lines: [
            "BullMQ، والخطأ اللي بيوقف الـ retries.",
            "الـ queue الأصلية: ٨ محاولات بـ backoff أسّي يبدأ من ٣٠ ثانية.",
            "الـ DLQ: queue عادية محدش بيشغّلها أوتوماتيك.",
            "الـ worker:",
            "حاول توصّل.",
            "410 Gone: العميل شال الـ endpoint، الإعادة مالهاش لازمة.",
            "أي فشل تاني: ارمي عادي فيتعاد.",
            "٢٠ job بالتوازي.",
            "مع كل فشل:",
            "لسه فيه محاولات والخطأ مش نهائي؟ متعملش حاجة.",
            "آخر فشل: انقلها للـ DLQ بكل السياق.",
            "ونبّه حد.",
            "قفلة.",
            "إعادة الميتين بعد ما السبب يتصلّح...",
            "...على دفعات...",
            "...رجّعها للـ queue الأصلية...",
            "...وشيلها من الـ DLQ.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`بعد ثانيتين: الـ worker اتنادى ٣ مرات للـ job البايظة، والـ DLQ فيها واحدة شكلها كده:

[[{ queue: "webhooks", jobId: "2", data: { url: ".../broken" }, error: "HTTP 500", failedAt: "..." }]]

والـ job الأصلية في failed بتاع [[webhooks]] (عدد ١). بعد الـ redrive: الـ DLQ فاضية، و job جديدة في [[webhooks]]، ولما الـ URL يرجع 200 تنجح.

لو الـ DLQ فيها ٣ نسخ من نفس الـ job: الشرط بتاع «آخر محاولة» غلط (بتنقل مع كل فشل). ولو فاضية خالص: [[attempts]] متحطتش على الـ job فالقيمة ١ والـ backoff مش شغال، أو الـ event مش متسجّل قبل ما الـ job تفشل.`
        },
        {
          cmd: "transactional outbox",
          title: "احفظ في القاعدة وانشر الحدث من غير ما واحد يضيع",
          desc: R`«الطلب اتدفع» لازم يتحفظ في القاعدة، ولازم event يروح للـ queue (إيصال، وشحن، وتحليلات). لو حفظت وبعدين نشرت، والسيرفر وقع بينهم: الطلب مدفوع ومحدش عرف. ولو نشرت الأول والـ transaction فشلت: إيصال لطلب مدفعش. مفيش transaction واحدة بتجمع Postgres و Redis.

الـ outbox: بتكتب الحدث في جدول [[outbox]] في نفس الـ transaction مع التعديل. يا الاتنين يتحفظوا يا مفيش. وبعدين process منفصلة (relay) بتقرا الأحداث اللي لسه متنشرتش، وتنشرها، وتعلّم عليها.`,
          example: R`await db.$transaction(async (tx) => {
  const order = await tx.order.update({ where: { id: orderId, status: "pending" }, data: { status: "paid", paidAt: new Date() } });
  await tx.outbox.create({ data: { topic: "order.paid", payload: { orderId: order.id, total: order.total } } });
});
export async function relayOutbox() {
  return db.$transaction(async (tx) => {
    const rows = await tx.$queryRaw<{ id: bigint; topic: string; payload: unknown }[]>$__bt
      SELECT id, topic, payload FROM outbox
      WHERE published_at IS NULL ORDER BY id LIMIT 100
      FOR UPDATE SKIP LOCKED$__bt;
    for (const r of rows) await events.add(r.topic, r.payload, { jobId: $__btoutbox-$__{r.id}$__bt });
    if (rows.length) await tx.$executeRaw$__btUPDATE outbox SET published_at = now() WHERE id = ANY($__{rows.map((r) => r.id)})$__bt;
    return rows.length;
  });
}`,
          try: R`اعمل جدول outbox (id bigserial، و topic، و payload jsonb، و created_at، و published_at) و index جزئي [[WHERE published_at IS NULL]]. ضيف ٢٥٠ صف، وشغّل [[relayOutbox]] ٣ مرات بالتوازي بـ [[Promise.all]]، وعدّ: كام حدث اتنشر، وفيه تكرار؟ وبعدين جرّب transaction فيها update و outbox وبعدين [[throw]]: الاتنين لازم يترجعوا.`,
          flag: "script",
          deep: {
            why: "مشكلة الـ dual write موجودة في كل سيستم بيحفظ في قاعدة وبيبلّغ حاجة تانية (queue، أو إيميل، أو webhook، أو search index). ونادرًا ما بتبان في التطوير. في الإنتاج بتبان كطلبات مدفوعة من غير شحن، أو إيصالات لعمليات اتلغت، ومحدش يعرف يفسّرها.",
            how: R`الضمان: الـ outbox والتعديل في نفس الـ transaction، فالقاعدة بتضمن الاتنين مع بعض. والـ relay بيضمن إن أي صف في outbox هيتنشر في الآخر، حتى لو وقع ١٠ مرات. النتيجة at-least-once: الحدث ممكن يتنشر مرتين (الـ relay نشر ووقع قبل ما يعلّم)، بس عمره ما يضيع.

[[FOR UPDATE SKIP LOCKED]]: لو شغّلت أكتر من relay (أو أكتر من نسخة من السيرفر فيها relay)، كل واحد بيقفل الصفوف اللي أخدها، والتاني بيعدّيها ويا خد اللي بعدها. فمفيش اتنين بينشروا نفس الحدث في نفس الوقت، ومفيش حد بيستنى التاني.

[[jobId: outbox-id]]: BullMQ بيتجاهل job بنفس الـ jobId لو لسه موجودة، فلو الـ relay نشر ووقع قبل الـ UPDATE، وعاد، التكرار مش هيعمل job تانية (طالما الأولى لسه متشالتش). وده مش بديل عن إن المستهلك يبقى idempotent.

ليه transaction حوالين الـ relay؟ عشان الـ lock بتاع [[FOR UPDATE]] يفضل ماسك لحد الـ UPDATE. خليها قصيرة (١٠٠ صف) عشان متمسكش locks كتير. وشغّله كل ثانية أو اتنين (BullMQ job scheduler، أو loop في worker)، أو اصحى فورًا بـ LISTEN/NOTIFY في Postgres.

الـ id [[bigint]]: Prisma بيرجّعه BigInt من [[$queryRaw]]. الـ template string بتحوّله نص عادي، و Prisma بيبعت الـ array كـ Postgres array في [[ANY()]].

والتنضيف: امسح الصفوف المنشورة الأقدم من كام يوم بـ job دوري، وإلا الجدول بيكبر للأبد.

البديل: CDC (change data capture) زي Debezium بيقرا الـ WAL بتاع Postgres وينشر التغييرات، من غير جدول outbox ولا polling. أقوى وأعقد. والـ outbox بـ polling كفاية لأغلب المشاريع.

والنمط العكسي (inbox): المستهلك بيسجّل الـ event id في جدول في نفس transaction شغله، ولو جاله نفس الـ id تاني يتجاهله. ده اللي بيقفل الدايرة لـ «effectively once».`,
            when: "أي تعديل في القاعدة لازم يطلع منه event لحاجة برّه: دفع، وتسجيل، وتغيير حالة طلب. ولو الحدث مش مهم لو ضاع (analytics تقريبية)، النشر المباشر بعد الـ commit مقبول.",
            mistakes: R`تنشر جوه الـ transaction قبل الـ commit (الحدث طلع والـ transaction اترجعت). وتنشر بعد الـ commit وتفتكر إن ده كفاية. و relay من غير SKIP LOCKED فنسختين ينشروا نفس الصفوف. ومستهلك مش idempotent. وجدول outbox من غير index ولا تنضيف. وسؤال انترفيو مشهور: «إزاي تضمن إن الحفظ في القاعدة وإرسال الرسالة للـ queue يحصلوا الاتنين أو ولا واحد؟»، والإجابة: transactional outbox (أو CDC)، مش two-phase commit.`
          },
          teach: R`## اكتب الحدث في القاعدة، وحد تاني ينشره

المثال جزئين. الأول transaction بتعلّم الطلب مدفوع **وفي نفس الـ transaction** بتكتب الحدث في جدول [[outbox]]. والتاني [[relayOutbox]]: بتاخد لحد ١٠٠ حدث لسه متنشرتش، وتقفلهم عشان محدش تاني ياخدهم، وتنشرهم في BullMQ، وتعلّم عليهم.

اتجرّب على ويندوز 11: PostgreSQL 16.13 في Docker ([[postgres:16-alpine]]، بورت ٦٠١٤)، و BullMQ 6.3 و Redis 8.10. **من غير Prisma**: نفس الـ SQL بالحرف اتبعت بمكتبة [[pg]] 8.23، ودالة [[tx()]] صغيرة بتعمل [[BEGIN]] و [[COMMIT]] و [[ROLLBACK]] زي ما [[db.$transaction]] بيعمل. فاللي بيخص Prisma نفسه (نوع [[bigint]] والـ template tags) من docs Prisma.

---

## ١. الـ solCode الأول: الجدول

~~~sql
CREATE TABLE outbox (
  id bigserial PRIMARY KEY,
  topic text NOT NULL,
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz
);
~~~

| العمود | النوع | ليه |
|---|---|---|
| [[id]] | [[bigserial]]: رقم ٦٤ bit بيزيد لوحده | الترتيب، و jobId |
| [[topic]] | نص | نوع الحدث ([[order.paid]]) |
| [[payload]] | [[jsonb]]: JSON متخزن binary | بيانات الحدث |
| [[created_at]] | وقت بالـ timezone، افتراضيًا [[now()]] | للتنضيف والمتابعة |
| [[published_at]] | فاضي ([[NULL]]) لحد ما يتنشر | ده «العلامة» |

~~~sql
CREATE INDEX outbox_unpublished ON outbox (id) WHERE published_at IS NULL;
~~~

index **جزئي**: فيه الصفوف اللي لسه متنشرتش بس. الجدول ممكن يبقى فيه ملايين صف منشور، والـ index فيه الكام صف اللي مستنيين. و [[EXPLAIN]] أكد إن الـ relay بيستخدمه:

~~~text الناتج (EXPLAIN لاستعلام الـ relay، من غير أرقام الـ cost)
 Limit
   ->  LockRows
         ->  Sort  Sort Key: id
               ->  Bitmap Heap Scan on outbox  Recheck Cond: (published_at IS NULL)
                     ->  Bitmap Index Scan on outbox_unpublished
~~~

~~~sql
INSERT INTO outbox (topic, payload)
SELECT 'order.paid', jsonb_build_object('orderId', g) FROM generate_series(1, 250) g;
~~~

[[generate_series(1, 250)]] بيطلّع الأرقام من ١ لـ ٢٥٠ كأنها جدول، و [[g]] اسم العمود، و [[jsonb_build_object('orderId', g)]] بيعمل [[{"orderId": 1}]]. يعني ٢٥٠ حدث في أمر واحد:

~~~text الناتج
INSERT 0 250
 id |   topic    |    payload     | published_at
----+------------+----------------+--------------
  1 | order.paid | {"orderId": 1} |
  2 | order.paid | {"orderId": 2} |
~~~

---

## ٢. الكتابة: transaction واحدة

~~~ts
await db.$transaction(async (tx) => {
  const order = await tx.order.update({ where: { id: orderId, status: "pending" }, data: { status: "paid", paidAt: new Date() } });
  await tx.outbox.create({ data: { topic: "order.paid", payload: { orderId: order.id, total: order.total } } });
});
~~~

- [[db.$transaction(async (tx) => {...})]]: كل اللي جوه بـ [[tx]] بيتنفّذ في transaction واحدة. لو الدالة رمت، كله بيترجع (rollback).
- [[where: { id, status: "pending" }]]: حدّث **بس** لو لسه pending. لو اتدفع قبل كده، Prisma بيرمي (مفيش صف) والحدث ميتكتبش تاني.
- السطر التاني: الحدث نفسه صف في الجدول. مفيش Redis ولا شبكة هنا.

جرّبنا ٣ حالات بنفس الخطوات (UPDATE بشرط [[status='pending']]، وبعده INSERT في outbox):

~~~text الناتج
pay 9001 ok
pay 9002: boom after outbox insert
pay 9001 again: order not pending
[ { id: 9001, status: 'paid' }, { id: 9002, status: 'pending' } ] outbox rows added: 1
~~~

- ٩٠٠١: اتدفع، وصف واحد في outbox.
- ٩٠٠٢: رمينا error **بعد** الـ INSERT في outbox. الطلب فضل [[pending]] والصف اتشال. ده الضمان: يا الاتنين يا ولا واحد.
- ٩٠٠١ تاني: الشرط منعه، ومفيش حدث مكرر.

---

## ٣. الـ relay

~~~ts
export async function relayOutbox() {
  return db.$transaction(async (tx) => {
~~~

transaction عشان الـ lock يفضل ماسك من الـ SELECT لحد الـ UPDATE.

~~~ts
    const rows = await tx.$queryRaw<{ id: bigint; topic: string; payload: unknown }[]>$__bt
      SELECT id, topic, payload FROM outbox
      WHERE published_at IS NULL ORDER BY id LIMIT 100
      FOR UPDATE SKIP LOCKED$__bt;
~~~

- [[$queryRaw]] مع template (backticks): Prisma بيحوّل أي [[$__{...}]] جوه لـ parameter آمن، فمفيش SQL injection. والـ [[<...>]] نوع الصفوف.
- [[WHERE published_at IS NULL ORDER BY id LIMIT 100]]: أقدم ١٠٠ لسه متنشرتش.
- [[FOR UPDATE]]: اقفل الصفوف دي لحد آخر الـ transaction. أي حد تاني عايز يقفلها لازم يستنى.
- [[SKIP LOCKED]]: بدل ما تستنى، عدّي الصفوف المقفولة وخد اللي بعدها.

~~~ts
    for (const r of rows) await events.add(r.topic, r.payload, { jobId: $__btoutbox-$__{r.id}$__bt });
~~~

[[events]] queue في BullMQ. و [[jobId: outbox-17]]: لو job بنفس الـ id موجودة، BullMQ بيتجاهل الإضافة. (والـ jobId مينفعش يبقى رقم بس ولا فيه [[:]]، عشان كده [[outbox-]] قبله.)

~~~ts
    if (rows.length) await tx.$executeRaw$__btUPDATE outbox SET published_at = now() WHERE id = ANY($__{rows.map((r) => r.id)})$__bt;
    return rows.length;
  });
}
~~~

- [[rows.map((r) => r.id)]]: array الـ ids، و Prisma بيبعتها كـ array واحدة.
- [[id = ANY(array)]]: يساوي أي عنصر فيها. أمر UPDATE واحد للـ ١٠٠.
- [[return rows.length]]: كام اتنشر، للـ logs.

---

## ٤. الـ try: ٣ relays مع بعض على ٢٥٠ صف

~~~ts
await Promise.all([relayOutbox(), relayOutbox(), relayOutbox()]);
~~~

كل relay ليه connection وtransaction لوحده. وعدّينا كل id اتنشر:

~~~text الناتج (FOR UPDATE SKIP LOCKED)
3 relays in parallel: [ 100, 100, 50 ] in 111 ms
again: [ 0, 0, 0 ]
published total: 250 unique: 250 jobs in queue: 250
~~~

كل relay خد صفوف مختلفة، والمجموع ٢٥٠ بالظبط من غير تكرار. والمرة التانية مفيش حاجة.

### من غير [[SKIP LOCKED]]

~~~text الناتج (FOR UPDATE بس)
3 relays in parallel: [ 100, 50, 100 ] in 253 ms
published total: 250 unique: 250 jobs in queue: 250
~~~

صح، بس أبطأ مرتين ونص: التانيين استنوا الأول يخلص، وبعدها Postgres رجع يفحص الـ WHERE فلقاهم اتنشروا، وكمّل بعدهم.

### من غير قفل خالص

~~~text الناتج (من غير FOR UPDATE)
3 relays in parallel: [ 100, 100, 100 ] in 130 ms
again: [ 100, 100, 100 ]
published total: 600 unique: 200 jobs in queue: 200
~~~

التلاتة شافوا نفس أول ١٠٠ ونشروهم، وبعدين نفس التانية. ٦٠٠ نشر لـ ٢٠٠ حدث بس، والـ ٥٠ الأخيرة لسه مستنية. و [[jobs in queue: 200]]: الـ [[jobId]] هو اللي منع التكرار يوصل للـ queue. ده بيوضح ليه الاتنين مع بعض: القفل بيمنع الشغل المكرر، والـ jobId شبكة أمان.

### نوع الـ id

مع [[pg]] الـ [[bigint]] بيرجع نص ([[typeof]] = [[string]])، ومع Prisma [[$queryRaw]] بيرجع [[BigInt]] (من docs Prisma). في الحالتين [[outbox-1]] بيطلع صح في الـ template.

---

## الخلاصة

| الجزء | الكود | الضمان |
|---|---|---|
| الكتابة | التعديل + [[outbox.create]] في transaction | يا الاتنين يا ولا واحد |
| الاختيار | [[WHERE published_at IS NULL ORDER BY id LIMIT 100]] | الأقدم الأول، بدفعات |
| القفل | [[FOR UPDATE SKIP LOCKED]] | كل relay ياخد صفوف مختلفة من غير استنى |
| النشر | [[jobId: outbox-id]] | التكرار ميعملش job تانية |
| العلامة | [[UPDATE ... published_at = now()]] | ميتنشرش تاني |

- at-least-once: ممكن حدث يتنشر مرتين (relay نشر ووقع قبل العلامة)، بس عمره ما يضيع. فالمستهلك idempotent.
- index جزئي على اللي لسه متنشرش، وتنضيف دوري للمنشور.`,
          lines: [
            "transaction واحدة:",
            "علّم الطلب مدفوع (بشرط إنه كان pending، فالتكرار ميعملش حاجة).",
            "واكتب الحدث في outbox في نفس الـ transaction: يا الاتنين يتحفظوا يا ولا واحد.",
            "قفلة.",
            "الـ relay: بيتنادى كل ثانية أو اتنين.",
            "transaction عشان الـ lock يفضل لحد التعليم.",
            "هات...",
            "...الأحداث...",
            "...اللي لسه متنشرتش، بالترتيب، ١٠٠ بس...",
            "...واقفلها، وعدّي أي صف relay تاني قافله.",
            "انشر كل واحد، والـ jobId من id الصف عشان التكرار ميعملش job تانية.",
            "علّم اللي اتنشر.",
            "رجّع العدد (للـ logs والـ metrics).",
            "قفلة.",
            "قفلة."
          ],
          sol: R`٣ relays بالتوازي على ٢٥٠ صف: الأعداد زي [[100, 50, 100]] (الترتيب بيختلف)، والمجموع ٢٥٠ بالظبط ومفيش ولا id اتكرر. SKIP LOCKED خلى كل relay ياخد صفوف مختلفة.

لو شلت [[SKIP LOCKED]]: الـ relays التانيين بيستنوا الأول يخلص، وبعدين ياخدوا الـ ١٠٠ اللي بعدهم، فالنتيجة صح بس أبطأ. ولو شلت [[FOR UPDATE]] كلها: هتلاقي نفس الـ ids اتنشرت أكتر من مرة (في تجربتنا ٦٠٠ نشر لـ ٢٠٠ حدث بس، والـ ٥٠ الأخيرة لسه مستنية). والـ queue فيها ٢٠٠ job مش ٦٠٠، لأن [[jobId]] منع التكرار يوصلها.

والـ transaction اللي فيها throw: لا الطلب اتعلّم paid ولا صف outbox اتضاف. ده الضمان كله.`,
          solCode: R`CREATE TABLE outbox (
  id bigserial PRIMARY KEY,
  topic text NOT NULL,
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz
);
CREATE INDEX outbox_unpublished ON outbox (id) WHERE published_at IS NULL;
INSERT INTO outbox (topic, payload)
SELECT 'order.paid', jsonb_build_object('orderId', g) FROM generate_series(1, 250) g;`
        }
      ]
    }
]);
