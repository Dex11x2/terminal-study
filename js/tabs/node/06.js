// تكملة تاب node: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/node/01.js (شرح حقول الدرس في أوله)
MORE("node", [
    {
      t: "الإنتاج والتشخيص",
      l: 3,
      n: "Node على السيرفر: الذاكرة، والإغلاق النضيف، والسكربتات كأدوات",
      items: [
        {
          cmd: "NODE_ENV=production",
          title: "الوضع اللي التطبيق بيشتغل بيه",
          desc: "مكتبات كتير (Express، وReact) بتتصرف مختلف لما [[NODE_ENV=production]]: كاش أكتر، ورسايل أخطاء أقل، وأسرع. و [[npm ci --omit=dev]] بيسطّب dependencies الإنتاج بس. الاتنين لازمين على السيرفر.",
          example: R`NODE_ENV=production node server.js
npm ci --omit=dev
node -e "console.log(process.env.NODE_ENV)"
npm run build && NODE_ENV=production npm start`,
          try: "شغّل تطبيق Express بـ production ومن غيرها، واعمل error، وقارن الرد.",
          deep: {
            why: "نفس الكود بيشتغل مختلف في الإنتاج: Express بيعمل كاش للـ templates، و React بيشيل التحذيرات والـ dev tools، ومكتبات كتير بتسرّع. من غير المتغير ده التطبيق أبطأ وبيكشف معلومات.",
            how: R`[[NODE_ENV]] مجرد متغير بيئة بالاتفاق، Node نفسه مش بيعمل بيه حاجة. المكتبات هي اللي بتقراه: [[if (process.env.NODE_ENV === 'production')]].

Express في الإنتاج: كاش للـ view templates، ورسايل أخطاء أقل تفصيلًا للمستخدم. React: الـ build بيطلّع نسخة أصغر وأسرع من غير checks التطوير. Prisma وغيرها بتقلل اللوج.

و [[npm ci --omit=dev]] مرتبط: لو NODE_ENV=production موجود وقت التسطيب، npm بيتخطى devDependencies لوحده. بس صريح أوضح.

الخطأ الشائع: الـ build محتاج devDependencies (TypeScript مثلًا). فالترتيب: سطّب الكل، اعمل build، وبعدين في الـ image النهائية سطّب production بس. وده اللي multi-stage في Docker بيعمله.

في Next.js: [[next build]] بيضبط production لوحده، و [[next start]] بيشغّل بيه.`,
            when: "كل تشغيل على سيرفر: في Dockerfile، أو pm2 ecosystem، أو systemd unit.",
            mistakes: "NODE_ENV=production على جهازك وقت التطوير، فـ devDependencies متتسطبش والـ hot reload يقف. وتنساه على السيرفر."
          },
          teach: R`## الفكرة في سطر

[[NODE_ENV]] متغير بيئة اسمه متفق عليه بين مكتبات JavaScript: لو قيمته [[production]] المكتبات بتشتغل بوضع الإنتاج (رسايل أخطاء أقل، وكاش أكتر). و Node نفسه مش بيقراه خالص؛ المكتبات هي اللي بتعمل [[if (process.env.NODE_ENV === "production")]]. هنفك الـ ٤ سطور، وبعدين نجرب الفرق على Express بجد.

---

## ١. [[NODE_ENV=production node server.js]]

~~~bash
NODE_ENV=production node server.js
~~~

السطر ده فيه حتتين:

| الحتة | معناها |
|---|---|
| [[NODE_ENV=production]] | اعمل متغير بيئة اسمه [[NODE_ENV]] وقيمته [[production]]... |
| [[node server.js]] | ...للأمر ده بس |

الشكل [[اسم=قيمة أمر]] في bash معناه إن المتغير بيتحط للـ process دي لوحدها، ومش بيفضل في الترمنال بعدها. ودي صيغة لينكس والماك و Git Bash. في PowerShell نفس السطر بيقع:

~~~text الناتج في PowerShell 7
NODE_ENV=production: The term 'NODE_ENV=production' is not recognized as a name of a cmdlet, function, script file, or executable program.
~~~

PowerShell فاكر [[NODE_ENV=production]] اسم برنامج. البديل بتاعه سطرين:

~~~powershell
$env:NODE_ENV = "production"
node server.js
~~~

[[$env:]] زي ما شفنا في درس «CPU و RAM والديسك»: متغيرات البيئة. الفرق إن المتغير هنا بيفضل موجود لحد ما تقفل الترمنال، فلو عايز ترجع للتطوير: [[Remove-Item Env:NODE_ENV]].

وفي CMD فيه فخ: [[set NODE_ENV=production && node server.js]] بيحط القيمة [["production "]] **بمسافة في الآخر** (CMD بياخد كل اللي قبل [[&&]])، فـ [[=== "production"]] بتطلع false. جربناها:

~~~text الناتج في cmd
set NODE_ENV=production&& node ...    ->  "production"
set NODE_ENV=production && node ...   ->  "production "
~~~

يعني في CMD لزّق [[&&]] في القيمة من غير مسافة.

---

## ٢. [[npm ci --omit=dev]]

~~~bash
npm ci --omit=dev
~~~

- [[npm ci]] (ci = clean install): بيمسح [[node_modules]] ويسطّب بالظبط اللي في [[package-lock.json]]. ده اللي بيتعمل على السيرفر و CI (التفاصيل في درس «package-lock و npm ci»).
- [[--omit=dev]]: متسطّبش اللي في [[devDependencies]] (أدوات التطوير زي nodemon و TypeScript و ESLint)، وسطّب [[dependencies]] بس.

جربناها على مشروع فيه [[express]] في dependencies و [[nodemon]] في devDependencies (جوه [[node:22-slim]]):

~~~text الناتج
added 68 packages, and audited 69 packages in 2s
~~~

مع [[npm ci]] العادي فولدر [[node_modules]] كان فيه ٩١ حاجة، ومع [[--omit=dev]] ٦٥، و nodemon مش موجود. ولو [[NODE_ENV=production]] كان متحط وقت التسطيب، [[npm ci]] لوحده بيتخطى devDependencies بنفس الشكل (جربناها: nodemon مطلعش). بس كتابة [[--omit=dev]] صريحة أوضح لأي حد بيقرا الـ Dockerfile.

---

## ٣. [[node -e "console.log(process.env.NODE_ENV)"]]

~~~bash
node -e "console.log(process.env.NODE_ENV)"
~~~

| الحتة | معناها |
|---|---|
| [[node -e "..."]] | [[-e]] = eval: نفّذ الكود اللي بين علامات التنصيص من غير ملف |
| [[process]] | object جاهز في Node فيه معلومات الـ process اللي شغالة |
| [[process.env]] | كل متغيرات البيئة اللي الـ process شايفاها، كـ object |
| [[.NODE_ENV]] | خانة واحدة منهم |

~~~text الناتج
undefined                                      من غير المتغير
production                                     مع NODE_ENV=production قدامه
~~~

[[undefined]] يعني المتغير مش موجود أصلًا، والمكتبات بتعتبر ده «تطوير». السطر ده هو اللي تشغّله لما تشك إن المتغير مش واصل، وخصوصًا جوه container: [[docker compose exec app node -e "console.log(process.env.NODE_ENV)"]].

---

## ٤. [[npm run build && NODE_ENV=production npm start]]

~~~bash
npm run build && NODE_ENV=production npm start
~~~

- [[npm run build]]: شغّل script اسمه [[build]] من [[package.json]].
- [[&&]]: شغّل اللي بعدي **بس لو** اللي قبلي نجح (exit code 0). لو الـ build وقع، مفيش start على كود بايظ.
- [[NODE_ENV=production npm start]]: نفس صيغة السطر الأول، والمتغير بيوصل لـ npm، و npm بيورّثه لـ node اللي بيشغّله.

وفي PowerShell 7: [[npm run build && npm start]] بعد [[$env:NODE_ENV = "production"]]، لأن [[&&]] موجودة فيه من نسخة 7. في Windows PowerShell 5.1 مفيش [[&&]]، فاكتبهم سطرين.

---

## التجربة: Express من غير production ومعاها

ده الـ [[solCode]]:

~~~text app.js
import express from "express";
const app = express();
app.get("/boom", () => { throw new Error("db password is hunter2"); });
app.listen(3000);
~~~

- [[import express from "express"]]: هات مكتبة Express (الملف لازم يبقى ESM: [["type": "module"]] في package.json).
- [[express()]]: اعمل تطبيق.
- [[app.get("/boom", ...)]]: لما يجي طلب GET على [[/boom]] نفّذ الدالة دي، وهي بترمي error فيه «سر» عن قصد.
- [[app.listen(3000)]]: اسمع على بورت 3000.

شغّلناه في [[node:22-slim]] (Express 5.2.1) وطلبنا [[curl -i localhost:3000/boom]]:

~~~text الناتج من غير NODE_ENV
HTTP/1.1 500 Internal Server Error
Content-Length: 930
...
<pre>Error: db password is hunter2<br> &nbsp; &nbsp;at file:///work/app/app.js:3:32<br> ...
~~~

~~~text الناتج مع NODE_ENV=production
HTTP/1.1 500 Internal Server Error
Content-Length: 148
...
<pre>Internal Server Error</pre>
~~~

نفس الـ 500، بس من غير production الرد فيه نص الخطأ والـ stack trace ومسارات الملفات (930 byte)، ومع production جملة عامة بس (148 byte). وفي الحالتين الـ stack الكامل اتطبع في ترمنال السيرفر، يعني انت لسه شايفه في اللوج والمستخدم لأ.

---

## الخلاصة

| النظام | تشغيل بـ production |
|---|---|
| لينكس والماك و Git Bash | [[NODE_ENV=production node server.js]] |
| PowerShell | [[$env:NODE_ENV = "production"]] وبعدين [[node server.js]] |
| CMD | [[set NODE_ENV=production&& node server.js]] (من غير مسافة قبل [[&&]]) |
| Docker / compose | [[ENV NODE_ENV=production]] أو [[environment:]] |

- [[NODE_ENV]] مجرد اتفاق، والمكتبات هي اللي بتقراه.
- على السيرفر: [[npm ci --omit=dev]] و [[NODE_ENV=production]] الاتنين.
- على جهازك: متحطوش، وإلا devDependencies مش هتتسطب.`,
          lines: [
            "شغّل في وضع الإنتاج.",
            "سطّب dependencies الإنتاج بس.",
            "اتأكد من القيمة.",
            "ابني وبعدين شغّل الناتج في الإنتاج."
          ],
          sol: R`في Express 5 مع route بيرمي [[new Error("db password is hunter2")]]:

من غير NODE_ENV: الرد 500 وصفحة HTML فيها [[<pre>Error: db password is hunter2<br> at file:///.../app.js:3:32 ...]]، يعني رسالة الخطأ والـ stack trace ومسارات الملفات على السيرفر ظاهرين لأي حد. مع [[NODE_ENV=production]]: نفس الـ 500 بس الـ body [[<pre>Internal Server Error</pre>]] بس. والتفاصيل راحت للوج السيرفر ([[Error: db password is hunter2]] في الترمنال).

ودا سبب إن الإعداد ده مش اختياري. ولو لسه شايف الـ stack في production: اتأكد بـ [[node -e "console.log(process.env.NODE_ENV)"]] إن المتغير واصل فعلًا للـ process (مع pm2 أو Docker بيتحط في الـ config مش في الترمنال)، أو إن عندك error handler بتاعك بيبعت [[err.stack]] بنفسه.`,
          solCode: R`import express from "express";
const app = express();
app.get("/boom", () => { throw new Error("db password is hunter2"); });
app.listen(3000);

// node app.js                      -> stack trace in the response
// NODE_ENV=production node app.js  -> Internal Server Error only`
        },
        {
          cmd: "الذاكرة",
          title: "heap out of memory",
          desc: "الرسالة: [[FATAL ERROR: Reached heap limit]]. Node بيحدد لنفسه سقف رام (بيتحسب من رام الجهاز، وممكن يبقى أقل من اللي الـ build محتاجه). لو الـ build أو التطبيق محتاج أكتر، ترفعه. ولو بيوصل للسقف مع الوقت، ده memory leak.",
          example: R`node --max-old-space-size=4096 server.js
NODE_OPTIONS=--max-old-space-size=4096 npm run build
node -e "console.log(process.memoryUsage())"
node --heapsnapshot-signal=SIGUSR2 server.js`,
          try: "شغّل [[npm run build]] لمشروع Next.js على سيرفر ١ جيجا: لو وقع، جرّب بـ NODE_OPTIONS ولو لسه، ده معناه محتاج swap أو build في CI.",
          deep: {
            why: "[[next build]] على سيرفر ١ جيجا بيقع بـ heap out of memory. أو التطبيق بيكبر في الرام يوم ورا يوم لحد ما يتقتل.",
            how: R`V8 (محرك JavaScript) بيحدد سقف للـ heap (الذاكرة بتاعة الـ objects). لو التطبيق عدّاه، بيقع بـ [[FATAL ERROR: Reached heap limit Allocation failed]]. السقف بيتحسب من رام الجهاز بس ممكن يبقى أقل مما تحتاج.

[[--max-old-space-size=4096]] بيرفعه لـ ٤ جيجا (بالميجا). لازم يبقى أقل من الرام الفعلية المتاحة، وإلا النظام هيقتل العملية بـ 137 قبل ما V8 يوصل للسقف.

[[NODE_OPTIONS]] متغير بيئة بيضيف flags لأي node بيتشغّل، مفيد مع npm scripts اللي مش بتشغّل node مباشرة.

[[process.memoryUsage()]] بيوريك rss (الكل) و heapUsed (المستخدم فعلًا). لو heapUsed بيزيد باستمرار من غير ما ينزل، memory leak.

[[--heapsnapshot-signal]] بيخلي التطبيق يكتب snapshot للـ heap لما يستلم إشارة، تفتحها في Chrome DevTools (Memory tab) وتشوف إيه اللي مالي الذاكرة.`,
            when: "build بيقع. تطبيق بيتقتل كل كام ساعة. قبل ما تكبّر السيرفر.",
            mistakes: "ترفع السقف فوق رام السيرفر. وتعالج الـ leak بريستارت يومي بدل ما تلاقيه."
          },
          teach: R`## الأول: يعني إيه heap؟

البرنامج بتاعك وهو شغال بيعمل objects و arrays و strings، وكلهم بيتحطوا في جزء من الـ RAM اسمه **heap**. و V8 (المحرك اللي بيشغّل JavaScript جوه Node) حاطط للـ heap سقف. لو التطبيق عدّاه، Node بيقع. الـ ٤ سطور في المثال: اتنين بيرفعوا السقف، وواحد بيقيس، وواحد بيصوّر الذاكرة عشان تدوّر على leak.

> leak (تسريب): objects التطبيق مش محتاجها تاني بس لسه في حاجة ماسكاها (array بيكبر، أو cache مبيتمسحش)، فالـ garbage collector مش قادر يمسحها والذاكرة تفضل تزيد.

---

## ١. السقف كام دلوقتي؟

قبل ما ترفع حاجة، اعرف الرقم الحالي:

~~~bash
node -e "console.log(require('v8').getHeapStatistics().heap_size_limit / 1024 / 1024)"
~~~

- [[require('v8')]]: مكتبة مبنية في Node بتكلّم المحرك.
- [[getHeapStatistics()]]: إحصائيات الـ heap، ومنها [[heap_size_limit]] بالـ byte.
- [[/ 1024 / 1024]]: byte ← KB ← MB.

~~~text الناتج
4288        ويندوز، Node 24، جهاز 32 جيجا
4144        node:22-slim في Docker، الماكينة شايفة 16 جيجا
524         نفس الـ image بس بـ docker run -m 1g
~~~

السطر الأخير مهم: لما الـ container محدود بـ ١ جيجا، Node بيحسب السقف من الحد ده (حوالي النص) مش من رام الجهاز. فالـ build اللي بيعدّي على جهازك ممكن يقع على سيرفر صغير.

---

## ٢. [[node --max-old-space-size=4096 server.js]]

~~~bash
node --max-old-space-size=4096 server.js
~~~

- [[--max-old-space-size]]: الـ heap متقسم «جيلين»: young (objects جديدة وبتموت بسرعة) و old (اللي عاشت). الفلاج ده بيحدد سقف الـ old space، وهو الجزء الكبير.
- [[4096]]: بالميجا، يعني ٤ جيجا.

جربناها بنفس سطر القياس: [[4144]] في Docker. ليه مش 4096؟ لأن الرقم اللي بيرجع هو old + young، والـ young هنا ٤٨ ميجا.

> الرقم لازم يبقى أقل من الرام الفاضية فعلًا. لو رفعته فوقها، النظام نفسه هيقتل العملية (OOM killer) قبل ما V8 يوصل للسقف، والـ exit code هيبقى 137.

---

## ٣. [[NODE_OPTIONS=--max-old-space-size=4096 npm run build]]

~~~bash
NODE_OPTIONS=--max-old-space-size=4096 npm run build
~~~

انت مش بتكتب [[node]] هنا: [[npm run build]] هو اللي بيشغّل [[next build]] أو [[vite build]]، وهما بيشغّلوا node. فإزاي توصّل الفلاج؟ [[NODE_OPTIONS]] متغير بيئة أي [[node]] بيبدأ بيقراه ويضيف اللي فيه لفلاجاته. وبما إنه متغير بيئة، بيتورث لكل process جوه الـ build.

~~~powershell
$env:NODE_OPTIONS = "--max-old-space-size=4096"
npm run build
~~~

ده شكله في PowerShell (نفس قاعدة [[$env:]] في درس [[NODE_ENV=production]]).

---

## ٤. [[node -e "console.log(process.memoryUsage())"]]

~~~bash
node -e "console.log(process.memoryUsage())"
~~~

~~~text الناتج في node:22-slim
{
  rss: 45875200,
  heapTotal: 5349376,
  heapUsed: 3792984,
  external: 1312217,
  arrayBuffers: 10511
}
~~~

كل الأرقام بالـ byte:

| الخانة | معناها | هنا |
|---|---|---|
| [[rss]] | Resident Set Size: كل الرام اللي العملية واخداها من النظام (كود Node نفسه والـ heap وكل حاجة) | ٤٤ ميجا |
| [[heapTotal]] | الـ heap اللي V8 حاجزه دلوقتي | ٥ ميجا |
| [[heapUsed]] | المستخدم فعلًا من الـ heap | ٣.٦ ميجا |
| [[external]] | ذاكرة بره الـ heap مربوطة بـ objects جوه JavaScript | ١.٣ ميجا |
| [[arrayBuffers]] | جزء من external للـ Buffers و ArrayBuffers | ١٠ KB |

الرقم اللي تراقبه للـ leak هو [[heapUsed]]: لو بيطلع وينزل طبيعي. لو بيطلع بس ساعة ورا ساعة، فيه leak. وفي سيرفر حقيقي بتطبعه كل شوية أو تبعته لأداة monitoring بدل [[-e]].

---

## ٥. [[node --heapsnapshot-signal=SIGUSR2 server.js]]

~~~bash
node --heapsnapshot-signal=SIGUSR2 server.js
kill -USR2 <pid>
~~~

- [[--heapsnapshot-signal=SIGUSR2]]: «لما توصلك الإشارة SIGUSR2، اكتب صورة كاملة للـ heap في ملف».
- [[SIGUSR2]]: إشارة لينكس فاضية متسابة للبرامج تستخدمها زي ما هي عايزة (USR = user).
- [[kill -USR2 <pid>]]: ابعت الإشارة للـ process ده. [[kill]] اسمه مخوّف بس هو بيبعت أي إشارة، مش بيقتل وبس.

جربناها في Docker على سيرفر فاضي:

~~~text الناتج
pid 3720
-rw------- 1 root root 5221219 Oct  6 12:55 Heap.20261006.125546.3720.0.001.heapsnapshot
~~~

ملف ٥ ميجا اسمه فيه التاريخ والوقت والـ PID، والسيرفر كمّل شغال عادي. افتحه في Chrome DevTools: تبويب Memory ثم Load. خد صورتين بينهم وقت، واختار Comparison، هتشوف إيه اللي زاد.

على ويندوز مفيش [[SIGUSR2]]، وجربناها:

~~~text الناتج في PowerShell
TypeError [ERR_UNKNOWN_SIGNAL]: Unknown signal: SIGUSR2
~~~

البديل اللي اشتغل على ويندوز: من جوه الكود [[require('v8').writeHeapSnapshot()]]، وبيرجّع اسم الملف اللي كتبه:

~~~text الناتج
Heap.20261006.155601.45540.0.001.heapsnapshot
~~~

---

## شكل الوقعة نفسها

عملنا تطبيق بيملا arrays من غير ما يسيب حاجة، بسقف ٦٤ ميجا عشان يوقع بسرعة:

~~~bash
node --max-old-space-size=64 -e "const a=[]; while(true) a.push(new Array(1e5).fill(Math.random()))"
echo $?
~~~

~~~text الناتج
<--- Last few GCs --->
... Mark-Compact 63.7 (97.1) -> 63.7 (97.1) MB ... allocation failure; scavenge might not succeed

<--- JS stacktrace --->

FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
134
~~~

- [[Mark-Compact 63.7 -> 63.7 MB]]: الـ garbage collector اشتغل وملقاش حاجة يمسحها (قبل وبعد نفس الرقم)، لأن كل الـ arrays لسه في [[a]].
- [[FATAL ERROR: Reached heap limit]]: V8 وصل للسقف.
- [[134]]: exit code معناه إن العملية عملت abort بنفسها (128 + 6). قارنه بـ [[137]] (128 + 9) اللي معناه إن النظام قتلها من بره (OOM killer)، وده حله مش رفع الرقم.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| أعرف السقف | [[require('v8').getHeapStatistics().heap_size_limit]] |
| أرفعه لـ node مباشرة | [[node --max-old-space-size=4096 file.js]] |
| أرفعه لـ npm script | [[NODE_OPTIONS=--max-old-space-size=4096 npm run build]] |
| أقيس دلوقتي | [[process.memoryUsage()]] وبص على [[heapUsed]] |
| أدوّر على leak | heap snapshot (إشارة على لينكس، [[writeHeapSnapshot()]] على ويندوز) |

- 134 وفيه [[FATAL ERROR: Reached heap limit]] = سقف V8، ورفعه ممكن يحل.
- 137 أو [[Killed]] = رام الجهاز خلصت، والحل swap أو جهاز أكبر أو build في CI.`,
          lines: [
            "ارفع سقف الـ heap لـ ٤ جيجا.",
            "نفس الحاجة لأي node بيتشغّل من npm script.",
            "استهلاك الذاكرة دلوقتي.",
            "اكتب heap snapshot لما تستلم إشارة، لتحليل الـ leak."
          ],
          sol: R`الحالات اللي هتشوفها على سيرفر ١ جيجا:

١. Node نفسه يوصل للحد: [[FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory]]. هنا [[NODE_OPTIONS=--max-old-space-size=...]] ممكن يفرق لو فيه RAM فاضية. ٢. النظام يقتل العملية: الـ build يقف بكلمة [[Killed]] بس، والـ exit code 137، و [[dmesg | grep -i oom]] يقول [[Out of memory: Killed process ... (node)]]. هنا رفع الـ heap مش هيفيد، بالعكس: [[--max-old-space-size=4096]] على جهاز فيه ١ جيجا بيخلي Node يطلب أكتر، فالـ OOM killer يقتله أسرع.

عشان تعرف الحد الحالي: [[node -e "console.log(require('v8').getHeapStatistics().heap_size_limit / 1024 / 1024)"]]. عندي على جهاز ١٦ جيجا طلع 8240، ومع [[--max-old-space-size=4096]] بقى 4144. على سيرفر صغير الرقم الافتراضي بيبقى أقل.

الخلاصة الصح: لو اتقتل بـ Killed، الحل swap ([[fallocate -l 2G /swapfile]] ...) أو إنك تبني في CI وتنقل النتيجة (image جاهز أو standalone)، مش إنك ترفع الرقم.`
        },
        {
          cmd: "الإغلاق النضيف",
          title: "SIGTERM و unhandled rejections",
          desc: "لما Docker أو pm2 يقفل التطبيق، بيبعت SIGTERM. لو التطبيق مسمعش، الطلبات الجارية بتتقطع. وأي promise فشل من غير catch بيوقع التطبيق كله في Node الحديث.",
          example: R`const server = app.listen(3000);

process.on("SIGTERM", () => {
  console.log("SIGTERM: closing");
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled:", err);
  process.exit(1);
});`,
          try: "شغّل السيرفر، وابعتله [[kill -TERM PID]]، وشوفه بيطبع الرسالة ويقفل بدل ما يتقطع.",
          flag: "script",
          deep: {
            why: "مع كل deploy، الطلبات اللي كانت شغالة بتتقطع في النص: دفعة اتسجّلت نص تسجيل، أو رد مرجعش. والتطبيق ممكن يقع فجأة بسبب promise فشل في مكان بعيد.",
            how: R`[[SIGTERM]] الإشارة اللي Docker و pm2 و systemd بيبعتوها عشان «اقفل بأدب». من غير معالج، Node بيقفل فورًا. مع معالج: [[server.close()]] بيوقف استقبال طلبات جديدة، ويستنى الجارية تخلص، وبعدين بينادي الـ callback اللي بيعمل exit.

الـ timeout مهم: لو طلب معلّق للأبد، السيرفر مش هيقفل أبدًا و Docker هيقتله بعد ١٠ ثواني بأي حال. فبنحط مهلة ونخرج بـ 1. و [[.unref()]] بيخلي الـ timer ميمنعش الخروج لو كل حاجة خلصت قبله.

هنا كمان بتقفل اتصالات القاعدة ([[prisma.$disconnect()]]) وأي workers.

[[unhandledRejection]]: promise فشل ومحدش عمله catch. من Node 15 ده بيوقع العملية. المعالج بيسجّل الخطأ بوضوح قبل الخروج، فتعرف السبب من اللوج. والخروج بـ 1 مقصود: pm2 أو Docker يرجّعوه نضيف بدل ما يفضل في حالة مش معروفة.`,
            when: "كل سيرفر إنتاج. وخصوصًا لو بتعمل deploy كتير.",
            mistakes: "تمسك unhandledRejection وتكمّل من غير خروج، فالتطبيق يفضل شغال بحالة غلط. وتنسى الـ timeout فالـ deploy يتعلّق."
          },
          teach: R`## الكود ده بيعمل إيه

بيضيف لأي سيرفر Express حاجتين: لما حد يطلب منه يقفل (SIGTERM) يخلّص الطلبات اللي في إيده الأول وبعدين يقفل، ولو promise فشل ومحدش مسكه، يكتب الخطأ واضح ويخرج بدل ما يقع بشكل عشوائي. هنفكه بلوك بلوك.

---

## ١. [[const server = app.listen(3000);]]

~~~text server.js
const server = app.listen(3000);
~~~

[[app.listen]] بيرجّع object السيرفر (من مكتبة [[node:http]]). عادةً محدش بيشيله في متغير، بس هنا محتاجينه عشان ننادي [[server.close()]] بعدين. و [[const]] = متغير مش هيتغير.

---

## ٢. معالج SIGTERM

~~~text server.js
process.on("SIGTERM", () => {
  console.log("SIGTERM: closing");
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
});
~~~

### [[process.on("SIGTERM", () => {...})]]

- [[process.on(اسم, دالة)]]: «لما الحدث ده يحصل للـ process، نفّذ الدالة». [[process]] نفسه EventEmitter (درس «EventEmitter في Node»).
- [[SIGTERM]] (TERM = terminate): الإشارة اللي Docker و pm2 و systemd و [[kill]] العادي بيبعتوها بمعنى «اقفل لو سمحت».
- [[() => {...}]]: arrow function، دالة من غير اسم.

من غير المعالج ده، Node بيقفل فورًا أول ما الإشارة توصل.

### [[server.close(() => process.exit(0))]]

[[server.close]] بيعمل ٣ حاجات بالترتيب: يبطّل يقبل اتصالات جديدة، ويستنى الطلبات اللي شغالة تخلص، وبعدين ينادي الدالة اللي اديتهاله. والدالة بتعمل [[process.exit(0)]]: اخرج بـ exit code 0 يعني «نجاح».

### [[setTimeout(() => process.exit(1), 10000).unref()]]

- [[setTimeout(دالة, 10000)]]: نفّذ الدالة بعد ١٠٠٠٠ ملي ثانية = ١٠ ثواني.
- [[process.exit(1)]]: اخرج بـ 1 يعني «فشل»، لأن فيه طلب علّق ومخلصش.
- [[.unref()]]: Node مش بيقفل طول ما فيه timer مستني. [[unref]] بيقوله «متستناش الـ timer ده». فلو كل الطلبات خلصت في ثانية، نخرج على طول بدل ما نستنى العشر ثواني.

ليه ١٠ بالذات؟ لأن Docker بيستنى ١٠ ثواني بعد SIGTERM وبعدين بيقتل بـ SIGKILL. فإحنا بنقفل قبله بنفسنا.

---

## ٣. معالج unhandledRejection

~~~text server.js
process.on("unhandledRejection", (err) => {
  console.error("Unhandled:", err);
  process.exit(1);
});
~~~

- **Promise rejected**: عملية async فشلت (القاعدة واقعة مثلًا).
- **unhandled**: محدش عمل لها [[.catch()]] ولا [[try/catch]] حوالين [[await]].
- [[console.error]]: زي [[console.log]] بس على stderr، فاللوج يعرف إنه خطأ.

---

## التجربة

شغّلنا الـ [[solCode]] جوه [[node:22-slim]] وضفنا route بطيء [[/slow]] بيرد بعد ٣ ثواني، و route [[/fail]] بيعمل [[Promise.reject]] من غير catch. وبعدين بعتنا طلب لـ [[/slow]] و SIGTERM وهو لسه شغال:

~~~bash
node server.js &
curl -s localhost:3000/slow &
kill -TERM <pid>
~~~

- [[&]] في الآخر: شغّل الأمر في الخلفية ورجّعلي الترمنال.
- [[kill -TERM <pid>]]: ابعت SIGTERM للـ process ده (الـ pid اتطبع من [[console.log("pid", process.pid)]]).

~~~text الناتج مع المعالج
pid 3737
12:56:11
SIGTERM: closing
slow done <- curl got
exit 0 at 12:56:13
~~~

الإشارة وصلت 12:56:11، والسيرفر استنى [[/slow]] لحد ما رد بـ [[slow done]]، وخرج بـ 0 بعد ثانيتين. نفس التجربة من غير المعالج:

~~~text الناتج من غير المعالج
exit 143
 <- curl exit 52
~~~

- [[143]] = 128 + 15، و 15 رقم SIGTERM. يعني «اتقفل بالإشارة» من غير ما يخلّص.
- [[curl exit 52]] = Empty reply from server: الطلب اتقطع في النص ومرجعش أي رد.

ودلوقتي [[/fail]]:

~~~text الناتج مع المعالج
Unhandled: Error: db down
    at file:///work/app/server.js:5:49
    ...
exit 1
~~~

ومن غير المعالج Node 22 بيقع برضه بـ exit 1 (من Node 15 ده الافتراضي)، بس بيطبع السطر والـ stack من غير كلمة [[Unhandled:]] اللي تدوّر عليها في اللوج. فالمعالج هنا مش عشان يمنع الوقعة، عشان تبقى الوقعة واضحة ومقصودة، و pm2 أو Docker يرجّعوا التطبيق من جديد.

> على ويندوز مفيش [[kill -TERM]]، و [[Stop-Process]] بيقفل فورًا من غير إشارة يقدر الكود يمسكها. الكود ده بيتجرّب على لينكس أو جوه Docker أو WSL، وده المكان اللي بيشتغل فيه في الإنتاج أصلًا.

---

## الخلاصة

| السطر | ليه موجود |
|---|---|
| [[const server = app.listen(3000)]] | عشان نقدر نقفله |
| [[process.on("SIGTERM", ...)]] | نمسك طلب الإغلاق بدل ما نموت فورًا |
| [[server.close(() => process.exit(0))]] | نخلّص الطلبات الجارية ونخرج بنجاح |
| [[setTimeout(..., 10000).unref()]] | مهلة لو حاجة علّقت، من غير ما تأخر الخروج العادي |
| [[process.on("unhandledRejection", ...)]] | نسجّل الخطأ واضح ونخرج بـ 1 |

و [[kill -9]] (SIGKILL) مستحيل يتمسك: مفيش أي معالج بيشتغل معاه.`,
          lines: [
            "احتفظ بالسيرفر عشان تقفله بعدين.",
            "لما تيجي إشارة الإغلاق.",
            "سجّل.",
            "بطّل تستقبل طلبات، ولما الجارية تخلص اخرج بنجاح.",
            "لو معدّاش ١٠ ثواني اخرج بفشل. unref عشان الـ timer ميمنعش الخروج الطبيعي.",
            "قفلة.",
            "أي promise فشل من غير catch.",
            "سجّل الخطأ بوضوح.",
            "اخرج بفشل عشان pm2 أو Docker يرجّعوك نضيف.",
            "قفلة."
          ],
          sol: R`لما تبعت [[kill -TERM PID]] من ترمنال تاني، السيرفر بيطبع [[SIGTERM: closing]] وبعدها بيخرج بـ 0، لأن [[server.close]] استنى الطلبات المفتوحة وخلص. والـ timer بتاع ١٠ ثواني بـ [[unref()]] فمش بيأخر الخروج لو كله خلص بدري.

قارن من غير الـ handler: نفس الأمر بيقفل السيرفر فورًا من غير أي رسالة، والـ exit code 143 (128 + 15)، وأي طلب كان في النص بيتقطع. ودا اللي بيحصل في كل deploy بـ Docker أو pm2 لو ما عملتش الـ handler.

لو ما طبعش الرسالة: غالبًا بتبعت الـ signal لـ [[npm]] مش لـ [[node]] (لو شغال بـ [[npm start]] الـ PID اللي في [[ps]] لـ npm ممكن ما يوصلش الإشارة صح)، فشغّل [[node server.js]] مباشرة أو خد PID الـ node. و [[kill -9]] مش بيتمسك خالص، مفيش handler بيشتغل معاه.`,
          solCode: R`import express from "express";
const app = express();
app.get("/", (req, res) => res.send("ok"));
const server = app.listen(3000, () => console.log("pid", process.pid));

process.on("SIGTERM", () => {
  console.log("SIGTERM: closing");
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
});

// ترمنال تاني:  kill -TERM <pid>`
        },
        {
          cmd: "الـ debugger",
          title: "--inspect و VS Code",
          desc: "console.log بيوصّلك لحد ما. الـ debugger بيوقف الكود على سطر وتشوف كل المتغيرات. [[--inspect]] يفتح بورت 9229، و VS Code أو Chrome يتصلوا بيه. في Docker لازم [[0.0.0.0]] عشان يوصل من بره الـ container.",
          example: R`node --inspect server.js
node --inspect-brk server.js
node --inspect=0.0.0.0:9229 server.js
node --trace-warnings server.js
node --stack-trace-limit=50 server.js`,
          try: "حط [[debugger;]] في route، وشغّل بـ --inspect، وافتح chrome://inspect، واطلب الـ route وشوف الكود بيقف.",
          deep: {
            why: "bug بيحصل في حالة معينة ومش عارف قيمة المتغير ساعتها. console.log في ٢٠ مكان مش هيكفي. الـ debugger بيوقف الكود وتتفرج.",
            how: R`[[--inspect]] بيخلي Node يفتح بورت 9229 لبروتوكول DevTools. Chrome (من chrome://inspect) أو VS Code بيتصلوا بيه، وبيشوفوا الكود والمتغيرات، ويقدروا يوقفوه على breakpoints.

[[--inspect-brk]] بيوقف على أول سطر قبل ما يشتغل، عشان مشاكل الـ startup.

جوه Docker، 9229 بيسمع على localhost بتاع الـ container، فمن بره مش هيوصل. [[--inspect=0.0.0.0:9229]] بيخليه يسمع على كل الكروت، ومع [[-p 9229:9229]] في compose بيوصل من جهازك. في التطوير بس.

في VS Code: launch.json بـ [["type": "node", "request": "attach", "port": 9229]]، أو أسهل: JavaScript Debug Terminal بيربط أي node تشغّله منه لوحده.

[[--trace-warnings]] بيوريك مصدر التحذيرات (زي deprecation). و [[--stack-trace-limit]] بيطوّل الـ stack trace لما الـ error جاي من مكان عميق.`,
            when: "bug مش مفهوم. الـ startup بيقع. وأي وقت console.log مبقاش كفاية.",
            mistakes: "--inspect على سيرفر إنتاج ببورت مفتوح: أي حد يقدر ينفّذ كود. للتطوير بس، وعلى localhost."
          },
          teach: R`## الأوامر دي بتعمل إيه

الـ ٥ سطور كلهم [[node server.js]] بفلاج زيادة. أول ٣ بيفتحوا باب للـ debugger (أداة بتوقف الكود على سطر وتوريك كل المتغيرات)، وآخر اتنين بيخلّوا رسايل الأخطاء والتحذيرات أوضح. جربناهم كلهم على سيرفر [[node:http]] صغير جوه [[node:22-slim]]، وأول واحد كمان على ويندوز (نفس الناتج).

~~~text server.js
const http = require("node:http");
http.createServer((req, res) => { const n = req.url.length; debugger; res.end("ok " + n); }).listen(3000, () => console.log("listening 3000"));
~~~

[[debugger;]] كلمة في JavaScript معناها «لو فيه debugger متوصل، وقّف هنا». ولو مفيش، بتتجاهل.

---

## ١. [[node --inspect server.js]]

~~~bash
node --inspect server.js
~~~

~~~text الناتج
Debugger listening on ws://127.0.0.1:9229/8d5e9802-2d06-4ac2-99fd-fc93208dcd13
For help, see: https://nodejs.org/learn/getting-started/debugging
listening 3000
~~~

| الحتة | معناها |
|---|---|
| [[ws://]] | WebSocket: اتصال مفتوح في الاتجاهين، الـ debugger بيكلّم Node من خلاله |
| [[127.0.0.1]] | localhost: الجهاز ده بس يقدر يتصل |
| [[9229]] | البورت الافتراضي للـ inspector |
| [[8d5e...]] | id عشوائي للجلسة |

والسيرفر نفسه شغال عادي ([[listening 3000]]). الـ debugger بيلاقي الجلسة من عنوان JSON على نفس البورت، جربناه:

~~~bash
curl -s localhost:9229/json/list
~~~

~~~text الناتج (مختصر)
"title": "server.js",
"type": "node",
"url": "file:///work/dbg/server.js",
"webSocketDebuggerUrl": "ws://localhost:9229/8d5e9802-..."
~~~

وده اللي Chrome بيقراه في [[chrome://inspect]]: تلاقي [[server.js]] وجنبه [[inspect]]. اضغطه، واطلب [[localhost:3000]] من المتصفح، والكود هيقف على [[debugger;]] وتشوف [[req]] و [[n]] في Scope. في VS Code أسهل: افتح JavaScript Debug Terminal وشغّل [[node server.js]] منه، وبيتوصل لوحده.

---

## ٢. [[node --inspect-brk server.js]]

[[brk]] = break: نفس الكلام بس **يقف قبل أول سطر** لحد ما debugger يتوصل ويقوله كمّل. جربنا نطلب السيرفر وهو مستني:

~~~text الناتج
Debugger listening on ws://127.0.0.1:9229/c2944cff-...
curl exit 7
~~~

مفيش [[listening 3000]]، و [[curl]] رجّع 7 (Failed to connect) لأن الكود لسه موقف قبل [[listen]]. ده اللي محتاجه لما السيرفر بيقع وهو بيقوم، قبل ما تلحق تحط breakpoint.

---

## ٣. [[node --inspect=0.0.0.0:9229 server.js]]

~~~text الناتج
Debugger listening on ws://0.0.0.0:9229/54cf9fa1-...
~~~

- [[=0.0.0.0:9229]]: اسمع على كل كروت الشبكة بدل 127.0.0.1 بس.

ليه؟ جوه container الـ 127.0.0.1 بتاع الـ container مش بتاع جهازك، فـ Chrome اللي على جهازك مش هيوصل. مع [[0.0.0.0]] و [[ports: "9229:9229"]] في compose بيوصل.

> مين ما يوصل للبورت ده يقدر ينفّذ أي كود على الجهاز. للتطوير بس، وفي compose خليها [[127.0.0.1:9229:9229]] عشان تتفتح لجهازك بس.

---

## ٤. [[node --trace-warnings server.js]]

جربناه على ملف فيه [[process.emitWarning("old api", "DeprecationWarning")]] (زي اللي المكتبات بتطلّعه لما تستخدم دالة هتتشال):

~~~text الناتج من غير الفلاج
(node:3825) DeprecationWarning: old api
(Use $__btnode --trace-deprecation ...$__bt to show where the warning was created)
~~~

~~~text الناتج مع --trace-warnings
(node:3832) DeprecationWarning: old api
    at Object.<anonymous> (/work/dbg/w.js:1:9)
    at Module._compile (node:internal/modules/cjs/loader:1781:14)
    ...
~~~

من غيره عارف إن فيه تحذير بس مش عارف جه منين. معاه بيطبع الـ stack: [[w.js:1:9]] يعني الملف، السطر 1، العمود 9.

---

## ٥. [[node --stack-trace-limit=50 server.js]]

V8 بيحتفظ بآخر ١٠ خطوات (frames) بس في أي stack trace. جربنا دالة بتنادي نفسها ٣٠ مرة وبعدين ترمي error:

~~~text deep.js
function f(n) { if (n === 0) throw new Error("deep"); return f(n - 1); }
f(30);
~~~

~~~text الناتج من غير الفلاج
Error: deep
    at f (/work/dbg/deep.js:1:36)
    at f (/work/dbg/deep.js:1:62)
    ... (10 سطور at f بس)
~~~

~~~text الناتج مع --stack-trace-limit=50
Error: deep
    at f (/work/dbg/deep.js:1:36)
    at f (/work/dbg/deep.js:1:62)
    ... collapsed 29 duplicate lines matching above 1 lines 29 times...
    at Object.<anonymous> (/work/dbg/deep.js:2:1)
    ...
~~~

من غير الفلاج الـ ١٠ سطور كلهم جوه [[f]]، ومش باين مين نادى [[f]] أول مرة. مع ٥٠: ظهر [[deep.js:2:1]]، يعني السطر اللي بدأ الحكاية. (و Node بيختصر السطور المتكررة في سطر [[collapsed]]).

---

## الخلاصة

| الفلاج | بيعمل إيه | إمتى |
|---|---|---|
| [[--inspect]] | يفتح 9229 على localhost | debug عادي |
| [[--inspect-brk]] | نفسه ويقف قبل أول سطر | مشاكل وقت التشغيل |
| [[--inspect=0.0.0.0:9229]] | يسمع على كل الكروت | جوه Docker، تطوير بس |
| [[--trace-warnings]] | stack للتحذيرات | تحذير مش عارف مصدره |
| [[--stack-trace-limit=50]] | stack أطول من ١٠ | الخطأ جاي من مكان عميق |`,
          lines: [
            "افتح بورت 9229 للـ debugger.",
            "ووقف على أول سطر.",
            "اسمع على كل الكروت (جوه Docker).",
            "اطبع مصدر التحذيرات.",
            "stack trace أطول."
          ],
          sol: R`[[node --inspect server.js]] بيطبع [[Debugger listening on ws://127.0.0.1:9229/...]] و [[For help, see: https://nodejs.org/en/docs/inspector]]. في [[chrome://inspect]] تحت Remote Target هيظهر [[server.js]] وجنبه [[inspect]]. تدوس عليه تفتح DevTools.

لما تطلب الـ route من المتصفح أو curl، التنفيذ بيقف على سطر [[debugger;]] والطلب نفسه بيفضل مستني. في DevTools تقدر تشوف [[req.params]] و [[req.body]] في Scope، وتحط mouse على أي متغير، وتكمّل بـ F8. وفي الترمنال هيبان [[Debugger attached.]].

لو الكود ما وقفش: DevTools مش مفتوح (الـ [[debugger;]] بيتجاهل من غير debugger متوصل)، أو السيرفر ما اتعملوش restart بعد ما ضفت السطر. ولو [[chrome://inspect]] مش شايف حاجة، دوس Configure واتأكد إن [[localhost:9229]] موجود. ومتشغّلش [[--inspect=0.0.0.0]] على سيرفر مفتوح؛ أي حد يوصل للبورت يقدر ينفذ كود.`
        },
        {
          cmd: "سكربت Node كأداة",
          title: "اقرا arguments وملفات",
          desc: "Node مش بس سيرفرات. سكربت صغير بيقرا JSON ويعدّله، أو يعمل migration للداتا، أو يولّد ملفات. [[process.argv]] الـ arguments، و [[fs]] الملفات، والـ shebang يخليه يتشغّل مباشرة.",
          example: R`#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";

const [,, file, key, value] = process.argv;
if (!file || !key) {
  console.error("Usage: setkey <file.json> <key> <value>");
  process.exit(1);
}
const data = JSON.parse(await readFile(file, "utf8"));
data[key] = value ?? null;
await writeFile(file, JSON.stringify(data, null, 2) + "\n");
console.log("updated", file);`,
          try: R`احفظه كـ setkey.mjs، و [[chmod +x]]، وشغّل [[./setkey.mjs package.json description "my api"]].`,
          flag: "script",
          deep: {
            why: "bash كويس للملفات والأوامر، بس لما الشغل فيه JSON أو منطق أو async، Node أسهل وأنت عارفه أصلًا. سكربتات الـ migration وتوليد الملفات وتنضيف الداتا.",
            how: R`الـ shebang [[#!/usr/bin/env node]] زي bash: بيخلي الملف يتشغّل بـ [[./script.mjs]] بعد chmod +x. والامتداد .mjs عشان ESM من غير package.json.

[[node:fs/promises]] النسخة الـ async من fs. الـ [[node:]] prefix بيوضّح إنها مكتبة مبنية مش من npm.

[[process.argv]] array: أول عنصر مسار node، والتاني مسار السكربت، وبعدين الـ arguments. عشان كده الـ destructuring بيتخطى الأولين.

التحقق من الـ arguments وطباعة usage على stderr والخروج بـ 1: نفس عادات bash. الـ exit code بيخلي السكربت يتركّب في pipelines و CI.

[[await]] في أعلى الملف شغال في ESM. و [[JSON.stringify(data, null, 2)]] بينسّق بمسافتين، والسطر الجديد في الآخر عادة كويسة.

للسكربتات الأكبر: مكتبة [[commander]] للـ arguments و [[zx]] لتشغيل أوامر شيل من Node بسهولة.`,
            when: "أي أتمتة فيها JSON أو API أو منطق. سكربتات seed و migration.",
            mistakes: "تنسى [[process.exit(1)]] عند الفشل فالـ CI يعتبره نجح. و [[readFileSync]] في سكربت بيعالج ملفات كتير فيبقى بطيء."
          },
          teach: R`## السكربت ده بيعمل إيه

أداة سطر أوامر صغيرة اسمها [[setkey]]: بتاخد ملف JSON واسم مفتاح وقيمة، وبتكتب القيمة في المفتاح. يعني [[./setkey.mjs package.json description "my api"]] بيغيّر الـ description في package.json. هنفكه سطر سطر، وبعدين نشغّله على لينكس (جوه [[node:22-slim]]) وعلى ويندوز.

---

## ١. [[#!/usr/bin/env node]]

السطر ده اسمه **shebang** (من [[#]] = sharp و [[!]] = bang). لما تشغّل ملف مباشرة بـ [[./setkey.mjs]] على لينكس أو الماك، النظام بيبص على أول سطر عشان يعرف يشغّله بإيه.

- [[/usr/bin/env]]: برنامج بيدوّر على الاسم اللي بعده في الـ PATH.
- [[node]]: الاسم اللي بيدوّر عليه.

ليه مش [[#!/usr/local/bin/node]] على طول؟ لأن مكان node بيختلف من جهاز لجهاز (nvm بيحطه في فولدر تاني خالص)، و [[env]] بيلاقيه أينما كان. Node نفسه بيتجاهل السطر ده لما يقرا الملف.

---

## ٢. [[import { readFile, writeFile } from "node:fs/promises";]]

- [[import { ... } from]]: هات الدوال دي بالاسم من المكتبة.
- [[node:fs/promises]]: مكتبة الملفات المبنية في Node، النسخة اللي دوالها بترجع Promise (فتستخدمها مع [[await]]). و [[node:]] في الأول بيقول «دي من Node نفسه، مش من npm».
- الامتداد [[.mjs]] بيقول لـ Node «ده ملف ESM» فـ [[import]] يشتغل من غير [[package.json]] فيه [["type": "module"]].

---

## ٣. [[const [,, file, key, value] = process.argv;]]

[[process.argv]] array فيه كل اللي اتكتب في الأمر. جربنا نطبعه:

~~~bash
node argv.mjs package.json description "my api"
~~~

~~~text الناتج
[
  '/usr/local/bin/node',
  '/work/tool/argv.mjs',
  'package.json',
  'description',
  'my api'
]
~~~

أول عنصرين دايمًا مسار node ومسار السكربت، واللي بعدهم الـ arguments. و [["my api"]] وصلت عنصر واحد لأنها بين علامات تنصيص.

والسطر نفسه **destructuring**: بيفك الـ array لمتغيرات بالترتيب. كل فصلة من غير اسم معناها «فوّت العنصر ده»:

~~~text الترتيب
[ ,          ,           file,          key,           value    ]
  node        السكربت     package.json   description    my api
~~~

ولو العنصر مش موجود، المتغير بيبقى [[undefined]].

---

## ٤. التحقق من الـ arguments

~~~text setkey.mjs
if (!file || !key) {
  console.error("Usage: setkey <file.json> <key> <value>");
  process.exit(1);
}
~~~

- [[!file]]: «file مش موجود» ([[!]] = not، و [[undefined]] بيتحسب false).
- [[||]]: أو. يعني لو أي واحد من الاتنين ناقص.
- [[console.error]]: اطبع على stderr مش stdout، عشان لو حد عامل pipe للناتج، رسالة الخطأ متدخلش فيه.
- [[process.exit(1)]]: اخرج بـ 1 = فشل. ده اللي بيخلي CI أو [[&&]] يعرفوا إن حاجة غلط.

---

## ٥. اقرا وعدّل واكتب

~~~text setkey.mjs
const data = JSON.parse(await readFile(file, "utf8"));
data[key] = value ?? null;
await writeFile(file, JSON.stringify(data, null, 2) + "\n");
console.log("updated", file);
~~~

نفك السطر الأول من جوه لبرة:

| الخطوة | الحتة | بتعمل إيه |
|---|---|---|
| ١ | [[readFile(file, "utf8")]] | اقرا الملف كنص (من غير [[utf8]] بيرجع Buffer bytes) |
| ٢ | [[await]] | استنى القراية تخلص. شغالة في أول الملف من غير async function لأن الملف ESM |
| ٣ | [[JSON.parse(...)]] | حوّل النص لـ object |

- [[data[key] = ...]]: الأقواس المربعة بتخلي اسم المفتاح ييجي من متغير. [[data.key]] كانت هتكتب مفتاح اسمه حرفيًا "key".
- [[value ?? null]]: [[??]] (nullish coalescing) = «لو value [[undefined]] أو [[null]] خد [[null]]». فلو مكتبتش قيمة، المفتاح بيبقى [[null]] بدل ما يختفي.
- [[JSON.stringify(data, null, 2)]]: حوّل الـ object نص. التاني [[null]] مكان دالة فلترة مش محتاجينها، و [[2]] مسافتين للتنسيق.
- [[+ "\n"]]: سطر فاضي في الآخر، زي ما npm والـ editors بيكتبوا الملف.

---

## التشغيل على لينكس

~~~bash
./setkey.mjs package.json description "my api"
~~~

~~~text الناتج
sh: 17: ./setkey.mjs: Permission denied
~~~

exit 126: الملف موجود بس مش «قابل للتنفيذ». [[chmod +x]] بيديله صلاحية التنفيذ ([[x]] = execute):

~~~bash
chmod +x setkey.mjs
./setkey.mjs package.json description "my api"
npm pkg get description
~~~

~~~text الناتج
updated package.json
"my api"
~~~

وجربنا الحالات التانية:

| الأمر | الناتج |
|---|---|
| [[./setkey.mjs]] | [[Usage: setkey <file.json> <key> <value>]] و exit 1 |
| [[./setkey.mjs package.json description my api]] | القيمة بقت [["my"]] بس، لأن من غير تنصيص [[api]] بقت argument رابع واتجاهلت |
| [[./setkey.mjs package.json license]] | [["license": null]] (الـ [[??]] اشتغلت) |
| ملف JSON بايظ | [[SyntaxError: Expected property name or '}' in JSON at position 1]] |
| الملف محفوظ بـ CRLF | [[/usr/bin/env: 'node\r': No such file or directory]] |

الأخير بيحصل لما تكتب السكربت على ويندوز: كل سطر بيخلص بـ [[\r\n]]، فالـ shebang بقى بيدوّر على برنامج اسمه [[node\r]]. احفظه LF.

---

## التشغيل على ويندوز

ويندوز مبيقراش الـ shebang، ومفيش [[chmod]]. شغّله بـ node صريح (جربناه في PowerShell 7 و 5.1):

~~~powershell
node setkey.mjs package.json description "my api"
~~~

~~~text الناتج
updated package.json
~~~

وفي الحالتين [[$LASTEXITCODE]] بيطلع 0 للنجاح و 1 لما الـ arguments ناقصة. والسطر الأول مش بيضر: Node بيتجاهله.

---

## الخلاصة

| السطر | ليه |
|---|---|
| [[#!/usr/bin/env node]] | يتشغّل بـ [[./]] على لينكس والماك |
| [[import ... "node:fs/promises"]] | قراية وكتابة ملفات بـ await |
| [[const [,, file, key, value] = process.argv]] | فوّت node والسكربت وخد الـ arguments |
| [[if (!file || !key) ... process.exit(1)]] | usage على stderr وخروج بفشل |
| [[JSON.parse(await readFile(...))]] | الملف ← object |
| [[data[key] = value ?? null]] | عدّل المفتاح |
| [[writeFile(..., JSON.stringify(data, null, 2) + "\n")]] | اكتبه منسّق |`,
          lines: [
            "دوال الملفات async من مكتبة Node المبنية.",
            "تخطى مسار node والسكربت، وخد الـ arguments التلاتة.",
            "لو الملف أو المفتاح ناقص...",
            "...اطبع الاستخدام على stderr...",
            "...واخرج بفشل.",
            "قفلة.",
            "اقرا الملف وحوّله object.",
            "عدّل المفتاح (null لو مفيش قيمة).",
            "اكتبه منسّق بمسافتين وسطر جديد في الآخر.",
            "اطبع."
          ],
          sol: R`من غير [[chmod +x]]: [[./setkey.mjs ...]] بيقول [[Permission denied]] (exit 126). بعده:

[[./setkey.mjs package.json description "my api"]] بيطبع [[updated package.json]]، و [[npm pkg get description]] بيطبع [["my api"]]. والسطر الأول [[#!/usr/bin/env node]] هو اللي خلّى الـ shell يشغّله بـ node.

من غير arguments: [[Usage: setkey <file.json> <key> <value>]] و exit 1. ولو نسيت علامات التنصيص: [[./setkey.mjs package.json description my api]] حط [["my"]] بس، لأن الـ shell قسم الكلام لـ arguments منفصلة وال script بياخد التالت بس.

الأخطاء التانية: [[env: 'node\r': No such file or directory]] لو الملف اتحفظ بـ CRLF من ويندوز (غيّره لـ LF). و [[SyntaxError: Unexpected token]] لو الملف JSON مش سليم؛ ضيف try/catch حوالين الـ parse لو عايز رسالة أوضح.`
        },
        {
          cmd: "Next.js CLI",
          title: "dev و build و start و standalone",
          desc: "[[next dev]] للتطوير بـ hot reload. [[next build]] بيبني للإنتاج ويطبع جدول الصفحات (static ولا dynamic). [[next start]] بيشغّل الناتج. و [[output: standalone]] بيطلّع فولدر فيه بس اللي التطبيق محتاجه، وده اللي بيتحط في Docker.",
          example: R`npx next dev -p 4000
npx next build
npx next start
npx eslint .
node .next/standalone/server.js`,
          try: "اعمل build واقرا الجدول اللي بيطلع: أنهي صفحات static وأنهي dynamic.",
          deep: {
            why: "Next.js ليه ٣ أوضاع مختلفة تمامًا، والخلط بينهم أشهر سبب لـ «شغال في dev ومش شغال في production».",
            how: R`[[next dev]]: يبني كل صفحة لما تطلبها، مع hot reload وتفاصيل الأخطاء. بطيء ومش للإنتاج أبدًا. و [[-p]] بورت تاني.

[[next build]]: بيبني كل حاجة مرة واحدة: بيحدد أنهي صفحات static (بتتبني دلوقتي كـ HTML) وأنهي dynamic (بتتبني مع كل طلب)، وبيعمل bundle للـ JS ويصغّره، وبيطبع جدول بالـ routes ونوع كل واحد (من Next 16 مبقاش يطبع الأحجام). أخطاء TypeScript اللي dev بيتساهل فيها هنا بتوقف الـ build، أما الـ lint فمن Next 16 مبقاش جزء من الـ build.

[[next start]]: بيشغّل ناتج الـ build. لازم build قبله. ده الإنتاج.

[[output: 'standalone']] في next.config: الـ build بيطلّع [[.next/standalone]] فيه server.js ونسخة مصغّرة من node_modules فيها اللي التطبيق محتاجه بس. الـ image بتصغر من مئات الميجا لعشرات. وبتنسخ [[.next/static]] و [[public]] جنبه بإيدك.

[[next lint]] اتشال في Next 16: شغّل [[eslint .]] مباشرة (أو Biome).`,
            when: "build قبل كل deploy، وشوف الجدول: لو صفحة المفروض static طلعت dynamic، حاجة فيها بتقرا cookies أو headers.",
            mistakes: "[[next dev]] على السيرفر. ومتغيرات البيئة: اللي بتبدأ بـ NEXT_PUBLIC_ بتدخل الـ build (للمتصفح)، فتغييرها محتاج build جديد."
          },
          teach: R`## الأوامر دي بتعمل إيه

مشروع Next.js بيتشغّل بـ ٣ أوضاع: تطوير ([[dev]])، وبناء ([[build]])، وتشغيل الناتج ([[start]])، وجنبهم فحص الكود ([[eslint]]) وتشغيل نسخة [[standalone]]. جربنا الـ ٥ سطور على مشروع جديد من [[create-next-app]] (Next.js 16.3.8) جوه [[node:22-slim]]، وضفنا له ٣ صفحات: [[/about]] عادية، و [[/dashboard]] بتقرا cookie، و [[/api/orders]] route بيرجع JSON.

قبل أي سطر: [[npx]] يعني «شغّل البرنامج ده من [[node_modules/.bin]] بتاع المشروع» (درس «npx»). فـ [[npx next]] بيشغّل نسخة Next اللي في المشروع، مش نسخة متسطبة على الجهاز كله. وفي [[package.json]] نفس الأوامر موجودة كـ scripts: [[npm run dev]] و [[npm run build]] و [[npm start]].

---

## ١. [[npx next dev -p 4000]]

- [[dev]]: وضع التطوير. كل صفحة بتتبني أول ما تطلبها، وأي تعديل في الكود بيظهر في المتصفح لوحده (hot reload).
- [[-p 4000]]: (p = port) اسمع على 4000 بدل 3000 الافتراضي.

~~~text الناتج
▲ Next.js 16.3.8 (Turbopack)
- Local:         http://localhost:4000
- Network:       http://172.23.0.3:4000
✓ Ready in 341ms
 GET /about 200 in 1910ms (next.js: 1768ms, application-code: 142ms)
~~~

- [[Turbopack]]: الـ bundler اللي بيجمّع الكود، وهو الافتراضي في Next 16.
- [[Local]] و [[Network]]: عنوانك على الجهاز، وعنوانك على الشبكة (درس «--host و Network URL»).
- [[GET /about 200 in 1910ms]]: أول طلب للصفحة أخد قرب ٢ ثانية لأن dev بيبنيها ساعتها ([[next.js: 1768ms]] من الوقت ده بناء). عشان كده dev عمره ما يتحط على سيرفر.

---

## ٢. [[npx next build]]

بيبني المشروع كله مرة واحدة للإنتاج: بيعمل type check لـ TypeScript، ويجمّع ويصغّر الـ JavaScript، ويعمل HTML جاهز للصفحات اللي ينفع.

~~~text الناتج
▲ Next.js 16.3.8 (Turbopack)
  Creating an optimized production build ...
✓ Compiled successfully in 3.3s
  Running TypeScript ...
  Finished TypeScript in 2.1s ...
  Collecting page data using 8 workers ...
✓ Generating static pages using 8 workers (7/7) in 497ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ƒ /api/orders
└ ƒ /dashboard

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
~~~

### نقرا الجدول

| الرمز | معناه | عندنا |
|---|---|---|
| [[○]] Static | اتعملت HTML دلوقتي وقت الـ build، وبتتبعت زي ما هي | [[/]] و [[/about]] و [[/_not-found]] (صفحة 404 الجاهزة) |
| [[ƒ]] Dynamic | بتتبني على السيرفر مع كل طلب | [[/dashboard]] و [[/api/orders]] |

ليه [[/dashboard]] طلعت ƒ؟ لأنها بتعمل [[await cookies()]]: كل زائر عنده cookie مختلفة، فمينفعش تتبني مرة واحدة. و [[/api/orders]] ƒ لأن الـ route handler بياخد [[req]] ويقرا منه. لو صفحة كنت متوقعها ○ طلعت ƒ، دوّر فيها على حاجة بتقرا الطلب.

و [[8 workers]] = عدد الـ processes اللي بتبني بالتوازي (على قد الـ cores). ولو فيه خطأ TypeScript، الـ build بيقف عند [[Running TypeScript]] حتى لو dev كان شغال عادي.

---

## ٣. [[npx next start]]

بيشغّل الناتج اللي في فولدر [[.next]]:

~~~text الناتج
▲ Next.js 16.3.8
- Local:         http://localhost:3000
✓ Ready in 142ms
~~~

جربنا الصفحات الـ dynamic:

~~~text الناتج
curl localhost:3000/api/orders                     ->  {"path":"/api/orders","at":1791291852576}
curl localhost:3000/dashboard -H "Cookie: name=Ali" ->  <h1>Hi <!-- -->Ali</h1>
~~~

[[at]] بيتغير مع كل طلب، و [[/dashboard]] قرت الـ cookie، يعني فعلًا بيتبنوا مع كل طلب. ولو مسحت [[.next]] وشغّلت start:

~~~text الناتج
Error: Could not find a production build in the '.next' directory. Try building your app with 'next build' before starting the production server.
~~~

يعني start مالوش لازمة من غير build قبله.

---

## ٤. [[npx eslint .]]

- [[eslint]]: أداة بتقرا الكود وتطلّع أخطاء وعادات وحشة من غير ما تشغّله.
- [[.]]: الفولدر الحالي كله. الإعدادات في [[eslint.config.mjs]] اللي create-next-app عمله.

على المشروع النضيف مطلعش حاجة (exit 0). ضفنا ملف فيه [[const x = 1]] مش مستخدم:

~~~text الناتج
/work/web/app/bad.ts
  1:7  warning  'x' is assigned a value but never used  @typescript-eslint/no-unused-vars

✖ 1 problem (0 errors, 1 warning)
~~~

[[1:7]] = سطر 1 عمود 7، وفي الآخر اسم القاعدة. والـ warning مش بيغيّر الـ exit code (لسه 0)، الـ error بس اللي بيخليه 1 ويوقف CI. وليه مش [[next lint]]؟ اتشال في Next 16، وجربناه:

~~~text الناتج
Invalid project directory provided, no such directory: /work/web/lint
~~~

Next فهم [[lint]] على إنها اسم فولدر، لأن الأمر نفسه مبقاش موجود.

---

## ٥. [[node .next/standalone/server.js]]

ده بيشتغل بس لو [[output: "standalone"]] متحط في [[next.config.ts]]، وبيشغّل التطبيق بـ node مباشرة من غير [[next start]] ومن غير node_modules الكاملة. ده موضوع الدرس الجاي «Next.js standalone» بالتفصيل، ومعاه الملفات اللي لازم تتنسخ جنبه.

---

## الخلاصة

| الأمر | بيعمل إيه | فين |
|---|---|---|
| [[next dev -p 4000]] | يبني كل صفحة لما تتطلب، و hot reload | جهازك بس |
| [[next build]] | يبني كله ويطبع جدول ○ و ƒ | قبل كل deploy، وفي CI |
| [[next start]] | يشغّل ناتج الـ build | السيرفر |
| [[eslint .]] | يفحص الكود | قبل الـ commit وفي CI |
| [[node .next/standalone/server.js]] | يشغّل نسخة standalone | Docker |

- الأوامر نفسها على ويندوز ولينكس والماك، لأنها كلها برامج Node.
- ○ بتتبني مرة، و ƒ مع كل طلب. والجدول ده أول حاجة تبص عليها لما صفحة تعرض داتا قديمة أو تبقى بطيئة.`,
          lines: [
            "تطوير على بورت 4000.",
            "ابني للإنتاج، واقرا الجدول.",
            "شغّل الناتج.",
            "Lint: من Next 16 [[next lint]] اتشال، فبتشغّل ESLint مباشرة.",
            "شغّل نسخة standalone مباشرة (اللي بتتحط في Docker)."
          ],
          sol: R`آخر [[next build]] جدول [[Route (app)]] فيه كل صفحة وقدامها رمز، وتحت الجدول شرح الرموز: [[○ (Static) prerendered as static content]] و [[ƒ (Dynamic) server-rendered on demand]]، وأحيانًا [[● (SSG)]] لصفحات [[generateStaticParams]].

مثلًا [[○ /]] و [[○ /about]] static، و [[ƒ /api/orders]] و [[ƒ /dashboard]] dynamic. الـ static اتعملت HTML وقت الـ build وبتتبعت زي ما هي (سريعة جدًا)، والـ dynamic بتشتغل مع كل طلب.

المفاجأة الشائعة: صفحة كنت فاكرها static طلعت [[ƒ]] لأنها بتقرا [[cookies()]] أو [[headers()]] أو [[searchParams]]، أو بتعمل fetch من غير cache. والعكس: صفحة بتعرض داتا متغيرة طلعت [[○]] فبتعرض نفس الداتا القديمة للكل لحد build جديد. الجدول ده أسرع طريقة تمسك الاتنين قبل الإنتاج.`
        },
        {
          cmd: "Next.js standalone",
          title: "تشغيل Next من غير node_modules كاملة",
          desc: R`[[output: "standalone"]] في next.config بيخلي الـ build يطلّع [[.next/standalone]]: فيه [[server.js]] ونسخة صغيرة من node_modules فيها اللي الكود بيستخدمه فعلًا. تنسخ الفولدر ده للسيرفر أو للـ image وتشغّل [[node server.js]].

بس فيه حاجتين مش بيتنسخوا لوحدهم: [[.next/static]] و [[public]]. من غيرهم الصفحة بتفتح من غير CSS ولا صور.`,
          example: R`# next.config.ts فيه:  output: "standalone"
npm run build
test -d .next/standalone || echo "standalone مطلعش"
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
du -sh node_modules .next/standalone
cd .next/standalone && HOSTNAME=0.0.0.0 PORT=3000 node server.js`,
          try: "فعّل standalone في مشروع Next، وابنيه، وشغّل server.js مرة من غير نسخ static وشوف الصفحة، وبعدين انسخه وقارن. وقارن حجم الفولدر بـ node_modules.",
          deep: {
            why: "الـ image اللي فيها node_modules كاملة بتبقى مئات الميجا، وفيها مكتبات التطوير والـ build. standalone بياخد اللي بيتشغّل بس، فالـ image بتصغر لعشرات الميجا، وبتنزل على السيرفر أسرع، وفيها كود أقل ممكن يبقى فيه ثغرة.",
            how: R`وقت الـ build Next بيتتبّع كل ملف الكود بيعمله import أو require (file tracing)، وبينسخ بس الملفات دي من node_modules لـ [[.next/standalone/node_modules]]، ويكتب [[server.js]] صغير بيشغّل التطبيق من غير [[next start]].

[[static]] و [[public]] متسابين بره عن قصد، على أساس إنك ممكن تحطهم على CDN. لو مش هتعمل كده، انسخهم جنبه زي المثال، وفي Dockerfile ده سطرين [[COPY --from=builder]].

[[server.js]] بيسمع على [[HOSTNAME]] و [[PORT]] من البيئة. جوه Docker، Docker نفسه بيحط HOSTNAME باسم الـ container، فلو نسيت [[HOSTNAME=0.0.0.0]] السيرفر ممكن يسمع على عنوان واحد بس ومش هيرد على الـ healthcheck أو Nginx.

متغيرات [[NEXT_PUBLIC_*]] بتتحط جوه JS وقت الـ build، فلازم تبقى موجودة ساعتها. الباقي (أسرار السيرفر) وقت التشغيل من env_file، مش build args.

و [[basePath: "/myapp"]] جنب standalone لو الموقع هيشتغل تحت مسار فرعي على دومين مشترك.`,
            when: "أي Next.js بيتنشر في Docker أو على VPS من غير Vercel.",
            mistakes: R`في مشروع حقيقي كان .dockerignore فيه [[*.png]] عشان يشيل screenshots من الجذر، فشال معاها صور public ولوجو الموقع، والصور طلعت 404 جوه الـ container بس وعلى الجهاز شغالة. الصح [[/*.png]] للجذر بس. وفي مشروع تاني أسرار زي مفتاح service role و HMAC اتبعتت build args، فاتحفظت في طبقات الـ image وبتبان في docker history. وسطر [[test -d .next/standalone]] جوه RUN بيوقف الـ build بخطأ واضح لو حد شال output من الـ config بالغلط.`
          },
          teach: R`## المثال ده بيعمل إيه

بيبني مشروع Next.js كنسخة standalone: فولدر واحد فيه [[server.js]] والمكتبات اللي التطبيق بيستخدمها فعلًا، وبعدين بينسخ جنبه الملفات اللي مش بتتنسخ لوحدها، ويشغّله. جربنا كل سطر على مشروع [[create-next-app]] (Next.js 16.3.8) جوه [[node:22-slim]].

---

## ٠. السطر الأول تعليق: [[output: "standalone"]]

~~~text next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
~~~

- [[import type { NextConfig }]]: هات «النوع» بس عشان TypeScript يكمّل لك الخيارات ويمسك الغلط، ومش بيدخل الكود اللي بيتشغّل.
- [[output: "standalone"]]: الخيار الوحيد اللي ضفناه. من غيره الـ build مش بيعمل الفولدر خالص.
- [[export default]]: الملف بيصدّر الإعدادات دي، و Next بيقراها وقت الـ build.

---

## ١. [[npm run build]]

بيشغّل [[next build]] من scripts. ومع [[output: "standalone"]] فيه فولدر زيادة بيطلع:

~~~text محتوى .next/standalone
.next          (ملفات السيرفر المبنية)
node_modules   (المكتبات اللي الكود بيستخدمها بس)
package.json
server.js      (السيرفر نفسه)
~~~

---

## ٢. [[test -d .next/standalone || echo "standalone مطلعش"]]

- [[test -d مسار]]: «المسار ده فولدر موجود؟». مبيطبعش حاجة، بيرجّع exit code بس: 0 لو أيوه، 1 لو لأ.
- [[||]]: نفّذ اللي بعدي **لو** اللي قبلي فشل.

جربناه قبل ما نضيف [[output]] وبعده:

~~~text الناتج
standalone مطلعش          قبل
                          بعد (مفيش ناتج = الفولدر موجود)
~~~

في Dockerfile بتكتبه [[RUN test -d .next/standalone]] لوحده، فلو الفولدر مطلعش الـ build كله يقف بخطأ، بدل ما يكمّل ويقع بعدين في [[COPY]] برسالة مش مفهومة.

---

## ٣ و ٤. نسخ [[public]] و [[.next/static]]

~~~bash
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
~~~

- [[cp -r]]: انسخ فولدر بكل اللي جواه ([[-r]] = recursive).
- [[public]]: الصور والملفات اللي بتتطلب بالاسم ([[/next.svg]]).
- [[.next/static]]: ملفات CSS و JavaScript اللي الـ build عملها للمتصفح ([[/_next/static/...]]).

Next سايبهم بره عن قصد، على أساس إنك ممكن ترفعهم على CDN. جربنا السيرفر **قبل** النسخ وبعده:

~~~text الناتج
/_next/static/chunks/33ulxuiua2yyf.css
قبل النسخ:   css 404   svg 404
بعد النسخ:   css 200   svg 200
~~~

قبل النسخ الـ HTML بيوصل، بس من غير CSS ولا صور: الصفحة بتبان «عريانة».

على ويندوز (PowerShell) نفس الخطوتين، وجربناهم على فولدرات تجربة:

~~~powershell
if (-not (Test-Path .next/standalone)) { "standalone مطلعش" }
Copy-Item -Recurse public .next/standalone/
Copy-Item -Recurse .next/static .next/standalone/.next/
~~~

[[Test-Path]] بديل [[test -d]]، و [[Copy-Item -Recurse]] بديل [[cp -r]].

---

## ٥. [[du -sh node_modules .next/standalone]]

- [[du]] (disk usage): حجم الفولدر.
- [[-s]] (summary): رقم واحد للفولدر كله، مش لكل فولدر جواه.
- [[-h]] (human): بالميجا والجيجا.

~~~text الناتج
457M	node_modules
50M	.next/standalone
~~~

٤٥٧ ميجا ضد ٥٠. ليه الفرق ده كله؟ وقت الـ build Next بيتتبّع كل [[import]] الكود بيعمله (file tracing)، وبينسخ الملفات دي بس. [[node_modules]] الكاملة فيها TypeScript و ESLint والـ types وأدوات الـ build، ومحدش منهم بيشتغل وقت الـ request. جوه [[.next/standalone/node_modules]] لقينا ١٢ حاجة بس، منهم [[next]] و [[react]] و [[react-dom]] و [[sharp]] (لتصغير الصور).

---

## ٦. [[cd .next/standalone && HOSTNAME=0.0.0.0 PORT=3000 node server.js]]

| الحتة | معناها |
|---|---|
| [[cd .next/standalone]] | ادخل الفولدر، لأن [[server.js]] بيدوّر على [[public]] و [[.next]] جنبه |
| [[&&]] | لو الـ cd نجح بس |
| [[HOSTNAME=0.0.0.0]] | اسمع على كل كروت الشبكة |
| [[PORT=3000]] | البورت |
| [[node server.js]] | شغّل، من غير [[next]] ولا [[npm]] |

~~~text الناتج
▲ Next.js 16.3.8
- Local:         http://localhost:3000
- Network:       http://0.0.0.0:3000
✓ Ready in 0ms
~~~

### ليه [[HOSTNAME]] مهم جوه Docker؟

Docker بيحط في كل container متغير [[HOSTNAME]] قيمته id الـ container، و [[server.js]] بيسمع على القيمة دي. شغّلناه من غير ما نغيّرها:

~~~text الناتج
HOSTNAME=12ca4821be9d
- Local:         http://12ca4821be9d:3000
localhost 000
byname 200
~~~

السيرفر سامع على اسم الـ container بس، فطلب على [[localhost]] جوه نفس الـ container فشل ([[000]] = curl ملقاش حد يرد)، و healthcheck زي [[curl localhost:3000]] هيفشل. مع [[HOSTNAME=0.0.0.0]] بيرد على أي عنوان.

وفي PowerShell المتغيرين بيتحطوا كده قبل التشغيل:

~~~powershell
$env:HOSTNAME = "0.0.0.0"; $env:PORT = "3000"; node server.js
~~~

---

## الخلاصة

| الخطوة | ليه |
|---|---|
| [[output: "standalone"]] | من غيره الفولدر مش بيطلع |
| [[npm run build]] | يبني ويعمل [[.next/standalone]] |
| [[test -d .next/standalone]] | يوقف الـ build لو الفولدر مطلعش |
| [[cp -r public]] و [[cp -r .next/static]] | من غيرهم مفيش CSS ولا صور (404) |
| [[du -sh]] | ٤٥٧ ميجا ضد ٥٠: ده اللي هيتنشر |
| [[HOSTNAME=0.0.0.0 PORT=3000 node server.js]] | يسمع على كل العناوين جوه الـ container |`,
          lines: [
            "ابني، ومع output standalone بيطلع الفولدر.",
            "اتأكد إن الفولدر طلع فعلًا (في Dockerfile خليها تفشل الـ build).",
            "انسخ public جنب server.js.",
            "وانسخ ملفات static (CSS و JS المبنية).",
            "قارن الحجمين: node_modules كاملة ضد الفولدر اللي هيتنشر.",
            "ادخل الفولدر وشغّل السيرفر يسمع على كل الكروت."
          ],
          sol: R`بعد [[npm run build]] بـ [[output: "standalone"]] هيتعمل [[.next/standalone]] فيه [[server.js]] و [[node_modules]] صغير.

من غير نسخ static: [[node server.js]] بيطبع [[✓ Ready]] والصفحة بتفتح بـ HTML، بس من غير CSS والتفاعل مش شغال، والـ Network في المتصفح مليان 404 على [[/_next/static/...]]، والصور اللي في [[public]] مش ظاهرة. بعد ما تنسخ [[public]] و [[.next/static]] وتعيد التشغيل: كل حاجة ظاهرة.

والحجم: [[du -sh node_modules .next/standalone]] على مشروع عادي بيطلّع node_modules بمئات الميجات والـ standalone بعشرات بس، لأنه فيه الملفات اللي السيرفر فعلًا بيحتاجها. ودا اللي بيخلي الـ Docker image صغيرة.

لو [[.next/standalone]] مطلعش خالص: الـ config مش متقري (اسم الملف غلط، أو [[output]] جوه حاجة تانية)، أو الـ build فشل. ولو السيرفر فتح بس مش قادر توصله من بره الـ container، دا سبب [[HOSTNAME=0.0.0.0]].`
        },
        {
          cmd: "npm publish",
          title: "انشر مكتبة",
          desc: "لو عملت حاجة بتتكرر بين مشاريعك، انشرها كباكدج. [[@scope/name]] باسم حسابك. [[--dry-run]] يوريك إيه اللي هيترفع من غير ما يرفع، ودي مهمة عشان متعملش publish لـ .env.",
          example: R`npm login
npm pack
npm publish --dry-run
npm publish --access public
npm version patch && npm publish`,
          try: "شغّل [[npm pack]] وافتح ملف tgz اللي طلع وشوف إيه اللي كان هيترفع.",
          deep: {
            why: "كود بتنسخه بين مشاريعك (helpers، و client لـ API بتاعك). لما يبقى باكدج، التحديث في مكان واحد، وكل مشروع بيسطّب النسخة اللي يحتاجها.",
            how: R`[[npm login]] مرة. الاسم في package.json لازم يبقى فريد على npm، والـ scoped [[@username/name]] بيضمن ده.

[[npm pack]] بيعمل ملف tgz هو بالظبط اللي هيترفع، من غير رفع. افتحه وشوف: المفروض الكود والـ README و package.json بس. لو لقيت .env أو tests أو src الأصلي، ضبط حقل [[files]] في package.json أو .npmignore.

[[publish --dry-run]] نفس الفكرة بيعرض القايمة. و [[--access public]] لازمة للـ scoped أول مرة، لأن الافتراضي private (وده مدفوع).

[[npm version patch]] بيرفع الرقم في package.json ويعمل commit و tag في Git. minor و major نفسه. ومينفعش تنشر نفس النسخة مرتين.

ونشر على GitHub Packages بدل npm: نفس الأوامر مع registry في .npmrc، ومناسب للباكدجات الخاصة بالشركة.`,
            when: "لما نفس الكود اتنسخ لتالت مشروع.",
            mistakes: "publish من غير dry-run فيترفع .env. ونشر بنسخة 1.0.0 قبل ما الـ API يستقر، بعدها كل تغيير كاسر major."
          },
          teach: R`## الأوامر دي بتعمل إيه

بترفع فولدر مشروعك كباكدج على [[npmjs.com]]، عشان أي مشروع يعمله [[npm install]]. الترتيب: تسجّل دخول، وتشوف إيه اللي هيترفع، وبعدين ترفع، ومع كل تعديل ترفع رقم النسخة. جربنا كل حاجة **ما عدا** الدخول والرفع الحقيقي، على باكدج تجربة اسمها [[@ali/lib]] جوه [[node:22-slim]] (npm 10.9). وحطينا في الفولدر عن قصد ملف [[.env]] فيه سر، و [[debug.log]].

~~~text الفولدر
.env           SECRET=hunter2
README.md
debug.log
index.js       export const add = (a, b) => a + b;
package.json   "name": "@ali/lib", "version": "1.0.0"
~~~

---

## ١. [[npm login]]

بيطبع رابط تفتحه في المتصفح وتسجّل دخول على npmjs.com، وبعدها npm بيحفظ توكن في ملف [[.npmrc]] في فولدر اليوزر بتاعك. مرة واحدة على الجهاز. ده من الـ docs (مسجلناش دخول). من غيره:

~~~text الناتج من npm whoami
npm error code ENEEDAUTH
npm error need auth This command requires you to be logged in.
~~~

---

## ٢. [[npm pack]]

بيعمل بالظبط الملف اللي كان هيترفع، من غير ما يرفع حاجة:

~~~text الناتج
npm notice package: @ali/lib@1.0.0
npm notice Tarball Contents
npm notice 15B .env
npm notice 6B README.md
npm notice 4B debug.log
npm notice 36B index.js
npm notice 222B package.json
npm notice Tarball Details
npm notice name: @ali/lib
npm notice version: 1.0.0
npm notice filename: ali-lib-1.0.0.tgz
npm notice package size: 395 B
npm notice unpacked size: 283 B
npm notice total files: 5
ali-lib-1.0.0.tgz
~~~

| السطر | معناه |
|---|---|
| [[Tarball Contents]] | كل ملف هيترفع وحجمه. **هنا [[.env]] موجود!** |
| [[filename]] | اسم الملف اللي اتعمل. الـ [[@]] و [[/]] بيتشالوا من الاسم |
| [[package size]] | الحجم مضغوط (اللي هيتنزّل) |
| [[unpacked size]] | الحجم بعد فك الضغط |
| [[total files]] | عدد الملفات |

[[tgz]] = ملف [[tar]] مضغوط بـ gzip. نقدر نشوف جواه:

~~~bash
tar tzf ali-lib-1.0.0.tgz
~~~

~~~text الناتج
package/.env
package/index.js
package/package.json
package/debug.log
package/README.md
~~~

[[tar]] بفلاجات: [[t]] (list: اعرض بس)، و [[z]] (gzip)، و [[f]] (الملف اللي بعدي). وكل حاجة جوه فولدر [[package/]]، ده شكل أي باكدج npm.

---

## ٣. [[npm publish --dry-run]]

[[--dry-run]] = «اعمل كل حاجة كأنك بترفع، بس متبعتش». نفس القايمة، وفي الآخر:

~~~text الناتج
npm warn This command requires you to be logged in to https://registry.npmjs.org/ (dry-run)
npm notice Publishing to https://registry.npmjs.org/ with tag latest and default access (dry-run)
+ @ali/lib@1.0.0
~~~

- [[registry.npmjs.org]]: السيرفر اللي هيترفع عليه.
- [[tag latest]]: النسخة دي هتبقى اللي بتتسطّب بـ [[npm install @ali/lib]] من غير رقم.
- [[default access]]: الافتراضي للأسماء اللي بتبدأ بـ [[@]] (scoped) إنها **private**، ودي محتاجة حساب مدفوع. عشان كده السطر الجاي.

### الحل لمشكلة [[.env]]

ضفنا حقل [[files]] في [[package.json]]، وده قايمة «اللي يترفع بس»:

~~~bash
npm pkg set files[0]=index.js
npm pack --dry-run
~~~

~~~text الناتج
npm notice 6B README.md
npm notice 36B index.js
npm notice 255B package.json
npm notice total files: 3
~~~

[[.env]] و [[debug.log]] اختفوا. و [[README.md]] و [[package.json]] (ومعاهم [[LICENSE]] لو موجود) npm بيحطهم دايمًا.

---

## ٤. [[npm publish --access public]]

[[--access public]] بيقول «الباكدج دي عامة». لازمة أول مرة للـ scoped. جربناها بـ [[--dry-run]]:

~~~text الناتج
npm notice Publishing to https://registry.npmjs.org/ with tag latest and public access (dry-run)
~~~

[[default access]] بقت [[public access]]. والرفع الحقيقي من غير [[--dry-run]] مجربناهوش (محتاج حساب، وبيرفع حاجة مبتتمسحش بسهولة).

---

## ٥. [[npm version patch && npm publish]]

رقم النسخة ٣ أجزاء [[major.minor.patch]] (درس «^ و ~ في النسخ»):

| الأمر | من 1.0.0 لـ | إمتى |
|---|---|---|
| [[npm version patch]] | 1.0.1 | صلّحت bug |
| [[npm version minor]] | 1.1.0 | ضفت حاجة من غير ما تكسر القديم |
| [[npm version major]] | 2.0.0 | غيّرت حاجة بتكسر اللي بيستخدمك |

في فولدر Git، جربنا:

~~~text الناتج
$ npm version patch
v1.0.1
$ git log --oneline
19c8158 1.0.1
caed57f init
$ git tag
v1.0.1
~~~

الأمر عمل ٣ حاجات: غيّر [[version]] في [[package.json]] (و [[package-lock.json]] لو موجود)، وعمل commit رسالته رقم النسخة، وعمل tag اسمه [[v1.0.1]]. ولو فيه تعديلات مش متعملها commit بيرفض:

~~~text الناتج
npm error Git working directory not clean.
~~~

و [[&& npm publish]] بيرفع بس لو [[version]] نجح. ومينفعش ترفع نفس الرقم مرتين، فلازم [[version]] قبل كل publish.

---

## الخلاصة

| الأمر | بيعمل إيه | جربناه؟ |
|---|---|---|
| [[npm login]] | تسجيل دخول مرة | لأ، من الـ docs |
| [[npm pack]] | يعمل الـ tgz اللي هيترفع | أيوه |
| [[npm publish --dry-run]] | يعرض القايمة من غير رفع | أيوه |
| [[npm publish --access public]] | يرفع كباكدج عامة | بـ [[--dry-run]] بس |
| [[npm version patch]] | يرفع الرقم + commit + tag | أيوه |

- اعمل [[npm pack]] قبل أول رفع ودوّر على [[.env]] في القايمة.
- [[files]] في package.json أأمن من [[.npmignore]]: بتقول اللي يترفع، مش اللي يتشال.
- الأوامر نفسها على ويندوز ولينكس والماك.`,
          lines: [
            "سجّل دخول على npm.",
            "اعمل tgz هو بالظبط اللي هيترفع، من غير رفع.",
            "اعرض إيه اللي هيترفع.",
            "انشر، و public لازمة للـ scoped أول مرة.",
            "ارفع رقم patch (مع commit و tag) وانشر."
          ],
          sol: R`[[npm pack]] بيطبع [[Tarball Contents]] فيها كل ملف وحجمه، و [[Tarball Details]] ([[name]] و [[version]] و [[package size]] و [[total files]])، وبيعمل ملف زي [[myapp-1.0.0.tgz]]. [[tar tzf myapp-1.0.0.tgz]] بيعرض الملفات تحت [[package/]].

في تجربة على فولدر فيه [[.env]] ومفيش [[.gitignore]] ولا [[files]]: الـ tgz كان فيه [[package/.env]] وملفات لوج كمان. يعني لو عملت publish كان الـ secret هيبقى على npm لأي حد. npm بيستخدم [[.gitignore]] لو مفيش [[.npmignore]]، ولو الاتنين مش موجودين بياخد تقريبًا كل حاجة.

الحل الأأمن: حقل [["files": ["dist"]]] في package.json، فالـ tarball يبقى فيه dist و package.json و README و LICENSE بس. واعمل [[npm pack]] أو [[npm publish --dry-run]] قبل كل نشر.`
        }
      ]
    }
]);
