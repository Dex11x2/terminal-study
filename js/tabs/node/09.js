// تكملة تاب node: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/node/01.js (شرح حقول الدرس في أوله)
MORE("node", [
    {
      t: "Bun: runtime و package manager و test runner في برنامج واحد",
      l: 2,
      n: "Bun بيشغّل TypeScript على طول، وبيسطّب المكتبات، وبيعمل اختبارات وسيرفر، وفيه فروق عن Node لازم تعرفها قبل ما تنقل مشروع",
      items: [
        {
          cmd: "bun",
          title: "تسطّب Bun وتشغّل بيه ملف TypeScript",
          desc: R`[[bun]] برنامج واحد بيشغّل JavaScript و TypeScript (زي [[node]])، وجواه package manager ([[bun install]])، و test runner ([[bun test]])، و bundler ([[bun build]]). بيشغّل [[.ts]] على طول من غير build، وبيقرا [[.env]] لوحده.

المثال اتجرّب بـ Bun 1.4.4: على ويندوز بنسخة portable (من غير تسطيب عام)، وعلى لينكس جوه [[oven/bun:slim]].`,
          example: R`npm i -g bun
bun --version
bun init -y
bun index.ts
bun run start
bun --watch index.ts
bun check
# Linux و Mac:
curl -fsSL https://bun.sh/install | bash
# Windows (PowerShell):
powershell -c "irm bun.sh/install.ps1 | iex"`,
          try: R`اعمل فولدر فاضي، وشغّل [[bun init -y]]، وبعدين خلّي [[index.ts]] فيه [[console.log("Hello via Bun!", process.env.GREETING)]]، واعمل [[.env]] فيه [[GREETING=hi]]. شغّله بـ [[bun index.ts]] وبـ [[node index.ts]]: مين قرا الـ [[.env]]؟ وبعدين حط خطأ أنواع عمدًا ([[const n: number = "x"]]) وشغّل [[bun index.ts]] و [[bun check]].`,
          deep: {
            why: R`Node محتاج أدوات كتير جنبه عشان مشروع TypeScript عادي: [[tsx]] أو build عشان يشغّل [[.ts]]، و [[npm]] للتسطيب، و vitest أو jest للاختبارات، و [[dotenv]] أو [[--env-file]] للـ env. Bun بيحط الحاجات دي في برنامج واحد سريع في البداية، فالمشروع الصغير يتعمل في ثواني.`,
            how: R`Bun مكتوب بـ Zig، وبيستخدم محرك JavaScriptCore (بتاع Safari) مش V8 (بتاع Chrome و Node). لما تشغّل [[bun file.ts]] بيشيل الأنواع ويشغّل الكود على طول، **من غير ما يفحص الأنواع**. الفحص شغل [[bun check]] (موجود في 1.4.4، وبيطلّع نفس أخطاء [[tsc]] وأرقامها). وبيدعم [[require]] و [[import]] في نفس الملف، وبيحاول يبقى متوافق مع APIs بتاعة Node ([[node:fs]] و [[node:http]] وغيرهم).

[[bun run <script>]] بيشغّل سكربت من [[package.json]] زي [[npm run]]، وبيطبع الأمر قبلها بـ [[$]]. و [[bun <file>]] بيشغّل ملف. ولو فيه ملف اسمه زي أمر (مثلًا [[fmt.ts]])، [[bun fmt]] بيشغّل الملف بدل الأمر: ده حصل فعلًا في التجربة.`,
            when: R`سكربتات وأدوات CLI بـ TypeScript، ومشاريع جديدة صغيرة، ولو عايز تسطيب وتشغيل أسرع. وفي مشروع Node موجود: جرّبه كـ package manager أو test runner الأول قبل ما تغيّر الـ runtime في الإنتاج.`,
            mistakes: R`تفتكر إن [[bun file.ts]] بيفحص الأنواع: الملف بيشتغل وفيه خطأ أنواع، فحط [[bun check]] أو [[tsc --noEmit]] في CI. وتسطّب Bun عام وانت مش محتاجه: [[bunx]] أو صورة Docker [[oven/bun]] كفاية للتجربة. وتنسى إن [[.env]] بيتقرا لوحده في Bun بس، فالكود يشتغل عندك بـ Bun ويقع في Node بـ undefined.`
          },
          teach: R`## Bun في سطر

[[bun]] = runtime (بيشغّل الكود) + package manager + test runner + bundler، في ملف تنفيذي واحد (حوالي ١١٠ ميجا). اتجرّب بـ Bun 1.4.4 على ويندوز 11 (النسخة الـ portable من GitHub Releases، من غير تسطيب عام) وعلى لينكس جوه [[docker run --rm oven/bun:slim]].

---

## ١. التسطيب: [[npm i -g bun]] أو سكربت النظام

أسهل طريقة لو عندك Node: [[npm i -g bun]] (اتجرّبت جوه [[node:22-slim]] وطلعت [[1.4.4]]). والطريقة الرسمية:

- لينكس والماك: [[curl -fsSL https://bun.sh/install | bash]]، وبيتسطّب في [[~/.bun/bin]].
- ويندوز: [[powershell -c "irm bun.sh/install.ps1 | iex"]]، وبيتسطّب في [[%USERPROFILE%\.bun\bin]].

سكربت لينكس اتجرّب جوه [[node:22-slim]] (بعد [[apt-get install curl unzip]]):

~~~text الناتج (آخره)
bun was installed successfully to ~/.bun/bin/bun

Added "~/.bun/bin" to $PATH in "~/.bashrc"
~~~

- [[curl -fsSL]]: نزّل الملف بهدوء ([[-s]])، واعتبر الـ HTTP error فشل ([[-f]])، وامشي ورا أي redirect ([[-L]]).
- [[| bash]]: شغّل اللي نزل كسكربت bash. بيضيف [[~/.bun/bin]] للـ PATH في [[.bashrc]]، فافتح ترمنال جديد.
- [[irm]] = Invoke-RestMethod (بينزّل)، و [[iex]] = Invoke-Expression (بيشغّل). نفس الفكرة على PowerShell. سكربت ويندوز من الـ docs، ماتشغّلش هنا عشان مايتسطّبش حاجة عامة.

---

## ٢. [[bun --version]]

~~~text الناتج
1.4.4
~~~

---

## ٣. [[bun init -y]]

بيعمل مشروع جديد، و [[-y]] يعني «وافق على كل الأسئلة»:

~~~text الناتج (لينكس)
 + .gitignore
 + index.ts
 + tsconfig.json (for bun check and editor autocomplete)
 + README.md

bun install v1.4.4 (38afee6c8)
+ @types/bun@1.4.4
+ typescript@7.0.2
~~~

| الملف | فيه إيه |
|---|---|
| [[index.ts]] | سطر واحد: [[console.log("Hello via Bun!")]] |
| [[package.json]] | [["type": "module"]]، وسكربت [["typecheck": "bun check"]]، و [[@types/bun]] (أنواع [[Bun.*]] للـ editor) |
| [[tsconfig.json]] | [["noEmit": true]] (مفيش build) و [["moduleResolution": "bundler"]] و [["strict": true]] |
| [[bun.lock]] | ملف الـ lock (درس [[bun install]]) |

---

## ٤. [[bun index.ts]]: TypeScript على طول

~~~text الناتج
Hello via Bun!
~~~

مفيش [[tsc]] ولا [[tsx]]: Bun بيشيل الأنواع وهو بيقرا الملف. وفيه فرق مهم عن Node: **[[.env]] بيتقرا لوحده**. عملت [[.env]] فيه [[GREETING=from-dotenv]] والملف بيطبع [[process.env.GREETING]]:

~~~text الناتج على ويندوز
bun index.ts   →  Hello via Bun! from-dotenv
node index.ts  →  Hello via Bun! undefined
~~~

(Node 24 بيشغّل [[.ts]] بسيطة برضه، بس محتاج [[--env-file=.env]] عشان يقرا الملف، درس [[node --watch --env-file]].)

وسرعة البداية: متوسط ١٠ تشغيلات لنفس الملف على نفس الجهاز كان **24ms** لـ Bun و **82ms** لـ Node. ده وقت **البداية** بس، مش سرعة الكود نفسه.

---

## ٥. [[bun run start]]

لو [[package.json]] فيه [["start": "bun index.ts"]]:

~~~text الناتج
$ bun index.ts
Hello via Bun! from-dotenv
~~~

السطر اللي بيبدأ بـ [[$]] هو الأمر اللي اتنفّذ (زي [[npm run]] بالظبط). وتقدر تكتب [[bun start]] من غير [[run]]، بس لو فيه ملف اسمه [[start.ts]] أو [[start.js]]، Bun بيشغّل الملف. في التجربة كان فيه ملف [[fmt.ts]]، و [[bun fmt]] شغّله بدل ما يعمل format! عشان كده [[bun run]] أوضح في السكربتات.

---

## ٦. [[bun --watch index.ts]]

بيشغّل الملف، ولما تعدّل أي ملف هو بيستورده، بيعيد التشغيل لوحده (زي [[node --watch]]). ويقف بـ Ctrl+C.

---

## ٧. [[bun check]]: فحص الأنواع

غيّرت الملف لـ [[const u: User = { name: "Sara", age: "28" }]] و [[age]] نوعه [[number]]:

~~~text bun types.ts (بيشتغل عادي!)
hello Sara string
~~~

~~~text bun check
types.ts(2,33): error TS2322: Type 'string' is not assignable to type 'number'.
Found 1 error in 1 file, checked 2 files [128.41ms]
~~~

- [[bun types.ts]] اشتغل وطبع إن [[age]] نوعه [[string]]: الأنواع اتشالت ومحدش فحصها.
- [[bun check]] لقى الغلط، وخرج بـ exit code [[1]] (فالـ CI يقع). [[(2,33)]] = السطر ٢، العمود ٣٣. و [[TS2322]] نفس رقم الخطأ اللي [[tsc]] بيطلّعه.

---

## الخلاصة

| الأمر | بيعمل إيه | المقابل في Node |
|---|---|---|
| [[bun file.ts]] | يشغّل ملف TS أو JS | [[node file.ts]] / [[npx tsx file.ts]] |
| [[bun run x]] | يشغّل سكربت من package.json | [[npm run x]] |
| [[bun --watch]] | يعيد التشغيل لما تعدّل | [[node --watch]] |
| [[bun check]] | فحص الأنواع | [[tsc --noEmit]] |
| [[bun init -y]] | مشروع جديد | [[npm init -y]] |

- Bun بيشغّل الملف حتى لو فيه أخطاء أنواع: الفحص خطوة منفصلة.
- [[.env]] بيتقرا لوحده في Bun بس.`,
          lines: [
            R`تسطيب Bun من npm (أي نظام فيه Node).`,
            R`اتأكد من النسخة.`,
            R`مشروع جديد: [[index.ts]] و [[package.json]] و [[tsconfig.json]].`,
            R`شغّل ملف TypeScript على طول (وبيقرا [[.env]] لوحده).`,
            R`شغّل سكربت [[start]] من [[package.json]].`,
            R`شغّل وأعد التشغيل مع كل تعديل.`,
            R`افحص الأنواع (التشغيل نفسه مبيفحصهاش).`,
            R`التسطيب الرسمي على لينكس والماك (من الـ docs، واتجرّب جوه container).`,
            R`التسطيب الرسمي على ويندوز (من الـ docs).`
          ],
          sol: R`الناتج الحقيقي على ويندوز بـ Bun 1.4.4 و Node 24.22:
[[bun index.ts]] ← [[Hello via Bun! hi]]
[[node index.ts]] ← [[Hello via Bun! undefined]]

يعني Bun بس اللي قرا [[.env]] لوحده. Node محتاج [[node --env-file=.env index.ts]].

وخطأ الأنواع: [[bun index.ts]] بيشتغل عادي ومش بيشتكي، و [[bun check]] بيطلّع:
[[index.ts(…): error TS2322: Type 'string' is not assignable to type 'number'.]]
ويخرج بـ exit code [[1]].`
        },
        {
          cmd: "bun install",
          title: "Bun كـ package manager: bun.lock و trustedDependencies",
          desc: R`[[bun install]] بيقرا نفس [[package.json]] بتاع npm ويسطّب في [[node_modules]] عادي، بس بيكتب [[bun.lock]] بدل [[package-lock.json]]. والفرق الأهم: **مش بيشغّل سكربتات [[postinstall]] بتاعة المكتبات** إلا اللي انت توثق فيها بـ [[bun pm trust]].

تقدر تستخدمه مع مشروع Node عادي: الـ runtime يفضل Node، والتسطيب بس بـ Bun.`,
          example: R`bun install
bun add hono zod
bun add -d core-js
bun pm untrusted
bun pm trust core-js
bun install --frozen-lockfile
bun x cowsay hi`,
          try: R`في مشروع فيه [[package-lock.json]]: انسخه لفولدر تجربة، واعمل [[npm ci]] وقيس الوقت، وبعدين امسح [[node_modules]] واعمل [[bun install]] مرتين (المرة التانية الكاش سخن). وبعدين ضيف مكتبة فيها [[postinstall]] (زي [[core-js]]) وشوف Bun عمل إيه.`,
          deep: {
            why: R`التسطيب أكتر حاجة بتستنّاها في CI وفي أول يوم في مشروع. و [[postinstall]] بتاع أي مكتبة (أو مكتبة جواها) بيقدر يشغّل أي كود على جهازك وقت التسطيب، وده باب لهجمات supply chain. Bun بيقفل الباب ده افتراضيًا.`,
            how: R`Bun بيحفظ كل نسخة مكتبة مرة واحدة في كاش عام ([[~/.bun/install/cache]])، وفي [[node_modules]] بيعمل hardlinks منه على لينكس والماك، فالتسطيب التاني بيبقى شبه فوري. على ويندوز الفرق أصغر بكتير (شوف الأرقام في الشرح).

[[bun.lock]] ملف نصي (JSONC: JSON بيسمح بفاصلة في الآخر)، فبيتقرا في الـ diff والـ review. فيه النسخة بالظبط والـ integrity hash لكل مكتبة.

الـ lifecycle scripts ([[preinstall]] و [[postinstall]]) مبتشتغلش غير لمكتبة موجودة في [[trustedDependencies]] في [[package.json]]، أو في لستة صغيرة مشهورة Bun واثق فيها (زي esbuild). [[bun pm untrusted]] بيوريك اللي اتمنع، و [[bun pm trust x]] بيشغّله ويضيفه للستة.`,
            when: R`مشروع جديد بـ Bun، أو CI عايز تسطيب أسرع على لينكس. ولو مشروع الفريق بـ npm أو pnpm، متغيّرش الـ package manager لوحدك: الـ lock لازم يبقى واحد.`,
            mistakes: R`[[bun install]] في مشروع فيه [[package-lock.json]] بيعمل [[bun.lock]] جنبه، فيبقى فيه lock اتنين بنسخ ممكن تختلف: اختار واحد وامسح التاني. ومكتبة محتاجة [[postinstall]] عشان تشتغل (بتنزّل binary مثلًا) وانت متجاهل رسالة [[Blocked 1 postinstall]]، فتقع وقت التشغيل. وفي CI تكتب [[bun install]] بدل [[bun install --frozen-lockfile]]، فيحدّث الـ lock بدل ما يفشل لو مش متطابق.`
          },
          teach: R`## نفس package.json، lock مختلف

[[bun install]] بيعمل اللي [[npm install]] بيعمله، بس أسرع على لينكس، وبيمنع سكربتات التسطيب. اتجرّب بـ Bun 1.4.4 على ويندوز (portable، والكاش في فولدر التجربة) وعلى لينكس جوه [[node:22-slim]].

---

## ١. [[bun install]]

بيقرا [[package.json]] ويسطّب كل اللي فيه، ويعمل [[bun.lock]] لو مش موجود. زي [[npm install]] بالظبط.

---

## ٢. [[bun add hono zod]]

[[add]] = سطّب مكتبة وضيفها في [[dependencies]]:

~~~text الناتج
bun add v1.4.4 (38afee6c8)
Resolving dependencies
Resolved, downloaded and extracted [8]

installed hono@4.13.14
installed zod@4.6.7

2 packages installed [60.23s]
Saved lockfile
~~~

الـ ٦٠ ثانية دي نت بطيء وقتها، مش Bun. و [[package.json]] بقى فيه [["hono": "^4.13.14"]] (بـ [[^]] زي npm، درس [[^ و ~ في النسخ]]).

### [[bun.lock]] من جوه

~~~text bun.lock (جزء)
{
  "lockfileVersion": 2,
  "workspaces": {
    "": {
      "name": "bunpm",
      "dependencies": {
        "hono": "^4.13.14",
        "zod": "^4.6.7",
      },
    },
  },
  "packages": {
    "hono": ["hono@4.13.14", "", {}, "sha512-yhRLQ21U6qa9..."],
  }
}
~~~

- [[workspaces → ""]]: المشروع الأساسي (الـ [[""]] يعني الفولدر نفسه) واللي طالبه.
- [[packages]]: كل مكتبة: النسخة بالظبط، و [[sha512-...]] = بصمة الملف، لو حد غيّر المكتبة على الـ registry التسطيب يفشل.
- لاحظ الفاصلة بعد آخر عنصر ([["zod": "^4.6.7",]]): ده JSONC مش JSON عادي.

---

## ٣. [[bun add -d core-js]]: مكتبة فيها [[postinstall]]

[[-d]] = devDependencies. و [[core-js]] فيها سكربت [[postinstall]]:

~~~text الناتج
installed core-js@3.51.0

1 package installed [24.19s]

Blocked 1 postinstall. Run $__btbun pm untrusted$__bt for details.
~~~

---

## ٤. [[bun pm untrusted]]

~~~text الناتج
.\node_modules\core-js @3.51.0
 » [postinstall]: node -e "try{require('./postinstall')}catch(e){}"

These dependencies had their lifecycle scripts blocked during install.
~~~

بيوريك **السكربت نفسه** اللي اتمنع. هنا هو بيطبع رسالة تبرعات بس، فمش محتاجه. لكن مكتبات زي [[sharp]] أو [[better-sqlite3]] ممكن تحتاج سكربتها عشان تنزّل الـ binary بتاعها.

---

## ٥. [[bun pm trust core-js]]

~~~text الناتج
.\node_modules\core-js @3.51.0
 ✓ [postinstall]: node -e "try{require('./postinstall')}catch(e){}"

 1 script ran across 1 package [256.00ms]
~~~

شغّل السكربت، وضاف في [[package.json]]:

~~~text package.json
"trustedDependencies": [
  "core-js"
]
~~~

فأي حد يسطّب المشروع بعد كده، السكربت ده بيشتغل عنده. القرار بقى متسجّل ومتراجَع في الـ commit.

---

## ٦. [[bun install --frozen-lockfile]]: ده بتاع CI

زي [[npm ci]]: سطّب **بالظبط** اللي في [[bun.lock]]، ولو [[package.json]] مش متطابق معاه افشل بدل ما تحدّثه. مسحت [[node_modules]] وشغّلته:

~~~text الناتج
+ core-js@3.51.0
+ hono@4.13.14
+ zod@4.6.7

3 packages installed [3.56s]
~~~

### الأرقام: npm ولا Bun؟

نفس [[package.json]] (hono و zod وغيرهم، ٦٨ باكدج)، الكاش سخن، و [[node_modules]] ممسوح قبل كل مرة:

| | لينكس ([[node:22-slim]]) | ويندوز 11 |
|---|---|---|
| [[npm ci]] | 7.4s | من 3.8 لـ 15 ثانية (متذبذب) |
| [[bun install]] | **0.11s** | حوالي 6.5s |

على لينكس Bun بيعمل hardlinks من الكاش فالتسطيب شبه فوري. على ويندوز بينسخ الملفات، فالفرق صغير. فمتصدقش رقم واحد من غير ما تجرب على النظام اللي هتشتغل عليه.

> ولما شغّلت [[bun install]] في فولدر فيه [[package-lock.json]]، عمل [[bun.lock]] **جنبه** وساب القديم. يبقى عندك lock اتنين: اختار واحد.

---

## ٧. [[bun x cowsay hi]]

[[bun x]] (أو [[bunx]]) زي [[npx]]: نزّل وشغّل:

~~~text الناتج
Resolved, downloaded and extracted [142]
 ____
< hi >
 ----
        \   ^__^
         \  (oo)\_______
~~~

> النسخة الـ portable على ويندوز مفيهاش [[bunx.exe]] (السكربت الرسمي بيعمله)، عشان كده [[bunx]] مكانش موجود و [[bun x]] اشتغل.

---

## الخلاصة

| npm | Bun |
|---|---|
| [[npm install]] | [[bun install]] |
| [[npm i x]] / [[npm i -D x]] | [[bun add x]] / [[bun add -d x]] |
| [[npm ci]] | [[bun install --frozen-lockfile]] |
| [[npx x]] | [[bun x x]] / [[bunx x]] |
| [[package-lock.json]] | [[bun.lock]] |
| سكربتات التسطيب بتشتغل | ممنوعة إلا [[trustedDependencies]] |`,
          lines: [
            R`سطّب كل اللي في [[package.json]] واعمل [[bun.lock]].`,
            R`ضيف مكتبتين في [[dependencies]].`,
            R`ضيف مكتبة في [[devDependencies]] (فيها [[postinstall]] هيتمنع).`,
            R`اعرض سكربتات التسطيب اللي اتمنعت.`,
            R`شغّل سكربت مكتبة واحدة وسجّلها في [[trustedDependencies]].`,
            R`تسطيب CI: بالظبط زي الـ lock أو افشل.`,
            R`نزّل وشغّل أداة (زي [[npx]]).`
          ],
          sol: R`اللي طلع عندي بنفس المشروع (٦٨ باكدج، الكاش سخن):
• لينكس: [[npm ci]] حوالي 7.4 ثانية، و [[bun install]] حوالي 0.11 ثانية.
• ويندوز 11: [[npm ci]] بين 3.8 و 15 ثانية، و [[bun install]] حوالي 6.5 ثانية.

و [[core-js]]: Bun طبع [[Blocked 1 postinstall. Run bun pm untrusted for details.]] ومشغّلش السكربت، و npm كان هيشغّله على طول. ولو المشروع فيه [[package-lock.json]]، [[bun install]] بيعمل [[bun.lock]] جنبه: امسح واحد منهم عشان الفريق كله يسطّب نفس النسخ.`
        },
        {
          cmd: "bun test",
          title: "اختبارات بـ bun test من غير ما تسطّب حاجة",
          desc: R`[[bun test]] test runner جوه Bun، شكله زي Jest و Vitest ([[describe]] و [[test]] و [[expect]] و [[mock]])، وبيشغّل [[.ts]] على طول من غير إعدادات. بيلاقي أي ملف اسمه [[*.test.ts]] أو [[*.spec.ts]] لوحده.

الاختبار بيستورد من [[bun:test]]، فالملف ده مش هيشتغل بـ Node.`,
          example: R`bun test
bun test --coverage
bun test math
bun test -t "getUser"
bun test --watch`,
          try: R`اعمل [[math.ts]] فيه [[sum]]، و [[math.test.ts]] فيه اختبار ليها و [[test.each]] بحالتين. شغّل [[bun test]]، وبعدين غيّر [[a + b]] لـ [[a - b]] وشوف شكل الفشل. وجرّب [[node --test math.test.ts]]: إيه اللي حصل؟`,
          deep: {
            why: R`في مشروع Node عادي، عشان تكتب اختبار بـ TypeScript محتاج vitest أو jest وإعدادات. في Bun الأداة موجودة أصلًا، ومفيش config. ولأن Bun بيبدأ بسرعة، الاختبارات الصغيرة بتخلص في أجزاء من الثانية.`,
            how: R`[[bun test]] بيدوّر في الفولدر على [[*.test.{ts,js,tsx}]] و [[*_test.*]] و [[*.spec.*]] و [[*_spec.*]]، ويشغّل كل ملف. الـ API بتاع [[bun:test]] شبه Jest: [[expect(x).toBe(y)]] و [[toEqual]] و [[toThrow]] و [[toHaveBeenCalledWith]]، و [[mock(fn)]] بدل [[jest.fn]] / [[vi.fn]]، و [[test.each]]. والـ coverage جاهز بـ [[--coverage]].

[[bun test math]]: الكلمة دي بتفلتر **أسامي الملفات**. و [[-t "getUser"]] بيفلتر **أسامي الاختبارات** (regex).`,
            when: R`مشروع شغال بـ Bun أصلًا، أو library صغيرة. ولو المشروع على Node وفيه Vitest شغال، خليك عليه: Vitest بيشغّل نفس الاختبارات على Node اللي هيتشغّل عليه الإنتاج.`,
            mistakes: R`تكتب الاختبارات بـ [[bun:test]] والإنتاج Node: الاختبار بيعدّي على محرك مختلف (JavaScriptCore) عن اللي هيشغّل الكود. وتفتكر إن [[bun test]] بيفحص الأنواع: لأ، زي [[bun file.ts]]. وتعمل [[node --test]] على ملفات Bun: بيقع بـ [[ERR_UNSUPPORTED_ESM_URL_SCHEME]] لأن Node مش فاهم [[bun:]].`
          },
          teach: R`## الملفين اللي هنختبرهم

اتجرّب على ويندوز 11 بـ Bun 1.4.4.

~~~text math.ts
export function sum(a: number, b: number) {
  return a + b;
}
export async function getUser(fetcher: (id: number) => Promise<{ name: string }>, id: number) {
  const u = await fetcher(id);
  return u.name.toUpperCase();
}
~~~

~~~text math.test.ts
import { describe, test, expect, mock } from "bun:test";
import { sum, getUser } from "./math";

describe("sum", () => {
  test("1 + 2", () => {
    expect(sum(1, 2)).toBe(3);
  });
  test.each([[2, 2, 4], [-1, 1, 0]])("%d + %d = %d", (a, b, r) => {
    expect(sum(a, b)).toBe(r);
  });
});

test("getUser بيستخدم الـ fetcher", async () => {
  const fake = mock(async (id: number) => ({ name: "sara" }));
  expect(await getUser(fake, 7)).toBe("SARA");
  expect(fake).toHaveBeenCalledWith(7);
});
~~~

- [[import ... from "bun:test"]]: الـ [[bun:]] في الأول معناها «module جاي مع Bun نفسه»، زي [[node:fs]] في Node.
- [[describe("sum", ...)]]: بيجمّع اختبارات تحت اسم واحد.
- [[test.each(...)]]: نفس الاختبار بأكتر من داتا. كل array = تشغيلة، و [[%d]] في الاسم بيتبدّل بالأرقام بالترتيب.
- [[mock(async (id) => ...)]]: دالة مزيفة بتسجّل اتنادت بإيه. بدل ما [[getUser]] تكلم API حقيقي، بتديها دي.
- [[toHaveBeenCalledWith(7)]]: اتأكد إن الـ mock اتنادى بـ 7.

---

## ١. [[bun test]]

~~~text الناتج
bun test v1.4.4 (38afee6c8)

 4 pass
 0 fail
 5 expect() calls
Ran 4 tests across 1 file. [52.00ms]
~~~

ليه ٤ اختبارات؟ [[1 + 2]] واحد، و [[test.each]] اتنين، و [[getUser]] واحد. وليه ٥ [[expect]]؟ لأن اختبار [[getUser]] فيه اتنين.

### لما يفشل

غيّرت [[a + b]] لـ [[a - b]]:

~~~text الناتج (جزء)
6 |     expect(sum(1, 2)).toBe(3);
                          ^
error: expect(received).toBe(expected)

Expected: 3
Received: -1

(fail) sum > 1 + 2 [0.64ms]
...
 1 pass
 3 fail
~~~

بيوريك السطر نفسه، والمتوقع ([[Expected]]) والفعلي ([[Received]])، واسم الاختبار كامل [[sum > 1 + 2]] (الـ describe ثم الـ test). والـ exit code [[1]].

---

## ٢. [[bun test --coverage]]

~~~text الناتج
-----------|---------|---------|-------------------
File       | % Funcs | % Lines | Uncovered Line #s
-----------|---------|---------|-------------------
All files  |  100.00 |  100.00 |
 math.ts   |  100.00 |  100.00 |
-----------|---------|---------|-------------------
~~~

[[% Funcs]] نسبة الدوال اللي اتنادت، و [[% Lines]] نسبة السطور اللي اتنفذت، و [[Uncovered Line #s]] أرقام السطور اللي محدش جربها (فاضية هنا). معنى الـ coverage وحدوده في درس [[--coverage]] في تاب فحص الكود.

---

## ٣. [[bun test math]] و [[-t "getUser"]]

~~~text bun test -t "getUser"
 1 pass
 3 filtered out
 0 fail
 2 expect() calls
Ran 1 test across 1 file. [11.00ms]
~~~

| الأمر | بيفلتر إيه |
|---|---|
| [[bun test math]] | الملفات اللي اسمها فيه [[math]] (الأربعة اشتغلوا) |
| [[bun test -t "getUser"]] | الاختبارات اللي اسمها فيه [[getUser]]، والباقي [[filtered out]] |

---

## ٤. [[bun test --watch]]

بيفضل شغال، ومع كل حفظ يعيد الاختبارات. (ماتجربش هنا لأنه بيستنى للأبد.)

---

## وفي Node؟

~~~text node --test math.test.ts
Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. Received protocol 'bun:'
~~~

Node مش عارف يعني إيه [[bun:test]]. الاختبارات دي مربوطة بـ Bun.

## الخلاصة

| Bun | Vitest | Node |
|---|---|---|
| [[import { test, expect } from "bun:test"]] | [[from "vitest"]] | [[from "node:test"]] + [[node:assert]] |
| [[mock(fn)]] | [[vi.fn(fn)]] | [[mock.fn(fn)]] |
| [[bun test]] | [[npx vitest run]] | [[node --test]] |`,
          lines: [
            R`شغّل كل ملفات [[*.test.*]] و [[*.spec.*]].`,
            R`ومعاهم جدول الـ coverage.`,
            R`بس الملفات اللي اسمها فيه [[math]].`,
            R`بس الاختبارات اللي اسمها فيه [[getUser]].`,
            R`أعد التشغيل مع كل حفظ.`
          ],
          sol: R`الناتج الحقيقي ([[bun test]] بعد ما غيّرت [[+]] لـ [[-]]):
[[(fail) sum > 1 + 2]] و [[Expected: 3]] و [[Received: -1]]، وفي الآخر [[1 pass]] و [[3 fail]] (اختبار [[getUser]] عدّى لأنه مش بيستخدم [[sum]]). الـ exit code [[1]].

و [[node --test math.test.ts]] وقع بـ [[ERR_UNSUPPORTED_ESM_URL_SCHEME ... Received protocol 'bun:']]: الملف بيستورد من [[bun:test]] اللي Node مايعرفوش.`
        },
        {
          cmd: "Bun.serve",
          title: "سيرفر HTTP بـ Bun.serve و routes",
          desc: R`[[Bun.serve]] بيعمل سيرفر HTTP من غير Express: بتديله [[routes]] (مسار ← دالة أو object فيه [[GET]] و [[POST]])، وكل دالة بتاخد [[Request]] وترجّع [[Response]] (نفس اللي في المتصفح و [[fetch]]).

و [[error]] بيمسك أي exception، و [[fetch]] بيرد على أي مسار مش في [[routes]]. اتجرّب بـ Bun 1.4.4 على ويندوز.`,
          example: R`const users = [{ id: 1, name: "Sara" }, { id: 2, name: "Ali" }];
const server = Bun.serve({
  port: Number(process.env.PORT ?? 3000),
  routes: {
    "/": new Response("home"),
    "/api/users": {
      GET: () => Response.json(users),
      POST: async (req) => {
        const body = await req.json();
        const user = { id: users.length + 1, name: body.name };
        users.push(user);
        return Response.json(user, { status: 201 });
      },
    },
    "/api/users/:id": (req) => {
      const user = users.find((u) => u.id === Number(req.params.id));
      return user ? Response.json(user) : Response.json({ error: "not found" }, { status: 404 });
    },
  },
  error(err) {
    console.error(err);
    return Response.json({ error: "server error" }, { status: 500 });
  },
  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});
console.log($__btlistening on $__{server.url}$__bt);`,
          try: R`احفظ المثال [[server.ts]] وشغّله بـ [[bun server.ts]]. جرّب بـ curl: [[GET /api/users]]، و [[POST]] بـ JSON، و [[/api/users/9]]، و [[DELETE /api/users]]، وابعت [[POST]] بـ body مش JSON. وبعدين اعمله ملف تنفيذي واحد بـ [[bun build --compile server.ts --outfile srv]].`,
          flag: "script",
          deep: {
            why: R`سيرفر API صغير أو webhook مش محتاج framework. [[Bun.serve]] بيدّيك routing جاهز و [[Request]]/[[Response]] القياسيين، فنفس الكود تقريبًا يشتغل في Deno و Cloudflare Workers.`,
            how: R`[[routes]] object: المفتاح مسار، والقيمة واحدة من ٣: [[Response]] جاهزة (بتتبعت زي ما هي، كويسة للصفحات الثابتة)، أو دالة بتاخد [[req]]، أو object بالـ HTTP methods. [[:id]] في المسار بيبقى في [[req.params.id]] (نص دايمًا، عشان كده [[Number(...)]]).

المسار اللي مش في [[routes]] بيروح لـ [[fetch]]. ولو method مش متعرّفة (زي [[DELETE]] على [[/api/users]]) بيروح برضه لـ [[fetch]]، فبيرجع 404 مش 405.

[[error(err)]] بيتنادى لما أي handler يرمي exception. من غيره: في التطوير Bun بيرجّع صفحة HTML كبيرة فيها الـ error، وفي [[NODE_ENV=production]] بيرجّع [[Something went wrong!]] بـ 500.

[[Response.json(data, init)]] بيعمل [[JSON.stringify]] ويحط [[Content-Type: application/json]]. و [[server.url]] فيه العنوان الكامل.`,
            when: R`API صغيرة أو سيرفر داخلي شغال على Bun. ولو المشروع هيكبر (middleware، validation، تشغيل على أكتر من runtime) شوف درس [[Hono]]: بيشتغل فوق [[Bun.serve]] بنفس الفكرة.`,
            mistakes: R`مفيش [[error]] handler، فأول JSON بايظ من عميل يرجّعله صفحة الـ error بتاعة التطوير بكل المسارات اللي على جهازك. وتعتمد إن [[req.params.id]] رقم: هو نص. وتتوقع 405 لـ method مش موجودة. وتخزّن الداتا في array زي المثال في الإنتاج: بتضيع مع كل restart، المثال للشرح بس.`
          },
          teach: R`## سيرفر في ملف واحد

[[Bun.serve]] بياخد object إعدادات ويشغّل سيرفر. كل handler بياخد [[Request]] ويرجّع [[Response]]: نفس الـ classes اللي بتستخدمها مع [[fetch]] في المتصفح. اتجرّب على ويندوز 11 بـ Bun 1.4.4، والطلبات بـ [[curl.exe]] من PowerShell.

---

## ١. التشغيل

~~~powershell
bun server.ts
~~~

~~~text الناتج
listening on http://localhost:3000/
~~~

- [[port: Number(process.env.PORT ?? 3000)]]: خد البورت من متغير البيئة [[PORT]] لو موجود، وإلا 3000. الـ [[??]] معناها «لو اللي قبلي null أو undefined خد اللي بعدي»، و [[Number]] لأن متغيرات البيئة نصوص.
- [[server.url]]: الـ URL الكامل للسيرفر، والـ template literal في آخر سطر بيطبعه.

---

## ٢. [[routes]]: ٣ أشكال

| الشكل | مثال | إمتى |
|---|---|---|
| [[Response]] جاهزة | [["/": new Response("home")]] | رد ثابت ميتغيرش |
| object بالـ methods | [["/api/users": { GET, POST }]] | نفس المسار، شغل مختلف لكل method |
| دالة | [["/api/users/:id": (req) => ...]] | أي method |

~~~text الناتج
curl http://localhost:3000/                → home
curl http://localhost:3000/api/users       → [{"id":1,"name":"Sara"},{"id":2,"name":"Ali"}]
~~~

### الـ POST

~~~powershell
curl.exe -s -X POST http://localhost:3000/api/users -H "content-type: application/json" -d '{"name":"Mona"}' -w " %{http_code}"
~~~

~~~text الناتج
{"id":3,"name":"Mona"} 201
~~~

- [[async (req) =>]]: الـ handler async لأن قراية الـ body بتستنى.
- [[await req.json()]]: اقرا الـ body وحوّله object.
- [[{ id: users.length + 1, name: body.name }]]: id جديد، وخد الاسم بس (مش كل اللي العميل بعته).
- [[Response.json(user, { status: 201 })]]: [[201 Created]] = اتعمل حاجة جديدة.
- [[-w " %{http_code}"]] في curl: اطبع رقم الـ status بعد الرد.

> في PowerShell 7 اكتب [['{"name":"Mona"}']] زي ما هي. لو كتبت [[\"]] جوه علامات تنصيص مفردة، الـ [[\]] بتوصل للسيرفر والـ JSON بيبوظ (حصلت فعلًا).

---

## ٣. [[:id]] و [[req.params]]

~~~text الناتج
curl /api/users/3   → {"id":3,"name":"Mona"}
curl /api/users/9   → {"error":"not found"} 404
~~~

- [[:id]]: جزء متغير في المسار. Bun بيحطه في [[req.params.id]] كـ **نص** ([["3"]])، و [[Number(...)]] بيحوّله عشان المقارنة بـ [[===]] تنجح.
- [[users.find(...)]]: أول عنصر الشرط بتاعه true، أو [[undefined]].
- [[user ? A : B]]: لو لقيته رجّعه، وإلا 404.

---

## ٤. [[fetch]]: أي حاجة تانية

~~~text الناتج
curl -i /nope                  → HTTP/1.1 404 Not Found ... Not Found
curl -i -X DELETE /api/users   → HTTP/1.1 404 Not Found ... Not Found
~~~

التانية مهمة: [[/api/users]] موجود بس من غير [[DELETE]]، فـ Bun بعتها لـ [[fetch]] اللي رجّع 404، مش [[405 Method Not Allowed]].

---

## ٥. [[error(err)]]: لما handler يقع

بعت [[POST]] بـ body = [[oops]] (مش JSON)، فـ [[req.json()]] رمى [[SyntaxError]]. نفس الطلب بـ ٣ حالات:

| الحالة | الرد |
|---|---|
| من غير [[error]]، تطوير | [[500]] و [[text/html]]: صفحة error كبيرة فيها مسار الملف على جهازك |
| من غير [[error]]، [[NODE_ENV=production]] | [[500]] و [[Something went wrong!]] |
| مع [[error]] زي المثال | [[500]] و [[{"error":"server error"}]] |

و [[console.error(err)]] طبع في الترمنال:

~~~text الناتج
SyntaxError: JSON Parse error: Unexpected identifier "oops"
~~~

> الأصح إن JSON بايظ يرجّع 400 مش 500. ده شغل validation (درس [[Hono + zod]]).

---

## ٦. ملف تنفيذي واحد: [[bun build --compile]]

~~~powershell
bun build --compile server.ts --outfile srv.exe
.\srv.exe
~~~

~~~text الناتج
  [36ms]  bundle  1 modules
 [384ms] compile  srv.exe
109.9 MB
[{"id":1,"name":"Sara"},{"id":2,"name":"Ali"}]
~~~

الملف فيه Bun نفسه + الكود، فبيشتغل على جهاز مفيهوش Bun ولا Node. التمن: ١١٠ ميجا لملف ٢٨ سطر.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[routes]] | المسارات: [[Response]] أو دالة أو [[{ GET, POST }]] |
| [[req.params.id]] | الجزء المتغير، نص دايمًا |
| [[Response.json(x, { status })]] | رد JSON بالـ status |
| [[error(err)]] | أي exception، من غيره صفحة HTML أو [[Something went wrong!]] |
| [[fetch(req)]] | أي مسار أو method مش في [[routes]] (404 مش 405) |`,
          lines: [
            R`داتا للتجربة في الذاكرة (بتضيع مع الـ restart).`,
            R`شغّل السيرفر، و [[server]] فيه [[url]] و [[port]].`,
            R`البورت من [[PORT]] أو 3000.`,
            R`المسارات.`,
            R`رد ثابت جاهز.`,
            R`مسار بـ handler لكل method.`,
            R`[[GET]]: رجّع الليستة JSON.`,
            R`[[POST]]: async عشان قراية الـ body.`,
            R`اقرا الـ JSON اللي في الـ body.`,
            R`اعمل user جديد بـ id، وخد الاسم بس.`,
            R`ضيفه.`,
            R`رجّعه بـ [[201 Created]].`,
            R`قفلة الـ POST.`,
            R`قفلة المسار.`,
            R`مسار فيه جزء متغير [[:id]].`,
            R`دوّر عليه، و [[req.params.id]] نص فبنحوّله رقم.`,
            R`لقيته؟ رجّعه، وإلا 404.`,
            R`قفلة.`,
            R`قفلة [[routes]].`,
            R`أي exception في أي handler بيوصل هنا.`,
            R`اطبعه في اللوج.`,
            R`ورجّع رسالة عامة للعميل.`,
            R`قفلة.`,
            R`أي مسار أو method مش في [[routes]].`,
            R`404.`,
            R`قفلة.`,
            R`قفلة [[Bun.serve]].`,
            R`اطبع العنوان.`
          ],
          sol: R`الردود الحقيقية بـ Bun 1.4.4:
[[GET /api/users]] ← [[[{"id":1,"name":"Sara"},{"id":2,"name":"Ali"}]]]
[[POST /api/users]] بـ [[{"name":"Mona"}]] ← [[{"id":3,"name":"Mona"} 201]]
[[GET /api/users/9]] ← [[{"error":"not found"} 404]]
[[DELETE /api/users]] ← [[404 Not Found]] (من [[fetch]]، مش 405)
[[POST]] بـ body = [[oops]] ← [[500]] و [[{"error":"server error"}]]، والترمنال فيه [[SyntaxError: JSON Parse error: Unexpected identifier "oops"]].

و [[bun build --compile]] عمل [[srv.exe]] حجمه حوالي 110MB اشتغل لوحده من غير Bun.`
        },
        {
          cmd: "توافق Bun مع Node",
          title: "Bun بيشغّل كود Node؟ اللي بيشتغل واللي لأ",
          desc: R`Bun بيقول إنه متوافق مع Node ([[process.versions.node]] عنده [[26.3.0]])، وأغلب الحاجات بتشتغل فعلًا: [[node:fs]] و [[node:http]] و Express و Hono و [[worker_threads]]، وحتى native addons زي [[better-sqlite3]]. بس فيه حاجات **موجودة بالاسم وفاضية من جوه**، لأن المحرك مختلف (JavaScriptCore مش V8).

المثال سكربت صغير بيكشف ٣ منهم. شغّله بـ [[node]] وبـ [[bun]] وقارن.`,
          example: R`import ah from "node:async_hooks";
import v8 from "node:v8";
import { performance } from "node:perf_hooks";
let inits = 0;
ah.createHook({ init() { inits++; } }).enable();
await new Promise((r) => setTimeout(r, 5));
console.log("createHook init calls:", inits);
const heap = v8.getHeapStatistics();
console.log("used heap MB:", Math.round(heap.used_heap_size / 1e6));
console.log("ELU:", performance.eventLoopUtilization().utilization.toFixed(3));
console.log("engine:", typeof Bun !== "undefined" ? "JavaScriptCore" : "V8", "| node compat:", process.versions.node);`,
          try: R`احفظ المثال [[compat.mjs]] وشغّله بـ [[node compat.mjs]] و [[bun compat.mjs]] (و [[deno run compat.mjs]] لو عندك Deno). وبعدين خد مشروع Node عندك وجرّب: [[bun install]] و [[bun run dev]] و [[bun test]] (لو الاختبارات Vitest أو Jest)، واكتب إيه اللي وقع.`,
          flag: "script",
          deep: {
            why: R`أي حد هيقولك «Bun متوافق مع Node، انقل». ده صح لأغلب الكود، بس الحاجات اللي بتقع غالبًا مش بتطلّع error: بتشتغل وترجّع أرقام غلط. وأدوات المراقبة (APM) والـ profiling هي اللي بتعتمد على الحاجات دي بالظبط، فبتكتشفها في الإنتاج.`,
            how: R`[[async_hooks.createHook]] في Node بيبلّغك بكل عملية async بتتعمل، وأدوات tracing قديمة بتعتمد عليه. في Bun الدالة موجودة بس مبتناديش [[init]] أبدًا (٠ مرة). و [[AsyncLocalStorage]] (اللي أغلب الـ frameworks بتستخدمه) **بيشتغل** في Bun.

[[node:v8]] في Bun module متقلّد (المحرك نفسه مش V8): [[getHeapStatistics]] بيرجّع object بنفس الشكل بأرقام مش حقيقية ([[used heap]] صفر). وأي heap snapshot بيطلع بصيغة JavaScriptCore. و [[performance.eventLoopUtilization]] بيرجّع صفر دايمًا.

والفرق الأكبر مش API: المحرك نفسه. الـ GC (تنضيف الذاكرة) والـ JIT (تحويل الكود لكود معالج) مختلفين، فكود سريع على V8 ممكن يبقى أبطأ أو أسرع على JavaScriptCore، والذاكرة بتتصرف مختلف. و [[bun --inspect]] بيفتح debugger بتاع WebKit (من الـ docs: [[debug.bun.sh]]) مش Chrome DevTools.`,
            when: R`قبل ما تنقل سيرفر Node موجود لـ Bun: شغّل الاختبارات كلها بـ Bun، وشغّل أدوات المراقبة اللي عندك (Sentry، OpenTelemetry، APM) وشوف هل بتسجّل حاجة فعلًا، وقيس الذاكرة تحت ضغط.`,
            mistakes: R`تعتمد على [[process.versions.node]] عشان تعرف انت على Node: Bun بيرجّع [[26.3.0]] و Deno [[26.5.1]]. اسأل [[typeof Bun !== "undefined"]] أو [[process.versions.bun]]. وتفتكر إن «الكود اشتغل» = «متوافق»: الـ heap stats صفر من غير ما حاجة تقع. وتحكم من benchmark على hello world.`
          },
          teach: R`## ٣ أسئلة لنفس السكربت

السكربت بيسأل الـ runtime: «بلّغتني بالعمليات الـ async؟»، و«الـ heap كام؟»، و«الـ event loop مشغول قد إيه؟». اتجرّب على ويندوز 11 بـ Node 24.22 و Bun 1.4.4 و Deno 2.9.8.

---

## ١. [[async_hooks.createHook]]

~~~text compat.mjs (أول جزء)
let inits = 0;
ah.createHook({ init() { inits++; } }).enable();
await new Promise((r) => setTimeout(r, 5));
console.log("createHook init calls:", inits);
~~~

- [[createHook({ init() {...} })]]: hook بيتنادى [[init]] بتاعه مع كل resource async جديد (Promise، timer، socket). و [[.enable()]] بيشغّله.
- [[await new Promise((r) => setTimeout(r, 5))]]: استنى ٥ms. ده بيعمل Promise و timer، فالمفروض [[init]] يتنادى.
- [[inits++]]: عدّاد.

---

## ٢. [[v8.getHeapStatistics()]]

بيرجّع object فيه أرقام الذاكرة بتاعة المحرك. [[used_heap_size]] بالـ bytes، و [[/ 1e6]] بيحوّلها ميجا ([[1e6]] = مليون)، و [[Math.round]] بيقرّب.

---

## ٣. [[performance.eventLoopUtilization()]]

ELU = Event Loop Utilization: نسبة الوقت اللي الـ event loop كان مشغول فيه (من 0 لـ 1). أدوات المراقبة بتستخدمه عشان تعرف السيرفر مخنوق ولا لأ. و [[.toFixed(3)]] = ٣ أرقام بعد العلامة.

---

## ٤. السطر الأخير

[[typeof Bun !== "undefined"]]: [[Bun]] object global موجود في Bun بس. لو موجود يبقى المحرك JavaScriptCore. و [[process.versions.node]]: نسخة Node اللي الـ runtime **بيدّعي** إنه متوافق معاها.

---

## النتيجة

~~~text node compat.mjs
createHook init calls: 4
used heap MB: 5
ELU: 0.120
engine: V8 | node compat: 24.22.1
~~~

~~~text bun compat.mjs
createHook init calls: 0
used heap MB: 0
ELU: 0.000
engine: JavaScriptCore | node compat: 26.3.0
~~~

~~~text deno run compat.mjs
createHook init calls: 1
used heap MB: 4
ELU: 0.000
engine: V8 | node compat: 26.5.1
~~~

| السؤال | Node | Bun | Deno |
|---|---|---|---|
| [[createHook]] اتنادى | 4 | **0** | 1 |
| الـ heap | 5MB | **0** (رقم متقلّد) | 4MB |
| ELU | 0.120 | **0.000** | **0.000** |
| بيقول إنه Node | 24.22.1 | 26.3.0 | 26.5.1 |

مفيش ولا سطر وقع بـ error. ده بالظبط الخطر: الكود «شغال» والأرقام غلط.

---

## واللي بيشتغل فعلًا

جرّبت في Bun 1.4.4 (على ويندوز ولينكس): [[node:sqlite]]، و [[node:test]]، و [[worker_threads]] بـ [[resourceLimits]]، و [[AsyncLocalStorage]] (رجّع القيمة الصح)، و [[vm.runInNewContext]] و timeout بتاعه، و [[fs.watch]]، و [[http2]]، و [[cluster]]. وكمان [[better-sqlite3]] (native addon) اتسطّب واشتغل جوه [[oven/bun:slim]] ورجّع [[{ v: "3.53.4" }]]. ونفس سيرفر Hono بتاع [[@hono/node-server]] اشتغل بـ [[bun src/node.ts]] من غير تعديل.

## الخلاصة

- أغلب كود Node بيشتغل في Bun.
- اللي متقلّد: [[async_hooks.createHook]] و [[node:v8]] و ELU. أدوات المراقبة والـ profiling أول حاجة تتأكد منها.
- اعرف انت فين بـ [[process.versions.bun]] أو [[typeof Bun]]، مش بـ [[process.versions.node]].`,
          lines: [
            R`[[async_hooks]]: hooks على العمليات الـ async.`,
            R`[[v8]]: إحصائيات المحرك.`,
            R`[[performance]] من [[perf_hooks]].`,
            R`عدّاد.`,
            R`hook بيزوّد العدّاد مع كل عملية async جديدة، وشغّله.`,
            R`اعمل Promise و timer واستنى ٥ms.`,
            R`كام مرة اتنادى؟ (Node: 4، Bun: 0).`,
            R`أرقام الـ heap.`,
            R`الـ heap المستخدم بالميجا (Bun: 0، رقم متقلّد).`,
            R`نسبة انشغال الـ event loop (Bun و Deno: 0.000).`,
            R`أنهي محرك، وأنهي نسخة Node بيدّعيها.`
          ],
          sol: R`الناتج الحقيقي:
Node 24.22: [[createHook init calls: 4]] و [[used heap MB: 5]] و [[ELU: 0.120]] و [[engine: V8 | node compat: 24.22.1]].
Bun 1.4.4: [[createHook init calls: 0]] و [[used heap MB: 0]] و [[ELU: 0.000]] و [[engine: JavaScriptCore | node compat: 26.3.0]].
Deno 2.9.8: [[1]] و [[4]] و [[0.000]] و [[engine: V8 | node compat: 26.5.1]].

ولما تجرّب مشروعك: [[bun run test]] بيشغّل سكربت [[test]] بتاعك (Vitest مثلًا) زي ما هو، و [[bun test]] بيشغّل الـ runner بتاع Bun نفسه، ودول حاجتين مختلفتين. سجّل أي حاجة اتصرفت مختلف قبل ما تقرر.`
        }
      ]
    }
]);
