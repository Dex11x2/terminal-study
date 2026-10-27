// ملف إضافي لتاب quality: الحقول نفس شكلها في 01.js.

MORE("quality", [
    {
      t: "Biome و knip: format و lint بأداة واحدة، والكود الميت",
      l: 2,
      n: "Biome بيعمل شغل prettier و eslint في أداة واحدة سريعة، وبيتنقل له بأمر، بس ليه حدود. و knip بيلاقي الملفات والـ exports والمكتبات اللي محدش بيستخدمها",
      items: [
        {
          cmd: "biome",
          title: "Biome: format و lint و ترتيب الـ imports بأمر واحد",
          desc: R`[[biome check]] بيعمل ٣ حاجات مرة واحدة: format (زي prettier)، و lint (زي eslint)، وترتيب الـ imports. و [[--write]] بيصلّح اللي ينفع يتصلّح بأمان، و [[--unsafe]] بيصلّح كمان الحاجات اللي ممكن تغيّر المعنى.

برنامج واحد مكتوب بـ Rust، من غير plugins ولا config عشان يبدأ. اتجرّب بـ Biome 2.6.3 على ويندوز.`,
          example: R`npm i -D -E @biomejs/biome
npx biome init
npx biome check src
npx biome check --write src
npx biome check --write --unsafe src
npx biome format --write src
npx biome lint src`,
          try: R`اعمل [[src/order.ts]] فيه: import مش مستخدم، و [[==]]، و [[any]]، و [[var]] جوه [[for]]، ودالة async بتتنادى من غير [[await]]، ومسافات وحشة. شغّل [[biome check]]، وبعدين [[--write]]، وبعدين [[--write --unsafe]]. إيه اللي اتصلّح في كل مرة، وإيه اللي فضل؟`,
          deep: {
            why: R`في مشروع عادي عندك prettier و eslint و eslint-config-prettier و typescript-eslint و plugins، وكل واحد بنسخة وملف config، وبيختلفوا مع بعض. Biome أداة واحدة بملف واحد، وأسرع بكتير لأنها native ومش بتحمّل plugins بـ JavaScript.`,
            how: R`Biome بيقرا كل ملف مرة واحدة ويعمل منه شجرة (syntax tree)، ومنها الـ formatter (شكله متوافق مع prettier تقريبًا) والـ linter (مئات القواعد، كتير منها منقول من eslint و typescript-eslint و unicorn و jsx-a11y بأسامي جديدة زي [[noDoubleEquals]]). وبيفهم JS و TS و JSX و JSON و CSS و GraphQL.

كل قاعدة ليها مجموعة: [[correctness]] (غلط أكيد)، و [[suspicious]] (غالبًا غلط)، و [[style]]، و [[complexity]]، و [[performance]]، و [[a11y]]، و [[security]]، و [[nursery]] (جديدة لسه مش stable). والتصليح نوعين: **safe** (مبيغيّرش المعنى، [[--write]] بيعمله) و **unsafe** (ممكن يغيّر، محتاج [[--unsafe]]): [[==]] لـ [[===]] unsafe لأن [["1" == 1]] كانت true.

[[-E]] في npm = exact: النسخة من غير [[^]]. Biome بينصح بكده لأن نسخة جديدة ممكن تضيف قواعد أو تغيّر الشكل.`,
            when: R`مشروع جديد: Biome من الأول. مشروع قديم بـ eslint و prettier: لو مش معتمد على plugins مش موجودة في Biome (درس [[Biome ولا ESLint]])، انقل بـ [[biome migrate]].`,
            mistakes: R`تشغّل [[--write --unsafe]] على المشروع كله وتعمل commit من غير ما تبص على الـ diff: [[==]] لـ [[===]] ممكن يغيّر سلوك. وتفتكر إن [[--write]] صلّح كله: [[any]] و [[var]] جوه loop محتاجين إيدك. وتشغّل Biome و prettier مع بعض: هيتخانقوا على الشكل.`
          },
          teach: R`## الملف اللي هنفحصه

اتجرّب على ويندوز 11 بـ Biome 2.6.3 و Node 24.22.

~~~text src/order.ts
import { z } from "zod"
import { readFile } from "node:fs/promises"

export async function saveOrder(id: number) {
    let total = 0
    if (id == 0) { return null }
    const raw = await readFile($__btorders/$__{id}.json$__bt, "utf8")
    const order: any = JSON.parse(raw)
    for (var i = 0; i < order.items.length; i++) { total += order.items[i].price }
    return {...order, total: total}
}

export function checkout(id: number) {
  saveOrder(id)
  return "ok"
}
~~~

---

## ١. [[npm i -D -E @biomejs/biome]]

- [[-D]]: devDependency (أداة تطوير مش جزء من التطبيق).
- [[-E]]: النسخة بالظبط: [["@biomejs/biome": "2.6.3"]] من غير [[^]]، عشان كل الفريق يطلعله نفس النتيجة.

---

## ٢. [[npx biome init]]

بيعمل [[biome.json]]:

~~~text biome.json
{
  "$schema": "https://biomejs.dev/schemas/2.6.3/schema.json",
  "vcs": { "enabled": false, "clientKind": "git", "useIgnoreFile": false },
  "files": { "ignoreUnknown": false },
  "formatter": { "enabled": true, "indentStyle": "tab" },
  "linter": { "enabled": true, "rules": { "preset": "recommended" } },
  "javascript": { "formatter": { "quoteStyle": "double" } },
  "assist": { "enabled": true, "actions": { "source": { "organizeImports": "on" } } }
}
~~~

(بيكتبه على أكتر من سطر، لمّيته هنا.) لاحظ [["indentStyle": "tab"]]: الافتراضي tabs مش مسافات (عكس prettier). و [["preset": "recommended"]] = القواعد الموصى بيها. و [[assist → organizeImports]] = رتّب الـ imports. معنى كل خانة في درس [[biome.json]].

---

## ٣. [[npx biome check src]]

~~~text الناتج (مختصر)
src\order.ts:8:18 lint/suspicious/noExplicitAny ━━━━━━━━
  ! Unexpected any. Specify a different type.

src\order.ts:1:8 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━
  ! This import is unused.
  i Unsafe fix: Remove the unused imports.

src\order.ts:1:1 assist/source/organizeImports  FIXABLE  ━━━━━━━━
  × Sort these imports.
  i Safe fix: Organize imports and exports (Biome)

src\order.ts:6:12 lint/suspicious/noDoubleEquals  FIXABLE  ━━━━━━━━
  × Using == may be unsafe if you are relying on type coercion.
  i Unsafe fix: Use === instead.

src\order.ts:9:10 lint/correctness/noInnerDeclarations ━━━━━━━━
  × This var should be declared at the root of the enclosing function.

src\order.ts format ━━━━━━━━
  × Formatter would have printed the following content:

Checked 1 file in 10ms. No fixes applied.
Found 4 errors.
Found 2 warnings.
~~~

نقرا أول سطر: [[src\order.ts:8:18]] الملف والسطر والعمود، و [[lint/suspicious/noExplicitAny]] = نوع الفحص / المجموعة / القاعدة.

| العلامة | معناها |
|---|---|
| [[×]] | error: بيوقّع الأمر (exit code 1) |
| [[!]] | warning |
| [[FIXABLE]] | ليها تصليح أوتوماتيك |
| [[Safe fix]] / [[Unsafe fix]] | هل التصليح ممكن يغيّر المعنى |

والـ [[format]] بيوريك diff بالشكل اللي كان هيكتبه. والملاحظة المهمة: **[[saveOrder(id)]] من غير await محدش مسكه** (القاعدة دي مش في الـ recommended، درس [[biome.json]]).

---

## ٤. [[npx biome check --write src]]

صلّح الآمن بس: الشكل (tabs و [[;]] وكسر السطور الطويلة)، وترتيب الـ imports ([[node:fs/promises]] قبل [[zod]]):

~~~text src/order.ts بعد --write (أوله)
import { readFile } from "node:fs/promises";
import { z } from "zod";

export async function saveOrder(id: number) {
	let total = 0;
	if (id == 0) {
		return null;
	}
~~~

[[z]] لسه موجود و [[==]] لسه موجودة: تصليحهم unsafe.

---

## ٥. [[npx biome check --write --unsafe src]]

~~~text الناتج
src\order.ts:9:15 lint/suspicious/noExplicitAny ━━━━━━━━
src\order.ts:10:7 lint/correctness/noInnerDeclarations ━━━━━━━━
Checked 1 file in 8ms. Fixed 1 file.
Found 1 error.
Found 1 warning.
~~~

اتشال [[import { z }]] واتغيرت [[==]] لـ [[===]]. وفضل اتنين مالهمش تصليح أوتوماتيك: [[any]] (لازم تكتب النوع) و [[var]] جوه الـ [[for]] (لازم تغيّرها [[let]]، أو تفعّل [[noVar]]).

---

## ٦. [[biome format --write]] و [[biome lint]]

لو عايز واحد بس:

~~~text npx biome format --write src
Formatted 1 file in 4ms. Fixed 1 file.
~~~

~~~text npx biome lint src
src\order.ts:10:15 lint/suspicious/noExplicitAny
src\order.ts:2:8 lint/correctness/noUnusedImports  FIXABLE
src\order.ts:6:9 lint/suspicious/noDoubleEquals  FIXABLE
src\order.ts:11:7 lint/correctness/noInnerDeclarations
Found 2 errors.
Found 2 warnings.
~~~

[[format]] مبيلمسش القواعد، و [[lint]] مبيلمسش الشكل. و [[check]] = الاتنين + ترتيب الـ imports.

---

## الخلاصة

| prettier / eslint | Biome |
|---|---|
| [[prettier --write .]] | [[biome format --write .]] |
| [[eslint .]] | [[biome lint .]] |
| [[eslint --fix .]] | [[biome lint --write .]] |
| الاتنين | [[biome check --write .]] |
| [[.prettierrc]] + [[eslint.config.mjs]] | [[biome.json]] |

- [[--write]] = التصليح الآمن بس. [[--unsafe]] = كمان اللي ممكن يغيّر المعنى، فبص على الـ diff.
- الـ recommended مش بيمسك Promise من غير await.`,
          lines: [
            R`سطّب Biome كـ devDependency بنسخة ثابتة.`,
            R`اعمل [[biome.json]] بالإعدادات الافتراضية.`,
            R`format + lint + ترتيب imports، من غير تعديل.`,
            R`صلّح اللي تصليحه آمن.`,
            R`صلّح كمان اللي ممكن يغيّر المعنى (بص على الـ diff).`,
            R`الشكل بس.`,
            R`القواعد بس.`
          ],
          sol: R`بالترتيب، على Biome 2.6.3:
• [[check]]: [[Found 4 errors. Found 2 warnings.]]: noExplicitAny و noUnusedImports و organizeImports و noDoubleEquals و noInnerDeclarations والـ format.
• [[--write]]: الشكل والـ imports اتظبطوا، وفضل [[z]] و [[==]] و [[any]] و [[var]].
• [[--write --unsafe]]: اتشال [[z]] و [[==]] بقت [[===]]. فضل [[any]] و [[var]] (محتاجين إيدك).
• [[saveOrder(id)]] من غير await: ولا مرة اتمسك بالإعدادات الافتراضية. محتاج [[nursery/noFloatingPromises]] (درس [[biome.json]]).`
        },
        {
          cmd: "biome.json",
          title: "ظبط biome.json: الشكل والقواعد والملفات اللي تتجاهل و overrides",
          desc: R`[[biome.json]] ملف واحد بدل [[.prettierrc]] و [[eslint.config.mjs]] و [[.prettierignore]]: فيه [[formatter]] (الشكل)، و [[linter.rules]] (تشغّل أو تقفل قاعدة أو تغيّر مستواها)، و [[files.includes]] (الملفات)، و [[vcs]] (يقرا [[.gitignore]])، و [[overrides]] (إعدادات مختلفة لملفات معينة زي الاختبارات).

المثال بيفعّل [[noFloatingPromises]] من [[nursery]]: أهم قاعدة مش موجودة في الـ recommended.`,
          example: R`{
  "$schema": "https://biomejs.dev/schemas/2.6.3/schema.json",
  "vcs": { "enabled": true, "clientKind": "git", "useIgnoreFile": true },
  "files": { "includes": ["**", "!**/*.generated.ts"] },
  "formatter": { "indentStyle": "space", "indentWidth": 2, "lineWidth": 100 },
  "javascript": { "formatter": { "quoteStyle": "double", "semicolons": "always" } },
  "linter": {
    "rules": {
      "preset": "recommended",
      "suspicious": { "noExplicitAny": "error", "noVar": "error" },
      "nursery": { "noFloatingPromises": "error" }
    }
  },
  "overrides": [
    {
      "includes": ["**/*.test.ts"],
      "linter": { "rules": { "suspicious": { "noExplicitAny": "off" } } }
    }
  ]
}`,
          try: R`حط المثال في [[biome.json]] على ملف درس [[biome]]، وضيف [[src/order.test.ts]] فيه [[const x: any = 1; export { x };]]، و [[src/api.generated.ts]] بشكل وحش، و [[dist/bundle.js]] مع [[dist]] في [[.gitignore]]. شغّل [[npx biome check src]]: مين اتفحص ومين لأ؟ وبعدين جرّب تكتب [["style": { "noVar": "error" }]] وشوف الرسالة.`,
          flag: "script",
          deep: {
            why: R`الإعدادات الافتراضية كويسة كبداية، بس كل فريق محتاج: مسافات بدل tabs (لو الفريق متعود)، وقواعد أشد في حاجات معينة ([[any]] error مش warning)، وملفات تتساب في حالها (generated و dist)، واستثناءات للاختبارات.`,
            how: R`[[$schema]]: بيخلي VS Code يكمّل الأسامي ويطلّع خطأ لو كتبت مفتاح مش موجود.

[[vcs.useIgnoreFile: true]]: أي حاجة في [[.gitignore]] Biome بيتجاهلها ([[dist]] و [[node_modules]]). [[files.includes]]: قايمة globs، و [[!]] في الأول = استثني.

القواعد: كل قاعدة تحت مجموعتها بالظبط ([[suspicious.noVar]] مش [[style.noVar]])، والقيمة [["error"]] أو [["warn"]] أو [["info"]] أو [["off"]]، أو object فيه [[level]] و [[options]]. لو المجموعة غلط Biome بيرفض يشتغل: [[Found an unknown key noVar]]. و [[biome explain <rule>]] بيقولك مجموعتها.

[[nursery]]: قواعد جديدة لسه ممكن تتغير. [[noFloatingPromises]] و [[noMisusedPromises]] فيها، وبيستخدموا الـ type inference بتاع Biome نفسه (مش TypeScript compiler). [[overrides]]: كل عنصر فيه [[includes]] وإعدادات بتتطبق فوق الأساسية للملفات دي بس.`,
            when: R`أول ما تعمل [[biome init]] في مشروع حقيقي: اظبط الشكل على اللي الفريق متعود عليه، وفعّل [[noFloatingPromises]]، واستثني المولّد والـ build.`,
            mistakes: R`تحط القاعدة في مجموعة غلط فـ Biome يقف خالص. وتنسى [[useIgnoreFile]] فيفحص [[dist]]. وتعمل [["off"]] لقاعدة على المشروع كله عشان ملف واحد: استخدم [[overrides]] أو [[// biome-ignore lint/...: السبب]] على السطر. وتنسى إن nursery ممكن تتغير في أي نسخة، فثبّت النسخة بـ [[-E]].`
          },
          teach: R`## الإعدادات خانة خانة

اتجرّب بـ Biome 2.6.3 على ويندوز، في نفس مشروع درس [[biome]]، ومعاه [[git init]] و [[.gitignore]] فيه [[node_modules]] و [[dist]].

---

## ١. [[$schema]]

رابط لوصف كل المفاتيح المسموحة. الـ editor بيستخدمه للـ autocomplete، و Biome نفسه بيرفض أي مفتاح مش فيه. النسخة في الرابط ([[2.6.3]]) لازم تبقى نسخة Biome اللي عندك.

---

## ٢. [[vcs]] و [[files]]

~~~text biome.json
"vcs": { "enabled": true, "clientKind": "git", "useIgnoreFile": true },
"files": { "includes": ["**", "!**/*.generated.ts"] },
~~~

- [[vcs.enabled]] + [[clientKind: "git"]]: Biome فاهم إن المشروع git (ده كمان بيخلّي [[--changed]] يشتغل، درس [[biome ci]]).
- [[useIgnoreFile: true]]: اقرا [[.gitignore]]. فـ [[dist/bundle.js]] اتساب.
- [[includes]]: [[**]] = كل الملفات في كل الفولدرات، و [[!**/*.generated.ts]] = إلا اللي آخر اسمها [[.generated.ts]]. فـ [[src/api.generated.ts]] (اللي فيه [[let   y = 1]]) فضل زي ما هو.

---

## ٣. [[formatter]] و [[javascript.formatter]]

~~~text biome.json
"formatter": { "indentStyle": "space", "indentWidth": 2, "lineWidth": 100 },
"javascript": { "formatter": { "quoteStyle": "double", "semicolons": "always" } },
~~~

| الخانة | معناها | المقابل في prettier |
|---|---|---|
| [[indentStyle: "space"]] | مسافات مش tabs | [[useTabs: false]] |
| [[indentWidth: 2]] | مسافتين | [[tabWidth: 2]] |
| [[lineWidth: 100]] | أقصى طول سطر | [[printWidth: 100]] |
| [[quoteStyle: "double"]] | [[""]] | [[singleQuote: false]] |
| [[semicolons: "always"]] | [[;]] دايمًا (أو [["asNeeded"]]) | [[semi: true]] |

الأولى عامة لكل اللغات، و [[javascript.formatter]] لـ JS و TS بس.

---

## ٤. [[linter.rules]]

~~~text biome.json
"rules": {
  "preset": "recommended",
  "suspicious": { "noExplicitAny": "error", "noVar": "error" },
  "nursery": { "noFloatingPromises": "error" }
}
~~~

- [[preset: "recommended"]]: ابدأ من القايمة الموصى بيها.
- [[noExplicitAny: "error"]]: في الـ recommended هي warning ([[!]]). بقت error ([[×]]).
- [[noVar: "error"]]: مش في الـ recommended أصلًا، شغّلناها.
- [[nursery.noFloatingPromises]]: Promise محدش عمله [[await]] ولا [[.catch]].

### المجموعة لازم تبقى صح

أول مرة كتبت [[noVar]] تحت [["style"]]:

~~~text الناتج
  × Found an unknown key $__btnoVar$__bt.
  × Biome exited because the configuration resulted in errors. Please fix them.
~~~

Biome ماشتغلش خالص. وعشان تعرف المجموعة:

~~~text npx biome explain noVar
- Name: noVar
- Fix: unsafe
- Default severity: warn
- Diagnostic category: lint/suspicious/noVar
~~~

---

## ٥. [[overrides]]

~~~text biome.json
"overrides": [
  {
    "includes": ["**/*.test.ts"],
    "linter": { "rules": { "suspicious": { "noExplicitAny": "off" } } }
  }
]
~~~

في ملفات الاختبار [[any]] مسموح (mocks كتير بتحتاجه). [[src/order.test.ts]] فيه [[const x: any]] ومطلعش عليه [[noExplicitAny]].

---

## النتيجة كلها

~~~text npx biome check src
src\order.ts:2:8 lint/correctness/noUnusedImports  FIXABLE
src\order.test.ts:2:1 assist/source/organizeImports  FIXABLE
src\order.ts:6:10 lint/suspicious/noDoubleEquals  FIXABLE
src\order.ts:10:16 lint/suspicious/noExplicitAny
src\order.ts:11:8 lint/correctness/noInnerDeclarations
src\order.ts:11:8 lint/suspicious/noVar  FIXABLE
src\order.ts:18:3 lint/nursery/noFloatingPromises
Checked 2 files in 8ms. No fixes applied.
Found 6 errors.
Found 1 warning.
~~~

- [[Checked 2 files]]: [[order.ts]] و [[order.test.ts]]. الـ generated اتستثنى.
- [[18:3 noFloatingPromises]]: [[saveOrder(id);]] أخيرًا اتمسك:

~~~text الناتج
  × A "floating" Promise was found, meaning it is not properly handled and could lead to ignored errors or unexpected behavior.
  > 18 │   saveOrder(id);
  i This happens when a Promise is not awaited, lacks a $__bt.catch$__bt or $__bt.then$__bt rejection handler, or is not explicitly ignored using the $__btvoid$__bt operator.
  i This rule belongs to the nursery group, which means it is not yet stable and may change in the future.
~~~

---

## الخلاصة

| الخانة | بتعمل إيه |
|---|---|
| [[vcs.useIgnoreFile]] | تجاهل اللي في [[.gitignore]] |
| [[files.includes]] + [[!]] | الملفات، والاستثناءات |
| [[formatter]] | الشكل (زي [[.prettierrc]]) |
| [[linter.rules.<group>.<rule>]] | [["error"]] / [["warn"]] / [["off"]] |
| [[nursery]] | قواعد جديدة، منها [[noFloatingPromises]] |
| [[overrides]] | إعدادات لملفات معينة |`,
          lines: [
            R`بداية الملف.`,
            R`وصف المفاتيح للـ editor، بنفس نسخة Biome.`,
            R`المشروع git، واقرا [[.gitignore]].`,
            R`كل الملفات إلا [[*.generated.ts]].`,
            R`مسافتين، والسطر لحد 100 حرف.`,
            R`[[""]] و [[;]] دايمًا في JS و TS.`,
            R`إعدادات الـ linter.`,
            R`القواعد.`,
            R`ابدأ من الموصى بيه.`,
            R`[[any]] و [[var]] بقوا error.`,
            R`Promise من غير await بقى error (قاعدة nursery).`,
            R`قفلة [[rules]].`,
            R`قفلة [[linter]].`,
            R`إعدادات لملفات معينة.`,
            R`أول override.`,
            R`ملفات الاختبار.`,
            R`فيها [[any]] مسموح.`,
            R`قفلة.`,
            R`قفلة [[overrides]].`,
            R`قفلة الملف.`
          ],
          sol: R`[[npx biome check src]] فحص ملفين بس ([[order.ts]] و [[order.test.ts]]): [[api.generated.ts]] اتستثنى بـ [[files.includes]]، و [[dist/bundle.js]] اتساب بسبب [[.gitignore]]. و [[order.test.ts]] مطلعش عليه [[noExplicitAny]] (الـ override). والنتيجة [[Found 6 errors. Found 1 warning.]] ومنهم [[lint/nursery/noFloatingPromises]] على [[saveOrder(id)]].

و [["style": { "noVar": "error" }]] طلّعت [[Found an unknown key noVar]] و Biome وقف: [[noVar]] في [[suspicious]].`
        },
        {
          cmd: "biome migrate",
          title: "تنقل من ESLint و Prettier لـ Biome بأمر",
          desc: R`[[biome migrate eslint --write]] بيقرا [[eslint.config.mjs]] (وكل الـ configs اللي جواه)، ويحوّل القواعد اللي ليها مقابل لـ [[biome.json]]، ويطبع تقرير: كام قاعدة اتنقلت، وكام بقت ملهاش لازمة بسبب الـ formatter، وكام مش موجودة في Biome. و [[biome migrate prettier --write]] بينقل [[.prettierrc]] و [[.prettierignore]].

بعدها: شيل eslint و prettier، وغيّر السكربتات، واعمل format مرة واحدة في commit لوحده.`,
          example: R`npx biome init
npx biome migrate eslint --write
npx biome migrate prettier --write
npx biome migrate eslint --write --include-inspired
npm uninstall eslint prettier eslint-config-prettier typescript-eslint @eslint/js
npm pkg set scripts.lint="biome check ." scripts.format="biome check --write ."
npm run format`,
          try: R`في مشروع تجربة: سطّب [[eslint@9]] و [[@eslint/js@9]] و [[typescript-eslint]] و [[prettier]] و [[eslint-config-prettier]]، واعمل [[eslint.config.mjs]] فيه [[eqeqeq]] و [[no-console]] بـ [[allow: ["error"]]]، و [[.prettierrc]] فيه [[semi: false]] و [[singleQuote: true]]. اعمل migrate، وافتح [[biome.json]] ولاقي القاعدتين، وبعدين شغّل [[biome format]] على ملف: التنصيص بقى إيه؟`,
          deep: {
            why: R`نقل الإعدادات بإيدك معناه تعدّي على مئات القواعد وتدوّر على اسم كل واحدة في Biome. الأمر بيعمل ده في ثانية، والأهم إنه بيقولك **إيه اللي هتخسره** قبل ما تشيل eslint.`,
            how: R`[[migrate eslint]] بيشغّل الـ config بتاعك بـ Node (فلازم eslint والـ plugins يكونوا متسطّبين وقتها)، فيفهم الـ flat config والـ [[extends]] كلها، ويطلع منه القواعد النهائية. كل قاعدة إما: اتنقلت لقاعدة Biome بنفس السلوك، أو «inspired» (Biome فيه قاعدة شبهها مش نفسها بالظبط، بتتنقل بس مع [[--include-inspired]])، أو nursery، أو ملهاش لازمة لأن الـ formatter بيعمل شغلها، أو مش موجودة.

[[migrate prettier]] بيحوّل [[semi]] و [[singleQuote]] و [[printWidth]] و [[trailingComma]] لمقابلها في [[formatter]] و [[javascript.formatter]]، و [[.prettierignore]] لـ [[includes]] فيها [[!]].`,
            when: R`لما تقرر تنقل مشروع، والـ CI أخضر قبلها. اعملها في branch، وفي commits منفصلة: config، وبعدين format للمشروع كله، وبعدين تصليح القواعد.`,
            mistakes: R`تشيل eslint قبل [[migrate eslint]]: الأمر محتاجه متسطّب عشان يقرا الـ config. وتتجاهل قسم «not yet implemented» في التقرير، وفيه قاعدة كانت بتمسك bug حقيقي عندك. وتنسى السكربتات في [[package.json]] و CI و lint-staged لسه بتنادي [[eslint]] و [[prettier]]. وتعمل format للمشروع كله في نفس الـ commit مع تعديلات تانية.`
          },
          teach: R`## المشروع قبل النقل

اتجرّب على ويندوز بـ Biome 2.6.3، ومعاه [[eslint@9]] و [[@eslint/js@9]] و [[typescript-eslint]] و [[typescript@6]] و [[prettier]] و [[eslint-config-prettier]].

~~~text eslint.config.mjs
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier/flat";

export default tseslint.config(
  { ignores: ["dist/**", "coverage/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      eqeqeq: "error",
      "no-console": ["warn", { allow: ["error"] }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  prettier,
);
~~~

~~~text .prettierrc
{ "semi": false, "singleQuote": true, "printWidth": 100, "trailingComma": "all" }
~~~

> أول مرة [[npm i]] وقع بـ [[ERESOLVE]]: [[@eslint/js@10]] عايز [[eslint@10]]. لازم الاتنين نفس الـ major: [[@eslint/js@9]] مع [[eslint@9]].

---

## ١. [[npx biome init]]

[[biome.json]] افتراضي، والـ migrate بيكتب فوقه.

---

## ٢. [[npx biome migrate eslint --write]]

~~~text الناتج (أوله)
i 447 ESLint rules found
  - 165 are obsolete because of Biome's formatter
  - 78 have been migrated to Biome's rules
  - 56% (253) of your ESLint rules are fully covered by Biome
    - 17% (78) via direct migration to Biome rules
~~~

٤٤٧ قاعدة؟ الـ config صغير بس [[eslint-config-prettier]] لوحده بيقفل ~١٦٠ قاعدة شكل (ومنها قواعد plugins زي vue و react و @stylistic)، و [[js.configs.recommended]] و [[tseslint]] فيهم عشرات. الأرقام:

| الرقم | معناه |
|---|---|
| 165 obsolete | قواعد شكل، الـ formatter بيعمل شغلها |
| 78 migrated | اتنقلت لقاعدة Biome بنفس السلوك |
| 253 = 56% | المتغطي فعلًا (165 + 78 + 10 بتوع خيارات الـ formatter) |

وبعدها التقرير بيعدّ القواعد: [[Migrated rules]] (منها [[eqeqeq]] و [[no-console]] و [[@typescript-eslint/no-explicit-any]])، و [[can be migrated to an inspired rule using --include-inspired]] (منها [[no-cond-assign]] و [[@typescript-eslint/ban-ts-comment]])، و [[have not yet been implemented]] (منها [[no-unexpected-multiline]]).

وفي [[biome.json]]:

~~~text biome.json (جزء)
"preset": "none",
"suspicious": {
  "noConsole": { "level": "warn", "options": { "allow": ["error"] } },
  "noDoubleEquals": { "level": "error", "options": { "ignoreNull": false } },
  "noExplicitAny": "error",
  ...
},
"includes": ["**", "!dist/**", "!coverage/**"]
~~~

- [[preset: "none"]]: مش بيبدأ من recommended. بيكتب **نفس** القواعد اللي كانت عندك بالظبط.
- [[eqeqeq]] بقت [[noDoubleEquals]]، و [[no-console]] بـ [[allow]] بتاعها بقت [[noConsole]] بنفس الخيار.
- [[ignores]] بتاع eslint بقى [[!dist/**]].
- وعمل [[overrides]] لملفات [[*.ts]] بيقفل قواعد TypeScript بيعملها أصلًا (زي ما [[tseslint]] بيعمل).

---

## ٣. [[npx biome migrate prettier --write]]

~~~text الناتج
.prettierignore has been successfully migrated.
.prettierrc has been successfully migrated.
~~~

~~~text biome.json → javascript.formatter
"trailingCommas": "all",
"semicolons": "asNeeded",
"quoteStyle": "single",
~~~

| [[.prettierrc]] | [[biome.json]] |
|---|---|
| [["semi": false]] | [["semicolons": "asNeeded"]] |
| [["singleQuote": true]] | [["quoteStyle": "single"]] |
| [["printWidth": 100]] | [["lineWidth": 100]] |
| [["trailingComma": "all"]] | [["trailingCommas": "all"]] |

---

## ٤. [[--include-inspired]]

~~~text الناتج
- 87 have been migrated to Biome's rules
  - 19% (87) via direct migration to Biome rules
~~~

٩ قواعد زيادة (78 ← 87) دخلت، زي [[noAssignInExpressions]] (مقابل [[no-cond-assign]]) و [[noBannedTypes]] و [[noUselessThisAlias]]. «inspired» = نفس الفكرة بس السلوك مش متطابق 100%، فراجعهم.

---

## ٥. [[npm uninstall ...]] و [[npm pkg set ...]]

بعد الـ migrate بس (قبلها الأمر محتاج eslint). وامسح [[eslint.config.mjs]] و [[.prettierrc]] و [[.prettierignore]]. وبعدين السكربتات:

~~~text package.json
"scripts": {
  "lint": "biome check .",
  "format": "biome check --write ."
},
"devDependencies": { "@biomejs/biome": "2.6.3", "typescript": "6.0.3" }
~~~

[[npm pkg set scripts.lint="..."]] بيكتب في [[package.json]] من غير ما تفتحه. سبت نفس الأسامي ([[lint]] و [[format]]) عشان الفريق والـ CI.

---

## ٦. [[npm run format]]

على ملف فيه [[console.log("x")]] و [[==]]:

~~~text الناتج
export function f(a: any) {
  if (a == 1) console.log('x')
}
~~~

[['x']] بعلامة واحدة ومفيش [[;]]: نفس شكل الـ [[.prettierrc]] القديم. و [[check]] لسه بيطلّع [[noConsole]] (warning) و [[noExplicitAny]] و [[noDoubleEquals]]: نفس القواعد اللي كانت في eslint.

---

## الخلاصة: الترتيب

1. [[biome init]]، وبعدين [[migrate eslint --write]] و [[migrate prettier --write]] (وeslint لسه متسطّب).
2. اقرا التقرير: «not yet implemented» = اللي هتخسره.
3. [[npm uninstall]] للقديم، وامسح ملفاته.
4. السكربتات و CI و lint-staged.
5. [[biome check --write .]] في commit لوحده.`,
          lines: [
            R`[[biome.json]] افتراضي (الـ migrate بيكتب فوقه).`,
            R`انقل قواعد eslint (لازم eslint يكون لسه متسطّب).`,
            R`انقل [[.prettierrc]] و [[.prettierignore]].`,
            R`انقل كمان القواعد اللي ليها مقابل «شبهها» (راجعها).`,
            R`شيل الأدوات القديمة.`,
            R`السكربتات بنفس الأسامي بس بـ Biome.`,
            R`format و lint للمشروع كله (commit لوحده).`
          ],
          sol: R`في [[biome.json]] بعد الـ migrate:
[["noDoubleEquals": { "level": "error", ... }]] (من [[eqeqeq]])، و [["noConsole": { "level": "warn", "options": { "allow": ["error"] } }]] (من [[no-console]]).
وفي [[javascript.formatter]]: [["quoteStyle": "single"]] و [["semicolons": "asNeeded"]].

و [[biome format]] على [[console.log("x")]] بيكتبه [[console.log('x')]] من غير [[;]]: نفس شكل prettier القديم. والتقرير قال [[447 ESLint rules found]] و [[78 have been migrated]] (و 87 مع [[--include-inspired]]).`
        },
        {
          cmd: "biome ci",
          title: "Biome في CI: biome ci و reporter و --changed",
          desc: R`[[biome ci]] زي [[biome check]] بس مخصوص لـ CI: مبيعدّلش أي ملف (و [[--write]] مش مسموح أصلًا)، وبيخرج بـ exit code 1 لو فيه أي error. و [[--reporter=github]] بيطبع الأخطاء بشكل GitHub Actions بيفهمه فتظهر تحت السطر في الـ PR. و [[--changed --since=main]] بيفحص الملفات اللي اتغيرت عن main بس.`,
          example: R`npx biome ci .
npx biome ci --reporter=github .
npx biome ci --changed --since=main .`,
          try: R`في مشروع درس [[biome.json]] (git، و commit على [[main]]): شغّل [[biome ci .]] وشوف الـ exit code. وبعدين [[--reporter=github]]. واعمل branch، وضيف ملف واحد شكله وحش، و commit، وشغّل [[--changed --since=main]]: كام ملف اتفحص؟ وجرّب [[biome ci --write .]].`,
          deep: {
            why: R`الـ CI لازم يفحص بس، ميعدّلش: لو عدّل على ماكينة CI وعدّى، الكود في الـ repo يفضل وحش. و [[biome ci]] بيضمن ده. والـ reporter بتاع GitHub بيوفّر وقت المراجعة، و [[--changed]] بيسرّع الفحص في مشروع كبير.`,
            how: R`[[biome ci]] = [[check]] من غير أي تعديل، وبيطبع ألوان دايمًا (CI logs بتعرضها). [[--reporter=github]] بيطبع كل مشكلة كسطر [[::error title=...,file=...,line=...::message]]: دي «workflow commands»، GitHub بيحوّلها annotations على الملف والسطر في الـ PR.

[[--changed]] محتاج [[vcs.enabled: true]] في [[biome.json]]، و [[--since=main]] الفرع اللي بيقارن بيه (أو [[vcs.defaultBranch]]). في GitHub Actions لازم الـ checkout يجيب الفرع ده: [[fetch-depth: 0]] أو تعمل fetch لـ main.`,
            when: R`في كل PR. و [[--changed]] لما المشروع كبير والفحص الكامل بطيء، بس اعمل فحص كامل على main (أو بالليل) عشان تغيير في [[biome.json]] نفسه يتطبق على الكل.`,
            mistakes: R`تحط [[biome check --write]] في CI. وتستخدم [[--changed]] من غير [[fetch-depth: 0]]، فـ git ميلاقيش main والفحص يقع أو يفحص كله. وتنسى إن [[--changed]] مش هيشوف ملف قديم بقى غلط بعد ما غيّرت قاعدة.`
          },
          teach: R`## نفس مشروع درس [[biome.json]]

اتجرّب على ويندوز بـ Biome 2.6.3، والمشروع فيه git، و commit أول على [[main]].

---

## ١. [[npx biome ci .]]

~~~text الناتج (مختصر)
  × File content differs from formatting output
  × Using == may be unsafe if you are relying on type coercion.
  × Unexpected any. Specify a different type.
  × This var should be declared at the root of the enclosing function.
  × Use let or const instead of var.
  × A "floating" Promise was found, ...
Checked 3 files in 10ms. No fixes applied.
Found 6 errors.
Found 1 warning.
  × Some errors were emitted while running checks.
~~~

والـ exit code [[1]]، فالـ job في CI يبقى أحمر. [[No fixes applied]]: مفيش ولا ملف اتلمس.

### [[--write]] ممنوع

~~~text npx biome ci --write .
Error: $__bt--write$__bt is not expected in this context
~~~

---

## ٢. [[--reporter=github]]

~~~text الناتج (سطرين)
::warning title=lint/correctness/noUnusedImports,file=C%3A\Users\ali\lab\biome\src\order.ts,line=2,endLine=2,col=8,endColumn=13::This import is unused.
::error title=lint/nursery/noFloatingPromises,file=C%3A\Users\ali\lab\biome\src\order.ts,line=18,endLine=18,col=3,endColumn=17::A "floating" Promise was found, ...
~~~

| الحتة | معناها |
|---|---|
| [[::error]] / [[::warning]] | نوع الـ annotation |
| [[title=lint/...]] | اسم القاعدة (بيظهر عنوان) |
| [[file=...,line=18,col=3]] | فين بالظبط |
| بعد [[::]] التانية | الرسالة |

جوه GitHub Actions الأسطر دي بتتحول لعلامة حمرا على السطر في الـ PR. ([[C%3A]] = [[C:]] بعد encoding، لأن [[:]] ليها معنى في الصيغة دي.)

---

## ٣. [[--changed --since=main]]

عملت branch اسمه [[feature]]، وضفت [[src/new.ts]] فيه [[export const a = 1]] من غير [[;]]، و commit:

~~~text الناتج
  × File content differs from formatting output
Checked 1 file in 6ms. No fixes applied.
Found 1 error.
~~~

[[Checked 1 file]]: الملف الجديد بس، مش الـ ٣. [[--since=main]] = «قارن بـ main»، والمشروع لازم فيه [["vcs": { "enabled": true }]].

---

## في GitHub Actions (من الـ docs)

~~~text .github/workflows/lint.yml
name: lint
on: pull_request
jobs:
  biome:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v7
        with:
          node-version: 24
      - run: npm ci
      - run: npx biome ci --reporter=github .
~~~

- [[fetch-depth: 0]]: هات تاريخ git كله، لازم لو هتستخدم [[--changed]].
- [[npm ci]] بيسطّب نفس نسخة Biome اللي في الـ lock (عشان [[-E]] في درس [[biome]]).

الـ YAML ده ماتشغّلش هنا على GitHub. ترتيب الفحص كله في درس [[ترتيب الفحص في CI]].

---

## الخلاصة

| الأمر | فين | بيعدّل؟ |
|---|---|---|
| [[biome check --write .]] | جهازك | آه |
| [[biome ci .]] | CI | لأ، و [[--write]] ممنوع |
| [[--reporter=github]] | GitHub Actions | annotations على السطور |
| [[--changed --since=main]] | PR كبير | بيفحص المتغير بس |`,
          lines: [
            R`افحص كله من غير تعديل، و exit 1 لو فيه error.`,
            R`نفس الكلام بصيغة GitHub annotations.`,
            R`الملفات اللي اتغيرت عن main بس.`
          ],
          sol: R`[[biome ci .]] طلّع [[Found 6 errors. Found 1 warning.]] وخرج بـ 1. [[--reporter=github]] طبع سطور [[::error title=lint/...,file=...,line=...::...]]. وعلى branch فيه ملف جديد واحد: [[--changed --since=main]] طبع [[Checked 1 file]] و [[File content differs from formatting output]].

و [[biome ci --write .]] رفض: [[Error: --write is not expected in this context]].`
        },
        {
          cmd: "Biome ولا ESLint",
          title: "اللي Biome لسه مش بيعمله (type-aware و Vue و plugins)",
          desc: R`Biome أسرع وأبسط، بس قبل ما تشيل ESLint اعرف حدوده:
• القواعد اللي محتاجة الأنواع ([[noFloatingPromises]] و [[noMisusedPromises]]) لسه في [[nursery]]، وبتستخدم استنتاج Biome نفسه مش TypeScript، فبتفوّت حاجات typescript-eslint بيمسكها.
• في [[.vue]] و [[.svelte]] بيفحص الـ [[<script>]] بس، والـ template لأ، فبيطلّع «متغير مش مستخدم» على حاجة مستخدمة في الـ template.
• مفيش plugins بتاعة ESLint (الـ ecosystem الكبير). فيه plugins بـ GritQL بس أقل بكتير.`,
          example: R`npx biome explain noFloatingPromises
npx biome lint --only=nursery/noFloatingPromises --only=nursery/noMisusedPromises x
npx eslint x
npx biome check v`,
          try: R`اعمل [[x/api.ts]] فيه [[export async function save(id: number)]]، و [[x/use.ts]] بينادي [[save(1)]] و [[readFile("x")]] (من [[node:fs/promises]]) و [[[1, 2].forEach(async (n) => { await save(n); })]] من غير await. شغّل Biome بالقاعدتين، وشغّل typescript-eslint بـ [[no-floating-promises]] و [[no-misused-promises]]. مين مسك أكتر؟ وبعدين اعمل [[App.vue]] فيه [[const count = ref(0)]] مستخدم في الـ template بس.`,
          deep: {
            why: R`أغلى bugs في Node و React هي Promise محدش مستنيه ودالة async في مكان مش مستني Promise. في ESLint دول [[@typescript-eslint/no-floating-promises]] و [[no-misused-promises]] (درس [[eslint.config.mjs]]). لو نقلت لـ Biome ومخدتش بالك، ممكن تخسر جزء من الحماية دي من غير ما تحس.`,
            how: R`typescript-eslint بيسأل الـ TypeScript compiler الحقيقي عن نوع كل expression، فبيعرف إن [[readFile]] من [[@types/node]] بترجّع Promise. Biome عنده type inference خاص بيه (أسرع ومش محتاج tsconfig)، بيفهم الدوال اللي في مشروعك كويس، بس مبيقراش كل حاجة في [[.d.ts]] بتاعة المكتبات (حتى مع [[@types/node]] متسطّب في التجربة).

ملفات Vue: Biome بيفحص الـ [[<script>]] كـ JS/TS عادي، وميعرفش إن [[count]] مستخدم في [[<template>]]. ESLint مع [[eslint-plugin-vue]] بيفهم الاتنين.

الحل العملي في مشاريع كتير: Biome للـ format ومعظم الـ lint، و ESLint صغير بجنبه بالقواعد اللي Biome مش بيعملها بس (type-aware، أو plugin معين).`,
            when: R`Biome لوحده كفاية: مشروع TS/JS/React من غير plugins خاصة، ومستعد تعتمد على nursery. خلي ESLint (لوحده أو جنب Biome): Vue أو Svelte أو Astro، أو محتاج type-aware rules كاملة، أو plugins زي [[eslint-plugin-next]] و [[eslint-plugin-jsx-a11y]] بكل قواعدها.`,
            mistakes: R`تفتكر إن «Biome ماطلّعش حاجة» = «مفيش floating promises». وتعمل [[off]] لـ [[noUnusedVariables]] على كل ملفات [[.vue]] عشان الـ false positives، فتخسرها في الـ script كمان. وتشغّل ESLint و Biome الاتنين بقواعد شكل، فيتخانقوا: لو هتشغّل الاتنين، ESLint من غير أي قواعد شكل.`
          },
          teach: R`## ٣ اختبارات

اتجرّب على ويندوز بـ Biome 2.6.3، و ESLint 9 مع typescript-eslint و TypeScript 6 و [[@types/node]].

---

## ١. [[npx biome explain noFloatingPromises]]

~~~text الناتج
- Name: noFloatingPromises
- Fix: unsafe
- Default severity: info
- Available from version: 2.0.0
- Diagnostic category: lint/nursery/noFloatingPromises

Domains
- Name: types
~~~

- [[nursery]]: لسه مش stable.
- [[Domains → types]]: القاعدة بتعتمد على الأنواع (استنتاج Biome).
- [[Default severity: info]]: حتى لو شغّلتها من غير مستوى، مش هتوقّع CI. اكتب [["error"]].

---

## ٢. Biome و typescript-eslint على نفس الملف

~~~text x/use.ts
import { save } from "./api.ts";
import { readFile } from "node:fs/promises";
export function a() {
  save(1);
  readFile("x");
  [1, 2].forEach(async (n) => { await save(n); });
  new Promise((r) => r(1)).then(() => 1);
}
~~~

٤ مشاكل: [[save(1)]] و [[readFile("x")]] Promises محدش مستنيهم (سطر 4 و 5)، و [[forEach(async ...)]] مش بيستنى الـ Promises (سطر 6)، و [[.then]] من غير معالجة error (سطر 7).

~~~text npx biome lint --only=... x
x\use.ts:6:18 lint/nursery/noMisusedPromises
x\use.ts:4:3 lint/nursery/noFloatingPromises
x\use.ts:7:3 lint/nursery/noFloatingPromises
Found 2 errors.
Found 1 info.
~~~

~~~text npx eslint x
  4:3   error  Promises must be awaited, end with a call to .catch, ...  @typescript-eslint/no-floating-promises
  5:3   error  Promises must be awaited, end with a call to .catch, ...  @typescript-eslint/no-floating-promises
  6:18  error  Promise returned in function argument where a void return was expected  @typescript-eslint/no-misused-promises
  7:3   error  Promises must be awaited, end with a call to .catch, ...  @typescript-eslint/no-floating-promises

✖ 4 problems (4 errors, 0 warnings)
~~~

| السطر | Biome | typescript-eslint |
|---|---|---|
| 4: [[save(1)]] (دالة من المشروع) | ✓ | ✓ |
| 5: [[readFile("x")]] (من [[@types/node]]) | **✗** | ✓ |
| 6: [[forEach(async ...)]] | ✓ (info) | ✓ |
| 7: [[.then(...)]] | ✓ | ✓ |

Biome فوّت [[readFile]]: نوعها جاي من [[.d.ts]] بتاعة [[@types/node]]، و Biome مقراهوش حتى وهو متسطّب. و [[noMisusedPromises]] طلع [[info]] لأن ده المستوى الافتراضي بتاعه.

> القواعد اللي هنا: [[--only]] بيشغّل قاعدة معينة بس من غير ما تعدّل [[biome.json]]، وينفع يتكرر.

---

## ٣. [[npx biome check v]]: ملف Vue

~~~text v/App.vue
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
let   unused = 1
</script>

<template>
  <button   @click="count++">{{count}}</button>
</template>
~~~

~~~text الناتج
v\App.vue:3:7 lint/correctness/noUnusedVariables  FIXABLE
  ! This variable count is unused.
v\App.vue:4:7 lint/correctness/noUnusedVariables  FIXABLE
  ! This variable unused is unused.
v\App.vue format
  × Formatter would have printed the following content:
     2    │ - import·{·ref·}·from·'vue'
        2 │ + import·{·ref·}·from·"vue";
~~~

- [[count]] **مستخدم** في الـ template ([[count++]] و [[{{count}}]])، و Biome قال unused: false positive. و [[unused]] صح.
- الـ format عدّل الـ [[<script>]] بس. الـ [[<button   @click>]] بالمسافات الزيادة في الـ template محدش لمسه.

---

## الخلاصة

| | Biome 2.6 | ESLint + typescript-eslint |
|---|---|---|
| format | آه (شبه prettier) | لأ (محتاج prettier) |
| Promises بأنواع المكتبات | جزئي، nursery | كامل (بيسأل TypeScript) |
| Vue و Svelte templates | الـ script بس | آه (بـ plugins) |
| plugins | GritQL، قليلة | ecosystem ضخم |
| إعداد وسرعة | ملف واحد، native | ملفات وأبطأ |

لو هتشيل ESLint: جرّب الملف ده على مشروعك الأول. ولو محتاج الحماية الكاملة: Biome للشكل ومعظم القواعد، و ESLint صغير بالقواعد الـ type-aware بس.`,
          lines: [
            R`اعرف القاعدة: مجموعتها ومستواها الافتراضي وإنها بتعتمد على الأنواع.`,
            R`شغّل القاعدتين دول بس على فولدر [[x]].`,
            R`نفس الفولدر بـ typescript-eslint (type-aware) للمقارنة.`,
            R`افحص ملف Vue.`
          ],
          sol: R`النتيجة الحقيقية على نفس [[x/use.ts]]:
Biome 2.6.3: سطر 4 و 7 ([[noFloatingPromises]]) وسطر 6 ([[noMisusedPromises]] كـ info). **فوّت سطر 5** ([[readFile("x")]]).
typescript-eslint: الأربعة ([[✖ 4 problems (4 errors, 0 warnings)]]).

وفي [[App.vue]]: Biome قال [[This variable count is unused.]] مع إن [[count]] مستخدم في الـ template، ومنسّقش الـ template خالص.`
        },
        {
          cmd: "knip",
          title: "knip: الملفات والـ exports والمكتبات اللي محدش بيستخدمها",
          desc: R`[[knip]] بيبدأ من نقط الدخول بتاعة المشروع ([[main]] و [[scripts]] و ملفات الاختبار و configs الأدوات)، ويمشي ورا كل [[import]]، وفي الآخر يقولك: ملفات محدش بيستوردها، و exports محدش بيستخدمها، ومكتبات في [[package.json]] محدش بيعملها import، ومكتبات مستخدمة ومش في [[package.json]].

و [[--fix]] بيمسحهم، و [[--production]] بيبص على كود الإنتاج بس (من غير الاختبارات).`,
          example: R`npm i -D -E knip
npx knip
npx knip --production
npx knip --fix --allow-remove-files
npx knip`,
          try: R`في مشروع تجربة: ضيف [[lodash]] و [[dayjs]] في [[dependencies]] من غير ما تستخدمهم، واعمل [[src/old-helpers.ts]] محدش بيستورده، وexport [[slugify]] مستخدم في الاختبار بس، و [[import chalk from "chalk"]] من غير ما يكون في [[package.json]]. شغّل [[knip]] و [[knip --production]]: إيه الفرق؟`,
          deep: {
            why: R`مع الوقت المشروع بيتملي ملفات اتنسخت ومتشالتش، و exports من refactor قديم، ومكتبات حد سطّبها وجرّبها. كلهم بيكبّروا التسطيب والـ bundle، وبيلخبطوا اللي بيقرا (هل الدالة دي مستخدمة؟). والـ linter مش بيشوفهم لأنه بيبص ملف ملف، لكن knip بيبص على المشروع كله.`,
            how: R`knip بيقرا [[package.json]] ويشغّل plugins لأكتر من ١٠٠ أداة (vitest و next و eslint و typescript و storybook ...): كل plugin بيعرف ملفات الـ entry والـ config بتاعة أداته، والمكتبات اللي الأداة بتستخدمها من غير import (زي [[typescript]] لما فيه [[tsconfig.json]]). بعدين بيعمل graph من الـ imports.

[[--production]]: بيعتبر الاختبارات و devDependencies مش موجودين، فالـ export المستخدم في الاختبار بس بيطلع «unused». [[--fix]] بيشيل كلمة [[export]] من الـ exports، ويمسح المكتبات من [[package.json]] (مش من [[node_modules]]، اعمل [[npm install]] بعدها)، و [[--allow-remove-files]] بيمسح الملفات.

والـ exit code [[1]] لو فيه أي حاجة، فينفع في CI.`,
            when: R`مرة كل فترة على أي مشروع، وقبل release، وبعد refactor كبير. وفي CI لما المشروع ينضف، عشان يفضل نضيف.`,
            mistakes: R`[[--fix --allow-remove-files]] من غير ما تراجع: ملف بيتحمّل بـ [[import()]] ديناميكي باسم متركّب، أو بيستخدمه سكربت بره المشروع، هيتمسح. وتفتكر إن [[--fix]] مسح الدالة: شال [[export]] بس، والدالة فضلت جوه الملف ميتة (Biome [[noUnusedVariables]] أو [[noUnusedLocals]] في tsconfig بيمسكوها بعدها). وتتجاهل «Configuration hints».`
          },
          teach: R`## المشروع

اتجرّب بـ knip 6.43.0 على ويندوز.

~~~text package.json (المهم)
"main": "src/index.ts",
"scripts": { "start": "node src/index.ts", "test": "node --test" },
"dependencies": { "zod": "^4.0.0", "lodash": "^4.17.21", "dayjs": "^1.11.0" },
"devDependencies": { "knip": "6.43.0", "typescript": "^6.0.0" }
~~~

~~~text src/index.ts
import { formatPrice } from "./utils.ts";
import { z } from "zod";
import chalk from "chalk";

const Price = z.number();
console.log(chalk.green(formatPrice(Price.parse(10))));
~~~

و [[src/utils.ts]] فيه [[formatPrice]] و [[slugify]] و [[type Money]] (كلهم export)، و [[src/utils.test.ts]] بيختبر [[slugify]]، و [[src/old-helpers.ts]] محدش بيستورده.

---

## ١. [[npx knip]]

~~~text الناتج
Unused files (1)
src/old-helpers.ts
Unused dependencies (2)
lodash  package.json
dayjs   package.json
Unlisted dependencies (1)
chalk  src/index.ts:3:19
Unused exported types (1)
Money  type  src/utils.ts:7:13
~~~

| القسم | معناه | التصليح |
|---|---|---|
| Unused files | ملف مفيش طريق ليه من أي entry | امسحه |
| Unused dependencies | في [[package.json]] ومحدش بيعمله import | [[npm uninstall]] |
| Unlisted dependencies | مستخدم ومش في [[package.json]] (شغال بالصدفة لأنه متسطّب كفرعي أو global) | [[npm i chalk]] |
| Unused exported types | [[export type]] محدش بيستورده | شيل [[export]] |

- [[typescript]] مطلعش unused: knip لقى [[tsconfig.json]] وعرف إنه مستخدم.
- [[slugify]] مطلعش: مستخدم في [[utils.test.ts]]، والاختبارات entry (knip فهم ده من [[node --test]]).
- والـ exit code [[1]].

---

## ٢. [[npx knip --production]]

نفس اللي فوق وزيادة:

~~~text الناتج (الإضافة)
Unused exports (1)
slugify  function  src/utils.ts:4:17
~~~

في الإنتاج محدش بيستخدم [[slugify]] (الاختبار بس). يعني الكود ده بيتشحن ومش بيتنفّذ: إما الدالة لسه هتتستخدم، أو اختبارها بيختبر حاجة ميتة.

---

## ٣. [[knip.json]]

~~~text knip.json
{
  "$schema": "https://unpkg.com/knip@6/schema.json",
  "entry": ["src/index.ts", "scripts/*.ts"],
  "project": ["src/**/*.ts"],
  "ignoreDependencies": ["dayjs"]
}
~~~

- [[entry]]: نقط الدخول. [[project]]: الملفات اللي يعتبرها جزء من المشروع.
- [[ignoreDependencies]]: «[[dayjs]] متسيبه، عارف إنه مش مستخدم» (مثلًا بيستخدمه سكربت بره [[src]]).

~~~text الناتج (بعد ما ضفت chalk لـ package.json)
Unused files (1)
src/old-helpers.ts
Unused dependencies (1)
lodash  package.json:13:6
Unused exported types (1)
Money  type  src/utils.ts:7:13
Configuration hints (2)
scripts/*.ts    knip.json  Refine entry pattern (no matches)
src/index.ts    knip.json  Remove redundant entry pattern
~~~

الـ hints بتقولك إن الـ config نفسه فيه حاجات ملهاش لازمة: [[scripts/*.ts]] مفيش ملفات بالشكل ده، و [[src/index.ts]] knip عارفه أصلًا من [[main]].

---

## ٤. [[npx knip --fix --allow-remove-files]]

~~~text الناتج
Unused files (1)
src/old-helpers.ts  (removed)
Unused dependencies (1)
lodash  package.json:13:6  (removed)
Unused exported types (1)
Money  type  src/utils.ts:7:13  (removed)
~~~

- [[old-helpers.ts]] اتمسح.
- [[lodash]] اتشال من [[package.json]] (لسه في [[node_modules]] لحد [[npm install]]).
- [[Money]]: اتشالت كلمة [[export]] بس:

~~~text src/utils.ts بعد --fix
type Money = { amount: number };
~~~

يعني النوع فضل في الملف ومحدش بيستخدمه. ده شغل الـ linter بعد كده ([[noUnusedVariables]] في Biome).

---

## ٥. [[npx knip]] تاني

~~~text الناتج
Configuration hints (2)
scripts/*.ts    knip.json  Refine entry pattern (no matches)
src/index.ts    knip.json  Remove redundant entry pattern
~~~

الـ exit code [[0]]: الـ hints مش أخطاء. ولو صلّحت [[knip.json]] بيختفوا.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[knip]] | ملفات و exports و مكتبات مش مستخدمة، ومكتبات مستخدمة ومش متسجّلة |
| [[knip --production]] | نفس الكلام على كود الإنتاج بس |
| [[knip --fix]] | يشيل [[export]] والمكتبات من [[package.json]] |
| [[--allow-remove-files]] | ويمسح الملفات (راجع الأول) |`,
          lines: [
            R`سطّب knip بنسخة ثابتة.`,
            R`افحص المشروع كله (والاختبارات entry).`,
            R`افحص كود الإنتاج بس.`,
            R`صلّح: شيل exports ومكتبات وامسح الملفات.`,
            R`اتأكد إنه نضف.`
          ],
          sol: R`[[knip]]: [[src/old-helpers.ts]] ملف مش مستخدم، و [[lodash]] و [[dayjs]] مكتبات مش مستخدمة، و [[chalk]] مستخدم ومش في [[package.json]] (Unlisted)، و [[Money]] type مش مستخدم.
[[knip --production]]: نفس الكلام وزيادة [[slugify  function  src/utils.ts:4:17]]، لأنه مستخدم في الاختبار بس.

[[chalk]] شغال عندك بالصدفة: متسطّب في [[node_modules]] (فرعي أو اتسطّب يدوي) بس مش في [[package.json]]، فأول [[npm ci]] نضيف هيقع. جرّبت [[node src/index.ts]] وchalk مش متسطّب: [[Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'chalk' imported from ...]].`
        }
      ]
    },
]);
