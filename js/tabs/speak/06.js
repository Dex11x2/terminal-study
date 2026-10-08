// تكملة تاب speak: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/speak/01.js (شرح حقول الدرس في أوله)
MORE("speak", [
    {
      t: "تشرح مفهوم تقني ببساطة",
      l: 3,
      n: "قالب شرح أي مفهوم (تعريف ← تشبيه ← مثال ← trade-off)، وإجابات نموذجية بالإنجليزي للـ event loop و REST و الـ indexes",
      items: [
        {
          cmd: "قالب الشرح",
          title: "تشرح أي مفهوم تقني بالإنجليزي في ٤ خطوات: definition ← analogy ← example ← trade-off",
          desc: R`أسئلة «Explain X» ([[Explain the event loop]] و [[What is REST?]] و [[What's an index?]]) بتقيس حاجتين: فاهم ولا حافظ، وتعرف توصّل ولا لأ. واللي إنجليزيته ضعيفة بيحاول يقول تعريف طويل محفوظ من article، ويتوه في نصه.

القالب ده بيحل المشكلة، وكل خطوة جملة أو اتنين قصيرين:
١) Definition: جملة واحدة بسيطة. [[X is a ... that ...]]
٢) Analogy: تشبيه من الحياة. [[You can think of it like ...]]
٣) Example: مثال من الكود أو من مشروعك. [[For example, in my project, ...]]
٤) Trade-off / when: إمتى تستخدمه وإمتى لأ، أو عيبه. [[The downside is ...]] أو [[You'd use it when ...]]

وفي الآخر: [[Does that answer your question?]] أو [[Should I go deeper into any part?]]. ده بيسيب الإنترفيوير يوجّهك بدل ما تقول كل حاجة.`,
          example: R`Definition:  A cache is a fast storage layer that keeps copies of data we use often.
Analogy:  You can think of it like keeping your most-used tools on your desk instead of in the store room.
Example:  For example, in my project, I cached the product list in Redis for 60 seconds, because it was read thousands of times and changed rarely.
Trade-off:  The downside is that the data can be stale, so you need to decide how long to keep it, or clear it when the data changes.
When:  I'd use it for data that's read a lot and changes rarely, not for things like account balances.
Close:  Should I go deeper into cache invalidation?`,
          try: R`اختار مفهوم تعرفه كويس (مثلًا [[Git branch]] أو [[environment variables]] أو [[JWT]] أو [[Docker container]])، واكتب شرحه بالقالب في ٥ جمل. سجّله في أقل من دقيقة. وبعدين اسمعه واسأل: لو حد مش مبرمج سمع التشبيه، هيفهم الفكرة؟`,
          flag: "script",
          deep: {
            why: R`الإنترفيوير سمع التعريف المحفوظ ١٠٠ مرة. التشبيه والمثال من مشروعك هما اللي بيوروا إنك فاهم فعلًا. والقالب بيخلي إجابتك منظمة حتى لو الإنجليزي بسيط، ودي أهم من الإنجليزي المعقد.`,
            how: R`عبارات لكل خطوة:
التعريف: [[X is a ... that ...]]، و [[Basically, X lets you ...]]، و [[In simple terms, ...]].
التشبيه: [[You can think of it like ...]]، و [[It's similar to ...]]، و [[Imagine ...]].
المثال: [[For example, ...]]، و [[In my project, I used it to ...]]، و [[A common case is ...]].
الـ trade-off: [[The downside is ...]]، و [[The trade-off is ...]]، و [[It's great for ..., but not for ...]].
الختام: [[Does that make sense?]]، و [[Should I go deeper into ...?]].

التشبيهات: اختار تشبيه بسيط ومش مبالغ فيه، وقول حدوده لو فيه ([[The analogy isn't perfect, because ...]]). ده بيبان ناضج.

الوقت: ٤٥–٩٠ ثانية للإجابة الأولى. التفاصيل الأعمق للـ follow-ups.`,
            when: "أي «Explain X» أو «What is X?» أو «What's the difference between X and Y?» في انترفيو، وكمان وانت بتشرح لزميل أو عميل.",
            mistakes: R`تعريف محفوظ طويل بكلمات صعبة ومفيش مثال. تشبيه أطول من الشرح. تبدأ بالتفاصيل ([[So first, the V8 engine...]]). ومتقولش إمتى متستخدمهوش (الـ trade-off هو اللي بيفرق junior عن mid). و [[It's like... how to say... ehh...]]: جهّز تشبيهاتك قبلها.`
          },
          teach: R`## الفكرة: ٤ خطوات، كل خطوة جملة أو اتنين

المثال شرح كامل لـ cache بالقالب: كل سطر بيبدأ باسم الخطوة. القالب نفسه هو الدرس، والـ cache مجرد مثال.

---

## ١. Definition (السطر الأول)

~~~text Definition
A cache is a fast storage layer that keeps copies of data we use often.
~~~

التركيبة: [[X is a ... that ...]]. [[storage layer]] = طبقة تخزين. و [[keeps copies of]] = بيحتفظ بنسخ من. جملة واحدة، من غير مصطلحات تحتاج شرح.

## ٢. Analogy (السطر التاني)

[[You can think of it like keeping your most-used tools on your desk instead of in the store room.]]: [[You can think of it like + ing]] = تقدر تتخيلها زي. التشبيه من الحياة، وأقصر من الشرح.

## ٣. Example (السطر التالت)

[[For example, in my project, I cached the product list in Redis for 60 seconds, because it was read thousands of times and changed rarely.]]: من مشروعك + رقم + سبب. [[cached]] «كاشْت». و [[changed rarely]] = نادرًا ما بيتغير.

## ٤. Trade-off و When (السطر ٤ و ٥)

[[The downside is that the data can be stale...]]: [[stale]] «ستيْل» = قديم/مش محدّث. و [[I'd use it for data that's read a lot and changes rarely, not for things like account balances.]]: إمتى آه وإمتى لأ. ده الجزء اللي بيفرق junior عن mid.

## ٥. Close (آخر سطر)

[[Should I go deeper into cache invalidation?]]: بتسيب الإنترفيوير يختار يكمّل فين. [[invalidation]] = مسح الـ cache لما الداتا تتغير.

---

## الخلاصة

| الخطوة | جملة البداية |
|---|---|
| Definition | [[X is a ... that ...]] |
| Analogy | [[You can think of it like ...]] |
| Example | [[For example, in my project, ...]] |
| Trade-off | [[The downside is ...]] |
| When | [[I'd use it when ..., not for ...]] |
| Close | [[Should I go deeper into ...?]] |

٤٥–٩٠ ثانية، والتفاصيل للـ follow-ups.`,
          lines: [
            R`التعريف: «الـ cache طبقة تخزين سريعة بتحتفظ بنسخ من الداتا اللي بنستخدمها كتير».`,
            R`التشبيه: «زي ما تحط أكتر أدواتك استخدامًا على المكتب بدل المخزن».`,
            R`المثال: «في مشروعي، عملت cache لقايمة المنتجات في Redis لمدة ٦٠ ثانية، لأنها بتتقري آلاف المرات ونادرًا بتتغير».`,
            R`العيب: «الداتا ممكن تبقى قديمة (stale)، فلازم تحدد تحتفظ بيها قد إيه، أو تمسحها لما تتغير».`,
            R`إمتى: «أستخدمه لداتا بتتقري كتير ونادرًا بتتغير، مش لحاجة زي رصيد الحساب».`,
            R`الختام: «أدخل أعمق في الـ cache invalidation؟»`
          ],
          sol: R`مثال لـ [[environment variables]]:
[[Environment variables are settings that live outside the code, like the database URL or API keys.]] [[You can think of them like the settings on your phone: same app, different settings on each phone.]] [[For example, in my project, the app reads DATABASE_URL, so it connects to a local database on my laptop and to the real one in production, with the same code.]] [[The main reason is security: secrets don't go into Git.]] [[The downside is that if one is missing, the app can fail at runtime, so I validate them when the app starts.]]

راجع التسجيل: أقل من دقيقة؟ التشبيه بسيط؟ فيه مثال من مشروعك؟ فيه downside؟ الإجابة الضعيفة: [[Environment variables are variables of the environment.]] (تعريف بالكلمة نفسها).`
        },
        {
          cmd: "event loop بالإنجليزي",
          title: "«Explain the event loop»: إجابة نموذجية بالإنجليزي",
          desc: R`الشرح التقني الكامل للـ event loop في «تاب JavaScript»: [[event loop]]. هنا الإجابة الإنجليزي اللي تقولها في انترفيو، بالقالب الرباعي، وبجمل قصيرة.

النقط اللي لازم تتقال: JavaScript بتشغل حاجة واحدة في نفس الوقت (single-threaded، call stack واحد). الحاجات البطيئة (timers، و network، و files) بيتعامل معاها المتصفح أو Node برا الـ stack. ولما تخلص، الـ callback بتاعها بيتحط في queue. والـ event loop بيستنى الـ stack يفضى، وبعدين ياخد من الـ queue. والـ promises ليها queue أولويتها أعلى (microtasks)، بتخلص كلها قبل أي timer.

والمثال الكلاسيكي: [[setTimeout(..., 0)]] بيطبع بعد [[Promise.resolve().then(...)]] رغم إن الـ timeout صفر.`,
          example: R`Definition:  The event loop is how JavaScript handles async work even though it runs one thing at a time.
How:  JavaScript has one call stack. Slow things, like timers or network requests, are handled outside it, by the browser or by Node.
How:  When they finish, their callbacks wait in a queue. The event loop takes the next callback only when the stack is empty.
Detail:  Promise callbacks go into a separate microtask queue, and that queue is always emptied first.
Analogy:  You can think of it like a chef who cooks one dish at a time, while the oven and the timers work in the background and ring when they're done.
Example:  That's why setTimeout with zero logs after a resolved promise: the promise is a microtask, the timeout is a normal task.
Trade-off:  The downside is that a long synchronous loop blocks everything, including clicks, so heavy work should go to a worker or be split up.
Close:  Should I walk through a code example?`,
          try: R`سجّل الإجابة دي بكلامك في أقل من ٩٠ ثانية، من النقط بس ([[one stack → outside → queue → loop waits → microtasks first → blocking]]). وبعدين جاوب بصوت عالي على follow-up: [[What would this log? console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);]]`,
          flag: "script",
          deep: {
            why: R`سؤال الـ event loop من أشهر أسئلة انترفيو JavaScript و Node للـ juniors. وأغلب الناس بتحفظ رسمة ومتعرفش تشرحها بالكلام. الإجابة المنظمة بجمل بسيطة بتفرق جدًا.`,
            how: R`نطق الكلمات: [[queue]] «كيو»، و [[asynchronous]] «إيْسِنكرِنَس»، و [[synchronous]] «سِنكرِنَس»، و [[microtask]] «مايكرو-تاسك»، و [[callback]] «كول-باك»، و [[thread]] بـ ث.

كلمات لازم تبقى جاهزة: [[call stack]]، و [[single-threaded]]، و [[task queue]] أو [[callback queue]] أو [[macrotask queue]]، و [[microtask queue]]، و [[blocking]]، و [[non-blocking]]، و [[Web APIs]] (في المتصفح) و [[libuv]] (في Node).

الـ follow-up الكلاسيكي: الناتج [[1, 4, 3, 2]]. وقوله بالشرح: [[1 and 4 are synchronous, so they run first. Then the stack is empty, so the microtask runs: 3. Then the timer callback: 2.]]

ولو اتسألت عن Node بالتحديد: [[In Node, the event loop has phases, like timers, I/O callbacks and check for setImmediate, and process.nextTick runs even before promise callbacks.]] قول ده بس لو اتسألت، ولو مش متأكد من التفاصيل قول [[I'd need to check the exact order of phases]].`,
            when: "انترفيو JavaScript أو Node أو frontend، وأي سؤال عن async/await أو «why is my UI frozen?».",
            mistakes: R`[[JavaScript is multi-threaded]] (لأ، الكود بتاعك بيشتغل على thread واحد، حتى لو المتصفح و Node عندهم threads تانية). و [[setTimeout 0 runs immediately]]. ورسمة محفوظة من غير مثال. و «كويو» بدل «كيو». و [[await blocks the thread]] (لأ، بيوقف الدالة دي بس ويرجّع التحكم للـ event loop).`
          },
          teach: R`## الفكرة: ٤ أفكار بالترتيب، وتشبيه، ومثال بناتج

المثال ٨ سطور بالقالب: تعريف، وإزاي بيشتغل (٣ سطور)، وتشبيه، ومثال، وعيب، وختام.

---

## ١. التعريف (السطر الأول)

[[The event loop is how JavaScript handles async work even though it runs one thing at a time.]]: [[even though]] = رغم إن. الجملة دي بتقول المشكلة والحل في نفس الوقت.

## ٢. إزاي بيشتغل (السطر ٢ و ٣ و ٤)

| الجملة | الفكرة |
|---|---|
| [[JavaScript has one call stack. Slow things, like timers or network requests, are handled outside it, by the browser or by Node.]] | stack واحد، والبطيء برا |
| [[When they finish, their callbacks wait in a queue. The event loop takes the next callback only when the stack is empty.]] | queue، والـ loop بيستنى الـ stack يفضى |
| [[Promise callbacks go into a separate microtask queue, and that queue is always emptied first.]] | الـ promises ليها أولوية |

نطق: [[queue]] «كيو»، و [[callback]] «**كول**-باك»، و [[microtask]] «**ماي**-كرو-تاسك»، و [[async]] «إيْ-سِنك»، و [[emptied]] «**إمپ**-تيد».

## ٣. التشبيه (السطر الخامس)

[[a chef who cooks one dish at a time, while the oven and the timers work in the background and ring when they're done]]: الشيف = الـ stack، والفرن والتايمر = المتصفح أو Node، والجرس = الـ callback اللي بيتحط في الـ queue.

## ٤. المثال (السطر السادس) والـ follow-up

[[That's why setTimeout with zero logs after a resolved promise]]. الكود بتاع الـ try ده اتشغّل بـ Node 24 في PowerShell وفي Git Bash على ويندوز (نفس الأمر بيشتغل في الاتنين)، و [[-e]] معناها «نفّذ الكود ده على طول»:

~~~bash
node -e "console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);"
~~~

~~~text الناتج
1
4
3
2
~~~

و [[setTimeout]] بتتقري «set timeout»، و [[Promise.resolve().then]] «promise dot resolve dot then».

## ٥. العيب والختام (آخر سطرين)

[[a long synchronous loop blocks everything, including clicks]]: [[blocks]] = بيوقف. و [[heavy work should go to a worker or be split up]]: [[split up]] = يتقسم. والختام [[Should I walk through a code example?]].

---

## الخلاصة

| النقطة | الكلمة |
|---|---|
| حاجة واحدة في المرة | [[one call stack]] / [[single-threaded]] |
| البطيء برا | [[handled by the browser or Node]] |
| الانتظار | [[callbacks wait in a queue]] |
| الأولوية | [[microtasks first]] |
| العيب | [[a long loop blocks everything]] |`,
          lines: [
            R`التعريف: «الـ event loop هو إزاي JS بتتعامل مع الشغل الـ async رغم إنها بتشغل حاجة واحدة في المرة».`,
            R`«JS عندها call stack واحد. الحاجات البطيئة بيتعامل معاها المتصفح أو Node برا الـ stack».`,
            R`«لما تخلص، الـ callbacks بتستنى في queue. والـ event loop بياخد الجاي بس لما الـ stack يفضى».`,
            R`«الـ promises ليها microtask queue منفصلة، ودي دايمًا بتفضى الأول».`,
            R`التشبيه: «زي شيف بيطبخ طبق واحد في المرة، والفرن والتايمرز شغالين في الخلفية وبيرنّوا لما يخلصوا».`,
            R`المثال: «عشان كده setTimeout بصفر بيطبع بعد promise متحلّة».`,
            R`العيب: «loop طويل sync بيوقف كل حاجة حتى الكليكات، فالشغل التقيل يروح لـ worker أو يتقسّم».`,
            R`الختام: «أمشي في مثال كود؟»`
          ],
          sol: R`الناتج: [[1]] ثم [[4]] ثم [[3]] ثم [[2]].

الإجابة بالكلام: [[It logs 1, 4, 3, 2. One and four are synchronous, so they run first, in order. When the stack is empty, the event loop runs all microtasks first, so the promise callback logs 3. Then it takes the timer callback from the task queue, and logs 2. Even with zero milliseconds, the timeout has to wait for the stack and the microtasks.]]

الغلط الشائع: [[1, 2, 3, 4]] (فاكر إن كله بالترتيب)، أو [[1, 4, 2, 3]] (فاكر إن الـ timeout بصفر قبل الـ promise). ولو جاوبت صح بس من غير شرح، الإنترفيوير هيسأل «why?»، فالشرح هو الإجابة الحقيقية.`
        },
        {
          cmd: "REST بالإنجليزي",
          title: "«What is REST?» و «PUT vs PATCH»: إجابة نموذجية بالإنجليزي",
          desc: R`الشرح التقني في «تاب الانترفيو»: [[resources + verbs + stateless]]. هنا الإجابة المتكلمة.

النقط: REST طريقة (style) لتصميم APIs فوق HTTP. كل حاجة [[resource]] ليها URL ([[/users/42]]). بتتعامل معاها بالـ HTTP methods: GET تقرا، و POST تعمل جديد، و PUT تستبدل، و PATCH تعدّل جزء، و DELETE تمسح. والـ status codes بتقول النتيجة. و [[stateless]]: كل request فيه كل المعلومات اللي محتاجها (زي الـ token)، والسيرفر مش فاكر الـ request اللي قبله.

وأشهر follow-ups: [[PUT vs PATCH]]، و [[What does idempotent mean?]]، و [[REST vs GraphQL]].`,
          example: R`Definition:  REST is a style for designing APIs over HTTP, where everything is a resource with its own URL.
How:  You use HTTP methods as verbs: GET to read, POST to create, PUT to replace, PATCH to update part of it, and DELETE to remove it.
How:  The status code tells you the result: 200 OK, 201 Created, 404 Not Found, and so on.
Stateless:  It's stateless: every request carries everything the server needs, like the auth token, so any server can handle it.
Analogy:  You can think of resources like files in folders, and the methods like the actions you can do on a file.
Example:  In my project, GET /orders/15 returns one order, and PATCH /orders/15 with a new status updates just that field.
PUT vs PATCH:  PUT replaces the whole resource, PATCH changes only the fields you send.
Idempotent:  PUT and DELETE are idempotent: sending the same request twice gives the same result. POST isn't: it can create two orders.
Trade-off:  REST is simple and cacheable, but the client sometimes needs several requests, or gets more data than it needs. That's where GraphQL can help.`,
          try: R`صمّم بصوت عالي API لـ «blog» (posts و comments) في دقيقة: قول ٤ endpoints بالـ method والـ URL وبيعملوا إيه. وبعدين جاوب بصوت عالي على [[What's the difference between PUT and PATCH?]] و [[Is POST idempotent? Why?]]. سجّل.`,
          flag: "script",
          deep: {
            why: R`REST هو لغة الـ backend اليومية، وسؤاله بييجي في أي انترفيو backend أو full-stack. وقراية الـ URLs والـ methods بصوت عالي مهارة لوحدها ([[GET slash users slash forty-two]]).`,
            how: R`نطق: [[REST]] «رِست»، و [[resource]] «ريزورس» أو «ري-سورس» (الضغط على الأول أو التاني حسب اللهجة)، و [[idempotent]] «آيدَم-پوتِنت» (/ˌaɪ.dəmˈpoʊ.tənt/ حسب Wiktionary، وفيه كمان نطق «آي-دِم-پَ-تِنت» /aɪˈdɛm.pə.tənt/) والأشهر الضغط على [[PO]]، و [[stateless]] «ستيْت-لِس» من غير «إ».

قراية الـ URLs: [[/users/42/orders]] = [[slash users slash forty-two slash orders]]، أو في الكلام [[the orders of user forty-two]]. و [[?page=2]] = [[with page equals two]] أو [[query param page two]].

كلمات مفيدة: [[endpoint]]، و [[payload]] أو [[request body]]، و [[query parameters]]، و [[headers]]، و [[versioning]] ([[/v1/]] = [[v one]])، و [[pagination]].

[[REST vs GraphQL]] باختصار: [[With REST, the server decides the shape of the response for each endpoint. With GraphQL, the client asks for exactly the fields it needs in one request. GraphQL is more flexible, but caching and security are harder.]]`,
            when: "أي انترفيو backend أو full-stack، وتصميم API مع زميل، والكلام مع فريق mobile أو frontend.",
            mistakes: R`[[REST is a protocol]] (لأ، style؛ الـ protocol هو HTTP). و [[PUT and PATCH are the same]]. و [[GET /getUsers]] (الـ verb في الـ method مش في الـ URL). و «آيدم-بوتنت» بالضغط على الأول. و [[POST is for sending data and GET is for getting data]] وخلاص (صح بس ناقص جدًا).`
          },
          teach: R`## الفكرة: resources + methods + status codes + stateless

المثال ٩ سطور: تعريف، والـ methods، والـ status codes، و stateless، وتشبيه، ومثال، وأشهر ٢ follow-ups، وعيب.

---

## ١. التعريف (السطر الأول)

[[REST is a style for designing APIs over HTTP, where everything is a resource with its own URL.]]: [[style]] مش [[protocol]] (الـ protocol هو HTTP). و [[resource]] «**ري**-سورس» أو «ري-**زورس**».

## ٢. الأفعال والنتيجة (السطر ٢ و ٣)

[[You use HTTP methods as verbs]]: الـ method هو الفعل، والـ URL هو الاسم.

| Method | الجملة في المثال | معناها |
|---|---|---|
| GET | [[GET to read]] | تقرا |
| POST | [[POST to create]] | تعمل جديد |
| PUT | [[PUT to replace]] | تستبدل كله |
| PATCH | [[PATCH to update part of it]] | تعدّل جزء |
| DELETE | [[DELETE to remove it]] | تمسح |

[[200 OK, 201 Created, 404 Not Found, and so on]]: «two hundred»، و «two oh one»، و «four oh four». و [[and so on]] = وهكذا.

## ٣. stateless (السطر الرابع)

[[every request carries everything the server needs, like the auth token, so any server can handle it]]: [[carries]] = شايل. والنتيجة العملية: أي سيرفر يقدر يرد (سهل تزوّد سيرفرات). [[stateless]] «**ستيْت**-لِس».

## ٤. التشبيه والمثال (السطر ٥ و ٦)

[[resources like files in folders, and the methods like the actions you can do on a file]]. والمثال: [[GET /orders/15]] بيتقري «GET slash orders slash fifteen».

## ٥. الـ follow-ups (السطر ٧ و ٨)

[[PUT replaces the whole resource, PATCH changes only the fields you send.]]

[[idempotent]]: نفس الـ request مرتين = نفس النتيجة. النطق حسب Wiktionary (اتراجع وقت كتابة الشرح) فيه أكتر من شكل أمريكي، أشهرهم «آي-دَم-**پو**-تِنت» [[/ˌaɪ.dəmˈpoʊ.tənt/]] والضغط على [[PO]]، وفيه كمان «آي-**دِم**-پَ-تِنت». و [[POST isn't: it can create two orders]].

## ٦. العيب (آخر سطر)

[[REST is simple and cacheable, but the client sometimes needs several requests, or gets more data than it needs.]]: [[cacheable]] «**كاش**-أ-بل». وده المدخل لـ [[That's where GraphQL can help.]]

---

## الخلاصة

| النقطة | الجملة |
|---|---|
| تعريف | [[a style for designing APIs over HTTP]] |
| أفعال | GET read، POST create، PUT replace، PATCH update part، DELETE remove |
| stateless | [[every request carries everything the server needs]] |
| PUT vs PATCH | [[whole resource]] vs [[only the fields you send]] |
| idempotent | [[same request twice, same result]] |

الفعل مكانه الـ method: [[GET /users]] مش [[GET /getUsers]].`,
          lines: [
            R`التعريف: «REST أسلوب لتصميم APIs فوق HTTP، كل حاجة فيه resource ليها URL».`,
            R`الـ methods كأفعال: GET تقرا، و POST تعمل، و PUT تستبدل، و PATCH تعدّل جزء، و DELETE تمسح.`,
            R`«الـ status code بيقول النتيجة: 200 و 201 و 404...» and so on = وهكذا.`,
            R`stateless: «كل request فيه كل اللي السيرفر محتاجه زي الـ token، فأي سيرفر يقدر يتعامل معاه».`,
            R`التشبيه: «الـ resources زي ملفات في فولدرات، والـ methods زي العمليات على الملف».`,
            R`المثال: GET بيرجّع أوردر، و PATCH بـ status جديد بيعدّل الخانة دي بس.`,
            R`PUT vs PATCH: «PUT بيستبدل الـ resource كله، و PATCH بيغيّر الخانات اللي بعتها بس».`,
            R`idempotent: «نفس الـ request مرتين = نفس النتيجة. POST لأ: ممكن يعمل أوردرين».`,
            R`العيب: «REST بسيط وبيتعمله cache، بس الـ client ساعات محتاج requests كتير أو بياخد داتا زيادة. هنا GraphQL ممكن يساعد».`
          ],
          sol: R`الـ API بصوت عالي:
[[GET slash posts: returns a list of posts.]]
[[POST slash posts: creates a new post.]]
[[GET slash posts slash id: returns one post.]]
[[POST slash posts slash id slash comments: adds a comment to that post.]]
(ولو ضفت [[PATCH slash posts slash id]] للتعديل و [[DELETE]] للمسح، أحسن.)

[[PUT vs PATCH]]: [[PUT replaces the whole post, so if I send only the title, the body could be lost. PATCH updates only the title.]]
[[Is POST idempotent?]]: [[No. If I send the same POST twice, I can get two posts. That's why payment APIs use an idempotency key.]]

الغلط الشائع: [[GET slash getPosts]] أو [[POST slash deletePost]]: الفعل مكانه الـ method.`
        },
        {
          cmd: "indexes بالإنجليزي",
          title: "«What is a database index?» و «Why not index everything?»: إجابة نموذجية",
          desc: R`الشرح التقني في «تاب PostgreSQL»: [[الـ indexes]]، والتفاصيل الأعمق في «تاب SQL و Prisma»: [[B-tree index]] و [[index trade-offs]]. هنا الإجابة المتكلمة.

النقط: الـ index هيكل بيانات إضافي (غالبًا B-tree) بيخلي الداتابيز تلاقي الصفوف من غير ما تقرا الجدول كله. من غيره: [[full table scan]] (بتقرا كل صف). معاه: بتروح للصف على طول تقريبًا (logarithmic). والتمن: مساحة زيادة، وكل INSERT و UPDATE و DELETE أبطأ شوية لأن الـ index لازم يتحدث. فبتعمل index على الأعمدة اللي بتدوّر بيها أو بتعمل بيها join أو sort كتير، مش على كل حاجة.

والتشبيه الكلاسيكي: فهرس الكتاب في آخره.`,
          example: R`Definition:  An index is an extra data structure that helps the database find rows without reading the whole table.
Analogy:  It's like the index at the back of a book: instead of reading every page, you look up the word and go to the page.
How:  Most indexes are B-trees, so a lookup takes logarithmic time instead of scanning every row.
Example:  In my project, searching orders by customer took about two seconds. After I added an index on customer_id, it took about 30 milliseconds.
Check:  I confirmed it with EXPLAIN ANALYZE: it changed from a sequential scan to an index scan.
Trade-off:  The cost is extra storage, and every insert or update is a bit slower, because the index has to be updated too.
When:  So I index columns I filter, join or sort on often, not every column.
Composite:  For a composite index on (customer_id, created_at), the order matters: it helps queries that filter by customer_id first.`,
          try: R`جاوب بصوت عالي على ٣ أسئلة وسجّل: (١) [[What is an index?]] بالقالب. (٢) [[Why not add an index to every column?]]. (٣) [[A query is slow. How would you find out if it needs an index?]]. كل إجابة أقل من دقيقة.`,
          flag: "script",
          deep: {
            why: R`الـ indexes من أشهر أسئلة الـ backend والداتابيز، ومن أحسن الأسئلة اللي تقدر تحكي فيها قصة أداء بأرقام من مشروعك. والإجابة اللي فيها «قست قبل وبعد بـ EXPLAIN» بتفرّقك جدًا.`,
            how: R`نطق: [[index]] «إندِكس» والجمع [[indexes]] «إندِكسِز» (في الداتابيز أشهر من [[indices]] «إندِسيز»، والاتنين صح)، و [[query]] «كويري» (/ˈkwɪəri/ بالبريطاني، و /ˈkwɪri/ أو /ˈkwɛri/ بالأمريكي حسب Wiktionary)، و [[sequential]] «سِكوِنشَل» (الضغط على [[QUEN]])، و [[logarithmic]] «لوگَ-رِذ-مِك» (الضغط على [[RITH]])، و [[EXPLAIN ANALYZE]] «إكسپلين آنَلايز».

كلمات: [[full table scan]] أو [[sequential scan]]، و [[index scan]]، و [[B-tree]] «بي-تري»، و [[composite index]] أو [[multi-column index]]، و [[unique index]]، و [[covering index]]، و [[write overhead]] (تكلفة الكتابة).

الإجابة على (٣): [[First, I'd run EXPLAIN ANALYZE on the query to see the plan. If I see a sequential scan on a big table with a filter that returns few rows, an index on that column will probably help. Then I'd add it and compare the timing.]]

ولو اتسألت [[When would an index not help?]]: [[When the query returns most of the table, or the table is tiny, the database might still prefer a full scan. Also, a function on the column, like LOWER(email), can stop a normal index from being used.]]`,
            when: "انترفيو backend أو داتابيز، وأي سؤال «this query is slow»، وقصص الأداء في STAR.",
            mistakes: R`[[Index makes everything faster]] (الكتابة أبطأ). و [[I add index on all columns]]. و [[an index is a primary key]] (الـ primary key عليه index، بس مش هو ده التعريف). وتقول إن الـ index «بيرتب الجدول» (الـ index العادي هيكل منفصل، مش بيرتب الجدول نفسه). و «إندكسيس» بنطق غريب.`
          },
          teach: R`## الفكرة: تعريف، وفهرس الكتاب، ورقم قبل وبعد، والتمن

المثال ٨ سطور: تعريف، وتشبيه، وإزاي، ومثال بأرقام، وقياس، وتمن، وإمتى، و composite index.

---

## ١. التعريف والتشبيه (أول سطرين)

[[An index is an extra data structure that helps the database find rows without reading the whole table.]]: [[extra]] مهمة: الـ index حاجة **جنب** الجدول، مش الجدول نفسه متترتب. والتشبيه: [[It's like the index at the back of a book: instead of reading every page, you look up the word and go to the page.]] [[look up]] = تدوّر على.

## ٢. إزاي (السطر التالت)

[[Most indexes are B-trees, so a lookup takes logarithmic time instead of scanning every row.]]: [[B-tree]] «بي-تري». و [[logarithmic]] «لو-گَ-**رِذ**-مِك» (الضغط على RITH). و [[scanning every row]] = بيمر على كل صف.

## ٣. المثال والقياس (السطر ٤ و ٥)

| الجملة | اللي بيقنع |
|---|---|
| [[searching orders by customer took about two seconds. After I added an index on customer_id, it took about 30 milliseconds.]] | رقم قبل ورقم بعد |
| [[I confirmed it with EXPLAIN ANALYZE: it changed from a sequential scan to an index scan.]] | قست، مش خمّنت |

[[EXPLAIN ANALYZE]] «إكس-**پليْن** **آ**-نَ-لايز». و [[sequential]] «سِ-**كوِن**-شَل». و [[customer_id]] «customer I D».

## ٤. التمن وإمتى (السطر ٦ و ٧)

[[The cost is extra storage, and every insert or update is a bit slower, because the index has to be updated too.]]: ده الرد على [[Why not index everything?]]. و [[So I index columns I filter, join or sort on often, not every column.]]: [[index]] هنا فعل.

## ٥. composite (آخر سطر)

[[For a composite index on (customer_id, created_at), the order matters: it helps queries that filter by customer_id first.]]: [[composite]] «كَم-**پا**-زِت» = على أكتر من عمود. و [[the order matters]] = الترتيب بيفرق.

والجمع: [[indexes]] «**إن**-دِك-سِز» أشهر في الداتابيز، و [[indices]] «**إن**-دِ-سيز» صح برضو. و [[query]] حسب Wiktionary: «**كوي**-ري» بالبريطاني، وبالأمريكي «كوي-ري» أو «كوِ-ري».

---

## الخلاصة

| النقطة | الجملة |
|---|---|
| تعريف | [[an extra data structure that helps find rows]] |
| تشبيه | [[the index at the back of a book]] |
| دليل | رقم قبل وبعد + [[EXPLAIN ANALYZE]] |
| تمن | [[extra storage]] + [[slower writes]] |
| إمتى | [[columns I filter, join or sort on often]] |`,
          lines: [
            R`التعريف: «الـ index هيكل بيانات إضافي بيساعد الداتابيز تلاقي الصفوف من غير ما تقرا الجدول كله».`,
            R`التشبيه: «زي الفهرس في آخر الكتاب: بدل ما تقرا كل صفحة، بتدور على الكلمة وتروح للصفحة».`,
            R`«أغلب الـ indexes B-trees، فالبحث بياخد وقت logarithmic بدل ما يمسح كل صف».`,
            R`المثال بأرقام: «البحث بالعميل كان بياخد ثانيتين. بعد index على customer_id بقى حوالي ٣٠ مللي ثانية».`,
            R`القياس: «اتأكدت بـ EXPLAIN ANALYZE: اتغير من sequential scan لـ index scan».`,
            R`التمن: «مساحة زيادة، وكل insert أو update أبطأ شوية لأن الـ index لازم يتحدث».`,
            R`إمتى: «بعمل index على الأعمدة اللي بفلتر أو بعمل join أو sort بيها كتير، مش كل عمود».`,
            R`composite: «في index على عمودين، الترتيب مهم: بيساعد الـ queries اللي بتفلتر بـ customer_id الأول».`
          ],
          sol: R`(١) زي المثال بالظبط: تعريف، وتشبيه الكتاب، ومثال بأرقام.
(٢) [[Because every index has a cost. It takes extra storage, and every insert, update or delete has to update all the indexes on that table, so writes get slower. Also, the database won't use most of them anyway. So I only index columns that my real queries filter, join or sort on.]]
(٣) [[First, I'd run EXPLAIN ANALYZE to see the query plan. If there's a sequential scan on a big table, and the WHERE condition returns few rows, an index would probably help. I'd add it, run EXPLAIN ANALYZE again, and compare the time. I'd also check the query itself, because sometimes the problem is fetching too much data.]]

راجع: (٢) فيها كلمة [[writes]] أو [[insert/update]]؟ (٣) فيها [[EXPLAIN]] وقياس قبل وبعد؟ الإجابة الضعيفة لـ (٣): [[I'd add an index.]] من غير ما تقيس.`
        }
      ]
    },
    {
      t: "الـ live coding وآخر الانترفيو والمرتب",
      l: 3,
      n: "بنك جمل للتفكير بصوت عالي في كل مرحلة من الـ live coding، وأسئلتك وقفلة الانترفيو، والمرتب بالإنجليزي (gross و net و range)، ولما تتوتر أو تتلخبط في نص الكلام",
      items: [
        {
          cmd: "live coding phrases",
          title: "بنك جمل الـ live coding: من فهم المسألة لحد «I think it's done»",
          desc: R`الطريقة (تتكلم قبل ما تكتب، وتقول لما تتزنق) مشروحة في درس [[think aloud]] في «تاب الانترفيو»، والخطوات في [[clarify → examples → brute → optimize → test]]. هنا بنك جمل مترتب بالمراحل، عشان متدوّرش على الكلام وانت بتدوّر على الحل.

المشكلة عند اللي إنجليزيته ضعيفة: الدماغ مشغول بحاجتين (الحل واللغة)، فبيسكت. الحل: الجمل دي تبقى محفوظة لدرجة إنها متاخدش أي تفكير، فالدماغ كله يروح للحل. ٥ مراحل، ٣–٤ جمل لكل مرحلة، وده كفاية لأي live coding.

وكمان النطق: [[O(n)]] = [[O of n]]، و [[O(n²)]] = [[O of n squared]]، و [[O(n log n)]] = [[O of n log n]]، و [[hash map]] و [[two pointers]] و [[edge case]] «إدج كيْس».`,
          example: R`Understand:  Let me repeat the problem to make sure I got it. We need to return the indices of two numbers that add up to the target.
Understand:  Can I assume there's exactly one answer? Can the array have negative numbers?
Examples:  Let me try a small example: [2, 7, 11], target 9. The answer is 0 and 1.
Plan:  The simple way is to check every pair. That's O of n squared. Let me start with that, then improve it.
Plan:  To make it faster, I could use a hash map to remember the numbers I've seen. That would be O of n.
Coding:  I'll loop over the array. For each number, I check if target minus the number is already in the map.
Coding:  I'm naming this "seen" because it stores the numbers we've already visited.
Stuck:  Hmm, I'm stuck on the duplicates case. Let me trace it by hand with [3, 3], target 6.
Testing:  Let me test it with the example... index 0, not in the map, add it... index 1, found it. Returns 0 and 1.
Testing:  Edge cases: an empty array, one element, and duplicates. I think those all work.
Done:  I think it's done. Time is O of n and space is O of n. Would you like me to improve anything?`,
          try: R`حل مسألة [[Two Sum]] (أو أي مسألة سهلة من «تاب DSA») وانت بتسجّل صوتك، واستخدم جملة واحدة على الأقل من كل مرحلة من الـ ٦. وبعدين اسمع التسجيل وعدّ: أطول فترة سكوت كام ثانية؟ وقلت الـ complexity بصوت عالي؟`,
          flag: "script",
          deep: {
            why: R`في الـ live coding الإنترفيوير بيقيّم طريقة تفكيرك أكتر من الكود. والسكوت الطويل بيتحسب «تايه». واللي إنجليزيته ضعيفة غالبًا بيسكت مش لأنه مش عارف الحل، لكن لأنه مش لاقي الكلام. البنك ده بيشيل المشكلة دي.`,
            how: R`احفظ جملة واحدة لكل مرحلة كحد أدنى:
Understand: [[Let me repeat the problem to make sure I got it.]]
Examples: [[Let me try a small example.]]
Plan: [[The simple way is ..., that's O of ... . Let me start with that.]]
Coding: [[Now I'm going to ...]]
Stuck: [[I'm stuck on ... . Let me trace it by hand.]]
Testing: [[Let me test it with ...]]
Done: [[I think it's done. Time is O of ..., space is O of ...]]

كلمات الكود بصوت عالي: [[loop over]] (لف على)، و [[iterate through]]، و [[check if]]، و [[return early]]، و [[keep track of]] (أحتفظ بـ)، و [[increment]] و [[decrement]]، و [[swap]]، و [[sort]]، و [[the left pointer / right pointer]]، و [[off-by-one error]]، و [[base case]] (في الـ recursion).

ولما الإنترفيوير يدّي hint: [[Oh, that's a good point. So if I use a set here, I don't need the second loop.]] خده وابني عليه.

ولو محتاج وقت تفكر من غير كلام: [[Give me a moment to think about this]] وبعدين ١٥–٢٠ ثانية سكوت عادي.`,
            when: "أي جولة live coding، أو pair programming round، أو take-home بتكمله قدامهم.",
            mistakes: R`تكتب ٥ دقايق في صمت. وتقول [[ehh... so... yeah...]] بدل جمل. وتقول [[done]] من غير اختبار. و [[O n two]] (الصح [[O of n squared]]). و [[I will make a for loop]] (مفهومة، بس [[I'll loop over the array]] أطبع). وتتجاهل الـ hint.`
          },
          teach: R`## الفكرة: جملة جاهزة لكل مرحلة، عشان الدماغ يفضى للحل

المثال ١١ سطر، كل سطر بيبدأ باسم المرحلة ([[Understand:]] و [[Plan:]]...)، على مسألة Two Sum: ترجّع مكان رقمين مجموعهم رقم معيّن (الـ target). وتحت الدرس الحل نفسه (solCode) هنفكه في الآخر.

---

## ١. Understand (أول سطرين)

[[Let me repeat the problem to make sure I got it. We need to return the indices of two numbers that add up to the target.]]: [[add up to]] = مجموعهم. و [[indices]] جمع [[index]] «**إن**-دِ-سيز».

[[Can I assume there's exactly one answer? Can the array have negative numbers?]]: [[Can I assume...?]] أهم سؤال: بيوضح الحدود قبل ما تكتب.

## ٢. Examples (السطر التالت)

[[Let me try a small example]]: المثال 2 و 7 و 11 والـ target 9، والإجابة index 0 و 1 (لأن ٢ + ٧ = ٩).

## ٣. Plan (السطر ٤ و ٥)

| الجملة | المعنى |
|---|---|
| [[The simple way is to check every pair. That's O of n squared. Let me start with that, then improve it.]] | الحل البسيط وتمنه |
| [[To make it faster, I could use a hash map to remember the numbers I've seen. That would be O of n.]] | التحسين وتمنه |

[[O of n squared]] لـ [[O(n²)]]، و [[O of n]] لـ [[O(n)]]. و [[I could]] و [[That would be]] = اقتراح، لسه مكتبتش.

## ٤. Coding (السطر ٦ و ٧)

[[I'll loop over the array. For each number, I check if target minus the number is already in the map.]]: [[loop over]] = ألف على. و [[target minus the number]] = الرقم اللي محتاجه. و [[I'm naming this "seen" because it stores the numbers we've already visited.]]: بتشرح الاسم = بتوري إنك بتفكر في القراية.

## ٥. Stuck (السطر التامن)

[[Hmm, I'm stuck on the duplicates case. Let me trace it by hand]] بالمثال 3 و 3 والـ target 6: [[stuck on]] = متزنق في. [[trace it by hand]] = أمشيه بإيدي خطوة خطوة. أحسن بكتير من سكوت.

## ٦. Testing و Done (آخر ٣ سطور)

[[Let me test it with the example... index 0, not in the map, add it... index 1, found it. Returns 0 and 1.]]: بتقول اللي الكود بيعمله وانت بتمشيه. و [[Edge cases: an empty array, one element, and duplicates.]]: [[edge case]] «إدج كيْس» = حالة طرفية.

[[I think it's done. Time is O of n and space is O of n. Would you like me to improve anything?]]: الـ complexity بصوت عالي + سؤال للإنترفيوير.

---

## ٧. الحل المرجعي (solCode)

| السطر | بيعمل إيه | بتقوله إزاي |
|---|---|---|
| [[const seen = new Map();]] | Map فاضي: المفتاح الرقم، والقيمة مكانه (ده معنى التعليق [[value -> index]]) | [[I'll keep a map of numbers I've seen]] |
| [[for (let i = 0; i < nums.length; i++)]] | لف على كل الأرقام | [[I loop over the array]] |
| [[const need = target - nums[i];]] | الرقم المكمّل | [[the number I need]] |
| [[if (seen.has(need)) return [seen.get(need), i];]] | لو شفته قبل كده، رجّع المكانين | [[if I've seen it, return both indices]] |
| [[seen.set(nums[i], i);]] | سجّل الرقم ده ومكانه | [[otherwise, add it to the map]] |
| [[return [];]] | ملقيناش زوج | [[return an empty array]] |

اتشغّل بـ Node 24 على ويندوز:

~~~text الناتج
[ 0, 1 ]
[ 0, 1 ]
[]
~~~

السطر التاني (3 و 3) شغال لأن الكود بيشيك **قبل** ما يضيف الرقم للـ map، فأول 3 مش بيلاقي نفسه.

---

## الخلاصة

| المرحلة | الجملة |
|---|---|
| Understand | [[Let me repeat the problem to make sure I got it.]] |
| Examples | [[Let me try a small example.]] |
| Plan | [[The simple way is ... That's O of ...]] |
| Coding | [[I'll loop over...]] |
| Stuck | [[I'm stuck on ... Let me trace it by hand.]] |
| Done | [[I think it's done. Time is O of ..., space is O of ...]] |`,
          lines: [
            R`فهم: «خليني أعيد المسألة عشان أتأكد. محتاجين نرجّع indices رقمين مجموعهم الـ target».`,
            R`افتراضات: «أقدر أفترض إن فيه إجابة واحدة بالظبط؟ الـ array ممكن يبقى فيه سالب؟»`,
            R`مثال صغير: «خليني أجرب مثال: ٢ و ٧ و ١١، والـ target ٩. الإجابة ٠ و ١».`,
            R`خطة بسيطة: «الطريقة البسيطة إني أشيك كل زوج. ده O of n squared. أبدأ بيها وبعدين أحسّن».`,
            R`تحسين: «عشان أسرع، ممكن hash map أفتكر فيه الأرقام اللي شفتها. ده O of n».`,
            R`كتابة: «هلف على الـ array. لكل رقم، أشيك لو target ناقص الرقم موجود في الـ map».`,
            R`تسمية: «سميته seen لأنه بيخزن الأرقام اللي زرناها».`,
            R`متزنق: «امم، متزنق في حالة التكرار. خليني أمشيها بإيدي بـ ٣ و ٣ والـ target ٦». trace = أتتبع.`,
            R`اختبار: «أجرب المثال... index 0 مش في الـ map، أضيفه... index 1 لقيته. بيرجّع ٠ و ١».`,
            R`edge cases: «array فاضي، وعنصر واحد، وتكرار. أظن كلهم شغالين».`,
            R`خلاص: «أظن خلص. الوقت O of n والمساحة O of n. تحب أحسّن حاجة؟»`
          ],
          sol: R`تسجيل كويس لـ Two Sum (مدته ٨–١٥ دقيقة) فيه:
- إعادة المسألة وسؤال افتراضات في أول دقيقة.
- مثال صغير قبل أي كود.
- [[O of n squared]] للـ brute force، وبعدين [[O of n]] للـ hash map، بصوت عالي.
- كلام كل ٢٠–٣٠ ثانية على الأقل وانت بتكتب ([[Now I'm adding the number to the map]]).
- اختبار بمثال و edge cases قبل [[I think it's done]].

الحل نفسه للمرجع تحت (JavaScript).

لو أطول سكوت عندك أكتر من دقيقة، غالبًا كان وقت كتابة الـ loop: الحل إنك تقول الخطوة قبل ما تكتبها. ولو نسيت تقول الـ complexity، ضيف [[Time is... space is...]] للجملة الأخيرة وخلاص.`,
          solCode: R`function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11], 9)); // [ 0, 1 ]
console.log(twoSum([3, 3], 6));     // [ 0, 1 ]
console.log(twoSum([], 5));         // []`
        },
        {
          cmd: "آخر الانترفيو",
          title: "آخر ٥ دقايق: أسئلتك للإنترفيوير والـ next steps والـ thank-you",
          desc: R`الأسئلة نفسها (تسأل إيه ومين) في درس [[أسئلتك للإنترفيوير]] في «تاب الانترفيو». هنا اللغة: إزاي تسأل بشكل طبيعي، وإزاي تتفاعل مع الإجابة (مش تسأل وتسكت)، وإزاي تقفل.

التفاعل مع الإجابة: بعد ما يجاوب، جملة قصيرة بتبين إنك سمعت: [[That makes sense]]، و [[That sounds great]]، و [[Interesting, so ...]]، أو follow-up صغير: [[How does that work for new people?]]. ده بيحول الأسئلة لحوار.

القفلة: [[What are the next steps?]] (المراحل الجاية إيه)، و [[When can I expect to hear back?]] (إمتى أعرف)، وشكر محدد: [[Thank you for your time. I really enjoyed the technical discussion, especially the part about ...]]. وبعدها بيوم إيميل شكر قصير.`,
          example: R`Q: Do you have any questions for us?
A: Yes, a few. What would success look like in the first three months for this role?
A: That makes sense. And how do new developers usually get feedback on their code?
A: That sounds great. One more: what's the biggest technical challenge the team is working on right now?
A: Interesting. So the migration to microservices is still in progress?
A: Thanks, that's really helpful. What are the next steps in the process?
A: And when can I expect to hear back?
A: Thank you for your time. I really enjoyed the discussion, especially the part about your deployment pipeline.
Email: Hi Sara, thank you again for today's interview. I enjoyed learning about the team, and I'm excited about the role. Best, Ahmed`,
          try: R`حضّر ٣ أسئلة لشركة حقيقية، ولكل سؤال جهّز «ردة فعل» جاهزة (That makes sense و That sounds great و Interesting, so...). اعمل رول بلاي مع صاحب أو AI يجاوب عليهم، وخلّص بجملتين القفلة. وبعدين اكتب إيميل الشكر في ٣ جمل.`,
          flag: "script",
          deep: {
            why: R`آخر ٥ دقايق بتفضل في دماغ الإنترفيوير. والسؤال الذكي مع تفاعل حقيقي بيبين إنك مهتم فعلًا ومش حافظ أسئلة من النت. وسؤال الـ next steps عملي: بيوفر عليك أسابيع قلق.`,
            how: R`أسئلة جاهزة بإنجليزي طبيعي:
[[What does a typical day look like for someone in this role?]]
[[How does a change get from a PR to production here?]]
[[How do new developers get feedback and mentoring?]]
[[What do you enjoy most about working here?]]
[[Is there anything in my background you'd like me to clarify?]] (شجاعة، وبتدّيك فرصة ترد على شك).

ردود الفعل: [[That makes sense]]، و [[That sounds great]]، و [[That's good to hear]]، و [[Interesting]]، و [[I like that]]. وحاجة من الإجابة تبني عليها.

الشكر: محدد ([[especially the part about...]]) أحسن من عام. و [[It was nice meeting you]] أو [[Nice to meet you]].

إيميل الشكر: ٣ جمل، نفس اليوم أو تاني يوم. مش ضروري، بس لطيف وبيفتكّرهم بيك. ومتطلبش فيه حاجة.

ولو معندكش أسئلة فعلًا (اتجاوبت كلها): [[I think you've answered most of my questions already. Maybe just one: ...]] ومتقولش [[No]].`,
            when: "آخر كل جولة انترفيو، مع الـ recruiter أو المهندس أو المدير.",
            mistakes: R`[[No, I don't have questions]]. وتسأل عن المرتب والأجازات مع المهندس في الجولة التقنية. وتسأل ٦ أسئلة والوقت خلص. وتسأل وتسكت بعد الإجابة. و [[What is the next step?]] مقبولة، بس الأشهر [[What are the next steps?]]. وإيميل شكر طويل فيه إعادة للانترفيو كله.`
          },
          teach: R`## الفكرة: سؤال، ورد فعل، وسؤال مبني على الإجابة، وقفلة

المثال حوار: سؤال الإنترفيوير، و ٧ ردود بتاعتك، وإيميل شكر. الحيلة إن كل سؤال بعد الأول بيبدأ برد فعل على الإجابة اللي قبله.

---

## ١. السؤال الأول (أول سطرين)

[[Do you have any questions for us?]] ← [[Yes, a few. What would success look like in the first three months for this role?]]: [[a few]] = كام سؤال. و [[What would success look like]] = النجاح هيبقى شكله إيه. سؤال بيوريك المتوقع منك، وبيبين إنك بتفكر في الشغل نفسه.

## ٢. رد فعل + سؤال (السطر ٣ و ٤ و ٥)

| رد الفعل | السؤال اللي بعده |
|---|---|
| [[That makes sense.]] | [[And how do new developers usually get feedback on their code?]] |
| [[That sounds great.]] | [[One more: what's the biggest technical challenge the team is working on right now?]] |
| [[Interesting.]] | [[So the migration to microservices is still in progress?]] |

السطر الخامس هو الأقوى: [[So ... is still in progress?]] سؤال **مبني على كلامهم**، بيوري إنك سمعت. و [[in progress]] = لسه شغال.

## ٣. الخطوات الجاية (السطر ٦ و ٧)

[[Thanks, that's really helpful. What are the next steps in the process?]] و [[And when can I expect to hear back?]]: [[hear back]] = أسمع رد. سؤالين عمليين بيوفّروا عليك قلق.

## ٤. الشكر (السطر التامن)

[[Thank you for your time. I really enjoyed the discussion, especially the part about your deployment pipeline.]]: [[especially the part about...]] بيخلي الشكر محدد، مش جملة محفوظة.

## ٥. إيميل الشكر (آخر سطر)

٣ جمل: شكر ([[thank you again for today's interview]])، وحاجة عجبتك ([[I enjoyed learning about the team]])، وحماس ([[I'm excited about the role]]). و [[Best,]] قبل اسمك. من غير طلبات.

---

## الخلاصة

| المرحلة | الجملة |
|---|---|
| أول سؤال | [[What would success look like in the first three months?]] |
| رد فعل | [[That makes sense.]] / [[That sounds great.]] |
| مبني على كلامهم | [[So ... is still ...?]] |
| بعدها | [[What are the next steps?]] / [[When can I expect to hear back?]] |
| قفلة | [[I really enjoyed ..., especially ...]] |

ومتقولش [[No, I don't have questions]].`,
          lines: [
            R`«عندك أي أسئلة لينا؟»`,
            R`«أيوه، كام سؤال. النجاح في أول ٣ شهور في الدور ده شكله إيه؟»`,
            R`ردة فعل + سؤال: «منطقي. والـ developers الجداد بياخدوا feedback على الكود إزاي؟»`,
            R`«حلو جدًا. سؤال كمان: إيه أكبر تحدي تقني الفريق شغال عليه دلوقتي؟»`,
            R`follow-up من الإجابة: «مثير للاهتمام. يعني الـ migration للـ microservices لسه شغالة؟»`,
            R`«شكرًا، مفيد جدًا. إيه الخطوات الجاية؟»`,
            R`«وإمتى أتوقع أسمع منكم؟» hear back = أسمع رد.`,
            R`شكر محدد: «شكرًا على وقتكم. استمتعت بالنقاش، خصوصًا الجزء عن الـ deployment pipeline».`,
            R`إيميل الشكر: ٣ جمل: شكر، وحاجة عجبتك، وحماسك. من غير طلبات.`
          ],
          sol: R`مثال رول بلاي:
[[Me: What does a typical week look like for a junior on your team?]]
[[Them: We do a standup every morning, and juniors pair with a senior twice a week.]]
[[Me: That sounds great. How do you choose the tasks for juniors in the first month?]]
...
[[Me: Thanks, that's really helpful. What are the next steps? ... Great. Thank you for your time, I really enjoyed hearing about the pairing sessions.]]

إيميل الشكر:
[[Hi Omar, thank you for taking the time to talk with me today. I especially enjoyed hearing about how your team pairs juniors with seniors. I'm excited about the opportunity and look forward to hearing from you. Best regards, Mona]]

راجع: فيه ردة فعل بعد كل إجابة؟ فيه follow-up واحد مبني على كلامهم؟ الشكر محدد؟`
        },
        {
          cmd: "salary بالإنجليزي",
          title: "المرتب بالإنجليزي: «What are your salary expectations?» و gross و net و range",
          desc: R`استراتيجية التفاوض (الأرقام الـ ٣، والسوق، والعرض التاني) في درس [[التفاوض]] في «تاب الشغل والكارير»، وتقييم العرض في [[تقييم العرض]]. هنا اللغة والكلمات اللي لو مفهمتهاش ممكن تخسر فلوس.

أهم فرق: [[gross]] = قبل الضرايب والتأمينات، و [[net]] = اللي بيوصل إيدك. في مصر الكلام غالبًا [[net]] و [[per month]]. برا غالبًا [[gross]] و [[per year]] ([[annual]]). فاسأل دايمًا: [[Is that gross or net? Monthly or annual?]]

كلمات: [[base salary]] (الأساسي)، و [[bonus]]، و [[benefits]] (مزايا: تأمين صحي، ولابتوب، وكورسات)، و [[health insurance]]، و [[equity]] أو [[stock options]] (أسهم)، و [[probation period]] (فترة الاختبار)، و [[notice period]] (المدة اللي لازم تبلّغ فيها قبل ما تمشي)، و [[range]] (مدى)، و [[negotiable]]، و [[total compensation]] (كل حاجة مع بعض). وللشغل remote لبرا: [[contractor]] ولا [[employee]]، و [[in USD]]، و [[paid through...]] (بتتقبض إزاي). والتفاصيل في درس [[remote لبرا]] في «تاب الشغل والكارير».`,
          example: R`Q: What are your salary expectations?
A: Based on my research for junior roles in Cairo, I'm looking for something in the range of 25 to 30 thousand pounds net per month.
A: I'm flexible, depending on the full package: benefits, learning budget, and remote days.
A: Before I give a number, could you share the budget range for this role?
A: Just to make sure: is that gross or net, and is it monthly or annual?
A: Thank you for the offer. I'm really excited about the role. Is there any flexibility on the base salary?
A: If the base is fixed, could we agree on a salary review after the probation period?
A: What's the notice period, and when would you like me to start?
A: Could you send me the offer in writing, so I can review the details?`,
          try: R`حدد رينج حقيقي لنفسك (من درس [[التفاوض]] في «تاب الشغل والكارير»). وبعدين قول بصوت عالي وسجّل: (١) إجابتك على [[What are your salary expectations?]] بالرينج. (٢) السؤال عن gross ولا net. (٣) ردك على [[That's above our budget. The maximum is 22 thousand.]] بجملة فيها شكر وطلب مراجعة بعد الـ probation.`,
          flag: "script",
          deep: {
            why: R`في كلام المرتبات بالإنجليزي، سوء فهم كلمة واحدة ([[gross]] ولا [[net]]، شهري ولا سنوي) ممكن يفرق آلاف. واللي إنجليزيته ضعيفة غالبًا بيقول [[OK]] على أول رقم عشان مش عارف يتفاوض بالإنجليزي. الجمل الجاهزة دي بتحل ده.`,
            how: R`الأرقام بصوت عالي: [[25,000]] = [[twenty-five thousand]] أو [[twenty-five K]]، و [[$2,500]] = [[twenty-five hundred dollars]] أو [[two and a half K]]، و [[$40k a year]] = [[forty K a year]]. وخلي بالك من [[fifteen]] و [[fifty]] (درس «1.5k و 99.9%»).

الرينج: [[in the range of X to Y]] أو [[between X and Y]]. وأول الرينج لازم يبقى فوق أقل رقم تقبله.

لو مش عايز تقول رقم الأول: [[I'd like to learn more about the role first. Could you share the budget range?]] ولو أصروا، قول الرينج.

الشكر والحماس قبل أي تفاوض: [[Thank you for the offer. I'm really excited about the role.]] وبعدين [[Is there any flexibility on...?]] أو [[Would it be possible to...?]].

وكل حاجة اتفقتوا عليها بالكلام: [[Could you send me the offer in writing?]].

والتوقيت: متسألش عن المرتب في أول ٥ دقايق مع المهندس. مع الـ recruiter أو الـ HR عادي، وغالبًا هما اللي بيسألوا.`,
            when: "مكالمة الـ recruiter الأولى (غالبًا بيسأل عن التوقعات)، ومرحلة العرض، ومراجعة المرتب بعد الـ probation.",
            mistakes: R`[[I want as much as possible]] أو [[Whatever you think]] (بتخسر). ورقم من غير ما تعرف gross ولا net. و [[I need more money because my rent is high]] (سبب شخصي؛ السبب الأقوى السوق أو المهارة). و [[OK]] على أول عرض بسرعة من التوتر. و [[fifty thousand]] وانت قصدك [[fifteen]].`
          },
          teach: R`## الفكرة: رينج مبني على السوق، ووضوح gross/net، وشكر قبل أي طلب

المثال حوار: سؤال واحد و ٨ ردود بتغطي: الرينج، والمرونة، وطلب رينجهم، والتوضيح، والتفاوض بعد العرض، وتفاصيل العقد.

---

## ١. الرينج (السطر ٢)

~~~text A
Based on my research for junior roles in Cairo, I'm looking for something in the range of 25 to 30 thousand pounds net per month.
~~~

| الحتة | وظيفتها |
|---|---|
| [[Based on my research]] | الرقم جاي من السوق مش من مزاجك |
| [[I'm looking for something in the range of]] | مدى مش رقم |
| [[25 to 30 thousand pounds]] | twenty-five to thirty thousand |
| [[net per month]] | صافي، شهري |

## ٢. مرونة أو رينجهم الأول (السطر ٣ و ٤)

[[I'm flexible, depending on the full package: benefits, learning budget, and remote days.]]: [[the full package]] = كل حاجة مع بعض. و [[Before I give a number, could you share the budget range for this role?]]: بتطلب رقمهم الأول بأدب.

## ٣. التوضيح (السطر ٥)

[[Just to make sure: is that gross or net, and is it monthly or annual?]]

| الكلمة | المعنى | النطق |
|---|---|---|
| [[gross]] | قبل الضرايب والتأمينات | «گروس» (o طويلة) |
| [[net]] | اللي بيوصل إيدك | «نِت» |
| [[monthly]] / [[annual]] | شهري / سنوي | «**آ**-نيو-َل» |

## ٤. بعد العرض (السطر ٦ و ٧)

[[Thank you for the offer. I'm really excited about the role. Is there any flexibility on the base salary?]]: شكر + حماس، **وبعدين** الطلب. [[flexibility]] «فلِك-سِ-**بِ**-لِ-تي». و [[base salary]] = الأساسي.

[[If the base is fixed, could we agree on a salary review after the probation period?]]: بديل لو الرقم مش بيتحرك. [[probation period]] «پرو-**بيْ**-شَن» = فترة الاختبار.

## ٥. تفاصيل (آخر سطرين)

[[What's the notice period, and when would you like me to start?]]: [[notice period]] = المدة اللي لازم تبلّغ فيها قبل ما تسيب. و [[Could you send me the offer in writing, so I can review the details?]]: [[in writing]] = مكتوب.

---

## الخلاصة

| الموقف | الجملة |
|---|---|
| السؤال عن توقعاتك | [[I'm looking for something in the range of X to Y, net per month.]] |
| مش عايز تبدأ | [[Could you share the budget range?]] |
| توضيح | [[Is that gross or net? Monthly or annual?]] |
| تفاوض | [[Thank you... Is there any flexibility on...?]] |
| بديل | [[a salary review after the probation period]] |
| أمان | [[Could you send me the offer in writing?]] |

وخلي بالك من [[fifteen]] و [[fifty]] في الأرقام (درس «1.5k و 99.9%»).`,
          lines: [
            R`السؤال: «توقعاتك للمرتب إيه؟»`,
            R`رينج مبني على السوق: «بناءً على بحثي لأدوار junior في القاهرة، بدوّر على حاجة في حدود ٢٥ لـ ٣٠ ألف صافي في الشهر».`,
            R`مرونة: «مرن، حسب الـ package كله: المزايا، وميزانية التعلم، وأيام الـ remote».`,
            R`تطلب رينجهم الأول: «قبل ما أقول رقم، ممكن تقولولي ميزانية الدور ده؟»`,
            R`توضيح: «عشان أتأكد: ده قبل الضرايب ولا صافي؟ شهري ولا سنوي؟»`,
            R`بعد العرض: «شكرًا على العرض، متحمس جدًا للدور. فيه مرونة في الأساسي؟»`,
            R`بديل: «لو الأساسي ثابت، ممكن نتفق على مراجعة المرتب بعد فترة الاختبار؟»`,
            R`«فترة الإخطار كام، وتحبوا أبدأ إمتى؟» notice period = مدة الإخطار قبل ما تسيب.`,
            R`«ممكن تبعتولي العرض مكتوب عشان أراجع التفاصيل؟» in writing = مكتوب.`
          ],
          sol: R`نموذج (غيّر الأرقام لأرقامك):
(١) [[Based on what I've seen for junior full-stack roles in Cairo, I'm looking for something between 25 and 30 thousand pounds net per month, depending on the full package.]]
(٢) [[Just to make sure I understand: is that number gross or net, and monthly or annual?]]
(٣) [[I understand, thank you for being transparent. I'm still very interested in the role. If 22 is the maximum for now, could we agree in writing on a salary review after the three-month probation?]]

راجع التسجيل: الأرقام واضحة ([[twenty-five]] مش مبلوعة)؟ فيه [[net]] أو [[gross]]؟ في (٣) فيه شكر قبل الطلب؟ الإجابة الضعيفة لـ (٣): [[OK, no problem.]] على طول، أو [[No, this is too low.]] ناشفة.`
        },
        {
          cmd: "التوتر وتطلب يعيد",
          title: "اتوترت واتلخبطت في نص الجملة: جمل ترجع بيها من غير ما تنهار",
          desc: R`جمل طلب الإعادة والتوضيح الأساسية في درس [[English وانجليزيتك مش قوية]] في «تاب الانترفيو» ودرس «مش فاهم بأدب» في التاب ده. هنا حاجة مختلفة: انت اللي بتتكلم، وفجأة: نسيت الكلمة، أو الجملة اتلخبطت، أو نسيت انت كنت بتقول إيه، أو قلت حاجة غلط. ودي أكتر لحظات التوتر في الانترفيو.

الحل: جمل «رجوع» محفوظة. [[Sorry, let me start that again.]] لما الجملة تتلخبط. [[Let me rephrase that.]] لما تقول حاجة بشكل مش واضح. [[What I mean is...]] وبعدين نفس الفكرة بكلام أبسط. [[Sorry, I've lost my train of thought. Could you remind me of the question?]] لما تنسى انت فين. [[Actually, let me correct that...]] لما تقول معلومة غلط.

والـ native speakers بيقولوا الجمل دي طول الوقت. هي مش علامة ضعف، هي علامة إنك بتراقب كلامك.`,
          example: R`Sorry, let me start that again.
Let me rephrase that. What I mean is, the cache was hiding the real problem.
I'm not sure of the exact word in English, but it's when two requests change the same data at the same time... a race condition.
Sorry, I've lost my train of thought. Could you remind me of the question?
Actually, let me correct that: it was PostgreSQL, not MySQL.
Sorry, I'm a bit nervous. Give me a second.
Could I take a moment to think about that?
To sum up what I said: I added the index, measured it, and the query got 50 times faster.`,
          try: R`اطلب من حد (أو AI) يسألك ٣ أسئلة انترفيو وانت بتسجّل، وخليه يقاطعك مرة أو يغيّر السؤال فجأة. وعن قصد: وقف في نص جملة مرة، وقول [[Sorry, let me start that again]]، وكمّل. وبعدين قول [[I'm not sure of the exact word...]] ووصّف كلمة. الهدف تجرب الرجوع وانت مش متوتر، عشان يبقى أوتوماتيك وانت متوتر.`,
          flag: "script",
          deep: {
            why: R`اللي بيوقع الناس في الانترفيو مش الغلطة، لكن اللي بيحصل بعدها: بيتكسفوا، ويسرّعوا، ويغلطوا أكتر، والدوامة تكمّل. جملة رجوع واحدة محفوظة بتوقف الدوامة دي في ثانيتين.`,
            how: R`للتوتر نفسه (قبل الانترفيو): ١) حضّر الإجابات الأكيدة (about yourself، و STAR، والمشروع) لحد ما تبقى مريحة. ٢) اتكلم إنجليزي ١٠ دقايق قبل الانترفيو (سجّل نفسك أو كلم AI) عشان «تسخّن». ٣) ميّة جنبك، وورقة فيها كلمات مفتاحية (مش إجابات كاملة). ٤) نفَس بطيء قبل ما تبدأ.

وأثناء الانترفيو: اتكلم أبطأ من طبيعتك عن قصد. السرعة هي أكبر سبب للتلخبط والنطق الوحش.

[[Sorry, I'm a bit nervous]] مرة واحدة مقبولة جدًا وأغلب الإنترفيويرز بيتعاطفوا ويهدّوا الإيقاع. أكتر من مرة بتبان مشكلة.

الكلمة المنسية: وصّفها ([[It's the thing that...]]) أو قول مرادف أبسط، أو قولها بالعربي ووصفها ([[In Arabic we call it... it's like...]]) في الحالات القصوى. المهم تكمّل.

والتلخيص في الآخر ([[To sum up...]]) بينقذ أي إجابة اتلخبطت في نصها: الإنترفيوير بيفتكر الآخر.`,
            when: "أي لحظة تلخبط في انترفيو أو اجتماع أو presentation.",
            mistakes: R`تفضل تكمّل جملة متلخبطة لحد ما تبقى مش مفهومة. وتعتذر عن إنجليزيتك ٥ مرات. وتسكت دقيقة بعد الغلطة. وتضحك ضحكة متوترة وتقول [[sorry sorry]]. وتكمّل بمعلومة غلط عشان مكسوف تصلّحها ([[Actually, let me correct that]] أحسن بكتير).`
          },
          teach: R`## الفكرة: جملة «رجوع» لكل نوع تلخبط

المثال ٨ جمل، كل واحدة لموقف: الجملة اتلخبطت، أو مش واضحة، أو نسيت كلمة، أو نسيت السؤال، أو قلت معلومة غلط، أو متوتر، أو محتاج تفكر، أو عايز تنقذ إجابة.

---

## ١. الجمل والموقف

| الموقف | الجملة | الكلمة المفتاحية |
|---|---|---|
| الجملة اتلخبطت | [[Sorry, let me start that again.]] | [[start again]] = أبدأ من الأول |
| الكلام مش واضح | [[Let me rephrase that. What I mean is, the cache was hiding the real problem.]] | [[rephrase]] «ري-**فريْز**» = أقولها بشكل تاني |
| نسيت كلمة | [[I'm not sure of the exact word in English, but it's when two requests change the same data at the same time... a race condition.]] | وصّف الكلمة |
| نسيت السؤال | [[Sorry, I've lost my train of thought. Could you remind me of the question?]] | [[train of thought]] = سلسلة الأفكار |
| معلومة غلط | [[Actually, let me correct that: it was PostgreSQL, not MySQL.]] | [[Actually]] = في الحقيقة |
| متوتر | [[Sorry, I'm a bit nervous. Give me a second.]] | مرة واحدة بس |
| محتاج تفكر | [[Could I take a moment to think about that?]] | [[take a moment]] |
| تنقذ إجابة | [[To sum up what I said: I added the index, measured it, and the query got 50 times faster.]] | [[To sum up]] = ألخّص |

## ٢. ليه الجمل دي بتنجح

- [[What I mean is...]] بتديك فرصة تقول نفس الفكرة بكلام أبسط، من غير ما تعترف بحاجة.
- وصف الكلمة المنسية ([[it's when...]]) بيوري إنك فاهم المفهوم، وده أهم من الكلمة. والإنترفيوير غالبًا هيقولها لك.
- [[Actually, let me correct that]] أحسن بكتير من إنك تكمّل بمعلومة غلط لأنك مكسوف.
- [[To sum up]] بينقذ أي إجابة اتلخبطت، لأن الإنترفيوير بيفتكر آخر جملة.

## ٣. نطق

[[nervous]] «**نِر**-ڤَس» (v مش f)، و [[rephrase]] الضغط على الآخر، و [[thought]] «ثوت» بـ ث، و [[race condition]] «ريْس كَن-**دِ**-شَن».

---

## الخلاصة

- الغلطة مش المشكلة؛ الدوامة بعدها هي المشكلة (اعتذار، سرعة، غلطة تانية).
- جملة رجوع في أقل من ٣ ثواني، وبعدين كمّل بهدوء.
- اتكلم أبطأ من طبيعتك عن قصد.`,
          lines: [
            R`الجملة اتلخبطت: «آسف، خليني أبدأ تاني».`,
            R`«خليني أقولها بشكل تاني. قصدي إن الـ cache كان مخبّي المشكلة الحقيقية». rephrase = أعيد الصياغة.`,
            R`نسيت الكلمة: «مش متأكد من الكلمة بالإنجليزي، بس لما اتنين requests يغيروا نفس الداتا في نفس الوقت... race condition».`,
            R`نسيت انت فين: «آسف، الفكرة هربت مني. ممكن تفكرني بالسؤال؟» train of thought = سلسلة الأفكار.`,
            R`معلومة غلط: «في الحقيقة، خليني أصحح: كان PostgreSQL مش MySQL».`,
            R`«آسف، متوتر شوية. ثانية واحدة». مرة واحدة بس.`,
            R`«ممكن آخد لحظة أفكر؟»`,
            R`التلخيص بينقذ الإجابة: «ألخّص اللي قلته: ضفت index، وقسته، والـ query بقت أسرع ٥٠ مرة».`
          ],
          sol: R`التسجيل الناجح مش اللي مفيهوش غلطات. الناجح اللي فيه لحظة تلخبط، وبعدها جملة رجوع في أقل من ٣ ثواني، وبعدها كلام طبيعي.

مثال: [[So I used Redis for... sorry, let me start that again. I used Redis to cache the product list, because it was read thousands of times per minute. ... What I mean is, the database was doing the same work again and again.]]

وللكلمة المنسية: [[I'm not sure of the exact word, but it's when the server sends the data in small pieces instead of all at once.]] (الكلمة [[streaming]] أو [[chunked]]). الإنترفيوير غالبًا هيقولها لك، وده عادي جدًا.

لو لقيت إن التسجيل فيه دوامة (غلطة → اعتذار → سرعة → غلطة تانية)، اتمرن على [[Sorry, let me start that again]] لوحدها ١٠ مرات بنبرة هادية، وبعدين أعد التمرين.`
        }
      ]
    }
]);
