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
    "2": ["المتوسط", "البيئة والبورتات وتحديث المكتبات وإصلاح node_modules"],
    "3": ["المتقدم", "الإنتاج والتشخيص، و webhooks بوابات الدفع على جهازك"]
  },
  categories: [
    {
      t: "Node و npm: الأساسيات",
      l: 1,
      n: "نسخ Node، و package.json، وإيه اللي بيحصل فعلًا لما تكتب npm install",
      items: [
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          lines: ["شغّل سكربت dev.", "شغّل build (من غير prebuild).", "مرر --watch للأمر اللي جوه test."]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
            mistakes: "npm install في مشروع pnpm: بيعمل package-lock جنب pnpm-lock وبيبوّظ node_modules. شوف الـ lock الأول."
          },
          lines: [
            "فعّل corepack اللي بيدير pnpm و yarn.",
            "سطّب (زي npm install).",
            "ضيف مكتبة (زي npm install express).",
            "زي npx.",
            "ثبّت مدير الباكدجات ونسخته للمشروع."
          ]
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
          try: R`اعمل مشروع فيه [[workspaces: ["apps/*", "packages/*"]]] وشوف إن node_modules واحد في الجذر.`,
          deep: {
            why: "عندك API و web و كود مشترك بينهم (types، وvalidation). تنسخ المشترك في الاتنين؟ يتفرق. تنشره كباكدج؟ تقيل. الـ workspaces بيخليهم مشروع واحد.",
            how: R`في package.json الجذر: [[workspaces: ["apps/*", "packages/*"]]]. كل فولدر جواهم مشروع بـ package.json بتاعه. [[npm install]] في الجذر بيسطّب الكل في node_modules واحد، وبيعمل لينك لكل workspace باسمه، فـ [[apps/api]] بيستورد [[@myapp/shared]] كأنها مكتبة، وأي تعديل فيها بيظهر فورًا.

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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          lines: ["حاكي webhook من Paymob على جهازك: POST بـ JSON بنفس شكل اللي بيبعتوه."]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
        }
      ]
    }
  ]
});
