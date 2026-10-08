// تكملة تاب english: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/english/01.js (شرح حقول الدرس في أوله)
MORE("english", [
    {
      t: "تقرا رسالة الخطأ كلمة كلمة",
      l: 1,
      n: "رسايل حقيقية من Node و npm و git و TypeScript و PostgreSQL و Python، اتشغّلت فعلًا، ومتفككة كلمة كلمة ومعاها تعمل إيه",
      items: [
        {
          cmd: "شكل رسالة الخطأ",
          title: "رسالة الخطأ متقسمة إزاي، وتبدأ تقرا منين؟",
          desc: R`أول قاعدة: متخافش من طول الرسالة. أغلب الرسايل الطويلة سطر واحد مهم والباقي تفاصيل. وأغلب الناس اللي إنجليزيتهم ضعيفة بيشوفوا الأحمر فيقفلوا ويسألوا، مع إن الحل مكتوب في الرسالة نفسها.

أي رسالة خطأ تقريبًا فيها الأجزاء دي: [[نوع الخطأ]] ([[TypeError]] و [[SyntaxError]] و [[ENOENT]] و [[TS2322]])، و [[الرسالة]] جملة قصيرة بتقول إيه اللي حصل، و [[المكان]] ملف وسطر وعمود ([[a.ts(1,7)]] أو [[at index.js:12:5]])، و [[stack trace]] مين نادى مين لحد ما الخطأ حصل، وساعات [[hint]] أو [[Did you mean]] = اقتراح للحل، و [[code]] كود ثابت تدوّر بيه.

طريقة القراية: ١) دوّر على أول سطر فيه [[Error]] أو [[error]] أو [[fatal]] أو [[ERROR]]. ٢) اقرا الجملة دي بس، وقسّمها: مين؟ حصله إيه؟ ٣) شوف المكان: ملف وسطر من كودك انت (مش node_modules). ٤) اقرا أي سطر فيه [[hint]] أو [[Did you mean]] أو [[try]] أو [[run]]: ده الحل غالبًا. ٥) لو لسه مش فاهم، انسخ الجملة الأساسية بس (من غير أسماء ملفاتك) ودوّر بيها.`,
          example: R`node app.js
/home/sara/app/app.js:3
console.log(user.name);
                 ^
TypeError: Cannot read properties of undefined (reading 'name')
    at Object.<anonymous> (/home/sara/app/app.js:3:18)
    at Module._compile (node:internal/modules/cjs/loader:1705:14)
    at Object..js (node:internal/modules/cjs/loader:1838:10)
Node.js v22.22.2`,
          try: R`اكتب ملف [[app.js]] فيه [[const user = undefined;]] وفي السطر اللي بعده [[console.log(user.name);]] وشغّله بـ [[node app.js]]. طبّق الخطوات الخمسة: اكتب في [[errors.md]] نوع الخطأ، والجملة بالعربي، والملف والسطر والعمود، وأنهي سطور من الـ stack trace كودك وأنهي كود Node نفسه.`,
          flag: "script",
          deep: {
            why: "مهارة قراية الخطأ أهم من أي حاجة في التاب ده، لأنها بتوفر ساعات كل أسبوع. والرسايل مكتوبة بإنجليزي بسيط جدًا ومتكرر: حوالي ٥٠ جملة بتغطي أغلب اللي هتشوفه في سنتك الأولى.",
            how: R`الـ stack trace بيتقري من فوق لتحت: أول سطر [[at ...]] هو المكان اللي الخطأ حصل فيه فعلًا، واللي تحته اللي ناداه، وهكذا. السطور اللي فيها [[node:internal]] أو [[node_modules]] مش كودك، عدّيها ودوّر على أول سطر فيه ملف من مشروعك.

والـ [[^]] (caret) تحت السطر بيشاور على العمود بالظبط. و [[(reading 'name')]] بتقولك إيه اللي كان بيتقري وقت ما وقع.

الأرقام [[3:18]] = سطر ٣، عمود ١٨. في VS Code تقدر تعمل Ctrl+Click على المسار في الـ terminal ويفتحلك السطر على طول.

وقاعدة عامة لكل الأدوات: [[error]] = وقف، [[warning]] أو [[warn]] = اشتغل بس فيه حاجة غلط أو هتبوظ بعدين، [[fatal]] = خطأ وقّف البرنامج كله، [[note]] أو [[hint]] أو [[info]] = معلومة إضافية.`,
            when: "كل مرة تشوف أحمر. قبل ما تسأل حد أو AI، اكتب الجملة بالعربي بنفسك الأول، ده لوحده بيحل نص المشاكل.",
            mistakes: R`تنسخ الرسالة كلها بأسماء ملفاتك وتدوّر بيها فمتلاقيش حاجة: دوّر بالجملة الأساسية بس. وتقرا آخر سطر في الـ terminal بدل أول سطر خطأ: في npm مثلًا آخر سطر دايمًا [[A complete log of this run can be found in]] ودي مش المشكلة. وتفتكر إن المشكلة في node_modules لأن الـ stack فيه أسماءها: غالبًا انت اللي بعت قيمة غلط لمكتبة.`
          },
          teach: R`## الرسالة ٥ أجزاء، وانت محتاج سطر واحد

شغّلت نفس المثال في Node 22.23 (Docker): ملف [[app.js]] فيه [[const user = undefined;]] وبعده [[console.log(user.name);]].

~~~text الناتج
/tmp/app.js:2
console.log(user.name);
                 ^

TypeError: Cannot read properties of undefined (reading 'name')
    at Object.<anonymous> (/tmp/app.js:2:18)
    at Module._compile (node:internal/modules/cjs/loader:1781:14)
    at Object..js (node:internal/modules/cjs/loader:1913:10)
    ...
Node.js v22.23.3
~~~

---

## الأجزاء

| الجزء | في الرسالة | بيقولك إيه |
|---|---|---|
| المكان | [[/tmp/app.js:2]] | الملف والسطر |
| السطر نفسه و [[^]] | [[console.log(user.name);]] | الـ caret بيشاور على العمود |
| النوع | [[TypeError]] | استخدمت قيمة بطريقة مينفعش مع نوعها |
| الجملة | [[Cannot read properties of undefined (reading 'name')]] | **أهم سطر** |
| الـ stack trace | سطور [[at ...]] | مين نادى مين |
| الإصدار | [[Node.js v22.23.3]] | مفيد في الـ bug report |

---

## الجملة كلمة كلمة

| الكلمة | معناها |
|---|---|
| [[Cannot]] | مش قادر |
| [[read properties]] | يقرا خصايص |
| [[of undefined]] | من حاجة قيمتها undefined |
| [[(reading 'name')]] | وهو بيقرا [[name]] بالذات |

يعني: [[user]] قيمته undefined.

---

## الـ stack trace

- أول سطر [[at Object.<anonymous> (/tmp/app.js:2:18)]] = كودك انت. [[2:18]] = سطر ٢ عمود ١٨. هنا تبص.
- [[node:internal/...]] = كود Node نفسه. عدّيه.
- [[<anonymous>]] = كود مالوش اسم دالة (الملف نفسه).

وأرقام زي [[loader:1781]] بتختلف من إصدار للتاني (في المثال [[1705]] وعندي [[1781]])، ومش مهمة.

---

## الخطوات الخمسة

1. لاقي أول سطر فيه [[Error]].
2. اقرا الجملة دي وقسّمها: مين؟ حصله إيه؟
3. المكان: أول ملف من مشروعك.
4. دوّر على [[hint]] أو [[Did you mean]].
5. لسه مش فاهم؟ دوّر بالجملة الأساسية من غير أسماء ملفاتك.

---

## الخلاصة

- سطر النوع والجملة هو المهم، والباقي تفاصيل.
- في Node أول [[at]] هو كودك، وفي Python العكس (آخر الرسالة).
- [[error]] وقف، [[warn]] اشتغل بس فيه حاجة، [[fatal]] وقّف كل حاجة.`,
          lines: [
            "الأمر اللي شغّلته.",
            "الملف ورقم السطر اللي فيه المشكلة (٣).",
            "السطر نفسه من كودك.",
            R`الـ [[^]] بيشاور على المكان بالظبط: عند [[.name]].`,
            R`أهم سطر: النوع TypeError، والجملة «مش قادر يقرا خصايص من undefined، وهو بيقرا name». يعني [[user]] قيمته undefined.`,
            R`أول سطر [[at]]: كودك انت، ملف app.js سطر ٣ عمود ١٨. هنا تبص.`,
            R`[[node:internal]] = كود Node نفسه. عدّيه.`,
            "برضه كود Node داخلي. عدّيه.",
            "إصدار Node، مفيد لما تسأل أو تكتب bug report."
          ],
          sol: R`الشكل المتوقع في [[errors.md]]:

[[TypeError: Cannot read properties of undefined (reading 'name')]]
النوع: TypeError (استخدمت قيمة بطريقة مينفعش مع نوعها).
بالعربي: «حاولت تقرا [[name]] من حاجة قيمتها undefined».
المكان: [[app.js:2:18]] (سطر ٢ لو الملف فيه سطرين بس، والعمود بتاع [[.name]]).
كودي: أول سطر [[at Object.<anonymous> (.../app.js:2:18)]]. كود Node: كل اللي فيه [[node:internal]].
الحل: اتأكد إن [[user]] ليه قيمة قبل ما تقرا منه، أو استخدم [[user?.name]].

(أرقام السطور الداخلية زي [[loader:1705]] بتختلف من إصدار Node للتاني، ومش مهمة.)`
        },
        {
          cmd: "أخطاء Node و JS",
          title: "٨ رسايل Node حقيقية: Cannot read properties و is not defined و EADDRINUSE",
          desc: R`دي رسايل اتشغّلت فعلًا على Node 22 (سبتمبر ٢٠٢٦). كل واحدة جملة إنجليزي بسيطة لو قسمتها. احفظ «الهيكل» مش النص بالظبط، لأن الصياغة ممكن تتغير شوية بين الإصدارات.

الكلمات المفتاحية: [[not defined]] = مش متعرّف (مفيش متغير بالاسم ده)، و [[is not a function]] = انت بتنادي حاجة مش دالة، و [[Assignment to constant variable]] = بتحط قيمة في const، و [[Cannot find module]] = مش لاقي المكتبة أو الملف، و [[EADDRINUSE]] = Error ADDRess IN USE، و [[ECONNREFUSED]] = CONNection REFUSED (مفيش حد بيسمع على البورت ده)، و [[is not valid JSON]] = النص مش JSON.`,
          example: R`ReferenceError: foo is not defined
TypeError: f is not a function
TypeError: Assignment to constant variable.
TypeError: Cannot read properties of null (reading 'map')
Error: Cannot find module 'expresss'
SyntaxError: Unexpected token '<', "<!DOCTYPE html>" is not valid JSON
Error: listen EADDRINUSE: address already in use 0.0.0.0:3000
TypeError: fetch failed  [cause]: Error: connect ECONNREFUSED 127.0.0.1:5999`,
          try: R`اتسبب في كل خطأ من دول بنفسك بسطر [[node -e '...']] (مثلًا [[node -e 'foo()']] و [[node -e 'const x=1; x=2']] و [[node -e 'require("expresss")']]). ولكل واحد اكتب في [[errors.md]]: الجملة بالعربي، وسببها عندك، والحل في سطر.`,
          flag: "script",
          deep: {
            why: "الـ ٨ دول لوحدهم هتقابلهم تقريبًا كل أسبوع في سنتك الأولى. لو اتعودت تقراهم هتحلهم في ثواني بدل ما تدوّر.",
            how: R`حلول سريعة:
[[foo is not defined]] ← غلطة في الاسم، أو نسيت import، أو المتغير في scope تاني.
[[f is not a function]] ← القيمة مش دالة: نسيت تعمل export، أو import default بدل named، أو اسم property غلط.
[[Assignment to constant variable]] ← غيّر [[const]] لـ [[let]] أو متعدّلش القيمة.
[[Cannot read properties of null (reading 'map')]] ← الداتا لسه null (غالبًا لسه بتحمّل): استخدم [[data?.map]] أو قيمة أولية [[[]]].
[[Cannot find module 'expresss']] ← اسم غلط (٣ s)، أو مش متسطّبة: [[npm i express]].
[[Unexpected token '<' ... is not valid JSON]] ← السيرفر رجّع صفحة HTML (غالبًا 404 أو صفحة خطأ) وانت عامل [[res.json()]]. اطبع [[res.status]] و [[await res.text()]].
[[EADDRINUSE ... :::3000]] ← فيه برنامج تاني ماسك البورت ٣٠٠٠ (غالبًا نسخة قديمة من سيرفرك). اقفله أو غيّر البورت. ([[:::]] معناها كل العناوين في IPv6.)
[[fetch failed ... ECONNREFUSED 127.0.0.1:5999]] ← مفيش سيرفر شغال على البورت ده. شغّله أو صلّح الـ URL. لاحظ إن السبب الحقيقي في [[cause]] مش في [[fetch failed]].`,
            when: "كل ما Node يوقع. واعمل الـ try ده مرة واحدة كتمرين: لما تتسبب في الخطأ بنفسك بتفهمه أحسن بكتير.",
            mistakes: R`تقرا [[fetch failed]] وتقف: دي رسالة عامة، والسبب الحقيقي في [[cause]] تحتها. وتفتكر إن [[not defined]] و [[undefined]] نفس الحاجة: [[not defined]] = مفيش متغير أصلًا (ReferenceError)، و [[undefined]] = المتغير موجود بس ملوش قيمة. ودي بتتسأل في الانترفيو.`
          },
          teach: R`## الـ ٨ رسايل، اتسببت فيهم بنفسي

كلهم اتشغّلوا في Node 22.23 (Docker، أكتوبر ٢٠٢٦) بسطر [[node -e '...']]، وطلعوا بنفس النص اللي في المثال، ما عدا EADDRINUSE (تحت).

| الأمر | الرسالة |
|---|---|
| [[foo()]] | [[ReferenceError: foo is not defined]] |
| [[const f=1; f()]] | [[TypeError: f is not a function]] |
| [[const x=1; x=2]] | [[TypeError: Assignment to constant variable.]] |
| [[const d=null; d.map(x=>x)]] | [[TypeError: Cannot read properties of null (reading 'map')]] |
| [[require("expresss")]] | [[Error: Cannot find module 'expresss']] و [[code: 'MODULE_NOT_FOUND']] |
| [[JSON.parse("<!DOCTYPE html>")]] | [[SyntaxError: Unexpected token '<', "<!DOCTYPE html>" is not valid JSON]] |
| سيرفرين على ٣٠٠٠ | [[Error: listen EADDRINUSE: address already in use :::3000]] |
| [[fetch("http://127.0.0.1:5999")]] | [[TypeError: fetch failed]] و [[cause: Error: connect ECONNREFUSED 127.0.0.1:5999]] |

---

## الأنواع التلاتة

| النوع | معناه |
|---|---|
| [[ReferenceError]] | بتشاور على اسم مش موجود أصلًا |
| [[TypeError]] | القيمة موجودة بس نوعها مينفعش للي بتعمله |
| [[SyntaxError]] | النص نفسه شكله غلط (كود أو JSON) |

---

## الكلمات

- [[not defined]]: مفيش متغير بالاسم ده. **مش** زي [[undefined]] (متغير موجود ملوش قيمة). جرّبت [[let y; console.log(y)]] وطلع [[undefined]] من غير أي خطأ.
- [[Assignment to constant variable]]: [[Assignment]] = إنك تحط قيمة، و [[constant]] = ثابت.
- [[listen]]: السيرفر بيستنى اتصالات على بورت. و [[EADDRINUSE]] = Error ADDRess IN USE.
- [[:::3000]]: [[::]] = كل العناوين في IPv6، و [[:3000]] البورت. عندي طلعت كده مش [[0.0.0.0:3000]] لأن Node بيسمع على IPv6 لو متاح.
- [[ECONNREFUSED]] = CONNection REFUSED: مفيش حد بيسمع على البورت.
- [[cause]]: السبب الحقيقي تحت [[fetch failed]]، اقراه دايمًا.

---

## الخلاصة

- [[not defined]] اسم ناقص، [[not a function]] بتنادي حاجة مش دالة.
- [[of null]] أو [[of undefined]] = الداتا لسه مجتش.
- [[Unexpected token '<']] = استلمت HTML بدل JSON.
- [[fetch failed]] رسالة عامة، والسبب في [[cause]].`,
          lines: [
            R`ReferenceError + not defined = «مفيش حاجة اسمها foo». اسم غلط أو ناقص import.`,
            R`is not a function = «f مش دالة» وانت بتناديها بـ ().`,
            R`Assignment to constant = «بتحط قيمة في متغير const».`,
            R`of null = القيمة null، وكنت بتنادي map عليها. الداتا لسه مجتش.`,
            R`Cannot find module = «مش لاقي المكتبة». بص على الإملاء (expresss).`,
            R`«الحرف < مش متوقع، والنص ده مش JSON». استلمت HTML بدل JSON.`,
            R`listen + address already in use = «العنوان/البورت مستخدم خلاص». حد تاني ماسك 3000. على جهاز فيه IPv6 هتشوفها [[:::3000]] بدل [[0.0.0.0:3000]].`,
            R`fetch failed وسببها [[cause]]: الاتصال اترفض، مفيش حد بيسمع على 5999. في الحقيقة دول سطرين بينهم stack trace، وجمعناهم هنا في سطر.`
          ],
          sol: R`اللي هيطلعلك (Node 22.22):
[[node -e 'foo()']] ← [[ReferenceError: foo is not defined]]. «مفيش حاجة اسمها foo». الحل: عرّفها أو صلّح الاسم.
[[node -e 'const x=1; x=2']] ← [[TypeError: Assignment to constant variable.]] الحل: [[let]].
[[node -e 'require("expresss")']] ← [[Error: Cannot find module 'expresss']] ومعاها [[code: 'MODULE_NOT_FOUND']] و [[requireStack]]. الحل: صلّح الاسم لـ express وسطّبه.
[[node -e 'JSON.parse("<!DOCTYPE html>")']] ← الرسالة اللي فوق بالظبط.

ورسالة EADDRINUSE شكلها عندك ممكن يبقى [[listen EADDRINUSE: address already in use :::3000]] أو بعنوان [[0.0.0.0]] حسب إنت عامل listen على إيه. الجملة المهمة [[address already in use]] ثابتة.

لو الناتج مختلف شوية في الصياغة (إصدار Node تاني)، مفيش مشكلة: الكلمات المفتاحية هي هي.`
        },
        {
          cmd: "أخطاء npm",
          title: "رسايل npm: E404 و Missing script و ERESOLVE و deprecated",
          desc: R`npm بيحب يطبع كتير، وكل سطر بيبدأ بـ [[npm error]] أو [[npm warn]]. القاعدة: اقرا سطر [[npm error code]] الأول (الكود)، وبعدين أول ٣ سطور بعده. وآخر سطر [[A complete log of this run can be found in]] مجرد مكان ملف اللوج، مش المشكلة.

الأكواد اللي هتشوفها: [[E404]] الباكدج مش موجودة في الـ registry (غالبًا اسم غلط)، و [[ENOENT]] ملف مش موجود (غالبًا مفيش package.json في الفولدر ده)، و [[Missing script]] مفيش script بالاسم ده في package.json، و [[ERESOLVE]] تعارض في الإصدارات بين المكتبات (peer dependencies)، و [[EACCES]] مفيش صلاحية (متستخدمش sudo، صلّح الصلاحيات)، و [[npm warn deprecated]] تحذير إن مكتبة قديمة.`,
          example: R`npm error code E404
npm error 404 'this-package-does-not-exist-xyz-123@*' is not in this registry.
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory
npm error Missing script: "startt"
npm error Did you mean one of these?
npm error   npm start # Start a package
npm error ERESOLVE unable to resolve dependency tree
npm error Could not resolve dependency:
npm error peer react@"17.0.2" from react-dom@17.0.2
npm error Fix the upstream dependency conflict, or retry
npm error this command with --force or --legacy-peer-deps
npm error to accept an incorrect (and potentially broken) dependency resolution.`,
          try: R`في فولدر تجربة فاضي: شغّل [[npm run start]] (من غير package.json)، وبعدين [[npm init -y]] وشغّل [[npm run startt]]، وبعدين [[npm i react@19 react-dom@17]]. لكل واحد اكتب الكود والجملة المهمة بالعربي والحل. وامسح الفولدر بعدها.`,
          flag: "script",
          deep: {
            why: R`npm بيطلع أخطاء طويلة ومخيفة، ونص المبتدئين بيحلوها بـ [[--force]] أو بمسح node_modules من غير ما يفهموا. قراية ERESOLVE صح بتقولك بالظبط مين متعارض مع مين.`,
            how: R`فك ERESOLVE: [[Found: react@19.3.0]] = اللي عندك. [[Could not resolve dependency: peer react@"17.0.2" from react-dom@17.0.2]] = react-dom 17 عايز (peer) react 17 بالظبط. يعني المشكلة: react-dom قديم على react جديد. الحل الصح: خلّي الاتنين نفس الإصدار ([[npm i react@19 react-dom@19]]).

والرسالة نفسها بتقترح [[--force]] أو [[--legacy-peer-deps]]، بس اقرا الباقي: [[to accept an incorrect (and potentially broken) dependency resolution]] = «عشان تقبل حل غلط (وممكن يكون بايظ)». يعني npm بنفسه بيقولك الاقتراح ده خطر. [[potentially]] = احتمال.

و [[upstream]] هنا = المكتبة اللي انت معتمد عليها (مش كودك).

و [[Did you mean one of these?]] = «تقصد واحدة من دول؟»، وبعدها الاقتراحات. ده في npm و git والـ CLI عمومًا.`,
            when: R`أي [[npm install]] أو [[npm run]] بيفشل. اقرا [[npm error code]] الأول.`,
            mistakes: R`تحط [[--force]] أو [[--legacy-peer-deps]] على طول لأن npm اقترحها: بتخبّي المشكلة وتطلعلك بعدين في runtime. وتقرا آخر سطر (مكان اللوج) وتفتكره المشكلة. وتستخدم [[sudo npm i -g]] لما تشوف EACCES: بيعمل مشاكل صلاحيات أكبر (استخدم nvm).`
          },
          teach: R`## اقرا [[npm error code]] الأول

كل الرسايل دي اتشغّلت فعلًا بـ npm 10.9 في Docker ([[node:22-slim]]) في فولدر فاضي.

---

## ١. [[npm run start]] من غير package.json

~~~text الناتج
npm error code ENOENT
npm error syscall open
npm error path /tmp/t/package.json
npm error errno -2
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory, open '/tmp/t/package.json'
npm error enoent This is related to npm not being able to find a file.
npm error A complete log of this run can be found in: /root/.npm/_logs/...-debug-0.log
~~~

- [[code ENOENT]]: مفيش ملف.
- [[Could not read package.json]]: «مقدرتش أقرا package.json».
- [[This is related to npm not being able to find a file]]: «ده متعلق بإن npm مش لاقي ملف».
- آخر سطر مكان ملف اللوج، **مش** المشكلة.

---

## ٢. [[npm run startt]]

~~~text الناتج
npm error Missing script: "startt"
npm error
npm error Did you mean one of these?
npm error   npm star # Mark your favorite packages
npm error   npm stars # View packages marked as favorites
npm error   npm start # Start a package
~~~

[[Missing script]] = مفيش script بالاسم ده. و [[Did you mean one of these?]] = «تقصد واحد من دول؟». و [[#]] وبعدها وصف الأمر.

---

## ٣. اسم باكدج مش موجود

~~~text الناتج
npm error code E404
npm error 404 Not Found - GET https://registry.npmjs.org/this-package-does-not-exist-xyz-123 - Not found
npm error 404  'this-package-does-not-exist-xyz-123@*' is not in this registry.
~~~

[[registry]] = المكان اللي npm بيجيب منه. و [[@*]] = أي إصدار.

---

## ٤. [[npm i react@19 react-dom@17]]

~~~text الناتج
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error While resolving: t@1.0.0
npm error Found: react@19.3.0
npm error node_modules/react
npm error   react@"19" from the root project
npm error Could not resolve dependency:
npm error peer react@"17.0.2" from react-dom@17.0.2
npm error Fix the upstream dependency conflict, or retry
npm error this command with --force or --legacy-peer-deps
npm error to accept an incorrect (and potentially broken) dependency resolution.
~~~

| السطر | معناه |
|---|---|
| [[unable to resolve dependency tree]] | مش قادر يرتّب شجرة المكتبات |
| [[While resolving: t@1.0.0]] | وهو بيرتّب مشروعك (اسمه t) |
| [[Found: react@19.3.0]] | اللي عندك |
| [[peer react@"17.0.2" from react-dom@17.0.2]] | react-dom 17 عايز react 17 بالظبط |
| [[Fix the upstream dependency conflict]] | صلّح التعارض في المكتبات |
| [[or retry ... --force]] | أو اقبل الحل الغلط |
| [[incorrect (and potentially broken)]] | غلط، وممكن يكون بايظ |

[[peer]] = «زميل»: مكتبة لازم تبقى موجودة جنبها بإصدار معيّن. والحل الصح: نفس الإصدار للاتنين.

---

## الخلاصة

| الكود | المعنى | الحل |
|---|---|---|
| [[ENOENT]] | مفيش package.json هنا | الفولدر الصح |
| [[Missing script]] | مفيش script بالاسم ده | الاسم في package.json |
| [[E404]] | الباكدج مش موجودة | الإملاء |
| [[ERESOLVE]] | تعارض إصدارات | وحّد الإصدارات، مش [[--force]] |`,
          lines: [
            R`الكود: E404 = مش موجود.`,
            R`«الباكدج دي مش موجودة في الـ registry». [[@*]] = أي إصدار. الحل: صلّح الاسم.`,
            R`enoent + Could not read package.json = مفيش package.json هنا. انت في الفولدر الغلط.`,
            R`Missing script = «مفيش script اسمه startt». غلطة كتابة.`,
            R`«تقصد واحد من دول؟»`,
            R`الاقتراح الصح: [[npm start]]. (الـ # وبعدها وصف الأمر.)`,
            R`ERESOLVE = «مش قادر يحل شجرة الـ dependencies». فيه تعارض.`,
            R`«مش قادر يحل dependency:» والسطر الجاي بيقول مين.`,
            R`peer = react-dom 17.0.2 عايز react 17.0.2 بالظبط، وانت عندك غيره.`,
            R`«صلّح التعارض في المكتبات، أو أعد الأمر بـ --force أو --legacy-peer-deps»`,
            "تكملة الجملة اللي فوق.",
            R`«عشان تقبل حل غلط وممكن يكون بايظ». يعني الاقتراح ده خطر، والحل الصح توحّد الإصدارات.`
          ],
          sol: R`اللي هيطلعلك (npm 10.9، سبتمبر ٢٠٢٦):

[[npm run start]] من غير package.json ← [[npm error code ENOENT]] و [[Could not read package.json: Error: ENOENT: no such file or directory, open '.../package.json']]. بالعربي: «مش لاقي package.json». الحل: [[cd]] للفولدر الصح أو [[npm init -y]].

[[npm run startt]] ← [[npm error Missing script: "startt"]] وبعدها [[Did you mean one of these?]] وفيها اقتراحات زي [[npm star]] و [[npm start]]. الحل: [[npm start]] أو صلّح الاسم في package.json.

[[npm i react@19 react-dom@17]] ← ERESOLVE: [[Found: react@19.3.0]] ثم [[peer react@"17.0.2" from react-dom@17.0.2]]. الحل: [[npm i react@19 react-dom@19]]، مش [[--force]]. (رقم إصدار react 19 عندك ممكن يبقى مختلف.)`
        },
        {
          cmd: "أخطاء git",
          title: "رسايل git: pathspec و rejected و CONFLICT و Please tell me who you are",
          desc: R`git بيكتب بثلاث مستويات: [[fatal:]] وقف خالص، و [[error:]] العملية فشلت، و [[hint:]] نصيحة للحل (اقراها دايمًا!). وكتير من رسايل git فيها الحل مكتوب حرفيًا، زي [[use "git add" to track]] أو [[Run git config --global user.email]].

كلمات git المهمة: [[track]] يتابع ملف، و [[staged]] جاهز للـ commit، و [[pathspec]] اسم ملف أو مسار انت كتبته، و [[ref]] و [[refspec]] اسم branch أو tag، و [[remote]] الـ repo اللي برا (GitHub)، و [[upstream]] و [[tracking information]] الـ branch اللي برا المربوط بالـ branch بتاعك، و [[fast-forward]] دمج من غير commit جديد، و [[unrelated histories]] تاريخين ملهمش أصل مشترك، و [[detached HEAD]] انت واقف على commit مش على branch.`,
          example: R`nothing to commit (create/copy files and use "git add" to track)
error: pathspec 'nobranch' did not match any file(s) known to git
fatal: not a git repository (or any of the parent directories): .git
*** Please tell me who you are.
! [rejected]        HEAD -> master (fetch first)
hint: Updates were rejected because the remote contains work that you do not
hint: have locally.
CONFLICT (content): Merge conflict in f
Automatic merge failed; fix conflicts and then commit the result.
There is no tracking information for the current branch.
fatal: refusing to merge unrelated histories
fatal: cannot switch branch while merging`,
          try: R`في فولدر تجربة: [[git init]]، وبعدين [[git commit -m x]] (من غير ملفات)، وبعدين [[git checkout nobranch]]، وبعدين اعمل branch وعدّل نفس السطر في ملف على الـ branch وعلى main واعمل merge. لكل رسالة اكتب الجملة المهمة بالعربي والأمر اللي يحلها.`,
          flag: "script",
          deep: {
            why: R`git من أكتر الأدوات اللي المبتدئ بيخاف منها، ونص الخوف ده من الرسايل. بس رسايل git من أوضح الرسايل: غالبًا فيها [[hint:]] بتقولك تعمل إيه بالظبط.`,
            how: R`الحلول:
[[nothing to commit ... use "git add" to track]] ← مفيش تغييرات متضافة. [[git add]] الأول.
[[pathspec 'nobranch' did not match]] ← مفيش branch أو ملف بالاسم ده. [[git branch -a]] وشوف الأسماء.
[[not a git repository]] ← انت مش جوه repo. [[cd]] للفولدر الصح.
[[Please tell me who you are]] ← git مش عارف اسمك وإيميلك، والرسالة نفسها فيها الأمرين: [[git config --global user.email ...]] و [[user.name]].
[[rejected ... (fetch first)]] + [[the remote contains work that you do not have locally]] ← حد عمل push قبلك. [[git pull]] (أو [[git pull --rebase]]) وبعدين push.
[[CONFLICT (content): Merge conflict in f]] ← نفس السطر اتغير في الناحيتين. افتح الملف، اختار، [[git add]]، [[git commit]].
[[no tracking information]] ← الـ branch مش مربوط بـ branch برا. [[git push -u origin main]] أو [[git branch --set-upstream-to]].
[[refusing to merge unrelated histories]] ← غالبًا عملت repo على GitHub فيه README وrepo محلي منفصل. فكّر كويس قبل [[--allow-unrelated-histories]].
[[cannot switch branch while merging]] ← كمّل الـ merge أو [[git merge --abort]].

والكلمات: [[contains]] = فيه، و [[locally]] = عندك على جهازك، و [[refusing]] = رافض، و [[while]] = وانت في النص.`,
            when: "أي أمر git فشل. اقرا hint قبل ما تدوّر. والتفاصيل التقنية لكل أمر في «تاب Git».",
            mistakes: R`تحل [[rejected]] بـ [[git push --force]]: كده بتمسح شغل زميلك. الـ hint قالك [[git pull]] مش force. وتتجاهل [[hint:]] لأنها «مش error». وتفهم [[fetch first]] «هات الأول» فتعمل [[git fetch]] بس وتنسى تدمج.`
          },
          teach: R`## ٣ مستويات: [[fatal:]] و [[error:]] و [[hint:]]

[[fatal]] وقف خالص، و [[error]] العملية فشلت، و [[hint]] نصيحة للحل. اتسببت في كل الرسايل دي بنفسي في repos تجريبية بـ Git 2.56 على ويندوز.

---

## الرسايل

### nothing to commit

~~~text الناتج
nothing to commit (create/copy files and use "git add" to track)
~~~

[[track]] = «يتابع». الحل مكتوب بين القوسين.

> لو git مش عارف اسمك، [[git commit]] بيطلّع رسالة «Please tell me who you are» **قبل** ما يقول nothing to commit. فلو جربت ولقيت دي، ظبّط الاسم الأول.

### Please tell me who you are

~~~text الناتج
Author identity unknown

*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.
~~~

[[Author identity unknown]] = «هوية الكاتب مش معروفة». و [[Omit --global]] = «شيل --global» عشان الإعداد يبقى للـ repo ده بس. الأوامر نفسها مكتوبة.

### pathspec

~~~text الناتج
error: pathspec 'nobranch' did not match any file(s) known to git
~~~

[[pathspec]] = الاسم اللي كتبته. و [[did not match]] = «مطابقش». و [[known to git]] = «git يعرفه».

### rejected

~~~text الناتج
 ! [rejected]        main -> main (fetch first)
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. This is usually caused by another repository pushing to
hint: the same ref. If you want to integrate the remote changes, use
hint: 'git pull' before pushing again.
~~~

| الحتة | معناها |
|---|---|
| [[main -> main]] | من الـ branch بتاعك للـ branch اللي برا (في المثال [[HEAD -> master]]، نفس الفكرة) |
| [[(fetch first)]] | هات اللي برا الأول |
| [[the remote contains work that you do not have locally]] | اللي برا فيه شغل مش عندك |
| [[integrate]] | تدمج |
| [[use 'git pull' before pushing again]] | الحل: pull قبل push |

### CONFLICT

~~~text الناتج
Auto-merging f
CONFLICT (content): Merge conflict in f
Automatic merge failed; fix conflicts and then commit the result.
~~~

وبعدها لما جربت [[git switch feat]]:

~~~text الناتج
fatal: cannot switch branch while merging
Consider "git merge --quit" or "git worktree add".
~~~

[[while merging]] = وانت في نص merge. و [[Consider]] = «فكّر في». (الطبيعي عندك تكمّل الـ merge أو [[git merge --abort]].)

### no tracking information

~~~text الناتج
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
~~~

[[specify]] = حدّد. الـ branch مش مربوط بـ branch برا.

### unrelated histories

~~~text الناتج
fatal: refusing to merge unrelated histories
~~~

[[refusing]] = رافض، و [[unrelated]] = ملهمش علاقة ببعض.

---

## الخلاصة

| الرسالة | الحل |
|---|---|
| nothing to commit | [[git add]] |
| Please tell me who you are | [[git config user.name]] و [[user.email]] |
| pathspec did not match | [[git branch -a]] وشوف الأسماء |
| rejected (fetch first) | [[git pull]] وبعدين push، مش [[--force]] |
| CONFLICT | صلّح الملف، [[git add]]، [[git commit]] |
| no tracking information | [[git push -u origin main]] |`,
          lines: [
            R`«مفيش حاجة تتعمل commit (اعمل ملفات واستخدم git add عشان git يتابعها)». الحل مكتوب.`,
            R`pathspec = الاسم اللي كتبته. «مطابقش أي ملف أو branch git يعرفه».`,
            R`fatal = وقف. «ده مش repo (ولا أي فولدر فوقه)». انت في المكان الغلط.`,
            R`«قولّي انت مين». git محتاج user.name و user.email، والأوامر مكتوبة تحتها في الرسالة الكاملة.`,
            R`rejected = اترفض. «fetch first» = هات التغييرات اللي برا الأول.`,
            R`hint: «التحديثات اترفضت لأن الـ remote فيه شغل مش عندك»...`,
            R`«... على جهازك». الحل اللي الـ hint بيقوله بعدها: git pull قبل الـ push.`,
            R`CONFLICT = تعارض في محتوى ملف f.`,
            R`«الدمج الأوتوماتيك فشل؛ صلّح التعارضات وبعدين اعمل commit للنتيجة».`,
            R`«مفيش tracking information»: الـ branch بتاعك مش مربوط بـ branch على الـ remote.`,
            R`«رافض يدمج تاريخين ملهمش علاقة ببعض».`,
            R`«مينفعش تغيّر الـ branch وانت في نص merge».`
          ],
          sol: R`اللي هيطلعلك (git 2.43):
[[git commit -m x]] من غير ملفات ← [[nothing to commit (create/copy files and use "git add" to track)]] (لو اسمك وإيميلك متظبطين في git؛ لو لأ، [[Please tell me who you are]] بتطلع الأول). الحل: اعمل ملف و [[git add]].
[[git checkout nobranch]] ← [[error: pathspec 'nobranch' did not match any file(s) known to git]]. الحل: [[git branch]] وشوف الاسم الصح، أو [[git switch -c nobranch]] لو عايز تعمله.
الـ merge ← [[CONFLICT (content): Merge conflict in f]] و [[Automatic merge failed; fix conflicts and then commit the result.]] الحل: افتح f، هتلاقي [[<<<<<<<]] و [[=======]] و [[>>>>>>>]]، سيب السطر الصح، وبعدين [[git add f]] و [[git commit]]. أو [[git merge --abort]] ترجع زي ما كنت.

ولو git قالك [[Author identity unknown]] و [[*** Please tell me who you are.]] وانت بتعمل commit، يبقى محتاج [[git config --global user.name]] و [[user.email]] زي ما الرسالة كاتبة بالظبط.`
        },
        {
          cmd: "أخطاء TypeScript",
          title: "رسايل TypeScript: is not assignable و possibly undefined و does not exist on type",
          desc: R`رسايل TS شكلها واحد: [[file.ts(line,col): error TSxxxx: message]]. الرقم [[TS2322]] ثابت وتقدر تدوّر بيه. والرسايل بتستخدم كام كلمة بتتكرر: [[assignable to]] = ينفع يتحط مكان، و [[possibly]] = ممكن يبقى، و [[implicitly]] = ضمنيًا (من غير ما تكتب)، و [[does not exist on type]] = مش موجود في النوع ده، و [[Expected ... but got ...]] = كان متوقع كذا وجالي كذا، و [[Object literal may only specify known properties]] = الـ object اللي كاتبه بإيدك فيه خاصية مش في النوع، و [[corresponding type declarations]] = ملف الأنواع المقابل.

دي ٨ رسايل حقيقية اتطلعت من [[tsc --noEmit --strict]] (TypeScript 6 و 7، والناتج واحد في الاتنين).`,
          example: R`a.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.
a.ts(3,33): error TS2353: Object literal may only specify known properties, and 'age' does not exist in type 'User'.
a.ts(4,30): error TS18048: 'u.email' is possibly 'undefined'.
a.ts(6,19): error TS2307: Cannot find module 'zodd' or its corresponding type declarations.
a.ts(7,12): error TS7006: Parameter 'a' implicitly has an 'any' type.
a.ts(8,29): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
a.ts(9,1): error TS2554: Expected 1 arguments, but got 0.
a.ts(10,3): error TS2339: Property 'nmae' does not exist on type 'User'.`,
          try: R`اكتب ملف [[a.ts]] فيه ٨ سطور بتعمل الأخطاء دي (مثلًا [[const n: number = "5";]] للأول)، وشغّل [[npx tsc --noEmit --strict a.ts]]. ولكل خطأ اكتب الجملة بالعربي بطريقة «مين، حصله إيه، ليه»، والحل.`,
          flag: "script",
          deep: {
            why: "TS بيطلّع أخطاء أكتر من أي أداة تانية، وكلها بنفس الـ ١٠ كلمات تقريبًا. لو اتعودت عليهم هتلاقي TS بيكلمك بوضوح بدل ما يبان بيزعقلك.",
            how: R`اقرا [[X is not assignable to Y]] كده: «X مينفعش يتحط مكان محتاج Y». الترتيب مهم: الأول اللي عندك، والتاني اللي مطلوب.

[[possibly 'undefined']] = «ممكن يبقى undefined» ← لازم تفحص الأول ([[if (u.email)]]) أو [[u.email?.toLowerCase()]].
[[implicitly has an 'any' type]] = «نوعه any ضمنيًا لأنك مكتبتلوش نوع» ← اكتب النوع.
[[Cannot find module 'zodd' or its corresponding type declarations]] ← الاسم غلط أو المكتبة مش متسطبة، أو مفيش ملف أنواع ليها ([[@types/...]]).
[[Expected 1 arguments, but got 0]] ← لاحظ إن TS نفسه كاتب [[1 arguments]] بالجمع، وده مش صح في الـ grammar بس ده النص الحقيقي. متتعلمش الـ grammar من رسايل الأخطاء!
[[does not exist on type 'User']] ← غلطة إملائية (nmae) أو النوع ناقص الخاصية. ساعات TS بيضيف [[Did you mean 'name'?]] (كود TS2551) لما يلاقي اسم قريب.

تفاصيل أكتر عن كل خطأ في «تاب TypeScript».`,
            when: "كل ما المحرر يطلع خط أحمر أو الـ CI يفشل في typecheck. اقرا الجملة للآخر قبل ما تحط [[as any]].",
            mistakes: R`تقرا [[not assignable]] بالعكس وتفتكر المشكلة في النوع المطلوب. وتحل [[possibly 'undefined']] بـ [[!]] من غير ما تفكر ليه ممكن تبقى undefined. وتحط [[any]] عشان [[implicitly has an 'any' type]] تختفي: كده قفلت TS بدل ما تسمعه.`
          },
          teach: R`## الرسالة شكلها ثابت

~~~text
a.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.
~~~

| الحتة | معناها |
|---|---|
| [[a.ts]] | الملف |
| [[(1,7)]] | سطر ١ عمود ٧ |
| [[error]] | خطأ |
| [[TS2322]] | رقم ثابت تدوّر بيه |
| الجملة | إيه اللي حصل |

شغّلت كود الحل ([[solCode]]) بـ [[npx tsc --noEmit --strict a.ts]] بـ TypeScript 7.0.2 في Docker، وطلعت الـ ٨ رسايل اللي في المثال حرف بحرف. [[--noEmit]] = افحص بس متطلّعش ملفات JS، و [[--strict]] = شغّل كل الفحوصات الصارمة.

---

## الجمل كلمة كلمة

| الرسالة | الكلمة المفتاح | اقراها |
|---|---|---|
| [[Type 'string' is not assignable to type 'number']] | [[assignable to]] | string مينفعش يتحط مكان محتاج number |
| [[Object literal may only specify known properties]] | [[literal]] و [[known]] | الـ object اللي كاتبه بإيدك مسموح فيه بالخصايص المعروفة بس |
| [['u.email' is possibly 'undefined']] | [[possibly]] | ممكن يبقى undefined |
| [[Cannot find module 'zodd' or its corresponding type declarations]] | [[corresponding]] | مش لاقي المكتبة ولا ملف الأنواع المقابل ليها |
| [[Parameter 'a' implicitly has an 'any' type]] | [[implicitly]] | نوعه any ضمنيًا، لأنك مكتبتلوش نوع |
| [[Argument of type 'string' is not assignable to parameter of type 'number']] | [[Argument]] و [[parameter]] | اللي بعته string، والمطلوب number |
| [[Expected 1 arguments, but got 0]] | [[Expected ... but got]] | متوقع واحد وجالي صفر |
| [[Property 'nmae' does not exist on type 'User']] | [[does not exist on]] | مش موجودة في النوع |

---

## قاعدة الترتيب

في [[X is not assignable to Y]]: **X اللي عندك، و Y اللي مطلوب**. أغلب الناس بتقراها بالعكس.

و [[Expected 1 arguments]] غلط grammar (المفروض [[argument]] مفرد)، بس ده النص الحقيقي. متتعلمش الـ grammar من رسايل الأخطاء.

---

## الخلاصة

- [[file(line,col)]] و [[TSxxxx]] ثابتين.
- [[assignable]] و [[possibly]] و [[implicitly]] و [[does not exist on type]]: الـ ٤ دول أغلب رسايلك.
- اقرا الجملة للآخر قبل [[as any]] أو [[!]].`,
          lines: [
            R`«نوع string مينفعش يتحط مكان number». سطر ١ عمود ٧. TS2322 أشهر خطأ.`,
            R`«الـ object اللي كاتبه مسموحله بخصايص معروفة بس، و age مش في نوع User».`,
            R`possibly = ممكن. «u.email ممكن يبقى undefined» لأنه اختياري ([[email?]]).`,
            R`«مش لاقي المكتبة zodd ولا ملف أنواعها». الاسم غلط (zod).`,
            R`implicitly = ضمنيًا. «الباراميتر a نوعه any لأنك مكتبتلوش نوع».`,
            R`«argument نوعه string مينفعش يتحط مكان باراميتر number» (push("x") في array أرقام).`,
            R`«متوقع ١ وجالي صفر». ناديت الدالة من غير الـ argument.`,
            R`«الخاصية nmae مش موجودة في User». غلطة إملائية.`
          ],
          sol: R`الكود اللي بيطلّع الـ ٨ أخطاء بالظبط:
[[const n: number = "5";]]
[[type User = { name: string; email?: string };]]
[[const u: User = { name: "sara", age: 3 };]]
[[function f(u: User) { return u.email.toLowerCase(); }]]
[[import { z } from "zodd";]] (في سطر ٦ بعد سطر فاضي أو [[let x;]])
[[function g(a) { return a; }]]
[[const arr = [1,2]; arr.push("x");]]
[[f();]]
[[u.nmae;]]

الحلول: [[const n = 5]]، شيل [[age]] أو ضيفه للنوع، [[u.email?.toLowerCase()]]، [[import { z } from "zod"]] بعد [[npm i zod]]، [[function g(a: string)]]، [[arr.push(3)]]، [[f(u)]]، [[u.name]].

وملحوظة: الرقم في [[a.ts(3,33)]] = سطر ٣، عمود ٣٣. لو أرقامك مختلفة يبقى سطورك مترتبة بشكل تاني، ومفيش مشكلة.`,
          solCode: R`const n: number = "5";
type User = { name: string; email?: string };
const u: User = { name: "sara", age: 3 };
function f(u: User) { return u.email.toLowerCase(); }
let x;
import { z } from "zodd";
function g(a) { return a; }
const arr = [1,2]; arr.push("x");
f();
u.nmae;`
        },
        {
          cmd: "أخطاء PostgreSQL",
          title: "رسايل PostgreSQL: violates constraint و does not exist و GROUP BY و Connection refused",
          desc: R`رسايل Postgres منظمة جدًا: سطر [[ERROR:]] فيه الجملة، وساعات [[DETAIL:]] فيه التفاصيل (أي صف وأي قيمة)، و [[HINT:]] فيه اقتراح، و [[LINE 1:]] ومعاه [[^]] بيشاور على المكان في الـ SQL.

الكلمات: [[violates]] = بيخالف، و [[constraint]] = قيد/شرط على الجدول (unique أو not-null أو foreign key)، و [[duplicate key value]] = قيمة مكررة، و [[relation]] = جدول (في لغة Postgres)، و [[does not exist]] = مش موجود، و [[invalid input syntax for type integer]] = الشكل مش رقم، و [[at or near]] = عند أو قريب من، و [[must appear in the GROUP BY clause or be used in an aggregate function]] = العمود ده لازم يبقى في GROUP BY أو جوه دالة تجميع زي count، و [[permission denied for table]] = مفيش صلاحية.`,
          example: R`ERROR:  duplicate key value violates unique constraint "users_email_key"
DETAIL:  Key (email)=(a@b.c) already exists.
ERROR:  null value in column "email" of relation "users" violates not-null constraint
ERROR:  column "nmae" does not exist
ERROR:  relation "user_s" does not exist
ERROR:  invalid input syntax for type integer: "abc"
ERROR:  syntax error at or near "selct"
ERROR:  column "users.email" must appear in the GROUP BY clause or be used in an aggregate function
ERROR:  permission denied for table users
FATAL:  database "shopdb" does not exist
connection to server at "localhost" (127.0.0.1), port 5433 failed: Connection refused
	Is the server running on that host and accepting TCP/IP connections?`,
          try: R`في psql اعمل جدول [[users(id serial primary key, email text unique not null, age int)]]، وحاول تدخّل نفس الإيميل مرتين، وصف من غير إيميل، و [[age]] = 'abc'، و [[selct 1]]. لكل خطأ اكتب الجملة بالعربي وإيه اللي المفروض يحصل في كود الـ backend بتاعك لما يطلع (مثلًا: ترجع 409 لليوزر).`,
          flag: "script",
          deep: {
            why: "الأخطاء دي مش بس للمطور: كتير منها المفروض تتحول لرسالة لليوزر (الإيميل مستخدم قبل كده). ولو فاهمها، هتعرف تمسكها في الكود وترد صح بدل 500.",
            how: R`[[duplicate key value violates unique constraint "users_email_key"]] ← «قيمة مكررة بتخالف القيد الفريد». [[DETAIL: Key (email)=(a@b.c) already exists]] ← «الإيميل ده موجود خلاص». في الـ API رجّع 409 Conflict أو رسالة «Email is already registered». كود الخطأ في Postgres [[23505]].
[[null value in column "email" ... violates not-null constraint]] ← بعت صف من غير إيميل. [[relation "users"]] = جدول users.
[[column "nmae" does not exist]] و [[relation "user_s" does not exist]] ← إملاء. ولو الاسم فيه حروف كبيرة، Postgres بيحوّل الأسماء اللي من غير علامات تنصيص لحروف صغيرة، فمحتاج [["User"]] بعلامات.
[[invalid input syntax for type integer: "abc"]] ← بعت نص في عمود رقم. اعمل validation قبل.
[[syntax error at or near "selct"]] ← خطأ كتابة في الـ SQL عند الكلمة دي أو قبلها بشوية.
[[must appear in the GROUP BY clause or be used in an aggregate function]] ← ضيف العمود لـ GROUP BY أو لفّه في [[count]]/[[max]].
[[FATAL: database "shopdb" does not exist]] ← اعمله بـ [[createdb]] أو صلّح الاسم في [[DATABASE_URL]].
[[Connection refused ... Is the server running on that host and accepting TCP/IP connections?]] ← «السيرفر شغال وبيستقبل اتصالات؟». غالبًا Postgres مش شغال أو البورت غلط.

تفاصيل الـ SQL نفسه في «تاب SQL و Prisma» و «تاب PostgreSQL».`,
            when: "كل ما query يفشل، وكل ما تكتب error handling في الـ backend.",
            mistakes: R`ترجّع [[violates unique constraint]] لليوزر زي ما هي: دي رسالة داخلية وبتكشف اسم الجدول. ترجمها لرسالة لطيفة. وتفهم [[relation]] «علاقة» بين جدولين: في رسايل Postgres معناها جدول (أو view). وتفهم [[at or near]] إن الغلط في الكلمة دي بالظبط: ممكن يبقى قبلها (فاصلة ناقصة مثلًا).`
          },
          teach: R`## ٤ أنواع سطور

| السطر | فيه إيه |
|---|---|
| [[ERROR:]] | الجملة |
| [[DETAIL:]] | التفاصيل: أنهي صف وأنهي قيمة |
| [[HINT:]] | اقتراح |
| [[LINE 1:]] و [[^]] | المكان في الـ SQL |

اتسببت في كل الرسايل دي بنفسي في PostgreSQL 16.15 (Docker، container اتمسح بعدها)، على جدول [[users(id serial primary key, email text unique not null, age int)]].

---

## الرسايل بالترتيب

~~~text الناتج: نفس الإيميل مرتين
ERROR:  duplicate key value violates unique constraint "users_email_key"
DETAIL:  Key (email)=(a@b.c) already exists.
~~~

[[duplicate]] مكرر، [[violates]] بيخالف، [[constraint]] قيد. و [[users_email_key]] اسم Postgres عمله لوحده: [[جدول_عمود_key]].

~~~text الناتج: صف من غير إيميل
ERROR:  null value in column "email" of relation "users" violates not-null constraint
DETAIL:  Failing row contains (3, null, 3).
~~~

[[relation]] = جدول (مش «علاقة»). و [[Failing row contains]] = «الصف اللي فشل فيه». الـ id طلع ٣ مش ٢ لأن المحاولة اللي فاتت (المكررة) استهلكت رقم من الـ serial حتى وهي فاشلة.

~~~text الناتج
ERROR:  invalid input syntax for type integer: "abc"
LINE 1: insert into users(email,age) values ('x@y.z','abc')
                                                     ^
~~~

[[invalid input syntax]] = شكل الإدخال غلط، و [[^]] تحت القيمة بالظبط.

~~~text الناتج
ERROR:  syntax error at or near "selct"
ERROR:  column "nmae" does not exist
ERROR:  relation "user_s" does not exist
ERROR:  column "users.email" must appear in the GROUP BY clause or be used in an aggregate function
ERROR:  permission denied for table users
~~~

- [[at or near]] = عند أو قريب من: الغلط ممكن يبقى قبلها شوية.
- [[must appear in ... or be used in ...]] = لازم يبقى في GROUP BY أو جوه دالة تجميع ([[aggregate]] زي count و max).

~~~text الناتج: الاتصال
psql: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432" failed: FATAL:  database "shopdb" does not exist
connection to server at "localhost" (127.0.0.1), port 5433 failed: Connection refused
	Is the server running on that host and accepting TCP/IP connections?
~~~

[[FATAL]] = الاتصال نفسه فشل. والسؤال الأخير اقتراح للسبب: «السيرفر شغال على الجهاز ده وبيقبل اتصالات TCP/IP؟». ولاحظ إن psql جرّب [[::1]] (IPv6) وبعده [[127.0.0.1]]، فبيطبع الرسالة مرتين.

---

## الخلاصة

| الرسالة | تعمل إيه في الـ backend |
|---|---|
| duplicate key (كود 23505) | 409 و «Email is already registered» |
| not-null و invalid input syntax | validation قبل الداتابيز، و 400 |
| syntax error و does not exist | غلطتك في الكود |
| Connection refused | Postgres مش شغال أو البورت غلط |`,
          lines: [
            R`«قيمة مكررة بتخالف القيد الفريد users_email_key».`,
            R`DETAIL: «المفتاح (email)=(a@b.c) موجود خلاص». already = خلاص/قبل كده.`,
            R`«قيمة null في عمود email في جدول users بتخالف قيد not-null».`,
            R`«العمود nmae مش موجود». إملاء.`,
            R`relation = جدول. «الجدول user_s مش موجود».`,
            R`«شكل الإدخال غلط لنوع integer: abc».`,
            R`«خطأ في الكتابة عند أو قرب selct».`,
            R`«العمود لازم يبقى في GROUP BY أو جوه دالة تجميع».`,
            R`«مفيش صلاحية على جدول users» لليوزر ده.`,
            R`FATAL = الاتصال نفسه فشل. «الداتابيز shopdb مش موجودة».`,
            R`«الاتصال بالسيرفر على localhost بورت 5433 فشل: الاتصال اترفض».`,
            R`«السيرفر شغال على الجهاز ده وبيقبل اتصالات TCP/IP؟». سؤال بيقترح السبب.`
          ],
          sol: R`اللي هيطلعلك (PostgreSQL 16):
الإيميل مرتين ← [[ERROR: duplicate key value violates unique constraint "users_email_key"]] و [[DETAIL: Key (email)=(a@b.c) already exists.]] ← في الـ backend: امسك كود [[23505]] ورجّع 409 مع [[{"error": "Email is already registered"}]].
من غير إيميل ← [[ERROR: null value in column "email" of relation "users" violates not-null constraint]] و [[DETAIL: Failing row contains (...)]] ← المفروض الـ validation (Zod مثلًا) يمسكها قبل الداتابيز ويرجع 400.
[[age = 'abc']] ← [[ERROR: invalid input syntax for type integer: "abc"]] ← validation برضه، 400.
[[selct 1]] ← [[ERROR: syntax error at or near "selct"]] و [[LINE 1: selct 1]] و [[^]] تحت أول حرف ← دي غلطتك انت في الكود، مش حاجة لليوزر.

اسم الـ constraint [[users_email_key]] Postgres بيعمله لوحده بالشكل [[table_column_key]]. لو شفت اسم تاني يبقى حد سمّاه بنفسه.`
        },
        {
          cmd: "أخطاء Python",
          title: "رسايل Python: Traceback و KeyError و NoneType و missing 1 required",
          desc: R`في Python الخطأ اسمه exception، والرسالة بتبدأ بـ [[Traceback (most recent call last):]] = «تتبع النداءات (آخر نداء في الآخر)». يعني عكس Node: هنا المكان الأهم في آخر الرسالة، وآخر سطر فيه النوع والجملة.

الكلمات: [[No module named]] = مفيش مكتبة بالاسم ده، و [[KeyError]] = المفتاح مش في الـ dict، و [[can only concatenate str (not "int") to str]] = تقدر تلزق string في string بس (مش رقم)، و [['NoneType' object has no attribute]] = القيمة None ومفيهاش الخاصية دي، و [[expected an indented block]] = كان مستني سطر بمسافة (indentation)، و [[invalid literal for int() with base 10]] = النص ده مينفعش يتحول لرقم عشري، و [[list index out of range]] = الـ index برا حدود الليستة، و [[missing 1 required positional argument]] = ناقص argument واحد لازم.`,
          example: R`ModuleNotFoundError: No module named 'requestz'
KeyError: 'b'
TypeError: can only concatenate str (not "int") to str
AttributeError: 'NoneType' object has no attribute 'upper'
IndentationError: expected an indented block after function definition on line 1
ValueError: invalid literal for int() with base 10: 'abc'
NameError: name 'undefined_name' is not defined
IndexError: list index out of range
FileNotFoundError: [Errno 2] No such file or directory: 'nope.txt'
TypeError: f() missing 1 required positional argument: 'b'`,
          try: R`اتسبب في كل خطأ بسطر [[python3 -c '...']] (مثلًا [[python3 -c 'd={"a":1}; d["b"]']]). وقارن كل واحد بالمقابل بتاعه في Node من الدرس اللي فات: إيه اللي شبه بعض؟ اكتب جدول صغير في [[errors.md]]: Python ← Node.`,
          flag: "script",
          deep: {
            why: R`حتى لو شغلك JS، هتقابل Python في سكربتات وأدوات و AI. ونفس المهارة بتنقل: الرسايل في اللغتين بتستخدم نفس الكلمات ([[not defined]] و [[no attribute]] و [[missing]]).`,
            how: R`المقابلات:
[[NameError: name 'x' is not defined]] ← [[ReferenceError: x is not defined]] في JS.
[[AttributeError: 'NoneType' object has no attribute 'upper']] ← [[TypeError: Cannot read properties of null]] في JS. [[NoneType]] = نوع None (زي null).
[[KeyError: 'b']] ← في JS مفيش خطأ، بيرجع [[undefined]] بهدوء. في Python استخدم [[d.get("b")]] لو المفتاح ممكن ميكونش موجود.
[[ModuleNotFoundError]] ← [[Cannot find module]]. الحل [[pip install]] جوه venv (شوف «تاب Python»).
[[can only concatenate str (not "int") to str]] ← في JS [["age: " + 5]] بيشتغل عادي ويطلع [["age: 5"]]، في Python لأ: [[f"age: {5}"]] أو [[str(5)]].
[[missing 1 required positional argument: 'b']] ← في JS الباراميتر الناقص بيبقى undefined بهدوء، في Python خطأ. positional = بالترتيب (مش بالاسم).
[[invalid literal for int() with base 10]] ← في JS [[Number("abc")]] بيرجع [[NaN]] من غير خطأ.

لاحظ: Python أصرم من JS في حاجات كتير، والرسايل بتقولك كده صراحة.`,
            when: "أي سكربت Python، وأي Traceback في أداة CLI أو في شغل AI.",
            mistakes: R`تقرا أول سطر في الـ Traceback وتفتكره المشكلة: في Python اقرا من تحت. و [[IndentationError]] بتيجي من خلط tabs ومسافات: خلّي المحرر يستخدم ٤ مسافات. و [[most recent call last]] معناها «آخر نداء آخر حاجة»، مش «النداء الأخير فشل».`
          },
          teach: R`## في Python اقرا من تحت

~~~text
Traceback (most recent call last):
~~~

= «تتبع النداءات، وآخر نداء في الآخر». فآخر سطر فيه النوع والجملة، وده المهم. جرّبت ملف فيه دالة بتنادي [[f(1)]] و [[f]] محتاجة اتنين، في Python 3.12 (Docker):

~~~text الناتج
Traceback (most recent call last):
  File "/tmp/t.py", line 7, in <module>
    main()
  File "/tmp/t.py", line 5, in main
    return f(1)
           ^^^^
TypeError: f() missing 1 required positional argument: 'b'
~~~

| الحتة | معناها |
|---|---|
| [[File "/tmp/t.py", line 7, in <module>]] | أول نداء: الملف نفسه |
| [[line 5, in main]] | جوه main، وده آخر مكان قبل الخطأ |
| [[^^^^]] | بيشاور على [[f(1)]] بالظبط |
| آخر سطر | النوع والجملة |

---

## الـ ١٠ رسايل

كلهم طلعوا بنفس النص في Python 3.12 بـ [[python3 -c '...']]:

| الرسالة | الكلمة المفتاح | المقابل في JS |
|---|---|---|
| [[ModuleNotFoundError: No module named 'requestz']] | [[No module named]] | [[Cannot find module]] |
| [[KeyError: 'b']] | المفتاح مش في الـ dict | مفيش خطأ، undefined |
| [[TypeError: can only concatenate str (not "int") to str]] | [[concatenate]] = تلزق | [["age: " + 5]] بيشتغل |
| [[AttributeError: 'NoneType' object has no attribute 'upper']] | [[NoneType]] نوع None | [[Cannot read properties of null]] |
| [[IndentationError: expected an indented block after function definition on line 1]] | [[indented]] = بمسافة من الشمال | مفيش |
| [[ValueError: invalid literal for int() with base 10: 'abc']] | [[literal]] = النص، [[base 10]] = عشري | [[Number("abc")]] = NaN |
| [[NameError: name 'undefined_name' is not defined]] | [[not defined]] | [[ReferenceError]] |
| [[IndexError: list index out of range]] | [[out of range]] = برا الحدود | undefined |
| [[FileNotFoundError: (Errno 2) No such file or directory: 'nope.txt']] | نفس جملة ENOENT | [[ENOENT]] |
| [[TypeError: f() missing 1 required positional argument: 'b']] | [[positional]] = بالترتيب | الباراميتر بيبقى undefined |

(في الرسالة الحقيقية [[Errno 2]] بين أقواس مربعة.)

---

## الخلاصة

- Python: آخر سطر أهم سطر. Node: أول سطر.
- [[...Error]] في آخر اسم النوع، والجملة بعد [[:]].
- Python بترمي خطأ في حالات كتير JS بيسكت فيها.`,
          lines: [
            R`«مفيش module اسمه requestz». إملاء (requests) أو مش متسطّب.`,
            R`KeyError: المفتاح 'b' مش في الـ dict.`,
            R`«تقدر تلزق str في str بس (مش int)». حوّل الرقم لنص.`,
            R`«الـ object من نوع NoneType ملوش attribute اسمه upper». القيمة None.`,
            R`«كان مستني سطر بمسافة بعد تعريف الدالة في سطر ١». ناقص indentation.`,
            R`«نص مينفعش يتحول لـ int بالأساس ١٠: abc».`,
            R`«الاسم undefined_name مش متعرّف». زي ReferenceError.`,
            R`«الـ index برا حدود الليستة».`,
            R`«[Errno 2] مفيش ملف أو فولدر بالاسم ده». نفس رسالة ENOENT.`,
            R`«الدالة f ناقصها argument واحد لازم بالترتيب: b».`
          ],
          sol: R`اللي هيطلعلك (Python 3.11) هو السطور اللي في الـ example بالظبط، وقبلها Traceback بيقول الملف والسطر.

جدول المقابلات الصح:
[[NameError]] ← [[ReferenceError ... is not defined]]
[[AttributeError: 'NoneType' ...]] ← [[TypeError: Cannot read properties of null]]
[[ModuleNotFoundError]] ← [[Error: Cannot find module]]
[[FileNotFoundError]] ← [[Error: ENOENT]]
[[IndexError]] ← مفيش في JS، بيرجع undefined.
[[KeyError]] ← مفيش في JS، بيرجع undefined.
[[TypeError ... missing 1 required positional argument]] ← مفيش في JS، الباراميتر بيبقى undefined.

الملاحظة المهمة: Python بترمي خطأ في حالات كتير JS بيسكت فيها. عشان كده في JS لازم تبقى أحرص، وده من أسباب TypeScript.`
        }
      ]
    }
]);
