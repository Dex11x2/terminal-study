// تكملة تاب node: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/node/01.js (شرح حقول الدرس في أوله)
MORE("node", [
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
    }
]);
