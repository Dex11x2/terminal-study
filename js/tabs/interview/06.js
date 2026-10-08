// تكملة تاب interview: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/interview/01.js (شرح حقول الدرس في أوله)
MORE("interview", [
    {
      t: "التزامن والذاكرة",
      l: 2,
      n: "أسئلة «فاهم الكود بيتنفّذ إزاي فعلًا؟»، وكلها ليها علاقة مباشرة بـ Node وبالداتابيز",
      items: [
        {
          cmd: "concurrency ≠ parallelism",
          title: "إيه الفرق بين إن مهام كتير تتقدم مع بعض، وإنها تشتغل في نفس اللحظة؟ وده يخص Node إزاي؟",
          desc: R`الـ concurrency إنك تدير كذا مهمة في نفس الفترة وتبدّل بينهم، زي طباخ واحد بيقلّب في ٣ حلل. الـ parallelism إنهم يشتغلوا فعلًا في نفس اللحظة على أكتر من core، زي ٣ طباخين. Node بيعمل concurrency عالية بـ thread واحد للـ JavaScript و event loop: وهو مستني الداتابيز أو الشبكة بيخدم طلبات تانية. بس لو فيه حساب تقيل على الـ CPU، كل الطلبات بتقف.

وللـ parallelism في Node: [[worker_threads]] للحسابات التقيلة، أو كذا process (cluster أو pm2 أو كذا container) عشان تستخدم كل الـ cores. تفاصيل الـ event loop في تاب JavaScript.`,
          example: R`// احفظه c.mjs وشغّله: node c.mjs
const sleep = ms => new Promise(r => setTimeout(r, ms));
console.time("serial");
await sleep(500); await sleep(500);
console.timeEnd("serial");
console.time("concurrent");
await Promise.all([sleep(500), sleep(500)]);
console.timeEnd("concurrent");
const t = Date.now(); while (Date.now() - t < 500) {}
// serial: ~1s | concurrent: ~500ms`,
          try: "اعمل سيرفر Express فيه route بيعمل اللوب الأخير ده ٥ ثواني، و route تاني عادي. افتح الأول وبسرعة الثاني: التاني هيستنى. ده الـ event loop وهو مقفول.",
          flag: "script",
          deep: {
            why: "كل مطور Node لازم يعرف ليه سيرفره بيستحمل آلاف الاتصالات، وليه endpoint واحد تقيل ممكن يوقف الكل. ده سؤال شبه أكيد لأي دور backend بـ Node.",
            how: R`الـ event loop بيشغّل الـ JavaScript على thread واحد. أي I/O (شبكة، وداتابيز) بيتسلّم للنظام، ولما النتيجة تيجي الـ callback بيدخل الطابور. الـ promises بتدخل طابور الـ microtasks اللي بيخلص كله قبل أي timer أو I/O callback.

الـ I/O بتاع الشبكة بيستخدم آليات النظام (epoll على لينكس، و IOCP على ويندوز)، وحاجات زي قراية الملفات و [[crypto.pbkdf2]] و [[zlib]] و [[dns.lookup]] بتروح لـ thread pool في libuv حجمه ٤ افتراضيًا ([[UV_THREADPOOL_SIZE]]). يعني Node مش thread واحد بالكامل: الـ JavaScript بتاعك بس هو اللي على thread واحد.

الحساب التقيل (تشفير كبير، ومعالجة صور، و JSON ضخم) بيحجز الـ thread، فالحل worker_thread أو queue تشتغل في process تاني. وفي Python الـ GIL بيمنع الـ threads تشغّل Python بالتوازي (وفيه build تجريبي من غيره من 3.13)، فالـ parallelism هناك غالبًا بـ processes.`,
            when: "Follow-ups: «Node single-threaded إزاي بيخدم آلاف الطلبات؟». «endpoint بيعمل حساب تقيل وبيبطّأ الكل، تعمل إيه؟». «Promise.all ولا await جوه for؟». «إيه هو الـ thread pool بتاع libuv؟».",
            mistakes: R`تقول async يعني parallel. وتقول Node single-threaded بالكامل. و await جوه for لطلبات مستقلة عن بعض فتاخد مجموع الأوقات. واستخدام دوال sync زي [[bcrypt.hashSync]] أو [[readFileSync]] جوه request handler.`
          },
          teach: R`## الفكرة في جملة

السكربت بيستنى نص ثانية مرتين: مرة ورا بعض، ومرة مع بعض بـ [[Promise.all]]. التانية بتاخد نص الوقت من غير أي thread زيادة: ده concurrency. وفي الآخر لوب بيحجز المعالج: ده اللي بيوقف Node كله. شغلناه بـ Node 24 على ويندوز، ومعاه سيرفر الـ solCode.

---

## ١. [[sleep]]

~~~js
const sleep = ms => new Promise(r => setTimeout(r, ms));
~~~

- [[new Promise(r => ...)]]: promise، و [[r]] هي الدالة اللي بتقول «خلصت» (resolve).
- [[setTimeout(r, ms)]]: بعد [[ms]] مللي ثانية نادي [[r]].

الاستنا هنا **مش** بيحجز الـ thread: الـ timer متسجل عند الـ event loop، والـ JavaScript فاضي يعمل حاجة تانية.

---

## ٢. ورا بعض

~~~js
console.time("serial");
await sleep(500); await sleep(500);
console.timeEnd("serial");
~~~

- [[await]]: استنى الـ promise ده يخلص قبل السطر اللي بعده. ([[await]] على مستوى الملف مسموح لأنه [[.mjs]].)
- التاني مبيبدأش غير لما الأول يخلص: 500 + 500.

~~~text الناتج
serial: 1.015s
~~~

---

## ٣. مع بعض

~~~js
console.time("concurrent");
await Promise.all([sleep(500), sleep(500)]);
console.timeEnd("concurrent");
~~~

- [[sleep(500), sleep(500)]] جوه الـ array: الاتنين **بدأوا** في نفس اللحظة (الـ timers اتسجلوا).
- [[Promise.all([...])]]: promise واحد بيخلص لما **كلهم** يخلصوا.

~~~text الناتج
concurrent: 511.695ms
~~~

نص الوقت. الاتنين كانوا «شغالين» في نفس الفترة، بس مفيش ولا سطر JavaScript اتنفّذ في نفس اللحظة: الـ thread كان فاضي ومستني. ده **concurrency** مش parallelism. ونفس الكلام لو بدل [[sleep]] كان عندك ٢ queries للداتابيز مستقلين.

---

## ٤. اللوب اللي بيحجز

~~~js
const t = Date.now(); while (Date.now() - t < 500) {}
~~~

- [[Date.now()]]: الوقت بالمللي ثانية.
- [[while (...) {}]]: لف على الفاضي لحد ما تعدّي ٥٠٠ms. ده busy loop: المعالج شغال ١٠٠٪ والـ thread محجوز.

ضفنا timer قبله عشان نشوف الأثر:

~~~js
setTimeout(() => console.log("timer 10ms fired after", Date.now() - start, "ms"), 10);
~~~

~~~text الناتج
cpu loop done
timer 10ms fired after 500 ms
~~~

الـ timer اللي المفروض بعد ١٠ms اشتغل بعد **٥٠٠ms**: الـ event loop مقدرش يلف لحد ما اللوب خلص.

---

## ٥. نفس الكلام في سيرفر (الـ solCode)

سيرفر Express فيه [[/slow]] بيعمل اللوب ده ٥ ثواني، و [[/fast]] بيرد على طول. قسنا [[/fast]] بـ [[curl -w "%{time_total}"]]:

~~~text الناتج
fast alone 0.009072s
fast while slow 4.644995s
~~~

طلب [[/fast]] لوحده: ٩ ميلي. وهو [[/slow]] شغال: **٤.٦ ثانية**، لأنه استنى الـ thread الوحيد اللي بيشغّل JavaScript. كل اليوزرز على السيرفر ده وقفوا.

---

## ٦. طب parallelism إزاي؟

الجهاز ده عنده 16 logical processor ([[os.availableParallelism()]] طلّع [[16]])، و Node بيستخدم واحد بس للـ JavaScript. عشان تستخدم الباقي:

| الطريقة | إمتى |
|---|---|
| [[worker_threads]] | حساب تقيل جوه نفس التطبيق (الدرس الجاي) |
| كذا process (cluster، pm2، كذا container) | السيرفر كله يستخدم كل الـ cores |
| queue و worker في process تاني | شغل تقيل ممكن يستنى (صور، تقارير) |

---

## الخلاصة

| | concurrency | parallelism |
|---|---|---|
| المعنى | كذا مهمة بتتقدم في نفس الفترة | كذا مهمة بتتنفّذ في نفس اللحظة |
| محتاج | event loop أو threads | أكتر من core |
| في Node | [[await]] و [[Promise.all]] على I/O | workers أو processes |
| بيقع لو | فيه حساب sync تقيل | — |

> [[async]] على دالة فيها لوب تقيل مبيحلّش حاجة: اللوب لسه sync وماسك الـ thread.`,
          lines: [
            "دالة بتستنى ms من غير ما تقفل الـ thread.",
            "عدّاد للتنفيذ ورا بعض.",
            "استنى نص ثانية، وبعدين نص ثانية تانية: المجموع ثانية.",
            "اطبع الوقت.",
            "عدّاد للتنفيذ مع بعض.",
            "الاتنين مع بعض: الوقت نص ثانية بس. concurrency من غير أي thread إضافي.",
            "اطبع الوقت.",
            "لوب CPU بيحجز الـ thread نص ثانية: في سيرفر، ولا طلب تاني هيتخدم في الوقت ده."
          ],
          sol: R`لو فتحت [[/slow]] وبعدها على طول [[/fast]]، الـ fast مش هيرد في ميلي ثانية: هيستنى لحد ما الـ slow يخلص. جربتها بـ curl وطلع [[fast took 4.65s]]، ولما اتطلب لوحده [[0.002s]]. السبب إن اللوب ده sync فماسك الـ thread الوحيد اللي بيشغّل JavaScript، والـ event loop مش قادر ياخد أي طلب تاني ولا حتى يشغّل timer.

وده الفرق اللي في العنوان: [[await sleep]] أو query على الداتابيز بيسيب الـ thread فاضي (concurrency)، لكن الحساب التقيل مبيسيبوش. الحل مش [[async]] على الدالة (مش هيفرق حاجة، والنتيجة الغلط الشائعة إن الناس تفتكر إنه هيحل)، الحل worker thread أو process تاني أو queue، زي الدرس اللي بعده.`,
          solCode: R`// block.mjs: node block.mjs ثم في ترمنالين: curl localhost:3100/slow و curl localhost:3100/fast
import express from "express";
const app = express();
app.get("/slow", (req, res) => {
  const t = Date.now();
  while (Date.now() - t < 5000) {}
  res.send("slow done\n");
});
app.get("/fast", (req, res) => res.send("fast\n"));
app.listen(3100, () => console.log("http://localhost:3100"));
// curl -s -o /dev/null -w "fast took %{time_total}s\n" localhost:3100/fast
// fast took 4.653611s   ← وهو /slow شغال
// fast took 0.001997s   ← لوحده`
        },
        {
          cmd: "ذاكرة منفصلة ولا مشتركة",
          title: "إيه الفرق بين الـ process والـ thread؟",
          desc: R`الـ process برنامج شغال بذاكرة لوحده معزولة، ولو وقع مبيوقعش غيره. الـ thread خط تنفيذ جوه process، والـ threads في نفس الـ process بيشاركوا نفس الذاكرة. فالـ threads أخف وأسرع في التواصل لأنهم شايفين نفس الداتا، بس ده نفسه اللي بيعمل race conditions ومحتاج locks. والـ processes أتقل بس أأمن، وبيتواصلوا بـ IPC أو الشبكة أو الداتابيز.

مثال عملي: Chrome بيشغّل التابات في processes منفصلة عشان تاب واقع ميوقعش الباقي. و Node بيشغّل الـ JavaScript في thread واحد، ولو عايز cores أكتر بتشغّل كذا process وقدامهم load balancer.`,
          example: R`// احفظه w.mjs وشغّله: node w.mjs
import { Worker, isMainThread, parentPort } from "node:worker_threads";
if (isMainThread) {
  const w = new Worker(new URL(import.meta.url));
  w.on("message", sum => console.log("from worker:", sum));
  console.log("main thread is free");
} else {
  let s = 0; for (let i = 0; i < 1e9; i++) s += i;
  parentPort.postMessage(s);
}
// main thread is free   ← بيطبع على طول
// from worker: 499999999067109000   ← بعد ثانية تقريبًا`,
          try: "شغّله، وبعدين انقل لوب المليار للـ main thread من غير Worker: «main thread is free» هتتأخر لحد ما اللوب يخلص.",
          flag: "script",
          deep: {
            why: "أساس أي كلام عن الأداء والـ scaling والأعطال: ليه الـ container بيوقع لوحده، وليه الـ threads محتاجة حذر، وليه Node بيعمل scale بـ processes.",
            how: R`كل process ليها virtual address space خاص بيها، و PID، وملفات مفتوحة، ونظام التشغيل بيوزّع وقت المعالج بين الـ processes والـ threads (scheduling). التبديل بينهم (context switch) ليه تكلفة، وبين الـ processes أغلى لأن الذاكرة كلها بتتبدل.

الـ threads في نفس الـ process بيشاركوا الـ heap والملفات المفتوحة، بس كل thread ليه stack خاص بيه ومكان تنفيذ خاص. عشان كده متغير مشترك بين threadين محتاج lock.

في Node كل worker thread ليه V8 isolate و event loop لوحده، فمبيشاركوش objects JavaScript عادي: بيتكلموا برسايل ([[postMessage]] بتنسخ الداتا)، أو [[SharedArrayBuffer]] مع [[Atomics]] لو محتاج ذاكرة مشتركة فعلًا. والـ containers نفسها مجرد processes معزولة بـ namespaces و cgroups. التفاصيل في تاب Docker.`,
            when: "Follow-ups: «ليه Chrome بيستخدم processes؟». «worker thread ولا child process؟». «الـ threads بيشاركوا إيه ومش بيشاركوا إيه؟». «context switch يعني إيه؟». «الـ container هو VM؟».",
            mistakes: R`إن الـ threads ملهاش تكلفة. وإن worker_threads في Node بيشاركوا الـ objects عادي. وتخلط process بـ program (البرنامج ملف، والـ process نسخة شغالة منه). وتقول الـ container VM صغيرة.`
          },
          teach: R`## الفكرة في جملة

الملف بيشغّل **نفسه** مرتين: مرة كـ main thread، ومرة جوه Worker thread. الحساب التقيل (جمع مليار رقم) بيحصل في الـ worker، والـ main thread يفضل فاضي. ده بيوريك الـ thread عمليًا: نفس الـ process، بس خط تنفيذ تاني بذاكرة JavaScript منفصلة. شغلناه بـ Node 24 على ويندوز.

---

## ١. الاستيراد

~~~js
import { Worker, isMainThread, parentPort } from "node:worker_threads";
~~~

| الاسم | معناه |
|---|---|
| [[Worker]] | class بتشغّل ملف JavaScript في thread جديد |
| [[isMainThread]] | [[true]] لو الكود ده شغال في الـ thread الأساسي |
| [[parentPort]] | جوه الـ worker: القناة اللي بيكلم بيها الـ main thread |

---

## ٢. فرع الـ main thread

~~~js
if (isMainThread) {
  const w = new Worker(new URL(import.meta.url));
  w.on("message", sum => console.log("from worker:", sum));
  console.log("main thread is free");
~~~

- [[import.meta.url]]: عنوان الملف الحالي ([[file:///...w.mjs]]). و [[new URL(...)]] بيحوّله URL object، و [[Worker]] بيقبله. يعني «شغّل نفس الملف ده في thread جديد».
- [[w.on("message", fn)]]: لما الـ worker يبعت رسالة نادي [[fn]].
- [[console.log("main thread is free")]]: بيتنفّذ **على طول**، لأن [[new Worker]] مبيستناش الـ worker يخلص.

---

## ٣. فرع الـ worker

~~~js
} else {
  let s = 0; for (let i = 0; i < 1e9; i++) s += i;
  parentPort.postMessage(s);
}
~~~

جوه الـ worker، [[isMainThread]] بـ [[false]] فبيدخل هنا: يلف مليار مرة ([[1e9]])، ويبعت النتيجة بـ [[postMessage]].

---

## ٤. التشغيل

ضفنا طباعة الـ PID والـ [[threadId]] و timer في الـ main:

~~~text الناتج
main thread is free pid 34320 threadId 0
main timer 10ms fired after 19 ms
worker pid 34320 threadId 1
from worker: 499999999067109000 after 990 ms
~~~

اقرا الأرقام:

- **نفس الـ PID** (34320): الاتنين جوه process واحدة. ده thread مش process.
- [[threadId]] 0 للـ main و 1 للـ worker: خطين تنفيذ.
- الـ timer بتاع ١٠ms اشتغل بعد ١٩ms: الـ main كان فاضي فعلًا (الـ ٩ms الزيادة وقت تشغيل الـ worker نفسه).
- النتيجة وصلت بعد حوالي ثانية.

---

## ٥. من غير Worker (الـ solCode)

نفس اللوب في الـ main thread:

~~~text الناتج
sum: 499999999067109000
main thread is free after 885 ms
timer 10ms fired after 885 ms
~~~

الترتيب اتعكس، والـ timer اتأخر لـ ٨٨٥ms. الـ event loop كان واقف طول اللوب.

> ملاحظة جانبية: المجموع الصح 499,999,999,500,000,000 (حسبناه بـ [[BigInt]])، والناتج طلع 499999999067109000. ده مش bug في الـ thread: الرقم أكبر من [[Number.MAX_SAFE_INTEGER]] (حوالي 9 × 10¹⁵)، فالـ [[number]] العادي فقد دقة وهو بيجمع.

---

## ٦. الـ process والـ thread

| | process | thread |
|---|---|---|
| الذاكرة | لوحدها، معزولة | مشتركة مع باقي threads الـ process |
| لو وقع | الباقي سليم | ممكن يوقّع الـ process كله |
| التكلفة | أتقل في الإنشاء والتبديل | أخف |
| التواصل | IPC، أو شبكة، أو داتابيز | الذاكرة نفسها (ومحتاج locks) |
| في المثال | PID 34320 | threadId 0 و 1 |

وفي Node بالذات: كل worker ليه V8 isolate و heap لوحده، فالمتغيرات **مش** مشتركة. [[postMessage]] بيبعت **نسخة** من الداتا. الاستثناء [[SharedArrayBuffer]] مع [[Atomics]].

---

## الخلاصة

- process = برنامج شغال بذاكرة معزولة. thread = خط تنفيذ جوه process.
- الـ worker في Node thread حقيقي (نفس الـ PID)، بس بيتكلم برسايل زي الـ processes.
- الحساب التقيل في worker، والـ main يفضل يخدم الطلبات.`,
          lines: [
            "أدوات الـ worker threads.",
            "لو ده الـ thread الأساسي:",
            "شغّل نفس الملف في worker thread جديد.",
            "لما الـ worker يبعت النتيجة اطبعها.",
            "الـ thread الأساسي فاضي يكمّل شغله على طول.",
            "غير كده (احنا جوه الـ worker):",
            "حساب تقيل: جمع مليار رقم.",
            "ابعت النتيجة للـ thread الأساسي برسالة.",
            "قفلة."
          ],
          sol: R`مع الـ Worker: [[main thread is free]] بتطبع فورًا، و [[from worker: 499999999067109000]] بعدها بأقل من ثانية. ولما تنقل اللوب للـ main thread الترتيب بيتعكس: الناتج بييجي الأول، و «main thread is free» بعد ما اللوب يخلص (عندي ٨١٣ms). وأي timer كان المفروض يشتغل بعد 10ms هيشتغل بعد ٨١٣ms برضو، لأن الـ event loop كان واقف.

والنقطة اللي تربطها بالسؤال: الـ Worker thread جوه نفس الـ process بس ليه V8 isolate وheap لوحده، فمبيشاركش المتغيرات مع الـ main thread، والكلام بينهم بـ [[postMessage]] (نسخة من الداتا). ده أقرب لسلوك الـ processes، والاستثناء إن [[SharedArrayBuffer]] ممكن يتشارك فعلًا، ومعاه ترجع مشاكل الـ race conditions.`,
          solCode: R`// main.mjs: نفس اللوب من غير Worker
const start = Date.now();
setTimeout(() => console.log("timer 10ms fired after", Date.now() - start, "ms"), 10);
let s = 0; for (let i = 0; i < 1e9; i++) s += i;
console.log("sum:", s);
console.log("main thread is free after", Date.now() - start, "ms");
// sum: 499999999067109000
// main thread is free after 813 ms
// timer 10ms fired after 813 ms`
        },
        {
          cmd: "check-then-act و circular wait",
          title: "يعني إيه race condition و deadlock؟ وممكن يحصلوا في Node وهو thread واحد؟",
          desc: R`الـ race condition لما النتيجة بتعتمد على ترتيب حاجتين شغالين مع بعض. أشهر شكل check-then-act: طلبين في نفس الوقت شافوا إن المخزون ١، والاتنين باعوا. وأيوه بتحصل في Node: كل [[await]] بيسيب الـ event loop يخدم طلب تاني في النص، وكمان غالبًا عندك كذا instance وداتابيز واحدة. والحل إن العملية تبقى atomic: [[UPDATE ... SET stock = stock - 1 WHERE stock > 0]] وتشوف كام صف اتغير، أو transaction مع [[SELECT ... FOR UPDATE]]، أو unique constraint.

والـ deadlock لما اتنين كل واحد ماسك حاجة ومستني اللي مع التاني، فمحدش بيتحرك: transaction قفلت صف A ومستنية B، والتانية قفلت B ومستنية A. الحل ترتيب ثابت للقفل، ومهلة، و retry. و PostgreSQL بيكتشفه ويلغي واحدة منهم.`,
          example: R`// احفظه r.mjs وشغّله: node r.mjs
let stock = 1;
const read = async () => { await null; return stock; };
async function buy() {
  const s = await read();
  if (s > 0) { stock = s - 1; return "ok"; }
  return "sold out";
}
console.log(await Promise.all([buy(), buy()]), stock);
// [ 'ok', 'ok' ] 0   ← اتباع ٢ والمخزون كان ١
// الحل في SQL: خصم atomic، ولو rowCount = 0 يبقى خلص
// UPDATE products SET stock = stock - 1 WHERE id = $1 AND stock > 0;`,
          try: "شغّله وشوف البيعتين. بعدين غيّر [[buy]] بحيث الخصم والتشيك يحصلوا من غير await في النص، وشوف النتيجة. في مشروع بداتابيز جرّب نفس الفكرة بطلبين متوازيين من [[Promise.all]].",
          flag: "script",
          deep: {
            why: "الـ bugs دي مبتظهرش وانت بتجرب لوحدك، وبتظهر في الإنتاج وقت الزحمة: كوبون اتستخدم مرتين، ودفع اتسجل مرتين، ومخزون بالسالب. وده بيفرق جامد في أي نظام فيه فلوس.",
            how: R`الجزء اللي لازم يتنفّذ من غير مقاطعة اسمه critical section. في كود multi-threaded بنحميه بـ mutex. في Node مفيش مقاطعة بين سطرين sync، بس أي await نقطة ممكن طلب تاني يدخل فيها، والداتابيز مشتركة بين كل الـ instances، فالحماية لازم تبقى في الداتابيز.

أدوات الداتابيز: عملية واحدة atomic ([[UPDATE ... WHERE stock > 0]] بتشيك وتعدّل في خطوة). و pessimistic locking: [[SELECT ... FOR UPDATE]] جوه transaction بيقفل الصف لحد الـ commit. و optimistic locking: عمود version، والـ update بيشترط [[WHERE version = 3]]، ولو محدش اتغير تعيد. و unique constraint يمنع التكرار من أساسه (زي استخدام كوبون مرة لكل يوزر).

الـ deadlock ليه ٤ شروط لازم يتحققوا مع بعض: mutual exclusion، و hold and wait، و no preemption، و circular wait. اكسر أي واحد يختفي، وأسهلهم عمليًا الترتيب الثابت (دايمًا اقفل الـ ids من الصغير للكبير). والـ PostgreSQL لما يلاقي deadlock بيلغي transaction برسالة [[deadlock detected]]، والكود بتاعك لازم يعمل retry.`,
            when: "Follow-ups: «إزاي تمنع إن كوبون يستخدم مرتين؟». «optimistic ولا pessimistic locking؟». «PostgreSQL بيعمل إيه لما يلاقي deadlock؟». «إيه شروط الـ deadlock الأربعة؟». «mutex في الذاكرة ينفع لو عندك ٣ instances؟».",
            mistakes: R`تقول Node مفيهوش race conditions عشان single-threaded. وتحل بـ if في الكود قبل الـ update. وتحط lock في ذاكرة الـ process وعندك كذا instance. و transactions بتقفل نفس الصفوف بترتيب مختلف.`
          },
          teach: R`## الفكرة في جملة

المثال بيبيع آخر قطعة في المخزن لطلبين في نفس الوقت، والاتنين بيقولوا «ok». ده race condition من نوع check-then-act، وبيحصل في Node رغم إنه thread واحد، بسبب الـ [[await]]. شغلناه بـ Node 24 على ويندوز، وجربنا الحل في Postgres 16 حقيقي (كونتينر [[postgres:16-alpine]]) ومعاه deadlock.

---

## ١. الكود

~~~js
let stock = 1;
const read = async () => { await null; return stock; };
~~~

- [[stock]]: قطعة واحدة.
- [[read]]: دالة async بتمثّل query للداتابيز. [[await null]] بتعمل «وقفة» صغيرة زي ما الـ query بيستنى الشبكة: الدالة بتسيب الـ thread، والـ event loop يشغّل حاجة تانية، وبعدين ترجع.

~~~js
async function buy() {
  const s = await read();
  if (s > 0) { stock = s - 1; return "ok"; }
  return "sold out";
}
console.log(await Promise.all([buy(), buy()]), stock);
~~~

- [[const s = await read()]]: **check**: اقرا المخزون.
- [[if (s > 0) { stock = s - 1; ...]]: **act**: اخصم على أساس اللي قريته.
- [[Promise.all([buy(), buy()])]]: طلبين في نفس الوقت.

---

## ٢. اللي حصل خطوة خطوة

ضفنا [[console.log]] جوه [[buy]] باسم كل طلب:

~~~text الناتج
A read 1
A wrote 0
B read 1
B wrote 0
[ 'ok', 'ok' ] 0
~~~

غريبة: B طبع [[read 1]] **بعد** ما A كتب 0. ليه؟ لأن B **قرا** القيمة قبل كده، والطباعة جت متأخرة:

| الخطوة | A | B | stock |
|---|---|---|---|
| ١ | [[read()]] يوقف عند [[await null]] | | 1 |
| ٢ | | [[read()]] يوقف عند [[await null]] | 1 |
| ٣ | [[read]] يرجع 1 | | 1 |
| ٤ | | [[read]] يرجع 1 | 1 |
| ٥ | [[s = 1]]، يكتب 0، ok | | 0 |
| ٦ | | [[s = 1]] (قديمة!)، يكتب 0، ok | 0 |

بيعتين والمخزون كان قطعة واحدة. والقيمة اللي B شغال بيها كانت صح وقت ما قراها، وغلط وقت ما استخدمها. ده check-then-act.

---

## ٣. الحل في الـ JavaScript (الـ solCode)

~~~js
async function buy() {
  await read();
  if (stock > 0) { stock -= 1; return "ok"; }
  return "sold out";
}
~~~

~~~text الناتج
[ 'ok', 'sold out' ] 0
~~~

التشيك والخصم بقوا **في نفس الخطوة** من غير [[await]] بينهم. Node مبيقطعش كود sync في النص، فالسطر ده atomic بالنسبة للـ JavaScript.

بس ده بيحل المثال بس. في الحقيقة المخزون في الداتابيز، والقراية نفسها [[await]]، وغالبًا عندك كذا instance من السيرفر. فالحماية لازم تبقى **في الداتابيز**.

---

## ٤. نفس الحكاية على Postgres حقيقي

جربنا نسختين بطلبين متوازيين، ٣ مرات لكل واحدة:

~~~js
// naive: SELECT ثم UPDATE
const { rows } = await pool.query("SELECT stock FROM products WHERE id = $1", [id]);
if (rows[0].stock > 0) await pool.query("UPDATE products SET stock = $2 WHERE id = $1", [id, rows[0].stock - 1]);

// safe: الخصم نفسه هو التشيك
const r = await pool.query("UPDATE products SET stock = stock - 1 WHERE id = $1 AND stock > 0", [id]);
return r.rowCount === 1 ? "ok" : "sold out";
~~~

~~~text الناتج
naive [ 'ok', 'ok' ] stock = 0
naive [ 'ok', 'ok' ] stock = 0
naive [ 'ok', 'ok' ] stock = 0
safe [ 'sold out', 'ok' ] stock = 0
safe [ 'ok', 'sold out' ] stock = 0
safe [ 'ok', 'sold out' ] stock = 0
~~~

- [[$1]] و [[$2]]: placeholders، والقيم في الـ array بعدها (بتمنع SQL injection).
- [[WHERE ... AND stock > 0]]: Postgres بيقفل الصف وهو بيعدّله، فالطلب التاني بيستنى، ولما يقرا يلاقي 0 فالشرط يفشل.
- [[rowCount]]: كام صف اتعدّل. 1 = اشتريت. 0 = خلص.

---

## ٥. الـ deadlock بعينك

transactionين: A خصم من حساب 1 ومستني حساب 2، و B خصم من حساب 2 ومستني حساب 1:

~~~text الناتج
[ '40P01 deadlock detected', 'ok' ]
~~~

كل واحد ماسك صف ومستني صف التاني، فمحدش هيتحرك أبدًا. Postgres اكتشف الدايرة دي وألغى واحد منهم بكود [[40P01]]، والتاني كمّل. الكود بتاعك لازم يعمل retry للي اتلغى. والوقاية: اقفل الصفوف **بترتيب ثابت** (من الـ id الصغير للكبير)، فالدايرة مستحيل تتقفل.

---

## الخلاصة

| المشكلة | شكلها | الحل |
|---|---|---|
| race (check-then-act) | تقرا، [[await]]، تكتب على أساس قراية قديمة | عملية atomic: [[UPDATE ... WHERE stock > 0]] و [[rowCount]] |
| | | أو [[SELECT ... FOR UPDATE]] جوه transaction |
| | | أو unique constraint |
| deadlock | A مستني B و B مستني A | ترتيب ثابت للقفل، و retry على [[40P01]] |

> «Node single-threaded فمفيش race conditions» غلط: كل [[await]] باب، والداتابيز مشتركة بين كل الـ instances.`,
          lines: [
            "المخزون: قطعة واحدة.",
            "قراية المخزون async (زي query للداتابيز).",
            "عملية الشرا:",
            "اقرا المخزون، وهنا الطلب التاني ممكن يدخل.",
            "لو فيه، اخصم وقول ok. بس القيمة دي ممكن تكون قديمة.",
            "غير كده خلص.",
            "قفلة.",
            "طلبين في نفس الوقت: الاتنين قروا 1، والاتنين باعوا."
          ],
          sol: R`التشغيل الأول بيطبع [[[ 'ok', 'ok' ] 0]]: الاتنين قروا 1 قبل ما أي واحد يكتب، لأن الـ [[await]] بين القراية والكتابة سمح للتاني يدخل في النص. بعد ما تخلي التشيك والخصم في نفس الخطوة من غير await بينهم، الناتج [[[ 'ok', 'sold out' ] 0]]. Node مبيقطعش كود sync في النص، فأي حتة من غير await هي atomic بالنسبة للـ JavaScript.

بس في مشروع بداتابيز الحل ده مش كفاية، لأن القراية نفسها await والسيرفر ممكن يبقى كذا نسخة. جربتها على Postgres بـ [[Promise.all]]: نسخة SELECT ثم UPDATE طلعت [[[ 'ok', 'ok' ]]] في كل تشغيل، ونسخة [[UPDATE ... WHERE stock > 0]] مع [[rowCount]] طلعت ok واحدة و sold out واحدة دايمًا. لو النسخة الغلط طلعتلك صح أول مرة، غالبًا الـ pool كان لسه بيفتح connection التانية فالطلبين اتنفذوا ورا بعض: كرّر أو سخّن الـ pool.`,
          solCode: R`// r-fixed.mjs: التشيك والخصم من غير await في النص
let stock = 1;
const read = async () => { await null; return stock; };
async function buy() {
  await read();
  if (stock > 0) { stock -= 1; return "ok"; }
  return "sold out";
}
console.log(await Promise.all([buy(), buy()]), stock);
// [ 'ok', 'sold out' ] 0

// مع Postgres (npm i pg): الخصم نفسه هو التشيك
import pg from "pg";
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
async function buySafe(id) {
  const r = await pool.query("UPDATE products SET stock = stock - 1 WHERE id = $1 AND stock > 0", [id]);
  return r.rowCount === 1 ? "ok" : "sold out";
}`
        },
        {
          cmd: "reachability",
          title: "الـ stack والـ heap: إيه الفرق؟ والـ garbage collector بيقرر يمسح إيه إزاي؟",
          desc: R`الـ stack ذاكرة صغيرة ومترتبة لكل نداء دالة: متغيراتها المحلية ومكان الرجوع، وبتتشال لوحدها أول ما الدالة ترجع. الـ heap ذاكرة كبيرة للحاجات اللي بتعيش أكتر أو حجمها مش معروف: الـ objects والـ arrays والـ closures. في JavaScript الـ garbage collector بيمسح من الـ heap أي حاجة مبقتش reachable، يعني مفيش طريق يوصلها من الـ roots (المتغيرات الـ global، والـ stack الحالي).

فالـ memory leak في JS مش «نسيت أعمل free»، هو «لسه فيه reference ناسيه»: cache بيكبر من غير حد، أو listener ما اتشالش، أو [[setInterval]] شايل closure، أو Map فيها sessions قديمة.`,
          example: R`// شغّله: node --expose-gc m.mjs
const cache = new Map();
function handle(req) {
  cache.set(req.id, { rows: new Array(10000).fill(req.id) });
}
for (let i = 0; i < 2000; i++) handle({ id: i });
console.log(Math.round(process.memoryUsage().heapUsed / 1e6), "MB");
cache.clear();
global.gc?.();
console.log(Math.round(process.memoryUsage().heapUsed / 1e6), "MB");
// 166 MB ثم 4 MB`,
          try: "شغّله مرة بـ [[--expose-gc]] ومرة من غيره. بعدين شيل [[cache.clear()]]: الذاكرة مش هترجع مهما الـ GC اشتغل، لأن الـ Map لسه شايلاهم. ده شكل الـ leak.",
          flag: "script",
          deep: {
            why: "سيرفر Node ذاكرته بتزيد لحد ما يقع كل كام يوم مشكلة حقيقية ومشهورة. والسؤال بيشوف فاهم الـ GC ولا فاكر إنه بيحل كل حاجة.",
            how: R`الـ GC في V8 generational: أغلب الـ objects بتموت صغيرة، فالـ heap متقسم young generation بيتنضف كتير وبسرعة (بينسخ الأحياء بس)، و old generation للي عاشوا أكتر، وده بيتنضف بـ mark-sweep-compact: يعلّم كل اللي reachable من الـ roots، ويمسح الباقي، ويلم الفراغات. وأغلب الشغل ده incremental و concurrent عشان التوقفات تبقى قصيرة.

الـ reference counting لوحده مبيكفيش لأن objectين بيشاوروا على بعض (cycle) هيفضل العداد بتاعهم 1 للأبد. الـ mark-and-sweep بيحل ده: لو مفيش طريق ليهم من الـ roots يتمسحوا.

وقول «الـ primitives على الـ stack والـ objects على الـ heap» تبسيط: الـ engine هو اللي بيقرر، والـ strings مثلًا في الـ heap. و [[WeakMap]] و [[WeakRef]] بيشيلوا reference مبيمنعش الـ GC. ولما الـ heap يخلص بيطلع [[JavaScript heap out of memory]]، ودي غير [[Maximum call stack size exceeded]] اللي معناها الـ stack اتملى. والتشخيص بـ heap snapshot في DevTools (تاب «المتصفح») أو [[node --inspect]].`,
            when: "Follow-ups: «تكتشف memory leak في Node إزاي؟». «WeakMap بيفرق إيه؟». «ليه الـ recursion العميقة بتوقع بـ stack overflow مش out of memory؟». «ليه reference counting مش كفاية؟».",
            mistakes: R`إن وجود GC معناه مفيش leaks. وإن [[delete obj.x]] أو [[x = null]] بيحرر الذاكرة فورًا: بيشيل reference بس، والـ GC يجي وقت ما يجي. و cache في الذاكرة من غير حد أقصى ولا TTL.`
          },
          teach: R`## الفكرة في جملة

السكربت بيمثّل سيرفر بيخزّن حاجة كبيرة لكل طلب في cache، فالـ heap يوصل حوالي 165MB. وبعدين يفضّي الـ cache ويطلب من الـ garbage collector يشتغل، فالذاكرة ترجع 4MB. الدرس كله في سؤال: **ليه** الـ GC قدر يمسح بعد [[clear]] ومقدرش قبلها؟ شغلناه بـ Node 24 على ويندوز بتلات طرق.

---

## ١. الـ cache والـ handler

~~~js
const cache = new Map();
function handle(req) {
  cache.set(req.id, { rows: new Array(10000).fill(req.id) });
}
for (let i = 0; i < 2000; i++) handle({ id: i });
~~~

- [[cache]] متغير على مستوى الملف: عايش طول عمر الـ process.
- [[new Array(10000).fill(req.id)]]: array فيها ١٠ آلاف خانة كلها نفس الرقم.
- [[cache.set(id, {...})]]: خزّن الـ object تحت مفتاح الطلب.
- ٢٠٠٠ طلب × ١٠ آلاف خانة × حوالي ٨ bytes للخانة ≈ **160MB**. ده سبب الرقم اللي هيطلع.

---

## ٢. القياس

~~~js
console.log(Math.round(process.memoryUsage().heapUsed / 1e6), "MB");
~~~

- [[process.memoryUsage()]]: object فيه أرقام الذاكرة بالـ bytes.
- [[.heapUsed]]: المستخدم فعلًا من الـ heap بتاع V8 (اللي فيه الـ objects).
- [[/ 1e6]]: bytes ← ميجا (1e6 = مليون)، و [[Math.round]] يقرّب.

---

## ٣. التنضيف

~~~js
cache.clear();
global.gc?.();
~~~

- [[cache.clear()]]: الـ Map بقت فاضية. الـ arrays نفسها لسه في الـ heap، بس **مبقاش فيه طريق ليها**.
- [[global.gc]]: دالة تشغّل الـ GC حالًا. مش موجودة إلا لو شغلت Node بـ [[--expose-gc]]. من غير الفلاج قيمتها [[undefined]].
- [[?.()]]: optional call: «نادي الدالة لو موجودة، غير كده متعملش حاجة». من غيرها كان هيرمي [[TypeError: global.gc is not a function]].

---

## ٤. التلات تشغيلات

~~~text الناتج
node --expose-gc m.mjs           → 164 MB ثم 4 MB
node m.mjs                       → 166 MB ثم 165 MB
node --expose-gc m.mjs (من غير clear) → 166 MB ثم 164 MB
~~~

| التشغيل | الـ GC اشتغل؟ | الـ arrays reachable؟ | النتيجة |
|---|---|---|---|
| clear + [[--expose-gc]] | أيوه | لأ | اتمسحت: 4MB |
| clear من غير الفلاج | لسه مجاش دوره | لأ | لسه موجودة، **مش leak**: هتتمسح لما V8 يحتاج مساحة |
| من غير clear + GC | أيوه | أيوه، الـ Map شايلاها | مقدرش يمسح حاجة: ده **الـ leak** |

---

## ٥. الـ GC بيقرر إزاي؟

الـ GC بيبدأ من الـ **roots**: المتغيرات الـ global والـ module، والمتغيرات اللي على الـ stack دلوقتي. وبيمشي ورا كل reference ويعلّم أي حاجة وصلها (mark). اللي متعلّمش يتمسح (sweep).

~~~text
roots → cache (Map) → { rows } → Array(10000)     ← reachable، متتمسحش
roots → cache (Map فاضية)    Array(10000)          ← مفيش طريق، تتمسح
~~~

عشان كده الـ leak في JavaScript مش «نسيت أعمل free»، هو «لسه فيه reference ناسيه». وأشهرهم: cache من غير حد، و listeners متشالتش، و [[setInterval]] شايل closure، و Map فيها sessions قديمة.

---

## ٦. الـ stack والـ heap

| | stack | heap |
|---|---|---|
| فيه إيه | frame لكل نداء دالة: المتغيرات المحلية ومكان الرجوع | الـ objects والـ arrays والـ closures |
| الحجم | صغير (حوالي ١٢ ألف نداء في Node قبل [[RangeError]]) | كبير |
| بيتنضف إزاي | لوحده أول ما الدالة ترجع | بالـ GC، حسب الـ reachability |
| لو اتملى | [[Maximum call stack size exceeded]] | [[JavaScript heap out of memory]] |

في المثال: [[req]] و [[i]] على الـ stack وبيروحوا مع كل نداء. والـ arrays في الـ heap وبتعيش طول ما الـ Map شايلاها.

---

## الخلاصة

- الـ GC بيمسح اللي **مبقاش reachable** من الـ roots، مش اللي «مبقتش محتاجه».
- [[x = null]] أو [[clear()]] بيشيلوا الـ reference بس، والـ GC ييجي وقت ما ييجي.
- الحل للـ cache: حد أقصى أو TTL (LRU)، أو [[WeakMap]] لو المفتاح object ممكن يموت.

> الـ leak بيتعرف من إن الذاكرة بتطلع **ومبتنزلش** بعد GC على مدار وقت، مش من قراية واحدة.`,
          lines: [
            "cache عايش طول عمر الـ process.",
            "handler بيخزّن حاجة لكل طلب.",
            "كل طلب بيحط array فيها ١٠ آلاف عنصر في الـ cache.",
            "قفلة.",
            "٢٠٠٠ طلب.",
            "الـ heap دلوقتي: حوالي 166MB، ومحدش بيمسحها لأن الـ Map شايلاها.",
            "شيل الـ references.",
            "اطلب GC دلوقتي (موجود بس مع [[--expose-gc]]).",
            "الذاكرة رجعت: مبقاش فيه طريق للـ arrays دي."
          ],
          sol: R`بـ [[--expose-gc]] هتشوف حاجة زي [[164 MB]] ثم [[4 MB]]: بعد [[cache.clear()]] الـ arrays مبقاش حد شايلها، فالـ GC مسحها. ومن غير الفلاج: [[165 MB]] ثم [[165 MB]]. ده مش leak: [[global.gc]] مش موجود فالـ [[?.()]] معملتش حاجة، والـ GC لسه مجاش دوره، وهيمسحها لما يحتاج مساحة.

ولما تشيل [[cache.clear()]] وتشغّل بـ [[--expose-gc]]: [[165 MB]] ثم [[164 MB]]. الـ GC اشتغل فعلًا ومقدرش يمسح حاجة، لأن الـ Map متغير global، والـ Map شايلة الـ objects، يعني لسه reachable. ده شكل الـ leak في السيرفرات: cache أو array أو listeners بتكبر مع كل request ومحدش بيمسح منها.

الحل اللي تقوله: حد أقصى للحجم أو TTL (LRU cache)، أو [[WeakMap]] لو المفتاح object ينفع يموت، و [[removeListener]] للـ listeners. والغلط الشائع إنك تحكم بقراية واحدة: الـ leak بيتعرف من إن الذاكرة بتطلع ومبتنزلش بعد GC على مدار وقت.`
        }
      ]
    }
]);
