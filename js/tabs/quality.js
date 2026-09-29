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

TAB("quality", {
  label: "فحص الكود",
  prompt: "~/myapp$ ",
  lab: R`mkdir -p ~/lab/quality && cd ~/lab/quality
npm init -y
npm i -D eslint prettier typescript vitest`,
  labText: "اعمل مشروع تجربة وسطّب الأدوات dev dependencies. كل أداة هنا بتشتغل من الترمنال وفي CI بنفس الأمر.",
  levels: {"1":["البداية","lint و format و typecheck، والفرق بينهم"],"2":["المتوسط","الاختبارات، و husky و lint-staged قبل كل commit"],"3":["المتقدم","CI بيفحص كل حاجة، و monorepo بأكتر من تطبيق"]},
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

الإعدادات في [[eslint.config.js]]: array من objects، كل واحد بيقول «على الملفات دي، طبّق القواعد دي». بتبدأ من إعدادات جاهزة ([[js.configs.recommended]] و [[typescript-eslint]] وبتاعة React أو Next) وتعدّل عليها. و [[--print-config file]] بيطبع القواعد اللي اتطبقت فعلًا على ملف معين، ودي أسرع طريقة تعرف ليه قاعدة شغالة أو مش شغالة.

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

و [[--passWithNoTests]] بتخلي باكدج لسه ملهاش اختبارات متفشّلش الأمر.`,
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

الفرق المهم: [[vitest]] من غير حاجة بيقعد شغال (watch) في ترمنال عادي، ويعيد الاختبارات المتأثرة بس لما تحفظ. بس لو لقى المتغير [[CI]] (موجود في GitHub Actions) بيشتغل مرة ويقفل. عشان كده في السكربتات اكتب [[vitest run]] صريحة ومتعتمدش على التخمين.

وبيستخدم إعدادات Vite نفسها (aliases و plugins)، فبيفهم TypeScript و JSX من غير إعداد. ولو محتاج DOM (اختبارات React components) بتحط [[environment: 'jsdom']] في [[vitest.config.ts]].

[[-t]] بيفلتر بجزء من اسم الاختبار، والمسار بيفلتر بالملفات اللي مسارها فيه الكلمة دي. و [[--reporter=verbose]] بيطبع كل اختبار باسمه بدل النقط.

ولمشروع Node صغير من غير Vite، Node نفسه فيه [[node --test]] (في تاب Node).`,
            when: "watch وانت بتكتب الكود. و [[run]] في [[scripts.test]] و CI و pre-push.",
            mistakes: R`سكربت [["test": "vitest"]] من غير run، فـ hook أو سكربت محلي يعلّق مستني في watch للأبد. واختبارات بتعتمد على بعض أو على الترتيب (واحد بيسيب داتا والتاني بيعتمد عليها)، فتنجح لوحدها وتقع مع بعض. وتنسى [[await]] قبل [[expect(promise).rejects]]، فالاختبار يعدّي وهو فاشل.`
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
            mistakes: R`تسطّب husky ومتعملش install بعدها (أو عملته بـ [[--ignore-scripts]])، فـ prepare مشتغلش و [[core.hooksPath]] فاضي. وفي Docker بـ [[npm ci --omit=dev]]، الـ prepare بيحاول يشغّل husky وهو مش متسطّب فالـ install يقع: خلّي السكربت [[husky || true]] أو شغّل بـ [[HUSKY=0]]. والـ hooks تبقى تقيلة (اختبارات المشروع كله قبل كل commit) فالناس تتخطّاها: خلّي pre-commit سريع (lint-staged)، والتقيل في pre-push أو CI.`
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
      - uses: pnpm/action-setup@v4
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
    }
  ]
});
