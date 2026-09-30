// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("node", {
  label: "node",
  prompt: "~/myapp$ ",
  lab: R`mkdir -p ~/lab/nodeapp && cd ~/lab/nodeapp
npm init -y
node -v`,
  labText: "اعمل مشروع تجربة بـ npm init -y وجرّب فيه. للـ webhooks محتاج حساب ngrok مجاني أو دومين على Cloudflare.",
  levels: {
    "1": ["البداية", "نسخ Node، و package.json، والفرق بين install و ci، والسكربتات"],
    "2": ["المتوسط", "البيئة والبورتات وتحديث المكتبات، وسكربتات التطوير، و monorepo بـ pnpm، و Node runtime: الملفات و process و child_process و Buffer"],
    "3": ["المتقدم", "الإنتاج والتشخيص، و Prisma في الإنتاج، و webhooks بوابات الدفع على جهازك"]
  },
  categories: [
    {
      t: "Node و npm: الأساسيات",
      l: 1,
      n: "نسخ Node، و package.json، وإيه اللي بيحصل فعلًا لما تكتب npm install",
      items: [
        {
          cmd: "مقدمة Node.js وتشغيل الملفات",
          title: "مقدمة Node.js: يعني إيه بيئة تشغيل، وتشغيل أول ملف JavaScript بالترمنال، والفرق عن المتصفح",
          desc: R`في الأصل، كانت لغة JavaScript محبوسة داخل متصفحات الويب فقط (زي Chrome و Firefox).
في سنة 2009، قام مهندس اسمه Ryan Dahl بأخذ محرك V8 الخاص بجوجل كروم وشغله خارج المتصفح مباشرة على نظام التشغيل، وأطلق عليه اسم [[Node.js]].

يعني إيه [[Node.js]]؟
هو بيئة تشغيل ([[JavaScript Runtime Environment]]) بتمكّنك من كتابة كود جافاسكريبت وتنفيذه مباشرة على جهاز الكمبيوتر أو السيرفر بدون الحاجة لفتح متصفح.

الفرق الجوهري بين المتصفح و Node.js:
• في المتصفح: عندك كائنات الواجهة زي [[window]] و [[document]]، وتقدر تتفاعل مع أزرار الصفحة وتعدل الـ DOM، لكن ممنوع أمنياً تقرأ أو تكتب ملفات على هارد ديسك المستخدم مباشرة.
• في Node.js: مفيش [[window]] ولا [[document]] (لو كتبت document.getElementById هيديك خطأ ReferenceError). في المقابل، عندك كائنات النظام والـ Backend زي [[process]]، وموديول الملفات [[fs]]، وموديول الشبكات والسيرفرات [[http]].

طرق تشغيل كود JavaScript في Node:
1. تشغيل ملف كامل: [[node app.js]]
2. تشغيل سطر كود فوري: [[node -e "console.log(1+1)"]] (حرف e اختصار لـ evaluate).
3. بيئة تفاعلية (REPL): اكتب [[node]] في الترمنال واضغط Enter، تقدر تجرب وتكتب كود سطر بسطر.`,
          example: R`# 1. طباعة جملة فورية للتأكد من عمل بيئة Node
node -e 'console.log("Hello from Node.js runtime!")'

# 2. تشغيل كود حسابي وقراءة بيئة النظام الحالية
node -p "process.platform + ' | Node ' + process.version"

# 3. تشغيل ملف جافاسكريبت محفوظ على جهازك
node app.js`,
          try: R`اعمل ملف اسمه [[app.js]] في VS Code واكتب جواه سطر واحد: [[console.log("تطبيقي الأول في Node.js!");]]. افتح الترمنال في نفس المجلد واكتب: [[node app.js]] واضغط Enter. هتشوف جملتك طُبعت في الترمنال في لمح البصر بدون ما تحتاج تفتح أي متصفح!`,
          deep: {
            why: R`تحرير جافاسكريبت من المتصفح جعلها اللغة الوحيدة في العالم اللي تقدر تبني بيها التطبيق بالكامل (Full-Stack): واجهات React في الفرونت إند، وسيرفرات Express و NestJS في الباك إند، وأدوات بناء زي Vite و Webpack، وسكربتات أتمتة على السيرفرات.`,
            how: R`Node.js مبني على معمارية غير متزامنة مبنية على الأحداث (Single-threaded Event-driven Architecture) مع مكتبة مكتوبة بـ C اسمها [[libuv]]. ده بيخليه ممتاز جداً في التعامل مع مئات الآلاف من طلبات الشبكة وقراءة الملفات (I/O) في نفس الوقت باستهلاك قليل جداً من الذاكرة مقارنة باللغات القديمة زي PHP أو Java الكلاسيكية.`,
            when: "بداية رحلة أي مطور Full-Stack أو Backend. كل مشاريع الويب الحديثة (React, Next.js, Express) بتعتمد على Node في التطوير والتشغيل.",
            mistakes: R`تحاول تستخدم [[localStorage]] أو [[document]] أو [[window]] جوه كود Node على السيرفر، فالبرنامج يقع بـ ReferenceError. وتنسى إن Node بيشغل ملف الـ JS وينتهي فوراً إلا لو فيه سيرفر أو listener شغال بيفضل مستني.`
          },
          lines: [
            "أمر node مع خيار e لتنفيذ سطر جافاسكريبت مباشرة وطباعة ترحيب.",
            "أمر node مع خيار p لطباعة ناتج كائن بيئة التشغيل وإصدار نود.",
            "تشغيل ملف جافاسكريبت كامل بالترمنال."
          ],
          sol: R`الناتج في الترمنال:
1. من الأمر الأول:
Hello from Node.js runtime!

2. من الأمر الثاني:
اسم نظام تشغيلك (مثل win32 أو linux) متبوعاً بإصدار نود الحالي (مثل Node v22.12.0).

3. من الأمر الثالث:
محتوى الطباعة اللي كتبته جوه ملف [[app.js]].`
        },
        {
          cmd: "node -v",
          title: "النسخ اللي شغالة عندك",
          desc: "مشاكل كتير سببها نسخة Node مختلفة عن اللي المشروع متوقعها. أول حاجة: انت شغال بإيه، وجاي منين.",
          example: R`node -v
npm -v
which node
node -p "process.versions.v8"`,
          try: "قارن نسخة node عندك بحقل [[engines]] في package.json لأي مشروع بتشتغل عليه.",
          deep: {
            why: "«شغال عندي ومش شغال عنده» في مشاريع Node غالبًا نسخة. مكتبة بتستخدم feature في Node 22 والسيرفر عليه 18، أو العكس. أول سؤال في أي مشكلة: انت على أنهي نسخة؟",
            how: R`[[node -v]] نسخة Node. [[npm -v]] نسخة npm، ودي بتيجي مع Node بس ممكن تتحدّث لوحدها.

[[which node]] بيقولك الملف جاي منين: [[/usr/bin/node]] من apt، أو مسار فيه [[.nvm]] من nvm، أو [[/opt/homebrew]] من brew. لو عندك أكتر من واحد، اللي الـ PATH بيلاقيه الأول هو اللي بيشتغل.

النسخ الزوجية هي LTS: دعم طويل، ودي اللي تستخدمها في الإنتاج (في 2026: 24 هي Active LTS و 22 Maintenance، و 18 و 20 دعمهم خلص). الفردية (زي 25) عمرها قصير. ومن Node 27 النظام اتغير: نسخة واحدة في السنة وكلها بتبقى LTS.

[[engines]] في package.json بيقول المشروع محتاج أنهي نسخة، و npm بيحذّرك لو مختلفة. و [[.nvmrc]] بيخلي nvm يختارها لوحده.`,
            when: "أول ما تفتح مشروع جديد. قبل ما تبلّغ عن bug. لما مكتبة تطلع syntax error غريب.",
            mistakes: "نسخة على جهازك ونسخة تانية على السيرفر. حدد النسخة في Dockerfile أو .nvmrc والاتنين يمشوا عليها."
          },
          lines: [
            "نسخة Node.",
            "نسخة npm.",
            "الملف جاي منين (nvm ولا apt ولا brew).",
            "نسخة محرك V8، مفيد لو مكتبة بتشتكي من feature."
          ],
          sol: R`[[node -v]] بيطبع حاجة زي [[v22.22.2]]، وفي package.json ممكن تلاقي [["engines": { "node": ">=22" }]] أو [[">=20.9"]] أو [["22.x"]]. المقارنة بسيطة: نسختك لازم تقع جوه المدى. [[v22.22.2]] مع [[>=22]] تمام، ومع [[>=24]] لأ.

لو مفيش [[engines]] خالص، دوّر على [[.nvmrc]] أو [[.node-version]] في المشروع، أو على [[node-version]] في ملف الـ CI ([[.github/workflows]])؛ دي النسخة اللي المشروع فعلًا بيتختبر عليها.

والمهم تعرفه: npm مش بيمنعك تسطّب لو النسخة مش مطابقة، بيطبع [[npm warn EBADENGINE Unsupported engine]] ويكمّل. ودا تحذير حقيقي، مش حاجة تتجاهلها: غالبًا هيطلعلك بعدها errors غريبة وقت التشغيل. لو عايزها تبقى error حط [[engine-strict=true]] في [[.npmrc]] بتاع المشروع.`
        },
        {
          cmd: "nvm",
          title: "أكتر من نسخة Node على نفس الجهاز",
          desc: "مشروع قديم محتاج Node 20 وجديد محتاج 24. nvm بيخليك تبدّل في ثانية. وملف [[.nvmrc]] في المشروع بيقول لكل الفريق أنهي نسخة.",
          example: R`nvm ls
nvm install 24
nvm use 24
nvm alias default 24
echo "24" > .nvmrc
nvm use`,
          try: "سطّب نسختين وبدّل بينهم، وشوف [[which node]] بيتغير مع كل [[nvm use]].",
          deep: {
            why: "مينفعش تسطّب Node من apt وتفضل عليه: النسخة قديمة وتغييرها صعب. nvm بيسطّب أي نسخة في فولدرك وبيبدّل بينهم بأمر.",
            how: R`nvm سكربت بيتحمّل في الشيل (من .bashrc أو .zshrc)، وبيسطّب كل نسخة في [[~/.nvm/versions/node/]]. [[nvm use 24]] بيغيّر الـ PATH في الجلسة دي عشان يشاور على فولدر النسخة دي. عشان كده [[which node]] بيتغير.

والتغيير للجلسة الحالية بس. [[nvm alias default 24]] بيخلي كل ترمنال جديد يبدأ بيها.

[[.nvmrc]] ملف فيه رقم النسخة في جذر المشروع. [[nvm use]] من غير رقم بيقراه. وممكن تخلي الشيل يعمل ده لوحده لما تدخل الفولدر (فيه سكربت في وثائق nvm).

الباكدجات العامة ([[-g]]) مربوطة بالنسخة: لو بدّلت لنسخة تانية مش هتلاقيها، تسطّبها تاني أو [[nvm install 24 --reinstall-packages-from=22]].

على ويندوز: nvm-windows برنامج مختلف بنفس الأوامر تقريبًا، أو استخدم WSL.`,
            when: "على جهازك دايمًا. على السيرفر الأسهل Docker بنسخة محددة، أو NodeSource repo.",
            mistakes: "تسطّب nvm وتفضل Node القديم من apt بيشتغل لأن الـ PATH بيلاقيه الأول. [[which -a node]] يوريك الاتنين."
          },
          lines: [
            "النسخ المسطّبة، والمستخدمة عليها سهم.",
            "سطّب آخر 24.x.",
            "استخدمها في الجلسة دي.",
            "خلّيها الافتراضية لكل ترمنال جديد.",
            "سجّل نسخة المشروع في ملف.",
            "من غير رقم: اقرا .nvmrc واستخدمه."
          ],
          sol: R`بعد [[nvm install 22]] و [[nvm install 24]]، [[nvm ls]] بيعرض الاتنين وسهم [[->]] قدام اللي شغالة. ومع كل [[nvm use]] الرد [[Now using node v24.x.x (npm v11.x.x)]]، و [[which node]] بيتغير لمسار جوه nvm زي [[~/.nvm/versions/node/v24.x.x/bin/node]] ثم [[~/.nvm/versions/node/v22.x.x/bin/node]]. يعني nvm مش بيغيّر node واحد، بيغيّر الـ PATH يشاور على نسخة تانية.

وبـ [[.nvmrc]] فيها [[24]]، [[nvm use]] من غير رقم بيقول [[Found '.../.nvmrc' with version <24>]] ويبدّل.

الأخطاء الشائعة: [[nvm: command not found]] في ترمنال جديد لأن سطور nvm مش في [[~/.bashrc]] أو [[~/.zshrc]]، أو انت في PowerShell ودا nvm-windows (برنامج تاني بأوامر شبه دي). ولو [[which node]] فضل [[/usr/bin/node]] يبقى فيه node متسطب من apt وجاي في الـ PATH قبل nvm. وافتكر إن [[nvm use]] للترمنال ده بس؛ الترمنال الجديد بياخد [[nvm alias default]].`
        },
        {
          cmd: "package.json",
          title: "بطاقة المشروع",
          desc: "الملف اللي بيوصف المشروع: اسمه، والسكربتات، والمكتبات ونسخها. [[npm init -y]] بيعمله بقيم افتراضية. و [[type: module]] بيخلي الملفات ESM (import) بدل CommonJS (require).",
          example: R`npm init -y
npm pkg set type=module
npm pkg set engines.node=">=22"
npm pkg get scripts`,
          try: "اعمل مشروع فاضي بـ [[npm init -y]] وافتح package.json واقرا كل حقل.",
          deep: {
            why: "من غيره مفيش مشروع Node. هو اللي بيقول للـ npm يسطّب إيه، وللفريق يشغّل إزاي، ولـ Node يقرا الملفات كـ ESM ولا CommonJS.",
            how: R`[[npm init -y]] بيعمل الملف بالاسم من الفولدر وقيم افتراضية. من غير [[-y]] بيسألك سؤال سؤال.

الحقول المهمة: [[name]] و [[version]]، و [[scripts]] الأوامر، و [[dependencies]] و [[devDependencies]]، و [[engines]] نسخة Node، و [[type]].

[[type: module]] بيخلي كل ملف .js يتقري كـ ES module: [[import]] بدل [[require]]، و [[await]] في أعلى الملف. من غيره الافتراضي CommonJS. ولو عايز تخلط: [[.mjs]] دايمًا ESM و [[.cjs]] دايمًا CommonJS.

[[npm pkg set]] بيعدّل حقل من الترمنال من غير ما تفتح الملف، مفيد في السكربتات. و [[npm pkg get]] بيقرا.`,
            when: "أول أمر في أي مشروع جديد. و [[npm pkg]] لما تعدّل حاجة من سكربت.",
            mistakes: "[[type: module]] في مشروع فيه [[require]]، أو العكس، فيطلع «Cannot use import statement outside a module». الاتنين مينفعش يتخلطوا في نفس الملف."
          },
          lines: [
            "اعمل package.json بقيم افتراضية من غير أسئلة.",
            "خلّي المشروع ESM (import بدل require).",
            "سجّل إن المشروع محتاج Node 22 أو أحدث.",
            "اعرض السكربتات من غير ما تفتح الملف."
          ],
          sol: R`[[npm init -y]] بيطبع [[Wrote to .../package.json:]] والملف فيه:

[[name]] (اسم الفولدر)، [[version]] ([[1.0.0]])، [[description]] فاضي، [[main]] ([[index.js]]: الملف اللي بيتحمّل لو حد عمل import للباكدج)، [[scripts]] فيها [[test]] بيطبع [[Error: no test specified]] ويخرج بـ 1، [[keywords]] و [[author]] فاضيين، و [[license]] ([[ISC]]). وفي npm 11 كمان [["type": "commonjs"]] صريحة.

بعد [[npm pkg set type=module]] و [[npm pkg set engines.node=">=22"]] هيتضاف [["type": "module"]] و [["engines": { "node": ">=22" }]]. و [[npm pkg get scripts]] بيطبع الـ scripts كـ JSON.

الحقول اللي هتفرق معاك في مشروع تطبيق: [[scripts]] و [[dependencies]] و [[devDependencies]] و [[type]] و [[engines]]. أما [[main]] و [[keywords]] و [[license]] بيفرقوا لو هتنشر باكدج. والغلط الشائع إنك تعدّل الملف بإيدك وتسيب فاصلة زيادة، فكل أوامر npm تقع بـ [[EJSONPARSE]]؛ [[npm pkg set]] بيتجنب ده.`
        },
        {
          cmd: "npm install",
          title: "dependencies و devDependencies",
          desc: "[[install]] من غير حاجة بيسطّب كل اللي في package.json. باسم مكتبة بيضيفها لـ dependencies. [[-D]] لـ devDependencies (أدوات التطوير اللي مش محتاجها في الإنتاج). [[-g]] على الجهاز كله كأداة.",
          example: R`npm install
npm install express
npm install -D typescript nodemon
npm install -g pnpm
npm uninstall nodemon`,
          try: "سطّب express و -D nodemon وشوف كل واحد راح في أنهي قسم في package.json.",
          deep: {
            why: "المكتبة اللي بتسطّبها لازم تتسجّل في المكان الصح، وإلا الإنتاج يسطّب أدوات مالهاش لازمة، أو يفتقد مكتبة التطبيق محتاجها.",
            how: R`لما تكتب [[npm install express]]، npm بيعمل ٤ حاجات: يدوّر على النسخة المناسبة في الـ registry، ينزّلها ومكتباتها اللي محتاجاها (dependencies بتاعتها) في node_modules، يضيف سطر في package.json تحت [[dependencies]]، ويحدّث package-lock.

[[dependencies]]: التطبيق محتاجها وقت التشغيل (express، prisma client). [[devDependencies]] بـ [[-D]]: محتاجها وقت التطوير والـ build بس (typescript، eslint، nodemon، jest). في الإنتاج [[npm ci --omit=dev]] مش بيسطّب التانية.

[[-g]] بيسطّب في مكان عام كأداة تشتغل من أي فولدر (زي pnpm أو vercel). مش للمكتبات اللي مشروعك بيستوردها.

[[install]] لوحدها بتقرا package.json وتسطّب كل حاجة، ودي أول حاجة بعد clone.`,
            when: "كل مكتبة جديدة. وبعد clone. و -D لأي أداة.",
            mistakes: "typescript في dependencies بدل -D، فالإنتاج يسطّبه من غير داعي. أو مكتبة التطبيق محتاجها في -D فالإنتاج يقع بـ module not found. و [[sudo npm install -g]] بيعمل ملفات ملك root."
          },
          lines: [
            "سطّب كل اللي في package.json (بعد clone).",
            "ضيف express لـ dependencies.",
            "ضيف أدوات تطوير لـ devDependencies.",
            "أداة عامة على الجهاز كله.",
            "شيل مكتبة من المشروع و package.json."
          ],
          sol: R`بعد [[npm i express]] و [[npm i -D nodemon]]:

[[dependencies: { express: "^5.2.1" }]] و [[devDependencies: { nodemon: "^3.1.14" }]] (الأرقام بتتغير مع الوقت). express في dependencies لأن التطبيق محتاجه وهو شغال، و nodemon في devDependencies لأنه أداة تطوير بس، ومش هيتسطب مع [[npm ci --omit=dev]] على السيرفر.

وكمان اتعمل [[package-lock.json]] وفولدر [[node_modules]] فيه express وكل اللي هو محتاجه (عشرات الباكدجات، مش واحدة).

الغلط الشائع: تسطّب أداة زي typescript أو eslint من غير [[-D]] فتروح dependencies وتتسطب في الإنتاج على الفاضي. أو العكس: مكتبة التطبيق بيحتاجها وقت التشغيل تحطها في dev، فالسيرفر يقع بـ [[Cannot find package]]. التصحيح سهل: [[npm i -D اسمها]] بتنقلها.`
        },
        {
          cmd: "^ و ~ في النسخ",
          title: "semver: النسخ بتتغير من غير ما تعرف",
          desc: "[[^4.18.2]] معناها أي نسخة من 4.18.2 لحد قبل 5.0.0. [[~4.18.2]] لحد قبل 4.19.0. من غير علامة يعني بالظبط. الرقم الأول تغييرات كاسرة، والتاني ميزات، والتالت إصلاحات.",
          example: R`npm view express versions --json | tail -5
npm view express version
npm install express@4.18.2
npm install express@^4
npm install express@latest`,
          try: "اكتب [[npm view express versions]] وشوف كام نسخة نزلت. وبعدين اقرا الحقل في package.json وافهم أنهي نسخ مسموحة.",
          deep: {
            why: "المشروع اشتغل امبارح وبايظ النهارده وانت مغيرتش حاجة. السبب غالبًا مكتبة اتحدّثت لوحدها، لأن package.json سمح بده.",
            how: R`النسخ بصيغة semver: [[major.minor.patch]]. الـ major بيتغير لما فيه تغيير كاسر (كود قديم مش هيشتغل). الـ minor لميزات جديدة متوافقة. الـ patch لإصلاحات.

[[^4.18.2]] (الافتراضي لما تسطّب): أي نسخة أكبر أو تساوي 4.18.2 وأقل من 5.0.0. يعني بيسمح بـ minor و patch جداد.

[[~4.18.2]]: أقل من 4.19.0. patch بس.

[[4.18.2]] من غير علامة: دي بالظبط. و [[save-exact]] في .npmrc بيخليها الافتراضي.

الـ [[^]] فيه استثناء مع النسخ اللي بتبدأ بصفر: [[^0.3.1]] معناها أقل من 0.4.0، لأن قبل 1.0.0 المكتبة بتعتبر كل minor ممكن يكسر.

[[npm view]] بيسأل الـ registry عن المكتبة: نسخها، وآخر نسخة، ووصفها.`,
            when: "لما تفهم الرموز، تقرا package.json وتعرف إيه ممكن يتغير. والـ lock هو اللي بيثبت فعليًا.",
            mistakes: "تحدّث major بـ [[npm update]] وتفتكر ده كفاية: update مش بيعدّي الـ ^. و [[@latest]] لمكتبة رئيسية من غير ما تقرا changelog."
          },
          lines: [
            "كل نسخ express كـ JSON، وآخر ٥.",
            "آخر نسخة بس.",
            "سطّب النسخة دي بالظبط.",
            "أي 4.x (بيتكتب ^4.0.0 في package.json).",
            "آخر نسخة مهما كانت (major جديد ممكن يكسر)."
          ],
          sol: R`[[npm view express versions --json]] رجّع عندي ٢٨٩ نسخة، وآخرهم [[5.0.0]] و [[5.0.1]] و [[5.1.0]] و [[5.2.0]] و [[5.2.1]]. و [[npm view express dist-tags]] بيوريك [[latest: 5.2.1]] و [[latest-4: 4.22.3]]، يعني لسه فيه تحديثات لخط 4.

القراية: [[^4.18.2]] معناها أي [[4.x.x]] من [[4.18.2]] وطالع، يعني [[4.22.3]] مسموحة و [[5.0.0]] لأ. و [[~4.18.2]] معناها [[4.18.x]] بس. و [[4.18.2]] من غير رمز نسخة واحدة بالظبط.

وتقدر تتأكد بنفسك: [[npm view express@"^4.18.2" version]] بيطبع كل النسخ اللي بتطابق. الغلط الشائع إنك تفتكر إن [[^]] بتجيب latest؛ هي بتقف عند الـ major، ودا اللي بيحميك من breaking changes. وفي 0.x القاعدة أضيق: [[^0.3.1]] يعني [[0.3.x]] بس.`
        },
        {
          cmd: "package-lock و npm ci",
          title: "نفس النسخ بالظبط في كل مكان",
          desc: "package.json بيقول «مسموح من كذا لكذا»، و package-lock بيقول «اللي اتسطّب فعلًا بالظبط». [[npm ci]] بيسطّب من الـ lock حرفيًا ويمسح node_modules الأول: أسرع وأثبت. ده اللي بتستخدمه في CI والإنتاج والـ Dockerfile.",
          example: R`npm ci
npm ci --omit=dev
git diff package-lock.json | head
npm install --package-lock-only`,
          try: "امسح node_modules وشغّل [[npm ci]] وقيس الوقت، وقارنه بـ [[npm install]].",
          deep: {
            why: "package.json بيسمح بمدى من النسخ. لو كل حد في الفريق والسيرفر سطّب في وقت مختلف، كل واحد ممكن ياخد نسخ مختلفة، وتبدأ مشاكل «شغال عندي».",
            how: R`[[package-lock.json]] بيتكتب أوتوماتيك مع كل install، وفيه النسخة اللي اتسطّبت بالظبط لكل مكتبة، ولكل مكتبة جوه مكتبة، مع hash للملف. ده بيوصف node_modules بالكامل.

[[npm install]] بيقرا package.json، ويحاول يحترم الـ lock، بس لو فيه تعارض بيعدّل الـ lock. و [[npm ci]] (clean install) بيقرا الـ lock بس: لو مش متطابق مع package.json بيفشل بدل ما يعدّل، وبيمسح node_modules الأول ويسطّب من الصفر. عشان كده أسرع وحتمي.

القاعدة: [[install]] على جهازك لما تضيف مكتبة. [[ci]] في كل مكان تاني: CI، و Dockerfile، والسيرفر.

والـ lock لازم يدخل Git. ولو شفت في PR تغييرات ضخمة في الـ lock، حد عمل install بنسخة npm مختلفة أو حدّث حاجة من غير ما يقصد.

[[--package-lock-only]] بيحدّث الـ lock من غير ما يسطّب حاجة، مفيد بعد تعديل package.json بإيدك.`,
            when: "ci دايمًا في الأتمتة. install لما تضيف أو تحدّث مكتبة.",
            mistakes: "package-lock في .gitignore. ومسحه «عشان يتصلّح»، ده بيخلي كل النسخ تتغير مرة واحدة."
          },
          lines: [
            "سطّب بالظبط اللي في الـ lock، بعد مسح node_modules.",
            "نفسه من غير devDependencies (الإنتاج).",
            "إيه اللي اتغير في الـ lock (قبل commit).",
            "حدّث الـ lock من package.json من غير تسطيب."
          ],
          sol: R`على مشروع صغير (express و nodemon) الفرق قليل: [[npm ci]] أخد حوالي 790ms و [[npm install]] من غير node_modules حوالي 810ms، والتاني وهو كل حاجة موجودة 490ms. على مشروع حقيقي فيه مئات الباكدجات الفرق بيبان أكتر، لأن [[npm ci]] مش بيحسب شجرة، بيقرا الـ lock وينفّذ.

بس السرعة مش النقطة الأهم. [[npm ci]] بيمسح node_modules الأول، وبيقع لو package.json والـ lock مش متطابقين بـ [[npm ci can only install packages when your package.json and package-lock.json are in sync]]، ومش بيعدّل الـ lock أبدًا. [[npm install]] ممكن يعدّل الـ lock، ودا اللي تشوفه في [[git diff package-lock.json]].

عشان كده: [[npm ci]] في CI والسيرفر، و [[npm install]] لما تضيف أو تحدّث مكتبة. ولو [[npm ci]] قالك [[The npm ci command can only install with an existing package-lock.json]] يبقى الـ lock مش متعمله commit.`
        },
        {
          cmd: "node --run",
          title: "شغّل سكربت أسرع من npm run",
          desc: "من Node 22 [[node --run dev]] بيشغّل السكربت من package.json مباشرة من غير ما npm يقوم، فأسرع بشكل ملحوظ. بيضيف [[node_modules/.bin]] للـ PATH زي npm. الفرق: مش بيشغّل [[pre]] و [[post]] scripts.",
          example: R`node --run dev
node --run build
node --run test -- --watch`,
          try: "قارن الوقت بين [[npm run lint]] و [[node --run lint]].",
          deep: {
            why: "npm run بياخد وقت عشان يحمّل npm نفسه، وده بيبان في السكربتات اللي بتتشغّل كتير.",
            how: "بيقرا scripts من أقرب package.json ويشغّل الأمر في الشيل. [[--]] بيمرر arguments. مفيش pre/post ولا lifecycle ولا متغيرات npm_config.",
            when: "dev و lint و test على جهازك.",
            mistakes: "تعتمد عليه في سكربت ليه prebuild فالـ prebuild ميتنفذش."
          },
          lines: ["شغّل سكربت dev.", "شغّل build (من غير prebuild).", "مرر --watch للأمر اللي جوه test."],
          sol: R`عندي على سكربت بسيط [[echo linting]]: [[npm run lint]] أخد حوالي 130ms، و [[node --run lint]] حوالي 10ms. الفرق هو وقت تشغيل npm نفسه، فبيبان في السكربتات القصيرة اللي بتتشغل كتير، ومش هيفرق في build بياخد دقيقة.

الفرق التاني المهم: [[node --run]] مش بيشغّل [[pre]] و [[post]]. جرّبت سكربت [[hello]] ومعاه [[prehello]]: [[npm run hello]] طبع الاتنين، و [[node --run hello]] طبع [[hello]] بس. ومش بيطبع السطرين [[> app@1.0.0 lint]] اللي npm بيطبعهم قبل السكربت.

لو [[node --run]] قالك [[bad option: --run]] يبقى نسخة Node أقدم من 22. ولو السكربت بيعتمد على متغيرات [[npm_package_*]] أو [[npm_config_*]] ممكن يتصرف مختلف، لأن node مش بيحطها كلها.`
        },
        {
          cmd: "npm scripts",
          title: "الأوامر اللي في package.json",
          desc: "أي أمر في [[scripts]] بتشغّله بـ [[npm run اسم]]. [[start]] و [[test]] من غير run. والمكتبات المسطّبة محليًا (في node_modules/.bin) بتشتغل من جوه السكربتات باسمها مباشرة. و [[--]] بيمرر arguments للسكربت.",
          example: R`npm run
npm run dev
npm start
npm test
npm run build -- --watch
npm run lint --silent`,
          try: "ضيف سكربت [[hello]] بيطبع رسالة، وشغّله، وبعدين ضيف [[prehello]] وشوفه بيتنفذ قبله لوحده.",
          deep: {
            why: "بدل ما كل واحد في الفريق يفتكر أمر الـ build الطويل، بيتكتب مرة في package.json وكله يشغّل [[npm run build]].",
            how: R`[[scripts]] في package.json: اسم وأمر. [[npm run اسم]] بيشغّل الأمر في شيل، بعد ما يضيف [[node_modules/.bin]] للـ PATH. عشان كده [[tsc]] أو [[eslint]] بتشتغل باسمها من جوه السكربت حتى لو مش متسطبة عامة.

[[npm run]] لوحدها بتعرض كل السكربتات. [[start]] و [[test]] و [[stop]] و [[restart]] بيشتغلوا من غير [[run]].

[[pre]] و [[post]]: لو فيه سكربت اسمه [[prebuild]]، بيتنفذ لوحده قبل [[build]]. و [[postinstall]] بعد كل install (Prisma بيستخدمه لـ generate).

[[--]] بعد اسم السكربت بيمرر اللي بعده للأمر نفسه: [[npm run build -- --watch]] بيشغّل [[vite build --watch]]. من غير [[--]] npm بياخدها لنفسه.

السكربتات بتشتغل بشيل النظام (sh على لينكس، cmd على ويندوز)، فأوامر زي [[rm -rf]] مش هتشتغل على ويندوز. للتوافق: مكتبات زي rimraf و cross-env.`,
            when: "كل أمر بيتكرر في المشروع. dev و build و test و lint و db:migrate.",
            mistakes: "نسيان [[--]] فالـ flag يروح لـ npm ويتجاهله. وأوامر لينكس في سكربت الفريق فيه ناس على ويندوز."
          },
          lines: [
            "اعرض كل السكربتات.",
            "شغّل سكربت dev.",
            "start من غير run.",
            "test من غير run.",
            "مرر --watch للأمر اللي جوه السكربت (الـ -- لازمة).",
            "من غير كلام npm الزيادة."
          ],
          sol: R`الحل في package.json:

[["prehello": "echo before hello"]] و [["hello": "echo hello from npm"]]. و [[npm run hello]] بيطبع [[> app@1.0.0 prehello]] ثم [[before hello]] ثم [[> app@1.0.0 hello]] ثم [[hello from npm]]. ما ندهتش prehello، npm شغّله لوحده لأن الاسم [[pre]] + اسم السكربت.

و [[npm run]] من غير اسم بيعرض كل السكربتات. ولو prehello فشل (exit غير صفر)، hello مش هيشتغل خالص.

الغلط الشائع: [[npm hello]] من غير [[run]] بيقول [[Unknown command: "hello"]]؛ الأسماء الخاصة بس ([[start]] و [[test]] و [[stop]] و [[restart]]) بتشتغل من غير run. و [[node --run hello]] مش بيشغّل الـ prehello.`,
          solCode: R`npm pkg set scripts.hello="echo hello from npm"
npm pkg set scripts.prehello="echo before hello"
npm run hello`
        },
        {
          cmd: "npx",
          title: "شغّل أداة من غير ما تسطّبها",
          desc: "[[npx]] بيدوّر على الأداة في node_modules/.bin، ولو مش موجودة بينزّلها مؤقتًا ويشغّلها. عشان كده [[npx create-next-app]] بيشتغل من غير تسطيب، و [[npx prisma migrate]] بيستخدم نسخة المشروع مش نسخة عامة.",
          example: R`npx create-next-app@latest myapp
npx prisma generate
npx tsc --noEmit
npx -y kill-port 3000
npx cowsay "hi"`,
          try: R`شغّل [[npx cowsay "hi"]] وبعدين [[npm ls -g]]: مش هتلاقيها متسطبة.`,
          deep: {
            why: "أدوات كتير بتستخدمها مرة واحدة (create-next-app) أو لازم تبقى بنسخة المشروع مش نسخة عامة (prisma، tsc). التسطيب العام بيعمل مشاكل نسخ.",
            how: R`[[npx أداة]] بيدوّر بالترتيب: في node_modules/.bin بتاع المشروع، وبعدين في الأدوات العامة، ولو ملقاش بينزّل الباكدج في كاش مؤقت ويشغّلها ويسيبها في الكاش للمرة الجاية.

عشان كده [[npx prisma]] جوه مشروع بيستخدم نسخة Prisma اللي في package.json بالظبط، وده المطلوب.

[[@latest]] بيجبره ينزّل آخر نسخة بدل الكاش، مهم مع أدوات الإنشاء زي create-next-app.

[[-y]] بيوافق على سؤال «هل أنزّل الباكدج دي؟» لوحده، لازمة في السكربتات.

وأمان: npx بينزّل وينفّذ كود من النت. تأكد من اسم الباكدج بالظبط، فيه باكدجات بأسامي شبه المشهورة (typosquatting).`,
            when: "إنشاء مشاريع. أوامر أدوات المشروع (prisma، tsc، eslint، next). أدوات لمرة واحدة.",
            mistakes: "تسطّب prisma عام وتشغّله، فيبقى نسخة مختلفة عن اللي في المشروع ويطلع errors. استخدم npx."
          },
          lines: [
            "اعمل مشروع Next بآخر نسخة من الأداة من غير تسطيب.",
            "شغّل prisma بنسخة المشروع.",
            "افحص TypeScript من غير ما تطلّع ملفات.",
            "أداة صغيرة تقفل اللي ماسك بورت، و -y توافق على التنزيل.",
            "أي باكدج من npm تتنفذ مباشرة."
          ],
          sol: R`[[npx cowsay "hi"]] أول مرة بيسألك [[Need to install the following packages: cowsay@... Ok to proceed? (y)]]، وبعد [[y]] بيرسم البقرة وجنبها [[< hi >]]. ومع [[npx -y]] مش بيسأل.

و [[npm ls -g --depth=0]] بيعرض الحاجات المتسطبة global (npm و corepack وأي حاجة سطبتها بـ [[-g]])، ومش هتلاقي cowsay فيهم. npx نزّلها في cache ([[~/.npm/_npx]]) وشغّلها من هناك.

قاعدة npx: لو الأداة موجودة في [[node_modules/.bin]] بتاع المشروع بيشغّلها منها (ودا اللي بيحصل مع [[npx tsc]] و [[npx prisma]])، ولو مش موجودة بينزّلها مؤقتًا. عشان كده [[npx prisma]] في مشروع مش متسطب فيه prisma ممكن ينزّل آخر نسخة، مش نسخة مشروعك. والغلط الشائع إنك تكتب اسم الباكدج غلط فـ npx يدوّر عليه في الـ registry ويقول [[404 Not Found]].`
        },
        {
          cmd: "npm start ولا npm run dev",
          title: "وضع التطوير ووضع الإنتاج",
          desc: R`[[npm run dev]] بيشغّل سيرفر تطوير: بيراقب الملفات ويعيد البناء لوحده، وتقيل ومليان رسايل debug. [[npm start]] بيشغّل النسخة اللي اتبنت بـ [[npm run build]]. الاتنين مجرد أسامي في scripts، فافتح package.json وشوف كل واحد بيعمل إيه فعلًا.

القاعدة: dev على جهازك، و build وبعده start على السيرفر. ولو start وقع وقال مفيش build، يبقى نسيت الخطوة اللي في النص.`,
          example: R`jq .scripts package.json
npm run dev
npm run build
npm start
# Vite مفيهوش start، عنده معاينة للـ build
npm run build && npx vite preview --port 4173`,
          try: "في مشروع Next أو Vite: شغّل dev وافتح الصفحة وشوف وقت التحميل، وبعدين build و start (أو preview) وقارن.",
          deep: {
            why: "أشهر غلطة لما حد يرفع أول مشروع: السيرفر شغال بـ npm run dev. الموقع بيفتح، بس بطيء، وبياكل رامات، وبيطلّع تفاصيل الأخطاء للزوار، ومع أي تعديل في الملفات بيعيد البناء.",
            how: R`في Next: [[dev]] هو [[next dev]]، و [[build]] هو [[next build]]، و [[start]] هو [[next start]] اللي بيشغّل ناتج الـ build. من غير build قبله، start بيقول إنه ملقاش فولدر [[.next]] جاهز.

في Vite: [[vite]] سيرفر تطوير على 5173، و [[vite build]] بيطلّع فولدر [[dist]] فيه HTML و JS و CSS عادية. مفيش start لأن الناتج ملفات ثابتة، Nginx أو أي استضافة static بتقدّمها. و [[vite preview]] بيقدّم dist على جهازك عشان تتأكد إن الـ build سليم، مش سيرفر إنتاج.

في باك إند Express: غالبًا [[start]] هو [[node server.js]] و [[dev]] هو نفس الأمر مع [[--watch]].

[[start]] و [[test]] بيشتغلوا من غير كلمة run، الباقي لازم [[npm run]].`,
            when: "أول ما تفتح مشروع حد تاني: اقرا scripts قبل ما تشغّل أي حاجة. وقبل أي deploy: السيرفر لازم يشغّل start.",
            mistakes: "في مشروع حقيقي كان ملف compose بتاع الإنتاج فيه NODE_ENV=development، فالتطبيق كان شغال بإعدادات التطوير على السيرفر من غير ما حد ياخد باله. وغلطة تانية: vite preview كسيرفر إنتاج، هو معمول للمعاينة بس."
          },
          lines: [
            "اعرض السكربتات اللي في المشروع قبل ما تشغّل حاجة.",
            "سيرفر التطوير: بيراقب الملفات ويعيد البناء.",
            "ابني نسخة الإنتاج.",
            "شغّل النسخة المبنية (من غير run).",
            "في Vite: ابني وعاين الناتج على بورت 4173."
          ],
          sol: R`في dev أول فتح للصفحة بياخد وقت (ثانية أو أكتر في Next، لأنه بيبني الصفحة وقت الطلب)، والـ Network في المتصفح بيعرض ملفات JavaScript كتير مش مضغوطة، ورسايل HMR. بعد [[npm run build]] و [[npm start]] (أو [[vite preview]]) نفس الصفحة بتفتح أسرع بكتير، والملفات قليلة ومضغوطة وأسمائها فيها hash.

ودا الفرق: dev مبني للتعديل السريع، مش للسرعة ولا للأمان. عشان كده مينفعش تشغّل [[npm run dev]] على السيرفر.

الأخطاء الشائعة: [[npm start]] من غير build في Next بيقول [[Could not find a production build in the '.next' directory]]. وفي Vite [[npm start]] بيقول [[Missing script: "start"]] لأن مفيش start، والمعاينة [[vite preview]] (على بورت 4173) ومش مخصصة للإنتاج؛ الإنتاج في Vite هو فولدر [[dist]] على Nginx أو أي static host.`
        }
      ]
    },
    {
      t: "الشغل اليومي",
      l: 2,
      n: "البيئة، والبورتات، والمكتبات لما تبوظ، ومديرين الباكدجات التانيين",
      items: [
        {
          cmd: "node --test",
          title: "الاختبارات من غير jest",
          desc: "Node فيه test runner مبني (مستقر من Node 20). بتكتب [[test()]] من [[node:test]] و [[assert]] من [[node:assert/strict]]، في ملفات اسمها [[*.test.js]]، و [[node --test]] بيلاقيها ويشغّلها لوحده.",
          example: R`node --test
node --test --watch
node --test --test-name-pattern="login"
node --test --experimental-test-coverage`,
          try: "اعمل math.test.js فيه test لدالة sum، وشغّله، وبعدين بوّظ الدالة وشوف الفشل.",
          deep: {
            why: "مشروع صغير أو سكربت مش محتاج jest وإعداداته. الاختبارات موجودة جوه Node نفسه.",
            how: "[[node --test]] بيدوّر على ملفات [[*.test.js]] و [[*.test.mjs]] وفولدر [[test]]، وكل ملف بيشتغل في process لوحده. [[--watch]] بيعيد مع كل تعديل. [[--test-name-pattern]] بيفلتر بالاسم. والـ coverage لسه experimental. ولو حطيته في [[scripts.test]]، [[npm test]] بيشغّله.",
            when: "مكتبات ومنطق backend وسكربتات. لـ React components، Vitest أنسب.",
            mistakes: "تنسى await مع test async فيعدّي وهو فاشل. وتستخدم assert العادي بدل strict."
          },
          lines: [
            "دوّر على ملفات الاختبار وشغّلها.",
            "وأعد التشغيل مع كل تعديل.",
            "الاختبارات اللي اسمها فيه login بس.",
            "واطبع نسبة الكود اللي الاختبارات غطّته."
          ],
          sol: R`الحل: [[math.js]] فيه [[sum]]، و [[math.test.js]] بـ [[node:test]] و [[node:assert/strict]]. [[node --test]] في الترمنال بيطبع [[✔ sum adds two numbers]] ومعاه الوقت، وتحت [[ℹ tests 1]] و [[ℹ pass 1]] و [[ℹ fail 0]]. (لو الناتج رايح لملف أو pipe بيطلع بشكل TAP: [[ok 1 - sum adds two numbers]].)

لما تبوّظ الدالة لـ [[a - b]]: [[✖ sum adds two numbers]] وتحتها [[Expected values to be strictly equal:]] و [[-1 !== 5]]، ومكان الـ assert في الملف، و [[fail 1]]، و exit code 1.

لو [[node --test]] ما لقاش الملف: الاسم لازم يطابق [[*.test.js]] أو [[*-test.js]] أو [[*_test.js]] أو يكون جوه فولدر [[test]]. ولو طلع [[Cannot use import statement outside a module]] ضيف [["type": "module"]] أو سمّي الملفات [[.mjs]].`,
          solCode: R`// math.js
export function sum(a, b) {
  return a + b;
}

// math.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { sum } from "./math.js";

test("sum adds two numbers", () => {
  assert.equal(sum(2, 3), 5);
});`
        },
        {
          cmd: "node مباشرة",
          title: "REPL و -e و --watch",
          desc: "[[node]] لوحدها بتفتح REPL تجرّب فيه JavaScript. [[-e]] ينفّذ سطر. [[-p]] ينفّذ ويطبع الناتج. و [[--watch]] (من Node 18) بيعيد تشغيل الملف مع كل تعديل، بديل nodemon من غير تسطيب.",
          example: R`node
node -e "console.log(1 + 1)"
node -p "require('./package.json').version"
node --watch server.js
node --check server.js`,
          try: "افتح REPL وجرّب [[process.env.PATH.split(':')]] و [[os.cpus().length]] بعد [[const os = require('os')]].",
          deep: {
            why: "مش كل حاجة محتاجة ملف. تجرّب سطر JavaScript، أو تقرا قيمة من JSON، أو تشغّل السيرفر بحيث يعيد التشغيل مع كل تعديل.",
            how: R`[[node]] لوحدها REPL (Read Eval Print Loop): بتكتب JavaScript وبيتنفذ سطر سطر. [[.exit]] أو Ctrl+D للخروج. مفيد تجرّب regex أو date أو API مكتبة.

[[-e]] (eval) بينفّذ الكود اللي بين علامات التنصيص. [[-p]] (print) نفس الحاجة وبيطبع الناتج، فـ [[node -p "require('./package.json').version"]] بيطلّع النسخة من غير jq.

[[--watch]] بيراقب الملف والملفات اللي بيستوردها، ويعيد التشغيل مع أي تعديل. بديل nodemon مبني في Node 18.11 وأحدث. و [[--watch-path]] لمراقبة فولدر معين.

[[--check]] بيتأكد إن الملف syntax سليم من غير ما يشغّله.`,
            when: "REPL لتجربة سريعة. -p في السكربتات. --watch في التطوير.",
            mistakes: "double quotes جوه -e مع double quotes بره فتتعارض. استخدم single بره و double جوه."
          },
          lines: [
            "REPL: اكتب JavaScript وشوف الناتج. Ctrl+D للخروج.",
            "نفّذ سطر.",
            "نفّذ واطبع الناتج: النسخة من package.json.",
            "شغّل وأعد التشغيل مع كل تعديل (بديل nodemon).",
            "اتأكد إن الملف syntax سليم من غير تشغيل."
          ],
          sol: R`[[process.env.PATH.split(':')]] بيرجّع array فيها كل فولدر في الـ PATH بالترتيب، زي [[[ '/root/.local/bin', '/usr/local/bin', '/usr/bin', ... ]]]. و [[const os = require('os')]] بيطبع [[undefined]] (ودا طبيعي في الـ REPL، الـ declarations مالهاش قيمة). و [[os.cpus().length]] بيرجّع عدد الأنوية، زي [[4]] أو [[8]].

خلي بالك من الأقواس: [[os.cpus.length]] من غير [[()]] بيرجّع [[0]]، لأنه طول الدالة نفسها مش الـ array. غلطة بتحصل كتير. و [[.exit]] أو Ctrl+D مرتين للخروج.

وعلى ويندوز الفاصل في PATH هو [[;]] مش [[:]]، فالـ split هيرجّع عنصر واحد طويل. الصح اللي بيشتغل في الاتنين [[process.env.PATH.split(require('path').delimiter)]].`
        },
        {
          cmd: ".env و متغيرات البيئة",
          title: "الإعدادات بره الكود",
          desc: "الكود بيقرا [[process.env.PORT]]، والقيمة جاية من البيئة: من الترمنال، أو من ملف .env. Node 20 وأحدث بيقرا الملف مباشرة بـ [[--env-file]] من غير مكتبة dotenv.",
          example: R`PORT=4000 node server.js
node --env-file=.env server.js
node -e "console.log(process.env.DATABASE_URL)"
cp .env.example .env
grep -v '^#' .env | cut -d= -f1`,
          try: "اعمل .env فيه PORT=4000 وشغّل السيرفر بـ [[--env-file]] واتأكد إنه فتح على 4000.",
          deep: {
            why: "الباسوردات والمفاتيح مينفعش تتكتب في الكود ولا تدخل Git. وبتختلف بين جهازك والسيرفر. بتتحط في البيئة، والكود بيقراها.",
            how: R`[[process.env]] object فيه كل متغيرات البيئة اللي العملية اتشغّلت بيها. [[PORT=4000 node server.js]] بيضيف PORT للبيئة للأمر ده بس.

ملف [[.env]] (سطر لكل متغير) مش بيتقري لوحده. تقليديًا مكتبة dotenv بتقراه وتحطه في process.env. من Node 20.6 فيه [[--env-file=.env]] مبني، من غير مكتبة. وفي Next.js الإطار بيقراه لوحده.

القيم كلها نصوص. [[process.env.PORT]] هي "4000" مش 4000، فحوّلها لو هتحسب بيها.

[[.env.example]] بيدخل Git بالأسامي من غير قيم، و [[.env]] في .gitignore. والأمر الأخير بيطلّع أسامي المتغيرات من .env عشان تقارنها بالـ example.

في Docker المتغيرات بتيجي من env_file أو -e. وعلى pm2 من ecosystem file أو .env.`,
            when: "كل مشروع من أول يوم: .env و .env.example و .gitignore.",
            mistakes: "متغير في .env والكود بيقراه undefined: نسيت --env-file أو dotenv، أو المتغير بعد ما الكود قراه. dotenv لازم في أول سطر قبل أي import بيستخدم البيئة."
          },
          lines: [
            "متغير للأمر ده بس.",
            "اقرا .env مباشرة (Node 20.6+) من غير dotenv.",
            "اقرا متغير من البيئة الحالية.",
            "ابدأ ملفك من النموذج.",
            "أسامي المتغيرات في .env من غير قيمها (للمقارنة أو المشاركة)."
          ],
          sol: R`مع سيرفر بيقرا [[process.env.PORT || 3000]] و [[.env]] فيه [[PORT=4000]]: [[node --env-file=.env server.js]] بيطبع [[listening on 4000]]، و [[curl localhost:4000]] بيرد.

لو فتح على 3000: يا الكود بيقرا اسم تاني ([[process.env.port]] بحروف صغيرة مختلف)، يا نسيت [[--env-file]]، يا فيه [[PORT]] متعرّف في الترمنال أصلًا (القيمة اللي في البيئة بتكسب على الملف؛ اتأكد بـ [[echo $PORT]]).

ولو الملف مش موجود، Node بيقع على طول بـ [[node: nope.env: not found]]. لو عايز الملف يبقى اختياري استخدم [[--env-file-if-exists]] (في النسخ الحديثة). والغلط الشائع: [[PORT = 4000]] بمسافات أو في آخر السطر تعليق من غير مسافة قبله، فالقيمة تتقري غلط.`,
          solCode: R`// server.js
import http from "node:http";
const port = process.env.PORT || 3000;
http.createServer((req, res) => res.end("ok\n")).listen(port, () => console.log("listening on " + port));

// الترمنال
echo "PORT=4000" > .env
node --env-file=.env server.js`
        },
        {
          cmd: "البورت مشغول",
          title: "EADDRINUSE",
          desc: "الرسالة الأشهر: [[listen EADDRINUSE: address already in use :::3000]]. يعني عملية تانية (غالبًا نسخة قديمة من سيرفرك) ماسكة البورت. تلاقيها وتقفلها، أو تشغّل على بورت تاني.",
          example: R`lsof -i :3000
kill -9 $(lsof -t -i :3000)
npx -y kill-port 3000
PORT=3001 npm run dev`,
          try: "شغّل السيرفر مرتين في ترمنالين وشوف الرسالة، وبعدين اقفل الأول بـ kill-port.",
          deep: {
            why: "شغّلت السيرفر، وقفلت الترمنال أو الـ hot reload وقع، والعملية القديمة لسه ماسكة البورت. اللي بعدها بتفشل بـ EADDRINUSE.",
            how: R`نظام التشغيل بيسمح لعملية واحدة تسمع على بورت. الرسالة بتقولك أنهي بورت. [[lsof -i :3000]] بيقولك مين ماسكه ورقمها (PID).

[[lsof -t]] بيطلّع الرقم بس، و [[$( )]] بيحطه في kill. و [[-9]] هنا مقبول لأنها عملية تطوير معلّقة.

[[npx kill-port 3000]] نفس الحاجة بأمر واحد، وبيشتغل على ويندوز كمان (على ويندوز lsof مش موجود، بدلها [[netstat -ano]] و [[taskkill]]).

الأسهل أحيانًا: شغّل على بورت تاني. لو الكود بيقرا [[process.env.PORT || 3000]]، [[PORT=3001 npm run dev]] بيحل.

وفي الإنتاج، EADDRINUSE معناه غالبًا نسختين من التطبيق شغالين (pm2 و docker مثلًا)، وده لازم يتحقق مش يتقفل.`,
            when: "كل ما تشوف الرسالة. وقبل ما تشغّل السيرفر لو مش متأكد.",
            mistakes: "تقفل أي عملية على البورت من غير ما تشوف هي إيه. على السيرفر ممكن تقفل الإنتاج."
          },
          lines: [
            "مين ماسك 3000.",
            "اقفله: -t يطلّع الرقم بس.",
            "نفس الحاجة بأمر واحد (وعلى ويندوز كمان).",
            "أو اشتغل على بورت تاني."
          ],
          sol: R`التاني بيقع على طول:

[[Error: listen EADDRINUSE: address already in use :::3000]] (أو [[0.0.0.0:3000]] حسب الإعداد) ومعاها [[code: 'EADDRINUSE']] و [[port: 3000]].

[[lsof -i :3000]] بيطلّع السطر بتاع الأول: [[node 1564 you ... TCP *:3000 (LISTEN)]] والرقم التاني هو الـ PID. و [[npx -y kill-port 3000]] بيطبع [[Process on port 3000 killed]]، وبعدها [[lsof -i :3000]] مش بيطبع حاجة، وتقدر تشغّل التاني.

قبل ما تقتل، بص على اسم البرنامج في lsof: ممكن يبقى حاجة تانية مش سيرفرك القديم (Docker أو مشروع تاني). ولو [[lsof]] ما طلّعش حاجة والبورت لسه مشغول، شغّله بـ [[sudo]] لأن البرنامج ممكن يكون بيوزر تاني. وعلى ويندوز: [[netstat -ano | findstr :3000]].`
        },
        {
          cmd: "outdated / update / audit",
          title: "تحديث المكتبات بأمان",
          desc: "[[outdated]] بيوريك ٣ أعمدة: الحالية، والمسموحة (Wanted) حسب ^ و ~، والأحدث (Latest). [[update]] بيحدّث لحد Wanted بس. للانتقال لنسخة رئيسية جديدة لازم تسطّبها بالاسم. و [[audit]] للثغرات.",
          example: R`npm outdated
npm update
npm install react@latest react-dom@latest
npm audit
npm audit fix
npx npm-check-updates -u`,
          try: "شغّل [[npm outdated]] على مشروع قديم واقرا الأعمدة التلاتة. لاحظ إن Latest ممكن يكون أعلى من Wanted.",
          deep: {
            why: "المكتبات بتتحدّث كل أسبوع. لو سبتها شهور، التحديث بيبقى مؤلم. ولو حدّثت كل حاجة مرة واحدة من غير فهم، حاجة هتبوظ.",
            how: R`[[outdated]] بيعرض جدول: Current اللي عندك، Wanted أعلى نسخة مسموحة حسب ^ و ~ في package.json، Latest آخر نسخة نزلت. لو Wanted أقل من Latest، فيه major جديد.

[[update]] بيرفع لـ Wanted بس ويحدّث الـ lock. آمن نسبيًا لأنه في حدود semver.

major جديد: تسطّبه بالاسم [[react@latest]]، وتقرا changelog الأول، وتجرّب. مكتبات كتير ليها migration guide.

[[npx npm-check-updates -u]] بيعدّل package.json لآخر نسخ كل حاجة بما فيها major. قوي وخطير: استخدمه في branch وشغّل الاختبارات.

[[audit]] بيقارن الـ lock بقاعدة ثغرات. [[audit fix]] بيحدّث في حدود semver. لو الثغرة محتاجة major، بيقولك وميعملش، و [[--force]] بيعمل بس ممكن يكسر.`,
            when: "outdated شهريًا. audit في CI. major updates واحدة واحدة في branch.",
            mistakes: "[[audit fix --force]] على الإنتاج. وتحديث ١٠ مكتبات major مرة واحدة فمش عارف مين اللي كسر."
          },
          lines: [
            "الجدول: الحالي والمسموح والأحدث.",
            "حدّث في حدود ^ و ~.",
            "major جديد لازم بالاسم.",
            "الثغرات.",
            "صلّح في حدود semver.",
            "عدّل package.json لآخر نسخ الكل (في branch بس)."
          ],
          sol: R`على مشروع فيه [[express@4.18.2]] بـ [[^]]:

[[Package  Current  Wanted  Latest]] وتحتها [[express  4.18.2  4.22.3  5.2.1]]. Current المتسطب فعلًا، و Wanted أعلى نسخة يسمح بيها الـ [[^4.18.2]] في package.json، و Latest آخر نسخة منشورة. Latest أعلى من Wanted لأنها major جديدة (5)، و [[npm update]] هيوصل لـ 4.22.3 بس.

والنقلة لـ 5 قرار منك: [[npm i express@latest]] واقرا دليل الترقية، لأن فيه breaking changes. و [[npm audit]] على نفس المشروع طلّع ثغرات high في [[body-parser]] و [[cookie]] و [[qs]] كلها جاية من express القديم، و [[fix available via npm audit fix]] لأن النسخة الآمنة جوه نفس الـ major.

الغلط الشائع: [[npm audit fix --force]] من غير ما تقرا، وهو ممكن ينقلك major جديدة ويكسر المشروع.`
        },
        {
          cmd: "ls / why / dedupe",
          title: "مين جاب المكتبة دي",
          desc: "node_modules فيه مئات المكتبات مش انت اللي سطّبتهم. [[ls]] بيرسم الشجرة، و [[why]] بيقولك مين محتاج مكتبة معينة، و [[dedupe]] بيشيل النسخ المكررة.",
          example: R`npm ls --depth=0
npm ls lodash
npm why lodash
npm dedupe
du -sh node_modules`,
          try: "اكتب [[npm why]] لأي مكتبة ظهرت في [[npm audit]] عشان تعرف انت مسطّبها ولا جاية مع مكتبة تانية.",
          deep: {
            why: "npm audit بيقولك ثغرة في مكتبة عمرك ما سمعت عنها. جت منين؟ ومين محتاجها؟ من غير ما تعرف مش هتعرف تحلها.",
            how: R`المكتبات ليها مكتبات. express محتاج ٣٠ مكتبة، وكل واحدة محتاجة غيرها. [[npm ls]] بيرسم الشجرة دي، و [[--depth=0]] المستوى الأول بس (اللي انت سطّبته).

[[npm ls lodash]] بيوريك كل مكان lodash موجود فيه في الشجرة، ومن خلال مين. لو ظهرت ٣ مرات بنسخ مختلفة، ده طبيعي: npm بيسطّب نسخ متعددة لو المكتبات طلبت نسخ متعارضة.

[[npm why]] نفس المعلومة بشكل أوضح: «lodash موجود لأن X محتاجها، و X موجود لأنك سطّبته».

[[dedupe]] بيحاول يقلل النسخ المكررة لو semver يسمح، فـ node_modules يصغر.

وحل ثغرة في مكتبة فرعية: يا تحدّث المكتبة الأم، يا [[overrides]] في package.json تجبر نسخة معينة.`,
            when: "بعد audit. لما node_modules ضخم. لما فيه نسختين من react في الشجرة (وده بيعمل errors غريبة).",
            mistakes: "تحاول تحدّث مكتبة فرعية مباشرة بـ install، فتبقى في dependencies بتاعتك وتتلخبط الشجرة أكتر."
          },
          lines: [
            "المكتبات اللي انت سطّبتها بس.",
            "فين lodash في الشجرة.",
            "مين محتاجها وليه.",
            "قلّل النسخ المكررة.",
            "node_modules حجمه كام."
          ],
          sol: R`على مشروع فيه express 4 قديم، [[npm audit]] قال إن [[cookie <0.7.0]] فيها ثغرة. و [[npm why cookie]] رد:

[[cookie@0.5.0]] ← [[cookie@"0.5.0" from express@4.18.2]] ← [[express@"^4.18.2" from the root project]]. يعني انت ما سطّبتش cookie، هي جاية مع express. والحل مش إنك تسطّب cookie لوحدها، الحل تحدّث express.

لو السلسلة انتهت بـ [[from the root project]] على طول تحت المكتبة نفسها، يبقى انت اللي مسطّبها في package.json. ولو [[npm why]] رجّع أكتر من مسار، يبقى مكتبات مختلفة طالباها بنسخ مختلفة، وساعتها [[npm dedupe]] ممكن يقلّل النسخ. ولو قال [[No dependencies found matching]] يبقى الاسم مكتوب غلط أو المكتبة مش متسطبة أصلًا.`
        },
        {
          cmd: "node_modules بايظ",
          title: "الحل الكلاسيكي",
          desc: "أعراض: مكتبة موجودة ومش بتتلاقى، أو errors غريبة بعد pull، أو مكتبة native (bcrypt، sharp) بتقع. الحل غالبًا مسح node_modules والـ cache والتسطيب من الأول.",
          example: R`rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm rebuild
npm cache verify`,
          try: "جرّب [[npm rebuild]] الأول لو المشكلة في مكتبة native، قبل ما تمسح كل حاجة.",
          deep: {
            why: "node_modules فيه آلاف الملفات، وبيتلخبط: تسطيب اتقطع في النص، أو تبديل نسخة Node، أو pull غيّر الـ lock. الأعراض غريبة ومش مرتبطة بكودك.",
            how: R`أعراض المشكلة: [[Cannot find module]] لمكتبة موجودة في package.json، أو [[invalid ELF header]] / [[was compiled against a different Node.js version]] لمكتبة native.

المكتبات الـ native (bcrypt، sharp، better-sqlite3) فيها كود مترجم لنظامك ونسخة Node بتاعتك. لو بدّلت نسخة Node بـ nvm، الكود المترجم مبقاش متوافق. [[npm rebuild]] بيعيد ترجمتهم من غير ما يمسح حاجة، وده أول حاجة تجرّبها.

لو مفيش فايدة: امسح node_modules والـ lock، ونضّف الكاش، وسطّب من الأول. مسح الـ lock بيغيّر النسخ، فلو المشروع مشترك امسح node_modules بس وشغّل [[npm ci]].

[[cache verify]] بيتأكد إن كاش npm سليم من غير ما يمسحه.`,
            when: "errors في مكتبات مش في كودك. بعد تبديل نسخة Node. بعد pull كبير.",
            mistakes: "مسح الـ lock في مشروع فريق فتغيّر نسخ الكل. ومسح node_modules قبل ما تجرّب rebuild."
          },
          lines: [
            "امسح المكتبات والـ lock (في مشروع فريق: node_modules بس).",
            "نضّف كاش npm.",
            "سطّب من الأول.",
            "أعد ترجمة المكتبات native (جرّبه الأول لوحده).",
            "اتأكد إن الكاش سليم."
          ],
          sol: R`[[npm rebuild]] لما ينجح بيطبع [[rebuilt dependencies successfully]]. ودي خطوة أسرع وأخف من المسح، ومش بتلمس الـ lock.

الحالة اللي بيحلها: غيّرت نسخة Node بـ nvm ومكتبة native زي bcrypt أو better-sqlite3 بتقع بـ [[was compiled against a different Node.js version using NODE_MODULE_VERSION 127. This version of Node.js requires NODE_MODULE_VERSION 137]] (الأرقام حسب النسخ). الـ rebuild بيعيد ترجمتها لنسختك الحالية. ولو المكتبة محتاجة build tools ومش موجودة هتلاقي errors من [[node-gyp]] زي [[gyp ERR! find Python]]، وساعتها سطّب [[build-essential]] و python.

لو [[npm rebuild]] ما حلّش، ساعتها [[rm -rf node_modules]] و [[npm install]] (من غير ما تمسح الـ lock في الأول). مسح [[package-lock.json]] آخر حل، لأنه بيحدّث كل المكتبات مرة واحدة ويخبّي السبب الحقيقي.`
        },
        {
          cmd: "ERESOLVE و legacy-peer-deps",
          title: "تعارض الـ peer dependencies",
          desc: R`[[npm ERR! ERESOLVE unable to resolve dependency tree]] معناها مكتبة بتقول «أنا شغالة مع react 18» وانت عندك 19. [[--legacy-peer-deps]] بيخلي npm يتجاهل الكلام ده ويسطّب، وده بيخبي المشكلة مش بيحلها.

الصح إنك تعرف مين المتعارض، وتحدّث المكتبة لنسخة بتدعم اللي عندك. ولو مفيش، [[overrides]] وانت عارف انت بتعمل إيه.`,
          example: R`npm install
npm explain react
npm view react-day-picker peerDependencies
npm install react-day-picker@latest
npm install --legacy-peer-deps
echo "legacy-peer-deps=true" >> .npmrc`,
          try: "في مشروع تجربة سطّب react@19 وبعدين مكتبة قديمة معمولة لـ react 17، واقرا رسالة ERESOLVE لحد ما تفهم مين طالب إيه.",
          deep: {
            why: "الرسالة طويلة ومخيفة، فالناس بتنسخ أول حل على النت: legacy-peer-deps. التسطيب بيعدّي، والمشكلة بتظهر بعدين وقت التشغيل في شكل error ملهوش علاقة.",
            how: R`الـ [[peerDependencies]] مش مكتبة المكتبة محتاجاها جواها، دي مكتبة لازم «انت» تكون مسطّبها، زي plugin لـ React محتاج React نفسه. المكتبة بتقول النسخ اللي اتجرّبت معاها.

من npm 7، npm بيسطّب الـ peers لوحده وبيرفض لو فيه تعارض. رسالة ERESOLVE فيها سطرين مهمين: [[Found:]] اللي عندك، و [[Could not resolve dependency: peer ...]] اللي المكتبة عايزاه ومين طالبه.

[[npm explain]] (هو نفسه npm why) بيوريك مين جايب الباكدج. و [[npm view ... peerDependencies]] بيوريك آخر نسخة من المكتبة بتدعم إيه، وغالبًا الحل تحديثها.

[[--legacy-peer-deps]] بيرجّع سلوك npm 6: يتجاهل الـ peers خالص. و [[--force]] أسوأ: بيسطّب نسخ متعارضة. لو مضطر، حط [[legacy-peer-deps=true]] في .npmrc بتاع المشروع بدل الفلاج، عشان جهازك والـ CI والـ Dockerfile يمشوا بنفس الطريقة ويطلعوا نفس الـ lock.`,
            when: "أول ما تشوف ERESOLVE. اقرا الرسالة الأول، ودوّر على نسخة أحدث من المكتبة قبل أي فلاج.",
            mistakes: "في مشروع حقيقي كان الـ Dockerfile فيه npm ci --legacy-peer-deps، فالـ build بيعدّي وتعارض النسخ متخبّي لحد ما يوقع وقت التشغيل. وغلطة تانية: الفلاج على جهازك بس، فالـ lock يطلع مختلف و npm ci في الـ CI يفشل."
          },
          lines: [
            "التسطيب اللي بيطلّع ERESOLVE: اقرا Found و Could not resolve.",
            "مين جايب react وبأنهي نسخة.",
            "المكتبة دي بتدعم أنهي نسخ من react.",
            "الحل الصح غالبًا: نسخة أحدث بتدعم اللي عندك.",
            "تجاهل الـ peers (بيخبي المشكلة).",
            "لو مضطر: خليه إعداد للمشروع كله عشان الـ CI يمشي زي جهازك."
          ],
          sol: R`مع [[react@19]] وبعدين [[react-day-picker@8.9.1]]:

[[npm error code ERESOLVE]] و [[ERESOLVE unable to resolve dependency tree]] و [[Found: react@19.3.0]] ([[react@"^19.3.0" from the root project]]) و [[Could not resolve dependency:]] و [[peer react@"^16.8.0 || ^17.0.0 || ^18.0.0" from react-day-picker@8.9.1]].

القراية: الـ Found هو اللي عندك، والـ peer هو اللي المكتبة بتقول إنها بتشتغل معاه. المكتبة دي ما اتجربتش على React 19. الحل الأول تشوف نسخة أحدث: [[npm view react-day-picker@8 peerDependencies]] بيوريك إن آخر 8.x ضافت [[^19.0.0]]، فـ [[npm i react-day-picker@8]] نجح من غير أي flag.

[[--legacy-peer-deps]] بيسطّب وخلاص، والمكتبة ممكن تشتغل وممكن تقع وقت التشغيل. استخدمه لما تتأكد إن مفيش نسخة متوافقة وجرّبت بنفسك، مش كأول حل.`
        },
        {
          cmd: "pnpm و yarn",
          title: "بدائل npm و corepack",
          desc: "نفس الفكرة بأوامر شبه متطابقة. pnpm أسرع وبيوفر مساحة (بيشارك المكتبات بين المشاريع). [[corepack]] بيدير نسخهم، وبييجي مع Node لحد 24 بس، ومن Node 25 بتسطّبه بـ [[npm i -g corepack]]. والمشروع بيحدد مديره في حقل [[packageManager]].",
          example: R`corepack enable
pnpm install
pnpm add express
pnpm dlx create-next-app
npm pkg set packageManager=pnpm@9.12.0`,
          try: "لو المشروع فيه pnpm-lock.yaml استخدم pnpm، ولو yarn.lock استخدم yarn. متخلطش، كل واحد ليه lock مختلف.",
          deep: {
            why: "مشروع هتشتغل عليه بيستخدم pnpm، أو عايز تسطيب أسرع ومساحة أقل. لازم تعرف الفرق وإزاي متخلطش.",
            how: R`التلاتة بيقروا نفس package.json. الفرق في التسطيب والـ lock: npm بيعمل package-lock.json، و yarn بيعمل yarn.lock، و pnpm بيعمل pnpm-lock.yaml. المشروع بيستخدم واحد بس، وتعرفه من ملف الـ lock الموجود.

pnpm بيحفظ كل نسخة من كل مكتبة مرة واحدة على الجهاز، و node_modules بتاع كل مشروع بيشاور عليها بلينكات. فمشروع جديد بيتسطّب في ثواني وبياخد مساحة قليلة جدًا. وكمان صارم: مكتبة مش في package.json مش هتقدر تستوردها حتى لو موجودة كفرعية.

[[corepack]] (جاي مع Node لحد 24، ومن 25 بيتسطّب بـ npm i -g corepack) بيسطّب ويشغّل النسخة الصح من pnpm أو yarn حسب حقل [[packageManager]] في package.json. فمش محتاج تسطّبهم عام.

الأوامر شبه بعض: [[pnpm add]] بدل install باسم، و [[pnpm dlx]] بدل npx، والباقي نفسه.`,
            when: "pnpm لمشاريعك الجديدة لو عايز سرعة. والمشاريع الموجودة: اللي فيها.",
            mistakes: R`npm install في مشروع pnpm: بيعمل package-lock جنب pnpm-lock وبيبوّظ node_modules. شوف الـ lock الأول.

في مشروع حقيقي كان الـ CI فيه [[pnpm/action-setup]] بـ [[version: 10]]، وفي نفس الوقت [[packageManager]] في package.json بنسخة تانية، والاتنين لما يختلفوا الـ action بيفشل. سيب النسخة في packageManager بس، والـ action بيقراها لوحده. وفي مشروع تاني كان [[corepack enable]] في الـ CI من غير packageManager أصلًا، فكل run بياخد أي نسخة pnpm متاحة.`
          },
          lines: [
            "فعّل corepack اللي بيدير pnpm و yarn.",
            "سطّب (زي npm install).",
            "ضيف مكتبة (زي npm install express).",
            "زي npx.",
            "ثبّت مدير الباكدجات ونسخته للمشروع."
          ],
          sol: R`الإجابة إنك تبص على ملف الـ lock قبل أي أمر:

[[package-lock.json]] يبقى [[npm ci]] أو [[npm install]]. [[pnpm-lock.yaml]] يبقى [[pnpm install]]. [[yarn.lock]] يبقى [[yarn]]. و [[bun.lock]] يبقى bun. وكمان حقل [["packageManager": "pnpm@9.12.0"]] في package.json بيقولك الأداة والنسخة، ومع [[corepack enable]] الأمر [[pnpm]] بيستخدم النسخة دي بالظبط.

لو غلطت وعملت [[npm install]] في مشروع pnpm: هيتعمل [[package-lock.json]] جديد جنب [[pnpm-lock.yaml]]، والنسخ ممكن تختلف عن اللي الفريق شغال بيها. امسح الملف الجديد ومتعملوش commit. ولو المشروع فيه [[workspace:*]] npm غالبًا هيقع بـ [[Unsupported URL Type "workspace:"]]، ودي علامة إنه pnpm.`
        },
        {
          cmd: "workspaces و link",
          title: "مشروع فيه أكتر من باكدج",
          desc: "monorepo: فولدر فيه api و web و shared. الـ workspaces بتخلي npm يسطّب الكل مرة واحدة ويربط shared بالباقي كلينك. و [[npm link]] لتجربة مكتبة بتطوّرها في مشروع تاني.",
          example: R`npm init -w packages/shared
npm install -w apps/api express
npm run build --workspaces
npm run dev -w apps/web
npm link ../my-lib`,
          try: R`اعمل مشروع فيه [[workspaces: ["apps/*", "packages/*"] ]] وشوف إن node_modules واحد في الجذر.`,
          deep: {
            why: "عندك API و web و كود مشترك بينهم (types، وvalidation). تنسخ المشترك في الاتنين؟ يتفرق. تنشره كباكدج؟ تقيل. الـ workspaces بيخليهم مشروع واحد.",
            how: R`في package.json الجذر: [[workspaces: ["apps/*", "packages/*"] ]]. كل فولدر جواهم مشروع بـ package.json بتاعه. [[npm install]] في الجذر بيسطّب الكل في node_modules واحد، وبيعمل لينك لكل workspace باسمه، فـ [[apps/api]] بيستورد [[@myapp/shared]] كأنها مكتبة، وأي تعديل فيها بيظهر فورًا.

[[-w]] (workspace) بيوجّه الأمر لمشروع فرعي: [[npm install -w apps/api express]] بيضيف express لـ api بس. [[--workspaces]] على الكل.

[[npm link]] لحالة تانية: مكتبة بتطوّرها في فولدر منفصل وعايز تجرّبها في مشروع. بيعمل لينك من node_modules للفولدر بتاعها.

للـ monorepos الكبيرة فيه أدوات فوق ده (Turborepo، Nx) بتشغّل الـ builds بالترتيب وبتعمل كاش.`,
            when: "لما يبقى عندك كود مشترك بين مشروعين. وقبل كده، مشروع واحد أبسط.",
            mistakes: "مشروع فرعي فيه node_modules خاص بيه بالغلط، فنسختين من react. وتنسى npm link بعد ما تخلص فيفضل المشروع بيشاور على فولدر محلي."
          },
          lines: [
            "اعمل workspace جديد في packages/shared.",
            "ضيف express لـ api بس.",
            "ابني كل الـ workspaces.",
            "شغّل dev في web بس.",
            "اربط مكتبة من فولدر جنبك للتجربة."
          ],
          sol: R`بعد [[npm pkg set workspaces]] و [[npm init -w packages/shared]] و [[npm init -w apps/api]] و [[npm install -w apps/api ms]]:

في الجذر [[node_modules]] واحد، وفيه [[ms]] نفسها، وفيه كمان [[api -> ../apps/api]] و [[shared -> ../packages/shared]] كـ symlinks. و [[apps/api]] فيها [[package.json]] بس، من غير node_modules. و [[package-lock.json]] واحد في الجذر.

والـ [[ms]] اتكتبت في [[apps/api/package.json]] مش في package.json بتاع الجذر. أي باكدج تقدر تعمل [[import]] لـ [[shared]] باسمها كأنها متسطبة من npm.

الغلط الشائع: تعمل [[npm install]] جوه [[apps/api]] نفسها، فيتعمل lock و node_modules تانيين جواها. التسطيب دايمًا من الجذر بـ [[-w]]. ولو apps/api عندها node_modules، غالبًا عشان نسخة مختلفة من مكتبة موجودة في الجذر، ودا عادي.`,
          solCode: R`npm init -y
npm pkg set "workspaces[0]=apps/*" "workspaces[1]=packages/*"
npm init -y -w packages/shared
npm init -y -w apps/api
npm install -w apps/api ms
ls -la node_modules | grep -E "api|shared|ms"`
        },
        {
          cmd: ".npmrc",
          title: "إعدادات npm و registries خاصة",
          desc: "ملف إعدادات npm: في المشروع أو في [[~/.npmrc]]. فيه الـ registry، والتوكن للباكدجات الخاصة (GitHub Packages)، وإعدادات زي [[save-exact]] اللي بتخلي التسطيب بنسخ ثابتة من غير ^.",
          example: R`npm config list
npm config set save-exact true
npm config get registry
echo "//npm.pkg.github.com/:_authToken=TOKEN" >> ~/.npmrc
echo "@myorg:registry=https://npm.pkg.github.com" >> .npmrc`,
          try: "فعّل [[save-exact]] وسطّب مكتبة وشوف النسخة اتكتبت من غير ^.",
          deep: {
            why: "محتاج تغيّر سلوك npm: نسخ ثابتة، أو registry خاص للشركة، أو توكن لباكدجات خاصة على GitHub Packages.",
            how: R`npm بيقرا الإعدادات من ٣ أماكن بالترتيب: [[.npmrc]] في المشروع، وبعدين [[~/.npmrc]] بتاعك، وبعدين الافتراضي. [[config list]] بيوريك النتيجة، و [[config set]] بيكتب في ملفك.

[[save-exact=true]]: التسطيب يكتب [[4.18.2]] بدل [[^4.18.2]]. ناس كتير بتفضّله عشان مفيش مفاجآت.

الباكدجات الخاصة: [[@myorg:registry=...]] في .npmrc بتاع المشروع بيقول «أي باكدج بتبدأ بـ @myorg هاتها من هنا». والتوكن في [[~/.npmrc]] بتاعك (مش في المشروع، عشان ميدخلش Git). وفي CI التوكن من secret.

[[engine-strict=true]] بيخلي npm يرفض التسطيب لو نسخة Node مش مطابقة لـ engines، بدل مجرد تحذير.`,
            when: "save-exact في مشاريعك. الـ registry والتوكن لما تستخدم باكدجات خاصة.",
            mistakes: "التوكن في .npmrc بتاع المشروع وبيترفع على Git. دايمًا في ~/.npmrc أو متغير بيئة."
          },
          lines: [
            "كل الإعدادات الفعّالة ومصدرها.",
            "النسخ تتكتب بالظبط من غير ^.",
            "الـ registry الحالي.",
            "توكن GitHub Packages في ملفك الشخصي (مش المشروع).",
            "باكدجات @myorg تيجي من GitHub، ده في المشروع."
          ],
          sol: R`[[npm config set save-exact true --location=project]] بيكتب [[save-exact=true]] في [[.npmrc]] جنب package.json. وبعدها [[npm i ms]] كتب [["ms": "2.1.3"]] من غير [[^]]، و [[npm config get save-exact]] بيطبع [[true]].

من غير [[--location=project]]، [[npm config set]] بيكتب في [[~/.npmrc]] بتاعك، فيأثر على كل مشاريعك وزمايلك مش هياخدوه. لو عايزها قاعدة للفريق، خليها في [[.npmrc]] المشروع واعملها commit.

الغلط الشائع: تفتكر إن save-exact بيثبّت المكتبات الموجودة؛ هو بيأثر على اللي هتسطبه بعد كده بس. والـ lock هو اللي فعلًا بيثبّت كل النسخ. ومتحطش توكن حقيقي في [[.npmrc]] اللي في الـ repo، استخدم [[$__{NPM_TOKEN}]] والقيمة من البيئة.`
        }
      ]
    },
    {
      t: "سكربتات التطوير",
      l: 2,
      n: "سيرفر بيعيد نفسه، و TypeScript من غير build، وكذا سيرفر في ترمنال واحد، وموقعك على الموبايل",
      items: [
        {
          cmd: "node --watch --env-file",
          title: "سيرفر تطوير بيعيد نفسه من غير مكتبات",
          desc: R`زمان سكربت dev كان محتاج nodemon عشان يعيد التشغيل و dotenv عشان يقرا .env. من Node 20 وأحدث الاتنين جوه Node: [[--watch]] و [[--env-file]]. ولمشروع TypeScript، [[tsx watch]] بيعمل نفس الحاجة لملفات .ts.

وفي الإنتاج مفيش watch: بتعمل build بـ tsc وتشغّل الـ JS، والمتغيرات جاية من البيئة مش من ملف.`,
          example: R`"scripts": {
  "dev": "node --watch --env-file=.env src/server.js",
  "dev:ts": "tsx watch src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",
  "db:seed": "node --env-file=.env prisma/seed.js"
}
# جوه container على ويندوز (أحداث الملفات مش بتوصل)
# nodemon --legacy-watch --watch src --ext js,json src/server.js`,
          try: "حوّل سكربت dev في مشروع بيستخدم nodemon و dotenv لـ [[node --watch --env-file=.env]]، وشيل المكتبتين من package.json، واتأكد إن التعديل بيعيد التشغيل.",
          flag: "script",
          deep: {
            why: "كل مكتبة زيادة في devDependencies نسخة تتحدّث وثغرة محتملة. الحاجتين دول بقوا في Node نفسه، فالسكربت أبسط والمشروع أخف.",
            how: R`[[--watch]] بيراقب الملف اللي شغّلته وكل ملف بيستورده، وأول ما واحد يتغير بيقفل العملية ويشغّلها تاني. و [[--watch-path=src]] لو عايز تراقب فولدر بعينه.

[[--env-file=.env]] بيقرا الملف قبل ما الكود يبدأ ويحط القيم في process.env. لو المتغير موجود في البيئة أصلًا، اللي في البيئة بيكسب. ولو الملف مش موجود، Node بيقف بخطأ، وده سبب إنك متحطوش في start بتاع الإنتاج.

[[tsx]] بيشغّل TypeScript مباشرة: بيشيل الأنواع بـ esbuild وبيشغّل الـ JS، من غير ما يفحص الأنواع خالص (الفحص خطوة لوحدها في الـ CI). و [[tsx watch]] زي node --watch. في الإنتاج: [[tsc]] بيطلّع dist، و [[node dist/index.js]] بيشغّله، أسرع في البداية ومن غير devDependencies.

nodemon لسه ليه مكان: جوه Docker على ويندوز أو WSL مع bind mount، أحداث تغيير الملفات مش بتوصل للـ container، فـ [[--legacy-watch]] (أو [[-L]]) بيخليه يفحص الملفات كل شوية (polling). و [[--ext]] بيحدد الامتدادات.`,
            when: "أي مشروع Node جديد: node --watch للـ JS، و tsx watch للـ TypeScript. و nodemon -L لو الـ watch مش بيحس بالتعديل جوه container.",
            mistakes: "‏--env-file في سكربت start على السيرفر، فالتطبيق بيقع لو .env مش موجود أو بياخد قيم قديمة منه. و tsx في الإنتاج بدل build، فالتشغيل أبطأ ومحتاج devDependencies على السيرفر."
          },
          lines: [
            "بداية السكربتات في package.json.",
            "JS: أعد التشغيل مع كل تعديل واقرا .env، من غير nodemon ولا dotenv.",
            "TypeScript: نفس الفكرة بـ tsx.",
            "الإنتاج: حوّل TS لـ JS في dist.",
            "وشغّل الناتج، والمتغيرات من بيئة السيرفر.",
            "سكربت لمرة واحدة بيقرا .env برضه.",
            "قفلة."
          ],
          sol: R`الحل: [["dev": "node --watch --env-file=.env src/server.js"]]، و [[npm uninstall nodemon dotenv]]، وتشيل [[import "dotenv/config"]] أو [[require("dotenv").config()]] من أول الكود.

لما تشغّل [[npm run dev]] وتعدّل ملف، هتشوف في الترمنال [[Restarting 'src/server.js']] والسيرفر يقوم تاني. و [[--watch]] بيراقب الملفات اللي السيرفر عملها import بس، فتعديل في README مش هيعمل restart.

لو شلت dotenv والـ متغيرات بقت [[undefined]]: نسيت [[--env-file]] في سكربت تاني زي [[db:seed]] أو [[start]]. وخلي بالك إن [[--watch]] مش بيراقب [[.env]] نفسه في كل النسخ؛ لو غيّرت .env اعمل restart بإيدك أو ضيف [[--watch-path]]. ولو السطر قال [[bad option]]، نسخة Node قديمة (محتاج 20.6+ للـ env-file و 22 عشان الاتنين يبقوا stable).`
        },
        {
          cmd: "npx tsx",
          title: "شغّل ملف TypeScript على طول",
          desc: R`سكربت إداري بـ TypeScript (فحص القاعدة، عمل أدمن، تنضيف داتا) مش محتاج build. [[npx tsx scripts/x.ts]] بيشغّله مباشرة وبيستخدم نفس الأنواع و Prisma client اللي في المشروع.

ولو هتشغّله على السيرفر جوه container، اتأكد إن tsx والسكربت نفسه موجودين في الـ image أصلًا.`,
          example: R`npx tsx scripts/check-db.ts
npx tsx scripts/create-admin.ts --email you@example.com
# في package.json: "db:validate": "tsx scripts/validate-schema.ts"
npm run db:validate
docker compose exec app ls scripts node_modules/.bin/tsx
docker compose exec app npx tsx scripts/run-fix.ts`,
          try: "اكتب scripts/hello.ts فيه type وسطر console.log، وشغّله بـ [[npx tsx]]، وبعدين حط فيه خطأ أنواع واضح ولاحظ إنه برضه بيشتغل.",
          deep: {
            why: "مشروعك TypeScript، والسكربتات الصغيرة عايزة تستورد من الكود نفسه. تكتبها JS تخسر الأنواع، وتعمل لها build كل مرة تعب. tsx بيشغّلها زي ما هي.",
            how: R`tsx بيحوّل الـ TS لـ JS في الذاكرة بـ esbuild ويشغّله بـ Node، وبيفهم ESM و CommonJS والـ paths. مش بيفحص الأنواع، فالسكربت ممكن يشتغل وفيه خطأ أنواع، والفحص شغل tsc.

[[npx tsx]] بيستخدم النسخة اللي في devDependencies. لو مش متسطّبة، npx هيسألك ينزّلها، ومن غير ترمنال تفاعلي (CI أو سكربت) مبيسألش أصلًا: بيفترض yes وينزّل آخر نسخة من النت من غير ما تاخد بالك، أو يفشل لو مفيش نت. عشان كده حطها في devDependencies، والأحسن سكربت في package.json زي [[db:validate]] عشان الفريق كله يشغّله بنفس الشكل.

جوه container الإنتاج: الـ image غالبًا متبنية من غير devDependencies، أو standalone في Next، فلا tsx موجود ولا فولدر scripts. أول أمر docker في المثال بيتأكد قبل ما تعتمد عليه. الحلول: stage منفصلة للأدوات، أو تكتب السكربتات الحرجة .mjs عادية.

[[ts-node]] البديل القديم: أبطأ لأنه بيفحص الأنواع، ومشاكله مع ESM كتير.`,
            when: "سكربتات seed وفحص القاعدة والصيانة في مشروع TypeScript. مش لتشغيل السيرفر في الإنتاج.",
            mistakes: "تفترض إن السكربت شغال عشان tsx مطلعش خطأ، وهو فيه خطأ أنواع. وتكتب في دليل التشغيل «docker compose exec app npx tsx ...» والـ image مفيهاش tsx ولا السكربت، فالأمر بيفشل يوم ما تحتاجه."
          },
          lines: [
            "شغّل سكربت TS مباشرة.",
            "ومرّر له arguments عادي.",
            "نفس الحاجة من سكربت متسجّل في package.json.",
            "قبل ما تعتمد عليه في الـ container: tsx والسكربت موجودين؟",
            "شغّل السكربت جوه container التطبيق."
          ],
          sol: R`[[scripts/hello.ts]] فيه [[type User = { name: string; age: number }]] وسطر بيطبع. [[npx tsx scripts/hello.ts]] بيطبع [[hello Sara]].

بعد ما تحط [[age: "28"]] (نص بدل رقم): [[tsx]] برضه بيشتغل ويطبع [[hello Sara string]] و exit 0. tsx بيشيل الأنواع ويشغّل، مش بيفحصها. نفس الملف مع [[npx tsc --noEmit --strict scripts/hello.ts]] بيقول [[error TS2322: Type 'string' is not assignable to type 'number'.]]

الدرس: tsx للتشغيل السريع، و [[tsc --noEmit]] في CI أو قبل الـ commit للفحص. والغلط الشائع إنك تعتمد على إن «السكربت اشتغل» كدليل إن الأنواع صح.`,
          solCode: R`// scripts/hello.ts
type User = { name: string; age: number };
const u: User = { name: "Sara", age: "28" };
console.log("hello", u.name, typeof u.age);

// الترمنال
npx tsx scripts/hello.ts
npx tsc --noEmit --strict scripts/hello.ts`
        },
        {
          cmd: "concurrently و wait-on",
          title: "كذا سيرفر في ترمنال واحد وبالترتيب",
          desc: R`الباك إند والفرونت في مشروع واحد، ومش عايز تفتح ترمنالين. [[concurrently]] بيشغّل كذا أمر مع بعض بألوان وأسامي، و [[-k]] بيقفلهم كلهم لو واحد وقف. و [[wait-on]] بيستنى بورت أو URL يفتح قبل ما يشغّل الأمر اللي بعده.

و [[cross-env]] بيحط متغير بيئة بطريقة شغالة على ويندوز ولينكس.`,
          example: R`"scripts": {
  "dev": "concurrently -k -n api,web -c blue,green \"npm:dev:api\" \"npm:dev:web\"",
  "dev:api": "node --watch --env-file=.env api/server.js",
  "dev:web": "wait-on tcp:127.0.0.1:4000 && cross-env VITE_API_URL=http://localhost:4000 vite --strictPort"
}`,
          try: "سطّب [[npm i -D concurrently wait-on cross-env]]، وحط السكربتات دي، وشغّل [[npm run dev]]، وبعدين Ctrl+C مرة واحدة واتأكد إن البورتين اتقفلوا.",
          flag: "script",
          deep: {
            why: "من غير الأدوات دي: ترمنال للـ API وترمنال للفرونت، والفرونت بيقوم قبل الـ API فأول طلبات بتفشل، ولما تقفل واحد التاني بيفضل ماسك البورت.",
            how: R`[[concurrently]] بيشغّل كل أمر في عملية لوحده وبيجمع الخرج في ترمنال واحد، وقبل كل سطر اسم العملية ([[-n]]) بلون ([[-c]]). و [[npm:dev:api]] اختصار لـ [[npm run dev:api]]، و [[npm:dev:*]] بيشغّل كل السكربتات اللي بتبدأ بـ dev:.

[[-k]] (kill-others): أول ما عملية تخرج، الباقي يتقفل. من غيره لو الـ API وقع بخطأ، الفرونت يفضل شغال وانت فاكر كل حاجة تمام.

[[wait-on]] بيفضل يحاول لحد ما المورد يبقى جاهز: [[tcp:127.0.0.1:4000]] بورت مفتوح، [[http://localhost:4000/health]] رد 2xx، أو ملف اتعمل. وبعدين [[&&]] بتشغّل اللي بعده.

في مشروع حقيقي لتطبيق Electron كان نفس النمط: vite و [[wait-on tcp:5199 && electron .]]، عشان نافذة Electron متفتحش على صفحة فاضية قبل ما Vite يقوم.

[[cross-env]]: سطر [[VITE_API_URL=... vite]] شغال في bash بس، وسكربتات npm على ويندوز بتشتغل بـ cmd. cross-env بيخليها تشتغل في الاتنين.`,
            when: "مشروع فيه أكتر من عملية وقت التطوير: API وفرونت، أو Vite و Electron، أو سيرفر و worker.",
            mistakes: R`[[wait-on tcp:localhost:4000]] وسيرفرك سامع على 127.0.0.1: من Node 17 localhost ممكن يتحل لـ ::1 (IPv6)، فـ wait-on يستنى للأبد. اكتب 127.0.0.1 صريح. وغلطة تانية: Vite لقى البورت مشغول فقام على بورت تاني، والـ wait-on لسه مستني البورت القديم، عشان كده [[--strictPort]] بيخليه يفشل بدل ما يغيّر.`
          },
          lines: [
            "بداية السكربتات.",
            "شغّل الاتنين مع بعض بأسامي وألوان، و -k يقفلهم سوا.",
            "الـ API بيعيد نفسه مع كل تعديل.",
            "استنى الـ API يفتح، وبعدين شغّل Vite بمتغير شغال على أي نظام، ومن غير ما يغيّر البورت.",
            "قفلة."
          ],
          sol: R`[[npm run dev]] بيطبع سطور كل واحد بلونه واسمه: [[[api] api on 4000]] وبعدين [[[web]]] بيستنى لحد ما البورت يفتح، ويقوم Vite بـ [[VITE_API_URL]] مظبوط.

Ctrl+C مرة واحدة: [[[api] npm run dev:api exited with code SIGINT]] و [[--> Sending SIGTERM to other processes..]] و [[[web] npm run dev:web exited with code SIGINT]]. وبعدها [[lsof -i :4000 -i :5173]] مش بيطبع حاجة: البورتين اتقفلوا.

لو بعد Ctrl+C لقيت بورت لسه مفتوح، يبقى [[-k]] ناقصة، وبعدها [[npm run dev]] التاني هيقع بـ EADDRINUSE. ولو [[web]] فضل مستني للأبد، اتأكد إن الـ api فعلًا على [[127.0.0.1:4000]] (لو بيسمع على IPv6 بس أو بورت تاني [[wait-on]] مش هيلاقيه). و [[--strictPort]] بيخلي Vite يقع لو 5173 مشغول بدل ما يفتح على 5174 من غير ما تاخد بالك.`
        },
        {
          cmd: "--host و Network URL",
          title: "افتح موقعك من الموبايل وهو لسه على جهازك",
          desc: R`سيرفر التطوير غالبًا بيسمع على localhost بس، فالموبايل مش شايفه. [[--host]] في Vite (أو [[-H 0.0.0.0]] في Next) بيخليه يسمع على كل الكروت، ويطبع سطر [[Network: http://192.168.1.x:5173]]. افتحه من موبايل على نفس الواي فاي.

ولو الصفحة مش بتفتح: الفايروول على جهازك غالبًا هو اللي مانع.`,
          example: R`npm run dev -- --host
npm run dev -- -H 0.0.0.0
ipconfig
hostname -I
# ويندوز (PowerShell أدمن): افتح البورت للشبكة الخاصة بس
New-NetFirewallRule -DisplayName "dev 5173" -Direction Inbound -Protocol TCP -LocalPort 5173 -Profile Private -Action Allow`,
          try: "شغّل مشروع Vite بـ [[--host]]، وافتح رابط Network من موبايلك، وعدّل كلمة في الصفحة وشوف الموبايل بيتحدّث لوحده.",
          deep: {
            why: "الموقع شكله تمام في DevTools بمقاس موبايل، وعلى الموبايل الحقيقي الكيبورد بيغطي الفورم، واللمس مختلف، والخط أصغر. التجربة على جهاز حقيقي قبل الرفع بتوفّر كتير.",
            how: R`الـ [[--]] بتعدّي الفلاج للأداة نفسها مش لـ npm. Vite افتراضيًا على localhost بس، و [[--host]] بيخليه 0.0.0.0 (تقدر تحطها في vite.config: [[server.host: true]]). Next dev بيطبع Network لوحده غالبًا، و [[-H 0.0.0.0]] بيضمنها. ونفس الفلاج ده لازم جوه Docker، وإلا البورت المنشور مش هيوصل للسيرفر (شوف درس 127.0.0.1 و 0.0.0.0 في bash).

عنوان جهازك على الشبكة: [[ipconfig]] على ويندوز (IPv4 Address)، و [[hostname -I]] على لينكس. الاتنين لازم على نفس الشبكة.

ويندوز بيمنع الاتصالات الداخلة افتراضيًا، خصوصًا لو الشبكة متسجّلة Public. القاعدة في المثال بتفتح البورت على الشبكات الخاصة بس، فمش هيتفتح وانت على واي فاي كافيه.

Next الجديد ممكن يحذّر أو يمنع طلبات التطوير الجاية من origin تاني (زي IP جهازك من الموبايل)، والحل تضيفه في [[allowedDevOrigins]] في next.config.`,
            when: "قبل ما تسلّم أي صفحة للموبايل. ولما تورّي شغلك لحد جنبك من غير deploy.",
            mistakes: R`الفرونت بيكلّم [[http://localhost:4000]] للـ API: على الموبايل localhost هو الموبايل نفسه، فالصفحة تفتح والداتا لأ. استخدم proxy في Vite أو مسار نسبي. وميزات زي الكاميرا والموقع محتاجة secure context: localhost بيتحسب آمن، إنما http على IP لأ، فمحتاج tunnel بـ HTTPS. وواي فاي الضيوف بيعزل الأجهزة عن بعض، فمفيش حاجة هتوصل مهما عملت.`
          },
          lines: [
            "Vite: اسمع على كل الكروت واطبع رابط Network.",
            "Next: نفس الحاجة.",
            "عنوان جهازك على الشبكة (ويندوز).",
            "عنوان جهازك على الشبكة (لينكس).",
            "اسمح بالبورت في فايروول ويندوز على الشبكة الخاصة بس."
          ],
          sol: R`مع [[npm run dev -- --host]] Vite بيطبع سطرين: [[➜ Local: http://localhost:5173/]] و [[➜ Network: http://192.168.1.15:5173/]]. الموبايل على نفس الواي فاي بيفتح رابط Network، ولما تحفظ تعديل في الكود الصفحة على الموبايل بتتحدث لوحدها (HMR).

لو الموبايل مش بيفتح: يا مش على نفس الشبكة (أو شبكة ضيوف معزولة)، يا فايروول ويندوز بيقفل البورت (ودا سطر [[New-NetFirewallRule]] في المثال، والشبكة لازم تكون Private مش Public). ولو بتشتغل في WSL، الـ IP اللي Vite طلّعه هو IP الـ WSL الداخلي؛ استخدم IP ويندوز من [[ipconfig]] مع [[networkingMode=mirrored]]، أو port forwarding.

ولو الصفحة فتحت بس الـ API calls فشلت، يبقى الكود بيكلم [[localhost:4000]]، والـ localhost على الموبايل هو الموبايل نفسه. استخدم الـ proxy بتاع Vite أو IP الجهاز.`
        }
      ]
    },
    {
      t: "monorepo بـ pnpm",
      l: 2,
      n: "كذا تطبيق وباكدج مشتركة في ريبو واحد: الربط، والفلترة، والتشغيل مع بعض، والـ builds المقفولة",
      items: [
        {
          cmd: "pnpm-workspace.yaml و workspace:*",
          title: "باكدج مشتركة جوه نفس الريبو",
          desc: R`[[pnpm-workspace.yaml]] بيقول أنهي فولدرات باكدجات. وأي تطبيق عايز الكود المشترك بيكتب [[workspace:*]] بدل رقم نسخة، فـ pnpm بيربطه لينك للفولدر المحلي بدل ما يدوّر على npm.

والباكدج الداخلية ممكن تصدّر ملفات .ts مباشرة من غير build، والتطبيق اللي بيستوردها (Vite أو Next أو tsx) هو اللي بيترجمها.`,
          example: R`# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"

# apps/web/package.json
"dependencies": {
  "@myapp/shared": "workspace:*"
}

# packages/shared/package.json (من غير build)
"name": "@myapp/shared",
"exports": { ".": "./src/index.ts", "./types": "./src/types.ts" }`,
          try: "اعمل ريبو فيه apps/web و packages/shared، واربطهم بـ workspace:*، وشغّل [[pnpm install]]، وبعدين [[ls -l apps/web/node_modules/@myapp]] وشوف اللينك.",
          flag: "script",
          deep: {
            why: "عندك لعبة وسيرفر ولوحة أدمن، والتلاتة بيستخدموا نفس الأنواع ونفس الأسئلة. نسخ الكود بيخليه يتفرق، ونشره على npm تقيل. الـ workspace بيخليه مكان واحد وأي تعديل يبان في الكل فورًا.",
            how: R`[[pnpm install]] في الجذر بيقرا pnpm-workspace.yaml، ويسطّب لكل باكدج، ويربط اللي مكتوب لها [[workspace:*]] بلينك لفولدرها. [[*]] معناها «أي نسخة موجودة هنا». ولو الاسم مش موجود في الـ workspace، pnpm بيرفض بدل ما ينزّل باكدج بنفس الاسم من npm، وده حماية.

ولو نشرت باكدج على npm، pnpm بيبدّل [[workspace:*]] برقم النسخة الحقيقي وقت النشر.

[[exports]] بيحدد إيه اللي مسموح يتستورد من الباكدج. هنا بيشاور على src/*.ts مباشرة: مفيش dist ولا build step. ده شغال لأن Vite و Next و tsx بيترجموا TS، إنما تطبيق Node عادي بيشغّل JS بس هيحتاج build للباكدج (أو tsx). وفي Next القديم ممكن تحتاج [[transpilePackages]].`,
            when: "أول ما يبقى عندك تطبيقين أو أكتر بيشاركوا كود في نفس الريبو.",
            mistakes: R`تستورد [[@myapp/shared/src/utils]] مباشرة وهو مش في exports، فيطلع [[ERR_PACKAGE_PATH_NOT_EXPORTED]]. وتضيف [[workspace:*]] في package.json وتنسى pnpm install فالتطبيق مش لاقي الباكدج.`
          },
          lines: [
            "قايمة الفولدرات اللي فيها باكدجات.",
            "كل فولدر جوه apps باكدج.",
            "وكل فولدر جوه packages.",
            "في التطبيق: المكتبات.",
            "الكود المشترك من الـ workspace مش من npm.",
            "قفلة.",
            "اسم الباكدج المشتركة، وده اللي بيتستورد بيه.",
            "المسموح يتستورد، ملفات TS مباشرة من غير build."
          ],
          sol: R`بعد [[pnpm install]]، [[ls -l apps/web/node_modules/@myapp]] بيطلّع:

[[shared -> ../../../../packages/shared]]. دا symlink، مش نسخة. أي تعديل في [[packages/shared/src]] بيظهر في web على طول من غير install تاني. و [[workspace:*]] في package.json معناها «الباكدج اللي في الـ workspace، أيًا كانت نسختها».

لو [[pnpm install]] قال [[ERR_PNPM_WORKSPACE_PKG_NOT_FOUND]] أو [[No matching version found for @myapp/shared]]: الاسم في [[dependencies]] مش مطابق للـ [[name]] في package.json بتاع shared، أو الفولدر مش داخل تحت [[packages:]] في pnpm-workspace.yaml. ولو web عمل import وقال [[Cannot find module '@myapp/shared']] رغم إن اللينك موجود، راجع [[exports]]: الـ path اللي بتعمله import لازم يكون متعرّف فيها.`,
          solCode: R`# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"

# packages/shared/package.json
{ "name": "@myapp/shared", "version": "1.0.0", "exports": { ".": "./src/index.ts" } }

# apps/web/package.json
{ "name": "@myapp/web", "version": "1.0.0", "dependencies": { "@myapp/shared": "workspace:*" } }`
        },
        {
          cmd: "pnpm --filter",
          title: "شغّل أمر في باكدج واحدة من الجذر",
          desc: R`[[--filter]] بيوجّه الأمر لباكدج معينة بالاسم أو بمسار أو بـ glob، من غير ما تعمل cd. وبيقبل إضافات: [[...]] بعد الاسم معناها «ومعاها اللي بتعتمد عليه»، و [["[origin/main]"]] معناها «اللي اتغير من main».`,
          example: R`pnpm --filter @myapp/server dev
pnpm --filter "./apps/*" build
pnpm --filter @myapp/web add zod
pnpm --filter "@myapp/web..." build
pnpm --filter "...[origin/main]" test`,
          try: "في ريبو فيه أكتر من باكدج، ضيف مكتبة لتطبيق واحد بـ [[--filter]] واتأكد إنها اتكتبت في package.json بتاعه بس.",
          deep: {
            why: "في monorepo فيه ٥ باكدجات، مش عايز تبني الكل عشان تجرّب واحد، ولا تفضل تعمل cd رايح جاي. والـ CI مش لازم يختبر كل حاجة لو التغيير في باكدج واحدة.",
            how: R`الفلتر بيختار باكدجات، والأمر اللي بعده بيتنفذ في كل واحدة منهم.

بالاسم: [[@myapp/server]] من حقل name. بالمسار: [[./apps/*]] كل الفولدرات جوه apps (حطه بين علامات تنصيص عشان الشيل ميفكّوش).

[[pnpm --filter X add zod]] بيضيف المكتبة لـ X بس. من غير الفلتر في الجذر، pnpm بيعترض لأن الجذر مش المكان الطبيعي للمكتبات.

[[web...]]: web وكل الباكدجات اللي هي معتمدة عليها، فالـ build يطلع بالترتيب الصح (shared الأول). و [[...web]] العكس: web وكل اللي معتمد عليها.

[["[origin/main]"]]: الباكدجات اللي ملفاتها اتغيرت من الـ commit ده. و [["...[origin/main]"]] بيضيف لهم كل اللي بيعتمد عليهم، ودي اللي تستخدمها في CI عشان تختبر اللي ممكن يتأثر بس.`,
            when: "كل يوم في monorepo: dev لتطبيق واحد، وإضافة مكتبة لتطبيق واحد، وCI أسرع.",
            mistakes: "تكتب الاسم غلط أو باسم الفولدر بدل name، فالفلتر مبيلاقيش حاجة ومبيعملش حاجة. اقرا الخرج: لو قال No projects matched، الفلتر غلط."
          },
          lines: [
            "شغّل dev في السيرفر بس، بالاسم.",
            "ابني كل التطبيقات اللي في apps، بالمسار.",
            "ضيف مكتبة لتطبيق web بس.",
            "ابني web ومعاها كل اللي هي معتمدة عليه.",
            "اختبر اللي اتغير من main واللي بيعتمد عليه."
          ],
          sol: R`[[pnpm --filter @myapp/web add ms]] بيطبع [[+1]] وفي الآخر [[Done]]. و [[apps/web/package.json]] بقى فيه [["ms": "^2.1.3"]] جنب [["@myapp/shared": "workspace:*"]]، بينما [[apps/server/package.json]] و package.json بتاع الجذر ما اتغيروش ([[grep ms]] عليهم مش بيلاقي حاجة).

الغلط الشائع: تعمل [[pnpm add ms]] في الجذر، و pnpm يرفض بـ [[ERR_PNPM_ADDING_TO_ROOT]] عشان يحميك؛ ولو فعلًا عايزها في الجذر (أداة زي prettier) استخدم [[-w]]. ولو الفلتر ما طابقش أي باكدج هيقول [[No projects matched the filters]]؛ الاسم لازم يطابق [[name]] في package.json مش اسم الفولدر، أو استخدم مسار زي [[--filter ./apps/web]].`
        },
        {
          cmd: "pnpm -r و --parallel",
          title: "نفس السكربت في كل الباكدجات",
          desc: R`[[pnpm -r build]] بيشغّل build في كل باكدج عندها السكربت ده، بالترتيب الصح حسب مين معتمد على مين، واللي معندهاش بتتخطّى. و [[--parallel]] بيشغّلهم كلهم في نفس اللحظة من غير ترتيب، ودي اللي لازم مع سكربتات dev اللي مبتخلصش.

و [[pnpm -r exec]] بينفّذ أمر عادي (مش سكربت) جوه فولدر كل باكدج.`,
          example: R`pnpm -r build
pnpm -r --stream test
pnpm --parallel --filter "./apps/*" dev
pnpm -r exec rm -rf dist .next
pnpm -r --workspace-concurrency=1 build`,
          try: "في الجذر اعمل سكربتات [[build: pnpm -r build]] و [[dev: pnpm --parallel --filter \"./apps/*\" dev]]، وشغّل الاتنين وقارن الخرج.",
          deep: {
            why: "سكربتات الجذر لازم متعرفش أسامي الباكدجات: [[pnpm build]] في الجذر ينادي [[pnpm -r build]]، والـ CI يشغّل pnpm build وخلاص. تضيف باكدج جديدة، تدخل لوحدها.",
            how: R`[[-r]] (recursive) بيرتّب الباكدجات topologically: لو web معتمدة على shared، shared تتبني الأول. وبيشغّل كذا واحدة مع بعض لو مش معتمدين على بعض (الحد الافتراضي 4، أو عدد الأنوية لو أقل، و [[--workspace-concurrency=1]] واحدة واحدة لو الجهاز ضعيف أو اللوج متلخبط).

[[--stream]] بيطبع الخرج أول بأول وقبله اسم الباكدج، بدل ما يجمّع خرج كل واحدة لما تخلص.

ليه [[--parallel]] مع dev؟ الترتيب معناه «استنى shared تخلص وبعدين ابدأ web». سكربت dev بتاع shared (watch) عمره ما بيخلص، فـ web مش هتبدأ أبدًا. [[--parallel]] بيتجاهل الترتيب والحد ويشغّل الكل فورًا.

[[exec]] بيشغّل أمر في فولدر كل باكدج. في مشروع حقيقي كان فيه سكربت clean: [[pnpm -r exec rm -rf node_modules dist .next && rm -rf node_modules]]، الجزء الأخير عشان الجذر نفسه، لأن [[-r]] مش بيشمل الجذر.`,
            when: "build و test و typecheck في الجذر بـ -r. و dev بـ --parallel. و exec للتنضيف.",
            mistakes: R`[[pnpm -r dev]] من غير --parallel، فأول باكدج فيها watch بتقفل الباقي. و [[rm -rf]] في سكربت بيتشغّل على ويندوز: سكربتات pnpm هناك بتشتغل بـ cmd اللي معندهوش rm، فاستخدم [[rimraf]] أو خليه في bash.`
          },
          lines: [
            "ابني الكل بترتيب الاعتماديات.",
            "اختبر الكل واطبع الخرج أول بأول باسم كل باكدج.",
            "شغّل dev لكل التطبيقات في نفس اللحظة (لازم مع watch).",
            "امسح ملفات الـ build جوه كل باكدج.",
            "ابني واحدة واحدة (جهاز ضعيف أو لوج أوضح)."
          ],
          sol: R`[[pnpm build]] (يعني [[pnpm -r build]]) بيطبع [[Scope: 3 of 4 workspace projects]] وبيشغّل الـ build بالترتيب الصح: [[packages/shared build]] قبل [[apps/web build]] لأن web معتمد عليه، وكل باكدج بتخلص بـ [[Done]]. اللي ملوش علاقة ببعض ممكن يشتغل في نفس الوقت.

[[pnpm dev]] (يعني [[pnpm --parallel --filter "./apps/*" dev]]) بيطبع [[Scope: 2 of 4]] وبيشغّل web و server في نفس الوقت، والسطور متداخلة: [[apps/web dev: ...]] و [[apps/server dev: ...]] ورا بعض. دا اللي محتاجه لسيرفرات dev مش بتخلص أبدًا.

الفرق المهم: [[-r]] بيحترم ترتيب الاعتماديات وبيستنى، و [[--parallel]] بيتجاهل الترتيب وبيشغّل الكل. لو استخدمت [[-r dev]] مع سيرفرات مش بتخلص، باكدج معتمدة على shared ممكن متبدأش لأن shared dev مش بيخلص. والعكس: [[--parallel build]] ممكن يبني web قبل shared فيقع.`
        },
        {
          cmd: "pnpm approve-builds",
          title: "ليه prisma أو sharp ناقصين بعد التسطيب",
          desc: R`من pnpm 10، سكربتات [[postinstall]] بتاعة المكتبات مش بتتشغّل افتراضيًا، عشان مكتبة مخترقة متشغّلش كود على جهازك وقت التسطيب. المكتبات اللي فعلًا محتاجة build (prisma و sharp و esbuild و bcrypt) لازم توافق عليها صراحة. في pnpm 10 التسطيب بيعدّي بتحذير والـ binary بيبقى ناقص، ومن pnpm 11 التسطيب نفسه بيفشل بـ [[ERR_PNPM_IGNORED_BUILDS]] لحد ما تقرر.

[[pnpm approve-builds]] بيسألك عليهم ويكتب الموافقة في [[pnpm-workspace.yaml]]، والملف ده بيدخل Git فالفريق والـ CI ياخدوا نفس القرار.`,
          example: R`pnpm install
pnpm ignored-builds
pnpm approve-builds
git diff pnpm-workspace.yaml
pnpm rebuild sharp`,
          try: "في مشروع pnpm جديد سطّب esbuild (أو sharp@0.34؛ من sharp 0.35 مبقاش فيه سكربت install فمش هتطلع رسالة)، واقرا الرسالة اللي بتطلع، وشغّل [[pnpm approve-builds]]، واقرا اللي اتكتب في pnpm-workspace.yaml.",
          deep: {
            why: "هجمات supply chain كتير بتشتغل من postinstall: مكتبة اتخترقت، وأول ما حد يسطّبها بتسرق التوكنات من جهازه. pnpm قفل الباب ده افتراضيًا، والتمن إنك تفتحه بإيدك للمكتبات اللي تثق فيها.",
            how: R`في التسطيب pnpm بيطبع أسامي المكتبات اللي سكربتاتها اتمنعت: تحذير في pnpm 10، وخطأ بيوقف التسطيب في pnpm 11 (الإعداد [[strictDepBuilds]] بقى true افتراضيًا). [[pnpm ignored-builds]] بيعرضهم تاني.

[[approve-builds]] بيعرض القايمة تختار منها، وبيكتب في pnpm-workspace.yaml حاجة زي: [[allowBuilds: { prisma: true, sharp: true }]] (من pnpm 10.26، وقبلها كان اسمها [[onlyBuiltDependencies]]، واتشالت خالص في pnpm 11). و [[false]] بتقول «متسألنيش تاني عنها، ومتشغّلهاش».

بعد الموافقة [[pnpm rebuild]] بيشغّل السكربتات اللي اتمنعت من غير ما يعيد التسطيب.

المكتبات دي بتحتاج build لأن فيها كود native أو بتنزّل binary للنظام بتاعك: sharp بينزّل libvips، و esbuild بيجيب الـ binary الصح، وبعض نسخ Prisma بتنزّل engines.`,
            when: "بعد أول pnpm install في مشروع جديد، أو لما مكتبة native تقع بخطأ إن ملف ناقص.",
            mistakes: "تتجاهل التحذير، والتطبيق يقع وقت التشغيل بخطأ إن sharp مش لاقي ملف، فتقعد تدوّر في الكود. وتوافق على كل حاجة في القايمة من غير ما تقرا الأسامي، فترجع لنفس الخطر اللي pnpm كان بيحميك منه."
          },
          lines: [
            "التسطيب بيطبع أسامي المكتبات اللي سكربتاتها اتمنعت (تحذير في pnpm 10، وفشل في 11).",
            "اعرضهم تاني.",
            "اختار اللي توافق عليه، ويتكتب في pnpm-workspace.yaml.",
            "شوف اللي اتكتب قبل ما تعمله commit.",
            "شغّل السكربت اللي كان اتمنع من غير إعادة تسطيب."
          ],
          sol: R`مع [[pnpm add esbuild]] في pnpm 10 هيطلع صندوق تحذير: [[Ignored build scripts: esbuild@0.28.2.]] و [[Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.]] و [[pnpm ignored-builds]] بيقول [[Automatically ignored builds during installation: esbuild]].

[[pnpm approve-builds]] بيعرض قايمة تختار منها بالمسافة وتأكد بـ Enter (أو [[--all]] من غير أسئلة). بعدها بيشغّل الـ postinstall ([[esbuild postinstall$ node install.js]] و [[Done]])، و [[git diff pnpm-workspace.yaml]] بيوريك:

[[allowBuilds:]] وتحتها [[esbuild: true]]. اعمل للملف commit عشان باقي الفريق والـ CI ياخدوا نفس القرار.

ملاحظة: sharp من 0.35 مبقاش عنده سكربت install (بيعتمد على binaries جاهزة كـ optional dependencies)، فتسطيبه مش هيطلّع التحذير ده. لو عايز تشوفه مع sharp نفسها جرّب [[sharp@0.34]].`
        }
      ]
    },
    {
      t: "Node runtime",
      l: 2,
      n: "المكتبات المبنية في Node: الملفات والمسارات، و process والإشارات، وتشغيل برامج تانية بأمان، و Buffer، و EventEmitter و worker_threads",
      items: [
        {
          cmd: "fs/promises",
          title: "تقرا وتكتب ملفات من غير ما تبوّظها",
          desc: R`[[node:fs/promises]] هي النسخة الـ async من fs: [[readFile]] و [[writeFile]] و [[appendFile]] و [[rename]]، وكلها بترجّع promise تعملها [[await]]. ولو كتبت [[utf8]] في القراية بترجع نص، من غيرها بترجع Buffer.

وحاجتين بيفرّقوا السكربت المحترم عن التاني: الملف اللي مش موجود بتتعامل معاه بـ [[err.code === "ENOENT"]] مش بتبلع أي error. والملف المهم (config أو داتا) بتكتبه في ملف مؤقت وبعدين [[rename]]، فلو العملية وقعت في النص الملف الأصلي ميبقاش نصه مكتوب.`,
          example: R`import { readFile, writeFile, rename, appendFile } from "node:fs/promises";

async function loadConfig(file) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return { port: 3000 };
    throw err;
  }
}

async function saveJson(file, data) {
  const tmp = file + ".tmp";
  await writeFile(tmp, JSON.stringify(data, null, 2) + "\n");
  await rename(tmp, file);
}

const config = await loadConfig("config.json");
config.runs = (config.runs ?? 0) + 1;
await saveJson("config.json", config);
await appendFile("app.log", $__btrun $__{config.runs}\n$__bt);
console.log(config);`,
          try: R`احفظه كـ [[config-demo.mjs]] في فولدر فاضي وشغّله ٣ مرات: [[runs]] لازم يزيد و [[app.log]] يطول سطر كل مرة. وبعدين اكتب [[{bad]] في config.json وشغّله تاني، وقرر: الأحسن يرجع للقيم الافتراضية ولا يقع؟ وعدّل [[loadConfig]] بحيث الرسالة تقول اسم الملف البايظ.`,
          flag: "script",
          deep: {
            why: R`أي سكربت أو سيرفر بيقرا config أو بيكتب نتيجة أو لوج. والغلطات هنا مش بتبان غير في أسوأ وقت: config بايظ السيرفر اشتغل بيه بالقيم الافتراضية من غير ما حد يعرف، أو ملف JSON فضل نصه مكتوب لأن الـ deploy قفل العملية وهي بتكتب.`,
            how: R`[[readFile(file, "utf8")]] بيقرا الملف كله في الذاكرة ويرجّعه نص. ده تمام لـ config أو JSON صغير. لملف كبير (لوج بالجيجا أو CSV ضخم) القراية دي بتملى الرام، والحل streams (في «تاب Backend بـ Node»).

الـ errors بتاعة fs فيها [[code]]: [[ENOENT]] مش موجود، و [[EACCES]] مفيش صلاحية، و [[EISDIR]] ده فولدر مش ملف. في المثال [[ENOENT]] بس هو اللي بيرجّع القيم الافتراضية، وأي حاجة تانية (زي JSON بايظ، اللي بيرمي [[SyntaxError]]) بتطلع لفوق وتوقف التشغيل، ودا اللي انت عايزه.

[[writeFile]] بيمسح الملف ويكتب من الأول، فلو العملية اتقفلت في النص الملف بيفضل ناقص. الحل: اكتب [[config.json.tmp]] وبعدين [[rename]] على الاسم الأصلي. الـ rename على نفس الـ filesystem بيحصل مرة واحدة (atomic)، فأي حد بيقرا الملف هيلاقي النسخة القديمة كاملة أو الجديدة كاملة.

[[appendFile]] بيضيف في آخر الملف وبيعمله لو مش موجود. و [[JSON.stringify(data, null, 2)]] بمسافتين عشان الملف يتقري ويبان كويس في git diff.

ولقراية JSON ثابت وقت التحميل فيه كمان [[import cfg from "./config.json" with { type: "json" }]]، شغال في Node 22 الحديث و 24 من غير تحذير. بس ده بيتقري مرة واحدة ومش بيشوف تعديلات بعد التشغيل.`,
            when: "config و seed data وملفات صغيرة بتقراها أو بتولّدها. الكتابة عن طريق ملف مؤقت لأي ملف لو اتبوّظ هتزعل عليه. و readFileSync مقبولة في أول سطور سكربت CLI، مش جوه route في سيرفر.",
            mistakes: R`[[catch {}]] فاضي أو بيرجّع default لأي error، فـ config بايظ أو صلاحيات غلط بتعدّي بصمت. وتنسى [[utf8]] فتطبع [[<Buffer 7b 22 ...>]] بدل النص. و [[readFileSync]] جوه request handler بيوقف السيرفر كله لحد ما القراية تخلص.

سؤال انترفيو: «إزاي تكتب ملف من غير ما يتبوّظ لو العملية وقعت؟»: ملف مؤقت على نفس الـ filesystem وبعدين rename، لأن الـ rename atomic والـ writeFile لأ.`
          },
          lines: [
            "دوال الملفات الـ async من مكتبة Node المبنية.",
            "دالة بتقرا الـ config.",
            "حاول...",
            "...اقرا الملف كنص وحوّله object.",
            "لو حصل error...",
            "...والملف مش موجود أصلًا: رجّع القيم الافتراضية.",
            "أي error تاني (JSON بايظ، صلاحيات): ارميه لفوق.",
            "قفلة الـ catch.",
            "قفلة الدالة.",
            "دالة بتكتب JSON بأمان.",
            "اسم ملف مؤقت جنب الأصلي.",
            "اكتب في المؤقت، منسّق بمسافتين وسطر جديد في الآخر.",
            "وبعدين rename على الأصلي في خطوة واحدة.",
            "قفلة.",
            "اقرا الـ config (أو القيم الافتراضية).",
            "عدّل فيه.",
            "واحفظه.",
            "ضيف سطر في آخر ملف اللوج (وبيعمله لو مش موجود).",
            "اطبع الـ config."
          ],
          sol: R`التشغيلات التلاتة الأولى بتطبع [[{ port: 3000, runs: 1 }]] وبعدين 2 وبعدين 3، و [[app.log]] فيه [[run 1]] و [[run 2]] و [[run 3]] كل واحد في سطر. أول مرة الملف مكانش موجود فرجع [[ENOENT]] والدالة رجّعت القيم الافتراضية.

مع [[{bad]] السكربت بيقع بـ [[SyntaxError: Expected property name or '}' in JSON at position 1]] و exit code 1. ودا الصح: config بايظ لازم يوقف التشغيل، مش يشتغل بالقيم الافتراضية وانت فاكر إن إعداداتك اتطبقت. المشكلة الوحيدة إن الرسالة مش بتقول أنهي ملف. الحل تحت بيفصل القراية عن الـ parse، ويرمي error جديد فيه اسم الملف ومعاه [[cause]] الأصلي.

الغلط الشائع: تحط [[JSON.parse]] جوه نفس الـ try وتعمل [[catch { return defaults }]] لأي حاجة، فالملف البايظ يعدّي بصمت.`,
          solCode: R`import { readFile } from "node:fs/promises";

async function loadConfig(file) {
  let text;
  try {
    text = await readFile(file, "utf8");
  } catch (err) {
    if (err.code === "ENOENT") return { port: 3000 };
    throw err;
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error($__bt$__{file} is not valid JSON: $__{err.message}$__bt, { cause: err });
  }
}

console.log(await loadConfig("config.json"));
// Error: config.json is not valid JSON: Expected property name or '}' in JSON at position 1 ...`
        },
        {
          cmd: "path و import.meta.dirname",
          title: "المسار نسبةً لمين؟",
          desc: R`[[readFile("config.json")]] بيدوّر على الملف في الفولدر اللي انت شغّلت منه node ([[process.cwd()]])، مش الفولدر اللي فيه السكربت. عشان كده السكربت يشتغل من جوه فولدره ويقع من أي مكان تاني.

الحل: ابني المسار من مكان الملف نفسه. في ESM ده [[import.meta.dirname]] (Node 20.11 وأحدث)، وفي CommonJS [[__dirname]]. و [[node:path]] بيركّب المسارات صح على لينكس وويندوز: [[join]] و [[resolve]] و [[basename]] و [[extname]].`,
          example: R`import path from "node:path";
import { readFile } from "node:fs/promises";

const configPath = path.join(import.meta.dirname, "config.json");
const config = JSON.parse(await readFile(configPath, "utf8"));
console.log(config.port);

console.log(path.basename("/srv/app/photo.final.png"));
console.log(path.extname("photo.final.png"));
console.log(path.parse("/srv/app/photo.png").name);
console.log(path.join("uploads", "../../etc/passwd"));

function safeJoin(root, userPath) {
  const full = path.resolve(root, userPath);
  if (!full.startsWith(root + path.sep)) throw new Error("path traversal: " + userPath);
  return full;
}
console.log(safeJoin("/srv/uploads", "a/b.png"));
console.log(safeJoin("/srv/uploads", "../../etc/passwd"));`,
          try: R`حط السكربت و [[config.json]] فيه [[{"port":4000}]] في فولدر، واعمل [[cd /]] وشغّله بالمسار الكامل: لازم يطبع 4000. بعدين بدّل [[configPath]] بـ [["config.json"]] بس وشغّله من نفس المكان. وجرّب [[safeJoin]] بـ [["/etc/passwd"]] و [["../uploads-old/x.png"]].`,
          flag: "script",
          deep: {
            why: R`«شغال لما أشغّله بإيدي ومش شغال من cron أو pm2 أو Docker»: غالبًا مسار نسبي، لأن الأدوات دي بتشغّل من فولدر تاني. والمسارات اللي فيها كلام جاي من اليوزر (اسم ملف مرفوع، أو [[?file=]] في URL) هي باب path traversal: اليوزر يبعت [[../../etc/passwd]] ويقرا أي ملف على السيرفر.`,
            how: R`أي مسار نسبي في fs بيتحسب من [[process.cwd()]]، يعني الفولدر اللي الـ process اتشغّلت منه. [[import.meta.dirname]] بيرجّع فولدر الملف الحالي و [[import.meta.filename]] الملف نفسه (الاتنين في Node 20.11 وأحدث). قبلهم كنت بتكتب [[path.dirname(fileURLToPath(import.meta.url))]]، وهتلاقيها كتير في كود قديم.

[[path.join]] بيلزق الأجزاء بالفاصل الصح ([[/]] على لينكس و [[\]] على ويندوز) وبيبسّط [[..]]. [[path.resolve]] بيطلّع مسار مطلق: بيبدأ من cwd، وأي جزء مطلق في النص بيبدأ من عنده من جديد، فـ [[path.resolve("/srv/uploads", "/etc/passwd")]] بترجع [[/etc/passwd]].

[[basename]] اسم الملف، و [[extname]] الامتداد الأخير بس ([[.png]] من [[photo.final.png]])، و [[path.parse]] بيرجّع object فيه [[dir]] و [[name]] و [[ext]].

[[safeJoin]] هو الحماية من path traversal: حوّل المسار لمطلق، واتأكد إنه لسه جوه الفولدر المسموح. والمقارنة مع [[root + path.sep]] مش [[root]] بس، عشان [[/srv/uploads-old]] بيبدأ بـ [[/srv/uploads]] كنص وهو فولدر تاني.`,
            when: "أي ملف السكربت بيقراه جنبه (config، templates، seed data): من import.meta.dirname. وأي مسار فيه جزء جاي من اليوزر: safeJoin أو ما يشبهه، أو الأحسن متستخدمش اسم اليوزر خالص وخزّن باسم انت اللي عامله (uuid).",
            mistakes: R`تركّب المسار بـ [[+ "/" +]] فيبوظ على ويندوز. وتفتكر [[path.join]] بتحمي من [[..]]: هي بتبسّطها بس، فـ [[path.join("uploads", "../../etc/passwd")]] بترجع [[../etc/passwd]] عادي. وتستخدم [[__dirname]] في ملف ESM فيطلع [[__dirname is not defined in ES module scope]].

سؤال انترفيو: «إيه هو path traversal وإزاي تمنعه؟»: resolve لمسار مطلق وتأكد إنه جوه الفولدر المسموح، أو متبنيش المسار من كلام اليوزر أصلًا.`
          },
          lines: [
            "مكتبة المسارات.",
            "قراية الملفات.",
            "مسار الـ config من فولدر الملف نفسه، مش من المكان اللي اتشغّل منه node.",
            "اقراه وحوّله object.",
            "اطبع البورت.",
            "اسم الملف من غير الفولدر: photo.final.png.",
            "الامتداد الأخير بس: .png.",
            "الاسم من غير امتداد: photo.",
            "join بيبسّط الـ .. بس مش بيحمي منها: الناتج ../etc/passwd.",
            "دالة بتركّب مسار من كلام اليوزر بأمان.",
            "حوّله لمسار مطلق.",
            "لو خرج بره الفولدر المسموح: ارفض.",
            "وإلا رجّعه.",
            "قفلة.",
            "مسموح: /srv/uploads/a/b.png.",
            "مرفوض: بيرمي path traversal."
          ],
          sol: R`من [[/]] السكربت بيطبع 4000، لأن [[configPath]] مبني من [[import.meta.dirname]]. لما تبدّله بـ [["config.json"]] بس بيقع بـ [[ENOENT: no such file or directory, open 'config.json']]، لأنه بيدوّر في [[/]] (الـ cwd). ودي بالظبط مشكلة cron و pm2.

[[safeJoin]] مع [["/etc/passwd"]] مرفوض: [[path.resolve]] بيبدأ من المسار المطلق ويطلّع [[/etc/passwd]]. و [["../uploads-old/x.png"]] مرفوض برضه، مع إن [[/srv/uploads-old/x.png]] بيبدأ بـ [[/srv/uploads]] كنص، لأننا بنقارن بـ [[/srv/uploads/]] بالفاصل. ولو شلت [[path.sep]] من المقارنة هتعدّي، ودا الغلط اللي عايزك تشوفه. أما [["a/../../uploads/c.png"]] فمسموح لأنه بعد التبسيط لسه جوه الفولدر.`,
          solCode: R`import path from "node:path";

function safeJoin(root, userPath) {
  const full = path.resolve(root, userPath);
  if (!full.startsWith(root + path.sep)) throw new Error("path traversal: " + userPath);
  return full;
}

for (const input of ["a/b.png", "../../etc/passwd", "/etc/passwd", "../uploads-old/x.png", "a/../../uploads/c.png"]) {
  try {
    console.log("ok  ", safeJoin("/srv/uploads", input));
  } catch (err) {
    console.log("deny", err.message);
  }
}
// ok   /srv/uploads/a/b.png
// deny path traversal: ../../etc/passwd
// deny path traversal: /etc/passwd
// deny path traversal: ../uploads-old/x.png
// ok   /srv/uploads/c.png`
        },
        {
          cmd: "الفولدرات: mkdir و readdir و rm",
          title: "فولدرات جوه فولدرات من غير أخطاء",
          desc: R`[[mkdir(dir, { recursive: true })]] بيعمل الفولدر واللي قبله، ومبيزعلش لو موجود. و [[readdir]] مع [[recursive: true]] و [[withFileTypes: true]] بيلف على الشجرة كلها ويقولك ده ملف ولا فولدر. و [[rm]] مع [[recursive]] و [[force]] زي [[rm -rf]]. و [[glob]] من [[node:fs/promises]] بيدوّر بنمط زي [[**/*.csv]] من غير مكتبة.`,
          example: R`import { mkdir, readdir, stat, rm, writeFile, glob } from "node:fs/promises";

await mkdir("out/reports/2026", { recursive: true });
await writeFile("out/reports/2026/jan.csv", "id,total\n1,50\n");
await writeFile("out/notes.txt", "hi");

const entries = await readdir("out", { recursive: true, withFileTypes: true });
for (const e of entries) {
  if (e.isFile()) console.log("file", e.parentPath + "/" + e.name);
}

const info = await stat("out/notes.txt");
console.log(info.size, info.mtime instanceof Date);

for await (const f of glob("out/**/*.csv")) console.log("glob", f);

await rm("out", { recursive: true, force: true });
await rm("out", { recursive: true, force: true });
console.log("clean");`,
          try: R`شغّله مرتين ورا بعض: المفروض ميطلعش أي error. بعدين شيل [[recursive: true]] من [[mkdir]] وشغّل، وشيل [[force: true]] من الـ [[rm]] التاني وشغّل، وسجّل الـ [[code]] بتاع كل error.`,
          flag: "script",
          deep: {
            why: R`سكربتات التصدير والـ build والـ backup كلها بتعمل فولدرات وتلف على ملفات وتمسح. والنسخة «البسيطة» بتقع في أول مرة الفولدر مش موجود، أو تاني مرة لما يبقى موجود. الـ options دي بتخلي السكربت يتشغّل أي عدد مرات بنفس النتيجة (idempotent).`,
            how: R`[[mkdir]] من غير [[recursive]] بيقع بـ [[ENOENT]] لو الأب مش موجود وبـ [[EEXIST]] لو الفولدر موجود. مع [[recursive: true]] الاتنين مش مشكلة، زي [[mkdir -p]].

[[readdir]] لوحده بيرجّع أسامي بس في مستوى واحد. [[withFileTypes: true]] بيرجّع objects فيها [[isFile()]] و [[isDirectory()]] و [[name]] و [[parentPath]] (الفولدر اللي فيه). و [[recursive: true]] (من Node 20) بينزل في كل الفولدرات. والترتيب مش مضمون، فلو محتاجه رتّب بنفسك.

[[stat]] بيرجّع الحجم بالبايت ([[size]]) ووقت آخر تعديل ([[mtime]] كـ Date) و [[isDirectory()]].

[[glob]] async iterator فبتلف عليه بـ [[for await]]. كان experimental في أول Node 22، وبقى stable في نسخ 22 الحديثة و 24، فلو لقيت تحذير ExperimentalWarning حدّث Node أو استخدم مكتبة [[fast-glob]].

[[rm]] مع [[recursive: true]] بيمسح الفولدر باللي فيه، و [[force: true]] بيخليه ميقعش لو مش موجود. نفس خطورة [[rm -rf]]: لو المسار جاي من متغير فاضي أو غلط، بيمسح اللي مكتوب.`,
            when: "مجلد output قبل ما تكتب فيه، وتنضيف build أو ملفات مؤقتة، ولف على ملفات لتحويلها أو ضغطها أو رفعها.",
            mistakes: R`[[existsSync]] قبل [[mkdir]] بدل [[recursive]]: كود أطول وبرضه ممكن يقع لو حاجة تانية عملت الفولدر في النص (race). و [[rm]] بمسار مبني من متغير ممكن يبقى فاضي. واستخدام [[fs.rmdir]] القديم بـ recursive، وده deprecated لصالح [[rm]].`
          },
          lines: [
            "دوال الفولدرات والملفات.",
            "اعمل الفولدر وكل اللي قبله، ومتزعلش لو موجود.",
            "ملف CSV جوه الشجرة.",
            "وملف في الأول.",
            "كل الملفات والفولدرات تحت out، ومعاها نوع كل واحد.",
            "لف عليهم...",
            "...والملفات بس اطبعها بمسارها.",
            "قفلة.",
            "معلومات الملف.",
            "الحجم بالبايت، وتاريخ آخر تعديل.",
            "دوّر بنمط glob، و for await لأنه بيرجّع النتايج واحدة واحدة.",
            "امسح الفولدر باللي فيه.",
            "تاني مرة مش موجود، و force بيخليها متقعش.",
            "اطبع."
          ],
          sol: R`الناتج في المرتين:

[[file out/notes.txt]] و [[file out/reports/2026/jan.csv]] (الترتيب ممكن يختلف)، وبعدين [[2 true]] (الملف ٢ بايت)، و [[glob out/reports/2026/jan.csv]]، و [[clean]].

من غير [[recursive]] في [[mkdir]]: [[ENOENT]] لأن [[out]] و [[out/reports]] مش موجودين. ولو عملتهم بإيدك وشغّلت تاني: [[EEXIST]]. ومن غير [[force]] في الـ rm التاني: [[ENOENT]] لأن الفولدر اتمسح في السطر اللي قبله.

الغلط الشائع إنك تحل ده بـ [[if (!existsSync(...))]] قبل كل عملية. الـ options أقصر وأصح.`,
          solCode: R`import { mkdir, rm } from "node:fs/promises";

for (const fn of [
  () => mkdir("x/y/z"),
  () => mkdir("x/y/z", { recursive: true }).then(() => mkdir("x/y/z")),
  () => rm("nope", { recursive: true }),
]) {
  await fn().catch((err) => console.log(err.code));
}
await rm("x", { recursive: true, force: true });
// ENOENT
// EEXIST
// ENOENT`
        },
        {
          cmd: "fs.watch",
          title: "اعمل حاجة لما ملف يتغير",
          desc: R`[[watch]] من [[node:fs/promises]] بيرجّع async iterator: كل ما ملف في الفولدر يتعمل أو يتعدل أو يتمسح بيدّيك event. [[recursive: true]] بيراقب الفولدرات اللي جوه (شغال على لينكس من Node 20)، و [[signal]] من AbortController بيوقف المراقبة.

الأحداث مش نضيفة: الحفظ الواحد ممكن يطلّع أكتر من event، والنوع [[rename]] أو [[change]] بس. فبتعمل debounce وتعيد الشغل مرة واحدة.`,
          example: R`import { watch } from "node:fs/promises";

const ac = new AbortController();
setTimeout(() => ac.abort(), 60_000);

try {
  for await (const event of watch("content", { recursive: true, signal: ac.signal })) {
    console.log(event.eventType, event.filename);
  }
} catch (err) {
  if (err.name !== "AbortError") throw err;
}
console.log("stopped watching");`,
          try: R`اعمل فولدر [[content]] وشغّل السكربت، ومن ترمنال تاني اعمل ملف، وعدّله، وغيّر اسمه بـ [[mv]]، واحفظ ملف من VS Code. عدّ الأحداث في كل حالة. وبعدين اكتب نسخة بتعمل [[rebuild()]] مرة واحدة بعد ما التعديلات تهدى ٢٠٠ms، وبتتجاهل أي ملف مش [[.md]].`,
          flag: "script",
          deep: {
            why: R`سكربت بيبني صفحات من ملفات Markdown، أو بيعيد توليد types لما schema تتغير، أو بيعالج أي ملف يتحط في فولدر inbox. محتاج تعرف إن ملف اتغير من غير ما تفحص الفولدر كل ثانية.`,
            how: R`[[watch]] بيستخدم نظام التنبيهات بتاع الـ OS (inotify على لينكس، FSEvents على ماك)، فمش بيستهلك CPU وهو مستني. كل event فيه [[eventType]] ([[rename]] لما ملف يتعمل أو يتمسح أو اسمه يتغير، و [[change]] لما محتواه يتغير) و [[filename]] نسبة للفولدر اللي بتراقبه، وممكن يبقى null في حالات نادرة.

المحررات بتحفظ بطرق مختلفة: بعضها يكتب ملف مؤقت ويعمل rename، فبتشوف rename بدل change، وأحيانًا event مرتين. عشان كده متعتمدش على نوع الحدث: اعتبر أي event «حاجة اتغيرت، راجع». والـ debounce (clearTimeout ثم setTimeout) بيجمع الأحداث اللي ورا بعض في شغلة واحدة.

[[signal]] بيخلي [[ac.abort()]] يوقف الـ loop برمي [[AbortError]]، واللي بنمسكه ونكمّل. من غير signal الـ loop مبيخلصش والعملية فاضلة شغالة، ودا المطلوب في watcher بيشتغل طول الوقت.

جوه Docker على ويندوز أو WSL مع bind mount الأحداث ممكن متوصلش خالص (نفس مشكلة nodemon في درس [[node --watch --env-file]]). ولمشروع كبير أو محتاج دقة على كل الأنظمة، مكتبة [[chokidar]] بتعالج الحالات دي. ولو عايز تعيد تشغيل السيرفر نفسه مع كل تعديل، ده [[node --watch]] مش fs.watch.`,
            when: "أدوات تطوير صغيرة: rebuild أو regenerate أو copy لما ملف يتغير. مش لمعالجة ملفات في الإنتاج بالآلاف (استخدم queue).",
            mistakes: R`تعمل الشغل التقيل مع كل event فيتنفّذ ٣ مرات لكل حفظ. وتعتمد على [[eventType === "change"]] فتفوّت المحررات اللي بتعمل rename. وتنسى إن [[filename]] نسبي للفولدر مش مسار كامل.`
          },
          lines: [
            "watch في النسخة الـ async.",
            "controller عشان نوقف المراقبة.",
            "وقّفها بعد دقيقة (في الحقيقة: مع SIGINT مثلًا).",
            "حاول...",
            "...لف على الأحداث في content وكل اللي جواه...",
            "...اطبع نوع الحدث واسم الملف.",
            "قفلة الـ loop.",
            "لما الـ abort يحصل بيرمي AbortError...",
            "...ده متوقع، وأي error تاني ارميه.",
            "قفلة.",
            "اطبع بعد ما المراقبة تقف."
          ],
          sol: R`لما تعمل ملف بـ [[echo a > content/a.md]] هتشوف [[rename a.md]] (وأحيانًا [[change a.md]] وراه). التعديل بـ [[>>]]: [[change a.md]]. و [[mv content/a.md content/b.md]]: [[rename a.md]] و [[rename b.md]]. والحفظ من VS Code ممكن يطلّع حدث أو اتنين حسب الإعدادات. العدد بيختلف بين الأنظمة والنسخ، ودي النقطة.

في الحل: أي حدث لملف [[.md]] بيلغي الـ timer القديم ويبدأ واحد جديد، فخمس تعديلات ورا بعض بتطلّع [[rebuild at ...]] مرة واحدة. والـ [[tmp.swp]] بيتجاهل. الغلط الشائع: تحط [[rebuild()]] جوه الـ loop مباشرة فيشتغل مع كل حدث.`,
          solCode: R`import { watch } from "node:fs/promises";

let timer;
function rebuild() {
  console.log("rebuild at", new Date().toISOString().slice(11, 19));
}

for await (const { filename } of watch("content", { recursive: true })) {
  if (!filename || !filename.endsWith(".md")) continue;
  clearTimeout(timer);
  timer = setTimeout(rebuild, 200);
}`
        },
        {
          cmd: "process.argv و parseArgs",
          title: "arguments سكربت الـ CLI من غير مكتبة",
          desc: R`[[process.argv]] array: أول عنصر مسار node، والتاني مسار السكربت، والباقي اللي اليوزر كتبه، وكله نصوص. للـ flags زي [[--out file]] و [[-v]]، [[parseArgs]] من [[node:util]] (stable من Node 20) بيعمل الشغل من غير commander.

وكمان في [[process]]: [[process.env]] متغيرات البيئة (درس [[.env و متغيرات البيئة]])، و [[process.cwd()]] الفولدر الحالي، و [[process.pid]] رقم العملية.`,
          example: R`import { parseArgs } from "node:util";

console.log(process.argv.slice(2));

const { values, positionals } = parseArgs({
  options: {
    out: { type: "string", short: "o", default: "report.csv" },
    verbose: { type: "boolean", short: "v" },
    limit: { type: "string" },
  },
  allowPositionals: true,
});

const limit = Number(values.limit ?? 100);
if (!Number.isInteger(limit)) {
  console.error("--limit must be a number");
  process.exit(2);
}
console.log({ values, positionals, limit });
console.log(process.env.NODE_ENV ?? "development", process.cwd(), process.pid > 0);`,
          try: R`احفظه كـ [[report.mjs]] وشغّله بـ [[node report.mjs orders.json -v --out=x.csv --limit 5]]، وبعدين بـ [[--limit abc]]، وبعدين بـ [[--colour]]، وبعدين [[node report.mjs a -- -v]]. واطبع [[echo $?]] بعد كل واحدة. وبعدين حوّل الـ error بتاع option غلط لرسالة usage واضحة بدل stack trace، وضيف [[-h]].`,
          flag: "script",
          deep: {
            why: R`سكربتات الـ seed والتصدير والـ migration محتاجة parameters. قراية [[process.argv[2]]] بالترتيب بتنفع لـ argument واحد، وبعدها بتبقى هشة: اليوزر يكتب الـ flags بترتيب تاني أو [[--out=x]] بدل [[--out x]] فالسكربت يفهم غلط.`,
            how: R`[[process.argv.slice(2)]] بيشيل مسار node والسكربت ويسيب اللي اليوزر كتبه. الشيل هو اللي بيقسّم على المسافات وبيشيل علامات التنصيص قبل ما Node يشوف حاجة.

[[parseArgs]] بياخد وصف الـ options: [[type]] يا [[string]] يا [[boolean]]، و [[short]] الحرف المختصر، و [[default]]. وبيفهم [[--out x.csv]] و [[--out=x.csv]] و [[-o x.csv]] و [[-v]]. و [[allowPositionals]] بيسمح بـ arguments من غير اسم (زي اسم الملف) وبترجع في [[positionals]]. وأي حاجة بعد [[--]] بتتعامل كـ positional حتى لو بتبدأ بـ [[-]].

من غير ما تقوله، [[strict]] شغال: option مش معروف أو string من غير قيمة بيرمي [[ERR_PARSE_ARGS_UNKNOWN_OPTION]] أو شبهه. ودا كويس (typo زي [[--colour]] مبيعدّيش بصمت)، بس امسكه واطبع usage.

القيم كلها نصوص: [[type: "number"]] مش موجود، فبتحوّل بـ [[Number()]] وتتحقق بنفسك. و exit code 2 هو العرف لـ «استخدام غلط».

[[values]] object من غير prototype (بيتطبع Object: null prototype)، عادي تقرا منه زي أي object.`,
            when: "أي سكربت فيه أكتر من argument أو flag. لو محتاج subcommands وhelp أوتوماتيك ومكمّلات، commander أو yargs.",
            mistakes: R`[[if (process.argv[2] === "--verbose")]] فالترتيب يبقى إجباري. ونسيان إن [[--limit 5]] بيرجع [["5"]] نص فالمقارنة [[limit > 10]] تشتغل بالصدفة. وتسيب الـ error بتاع parseArgs يطلع stack trace لليوزر.`
          },
          lines: [
            "parseArgs مبنية في Node.",
            "اللي اليوزر كتبه بس (من غير node ومسار السكربت).",
            "حلّل الـ arguments...",
            "...الـ options المسموحة:",
            "--out أو -o نص، وله قيمة افتراضية.",
            "--verbose أو -v true/false.",
            "--limit نص (مفيش نوع number).",
            "قفلة الـ options.",
            "واسمح بـ arguments من غير اسم (زي اسم الملف).",
            "قفلة.",
            "حوّل الرقم بنفسك، و 100 لو مش موجود.",
            "لو مش رقم صحيح...",
            "...اطبع السبب على stderr...",
            "...واخرج بـ 2 (استخدام غلط).",
            "قفلة.",
            "اطبع اللي اتفهم.",
            "من process كمان: البيئة، والفولدر الحالي، ورقم العملية."
          ],
          sol: R`الأول: [[values]] فيها [[verbose: true, out: 'x.csv', limit: '5']] (لاحظ [['5']] نص)، و [[positionals]] فيها [['orders.json']]، و [[limit: 5]]، و exit 0.

[[--limit abc]]: [[--limit must be a number]] و exit 2. [[--colour]]: stack trace فيه [[ERR_PARSE_ARGS_UNKNOWN_OPTION]] و exit 1، ودا اللي هتصلّحه. [[a -- -v]]: [[verbose]] مش موجودة، و [[positionals]] فيها [['a', '-v']] لأن اللي بعد [[--]] مش flags. وكمان [[out: 'report.csv']] من الـ default.

بعد الحل: [[--colour]] بيطبع سطر السبب والـ usage ويخرج بـ 2، و [[-h]] بيطبع usage ويخرج بـ 0، ومن غير ملف بيخرج بـ 2.`,
          solCode: R`import { parseArgs } from "node:util";

const usage = "Usage: report [--out file] [--limit n] [-v] <input.json>";
let args;
try {
  args = parseArgs({
    options: {
      out: { type: "string", short: "o", default: "report.csv" },
      verbose: { type: "boolean", short: "v" },
      limit: { type: "string" },
      help: { type: "boolean", short: "h" },
    },
    allowPositionals: true,
  });
} catch (err) {
  console.error(err.message + "\n" + usage);
  process.exit(2);
}

const { values, positionals } = args;
if (values.help) {
  console.log(usage);
  process.exit(0);
}
if (positionals.length !== 1) {
  console.error(usage);
  process.exit(2);
}
console.log({ input: positionals[0], ...values });`
        },
        {
          cmd: "exit codes و process.exitCode",
          title: "السكربت فشل، والـ CI فاكره نجح",
          desc: R`الـ exit code هو الطريقة الوحيدة اللي CI أو bash أو Docker يعرفوا بيها إن سكربتك فشل: 0 نجاح، وأي رقم تاني فشل. Node بيخرج بـ 1 لوحده لو فيه exception أو promise اترفض من غير catch.

وللخروج بفشل بنفسك: [[process.exitCode = 1]] أحسن من [[process.exit(1)]] في آخر السكربت. الأولانية بتسيب اللي فاضل يخلص (اللوج يتكتب، الاتصالات تتقفل) وتخرج بالرقم ده. التانية بتقفل فورًا، وممكن تقطع output لسه مكتبش.`,
          example: R`const failed = ["a.csv"];
if (failed.length) {
  console.error($__bt$__{failed.length} file(s) failed$__bt);
  process.exitCode = 1;
}
setTimeout(() => console.log("cleanup still runs"), 100);
process.on("exit", (code) => console.log("exit with", code));`,
          try: R`شغّله وبعدين [[echo $?]]. وبعدين قارن الأمرين دول: [[node -e 'process.stdout.write("x".repeat(5e6)); process.exit(0)' | wc -c]] ونفس الأمر بـ [[process.exitCode = 0]] بدل [[process.exit(0)]]. وجرّب [[node -e 'throw new Error("x")'; echo $?]].`,
          flag: "script",
          deep: {
            why: R`سكربت migration أو import فشل في نص الشغل وطبع error، بس خرج بـ 0، فالـ pipeline كمّل على deploy. أو سكربت بيطبع JSON كبير لـ [[jq]] والناتج بيوصل ناقص من غير سبب واضح. الاتنين مشاكل exit.`,
            how: R`الأرقام المعروفة: 0 نجاح. 1 فشل عام (وده اللي Node بيستخدمه مع uncaught exception و unhandled rejection). 2 عرف لـ «استخدام غلط». 13 في Node معناه top-level await مخلصش (promise محدش هيحلّه). و [[128 + رقم الإشارة]] لو العملية اتقتلت بإشارة: 130 من Ctrl+C (SIGINT)، و 143 من SIGTERM، و 137 من SIGKILL (وغالبًا OOM killer في Docker).

[[process.exit(n)]] بيوقف العملية حالًا: timers و I/O لسه مخلصوش بيتلغوا. والأخطر: لو stdout رايح لـ pipe أو ملف، الكتابة فيه async، فـ [[process.exit]] ممكن يقطعها. في التجربة اللي تحت الـ output بيوصل 65536 بايت بس من ٥ مليون.

[[process.exitCode = 1]] بيسجّل الرقم بس، والعملية بتخلص طبيعي لما مفيش شغل فاضل، وبتخرج بيه. ولو حصل error بعدها، الـ error بيكسب.

[[process.on("exit")]] بيتنادى قبل الخروج بالـ code، بس جواه sync بس: أي await أو setTimeout مش هيتنفّذ.`,
            when: "أي سكربت في CI أو cron أو Docker: exitCode عند الفشل. process.exit للخروج الفوري الحقيقي (usage غلط في الأول، أو مهلة إغلاق خلصت).",
            mistakes: R`[[catch (err) { console.error(err) }]] في آخر السكربت من غير exitCode، فالـ error يتطبع والـ CI يعدّي. و [[process.exit(0)]] في آخر سكربت بيطبع كتير لـ pipe فالناتج يتقطع. و async في [[on("exit")]].

سؤال انترفيو: «exit code 137 معناه إيه؟»: 128 + 9، العملية اتقتلت بـ SIGKILL، وفي Docker ده غالبًا الذاكرة خلصت.`
          },
          lines: [
            "نتيجة شغل (هنا ملف واحد فشل).",
            "لو فيه فشل...",
            "...اطبع السبب على stderr...",
            "...وسجّل exit code 1 من غير ما تقفل فورًا.",
            "قفلة.",
            "شغل لسه فاضل، وهيتنفّذ لأننا مستخدمناش process.exit.",
            "قبل الخروج مباشرة: اطبع الـ code."
          ],
          sol: R`الناتج: [[1 file(s) failed]] ثم [[cleanup still runs]] ثم [[exit with 1]]، و [[echo $?]] بيطبع 1. لو كنت كتبت [[process.exit(1)]] بدل exitCode، سطر الـ cleanup مكانش هيتطبع.

المقارنة: بـ [[process.exit(0)]] الـ [[wc -c]] بيطلّع 65536 (أو رقم تاني أقل من ٥ مليون حسب الجهاز)، وبـ [[process.exitCode = 0]] بيطلّع 5000000 كاملين. و [[throw]] بيطلّع 1.

الغلط الشائع إنك تفتكر [[console.log]] sync دايمًا: على الترمنال أيوه، بس لما الـ output رايح لـ pipe ممكن يبقى async على لينكس.`,
          solCode: R`node -e 'process.stdout.write("x".repeat(5e6)); process.exit(0)' | wc -c
# 65536
node -e 'process.stdout.write("x".repeat(5e6)); process.exitCode = 0' | wc -c
# 5000000
node -e 'throw new Error("x")' 2>/dev/null; echo $?
# 1`
        },
        {
          cmd: "SIGINT و SIGTERM",
          title: "Ctrl+C وإشارة الإغلاق في سكربت شغال",
          desc: R`Ctrl+C بيبعت [[SIGINT]]، و Docker و pm2 و systemd و Kubernetes بيبعتوا [[SIGTERM]] لما عايزين يقفلوا العملية. من غير معالج Node بيقفل فورًا، والشغلة اللي في النص بتتقطع. [[process.on("SIGTERM", fn)]] بيخليك تخلص الشغلة الحالية الأول.

الدرس ده عن الفكرة في أي سكربت أو worker. تطبيقها على سيرفر HTTP ([[server.close()]] و unhandled rejections) في درس [[الإغلاق النضيف]] في المستوى ٣.`,
          example: R`let stopping = false;

async function shutdown(signal) {
  if (stopping) {
    console.log("forced exit");
    process.exit(1);
  }
  stopping = true;
  console.log($__bt$__{signal}: finishing current job...$__bt);
  setTimeout(() => process.exit(1), 10_000).unref();
  await new Promise((r) => setTimeout(r, 500));
  console.log("done, bye");
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log("pid", process.pid);
setInterval(() => { if (!stopping) console.log("working..."); }, 300);`,
          try: R`شغّله واضغط Ctrl+C مرة واحدة، وبعدين شغّله واضغطها مرتين بسرعة. ومن ترمنال تاني: [[kill -TERM <pid>]] ثم [[kill -9 <pid>]]. وبعد كل مرة [[echo $?]].`,
          flag: "script",
          deep: {
            why: R`worker بيعالج طابور، أو سكربت import بيكتب في القاعدة: لو اتقفل في النص بيسيب صف نصه متسجّل، أو job اتاخدت ومخلصتش. ومع كل deploy بيحصل ده لو العملية مش بتسمع SIGTERM.`,
            how: R`الإشارة رسالة من النظام للعملية. أشهرها: [[SIGINT]] (رقم 2) من Ctrl+C. [[SIGTERM]] (15) «اقفل بأدب»، ودي الافتراضية بتاعة [[kill]] و [[docker stop]]. [[SIGKILL]] (9) قفل إجباري من الكيرنل، ومفيش عملية تقدر تمسكه أو تتجاهله.

أول ما تعمل [[process.on("SIGINT")]] Node بيبطّل يقفل لوحده مع الإشارة دي: انت مسؤول تخرج. عشان كده لازم [[process.exit]] في الآخر.

الـ pattern: flag [[stopping]] يوقف أخد شغل جديد، وتستنى الشغلة الحالية تخلص، وتخرج بـ 0. ومهلة ([[setTimeout]] بـ [[unref]]) تخرج بـ 1 لو الشغلة علّقت، لأن Docker هيبعت SIGKILL بعد ١٠ ثواني بأي حال. وإشارة تانية وانت بتقفل معناها «اليوزر مستعجل»، فبتخرج فورًا.

من غير معالج، Node بيقفل بـ exit code 130 مع SIGINT و 143 مع SIGTERM (128 + رقم الإشارة). ومع SIGKILL دايمًا 137.

في Docker: لو الـ CMD بتاعك [[npm start]] أو shell script، الإشارة ممكن تروح لـ npm أو sh مش لـ node. ولو node هو PID 1 من غير init، بيتعامل مع الإشارات بشكل مختلف. التفاصيل في «تاب Docker»، والخلاصة: الـ CMD بصيغة الـ array اللي بتشغّل node مباشرة، مع [[--init]] أو tini. وعلى ويندوز SIGTERM مش مدعوم زي لينكس، و SIGINT بس اللي بيشتغل من الترمنال.`,
            when: "أي عملية طويلة: سيرفر، worker، consumer لطابور، سكربت import. السكربت اللي بيخلص في ثانية مش محتاج.",
            mistakes: R`تمسك SIGINT وتنسى [[process.exit]] فـ Ctrl+C يبطّل يشتغل. ومفيش مهلة فالإغلاق يعلّق لحد SIGKILL. وتحاول تمسك SIGKILL. و async شغل جوه [[process.on("exit")]] بدل معالج الإشارة.

سؤال انترفيو: «graceful shutdown إزاي؟»: وقّف استقبال شغل جديد، خلّص الجاري بمهلة، اقفل الاتصالات، اخرج بالـ code الصح.`
          },
          lines: [
            "هل بدأنا نقفل؟",
            "معالج واحد للإشارتين.",
            "لو إشارة تانية وصلت واحنا بنقفل...",
            "...اليوزر مستعجل...",
            "...اخرج فورًا.",
            "قفلة.",
            "علّم إننا بنقفل (ومتاخدش شغل جديد).",
            "اطبع أنهي إشارة.",
            "مهلة ١٠ ثواني ثم خروج بفشل، و unref عشان متأخرش الخروج الطبيعي.",
            "استنى الشغلة الحالية (هنا محاكاة بنص ثانية).",
            "اطبع.",
            "واخرج بنجاح.",
            "قفلة.",
            "Ctrl+C.",
            "إشارة الإغلاق من Docker أو pm2 أو kill.",
            "اطبع رقم العملية عشان تبعتلها kill.",
            "شغل متكرر بيقف لما نبدأ نقفل."
          ],
          sol: R`Ctrl+C مرة: [[SIGINT: finishing current job...]] وبعد نص ثانية [[done, bye]] و exit 0. مرتين بسرعة: بعد رسالة الـ SIGINT تطلع [[forced exit]] و exit 1.

[[kill -TERM]]: نفس الكلام بـ [[SIGTERM: ...]] و exit 0. [[kill -9]]: العملية بتموت من غير أي رسالة، والشيل بيقول [[Killed]] و [[echo $?]] بيطبع 137، لأن SIGKILL مبيوصلش للكود أصلًا.

ولو شلت الـ [[process.on]] الاتنين: Ctrl+C بيقفل فورًا بـ 130، و SIGTERM بـ 143. الغلط الشائع: تتوقع إن الـ [[exit]] event بيتنادى مع SIGKILL، ودا مش بيحصل.`,
          solCode: R`node worker.mjs &
PID=$!
kill -TERM $PID; wait $PID; echo $?
# SIGTERM: finishing current job...
# done, bye
# 0
node worker.mjs & PID=$!
kill -9 $PID; wait $PID; echo $?
# Killed
# 137`
        },
        {
          cmd: "execFile و spawn",
          title: "شغّل git أو tar أو ffmpeg من Node",
          desc: R`[[node:child_process]] بيشغّل برامج تانية. [[execFile(cmd, args)]] للأوامر القصيرة: بيستنى لحد ما تخلص ويرجّعلك stdout و stderr كنص، ومع [[promisify]] بتعمله await. [[spawn(cmd, args)]] للطويلة أو اللي output بتاعها كبير: بيرجّعلك الـ process نفسها و streams، و [[stdio: "inherit"]] بيخلي الـ output يظهر في ترمنالك مباشرة.

في الاتنين الأمر لوحده والـ arguments في array. مفيش shell في النص.`,
          example: R`import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

const { stdout } = await run("git", ["--version"]);
console.log("git:", stdout.trim());

try {
  await run("ls", ["/no/such/dir"], { timeout: 5000 });
} catch (err) {
  console.log("failed:", err.code, err.stderr.trim());
}

const child = spawn("tar", ["-czvf", "backup.tgz", "uploads"], { stdio: "inherit" });
child.on("error", (err) => console.error("could not start:", err.message));
child.on("close", (code) => console.log("tar exited with", code));`,
          try: R`اعمل فولدر [[uploads]] فيه ملف وشغّل السكربت. بعدين غيّر [["tar"]] لـ [["tarr"]] وشوف أنهي event اشتغل. وبعدين اكتب دالة [[sh(cmd, args)]] بـ spawn بترجّع promise: تنجح لو exit code صفر، وترمي error فيه الـ code لو لأ.`,
          flag: "script",
          deep: {
            why: R`حاجات كتير أسهل تعملها بالبرنامج الجاهز: [[pg_dump]] للـ backup، و [[ffmpeg]] للفيديو، و [[git]] في سكربت release، و [[tar]] للضغط. وأي سكربت بيعمل كده محتاج يعرف الأمر فشل ولا نجح، ويشوف الـ output من غير ما يملى الرام.`,
            how: R`[[execFile]] بيشغّل الملف مباشرة (من غير shell) وبيجمع الـ output كله في الذاكرة. لو الـ exit code مش صفر الـ promise بيترفض، والـ error فيه [[code]] (exit code) و [[stdout]] و [[stderr]]. و [[timeout]] بيقتل الأمر لو طوّل. وفيه [[maxBuffer]] (افتراضي ١ ميجا): لو الـ output أكبر، الأمر بيتقتل والـ promise بيترفض.

[[spawn]] مبيجمعش حاجة: [[child.stdout]] و [[child.stderr]] streams بتقرا منها وقت ما البيانات تيجي، أو [[stdio: "inherit"]] يوصّلهم بترمنالك. ودا المناسب لأمر بيطبع كتير أو شغال دقايق (build، backup، ffmpeg). وعايز تعرف النتيجة: [[close]] event بالـ code.

لو البرنامج مش موجود: [[error]] event بـ [[ENOENT]] (وفي execFile الـ promise بيترفض بـ [[err.code === "ENOENT"]]). ومع spawn لازم تسمع [[error]]، وإلا العملية كلها تقع.

البيئة: الابن بياخد [[process.env]] بتاعك افتراضيًا. و [[cwd]] بيحدد الفولدر اللي يشتغل فيه، و [[env]] لو عايز تديله متغيرات مختلفة.

ولو محتاج shell فعلًا (pipes و globs): الدرس اللي بعده، وفيه ليه ده خطر.`,
            when: "execFile: أمر قصير و output صغير (git rev-parse، ffprobe، convert). spawn: طويل أو output كبير أو محتاج تشوفه live. جوه API request: لأ لو ممكن، حطه في job.",
            mistakes: R`تتجاهل الـ exit code فالـ backup «نجح» وهو فاضي. ومتسمعش [[error]] في spawn فبرنامج ناقص على السيرفر يوقّع التطبيق. و execFile لأمر بيطبع ميجات فيتقتل بسبب maxBuffer. و [[execSync]] جوه سيرفر بيوقف كل الطلبات لحد ما يخلص.`
          },
          lines: [
            "الدالتين من child_process.",
            "promisify عشان execFile يبقى await.",
            "نسخة promise من execFile.",
            "شغّل git بـ argument في array واستنى النتيجة.",
            "stdout نص، و trim يشيل السطر الجديد.",
            "حاول...",
            "...أمر هيفشل، ومهلة ٥ ثواني.",
            "exit code مش صفر: الـ promise اترفض.",
            "الـ exit code والـ stderr جوه الـ error.",
            "قفلة.",
            "أمر طويل: spawn والـ output يظهر في ترمنالك مباشرة.",
            "البرنامج مش موجود أو مينفعش يتشغّل.",
            "خلص: اطبع الـ exit code."
          ],
          sol: R`الناتج: [[git: git version 2.x]]، ثم [[failed: 2 ls: cannot access '/no/such/dir': No such file or directory]]، ثم أسامي الملفات من tar ([[uploads/]] و [[uploads/a.txt]]) و [[tar exited with 0]]، والملف [[backup.tgz]] اتعمل.

مع [["tarr"]]: بيتطبع [[could not start: spawn tarr ENOENT]]، و [[close]] بيتنادى برضه بـ code سالب ([[-2]] على لينكس)، مش null ولا 1. عشان كده الـ error event هو اللي تعتمد عليه في «البرنامج مش موجود».

في الحل، tar على فولدر مش موجود بيطبع رسالته على الترمنال (inherit) والـ promise بيترفض بـ [[tar failed: code=2 signal=null]]. والغلط الشائع: [[resolve]] في [[exit]] أو [[close]] من غير ما تبص على الـ code.`,
          solCode: R`import { spawn } from "node:child_process";

function sh(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", ...opts });
    child.on("error", reject);
    child.on("close", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error($__bt$__{cmd} failed: code=$__{code} signal=$__{signal}$__bt));
    });
  });
}

await sh("tar", ["-czf", "backup.tgz", "uploads"]);
console.log("backup ok");
await sh("tar", ["-czf", "backup2.tgz", "no-such-folder"]).catch((err) => console.error(err.message));
await sh("tarr", ["status"]).catch((err) => console.error(err.code, err.message));`
        },
        {
          cmd: "command injection",
          title: "exec بنص فيه كلام اليوزر",
          desc: R`[[exec("wc -l " + name)]] بيبعت النص كله لـ shell ([[/bin/sh -c]])، والـ shell بيفهم [[;]] و [[&&]] و [[|]] و [[$()]]. فلو [[name]] جاي من اليوزر وفيه [[; rm -rf ~]]، ده أمر تاني بيتنفّذ بصلاحيات السيرفر. ودي command injection.

الحل: [[execFile]] أو [[spawn]] بـ args array، فالكلام بيوصل للبرنامج كـ argument واحد حرفيًا من غير shell. وحتى كده، argument بيبدأ بـ [[-]] ممكن البرنامج يفهمه option (argument injection)، فبتحط [[--]] أو [[--end-of-options]] قبله.`,
          example: R`import { exec, execFile } from "node:child_process";
import { promisify } from "node:util";
const sh = promisify(exec);
const run = promisify(execFile);

const name = "notes.txt; echo HACKED > pwned.txt";

const bad = await sh($__btwc -l $__{name}$__bt);
console.log("exec:", bad.stdout.trim());

try {
  await run("wc", ["-l", name]);
} catch (err) {
  console.log("execFile:", err.stderr.trim());
}

const ref = "--output=stolen.txt";
await run("git", ["log", ref]);
try {
  await run("git", ["log", "--end-of-options", ref]);
} catch (err) {
  console.log("git:", err.stderr.trim().split("\n")[0]);
}`,
          flag: "script",
          try: R`في فولدر تجربة فاضي: [[git init]]، واعمل commit فاضي ([[git commit --allow-empty -m init]])، واعمل [[notes.txt]] فيه سطرين، وشغّل السكربت. بعدين [[ls]]: هتلاقي ملفين محدش طلبهم. وبعدين اكتب [[countLines(name)]] و [[logFor(ref)]] آمنين، وجرّبهم بنفس المدخلات دي وبـ [["--help"]].`,
          deep: {
            why: R`أي feature بتشغّل برنامج على كلام جاي من اليوزر (اسم ملف مرفوع يتحوّل بـ ffmpeg أو ImageMagick، أو branch في أداة deploy، أو domain في أداة ping) ممكن تتحوّل لتنفيذ أوامر على السيرفر. دي من أخطر الثغرات لأن المهاجم بياخد shell بصلاحيات تطبيقك، ومن أول ما بتتقري في أي code review أو security audit.`,
            how: R`[[exec]] و [[execSync]] و [[spawn]] مع [[shell: true]] كلهم بيشغّلوا [[/bin/sh -c "النص"]]. الـ shell بيحلّل النص: [[;]] بيفصل أوامر، و [[$(...)]] و backticks بينفّذوا، و [[>]] بيكتب ملفات. في المثال النص بقى [[wc -l notes.txt; echo HACKED > pwned.txt]]، أمرين.

[[execFile("wc", ["-l", name])]] مفيهوش shell: Node بيشغّل wc مباشرة ويدّيله [[name]] كـ argument واحد، فـ wc بيدوّر على ملف اسمه حرفيًا [[notes.txt; echo HACKED > pwned.txt]] ومش بيلاقيه. مفيش escaping تعمله بإيدك وتغلط فيه.

بس الـ array مش بيحميك من إن البرنامج نفسه يفهم الـ argument كـ option. [[git log --output=stolen.txt]] بيكتب الـ log في ملف في أي مسار. والحل: [[--end-of-options]] في git (أو [[--]] في أغلب أدوات يونكس زي [[wc -l -- name]])، بعدها كل حاجة بتتعامل كاسم مش option. وكمان validation: allowlist للحروف ([[/^[\w.-]+$/]]) وارفض اللي بيبدأ بـ [[-]].

في Node 24، [[spawn]] أو [[execFile]] مع [[shell: true]] و args array بيطلّع [[DEP0190]] DeprecationWarning لأن الـ args بتتلزق في النص من غير escaping، فهي نفس خطورة exec. وعلى ويندوز، تشغيل [[.bat]] أو [[.cmd]] بـ spawn من غير shell بقى بيرفض من تحديث أمني في 2024 لنفس السبب.`,
            when: "دايمًا execFile أو spawn بـ array لما أي جزء من الأمر مش ثابت. exec مقبولة بس لأوامر ثابتة بالكامل انت كاتبها (زي سكربت build عندك). والأحسن لو فيه مكتبة Node بتعمل الشغل (sharp للصور مثلًا) متشغّلش برنامج خالص.",
            mistakes: R`تعمل escaping بإيدك ([[replace(/;/g, "")]]) وتنسى [[$()]] أو [[|]] أو newline. وتحط [[shell: true]] في spawn «عشان الأمر يشتغل». وتفتكر إن الـ array كفاية وتنسى argument injection بـ [[-]].

سؤال انترفيو: «إيه الفرق بين exec و execFile؟»: exec بيعدّي على shell فعرضة لـ command injection ومحدود بـ buffer، و execFile بيشغّل البرنامج مباشرة بـ args منفصلة.`
          },
          lines: [
            "exec (بـ shell) و execFile (من غير).",
            "promisify.",
            "نسخة promise من exec.",
            "ونسخة promise من execFile.",
            "اسم ملف «جاي من اليوزر» فيه أمر مستخبي.",
            "exec: الـ shell بينفّذ wc وبعدين echo، والملف pwned.txt بيتعمل.",
            "اطبع: 2 notes.txt، كأن كل حاجة تمام.",
            "حاول...",
            "...execFile: الاسم كله argument واحد، ومفيش shell.",
            "wc مش لاقي ملف بالاسم الغريب ده.",
            "اطبع رسالة wc.",
            "قفلة.",
            "ref «جاي من اليوزر» بيبدأ بـ --.",
            "حتى من غير shell: git فهمه option وكتب الـ log في stolen.txt.",
            "حاول...",
            "...--end-of-options: اللي بعده اسم مش option.",
            "git رفض...",
            "...اطبع أول سطر من الرفض.",
            "قفلة."
          ],
          sol: R`الناتج: [[exec: 2 notes.txt]] (كأن مفيش حاجة)، ثم [[execFile: wc: 'notes.txt; echo HACKED > pwned.txt': No such file or directory]]، ثم [[git: fatal: option '--output=stolen.txt' must come before non-option arguments]]. و [[ls]] بيوريك [[pwned.txt]] فيه [[HACKED]]، و [[stolen.txt]] فيه الـ git log. الأول command injection والتاني argument injection مع إنك مستخدمتش shell.

في الحل: [[countLines("notes.txt")]] بترجع 2، والاسم اللي فيه [[;]] و [[--help]] مرفوضين قبل ما أي برنامج يشتغل. و [[logFor("HEAD")]] بيرجع الـ log، و [[--output=stolen.txt]] git بيرفضه ومفيش ملف بيتعمل.

الغلط الشائع إنك تصلّح الأول بس (exec لـ execFile) وتفتكر خلاص.`,
          solCode: R`import { execFile } from "node:child_process";
import { promisify } from "node:util";
const run = promisify(execFile);

async function countLines(name) {
  if (!/^[\w.-]+$/.test(name) || name.startsWith("-")) throw new Error("bad file name: " + name);
  const { stdout } = await run("wc", ["-l", "--", name]);
  return Number.parseInt(stdout, 10);
}

async function logFor(ref) {
  const { stdout } = await run("git", ["log", "--oneline", "-5", "--end-of-options", ref]);
  return stdout;
}

console.log(await countLines("notes.txt"));
for (const name of ["notes.txt; echo HACKED > pwned.txt", "--help"]) {
  await countLines(name).catch((err) => console.log(err.message));
}
console.log(await logFor("HEAD"));
await logFor("--output=stolen.txt").catch((err) => console.log(err.stderr.trim()));`
        },
        {
          cmd: "Buffer و encoding",
          title: "بايتات مش حروف: utf8 و base64 و hex",
          desc: R`[[Buffer]] هو البايتات الخام: اللي بيرجع من [[readFile]] من غير encoding، ومن الـ network، ومن crypto. والنص بيتحوّل لبايتات بـ encoding: [[utf8]] للكلام (الحرف العربي ٢ بايت)، و [[base64]] و [[base64url]] عشان تبعت بايتات جوه نص (JSON أو URL أو header)، و [[hex]] للـ hashes والـ debugging.

يعني [[text.length]] عدد الحروف، و [[Buffer.byteLength(text)]] عدد البايتات، وفي العربي مش نفس الرقم.`,
          example: R`const text = "سلام";
const buf = Buffer.from(text, "utf8");
console.log(buf);
console.log(text.length, buf.length, Buffer.byteLength(text));

console.log(buf.toString("hex"));
console.log(buf.toString("base64"));
const bytes = Buffer.from([251, 255, 191]);
console.log(bytes.toString("base64"), bytes.toString("base64url"));
console.log(Buffer.from("2LPZhNin2YU=", "base64").toString("utf8"));

console.log(buf.subarray(0, 3).toString("utf8"));

const decoder = new TextDecoder("utf-8");
const part1 = decoder.decode(buf.subarray(0, 3), { stream: true });
const part2 = decoder.decode(buf.subarray(3));
console.log(part1 + part2);`,
          try: R`احسب عدد الحروف وعدد البايتات لـ «مرحبا يا عالم»، وحوّلها base64 وارجعها للنص واتأكد إنها زي الأصل. واطبع أول ٥ بايتات كنص وشوف إيه اللي بيطلع. وجرّب [[Buffer.from("zz", "hex")]] و [[btoa("سلام")]].`,
          flag: "script",
          deep: {
            why: R`حدود الحجم في القاعدة والـ APIs بالبايت مش بالحروف: [[VARCHAR]] في MySQL بالحروف لكن حدود SMS و headers و S3 metadata بالبايت، فاسم عربي ٥٠ حرف ممكن يبقى ١٠٠ بايت. و base64 في كل حتة: Basic auth، و data URLs للصور، و JWT (base64url)، والملفات جوه JSON. ولو قطّعت بايتات في نص حرف عربي، يطلعلك [[�]] في الـ UI.`,
            how: R`[[Buffer.from(text, "utf8")]] بيحوّل النص لبايتات. في UTF-8 الحروف الإنجليزية بايت واحد، والعربي ٢، والإيموجي ٤. [[buf.toString(enc)]] العكس. و [[console.log(buf)]] بيعرض البايتات hex: [[<Buffer d8 b3 d9 84 ...>]].

[[base64]] بيمثّل كل ٣ بايتات بـ ٤ حروف من (A-Z a-z 0-9 + /) و [[=]] في الآخر للتكملة، فالحجم بيزيد حوالي الثلث. [[base64url]] نفس الفكرة بـ [[-]] و [[_]] بدل [[+]] و [[/]] ومن غير [[=]]، عشان يتحط في URL أو اسم ملف من غير escaping، ودا اللي JWT بيستخدمه. [[hex]] كل بايت حرفين، ودا شكل الـ hashes ([[sha256]]).

[[subarray]] بيقطّع بالبايت مش بالحرف. لو القطع جه في نص حرف، الـ toString بيحط [[�]] (replacement character) مكان البايت الناقص. ده بيحصل لما تقرا stream على دفعات وتعمل toString لكل دفعة. الحل [[TextDecoder]] بـ [[stream: true]]: بيحتفظ بالبايت الناقص لحد الدفعة الجاية. و [[setEncoding("utf8")]] على الـ streams بيعمل نفس الحاجة.

[[Buffer]] subclass من [[Uint8Array]]، فأي API بتاخد Uint8Array (زي fetch و Web Crypto) بتاخده. و [[Buffer.concat]] بيلزق كذا buffer.`,
            when: "ملفات binary (صور، PDF)، و crypto (hash و HMAC والتوقيعات)، و base64 للـ auth و data URLs، والتحقق من حجم بالبايت قبل ما تبعت.",
            mistakes: R`[[btoa]] و [[atob]] مع نص عربي: بيرموا [[InvalidCharacterError]] لأنهم للـ Latin1 بس، فاستخدم Buffer. و [[Buffer.from("zz", "hex")]] بيرجع buffer فاضي من غير error، فـ hex بايظ بيعدّي بصمت. وتقارن [[text.length]] بحد بالبايت. و [[new Buffer()]] القديم deprecated وغير آمن، استخدم [[Buffer.from]] و [[Buffer.alloc]].

سؤال انترفيو: «base64 تشفير؟»: لأ، encoding. أي حد يفكّه، ومش بيحمي أي حاجة.`
          },
          lines: [
            "نص عربي، ٤ حروف.",
            "حوّله بايتات UTF-8.",
            "البايتات بالـ hex: <Buffer d8 b3 d9 84 d8 a7 d9 85>.",
            "4 حروف، لكن 8 بايت.",
            "نفس البايتات hex في نص واحد.",
            "وبـ base64: 2LPZhNin2YU=",
            "بايتات بتطلّع + و / في base64.",
            "base64 فيه + / وبـ base64url بيبقوا - _ من غير =.",
            "من base64 لبايتات لنص: سلام.",
            "أول ٣ بايتات: حرف ونص، فالنص الناقص بيبقى �.",
            "decoder بيفتكر البايتات الناقصة بين الدفعات.",
            "الدفعة الأولى: بيطلّع س ويحتفظ بنص الحرف التاني.",
            "الدفعة التانية: بيكمّل الحرف.",
            "سلام كاملة من غير �."
          ],
          sol: R`«مرحبا يا عالم»: 13 حرف (11 عربي ومسافتين) و 24 بايت (11 × 2 + 2). الـ base64 [[2YXYsdit2KjYpyDZitinINi52KfZhNmF]] ولما ترجعه بيطابق الأصل. أول ٥ بايتات كنص: [[مر�]]، حرفين كاملين ونص حرف.

[[Buffer.from("zz", "hex")]] بيرجع [[<Buffer >]] فاضي من غير error. و [[btoa("سلام")]] بيرمي [[InvalidCharacterError]].

الغلط الشائع إنك تتوقع [[text.length]] يبقى 24، أو تفتكر إن [[subarray(0, 5)]] بيدّيك ٥ حروف.`,
          solCode: R`const text = "مرحبا يا عالم";
const buf = Buffer.from(text);
console.log(text.length, buf.length); // 13 24

const b64 = buf.toString("base64");
console.log(b64);
console.log(Buffer.from(b64, "base64").toString() === text); // true

console.log(buf.subarray(0, 5).toString()); // مر�
console.log(Buffer.from("ab").toString("hex"), Buffer.from("zz", "hex").length); // 6162 0`
        },
        {
          cmd: "EventEmitter في Node",
          title: "on و emit و error event",
          desc: R`كتير من Node مبني على [[EventEmitter]] من [[node:events]]: الـ streams، و [[http.Server]]، و [[child_process]] (الـ [[close]] و [[error]] اللي في درس [[execFile و spawn]])، و [[process]] نفسه. بتسجّل بـ [[on]] وبتعلن بـ [[emit]]، والفكرة والتنفيذ بإيدك في «تاب JavaScript» المستوى ٣ (درس [[EventEmitter]]).

اللي خاص بـ Node: event اسمه [[error]] من غير listener بيوقّع العملية كلها. و [[once()]] بتحوّل event لـ promise تعملها await.`,
          example: R`import { EventEmitter, once } from "node:events";

class Importer extends EventEmitter {
  run(rows) {
    for (const row of rows) {
      if (!row.id) {
        this.emit("error", new Error("row without id"));
        return;
      }
      this.emit("row", row);
    }
    this.emit("done", rows.length);
  }
}

const imp = new Importer();
imp.on("row", (row) => console.log("saved", row.id));
imp.on("error", (err) => console.error("import failed:", err.message));

setTimeout(() => imp.run([{ id: 1 }, { id: 2 }]), 0);
const [count] = await once(imp, "done");
console.log("total", count);

new Importer().run([{}]);`,
          try: R`شغّله: السطر الأخير لازم يوقّع العملية، ليه؟ بعدين جرّب [[await once(bus, "ready")]] على emitter بيعمل [[emit("error", ...)]] قبل ready، وسجّل listenerين على نفس الحدث واطبع حاجة قبل وبعد [[emit]] عشان تعرف sync ولا async.`,
          flag: "script",
          deep: {
            why: R`هتقابل events في كل حتة في Node حتى لو عمرك ما كتبت class بيورّث EventEmitter: [[stream.on("data")]] و [[child.on("close")]] و [[server.on("error")]]. ولو مش عارف قاعدة الـ error event، سيرفر بيقع كله بسبب error في stream واحد.`,
            how: R`[[emit(name, ...args)]] بينادي كل الـ listeners المسجّلين على الاسم ده، بالترتيب، sync: قبل ما [[emit]] يرجع. يعني listener تقيل بيأخّر اللي عمل emit.

[[error]] ليه قاعدة خاصة: لو اتعمله emit ومفيش ولا listener عليه، الـ emit نفسه بيرمي الـ error، ولو محدش مسكه العملية بتقع. عشان كده أي stream أو socket أو child process لازم يبقى عليه [[on("error")]].

[[once(emitter, name)]] من [[node:events]] بترجّع promise بيتحل أول ما الحدث يحصل، بـ array فيه الـ args. ولو [[error]] حصل الأول، الـ promise بيترفض. مفيد عشان تستنى [[ready]] أو [[close]] أو [[listening]] بـ await.

[[emitter.once(name, fn)]] (method) listener بيشتغل مرة واحدة وبيتشال. و [[off]] أو [[removeListener]] يشيل listener. ولو سجلت أكتر من ١٠ على نفس الحدث بيظهر [[MaxListenersExceededWarning]]، وغالبًا ده leak (بتسجّل في كل request ومبتشيلش).`,
            when: "استهلاك الـ events بتاعة Node (streams و child processes والسيرفر) دايمًا. وتعمل emitter بنفسك لـ class بيعلن عن تقدّم شغل طويل (import، upload). لإشعارات بين services أو كذا instance، queue أو Redis pub/sub مش EventEmitter.",
            mistakes: R`مفيش [[on("error")]] على stream أو child process. وتفتكر [[emit]] async فتتوقع الكود اللي بعده يشتغل الأول. وتسجّل listener جوه request handler على object عام فيبقوا آلاف.`
          },
          lines: [
            "EventEmitter و once من events.",
            "class بيعلن عن تقدّم شغله.",
            "بيلف على الصفوف...",
            "...لكل صف:",
            "لو ناقصه id...",
            "...أعلن error...",
            "...ووقّف.",
            "قفلة.",
            "أعلن إن صف اتحفظ.",
            "قفلة الـ loop.",
            "أعلن إنه خلص ومعاه العدد.",
            "قفلة الدالة.",
            "قفلة الـ class.",
            "instance.",
            "listener لكل صف.",
            "listener للـ error (من غيره العملية تقع).",
            "ابدأ الشغل بعد ما نبدأ نستنى.",
            "استنى done كـ promise، والـ args بترجع array.",
            "اطبع العدد.",
            "instance من غير error listener وصف ناقص: العملية بتقع."
          ],
          sol: R`الناتج: [[saved 1]] و [[saved 2]] و [[total 2]]، وبعدين العملية بتقع بـ [[Error: row without id]] ومعاه [[Emitted 'error' event on Importer instance]] و exit 1. السبب: الـ Importer التاني ملوش [[on("error")]]، فالـ emit رمى الـ error. لو ضفت listener، الرسالة تتطبع وتكمّل.

[[once(bus, "ready")]] لما [[error]] يحصل الأول بيترفض، والـ catch بيطبع [[once rejected: db down]]. والترتيب: [[before emit]] ثم الـ listenerين ثم [[after emit 2]]، لأن الـ emit sync.`,
          solCode: R`import { EventEmitter, once } from "node:events";

const bus = new EventEmitter();
setTimeout(() => bus.emit("error", new Error("db down")), 10);

try {
  await once(bus, "ready");
} catch (err) {
  console.log("once rejected:", err.message);
}

bus.on("order", (o) => console.log("email for", o.id));
bus.on("order", (o) => console.log("invoice for", o.id));
console.log("before emit");
bus.emit("order", { id: 7 });
console.log("after emit", bus.listenerCount("order"));`
        },
        {
          cmd: "worker_threads",
          title: "حساب تقيل من غير ما السيرفر يقف",
          desc: R`Node بيشغّل الـ JavaScript بتاعك على thread واحد. أي حساب CPU تقيل (hash كتير، صورة، ملف ضخم بيتعمله parse) بيوقف كل حاجة تانية لحد ما يخلص: ولا request تترد ولا timer يشتغل. [[worker_threads]] بتشغّل الحساب ده على thread تاني ليه event loop بتاعه، وبتكلّمه بـ [[postMessage]].

الدرس ده الفكرة بس. إمتى worker ولا cluster ولا كذا نسخة ورا load balancer في «تاب Backend بـ Node».`,
          example: R`import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";

function fib(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
}

if (isMainThread) {
  const tick = setInterval(() => console.log("main thread still responsive"), 200);
  const worker = new Worker(new URL(import.meta.url), { workerData: 38 });
  worker.once("message", (result) => {
    console.log("fib =", result);
    clearInterval(tick);
  });
  worker.once("error", (err) => console.error("worker crashed:", err));
} else {
  parentPort.postMessage(fib(workerData));
}`,
          try: R`شغّله وعدّ رسايل «still responsive». بعدين اكتب نسخة بتحسب [[fib(38)]] على الـ main thread مباشرة بنفس الـ [[setInterval]]، وقارن. وجرّب 40 بدل 38 في الاتنين.`,
          flag: "script",
          deep: {
            why: R`سيرفر Node بيخدم آلاف الطلبات على thread واحد لأن أغلب الشغل انتظار (قاعدة، network) والانتظار مبيوقفش حاجة. بس request واحد بيعمل حساب تقيل بيوقف كل الباقيين. والـ async مش بيحل ده: [[async function]] فيها حساب sync لسه بتوقف الـ thread.`,
            how: R`[[new Worker(file)]] بيشغّل الملف في thread جديد: V8 isolate لوحده، بذاكرته و event loop بتاعه. في المثال نفس الملف بيشتغل مرتين، و [[isMainThread]] بيفرّق: الـ main بيعمل worker، والـ worker بيحسب.

[[workerData]] بيوصل للـ worker وقت إنشائه، و [[parentPort.postMessage]] بيرجّع النتيجة، والـ main بيستقبلها بـ [[message]] event (EventEmitter تاني). الداتا بتتنسخ (structured clone) مش بتتشارك، زي Web Workers في المتصفح (في «تاب JavaScript»). ولمشاركة فعلية فيه [[SharedArrayBuffer]]، ونادرًا ما تحتاجه.

إنشاء worker ليه تكلفة (عشرات الميلي ثانية وذاكرة)، فلو هتعمل ده مع كل request، استخدم pool (مكتبة زي [[piscina]]) بعدد قريب من [[os.availableParallelism()]].

والـ I/O مش محتاج workers: قراية ملفات و network و queries بتتعمل في الخلفية أصلًا (libuv). الـ worker للـ CPU بس.`,
            when: "حساب CPU أكتر من عشرات الميلي ثانية جوه سيرفر: توليد PDF أو صور في الذاكرة، ضغط، parse لملفات كبيرة، hash كتير. لو ينفع يستنى، job في queue أحسن. ولو عايز كل الـ cores تخدم requests، كذا process (cluster أو pm2 أو كذا container) مش workers.",
            mistakes: R`تستخدم worker لـ I/O (query أو fetch) فتزود تعقيد من غير فايدة. وتعمل worker جديد لكل request. وتفتكر إن الـ objects بتتشارك فتعدّل في object في الـ worker وتستنى التغيير يبان في الـ main.

سؤال انترفيو: «Node single-threaded؟»: الـ JavaScript بتاعك على thread واحد، بس libuv عنده thread pool للـ I/O التقيل (fs و dns و crypto)، و worker_threads بتدّيك threads لكودك.`
          },
          lines: [
            "أدوات الـ workers.",
            "حساب CPU تقيل عمدًا (recursion من غير cache).",
            "الحالة الأساسية أو مجموع اللي قبلها.",
            "قفلة.",
            "لو ده الـ main thread...",
            "...timer يثبت إن الـ main لسه بيرد.",
            "شغّل نفس الملف في worker، وابعتله 38.",
            "لما النتيجة توصل...",
            "...اطبعها...",
            "...ووقّف الـ timer (فالعملية تخلص).",
            "قفلة.",
            "لو الـ worker وقع.",
            "وإلا (احنا جوه الـ worker)...",
            "...احسب وابعت النتيجة للـ main.",
            "قفلة."
          ],
          sol: R`بالـ worker: رسالتين أو تلاتة «main thread still responsive» (كل ٢٠٠ms والحساب بياخد حوالي نص ثانية) وبعدين [[fib = 39088169]]. الـ main كان فاضي يرد طول الوقت.

على الـ main مباشرة: [[fib = 39088169]] و [[fib: ~400ms]] ومفيش ولا رسالة، لأن الـ timer مقدرش يشتغل والـ thread مشغول، والحساب خلص قبل ما نلغي الـ interval. مع 40 الفرق أوضح: ثانية أو أكتر متوقف.

الغلط الشائع إنك تحط [[async]] قدام [[fib]] وتفتكر ده هيحل المشكلة. الحساب sync ولسه هيوقف الـ thread.`,
          solCode: R`function fib(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
}

const tick = setInterval(() => console.log("main thread still responsive"), 200);
console.time("fib");
console.log("fib =", fib(38));
console.timeEnd("fib");
clearInterval(tick);
// fib = 39088169
// fib: 409.174ms   (ولا رسالة responsive)`
        }
      ]
    },
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
    },
    {
      t: "Prisma في مشروع Node",
      l: 3,
      n: "الكلاينت المتولّد، والـ migrations وقت التشغيل، وليه db push مكانه جهازك بس (تفاصيل migrate في تاب PostgreSQL)",
      items: [
        {
          cmd: "prisma generate",
          title: "الكلاينت اللي بيتولّد من الـ schema",
          desc: R`الكود اللي بتكتب بيه [[prisma.user.findMany()]] مش مكتوب في المكتبة، ده بيتولّد من [[schema.prisma]] بأمر [[prisma generate]]. عدّلت الـ schema أو سطّبت من الأول؟ generate تاني، وإلا الكود بيشتغل بأنواع قديمة أو بيقع بـ [[did not initialize yet]].

وgenerate مش محتاج يتصل بالقاعدة، فمفيش داعي تدّي الـ build أي سر.`,
          example: R`npx prisma validate
npx prisma format
npx prisma generate
pnpm exec prisma generate
npm pkg set scripts.postinstall="prisma generate"`,
          try: "ضيف حقل جديد في model في schema.prisma، وجرّب تستخدمه في الكود قبل generate وشوف خطأ الأنواع، وبعدين generate وشوفه اختفى.",
          deep: {
            why: "Prisma بيديك أنواع مظبوطة لكل جدول وعمود، والتمن إن الكود ده لازم يتولّد. أغلب أخطاء Prisma الغريبة بعد pull أو في Docker سببها generate متعملش، أو اتعمل على schema قديمة.",
            how: R`[[validate]] بيتأكد إن الـ schema سليمة، و [[format]] بينسّقها. [[generate]] بيقرا الـ schema ويكتب كود الكلاينت: في Prisma 7 بالـ generator الجديد [[prisma-client]] بيتكتب في فولدر انت محدده بـ [[output]] (زي src/generated/prisma) وبتستورد منه، وفي النسخ القديمة كان بيتكتب جوه [[node_modules/.prisma/client]].

إمتى تشغّله: بعد أي تعديل في الـ schema، وبعد تسطيب من الصفر (CI و Docker)، وقبل [[next build]] أو [[tsc]]. ومن Prisma 7 [[migrate dev]] مبقاش بيعمله لوحده.

[[postinstall]] بيخليه يتعمل بعد كل install لوحده، ودي أسهل طريقة تضمن إن محدش ينساه. في Dockerfile: [[RUN npx prisma generate && npm run build]] في مرحلة الـ build.

مع pnpm 10: لو Prisma محتاج سكربت تسطيب ومش متوافق عليه في approve-builds، الـ generate أو الـ engines ممكن يبقوا ناقصين.`,
            when: "بعد كل تعديل في schema.prisma، وفي كل build نضيف.",
            mistakes: R`في مشروع حقيقي كان الـ Dockerfile فيه [[ARG DATABASE_URL]] و [[ENV DATABASE_URL]] عشان generate يشتغل، والسر اتحفظ في طبقات الـ image. generate مش محتاج اتصال: شيلهم، ولو prisma.config.ts بيطلب المتغير حط قيمة وهمية في الـ build بس، والحقيقي وقت التشغيل. وغلطة تانية: الفولدر المتولّد داخل Git، فكل واحد في الفريق عنده نسخة مختلفة شوية.`
          },
          lines: [
            "اتأكد إن الـ schema سليمة.",
            "نسّقها.",
            "ولّد الكلاينت من الـ schema.",
            "نفس الحاجة في مشروع pnpm.",
            "خليه يتولّد لوحده بعد كل install."
          ],
          sol: R`لو ضفت [[phone String?]] في [[model User]] وكتبت [[user.phone]] في الكود قبل generate، الـ editor و [[tsc --noEmit]] بيقولوا [[error TS2339: Property 'phone' does not exist on type '{ name: string; id: number; email: string; role: string; }'.]]، ولو استخدمته في [[create]] أو [[where]]: [[Object literal may only specify known properties, and 'phone' does not exist in type ...]].

بعد [[npx prisma generate]] (بيطبع [[✔ Generated Prisma Client (7.10.0) to ./generated/prisma]] أو المسار عندك) الخطأ بيختفي، لأن الأنواع اتولّدت من الـ schema الجديدة. أحيانًا VS Code محتاج [[TypeScript: Restart TS Server]] عشان ياخد باله.

خلي بالك إن generate بيحدّث الكود بس، مش القاعدة: لو شغّلت الكود هتاخد error إن العمود مش موجود لحد ما تعمل migration. والغلط الشائع إنك تنسى generate بعد [[git pull]] فيه تغيير في الـ schema، ودا اللي [[postinstall]] في المثال بيحله.`
        },
        {
          cmd: "prisma db push",
          title: "مزامنة الـ schema من غير migrations، وليه خطر",
          desc: R`[[db push]] بيقارن الـ schema بالقاعدة ويعدّلها على طول: من غير ملف migration ولا تاريخ. ممتاز وانت بتجرّب شكل الجداول على جهازك. و [[--accept-data-loss]] بيوافق مقدمًا على أي تغيير بيمسح داتا، من غير ما يسألك.

الاتنين مكانهم جهاز التطوير. الإنتاج بياخد [[migrate deploy]] بس.`,
          example: R`npx prisma db push
npx prisma db push --accept-data-loss
# الغلطة: أمر تشغيل الـ container في الإنتاج
# command: sh -c "npx prisma db push --accept-data-loss && node src/server.js"
# الصح:
# command: sh -c "npx prisma migrate deploy && node src/server.js"`,
          try: "على قاعدة تجربة: اعمل model فيه عمود name وضيف كام صف، وغيّر اسمه لـ fullName، وشغّل db push واقرا التحذير. بعدها جرّب بـ --accept-data-loss وشوف الداتا راحت فين.",
          flag: "danger",
          deep: {
            why: "db push مريح جدًا: تعدّل الـ schema، أمر واحد، والقاعدة زيها. عشان كده بيتسرّب لسكربتات التشغيل. وهناك بيبقى قنبلة: أول تعديل بيمسح عمود، بيمسح داتا العملاء مع أول deploy.",
            how: R`db push مبيعرفش نيتك. لو غيّرت اسم عمود من [[name]] لـ [[fullName]]، هو شايف عمود اتشال وعمود جديد اتضاف، فبيعمل DROP للقديم و ADD للجديد، والداتا بتروح. نفس الحاجة لو غيّرت نوع عمود بطريقة مش متوافقة.

من غير الفلاج: لو فيه خسارة داتا، بيوقف ويسأل. وفي container مفيش حد يجاوب، فبيفشل والـ deploy يقف، ودي بالظبط الحماية. الفلاج بيشيلها.

[[migrate deploy]] مختلف: بيطبّق ملفات SQL اتكتبت واتراجعت واتعملها commit، بالترتيب، وبيسجّل اللي اتطبق. محدش بيولّد حاجة وقت الـ deploy.

لو القاعدة اتعملت بـ db push وعايز تنقل لـ migrations: ولّد migration أولى من الـ schema بـ [[prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script]] في [[prisma/migrations/0_init/migration.sql]]، وعلّمها متطبقة بـ [[prisma migrate resolve --applied 0_init]]. التفاصيل في تاب PostgreSQL.`,
            when: "db push على جهازك وانت لسه بتصمم الجداول، أو قاعدة تجربة بتترمي. مش على أي قاعدة فيها داتا حد محتاجها.",
            mistakes: R`في مشروع حقيقي كان أمر تشغيل الـ backend في docker-compose: [[npx prisma db push --accept-data-loss && node src/server.js]]. يعني مع كل restart أو deploy، أي تغيير في الـ schema بيتطبق فورًا ومن غير سؤال، ولو فيه rename لعمود الداتا بتتمسح. والصح migrate deploy في نفس المكان. وقريب منه [[prisma migrate reset]]: بيمسح القاعدة كلها ويعيد بناها، فاتأكد إن DATABASE_URL مش بيشاور على الإنتاج قبل ما تشغّله.`
          },
          lines: [
            "طابق القاعدة مع الـ schema، ويسأل لو فيه مسح.",
            "نفسه، ويوافق على المسح من غير سؤال (تجربة بس)."
          ],
          sol: R`مع model فيه [[name String]] وصفّين، ولما تغيّره لـ [[fullName String]] (مطلوب):

[[⚠️ We found changes that cannot be executed:]] و [[Added the required column fullName to the User table without a default value. There are 2 rows in this table, it is not possible to execute this step.]] يعني مينفعش أصلًا، و [[--accept-data-loss]] مش هيحلها (الـ CLI بيقترح [[--force-reset]] اللي بيمسح القاعدة كلها).

لو خليته [[fullName String?]]: [[⚠️ There might be data loss when applying the changes:]] و [[You are about to drop the column name on the User table, which still contains 2 non-null values.]] و [[Use the --accept-data-loss flag to ignore the data loss warnings]]. مع [[--accept-data-loss]]: عمود [[name]] اتمسح بالداتا، و [[fullName]] اتعمل فاضي ([[null]] في الصفين). الداتا راحت، مش اتنقلت، لأن db push مش بيعرف إن دا rename.

ودا سبب إنه مينفعش في الإنتاج: rename بسيط بقى مسح. الصح migration بـ [[RENAME COLUMN]]. ولاحظ إن نسخ Prisma الجديدة ممكن ترفض الـ flag ده لو حسّت إنها شغالة من agent آلي، وتطلب موافقة صريحة من الإنسان.`
        },
        {
          cmd: "migrate deploy قبل السيرفر",
          title: "فين تشغّل الـ migrations في الإنتاج",
          desc: R`[[prisma migrate deploy]] لازم يتشغّل قبل الكود الجديد ما يقوم، وإلا الكود يطلب عمود لسه مش موجود. يا إما خطوة في الـ deploy قبل ما تشغّل التطبيق، يا إما أول سطر في الـ entrypoint.

والمهم في الحالتين: لو الـ migration فشلت، السيرفر ميقومش.`,
          example: R`npx prisma migrate status
docker compose run --rm app npx prisma migrate deploy
docker compose up -d app
docker compose logs --tail 50 app
# أو في entrypoint.sh:
# npx prisma migrate deploy && exec node server.js`,
          try: "في مشروع تجربة بـ compose: اعمل migration جديدة، وارفعها، وطبّقها بـ [[docker compose run --rm]] قبل [[up -d]]، وبعدين [[migrate status]] يقول كله متطبق.",
          deep: {
            why: "الكود والقاعدة لازم يتحركوا مع بعض. deploy الكود من غير migration = أخطاء في كل request. و migration بتفشل في صمت = نفس النتيجة، بس انت فاكر كله تمام.",
            how: R`[[migrate status]] بيقولك إيه اللي لسه متطبقش، اقراه قبل أي deploy.

الطريقة الأولى، خطوة منفصلة: [[docker compose run --rm app npx prisma migrate deploy]] بيشغّل container مؤقت من نفس الـ image، يطبّق ويخرج. لو فشل، الـ && في سكربت الـ deploy بتوقف قبل [[up -d]]، والنسخة القديمة لسه شغالة.

الطريقة التانية، في الـ entrypoint: [[migrate deploy && exec node server.js]]. بسيطة، بس بتتشغّل مع كل restart، ومحتاجة Prisma CLI جوه image الإنتاج (وده مش موجود في standalone ولا مع omit=dev)، ولو عندك أكتر من نسخة من التطبيق الكل بيحاول مع بعض (Prisma بيقفل بـ lock فواحدة بس بتطبّق، والباقي بيستنى لحد 10 ثواني بس، ولو الـ migration طوّلت أكتر بيفشلوا).

[[exec]] بيخلي node ياخد مكان الشيل كـ PID 1، فيستلم SIGTERM من Docker ويقفل نضيف.`,
            when: "كل deploy فيه migration جديدة. والخطوة المنفصلة أحسن أول ما يبقى عندك CI أو أكتر من نسخة.",
            mistakes: R`في مشروع حقيقي كان الـ entrypoint: [[node scripts/auto-migrate.mjs || echo "schema sync skipped"]]. الـ [[|| echo]] بتبلع الفشل، فالسيرفر يقوم على schema قديمة وكل request يضرب error. ده غير إن السكربت كان بيشتغل مع كل تشغيل container بتوكن إدارة كامل للقاعدة، وكان فيه ملفين entrypoint واحد بيشاور على .js والتاني على .mjs. خليها [[&&]] من غير أي fallback.`
          },
          lines: [
            "إيه اللي لسه متطبقش.",
            "طبّق في container مؤقت من نفس الـ image، ويتمسح بعدها.",
            "وبعد ما نجح بس، شغّل النسخة الجديدة.",
            "اتأكد إنه قام من غير أخطاء قاعدة."
          ],
          sol: R`[[docker compose run --rm app npx prisma migrate deploy]] بيطبع اسم كل migration جديدة و [[All migrations have been successfully applied.]] (ولو مفيش جديد: [[No pending migrations to apply.]]). وبعد [[up -d]]، [[npx prisma migrate status]] بيقول [[Database schema is up to date!]]، واللوج بتاع app مفيهوش errors عن أعمدة ناقصة.

ليه [[run --rm]] الأول: لو الـ migration فشلت، السيرفر القديم لسه شغال على الـ schema القديمة، والجديد ما اتشغلش على schema ناقصة. [[--rm]] بيمسح الـ container المؤقت بعد ما يخلص.

الأخطاء الشائعة: [[P3009 migrate found failed migrations in the target database]] يعني migration سابقة وقعت في النص؛ اقرا الـ error، صلّح القاعدة، و [[prisma migrate resolve]]. و [[P1001 Can't reach database server]] يعني الـ app مش شايف الـ db (اسم الـ service في DATABASE_URL أو الـ db لسه مقامتش). ولو [[migrate status]] قال فيه migrations مش متطبقة، يبقى الـ image اللي عملت منها run قديمة ومفيهاش ملفات الـ migrations الجديدة: اعمل build الأول.`
        },
        {
          cmd: "prisma db seed و studio",
          title: "بيانات أولية وواجهة تتصفّح بيها القاعدة",
          desc: R`[[db seed]] بيشغّل سكربت بيحط بيانات البداية: أدمن، وتصنيفات، وإعدادات. أمره بيتكتب مرة في الإعدادات وأي حد في الفريق يشغّله بنفس الشكل. و [[studio]] بيفتح واجهة ويب على [[localhost:5555]] تشوف وتعدّل فيها الداتا.

الاتنين للتطوير. على السيرفر بحذر شديد، و studio عمره ما يتفتح للنت.`,
          example: R`npx prisma db seed
node --env-file=.env prisma/seed.js
npx prisma studio
npx prisma studio --port 5556 --browser none
ssh -L 5555:localhost:5555 deploy@203.0.113.10`,
          try: "اكتب seed بيعمل أدمن بـ upsert، وشغّله مرتين، واتأكد إن مفيش أدمن مكرر. وبعدين افتح studio وشوفه.",
          deep: {
            why: "كل واحد جديد في الفريق، وكل قاعدة تجربة بعد reset، محتاجة نفس البيانات الأولية. من غير seed كل واحد بيعملها بإيده وبشكل مختلف.",
            how: R`أمر الـ seed بيتعرّف مرة: في Prisma 7 جوه [[prisma.config.ts]] تحت [[migrations.seed]] (زي [[node --env-file=.env prisma/seed.js]] أو [[tsx prisma/seed.ts]])، وفي النسخ القديمة في package.json تحت [[prisma.seed]]. و [[npx prisma db seed]] بينفّذه. ومتعتمدش إنه يتشغّل لوحده بعد migrate، شغّله صريح.

وفي Prisma 7 مع prisma.config.ts ملف .env مش بيتقري لوحده، فيا [[import "dotenv/config"]] في أول الـ config، يا [[--env-file]] في أمر node.

الـ seed لازم يبقى ينفع يتشغّل كذا مرة: [[upsert]] بدل [[create]]، عشان تشغيله تاني ميكررش ولا يقع على unique.

[[studio]] سيرفر ويب صغير بيتصل بالقاعدة اللي في DATABASE_URL. [[--browser none]] ميفتحش متصفح (على سيرفر مثلًا). ولو محتاجه على سيرفر، شغّله هناك واوصله من جهازك بـ SSH tunnel زي آخر سطر، ومتفتحش البورت في الفايروول.`,
            when: "seed بعد أي reset وفي أول تشغيل للمشروع. studio لما تحب تبص على الداتا بسرعة من غير SQL.",
            mistakes: "seed بـ create فالتشغيل التاني يقع أو يكرر. و studio شغال و .env فيه DATABASE_URL بتاع الإنتاج، فتعديل «تجربة» بيتكتب في داتا حقيقية."
          },
          lines: [
            "شغّل أمر الـ seed المتعرّف في الإعدادات.",
            "أو شغّل السكربت مباشرة وهو بيقرا .env.",
            "افتح الواجهة على localhost:5555.",
            "على بورت تاني ومن غير ما يفتح متصفح.",
            "من جهازك: وصّل 5555 على السيرفر لجهازك عبر SSH بدل ما تفتحه للنت."
          ],
          sol: R`الحل: [[upsert]] بالـ email كـ where (والعمود لازم يكون [[@unique]]). أول مرة بيعمل الأدمن ويطبع [[admin id 1]] و [[🌱  The seed command has been executed.]]، والتانية بيلاقيه فبيعمل update (هنا فاضي فمبيغيرش حاجة). بعد تشغيلين [[SELECT count(*) FROM "User" WHERE email = 'admin@example.com']] بيرجّع [[1]]، و Studio على [[http://localhost:5555]] بيعرض صف واحد.

لو استخدمت [[create]] بدل upsert: التشغيل التاني يقع بـ [[Unique constraint failed on the fields: (email)]] (P2002)، ولو email مش unique، هيعمل أدمن تاني بصمت، ودا الأسوأ.

وفي Prisma 7 أمر الـ seed بيتكتب في [[prisma.config.ts]] ([[migrations: { seed: "node prisma/seed.js" }]])، لو [[npx prisma db seed]] قال إنه مش لاقي seed command يبقى الإعداد ناقص، شغّله مباشرة بـ [[node --env-file=.env prisma/seed.js]].`,
          solCode: R`// prisma/seed.ts (Prisma 7: generator "prisma-client" بـ output = "../generated/prisma")
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

const admin = await prisma.user.upsert({
  where: { email: "admin@example.com" },
  update: {},
  create: { email: "admin@example.com", name: "Admin", role: "ADMIN" },
});
console.log("admin id", admin.id);
await prisma.$disconnect();

// prisma.config.ts: migrations: { seed: "node --env-file=.env prisma/seed.ts" }`
        }
      ]
    },
    {
      t: "Webhooks: خلّي Paymob يوصل لجهازك",
      l: 3,
      n: "بوابة الدفع بتبعت callback لسيرفر على النت، وجهازك مش على النت. الـ tunnel بيحل ده",
      items: [
        {
          cmd: "المشكلة",
          title: "ليه localhost مش بيوصل",
          desc: "Paymob وTabby وTamara بعد الدفع بيبعتوا طلب POST لـ URL انت مسجّله عندهم. الـ URL لازم يبقى على النت. [[localhost:3000]] موجود على جهازك بس. الـ tunnel بيعمل عنوان عام مؤقت بيوصّل لجهازك.",
          example: R`curl -X POST http://localhost:3000/webhooks/paymob -H "Content-Type: application/json" -d '{"type":"TRANSACTION","obj":{"success":true,"amount_cents":10000}}'`,
          try: "اعمل route للـ webhook بيطبع req.body، وجرّبه بالأمر ده الأول قبل أي tunnel.",
          deep: {
            why: "بتطوّر الدفع، وكل حاجة شغالة لحد صفحة Paymob، وبعدين مفيش callback. السبب إن Paymob بتبعت للـ URL المسجّل، وده localhost اللي عمره ما هيوصل من سيرفرات Paymob.",
            how: R`الـ webhook مجرد طلب HTTP من سيرفر البوابة لسيرفرك. عشان يوصل، سيرفرك لازم يبقى ليه عنوان عام على النت. جهازك ورا راوتر (NAT) ومفيش عنوان عام يشاور عليه.

الحلول: يا تعمل deploy على staging مع كل تعديل (بطيء)، يا tunnel: برنامج على جهازك بيفتح اتصال لسيرفر على النت، والسيرفر ده بيديك URL عام، وأي طلب يوصله بيبعته جوه الاتصال لجهازك. الطلب بيوصل لـ localhost:3000 كأنه من النت.

بس قبل أي tunnel: الـ curl في المثال بيحاكي الـ webhook. لو الـ route بتاعك مش بيشتغل مع curl من جهازك، مش هيشتغل مع Paymob. اختبر المنطق الأول بـ curl، والـ tunnel بعدين للتكامل الحقيقي.

كل بوابة ليها شكل body مختلف. Paymob بتبعت [[type]] و [[obj]] فيه بيانات المعاملة، و hmac في query string. Tabby و Tamara بيبعتوا JSON مختلف وتوقيع في header. اقرا وثائق كل واحدة.`,
            when: "أول ما تبدأ تطوير أي integration فيه callback: دفع، أو WhatsApp API، أو GitHub webhooks.",
            mistakes: "تسجّل http://localhost في لوحة البوابة وتستنى. وتختبر بالـ tunnel قبل ما الـ route يشتغل مع curl."
          },
          lines: ["حاكي webhook من Paymob على جهازك: POST بـ JSON بنفس شكل اللي بيبعتوه."],
          sol: R`الـ route البسيط: [[app.post("/webhooks/paymob", (req, res) => { console.log(req.body); res.sendStatus(200); })]] مع [[app.use(express.json())]]. الـ curl بيرجّع [[OK]]، والترمنال بتاع السيرفر بيطبع:

[[{ type: 'TRANSACTION', obj: { success: true, amount_cents: 10000 } }]].

لو طبع [[undefined]]: نسيت [[express.json()]]، أو الـ middleware متسجل بعد الـ route. ولو الـ curl رجّع [[Cannot POST /webhooks/paymob]] (404)، المسار أو الـ method مختلف. ولو [[Connection refused]] السيرفر مش شغال أو على بورت تاني.

النقطة: لما دا يشتغل محليًا بـ curl، أي مشكلة بعد ما تحط ngrok تبقى في الـ tunnel أو إعدادات Paymob، مش في الكود. مش هتحتاج تعمل دفعة حقيقية عشان تختبر كل تعديل.`,
          solCode: R`import express from "express";
const app = express();
app.use(express.json());
app.post("/webhooks/paymob", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});
app.listen(3000);`
        },
        {
          cmd: "ngrok",
          title: "tunnel في ثانية",
          desc: "[[ngrok http 3000]] بيديك URL عام زي [[https://a1b2.ngrok-free.app]] بيوصّل لبورت 3000 عندك. تحطه في إعدادات Paymob كـ callback. وعلى [[localhost:4040]] لوحة بتوريك كل طلب وصل وبتعيد إرساله.",
          example: R`ngrok config add-authtoken TOKEN
ngrok http 3000
ngrok http 3000 --url=https://myapp.ngrok-free.dev
curl -s localhost:4040/api/requests/http | jq '.requests[0].request.uri'`,
          try: "شغّل ngrok وافتح الـ URL من موبايلك على الداتا (مش الواي فاي) واتأكد إنه فتح سيرفرك.",
          deep: {
            why: "أسرع طريقة تخلي جهازك على النت لدقايق. أمر واحد و URL جاهز تحطه في Paymob.",
            how: R`[[ngrok http 3000]] بيفتح اتصال لسيرفرات ngrok، وبيطبع URL عام. أي طلب على الـ URL ده بيتبعت لـ localhost:3000 عندك. HTTPS جاهز، وده مهم لأن البوابات بترفض http.

الـ authtoken مرة واحدة بعد التسجيل (مجاني). من غيره ngrok مش هيفتح tunnel أصلًا.

في الخطة المجانية الـ URL عشوائي وبيتغير كل مرة، فبتغيّره في لوحة Paymob كل مرة. كل حساب مجاني بياخد dev domain ثابت واحد (على ngrok-free.dev) تلاقيه في اللوحة، وتشغّله بـ [[--url]] (بديل [[--domain]] القديم).

الأقوى في ngrok: لوحة [[localhost:4040]]. بتعرض كل طلب وصل بالـ headers والـ body والرد، وزرار Replay بيعيد إرسال نفس الطلب لسيرفرك من غير ما تعمل دفعة جديدة. والـ API بتاعتها على [[/api/requests/http]] بتديك نفس المعلومات كـ JSON.

الطلبات بتعدّي على سيرفرات ngrok، فمتستخدمهوش لبيانات حقيقية حساسة. للتطوير بس.`,
            when: "تطوير أي webhook. وتوريك شغلك لعميل قبل الـ deploy.",
            mistakes: "تنسى ngrok شغال وتقفل الترمنال والـ URL يموت، والبوابة تفضل تبعت لعنوان ميت. وتستخدم الـ URL العشوائي في staging."
          },
          lines: [
            "التوكن مرة واحدة بعد التسجيل.",
            "افتح tunnel لبورت 3000، وخد الـ URL اللي يطلع.",
            "بدومين ثابت من ngrok بدل العشوائي.",
            "من API اللوحة: مسار آخر طلب وصل."
          ],
          sol: R`[[ngrok http 3000]] بيفتح شاشة فيها [[Forwarding https://xxxx.ngrok-free.app -> http://localhost:3000]] (الدومين ممكن يبقى ngrok-free.app أو ngrok-free.dev حسب الحساب)، و [[Web Interface http://127.0.0.1:4040]].

من الموبايل على الداتا: أول مرة في الخطة المجانية بتظهر صفحة تحذير من ngrok إنك رايح لموقع حد تاني، وزرار [[Visit Site]]. بعده بتشوف رد سيرفرك، وفي شاشة ngrok في الترمنال السطر [[GET / 200 OK]]. الداتا مش الواي فاي عشان تتأكد إن الطلب فعلًا جاي من الإنترنت، مش من شبكتك.

لو [[ERR_NGROK_4018]] يبقى محتاج [[ngrok config add-authtoken]]. ولو الموبايل شاف [[502 Bad Gateway]] أو صفحة ngrok بتقول مش قادر يوصل لـ localhost:3000، سيرفرك مش شغال أو على بورت تاني. والـ webhooks من Paymob مش بتتأثر بصفحة التحذير لأنها مش متصفح.`
        },
        {
          cmd: "cloudflared",
          title: "tunnel مجاني وثابت",
          desc: "Cloudflare Tunnel بديل مجاني، وبيديك دومين ثابت لو ربطته بدومين عندك على Cloudflare. [[--url]] للتجربة السريعة بعنوان عشوائي. والـ named tunnel للاستخدام المتكرر بعنوان زي [[dev.example.com]].",
          example: R`cloudflared tunnel --url http://localhost:3000
cloudflared tunnel login
cloudflared tunnel create dev
cloudflared tunnel route dns dev dev.example.com
cloudflared tunnel run dev`,
          try: "اعمل named tunnel على subdomain، وحطه مرة واحدة في Paymob، ومش هتغيّره تاني.",
          deep: {
            why: "ngrok المجاني ليه حدود، ولو عندك دومين على Cloudflare أصلًا، الـ tunnel بتاعهم مجاني بالكامل وبيديك subdomain ثابت.",
            how: R`[[cloudflared tunnel --url http://localhost:3000]] زي ngrok بالظبط: URL عشوائي على trycloudflare.com، من غير حساب حتى.

الـ named tunnel للاستخدام المتكرر: [[login]] بيربط بحسابك، [[create dev]] بيعمل tunnel اسمه dev ويحفظ credentials في ملف، [[route dns dev dev.example.com]] بيعمل سجل DNS في Cloudflare يشاور على الـ tunnel، و [[run dev]] بيشغّله.

والـ tunnel محتاج ملف config يقول أنهي hostname يروح لأنهي بورت محلي: [[~/.cloudflared/config.yml]] فيه [[ingress]] بـ hostname و service.

النتيجة: [[dev.example.com]] ثابت، بتحطه في Paymob مرة واحدة. وممكن تحطه على السيرفر كخدمة (cloudflared service install) لو عايز تعرّض خدمة من سيرفر من غير ما تفتح بورت في الفايروول أصلًا، وده استخدام أمني قوي.

ومع Cloudflare Access تقدر تحط تسجيل دخول قبل الـ URL، فمحدش يوصل لجهازك غيرك (بس الـ webhook محتاج استثناء للمسار بتاعه).`,
            when: "لو عندك دومين على Cloudflare. ولتعريض خدمات داخلية من السيرفر بأمان.",
            mistakes: "route dns لدومين مش على Cloudflare nameservers. وتنسى ingress في config فيطلع 404 من Cloudflare."
          },
          lines: [
            "tunnel سريع بعنوان عشوائي من غير حساب.",
            "اربط بحسابك على Cloudflare.",
            "اعمل tunnel اسمه dev.",
            "اعمل سجل DNS يشاور عليه.",
            "شغّله (بعد ملف config فيه ingress)."
          ],
          sol: R`الخطوات: [[cloudflared tunnel login]] (بتختار الدومين من المتصفح)، [[cloudflared tunnel create dev]] بيطبع [[Created tunnel dev with id <uuid>]] وبيعمل ملف credentials [[~/.cloudflared/<uuid>.json]]، و [[cloudflared tunnel route dns dev dev.example.com]] بيعمل CNAME في Cloudflare. وبعدين [[~/.cloudflared/config.yml]]:

[[tunnel: <uuid>]] و [[credentials-file: /home/you/.cloudflared/<uuid>.json]] و [[ingress]] فيها [[hostname: dev.example.com]] و [[service: http://localhost:3000]] وآخر قاعدة [[service: http_status:404]]. [[cloudflared tunnel run dev]] بيطبع [[Registered tunnel connection]] (عادة ٤ اتصالات)، و [[https://dev.example.com]] بيفتح سيرفرك. حط الرابط ده في Paymob مرة واحدة.

لو فتح 404 من Cloudflare: الـ ingress ناقصة أو الـ hostname فيها مختلف. ولو DNS مش بيتحل، الدومين مش على nameservers بتاعة Cloudflare.`,
          solCode: R`# ~/.cloudflared/config.yml
tunnel: <TUNNEL-UUID>
credentials-file: /home/you/.cloudflared/<TUNNEL-UUID>.json
ingress:
  - hostname: dev.example.com
    service: http://localhost:3000
  - service: http_status:404`
        },
        {
          cmd: "التحقق من التوقيع",
          title: "متصدقش أي POST",
          desc: "أي حد يعرف الـ URL يقدر يبعت JSON يقول «الدفع نجح». البوابة بتبعت توقيع HMAC محسوب بمفتاح سري انت بس اللي عارفه. لازم تحسبه عندك وتقارن، وإلا حد يفعّل طلبات من غير ما يدفع.",
          example: R`import crypto from "node:crypto";

export function verifyPaymob(obj, receivedHmac, secret) {
  const fields = ["amount_cents","created_at","currency","error_occured","has_parent_transaction","id","integration_id","is_3d_secure","is_auth","is_capture","is_refunded","is_standalone_payment","is_voided","order.id","owner","pending","source_data.pan","source_data.sub_type","source_data.type","success"];
  const get = (o, path) => path.split(".").reduce((a, k) => (a == null ? a : a[k]), o);
  const concat = fields.map((f) => String(get(obj, f))).join("");
  const expected = crypto.createHmac("sha512", secret).update(concat).digest("hex");
  if (typeof receivedHmac !== "string" || receivedHmac.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(receivedHmac));
}`,
          try: "ابعت webhook بدون hmac أو بـ hmac غلط واتأكد إن الـ route بيرفض بـ 401 مش بيفعّل الطلب.",
          flag: "script",
          deep: {
            why: R`الـ webhook URL بتاعك عام. أي حد يعرفه (أو يخمّنه) يقدر يبعت POST فيه [["success": true]] ويفعّل طلب من غير ما يدفع. التوقيع هو الدليل إن الطلب من Paymob فعلًا.`,
            how: R`HMAC: البوابة بتاخد بيانات المعاملة، وبتلزقهم في نص واحد بترتيب محدد، وبتحسب hash منه بمفتاح سري (الـ HMAC secret اللي في لوحة Paymob). وبتبعت الـ hash ده مع الطلب.

انت عندك نفس المفتاح. بتعمل نفس الحسبة بالبيانات اللي وصلتك. لو طلع نفس الـ hash، يبقى البيانات متغيرتش واللي بعتها عنده المفتاح. لو حد غيّر [[success]] أو المبلغ، الـ hash هيختلف.

Paymob بتحدد ترتيب الحقول بالظبط (اللي في المثال، أبجدي)، والفصل بينهم مفيش، والقيم كـ نصوص ([[true]] بتبقى "true"). والحقول المتداخلة زي [[order.id]] بتتقري من جوه. الترتيب ده من وثائقهم ولازم يبقى مطابق حرفيًا.

[[timingSafeEqual]] بدل [[===]]: المقارنة العادية بتوقف عند أول حرف مختلف، فوقتها بيكشف قد إيه التخمين قريب (timing attack). دي بتاخد نفس الوقت دايمًا.

Tabby و Tamara بيبعتوا التوقيع في header وبيحسبوه على الـ body الخام، فمحتاج [[express.raw()]] للمسار ده عشان تاخد الـ body قبل ما يتعمله parse.`,
            when: "كل webhook بيأثر على فلوس أو صلاحيات. من غير استثناء.",
            mistakes: "تقارن بـ ===. وتعمل parse للـ body قبل التحقق في البوابات اللي بتوقّع على الـ raw body، فالتوقيع يفشل دايمًا."
          },
          lines: [
            "مكتبة التشفير المبنية في Node.",
            "الدالة: بيانات المعاملة، والتوقيع اللي وصل، والمفتاح السري.",
            "الحقول بالترتيب اللي Paymob بتحدده (من وثائقهم، حرفيًا).",
            "دالة تقرا حقل متداخل زي order.id بأمان.",
            "الزق قيم الحقول كنصوص من غير فواصل.",
            "احسب HMAC-SHA512 بالمفتاح.",
            "لو الـ hmac مش موجود أو طوله غلط ارفض على طول، لأن timingSafeEqual بيضرب error لو الطولين مختلفين.",
            "قارن بطريقة بتاخد وقت ثابت (مش ===).",
            "قفلة."
          ],
          sol: R`جرّبتها على route فيه [[verifyPaymob]] والـ secret [[test-secret]]، وحسبت الـ hmac الصح بنفس الدالة للـ body ده. النتيجة بالترتيب: من غير [[?hmac]] [[401]]، بـ [[?hmac=abc]] [[401]]، بالـ hmac الصح [[200]] وطبع [[activate order 777]].

من غير hmac الدالة بترجع false قبل ما تحسب حاجة ([[typeof receivedHmac !== "string"]])، و [[abc]] بترجع false من فحص الطول قبل [[timingSafeEqual]] (اللي بيرمي error لو الأطوال مختلفة). والمهم إن الـ route بيرجع 401 وبيخرج قبل أي تعديل في القاعدة.

الأخطاء الشائعة: تستخدم الـ API key بدل الـ HMAC secret من لوحة Paymob فكل الطلبات الحقيقية تطلع 401. أو تغيّر ترتيب الحقول أو تنسى [[order.id]] المتداخل. أو تقارن بـ [[===]] وتنسى إن الرد 200 لازم ميبقاش قبل التحقق.`,
          solCode: R`// sign.js: يحسب الـ hmac الصح لـ body تجربة (نفس خوارزمية verifyPaymob)
import { readFileSync } from "node:fs";
import crypto from "node:crypto";
const tx = JSON.parse(readFileSync(0, "utf8")).obj;
const fields = ["amount_cents","created_at","currency","error_occured","has_parent_transaction","id","integration_id","is_3d_secure","is_auth","is_capture","is_refunded","is_standalone_payment","is_voided","order.id","owner","pending","source_data.pan","source_data.sub_type","source_data.type","success"];
const get = (o, p) => p.split(".").reduce((a, k) => (a == null ? a : a[k]), o);
console.log(crypto.createHmac("sha512", process.env.PAYMOB_HMAC).update(fields.map((f) => String(get(tx, f))).join("")).digest("hex"));

// الترمنال
BODY='{"type":"TRANSACTION","obj":{"id":12345,"success":true,"amount_cents":10000,"order":{"id":777}}}'
H=$(echo "$BODY" | PAYMOB_HMAC=test-secret node sign.js)
curl -s -o /dev/null -w "%{http_code}\n" -X POST "http://localhost:3000/webhooks/paymob" -H "Content-Type: application/json" -d "$BODY"
curl -s -o /dev/null -w "%{http_code}\n" -X POST "http://localhost:3000/webhooks/paymob?hmac=abc" -H "Content-Type: application/json" -d "$BODY"
curl -s -o /dev/null -w "%{http_code}\n" -X POST "http://localhost:3000/webhooks/paymob?hmac=$H" -H "Content-Type: application/json" -d "$BODY"`
        },
        {
          cmd: "إعادة الإرسال والتكرار",
          title: "idempotency",
          desc: "البوابة بتعيد إرسال الـ webhook لو سيرفرك مردّش بـ 200 في ثواني. فنفس الدفعة ممكن توصلك ٣ مرات. الحل: رد 200 بسرعة، واعمل الشغل بعدين، وسجّل id الدفعة عشان متنفّذش مرتين.",
          example: R`app.post("/webhooks/paymob", async (req, res) => {
  const tx = req.body.obj;
  if (!verifyPaymob(tx, req.query.hmac, process.env.PAYMOB_HMAC)) {
    return res.status(401).end();
  }
  res.status(200).end();
  const seen = await db.payment.findUnique({ where: { gatewayId: String(tx.id) } });
  if (seen) return;
  await db.payment.create({ data: { gatewayId: String(tx.id), amount: tx.amount_cents, ok: tx.success } });
  if (tx.success) await activateOrder(tx.order.id);
});`,
          try: "من لوحة ngrok (localhost:4040) اعمل Replay لنفس الطلب ٣ مرات واتأكد إن الطلب اتفعّل مرة واحدة.",
          flag: "script",
          deep: {
            why: "البوابة مش بتبعت مرة واحدة. لو سيرفرك تأخر في الرد أو رد بـ 500، بتعيد بعد دقيقة، وبعد ٥، وبعد ساعة. فلو الكود بيفعّل الطلب مع كل webhook، العميل بيتفعّله ٣ مرات، أو بيتسجّل ٣ دفعات.",
            how: R`الترتيب في الـ handler مقصود: التحقق من التوقيع الأول، وبعدين [[res.status(200).end()]] فورًا قبل أي شغل تقيل. البوابة بتعتبر 200 «استلمت»، ومش هتعيد. لو استنيت لحد ما تكتب في القاعدة وتبعت إيميل، ممكن تعدّي مهلتهم (ثواني قليلة) ويعيدوا.

بعد الرد، الشغل بيكمّل في نفس الـ handler (Express بيسمح بكده). في الأنظمة الأكبر، بيتحط في queue.

الـ idempotency: كل معاملة ليها [[id]] فريد من البوابة. قبل ما تعمل أي حاجة، دوّر عليه في جدول payments. لو موجود، ده تكرار، اطلع. لو لأ، سجّله وكمّل. الجدول ده هو الحماية من التكرار وهو كمان سجل كامل للدفعات.

و [[gatewayId]] لازم يبقى unique في الـ schema، عشان لو webhookين وصلوا في نفس اللحظة، القاعدة ترفض التاني.

[[tx.success]] بيتفحص بعد التسجيل: الدفعات الفاشلة كمان بتتسجّل، مفيدة في الدعم.`,
            when: "كل webhook handler. والفكرة نفسها لأي عملية ممكن تتكرر: إيميلات، وتفعيل اشتراكات.",
            mistakes: "الشغل قبل الرد فتعدّي المهلة. والتحقق من التكرار بالـ order id بدل transaction id، فمحاولة دفع تانية لنفس الطلب تتعتبر تكرار."
          },
          lines: [
            "مسار الـ webhook.",
            "بيانات المعاملة.",
            "لو التوقيع غلط (Paymob بتبعته في query string)...",
            "...ارفض من غير أي شغل.",
            "قفلة.",
            "رد 200 فورًا عشان ميعيدوش، والشغل بعدين.",
            "دوّرنا على المعاملة دي قبل كده؟",
            "لو أيوه، تكرار، خلاص.",
            "سجّلها (gatewayId لازم unique في الـ schema).",
            "لو نجحت، فعّل الطلب.",
            "قفلة."
          ],
          sol: R`بعد الطلب الأصلي و ٣ Replay من [[localhost:4040]]: كلهم بيرجعوا [[200]] (ودا المطلوب، عشان Paymob يبطّل يعيد)، بس التفعيل حصل مرة واحدة. في تجربتي بنفس الـ id طبع [[activate order 777]] أول مرة، وبعدين [[duplicate 12345]] في كل مرة بعدها، وجدول [[payment]] فيه صف واحد بـ [[gatewayId = "12345"]].

لو الطلب اتفعّل كذا مرة: الـ [[findUnique]] بيدوّر على حقل تاني، أو [[gatewayId]] مش متخزن كنص فالمقارنة فشلت. ولو Replay رجّع 401: ngrok بيعيد نفس الـ URL بالـ query، فغالبًا الـ secret اتغير أو الطلب الأصلي كان 401 أصلًا.

وفيه حالة الـ Replay مش بتمسكها: طلبين في نفس اللحظة، الاتنين يعملوا findUnique قبل ما أي واحد يعمل create. الحماية الحقيقية [[@unique]] على [[gatewayId]] في الـ schema، فالتاني يقع بـ P2002 وتتجاهله.`
        },
        {
          cmd: "لوج الـ webhooks",
          title: "سجّل كل حاجة توصل",
          desc: "لما عميل يقول «دفعت والطلب متفعّلش»، محتاج تعرف الـ webhook وصل أصلًا ولا لأ، وبإيه. سجّل الـ body الخام والـ headers والوقت قبل أي معالجة، في جدول أو ملف.",
          example: R`tail -f logs/webhooks.log | jq .
grep '"id":12345' logs/webhooks.log | jq .
curl -s localhost:4040/api/requests/http | jq '.requests[] | {uri, status: .response.status}'`,
          try: "سجّل كل webhook في ملف JSON lines، وبعدين استخدم jq تلاقي دفعة معينة بالـ id.",
          deep: {
            why: "«دفعت والاشتراك متفعّلش» أصعب شكوى تحلها لو مش عندك سجل. وصل webhook أصلًا؟ بإيه؟ التوقيع فشل؟ من غير لوج بتخمّن.",
            how: R`السجل بيتكتب قبل أي معالجة: الوقت، والمسار، والـ headers المهمة، والـ body الخام كامل، ورقم الرد اللي رجعته. لو التوقيع فشل، بيتسجّل إنه فشل. وده غير جدول payments اللي بيتكتب بعد التحقق.

الصيغة الأنسب JSON lines: سطر لكل حدث، كل سطر JSON كامل. [[tail -f | jq .]] بيعرضه منسّق لايف، و [[grep]] بيلاقي دفعة بالـ id وبعدين jq بيفكّها. وفي الإنتاج نفس الفكرة بجدول webhook_events في القاعدة.

في التطوير، لوحة ngrok هي اللوج: الـ API بتاعتها على 4040 بترجع كل الطلبات، والأمر في المثال بيلخّصها: المسار والـ status اللي رجّعته لكل طلب. أي 4xx أو 5xx هناك هو المشكلة.

والاحتفاظ: ٩٠ يوم على الأقل، لأن نزاعات الدفع بتتفتح بعد أسابيع.`,
            when: "من أول webhook في أي مشروع. مش بعد أول شكوى.",
            mistakes: "تسجّل الـ body بعد ما تعدّل فيه. وتسجّل في console.log بس على سيرفر لوجاته بتتدور كل يوم."
          },
          lines: [
            "تابع اللوج لايف منسّق.",
            "لاقي دفعة بالـ id.",
            "من لوحة ngrok: كل الطلبات ومساراتها والرد اللي رجّعته."
          ],
          sol: R`الحل: سطر [[appendFile("logs/webhooks.log", JSON.stringify({...}) + "\n")]] في أول الـ route قبل أي تحقق، فكل طلب، حتى المرفوض، بيتسجل. في تجربتي ٥ طلبات بنفس الـ id طلّعوا ٥ سطور، و [[grep '"id":12345' logs/webhooks.log | jq .]] بيعرضهم كـ JSON منسّق:

[[{ "at": "2026-09-30T07:55:59.070Z", "id": 12345, "success": true, "hmacOk": false }]] (الأولين كانوا من غير hmac صح) وبعدهم [[hmacOk: true]].

خلي بالك: [[grep '"id":12345']] بيعتمد على إن [[JSON.stringify]] بيكتب من غير مسافات؛ لو كتبت اللوج بإيدك بشكل تاني الـ grep مش هيلاقي. الأدق [[jq 'select(.id == 12345)' logs/webhooks.log]]. ومتسجلش بيانات كارت أو الـ hmac الكامل في اللوج، وحط اللوج في [[.gitignore]].`,
          solCode: R`import { appendFile } from "node:fs/promises";

app.post("/webhooks/paymob", async (req, res) => {
  const tx = req.body.obj;
  const hmacOk = verifyPaymob(tx, req.query.hmac, process.env.PAYMOB_HMAC);
  await appendFile("logs/webhooks.log",
    JSON.stringify({ at: new Date().toISOString(), id: tx?.id, success: tx?.success, hmacOk }) + "\n");
  if (!hmacOk) return res.status(401).end();
  res.status(200).end();
});

// jq 'select(.id == 12345)' logs/webhooks.log`
        },
        {
          cmd: "webhook تيليجرام",
          title: "سجّل عنوان البوت عند تيليجرام وتابعه",
          desc: R`بوت تيليجرام يا بيسأل كل شوية عن رسايل جديدة (polling)، يا تيليجرام بيبعتله كل رسالة على URL (webhook). [[setWebhook]] بيسجّل الـ URL ومعاه [[secret_token]] بيرجع في header مع كل طلب، و [[getWebhookInfo]] بيقولك في رسايل متراكمة ولا لأ، وآخر خطأ حصل.`,
          example: R`source .env
curl -sS "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook" -d "url=https://example.com/telegram/webhook" -d "secret_token=$WEBHOOK_SECRET"
curl -sS "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/getWebhookInfo" | jq .result
curl -sS "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/deleteWebhook?drop_pending_updates=true"`,
          try: "اعمل بوت تجربة من BotFather، وسجّل له webhook على URL من ngrok، وابعت له رسالة، وبعدين [[getWebhookInfo]] وشوف pending_update_count.",
          deep: {
            why: "البوت مبيردش، ومش عارف المشكلة فين: الـ URL متسجّلش؟ تيليجرام بيبعت وسيرفرك بيرد بخطأ؟ الشهادة؟ getWebhookInfo بيجاوب في سطر.",
            how: R`[[setWebhook]] بيقول لتيليجرام «ابعت كل update على الـ URL ده». الـ URL لازم HTTPS بشهادة سليمة، وعلى بورت من 443 أو 80 أو 88 أو 8443 بس. في التطوير URL الـ tunnel بيمشي.

[[secret_token]] قيمة انت بتختارها، وتيليجرام بيبعتها في header اسمه [[X-Telegram-Bot-Api-Secret-Token]] مع كل طلب. سيرفرك يقارنها ويرفض أي طلب من غيرها، نفس فكرة توقيع Paymob.

[[getWebhookInfo]] فيه: [[url]] المتسجّل، و [[pending_update_count]] عدد الرسايل اللي مستنية (لو بيزيد، سيرفرك مش بيرد 200)، و [[last_error_message]] و [[last_error_date]] آخر مرة فشل وليه.

الـ webhook والـ polling ميشتغلوش مع بعض: طول ما فيه webhook، [[getUpdates]] بيرجع خطأ 409. [[deleteWebhook]] بيرجّعك للـ polling، و [[drop_pending_updates]] بيرمي الرسايل المتراكمة عشان البوت ميردش على رسايل من إمبارح.

[[source .env]] عشان التوكن ميتكتبش في الأمر نفسه ويفضل في الـ history.`,
            when: "بعد كل deploy بيغيّر الدومين أو المسار. وأول حاجة لما البوت يسكت.",
            mistakes: "تسجّل URL الـ tunnel وتقفل الترمنال، فتيليجرام يفضل يبعت لعنوان ميت والرسايل تتراكم. وتشغّل نسخة polling على جهازك والـ webhook متسجّل للسيرفر، فتاخد 409. وسيرفرك بيرد 500 على update معين، فتيليجرام يفضل يعيده ويوقف اللي وراه."
          },
          lines: [
            "حمّل التوكن والسر من .env من غير ما تكتبهم في الأمر.",
            "سجّل الـ URL والسر اللي هيرجع في header مع كل طلب.",
            "الحالة: الـ URL، والرسايل المتراكمة، وآخر خطأ.",
            "شيل الـ webhook (ارجع لـ polling) وارمي الرسايل القديمة."
          ],
          sol: R`[[setWebhook]] بيرد [[{"ok":true,"result":true,"description":"Webhook was set"}]]. ولما تبعت رسالة للبوت، سيرفرك بيستقبل POST فيه [[message.text]]، وتيليجرام بيبعت header [[X-Telegram-Bot-Api-Secret-Token]] بنفس الـ [[secret_token]].

[[getWebhookInfo | jq .result]] لو كله تمام: [[url]] بالرابط بتاعك، و [[pending_update_count: 0]]، ومفيش [[last_error_message]]. لو سيرفرك واقع أو رجّع حاجة غير 200: الرقم بيزيد مع كل رسالة، ويظهر [[last_error_date]] و [[last_error_message]] زي [[Wrong response from the webhook: 401 Unauthorized]] أو [[Connection refused]] أو [[502 Bad Gateway]] (لو ngrok وقف).

وخلي بالك إن ngrok المجاني بيغيّر الـ URL كل مرة، فلازم [[setWebhook]] تاني. و [[deleteWebhook?drop_pending_updates=true]] بيمسح الرسايل المتراكمة عشان البوت ما يرّدش على كل حاجة قديمة مرة واحدة.`
        }
      ]
    }
  ]
});
