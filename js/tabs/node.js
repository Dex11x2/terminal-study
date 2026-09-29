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
    "2": ["المتوسط", "البيئة والبورتات وتحديث المكتبات، وسكربتات التطوير، و monorepo بـ pnpm"],
    "3": ["المتقدم", "الإنتاج والتشخيص، و Prisma في الإنتاج، و webhooks بوابات الدفع على جهازك"]
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
            mistakes: R`npm install في مشروع pnpm: بيعمل package-lock جنب pnpm-lock وبيبوّظ node_modules. شوف الـ lock الأول.

في مشروع حقيقي كان الـ CI فيه [[pnpm/action-setup]] بـ [[version: 10]]، وفي نفس الوقت [[packageManager]] في package.json بنسخة تانية، والاتنين لما يختلفوا الـ action بيفشل. سيب النسخة في packageManager بس، والـ action بيقراها لوحده. وفي مشروع تاني كان [[corepack enable]] في الـ CI من غير packageManager أصلًا، فكل run بياخد أي نسخة pnpm متاحة.`
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          try: "في مشروع pnpm جديد سطّب sharp، واقرا الرسالة اللي بتطلع، وشغّل [[pnpm approve-builds]]، واقرا اللي اتكتب في pnpm-workspace.yaml.",
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
          ]
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
          ]
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
          ]
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
          ]
        }
      ]
    }
  ]
});
