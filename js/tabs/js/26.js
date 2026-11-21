// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "الـ event loop",
      l: 3,
      n: "JS بيشغّل حاجة واحدة في المرة، فإزاي بيعمل async؟ الـ call stack والـ queues والـ microtasks، وليه الصفحة بتتجمد",
      projects: [
        { lvl: 'صغير', t: R`اختبار «اتوقع الناتج»`, what: R`ملف فيه ٥ snippets بتخلط sync و then و setTimeout و await و queueMicrotask، ولكل واحد توقعك كـ array. سكربت بيشغّل كل snippet بـ [[log]] مخصوص بيحط الناتج في array، ويستنى بـ setTimeout لحد ما الكل يخلص، ويقارن. من درسي event loop و microtasks.`, done: R`لكل snippet بيطبع «صح» أو «غلط» ومعاه المتوقع والحقيقي، ومثال الدرس اللي ناتجه [[A F H C E G D B]] واحد منهم وبينجح، وsnippet غلطت فيه عمدًا بيطلع «غلط».` },
        { lvl: 'صغير', t: R`زرار بيجمّد وزرار لأ`, what: R`صفحة فيها عدّاد بيزيد كل 100ms بـ setInterval، وزرار بيعمل [[while]] ثانيتين، وزرار بيعمل نفس الشغل على دفعات بـ setTimeout. من درس blocking و الـ main thread.`, done: R`الزرار الأول بيوقّف العدّاد ثانيتين وبعدها بيكمّل من غير ما يعوّض الأرقام اللي فاتت. مع التاني العدّاد بيفضل شغال. وتسجيل Performance في DevTools بيوري long task للأول بس.` },
        { lvl: 'متوسط', t: R`progress bar لمعالجة كبيرة`, what: R`معالجة ٢٠٠ ألف نص (مثلًا تعد الحروف العربي في كل واحد) على دفعات، و [[<progress>]] بيتحدث بعد كل دفعة، وزرار «إلغاء» بيوقّف في خلال دفعة واحدة، و «ابدأ» مبيشتغلش مرتين مع بعض. من دروس الوحدة ووحدة async.`, done: R`الـ bar بيوصل 100% والصفحة بتعمل scroll وانت مستني. الإلغاء بيوقّف ويطبع العدد اللي اتعالج. والنتيجة بعد ما يكمّل نفس نتيجة loop واحدة على نفس الداتا.` },
        { lvl: 'متوسط', t: R`محاكي event loop`, what: R`[[class Loop]] فيها طابورين ([[macro]] و [[micro]]) و methods [[log]] و [[timeout(fn)]] و [[then(fn)]]. [[run(program)]] بتشغّل الـ program sync، وبعدين تفضّي الـ micro كله، وبعدين تاخد macro واحد وتكرر. من درسي event loop و microtasks ووحدة الـ classes.`, done: R`نفس الـ program مرة بالمحاكي ومرة بالحقيقي (setTimeout و queueMicrotask) بيطلعوا نفس الترتيب في ٥ أمثلة على الأقل، منهم microtask بيسجّل microtask، و timeout جوه then، ومثال الدرس [[A F H C E G D B]].` },
        { lvl: 'كبير', t: R`Web Worker لـ CSV ضخم`, what: R`صفحة بتولّد (أو بتلزق في textarea) CSV فيه ٢٠٠ ألف سطر مبيعات، و Worker بيفكّه ويحسب إجمالي كل منتج، ويبعت [[{ type: "progress", done }]] كل ١٠ آلاف سطر و [[{ type: "result" }]] في الآخر. السطور البايظة بترجع في [[errors]] برقمها من غير ما يقع، وزرار إلغاء بيعمل [[terminate()]] ويعمل worker جديد، و [[worker.onerror]] بيعرض رسالة لو الـ worker نفسه وقع. من الوحدة دي ووحدات async والأخطاء والـ DOM.`, done: R`وانت المعالجة شغالة، الـ input بيكتب عادي والـ progress بيتحرك، و Performance مفيهوش long task على الـ main thread. CSV فيه ٣ سطور بايظة ← النتيجة سليمة و [[errors.length === 3]] بأرقامهم. الإلغاء في النص وبعدين ابدأ ← بيشتغل من الأول بنتيجة صح. والإجماليات زي اللي بتطلع لو حسبتها في الـ main thread.`, ext: R`زوّد [[<input type="file">]] يقرا CSV حقيقي من جهازك، وخلّي الـ worker يبعت الإجماليات كجدول متترتب، وزرار تصدير.` },
        { lvl: 'فكرة', t: R`لاقي الـ long task في موقع حقيقي`, what: R`افتح موقع بتستخدمه (أو مشروع ليك)، وسجّل Performance وانت بتعمل حاجة تقيلة (فلتر، أو بحث، أو scroll)، ولاقي أطول task والدالة اللي عاملاها. لو المشروع بتاعك، صلّحها.`, done: R`عندك ملاحظة فيها مدة الـ task قبل وبعد، واسم الدالة المسؤولة، والطريقة اللي صلّحت بيها (دفعات، أو Worker، أو شغل أقل).`, ext: R`اكتب [[measure(name, fn)]] بتحذّر في الـ console لو أي دالة أخدت أكتر من 50ms، وحطها حوالين الدوال المشكوك فيها.` },
      ],
      items: [
        {
          cmd: "event loop",
          title: "JS بـ thread واحد، فإزاي بيعمل كذا حاجة مع بعض؟",
          desc: R`JavaScript بينفّذ الكود على thread واحد: حاجة واحدة في المرة، في call stack واحد. الحاجات اللي بتاخد وقت (timers و fetch و events و الملفات) مش JS اللي بيستناها، المتصفح أو Node هو اللي بيعملها برّه، ولما تخلص بيحط الـ callback بتاعها في طابور (queue).

الـ event loop لفّة بسيطة: لو الـ call stack فاضي، خد أول حاجة من الطابور وشغّلها. عشان كده [[setTimeout(fn, 0)]] مبيشتغلش فورًا: بيستنى الكود الحالي كله يخلص.`,
          example: R`function a() { b(); }
function b() { console.trace("الـ stack دلوقتي: b ← a ← global"); }
a();
setTimeout(() => console.log("3: timeout"), 0);
fetch("https://example.com").then(() => console.log("4: fetch خلص"));
console.log("1: آخر سطر sync");
console.log("2: لسه sync");`,
          try: R`افتح loupe (latentflip.com/loupe) أو أي visualizer للـ event loop وحط كود فيه setTimeout و console.log، وشوف الـ stack والـ queue بيتحركوا. وبعدين في DevTools حط breakpoint جوه [[b]] وبص على Call Stack على اليمين.`,
          practice: [
            { lvl: 'سريع', t: R`صلّح الكود البايظ: زرار «احسب» بيعمل [[status.textContent = "جاري الحساب..."]] وبعدها على طول loop بيلف ٣ ثواني، وبعدين [[status.textContent = "خلص"]]. اليوزر عمره ما بيشوف «جاري». فسّر ليه وصلّحه.`, done: R`قبل التصليح النص بيفضل زي ما هو ٣ ثواني وبعدين يبقى «خلص» على طول: المتصفح مبيرسمش غير لما الـ call stack يفضى. بعد ما تأجل الشغل التقيل لحد بعد الرسم ([[requestAnimationFrame(() => setTimeout(heavy, 0))]]) «جاري الحساب...» بتظهر الأول.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: [[setTimeout(() => { console.log("A"); setTimeout(() => console.log("C"), 0); }, 0); setTimeout(() => console.log("B"), 0);]]. اكتب الترتيب وبعدين شغّله.`, done: R`[[A B C]]: الـ C اتسجّل في الطابور وهو بيتنفّذ A، فبيقف ورا B اللي كان مستني من الأول. ولو كتبت [[A C B]] انت متخيّل إن الـ timer الجديد بيتنفّذ جوه اللي سجّله.` },
            { lvl: 'تحدي', t: R`اشرحها بالـ stack: اكتب [[function count(n) { return n === 0 ? "done" : count(n - 1); }]] ونادي [[count(1e6)]]. وبعدين نسخة async: [[async function countA(n) { if (n === 0) return "done"; await null; return countA(n - 1); }]] و [[countA(1e5).then(console.log)]]. اكتب ٣ سطور لزميل بتشرح الفرق.`, done: R`الأولى بتقع بـ [[RangeError: Maximum call stack size exceeded]]. والتانية بتطبع [[done]] من غير ما تقع. والشرح فيه إن كل [[await]] بيرجّع للـ event loop والـ stack بيفضى قبل اللفة اللي بعدها، فالعمق مبيتجمعش.` },
          ],
          flag: "script",
          deep: {
            why: R`ده أشهر سؤال JS في الانترفيو للـ mid و senior: «اشرح الـ event loop». وفهمه بيفسّر كل حاجة غريبة في async: ليه الـ setTimeout بتتأخر، وليه loop تقيل بيجمّد الصفحة، وليه Promise بيشتغل قبل setTimeout.`,
            how: R`الأجزاء: الـ call stack (الدوال اللي شغالة دلوقتي، فوق بعض)، والـ heap (الـ objects)، والـ Web APIs في المتصفح أو libuv في Node (اللي بيعملوا الشغل البطيء فعلًا، وأحيانًا على threads تانية)، والطوابير.

اللفة الواحدة في المتصفح تقريبًا: ١. خد task واحدة من طابور الـ tasks (macrotask) وشغّلها لحد ما الـ stack يفضى. ٢. شغّل كل الـ microtasks (Promises) لحد ما طابورها يفضى. ٣. لو جه وقت رسم الشاشة (حوالي كل 16ms على شاشة 60Hz)، شغّل [[requestAnimationFrame]] callbacks، واحسب الـ layout، وارسم. وارجع لـ ١.

يعني مفيش حاجة بتقطع الكود وهو شغال. أي دالة بتبدأ بتخلص للآخر (run-to-completion). وعشان كده مش محتاج locks زي اللغات اللي فيها threads.

في Node الفكرة نفسها بس الطوابير مقسمة phases (timers ثم I/O ثم setImmediate...)، و [[process.nextTick]] بيشتغل قبل الـ Promises. التفاصيل في تاب «Node و npm» وتاب الانترفيو (concurrency vs parallelism).`,
            when: "كل ما تشوف ترتيب تنفيذ غريب، أو صفحة بتهنّج، أو callback بيتأخر. وفي أي انترفيو فرونت أو Node.",
            mistakes: R`تفتكر إن setTimeout بـ 1000 معناه بعد ثانية بالظبط: معناها «مش قبل ثانية»، ولو الـ stack مشغول هتتأخر. وتفتكر إن async معناه parallel: الكود بتاعك لسه على thread واحد، اللي بيحصل بالتوازي هو الـ I/O بس. وفي الانترفيو ارسم الـ stack والـ queue والـ microtask queue، واشرح مثال بالترتيب.`
          },
          teach: R`## المثال بيوريك إيه

حاجتين: الـ **call stack** (مين بينادي مين دلوقتي)، وإن أي حاجة async بتستنى الكود المتزامن كله يخلص، حتى لو مستنية 0ms. اتشغّل بـ Node 24 على Windows كملف [[app.mjs]].

---

## ١. الـ call stack: [[console.trace]]

~~~text app.js
function a() { b(); }
function b() { console.trace("الـ stack دلوقتي: b ← a ← global"); }
a();
~~~

- [[a]] بتنادي [[b]]، و [[b]] بتطبع الـ stack.
- **الـ call stack** (كومة النداءات): قايمة الدوال اللي شغالة دلوقتي، فوق بعض. لما دالة تتنادى بتتحط فوق، ولما تخلص بتتشال. والـ JavaScript بيشتغل على اللي فوق خالص بس.
- [[console.trace(رسالة)]]: بيطبع الرسالة ومعاها الـ stack اللي وصّلنا هنا.

~~~text الناتج (أوله)
Trace: الـ stack دلوقتي: b ← a ← global
    at b (file:///C:/Users/ali/js/app.mjs:2:24)
    at a (file:///C:/Users/ali/js/app.mjs:1:16)
    at file:///C:/Users/ali/js/app.mjs:3:1
    at ModuleJob.run (node:internal/modules/esm/module_job:439:25)
~~~

اقراه من فوق لتحت = من الأحدث للأقدم:

| السطر | معناه |
|---|---|
| [[at b (...app.mjs:2:24)]] | دلوقتي جوه b، السطر 2 العمود 24 (مكان [[console.trace]]) |
| [[at a (...:1:16)]] | b اتنادت من a، السطر 1 العمود 16 |
| [[at file:///...:3:1]] | و a اتنادت من الكود الـ global (برّه أي دالة)، السطر 3 |
| [[at ModuleJob.run ...]] | وتحت ده كود Node الداخلي اللي شغّل الملف |

و [[b]] لما تخلص بتتشال، وبعدها [[a]]، والـ stack يرجع للكود الـ global.

---

## ٢. ٤ رسايل: مين يطلع الأول؟

~~~text app.js
setTimeout(() => console.log("3: timeout"), 0);
fetch("https://example.com").then(() => console.log("4: fetch خلص"));
console.log("1: آخر سطر sync");
console.log("2: لسه sync");
~~~

- [[setTimeout(fn, 0)]]: «شغّل fn بعد 0ms». JavaScript مش هو اللي بيعدّ الوقت: بيسلّم الـ timer لـ Node (أو المتصفح) ويكمّل على طول. ولما الوقت يخلص، الـ callback بيتحط في **طابور** (queue).
- [[fetch(...).then(fn)]]: الطلب بيتبعت على الشبكة برّه JavaScript، و [[fn]] هتتشغّل لما الرد ييجي.
- السطرين الأخيرين **sync** (متزامنين): بيتنفّذوا فورًا بالترتيب.

~~~text الناتج
1: آخر سطر sync
2: لسه sync
3: timeout
4: fetch خلص
~~~

### ليه بالترتيب ده؟

الـ **event loop** لفّة بسيطة:

1. شغّل الكود الحالي لحد ما الـ stack يفضى (ده اسمه run-to-completion: مفيش حاجة بتقطع دالة شغالة).
2. لو الـ stack فاضي: خد أول callback من الطابور وشغّله.
3. ارجع لـ ١.

فـ 1 و 2 أولًا لأنهم في الكود اللي شغال دلوقتي. وبعدين الـ timeout، لأن 0ms خلصت بسرعة والـ callback بتاعه كان مستني في الطابور. والـ fetch آخر حاجة لأن الشبكة أبطأ (ممكن تسبق الـ timeout لو الرد جه أسرع، الاتنين async).

> [[setTimeout(fn, 0)]] معناها «مش قبل 0ms، وبعد ما الـ stack يفضى»، مش «دلوقتي». ونفس الكلام لـ [[setTimeout(fn, 1000)]]: بعد ثانية **على الأقل**.

---

## ٣. مين بيعمل الشغل البطيء؟

| الجزء | دوره |
|---|---|
| الـ call stack | الكود اللي شغال دلوقتي، واحد بس في المرة |
| الـ Web APIs (المتصفح) أو libuv (Node) | بيعملوا الـ timers والشبكة والملفات برّه JavaScript |
| الطابور (queue) | callbacks جاهزة ومستنية دورها |
| الـ event loop | لما الـ stack يفضى، ياخد من الطابور |

يعني الـ JavaScript نفسه thread واحد، بس الانتظار نفسه مش عليه.

---

## الخلاصة

- الكود المتزامن كله بيخلص الأول، وبعدين الـ callbacks بالدور.
- [[setTimeout(fn, 0)]] مش فوري.
- [[console.trace]] (أو breakpoint في DevTools ← Call Stack) بيوريك مين نادى مين.
- الدرس الجاي: ليه [[Promise.then]] بيسبق [[setTimeout]] حتى لو اتسجّل بعده.`,
          lines: [
            R`[[a]] بتنادي [[b]]، عشان نشوف الـ call stack: كل دالة بتتنادى بتتحط فوق اللي ناداها، وبتتشال لما ترجع.`,
            R`[[console.trace]] بيطبع الرسالة ومعاها الـ call stack اللي فيه دلوقتي: [[b]] فوق، وتحتها [[a]]، وتحتهم الكود الأساسي. ده نفس اللي بتشوفه تحت أي error، ومفيد لما تحتاج تعرف «مين نادى الدالة دي».`,
            R`[[a]] بتدخل الـ stack، وتنادي [[b]] فوقها، و [[b]] تطبع وتخرج، وبعدين [[a]] تخرج. كل ده متزامن: السطر اللي بعده مش هيبدأ غير لما الـ stack يرجع زي ما كان.`,
            R`[[setTimeout]] بتسجّل الـ timer وترجع فورًا. بعد 0ms الـ callback بيتحط في طابور الـ tasks، بس مش هيتنفّذ غير لما الـ stack يفضى خالص، فهيطلع بعد السطرين المتزامنين اللي تحت مع إنه مكتوب قبلهم.`,
            R`الطلب بيتبعت في الخلفية و [[fetch]] ترجّع Promise على طول من غير ما تستنى. الـ [[then]] هتشتغل لما الرد ييجي، يعني أكيد بعد كل الكود المتزامن، وغالبًا بعد الـ timeout كمان لأن الشبكة أبطأ من 0ms.`,
            R`كود متزامن، فبيتطبع فورًا وقبل الـ timeout والـ fetch مع إنهم اتكتبوا قبله. الأرقام في الرسايل هي ترتيب الطباعة الحقيقي.`,
            R`برضه متزامن فبيتطبع قبلهم. بعد السطر ده الـ stack بيفضى، ووقتها بس الـ event loop يبدأ ياخد من الطوابير.`,
          ],
          sol: R`في loupe هتشوف [[console.log]] تدخل الـ Call Stack وتخرج على طول، والـ [[setTimeout]] تدخل وتسيب الـ callback عند الـ Web APIs، وبعد الوقت يروح الـ Callback Queue، ومبيدخلش الـ stack غير لما يفضى. حتى لو الوقت 0.

في DevTools لما الكود يقف عند الـ breakpoint جوه b، الـ Call Stack هيبقى [[b]] فوق، وتحتها [[a]]، وتحتها [[(anonymous)]] وده الكود الـ global. ونفس الترتيب بيطبعه [[console.trace]] في Node ([[at b]] ثم [[at a]]). والناتج كله: الـ trace، و [[1: آخر سطر sync]]، و [[2: لسه sync]]، وبعدين [[3: timeout]] (أو fetch قبلها لو خلصت أسرع، لأنهم الاتنين async). اللي بيتوقع [[3]] قبل [[1]] ده اللي محتاج الدرس ده.`
        },
        {
          cmd: "microtasks و macrotasks",
          title: "ليه Promise.then بيشتغل قبل setTimeout 0؟",
          desc: R`فيه طابورين مش واحد. الـ macrotasks (أو tasks): setTimeout و setInterval و events و الـ I/O. والـ microtasks: [[.then]] و [[await]] و [[queueMicrotask]] و MutationObserver.

القاعدة: بعد كل task، الـ event loop بيفضّي طابور الـ microtasks كله قبل ما ياخد task تانية. عشان كده أي Promise جاهز بيشتغل قبل أي setTimeout، حتى لو الـ setTimeout اتسجّل الأول.

و [[await x]] معناه: الجزء اللي بعد الـ await في الدالة دي بقى microtask.`,
          example: R`console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve()
  .then(() => console.log("C"))
  .then(() => console.log("D"));
queueMicrotask(() => console.log("E"));
(async () => {
  console.log("F");
  await null;
  console.log("G");
})();
console.log("H");
// الناتج: A F H C E G D B`,
          try: R`اكتب الناتج على ورقة قبل ما تشغّل، وبعدين شغّله بـ [[node]]. وبعدين ضيف [[setTimeout(() => console.log("I"), 0)]] جوه أول then، وحاول تتوقع مكانه.`,
          practice: [
            { lvl: 'سريع', t: R`اقرا وتوقّع: [[setTimeout(() => console.log("timeout"), 0); Promise.resolve().then(() => console.log("then")); console.log("sync");]]`, done: R`[[sync then timeout]]، حتى إن الـ setTimeout اتكتب الأول: الـ microtasks بتتفضّى كلها قبل أي task.` },
            { lvl: 'تطبيق', t: R`اشرحها بجدول: [[async function one() { console.log("1a"); await two(); console.log("1b"); }]] و [[async function two() { console.log("2"); }]] وبعدهم [[console.log("start"); one(); console.log("end");]]. اعمل جدول ٣ أعمدة (الـ stack، والـ microtasks، واللي اتطبع) واملاه بعد كل خطوة، وبعدين شغّل.`, done: R`الطباعة [[start 1a 2 end 1b]]، والجدول بيوضح إن [[two]] بتشتغل sync لحد آخرها، و [[1b]] بس هي اللي دخلت طابور الـ microtasks ساعة الـ await، وخرجت بعد ما [[end]] اتطبعت والـ stack فضي.` },
            { lvl: 'تحدي', t: R`محاكاة وقارن: (١) microtask بيسجّل نفسه تاني ١٠٠ ألف مرة بـ [[queueMicrotask]]، وقبله [[setTimeout(() => console.log("timeout"), 0)]]: مين يطبع الأول؟ (٢) في Node: [[Promise.resolve().then(() => console.log("then")); process.nextTick(() => console.log("tick"));]] مرة في ملف [[.cjs]] ومرة في [[.mjs]].`, done: R`(١) رسالة الـ microtasks بتطلع بعد الـ ١٠٠ ألف لفة وبعدها بس [[timeout]]: microtasks مبتخلصش بتجوّع الطابور التاني كله (ولو لا نهائية الصفحة تقف). (٢) في الـ cjs [[tick]] وبعدين [[then]]، وفي الـ mjs العكس [[then]] وبعدين [[tick]]، لأن الـ ES module نفسه بيتنفّذ من جوه Promise فالـ microtasks بتخلص قبل ما Node يوصل لطابور nextTick.` },
          ],
          flag: "script",
          deep: {
            why: "سؤال «رتّب الـ console.log» ده بيتسأل تقريبًا في كل انترفيو JS. وفي الشغل بيفسّر ليه الـ state مش متحدثة لما تقراها بعد await، وليه microtasks كتير ممكن تجمّد الصفحة زي loop تقيل.",
            how: R`نمشي على المثال: الكود المتزامن الأول: A، ثم تسجيل B في طابور الـ tasks، ثم C في الـ microtasks، ثم E في الـ microtasks. الـ async function بتبدأ متزامن فبتطبع F، وأول await بيحط الباقي (G) في الـ microtasks ويرجع. ثم H.

الـ stack فضي، فنفضّي الـ microtasks بالترتيب: C (ولما خلصت، D اتسجّلت في آخر الطابور)، ثم E، ثم G، ثم D. الطابور فضي. دلوقتي بس task واحدة: B.

ليه الـ microtasks موجودة؟ عشان نتيجة الـ Promise تتعالج في أقرب وقت ممكن وبترتيب ثابت، قبل ما المتصفح يرسم أو يعالج events جديدة.

الخطر: microtask بتعمل microtask بتعمل microtask... الطابور مش هيفضى أبدًا، والصفحة هتتجمد، لأن الرسم مبيحصلش غير بعد ما يفضى. setTimeout المتكرر مش بيعمل كده لأنه بيدي فرصة للرسم بين كل مرة.

في Node: [[process.nextTick]] ليه طابور بيتفضّى قبل الـ Promises كمان، و [[setImmediate]] بيشتغل بعد مرحلة الـ I/O.`,
            when: R`[[queueMicrotask]] لما عايز حاجة تشتغل بعد الكود الحالي بس قبل أي event أو رسم (نادرًا في كود التطبيقات). setTimeout 0 لما عايز تدي المتصفح فرصة يرسم ويستجيب الأول.`,
            mistakes: R`تفتكر إن الترتيب حسب وقت التسجيل بس. وتنسى إن الجزء قبل أول await في async function متزامن (F اتطبعت قبل H). وتنسى إن كل then بتسجّل اللي بعدها لما تخلص بس (D جت بعد E و G).`
          },
          teach: R`## الفكرة

فيه **طابورين** مش واحد:

| الطابور | فيه إيه |
|---|---|
| macrotasks (أو tasks) | [[setTimeout]] و [[setInterval]] و events (ضغطة، كتابة) و I/O |
| microtasks | [[.then]] و [[await]] و [[queueMicrotask]] |

والقاعدة: بعد ما الكود اللي شغال يخلص، الـ event loop **بيفضّي طابور الـ microtasks كله** قبل ما ياخد macrotask واحدة. والمثال بيوريك ده بـ ٨ حروف. اتشغّل بـ Node 24 على Windows.

---

## ١. المثال حتة حتة

~~~text app.js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve()
  .then(() => console.log("C"))
  .then(() => console.log("D"));
queueMicrotask(() => console.log("E"));
(async () => {
  console.log("F");
  await null;
  console.log("G");
})();
console.log("H");
~~~

- [[Promise.resolve()]]: Promise **خلصان بالفعل** (resolved). فأول [[.then]] جاهزة تتسجّل microtask على طول.
- [[.then(...).then(...)]]: التانية متسلسلة على Promise اللي الأولى بترجّعه، فمش هتتسجّل غير لما C **تخلص**.
- [[queueMicrotask(fn)]]: بتحط fn في طابور الـ microtasks مباشرة.
- [[(async () => { ... })()]]: async arrow function، والأقواس [[()]] في الآخر بتناديها على طول (IIFE). والـ async function بتشتغل **متزامن** لحد أول [[await]].
- [[await null]]: أي [[await]]، حتى على حاجة مش Promise، بيوقف الدالة ويحط **باقيها** (هنا G) كـ microtask، ويرجع للي ناداها.

---

## ٢. التتبّع خطوة بخطوة

**المرحلة ١: الكود المتزامن**

| السطر | يطبع | macrotasks | microtasks |
|---|---|---|---|
| [[console.log("A")]] | A | | |
| [[setTimeout(B)]] | | B | |
| [[.then(C)]] | | B | C |
| [[queueMicrotask(E)]] | | B | C، E |
| الـ async: [[console.log("F")]] | F | B | C، E |
| [[await null]] | | B | C، E، G |
| [[console.log("H")]] | H | B | C، E، G |

الـ stack فضي. اتطبع لحد دلوقتي: A F H.

**المرحلة ٢: فضّي الـ microtasks**

| بيتنفّذ | يطبع | اللي حصل | microtasks بعدها |
|---|---|---|---|
| C | C | خلصت، فـ D اتسجّلت في **آخر** الطابور | E، G، D |
| E | E | | G، D |
| G | G | الـ async function خلصت | D |
| D | D | | فاضي |

**المرحلة ٣: macrotask واحدة**: B.

~~~text الناتج
A
F
H
C
E
G
D
B
~~~

---

## ٣. التجربة: [[setTimeout]] جوه أول then

غيّرنا أول then لـ [[.then(() => { console.log("C"); setTimeout(() => console.log("I"), 0); })]]:

~~~text الناتج (على سطر واحد)
A F H C E G D B I
~~~

I اتسجّلت في طابور الـ macrotasks **وقت ما C اشتغلت**، يعني بعد B اللي كانت هناك من المرحلة ١. والـ timers بتطلع بترتيب تسجيلها، فـ B الأول وبعدها I.

---

## ٤. ليه ده يفرق في الشغل؟

- أي [[await]] معناه إن الكود اللي بعده **مش** هيشتغل دلوقتي، حتى لو الـ Promise خلصان.
- الـ microtasks كلها بتخلص قبل ما المتصفح يرسم. فلو microtask بتعمل microtask بتعمل microtask من غير نهاية، الصفحة هتتجمد زي loop تقيل.

---

## ٥. event loop في Node: setImmediate و nextTick والمراحل

Node عنده نفس الفكرة (كود متزامن، وبعدين microtasks، وبعدين task)، بس الـ tasks مقسومة على **مراحل** (phases) بترتيب ثابت، ومعاه طابورين زيادة: [[process.nextTick]] و [[setImmediate]]. الترتيب ده من وثائق Node («The Node.js Event Loop»):

~~~text مراحل كل لفة (من وثائق Node)
   ┌─> timers           setTimeout و setInterval اللي وقتهم جه
   │   pending          callbacks متأجّلة من النظام (أخطاء TCP مثلًا)
   │   poll             استنى I/O جديد (ملفات، شبكة) ونفّذ الـ callbacks بتاعته
   │   check            setImmediate
   └── close            زي socket.on("close")
   وبين أي callback والتاني: nextTick الأول، وبعدين الـ Promises
~~~

### الأربعة مع بعض

~~~text order.cjs
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("promise"));
console.log("sync");
~~~

~~~text الناتج (Node 24، order.cjs، ٦ مرات نفس النتيجة)
sync nextTick promise timeout immediate
~~~

- [[process.nextTick(fn)]]: مش جزء من المراحل. طابور بيتفضّى **قبل** الـ Promises، بعد كل callback على طول. اسمه مضلّل: مش «الـ tick الجاي»، ده «حالًا بعد الكود ده».
- [[setImmediate(fn)]]: بيشتغل في مرحلة **check**، يعني بعد ما الـ poll (I/O) يخلص في اللفة دي.

### المفاجأة: نفس الكود في [[.mjs]]

~~~text الناتج (Node 24، نفس الكود بالظبط في order.mjs، ٦ مرات)
sync promise nextTick timeout immediate
~~~

الـ promise بقى **قبل** الـ nextTick. ليه؟ الـ ES module بيتنفّذ هو نفسه جوه Promise job، فلما الكود يخلص V8 بيكمّل يفضّي طابور الـ Promises اللي هو فيه أصلًا، وبعدين بس Node بيرجع يفضّي طابور الـ nextTick. يعني ترتيب «nextTick قبل promise» مضمون جوه callbacks، مش في أول تشغيل ملف ESM. ده سبب كافي إنك متبنيش كود على الترتيب بين الاتنين.

### [[setTimeout(0)]] ولا [[setImmediate]]: مين الأول؟

| فين | النتيجة (Node 24) | ليه |
|---|---|---|
| في أول الملف (main module) | مش ثابتة: ملف فيه السطرين دول بس، ٣٠ تشغيل: [[immediate]] الأول ٢٩ مرة و [[timeout]] مرة | الـ [[0]] بيبقى 1ms. لو اللفة الأولى وصلت مرحلة timers قبل ما الـ 1ms يعدّي، الـ timer بيستنى للفة الجاية |
| جوه callback بتاع I/O ([[fs.readFile]]) | [[immediate timeout]] كل مرة (٥ من ٥) | إحنا في مرحلة poll، واللي بعدها على طول check، والـ timers في اللفة الجاية |

~~~text io.mjs
import { readFile } from "node:fs";
readFile(import.meta.filename, () => {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
});
~~~

فلو عايز «شغّل ده بعد الـ I/O اللي شغال دلوقتي» استخدم [[setImmediate]]، مش [[setTimeout(fn, 0)]].

### nextTick ممكن يجوّع البرنامج

~~~text starve.cjs
let n = 0;
setTimeout(() => console.log("timeout بعد", n, "nextTick"), 0);
function again() { if (++n < 100000) process.nextTick(again); }
process.nextTick(again);
~~~

~~~text الناتج (Node 24)
timeout بعد 100000 nextTick
~~~

الـ timer مااشتغلش غير بعد الـ ١٠٠ ألف nextTick كلهم، لأن الطابور بيتفضّى كله قبل أي مرحلة. لو كان من غير حد، الـ I/O والـ timers عمرهم ما هيشتغلوا. نفس فكرة الـ microtasks في المتصفح. ولو عايز تقسّم شغل تقيل وتدّي الـ I/O فرصة، [[setImmediate]] هو الصح (درس «blocking و الـ main thread»).

جوه timer كمان: [[timer 1]] وبعده الـ nextTick والـ promise بتوعه **قبل** [[timer 2]]، لأن الطابورين بيتفضّوا بعد كل callback مش بعد المرحلة كلها (من Node 11).

---

## الخلاصة

| الترتيب | مين |
|---|---|
| ١ | الكود المتزامن كله (ومنه أول جزء في أي async function لحد أول await) |
| ٢ | كل الـ microtasks، والجديدة اللي بتتسجّل أثناءها بتتعمل كمان قبل أي macrotask |
| ٣ | macrotask **واحدة**، وبعدها ارجع لـ ٢ |

| في Node | بيشتغل إمتى |
|---|---|
| [[process.nextTick]] | بعد كل callback على طول، وقبل الـ Promises (غير أول تشغيل ملف ESM) |
| [[setTimeout(fn, 0)]] | مرحلة timers، بعد 1ms على الأقل |
| [[setImmediate]] | مرحلة check، بعد الـ I/O بتاع اللفة دي على طول |`,
          lines: [
            R`كود متزامن، فبيتطبع أول حاجة.`,
            R`بتسجّل task (macrotask). حتى بـ 0ms مش هتشتغل غير بعد ما الكود المتزامن يخلص **وكمان** طابور الـ microtasks يفضى كله، فـ [[B]] هتبقى آخر حاجة.`,
            R`Promise متحل خلاص، فأي [[then]] عليه هتتحط في طابور الـ microtasks على طول، بس متتنفّذش دلوقتي.`,
            R`أول microtask في الطابور. هتتنفذ أول ما الكود المتزامن يخلص، قبل أي timer.`,
            R`الـ [[then]] دي متعلقة بالـ Promise اللي راجع من [[then]] اللي قبلها، فمش هتدخل الطابور غير لما [[C]] تخلص. وقتها [[E]] و [[G]] يكونوا قدامها، فـ [[D]] تطلع بعدهم.`,
            R`[[queueMicrotask]] بتحط دالة مباشرة في طابور الـ microtasks من غير Promise. اتسجّلت بعد [[C]] فهتتنفّذ بعدها.`,
            R`async arrow function بتتنادى فورًا (IIFE). الـ async function بتبدأ تشتغل **متزامن** عادي لحد أول [[await]].`,
            R`لسه قبل أي [[await]]، فـ [[F]] بتتطبع فورًا، قبل [[H]] اللي في الكود الأساسي.`,
            R`أي [[await]] (حتى على قيمة مش Promise زي [[null]]) بيوقف الدالة ويرجّع للي ناداها، وباقي الدالة بيتحط microtask. فالكود الأساسي بيكمّل لـ [[H]].`,
            R`باقي الدالة بعد الـ [[await]]: بيتنفّذ كـ microtask بعد [[C]] و [[E]] اللي اتسجّلوا قبله.`,
            R`نهاية الدالة، و [[()]] بتناديها في نفس اللحظة.`,
            R`آخر سطر متزامن. بعده الطابور بيتفضى: [[C]] و [[E]] و [[G]] و [[D]]، وبعدين الـ task [[B]]. الترتيب كله: [[A F H C E G D B]].`,
          ],
          sol: R`الناتج [[A F H C E G D B]]. الـ sync الأول (A و F و H، و F لأن الـ async function بتشتغل sync لحد أول await). بعدين كل الـ microtasks بالترتيب اللي اتسجلت بيه: C و E و G، وبعدها D لأنها اتسجلت لما C خلصت. وفي الآخر الـ macrotask: B.

لما تضيف [[setTimeout(() => console.log("I"), 0)]] جوه أول then، I بتطلع بعد B: [[A F H C E G D B I]]. الـ timeout ده اتسجّل وقت ما C اتنفّذت، يعني بعد ما B كان في الطابور أصلًا، والـ timers بتطلع بترتيب تسجيلها. اللي بيحط I قبل D فاكر إن setTimeout بيقاطع الـ microtasks، وده الغلط.`
        },
        {
          cmd: "blocking و الـ main thread",
          title: "ليه الصفحة بتتجمد، وإزاي تشغّل حسابات تقيلة من غير تجميد",
          desc: R`في المتصفح، نفس الـ thread اللي بيشغّل JS هو اللي بيرسم الصفحة ويستجيب للضغط والكتابة. أي كود متزامن بياخد وقت طويل (loop على مليون عنصر، أو JSON ضخم، أو sort كبير) بيجمّد كل ده. المتصفح بيعتبر أي task أطول من 50ms «long task»، وده بيبوظ مقياس INP في Core Web Vitals.

الحلول: قسّم الشغل لدفعات وسيب المتصفح يتنفس بينهم، أو انقله لـ Web Worker على thread تاني خالص، أو اتأكد إن التعديلات البصرية في [[requestAnimationFrame]].`,
          example: R`const start = Date.now();
while (Date.now() - start < 2000) {}   // الصفحة متجمدة ثانيتين
async function processInChunks(items, fn, size = 500) {
  for (let i = 0; i < items.length; i += size) {
    items.slice(i, i + size).forEach(fn);
    await (globalThis.scheduler?.yield?.() ?? new Promise((r) => setTimeout(r, 0)));
  }
}
const worker = new Worker(new URL("./sum.worker.js", import.meta.url), { type: "module" });
worker.postMessage({ n: 1e9 });
worker.onmessage = (e) => console.log("النتيجة:", e.data);
// sum.worker.js: self.onmessage = (e) => { let s = 0; for (let i = 0; i < e.data.n; i++) s += i; self.postMessage(s); };
requestAnimationFrame(() => { document.body.style.opacity = "0.9"; });`,
          try: R`في Console على أي صفحة شغّل أول سطرين، وحاول تعمل scroll أو تضغط زرار وانت مستني. وبعدين افتح تاب Performance في DevTools وسجّل وانت بتشغّله: هتشوف long task بالأحمر.`,
          practice: [
            { lvl: 'سريع', t: R`محاكاة في Node: [[setInterval]] بيطبع [["tick"]] والوقت من البداية كل 100ms، وبعدها على طول [[while]] بيلف ثانية كاملة ([[Date.now() - s < 1000]])، وبعد ما الـ while يخلص بـ 150ms وقّف الـ interval واطبع عدد الـ ticks.`, done: R`مفيش ولا tick وقت الـ while. بعدها tick واحد بس على طول (حوالي 1000ms) مش ١٠ ورا بعض بيعوّضوا، وإجمالي الـ ticks حوالي ٢ مش ١١: الـ timers مبتتراكمش، بتتأخر.` },
            { lvl: 'تطبيق', t: R`قارن وقيس: array مليون رقم، و [[setInterval]] بيعد ticks كل 20ms. اجمعهم مرة بـ forEach واحدة، ومرة بـ [[processInChunks]] بتاعة الدرس بـ size [[10000]]، واطبع عدد الـ ticks اللي حصلت وقت المعالجة والمجموع في كل مرة.`, done: R`مع الـ forEach الواحدة الـ ticks اللي جواها صفر. مع الـ chunks فيه ticks اتنفّذت في النص لأن كل دفعة بتسيب الـ event loop يتنفس، والمعالجة نفسها بتاخد وقت أطول شوية. والمجموع واحد في الحالتين ([[499999500000]]).` },
            { lvl: 'تحدي', t: R`ابني صفحة فيها input وزرار «احسب» بيجمع من 0 لـ [[1e9]]: مرة الحساب في الـ main thread، ومرة في Web Worker زي الدرس. اكتب في الـ input وانت مستني. وزوّد زرار «إلغاء» بيعمل [[worker.terminate()]] ويعمل worker جديد للمرة الجاية.`, done: R`في الـ main thread الحروف اللي بتكتبها مبتظهرش لحد ما الحساب يخلص. في الـ Worker بتكتب عادي والنتيجة نفس الرقم. الإلغاء بيوقف الحساب ومفيش [[onmessage]] بيوصل بعده، و «احسب» بعدها بيشتغل تاني.` },
          ],
          flag: "script",
          deep: {
            why: "«الموقع بيهنّج لما أدوس على الزرار» مشكلة حقيقية بيحسها اليوزر أكتر من أي حاجة. و Google بيقيس الاستجابة (INP) كجزء من الـ SEO. وسؤال انترفيو: «إزاي تعالج ١٠٠ ألف صف من غير ما الصفحة تقف؟».",
            how: R`طول ما فيه task شغالة، الـ event loop مش هيوصل لمرحلة الرسم ولا هيعالج الضغطات. فالحل يا إما تقصّر الـ tasks، يا إما تطلّعها برّه الـ main thread.

التقسيم (chunking): كل دفعة task لوحدها، و [[setTimeout(r, 0)]] بينهم بيدي الـ event loop فرصة يرسم ويستجيب. و [[scheduler.yield()]] (موجود في Chrome و Edge ومتصفحات تانية بتلحق) بيعمل نفس الحاجة بس بيرجّعك في أول الطابور بدل آخره. الكود فوق بيستخدمه لو موجود.

Web Worker: ملف JS بيشتغل على thread تاني، مالوش DOM ولا window. بتكلّمه بـ [[postMessage]]، والداتا بتتنسخ (structured clone، زي structuredClone) مش بتتشارك، إلا لو بعت ArrayBuffer كـ transferable. في Node فيه [[worker_threads]] بنفس الفكرة.

[[requestAnimationFrame(fn)]] بيشغّل fn قبل الرسم الجاي بالظبط، فأي animation أو تعديل بصري فيه بيبقى ناعم ومتزامن مع الشاشة، ومبيشتغلش والتاب في الخلفية.

وقبل أي حاجة من دول: قيس الأول بـ Performance tab، وغالبًا المشكلة الحقيقية حاجة أبسط (تاب HTML و CSS: layout thrashing، وتاب React للـ re-renders).`,
            when: "Worker للحسابات التقيلة المستقلة (معالجة صور، parsing ملفات كبيرة، تشفير، بحث في داتا ضخمة). Chunking لما الشغل محتاج الـ DOM. rAF لأي animation بـ JS. و virtualization لليستات الطويلة جدًا.",
            mistakes: R`تحط الشغل التقيل في Promise وتفتكر إنه بقى «في الخلفية»: الـ Promise مش thread، والكود جوه الـ executor بيشتغل متزامن على نفس الـ thread. وتعمل animation بـ setInterval. وتبعت objects ضخمة للـ worker كل شوية فالنسخ نفسه يبقى تقيل.`
          },
          teach: R`## المثال بيعمل إيه

٤ أجزاء: loop بيجمّد الصفحة ثانيتين (المشكلة)، وبعدين ٣ حلول: تقسيم الشغل لدفعات، و Web Worker على thread تاني، و [[requestAnimationFrame]] للتعديلات البصرية.

الكود ده للمتصفح: في Node بيقف عند سطر الـ Worker بـ [[ReferenceError: Worker is not defined]]. فشغّلناه في Chrome (headless، من صفحة على سيرفر محلي) ومعاه [[setInterval]] بيسجّل الوقت كل 100ms عشان نشوف الصفحة كانت شغالة ولا واقفة.

---

## ١. التجميد

~~~text app.js
const start = Date.now();
while (Date.now() - start < 2000) {}   // الصفحة متجمدة ثانيتين
~~~

- [[Date.now()]]: الوقت الحالي بالـ ms.
- [[while (شرط) {}]]: طول ما الشرط true، لف. والجسم [[{}]] فاضي: الـ loop مش بيعمل حاجة غير إنه يسأل «عدّت ثانيتين؟» ملايين المرات.

النتيجة: الـ main thread مشغول ثانيتين، فمفيش رسم ولا scroll ولا ضغط ولا timers. الـ [[setInterval]] اللي كان بيسجّل كل 100ms طلّع الأوقات دي (بالـ ms من فتح الصفحة):

~~~text الناتج (أول التسجيلات)
269, 383, 474, 2531, 2577, 2670, 2778, ...
~~~

كل 100ms تقريبًا، وبعدين **قفزة من 474 لـ 2531**: ٢ ثانية مفيش ولا تسجيل، لأن الـ timer مقدرش يشتغل والـ stack مشغول. وده بالظبط اللي اليوزر بيحسه: الصفحة «هنّجت».

المتصفح بيعتبر أي task أطول من 50ms **long task**. وفي DevTools، تاب Performance، هتشوفها مستطيل عليه مثلث أحمر (ده من الـ docs ومن التجربة اليدوية في الـ «جرّب»).

---

## ٢. الحل الأول: دفعات (chunking)

~~~text app.js
async function processInChunks(items, fn, size = 500) {
  for (let i = 0; i < items.length; i += size) {
    items.slice(i, i + size).forEach(fn);
    await (globalThis.scheduler?.yield?.() ?? new Promise((r) => setTimeout(r, 0)));
  }
}
~~~

- [[async function]]: عشان نقدر نستخدم [[await]] جواها.
- [[size = 500]]: قيمة افتراضية: ٥٠٠ عنصر في الدفعة.
- [[i += size]]: [[i]] بيقفز ٥٠٠ كل لفة: 0، 500، 1000...
- [[items.slice(i, i + size)]]: نسخة من العناصر من [[i]] لحد [[i + size]] (من غير الأخير). و [[.forEach(fn)]]: نادي fn على كل واحد.

### السطر المهم: [[await (...)]]

نفكّه من جوه لبرّه:

| الحتة | معناها |
|---|---|
| [[globalThis]] | الـ object الـ global في أي بيئة ([[window]] في المتصفح) |
| [[.scheduler?.]] | لو [[scheduler]] مش موجود، وقف ورجّع [[undefined]] من غير error |
| [[.yield?.()]] | لو [[yield]] موجودة نادِيها، ولو لأ [[undefined]] |
| [[??]] | لو اللي على الشمال [[undefined]] أو [[null]]، خد اللي على اليمين |
| [[new Promise((r) => setTimeout(r, 0))]] | Promise بيخلص بعد setTimeout 0 |

يعني: استخدم [[scheduler.yield()]] لو المتصفح فيه (Chrome فيه: جرّبنا [[typeof scheduler.yield]] وطلع [[function]])، وإلا setTimeout 0. الاتنين معناهم «سيب المتصفح يرسم ويرد على اليوزر، وبعدين كمّل».

في Node مفيش [[scheduler]] فبيستخدم setTimeout. جرّبناها على ٢٠٠٠ رقم بتتجمع، ومعاها [[setTimeout]] اتسجّل قبلها:

~~~text الناتج
timer اشتغل في النص، sum وقتها = 124750
خلص: 1999000
~~~

124750 = مجموع 0 لـ 499، يعني الـ timer لقى فرصة يشتغل **بعد أول دفعة** على طول، مش بعد ما الكل يخلص. وده نفس اللي بيحصل مع الضغطات والرسم في المتصفح.

---

## ٣. الحل التاني: Web Worker

~~~text app.js
const worker = new Worker(new URL("./sum.worker.js", import.meta.url), { type: "module" });
worker.postMessage({ n: 1e9 });
worker.onmessage = (e) => console.log("النتيجة:", e.data);
~~~

والملف التاني [[sum.worker.js]]:

~~~text sum.worker.js
self.onmessage = (e) => { let s = 0; for (let i = 0; i < e.data.n; i++) s += i; self.postMessage(s); };
~~~

- [[new Worker(url, { type: "module" })]]: بيشغّل ملف JS على **thread تاني**. والـ worker مالوش DOM ولا [[window]].
- [[new URL("./sum.worker.js", import.meta.url)]]: [[import.meta.url]] هو عنوان الملف الحالي، فالسطر ده بيقول «sum.worker.js اللي جنبي». (وده الشكل اللي Vite بيفهمه ويحزم الـ worker.)
- [[postMessage({ n: 1e9 })]]: بيبعت رسالة للـ worker. [[1e9]] = 1 × 10 أس 9 = مليار. والـ object **بيتنسخ** مش بيتشارك.
- جوه الـ worker: [[self]] هو الـ worker نفسه. لما رسالة توصل، [[e.data]] فيها الـ object، فبيجمع من 0 لمليار ويرجّع النتيجة بـ [[self.postMessage]].
- [[worker.onmessage]]: لما الرد يرجع، [[e.data]] فيها الرقم.

~~~text الناتج (Console في Chrome)
النتيجة: 499999999067109000
~~~

الحساب خد وقت طويل (بين ٤٠ و ٥٥ ثانية في Chrome headless على الجهاز ده في مرتين، و ٧ ثواني في Node لما جرّبنا نفس الـ loop)، **والصفحة كانت شغالة طول الوقت**: الـ setInterval سجّل 441 مرة، وأكبر فرق بين تسجيلين بعد التجميد الأولاني كان 115ms. ده الفرق كله: نفس الشغل التقيل، بس على thread تاني.

> ليه الرقم مش 499999999500000000 بالظبط (المجموع الصح)؟ لأن أي number في JavaScript بيتحفظ دقيق لحد [[Number.MAX_SAFE_INTEGER]] = 9007199254740991 بس، والمجموع عدّى ده بكتير، فالكسور الصغيرة ضاعت. للأرقام دي استخدم [[BigInt]].

---

## ٤. الحل التالت: [[requestAnimationFrame]]

~~~text app.js
requestAnimationFrame(() => { document.body.style.opacity = "0.9"; });
~~~

[[requestAnimationFrame(fn)]] (اختصارها rAF): «شغّل fn قبل ما ترسم الشاشة الجاية». الشاشة 60Hz بترسم كل حوالي 16ms، فأي تعديل بصري جوه rAF بيبقى متزامن مع الرسم ومش بيتعمل مرتين في نفس الـ frame. وبعد التشغيل قرينا [[document.body.style.opacity]] وطلع [[0.9]].

---

## ٥. scheduler.postTask و scheduler.yield (المتصفح)

الـ [[scheduler]] API في المتصفح بيدّيك تحكّم أدق من [[setTimeout]]: تحط task بأولوية، وتلغيها، وتعمل yield في نص شغل طويل. موجود في Chrome و Edge، ودعمه في Firefox و Safari بيختلف حسب النسخة (شوف جدول التوافق في MDN قبل ما تعتمد عليه، وخلي عندك fallback زي سطر الـ [[??]] فوق)، ومش موجود في Node. جرّبته في Chrome 156 (headless بـ playwright).

### [[scheduler.postTask(fn, options)]]: task بأولوية

~~~text index.html
scheduler.postTask(() => console.log("background"), { priority: "background" });
scheduler.postTask(() => console.log("user-visible (الافتراضي)"));
scheduler.postTask(() => console.log("user-blocking"), { priority: "user-blocking" });
setTimeout(() => console.log("setTimeout 0"), 0);
const ctrl = new TaskController({ priority: "background" });
scheduler.postTask(() => console.log("مش هتتطبع"), { signal: ctrl.signal }).catch((e) => console.log("اتلغت:", e.name));
ctrl.abort();
scheduler.postTask(() => 42, { delay: 50 }).then((v) => console.log("بعد delay:", v));
~~~

~~~text الناتج (Chrome 156)
اتلغت: AbortError
user-blocking
user-visible (الافتراضي)
setTimeout 0
background
بعد delay: 42
~~~

- [[priority]]: تلات مستويات: [["user-blocking"]] (حاجة اليوزر مستنيها حالًا، زي رد على ضغطة)، و [["user-visible"]] (الافتراضي)، و [["background"]] (لوج، أو analytics، أو prefetch). اتسجّلوا بالعكس وطلعوا بالأولوية.
- [[setTimeout 0]] جه بعد الـ user-visible وقبل الـ background: يعني الـ background بيستنى لحد ما مفيش حاجة أهم.
- [[postTask]] بترجّع Promise بقيمة الدالة ([[42]])، و [[delay]] بيأجّلها زي setTimeout.
- [[TaskController]]: زي [[AbortController]] بس بيقدر كمان يغيّر الأولوية ([[ctrl.setPriority("user-blocking")]]). والـ abort بيرفض الـ Promise بـ [[AbortError]].

### [[scheduler.yield()]]: استراحة في نص شغل طويل

ده اللي الـ chunking فوق بيستخدمه لو موجود. قارنته بـ [[setTimeout]]: نفس الشغل، ٢٠ دفعة كل واحدة 10ms، وقبل الشغل timer واحد:

~~~text الناتج (Chrome 156)
setTimeout : timer لقى فرصة بعد 10 ms
setTimeout : خلص في 267 ms
scheduler.yield : خلص في 200 ms
scheduler.yield : timer لقى فرصة بعد 201 ms
~~~

- بـ setTimeout الشغل خد 267ms مش 200: المتصفح بيخلّي أي setTimeout متداخل أكتر من ٥ مرات يستنى 4ms على الأقل، فالـ ٢٠ استراحة ضاعوا فيهم حوالي 67ms.
- بـ [[scheduler.yield()]] خلص في 200ms بالظبط: الكمّل بعد الـ yield بيدخل **قبل** الـ tasks العادية اللي بنفس الأولوية. عشان كده الـ timer استنى لآخر الشغل.
- بس الاستراحة حقيقية: المتصفح بيقدر يرسم ويرد على ضغطات اليوزر بين الدفعات (وده الهدف، عشان رقم INP يبقى كويس)، حسب وثائق Chrome. يعني [[yield]] «اسمح للأهم يعدّي وارجعلي على طول»، و setTimeout «حطني في آخر الطابور».

---

## الخلاصة

| المشكلة | الحل | إمتى |
|---|---|---|
| task واحدة طويلة | قسّمها دفعات و yield بينها | الشغل محتاج الـ DOM |
| حساب تقيل مستقل | Web Worker | صور، ملفات كبيرة، تشفير |
| تعديل بصري أو animation | [[requestAnimationFrame]] | أي حركة بـ JS |

والـ Promise لوحده **مش** thread: كود تقيل جوه Promise بيجمّد الصفحة برضه.`,
          lines: [
            R`بناخد الوقت الحالي بالملي ثانية عشان الـ loop اللي جاي يعرف عدّى قد إيه.`,
            R`loop فاضي بيفضل يسأل عن الوقت لحد ما ثانيتين يعدّوا. طول الوقت ده الـ main thread مشغول: المتصفح مبيرسمش، والضغطات والـ scroll بتستنى، والـ timers بتتأخر. ده بالظبط اللي بيحصل مع أي حسبة تقيلة متزامنة.`,
            R`الحل الأول: بدل ما نعالج array كبيرة مرة واحدة، نعالجها دفعات ([[size]] عنصر كل دفعة) ونريّح المتصفح بينهم. [[async]] عشان نقدر نستخدم [[await]] جواها.`,
            R`كل لفة بتنقل [[i]] بحجم دفعة كاملة: 0 و 500 و 1000 وهكذا.`,
            R`[[slice(i, i + size)]] بتاخد الدفعة الحالية بس (من غير ما تغيّر الأصل)، و [[forEach(fn)]] بتعالج كل عنصر فيها. الدفعة نفسها متزامنة، فخليها صغيرة كفاية إنها تخلص في ملي ثواني قليلة.`,
            R`بنوقف لحظة نرجّع فيها السيطرة للمتصفح يرسم ويرد على اليوزر قبل الدفعة الجاية. لو [[scheduler.yield]] موجود (Chrome و Edge) بنستخدمه، وإلا [[?.]] بترجّع [[undefined]] و [[??]] بتاخد البديل: Promise بتتحل بعد [[setTimeout(r, 0)]].`,
            R`نهاية الـ loop.`,
            R`نهاية [[processInChunks]].`,
            R`الحل التاني: Web Worker بيشغّل الملف [[sum.worker.js]] على thread تاني خالص، فالحسبة التقيلة مش بتلمس الـ main thread. [[new URL(..., import.meta.url)]] بتحسب مسار الملف بالنسبة للملف الحالي، و [[type: "module"]] عشان الـ worker يقدر يستخدم [[import]].`,
            R`بنبعت الشغل للـ worker كرسالة. الـ data بتتنسخ (structured clone)، فالـ worker مش بيشوف متغيرات الصفحة، ومينفعش يلمس الـ DOM.`,
            R`لما الـ worker يخلص ويعمل [[postMessage]]، الدالة دي بتتنادى والنتيجة في [[e.data]]. وطول ما هو بيحسب، الصفحة بتستجيب عادي.`,
            R`[[requestAnimationFrame]] بتأجّل الدالة لحد قبل الرسمة الجاية بالظبط، فالتغيير يترسم مع الـ frame اللي جاي. ده المكان الصح للتعديلات البصرية والـ animations، بدل [[setTimeout]] اللي توقيته مش متزامن مع الرسم.`,
          ],
          sol: R`وانت مستني الـ ٢ ثانية: الـ scroll مبيتحركش، والضغط على أي زرار مبيعملش حاجة، وحتى الـ hover. أول ما الـ loop تخلص كل اللي ضغطته بيتنفذ مرة واحدة، لأن الأحداث كانت واقفة في الطابور. الـ main thread مشغول، ومفيش حد يرسم أو يرد.

في تاب Performance هتلاقي مستطيل طويل في الـ Main track عليه مثلث أحمر في الركن مكتوب [[Task]] بطول حوالي 2000ms، ولو عدّيت عليه هيقولك إنه long task (أي task أطول من 50ms). ده اللي بيبوّظ INP. لو ملقتهوش، اتأكد إنك دوست Record قبل ما تشغّل الكود ووقفت بعده.`
        }
      ]
    },
    {
      t: "الأداء والذاكرة",
      l: 3,
      n: "debounce و throttle للأحداث الكتير، والـ memory leaks وإزاي تمنعها",
      projects: [
        { lvl: 'صغير', t: R`بحث بـ debounce وعدّاد`, what: R`input بحث على لستة ١٠٠٠ اسم محلية، والفلترة بـ debounce 300ms، وجنبه عدّاد «اتنفّذ كام مرة» وعدّاد «اتكتب كام حرف». من درس debounce و throttle.`, done: R`كتابة كلمة ١٠ حروف بسرعة ← الحروف ١٠ والتنفيذ ١، والنتايج بتظهر بعد ما تقف بحوالي 300ms، ومسح الـ input بيرجّع اللستة كاملة.` },
        { lvl: 'صغير', t: R`زرار ميتداسش مرتين`, what: R`زرار «ادفع» بيبعت طلب وهمي بياخد ثانيتين. امنع التكرار مرة بـ throttle ومرة بـ [[disabled]] لحد ما الطلب يخلص، وقارن. من درس debounce و throttle ووحدة async.`, done: R`٥ ضغطات ورا بعض ← طلب واحد في الطريقتين. بس لو الطلب أخد أطول من فترة الـ throttle، الـ throttle بيسمح بطلب تاني والـ disabled لأ، وكاتب ده في تعليق جنب الكود.` },
        { lvl: 'متوسط', t: R`بحث حي كامل`, what: R`input بيبحث في API بـ debounce 300ms، و AbortController للطلب القديم، و cache بـ LRU حده ٥٠ عشان نفس الكلمة متتطلبش تاني، و «بيحمّل» و «مفيش نتايج» ورسالة غلط. من دروس الوحدة ووحدة async.`, done: R`نفس الكلمة مرتين ← طلب واحد في Network. كتابة سريعة ← طلب واحد بعد ما تقف. حجم الـ cache مبيعدّيش ٥٠ بعد ١٠٠ كلمة مختلفة. والـ AbortError مبيظهرش كرسالة.` },
        { lvl: 'متوسط', t: R`شريط تقدم القراية وزرار لفوق`, what: R`صفحة مقال طويل فوقها شريط بيوضح نسبة القراية، وزرار «لفوق» بيظهر بعد نص الصفحة. الـ scroll handler بـ throttle trailing (من تحدي الدرس) و [[{ passive: true }]]. من درس debounce و throttle.`, done: R`الـ handler بيتنفّذ أقل بكتير من عدد أحداث scroll (عدّادين في الـ console). لما توصل لآخر الصفحة الشريط بيقف على 100% بالظبط (ده اللي الـ throttle العادي بيفوّته). والزرار بيظهر ويختفي صح.` },
        { lvl: 'كبير', t: R`dashboard عايش طول اليوم`, what: R`صفحة فيها widgets بتتفتح وتتقفل (ساعة، وطقس وهمي بـ polling كل ٥ ثواني، وعدّاد كتابة). كل widget عنده [[mount()]] بيرجّع [[unmount]] بيشيل كل listener (AbortController) وكل interval ويلغي أي fetch شغال، والـ fetch بيعمل retry بـ backoff لو فشل، و cache الطقس LRU حده ٢٠، وكل mount و unmount بيتسجّل في لوج صغير على الصفحة. من الوحدة دي ووحدات async والأخطاء والـ DOM والـ closures.`, done: R`افتح وقفل كل widget ٥٠ مرة، وبعدين Heap snapshot Comparison: مفيش زيادة ثابتة ولا Detached elements بتزيد. [[getEventListeners(window)]] بعد ما الكل يتقفل مفيهوش listeners بتاعتك. مفيش طلب polling في Network بعد unmount. والنت المقطوع بيعمل retry وبعدين رسالة، مش loop لا نهائي.`, ext: R`خلّي الـ polling يقف لوحده لما التاب يتخبّى (درس visibilitychange في وحدة APIs المتصفح)، وزوّد صفحة «صحة» بتعرض عدد الـ listeners والـ intervals الشغالة دلوقتي.` },
        { lvl: 'فكرة', t: R`قيس وصلّح صفحة بطيئة`, what: R`خد صفحة من مشاريعك فيها input أو scroll أو resize، وقيس عدد مرات تنفيذ الـ handlers والذاكرة بعد استخدام طويل، وصلّح أكبر مشكلة بـ debounce أو throttle أو cleanup.`, done: R`عندك رقمين قبل وبعد (عدد التنفيذات في ١٠ ثواني، أو حجم الـ heap بعد ٢٠ مرة)، والتصليح مبيغيّرش شكل الصفحة ولا سلوكها.`, ext: R`اكتب الأرقام في README المشروع مع screenshots من DevTools، عشان تبقى قصة تحكيها في انترفيو.` },
      ],
      items: [
        {
          cmd: "debounce و throttle",
          title: "تقلل عدد مرات تنفيذ دالة بتتنادي كتير",
          desc: R`أحداث زي [[input]] و [[scroll]] و [[resize]] بتتنادي عشرات المرات في الثانية. لو كل مرة بتبعت request أو تحسب layout، الصفحة هتتقل والسيرفر هيتضرب.

debounce: استنى لحد ما الأحداث تقف فترة (مثلًا 300ms بعد آخر حرف)، ونفّذ مرة واحدة. مثالي للبحث وأنت بتكتب وحفظ الـ drafts.

throttle: نفّذ مرة واحدة بالكتير كل فترة (مثلًا كل 200ms)، مهما الحدث اتكرر. مثالي للـ scroll والـ resize وتتبّع الماوس.`,
          example: R`function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}
function throttle(fn, ms) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last < ms) return;
    last = now;
    fn.apply(this, args);
  };
}
const input = document.querySelector("#search");
const search = debounce((q) => console.log("ابحث عن", q), 300);
input.addEventListener("input", (e) => search(e.target.value));
window.addEventListener("scroll", throttle(() => console.log(scrollY), 200), { passive: true });`,
          try: R`حط counter بيعد مرات تنفيذ الـ callback الأصلي، واكتب كلمة ١٠ حروف بسرعة: من غير debounce ١٠ مرات، ومعاه مرة. وبعدين ضيف لـ debounce method اسمها [[cancel]] بتلغي الـ timer. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات مش بتستنى وقت حقيقي، بتبعت ساعة وهمية كـ argument تالت [[clock]] فيها [[setTimeout]] و [[clearTimeout]]، فاستخدم [[clock.setTimeout]] و [[clock.clearTimeout]]، وضيف [[cancel]].`,
          practice: [
            { lvl: 'سريع', t: R`اقرا وتوقّع: في Node انسخ [[debounce]] من الدرس، واعمل [[const s = debounce((q) => console.log("ابحث عن", q), 100)]]، ونادي [[s(1)]] لحد [[s(5)]] في loop ورا بعض. كام سطر هيطبع وفيه إيه؟`, done: R`سطر واحد بس بعد حوالي 100ms: [[ابحث عن 5]]، آخر قيمة، والأربعة اللي قبلها اتلغوا.` },
            { lvl: 'تطبيق', t: R`ابني autosave: [[<textarea>]] بيبعت النص لـ [[saveDraft(text)]] وهمية (بتطبع وتزوّد عدّاد في الصفحة) بعد ثانية من آخر حرف بـ debounce، وجنبه «اتحفظ الساعة ...» بـ [[toLocaleTimeString]].`, done: R`وانت بتكتب مفيش ولا حفظ، وبعد ما تقف بثانية العدّاد بيزيد ١ والنص المحفوظ هو كل اللي كتبته لحد آخر حرف. ولو استخدمت arrow function كـ fn وجواها [[this]]، تعرف ليه الدرس كاتب [[fn.apply(this, args)]].` },
            { lvl: 'تحدي', t: R`مسألة واكتب اختبار: الـ throttle اللي في الدرس leading بس، فآخر نداء في الفترة بيضيع (آخر مكان scroll مش بيتحسب). اكتب نسخة trailing: لو فيه نداء اتمنع، يتنفّذ في آخر الفترة بآخر arguments. واختبرها بنداءات في 0 و 50 و 100 و 150ms بـ throttle 200ms.`, done: R`النسخة القديمة بتنفّذ مرة واحدة بالـ argument الأول بس. الجديدة بتنفّذ مرتين: فورًا بالأول، وبعد حوالي 200ms بالرابع (الأخير)، ومفيش تنفيذ تالت.` },
          ],
          flag: "script",
          deep: {
            why: "بحث بيبعت request مع كل حرف = ١٠ requests لكلمة واحدة، والردود ممكن توصل بترتيب غلط. و scroll handler تقيل = scroll بيقطّع. والاتنين من أشهر أسئلة انترفيو الفرونت: «اكتب debounce بإيدك».",
            how: R`debounce مبني على closure: [[timer]] متغير عايش بين النداءات. كل نداء بيلغي الـ timer القديم ويبدأ واحد جديد، فالتنفيذ الفعلي بيحصل بس لما يعدّي ms من غير نداء جديد. الشكل ده اسمه trailing (في الآخر). فيه نسخة leading بتنفّذ أول نداء على طول وتتجاهل الباقي لحد ما يهدى.

throttle بيحفظ وقت آخر تنفيذ، ويتجاهل أي نداء قبل ما الفترة تعدّي. النسخة البسيطة دي ممكن تضيّع آخر نداء، والنسخ الكاملة (lodash) بتضمن تنفيذ أخير في الآخر.

[[function (...args)]] مش arrow، و [[fn.apply(this, args)]]، عشان لو الدالة المتغلفة method محتاجة this، تفضل شغالة.

للـ scroll والـ animation، [[requestAnimationFrame]] كـ throttle طبيعي (مرة لكل frame) غالبًا أحسن. وللبحث: debounce + AbortController (درس fetch) عشان الرد القديم ميكتبش فوق الجديد.

في React لازم الدالة الـ debounced تتعمل مرة واحدة ([[useMemo]] أو [[useRef]])، وإلا كل render بيعمل واحدة جديدة بـ timer جديد.`,
            when: "debounce: بحث، و autosave، و validation وانت بتكتب، و resize نهائي. throttle: scroll، و mousemove، و infinite scroll، و analytics events.",
            mistakes: R`تعمل debounce جوه الـ handler نفسه ([[input.oninput = () => debounce(fn, 300)()]]) فكل مرة timer جديد ومفيش حاجة بتتلغي. وتنسى this و args. و debounce للزرار «ادفع»: الأحسن تعطّل الزرار. وفي الانترفيو: «الفرق بين debounce و throttle؟» بمثال لكل واحد.`
          },
          teach: R`## المثال بيعمل إيه

بيكتب دالتين «بتغلّف» أي دالة تانية وترجّع نسخة منها بتتنفّذ مرات أقل: [[debounce]] (نفّذ مرة بعد ما الحدث يهدى) و [[throttle]] (نفّذ مرة بالكتير كل فترة). وبعدين بيربطهم بخانة بحث وبالـ scroll.

الكود فيه [[document]] و [[window]]، فده للمتصفح. شغّلناه في Chrome (headless) على صفحة فيها [[<input id="search">]]، وكتبنا فيها وعملنا scroll أوتوماتيك.

> المربع اللي تحت الدرس بيطلب نسخة من [[debounce]] بساعة وهمية و [[cancel]]. الشرح هنا للمثال والفكرة، والحل عليك.

---

## ١. [[debounce]] سطر سطر

~~~text app.js
function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}
~~~

- **[[debounce(fn, ms)]]**: بتاخد الدالة الأصلية والمدة، و**بترجّع دالة جديدة**. الدالة اللي بترجّع دالة اسمها higher-order function.
- **[[let timer;]]**: متغير برّه الدالة اللي راجعة. كل مرة تنادي النسخة الجديدة، بتشوف **نفس** [[timer]]. ده اسمه **closure**: الدالة الداخلية فاكرة المتغيرات اللي اتعملت حواليها حتى بعد ما [[debounce]] نفسها خلصت.
- **[[function (...args)]]**: [[...args]] (rest) بتلم أي arguments تتبعت في array. وهي [[function]] عادية مش arrow عشان يبقى ليها [[this]] بتاعها (تحت).
- **[[clearTimeout(timer)]]**: الغي الـ timer اللي فات لو لسه مستني. (أول مرة [[timer]] = [[undefined]] و [[clearTimeout(undefined)]] مبتعملش حاجة.)
- **[[timer = setTimeout(..., ms)]]**: ابدأ timer جديد واحفظ رقمه. [[setTimeout]] بترجّع رقم (id) بيتلغي بيه.
- **[[fn.apply(this, args)]]**: نادي الدالة الأصلية، و [[apply]] بتسمح تحدد [[this]] وتبعت الـ arguments كـ array. والـ arrow [[() => ...]] حواليها مالهاش [[this]] خاص، فبتاخد [[this]] بتاع الـ function الخارجية.

يعني كل نداء بيأجّل التنفيذ ms من جديد. التنفيذ بيحصل بس لما يعدّي ms **من غير** نداء جديد:

~~~text نداءات كل 50ms و ms = 300
j     ja    jav   ...   javascript   (هدوء 300ms)   ← fn("javascript")
  ↑ كل نداء بيلغي الـ timer اللي قبله
~~~

---

## ٢. [[throttle]] سطر سطر

~~~text app.js
function throttle(fn, ms) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last < ms) return;
    last = now;
    fn.apply(this, args);
  };
}
~~~

- [[last]]: وقت آخر تنفيذ (في الـ closure برضه). بيبدأ 0، فأول نداء دايمًا بيعدّي.
- [[now - last < ms]]: لسه معدّاش ms من آخر تنفيذ؟ [[return]]: تجاهل النداء ده خالص.
- غير كده: سجّل الوقت ونفّذ على طول.

الفرق: debounce بيستنى الهدوء ويتنفّذ **في الآخر**. throttle بيتنفّذ **على طول** وبعدين يقفل الباب ms.

---

## ٣. الربط بالصفحة

~~~text app.js
const input = document.querySelector("#search");
const search = debounce((q) => console.log("ابحث عن", q), 300);
input.addEventListener("input", (e) => search(e.target.value));
window.addEventListener("scroll", throttle(() => console.log(scrollY), 200), { passive: true });
~~~

- [[document.querySelector("#search")]]: العنصر اللي [[id]] بتاعه search.
- [[search]]: النسخة الـ debounced **اتعملت مرة واحدة** برّه الـ listener. ده أهم سطر: لو عملتها جوه الـ listener، كل حرف هيعمل closure جديد بـ [[timer]] جديد، ومفيش حاجة هتتلغي.
- حدث [[input]]: بيحصل مع كل تغيير في الخانة، و [[e.target.value]] النص اللي فيها.
- [[scrollY]]: المسافة اللي اتعمل لها scroll من فوق بالـ pixels.
- [[{ passive: true }]]: وعد للمتصفح إن الـ listener مش هيعمل [[preventDefault()]]. في الـ scroll ملوش تأثير فعلي (الحدث ده مبيتلغيش أصلًا)، فايدته الحقيقية مع [[wheel]] و [[touchmove]].

### اللي حصل في Chrome

كتبنا [["javascript"]] حرف حرف، بين كل حرف والتاني 50ms، يعني ١٠ أحداث [[input]]:

~~~text الناتج (Console)
ابحث عن javascript
~~~

**مرة واحدة**، بالكلمة كاملة، بعد 300ms من آخر حرف.

وبعدين عملنا ٢٠ scroll، كل واحد 100px وبينهم حوالي 30ms:

~~~text الناتج (Console)
100
700
1300
1900
~~~

٤ مرات بس من ٢٠ حدث: كل 200ms مرة. ولاحظ إن الصفحة وصلت 2000 بس آخر رقم اتطبع 1900: النسخة البسيطة دي ممكن **تضيّع آخر نداء** لو جه جوه الـ 200ms. النسخ الكاملة (زي lodash) بتنفّذ مرة أخيرة في الآخر.

---

## ٤. العدّاد (من الحل)

الحل بيعمل loop بيبعت الـ ١٠ حروف لنسخة debounced كل 50ms، ويعدّ مرتين: كام مرة الحدث حصل ([[raw]])، وكام مرة الدالة الأصلية اتنفّذت فعلًا ([[calls]]). اتشغّل في Node 24:

~~~text الناتج
ابحث عن javascript
{ raw: 10, calls: 1 }
~~~

١٠ أحداث، تنفيذ واحد.

---

## الخلاصة

| | debounce | throttle |
|---|---|---|
| بيتنفّذ إمتى | بعد ما النداءات تقف ms | أول نداء، وبعدين مرة كل ms بالكتير |
| بيفتكر إيه في الـ closure | [[timer]] | [[last]] |
| أمثلة | بحث وانت بتكتب، autosave | scroll، resize، mousemove |

والنسخة الملفوفة تتعمل **مرة واحدة** برّه الـ handler، و [[fn.apply(this, args)]] عشان [[this]] والـ arguments يوصلوا زي ما هم.`,
          lines: [
            R`بتاخد الدالة الأصلية ([[fn]]) والمدة بالملي ثانية، وترجّع نسخة منها مبتشتغلش غير لما النداءات تبطّل لمدة [[ms]].`,
            R`[[timer]] برّه الدالة اللي هترجع، فهو في الـ closure ومشترك بين كل نداءاتها. ده اللي بيخليها تفتكر الـ timer اللي فات عشان تلغيه.`,
            R`بترجّع دالة جديدة بتاخد أي arguments في [[args]]. اتكتبت بـ [[function]] مش arrow عشان [[this]] بتاعتها تبقى بتاعة اللي ناداها (زي العنصر في event handler عادي)، ونعدّيها لـ [[fn]].`,
            R`كل نداء جديد بيلغي الـ timer اللي فات، فالتنفيذ اللي كان مستني مبيحصلش. أول مرة [[timer]] بـ [[undefined]]، و [[clearTimeout(undefined)]] مبتعملش حاجة.`,
            R`بيبدأ timer جديد، و [[fn]] هتتنادى بس لو عدّت [[ms]] من غير نداء تاني. الـ arrow جوه بتاخد [[this]] من الدالة اللي فوقها، و [[apply]] بتنادي [[fn]] بنفس [[this]] وبالـ arguments بتاعة **آخر** نداء.`,
            R`نهاية الدالة اللي راجعة.`,
            R`نهاية [[debounce]].`,
            R`العكس تقريبًا: بدل ما تستنى لحد ما النداءات تبطّل، بتنفّذ مرة كل [[ms]] بالكتير وتتجاهل اللي بينهم.`,
            R`وقت آخر تنفيذ، في الـ closure برضه. بادئ بـ 0 فأول نداء دايمًا بيتنفّذ.`,
            R`الدالة الجديدة اللي هتتنادى مكان الأصلية، بـ [[function]] عشان [[this]] زي ما في debounce.`,
            R`الوقت الحالي بالملي ثانية عشان نقارنه بآخر تنفيذ.`,
            R`لو لسه معدّاش [[ms]] من آخر تنفيذ، بنخرج من غير ما نعمل حاجة. النداء ده بيضيع خالص (مش بيتأجّل)، فآخر نداء في السلسلة ممكن ميتنفّذش.`,
            R`بنسجّل إن فيه تنفيذ حصل دلوقتي، فأي نداء في الـ [[ms]] الجاية هيتجاهل.`,
            R`بننادي الأصلية فورًا بنفس [[this]] ونفس الـ arguments.`,
            R`نهاية الدالة اللي راجعة.`,
            R`نهاية [[throttle]].`,
            R`بنجيب خانة البحث من الصفحة عشان نسمع لكتابة اليوزر فيها.`,
            R`بنعمل نسخة debounced من البحث **مرة واحدة** برّه الـ handler. لو عملناها جوه الـ handler كل حرف هيعمل debounce جديد بـ [[timer]] جديد، فمفيش حاجة هتتلغي وكل حرف هيبحث.`,
            R`كل حرف بيطلق [[input]] وينادي [[search]] بالنص الحالي، بس البحث الحقيقي بيحصل مرة واحدة بعد 300ms من آخر حرف. فكتابة [["laptop"]] بسرعة بتعمل بحث واحد بدل 6.`,
            R`الـ scroll ممكن يطلق event عشرات المرات في الثانية، فالـ throttle بيخلي الدالة تشتغل مرة كل 200ms بالكتير. و [[passive: true]] بيقول للمتصفح إنك مش هتعمل [[preventDefault]]؛ مع [[scroll]] ملوش تأثير فعلي لأن الـ event ده مش cancelable أصلًا، وفايدته الحقيقية مع [[wheel]] و [[touchstart]] و [[touchmove]].`,
          ],
          sol: R`مع ١٠ حروف بسرعة: الـ counter بتاع الـ callback الأصلي بيعد 10، ونسخة debounce بتعد 1 بآخر قيمة ([["javascript"]] كاملة) بعد 300ms من آخر حرف. لو بتكتب ببطء (أكتر من 300ms بين الحروف) هتلاقيها اشتغلت أكتر من مرة، وده صح.

[[cancel]] بتعمل [[clearTimeout(timer)]]، فلو ناديت [[search("x")]] وبعدين [[search.cancel()]] على طول، الـ callback مش هيشتغل خالص. مفيدة لما الـ component يتشال أو اليوزر يمسح الـ input. الغلطة الشائعة إنك تعمل debounce جوه الـ listener نفسه ([[input.addEventListener("input", (e) => debounce(fn, 300)(e.target.value))]]): كده بتعمل timer جديد في كل حرف، فمفيش debounce خالص.`,
          solCode: R`function debounce(fn, ms) {
  let timer;
  function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  }
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}
let raw = 0, calls = 0;
const search = debounce((q) => { calls++; console.log("ابحث عن", q); }, 300);
const word = "javascript";
for (let i = 1; i <= word.length; i++) {
  raw++;
  search(word.slice(0, i));
  await new Promise((r) => setTimeout(r, 50));
}
await new Promise((r) => setTimeout(r, 400));
console.log({ raw, calls }); // { raw: 10, calls: 1 }`,
          check: {
            lang: "js",
            starter: R`function debounce(fn, ms, clock = globalThis) {
  let timer;
  function debounced(...args) {
    // clock.clearTimeout(timer) وبعدين timer = clock.setTimeout(...)
  }
  debounced.cancel = () => {};
  return debounced;
}`,
            tests: R`function fakeClock() {
  let now = 0, id = 0;
  const timers = new Map();
  return {
    setTimeout(f, ms) { timers.set(++id, { at: now + ms, f }); return id; },
    clearTimeout(t) { timers.delete(t); },
    tick(ms) {
      now += ms;
      for (const [t, { at, f }] of [...timers].sort((a, b) => a[1].at - b[1].at)) if (at <= now) { timers.delete(t); f(); }
    }
  };
}
test("10 نداءات ورا بعض ← الـ fn بتتنادي مرة واحدة بآخر قيمة", () => {
  const clock = fakeClock(), got = [];
  const search = debounce((q) => got.push(q), 300, clock);
  const word = "javascript";
  for (let i = 1; i <= word.length; i++) { search(word.slice(0, i)); clock.tick(50); }
  clock.tick(300);
  expect(got).toEqual(["javascript"]);
});
test("قبل ما الـ ms تخلص مفيش نداء", () => {
  const clock = fakeClock();
  let calls = 0;
  const f = debounce(() => calls++, 300, clock);
  f();
  clock.tick(299);
  expect(calls).toBe(0);
  clock.tick(1);
  expect(calls).toBe(1);
});
test("نداءين بينهم أكتر من ms ← مرتين", () => {
  const clock = fakeClock();
  let calls = 0;
  const f = debounce(() => calls++, 100, clock);
  f(); clock.tick(150); f(); clock.tick(150);
  expect(calls).toBe(2);
});
test("cancel بتلغي النداء اللي مستني", () => {
  const clock = fakeClock();
  let calls = 0;
  const f = debounce(() => calls++, 100, clock);
  f("x"); f.cancel(); clock.tick(500);
  expect(calls).toBe(0);
});
test("بتعدّي الـ arguments و this", () => {
  const clock = fakeClock();
  const obj = { name: "Sara", hi: debounce(function (g) { obj.out = g + " " + this.name; }, 10, clock) };
  obj.hi("Hi"); clock.tick(10);
  expect(obj.out).toBe("Hi Sara");
});`,
            solution: R`function debounce(fn, ms, clock = globalThis) {
  let timer;
  function debounced(...args) {
    clock.clearTimeout(timer);
    timer = clock.setTimeout(() => fn.apply(this, args), ms);
  }
  debounced.cancel = () => clock.clearTimeout(timer);
  return debounced;
}`
          }
        },
        {
          cmd: "memory leaks",
          title: "الذاكرة بتكبر ومبتنزلش: إيه اللي بيمسكها؟",
          desc: R`JS فيه garbage collector: أي object محدش يقدر يوصله (من الـ globals أو الـ stack أو closures عايشة) بيتمسح لوحده. الـ memory leak معناه إنك سايب reference لحاجة مش محتاجها، فمبتتمسحش.

أشهر الأسباب: event listeners متشالتش، و setInterval متوقفش، و cache أو Map بيكبر للأبد، و closures شايلة objects ضخمة، وعناصر DOM اتشالت من الصفحة بس لسه في متغير.

الحلول: شيل اللي ضفته (cleanup)، و [[AbortController]] لـ listeners كتير مرة واحدة، و [[WeakMap]] لداتا مربوطة بـ objects، وحد أقصى لأي cache.`,
          example: R`const cache = new Map();
function remember(key, value) { cache.set(key, value); }  // بيكبر للأبد: حط حد أقصى
const meta = new WeakMap();
function tag(el, info) { meta.set(el, info); }            // لما el يتمسح، info تتمسح معاه
function startPolling() {
  const id = setInterval(() => fetch("/api/ping"), 5000);
  return () => clearInterval(id);
}
const stopPolling = startPolling();
stopPolling();
const controller = new AbortController();
window.addEventListener("resize", () => console.log(innerWidth), { signal: controller.signal });
document.addEventListener("keydown", (e) => console.log(e.key), { signal: controller.signal });
controller.abort();`,
          try: R`في DevTools افتح Memory، وخد Heap snapshot، واعمل حاجة في الصفحة ١٠ مرات (افتح وقفل modal)، وخد snapshot تاني، واختار «Comparison». لو فيه objects بتزيد مع كل مرة ومبتقلش، عندك leak. دوّر على «Detached» عشان عناصر DOM اتشالت ولسه ممسوكة.`,
          practice: [
            { lvl: 'سريع', t: R`قيس: شغّل [[node --expose-gc]] واطبع [[process.memoryUsage().heapUsed]] بالـ MB قبل ما تملا array بمليون object، وبعد، وبعد [[arr = null]] و [[gc()]]. وبعدين كرّر بس احفظ [[globalThis.keep = arr]] قبل الـ null.`, done: R`الرقم بيزيد عشرات الـ MB بعد الملا، ويرجع قريب من الأول بعد null و gc. ومع [[globalThis.keep]] مبينزلش: لسه فيه reference عايش، وده الـ leak بالظبط. اكتب الـ ٣ أرقام في كل مرة.` },
            { lvl: 'تطبيق', t: R`محاكاة cache: [[class LRU]] بحد أقصى: [[get]] بترجّع القيمة وتخليها «الأحدث»، و [[set]] لو الحجم عدّى الحد تمسح الأقدم. استخدم إن [[Map]] بيحفظ ترتيب الإضافة: [[map.keys().next().value]] هو الأقدم.`, done: R`[[new LRU(2)]]، و [[set("a", 1)]] و [[set("b", 2)]] و [[get("a")]] و [[set("c", 3)]]: المفاتيح الباقية [[a]] و [[c]] (اتمسح b لأنه الأقدم استخدامًا)، و [[get("zz")]] بترجّع undefined من غير ما تضيف حاجة، والحجم عمره ما بيعدّي 2 حتى بعد ألف set.` },
            { lvl: 'تحدي', t: R`صلّح الكود البايظ: widget فيه [[mount()]] بيعمل [[addEventListener("resize", ...)]] و [[addEventListener("keydown", ...)]] و [[setInterval]] كل ثانية، و [[unmount()]] بيشيل العنصر من الصفحة بس. اعمل mount و unmount ١٠٠ مرة، وبعدين صلّحه بـ [[AbortController]] و [[clearInterval]] واعمل نفس الحكاية.`, done: R`قبل التصليح [[getEventListeners(window).resize.length]] في Console بتاع Chrome بيدّي [[100]] و ١٠٠ interval شغالين. بعد التصليح ومعاهم mount أخيرة، بيدّي [[1]] وفيه interval واحد بس بيطبع. وفي Memory، snapshot قبل وبعد الـ ١٠٠ مرة مفيهوش زيادة ثابتة.` },
          ],
          flag: "script",
          deep: {
            why: "في SPA الصفحة مبتعملش reload بالساعات، فأي leak صغير في كل navigation بيتراكم لحد ما التاب يتقل أو يقع. وفي Node، leak في سيرفر شغال أسابيع بيوصل لـ «JavaScript heap out of memory» (تاب «Node و npm»: الذاكرة).",
            how: R`الـ GC في V8 بيستخدم mark-and-sweep: بيبدأ من الـ roots (الـ globals والـ stack) ويعلّم كل حاجة يقدر يوصلها، والباقي يتمسح. فالـ references الدائرية (a بيشاور على b و b على a) مش مشكلة لو محدش من برّه بيوصلهم. المشكلة دايمًا reference من حاجة عايشة.

الـ listener على [[window]] أو [[document]] عايش طول الصفحة، والـ callback بتاعه closure شايل كل اللي حواليه. لو الـ component اتشال ومشلتش الـ listener، الـ component وكل داتته لسه ممسوكين. ده سبب cleanup function في useEffect (تاب React).

[[setInterval]] نفس الفكرة: المتصفح شايل الـ callback لحد clearInterval.

[[WeakMap]] مفاتيحها objects ومبتمنعش الـ GC يمسحها. لما المفتاح يتمسح، الـ entry كلها بتختفي. عشان كده مفيهاش size ولا تقدر تلف عليها. و [[WeakRef]] و [[FinalizationRegistry]] موجودين بس نادرًا بتحتاجهم ومش مضمون إمتى بيشتغلوا.

[[{ signal }]] في addEventListener: أول ما تعمل [[abort()]] كل الـ listeners اللي بنفس الـ signal بتتشال مرة واحدة.`,
            when: R`اسأل نفسك مع كل [[addEventListener]] و [[setInterval]] و [[subscribe]] و [[new WebSocket]]: «مين هيقفل ده وإمتى؟». و WeakMap لما تربط داتا بعناصر DOM أو objects مش بتاعتك.`,
            mistakes: R`useEffect بيضيف listener أو interval من غير return cleanup. و cache global في سيرفر Node بمفاتيح من الـ requests من غير حد. و [[console.log]] لـ objects كبيرة في الإنتاج (DevTools بيمسكها). وفي الانترفيو: «إيه أسباب الـ memory leak في JS وإزاي تلاقيها؟».`
          },
          teach: R`## الفكرة

الـ **garbage collector** (GC، «جامع الزبالة») بيمسح أي object محدش يقدر يوصله. فالـ leak مش «نسيت تمسح»، الـ leak إن **فيه حاجة لسه ماسكة** reference لحاجة مش محتاجها. والمثال ٤ أجزاء، كل جزء مصدر leak مشهور وعلاجه. الكود للمتصفح، فشغّلناه في Chrome (headless) على صفحة محلية.

---

## ١. [[Map]] بتكبر للأبد

~~~text app.js
const cache = new Map();
function remember(key, value) { cache.set(key, value); }  // بيكبر للأبد: حط حد أقصى
~~~

[[Map]] بتحتفظ بكل key و value اتحطوا فيها لحد ما تمسحهم بإيدك ([[delete]] أو [[clear]]). و [[cache]] هنا [[const]] على مستوى الملف، يعني عايشة طول عمر الصفحة (أو السيرفر). فلو بتحط فيها حاجة مع كل request أو كل صفحة، الذاكرة بتزيد ومبتنزلش. العلاج: حد أقصى (لو [[cache.size]] عدّى رقم، امسح أقدم واحد)، أو مكتبة LRU cache.

---

## ٢. [[WeakMap]]: داتا مربوطة بـ object

~~~text app.js
const meta = new WeakMap();
function tag(el, info) { meta.set(el, info); }            // لما el يتمسح، info تتمسح معاه
~~~

[[WeakMap]] زي Map بفرق واحد: الـ key **مش بيمنع** الـ GC يمسح الـ object. فلو [[el]] (عنصر في الصفحة مثلًا) اتشال ومبقاش فيه حد ماسكه، الـ GC بيمسحه، والـ entry بتاعته في [[meta]] بتختفي معاه، و [[info]] كمان.

وده ليه تمن:

- الـ key لازم يبقى object: [[meta.set("x", 1)]] بترمي [[TypeError: Invalid value used as weak map key]].
- مفيش [[size]] ولا تقدر تلف عليها: جرّبنا [[meta.size]] وطلع [[undefined]]. منطقي: عدد العناصر بيتغير لوحده لما الـ GC يشتغل.

---

## ٣. [[setInterval]] من غير إيقاف

~~~text app.js
function startPolling() {
  const id = setInterval(() => fetch("/api/ping"), 5000);
  return () => clearInterval(id);
}
const stopPolling = startPolling();
stopPolling();
~~~

- [[setInterval(fn, 5000)]]: نادي fn كل 5 ثواني **للأبد**، وبترجّع رقم ([[id]]).
- المتصفح شايل الـ callback ده (وكل اللي الـ closure بتاعه ماسكه) لحد ما حد ينادي [[clearInterval(id)]].
- [[return () => clearInterval(id)]]: الدالة بترجّع **دالة إيقاف**. فاللي بيبدأ الحاجة بياخد في إيده طريقة قفلها. وده نفس شكل الـ cleanup في [[useEffect]] في React.

في Chrome جرّبنا نسخة من غير ما نوقّفها ١١ ثانية: السيرفر استقبل [[/api/ping]] مرتين (عند 5 و 10 ثواني). ومع [[stopPolling()]] على طول زي المثال: صفر طلبات.

---

## ٤. listeners كتير، سطر واحد يشيلهم: [[AbortController]]

~~~text app.js
const controller = new AbortController();
window.addEventListener("resize", () => console.log(innerWidth), { signal: controller.signal });
document.addEventListener("keydown", (e) => console.log(e.key), { signal: controller.signal });
controller.abort();
~~~

- [[AbortController]]: object بيدّيك [[signal]] (إشارة) و [[abort()]] (اقفل). نفس اللي بتلغي بيه fetch.
- [[addEventListener(event, fn, { signal })]]: الـ listener **مربوط** بالإشارة. أول ما تعمل [[abort()]]، كل الـ listeners اللي واخدين نفس الـ signal بيتشالوا مرة واحدة.
- ليه ده مهم؟ الـ listener على [[window]] أو [[document]] عايش طول عمر الصفحة، والـ arrow function بتاعه closure ماسك كل اللي حواليه. لو الـ component اتقفل والـ listener فضل، كل داتته لسه ممسوكة. والطريقة القديمة ([[removeEventListener]]) محتاجة نفس الدالة بالظبط، فلازم تحفظها في متغير.

جرّبنا في Chrome: ضغطنا [[a]] قبل [[abort()]] فاتطبع [[a]]، وبعدها ضغطنا [[b]] فمتطبعش حاجة:

~~~text الناتج (Console)
a
~~~

---

## ٥. WeakRef و FinalizationRegistry

[[WeakMap]] بتربط داتا بـ object. [[WeakRef]] أبسط: «إشارة» لـ object **مبتمنعش** الـ garbage collector (GC) إنه يمسحه. و [[FinalizationRegistry]] بتقولك بعدين إن object اتمسح. الاتنين ES2021، في Node والمتصفحات.

~~~text weak.mjs
const registry = new FinalizationRegistry((label) => console.log("اتمسح من الذاكرة:", label));
let big = { data: new Array(1e6).fill(7) };
const ref = new WeakRef(big);
registry.register(big, "big");
console.log("قبل:", ref.deref()?.data.length);
big = null;
await new Promise((r) => setTimeout(r, 0));
globalThis.gc();
await new Promise((r) => setTimeout(r, 0));
console.log("بعد gc:", ref.deref());
~~~

~~~powershell
node --expose-gc weak.mjs
~~~

~~~text الناتج (Node 24)
قبل: 1000000
اتمسح من الذاكرة: big
بعد gc: undefined
~~~

- [[new WeakRef(obj)]]: بتعمل الإشارة. و [[ref.deref()]]: بترجّع الـ object لو لسه عايش، أو [[undefined]] لو اتمسح. عشان كده [[?.]] بعدها دايمًا.
- [[registry.register(obj, "big")]]: لما [[obj]] يتمسح، الـ callback هيتنادى بالقيمة التانية ([["big"]]). متبعتش الـ object نفسه كقيمة تانية، كده انت اللي ماسكه ومش هيتمسح أبدًا.
- [[big = null]]: شيلنا آخر إشارة قوية. الـ [[WeakRef]] مبيتحسبش.
- [[globalThis.gc()]]: بيشغّل الـ GC بالعافية، وموجود بس مع flag [[--expose-gc]] (للتجربة بس). من غيره: [[TypeError: globalThis.gc is not a function]].
- الـ [[await]] قبل الـ gc مهم: الـ engine بيمسك أي object اتعمله [[deref()]] لحد آخر الـ task الحالية، فلازم نعدّي task.

### استخدام حقيقي: cache مبيمسكش الحاجات بالعافية

~~~text cache.mjs
const cache = new Map();
const registry = new FinalizationRegistry((key) => {
  if (!cache.get(key)?.deref()) cache.delete(key);
});
function getImage(key) {
  const hit = cache.get(key)?.deref();
  if (hit) return hit;
  const img = { key, pixels: new Uint8Array(5e6) };
  cache.set(key, new WeakRef(img));
  registry.register(img, key);
  return img;
}
~~~

~~~text الناتج (Node 24 بـ --expose-gc: بعد getImage مرتين، و a = null، و gc)
true 1
بعد gc: 0
~~~

- نفس الـ key مرتين رجّع **نفس** الـ object ([[true]]) من غير ما يعمل 5MB تانيين.
- لما محدش بقى ماسك الصورة، الـ GC مسحها، والـ registry شال الـ key من الـ Map، فالـ [[size]] بقى 0.
- الـ [[if]] جوه الـ callback: لو نفس الـ key اتعمل له صورة جديدة قبل ما الـ callback ييجي، متمسحهاش.

> **مش مضمون إمتى (ولا إذا كان) الـ callback هيتنادى.** الـ GC بيشتغل على مزاجه، وممكن البرنامج يقفل قبله. وثائق اللغة نفسها بتقول تجنّبهم لو تقدر. استخدمهم لـ cache أو تنضيف «لو حصل كويس»، عمرك ما تحط فيهم حاجة لازم تحصل (قفل ملف، حفظ داتا): دي محتاجة [[close()]] صريحة أو [[using]].

---

## ٦. إزاي تلاقي leak: heap snapshot

### في المتصفح (DevTools)

ده من الـ docs ومن الـ «جرّب»، مش متشغّل أوتوماتيك هنا:

1. DevTools ← تاب **Memory** ← **Heap snapshot** ← Take snapshot.
2. اعمل الحاجة اللي شاكك فيها كذا مرة (افتح وقفل modal ١٠ مرات).
3. دوس أيقونة الزبالة (Collect garbage)، وخد snapshot تاني.
4. في الـ snapshot التاني اختار **Comparison**: أي نوع بيزيد بنفس عدد المرات وما بيقلش = leak.
5. اكتب **Detached** في الفلتر: عناصر DOM اتشالت من الصفحة ولسه حد ماسكها، وتحت في **Retainers** هتلاقي مين.

### heap snapshot في Node: node --inspect و writeHeapSnapshot

نفس الـ DevTools بتفتح على برنامج Node:

~~~powershell
node --inspect server.js
~~~

~~~text الناتج (Node 24)
Debugger listening on ws://127.0.0.1:9229/f8949dca-483b-4bcf-8593-a1b230c3a8f0
For help, see: https://nodejs.org/learn/getting-started/debugging
~~~

- [[--inspect]]: بيفتح بورت debugging على [[127.0.0.1:9229]] (محلي بس، متفتحوش على [[0.0.0.0]] في سيرفر: أي حد يوصله يقدر يشغّل كود).
- افتح [[chrome://inspect]] في Chrome، وتحت Remote Target دوس **inspect**، وهيفتحلك DevTools فيه تاب Memory بنفس الخطوات اللي فوق (الخطوات دي من وثائق Node، اتشغّل منها هنا الـ flag بس).
- [[--inspect-brk]]: نفس الكلام بس بيقف على أول سطر، عشان تلحق تفتح الـ DevTools قبل ما الكود يشتغل.

ولو السيرفر في مكان مفيهوش Chrome، اكتب الـ snapshot لملف من الكود نفسه:

~~~text leak.mjs
import { writeHeapSnapshot } from "node:v8";
const sessions = new Map();
class Session { constructor(id) { this.id = id; this.buf = new Array(1000).fill(id); } }
function onRequest(id) { sessions.set(id, new Session(id)); }
for (let i = 0; i < 5000; i++) onRequest(i);
console.log("heapUsed MB:", Math.round(process.memoryUsage().heapUsed / 1e6));
console.log("snapshot:", writeHeapSnapshot());
~~~

~~~text الناتج (Node 24)
heapUsed MB: 46
snapshot: Heap.20261029.235508.20492.0.001.heapsnapshot
~~~

- [[process.memoryUsage().heapUsed]]: الذاكرة المستخدمة في الـ heap بالبايت. راقبها مع الوقت: لو بتزيد ومبتنزلش بعد ما الـ requests تخلص، فيه leak.
- [[writeHeapSnapshot()]]: بيكتب ملف [[.heapsnapshot]] (هنا حوالي 6MB) في الفولدر الحالي ويرجّع اسمه. البرنامج بيقف لحظة وهو بيكتبه، وبياخد ذاكرة قد الـ heap تقريبًا، فمتعملوش كل دقيقة في production.
- افتح الملف من DevTools ← Memory ← Load. عدّيت الـ objects اللي اسمها [[Session]] جوه الملف ده بسكربت صغير: **5000**، يعني كل session لسه في الذاكرة، والـ Retainers هيقولك إن اللي ماسكهم الـ [[sessions]] Map. ده نفس leak الجزء ١.
- فيه كمان [[node --heapsnapshot-near-heap-limit=1 app.js]] بيكتب snapshot لوحده قبل ما البرنامج يقع بـ out of memory (من وثائق Node).

---

## الخلاصة

| مصدر الـ leak | العلاج |
|---|---|
| Map أو cache بيكبر | حد أقصى، أو WeakMap لو الـ key object |
| [[setInterval]] أو subscription | دالة إيقاف ترجع مع البداية، وتتنادى في الـ cleanup |
| listeners على window و document | [[{ signal }]] و [[abort()]]، أو removeEventListener |
| عنصر DOM اتشال ولسه في متغير | امسح المتغير، أو WeakMap |
| cache لحاجات تقيلة ممكن تتمسح | [[WeakRef]] و [[FinalizationRegistry]]، من غير ما تعتمد على إمتى |
| مش عارف مين ماسك الذاكرة | heap snapshot: DevTools، أو [[node --inspect]]، أو [[writeHeapSnapshot()]] |

والسؤال اللي تسأله مع كل حاجة بتبدأها: «مين هيقفل ده وإمتى؟».`,
          lines: [
            R`[[Map]] عادية بتمسك المفاتيح والقيم بقوة: طول ما [[cache]] نفسه موجود، أي حاجة جواه مش هتتمسح من الذاكرة.`,
            R`كل نداء بيضيف عنصر ومحدش بيمسح. لو المفاتيح بتتغيّر (id لكل request مثلًا) الـ Map بتكبر للأبد والذاكرة تزيد لحد ما الصفحة أو السيرفر يتقل. الحل: حد أقصى ([[cache.size]]) وامسح الأقدم بـ [[delete]].`,
            R`[[WeakMap]] المفاتيح فيها لازم objects، وبتمسكهم «بضعف»: وجود الـ object كمفتاح هنا مش بيمنع الـ garbage collector إنه يمسحه.`,
            R`بنربط معلومات بعنصر DOM من غير ما نعدّل العنصر. لما العنصر يتشال من الصفحة ومفيش حد تاني ماسكه، هو و [[info]] بتاعته يتمسحوا لوحدهم. لو كانت [[Map]] عادية كانت هتفضل ماسكة العنصر المشال (detached) في الذاكرة.`,
            R`بتبدأ request كل شوية (polling). أي [[setInterval]] من غير [[clearInterval]] بيفضل شغال حتى لو الصفحة أو الـ component اللي بدأه مبقاش موجود.`,
            R`كل 5 ثواني [[fetch]] لـ [[/api/ping]]. و [[setInterval]] بترجّع [[id]] للـ timer ده، ومن غيره مفيش طريقة توقفه.`,
            R`بترجّع دالة توقف الـ polling (closure فاكر [[id]]). نفس فكرة الـ unsubscribe: اللي بيبدأ حاجة يرجّع طريقة إيقافها، ودي اللي تتنادى في الـ cleanup زي الـ return بتاع useEffect.`,
            R`نهاية [[startPolling]].`,
            R`بنبدأ الـ polling ونحفظ دالة الإيقاف. لو مسكتش الدالة اللي راجعة، الـ interval هيفضل شغال ومش هتقدر توقفه.`,
            R`بنوقف الـ interval لما مبقناش محتاجينه (مثلًا اليوزر خرج من الصفحة دي). ساعتها الـ callback وكل اللي ماسكه يقدروا يتمسحوا من الذاكرة.`,
            R`controller واحد هنربط بيه كذا listener: [[controller.signal]] بيتبعت لكل listener، ولما نعمل [[abort()]] كلهم يتشالوا مرة واحدة.`,
            R`listener على [[resize]] بيطبع العرض. الـ [[signal]] في الـ options بيربطه بالـ controller، فمش محتاجين نحتفظ بالدالة عشان [[removeEventListener]].`,
            R`listener تاني على حدث مختلف وعنصر مختلف بنفس الـ [[signal]]. أي عدد listeners ممكن يتربطوا بنفس الـ controller.`,
            R`سطر واحد بيشيل الـ listeners الاتنين. من غيره كنت محتاج [[removeEventListener]] لكل واحد بنفس الدالة بالظبط، والـ arrow functions هنا مش محفوظة في متغير، فمكنتش هتقدر تشيلها أصلًا.`,
          ],
          sol: R`صفحة سليمة: في الـ Comparison الـ [[# Delta]] حوالي صفر، أو بيزيد مرة وبعدين يثبت. صفحة فيها leak: رقم بيزيد بنفس النسبة مع كل مرة (فتحت 10 مرات فزاد 10 أو مضاعفاتها)، زي [[HTMLDivElement]] أو [[Detached HTMLDivElement]] أو closures بتاعة listeners.

لو كتبت «Detached» في خانة الفلتر ولقيت عناصر، دي عناصر اتشالت من الصفحة بس لسه فيه حاجة ماسكاها: listener على window مش اتشال، أو متغير أو Map شايلها، أو setInterval لسه شغال. افتح العنصر وبص في «Retainers» تحت، هتلاقي السلسلة لحد اللي ماسكه. وقبل الـ snapshot التاني دوس زرار الزبالة (Collect garbage) عشان متتلخبطش بحاجات لسه متمسحتش.`
        }
      ]
    }
]);
