// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
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
          title: "يعني إيه Node.js، وبتشغّل بيه ملف JavaScript إزاي، وفرقه عن المتصفح إيه؟",
          desc: R`JavaScript كانت بتشتغل جوه المتصفح بس. في ٢٠٠٩ Ryan Dahl خد V8 (المحرك اللي بيشغّل JavaScript جوه Chrome) وشغّله برا المتصفح، وسمّى الحاجة دي [[Node.js]].

يعني Node.js مش لغة جديدة، ده runtime: برنامج بيشغّل كود JavaScript على جهازك أو على سيرفر من غير متصفح. نفس اللغة ونفس الـ syntax، الفرق في الحاجات اللي حواليها:
• في المتصفح: عندك الصفحة [[document]] والنافذة [[window]] و [[alert]]، بس مش مسموحلك تقرا أو تكتب ملفات على جهاز اليوزر.
• في Node: مفيش [[document]] ولا [[window]] (مفيش صفحة أصلًا)، بس عندك [[process]] (معلومات عن البرنامج اللي شغال وعن الجهاز)، وموديولات زي [[fs]] للملفات و [[http]] تعمل بيها سيرفر.

بتشغّل ملف بـ [[node]] وبعدها اسم الملف: [[node app.js]]. و Node بينفّذه من أوله لآخره ويقفل، إلا لو فيه حاجة لسه مستنياها (سيرفر بيسمع على port مثلًا، أو timer).

وفيه طرق تانية من غير ملف: [[node]] لوحدها بتفتح REPL تكتب فيه سطر سطر، و [[node -e]] بينفّذ سطر، و [[node -p]] بينفّذ ويطبع الناتج. التلاتة مشروحين بالتفصيل في درس «node مباشرة»، والدرس الجاي («node -v») بيوريك تتأكد من نسخة Node عندك.`,
          example: R`# شغّل ملف JavaScript (اعمله الأول في VS Code)
node app.js

# Node فيه process: نظام التشغيل ونسخة Node
node -p "process.platform + ' ' + process.version"

# ومفيهوش document بتاع المتصفح
node -p "typeof document"`,
          try: R`اعمل فولدر جديد وافتحه في VS Code، واعمل فيه ملف [[app.js]] فيه سطرين: [[console.log("أول برنامج في Node!");]] و [[console.log(2 + 3);]]. افتح الترمنال في نفس الفولدر وشغّل [[node app.js]]. بعدين ضيف سطر تالت [[console.log(document.title);]] وشغّل تاني. وآخر حاجة جرّب أمرين [[node -p]] اللي في المثال.`,
          deep: {
            why: R`بسبب Node بقيت تقدر تكتب الـ frontend والـ backend بنفس اللغة: React في المتصفح، و Express أو NestJS على السيرفر. وكمان أغلب أدوات الويب نفسها شغالة على Node: Vite و npm و ESLint و TypeScript compiler. فحتى لو بتكتب frontend بس، هتشغّل Node كل يوم.`,
            how: R`V8 بيشغّل JavaScript نفسها، وفوقه Node بيضيف الحاجات اللي مش في المتصفح (الملفات والشبكة و [[process]]) عن طريق مكتبة مكتوبة بـ C اسمها libuv. Node بيشغّل الكود بتاعك على thread واحد، ولما تطلب حاجة بتاخد وقت (تقرا ملف، أو تستنى request) مش بيقف مستنيها: بيكمل، ولما الحاجة تخلص بينادي الكود اللي قلتله يتنفذ بعدها. ده اللي بيخلي سيرفر Node واحد يخدم طلبات كتير في نفس الوقت، وده موضوع درس «event loop» في تاب JavaScript.`,
            when: R`أي حاجة JavaScript برا المتصفح: سيرفر، أو سكربت بيعدّل ملفات، أو أداة build. وأي مشروع React أو Next.js بيحتاج Node عشان [[npm install]] و [[npm run dev]].`,
            mistakes: R`تستخدم [[document]] أو [[window]] أو [[localStorage]] في كود بيشتغل على Node، فيطلعلك [[ReferenceError]]. تكتب [[node app.js]] وانت مش في فولدر الملف فيطلعلك [[Cannot find module]]. وتكتب [[node app]] على ملف [[app.ts]] وتستنى يشتغل: TypeScript محتاج خطوة زيادة (درس «npx tsx»).`
          },
          lines: [
            R`بيشغّل الملف من أوله لآخره ويقفل.`,
            R`[[-p]] بينفّذ الكلام اللي بين علامتين التنصيص ويطبع الناتج: اسم نظام التشغيل ونسخة Node.`,
            R`[[typeof]] بيقول نوع القيمة: هنا هيقول إن [[document]] مش موجود.`
          ],
          sol: R`أول تشغيل لـ [[node app.js]]:
[[أول برنامج في Node!]]
[[5]]

بعد السطر التالت: السطرين الأولانيين بيتطبعوا عادي، وبعدين البرنامج بيقف بـ:
[[ReferenceError: document is not defined]]
ومعاه رقم السطر ([[app.js:3]]) وسهم تحت [[document]]. Node نفّذ لحد ما وصل للسطر اللي فيه حاجة مش موجودة عنده ووقف.

[[node -p "process.platform + ' ' + process.version"]] بيطبع حاجة زي [[linux v24.14.0]]، أو [[win32 ...]] على ويندوز، أو [[darwin ...]] على الماك، ونسختك ممكن تختلف.
و [[node -p "typeof document"]] بيطبع [[undefined]]: الاسم مش موجود في Node. نفس الأمر في Console المتصفح بيطبع [['object']].`
        },
        {
          cmd: "node -v",
          title: "النسخ اللي شغالة عندك",
          desc: R`مشاكل كتير («شغال عندي ومش شغال عند زميلي» أو على السيرفر) سببها نسخة Node مختلفة عن اللي المشروع متوقعها، فأول حاجة تعرفها انت شغال بإيه. [[node -v]] بيطبع نسخة Node زي [[v24.x]]، و [[npm -v]] نسخة npm اللي جاية معاه.

[[which node]] بيقولك الملف اللي بيشتغل جاي منين: [[/usr/bin/node]] يعني من apt، ومسار فيه [[.nvm]] يعني من nvm، و [[/opt/homebrew]] من brew. لو متسطب بأكتر من طريقة، اللي في أول الـ PATH هو اللي بيكسب. و [[node -p]] بيشغّل كود JS ويطبع ناتجه، و [[process.versions.v8]] نسخة محرك V8 اللي جوه Node.

النسخ الزوجية (22 و 24) هي LTS، يعني دعم طويل، ودي اللي تستخدمها في الإنتاج. وحقل [[engines]] في package.json بيقول المشروع محتاج أنهي نسخة.`,
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
          desc: R`مشروع قديم محتاج Node 20 وجديد محتاج 24، ومش هينفع نسخة واحدة على الجهاز. nvm (Node Version Manager) بيسطّب أكتر من نسخة جنب بعض ويبدّل بينهم في ثانية، من غير sudo.

[[nvm ls]] بيعرض النسخ المتسطبة، والسهم جنب اللي شغالة. [[nvm install 24]] بينزّل آخر 24.x. [[nvm use 24]] بيبدّل للنسخة دي في الترمنال ده بس. [[nvm alias default 24]] بيخلي أي ترمنال جديد يبدأ بيها. و [[.nvmrc]] ملف في جذر المشروع فيه رقم النسخة، و [[nvm use]] من غير رقم بيقراه، فكل الفريق يشتغل بنفس النسخة.

خد بالك إن الباكدجات العامة ([[npm i -g]]) مربوطة بكل نسخة لوحدها، فلما تبدّل مش هتلاقيها. ولو Node متسطب كمان من apt، [[which -a node]] بيوريك الاتنين.`,
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
          desc: R`لما تسطّب مكتبة، هي بتجيب معاها مكتبات هي محتاجاها، وهكذا، فـ node_modules بيبقى فيه مئات المكتبات انت مسطّبتش غير كام واحدة منهم. الأوامر دي بتفهّمك الشجرة دي.

[[npm ls --depth=0]] بيعرض المكتبات اللي انت سطّبتها مباشرة بس (المستوى الأول). [[npm ls lodash]] بيوريك كل مكان lodash موجود فيه في الشجرة ومين جابه. [[npm why lodash]] نفس المعلومة بشكل أوضح: «موجودة لأن مكتبة X محتاجاها، و X موجودة لأنك سطّبتها». ده مهم لما [[npm audit]] يقولك فيه ثغرة في مكتبة عمرك ما سمعت عنها.

[[npm dedupe]] بيحاول يشيل النسخ المكررة من نفس المكتبة لو النسخ متوافقة، فـ node_modules يصغر. و [[du -sh node_modules]] بيطبع حجمه الكلي ([[-s]] المجموع بس، و [[-h]] بشكل مقروء).`,
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
    }
  ]
});
