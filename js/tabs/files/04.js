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
          teach: R`## الفكرة

المثال مش أمر بيتشغّل، ده ملف [[package.json]] كامل لمشروع React صغير اسمه [[gym-portal]]. هنقراه مفتاح مفتاح، ونشوف npm بيعمل إيه بكل واحد. كل الأوامر هنا اتجرّبت على ويندوز بـ Node 24.19 و npm 11.17 في فولدر تجربة.

---

## ١. الملف بيتعمل إزاي: [[npm init -y]]

~~~powershell
npm init -y
~~~

- [[npm]] (Node Package Manager): مدير المكتبات اللي بييجي مع Node.
- [[init]] (initialize): اعمل مشروع جديد، يعني اكتب [[package.json]].
- [[-y]] (yes): رد «أيوه» على كل الأسئلة بالقيم الافتراضية بدل ما يسألك سؤال سؤال.

في فولدر اسمه [[gym-portal]] كتب الملف ده:

~~~text package.json اللي اتعمل
{
  "name": "gym-portal",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs"
}
~~~

[[name]] خده من اسم الفولدر، و [[version]] بدأ من [[1.0.0]]، و [[license]] حط [[ISC]] (رخصة مفتوحة قصيرة). و [[type]] بقى [[commonjs]]: npm الحديث بيكتبه صراحة. ملف المثال بتاعنا فيه [[module]] بدله.

---

## ٢. المفاتيح الأولى: هوية المشروع

~~~text
  "name": "gym-portal",
  "version": "1.4.0",
  "private": true,
  "type": "module",
~~~

| المفتاح | معناه |
|---|---|
| [["name"]] | اسم المشروع: حروف صغيرة و [[-]]، من غير مسافات (npm بيرفض الحروف الكبيرة في الاسم) |
| [["version"]] | النسخة بصيغة semver (تحت) |
| [["private": true]] | npm هيرفض [[npm publish]] للمشروع ده (حسب الـ docs). تطبيقك مش مكتبة، فمش عايز يتنشر على npmjs.com بالغلط |
| [["type": "module"]] | أي ملف [[.js]] في المشروع يبقى ES module: يعني [[import]] و [[export]] بدل [[require]] (درس [[.js]] و [[.mjs]] و [[.cjs]]) |

> [[true]] من غير تنصيص: ده boolean في JSON، مش نص. لو كتبت [["true"]] بين تنصيص يبقى نص.

---

## ٣. [["scripts"]]: أوامر بأسامي

~~~text
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "test": "vitest run",
    "lint": "eslint ."
  },
~~~

كل مفتاح اسم، وقدامه أمر terminal عادي. [[npm run dev]] بينفّذ [[vite]]، و [[npm run build]] بينفّذ [[tsc --noEmit && vite build]]:

- [[tsc --noEmit]]: افحص أنواع TypeScript ومتطلّعش ملفات.
- [[&&]]: نفّذ اللي بعدي **بس لو** اللي قبلي نجح. فلو فيه خطأ أنواع، [[vite build]] مش هيشتغل.

[[npm run]] لوحدها بتعرض كل الـ scripts. على ملف المثال طلع:

~~~text الناتج
Lifecycle scripts included in gym-portal@1.4.0:
  test
    vitest run
available via $__btnpm run$__bt:
  dev
    vite
  build
    tsc --noEmit && vite build
  lint
    eslint .
~~~

لاحظ إن [[test]] لوحده فوق: ده اسم «محجوز» (lifecycle) زي [[start]]، فبيتشغّل بـ [[npm test]] من غير [[run]]. الباقي لازم [[npm run]].

### الأوامر دي بتيجي منين؟

[[vite]] و [[eslint]] مش أوامر في جهازك، دي جوه المشروع. لما بتسطّب مكتبة فيها أداة، npm بيحط ملف تشغيل في [[node_modules/.bin]]، و [[npm run]] بيضيف الفولدر ده للـ PATH وهو بينفّذ. جرّبناها: سطّبنا prettier وضفنا [["fmt": "prettier --version"]]:

~~~powershell
npm run fmt
~~~

~~~text الناتج
> gym-portal@1.0.0 fmt
> prettier --version

3.3.3
~~~

وفي [[node_modules/.bin]] لقينا [[prettier]] و [[prettier.cmd]] و [[prettier.ps1]] (نسخة لكل shell). لكن [[prettier --version]] مباشرة في الترمنال قال [[command not found]]، لأنه مش في الـ PATH بره npm.

ولو الأداة مش متسطّبة أصلًا، [[npm test]] على ملف المثال قال:

~~~text الناتج على ويندوز
> gym-portal@1.4.0 test
> vitest run

'vitest' is not recognized as an internal or external command,
operable program or batch file.
~~~

السطرين اللي بيبدأوا بـ [[>]] npm بيطبعهم عشان تعرف بينفّذ إيه. والرسالة دي من cmd، لأن npm على ويندوز بيشغّل الـ scripts في cmd (وعلى لينكس والماك في [[sh]]).

---

## ٤. [["dependencies"]] و [["devDependencies"]]

~~~text
  "dependencies": {
    "dayjs": "^1.11.13",
    "react": "^19.0.0"
  },
  "devDependencies": {
    "typescript": "~5.6.3",
    "vite": "^6.0.0"
  },
~~~

| المجموعة | فيها إيه | بتتضاف بـ |
|---|---|---|
| [[dependencies]] | اللي التطبيق محتاجه وهو شغّال: React و dayjs | [[npm install dayjs]] |
| [[devDependencies]] | أدوات وانت بتطوّر بس: TypeScript و Vite والاختبارات | [[npm install -D vite]] ([[-D]] = [[--save-dev]]) |

الفرق بيبان على السيرفر: [[npm ci --omit=dev]] بيسطّب [[dependencies]] بس. جرّبنا الاتنين على [[package.json]] اللي عملناه بـ [[npm init -y]]:

~~~powershell
npm install dayjs@1.11.13
npm install -D prettier@3.3.3
~~~

و [[@1.11.13]] بعد الاسم معناها «النسخة دي». والملف بقى في آخره:

~~~text package.json بعد التسطيب
  "dependencies": {
    "dayjs": "^1.11.13"
  },
  "devDependencies": {
    "prettier": "^3.3.3"
  }
~~~

احنا طلبنا [[1.11.13]] بالظبط، وnpm كتب [[^1.11.13]]: الـ [[^]] هو الافتراضي. واتعمل كمان [[package-lock.json]] وفولدر [[node_modules]] (الدرس الجاي).

ولو عايز تقرا مفتاح من غير ما تفتح الملف:

~~~powershell
npm pkg get dependencies
~~~

~~~text الناتج
{
  "dayjs": "^1.11.13"
}
~~~

---

## ٥. أرقام النسخ: semver و [[^]] و [[~]]

semver (Semantic Versioning) يعني إن كل رقم في [[1.11.13]] ليه معنى:

~~~text
1   .  11   .  13
MAJOR  MINOR   PATCH
~~~

| الرقم | بيزيد لما | مثال |
|---|---|---|
| MAJOR | تغيير ممكن يكسر كودك | [[1.11.13]] ← [[2.0.0]] |
| MINOR | ميزة جديدة، والقديم شغال | [[1.11.13]] ← [[1.12.0]] |
| PATCH | تصليح أخطاء بس | [[1.11.13]] ← [[1.11.14]] |

والرمز قبل الرقم اسمه range: بيقول npm يقبل أنهي نسخ.

| الـ range | يقبل | ميقبلش |
|---|---|---|
| [[^1.11.13]] | من [[1.11.13]] لحد قبل [[2.0.0]] | [[2.0.0]] و [[1.11.12]] |
| [[^0.2.3]] (MAJOR صفر) | من [[0.2.3]] لحد قبل [[0.3.0]] | [[0.3.0]] |
| [[~5.6.3]] | من [[5.6.3]] لحد قبل [[5.7.0]] | [[5.7.0]] |
| [[5.6.3]] | [[5.6.3]] بس | أي حاجة تانية |
| [[>=20]] (في [[engines]]) | 20 أو أي حاجة أكبر | 18 |

ليه [[^0.x]] أضيق؟ لأن قبل [[1.0.0]] المكتبة لسه بتتغير، فـ MINOR فيها ممكن يكسر.

وتقدر تسأل الـ registry «أنهي نسخ موجودة بتطابق الـ range ده؟» بـ [[npm view]]:

~~~powershell
npm view dayjs@^1.11.13 version
npm view typescript@~5.6.3 version
~~~

~~~text الناتج (أكتوبر ٢٠٢٦)
dayjs@1.11.13 '1.11.13'
dayjs@1.11.14 '1.11.14'
...
dayjs@1.11.23 '1.11.23'
5.6.3
~~~

يعني [[^1.11.13]] النهارده هيسطّب [[1.11.23]] لو مفيش lock file، و [[~5.6.3]] مفيش غير [[5.6.3]] لأن TypeScript نزّلت بعدها [[5.7]] على طول.

> المقارنة أرقام مش حروف: [[1.10.0]] أحدث من [[1.9.0]] لأن ١٠ أكبر من ٩، مع إن النص [["1.10.0"]] لو اترتب أبجديًا بييجي قبل [["1.9.0"]]. خلي ده في بالك وانت بتحل التمرين.

---

## ٦. [["engines"]]

~~~text
  "engines": {
    "node": ">=20"
  }
~~~

بيقول المشروع محتاج Node 20 أو أحدث. npm افتراضيًا بيطبع تحذير بس لو نسختك أقدم، ومع [[engine-strict=true]] في [[.npmrc]] بيرفض يسطّب (درس [[.npmrc]]).

---

## الخلاصة

| المفتاح | بيقول إيه |
|---|---|
| [[name]] و [[version]] | المشروع ده مين ونسخته كام |
| [[private]] | ممنوع يتنشر |
| [[type]] | [[.js]] تبقى ESM ولا CommonJS |
| [[scripts]] | أسامي الأوامر: [[npm run x]]، و [[npm test]] و [[npm start]] من غير run |
| [[dependencies]] | محتاجها وهو شغال |
| [[devDependencies]] | محتاجها وانت بتطوّر بس |
| [[engines]] | نسخة Node المطلوبة |

و [[^]] = نفس الـ MAJOR، و [[~]] = نفس الـ MINOR، ومن غير رمز = النسخة دي بالظبط.`,
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
          teach: R`## الفكرة

المثال ٧ أوامر بتمشي ورا بعض: نسطّب مكتبة، نبص جوه الـ lock file، نسطّب منه تسطيب نضيف، وبعدين نبوّظ التطابق بينه وبين [[package.json]] عن قصد ونشوف npm بيعمل إيه. اتجرّب على ويندوز (Node 24.19 و npm 11.17) في فولدر تجربة فيه [[git init]]، و [[jq]] اتشغّل على أوبونتو 24.04 جوه Docker لأنه مش متسطّب على ويندوز.

---

## ١. [[npm install dayjs@1.11.13]]

~~~powershell
npm install dayjs@1.11.13
~~~

~~~text الناتج
added 1 package, and audited 2 packages in 1s

found 0 vulnerabilities
~~~

- [[added 1 package]]: نزّل dayjs (ملهاش مكتبات تانية بتعتمد عليها).
- [[audited 2 packages]]: فحص الحزم ضد قاعدة الثغرات المعروفة. اتنين لأن المشروع نفسه بيتعد واحدة.

الأمر ده كتب في ٣ أماكن: [[package.json]] ([["dayjs": "^1.11.13"]])، و [[node_modules/dayjs]] (الملفات نفسها)، و [[package-lock.json]]. ده الـ lock اللي اتعمل كامل:

~~~text package-lock.json
{
  "name": "lock",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "lock",
      "version": "1.0.0",
      "license": "ISC",
      "dependencies": {
        "dayjs": "^1.11.13"
      }
    },
    "node_modules/dayjs": {
      "version": "1.11.13",
      "resolved": "https://registry.npmjs.org/dayjs/-/dayjs-1.11.13.tgz",
      "integrity": "sha512-oaMBel6gjolK862uaPQOVTA7q3TZhuSvuMQAAglQDOWYO9A91IrAOUJEyKVlqJlHE0vq5p5UXxzdPfMH/x6xNg==",
      "license": "MIT"
    }
  }
}
~~~

| المفتاح | معناه |
|---|---|
| [[lockfileVersion: 3]] | صيغة الملف. 3 هي صيغة npm 7 وأحدث |
| [[packages]] | مفتاح لكل حاجة متسطّبة، باسم مسارها على الديسك |
| [[""]] | المفتاح الفاضي ده المشروع نفسه، ونسخة من [[dependencies]] بتاعته |
| [[node_modules/dayjs]] | المكتبة اللي في [[node_modules/dayjs]] |

لاحظ الفرق: [[package.json]] بيقول [[^1.11.13]] (أي 1.x من دي وطالع)، والـ lock بيقول [[1.11.13]] بالظبط.

---

## ٢. [[jq '.packages["node_modules/dayjs"]' package-lock.json]]

[[jq]] أداة بتقرا JSON وتطلع منه جزء (درس [[jq]]). نفكّ الفلتر:

- [[.]]: الملف كله.
- [[.packages]]: خد المفتاح [[packages]].
- [[["node_modules/dayjs"]]]: وجواه المفتاح ده. بنكتبه بين أقواس وتنصيص (مش [[.node_modules/dayjs]]) لأن فيه [[/]].
- التنصيص الفردي [[' ']] حوالين الفلتر كله عشان الـ shell ميلمسش الأقواس والتنصيص اللي جوه.

~~~text الناتج (jq 1.7 على أوبونتو 24.04)
{
  "version": "1.11.13",
  "resolved": "https://registry.npmjs.org/dayjs/-/dayjs-1.11.13.tgz",
  "integrity": "sha512-oaMBel6gjolK862uaPQOVTA7q3TZhuSvuMQAAglQDOWYO9A91IrAOUJEyKVlqJlHE0vq5p5UXxzdPfMH/x6xNg==",
  "license": "MIT"
}
~~~

| الخانة | معناها |
|---|---|
| [[version]] | النسخة اللي اتسطّبت فعلًا |
| [[resolved]] | الرابط اللي الملف المضغوط ([[.tgz]]) نزل منه |
| [[integrity]] | بصمة (hash) للملف ده. [[sha512]] اسم الخوارزمية، والباقي البصمة مكتوبة base64 |
| [[license]] | رخصة المكتبة |

[[integrity]] هو اللي بيحميك: المرة الجاية npm هينزّل نفس الرابط ويحسب البصمة، ولو حرف واحد في الملف اتغير البصمة مش هتطابق والتسطيب يقف.

ولو [[jq]] مش عندك (زي ويندوز)، Node نفسه يقرا الملف:

~~~powershell
node -p "require('./package-lock.json').packages['node_modules/dayjs'].version"
~~~

~~~text الناتج
1.11.13
~~~

[[-p]] (print): نفّذ الكود ده واطبع نتيجته. وفي PowerShell 7 ينفع [[(Get-Content package-lock.json -Raw | ConvertFrom-Json -AsHashtable).packages['node_modules/dayjs'].version]]، بس من غير [[-AsHashtable]] بيقع بـ [[The provided JSON includes a property whose name is an empty string]] بسبب المفتاح الفاضي [[""]]. و Windows PowerShell 5.1 مفيهوش [[-AsHashtable]] أصلًا، فاستخدم سطر Node.

---

## ٣. [[npm ci]]: تسطيب نضيف

[[ci]] من clean install (والاسم كمان على مقاس Continuous Integration، يعني السيرفرات اللي بتبني وتختبر). قبل ما نشغّله حطينا ملف زيادة [[node_modules/extra.txt]]:

~~~text الناتج
added 1 package, and audited 2 packages in 2s
~~~

وبعدها [[node_modules]] فيه [[dayjs]] بس: [[extra.txt]] اتمسح. ده لأن [[npm ci]] بيمسح [[node_modules]] كله الأول، وبعدين يسطّب اللي في الـ lock بالظبط، من غير ما يغيّر الـ lock ولا [[package.json]].

---

## ٤. نبوّظ التطابق: [[npm pkg set]] ثم [[npm ci]]

~~~powershell
npm pkg set dependencies.zod="^3.23.0"
~~~

[[npm pkg set]] بيكتب مفتاح في [[package.json]] وبس، والنقطة في [[dependencies.zod]] معناها «جوه [[dependencies]]، المفتاح [[zod]]». مفيش تسطيب، فالـ lock لسه مفيهوش zod. نجرّب:

~~~powershell
npm ci
~~~

~~~text الناتج (أول السطور)
npm error code EUSAGE
npm error
npm error $__btnpm ci$__bt can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with $__btnpm install$__bt before continuing.
npm error
npm error Missing: zod@3.25.76 from lock file
~~~

- [[EUSAGE]]: غلط في طريقة الاستخدام.
- الجملة الطويلة: الملفين مش «in sync» (متطابقين)، وروح اعمل [[npm install]].
- [[Missing: zod@3.25.76 from lock file]]: npm سأل الـ registry عن أحدث نسخة بتطابق [[^3.23.0]] لقاها [[3.25.76]]، ومش لاقيها في الـ lock.

وبعدها npm بيطبع شرح كل خيارات [[npm ci]] (حوالي ٨٠ سطر) وفي الآخر مكان ملف الـ log. ده المقصود: على سيرفر الـ CI عايزه يقع بصوت عالي بدل ما يسطّب حاجة مختلفة عن اللي اتجرّبت.

---

## ٥. [[npm install]] بيصلّح، و [[git diff --stat]] بيوريك

~~~powershell
npm install
git diff --stat
~~~

~~~text الناتج
added 1 package, and audited 3 packages in 2s
 package-lock.json | 12 +++++++++++-
 package.json      |  3 ++-
 2 files changed, 13 insertions(+), 2 deletions(-)
~~~

[[npm install]] حسب zod ونزّلها وكتبها في الـ lock. و [[git diff --stat]] بيلخّص التغييرات اللي لسه متعملهاش commit: اسم كل ملف، وعدد السطور اللي اتغيرت، و [[+]] اتضاف و [[-]] اتشال. الملفين اتغيروا مع بعض، فبيتعملهم commit مع بعض.

---

## جدول الخطوات

| الأمر | بيلمس [[package.json]] | بيلمس الـ lock | بيلمس [[node_modules]] |
|---|---|---|---|
| [[npm install x]] | يضيف x | يكتب النسخة والـ hash | يضيف x |
| [[npm ci]] | لأ | لأ (ويقع لو مش متطابق) | يمسحه ويبنيه من الأول |
| [[npm pkg set]] | يكتب المفتاح | لأ | لأ |
| [[npm install]] | لأ | يحدّثه عشان يطابق | يكمّل الناقص |

## الخلاصة

- [[package.json]] = اللي **عايزه** (ranges). الـ lock = اللي **اتسطّب فعلًا** (نسخ مضبوطة + hash).
- الـ lock بيتعمله commit، ومحدش بيعدّله بإيده.
- على جهازك [[npm install]]، وفي CI و Docker [[npm ci]].
- نفس الفكرة في كل لغة: [[yarn.lock]] و [[pnpm-lock.yaml]] و [[poetry.lock]] و [[go.sum]] و [[Cargo.lock]] و [[composer.lock]].`,
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
          teach: R`## الفكرة

المثال ملف [[tsconfig.json]] لمشروع Node مكتوب TypeScript: الكود في [[src/]]، والـ JavaScript الناتج يروح [[dist/]]. هنقرا كل مفتاح، وبعدين نشغّل [[tsc]] عليه ونشوف الناتج. اتجرّب على ويندوز بـ Node 24.19، و [[npx -p typescript tsc]] نزّل TypeScript 7.0.2 (أحدث نسخة وقت التجربة) في فولدر فيه [[package.json]] مكتوب فيه [[{"type": "module"}]] وملف [[src/index.ts]].

---

## ١. الهيكل: object واحد فيه ٣ مفاتيح

~~~text
{
  "compilerOptions": { ... },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
~~~

- [[compilerOptions]]: إعدادات الـ compiler (هو [[tsc]]، من TypeScript Compiler): يحوّل إزاي ويفحص قد إيه.
- [[include]]: أنهي ملفات تدخل. [["src"]] يعني كل ملفات [[.ts]] جوه [[src]] وفولدراته.
- [[exclude]]: أنهي ملفات تتشال من اللي [[include]] جابه.

[[[ ]]] في JSON معناها array (ليستة)، و [[{ }]] معناها object.

---

## ٢. جوه [[compilerOptions]]

### [["target": "ES2022"]]

نسخة JavaScript اللي هتطلع. ES2022 (ECMAScript 2022) فيها حاجات زي [[class]] fields و [[await]] بره الدوال. Node 20 وأحدث فاهمها كلها، فمش محتاج تحويل لصيغة أقدم. لو حطيت [["ES5"]] الكود هيطلع أطول بكتير عشان يشتغل على متصفحات قديمة.

### [["module"]] و [["moduleResolution"]]: [["NodeNext"]]

- [[module]]: الـ [[import]] و [[export]] يطلعوا بأنهي شكل. [[NodeNext]] معناها «زي ما Node بيعمل»: بيبص على [["type"]] في [[package.json]]، ولأنه [["module"]] الناتج بيفضل [[import]]/[[export]] (ESM). لو كان [["commonjs"]] كان هيتحول [[require]].
- [[moduleResolution]]: لما تكتب [[import x from "./y.js"]] يدوّر على الملف فين. ولازم يمشي مع [[module]]، فالاتنين [[NodeNext]].

> مع [[NodeNext]] لازم تكتب الامتداد في الـ import: [[from "./utils.js"]] (أيوه [[.js]] حتى لو الملف [[utils.ts]])، لأن ده اللي Node هيدوّر عليه بعد التحويل.

### [["strict": true]]

بيشغّل كل الفحوصات الصارمة مرة واحدة: [[null]] لازم يتعامل معاه، وممنوع parameter من غير نوع. جرّبنا ملف فيه:

~~~text src/loose.ts
export function f(x) { return x; }
~~~

~~~text الناتج مع strict: true
src/loose.ts(1,19): error TS7006: Parameter 'x' implicitly has an 'any' type.
~~~

- [[(1,19)]]: السطر ١، الحرف رقم ١٩ (مكان [[x]]).
- [[TS7006]]: رقم الغلط، تقدر تدوّر بيه.
- [[implicitly has an 'any' type]]: انت مكتبتش نوع، فـ TypeScript كان هيعتبره [[any]] (أي حاجة)، وده بيلغي الفحص.

ومع [["strict": false]] نفس الملف عدّى من غير ولا كلمة. وفي TypeScript 7.0.2 لما شلنا سطر [[strict]] خالص الغلط ظهر برضو: [[strict]] بقى شغال افتراضيًا في النسخ الجديدة، بس اكتبه صريح عشان أي حد يقرا الملف يعرف.

### [["outDir": "dist"]] و [["rootDir": "src"]]

[[rootDir]] أول الكود، و [[outDir]] فين الناتج. الهيكل بيتنسخ: [[src/index.ts]] يطلع [[dist/index.js]]، و [[src/api/users.ts]] يطلع [[dist/api/users.js]].

### [["esModuleInterop": true]] و [["skipLibCheck": true]]

- [[esModuleInterop]]: مكتبات قديمة مكتوبة CommonJS ([[module.exports = ...]]) تقدر تعملها [[import express from "express"]] عادي.
- [[skipLibCheck]]: متفحصش ملفات [[.d.ts]] (ملفات الأنواع) بتاعة المكتبات في [[node_modules]]. الفحص أسرع، وغلط في مكتبة مش هيوقفك.

### التعليق و [["paths"]]

~~~text
    // للـ imports بـ @/ بدل ../../
    "paths": { "@/*": ["./src/*"] }
~~~

[[//]] تعليق: مسموح هنا لأن [[tsconfig.json]] صيغته JSONC (درس [[.jsonc]])، و [[JSON.parse]] كان هيقع عليه.

[[paths]] اختصار: [[@/*]] يعني أي import بيبدأ بـ [[@/]]، و [[*]] الباقي، ويتدوّر عليه في [[./src/*]]. فـ [[import { two } from "@/utils/num.js"]] يبقى [[./src/utils/num.js]]. جرّبناها: [[tsc]] عدّى من غير أخطاء، لكن [[node dist/main.js]] وقع:

~~~text الناتج
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@/utils' imported from C:\Users\ali\...\ts\dist\main.js
~~~

لأن [[tsc]] **مبيغيّرش** الـ import في الناتج، فـ [[dist/main.js]] لسه فيه [["@/utils/num.js"]] و Node ميعرفهاش. [[paths]] للفحص والمحرر بس، والتشغيل محتاج حد تاني يفهمها: Vite أو Next، أو [["imports"]] في [[package.json]].

---

## ٣. التشغيل: [[tsc]]

~~~powershell
npx -p typescript tsc
~~~

- [[npx]]: شغّل أداة من npm من غير ما تسطّبها في المشروع.
- [[-p typescript]] (package): الحزمة اسمها [[typescript]]، والأمر اللي جواها اسمه [[tsc]]، فبنقوله الاتنين.
- [[tsc]] من غير ملفات: «دوّر على [[tsconfig.json]] هنا واعمل اللي فيه».

مع [[src/index.ts]] فيه سطر واحد:

~~~text src/index.ts
export const greet = (name: string): string => $__bthi $__{name}$__bt;
~~~

[[tsc]] مطبعش حاجة (يعني مفيش أخطاء)، واتعمل [[dist/index.js]]:

~~~text dist/index.js
export const greet = (name) => $__bthi $__{name}$__bt;
~~~

الأنواع ([[: string]]) اتشالت بس، والـ [[export]] فضل زي ما هو عشان [[NodeNext]] و [["type": "module"]].

---

## ٤. [[tsc --showConfig]]: الإعدادات النهائية

~~~text الناتج (مختصر)
{
    "compilerOptions": {
        "module": "nodenext",
        "moduleResolution": "nodenext",
        "outDir": "./dist",
        ...
        "target": "es2022",
        "esModuleInterop": true,
        "moduleDetection": "force"
    },
    "files": [
        "./src/index.ts"
    ],
    ...
}
~~~

لاحظ ٣ حاجات: التعليق اختفى، والقيم اتكتبت بحروف صغيرة ([[nodenext]])، وظهر [["files"]] فيه كل ملف هيتعمله compile فعلًا. وظهر كمان [[moduleDetection]] مع إننا مكتبناهوش: ده إعداد اتحسب من [[NodeNext]]. ده أسرع طريقة تعرف «tsc شايف إيه بالظبط».

---

## الخلاصة

| المفتاح | بيحدد |
|---|---|
| [[target]] | نسخة JavaScript الناتجة |
| [[module]] و [[moduleResolution]] | شكل الـ imports وإزاي الملفات تتلاقى |
| [[strict]] | قد إيه الفحص صارم |
| [[rootDir]] و [[outDir]] | الكود فين والناتج فين |
| [[paths]] | اختصارات imports (للفحص بس، مش للتشغيل) |
| [[include]] و [[exclude]] | أنهي ملفات تدخل |

و [[npx tsc --init]] بيعمل ملف بداية فيه إعدادات وتعليقات (في TypeScript 7.0.2 طلع ٤٤ سطر)، و [[--showConfig]] بيقولك الإعدادات النهائية.`,
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
          try: R`في مشروع تجربة: [[echo 22 > .nvmrc]] و [[printf 'save-exact=true\nengine-strict=true\n' > .npmrc]]. لو عندك nvm نفّذ [[nvm use]]. وبعدين [[npm config get save-exact]] و [[npm config list]]، وجرّب [[npm install dayjs]] وشوف اتكتب في [[package.json]] بـ [[^]] ولا لأ.`,
          deep: {
            why: R`مشروع اتعمل على Node 18 ممكن يقع على Node 22 والعكس، ونسيان «المشروع ده محتاج أنهي نسخة» بيضيّع ساعات. [[.nvmrc]] بيكتب الإجابة جوه المشروع نفسه. و [[.npmrc]] بيخلي إعدادات npm الخاصة بالمشروع (registry، النسخ المضبوطة) تمشي مع الكود لكل الناس.`,
            how: R`nvm بيدوّر على [[.nvmrc]] في الفولدر الحالي وفوقه، وبيغيّر الـ PATH عشان [[node]] يشاور على النسخة دي (في الشيل الحالي بس). و npm بيقرا كل ملفات [[.npmrc]] ويدمجها (المشروع فوق اليوزر فوق الجهاز)، وبيبدّل [[$__{VAR}]] بمتغيرات البيئة.`,
            when: R`حط [[.nvmrc]] في أي مشروع Node من أول يوم. و [[.npmrc]] لما محتاج registry خاص أو إعداد لكل الفريق.`,
            mistakes: R`تعمل commit لتوكن حقيقي في [[.npmrc]] (GitHub نفسه بيكتشفه ويبعتلك تحذير، والتوكن بيتلغي). تنسى إن [[nvm use]] بيغيّر الشيل الحالي بس، فالترمنال الجديد يرجع للنسخة الافتراضية ([[nvm alias default 22]] يحل ده). وتحط [[legacy-peer-deps=true]] وتنسى إنه بيخبّي مشاكل حقيقية.`
          },
          teach: R`## الفكرة

المثال ٦ أوامر: ٣ لـ [[.nvmrc]] (نسخة Node) و ٣ لـ [[.npmrc]] (إعدادات npm). اتجرّبوا في فولدر فيه الملفين دول:

~~~text .nvmrc
22
~~~

~~~text .npmrc
save-exact=true
engine-strict=true
~~~

أوامر nvm اتجرّبت على أوبونتو 24.04 جوه Docker (nvm 0.40.3)، لأن nvm أداة لينكس والماك. وأوامر npm اتجرّبت على ويندوز (npm 11.17) وعلى نفس الأوبونتو (npm 10.9).

---

## ١. [[cat .nvmrc]]

[[cat]] بيطبع محتوى الملف (وفي PowerShell [[cat]] اسم تاني لـ [[Get-Content]]، فشغال برضو):

~~~text الناتج
22
~~~

سطر واحد، رقم النسخة. ممكن يبقى [[22]] (أحدث 22.x)، أو [[22.11.0]] بالظبط، أو [[lts/jod]] (اسم سلسلة الـ LTS، يعني Long Term Support: النسخ المدعومة لفترة طويلة). والنقطة في أول اسم الملف معناها إنه مخفي على لينكس والماك (درس الملفات المخفية).

---

## ٢. [[nvm use]]

nvm (Node Version Manager) بيخليك تسطّب كذا نسخة Node وتنقل بينهم. [[nvm use]] من غير رقم يعني «اقرا [[.nvmrc]]». أول مرة، والنسخة مش متسطّبة:

~~~text الناتج
Found '/p/.nvmrc' with version <22>
N/A: version "v22" is not yet installed.

You need to run $__btnvm install$__bt to install and use the node version specified in $__bt.nvmrc$__bt.
~~~

[[N/A]] (not available): مش موجودة عندك. فـ [[nvm install]] (برضو من غير رقم، بيقرا نفس الملف):

~~~text الناتج (آخر السطور)
Computing checksum with sha256sum
Checksums matched!
Now using node v22.23.3 (npm v10.9.9)
Creating default alias: default -> 22 (-> v22.23.3 *)
~~~

- [[Checksums matched]]: nvm نزّل Node واتأكد من البصمة بتاعته إنها مطابقة للي على موقع Node (نفس فكرة [[integrity]] في الـ lock).
- [[v22.23.3]]: أحدث 22.x وقت التجربة، لأن الملف فيه [[22]] بس.
- [[default alias]]: أول نسخة بتتسطّب بتبقى الافتراضية لأي ترمنال جديد.

وبعدها [[nvm use]] تاني:

~~~text الناتج
Found '/p/.nvmrc' with version <22>
Now using node v22.23.3 (npm v10.9.9)
~~~

> nvm بيغيّر الـ PATH في الترمنال ده بس. ترمنال جديد بيرجع للـ [[default]].

## ٣. [[node -v]]

~~~text الناتج
v22.23.3
~~~

[[-v]] (version): اطبع النسخة. ده تأكيد إن [[nvm use]] اشتغل.

### وعلى ويندوز؟

nvm الأصلي مش بيشتغل على ويندوز. فيه برنامج تاني اسمه nvm-windows بأوامر شبهه بس مختلفة. والأدوات اللي بتقرا [[.nvmrc]] على ويندوز ولينكس والماك: fnm ([[fnm use]]) و Volta، وده من الـ docs بتاعتهم (مش متجرّبين هنا). و GitHub Actions بيقراه بـ [[node-version-file: .nvmrc]].

---

## ٤. [[cat .npmrc]]

~~~text الناتج
save-exact=true
engine-strict=true
~~~

الصيغة [[key=value]]، سطر لكل إعداد:

| الإعداد | معناه |
|---|---|
| [[save-exact=true]] | [[npm install x]] يكتب النسخة من غير [[^]] |
| [[engine-strict=true]] | يرفض التسطيب لو Node مش زي [[engines]] في [[package.json]] |

## ٥. [[npm config get save-exact]]

[[npm config get]] بيطبع القيمة **الفعالة** لإعداد واحد، بعد ما يدمج كل ملفات [[.npmrc]]:

~~~text الناتج
true
~~~

## ٦. [[npm config list]]

بيطبع كل الإعدادات اللي مش افتراضية، ومجمّعة بمصدرها. على ويندوز:

~~~text الناتج
; "builtin" config from C:\Program Files\nodejs\node_modules\npm\npmrc

prefix = "C:\\Users\\ali\\AppData\\Roaming\\npm"

; "project" config from C:\Users\ali\...\rc\.npmrc

engine-strict = true
save-exact = true
save-prefix = ""

; node bin location = C:\Program Files\nodejs\node.exe
; node version = v24.19.0
; npm local prefix = C:\Users\ali\...\rc
; npm version = 11.17.0
; cwd = C:\Users\ali\...\rc
; HOME = C:\Users\ali
; Run $__btnpm config ls -l$__bt to show all defaults.
~~~

- السطور اللي بتبدأ بـ [[;]] تعليقات (زي INI).
- [["builtin"]]: ملف جاي مع npm نفسه، و [[prefix]] فيه مكان الأدوات اللي بتتسطّب بـ [[-g]].
- [["project"]]: ملف المشروع بتاعنا. لو كان عندك [[~/.npmrc]] كان هيظهر قسم [["user"]] كمان.
- [[save-prefix = ""]]: احنا مكتبناهاش! npm حسبها من [[save-exact=true]]: الـ prefix اللي بيتحط قبل النسخة (افتراضيًا [[^]]) بقى فاضي.
- آخر جزء معلومات: نسخة Node و npm، والـ [[cwd]] (current working directory: الفولدر الحالي).

---

## ٧. الإعدادين بيعملوا إيه فعلًا

**[[save-exact]]:** على الأوبونتو [[npm install dayjs]] وبعدين [[npm pkg get dependencies]]:

~~~text الناتج
{
  "dayjs": "1.11.23"
}
~~~

من غير [[^]].

**[[engine-strict]]:** على ويندوز (Node 24) حطينا [["engines": { "node": ">=26" }]] وجرّبنا [[npm install dayjs]]:

~~~text الناتج
npm error code EBADENGINE
npm error engine Unsupported engine
npm error engine Not compatible with your version of node/npm: rc@1.0.0
npm error notsup Not compatible with your version of node/npm: rc@1.0.0
npm error notsup Required: {"node":">=26"}
npm error notsup Actual:   {"node":"v24.19.0","npm":"11.17.0"}
~~~

[[EBADENGINE]] (bad engine): المطلوب [[>=26]] والموجود [[v24.19.0]]، فوقف. من غير [[engine-strict]] كان هيطبع [[npm warn EBADENGINE]] ويكمّل.

---

## الخلاصة

| الملف | فيه | مين بيقراه |
|---|---|---|
| [[.nvmrc]] | نسخة Node، سطر واحد | nvm و fnm و Volta و GitHub Actions |
| [[.npmrc]] | إعدادات npm [[key=value]] | npm (المشروع ثم [[~/.npmrc]] ثم الجهاز) |

و [[npm config list]] بيقولك كل إعداد جاي منين. والتوكنات عمرها ما تتكتب في [[.npmrc]] اللي في المشروع: [[$__{NPM_TOKEN}]] بس.`,
          lines: [
            R`النسخة المطلوبة: سطر واحد.`,
            R`nvm بيقرا [[.nvmrc]] ويحوّلك لها.`,
            R`اتأكد من النسخة الحالية.`,
            R`إعدادات npm للمشروع.`,
            R`قيمة إعداد واحد.`,
            R`كل الإعدادات الفعالة ومصدرها.`
          ],
          sol: R`[[cat .nvmrc]] ← [[22]]
[[nvm use]] ← [[Found '/path/.nvmrc' with version <22>]] وبعدها [[Now using node v22.x.x]]، ولو النسخة مش متسطّبة: [[N/A: version "v22" is not yet installed.]] فاكتب [[nvm install]] (بيقرا نفس الملف).
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
          teach: R`## الفكرة

المثال ملف [[.gitignore]] جاهز لمشروع Node. هنقراه نمط نمط، وبعدين نجرّبه في repo تجربة فيه ملفات بأسامي مقصودة ونشوف Git شايف إيه ومتجاهل إيه. كل ده اتجرّب بـ Git 2.56 على ويندوز (Git Bash).

---

## ١. التعليقات

~~~text
# المكتبات والناتج
~~~

أي سطر بيبدأ بـ [[#]] تعليق، والسطور الفاضية ملهاش معنى. التعليقات بتتحسب في ترقيم السطور، وده هيفرق تحت في [[git check-ignore]].

---

## ٢. المكتبات والناتج

~~~text
node_modules/
dist/
*.log
~~~

| النمط | بيطابق |
|---|---|
| [[node_modules/]] | فولدر اسمه [[node_modules]] في **أي** مكان. الـ [[/]] في الآخر معناها «فولدر بس»، فلو فيه ملف اسمه [[node_modules]] مش هيتأثر |
| [[dist/]] | فولدر الناتج بتاع الـ build |
| [[*.log]] | [[*]] = أي حروف ماعدا [[/]]. فـ أي ملف آخره [[.log]] في أي فولدر |

---

## ٣. الأسرار والاستثناء

~~~text
.env
.env.*
!.env.example
~~~

- [[.env]]: الملف ده بالاسم ده.
- [[.env.*]]: أي ملف بيبدأ بـ [[.env.]]: [[.env.local]] و [[.env.production]]، و [[.env.example]] كمان!
- [[!.env.example]]: [[!]] يعني «ماعدا». بيرجّع [[.env.example]] تاني عشان يترفع (فيه أسامي المتغيرات من غير قيم، للفريق).

Git بيمشي على الأنماط من فوق لتحت، و**آخر نمط يطابق هو اللي يكسب**. عشان كده [[!]] لازم ييجي بعد [[.env.*]]: لو جه قبله، [[.env.*]] هيطابق بعده ويتجاهل الملف تاني.

---

## ٤. ملفات الأنظمة والمحررات

~~~text
.DS_Store
Thumbs.db
.vscode/*
!.vscode/extensions.json
/config/local.json
~~~

- [[.DS_Store]]: ملف الماك بيعمله في كل فولدر تفتحه (DS = Desktop Services).
- [[Thumbs.db]]: ويندوز القديم بيحفظ فيه الصور المصغرة.
- [[.vscode/*]] ثم [[!.vscode/extensions.json]]: تجاهل **محتوى** الفولدر، ماعدا ملف الإضافات المقترحة للفريق.
- [[/config/local.json]]: [[/]] في **الأول** معناها «من أول الـ repo». فبيطابق [[config/local.json]] بس، مش [[src/config/local.json]].

ليه [[.vscode/*]] مش [[.vscode/]]؟ جرّبنا نغيّرها لـ [[.vscode/]]: الفولدر كله اختفى من [[git status]] و [[extensions.json]] معاه، والاستثناء ماشتغلش. Git لما بيتجاهل فولدر مبيدخلوش أصلًا، فمبيشوفش اللي جواه عشان يستثنيه.

---

## ٥. التجربة: [[git status --short -uall]]

في repo جديد حطينا المثال، وعملنا الملفات دي: [[app.log]] و [[.env]] و [[.env.local]] و [[.env.example]] و [[config/local.json]] و [[src/config/local.json]] و [[.vscode/settings.json]] و [[.vscode/extensions.json]] و [[node_modules/x/i.js]] و [[dist/a.js]] و [[logs.txt]].

~~~bash
git status --short -uall
~~~

- [[--short]]: سطر لكل ملف بدل الكلام الطويل.
- [[-uall]] (untracked all): اعرض كل ملف untracked لوحده. من غيره Git بيكتب [[?? src/]] بدل الملف اللي جواه.

~~~text الناتج
?? .env.example
?? .gitignore
?? .vscode/extensions.json
?? logs.txt
?? src/config/local.json
~~~

[[??]] يعني untracked: Git شايفه ومش بيتابعه لسه. كل اللي مش في الليستة اتجاهل. لاحظ:

- [[logs.txt]] ظاهر: [[*.log]] عايز الاسم **يخلص** بـ [[.log]]، و [[logs.txt]] آخره [[.txt]].
- [[src/config/local.json]] ظاهر: بسبب [[/]] اللي في أول النمط.
- [[.env.example]] و [[.vscode/extensions.json]] ظاهرين: الاستثناءات اشتغلت.

---

## ٦. مين السبب؟ [[git check-ignore -v]]

~~~bash
git check-ignore -v .env.local app.log src/config/local.json .env.example node_modules/x/i.js
~~~

[[check-ignore]] بيقولك الملفات دي متجاهلة ولا لأ، و [[-v]] (verbose) بيقول كمان السطر المسؤول:

~~~text الناتج
.gitignore:7:.env.*	.env.local
.gitignore:4:*.log	app.log
.gitignore:8:!.env.example	.env.example
.gitignore:2:node_modules/	node_modules/x/i.js
~~~

اقرا كل سطر كده: [[الملف:رقم السطر:النمط]] وبعدين Tab واسم الملف اللي سألت عليه. [[*.log]] في السطر ٤ مش ٣ لأن السطر الأول تعليق.

- [[src/config/local.json]] مطلعش خالص: مفيش نمط بيطابقه.
- [[.env.example]] طلع بس النمط بيبدأ بـ [[!]]: مع [[-v]] Git بيوريك آخر نمط طابق حتى لو كان استثناء. يعني الملف **مش** متجاهل.

---

## ٧. الفخ: ملف اتعمله commit قبل كده

عملنا commit لـ [[secret.txt]]، وبعدين ضفناه في آخر [[.gitignore]] وعدّلناه:

~~~text git status --short
 M secret.txt
~~~

[[M]] (modified): Git لسه بيتابعه عادي. و [[git check-ignore -v secret.txt]] مطبعش حاجة (exit code 1)، لأنه بيجاوب على الملفات اللي في الـ index كأنها مش متجاهلة. مع [[--no-index]] بيعترف إن النمط موجود:

~~~text git check-ignore -v --no-index secret.txt
.gitignore:15:secret.txt	secret.txt
~~~

الحل:

~~~bash
git rm --cached secret.txt
~~~

- [[rm]]: شيل الملف من Git.
- [[--cached]]: من الـ index بس (اللي Git متابعه)، وسيب الملف على الديسك.

~~~text git status --short بعدها
D  secret.txt
~~~

[[D]] في العمود الأول: الحذف جاهز للـ commit. والملف لسه موجود عندك ([[ls secret.txt]] لقاه). وبعد الـ commit Git مش هيتابعه تاني. ولو كان فيه سر حقيقي غيّره: النسخة القديمة لسه في تاريخ Git.

---

## الخلاصة

| الرمز | معناه |
|---|---|
| [[#]] | تعليق |
| [[name/]] | فولدر بس، في أي مكان |
| [[*]] | أي حروف ماعدا [[/]] |
| [[**]] | أي عدد فولدرات |
| [[/name]] | من أول الـ repo بس |
| [[!pattern]] | استثناء، ولازم ييجي بعد |

[[.gitignore]] بيأثر على الملفات اللي **مش** متابَعة بس. و [[git check-ignore -v]] بيقولك أنهي سطر هو السبب.`,
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
          teach: R`## الفكرة

المثال ملف [[.gitattributes]] بيقول لـ Git: كل الملفات النصية LF، وسكربتات ويندوز CRLF، والصور متتلمسش. هنقراه، وبعدين نجرّبه على repo فيه ٣ ملفات متلخبطة ونشوف قبل وبعد. اتجرّب بـ Git 2.56 على ويندوز (Git Bash)، مع [[git config core.autocrlf false]] جوه الـ repo عشان إعداد الجهاز ميغطّيش على التجربة.

---

## ١. شكل السطر

~~~text
pattern  attribute  attribute ...
~~~

النمط زي [[.gitignore]] ([[*]] و [[*.bat]] واسم ملف)، وبعده خاصية أو أكتر بمسافات. والخاصية بتتكتب ٣ أشكال:

| الشكل | معناه | مثال |
|---|---|---|
| [[name]] | شغّلها (set) | [[binary]] |
| [[-name]] | اقفلها (unset) | [[-diff]] |
| [[name=value]] | ادّيها قيمة | [[eol=lf]] |

ولو ملف طابق أكتر من سطر، السطر اللي **تحت** بيكسب في الخاصية اللي اتكررت.

---

## ٢. السطر الأساسي: [[* text=auto eol=lf]]

- [[*]]: كل الملفات.
- [[text=auto]]: Git يخمّن لوحده الملف نصي ولا لأ (بيدوّر على byte صفر في أوله). النصي بيتخزن في الـ repo بـ LF دايمًا.
- [[eol=lf]] (end of line): ولما يطلّع الملف على جهازك (checkout) يطلّعه بـ LF، حتى على ويندوز.

## ٣. سكربتات ويندوز: [[*.bat text eol=crlf]]

[[text]] من غير [[auto]] يعني «ده نصي أكيد»، و [[eol=crlf]] يطلع على الجهاز بـ CRLF (درس LF و CRLF). وده للـ [[.bat]] و [[.cmd]] و [[.ps1]]، لأن cmd ممكن يتلخبط في ملفات [[.bat]] اللي بـ LF. السطور دي تحت [[*]]، فبتغطي على [[eol=lf]] للملفات دي بس.

## ٤. [[*.png binary]] و [[*.jpg binary]]

[[binary]] اختصار لـ [[-text -diff -merge]]: متحوّلش نهايات سطور، ومتعرضش diff نصي، ومتحاولش تدمج نسختين. [[text=auto]] غالبًا هيعرف إن الصورة binary لوحده، بس السطر ده احتياطي.

## ٥. [[package-lock.json -diff linguist-generated]]

- [[-diff]]: [[git diff]] يكتب سطر واحد [[Binary files a/package-lock.json and b/package-lock.json differ]] بدل آلاف السطور (جرّبناها).
- [[linguist-generated]]: خاصية GitHub بيقراها (مش Git): الملف متولّد، فيطويه في الـ pull request ومش يحسبه في لغات الـ repo.

---

## ٦. التجربة: قبل الملف

عملنا ٣ ملفات واتعملهم commit من غير [[.gitattributes]]:

- [[run.sh]] بـ CRLF ([[printf 'echo hi\r\n']])، يعني متلخبط.
- [[build.bat]] بـ LF.
- [[logo.png]]: أول bytes من ملف PNG.

~~~bash
git ls-files --eol
~~~

~~~text الناتج
i/lf    w/lf    attr/                 	build.bat
i/-text w/-text attr/                 	logo.png
i/crlf  w/crlf  attr/                 	run.sh
~~~

| العمود | معناه |
|---|---|
| [[i/]] | index: الملف متخزن في Git إزاي |
| [[w/]] | working tree: الملف على جهازك إزاي |
| [[attr/]] | الخصائص اللي عليه من [[.gitattributes]] (فاضية لسه) |

[[-text]] يعني Git شايفه مش نص. والمشكلة: [[i/crlf]] قدام [[run.sh]]، يعني CRLF دخل الـ repo، ولو السكربت أوله [[#!/bin/bash]]، لينكس هيرفض يشغّله بـ [[/bin/bash^M: bad interpreter]] (درس LF و CRLF).

---

## ٧. نحط الملف ونعيد التخزين: [[git add --renormalize .]]

حطينا المثال في [[.gitattributes]]. الملفات اللي في الـ repo **مبتتغيرش لوحدها**، فلازم:

~~~bash
git add --renormalize .
git status --short
~~~

[[--renormalize]]: أعد إضافة كل الملفات المتابَعة بالقواعد الجديدة، حتى لو محتواها على الديسك متغيرش. و [[.]] الفولدر الحالي وكل اللي تحته.

~~~text الناتج
M  run.sh
?? .gitattributes
~~~

- [[M ]] في العمود الأول: [[run.sh]] اتغير في الـ index (اتحفظ LF). [[build.bat]] و [[logo.png]] متغيروش لأنهم كانوا صح.
- [[?? .gitattributes]]: [[--renormalize]] بيلمس الملفات المتابعة بس، فالملف الجديد نفسه محتاج [[git add .gitattributes]] لوحده. متنساهوش، من غيره باقي الفريق مش هياخد القواعد.

وبعد الـ commit:

~~~text git ls-files --eol
i/lf    w/lf    attr/text eol=crlf    	build.bat
i/-text w/-text attr/-text            	logo.png
i/lf    w/crlf  attr/text=auto eol=lf 	run.sh
~~~

- [[run.sh]]: [[i/lf]] الـ repo بقى سليم، بس [[w/crlf]] الملف على الديسك لسه زي ما هو: Git مبيعيدش كتابة ملفاتك وهو بيعمل add.
- [[build.bat]]: [[attr/text eol=crlf]]، بس لسه [[w/lf]] لنفس السبب.

## ٨. checkout بيطبّق القواعد

مسحنا الملفين وطلّعناهم تاني من Git:

~~~bash
rm run.sh build.bat
git checkout -- run.sh build.bat
~~~

[[--]] معناها «اللي بعدي أسامي ملفات مش أسامي branches».

~~~text git ls-files --eol
i/lf    w/crlf  attr/text eol=crlf    	build.bat
i/lf    w/lf    attr/text=auto eol=lf 	run.sh
~~~

دلوقتي كل حاجة زي ما الملف قال: [[build.bat]] على الجهاز CRLF وفي الـ repo LF، و [[run.sh]] LF في الحتتين. و [[od -c build.bat]] (بيطبع الملف حرف حرف) أكّد إن آخر كل سطر بقى [[\r \n]].

---

## ٩. [[git check-attr -a]]

~~~bash
git check-attr -a run.sh build.bat logo.png
~~~

[[-a]] (all): كل الخصائص اللي على الملف ده:

~~~text الناتج
run.sh: text: auto
run.sh: eol: lf
build.bat: text: set
build.bat: eol: crlf
logo.png: binary: set
logo.png: diff: unset
logo.png: merge: unset
logo.png: text: unset
logo.png: eol: lf
~~~

[[set]] = شغّالة، و [[unset]] = مقفولة. لاحظ إن [[binary]] اتفرد لـ [[diff: unset]] و [[merge: unset]] و [[text: unset]]. و [[eol: lf]] على الصورة جاية من سطر [[*]]، بس ملهاش تأثير لأن [[text]] مقفول.

---

## الخلاصة

| الخاصية | بتعمل إيه |
|---|---|
| [[text=auto]] | Git يحدد النصي، ويخزّنه LF |
| [[eol=lf]] / [[eol=crlf]] | الملف يطلع على الجهاز بالنهاية دي |
| [[binary]] | متلمسش: من غير تحويل ولا diff ولا merge |
| [[-diff]] | متعرضش diff |
| [[linguist-generated]] | GitHub يطويه |

ولمشروع قديم: [[git add .gitattributes]] و [[git add --renormalize .]] ثم commit. والملفات اللي على جهازك بتتصلّح مع أول checkout أو clone جديد.`,
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
          teach: R`## الفكرة

المثال ملف [[.editorconfig]] فيه قسم عام لكل الملفات، و ٣ أقسام بتغيّر حاجة واحدة لنوع ملف معين. هنقراه سطر سطر، وبعدين نفحص ملفات مخالفة بـ [[editorconfig-checker]] ونقرا رسايله. الفحص اتجرّب على ويندوز بـ [[npx editorconfig-checker]] (نزّل البرنامج نفسه نسخة 4.0.2). وسلوك المحرر نفسه (VS Code مع الإضافة) من الـ docs.

---

## ١. [[root = true]]

~~~text
# الملف ده في أول المشروع
root = true
~~~

السطر الأول تعليق ([[#]] أو [[;]]). و [[root = true]] بيقول للمحرر: «وقف هنا». المحرر وهو بيفتح ملف بيدوّر على [[.editorconfig]] في فولدر الملف، وبعدين اللي فوقه، واللي فوقه... لحد ما يلاقي واحد فيه [[root = true]]. من غيره ممكن يلاقي [[.editorconfig]] قديم في [[C:\Users\ali]] مثلًا ويطبّقه على مشروعك.

لاحظ إن [[root]] مكتوب بره أي قسم، فوق خالص. ده المكان الوحيد المسموح ليه.

---

## ٢. القسم العام [[[*]]]

~~~text
[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
~~~

الأقواس المربعة [[[ ]]] بتبدأ قسم، وجواها نمط اسم ملف. [[*]] يعني كل الملفات. وتحته [[key = value]]:

| الإعداد | معناه |
|---|---|
| [[charset = utf-8]] | احفظ بـ UTF-8 من غير BOM (درس UTF-8) |
| [[end_of_line = lf]] | نهاية السطر LF مش CRLF |
| [[indent_style = space]] | زرار Tab يكتب مسافات |
| [[indent_size = 2]] | كل مستوى مسافتين |
| [[insert_final_newline = true]] | لازم سطر جديد في آخر الملف |
| [[trim_trailing_whitespace = true]] | امسح المسافات اللي في آخر أي سطر وقت الحفظ |

---

## ٣. الأقسام اللي بتغيّر

~~~text
[*.py]
indent_size = 4

[Makefile]
indent_style = tab

[*.md]
trim_trailing_whitespace = false
~~~

- [[[*.py]]]: ملفات Python مسافاتها ٤ (العُرف في PEP 8). باقي الإعدادات (UTF-8 و LF...) جاية من [[[*]]].
- [[[Makefile]]]: ملف بالاسم ده بالظبط، وأوامره **لازم** Tab حقيقي (درس Makefile).
- [[[*.md]]]: في Markdown مسافتين في آخر السطر معناهم «سطر جديد»، فممنوع تتمسح.

الملف بيتقري من فوق لتحت، ولو ملف طابق كذا قسم، القسم اللي تحت بيكسب في الإعداد اللي اتكرر. فـ [[a.py]] بياخد كل [[[*]]] وبعدين [[indent_size = 4]] يغطي على 2.

ولو عايز نوعين في قسم واحد: [[[*.{js,ts}]]] (الأقواس المعووجة [[{ }]] = واحد من دول).

---

## ٤. الفحص: [[npx editorconfig-checker]]

المحرر بيطبّق الإعدادات وانت بتكتب، بس مبيصلّحش ملفات اتكتبت غلط قبل كده. [[editorconfig-checker]] بيقرا نفس الملف ويقولك مين مخالف. عملنا ٤ ملفات غلط عن قصد:

| الملف | الغلط |
|---|---|
| [[Makefile]] | سطر الأمر داخل بـ ٤ مسافات |
| [[a.py]] | سطر داخل بمسافتين |
| [[b.js]] | مسافة في آخر السطر |
| [[c.md]] | مسافتين في آخر السطر (مسموح) |

~~~powershell
npx -y editorconfig-checker
~~~

[[-y]] بيوافق على تنزيل الحزمة من غير سؤال.

~~~text الناتج
Makefile:
	2: wrong indentation type (spaces instead of tabs)
a.py:
	2: wrong amount of left-padding spaces(want multiple of 4)
b.js:
	1: trailing whitespace

3 errors found
~~~

- الرقم قبل [[:]] رقم السطر.
- [[wrong indentation type]]: نوع الإزاحة غلط، مسافات والمفروض Tab.
- [[left-padding spaces(want multiple of 4)]]: عدد المسافات في أول السطر لازم يتقسم على ٤.
- [[trailing whitespace]]: مسافات في آخر السطر.
- [[c.md]] مطلعش: قسم [[[*.md]]] اشتغل.

ولما الغلط ٣، الأمر خرج بـ exit code 1، وده اللي بيخلي الـ CI يفشل.

وتجربة تانية: [[d.js]] من غير سطر جديد في آخره، و [[e.py]] بـ CRLF:

~~~text الناتج
d.js:
	wrong line endings or no final newline
e.py:
	not all lines have the correct end of line character
	wrong line endings or no final newline

3 errors found
~~~

دول [[insert_final_newline]] و [[end_of_line]]. ومن غير رقم سطر لأنهم عن الملف كله.

---

## ٥. في المحرر

حسب docs موقع editorconfig.org: JetBrains و Visual Studio بيقروا الملف لوحدهم، و VS Code محتاج إضافة «EditorConfig for VS Code». بعدها لما تفتح [[a.py]] شريط الحالة تحت بيكتب [[Spaces: 4]]، وفي [[b.js]] [[Spaces: 2]]. والمحرر بيطبّق الإعدادات وانت بتكتب وتحفظ بس، مش بيعيد تنسيق الملفات القديمة.

---

## الخلاصة

| الحاجة | فين |
|---|---|
| وقف الدوّير لفوق | [[root = true]] أول الملف |
| إعدادات لكل الملفات | [[[*]]] |
| استثناء لنوع | قسم بنمطه تحت العام |
| فحص في CI | [[npx editorconfig-checker]] |

[[.editorconfig]] = المحرر يكتب إزاي، و [[.gitattributes]] = Git يخزّن إزاي، و Prettier = الكود نفسه يتنسق إزاي.`,
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
• [[FROM node:22-alpine]]: الـ image اللي هتبدأ منه. لازم أول أمر. [[22-alpine]] اسمه tag: Node 22 على Alpine لينكس (صغير).
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
FROM node:22-alpine
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
            mistakes: R`[[COPY . .]] قبل [[npm ci]] فأي تعديل يعيد التسطيب كله. من غير [[.dockerignore]] فـ [[node_modules]] بتاعة جهازك و [[.env]] يدخلوا الـ image. [[CMD node server.js]] (shell form) فـ Ctrl+C و [[docker stop]] مبيوصلوش للتطبيق (بيستنى ١٠ ثواني ويقتله). وحتى مع الـ exec form، Node لما يبقى PID 1 بيتجاهل SIGTERM لو مفيش في الكود [[process.on("SIGTERM", ...)]]، فـ [[docker stop]] برضو بياخد ١٠ ثواني: الحل handler في الكود أو [[docker run --init]]. وتسمّي الملف [[dockerfile]] أو [[Dockerfile.txt]] فـ [[docker build .]] ميلاقيهوش.`
          },
          teach: R`## الفكرة

المثال Dockerfile لسيرفر Node صغير: ١٠ سطور، كل سطر تعليمة لـ Docker. هنقراهم بالترتيب اللي Docker بينفّذهم بيه، وبعدين نبني الـ image ونشغّلها. اتجرّب على ويندوز بـ Docker 29.6 (Docker Desktop، يعني الـ engine شغال لينكس)، في فولدر فيه [[package.json]] و [[package-lock.json]] (dayjs بس) و [[server.js]] بيرد [[ok]] على أي طلب، و [[.dockerignore]] (الدرس الجاي). الـ image اتسمّت [[teach-files04-api]] بدل [[gym-api]] واتمسحت بعد التجربة.

---

## ١. [[# syntax=docker/dockerfile:1]]

شكله تعليق، بس ده **parser directive**: لازم يبقى أول سطر، وبيقول لـ BuildKit (اللي بيبني) استخدم أحدث صيغة Dockerfile من النسخة 1. في البناء ظهر كخطوة لوحده:

~~~text
#2 resolve image config for docker-image://docker.io/docker/dockerfile:1
~~~

يعني Docker نزّل «مترجم» الـ Dockerfile نفسه. تقدر تشيل السطر وهيشتغل بالمترجم اللي جوه Docker.

## ٢. [[FROM node:22-alpine]]

- [[FROM]]: ابدأ من image جاهزة. أي Dockerfile بيبدأ بيه.
- [[node]]: اسم الـ image الرسمية على Docker Hub.
- [[:22-alpine]]: الـ **tag** (النسخة): Node 22 مبني على Alpine Linux، توزيعة صغيرة: [[alpine:latest]] لوحدها طلعت 13MB في [[docker images]]، و [[node:22-alpine]] كلها 238MB، و image بتاعتنا 243MB (يعني الكود والمكتبات ٥ ميجا بس).

## ٣. [[WORKDIR /app]]

اعمل فولدر [[/app]] جوه الـ image لو مش موجود، وخلي كل اللي بعده يتنفذ فيه. زي [[cd]] بس دايم: [[CMD]] كمان هيشتغل من [[/app]].

## ٤. [[COPY package*.json ./]]

- [[COPY src dest]]: انسخ من جهازك لجوه الـ image.
- [[package*.json]]: [[*]] أي حروف، فبيطابق [[package.json]] و [[package-lock.json]] الاتنين.
- [[./]]: للفولدر الحالي جوه الـ image، يعني [[/app/]].

بننسخ الملفين دول **لوحدهم الأول** عشان الـ cache (تحت).

## ٥. [[RUN npm ci --omit=dev]]

[[RUN]] نفّذ أمر **وقت البناء**، والنتيجة بتتحفظ في الـ image. [[npm ci]] سطّب من الـ lock بالظبط (درس [[package-lock.json]])، و [[--omit=dev]] من غير [[devDependencies]]:

~~~text الناتج
#10 [4/5] RUN npm ci --omit=dev
#10 7.582 added 1 package, and audited 2 packages in 7s
~~~

## ٦. [[COPY . .]]

انسخ كل الفولدر ([[.]] الأولى = الـ build context على جهازك) لـ [[/app]] ([[.]] التانية). «كل» هنا ماعدا اللي في [[.dockerignore]].

## ٧. [[ENV NODE_ENV=production]]

متغير بيئة بيفضل موجود جوه أي container من الـ image دي. مكتبات كتير (Express مثلًا) بتشتغل أسرع وبتخبي تفاصيل الأخطاء لما تلاقيه [[production]]. اتأكدنا:

~~~bash
docker run --rm teach-files04-api node -e 'console.log(process.env.NODE_ENV)'
~~~

~~~text الناتج
production
~~~

## ٨. [[EXPOSE 3000]]

توثيق بس: «التطبيق ده بيسمع على 3000». مبيفتحش أي بورت. اللي بيفتح فعلًا [[-p]] في [[docker run]].

## ٩. [[USER node]]

كل اللي بعده، والتطبيق نفسه، يشتغل باليوزر [[node]] (موجود جاهز في الـ image الرسمية) مش [[root]]. لو حد اخترق التطبيق، مش هيبقى root جوه الـ container.

~~~text docker run --rm teach-files04-api whoami
node
~~~

## ١٠. [[CMD ["node", "server.js"]]]

الأمر اللي بيشتغل لما الـ container يقوم. ده **exec form**: JSON array، كل كلمة في تنصيص لوحدها. Docker بيشغّل [[node]] مباشرة، فـ [[node]] بيبقى PID 1 (أول process في الـ container) والإشارات بتوصله. أما [[CMD node server.js]] من غير أقواس (shell form) فبيشغّل [[/bin/sh -c "node server.js"]]، و [[sh]] هو اللي بياخد الإشارات.

بس خلي بالك: حتى مع الـ exec form، Node لما يبقى PID 1 ومفيش في الكود [[process.on("SIGTERM", ...)]] بيتجاهل الإشارة. جرّبنا:

~~~text
docker stop  (من غير --init)   real 0m10.500s
docker stop  (مع --init)       real 0m0.578s
~~~

١٠ ثواني لأن Docker بيبعت SIGTERM، ولما محدش يرد بيستنى ١٠ ثواني ويبعت SIGKILL. و [[--init]] بيحط process صغيرة (tini) هي PID 1 وتوصّل الإشارة لـ Node صح.

وتقدر تشوف إن [[CMD]] و [[USER]] و [[WORKDIR]] و [[EXPOSE]] اتسجلوا في إعدادات الـ image (مش اتنفذوا وقت البناء):

~~~bash
docker image inspect teach-files04-api --format '{{.Config.Cmd}} {{.Config.User}} {{.Config.WorkingDir}} {{.Config.ExposedPorts}}'
~~~

~~~text الناتج
[node server.js] node /app map[3000/tcp:{}]
~~~

---

## ١١. البناء: [[docker build -t teach-files04-api .]]

- [[build]]: ابني image.
- [[-t]] (tag): سمّيها كده.
- [[.]]: الـ build context، الفولدر اللي هيتبعت لـ Docker (والـ Dockerfile بيتدوّر عليه فيه).

السطور المهمة من الناتج (مع [[--progress=plain]] عشان يطبع كل حاجة):

~~~text الناتج
#5 [internal] load .dockerignore
#5 transferring context: 80B done
#6 [internal] load build context
#6 transferring context: 1.20kB 0.0s done
#7 [1/5] FROM docker.io/library/node:22-alpine@sha256:0a7108bf...
#8 [2/5] WORKDIR /app
#9 [3/5] COPY package*.json ./
#10 [4/5] RUN npm ci --omit=dev
#11 [5/5] COPY . .
#12 naming to docker.io/library/teach-files04-api:latest
~~~

- [[#5]] و [[#6]]...: رقم كل خطوة.
- [[[1/5]]] لحد [[[5/5]]]: الخطوات اللي بتعمل طبقات (layers). ٥ بس، لأن [[ENV]] و [[EXPOSE]] و [[USER]] و [[CMD]] بيغيّروا الإعدادات من غير طبقة ملفات.
- [[transferring context: 1.20kB]]: حجم الفولدر اللي اتبعت بعد [[.dockerignore]].
- [[@sha256:...]]: بصمة النسخة المضبوطة من [[node:22-alpine]] اللي اتبنى عليها.
- [[:latest]]: لو مكتبتش tag في [[-t]]، Docker بيحط [[latest]].

## ١٢. التشغيل

~~~bash
docker run -d --rm -p 18080:3000 teach-files04-api
curl http://localhost:18080
~~~

- [[-d]] (detach): في الخلفية. و [[--rm]]: امسح الـ container لما يقف.
- [[-p 18080:3000]]: بورت 18080 على جهازك يوصل لـ 3000 جوه الـ container (استخدمنا 18080 عشان 8080 ممكن يبقى مشغول).

~~~text الناتج
ok
~~~

و [[docker logs]] على نفس الـ container طبع [[listening on 3000]].

و [[docker run --rm teach-files04-api ls -a /app]] (من PowerShell أو cmd، لأن Git Bash بيحوّل [[/app]] لمسار ويندوز):

~~~text الناتج
.
..
.dockerignore
node_modules
package-lock.json
package.json
server.js
~~~

[[node_modules]] هنا عمله [[npm ci]] جوه الـ image. ومفيش [[.env]] ولا [[Dockerfile]] بفضل [[.dockerignore]].

## ١٣. الـ cache

ضفنا سطر تعليق في آخر [[server.js]] وبنينا تاني:

~~~text الناتج
#8 [2/5] WORKDIR /app
#8 CACHED
#9 [3/5] COPY package*.json ./
#9 CACHED
#10 [4/5] RUN npm ci --omit=dev
#10 CACHED
#11 [5/5] COPY . .
~~~

Docker لكل خطوة بيقارن مدخلاتها بالمرة اللي فاتت. [[package*.json]] متغيرش، فـ [[npm ci]] (٧ ثواني) اتاخد من الـ cache. بس [[COPY . .]] اتعاد لأن [[server.js]] اتغير. لو كنا كتبنا [[COPY . .]] قبل [[npm ci]]، أي تعديل في الكود كان هيعيد التسطيب كله.

---

## الخلاصة

| التعليمة | وقت إيه | بتعمل إيه |
|---|---|---|
| [[FROM]] | البناء | الـ image اللي بنبدأ منها |
| [[WORKDIR]] | البناء والتشغيل | الفولدر الحالي |
| [[COPY]] | البناء | ملفات من جهازك لجوه |
| [[RUN]] | البناء | ينفّذ أمر ويحفظ نتيجته |
| [[ENV]] | الاتنين | متغير بيئة |
| [[EXPOSE]] | توثيق | البورت اللي التطبيق بيسمع عليه |
| [[USER]] | الاتنين | اليوزر اللي بيشغّل |
| [[CMD]] | التشغيل | الأمر اللي بيقوم مع الـ container |

ورتّب السطور من «نادرًا ما يتغير» لـ «بيتغير كل شوية» عشان الـ cache يشتغل.`,
          lines: [
            R`ابدأ من image فيها Node 22 على Alpine. (السطر اللي فوق تعليق بيقول نسخة صيغة الـ Dockerfile.)`,
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
[[docker run --rm gym-api ls -a /app]] ← [[.dockerignore]] و [[node_modules]] (اللي [[npm ci]] عمله جوه الـ image) و [[package-lock.json]] و [[package.json]] و [[server.js]]، ومفيش [[.env]] ولا [[Dockerfile]].

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
          teach: R`## الفكرة

المثال ٥ أنماط، كل واحد في سطر. معناهم: «لما [[docker build]] يجمع الفولدر عشان يبعته، سيب دول». هنقرا الأنماط، وبعدين نبني نفس مشروع درس [[Dockerfile]] مرة من غير الملف ومرة بيه، ونقارن. اتجرّب على ويندوز بـ Docker 29.6، والـ images اتسمّت [[teach-files04-*]] واتمسحت بعدها.

---

## ١. الأنماط

~~~text .dockerignore
node_modules
.git
.env
*.log
Dockerfile
~~~

| السطر | بيمنع | ليه |
|---|---|---|
| [[node_modules]] | مكتبات جهازك | الـ image بيسطّب مكتباته بـ [[npm ci]]، ومكتبات ويندوز أو الماك ممكن متشتغلش على لينكس |
| [[.git]] | تاريخ Git كله | ممكن يبقى أكبر من الكود، ومش محتاجه في التشغيل |
| [[.env]] | الأسرار | أي حد معاه الـ image يقدر يقراها |
| [[*.log]] | أي log في أول الفولدر | زبالة، وكل تغيير فيها يكسر الـ cache |
| [[Dockerfile]] | الوصفة نفسها | مش محتاجها جوه الـ container |

فرق مهم عن [[.gitignore]]: الأنماط هنا من **أول الـ context** بس. [[node_modules]] يعني الفولدر اللي في الأول، مش [[sub/node_modules]]. جرّبناها في فولدر فيه [[node_modules/b.js]] و [[sub/node_modules/a.js]] و Dockerfile فيه [[RUN find . -type f]]:

~~~text الناتج
./.dockerignore
./Dockerfile
./sub/node_modules/a.js
~~~

[[b.js]] اتمنع، بس [[sub/node_modules/a.js]] دخل. عشان تمنعه في أي مكان اكتب [[**/node_modules]] ([[**]] = أي عدد فولدرات). ونفس الكلام لـ [[*.log]]: بيمنع [[app.log]] اللي في الأول بس.

---

## ٢. التجربة: من غير [[.dockerignore]]

في مشروع الـ Dockerfile حطينا [[.env]] فيه [[SECRET=x]]، و [[app.log]]، وملف 5MB عشوائي في [[node_modules/big/blob]]:

~~~bash
head -c 5000000 /dev/urandom > node_modules/big/blob
~~~

[[head -c 5000000]] (c = bytes): خد أول ٥ مليون byte من [[/dev/urandom]]، وده «ملف» في لينكس (وفي Git Bash) بيطلّع بيانات عشوائية من غير نهاية.

وبعدين غيّرنا اسم [[.dockerignore]] مؤقتًا وبنينا:

~~~bash
docker build --no-cache --progress=plain -t teach-files04-ign .
~~~

- [[--no-cache]]: ابني كل خطوة من الأول، عشان المقارنة تبقى عادلة.
- [[--progress=plain]]: اطبع كل السطور بدل الشكل المختصر اللي بيتمسح.

~~~text الناتج
#5 [internal] load .dockerignore
#5 transferring context: 2B done
#8 transferring context: 5.71MB 2.1s done
~~~

- [[transferring context: 2B]] عند [[.dockerignore]]: مفيش ملف، فاتبعت ولا حاجة تقريبًا.
- [[5.71MB 2.1s]]: الفولدر كله اتبعت للـ engine، والـ blob لوحده ٥ ميجا. في مشروع حقيقي [[node_modules]] بيبقى مئات الميجا كل build.

جوه الـ image:

~~~text docker run --rm teach-files04-ign ls -a /app
.
..
.env
Dockerfile
app.log
di.bak
node_modules
package-lock.json
package.json
server.js
~~~

كل حاجة دخلت، حتى [[di.bak]] (الملف اللي غيّرنا اسمه). و [[COPY . .]] نسخ [[node_modules]] بتاع جهازك **فوق** اللي [[npm ci]] عمله. والأخطر:

~~~text docker run --rm teach-files04-ign cat .env
SECRET=x
~~~

السر بقى جوه الـ image. والحجم: [[256MB]].

---

## ٣. نفس البناء مع [[.dockerignore]]

~~~text الناتج
#5 transferring context: 80B done
#6 transferring context: 178B 0.0s done
~~~

[[80B]] حجم [[.dockerignore]] نفسه، و [[178B]] كل اللي اتبعت من المشروع (بدل 5.71MB).

~~~text docker run --rm teach-files04-ign ls -a /app
.
..
.dockerignore
node_modules
package-lock.json
package.json
server.js
~~~

و [[node_modules]] هنا اللي [[npm ci]] عمله جوه الـ image. والحجم بقى [[243MB]]. و [[cat .env]]:

~~~text الناتج
cat: can't open '.env': No such file or directory
~~~

---

## ٤. ولو طلبته بالاسم؟

Dockerfile فيه [[COPY .env /x]] و [[.env]] في [[.dockerignore]]:

~~~text الناتج
ERROR: failed to build: failed to solve: failed to compute cache key: failed to calculate checksum of ref ...: "/.env": not found
~~~

الملف المتجاهل مش موجود بالنسبة للبناء خالص، حتى لو كتبته صراحة. فلو [[npm ci]] وقع بـ [[package-lock.json not found]]، دوّر في [[.dockerignore]] الأول.

---

## الخلاصة

| | من غير [[.dockerignore]] | معاه |
|---|---|---|
| الـ context اللي اتبعت | 5.71MB | 178B |
| [[.env]] جوه الـ image | أيوه، ومقروء | لأ |
| [[node_modules]] | بتاع جهازك فوق بتاع [[npm ci]] | بتاع [[npm ci]] بس |
| الحجم | 256MB | 243MB |

والأنماط من أول الـ context: [[**/node_modules]] لو عايزه في أي مكان.`,
          lines: [
            R`مكتبات جهازك ميدخلوش: الـ image بيسطّب بنفسه.`,
            R`تاريخ Git.`,
            R`الأسرار.`,
            R`أي log.`,
            R`الـ Dockerfile نفسه مش محتاجه جوه.`
          ],
          sol: R`من غير [[.dockerignore]]:
[[#8 transferring context: 5.71MB 2.1s done]]
و [[ls -a /app]] فيه [[.env]] و [[Dockerfile]] و [[node_modules]]. يعني السر بقى جوه الـ image، و [[docker run --rm test cat .env]] بيطبع [[SECRET=x]].

مع [[.dockerignore]]:
[[#6 transferring context: 178B 0.0s done]]
و [[ls -a /app]] فيه [[.dockerignore]] و [[package.json]] و [[package-lock.json]] و [[server.js]] بس. والـ image أصغر (في التجربة دي على node:22-alpine طلع 243MB بدل 256MB).`
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
          teach: R`## الفكرة

المثال [[compose.yaml]] فيه خدمتين: [[api]] (بتتبني من الـ Dockerfile بتاع الدرس اللي فات) و [[db]] (PostgreSQL جاهز)، و volume واحد للداتا. هنقراه خدمة خدمة، وبعدين نشغّله ونشوف Docker بيعمل إيه بالترتيب. اتجرّب على ويندوز بـ Docker 29.6 في فولدر اسمه [[teach-files04-compose]]، مع تغييرين في نسخة التجربة بس: [[postgres:16-alpine]] بدل [[postgres:17]] (عشان دي اللي موجودة على الجهاز)، والبورت [["13000:3000"]] بدل [["3000:3000"]] (عشان 3000 ممكن يبقى مشغول). وفي الآخر [[docker compose down -v]] مسح كل حاجة.

---

## ١. [[services:]]

~~~text
services:
  api:
    ...
  db:
    ...
~~~

كل مفتاح تحت [[services]] خدمة، يعني container. الاسم ([[api]] و [[db]]) انت اللي بتختاره، وهو نفسه اللي الخدمات بتنادي بيه بعض على الشبكة. والإزاحة بالمسافات هي اللي بتقول مين جوه مين (درس YAML)، ومفيش Tab.

---

## ٢. خدمة [[api]]

~~~text
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
~~~

| السطر | معناه |
|---|---|
| [[build: .]] | ابني image من الـ [[Dockerfile]] اللي في الفولدر ده ([[.]]) |
| [[ports:]] و [[- "3000:3000"]] | [[-]] عنصر في ليستة. [[جهازك:الcontainer]]. والتنصيص عشان YAML ممكن يقرا [[xx:yy]] كرقم بالستيني (درس «مشكلة النرويج») |
| [[env_file: .env]] | اقرا متغيرات من [[.env]] وابعتها لجوه الـ container |
| [[environment:]] | متغيرات مكتوبة هنا مباشرة |
| [[depends_on:]] + [[condition: service_healthy]] | متبدأش [[api]] غير لما [[db]] تبقى healthy (الـ healthcheck بتاعها نجح) |
| [[restart: unless-stopped]] | لو وقعت قوّمها تاني، إلا لو انت اللي وقفتها |

### رابط قاعدة البيانات

~~~text
postgresql://app:secret@db:5432/gym
~~~

| الحتة | معناها |
|---|---|
| [[postgresql://]] | نوع الاتصال |
| [[app:secret]] | اليوزر والباسورد |
| [[@db]] | الـ host: اسم الخدمة، مش [[localhost]] |
| [[:5432]] | بورت PostgreSQL |
| [[/gym]] | اسم القاعدة |

ليه [[db]]؟ لأن [[localhost]] جوه container الـ api معناها الـ container ده نفسه، وPostgreSQL مش فيه. Compose بيدّي كل خدمة اسم على الشبكة. اتأكدنا من جوه الـ api:

~~~bash
docker compose exec api sh -c 'getent hosts db; echo $DATABASE_URL $LOG_LEVEL'
~~~

~~~text الناتج
172.18.0.2        db  db
postgresql://app:secret@db:5432/gym info
~~~

- [[exec api]]: نفّذ أمر جوه container الخدمة [[api]] وهو شغّال.
- [[getent hosts db]]: «الاسم [[db]] بيترجم لأنهي IP؟» ← [[172.18.0.2]]، وده الـ container بتاع قاعدة البيانات.
- [[info]] جاية من [[LOG_LEVEL=info]] اللي في [[.env]] (عن طريق [[env_file]]).

---

## ٣. خدمة [[db]]

~~~text
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
~~~

- [[image: postgres:17]]: image جاهزة من Docker Hub، مفيش build.
- [[POSTGRES_USER]] و [[POSTGRES_PASSWORD]] و [[POSTGRES_DB]]: متغيرات الـ image دي بتفهمها (مكتوبة في صفحتها على Docker Hub): أول مرة تقوم بتعمل اليوزر والقاعدة دول.
- [[pgdata:/var/lib/postgresql/data]]: [[اسم volume:مسار جوه الcontainer]]. PostgreSQL بيكتب الداتا في المسار ده، والـ volume بيحفظها بره الـ container، فلو الـ container اتمسح الداتا بتفضل. (ملحوظة من docs الـ image: من [[postgres:18]] المسار المقترح للـ volume بقى [[/var/lib/postgresql]].)
- [[healthcheck:]]:
  - [[test: ["CMD-SHELL", "..."]]]: نفّذ الأمر ده في shell جوه الـ container. [[pg_isready]] أداة جاية مع PostgreSQL بترجع 0 لو السيرفر بيقبل اتصالات، و [[-U app -d gym]] اليوزر والقاعدة.
  - [[interval: 5s]]: افحص كل ٥ ثواني.
  - [[retries: 5]]: ٥ مرات فشل ورا بعض = [[unhealthy]].

## ٤. [[volumes:]] في الآخر

~~~text
volumes:
  pgdata:
~~~

بره [[services]] (من غير إزاحة). بيعرّف volume اسمه [[pgdata]]، و [[:]] من غير حاجة بعدها يعني بالإعدادات الافتراضية.

---

## ٥. اتأكد من الملف: [[docker compose config]]

~~~bash
docker compose config --quiet && echo valid
~~~

[[--quiet]]: افحص بس من غير ما تطبع. ولو سليم يخرج بـ 0، فـ [[&&]] يطبع:

~~~text الناتج
valid
~~~

ومن غير [[--quiet]] بيطبع الملف «النهائي» بعد ما Compose يكمّله. جزء منه:

~~~text الناتج
name: teach-files04-compose
services:
  api:
    build:
      context: C:\Users\ali\...\teach-files04-compose
      dockerfile: Dockerfile
    environment:
      DATABASE_URL: postgresql://app:secret@db:5432/gym
      LOG_LEVEL: info
    ports:
      - mode: ingress
        target: 3000
        published: "13000"
        protocol: tcp
~~~

لاحظ: [[name]] = اسم الفولدر (اسم المشروع)، و [[LOG_LEVEL]] من [[.env]] اتدمج مع [[environment]]، و [["13000:3000"]] اتفك لـ [[published]] (جهازك) و [[target]] (الـ container).

ولما بوّظنا المسافات قبل [[image:]]:

~~~text مسافة زيادة
yaml: while parsing a block mapping at line 1, column 3: line 14, column 5: did not find expected key
~~~

~~~text مسافة ناقصة
yaml: line 15, column 16: mapping values are not allowed in this context
~~~

[[line]] و [[column]] السطر والحرف. ومع مسافة ناقصة، السطر اللي بعد [[image:]] بقى أدخل منه، فـ YAML قراه كأنه تكملة لقيمة [[postgres:16-alpine]]، فوقع في السطر ١٥ مش ١٤.

---

## ٦. التشغيل: [[docker compose up -d --build]]

- [[up]]: اعمل وشغّل كل حاجة.
- [[-d]]: في الخلفية.
- [[--build]]: ابني الـ images حتى لو موجودة.

~~~text الناتج (بعد سطور البناء)
 Image teach-files04-compose-api Built
 Network teach-files04-compose_default Created
 Volume teach-files04-compose_pgdata Created
 Container teach-files04-compose-db-1 Created
 Container teach-files04-compose-api-1 Created
 Container teach-files04-compose-db-1 Started
 Container teach-files04-compose-db-1 Waiting
 Container teach-files04-compose-db-1 Healthy
 Container teach-files04-compose-api-1 Starting
 Container teach-files04-compose-api-1 Started
~~~

الترتيب ده هو الملف كله: image الـ api، وشبكة اسمها [[<المشروع>_default]]، والـ volume [[<المشروع>_pgdata]]، والـ db تقوم، و Compose **يستنى** ([[Waiting]]) لحد [[Healthy]]، وبعدين بس الـ api تقوم. والأسامي [[<المشروع>-<الخدمة>-1]]: الـ [[1]] رقم النسخة من الخدمة.

~~~bash
docker compose ps
~~~

~~~text الناتج
NAME                          IMAGE                       SERVICE   STATUS                   PORTS
teach-files04-compose-api-1   teach-files04-compose-api   api       Up Less than a second    0.0.0.0:13000->3000/tcp, [::]:13000->3000/tcp
teach-files04-compose-db-1    postgres:16-alpine          db        Up 6 seconds (healthy)   5432/tcp
~~~

(شلنا عمودي COMMAND و CREATED عشان العرض.) [[(healthy)]] من الـ healthcheck. و [[0.0.0.0:13000->3000/tcp]] يعني البورت مفتوح على جهازك، أما [[5432/tcp]] من غير سهم يعني الـ db متاحة للخدمات التانية بس، مش لجهازك.

و [[curl http://localhost:13000]] رد بـ [[ok]]، و [[docker compose logs api]]:

~~~text الناتج
api-1  | listening on 3000
~~~

## ٧. القفل: [[docker compose down -v]]

~~~text الناتج (مختصر)
 Container teach-files04-compose-api-1 Removed
 Container teach-files04-compose-db-1 Removed
 Volume teach-files04-compose_pgdata Removed
 Network teach-files04-compose_default Removed
~~~

[[down]] وقّف وامسح الـ containers والشبكة. و [[-v]] امسح الـ volumes كمان، يعني **الداتا راحت**. من غير [[-v]] الـ volume بيفضل والداتا تستناك المرة الجاية.

---

## الخلاصة

| المفتاح | بيعمل |
|---|---|
| [[build]] / [[image]] | ابني من Dockerfile / استخدم جاهزة |
| [[ports]] | [["جهازك:الcontainer"]] بين تنصيص |
| [[environment]] / [[env_file]] | متغيرات لجوه الـ container |
| [[depends_on]] + [[service_healthy]] | استنى الخدمة التانية تبقى جاهزة |
| [[volumes]] | الداتا تعيش بعد الـ container |
| [[healthcheck]] | إزاي نعرف إنها جاهزة |

الخدمات بتكلم بعض **باسم الخدمة**، و [[docker compose config]] أول حاجة تعملها لما حاجة متشتغلش.`,
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
ولو بوّظت المسافات، [[docker compose config]] بيقول حاجة زي [[yaml: line 15, column 16: mapping values are not allowed in this context]] (مسافة ناقصة قبل [[image:]]: السطر اللي بعده بقى أدخل منه فاتقري كأنه تكملة ليه) أو [[yaml: while parsing a block mapping at line 1, column 3: line 14, column 5: did not find expected key]] (مسافة زيادة)، و [[line]] رقم السطر.`
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
          teach: R`## الفكرة

المثال [[Makefile]] فيه متغير واحد و ٤ أهداف (targets): [[dev]] و [[build]] و [[test]] و [[clean]]. هنقراه سطر سطر، وبعدين نشغّله بـ [[make -n]] اللي بيطبع الأوامر من غير ما ينفّذها. [[make]] مش موجود على ويندوز (ولا في Git Bash)، فكل التجارب اتعملت على أوبونتو 24.04 جوه Docker بعد [[apt-get install make]]، والنسخة GNU Make 4.3.

---

## ١. التعليق والمتغير

~~~text
# أوامر المشروع
APP = gym-api
~~~

- [[#]]: تعليق.
- [[APP = gym-api]]: متغير اسمه [[APP]] قيمته [[gym-api]]. بيتقري تحت بـ [[$(APP)]]: الـ [[$]] والأقواس معناهم «حط قيمة المتغير هنا».

## ٢. [[.PHONY: dev build test clean]]

[[make]] أصلًا معمول للملفات: [[build:]] عنده معناها «عشان تعمل **ملف** اسمه build، نفّذ كذا». ولو لقى ملف أو فولدر بنفس الاسم ومفيش حاجة اتغيرت، بيعتبر الشغل خلصان. جرّبنا: شلنا سطر [[.PHONY]] وعملنا فولدر اسمه [[clean]]:

~~~text make clean (من غير .PHONY)
make: 'clean' is up to date.
~~~

ومنفّذش حاجة! ومع [[.PHONY]] رجع ينفّذ [[rm -rf dist node_modules]]. فـ [[.PHONY]] (phony = مزيّف) بيقول: «الأسامي دي أوامر، مش ملفات، نفّذها دايمًا».

## ٣. شكل الهدف

~~~text
dev:
	npm run dev
~~~

- [[dev:]]: اسم الهدف، و [[:]] بعده. اللي بعد [[:]] (فاضي هنا) الأهداف اللي لازم تتعمل الأول.
- السطر اللي تحته هو الأمر (اسمه recipe)، و**لازم** يبدأ بـ Tab حقيقي. [[cat -A Makefile]] بيوريك ده: الـ Tab بيظهر [[^I]] وآخر السطر [[$]]:

~~~text الناتج (السطرين دول)
dev:$
^Inpm run dev$
~~~

ولما حوّلنا الـ Tab في السطر الخامس لـ ٤ مسافات:

~~~text الناتج
M2:5: *** missing separator.  Stop.
~~~

[[M2:5]] اسم الملف ورقم السطر. [[missing separator]] يعني «السطر ده مش تعريف ومش أمر»: [[make]] بيعرف الأمر من الـ Tab بس.

و [[dev]] أول هدف في الملف، فـ [[make]] لوحدها بتشغّله:

~~~text make -n
npm run dev
~~~

[[-n]] (dry run): اطبع اللي هتعمله ومتنفّذوش. أحسن طريقة تجرّب بيها Makefile حد تاني كاتبه.

## ٤. [[build]] والمتغير

~~~text
build:
	docker build -t $(APP) .
~~~

[[$(APP)]] بيتبدّل قبل التنفيذ. وتقدر تغيّر المتغير من سطر الأوامر:

~~~text make -n build APP=other
docker build -t other .
~~~

القيمة اللي في الأمر بتغطي على اللي في الملف.

## ٥. [[test: build]]: هدف بيعتمد على هدف

~~~text
test: build
	docker run --rm $(APP) npm test
~~~

[[build]] بعد [[:]] معناها «اعمل [[build]] الأول». فـ:

~~~text make -n test
docker build -t gym-api .
docker run --rm gym-api npm test
~~~

أوامر [[build]] ثم أوامر [[test]]، ولو [[build]] فشل [[make]] بيقف ومش بيكمّل.

## ٦. [[clean]]

~~~text
clean:
	rm -rf dist node_modules
~~~

[[rm -rf]]: امسح ([[-r]] الفولدرات باللي فيها، و [[-f]] من غير سؤال ومن غير غلط لو مش موجود). شغّلناه بجد على فولدرين فاضيين، و [[make]] طبع الأمر قبل ما ينفّذه:

~~~text make clean
rm -rf dist node_modules
~~~

---

## ٧. حاجتين لازم تعرفهم

### [[@]] بيخبّي الأمر

~~~text
hi:
	@echo hello
hi2:
	echo hello
~~~

~~~text الناتج
hello            ← make hi
echo hello       ← make hi2
hello
~~~

من غير [[@]]، [[make]] بيطبع الأمر وبعدين ناتجه.

### كل سطر في shell لوحده

~~~text
x:
	cd /tmp
	pwd
y:
	cd /tmp && pwd
~~~

~~~text الناتج
cd /tmp
pwd
/w          ← make x: الـ cd مأثرش
cd /tmp && pwd
/tmp        ← make y
~~~

كل سطر recipe بيتنفّذ في shell جديد، فـ [[cd]] بيموت مع السطر بتاعه. لو محتاجهم مع بعض اكتبهم في سطر واحد بـ [[&&]].

### هدف مش موجود

~~~text make nothing
make: *** No rule to make target 'nothing'.  Stop.
~~~

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| متغير | [[NAME = value]] وبيتقري [[$(NAME)]] |
| هدف | [[name: deps]] وتحته أوامر بـ **Tab** |
| أوامر مش ملفات | [[.PHONY: ...]] |
| الافتراضي | أول هدف في الملف |
| تجربة آمنة | [[make -n target]] |
| تغيير متغير | [[make build APP=other]] |
| خبّي الأمر | [[@]] في أوله |

وعلى ويندوز: WSL أو Docker، لأن [[make]] مش جاي مع ويندوز ولا Git Bash.`,
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
          teach: R`## الفكرة

المثال [[pyproject.toml]] لمشروع Python اسمه [[gym-api]]: بيقول اسمه ونسخته ومكتباته، وبيعمل أمر في الترمنال اسمه [[gym-api]]، وفيه إعدادات أداة ruff. هنقراه قسم قسم (الصيغة TOML، درس [[.toml]])، وبعدين نسطّبه في virtual environment ونشغّل الأمر. اتجرّب على ويندوز بـ Python 3.14.3 (PowerShell 7 و Windows PowerShell 5.1)، وأول خطوتين (الـ venv) اتجرّبوا كمان على لينكس جوه Docker بـ Python 3.13. المشروع فيه [[src/gym_api/__init__.py]] فاضي و [[src/gym_api/main.py]] فيه دالة [[run()]] بتطبع [[gym-api شغال]].

---

## ١. [[[project]]]

~~~text
[project]
name = "gym-api"
version = "1.4.0"
description = "API لحجز مواعيد الجيم"
requires-python = ">=3.11"
~~~

[[[project]]] بين أقواس مربعة = قسم (table في TOML). وكل سطر تحته [[key = "value"]]، والنصوص لازم تنصيص.

| المفتاح | معناه |
|---|---|
| [[name]] | الاسم اللي هيتسطّب بيه ([[pip show gym-api]]) |
| [[version]] | النسخة |
| [[description]] | سطر وصف ([[Summary]] في [[pip show]]) |
| [[requires-python]] | أقل نسخة Python. pip بيرفض يسطّب على أقدم |

## ٢. [[dependencies]]

~~~text
dependencies = [
    "fastapi>=0.115",
    "uvicorn[standard]>=0.32",
]
~~~

array في TOML ([[[ ]]])، على كذا سطر، والفاصلة بعد آخر عنصر مسموحة (عكس JSON). كل عنصر نص بنفس صيغة [[requirements.txt]]:

- [[fastapi>=0.115]]: fastapi نسخة 0.115 أو أحدث.
- [[uvicorn[standard]]]: [[[standard]]] اسمها **extras**: حاجات إضافية اختيارية جوه المكتبة (هنا مكتبات أسرع للسيرفر).

علامات النسخ في Python:

| العلامة | معناها | زي npm |
|---|---|---|
| [[==1.2.3]] | بالظبط | [[1.2.3]] |
| [[>=1.2]] | دي أو أحدث | [[>=1.2]] |
| [[~=2.10]] | من 2.10 لحد قبل 3 | [[^2.10]] تقريبًا |
| [[>=0.32,<1.0]] | [[,]] = «و» بين شرطين | |

## ٣. [[[project.optional-dependencies]]]

~~~text
[project.optional-dependencies]
dev = ["pytest>=8", "ruff"]
~~~

النقطة في اسم القسم معناها «جوه [[project]]». مجموعة اسمها [[dev]] مش بتتسطّب غير لما تطلبها: [[pip install -e ".[dev]"]]. زي [[devDependencies]] في npm. و [["ruff"]] من غير نسخة = أي نسخة.

## ٤. [[[project.scripts]]]

~~~text
[project.scripts]
gym-api = "gym_api.main:run"
~~~

اعمل أمر في الترمنال اسمه [[gym-api]]، ولما يتكتب ينادي:

~~~text
gym_api.main : run
───┬─── ─┬─    ─┬─
package  file   function
~~~

يعني الدالة [[run]] في [[gym_api/main.py]]. الاسم فيه [[_]] مش [[-]] لأن أسامي الـ modules في Python مينفعش فيها [[-]].

## ٥. [[[build-system]]]

~~~text
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
~~~

pip نفسه مبيعرفش يبني مشروع. القسم ده بيقوله: «نزّل [[hatchling]] الأول، واستخدم الـ module اللي اسمه [[hatchling.build]] عشان تبني». و hatchling بيلاقي الكود في [[src/gym_api]] لوحده.

## ٦. [[[tool.ruff]]]

~~~text
[tool.ruff]
line-length = 100
~~~

أي أداة ليها [[[tool.اسمها]]]. ruff (linter) بيقرا القسم ده بدل ملف إعدادات لوحده: طول السطر المسموح ١٠٠ حرف بدل ٨٨.

---

## ٧. الـ virtual environment

~~~powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
~~~

- [[-m venv]]: شغّل الـ module اللي اسمه [[venv]].
- [[.venv]]: اسم الفولدر اللي هيتعمل. جواه نسخة Python ومكتبات المشروع ده بس.
- [[Activate.ps1]]: بيغيّر الـ PATH في الترمنال ده بحيث [[python]] و [[pip]] يبقوا اللي جوه [[.venv]].

~~~text (Get-Command python).Source بعدها
C:\Users\ali\...\py\.venv\Scripts\python.exe
~~~

ونفس الحكاية اشتغلت في Windows PowerShell 5.1. وعلى لينكس (Python 3.13 في Docker) الأمر [[python3 -m venv .venv]] ثم [[. .venv/bin/activate]] (أو [[source]])، و [[which python pip]] طبع:

~~~text الناتج
/w/.venv/bin/python
/w/.venv/bin/pip
~~~

| | ويندوز | لينكس والماك |
|---|---|---|
| الأمر | [[python]] | [[python3]] |
| التفعيل | [[.venv\Scripts\Activate.ps1]] | [[source .venv/bin/activate]] |
| الأوامر المتسطّبة | [[.venv\Scripts\]] | [[.venv/bin/]] |

---

## ٨. التسطيب: [[pip install -e ".[dev]"]]

- [[-e]] (editable): سطّب المشروع «بالإشارة» للفولدر، فأي تعديل في الكود يبان علطول من غير تسطيب تاني.
- [[.]]: المشروع اللي في الفولدر الحالي.
- [[[dev]]]: ومعاه مجموعة [[dev]].
- التنصيص حوالين [[".[dev]"]] عشان بعض الـ shells (زي zsh) بتفهم [[[ ]]] كـ pattern.

بعدها:

~~~text gym-api
gym-api شغال
~~~

~~~text pip show gym-api (أول ٣ سطور)
Name: gym-api
Version: 1.4.0
Summary: API لحجز مواعيد الجيم
~~~

والأمر [[gym-api]] نفسه ملف اتعمل في [[.venv\Scripts\gym-api.exe]] (على لينكس [[.venv/bin/gym-api]]). ومجموعة [[dev]] اتسطّبت: [[ruff --version]] طبع [[ruff 0.16.10]] و [[pytest --version]] طبع [[pytest 9.1.1]].

---

## ٩. و [[requirements.txt]]؟

في فولدر تاني [[requirements.txt]] فيه سطر واحد [[fastapi==0.115.6]]، وفي venv جديد:

~~~powershell
pip install -r requirements.txt
pip freeze
~~~

[[-r]] (requirement file): اقرا الليستة من الملف. و [[pip freeze]] بيطبع كل اللي متسطّب في الـ venv بالنسخ بالظبط:

~~~text الناتج
annotated-types==0.8.0
anyio==4.15.1
fastapi==0.115.6
idna==3.20
pydantic==2.13.5
pydantic_core==2.46.5
starlette==0.41.3
typing-inspection==0.4.4
typing_extensions==4.16.0
~~~

طلبنا مكتبة واحدة، واتسطّب ٩: fastapi محتاجة starlette و pydantic، وهما محتاجين الباقي. [[pip freeze > requirements.txt]] بيحفظ الليستة دي كلها، وده أقرب حاجة لـ lock file في requirements. والأرقام دي وقت التجربة، هتلاقي أحدث.

---

## الخلاصة

| القسم | زي في npm |
|---|---|
| [[[project]]] (name و version) | [[name]] و [[version]] |
| [[dependencies]] | [[dependencies]] |
| [[[project.optional-dependencies]]] [[dev]] | [[devDependencies]] |
| [[[project.scripts]]] | [[bin]] |
| [[[tool.xxx]]] | إعدادات الأدوات |

وأي تسطيب جوه [[.venv]]، و [[.venv/]] في [[.gitignore]].`,
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
          teach: R`## الفكرة

المثال [[pom.xml]] لمشروع Java اسمه [[gym-api]] فيه مكتبتين: Gson (لـ JSON) و JUnit (للاختبارات). والحل فيه نفس المشروع بـ Gradle. هنقرا الملفين حتة حتة.

> مفيش Java ولا Maven ولا Gradle على الجهاز اللي اتجرّب عليه، فأوامر [[mvn]] و [[gradle]] ونواتجها من docs الأدوات دي (maven.apache.org و docs.gradle.org). اللي اتجرّب فعلًا: إن [[pom.xml]] XML سليم، وقرايته بـ Python 3.14 على ويندوز (تحت).

---

## ١. السطور الأولى: XML و namespaces

~~~text
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
~~~

- [[<?xml ...?>]]: الـ declaration: نسخة XML والترميز (درس [[.xml]]).
- [[<project>]]: الـ root، كل الملف جواه. POM = Project Object Model.
- [[xmlns="..."]]: الـ namespace الافتراضي: كل التاجات هنا «بتاعة Maven POM 4.0.0» (درس xmlns). الرابط اسم مش صفحة لازم تفتح.
- [[xmlns:xsi="..."]]: namespace تاني اختصاره [[xsi]] (XML Schema Instance).
- [[xsi:schemaLocation]]: زوج «namespace ← ملف الـ schema بتاعه». المحرر (IntelliJ أو VS Code) بينزّل الـ [[.xsd]] ويكمّلك التاجات ويعلّم على الغلط.

السطر طويل فاتقسم على ٣ سطور، وده عادي في XML: المسافات بين الـ attributes ملهاش معنى.

## ٢. هوية المشروع (coordinates)

~~~text
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.gym</groupId>
  <artifactId>gym-api</artifactId>
  <version>1.4.0</version>
  <packaging>jar</packaging>
~~~

| التاج | معناه |
|---|---|
| [[modelVersion]] | نسخة صيغة الـ POM، دايمًا [[4.0.0]] |
| [[groupId]] | مين عامله: دومين بالمقلوب ([[gym.com]] ← [[com.gym]]) |
| [[artifactId]] | اسم المشروع |
| [[version]] | نسخته |
| [[packaging]] | الناتج: [[jar]] (Java ARchive، zip فيه الـ classes) أو [[war]] لسيرفرات الويب القديمة |

التلاتة [[groupId:artifactId:version]] مع بعض اسمهم coordinates: العنوان الفريد للمشروع في أي repository. وهي نفسها الطريقة اللي بتطلب بيها أي مكتبة.

## ٣. [[<properties>]]

~~~text
  <properties>
    <maven.compiler.release>21</maven.compiler.release>
  </properties>
~~~

إعدادات بأسامي. [[maven.compiler.release]] بيقول لـ plugin الـ compiler: اعمل compile لـ Java 21. لو الـ JDK اللي عندك أقدم من 21 البناء بيقع (الرسالة في الـ docs: [[release version 21 not supported]]).

## ٤. [[<dependencies>]]

~~~text
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
~~~

كل [[<dependency>]] = مكتبة بالـ coordinates بتاعتها. و [[<scope>]]:

| الـ scope | المكتبة متاحة في |
|---|---|
| (مش مكتوب) = [[compile]] | الكود والاختبارات والتشغيل |
| [[test]] | [[src/test/java]] بس، ومتدخلش الناتج |
| [[provided]] | الـ compile بس، والسيرفر هيوفّرها وقت التشغيل |
| [[runtime]] | التشغيل بس (زي driver قاعدة بيانات) |

قرينا الملف بـ Python عشان نتأكد إنه XML سليم ونطلّع الـ coordinates:

~~~text الناتج (Python 3.14 على ويندوز)
com.google.code.gson:gson:2.11.0 compile
org.junit.jupiter:junit-jupiter:5.11.3 test
~~~

ولاحظ: عشان الـ [[xmlns]]، أي أداة بتقرا الملف لازم تدوّر على التاجات بالـ namespace ([[{http://maven.apache.org/POM/4.0.0}project]] هو اسم الـ root الحقيقي)، مش [[project]] بس.

---

## ٥. البناء (من الـ docs)

~~~bash
mvn package
~~~

[[mvn]] بيقرا الـ pom ويمشي على مراحل ثابتة اسمها lifecycle: [[validate]] ← [[compile]] ← [[test]] ← [[package]]. لما تطلب [[package]] كل اللي قبلها بيتعمل. أول مرة بينزّل المكتبات لـ [[~/.m2/repository]]، وفي الآخر:

~~~text الناتج (من الـ docs)
[INFO] BUILD SUCCESS
~~~

والناتج في [[target/gym-api-1.4.0.jar]]: الاسم [[artifactId-version.jar]]. والمسارات ثابتة بالعُرف (convention): الكود في [[src/main/java]]، والاختبارات في [[src/test/java]]، والناتج في [[target/]]. عشان كده الـ pom مفيهوش أي مسار.

## ٦. نفس المشروع بـ Gradle (الـ solCode)

~~~text build.gradle.kts
plugins {
    java
    application
}
~~~

[[plugins]]: نوع المشروع. [[java]] = مشروع Java عادي (compile و test و jar)، و [[application]] = فيه main وتقدر تشغّله بـ [[gradle run]].

~~~text
group = "com.gym"
version = "1.4.0"
~~~

نفس [[groupId]] و [[version]]. والـ [[artifactId]] بييجي من [[rootProject.name]] في [[settings.gradle.kts]].

~~~text
java { toolchain { languageVersion = JavaLanguageVersion.of(21) } }
~~~

زي [[maven.compiler.release]]، بس أقوى: Gradle بيدوّر على JDK 21 متسطّب على الجهاز (وممكن ينزّله لوحده لو ظبطت plugin التنزيل في [[settings.gradle.kts]]، حسب الـ docs) حتى لو الـ JDK اللي شغّال بيه مختلف. والأقواس المعووجة جوه بعض = إعدادات جوه إعدادات.

~~~text
repositories { mavenCentral() }
~~~

المكتبات تتنزل منين. Maven بيستخدم Maven Central افتراضيًا، Gradle لازم تقوله.

~~~text
dependencies {
    implementation("com.google.code.gson:gson:2.11.0")
    testImplementation("org.junit.jupiter:junit-jupiter:5.11.3")
}
~~~

نفس الـ coordinates بس في نص واحد بـ [[:]]. [[implementation]] = [[compile]] في Maven، و [[testImplementation]] = [[<scope>test</scope>]].

~~~text
application { mainClass = "com.gym.App" }
~~~

الـ class اللي فيها [[main]]: [[com.gym]] الـ package و [[App]] الـ class. ده اللي [[gradle run]] بيشغّله.

| Maven ([[pom.xml]]) | Gradle ([[build.gradle.kts]]) |
|---|---|
| [[<groupId>]] و [[<version>]] | [[group]] و [[version]] |
| [[<artifactId>]] | [[rootProject.name]] في settings |
| [[maven.compiler.release]] | [[java { toolchain ... }]] |
| [[<dependency>]] | [[implementation("g:a:v")]] |
| [[<scope>test</scope>]] | [[testImplementation]] |
| [[mvn package]] ← [[target/]] | [[./gradlew build]] ← [[build/]] |

---

## الخلاصة

- أي مكتبة Java ليها عنوان من ٣ حتت: [[groupId:artifactId:version]].
- Maven: XML وطويل بس كل حاجة ليها مكان ثابت. Gradle: كود Kotlin أقصر، وهو الأساسي في Android.
- [[target/]] و [[build/]] و [[.gradle/]] في [[.gitignore]]، والـ wrappers ([[mvnw]] و [[gradlew]]) بيتعملهم commit عشان الكل يبني بنفس النسخة.`,
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
          teach: R`## الفكرة

المثال [[AndroidManifest.xml]] لتطبيق فيه شاشة واحدة وصلاحية النت، والحل فيه [[strings.xml]]. هنقرا الاتنين تاج تاج.

> مفيش Android SDK على الجهاز اللي اتجرّب عليه، فرسايل الـ build (AAPT2) من docs Android. اللي اتجرّب فعلًا: الملفين اتفحصوا كـ XML بـ Python 3.14 على ويندوز، واتجرّبت قواعد XML نفسها ([[&]] و [[']]).

---

## ١. الـ root و [[xmlns:android]]

~~~text
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
~~~

- [[<manifest>]]: الـ root، كل الملف جواه.
- [[xmlns:android="..."]]: بيعرّف prefix اسمه [[android]] للـ namespace ده (درس xmlns). من غيره أي [[android:name]] تحت هيبقى غلط. والسطر ده نفسه في كل ملفات Android.

## ٢. [[<uses-permission>]]

~~~text
    <uses-permission android:name="android.permission.INTERNET" />
~~~

- [[android:name]]: اسم الصلاحية الكامل. [[INTERNET]] من غيرها التطبيق ميقدرش يفتح أي اتصال شبكة.
- [[/>]] في الآخر: تاج **self-closing**، يعني مفتوح ومقفول في نفس الوقت ومفيش حاجة جواه. زي [[<x></x>]] بالظبط.

## ٣. [[<application>]]

~~~text
    <application
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:theme="@style/Theme.Gym">
~~~

الـ attributes على كذا سطر للقراية بس، و [[>]] في الآخر بتقفل تاج **الفتح** (التاج نفسه بيتقفل تحت بـ [[</application>]]).

| الـ attribute | القيمة | معناها |
|---|---|---|
| [[android:label]] | [[@string/app_name]] | اسم التطبيق تحت الأيقونة |
| [[android:icon]] | [[@mipmap/ic_launcher]] | الأيقونة |
| [[android:theme]] | [[@style/Theme.Gym]] | الألوان والشكل العام |

[[@]] في أول القيمة معناها **مرجع** لـ resource: [[@string/app_name]] = النص اللي اسمه [[app_name]] في [[res/values/strings.xml]]، و [[@mipmap/ic_launcher]] = صورة في فولدرات [[res/mipmap-*]] (فيه نسخة لكل كثافة شاشة)، و [[@style/...]] في [[themes.xml]].

## ٤. [[<activity>]]

~~~text
        <activity
            android:name=".MainActivity"
            android:exported="true">
~~~

- activity = شاشة.
- [[.MainActivity]]: الـ class اللي فيها كود الشاشة. النقطة في الأول معناها «جوه الـ package بتاع التطبيق»، فلو الـ package [[com.gym.portal]] تبقى [[com.gym.portal.MainActivity]].
- [[android:exported="true"]]: تطبيقات تانية (زي الـ launcher اللي بيعرض الأيقونات) تقدر تفتحها. ومن Android 12 (حسب الـ docs) لازم تكتبه صراحة على أي activity فيها [[<intent-filter>]]، وإلا الـ build يرفض.

## ٥. [[<intent-filter>]]

~~~text
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
~~~

intent = «طلب» بيتبعت للنظام («افتح كذا»). والـ filter بيقول الشاشة دي بترد على أنهي طلبات:

- [[action.MAIN]]: دي نقطة البداية للتطبيق.
- [[category.LAUNCHER]]: اعرضها في قايمة التطبيقات.

الاتنين مع بعض = «الشاشة اللي بتفتح لما تدوس على الأيقونة».

## ٦. القفل

~~~text
        </activity>
    </application>
</manifest>
~~~

كل تاج اتفتح بيتقفل بنفس الاسم وبالترتيب العكسي.

---

## ٧. [[strings.xml]] (الـ solCode)

~~~text res/values/strings.xml
<resources>
    <string name="app_name">بوابة الجيم</string>
    <string name="welcome">أهلًا يا %1$s</string>
    <string name="note">Don\'t forget &amp; come early</string>
    <string name="items_count">عندك %d منتج</string>
</resources>
~~~

- [[<resources>]]: الـ root لأي ملف في [[res/values]].
- [[name="app_name"]]: الاسم اللي الكود بيستخدمه: [[R.string.app_name]] في Kotlin، و [[@string/app_name]] في XML.
- [[%1$s]]: مكان لقيمة: [[1]] رقم الـ argument الأول، و [[$]] فاصل، و [[s]] نص. فـ [[getString(R.string.welcome, "علي")]] ← «أهلًا يا علي». والرقم مهم في الترجمة: لو لغة تانية محتاجة ترتيب مختلف للقيم.
- [[%d]]: رقم صحيح (d = decimal).
- [[\']] و [[&amp;]]: الـ escaping (تحت).

## ٨. ليه [[']] بتوقّع الـ build؟

فيه طبقتين قواعد فوق بعض:

**الطبقة الأولى: XML نفسه.** [[&]] لوحدها ممنوعة لأنها بداية entity ([[&amp;]] و [[&lt;]]، درس XML entities). جرّبنا ملف فيه [[Don't forget & come]]:

~~~text الناتج (Python)
xml.etree.ElementTree.ParseError: not well-formed (invalid token): line 2, column 38
~~~

[[column 38]] مكان الـ [[&]] بالظبط. وده الملف مش XML أصلًا.

**الطبقة التانية: Android.** [[Don't forget]] من غير [[&]] XML سليم عادي، و Python قراه:

~~~text الناتج
Don't forget
~~~

بس AAPT2 (الأداة اللي بتحوّل [[res/]] وقت الـ build) عنده قواعد زيادة: [[']] لوحدها ممنوعة لأن Android بيستخدم التنصيص في تنسيق النصوص. ورسالته حسب docs Android فيها [[Apostrophe not preceded by \]]. فبتكتب [[\']]. ولاحظ إن XML مبيعرفش [[\']]، فـ Python قرا سطر الحل بالـ backslash زي ما هو:

~~~text الناتج (Python على strings.xml)
Don\'t forget &amp; come early   ← في الملف
Don\'t forget & come early        ← اللي Python قراه
~~~

[[&amp;]] اتحولت [[&]] (شغل XML)، و [[\']] فضلت (شغل Android وقت الـ build).

| الحرف | XML | Android كمان |
|---|---|---|
| [[&]] | [[&amp;]] | |
| [[<]] | [[&lt;]] | |
| [[']] | مسموح | [[\']] |
| [["]] | مسموح جوه النص | [[\"]] |
| [[@]] أو [[?]] في أول النص | مسموح | [[\@]] و [[\?]] (عشان ميتقريش مرجع) |

والملفين الكاملين اتفحصوا بـ [[ET.parse]]، والـ root بتاعهم طلع [[manifest]] و [[resources]] من غير أخطاء.

---

## الخلاصة

- الـ manifest = بطاقة التطبيق للنظام: الصلاحيات ([[uses-permission]])، والشاشات ([[activity]])، وأنهي شاشة بتفتح من الأيقونة ([[MAIN]] + [[LAUNCHER]]).
- [[@type/name]] = مرجع لملف في [[res/]].
- [[strings.xml]] = كل النصوص، ونسخة لكل لغة في [[values-ar]] وغيره.
- [[']] ← [[\']] (Android)، و [[&]] ← [[&amp;]] (XML).`,
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
          teach: R`## الفكرة

المثال ملف [[.csproj]] لمشروع ASP.NET Core Web API، والحل فيه [[appsettings.json]]. هنقرا الاتنين سطر سطر، ونشوف إعدادات .NET بتتقري منين وبأنهي ترتيب.

> مفيش .NET SDK على الجهاز اللي اتجرّب عليه، فأوامر [[dotnet]] ونواتجها من docs مايكروسوفت (learn.microsoft.com). اللي اتجرّب فعلًا: الـ [[.csproj]] اتفحص كـ XML و [[appsettings.json]] كـ JSON بـ Python 3.14 على ويندوز، والاتنين سليمين.

---

## ١. [[<Project Sdk="Microsoft.NET.Sdk.Web">]]

~~~text
<Project Sdk="Microsoft.NET.Sdk.Web">
~~~

- [[<Project>]]: الـ root. الملف ده في الحقيقة ملف MSBuild (أداة البناء بتاعة .NET).
- [[Sdk="..."]]: نوع المشروع. الـ SDK ده بيجيب معاه كل الافتراضيات: إزاي يتبني، وأنهي ملفات تدخل، وإيه المكتبات الأساسية.

| الـ Sdk | للمشروع |
|---|---|
| [[Microsoft.NET.Sdk]] | Console أو مكتبة |
| [[Microsoft.NET.Sdk.Web]] | ASP.NET Core (API أو موقع) |
| [[Microsoft.NET.Sdk.Worker]] | خدمة شغالة في الخلفية |

ومفيش [[<?xml ...?>]] في أول الملف: الـ declaration اختياري في XML، و .NET مبيكتبوش.

## ٢. [[<PropertyGroup>]]: إعدادات

~~~text
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>
~~~

| التاج | معناه |
|---|---|
| [[TargetFramework]] | الكود بيتبني لأنهي .NET. [[net8.0]] = .NET 8 (نسخة LTS) |
| [[Nullable]] | [[enable]]: الـ compiler يحذّرك لو ممكن تستخدم [[null]] من غير ما تفحصه. [[string]] مش هتقبل null، و [[string?]] تقبل |
| [[ImplicitUsings]] | [[enable]]: الـ [[using]] الشائعة ([[System]] و [[System.Linq]]...) بتتضاف لكل ملف لوحدها |

## ٣. [[<ItemGroup>]]: عناصر

~~~text
  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.11" />
  </ItemGroup>
</Project>
~~~

- [[<ItemGroup>]]: مجموعة «حاجات» (مكتبات أو ملفات).
- [[<PackageReference>]]: مكتبة من NuGet (الـ registry بتاع .NET، زي npm). [[Include]] اسمها، و [[Version]] نسختها بالظبط.
- [[/>]]: self-closing.

ومفيش أي سطر بيقول «الملفات دي تدخل المشروع»: في الـ SDK-style projects كل ملف [[.cs]] في الفولدر وفولدراته بيدخل لوحده.

السطر ده بيتكتب بالأمر (من الـ docs):

~~~bash
dotnet add package Microsoft.EntityFrameworkCore --version 8.0.11
~~~

---

## ٤. [[appsettings.json]] (الـ solCode)

~~~text
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
~~~

[[Logging:LogLevel]]: يكتب logs قد إيه. [[Default: Information]] لكودك، و [[Microsoft.AspNetCore: Warning]] للـ framework نفسه (عشان ميغرقكش بسطر لكل request). المستويات من الأقل للأخطر: [[Trace]] و [[Debug]] و [[Information]] و [[Warning]] و [[Error]] و [[Critical]].

~~~text
  "ConnectionStrings": {
    "Default": "Host=localhost;Database=gym;Username=app;Password=dev"
  },
~~~

رابط قاعدة البيانات بصيغة [[key=value;key=value]] (PostgreSQL هنا). [[Password=dev]] باسورد تطوير بس، والحقيقي مكانه مش هنا (تحت).

~~~text
  "Jwt": {
    "Issuer": "gym-api",
    "ExpiresMinutes": 60
  },
  "AllowedHosts": "*"
}
~~~

- [[Jwt]]: قسم بتاعنا احنا، .NET مبيعرفوش، والكود بيقراه.
- [[60]] من غير تنصيص: رقم.
- [[AllowedHosts: "*"]]: أي اسم دومين مسموح يوصل للسيرفر.

قرايناه بـ Python واتأكدنا إن الـ JSON سليم:

~~~text الناتج
gym-api Host=localhost;Database=gym;Username=app;Password=dev
~~~

### إزاي الكود بيقرا القيم

الأقسام المتداخلة بتتقري بـ [[:]] بينها:

~~~text
builder.Configuration["Jwt:Issuer"]                 ← "gym-api"
builder.Configuration["ConnectionStrings:Default"]  ← "Host=localhost;..."
~~~

---

## ٥. الإعدادات بتيجي منين (الترتيب)

.NET بيقرا ٥ مصادر بالترتيب ده، و**الأخير يكسب** لو نفس المفتاح اتكرر (من الـ docs):

| # | المصدر | إمتى |
|---|---|---|
| 1 | [[appsettings.json]] | دايمًا |
| 2 | [[appsettings.Development.json]] | لو [[ASPNETCORE_ENVIRONMENT=Development]] |
| 3 | User Secrets ([[dotnet user-secrets set]]) | على جهازك في Development بس |
| 4 | متغيرات البيئة | دايمًا |
| 5 | الـ command line ([[--Jwt:Issuer=x]]) | دايمًا |

ومتغير البيئة مينفعش فيه [[:]] على كل الأنظمة، فبيتكتب [[__]] (شرطتين تحت):

~~~text
ConnectionStrings__Default=Host=db;Password=REAL
~~~

ده بيغطي على [[ConnectionStrings:Default]] اللي في الملف. عشان كده الباسورد الحقيقي في متغير بيئة على السيرفر، والملف فيه قيم تطوير بس.

---

## ٦. باقي ملفات المشروع (من الـ docs)

| الملف | فيه |
|---|---|
| [[Program.cs]] | نقطة البداية |
| [[Gym.Api.csproj]] | المشروع (المثال) |
| [[Gym.sln]] | بيجمّع كذا مشروع، بيتعدّل بـ [[dotnet sln add]] |
| [[Properties/launchSettings.json]] | البورت والـ environment على جهازك |
| [[bin/]] و [[obj/]] | ناتج البناء، في [[.gitignore]] |

[[dotnet build]] بيطلّع [[bin/Debug/net8.0/Gym.Api.dll]]: الكود متحوّل لـ IL (Intermediate Language)، و [[dotnet Gym.Api.dll]] بيشغّله.

---

## الخلاصة

- [[.csproj]] = نوع المشروع ([[Sdk]]) + نسخة .NET + المكتبات. كل [[.cs]] بيدخل لوحده.
- [[appsettings.json]] = إعدادات التطبيق، و [[:]] بين الأقسام في الكود، و [[__]] في متغيرات البيئة.
- الترتيب: الملف ← ملف البيئة ← user secrets ← متغيرات البيئة ← command line، والأخير يكسب.
- الأسرار عمرها ما تتكتب في [[appsettings.json]] اللي في Git.`,
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
