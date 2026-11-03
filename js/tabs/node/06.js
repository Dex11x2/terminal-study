// تكملة تاب node: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/node/01.js (شرح حقول الدرس في أوله)
MORE("node", [
    {
      t: "الإنتاج والتشخيص",
      l: 3,
      n: "Node على السيرفر: الذاكرة، والإغلاق النضيف، والسكربتات كأدوات",
      projects: [
        { lvl: 'صغير', t: R`endpoint صحة حقيقي`, what: R`[[/health]] بيرجّع [[{ ok, uptime, rssMB, heapUsedMB, version }]] من [[process.uptime()]] و [[process.memoryUsage()]]، و [[/health?deep=1]] بيجرّب حاجة حقيقية (يقرا ملف أو يتصل بالقاعدة) ويرجّع 503 لو فشلت. من درس الذاكرة ودرس node:http.`, done: R`[[curl /health]] بيرجّع JSON فيه الأرقام، ولو مسحت الملف اللي الـ deep check بيقراه بيرجع 503 والسيرفر لسه شغال.` },
        { lvl: 'صغير', t: R`[[setkey]] محترم`, what: R`طوّر [[setkey.mjs]] من درس «سكربت Node كأداة»: القيمة بتتحوّل لرقم أو boolean أو null لو شكلها كده ([[--raw]] يسيبها نص)، والمفاتيح المتداخلة بـ نقطة ([[db.port]])، ويرفض [[__proto__]] و [[constructor]]، ويكتب بأمان (tmp ثم rename).`, done: R`[[setkey c.json db.port 5432]] بيكتب [["port": 5432]] رقم جوه [[db]]، و [[setkey c.json __proto__ x]] بيرفض بـ exit 2، والملف عمره ما بيتبوّظ لو قفلت في النص.` },
        { lvl: 'متوسط', t: R`سيرفر بيقفل صح`, what: R`سيرفر [[node:http]] فيه [[/slow]] بياخد ثانية. على SIGTERM: يبطّل يقبل اتصالات، ويرد [[Connection: close]] على أي request جديد على اتصال قديم، ويستنى اللي شغال، ويقفل الـ idle بـ [[closeIdleConnections()]]، وبعد ١٠ ثواني يخرج بـ 1 مهما حصل. من درس الإغلاق النضيف.`, done: R`في [[docker run]]: request لـ [[/slow]] والـ SIGTERM في النص، الـ client خد [[slow done]] كامل، والسيرفر خرج بـ 0 في أقل من ثانيتين، و request جديد على نفس الاتصال بعد الـ SIGTERM خد رد فيه [[connection: close]].` },
        { lvl: 'متوسط', t: R`مكتبة صغيرة منشورة صح (dry-run)`, what: R`مكتبة فيها [[src/]] و [[test/]] و [[README.md]] و [[.env]] تجريبي. [[files]] و [[exports]] و [[engines]] و [[license]]، و [[prepublishOnly]] بيشغّل الاختبارات، و [[npm pack --dry-run]] مفيهوش غير [[src]] و README و package.json. من درس npm publish.`, done: R`[[npm pack --dry-run]] بيطبع [[total files: 3]] ومفيهوش [[.env]] ولا [[test/]]، و [[npm publish --dry-run]] بيشغّل الاختبارات الأول، واختبار فاشل بيوقف النشر.` },
        { lvl: 'كبير', t: R`صندوق تشخيص لأي سيرفر Node`, what: R`موديول [[diag.mjs]] بتعمله import في أي سيرفر: لوج JSON كل دقيقة فيه الذاكرة و [[monitorEventLoopDelay]] (p50 و max)، و [[SIGUSR2]] (على لينكس) بيعمل heap snapshot في [[./snapshots]]، و [[POST /debug/cpu?seconds=10]] (محمي بتوكن من البيئة) بيشغّل [[inspector]] Profiler ويرجّع [[.cpuprofile]]، وتحذير في اللوج لو الـ heap بيزيد ٥ دقايق ورا بعض. ومعاه README بيشرح إزاي تقرا كل حاجة.`, done: R`على سيرفر فيه leak بالقصد (array بيكبر) اللوج بيطلّع التحذير، والـ snapshot بيتفتح في Chrome DevTools وفيه الـ array فوق، والـ cpuprofile بيوري الدالة البطيئة فوق في [[top.mjs]]، ومن غير التوكن الـ endpoint بيرد 401.`, ext: R`ابعت المقاييس لـ Prometheus بصيغة [[/metrics]]، واعمل dashboard، وقارن قبل وبعد تصليح.` },
        { lvl: 'كبير', t: R`صورة Docker إنتاج لتطبيق Node`, what: R`Dockerfile بمرحلتين ([[npm ci --omit=dev]] في مرحلة، والتشغيل في التانية)، و [[USER node]]، و [[CMD ["node", "server.js"] ]]، و [[HEALTHCHECK]]، و [[.dockerignore]] فيه [[.env]] و [[node_modules]] و [[.git]]، وسكربت [[verify-image.sh]] بيتأكد إن مفيش [[.env]] جوه، و [[whoami]] مش root، و [[docker stop]] أقل من ٣ ثواني، و [[/health]] بيرد. من درس Dockerfile لتطبيق Node.`, done: R`[[verify-image.sh]] بيطبع ٤ سطور «تمام»، ولو شلت [[.env]] من [[.dockerignore]] أو رجّعت [[CMD npm start]] السطر بتاعه بيطلع «غلط» و exit 1.`, ext: R`زوّد GitHub Action بيبني الصورة ويشغّل [[verify-image.sh]] ويرفعها لـ GHCR بالـ tag بتاع الـ commit، وقارن الحجم مع [[node:22-alpine]] أو distroless.` },
        { lvl: 'فكرة', t: R`خلي سيرفر حقيقي عندك جاهز للإنتاج`, what: R`خد سيرفر Node عندك واعمله «مراجعة إنتاج»: [[NODE_ENV]]، والإغلاق النضيف، و [[/health]]، واللوج JSON، والذاكرة تحت حمل ([[autocannon]] أو loop بـ fetch)، و profile لأبطأ endpoint، و Dockerfile. اكتب قبل وبعد بالأرقام.`, done: R`عندك جدول قبل/بعد فيه ٣ أرقام على الأقل (زمن أبطأ endpoint، والذاكرة بعد ١٠٠٠ request، ووقت [[docker stop]]) وكل رقم اتحسّن أو عارف ليه لأ.`, ext: R`اكتبها كـ checklist في README المشروع، وخليها خطوة في CI (مثلًا اختبار بيتأكد إن [[docker stop]] أقل من ٣ ثواني).` },
      ],
      items: [
        {
          cmd: "NODE_ENV=production",
          title: "الوضع اللي التطبيق بيشتغل بيه",
          desc: "مكتبات كتير (Express، وReact) بتتصرف مختلف لما [[NODE_ENV=production]]: كاش أكتر، ورسايل أخطاء أقل تفاصيل (فمتسرّبش معلومات عن الكود)، وأسرع. Node نفسه مش بيحط المتغير ده، فلازم انت تحطه. و [[npm ci --omit=dev]] بيسطّب dependencies الإنتاج بس من غير أدوات التطوير. الاتنين لازمين على السيرفر.",
          example: R`NODE_ENV=production node server.js
npm ci --omit=dev
node -e "console.log(process.env.NODE_ENV)"
npm run build && NODE_ENV=production npm start`,
          try: "شغّل تطبيق Express بـ production ومن غيرها، واعمل error، وقارن الرد.",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** مشروع فيه [[ms]] في dependencies و [[is-number]] في dev. امسح node_modules وشغّل [[NODE_ENV=production npm install]]. إيه اللي هيتسطّب؟`, done: R`[[ms]] بس: npm بيقرا [[NODE_ENV=production]] ويخلي [[omit=dev]] لوحده ([[NODE_ENV=production npm config get omit]] طبع [[dev]]، ومن غيره فاضي).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** على السيرفر كتبوا [[NODE_ENV=prod]]. شغّل [[NODE_ENV=prod npm install]] وشوف node_modules، وبعدين دوّر في الكود على [[=== "production"]].`, done: R`اتسطّب [[is-number]] و [[ms]] الاتنين: [[prod]] مش [[production]] فمفيش أي تأثير، وأي [[if (process.env.NODE_ENV === "production")]] في الكود مش هيدخل. الكلمة لازم بالظبط.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[config.mjs]] بيطبع تحذير على stderr لو [[NODE_ENV]] مش واحدة من [[development]] و [[test]] و [[production]]، ويرمي error لو [[production]] و [[SESSION_SECRET]] مش موجود أو أقل من ٣٢ حرف.`, done: R`[[NODE_ENV=prod]] بيطبع التحذير وبيكمّل، و [[NODE_ENV=production]] من غير السر بيقع برسالة واضحة و exit 1، وبالسر بيشتغل.` },
            { lvl: 'تحدي', t: R`**اشرحها:** اكتب ٣ حاجات بتتغيّر فعلًا لما [[NODE_ENV=production]] (في npm، وفي Express أو React، وفي كودك)، وحاجة واحدة الناس فاكرة إنها بتتغيّر ومبتتغيّرش (أداء Node نفسه).`, done: R`الـ ٣ صح (npm بيسيب dev، و Express بيخبي الـ stack في صفحة الخطأ ويعمل cache للـ views، و React build بيشيل التحذيرات)، وكتبت إن Node نفسه مبيبصّش على المتغير ده.` },
          ],
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
            R`بيحط [[NODE_ENV=production]] في بيئة الأمر ده بس ويشغّل السيرفر، فالمكتبات اللي بتقراه (زي Express) تشتغل بوضع الإنتاج: تكيّش الـ templates ومتطبعش stack trace لليوزر. الشكل ده bash؛ في PowerShell: [[$env:NODE_ENV="production"; node server.js]].`,
            R`بيمسح [[node_modules]] ويسطّب من الـ lock بالظبط، و [[--omit=dev]] بيسيب [[devDependencies]] (TypeScript و nodemon وأدوات الاختبار) لأن السيرفر مش محتاجها، فالتسطيب أصغر وأقل مكتبات ممكن يبقى فيها ثغرات.`,
            R`بيطبع قيمة [[NODE_ENV]] اللي البرنامج هيشوفها فعلًا. لو طبع [[undefined]] يبقى المتغير مش متحدد هنا، لأن Node مش بيحطه لوحده، والمكتبات هتشتغل كأنها في التطوير.`,
            R`[[&&]] معناها «لو الـ build نجح كمّل»، فبتبني نسخة الإنتاج وبعدين تشغّلها بـ [[NODE_ENV=production]]. خلي بالك: لو [[NODE_ENV=production]] متحدد وانت بتعمل [[npm install]]، npm بيسيب [[devDependencies]] لوحده، فالـ build ممكن يقع لأن أدوات زي TypeScript مش متسطبة.`,
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[node -p "require('v8').getHeapStatistics().heap_size_limit"]] على جهازك، وبعدين نفس السطر بـ [[--max-old-space-size=512]].`, done: R`عندنا 4288 MB افتراضي، و 704 MB مع 512 (الحد بيشمل حاجات غير الـ old space). الرقم الافتراضي بيعتمد على RAM الجهاز.` },
            { lvl: 'تطبيق', t: R`**محاكاة:** [[leak.js]] بيزوّد objects في array كل 1ms. شغّله بـ [[--max-old-space-size=64]] واكتب آخر سطر والـ exit code.`, done: R`[[FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory]] وقبله [[Last few GCs]]، و exit 134 على ويندوز ولينكس (abort).` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** [[docker run -m 256m node:22-slim node -p "...heap_size_limit"]] من غير ومع [[-m]]. وبعدين [[leak.js]] جوه [[-m 128m]] بـ [[--max-old-space-size=512]].`, done: R`من غير حد: 4144 MB، ومع [[-m 256m]]: 259 MB (Node 22 بيقرا حد الـ container). ومع الحد 512 والـ container 128: exit 137 من غير ولا رسالة JS، لأن kernel قتله (OOM killer) قبل ما V8 يوصل لحده.` },
            { lvl: 'تحدي', t: R`**ابني:** سيرفر فيه cache في [[Map]] بيكبر مع كل request (leak بالقصد) و endpoint [[/mem]] بيرجّع [[heapUsed]] بالـ MB. ابعتله ٢٠٠٠ request بـ loop من fetch وارسم الرقم كل ٥٠٠. وبعدين حط حد للـ Map (LRU بسيط بـ ١٠٠٠ عنصر) وكرر.`, done: R`من غير حد الرقم بيطلع على طول (اكتب الأربع أرقام)، ومع الحد بيثبت تقريبًا بعد أول ١٠٠٠.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من وثائق Node: [[--heapsnapshot-signal]] و [[--heapsnapshot-near-heap-limit]] و [[v8.writeHeapSnapshot()]]. أنهي واحد بيشتغل على ويندوز؟ جرّب [[v8.writeHeapSnapshot()]] وافتح الملف في Chrome DevTools ← Memory.`, done: R`الملف اتعمل ([[Heap.20261103.190545.17020.0.001.heapsnapshot]]: التاريخ والوقت والـ pid)، واتفتح في DevTools ولقيت الـ array الكبير في Summary مترتب بالـ Retained Size، وكتبت إن الإشارة [[SIGUSR2]] مش موجودة على ويندوز.` },
          ],
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
            R`[[--max-old-space-size]] بيحدد أقصى حجم للـ heap (المكان اللي الـ objects بتتخزن فيه) بالميجا، فـ 4096 يعني حوالي 4 جيجا. لو البرنامج عدّاه بيقع بـ [[FATAL ERROR: Reached heap limit]]. متحطش رقم أكبر من الرام الفعلية، وإلا الجهاز أو الـ container هيقتل العملية.`,
            R`[[NODE_OPTIONS]] متغير بيئة أي عملية node بتقراه، فالإعداد بيوصل لكل node بيتشغّل جوه السكربت (زي [[next build]] أو [[vite build]]) من غير ما تعدّل أوامرهم. مفيد لأنك مش بتشغّل [[node]] بنفسك في الحالة دي. على PowerShell: [[$env:NODE_OPTIONS="--max-old-space-size=4096"]].`,
            R`[[process.memoryUsage()]] بيرجّع الذاكرة بالبايت: [[rss]] كل اللي العملية واخداه من الرام، و [[heapUsed]] اللي الـ objects مستخدماه فعلًا، و [[heapTotal]] اللي اتحجز للـ heap. لو [[heapUsed]] بيزيد مع الوقت ومش بينزل، غالبًا فيه memory leak.`,
            R`[[--heapsnapshot-signal=SIGUSR2]] بيخلي Node يكتب ملف [[.heapsnapshot]] في الفولدر الحالي كل ما يستلم الإشارة دي ([[kill -USR2 <pid>]])، وتفتحه في Chrome DevTools في تاب Memory وتشوف مين ماسك الذاكرة. بياخد وقت ورام وهو بيكتب، ومش شغال على ويندوز.`,
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** سيرفر فيه [[/slow]] بياخد ثانية، و SIGTERM وصل بعد 0.3 ثانية من الطلب. الـ client هياخد الرد؟ والسيرفر هيخرج بإيه؟`, done: R`في [[docker run]]: الـ client خد [[slow done]] كامل، والسيرفر طبع [[closed, exit 0]] وخرج بـ 0 بعد ما الطلب خلص.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** نفس التجربة، والـ client بيستخدم [[http.Agent({ keepAlive: true })]] وبعت request جديد على نفس الاتصال **بعد** الـ SIGTERM. هيترفض؟`, done: R`لأ: [[client: new request ok?!]]. [[server.close()]] بيقفل الباب للاتصالات **الجديدة** بس، والاتصال الـ keep-alive اللي مفتوح لسه بيخدم. السيرفر خرج بعد كده بحوالي ثانية لما الاتصال فضي.` },
            { lvl: 'تطبيق', t: R`**صلّح:** في نفس السيرفر، بعد الـ SIGTERM خلي أي رد يبعت [[Connection: close]] (متغير [[stopping]] و [[res.setHeader]])، ونادي [[server.closeIdleConnections()]].`, done: R`الـ request الجديد على الاتصال القديم خد رده ومعاه [[connection: close]]، والاتصال اتقفل بعده، والسيرفر خرج أسرع من قبل.` },
            { lvl: 'تحدي', t: R`**محاكاة:** [[unhandledRejection]] في نص request: اعمل route بيعمل [[Promise.reject(new Error("db down"))]] من غير await. إيه اللي بيحصل للـ requests التانية الشغالة؟ وقارن بمعالج بيعمل log و [[process.exitCode = 1]] و [[server.close()]] بدل [[process.exit(1)]].`, done: R`من غير معالج: Node 24 وقع على طول و exit 1، والـ requests اللي في النص اتقطعت. مع المعالج اللي بيقفل نضيف: اللي في النص خلصوا، واللوج فيه الخطأ، و exit 1.` },
            { lvl: 'تحدي', t: R`**اشرحها:** ليه [[setTimeout(..., 10000).unref()]] في الإغلاق؟ إيه اللي يحصل من غير [[unref]] لو [[server.close]] خلص في ثانية؟ ومن غير الـ timeout خالص لو client فاتح اتصال؟`, done: R`كتبت إن [[unref]] بيخلي الـ timer ميمنعش الخروج، فلو الإغلاق خلص بدري العملية بتخرج على طول، ومن غير الـ timeout خالص اتصال واحد معلّق ممكن يخلي العملية مستنية لحد ما Docker يقتلها بعد ١٠ ثواني (137).` },
          ],
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
            R`[[app.listen(3000)]] بيرجّع object السيرفر، وبنحفظه في [[server]] عشان نقدر نقول له [[close]] لما ييجي وقت الإغلاق. لو مش حافظه مش هتعرف توقّف استقبال الطلبات.`,
            R`بيسجّل دالة تتنادى لما توصل [[SIGTERM]]، وهي الإشارة اللي Docker و Kubernetes و pm2 بيبعتوها عشان يقولوا «اقفل». من غير listener، Node بيقفل فورًا والطلبات اللي شغالة بتتقطع في النص.`,
            R`بيكتب في اللوج إن الإغلاق بدأ بسبب SIGTERM. لما تراجع اللوج بعد deploy أو restart، السطر ده بيفرق بين إغلاق مقصود و crash.`,
            R`[[server.close]] بيبطّل يقبل اتصالات جديدة ويستنى الطلبات اللي شغالة تخلص، وبعدها بينادي الـ callback اللي بيخرج بـ 0 (نجاح). كده محدش بيوصله رد مقطوع.`,
            R`مهلة أمان: لو فيه طلب أو اتصال معلّق ومخلّصش في 10 ثواني، اخرج بـ 1 غصب عنه. [[unref()]] بيخلي الـ timer ده ميمنعش الخروج لو [[close]] خلص بدري، فالبرنامج ميفضلش مستني الـ 10 ثواني.`,
            R`قفلة الـ listener بتاع [[SIGTERM]].`,
            R`بيسجّل دالة لأي Promise اترفض ومحدش عمله [[catch]]، زي query فشلت في مكان نسيت فيه [[try]]. من Node 15 ده بيوقّع البرنامج لوحده، والـ handler هنا بيضمن إنه يتسجّل بوضوح قبل الخروج.`,
            R`بيكتب الـ error كامل على stderr (الرسالة والـ stack)، فتعرف إيه اللي اترفض ومنين. لو طبعت [[err.message]] بس هتخسر الـ stack اللي بيقولك السطر.`,
            R`بيخرج بـ 1 عشان pm2 أو Docker يعرفوا إن البرنامج وقع ويشغّلوه من جديد بحالة نضيفة. لو كمّلت بعد rejection مش متوقع، البرنامج ممكن يبقى في حالة غلط (اتصال مقفول، داتا ناقصة).`,
            R`قفلة الـ listener بتاع [[unhandledRejection]].`,
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
          cmd: "Dockerfile لتطبيق Node",
          title: "صورة Docker لـ Node: من غير أسرار جواها، ومن غير root، وبتقفل في ثانية",
          desc: R`أغلب Dockerfiles لـ Node اللي بتلاقيها أونلاين أربع سطور: [[FROM node]] و [[COPY . .]] و [[RUN npm install]] و [[CMD npm start]]. وبيشتغلوا. بس قسناهم على تطبيق صغير، والنسخة دي طلع فيها **ملف [[.env]] بالباسورد جوه الصورة**، والتطبيق شغال **root**، و [[docker stop]] بياخد **١٠ ثواني** وبيخرج بـ 137 (اتقتل) لأن الإشارة مبتوصلش لـ Node، وكل تعديل في سطر كود بيعيد [[npm install]] من الأول.

النسخة الصح فيها ٥ حاجات: [[.dockerignore]] بيمنع [[.env]] و [[node_modules]] و [[.git]] من الدخول، و **مرحلتين** (multi-stage): مرحلة بتعمل [[npm ci --omit=dev]] من [[package.json]] و [[package-lock.json]] بس (فالـ layer دي بتتعمل cache طول ما المكتبات متغيّرتش)، ومرحلة التشغيل بتنسخ الناتج. و [[USER node]] (اليوزر ده موجود جاهز في صور node الرسمية). و [[CMD ["node", "server.js"]]] بصيغة exec فـ Node يبقى PID 1 ويستلم SIGTERM. و [[HEALTHCHECK]] بيخلي Docker يعرف التطبيق شغال فعلًا مش بس الـ container.`,
          example: R`FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:22-slim
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
USER node
EXPOSE 3000
HEALTHCHECK --interval=5s --timeout=3s --start-period=5s CMD node -e "fetch('http://127.0.0.1:3000/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
CMD ["node", "server.js"]`,
          lines: [
            R`المرحلة الأولى اسمها [[deps]]، مبنية على [[node:22-slim]] (Debian صغير فيه Node 22 و npm). [[slim]] أصغر بكتير من [[node:22]] الكاملة اللي فيها أدوات build، وأكتر توافق من [[alpine]] مع المكتبات اللي فيها كود native.`,
            R`كل الأوامر الجاية بتشتغل جوه [[/app]]، وبيتعمل لوحده لو مش موجود.`,
            R`بننسخ ملفين بس: [[package.json]] و [[package-lock.json]]. ده سر الـ cache: طول ما الملفين دول متغيّروش، Docker بيعيد استخدام الـ layer اللي بعدهم ومبيعملش install تاني.`,
            R`[[npm ci]] بيسطّب النسخ اللي في الـ lock بالظبط (درس package-lock و npm ci)، و [[--omit=dev]] بيسيب devDependencies (typescript و eslint و vitest مش محتاجينهم في التشغيل).`,
            R`المرحلة التانية: صورة نضيفة من نفس الأساس. أي حاجة اتعملت في [[deps]] ومنسختهاش بإيدك مش هتبقى هنا (كاش npm مثلًا).`,
            R`[[NODE_ENV=production]] لكل الأوامر وللتطبيق نفسه وهو شغال (درس NODE_ENV).`,
            R`نفس الفولدر في المرحلة دي.`,
            R`[[--from=deps]] بينسخ [[node_modules]] الجاهز من المرحلة الأولى.`,
            R`باقي كود التطبيق. ده بيتعمل بعد [[node_modules]] عشان تعديل في الكود يعيد السطر ده بس. و [[.dockerignore]] هو اللي بيمنع [[.env]] و [[node_modules]] بتوع جهازك من الدخول هنا.`,
            R`من هنا ورايح كل حاجة بتشتغل باليوزر [[node]] (uid 1000) مش root. لو حد لقى ثغرة في التطبيق، مش هيبقى root جوه الـ container.`,
            R`توثيق إن التطبيق بيسمع على 3000. مبيفتحش البورت لوحده، لسه محتاج [[-p 3000:3000]] وقت التشغيل.`,
            R`Docker بيشغّل الأمر ده كل ٥ ثواني: سطر Node بيعمل [[fetch]] لـ [[/health]] ويخرج بـ 0 لو الرد ok وبـ 1 لو لأ. بعد ٣ فشلات ورا بعض الـ container بيبقى [[unhealthy]]. [[--start-period]] بيدّي التطبيق وقت يقوم. واستخدمنا Node نفسه عشان صورة slim مفيهاش [[curl]].`,
            R`صيغة exec (array JSON): Docker بيشغّل [[node]] مباشرة كـ PID 1، فـ SIGTERM بتاع [[docker stop]] بيوصل للـ handler بتاعك. الصيغة النص ([[CMD node server.js]]) أو [[npm start]] بيحطوا shell أو npm في النص.`,
          ],
          teach: R`## الصورة بتعمل إيه؟

بتشغّل سيرفر Node صغير ([[server.js]] بـ [[node:http]] و مكتبة [[ms]]، و [[/health]]، ومعالج SIGTERM). بنيناه بطريقتين وقارنّا. كله على Docker Desktop (ويندوز) بـ [[node:22-slim]] (Node 22.23.3)، والصور اتمسحت بعد التجربة بـ [[docker rmi]] بالاسم.

~~~js server.js
const http = require("node:http");
const ms = require("ms");
const server = http.createServer((req, res) => {
  if (req.url === "/health") return res.end("ok");
  res.end("up for " + ms(Math.round(process.uptime() * 1000)) + "\n");
}).listen(3000, "0.0.0.0", () => console.log("listening on 3000 as", require("os").userInfo().username));
process.on("SIGTERM", () => { console.log("SIGTERM, closing"); server.close(() => process.exit(0)); });
~~~

- [[0.0.0.0]] مش [[127.0.0.1]]: جوه الـ container لازم يسمع على كل الكروت عشان [[-p]] يوصله (درس [[--host و Network URL]]).
- وفي الفولدر كمان [[.env]] فيه [[DB_PASSWORD=super-secret-lab]]، و [[is-number]] في devDependencies.

---

## ١. النسخة «اللي في كل حتة»

~~~dockerfile Dockerfile.naive
FROM node:22-slim
WORKDIR /app
COPY . .
RUN npm install
CMD npm start
~~~

~~~bash
docker build -f Dockerfile.naive -t lab-notes:naive .
docker run --rm lab-notes:naive sh -c 'cat .env; whoami; ls node_modules'
~~~

~~~text الناتج
DB_PASSWORD=super-secret-lab
root
is-number ms
~~~

الباسورد جوه الصورة، وأي حد عنده الصورة (registry، أو زميل، أو CI logs) عنده الباسورد. وشغال root. والـ devDependencies جوه.

~~~bash
docker run -d -p 18081:3000 lab-notes:naive
docker stop <id>      # وقسنا الوقت
~~~

~~~text الناتج
stop 10s exit=137
> notes-api@1.0.0 start
> node server.js
listening on 3000 as root
~~~

١٠ ثواني و 137 = Docker استنى ١٠ ثواني وبعدين بعت SIGKILL. واللوج **مفيهوش** [[SIGTERM, closing]]: [[CMD npm start]] بصيغة النص = [[/bin/sh -c "npm start"]]، والـ sh هو PID 1 ومبيبعتش الإشارة لحد.

---

## ٢. النسخة الصح

[[.dockerignore]] جنب الـ Dockerfile:

~~~text .dockerignore
node_modules
.env
.git
npm-debug.log
Dockerfile*
.dockerignore
~~~

والـ Dockerfile اللي في المثال.

~~~text الناتج: نفس الأوامر
cat: .env: No such file or directory
node
ms
...
healthy
stop 0s exit=0
listening on 3000 as node
SIGTERM, closing
~~~

| | naive | الصح |
|---|---|---|
| [[.env]] جوه الصورة | موجود بالباسورد | مش موجود |
| اليوزر | [[root]] | [[node]] |
| devDependencies | [[is-number]] جوه | مش موجودة |
| [[docker stop]] | ١٠ ثواني و exit 137 | صفر ثانية و exit 0 |
| حالة الصحة | [[no healthcheck]] | [[healthy]] |
| الحجم | 329MB | 326MB |

الحجم تقريبًا واحد هنا لأن صورة [[node:22-slim]] نفسها هي معظم الحجم والتطبيق صغير. في مشروع فيه typescript و eslint و vitest الفرق بيبقى مئات الـ MB.

---

## ٣. الـ cache: عدّلنا سطر في [[server.js]] وبنينا تاني

~~~text الصح
#7 [deps 4/4] RUN npm ci --omit=dev
#7 CACHED
good rebuild 1541ms
~~~

~~~text naive
#7 [3/4] COPY . .
#8 [4/4] RUN npm install      ← اتعمل تاني من الأول
naive rebuild 3942ms
~~~

في الـ naive أي تغيير في أي ملف بيبوّظ cache الـ [[COPY . .]] فكل اللي بعده يتعاد، ومنه [[npm install]]. وفي الصح [[package*.json]] متغيّروش فالـ install كله [[CACHED]]. مع مشروع فيه ٥٠٠ مكتبة ده الفرق بين ٥ ثواني و ٣ دقايق في كل build.

---

## ٤. فحص الصورة قبل ما ترفعها

~~~bash
docker run --rm lab-notes:good sh -c 'test ! -e .env && echo "no .env"; whoami'
docker run --rm lab-notes:good node -e "console.log(process.env.NODE_ENV, process.version)"
docker history lab-notes:good --format '{{.Size}}\t{{.CreatedBy}}' | head -8
~~~

~~~text الناتج
no .env
node
production v22.23.3
0B      CMD ["node" "server.js"]
0B      HEALTHCHECK {Test:[CMD-SHELL node -e "fetch(…
0B      USER node
24.6kB  COPY . . # buildkit
36.9kB  COPY /app/node_modules ./node_modules # buil…
~~~

**والأسرار؟** مكانها وقت التشغيل مش وقت البناء: [[docker run --env-file .env]] أو secrets في compose أو المنصة. ومتحطهاش في [[ENV]] أو [[ARG]] في الـ Dockerfile: بتفضل في [[docker history]].

---

## ٥. فخاخ تانية

- [[package-lock.json]] في [[.dockerignore]] بالغلط: الـ [[COPY]] بيقع بـ [["/package-lock.json": not found]] (جرّبناها). ولو نسخت [[package.json]] بس، [[npm ci]] بيقع بـ [[EUSAGE]] (درس package-lock و npm ci).
- مكتبة فيها كود native (bcrypt، sharp): لو بنيتها على ويندوز ونسخت [[node_modules]] للـ container هتقع، وده سبب [[node_modules]] في [[.dockerignore]] و [[npm ci]] جوه.
- [[node --watch]] في صورة الإنتاج: لأ (درس [[node --watch --env-file]]).
- [[--max-old-space-size]] أكبر من ذاكرة الـ container: kernel بيقتله بـ 137 من غير رسالة (درس الذاكرة).
- Next.js: استخدم [[output: "standalone"]] وانسخ [[.next/standalone]] و [[static]] و [[public]] بس (درس Next.js standalone).

## الخلاصة

[[.dockerignore]] + مرحلتين + [[npm ci --omit=dev]] من الـ lock + [[USER node]] + [[CMD ["node", ...] ]] + [[HEALTHCHECK]]. وبعد كل build: [[.env]] مش موجود، و [[whoami]] مش root، و [[docker stop]] أقل من ٣ ثواني.`,
          try: R`في مشروع Node صغير عندك (أو [[server.js]] اللي في الشرح مع [[npm i ms@2.1.3]])، اعمل [[Dockerfile.naive]] والـ Dockerfile اللي في المثال و [[.dockerignore]]، وابنيهم الاتنين. شغّل [[cat .env]] و [[whoami]] جوه كل واحد، وقيس [[docker stop]] بـ [[Measure-Command]] أو [[time]]. وبعدين امسح الصورتين بالاسم بـ [[docker rmi lab-notes:naive lab-notes:good]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صورة مبنية بـ [[COPY . .]] ومفيش [[.dockerignore]] والفولدر فيه [[.env]]. [[docker run --rm img cat .env]] هيطبع إيه؟`, done: R`طبع [[DB_PASSWORD=super-secret-lab]]: الملف جوه الصورة. وبعد [[.dockerignore]] فيه [[.env]]: [[cat: .env: No such file or directory]].` },
            { lvl: 'سريع', t: R`**قارن وقيس:** [[CMD npm start]] مقابل [[CMD ["node", "server.js"]]] والسيرفر فيه معالج SIGTERM. وقت [[docker stop]] والـ exit code واللوج؟`, done: R`naive: ١٠ ثواني و 137 ومفيش [[SIGTERM, closing]] في اللوج. الصح: صفر ثانية و 0 و [[SIGTERM, closing]] موجود.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** عدّل سطر في [[server.js]] وابني الصورتين تاني بـ [[--progress=plain]]. مين عمل [[npm install]] تاني؟ وكام ms؟`, done: R`الصح: [[RUN npm ci --omit=dev]] و [[CACHED]] و 1541ms. الـ naive: [[RUN npm install]] اتنفّذ تاني و 3942ms. وفي مشروعك الحقيقي اكتب الرقمين بتوعك.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[.dockerignore]] فيه [[package-lock.json]] بالغلط (حد كان عايز يصغّر الـ context). ابني واقرا الخطأ.`, done: R`البناء وقع قبل npm أصلًا، عند [[COPY package.json package-lock.json ./]]: [[ERROR: failed to calculate checksum ... "/package-lock.json": not found]]، وقبله تحذير [[CopyIgnoredFile: Attempting to Copy file "package-lock.json" that is excluded by .dockerignore]]. شلت السطر من [[.dockerignore]] وعدّى. (ولو كنت نسخت [[package.json]] بس، [[npm ci]] كان هيقع بـ [[EUSAGE]].)` },
            { lvl: 'تحدي', t: R`**ابني:** [[verify-image.sh <image>]] بيشغّل ٤ فحوصات: مفيش [[.env]]، و [[whoami]] مش root، و [[/health]] بيرد في أقل من ١٠ ثواني بعد التشغيل، و [[docker stop]] أقل من ٣ ثواني. كل فحص بسطر، و exit 1 لو أي واحد فشل.`, done: R`على [[lab-notes:good]] الأربعة «تمام» و exit 0، وعلى [[lab-notes:naive]] تلاتة فشلوا (.env و root و stop) و exit 1، والسكربت بيمسح الـ container بتاعه في الآخر حتى لو فشل.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من وثائق Docker: [[--init]] بيعمل إيه؟ وليه مع [[CMD ["node", ...] ]] ومعالج SIGTERM مش محتاجه غالبًا، وإمتى تحتاجه (zombie processes من child_process)؟`, done: R`كتبت إن [[--init]] بيحط tini كـ PID 1 بيوزّع الإشارات ويلم الـ zombies، وإن تجربة درس SIGINT و SIGTERM طلّعت ١١ ثانية من غير handler وصفر مع [[--init]]، وإن تطبيق بيعمل [[spawn]] كتير يستفيد منه حتى مع handler.` },
          ],
          deep: {
            why: R`الـ Dockerfile بيتكتب مرة ويتنسخ لكل مشروع، فالغلطة فيه بتتكرر في كل مكان: أسرار في صور على registry، وتطبيقات root، و deploy بيستنى ١٠ ثواني في كل container (وفي rolling deploy على ١٠ containers ده دقيقتين)، و CI بيعيد [[npm install]] كل مرة.`,
            how: R`كل سطر في الـ Dockerfile بيعمل layer، و Docker بيعيد استخدام الـ layer لو السطر نفسه والملفات اللي بيعملها [[COPY]] متغيّروش، ولو تغيّر بيعيد السطر ده وكل اللي بعده. عشان كده الحاجات اللي بتتغيّر قليل (المكتبات) فوق، والكثيرة التغيير (الكود) تحت. و multi-stage بيبني أكتر من صورة في ملف واحد، والصورة النهائية فيها الـ layers بتاعة آخر مرحلة بس. و [[.dockerignore]] بيتطبّق على الـ build context قبل ما يتبعت لـ Docker، فالملف المستبعد مش موجود أصلًا لأي [[COPY]]. و PID 1 في Linux ليه وضع خاص: الإشارات اللي مالهاش handler بتتجاهل بدل ما تقتله، فـ Node من غير معالج SIGTERM مبيقفلش، و [[sh -c]] كـ PID 1 مبيبعتش الإشارة لأولاده.`,
            when: R`أي تطبيق Node هيتنشر في container: Railway أو Fly أو Render أو Kubernetes أو VPS بـ compose. وللـ dev ممكن تستخدم compose بـ volume و [[--watch]] بدل الصورة دي. ولو التطبيق Next.js استخدم standalone بنفس المبادئ.`,
            mistakes: R`[[COPY . .]] قبل [[npm ci]] (الـ cache بيبوظ مع أي تعديل). ومفيش [[.dockerignore]] ([[.env]] و [[node_modules]] بتاع ويندوز جوه). و [[npm install]] بدل [[npm ci]]. و [[CMD npm start]] أو صيغة النص. و root. وأسرار في [[ENV]] أو [[ARG]]. و [[FROM node:latest]] من غير رقم (نسخة Node بتتغيّر لوحدها). و [[127.0.0.1]] في [[listen]]. و [[HEALTHCHECK]] بـ [[curl]] في صورة مفيهاش curl.`,
          },
          sol: R`النتايج كلها في جدول الشرح: الـ naive فيه [[.env]] و root و [[is-number]] و stop ١٠ ثواني و 137، والصح من غير [[.env]] و [[node]] و stop صفر ثانية و exit 0 و [[healthy]]، والحجم 329MB مقابل 326MB، والـ rebuild بعد تعديل سطر 3942ms مقابل 1541ms.`,
          solCode: R`# قيس وقت الـ stop والـ exit code
id=$(docker run -d -p 18081:3000 lab-notes:good)
sleep 8
docker inspect -f '{{.State.Health.Status}}' $id
time docker stop $id
docker inspect -f '{{.State.ExitCode}}' $id
docker rm $id
docker rmi lab-notes:naive lab-notes:good`,
          flag: "script",
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[node --inspect=127.0.0.1:9339 app.js]]: إيه أول سطرين هيطلعوا؟ وإيه اللي يحصل لو البورت مشغول؟`, done: R`[[Debugger listening on ws://127.0.0.1:9339/<uuid>]] و [[For help, see: https://nodejs.org/learn/getting-started/debugging]]. ولو البورت مشغول: [[Starting inspector on 127.0.0.1:9340 failed: address already in use]] والبرنامج **بيكمّل** من غير debugger.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** ١١ listener على EventEmitter من غير وبـ [[--trace-warnings]]. الفرق في الناتج؟`, done: R`من غيره: الـ warning وسطر [[(Use node --trace-warnings ...)]]. ومعاه: نفس الـ warning ومعاه stack ([[at warnMaxListenersExceeded]] وبعدين السطر بتاعك) عشان تعرف مين زوّد الـ listener.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** recursion عمقها ٣٠ بترمي error. كام سطر [[at f]] هيطلع افتراضي؟ وبـ [[--stack-trace-limit=50]]؟`, done: R`افتراضي: 10 (الحد). بـ 50: سطرين بس ومعاهم [[... collapsed 29 duplicate lines matching above 1 lines 29 times...]]: Node 22 و 24 بيضغطوا التكرار.` },
            { lvl: 'تحدي', t: R`**ابني:** [[.vscode/launch.json]] فيه config بـ [[type: "node"]] و [[request: "launch"]] و [[envFile]]، وconfig تاني [[attach]] على 9229. حط breakpoint شرطي ([[id === 42]]) في loop على ١٠٠ عنصر.`, done: R`F5 وقف عند العنصر 42 بس، وقريت المتغيرات في Variables، والـ attach اشتغل على سيرفر شغال بـ [[--inspect]].` },
            { lvl: 'تحدي', t: R`**اشرحها:** ليه [[--inspect=0.0.0.0:9229]] على سيرفر خطر؟ وإزاي توصل لـ debugger على سيرفر بعيد من غير ما تفتح البورت للعالم؟`, done: R`كتبت إن أي حد يوصل للبورت يقدر يشغّل أي كود جوه العملية (remote code execution)، والحل [[ssh -L 9229:127.0.0.1:9229 server]] والسيرفر سامع على 127.0.0.1 بس.` },
          ],
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
            R`[[--inspect]] بيشغّل السيرفر ويفتح بورت 9229 على [[127.0.0.1]] للـ debugger، فتفتح [[chrome://inspect]] في Chrome أو تعمل attach من VS Code وتحط breakpoints وتشوف المتغيرات. البرنامج بيشتغل عادي لحد ما يوصل breakpoint.`,
            R`[[--inspect-brk]] زي [[--inspect]] بس بيوقف قبل أول سطر في الكود ويستنى الـ debugger يتوصل. مفيد لما المشكلة بتحصل وقت التشغيل على طول، قبل ما تلحق تتوصل.`,
            R`[[0.0.0.0:9229]] بيخلي الـ debugger يسمع على كل كروت الشبكة، ودي لازمة جوه Docker عشان توصل له من جهازك. خطر: أي حد يوصل للبورت ده يقدر ينفّذ أي كود على السيرفر، فمتعملهاش على سيرفر عام، وانشر البورت على [[127.0.0.1]] بس.`,
            R`[[--trace-warnings]] بيطبع stack trace مع كل warning (زي [[DeprecationWarning]] أو [[MaxListenersExceededWarning]])، فتعرف أنهي سطر أو مكتبة عملته بدل رسالة من غير مكان. ده نفس اللي الرسالة نفسها بتقولك تعمله: [[Use node --trace-warnings]].`,
            R`[[--stack-trace-limit=50]] بيخلي الـ errors تطبع لحد 50 سطر من الـ stack بدل 10 بس (الافتراضي). مفيد لما الـ error جاي من جوه مكتبة والـ 10 سطور كلهم جوه [[node_modules]] ومفيهمش سطر من كودك.`,
          ],
          sol: R`[[node --inspect server.js]] بيطبع [[Debugger listening on ws://127.0.0.1:9229/...]] و [[For help, see: https://nodejs.org/en/docs/inspector]]. في [[chrome://inspect]] تحت Remote Target هيظهر [[server.js]] وجنبه [[inspect]]. تدوس عليه تفتح DevTools.

لما تطلب الـ route من المتصفح أو curl، التنفيذ بيقف على سطر [[debugger;]] والطلب نفسه بيفضل مستني. في DevTools تقدر تشوف [[req.params]] و [[req.body]] في Scope، وتحط mouse على أي متغير، وتكمّل بـ F8. وفي الترمنال هيبان [[Debugger attached.]].

لو الكود ما وقفش: DevTools مش مفتوح (الـ [[debugger;]] بيتجاهل من غير debugger متوصل)، أو السيرفر ما اتعملوش restart بعد ما ضفت السطر. ولو [[chrome://inspect]] مش شايف حاجة، دوس Configure واتأكد إن [[localhost:9229]] موجود. ومتشغّلش [[--inspect=0.0.0.0]] على سيرفر مفتوح؛ أي حد يوصل للبورت يقدر ينفذ كود.`
        },
        {
          cmd: "--cpu-prof و profiling",
          title: "الكود بطيء: اعرف أنهي دالة بالظبط بدل ما تخمّن",
          desc: R`لما حاجة بطيئة، أول غلطة إنك تخمّن وتغيّر. الـ profiler بيقولك الوقت راح فين بالأرقام: Node كل كام microsecond بيبص «الـ thread بيعمل إيه دلوقتي؟» ويسجّل اسم الدالة، وفي الآخر الدالة اللي اتسجّلت أكتر هي اللي واخدة الوقت.

[[node --cpu-prof app.mjs]] بيشغّل السكربت عادي، ولما يخلص بيكتب ملف [[.cpuprofile]] (JSON) في الفولدر. الملف ده بيتفتح في Chrome DevTools (تاب Performance أو JavaScript Profiler) كـ **flame graph**، أو تقراه بسكربت صغير يطبعلك أكتر ٥ دوال. [[--cpu-prof-dir]] و [[--cpu-prof-name]] بيحددوا مكانه واسمه.

وفيه طريقة أقدم: [[node --prof]] بيكتب [[isolate-*.log]]، و [[node --prof-process]] بيحوّله لتقرير نصي فيه الدوال الداخلية بتاعة V8 كمان (زي [[ArrayIncludesSmiOrObject]] اللي هتشوفه تحت). و [[--heap-prof]] نفس الفكرة للذاكرة: مين بيعمل allocate أكتر.`,
          example: R`node --cpu-prof app.mjs
node --cpu-prof --cpu-prof-dir=profiles --cpu-prof-name=slow.cpuprofile app.mjs
node top.mjs profiles/slow.cpuprofile
node --prof app.mjs
node --prof-process isolate-0x1234-v8.log
node --heap-prof app.mjs`,
          lines: [
            R`شغّل [[app.mjs]] وسجّل profile للـ CPU طول ما هو شغال. لما يخلص بيكتب ملف اسمه زي [[CPU.20261103.190016.31316.0.001.cpuprofile]] (التاريخ والوقت والـ pid) في الفولدر الحالي.`,
            R`نفس الحاجة بس انت اللي بتختار الفولدر ([[--cpu-prof-dir]]، وبيتعمل لوحده لو مش موجود) والاسم ([[--cpu-prof-name]])، عشان متتوهش وسط ملفات كتير ولا تمسح واحد بالغلط.`,
            R`[[top.mjs]] سكربت صغير (في الشرح) بيقرا الـ JSON ويجمع الوقت لكل دالة ويطبع أكتر ٥. بديل سريع للـ flame graph لما تكون على سيرفر من غير متصفح.`,
            R`الطريقة القديمة: [[--prof]] بيكتب لوج بتاع V8 اسمه [[isolate-<عنوان>-v8.log]]، فيه كل tick (عينة) مع اسم الدالة.`,
            R`[[--prof-process]] بيقرا اللوج ده ويطبع تقرير نصي: «Bottom up» بيوري أكتر حاجة واخدة ticks ومين ناداها. حط اسم الملف بالظبط (في PowerShell [[isolate-*.log]] مبيتفكّش، شوف الشرح).`,
            R`[[--heap-prof]] بيسجّل مين بيحجز ذاكرة، ويكتب [[Heap.*.heapprofile]] بيتفتح في DevTools ← Memory. ده للـ «السكربت بياكل RAM» مش للـ «السكربت بطيء».`,
          ],
          teach: R`## السكربت بيعمل إيه؟

[[app.mjs]] بيشيل التكرار من ٤٠ ألف اسم بطريقتين: [[slowUnique]] بـ [[includes]] (بتدوّر في الـ array كله لكل عنصر)، و [[fastUnique]] بـ [[Set]]. هنعمل profile ونشوف هل الأداة هتمسك الدالة الصح. كل الأرقام من Node 24.22.1 على ويندوز ١١ و Node 22.23.3 في Docker.

~~~js app.mjs
function slowUnique(list) {
  const out = [];
  for (const x of list) if (!out.includes(x)) out.push(x);
  return out;
}
function fastUnique(list) {
  return [...new Set(list)];
}
const ids = Array.from({ length: 40_000 }, (_, i) => "user-" + (i % 20_000));
const fn = process.argv[2] === "fast" ? fastUnique : slowUnique;
console.time(fn.name);
const unique = fn(ids);
console.timeEnd(fn.name);
console.log("unique:", unique.length);
~~~

~~~text اتشغّل
node app.mjs        →  slowUnique: 928.539ms   unique: 20000
node app.mjs fast   →  fastUnique: 4.447ms     unique: 20000
~~~

نفس النتيجة، والفرق حوالي ٢٠٠ مرة. بس في مشروع حقيقي مش هتبقى عارف إن [[slowUnique]] هي المشكلة. ده شغل الـ profiler.

---

## ١. [[--cpu-prof]] واقرا الملف بنفسك

~~~js top.mjs
import { readFileSync, readdirSync } from "node:fs";
const file = process.argv[2] ?? readdirSync(".").filter((f) => f.endsWith(".cpuprofile")).sort().at(-1);
const prof = JSON.parse(readFileSync(file, "utf8"));
const self = new Map();
const byId = new Map(prof.nodes.map((n) => [n.id, n]));
prof.samples.forEach((id, i) => {
  const { functionName, url, lineNumber } = byId.get(id).callFrame;
  const key = (functionName || "(anonymous)") + " " + (url.split("/").at(-1) || "") + ":" + (lineNumber + 1);
  self.set(key, (self.get(key) ?? 0) + prof.timeDeltas[i] / 1000);
});
const total = [...self.values()].reduce((a, b) => a + b, 0);
console.log("file:", file, "total ms:", Math.round(total));
for (const [k, ms] of [...self].sort((a, b) => b[1] - a[1]).slice(0, 5)) console.log(String(Math.round(ms)).padStart(6), "ms", (ms / total * 100).toFixed(1).padStart(5) + "%", k);
~~~

شكل الملف: [[nodes]] شجرة الدوال (كل node ليه [[id]] و [[callFrame]] فيه اسم الدالة والملف والسطر)، و [[samples]] لستة بالـ [[id]] اللي كان شغال في كل عينة، و [[timeDeltas]] الوقت بين كل عينة واللي قبلها بالـ microseconds. فالوقت «الذاتي» (self time) لكل دالة = مجموع الـ deltas بتاعة العينات اللي هي كانت فيها.

~~~text اتشغّل: node --cpu-prof --cpu-prof-name=slow.cpuprofile app.mjs && node top.mjs slow.cpuprofile
file: slow.cpuprofile total ms: 847
   806 ms  95.1% slowUnique app.mjs:1
    13 ms   1.5% (program) :0
     4 ms   0.5% (anonymous) app.mjs:1
     3 ms   0.4% lstat :0
     3 ms   0.4% (garbage collector) :0
~~~

~~~text على لينكس (Docker)
   742 ms  96.2% slowUnique app.mjs:1
    10 ms   1.3% (program) :0
~~~

الأداة قالت بالظبط: ٩٥٪ من الوقت في [[slowUnique]] سطر 1. و [[(program)]] شغل Node نفسه، و [[(garbage collector)]] تنضيف الذاكرة. ولو الـ GC طلع فوق، يبقى المشكلة إنك بتعمل objects كتير مش إن الحساب تقيل.

والملف الافتراضي (من غير [[--cpu-prof-name]]) اسمه [[CPU.20261103.190016.31316.0.001.cpuprofile]]، وحجمه هنا ٢٠ KB تقريبًا.

---

## ٢. افتحه كـ flame graph

Chrome ← [[F12]] ← تاب **Performance** ← زرار «Load profile» (السهم لفوق) ← اختار الملف. هتلاقي عمود عريض اسمه [[slowUnique]]: العرض = الوقت. والأعمدة اللي فوقه الدوال اللي هو ناداها. (VS Code كمان بيفتح [[.cpuprofile]] لو دوست عليه.)

---

## ٣. [[--prof]]: ليه بيقولك أكتر

~~~text اتشغّل في Docker: node --prof app.mjs && node --prof-process isolate*.log
 [Bottom up (heavy) profile]:
   ticks parent  name
    741   88.0%  Builtin: ArrayIncludesSmiOrObject
    641   86.5%    JS: *slowUnique file:///w/app.mjs:1:20
~~~

هنا بيقولك إن الوقت مش في كود [[slowUnique]] نفسه، في **[[Array.prototype.includes]]** اللي جوه V8 ([[Builtin]])، والنجمة [[*slowUnique]] معناها إن الدالة اتعملها optimize. ده بيوصلك للحل على طول: [[includes]] على array كبير = O(n) لكل عنصر = O(n²) كلها، و [[Set]] بيدوّر في O(1).

> **على ويندوز:** [[--prof]] طلّع ٤١ tick بس (بدل ٧٤١ على لينكس) لنفس الشغل: العينات أقل بكتير. النسب لسه صح (٨٩٪ في نفس الدالة)، بس الـ [[--cpu-prof]] أدق. و PowerShell مبيفكّش [[isolate-*.log]] لـ node: [[node --prof-process isolate-*.log]] طلّع [[Cannot access log file: isolate-*.log]]. الحل: [[node --prof-process (Get-ChildItem isolate-*.log)[0].Name]].

---

## ٤. profile لسيرفر شغال

[[--cpu-prof]] بيكتب الملف لما العملية **تخلص**. لسيرفر:

1. شغّله بـ [[node --cpu-prof server.mjs]].
2. ابعتله حمل (loop بـ [[fetch]] أو [[npx autocannon]]).
3. اقفله بـ Ctrl+C، **بشرط** يكون فيه [[process.on("SIGINT", () => process.exit(0))]]. جرّبناها في Docker: من غير handler العملية خرجت بـ 130 والملف **مااتكتبش** خالص (ولا الفولدر اتعمل)، ومع الـ handler خرجت بـ 0 والملف اتكتب.

أو من غير restart: [[node --inspect server.mjs]] وافتح [[chrome://inspect]] ← Profiler ← Start/Stop في أي وقت (درس [[الـ debugger]]).

---

## ٥. الطريقة كلها في ٥ خطوات

| الخطوة | بتعمل إيه |
|---|---|
| قيس الأول | [[console.time]] أو [[performance.now()]] حوالين الحتة المشكوك فيها، عشان يبقى عندك رقم قبل |
| profile | [[--cpu-prof]] على نفس الشغل بالظبط |
| اقرا | أكبر self time: دالة بتاعتك؟ builtin؟ GC؟ |
| صلّح حاجة واحدة | الحل بيبقى غالبًا خوارزمية أو cache، مش «micro-optimization» |
| قيس تاني | نفس الأمر، والرقم الجديد جنب القديم (928ms ← 4ms) |

## الخلاصة

- متخمّنش: [[--cpu-prof]] واقرا أكبر self time.
- [[(garbage collector)]] عالي = objects كتير. Builtin عالي = استخدام غلط لحاجة جاهزة ([[includes]] في loop).
- لسيرفر: [[--inspect]] و Profiler في DevTools، أو [[--cpu-prof]] واقفل بـ SIGINT.
- البطء اللي سببه «استنا» (قاعدة أو API) مش هيبان في CPU profile. ده درس [[event loop]] و [[Promise.all]].`,
          try: R`احفظ [[app.mjs]] و [[top.mjs]] من الشرح، وشغّل [[node --cpu-prof --cpu-prof-name=slow.cpuprofile app.mjs]] و [[node top.mjs slow.cpuprofile]]. وبعدين نفس الحاجة بـ [[fast]] واسم [[fast.cpuprofile]] وقارن الـ total. وافتح [[slow.cpuprofile]] في Chrome ← Performance.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[node --cpu-prof app.mjs]] من غير [[--cpu-prof-name]]. اسم الملف هيبقى شكله إيه؟ وهيتكتب إمتى؟`, done: R`زي [[CPU.20261103.190016.31316.0.001.cpuprofile]] (تاريخ ووقت و pid)، وبيتكتب لما العملية تخلص مش وهي شغالة.` },
            { lvl: 'سريع', t: R`**قارن وقيس:** [[top.mjs]] على [[slow.cpuprofile]] و [[fast.cpuprofile]]. الـ total كام في كل واحد؟ وأول سطر في الـ fast إيه؟`, done: R`slow: حوالي 847ms و ٩٥٪ في [[slowUnique]]. fast: حوالي 41ms وأول سطر [[(program)]]: الكود بتاعك مبقاش ظاهر أصلًا.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** في PowerShell [[node --prof-process isolate-*.log]] وقع. اقرا الرسالة وصلّحه.`, done: R`الرسالة [[Cannot access log file: isolate-*.log]] و [[Please provide a valid isolate file as the final argument.]]، والحل [[node --prof-process (Get-ChildItem isolate-*.log)[0].Name]] وطلع [[Builtin: ArrayIncludesSmiOrObject]] فوق.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** اعمل profile لسكربت حقيقي عندك (build، أو import CSV، أو script بيقرا ملفات) واكتب أكبر ٣ دوال بالـ self time، وقول كل واحدة بتاعتك ولا من مكتبة ولا من Node.`, done: R`عندك ٣ سطور من [[top.mjs]] أو من DevTools، ولكل واحد جملة «ده من ...»، ولو [[(garbage collector)]] فوق ٢٠٪ كتبت ليه.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[app2.mjs]] بيعمل [[JSON.parse(JSON.stringify(obj))]] لـ object كبير ٥٠٠ مرة جوه loop عشان ينسخه. اعمل profile، ولاقي البديل ([[structuredClone]] أو إنك متنسخش خالص)، وقيس قبل وبعد.`, done: R`الـ profile طلّع [[stringify]] و [[parse]] فوق، والبديل نزّل الوقت برقم مكتوب (قبل وبعد بالـ ms)، وكتبت إن الأحسن غالبًا تبطّل تنسخ.` },
            { lvl: 'تحدي', t: R`**ابني:** [[profile-server.mjs]]: بيشغّل [[server.mjs]] بـ [[--cpu-prof]] كـ child، ويبعتله ٥٠٠ request بـ [[fetch]]، ويقفله بـ SIGINT، ويشغّل [[top.mjs]] على الملف اللي اتعمل. كله بأمر واحد.`, done: R`أمر واحد طبع جدول أكبر ٥ دوال من السيرفر، والـ route البطيء (اعمله بالقصد بـ loop) طلع أول واحد. (على ويندوز SIGINT من [[child.kill]] مبيتمسكش، فقفّل السيرفر من جوه بـ route [[/stop]] بيعمل [[process.exit(0)]].)` },
          ],
          deep: {
            why: R`«الموقع بطيء» من غير رقم بيخليك تغيّر حاجات عشوائية: تكبّر السيرفر، وتغيّر مكتبة، وتعمل cache في المكان الغلط. الـ profile بيدّيك الدالة والسطر في دقيقة، وفي أغلب الحالات المشكلة حاجة واحدة واضحة (loop جوه loop، أو regex، أو [[JSON]] لحاجة ضخمة، أو sync I/O).`,
            how: R`[[--cpu-prof]] بيشغّل الـ V8 CPU profiler (نفس اللي في DevTools) من أول العملية: كل حوالي ١٠٠٠ microsecond (قابل للتغيير بـ [[--cpu-prof-interval]]) بيوقّف الـ thread لحظة ويسجّل الـ call stack كله. في الآخر بيكتب [[.cpuprofile]]: شجرة [[nodes]] (كل دالة في مكان معين في الشجرة)، و [[samples]] (أنهي node كان فوق في كل عينة)، و [[timeDeltas]]. والـ self time = الوقت والدالة دي فوق الـ stack نفسها، والـ total time = وهي في أي مكان في الـ stack (هي أو أي حاجة نادتها). أما [[--prof]] فبيستخدم الـ tick processor بتاع V8 وبيسجّل كمان الـ builtins و C++، وده اللي خلّى [[ArrayIncludesSmiOrObject]] تبان.`,
            when: R`سكربت أو build بياخد وقت أكتر من المتوقع، و endpoint معين بطيء والـ event loop delay عالي (درس event loop)، وقبل ما تختار بين مكتبتين على أساس «أسرع». ومش لما البطء استنا شبكة أو قاعدة: ده بيبان في الـ tracing واللوج بالأوقات، مش في CPU profile.`,
            mistakes: R`تعمل profile لحاجة قصيرة جدًا (٥٠ms) فالعينات قليلة ومش معبّرة. أو على Debug build مختلف عن الإنتاج. أو تبص على total time وتلوم [[main]] أو الـ router. أو تصلّح ٣ حاجات مرة واحدة ومتعرفش مين اللي فرق. أو تنسى إن [[--cpu-prof]] بيكتب في الخروج الطبيعي بس، فتقفل السيرفر بـ Ctrl+C من غير SIGINT handler (أو [[kill -9]]) ومفيش ملف. أو تسيب ملفات profile فيها أسامي ومسارات في الريبو.`,
          },
          sol: R`[[slowUnique]]: حوالي 928ms، و [[top.mjs]] طلّعها ٩٥.١٪ (806 من 847ms). [[fastUnique]]: حوالي 4ms، والـ profile الكلي 41ms وأوله [[(program)]]. و [[--prof-process]] في Docker طلّع [[Builtin: ArrayIncludesSmiOrObject]] ٨٨٪ تحتها [[*slowUnique]].`,
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`import { writeFileSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
writeFileSync("app.mjs", 'function slowUnique(list) { const out = []; for (const x of list) if (!out.includes(x)) out.push(x); return out; }\nconst ids = Array.from({ length: 30000 }, (_, i) => "u" + (i % 15000));\nconsole.log("unique:", slowUnique(ids).length);\n');
const r = spawnSync(process.execPath, ["--cpu-prof", "--cpu-prof-name=p.cpuprofile", "app.mjs"], { encoding: "utf8" });
console.log(r.stdout.trim());
const prof = JSON.parse(readFileSync("p.cpuprofile", "utf8"));
const byId = new Map(prof.nodes.map((n) => [n.id, n]));
const self = new Map();
prof.samples.forEach((id, i) => { const name = byId.get(id).callFrame.functionName || "(anonymous)"; self.set(name, (self.get(name) ?? 0) + prof.timeDeltas[i]); });
console.log("top:", [...self].sort((a, b) => b[1] - a[1])[0][0]);`, expect: [R`unique: 15000`, R`top: slowUnique`] },
          ],
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[node setkey.mjs c.json port 4000]] والملف فيه [[{"port":3000}]]. شكل الملف بعدها؟`, done: R`[["port": "4000"]] بعلامات تنصيص: كل حاجة من [[process.argv]] نص. الكود اللي هيقرا الـ config ده ممكن يعمل [["4000" + 1]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[node setkey.mjs c.json __proto__ x]] طبع [[updated c.json]]. افتح الملف: اتغيّر؟ وليه ده خطر في أداة بتاخد مفاتيح من برا؟`, done: R`الملف زي ما هو ومفيش [[__proto__]] فيه: [[data["__proto__"] = "x"]] حاول يغيّر الـ prototype مش يضيف مفتاح. ومع object كـ قيمة ده prototype pollution. الحل ترفض [[__proto__]] و [[constructor]] و [[prototype]].` },
            { lvl: 'تطبيق', t: R`**ابني:** حوّل القيمة: [["4000"]] ← 4000، و [["true"]] ← true، و [["null"]] ← null، و أي حاجة تانية نص، و [[--raw]] يسيبها نص دايمًا. استخدم [[parseArgs]].`, done: R`[[setkey c.json port 4000]] بيكتب رقم، و [[setkey c.json port 4000 --raw]] بيكتب نص، و [[setkey c.json name 007]] بيكتب [["007"]] (قررت إن الأصفار في الأول تفضل نص وكتبت ليه).` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** شغّل [[./setkey.mjs]] (بالـ shebang) من Git Bash، ومن PowerShell، ومن [[docker run --rm -v ... node:22-slim]] بعد [[chmod +x]]. مين اشتغل؟`, done: R`Git Bash ولينكس اشتغلوا بالـ shebang، و PowerShell لأ (ويندوز مبيفهمش [[#!]]): الحل [[node setkey.mjs]] أو [[bin]] في package.json فـ npm يعمل [[setkey.cmd]] (درس npm publish).` },
          ],
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
| [[./setkey.mjs package.json license]] | [["license": null]]: مفيش قيمة، فالـ [[??]] حطت [[null]] بدل [[undefined]] (اللي [[JSON.stringify]] كان هيشيل المفتاح بسببها) |
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
| [[JSON.parse(await readFile(...))]] | اقرا الملف كنص وحوّله object، ولو الـ JSON بايظ يرمي [[SyntaxError]] |
| [[data[key] = value ?? null]] | عدّل المفتاح اللي اسمه في [[key]] (أو ضيفه لو مش موجود)، و [[null]] لو مفيش قيمة |
| [[writeFile(..., JSON.stringify(data, null, 2) + "\n")]] | اكتبه تاني منسّق بمسافتين وسطر جديد في الآخر، فالـ diff في git يبقى نضيف |`,
          lines: [
            R`بيجيب [[readFile]] و [[writeFile]] من نسخة الملفات اللي بترجّع Promise، عشان نقرا ونكتب بـ [[await]] في أول مستوى في الملف (شغالة لأن الملف ESM [[.mjs]]).`,
            R`[[process.argv]] فيه مسار node، ومسار السكربت، وبعدهم اللي اليوزر كتبه. الفاصلتين [[,,]] في الأول بيفوّتوا أول عنصرين، والباقي يتحط في [[file]] و [[key]] و [[value]]. أي واحد مش مكتوب بيبقى [[undefined]].`,
            R`لو اسم الملف أو المفتاح مش موجود، السكربت مش هيعرف يعمل حاجة، فبنتأكد الأول قبل ما نلمس أي ملف. [[value]] مش متشيّك هنا لأن من غيرها هنحط [[null]].`,
            R`[[console.error]] بيكتب طريقة الاستخدام على stderr، فتبان في الترمنال حتى لو اليوزر حوّل الناتج لملف، ومش بتختلط بالناتج. ده الشكل المعتاد لأدوات سطر الأوامر.`,
            R`بيخرج فورًا بـ 1 (فشل)، فلو السكربت جوه سكربت تاني أو CI، اللي بيناديه يعرف إنه مكمّلش ويقف. من غير السطر ده الكود هيكمّل ويقع بـ error غريب في [[readFile(undefined)]].`,
            R`قفلة الـ [[if]].`,
            R`بيقرا الملف كنص ([[utf8]]) ويحوّله object بـ [[JSON.parse]]. لو الملف مش موجود بيقع بـ [[ENOENT]]، ولو JSON بايظ بـ [[SyntaxError]] ومكان الغلطة، وفي الحالتين مفيش حاجة بتتكتب.`,
            R`بيحط القيمة في المفتاح اللي اسمه في [[key]] (أو يضيفه لو مش موجود). الأقواس في [[data[key] = ...]] مش [[data.key]] لأن اسم المفتاح جوه متغير، و [[data.key]] كانت هتكتب مفتاح اسمه [[key]] حرفيًا. و [[?? null]] لأن [[undefined]] بيختفي من الـ JSON خالص، إنما [[null]] بيتكتب.`,
            R`بيكتب الـ object تاني في نفس الملف منسّق بمسافتين ([[2]]) وبسطر جديد في الآخر، فالملف يفضل مقروء والـ diff في git يبين السطر اللي اتغير بس. القيمة دايمًا بتتكتب نص لأنها جاية من سطر الأوامر، فـ [[3000]] هتتكتب بين علامتين تنصيص مش رقم.`,
            R`بيطبع إن الملف اتعدّل ([[updated package.json]] مثلًا)، فاليوزر يعرف إن الأداة خلصت بنجاح. على stdout عشان ده ناتج عادي مش error.`,
          ],
          sol: R`من غير [[chmod +x]]: [[./setkey.mjs ...]] بيقول [[Permission denied]] (exit 126). بعده:

[[./setkey.mjs package.json description "my api"]] بيطبع [[updated package.json]]، و [[npm pkg get description]] بيطبع [["my api"]]. والسطر الأول [[#!/usr/bin/env node]] هو اللي خلّى الـ shell يشغّله بـ node.

من غير arguments: [[Usage: setkey <file.json> <key> <value>]] و exit 1. ولو نسيت علامات التنصيص: [[./setkey.mjs package.json description my api]] حط [["my"]] بس، لأن الـ shell قسم الكلام لـ arguments منفصلة وال script بياخد التالت بس.

الأخطاء التانية: [[env: 'node\r': No such file or directory]] لو الملف اتحفظ بـ CRLF من ويندوز (غيّره لـ LF). و [[SyntaxError: Unexpected token]] لو الملف JSON مش سليم؛ ضيف try/catch حوالين الـ parse لو عايز رسالة أوضح.`
        },
        {
          cmd: "جدولة مهام: setInterval و node-cron",
          title: "مهمة كل ٥ دقايق أو كل يوم ٩ الصبح: من غير ما تتداخل ولا توقّع السيرفر",
          desc: R`أول حاجة بتيجي في بالك لمهمة متكررة [[setInterval(job, 60_000)]]. وبتشتغل، لحد ما المهمة تاخد وقت أطول من الفترة: [[setInterval]] **مبيستناش** المهمة اللي قبلها تخلص، فبيبدأ نسخة تانية وتالتة فوق بعض. قسناها: مهمة بتاخد ٢.٥ ثانية كل ثانية = ٣ نسخ شغالين مع بعض.

الحل الأبسط من غير مكتبة: **loop بيستنى**: [[while]] فيه [[await job()]] جوه [[try/catch]] وبعدين [[await sleep(...)]]. المهمة عمرها ما بتتداخل مع نفسها، والخطأ مبيوقّفش الجدولة، و [[AbortController]] بيوقّفها نضيف.

ولما الميعاد ساعة معينة ([[كل يوم 9:00]] أو [[أول كل شهر]]) استخدم صيغة cron: خمس خانات (دقيقة ساعة يوم شهر يوم-الأسبوع). [[node-cron]] (4.6.0) بيفهمها، وفيه [[noOverlap: true]] و [[timezone]]. والأهم من الأداة: المهمة اللي بتتجدول جوه السيرفر بتتنفّذ **مرة لكل نسخة شغالة** من السيرفر، ومبتتنفّذش خالص وهو واقع.`,
          example: R`import { setTimeout as sleep } from "node:timers/promises";

const EVERY_MS = 5000;
const ac = new AbortController();
process.on("SIGINT", () => ac.abort());
process.on("SIGTERM", () => ac.abort());

async function sendReport() {
  console.log(new Date().toISOString().slice(11, 19), "sending report");
  await sleep(1500);
}

while (!ac.signal.aborted) {
  const started = Date.now();
  try {
    await sendReport();
  } catch (err) {
    console.error("report failed:", err.message);
  }
  const wait = Math.max(0, EVERY_MS - (Date.now() - started));
  await sleep(wait, null, { signal: ac.signal }).catch(() => {});
}
console.log("stopped cleanly");`,
          lines: [
            R`[[setTimeout]] نسخة الـ promise من [[node:timers/promises]] وسمّيناها [[sleep]]: [[await sleep(1000)]] بتستنى ثانية من غير ما توقّف الـ event loop. وبتقبل [[signal]] عشان نلغيها.`,
            R`كل قد إيه المهمة تبدأ: ٥ ثواني (من بداية المرة اللي فاتت لبداية المرة الجاية).`,
            R`[[AbortController]] زرار إيقاف: لما نعمل [[ac.abort()]]، [[ac.signal.aborted]] بيبقى [[true]] وأي [[sleep]] مستني بالـ signal ده بيتلغى فورًا.`,
            R`Ctrl+C بيدوس الزرار بدل ما يقتل العملية في نص المهمة.`,
            R`و SIGTERM (من Docker أو systemd أو pm2) نفس الحاجة (درس SIGINT و SIGTERM).`,
            R`المهمة نفسها: هنا بتطبع الوقت ([[HH:MM:SS]] من الـ ISO) وبتمثّل شغل بياخد ١.٥ ثانية. في الحقيقة: تقرير، أو تنضيف، أو مزامنة.`,
            R`[[toISOString()]] بيرجّع [[2026-11-03T17:06:40.123Z]]، و [[slice(11, 19)]] بياخد الوقت بس. (ده UTC، شوف الشرح عن المناطق الزمنية.)`,
            R`الاستنا اللي بيمثّل الشغل.`,
            R`قفلة [[sendReport]].`,
            R`اللف لحد ما حد يدوس الزرار.`,
            R`بنسجّل إمتى المرة دي بدأت، عشان نحسب نستنى قد إيه بعدها.`,
            R`try حوالين المهمة: لو رمت error المرة دي، الجدولة متقفش ونجرّب المرة الجاية.`,
            R`[[await]]: الـ loop مش هيكمّل لحد ما المهمة تخلص، فمستحيل نسختين يشتغلوا مع بعض.`,
            R`أي خطأ بيتمسك هنا.`,
            R`بنطبع السبب ونكمّل. في الإنتاج: لوج JSON، وعدّاد فشل، وتنبيه لو فشلت كذا مرة ورا بعض.`,
            R`قفلة الـ try/catch.`,
            R`نستنى اللي فاضل من الـ ٥ ثواني بعد ما نطرح وقت المهمة نفسها، و [[Math.max(0, ...)]] عشان لو المهمة خدت أكتر من ٥ ثواني منستناش رقم سالب (نبدأ على طول).`,
            R`[[sleep]] بالـ signal: لو جه Ctrl+C في النص بترمي [[AbortError]] فورًا، و [[.catch(() => {})]] بيبلعه عشان الـ loop يلاقي [[aborted]] ويخرج.`,
            R`قفلة الـ loop.`,
            R`بنطبع إننا خرجنا نضيف، والعملية بتخلص بـ exit 0 لأن مفيش حاجة فاضلة.`,
          ],
          teach: R`## السكربت بيعمل إيه؟

بيبعت «تقرير» كل ٥ ثواني، وكل تقرير بياخد ١.٥ ثانية، ولما تدوس Ctrl+C أو يجيله SIGTERM بيقف بعد ما المهمة الحالية تخلص من غير ما يستنى الـ ٥ ثواني. الأرقام من Node 24.22.1 (ويندوز) و Node 22.23.3 في Docker.

~~~text اتشغّل في Docker، و kill -INT بعد ١٢ ثانية
17:06:40 sending report
17:06:45 sending report
17:06:50 sending report
stopped cleanly
exit=0
~~~

البداية كل ٥ ثواني بالظبط رغم إن المهمة بتاخد ١.٥: لأننا بنطرح وقتها من الاستنا.

---

## ١. مشكلة [[setInterval]]: قسناها

~~~js drift.mjs
let running = 0, runs = 0;
async function job() {
  runs++; running++;
  console.log(at(), "start #" + runs, "running now:", running);
  await sleep(2500);
  running--;
}
setInterval(job, 1000);
~~~

~~~text الناتج
1.0s start #1 running now: 1
2.0s start #2 running now: 2
3.0s start #3 running now: 3
4.0s start #4 running now: 3
~~~

٣ نسخ من نفس المهمة شغالين مع بعض. لو المهمة بتبعت إيميلات، كل يوزر هياخد ٣. ولو بتكتب في نفس الملف، اتبوّظ (درس fs/promises: ٢٠ كتابة مع بعض طلّعت 1 أو 2 بدل 20). ولو بتاخد ذاكرة، العملية هتقع. وفحص الدرس الأوتوماتيك بيقيس ده: [[setInterval peak: 3]] و [[loop peak: 1]].

---

## ٢. خطأ واحد ميوقّفش الجدولة

~~~text نسخة فيها throw في المرة التانية
0.0s run #1
2.5s run #2
2.5s run #2 failed: API down
3.5s run #3
~~~

من غير [[try/catch]] جوه الـ loop، أول [[throw]] كان هيطلع برا الـ [[while]] ويقفل السكربت (أو unhandled rejection مع [[setInterval]] ويوقّع السيرفر كله على Node 15+).

---

## ٣. مواعيد بالساعة: صيغة cron و node-cron

~~~text الخمس خانات (وفي node-cron خانة سادسة اختيارية للثواني في الأول)
┌───────── دقيقة (0-59)
│ ┌─────── ساعة (0-23)
│ │ ┌───── يوم في الشهر (1-31)
│ │ │ ┌─── شهر (1-12)
│ │ │ │ ┌─ يوم في الأسبوع (0-7، و 0 و 7 الحد)
│ │ │ │ │
0 9 * * *        كل يوم 9:00
*/15 * * * *     كل ربع ساعة
0 9 * * 0-4      9:00 من الحد للخميس
0 3 1 * *        3 الفجر أول كل شهر
~~~

~~~bash
npm i node-cron@4.6.0
~~~

~~~js nc.mjs
import cron from "node-cron";
console.log("valid:", cron.validate("*/2 * * * * *"), cron.validate("61 * * * *"));
const task = cron.schedule("* * * * * *", async () => {
  runs++; console.log(at(), "tick #" + runs);
  await new Promise((r) => setTimeout(r, 2500));
}, { noOverlap: true, timezone: "Africa/Cairo" });
~~~

~~~text الناتج (٦.٥ ثانية)
valid: true false
0.7s tick #1
[NODE-CRON] [WARN] task still running, new execution blocked by overlap prevention!
[NODE-CRON] [WARN] task still running, new execution blocked by overlap prevention!
3.7s tick #2
...
6.5s stopped after 2 runs
~~~

- [[validate]] بيمسك الصيغة الغلط قبل ما تشغّل (61 دقيقة مش موجودة).
- [[noOverlap: true]] بيعمل اللي الـ loop بتاعنا بيعمله: المهمة الجاية مبتبدأش والقديمة شغالة، وبيكتب warning.
- [[timezone]] مهم جدًا على السيرفر: السيرفرات غالبًا UTC.

~~~text اتشغّل: getNextRun لنفس الصيغة "0 9 * * *"
timezone Africa/Cairo  →  2026-11-04T07:00:00.000Z
timezone UTC           →  2026-11-04T09:00:00.000Z
~~~

«9 الصبح» في القاهرة = 7:00 UTC في نوفمبر (EET، UTC+2)، وفي الصيف بيبقى UTC+3. من غير [[timezone]] السيرفر هيبعت التقرير 11 الصبح بتوقيت القاهرة في نوفمبر.

---

## ٤. السؤال الأهم: المهمة دي مكانها فين؟

| المكان | كويس في | مشكلته |
|---|---|---|
| جوه سيرفر Node (loop أو node-cron) | مهام صغيرة ومرتبطة بالتطبيق، و cache refresh | بتتنفّذ **مرة لكل نسخة**: ٣ replicas = ٣ تقارير. وبتضيع وهو واقع |
| process لوحده (worker) | مهام تقيلة، ونسخة واحدة بس | لسه محتاج حد يتأكد إنه شغال (pm2، systemd، Docker restart) |
| cron أو systemd timer على السيرفر | سكربت [[node report.mjs]] بيشتغل ويخلص | محتاج exit code صح ولوج (تاب bash: [[crontab]] و systemd timers) |
| GitHub Actions [[schedule]] أو cloud scheduler | مهام مش محتاجة السيرفر بتاعك | ممكن يتأخر دقايق، وأقل فترة ٥ دقايق في Actions |

ولو لازم جوه التطبيق و فيه أكتر من نسخة: lock مشترك (صف في القاعدة بـ [[UPDATE ... WHERE locked_until < now()]]، أو Redis [[SET NX PX]])، فنسخة واحدة بس تاخد الدور.

---

## ٥. المهام اللي فاتت

السيرفر وقع من 8:50 لـ 9:10، فتقرير 9:00 مااتبعتش، ولا [[setInterval]] ولا node-cron هيفتكروه. الحل: احفظ [[lastRun]] (ملف أو قاعدة)، ولما السيرفر يقوم شوف لو آخر مرة أقدم من الفترة نفّذ مرة على طول. وخلّي المهمة **idempotent**: تشغيلها مرتين لنفس اليوم ميبعتش التقرير مرتين (درس «إعادة الإرسال والتكرار» في وحدة الـ webhooks بنفس الفكرة).

## الخلاصة

- [[setInterval]] مع مهمة async = تداخل. استخدم loop بـ [[await]] أو [[noOverlap]].
- [[try/catch]] جوه، و [[AbortController]] للإيقاف النضيف.
- مواعيد بالساعة: cron و [[timezone]]، واتأكد بـ [[getNextRun()]].
- نسخ كتير من السيرفر = المهمة بتتكرر. نسخة واقعة = المهمة بتضيع. فكّر فين مكانها قبل ما تكتبها.`,
          try: R`احفظ المثال كـ [[sched.mjs]] وشغّله ١٥ ثانية واتأكد إن البداية كل ٥ ثواني. بعدين خلي [[sendReport]] تنام ٧ ثواني بدل ١.٥ وشوف الفترة بقت كام. وبعدين اعمل [[drift.mjs]] بـ [[setInterval]] وعدّ أقصى [[running now]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[setInterval(job, 1000)]] و [[job]] بتاخد ٢.٥ ثانية. بعد ٤ ثواني كام نسخة هتبقى شغالة مع بعض؟`, done: R`٣: [[start #3 running now: 3]] و [[start #4 running now: 3]] (الأولى خلصت عند ٣.٥ ثانية).` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه ناتج [[cron.validate("*/2 * * * * *")]] و [[cron.validate("61 * * * *")]]؟ وصيغة «كل يوم 9 الصبح من الحد للخميس»؟`, done: R`[[true]] و [[false]]، والصيغة [[0 9 * * 0-4]].` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** [[getNextRun()]] لـ [[0 9 * * *]] مرة بـ [[timezone: "Africa/Cairo"]] ومرة بـ [[UTC]]. الفرق كام ساعة؟ وليه هيتغيّر في الصيف؟`, done: R`[[2026-11-04T07:00:00.000Z]] مقابل [[09:00]]: ساعتين في نوفمبر (EET)، وفي الصيف ٣ (EEST)، و node-cron بيحسبها لوحده لما تديه اسم المنطقة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[setInterval(async () => { await sync(); }, 60_000)]] و [[sync]] بترمي error مرة كل شوية. إيه اللي بيحصل على Node 24؟ حوّلها للـ loop اللي في المثال.`, done: R`الـ rejection مالوش catch فالسيرفر كله وقع بـ exit 1. في الـ loop: الخطأ اتطبع والمرة اللي بعدها اشتغلت عادي.` },
            { lvl: 'تحدي', t: R`**محاكاة:** شغّل نفس سكربت الجدولة في ٣ ترمنالات (كأنهم ٣ replicas)، وخلي المهمة تكتب سطر في [[sent.log]]. وبعدين زوّد lock بملف: [[open("job.lock", "wx")]] (بيفشل بـ EEXIST لو موجود) ومعاه وقت انتهاء.`, done: R`من غير lock: كل دورة فيها ٣ سطور في [[sent.log]]. مع الـ lock: سطر واحد في كل دورة، والـ lock القديم (أقدم من الفترة) بيتمسح عشان نسخة ماتت متقفلش الدنيا.` },
            { lvl: 'تحدي', t: R`**ابني:** [[daily.mjs]] بيحفظ [[lastRun]] في [[state.json]]، ولما يقوم لو آخر مرة أقدم من ٢٤ ساعة ينفّذ على طول، وبعدين كل يوم 9:00 القاهرة بـ node-cron و [[noOverlap]]، وبيكتب في state بعد النجاح بس.`, done: R`لو عدّلت [[lastRun]] لأمبارح الصبح وشغّلته بينفّذ على طول، ولو شغّلته تاني في نفس الدقيقة مبينفّذش، ولو المهمة فشلت [[lastRun]] مبيتغيّرش فبيجرّب المرة الجاية.` },
          ],
          deep: {
            why: R`كل تطبيق حقيقي فيه شغل بيتكرر: تقارير، وتنضيف sessions قديمة، وتذكيرات، ومزامنة مع API تاني، وتجديد tokens. والغلطات فيه مبتبانش في التطوير (نسخة واحدة، والمهمة سريعة، والجهاز بتوقيت القاهرة) وبتبان في الإنتاج: إيميلات مكررة، وتقرير في الميعاد الغلط، ومهام ضاعت.`,
            how: R`[[setInterval]] بيحط timer بيتكرر في مرحلة الـ timers في الـ event loop، ومبيعرفش حاجة عن الـ promise اللي الدالة رجّعتها، فبيناديها تاني في ميعادها مهما حصل. والـ loop بـ [[await]] بيخلي النداء الجاي مايتعملش غير بعد ما الـ promise يخلص. و node-cron بيحسب الميعاد الجاي من الصيغة والمنطقة الزمنية (بـ Intl)، وبيعمل [[setTimeout]] لحد الميعاد ده، ومع [[noOverlap]] بيتأكد إن الـ promise اللي قبلها خلص. والـ timers كلها في الذاكرة، فلو العملية وقفت كل الجدول ضاع، وعشان كده [[lastRun]] لازم يتحفظ برا.`,
            when: R`loop بـ [[await]]: مهمة كل فترة ثابتة جوه process (polling، و cache refresh). node-cron: مواعيد بالساعة أو اليوم جوه تطبيق نسخة واحدة. cron أو systemd timer: سكربت بيشتغل ويخلص على سيرفر واحد. GitHub Actions أو cloud scheduler: مهام خفيفة مش محتاجة سيرفرك. وطابور (BullMQ وغيره) لما محتاج retries وأولوية وأكتر من worker.`,
            mistakes: R`[[setInterval]] مع async. ومفيش [[try/catch]] فأول خطأ يوقّع السيرفر. ومواعيد من غير [[timezone]] على سيرفر UTC. ونفس المهمة في كل replica. ومفيش [[lastRun]] فالمهام وقت الـ deploy أو الـ crash بتضيع. ومهمة مش idempotent بتبعت مرتين بعد retry. و [[setInterval]] بفترة أكبر من ٢٤.٨ يوم (أكبر من [[2147483647]] ms بيتحوّل لـ 1ms!).`,
          },
          sol: R`[[sched.mjs]] بيبدأ كل ٥ ثواني بالظبط ([[17:06:40]] و [[45]] و [[50]]) و Ctrl+C أو SIGTERM بيطبع [[stopped cleanly]] و exit 0. مع مهمة ٧ ثواني الفترة بقت ٧ ثواني (الـ wait = 0) ومفيش تداخل. و [[drift.mjs]] بـ [[setInterval]] وصل [[running now: 3]].`,
          solCode: R`// drift.mjs: setInterval مع مهمة أطول من الفترة
import { setTimeout as sleep } from "node:timers/promises";
const t0 = Date.now(); const at = () => ((Date.now() - t0) / 1000).toFixed(1) + "s";
let running = 0, runs = 0;
async function job() { runs++; running++; console.log(at(), "start #" + runs, "running now:", running); await sleep(2500); running--; }
const timer = setInterval(job, 1000);
setTimeout(() => clearInterval(timer), 4200);`,
          flag: "script",
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`import { setTimeout as sleep } from "node:timers/promises";
let running = 0, peak = 0;
async function job() { running++; peak = Math.max(peak, running); await sleep(250); running--; }
const t = setInterval(job, 100);
await sleep(650); clearInterval(t); await sleep(300);
console.log("setInterval peak:", peak);
running = 0; peak = 0;
const end = Date.now() + 650;
while (Date.now() < end) { await job(); await sleep(100); }
console.log("loop peak:", peak);`, expect: [R`setInterval peak: 3`, R`loop peak: 1`] },
          ],
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
          practice: [
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من [[npx next --help]] أو وثائق Next.js: الـ flags اللي بتغيّر البورت والـ host لـ [[next dev]] و [[next start]]. وإيه اللي بيحصل لو شغّلت [[next start]] من غير [[next build]]؟`, done: R`كتبت [[-p]] و [[-H]] للاتنين، وإن start من غير build بيقع برسالة إنه مش لاقي production build في [[.next]] (المصدر: وثائق Next.js أو التشغيل عندك).` },
            { lvl: 'تطبيق', t: R`**ابني:** سكربت [[prestart]] بيتأكد إن [[.next/BUILD_ID]] موجود وأحدث من آخر تعديل في [[app/]] أو [[src/]]، ولو لأ يطبع «اعمل npm run build» ويخرج بـ 1. جرّبه بفولدرات وهمية بـ [[mkdir]] و [[utimes]] من غير ما تسطّب Next.`, done: R`من غير [[.next/BUILD_ID]]: الرسالة و exit 1. مع ملف أقدم من ملف في [[app/]]: «الـ build قديم» و exit 1. أحدث: exit 0.` },
            { lvl: 'تحدي', t: R`**اشرحها:** فرق [[next dev]] و [[next build && next start]] في: سرعة أول تحميل، و hot reload، والأخطاء اللي بتظهر، وليه باج بيظهر في الإنتاج بس (hydration، أو متغير [[NEXT_PUBLIC_]] اتقرا وقت الـ build).`, done: R`الأربع نقط مكتوبين بأمثلة، ومنهم إن [[NEXT_PUBLIC_*]] بيتحط في الكود وقت الـ build فتغييره على السيرفر بعدها مبيعملش حاجة.` },
          ],
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
            R`بيشغّل سيرفر التطوير بتاع Next: بيعيد التحميل مع كل حفظ وبيطبع الأخطاء في المتصفح. [[-p 4000]] بيخليه على بورت 4000 بدل 3000 الافتراضي، مفيد لو 3000 مشغول بالـ API.`,
            R`بيبني نسخة الإنتاج في [[.next]] ويطبع جدول بكل route وحجمه وعلامة نوعه: [[○]] صفحة static اتبنت مرة واحدة، و [[ƒ]] بتتعمل مع كل طلب. لو فيه error في TypeScript أو ESLint config بيقف هنا، فده اللي بتشغّله في الـ CI.`,
            R`بيشغّل سيرفر الإنتاج من اللي في [[.next]] على بورت 3000، من غير watch ومن غير رسايل التطوير. لازم [[next build]] يكون اتعمل الأول، وإلا بيقولك إنه ملقاش production build.`,
            R`بيشغّل ESLint على كل المشروع ([[.]] = الفولدر الحالي) ويطبع المشاكل. من Next 16 [[next lint]] اتشال، فبتشغّل ESLint مباشرة بالـ config بتاع المشروع.`,
            R`لو [[output: "standalone"]] في [[next.config]]، الـ build بيطلّع [[.next/standalone]] فيه [[server.js]] ومعاه المكتبات اللي محتاجها بس، فبتشغّله بـ [[node]] مباشرة من غير [[node_modules]] كاملة. ده اللي بيتحط في صورة Docker صغيرة.`,
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
          practice: [
            { lvl: 'سريع', t: R`**اشرحها:** ليه [[.next/static]] و [[public]] مش بيتنسخوا لوحدهم في [[standalone]]؟ وإيه اللي اليوزر بيشوفه لو نسيتهم؟`, done: R`كتبت إن standalone فيه السيرفر والكود اللي محتاجه بس، والملفات الثابتة متوقّع إن CDN أو nginx يخدمها، ولو نسيتهم الصفحة بتفتح من غير CSS و JS (404 على [[/_next/static/...]]).` },
            { lvl: 'تطبيق', t: R`**ابني:** سكربت [[check-standalone.mjs]] بيتأكد إن [[.next/standalone/server.js]] و [[.next/standalone/.next/static]] و [[.next/standalone/public]] موجودين، ويطبع حجم [[standalone]] مقابل [[node_modules]]. جرّبه بفولدرات وهمية.`, done: R`على الفولدر الوهمي من غير static بيقول «ناقص: .next/static» و exit 1، وبعد ما عملته بيقول تمام ويطبع الحجمين.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من وثائق Next.js: [[HOSTNAME]] و [[PORT]] في standalone. ليه [[HOSTNAME=0.0.0.0]] لازم جوه Docker؟ اربطها بدرس [[--host و Network URL]].`, done: R`كتبت إن من غيره السيرفر ممكن يسمع على اسم الـ container أو localhost بس، وإن تجربة [[127.0.0.1]] جوه Docker طلّعت [[curl: (52) Empty reply from server]] من برا.` },
          ],
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
            R`بيبني المشروع، ولو [[output: "standalone"]] متحطوط في [[next.config]] بيطلّع فولدر [[.next/standalone]] فيه [[server.js]] والمكتبات اللي محتاجاها بس. من غير الإعداد ده مش هيطلع الفولدر خالص.`,
            R`[[test -d]] بيتأكد إن الفولدر موجود، و [[||]] معناها «لو فشل نفّذ اللي بعدي»، فيطبع رسالة لو الفولدر مطلعش. في Dockerfile خليها [[|| exit 1]] عشان الـ build يقف بدل ما يكمّل بصورة ناقصة.`,
            R`[[standalone]] مش بينسخ فولدر [[public]] (الصور والـ favicon)، فلازم تنسخه جنب [[server.js]] بإيدك. [[-r]] معناها انسخ الفولدر وكل اللي جواه، ومن غيره الصور هتطلع 404 في الإنتاج.`,
            R`وكمان مش بينسخ [[.next/static]] (ملفات CSS و JS المبنية للمتصفح)، فبتتنسخ جوه [[.next/standalone/.next/]]. لو نسيتها الصفحة هتفتح من غير ستايل ولا تفاعل.`,
            R`[[du -sh]] بيطبع حجم كل فولدر بشكل مقروء، فتقارن [[node_modules]] الكاملة بفولدر [[standalone]] اللي هيتنشر، وتشوف ليه الصورة بقت أصغر بكتير.`,
            R`[[cd]] بيدخل الفولدر عشان [[server.js]] بيدوّر على الملفات جنبه. [[HOSTNAME=0.0.0.0]] بيخليه يسمع على كل الكروت، ودي مهمة في Docker لأن [[HOSTNAME]] هناك متحدد لوحده باسم الـ container فالسيرفر مبيبقاش متاح من برّه. و [[PORT]] البورت اللي يسمع عليه.`,
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** مكتبة فيها [[src/]] و [[test/]] و [[README.md]] و [[.env]] ومفيش [[files]] في package.json. [[npm pack --dry-run]] هيحط إيه؟`, done: R`٥ ملفات ومنهم [[9B .env]] و [[test/a.test.js]]: من غير [[files]] و [[.npmignore]] npm بيحط كل حاجة غير شوية حاجات معروفة. السر كان هيتنشر.` },
            { lvl: 'تطبيق', t: R`**صلّح:** زوّد [[npm pkg set "files[0]=src"]] وكرر.`, done: R`[[total files: 3]]: README و package.json و [[src/index.js]] بس (README و package.json بيتحطوا دايمًا).` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** في ريبو git نضيف، [[npm version patch]]. وبعدين عدّل ملف من غير commit و [[npm version patch]] تاني.`, done: R`الأولى طبعت [[v0.1.1]] وعملت commit و tag [[v0.1.1]]. التانية وقعت بـ [[npm error Git working directory not clean.]]` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** [[npm publish --dry-run]] من غير login. هيقع؟`, done: R`لأ: طبع [[npm warn publish This command requires you to be logged in ... (dry-run)]] و [[+ @lab-demo/slugify-ar@0.1.0]]. يعني dry-run مبيتأكدش من الصلاحيات، فأول publish حقيقي ممكن يقع بـ 402 أو 403 (scoped من غير [[--access public]]، أو اسم مش بتاعك).` },
            { lvl: 'تحدي', t: R`**ابني:** [[prepublishOnly]] بيشغّل [[node --test]] و [[npm pack --dry-run --json]] ويقرا الـ JSON ويرفض لو فيه أي ملف اسمه [[.env]] أو بيبدأ بـ [[test/]].`, done: R`اختبار فاشل بيوقف [[npm publish --dry-run]]، وشيل [[files]] بيخلي السكربت يرفض ويقول اسم الملف.` },
          ],
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
            R`بيسجّل دخولك على حساب npmjs.com (غالبًا بيفتح المتصفح تأكد منه)، وبيحفظ توكن في [[~/.npmrc]]. لازم قبل أي [[publish]]، و [[npm whoami]] بيقولك انت داخل بأنهي حساب.`,
            R`بيعمل ملف [[.tgz]] (زي [[mylib-1.0.0.tgz]]) هو بالظبط اللي هيترفع، ويطبع الملفات اللي جواه وحجمها من غير ما يرفع حاجة. تقدر تسطّبه في مشروع تاني بـ [[npm install ./mylib-1.0.0.tgz]] وتجرّبه قبل النشر.`,
            R`بيعمل كل خطوات النشر ويطبع الملفات اللي كانت هتترفع، من غير ما يرفع فعلًا. بص على الليستة: لو فيها [[.env]] أو [[src]] أو ملفات اختبار يبقى محتاج [[files]] في [[package.json]] أو [[.npmignore]].`,
            R`بيرفع الباكدج على npm. [[--access public]] لازمة لأول نشر لباكدج scoped (اسمها زي [[@me/lib]])، لأن الافتراضي ليها private ومحتاج حساب مدفوع. والنسخة اللي اتنشرت مينفعش تتنشر تاني بنفس الرقم.`,
            R`[[npm version patch]] بيزوّد آخر رقم في [[version]] (1.0.0 ← 1.0.1)، ولو المشروع git بيعمل commit و tag [[v1.0.1]] (ولازم الـ working tree يكون نضيف). و [[&&]] بتنشر بس لو ده نجح، فمتنشرش نفس الرقم مرتين.`,
          ],
          sol: R`[[npm pack]] بيطبع [[Tarball Contents]] فيها كل ملف وحجمه، و [[Tarball Details]] ([[name]] و [[version]] و [[package size]] و [[total files]])، وبيعمل ملف زي [[myapp-1.0.0.tgz]]. [[tar tzf myapp-1.0.0.tgz]] بيعرض الملفات تحت [[package/]].

في تجربة على فولدر فيه [[.env]] ومفيش [[.gitignore]] ولا [[files]]: الـ tgz كان فيه [[package/.env]] وملفات لوج كمان. يعني لو عملت publish كان الـ secret هيبقى على npm لأي حد. npm بيستخدم [[.gitignore]] لو مفيش [[.npmignore]]، ولو الاتنين مش موجودين بياخد تقريبًا كل حاجة.

الحل الأأمن: حقل [["files": ["dist"]]] في package.json، فالـ tarball يبقى فيه dist و package.json و README و LICENSE بس. واعمل [[npm pack]] أو [[npm publish --dry-run]] قبل كل نشر.`
        }
      ]
    }
]);
