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
    },
    {
      t: "OOP والتصميم",
      l: 2,
      n: "التعريفات لوحدها مبتنجّحش: كل إجابة هنا لازم معاها مثال من كود حقيقي. التفاصيل في تاب «هندسة البرمجيات»",
      items: [
        {
          cmd: "encapsulation · abstraction · inheritance · polymorphism",
          title: "اشرح أعمدة الـ OOP الأربعة بمثال واحد",
          desc: R`الـ encapsulation: الـ object بيخبّي الداتا بتاعته وبيسمح بتعديلها من methods بس، فمحدش يحط رصيد سالب مثلًا. الـ abstraction: بتتعامل مع واجهة بسيطة ([[send(msg)]]) من غير ما تعرف التفاصيل. الـ inheritance: class بتاخد سلوك class تانية وتزوّد عليه. الـ polymorphism: نفس النداء بيعمل حاجة مختلفة حسب الـ object: [[notifier.send()]] مع الإيميل غير مع الـ SMS، والكود اللي بينادي مش فارق معاه.

وضيف إنك بتفضّل composition على inheritance: شجرة وراثة عميقة بتبقى هشة، وتجميع objects صغيرة أسهل في التغيير.`,
          example: R`class Account {
  #balance = 0;
  deposit(x) { if (x <= 0) throw new Error("invalid"); this.#balance += x; }
  get balance() { return this.#balance; }
}
class Notifier { send(msg) { throw new Error("not implemented"); } }
class EmailNotifier extends Notifier { send(msg) { return $__btemail: $__{msg}$__bt; } }
class SmsNotifier extends Notifier { send(msg) { return $__btsms: $__{msg}$__bt; } }
const a = new Account(); a.deposit(100); console.log(a.balance);
for (const n of [new EmailNotifier(), new SmsNotifier()]) console.log(n.send("paid"));
// 100  email: paid  sms: paid`,
          try: "جرّب [[a.#balance = -5]] من برا الـ class وشوف الـ SyntaxError. بعدين ضيف [[PushNotifier]] من غير ما تلمس اللوب الأخير: ده الـ polymorphism.",
          flag: "script",
          deep: {
            why: "سؤال كلاسيكي في كل انترفيو junior و mid. الإنترفيوير مش عايز التعريفات من الكتاب، عايز يشوف إنك بتستخدمها في كود حقيقي.",
            how: R`في JavaScript الـ class تجميل فوق الـ prototypes: [[extends]] بيربط الـ prototype بتاع الابن بالأب، والـ method بيتدوّر عليها في السلسلة دي. والـ [[#field]] private بجد على مستوى اللغة، مش مجرد اتفاق زي [[_field]].

الـ polymorphism في JS مش محتاج inheritance أصلًا (duck typing): أي object عنده [[send]] ينفع. و TypeScript بيخلي ده صريح بـ [[interface Notifier { send(msg: string): string }]]، وأي class بتطبّقها تنفع مكانها.

والـ composition: بدل شجرة وراثة زي [[AdminUser extends User]] و [[User extends Person]]، اليوزر عنده [[permissions]] و [[notifier]] كـ objects بتتحقن فيه. تغيير سلوك يبقى تبديل جزء، مش إعادة ترتيب شجرة. والـ React نفسها بتقول نفس الكلام: components بتتركب مش بتورث.`,
            when: "Follow-ups: «composition ولا inheritance؟». «JS فيها classes بجد؟». «abstract class ولا interface؟». «overloading ولا overriding؟». «encapsulation بتفرق إيه عن abstraction؟».",
            mistakes: R`تعرّف الـ encapsulation إنها «private variables» وبس. وتقول الـ inheritance هي طريقة إعادة الاستخدام الأساسية. وتخلط abstraction و encapsulation. وتحفظ تعريفات من غير مثال.`
          },
          lines: [
            "حساب بنكي.",
            "الرصيد private: محدش يوصله من برا (encapsulation).",
            "التعديل من method بس، وهي اللي بتمنع القيم الغلط.",
            "قراية الرصيد من getter.",
            "قفلة.",
            "الواجهة العامة: أي notifier عنده send (abstraction).",
            "إيميل بيورث من Notifier ويطبّق send بطريقته (inheritance).",
            "SMS نفس الواجهة بتنفيذ مختلف.",
            "استخدم الحساب: 100.",
            "نفس النداء بيطلّع نتيجة مختلفة حسب الـ object (polymorphism)."
          ],
          sol: R`[[a.#balance = -5]] برا الـ class بيدي [[SyntaxError: Private field '#balance' must be declared in an enclosing class]]، وده قبل ما الكود يشتغل أصلًا (الملف كله مش هيتشغل). ده encapsulation حقيقي من اللغة، مش اتفاق زي [[_balance]]. وخلي بالك: لو جربتها في Console بتاع Chrome ممكن تعدّي، لأن الـ DevTools بتسمح بقراية الـ private fields عشان الـ debugging. جربها في ملف أو في [[node]].

و [[PushNotifier]] بيتضاف كـ class جديد بس، واللوب يبقى زي ما هو، والناتج بقى [[100]] ثم [[email: paid]] و [[sms: paid]] و [[push: paid]]. ده الـ polymorphism: اللوب بيكلم [[send]] ومش فارق معاه النوع. ولو حد لقى نفسه بيكتب [[if (n instanceof PushNotifier)]] جوه اللوب، يبقى ضيّع الفكرة.`,
          solCode: R`// oop.mjs
class Account {
  #balance = 0;
  deposit(x) { if (x <= 0) throw new Error("invalid"); this.#balance += x; }
  get balance() { return this.#balance; }
}
class Notifier { send(msg) { throw new Error("not implemented"); } }
class EmailNotifier extends Notifier { send(msg) { return $__btemail: $__{msg}$__bt; } }
class SmsNotifier extends Notifier { send(msg) { return $__btsms: $__{msg}$__bt; } }
class PushNotifier extends Notifier { send(msg) { return $__btpush: $__{msg}$__bt; } }
const a = new Account(); a.deposit(100); console.log(a.balance);
for (const n of [new EmailNotifier(), new SmsNotifier(), new PushNotifier()]) console.log(n.send("paid"));
// 100
// email: paid
// sms: paid
// push: paid`
        },
        {
          cmd: "SOLID",
          title: "قول مبادئ التصميم الخمسة المشهورة بحروفها، سطر لكل واحد",
          desc: R`S (Single Responsibility): كل module ليه سبب واحد يتغير عشانه، فالـ controller ميبعتش إيميلات بنفسه. O (Open/Closed): تضيف سلوك جديد بإضافة كود مش بتعديل كود شغال، زي مزود دفع جديد من غير ما تلمس الـ checkout. L (Liskov): أي class فرعية تتحط مكان الأصلية من غير مفاجآت. I (Interface Segregation): واجهات صغيرة محددة بدل واحدة ضخمة. D (Dependency Inversion): الكود المهم يعتمد على واجهة مش على تنفيذ معين، فتقدر تبدّل الداتابيز أو تحط fake في الاختبار.

وقولها بتواضع: دي إرشادات مش قوانين، وتطبيقها بزيادة بيطلّع abstractions ملهاش لازمة.`,
          example: R`// احفظه s.mjs: الـ service معتمد على repo و mailer من برا (D)
function makeOrderService({ repo, mailer }) {
  return {
    async place(order) {
      const saved = await repo.save(order);
      await mailer.send(order.email, "order confirmed");
      return saved;
    }
  };
}
const fakeRepo = { save: async o => ({ id: 1, ...o }) };
const fakeMailer = { send: async () => {} };
const svc = makeOrderService({ repo: fakeRepo, mailer: fakeMailer });
console.log(await svc.place({ email: "you@example.com", item: "book" }));`,
          try: "بدّل fakeMailer بواحد بيطبع الرسالة، من غير ما تلمس [[makeOrderService]]. بعدين فكّر: لو الـ service كان بيعمل [[import { sendEmail }]] بنفسه، كنت هتختبره إزاي من غير ما يبعت إيميل بجد؟",
          flag: "script",
          deep: {
            why: "بيبيّن إنك بتفكر في الكود على المدى الطويل: هيتغير إزاي، وهيتختبر إزاي. وبيفتح كلام عن مشاريعك: «فين خالفت S وصلّحتها؟».",
            how: R`S: «سبب التغيير» يعني مين اللي هيطلب التعديل. لو المحاسب والمصمم الاتنين هيطلبوا تعديل في نفس الملف، ده ملف فيه مسؤوليتين.

O: بتتحقق غالبًا بـ Strategy أو plugins: map من مزودين الدفع، وتضيف واحد جديد بسطر، والـ checkout مبيتلمسش.

L: المثال المشهور Square و Rectangle: المربع «هو» مستطيل رياضيًا، بس لو كود بيغيّر العرض ويتوقع الطول ثابت، المربع هيكسره. ومثال أقرب: [[ReadOnlyRepo]] بيورث من [[Repo]] ويرمي error في [[save]]: أي كود بيستخدم Repo هيتفاجئ.

I: كلاينت محتاج [[read]] بس ميتجبرش يعتمد على واجهة فيها ٢٠ method.

D: الـ Dependency Inversion مبدأ (المهم يعتمد على abstraction)، والـ Dependency Injection طريقة لتطبيقه (تمرر الـ dependencies من برا زي المثال). في JS و TS غالبًا مش محتاج framework لده: دوال بتاخد dependencies كفاية.`,
            when: "Follow-ups: «اديني مثال على مخالفة لـ S من كودك». «الفرق بين Dependency Inversion و Dependency Injection؟». «Liskov بمثال؟». «إمتى SOLID يبقى over-engineering؟».",
            mistakes: R`تحفظ الأسامي من غير مثال. وتقول S يعني «الدالة تعمل حاجة واحدة» (قريب، بس المبدأ عن سبب التغيير). و interface لكل class حتى لو ليها تنفيذ واحد وعمرها ما هتتبدل. وتقول مثال Square و Rectangle وانت مش فاهم ليه بيكسر.`
          },
          lines: [
            "factory للـ service بياخد الـ dependencies كـ parameters.",
            "بيرجّع object فيه العمليات.",
            "عملية الطلب:",
            "احفظ بأي repo اتدّاله (داتابيز حقيقية أو fake).",
            "ابعت تأكيد بأي mailer اتدّاله.",
            "رجّع النتيجة.",
            "قفلة place.",
            "قفلة الـ object.",
            "قفلة الـ factory.",
            "repo مزيف للاختبار: بيرجّع الـ order ومعاه id.",
            "mailer مزيف مبيبعتش حاجة.",
            "ركّب الـ service بالمزيفين.",
            "جرّبه من غير داتابيز ولا إيميل."
          ],
          sol: R`الناتج بعد ما تبدّل الـ mailer: [[[mail] to=you@example.com subject="order confirmed"]] وبعدها [[{ id: 1, email: 'you@example.com', item: 'book' }]]، و [[makeOrderService]] متلمستش. ده الـ D (Dependency Inversion): الـ service بيعتمد على «حاجة فيها [[send]]» مش على مكتبة إيميل بعينها.

والإجابة على سؤال التفكير: لو الـ service عامل [[import { sendEmail }]] بنفسه، كنت هتضطر تعمل mock للـ module كله ([[vi.mock("./email.js")]] في Vitest أو [[jest.mock]])، وده بيشتغل بس بيربط الاختبار بمسار الملف، ويتكسر لو نقلته، ويخلّي dependencies الـ service مخفية. مع الـ injection الاختبار بيدّي fake كـ argument عادي، وفي production بتدّي الحقيقي. ده نفس السبب اللي بيخلي الـ D أسهل حرف تشرحه بمثال.`,
          solCode: R`// s.mjs: mailer بيطبع بدل ما يبعت
function makeOrderService({ repo, mailer }) {
  return {
    async place(order) {
      const saved = await repo.save(order);
      await mailer.send(order.email, "order confirmed");
      return saved;
    }
  };
}
const fakeRepo = { save: async o => ({ id: 1, ...o }) };
const consoleMailer = { send: async (to, subject) => console.log($__bt[mail] to=$__{to} subject="$__{subject}"$__bt) };
const svc = makeOrderService({ repo: fakeRepo, mailer: consoleMailer });
console.log(await svc.place({ email: "you@example.com", item: "book" }));
// [mail] to=you@example.com subject="order confirmed"
// { id: 1, email: 'you@example.com', item: 'book' }`
        },
        {
          cmd: "Singleton و Factory",
          title: "اشرح pattern بيضمن نسخة واحدة بس من حاجة، و pattern بيخبّي إزاي الـ objects بتتعمل",
          desc: R`الأول Singleton: نسخة واحدة بس من حاجة في التطبيق، زي الاتصال بالداتابيز أو الـ logger. في JS الـ module نفسه بيتحمّل مرة واحدة ويتكاش، فأي حاجة بتعملها فيه بتبقى نسخة واحدة لكل process. ومثال حقيقي: في Next.js وقت التطوير الـ hot reload بيعيد تحميل الملفات، فبتحفظ الـ pool أو Prisma client على [[globalThis]] عشان ميفتحش connections جديدة كل مرة. التاني Factory: دالة بتقرر تعمل أنهي object بدل ما الكود يعمل [[new]] بنفسه، زي [[createPaymentProvider(country)]] ترجّع المزود المناسب.

وعيوب الـ Singleton لازم تقولها: global state مستخبي، وصعب في الاختبار. عشان كده الأحسن تعمل النسخة الواحدة وتمررها (dependency injection) بدل ما كل ملف يجيبها بنفسه.`,
          example: R`// lib/db.js: نسخة واحدة تعيش حتى مع الـ hot reload
import pg from "pg";
const g = globalThis;
export const pool = g.pool ?? new pg.Pool({ connectionString: process.env.DATABASE_URL });
if (process.env.NODE_ENV !== "production") g.pool = pool;
// Factory: الكود بيطلب «مزود دفع» ومش فارق معاه أنهي
export function createPaymentProvider(country) {
  if (country === "EG") return { name: "local", pay: amount => $__btlocal:$__{amount}$__bt };
  return { name: "stripe", pay: amount => $__btstripe:$__{amount}$__bt };
}`,
          try: "في مشروع Next.js عندك، دوّر على المكان اللي بيتعمل فيه client الداتابيز: هل محمي من الـ hot reload بـ globalThis؟ لو لأ، عدّل ملف كذا مرة وراقب عدد الـ connections في الداتابيز.",
          flag: "script",
          deep: {
            why: "«إيه الـ patterns اللي استخدمتها؟» سؤال شبه ثابت. وأحسن إجابة pattern استخدمته فعلًا في مشروع وتعرف ليه، مش قايمة محفوظة.",
            how: R`Node بيحفظ كل module اتحمّل في cache، فالمرة التانية اللي تعمل import بترجع نفس الـ exports. ده singleton لكل process بس: لو شغّال ٤ processes أو serverless فيه instances كتير، يبقى عندك ٤ نسخ أو أكتر، وكل واحدة ليها connection pool.

في Next.js وقت التطوير، الـ HMR بيعيد تقييم الملفات اللي اتغيرت، فالـ module بيتنفّذ تاني ويعمل pool جديد، والقديم لسه فاتح connections، لحد ما الداتابيز تقول «too many connections». الـ [[globalThis]] مبيتمسحش مع إعادة التحميل، فبنخزّن فيه. وفي الإنتاج مش محتاجه لأن الـ module بيتحمّل مرة.

الـ Factory أنواع: simple factory (دالة بـ if أو map)، و factory method (الـ subclass بتقرر)، و abstract factory (عيلة objects مع بعض). والأحسن من if/else طويلة map: [[{ EG: makeLocal, default: makeStripe }]]. وفيه Builder لما الـ object ليه إعدادات كتير اختيارية.`,
            when: "Follow-ups: «ليه الـ Singleton ساعات بيتقال عليه anti-pattern؟». «الـ module في Node singleton فعلًا؟». «Factory ولا constructor عادي؟». «Builder إمتى؟». «patterns تانية استخدمتها؟» (Middleware في Express هو Chain of Responsibility، و Adapter لما تلف مكتبة خارجية).",
            mistakes: R`تقول الـ Singleton «نسخة واحدة في السيرفر كله» وانت شغال بكذا process أو serverless. وتعمل Singleton لكل حاجة فالاختبارات تبقى معتمدة على بعض. و Factory فيه if/else بتكبر مع كل نوع جديد.`
          },
          lines: [
            "مكتبة PostgreSQL لـ Node.",
            "اختصار للـ global object.",
            "لو فيه pool متخزن استخدمه، غير كده اعمل واحد جديد.",
            "في التطوير خزّنه على globalThis عشان الـ hot reload ميعملش واحد جديد كل مرة.",
            "الـ factory: بياخد البلد ويرجّع مزود.",
            "مصر: مزود محلي.",
            "غير كده: Stripe. الاتنين نفس الشكل، فالكود اللي بينادي مش فارق معاه.",
            "قفلة."
          ],
          sol: R`المفروض تلاقي في [[lib/db.ts]] أو [[lib/prisma.ts]] حاجة شبه [[globalThis.prisma ?? new PrismaClient()]] وبعدها [[if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma]]. لو موجودة يبقى تمام: عدد الـ connections هيفضل ثابت مهما عدّلت ملفات.

لو مش موجودة وبتعمل [[new PrismaClient()]] أو [[new Pool()]] على طول، كل hot reload بيعمل module جديد وبالتالي client جديد بـ pool جديد، والقديم مبيتقفلش. هتشوف رقم الـ query اللي تحت بيطلع كل ما تحفظ ملف، ولحد ما توصل لـ [[too many connections]] (أو في Prisma تحذير إن فيه نسخ كتير شغالة). وده بيحصل في الـ dev بس، فالناس بتفتكره bug في الداتابيز.

والإجابة في الانترفيو: «ده Singleton عملي: نسخة واحدة من الـ pool للـ process، وبنخزنها على globalThis عشان تعيش بعد الـ hot reload. والـ Singleton الكلاسيكي فيه عيب إنه global state بيصعّب الاختبار، فبفضّل أحقنه لما أقدر».`,
          solCode: R`-- في psql وانت بتعدّل ملفات في dev: الرقم لازم يفضل ثابت
SELECT count(*) FROM pg_stat_activity WHERE datname = current_database();
SELECT application_name, state, count(*)
FROM pg_stat_activity
WHERE datname = current_database()
GROUP BY 1, 2;`
        },
        {
          cmd: "Observer و Strategy",
          title: "اشرح pattern بيخلي أجزاء تسمع لحدث من غير ما تعرف بعض، و pattern بيخليك تبدّل الخوارزمية وقت التشغيل",
          desc: R`الأول Observer: حاجة بتعلن حدث، وأي عدد من المستمعين بيتسجلوا ويتبلغوا من غير ما المعلن يعرفهم. ده [[addEventListener]] في المتصفح، و [[EventEmitter]] في Node، والـ subscriptions في state management. التاني Strategy: عندك كذا طريقة لنفس المهمة (حساب شحن، أو مزود دفع، أو ترتيب)، فكل طريقة في دالة لوحدها بنفس الشكل، والكود بيختار واحدة وقت التشغيل بدل if/else طويلة.

مثال حقيقي: بعد ما الـ order يتدفع، الـ service بيعمل [[emit("order.paid")]]، والإيميل والفاتورة والإحصائيات كلهم listeners، فتضيف واحد جديد من غير ما تلمس كود الدفع.`,
          example: R`import { EventEmitter } from "node:events";
const bus = new EventEmitter();
bus.on("order.paid", o => console.log("email to", o.email));
bus.on("order.paid", o => console.log("invoice for", o.id));
const shipping = {
  standard: w => 30 + w * 5,
  express: w => 60 + w * 8,
  pickup: () => 0
};
const order = { id: 7, email: "you@example.com", weight: 2, method: "express" };
console.log("shipping:", shipping[order.method](order.weight));
bus.emit("order.paid", order);
// shipping: 76  email to you@example.com  invoice for 7`,
          try: "ضيف listener تالت بيرمي error، وشوف الـ emit بيعمل إيه في الباقي. بعدين ضيف طريقة شحن [[sameDay]] بسطر واحد من غير ما تلمس أي if.",
          flag: "script",
          deep: {
            why: "الاتنين موجودين في كل كود JavaScript حتى لو مش بتسميهم. لو عرفت تشاور عليهم في كودك، إجابتك بتبقى أقوى بكتير من التعريف.",
            how: R`Observer: الـ subject شايل لستة listeners، والـ emit بيلف عليهم. في [[EventEmitter]] الـ listeners بيتنفّذوا sync بترتيب التسجيل، ولو واحد رمى error من غير ما حد يمسكه، الـ emit نفسه بيرمي والباقي مبيتنفّذش. ولو سجلت listeners كتير على نفس الحدث من غير ما تشيلهم، Node بيطبع [[MaxListenersExceededWarning]] (الحد الافتراضي ١٠) لأنه غالبًا leak.

والفرق عن pub/sub: في Observer المستمع بيتسجل عند الـ subject مباشرة وفي نفس الـ process. في pub/sub فيه وسيط (Redis، أو queue) والطرفين ممكن يبقوا في سيرفرات مختلفة، وده اللي بتحتاجه لما يبقى عندك أكتر من instance.

Strategy في JS غالبًا مجرد object من دوال أو map زي المثال، وده تطبيق مباشر لـ Open/Closed: طريقة جديدة = إضافة مش تعديل. وفيه patterns تانية بتظهر في كودك كل يوم: الـ middleware في Express (Chain of Responsibility)، و Adapter لما تلف مكتبة خارجية بواجهة بتاعتك.`,
            when: "Follow-ups: «الفرق بين Observer و Pub/Sub؟». «EventEmitter sync ولا async؟». «listener رمى error يحصل إيه؟». «Strategy ولا if/else؟». «patterns تانية استخدمتها؟».",
            mistakes: R`تفتكر الـ emit بيشغّل الـ listeners async في الخلفية. وتنسى [[off]] أو [[removeListener]] فيحصل leak. و events لكل حاجة فتبقى مش عارف مين بينادي مين وأنهي ترتيب.`
          },
          lines: [
            "الـ EventEmitter من Node.",
            "«bus» للأحداث.",
            "listener: ابعت إيميل لما order يتدفع.",
            "listener تاني لنفس الحدث: اعمل فاتورة. الاتنين مش عارفين بعض.",
            "الـ strategies: كل طريقة شحن دالة بنفس الشكل (الوزن ← السعر).",
            "عادي.",
            "سريع.",
            "استلام من المكان.",
            "قفلة.",
            "order اليوزر اختار فيه express.",
            "اختار الـ strategy وقت التشغيل من غير أي if: 76.",
            "أعلن الحدث: الـ listeners الاتنين يشتغلوا بالترتيب."
          ],
          sol: R`الـ listener اللي بيرمي error بيوقف كل حاجة بعده: الـ listeners بتشتغل sync بالترتيب، فالأول يطبع [[email to you@example.com]]، والتاني يرمي، والتالت مبيشتغلش خالص، و [[emit]] نفسه بيرمي الـ error للي نادى عليه. ولو مفيش [[try/catch]] حوالين الـ emit، الـ process كله بيقع. ده عيب مهم في الـ EventEmitter تقوله: الـ listeners مش معزولين عن بعض، فكل listener لازم يمسك أخطاؤه، والشغل المهم (زي الفواتير) يتحط في queue.

و [[sameDay]] بسطر واحد: [[shipping.sameDay = w => 100 + w * 10]] (أو تضيفه جوه الـ object)، ومع [[method: "sameDay"]] ووزن 2 الناتج [[shipping: 120]]. مفيش أي if اتلمست، وده الـ Strategy: الخوارزمية بقت قيمة في object بتختارها بالاسم.`,
          solCode: R`// obs.mjs
import { EventEmitter } from "node:events";
const bus = new EventEmitter();
bus.on("order.paid", o => console.log("email to", o.email));
bus.on("order.paid", o => { throw new Error("invoice service down"); });
bus.on("order.paid", o => console.log("invoice for", o.id));
const shipping = {
  standard: w => 30 + w * 5,
  express: w => 60 + w * 8,
  pickup: () => 0
};
shipping.sameDay = w => 100 + w * 10;
const order = { id: 7, email: "you@example.com", weight: 2, method: "sameDay" };
console.log("shipping:", shipping[order.method](order.weight));
try { bus.emit("order.paid", order); } catch (e) { console.log("emit threw:", e.message); }
// shipping: 120
// email to you@example.com
// emit threw: invoice service down
// ("invoice for 7" مطبعتش)`
        }
      ]
    },
    {
      t: "الكود في الانترفيو",
      l: 2,
      n: "بتختبر إزاي، وبتكتب إزاي، وبتحل مسألة قدام حد إزاي",
      items: [
        {
          cmd: "unit · integration · e2e",
          title: "إيه أنواع الاختبارات؟ وبتختبر إيه في مشروعك بالظبط؟",
          desc: R`الـ unit بيختبر دالة أو وحدة لوحدها بسرعة ومن غير شبكة أو داتابيز. الـ integration بيختبر كذا جزء مع بعض، زي endpoint حقيقي مع داتابيز اختبار. والـ e2e بيشغّل التطبيق كله في متصفح زي اليوزر (Playwright مثلًا). الهرم: unit كتير لأنها رخيصة وسريعة، و integration أقل، و e2e قليل للمسارات الحرجة زي التسجيل والدفع.

وقول إزاي بتختار: بختبر الـ business logic اللي لو باظت هتكلّف فلوس (حساب السعر، والصلاحيات، والـ webhooks)، مش الـ getters. وفيه كمان smoke test بعد الـ deploy، و regression test لكل bug اتصلّح عشان ميرجعش. الأدوات في تاب «فحص الكود».`,
          example: R`import { describe, it, expect } from "vitest";
import { applyCoupon } from "./pricing.js";
describe("applyCoupon", () => {
  it("applies a percentage discount", () => {
    expect(applyCoupon(200, { type: "percent", value: 10 })).toBe(180);
  });
  it("never goes below zero", () => {
    expect(applyCoupon(50, { type: "fixed", value: 80 })).toBe(0);
  });
});`,
          try: "اكتب [[applyCoupon]] في [[pricing.js]] وشغّل [[npx vitest run]]. بعدين بوّظ الدالة عمدًا (شيل الـ Math.max) وشوف أنهي اختبار وقع ورسالته بتقول إيه.",
          flag: "script",
          deep: {
            why: "الشركات عايزة حد تقدر تثق إن تعديله مش هيكسر حاجة تانية. والسؤال بيكشف هل الاختبارات عندك عادة ولا كلمة في الـ CV.",
            how: R`الـ test doubles: الـ stub بيرجّع قيمة ثابتة، والـ mock بيتأكد إنه اتنادى بشكل معين، والـ fake تنفيذ بسيط شغال (repo في الذاكرة)، والـ spy بيراقب دالة حقيقية. القاعدة: اعمل mock للحدود الخارجية (بوابة الدفع، والإيميل، و APIs بره)، ومتعملش mock لكودك انت وإلا الاختبار بيختبر الـ mocks.

الـ integration مع داتابيز: داتابيز اختبار منفصلة (غالبًا في Docker)، وكل اختبار في transaction بتترجع في الآخر أو بيبدأ بداتا نضيفة. وفيه رأي مشهور (testing trophy) إن الـ integration بيدّي أكبر ثقة مقابل التكلفة في تطبيقات الويب.

الـ coverage بيقولك أنهي سطور اتنفذت، مش هل اتختبرت صح. و TDD: اكتب اختبار فاشل، وبعدين أقل كود يعدّيه، وبعدين حسّن (red، green، refactor). والـ flaky test (بينجح ويفشل من غير تغيير) أوحش من مفيش اختبار، لأنه بيعلّم الفريق يتجاهل الأحمر. ولما تلاقي واحد: شغّله لوحده كذا مرة، ودوّر على السبب المعتاد (وقت، أو ترتيب اختبارات، أو داتا مشتركة، أو انتظار ثابت بدل انتظار شرط)، وصلّحه أو اعزله بتذكرة، متسيبوش.

والكود نفسه: «تاب فحص الكود» المستوى التاني ([[vitest]] و [[--coverage]] وكتابة الاختبارات) والمستوى التالت (e2e بـ Playwright)، و «تاب Backend بـ Node» المستوى التالت (integration tests على endpoints حقيقية وداتابيز اختبار)، و «تاب React» المستوى التالت (اختبار الـ components).`,
            when: "Follow-ups: «بتعمل mock لإيه ومتعملوش لإيه؟». «coverage كام يبقى كويس؟». «بتعمل TDD؟». «اختبار flaky تعمل فيه إيه؟». «تختبر webhook الدفع إزاي؟».",
            mistakes: R`«مبكتبش tests» من غير أي خطة، أو العكس «coverage 100%» كهدف. و mock لكل حاجة. و e2e لكل حاجة فالـ CI ياخد ساعة. ولو مشاريعك مفيهاش اختبارات قول ده بصراحة، وقول هتبدأ بإيه وليه: ده أحسن من إنك تدّعي.`
          },
          lines: [
            "أدوات الاختبار من Vitest.",
            "الدالة اللي بنختبرها.",
            "مجموعة اختبارات للدالة دي.",
            "حالة: خصم نسبة.",
            "200 بخصم 10% لازم تبقى 180.",
            "قفلة الحالة.",
            "حالة حدّية: الخصم أكبر من السعر.",
            "النتيجة لازم تبقى صفر مش بالسالب.",
            "قفلة الحالة.",
            "قفلة المجموعة."
          ],
          sol: R`مع الدالة السليمة: [[Test Files  1 passed (1)]] و [[Tests  2 passed (2)]]. ولما تشيل الـ [[Math.max]]، اختبار الخصم بالنسبة بيعدّي، و [[never goes below zero]] بيقع برسالة [[AssertionError: expected -30 to be +0 // Object.is equality]]، ومعاها Expected 0 و Received -30 وسهم على السطر بالظبط.

لاحظ إن اسم الاختبار لوحده قالك المشكلة قبل ما تقرا الرسالة، وده سبب إن الاسم يوصف السلوك مش الدالة. والغلط الشائع: الاختبارين يعدّوا بعد ما بوّظت الدالة، ودي علامة إن الاختبار مش بيختبر الحالة دي أصلًا، أو إنك بتشغّل [[vitest]] في watch على ملف تاني. (جربته على Vitest 5.)`,
          solCode: R`// pricing.js
export function applyCoupon(total, coupon) {
  const discount = coupon.type === "percent" ? total * coupon.value / 100 : coupon.value;
  return Math.max(0, total - discount);
}
// npx vitest run
// ✓ pricing.test.js (2 tests)
// Test Files  1 passed (1)
//      Tests  2 passed (2)
// وبعد ما تشيل Math.max:
// × never goes below zero
// AssertionError: expected -30 to be +0 // Object.is equality`
        },
        {
          cmd: "readable قبل clever",
          title: "إيه اللي بيخلي الكود «نضيف»؟ واديني مثال عدّلته",
          desc: R`الكود بيتقري أكتر ما بيتكتب بكتير، فالنضافة يعني حد تاني (أو انت بعد ٦ شهور) يفهمه بسرعة ويعدّله من غير خوف. عمليًا: أسماء بتقول النية ([[isNewMember]] مش [[flag2]])، ودوال صغيرة بتعمل حاجة واحدة، و early return بدل if جوه if، ومفيش أرقام سحرية، والـ errors بتتعامل صح مش بتتبلع، وتكرار أقل (DRY) بس من غير abstraction بدري.

وقول KISS و YAGNI: أبسط حل شغال، ومتبنيش حاجة «يمكن نحتاجها». والأدوات بتساعد: prettier للشكل، و eslint للعادات، و TypeScript للأنواع.`,
          example: R`// قبل
function p(u, d) {
  if (u) { if (u.s === 1) { if (Date.now() - u.t < 2592000000) { return d * 0.9; } } }
  return d;
}
// بعد
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const ACTIVE = 1;
const NEW_MEMBER_DISCOUNT = 0.9;
function priceForUser(user, price) {
  if (!user || user.status !== ACTIVE) return price;
  const isNewMember = Date.now() - user.joinedAt < THIRTY_DAYS_MS;
  return isNewMember ? price * NEW_MEMBER_DISCOUNT : price;
}`,
          try: "خد دالة طويلة من مشروع قديم عندك وطبّق عليها: أسماء واضحة، و early return، و constants بدل الأرقام. اعرضها على حد واسأله «بتعمل إيه؟» قبل وبعد.",
          flag: "script",
          deep: {
            why: "الكود اللي هتكتبه في الـ live coding والـ take-home بيتقيّم بعين «هل أحب أراجع PRs الشخص ده؟». والسؤال بيشوف ذوقك في الكود.",
            how: R`الـ comment يشرح «ليه» مش «إيه»: [[// Paymob sends amounts in cents]] مفيد، و [[// increment i]] ضوضاء. ولو محتاج comment يشرح الكود بيعمل إيه، غالبًا الاسم هو اللي محتاج يتغير.

الـ code smells المشهورة: دالة طويلة، و parameters كتير (حوّلها object)، و primitive obsession (string لكل حاجة بدل أنواع واضحة)، و shotgun surgery (تعديل واحد محتاج تلمس ١٠ ملفات)، و feature envy (دالة بتستخدم داتا class تانية أكتر من بتاعتها).

والـ DRY ليه حد: تكرار مرتين أحسن من abstraction غلط، لأن abstraction غلط بتتقل مع كل حالة جديدة بـ if جوه. القاعدة المشهورة: ادمج في التالتة. والـ refactoring الآمن محتاج اختبارات قبله، وخطوات صغيرة، و commit لوحده من غير تغيير سلوك. التفاصيل في تاب «هندسة البرمجيات».`,
            when: "Follow-ups: «إمتى تكتب comment؟». «DRY ممكن يضر إمتى؟». «بتبص على إيه في code review؟». «اديني code smell شفته وصلّحته». «ملف فيه ٢٠٠٠ سطر، تبدأ منين؟».",
            mistakes: R`إن النضيف يعني قصير و clever (one-liner محدش فاهمه). وتقسيم كل سطرين في دالة. و abstraction بعد أول تكرار. و «الكود بتاعي بيوثّق نفسه» كمبرر لأي حاجة.`
          },
          lines: [
            "اسم الدالة والـ parameters مبيقولوش حاجة.",
            "تلات ifs جوه بعض، و 1 و 2592000000 و 0.9 أرقام سحرية.",
            "الحالة العادية.",
            "قفلة.",
            "الرقم بقى اسم، ومحسوب قدامك: ٣٠ يوم بالمللي ثانية.",
            "حالة اليوزر النشط باسم.",
            "نسبة الخصم باسم.",
            "الدالة واسمها بيقول بتعمل إيه.",
            "early return: لو مفيش يوزر أو مش نشط، السعر زي ما هو.",
            "الشرط المعقد بقى متغير اسمه بيشرحه.",
            "النتيجة في سطر واضح.",
            "قفلة."
          ],
          sol: R`الـ refactor نجح لو الشخص فهم الدالة «بعد» من أول قراية وقال جملة زي «بتدي خصم ١٠٪ لليوزر الجديد النشط»، في حين إنه في «قبل» سأل أسئلة أو خمّن. وده الاختبار الحقيقي: مش إن الكود أقصر، إن حد تاني يفهمه من غير ما تشرحله.

الـ checklist اللي تطبقها: كل متغير ودالة بقى اسمه بيقول هو إيه ([[u]] ← [[user]])، والـ ifs المتداخلة بقت early returns، وكل رقم سحري بقى constant باسم، ومفيش تعليق بيشرح «إيه» (الاسم بيقوله)، والتعليقات الباقية بتشرح «ليه». والأهم إن السلوك متغيرش: لو الدالة مكانش ليها tests، اكتب اختبارين قبل ما تبدأ وشغّلهم بعد.

الغلط الشائع: إنك تغيّر السلوك وانت بتنضّف (تصلح bug في نفس الـ commit)، أو تبالغ وتقسّم دالة ٨ سطور لخمس دوال. وفي الانترفيو احكيها كده: «كانت دالة X، عملت فيها Y، والنتيجة Z» (مثلًا: الـ PR اللي بعده في نفس الملف خد نص الوقت).`
        },
        {
          cmd: "clarify → examples → brute → optimize → test",
          title: "في مسألة live coding: بتمشي إزاي من أول ما تسمع السؤال لحد ما تسلّم؟",
          desc: R`ست خطوات وأنا بتكلم بصوت عالي طول الوقت: ١) أوضّح المسألة: الـ input شكله إيه وحجمه قد إيه، وفيه سالب أو تكرار أو فاضي؟ ٢) أمثلة صغيرة بإيدي منها edge cases. ٣) الحل البسيط (brute force) وأقول الـ complexity بتاعه. ٤) أحسّن: فين الشغل المتكرر؟ hash map؟ sort؟ two pointers؟ ٥) أكتب الكود نضيف بأسماء واضحة. ٦) أختبره بالأمثلة وأمشي عليه بإيدي، وأقول الـ time والـ space.

الإنترفيوير بيقيّم طريقة التفكير والتواصل قد الحل نفسه أو أكتر. ولو اتزنقت أقول بفكر في إيه، والـ hint مش فشل. المسائل والأنماط في تاب «DSA».`,
          example: R`// المسألة: رجّع أول عنصر بيتكرر في array
// 1. Clarify: "Can it be empty? Numbers only? What if nothing repeats?"
// 2. Examples: [3,1,3,2] -> 3 | [1,2] -> null | [] -> null
// 3. Brute force: "For each element, scan the rest: O(n²) time, O(1) space."
// 4. Optimize: "Trade memory for time with a Set: one pass."
// 5. Code:
function firstRepeat(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return n;
    seen.add(n);
  }
  return null;
}
// 6. Test by hand: [3,1,3,2] → 3, [] → null. "Time O(n), space O(n)."`,
          try: "اختار مسألة من تاب «DSA»، وشغّل تايمر ٣٠ دقيقة، وسجّل صوتك وانت بتحلها بالست خطوات. اسمع التسجيل: فيه فترات سكوت طويلة؟ قلت الـ complexity؟ اختبرت edge case؟",
          flag: "script",
          deep: {
            why: "ناس كتير بتعرف تحل وبتفشل عشان سكتت، أو بدأت تكتب على طول وحلّت مسألة غير المطلوبة، أو مختبرتش. الطريقة دي بتحوّل المسألة لحوار انت ماسكه.",
            how: R`الإنترفيوير عادة بيقيّم أربع حاجات: حل المشكلة (وصلت لحل وحسّنته؟)، والتواصل (فهّمتني انت بتعمل إيه؟)، وجودة الكود (أسماء، وتنظيم، و edge cases)، والتحقق (اختبرت ولقيت أخطاءك بنفسك؟).

الوقت في مقابلة ٤٥ دقيقة تقريبًا: ٥ للتوضيح والأمثلة، و ٥ إلى ١٠ للفكرة والاتفاق عليها قبل الكود، و ٢٠ للكود، و ٥ إلى ١٠ للاختبار والأسئلة الجاية.

وإشارات في نص السؤال بتقترح النمط: «مترتب» ← binary search أو two pointers. «subarray أو substring متصل» ← sliding window. «موجود قبل كده / عد / أزواج» ← hash map. «أكبر k» ← heap. «كل الاحتمالات» ← backtracking. «أقصر طريق / مستويات» ← BFS. ولاحظ إن التوضيح نفسه بيطلّع أسئلة مهمة: «أول عنصر بيتكرر» معناها أول واحد ظهر تاني، ولا أول واحد في الـ array ليه تكرار؟ في [[[2,1,1,2]]] الإجابتين مختلفتين (1 ضد 2).`,
            when: "Follow-ups بعد الحل: «ولو الـ array مش هتدخل في الرام؟». «ولو ممنوع ذاكرة إضافية؟». «ولو الداتا جاية stream؟». «اكتب tests». «إيه أسوأ input للحل ده؟».",
            mistakes: R`تبدأ تكتب على طول من غير توضيح. وتسكت ١٠ دقايق. وتتمسك بالحل الـ optimal ومتكتبش حاجة خالص (brute force شغال أحسن من ولا حاجة). ومتختبرش. وتتجاهل الـ hint. وتقول complexity غلط بثقة.`
          },
          lines: [
            "الدالة باسم واضح.",
            "Set للي شفناه قبل كده.",
            "لف مرة واحدة.",
            "لو شفناه قبل كده: هو أول تكرار.",
            "غير كده سجّله.",
            "قفلة اللوب.",
            "مفيش تكرار.",
            "قفلة."
          ],
          sol: R`التسجيل الكويس فيه الست خطوات بالترتيب ومسموعين: أسئلة توضيح في أول دقيقة أو اتنين، ومثالين على الأقل منهم edge case (فاضي أو عنصر واحد)، وجملة بالـ brute force وتمنه قبل ما تكتب، والـ complexity مقولة بصوت عالي في الآخر، وتتبّع بالإيد لمثال قبل «done». والمفروض مفيش سكوت أطول من ٢٠ أو ٣٠ ثانية.

النتايج الغلط الشائعة: إنك بدأت تكتب كود في أول دقيقة من غير ولا سؤال، أو سكتّ ٣ دقايق وانت بتفكر (قول اللي في دماغك حتى لو ناقص: «I'm thinking a hash map could help here because...»)، أو خلصت وقلت «done» من غير ما تجرب حاجة. ولو التسجيل عدّى ٣٠ دقيقة، شوف ضاع الوقت فين: غالبًا في الـ optimize قبل ما يبقى عندك حل شغال. الـ brute force الشغال أحسن من optimal ناقص.`
        }
      ]
    },
    {
      t: "الأسئلة السلوكية وإنك تحكي",
      l: 3,
      n: "الجولة اللي الـ juniors بيقعوا فيها أكتر: قصص حقيقية مترتبة بـ STAR، ومشروعك بأرقام، وأسئلتك انت في الآخر",
      items: [
        {
          cmd: "tell me about yourself",
          title: "«Tell me about yourself»: بتقول إيه في ٦٠ ثانية؟",
          desc: R`بمشي على ترتيب present ← past ← future. الأول أنا مين دلوقتي: الدور والـ stack في جملة. بعدين حاجة واحدة عملتها تثبت الكلام ده، ومعاها نتيجة برقم. بعدين أنا بشتغل إزاي (حاجة بتميزني). وفي الآخر ليه أنا هنا: ليه الدور ده والشركة دي. ده حوالي ١٢٠ لـ ١٥٠ كلمة، يعني دقيقة.

السؤال ده مش تعارف، ده الـ pitch بتاعك، وهو اللي بيحدد الأسئلة الجاية: أي حاجة تذكرها هيسألك عليها. فاذكر المشروع اللي انت عايز تتسأل عليه، ومتذكرش technology مش هتعرف تتكلم فيها خمس دقايق.`,
          example: R`Present: "I'm a full-stack developer. I work mostly with TypeScript, React and Node, with PostgreSQL behind them."
Proof: "This year I built and deployed an ordering system for a local business: Next.js, Prisma, online payments, on a VPS with Docker."
Result: "It handles about 300 orders a week, and I cut the checkout page load from about 4 seconds to 1.5."
How I work: "I like shipping small, tested changes. I set up the CI and the daily backups on that project myself."
Future: "Now I want to join a team where I can learn from senior engineers and work on a product with real users."
Why you: "Your team builds software for clinics in the region, and that's exactly the kind of product I want to work on."`,
          try: "اكتب إجابتك انت في ٦ جمل بنفس الترتيب (بأرقامك الحقيقية)، وسجّلها بالموبايل بتايمر. لو عدّت ٧٥ ثانية شيل. اسمعها واسأل نفسك: لو أنا الإنترفيوير، هسأل على إيه بعدها؟ وهل ده السؤال اللي أنا عايزه؟",
          flag: "script",
          deep: {
            why: "أول سؤال في أغلب الانترفيوهات، وأول دقيقة بتعمل الانطباع اللي الإنترفيوير بيدوّر بعده على اللي يأكده. الإجابة المرتبة بتقول إنك بتعرف تلخّص وتركّز، ودي مهارة شغل يومية (standup، وتحديث للعميل، ووصف PR).",
            how: R`الـ present جملة واحدة فيها الدور والأدوات الأساسية بس، مش قايمة بكل حاجة لمستها. الـ proof هو قلب الإجابة: مشروع واحد حقيقي، أحسن لو فيه يوزرز أو فلوس أو فريق، ومعاه رقم واحد مقاس (وقت، أو عدد، أو نسبة). والـ how I work بتفرّقك عن باقي المتقدمين اللي بيقولوا نفس الـ stack: tests، أو deploy، أو إنك بتكتب توثيق، أو بتسأل اليوزر.

الـ future لازم تتفصّل على الشركة: اقرا الإعلان وموقعهم، وقول حاجة حقيقية عن المنتج أو الـ stack بتاعهم. «I'm looking for a challenging opportunity» جملة كل الناس بتقولها ومش بتقول حاجة.

واعمل نسختين: ٦٠ ثانية (الأساسية) و ٣٠ ثانية (لو الـ recruiter مستعجل). ونفس الهيكل بيشتغل بالعربي لو الانترفيو بالعربي.`,
            when: "بيتسأل في الـ recruiter call وفي أول كل جولة تقريبًا، وأحيانًا بصيغة «Walk me through your CV» أو «عرّفنا بنفسك». Follow-ups متوقعة: «احكيلي أكتر عن المشروع ده»، «إيه أصعب حاجة فيه؟»، «ليه سايب شغلك الحالي؟»، «ليه الشركة دي؟».",
            mistakes: R`تبدأ من الكلية أو الثانوية وتحكي بالترتيب الزمني. تقرا الـ CV بصوت عالي (هو قدامه أصلًا). قايمة ٢٠ technology من غير ولا مشروع. «I'm passionate and hardworking» من غير دليل. إجابة ٣ دقايق. وحفظ كلمة بكلمة فتبان بتسمّع، ولو اتقطعت تتوه: احفظ النقط مش الجمل. وأرقام مش حقيقية: هيسألك «قستها إزاي؟».`
          },
          lines: [
            "الحاضر: الدور والأدوات الأساسية في جملة واحدة.",
            "الدليل: مشروع واحد حقيقي، واللي اتعمل بيه، وفين شغال.",
            "النتيجة بأرقام مقاسة: حجم الاستخدام، وتحسين قبل وبعد.",
            "إزاي بتشتغل: حاجة بتفرّقك عن اللي بيقولوا نفس الـ stack.",
            "المستقبل: انت عايز إيه في الخطوة الجاية.",
            "ليه الشركة دي بالذات: حاجة حقيقية عن منتجهم، مش جملة عامة."
          ],
          sol: R`الإجابة المظبوطة بتطلع ما بين ٥٠ و ٧٠ ثانية في التسجيل، وحوالي ١٢٠ لـ ١٥٠ كلمة. فيها مشروع واحد بالاسم أو بالوصف، ورقم واحد على الأقل انت عارف قسته إزاي، وآخر جملة عن الشركة دي بالذات.

الاختبار الحقيقي: لو اديت التسجيل لصاحبك وسألته «هتسألني على إيه؟»، المفروض يقول المشروع اللي انت اخترته. لو قال «مش عارف» يبقى الإجابة عامة.

النتايج الغلط الشائعة: التسجيل ٢ أو ٣ دقايق لأنك بدأت من الكلية، أو مفيهوش ولا رقم، أو آخره «and that's it» من غير ما تقول ليه انت هنا. ولو لقيت نفسك بتقول «umm» كتير، فده عادي في أول تسجيل، وبيقل من التالت أو الرابع.`
        },
        {
          cmd: "STAR",
          title: "«احكيلي عن أصعب bug قابلك»: إزاي ترتب القصة بـ STAR؟",
          desc: R`أي سؤال بيبدأ بـ «احكيلي عن مرة...» بجاوبه بـ STAR. الـ Situation: السياق في جملة أو اتنين. الـ Task: أنا كنت مسؤول عن إيه بالظبط. الـ Action: أنا عملت إيه خطوة خطوة، بـ «I» مش «we»، ودي حوالي ٦٠٪ من القصة. الـ Result: النتيجة بأرقام، وإيه اللي اتعلمته. القصة كلها حوالي دقيقتين.

وبجهّز من قبلها ٥ أو ٦ قصص حقيقية بتغطي أغلب الأسئلة: bug صعب، وخلاف مع زميل، وغلطة عملتها، و deadline فات، وحاجة اتعلمتها بسرعة، وحاجة عملتها من غير ما حد يطلبها. والقصة الواحدة ممكن تجاوب أكتر من سؤال لو غيّرت الزاوية.`,
          example: R`S: "On an ordering system I built, some customers paid but their orders stayed pending. About 1 in 50 orders."
T: "I owned the payment integration, so it was mine to find and fix, and fast, because real money was involved."
A1: "I couldn't reproduce it locally, so I added structured logs around the payment webhook, with the order id on every line."
A2: "The logs showed the webhook sometimes arrived before the order was committed, so the lookup found nothing, and we still returned 200."
A3: "I made the handler idempotent, returned an error when the order wasn't found so the provider would retry, and added a nightly job that reconciles payments with orders."
R: "Stuck orders went from about 2% to zero the next month, and the reconcile job later caught two problems on the provider's side."
Learned: "Now I never assume a webhook arrives once or in order, and I log the ids I'll need before I need them."`,
          try: "اكتب قصة «أصعب bug» بتاعتك بنفس الـ ٧ سطور. عدّ كلمات الـ Action وكلمات الـ Situation: الـ Action لازم يبقى أطول بكتير. بعدين احكيها بصوت عالي بتايمر، وجرّب تقطعها لـ ٩٠ ثانية.",
          flag: "script",
          deep: {
            why: "الأسئلة السلوكية بتتوقع إنك هتتصرف في المستقبل زي ما اتصرفت قبل كده، فبتطلب قصص حقيقية مش آراء. و «أصعب bug» بالذات بيوري طريقة تفكيرك في الـ debugging: فرضيات، وقياس، ومش تخمين.",
            how: R`الـ Situation و Task مع بعض أقل من ٢٠ ثانية: الإنترفيوير مش محتاج تاريخ الشركة. الـ Action هو اللي بيتقيّم، فقسّمه لخطوات، وفي كل خطوة قول «ليه»: ليه ضفت logs بدل ما تخمّن، ليه رجّعت error بدل 200. ولو كان فريق، قول انت عملت إيه بالظبط: «We fixed it» مبتقولش هو انت ولا زميلك.

الـ Result فيه جزئين: الرقم (من ٢٪ لصفر)، والدرس اللي بقى عادة عندك. الدرس ده هو اللي بيفرّق مبتدئ اتعلّم من مبتدئ حظه حلو.

للـ bug بالذات: اختار واحد فيه تشخيص حقيقي (مش typo قعدت فيه ساعتين)، وفيه أسباب مش باينة: race condition، أو timezone، أو cache، أو encoding. ولو القصة جت من مشروع شخصي مفيش مشكلة، بس قول كده بوضوح. والتفاصيل التقنية في «تاب بناء مشروع كامل»: [[webhook الدفع]] و [[structured logs]].`,
            when: "نفس الشكل لكل «احكيلي عن مرة...»: «Tell me about a time you had to learn something fast»، «...a time you went beyond your role»، «...a time you got hard feedback». Follow-ups على الـ bug: «كنت هتعرفه أسرع إزاي؟»، «إيه اللي كان ممكن يمنعه من الأول؟»، «ليه مظهرش في الاختبارات؟».",
            mistakes: R`قصة متخيلة: أول follow-up عن التفاصيل بيكشفها. «we» طول القصة فمحدش عارف انت عملت إيه. Situation دقيقتين والـ Action جملة. من غير نتيجة («وبعدين اتحلت»). bug تافه أو bug كان سببه إهمال واضح من غير درس. وقصة بتلوم فيها زميل أو العميل.`
          },
          lines: [
            "الـ Situation: المشكلة وحجمها في جملة واحدة.",
            "الـ Task: انت كنت مسؤول عن إيه، وليه كان مستعجل.",
            "الـ Action ١: ليه بدأت بالقياس (logs) بدل التخمين.",
            "الـ Action ٢: السبب الحقيقي اللي الـ logs كشفته.",
            "الـ Action ٣: الحل بتلات طبقات: idempotent، و retry، و reconcile.",
            "الـ Result بأرقام، وفايدة ظهرت بعدين.",
            "الدرس: العادة اللي اتغيرت عندك."
          ],
          sol: R`قصتك المكتوبة المفروض يطلع فيها الـ Action أكتر من نص الكلام. لو الـ Situation أطول من الـ Action، شيل من السياق. ولو الكلمة «we» ظهرت في الـ Action أكتر من مرة، حوّلها لـ «I» أو قول مين عمل إيه.

وعلى التايمر الإجابة الكويسة بتطلع ما بين ٩٠ ثانية ودقيقتين. أطول من كده غالبًا فيه تفاصيل تقنية الإنترفيوير مطلبهاش: سيبها للـ follow-up.

القصة كاملة لو فيها: رقم في الـ Result، وسبب حقيقي اتلاقى بقياس، ودرس بقى عادة. وأشهر نتيجة غلط: قصة مفيهاش تشخيص خالص («لقيت الغلطة وصلحتها»)، ودي مبتوريش أي حاجة عن طريقة تفكيرك.`
        },
        {
          cmd: "disagree and commit",
          title: "«احكيلي عن مرة اختلفت فيها مع زميل»: تقول إيه من غير ما تبان عنيد أو ضعيف؟",
          desc: R`الإنترفيوير بيدوّر على تلات حاجات: إنك بتختلف بالداتا مش بالصوت، وإنك بتسمع وتفهم وجهة النظر التانية قبل ما ترد، وإنك بتلتزم بالقرار حتى لو مكانش رأيك (disagree and commit). فبختار خلاف تقني حقيقي، مش شخصي، وبحكيه بـ STAR.

والنتيجة المهمة إن المشروع كسب، مش إني أنا كسبت. وأحسن قصة فيها إن الطرفين كانوا صح في حتة، أو إني غيّرت رأيي لما شفت داتا.`,
          example: R`S: "A teammate wanted to add Redis caching to our product list endpoint, because it felt slow."
T: "I was reviewing his PR, and I thought caching would hide the real problem and add invalidation bugs."
A1: "Instead of a long thread in the PR comments, I asked for 15 minutes on a call, and first asked what slow meant to him. He'd seen 2-second responses."
A2: "I suggested we measure before deciding. We ran EXPLAIN ANALYZE together and found an N+1 query and a missing index."
A3: "We agreed to fix the query first and keep caching as plan B. I also told him his idea was right for the homepage, which really is hot."
R: "The endpoint went from about 2 seconds to 120 ms without a cache. We added caching to the homepage later, with a clear TTL."
Learned: "I try to turn opinions into a quick measurement, and I move a discussion to a call when the comments get long."`,
          try: "افتكر خلاف تقني حقيقي (حتى لو مع نفسك في مشروع شخصي، أو مع عميل على feature). اكتبه بالشكل ده، وبعدين اكتب نسخة تانية انت فيها اللي «خسرت» والتزمت بقرار الـ lead: إيه اللي عملته عشان القرار ينجح؟",
          flag: "script",
          deep: {
            why: "كل فريق فيه خلافات يومية في الـ code review والتصميم. الشركات خايفة من حاجتين: حد بيحارب على كل تعليق، وحد بيسكت ويوافق على أي حاجة وبعدين يشتكي. القصة بتوري انت أنهي نوع.",
            how: R`ابدأ بإنك فهمت: «first asked what slow meant to him» بتقول إنك مبتفترضش إن التاني غلط. بعدين حوّل الرأي لتجربة صغيرة أو رقم: [[EXPLAIN ANALYZE]]، أو benchmark، أو prototype في ساعة. الداتا بتشيل الأنا من النقاش.

لو الخلاف مخلصش بالداتا، فيه طريقين محترمين: حد صاحب قرار (الـ tech lead أو صاحب الـ feature) يقرر، أو تجربوا الأسهل في الرجوع عنه الأول. وبعد القرار التزم بجد: متقولش «مش قلتلكم» لو حصلت مشكلة.

ولو جالك السؤال بصيغة «with your manager»، نفس الشكل، بس ركّز إنك قلت رأيك بوضوح مرة، بالداتا، وبعدين نفّذت. والتفاصيل التقنية للقصة في «تاب بناء مشروع كامل»: [[indexes و N+1]] و [[cache-aside + TTL]].`,
            when: "الصيغ: «a conflict with a coworker»، «you disagreed with your manager»، «you received critical feedback in a code review»، «you had to convince someone». Follow-ups: «ولو كان رأيه اتنفّذ وطلع غلط؟»، «لو الـ lead قرر عكس رأيك تعمل إيه؟»، «فيه حد مكنتش بتعرف تشتغل معاه؟».",
            mistakes: R`«I never had a conflict»: مش مصدّقة وبتقول إنك مبتقولش رأيك. قصة شخصية (حد متأخر أو كسلان) بدل خلاف تقني. قصة الزميل فيها غبي وانت البطل. إنك «صعّدت للمدير» كأول خطوة. ونهاية من غير قرار أو من غير ما تقول اتعلمت إيه.`
          },
          lines: [
            "الـ Situation: الخلاف على إيه، وفكرة الزميل وسببها.",
            "الـ Task: دورك، ورأيك المختلف وسببه.",
            "الـ Action ١: نقل النقاش لمكالمة، وسمعت الأول.",
            "الـ Action ٢: حوّلت الرأي لقياس بدل جدال.",
            "الـ Action ٣: اتفاق، وخطة بديلة، واعتراف إنه كان صح في حتة.",
            "الـ Result: رقم قبل وبعد، والفكرة التانية اتنفذت في مكانها الصح.",
            "الدرس: طريقتك في الخلافات الجاية."
          ],
          sol: R`القصة الأولى صح لو فيها: خلاف على حاجة تقنية أو قرار شغل، وخطوة سمعت فيها الأول، وداتا أو تجربة حسمت، ونتيجة للمشروع. لو القصة آخرها «وطلعت أنا صح» وبس، زوّد الحتة اللي التاني كان صح فيها أو اللي اتعلمته منه.

والنسخة التانية (انت خسرت) صح لو فيها إنك قلت رأيك مرة بوضوح وبسبب، وبعدين نفّذت القرار كويس فعلًا، وأحسن لو ضفت حاجة تقلل الخطر اللي كنت خايف منه (اختبار، أو monitoring، أو feature flag). دي بالظبط معنى disagree and commit.

النتيجة الغلط: إنك متلاقيش ولا خلاف. غالبًا فيه، بس انت مش شايفه «خلاف»: أي code review اتناقشت فيه، أو عميل طلب حاجة وانت اقترحت أبسط، ينفع.`
        },
        {
          cmd: "غلطة عملتها",
          title: "«احكيلي عن غلطة عملتها»: إزاي تعترف من غير ما تحرق نفسك؟",
          desc: R`بختار غلطة حقيقية ليها أثر حقيقي، وأنا اللي عملتها، مش «أنا perfectionist» ولا غلطة زميلي. وبحكي: عرفتها إزاي، وصلّحت الأثر إزاي وبسرعة قد إيه، وقلت لمين، وأهم حتة: غيّرت إيه في طريقة شغلي عشان متتكررش.

الإنترفيوير عارف إن كل الناس بتغلط. هو بيقيس الـ ownership: بتخبي ولا بتبلّغ، وبتلوم ولا بتصلّح، وبتتعلم ولا بتكرر.`,
          example: R`S: "On my first production deploy for a client, I ran a migration that renamed a column."
T: "I was the only developer, so the deploy and the database were my responsibility."
A1: "The old version of the app was still running during the deploy. It queried the old column name, and the site returned errors for about 10 minutes."
A2: "I rolled back the app, renamed the column back with a quick migration, and told the client what happened the same day."
A3: "Then I changed how I deploy: expand and contract migrations, a backup before every migration, and I test migrations on a copy of production data first."
R: "I haven't had downtime from a migration since, and the client kept me to maintain the project."
Learned: "A change can be safe before the deploy and after it, and still break things during it."`,
          try: "اكتب ٣ غلطات عملتها فعلًا في شغل أو مشروع. شيل أي واحدة كانت إهمال بس من غير درس، أو فيها ضرر لحد بشكل مش مقبول. اختار واحدة من الباقي واكتبها بـ STAR، وخلي الـ «A3» (اللي غيّرته) أوضح سطر.",
          flag: "script",
          deep: {
            why: "الشركات عايزة حد لما يكسر الإنتاج يقول بسرعة ويصلّح، مش حد يخبي لحد ما اليوزرز يشتكوا. والسؤال بيوري نضجك: هل بتشوف الغلطة كفرصة تحسّن العملية ولا كعيب شخصي تداريه.",
            how: R`الحجم المناسب: غلطة ليها أثر حقيقي (downtime قصير، أو داتا اتحسبت غلط واتصلحت، أو feature اتسلّمت ناقصة) بس مش كارثة أخلاقية ولا إهمال متكرر. والأحسن تكون من زمان شوية، عشان تقدر تقول إيه اللي اتغير من ساعتها فعلًا.

الترتيب اللي بيقنع: الاكتشاف (عرفتها بنفسك أحسن)، والاحتواء الأول (rollback، أوقف النزيف)، والتواصل (قلت للعميل أو الـ lead بنفس اليوم)، والتصليح الجذري، والتغيير في العملية (checklist، أو اختبار، أو خطوة في الـ CI، أو review). الجزء الأخير ده زي الـ postmortem من غير لوم: السؤال «إيه اللي في النظام سمح للغلطة تحصل؟».

والتفاصيل التقنية للمثال في «تاب بناء مشروع كامل»: [[expand / contract]] و [[backups و DR]] و [[mitigate ثم postmortem]].`,
            when: "الصيغ: «a mistake you made»، «a time you failed»، «something you'd do differently»، «a time you broke production». Follow-ups: «مين عرف الأول، انت ولا العميل؟»، «لو حصلت تاني بكرة هتعمل إيه في أول ٥ دقايق؟»، «إيه اللي منع الاختبارات تمسكها؟».",
            mistakes: R`غلطة مش غلطة («I work too hard»). غلطة حد تاني. قصة مفيهاش تغيير في طريقة الشغل. غلطة بتقول إنك مش أمين أو مستهتر (خبيت حاجة، أو شغّلت أمر على الإنتاج وانت مش فاهمه ومتعلمتش). وإنك تقعد تبرر طول القصة بدل ما تقول «كانت غلطتي» في جملة وتكمّل.`
          },
          lines: [
            "الـ Situation: إيه اللي حصل، في جملة.",
            "الـ Task: مين كان مسؤول: انت.",
            "الـ Action ١: الأثر بصراحة وبرقم (١٠ دقايق errors) وسببه.",
            "الـ Action ٢: الاحتواء بسرعة، وبلّغت العميل نفس اليوم.",
            "الـ Action ٣: التغيير في طريقة الشغل عشان متتكررش. أهم سطر.",
            "الـ Result: الدليل إن التغيير نفع.",
            "الدرس في جملة ممكن تتقال لأي فريق."
          ],
          sol: R`الغلطة المناسبة لو شلت منها الأسماء تنفع تتحكي في أي انترفيو من غير ما تخاف. فيها أثر حقيقي بس محدود، وانت اللي عملتها، وانت اللي صلحتها.

القصة صح لو سطر «اللي غيّرته» فيه حاجة ملموسة تقدر تتسأل عليها: checklist، أو اختبار، أو خطوة في الـ CI، أو backup قبل migration. «بقيت أركّز أكتر» مش تغيير.

النتايج الغلط الشائعة: إنك تختار غلطة صغيرة جدًا عشان تبان كويس (الإنترفيوير هيسأل «طب وحاجة أكبر؟»)، أو قصة آخرها لوم لحد تاني، أو إنك تحكي الأثر من غير رقم فمحدش عارف كانت كبيرة ولا لأ.`
        },
        {
          cmd: "deadline فات",
          title: "«احكيلي عن deadline مقدرتش تلحقه»: الإجابة الصح فيها إيه؟",
          desc: R`الإنترفيوير عايز يعرف: عرفت إمتى إنك متأخر، وقلت لمين وإمتى (بدري، مش آخر يوم)، واتفاوضت على إيه، وإيه اللي اتعلمته في التقدير. القاعدة: الأخبار الوحشة بدري. والحل غالبًا إنك تقطّع الـ scope (تسلّم الأهم في معاده والباقي بعده)، مش إنك تسهر وتسلّم حاجة مكسورة.

الأربع حاجات اللي ممكن تتحرك في أي مشروع: الـ scope، والوقت، والناس، والجودة. والجودة بالذات بلاش تكون هي اللي تتضحّى بيها من غير ما تقول.`,
          example: R`S: "I estimated two weeks for an admin dashboard with reports, filters and Excel export."
T: "I owned the feature end to end, and the client had a demo with investors on a fixed date."
A1: "By the end of week one I was about 40% done, because the report queries were much harder than I expected."
A2: "I told the client that same day, not on the deadline, and gave two options: everything one week late, or the core reports on time and the export a week later."
A3: "They chose the second. I shipped the three reports they needed for the demo, and the export followed six days later."
R: "The demo happened on time with real data, and the full feature was done one week after the original date."
Learned: "Now I split estimates into small tasks, add a buffer for anything I haven't done before, and share progress every few days."`,
          try: "افتكر آخر حاجة اتأخرت فيها (حتى لو مشروع كلية أو مشروع شخصي). اكتب: عرفت إنك متأخر في أنهي يوم؟ وقلت إمتى؟ لو الفرق بينهم أكتر من يوم، اكتب إزاي كنت هتعرف أبدر. وبعدين اكتب القصة بالشكل ده.",
          flag: "script",
          deep: {
            why: "التقدير الغلط بيحصل لكل الناس، خصوصًا الـ juniors. اللي بيفرق في الشغل هو التواصل: مدير عرف بدري عنده خيارات، ومدير عرف آخر يوم معندوش غير الإحراج. والسؤال بيقيس ده بالظبط.",
            how: R`الإشارة البدرية: قسّم الشغل لمهام صغيرة (يوم أو أقل)، ولو أول مهمة خدت ضعف التقدير، التقدير كله غالبًا غلط بنفس النسبة. ده وقت الكلام، مش بعدين.

لما تبلّغ، متجيش بالمشكلة لوحدها: تعالى بخيارين أو تلاتة وتكلفة كل واحد، وسيب صاحب القرار يختار. ده اللي في A2. والتقطيع الشائع: الـ happy path الأول، والحالات النادرة بعدين، أو الشاشة بتقرا بس والتعديل بعدين، أو التصدير بعدين.

والدرس لازم يكون عن التقدير نفسه: مهام صغيرة، و buffer للحاجات اللي أول مرة تعملها، وتحديث منتظم. ولو القصة إنك لحقت بالسهر كل يوم، فده مش درس يطمّن، قول ده من غير ما تفتخر بيه.`,
            when: "الصيغ: «a time you missed a deadline»، «a time you had too much work»، «how do you estimate?»، «a project that didn't go as planned». Follow-ups: «بتقدّر إزاي دلوقتي؟»، «لو العميل رفض الخيارين؟»، «بتعمل إيه لو الـ lead ضغط على تاريخ مش واقعي؟».",
            mistakes: R`«I never missed a deadline»: محدش هيصدّق، وحتى لو صح فالسؤال عن إزاي بتتصرف. تلوم العميل إنه غيّر المطلوب (حتى لو ده حصل، ركّز انت عملت إيه). تحكي إنك قلت آخر يوم. أو إن الحل كان سهر أسبوعين وتسليم من غير اختبارات.`
          },
          lines: [
            "الـ Situation: التقدير اللي اديته والمطلوب.",
            "الـ Task: انت مسؤول، وفيه تاريخ ثابت مش بيتحرك.",
            "الـ Action ١: إمتى عرفت إنك متأخر وليه.",
            "الـ Action ٢: بلّغت نفس اليوم ومعاك خيارين.",
            "الـ Action ٣: العميل اختار، وانت سلّمت الأهم في معاده.",
            "الـ Result: الحاجة المهمة اتعملت في وقتها، والباقي متأخر أسبوع بس.",
            "الدرس: إزاي بتقدّر وبتبلّغ من ساعتها."
          ],
          sol: R`القصة صح لو فيها الفرق بين «عرفت» و «قلت» يوم أو أقل، وفيها خيارات عرضتها مش مشكلة بس، ونتيجة فيها حاجة اتسلمت في معادها حتى لو ناقصة.

ولو لقيت إنك عرفت متأخر (مثلًا آخر يومين)، ده مش سبب تسيب القصة. خليه هو الدرس: «عرفت متأخر لأن المهام كانت كبيرة، فبقيت أقسّم لمهام يوم، وبعرف بدري». دي إجابة قوية لأنها صادقة وفيها تغيير.

الغلط الشائع: الـ Result يطلع «وسلمت كله في الآخر بعد ما سهرت»، من غير أي تفاوض على الـ scope ولا تغيير في التقدير.`
        },
        {
          cmd: "problem → decisions → results",
          title: "«احكيلي عن مشروع عملته»: إزاي تحكيه بحيث يبان إنك مهندس مش منفّذ؟",
          desc: R`بحكيه في أربع أجزاء. المشكلة: مين اليوزر وكان بيعاني من إيه. ودوري: عملت إيه أنا بالظبط وبأنهي أدوات. والقرارات والـ trade-offs: اخترت X بدل Y عشان كذا، والتمن كان كذا. والنتيجة بأرقام حقيقية: يوزرز، أو وقت، أو فلوس، أو أخطاء. وبقفل بـ «لو هعمله تاني هغيّر إيه».

الفرق بين المنفّذ والمهندس في الجزء التالت: المنفّذ بيقول «عملته بـ React و Node»، والمهندس بيقول «اخترت كذا عشان كذا، وكان التمن كذا». والأرقام لازم تكون حقيقية وتكون عارف اتقاست إزاي.`,
          example: R`Problem: "A small clinic booked appointments by phone and paper. Double bookings happened every week."
Role: "I built it alone: Next.js, a Node API and PostgreSQL, deployed on a VPS with Docker and Nginx."
Decision 1: "A modular monolith, not microservices. One developer means one deploy, with a clear folder per feature."
Decision 2: "I prevent double booking with a unique constraint on doctor and slot in the database, not only a check in the code, because two requests can pass a check at the same moment."
Trade-off: "Server-rendered pages instead of a heavy SPA, so it's fast on cheap phones. The cost was weaker offline support."
Results: "About 1,200 bookings a month now, zero double bookings since launch, and reception gets about half the phone calls it used to."
Next time: "I'd write end-to-end tests for the booking flow from day one. I added them after a regression, not before."`,
          try: "اختار أقوى مشروع عندك واكتبه بالسبع سطور دول. لو معندكش رقم حقيقي للنتيجة، روح هاته: اليوزرز من الداتابيز، أو وقت التحميل من Lighthouse، أو الأخطاء من Sentry. بعدين خلي صاحبك يسألك «ليه؟» بعد كل قرار ٣ مرات ورا بعض.",
          flag: "script",
          deep: {
            why: "ده أكتر سؤال بيتسأل للـ juniors بعد «عرّفنا بنفسك»، وهو فرصتك الوحيدة تتكلم في حاجة انت خبير فيها أكتر من اللي قدامك. الإنترفيوير بيحفر في القرارات عشان يعرف انت اللي فكّرت ولا نقلت tutorial.",
            how: R`الـ trade-off جملة بالشكل ده: «اخترت X عشان Y، والتمن Z». لو مش لاقي تمن، يبقى انت مش فاهم الاختيار كويس، أو ده مكانش قرار أصلًا. الأمثلة في «تاب بناء مشروع كامل»: [[modular monolith أولًا]] و [[القاعدة تحكم]]، وتمرين [[booking system]] فيه نفس مشكلة الحجز المزدوج.

الأرقام: اختار ٢ أو ٣ بس، وكل رقم اعرف مصدره. «About» كلمة كويسة لو الرقم تقريبي. ولو المشروع ملوش يوزرز (مشروع تعلم)، الأرقام ممكن تبقى تقنية: وقت الـ build، أو حجم الـ bundle قبل وبعد، أو coverage الـ business rules، أو زمن الـ API تحت load test.

وجهّز نسختين: دقيقتين، وعشر دقايق فيها رسمة للـ architecture ممكن ترسمها على الشاشة. وخلي الريبو أو الـ demo مفتوح قبل الانترفيو لو هتشارك الشاشة.`,
            when: "بيتسأل في كل الجولات تقريبًا: «walk me through a project you're proud of»، «what was the hardest part?»، «what would you change?». Follow-ups بتحفر: «ليه Postgres مش Mongo؟»، «لو اليوزرز بقوا ١٠٠ ضعف إيه اللي هيقع الأول؟»، «اختبرت إزاي؟»، «مين عمل الجزء ده؟».",
            mistakes: R`تحكي الـ features («فيه login، وفيه صفحة، وفيه dashboard») بدل المشكلة والقرارات. قايمة technologies من غير «ليه». أرقام مخترعة أو مش عارف مصدرها. تاخد كريدت شغل الفريق كله. تقول إن كل حاجة كانت perfect: الإنترفيوير بيحب يسمع «لو هعمله تاني...». ومشروع tutorial منقول زي ما هو من غير ولا قرار انت أخدته.`
          },
          lines: [
            "المشكلة: مين اليوزر ووجعه، في جملة.",
            "دورك بالظبط والأدوات، وفين شغال.",
            "قرار معماري وسببه.",
            "قرار تقني دقيق وسببه: القيد في الداتابيز لأن الـ check في الكود ممكن يعدّي طلبين مع بعض.",
            "trade-off صريح: الميزة والتمن.",
            "النتايج بتلات أرقام من مصادر مختلفة.",
            "لو هتعيده: غلطة حقيقية واتعلمت منها."
          ],
          sol: R`المشروع مكتوب صح لو كل قرار فيه كلمة «because» أو «so»، وسطر الـ trade-off فيه حاجة خسرتها فعلًا، والنتايج فيها ٢ أو ٣ أرقام انت تقدر تقول جبتها منين.

وتمرين «ليه؟ ٣ مرات» صح لو وصلت في التالتة لسبب حقيقي عن اليوزر أو القيود (فريق صغير، سيرفر رخيص، مستخدمين على موبايلات ضعيفة). لو في التانية قلت «عشان هو الأشهر» أو «عشان الكورس كان بيه»، ده القرار اللي محتاج تذاكره قبل الانترفيو.

الغلط الشائع: النتيجة تطلع features مش أرقام («والمشروع فيه ١٥ صفحة»)، أو مفيش «Next time» لأنك شايف المشروع كامل.`
        },
        {
          cmd: "أسئلتك للإنترفيوير",
          title: "«عندك أي أسئلة لينا؟»: تسأل إيه؟",
          desc: R`الإجابة دايمًا «أيوه». بجهّز ٤ أو ٥ أسئلة، وبسأل ٢ أو ٣ حسب الوقت. أسئلة عن الشغل نفسه مش حاجة مكتوبة في موقعهم: أول ٣ شهور شكلهم إيه، والـ code review والـ deploy ماشيين إزاي، والـ onboarding، وأصعب مشكلة بيحلوها دلوقتي.

والأسئلة دي بتقيّم الشركة انت كمان: الـ junior محتاج مكان فيه review و mentoring، مش مكان هيسيبه لوحده على الإنتاج من أول يوم. وأسئلة المرتب والإجازات مكانها مع الـ HR أو الـ recruiter، مش مع المهندس في الجولة التقنية.`,
          example: R`"What would success look like for this role in the first three months?"
"How does a change get from a pull request to production here, and how long does that usually take?"
"How do new developers get code review and mentoring in their first months?"
"What's the hardest technical problem the team is working on right now?"
"What do you enjoy most about working here, and what would you change if you could?"
"Is there anything in my background that makes you hesitant? I'd like the chance to answer it."`,
          try: "اكتب ٥ أسئلة لشركة حقيقية نفسك تشتغل فيها، اتنين منهم لازم يكونوا عن حاجة لقيتها في موقعهم أو إعلان الوظيفة (منتج، أو stack، أو خبر). وجنب كل سؤال اكتب: الإجابة اللي تطمّنك إيه، واللي تقلقك إيه.",
          flag: "script",
          deep: {
            why: "آخر ٥ دقايق بتسيب انطباع. «لا شكرًا» بتقول إنك مش مهتم أو مش محضّر. والسؤال الذكي بيوري إنك بتفكر في الشغل الحقيقي. وفي نفس الوقت دي فرصتك الوحيدة تعرف هل المكان ده هيعلّمك ولا لأ.",
            how: R`فصّل الأسئلة على الشخص: المهندس اسأله عن الكود والـ deploy والـ on-call، والـ manager اسأله عن التوقعات والتقييم والنمو، والـ recruiter اسأله عن المراحل الجاية والمواعيد.

إجابات تطمّن الـ junior: «كل PR بيتعمل له review»، و «فيه CI و staging»، و «بيبقى معاك buddy أول شهر». وإجابات تقلق: «مفيش اختبارات بس بنتحرك بسرعة»، و «هتبقى المطوّر الوحيد على المشروع»، و «بننشر من جهاز واحد فينا».

السؤال الأخير في المثال (فيه حاجة مخلياك متردد؟) بيفتح فرصة ترد على اعتراض قبل ما يتقرر عليك، بس بعض الناس بتحسه تقيل. استخدمه لو الجو كان مريح، وقوله بهدوء، ورد على الإجابة من غير ما تدافع بعصبية.`,
            when: "آخر كل جولة تقريبًا. ولو الوقت خلص قول «I have a couple of questions, can I send them by email?». وفي آخر مرحلة قبل العرض، اسأل الـ recruiter: «What are the next steps, and when can I expect to hear back?».",
            mistakes: R`«No, I think you covered everything». أسئلة إجابتها في أول صفحة في موقعهم. تسأل عن المرتب والإجازات والشغل من البيت في الجولة التقنية. تسأل ٨ أسئلة والوقت خلصان. وتسأل سؤال عشان تسأل ومتسمعش الإجابة: الإجابة غالبًا بتفتح كلام أحسن من السؤال التاني.`
          },
          lines: [
            "التوقعات: هيقيّموك على إيه في أول ٣ شهور.",
            "العملية: من الـ PR للإنتاج، وسرعتها بتقول كتير عن الفريق.",
            "التعلم: فيه review و mentoring ولا هتبقى لوحدك.",
            "الشغل الحقيقي: أصعب مشكلة عندهم، وغالبًا بتفتح كلام تقني حلو.",
            "الثقافة من جوه: اللي بيحبه واللي عايز يغيّره.",
            "اختياري: فرصة ترد على أي تردد قبل ما يتقرر."
          ],
          sol: R`القايمة صح لو السؤالين المخصوصين مش ممكن يتسألوا لأي شركة تانية («شفت إنكم نقلتوا لـ Next.js السنة دي، إيه اللي دفعكم؟»)، والتلاتة التانيين عن العملية والتعلم والتوقعات.

وعمود «الإجابة المطمئنة/المقلقة» هو أهم جزء: من غيره انت بتسأل وخلاص. مثال: سؤال الـ deploy، المطمئن «PR، و CI، و staging، و deploy تلقائي كام مرة في اليوم»، والمقلق «واحد بس اللي يعرف ينشر، وبيعمله بإيده».

الغلط الشائع: كل الأسئلة عامة تنفع لأي شركة، أو فيها سؤال عن حاجة مكتوبة في الإعلان نفسه.`
        }
      ]
    },
    {
      t: "الـ take-home والعملي",
      l: 3,
      n: "تاسك في البيت أو كود قدام حد: اللي بيتقيّم مش إنه اشتغل وخلاص، لكن اختياراتك وإزاي بتشرحها",
      items: [
        {
          cmd: "time box",
          title: "جالك take-home وقالولك «٤ ساعات تقريبًا»: تقسّم الوقت إزاي وتختار تعمل إيه؟",
          desc: R`أول حاجة بقرا المطلوب مرتين وبكتب قايمتين: must (اللي من غيره التاسك مش متحل) و nice-to-have. لو فيه حاجة مش واضحة ببعت سؤال قصير في إيميل، ودي بتتحسب لي مش عليّا. ولو مردوش، بختار افتراض معقول وبكتبه في الـ README.

والوقت المقترح بحترمه تقريبًا: الـ reviewers بيقارنوا بحلول اتعملت في نفس الوقت، و ١٢ ساعة على تاسك ٤ ساعات مش بتبهر، بتقول إنك مبتعرفش تقدّر. وحاجة صغيرة كاملة (شغالة، ومختبرة، ومشروحة) أحسن بكتير من حاجة كبيرة نصها شغال. واللي معملتوش بكتبه تحت «لو عندي وقت أكتر».`,
          example: R`Task: "Build a REST API for a todo app with auth. Suggested time: about 4 hours."
Must: register and login, CRUD for todos, users only see their own todos, validation, tests for the core rules
Nice: pagination, rate limiting, Docker, a small front end
Question by email: "Should todos be shareable between users?" If no reply: assume not, and say so in the README
0:00-0:20  read twice, write this plan, set up the repo, the linter and the test runner
0:20-2:50  auth, then todos, with a test for each rule (ownership first)
2:50-3:30  errors, validation and edge cases: empty title, another user's id, expired token
3:30-4:00  README, run everything from a fresh clone, read the whole diff once`,
          try: "خد التاسك ده: «URL shortener API بـ Node، الوقت المقترح ٣ ساعات». اكتب الخطة بنفس الشكل قبل ما تكتب ولا سطر كود، وبعدين نفّذ بتايمر حقيقي، وسجّل كل ما تخلص بلوك الساعة كام. في الآخر قارن الخطة باللي حصل.",
          flag: "script",
          deep: {
            why: "الـ take-home أقرب حاجة للشغل الحقيقي: مطلوب مش واضح ١٠٠٪، ووقت محدود، ولازم تختار. والـ reviewer بيشوف قراراتك أكتر من كودك: فهمت المهم؟ سألت؟ وقفت في الوقت؟ ده بالظبط اللي هيحصل في أول sprint ليك.",
            how: R`ترتيب الـ must نفسه مهم: ابدأ بالحاجة اللي لو باظت التاسك كله يقع (هنا الـ auth والـ ownership)، مش بالحاجة الأسهل. وخلي الـ setup (lint و test runner) في أول ٢٠ دقيقة، عشان الاختبارات تتكتب مع الكود مش في الآخر لما الوقت يخلص.

لو الوقت خلص والـ must مش كامل، وقّف واكتب في الـ README إيه الناقص وكنت هتعمله إزاي. ده أحسن من إنك تسلّم متأخر يومين أو تسلّم كود مكسور. ولو التاسك من غير وقت محدد، اسأل «How much time do you expect candidates to spend?»، أو حط لنفسك حد وقول عليه.

ولاحظ: take-home أطول من يوم شغل من غير مقابل ده حقك ترفضه أو تسأل عنه بأدب. وقبل ما تبعت: اعمل clone في فولدر جديد وشغّل الخطوات اللي في الـ README بالحرف، لأن «شغال عندي» أشهر سبب رفض.`,
            when: "شركات كتير بتستخدمه بدل الـ live coding أو قبله، خصوصًا مع الـ juniors. وبعده غالبًا جولة بيسألوك فيها على الحل: «ليه عملت كذا؟»، «لو عندك وقت أكتر؟»، «ضيف feature صغيرة دلوقتي قدامنا».",
            mistakes: R`تبدأ تكتب كود أول دقيقة. تصرف الوقت كله على الـ nice-to-have (Docker و UI حلو) والـ must ناقص. مفيش ولا اختبار. تفترض حاجات من غير ما تكتبها. تبعت zip من غير Git history. تستخدم مكتبة تقيلة تحل التاسك كله فمفيش حاجة تتقيّم. أو تستخدم AI يكتب الحل كله ومتعرفش تشرحه في الجولة اللي بعدها.`
          },
          lines: [
            "المطلوب والوقت المقترح زي ما جم.",
            "الـ must: اللي من غيره التاسك مش متحل.",
            "الـ nice-to-have: يتعمل لو فضل وقت بس.",
            "سؤال في إيميل للحاجة المش واضحة، وافتراض مكتوب لو مردوش.",
            "أول ٢٠ دقيقة: خطة و setup للأدوات قبل أي feature.",
            "أكبر بلوك للـ must، والاختبارات معاه مش بعده، والأخطر الأول.",
            "بلوك للأخطاء والحالات الحدّية.",
            "آخر نص ساعة: README وتجربة من clone نضيف ومراجعة."
          ],
          sol: R`الخطة صح لو فيها: الـ must مكتوب قبل الـ nice، وأول بلوك فيه setup للـ tests، وآخر بلوك (٢٠ لـ ٣٠ دقيقة) للـ README والتجربة من clone نضيف. للـ URL shortener: الـ must غالبًا إنشاء لينك قصير، والتحويل بـ 301 أو 302، و 404 للكود المش موجود، و validation للـ URL، واختبارات للتلاتة دول. والـ nice: إحصائيات، ولينك مخصص، وانتهاء صلاحية.

والمقارنة في الآخر هي الدرس: أغلب الناس أول مرة بيلاقوا إن الـ must خد أكتر من المتوقع بـ ٣٠ لـ ٥٠٪، وإن بلوك الـ README اتاكل. ده طبيعي، وده بالظبط ليه الـ nice بيتأجل.

النتيجة الغلط: إنك تلاقي نفسك في الساعة التالتة لسه بتظبط Docker، والتحويل نفسه مش شغال.`
        },
        {
          cmd: "README بالافتراضات",
          title: "إيه اللي لازم يبقى في الـ take-home غير الكود؟ (tests و README و commits)",
          desc: R`الـ reviewer غالبًا بيفتح الـ README الأول، وبعدين الـ git log، وبعدين الاختبارات، وبعدين الكود. فالـ README فيه: إزاي أشغّل بأمر أو اتنين، والافتراضات، والقرارات والـ trade-offs، واللي معملتوش وليه، وإزاي أشغّل الاختبارات.

والاختبارات على الـ business rules المهمة (يوزر ميشوفش todos غيره، والـ validation)، مش coverage لكل getter. والـ commits صغيرة وبتحكي القصة: setup، وبعدين feature feature، وبعدين التصليحات، مش commit واحد اسمه «done» في الآخر.`,
          example: R`## Run
docker compose up -d && npm install && npm run dev
npm test
## Assumptions
- Todos are private to their owner (not shareable). I asked by email and had no reply yet.
- Emails are unique and case-insensitive.
## Decisions
- JWT in an httpOnly cookie, not localStorage, so scripts on the page can't read it.
- PostgreSQL with Prisma for relations and migrations. Trade-off: heavier than SQLite for a demo.
## Not done (with more time)
- Pagination, and rate limiting on login.
## Commits
feat: set up Express, ESLint and Vitest
feat(auth): register and login with hashed passwords
feat(todos): CRUD scoped to the owner, with tests
fix(todos): return 404, not 403, for another user's todo
docs: README with assumptions and decisions`,
          try: "افتح آخر مشروع عملته واكتبله README بالأقسام دي بالظبط. بعدين اعمل clone له في فولدر جديد، وامشي على قسم Run بالحرف: لو احتجت أي خطوة مش مكتوبة (متغير في .env، أو migration، أو seed)، ضيفها.",
          flag: "script",
          deep: {
            why: "الـ reviewer معاه ١٠ حلول وساعة. الـ README بيوفّر عليه وقت وبيوجّه عينه للحاجات اللي انت فكرت فيها، والـ commits بتوريه إزاي بتقسّم الشغل. والاتنين عادات شغل يومي: PR من غير وصف أو commit واحد ضخم بيتعب أي فريق.",
            how: R`قسم Run لازم يشتغل على جهاز حد تاني: [[.env.example]] فيه كل المتغيرات بقيم وهمية، وأمر الـ migrations، وأي seed. ولو فيه Docker compose للداتابيز يبقى أحسن، لأن الـ reviewer مش هيسطّب Postgres عشانك.

الافتراضات: كل حاجة المطلوب مقالهاش وانت قررتها. والقرارات: كل مكان فيه اختيارين معقولين، بالشكل «اخترت X عشان Y، والتمن Z». وقسم «Not done» بيحوّل النقص لدليل إنك واعي بيه.

الـ commits: Conventional Commits زي [[feat(auth): ...]] (في «تاب فحص الكود»: [[commitlint]]). وكل commit يسيب المشروع شغال. ولو اتلخبطت وانت شغال، تقدر تنضّف الـ history قبل ما تبعت بـ rebase (في «تاب Git»: [[git rebase]]). والـ fix commit في المثال مقصود: بيوري إنك لقيت مشكلة واختبرتها وصلحتها، وده مش عيب.`,
            when: "كل take-home، وكمان ريبوهات الـ portfolio على GitHub: اللي بيفتح الـ CV بتاعك بيفتح الريبو، والـ README أول حاجة. وفي الجولة اللي بعد الـ take-home أغلب الأسئلة بتيجي من قسم Decisions.",
            mistakes: R`README بتاع create-react-app الافتراضي زي ما هو. أوامر تشغيل ناقصة («شغال عندي»). commit واحد «initial commit» فيه كل حاجة. أسرار حقيقية في [[.env]] مرفوعة. اختبارات مكتوبة بس مش شغالة أو كلها skip. وقسم Decisions بيقول «استخدمت React عشان هو الأحسن» من غير أي تمن.`
          },
          lines: [
            "التشغيل: داتابيز في Docker، وبعدين السطّيب والتشغيل، في سطر.",
            "الاختبارات بأمر واحد.",
            "افتراض بسبب سؤال مجاش رده، وبتقول إنك سألت.",
            "افتراض تاني اتقرر عشان المطلوب مقالش.",
            "قرار أمني بسببه.",
            "قرار تقني بسببه وتمنه.",
            "اللي معملتوش بصراحة.",
            "commit الـ setup لوحده.",
            "الـ auth في commit.",
            "الـ todos مع اختباراتها في commit.",
            "تصليح لقيته: 404 بدل 403 عشان متأكدش إن الـ todo موجود أصلًا.",
            "التوثيق في الآخر."
          ],
          sol: R`الـ README صح لو حد تاني يقدر يشغّل المشروع من clone نضيف بالأوامر المكتوبة بس، من غير ما يسألك. أغلب الناس في التجربة دي بيكتشفوا خطوة ناقصة على الأقل: متغير في [[.env]] مش موجود في [[.env.example]]، أو أمر [[npx prisma migrate deploy]]، أو إن الداتابيز لازم تبقى شغالة الأول.

وقسم Decisions صح لو كل سطر فيه «عشان» وفيه تمن. لو مش لاقي ولا قرار فيه تمن، ارجع لمشروعك واسأل: اخترت الداتابيز دي ليه؟ الـ auth بتاعي فين بيتخزن؟ دي أول أسئلة هتتسألها.

النتيجة الغلط: README فيه وصف للمشروع وصور بس، ومفيهوش ولا أمر تشغيل.`
        },
        {
          cmd: "think aloud",
          title: "في الـ live coding: بتتكلم تقول إيه؟ وتعمل إيه لو اتزنقت؟",
          desc: R`بتكلم قبل ما أكتب مش بعده: بقول هعمل إيه وليه، وبعدين أكتب. وبسأل عن البيئة في الأول: أقدر أشغّل الكود؟ ينفع أدور على syntax؟ أنهي لغة؟ (الخطوات نفسها في المستوى التاني: [[clarify → examples → brute → optimize → test]]، والدرس ده عن الطريقة.)

ولو اتزنقت بقول كده بصوت عالي، وبرجع لمثال صغير بإيدي، وباقترح حل أبسط حتى لو بطيء، وبسأل «ينفع أفترض كذا؟». والـ hint لما ييجي باخده وأبني عليه، مش بجادل فيه. وقبل ما أقول «خلصت» بمشي على الكود بمثال وبـ edge cases: فاضي، وعنصر واحد، وتكرار، وسالب.`,
          example: R`"Before I code, let me repeat the problem to make sure I got it right."
"Can I assume the input fits in memory, and that it's not sorted?"
"I'll start with a simple O(n squared) version so we have something working, then improve it."
"I'm stuck on how to handle duplicates. Let me try a small example by hand."
"I think a hash map fixes this, because I keep asking: have I seen this value before?"
"Let me trace it with an empty array, one element and duplicates before I say it's done."
"In real code I'd validate the input here. Should I add that now, or focus on the algorithm?"`,
          try: "افتح مسألة سهلة من «تاب DSA» وشغّل تسجيل صوت، وحلها وانت بتقول كل جملة من دول في مكانها. اسمع التسجيل وعدّ: كام مرة سكتّ أكتر من ٢٠ ثانية؟ وقلت الـ complexity؟ ومشيت بمثال قبل ما تقول خلصت؟",
          flag: "script",
          deep: {
            why: "الإنترفيوير مش شايف دماغك، شايف الشاشة بس. لو سكتّ ٥ دقايق، بالنسبة له انت تايه، حتى لو بتفكر صح. والكلام بيحوّل الانترفيو من امتحان لـ pair programming، وده بيخلي الـ hints تيجي بدري بدل ما تغرق.",
            how: R`السكوت القصير عادي: «Let me think for a moment» وبعدين ١٥ أو ٢٠ ثانية تفكير ده طبيعي. المشكلة في السكوت الطويل من غير ما تقول انت بتفكر في إيه. قول الفرضية حتى لو مش متأكد: «I think sorting might help, let me check».

لما تتزنق: ارجع لمثال صغير واحله بإيدك وخلي بالك انت عملت إيه، الخطوات دي غالبًا هي الخوارزمية. أو حل نسخة أسهل من المسألة (من غير تكرار، أو أرقام موجبة بس) وبعدين وسّع. والـ brute force الشغال أحسن من ولا حاجة: قوله واكتبه لو الوقت ضيق.

والبيئة: بعض الانترفيوهات في editor مشترك من غير تشغيل ولا autocomplete، فجرّب تكتب كود من غير ما تشغّل. وبعض الشركات دلوقتي بتسمح باستخدام AI assistant في الانترفيو وبتقيّم إزاي بتستخدمه، وبعضها بتمنعه تمامًا: اسأل في الأول ومتفترضش.`,
            when: "في كل جولة كود: algorithms، أو take-home بيتكمّل قدامهم، أو pair programming. ونفس الجمل بتنفع في الـ system design.",
            mistakes: R`تكتب في صمت وبعدين تشرح في الآخر. تتكلم كلام من غير معنى عشان متسكتش («so... yeah... let me see...»). تقول «done» من غير ما تجرّب ولا مثال. تتجاهل الـ hint أو تقول «أنا كنت لسه هقول كده». ترفض تكتب brute force عشان مستني الحل الأمثل.`
          },
          lines: [
            "إعادة المسألة بكلامك: بتمسك سوء الفهم بدري.",
            "سؤال عن الافتراضات بدل ما تخمّن.",
            "بتعلن إنك هتبدأ بسيط، وبتقول الـ complexity.",
            "بتقول إنك اتزنقت، وبتقول هتعمل إيه.",
            "الفكرة وسببها، مش الكود بس.",
            "اختبار بحالات حدّية قبل ما تقول خلصت.",
            "بتوري إنك عارف الكود الحقيقي، وبتسيبه يحدد الأولوية."
          ],
          sol: R`التسجيل الكويس فيه كلام تقريبًا كل ٢٠ أو ٣٠ ثانية، حتى لو جملة زي «OK, now I'm writing the loop». وفيه لحظة قلت فيها الـ complexity، وفيه تتبّع بإيدك لمثالين على الأقل قبل «done».

أغلب الناس في أول تسجيل بيلاقوا فترة سكوت دقيقة أو أكتر، غالبًا وقت كتابة الكود نفسه. الحل إنك تقول الخطوة قبل ما تكتبها («now I'll add the value to the set»).

الغلط الشائع: إنك تتكلم عن الكود بعد ما تكتبه بدل قبله، فالإنترفيوير ميلحقش يصحّحك لو رايح غلط.`
        },
        {
          cmd: "pair programming round",
          title: "الانترفيو طلع pair programming على كود موجود: بيقيّموا إيه وتتصرف إزاي؟",
          desc: R`شركات كتير بدل مسائل الـ algorithms بتديك ريبو صغير وتطلب منك تضيف feature أو تصلّح bug، ومعاك مهندس منهم. بيقيّموا إزاي بتقرا كود مش بتاعك، وإزاي بتستخدم الأدوات (الاختبارات، والبحث، والـ debugger، والـ git)، وإزاي بتسأل وبتسمع وبتاخد اقتراحات.

الخطوات: أقرا الـ README وأشغّل الاختبارات الأول، وألف على هيكل المشروع بصوت عالي، وألاقي المكان بالبحث، وأكتب اختبار يفشل للـ bug، وأصلّح تعديل صغير، وأشغّل الاختبارات تاني. والمهندس اللي معايا زميل مش ممتحن: لو اقترح حاجة بجربها، أو بقول بأدب ليه شايف غيرها.`,
          example: R`cat README.md
npm install && npm test
git log --oneline -10
grep -rn "calculateTotal" src/
npx vitest run src/cart.test.js
git diff`,
          try: "خد ريبو open source صغير بـ JavaScript فيه اختبارات، واختار issue عليها «good first issue». اعمل الخطوات دي بالترتيب بتايمر ٦٠ دقيقة وانت بتتكلم بصوت عالي، حتى لو محدش معاك. هدفك: اختبار يفشل، وبعدين يعدّي.",
          deep: {
            why: "ده أقرب شكل انترفيو لليوم الحقيقي في الشغل: كود قديم، ومش بتاعك، ومعاك زميل. ناس كتير بتحل LeetCode كويس وبتتلخبط في ريبو حقيقي، والعكس. والشركات اللي بتعمله بتدوّر على حد ينفع يشتغل معاه من أول أسبوع.",
            how: R`الدقايق الأولى للاستكشاف مش ضياع وقت: الـ README، والـ scripts في [[package.json]]، وهيكل الفولدرات، وآخر commits. قول اللي بتشوفه: «This looks like routes, services and repositories, so the business logic is probably in services».

لاقي المكان بالبحث عن كلمة من الـ UI أو رسالة الخطأ أو اسم الـ endpoint، مش بفتح الملفات واحد واحد. وبعدين اكتب اختبار يثبت الـ bug قبل ما تصلحه: كده انت متأكد إنك فهمته، وعندك دليل إنه اتصلح. والتفاصيل في «تاب فحص الكود» ([[vitest]]) وفي «تاب Git» ([[git log -S / blame]]).

والتعامل مع الزميل: اسأل أسئلة محددة («Is this function used anywhere else?») مش «مش فاهم حاجة». ولو اقترح طريقة، جرّبها أو قول «I'd prefer X because Y, but happy to try yours». وقبل ما تخلص اعرض الـ diff كله وقول لو فيه حاجة كنت هتعملها في PR حقيقي (اختبار زيادة، أو تنضيف).`,
            when: "شائع في شركات المنتجات والـ startups، وأحيانًا بيبقى استكمال للـ take-home بتاعك (ضيف feature على الكود اللي انت كتبته). ونفس الطريقة بتنفع في أول أسبوع شغل على أي ريبو جديد.",
            mistakes: R`تعيد كتابة الملف كله عشان «مش عاجبك الكود». تبدأ تعدّل قبل ما تشغّل الاختبارات فمتعرفش هي كانت شغالة أصلًا ولا لأ. تفتح الملفات واحد واحد بدل البحث. تتجاهل الزميل أو تستأذنه في كل سطر. وتقول خلصت من غير ما تشغّل الاختبارات كلها بعد التعديل.`
          },
          lines: [
            "اقرا الـ README الأول: التشغيل والهيكل.",
            "سطّب وشغّل الاختبارات قبل أي تعديل، عشان تعرف الحالة الأصلية.",
            "آخر ١٠ commits: الفريق شغال على إيه وبيكتب إزاي.",
            "لاقي كل مكان فيه الدالة اللي هتلمسها، مع رقم السطر.",
            "شغّل ملف اختبار واحد بسرعة وانت بتصلّح.",
            "اعرض كل اللي غيّرته قبل ما تقول خلصت."
          ],
          sol: R`النتيجة المتوقعة: في أول ١٠ دقايق الاختبارات الأصلية بتعدّي (أو بتعرف إن فيه اختبارات فاشلة من قبلك وتقول كده). بعدها اختبار جديد انت كاتبه بيفشل برسالة بتوصف الـ bug، وبعد التعديل بيعدّي هو وكل الاختبارات القديمة، والـ [[git diff]] فيه تعديل صغير في ملف أو اتنين.

لو خلصت الساعة ومعرفتش تكتب اختبار يفشل، ده غالبًا معناه إنك لسه مش فاهم الـ bug بالظبط، مش إنك بطيء. ارجع لخطوة إنك تعيد إنتاجه بإيدك.

الغلط الشائع: الـ diff طالع ٢٠٠ سطر لأنك عدّلت format الملف كله أو غيّرت أسماء كتير. في pair programming ده بيخلي الزميل مش قادر يتابع.`
        }
      ]
    }
]);
