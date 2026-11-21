// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "أدوات المحترف في JS",
      l: 2,
      time: R`حوالي ساعتين ونص، ومشروع صغير متظبط بالأداتين`,
      goal: [
        R`تشغّل ESLint على أي مشروع بملف [[eslint.config.js]] (الـ flat config)، وتقرا كل سطر في الناتج: المكان، والنوع، والرسالة، واسم القاعدة، وتعرف تصلّح أو تخلي [[--fix]] يصلّح.`,
        R`تخلي Prettier يظبط شكل الكود كله بأمر واحد، وتفهم ليه ESLint و Prettier مبيتخانقوش لما تحط [[eslint-config-prettier]] في الآخر.`,
        R`تكتب اختبارات بـ Vitest: [[describe]] و [[it]] و [[expect]]، والفرق بين [[toBe]] و [[toEqual]]، وأخطاء متوقّعة، وكود async، و [[vi.fn()]] مكان أي حاجة خارجية.`,
        R`تقرا تقرير الـ coverage وتعرف إن ٧٢٪ lines ممكن تخبّي فرع كامل متجرّبش، وتحط حد أدنى يوقّع الـ CI.`,
      ],
      use: {
        prog: R`ESLint بيمسك الباج قبل ما تشغّل (متغير مكتوب غلط، [[==]] بدل [[===]])، و Prettier بيشيل نقاش الشكل خالص، والاختبار بيقولك إن التعديل الجديد مكسرش القديم. التلاتة مع بعض = تعدّل بثقة.`,
        work: R`أي repo حقيقي هتدخله فيه [[npm run lint]] و [[npm test]] والـ CI بيشغّلهم على كل PR. أول يوم شغل غالبًا «الـ CI أحمر عندك، شوف ليه». واللي بيعرف يقرا الناتج بيخلّص في دقيقة.`,
        cs: R`الـ static analysis (تحليل الكود من غير تشغيله بالـ AST)، والـ unit testing والـ test doubles (mocks و stubs)، والـ coverage كمقياس (مفيد بس مش ضمان).`,
      },
      lab: R`mkdir -p ~/lab/tools && cd ~/lab/tools && npm init -y && npm pkg set type=module && npm i -D eslint @eslint/js globals prettier eslint-config-prettier vitest @vitest/coverage-v8`,
      projects: [
        { lvl: 'صغير', t: R`نضّف مشروع قديم`, what: R`خد أي فولدر JS كتبته قبل كده (أو مشاريع الوحدات اللي فاتت)، وحط فيه [[eslint.config.js]] من درس «ESLint و Prettier»، وصلّح كل الأخطاء بإيدك واحدة واحدة، وبعدين [[prettier --write .]].`, done: R`[[npx eslint . --max-warnings 0]] و [[npx prettier --check .]] الاتنين بيخرجوا بصفر، ومفيش ولا [[eslint-disable]] في الكود، وكاتب في الـ commit message أغرب باج لقيته (متغير مكتوب غلط مثلًا).` },
        { lvl: 'صغير', t: R`اختبارات لدوال الأساسيات`, what: R`خد ٥ دوال من تمارين «أساسيات البرمجة» (زي [[isPrime]] و [[reverse]] و [[charCount]]) في ملف [[utils.js]]، واكتب لكل واحدة اختبار فيه الحالة العادية وحالتين طرفيتين ([[0]]، نص فاضي، رقم سالب، عربي) بـ [[it.each]]. من درس «اختبار JS بـ Vitest».`, done: R`[[npx vitest run --coverage]] بيطلّع ١٠٠٪ في الأربع أعمدة لـ [[utils.js]]، ولما تكسر دالة عن قصد (تشيل شرط) فيه اختبار واحد على الأقل بيقع باسم واضح.` },
        { lvl: 'متوسط', t: R`قالب مشروع جاهز`, what: R`فولدر [[starter]] فيه [[package.json]] بسكربتات [[lint]] و [[format]] و [[test]] و [[check]] (الكل ورا بعض)، و [[eslint.config.js]] بـ globals مختلفة للـ [[src/]] (متصفح) و [[scripts/]] (Node) و [[*.test.js]]، و [[.prettierrc.json]] و [[.prettierignore]] و [[vitest.config.js]] بحد أدنى للـ coverage. من الدرسين.`, done: R`تنسخ الفولدر لمكان جديد وتعمل [[npm i]] و [[npm run check]] فيعدّي من أول مرة. و [[window]] جوه [[scripts/]] بيطلع [[no-undef]]، و [[process]] جوه [[src/]] بيطلع [[no-undef]]، وتست بيقلل الـ coverage تحت الحد بيخلي [[npm run check]] يخرج بـ ١.` },
        { lvl: 'متوسط', t: R`اختبر الـ fetch من غير شبكة`, what: R`خد [[request()]] من وحدة «مشروع: fetch محترم» وانقل اختباراتها من [[node --test]] لـ Vitest: [[vi.fn()]] مكان [[fetch]]، و [[rejects.toThrow]] للأخطاء، و [[vi.useFakeTimers()]] عشان الـ retry ميستناش ثواني بجد (التفاصيل في درس «vi.useFakeTimers» في تاب «فحص الكود»).`, done: R`كل الحالات اللي كانت في [[node --test]] شغالة في Vitest، والملف كله بيخلص في أقل من ثانية رغم إن فيه retry بـ backoff، و [[fetch]] الحقيقي مبيتناداش ولا مرة ([[toHaveBeenCalledTimes]] على الـ mock بيأكد العدد).` },
        { lvl: 'كبير', t: R`مكتبة صغيرة بجودة الشغل`, what: R`مكتبة [[money.js]]: [[parse('١٢٣٫٥٠ ج')]] و [[format(123.5)]] و [[add]] و [[split(total, parts)]] (بالقروش عشان [[0.1 + 0.2]]). معاها ESLint و Prettier واختبارات لكل دالة فيها حالات طرفية (أرقام عربي، سالب، صفر، [[split]] بباقي)، و coverage بحد ١٠٠٪ branches، و GitHub Actions بيشغّل [[npm run check]] على كل push. من الدرسين، ودرس «number و NaN»، ودرس «Intl.RelativeTimeFormat».`, done: R`الـ CI أخضر، وأي PR بيكسر قاعدة lint أو بيقلل الـ coverage بيبقى أحمر برسالة واضحة. [[split(100, 3)]] بترجّع [[ [33.34, 33.33, 33.33] ]] ومجموعها ١٠٠ بالظبط. و [[parse]] على نص بايظ بيرمي error فيه النص. والـ README فيه مثال لكل دالة منسوخ من اختبار حقيقي.`, ext: R`زوّد [[husky]] و [[lint-staged]] (درس «lint-staged» في تاب «فحص الكود») عشان الفحص يشتغل قبل كل commit، وانشرها على npm باسم scoped، أو حوّلها لـ TypeScript.` },
        { lvl: 'كبير', t: R`بوابة جودة لمشروع الوحدة اللي فاتت`, what: R`خد الشات أو عارض اللوج من وحدة «JS في المتصفح بعمق»، وافصل المنطق (parse الرسايل، والـ backoff، وتقطيع السطور) في دوال من غير DOM، واكتب ليها اختبارات Vitest، وشغّل ESLint و Prettier على المشروع كله.`, done: R`دالة الـ backoff ليها اختبار بيأكد ٥٠٠ و ١٠٠٠ و ٢٠٠٠ والسقف ٣٠ ألف، وتقطيع السطور ليه اختبار لـ chunk بيتقطع في نص سطر وفي نص حرف عربي، والـ coverage للملفات دي فوق ٩٠٪، و [[npm run check]] بيعدّي من غير warnings.`, ext: R`زوّد اختبار e2e بـ Playwright بيفتح الصفحة ويتأكد إن الرسالة بتظهر (تاب «فحص الكود»، وحدة Playwright).` },
        { lvl: 'فكرة', t: R`قواعدك انت`, what: R`اقرا لستة القواعد في ESLint docs واختار ٥ قواعد مش في [[recommended]] شايف إنها كانت هتمسك باجات حقيقية عملتها قبل كده (زي [[no-await-in-loop]] أو [[prefer-const]] أو [[no-param-reassign]]). شغّلها على كل مشاريعك وعدّ مسكت كام حاجة. انت اللي بتختار.`, done: R`جدول فيه القاعدة، وليه اخترتها، وكام مكان مسكته في مشاريعك، ومثال واحد حقيقي منهم كان باج فعلًا مش ذوق.`, ext: R`اكتب قاعدة ESLint بتاعتك (custom rule) بتمنع حاجة معيّنة في مشروعك، زي [[console.log]] في [[src/]]، أو اسم متغير بالعربي.` },
      ],
      n: R`الأداتين اللي في أي repo JavaScript حقيقي: ESLint و Prettier للشكل والباجات قبل التشغيل، و Vitest للاختبار. اتجرّبوا على ESLint 10.13 و Prettier 3.9 و Vitest 5.0 و Node 24.22 في مشروع تجربة على ويندوز ١١، والناتج منسوخ زي ما طلع (والمسار اتغيّر لـ [[C:\Users\you\lab]]). وللتعمق: تاب «فحص الكود» فيه وحدات كاملة عن الـ hooks والـ CI والـ mocks`,
      items: [
        {
          cmd: "ESLint و Prettier",
          title: "eslint.config.js و --fix و prettier --check، ومن غير خناق",
          learn: R`تعمل [[eslint.config.js]] (الـ flat config)، وتقرا ناتج ESLint، وتستخدم [[--fix]]، وتشغّل Prettier بـ [[--check]] و [[--write]]، وتربطهم بـ [[eslint-config-prettier]].`,
          out: R`مشروع بيمسك المتغيرات الغلط و [[==]] قبل التشغيل، وشكله موحّد مهما كتب فيه كام واحد.`,
          use: {
            prog: R`ESLint بيمسك باجات حقيقية: [[discunt]] بدل [[discount]] كانت هتبقى [[ReferenceError]] وقت التشغيل، وهو مسكها من غير ما يشغّل حاجة. و Prettier بيخليك متفكرش في المسافات والفواصل خالص.`,
            work: R`في أي فريق، الـ review مبيضيعش وقت في «حط مسافة هنا»: Prettier عملها. و [[npm run lint]] أول خطوة في الـ CI، فلو فشل الـ PR مبيتراجعش أصلًا.`,
            cs: R`ESLint بيحوّل الكود لشجرة (AST) وكل قاعدة بتمشي على الشجرة تدوّر على شكل معيّن، و Prettier بيرمي الشكل الأصلي خالص ويطبع الشجرة من جديد بقواعده. عشان كده Prettier مبيقبلش «استثناءات» زي ESLint.`,
          },
          desc: R`أداتين مختلفين بيشتغلوا مع بعض:

- **ESLint** بيدوّر على **باجات وممارسات غلط**: متغير مستخدم ومش متعرّف ([[no-undef]])، متغير متعرّف ومش مستخدم ([[no-unused-vars]])، [[==]] بدل [[===]] ([[eqeqeq]]). الإعدادات في [[eslint.config.js]] (الـ **flat config**): array من objects، كل واحد بيقول «الملفات دي، القواعد دي».
- **Prettier** بيظبط **الشكل** بس: المسافات، والفواصل المنقوطة، ونوع علامات التنصيص، وطول السطر. مبيفهمش باجات.

| | ESLint | Prettier |
|---|---|---|
| بيدوّر على | باجات وممارسات: متغير غلط، [[==]]، كود ميت | شكل: مسافات، [[;]]، علامات تنصيص |
| الأمر | [[npx eslint .]] | [[npx prettier --check .]] |
| يصلّح | [[--fix]] (اللي آمن بس) | [[--write]] (كله) |
| الإعدادات | [[eslint.config.js]] | [[.prettierrc.json]] و [[.prettierignore]] |

**ليه مبيتخانقوش؟** لو قاعدة شكل في ESLint (زي [[quotes: double]]) و Prettier بيكتب single: [[eslint --fix]] يحوّلها double، و [[prettier --write]] يرجّعها single، وكل واحد بيقول التاني غلط (اتجرّب). [[eslint-config-prettier]] بيقفل كل قواعد الشكل في ESLint، فالشكل لـ Prettier لوحده والباجات لـ ESLint لوحده. **ولازم يبقى آخر عنصر في الـ array** عشان يقفل اللي قبله.

اتجرّب على ESLint **10.13** (اللي نزل من npm النهارده، مش 9). في 10، الـ flat config هو الوحيد: [[.eslintrc.json]] بيتجاهل خالص، ومن غير [[eslint.config.js]] بيطلع «ESLint couldn't find an eslint.config.* file» وكود خروج [[2]].`,
          example: R`// eslint.config.js في فولدر المشروع (و package.json فيه "type": "module")
import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
export default defineConfig([
  globalIgnores(['dist/', 'coverage/']),
  {
    files: ['**/*.js'],
    extends: [js.configs.recommended],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'warn',
    },
  },
  prettier,
]);`,
          lines: [
            R`[[defineConfig]] دالة من ESLint نفسه بتلف الإعدادات (بتدّيك autocomplete في VS Code وبتسمح بـ [[extends]])، و [[globalIgnores]] بتعمل قايمة تجاهل للمشروع كله. [[eslint/config]] متاح من ESLint 9.22.`,
            R`[[@eslint/js]] باكدج فيه القواعد الرسمية الموصى بيها. [[js.configs.recommended]] فيه ٦٤ قاعدة (عدّتهم من الباكدج)، كلها باجات حقيقية ومفيش قواعد شكل، ومن غيرها ESLint مش هيقول ولا حاجة لأنه مبيشغّلش أي قاعدة لوحده.`,
            R`[[globals]] باكدج فيه أسماء كل المتغيرات اللي البيئة بتعرّفها: [[window]] و [[document]] للمتصفح، و [[process]] و [[__dirname]] لـ Node. من غيره [[no-undef]] بيقول إن [[console]] نفسه مش متعرّف (اتجرّب: [[3 errors]] على [[console]] و [[window]] و [[process]]).`,
            R`[[eslint-config-prettier]] object جاهز بيقفل كل قواعد ESLint اللي ليها علاقة بالشكل (٣٥٨ قاعدة في نسخة 10.1.8، من ESLint والـ plugins المشهورة) عشان متتخانقش مع Prettier.`,
            R`[[export default]] لأن ESLint بيعمل [[import]] للملف ده وبياخد الـ default. والملف [[.js]] بصيغة ESM لأن [[package.json]] فيه [[type: module]]، ولو مش فيه سمّيه [[eslint.config.mjs]].`,
            R`أول عنصر: فولدرات ESLint ميبصّش فيها خالص. [[node_modules]] متجاهل لوحده، بس [[dist/]] (كود متبني) و [[coverage/]] (تقرير Vitest) لأ، ومن غير السطر ده ESLint هيطلّع مئات الأخطاء في كود مش بتاعك.`,
            R`عنصر الإعدادات الأساسي. كل object في الـ array بيتطبق على الملفات اللي تطابقه، واللي تحت بيكسب على اللي فوق لو اتعارضوا.`,
            R`[[files]] الملفات اللي العنصر ده عليها: [[**/*.js]] = أي ملف [[.js]] في أي فولدر. ولو عندك [[.mjs]] أو [[.jsx]] زوّدهم هنا، وإلا ESLint مش هيفحصهم.`,
            R`[[extends]] بيحط الـ recommended **جوه** نفس النطاق ده (الملفات اللي في [[files]] بس). ده أحسن من إنك تحطه كعنصر لوحده في الـ array، لأنه كان هيتطبق على كل حاجة.`,
            R`[[languageOptions.globals]]: الأسماء المعروفة. [[...]] بتفرد الاتنين في object واحد، فـ [[window]] و [[process]] الاتنين مسموحين. ولو المشروع متصفح بس، شيل [[globals.node]] عشان [[process]] في كود المتصفح يطلع error. و [[ecmaVersion]] و [[sourceType]] مش لازمين: [[--print-config]] قال [[2026]] و [[module]] لوحدهم.`,
            R`[[rules]]: هنا بتغيّر قواعد أو تزوّد. كل قاعدة قيمتها [['off']] أو [['warn']] (بتطبع ومبتوقّعش) أو [['error']] (بتخلي كود الخروج ١)، أو array أوله المستوى وبعده الخيارات.`,
            R`[[eqeqeq]]: ممنوع [[==]] و [[!=]]، و [[always]] في كل حتة، ما عدا [[== null]] ([[null: 'ignore']]) لأنه اختصار معروف لـ «[[null]] أو [[undefined]]» وآمن. من غير الخيار ده [[s == null]] كان هيطلع error.`,
            R`[[no-unused-vars]]: متغير أو import أو argument مش مستخدم = error. [[argsIgnorePattern: '^_']] بيسمح بـ arguments بتبدأ بـ [[_]] ([[(_req, res) =>]]) لأن ساعات لازم تستقبل argument عشان توصل للي بعده. والرسالة نفسها بتقولك القاعدة دي.`,
            R`[[prefer-const]]: [[let]] اتعرّف ومتغيّرش أبدًا = warning يقول «استخدم [[const]]». ده من القواعد اللي [[--fix]] بيصلّحها لوحده لأن التحويل آمن.`,
            R`نهاية الـ [[rules]].`,
            R`نهاية عنصر الإعدادات الأساسي.`,
            R`[[eslint-config-prettier]] **آخر حاجة**: لأن العناصر اللي تحت بتكسب، فهو بيقفل أي قاعدة شكل اتفعّلت فوق (حتى لو انت فعّلتها بإيدك). اتجرّب: [[quotes: double]] مع السطر ده [[--print-config]] قال [[0]] (مقفولة)، ومن غيره رجعت [[error]].`,
            R`نهاية الـ array ونهاية [[defineConfig]].`,
          ],
          try: R`اعمل الفولدر من «المعمل»، وحط الـ config وملف [[src/cart.js]] الغلط اللي في الشرح، وشغّل [[npx eslint .]] واقرا كل سطر. بعدين [[npx eslint . --fix]] وشوف إيه اللي اتصلّح وإيه لأ وليه. وبعدها شيل [[prettier]] من آخر الـ config وزوّد [[quotes: ['error', 'double']]] وشغّل [[eslint --fix]] ثم [[prettier --write]] ثم [[eslint]] تاني.`,
          practice: [
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من [[npx eslint --help]] بس (من غير الدرس)، لاقي: الخيار اللي بيخلي ESLint يفشل لو فيه warning واحد، والخيار اللي بيفحص الملفات المتغيّرة بس، والخيار اللي بيوريك الصلاح من غير ما يكتبه. وجرّب الأول على ملف فيه [[let]] متغيّرش.`, done: R`كاتب التلاتة ([[--max-warnings 0]] و [[--cache]] و [[--fix-dry-run]])، وعلى ملف فيه warning بس: من غيره كود الخروج [[0]]، ومعاه [[1]] ورسالة «ESLint found too many warnings (maximum: 0)».` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** ملف [[src/cart.js]] اللي في الشرح (٥ errors). صلّحهم بإيدك من غير ولا [[eslint-disable]]، واكتب جنب كل واحد في تعليق: كان هيعمل إيه لو اتشغّل؟`, done: R`[[npx eslint .]] بيخرج بـ [[0]]، و [[npx prettier --check .]] كمان، وعارف إن [[discunt]] كان [[ReferenceError]] أول ما الدالة تتنادى، و [[item.qty == '0']] كان بيعدّي [[0]] و [['0']] و [[false]] و [[ [0] ]] كلهم (جرّب [[0 == '0']] و [[ [0] == '0' ]] في Node).` },
            { lvl: 'تحدي', t: R`**ابني:** config لمشروع فيه [[src/]] (كود متصفح)، و [[scripts/]] (سكربتات Node)، و [[**/*.test.js]] (Vitest). كل جزء بالـ globals بتاعته بس، والاختبارات مسموح فيها [[console.log]] وفي [[src/]] لأ (قاعدة [[no-console]]).`, done: R`[[window]] في ملف تحت [[scripts/]] بيطلع [[no-undef]]، و [[process]] تحت [[src/]] بيطلع [[no-undef]]، و [[console.log]] في [[src/]] بيطلع [[no-console]] وفي [[x.test.js]] لأ، و [[npx eslint --print-config scripts/a.js]] بيأكد الـ globals.` },
          ],
          deep: {
            why: R`الباجات اللي ESLint بيمسكها هي اللي بتعدّي من العين: [[discunt]] حرف ناقص، و [[import]] نسيته من تعديل قديم، و [[==]] بيقول [[0 == '']] [[true]]. ومن غير Prettier، كل review بيتحوّل لنقاش «مسافتين ولا أربعة» وكل commit فيه سطور اتغيّرت شكل بس فالـ diff الحقيقي بيضيع. الاتنين مع بعض بيخلوا الكود «زي ما واحد كتبه» والـ review على المنطق بس.`,
            how: R`**ESLint:** بيقرا كل ملف ويحوّله لـ AST (شجرة: [[Program]] جواها [[FunctionDeclaration]] جواها [[IfStatement]]...). كل قاعدة بتقول «نادي عليا لما تقابل [[BinaryExpression]]»، و [[eqeqeq]] بتشوف لو الـ operator [[==]]. و [[no-undef]] بيبني جدول scope: كل اسم اتعرّف فين، وأي اسم مستخدم ومش في أي scope ولا في [[globals]] = error. و [[--fix]] بيطبّق التعديلات اللي القاعدة متأكدة إنها مش هتغيّر سلوك الكود بس: [[typeof s == 'string']] اتصلحت لـ [[===]] (آمنة لأن [[typeof]] بيرجّع نص دايمًا)، و [[item.qty == '0']] **متصلحتش** لأن [[===]] هنا هيغيّر النتيجة لو [[qty]] رقم.

**الـ flat config:** ESLint بيمشي على الـ array من فوق لتحت، ولكل ملف بيجمّع العناصر اللي [[files]] بتاعتها بتطابقه، واللي بعد بيكتب على اللي قبل. [[npx eslint --print-config file.js]] بيطبع النتيجة النهائية لملف معيّن: هنا قال ٤٢٣ قاعدة بعد الدمج (أغلبها [[0]] من [[eslint-config-prettier]]).

**Prettier:** بيحوّل لـ AST ويرمي الشكل الأصلي **كله**، وبعدين يطبع من جديد بقواعده ([[printWidth]] ٨٠، إلخ). عشان كده نفس الكود بأي شكل بيطلع نفس الناتج، ومفيش «اختيار» غير الخيارات القليلة في [[.prettierrc.json]].`,
            when: R`في أي مشروع JS أو TS هيتشال أكتر من أسبوع أو هيشتغل فيه أكتر من واحد: من أول يوم، لأن إضافتهم بعدين بتطلّع مئات الأخطاء مرة واحدة. شغّلهم في VS Code (extension ESLint و Prettier و «Format on Save») عشان تشوف الغلط وانت بتكتب، وفي [[npm run lint]] للـ CI، وفي git hook قبل الـ commit (درس «lint-staged» في تاب «فحص الكود»). وللمشاريع اللي محتاجة سرعة أو أداة واحدة: Biome بيعمل الاتنين (درس «Biome ولا ESLint» في تاب «فحص الكود»).`,
            mistakes: R`تحط [[eslint-config-prettier]] في الأول فمبيقفلش حاجة. أو تنسى [[globals]] فـ [[console]] يطلع [[no-undef]]. أو تحط [[.eslintrc.json]] من tutorial قديم وتستغرب إنه بيتجاهل (ESLint 10 مبيقراهوش). أو تنسى [[globalIgnores(['dist/'])]] فيفحص الكود المتبني. أو تحل الأخطاء بـ [[// eslint-disable-next-line]] بدل ما تصلّحها (استخدمه بس مع سبب جنبه). أو تشغّل [[--fix]] على مشروع قديم كله في commit واحد مع تعديلات تانية فالـ review يبقى مستحيل: خلّي commit الشكل لوحده. أو تفتكر إن [[eslint --fix]] بيصلّح كل حاجة: [[eqeqeq]] صلّح [[typeof]] بس.`,
          },
          teach: R`## أداتين، شغلتين مختلفتين

ESLint بيقول «ده **باج** أو ممارسة غلط»، و Prettier بيقول «ده **شكله** كده». كل اللي تحت اتشغّل على ويندوز ١١ في مشروع تجربة: Node 24.22، و ESLint 10.13.0، و Prettier 3.9.10، و eslint-config-prettier 10.1.8، و globals 17.13، و @eslint/js 10.0.1. والمسار في الناتج اتغيّر لـ [[C:\Users\you\lab\lint]].

---

## ١. التسطيب

~~~bash
npm init -y
npm pkg set type=module
npm i -D eslint @eslint/js globals prettier eslint-config-prettier
~~~

| الباكدج | ليه |
|---|---|
| [[eslint]] | البرنامج نفسه وأمر [[npx eslint]] |
| [[@eslint/js]] | القواعد الموصى بيها [[js.configs.recommended]] |
| [[globals]] | أسماء متغيرات المتصفح و Node، عشان [[no-undef]] ميزعّقش على [[console]] |
| [[prettier]] | البرنامج اللي بيظبط الشكل |
| [[eslint-config-prettier]] | بيقفل قواعد الشكل في ESLint عشان ميتخانقش مع Prettier |

- [[-D]] = devDependencies: أدوات تطوير مش بتتشحن مع الكود للإنتاج.
- [[npm pkg set type=module]] بيخلي ملفات [[.js]] ESM، فـ [[import]] شغّال في [[eslint.config.js]].
- كلهم **local** في المشروع، و [[npx]] بيشغّل النسخة اللي في [[node_modules/.bin]]. متسطّبش ESLint global: كل مشروع ليه نسخته.

وفيه [[npm init @eslint/config@latest]] بيسألك أسئلة ويعمل الـ config (من الـ docs، متجرّبش هنا لأنه تفاعلي).

---

## ٢. ملف فيه ٥ باجات

~~~js src/cart.js
import { readFile } from 'node:fs/promises'

export function total(items, discount) {
  let sum = 0
  for (const item of items) {
    if (item.qty == '0') continue
    sum += item.price * item.qty
  }
  const unused = 42
  return sum - discunt
}
~~~

~~~text الناتج: npx eslint .
C:\Users\you\lab\lint\src\cart.js
   1:10  error  'readFile' is defined but never used                                        no-unused-vars
   3:30  error  'discount' is defined but never used. Allowed unused args must match /^_/u  no-unused-vars
   6:18  error  Expected '===' and instead saw '=='                                         eqeqeq
   9:9   error  'unused' is assigned a value but never used                                 no-unused-vars
  10:16  error  'discunt' is not defined                                                    no-undef

✖ 5 problems (5 errors, 0 warnings)
~~~

### اقرا السطر الواحد

~~~text
  10:16  error  'discunt' is not defined   no-undef
  ↑  ↑   ↑      ↑                           ↑
سطر عمود نوعه   الرسالة                     اسم القاعدة
~~~

- **[[10:16]]**: السطر ١٠، الحرف ١٦. في VS Code اعمل Ctrl+كليك على المسار أو اكتب [[Ctrl+G]] و [[10:16]].
- **[[error]] ولا [[warning]]**: الـ error بيخلي كود الخروج [[1]] (الـ CI يقع)، والـ warning لأ (إلا مع [[--max-warnings 0]]).
- **اسم القاعدة**: دوّر عليه في [[eslint.org/docs/latest/rules/<الاسم>]] هتلاقي ليه موجودة وأمثلة صح وغلط وكل الخيارات. ده أسرع من أي بحث.

### الخمسة دول باجات حقيقية؟

| السطر | المشكلة | لو اتشغّل |
|---|---|---|
| [[1:10]] [[readFile]] | import من تعديل قديم ومحدش شاله | ولا حاجة، بس الملف بيحمّل حاجة على الفاضي وبيلخبط اللي بيقرا |
| [[3:30]] [[discount]] | الـ argument اتكتب غلط تحت | الخصم عمره ما هيتطبق |
| [[6:18]] [[==]] | [[0 == '0']] و [[false == '0']] و [[ [0] == '0' ]] كلهم [[true]] | أصناف مش المقصودة هتتشال من الحساب |
| [[9:9]] [[unused]] | كود ميت | ولا حاجة، بس دايمًا علامة إن حاجة اتنست |
| [[10:16]] [[discunt]] | حرف ناقص | [[ReferenceError: discunt is not defined]] أول ما الدالة تتنادى |

الأخير كان هيوقّع البرنامج في الإنتاج، و ESLint مسكه من غير ما يشغّل سطر.

---

## ٣. [[--fix]]: بيصلّح الآمن بس

~~~js src/fixme.js
let greeting = "hi"
export const shout = (s) => { if (typeof s == "string") return s.toUpperCase() + greeting; return s == null ? '' : s }
~~~

~~~text الناتج: npx eslint src/fixme.js
  1:5   warning  'greeting' is never reassigned. Use 'const' instead  prefer-const
  2:44  error    Expected '===' and instead saw '=='                  eqeqeq

✖ 2 problems (1 error, 1 warning)
  1 error and 1 warning potentially fixable with the $__bt--fix$__bt option.
~~~

[[s == null]] مطلعش لأن [[null: 'ignore']]. وبعد [[npx eslint src/fixme.js --fix]] (خرج بـ [[0]] ومطبعش حاجة):

~~~text الملف بعد --fix
const greeting = "hi"
export const shout = (s) => { if (typeof s === "string") return s.toUpperCase() + greeting; return s == null ? '' : s }
~~~

**ليه صلّح ده ومصلّحش [[item.qty == '0']] في [[cart.js]]؟** [[typeof]] بيرجّع نص دايمًا، فـ [[==]] و [[===]] نفس النتيجة: التصليح آمن. لكن [[item.qty == '0']] لو [[qty]] رقم [[0]]، [[===]] هيرجّع [[false]] والسلوك هيتغيّر. فالقرار ليك: [[item.qty === 0]] لو الكمية رقم. ESLint مبيغيّرش معنى كودك من وراك.

---

## ٤. [[no-undef]] و [[globals]]

ملف بيستخدم [[console]] و [[window]] و [[process]]. لما شلت [[globals]] من الـ config:

~~~text الناتج
  2:3   error  'console' is not defined  no-undef
  2:15  error  'window' is not defined   no-undef
  2:37  error  'process' is not defined  no-undef
~~~

ESLint مبيعرفش انت شغّال فين. [[globals.browser]] بيعرّفه [[window]] و [[document]] و [[fetch]]، و [[globals.node]] بيعرّفه [[process]] و [[Buffer]]. ولما رجّعتهم: [[0]] أخطاء. والسطر [[// eslint-disable-next-line no-unused-vars]] اللي كان فوق [[const keep = 1]] قفل القاعدة للسطر اللي بعده بس.

---

## ٥. Prettier: [[--check]] و [[--write]]

~~~json .prettierrc.json
{ "singleQuote": true, "semi": true, "printWidth": 80 }
~~~

~~~text .prettierignore
node_modules
coverage
dist
~~~

~~~text الناتج: npx prettier --check .
Checking formatting...
[warn] eslint.config.js
[warn] package.json
[warn] src/cart.js
[warn] src/fixme.js
[warn] Code style issues found in 4 files. Run Prettier with --write to fix.
~~~

كود الخروج [[1]]، و [[--check]] **مبيغيّرش** حاجة: ده اللي تحطه في الـ CI. و [[--write]] بيكتب:

~~~text src/fixme.js بعد npx prettier --write src/fixme.js
const greeting = 'hi';
export const shout = (s) => {
  if (typeof s === 'string') return s.toUpperCase() + greeting;
  return s == null ? '' : s;
};
~~~

السطر الطويل اتقسم (أطول من ٨٠)، وعلامات التنصيص بقت single ([[singleQuote]])، و [[;]] اتحطت ([[semi]]).

**مفاجأة صغيرة:** [[package.json]] اتعلّم عليه. السبب: السكربت اللي كتبه ماحطش سطر فاضي في آخر الملف، و [[diff]] بعد [[--write]] وراني الفرق ده بس ([[\ No newline at end of file]]). Prettier بيظبط أي JSON و CSS و Markdown و YAML كمان، مش JS بس.

---

## ٦. الخناقة، وإزاي [[eslint-config-prettier]] بيمنعها

شلت [[prettier]] من آخر الـ config وزوّدت [[quotes: ['error', 'double']]]:

~~~text الناتج: ورا بعض
1) eslint:                       3 أخطاء quotes
2) بعد eslint --fix:             const greeting = "hi";
3) prettier --check:             [warn] src/fixme.js  Code style issues found
4) بعد prettier --write:         const greeting = 'hi';
5) eslint تاني:                  ✖ 3 problems (3 errors, 0 warnings)
~~~

كل أداة بتصلّح اللي التانية عملته، للأبد. ولما رجّعت [[prettier]] آخر الـ array:

~~~text الناتج
6) with eslint-config-prettier:
Checking formatting...
All matched files use Prettier code style!
~~~

و [[npx eslint --print-config src/fixme.js]] قال [[quotes = [0,"double"] ]] و [[semi = [0] ]]: الـ [[0]] = مقفولة. **ملحوظة:** في ESLint 10 قواعد الشكل زي [[quotes]] deprecated ومش في الـ recommended أصلًا، فالخناقة بتحصل لما انت أو plugin (زي [[@stylistic]] أو configs قديمة) يفعّلوها. [[eslint-config-prettier]] بيقفلهم كلهم في الحالتين.

---

## ٧. سكربتات [[package.json]] والـ CI

~~~json package.json (جزء)
"scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
~~~

~~~text الناتج: npx eslint . --max-warnings 0 && npx prettier --check .
Checking formatting...
All matched files use Prettier code style!
~~~

- [[&&]]: التاني بيشتغل بس لو الأول خرج بـ [[0]].
- [[--max-warnings 0]]: warning واحد = فشل. اتجرّب على ملف فيه [[let]] بس: من غيره خرج [[0]]، ومعاه [[1]] و «ESLint found too many warnings (maximum: 0)».
- [[--cache]]: بيحفظ النتيجة في [[.eslintcache]] ويفحص المتغيّر بس في المرة الجاية (حطه في [[.gitignore]]).

| الأمر | بيعمل إيه | كود الخروج |
|---|---|---|
| [[eslint .]] | يفحص ويطبع | [[1]] لو فيه error، [[2]] لو الـ config نفسه بايظ |
| [[eslint . --fix]] | يصلّح الآمن ويطبع الباقي | [[1]] لو فضل error |
| [[prettier --check .]] | يقول مين شكله غلط من غير ما يغيّر | [[1]] لو فيه ملف |
| [[prettier --write .]] | يظبط كل الملفات | [[0]] عادةً |

---

## الخلاصة

- ESLint = باجات (AST وقواعد)، و Prettier = شكل (بيعيد الطباعة). [[eslint-config-prettier]] **آخر** حاجة في الـ config.
- ESLint 10: [[eslint.config.js]] بس، و [[defineConfig]] و [[extends]] و [[globalIgnores]] و [[globals]].
- اقرا السطر: [[سطر:عمود]] والنوع والرسالة واسم القاعدة، واسم القاعدة هو مفتاح الـ docs.
- [[--fix]] بيصلّح اللي مش هيغيّر السلوك بس، والباقي ليك.
- في الـ CI: [[eslint . --max-warnings 0 && prettier --check .]].`,
          sol: R`اتجرّب على ESLint 10.13 و Prettier 3.9:

- [[npx eslint .]] على [[cart.js]] طلّع الـ ٥ أخطاء اللي في الشرح بالظبط، و [[--fix]] مصلّحش ولا واحد منهم: تلاتة [[no-unused-vars]] و [[no-undef]] مالهمش تصليح آلي (ESLint ميعرفش انت عايز تمسح ولا تستخدم)، و [[eqeqeq]] مع [[== '0']] مش آمن يتصلح.
- من غير [[eslint-config-prettier]] ومع [[quotes: double]]: [[eslint --fix]] حوّل لـ double، و [[prettier --write]] رجّع single، و [[eslint]] تاني طلّع [[3 errors]]. ورجوع [[prettier]] لآخر الـ array قفل الخناقة.

بعد التصليح بإيدك:`,
          solCode: R`export function total(items, discount = 0) {
  let sum = 0;
  for (const item of items) {
    if (item.qty === 0) continue;
    sum += item.price * item.qty;
  }
  return sum - discount;
}
// npx eslint . ← مفيش ناتج وكود الخروج 0
// npx prettier --check . ← All matched files use Prettier code style!`,
        },
        {
          cmd: "اختبار JS بـ Vitest",
          title: "describe و it و expect، و toBe ولا toEqual، و vi.fn، والـ coverage",
          learn: R`تكتب اختبارات Vitest لدوال عادية و async، وتختار بين [[toBe]] و [[toEqual]] و [[toStrictEqual]]، وتختبر error متوقّع، وتحط [[vi.fn()]] مكان الدفع أو الشبكة، وتقرا تقرير الـ coverage.`,
          out: R`ملف اختبارات بيقولك في ٢٠٠ms إن تعديلك مكسرش حاجة، وبيشتغل مع كل حفظ.`,
          use: {
            prog: R`الاختبار هو اللي بيخليك تعدّل كود قديم من غير خوف: غيّر، والـ watch mode بيقولك في ثانية لو حاجة وقعت ومين بالظبط. ومن غيره كل تعديل محتاج تجرّب الصفحة بإيدك.`,
            work: R`أي PR في شركة بيتسأل «فين الاختبار؟»، و Vitest هو المعتاد دلوقتي في مشاريع Vite و Vue و React الجديدة (وشكله نفس Jest تقريبًا، فاللي بيعرف واحد بيعرف التاني).`,
            cs: R`الـ unit test بيعزل دالة واحدة. والـ test double ([[vi.fn()]]) بيقف مكان أي حاجة خارجية عشان الاختبار يبقى سريع ويطلع نفس النتيجة كل مرة. والـ coverage بيقيس الكود اللي اتنفّذ، مش اللي اتأكّد إنه صح.`,
          },
          desc: R`Vitest بيدوّر على أي ملف اسمه [[*.test.js]] أو [[*.spec.js]] ويشغّله. جوه الملف:

- [[describe('اسم', () => {...})]]: مجموعة اختبارات (اختياري، للتنظيم في الناتج).
- [[it('بيعمل كذا', () => {...})]] (أو [[test]]، نفس الحاجة): اختبار واحد.
- [[expect(قيمة).matcher(متوقّع)]]: التأكيد. لو مطابقش، الاختبار بيقع برسالة فيها الاتنين.

**أهم فرق:** [[toBe]] بيقارن بـ [[Object.is]] (نفس الحاجة بالظبط، ينفع للأرقام والنصوص). [[toEqual]] بيقارن **المحتوى** (للـ objects والـ arrays). جرّبتها: [[expect({ a: 1 }).toBe({ a: 1 })]] وقع وقال «If it should pass with deep equality, replace "toBe" with "toStrictEqual"». و [[toStrictEqual]] أدق من [[toEqual]]: [[{ a: 1, b: undefined }]] بيساوي [[{ a: 1 }]] في [[toEqual]] وبيقع في [[toStrictEqual]].

**الأخطاء:** [[expect(() => fn()).toThrow(...)]] لازم **دالة**، مش [[expect(fn())]]. **async:** [[await expect(promise).resolves/rejects...]]، ولو نسيت [[await]] Vitest 5 بيقع ويقولك (اتجرّب). **[[vi.fn()]]:** دالة مزيّفة بتسجّل اتنادت كام مرة وبإيه، و [[mockResolvedValue]] تخليها ترجّع Promise.

**الأوامر:** [[npx vitest]] = watch mode (بيعيد مع كل حفظ)، و [[npx vitest run]] = مرة واحدة (للـ CI)، و [[--coverage]] = تقرير الكود اللي اتنفّذ.

و Node نفسه فيه [[node --test]] من غير ولا باكدج (درس «node --test» في تاب Node، واتستخدم في درس «مشروع — اختبرها من غير شبكة»). Vitest بيزوّد عليه watch أذكى، و mocks أسهل، ورسايل فشل فيها diff، و coverage بأمر واحد، وشغل مباشر مع Vite و TS.`,
          example: R`// src/cart.test.js (والكود اللي بيتختبر في src/cart.js، في الشرح)
import { describe, it, expect, vi } from 'vitest';
import { total, addItem, checkout } from './cart.js';
describe('total', () => {
  it('بيجمع السعر في الكمية', () => {
    expect(total([{ price: 50, qty: 2 }, { price: 10, qty: 1 }])).toBe(110);
  });
  it('الخصم مبيخليش الإجمالي سالب', () => {
    expect(total([{ price: 5, qty: 1 }], 20)).toBe(0);
  });
  it('بيرمي لو items مش array', () => {
    expect(() => total('x')).toThrow(TypeError);
    expect(() => total(null)).toThrow('لازم array');
  });
});
it('addItem بترجّع سلة جديدة', () => {
  const cart = { items: [] };
  const next = addItem(cart, { price: 1, qty: 1 });
  expect(next).toEqual({ items: [{ price: 1, qty: 1 }] });
  expect(next).not.toBe(cart);
});
describe('checkout', () => {
  it('بيدفع المبلغ الصح مرة واحدة', async () => {
    const pay = vi.fn().mockResolvedValue({ id: 'r-1' });
    const result = await checkout({ items: [{ price: 30, qty: 2 }] }, pay);
    expect(result).toEqual({ ok: true, id: 'r-1' });
    expect(pay).toHaveBeenCalledTimes(1);
    expect(pay).toHaveBeenCalledWith(60);
  });
  it('لو الدفع وقع، الخطأ بيطلع', async () => {
    const pay = vi.fn().mockRejectedValue(new Error('card declined'));
    await expect(checkout({ items: [{ price: 1, qty: 1 }] }, pay)).rejects.toThrow('card declined');
  });
});`,
          lines: [
            R`بنستورد من [[vitest]] بالاسم. Vitest مبيحطش [[describe]] و [[it]] global من غير ما تطلب ([[globals: true]] في الـ config)، والـ import أوضح: ESLint مش هيقول [[no-undef]]، و VS Code بيعرف الأنواع.`,
            R`الدوال اللي هنختبرها. الاختبار بيستورد الكود الحقيقي زي أي ملف تاني، فلازم الدوال تكون [[export]]. وده بيدفعك تفصل المنطق عن الـ DOM: دالة [[total]] متقدرش تتختبر بسهولة لو بتقرا من [[document]].`,
            R`[[describe]] بيجمع اختبارات [[total]] تحت اسم واحد. في الناتج بتظهر [[total > بيجمع السعر في الكمية]]، فلما حاجة تقع تعرف هي في أنهي دالة من غير ما تفتح الملف.`,
            R`أول اختبار: الحالة العادية. الاسم جملة بتوصف السلوك، مش [[test1]]، لأنه هو اللي هيظهر لما يقع.`,
            R`٥٠×٢ + ١٠×١ = ١١٠. [[toBe]] كفاية لأن النتيجة رقم، و [[110 === 110]]. والأرقام المتوقّعة مكتوبة بإيدك مش محسوبة بنفس الكود، وإلا الاختبار هيكرر نفس الغلطة.`,
            R`نهاية أول [[it]].`,
            R`حالة طرفية: خصم أكبر من الإجمالي. ده بالظبط نوع الاختبار اللي بيمسك الباجات، لأن محدش بيجرّبه بإيده.`,
            R`٥ − ٢٠ = −١٥، بس الدالة فيها [[Math.max(0, ...)]] فالمتوقّع [[0]]. ولما شلت [[Math.max]] عن قصد في الـ watch mode، الاختبار ده وقع وقال [[expected -15 to be +0]].`,
            R`نهاية تاني [[it]].`,
            R`تالت حالة: إدخال غلط. الدالة المفروض ترمي بدل ما ترجّع رقم غلط.`,
            R`[[expect(() => total('x'))]]: **دالة** بتنادي [[total]]، مش [[total('x')]] نفسها. لو كتبت [[expect(total('x'))]] الـ error هيترمي قبل ما [[expect]] تشتغل والاختبار يقع بالـ error نفسه (اتجرّب). و [[toThrow(TypeError)]] بيتأكد من **النوع**.`,
            R`[[toThrow('لازم array')]] بنص: بيتأكد إن الرسالة **فيها** النص ده (مش لازم الرسالة كلها). و [[toThrow(/regex/)]] كمان ينفع. اختبار الرسالة مهم لو اليوزر هيشوفها.`,
            R`نهاية تالت [[it]].`,
            R`نهاية [[describe('total')]].`,
            R`[[it]] برا أي [[describe]] عادي جدًا. [[describe]] للتنظيم بس، ومش شرط.`,
            R`سلة فاضية. بنحفظها في متغير عشان نقارن بيها بعدين.`,
            R`[[addItem]] المفروض **immutable**: ترجّع object جديد ومتلمسش القديم (درس «immutability»).`,
            R`[[toEqual]] بيقارن المحتوى بالعمق: object جواه array جواه object. [[toBe]] هنا كان هيقع حتى لو المحتوى مطابق، لأنهم objects مختلفين في الذاكرة.`,
            R`[[not.toBe(cart)]]: [[.not]] بيعكس أي matcher. هنا بنتأكد إن [[next]] **مش** نفس الـ object، يعني الدالة مرجّعتش [[cart]] بعد ما عدّلته. ده الاختبار اللي بيمسك [[cart.items.push(item); return cart;]].`,
            R`نهاية الـ [[it]].`,
            R`مجموعة [[checkout]]: دالة async بتنادي دالة دفع من برا (في الحقيقة API بنك).`,
            R`[[async]] قبل الدالة عشان نقدر [[await]] جواها. Vitest بيستنى الـ Promise اللي الاختبار بيرجّعها قبل ما يقرر نجح ولا لأ.`,
            R`[[vi.fn()]] دالة مزيّفة بتسجّل كل نداء، و [[mockResolvedValue(x)]] بتخليها ترجّع [[Promise.resolve(x)]]. كده مفيش بنك حقيقي ولا شبكة، والاختبار بيخلص في ١ms وبيطلع نفس النتيجة كل مرة.`,
            R`بنمرر الـ mock مكان دالة الدفع الحقيقية. ده سبب إن [[checkout]] بتاخد [[pay]] كـ argument بدل ما تستورده: dependency injection بيخلي الكود قابل للاختبار من غير [[vi.mock]].`,
            R`النتيجة object، فـ [[toEqual]].`,
            R`[[toHaveBeenCalledTimes(1)]]: اتنادى مرة واحدة بالظبط. ده بيمسك باج «الدفع اتعمل مرتين» اللي محدش بيلاحظه غير لما اليوزر يشتكي.`,
            R`[[toHaveBeenCalledWith(60)]]: اتنادى بالمبلغ ده (٣٠×٢). وكل النداءات محفوظة في [[pay.mock.calls]]: بعد [[pay(60)]] و [[pay(15)]] كانت [[ [ [60], [15] ] ]] (اتجرّب).`,
            R`نهاية الـ [[it]].`,
            R`حالة الفشل: البنك رفض. أي كود async لازم يتختبر في الحالتين.`,
            R`[[mockRejectedValue]] بتخلي الـ mock يرجّع Promise بترفض بالـ error ده، زي ما البنك يرد بـ «card declined».`,
            R`[[await expect(promise).rejects.toThrow(...)]]: بيستنى الـ Promise ويتأكد إنها رفضت بالرسالة دي. الـ [[await]] **لازم**: من غيرها Vitest 5 بيقع ويقول «Promise returned by expect(actual).rejects.toThrow() was not awaited» (اتجرّب). و [[checkout]] نفسها لازم متبلعش الـ error.`,
            R`نهاية الـ [[it]].`,
            R`نهاية [[describe('checkout')]].`,
          ],
          try: R`اعمل المشروع من «المعمل» وحط [[src/cart.js]] و [[src/cart.test.js]] وشغّل [[npx vitest run --reporter=verbose]]. بعدين [[npx vitest]] (watch)، وفي ملف [[cart.js]] شيل [[Math.max(0, ...)]] واحفظ وشوف أنهي اختبار وقع ورسالته. وبعدها [[npx vitest run --coverage]] واقرا [[Uncovered Line #s]]: أنهي سطور مااتختبرتش، وأنهي فرع ناقص حتى لو سطره «covered».`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** قبل ما تشغّل، قول مين هيعدّي ومين هيقع: [[expect({ a: 1 }).toBe({ a: 1 })]]، و [[expect({ a: 1, b: undefined }).toEqual({ a: 1 })]]، و [[expect({ a: 1, b: undefined }).toStrictEqual({ a: 1 })]]، و [[expect(0.1 + 0.2).toBe(0.3)]]، و [[expect(0.1 + 0.2).toBeCloseTo(0.3)]]. وبعدين شغّلهم.`, done: R`توقّعك: الأول يقع، والتاني يعدّي، والتالت يقع، والرابع يقع ([[0.30000000000000004]])، والخامس يعدّي. وعارف تقول لكل واحد السبب في جملة.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** الـ coverage بيقول ٧٢٪ lines و ٤٤٪ branches. اكتب اختبارات لـ [[applyCoupon]] بـ [[it.each]] (كود صح، وصغير [[save10]]، وفاضي، و [[undefined]])، ولحالة السلة الفاضية في [[checkout]] اللي بترجّع [[{ ok: false }]] ومبتنادي [[pay]]، لحد ما توصل ١٠٠٪.`, done: R`[[npx vitest run --coverage]] بيطبع [[Statements : 100%]] و [[Branches : 100%]] و [[Functions : 100%]] و [[Lines : 100%]]، وفيه [[expect(pay).not.toHaveBeenCalled()]] في اختبار السلة الفاضية.` },
            { lvl: 'تحدي', t: R`**صلّح الاختبار البايظ:** الاختبار ده بيقول «passed» رغم إن التأكيد غلط: [[checkout(cart, pay).then((r) => { expect(r.ok).toBe(false); });]] من غير [[await]] ولا [[return]]. شغّله واقرا الناتج كله، وبعدين حط [[setTimeout]] ١٠٠ms جوه الـ mock وشوف هيقول إيه، وصلّحه.`, done: R`شفت إن الناتج قال [[Tests 1 passed]] و [[Errors 1 error]] مع «Unhandled Rejection» وكود خروج [[1]]، ومع التأخير المشكلة ممكن تستخبى خالص. وبعد ما زوّدت [[await]] الاختبار بيقع صح باسمه، ولما صلّحت التأكيد لـ [[true]] بيعدّي.` },
          ],
          deep: {
            why: R`من غير اختبارات، الطريقة الوحيدة تعرف إن تعديلك سليم إنك تجرّب كل حاجة بإيدك، وده مبيحصلش: بتجرّب اللي عدّلته بس، والباج بيطلع في حتة تانية. الاختبار بيجرّب **كل** الحالات اللي كتبتها، في أقل من ثانية، مع كل حفظ. وكتابته بتجبرك على كود أحسن: دوال صغيرة بتاخد اللي محتاجاه كـ arguments بدل ما تقرا من الـ DOM أو تنادي API مباشرة.`,
            how: R`[[vitest]] بيدوّر على [[**/*.{test,spec}.?(c|m)[jt]s?(x)]] ويشغّل كل ملف في worker لوحده (عشان ملف ميأثرش على التاني)، ويحوّل الكود بـ Vite (فـ TS و JSX شغالين من غير إعداد). [[describe]] و [[it]] بيسجّلوا الاختبارات الأول، وبعدين بتتشغّل بالترتيب. [[expect]] بيرمي [[AssertionError]] لو التأكيد فشل، والـ runner بيمسكه ويعلّم الاختبار [[×]] ويكمّل الباقي. لو الدالة رجّعت Promise بيستناها.

**watch mode:** Vitest عارف كل ملف بيستورد إيه (من Vite)، فلما [[cart.js]] اتغيّر، أعاد [[cart.test.js]] بس: الناتج قال [[RERUN src/cart.js x1]] وخلّص في 32ms.

**coverage بـ v8:** المحرك نفسه (V8) بيعدّ كل سطر وفرع اتنفّذ وانت بتشغّل الاختبارات، و [[@vitest/coverage-v8]] بيحوّل ده لتقرير. **Lines** = سطور اتنفّذت، **Branches** = كل [[if]] و [[?:]] و [[||]] اتجرّب في الاتجاهين؟ اتقاس: سطر [[if (amount === 0) return ...]] اتحسب «covered» لأن الـ [[if]] اتنفّذ، بس الـ branch بتاع [[true]] عمره ما حصل، فـ Branches كانت ٤٤٪ و Lines ٧٢٪. عشان كده الـ branches أصدق.`,
            when: R`اختبر المنطق اللي ليه قواعد: حسابات، وتحقق، وتحويل داتا، وحالات الأخطاء، وأي باج اتصلّح (اكتب اختبار بيمسكه **قبل** ما تصلّحه). متختبرش تفاصيل التنفيذ (اسم متغير داخلي) ولا مكتبات الناس. وللصفحة كلها في متصفح حقيقي: Playwright (تاب «فحص الكود»). و [[node --test]] كفاية لمكتبة Node صغيرة من غير build ومن غير باكدجات. Vitest لما المشروع فيه Vite أو TS أو React/Vue، أو محتاج mocks و coverage و watch مريحين.`,
            mistakes: R`[[toBe]] على object أو array (يقع حتى لو المحتوى زي بعضه). [[expect(fn())]] بدل [[expect(() => fn())]] مع [[toThrow]]. تنسى [[await]] قبل [[expect(...).rejects]] (Vitest 5 بيمسكها)، أو تنسى [[await]]/[[return]] قبل [[.then]] فالاختبار يقول «passed» والتأكيد بيقع بعدين كـ unhandled error. [[0.1 + 0.2]] بـ [[toBe]] (استخدم [[toBeCloseTo]]). اختبارات بتعتمد على بعض (واحد بيعدّل متغير والتاني بيقرا) فلما تشغّل واحد لوحده يقع. ومطاردة ١٠٠٪ coverage بتأكيدات فاضية: الاختبار من غير [[expect]] بيرفع الـ coverage ومش بيختبر حاجة.`,
          },
          teach: R`## ملف اختبار = كود بيشغّل كودك ويتأكد

كل اللي تحت اتشغّل على ويندوز ١١ بـ Node 24.22 و Vitest 5.0.5 و @vitest/coverage-v8 5.0.5 في مشروع تجربة، والمسار في الناتج اتغيّر لـ [[C:/Users/you/lab/vt]].

---

## ١. التسطيب والكود اللي هيتختبر

~~~bash
npm init -y
npm pkg set type=module
npm i -D vitest @vitest/coverage-v8
~~~

- [[vitest]] الـ runner نفسه، و [[@vitest/coverage-v8]] لتقرير الـ coverage (حسب الـ docs، Vitest بيطلب تسطّبه لو شغّلت [[--coverage]] من غيره).
- في [[package.json]]: [["test": "vitest"]] و [["coverage": "vitest run --coverage"]]، فـ [[npm test]] بيشغّل watch و [[npm run coverage]] مرة واحدة.

~~~js src/cart.js
export function total(items, discount = 0) {
  if (!Array.isArray(items)) throw new TypeError('items لازم array');
  const sum = items.reduce((s, i) => s + i.price * i.qty, 0);
  return Math.max(0, sum - discount);
}

export function addItem(cart, item) {
  return { ...cart, items: [...cart.items, item] };
}

export async function checkout(cart, pay) {
  const amount = total(cart.items);
  if (amount === 0) return { ok: false, reason: 'empty' };
  const receipt = await pay(amount);
  return { ok: true, id: receipt.id };
}

export function applyCoupon(code) {
  if (code === 'SAVE10') return 10;
  if (code === 'HALF') return 50;
  return 0;
}
~~~

لاحظ إن [[checkout]] بتاخد [[pay]] كـ argument: ده اللي بيخلي الاختبار يحط دالة مزيّفة مكان البنك من غير أي حيلة.

---

## ٢. أول تشغيل

~~~text الناتج: npx vitest run --reporter=verbose
 RUN  v5.0.5 C:/Users/you/lab/vt

 ✓ src/cart.test.js > total > بيجمع السعر في الكمية 2ms
 ✓ src/cart.test.js > total > الخصم مبيخليش الإجمالي سالب 0ms
 ✓ src/cart.test.js > total > بيرمي لو items مش array 1ms
 ✓ src/cart.test.js > addItem بترجّع سلة جديدة 1ms
 ✓ src/cart.test.js > checkout > بيدفع المبلغ الصح مرة واحدة 1ms
 ✓ src/cart.test.js > checkout > لو الدفع وقع، الخطأ بيطلع 1ms

 Test Files  1 passed (1)
      Tests  6 passed (6)
   Start at  23:48:24
   Duration  243ms (transform 44%, import 34%, tests 12%, worker 10%)
~~~

- [[run]]: مرة واحدة واخرج (للـ CI). من غيره وفي ترمنال عادي = watch.
- [[--reporter=verbose]]: اسم كل اختبار. الافتراضي في ترمنال مش تفاعلي بيطبع الملخص بس (اتجرّب: من غيره ظهر [[Tests 7 passed]] من غير أسامي).
- [[ملف > describe > it]]: ده المسار اللي بيظهر لما حاجة تقع.
- الـ Duration كله ربع ثانية، والاختبارات نفسها ١٢٪ منه: الباقي تحويل وتحميل.

---

## ٣. اقرا الفشل: [[toBe]] و [[toEqual]] و [[toStrictEqual]]

~~~js src/fail.test.js
it('toBe على object', () => {
  expect({ a: 1 }).toBe({ a: 1 });
});
it('0.1 + 0.2', () => {
  expect(0.1 + 0.2).toBe(0.3);
});
~~~

~~~text الناتج (جزء)
 FAIL  src/fail.test.js > toBe على object
AssertionError: expected { a: 1 } to be { a: 1 } // Object.is equality

If it should pass with deep equality, replace "toBe" with "toStrictEqual"

Expected: { a: 1 }
Received: serializes to the same string

 ❯ src/fail.test.js:3:20
      2| it('toBe على object', () => {
      3|   expect({ a: 1 }).toBe({ a: 1 });
       |                    ^

 FAIL  src/fail.test.js > 0.1 + 0.2
AssertionError: expected 0.30000000000000004 to be 0.3 // Object.is equality

- Expected
+ Received

- 0.3
+ 0.30000000000000004
~~~

اقرا الرسالة من فوق لتحت: **مين** وقع (المسار)، و**إيه** ([[expected X to be Y]] ونوع المقارنة [[Object.is]])، و**نصيحة** («replace toBe with toStrictEqual»)، و diff ([[-]] المتوقّع، [[+]] اللي وصل)، و**فين** بالظبط بسهم تحت الحرف.

«serializes to the same string» = شكلهم واحد بس مش **نفس** الـ object. والتاني: [[0.1 + 0.2]] في أي لغة بـ floating point = [[0.30000000000000004]] (درس «number و NaN»)، والحل [[toBeCloseTo(0.3)]].

~~~text الناتج: toEqual و toStrictEqual على { a: 1, b: undefined }
AssertionError: expected { a: 1, b: undefined } to strictly equal { a: 1 }
- Expected
+ Received
  {
    "a": 1,
+   "b": undefined,
  }
~~~

[[toEqual]] (السطر اللي قبله) **عدّى**: بيتجاهل الخصايص اللي قيمتها [[undefined]]. [[toStrictEqual]] وقع.

| الـ matcher | بيقارن إزاي | استخدمه لـ |
|---|---|---|
| [[toBe]] | [[Object.is]]: نفس القيمة أو نفس الـ object بالظبط | أرقام ونصوص و [[true]]/[[false]] و «نفس المرجع» |
| [[toEqual]] | المحتوى بالعمق، وبيتجاهل [[undefined]] | objects و arrays لما الشكل هو المهم |
| [[toStrictEqual]] | المحتوى بالعمق + [[undefined]] + نوع الـ class | لما الفرق بين «مش موجود» و «[[undefined]]» مهم |
| [[toBeCloseTo]] | أرقام عشرية بتقريب (٢ رقم بعد العلامة افتراضيًا) | فلوس ونسب وأي حساب float |
| [[toThrow]] | الدالة رمت؟ ومعاه نوع أو نص أو regex | التحقق من الإدخال |
| [[toHaveLength]] و [[toContain]] و [[toMatch]] | طول، وعنصر جوه array، ونص بـ regex | لستات ونصوص |

---

## ٤. غلطتين في الـ async والأخطاء

~~~js
it('من غير () =>', () => {
  expect(total('x')).toThrow();
});
it('من غير await', () => {
  expect(Promise.resolve(1)).rejects.toThrow();
});
~~~

~~~text الناتج (جزء)
 FAIL  src/fail.test.js > من غير () =>
TypeError: items لازم array
 ❯ total src/cart.js:2:36

 FAIL  src/fail.test.js > من غير await
AssertionError: promise resolved "1" instead of rejecting
Error: Promise returned by $__btexpect(actual).rejects.toThrow()$__bt was not awaited. This assertion is asynchronous and must be awaited; otherwise, it is not guaranteed to complete before the test finishes
~~~

1. [[total('x')]] اتنفّذت **قبل** [[expect]]، فالـ error طلع من الاختبار نفسه. الاختبار وقع، بس لسبب غلط، ولو الدالة مبترميش هيقع برضه برسالة ملهاش معنى. لازم [[() => total('x')]].
2. من غير [[await]]: Vitest 5 بيمسكها ويقولك صراحة. لكن الغلطة الأخطر [[.then]] من غير [[await]]:

~~~text الناتج: checkout(...).then(r => expect(r.ok).toBe(false)) من غير await
Vitest caught 1 unhandled error during the test run.
This might cause false positive tests. Resolve unhandled errors to make sure your tests are not affected.
AssertionError: expected true to be false // Object.is equality
 Test Files  1 passed (1)
      Tests  1 passed (1)
     Errors  1 error
~~~

**[[Tests 1 passed]]** والتأكيد غلط. Vitest لحقه كـ «unhandled error» وخرج بـ [[1]]، بس لو التأكيد اتأخر شوية (setTimeout) ممكن ميلحقوش خالص. القاعدة: أي Promise في اختبار، [[await]] قبلها.

---

## ٥. [[vi.fn()]]: دالة مزيّفة بتسجّل

| الكود | بيعمل إيه |
|---|---|
| [[vi.fn()]] | دالة بترجّع [[undefined]] وبتسجّل كل نداء |
| [[vi.fn().mockReturnValue(5)]] | بترجّع [[5]] كل مرة |
| [[vi.fn().mockResolvedValue(x)]] | بترجّع [[Promise.resolve(x)]]، زي API نجح |
| [[vi.fn().mockRejectedValue(err)]] | بترجّع Promise بترفض، زي API فشل |
| [[vi.fn((a) => a * 2)]] | بتشغّل الدالة دي وبتسجّل كمان |
| [[fn.mock.calls]] | كل الـ arguments: بعد [[pay(60)]] و [[pay(15)]] كانت [[ [ [60], [15] ] ]] |

والتأكيدات: [[toHaveBeenCalled()]] و [[toHaveBeenCalledTimes(n)]] و [[toHaveBeenCalledWith(...)]] و [[not.toHaveBeenCalled()]]. ولو الكود بيستورد الحاجة الخارجية بدل ما ياخدها كـ argument، فيه [[vi.mock('./bank.js')]] و [[vi.spyOn(obj, 'method')]] (دروس «vi.fn و vi.spyOn» و «vi.mock» في تاب «فحص الكود»).

---

## ٦. watch mode

[[npx vitest --watch]] (أو [[npx vitest]] في ترمنال عادي). وقتها الملف كان فيه اختبارات [[applyCoupon]] اللي في القسم ٧ كمان، فالعدد ١١. شيلت [[Math.max(0, ...)]] من [[cart.js]] وحفظت:

~~~text الناتج
 PASS  Waiting for file changes...
       press h to show help, press q to quit

 RERUN  src/cart.js x1
 ❯ src/cart.test.js (11 tests | 1 failed) 14ms
   ❯ total (3)
     × الخصم مبيخليش الإجمالي سالب 5ms

 FAIL  src/cart.test.js > total > الخصم مبيخليش الإجمالي سالب
AssertionError: expected -15 to be +0 // Object.is equality
- 0
+ -15

 Test Files  1 failed (1)
      Tests  1 failed | 10 passed (11)
   Duration  32ms
 FAIL  Tests failed. Watching for file changes...
~~~

ورجّعت السطر وحفظت:

~~~text الناتج
 RERUN  src/cart.js x2
 Test Files  1 passed (1)
      Tests  11 passed (11)
 PASS  Waiting for file changes...
~~~

- [[RERUN src/cart.js x1]]: Vitest عارف إن [[cart.test.js]] بيستورد [[cart.js]]، فأعاده هو بس.
- [[32ms]] بدل ٢٤٣: مفيش تحميل من الأول.
- [[h]] للمساعدة، و [[q]] للخروج، و [[a]] يعيد الكل، و [[f]] الفاشل بس. وفي الـ CI (لو [[CI=true]]) [[vitest]] بيشتغل مرة واحدة لوحده.

---

## ٧. الـ coverage، والحد الأدنى

~~~js vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.js'],
      reporter: ['text', 'html'],
      thresholds: { lines: 90, branches: 80 },
    },
  },
});
~~~

~~~text الناتج: npx vitest run --coverage
 % Coverage report from v8
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |    62.5 |    44.44 |      80 |   72.72 |
 cart.js  |    62.5 |    44.44 |      80 |   72.72 | 19-21
----------|---------|----------|---------|---------|-------------------
ERROR: Coverage for lines (72.72%) does not meet global threshold (90%)
ERROR: Coverage for branches (44.44%) does not meet global threshold (80%)
~~~

| العمود | بيعدّ إيه |
|---|---|
| [[% Stmts]] | الجمل البرمجية اللي اتنفّذت، والسطر الواحد ممكن يبقى فيه أكتر من جملة |
| [[% Branch]] | كل فرع في [[if]] و [[?:]] و [[&&]] و [[\|\|]] والقيم الافتراضية: اتجرّب في الاتجاهين؟ |
| [[% Funcs]] | الدوال اللي اتنادت ولو مرة: ٤ من ٥ ([[applyCoupon]] لأ) |
| [[% Lines]] | السطور اللي اتنفّذ منها حاجة |
| [[Uncovered Line #s]] | أرقام السطور اللي محدش نفّذها، وهنا ١٩–٢١ (جسم [[applyCoupon]]) |

**الفخ:** سطر ١٣ [[if (amount === 0) return { ok: false, ... }]] **مش** في الـ uncovered، لأن الـ [[if]] اتنفّذ. بس محدش جرّب سلة فاضية، فالفرع ده ناقص. الـ Lines قالت ٧٢٪ والـ Branches ٤٤٪، والفرق ده هو الحالات اللي مااتجرّبتش. والـ [[ERROR]] خلّى كود الخروج [[1]]: ده اللي بيوقّع الـ CI.

بعد ما زوّدت اختبارات [[applyCoupon]] بـ [[it.each]] واختبار السلة الفاضية:

~~~js
it.each([
  ['SAVE10', 10],
  ['HALF', 50],
  ['save10', 0],
  ['', 0],
])('%s ← %i', (code, expected) => {
  expect(applyCoupon(code)).toBe(expected);
});
~~~

~~~text الناتج
 ✓ src/cart.test.js > applyCoupon > SAVE10 ← 10 0ms
 ✓ src/cart.test.js > applyCoupon > HALF ← 50 0ms
 ✓ src/cart.test.js > applyCoupon > save10 ← 0 0ms
 ✓ src/cart.test.js > applyCoupon >  ← 0 0ms
 Test Files  1 passed (1)
      Tests  11 passed (11)
 % Coverage report from v8
No files with missing coverage.
1 file fully covered.
=============================== Coverage summary ===============================
Statements   : 100% ( 16/16 )
Branches     : 100% ( 9/9 )
Functions    : 100% ( 5/5 )
Lines        : 100% ( 11/11 )
================================================================================
~~~

- [[it.each(جدول)]] بيعمل اختبار لكل صف، و [[%s]] و [[%i]] في الاسم بيتبدلوا بالقيم (نص ورقم). والنص الفاضي طلع اسمه [[ ← 0]].
- **مفاجأة Vitest 5:** لما كل حاجة ١٠٠٪، جدول الملفات مبيظهرش خالص: «No files with missing coverage». والملخص اللي تحته بيبان دايمًا.
- تقرير [[html]] اتعمل في [[coverage/index.html]]: افتحه في المتصفح وهتلاقي كل سطر ملوّن، والفروع الناقصة عليها علامة. وحط [[coverage/]] في [[.gitignore]] و [[globalIgnores]] بتاع ESLint.

---

## ٨. Vitest ولا [[node --test]]؟

| | [[node --test]] | Vitest |
|---|---|---|
| التسطيب | مدمج في Node، مفيش باكدج | [[npm i -D vitest]] |
| الشكل | [[test]] و [[assert.equal]] و [[assert.deepEqual]] | [[it]] و [[expect]] بشكل Jest |
| الـ mocks | [[mock.fn()]] من [[node:test]] | [[vi.fn()]] و [[vi.mock]] للـ modules |
| TS و JSX | Node 24 بيشغّل TS بسيط بس | بـ Vite، من غير إعداد |
| watch | [[node --test --watch]] | أذكى: بيعيد اللي اتأثر بس |
| coverage | [[--experimental-test-coverage]] | [[--coverage]] بتقرير HTML وحد أدنى |

مكتبة Node صغيرة من غير build: [[node --test]] كفاية (درس «node --test» في تاب Node). مشروع Vite أو React أو Vue أو TS: Vitest.

---

## الخلاصة

- [[describe]] و [[it]] و [[expect]]، واسم الاختبار جملة بتوصف السلوك.
- [[toBe]] للقيم البسيطة ونفس المرجع، و [[toEqual]] للمحتوى، و [[toStrictEqual]] لو [[undefined]] بيفرق، و [[toBeCloseTo]] للعشري.
- [[expect(() => fn()).toThrow(...)]] بدالة، و [[await expect(p).rejects...]] بـ [[await]].
- [[vi.fn()]] مكان أي حاجة خارجية، و [[toHaveBeenCalledWith]] و [[toHaveBeenCalledTimes]].
- [[vitest]] للـ watch و [[vitest run]] للـ CI، و [[--coverage]] مع [[thresholds]]، والـ Branches أصدق من الـ Lines.`,
          sol: R`اتجرّب على Vitest 5.0.5: الستة عدّوا في 243ms. وفي الـ watch، شيل [[Math.max]] خلّى اختبار واحد بس يقع ([[الخصم مبيخليش الإجمالي سالب]]) برسالة [[expected -15 to be +0]] و [[RERUN src/cart.js x1]]، ولما رجّعته الكل عدّى في الإعادة التانية.

والـ coverage قال [[19-21]] uncovered (جسم [[applyCoupon]]، محدش ناداها)، و Branches ٤٤٪ رغم Lines ٧٢٪: الفرع الناقص التاني هو [[amount === 0]] في [[checkout]] (سلة فاضية)، سطره «covered» بس الاتجاه بتاع [[true]] عمره ما اتجرّب. الاختبارات اللي بتكمّل لـ ١٠٠٪ (اتجرّبت):`,
          solCode: R`import { applyCoupon, checkout } from './cart.js';

it('السلة الفاضية متدفعش', async () => {
  const pay = vi.fn();
  await expect(checkout({ items: [] }, pay)).resolves.toEqual({ ok: false, reason: 'empty' });
  expect(pay).not.toHaveBeenCalled();
});

describe('applyCoupon', () => {
  it.each([
    ['SAVE10', 10],
    ['HALF', 50],
    ['save10', 0],
    ['', 0],
  ])('%s ← %i', (code, expected) => {
    expect(applyCoupon(code)).toBe(expected);
  });
});
// npx vitest run --coverage ← Statements 100% و Branches 100% و Functions 100% و Lines 100%`,
        },
      ],
    }
]);
