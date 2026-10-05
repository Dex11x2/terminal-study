// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "ملفات مشروع Node و JavaScript",
      l: 2,
      n: "أول ملفات بتفتحها في أي مشروع JS: package.json و package-lock.json (ومعاهم كل الـ lock files في اللغات التانية)، و tsconfig.json، و .npmrc و .nvmrc",
      items: [
        {
          cmd: "package.json",
          title: "package.json جواه إيه، و ^ و ~ قبل رقم النسخة معناهم إيه؟",
          desc: R`[[package.json]] هو بطاقة المشروع في أي مشروع Node أو React أو Next.js: اسمه ونسخته والأوامر والمكتبات اللي محتاجها. ده JSON حقيقي (مفيش تعليقات ولا trailing commas، درس «JSON غلط»). بيتعمل بـ [[npm init -y]]، وبيتعدّل لوحده لما تعمل [[npm install]].

أهم المفاتيح:
• [["name"]] و [["version"]]: الاسم (حروف صغيرة ومن غير مسافات) والنسخة بصيغة semver.
• [["private": true]]: يمنع إنك تنشره على npm بالغلط. حطه في أي تطبيق (مش مكتبة).
• [["type": "module"]]: ملفات [[.js]] تبقى ESM (درس [[.js]]). وأحدث npm بيحط [["commonjs"]] وهو بيعمل الملف.
• [["scripts"]]: أوامر بأسامي: [[npm run dev]] بينفذ اللي قدام [["dev"]]. و [["start"]] و [["test"]] بيتشغّلوا من غير [[run]]. والأوامر جوه بتلاقي أدوات [[node_modules/.bin]] لوحدها.
• [["dependencies"]]: المكتبات اللي التطبيق محتاجها وهو شغّال ([[npm install dayjs]]).
• [["devDependencies"]]: أدوات التطوير بس: TypeScript و Vite و ESLint والاختبارات ([[npm install -D vite]]).
• [["engines"]]: نسخة Node المطلوبة.
• [["main"]] و [["exports"]] و [["bin"]]: للمكتبات، بيقولوا إيه اللي يتعمله import أو يتشغّل.

أرقام النسخ (semver): [[MAJOR.MINOR.PATCH]] زي [[1.11.13]]: PATCH تصليح أخطاء، MINOR ميزة جديدة متوافقة، MAJOR تغيير ممكن يكسر كودك. والرمز قبل الرقم بيقول npm يقبل أنهي نسخ:
• [[^1.11.13]] (الافتراضي): أي نسخة أكبر أو تساوي بس نفس الـ MAJOR: يعني من [[1.11.13]] لحد قبل [[2.0.0]]. (لو الـ MAJOR صفر: [[^0.2.3]] معناها لحد قبل [[0.3.0]] بس.)
• [[~5.6.3]]: نفس الـ MINOR: من [[5.6.3]] لحد قبل [[5.7.0]].
• [[5.6.3]] من غير رمز: النسخة دي بالظبط.
• [[*]] أو [[latest]]: أي حاجة (متعملهاش).
ولأن [[^]] بيسمح بنسخ أحدث، اتنين بيعملوا install في يومين مختلفين ممكن ياخدوا نسخ مختلفة، وده سبب وجود [[package-lock.json]] (الدرس الجاي).`,
          example: R`{
  "name": "gym-portal",
  "version": "1.4.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "test": "vitest run",
    "lint": "eslint ."
  },
  "dependencies": {
    "dayjs": "^1.11.13",
    "react": "^19.0.0"
  },
  "devDependencies": {
    "typescript": "~5.6.3",
    "vite": "^6.0.0"
  },
  "engines": {
    "node": ">=20"
  }
}`,
          flag: "script",
          try: R`في فولدر جديد: [[npm init -y]] وافتح [[package.json]]. بعدين [[npm install dayjs@1.11.13]] و [[npm install -D prettier@3.3.3]] وافتحه تاني وشوف إيه اللي اتضاف وفين. نفّذ [[npm run]] لوحدها (بتعرض كل الـ scripts)، و [[npm pkg get dependencies]]. وبعدين حل التمرين: دالة بتقول النسخة دي تنفع مع الـ range ولا لأ.`,
          deep: {
            why: R`أي مشروع Node بيعتمد على عشرات المكتبات، ومحدش هيفتكر أساميها ونسخها، ومش منطقي ترفع آلاف ملفات [[node_modules]] على Git. فـ [[package.json]] بيسجل «أنا محتاج إيه» بس، وأي حد ياخد المشروع يعمل [[npm install]] ويجيب كل حاجة.`,
            how: R`[[npm install]] بيقرا [[dependencies]] و [[devDependencies]]، ولكل مكتبة بيدوّر في الـ registry على أحدث نسخة بتطابق الـ range، وبعدين يعمل نفس الحكاية مع مكتبات المكتبات، وينزّل الكل في [[node_modules/]]. و [[npm run x]] بيضيف [[node_modules/.bin]] للـ PATH وينفذ النص اللي في [[scripts.x]] في shell (sh على لينكس، cmd على ويندوز).`,
            when: R`أول ملف تفتحه في أي مشروع JS: بيقولك المشروع مبني بإيه (React؟ Next؟ Express؟) وبيتشغّل إزاي ([[scripts]]).`,
            mistakes: R`تعدّل نسخة في [[package.json]] بإيدك من غير [[npm install]] فالـ lock يبقى مش متطابق و [[npm ci]] يقع. تحط أداة build في [[dependencies]] أو مكتبة بيحتاجها السيرفر في [[devDependencies]] فتختفي في الـ production ([[npm ci --omit=dev]]). تحط تعليق أو trailing comma ([[EJSONPARSE]]). وتنسى [["private": true]].`
          },
          lines: [
            R`[[{]] الملف كله object واحد.`,
            R`اسم المشروع: حروف صغيرة و [[-]].`,
            R`النسخة بصيغة semver.`,
            R`ميتنشرش على npm بالغلط.`,
            R`ملفات [[.js]] تبقى ES modules.`,
            R`الأوامر بأسامي.`,
            R`[[npm run dev]] بيشغّل vite.`,
            R`[[npm run build]]: [[&&]] يعني اللي بعدها يتنفذ لو اللي قبلها نجح.`,
            R`[[npm test]] (من غير run).`,
            R`[[npm run lint]].`,
            R`قفل الـ scripts.`,
            R`المكتبات اللي التطبيق محتاجها وهو شغال.`,
            R`[[^]]: أي 1.x.x من 1.11.13 وطالع.`,
            R`أي 19.x.x.`,
            R`قفل.`,
            R`أدوات التطوير بس.`,
            R`[[~]]: أي 5.6.x بس.`,
            R`أي 6.x.x.`,
            R`قفل.`,
            R`نسخة Node المطلوبة.`,
            R`[[>=20]]: 20 أو أحدث.`,
            R`قفل.`,
            R`قفل الـ object.`
          ],
          sol: R`[[npm init -y]] بيعمل ملف فيه [["name"]] (اسم الفولدر) و [["version": "1.0.0"]] و [["scripts"]] فيه [["test"]] بس، و [["license": "ISC"]]، و [["type": "commonjs"]] (في npm 10.9 وأحدث).

بعد التسطيب اتضاف:
[["dependencies": { "dayjs": "^1.11.13" }]]
[["devDependencies": { "prettier": "^3.3.3" }]]
لاحظ إن npm حط [[^]] لوحده قبل النسخة اللي طلبتها. واتعمل [[package-lock.json]] و [[node_modules/]].

و [[npm run]] على ملف المثال بيطبع:
[[Lifecycle scripts included in gym-portal@1.4.0:]] وتحتها [[test]]،
و [[available via $__btnpm run$__bt:]] وتحتها [[dev]] و [[build]] و [[lint]] وكل واحد تحته الأمر بتاعه.`,
          check: {
            lang: "js",
            starter: R`// satisfies: هل النسخة version تنفع مع الـ range اللي في package.json؟
// الـ range: "1.2.3" بالظبط، أو "^1.2.3"، أو "~1.2.3"
// ^ : نفس الـ MAJOR (ولو الـ MAJOR صفر: نفس الـ MINOR)، و ~ : نفس الـ MINOR، والاتنين >= النسخة نفسها
function satisfies(version, range) {
  return version === range;
}`,
            tests: R`test("بالظبط", () => expect([satisfies("1.2.3", "1.2.3"), satisfies("1.2.4", "1.2.3")]).toEqual([true, false]));
test("^1.2.3 بيقبل 1.2.3 و 1.9.0", () => expect([satisfies("1.2.3", "^1.2.3"), satisfies("1.9.0", "^1.2.3")]).toEqual([true, true]));
test("^1.2.3 مش بيقبل 2.0.0 ولا 1.2.2", () => expect([satisfies("2.0.0", "^1.2.3"), satisfies("1.2.2", "^1.2.3")]).toEqual([false, false]));
test("~1.2.3 بيقبل 1.2.9 ومش 1.3.0", () => expect([satisfies("1.2.9", "~1.2.3"), satisfies("1.3.0", "~1.2.3")]).toEqual([true, false]));
test("المقارنة أرقام مش نصوص: ^1.2.3 بيقبل 1.10.0", () => expect(satisfies("1.10.0", "^1.2.3")).toBe(true));
test("^0.2.3 بيقبل 0.2.9 ومش 0.3.0", () => expect([satisfies("0.2.9", "^0.2.3"), satisfies("0.3.0", "^0.2.3")]).toEqual([true, false]));`,
            solution: R`function satisfies(version, range) {
  const parse = (s) => s.split(".").map(Number);
  const op = range[0] === "^" || range[0] === "~" ? range[0] : "";
  const [M, m, p] = parse(op ? range.slice(1) : range);
  const [a, b, c] = parse(version);
  const gte = a !== M ? a > M : b !== m ? b > m : c >= p;
  if (!op) return a === M && b === m && c === p;
  if (!gte) return false;
  if (op === "~") return a === M && b === m;
  return M > 0 ? a === M : a === 0 && b === m;
}`
          }
        },
        {
          cmd: "package-lock.json",
          title: "package-lock.json و yarn.lock و go.sum: ليه الـ lock file لازم يتعمله commit؟",
          desc: R`الـ lock file بيسجل النسخة المضبوطة لكل مكتبة اتسطّبت فعلًا، ولمكتبات المكتبات كمان، ومعاها hash بيضمن إن الملف اللي هيتنزّل هو هو. [[package.json]] بيقول «عايز dayjs أي 1.x»، والـ lock بيقول «اتسطّب 1.11.13 بالظبط، من الرابط ده، والـ hash بتاعه كذا».

ليه؟ عشان كل الناس وكل السيرفرات يسطّبوا نفس الحاجة بالظبط. من غيره: انت سطّبت النهارده و CI سطّب بكرة بعد ما مكتبة نزّلت نسخة جديدة فيها bug، فالكود يشتغل عندك ويقع على السيرفر.

قواعد:
• بيتعمله commit دايمًا (في التطبيقات). ده مش ملف مؤقت.
• عمرك ما تعدّله بإيدك. npm و yarn و pnpm بيكتبوه.
• [[npm install]] بيسطّب ويحدّث الـ lock لو احتاج. أما [[npm ci]] (في CI والسيرفرات) بيسطّب من الـ lock بالظبط، ويمسح [[node_modules]] الأول، ولو الـ lock مش متطابق مع [[package.json]] بيوقف بغلط بدل ما يخمّن.
• استخدم مدير حزم واحد في المشروع: متعملش [[npm install]] في مشروع فيه [[yarn.lock]].
• لو حصل conflict في الـ lock وانت بتعمل merge: متحلّوش بإيدك. خد نسخة من الفرعين لـ [[package.json]] واعمل [[npm install]] يعيد كتابة الـ lock.

نفس الفكرة في كل لغة:
• [[package-lock.json]] (npm)، و [[yarn.lock]] (Yarn)، و [[pnpm-lock.yaml]] (pnpm)، و [[bun.lock]] (Bun).
• [[poetry.lock]] و [[uv.lock]] (Python)، و [[Pipfile.lock]].
• [[go.sum]] (Go)، و [[Cargo.lock]] (Rust)، و [[composer.lock]] (PHP)، و [[Gemfile.lock]] (Ruby)، و [[pubspec.lock]] (Dart)، و [[packages.lock.json]] (.NET).

جوه [[package-lock.json]]: [["lockfileVersion": 3]]، وتحت [["packages"]] مفتاح لكل مكتبة بمسارها ([["node_modules/dayjs"]]) وفيه [["version"]] و [["resolved"]] (الرابط) و [["integrity"]] (الـ hash، [[sha512-...]]).`,
          example: R`npm install dayjs@1.11.13
jq '.packages["node_modules/dayjs"]' package-lock.json
npm ci
npm pkg set dependencies.zod="^3.23.0"
npm ci
npm install
git diff --stat`,
          try: R`في المشروع بتاع الدرس اللي فات نفّذ المثال سطر سطر. بعد أول [[npm ci]] اتأكد إن [[node_modules]] اتعمل من جديد. بعد [[npm pkg set]] اقرا رسالة [[npm ci]] كويس. ولو عندك مشروع Go أو Python بـ Poetry افتح الـ lock بتاعه وقارن.`,
          deep: {
            why: R`الـ ranges في [[package.json]] بتخلّي التحديثات الصغيرة توصلك لوحدها، بس ده معناه إن «نفس المشروع» ممكن يتسطّب بنسخ مختلفة. والمكتبة الواحدة بتجيب معاها عشرات تانيين انت مش شايفهم. الـ lock بيجمّد الشجرة كلها لحد ما انت تقرر تحدّث.`,
            how: R`[[npm install]] بيحسب الشجرة كلها (resolve) ويكتبها في الـ lock. المرة الجاية لو الـ lock موجود ومتطابق، npm بيستخدمه علطول من غير ما يسأل الـ registry عن أحدث نسخة. و [[integrity]] هو hash للملف المضغوط: لو حد غيّر المكتبة على الـ registry أو في النص، الـ hash مش هيطابق والتسطيب يقع، وده حماية من supply-chain attacks.`,
            when: R`دايمًا. [[npm ci]] في GitHub Actions و Dockerfile، و [[npm install]] على جهازك وانت بتضيف أو بتحدّث مكتبة. وتحديث مقصود: [[npm outdated]] تشوف الجديد، و [[npm update]] أو [[npm install x@latest]].`,
            mistakes: R`تحط [[package-lock.json]] في [[.gitignore]]. تمسحه كل ما يحصل مشكلة (بتخسر النسخ المجربة وتاخد نسخ جديدة مش مجربة). تحل conflicts فيه بإيدك. وتستخدم [[npm install]] في الـ Dockerfile بدل [[npm ci]] فالـ image يتبني بنسخ مختلفة كل مرة.`
          },
          lines: [
            R`بيسطّب ويكتب النسخة في [[package.json]] والـ lock.`,
            R`الـ entry بتاع dayjs في الـ lock: النسخة والرابط والـ hash.`,
            R`تسطيب نضيف من الـ lock بالظبط (بيمسح [[node_modules]] الأول).`,
            R`بيضيف مكتبة لـ [[package.json]] بس من غير تسطيب، فالـ lock بقى قديم.`,
            R`[[npm ci]] بيرفض لأن الملفين مش متطابقين.`,
            R`[[npm install]] بيسطّب ويحدّث الـ lock.`,
            R`الملفين اتغيروا: اعملهم commit مع بعض.`
          ],
          sol: R`الـ [[jq]] بيطبع:
[[{ "version": "1.11.13", "resolved": "https://registry.npmjs.org/dayjs/-/dayjs-1.11.13.tgz", "integrity": "sha512-oaMBel6gjolK862uaPQOVTA7q3TZhuSvuMQAAglQDOWYO9A91IrAOUJEyKVlqJlHE0vq5p5UXxzdPfMH/x6xNg==", "license": "MIT" }]] (على كذا سطر)

و [[npm ci]] بعد [[npm pkg set]]:
[[npm error code EUSAGE]]
[[npm error $__btnpm ci$__bt can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with $__btnpm install$__bt before continuing.]]
[[npm error Missing: zod@3.25.76 from lock file]] (رقم zod هيبقى أحدث 3.x وقت ما تجرب)

وبعد [[npm install]]، [[git diff --stat]] بيوريك [[package.json]] و [[package-lock.json]] متغيرين.`
        },
        {
          cmd: "tsconfig.json",
          title: "tsconfig.json بيتحكم في إيه، وأهم الإعدادات فيه إيه؟",
          desc: R`[[tsconfig.json]] ملف إعدادات TypeScript للمشروع: أنهي ملفات تتفحص، ويتحولوا لأنهي نسخة JavaScript، والناتج يروح فين، وقد إيه الفحص صارم. وجوده في فولدر معناه «ده مشروع TypeScript»، فـ [[tsc]] من غير arguments والمحرر بيقروه. وهو JSONC: بيقبل تعليقات و trailing commas (درس [[.jsonc]]). بيتعمل بـ [[npx tsc --init]] (بيعمل ملف كله إعدادات متعلّق عليها بتعليقات وشرح).

أهم المفاتيح:
• [["compilerOptions"]]: كل إعدادات الـ compiler:
  [["target"]]: نسخة JavaScript الناتجة ([["ES2022"]]). أقدم = كود أطول بس شغال على متصفحات أقدم.
  [["module"]] و [["moduleResolution"]]: نظام الـ modules. لـ Node الحديث [["NodeNext"]]، ولمشروع Vite أو Next [["ESNext"]] و [["Bundler"]].
  [["strict": true]]: يشغّل كل الفحوصات المهمة ([[null]] و [[any]] الضمني). شغّله دايمًا من أول يوم.
  [["outDir"]] و [["rootDir"]]: الناتج يروح فين، والكود فين.
  [["paths"]]: اختصارات للـ imports زي [[@/components/Button]] بدل [[../../../components/Button]].
  [["jsx"]]: لو فيه [[.tsx]] ([["react-jsx"]]).
  [["noEmit": true]]: افحص بس متطلّعش ملفات (لما Vite أو Next هما اللي بيبنوا).
  [["skipLibCheck": true]]: متفحصش ملفات [[.d.ts]] بتاعة المكتبات (أسرع).
• [["include"]] و [["exclude"]]: أنهي ملفات تدخل.
• [["extends"]]: ابدأ من ملف إعدادات تاني ([["@tsconfig/node20/tsconfig.json"]]) وغيّر عليه.
• [["references"]]: مشاريع جوه مشروع (Vite بيعمل [[tsconfig.app.json]] و [[tsconfig.node.json]] ويربطهم).

[[jsconfig.json]]: نفس الملف لمشروع JavaScript، عشان VS Code يفهم الـ paths ويكمّل الكود.

لو مش متأكد الإعدادات النهائية إيه (بعد [[extends]] والافتراضيات): [[npx tsc --showConfig]].`,
          example: R`{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "outDir": "dist",
    "rootDir": "src",
    "esModuleInterop": true,
    "skipLibCheck": true,
    // للـ imports بـ @/ بدل ../../
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}`,
          flag: "script",
          try: R`في فولدر جديد اعمل [[package.json]] فيه [[{"type": "module"}]]، وفولدر [[src]] فيه [[index.ts]] بدالة صغيرة بأنواع، وحط المثال في [[tsconfig.json]]. نفّذ [[npx -p typescript tsc]] وبص على فولدر [[dist]]. وبعدين [[npx -p typescript tsc --showConfig]]. جرّب تغيّر [["strict"]] لـ [[false]] واكتب دالة parameter بتاعها من غير نوع، وقارن.`,
          deep: {
            why: R`نفس كود TypeScript ممكن يتحول بطرق كتير (لأنهي نسخة؟ CommonJS ولا ESM؟ صارم ولا متساهل؟). بدل ما تكتب ده في كل أمر، الملف بيحفظ القرار للمشروع كله، والمحرر والـ CI و [[tsc]] كلهم بيقروا نفس الإعدادات.`,
            how: R`[[tsc]] بيدوّر على [[tsconfig.json]] في الفولدر الحالي وفوقه، يدمج [["extends"]] لو موجود، يجمع الملفات من [["include"]]، ويفحص كل حاجة مع بعض. والمحرر (VS Code) بيعمل نفس الحكاية في الخلفية، عشان كده تعديل الملف ده بيغيّر الخطوط الحمرا في المحرر علطول (وأحيانًا محتاج [[TypeScript: Restart TS Server]]).`,
            when: R`أي مشروع TypeScript. وعمليًا الأدوات (Vite و Next و NestJS) بتعمله لك، وانت بتعدّل فيه: [["paths"]] و [["strict"]] أكتر حاجتين.`,
            mistakes: R`تضيف [["paths"]] في tsconfig وتفتكر إنها هتشتغل وقت التشغيل: TypeScript بيفهمها للفحص بس، وأداة الـ build (Vite أو Next) لازم تعرفها كمان. تقفل [["strict"]] عشان الأخطاء تختفي. وتقرا الملف بـ [[JSON.parse]] في سكربت فيقع على التعليقات.`
          },
          lines: [
            R`[[{]] بداية.`,
            R`كل إعدادات الـ compiler جوه المفتاح ده.`,
            R`الناتج JavaScript بمستوى ES2022.`,
            R`نظام modules بتاع Node الحديث (بيحترم [["type"]] في package.json).`,
            R`إزاي يلاقي الملفات في الـ imports، ولازم يمشي مع [["module"]].`,
            R`كل الفحوصات الصارمة.`,
            R`الـ [[.js]] الناتجة تروح [[dist/]].`,
            R`الكود الأصلي في [[src/]].`,
            R`يسهّل استيراد مكتبات CommonJS.`,
            R`متفحصش [[.d.ts]] بتاعة المكتبات.`,
            R`اختصار: [[@/x]] يعني [[./src/x]]. (والسطر اللي فوقه تعليق، مسموح هنا.)`,
            R`قفل [[compilerOptions]].`,
            R`افحص [[src]] بس.`,
            R`واستبعد دول.`,
            R`قفل.`
          ],
          sol: R`مع [[src/index.ts]] فيه [[export const greet = (name: string): string => $__bthi $__{name}$__bt;]]:
[[tsc]] بيعمل [[dist/index.js]] فيه [[export const greet = (name) => $__bthi $__{name}$__bt;]] (الأنواع اتشالت والـ export فضل ESM عشان [["type": "module"]]).

و [[--showConfig]] بيطبع الإعدادات النهائية منسقة (من غير التعليق) ومعاها [["files"]] بكل الملفات اللي هيتعمل لها compile.

ومع [["strict": false]]، [[function f(x) { return x; }]] بتعدّي عادي، ومع [[true]] بيطلع [[error TS7006: Parameter 'x' implicitly has an 'any' type.]]`
        },
        {
          cmd: ".npmrc و .nvmrc",
          title: "ملفات .npmrc و .nvmrc بتعمل إيه، وإزاي تثبّت نسخة Node للمشروع؟",
          desc: R`ملفين صغيرين مخفيين هتلاقيهم جنب [[package.json]]:

[[.nvmrc]]: فيه نسخة Node اللي المشروع محتاجها، سطر واحد بس: [[20]] أو [[22.11.0]] أو [[lts/iron]]. لما تدخل الفولدر وتكتب [[nvm use]]، أداة nvm بتقراه وتحوّلك للنسخة دي (و [[nvm install]] تنزّلها لو مش موجودة). وأدوات تانية بتفهم نفس الملف أو أخوه [[.node-version]]: fnm و Volta و GitHub Actions ([[node-version-file: .nvmrc]]) و Vercel و Netlify.

[[.npmrc]]: إعدادات npm، بصيغة [[key=value]] (شبه INI). ممكن يبقى في ٣ أماكن، والأقرب يكسب: في المشروع، وفي فولدر اليوزر ([[~/.npmrc]])، وعلى مستوى الجهاز. أمثلة:
• [[save-exact=true]]: [[npm install x]] يكتب النسخة من غير [[^]].
• [[engine-strict=true]]: يرفض يسطّب لو نسخة Node مش زي [["engines"]] في package.json.
• [[registry=https://...]]: registry خاص (شركات).
• [[@myco:registry=https://npm.pkg.github.com]]: registry لمكتبات scope معيّن.
• [[//registry.npmjs.org/:_authToken=$__{NPM_TOKEN}]]: التوكن، بيتقري من متغير بيئة.
• [[legacy-peer-deps=true]]: بيتجاهل تعارضات peer dependencies (حل مؤقت، مش دايم).

أمان: [[.npmrc]] اللي في المشروع بيتعمله commit، فعمره ما يبقى فيه توكن حقيقي مكتوب. استخدم [[$__{NPM_TOKEN}]]، والتوكن الحقيقي يبقى في [[~/.npmrc]] على جهازك أو secret في الـ CI.

[[npm config list]] بيعرض كل الإعدادات الفعالة وجاية من أنهي ملف، و [[npm config get key]] قيمة واحدة.`,
          example: R`cat .nvmrc
nvm use
node -v
cat .npmrc
npm config get save-exact
npm config list`,
          try: R`في مشروع تجربة: [[echo 20 > .nvmrc]] و [[printf 'save-exact=true\nengine-strict=true\n' > .npmrc]]. لو عندك nvm نفّذ [[nvm use]]. وبعدين [[npm config get save-exact]] و [[npm config list]]، وجرّب [[npm install dayjs]] وشوف اتكتب في [[package.json]] بـ [[^]] ولا لأ.`,
          deep: {
            why: R`مشروع اتعمل على Node 18 ممكن يقع على Node 22 والعكس، ونسيان «المشروع ده محتاج أنهي نسخة» بيضيّع ساعات. [[.nvmrc]] بيكتب الإجابة جوه المشروع نفسه. و [[.npmrc]] بيخلي إعدادات npm الخاصة بالمشروع (registry، النسخ المضبوطة) تمشي مع الكود لكل الناس.`,
            how: R`nvm بيدوّر على [[.nvmrc]] في الفولدر الحالي وفوقه، وبيغيّر الـ PATH عشان [[node]] يشاور على النسخة دي (في الشيل الحالي بس). و npm بيقرا كل ملفات [[.npmrc]] ويدمجها (المشروع فوق اليوزر فوق الجهاز)، وبيبدّل [[$__{VAR}]] بمتغيرات البيئة.`,
            when: R`حط [[.nvmrc]] في أي مشروع Node من أول يوم. و [[.npmrc]] لما محتاج registry خاص أو إعداد لكل الفريق.`,
            mistakes: R`تعمل commit لتوكن حقيقي في [[.npmrc]] (GitHub نفسه بيكتشفه ويبعتلك تحذير، والتوكن بيتلغي). تنسى إن [[nvm use]] بيغيّر الشيل الحالي بس، فالترمنال الجديد يرجع للنسخة الافتراضية ([[nvm alias default 20]] يحل ده). وتحط [[legacy-peer-deps=true]] وتنسى إنه بيخبّي مشاكل حقيقية.`
          },
          lines: [
            R`النسخة المطلوبة: سطر واحد.`,
            R`nvm بيقرا [[.nvmrc]] ويحوّلك لها.`,
            R`اتأكد من النسخة الحالية.`,
            R`إعدادات npm للمشروع.`,
            R`قيمة إعداد واحد.`,
            R`كل الإعدادات الفعالة ومصدرها.`
          ],
          sol: R`[[cat .nvmrc]] ← [[20]]
[[nvm use]] ← [[Found '/path/.nvmrc' with version <20>]] وبعدها [[Now using node v20.x.x]]، ولو النسخة مش متسطّبة: [[N/A: version "v20" is not yet installed.]] فاكتب [[nvm install]] (بيقرا نفس الملف).
[[npm config get save-exact]] ← [[true]]
[[npm config list]] فيه قسم:
[[; "project" config from /path/to/project/.npmrc]]
[[engine-strict = true]]
[[save-exact = true]]

و [[npm install dayjs]] بيكتب [["dayjs": "1.11.x"]] من غير [[^]] بسبب [[save-exact]].`
        }
      ]
    },
    {
      t: "ملفات Git والمحرر",
      l: 2,
      n: "تلات ملفات صغيرة بتمنع مشاكل كبيرة: .gitignore (إيه اللي ميترفعش)، و .gitattributes (نهايات السطور والملفات الـ binary)، و .editorconfig (كل المحررات تكتب بنفس الطريقة)",
      items: [
        {
          cmd: ".gitignore",
          title: "ملف .gitignore بيتكتب إزاي، وليه ملف اتعمله ignore لسه ظاهر؟",
          desc: R`[[.gitignore]] ملف نصي في أول المشروع (أو في أي فولدر) فيه أنماط (patterns) للملفات اللي Git يتجاهلها: متظهرش في [[git status]] ومتتضافش بـ [[git add .]]. التفاصيل في تاب Git.

الرموز (كل سطر نمط):
• [[#]] تعليق، والسطر الفاضي ملوش معنى.
• [[node_modules/]]: الـ [[/]] في الآخر يعني فولدر بس، بأي مكان في المشروع.
• [[*.log]]: [[*]] أي حروف (ماعدا [[/]])، يعني أي ملف بيخلص بـ [[.log]] في أي فولدر.
• [[.env.*]]: أي ملف اسمه بيبدأ بـ [[.env.]].
• [[!.env.example]]: [[!]] استثناء: «ماعدا ده». لازم ييجي بعد النمط اللي بيستثني منه.
• [[/config/local.json]]: [[/]] في الأول يعني من أول المشروع بس، مش [[src/config/local.json]].
• [[**/temp]]: [[**]] أي عدد فولدرات.
• [[.vscode/*]] مع [[!.vscode/extensions.json]]: تجاهل محتوى الفولدر ماعدا ملف. (لو كتبت [[.vscode/]] الفولدر كله بيتجاهل ومينفعش تستثني حاجة جواه.)

إيه اللي يتحط فيه دايمًا: المكتبات ([[node_modules/]] و [[vendor/]] و [[.venv/]])، والناتج ([[dist/]] و [[build/]] و [[target/]] و [[*.class]] و [[__pycache__/]])، والأسرار ([[.env]] و [[*.pem]] و [[*.key]])، والـ logs، وملفات الأنظمة ([[.DS_Store]] و [[Thumbs.db]])، وإعدادات المحرر الشخصية.
ابدأ من قوالب جاهزة: github.com/github/gitignore، أو gitignore.io، و GitHub بيسألك وانت بتعمل repo.

أهم حاجة تفهمها: [[.gitignore]] بيأثر على الملفات اللي Git مش متابعها (untracked) بس. لو الملف اتعمله commit قبل كده، إضافته للـ [[.gitignore]] مش هتعمل حاجة. لازم تشيله من الـ index: [[git rm --cached .env]] (بيفضل على جهازك). ولو كان سر، غيّره، لأنه لسه في تاريخ Git.

وأدوات تانية بتستخدم نفس الفكرة: [[.dockerignore]] (المستوى ده)، و [[.prettierignore]]، و [[.eslintignore]]، و [[.npmignore]]. وفيه [[.git/info/exclude]] لو عايز تتجاهل حاجة على جهازك انت بس من غير ما تغيّر ملف المشروع.`,
          example: R`# المكتبات والناتج
node_modules/
dist/
*.log
# الأسرار
.env
.env.*
!.env.example
# ملفات الأنظمة والمحررات
.DS_Store
Thumbs.db
.vscode/*
!.vscode/extensions.json
/config/local.json`,
          flag: "script",
          try: R`في repo تجربة ([[git init]]) حط المثال في [[.gitignore]] واعمل الملفات دي: [[app.log]] و [[.env]] و [[.env.local]] و [[.env.example]] و [[config/local.json]] و [[src/config/local.json]] و [[.vscode/settings.json]] و [[.vscode/extensions.json]]. بعدين [[git status --short -uall]]، و [[git check-ignore -v .env.local app.log src/config/local.json]]. وآخر حاجة: اعمل commit لملف [[secret.txt]] وبعدين حطه في [[.gitignore]] وعدّله، وشوف [[git status]].`,
          deep: {
            why: R`أي مشروع فيه ملفات متولدة (ممكن تتعمل تاني بأمر) أو شخصية أو سرية. رفعها على Git بيتقل الـ repo ويعمل conflicts على حاجات ملهاش لازمة ويسرّب الأسرار. والـ [[.gitignore]] بيخلي [[git add .]] آمن.`,
            how: R`لكل ملف untracked، Git بيمشي على الأنماط من فوق لتحت، وآخر نمط يطابق هو اللي بيكسب (عشان كده [[!]] لازم ييجي بعد). والأنماط بتتقري من [[.gitignore]] اللي في نفس الفولدر والفولدرات اللي فوقه و [[.git/info/exclude]] و [[core.excludesFile]] (ملف عام لجهازك). و [[git check-ignore -v]] بيقولك بالظبط أنهي سطر في أنهي ملف هو السبب.`,
            when: R`أول ملف تعمله في أي repo، قبل أول [[git add]]. وكل ما أداة جديدة تعمل فولدر ناتج أو cache.`,
            mistakes: R`تحط الملف في [[.gitignore]] بعد ما اتعمله commit وتستغرب إنه لسه بيتتابع ([[git rm --cached]]). تعمل ignore لـ [[package-lock.json]] (لازم يترفع). تكتب [[.vscode/]] وبعدين [[!.vscode/extensions.json]] فالاستثناء ميشتغلش. وتفتكر إن [[.gitignore]] بيحمي من الـ leaks: لو حد عمل [[git add -f]] الملف بيترفع.`
          },
          lines: [
            R`أي فولدر اسمه [[node_modules]] في أي مكان.`,
            R`فولدر الناتج.`,
            R`أي ملف [[.log]] في أي فولدر.`,
            R`ملف الأسرار.`,
            R`أي [[.env.]] وبعدها أي حاجة: [[.env.local]] و [[.env.production]].`,
            R`[[!]] استثناء: [[.env.example]] يترفع (لازم ييجي بعد السطر اللي فوقه).`,
            R`ملف بيعمله الماك في كل فولدر.`,
            R`ملف بيعمله ويندوز للصور المصغرة.`,
            R`محتوى فولدر VS Code...`,
            R`...ماعدا ليستة الإضافات المقترحة للفريق.`,
            R`[[/]] في الأول: الملف ده في أول المشروع بس.`
          ],
          sol: R`[[git status --short -uall]] بيعرض بس:
[[?? .env.example]]
[[?? .gitignore]]
[[?? .vscode/extensions.json]]
[[?? src/config/local.json]]
يعني [[src/config/local.json]] ظاهر لأن النمط [[/config/...]] للفولدر اللي في الأول بس.

و [[git check-ignore -v]] بيطبع السطر المسؤول:
[[.gitignore:7:.env.*	.env.local]]
[[.gitignore:4:*.log	app.log]]
ومبيطبعش حاجة لـ [[src/config/local.json]] لأنه مش متجاهل.

وتجربة [[secret.txt]]: بعد التعديل [[git status]] بيقول [[modified: secret.txt]] رغم إنه في [[.gitignore]]، لأنه tracked. الحل [[git rm --cached secret.txt]] وبعدين commit.`
        },
        {
          cmd: ".gitattributes",
          title: "ملف .gitattributes بيعمل إيه، وإزاي يحل مشكلة LF و CRLF للفريق كله؟",
          desc: R`[[.gitattributes]] بيقول لـ Git يتعامل مع كل نوع ملف إزاي: نصي ولا binary، ونهايات سطوره إيه، ويعرض الـ diff بتاعه ولا لأ. أشهر استخدام: إنهاء مشكلة LF و CRLF (درس LF و CRLF) لكل الناس مرة واحدة، بدل ما كل واحد يظبط [[core.autocrlf]] على جهازه.

الشكل: كل سطر [[pattern attribute attribute ...]]، والأنماط زي [[.gitignore]].

الخصائص المهمة:
• [[text=auto]]: Git يحدد لوحده الملف نصي ولا لأ، والنصي يتخزن في الـ repo بـ LF دايمًا.
• [[eol=lf]]: الملف يطلع على جهازك (working tree) بـ LF حتى على ويندوز. ده اللي عايزه لأي حاجة هتشتغل على لينكس أو Docker.
• [[eol=crlf]]: يطلع بـ CRLF دايمًا. لملفات ويندوز: [[*.bat]] و [[*.cmd]] و [[*.ps1]] و [[*.sln]].
• [[binary]]: متلمسش الملف خالص (ولا تحويل نهايات سطور ولا diff نصي). للصور والخطوط والـ zip، احتياطي لو Git خمّن غلط.
• [[-diff]]: ميعرضش الـ diff (مفيد لـ [[package-lock.json]] الطويل).
• [[linguist-generated]] و [[linguist-vendored]]: GitHub ميحسبش الملف في لغات الـ repo ويطوي الـ diff بتاعه في الـ pull request.
• [[filter=lfs diff=lfs merge=lfs -text]]: الملف يتخزن في Git LFS (للملفات الكبيرة زي الفيديوهات)، والسطر ده [[git lfs track "*.mp4"]] بيكتبه لوحده.

بعد ما تضيف الملف لمشروع قديم، الملفات الموجودة متتغيرش لوحدها. نفّذ [[git add --renormalize .]] وبعدين commit، وده بيعيد تخزين كل ملف بالقواعد الجديدة. و [[git ls-files --eol]] بيعرض لكل ملف نهايات سطوره في الـ repo ([[i/]]) وعلى جهازك ([[w/]]) والـ attributes اللي عليه.`,
          example: R`# كل الملفات النصية تتحفظ في Git بـ LF
* text=auto eol=lf
# ملفات ويندوز تفضل CRLF
*.bat text eol=crlf
*.cmd text eol=crlf
*.ps1 text eol=crlf
# ملفات binary: متلمسهاش
*.png binary
*.jpg binary
# الـ lock مايظهرش في الـ diff
package-lock.json -diff linguist-generated`,
          flag: "script",
          try: R`في repo تجربة: [[git config core.autocrlf false]]، واعمل [[run.sh]] بـ CRLF ([[printf 'echo hi\r\n' > run.sh]]) و [[build.bat]] بـ LF وحط أي صورة، واعمل commit. نفّذ [[git ls-files --eol]]. بعدين حط المثال في [[.gitattributes]] ونفّذ [[git add --renormalize .]] و [[git status --short]] واعمل commit، وبعدين [[git ls-files --eol]] تاني و [[git check-attr -a run.sh build.bat logo.png]].`,
          deep: {
            why: R`[[core.autocrlf]] إعداد على جهاز كل واحد، ولو واحد في الفريق نسي يظبطه، بيرفع CRLF وكل الملفات تظهر متغيرة. [[.gitattributes]] جوه الـ repo نفسه، فالقاعدة بتمشي مع الكود وبتغطي على إعدادات الأجهزة.`,
            how: R`Git عنده «فلتر» بيشتغل في اتجاهين: وهو بيحفظ (add) بيحوّل الملفات اللي عليها [[text]] لـ LF، ووهو بيطلّعها (checkout) بيحوّلها للـ [[eol]] المطلوب. عشان كده بعد الـ renormalize الـ index بقى [[i/lf]] بس الملفات اللي على جهازك لسه [[w/crlf]] لحد ما تعمل checkout تاني أو clone جديد.`,
            when: R`في أي مشروع فيه ناس على ويندوز وناس على لينكس أو ماك، أو فيه سكربتات [[.sh]] و Dockerfile. حطه من أول يوم.`,
            mistakes: R`تحطه في مشروع قديم من غير [[--renormalize]] فميتغيرش حاجة. تحط [[* text eol=lf]] من غير [[auto]] فـ Git يعامل الصور كنص ويبوّظها. وتنسى [[*.bat eol=crlf]] فسكربتات ويندوز تتحول LF.`
          },
          lines: [
            R`[[*]] كل الملفات: Git يحدد النصي لوحده، ويطلّعه LF على كل الأجهزة.`,
            R`ملفات CMD تطلع CRLF.`,
            R`نفس الكلام لـ [[.cmd]].`,
            R`و PowerShell.`,
            R`الصور binary: من غير تحويل ولا diff نصي.`,
            R`نفس الكلام.`,
            R`[[-diff]] من غير diff، و [[linguist-generated]] GitHub يطويه.`
          ],
          sol: R`قبل الملف:
[[i/lf    w/lf    attr/                 	build.bat]]
[[i/-text w/-text attr/                 	logo.png]]
[[i/crlf  w/crlf  attr/                 	run.sh]]
يعني [[run.sh]] اتحفظ في الـ repo بـ CRLF.

[[git status --short]] بعد الـ renormalize: [[M  run.sh]] (اتغير في الـ index لـ LF).
وبعد الـ commit:
[[i/lf    w/lf    attr/text eol=crlf    	build.bat]]
[[i/-text w/-text attr/-text            	logo.png]]
[[i/lf    w/crlf  attr/text=auto eol=lf 	run.sh]]
([[w/crlf]] لسه لأن الملف اللي على جهازك متلمسش، وهيبقى LF مع أول checkout. و [[build.bat]] هيطلع CRLF.)

و [[git check-attr -a]] بيطبع مثلًا [[run.sh: eol: lf]] و [[build.bat: eol: crlf]] و [[logo.png: binary: set]].`
        },
        {
          cmd: ".editorconfig",
          title: "ملف .editorconfig بيعمل إيه، وإزاي يخلي كل المحررات تكتب بنفس الطريقة؟",
          desc: R`[[.editorconfig]] ملف في أول المشروع بيقول لأي محرر (VS Code و JetBrains و Vim و Visual Studio) يكتب الملفات إزاي: مسافات ولا Tab، وكام مسافة، والترميز، ونهايات السطور، وسطر جديد في آخر الملف. كده كل واحد في الفريق يفتح المشروع بمحرره، والملفات تتكتب بنفس الطريقة.

الصيغة شبه INI:
• [[root = true]] فوق خالص: «ده أول المشروع، متدوّرش على [[.editorconfig]] في الفولدرات اللي فوق».
• [[[*]]]: قسم بنمط ملفات. [[*]] كل الملفات، و [[[*.py]]] ملفات Python، و [[[*.{js,ts}]]] الاتنين، و [[[Makefile]]] ملف بالاسم.
• تحت كل قسم [[key = value]]. الأقسام اللي تحت بتغطي على اللي فوق للملفات اللي تطابقها.
• [[#]] أو [[;]] تعليق.

الإعدادات:
• [[charset = utf-8]].
• [[end_of_line = lf]] (أو [[crlf]]).
• [[indent_style = space]] أو [[tab]]، و [[indent_size = 2]].
• [[insert_final_newline = true]]: سطر جديد في آخر الملف.
• [[trim_trailing_whitespace = true]]: يشيل المسافات اللي في آخر السطور. (في Markdown خليها [[false]] لأن مسافتين في آخر السطر معناها سطر جديد.)
• [[max_line_length]]: بعض المحررات بتستخدمه.

VS Code محتاج إضافة EditorConfig for VS Code عشان يقراه. JetBrains و Visual Studio بيقروه لوحدهم. وفي CI: [[npx editorconfig-checker]] بيقولك أنهي ملف مخالف.

الفرق بينه وبين Prettier: [[.editorconfig]] بيظبط الكتابة الأساسية في المحرر لأي لغة، و Prettier ([[.prettierrc]]) بيعيد تنسيق الكود نفسه (أقواس وفواصل وطول السطر) للغات اللي بيفهمها، وبيقرا [[.editorconfig]] كمان.`,
          example: R`# الملف ده في أول المشروع
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.py]
indent_size = 4

[Makefile]
indent_style = tab

[*.md]
trim_trailing_whitespace = false`,
          flag: "script",
          try: R`حط المثال في [[.editorconfig]] في فولدر تجربة، ونزّل إضافة EditorConfig في VS Code. اعمل [[a.py]] واكتب دالة ودوس Tab جوه (هتلاقيها ٤ مسافات)، و [[b.js]] (مسافتين). اكتب سطر بمسافات في آخره واحفظ. وبعدين اعمل [[Makefile]] بسطر داخل بمسافات بإيدك ونفّذ [[npx editorconfig-checker]].`,
          deep: {
            why: R`المسافات والـ Tabs ونهايات السطور حاجات «مش مرئية»، فكل واحد في الفريق محرره بيعمل حاجة مختلفة، والنتيجة diffs مليانة تغييرات فاضية و conflicts وملفات Python أو Makefile بتقع. ملف واحد صغير في الـ repo بيحسم ده لكل المحررات.`,
            how: R`لما تفتح ملف، الإضافة بتدوّر على [[.editorconfig]] في فولدر الملف وكل الفولدرات اللي فوقه لحد ما تلاقي [[root = true]]، وتطبق الأقسام اللي بتطابق اسم الملف بالترتيب (الأخير يكسب)، وتظبط المحرر للملف ده بس. وبتطبق [[trim_trailing_whitespace]] و [[insert_final_newline]] وقت الحفظ.`,
            when: R`في أي مشروع فيه أكتر من شخص أو أكتر من محرر، ومعاه [[.gitattributes]] (Git) و Prettier (التنسيق).`,
            mistakes: R`تحطه ومتسطّبش الإضافة في VS Code فميحصلش حاجة. تحط [[indent_style = space]] على [[Makefile]] (لازم Tab). تنسى [[root = true]] فإعدادات من فولدر فوق المشروع تتطبق. وتشيل المسافات من آخر السطور في Markdown فالـ line breaks تضيع.`
          },
          lines: [
            R`ده أول المشروع، متدوّرش فوقه.`,
            R`قسم لكل الملفات.`,
            R`الترميز UTF-8 من غير BOM.`,
            R`نهايات سطور LF.`,
            R`مسافات مش Tab.`,
            R`كل مستوى مسافتين.`,
            R`سطر جديد في آخر الملف.`,
            R`شيل المسافات من آخر السطور وقت الحفظ.`,
            R`ملفات Python بس...`,
            R`...٤ مسافات (العُرف في Python).`,
            R`ملف اسمه Makefile بالظبط...`,
            R`...لازم Tab (درس Makefile).`,
            R`ملفات Markdown...`,
            R`...متشيلش المسافات اللي في آخر السطر.`
          ],
          sol: R`في [[a.py]] الـ Tab بيكتب ٤ مسافات، وفي [[b.js]] مسافتين، والمسافات اللي في آخر السطر بتختفي لما تحفظ. VS Code بيكتب تحت في الـ status bar [[Spaces: 4]] أو [[Spaces: 2]] على حسب الملف.

و [[npx editorconfig-checker]] على ملفات فيها مخالفات بيطبع:
[[Makefile:]]
[[	2: wrong indentation type (spaces instead of tabs)]]
[[a.py:]]
[[	2: wrong amount of left-padding spaces(want multiple of 4)]]
[[b.js:]]
[[	1: trailing whitespace]]
[[3 errors found]]`
        }
      ]
    },
    {
      t: "Docker والبناء: Dockerfile و compose.yaml و Makefile",
      l: 2,
      n: "ملفات من غير امتداد بس من أهم الملفات في أي مشروع: Dockerfile و .dockerignore و compose.yaml، و Makefile اللي بيجمع أوامر المشروع في مكان واحد",
      items: [
        {
          cmd: "Dockerfile",
          title: "Dockerfile بيتكتب إزاي، وكل سطر فيه (FROM و COPY و RUN و CMD) بيعمل إيه؟",
          desc: R`[[Dockerfile]] (بالظبط كده، D كبيرة ومن غير امتداد) وصفة بتقول لـ Docker يبني image لتطبيقك خطوة خطوة: ابدأ من نظام فيه Node، انسخ الكود، سطّب المكتبات، وشغّل بالأمر ده. التفاصيل في تاب Docker.

الصيغة: كل سطر [[INSTRUCTION arguments]]، والأوامر بالحروف الكبيرة بالعُرف، و [[#]] تعليق. وأهم الأوامر:
• [[FROM node:20-alpine]]: الـ image اللي هتبدأ منه. لازم أول أمر. [[20-alpine]] اسمه tag: Node 20 على Alpine لينكس (صغير).
• [[WORKDIR /app]]: الفولدر اللي هتشتغل فيه جوه الـ image (بيتعمل لو مش موجود).
• [[COPY src dest]]: انسخ من جهازك (من الـ build context) لجوه الـ image.
• [[RUN command]]: نفّذ أمر وقت البناء (تسطيب مكتبات، build).
• [[ENV KEY=value]]: متغير بيئة.
• [[EXPOSE 3000]]: توثيق إن التطبيق بيسمع على 3000 (مش بيفتح البورت فعلًا، ده [[-p]] أو [[ports:]]).
• [[USER node]]: شغّل التطبيق بيوزر عادي مش root (أمان).
• [[CMD ["node", "server.js"]]]: الأمر اللي بيتنفذ لما الـ container يشتغل. الشكل ده (JSON array، اسمه exec form) هو الصح، عشان الإشارات زي Ctrl+C توصل للتطبيق.
• [[ARG]] (متغير وقت البناء بس)، و [[ENTRYPOINT]]، و [[HEALTHCHECK]]، و [[FROM ... AS build]] (multi-stage: مرحلة تبني ومرحلة تشغّل الناتج بس).

الترتيب مهم عشان الـ cache: كل سطر بيعمل طبقة (layer)، و Docker بيعيد استخدام الطبقة لو اللي قبلها ومدخلاتها متغيرتش. عشان كده بننسخ [[package*.json]] ونعمل [[npm ci]] الأول، وبعدين ننسخ باقي الكود: لو غيّرت كود بس، التسطيب ميتعادش.

وأخوات: [[Dockerfile.dev]] أو [[api.Dockerfile]] لو عندك أكتر من واحد ([[docker build -f Dockerfile.dev .]])، و [[Containerfile]] نفس الحاجة في Podman.`,
          example: R`# syntax=docker/dockerfile:1
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
USER node
CMD ["node", "server.js"]`,
          flag: "script",
          try: R`في فولدر فيه [[package.json]] (من [[npm init -y]]) و [[server.js]] بيعمل سيرفر بسيط على [[process.env.PORT || 3000]]، نفّذ [[npm install]] عشان يتعمل [[package-lock.json]]، وحط المثال في [[Dockerfile]] واعمل [[.dockerignore]] (الدرس الجاي). بعدين: [[docker build -t gym-api .]] و [[docker run --rm -p 8080:3000 gym-api]] وافتح [[http://localhost:8080]]. وجرّب [[docker run --rm gym-api whoami]] و [[docker run --rm gym-api ls -a /app]]. غيّر سطر في [[server.js]] وابني تاني ولاحظ الخطوات اللي مكتوب جنبها [[CACHED]].`,
          deep: {
            why: R`«شغال على جهازي» مشكلة قديمة: نسخة Node مختلفة، أو مكتبة نظام ناقصة. الـ Dockerfile بيكتب البيئة كلها ككود، فالـ image اللي بيتبني على جهازك هو هو اللي بيشتغل على السيرفر و CI.`,
            how: R`[[docker build .]] بيبعت الفولدر (الـ context، ماعدا اللي في [[.dockerignore]]) للـ Docker engine، اللي بينفذ الأوامر بالترتيب: كل [[RUN]] و [[COPY]] بيعمل طبقة جديدة فوق اللي قبلها. ولكل خطوة بيحسب hash لمدخلاتها، ولو موجودة في الـ cache بيستخدمها ([[CACHED]]). و [[CMD]] بيتسجل في إعدادات الـ image بس، وبيتنفذ مع [[docker run]].`,
            when: R`أي تطبيق هيترفع على سيرفر أو cloud، وأي مشروع عايز الكل يشغّله بأمر واحد.`,
            mistakes: R`[[COPY . .]] قبل [[npm ci]] فأي تعديل يعيد التسطيب كله. من غير [[.dockerignore]] فـ [[node_modules]] بتاعة جهازك و [[.env]] يدخلوا الـ image. [[CMD node server.js]] (shell form) فـ Ctrl+C و [[docker stop]] مبيوصلوش للتطبيق (بيستنى ١٠ ثواني ويقتله). وتسمّي الملف [[dockerfile]] أو [[Dockerfile.txt]] فـ [[docker build .]] ميلاقيهوش.`
          },
          lines: [
            R`ابدأ من image فيها Node 20 على Alpine. (السطر اللي فوق تعليق بيقول نسخة صيغة الـ Dockerfile.)`,
            R`كل اللي جاي جوه [[/app]].`,
            R`[[package.json]] و [[package-lock.json]] بس الأول (عشان الـ cache).`,
            R`سطّب من الـ lock بالظبط من غير أدوات التطوير.`,
            R`باقي الكود (ماعدا اللي في [[.dockerignore]]).`,
            R`متغير بيئة جوه الـ container.`,
            R`توثيق للبورت.`,
            R`اليوزر [[node]] موجود جاهز في الـ image الرسمية: متشغّلش كـ root.`,
            R`الأمر اللي بيتشغّل، بالشكل الـ JSON array.`
          ],
          sol: R`[[docker build]] بيطبع الخطوات [[[1/5] FROM ...]] لحد [[[5/5] COPY . .]] وفي الآخر [[naming to docker.io/library/gym-api]]. و [[docker run -p 8080:3000]] بيطبع [[listening on 3000]] والمتصفح بيعرض ok.

[[docker run --rm gym-api whoami]] ← [[node]]
[[docker run --rm gym-api ls -a /app]] ← [[package.json]] و [[package-lock.json]] و [[server.js]] و [[.dockerignore]]، ومفيش [[.env]] ولا [[Dockerfile]].

ولما تغيّر [[server.js]] بس وتبني تاني، خطوات [[WORKDIR]] و [[COPY package*.json]] و [[RUN npm ci]] بيبقى جنبها [[CACHED]]، و [[COPY . .]] بس اللي بتتعاد.`
        },
        {
          cmd: ".dockerignore",
          title: "ملف .dockerignore بيمنع إيه، وإيه اللي بيحصل من غيره؟",
          desc: R`[[.dockerignore]] بنفس فكرة [[.gitignore]]: ليستة أنماط للملفات اللي [[docker build]] ميبعتهاش للـ engine (الـ build context). وبالتالي مش هتدخل الـ image مع [[COPY . .]]. بيتحط جنب الـ [[Dockerfile]] (في أول الـ context).

الصيغة: نمط في كل سطر، و [[#]] تعليق، و [[*]] و [[**]] و [[!]] للاستثناء، زي [[.gitignore]] تقريبًا. (فرق صغير: الأنماط هنا من أول الـ context، فـ [[node_modules]] معناها الفولدر اللي في الأول، و [[**/node_modules]] لأي مكان.)

حط فيه دايمًا:
• [[node_modules]]: الـ image بيسطّب مكتباته بنفسه بـ [[npm ci]]. ومكتبات جهازك ممكن تبقى متبنية لويندوز أو ماك ومتشتغلش على لينكس.
• [[.git]]: تاريخ المشروع كله، ممكن يبقى أكبر من الكود نفسه.
• [[.env]] وأي أسرار: لو دخلوا الـ image، أي حد معاه الـ image يقدر يقراهم ([[docker run image cat .env]]).
• [[*.log]] و [[dist]] و [[coverage]] و [[.vscode]].
• [[Dockerfile]] و [[compose.yaml]] نفسهم (مش محتاجهم جوه).

ليه ده مهم:
• السرعة: [[docker build]] بيبعت الـ context كله قبل ما يبدأ. فولدر فيه [[node_modules]] ممكن يبقى مئات الميجا كل build.
• الحجم: الـ image يبقى أصغر.
• الأمان: الأسرار متدخلش الـ image اللي ممكن يترفع على Docker Hub.
• الـ cache: أي تغيير في ملف مش محتاجه (log مثلًا) بيكسر الـ cache بتاع [[COPY . .]].`,
          example: R`node_modules
.git
.env
*.log
Dockerfile`,
          flag: "script",
          try: R`في مشروع الدرس اللي فات اعمل [[.env]] فيه [[SECRET=x]]، وفولدر [[node_modules/big]] فيه ملف كبير ([[head -c 5000000 /dev/urandom > node_modules/big/blob]]). ابني مرة من غير [[.dockerignore]] (غيّر اسمه مؤقتًا) بـ [[docker build --no-cache --progress=plain -t test .]] ودوّر على سطر [[transferring context]]، و [[docker run --rm test ls -a /app]]. ورجّعه وابني تاني وقارن.`,
          deep: {
            why: R`[[COPY . .]] مريح بس خطير: بينسخ «كل حاجة». والـ [[.dockerignore]] هو اللي بيحدد «كل حاجة» دي فيها إيه. وكمان Docker محتاج يبعت الـ context للـ engine (اللي ممكن يبقى على جهاز تاني) قبل ما يبدأ.`,
            how: R`أول ما تكتب [[docker build .]] الـ client بيقرا [[.dockerignore]]، ويجمع كل الملفات اللي مش متجاهلة في الفولدر، ويبعتها للـ engine. أي ملف متجاهل مش موجود بالنسبة للـ build خالص، حتى لو كتبت [[COPY .env .]] صراحة هيقولك مش موجود.`,
            when: R`مع أي Dockerfile فيه [[COPY . .]]، يعني تقريبًا دايمًا.`,
            mistakes: R`تنسى [[.env]] فالسر يدخل الـ image ويترفع على Docker Hub. تكتب [[node_modules/]] وتفتكر إنها هتتجاهل في الفولدرات الفرعية كمان (اكتب [[**/node_modules]]). وتتجاهل ملف التطبيق محتاجه فعلًا (زي [[package-lock.json]]) فـ [[npm ci]] يقع.`
          },
          lines: [
            R`مكتبات جهازك ميدخلوش: الـ image بيسطّب بنفسه.`,
            R`تاريخ Git.`,
            R`الأسرار.`,
            R`أي log.`,
            R`الـ Dockerfile نفسه مش محتاجه جوه.`
          ],
          sol: R`من غير [[.dockerignore]]:
[[#8 transferring context: 5.00MB 0.1s done]]
و [[ls -a /app]] فيه [[.env]] و [[Dockerfile]] و [[node_modules]]. يعني السر بقى جوه الـ image، و [[docker run --rm test cat .env]] بيطبع [[SECRET=x]].

مع [[.dockerignore]]:
[[#6 transferring context: 177B done]]
و [[ls -a /app]] فيه [[.dockerignore]] و [[package.json]] و [[package-lock.json]] و [[server.js]] بس. والـ image أصغر (في التجربة دي 193MB بدل 203MB).`
        },
        {
          cmd: "compose.yaml",
          title: "compose.yaml (docker-compose.yml) جواه إيه، وبيشغّل كذا container مع بعض إزاي؟",
          desc: R`[[compose.yaml]] ملف YAML بيوصف تطبيقك كله: كل خدمة (container) وإعداداتها، والشبكة بينهم، والـ volumes. و [[docker compose up]] بيشغّل كله بأمر واحد. الاسم القديم [[docker-compose.yml]] لسه شغال، والجديد المفضل [[compose.yaml]]، وأمر [[docker-compose]] بالشرطة القديم اتبدل بـ [[docker compose]]. التفاصيل في تاب Docker.

الهيكل:
• [[services:]]: كل مفتاح تحته خدمة: [[api]] و [[db]].
  [[build: .]]: ابني من الـ Dockerfile اللي في الفولدر ده. أو [[image: postgres:17]]: استخدم image جاهزة.
  [[ports: ["3000:3000"]]]: [[جهازك:الcontainer]]. متنصص (درس «مشكلة النرويج»).
  [[environment:]] متغيرات، و [[env_file: .env]] من ملف.
  [[volumes:]]: [[pgdata:/var/lib/postgresql/data]] (volume بيحفظ الداتا حتى لو الـ container اتمسح)، أو [[./src:/app/src]] (فولدر من جهازك).
  [[depends_on:]]: ابدأ دي الأول، ومع [[condition: service_healthy]] استنى لحد ما تبقى جاهزة فعلًا.
  [[healthcheck:]]: إزاي Docker يعرف الخدمة جاهزة.
  [[restart: unless-stopped]]: لو وقعت قوّمها تاني.
• [[volumes:]] في الآخر: تعريف الـ volumes بالاسم.

الخدمات بتكلّم بعض باسم الخدمة: الـ api بيوصل لقاعدة البيانات على [[db:5432]] مش [[localhost]]. لأن [[localhost]] جوه الـ container معناها الـ container نفسه.

و Compose بيقرا [[.env]] اللي جنبه لوحده عشان [[$__{VAR}]] جوه الـ YAML، وده غير [[env_file:]] اللي بيبعت المتغيرات لجوه الـ container.

أوامر: [[docker compose up -d]] (شغّل في الخلفية)، و [[docker compose ps]]، و [[docker compose logs -f api]]، و [[docker compose down]] (و [[-v]] تمسح الـ volumes كمان، يعني الداتا)، و [[docker compose config]] (اطبع الملف النهائي بعد المتغيرات: أحسن طريقة تفحص بيها).`,
          example: R`services:
  api:
    build: .
    ports:
      - "3000:3000"
    env_file: .env
    environment:
      DATABASE_URL: postgresql://app:secret@db:5432/gym
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
  db:
    image: postgres:17
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: gym
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d gym"]
      interval: 5s
      retries: 5
volumes:
  pgdata:`,
          flag: "script",
          try: R`في مشروع الـ Dockerfile حط المثال في [[compose.yaml]] (واعمل [[.env]] لو مش موجود). نفّذ [[docker compose config --quiet && echo valid]] وبعدين [[docker compose up -d --build]] و [[docker compose ps]] وافتح [[http://localhost:3000]]. وبعدين [[docker compose logs api]]. لما تخلص [[docker compose down -v]]. وجرّب تبوّظ المسافات في سطر [[image:]] وشغّل [[docker compose config]].`,
          deep: {
            why: R`أي تطبيق حقيقي مش container واحد: API وقاعدة بيانات و Redis وأحيانًا worker. تشغيلهم بأوامر [[docker run]] طويلة كل مرة مستحيل تفتكرها. الـ compose بيكتب ده كله في ملف واحد في الـ repo.`,
            how: R`[[docker compose up]] بيقرا الملف، يعمل network خاصة بالمشروع (اسمها [[<folder>_default]])، ويعمل الـ volumes، ويبني أو ينزّل الـ images، ويشغّل الخدمات بترتيب [[depends_on]]. وكل خدمة بتاخد اسم DNS على الشبكة دي هو اسم الخدمة، فـ [[db]] بيتحول لـ IP الـ container بتاع قاعدة البيانات.`,
            when: R`بيئة التطوير على جهازك (أشهر استخدام)، والسيرفرات الصغيرة (VPS) اللي عليها تطبيق كامل.`,
            mistakes: R`[[localhost]] بدل اسم الخدمة في رابط قاعدة البيانات. البورت مستخدم عندك ([[Bind for 0.0.0.0:3000 failed: port is already allocated]]): غيّر الرقم الشمال [[3001:3000]]. [[docker compose down -v]] وانت مش قاصد فتمسح الداتا. باسوردات حقيقية مكتوبة في الملف وهو في Git (حطها في [[.env]]). وتعمل [[depends_on]] من غير healthcheck فالـ api يبدأ قبل ما قاعدة البيانات تبقى جاهزة.`
          },
          lines: [
            R`كل الخدمات تحت المفتاح ده.`,
            R`خدمة اسمها [[api]].`,
            R`ابنيها من الـ Dockerfile اللي هنا.`,
            R`ليستة البورتات.`,
            R`[[جهازك:الcontainer]] بين تنصيص.`,
            R`متغيرات من ملف [[.env]].`,
            R`متغيرات مكتوبة هنا.`,
            R`الـ host هو [[db]] (اسم الخدمة) مش localhost.`,
            R`ابدأ بعد...`,
            R`...خدمة [[db]]...`,
            R`...لما الـ healthcheck بتاعها ينجح.`,
            R`لو وقعت قوّمها، إلا لو انت وقفتها.`,
            R`خدمة قاعدة البيانات.`,
            R`image جاهزة من Docker Hub.`,
            R`إعدادات الـ image (موثقة في صفحتها على Docker Hub).`,
            R`اليوزر.`,
            R`الباسورد.`,
            R`اسم القاعدة.`,
            R`الـ volumes بتاعة الخدمة دي.`,
            R`[[اسم:مسار جوه الcontainer]]: الداتا متضيعش لما الـ container يتمسح.`,
            R`إزاي نعرف إنها جاهزة.`,
            R`الأمر اللي بيفحص: [[pg_isready]].`,
            R`كل ٥ ثواني.`,
            R`٥ محاولات قبل ما تتعلّم unhealthy.`,
            R`تعريف الـ volumes بالاسم.`,
            R`volume اسمه [[pgdata]] بالإعدادات الافتراضية.`
          ],
          sol: R`[[docker compose config --quiet && echo valid]] ← [[valid]]
[[docker compose up -d --build]] بيبني الـ api ويستنى: [[Container ...-db-1 Waiting]] ثم [[Healthy]] ثم [[Container ...-api-1 Started]].
[[docker compose ps]] بيعرض [[db]] و [[Up ... (healthy)]]، و [[api]] و [[Up]].
والمتصفح بيعرض ok، و [[docker compose logs api]] فيه [[api-1  | listening on 3000]].

لو البورت 3000 مستخدم عندك: [[Bind for 0.0.0.0:3000 failed: port is already allocated]]، غيّره لـ [["3001:3000"]].
ولو بوّظت المسافات، [[docker compose config]] بيقول حاجة زي [[go-yaml load error in scanner at L15.C16: mapping values are not allowed in this context]] (مسافة زيادة قبل [[image:]]) أو [[did not find expected key]] (مسافة ناقصة)، والرقم بعد [[L]] هو السطر.`
        },
        {
          cmd: "Makefile",
          title: "Makefile بيتكتب إزاي، وليه لازم Tab مش مسافات؟",
          desc: R`[[Makefile]] (من غير امتداد) ملف بيقراه برنامج [[make]]، وفيه «أهداف» (targets) كل واحد ليه أوامر. أصله لبناء برامج C (بيبني بس الملفات اللي اتغيرت)، بس الناس بتستخدمه في أي مشروع كمكان واحد لكل الأوامر: [[make dev]] و [[make test]] و [[make deploy]]، بدل ما كل واحد يفتكر الأوامر الطويلة.

الصيغة:
• [[target: dependencies]]: اسم الهدف و [[:]] وبعدها الأهداف (أو الملفات) اللي لازم تتعمل الأول.
• تحتها سطور الأوامر، ولازم كل سطر يبدأ بـ Tab حقيقي، مش مسافات. ده أشهر غلط في Makefile.
• [[NAME = value]]: متغير، وبيتقري بـ [[$(NAME)]]. وتقدر تغيّره من الأمر: [[make build APP=other]].
• [[.PHONY: dev build]]: الأهداف دي مش أسامي ملفات، عشان لو فيه ملف اسمه [[build]] متتلخبطش.
• [[#]] تعليق.
• أول هدف في الملف هو الافتراضي لما تكتب [[make]] لوحدها.
• [[@]] قبل أمر: متطبعش الأمر نفسه.

[[make]] بييجي مع لينكس والماك (مع Xcode Command Line Tools). على ويندوز مش موجود افتراضيًا (WSL، أو [[choco install make]]).

الفكرة الأصلية: لو الهدف اسم ملف ([[app: main.c]])، [[make]] بيبني بس لو [[main.c]] أحدث من [[app]]. وده سبب «Nothing to be done» لما مفيش حاجة اتغيرت.

[[make -n target]] بيطبع الأوامر من غير ما ينفذها (تجربة آمنة). ووأخوات بنفس الفكرة: [[justfile]] (أداة just) و [[Taskfile.yml]] (Task)، و [[scripts]] في [[package.json]].`,
          example: R`# أوامر المشروع
APP = gym-api
.PHONY: dev build test clean
dev:
	npm run dev
build:
	docker build -t $(APP) .
test: build
	docker run --rm $(APP) npm test
clean:
	rm -rf dist node_modules`,
          flag: "script",
          try: R`اكتب المثال في [[Makefile]] في VS Code (السطور الداخلة لازم Tab: VS Code بيحط Tab لوحده في الملفات اللي اسمها Makefile). نفّذ [[make -n]] و [[make -n test]] و [[make -n build APP=other]]. وبعدين حوّل الـ Tab في سطر لـ ٤ مسافات وشغّل [[make -n]]. (لو مفيش make: [[docker run --rm -v "$PWD":/w -w /w gcc:14 make -n]].)`,
          deep: {
            why: R`كل مشروع فيه أوامر طويلة بتتكرر (بناء الـ image، تشغيل الاختبارات جوه Docker، الـ deploy). Makefile بيدّيها أسامي قصيرة، وبيوثّقها في نفس الوقت، وبيشتغل في أي لغة. و [[make]] نفسه موجود على أي لينكس من السبعينات.`,
            how: R`[[make test]] بيقرا الـ Makefile، يلاقي إن [[test]] بيعتمد على [[build]]، فينفذ أوامر [[build]] الأول، وبعدين أوامر [[test]]. كل سطر أمر بيتنفذ في shell لوحده (فـ [[cd]] في سطر مش بيأثر على السطر اللي بعده). والـ Tab هو الطريقة الوحيدة اللي [[make]] بيعرف بيها إن السطر ده أمر مش تعريف جديد.`,
            when: R`مشاريع فيها أكتر من أداة (Docker و npm و migrations)، ومشاريع C و Go كتير، وأي مشروع عايز «أمر واحد يعمل كل حاجة».`,
            mistakes: R`مسافات بدل Tab ([[*** missing separator.  Stop.]]). تنسى [[.PHONY]] وفيه فولدر اسمه [[test]] فـ [[make test]] يقول [[is up to date]] ومينفذش. تكتب [[cd dir]] في سطر والأمر اللي بعده في سطر تاني (اكتبهم [[cd dir && cmd]]). و [[$]] في أوامر shell لازم تتكتب [[$$]] جوه Makefile.`
          },
          lines: [
            R`متغير.`,
            R`الأهداف دي أوامر مش ملفات.`,
            R`هدف [[dev]]، وهو الأول فـ [[make]] لوحدها تشغّله.`,
            R`أمر الهدف: بيبدأ بـ Tab.`,
            R`هدف [[build]].`,
            R`[[$(APP)]] بيتبدّل بـ [[gym-api]].`,
            R`[[test]] بيعتمد على [[build]]: هيتنفذ الأول.`,
            R`بعد الـ build شغّل الاختبارات.`,
            R`هدف التنضيف.`,
            R`يمسح الناتج والمكتبات.`
          ],
          sol: R`الناتج الحقيقي ([[-n]] بيطبع بس):
[[make -n]] ← [[npm run dev]]
[[make -n test]] ←
[[docker build -t gym-api .]]
[[docker run --rm gym-api npm test]]
[[make -n build APP=other]] ← [[docker build -t other .]]

ومع مسافات بدل Tab:
[[Makefile:5: *** missing separator.  Stop.]]
وهدف مش موجود: [[make: *** No rule to make target 'nothing'.  Stop.]]`
        }
      ]
    },
    {
      t: "ملفات المشاريع في اللغات التانية",
      l: 2,
      n: "نفس فكرة package.json في Python و Java و Android و .NET: requirements.txt و pyproject.toml، و pom.xml و build.gradle، و AndroidManifest.xml و strings.xml، و .csproj و .sln و appsettings.json",
      items: [
        {
          cmd: "requirements.txt و pyproject.toml",
          title: "مشروع Python بيحدد مكتباته إزاي: requirements.txt ولا pyproject.toml؟",
          desc: R`فيه طريقتين هتقابلهم في مشاريع Python:

[[requirements.txt]] (القديمة والبسيطة): ليستة مكتبات، واحدة في كل سطر، و [[pip install -r requirements.txt]] بيسطّبها. قواعده:
• [[fastapi==0.115.6]]: نسخة بالظبط.
• [[pydantic~=2.10]]: متوافقة (2.10 وطالع لحد قبل 3).
• [[uvicorn[standard]>=0.32,<1.0]]: [[[standard]]] حاجات إضافية (extras)، و [[,]] بين شرطين.
• [[python-dotenv]]: أي نسخة (متعملهاش في production).
• [[#]] تعليق، و [[-r other.txt]] يقرا ملف تاني (زي [[requirements-dev.txt]]).
• [[pip freeze > requirements.txt]] بيكتب كل اللي متسطّب بالنسخ بالظبط (ده بيبقى شبه lock file).

[[pyproject.toml]] (الحديثة، TOML، درس [[.toml]]): ملف واحد بيوصف المشروع كله، زي [[package.json]]:
• [[[project]]]: الاسم والنسخة والوصف و [[requires-python]] و [[dependencies]] (ليستة بنفس صيغة requirements).
• [[[project.optional-dependencies]]]: مجموعات إضافية زي [[dev]]، وبتتسطّب بـ [[pip install -e ".[dev]"]].
• [[[project.scripts]]]: أوامر بتتعمل لما المشروع يتسطّب ([[gym-api = "gym_api.main:run"]] يعني اعمل أمر اسمه gym-api بينادي الدالة دي).
• [[[build-system]]]: الأداة اللي هتبني المشروع (hatchling أو setuptools).
• [[[tool.xxx]]]: إعدادات الأدوات كلها في نفس الملف: [[[tool.ruff]]] و [[[tool.pytest.ini_options]]] و [[[tool.mypy]]].
وأدوات زي uv و Poetry بتستخدمه وبتعمل lock file جنبه ([[uv.lock]] و [[poetry.lock]]).

وأي واحدة فيهم بتتسطّب جوه virtual environment، مش على Python بتاع النظام:
[[python3 -m venv .venv]] وبعدين [[source .venv/bin/activate]] (على ويندوز [[.venv\Scripts\activate]]). و [[.venv/]] في [[.gitignore]].

ملفات قديمة ممكن تقابلها: [[setup.py]] و [[setup.cfg]] (قبل pyproject)، و [[Pipfile]] و [[Pipfile.lock]] (pipenv)، و [[environment.yml]] (conda).`,
          example: R`[project]
name = "gym-api"
version = "1.4.0"
description = "API لحجز مواعيد الجيم"
requires-python = ">=3.11"
dependencies = [
    "fastapi>=0.115",
    "uvicorn[standard]>=0.32",
]
[project.optional-dependencies]
dev = ["pytest>=8", "ruff"]
[project.scripts]
gym-api = "gym_api.main:run"
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
[tool.ruff]
line-length = 100`,
          flag: "script",
          try: R`اعمل فولدر فيه المثال في [[pyproject.toml]]، و [[src/gym_api/__init__.py]] فاضي، و [[src/gym_api/main.py]] فيه [[def run(): print("gym-api شغال")]]. بعدين: [[python3 -m venv .venv]] و [[source .venv/bin/activate]] و [[pip install -e ".[dev]"]] و [[gym-api]]. وفي فولدر تاني جرّب [[requirements.txt]] فيه [[fastapi==0.115.6]] و [[pip install -r requirements.txt]] و [[pip freeze]].`,
          deep: {
            why: R`requirements.txt كان مجرد ليستة لـ pip، مفيهوش اسم المشروع ولا نسخته ولا إعدادات الأدوات، فكل أداة عملت ملف إعدادات لوحدها ([[setup.py]] و [[setup.cfg]] و [[pytest.ini]] و [[.flake8]]...). [[pyproject.toml]] (PEP 621) جمّع ده كله في ملف واحد بصيغة واضحة.`,
            how: R`[[pip install -e .]] بيقرا [[[build-system]]] وينزّل أداة البناء (hatchling)، اللي بتقرا [[[project]]] وتسطّب الـ [[dependencies]]، وتعمل أوامر [[[project.scripts]]] في [[.venv/bin/]]. و [[-e]] (editable) معناها إن أي تعديل في الكود يبان علطول من غير تسطيب تاني. والـ venv فولدر فيه نسخة Python ومكتباتها بس للمشروع ده.`,
            when: R`[[pyproject.toml]] لأي مشروع جديد (ومع uv أو Poetry). و [[requirements.txt]] هتلاقيه في مشاريع كتير وفي Dockerfiles ([[pip install -r requirements.txt]])، وبعض المنصات بتطلبه.`,
            mistakes: R`[[pip install]] بره الـ venv فتلخبط Python بتاع النظام (والتوزيعات الجديدة بترفض: [[error: externally-managed-environment]]). [[pip freeze]] بره الـ venv فيكتب كل مكتبات الجهاز. مكتبات من غير نسخ في production. وعلى أوبونتو [[python3 -m venv]] بيقع لو [[python3-venv]] مش متسطّب: [[The virtual environment was not created successfully because ensurepip is not available]]، والحل [[sudo apt install python3-venv]].`
          },
          lines: [
            R`بداية معلومات المشروع.`,
            R`الاسم اللي هيتسطّب بيه.`,
            R`النسخة.`,
            R`وصف.`,
            R`أقل نسخة Python.`,
            R`المكتبات اللي محتاجها: array على كذا سطر.`,
            R`مكتبة بشرط نسخة (نفس صيغة requirements).`,
            R`[[[standard]]] حاجات إضافية من المكتبة، و [[,]] في الآخر مسموحة في TOML.`,
            R`قفل الـ array.`,
            R`مجموعات اختيارية.`,
            R`مجموعة [[dev]]: أدوات التطوير.`,
            R`أوامر هتتعمل مع التسطيب.`,
            R`أمر [[gym-api]] بينادي [[run()]] في [[gym_api/main.py]].`,
            R`أداة البناء.`,
            R`تتنزّل الأول.`,
            R`الـ module اللي pip بيستخدمه.`,
            R`إعدادات أداة ruff في نفس الملف.`,
            R`طول السطر المسموح.`
          ],
          sol: R`[[pip install -e ".[dev]"]] بيسطّب fastapi و uvicorn و pytest و ruff ومكتباتهم، والمشروع نفسه. وبعدها [[gym-api]] بيطبع [[gym-api شغال]]، و [[pip show gym-api]] بيطبع:
[[Name: gym-api]]
[[Version: 1.4.0]]
[[Summary: API لحجز مواعيد الجيم]]

و [[pip freeze]] بعد [[pip install -r requirements.txt]] بيطبع كل حاجة اتسطّبت بالظبط، مش بس fastapi: [[annotated-types==...]] و [[anyio==...]] و [[fastapi==0.115.6]] و [[pydantic==...]] و [[starlette==...]]، وده الفرق بين «اللي طلبته» و «اللي اتسطّب».`
        },
        {
          cmd: "pom.xml و build.gradle",
          title: "pom.xml (Maven) و build.gradle.kts (Gradle) جواهم إيه؟",
          desc: R`مشاريع Java و Kotlin بتتبني بواحدة من أداتين، وكل واحدة ليها ملف:

[[pom.xml]] (Maven): XML (درس [[.xml]]). أهم الأجزاء:
• [[<groupId>]] و [[<artifactId>]] و [[<version>]]: هوية المشروع (اسمها coordinates). groupId غالبًا الدومين بالمقلوب [[com.gym]].
• [[<packaging>]]: [[jar]] أو [[war]].
• [[<properties>]]: متغيرات وإعدادات، زي نسخة Java.
• [[<dependencies>]]: كل [[<dependency>]] بالـ coordinates بتاعتها، و [[<scope>test</scope>]] يعني للاختبارات بس.
• [[<parent>]] (في Spring Boot): ياخد الإعدادات والنسخ من مشروع أب.
• [[<build><plugins>]]: أدوات البناء.
الأوامر: [[mvn package]] (يبني الـ jar في [[target/]])، و [[mvn test]]، و [[mvn dependency:tree]]. و [[mvnw]] و [[mvnw.cmd]] (Maven Wrapper) بيشغّلوا نسخة Maven محددة من غير ما تسطّبها.

[[build.gradle.kts]] (Gradle بـ Kotlin) أو [[build.gradle]] (Gradle بـ Groovy، الأقدم): كود مش XML، أقصر ومرن أكتر. ده الافتراضي في Android:
• [[plugins { ... }]]: نوع المشروع (java و application و com.android.application).
• [[dependencies { implementation("group:artifact:version") }]]: نفس الـ coordinates في سطر. [[testImplementation]] للاختبارات.
• [[repositories { mavenCentral() }]]: المكتبات بتتنزل منين.
• جنبه: [[settings.gradle.kts]] (اسم المشروع والـ modules)، و [[gradle.properties]] (إعدادات)، و [[gradlew]] و [[gradlew.bat]] و [[gradle/wrapper/]] (Gradle Wrapper)، و [[gradle/libs.versions.toml]] (كتالوج النسخ في مكان واحد).
الأوامر: [[./gradlew build]] (الناتج في [[build/]])، و [[./gradlew test]]، و [[./gradlew dependencies]].

[[target/]] و [[build/]] و [[.gradle/]] في [[.gitignore]]. والـ wrapper ([[mvnw]] و [[gradlew]] وفولدراتهم) بيتعمله commit.`,
          example: R`<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.gym</groupId>
  <artifactId>gym-api</artifactId>
  <version>1.4.0</version>
  <packaging>jar</packaging>
  <properties>
    <maven.compiler.release>21</maven.compiler.release>
  </properties>
  <dependencies>
    <dependency>
      <groupId>com.google.code.gson</groupId>
      <artifactId>gson</artifactId>
      <version>2.11.0</version>
    </dependency>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>5.11.3</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>`,
          flag: "script",
          try: R`اعمل فولدر فيه المثال في [[pom.xml]]، و [[src/main/java/com/gym/App.java]] فيه [[package com.gym;]] و class [[App]] بـ main بتطبع حاجة. ابنيه بـ [[mvn -q package]] (أو Docker: [[docker run --rm -v "$PWD":/w -w /w maven:3.9-eclipse-temurin-21 mvn -q package]]) وبص في [[target/]] وشغّل [[java -cp target/gym-api-1.4.0.jar com.gym.App]]. ولو عندك مشروع Android افتح [[app/build.gradle.kts]] وطلّع فيه الـ dependencies والـ plugins.`,
          deep: {
            why: R`مشروع Java فيه مئات المكتبات، ومحدش هيكتب [[javac -cp]] بكل المسارات بإيده. Maven جه بفكرة «convention over configuration»: الكود في [[src/main/java]] والاختبارات في [[src/test/java]] والناتج في [[target]]، والملف بيقول بس اللي مختلف. Gradle جه بعده بكود بدل XML وبناء أسرع (بيبني اللي اتغير بس).`,
            how: R`[[mvn package]] بيقرا الـ pom، وينزّل كل dependency (ومكتباتها) من Maven Central لـ [[~/.m2/repository]] مرة واحدة، ويمشي على مراحل ثابتة (lifecycle): compile ثم test ثم package. Gradle بيشغّل الـ [[build.gradle.kts]] ككود Kotlin يبني «graph» من المهام (tasks)، وبيخزن نتايجها في [[.gradle/]] و [[build/]] عشان يعيد بس اللي اتغير.`,
            when: R`Spring Boot (الاتنين، Maven أشهر شوية)، و Android (Gradle بس)، وأي مشروع Java أو Kotlin.`,
            mistakes: R`تحط نسخة Java في الملف مختلفة عن الـ JDK اللي عندك ([[release version 21 not supported]]). تعدّل [[build.gradle.kts]] في Android Studio ومتعملش Sync. تعمل commit لـ [[target/]] أو [[build/]]. وتنسى [[mvnw]] أو [[gradlew]] فكل واحد في الفريق يبني بنسخة مختلفة.`
          },
          lines: [
            R`الـ declaration.`,
            R`الـ root ومعاه الـ namespace بتاع Maven (درس xmlns)...`,
            R`...و namespace تاني اسمه [[xsi]]...`,
            R`...بيقول فين الـ schema اللي الملف ده ماشي عليها (المحررات بتستخدمها للتكملة والفحص).`,
            R`نسخة صيغة الـ POM، دايمًا 4.0.0.`,
            R`المجموعة: دومين بالمقلوب.`,
            R`اسم المشروع.`,
            R`نسخته.`,
            R`الناتج jar.`,
            R`إعدادات.`,
            R`نسخة Java اللي الكود بيتعمله compile ليها.`,
            R`قفل.`,
            R`المكتبات.`,
            R`مكتبة.`,
            R`groupId بتاعها.`,
            R`artifactId.`,
            R`النسخة.`,
            R`قفل.`,
            R`مكتبة تانية.`,
            R`JUnit...`,
            R`...للاختبارات.`,
            R`النسخة.`,
            R`[[test]]: متدخلش الـ jar النهائي.`,
            R`قفل.`,
            R`قفل [[dependencies]].`,
            R`قفل الـ root.`
          ],
          sol: R`[[mvn package]] بيطبع سطور [[[INFO]]] كتير (أول مرة بينزّل المكتبات والـ plugins وده بياخد وقت) وفي الآخر [[[INFO] BUILD SUCCESS]]. وفي [[target/]] هتلاقي [[classes/]] و [[gym-api-1.4.0.jar]] (الاسم من [[artifactId]] و [[version]]).

[[java -cp target/gym-api-1.4.0.jar com.gym.App]] بيشغّل الـ main ويطبع اللي فيها. أما [[java -jar target/gym-api-1.4.0.jar]] فبيقول [[no main manifest attribute, in target/gym-api-1.4.0.jar]]، لأن Maven مبيحطش [[Main-Class]] في الـ manifest غير لو ظبطت plugin (Spring Boot بيعمل ده لوحده).

ونفس المشروع بـ Gradle (Kotlin DSL) شكله كده، ومعاه [[settings.gradle.kts]] فيه سطر واحد [[rootProject.name = "gym-api"]]. و [[gradle run]] (أو [[./gradlew run]]) بيبني ويشغّل [[com.gym.App]] ويطبع نفس الناتج:`,
          solCode: R`plugins {
    java
    application
}
group = "com.gym"
version = "1.4.0"
java { toolchain { languageVersion = JavaLanguageVersion.of(21) } }
repositories { mavenCentral() }
dependencies {
    implementation("com.google.code.gson:gson:2.11.0")
    testImplementation("org.junit.jupiter:junit-jupiter:5.11.3")
}
application { mainClass = "com.gym.App" }`
        },
        {
          cmd: "AndroidManifest.xml و strings.xml",
          title: "AndroidManifest.xml و res/values/strings.xml جواهم إيه، وليه ' بتوقّع الـ build؟",
          desc: R`أي تطبيق Android فيه ملفات XML كتير جنب الكود (Kotlin أو Java). أهمهم اتنين:

[[app/src/main/AndroidManifest.xml]]: بطاقة التطبيق للنظام:
• [[<manifest>]] الـ root، وعليه [[xmlns:android]] (درس xmlns) عشان كل الـ attributes بتبدأ بـ [[android:]].
• [[<uses-permission>]]: الصلاحيات: [[INTERNET]] (من غيرها مفيش أي طلب للنت)، و [[CAMERA]]، و [[POST_NOTIFICATIONS]].
• [[<application>]]: اسم التطبيق ([[android:label]]) والأيقونة والـ theme.
• [[<activity>]]: كل شاشة، و [[android:exported="true"]] لو ممكن تتفتح من بره التطبيق.
• [[<intent-filter>]] فيه [[MAIN]] و [[LAUNCHER]]: دي الشاشة اللي بتفتح لما تدوس على الأيقونة.
• [[@string/app_name]] و [[@mipmap/ic_launcher]]: مراجع لملفات في [[res/]] بدل ما تكتب القيمة.

[[app/src/main/res/values/strings.xml]]: كل نصوص التطبيق في مكان واحد، وده اللي بيخلي الترجمة سهلة: نسخة عربي في [[res/values-ar/strings.xml]] بنفس الأسامي، والنظام بيختار على حسب لغة الموبايل.
• [[<string name="app_name">بوابة الجيم</string>]]، وفي Kotlin بتقراه [[getString(R.string.app_name)]].
• [[%1$s]] و [[%d]]: أماكن لقيم بتتحط وقت التشغيل ([[getString(R.string.welcome, name)]]).
• قواعد Android فوق قواعد XML: [[']] لازم [[\']]، و [["]] لازم [[\"]]، و [[&]] لازم [[&amp;]]، و [[<]] لازم [[&lt;]]، و [[@]] أو [[?]] في أول النص لازم [[\@]] و [[\?]].

وملفات تانية في [[res/]]: [[layout/*.xml]] (الشاشات بالـ Views القديمة)، و [[drawable/*.xml]] (أشكال وأيقونات vector)، و [[values/colors.xml]] و [[themes.xml]]. وفي Compose الحديث الشاشات بتتكتب Kotlin بس، والـ manifest والـ strings لسه زي ما هما. التفاصيل في تاب Kotlin و Android.`,
          example: R`<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <application
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:theme="@style/Theme.Gym">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`,
          flag: "script",
          try: R`لو عندك مشروع Android: افتح [[AndroidManifest.xml]] وقارنه بالمثال، وافتح [[res/values/strings.xml]] وضيف [[<string name="note">Don't forget</string>]] من غير backslash واعمل Build وشوف الغلط، وبعدين صلّحه. لو مفيش: احفظ المثال وملف strings اللي في الحل وافحصهم كـ XML بـ [[python3 -c "import xml.etree.ElementTree as ET; ET.parse('AndroidManifest.xml'); print('OK')"]].`,
          deep: {
            why: R`النظام لازم يعرف عن التطبيق حاجات قبل ما يشغّله: صلاحياته، وأول شاشة، وأيقونته. الـ manifest هو المكان ده. وفصل النصوص في [[strings.xml]] بيخلي الترجمة وتغيير الكلام من غير ما تلمس الكود.`,
            how: R`وقت الـ build، أداة اسمها AAPT2 بتقرا كل ملفات [[res/]] وتعمل لكل واحد رقم في class اسمها [[R]] ([[R.string.app_name]])، وبتحوّل الـ XML لصيغة binary جوه الـ APK. وبتدمج الـ manifest بتاعك مع manifests المكتبات (manifest merging). عشان كده غلط [[']] في strings بيوقف الـ build كله.`,
            when: R`كل تطبيق Android: صلاحية جديدة، أو شاشة جديدة، أو نص جديد في الواجهة.`,
            mistakes: R`تنسى [[INTERNET]] فكل طلبات الشبكة تقع بـ [[SecurityException]] أو [[Permission denied]]. تكتب [[Don't]] من غير [[\']] في strings فيقع الـ build ([[Apostrophe not preceded by \]]). تكتب النص مباشرة في الكود أو الـ layout بدل [[@string/]] (Android Studio بيحذرك [[Hardcoded string]]). وتنسى [[android:exported]] على activity فيها intent-filter فالـ build يرفض من Android 12.`
          },
          lines: [
            R`الـ declaration.`,
            R`الـ root، والـ namespace اللي بيخلي [[android:]] تشتغل.`,
            R`صلاحية النت. self-closing بـ [[/>]].`,
            R`بداية التطبيق، والـ attributes على كذا سطر للقراية.`,
            R`الاسم: مرجع لـ [[strings.xml]].`,
            R`الأيقونة من [[res/mipmap]].`,
            R`الـ theme، و [[>]] بتقفل تاج الفتح.`,
            R`شاشة.`,
            R`[[.MainActivity]]: النقطة يعني جوه package التطبيق.`,
            R`ممكن تتفتح من بره (من الـ launcher).`,
            R`إمتى الشاشة دي تتفتح.`,
            R`[[MAIN]]: نقطة البداية.`,
            R`[[LAUNCHER]]: تظهر في قايمة التطبيقات.`,
            R`قفل.`,
            R`قفل الشاشة.`,
            R`قفل التطبيق.`,
            R`قفل الـ root.`
          ],
          sol: R`الملفين سليمين كـ XML ([[OK]]). وملف [[strings.xml]] صح شكله كده (لاحظ [[\']] و [[&amp;]] و [[%1$s]]):

لو كتبت [[Don't]] من غير [[\]] الـ build بيقع برسالة فيها [[Apostrophe not preceded by \]]. ولو كتبت [[&]] لوحدها بيقع قبلها كـ XML غلط أصلًا.`,
          solCode: R`<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">بوابة الجيم</string>
    <string name="welcome">أهلًا يا %1$s</string>
    <string name="note">Don\'t forget &amp; come early</string>
    <string name="items_count">عندك %d منتج</string>
</resources>`
        },
        {
          cmd: ".csproj و .sln و appsettings.json",
          title: "مشروع .NET فيه إيه: .cs و .csproj و .sln و appsettings.json؟",
          desc: R`مشاريع C# و .NET ليها ملفاتها. التفاصيل في تاب C# و .NET.

• [[.cs]]: كود C#. ملف لكل class غالبًا، واسم الملف زي اسم الـ class بالعُرف (مش إجباري زي Java). و [[Program.cs]] نقطة البداية.
• [[.csproj]]: ملف المشروع، XML. في .NET الحديث (SDK-style) بقى قصير جدًا:
  [[<Project Sdk="Microsoft.NET.Sdk.Web">]]: نوع المشروع (Web أو Console أو Worker).
  [[<TargetFramework>net8.0</TargetFramework>]]: نسخة .NET.
  [[<Nullable>enable</Nullable>]] و [[<ImplicitUsings>]]: إعدادات اللغة.
  [[<PackageReference Include="..." Version="..." />]]: مكتبة من NuGet ([[dotnet add package X]] بيكتبها).
  وكل ملفات [[.cs]] اللي في الفولدر بتدخل المشروع لوحدها، مش محتاج تكتبها.
• [[.sln]] (Solution): بيجمّع كذا مشروع ([[Api]] و [[Domain]] و [[Tests]]) عشان Visual Studio و [[dotnet build]] يتعاملوا معاهم مرة واحدة. صيغته نص خاص مش XML، وبيتعدّل بـ [[dotnet sln add]] مش بإيدك. والجديد [[.slnx]] (XML وأبسط).
• [[appsettings.json]]: إعدادات التطبيق (JSON، و .NET بيقبل فيه تعليقات). و [[appsettings.Development.json]] بيغطي عليه وانت بتطوّر، و [[appsettings.Production.json]] على السيرفر. والقيم بتتقري في الكود بـ [[builder.Configuration["Jwt:Issuer"]]] أو تتربط بـ class.
• [[Properties/launchSettings.json]]: البورت وإعدادات التشغيل على جهازك.
• [[bin/]] و [[obj/]]: الناتج والملفات المؤقتة، في [[.gitignore]].
• [[.dll]]: الناتج: C# بيتحول لـ IL (زي bytecode بتاع Java) جوه [[.dll]]، و [[dotnet app.dll]] بيشغّله (المستوى ٣).

ترتيب الإعدادات: [[appsettings.json]] ثم [[appsettings.{Environment}.json]] ثم User Secrets ثم متغيرات البيئة ثم الـ command line، والأخير يكسب. ومتغير بيئة زي [[ConnectionStrings__Default]] ([[__]] بدل [[:]]) بيغطي على [[ConnectionStrings:Default]] اللي في الملف. عشان كده الباسوردات الحقيقية متتكتبش في [[appsettings.json]]: على جهازك [[dotnet user-secrets set]]، وعلى السيرفر متغيرات بيئة.`,
          example: R`<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.11" />
  </ItemGroup>
</Project>`,
          flag: "script",
          try: R`لو عندك .NET SDK (أو Docker: [[docker run --rm -it -v "$PWD":/w -w /w mcr.microsoft.com/dotnet/sdk:8.0 bash]]): [[dotnet new webapi -n Gym.Api]] وافتح [[Gym.Api/Gym.Api.csproj]] و [[appsettings.json]]. بعدين جوه الفولدر [[dotnet add package Microsoft.EntityFrameworkCore --version 8.0.11]] وشوف الـ csproj اتغير إزاي. واعمل solution: [[dotnet new sln -n Gym]] و [[dotnet sln Gym.sln add Gym.Api/Gym.Api.csproj]] و [[dotnet build Gym.sln]].`,
          deep: {
            why: R`زمان ملفات [[.csproj]] كانت مئات السطور فيها كل ملف بالاسم، وكل ما تضيف ملف يبقى فيه conflict. الـ SDK-style projects (من .NET Core) قلبتها: الافتراضيات المنطقية جوه الـ SDK، والملف بيقول بس الاستثناءات. و [[appsettings.json]] بديل [[web.config]] القديم (XML).`,
            how: R`[[dotnet build]] بيقرا الـ [[.csproj]] (هو في الحقيقة ملف MSBuild)، ويستورد إعدادات الـ SDK المكتوب في [[Sdk="..."]]، وينزّل الـ NuGet packages (restore) لـ [[~/.nuget/packages]]، ويعمل compile لكل [[.cs]] في الفولدر لـ [[bin/Debug/net8.0/Gym.Api.dll]]. ووقت التشغيل الـ configuration بيقرا المصادر بالترتيب ويدمجها.`,
            when: R`أي مشروع ASP.NET Core أو C# أو Unity (Unity بيعمل الـ csproj لوحده) أو MAUI.`,
            mistakes: R`تحط connection string فيه باسورد حقيقي في [[appsettings.json]] وتعمله commit. تعدّل [[.sln]] بإيدك وتبوّظه. تعمل commit لـ [[bin/]] و [[obj/]]. وتنسى إن [[appsettings.Development.json]] مبيتقريش غير لما [[ASPNETCORE_ENVIRONMENT=Development]].`
          },
          lines: [
            R`نوع المشروع: Web API (الـ SDK بيحدد الافتراضيات).`,
            R`مجموعة إعدادات.`,
            R`نسخة .NET.`,
            R`فحص الـ null في C#.`,
            R`[[using]] الشائعة بتتضاف لوحدها.`,
            R`قفل.`,
            R`مجموعة عناصر.`,
            R`مكتبة من NuGet بنسختها (self-closing).`,
            R`قفل.`,
            R`قفل الـ root.`
          ],
          sol: R`[[dotnet new webapi -n Gym.Api]] (SDK 8) بيعمل [[Gym.Api.csproj]] فيه نفس [[PropertyGroup]] اللي في المثال، وفي الـ [[ItemGroup]] مكتبتين: [[Microsoft.AspNetCore.OpenApi]] و [[Swashbuckle.AspNetCore]]. وبعد [[dotnet add package]] اتضاف سطر:
[[<PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.11" />]]
و [[dotnet sln add]] بيطبع [[Project $__btGym.Api/Gym.Api.csproj$__bt added to the solution.]]
و [[dotnet build Gym.sln]] بيخلص بـ [[Build succeeded.]] و [[0 Warning(s)]] و [[0 Error(s)]]، والناتج في [[Gym.Api/bin/Debug/net8.0/]]: [[Gym.Api.dll]] و [[Gym.Api.deps.json]] و [[Gym.Api.runtimeconfig.json]] و [[Gym.Api]] (ملف تشغيل للينكس).

و [[appsettings.json]] اللي بيتعمل مع الـ webapi شبه ده (وده بعد ما ضفنا connection string و Jwt):`,
          solCode: R`{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "Default": "Host=localhost;Database=gym;Username=app;Password=dev"
  },
  "Jwt": {
    "Issuer": "gym-api",
    "ExpiresMinutes": 60
  },
  "AllowedHosts": "*"
}`
        }
      ]
    }
]);
