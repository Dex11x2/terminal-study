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
    }
]);
