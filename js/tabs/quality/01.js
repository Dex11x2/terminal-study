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
npm i -D eslint prettier typescript vitest`,
  labText: "اعمل مشروع تجربة وسطّب الأدوات dev dependencies. كل أداة هنا بتشتغل من الترمنال وفي CI بنفس الأمر.",
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

بعد ما تعمل [[eslint.config.js]]، اللي بعده [[typecheck]]: من غير [[tsconfig.json]]، [[tsc --noEmit]] بيطبع صفحة الـ help ويخرج بـ 1، مش بيفحص حاجة. وبعد الـ tsconfig، [[vitest run]] من غير ملفات اختبار بيقول [[No test files found, exiting with code 1]].

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
          lines: [
            "افحص كل ملفات المشروع.",
            "افحص ملف واحد بس.",
            "صلّح اللي يتصلّح لوحده، والباقي يطلعلك.",
            "أي warning يفشّل الأمر. ده للـ CI.",
            "اعرض الـ errors بس واخفي الـ warnings.",
            "اطبع القواعد اللي بتتطبق فعلًا على الملف ده."
          ],
          sol: R`على ملف فيه [[let unused = 1;]] و [[let total = sum(1, 2);]] و [[if (total == 3)]]، مع [[js.configs.recommended]] و [[typescript-eslint]] و قاعدتين [[eqeqeq]] و [[prefer-const]]، الناتج:

[[2:5 error 'unused' is never reassigned. Use 'const' instead prefer-const]] و [[2:5 error 'unused' is assigned a value but never used @typescript-eslint/no-unused-vars]] و [[4:11 error Expected '===' and instead saw '==' eqeqeq]]، وفي الآخر [[✖ 4 problems (4 errors, 0 warnings)]] و [[2 errors and 0 warnings potentially fixable with the --fix option.]]

بعد [[--fix]]: الـ [[let]] بقت [[const]] (دي آمنة)، بس المتغير المش مستخدم لسه موجود و [[==]] زي ما هو. الاتنين محتاجين قرار منك: يمكن المتغير لازم يتمسح ويمكن نسيت تستخدمه، و [[==]] لـ [[===]] ممكن يغيّر السلوك لو النوع مختلف.

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
          lines: [
            "افحص أنواع المشروع كله، ومتطلّعش ملفات.",
            "نفسه بـ tsconfig معين ([[-p]] project)، زي تطبيق جوه monorepo.",
            "سيبه شغال ويعيد الفحص مع كل حفظ.",
            "عدّ الأخطاء. [[--pretty false]] بيخلي كل خطأ في سطر عشان grep.",
            "اطبع الإعدادات النهائية بعد ما يدمج extends."
          ],
          sol: R`[[npm run dev]] بيشتغل والصفحة بتفتح عادي، و [[vite build]] كمان بينجح ([[✓ built in 154ms]])، لأن Vite بيشيل الأنواع بس بـ esbuild من غير ما يفحصها. المتصفح نفسه هيطبع [["5"]] كنص.

[[npx tsc --noEmit]] بيمسكه:

[[src/n.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.]] ويخرج بـ 2. وبـ [[--pretty false]] مع [[grep -c "error TS"]] بيطبع [[1]].

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

لو Tab لسه بيكتب ٤ مسافات: VS Code محتاج إضافة [[EditorConfig for VS Code]] عشان يقرا [[.editorconfig]]، أو إعداد [[editor.detectIndentation]] أخد المسافات من الملف المفتوح. وخلي بالك إن الـ JSON في [[.prettierrc]] لازم يبقى سليم؛ لو فيه فاصلة زيادة prettier هيطلع error، مش هيتجاهله.`
        }
      ]
    },
    {
      t: "الاختبارات",
      l: 2,
      n: "الكود بيعمل الصح فعلًا؟ vitest و jest، ونسبة الكود اللي اتختبر",
      items: [
        {
          cmd: "vitest",
          title: "شغّل الاختبارات مرة أو مع كل حفظ",
          desc: R`[[vitest]] لوحده بيفتح وضع watch ويعيد الاختبارات مع كل حفظ، وده وانت شغال. [[vitest run]] بيشغّلهم مرة ويقفل بـ exit code، وده للـ CI والـ hooks. وتقدر تفلتر بملف أو باسم الاختبار.

و [[--passWithNoTests]] بتخلي باكدج لسه ملهاش اختبارات متفشّلش الأمر.

الدرس ده عن تشغيل الاختبارات. كتابتها نفسها (expect و mocks والوقت المزيّف) في فئة «تكتب اختبار» اللي بعد الفئة دي.`,
          example: R`npx vitest
npx vitest run
npx vitest run src/cart
npx vitest run -t "applies discount"
npx vitest run --passWithNoTests
npx vitest run --reporter=verbose`,
          try: R`اكتب [[sum.test.ts]] فيه [[expect(sum(2, 2)).toBe(4)]]، شغّل [[vitest]]، وعدّل الدالة وشوف الاختبار بيقع قدامك من غير ما تعيد التشغيل.`,
          deep: {
            why: "lint و tsc بيقولوا الكود «سليم شكلًا». بس [[calculateTotal]] بترجع الرقم الصح؟ الخصم بيتحسب قبل الضريبة ولا بعدها؟ ده محدش يعرفه غير لو شغّلت الكود فعلًا بمدخلات معروفة وقارنت الناتج.",
            how: R`vitest بيدوّر على ملفات [[*.test.ts]] و [[*.spec.ts]] (وأخواتهم js و tsx) ويشغّلها. جوه الملف: [[describe]] مجموعة، و [[it]] أو [[test]] اختبار واحد، و [[expect(x).toBe(y)]] الشرط.

الفرق المهم: [[vitest]] من غير حاجة بيقعد شغال (watch) في ترمنال عادي، ويعيد الاختبارات المتأثرة بس لما تحفظ. بس لو لقى المتغير [[CI]] (موجود في GitHub Actions)، أو الترمنال مش تفاعلي، بيشتغل مرة ويقفل. عشان كده في السكربتات اكتب [[vitest run]] صريحة ومتعتمدش على التخمين.

وبيستخدم إعدادات Vite نفسها (aliases و plugins)، فبيفهم TypeScript و JSX من غير إعداد. ولو محتاج DOM (اختبارات React components) بتحط [[environment: 'jsdom']] في [[vitest.config.ts]].

[[-t]] بيفلتر بجزء من اسم الاختبار، والمسار بيفلتر بالملفات اللي مسارها فيه الكلمة دي. و [[--reporter=verbose]] بيطبع كل اختبار باسمه بدل ملخص لكل ملف.

ولمشروع Node صغير من غير Vite، Node نفسه فيه [[node --test]] (في تاب Node).`,
            when: "watch وانت بتكتب الكود. و [[run]] في [[scripts.test]] و CI و pre-push.",
            mistakes: R`سكربت [["test": "vitest"]] من غير run، فـ [[npm run check]] في ترمنال عادي يقعد في watch ومبيكمّلش للخطوة اللي بعده، وتفتكره علّق. واختبارات بتعتمد على بعض أو على الترتيب (واحد بيسيب داتا والتاني بيعتمد عليها)، فتنجح لوحدها وتقع مع بعض. وتنسى [[await]] قبل [[expect(promise).rejects]]: في jest والنسخ القديمة الاختبار ممكن يعدّي وهو فاشل، و vitest 5 بقى يوقّعه برسالة «was not awaited».`
          },
          lines: [
            "شغّل الاختبارات وسيبها تعيد مع كل حفظ (watch).",
            "شغّلهم مرة واحدة واقفل، والـ exit code بيقول نجح ولا لأ.",
            "الملفات اللي في مسارها src/cart بس.",
            "الاختبارات اللي اسمها فيه الجملة دي بس ([[-t]]).",
            "لو مفيش ملفات اختبار أصلًا، اعتبرها نجاح.",
            "اطبع كل اختبار باسمه."
          ],
          sol: R`أول تشغيل بـ [[npx vitest]]: [[✓ src/sum.test.ts (1 test)]] و [[Test Files 1 passed (1)]] و [[Tests 1 passed (1)]]، وبعدين بيقعد مستني ([[Waiting for file changes...]]).

لما تغيّر الدالة لـ [[a - b]] وتحفظ، بيعيد الاختبار لوحده ويطبع:

[[FAIL src/sum.test.ts > adds two numbers]] و [[AssertionError: expected +0 to be 4 // Object.is equality]] وتحتها [[- 4]] و [[+ 0]]، وسهم على السطر اللي فيه [[toBe(4)]]. ترجّعها وتحفظ فيرجع أخضر.

لو ما اتعادش لما حفظت: انت شغّلت [[vitest run]] مش [[vitest]]، أو شغّال في CI (هناك بيبقى run تلقائي). ولو قال [[No test files found]]، اسم الملف لازم يخلص بـ [[.test.ts]] أو [[.spec.ts]]. واكتب [[q]] عشان تخرج.`,
          solCode: R`// src/sum.ts
export function sum(a: number, b: number) {
  return a + b;
}

// src/sum.test.ts
import { expect, test } from 'vitest';
import { sum } from './sum';

test('adds two numbers', () => {
  expect(sum(2, 2)).toBe(4);
});`
        },
        {
          cmd: "--coverage",
          title: "الاختبارات غطّت كام في المية من الكود",
          desc: R`[[--coverage]] بيعلّم كل سطر اتنفّذ وقت الاختبارات، ويطلّع جدول بالنسبة لكل ملف، وتقرير HTML تفتحه تشوف السطور الحمرا اللي محدش اختبرها.

و thresholds بتخلي الأمر يفشل لو النسبة نزلت عن حد معين.`,
          example: R`npm i -D @vitest/coverage-v8
npx vitest run --coverage
npx vitest run --coverage --coverage.thresholds.lines=80
# افتح coverage/index.html في المتصفح
npx jest --coverage`,
          try: R`شغّل [[--coverage]] على مشروع الـ lab، وافتح التقرير، وادخل على ملف فيه if واتأكد إن الاتجاهين متغطّيين.`,
          deep: {
            why: "عندك ٥٠ اختبار وحاسس إنك مغطّي. بس يمكن كلهم بيختبروا الحالة السعيدة، وفرع الـ error في [[checkout]] عمره ما اتشغّل. التقرير بيوريك الأماكن اللي محدش لمسها.",
            how: R`vitest بيستخدم V8 (محرك Node نفسه) يسجّل أنهي سطور وفروع اتنفّذت وقت الاختبارات. الناتج أربع نسب: [[Stmts]] الجمل، و [[Branch]] الفروع (كل if ليه اتجاهين)، و [[Funcs]] الدوال، و [[Lines]] السطور. والـ Branch أهمهم، لأن سطر فيه if ممكن يتحسب «متغطّي» واتجاه واحد بس اللي اتجرّب.

التقرير بيتكتب في فولدر [[coverage/]] (حطه في [[.gitignore]])، وجواه [[index.html]]: تفتحه وتدخل على أي ملف تلاقي السطور اللي متنفّذتش بالأحمر.

[[thresholds]] (في الأمر أو في [[vitest.config.ts]]) بيحوّل الرقم لشرط: لو السطور أقل من ٨٠٪، الأمر يرجع exit code 1 والـ CI يقع.

و jest فيه نفس الفكرة بـ [[--coverage]] من غير تسطيب زيادة، و [[node --test --experimental-test-coverage]] لـ test runner بتاع Node.`,
            when: "كل فترة تبص على التقرير تدوّر على كود مهم (الدفع، والصلاحيات) من غير اختبارات. و threshold في CI عشان النسبة متنزلش مع الوقت.",
            mistakes: "تطارد ١٠٠٪ فتكتب اختبارات بتنفّذ الكود من غير ما تتأكد من حاجة. التغطية بتقول السطر اتشغّل، مش إنه اتختبر صح. و threshold عالي من أول يوم على مشروع قديم، فالـ CI يفضل أحمر والناس تقفله: ابدأ بالنسبة الحالية وزوّد."
          },
          lines: [
            "سطّب مزوّد التغطية بتاع vitest (مرة واحدة).",
            "شغّل الاختبارات وسجّل السطور اللي اتنفّذت: جدول في الترمنال وفولدر coverage.",
            "نفسه، ويفشل لو السطور المتغطية أقل من ٨٠٪.",
            "نفس الفكرة في jest، من غير تسطيب زيادة."
          ],
          sol: R`على دالة فيها [[if (coupon === 'SAVE10')]] واختبار واحد من غير كوبون، الجدول طلّع [[price.ts | 66.66 | 50 | 100 | 66.66 | 3]]، يعني نص الـ branches بس (الـ if ما اتدخلش) وسطر 3 مش متغطي. وفي [[coverage/index.html]] لما تفتح [[price.ts]] هتلاقي السطر ده أحمر، وجنب الـ if علامة إن الاتجاه ده ما اتجربش.

بعد اختبار تاني بـ [['SAVE10']]: [[All files 100% Branches 100% ( 2/2 )]] و [[No files with missing coverage.]] والسطور كلها خضرا مع عدد مرات التنفيذ جنب كل سطر.

الأخطاء الشائعة: [[MISSING DEPENDENCY Cannot find dependency '@vitest/coverage-v8']] لو نسيت السطر الأول. وملف ما ظهرش في التقرير خالص لأن محدش عمله import في أي اختبار؛ دا أخطر من ٠٪ لأنك مش شايفه (حط [[coverage.include]] عشان يظهر). وافتكر إن ١٠٠٪ هنا معناها إن الاتجاهين اتشغلوا، مش إنك اختبرت القيمة الصح في كل واحد.`,
          solCode: R`// src/price.test.ts
import { expect, test } from 'vitest';
import { price } from './price';

test('no coupon', () => {
  expect(price(100)).toBe(100);
});

test('SAVE10 gives 10% off', () => {
  expect(price(100, 'SAVE10')).toBe(90);
});`
        },
        {
          cmd: "jest",
          title: "الاختبارات في مشروع قديم",
          desc: R`jest الأقدم والأشهر، وهتلاقيه في مشاريع كتير (خصوصًا backend و React Native). الأوامر شبه vitest: [[jest]] مرة واحدة، و [[--watch]] مع كل حفظ، و [[-t]] بالاسم.

بس jest مبيفهمش [[import]] لوحده، فمحتاج Babel أو [[--experimental-vm-modules]].`,
          example: R`npx jest
npx jest --watch
npx jest src/auth -t "rejects expired token"
npx jest --runInBand
NODE_OPTIONS=--experimental-vm-modules npx jest
npx cross-env NODE_OPTIONS=--experimental-vm-modules jest`,
          try: R`في مشروع فيه [["type": "module"]] شغّل [[jest]] وشوف الخطأ ([[Must use import to load ES Module]] في jest 30، و [[Cannot use import statement outside a module]] في النسخ الأقدم)، وبعدين شغّله بـ [[NODE_OPTIONS]].`,
          deep: {
            why: "مش كل مشروع هتشتغل عليه هيبقى vitest. jest لسه في مشاريع كتير، ولازم تعرف تشغّله وتفهم مشاكله المشهورة.",
            how: R`عكس vitest، [[jest]] من غير حاجة بيشغّل مرة ويقفل، و [[--watch]] هو اللي بيقعد، وبيعيد الاختبارات المتأثرة بالملفات اللي اتغيرت من آخر commit (عشان كده محتاج Git).

jest اتعمل أيام CommonJS ([[require]]). لو مشروعك ES Modules ([[import]] و [["type": "module"]])، إما Babel أو ts-jest يحوّلوا الكود، أو تشغّل Node بـ [[--experimental-vm-modules]] فـ jest يستخدم دعم ESM اللي في Node. والمتغير [[NODE_OPTIONS]] بيوصّل الفلاج ده لـ Node اللي jest شغال جواه.

الشكل [[VAR=value command]] بتاع bash، ومبيشتغلش في CMD ولا PowerShell. [[cross-env]] بيعمل نفس الحاجة على أي نظام، فلو في الفريق حد على ويندوز حطه في السكربت.

[[--runInBand]] بيشغّل الملفات واحد ورا التاني في نفس الـ process بدل workers متوازية. أبطأ، بس بيحل مشاكل الاختبارات اللي بتستخدم نفس الداتابيز، ومفيد في CI على ماكينة ضعيفة.`,
            when: "مشروع موجود بـ jest: كمّل بيه. مشروع جديد بـ Vite أو TypeScript: vitest أسهل (نفس الـ API تقريبًا، وبيفهم ESM و TS من غير إعداد).",
            mistakes: R`في مشروع حقيقي سكربت الاختبار كان [[NODE_OPTIONS=--experimental-vm-modules jest]]، وده شغال على لينكس وماك، بس على ويندوز بيقع بـ «'NODE_OPTIONS' is not recognized»: الحل cross-env. واختبارات بتفتح اتصال داتابيز أو server ومتقفلهوش، فـ jest يفضل معلّق بعد ما يخلص ويطبع «did not exit»: اقفل الاتصال في [[afterAll]]، و [[--detectOpenHandles]] بيقولك مين اللي فاضل مفتوح.`
          },
          lines: [
            "شغّل كل الاختبارات مرة واحدة.",
            "سيبه شغال ويعيد الاختبارات المتأثرة مع كل حفظ.",
            "ملفات src/auth بس، واختبار باسم معين.",
            "شغّل الملفات واحد ورا التاني مش بالتوازي.",
            "شغّل jest على كود ES Modules (bash بس).",
            "نفسه بس بيشتغل على ويندوز كمان."
          ],
          sol: R`مع jest 30 على Node 22 في مشروع [["type": "module"]]:

[[FAIL ./sum.test.js]] و [[Test suite failed to run]] و [[Must use import to load ES Module: .../sum.test.js]]، وتحته إقتراحات: Babel، أو [[transformIgnorePatterns]]، أو Node 24.9 وأحدث. في jest 29 وأقدم الرسالة المعروفة كانت [[SyntaxError: Cannot use import statement outside a module]]. نفس السبب: jest بيحاول يشغّل الملف كـ CommonJS.

مع [[NODE_OPTIONS=--experimental-vm-modules npx jest]]: [[ExperimentalWarning: VM Modules is an experimental feature]] (عادي) وبعدها [[Tests: 1 passed, 1 total]].

الغلط الشائع إنك تحط [[NODE_OPTIONS=...]] في سكربت package.json وزميلك على ويندوز CMD يقع بـ [['NODE_OPTIONS' is not recognized]]؛ دا شغل [[cross-env]]. وفي ملفات الـ ESM لو استخدمت [[jest.fn()]] أو [[jest.mock()]] من غير import هتاخد [[jest is not defined]]: اعمل [[import { jest } from "@jest/globals";]].`,
          solCode: R`// package.json: "type": "module"
// sum.js
export const sum = (a, b) => a + b;

// sum.test.js
import { sum } from "./sum.js";
test("adds", () => {
  expect(sum(2, 2)).toBe(4);
});

// الترمنال
npx jest
NODE_OPTIONS=--experimental-vm-modules npx jest`
        }
      ]
    }
  ]
});
