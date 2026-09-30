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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          try: R`في مشروع فيه [["type": "module"]] شغّل [[jest]] وشوف خطأ [[Cannot use import statement outside a module]]، وبعدين شغّله بـ [[NODE_OPTIONS]].`,
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
          ]
        }
      ]
    },
    {
      t: "تكتب اختبار",
      l: 2,
      n: "vitest من جوه: expect، و mocks للإيميل والدفع، ووقت مزيّف، واختبار بيقع لسبب واحد",
      items: [
        {
          cmd: "خريطة الاختبارات",
          title: "الاختبارات في الموقع: تبدأ منين وتروح فين",
          desc: R`الاختبارات مش حاجة واحدة. فيه خمس محطات في الموقع، وكل واحدة بتبني على اللي قبلها:

١. هنا، «تاب فحص الكود» المستوى التاني (الفئة دي): unit tests بـ vitest. دالة أو service لوحدها، بـ mocks للإيميل والدفع والوقت.

٢. «تاب Backend بـ Node» المستوى التالت: integration tests بـ supertest. طلب HTTP حقيقي على الـ API وداتابيز اختبار، من غير متصفح.

٣. «تاب React» المستوى التالت: Testing Library و MSW. الـ component بيترسم وتدوس عليه زي اليوزر، والـ API متزيّف على مستوى الشبكة.

٤. «تاب فحص الكود» المستوى التالت: Playwright e2e. التطبيق كله في متصفح حقيقي: login ودفع من أولهم لآخرهم.

٥. «تاب هندسة البرمجيات» المستوى التالت: TDD وأنواع الاختبارات، يعني إمتى تكتب الاختبار قبل الكود، وأنهي نوع لأنهي حاجة.`,
          example: R`"scripts": {
  "test": "vitest run",
  "test:watch": "vitest",
  "test:api": "vitest run tests/api",
  "test:e2e": "playwright test",
  "test:all": "npm run test && npm run test:e2e"
}`,
          try: R`خد مشروع عندك (أو متجر بسيط فيه login وسلة ودفع) واكتب في ورقة: ٣ حاجات تستاهل unit test، وحاجة واحدة integration، و flow واحد بس e2e. وبعدين ضيف السكربتات دي لـ package.json.`,
          flag: "script",
          deep: {
            why: "اللي بيبدأ اختبارات بيقع في واحدة من اتنين: يكتب e2e لكل حاجة فالـ CI ياخد نص ساعة ويقع من غير سبب واضح، أو يكتب unit tests بس فكل دالة سليمة لوحدها والتطبيق بايظ لما يتجمّع. الخريطة بتقولك كل نوع بيمسك إيه وبتكتبه فين.",
            how: R`الفكرة المشهورة اسمها هرم الاختبارات: تحت unit كتير (رخيصة، بتاخد ملي ثانية، ولما تقع بتقولك السطر بالظبط)، وفي النص integration أقل (API مع داتابيز، أبطأ بس بيمسك غلط الـ SQL والـ middleware)، وفوق e2e قليل جدًا (دقايق، وأحيانًا flaky، بس الوحيد اللي بيقول «اليوزر يقدر يدفع»).

vitest بيشغّل الأولى والتانية والتالتة (supertest و Testing Library شغالين جوه vitest)، و Playwright ليه runner لوحده ([[playwright test]]) لأنه بيشغّل متصفح.

والسكربتات بتفصلهم عشان تشغّل السريع وانت شغال ([[test:watch]])، والكل قبل الـ merge. وفي CI، [[test]] في الـ job الأساسي، و [[test:e2e]] في job لوحده لأنه محتاج متصفحات وسيرفر (المستوى ٣).`,
            when: "أول ما تفكر «أبدأ أكتب اختبارات». وفي كل feature جديدة: اسأل أنهي جزء unit، وهل فيه flow حرج يستاهل e2e.",
            mistakes: R`تبدأ بـ e2e لأنه «بيختبر كل حاجة»، فأول ما الزرار يتغير اسمه يقع عشرين اختبار. أو تعمل mock لكل حاجة في الـ integration test، فيبقى unit test متنكّر ومبيمسكش غلط الـ SQL. وفي الانترفيو: سؤال «بتختبر إزاي؟» إجابته الهرم ده بأمثلة من مشروعك، مش «بكتب tests».`
          },
          lines: [
            "بداية السكربتات في package.json.",
            "unit و integration مرة واحدة واقفل (للـ CI والـ hooks).",
            "نفسه بس watch وانت شغال.",
            "اختبارات الـ API بس (supertest، في «تاب Backend بـ Node»).",
            "Playwright في متصفح حقيقي (المستوى التالت هنا).",
            "الكل بالترتيب: السريع الأول، ولو وقع ميكمّلش للبطيء.",
            "نهاية السكربتات."
          ],
          sol: R`مثال لمتجر فيه login وسلة ودفع:

unit: [[cartTotal]] (مجموع وخصم وكمية سالبة)، و [[checkout]] مع بوابة دفع متزيّفة (نجح، اترفض، سلة فاضية)، و [[isExpired]] للـ token بوقت مزيّف.

integration: [[POST /api/orders]] بـ supertest وداتابيز اختبار: من غير login يرجع 401، ومع login يعمل order فعلًا في الجدول.

e2e: واحد بس: login، وضيف منتج، وادفع، وشوف «تم الطلب». ده الـ flow اللي لو وقع الشركة بتخسر فلوس.

الغلط الشائع: تحط «الـ navbar بيظهر» كـ e2e. ده unit أو component test، والـ e2e خليه للي بيعدّي على كذا صفحة وسيرفر وداتابيز.`
        },
        {
          cmd: "describe و it و expect",
          title: "أول ملف اختبار حقيقي لـ service",
          desc: R`ملف الاختبار اسمه زي الملف اللي بيختبره وآخره [[.test.ts]]: [[cart.ts]] جنبه [[cart.test.ts]]. جواه [[describe]] مجموعة، و [[it]] اختبار واحد باسم بيقول السلوك، و [[expect(actual).toBe(expected)]] الشرط.

كل اختبار تلات خطوات: arrange (جهّز المدخلات)، و act (نادي الدالة مرة واحدة)، و assert (اتأكد من الناتج).

الدالة هنا [[cartTotal(items, coupon?)]]: بتجمع [[price * qty]]، والكوبون [[SAVE10]] بيخصم ١٠٪.`,
          example: R`import { describe, it, expect } from "vitest";
import { cartTotal } from "./cart";

describe("cartTotal", () => {
  it("sums price times qty", () => {
    // arrange
    const items = [{ price: 100, qty: 2 }, { price: 50, qty: 1 }];
    // act
    const total = cartTotal(items);
    // assert
    expect(total).toBe(250);
  });

  it("applies the SAVE10 coupon", () => {
    expect(cartTotal([{ price: 200, qty: 1 }], "SAVE10")).toBe(180);
  });
});`,
          try: R`اكتب [[src/cart.ts]] بنفسك: الدالة بتجمع [[price * qty]]، و [[SAVE10]] بيخصم ١٠٪ ويقرّب ([[Math.round]])، وترمي [[Error("qty must be positive")]] لو أي كمية صفر أو أقل. حط الاختبار ده جنبه وشغّل [[npx vitest run]]. ضيف اختبار لسلة فاضية، وبعدين بوّظ الخصم عمدًا ([[0.8]] بدل [[0.9]]) واقرا رسالة الفشل.`,
          flag: "script",
          deep: {
            why: "من غير اختبار، كل تعديل في [[cartTotal]] معناه تفتح المتصفح وتضيف منتجات وتحسب بإيدك. الاختبار بيعمل ده في ملي ثانية مع كل حفظ، ولما حد يغيّر الخصم بعد ست شهور، الاختبار هو اللي يقوله «انت كسرت SAVE10» قبل العميل.",
            how: R`vitest بيلاقي أي ملف [[*.test.ts]] ويشغّله. [[describe]] مجرد تجميع: الاسم بيتحط قبل اسم كل اختبار في التقرير ([[cartTotal > sums price times qty]])، وتقدر تحط جواه [[beforeEach]] يخص المجموعة دي بس.

[[it]] (أو [[test]]، نفس الحاجة) بياخد اسم ودالة. الاسم جملة بتوصف السلوك، مش اسم الدالة: لما يقع تقرا «applies the SAVE10 coupon» وتعرف إيه اللي باظ من غير ما تفتح الملف.

[[expect(x)]] بيرجع object فيه matchers. [[toBe]] بيقارن بـ [[Object.is]]، يعني قيمة مطابقة للأرقام والنصوص. لو الشرط وقع، بيرمي خطأ فيه Expected و Received وسهم على السطر، والاختبار يبقى أحمر، والباقي يكمّل عادي.

الـ arrange / act / assert مش syntax، ده ترتيب: كل التجهيز فوق، ونداء واحد، وبعدين الشروط. لو لقيت نفسك بتعمل act تاني بعد assert، غالبًا ده اختبارين.

والـ import من [[vitest]] صريح. فيه إعداد [[globals: true]] بيخليهم متاحين من غير import (زي jest)، بس الصريح أوضح و TypeScript بيفهمه من غير إعداد.`,
            when: "لأي دالة فيها منطق: حسابات، و validation، وتحويل بيانات، وقرارات (if). دي أرخص اختبارات وأكترها فايدة. والـ services اللي بتكلم داتابيز أو API، بتختبر منطقها بـ mocks (الدروس الجاية).",
            mistakes: R`اسم زي [[it("test 1")]] أو [[it("works")]]، فلما يقع مش عارف إيه اللي باظ. واختبار بيعيد نفس الحسبة اللي في الكود ([[expect(total).toBe(items[0].price * items[0].qty + ...)]]) فلو المعادلة غلط الاختبار غلط زيها: اكتب الرقم المتوقع بإيدك (250). ومفيش ولا [[expect]] في الاختبار، فبيعدّي دايمًا. وتختبر الحالة السعيدة بس وتنسى الحدود: سلة فاضية، وكمية صفر، وكوبون غلط.`
          },
          lines: [
            "هات الدوال من vitest صريح.",
            "هات الدالة اللي هتختبرها.",
            "مجموعة اختبارات لـ cartTotal.",
            "اختبار واحد، واسمه جملة بتقول السلوك.",
            "arrange: جهّز سلة فيها منتجين.",
            "act: نادي الدالة مرة واحدة.",
            "assert: الناتج لازم يبقى 250 بالظبط.",
            "نهاية الاختبار الأول.",
            "اختبار تاني للكوبون.",
            "ممكن الخطوات التلاتة في سطر لو الاختبار صغير.",
            "نهاية الاختبار التاني.",
            "نهاية المجموعة."
          ],
          sol: R`لما الكل سليم: [[Test Files 1 passed]] و [[Tests 3 passed]].

ولما تبوّظ الخصم، vitest بيطبع [[FAIL src/cart.test.ts > cartTotal > applies the SAVE10 coupon]] وتحته [[expected 160 to be 180 // Object.is equality]] وسهم على سطر الـ expect. يعني الاسم قالك إيه اللي باظ، والرقمين قالولك قد إيه. التانيين فضلوا أخضر لأن كل اختبار مستقل.

لو الاختبار عدّى وانت بوّظت الكود، راجع إنك حافظ الملف اللي الاختبار بيعمله import، وإن الرقم المتوقع مكتوب بإيدك مش محسوب.`,
          solCode: R`// src/cart.ts
export type Item = { price: number; qty: number };

export function cartTotal(items: Item[], coupon?: string): number {
  for (const i of items) if (i.qty <= 0) throw new Error("qty must be positive");
  const sum = items.reduce((s, i) => s + i.price * i.qty, 0);
  return coupon === "SAVE10" ? Math.round(sum * 0.9) : sum;
}

// src/cart.test.ts (ضيف ده جوه describe)
it("returns 0 for an empty cart", () => {
  expect(cartTotal([])).toBe(0);
});`
        },
        {
          cmd: "toEqual و toThrow و rejects",
          title: "تقارن إزاي: قيمة، ولا object، ولا خطأ، ولا Promise",
          desc: R`[[toBe]] للقيم البسيطة (أرقام ونصوص). [[toEqual]] للـ objects والـ arrays: بيقارن المحتوى مش المكان في الذاكرة. [[toMatchObject]] لو يهمك جزء من الـ object بس.

الأخطاء: [[toThrow]] لازم تدّيله دالة مش النداء نفسه. والـ Promise: [[await expect(p).resolves]] أو [[.rejects]]، والـ await إجباري.

[[findUser(id)]] هنا async: بترجع اليوزر، أو بترمي [[user 99 not found]].`,
          example: R`import { it, expect } from "vitest";
import { cartTotal } from "./cart";
import { findUser } from "./users";

it("matchers", async () => {
  expect(cartTotal([])).toBe(0);
  expect({ id: 1, tags: ["a"] }).toEqual({ id: 1, tags: ["a"] });
  expect({ id: 1, tags: ["a"] }).not.toBe({ id: 1, tags: ["a"] });
  expect(0.1 + 0.2).toBeCloseTo(0.3);
  expect(await findUser(1)).toMatchObject({ name: "Sara" });
  expect(() => cartTotal([{ price: 10, qty: 0 }])).toThrow("qty must be positive");
  await expect(findUser(1)).resolves.toHaveProperty("id", 1);
  await expect(findUser(99)).rejects.toThrow(/not found/);
});`,
          try: R`اعمل [[src/users.ts]] اللي في الحل وشغّل المثال. وبعدين جرّب الغلطتين المشهورتين كل واحدة لوحدها: شيل الـ arrow من سطر toThrow ([[expect(cartTotal(...)).toThrow()]])، وشيل [[await]] من سطر rejects. شوف كل واحدة بتطلّع إيه.`,
          flag: "script",
          deep: {
            why: "أغلب الاختبارات «اللي بتعدّي وهي غلط» سببها matcher غلط: [[toBe]] على object فيقع من غير سبب، أو [[toThrow]] على نداء فالخطأ يطلع قبل ما expect يشوفه، أو Promise من غير await فالاختبار يخلص قبل الشرط.",
            how: R`[[toBe]] بيستخدم [[Object.is]]: نفس القيمة للأنواع البسيطة، ونفس المرجع للـ objects. اتنين objects شكلهم واحد بس اتعملوا مرتين، ده مش [[toBe]]. عشان كده [[toEqual]]: بيلف على الخصائص بالتكرار ويقارن المحتوى. (و [[toStrictEqual]] أشد: بيفرّق بين خاصية قيمتها undefined وخاصية مش موجودة، وبين class و object عادي.)

[[toMatchObject]] بيتأكد إن الخصائص اللي كتبتها موجودة بنفس القيم، ويتجاهل الباقي. مفيد مع الـ user اللي فيه [[createdAt]] ومش عايز الاختبار يقع لما حد يضيف حقل.

[[toBeCloseTo]] للأرقام العشرية، لأن [[0.1 + 0.2]] مش 0.3 بالظبط في JavaScript.

[[toThrow]] محتاج يشغّل الكود بنفسه جوه try/catch، فلازم تدّيله دالة [[() => ...]]. لو كتبت النداء على طول، الخطأ بيطلع وانت لسه بتجهّز الـ arguments لـ expect، والاختبار يقع بالخطأ نفسه. وبياخد نص (جزء من الرسالة) أو regex أو class الخطأ.

[[resolves]] و [[rejects]] بيستنوا الـ Promise ويطبّقوا الـ matcher على القيمة أو الخطأ، وبيرجعوا Promise، فلازم [[await]]. في vitest 5 لو نسيت الـ await الاختبار بيقع برسالة «Promise returned by expect(actual).rejects.toThrow() was not awaited». في jest والنسخ القديمة، ممكن يعدّي في صمت.

و [[.not]] قبل أي matcher بيعكسه.`,
            when: "toBe للأرقام والنصوص والـ boolean. toEqual لأي object أو array راجع من دالة. toMatchObject لما يهمك حقول معينة. toThrow لكود sync بيرمي، و rejects لأي async.",
            mistakes: R`[[expect(fn()).toThrow()]] من غير arrow، فالاختبار يقع بـ [[Error: qty must be positive]] نفسه وتفتكر إن الكود بايظ. وتنسى [[await]] قبل [[expect(...).rejects]] في jest فيعدّي دايمًا. و [[toEqual]] على object فيه [[Date]] أو id عشوائي، فيقع كل مرة: استخدم [[toMatchObject]] أو [[expect.any(String)]]. و [[toThrow()]] من غير رسالة، فيعدّي لو الكود رمى أي خطأ حتى TypeError من typo: حدد الرسالة.`
          },
          lines: [
            "هات it و expect.",
            "الدالة الـ sync.",
            "الدالة الـ async.",
            "اختبار async عشان نقدر نستخدم await جواه.",
            "toBe: الرقم بالظبط.",
            "toEqual: نفس المحتوى حتى لو objects مختلفين.",
            "والدليل: toBe بيقارن المرجع، فاتنين objects متشابهين مش toBe.",
            "الأرقام العشرية: قريب من 0.3 كفاية.",
            "toMatchObject: الحقل ده موجود بالقيمة دي، والباقي مش مهم.",
            "toThrow: ادّيله دالة يشغّلها هو، ورسالة الخطأ المتوقعة.",
            "resolves: استنى الـ Promise واختبر القيمة. والـ await إجباري.",
            "rejects: الـ Promise لازم يترفض بخطأ رسالته فيها not found.",
            "نهاية الاختبار."
          ],
          sol: R`المثال كله أخضر: [[Tests 1 passed]].

من غير الـ arrow: الاختبار بيقع بـ [[Error: qty must be positive]] والسهم على سطر [[cart.ts]] نفسه، مش على expect. الخطأ طلع قبل ما toThrow يشتغل أصلًا. الحل [[expect(() => cartTotal(...)).toThrow(...)]].

من غير await (vitest 5): بيقع برسالة [[Promise returned by $__btexpect(actual).rejects.toThrow()$__bt was not awaited]]. vitest بيمسكها ليك. في jest أو vitest قديم، نفس الغلطة كانت ممكن تعدّي أخضر حتى لو الـ Promise اتحل بدل ما يترفض. فالعادة: أي [[resolves]] أو [[rejects]] قبله [[await]]، دايمًا.`,
          solCode: R`// src/users.ts
export type User = { id: number; name: string; createdAt: Date };
const db = new Map<number, User>([[1, { id: 1, name: "Sara", createdAt: new Date("2026-01-01") }]]);

export async function findUser(id: number): Promise<User> {
  const u = db.get(id);
  if (!u) throw new Error("user " + id + " not found");
  return u;
}`
        },
        {
          cmd: "vi.fn و vi.spyOn",
          title: "تتأكد إن الإيميل اتبعت من غير ما يتبعت",
          desc: R`[[vi.fn()]] دالة مزيّفة بتسجّل كل مرة اتنادت فيها وبإيه. تدّيها للكود بدل الحقيقية، وبعدين تسأل: [[toHaveBeenCalledWith(...)]] و [[toHaveBeenCalledTimes(1)]].

[[vi.spyOn(obj, "method")]] بيلف method موجودة في object حقيقي، وتقدر تغيّر اللي بترجعه، و [[mockRestore()]] يرجّعها زي ما كانت.

[[signup(email, mailer)]] هنا بتتأكد من الإيميل، وتعمل user، وتنادي [[mailer.send(email, "Welcome to MyApp")]].`,
          example: R`import { it, expect, vi } from "vitest";
import { signup } from "./signup";

it("sends a welcome email", async () => {
  const mailer = { send: vi.fn().mockResolvedValue(undefined) };
  const user = await signup("sara@example.com", mailer);
  expect(mailer.send).toHaveBeenCalledTimes(1);
  expect(mailer.send).toHaveBeenCalledWith("sara@example.com", expect.stringContaining("Welcome"));
  expect(user.email).toBe("sara@example.com");
});

it("does not email an invalid address", async () => {
  const mailer = { send: vi.fn() };
  await expect(signup("nope", mailer)).rejects.toThrow("invalid email");
  expect(mailer.send).not.toHaveBeenCalled();
});

it("spyOn replaces one method on a real object", async () => {
  const realMailer = { async send(_to: string, _subject: string): Promise<void> { throw new Error("real network!"); } };
  const spy = vi.spyOn(realMailer, "send").mockResolvedValue(undefined);
  await signup("a@b.co", realMailer);
  expect(spy).toHaveBeenCalledOnce();
  spy.mockRestore();
});`,
          try: R`اعمل [[src/signup.ts]] اللي في الحل، وشغّل المثال. وبعدين ضيف اختبار رابع: مزوّد الإيميل واقع ([[mockRejectedValue(new Error("SMTP 421"))]])، و signup لازم يرمي نفس الخطأ.`,
          flag: "script",
          deep: {
            why: "مش عايز كل مرة الاختبارات تشتغل يتبعت إيميل حقيقي لـ sara@example.com، ولا عايز الاختبار يقع لأن النت قاطع. بس عايز تتأكد إن الكود «حاول يبعت» للعنوان الصح، ومحاولش يبعت لإيميل غلط. الـ mock بيفصل منطقك عن العالم برا.",
            how: R`[[vi.fn()]] بترجع دالة فيها [[.mock.calls]] (array بكل نداء و arguments بتاعه) و [[.mock.results]]. الـ matchers زي [[toHaveBeenCalledWith]] بيقروا منها. ومن غير تحديد بترجع undefined، وتغيّر ده بـ:
[[mockReturnValue(x)]] قيمة ثابتة، و [[mockResolvedValue(x)]] Promise بتتحل بـ x، و [[mockRejectedValue(err)]] Promise بتترفض، و [[mockImplementation(fn)]] منطق كامل. ونسخ [[...Once]] منهم للنداء الجاي بس.

[[expect.stringContaining("Welcome")]] و [[expect.any(String)]] asymmetric matchers: بتحطها مكان argument عشان تقول «أي نص فيه Welcome». كده الاختبار ميقعش لو حد عدّل الـ subject لـ «Welcome to MyApp!».

الطريقة الأنضف إن الـ service ياخد الـ mailer كـ argument (dependency injection)، فالاختبار يدّيله [[{ send: vi.fn() }]] ببساطة. ولو الكود بيستخدم object حقيقي مش بياخده من برا، [[vi.spyOn]] بيبدّل method واحدة فيه: من غير [[mockResolvedValue]] بيسجّل النداء ويشغّل الأصلية، ومعاه بيبدّلها. و [[mockRestore]] (أو [[restoreMocks: true]] في الإعدادات) يرجّع الأصل عشان ميأثرش على اختبار تاني.

و [[toHaveBeenCalledOnce()]] اختصار لـ [[toHaveBeenCalledTimes(1)]]. و [[not.toHaveBeenCalled()]] بيأكد إن حاجة محصلتش، ودي مهمة زي إنها حصلت.`,
            when: "أي side effect: إيميل، و SMS، و push notification، و log مهم، و analytics، و webhook. تأكد إنه اتنادى بالبيانات الصح، ومتشغّلوش.",
            mistakes: R`تعمل mock للدالة اللي بتختبرها نفسها، فبتختبر الـ mock. وتكتب [[toHaveBeenCalledWith("sara@example.com", "Welcome to MyApp")]] بالنص كامل، فأي تعديل في الكلام يكسر الاختبار: اختبر اللي يهم (العنوان) وخلّي الباقي [[expect.any(String)]]. و spy من غير restore، فالاختبار اللي بعده بيلاقي [[console.error]] أو [[Date.now]] لسه متزيّف. وفي الانترفيو: الفرق بين mock و stub و spy؟ stub بيرجّع قيمة ثابتة، و spy بيسجّل النداءات، و mock الاتنين ومعاهم شروط. vi.fn بيعمل التلاتة.`
          },
          lines: [
            "vi فيه كل أدوات الـ mocking.",
            "الـ service اللي بنختبره.",
            "اختبار الحالة العادية.",
            "mailer مزيّف: send دالة بتسجّل النداءات وبترجع Promise بيتحل.",
            "act: سجّل يوزر وادّيله الـ mailer المزيّف.",
            "اتنادى مرة واحدة بالظبط.",
            "للعنوان ده، والـ subject أي نص فيه Welcome.",
            "والـ user راجع بالإيميل الصح.",
            "نهاية الاختبار.",
            "اختبار إن مفيش إيميل بيتبعت لعنوان غلط.",
            "mailer مزيّف تاني، نضيف.",
            "signup لازم يرفض.",
            "والأهم: send متنادتش خالص.",
            "نهاية الاختبار.",
            "لو الكود بيستخدم object حقيقي.",
            "mailer حقيقي بيكلم النت (هنا بيرمي خطأ عشان نتأكد إنه ماتنادتش).",
            "spyOn بيبدّل send بس، ويخليها ترجع Promise بيتحل.",
            "دلوقتي signup بينادي الـ spy مش الأصلية.",
            "اتنادت مرة.",
            "رجّع الـ method الأصلية.",
            "نهاية الاختبار."
          ],
          sol: R`الاختبار الرابع بيعدّي أخضر: [[Tests 4 passed]]. [[mockRejectedValue]] خلّت send ترجع Promise بيترفض، و [[await mailer.send]] جوه signup رمى الخطأ لبرا، و [[rejects.toThrow("SMTP 421")]] مسكه.

ده بيأكد سلوك مهم: لو الإيميل فشل، signup بيفشل (أو، لو قررت إن التسجيل يكمّل، تغيّر الكود والاختبار يبقى [[resolves]]). في الحالتين الاختبار بيوثّق القرار.

الغلط الشائع: [[mockReturnValue(new Error(...))]]، فالدالة بترجع object خطأ عادي ومبترميش، والاختبار يقع بـ «promise resolved instead of rejecting».`,
          solCode: R`// src/signup.ts
export type Mailer = { send(to: string, subject: string): Promise<void> };

export async function signup(email: string, mailer: Mailer) {
  if (!email.includes("@")) throw new Error("invalid email");
  const user = { id: crypto.randomUUID(), email };
  await mailer.send(email, "Welcome to MyApp");
  return user;
}

// الاختبار الرابع
it("fails if the mail provider is down", async () => {
  const mailer = { send: vi.fn().mockRejectedValue(new Error("SMTP 421")) };
  await expect(signup("sara@example.com", mailer)).rejects.toThrow("SMTP 421");
});`
        },
        {
          cmd: "vi.mock",
          title: "تبدّل module كامل: عميل بوابة الدفع",
          desc: R`لما الكود بيعمل [[import { charge } from "./payments"]] جوه الملف ومش بياخده كـ argument، مش هتقدر تدّيله fake. [[vi.mock("./payments", factory)]] بيبدّل الـ module كله لأي حد يعمله import في الاختبار ده.

[[vi.mocked(charge)]] بيقول لـ TypeScript إنها mock، فتقدر تنادي [[mockResolvedValue]] عليها.

وخد بالك: [[vi.mock]] بيتنقل لأول الملف قبل الـ imports (hoisting)، فمينفعش يستخدم متغير متعرّف تحت.`,
          example: R`import { describe, it, expect, vi, beforeEach } from "vitest";
import { checkout } from "./checkout";
import { charge } from "./payments";

vi.mock("./payments", () => ({ charge: vi.fn() }));

beforeEach(() => {
  vi.mocked(charge).mockReset();
});

describe("checkout", () => {
  it("returns the payment id when the charge succeeds", async () => {
    vi.mocked(charge).mockResolvedValue({ id: "ch_1", status: "succeeded" });
    await expect(checkout(2500, "tok_visa")).resolves.toEqual({ ok: true, paymentId: "ch_1" });
    expect(charge).toHaveBeenCalledWith(2500, "tok_visa");
  });

  it("reports a declined card", async () => {
    vi.mocked(charge).mockResolvedValue({ id: "ch_2", status: "failed" });
    expect(await checkout(2500, "tok_declined")).toEqual({ ok: false, reason: "card_declined" });
  });

  it("never charges an empty cart", async () => {
    await expect(checkout(0, "tok_visa")).rejects.toThrow("empty cart");
    expect(charge).not.toHaveBeenCalled();
  });
});`,
          try: R`اعمل [[payments.ts]] و [[checkout.ts]] اللي في الحل وشغّل المثال. وبعدين جرّب الغلطة المشهورة: اعمل [[const chargeMock = vi.fn()]] فوق [[vi.mock]] واستخدمه جوه الـ factory. اقرا الخطأ، وصلّحه بـ [[vi.hoisted]].`,
          flag: "script",
          deep: {
            why: "مش عايز الاختبار يخصم فلوس من كارت حقيقي، ولا يعتمد على إن sandbox بوابة الدفع شغال، ولا ياخد ٣ ثواني عشان طلب HTTP. وعايز تجرّب حالات صعب تعملها بجد: كارت اترفض، أو البوابة رجعت خطأ. الـ mock بيخليك تتحكم في الرد.",
            how: R`vitest بيحوّل ملف الاختبار قبل ما يشغّله: أي [[vi.mock]] بيتنقل لأول الملف، قبل الـ imports. فلما [[checkout.ts]] يعمل [[import { charge } from "./payments"]]، بياخد النسخة المزيّفة. والمسار في [[vi.mock]] نسبة لملف الاختبار، ولازم يطابق نفس الـ module اللي الكود بيعمله import.

الـ factory بترجع الـ exports الجديدة. [[{ charge: vi.fn() }]] معناها الـ module كله بقى فيه charge مزيّفة بس. ولو محتاج باقي الـ exports الحقيقية: [[vi.mock(path, async (importOriginal) => ({ ...(await importOriginal()), charge: vi.fn() }))]]. ومن غير factory خالص، vitest بيعمل auto-mock: كل دالة بتبقى vi.fn فاضية.

عشان الـ hoisting، الـ factory بتشتغل قبل أي سطر تاني في الملف. لو استخدمت جواها [[const chargeMock]] متعرّف تحت، هتاخد [[ReferenceError: Cannot access 'chargeMock' before initialization]]. الحل [[vi.hoisted]]: [[const { chargeMock } = vi.hoisted(() => ({ chargeMock: vi.fn() }))]] بيتنقل هو كمان لفوق. والأبسط زي المثال: اعمل import للدالة نفسها واستخدم [[vi.mocked]].

وفي vitest 5، [[vi.mock]] و [[vi.hoisted]] لازم يبقوا في أعلى مستوى في الملف. لو كتبتهم جوه [[it]] أو [[describe]]، الملف كله بيقع بخطأ «defined outside of the module's top level scope». ولو فعلًا محتاج mock مختلف في اختبار واحد، فيه [[vi.doMock]] (مبيتنقلش) مع dynamic import.

[[beforeEach]] مع [[mockReset]] بيمسح النداءات والقيم اللي اتحددت، فكل اختبار يبدأ نضيف، و [[not.toHaveBeenCalled]] في الاختبار التالت ميتأثرش بالأولين.`,
            when: "SDK خارجي بيتعمل import مباشر: الدفع، والإيميل، والتخزين (S3)، و Redis. ولو انت اللي كاتب الكود، الأسهل إن الـ service ياخد الـ client كـ argument وتستخدم vi.fn عادي. vi.mock للكود اللي مش هتغيّر شكله.",
            mistakes: R`متغير في الـ factory قبل ما يتعرّف (الـ hoisting). ومسار مختلف عن اللي الكود بيستخدمه ([["./payments"]] في الاختبار و [["@/lib/payments"]] في الكود)، فالـ mock مبيتطبقش والاختبار يكلم البوابة بجد. ومن غير mockReset، فـ [[toHaveBeenCalledTimes(1)]] يلاقي 3 من الاختبارات اللي فاتت. وتعمل mock لكل module في المشروع، فالاختبار بيعدّي والكود بايظ لأن كل حاجة حقيقية اتشالت: mock للحدود الخارجية بس (شبكة، وداتابيز، ووقت).`
          },
          lines: [
            "vi و beforeEach جنب الباقي.",
            "الكود اللي بنختبره (جواه import لـ charge).",
            "هات charge نفسها، وهي هتبقى المزيّفة.",
            "بدّل module الدفع كله: charge بقت vi.fn. السطر ده بيتنقل لأول الملف.",
            "قبل كل اختبار...",
            "امسح النداءات والقيم القديمة.",
            "نهاية beforeEach.",
            "مجموعة checkout.",
            "الحالة الناجحة.",
            "المرة دي البوابة ترد بنجاح.",
            "checkout يرجّع ok و id الدفع.",
            "واتأكد إنه بعت المبلغ والكارت الصح.",
            "نهاية الاختبار.",
            "الكارت اترفض.",
            "البوابة ترد failed.",
            "checkout يرجّع ok: false والسبب، من غير ما يرمي.",
            "نهاية الاختبار.",
            "السلة فاضية.",
            "لازم يرفض قبل ما يكلم البوابة.",
            "ومفيش أي محاولة دفع.",
            "نهاية الاختبار.",
            "نهاية المجموعة."
          ],
          sol: R`المثال: [[Tests 3 passed]].

بالمتغير اللي فوق، الملف كله بيقع قبل أي اختبار: [[There was an error when mocking a module... since this call is hoisted to top of the file]] وتحتها [[Caused by: ReferenceError: Cannot access 'chargeMock' before initialization]]. السبب إن [[vi.mock]] اتنقل لفوق الـ const.

الحل: [[vi.hoisted]] بيعمل المتغير في نفس المكان اللي vi.mock اتنقل له. بعدها [[Tests 1 passed]].

ولو حطيت [[vi.mock]] جوه [[it]]، vitest 5 بيرفض برسالة «1 call ... was defined outside of the module's top level scope».`,
          solCode: R`// src/payments.ts: العميل الحقيقي (بيكلم النت)
export async function charge(amountCents: number, token: string): Promise<{ id: string; status: "succeeded" | "failed" }> {
  const res = await fetch("https://api.payments.example/v1/charges", {
    method: "POST",
    body: JSON.stringify({ amount: amountCents, source: token }),
  });
  return res.json() as Promise<{ id: string; status: "succeeded" | "failed" }>;
}

// src/checkout.ts
import { charge } from "./payments";

export async function checkout(totalCents: number, cardToken: string) {
  if (totalCents <= 0) throw new Error("empty cart");
  const payment = await charge(totalCents, cardToken);
  if (payment.status !== "succeeded") return { ok: false as const, reason: "card_declined" };
  return { ok: true as const, paymentId: payment.id };
}

// src/hoist.test.ts: التصليح بـ vi.hoisted
import { it, expect, vi } from "vitest";
import { checkout } from "./checkout";

const { chargeMock } = vi.hoisted(() => ({ chargeMock: vi.fn() }));
vi.mock("./payments", () => ({ charge: chargeMock }));

it("works with vi.hoisted", async () => {
  chargeMock.mockResolvedValue({ id: "c", status: "succeeded" });
  expect((await checkout(1, "t")).ok).toBe(true);
});`
        },
        {
          cmd: "vi.useFakeTimers",
          title: "كود فيه Date.now و setTimeout",
          desc: R`[[vi.useFakeTimers()]] بيبدّل الساعة: [[Date.now]] و [[new Date()]] و [[setTimeout]] و [[setInterval]] بقوا تحت إيدك. [[vi.setSystemTime(date)]] يثبّت الوقت، و [[vi.advanceTimersByTime(ms)]] يقدّم الساعة وينفّذ أي timer وقته جه.

فاختبار «الـ token بيخلص بعد ربع ساعة» بياخد ملي ثانية مش ربع ساعة.

وفي [[afterEach]] ارجع للوقت الحقيقي بـ [[vi.useRealTimers()]].`,
          example: R`import { it, expect, vi, beforeEach, afterEach } from "vitest";
import { isExpired, debounce } from "./time";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-09-01T10:00:00Z"));
});
afterEach(() => {
  vi.useRealTimers();
});

it("a token expires after 15 minutes", () => {
  const expiresAt = Date.now() + 15 * 60_000;
  expect(isExpired(expiresAt)).toBe(false);
  vi.advanceTimersByTime(15 * 60_000);
  expect(isExpired(expiresAt)).toBe(true);
});

it("debounce calls once with the last value", () => {
  const search = vi.fn();
  const onType = debounce(search, 300);
  onType("r"); onType("re"); onType("react");
  expect(search).not.toHaveBeenCalled();
  vi.advanceTimersByTime(300);
  expect(search).toHaveBeenCalledOnce();
  expect(search).toHaveBeenCalledWith("react");
});`,
          try: R`اكتب [[greeting()]] بترجع [["Good morning"]] قبل الساعة ١٢ و [["Good evening"]] بعدها (من [[new Date().getHours()]]). اختبرها في تلات أوقات: ٩ الصبح، و [[11:59:59]]، و ١٢ بالظبط.`,
          flag: "script",
          deep: {
            why: "كود الوقت أصعب حاجة تختبرها بجد: اختبار بيعدّي الصبح ويقع بالليل، أو بيستنى [[setTimeout]] ٥ ثواني فالاختبارات تبقى بطيئة، أو بيقع يوم ٢٩ فبراير بس. الوقت المزيّف بيخلي النتيجة نفسها كل مرة وعلى أي جهاز.",
            how: R`[[vi.useFakeTimers()]] بيحط نسخ مزيّفة من [[setTimeout]] و [[setInterval]] و [[Date]] وأخواتهم (بنفس مكتبة sinon الـ fake timers). الساعة مبتتحركش لوحدها. انت اللي بتحركها:

[[vi.advanceTimersByTime(ms)]] بيقدّم الساعة ms وينفّذ كل timer وقته جه بالترتيب. و [[vi.runAllTimers()]] بينفّذ كل اللي مستني. و [[vi.advanceTimersToNextTimer()]] لأقرب واحد بس.

[[vi.setSystemTime]] بيحدد [[Date.now()]] من غير ما يشغّل timers. وتقدر تعمل الاتنين مرة واحدة: [[vi.useFakeTimers({ now: new Date("...") })]].

لو الكود فيه [[await]] بين الـ timers (retry بيستنى ثانية وبعدين fetch)، استخدم النسخ الـ async: [[await vi.advanceTimersByTimeAsync(1000)]]، لأنها بتسيب الـ Promises تخلص بين كل timer والتاني.

و [[afterEach(() => vi.useRealTimers())]] مهم: من غيره الاختبار اللي بعده (أو مكتبة بتستخدم setTimeout) هتلاقي الساعة واقفة وتعلّق لحد الـ timeout.

والتاريخ في المثال فيه [[Z]] (UTC) عشان [[toISOString]] يطلع نفس الناتج على أي جهاز. أما [[getHours()]] فبيرجع الساعة المحلية للجهاز، فاختبار زي greeting يكتب الوقت من غير Z.`,
            when: "أي كود فيه: انتهاء صلاحية (token، و OTP، و كوبون)، و debounce و throttle، و retry مع انتظار، و cron، و «منذ ٥ دقايق»، و rate limit بنافذة وقت.",
            mistakes: R`تنسى [[useRealTimers]] فاختبارات تانية تعلّق. وتستخدم [[advanceTimersByTime]] مع كود فيه await، فالـ callback التاني مبيتنفّذش لأن الـ Promise لسه مخلصتش: النسخة Async. وتعمل [[await new Promise(r => setTimeout(r, 300))]] في اختبار والـ timers مزيّفة، فبيعلّق للأبد. واختبار بيستخدم [[new Date()]] الحقيقي ويقارن بتاريخ ثابت، فيعدّي النهارده ويقع بكرة.`
          },
          lines: [
            "هات أدوات الوقت والـ hooks.",
            "الدالتين اللي بنختبرهم.",
            "قبل كل اختبار...",
            "ساعة مزيّفة بدل الحقيقية.",
            "وثبّت الوقت على لحظة معروفة (UTC).",
            "نهاية beforeEach.",
            "بعد كل اختبار...",
            "ارجع للساعة الحقيقية عشان محدش تاني يتأثر.",
            "نهاية afterEach.",
            "اختبار انتهاء الـ token.",
            "بيخلص بعد ربع ساعة من الوقت المثبّت.",
            "دلوقتي لسه صالح.",
            "قدّم الساعة ربع ساعة في ملي ثانية.",
            "دلوقتي خلص.",
            "نهاية الاختبار.",
            "اختبار الـ debounce.",
            "الدالة الحقيقية اللي بتتنادى بعد ما اليوزر يبطّل كتابة.",
            "لفّها بـ debounce ٣٠٠ ملي ثانية.",
            "اليوزر كتب ٣ حروف ورا بعض بسرعة.",
            "لسه متنادتش (الـ timer مستني).",
            "قدّم الساعة ٣٠٠.",
            "اتنادت مرة واحدة بس.",
            "بآخر قيمة.",
            "نهاية الاختبار."
          ],
          sol: R`[[Tests 3 passed]] ومع [[--reporter=verbose]] تشوف الاسم متولّد لكل حالة: [[at 2026-09-01T09:00:00 says Good morning]] وهكذا.

الحالة المهمة [[11:59:59]] و [[12:00:00]]: دي الحدود، وهي اللي بتمسك [[<=]] مكان [[<]]. والوقت مكتوب من غير [[Z]] لأن [[getHours()]] بيرجع الساعة المحلية للجهاز، فالنتيجة ثابتة على أي timezone.

لو الاختبار بيعدّي ساعة ويقع ساعة، يبقى نسيت [[useFakeTimers]] والكود بيقرا الساعة الحقيقية.`,
          solCode: R`// src/greeting.ts
export function greeting(): string {
  return new Date().getHours() < 12 ? "Good morning" : "Good evening";
}

// src/greeting.test.ts
import { it, expect, vi, afterEach } from "vitest";
import { greeting } from "./greeting";

afterEach(() => vi.useRealTimers());

it.each([
  ["2026-09-01T09:00:00", "Good morning"],
  ["2026-09-01T11:59:59", "Good morning"],
  ["2026-09-01T12:00:00", "Good evening"],
])("at %s says %s", (time, expected) => {
  vi.useFakeTimers({ now: new Date(time) });
  expect(greeting()).toBe(expected);
});

// src/time.ts: الدالتين اللي في المثال
export function isExpired(expiresAt: number): boolean {
  return Date.now() >= expiresAt;
}

export function debounce<A extends unknown[]>(fn: (...args: A) => void, ms: number) {
  let t: ReturnType<typeof setTimeout> | undefined;
  return (...args: A) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}`
        },
        {
          cmd: "test.each و beforeEach",
          title: "جدول حالات، وكل اختبار يبدأ نضيف",
          desc: R`[[it.each([...])]] بيشغّل نفس الاختبار على كل صف في جدول، وكل صف بيبقى اختبار لوحده باسمه. بدل ما تنسخ نفس الاختبار ٥ مرات.

[[beforeEach]] بيشتغل قبل كل اختبار: اعمل فيه object جديد، فكل اختبار يبدأ من الصفر ومفيش واحد بيسيب حاجة للتاني. و [[afterEach]] للتنضيف بعده.

و [[beforeAll]] / [[afterAll]] مرة واحدة للملف كله: لحاجة تقيلة زي فتح اتصال داتابيز.`,
          example: R`import { describe, it, expect, beforeEach } from "vitest";
import { discount, CouponStore } from "./coupon";

describe("discount", () => {
  it.each([
    { code: "SAVE10", total: 300, expected: 30 },
    { code: "FLAT50", total: 300, expected: 50 },
    { code: "FLAT50", total: 20, expected: 20 },
    { code: "BOGUS", total: 300, expected: 0 },
  ])("$code on $total gives $expected", ({ code, total, expected }) => {
    expect(discount(code, total)).toBe(expected);
  });
});

describe("CouponStore", () => {
  let store: CouponStore;
  beforeEach(() => {
    store = new CouponStore();
  });

  it("lets a user redeem a code once", () => {
    store.redeem("SAVE10", "u1");
    expect(() => store.redeem("SAVE10", "u1")).toThrow("already used");
  });

  it("starts clean in every test", () => {
    expect(() => store.redeem("SAVE10", "u1")).not.toThrow();
  });
});`,
          try: R`شغّل المثال بـ [[--reporter=verbose]] وشوف أسماء الحالات. وبعدين بوّظ العزل: شيل [[beforeEach]] واكتب [[const store = new CouponStore()]] مرة واحدة. شغّل الملف كله، وبعدين الاختبار التاني لوحده بـ [[-t "starts clean"]].`,
          flag: "script",
          deep: {
            why: "أسوأ اختبار هو اللي بيعدّي لوحده ويقع مع الباقي، أو العكس: بيعتمد على داتا سابها اختبار قبله. ده بيخلي الفشل عشوائي حسب الترتيب، والناس تبطّل تثق في الاختبارات. العزل (كل اختبار يجهّز حاجته بنفسه) بيحل ده. والجدول بيخليك تضيف حالة حدّية في سطر بدل ما تتكسل.",
            how: R`[[it.each(table)(name, fn)]]: الجدول array. لو كل صف object، الاسم يقدر يستخدم [[$code]] و [[$total]] من الـ object، والدالة بتاخد الصف كـ argument واحد تفكّه. ولو كل صف array ([[["SAVE10", 300, 30]]])، الاسم بيستخدم [[%s]] و [[%i]] بالترتيب، والدالة بتاخد العناصر كـ arguments منفصلة. وفيه [[describe.each]] لو عايز مجموعة كاملة لكل صف.

[[beforeEach]] جوه [[describe]] بيخص المجموعة دي بس. الترتيب: كل الـ beforeEach من برا لجوا، والاختبار، وبعدين الـ afterEach من جوا لبرا.

الـ [[let]] برا والتعيين جوه beforeEach: كده كل اختبار بياخد [[CouponStore]] جديد. لو [[const]] برا، كل الاختبارات بتشارك نفس الـ object، والتاني بيلاقي الكوبون مستخدم من الأول.

للداتابيز: [[beforeAll]] يفتح الاتصال، و [[afterAll]] يقفله (وإلا الـ process ميقفلش)، و [[beforeEach]] يمسح الجداول أو يبدأ transaction، و [[afterEach]] يرجّعها. (ده بالتفصيل في «تاب Backend بـ Node» المستوى التالت.)

و vitest بيشغّل الملفات بالتوازي، بس الاختبارات جوه الملف الواحد بالترتيب. فالعزل بين الملفات بيجي لوحده، وجوه الملف مسؤوليتك.`,
            when: "each: دالة ليها مدخلات كتير ومخرج (خصم، و validation، و parsing، و format تاريخ). beforeEach: أي object فيه state أو mock بيتسجّل عليه نداءات.",
            mistakes: R`state مشترك (const برا) فالاختبارات تعتمد على الترتيب، و [[-t]] يعدّي والملف كله يقع. و each بجدول ٤٠ صف بيختبر نفس الحاجة، فالتقرير طويل ومفيش فايدة زيادة: اختار الحدود (صفر، وأقل من الخصم، وأكبر، وقيمة غلط). و [[beforeAll]] لحاجة بتتغير (زي array) بدل beforeEach. وتحط منطق if جوه الـ each ([[if (code === "BOGUS") ...]]): لو محتاج if، يبقى دول اختبارين مختلفين.`
          },
          lines: [
            "beforeEach جنب الباقي.",
            "الدالة والـ class اللي بنختبرهم.",
            "مجموعة discount.",
            "جدول حالات، كل صف object.",
            "الخصم بالنسبة.",
            "الخصم الثابت.",
            "الخصم الثابت أكبر من الإجمالي: ميعدّيش الإجمالي.",
            "كود غلط: صفر.",
            "اسم كل حالة من قيم الصف، والدالة بتاخد الصف.",
            "نفس الشرط لكل صف.",
            "نهاية each.",
            "نهاية المجموعة.",
            "مجموعة CouponStore.",
            "متغير هيتملى قبل كل اختبار.",
            "قبل كل اختبار في المجموعة دي...",
            "store جديد فاضي.",
            "نهاية beforeEach.",
            "اختبار: الكوبون مرة واحدة لكل يوزر.",
            "أول مرة تعدّي.",
            "التانية ترمي.",
            "نهاية الاختبار.",
            "اختبار بيثبت إن مفيش حاجة فاضلة من اللي قبله.",
            "نفس الكوبون ونفس اليوزر، ومفيش خطأ لأن الـ store جديد.",
            "نهاية الاختبار.",
            "نهاية المجموعة."
          ],
          sol: R`الأصلي: ٦ اختبارات أخضر، والأسماء زي [[SAVE10 on 300 gives 30]] و [[FLAT50 on 20 gives 20]].

من غير beforeEach: الملف كله [[Tests 1 failed | 5 passed]]، والواقع [[starts clean in every test]] لأن الاختبار اللي قبله استخدم الكوبون في نفس الـ store. ومع [[-t "starts clean"]] لوحده: [[1 passed | 5 skipped]]. نفس الاختبار عدّى لوحده ووقع مع غيره، ودي علامة state مشترك.

الحل مش إنك ترتّب الاختبارات. الحل إن كل اختبار يعمل حاجته بنفسه (beforeEach).`,
          solCode: R`// src/coupon.ts
export function discount(code: string, total: number): number {
  if (code === "SAVE10") return Math.round(total * 0.1);
  if (code === "FLAT50") return Math.min(50, total);
  return 0;
}

export class CouponStore {
  private used = new Set<string>();
  redeem(code: string, userId: string) {
    const key = userId + ":" + code;
    if (this.used.has(key)) throw new Error("already used");
    this.used.add(key);
  }
}`
        },
        {
          cmd: "اختبار كويس",
          title: "إيه اللي يخلي الاختبار يستاهل",
          desc: R`الاختبار الكويس بيختبر السلوك (إيه اللي بيحصل) مش التنفيذ (إزاي بيحصل). لو غيّرت الكود من جوه والنتيجة هي هي، الاختبار المفروض يفضل أخضر.

وليه سبب واحد يقع: اسمه بيقول حاجة واحدة، ولما يقع تعرف إيه اللي باظ من غير ما تفتح الكود.

الأول هنا بيختبر التنفيذ (نادى [[randomUUID]] مرة)، والتاني بيختبر السلوك (كل يوزر ليه id مختلف).`,
          example: R`import { it, expect, vi } from "vitest";
import { signup } from "./signup";

// هش: بيختبر إزاي
it("calls randomUUID once", async () => {
  const spy = vi.spyOn(crypto, "randomUUID");
  await signup("a@b.co", { send: vi.fn() });
  expect(spy).toHaveBeenCalledTimes(1);
});

// كويس: بيختبر إيه
it("gives each new user a different id", async () => {
  const mailer = { send: vi.fn() };
  const a = await signup("a@b.co", mailer);
  const b = await signup("b@b.co", mailer);
  expect(a.id).not.toBe(b.id);
});`,
          try: R`الاختبار ده بيقع لو غيّرت نص الإيميل، أو طريقة الـ id، أو رسالة الخطأ، واسمه مبيقولش أنهي. قسّمه لاختبارات كل واحد بيختبر سلوك واحد: [[it("signup works", async () => { const mailer = { send: vi.fn() }; const user = await signup("a@b.co", mailer); expect(user.id).toHaveLength(36); expect(mailer.send).toHaveBeenCalledWith("a@b.co", "Welcome to MyApp"); await expect(signup("bad", mailer)).rejects.toThrow(); })]]`,
          flag: "script",
          deep: {
            why: "اختبارات بتختبر التنفيذ بتقع كل مرة تعمل refactor، حتى لو الكود لسه صح. فالناس بتبطّل تعمل refactor، أو بتعدّل الاختبار أوتوماتيك لحد ما يعدّي من غير ما تفكر، وساعتها الاختبار ملوش قيمة. الاختبار المفروض يقع لما السلوك يبوظ بس.",
            how: R`اسأل: «لو حد كتب الدالة دي من الأول بطريقة تانية تمامًا وبنفس السلوك، الاختبار هيعدّي؟» لو لأ، انت بتختبر التنفيذ.

علامات اختبار التنفيذ: spy على دالة داخلية أو private، وعدد مرات نداء حاجة جوه الكود مش side effect خارجي، و snapshot لـ object كبير فيه كل التفاصيل، و mock لكل dependency لحد ما الاختبار بقى نسخة من الكود.

الـ mock مقبول على الحدود: الإيميل اتبعت؟ الدفع اتطلب بالمبلغ الصح؟ دي سلوك الـ service من برا. بس «نادى randomUUID» ده تفصيلة، ولو غيّرتها لـ [[nanoid]] مفيش حاجة باظت.

وسبب واحد للفشل: اختبار بـ ٥ expects عن ٣ حاجات مختلفة، أول expect يقع والباقي ميتشغّلش، فمتعرفش لو فيه حاجة تانية بايظة. اختبار لكل سلوك، واسم بيقوله. أكتر من expect عادي لو كلهم بيوصفوا نفس النتيجة (الـ user راجع بالإيميل الصح والـ id موجود).

وباقي الصفات: سريع (ملي ثواني، من غير شبكة)، ومستقل (مبيعتمدش على ترتيب)، وثابت (نفس النتيجة كل مرة، من غير وقت حقيقي أو random)، ومقروء (تفهم الحالة من غير ما تقرا الكود).

وقبل ما تثق في اختبار جديد، بوّظ الكود عمدًا وشوفه بيقع. اختبار عمره ما وقع ممكن يكون مبيختبرش حاجة.`,
            when: "مع كل اختبار بتكتبه، وفي الـ code review: لو شفت اختبار بيعمل spy على private method، أو بيقع مع كل refactor، اسأل بيختبر إيه.",
            mistakes: R`coverage ١٠٠٪ كهدف، فتكتب اختبارات بتنادي كل سطر ومبتتأكدش من حاجة. و [[toMatchSnapshot()]] على كل حاجة، والناس تعمل [[-u]] من غير ما تبص. واختبار عمره ما وقع. وفي الانترفيو: «إيه اللي يخلي الاختبار هش؟» الإجابة: مربوط بالتنفيذ، أو بيعتمد على وقت أو ترتيب أو شبكة. و «امتى تعمل mock؟» على الحدود الخارجية بس.`
          },
          lines: [
            "هات it و expect و vi.",
            "الـ service.",
            "اختبار مربوط بالتنفيذ.",
            "بيتجسس على دالة داخلية.",
            "بيسجّل يوزر.",
            "ويتأكد إنها اتنادت مرة. لو غيّرتها لـ nanoid يقع والكود سليم.",
            "نهاية الاختبار.",
            "اختبار بيوصف السلوك من برا.",
            "mailer مزيّف.",
            "يوزر أول.",
            "يوزر تاني.",
            "اللي يهمنا فعلًا: كل واحد ليه id مختلف.",
            "نهاية الاختبار."
          ],
          sol: R`تلات اختبارات، كل واحد بسلوك واحد، واسمه جملة: [[gives every new user a different id]] و [[sends the welcome email to the address that signed up]] و [[rejects an invalid email without sending anything]]. النتيجة [[Tests 3 passed]].

لاحظ إن [[toHaveLength(36)]] اتشالت: طول الـ id تفصيلة تنفيذ، والسلوك إنه فريد. والـ subject بقى [[expect.any(String)]] لأن المهم العنوان. والاختبار التالت زاد حاجة كانت ناقصة: إن مفيش إيميل اتبعت للعنوان الغلط.

دلوقتي لو حد غيّر نص الترحيب، مفيش حاجة بتقع. ولو حد كسر الـ validation، اختبار واحد بيقع واسمه بيقول إيه.`,
          solCode: R`import { describe, it, expect, vi } from "vitest";
import { signup } from "./signup";

describe("signup", () => {
  it("gives every new user a different id", async () => {
    const mailer = { send: vi.fn() };
    const a = await signup("a@b.co", mailer);
    const b = await signup("b@b.co", mailer);
    expect(a.id).not.toBe(b.id);
  });

  it("sends the welcome email to the address that signed up", async () => {
    const mailer = { send: vi.fn() };
    await signup("a@b.co", mailer);
    expect(mailer.send).toHaveBeenCalledWith("a@b.co", expect.any(String));
  });

  it("rejects an invalid email without sending anything", async () => {
    const mailer = { send: vi.fn() };
    await expect(signup("bad", mailer)).rejects.toThrow("invalid email");
    expect(mailer.send).not.toHaveBeenCalled();
  });
});`
        }
      ]
    },
    {
      t: "Git hooks: الفحص قبل كل commit",
      l: 2,
      n: "husky بيشغّل الفحص لوحده، و lint-staged على الملفات المتغيرة بس، و commitlint على الرسالة",
      items: [
        {
          cmd: "husky",
          title: "hooks تتفعّل عند أي حد يسطّب المشروع",
          desc: R`Git بيشغّل سكربتات اسمها hooks في لحظات معينة: قبل الـ commit، وبعد ما تكتب الرسالة، وقبل الـ push. المشكلة إن فولدر [[.git/hooks]] مبيترفعش.

husky بيحط الـ hooks في فولدر [[.husky]] جوه المشروع، وسكربت [[prepare]] بيفعّلهم أوتوماتيك بعد أي install.`,
          example: R`npm i -D husky
npx husky init
cat .husky/pre-commit
npm pkg get scripts.prepare
git config core.hooksPath`,
          try: R`في مشروع الـ lab اعمل [[husky init]]، واكتب في [[.husky/pre-commit]] سطر [[npm test]]، واعمل commit وشوف الاختبارات بتشتغل قبله.`,
          deep: {
            why: "لو الفحص معتمد إن كل واحد «يفتكر» يشغّل lint قبل الـ commit، محدش هيفتكر. الـ hook بيخلي الفحص يحصل لوحده، والـ commit يترفض لو فشل.",
            how: R`Git لما ييجي يعمل commit، بيدوّر في فولدر الـ hooks على ملف اسمه [[pre-commit]]. لو موجود يشغّله، ولو رجع exit code مش صفر الـ commit يتلغي. وفيه hooks تانية: [[commit-msg]] (بياخد ملف الرسالة)، و [[pre-push]].

الفولدر الافتراضي [[.git/hooks]]، وده جوه [[.git]] فمبيترفعش ولا بينزل مع clone. husky بيغيّر إعداد [[core.hooksPath]] يشاور على [[.husky/_]]، وجواه ملفات صغيرة بتنادي الـ hooks بتاعتك اللي في [[.husky/]]، ودي ملفات عادية في المشروع بتترفع.

[[husky init]] بيعمل تلات حاجات: فولدر [[.husky]]، وملف [[.husky/pre-commit]] فيه [[npm test]]، وسكربت [["prepare": "husky"]] في package.json.

و [[prepare]] سكربت خاص: npm و pnpm بيشغّلوه لوحدهم بعد [[install]]. فأي حد يعمل clone و install، الـ hooks تتفعّل عنده من غير ما يعمل حاجة. و [[git config core.hooksPath]] بيقولك اتفعّلت فعلًا ولا لأ (المفروض يطبع [[.husky/_]]).`,
            when: "أي مشروع فيه lint أو اختبارات، خصوصًا لو عليه أكتر من شخص.",
            mistakes: R`تسطّب husky ومتعملش install بعدها (أو عملته بـ [[--ignore-scripts]])، فـ prepare مشتغلش و [[core.hooksPath]] فاضي. وفي Docker بـ [[npm ci --omit=dev]]، الـ prepare بيحاول يشغّل husky وهو مش متسطّب فالـ install يقع: خلّي السكربت [[husky || true]]. ([[HUSKY=0]] بيقفل husky لو متسطّب، زي CI، بس مبيمنعش «husky: not found».) والـ hooks تبقى تقيلة (اختبارات المشروع كله قبل كل commit) فالناس تتخطّاها: خلّي pre-commit سريع (lint-staged)، والتقيل في pre-push أو CI.`
          },
          lines: [
            "سطّب husky كـ dev dependency.",
            "جهّز husky: فولدر .husky، و hook اسمه pre-commit، وسكربت prepare.",
            "شوف الـ hook هيشغّل إيه (أول مرة فيه npm test).",
            "اتأكد إن سكربت prepare اتضاف، وده اللي بيفعّل الـ hooks بعد كل install.",
            "اتأكد إن Git بقى بيدوّر على الـ hooks في .husky/_."
          ]
        },
        {
          cmd: ".husky/pre-commit و commit-msg",
          title: "ملفات الـ hooks نفسها",
          desc: R`كل hook ملف بالاسم بالظبط ([[pre-commit]] أو [[commit-msg]] أو [[pre-push]]) جوه [[.husky/]]، وفيه أوامر shell عادية.

لو الملف مش موجود، مفيش حاجة بتحصل ومفيش رسالة تقولك. فبعد الإعداد جرّب commit غلط واتأكد إنه اترفض.`,
          example: R`echo "npx lint-staged" > .husky/pre-commit
echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg
echo "npm test" > .husky/pre-push
ls -la .husky
git add .husky
git commit --allow-empty -m "bad message"`,
          try: "اعمل الـ hooks التلاتة، وجرّب commit برسالة عشوائية: لازم يترفض. لو عدّى، فيه ملف ناقص.",
          deep: {
            why: "الـ hooks بتفشل بصمت. لو الملف مش موجود أو مكتوب غلط، Git بيعمل الـ commit عادي، وانت فاكر إن كل حاجة بتتفحص.",
            how: R`Git بيشغّل الملف اللي اسمه بالظبط زي الـ hook، من غير امتداد. [[pre-commit]] قبل ما يعمل الـ commit. [[commit-msg]] بعد ما تكتب الرسالة، وبيدّيله مسار ملف فيه الرسالة كأول argument، وده [["$1"]]. و [[pre-push]] قبل ما يرفع.

الملف بيتشغّل بـ sh حتى على ويندوز (Git for Windows جاي معاه sh). فالأوامر لازم تبقى shell، والملف لازم يبقى UTF-8 ونهاية سطوره LF.

[[npx --no -- commitlint]]: [[--no]] معناها «لو مش متسطّب متنزّلهوش من النت»، فلو حد نسي install يقع على طول بدل ما يستنى تحميل.

[[--allow-empty]] بيعمل commit من غير تعديلات، مفيد تجرّب بيه الـ hooks من غير ما تلمس ملفات. لو الـ commit عدّى برسالة زي [[bad message]]، يبقى [[commit-msg]] مش شغال.`,
            when: "مرة واحدة بعد husky init، ومع كل hook جديد. والتجربة بالـ commit الغلط بعد أي تعديل في الإعداد.",
            mistakes: R`في مشروع حقيقي كان husky و lint-staged و commitlint متسطّبين ومتظبطين، بس فولدر [[.husky]] مكانش فيه غير [[_]] (اللي husky بيولّده)، ومفيش [[pre-commit]] ولا [[commit-msg]]. يعني ولا hook اشتغل، والإعدادات كلها كانت ميتة ومحدش لاحظ. وكمان: لو كتبت الملف بـ [[echo >]] من Windows PowerShell 5.1، بيتحفظ UTF-16 والـ hook يبوظ بخطأ غريب، فاكتبه من Git Bash أو VS Code. ونسيان [[git add .husky]]، فالـ hooks شغالة عندك انت بس.`
          },
          lines: [
            "قبل كل commit: شغّل lint-staged على الملفات المتجهزة.",
            "بعد ما تكتب الرسالة: افحصها بـ commitlint. [[$1]] مسار ملف الرسالة.",
            "قبل كل push: شغّل الاختبارات.",
            "اتأكد إن الملفات موجودة فعلًا، مش فولدر _ لوحده.",
            "ضيفهم لـ Git عشان يوصلوا لباقي الفريق.",
            "جرّب commit برسالة غلط ومن غير تعديلات. المفروض يترفض."
          ]
        },
        {
          cmd: "lint-staged",
          title: "افحص الملفات المتغيرة بس",
          desc: R`lint-staged بياخد الملفات اللي عملتلها [[git add]] بس، ويشغّل عليها الأوامر حسب نوعها. فالـ pre-commit ياخد ثانيتين بدل دقيقة.

ولو [[--fix]] أو [[--write]] عدّلوا حاجة، التعديل بيدخل الـ commit لوحده.`,
          example: R`"lint-staged": {
  "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,yml,yaml}": ["prettier --write"]
}`,
          try: R`بوّظ المسافات في ملفين، اعمل add لواحد بس وبعدين commit: هتلاقي prettier ظبط الملف اللي في الـ commit بس، والتاني زي ما هو.`,
          flag: "script",
          deep: {
            why: "eslint و prettier على المشروع كله ممكن ياخدوا دقيقة. لو كل commit بيستنى دقيقة، الناس هتتخطّى الـ hook. وكمان ملوش لازمة تفحص ملفات متلمستش.",
            how: R`لما [[npx lint-staged]] يشتغل (عادةً من [[.husky/pre-commit]]):

بيسأل Git عن الملفات المتجهزة (staged)، ويقارنها بالـ patterns: كل ملف [[.ts]] يروح للأوامر بتاعة [[*.{ts,tsx,js,jsx}]]. بيشغّل الأوامر بالترتيب، وبيحط أسماء الملفات في آخر كل أمر، فـ [[eslint --fix]] بيبقى فعليًا [[eslint --fix src/a.ts src/b.ts]].

قبل ما يبدأ بيعمل نسخة احتياطية (stash) من حالتك، ولو أي أمر فشل بيرجّع كل حاجة زي ما كانت والـ commit يتلغي. ولو نجح والأوامر عدّلت الملفات، بيعمل [[git add]] للتعديلات لوحده. والتعديلات اللي في نفس الملف ومش متجهزة (عملت add لجزء بس) بيحافظ عليها ومش بيدخّلها الـ commit.

الأوامر اللي بتقبل أسماء ملفات بس هي اللي تنفع هنا. [[tsc --noEmit]] بيفحص المشروع كله بـ tsconfig، ولو بعتّله ملفات بيتجاهل الـ tsconfig، فمكانه CI أو pre-push.`,
            when: "في pre-commit لأي مشروع فيه eslint أو prettier.",
            mistakes: R`تحط [[tsc]] أو [[vitest run]] في lint-staged، فيطلع خطأ غريب أو يتجاهل الإعدادات لأن الملفات اتبعتت كـ arguments. واعتبار lint-staged كفاية: هو بيفحص الملفات المتغيرة بس، فملف تاني اتكسر بسبب تعديلك مش هيبان. عشان كده CI لازم يفحص المشروع كله برضه.`
          },
          lines: [
            "الإعدادات في package.json تحت اسم lint-staged.",
            "ملفات الكود: صلّح بـ eslint وبعدين نسّق بـ prettier، على الملفات المتجهزة بس.",
            "باقي الملفات (JSON و Markdown و YAML): نسّقها بس.",
            "نهاية الإعدادات."
          ]
        },
        {
          cmd: "commitlint",
          title: "رسالة الـ commit بصيغة ثابتة",
          desc: R`Conventional Commits صيغة للرسالة: [[type(scope): subject]]. الـ type من قايمة ثابتة ([[feat]] ميزة، و [[fix]] تصليح، و [[chore]] و [[docs]] و [[refactor]] و [[test]] و [[ci]])، والـ scope الجزء اللي اتغير.

commitlint بيرفض أي رسالة مش ماشية على الصيغة، من [[commit-msg]] hook.`,
          example: R`npm i -D @commitlint/cli @commitlint/config-conventional
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
echo "fixed stuff" | npx commitlint
git commit -m "feat(cart): add coupon field"
git commit -m "fix(auth): refresh token before expiry"
git commit -m "chore(deps): bump vite"
git commit -m "feat(api)!: rename /users to /members"`,
          try: R`جرّب [[echo "update" | npx commitlint]] واقرا الأخطاء، وبعدين صلّح الرسالة لحد ما تعدّي.`,
          deep: {
            why: "[[git log]] مليان «update» و «fix» و «asdf» ملوش أي فايدة. بصيغة ثابتة، تقرا التاريخ بسرعة وتعرف كل commit بيعمل إيه من أول كلمة، وأدوات تقدر تطلّع changelog ورقم النسخة الجاية لوحدها.",
            how: R`الصيغة: [[type(scope): subject]]، وبعدها سطر فاضي، وبعدين body اختياري.

[[feat]] ميزة جديدة. [[fix]] تصليح bug. [[refactor]] تغيير في الكود من غير ما السلوك يتغير. [[docs]] توثيق. [[test]] اختبارات. [[chore]] صيانة (مكتبات، إعدادات). [[ci]] ملفات CI. [[style]] تنسيق بس.

و [[!]] بعد الـ type (أو سطر [[BREAKING CHANGE:]] في الـ body) معناها تغيير بيكسر الاستخدام القديم.

وده مش ديكور: أدوات زي semantic-release و changesets بتقرا التاريخ: [[fix]] يزوّد رقم الـ patch (من 1.2.3 لـ 1.2.4)، و [[feat]] الـ minor (لـ 1.3.0)، و [[!]] الـ major (لـ 2.0.0)، وبتكتب الـ changelog لوحدها.

commitlint بيقرا [[commitlint.config.js]]، و [[config-conventional]] فيها القواعد القياسية. وتقدر تقفل قاعدة: [[rules: { 'subject-case': [0] }]] (الصفر معناه off). ومن [[.husky/commit-msg]] بيقرا ملف الرسالة بـ [[--edit "$1"]]، ومن الترمنال تبعتله الرسالة بـ pipe تجرّب.`,
            when: "من أول commit في المشروع. ولو فريق، اكتبوا قايمة الـ scopes المسموحة في CONTRIBUTING أو في rules.",
            mistakes: R`تفعّل commitlint وتنسى ملف [[.husky/commit-msg]]، فمحدش بيتفحص (دي بالظبط المشكلة اللي في الدرس اللي فات). ورسالة أول commit بعد الإعداد نفسها لازم تعدّي: [[chore: add git hooks]] مش [[add hooks]]. وقاعدة [[subject-case]] الافتراضية بترفض subject مكتوب زي جملة بحرف كابيتال (Add coupon field)، فإما تكتب صغير أو تقفل القاعدة. ولو كتبت ملف الإعداد بـ echo من Windows PowerShell 5.1 بيتحفظ UTF-16 ومبيتقريش.`
          },
          lines: [
            "سطّب commitlint والقواعد القياسية.",
            "اعمل ملف الإعداد اللي بيقول استخدم Conventional Commits.",
            "جرّب رسالة من غير hook: هيرفضها ويقولك ليه.",
            "ميزة جديدة في جزء الـ cart.",
            "تصليح bug في جزء الـ auth.",
            "صيانة: تحديث مكتبة.",
            "[[!]] معناها تغيير بيكسر اللي بيستخدم الـ API القديم."
          ]
        },
        {
          cmd: "HUSKY=0 و --no-verify",
          title: "تخطّى الـ hooks في الطوارئ",
          desc: R`[[--no-verify]] بيخلي Git ميشغّلش [[pre-commit]] و [[commit-msg]] للـ commit ده بس. و [[HUSKY=0]] بيقفل كل hooks husky للأمر ده، مفيد مع rebase اللي بيعمل commits كتير.

و [[HUSKY=2]] بيطبع كل سطر في الـ hook وهو بيتنفّذ، عشان تعرف بيقع فين.`,
          example: R`git commit --no-verify -m "wip: save before switching"
HUSKY=0 git commit -m "wip"
HUSKY=0 git rebase -i HEAD~5
HUSKY=2 git commit -m "fix: debug hook"
git push --no-verify`,
          try: R`اعمل pre-commit بيقع دايمًا ([[exit 1]])، وجرّب commit عادي (هيترفض)، وبعدين بـ [[--no-verify]]، وبعدين بـ [[HUSKY=2]] وشوف السطور بتتطبع.`,
          deep: {
            why: "مرات محتاج تحفظ شغل نص نص بسرعة قبل ما تنقل branch، أو rebase بيعيد عشرين commit وكل واحد بيشغّل lint. ومرات الـ hook نفسه بايظ ومش عارف ليه.",
            how: R`[[--no-verify]] فلاج في Git نفسه، فبيشتغل مع أي hooks مش husky بس. في [[commit]] بيتخطّى [[pre-commit]] و [[commit-msg]]، وفي [[push]] بيتخطّى [[pre-push]].

[[HUSKY=0]] متغير بيئة husky بيقراه في أول كل hook ويخرج على طول. ميزته إنه بيغطّي أي أمر Git بيعمل commits كتير (rebase و cherry-pick و merge). والشكل [[VAR=value command]] بتاع bash و Git Bash. في PowerShell: [[$env:HUSKY=0]] وبعدين الأمر، وبعدها رجّعه.

[[HUSKY=2]] بيشغّل الـ hook بـ [[sh -x]]، فكل سطر بيتطبع قبل ما يتنفّذ.

والمهم: التخطّي على جهازك بس. الـ CI بيشغّل نفس الفحوصات على المشروع كله، فاللي هربت منه هنا هيقع هناك.`,
            when: "commit مؤقت (wip) هتعمله squash بعدين. rebase طويل. hook بايظ وعايز تصلّحه. مش عشان «الـ lint زهّقني».",
            mistakes: R`تتعوّد على [[--no-verify]] فالـ hooks تبقى ملهاش لازمة، والـ CI يقع بعد ما رفعت. و [[$env:HUSKY=0]] في PowerShell وتنسى ترجّعه، فالـ hooks تفضل مقفولة لحد ما تقفل الترمنال.`
          },
          lines: [
            "commit من غير pre-commit و commit-msg، للمرة دي بس.",
            "نفس الفكرة بمتغير husky (bash و Git Bash).",
            "rebase طويل من غير ما كل commit يشغّل الـ hooks.",
            "شغّل الـ hook واطبع كل سطر فيه عشان تعرف بيقع فين.",
            "push من غير pre-push."
          ]
        }
      ]
    },
    {
      t: "CI والـ monorepo",
      l: 3,
      n: "نفس الفحوصات على كل PR، بالترتيب الصح، على كل الباكدجات، وبسرعة",
      items: [
        {
          cmd: "ترتيب الفحص في CI",
          title: "كل الفحوصات على كل PR بالترتيب",
          desc: R`workflow واحد بيشغّل الفحوصات بالترتيب: الشكل، وبعدين lint، وبعدين الأنواع، وبعدين الاختبارات، وبعدين build. كل خطوة أرخص وأسرع من اللي بعدها، فالغلط البسيط يقع في ثواني بدل ما تستنى الاختبارات.

و [[pull_request]] من غير branches معناها أي PR على أي branch يتفحص.`,
          example: R`name: CI
on:
  push:
    branches: [main]
  pull_request:
concurrency:
  group: ci-$__{{ github.ref }}
  cancel-in-progress: true
permissions:
  contents: read
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: pnpm/action-setup@v6
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm format:check
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm build`,
          try: "حط الملف في repo التجربة، واعمل PR فيه ملف مش متنسّق، وشوف إنه وقع في خطوة format في ثواني من غير ما يوصل للاختبارات.",
          flag: "script",
          deep: {
            why: "الـ hooks على جهازك ممكن تتخطّى، أو حد ميكونش عمل install، أو lint-staged فحص الملفات المتغيرة بس. CI هو الحارس الأخير: بيفحص المشروع كله على ماكينة نضيفة، والـ PR ميدخلش main إلا وهو أخضر.",
            how: R`الترتيب مقصود. prettier بياخد ثواني، و eslint أقل من دقيقة، و tsc حوالي دقيقة، والاختبارات ممكن دقايق، والـ build الأتقل. أي خطوة تقع، اللي بعدها مبتشتغلش، فالفشل الرخيص بيبان بسرعة ومبتضيّعش دقايق Actions.

وكل خطوة بتنادي سكربت من package.json ([[pnpm lint]])، مش الأمر نفسه. فالأمر مكتوب في مكان واحد، وهو هو اللي بتشغّله على جهازك. وفي monorepo السكربتات دي في الجذر بتنادي [[pnpm -r]] (الدرس الجاي)، فالـ CI مش محتاج يعرف أسماء الباكدجات.

[[pnpm/action-setup]] بيسطّب pnpm بالنسخة اللي في حقل [[packageManager]] في package.json، ولازم ييجي قبل [[setup-node]] عشان [[cache: pnpm]] محتاج pnpm موجود. و [[--frozen-lockfile]] بيرفض يعدّل [[pnpm-lock.yaml]]: لو package.json اتغير والـ lock لأ، يقع، بدل ما يسطّب نسخ مختلفة عن اللي عندك.

[[concurrency]] بيلغي الـ run القديم لو عملت push جديد على نفس الـ branch، و [[permissions]] بيدّي الـ job أقل صلاحية محتاجها. (الاتنين مشروحين في تاب GitHub Actions.)`,
            when: "أي repo عليه أكتر من شخص أو فيه deploy أوتوماتيك. وخلّي الـ PR ميتدمجش غير لما CI يبقى أخضر (branch protection من إعدادات GitHub).",
            mistakes: R`في مشروع حقيقي كان [[pnpm/action-setup]] مكتوب فيه [[version: 10]] وكمان [[packageManager]] في package.json، ولو الاتنين اختلفوا الـ action بيقع: سيب واحد بس، والأحسن packageManager. ونفس المشروع كان الـ CONTRIBUTING فيه إن الـ PRs بتروح لـ dev، والـ CI شغال على PRs لـ main بس، فكل PRs الـ dev كانت بتدخل من غير فحص، ومكانش فيه concurrency ولا permissions. وفي مشروع تاني [[setup-node]] من غير [[cache: pnpm]]، فكل run بينزّل المكتبات من الأول.`
          },
          lines: [
            "اسم الـ workflow.",
            "بيشتغل إمتى:",
            "مع كل push...",
            "...على main.",
            "ومع أي PR على أي branch.",
            "لو جه push جديد...",
            "...على نفس الـ branch (المجموعة باسم الـ ref)...",
            "...الغي الـ run القديم.",
            "صلاحيات الـ token:",
            "قراية الكود بس.",
            "المهام.",
            "مهمة واحدة اسمها quality.",
            "على ماكينة أوبونتو نضيفة.",
            "الخطوات بالترتيب، وأي واحدة تقع بتوقف اللي بعدها.",
            "هات الكود.",
            "سطّب pnpm بالنسخة اللي في packageManager. لازم قبل setup-node.",
            "سطّب Node...",
            "بالإعدادات دي:",
            "نسخة 24.",
            "وكاش لمكتبات pnpm بين الـ runs.",
            "سطّب بالظبط اللي في الـ lock، ويقع لو الـ lock مش متحدّث.",
            "الشكل (prettier --check): ثواني.",
            "eslint على المشروع كله، وأي warning يوقّع.",
            "الأنواع (tsc --noEmit).",
            "الاختبارات مرة واحدة.",
            "الـ build في الآخر لأنه الأتقل."
          ]
        },
        {
          cmd: "pnpm -r و --filter",
          title: "شغّل الفحص على كل الباكدجات أو بعضها",
          desc: R`في monorepo (apps/web و apps/api و packages/shared)، [[pnpm -r run X]] بيشغّل السكربت X في كل باكدج عنده، بترتيب الاعتماد.

و [[--filter]] بيحدد مين: باكدج بالاسم، أو فولدر، أو «اللي اتغير من main بس».`,
          example: R`pnpm -r run typecheck
pnpm -r --if-present run test
pnpm --filter @myapp/web run lint
pnpm --filter "./apps/**" run build
pnpm --filter "...[origin/main]" run test
pnpm --filter @myapp/web... run build
npm run test --workspaces --if-present`,
          try: R`في monorepo تجربة فيه باكدجين، عدّل واحد بس واعمل commit، وشغّل [[pnpm --filter "...[HEAD~1]" run test]] ولاحظ مين اتشغّل.`,
          deep: {
            why: "lint و tsc والاختبارات كل باكدج ليه بتوعه (tsconfig مختلف، و eslint مختلف). في CI محتاج تشغّلهم كلهم بأمر واحد، وعلى جهازك محتاج تشغّل اللي بتشتغل فيه بس.",
            how: R`pnpm بيعرف الباكدجات من [[pnpm-workspace.yaml]] (مثلًا [[apps/*]] و [[packages/*]]).

[[-r]] (recursive) بيلف على كل الباكدجات ويشغّل السكربت في كل واحد عنده. والترتيب topological: لو web بيعتمد على shared، shared بيخلص الأول، ودي مهمة للـ build. والباكدجات المستقلة بتشتغل بالتوازي.

[[--filter]] بيختار:
[[--filter @myapp/web]] باكدج بالاسم (الاسم اللي في package.json بتاعه، مش اسم الفولدر).
[[--filter "./apps/**"]] كل اللي تحت فولدر.
[[--filter @myapp/web...]] الباكدج ده وكل اللي هو معتمد عليه (عشان تبني shared قبل web).
[[--filter "...[origin/main]"]] الباكدجات اللي فيها ملفات اتغيرت من main، ومعاها كل اللي بيعتمد عليها. ده اللي بيخلي CI في monorepo كبير سريع: عدّلت shared؟ اختبر shared و web و api. عدّلت web بس؟ web بس.

والشكل المعتاد: السكربتات في package.json الجذر تبقى [["typecheck": "pnpm -r run typecheck"]]، فانت و CI بتكتبوا [[pnpm typecheck]] وخلاص.

و npm workspaces فيه نفس الفكرة بـ [[--workspaces]] و [[-w]] (في تاب Node).`,
            when: "أي monorepo. [[-r]] في CI وفي سكربتات الجذر. [[--filter]] على جهازك وانت شغال في تطبيق واحد، وفي CI لو المشروع كبر والفحص الكامل بقى بطيء.",
            mistakes: R`[["...[origin/main]"]] في CI من غير ما الـ checkout يجيب التاريخ: [[actions/checkout]] افتراضيًا بيجيب آخر commit بس، فـ pnpm ميلاقيش origin/main، فمحتاج [[fetch-depth: 0]]. وتنسى إن [[-r]] مبيشغّلش سكربت الجذر نفسه. وباكدج جديدة ملهاش سكربت typecheck، فمحدش بيفحصها وانت فاكر إن [[-r]] غطّى الكل.`
          },
          lines: [
            "شغّل typecheck في كل باكدج عنده السكربت ده، بترتيب الاعتماد.",
            "test في كل باكدج، ومتقعش لو مفيش ولا واحد عنده السكربت.",
            "lint في باكدج web بس، بالاسم اللي في package.json بتاعها.",
            "build لكل الباكدجات اللي تحت apps.",
            "الاختبارات للباكدجات اللي اتغيرت من main واللي بيعتمد عليها بس.",
            "ابني web ومعاها كل الباكدجات اللي هي معتمدة عليها.",
            "نفس فكرة [[-r]] في npm workspaces."
          ]
        },
        {
          cmd: "git diff --exit-code",
          title: "اتأكد إن الملفات المتولّدة متحدّثة",
          desc: R`فيه ملفات بتتولّد بأمر ومحفوظة في Git: types الداتابيز، أو client الـ API. لو حد غيّر المصدر ونسي يولّد تاني، الملف المحفوظ بيبقى كدّاب.

في CI بتولّد تاني وتقول [[git diff --exit-code]]: لو فيه أي فرق، يرجع 1 والـ CI يقع.`,
          example: R`supabase gen types typescript --project-id "$PROJECT_REF" > lib/database.types.ts
git diff --exit-code lib/database.types.ts
git diff --exit-code --stat
git status --porcelain
test -z "$(git status --porcelain)" || { git status --short; exit 1; }`,
          try: R`في repo التجربة عدّل ملف متابَع وشغّل [[git diff --exit-code; echo $?]]: هيطبع 1. رجّعه بـ [[git restore]] وجرّب تاني: 0.`,
          deep: {
            why: "مثال: [[database.types.ts]] متولّد من الداتابيز. حد ضاف عمود بـ migration ومعملش gen types، فالكود بيستخدم types قديمة، و tsc بيعدّي لأن الملف القديم متسق مع نفسه، والغلط يبان في الإنتاج. الفحص ده بيمسك «نسيت تولّد».",
            how: R`[[git diff]] عادةً بيطبع الفرق ويرجع 0 دايمًا. [[--exit-code]] بيخليه يرجع 1 لو فيه أي فرق، فيبقى شرط في سكربت أو CI. (و [[--quiet]] نفس الحاجة من غير طباعة.)

الفكرة: CI عنده نسخة نضيفة من الـ repo. بيشغّل نفس أمر التوليد اللي المفروض انت شغّلته. لو الناتج نفس الملف المحفوظ بالظبط، [[git diff]] فاضي والخطوة تعدّي. لو مختلف، يطبع الفرق (فتعرف إيه اللي ناقص) ويقع.

بس خد بالك: [[git diff]] بيشوف الملفات المتابعة بس. لو التوليد عمل ملف جديد خالص، مش هيبان. [[git status --porcelain]] بيطبع أي تغيير بما فيه الملفات الجديدة، بشكل ثابت معمول للسكربتات، و [[test -z]] بيتأكد إنه فاضي.

ونفس الفكرة تنفع لأي حاجة بتتولّد: types من الداتابيز، و client من OpenAPI، وحتى [[prettier --write]] في CI (لو غيّر حاجة يبقى حد مشغّلهوش). والـ lock ليه فحصه الخاص: [[--frozen-lockfile]].`,
            when: "أي ملف متولّد ومحفوظ في Git. في CI بعد خطوة التوليد، أو في pre-push.",
            mistakes: R`الناتج يطلع مختلف بين جهازك و CI لأسباب ملهاش دعوة بالمحتوى: نسخة CLI مختلفة بتطبع بترتيب مختلف، أو CRLF على ويندوز. ثبّت نسخة الأداة، وخلّي الملف LF ([[.gitattributes]]). وتولّد من الداتابيز البعيدة في CI فتحتاج توكن ([[SUPABASE_ACCESS_TOKEN]] في secrets)، والأسهل تولّد من داتابيز محلية فيها نفس الـ migrations ([[--local]]). وتنسى إن [[git diff]] مبيشوفش الملفات الجديدة.`
          },
          lines: [
            "ولّد الـ types من الداتابيز واكتبها فوق الملف المحفوظ.",
            "لو الملف اختلف عن اللي في Git، اطبع الفرق وارجع 1.",
            "نفسه للمشروع كله، بس اطبع أسماء الملفات وعدد السطور.",
            "كل التغييرات حتى الملفات الجديدة، بشكل ثابت للسكربتات.",
            "لو فيه أي تغيير، اعرضه واقفل بفشل."
          ]
        },
        {
          cmd: "فحص أسرع",
          title: "خلّي الفحص ياخد ثواني مش دقايق",
          desc: R`كل أداة فيها كاش: [[eslint --cache]] و [[prettier --cache]] بيتخطّوا الملفات اللي متغيرتش من آخر مرة، و [[tsc --incremental]] بيفتكر اللي فحصه. و vitest بيقدر يشغّل الاختبارات اللي ليها علاقة بالملفات المتغيرة بس.

والفحص السريع هو اللي الناس بتسيبه شغال.`,
          example: R`npx eslint . --cache --cache-location node_modules/.cache/eslint/
npx prettier --check . --cache
npx tsc --noEmit --incremental --tsBuildInfoFile node_modules/.cache/tsbuildinfo
npx vitest run --changed origin/main
npx vitest related src/cart/total.ts --run
time npm run check`,
          try: R`شغّل [[time npx eslint .]] مرتين، وبعدين بـ [[--cache]] مرتين، وقارن المرة التانية في الحالتين.`,
          deep: {
            why: "لما [[npm run check]] ياخد ٣ دقايق، محدش بيشغّله قبل الـ push، والـ hooks بتتخطّى، و CI بيبقى أول مكان الغلط بيبان فيه. كل ثانية بتوفّرها بتخلي الفحص يحصل فعلًا.",
            how: R`الكاش في الأدوات دي نفس الفكرة: بيحفظ بصمة كل ملف (hash أو وقت التعديل) ونتيجته. المرة الجاية، الملف اللي بصمته متغيرتش ياخد النتيجة القديمة من غير فحص. في مشروع فيه ألف ملف وانت عدّلت ٣، الفرق ضخم.

[[eslint --cache]] بيكتب ملف الكاش في [[.eslintcache]] أو المكان اللي تحدده بـ [[--cache-location]]. و [[prettier --cache]] بيحفظ في [[node_modules/.cache/prettier]].

[[tsc --incremental]] بيكتب ملف [[.tsbuildinfo]] فيه شجرة الاعتماد بين الملفات، فالمرة الجاية بيفحص الملفات اللي اتغيرت واللي بتعتمد عليها بس.

[[vitest run --changed origin/main]] بيشغّل الاختبارات اللي بتستورد (مباشر أو بالتسلسل) ملفات اتغيرت من main. و [[vitest related file]] نفس الفكرة لملف معين، ومن غير [[--run]] بيقعد watch.

الكاش في [[node_modules/.cache]] عشان يبقى متجاهَل في Git من غير إعداد زيادة. وفي CI تقدر تحفظ الفولدر ده بين الـ runs بـ [[actions/cache]].

وباقي السرعة من التنظيم: الخطوات الرخيصة الأول، و lint-staged قبل الـ commit بدل المشروع كله، والتقيل (الاختبارات الكاملة و e2e) في CI أو pre-push.`,
            when: "أول ما الفحص يعدّي ٢٠ أو ٣٠ ثانية على جهازك. و [[--changed]] في CI للـ PRs في مشروع كبير، مع فحص كامل على main.",
            mistakes: R`ملف كاش جوه المشروع ومش في [[.gitignore]] فيدخل commit (زي [[.eslintcache]]). و [[vitest --changed]] كفحص وحيد: اختبار بيعتمد على ملف JSON أو على الداتابيز مش هيتحسب «متأثر» ومش هيتشغّل، فخلّي فحص كامل على main أو كل ليلة. و [[--changed origin/main]] في CI من غير [[fetch-depth: 0]]، فمفيش origin/main أصلًا.`
          },
          lines: [
            "lint بكاش: الملفات اللي متغيرتش مش بتتفحص تاني.",
            "نفسه لـ prettier.",
            "tsc يفتكر اللي فحصه في ملف، ويفحص المتغير واللي بيعتمد عليه بس.",
            "الاختبارات اللي ليها علاقة بملفات اتغيرت من main بس.",
            "الاختبارات اللي بتلمس الملف ده، مرة واحدة من غير watch.",
            "قيس الفحص كله بياخد كام ثانية."
          ]
        }
      ]
    },
    {
      t: "Playwright: e2e في متصفح حقيقي",
      l: 3,
      n: "login من أوله لآخره، و locators متتكسرش، و login مرة واحدة، و trace للـ CI، و a11y وميزانية أداء في كل PR",
      items: [
        {
          cmd: "npm init playwright",
          title: "جهّز Playwright في المشروع",
          desc: R`[[npm init playwright@latest]] بيسطّب [[@playwright/test]]، ويعمل [[playwright.config.ts]] وفولدر اختبارات فيه مثال، ويسألك تنزّل المتصفحات ولا لأ. و [[--gha]] بيضيف workflow لـ GitHub Actions.

[[npx playwright install]] بينزّل المتصفحات نفسها (Chromium و Firefox و WebKit) في كاش برا المشروع. و [[--with-deps]] بيسطّب مكتبات لينكس اللي محتاجاها، ودي للـ CI.

[[--ui]] بيفتح واجهة تشغّل منها الاختبارات وتشوف كل خطوة، و [[codegen]] بيسجّل اللي بتعمله في المتصفح ويكتبه كود.`,
          example: R`npm init playwright@latest
npm init playwright@latest -- --quiet --lang=ts --browser=chromium --gha
npx playwright install --with-deps chromium
npx playwright test
npx playwright test --ui
npx playwright codegen http://localhost:3000
npx playwright show-report`,
          try: R`في مشروع الـ lab، شغّل التاني ([[--quiet]]) وشوف الملفات اللي اتعملت. بعدين [[npx playwright install chromium]] و [[npx playwright test]]. وجرّب [[codegen]] على أي موقع، ادوس على كام حاجة، واقرا الكود اللي طلع.`,
          deep: {
            why: "الـ unit tests بتقول [[cartTotal]] صح، و supertest بيقول الـ API صح، بس محدش فيهم بيقول «اليوزر يقدر يسجّل دخول ويدفع». الـ cookie ممكن متتحفظش، أو الـ redirect يروح لمكان غلط، أو زرار مغطّي بـ modal. e2e بيشغّل المتصفح الحقيقي على التطبيق كله زي اليوزر بالظبط.",
            how: R`[[@playwright/test]] حاجتين: مكتبة بتتحكم في المتصفح (افتح صفحة، اكتب، دوس)، و test runner خاص بيها ([[playwright test]]) بيشغّل الملفات بالتوازي في workers، كل اختبار في browser context نضيف (زي incognito جديد).

المتصفحات مش من npm. [[playwright install]] بينزّل نسخ معينة متظبطة على نسخة Playwright دي بالظبط، في [[~/.cache/ms-playwright]] على لينكس. لو رقّيت [[@playwright/test]] لازم تعيد install، وإلا هيقولك «Executable doesn't exist». و [[--with-deps]] بيستخدم apt يسطّب مكتبات النظام (fonts و libnss وغيرهم)، فمحتاج sudo، وده الطبيعي في CI.

الـ init بيعمل: [[playwright.config.ts]]، و [[tests/example.spec.ts]]، ويضيف للـ [[.gitignore]] الفولدرات اللي بتتولّد ([[test-results/]] و [[playwright-report/]] و [[playwright/.auth/]])، ومع [[--gha]] ملف [[.github/workflows/playwright.yml]].

[[--ui]] أحسن طريقة وانت بتكتب: قايمة الاختبارات، وتشغّل واحد، وتشوف لقطة لكل خطوة، ووضع watch. و [[--headed]] يفتح المتصفح قدامك، و [[--debug]] يوقف عند كل خطوة. و [[show-report]] بيفتح تقرير HTML بعد التشغيل.

[[codegen]] بيفتح متصفح وكل ما تدوس أو تكتب بيطلّعلك سطر كود، وبيختار locators كويسة ([[getByRole]]). بداية ممتازة، بس بعدها نضّف الكود وضيف الـ assertions بنفسك.`,
            when: "أول ما يبقى عندك flow حرج بيعدّي على كذا صفحة وسيرفر: login، و checkout، و onboarding. ومش لكل حاجة: كل e2e بياخد ثواني.",
            mistakes: R`تسطّب المتصفحات التلاتة وانت محتاج Chromium بس، فالـ CI ينزّل ٤٠٠ ميجا كل مرة: حدد [[chromium]] في الـ install وفي الـ projects. وترقّي [[@playwright/test]] من غير [[playwright install]]، فكل الاختبارات تقع بـ «Executable doesn't exist». وتحط [[tests/]] بتاعة Playwright في نفس مكان اختبارات vitest، فـ vitest يحاول يشغّل ملفات [[.spec.ts]] بتاعة Playwright ويقع: خليها في [[e2e/]] وقول لـ vitest يستثنيه ([[exclude]]).`
          },
          lines: [
            "جهّز Playwright بأسئلة تفاعلية.",
            "نفسه من غير أسئلة: TypeScript، و Chromium بس، و workflow لـ GitHub Actions.",
            "نزّل Chromium ومكتبات لينكس اللي محتاجها (للـ CI أو أول مرة).",
            "شغّل كل الاختبارات headless.",
            "واجهة تشغّل منها وتشوف كل خطوة.",
            "سجّل اللي بتعمله في المتصفح واكتبه كود.",
            "افتح تقرير HTML لآخر تشغيل."
          ],
          sol: R`بعد الـ init هتلاقي: [[playwright.config.ts]]، و [[tests/example.spec.ts]]، و [[.github/workflows/playwright.yml]] (من [[--gha]])، وسطور جديدة في [[.gitignore]] زي [[/test-results/]] و [[/playwright-report/]] و [[/playwright/.auth/]]، و [[@playwright/test]] في devDependencies.

[[npx playwright test]] بيطبع [[Running 2 tests using 2 workers]] وبعدين [[2 passed]] (المثال بيفتح موقع playwright.dev، فمحتاج نت).

لو طلعلك [[Executable doesn't exist at ...]] يبقى المتصفحات مش متنزّلة أو نسختها مش بتاعة Playwright ده: [[npx playwright install chromium]].`
        },
        {
          cmd: "playwright.config.ts",
          title: "الإعدادات: السيرفر والعنوان والمتصفحات",
          desc: R`[[webServer]] بيشغّل تطبيقك قبل الاختبارات ويستنى لحد ما العنوان يرد، ويقفله بعدها. و [[baseURL]] بيخليك تكتب [[page.goto("/login")]] بدل العنوان كامل.

[[retries]] و [[trace]] للـ CI بس: لو اختبار وقع يتعاد، ويتسجّل trace تفتحه بعدين. و [[forbidOnly]] بيمنع [[test.only]] اللي حد نسيه.`,
          example: R`import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["html", { open: "never" }], ["github"]] : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: process.env.CI ? "npm run start" : "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});`,
          try: R`حط الإعدادات دي في مشروعك (أو في الـ lab مع سيرفر بسيط)، واقفل السيرفر وشغّل [[npx playwright test]]: Playwright هيشغّله لوحده. بعدين شغّل السيرفر بإيدك وشغّل الاختبارات تاني ولاحظ الفرق في الوقت.`,
          flag: "script",
          deep: {
            why: "من غير webServer، لازم تفتكر تشغّل السيرفر في ترمنال تاني قبل الاختبارات، وفي CI محتاج سكربت يشغّله في الخلفية ويستنى. ومن غير baseURL، كل اختبار فيه [[http://localhost:3000]] ولما تغيّر البورت تعدّل عشرين ملف.",
            how: R`[[webServer.command]] بيتشغّل في shell، و Playwright بيعمل طلبات على [[url]] لحد ما يرجع أي status مش خطأ (2xx أو 3xx أو 400-403)، وبعدين يبدأ الاختبارات، ولو عدّى [[timeout]] يقع. في CI بنشغّل [[npm run start]] على build حقيقي لأنه أقرب للإنتاج وأسرع من dev (Next في dev بيعمل compile لكل صفحة أول مرة). و [[reuseExistingServer]] على جهازك: لو السيرفر شغال أصلًا يستخدمه بدل ما يقع بـ «port already in use».

[[use]] إعدادات لكل الاختبارات: [[baseURL]]، و [[trace]]، و [[screenshot: "only-on-failure"]]، و [[locale]] و [[timezoneId]] لو التطبيق عربي.

[[projects]] بتشغّل نفس الاختبارات بإعدادات مختلفة: Chrome، و Firefox، و موبايل ([[devices["Pixel 7"]]]). كل project ليه اسم تختاره بـ [[--project=chromium]].

[[fullyParallel]] بيشغّل الاختبارات جوه الملف الواحد بالتوازي كمان. [[workers: 1]] في CI عشان ماكينة GitHub صغيرة وعشان الاختبارات متتخانقش على نفس الداتابيز. و [[!!process.env.CI]] بيحوّل النص لـ true/false.

والـ reporter [[github]] بيحط الأخطاء كـ annotations على السطر في الـ PR، و [[html]] بيعمل تقرير ترفعه artifact.`,
            when: "مرة واحدة لما تجهّز Playwright. وتعدّله لما تضيف متصفح أو setup project (الدرس الجاي بعد اللي جاي).",
            mistakes: R`[[retries: 2]] على جهازك، فالاختبار الـ flaky بيعدّي في التانية ومتاخدش بالك: خليها في CI بس، وبص على كلمة flaky في التقرير. و [[url]] في webServer بيشاور على صفحة بترجع 500 وقت ما الداتابيز لسه مش جاهزة، فيستنى لحد الـ timeout. و [[npm run dev]] في CI فأول اختبار ياخد ٣٠ ثانية compile ويقع بالـ timeout. وتنسى إن [[baseURL]] من غير [[/]] في الآخر، و [[goto("login")]] من غير [[/]] ممكن يروح لمكان غلط حسب الصفحة الحالية.`
          },
          lines: [
            "defineConfig للـ autocomplete، و devices فيها إعدادات جاهزة لكل متصفح وجهاز.",
            "الإعدادات كلها.",
            "الاختبارات في فولدر e2e (بعيد عن اختبارات vitest).",
            "حتى الاختبارات جوه الملف الواحد بالتوازي.",
            "في CI: لو حد نسي test.only، الـ run يقع.",
            "في CI: الاختبار اللي يقع يتعاد مرتين.",
            "في CI: worker واحد، وعلى جهازك Playwright يختار حسب الـ CPU.",
            "في CI: تقرير HTML و annotations على الـ PR. على جهازك: قايمة في الترمنال.",
            "إعدادات لكل الاختبارات:",
            "goto('/login') يبقى على العنوان ده.",
            "سجّل trace لو الاختبار وقع واتعاد.",
            "نهاية use.",
            "المتصفحات:",
            "Chrome ديسكتوب بس.",
            "نهاية projects.",
            "شغّل التطبيق قبل الاختبارات:",
            "في CI على build حقيقي، وعلى جهازك dev.",
            "استنى لحد ما العنوان ده يرد.",
            "على جهازك: لو السيرفر شغال أصلًا استخدمه.",
            "استنى لحد دقيقتين.",
            "نهاية webServer.",
            "نهاية الإعدادات."
          ],
          sol: R`لما السيرفر مقفول، Playwright بيشغّل [[npm run dev]] ويستنى لحد ما [[localhost:3000]] يرد، وبعدين يبدأ. وبعد ما يخلص بيقفله. ولو الأمر وقع، هتشوف سطور [[[WebServer]]] في الترمنال فيها خطأ السيرفر نفسه، ودي أول حاجة تقراها.

لما السيرفر شغال بإيدك، [[reuseExistingServer]] بيخليه يستخدمه على طول، فالاختبارات تبدأ أسرع.

لو فيه سيرفر بيرد على العنوان و [[reuseExistingServer]] بـ false (يعني [[CI]] متعرّف عندك)، Playwright بيرفض: [[http://localhost:3000 is already used ... or set reuseExistingServer:true]]. ولو حاجة تانية ماسكة البورت ومش بترد صح على الـ url، الأمر بيتشغّل ويقع بـ [[EADDRINUSE]] في سطور [[[WebServer]]]، وبعدها [[Error: Process from config.webServer was not able to start]].`
        },
        {
          cmd: "getByRole و expect(page)",
          title: "أول e2e: تسجيل الدخول من أوله لآخره",
          desc: R`[[page.getByRole("button", { name: "Sign in" })]] بيدوّر على العنصر زي ما اليوزر (وقارئ الشاشة) شايفه: زرار اسمه Sign in. و [[getByLabel("Email")]] الـ input اللي الـ label بتاعه Email. متتكسرش لما class أو id يتغير.

[[await expect(locator).toBeVisible()]] و [[expect(page).toHaveURL()]] بيستنوا لوحدهم لحد ما الشرط يتحقق (لحد ٥ ثواني): مفيش [[sleep]].`,
          example: R`import { test, expect } from "@playwright/test";

test("user can sign in and see the dashboard", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("sara@example.com");
  await page.getByLabel("Password").fill("secret123");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await expect(page.getByRole("list", { name: "Orders" }).getByRole("listitem")).toHaveCount(2);
});`,
          try: R`اكتب اختبار تاني في نفس الملف: باسورد غلط. لازم تظهر رسالة خطأ ([[role="alert"]]) فيها «Wrong email or password»، والعنوان يفضل [[/login]].`,
          flag: "script",
          deep: {
            why: "أكتر سبب بيخلي الناس تكره e2e: اختبارات بتقع من غير ما حاجة تبوظ. إما selector زي [[.btn-primary > span]] اتغير مع أول تعديل تصميم، أو الاختبار دوّر على عنصر قبل ما يظهر. getByRole بيحل الأولى، والـ auto-wait بيحل التانية.",
            how: R`الـ locators بالأولوية اللي Playwright بينصح بيها: [[getByRole]] (الدور والاسم اللي بيوصل لقارئ الشاشة)، و [[getByLabel]] للـ inputs، و [[getByPlaceholder]]، و [[getByText]]، وفي الآخر [[getByTestId]] ([[data-testid]]) لو مفيش حاجة تانية. والـ CSS و XPath آخر حل.

ميزة getByRole إنها بتختبر الـ accessibility ببلاش: لو الزرار [[div]] عليه onClick، مش هيلاقيه كـ button، وده bug حقيقي لليوزر اللي بيستخدم الكيبورد. والاسم بيتطابق كجزء من النص ومش حساس لحالة الحروف، إلا لو قلت [[exact: true]].

الـ locator مش العنصر، ده «طريقة توصل له». كل مرة تستخدمه بيدوّر من جديد، فلو الصفحة اتغيرت بياخد النسخة الجديدة. وتقدر تسلسله: [[getByRole("list", { name: "Orders" }).getByRole("listitem")]] يعني العناصر جوه القايمة دي بس.

الأفعال زي [[click]] و [[fill]] بتستنى لوحدها لحد ما العنصر موجود، وظاهر، وثابت، ومش مغطّي، و enabled. وبعدين تنفّذ.

والـ web-first assertions ([[await expect(locator).toBeVisible()]] و [[toHaveText]] و [[toHaveCount]] و [[expect(page).toHaveURL]]) بتعيد الفحص لحد ما يتحقق أو الوقت يخلص (٥ ثواني افتراضي). ده اللي بيخلي اختبار القايمة يعدّي حتى لو الأوردرات بتيجي من API بعد ثانية.

والـ fixture [[{ page }]] صفحة جديدة في context نضيف لكل اختبار: مفيش cookies من اختبار قبله.`,
            when: "لكل flow حرج: login، و signup، و checkout، و «نسيت الباسورد». اختبار لكل مسار ناجح، وواحد أو اتنين للأخطاء المهمة (باسورد غلط، كارت اترفض).",
            mistakes: R`[[page.waitForTimeout(3000)]] «عشان الصفحة تحمّل»: بطيء دايمًا، وبرضه بيقع لو السيرفر أبطأ من ٣ ثواني. استنى الحاجة نفسها ([[toBeVisible]]). و [[expect(await locator.isVisible()).toBe(true)]]: ده بيفحص مرة واحدة بس ومبيستناش، فبيبقى flaky: استخدم [[await expect(locator).toBeVisible()]]. ونسيان [[await]] قبل expect أو click، فالاختبار يخلص قبل الخطوة (فعّل قاعدة [[no-floating-promises]] في eslint على ملفات e2e). و selectors زي [[#root > div:nth-child(2) button]] من DevTools.`
          },
          lines: [
            "test و expect من Playwright (مش من vitest).",
            "اختبار بياخد page جديدة في context نضيف.",
            "افتح صفحة الـ login (baseURL من الإعدادات).",
            "اكتب في الـ input اللي الـ label بتاعه Email.",
            "والباسورد.",
            "دوس على الزرار اللي اسمه Sign in. بيستنى لحد ما يبقى جاهز.",
            "استنى لحد ما العنوان يبقى dashboard.",
            "والعنوان الرئيسي Dashboard يبقى ظاهر.",
            "والقايمة (اللي بتيجي من API بعد شوية) فيها أوردرين. بيعيد الفحص لحد ما يتحقق.",
            "نهاية الاختبار."
          ],
          sol: R`الاختبار بيعدّي: [[2 passed]].

[[toHaveText]] على الـ alert بتستنى لحد ما الرسالة تظهر بعد رد السيرفر. و [[toHaveURL(/\/login/)]] بيأكد إنه متحوّلش للـ dashboard.

لو استخدمت [[getByText("Wrong")]] هيشتغل برضه، بس [[getByRole("alert")]] أحسن: بيتأكد كمان إن الرسالة معمولة بشكل قارئ الشاشة يقراه أول ما تظهر.

ولو الاختبار وقع بـ [[Timeout 5000ms exceeded... waiting for getByRole('alert')]]، يبقى الصفحة مفيهاش [[role="alert"]]: ده bug accessibility، مش مشكلة في الاختبار.`,
          solCode: R`test("wrong password shows an error", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("sara@example.com");
  await page.getByLabel("Password").fill("wrong");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("alert")).toHaveText("Wrong email or password");
  await expect(page).toHaveURL(/\/login/);
});`
        },
        {
          cmd: "storageState",
          title: "سجّل دخول مرة واحدة لكل الاختبارات",
          desc: R`كل اختبار بيبدأ في context نضيف، يعني من غير login. بدل ما كل اختبار يعدّي على صفحة الـ login، فيه setup project بيسجّل دخول مرة، ويحفظ الـ cookies والـ localStorage في ملف بـ [[storageState({ path })]].

وباقي الـ projects بتبدأ بالملف ده ([[use.storageState]])، فكل اختبار بيفتح وهو مسجّل.

والملف فيه session حقيقية: في [[.gitignore]] دايمًا.`,
          example: R`import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("sign in once", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill(process.env.E2E_EMAIL ?? "sara@example.com");
  await page.getByLabel("Password").fill(process.env.E2E_PASSWORD ?? "secret123");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await page.context().storageState({ path: authFile });
});`,
          try: R`حط الملف ده في [[e2e/auth.setup.ts]]، وعدّل [[projects]] في الإعدادات: project اسمه setup، و chromium يعتمد عليه ويبدأ بالملف. اكتب [[e2e/dashboard.spec.ts]] بيفتح [[/dashboard]] على طول ويلاقي «Welcome, Sara». وخلّي اختبار الـ login نفسه يبدأ من غير session.`,
          flag: "script",
          deep: {
            why: "لو عندك ٣٠ اختبار وكل واحد بيسجّل دخول، ده ٣٠ مرة فورم و bcrypt وredirect: دقيقة ضايعة، و ٣٠ فرصة يقع حاجة ملهاش دعوة بالاختبار. وكمان لو صفحة الـ login باظت، الـ ٣٠ يقعوا مع بعض ومتعرفش السبب. login مرة واحدة في مكان واحد.",
            how: R`[[storageState]] صورة من حالة المتصفح: كل الـ cookies (بما فيها HttpOnly) والـ localStorage لكل origin، في ملف JSON. لما context جديد يبدأ بيه، كأنه نفس المتصفح بعد الـ login.

الإعداد في [[playwright.config.ts]]:
[[{ name: "setup", testMatch: /.*\.setup\.ts/ }]] project بيشغّل ملفات setup بس.
[[{ name: "chromium", use: { ...devices["Desktop Chrome"], storageState: "playwright/.auth/user.json" }, dependencies: ["setup"] }]] بيستنى setup يخلص، وكل اختباراته بتبدأ بالملف.

[[test as setup]] نفس test بس باسم أوضح. والـ [[expect]] قبل الحفظ مهم: بيستنى لحد ما الـ login خلص فعلًا والـ cookie اتحطت، وإلا ممكن تحفظ حالة فاضية.

الاختبارات اللي محتاجة تبدأ من غير login (صفحة الـ login نفسها، و signup) تقول [[test.use({ storageState: { cookies: [], origins: [] } })]] في أول الملف.

ولو عندك أدوار (admin و user)، اعمل setup لكل واحد وملف لكل واحد، والـ spec يختار بـ [[test.use({ storageState: "playwright/.auth/admin.json" })]].

وبيانات الدخول من متغيرات بيئة ([[E2E_EMAIL]])، وفي CI من secrets. واليوزر ده يتعمل في الـ seed بتاع داتابيز الاختبار.`,
            when: "أول ما يبقى عندك أكتر من اختبارين محتاجين login. ولو الاختبارات بتغيّر بيانات اليوزر (بتمسح حاجات)، ممكن تحتاج يوزر لكل worker، وده في docs Playwright تحت «one account per parallel worker».",
            mistakes: R`ترفع [[playwright/.auth/]] على GitHub، وفيها session صالحة. والـ session في السيرفر بتخلص (أو السيرفر اتعاد تشغيله والـ sessions في الذاكرة)، فكل الاختبارات تتحوّل لـ /login وتقع مع بعض: الـ setup لازم يشتغل كل مرة، مش ملف قديم. و [[--no-deps]] أو [[--project=chromium]] من غير setup بيستخدم ملف قديم لو موجود. واختبار بيعمل logout بالـ session المشتركة، فيبوّظها للاختبارات اللي شغالة معاه بالتوازي.`
          },
          lines: [
            "test باسم setup، و expect.",
            "مكان حفظ الـ session (في .gitignore).",
            "خطوة setup بتتشغّل قبل باقي الاختبارات.",
            "صفحة الـ login.",
            "الإيميل من متغير بيئة، وقيمة افتراضية لجهازك.",
            "والباسورد نفس الفكرة.",
            "دوس دخول.",
            "استنى لحد ما الدخول خلص فعلًا والـ cookie اتحطت.",
            "احفظ الـ cookies والـ localStorage في الملف.",
            "نهاية الـ setup."
          ],
          sol: R`[[npx playwright test]] بيطبع [[[setup] › e2e/auth.setup.ts › sign in once]] الأول، وبعدين اختبارات [[[chromium]]]. و [[dashboard opens already signed in]] بياخد أقل من ثانية لأنه مبيعدّيش على الـ login.

ولو شلت [[dependencies: ["setup"]]] والملف مش موجود: [[Error reading storage state from playwright/.auth/user.json]] و [[ENOENT: no such file or directory]]، لأن محدش عمل الملف. ولو الملف موجود من مرة قديمة، ممكن يعدّي النهارده ويقع بكرة لما الـ session تخلص.

ولو شلت [[test.use]] من ملف الـ login، اختبارات الـ login هتبدأ وهي مسجّلة. في تطبيقات كتير صفحة [[/login]] بتحوّل اليوزر المسجّل للـ dashboard على طول، فالـ label مش هيتلاقي والاختبار يقع بـ timeout.`,
          solCode: R`// playwright.config.ts: جوه defineConfig
projects: [
  { name: "setup", testMatch: /.*\.setup\.ts/ },
  {
    name: "chromium",
    use: { ...devices["Desktop Chrome"], storageState: "playwright/.auth/user.json" },
    dependencies: ["setup"],
  },
],

// e2e/dashboard.spec.ts
import { test, expect } from "@playwright/test";

test("dashboard opens already signed in", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page.getByText("Welcome, Sara")).toBeVisible();
});

// e2e/login.spec.ts: أول سطر بعد الـ import
test.use({ storageState: { cookies: [], origins: [] } });`
        },
        {
          cmd: "trace viewer و flaky",
          title: "الاختبار وقع في CI ليه، وإزاي تصلّح flaky",
          desc: R`الـ trace ملف zip فيه كل حاجة حصلت في الاختبار: كل خطوة بلقطة للـ DOM قبلها وبعدها، والـ network، والـ console. [[show-trace]] بيفتحه وتمشي فيه خطوة خطوة.

flaky يعني بيعدّي مرة ويقع مرة من غير تغيير. [[--repeat-each]] بيكشفه، والسبب غالبًا حاجة مش مستنية صح.`,
          example: R`npx playwright test --trace on
npx playwright show-trace test-results/login-user-can-sign-in-and-see-the-dashboard-chromium/trace.zip
npx playwright test e2e/login.spec.ts --repeat-each=20 --workers=4
npx playwright test --retries=2 --fail-on-flaky-tests
npx playwright test --last-failed
npx playwright test e2e/login.spec.ts --debug`,
          try: R`اكتب اختبار بيقرا عدد الأوردرات مرة واحدة: [[const n = await page.getByRole("listitem").count(); expect(n).toBe(2);]] على صفحة بتجيب الأوردرات بعد ثانية. شغّله بـ [[--trace on]]، وافتح الـ trace وشوف القايمة كانت فين. وبعدين صلّحه.`,
          deep: {
            why: "الاختبار بيعدّي على جهازك ويقع في CI، ومش قدامك غير «Timeout 5000ms exceeded». من غير trace بتخمّن. ومع trace بتشوف الصفحة كانت شكلها إيه لحظة الفشل: modal فوق الزرار، أو API رجع 500، أو لسه بيحمّل.",
            how: R`[[trace: "on-first-retry"]] في الإعدادات بيسجّل trace بس لما الاختبار يقع ويتعاد، فالتكلفة قليلة. [[--trace on]] من الترمنال بيسجّل لكل اختبار. الملف بيتحط في [[test-results/<اسم الاختبار>/trace.zip]]، وفي التقرير HTML فيه زرار يفتحه. من CI: نزّل artifact التقرير وافتحه، أو ارفع الملف على [[trace.playwright.dev]] (بيتفتح في المتصفح عندك من غير ما يترفع لسيرفر).

جوه الـ trace: timeline فوق، والخطوات على الشمال، ولكل خطوة لقطة Before و After تقدر تعمل فيها inspect، وتابات Network و Console و Source.

أسباب الـ flaky المشهورة وحلها:
قراية مرة واحدة من غير انتظار ([[count()]] و [[isVisible()]] و [[textContent()]] جوه [[expect]] عادي): استخدم web-first assertion ([[toHaveCount]] و [[toBeVisible]] و [[toHaveText]]).
[[waitForTimeout]]: استنى الحاجة نفسها، أو الرد نفسه بـ [[page.waitForResponse]].
اختبارات بتتشارك داتا (اتنين بيعدّلوا نفس الأوردر بالتوازي): كل اختبار يعمل الداتا بتاعته.
animations و وقت: [[page.clock]] أو [[reducedMotion]].

[[--repeat-each=20]] بيشغّل كل اختبار ٢٠ مرة: لو وقع ولو مرة يبقى flaky. و [[--fail-on-flaky-tests]] بيخلي الـ run يقع لو اختبار عدّى بعد retry، بدل ما يستخبى. و [[--last-failed]] بيعيد اللي وقع بس.`,
            when: "أي فشل في CI: افتح الـ trace قبل ما تعمل re-run. وقبل ما تعمل merge لاختبار e2e جديد، شغّله بـ repeat-each عشان تتأكد إنه ثابت.",
            mistakes: R`تزوّد [[retries]] لـ ٥ وتقول اتحلت: الاختبار لسه flaky، وممكن يكون الـ bug في التطبيق نفسه (race condition حقيقي). وتزوّد الـ timeout لـ ٦٠ ثانية بدل ما تعرف مستني إيه. و [[trace: "on"]] دايمًا في CI فالـ artifacts تبقى جيجات. وتعمل re-run لحد ما يخضر ومتبصّش على الـ trace. وفي الانترفيو: «إزاي بتتعامل مع flaky test؟» اعزله، واكشفه بـ repeat، واقرا الـ trace، وصلّح السبب، ومتسيبش retries تخبّيه.`
          },
          lines: [
            "شغّل وسجّل trace لكل اختبار.",
            "افتح الـ trace وامشي فيه خطوة خطوة.",
            "شغّل كل اختبار في الملف ٢٠ مرة بـ ٤ workers عشان تكشف الـ flaky.",
            "اسمح بإعادة، بس اعتبر أي اختبار احتاج إعادة فشل.",
            "أعد الاختبارات اللي وقعت في آخر مرة بس.",
            "شغّل ووقّف عند كل خطوة في Playwright Inspector."
          ],
          sol: R`الاختبار بيقع: [[Expected: 2]] و [[Received: 0]]. في الـ trace هتلاقي لقطة الخطوة دي والقايمة لسه فاضية: [[count()]] قرا مرة واحدة أول ما الصفحة فتحت، قبل ما الأوردرات تيجي.

التصليح: [[await expect(page.getByRole("listitem")).toHaveCount(2);]]. ده بيعيد الفحص لحد ما يلاقي ٢ (أو يخلص الوقت). جرّبه بـ [[--repeat-each=20]]: المفروض الـ ٢٠ يعدّوا.

الغلط الشائع إنك تصلّحه بـ [[await page.waitForTimeout(2000)]]: هيعدّي على جهازك، ويقع في CI يوم ما الـ API ياخد ثانيتين ونص.`
        },
        {
          cmd: "Playwright في GitHub Actions",
          title: "e2e في CI مع قاعدة بيانات والسيرفر",
          desc: R`job لوحده للـ e2e: Postgres كـ service container، وبعدين install و migrate و seed و build، و Playwright يشغّل السيرفر بـ [[webServer]] ويختبر عليه.

والتقرير (فيه الـ traces) بيترفع artifact حتى لو الاختبارات وقعت، عشان تنزّله وتفتحه.`,
          example: R`name: e2e
on:
  pull_request:
  push:
    branches: [main]
jobs:
  e2e:
    runs-on: ubuntu-latest
    timeout-minutes: 20
    services:
      postgres:
        image: postgres:18
        env:
          POSTGRES_USER: app
          POSTGRES_PASSWORD: app
          POSTGRES_DB: app_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd "pg_isready -U app"
          --health-interval 5s
          --health-timeout 5s
          --health-retries 10
    env:
      DATABASE_URL: postgresql://app:app@localhost:5432/app_test
      E2E_EMAIL: sara@example.com
      E2E_PASSWORD: $__{{ secrets.E2E_PASSWORD }}
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx prisma migrate deploy
      - run: npx prisma db seed
      - run: npm run build
      - run: npx playwright test
      - uses: actions/upload-artifact@v7
        if: $__{{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 14`,
          try: R`حط الـ workflow في repo فيه تطبيق و Prisma و Playwright، واعمل PR فيه اختبار بيقع عمدًا. نزّل artifact التقرير من صفحة الـ run، وافتحه بـ [[npx playwright show-report]] وادخل على الـ trace.`,
          flag: "script",
          deep: {
            why: "e2e على جهازك بس معناه إن محدش بيشغّله. في CI على كل PR، والـ merge ممنوع لو وقع، فمفيش PR يكسر الـ login من غير ما حد ياخد باله. بس محتاج بيئة كاملة: داتابيز فاضية، و migrations، و يوزر اختبار، وتطبيق مبني.",
            how: R`[[services.postgres]] بيشغّل container جنب الـ job. [[ports: 5432:5432]] بيخليه على [[localhost:5432]] من الـ steps (لأن الـ job شغال على الماكينة نفسها مش جوه container). و [[options]] بيضيف health check، و GitHub مبيبدأش الـ steps غير لما الداتابيز تبقى healthy، وإلا أول migrate بيقع بـ «connection refused».

[[env]] على مستوى الـ job بيوصل لكل step، ومنها [[webServer]] اللي Playwright بيشغّله، فالتطبيق بيقرا [[DATABASE_URL]]. والباسورد من [[secrets]] (حتى لو يوزر اختبار، عادة كويسة).

الترتيب: [[npm ci]]، وبعدين المتصفح بس (Chromium) مع مكتبات لينكس، و [[migrate deploy]] يبني الجداول، و [[db seed]] يعمل يوزر الاختبار، و build، وبعدين [[playwright test]]. والـ [[webServer]] في الإعدادات بيشغّل [[npm run start]] لأن [[CI]] متعرّف لوحده في GitHub Actions.

[[if: $__{{ !cancelled() }}]] بيخلي الرفع يحصل حتى لو الاختبارات وقعت (من غيره، أي step بيقع بيوقف اللي بعده). و [[retention-days]] عشان التقارير متاكلش مساحة الـ repo.

للسرعة: كاش المتصفحات بـ [[actions/cache]] على [[~/.cache/ms-playwright]] بمفتاح نسخة Playwright، أو container الرسمي [[mcr.microsoft.com/playwright]] اللي فيه المتصفحات. ولو الاختبارات كتير، [[--shard=1/4]] على ٤ jobs بـ matrix، و [[merge-reports]] يجمعهم.

والتفاصيل العامة (concurrency، و permissions، و secrets، و services) في «تاب GitHub Actions».`,
            when: "على كل PR لـ main، كـ required check. ولو بطيء، ممكن تشغّل smoke (login و checkout) على كل PR، والباقي كل ليلة.",
            mistakes: R`من غير health check، أول migrate بيقع ساعات وساعات لأ. و [[localhost]] في [[DATABASE_URL]] لو الـ job نفسه شغال في [[container:]]: ساعتها اسم الـ service ([[postgres]]) هو العنوان مش localhost. ونسيان seed، فالـ setup مبيعرفش يسجّل دخول وكل حاجة تقع بـ timeout على الـ Dashboard. ورفع التقرير من غير [[!cancelled()]]، فلما يقع (وقت ما محتاجه) مبيترفعش. وتشغيل [[npx playwright install --with-deps]] للتلات متصفحات وانت بتختبر Chromium بس.`
          },
          lines: [
            "اسم الـ workflow.",
            "بيشتغل إمتى:",
            "أي PR.",
            "وأي push...",
            "...على main.",
            "المهام.",
            "مهمة e2e.",
            "ماكينة أوبونتو.",
            "لو علّقت، تتقفل بعد ٢٠ دقيقة بدل ٦ ساعات.",
            "containers جنب الـ job:",
            "Postgres.",
            "النسخة.",
            "إعدادات أول تشغيل:",
            "اليوزر...",
            "...والباسورد...",
            "...والداتابيز اللي هتتعمل فاضية.",
            "افتح البورت...",
            "...على localhost:5432 للـ steps.",
            "خيارات docker:",
            "الصحة: pg_isready لازم ينجح...",
            "...كل ٥ ثواني...",
            "...ويستنى ٥ ثواني للرد...",
            "...ولحد ١٠ محاولات قبل ما يعتبرها واقعة.",
            "متغيرات لكل الـ steps (والسيرفر اللي Playwright بيشغّله):",
            "عنوان داتابيز الاختبار.",
            "يوزر الاختبار اللي الـ seed بيعمله.",
            "والباسورد من الـ secrets.",
            "الخطوات:",
            "هات الكود.",
            "سطّب Node...",
            "بالإعدادات دي:",
            "نسخة 24.",
            "وكاش لـ npm.",
            "سطّب بالظبط اللي في الـ lock.",
            "Chromium بس ومكتبات لينكس بتاعته.",
            "ابني الجداول من الـ migrations.",
            "اعمل يوزر الاختبار والداتا الأساسية.",
            "ابني التطبيق (webServer هيشغّل npm run start).",
            "شغّل e2e. CI متعرّف لوحده، فالإعدادات بتاعة CI بتشتغل.",
            "ارفع التقرير...",
            "...حتى لو الاختبارات وقعت (إلا لو الـ run اتلغى).",
            "بالإعدادات دي:",
            "اسم الـ artifact.",
            "الفولدر.",
            "يتمسح بعد أسبوعين."
          ],
          sol: R`الـ run يقع في خطوة [[npx playwright test]]، والخطأ بيظهر كـ annotation على سطر الاختبار في تاب Files في الـ PR (من reporter [[github]]). وخطوة [[upload-artifact]] بتشتغل برضه بفضل [[!cancelled()]].

من صفحة الـ run، تحت Artifacts، نزّل [[playwright-report]] وفكّه، و [[npx playwright show-report playwright-report]]. ادخل على الاختبار اللي وقع، ولو اتعاد هتلاقي trace (من [[on-first-retry]]).

لو كل الاختبارات وقعت في الـ setup بـ timeout على [[Dashboard]]، شوف خطوة seed: غالبًا يوزر الاختبار متعملش، أو [[E2E_PASSWORD]] مش متظبط في الـ secrets.`
        },
        {
          cmd: "@axe-core/playwright",
          title: "افحص الـ accessibility في كل صفحة مهمة",
          desc: R`[[@axe-core/playwright]] بيشغّل axe (نفس المحرك اللي في Lighthouse) على الصفحة المفتوحة، ويرجّع قايمة violations: صورة من غير alt، و input من غير label، وتباين ألوان ضعيف.

[[expect(results.violations).toEqual([])]] بيخلي أي مشكلة تفشّل الاختبار، وفي CI يمنع الـ PR.`,
          example: R`import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ storageState: { cookies: [], origins: [] } });

test("login page has no detectable a11y violations", async ({ page }) => {
  await page.goto("/login");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .exclude("#third-party-chat")
    .analyze();
  expect(results.violations).toEqual([]);
});`,
          try: R`[[npm i -D @axe-core/playwright]] وشغّل الاختبار على صفحة الـ login. بعدين ضيف [[<img src="/logo.png">]] من غير alt وشغّله تاني، واقرا الـ violation.`,
          flag: "script",
          deep: {
            why: "مشاكل الـ accessibility مبتبانش لما تجرّب بالماوس. input من غير label بيشتغل عادي، بس قارئ الشاشة بيقول «edit text» وخلاص. وفي دول كتير ده التزام قانوني. الفحص الأوتوماتيكي بيمسك حوالي ثلث المشاكل من غير أي مجهود، وبيمنع إنها ترجع بعد ما اتصلّحت.",
            how: R`[[new AxeBuilder({ page })]] بيحقن axe-core في الصفحة ويشغّله على الـ DOM الحالي، بعد ما الـ JavaScript اشتغل. فلو فيه modal أو قايمة بتظهر بعد click، افتحها الأول وبعدين analyze.

[[withTags]] بيحدد القواعد: [[wcag2a]] و [[wcag2aa]] (وأخواتهم 21) هم المستوى اللي أغلب القوانين بتطلبه. [[exclude(selector)]] بيستثني حتة مش بتاعتك (widget خارجي). و [[include]] العكس. و [[disableRules(["color-contrast"])]] لقاعدة معينة، بس بسبب مكتوب.

كل violation فيها [[id]] (زي [[image-alt]] و [[label]] و [[color-contrast]])، و [[impact]] (minor لحد critical)، و [[help]] جملة، و [[nodes]] العناصر نفسها بالـ selector. [[toEqual([])]] بيطبع كل ده في رسالة الفشل.

ولصفحات كتير: اعمل fixture أو دالة [[checkA11y(page)]] وناديها في آخر كل اختبار مهم. ولمشروع قديم فيه ١٠٠ مشكلة: ابدأ بـ [[critical]] بس ([[violations.filter(v => v.impact === "critical")]]) وزوّد.

الأوتوماتيك مبيكفيش: ترتيب الـ Tab، و focus بعد فتح modal، ومعنى الـ alt نفسه، دول محتاجين تجرّب بالكيبورد وقارئ الشاشة. وقواعد [[jsx-a11y]] في eslint بتمسك جزء تاني وقت الكتابة (المستوى الأول).`,
            when: "على الصفحات الأساسية (الرئيسية، و login، و checkout، و أي فورم)، وعلى حالات مهمة (فورم فيه أخطاء، و modal مفتوح). في نفس job الـ e2e.",
            mistakes: R`تشغّل analyze قبل ما الصفحة تخلص (قبل [[toBeVisible]] على المحتوى)، فبيفحص skeleton. وتعمل [[disableRules]] لكل قاعدة بتقع لحد ما يعدّي. و [[exclude]] على الـ body كله. وتفتكر إن صفر violations يعني الموقع accessible: ده الحد الأدنى بس. وملحوظة: axe بيقبل [[placeholder]] كاسم للـ input، فـ input من غير label بس فيه placeholder مش هيتمسك، مع إن الـ placeholder بيختفي أول ما تكتب.`
          },
          lines: [
            "test و expect.",
            "الـ builder اللي بيشغّل axe على صفحة Playwright.",
            "الصفحة دي من غير login.",
            "اختبار accessibility لصفحة الـ login.",
            "افتح الصفحة.",
            "جهّز فحص axe على الصفحة الحالية...",
            "...بقواعد WCAG 2.0 و 2.1 مستوى A و AA...",
            "...واستثني widget خارجي مش بتاعنا...",
            "...وشغّل الفحص.",
            "لازم مفيش ولا مشكلة. لو فيه، الرسالة بتطبعها كلها.",
            "نهاية الاختبار."
          ],
          sol: R`الصفحة السليمة: [[1 passed]].

بعد الصورة: الاختبار بيقع، والفرق فيه violation بـ [[id: "image-alt"]] و [[impact: "critical"]] و [[help: "Images must have alternative text"]]، وتحتها الـ node نفسه ([[img]]) والحلول المقترحة (alt، أو aria-label، أو role="presentation").

الحل: [[alt="MyApp"]] لو اللوجو بيقول حاجة، أو [[alt=""]] لو ديكور بس. الاتنين بيعدّوا، والفرق في المعنى، ودي حاجة axe ميقدرش يحكم فيها.`
        },
        {
          cmd: "Lighthouse CI",
          title: "ميزانية أداء في كل PR",
          desc: R`[[@lhci/cli]] بيشغّل Lighthouse على صفحاتك كذا مرة، ويقارن النتيجة بميزانية في [[lighthouserc.json]]: الـ performance فوق ٩٠، و LCP أقل من ٢.٥ ثانية، والصفحة أقل من حجم معين. لو أي حاجة عدّت الحد، الأمر يرجع exit code 1 والـ PR يقع.

كده الأداء بقى شرط زي الاختبارات، مش حاجة بتبص عليها لما حد يشتكي.`,
          example: R`{
  "ci": {
    "collect": {
      "startServerCommand": "npm run start",
      "startServerReadyPattern": "ready",
      "url": ["http://localhost:3000/", "http://localhost:3000/login"],
      "numberOfRuns": 3,
      "settings": { "preset": "desktop" }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-byte-weight": ["warn", { "maxNumericValue": 500000 }]
      }
    },
    "upload": { "target": "temporary-public-storage" }
  }
}`,
          try: R`[[npm i -D @lhci/cli]]، وحط الملف في جذر المشروع، و [[npm run build]] وبعدين [[npx lhci autorun]]. بعدين وطّي [[total-byte-weight]] لرقم صغير جدًا (١٠٠) وخليه error، وشغّل تاني واقرا رسالة الفشل.`,
          flag: "script",
          deep: {
            why: "الأداء بيبوظ بالتدريج: مكتبة ٢٠٠ كيلو هنا، وصورة ٣ ميجا هناك، وكل PR لوحده «مش فارق». بعد ست شهور الصفحة بتاخد ٦ ثواني ومحدش عارف إمتى حصل. الميزانية بتمسك الـ PR اللي عدّى الحد وقت ما اتعمل، والتصليح لسه سهل.",
            how: R`[[lhci autorun]] بيعمل تلات خطوات: [[collect]]، و [[assert]]، و [[upload]].

collect: [[startServerCommand]] بيشغّل التطبيق (بعد build) ويستنى سطر فيه [[startServerReadyPattern]] (regex، و [[next start]] بيطبع «Ready in ...»). وبعدين يشغّل Lighthouse على كل [[url]] عدد [[numberOfRuns]] مرات، لأن رقم الأداء بيتذبذب من run للتاني. و [[preset: "desktop"]] بيقيس كديسكتوب، ومن غيره الافتراضي موبايل على شبكة بطيئة متزيّفة (أصعب بكتير).

assert: كل سطر [[audit-id]] أو [[categories:x]]، ومستوى ([[error]] يوقّع، و [[warn]] يطبع بس)، وشرط: [[minScore]] (من ٠ لـ ١) للفئات، و [[maxNumericValue]] للأرقام (LCP بالملي ثانية، و CLS رقم، والحجم بالبايت). وفيه [[preset: "lighthouse:recommended"]] بقواعد كتير جاهزة، بس بيبقى صارم جدًا على مشروع قايم.

upload: [[temporary-public-storage]] بيرفع التقرير لرابط مؤقت عام (أيام) تفتحه من اللوج. أو [[filesystem]] يحطه في فولدر ترفعه artifact، أو سيرفر LHCI بتاعك لو عايز تاريخ ومقارنة.

في GitHub Actions: step بعد [[npm run build]] بيعمل [[npx @lhci/cli autorun]]، وبيلاقي Chrome المتسطّب على ماكينة ubuntu. ولو عايز status check على الـ PR برابط التقرير، فيه GitHub App اسمها Lighthouse CI بتدّيك [[LHCI_GITHUB_APP_TOKEN]].`,
            when: "على الصفحات اللي بتجيب زوار (الرئيسية، و landing، و صفحة المنتج). وابدأ بالأرقام الحالية كحد وزوّد، زي الـ coverage.",
            mistakes: R`run واحد ([[numberOfRuns: 1]]) فالنتيجة بتتذبذب والـ PR يقع ويعدّي من غير تغيير. وتقيس [[npm run dev]] بدل build: dev مش مضغوط ومفيهوش optimizations، فالأرقام ملهاش معنى. و [[minScore: 1]] للـ performance، فأي حاجة تفشّل. و [[temporary-public-storage]] لتطبيق داخلي فيه بيانات حساسة في الصفحة: التقرير بيبقى عام. و [[startServerReadyPattern]] مش مطابق للي السيرفر بيطبعه، فـ lhci يستنى لحد timeout ويكمّل على سيرفر لسه مش جاهز.`
          },
          lines: [
            "بداية الإعدادات.",
            "كل حاجة تحت ci.",
            "جمع النتايج:",
            "شغّل التطبيق المبني.",
            "استنى لحد ما يطبع سطر فيه ready.",
            "الصفحات اللي هتتقاس.",
            "كل صفحة ٣ مرات، والنتيجة من التلاتة (عشان الذبذبة).",
            "قيس كديسكتوب مش موبايل بطيء.",
            "نهاية collect.",
            "الشروط:",
            "كل ميزانية:",
            "درجة الأداء ٩٠ على الأقل، وإلا فشل.",
            "درجة الـ accessibility ٩٥ على الأقل.",
            "أكبر عنصر يظهر في أقل من ٢.٥ ثانية.",
            "الصفحة متتنططش أكتر من ٠.١.",
            "حجم الصفحة كله فوق ٥٠٠ كيلو: تحذير بس.",
            "نهاية assertions.",
            "نهاية assert.",
            "ارفع التقرير لرابط مؤقت تفتحه من اللوج.",
            "نهاية ci.",
            "نهاية الإعدادات."
          ],
          sol: R`الأول: [[Running Lighthouse 3 time(s) on http://localhost:3000/]]، وبعدين [[Checking assertions against 2 URL(s), 6 total run(s)]]، ولو كله تمام [[All results processed!]] ولينك التقرير.

بعد الميزانية الصغيرة: [[✘ total-byte-weight failure for maxNumericValue assertion]] وتحتها [[expected: <=100]] و [[found: ...]] و [[all values: ...]] للتلات مرات، وفي الآخر [[Assertion failed. Exiting with status code 1.]]. ده بالظبط اللي هيوقّع الـ PR.

لو شفت [[WARNING: Timed out waiting for the server to start listening]] يبقى [[startServerReadyPattern]] مش لاقي السطر: شغّل [[npm run start]] بإيدك وشوف بيطبع إيه بالظبط.`
        }
      ]
    }
  ]
});
