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

TAB("ts", {
  label: "TypeScript",
  prompt: "$ ",
  lab: R`npm i -D typescript tsx
npx tsc --init
npx tsx index.ts`,
  labText: "أسرع تجربة: TypeScript Playground على typescriptlang.org/play، أو مشروع صغير بـ tsx يشغّل ملفات .ts على طول.",
  levels: {"1":["الأساس","تكتب أنواع للمتغيرات والدوال والـ objects"],"2":["الأنواع بجد","unions و narrowing و generics و utility types"],"3":["في المشاريع","tsconfig، و Zod، والأنواع في React و Express و Prisma، وأسئلة الانترفيو"]},
  categories: [
    {
      t: "TypeScript بيعمل إيه",
      l: 1,
      n: "أنواع بتتفحص وانت بتكتب، وبتتمسح قبل ما الكود يشتغل",
      items: [
        {
          cmd: "مقدمة TypeScript والفرق عن JS",
          title: "TypeScript يعني إيه، وبيضيف إيه على JavaScript؟",
          desc: R`[[TypeScript]] لغة من Microsoft، وهي JavaScript وفوقها أنواع (types). أي كود JavaScript سليم هو كود TypeScript سليم، و TS بيزوّد إنك تقدر تكتب نوع كل متغير وكل parameter، وأداة بتفحص الأنواع دي قبل ما الكود يشتغل.

الفرق في مثال واحد:
• في JavaScript: [[let age = 25;]] وبعدين [[age = "hello";]] عادي جدًا، واللغة مش هتعترض. ولو دالة مستنية رقم وجالها نص، هتعرف وقت التشغيل لما حاجة تبوظ، أو متعرفش خالص.
• في TypeScript: [[let age: number = 25;]] وبعدين [[age = "hello";]] بتطلّع خط أحمر في VS Code ورسالة error قبل ما تشغّل حاجة.

الرموز الجديدة:
• [[:]] بعد اسم المتغير أو الـ parameter وبعدها النوع: [[name: string]]. اسمها type annotation.
• [[): string]] بعد قوسين الدالة: نوع القيمة اللي الدالة بترجّعها.
• الأنواع الأساسية: [[string]] نص، و [[number]] رقم، و [[boolean]] [[true]] أو [[false]].

اللي بتكسبه:
• الأخطاء بتبان وانت بتكتب، مش بعد ما تنزل الموقع.
• الـ autocomplete: لما تكتب [[.]] بعد متغير، VS Code بيعرضلك الحاجات اللي موجودة فعلًا عليه.
• لو غيّرت اسم خاصية أو شكل داتا، TS بيوريك كل مكان محتاج يتعدّل.

حاجة مهمة من أول يوم: الأنواع بتتمسح قبل التشغيل، فـ TS مش بيفحص داتا جاية من API أو فورم وقت التشغيل. ده موضوع الدرس الجاي («type erasure»)، وبعده «tsc و tsx» (تشغّل ملف .ts إزاي)، والأنواع نفسها بالتفصيل في درس «type annotations».`,
          example: R`// النوع بعد اسم المتغير بـ :
let developerName: string = "Sara";
let experienceYears: number = 3;
let isFullStack: boolean = true;

// نوع كل parameter، ونوع اللي الدالة بترجّعه بعد القوسين
function getProfile(name: string, years: number): string {
  return name + " has " + years + " years of experience";
}

const profileText = getProfile(developerName, experienceYears);
console.log(profileText);
console.log("Full stack:", isFullStack);`,
          try: R`افتح [[typescriptlang.org/play]]، وامسح اللي فيه والصق المثال، واضغط Run وشوف الـ Logs. بعدين وقّف الماوس على [[profileText]] وشوف النوع اللي TS عرفه لوحده. وجرّب غلطتين: غيّر النداء لـ [[getProfile(developerName, "three")]]، وضيف سطر [[experienceYears = "three";]]. واقرا الرسالة اللي بتظهر لما توقف على الخط الأحمر. آخر حاجة افتح تاب [[.JS]] على اليمين.`,
          flag: "script",
          deep: {
            why: R`في مشروع فيه مئات الملفات وكذا حد شغال، محدش فاكر كل دالة مستنية إيه. الأنواع بتبقى توثيق مكتوب جوه الكود نفسه، والـ compiler بيتأكد إن الكل ماشي عليه. عشان كده أغلب مشاريع React و Next.js و Node الجديدة بتبدأ بـ TypeScript.`,
            how: R`الـ compiler ([[tsc]]) بيقرا الكود ويتأكد إن كل قيمة ماشية مع النوع المكتوب، وبعدين بيمسح كل الأنواع ويطلّع JavaScript عادي، لأن المتصفح و Node بيشغّلوا JavaScript بس.

ومش لازم تكتب النوع في كل حتة: [[const profileText = getProfile(...)]] مفيهاش نوع، و TS عرف إنها [[string]] من نوع اللي الدالة بترجّعه (اسمها type inference، ليها درس). المكان اللي لازم تكتب فيه النوع غالبًا هو parameters الدوال.`,
            when: R`أي مشروع هيكبر أو هيشتغل عليه أكتر من حد. وحتى في مشروع صغير، TS بيمسك غلطات الكتابة في أسامي الخصائص اللي بتضيّع وقت كتير.`,
            mistakes: R`تكتب [[any]] كل ما يطلعلك error: [[any]] بيقفل الفحص على المتغير ده، فرجعت JavaScript من غير ما تاخد بالك. وتفتكر إن TS بيفحص داتا جاية من API وقت التشغيل، وهو مش بيعمل كده (درس «type erasure»). وتكتب [[String]] و [[Number]] بحرف كبير بدل [[string]] و [[number]]: الصح الصغيرين.`
          },
          lines: [
            R`متغير نوعه [[string]].`,
            R`متغير نوعه [[number]].`,
            R`متغير نوعه [[boolean]].`,
            R`دالة: [[name]] لازم string و [[years]] لازم number، و [[): string]] معناها إنها بترجّع string.`,
            R`[[+]] بين النصوص والرقم بيلزقهم في نص واحد.`,
            R`آخر الدالة.`,
            R`نداء بالأنواع الصح. [[profileText]] من غير نوع مكتوب، و TS عارف إنه string.`,
            R`اطبع الجملة.`,
            R`اطبع الـ boolean.`
          ],
          sol: R`الـ Logs:
[[Sara has 3 years of experience]]
[[Full stack: true]]

الماوس على [[profileText]] بيوريك [[const profileText: string]].

[[getProfile(developerName, "three")]]: خط أحمر تحت [["three"]] والرسالة:
[[Argument of type 'string' is not assignable to parameter of type 'number'.]]
و [[experienceYears = "three";]]: خط أحمر والرسالة:
[[Type 'string' is not assignable to type 'number'.]]

وتاب [[.JS]] فيه نفس الكود بالظبط من غير [[: string]] و [[: number]] و [[: boolean]]. لاحظ إن الـ Playground بيطلّع JS ويشغّله حتى والـ errors موجودة: الـ errors تحذير ليك، ومش بتمنع الـ JavaScript إنه يتعمل إلا لو قفلت ده في الإعدادات.`
        },
        {
          cmd: "type erasure",
          title: "الأنواع بتروح فين لما الكود يشتغل؟",
          desc: R`TypeScript هو JavaScript وفوقه أنواع. الأنواع بتتفحص وانت بتكتب ووقت الـ build، وبعدين بتتمسح خالص، والمتصفح أو Node بيشغّل JS عادي مفيهوش ولا نوع.

يعني TypeScript بيمسك الغلط قبل ما الكود يشتغل: بتبعت string لدالة مستنية number، أو بتقرا خاصية مش موجودة. بس وقت التشغيل مفيش أي حماية: لو داتا جاية من API أو فورم بشكل غلط، TS مش هيشوفها.

ودي أهم جملة في التاب كله: النوع وعد انت بتديه للـ compiler، مش فحص بيحصل وقت التشغيل.`,
          example: R`function total(price: number, qty: number): number {
  return price * qty;
}
total(50, 2);
total("50", 2); // خطأ: Argument of type 'string' is not assignable to parameter of type 'number'
// الناتج بعد tsc، JS عادي والأنواع اتمسحت:
// function total(price, qty) {
//   return price * qty;
// }`,
          try: R`افتح typescriptlang.org/play واكتب الدالة دي، وبص على تاب «.JS» على اليمين: هتلاقي الأنواع كلها اتشالت. وبعدين غيّر النداء الغلط لـ [[total(Number("50"), 2)]] وشوف الخطأ اختفى.`,
          flag: "script",
          deep: {
            why: R`JavaScript مبيقولكش إنك غلطت غير لما الكود يشتغل ويقع، وساعات مبيقعش أصلًا: [["5" * 2]] بيطلع 10، و [["5" + 2]] بيطلع "52" من غير أي خطأ. وفي مشروع كبير، تغيير اسم خاصية في مكان واحد بيكسر عشر أماكن مش هتعرفهم غير من المستخدمين. TypeScript بيحوّل الغلطات دي لخط أحمر في المحرر.`,
            how: R`فيه مرحلتين منفصلين تمامًا: فحص الأنواع (type checking)، وإنتاج JS (emit). الـ compiler بيقرا الكود، ويبني صورة لكل قيمة ونوعها، ويطلّع الأخطاء. وبعدين بيمسح كل حاجة ليها علاقة بالأنواع ويطلّع JS، وده بيحصل حتى لو فيه أخطاء، إلا لو قلتله لأ.

عشان كده اسمها type erasure: [[: number]] و [[interface]] و [[type]] و [[<T>]] كلها بتختفي. مفيش حاجة اسمها «نوع» موجودة وقت التشغيل، فمينفعش تسأل الكود وهو شغال «القيمة دي User؟» وتستنى الأنواع تجاوب. لو عايز تفحص وقت التشغيل لازم تكتب كود JS حقيقي ([[typeof]] أو [[in]] أو مكتبة زي Zod في المستوى ٣).

والأدوات السريعة (Vite و esbuild و tsx و Node نفسه) بتعمل المرحلة التانية بس: بتمسح الأنواع وتشغّل على طول من غير ما تفحص. الفحص بيعمله [[tsc]] لوحده.

فيه كام حاجة في TS بتطلّع كود حقيقي مش أنواع بس، أشهرها [[enum]]، ودي من أسباب إن ناس كتير بتتجنبه (آخر درس في المستوى ده).`,
            when: "أي مشروع هيكبر أو هيشتغل عليه أكتر من شخص، أو فيه API بين front و back. سكربت صغير بتكتبه مرة وترميه ممكن يفضل JS.",
            mistakes: R`تفتكر إن [[const user: User = await res.json()]] معناها إن الداتا اتفحصت. لأ، انت بس قلت للـ compiler «صدّقني»، والداتا ممكن تيجي بأي شكل. وتفتكر إن TS بيبطّأ التطبيق: الأنواع مش موجودة وقت التشغيل أصلًا، فتأثيرها على السرعة صفر. وفي الانترفيو: «TypeScript بيعمل إيه وقت التشغيل؟» الإجابة: ولا حاجة.`
          },
          lines: [
            R`دالة بتاخد رقمين وبترجع رقم. [[: number]] بعد الاسم هو النوع.`,
            "الجسم نفسه JS عادي.",
            "قفلة الدالة.",
            "نداء سليم: الأنواع ماشية.",
            R`نداء غلط: TS بيعلّم عليه في المحرر وفي [[tsc]] قبل ما تشغّل حاجة.`
          ],
          sol: R`في تاب «.JS» هتلاقي الدالة بقت [[function total(price, qty) {]] من غير [[: number]] ولا نوع الرجوع، والنداءين زي ما هما. وفي تاب Errors هتلاقي الخطأ على [[total("50", 2)]]: Argument of type 'string' is not assignable to parameter of type 'number' (TS2345).

بعد ما تكتب [[total(Number("50"), 2)]] الخطأ بيختفي، لأن [[Number()]] بترجّع number. وبص على الـ JS تاني: السطر اتنقل زي ما هو، يعني التحويل ده كود حقيقي بيشتغل، مش نوع. وده الفرق: الأنواع اتمسحت، والكود اللي انت كتبته بإيدك هو اللي فضل.

ملحوظة مهمة: حتى وفيه خطأ، الـ Playground (و [[tsc]] العادي) بيطلّع JS برضه، وفيه [[total("50", 2)]] اللي هترجع 100 عادي لأن JS بيحوّل. الخطأ مش بيمنع التشغيل لوحده، ولو عايز ده في مشروعك استخدم [[noEmitOnError]] أو افحص بـ [[tsc --noEmit]] في الـ CI.`
        },
        {
          cmd: "tsc و tsx",
          title: "تشغّل ملف .ts إزاي، وتفحص أنواعه إزاي",
          desc: R`[[tsc]] هو الـ compiler الرسمي: بيفحص الأنواع وبيطلّع JS. [[tsx]] بيشغّل ملف .ts على طول من غير ما يفحص. و Node 24 نفسه بيشغّل .ts مباشرة لو الكود فيه أنواع بس (type stripping).

القاعدة: شغّل بـ tsx أو node وانت بتطوّر، وافحص بـ [[tsc --noEmit]] في سكربت لوحده وفي CI. تفاصيل npx و scripts في تاب «Node و npm»، و [[tsc --noEmit]] بالتفصيل في تاب «فحص الكود».`,
          example: R`npm i -D typescript tsx @types/node
npx tsc --init
npx tsx src/index.ts
npx tsx watch src/index.ts
node src/index.ts
npx tsc --noEmit
npx tsc`,
          try: R`اعمل فولدر، وسطّب واعمل tsconfig زي أول سطرين ([[npm i -D ...]] و [[npx tsc --init]])، واكتب [[src/index.ts]] فيه [[const n: number = "5"; console.log(n);]]. شغّله بـ [[npx tsx src/index.ts]]: هيشتغل ويطبع 5 عادي. وبعدين [[npx tsc --noEmit]]: هيمسك الخطأ.`,
          deep: {
            why: "محتاج حاجتين مختلفتين: تشغّل الكود بسرعة وانت بتجرّب، وتتأكد إن الأنواع سليمة قبل ما ترفع. أداة واحدة بتعمل الاتنين كل مرة هتبقى بطيئة، عشان كده الشغل اتقسم.",
            how: R`[[tsc]] بيقرا [[tsconfig.json]]، ويفحص كل الملفات اللي في [[include]]، ويطلّع JS. من TypeScript 7 (يوليو ٢٠٢٦) الـ compiler نفسه اتكتب من جديد بـ Go، فبقى أسرع حوالي ١٠ مرات، والأمر زي ما هو [[tsc]]. بعض الأدوات اللي بتستخدم TS من جوه (زي typescript-eslint) لسه محتاجة الواجهة البرمجية بتاعة TS 6، فممكن تلاقي مشاريع لسه على 6 مؤقتًا.

[[tsx]] بيستخدم esbuild: بيمسح الأنواع ملف ملف في الذاكرة ويسلّم الـ JS لـ Node. مبيبصش على الأنواع خالص، فأسرع بكتير، وبيفهم [[enum]] و [[paths]] من tsconfig.

[[node file.ts]] في Node 24 (type stripping) بيمسح الأنواع ويشغّل. مبيقراش tsconfig، ومبيفهمش الحاجات اللي بتطلّع كود زي [[enum]]، ولازم تكتب الامتداد في الـ import ([[./db.ts]]). ولو هتعتمد عليه، شغّل [[erasableSyntaxOnly]] في tsconfig عشان tsc يمنعك من الحاجات دي وانت بتكتب.

وفي TS 6 و 7 بقى [[types]] افتراضيًا فاضي، فلو كتبت [[process.env]] هيقولك Cannot find name 'process': ضيف [["types": ["node"]]] في tsconfig.`,
            when: "tsx للتطوير والسكربتات. [[tsc --noEmit]] في [[npm run typecheck]] وفي CI. و [[tsc]] بـ outDir لما تبني سيرفر Node للإنتاج، أو bundler زي Vite و Next بيبني هو.",
            mistakes: R`تعتمد على tsx أو Vite وتفتكر إن الأنواع اتفحصت. وتشغّل .ts بـ Node أقدم من 22.18 فيطلع [[ERR_UNKNOWN_FILE_EXTENSION]]. و [[tsc --init]] الجديد بيحط [[verbatimModuleSyntax]] مع [["module": "nodenext"]]، فلو package.json مفيهوش [["type": "module"]] هتلاقي خطأ على كل [[import]] لأن الملفات اتعاملت كـ CommonJS: ضيفه.`
          },
          lines: [
            "سطّب الـ compiler و tsx وأنواع Node كـ devDependencies.",
            R`اعمل [[tsconfig.json]] بإعدادات حديثة ([[strict]] شغال).`,
            "شغّل الملف على طول، من غير فحص أنواع.",
            "نفسه، وبيعيد التشغيل مع كل حفظ.",
            "Node 24 بيشغّل .ts مباشرة لو الكود أنواع بس (مفيش enum)، ومن غير فحص برضه.",
            "افحص أنواع المشروع كله من غير ما تطلّع ملفات.",
            R`افحص وطلّع JS. [[tsc --init]] بيسيب [[outDir]] متعلّق عليه، فشيل التعليق عن [["outDir": "./dist"]] (و [[rootDir]]) الأول، وبعدها الناتج يطلع في dist وتشغّله في الإنتاج بـ [[node dist/index.js]]. من غيره الـ .js بيتحط جنب الـ .ts.`
          ],
          sol: R`[[npx tsx src/index.ts]] بيطبع [[5]] ومن غير أي تحذير، لأن tsx بيشيل الأنواع ويشغّل من غير ما يفحص. و [[npx tsc --noEmit]] بيطلّع:

[[src/index.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.]] ومعاه exit code 1 (اتأكد بـ [[echo $?]])، وده اللي بيخلي الـ CI يقع.

ونفس الكلام لو جربت [[node src/index.ts]] على Node حديث: هيطبع 5، لأنه برضه بيشيل الأنواع بس. لو [[tsc --noEmit]] مطلّعش حاجة، اتأكد إن الملف جوه [[src]] وإن [[tsconfig.json]] موجود في نفس الفولدر اللي بتشغّل منه.`
        }
      ]
    },
    {
      t: "أنواع المتغيرات والدوال",
      l: 1,
      n: "تكتب النوع في الحدود زي باراميترات الدوال، وتسيب TS يستنتج الباقي",
      items: [
        {
          cmd: "type annotations",
          title: "تكتب نوع المتغير والباراميتر واللي الدالة بترجعه",
          desc: R`النوع بيتكتب بعد الاسم بـ [[:]]: [[let age: number]]، وباراميتر الدالة [[(name: string)]]، واللي الدالة بترجعه بعد القوسين [[): string]]. الأنواع الأساسية: [[string]] و [[number]] و [[boolean]] و [[null]] و [[undefined]] و [[bigint]] و [[symbol]].

أهم مكان تكتب فيه النوع هو باراميترات الدوال، لأن TS مش هيعرف يستنتجها لوحده. الباقي غالبًا بيتستنتج (الدرس الجاي).`,
          example: R`let username: string = "sara";
let age: number = 27;
let isAdmin: boolean = false;
function greet(name: string, excited: boolean): string {
  return excited ? $__btHi $__{name}!$__bt : $__btHi $__{name}$__bt;
}
greet("sara", true);
greet("sara"); // خطأ: Expected 2 arguments, but got 1
age = "28"; // خطأ: Type 'string' is not assignable to type 'number'`,
          try: R`غيّر نوع الرجوع لـ [[: number]] وشوف الخطأ بيطلع فين بالظبط (على الـ [[return]] مش على النداء). وبعدين امسح [[: string]] من [[name]] وشوف [[strict]] بيقولك إيه.`,
          flag: "script",
          deep: {
            why: "الأنواع على الدالة هي العقد بتاعها: أي حد بيناديها يعرف يبعت إيه ويستنى إيه، والمحرر يكمّلك صح. من غيرها، الغلط بيظهر جوه الدالة أو بعدها بعشر خطوات، مش في مكان الغلطة.",
            how: R`الـ annotation بتقول للـ compiler «المتغير ده مسموحله بالنوع ده بس». أي تعيين بعد كده بيتقارن بيه، ولو مش متوافق يطلع خطأ، غالبًا TS2322 (Type X is not assignable to type Y) أو TS2345 للـ arguments.

الأنواع الأساسية بحروف صغيرة: [[string]] مش [[String]]. الكبيرة دي wrapper objects في JS، ومتستخدمهاش كأنواع.

لو باراميتر ملوش نوع، TS بيعتبره [[any]] (يعني مفيش فحص). مع [[strict]] (وده الافتراضي في TS 6 و 7) ده بيبقى خطأ اسمه [[noImplicitAny]]: «Parameter 'name' implicitly has an 'any' type». وده كويس، لأنه بيجبرك تكتب نوع لكل باراميتر.

ونوع الرجوع اختياري، TS بيستنتجه من الـ return. بس لما تكتبه، الخطأ بيطلع جوه الدالة لو رجّعت حاجة غلط، بدل ما يطلع عند كل واحد بيستخدم الناتج.`,
            when: "دايمًا على باراميترات الدوال. نوع الرجوع على الدوال اللي بتتصدّر (export) أو اللي منطقها معقد. المتغيرات المحلية غالبًا لأ.",
            mistakes: R`تكتب [[String]] و [[Number]] بحرف كبير. وتكتب نوع لكل متغير حتى [[const x: number = 5]]: زيادة ملهاش لازمة. وتحط [[: any]] عشان الخط الأحمر يختفي، فكأنك قفلت TS في الحتة دي.`
          },
          lines: [
            R`متغير نوعه string: [[:]] وبعدها النوع.`,
            R`رقم. في JS مفيش int و float: كله [[number]].`,
            "true أو false بس.",
            R`باراميترين بنوعهم، و [[: string]] بعد القوسين نوع اللي الدالة بترجعه.`,
            "template string في الحالتين، فالناتج string زي ما وعدنا.",
            "قفلة الدالة.",
            "نداء سليم.",
            R`ناقص باراميتر: خطأ. في JS كان هيبقى [[undefined]] بهدوء.`,
            "المتغير اتعرّف number، فمينفعش يبقى string بعد كده."
          ],
          sol: R`لما تخلي نوع الرجوع [[: number]]، الخطأ بيطلع جوه الدالة على سطر [[return]] (مرتين، مرة لكل فرع في الـ ternary): Type 'string' is not assignable to type 'number'. النداء [[greet("sara", true)]] ملوش ذنب، والمشكلة إن اللي بتقوله الدالة عن نفسها مش ماشي مع اللي بترجّعه فعلًا. وده فايدة إنك تكتب نوع الرجوع: الخطأ بيطلع في مكانه بدل ما يطلع بعيد عند اللي بيستخدم الدالة.

ولما تمسح [[: string]] من [[name]]: Parameter 'name' implicitly has an 'any' type (TS7006). ده [[noImplicitAny]] اللي جوه [[strict]]. لو مطلعش الخطأ ده يبقى [[strict]] مقفول في الـ tsconfig أو في إعدادات الـ Playground.`
        },
        {
          cmd: "type inference",
          title: "TS بيعرف النوع لوحده إمتى، وإمتى لازم تكتبه",
          desc: R`لو المتغير ليه قيمة أولية، TS بيستنتج النوع منها: [[let count = 0]] بقى [[number]] من غير ما تكتب. ونفس الكلام لنوع رجوع الدالة، والـ arrays، والـ callbacks جوه [[map]] و [[filter]].

الفرق المهم: [[let]] بيستنتج النوع العام ([[string]])، و [[const]] بيستنتج القيمة نفسها ([["GET"]]) لأنها مش هتتغير.`,
          example: R`let count = 0;                           // number
const method = "GET";                    // "GET" بالظبط، مش أي string
let status = "idle";                     // string
const ids = [1, 2, 3];                   // number[]
const doubled = ids.map((id) => id * 2); // id عارف إنه number
function toUpper(s: string) {            // نوع الرجوع اتستنتج: string
  return s.toUpperCase();
}
count = "1"; // خطأ: النوع اتحدد number من أول قيمة`,
          try: R`في VS Code حط الماوس على كل متغير وشوف النوع اللي TS استنتجه. وبعدين غيّر [[const method]] لـ [[let method]] وشوف النوع اتغير لإيه.`,
          flag: "script",
          deep: {
            why: "لو كتبت نوع لكل حاجة الكود هيبقى تقيل ومكرر، ولو غيّرت حاجة هتغيّرها في مكانين. الاستنتاج بيخليك تكتب الأنواع في الحدود بس (الباراميترات والـ API)، والباقي بيمشي لوحده وبرضه متفحوص.",
            how: R`TS بيستنتج بطريقتين. الأولى من القيمة: [[let x = 5]] يبقى number. والتانية من السياق (contextual typing): الـ callback اللي بتبعته لـ [[ids.map]] بياخد نوع الباراميتر من نوع الـ array، و [[onClick={(e) => ...}]] في React بياخد نوع الـ event من الـ prop.

مع [[const]] و primitive، النوع بيبقى literal ([["GET"]])، لأن القيمة مستحيل تتغير. مع [[let]] بيتوسّع (widening) للنوع العام. وده بيفرق لما تبعت المتغير لدالة مستنية [["GET" | "POST"]]: الـ const يعدّي، والـ let لأ.

الـ object حتى لو [[const]] خصايصه بتتوسّع، لأن [[obj.method = "PUT"]] مسموح. عشان تثبّتها محتاج [[as const]] (المستوى ٢).

ونوع رجوع الدالة بيتستنتج من كل الـ returns مع بعض: لو واحد بيرجع string والتاني undefined، النوع [[string | undefined]].`,
            when: R`سيب الاستنتاج في المتغيرات المحلية والـ callbacks. اكتب النوع صريح في الباراميترات، وفي نوع رجوع الدوال المصدّرة، ولما تبدأ بقيمة فاضية ([[useState<User | null>(null)]] أو [[const list: string[] = []]]).`,
            mistakes: R`[[const items = []]] وتملاها بعدين: نوعها بيبقى [[any[]]] وبيتغير مع كل push، وساعات يطلع خطأ implicitly any. اكتب النوع: [[const items: string[] = []]]. و [[let status = "idle"]] وبعدين تبعته لدالة مستنية [["idle" | "loading"]] فيطلع خطأ: اكتب النوع أو استخدم const. وتكتب [[useState<number>(0)]]: زيادة، الـ 0 كفاية.`
          },
          lines: [
            R`أول قيمة رقم، يبقى [[count]] نوعه [[number]] للأبد.`,
            R`[[const]] مش هيتغير، فالنوع هو القيمة نفسها (literal type).`,
            R`[[let]] ممكن يتغير، فالنوع اتوسّع لـ [[string]].`,
            "array أرقام.",
            R`الـ callback أخد نوع [[id]] من الـ array من غير ما تكتبه (contextual typing).`,
            "الباراميتر لازم نوع، بس نوع الرجوع اتستنتج من الـ return.",
            R`[[toUpperCase]] بترجع string، فالدالة بترجع string.`,
            "قفلة الدالة.",
            "مينفعش: النوع اتحدد من أول قيمة."
          ],
          sol: R`هتلاقي: [[count]] نوعه [[number]]، و [[method]] نوعه [["GET"]] بالظبط، و [[status]] نوعه [[string]]، و [[ids]] نوعه [[number[]]]، و [[doubled]] برضه [[number[]]]، و [[toUpper]] بتظهر [[(s: string) => string]].

بعد ما تغيّر [[const method]] لـ [[let method]] النوع بيبقى [[string]]. السبب: [[let]] ممكن تتغير بعدين، فـ TS بيوسّع القيمة للنوع العام، أما [[const]] مش هتتغير، فبيسيبها literal. ولو لقيت [[method]] لسه [["GET"]]، اتأكد إنك مش بتبص على نسخة قديمة من الملف قبل الحفظ.`
        },
        {
          cmd: "function types",
          title: "نوع الدالة نفسها: callback وباراميتر اختياري ودالة مبترجعش حاجة",
          desc: R`نوع الدالة بيتكتب زي السهم: [[(a: number, b: number) => number]]. ده بتستخدمه لما دالة بتاخد callback، أو prop في React زي [[onSelect]].

الباراميتر الاختياري بـ [[?]]، والقيمة الافتراضية [[= 20]] بتخليه اختياري ونوعه متستنتج، والـ rest [[...nums: number[]]]. والدالة اللي مبترجعش حاجة نوع رجوعها [[void]].`,
          example: R`type Handler = (id: string) => void;
function onEach(ids: string[], cb: Handler): void {
  ids.forEach(cb);
}
function paginate(page: number, size = 20, sort?: "asc" | "desc") {
  return { skip: (page - 1) * size, take: size, sort: sort ?? "desc" };
}
function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}
onEach(["a", "b"], (id) => console.log(id));
paginate(2);
sum(1, 2, 3); // 6`,
          try: R`جرّب [[onEach(["a"], (id: number) => {})]] واقرا الخطأ. وبعدين اعمل [[type Comparator]] لدالة بتقارن اتنين User وترجع number، واستخدمه مع [[sort]].`,
          flag: "script",
          deep: {
            why: "في React و Express وأي كود حديث، الدوال بتتبعت كقيم طول الوقت: callbacks و event handlers و middleware. لو نوع الدالة مش مكتوب، أي حد يبعت دالة بباراميترات غلط ومحدش يعرف.",
            how: R`TS بيقارن الدوال بالباراميترات ونوع الرجوع. الدالة اللي بتاخد باراميترات أقل من المطلوب مقبولة، لأن JS بيتجاهل الزيادة. عشان كده [[ids.forEach(cb)]] شغال مع إن forEach بتبعت ٣ حاجات.

[[void]] كنوع رجوع معناه «متعتمدش على اللي راجع». فلو نوع الـ callback [[() => void]] وبعت دالة بترجع number، مقبول، بس الناتج مش هيتستخدم. وده عشان [[arr.forEach((x) => list.push(x))]] يشتغل مع إن push بترجع رقم.

الباراميتر الاختياري [[sort?: T]] نوعه جوه الدالة [[T | undefined]]، فلازم تتعامل مع الـ undefined. والقيمة الافتراضية أنضف غالبًا: [[size = 20]] جوه الدالة number بس.

وفيه شكلين لكتابة نوع الدالة: [[type Fn = (x: number) => string]]، أو جوه object كـ method [[{ format(x: number): string }]]. الاتنين زي بعض في الاستخدام العادي.

و overloads (كذا توقيع لنفس الدالة) موجودة، بس غالبًا union أو generic أبسط منها.`,
            when: R`props في React زي [[onChange]] و [[onSubmit]]، و middleware في Express، وأي دالة بتاخد دالة. واعمل [[type]] باسم لما نوع الدالة يتكرر.`,
            mistakes: R`تكتب نوع الـ callback [[Function]]: ده زي any للدوال، مفيش فحص للباراميترات. اكتب الشكل الحقيقي. وباراميتر اختياري قبل باراميتر إجباري: ممنوع، الاختياري دايمًا في الآخر. وتنسى إن [[sort?]] جوه الدالة ممكن يبقى undefined وتنادي عليه method.`
          },
          lines: [
            "نوع لدالة: بتاخد string ومبترجعش حاجة مهمة.",
            R`باراميتر نوعه دالة (callback)، و [[: void]] يعني مبترجعش قيمة.`,
            R`[[forEach]] بتبعت ٣ باراميترات (القيمة والـ index والـ array)، و [[cb]] بياخد واحد بس، وده مسموح.`,
            "قفلة.",
            R`[[size]] ليه قيمة افتراضية فبقى اختياري ونوعه number، و [[sort?]] اختياري ونوعه union.`,
            R`[[sort]] ممكن يبقى undefined، فبنحط قيمة بديلة بـ [[??]].`,
            "قفلة.",
            "rest: أي عدد أرقام بيتجمعوا في array.",
            "جمعهم.",
            "قفلة.",
            R`الـ callback أخد نوع [[id]] من [[Handler]] لوحده.`,
            "الباقي اختياري.",
            "أي عدد باراميترات."
          ],
          sol: R`[[onEach(["a"], (id: number) => {})]] بيطلّع TS2345: Argument of type '(id: number) => void' is not assignable to parameter of type 'Handler'، وتحتها Types of parameters 'id' and 'id' are incompatible. Type 'string' is not assignable to type 'number'. يعني الدالة بتاعتك مستنية number، و [[onEach]] هتبعتلها string.

والـ Comparator زي الكود تحت. لاحظ إن [[a]] و [[b]] مكتوبلهمش نوع لأنهم بياخدوه من [[Comparator]]. الناتج: [[[ 'Sara', 'Omar' ]]] بالسن، و [[[ 'Omar', 'Sara' ]]] بالاسم. واستخدمنا [[[...users].sort]] عشان [[sort]] بتغيّر الـ array الأصلي.`,
          solCode: R`type User = { id: number; name: string; age: number };
type Comparator = (a: User, b: User) => number;
const byAge: Comparator = (a, b) => a.age - b.age;
const byName: Comparator = (a, b) => a.name.localeCompare(b.name);
const users: User[] = [
  { id: 1, name: "Sara", age: 22 },
  { id: 2, name: "Omar", age: 27 },
];
console.log([...users].sort(byAge).map((u) => u.name));  // [ 'Sara', 'Omar' ]
console.log([...users].sort(byName).map((u) => u.name)); // [ 'Omar', 'Sara' ]`
        },
        {
          cmd: "arrays و tuples",
          title: "ليستة من نوع واحد، وليستة طولها وترتيبها ثابت",
          desc: R`[[string[]]] (أو [[Array<string>]]) ليستة strings بأي طول. الـ tuple زي [[[number, number]]] ليستة طولها ثابت وكل مكان فيها ليه نوع، زي اللي [[useState]] بيرجعه.

و [[readonly string[]]] ليستة متتعدلش: مفيش push ولا sort عليها.`,
          example: R`const tags: string[] = ["ts", "react"];
const scores: Array<number> = [90, 75];
const point: [number, number] = [30.04, 31.23];
const entry: [name: string, age: number] = ["sara", 27];
const [name, age] = entry;
const roles: readonly string[] = ["admin", "user"];
tags.push(5); // خطأ: number مش string
roles.push("owner"); // خطأ: push مش موجودة على readonly
const third = point[2]; // خطأ: الـ tuple طوله 2 بس`,
          try: R`اكتب دالة [[useToggle]] صغيرة بترجع [[[boolean, () => void]]]، وبعدين شيل نوع الرجوع وخليها ترجع [[[on, toggle]]] وشوف TS استنتج إيه (هتلاقيها array عادي مش tuple). وبعدين ضيف [[as const]] بعد الـ array.`,
          flag: "script",
          deep: {
            why: "أغلب الداتا ليستات: مستخدمين، ومنتجات، ورسايل. النوع بيضمن إن كل عنصر شكله صح، فلما تعمل [[map]] المحرر عارف كل عنصر فيه إيه. والـ tuple مفيد لما دالة ترجع كذا قيمة من غير ما تعمل object.",
            how: R`[[T[]]] و [[Array<T>]] نفس النوع بالظبط، الأول أقصر. مع union لازم أقواس: [[(string | number)[]]]، لأن [[string | number[]]] معناها string أو array أرقام.

الـ tuple في JS array عادي، الفرق في النوع بس: TS عارف الطول ونوع كل مكان. وده اللي بيخلي [[const [count, setCount] = useState(0)]] يعرف إن الأول number والتاني دالة. لو الـ hook بتاعك رجّع [[[value, setValue]]] من غير نوع ولا [[as const]]، TS هيستنتج array عادي نوع عناصره union، وتخسر الترتيب.

[[readonly string[]]] (أو [[ReadonlyArray<string>]]) بيشيل [[push]] و [[pop]] و [[sort]] و [[splice]] من النوع. وده مفيد لباراميتر دالة: بيقول إنك مش هتعدّل الليستة اللي اتبعتتلك. array عادي ينفع يتبعت مكان readonly، والعكس لأ.

وافتكر: [[arr[5]]] على [[string[]]] نوعها string حتى لو الـ array فاضي. الحماية دي محتاجة [[noUncheckedIndexedAccess]] (المستوى ٣).`,
            when: "[[T[]]] لأي ليستة. tuple لما دالة ترجع ٢ أو ٣ قيم مرتبطين (زي hooks). و readonly لباراميترات الدوال والثوابت.",
            mistakes: R`tuple طويل زي [[[string, number, boolean, string]]] محدش فاكر مكان إيه فيه: استخدم object بأسماء. و [[string | number[]]] وانت قصدك [[(string | number)[]]]. وتفتكر إن [[readonly]] بيمنع التعديل وقت التشغيل: ده نوع بس، و [[Object.freeze]] هو اللي بيمنع فعلًا.`
          },
          lines: [
            "ليستة strings، أي طول.",
            "نفس الحاجة بالشكل الـ generic. اختار شكل واحد في المشروع.",
            "tuple: عنصرين بالظبط، الاتنين أرقام (خط عرض وطول).",
            "tuple بأسماء للمواقع. الأسماء للقراية والمحرر بس.",
            R`destructuring: [[name]] بقى string و [[age]] number.`,
            "ليستة للقراية بس.",
            "النوع بيمنع حاجة غلط تدخل الليستة.",
            R`[[readonly]] شال الـ methods اللي بتعدّل.`,
            "TS عارف الطول، فالمكان التالت غلط."
          ],
          sol: R`مع [[[boolean, () => void]]] الاستخدام [[const [on, toggle] = useToggle()]] بيدي [[on: boolean]] و [[toggle: () => void]]. لما تشيل نوع الرجوع TS بيستنتج [[(boolean | (() => void))[]]]: array عادي، كل عنصر فيه ممكن يبقى أي واحد من الاتنين، فـ [[toggle()]] بتطلّع This expression is not callable. Not all constituents of type 'boolean | (() => void)' are callable.

ومع [[return [on, toggle] as const]] النوع بيبقى [[readonly [boolean, () => void]]]: tuple تاني، و [[toggle()]] شغالة. ده بالظبط سبب إن custom hooks اللي بترجّع array لازم يا تكتب نوع الرجوع يا [[as const]].`,
          solCode: R`function useToggle(initial = false) {
  let on = initial;
  const toggle = () => { on = !on; };
  return [on, toggle] as const; // readonly [boolean, () => void]
}
const [on, toggle] = useToggle();
toggle();`
        }
      ]
    },
    {
      t: "شكل الـ objects",
      l: 1,
      n: "توصف خصايص الـ object، وتقرر مين اختياري ومين ثابت، وتسمّي الشكل بـ type أو interface",
      items: [
        {
          cmd: "object types",
          title: "توصف شكل object: خصايصه وأنواعها",
          desc: R`نوع الـ object بيوصف خصايصه: [[{ id: number; name: string }]]. أي object فيه الخصايص دي بالأنواع دي يعدّي، حتى لو محدش قال إنه «من النوع ده». ده اسمه structural typing: TS بيبص على الشكل مش على الاسم.

والـ object literal اللي بتكتبه مباشرة في مكان النوع، لو فيه خاصية زيادة بيطلع خطأ (excess property check)، لأنها غالبًا غلطة في الاسم.`,
          example: R`type User = { id: number; name: string; email: string };
function sendWelcome(user: { name: string; email: string }) {
  return $__btWelcome $__{user.name} <$__{user.email}>$__bt;
}
const u: User = { id: 1, name: "Sara", email: "you@example.com" };
sendWelcome(u);
const admin = { name: "Omar", email: "admin@example.com", role: "admin" };
sendWelcome(admin);
sendWelcome({ name: "Ali", emial: "a@example.com" }); // خطأ: emial مش موجودة في النوع
const bad: User = { id: 2, name: "Mona" }; // خطأ: email ناقصة`,
          try: R`امسح [[email]] من [[admin]] وشوف الخطأ اتنقل لسطر [[sendWelcome(admin)]]. وبعدين جرّب [[sendWelcome({ ...admin, extra: 1 })]] وشوف الخاصية الزيادة اللي مكتوبة بإيدك بتتمسك ولا لأ.`,
          flag: "script",
          deep: {
            why: "في JS كل حاجة objects: الـ user، والـ request، والـ props، والـ config. لو شكلهم مش مكتوب، كل مرة تسأل «هو اسمها userId ولا user_id؟» وتفتح الكود أو تعمل console.log. النوع بيخلي المحرر يقولك.",
            how: R`TS بيقارن الأنواع بالشكل (structural typing): النوع A ينفع مكان B لو A فيه كل الخصايص اللي B محتاجها بأنواع متوافقة. الاسم مش مهم، ومفيش حاجة اسمها «implements» لازم تتكتب. وده عكس Java و C# (nominal typing)، اللي فيهم لازم تعلن إن الكلاس بيحقق الـ interface.

عشان كده object فيه خصايص زيادة يعدّي عادي: [[User]] ينفع يتبعت لدالة محتاجة [[{ name; email }]] بس. وده منطقي في JS، لأن الدالة مش هتقرا غير اللي محتاجاه.

الاستثناء: object literal جديد مكتوب مباشرة في مكان النوع (في تعيين أو argument). هنا TS بيفحص الخصايص الزيادة (excess property check)، لأن مفيش حد تاني هيستخدم الـ object ده، فالخاصية الزيادة غالبًا غلطة إملائية. أول ما تحطه في متغير الأول، الفحص ده مبيحصلش.

ونتيجة مهمة: [[Object.keys(user)]] نوعها [[string[]]] مش أسماء خصايص User، لأن الـ object ممكن يكون فيه خصايص زيادة TS مش شايفها.`,
            when: "أي object بيتنقل بين دوال: داتا من API، و props، وإعدادات. وسمّي النوع ([[type User]]) لما يتكرر في أكتر من مكان.",
            mistakes: R`تفتكر إن TS بيمنع الخصايص الزيادة دايمًا، فتبعت object فيه [[password]] لدالة بترجع الداتا للـ client وتفتكر إن النوع هيشيله. النوع مبيشيلش حاجة وقت التشغيل: لازم تختار الخصايص بإيدك (select في Prisma، أو destructuring). ودي ثغرة أمان حقيقية.`
          },
          lines: [
            R`نوع اسمه User بتلات خصايص. الفاصل [[;]] أو [[,]] الاتنين ينفعوا.`,
            R`الدالة محتاجة أي حاجة فيها [[name]] و [[email]] strings، مش لازم User.`,
            "TS عارف إن الاتنين strings.",
            "قفلة.",
            "object مطابق للنوع.",
            R`User فيه [[id]] زيادة، ومقبول: الشكل المطلوب موجود جواه.`,
            R`object فيه [[role]] زيادة، ومحدش قال إنه User.`,
            "مقبول برضه: structural typing.",
            "object مكتوب مباشرة وفيه اسم غلط: excess property check مسكه.",
            "خاصية إجبارية ناقصة."
          ],
          sol: R`بعد ما تمسح [[email]] من [[admin]]: الخطأ بيطلع على [[sendWelcome(admin)]]: Property 'email' is missing in type '{ name: string; role: string; }' but required in type '{ name: string; email: string; }' (TS2741). الـ object نفسه مفيهوش غلط، الغلط لما تبعته لحاجة محتاجة [[email]].

و [[sendWelcome({ ...admin, extra: 1 })]] (بعد ما ترجّع email) بيطلّع: Object literal may only specify known properties, and 'extra' does not exist (TS2353). يعني الخاصية الزيادة اللي كاتبها بإيدك في الـ literal بتتمسك، أما [[role]] اللي جاية من الـ spread بتعدّي عادي. ده excess property check: بيشتغل بس على الخصايص المكتوبة صريح في object literal، مش على متغير جاهز.`
        },
        {
          cmd: "? و readonly",
          title: "خاصية ممكن متكونش موجودة، وخاصية ممنوع تتغير",
          desc: R`[[?]] بعد اسم الخاصية معناها اختيارية: [[phone?: string]] نوعها [[string | undefined]]. و [[readonly]] قبلها معناها تتقري بس، ومينفعش تتعيّن بعد ما الـ object يتعمل.

وانت بتقرا خاصية اختيارية، [[?.]] بيقف لو القيمة undefined، و [[??]] بيحط قيمة بديلة.`,
          example: R`type Profile = {
  readonly id: string;
  name: string;
  phone?: string;
  address?: { city: string; street?: string };
};
const p: Profile = { id: "u1", name: "Sara" };
p.name = "Sara Ali";
p.id = "u2"; // خطأ: id للقراية بس
p.phone.trim(); // خطأ: 'p.phone' is possibly 'undefined'
const phone = p.phone?.trim() ?? "مفيش رقم";
const city = p.address?.city;`,
          try: R`اعمل [[const copy = { ...p, id: "x" }]] وشوف هل ده مسموح (أيوة: ده object جديد). وبعدين غيّر [[phone?: string]] لـ [[phone: string | undefined]] وشوف [[const p]] بقى بيطلب إيه.`,
          flag: "script",
          deep: {
            why: "الداتا الحقيقية ناقصة كتير: مستخدم من غير رقم، أو طلب من غير عنوان. من غير [[?]] يا إما هتكذب وتقول إنها موجودة دايمًا (والتطبيق يقع على undefined)، يا إما تكتب [[any]]. و [[readonly]] بتحمي الحاجات اللي منطقيًا متتغيرش زي الـ id.",
            how: R`[[phone?: string]] و [[phone: string | undefined]] قريبين بس مش زي بعض: الأولى الخاصية نفسها ممكن متتكتبش، والتانية لازم تتكتب حتى لو قيمتها undefined. و [[tsc --init]] في TS 5.9 وأحدث بيشغّل [[exactOptionalPropertyTypes]]، اللي بيفرّق بينهم أكتر: معاه، [[phone?: string]] مينفعش تحط فيها [[undefined]] صريحة.

[[readonly]] فحص وقت الكتابة بس، وسطحي: [[readonly address]] بيمنع [[p.address = ...]] بس مش [[p.address.city = ...]]. ووقت التشغيل مفيش أي حماية، لأن الأنواع بتتمسح.

[[?.]] (optional chaining) و [[??]] (nullish coalescing) دول JS حقيقي، مش TS. [[a ?? b]] بياخد b لو a هي [[null]] أو [[undefined]] بس، عكس [[||]] اللي بياخد b لو a هي [[0]] أو [[""]] كمان. عشان كده [[count || 10]] غلط لو 0 قيمة صح.`,
            when: "[[?]] للخصايص اللي فعلًا ممكن متجيش (حقول form اختيارية، أعمدة nullable). و [[readonly]] للـ ids والإعدادات والـ props، وفي React الـ props كلها منطقيًا readonly.",
            mistakes: R`تحط [[?]] على كل حاجة عشان الأخطاء تختفي، فتلاقي نفسك بتكتب [[?.]] في كل سطر وبتخبّي bugs. وتستخدم [[||]] مكان [[??]] مع أرقام: [[page || 1]] بتحوّل الصفحة 0 لـ 1. وتفتكر إن [[readonly]] بيمنع التعديل على الـ objects اللي جوه.`
          },
          lines: [
            "بداية النوع.",
            R`[[readonly]]: يتحط وقت الإنشاء بس.`,
            "خاصية عادية إجبارية.",
            "اختيارية: ممكن متكونش موجودة خالص.",
            "object جواه، هو كمان اختياري، وجواه خاصية اختيارية.",
            "قفلة النوع.",
            "مفيش phone ولا address، ومقبول.",
            "الخصايص العادية تتعدّل عادي.",
            R`[[readonly]] منعت التعديل.`,
            "TS مش هيسيبك تنادي method على حاجة ممكن تكون undefined.",
            R`[[?.]] بيرجع undefined لو phone مش موجود، و [[??]] بيحط البديل.`,
            R`نوعها [[string | undefined]].`
          ],
          sol: R`[[const copy = { ...p, id: "x" }]] مفيهوش أي خطأ: [[readonly]] بتمنع تغيير الخاصية على نفس الـ object، إنما انت هنا بتعمل object جديد خالص.

وبعد ما تغيّر [[phone?: string]] لـ [[phone: string | undefined]]: [[const p]] بيطلّع Property 'phone' is missing in type '{ id: string; name: string; }' but required in type 'Profile'. الفرق: [[?]] معناها الخاصية ممكن متكونش موجودة أصلًا، و [[string | undefined]] معناها لازم تكتبها حتى لو قيمتها undefined، يعني [[{ id: "u1", name: "Sara", phone: undefined }]].`
        },
        {
          cmd: "type و interface",
          title: "طريقتين تسمّي بيهم شكل object، وتختار أنهي",
          desc: R`[[interface User { ... }]] و [[type User = { ... }]] الاتنين بيسمّوا شكل object، وفي أغلب الحالات زي بعض. الفرق: [[type]] ينفع لأي نوع (union و tuple ودالة و primitive)، و [[interface]] للـ objects بس، بس ممكن يتفتح ويتضاف عليه (declaration merging).

القاعدة العملية: اختار واحد للـ objects وامشي عليه في المشروع. ناس كتير بتستخدم [[type]] لكل حاجة، و [[interface]] لما محتاجين [[extends]] أو يضيفوا على نوع مكتبة.`,
          example: R`interface User {
  id: string;
  name: string;
}
interface Admin extends User {
  permissions: string[];
}
type Status = "active" | "banned";
type Customer = User & { status: Status };
interface User {
  avatarUrl?: string;
}
const a: Admin = { id: "1", name: "Sara", permissions: ["all"] };`,
          try: R`اعمل [[type User]] مرتين بنفس الاسم وشوف الخطأ (Duplicate identifier). وبعدين اعمل [[interface Bad extends User { name: number }]] وقارن رسالة الخطأ بـ [[type Bad2 = User & { name: number }]]، اللي مش هيطلّع خطأ غير لما تحاول تعمل قيمة منه.`,
          flag: "script",
          deep: {
            why: "هتلاقي الاتنين في كل مشروع وكل مكتبة، وهيتسألوا في أي انترفيو. الأهم تعرف إمتى الفرق بيبان فعلًا، مش تحفظ قايمة.",
            how: R`[[interface]] نوع object باسم، و [[extends]] بيورث منه. لو خاصية في الابن متعارضة مع الأب، TS بيطلّع خطأ واضح عند التعريف.

[[type]] اسم لأي نوع (type alias): union، و tuple، ودالة، و mapped و conditional types. و [[&]] (intersection) بتدمج الأشكال، بس لو فيه تعارض مبيطلعش خطأ عند التعريف: الخاصية بتبقى [[never]]، والخطأ بيطلع بعدين في مكان غريب.

declaration merging: لو عرّفت نفس الـ interface مرتين، TS بيدمجهم. ده سبب إن مكتبات كتير بتستخدم interface، لأنه بيخليك تضيف على أنواعهم من برّه، زي إضافة [[user]] على [[Request]] بتاع Express أو خاصية على [[Window]] (درس [[declare global]] في المستوى ٣). ونفس الميزة ممكن تبقى عيب: لو اسمك اتصادف مع interface موجود، الاتنين يتدمجوا من غير ما تاخد بالك.

الأداء: في المشاريع الكبيرة جدًا، [[extends]] على interfaces أسرع في الفحص من [[&]] كتير متداخل. في مشروع عادي مش هتحس بفرق.`,
            when: "[[type]] للـ unions والأنواع المشتقة ([[Pick]] و [[Omit]]) وأنواع الدوال. و [[interface]] لأشكال الـ objects و props الكومبوننتات لو الفريق متفق، ولازم لما تضيف على نوع مكتبة.",
            mistakes: R`تفتكر إن واحد فيهم «أحسن» دايمًا وتقعد تحوّل المشروع كله. وتستخدم [[&]] لتغيير نوع خاصية فتطلع [[never]] من غير أي خطأ. وفي الانترفيو: «interface للكلاسات بس» غلط، و «type مينفعش يتوسّع» غلط (بيتوسّع بـ [[&]]).`
          },
          lines: [
            "interface بيوصف object.",
            "خاصية.",
            "خاصية.",
            "قفلة.",
            R`[[extends]]: Admin فيه كل حاجة في User وزيادة.`,
            "الزيادة.",
            "قفلة.",
            "union: ده مينفعش يتعمل بـ interface، type بس.",
            R`[[&]] (intersection): نفس فكرة extends بس بـ type.`,
            "نفس الاسم تاني: TS بيدمج الاتنين في interface واحد (declaration merging).",
            "بقت جزء من User في كل مكان.",
            "قفلة.",
            "Admin دلوقتي فيه id و name و permissions، و avatarUrl الاختيارية."
          ],
          sol: R`[[type User]] مرتين بيطلّع [[Duplicate identifier 'User']] (TS2300) على الاتنين، لأن type مش بيتدمج زي interface.

و [[interface Bad extends User { name: number }]] بيطلّع خطأ فورًا على [[Bad]]: Interface 'Bad' incorrectly extends interface 'User'. Types of property 'name' are incompatible (TS2430). أما [[type Bad2 = User & { name: number }]] بيعدّي، و [[name]] فيه بقى [[string & number]] يعني [[never]]. أول ما تكتب [[const x: Bad2 = { id: "1", name: 5 }]] تاخد Type 'number' is not assignable to type 'never'، ورسالة زي دي صعب تفهم منها السبب. عشان كده extends أوضح لما بتبني نوع على نوع.`
        }
      ]
    },
    {
      t: "Unions والأنواع الخاصة",
      l: 1,
      n: "قيمة ممكن تبقى كذا نوع، وقيم محددة بالاسم، و null، و any و unknown و never، وقوايم القيم الثابتة",
      items: [
        {
          cmd: "union types",
          title: "قيمة ممكن تبقى نوع من أكتر من نوع",
          desc: R`[[string | number]] معناها string أو number. TS مش هيسيبك تستخدم غير الحاجات المشتركة بين الاتنين، لحد ما تفحص انت أنهي فيهم (ده اسمه narrowing، وتفاصيله في المستوى ٢).

الـ unions في كل حتة: [[string | null]] لقيمة ممكن تبقى فاضية، و [[User | undefined]] لنتيجة [[find]]، و [["light" | "dark"]] لاختيارات محددة.`,
          example: R`function formatId(id: string | number) {
  id.toUpperCase(); // خطأ: toUpperCase مش موجودة على number
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toFixed(0);
}
function len(x: string | string[]) {
  return x.length;
}
formatId(42);
formatId(true); // خطأ: boolean مش من ضمن الاتنين`,
          try: R`امسح السطر التاني، وضيف [[boolean]] للـ union في [[formatId]] وشوف TS هيطلّع خطأ فين (عند [[toFixed]]، لأن اللي فاضل بقى number أو boolean).`,
          flag: "script",
          deep: {
            why: "الداتا الحقيقية مش دايمًا نوع واحد: id جاي من URL يبقى string ومن القاعدة number، والقيمة ممكن تبقى موجودة أو null. من غير union يا إما تكذب في النوع، يا إما any. الـ union بيقول الحقيقة، و TS بيجبرك تتعامل مع كل احتمال.",
            how: R`الـ union مجموعة قيم: [[string | number]] كل القيم اللي string أو number. على القيمة دي مسموحلك بس اللي موجود في كل الأنواع مع بعض. [[length]] موجودة في string وفي array، فمسموحة على [[string | string[]]].

عشان تستخدم حاجة خاصة بنوع، بتفحص بكود JS عادي ([[typeof]] أو [[Array.isArray]] أو [[===]])، و TS بيتابع الفحص ده ويضيّق النوع في كل فرع (control flow analysis). وبعد [[return]] جوه الـ if، TS عارف إن الباقي هو الاحتمال التاني.

ولما تضيف احتمال جديد للـ union، كل مكان مش متعامل معاه بيطلّع خطأ، ودي ميزة: مش هتنسى مكان.`,
            when: "أي قيمة ممكن تبقى أكتر من شكل: [[T | null]] و [[T | undefined]]، ونتايج بتنجح أو تفشل، واختيارات محددة زي حالة الطلب.",
            mistakes: R`union كبير زي [[string | number | boolean | object]] وكل شوية تفحص: غالبًا التصميم محتاج discriminated union (المستوى ٢). وتعمل [[id as string]] بدل ما تفحص، فتكذب على TS ويقع وقت التشغيل.`
          },
          lines: [
            R`[[id]] ممكن يبقى string أو number.`,
            "مينفعش: TS مش ضامن إنه string.",
            "فحص JS عادي، و TS فاهمه.",
            R`هنا جوه الـ if، [[id]] بقى string بس.`,
            "قفلة الـ if.",
            R`بعد الـ if، فاضل number بس، فـ [[toFixed]] مسموحة.`,
            "قفلة.",
            "union تاني.",
            R`[[length]] موجودة في الاتنين، فمسموحة من غير فحص.`,
            "قفلة.",
            "رقم: مقبول.",
            "نوع مش في الـ union."
          ],
          sol: R`الخطأ بيطلع على [[return id.toFixed(0)]]: Property 'toFixed' does not exist on type 'number | boolean' (TS2339). بعد الـ if اللي شال string، اللي فاضل [[number | boolean]]، و [[toFixed]] مش موجودة على boolean.

والحل إنك تفحص boolean كمان، مثلًا [[if (typeof id === "boolean") return id ? "yes" : "no";]] قبل [[toFixed]]. والفكرة: كل ما تزوّد نوع في union، TS بيوريك كل مكان في الكود افترض إن الأنواع أقل.`
        },
        {
          cmd: "literal types",
          title: "نوع قيمه محددة بالاسم، مش أي string",
          desc: R`النوع ممكن يبقى قيمة بعينها: [["GET"]] نوع قيمته الوحيدة [["GET"]]. ومع union: [["GET" | "POST" | "DELETE"]] يعني واحدة من التلاتة دول بس، وأي string تاني خطأ.

ده بيحل مشكلة الـ strings السحرية: TS بيمسك [["DELTE"]] وهي مكتوبة غلط، والمحرر بيكمّلك القيم المسموحة.`,
          example: R`type Method = "GET" | "POST" | "PUT" | "DELETE";
type Size = "sm" | "md" | "lg";
type Dice = 1 | 2 | 3 | 4 | 5 | 6;
function request(url: string, method: Method = "GET") {
  return fetch(url, { method });
}
request("/api/users", "POST");
request("/api/users", "DELTE"); // خطأ: مش من القيم المسموحة
let m = "GET";
request("/api/users", m); // خطأ: m نوعها string، أوسع من Method
const m2 = "GET";
request("/api/users", m2);`,
          try: R`في المحرر اكتب [[request("/x", "]] واستنى: هتلاقي الأربع قيم ظهرتلك. وبعدين غيّر [[let m = "GET"]] لـ [[let m: Method = "GET"]] وشوف الخطأ راح.`,
          flag: "script",
          deep: {
            why: R`في مشروع حقيقي، حالة الطلب [["pending"]] مكتوبة في ١٠ أماكن، وواحد كتب [["Pending"]]. JS مش هيقول حاجة، والفلتر هيرجع فاضي. الـ literal types بتخلي القيم المسموحة جزء من النوع، فالغلط يبان وقت الكتابة.`,
            how: R`كل قيمة primitive ليها نوع literal: [["GET"]] و [[42]] و [[true]]. و [[boolean]] نفسها في الحقيقة [[true | false]].

TS بيستنتج الـ literal لما القيمة مستحيل تتغير ([[const]])، وبيوسّعها (widening) لما ممكن تتغير ([[let]]، أو خاصية جوه object). عشان كده في [[const config = { method: "GET" }]] نوع method هو string مش [["GET"]]، والحل [[as const]] أو إنك تكتب النوع.

وفيه template literal types: [[$__btuser_$__{number}$__bt]] نوع لأي string شكله [[user_]] وبعده رقم. مفيد للـ ids والـ routes، بس متكترش منه.`,
            when: "أي string ليها قيم محددة: حالات (status)، وأدوار (roles)، وأحجام، و HTTP methods، وأسماء events. وغالبًا بدل enum (آخر درس في المستوى ده).",
            mistakes: R`تكتب [[status: string]] وبعدين [[if (status === "actve")]] ومحدش يمسكها. وتحط القيم في object عادي من غير [[as const]] وتستغرب إن النوع بقى string.`
          },
          lines: [
            "union من strings محددة.",
            "زي أحجام زرار في design system.",
            "literal أرقام كمان.",
            "الباراميتر بياخد قيمة من الأربعة بس، والافتراضي GET.",
            R`[[fetch]] بياخد الـ method عادي.`,
            "قفلة.",
            "قيمة مسموحة.",
            "غلطة إملائية مسكها TS.",
            R`[[let]]: النوع اتوسّع لـ string.`,
            "string أوسع من Method، فمرفوض.",
            R`[[const]]: النوع [["GET"]] بالظبط.`,
            "يعدّي."
          ],
          sol: R`بعد [[request("/x", "]] المحرر بيعرض [[DELETE]] و [[GET]] و [[POST]] و [[PUT]] بس، مش أي string. ولو ظهرتلك اقتراحات كتير عشوائية، غالبًا انت في ملف .js أو مفيش TypeScript شغال في المحرر.

وبعد [[let m: Method = "GET"]] الخطأ على [[request("/api/users", m)]] بيختفي، لأن نوع [[m]] بقى [[Method]] مش [[string]]. ولسه الأمان موجود: لو كتبت [[m = "PATCH"]] بعدها هتاخد خطأ عند الـ assignment نفسه.`
        },
        {
          cmd: "null و undefined",
          title: "ليه TS بيعترض لما القيمة ممكن تبقى فاضية",
          desc: R`مع [[strict]] (وجواه [[strictNullChecks]])، [[null]] و [[undefined]] مش جزء من أي نوع غير لو كتبتهم: [[string]] مينفعش تبقى null، و [[string | null]] ينفع. وده بيقفل أشهر خطأ في JS: [[Cannot read properties of undefined]].

دوال كتير بترجع undefined لما متلاقيش حاجة، زي [[find]] و [[Map.get]]، و [[querySelector]] بترجع null، و TS بيجبرك تتعامل مع الاحتمال ده قبل ما تستخدم الناتج.`,
          example: R`type User = { id: number; name: string };
const users: User[] = [{ id: 1, name: "Sara" }];
const found = users.find((u) => u.id === 2);
console.log(found.name); // خطأ: 'found' is possibly 'undefined'
if (found) {
  console.log(found.name);
}
console.log(found?.name ?? "مش موجود");
const input = document.querySelector("input");
input.value = ""; // خطأ: 'input' is possibly 'null'
function getUser(id: number): User | null {
  return users.find((u) => u.id === id) ?? null;
}`,
          try: R`في الـ Playground افتح قايمة TS Config واقفل [[strictNullChecks]]: هتلاقي أخطاء [[found.name]] و [[input.value]] اختفت، وده اللي بيحصل في مشروع مش strict. رجّعها.`,
          flag: "script",
          deep: {
            why: "Tony Hoare، اللي اخترع null، سمّاها «غلطة المليار دولار». أغلب الـ crashes في تطبيقات JS سببها قيمة كانت undefined والكود افترض إنها موجودة. و strictNullChecks بيحوّل الكلاس ده من الأخطاء لخطأ وقت الكتابة.",
            how: R`من غير [[strictNullChecks]]، null و undefined مسموحين في أي نوع، فـ [[const name: string = null]] يعدّي و TS مش بيحميك من حاجة. معاه، هما أنواع منفصلة ولازم تكتبهم في union.

TS بيضيّق النوع بعد أي فحص: [[if (found)]]، و [[if (found !== undefined)]]، و [[if (!found) return]] (early return)، و [[?.]]. بعد الفحص، النوع من غير null و undefined.

الفرق بين الاتنين في JS: [[undefined]] يعني «ملهاش قيمة لسه» (متغير متحطش فيه حاجة، أو خاصية مش موجودة)، و [[null]] يعني «مفيش قيمة، عن قصد». قواعد البيانات والـ APIs غالبًا بترجع null (Prisma و Supabase)، و JS نفسه بيرجع undefined. و [[x == null]] بيمسك الاتنين مع بعض، ودي الحالة الوحيدة اللي [[==]] مقبول فيها عند ناس كتير.

وفي TS 6 و 7 [[strict]] بقى true افتراضيًا، فأي مشروع جديد فيه الحماية دي.`,
            when: "دايمًا شغّال. ولما تكتب دالة ممكن متلاقيش حاجة، خلي نوع الرجوع يقول ده صراحة ([[User | null]]) بدل ما ترمي exception أو ترجّع object فاضي.",
            mistakes: R`تحل الخطأ بـ [[found!.name]]: كده قلت لـ TS «اسكت» والـ crash لسه موجود (درس [[!]] في المستوى ٢). ومشروع قديم [[strict: false]] وتفتكر إن TS بيحميك. وتفحص بـ [[if (count)]] على رقم، فالـ 0 بيتعامل كأنه مش موجود: استخدم [[count !== undefined]].`
          },
          lines: [
            "نوع بسيط.",
            "ليستة فيها مستخدم واحد.",
            R`[[find]] بترجع [[User | undefined]]، لأنها ممكن متلاقيش.`,
            "ممنوع: ممكن تبقى undefined وتقع وقت التشغيل.",
            "فحص: جوه الـ if النوع بقى User بس.",
            "آمن.",
            "قفلة.",
            R`أو [[?.]] و [[??]] في سطر واحد.`,
            R`نوعها [[HTMLInputElement | null]]: العنصر ممكن ميكونش في الصفحة.`,
            "نفس الحماية مع DOM.",
            "دالة بتقول صراحة إنها ممكن ترجع null.",
            R`لو [[find]] رجّعت undefined، رجّع null بدالها.`,
            "قفلة."
          ],
          sol: R`بعد ما تقفل [[strictNullChecks]] الخطأين بيختفوا: [[found.name]] و [[input.value]] بيعدّوا عادي، و [[found]] نوعها بقى [[User]] مش [[User | undefined]]. بس الكود لسه غلط: [[users.find]] بترجع undefined لأن مفيش user برقم 2، ولو شغلته هتاخد [[TypeError: Cannot read properties of undefined (reading 'name')]].

يعني الإعداد ده مش بيصلّح حاجة، بيخبي الـ crash. رجّعه، وخلي كل مكان TS اشتكى فيه يتعامل مع الحالة الفاضية بـ if أو [[?.]] و [[??]].`
        },
        {
          cmd: "any و unknown و never",
          title: "أي قيمة من غير فحص، وأي قيمة بفحص، ومفيش قيمة خالص",
          desc: R`[[any]] بيقفل TS: أي حاجة مسموحة عليه ومفيش فحص. [[unknown]] بيقبل أي قيمة برضه، بس مش هيسيبك تعمل بيها حاجة لحد ما تفحصها. و [[never]] نوع مفيش قيمة تنفعله: دالة مبترجعش أبدًا (بترمي خطأ)، أو فرع مستحيل يحصل.

القاعدة: القيمة اللي مش عارف نوعها (JSON، و [[catch (e)]]، وداتا من برّه) خليها [[unknown]] وافحصها. و [[any]] آخر حل.`,
          example: R`const a: any = JSON.parse('{"x":1}');
a.foo.bar.baz(); // بيعدّي، ويقع وقت التشغيل
const u: unknown = JSON.parse('{"x":1}');
u.foo; // خطأ: 'u' is of type 'unknown'
if (typeof u === "object" && u !== null && "x" in u) {
  console.log(u.x);
}
try {
  JSON.parse("{bad");
} catch (e) {
  console.log(e instanceof Error ? e.message : String(e));
}
function fail(msg: string): never {
  throw new Error(msg);
}`,
          try: R`غيّر [[u]] لـ any وشوف كل الأخطاء اختفت، وشغّل الكود بـ tsx وشوف مين اللي وقع. وبعدين جرّب [[const n: never = 5]] واقرا الرسالة.`,
          flag: "script",
          deep: {
            why: "فيه قيم TS مستحيل يعرف نوعها وقت الكتابة: رد API، و [[JSON.parse]]، و [[localStorage]]، والخطأ في [[catch]]. و [[any]] بيحل المشكلة بإنه يطفي الفحص، فالغلط بيعدّي وينتشر. [[unknown]] بيقول الحقيقة: «مش عارف»، ويجبرك تثبت قبل ما تستخدم.",
            how: R`[[any]] بيعدّي الفحص في الاتجاهين: أي حاجة تتحط فيه، وهو يتحط في أي حاجة. والأخطر إنه معدي: [[const x = a.foo]] بقى any هو كمان، ودالة بترجع any بتنشر any في كل اللي بيستخدمها.

[[unknown]] نوع الأمان: أي قيمة تتحط فيه، بس هو مينفعش يتحط غير في [[unknown]] أو [[any]]، ومفيش عليه أي عملية لحد ما تضيّقه ([[typeof]] و [[instanceof]] و [[in]] و [[Array.isArray]]، أو Zod في المستوى ٣).

[[never]] المجموعة الفاضية: مفيش قيمة نوعها never. بيطلع في ٣ أماكن: دالة دايمًا بترمي أو فيها loop مبيخلصش، ونوع بعد ما كل الاحتمالات اتفحصت (ودي أساس الـ exhaustive check في المستوى ٢)، وتقاطع مستحيل زي [[string & number]].

و [[useUnknownInCatchVariables]] (جوه strict) هو اللي بيخلي [[e]] في catch نوعها unknown بدل any، لأن JS يسمح ترمي أي حاجة، مش Error بس.`,
            when: "[[unknown]] لأي داتا جاية من برّه لحد ما تتحقق منها. [[never]] للدوال اللي بترمي دايمًا وللتأكد إن switch غطّى كل الحالات. و [[any]] بس وانت بتنقل كود JS قديم خطوة خطوة، ومؤقتًا.",
            mistakes: R`في مشروع حقيقي كان فيه [[useState<any[]>([])]] و [[(req.body as any)[field]]] و [[catch (e: any)]]: كل واحدة منهم حتة TS مش شايفها. وتفتكر إن [[unknown]] و [[any]] زي بعض لأن الاتنين «أي حاجة». وتكتب [[: never]] كنوع رجوع لدالة مبترجعش قيمة: ده [[void]]، مش never.`
          },
          lines: [
            R`[[JSON.parse]] بيرجع [[any]] أصلًا.`,
            "TS ساكت تمامًا، وده هيقع وقت التشغيل بـ TypeError.",
            R`نفس القيمة بس [[unknown]].`,
            "ممنوع تلمسها قبل ما تفحص.",
            "فحص حقيقي بـ JS: object، ومش null، وفيه x.",
            R`دلوقتي مسموح تقرا [[u.x]] (نوعها لسه unknown، بس TS عارف إنها موجودة).`,
            "قفلة.",
            "كود ممكن يرمي.",
            "JSON بايظ، فبيرمي SyntaxError.",
            R`في [[strict]]، [[e]] نوعها [[unknown]].`,
            R`افحص إنه Error قبل ما تقرا [[message]].`,
            "قفلة.",
            R`[[never]]: الدالة دي مبترجعش أبدًا.`,
            "دايمًا بترمي.",
            "قفلة."
          ],
          sol: R`بعد ما تخلي [[u]] نوعها any، كل الأخطاء بتختفي. ولما تشغّل بـ tsx، اللي بيقع هو السطر التاني [[a.foo.bar.baz()]]: [[TypeError: Cannot read properties of undefined (reading 'bar')]]، لأن [[a.foo]] قيمتها undefined، وأي سطر بعده مش هيتنفذ. أما [[u.foo]] لوحدها مش بتوقّع حاجة، بترجّع undefined بصمت.

و [[const n: never = 5]] بيطلّع Type '5' is not assignable to type 'never' (TS2322): مفيش أي قيمة ينفع تتحط في never، ودي نفس الفكرة اللي بيقوم عليها exhaustive check.`
        },
        {
          cmd: "enum ولا union",
          title: "قايمة قيم ثابتة زي الأدوار والحالات: تكتبها إزاي",
          desc: R`TypeScript فيه [[enum]]، بس أغلب المشاريع الحديثة بتفضّل union من literals ([["ADMIN" | "USER"]])، ولو محتاج القيم كمان وقت التشغيل (لـ dropdown أو loop) بتعمل object بـ [[as const]] وتطلّع منه النوع.

السبب إن enum من الحاجات القليلة في TS اللي بتطلّع كود JS حقيقي، مش بيتمسح زي باقي الأنواع، وده بيعمل مشاكل مع Node والأدوات الحديثة.`,
          example: R`enum RoleEnum { Admin = "ADMIN", User = "USER" }
type Role = "ADMIN" | "USER";
const Status = { Active: "ACTIVE", Banned: "BANNED" } as const;
type Status = (typeof Status)[keyof typeof Status];
function setRole(role: Role) { return role; }
setRole("ADMIN");
function setRoleEnum(role: RoleEnum) { return role; }
setRoleEnum("ADMIN"); // خطأ: لازم RoleEnum.Admin
function setStatus(s: Status) { return s; }
setStatus(Status.Active);
setStatus("BANNED");
Object.values(Status).forEach((s) => console.log(s));`,
          try: R`شغّل ملف فيه [[enum]] بـ [[node file.ts]] على Node 24 وشوف الخطأ، وبعدين شيل الـ enum وسيب الـ [[as const]] وشغّله تاني.`,
          flag: "script",
          deep: {
            why: "كل مشروع فيه قوايم ثابتة: أدوار، وحالات طلب، وأنواع اشتراك. محتاج حاجتين: TS يمسك القيمة الغلط، وساعات تحتاج القيم نفسها وقت التشغيل. enum بيعمل الاتنين بس بتمن، و union مع [[as const]] بيعملهم من غير التمن.",
            how: R`[[enum]] بيتحوّل لكود: [[enum RoleEnum { Admin = "ADMIN" }]] بيطلع object حقيقي في الـ JS. ولو الـ enum رقمي ([[enum Dir { Up, Down }]]) القيم بتبقى 0 و 1، و TS بيعمل كمان reverse mapping ([[Dir[0] === "Up"]])، فـ [[Object.keys(Dir)]] بيطلّع ٤ حاجات مش ٢.

وعشان enum مش «أنواع بس»، Node 24 لما بيشغّل .ts مباشرة (type stripping) بيرفضه إلا بفلاج [[--experimental-transform-types]]، وإعداد [[erasableSyntaxOnly]] في TS بيمنعه خالص. وفيه كمان [[const enum]] اللي بيتشال ويتحط مكانه القيمة، بس مبيشتغلش صح مع الأدوات اللي بتترجم ملف ملف ([[isolatedModules]]).

و string enums «nominal»: [["ADMIN"]] مش مقبولة مكان [[RoleEnum.Admin]] حتى لو نفس القيمة. ده ساعات مطلوب، بس غالبًا بيضايق: الداتا الجاية من API عبارة عن strings، فلازم تحوّل.

الـ object اللي بـ [[as const]] بيدّيك نفس المميزات: قيم وقت التشغيل ([[Object.values(Status)]])، ونوع ([[(typeof Status)[keyof typeof Status]]] بيطلّع union القيم)، ومبيطلّعش كود غير الـ object العادي. و Prisma 7 نفسه (generator [[prisma-client]]) بيطلّع enums الـ schema بالشكل ده بالظبط: object بـ [[as const]] ونوع بنفس الاسم.`,
            when: "union لأي قايمة قيم في النوع بس. و object بـ [[as const]] لما تحتاج القيم وقت التشغيل كمان. و enum لو المشروع أصلًا ماشي عليه والفريق متفق، مش حرام.",
            mistakes: R`enum رقمي والقيم بتتخزن في القاعدة كأرقام: تضيف عضو في النص فكل الأرقام اللي بعده تتزق والداتا القديمة تتلخبط. لو لازم enum، اديله قيم string صريحة. وتستخدم enum في كود هيتشغّل بـ [[node file.ts]] فيقع. وفي الانترفيو: «enum مجرد نوع» غلط، هو الاستثناء اللي بيطلّع كود.`
          },
          lines: [
            "enum بقيم string. ده بيتحوّل لـ object حقيقي في JS.",
            "نفس الفكرة كـ union: بيتمسح خالص وقت التشغيل.",
            R`object عادي بـ [[as const]]: القيم بقت readonly و literals.`,
            R`النوع من قيم الـ object: [["ACTIVE" | "BANNED"]]. نفس الاسم ينفع للقيمة وللنوع.`,
            "دالة بتاخد الـ union.",
            "string عادية تعدّي، والمحرر بيكمّلها.",
            "دالة بتاخد الـ enum.",
            R`string enum مبيقبلش النص نفسه، لازم تكتب [[RoleEnum.Admin]].`,
            "دالة بتاخد النوع اللي طالع من الـ object.",
            "تنفع بالاسم من الـ object.",
            "وبالنص مباشرة.",
            "والقيم موجودة وقت التشغيل، فتقدر تلف عليها (dropdown مثلًا)."
          ],
          sol: R`[[node file.ts]] بيقع قبل ما ينفّذ أي سطر: [[SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode]]. Node بيشيل الأنواع بس، و enum مش نوع، ده كود بيطلّع object وقت التشغيل، فـ Node مش عارف يعمل بيه إيه.

بعد ما تشيل الـ enum (وكل حاجة بتستخدم [[RoleEnum]]) الملف بيشتغل ويطبع [[ACTIVE]] وبعدين [[BANNED]]. الـ [[as const]] نوع بس فبيتشال، والـ object عادي. ولو لسه بيقع بنفس الخطأ، دوّر على [[enum]] تاني أو [[namespace]] أو parameter properties في الكلاسات، ودول برضه مش مسموحين في strip-only.`
        }
      ]
    },
    {
      t: "Narrowing: تضيّق النوع",
      l: 2,
      n: "TS بيتابع الـ if والـ switch وبيعرف النوع في كل فرع، وانت تقدر تعلّمه فحوصات جديدة",
      items: [
        {
          cmd: "narrowing",
          title: "TS بيعرف النوع جوه الـ if إزاي",
          desc: R`narrowing معناه إن TS يضيّق union لنوع أصغر بعد فحص JS عادي. الفحوصات اللي بيفهمها: [[typeof]] للـ primitives، و truthiness ([[if (x)]])، و [[===]]، و [[in]] (الخاصية موجودة؟)، و [[instanceof]] (من الكلاس ده؟)، و [[Array.isArray]].

والمهم إن الفحص كود حقيقي بيشتغل وقت التشغيل، لأن الأنواع نفسها مش موجودة وقتها.`,
          example: R`type Cat = { meow: () => void };
type Dog = { bark: () => void };
function speak(pet: Cat | Dog) {
  if ("meow" in pet) pet.meow();
  else pet.bark();
}
function show(value: string | number | Date | null) {
  if (value === null) return "—";
  if (typeof value === "string") return value.trim();
  if (value instanceof Date) return value.toISOString();
  return value.toFixed(2);
}
function total(items: number | number[]) {
  return Array.isArray(items) ? items.reduce((a, b) => a + b, 0) : items;
}`,
          try: R`امسح سطر [[value === null]] وشوف TS بيقولك إيه عند [[toFixed]]. وبعدين جرّب [[typeof value === "object"]] بدل instanceof، وشوف النوع جوه الـ if بقى إيه (null كمان object).`,
          flag: "script",
          deep: {
            why: "الـ unions مش مفيدة غير لو تقدر تشتغل على كل احتمال لوحده. الـ narrowing هو اللي بيخليك تكتب JS عادي خالص (if و switch)، و TS يفهم لوحده النوع في كل فرع من غير ما تعمل cast.",
            how: R`TS بيعمل control flow analysis: بيمشي في الكود فرع فرع وبيحسب نوع كل متغير في كل نقطة. بعد [[if (typeof x === "string") return]]، باقي الدالة x مش string.

[[typeof]] بيفرّق بين الـ primitives بس: [["string"]] و [["number"]] و [["boolean"]] و [["undefined"]] و [["function"]] و [["object"]]. وخلي بالك [[typeof null === "object"]] (غلطة قديمة في JS)، والـ array كمان [["object"]].

[[in]] بيفحص وجود خاصية، ومفيد مع objects عادية (زي داتا JSON) اللي مفيهاش كلاس. و [[instanceof]] بيفحص سلسلة الـ prototype، فبيشتغل مع الكلاسات بس ([[Date]] و [[Error]] وكلاساتك)، مش مع [[type]] أو [[interface]] لأنهم مش موجودين وقت التشغيل.

الـ truthiness ([[if (x)]]) بيشيل null و undefined، بس كمان بيشيل [[0]] و [[""]] و [[false]]. فلو 0 قيمة صح، افحص [[x !== undefined]].

والـ narrowing ممكن يضيع جوه callbacks: لو فحصت [[obj.user]] وبعدين استخدمته جوه [[arr.map(() => obj.user.name)]]، TS هيعترض لأن الـ callback ممكن يتنادي بعدين والقيمة اتغيرت. الحل: خزّنها في [[const]] الأول.`,
            when: R`أي union. وفي الـ catch: [[if (e instanceof Error)]]. ولداتا JSON: [[in]] أو Zod.`,
            mistakes: R`[[if (typeof user === "User")]]: مفيش حاجة اسمها كده، typeof بيرجع أنواع JS بس. و [[x instanceof MyInterface]]: الـ interface مش موجود وقت التشغيل. و [[if (!count) return]] على رقم ممكن يبقى 0.`
          },
          lines: [
            R`نوع فيه [[meow]].`,
            R`نوع فيه [[bark]].`,
            "union من الاتنين.",
            R`[[in]]: لو الخاصية موجودة يبقى Cat.`,
            "غير كده فاضل Dog بس.",
            "قفلة.",
            "union من أربع احتمالات.",
            R`[[===]]: شيل null، والباقي تلاتة.`,
            R`[[typeof]]: هنا string.`,
            R`[[instanceof]]: object من كلاس Date.`,
            R`مفيش غير number، فـ [[toFixed]] مسموحة.`,
            "قفلة.",
            "رقم أو ليستة أرقام.",
            R`[[Array.isArray]] بيضيّق للـ array في فرع وللرقم في التاني.`,
            "قفلة."
          ],
          sol: R`بعد ما تمسح سطر [[value === null]]: [[value.toFixed(2)]] بيطلّع 'value' is possibly 'null' (TS18047). بعد typeof و instanceof اللي فاضل [[number | null]]، ومحدش شال null.

ولو غيّرت instanceof لـ [[typeof value === "object"]]، النوع جوه الـ if بيبقى [[Date | null]] مش Date بس، لأن [[typeof null]] بيرجّع "object" (غلطة قديمة في JS). فـ [[value.toISOString()]] جواه بيطلّع نفس الخطأ 'value' is possibly 'null'. عشان كده instanceof أو فحص null الأول.`
        },
        {
          cmd: "discriminated unions",
          title: "union من objects فيه خاصية بتقول هو أنهي واحد",
          desc: R`discriminated union: كل object في الـ union فيه خاصية بنفس الاسم وقيمة literal مختلفة (غالبًا [[type]] أو [[status]] أو [[kind]]). لما تفحص الخاصية دي، TS بيعرف باقي الشكل.

ده أنضف طريقة توصف بيها حالات حاجة: طلب بيحمّل أو نجح أو فشل. كل حالة ليها الداتا بتاعتها بس، فمستحيل يبقى عندك [[data]] و [[error]] في نفس الوقت.`,
          example: R`type FetchState =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; error: string };
function render(s: FetchState) {
  switch (s.status) {
    case "loading":
      return "بيحمّل...";
    case "success":
      return s.data.join(", ");
    case "error":
      return "حصل خطأ: " + s.error;
  }
}`,
          try: R`جوه [[case "loading"]] اكتب [[s.data]] وشوف الخطأ. وبعدين ضيف حالة [[{ status: "idle" }]] للنوع وشوف هل TS لاحظ إنها مش متغطية (الدرس الجاي بيخليه يلاحظ دايمًا).`,
          flag: "script",
          deep: {
            why: R`الطريقة الشائعة: [[loading: boolean]] و [[data?: T]] و [[error?: string]] في state واحدة. كده فيه ٨ تركيبات ممكنة، ونصهم مستحيل منطقيًا (loading و error مع بعض؟)، والكود بيتملي [[if (data && !loading && !error)]]. الـ discriminated union بيخلي الحالات المستحيلة مستحيلة في النوع نفسه.`,
            how: R`الخاصية المشتركة لازم تكون literal type ([["loading"]] مش string). لما تكتب [[s.status === "success"]] أو [[case "success"]]، TS بيشيل من الـ union كل الأشكال اللي status بتاعها مش success، فمفيش غير شكل واحد باقي.

ده شغال مع [[if]] و [[switch]] و early return.

ونفس الفكرة في حاجات كتير: actions في [[useReducer]] ([[{ type: "add"; item } | { type: "remove"; id }]])، و events جاية من WebSocket، ونتيجة عملية ([[{ ok: true; value } | { ok: false; error }]])، و [[safeParse]] في Zod بترجع الشكل ده بالظبط على [[success]].`,
            when: "state فيها حالات مختلفة، و reducer actions، ورسايل بين client و server، وأي نتيجة ممكن تنجح أو تفشل.",
            mistakes: R`تعمل destructuring لخاصية مش موجودة في كل الأشكال قبل الفحص ([[const { data } = s]]): TS هيعترض، لأن data مش موجودة في loading. افحص الأول وبعدين خُد. وتخلي الخاصية المميّزة [[string]] بدل literal، فالتضييق مبيحصلش.`
          },
          lines: [
            "النوع اسمه FetchState.",
            "حالة التحميل: مفيش داتا.",
            "حالة النجاح: فيها data.",
            "حالة الفشل: فيها error.",
            "الدالة بتاخد أي حالة.",
            "بتفحص الخاصية المميّزة (discriminant).",
            "لو loading...",
            "...مفيش حاجة تانية تتقري.",
            "لو success...",
            R`...TS عارف إن [[s.data]] موجودة.`,
            "لو error...",
            R`...و [[s.error]] موجودة.`,
            "قفلة الـ switch.",
            "قفلة الدالة."
          ],
          sol: R`[[s.data]] جوه [[case "loading"]] بيطلّع Property 'data' does not exist on type '{ status: "loading"; }' (TS2339): جوه الـ case ده TS عارف إنها حالة loading بالظبط.

ولما تضيف [[{ status: "idle" }]]، غالبًا مش هتلاقي أي خطأ: الدالة من غير نوع رجوع، فـ TS بيعتبر إنها ممكن ترجّع undefined لحالة idle ويسكت. لو كتبت نوع الرجوع [[: string]] هتاخد Function lacks ending return statement and return type does not include 'undefined' (TS2366)، وده تلميح بس، مش بيقولك أنهي حالة ناقصة. الدرس الجاي بيخلي الخطأ واضح ويسمّي الحالة.`
        },
        {
          cmd: "exhaustive check",
          title: "تتأكد إن الـ switch غطّى كل الحالات، ولو زودت حالة يطلع خطأ",
          desc: R`في آخر الـ switch، حط [[default]] بيحط القيمة في متغير نوعه [[never]]. لو كل الحالات متغطية، القيمة هناك نوعها never والكود يعدّي. لو حد ضاف حالة جديدة للـ union ونسي يتعامل معاها، TS يطلّع خطأ في السطر ده بالظبط.

ده بيحوّل «نسيت أعدّل مكان» من bug في الإنتاج لخطأ وقت الـ build.`,
          example: R`type Shape =
  | { kind: "circle"; r: number }
  | { kind: "square"; side: number }
  | { kind: "rect"; w: number; h: number };
function area(s: Shape): number {
  switch (s.kind) {
    case "circle": return Math.PI * s.r ** 2;
    case "square": return s.side ** 2;
    default: {
      const unhandled: never = s; // خطأ: Type '{ kind: "rect"; ... }' is not assignable to type 'never'
      throw new Error("شكل مش معروف: " + JSON.stringify(unhandled));
    }
  }
}`,
          try: R`ضيف [[case "rect": return s.w * s.h;]] وشوف الخطأ اختفى. وبعدين ضيف شكل رابع [[triangle]] للـ union ولاحظ إن الخطأ رجع لوحده في نفس المكان.`,
          flag: "script",
          deep: {
            why: "الـ union بيكبر مع المشروع: حالة طلب جديدة، ونوع اشتراك جديد، ودور جديد. كل switch في الكود محتاج يتعدّل، ومحدش فاكر هما فين. الـ exhaustive check بيخلي TS يلاقيهم بدالك.",
            how: R`كل case بيشيل احتمال من الـ union. لما توصل للـ default، نوع [[s]] هو اللي فاضل. لو غطّيت الكل، اللي فاضل هو [[never]] (مجموعة فاضية)، و never ينفع يتحط في never. لو فاضل حاجة، [[{ kind: "rect" ... }]] مش assignable لـ never، فيطلع خطأ فيه اسم الحالة الناقصة.

ليه الـ throw كمان؟ لأن الأنواع بتتمسح. لو السيرفر بعت [[kind: "hexagon"]] وقت التشغيل، الـ switch هيوصل للـ default فعلًا، والأحسن يرمي خطأ واضح بدل ما الدالة ترجع undefined بهدوء.

ناس كتير بتعمل دالة صغيرة يستخدموها في كل مكان: [[function assertNever(x: never): never { throw new Error("unexpected") }]]، ويكتبوا [[default: return assertNever(s)]].

وكتابة نوع الرجوع ([[: number]]) لوحدها بتدّي حماية جزئية: لو حالة ناقصة ومفيش default، الدالة ممكن ترجع undefined، و TS يعترض. بس رسالة never أوضح وبتقولك الحالة بالاسم.`,
            when: "أي switch أو if/else على discriminated union أو union literals، خصوصًا في reducers والـ API handlers.",
            mistakes: R`تكتب [[default: return null]] فتقفل الحماية: أي حالة جديدة هتروح للـ default بهدوء. وتعمل exhaustive check على [[string]] عادي بدل union literals: مش هيشتغل لأن string ملهاش نهاية.`
          },
          lines: [
            "union بتلات أشكال.",
            "دايرة.",
            "مربع.",
            "مستطيل: الحالة اللي «اتضافت جديد» ومحدش غطّاها.",
            "نوع الرجوع مكتوب number.",
            R`فحص على [[kind]].`,
            "الدايرة.",
            "المربع.",
            "أي حاجة تانية.",
            R`هنا المفروض ميكونش فاضل حاجة. بس [[rect]] لسه فاضل، فتعيينه لـ never خطأ، والرسالة بتقولك مين.`,
            "ولو داتا غلط جت وقت التشغيل (مثلًا من API)، ارمي خطأ واضح.",
            "قفلة الـ default.",
            "قفلة الـ switch.",
            "قفلة الدالة."
          ],
          sol: R`بعد [[case "rect"]] الخطأ بيختفي، لأن كل الحالات اتغطت واللي فاضل لـ default هو [[never]].

ولما تضيف [[{ kind: "triangle"; base: number; height: number }]] الخطأ بيرجع على نفس السطر [[const unhandled: never = s]]: Type '{ kind: "triangle"; base: number; height: number; }' is not assignable to type 'never'. الرسالة فيها اسم الحالة الناقصة بالظبط. ولو مطلعش خطأ، اتأكد إن الـ default فيه [[never]] فعلًا، مش [[default: return 0]].`
        },
        {
          cmd: "type predicates (is)",
          title: "دالة فحص بتاعتك، و TS يصدّقها ويضيّق النوع",
          desc: R`لو الفحص معقد أو بيتكرر، حطه في دالة نوع رجوعها [[value is User]] بدل [[boolean]]. لما الدالة ترجع true، TS بيعتبر القيمة User في الفرع ده. دي اسمها type guard (أو type predicate).

وفيه أخت ليها: [[asserts value is User]]، دالة بترمي خطأ لو الفحص فشل، وبعد ما تناديها النوع بيتضيّق في باقي الكود.`,
          example: R`type User = { id: string; name: string };
function isUser(x: unknown): x is User {
  return typeof x === "object" && x !== null &&
    "id" in x && typeof x.id === "string" &&
    "name" in x && typeof x.name === "string";
}
const data: unknown = JSON.parse('{"id":"1","name":"Sara"}');
if (isUser(data)) console.log(data.name);
const ROLES = ["admin", "user"] as const;
type Role = (typeof ROLES)[number];
const isRole = (s: string): s is Role => (ROLES as readonly string[]).includes(s);
const mixed = ["a", undefined, "b"];
const clean = mixed.filter((x) => x !== undefined);`,
          try: R`غيّر [[isUser]] عشان ترجع [[boolean]] بدل [[x is User]]، وشوف [[data.name]] بقت خطأ. وبعدين اكتب [[function assertUser(x: unknown): asserts x is User]] بترمي خطأ، ونادي عليها قبل [[data.name]] من غير if.`,
          flag: "script",
          deep: {
            why: R`فحص زي «ده User؟» بيتكرر في أماكن كتير: داتا من localStorage، ورسالة من WebSocket، وقيمة جاية من query string. لو كتبته جوه كل if هيتكرر ويختلف. في دالة، بيبقى مكان واحد، و TS بيفهم نتيجته.

وفي مشروع حقيقي كان فيه ليستة أدوار [[const ROLES = ["TEACHER", "STUDENT", ...]]] وبعدين [[role as Prisma.UserWhereInput["role"]]] بعد [[includes]]: الـ [[as]] ده بيقول «صدّقني». و guard زي [[isRole]] بيعمل نفس الفحص بس TS بيفهمه.`,
            how: R`[[x is T]] وعد منك: «لو رجّعت true، اعتبره T». TS مبيتأكدش إن الفحص جوه الدالة صح. لو كتبت [[return true]] بس، هيصدّقك، وده نفس خطر [[as]]. عشان كده الـ guard لازم يفحص كل حاجة مهمة فعلًا، أو تستخدم Zod اللي بيعمل الفحص والنوع مع بعض.

لما الـ guard يرجع false، TS بيشيل النوع من الـ union في الفرع التاني ([[else]])، فمع [[User | Admin]] الفرع التاني بقى Admin.

[[asserts x is T]] (assertion function) مبترجعش حاجة: يا بترمي خطأ، يا بتعدّي، وبعدها باقي الكود النوع متضيّق. مفيدة في أول الدالة: [[assertUser(body)]] وبعدين تشتغل عادي.

ومن TS 5.5، الـ compiler بيستنتج type predicate لوحده من arrow functions بسيطة زي [[(x) => x !== undefined]]، فـ [[filter]] بقى بيطلّع النوع الصح من غير ما تكتب [[(x): x is string]].`,
            when: "فحص بيتكرر، وفلترة ليستات فيها union، وقيم string عايز تتأكد إنها من قايمة ثابتة (أدوار، حالات). وللداتا الكبيرة من API استخدم Zod بدل ما تكتب guards بإيدك.",
            mistakes: R`guard بيكذب: بيفحص [[id]] بس ويقول إنه User كامل. و [[filter(Boolean)]] وتستنى النوع يتضيّق: مبيحصلش لأن [[Boolean]] مش guard، استخدم [[(x) => x !== undefined]]. و [[ROLES.includes(role)]] على tuple بـ [[as const]] وتستغرب إنه مرفوض: لأن role نوعها string أوسع من عناصر الليستة.`
          },
          lines: [
            "النوع اللي عايز تتأكد منه.",
            R`[[x is User]]: لو رجّعت true، يبقى x نوعه User.`,
            "object ومش null...",
            R`...وفيه [[id]] وهو string. [[in]] هو اللي بيسمح تقرا [[x.id]] بعدها...`,
            R`...وفيه [[name]] string.`,
            "قفلة.",
            "قيمة مش معروفة.",
            R`بعد الفحص، [[data.name]] مسموحة.`,
            "ليستة أدوار ثابتة.",
            R`النوع من الليستة: [["admin" | "user"]].`,
            R`guard للأدوار. [[includes]] على tuple ثابت مبتقبلش string، فبنوسّعه لـ [[readonly string[]]] الأول.`,
            "ليستة فيها undefined.",
            R`من TS 5.5، [[filter]] بفحص بسيط بيستنتج guard لوحده: الناتج [[string[]]].`
          ],
          sol: R`لما [[isUser]] ترجّع [[boolean]]: [[data.name]] جوه الـ if بيطلّع 'data' is of type 'unknown' (TS18046). الـ boolean ملوش علاقة بـ [[data]] في نظر TS، إنما [[x is User]] بتقوله «لو رجّعت true، اعتبر x ده User».

والـ assertion زي الكود تحت: بعد [[assertUser(data)]] السطر اللي بعده بيعرف إن [[data]] بقت User من غير if، والناتج [[Sara]]. ولو الداتا غلط، الدالة بترمي [[Error: مش User]] والكود اللي بعدها مش بيتنفذ. غلطة شائعة: تكتبها arrow function [[const assertUser = (x: unknown): asserts x is User => ...]] فتاخد TS2775 (Assertions require every name in the call target to be declared with an explicit type annotation). يا تكتبها function عادية، يا تدي الثابت نوع صريح.`,
          solCode: R`type User = { id: string; name: string };
function isUser(x: unknown): x is User {
  return typeof x === "object" && x !== null &&
    "id" in x && typeof x.id === "string" &&
    "name" in x && typeof x.name === "string";
}
function assertUser(x: unknown): asserts x is User {
  if (!isUser(x)) throw new Error("مش User");
}
const data: unknown = JSON.parse('{"id":"1","name":"Sara"}');
assertUser(data);
console.log(data.name); // Sara`
        }
      ]
    },
    {
      t: "Generics",
      l: 2,
      n: "دالة أو نوع بياخد النوع نفسه كباراميتر، فيشتغل مع أي حاجة من غير ما يخسر الدقة",
      items: [
        {
          cmd: "generics",
          title: "دالة واحدة تشتغل مع أي نوع ومتنساش هو إيه",
          desc: R`generic يعني النوع نفسه باراميتر. [[function first<T>(arr: T[]): T | undefined]]: لو بعتلها [[string[]]] ترجع string، ولو [[User[]]] ترجع User. الـ [[T]] بيتحدد مع كل نداء، وغالبًا TS بيستنتجه لوحده من الـ arguments.

من غير generics عندك اختيارين وحشين: دالة لكل نوع، أو [[any]] وتخسر النوع.`,
          example: R`function firstAny(arr: any[]) { return arr[0]; }
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
const a = firstAny(["x"]);                  // any: خسرنا النوع
const n = first([10, 20]);                  // number | undefined
const u = first([{ id: 1, name: "Sara" }]); // { id: number; name: string } | undefined
const s = first<string>(["a", "b"]);        // T اتكتب صريح
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}
const p = pair("age", 27);                  // [string, number]`,
          try: R`اكتب [[function last<T>(arr: T[]): T | undefined]]، وجرّبها على ليستة users وشوف المحرر بيكمّلك [[.name]] على الناتج. وبعدين غيّرها لـ [[any[]]] ولاحظ التكملة راحت.`,
          flag: "script",
          deep: {
            why: "فيه كود كتير منطقه مش فارق معاه النوع: أول عنصر، و cache، و API wrapper، و [[useState]]، و Promise. الـ generic بيخلي الكود ده مكتوب مرة واحدة، والنوع الحقيقي بيعدّي من أوله لآخره.",
            how: R`[[T]] زي متغير بس للأنواع. لما تنادي [[first([10, 20])]]، TS بيقارن الـ argument ([[number[]]]) بالباراميتر ([[T[]]]) ويستنتج إن T هي number، وبعدين يحط number مكان T في نوع الرجوع.

وكل ده وقت الفحص بس: الـ [[<T>]] بيتمسح زي باقي الأنواع، ودالة [[first]] في الـ JS دالة عادية جدًا.

وانت بتستخدم generics طول الوقت من غير ما تاخد بالك: [[Array<T>]] و [[Promise<T>]] و [[Map<K, V>]] و [[useState<T>]] و [[Record<K, V>]]. لما تكتب [[useState<User | null>(null)]] انت بتحدد T بنفسك، لأن [[null]] لوحدها مش كفاية يستنتج منها.

والاسم [[T]] عرف بس. لو فيه أكتر من واحد أو المعنى مش واضح، سمّيهم: [[TData]] و [[TError]].`,
            when: "دالة أو كلاس أو hook منطقه واحد لأنواع مختلفة: helpers للـ arrays، و fetch wrapper، و hooks زي [[useLocalStorage<T>]]، ومكونات زي [[Select<T>]].",
            mistakes: R`[[<T>]] مستخدم في مكان واحد بس زي [[function log<T>(x: T): void]]: ملوش لازمة، اكتب [[unknown]]. و generic في نوع الرجوع بس زي [[function get<T>(): T]]: ده [[as]] متنكّر، اللي بينادي بيختار T على مزاجه والدالة مبتفحصش حاجة. وفي مشروع حقيقي كان فيه [[fetchTeam<T = any>(...): Promise<T | null>]] بترجع [[(await r.json()) as T]]: شكلها آمن وهي بتصدّق أي حاجة السيرفر بعتها.`
          },
          lines: [
            R`من غير generic: [[any]] داخل و any خارج.`,
            R`[[<T>]] باراميتر نوع. اللي داخل array من T، واللي خارج T أو undefined.`,
            "نفس الكود JS بالظبط.",
            "قفلة.",
            R`[[a]] نوعها any، والمحرر مش هيساعدك.`,
            R`TS استنتج إن T هي number من الـ array.`,
            "هنا T بقى شكل الـ object كامل.",
            "ممكن تحدد T بنفسك، بس نادرًا ما تحتاج.",
            "أكتر من باراميتر نوع.",
            "بيرجع tuple.",
            "قفلة.",
            "كل مكان في الـ tuple بنوعه."
          ],
          sol: R`مع [[last<T>]] الناتج نوعه [[{ id: number; name: string } | undefined]]، فلما تكتب [[u?.]] المحرر بيكمّلك [[id]] و [[name]]. والناتج [[Omar]]، و [[last([])]] بترجع [[undefined]] (وده سبب [[| undefined]] في النوع).

مع [[any[]]] الناتج [[any]]: التكملة بتروح، وأي غلطة إملائية زي [[u.nmae]] بتعدّي من غير خطأ وترجع undefined وقت التشغيل.`,
          solCode: R`function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
const users = [{ id: 1, name: "Sara" }, { id: 2, name: "Omar" }];
const u = last(users);
console.log(u?.name); // Omar`
        },
        {
          cmd: "generic constraints",
          title: "تشترط إن النوع اللي هيتبعت فيه حاجة معينة",
          desc: R`[[<T extends { id: string }>]] معناها T أي نوع، بشرط يكون فيه [[id]] string. كده جوه الدالة تقدر تستخدم [[item.id]]، ولسه النوع الكامل بيرجع زي ما هو.

و [[<K extends keyof T>]] أشهر شرط: K لازم تكون اسم خاصية موجودة في T.`,
          example: R`function byId<T extends { id: string }>(items: T[]): Record<string, T> {
  return Object.fromEntries(items.map((it) => [it.id, it] as const));
}
const users = [{ id: "u1", name: "Sara" }, { id: "u2", name: "Omar" }];
const map = byId(users);
map["u1"]?.name;
byId([{ name: "no id" }]); // خطأ: id ناقصة
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((it) => it[key]);
}
const names = pluck(users, "name");
pluck(users, "email"); // خطأ: "email" مش من مفاتيح العنصر`,
          try: R`اكتب [[function sortBy<T, K extends keyof T>(items: T[], key: K)]] وجرّبها بـ [["name"]] وبمفتاح مش موجود. وبعدين شيل [[extends keyof T]] وشوف الأخطاء اللي هتظهر جوه الدالة.`,
          flag: "script",
          deep: {
            why: "من غير شرط، T ممكن تبقى أي حاجة حتى number، فـ TS مش هيسيبك تقرا [[item.id]] جوه الدالة. الشرط بيقول «أنا محتاج الحد الأدنى ده»، وفي نفس الوقت النوع الكامل مبيضيعش، زي ما هيحصل لو كتبت [[items: { id: string }[]]].",
            how: R`[[T extends X]] في الـ generics معناها «T لازم تكون assignable لـ X»، مش وراثة كلاسات. أي نوع فيه على الأقل شكل X يعدّي (structural typing).

الفرق بينها وبين باراميتر عادي: [[function f(items: { id: string }[])]] بترجع [[{ id: string }]] وتنسى الباقي. و [[function f<T extends { id: string }>(items: T[])]] بترجع T بكل خصايصه.

[[keyof T]] بيطلّع union أسماء الخصايص ([["id" | "name"]])، و [[K extends keyof T]] بيخلي K واحدة منهم. و [[T[K]]] (indexed access) هو نوع الخاصية دي. الاتنين مع بعض بيدّوك دوال زي [[pluck]] و [[sortBy]] و [[groupBy]] آمنة ١٠٠٪.

و [[as const]] جوه [[byId]] بيخلي [[[it.id, it]]] tuple صريح. هنا مش إجباري: لأن الـ array مكتوبة جوه النداء نفسه، TS بياخد شكلها من باراميتر [[Object.fromEntries]] ويفهمها tuple لوحده ويطلّع [[{ [k: string]: T }]]. بس لو حطيت الأزواج في متغير لوحده الأول ([[const pairs = items.map((it) => [it.id, it])]])، كل زوج نوعه هيبقى [[(string | T)[]]] والناتج any، وساعتها [[as const]] هو اللي بيصلّحها.`,
            when: "أي generic محتاج يستخدم حاجة من T جوه الدالة: [[id]] أو [[length]] أو [[createdAt]]. و [[keyof]] لأي دالة بتاخد اسم خاصية كـ string.",
            mistakes: R`تكتب [[T extends any]] أو [[T extends object]] وتفتكر ده شرط مفيد. وتكتب الباراميتر [[key: string]] بدل [[K extends keyof T]]، فأي غلطة إملائية في اسم الخاصية تعدّي وترجع undefined.`
          },
          lines: [
            R`T أي نوع بشرط فيه [[id]] string، والناتج قاموس من id للعنصر.`,
            R`مسموح نقرا [[it.id]] بسبب الشرط. و [[as const]] بيخلي الزوج tuple.`,
            "قفلة.",
            "ليستة فيها id و name.",
            R`T اتستنتج بالشكل الكامل، مش [[{ id }]] بس.`,
            R`فـ [[name]] لسه موجودة في الناتج. و [[?.]] لأن المفتاح ممكن ميكونش موجود.`,
            "object من غير id: الشرط رفضه.",
            R`K لازم تكون مفتاح من مفاتيح T، والناتج ليستة من نوع الخاصية دي ([[T[K]]]).`,
            "قراية الخاصية بالاسم.",
            "قفلة.",
            R`[[string[]]]، لأن name نوعها string.`,
            "مفتاح مش موجود."
          ],
          sol: R`[[sortBy(users, "name")]] بيرجّع [[[ 'Omar', 'Sara' ]]]، و [[sortBy(users, "email")]] بيطلّع: Argument of type '"email"' is not assignable to parameter of type '"id" | "name"' (TS2345). والمحرر بيقترحلك المفتاحين دول بس.

ولما تشيل [[extends keyof T]]، الخطأ بيتنقل لجوه الدالة: [[a[key]]] بيطلّع Type 'K' cannot be used to index type 'T' (TS2536)، لأن K بقت أي نوع، و TS مش ضامن إنها مفتاح في T.`,
          solCode: R`function sortBy<T, K extends keyof T>(items: T[], key: K): T[] {
  return [...items].sort((a, b) => (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0));
}
const users = [{ id: "u2", name: "Sara" }, { id: "u1", name: "Omar" }];
console.log(sortBy(users, "name").map((u) => u.name)); // [ 'Omar', 'Sara' ]`
        },
        {
          cmd: "generic types و defaults",
          title: "نوع بياخد نوع تاني، زي رد API شكله ثابت والداتا بتتغير",
          desc: R`الـ type والـ interface ممكن ياخدوا باراميترات أنواع زي الدوال: [[type ApiResponse<T> = { data: T }]]، وتستخدمه [[ApiResponse<User[]>]].

والباراميتر ممكن يبقى ليه قيمة افتراضية [[<T = unknown>]]، وشرط [[<T extends object>]]، زي باراميترات الدوال بالظبط.`,
          example: R`type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: string };
type Paginated<T> = { items: T[]; page: number; total: number };
type Product = { id: string; title: string; price: number };
type ProductsRes = ApiResponse<Paginated<Product>>;
function handle(res: ProductsRes) {
  if (res.ok) return res.data.items.map((p) => p.title);
  return [res.error];
}
type Box<T = string> = { value: T };
const b1: Box = { value: "hi" };
const b2: Box<number> = { value: 5 };`,
          try: R`اعمل [[type Result<T, E = string>]] يا نجاح بـ T يا فشل بـ E، واستخدمه كنوع رجوع لدالة [[parseAge(input: string): Result<number>]].`,
          flag: "script",
          deep: {
            why: "في أي API شكل الرد ثابت (data و error و pagination) والداتا بس اللي بتتغير. من غير generic type، هتكتب [[UsersResponse]] و [[ProductsResponse]] و [[OrdersResponse]] كلهم نسخ من بعض. غيّر شكل الرد مرة، وعدّل عشرين نوع.",
            how: R`[[type ApiResponse<T> = ...]] زي دالة بتشتغل على الأنواع: بتاخد T وترجع نوع. [[ApiResponse<User>]] بيبدّل كل T بـ User. ومع [[interface]] نفس الفكرة: [[interface Paginated<T> { items: T[] }]].

مع الأنواع (مش الدوال) TS مبيستنتجش T: لازم تكتبه، إلا لو فيه default. والـ default بيتكتب زي باراميترات الدوال، والباراميترات اللي ليها default لازم في الآخر.

والـ utility types اللي في المستوى ده كلها generic types مكتوبة بنفس الطريقة: [[Partial<T>]] و [[Record<K, V>]] و [[Promise<T>]].`,
            when: "شكل رد API موحّد، و pagination، و [[Result<T, E>]]، وأنواع props لكومبوننت عام زي [[Table<Row>]].",
            mistakes: R`[[type ApiResponse<T = any>]]: الـ default any بيخلي أي حد ينسى T ياخد any من غير ما يحس، خليه [[unknown]]. و generics متداخلة ٤ مستويات محدش فاهمها: سمّي الأنواع اللي في النص ([[ProductsRes]]).`
          },
          lines: [
            "رد API: يا نجاح وفيه data نوعها T، يا فشل وفيه error.",
            "صفحة من أي حاجة.",
            "شكل المنتج.",
            "generics جوه بعض: رد فيه صفحة منتجات.",
            "دالة بتستقبل الرد.",
            R`بعد [[res.ok]]، TS عارف إن [[items]] منتجات و [[p.title]] string.`,
            "فرع الفشل.",
            "قفلة.",
            "باراميتر ليه قيمة افتراضية.",
            "من غير ما تحدد، T هي string.",
            "أو تحدده."
          ],
          sol: R`الحل تحت: [[Result<number>]] معناها [[E]] أخدت الـ default بتاعها string. [[parseAge("27")]] بعد الفحص بـ [[if (r.ok)]] بتديك [[r.value + 1]] = [[28]]، و [[parseAge("abc")]] بترجع [[{ ok: false, error: '«abc» مش سن صحيح' }]].

الغلطة الشائعة: تعمل [[{ ok: boolean; value?: T; error?: E }]] object واحد. ساعتها [[if (r.ok)]] مش بتضيّق حاجة، و [[r.value]] هتفضل [[number | undefined]]. الـ union بـ [[ok: true]] و [[ok: false]] هو اللي بيخلي TS يعرف أنهي حالة.`,
          solCode: R`type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E };
function parseAge(input: string): Result<number> {
  const n = Number(input);
  if (!Number.isInteger(n) || n < 0 || n > 150) {
    return { ok: false, error: $__bt«$__{input}» مش سن صحيح$__bt };
  }
  return { ok: true, value: n };
}
const r = parseAge("27");
if (r.ok) console.log(r.value + 1); // 28
else console.log(r.error);
console.log(parseAge("abc")); // { ok: false, error: '«abc» مش سن صحيح' }`
        }
      ]
    }
  ]
});
