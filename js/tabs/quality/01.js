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

TAB("quality", {
  label: "فحص الكود",
  prompt: "~/myapp$ ",
  lab: R`mkdir -p ~/lab/quality && cd ~/lab/quality
npm init -y
npm pkg set type=module
npm i -D eslint prettier typescript@6 vitest`,
  labText: "اعمل مشروع تجربة وسطّب الأدوات dev dependencies. كل أداة هنا بتشتغل من الترمنال وفي CI بنفس الأمر. و typescript@6 مش 7 لأن typescript-eslint (في الدروس الجاية) لسه بيطلب أقل من 6.1.",
  levels: {"1":["البداية","lint و format و typecheck، والفرق بينهم"],"2":["المتوسط","الاختبارات، و husky و lint-staged قبل كل commit"],"3":["المتقدم","CI بيفحص كل حاجة، و monorepo بأكتر من تطبيق، و e2e بـ Playwright"]},
  categories: [
    {
      t: "الأساس: الشكل والأخطاء والأنواع",
      l: 1,
      n: "أربع أدوات، كل واحدة بتمسك نوع غلط التانية مش شايفاه، وكلها بتشتغل بأمر واحد",
      items: [
        {
          cmd: "سكربتات الفحص",
          title: "أربع فحوصات وكل واحد بيمسك إيه",
          desc: R`أي مشروع محترم فيه أربع سكربتات في package.json: [[format:check]] للشكل، و [[lint]] للأخطاء والعادات الوحشة، و [[typecheck]] للأنواع، و [[test]] للسلوك. كل واحد بيمسك نوع غلط التاني مش بيشوفه.

والمهم إن الأمر اللي بتكتبه على جهازك هو نفسه اللي بيشتغل في CI، فمفيش «عندي شغال».`,
          example: R`"scripts": {
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "lint": "eslint . --max-warnings=0",
  "lint:fix": "eslint . --fix",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "check": "npm run format:check && npm run lint && npm run typecheck && npm run test"
}`,
          try: R`ضيف السكربتات دي لمشروع الـ lab، وشغّل [[npm run check]] وشوف أنهي خطوة بتقع الأول.`,
          flag: "script",
          deep: {
            why: "من غير أدوات، المراجعة بتضيع في «حط مسافة هنا» و «المتغير ده مش مستخدم»، والغلط الحقيقي (نوع غلط، أو دالة بترجع undefined) بيعدّي للإنتاج. الأدوات دي بتعمل الفحص الممل كل مرة من غير ما تتعب.",
            how: R`الأربعة بيشتغلوا على مستويات مختلفة:

prettier (format) بيبص على الشكل بس: مسافات، وعلامات تنصيص، وطول السطر. مبيفهمش الكود بيعمل إيه، ومبيغيّرش معناه أبدًا.

eslint (lint) بيقرا الكود ويدوّر على أنماط مشبوهة: متغير متعرّف ومش مستخدم، أو [[==]] بدل [[===]]، أو hook في React متنادي جوه if، أو promise من غير await. ده كود بيشتغل، بس غالبًا مش قصدك.

tsc (typecheck) بيتأكد إن الأنواع ماشية مع بعض: بتبعت string لدالة مستنية number، أو بتقرا خاصية ممكن تكون undefined. مبيشغّلش الكود، بيحلّله بس.

والاختبارات (test) هي الوحيدة اللي بتشغّل الكود فعلًا وتتأكد إنه بيعمل الصح: [[sum(2, 2)]] بترجع 4.

والترتيب في [[check]] مقصود: الأرخص والأسرع الأول. الفورمات بياخد ثانية، والاختبارات ممكن دقايق. و [[&&]] بتوقف عند أول فشل.`,
            when: "من أول يوم في أي مشروع JavaScript أو TypeScript. أسهل بكتير من إنك تضيفهم على مشروع فيه ألف ملف.",
            mistakes: R`تعتمد على الـ editor بس (VS Code بيعرض الأخطاء في الملفات المفتوحة)، والملفات التانية محدش بيبصلها. وتفتكر إن [[vite build]] نجح يبقى الأنواع سليمة، وهو بيشيل الأنواع من غير ما يفحصها. وتخلط الـ format مع الـ lint فتخلي eslint يفرض المسافات ويتخانق مع prettier: سيب الشكل لـ prettier لوحده.`
          },
          teach: R`## الفكرة: أسامي قصيرة لأوامر طويلة

المثال ده مش أوامر تكتبها في الترمنال، ده جزء من ملف [[package.json]]. خانة [[scripts]] فيها أسامي من عندك، وكل اسم قصاده أمر. ولما تكتب [[npm run lint]]، npm بيدوّر على [[lint]] في الخانة دي وينفّذ الأمر اللي قصاده.

### ليه مش بنكتب [[npx]] جوه السكربتات؟

لما npm يشغّل سكربت، بيضيف فولدر [[node_modules/.bin]] على الـ PATH مؤقتًا. والفولدر ده فيه نسخة من كل أداة سطّبتها في المشروع ([[eslint]] و [[prettier]] و [[tsc]] و [[vitest]]). فجوه السكربت تكتب [[eslint .]] على طول، وبيشتغل الـ eslint بتاع المشروع نفسه بالنسخة اللي في [[package.json]]، مش نسخة متسطّبة على الجهاز.

---

## السطور واحد واحد

### [["format": "prettier --write ."]]

[[prettier]] أداة الشكل. [[--write]] يعني «عدّل الملفات نفسها»، و [[.]] (نقطة) معناها الفولدر الحالي وكل اللي جواه. ده اللي بتشغّله على جهازك عشان يظبطلك الشكل.

### [["format:check": "prettier --check ."]]

نفس الأداة، بس [[--check]] مبيلمسش أي ملف: بيقارن بس، ولو فيه ملف شكله مختلف عن اللي prettier كان هيكتبه، يطبع اسمه ويخرج بـ exit code [[1]]. والـ [[:]] في الاسم مجرد عُرف (namespace)، [[format:check]] اسم زي أي اسم.

> **exit code** رقم كل برنامج بيرجّعه لما يخلص: [[0]] يعني نجح، وأي رقم تاني يعني فشل. الـ CI و [[&&]] بيبصّوا على الرقم ده بس، مش على الكلام اللي اتطبع.

### [["lint": "eslint . --max-warnings=0"]]

[[eslint]] بيدوّر على أخطاء وعادات وحشة. القاعدة في eslint ليها مستويين: [[error]] بيفشّل الأمر، و [[warning]] لأ. و [[--max-warnings=0]] معناها «أقصى عدد warnings مسموح صفر»، فأي warning يبقى فشل.

### [["lint:fix": "eslint . --fix"]]

[[--fix]] بيصلّح لوحده القواعد اللي ليها تصليح آمن (زي [[let]] → [[const]])، والباقي بيطبعه.

### [["typecheck": "tsc --noEmit"]]

[[tsc]] هو TypeScript Compiler. عادةً بيفحص الأنواع وكمان يكتب ملفات [[.js]]؛ [[--noEmit]] بيقوله: افحص بس، متكتبش (emit = يطلّع) ولا ملف.

### [["test": "vitest run"]]

[[vitest]] بيشغّل الاختبارات. [[run]] يعني مرة واحدة واقفل. من غيرها، في ترمنال عادي بيفضل شغال مستني تحفظ (watch)، فالسكربت مبيخلصش أبدًا.

### [["check": "npm run format:check && npm run lint && ..."]]

[[&&]] معناها «لو اللي قبلي نجح (exit code [[0]])، شغّل اللي بعدي». فلو [[format:check]] وقع، الباقي مبيتشغّلش، والـ exit code النهائي بتاع الخطوة اللي وقعت. والترتيب من الأسرع للأبطأ: الشكل ثانية، والاختبارات ممكن دقايق.

---

## نجرّب: مشروع فاضي خطوة بخطوة

اتشغّل على ويندوز (Node 24 و npm 11) في مشروع الـ lab: [[npm init -y]] و [[npm i -D eslint prettier typescript@6 vitest @eslint/js typescript-eslint]] والسكربتات اللي فوق. النسخ: ESLint 10.12 و Prettier 3.9 و TypeScript 6.0 و Vitest 5.0.

### ١. أول [[npm run check]]

~~~text الناتج
> lab@1.0.0 format:check
> prettier --check .

Checking formatting...
All matched files use Prettier code style!

> lab@1.0.0 lint
> eslint . --max-warnings=0

Oops! Something went wrong! :(

ESLint: 10.12.0

ESLint couldn't find an eslint.config.* file.
~~~

السطور اللي بتبدأ بـ [[>]] npm هو اللي بيطبعها: اسم السكربت والأمر اللي هيشغّله. الشكل عدّى، و eslint وقع قبل ما يفحص حاجة لأن من ESLint 9 مفيش إعدادات افتراضية، ورجع exit code [[2]] (الـ [[2]] في eslint معناها مشكلة في الإعداد نفسه، و [[1]] معناها لقى أخطاء في الكود). والـ [[&&]] وقّف الباقي.

### ٢. بعد [[eslint.config.js]] (اللي في الحل)

الملف ده مكتوب بـ [[import]] (ES Modules). و [[npm init -y]] في npm 11 بيكتب في [[package.json]] السطر [["type": "commonjs"]]، يعني Node هيقرا أي [[.js]] على إنه CommonJS ([[require]]). جرّبته كده وeslint وقع:

~~~text الناتج
Warning: Failed to load the ES module: .../eslint.config.js. Make sure to set "type": "module" in the nearest package.json file or use the .mjs extension.
SyntaxError: Cannot use import statement outside a module
~~~

الحل اللي الرسالة نفسها بتقوله: [[npm pkg set type=module]] (السطر ده في أوامر الـ lab)، أو تسمّي الملف [[eslint.config.mjs]] ([[m]] = module).

بعدها [[npm run lint]] بيعدّي ومبيطبعش حاجة (eslint لما ميلاقيش مشاكل بيسكت). اللي بعده [[tsc --noEmit]] ومفيش [[tsconfig.json]]:

~~~text الناتج
Version 6.0.3
tsc: The TypeScript Compiler - Version 6.0.3

COMMON COMMANDS
...
~~~

يعني من غير tsconfig، tsc مش عارف يفحص إيه، فبيطبع الـ help ويخرج بـ [[1]].

### ٣. بعد [[tsconfig.json]] وفولدر [[src]] لسه فاضي

~~~text الناتج
error TS18003: No inputs were found in config file '.../lab/tsconfig.json'. Specified 'include' paths were '["src"]' and 'exclude' paths were '[]'.
~~~

الـ tsconfig فيه [[include]] بيقول افحص [[src]] بس، ومفيش ولا ملف [[.ts]] هناك، فبرضه فشل (exit code [[2]]).

### ٤. ملف في [[src]] ومفيش اختبارات

~~~text الناتج
No test files found, exiting with code 1

include: **/*.{test,spec}.?(c|m)[jt]s?(x)
~~~

السطر الأخير هو النمط اللي vitest بيدوّر بيه: أي ملف اسمه فيه [[.test.]] أو [[.spec.]] وآخره [[ts]] أو [[js]] (أو [[tsx]] و [[mts]] وأخواتهم).

### ٥. بعد [[src/sum.ts]] و [[src/sum.test.ts]]

هنا [[format:check]] رجع وقع: [[[warn] src/sum.test.ts]] و [[[warn] tsconfig.json]]، لأني كتبتهم بعلامة تنصيص مفردة وفي سطر واحد. [[npm run format]] ظبطهم، وبعدها:

~~~text الناتج
> lab@1.0.0 test
> vitest run

 Test Files  1 passed (1)
      Tests  1 passed (1)
~~~

والأمر كله خرج بـ [[0]]. ده اللي الـ CI عايز يشوفه.

---

## [[&&]] مش زي [[;]]

جرّبت سكربت [["semi": "npm run fail ; npm run ok"]] (و [[fail]] بيخرج بـ 1):

| | [[&&]] | [[;]] |
|---|---|---|
| لينكس (node:22-slim) | وقف، و exit code [[1]] | كمّل وطبع [[ok-ran]]، و exit code [[0]]: الفشل اتخبّى |
| ويندوز | وقف، و exit code [[1]] | npm على ويندوز بيشغّل السكربتات بـ CMD، و CMD مبيفهمش [[;]]، فاتبعتت كـ arguments لأول أمر |

يعني [[&&]] هي الوحيدة اللي بتشتغل صح على الاتنين.

---

## TypeScript 7 و typescript-eslint

لو كتبت [[npm i -D typescript]] من غير رقم، npm بيجيب آخر نسخة، ووقت الكتابة دي TypeScript 7.0 (النسخة المكتوبة بـ Go). و [[typescript-eslint]] 8.71 لسه بيقول [[typescript >=4.8.4 <6.1.0]]، فلما تسطّبه بعدها:

~~~text الناتج
npm error code ERESOLVE
npm error Found: typescript@7.0.2
npm error peer typescript@">=4.8.4 <6.1.0" from typescript-eslint@8.71.1
~~~

عشان كده مشروع الـ lab بيسطّب [[typescript@6]]. ولو typescript-eslint اتحدّث بعد كده، شيل الرقم.

---

## الخلاصة

| السكربت | الأداة | بيمسك إيه | بيعدّل ملفات؟ |
|---|---|---|---|
| [[format:check]] | prettier | الشكل | لأ |
| [[lint]] | eslint | أنماط غلط ([[==]]، متغير مش مستخدم) | لأ |
| [[typecheck]] | tsc | الأنواع | لأ |
| [[test]] | vitest | السلوك: الناتج صح؟ | لأ |
| [[format]] و [[lint:fix]] | prettier و eslint | بيصلّحوا | آه، على جهازك بس |

والـ CI بيشغّل [[npm run check]] بالظبط زي ما انت بتشغّله.`,
          lines: [
            "بداية السكربتات في package.json.",
            "[[npm run format]]: رتّب شكل كل الملفات وعدّلها.",
            "نفسه بس بيفحص من غير ما يعدّل، ويفشل لو فيه ملف مش متنسّق. ده للـ CI.",
            "دوّر على الأخطاء، وأي warning يعتبر فشل.",
            "صلّح اللي يتصلّح تلقائي.",
            "افحص الأنواع من غير ما تطلّع ملفات.",
            "شغّل الاختبارات مرة واحدة واقفل.",
            "الكل بالترتيب، ويقف عند أول فشل.",
            "نهاية السكربتات."
          ],
          sol: R`في مشروع الـ lab زي ما هو ([[npm init -y]] والأدوات بس)، [[npm run check]] بيعدّي [[format:check]] ([[All matched files use Prettier code style!]]) وبيقع في [[lint]] بـ [[ESLint couldn't find an eslint.config.* file.]]. من ESLint 9 لازم ملف config، ومفيش واحد افتراضي.

بعد ما تعمل [[eslint.config.js]] (و [[npm init -y]] في npm 11 بيكتب [["type": "commonjs"]]، فلازم [[npm pkg set type=module]] أو تسمّي الملف [[eslint.config.mjs]]، وإلا eslint يقع بـ [[Cannot use import statement outside a module]])، اللي بعده [[typecheck]]: من غير [[tsconfig.json]]، [[tsc --noEmit]] بيطبع صفحة الـ help ويخرج بـ 1، مش بيفحص حاجة. وبعد الـ tsconfig، [[vitest run]] من غير ملفات اختبار بيقول [[No test files found, exiting with code 1]].

دا بالظبط الهدف: الـ [[&&]] بيوقف عند أول خطوة واقعة، فتصلّح واحدة واحدة بالترتيب. لو عايز الـ test يعدّي مؤقتًا لحد ما تكتب اختبارات حط [[vitest run --passWithNoTests]]. والغلط الشائع إنك تستخدم [[;]] بدل [[&&]] فكل الخطوات تشتغل و exit code النهائي يبقى بتاع آخر واحدة بس.`,
          solCode: R`// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "coverage"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
);

// tsconfig.json
{ "compilerOptions": { "strict": true, "module": "ESNext", "moduleResolution": "bundler", "target": "ES2022", "noEmit": true, "skipLibCheck": true }, "include": ["src"] }`
        },
        {
          cmd: "eslint",
          title: "دوّر على الغلط قبل ما يشتغل",
          desc: R`[[eslint .]] بيقرا كل ملفات المشروع ويطلّع قايمة: ملف، وسطر، وقاعدة اتكسرت. [[--fix]] بيصلّح اللي يتصلّح لوحده (زي [[let]] المفروض تبقى [[const]])، والباقي عليك. و [[--max-warnings=0]] بتخلي أي warning يفشّل الأمر، ودي اللي بتحطها في CI.

الإعدادات في [[eslint.config.js]] في جذر المشروع (الشكل الجديد، flat config).`,
          example: R`npx eslint .
npx eslint src/api/users.ts
npx eslint . --fix
npx eslint . --max-warnings=0
npx eslint . --quiet
npx eslint --print-config src/index.ts`,
          try: R`اكتب متغير مش مستخدم و [[==]] في ملف، شغّل [[eslint]] واقرا أسماء القواعد اللي طلعت، وبعدين [[--fix]] وشوف صلّح إيه وساب إيه.`,
          deep: {
            why: "فيه غلطات الكود بيشتغل بيها عادي بس هتعمل bug بعدين: متغير اسمه اتكتب غلط، أو promise من غير await، أو useEffect ناقصه dependency. eslint بيمسكهم وانت بتكتب، مش بعد ما العميل يشتكي.",
            how: R`eslint بيحوّل كل ملف لشجرة (AST) ويعدّي عليها قواعد. كل قاعدة ليها مستوى: [[off]] أو [[warn]] أو [[error]]. الـ error بيخلي الأمر يرجع exit code 1، والـ warning لأ، إلا لو قلت [[--max-warnings=0]].

[[--fix]] بيطبّق التصليحات اللي القاعدة نفسها بتقدّمها وآمنة: [[prefer-const]]، وحاجات زي كده. القواعد اللي محتاجة قرار منك (متغير مش مستخدم: تمسحه ولا تستخدمه؟) بيسيبها.

الإعدادات في [[eslint.config.js]]: array من objects، كل واحد بيقول «على الملفات دي، طبّق القواعد دي». بتبدأ من إعدادات جاهزة ([[js.configs.recommended]] و [[typescript-eslint]] وبتاعة React أو Next) وتعدّل عليها. ملف كامل لمشروع Next و TypeScript بالقواعد اللي بتمسك bugs الـ async والـ hooks في الدرس الجاي ([[eslint.config.mjs]]). و [[--print-config file]] بيطبع القواعد اللي اتطبقت فعلًا على ملف معين، ودي أسرع طريقة تعرف ليه قاعدة شغالة أو مش شغالة.

و [[--quiet]] بيعرض الـ errors بس ويخفي الـ warnings، مفيد في مشروع قديم فيه مية warning وعايز تركّز.`,
            when: "مع كل حفظ في VS Code (extension الـ ESLint)، وقبل كل commit (lint-staged)، وفي CI بـ [[--max-warnings=0]].",
            mistakes: R`warnings بتتراكم لحد ما محدش بيقراها: مية warning زي صفر، عشان كده [[--max-warnings=0]]. وفي مشروع حقيقي كان سكربت lint في تطبيق Next لسه [[next lint]] بعد ما Next شالها في النسخ الجديدة، فالسكربت نفسه بيقع: استخدم [[eslint .]] مباشرة. وملف [[.eslintrc]] القديم eslint 9 مبيقراهوش، فلو القواعد مش شغالة خالص شوف اسم الملف.`
          },
          teach: R`## eslint بيعمل إيه في سطر واحد

[[eslint]] بيقرا ملفاتك ويدوّر على أنماط معروفة إنها بتعمل bugs، ويطبع لكل مشكلة: السطر والعمود، ونوعها ([[error]] أو [[warning]])، والرسالة، واسم القاعدة. و [[npx]] قبله معناها «شغّل الـ eslint المتسطّب في المشروع ده» (من [[node_modules/.bin]]).

كل اللي تحت اتشغّل على ويندوز في مشروع الـ lab بـ ESLint 10.12، والإعدادات هي إعدادات الحل في درس «سكربتات الفحص» وزيادة عليها ٣ قواعد:

~~~text eslint.config.js (الجزء المهم)
js.configs.recommended,
...tseslint.configs.recommended,
{ rules: { eqeqeq: "error", "prefer-const": "error", "no-console": "warn" } },
~~~

والملف اللي هنفحصه [[src/bad.ts]]:

~~~text src/bad.ts
import { sum } from "./sum";
let unused = 1;
let total = sum(1, 2);
if (total == 3) {
  console.log("three");
}
~~~

---

## ١. [[npx eslint .]]

[[.]] يعني الفولدر الحالي وكل اللي جواه (ما عدا [[node_modules]] و [[.git]] واللي في [[ignores]]).

~~~text الناتج
~/lab/src/bad.ts
  2:5   error    'unused' is never reassigned. Use 'const' instead  prefer-const
  2:5   error    'unused' is assigned a value but never used        @typescript-eslint/no-unused-vars
  3:5   error    'total' is never reassigned. Use 'const' instead   prefer-const
  4:11  error    Expected '===' and instead saw '=='                eqeqeq
  5:3   warning  Unexpected console statement                       no-console

✖ 5 problems (4 errors, 1 warning)
  2 errors and 0 warnings potentially fixable with the $__bt--fix$__bt option.
~~~

### نقرا سطر

| الجزء | معناه |
|---|---|
| [[2:5]] | سطر ٢، عمود ٥ (الحرف الخامس، أول حرف في [[unused]]) |
| [[error]] | مستوى القاعدة. الـ error بيخلي الأمر يخرج بـ [[1]] |
| الرسالة | إيه المشكلة، بالإنجليزي |
| [[prefer-const]] | اسم القاعدة: دوّر بيه في الـ docs. ولو قبله [[@typescript-eslint/]] يبقى القاعدة جاية من plugin الـ TypeScript |

والسطر الأخير بيقولك إن ٢ من الأخطاء (الاتنين [[prefer-const]]) ليهم تصليح أوتوماتيك. والأمر خرج بـ exit code [[1]] عشان فيه errors.

---

## ٢. [[npx eslint src/api/users.ts]]

بدل [[.]] تدّيله مسار ملف (أو فولدر). مفيد وانت شغال على ملف واحد. جرّبته على [[src/sum.ts]] (ملف سليم): مطبعش أي حاجة وخرج بـ [[0]]. السكوت عند eslint معناه «تمام».

---

## ٣. [[npx eslint . --fix]]

~~~text الناتج
~/lab/src/bad.ts
  2:7   error    'unused' is assigned a value but never used  @typescript-eslint/no-unused-vars
  4:11  error    Expected '===' and instead saw '=='          eqeqeq
  5:3   warning  Unexpected console statement                 no-console
~~~

والملف نفسه اتغيّر: [[let unused]] بقت [[const unused]] و [[let total]] بقت [[const total]]. لاحظ إن [[unused]] بقى في عمود ٧ بدل ٥ لأن [[const]] أطول من [[let]] بحرفين.

اللي فاضل eslint مبيلمسهوش عن قصد:
- [[unused]]: تمسحه ولا نسيت تستخدمه؟ ده قرارك.
- [[==]] لـ [[===]]: ممكن يغيّر السلوك ([[0 == ""]] بـ [[true]] و [[0 === ""]] بـ [[false]]).
- [[console.log]]: يمكن مقصود.

> [[--fix]] بيعدّل الملفات على طول. اعمل commit قبله أو بص على [[git diff]] بعده.

---

## ٤. [[npx eslint . --max-warnings=0]]

عشان أوضّح الفرق، عملت ملف فيه warning بس: [[src/warn.ts]] فيه [[console.log("hi");]].

~~~text من غير الفلاج
~/lab/src/warn.ts
  1:1  warning  Unexpected console statement  no-console

✖ 1 problem (0 errors, 1 warning)
~~~

exit code [[0]]: الـ CI هيعدّي والـ warning هيفضل موجود.

~~~text بـ --max-warnings=0
ESLint found too many warnings (maximum: 0).

~/lab/src/warn.ts
  1:1  warning  Unexpected console statement  no-console
~~~

exit code [[1]]: الـ CI هيقع. ده اللي بيمنع الـ warnings تتراكم.

---

## ٥. [[npx eslint . --quiet]]

على [[bad.ts]] الأصلي: نفس الأربع errors، والـ warning بتاع [[console]] اختفى، والملخص بقى [[✖ 4 problems (4 errors, 0 warnings)]]. يعني [[--quiet]] بيخفي الـ warnings من العرض بس، مش بيصلّح حاجة.

---

## ٦. [[npx eslint --print-config src/index.ts]]

بيطبع JSON كبير فيه كل القواعد اللي هتتطبق على الملف ده بعد ما eslint يدمج كل الإعدادات. على [[src/bad.ts]] طلع ٩٣ قاعدة، ودي شوية منهم:

~~~text الناتج (مختصر)
"eqeqeq": [2, "always"]
"prefer-const": [2, { "destructuring": "any", ... }]
"no-console": [1, {}]
"@typescript-eslint/no-unused-vars": [2]
"no-unused-vars": [0, { ... }]
~~~

الرقم الأول هو المستوى: [[0]] = off، و [[1]] = warn، و [[2]] = error. ولاحظ إن [[no-unused-vars]] العادية [[0]] (مقفولة): typescript-eslint قفلها وشغّل نسخته [[@typescript-eslint/no-unused-vars]] لأنها فاهمة الأنواع. لما قاعدة «مش شغالة» وانت متأكد إنك كتبتها، ده أول أمر تجرّبه.

---

## الخلاصة

| الأمر | بيعمل إيه | بيعدّل؟ | exit code لما فيه warnings بس |
|---|---|---|---|
| [[eslint .]] | يفحص كله | لأ | [[0]] |
| [[eslint file]] | يفحص ملف | لأ | [[0]] |
| [[--fix]] | يصلّح الآمن ويطبع الباقي | آه | [[0]] |
| [[--max-warnings=0]] | أي warning = فشل | لأ | [[1]] |
| [[--quiet]] | يخفي الـ warnings | لأ | [[0]] |
| [[--print-config]] | يطبع القواعد الفعلية | لأ | - |

وافتكر: [[1]] = لقى errors، و [[2]] = الإعداد نفسه بايظ.`,
          lines: [
            "افحص كل ملفات المشروع.",
            "افحص ملف واحد بس.",
            "صلّح اللي يتصلّح لوحده، والباقي يطلعلك.",
            "أي warning يفشّل الأمر. ده للـ CI.",
            "اعرض الـ errors بس واخفي الـ warnings.",
            "اطبع القواعد اللي بتتطبق فعلًا على الملف ده."
          ],
          sol: R`على ملف فيه [[let unused = 1;]] و [[let total = sum(1, 2);]] و [[if (total == 3)]]، مع [[js.configs.recommended]] و [[typescript-eslint]] و قاعدتين [[eqeqeq]] و [[prefer-const]]، الناتج:

[[2:5 error 'unused' is never reassigned. Use 'const' instead prefer-const]] و [[2:5 error 'unused' is assigned a value but never used @typescript-eslint/no-unused-vars]] و [[3:5 error 'total' is never reassigned. Use 'const' instead prefer-const]] و [[4:11 error Expected '===' and instead saw '==' eqeqeq]]، وفي الآخر [[✖ 4 problems (4 errors, 0 warnings)]] و [[2 errors and 0 warnings potentially fixable with the --fix option.]]

بعد [[--fix]]: الاتنين [[let]] بقوا [[const]] (دي آمنة)، بس المتغير المش مستخدم لسه موجود و [[==]] زي ما هو. الاتنين محتاجين قرار منك: يمكن المتغير لازم يتمسح ويمكن نسيت تستخدمه، و [[==]] لـ [[===]] ممكن يغيّر السلوك لو النوع مختلف.

آخر كلمة في كل سطر هي اسم القاعدة، ودا اللي تدوّر عليه في الـ docs. ولو ما طلعش [[eqeqeq]] خالص، دي مش في [[recommended]]؛ ضيفها في [[rules]].`
        },
        {
          cmd: "eslint.config.mjs",
          title: "ملف eslint كامل لمشروع Next و TypeScript",
          desc: R`ده ملف حقيقي لمشروع Next بـ TypeScript: قواعد Next و React و react-hooks (من [[eslint-config-next]])، وقواعد typescript-eslint اللي بتستخدم الأنواع ([[recommendedTypeChecked]])، وقواعد jsx-a11y كاملة، و prettier في الآخر يقفل قواعد الشكل.

القواعد اللي بتستخدم الأنواع هي اللي بتمسك الـ bugs الحقيقية: [[no-floating-promises]] (Promise محدش مستنيه)، و [[no-misused-promises]] (دالة async في مكان مش مستني Promise).

التسطيب: [[npm i -D eslint@9 eslint-config-next typescript-eslint eslint-plugin-jsx-a11y eslint-config-prettier]].`,
          example: R`import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  ...nextVitals,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  { rules: jsxA11y.flatConfigs.recommended.rules },
  {
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);`,
          try: R`اعمل component في [[app/Checkout.tsx]] فيه أربع غلطات: [[useEffect]] بيعمل fetch بـ [[orderId]] والـ deps [[[]]]، و [[saveOrder(orderId)]] (دالة async) من غير await في جسم الـ component، و [[<div onClick={() => saveOrder(orderId)}>]]، و [[<img src="/logo.png" />]] من غير alt. شغّل [[npx eslint .]] وطابق كل خطأ بالقاعدة وبالـ bug اللي بتمنعه، وبعدين صلّحهم.`,
          flag: "script",
          deep: {
            why: "الإعدادات الافتراضية بتمسك الحاجات السطحية (متغير مش مستخدم). بس أغلى bugs في تطبيقات React و Node هي: Promise محدش عمله await فالخطأ بيضيع والـ order متحفظش، و useEffect بقيمة قديمة، و زرار مش شغال بالكيبورد. القواعد دي بالظبط اللي بتمسكهم، ومحتاجة ملف متظبط صح عشان تشتغل.",
            how: R`flat config: array من objects، وكل object ممكن يبقى ليه [[files]]، والأخير بيكسب لو اتنين عدّلوا نفس القاعدة. [[defineConfig]] بيدّيك autocomplete وبيفهم [[extends]] جوه أي object.

[[...nextVitals]]: config جاهز من [[eslint-config-next]] بيسجّل plugins: react، و react-hooks، و jsx-a11y، و import، و [[@next/next]]. فيه [[rules-of-hooks]] (hook جوه if أو loop)، وقواعد React Compiler الجديدة في react-hooks 7 زي [[set-state-in-effect]] (setState جوه effect على طول، فالـ component يترسم مرتين)، و [[exhaustive-deps]] كـ warn، واحنا بنخليها error: dependency ناقصة معناها الـ effect شايف [[orderId]] القديم ومش هيعيد الـ fetch لما يتغير.

[[recommendedTypeChecked]] من typescript-eslint: القواعد العادية وكمان القواعد اللي بتسأل TypeScript عن النوع. [[projectService: true]] بيخلي كل ملف يلاقي أقرب [[tsconfig.json]]، و [[tsconfigRootDir]] بيحدد الجذر. أبطأ من lint عادي لأنه بيبني برنامج TypeScript، بس ده التمن.

[[no-floating-promises]]: [[saveOrder(id);]] من غير await ولا [[.catch]]. لو الطلب فشل، الخطأ بيبقى unhandled rejection ومحدش يعرف، واليوزر شايف «تم». التصليح: [[await]]، أو [[.catch(...)]]، أو [[void]] لو قاصد تتجاهله.

[[no-misused-promises]]: دالة async في مكان مستني دالة عادية. [[onClick={async () => ...}]] React مش بيستنى الـ Promise، فأي خطأ جواها بيضيع. و [[arr.some(async x => ...)]] دايمًا true لأن الـ Promise object قيمته truthy. و [[if (fetchUser())]] من غير await دايمًا true. التصليح في الـ events: [[onClick={() => void save()}]] مع try/catch جوه save.

[[jsxA11y.flatConfigs.recommended.rules]]: Next بيفعّل ٦ قواعد a11y بس وكـ warn. هنا بنضيف القايمة الكاملة كقواعد (من غير ما نسجّل الـ plugin تاني، لأن nextVitals سجّله): [[alt-text]]، و [[click-events-have-key-events]] و [[no-static-element-interactions]] (div عليه onClick مش شغال بالكيبورد: استخدم button)، و [[label-has-associated-control]].

[[disableTypeChecked]] على ملفات JS: ملف [[eslint.config.mjs]] نفسه مش جوه tsconfig، ومن غير السطر ده بيطلع [[was not found by the project service]].

و [[prettier]] في الآخر بيقفل أي قاعدة شكل، عشان prettier لوحده هو اللي يقرر الشكل.`,
            when: "أي مشروع Next أو React بـ TypeScript. ولو مشروع Node من غير React: نفس الملف من غير nextVitals و jsxA11y، وبـ [[js.configs.recommended]] من [[@eslint/js]].",
            mistakes: R`[[eslint@10]] مع [[eslint-config-next]]: وقت كتابة الدرس، [[eslint-plugin-react]] و [[eslint-plugin-jsx-a11y]] الـ peer dependency بتاعتهم لحد eslint 9، فـ npm بيرفض التسطيب بـ ERESOLVE: ثبّت [[eslint@9]] (وشوف لو اتحدّثوا). وتضيف [[jsxA11y.flatConfigs.recommended]] كامل (مش rules بس) فوق nextVitals، فـ eslint يقع قبل ما يفحص حاجة بـ [[Cannot redefine plugin "jsx-a11y"]] لأن Next سجّله قبلك. و [[no-floating-promises]] وتصلّحها بـ [[void]] في كل حتة من غير تفكير، فبتخبّي نفس الـ bug. ونسيان [[projectService]]، فكل القواعد الـ TypeChecked تقع بخطأ «You have used a rule which requires type information». وفي الانترفيو: «إيه الفرق بين floating promise و misused promise؟» الأولى Promise محدش مستنيه، والتانية Promise في مكان مستني قيمة عادية.`
          },
          teach: R`## الملف ده بيعمل إيه

ده ملف إعدادات eslint لمشروع Next بـ TypeScript. كله عبارة عن **array** (قايمة) من objects، وكل object بيقول «على الملفات دي، طبّق القواعد دي». eslint بيقرا القايمة من فوق لتحت، ولو اتنين قالوا حاجة مختلفة عن نفس القاعدة، **اللي تحت بيكسب**. ودي فكرة الملف كله: نبدأ بإعدادات جاهزة ونشدّد عليها تحت.

اتشغّل على ويندوز (Node 24) في مشروع فيه [[next@16.3]] و [[eslint@9.39]] و [[eslint-config-next@16.3]] و [[typescript@6.0]] و [[typescript-eslint@8.71]]، و [[tsconfig.json]] فيه [[strict]] و [[jsx: "preserve"]].

> [[eslint-config-next]] محتاج [[next]] نفسه متسطّب: من غيره eslint وقع بـ [[Cannot find module 'next/dist/compiled/babel/eslint-parser']]. في مشروع Next حقيقي ده مش مشكلة.

---

## السطور ١ لـ ٥: الـ imports

~~~text
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier/flat";
~~~

[[import X from "package"]] يعني «هات اللي الباكدج دي بتصدّره وسمّيه X». والأقواس [[{ }]] في السطر الأول معناها «هات الحاجتين دول بأساميهم بالظبط».

| الاسم | جاي منين | هو إيه |
|---|---|---|
| [[defineConfig]] | eslint نفسه | دالة بتلف الـ array. بتدّي autocomplete في VS Code، وبتفهم [[extends]] |
| [[globalIgnores]] | eslint نفسه | فولدرات متتفحصش خالص |
| [[nextVitals]] | [[eslint-config-next]] | إعدادات Next الجاهزة ([[core-web-vitals]] النسخة الأشد اللي بتهتم بسرعة الصفحة) |
| [[tseslint]] | [[typescript-eslint]] | الـ parser اللي بيفهم TypeScript، وقواعده |
| [[jsxA11y]] | [[eslint-plugin-jsx-a11y]] | قواعد الـ accessibility (a11y اختصار: a وبعدها ١١ حرف وبعدها y) |
| [[prettier]] | [[eslint-config-prettier]] | مش قواعد: ده بيقفل قواعد الشكل |

و [[.mjs]] في اسم الملف معناها «اقرا الملف ده كـ ES Module» حتى لو [[package.json]] مكتوب فيه [[commonjs]]، فالـ [[import]] تشتغل.

---

## [[export default defineConfig([ ... ]);]]

[[export default]] يعني ده اللي الملف بيقدّمه لما eslint يعمله import. والباقي القايمة نفسها.

---

## [[...nextVitals,]]

[[nextVitals]] نفسه array من كذا object. التلات نقط [[...]] (اسمها spread) بتفرد عناصره جوه قايمتنا، بدل ما تحط array جوه array.

جواه plugins: [[react]] و [[react-hooks]] و [[jsx-a11y]] و [[import]] و [[@next/next]]. لما طبعت القواعد الفعلية بـ [[eslint --print-config app/Checkout.tsx]] لقيت [[react-hooks]] ٧.١ مشغّل ١٦ قاعدة، منهم [[rules-of-hooks]] و [[set-state-in-effect]]. بس [[exhaustive-deps]] جاية منه [[warn]]، وقواعد jsx-a11y ٦ بس وكلهم [[warn]]: [[alt-text]] و [[aria-props]] و [[aria-proptypes]] و [[aria-unsupported-elements]] و [[role-has-required-aria-props]] و [[role-supports-aria-props]].

---

## [[tseslint.configs.recommendedTypeChecked,]]

قواعد typescript-eslint الموصى بيها، **ومعاها** القواعد اللي محتاجة تسأل TypeScript «النوع ده إيه؟». مثال: عشان تعرف إن [[saveOrder(id)]] بترجع Promise، لازم تعرف نوع الدالة، وده مش باين من شكل الكود.

---

## الـ object اللي فيه [[projectService]]

~~~text
{
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
},
~~~

- [[languageOptions]]: إعدادات اللغة. و [[parserOptions]]: إعدادات الـ parser (اللي بيحوّل الكود لشجرة eslint بيفهمها).
- [[projectService: true]]: لكل ملف، دوّر على أقرب [[tsconfig.json]] وابني منه برنامج TypeScript عشان القواعد تسأله عن الأنواع.
- [[tsconfigRootDir]]: الفولدر اللي يبدأ منه. و [[import.meta.dirname]] معناها «الفولدر اللي الملف ده فيه» (موجودة في Node 20.11 وأحدث).

جرّبت أشيل [[projectService: true]]، eslint وقع قبل ما يفحص:

~~~text الناتج
Error: Error while loading rule '@typescript-eslint/await-thenable': You have used a rule which requires type information, but don't have parserOptions set to generate type information for this file.
~~~

---

## [[{ rules: jsxA11y.flatConfigs.recommended.rules },]]

[[jsxA11y.flatConfigs.recommended]] إعداد كامل فيه حاجتين: [[plugins]] (تسجيل الـ plugin) و [[rules]] (القواعد). احنا بناخد [[.rules]] بس، لأن Next سجّل الـ plugin خلاص. جرّبت أحط الإعداد كله، ووقع:

~~~text الناتج
ConfigError: Config "jsx-a11y/recommended": Key "plugins": Cannot redefine plugin "jsx-a11y".
~~~

وبالسطر الصح، بقى فيه ٣١ قاعدة a11y شغالة بدل ٦.

---

## الـ object اللي فيه [[rules]]

~~~text
"@typescript-eslint/no-floating-promises": "error",
"@typescript-eslint/no-misused-promises": "error",
"react-hooks/exhaustive-deps": "error",
~~~

اسم القاعدة: اسم الـ plugin، وبعده [[/]]، وبعده اسم القاعدة. والقيمة [[off]] أو [[warn]] أو [[error]]. الاتنين الأوائل جايين [[error]] أصلًا من [[recommendedTypeChecked]]، فكتابتهم هنا تأكيد ووثيقة للفريق. التالتة كانت [[warn]] من Next، ولأن الـ object ده تحت، بقت [[error]].

---

## [[files]] و [[disableTypeChecked]]

~~~text
{
  files: ["**/*.{js,mjs,cjs}"],
  extends: [tseslint.configs.disableTypeChecked],
},
~~~

[[files]] بيحدد الـ object ده يتطبق على مين. [[**]] يعني أي فولدر بأي عمق، و [[*]] أي اسم، و [[{js,mjs,cjs}]] أي امتداد من التلاتة. و [[extends]] يعني «حط الإعداد ده هنا». و [[disableTypeChecked]] بيقفل القواعد اللي محتاجة أنواع على ملفات الـ JS دي.

ليه؟ لأن [[eslint.config.mjs]] نفسه ملف JS مش جوه [[tsconfig.json]]. شلت الـ object ده وجرّبت:

~~~text الناتج
nx/eslint.config.mjs
  0:0  error  Parsing error: ...\eslint.config.mjs was not found by the project service. Consider either including it in the tsconfig.json or including it in allowDefaultProject
~~~

---

## [[prettier,]] و [[globalIgnores(...)]]

[[prettier]] في **الآخر** عشان يقفل أي قاعدة شكل اتفتحت فوق (اللي تحت بيكسب). و [[globalIgnores]] فولدرات متولّدة متتفحصش: [[.next]] (الـ build بتاع Next) و [[out]] و [[build]] و [[next-env.d.ts]] (Next بيكتبه لوحده).

---

## نشغّله على [[app/Checkout.tsx]] اللي في «جرّب»

~~~text الناتج (الرسايل مختصرة)
nx/app/Checkout.tsx
  12:5   error    Promises must be awaited, end with a call to .catch, ...      @typescript-eslint/no-floating-promises
  15:6   error    React Hook useEffect has a missing dependency: 'orderId' ...   react-hooks/exhaustive-deps
  17:3   error    Promises must be awaited, end with a call to .catch, ...      @typescript-eslint/no-floating-promises
  20:5   error    Visible, non-interactive elements with click handlers ...      jsx-a11y/click-events-have-key-events
  20:5   error    Avoid non-native interactive elements. ...                     jsx-a11y/no-static-element-interactions
  20:18  error    Promise-returning function provided to attribute where a void return was expected  @typescript-eslint/no-misused-promises
  21:7   warning  Using $__bt<img>$__bt could result in slower LCP ...            @next/next/no-img-element
  21:7   error    img elements must have an alt prop, ...                        jsx-a11y/alt-text

✖ 8 problems (7 errors, 1 warning)
~~~

| السطر | الكود | القاعدة | الـ bug |
|---|---|---|---|
| ١٢ | [[fetch(...).then(...)]] جوه الـ effect من غير [[.catch]] | no-floating-promises | لو الطلب فشل، الخطأ بيضيع |
| ١٥ | الـ deps فاضية | exhaustive-deps | الـ effect مش هيعيد لما [[orderId]] يتغير |
| ١٧ | [[saveOrder(orderId);]] في جسم الـ component | no-floating-promises | بيتنادى مع كل render، والخطأ بيضيع |
| ٢٠ | [[<div onClick=...>]] | click-events-have-key-events و no-static-element-interactions | مش شغال بالكيبورد |
| ٢٠ | [[onClick={() => saveOrder(orderId)}]] | no-misused-promises | React مش بيستنى الـ Promise |
| ٢١ | [[<img src="/logo.png" />]] | alt-text و no-img-element | قارئ الشاشة مش هيعرف الصورة دي إيه، و Next عايزك تستخدم [[next/image]] |

وبعد الحل (الكود اللي تحت «جرّب»)، [[npx eslint app/Checkout.tsx]] مطبعش حاجة وخرج بـ [[0]].

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[...nextVitals]] | قواعد React و hooks و Next جاهزة |
| [[recommendedTypeChecked]] و [[projectService]] | القواعد اللي بتفهم الأنواع، وتلاقي الـ tsconfig |
| [[jsxA11y.flatConfigs.recommended.rules]] | الـ a11y كاملة، من غير تسجيل الـ plugin تاني |
| [[rules]] بإيدك | نشدّد [[exhaustive-deps]] لـ error |
| [[disableTypeChecked]] على JS | ملفات الإعداد مش في tsconfig |
| [[prettier]] في الآخر | الشكل لـ prettier لوحده |

والقاعدة اللي تمشي عليها في أي flat config: الأعم فوق، والأخص تحت.`,
          lines: [
            "defineConfig و globalIgnores من eslint نفسه.",
            "إعدادات Next: react و react-hooks و jsx-a11y و next، والقواعد المهمة لـ Core Web Vitals.",
            "typescript-eslint: الـ parser والقواعد.",
            "plugin الـ accessibility، عشان ناخد قايمة قواعده الكاملة.",
            "بيقفل قواعد الشكل عشان prettier يقرر لوحده.",
            "الملف بيصدّر array الإعدادات.",
            "إعدادات Next كلها (array، فبنفكّها).",
            "قواعد TypeScript اللي بتستخدم الأنواع.",
            "إعداد عشان القواعد دي تلاقي الأنواع:",
            "خيارات اللغة...",
            "...للـ parser:",
            "كل ملف يلاقي أقرب tsconfig.json.",
            "الجذر هو فولدر الملف ده.",
            "نهاية parserOptions.",
            "نهاية languageOptions.",
            "نهاية الـ object.",
            "كل قواعد jsx-a11y الموصى بيها (الـ plugin متسجّل من Next).",
            "قواعد بنشدّدها بإيدنا:",
            "القواعد:",
            "Promise محدش عمله await ولا catch: خطأ.",
            "دالة async في مكان مش مستني Promise: خطأ.",
            "dependency ناقصة في useEffect: خطأ مش تحذير.",
            "نهاية rules.",
            "نهاية الـ object.",
            "ملفات JS العادية (زي الملف ده):",
            "على الملفات دي بس...",
            "...اقفل القواعد اللي محتاجة أنواع.",
            "نهاية الـ object.",
            "prettier في الآخر عشان يكسب على أي قاعدة شكل قبله.",
            "متفحصش الفولدرات المتولّدة.",
            "نهاية الإعدادات."
          ],
          sol: R`[[npx eslint .]] بيطلّع [[8 problems (7 errors, 1 warning)]] على الأربع غلطات:

[[react-hooks/exhaustive-deps]]: [[React Hook useEffect has a missing dependency: 'orderId']]. لو orderId اتغير، الـ component هيفضل عارض إجمالي الأوردر القديم.

[[@typescript-eslint/no-floating-promises]] مرتين: على الـ fetch جوه الـ effect (من غير catch)، وعلى [[saveOrder(orderId);]] في الـ render. الأخطاء بتضيع، وكمان saveOrder بيتنادى مع كل render.

[[@typescript-eslint/no-misused-promises]]: [[Promise-returning function provided to attribute where a void return was expected]] على الـ onClick.

[[jsx-a11y/alt-text]]، و [[jsx-a11y/click-events-have-key-events]] و [[jsx-a11y/no-static-element-interactions]] على الـ div، و [[@next/next/no-img-element]] (تحذير: استخدم [[next/image]]).

التصليح في الحل: deps فيها [[orderId]] و cleanup، و [[.catch]] على السلسلة، و [[button]] بدل div، و [[() => void saveOrder(orderId)]]، والـ saveOrder اتشالت من الـ render. بعدها [[npx eslint app/Checkout.tsx]] مبيطبعش حاجة.`,
          solCode: R`"use client";
import { useEffect, useState } from "react";

async function saveOrder(id: string): Promise<void> {
  await fetch("/api/orders/" + id, { method: "POST" });
}

export function Checkout({ orderId }: { orderId: string }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let alive = true;
    fetch("/api/orders/" + orderId)
      .then((r) => r.json() as Promise<{ total: number }>)
      .then((d) => { if (alive) setTotal(d.total); })
      .catch(console.error);
    return () => { alive = false; };
  }, [orderId]);

  return <button onClick={() => void saveOrder(orderId)}>Pay {total}</button>;
}`
        },
        {
          cmd: "prettier",
          title: "شكل واحد للكود كله",
          desc: R`[[prettier --write]] بيعيد كتابة الملفات بشكل موحّد: مسافات، وعلامات تنصيص، وطول سطر. [[--check]] مبيعدّلش حاجة، بيقولك بس لو فيه ملف مش متنسّق ويفشل، ودي اللي في CI.

القاعدة: [[--write]] على جهازك، و [[--check]] في CI.`,
          example: R`npx prettier --check .
npx prettier --write .
npx prettier --write "src/**/*.{ts,tsx}"
npx prettier --list-different .
git diff --stat`,
          try: R`بوّظ المسافات في ملف عمدًا، [[--check]] هيقولك اسمه، و [[--write]] يرجّعه.`,
          deep: {
            why: "من غيره كل واحد في الفريق (أو انت بين يوم والتاني) بيكتب بشكل مختلف، والـ diff بيتملى سطور متغيرة عشان مسافة. prettier بينهي النقاش: الشكل بيقرره هو.",
            how: R`prettier مش بيحاول «يصلّح» شكلك. بيرمي الشكل كله ويطبع الكود من الأول بقواعده، فأي اتنين يكتبوا نفس الكود يطلعلهم نفس الملف بالظبط.

[[--check]] بيعمل نفس الشغل في الذاكرة ويقارن: لو الناتج مختلف عن الملف، يطبع اسمه ويرجع exit code 1. مبيلمسش حاجة، فآمن في CI. و [[--list-different]] نفس الفكرة بس بيطبع الأسماء بس، مفيد في السكربتات.

بيفهم JS و TS و JSX و CSS و JSON و Markdown و YAML و HTML. واللي عايزه يتجاهله تحطه في [[.prettierignore]] (نفس شكل [[.gitignore]])، وهو أصلًا بيتجاهل اللي في [[.gitignore]].

والـ glob لازم بين علامات تنصيص عشان prettier هو اللي يفسّره مش الشيل، لأن bash و PowerShell بيفهموا [[**]] بشكل مختلف.`,
            when: "مرة واحدة [[--write .]] على المشروع كله في commit لوحده، وبعدها lint-staged بيظبط الملفات اللي بتتغير بس، و [[--check]] في CI.",
            mistakes: R`تعمل [[--write .]] على مشروع قديم في نفس الـ commit مع تعديل حقيقي، فالمراجع يلاقي ٣٠٠ ملف متغيرين ومش لاقي تعديلك. خليه commit لوحده اسمه [[style: format everything]]. وتحط [[--write]] في CI، فيعدّل الملفات على ماكينة CI ويعدّي، والمشروع عندك يفضل زي ما هو.`
          },
          teach: R`## prettier بيعمل إيه

[[prettier]] بياخد الكود، يرمي شكله كله، ويكتبه من الأول بقواعده هو. فمهما كتبت المسافات والتنصيص إزاي، الناتج واحد. وليه وضعين: يعدّل الملفات ([[--write]])، أو يفحص بس ويقولك مين مش متنسّق ([[--check]]).

كل اللي تحت اتشغّل على ويندوز في مشروع الـ lab بـ Prettier 3.9. بوّظت [[src/sum.ts]] كده:

~~~text src/sum.ts (متبوّظ)
export   function sum(a:number,b:number){
        return a+b}
~~~

---

## ١. [[npx prettier --check .]]

~~~text الناتج
Checking formatting...
[warn] src/sum.ts
[warn] Code style issues found in the above file. Run Prettier with --write to fix.
~~~

[[[warn]]] قبل كل ملف شكله مختلف. والأمر خرج بـ exit code [[1]]، وده اللي بيوقّع الـ CI. ولو كله تمام بيطبع [[All matched files use Prettier code style!]] ويخرج بـ [[0]]. و [[--check]] **مبيعدّلش** أي ملف، عشان كده هو اللي ينفع في CI.

---

## ٢. [[npx prettier --write .]]

~~~text الناتج
eslint.config.js 28ms (unchanged)
package-lock.json 28ms (unchanged)
package.json 2ms (unchanged)
src/sum.test.ts 29ms (unchanged)
src/sum.ts 9ms
tsconfig.json 2ms (unchanged)
~~~

بيطبع كل ملف عدّى عليه والوقت اللي خده ([[ms]] = millisecond، جزء من ألف من الثانية). [[(unchanged)]] يعني الملف كان متنسّق ومتلمسش، واللي من غيرها هو اللي اتعدّل. والملف بقى:

~~~text src/sum.ts بعد --write
export function sum(a: number, b: number) {
  return a + b;
}
~~~

مسافة بعد [[:]]، ومسافتين للـ indent، و [[;]] في آخر الجملة، وكل ده من غير ما يغيّر معنى الكود.

> لاحظ إن prettier عدّى على [[package.json]] و [[tsconfig.json]] كمان: بيفهم JSON و CSS و Markdown و YAML و HTML مش JS بس. وتجاهل [[node_modules]] لوحده لأنه بيقرا [[.gitignore]].

---

## ٣. [[npx prettier --write "src/**/*.{ts,tsx}"]]

بدل [[.]] تدّيله نمط (glob) يحدد الملفات:

| الحتة | معناها |
|---|---|
| [[src/]] | جوه فولدر src |
| [[**/]] | في أي فولدر جوه، بأي عمق |
| [[*]] | أي اسم ملف |
| [[.{ts,tsx}]] | امتداده ts أو tsx |

### ليه علامات التنصيص؟

عشان prettier هو اللي يفهم النمط، مش الـ shell. جرّبته من غير تنصيص:

~~~bash
npx prettier --check src/**/*.{ts,tsx}
~~~

~~~text الناتج في Git Bash
[error] No files matching the pattern were found: "src/**/*.tsx".
~~~

bash فك [[{ts,tsx}]] لنمطين منفصلين قبل ما prettier يشوفهم، ومفيش ملفات [[.tsx]]، فبعت النمط زي ما هو و prettier اشتكى (exit code [[2]]). وفي PowerShell 7 الوضع أوحش:

~~~text الناتج في PowerShell
ParserError:
   | npx prettier --check src/**/*.{ts,tsx}
   |                                  ~
   | Missing argument in parameter list.
~~~

PowerShell فاكر إن الفاصلة جوه الأقواس جزء من كود PowerShell. ومع التنصيص الأمر اشتغل في الاتنين: [[All matched files use Prettier code style!]].

---

## ٤. [[npx prettier --list-different .]]

~~~text الناتج
src/sum.ts
~~~

نفس شغل [[--check]] (مبيعدّلش، وبيخرج بـ [[1]] لو فيه ملف مختلف)، بس بيطبع أسامي الملفات بس من غير [[[warn]]] ولا كلام. مفيد لو هتدّي الناتج لأمر تاني في سكربت.

---

## ٥. [[git diff --stat]]

بعد [[--write]] بتبص Git شايف إيه اتغير. ضفت سطر متبوّظ ([[export   const double=(n:number)=>{ return n*2 }]]) وعملت [[--write .]]:

~~~text الناتج
 src/sum.ts | 3 +++
 1 file changed, 3 insertions(+)
~~~

[[--stat]] بيطبع ملخص: اسم كل ملف وعدد السطور اللي اتضافت ([[+]]) أو اتشالت ([[-]]). السطر الواحد بقى ٣ سطور:

~~~text
export const double = (n: number) => {
  return n * 2;
};
~~~

لو [[--stat]] طلّع عشرات الملفات وانت عدّلت ملف واحد، يبقى المشروع ما كانش متنسّق: اعمل commit للتنسيق لوحده.

---

## فخ ويندوز: CRLF

بعد [[git checkout -- src/sum.ts]] على ويندوز، [[--check]] رجع قال [[[warn] src/sum.ts]] والملف شكله سليم! السبب: Git هنا متظبط بـ [[core.autocrlf=true]]، فكتب الملف بنهاية سطر CRLF (ويندوز)، و prettier من نسخة 2 الافتراضي عنده [[endOfLine: "lf"]]، فشايف كل سطر غلط. [[--write]] رجّعه LF. الحل الدائم في درس [[.editorconfig و .prettierrc]] وفي [[.gitattributes]].

---

## الخلاصة

| الأمر | بيعدّل؟ | exit code لو فيه ملف مش متنسّق | فين |
|---|---|---|---|
| [[--check .]] | لأ | [[1]] | CI |
| [[--write .]] | آه | [[0]] | جهازك |
| [[--write "glob"]] | آه، الملفات دي بس | [[0]] | جهازك |
| [[--list-different .]] | لأ | [[1]] | سكربتات |
| [[git diff --stat]] | - | - | قبل الـ commit |`,
          lines: [
            "افحص كل الملفات، ومتعدّلش حاجة.",
            "رتّب كل الملفات وعدّلها.",
            "رتّب ملفات TS في src بس. التنصيص عشان prettier يفسّر الـ glob مش الشيل.",
            "اطبع أسماء الملفات اللي مش متنسّقة بس.",
            "شوف write غيّر إيه قبل ما تعمل commit."
          ],
          sol: R`بعد ما تبوّظ [[src/sum.ts]]، [[npx prettier --check src]] بيطبع [[[warn] src/sum.ts]] و [[[warn] Code style issues found in the above file. Run Prettier with --write to fix.]] ويخرج بـ 1. و [[--write]] بيطبع اسم الملف والوقت ([[src/sum.ts 38ms]]) ويرجّعه لـ [[export function sum(a: number, b: number) {]] بمسافتين.

بعدها [[git diff --stat]] بيوريك الملفات اللي اتغيرت، والمفروض يبقى ملفك بس. لو لقيت عشرات الملفات اتغيرت، يبقى المشروع ما كانش متنسّق من الأول: اعمل commit للتنسيق لوحده عشان ما يختلطش بشغلك.

الغلط الشائع: [[prettier --check .]] يمسك [[dist]] أو ملفات متولّدة. prettier بيتجاهل اللي في [[.gitignore]] و [[.prettierignore]]، فحطها هناك. ولو [[--write]] ما غيّرش حاجة والـ [[--check]] لسه بيشتكي، اتأكد إن مفيش اتنين prettier config متعارضين.`
        },
        {
          cmd: "tsc --noEmit",
          title: "افحص الأنواع من غير build",
          desc: R`[[tsc --noEmit]] بيقرا المشروع كله بـ [[tsconfig.json]] ويطلّع أخطاء الأنواع من غير ما يكتب ولا ملف JS.

ده مهم لأن Vite و esbuild و tsx بيشيلوا الأنواع ويشغّلوا الكود من غير ما يفحصوها، فالمشروع ممكن يشتغل ويتبني وهو مليان أخطاء.`,
          example: R`npx tsc --noEmit
npx tsc --noEmit -p apps/web/tsconfig.json
npx tsc --noEmit --watch
npx tsc --noEmit --pretty false | grep -c "error TS"
npx tsc --showConfig`,
          try: R`اكتب [[const n: number = "5"]] في مشروع Vite وشغّل [[npm run dev]]: هيشتغل عادي. وبعدين [[tsc --noEmit]] هيمسكه.`,
          deep: {
            why: "TypeScript فايدته كلها إنه يمسك الغلط قبل التشغيل. بس أدوات التشغيل السريعة بتتجاهل الأنواع عشان تبقى سريعة، فلو معندكش خطوة فحص منفصلة، الأنواع بقت تعليقات ملهاش لازمة.",
            how: R`[[tsc]] هو الـ compiler الرسمي، وعادةً بيعمل حاجتين: يفحص الأنواع، ويطلّع JS. [[--noEmit]] بيقوله اعمل الأولى بس، لأن الـ build نفسه بيعمله Vite أو Next أو esbuild.

بيقرا [[tsconfig.json]] من الفولدر الحالي: الملفات اللي في [[include]]، والإعدادات زي [[strict]]. و [[-p]] بيحدد tsconfig تاني، مفيد في monorepo لما كل تطبيق ليه واحد. و [[--showConfig]] بيطبع الإعدادات النهائية بعد ما يدمج [[extends]]، فتعرف إيه اللي شغال فعلًا.

الخطأ شكله [[src/a.ts(12,5): error TS2322: Type 'string' is not assignable to type 'number'.]]. الرقم بعد TS كود الخطأ، دوّر بيه لو مش فاهمه.

و [[--watch]] بيسيبه شغال ويعيد الفحص مع كل حفظ، وأسرع من المرة الأولى لأنه فاكر اللي فحصه.`,
            when: "في سكربت [[typecheck]]، وفي CI قبل الاختبارات، وقبل أي release. VS Code بيعرض نفس الأخطاء بس للملفات المفتوحة، و tsc بيفحص الكل.",
            mistakes: R`تفتكر إن [[npm run build]] نجح يبقى الأنواع سليمة، وده مش صح مع Vite. و [[skipLibCheck: false]] في مشروع كبير، فالفحص ياخد دقيقة بسبب ملفات الأنواع اللي في node_modules: خليها true. وفي monorepo تشغّل tsc في الجذر ومفيش tsconfig هناك، فيطبع الـ help بدل ما يفحص: شغّله في كل باكدج ([[pnpm -r run typecheck]]).`
          },
          teach: R`## الفكرة

[[tsc]] (TypeScript Compiler) بيقرا [[tsconfig.json]]، يجمع كل ملفات المشروع، ويتأكد إن الأنواع ماشية مع بعض. و [[--noEmit]] (emit = يطلّع) بيقوله: افحص بس، متكتبش ولا ملف [[.js]]، لأن الـ build بيعمله Vite أو Next.

اتجرّب على ويندوز في مشروع Vite فيه [[src/n.ts]]:

~~~text src/n.ts
const n: number = "5";
document.body.textContent = String(n);
export {};
~~~

[[: number]] بيقول إن [[n]] رقم، وبعدين بنحط فيه [["5"]] وده نص (string). غلط واضح.

---

## الأول: Vite مش شايفه

~~~text npx vite build
vite v8.3.3 building client environment for production...
✓ 4 modules transformed.
dist/index.html                0.07 kB │ gzip: 0.09 kB
dist/assets/index-MWD_-mWD.js  0.71 kB │ gzip: 0.41 kB
✓ built in 114ms
~~~

نجح وخرج بـ [[0]]. Vite بيشيل الأنواع ([[: number]]) ويكمّل من غير ما يسأل هي صح ولا لأ، عشان يبقى سريع. عشان كده محتاج خطوة فحص لوحدها.

---

## ١. [[npx tsc --noEmit]]

~~~text الناتج
src/n.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.
~~~

| الحتة | معناها |
|---|---|
| [[src/n.ts]] | الملف |
| [[(1,7)]] | سطر ١، عمود ٧ (أول حرف في [[n]]) |
| [[error TS2322]] | رقم الخطأ. [[TS2322]] = «النوع ده مينفعش يتحط في النوع ده». دوّر بالرقم لو الرسالة مش واضحة |
| الرسالة | [[string]] مينفعش يتحط مكان [[number]] |

وفي ترمنال عادي (مش ناتج متحوّل لملف) tsc بيطبعها بشكل أحلى: بألوان، وبيوريك السطر نفسه وتحته [[~]] على الغلط، وفي الآخر [[Found 1 error in src/n.ts:1]].

### الـ exit code بيختلف بين النسخ

| النسخة | خطأ أنواع | مفيش [[tsconfig.json]] |
|---|---|---|
| TypeScript 6.0 (ويندوز ولينكس [[node:22-slim]]) | [[2]] | [[1]] وبيطبع الـ help |
| TypeScript 7.0 (النسخة المكتوبة بـ Go) | [[1]] | [[1]] وبيطبع الـ help |

الاتنين مش صفر، فالـ CI و [[&&]] هيقفوا في الحالتين. متكتبش سكربت بيستنى رقم معين.

---

## ٢. [[npx tsc --noEmit -p apps/web/tsconfig.json]]

[[-p]] اختصار [[--project]]: استخدم الـ tsconfig ده بدل اللي في الفولدر الحالي. جرّبته من فولدر فوق المشروع:

~~~text الناتج
vt/src/n.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.
~~~

المسار في الناتج بقى بيبدأ من الفولدر اللي انت فيه. ولو المسار غلط:

~~~text الناتج
error TS5058: The specified path does not exist: 'vt/nope.json'.
~~~

---

## ٣. [[npx tsc --noEmit --watch]]

~~~text الناتج
8:31:51 PM - Starting compilation in watch mode...

src/n.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.

8:31:51 PM - Found 1 error. Watching for file changes.
~~~

وبيفضل شغال، ومع كل حفظ يعيد الفحص ويطبع النتيجة الجديدة. [[Ctrl+C]] يوقفه.

---

## ٤. [[npx tsc --noEmit --pretty false | grep -c "error TS"]]

من جوه لبرة:

1. [[--pretty false]]: من غير ألوان ومن غير السطور الزيادة، كل خطأ في سطر واحد. (tsc أصلًا بيعمل كده لوحده لما الناتج رايح لـ pipe، بس كتابتها بتضمن ده.)
2. [[|]] (pipe): ابعت الناتج للأمر اللي بعدي بدل الشاشة.
3. [[grep -c "error TS"]]: [[grep]] بيدوّر على السطور اللي فيها الكلام ده، و [[-c]] (count) بيطبع عددهم بس.

~~~text الناتج
1
~~~

[[grep]] أمر لينكس، وموجود في Git Bash. في PowerShell نفس الفكرة: [[(npx tsc --noEmit --pretty false | Select-String "error TS").Count]].

---

## ٥. [[npx tsc --showConfig]]

بيطبع الإعدادات النهائية بعد ما يدمج [[extends]]، والأهم: قايمة الملفات اللي هيفحصها فعلًا. على مشروع الـ lab:

~~~text الناتج (TypeScript 6.0)
{
    "compilerOptions": {
        "strict": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "target": "es2022",
        "noEmit": true,
        "skipLibCheck": true
    },
    "files": [
        "./src/n.ts",
        "./src/price.test.ts",
        "./src/price.ts",
        "./src/sum.test.ts",
        "./src/sum.ts",
        "./src/cart/cart.test.ts"
    ],
    "include": [
        "src"
    ]
}
~~~

لو tsc مش بيمسك غلط في ملف، دوّر عليه في [[files]] هنا. مش موجود؟ يبقى [[include]] مش شايفه.

---

## TypeScript 7

وقت الكتابة دي [[npm i -D typescript]] بيجيب 7.0، وده نسخة مكتوبة بـ Go (أسرع بكتير)، والأوامر اللي فوق كلها اشتغلت عليها بنفس الشكل. بس [[typescript-eslint]] لسه بيطلب أقل من 6.1، فلو بتستخدمه ثبّت [[typescript@6]] (درس «سكربتات الفحص»).

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[tsc --noEmit]] | يفحص المشروع، من غير ملفات |
| [[-p file]] | بـ tsconfig معين |
| [[--watch]] | يفضل شغال ويعيد مع كل حفظ |
| [[--pretty false]] | خطأ في سطر، للـ grep والسكربتات |
| [[--showConfig]] | الإعدادات والملفات الفعلية |

و [[vite build]] أو [[npm run dev]] نجحوا مش معناها إن الأنواع سليمة: ده شغل [[tsc --noEmit]] لوحده.`,
          lines: [
            "افحص أنواع المشروع كله، ومتطلّعش ملفات.",
            "نفسه بـ tsconfig معين ([[-p]] project)، زي تطبيق جوه monorepo.",
            "سيبه شغال ويعيد الفحص مع كل حفظ.",
            "عدّ الأخطاء. [[--pretty false]] بيخلي كل خطأ في سطر عشان grep.",
            "اطبع الإعدادات النهائية بعد ما يدمج extends."
          ],
          sol: R`[[npm run dev]] بيشتغل والصفحة بتفتح عادي، و [[vite build]] كمان بينجح ([[✓ built in 154ms]])، لأن Vite بيشيل الأنواع بس بـ esbuild من غير ما يفحصها. المتصفح نفسه هيطبع [["5"]] كنص.

[[npx tsc --noEmit]] بيمسكه:

[[src/n.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.]] ويخرج بـ 2 (TypeScript 7 بيخرج بـ 1، والاتنين فشل). وبـ [[--pretty false]] مع [[grep -c "error TS"]] بيطبع [[1]].

لو [[tsc]] طبع صفحة الـ help بدل ما يفحص، يبقى مفيش [[tsconfig.json]] في الفولدر. ولو ما مسكش الغلط، يبقى الملف مش جوه [[include]]، أو المشروع فيه [[tsconfig.json]] بـ [[references]] (قالب Vite الجديد)، وساعتها الصح [[tsc -b]] أو [[tsc --noEmit -p tsconfig.app.json]].`
        },
        {
          cmd: ".editorconfig و .prettierrc",
          title: "إعدادات الشكل للفريق كله",
          desc: R`[[.editorconfig]] بيقول لأي محرر (VS Code و vim و JetBrains) يكتب بإيه: مسافات ولا tab، وكام، ونهاية السطر LF. و [[.prettierrc]] فيه اختيارات prettier القليلة.

الاتنين في جذر المشروع وبيدخلوا Git، فكل الفريق بيشتغل بنفس الإعدادات.`,
          example: R`# .editorconfig
root = true
[*]
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
# .prettierrc
{ "singleQuote": true, "semi": true, "printWidth": 100 }`,
          try: R`اعمل الملفين في مشروع الـ lab، وافتح ملف جديد في VS Code واضغط Tab: المفروض يكتب مسافتين.`,
          flag: "script",
          deep: {
            why: "ويندوز بيكتب CRLF ولينكس LF، وواحد بيحب tab والتاني مسافتين. من غير ملف مشترك، كل commit فيه سطور «اتغيرت» وهي نفس الكلام، والـ diff بيبقى ملوش لازمة.",
            how: R`[[.editorconfig]] بيشتغل وانت بتكتب: المحرر نفسه بيقراه (VS Code محتاج extension اسمها EditorConfig). [[root = true]] معناها «متدوّرش على إعدادات في الفولدرات اللي فوق». وسطر [*] معناه الإعدادات اللي تحته لكل الملفات، وتقدر تعمل قسم تاني لـ [[*.md]] بإعدادات مختلفة.

[[.prettierrc]] بيقراه prettier وقت التشغيل. وprettier كمان بيقرا [[.editorconfig]] (المسافات ونهاية السطر) لو مفيش إعداد يعارضه. اختياراته قليلة عن قصد: علامات التنصيص، والفاصلة المنقوطة، وطول السطر، والفاصلة الأخيرة.

ولو بتستخدم eslint مع prettier، ضيف [[eslint-config-prettier]] في آخر إعدادات eslint: بيقفل قواعد eslint اللي بتتدخل في الشكل، فالاتنين ميتخانقوش.

و [[end_of_line = lf]] بيحل نص مشكلة ويندوز ولينكس، والنص التاني في Git نفسه (درس [[.gitattributes]] في تاب git).`,
            when: "أول يوم في أي مشروع، وأي مشروع عليه أكتر من شخص أو أكتر من نظام تشغيل.",
            mistakes: R`إعدادات prettier في [[.prettierrc]] وكمان في package.json تحت [[prettier]]، فواحد بس اللي بيتقري وتتلخبط أنهي. وتغيّر [[printWidth]] على مشروع قايم من غير [[prettier --write .]] في commit لوحده، فأول حد يلمس أي ملف يلاقي الملف كله اتغير في الـ diff.`
          },
          teach: R`## الفكرة

المثال ملفين مش أوامر: [[.editorconfig]] بيقراه المحرر وانت بتكتب، و [[.prettierrc]] بيقراه prettier لما يشتغل. الاتنين في جذر المشروع وبيدخلوا Git، فأي حد يعمل clone بياخد نفس الإعدادات. والنقطة في أول الاسم معناها ملف مخفي على لينكس والماك (عُرف ملفات الإعدادات).

---

## [[.editorconfig]] سطر سطر

السطر اللي بيبدأ بـ [[#]] تعليق، والباقي [[مفتاح = قيمة]].

### [[root = true]]

المحرر بيدوّر على [[.editorconfig]] في فولدر الملف، وبعدين اللي فوقه، وفوقه، لحد ما يلاقي ملف فيه [[root = true]] فيقف. كده إعدادات فولدر برّه المشروع (زي فولدر الـ home) متدخلش.

### [[[*]]]

اللي بين الأقواس المربعة نمط ملفات، والإعدادات اللي تحته تخصّه. [[*]] يعني كل الملفات. وتقدر تزوّد قسم زي [[[*.md]]] تحته بإعدادات مختلفة.

### الإعدادات الأربعة

| الإعداد | القيمة | معناها |
|---|---|---|
| [[indent_style]] | [[space]] | الـ indent مسافات مش tab |
| [[indent_size]] | [[2]] | مسافتين لكل مستوى |
| [[end_of_line]] | [[lf]] | نهاية السطر LF |
| [[insert_final_newline]] | [[true]] | سطر فاضي في آخر الملف |

### LF و CRLF

آخر كل سطر في الملف فيه حرف مخفي بيقول «سطر جديد». لينكس والماك بيكتبوا حرف واحد اسمه LF (Line Feed، [[\n]]). ويندوز بيكتب اتنين: CR (Carriage Return، [[\r]]) وبعده LF، يعني CRLF. لو كل واحد في الفريق بيكتب بنوع، Git بيشوف كل السطور اتغيرت وهي زي ما هي.

---

## [[.prettierrc]]

~~~text .prettierrc
{ "singleQuote": true, "semi": true, "printWidth": 100 }
~~~

| الاختيار | الافتراضي | هنا |
|---|---|---|
| [[singleQuote]] | [[false]]: تنصيص مزدوج [["hi"]] | [[true]]: مفرد [['hi']] |
| [[semi]] | [[true]] | [[true]]: [[;]] في آخر كل جملة |
| [[printWidth]] | [[80]] | [[100]] حرف قبل ما يكسر السطر |

---

## نجرّب: prettier بيقرا الاتنين

اتجرّب على ويندوز بـ Prettier 3.9، على ملف [[a.js]]:

~~~text a.js
const s = "hi"
function f(){
return s}
~~~

~~~bash
npx prettier a.js
~~~

من غير [[--write]] prettier بيطبع الناتج على الشاشة بس ومبيعدّلش الملف:

~~~text الناتج
const s = 'hi';
function f() {
  return s;
}
~~~

التنصيص بقى مفرد ([[singleQuote]])، و [[;]] اتضافت ([[semi]])، والـ indent مسافتين. المسافتين دول جايين من [[.editorconfig]]: لما غيّرت [[indent_size = 4]] وشغّلت نفس الأمر:

~~~text الناتج
const s = 'hi';
function f() {
    return s;
}
~~~

يعني prettier بيقرا [[indent_style]] و [[indent_size]] و [[end_of_line]] من [[.editorconfig]] لو [[.prettierrc]] مقالش حاجة عنهم. و [[npx prettier --find-config-path a.js]] بيطبع [[.prettierrc]]: الملف اللي هيتقري فعلًا.

### [[end_of_line = lf]] في الواقع

عملت ملف بنهاية سطر CRLF وشغّلت [[npx prettier --check crlf.js]]:

~~~text الناتج
[warn] crlf.js
[warn] Code style issues found in the above file. Run Prettier with --write to fix.
~~~

الملف شكله سليم بس نهاية السطر غلط، و prettier بيمسكها. ده بيحصل على ويندوز لو Git بيحوّل لـ CRLF ([[core.autocrlf=true]])، والحل في [[.gitattributes]] (تاب git).

---

## لو [[.prettierrc]] فيه غلط

[[.prettierrc]] من غير امتداد prettier بيقراه كـ **YAML**، و JSON السليم YAML سليم كمان. عشان كده [[{ "singleQuote": true, }]] بفاصلة زيادة اشتغل عادي، وكمان [[{ singleQuote: true }]] من غير تنصيص. بس لو نسيت القوس:

~~~text الناتج
[error] Invalid configuration for file "ec/a.js":
[error] YAML Error in ec/.prettierrc:
[error] Flow map must end with a } at line 2, column 1:
~~~

وخرج بـ [[2]]، يعني مش بيتجاهله ويكمّل.

---

## VS Code

ده من الـ docs ومش متجرّب هنا: VS Code مبيقراش [[.editorconfig]] لوحده، محتاج إضافة [[EditorConfig for VS Code]]. وبعدها شريط الحالة تحت على اليمين بيكتب [[Spaces: 2]] و [[LF]].

---

## الخلاصة

| الملف | مين بيقراه | إمتى | فيه إيه |
|---|---|---|---|
| [[.editorconfig]] | المحرر، و prettier | وانت بتكتب، ولما prettier يشتغل | المسافات ونهاية السطر |
| [[.prettierrc]] | prettier | لما prettier يشتغل | التنصيص و [[;]] وطول السطر |`,
          lines: [
            "ده الملف الرئيسي، متدوّرش على إعدادات في الفولدرات اللي فوق.",
            "الإعدادات اللي جاية لكل الملفات.",
            "مسافات مش tab.",
            "مسافتين لكل مستوى.",
            "نهاية السطر LF زي لينكس، حتى على ويندوز.",
            "سطر فاضي في آخر كل ملف.",
            "اختيارات prettier: علامة تنصيص مفردة، وفاصلة منقوطة، والسطر لحد ١٠٠ حرف."
          ],
          sol: R`في VS Code، ملف جديد والضغط على Tab بيكتب مسافتين، وتحت على اليمين في شريط الحالة هتلاقي [[Spaces: 2]] و [[LF]]. ولما تحفظ، الملف بيخلص بسطر فاضي.

ولو شغّلت [[npx prettier --write]] على ملف فيه [[const s = "hi"]] هيبقى [[const s = 'hi';]] بسبب [[singleQuote]] و [[semi]].

لو Tab لسه بيكتب ٤ مسافات: VS Code محتاج إضافة [[EditorConfig for VS Code]] عشان يقرا [[.editorconfig]]، أو إعداد [[editor.detectIndentation]] أخد المسافات من الملف المفتوح. وخلي بالك إن [[.prettierrc]] لازم يبقى سليم: prettier بيقراه كـ YAML، ففاصلة زيادة بتعدّي، بس قوس ناقص بيطلّع [[Invalid configuration]] و [[YAML Error in .prettierrc]] ويخرج بـ 2، مش بيتجاهله.`
        }
      ]
    }
  ]
});
