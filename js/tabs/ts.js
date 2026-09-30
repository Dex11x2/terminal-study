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
          title: "مقدمة TypeScript: ليه مايكروسوفت طورت TS، والفرق بين الأنواع الثابتة والديناميكية، ومميزاتها",
          desc: R`لغة [[TypeScript]] هي طبقة فوقية فائقة من جافاسكريبت ([[Superset of JavaScript]]) طورتها شركة مايكروسوفت (بقيادة أندرس هيلسبرغ مخترع لغة C#).
أي كود جافاسكريبت سليم هو بالضرورة كود تايب سكريبت سليم، لكن TS بتضيف نظام أنواع صارم وثابت ([[Static Typing]]).

ليه كل الشركات والمشاريع الحديثة بتستخدم TypeScript بدل JS العادية؟
1. اكتشاف الأخطاء فوراً وأنت بتكتب الكود ([[Compile-Time Errors]]): بدلاً من أن تكتشف Bug كارثية بعد ما ترفع الموقع للمستخدمين ويفاجئك بـ [[undefined is not a function]].
2. الإكمال التلقائي الأسطوري في المحرر ([[IntelliSense]]): بمجرد ما تضغط نقطة [[.]] محرر VS Code بيعرضلك كل الخصائص والدوال المتاحة مع أنواعها وشرحها، فمش محتاج تراجع ملفات الدوكيومنتشن كل دقيقة.
3. سهولة وتأمين التعديل على المشاريع الضخمة ([[Safe Refactoring]]): لو غيّرت اسم خاصية في كائن، تايب سكريبت هيحددلك كل الأماكن اللي محتاجة تتعدل فوراً.

الفرق بين [[Static Typing]] و [[Dynamic Typing]]:
• في JS العادية (Dynamic): المتغير ممكن يكون رقم وبعدها نصه يتقلب سترينج عادي [[let x = 10; x = "hello";]]، وده بيسبب أخطاء خفية كتيرة.
• في TS (Static): بتحدد نوع المتغير مثل [[let age: number = 25;]]، ولو حاولت تحط فيه نص المحرر هيحطلك تحته خط أحمر ويعترض فوراً قبل ما تشغل الكود.`,
          example: R`# 1. تعريف متغيرات مع إعلان النوع الصريح (Type Annotation)
let developerName: string = "سارة";
let experienceYears: number = 3;
let isFullStack: boolean = true;

# 2. تعريف دالة تأخذ مدخلات محددة وترجع ناتج بنوع مضمون
function getProfile(name: string, years: number): string {
  return "المطور: " + name + " - خبرة: " + years + " سنوات";
}

# 3. استدعاء الدالة واستقبال الناتج بأمان
const profileText = getProfile(developerName, experienceYears);
console.log(profileText);`,
          try: R`افتح موقع التجربة السريع [[typescriptlang.org/play]]، الصق الكود ده هناك. شوف إزاي المحرر عارف كل نوع. بعدين جرب تروح لسطر الاستدعاء وتكتب [[getProfile(developerName, "تلاتة")]]: هتشوف خط أحمر زجزاج ظهر فوراً تحت كلمة "تلاتة" بيقولك إن الدالة مستنية number مش string! ده سحر تايب سكريبت اللي بيحميك من الأخطاء قبل ما تحصل.`,
          flag: "script",
          deep: {
            why: R`في فرق العمل والمشاريع الكبيرة التي تحتوي على مئات الآلاف من أسطر الكود، كتابة JS عادية بتتحول لكابوس، لأن مفيش ضمان لشكل البيانات اللي بتتنقل بين المبرمجين. TypeScript بيعتبر بمثابة عقد توثيق حي ومكتوب ذاتياً (Self-documenting Code).`,
            how: R`مترجم تايب سكريبت ([[tsc]]) بيقوم بتحليل الشجرة النحوية للكود (Abstract Syntax Tree - AST) ويتأكد من تطابق الأنواع بالكامل. بعدها بيقوم بعملية حذف الأنواع (Type Erasure) لإنتاج ملف JavaScript نظيف 100% لأن المتصفحات ومحركات التشغيل بتشغل JS فقط ولا تفهم كود TS مباشرة.`,
            when: "المعيار الافتراضي لأي مشروع جديد تبدأه اليوم في React، Next.js، Angular، Node.js، أو أي مكتبة برمجية.",
            mistakes: R`تستخدم نوع [[any]] في كل مكان للهروب من الأخطاء: كتابة any بتلغي كل حماية تايب سكريبت وترجعك لنقطة الصفر في JS العادية. والافتراض بأن TS بيفحص البيانات اللي جاية من السيرفر أو مدخلات المستخدم وقت التشغيل (Runtime).`
          },
          lines: [
            "متغير نصي بنوع string صريح.",
            "متغير رقمي بنوع number صريح.",
            "متغير منطقي بنوع boolean صريح.",
            "تعريف دالة تقبل اسم (string) وسنوات خبرة (number) وترجع نصاً (string).",
            "جسم الدالة لدمج القيم وإرجاعها كنص منسق.",
            "قفلة الدالة.",
            "استدعاء الدالة وتخزين القيمة في متغير ثابت.",
            "طباعة النص المرجع في الترمنال."
          ],
          sol: R`الناتج عند تشغيل الكود:
المطور: سارة - خبرة: 3 سنوات

وعند فتح تبويب .JS في TypeScript Playground، هتشوف إن كل إعلانات الأنواع (: string, : number, : boolean) اتحذفت تماماً وأصبح كود JavaScript قياسي بسيط ونظيف.`
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
    },
    {
      t: "تطلّع أنواع من أنواع",
      l: 2,
      n: "بدل ما تكتب نفس الشكل مرتين، خده من الكود الموجود أو عدّل عليه بالـ utility types",
      items: [
        {
          cmd: "keyof و typeof و T[K]",
          title: "تاخد الأنواع من الكود الموجود بدل ما تكررها",
          desc: R`[[typeof x]] في مكان نوع بيطلّع نوع المتغير x. و [[keyof T]] بيطلّع union أسماء الخصايص. و [[T["name"]]] (indexed access) بيطلّع نوع خاصية واحدة.

التلاتة مع بعض بيخلوا الكود هو المصدر الوحيد: تغيّر الـ object، والأنواع اللي طالعة منه تتغير لوحدها.`,
          example: R`const config = { apiUrl: "https://api.example.com", retries: 3, debug: false };
type Config = typeof config;       // { apiUrl: string; retries: number; debug: boolean }
type ConfigKey = keyof Config;     // "apiUrl" | "retries" | "debug"
function getSetting<K extends ConfigKey>(key: K): Config[K] {
  return config[key];
}
const r = getSetting("retries");   // number
type User = { id: string; role: "admin" | "user"; address: { city: string } };
type Role = User["role"];          // "admin" | "user"
type City = User["address"]["city"]; // string
const ROLES = ["admin", "user", "guest"] as const;
type AnyRole = (typeof ROLES)[number]; // "admin" | "user" | "guest"`,
          try: R`ضيف خاصية [[timeout: 5000]] لـ [[config]] ولاحظ إن [[ConfigKey]] اتحدّث لوحده، و [[getSetting("timeout")]] بقى مسموح. وبعدين جرّب [[type X = typeof User]] وشوف ليه غلط.`,
          flag: "script",
          deep: {
            why: R`لو عندك object إعدادات أو ليستة ثوابت وكتبت نوعها بإيدك جنبها، هتنسى تحدّث واحد منهم. وفي مشروع حقيقي كان فيه [[role: IUser["role"]]] بدل ما يكرر union الأدوار: لو دور اتضاف في الموديل، بيوصل هنا لوحده.`,
            how: R`[[typeof]] ليه معنيين حسب المكان: في كود عادي ([[typeof x === "string"]]) ده JS بيرجع string وقت التشغيل، وفي مكان نوع ([[type C = typeof config]]) ده TS بيطلّع النوع وقت الفحص. والتاني بيشتغل على القيم بس (متغيرات ودوال و imports)، مش على الأنواع.

[[keyof T]] بيطلّع union من أسماء الخصايص كـ literals. ولو T فيها index signature زي [[{ [key: string]: number }]] الناتج [[string | number]]، لأن مفاتيح JS الرقمية بتتحول strings.

[[T[K]]] بيقرا نوع خاصية. و [[T[keyof T]]] بيطلّع union كل أنواع القيم. ومع array: [[Arr[number]]] نوع العنصر، وده اللي بيخلي [[(typeof ROLES)[number]]] يطلّع union القيم من ليستة [[as const]].`,
            when: "ثوابت وإعدادات عايز نوعها منها، وأنواع مكتبات مش مصدّرة (خدها بـ [[typeof]] أو [[ReturnType]])، وخصايص من موديل كبير زي [[User[\"role\"]]].",
            mistakes: R`[[typeof]] على نوع مش قيمة: [[typeof User]] و User نوع. و [[keyof obj]] من غير [[typeof]] فيطلع خطأ لأن obj قيمة، والصح [[keyof typeof obj]]. وتستغرب إن [[Object.keys(obj)]] مش راجعة [[keyof]] (راجع object types في المستوى ١).`
          },
          lines: [
            "object عادي في الكود.",
            R`[[typeof]] في مكان نوع: النوع بتاع config.`,
            "أسماء خصايصه كـ union.",
            "K مفتاح من المفاتيح، والناتج نوع الخاصية دي بالظبط.",
            "قراية بالمفتاح.",
            "قفلة.",
            R`[[r]] نوعها number، مش union كل الأنواع.`,
            "نوع فيه خاصية literal و object جواه.",
            R`indexed access: نوع خاصية واحدة. زي [[IUser["role"]]] في مشروع حقيقي.`,
            "ينفع تنزل جوه.",
            "ليستة ثابتة.",
            R`[[[number]]] يعني «نوع أي عنصر»: union القيم.`
          ],
          sol: R`بعد ما تضيف [[timeout: 5000]]: [[ConfigKey]] بقى [["apiUrl" | "retries" | "debug" | "timeout"]] لوحده، و [[getSetting("timeout")]] مسموح ونوعه [[number]]، من غير ما تلمس أي نوع.

و [[type X = typeof User]] بيطلّع 'User' only refers to a type, but is being used as a value here (TS2693). [[typeof]] في مكان النوع بتاخد نوع قيمة موجودة وقت التشغيل (متغير أو دالة)، و [[User]] نوع ملوش قيمة. لو عايز النوع نفسه اكتب [[type X = User]].`
        },
        {
          cmd: "Partial و Required و Readonly",
          title: "نسخة من النوع كل خصايصه اختيارية، أو إجبارية، أو للقراية بس",
          desc: R`[[Partial<T>]] بيحط [[?]] على كل خصايص T: مثالي لـ PATCH أو form بيتملي على مراحل. [[Required<T>]] العكس: بيشيل كل [[?]]. و [[Readonly<T>]] بيحط [[readonly]] على الكل.

التلاتة utility types جاهزة في TS، مش محتاج تسطّب حاجة.`,
          example: R`type User = { id: string; name: string; email: string; bio?: string };
type UserPatch = Partial<Omit<User, "id">>;
function updateUser(id: string, patch: UserPatch) {
  return { id, ...patch };
}
updateUser("u1", { name: "Sara" });
updateUser("u1", { age: 5 }); // خطأ: age مش في User
type Settings = { theme?: "light" | "dark"; lang?: "ar" | "en" };
const defaults: Required<Settings> = { theme: "light", lang: "ar" };
const frozen: Readonly<User> = { id: "1", name: "A", email: "a@example.com" };
frozen.name = "B"; // خطأ: readonly`,
          try: R`امسح [[lang]] من [[defaults]] وشوف [[Required]] بيمسكها. وبعدين اعمل [[function merge(s: Settings): Required<Settings>]] ترجّع [[{ ...defaults, ...s }]].`,
          flag: "script",
          deep: {
            why: "من غيرهم هتكتب [[UserPatch]] بإيدك نسخة من User بعلامات استفهام، وأول ما تضيف خاصية لـ User تنسى تضيفها هنا. الـ utility types بتخلي الأنواع المشتقة تتبع الأصل لوحدها.",
            how: R`دول mapped types مكتوبين في مكتبة TS نفسها (lib.es5.d.ts)، مثلًا [[type Partial<T> = { [P in keyof T]?: T[P] }]]: بيلف على كل مفتاح ويحط [[?]]. هتكتب زيهم في درس mapped types.

التلاتة سطحيين: [[Partial<User>]] بيخلي [[address]] اختيارية، بس لو موجودة لازم تبقى كاملة. لو عايز عمق محتاج نوع recursive بتكتبه انت (DeepPartial).

و [[Partial]] مع PATCH فيه فخ: [[{}]] مقبول، يعني request فاضي يعدّي. لو محتاج «حاجة واحدة على الأقل»، افحص ده في الكود (أو Zod بـ refine).

و [[Readonly]] فحص وقت الكتابة بس، ومبيعملش [[Object.freeze]].`,
            when: "[[Partial]] للتحديث الجزئي وللـ forms. و [[Required]] للإعدادات بعد ما تدمج الافتراضي. و [[Readonly]] للـ state والـ props اللي مينفعش تتعدّل.",
            mistakes: R`[[Partial<User>]] لـ PATCH ومعاه [[id]] و [[createdAt]]: العميل يقدر يبعت id جديد. شيلهم بـ [[Omit]] الأول. وتفتكر إن Partial عميق.`
          },
          lines: [
            "موديل فيه خاصية اختيارية.",
            R`كل الخصايص اختيارية ما عدا id اللي اتشال خالص ([[Omit]] في الدرس الجاي).`,
            "تحديث جزئي.",
            "دمج بسيط.",
            "قفلة.",
            "ابعت اللي اتغير بس.",
            "خاصية مش موجودة: مرفوضة.",
            "إعدادات كلها اختيارية.",
            R`القيم الافتراضية لازم تغطي كل حاجة، فبنستخدم [[Required]].`,
            "نسخة للقراية بس.",
            "ممنوع التعديل."
          ],
          sol: R`بعد ما تمسح [[lang]]: Property 'lang' is missing in type '{ theme: "light"; }' but required in type 'Required<Settings>' (TS2741).

والـ merge زي الكود تحت: [[merge({ theme: "dark" })]] بترجع [[{ theme: 'dark', lang: 'ar' }]]. الفخ: [[merge({ lang: undefined })]] بترجع [[{ theme: 'light', lang: undefined }]]، لأن الـ spread بيكتب undefined فوق الـ default، و TS ساكت مع إن النوع بيقول Required. الإعداد [[exactOptionalPropertyTypes]] بيمسكها (TS2379)، وهو موجود في الـ tsconfig اللي [[tsc --init]] بيعمله في TS 7.`,
          solCode: R`type Settings = { theme?: "light" | "dark"; lang?: "ar" | "en" };
const defaults: Required<Settings> = { theme: "light", lang: "ar" };
function merge(s: Settings): Required<Settings> {
  return { ...defaults, ...s };
}
console.log(merge({ theme: "dark" })); // { theme: 'dark', lang: 'ar' }`
        },
        {
          cmd: "Pick و Omit و Record",
          title: "تاخد جزء من نوع، أو تعمل قاموس مفاتيحه معروفة",
          desc: R`[[Pick<User, "id" | "name">]] نوع فيه الخاصيتين دول بس. و [[Omit<User, "password">]] كل حاجة ما عدا password. و [[Record<K, V>]] object مفاتيحه من نوع K وقيمه من نوع V: [[Record<Role, string[]>]] لازم فيه مفتاح لكل دور.`,
          example: R`type Role = "admin" | "editor" | "viewer";
type User = { id: string; name: string; email: string; password: string; role: Role };
type PublicUser = Omit<User, "password">;
type UserPreview = Pick<User, "id" | "name">;
type NewUser = Omit<User, "id">;
const permissions: Record<Role, string[]> = {
  admin: ["*"],
  editor: ["posts:write"],
  viewer: ["posts:read"],
};
const cache: Record<string, UserPreview> = {};
const labels: Record<Role, string> = { admin: "مدير", editor: "محرر" }; // خطأ: viewer ناقص`,
          try: R`ضيف دور [[owner]] لـ [[Role]] وشوف كل الـ Records اللي محتاجة تتحدّث. وبعدين جرّب [[Omit<User, "pasword">]] بغلطة إملائية ولاحظ إن TS مش بيعترض.`,
          flag: "script",
          deep: {
            why: "الموديل الواحد بيطلع منه أشكال كتير: اللي بيرجع للـ client من غير password، واللي بيتبعت في الإنشاء من غير id، واللي في القوايم فيه حاجتين بس. لو كتبتهم بإيدك، كل تعديل في الموديل يتعمل في خمس أماكن.",
            how: R`[[Pick<T, K>]] بياخد K من مفاتيح T بس ([[K extends keyof T]])، فأي اسم غلط يطلع خطأ. [[Omit<T, K>]] معمول بـ [[Pick<T, Exclude<keyof T, K>>]]، و K فيه مش مقيد بمفاتيح T ([[K extends keyof any]])، فغلطة إملائية في اسم الخاصية مش بتطلع خطأ، والخاصية اللي كنت عايز تشيلها بتفضل موجودة.

[[Record<K, V>]] هو [[{ [P in K]: V }]]. لو K union literals، كل مفتاح إجباري (بيمسك الناقص). لو K هي [[string]]، أي مفتاح مسموح، وقراية مفتاح مش موجود نوعها V مش [[V | undefined]]، إلا لو شغّلت [[noUncheckedIndexedAccess]].

و [[Omit]] على union مبيتوزعش على أعضائه: [[Omit<A | B, "x">]] بيطلّع المفاتيح المشتركة بس، وتخسر الـ discriminated union. ده فخ متقدم بس بيحصل.`,
            when: "[[Omit]] لإخفاء حاجات حساسة وللـ create DTOs. و [[Pick]] لأشكال صغيرة للقوايم. و [[Record]] لأي قاموس: الصلاحيات حسب الدور، والترجمات، والـ cache.",
            mistakes: R`تفتكر إن [[Omit<User, "password">]] بيشيل الـ password من الداتا نفسها: النوع بيتمسح، والـ password لسه في الـ object لو مشلتهاش بإيدك أو بـ select. وغلطة إملائية في Omit محدش بيمسكها. و [[Record<string, any>]] كنوع لكل حاجة: ده any بشكل تاني.`
          },
          lines: [
            "الأدوار.",
            "موديل كامل فيه password.",
            "كل حاجة ما عدا password: ده اللي يرجع للـ client.",
            "حاجتين بس للقوايم.",
            "للإنشاء: الـ id بيتعمل في القاعدة.",
            "قاموس مفتاحه دور وقيمته ليستة صلاحيات.",
            "كل دور...",
            "...لازم...",
            "...يبقى موجود.",
            "قفلة.",
            R`[[Record<string, T>]]: أي مفتاح string (cache بالـ id مثلًا).`,
            R`[[Record<Role, ...>]] بيمسك الدور الناقص: لو ضفت دور جديد، كل القواميس دي تطلّع خطأ.`
          ],
          sol: R`بعد ما تضيف [[owner]]: [[permissions]] و [[labels]] بيطلّعوا Property 'owner' is missing in type ... but required in type 'Record<Role, ...>' (TS2741). و [[cache]] مش بيتأثر لأن مفاتيحه [[string]]. (و [[labels]] كان فيها خطأ [[viewer]] من الأول.) يعني [[Record<Role, ...>]] بيجبرك تفتكر كل مكان لازم يتحدّث.

و [[Omit<User, "pasword">]] مش بيطلّع ولا خطأ، والنوع الناتج لسه فيه [[password]]. [[Omit]] بتقبل أي string كمفتاح، فالغلطة الإملائية بتسرّب الباسورد في [[PublicUser]]. [[Pick]] بقى بتمسكها، لأنها بتشترط [[K extends keyof T]].`
        },
        {
          cmd: "ReturnType و Parameters و Awaited",
          title: "نوع اللي دالة بترجعه أو بتاخده، من غير ما تكتبه بإيدك",
          desc: R`[[ReturnType<typeof fn>]] نوع اللي الدالة بترجعه، و [[Parameters<typeof fn>]] tuple باراميتراتها، و [[Awaited<T>]] بيفك الـ Promise: [[Awaited<Promise<User>>]] هو User.

مفيدين جدًا مع دوال مكتبات مش مصدّرة أنواعها، ومع دوال async بتاعتك: [[Awaited<ReturnType<typeof getUser>>]] هو شكل اللي هترجعه بعد await.`,
          example: R`async function getDashboard(userId: string) {
  return { userId, stats: { orders: 12, revenue: 3400 }, updatedAt: new Date() };
}
type DashboardPromise = ReturnType<typeof getDashboard>; // Promise<{ ... }>
type Dashboard = Awaited<DashboardPromise>;               // الشكل من غير Promise
type Args = Parameters<typeof getDashboard>;              // [userId: string]
function renderStats(d: Dashboard) {
  return $__btorders: $__{d.stats.orders}$__bt;
}
function logCall(...args: Args) {
  console.log("getDashboard", args[0]);
}
type Timer = ReturnType<typeof setTimeout>;`,
          try: R`ضيف خاصية [[unread: 3]] جوه [[stats]] في الدالة، واكتب [[d.stats.unread]] في [[renderStats]]: هتلاقيها متاحة من غير ما تعدّل أي نوع.`,
          flag: "script",
          deep: {
            why: "كتير النوع موجود فعلًا بس مش متصدّر: دالة من مكتبة بترجع object معقد، أو دالة بتاعتك نوعها متستنتج. بدل ما تنسخه بإيدك (ويتقادم)، بتطلّعه من الدالة نفسها.",
            how: R`التلاتة conditional types بـ [[infer]] (آخر درس في الكاتيجوري دي). [[ReturnType<T>]] تقريبًا [[T extends (...args: any) => infer R ? R : any]]: «لو T دالة، هات نوع اللي بترجعه».

محتاجين نوع الدالة مش الدالة: [[ReturnType<getDashboard>]] غلط لأن getDashboard قيمة، والصح [[ReturnType<typeof getDashboard>]].

[[Awaited<T>]] بيفك Promises متداخلة كمان ([[Promise<Promise<X>>]] يبقى X)، وده نفس اللي [[await]] بيعمله وقت التشغيل. من غيره، [[ReturnType]] لدالة async بيدّيك [[Promise<...>]] وانت عايز الداتا.

وفيه كمان [[ConstructorParameters]] و [[InstanceType]] للكلاسات، بنفس الفكرة.`,
            when: "نوع ناتج دالة Prisma أو Supabase أو أي query معقد، وأنواع الـ timers، ولما تعمل wrapper لدالة (retry أو logging) بنفس باراميتراتها.",
            mistakes: R`تنسى [[typeof]] جوه [[ReturnType]]. وتستخدم [[ReturnType]] لدالة async وتستنى الداتا نفسها، فتلاقي [[Promise]]: ضيف [[Awaited]]. وتعتمد على نوع متستنتج من دالة بتتغير كتير كأنه API ثابت، فأي تعديل فيها يكسر أماكن بعيدة: اكتب نوع الرجوع صريح في الدوال المهمة.`
          },
          lines: [
            "دالة async نوع رجوعها متستنتج ومحدش كتبه.",
            "بترجع object فيه stats و Date.",
            "قفلة.",
            "النوع اللي راجع من الدالة: Promise لأنها async.",
            R`[[Awaited]] فك الـ Promise: ده شكل الداتا بعد await.`,
            "باراميترات الدالة كـ tuple.",
            "دالة بتاخد الداتا من غير ما حد يكتب نوعها.",
            "TS عارف إن orders رقم.",
            "قفلة.",
            "نفس باراميترات الدالة الأصلية بالظبط.",
            R`[[args[0]]] نوعها string.`,
            "قفلة.",
            "الكلاسيكية: نوع الـ timer بيفرق بين Node والمتصفح، فخده من الدالة نفسها."
          ],
          sol: R`بعد ما تضيف [[unread: 3]] جوه [[stats]]، [[d.stats.unread]] بيبقى متاح في [[renderStats]] ونوعه [[number]] من غير ما تغيّر [[Dashboard]]. لأن [[Dashboard]] متحسب من الدالة نفسها: [[Awaited<ReturnType<typeof getDashboard>>]].

ولو شغلت [[renderStats(await getDashboard("u1"))]] بعد ما تزوّد [[unread]] في الـ template هتاخد [[orders: 12, unread: 3]]. ولو لقيت Property 'unread' does not exist، يبقى انت كاتب نوع [[Dashboard]] بإيدك في حتة تانية بدل ما تشتقه.`
        },
        {
          cmd: "mapped types",
          title: "تلف على مفاتيح نوع وتعمل منه نوع جديد",
          desc: R`mapped type بيلف على مفاتيح: [[{ [K in keyof T]: ... }]]. كده تقدر تعمل نسخة من أي نوع بنفس المفاتيح وأنواع مختلفة، زي نوع أخطاء الـ form: لكل حقل رسالة خطأ اختيارية.

وبـ [[as]] جوه المفتاح تقدر تغيّر الأسماء نفسها (key remapping)، زي تحويل [[age]] لـ [[setAge]].`,
          example: R`type SignupForm = { email: string; password: string; age: number };
type FormErrors<T> = { [K in keyof T]?: string };
type Touched<T> = { [K in keyof T]: boolean };
const errors: FormErrors<SignupForm> = { email: "إيميل غلط" };
const touched: Touched<SignupForm> = { email: true, password: false, age: false };
const bad: Touched<SignupForm> = { email: true }; // خطأ: password و age ناقصين
type Setters<T> = {
  [K in keyof T as $__btset$__{Capitalize<string & K>}$__bt]: (value: T[K]) => void;
};
type FormSetters = Setters<SignupForm>;
// { setEmail: (value: string) => void; setPassword: ...; setAge: (value: number) => void }`,
          try: R`ضيف حقل [[phone: string]] لـ [[SignupForm]] ولاحظ إن [[touched]] بقى ناقص حقل، و [[FormSetters]] بقى فيه [[setPhone]] لوحده.`,
          flag: "script",
          deep: {
            why: "أي نوع مرتبط بنوع تاني «لكل حقل حاجة»: أخطاء الـ validation، وحالة touched، وقيم أولية، وصلاحيات لكل عمود. لو كتبتهم بإيدك، كل حقل جديد محتاج يتضاف في ٤ أنواع. الـ mapped type بيربطهم بالأصل.",
            how: R`[[[K in keyof T]]] زي for loop على الأنواع: K بياخد كل مفتاح من union المفاتيح، والقيمة بتتحسب لكل واحد. وتقدر تستخدم [[T[K]]] عشان توصل لنوع الحقل الأصلي.

المعدّلات: [[?]] تضيف اختياري، و [[-?]] تشيله (كده [[Required]] معمول)، و [[readonly]] و [[-readonly]] بنفس الشكل.

و [[as]] بعد المفتاح بيغيّر اسمه، ومعاه template literal types و [[Capitalize]] بتعمل أسماء جديدة. ولو الاسم الجديد [[never]]، المفتاح بيتشال: [[as T[K] extends Function ? never : K]] بيشيل كل الـ methods.

و [[Partial]] و [[Required]] و [[Readonly]] و [[Record]] كلهم mapped types مكتوبين كده في lib.es5.d.ts.`,
            when: "أنواع الـ forms (errors و touched)، وأنواع مشتقة من موديل (كل الحقول optional أو nullable)، وأسماء setters أو events. في كود التطبيق العادي هتستخدم الجاهز (Partial و Record) أكتر ما تكتب بنفسك.",
            mistakes: R`mapped types معقدة في كود التطبيق محدش في الفريق يقدر يقراها: لو نوع عادي بيوصل لنفس النتيجة، اكتبه. ونسيان [[string & K]] مع [[Capitalize]]، لأن مفاتيح keyof ممكن تبقى number أو symbol.`
          },
          lines: [
            "شكل form.",
            "لكل حقل في T، رسالة خطأ اختيارية.",
            "لكل حقل، boolean إجباري.",
            "مفيش غير خطأ الإيميل، ومقبول لأن كله اختياري.",
            "لازم كل الحقول.",
            R`ناقص حقول، و [[Touched]] مش اختياري: خطأ.`,
            "نوع بيغيّر أسماء المفاتيح.",
            R`[[as]] بيعيد تسمية كل مفتاح ([[age]] بقت [[setAge]])، والقيمة دالة بتاخد نوع الحقل ([[T[K]]]).`,
            "قفلة.",
            R`الناتج فيه [[setEmail]] و [[setPassword]] و [[setAge]]، كل واحدة بنوعها.`
          ],
          sol: R`بعد ما تضيف [[phone: string]]: [[touched]] بيطلّع Property 'phone' is missing in type '{ email: true; password: false; age: false; }' but required in type 'Touched<SignupForm>'. و [[errors]] مبيطلعش خطأ، لأن [[FormErrors]] كل خصايصه اختيارية بـ [[?]].

و [[FormSetters]] لو حطيت الماوس عليه هتلاقي [[setPhone: (value: string) => void]] اتضافت لوحدها. لو ظهرت [[setphone]] بحرف صغير، انت ناسي [[Capitalize]].`
        },
        {
          cmd: "conditional types",
          title: "نوع بيتغير حسب شرط، وأنواع جاهزة مبنية على الفكرة دي",
          desc: R`[[T extends string ? "yes" : "no"]] زي ternary بس للأنواع. ولما T تبقى union، الشرط بيتطبق على كل عضو لوحده (distributive)، وده اللي عامل [[Exclude]] و [[Extract]]. (و [[NonNullable]] بيوصل لنفس النتيجة، بس حاليًا معمول [[T & {}]].)

و [[infer]] جوه الشرط بيطلّع نوع من جوه نوع تاني، زي نوع العنصر من array أو نوع الداتا من Promise.`,
          example: R`type IsString<T> = T extends string ? "yes" : "no";
type A = IsString<"hi">;                           // "yes"
type B = IsString<42>;                             // "no"
type Status = "idle" | "loading" | "success" | "error";
type Done = Exclude<Status, "idle" | "loading">;   // "success" | "error"
type Busy = Extract<Status, "loading">;            // "loading"
type MaybeUser = { name: string } | null | undefined;
type SureUser = NonNullable<MaybeUser>;            // { name: string }
type ElementOf<T> = T extends (infer E)[] ? E : never;
type N = ElementOf<number[]>;                      // number
type Unwrap<T> = T extends Promise<infer V> ? V : T;
type U = Unwrap<Promise<string>>;                  // string`,
          try: R`اكتب [[type ArgOf<F> = F extends (arg: infer A) => any ? A : never]] وجرّبه على [[(x: number) => void]]. وبعدين جرّب [[Exclude<Status, "idel">]] بغلطة إملائية وشوف إن مفيش خطأ.`,
          flag: "script",
          deep: {
            why: "في كود التطبيق هتستخدم الجاهز منهم أكتر ما تكتب: [[NonNullable]] بعد فحص null، و [[Exclude]] عشان تشيل حالة من union، و [[ReturnType]] و [[Awaited]] اللي هما conditional types. وفهم الفكرة بيخليك تقرا أنواع المكتبات وتفهم رسايل الأخطاء الطويلة.",
            how: R`الشكل [[T extends U ? X : Y]]: لو T assignable لـ U يبقى X، غير كده Y. الشرط بيتحسب وقت الفحص، ومفيش حاجة منه في الـ JS.

لما T باراميتر generic ويتبعتله union، الشرط بيتوزع (distributive): [[IsString<"a" | 1>]] بيبقى [[IsString<"a"> | IsString<1>]] يعني [["yes" | "no"]]. وده سر [[Exclude<T, U> = T extends U ? never : T]]: كل عضو بيطابق U بيبقى never، و never بيختفي من الـ union. و [[NonNullable<T>]] حاليًا معمول [[T & {}]]، ونفس النتيجة: بيشيل null و undefined.

[[infer]] بيعلن متغير نوع جوه الشرط، و TS بيملاه من المطابقة. ده اللي عاملين بيه [[ReturnType]] و [[Parameters]] و [[Awaited]].

ولو مش عايز التوزيع، حط الاتنين بين أقواس مربعة: [[[T] extends [string] ? X : Y]].`,
            when: "[[NonNullable]] و [[Exclude]] و [[Extract]] في كود عادي. وتكتب conditional type بنفسك نادرًا: في مكتبة، أو helper نوع بيتكرر في المشروع.",
            mistakes: R`[[Exclude]] على object type وتستنى يشيل خاصية: ده بيشيل أعضاء من union، و [[Omit]] هو اللي بيشيل خصايص. وغلطة إملائية في Exclude مش بتطلّع خطأ. و conditional types متداخلة ٥ مستويات في كود التطبيق.`
          },
          lines: [
            R`لو T جزء من string يبقى [["yes"]]، غير كده [["no"]].`,
            R`[["hi"]] string، فالناتج yes.`,
            "42 مش string، فالناتج no.",
            "union حالات.",
            R`[[Exclude]]: شيل الحالتين دول.`,
            R`[[Extract]]: خلّي اللي بيطابق بس.`,
            "نوع ممكن يبقى null أو undefined.",
            R`[[NonNullable]]: شيل null و undefined.`,
            R`[[infer E]]: «لو T array، سمّي نوع العنصر E ورجّعه».`,
            R`[[number]].`,
            R`نفس الفكرة مع Promise (ده تقريبًا [[Awaited]]).`,
            R`[[string]].`
          ],
          sol: R`[[ArgOf<(x: number) => void>]] بيطلع [[number]]، لأن [[infer A]] بتمسك نوع الباراميتر. ولو جربته على حاجة مش دالة زي [[ArgOf<string>]] بيطلع [[never]].

و [[Exclude<Status, "idel">]] مش بيطلّع خطأ، والناتج هو الأربع حالات زي ما هم [["idle" | "loading" | "success" | "error"]]، لأن مفيش حاجة اسمها idel تتشال. [[Exclude]] مش بتشترط إن اللي بتشيله موجود. لو عايز حماية، اعمل نسخة بتاعتك: [[type StrictExclude<T, U extends T> = Exclude<T, U>]].`,
          solCode: R`type ArgOf<F> = F extends (arg: infer A) => any ? A : never;
type X = ArgOf<(x: number) => void>; // number
type Status = "idle" | "loading" | "success" | "error";
type StrictExclude<T, U extends T> = Exclude<T, U>;
type Done = StrictExclude<Status, "idle" | "loading">; // "success" | "error"
// type Bad = StrictExclude<Status, "idel">; // خطأ: "idel" مش من Status`
        }
      ]
    },
    {
      t: "تقول لـ TS حاجة هو مش عارفها",
      l: 2,
      n: "as const و satisfies آمنين، و as و ! مسؤوليتك انت، و .d.ts لمكتبات من غير أنواع",
      items: [
        {
          cmd: "as const",
          title: "تثبّت القيم بدل ما TS يوسّعها لـ string و number",
          desc: R`[[as const]] بعد object أو array بيقول لـ TS: «دي قيم ثابتة». كل الخصايص تبقى [[readonly]]، والقيم تفضل literals ([["GET"]] مش string)، والـ arrays تبقى tuples للقراية بس.

ده مش كذب على الـ compiler زي [[as]] العادية: هو بس بيمنع الـ widening، وأي تعديل بعد كده يطلع خطأ.`,
          example: R`const routes = { home: "/", login: "/login", admin: "/admin" } as const;
type Path = (typeof routes)[keyof typeof routes]; // "/" | "/login" | "/admin"
const methods = ["GET", "POST"] as const;
type Method = (typeof methods)[number];           // "GET" | "POST"
routes.home = "/home"; // خطأ: readonly
function go(path: Path) { return path; }
go(routes.login);
go("/signup"); // خطأ: مش من الـ routes
const loose = { method: "GET" };
function send(m: Method) { return m; }
send(loose.method); // خطأ: string أوسع من Method`,
          try: R`ضيف [[as const]] على [[loose]] وشوف الخطأ الأخير اختفى. وبعدين حاول تعمل [[methods.push("PUT")]].`,
          flag: "script",
          deep: {
            why: "ثوابت المشروع (مسارات، وأدوار، وحالات، ومفاتيح إعدادات) محتاجها قيم وقت التشغيل وأنواع وقت الكتابة. [[as const]] بيخليك تكتبها مرة واحدة كقيمة، وتطلّع منها النوع.",
            how: R`TS عادةً بيوسّع (widening) الـ literals في الأماكن اللي ممكن تتغير: خصايص الـ objects وعناصر الـ arrays. [[{ method: "GET" }]] نوعها [[{ method: string }]] لأن ممكن تكتب [[obj.method = "PUT"]] بعدين.

[[as const]] (const assertion) بيقول: متوسّعش. النتيجة: كل الخصايص [[readonly]] وبعمق، والقيم literals، والـ arrays [[readonly]] tuples. وده مش [[Object.freeze]]: وقت التشغيل الـ object عادي وممكن يتعدّل لو حد تجاهل الأنواع.

ومع [[typeof]] و [[keyof]] و [[[number]]] بتطلّع unions من القيم: [[(typeof routes)[keyof typeof routes]]] و [[(typeof methods)[number]]].

ومن TS 5.0 فيه [[const]] type parameters ([[function f<const T>(x: T)]]) بتعمل نفس الأثر على الـ arguments من غير ما اللي بينادي يكتب [[as const]].`,
            when: "ثوابت بتتستخدم كقيم وأنواع مع بعض، وبدل enum. وقيم بترجع من hook كـ tuple ([[return [value, setValue] as const]]).",
            mistakes: R`تفتكر إن [[as const]] زي [[as SomeType]]: التانية بتكذب على TS، الأولى لأ. وتستخدمه على object هيتعدّل فعلًا (state مثلًا)، فكل تعديل يطلع خطأ readonly.`
          },
          lines: [
            "object مسارات ثابت.",
            "union كل القيم من الـ object.",
            "tuple ثابت.",
            "union عناصره.",
            R`[[as const]] خلّى الخصايص readonly.`,
            "دالة بتقبل مسار معروف بس.",
            "من الـ object: مقبول.",
            "مسار مكتوب بإيدك ومش موجود: مرفوض.",
            R`من غير [[as const]]: نوع [[method]] بقى string.`,
            "دالة مستنية Method.",
            R`string مش مقبولة مكان [["GET" | "POST"]].`
          ],
          sol: R`بعد [[const loose = { method: "GET" } as const]]، نوع [[loose.method]] بقى [["GET"]] مش string، فـ [[send(loose.method)]] بيعدّي.

و [[methods.push("PUT")]] بيطلّع Property 'push' does not exist on type 'readonly ["GET", "POST"]' (TS2339). [[as const]] بيخلي الـ array tuple للقراية بس. ولاحظ إن الحماية دي من TS بس: وقت التشغيل الـ array عادي و push موجودة، فلو عايز تمنعها فعلًا استخدم [[Object.freeze]].`
        },
        {
          cmd: "satisfies",
          title: "تتأكد إن القيمة ماشية مع نوع، من غير ما تخسر نوعها الدقيق",
          desc: R`[[value satisfies Type]] بيفحص إن القيمة مطابقة للنوع، بس سايب نوعها المستنتج زي ما هو. عكس [[const x: Type = value]] اللي بيخلي النوع هو Type ويضيّع التفاصيل.

مثالي للإعدادات والقواميس: عايز TS يمسك مفتاح ناقص أو قيمة غلط، وعايز كمان يعرف القيم بالظبط.`,
          example: R`type Theme = Record<"primary" | "danger", string | [number, number, number]>;
const annotated: Theme = { primary: "#0af", danger: [255, 0, 0] };
annotated.primary.toUpperCase(); // خطأ: ممكن تبقى tuple
const checked = {
  primary: "#0af",
  danger: [255, 0, 0],
} satisfies Theme;
checked.primary.toUpperCase();
checked.danger.map((c) => c / 255);
const bad = { primary: "#0af" } satisfies Theme; // خطأ: danger ناقصة`,
          try: R`ضيف مفتاح [[secondary]] لـ [[checked]] وشوف [[satisfies]] بيرفضه. وبعدين جرّب [[as Theme]] بدل [[satisfies Theme]] في آخر سطر ولاحظ إن الخطأ اختفى، وده بالظبط خطر [[as]].`,
          flag: "script",
          deep: {
            why: "في مشروع حقيقي فيه ملفات إعدادات وقواميس كتير: routes، وألوان، وترجمات، وصلاحيات. عايز تمسك الغلط فيها (مفتاح ناقص أو اسم غلط)، من غير ما النوع يبقى عام لدرجة إنك تعمل cast كل ما تستخدمها. قبل TS 4.9 كان لازم تختار واحدة من الاتنين.",
            how: R`فيه ٣ طرق تربط قيمة بنوع، وكل واحدة مختلفة:

[[const x: T = v]] (annotation): بيفحص إن v مطابقة لـ T، ونوع x بقى T. أي تفاصيل أدق بتضيع.

[[const x = v as T]] (assertion): مبيفحصش بجد، بيقول «اعتبرها T» طالما مش مستحيلة تمامًا. خطر.

[[const x = v satisfies T]]: بيفحص زي الـ annotation بالظبط (وكمان الخصايص الزيادة)، بس نوع x هو النوع المستنتج من v. فتكسب الاتنين.

ومع [[as const]]: [[{ ... } as const satisfies Config]] بيثبّت القيم ويفحصها في نفس الوقت.

وفي Prisma هتلاقي النمط ده في الـ docs: [[{ select: { id: true } } satisfies Prisma.UserDefaultArgs]]، فالـ args بتتفحص، ونوعها الدقيق بيروح لـ [[GetPayload]] (المستوى ٣).`,
            when: "إعدادات و routes و themes وقواميس ترجمة، و Prisma select و include، وأي object عايز تتأكد من شكله ومحتاج نوعه الدقيق بعدين.",
            mistakes: R`تستخدم [[as]] مكان [[satisfies]] عشان «بيعمل نفس الحاجة»: لأ، as بيسكّت الأخطاء. وتفتكر إن satisfies بيغيّر حاجة وقت التشغيل: بيتمسح زي أي نوع.`
          },
          lines: [
            "كل لون يا string يا tuple RGB.",
            "بـ annotation: النوع بقى Theme، والتفاصيل ضاعت.",
            "TS مش فاكر إن primary كانت string.",
            "نفس الـ object...",
            "...string...",
            "...و tuple...",
            R`...بـ [[satisfies]]: اتفحص على Theme، والنوع الدقيق فضل.`,
            "TS عارف إن primary هنا string.",
            "وإن danger هنا tuple أرقام.",
            "وبرضه بيمسك المفتاح الناقص زي الـ annotation."
          ],
          sol: R`[[secondary: "#333"]] في [[checked]] بيطلّع Object literal may only specify known properties, and 'secondary' does not exist in type 'Theme' (TS2353). [[satisfies]] بيفحص الشكل كامل: مفاتيح زيادة أو ناقصة.

ولما تكتب [[{ primary: "#0af" } as Theme]] الخطأ بتاع [[danger]] الناقصة بيختفي. [[as]] بيقبل أي حاجة «قريبة كفاية» من النوع، ولو طبعت [[bad.danger]] هتاخد [[undefined]] مع إن النوع بيقول string أو tuple، وده بالظبط الـ bug اللي [[satisfies]] كان هيمنعه.`
        },
        {
          cmd: "as",
          title: "تقول للـ compiler «ثق فيا، أنا عارف النوع»",
          desc: R`[[value as User]] (type assertion) بيغيّر نوع القيمة في عين TS من غير أي فحص وقت التشغيل. لو كنت غلطان، مفيش خطأ دلوقتي، والـ crash بعدين في مكان تاني.

الاستخدامات المقبولة قليلة: عنصر DOM انت متأكد من نوعه، أو بعد فحص TS مش قادر يفهمه. وأي داتا من برّه (API و JSON و req.body) مكانها التحقق الحقيقي (Zod) مش [[as]].`,
          example: R`type User = { id: string; name: string };
const input = document.getElementById("email") as HTMLInputElement;
input.value = "you@example.com";
const user = JSON.parse('{"id": 1}') as User;
console.log(user.name.toUpperCase()); // TypeError وقت التشغيل
const n = "5" as number; // خطأ: Conversion of type 'string' to type 'number' may be a mistake
const forced = "5" as unknown as number;
console.log(forced.toFixed(2)); // TypeError برضه`,
          try: R`غيّر السطر الرابع لـ [[const user: unknown = JSON.parse('{"id": 1}')]] وحاول تقرا [[user.name]]: TS هيجبرك تفحص. وبعدين دوّر في مشروعك بـ [[grep -rn "as unknown as" src]] وشوف كام واحدة.`,
          flag: "script",
          deep: {
            why: "TS مش دايمًا عارف كل حاجة: [[getElementById]] ممكن ترجع أي عنصر، و [[JSON.parse]] بترجع any. و [[as]] موجود عشان تقوله معلومة هو ناقصها. المشكلة إنه بيتستخدم كتير بمعنى «اسكت» بدل «أنا متأكد».",
            how: R`[[as T]] مبيطلّعش أي كود: بيتمسح، والقيمة زي ما هي. و TS بيسمح بيه طالما النوعين «ممكن يتقابلوا» (comparable: شبه assignable في أي اتجاه بس أرخى، مثلًا لو خاصية نوعها union يكفي إن عضو واحد منه يطابق، عشان كده [[{ primary: "#0af" } as Theme]] في درس satisfies عدّى من غير خطأ)، فـ [[HTMLElement as HTMLInputElement]] مسموح لأن input نوع من HTMLElement، و [[string as number]] ممنوع.

[[as unknown as T]] بيعدّي الحماية دي: أي حاجة تتحول لـ unknown، و unknown تتحول لأي حاجة. وفي مشروع حقيقي كان فيه [[(data ?? []) as unknown as DbRow[]]] على نتيجة query: لو شكل الجدول اتغير، TS مش هيقول، والصفحة تقع.

وفيه شكل قديم [[<User>value]] بيعمل نفس الحاجة، بس مبيشتغلش في ملفات .tsx لأنه بيتلخبط مع JSX.

البدائل الأأمن بالترتيب: narrowing بفحص حقيقي، أو type guard، أو Zod للداتا الخارجية، أو [[satisfies]] لو عايز تتأكد من شكل قيمة انت كاتبها.`,
            when: "عناصر DOM لما تكون متأكد (أو [[querySelector<HTMLInputElement>]] مع فحص null)، و mocks في الاختبارات، وبعد فحص TS مش بيفهمه. غير كده، دوّر على بديل.",
            mistakes: R`[[await res.json() as User]] و [[req.body as {...}]]: الاتنين موجودين في مشاريع حقيقية، والاتنين بيصدّقوا أي داتا جاية من برّه. و [[as any]] عشان error يختفي: كده خبّيت الـ bug مش صلّحته. وفي الانترفيو: «as بيحوّل القيمة» غلط، مبيحوّلش أي حاجة وقت التشغيل.`
          },
          lines: [
            "النوع.",
            R`[[getElementById]] بترجع [[HTMLElement | null]]، و as بيقول «ده input وموجود». لو الـ id غلط، هيقع.`,
            "TS دلوقتي فاكر إن فيه value.",
            "أخطر استخدام: داتا من برّه. مفيش أي فحص، و id هنا رقم أصلًا.",
            "TS ساكت، ووقت التشغيل: Cannot read properties of undefined.",
            "as مبيسمحش بتحويل بين نوعين ملهمش علاقة ببعض.",
            R`بس [[as unknown as]] بتعدّي أي حاجة لأي حاجة: علامة إن فيه حاجة غلط.`,
            "string على إنها number، والنتيجة crash."
          ],
          sol: R`مع [[const user: unknown]]، [[user.name]] بيطلّع 'user' is of type 'unknown' (TS18046). لازم تفحص قبلها، زي الكود تحت، والناتج [[الداتا مفيهاش name]] بدل الـ TypeError اللي كان بيحصل مع [[as User]].

و [[grep -rn "as unknown as" src]]: كل سطر بيطلع هو مكان كسرت فيه فحص TS مرتين. لو مطلعش حاجة ممتاز، ولو لقيت كتير غالبًا عند API responses أو mocks في الاختبارات. الأولى تتصلح بـ Zod (المستوى ٣)، والتانية مقبولة أكتر.`,
          solCode: R`const user: unknown = JSON.parse('{"id": 1}');
if (typeof user === "object" && user !== null && "name" in user && typeof user.name === "string") {
  console.log(user.name.toUpperCase());
} else {
  console.log("الداتا مفيهاش name");
}`
        },
        {
          cmd: "! (non-null)",
          title: "علامة التعجب بعد القيمة، وليه تبعد عنها",
          desc: R`[[value!]] (non-null assertion) بتقول لـ TS «القيمة دي مش null ولا undefined، ثق فيا». بتشيل الخطأ، بس مبتعملش أي فحص: لو القيمة فعلًا undefined، الكود هيقع وقت التشغيل.

البديل تقريبًا دايمًا أحسن: فحص صريح بـ if مع رسالة خطأ واضحة، أو [[?.]] و [[??]]، أو validation للـ env مرة واحدة أول ما التطبيق يقوم.`,
          example: R`const url = process.env.DATABASE_URL!; // string، ولو ناقص: undefined يعدّي
const key = process.env.API_KEY;
if (!key) throw new Error("API_KEY ناقص في .env");
const el = document.querySelector("#app")!;
const app = document.querySelector("#app");
if (!app) throw new Error("#app مش موجود في الصفحة");
app.textContent = "جاهز";
const byId = new Map<string, number>([["a", 1]]);
const v = byId.get("b")!;
console.log(v.toFixed(1)); // TypeError`,
          try: R`في مشروعك شغّل [[grep -rn "process.env.[A-Z_]*!" src]] وعدّ كام متغير بيئة عليه [[!]]. كل واحد فيهم ممكن يعدّي undefined بصمت لو .env ناقص. والحل في درس Zod للـ env في المستوى ٣.`,
          flag: "script",
          deep: {
            why: "[[!]] أسرع طريقة تخلي الخط الأحمر يختفي، عشان كده بتنتشر. بس هي بتحوّل خطأ واضح وقت الكتابة لخطأ غامض وقت التشغيل: «Cannot read properties of undefined» في سطر بعيد عن السبب.",
            how: R`[[x!]] بتشيل [[null]] و [[undefined]] من نوع x، وبتتمسح تمامًا من الـ JS. يعني [[process.env.URL!]] في الـ JS هي [[process.env.URL]] بالظبط، ومفيش أي فحص.

وفي مشروع حقيقي كان فيه [[process.env.SUPABASE_SERVICE_ROLE_KEY!]] في كذا ملف. لو المتغير ناقص على السيرفر، الـ client بيتعمل بـ undefined، والخطأ بيطلع من جوه المكتبة برسالة ملهاش علاقة بالسبب.

الفحص الصريح ([[if (!key) throw ...]]) نفس عدد السطور تقريبًا، بيدّي رسالة واضحة في المكان الصح، و TS بيضيّق النوع بعده.

فيه حالات [[!]] فيها مقبول: قيمة اتحققت منها سطر فوق بطريقة TS مش فاهمها، و refs في React بعد mount (وحتى دي، الفحص أحسن).`,
            when: "نادرًا جدًا، ولما تبقى متأكد ١٠٠٪ ومش قادر تثبت لـ TS. في الـ env والـ DOM و [[Map.get]]، لأ: افحص.",
            mistakes: R`[[!]] على كل [[process.env]]، والتطبيق يقوم «عادي» ويقع أول ما حد يستخدم الخدمة. و [[user!.name]] عشان خطأ strictNullChecks يختفي. وفي الانترفيو: «! بيتأكد إن القيمة موجودة» غلط، مبيتأكدش من حاجة.`
          },
          lines: [
            R`[[!]] شالت undefined من النوع. لو المتغير ناقص، الغلط هيظهر بعدين في مكان بعيد.`,
            R`من غير [[!]]: النوع [[string | undefined]].`,
            "فحص صريح: رسالة واضحة، و TS بيضيّق النوع لـ string بعدها.",
            R`[[!]] على عنصر DOM: لو الـ id اتغير، هيقع في مكان تاني.`,
            R`نفس الحاجة من غير [[!]].`,
            "فحص صريح.",
            "آمن، و TS عارف إنه موجود.",
            "Map فيها مفتاح واحد.",
            R`[[!]] على [[get]] لمفتاح مش موجود.`,
            "crash: Cannot read properties of undefined."
          ],
          sol: R`المطلوب هنا عدّ مش ناتج ثابت. كل سطر زي [[src/env.ts:1:const url = process.env.DATABASE_URL!;]] بيتحسب واحد. أما [[const k = process.env.API_KEY;]] من غير [[!]] مش هيطلع، وده كويس لأن TS هيجبرك تفحصه.

لو العدد صفر ومشروعك فيه env كتير، اتأكد إنك بتدوّر في الفولدر الصح (ممكن [[app]] أو [[lib]] مش [[src]]). ولاحظ إن الـ grep ممكن يمسك [[process.env.X!== "a"]] لو مكتوبة من غير مسافة، ودي مقارنة مش non-null، فبص على كل سطر بعينك. وكل [[!]] حقيقي فيهم قراره: يا فحص صريح بيرمي خطأ واضح، يا تنقله لملف env واحد بـ Zod.`
        },
        {
          cmd: ".d.ts و @types",
          title: "مكتبة JS من غير أنواع: الأنواع بتيجي منين",
          desc: R`ملف [[.d.ts]] (declaration file) فيه أنواع بس من غير كود. المكتبات الحديثة بتيجي بأنواعها جواها. والمكتبات القديمة المكتوبة JS أنواعها في باكدج منفصلة اسمها [[@types/اسم-المكتبة]] من مشروع DefinitelyTyped: [[npm i -D @types/express]].

ولو مفيش أنواع خالص، بتكتب [[declare module "lib"]] في ملف .d.ts عندك وتوصف فيه اللي بتستخدمه بس.`,
          example: R`// src/types/modules.d.ts: مفيش import ولا export على المستوى الأعلى
declare module "legacy-sms" {
  export function sendSms(to: string, text: string): Promise<{ id: string }>;
}
declare module "*.svg" {
  const src: string;
  export default src;
}
declare module "untyped-lib";`,
          try: R`في مشروع Express، امسح [[@types/express]] ([[npm rm -D @types/express]]) وشغّل [[npx tsc --noEmit]]: هتشوف [[Could not find a declaration file for module 'express']]. وبعدين رجّعه.`,
          flag: "script",
          deep: {
            why: "TS محتاج يعرف شكل كل حاجة بتستوردها. ومكتبات كتير اتكتبت JS قبل TS، ومش هتتعاد كتابتها. الـ declaration files بتوصفها من برّه، فتاخد autocomplete وفحص من غير ما حد يلمس كود المكتبة.",
            how: R`لما تكتب [[import x from "lib"]]، TS بيدوّر على الأنواع بالترتيب: خانة [[types]] أو [[exports]] في package.json بتاع المكتبة (المكتبات الحديثة زي zod و axios)، وبعدين [[node_modules/@types/lib]]. لو ملقاش، ومع [[strict]]: خطأ TS7016 «Could not find a declaration file for module».

الـ [[@types/*]] باكدجات منفصلة بيكتبها المجتمع (DefinitelyTyped)، ونسختها لازم تمشي مع نسخة المكتبة ([[@types/express@5]] مع express 5). وبتتسطّب [[-D]] لأنها للفحص بس.

فيه نوعين @types: اللي بتستوردها (express) بتشتغل لوحدها، واللي بتضيف globals ([[@types/node]] بيضيف [[process]] و [[Buffer]]، و [[@types/jest]] بيضيف [[describe]]). وفي TS 6 و 7، [[types]] في tsconfig افتراضيًا [[[]]]، فالنوع التاني لازم تكتبه: [["types": ["node"]]].

[[declare module "x" { ... }]] في ملف .d.ts بيعرّف أنواع لمكتبة. ومهم إن الملف يكون ambient (مفيهوش import ولا export على المستوى الأعلى)، لأن لو فيه، [[declare module]] بتبقى «تعديل على مكتبة موجودة» (module augmentation، المستوى ٣) مش تعريف جديد. وملفات .d.ts لازم تكون جوه [[include]] في tsconfig.`,
            when: "أي مكتبة بتطلّع TS7016. وملفات assets ([[*.svg]] و [[*.css]]) لو الـ bundler مش مغطيها. وتضيف globals زي [[window.dataLayer]].",
            mistakes: R`تسطّب [[@types/x]] لمكتبة أصلًا فيها أنواعها (زي axios): الباكدج دي بتبقى stub قديم ملوش لازمة. وتسطّب @types في dependencies مش devDependencies. وملف .d.ts فيه [[import]] في أوله فالـ [[declare module]] يبطل يعرّف مكتبة جديدة. و [[declare module "lib";]] من غير body وتنساه: كل حاجة من المكتبة any للأبد.`
          },
          lines: [
            "أنواع لمكتبة JS ملهاش أنواع.",
            "بتوصف الدوال اللي بتستخدمها بس، مش المكتبة كلها.",
            "قفلة.",
            R`wildcard: أي import لملف .svg...`,
            "...بيرجع string (الـ bundler بيحوّله لـ URL)...",
            "...كـ default export.",
            "قفلة.",
            R`أقصر شكل: المكتبة موجودة وكل حاجة منها [[any]]. حل مؤقت بس.`
          ],
          sol: R`بعد [[npm rm -D @types/express]] و [[npx tsc --noEmit]] هتشوف: [[error TS7016: Could not find a declaration file for module 'express'.]] وبعدها [['.../node_modules/express/index.js' implicitly has an 'any' type]] واقتراح [[npm i --save-dev @types/express]]. ومعاه أخطاء TS7006 على [[req]] و [[res]] في كل handler، لأنهم بقوا any.

لو مطلعش أي خطأ، يا [[strict]] (أو [[noImplicitAny]]) مقفول، يا فيه نسخة من [[@types/express]] في [[node_modules]] في فولدر أعلى (TS بيدوّر لفوق). وبعد [[npm i -D @types/express]] الأخطاء بتختفي.`
        }
      ]
    },
    {
      t: "Classes في TS",
      l: 2,
      n: "private و protected و #private، و parameter properties، و abstract و implements، و override، و decorators وإزاي NestJS بيستخدمها",
      items: [
        {
          cmd: "public و private و protected",
          title: "private بتاعة TS ولا #private بتاعة JS: مين بيحمي بجد؟",
          desc: R`الـ class في TS هو نفس الـ class بتاع JS (شوف درس [[class]] في «تاب JavaScript»)، وفوقه كلمات بتحدد مين يوصل لكل خاصية: [[public]] (الافتراضي، أي حد)، و [[private]] (كود جوه الكلاس ده بس)، و [[protected]] (الكلاس ده والكلاسات اللي بتورث منه).

المهم: [[private]] و [[protected]] أنواع، يعني بيتمسحوا زي أي نوع. الفحص بيحصل وقت الكتابة بس، ووقت التشغيل الخاصية عادية خالص: بتظهر في [[JSON.stringify]] وأي حد يقدر يقراها بـ [[as any]]. أما [[#secret]] فده private حقيقي من JS نفسه، والـ runtime هو اللي بيمنع.`,
          example: R`class Account {
  public owner: string;
  private pin: string;
  protected balance = 0;
  #secret = "s3cr3t";
  constructor(owner: string, pin: string) {
    this.owner = owner;
    this.pin = pin;
  }
  check(pin: string) { return pin === this.pin; }
}
class Savings extends Account {
  addInterest() { this.balance *= 1.1; }
}
const acc = new Account("sara", "1234");
acc.owner;
acc.pin; // خطأ: Property 'pin' is private and only accessible within class 'Account'
acc.balance; // خطأ: Property 'balance' is protected ...
acc.#secret; // خطأ: Property '#secret' is not accessible outside class 'Account'
console.log((acc as any).pin);    // "1234"
console.log(acc["pin"]);          // "1234"، ومن غير أي خطأ
console.log(JSON.stringify(acc)); // {"owner":"sara","pin":"1234","balance":0}`,
          try: R`شيل السطور التلاتة اللي فيها خطأ وشغّل الملف ([[npx tsc --strict]] وبعدين [[node]] على الناتج، أو [[npx tsx]]). بعدها غيّر [[private pin]] لـ [[#pin]] (ومعاها كل [[this.pin]] لـ [[this.#pin]]) وشغّل تاني: آخر ٣ سطور بقوا بيطبعوا إيه؟ وجرّب تكتب method في [[Savings]] بترجّع [[this.#pin]].`,
          flag: "script",
          deep: {
            why: R`أي كلاس ليه جزء «واجهة» بتتنادى من برّه، وجزء تفاصيل داخلية لو حد اعتمد عليها هتكسره أول ما تغيّرها. الـ modifiers بتقول ده بوضوح، والمحرر بيخفي الحاجات الـ private من الـ autocomplete. وده سؤال انترفيو ثابت: «الفرق بين private و #private؟».`,
            how: R`[[private pin]] بيخلي TS يرفض [[acc.pin]] برّه الكلاس بخطأ TS2341، و [[protected]] بيرفضها برّه الكلاس والكلاسات الوارثة (TS2445). بس في الـ JS الناتج مفيش أي أثر: الخاصية عادية على الـ object. وفيه باب خلفي معروف ومقصود: [[acc["pin"]]] بالأقواس المربعة TS بيسمح بيها من غير خطأ، وكمان [[as any]].

[[#pin]] حاجة تانية: ده جزء من JS نفسه (ES2022). الـ engine بيخزّنها برّه الخصايص العادية، فمش بتظهر في [[Object.keys]] ولا [[JSON.stringify]] ولا [[acc["#pin"]]]، والوصول ليها برّه الكلاس SyntaxError في JS و TS18013 في TS. ولو الـ target أقدم من ES2022، TS بيحوّلها لـ WeakMap عشان يحافظ على نفس الحماية.

فرق تاني: [[#pin]] مش بتتورث للوصول. [[Savings]] مش شايفة [[#pin]] بتاعة الأب خالص، زي [[private]] بالظبط. لو عايز الابن يوصل، يبقى [[protected]] (ودي ملهاش مقابل في JS).

وفي الحالتين الـ private حسب الكلاس مش حسب الـ object: method في [[Account]] تقدر تقرا [[other.#pin]] من instance تاني من نفس الكلاس.`,
            when: R`[[private]] كفاية لكود التطبيق العادي (services و controllers)، وهو اللي هتلاقيه في NestJS وأغلب الكود. [[#private]] لما الحماية لازم تبقى حقيقية: مكتبة بتنشرها، أو حاجة حساسة مش عايزها تطلع في log أو response. و [[protected]] بس لما فيه وراثة فعلًا.`,
            mistakes: R`تفتكر إن [[private]] بيخبي البيانات: [[res.json(user)]] هيطلّع الـ [[passwordHash]] الـ private عادي. وتخلط بين الاتنين في نفس الكلاس ([[private #x]] ممنوعة أصلًا). وتعمل [[protected]] لكل حاجة «احتياطي» فالكلاسات الوارثة تعتمد على تفاصيل الأب. وفي الانترفيو: «TS private بيتفحص وقت الكتابة بس وبيتمسح، و #private بيتفحص وقت التشغيل من الـ engine».`
          },
          lines: [
            "بداية الكلاس.",
            R`[[public]] هو الافتراضي، كتابته اختيارية بس بتوضّح.`,
            R`[[private]]: كود الكلاس ده بس (فحص TS).`,
            R`[[protected]]: الكلاس ده والكلاسات اللي بتورث منه.`,
            R`private حقيقي من JS نفسه، بيتفحص وقت التشغيل.`,
            "الـ constructor بياخد القيم...",
            "...ويحطها في الخصايص.",
            R`جوه الكلاس عادي نقرا [[pin]].`,
            "قفلة.",
            R`method بتقارن من غير ما تكشف [[pin]] نفسه.`,
            "قفلة الكلاس.",
            "كلاس بيورث.",
            R`[[protected]] متاحة هنا لأنه ابن.`,
            "قفلة.",
            "instance.",
            "public: مسموح.",
            R`private: TS بيرفض (TS2341).`,
            R`protected: TS بيرفض برّه الكلاس والأبناء (TS2445).`,
            R`[[#]]: TS بيرفض، والـ JS نفسه كان هيرمي SyntaxError.`,
            R`بس [[private]] مش حماية وقت التشغيل: [[as any]] بتوصل للقيمة.`,
            R`وحتى من غير as: الأقواس المربعة باب خلفي مسموح في TS.`,
            R`والخاصية الـ private بتطلع في JSON، أما [[#secret]] لأ.`
          ],
          sol: R`بعد ما تشيل السطور الغلط، الناتج مع [[private pin]]: [[1234]] مرتين، وبعدين [[{"owner":"sara","pin":"1234","balance":0}]]. يعني private مخبية الـ pin عن TS بس.

بعد ما تحوّلها لـ [[#pin]]: [[npx tsc --strict]] هيرفض [[acc["pin"]]] بـ Property 'pin' does not exist on type 'Account'، لأن مفيش خاصية اسمها pin أصلًا، فشيل السطر ده. والباقي بيطبع [[undefined]] وبعدين [[{"owner":"sara","balance":0}]]: الـ pin اختفى من الـ JSON. والـ method اللي في [[Savings]] بترجّع [[this.#pin]] بتطلّع TS18013: الابن مش شايف [[#pin]] بتاعة الأب. (ونفس الكلام مع [[private pin]]: الابن بياخد TS2341، لأن private مش protected.)

الغلط الشائع: تفتكر إن [[(acc as any).pin]] هيطلع undefined مع [[private]]. لأ، private بتتمسح.`,
          solCode: R`class Account {
  public owner: string;
  #pin: string;
  protected balance = 0;
  constructor(owner: string, pin: string) {
    this.owner = owner;
    this.#pin = pin;
  }
  check(pin: string) { return pin === this.#pin; }
}
class Savings extends Account {
  addInterest() { this.balance *= 1.1; }
  // leak() { return this.#pin; } // خطأ TS18013: الابن مش شايفها
}
const acc = new Account("sara", "1234");
console.log((acc as any).pin);    // undefined
console.log(JSON.stringify(acc)); // {"owner":"sara","balance":0}
console.log(acc.check("1234"));   // true`
        },
        {
          cmd: "parameter properties و readonly",
          title: "تعرّف الخاصية وتملاها من الـ constructor في سطر واحد",
          desc: R`لو كتبت [[public]] أو [[private]] أو [[protected]] أو [[readonly]] قبل باراميتر في الـ constructor، TS بيعمل خاصية بنفس الاسم ويحط فيها القيمة لوحده. ده اسمه parameter property، وبيوفّر تلات سطور لكل خاصية: التعريف، والباراميتر، و [[this.x = x]].

و [[readonly]] على خاصية معناها تتكتب مرة واحدة: في تعريفها أو في الـ constructor، وبعد كده لأ، حتى من جوه الكلاس. ودي فحص TS بس، زي private.`,
          example: R`class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: "EGP" | "USD",
  ) {}
  add(other: Money): Money {
    if (other.currency !== this.currency) throw new Error("عملات مختلفة");
    return new Money(this.amount + other.amount, this.currency);
  }
}
const total = new Money(100, "EGP").add(new Money(50, "EGP"));
console.log(total.amount); // 150
total.amount = 0; // خطأ: Cannot assign to 'amount' because it is a read-only property
class Config {
  readonly port: number;
  constructor() {
    this.port = Number(process.env.PORT ?? 3000);
  }
  bump() { this.port++; } // خطأ: برّه الـ constructor حتى جوه الكلاس
}`,
          try: R`اكتب [[class Product]] بـ parameter properties: [[id]] رقم [[public readonly]]، و [[name]] [[public]] عادي، و [[price]] [[private]]. وضيف method اسمها [[priceWithVat()]] بترجّع السعر × 1.14 مقرّب. غيّر الاسم من برّه، وجرّب تغيّر [[id]] وتقرا [[price]] من برّه، واطبع [[JSON.stringify]] للمنتج.`,
          flag: "script",
          deep: {
            why: R`كلاسات الـ services في الباك (وأي حاجة فيها dependency injection زي NestJS) constructor بتاعها مليان dependencies. من غير parameter properties كل dependency بتتكتب ٣ مرات. ومع [[readonly]] بتضمن إن محدش يبدّل الـ repository أو القيمة بعد ما الـ object اتعمل.`,
            how: R`[[constructor(public readonly amount: number)]] بيتحول في الـ JS لخاصية [[amount]] و [[this.amount = amount]] أول سطر في الـ constructor (وبعد [[super()]] لو فيه وراثة). يعني ده من الحاجات القليلة في TS اللي بتطلّع كود حقيقي مش أنواع بس، زي [[enum]].

وعشان كده مبيشتغلش مع [[node file.ts]] (type stripping)، و [[erasableSyntaxOnly]] في tsconfig بيرفضه بخطأ TS1294. ولو مشروعك ماشي على الطريقة دي، اكتب الخاصية والتعيين بإيدك. tsx و Vite و tsc بيفهموه عادي.

[[readonly]] بيتفحص بـ TS2540، ومش [[Object.freeze]]: وقت التشغيل الخاصية عادية وممكن تتغير لو حد عدّى الأنواع. وبيمنع إعادة التعيين بس مش التعديل جوه: [[readonly items: string[]]] بيسمح بـ [[this.items.push()]]، فلو عايز الليستة نفسها متتغيرش [[readonly string[]]].

وخاصية عادية من غير قيمة أولية ومش بتتملى في الـ constructor بتطلّع خطأ TS2564 مع [[strict]] ([[strictPropertyInitialization]]). الحل: قيمة أولية، أو تملاها في الـ constructor، أو [[name!: string]] لو حاجة تانية بتملاها (زي ORM أو framework).`,
            when: R`parameter properties في services و controllers والكلاسات اللي constructor بتاعها بياخد dependencies. و [[readonly]] على أي خاصية مش المفروض تتغير: ids، و dependencies، و value objects زي [[Money]].`,
            mistakes: R`تنسى الـ modifier ([[constructor(amount: number)]]) فمفيش خاصية بتتعمل، و [[this.amount]] يطلع خطأ. وتفتكر إن [[readonly]] بيجمّد الـ object. وتحط [[!]] على كل خاصية عشان TS2564 يسكت. وتستخدم parameter properties في مشروع شغال على [[node file.ts]] مباشرة فيقع. وفي الانترفيو: «parameter properties مش erasable، ليه ده مهم دلوقتي؟» بسبب type stripping و [[erasableSyntaxOnly]].`
          },
          lines: [
            "كلاس لقيمة فلوس.",
            "الـ constructor...",
            R`[[public readonly]] قبل الباراميتر: خاصية اتعملت واتملت لوحدها ومتتغيرش.`,
            "نفس الكلام، والنوع union من عملتين.",
            R`جسم الـ constructor فاضي: TS هو اللي هيكتب [[this.amount = amount]].`,
            R`method بترجّع [[Money]] جديد بدل ما تعدّل (عشان readonly).`,
            "متجمعش عملتين مختلفين.",
            "instance جديد بالمجموع.",
            "قفلة.",
            "قفلة الكلاس.",
            "جمع قيمتين.",
            "150.",
            R`[[readonly]]: TS2540 من برّه.`,
            "كلاس تاني بـ readonly عادي من غير parameter property.",
            "تعريف من غير قيمة...",
            "...ولازم تتملى في الـ constructor (وإلا TS2564).",
            "التعيين الوحيد المسموح.",
            "قفلة.",
            "حتى جوه الكلاس: TS2540 برّه الـ constructor.",
            "قفلة الكلاس."
          ],
          sol: R`[[priceWithVat()]] لسعر 1000 بترجّع [[1140]]، والـ JSON بيطلع [[{"id":1,"name":"كيبورد ميكانيكال","price":1000}]]: الـ [[price]] الـ private بتطلع عادي، لأن private فحص TS بس.

و [[p.id = 2]] بيطلّع TS2540 (Cannot assign to 'id' because it is a read-only property)، و [[p.price]] بيطلّع TS2341 (Property 'price' is private). أما [[p.name = ...]] مفيهوش مشكلة.

لو نسيت الـ modifier قبل [[price]] (كتبت [[price: number]] بس)، مش هتبقى خاصية أصلًا، و [[this.price]] جوه [[priceWithVat]] هيطلّع Property 'price' does not exist.`,
          solCode: R`class Product {
  constructor(
    public readonly id: number,
    public name: string,
    private price: number,
  ) {}
  priceWithVat(): number {
    return Math.round(this.price * 1.14);
  }
}
const p = new Product(1, "كيبورد", 1000);
p.name = "كيبورد ميكانيكال";
console.log(p.priceWithVat());   // 1140
console.log(JSON.stringify(p));  // {"id":1,"name":"كيبورد ميكانيكال","price":1000}
// p.id = 2;   // خطأ TS2540
// p.price;    // خطأ TS2341`
        },
        {
          cmd: "abstract و implements",
          title: "interface ولا abstract class: عقد بس، ولا عقد ومعاه كود؟",
          desc: R`[[class X implements Notifier]] بيخلي TS يتأكد إن الكلاس فيه كل اللي الـ interface طالبه. ده فحص بس: مبيورّثش أي كود، ومبيطلّعش حاجة في الـ JS.

[[abstract class]] كلاس مينفعش تعمل منه [[new]]، معمول عشان حد يورث منه. ممكن يبقى فيه كود حقيقي مشترك، و members معلّمة [[abstract]] من غير كود، وأي ابن لازم يكتبها.

الفرق المختصر: الـ interface عقد بس، وتقدر تطبّق كذا واحد. والـ abstract class عقد ومعاه كود مشترك، وتورث من واحد بس.`,
          example: R`interface Notifier {
  send(to: string, text: string): Promise<void>;
}
abstract class BaseNotifier implements Notifier {
  abstract readonly channel: string;
  protected abstract deliver(to: string, text: string): Promise<void>;
  async send(to: string, text: string) {
    console.log($__bt[$__{this.channel}] → $__{to}$__bt);
    await this.deliver(to, text);
  }
}
class SmsNotifier extends BaseNotifier {
  readonly channel = "sms";
  protected async deliver(to: string, text: string) {
    console.log("SMS:", text);
  }
}
class FakeNotifier implements Notifier {
  sent: string[] = [];
  async send(to: string, text: string) { this.sent.push(text); }
}
const n: Notifier = new SmsNotifier();
await n.send("+2010...", "كود التفعيل 4821");
new BaseNotifier(); // خطأ: Cannot create an instance of an abstract class
class EmailNotifier extends BaseNotifier {} // خطأ: missing implementations for 'channel', 'deliver'`,
          try: R`كمّل [[EmailNotifier]] صح (channel بـ [["email"]] و deliver بتطبع). واكتب [[async function notifyAll(list: Notifier[], to: string, text: string)]] بتبعت لكلهم مع بعض، وجرّبها مرة على SMS و Email، ومرة على [[FakeNotifier]] واطبع [[sent]]. وبعدين امسح الأنواع من باراميترات [[send]] في [[FakeNotifier]] وشوف [[implements]] بيدّيها أنواع ولا لأ.`,
          flag: "script",
          deep: {
            why: R`كود الباك مليان «حاجة واحدة وليها كذا تنفيذ»: إشعارات SMS و Email و Push، وتخزين ملفات local و S3، ودفع بـ Stripe أو Paymob. لو باقي الكود بيعتمد على الـ interface بس، تقدر تبدّل التنفيذ أو تحط fake في الاختبارات من غير ما تلمس حاجة. وده أساس الـ dependency injection اللي NestJS قايم عليه.`,
            how: R`[[implements]] مبيغيّرش نوع الكلاس ولا بيضيف حاجة: بيعمل فحص إن الكلاس assignable للـ interface. ولأن TS structural، [[FakeNotifier]] كان هيتقبل مكان [[Notifier]] حتى من غير [[implements]]. الفايدة إن الخطأ بيطلع عند تعريف الكلاس، مش في مكان بعيد بتستخدمه فيه.

ومهم: [[implements]] مبيدّيش أنواع لباراميترات الـ methods. [[send(to, text)]] في كلاس بيطبّق Notifier الباراميترات فيها implicit any (TS7006 مع strict). لازم تكتب الأنواع تاني.

[[abstract class]] بيفضل موجود في الـ JS ككلاس عادي (كلمة abstract بس هي اللي بتتمسح)، فتقدر تحط فيه كود مشترك زي [[send]] اللي بيطبع وبعدين ينادي [[deliver]]. ده نمط اسمه template method: الأب بيحدد الخطوات، والابن بيملا الخطوة اللي بتختلف. و [[new BaseNotifier()]] بيطلّع TS2511، وابن ناقصه member بيطلّع TS2654.

والـ interface بيتمسح خالص، فمينفعش [[x instanceof Notifier]]. الـ abstract class ينفع معاه instanceof، وده من أسباب إن NestJS بيستخدم abstract class كـ token للـ DI (قيمة موجودة وقت التشغيل) لما عايز «interface» يتحقن.`,
            when: R`interface لما عايز عقد بس (وده الأغلب، وأسهل في الاختبارات). abstract class لما فيه كود مشترك حقيقي بين كل التنفيذات، أو محتاج قيمة وقت التشغيل (instanceof أو DI token). ولو الكود المشترك صغير، composition (تبعت الـ helper كـ dependency) غالبًا أبسط من الوراثة.`,
            mistakes: R`تعمل abstract class وكل members فيه abstract ومفيهوش كود: ده interface بشكل أتقل. وتفتكر إن [[implements]] بيورّث كود أو أنواع للباراميترات. وتحاول [[instanceof]] على interface. وفي الانترفيو: «interface vs abstract class» الإجابة: عقد بس (وتطبّق كذا واحد، وبيتمسح) مقابل عقد وكود مشترك (وراثة من واحد، وموجود وقت التشغيل).`
          },
          lines: [
            "العقد: أي notifier لازم يبقى فيه send.",
            "التوقيع بس من غير كود.",
            "قفلة.",
            R`[[abstract]]: مينفعش [[new]] منه، و [[implements]] بيتأكد إنه ماشي مع العقد.`,
            R`خاصية abstract: كل ابن لازم يحددها.`,
            R`method abstract و protected: الابن يكتبها، ومحدش ينادي عليها من برّه.`,
            "كود حقيقي مشترك بين كل الأبناء...",
            "...بيطبع القناة (اللي الابن حددها)...",
            "...وينادي الخطوة اللي بتختلف.",
            "قفلة.",
            "قفلة الكلاس.",
            "ابن حقيقي.",
            "حدد القناة.",
            "وكتب الخطوة الناقصة.",
            "بيبعت SMS (هنا بيطبع بس).",
            "قفلة.",
            "قفلة الكلاس.",
            R`كلاس تاني خالص بيطبّق نفس العقد من غير وراثة: مفيد في الاختبارات.`,
            "بيحفظ الرسايل بدل ما يبعتها.",
            R`[[implements]] مبيدّيش أنواع للباراميترات، فلازم تكتبها.`,
            "قفلة.",
            R`المتغير نوعه الـ interface، فأي تنفيذ ينفع.`,
            R`بيطبع [[[sms] → +2010...]] وبعدين الرسالة.`,
            "TS2511: مينفعش instance من abstract.",
            "TS2654: الابن لازم يكتب كل الـ abstract members."
          ],
          sol: R`[[notifyAll]] على SMS و Email بيطبع ٤ سطور: [[[sms] → sara]] و [[SMS: طلبك اتشحن]] و [[[email] → sara]] و [[EMAIL: sara طلبك اتشحن]] (الترتيب ده لأن الـ console.log الأول في كل send بيحصل قبل أي await). ومع [[FakeNotifier]] مفيش حاجة بتتطبع، و [[fake.sent]] بيطلع [[[ 'omar: test' ]]].

ولما تمسح الأنواع من [[send(to, text)]] في [[FakeNotifier]]: [[tsc --strict]] بيطلّع TS7006 (Parameter 'to' implicitly has an 'any' type). يعني [[implements]] بيفحص بس، ومبيدّيش أنواع.`,
          solCode: R`// ... Notifier و BaseNotifier و SmsNotifier زي المثال
class EmailNotifier extends BaseNotifier {
  readonly channel = "email";
  protected async deliver(to: string, text: string) {
    console.log("EMAIL:", to, text);
  }
}
class FakeNotifier implements Notifier {
  sent: string[] = [];
  async send(to: string, text: string) {
    this.sent.push($__bt$__{to}: $__{text}$__bt);
  }
}
async function notifyAll(list: Notifier[], to: string, text: string) {
  await Promise.all(list.map((n) => n.send(to, text)));
}
await notifyAll([new SmsNotifier(), new EmailNotifier()], "sara", "طلبك اتشحن");
const fake = new FakeNotifier();
await notifyAll([fake], "omar", "test");
console.log(fake.sent); // [ 'omar: test' ]`
        },
        {
          cmd: "override",
          title: "تتأكد إن الـ method اللي بتكتبها في الابن بتغيّر method موجودة فعلًا في الأب",
          desc: R`[[override]] قبل method أو خاصية في الابن بتقول: «دي بتغيّر حاجة موجودة في الأب». لو مفيش حاجة بالاسم ده في الأب (غلطة إملائية، أو حد غيّر اسمها في الأب)، TS بيطلّع خطأ.

ومع [[noImplicitOverride]] في tsconfig بيبقى العكس كمان: أي member بيغيّر حاجة في الأب لازم يتكتب قبله [[override]]، فمفيش override بيحصل من غير ما تقصد. الوراثة نفسها ([[extends]] و [[super]]) في درس «extends و super» في «تاب JavaScript».`,
          example: R`class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
  toJSON() { return { status: this.status, message: this.message }; }
}
class NotFoundError extends HttpError {
  override name = "NotFoundError";
  constructor(what: string) {
    super(404, $__bt$__{what} مش موجود$__bt);
  }
  override toJSON() {
    return { ...super.toJSON(), hint: "اتأكد من الـ id" };
  }
  override toJSONN() { return {}; } // خطأ TS4117: مفيش toJSONN في الأب، Did you mean 'toJSON'?
}
const err = new NotFoundError("المنتج");
console.log(err.name, JSON.stringify(err));
// NotFoundError {"status":404,"message":"المنتج مش موجود","hint":"اتأكد من الـ id"}`,
          try: R`شيل السطر الغلط، وشغّل [[npx tsc --strict --noImplicitOverride]]. بعدين امسح كلمة [[override]] من السطرين وشغّل تاني. وأخيرًا رجّعها، وغيّر اسم [[toJSON]] في [[HttpError]] بس لـ [[toBody]] (من غير ما تلمس الابن): إيه اللي حصل، وكان هيحصل إيه لو مفيش [[override]]؟`,
          flag: "script",
          deep: {
            why: R`الوراثة فيها bug صامت كلاسيكي: الأب اتغيّر اسم method فيه، أو انت كتبت الاسم غلط في الابن، فالابن بقى بيعرّف method جديدة محدش بينادي عليها، والسلوك القديم رجع من غير أي خطأ. [[override]] بيحوّل ده لخطأ compile.`,
            how: R`[[override]] (من TS 4.3) فحص بس وبيتمسح. لو مكتوب على member مش موجود في الأب: TS4113، أو TS4117 لما يلاقي اسم قريب ويقترحه ([[Did you mean 'toJSON'?]]).

[[noImplicitOverride]] مش جزء من [[strict]]، لازم تشغّله لوحده. معاه، أي member بيغيّر حاجة في الأب من غير [[override]] بيطلّع TS4114 (This member must have an 'override' modifier). ده بيشمل الخصايص كمان: [[name]] هنا بتغيّر [[Error.prototype.name]]، فلازم [[override]].

وبيشتغل مع [[abstract]]: لما الابن يكتب member كان abstract في الأب، [[override]] مسموح بس مش إجباري حتى مع noImplicitOverride، لأن مفيش كود بيتغيّر.

و [[super.toJSON()]] بينادي نسخة الأب، فتضيف عليها بدل ما تكتبها من الأول.`,
            when: R`شغّل [[noImplicitOverride]] في أي مشروع فيه وراثة (errors مخصصة، أو كلاسات framework زي NestJS، أو أي base class). تكلفته صفر.`,
            mistakes: R`تفتكر إن [[noImplicitOverride]] جوه [[strict]]. وتفتكر إن [[override]] بيعمل حاجة وقت التشغيل: الـ override بيحصل بسبب الـ prototype chain سواء كتبتها ولا لأ. وفي الانترفيو: «إيه اللي بيحصل لو الأب غيّر اسم method والابن كان عاملها override؟» من غير الكلمة: ولا خطأ، والابن بقى فيه method يتيمة. معاها: خطأ compile.`
          },
          lines: [
            "error أساسي بـ status (parameter property).",
            "constructor.",
            R`لازم [[super()]] قبل ما [[this]] يتستخدم.`,
            "قفلة.",
            R`[[JSON.stringify]] بينادي [[toJSON]] لو موجودة.`,
            "قفلة الكلاس.",
            "ابن متخصص.",
            R`[[name]] موجودة في [[Error]]، فالكلمة لازمة مع noImplicitOverride.`,
            "constructor بياخد اسم الحاجة.",
            "بيبني الرسالة وينادي الأب.",
            "قفلة.",
            R`بيغيّر [[toJSON]] بتاعة الأب، و TS متأكد إنها موجودة.`,
            R`بياخد نسخة الأب بـ [[super]] ويضيف عليها.`,
            "قفلة.",
            R`غلطة إملائية: [[override]] مسك إن مفيش حاجة بالاسم ده في الأب.`,
            "قفلة الكلاس.",
            "instance.",
            R`الاسم اتغير، و [[toJSON]] بتاعة الابن هي اللي اشتغلت.`
          ],
          sol: R`لما تمسح [[override]] وتشغّل بـ [[--noImplicitOverride]]: خطأين TS4114 (This member must have an 'override' modifier because it overrides a member in the base class 'HttpError')، واحد على [[name]] وواحد على [[toJSON]].

ولما ترجّعها وتغيّر اسم الأب لـ [[toBody]]: [[override toJSON()]] في الابن بيطلّع TS4113 (This member cannot have an 'override' modifier because it is not declared in the base class 'HttpError')، ومعاه TS2339 على [[super.toJSON()]] لأنها مبقتش موجودة. يعني الـ compiler قالك فورًا إن الابن بقى بيغيّر حاجة مش موجودة. ومن غير [[override]] كان الكود هيعدّي عادي، والابن بقى بيعرّف [[toJSON]] جديدة، وJSON هيطبع نسخة الابن، وأي كود كان بينادي [[toBody]] هيشتغل بنسخة الأب ومن غير الـ hint، ومحدش هيعرف.`
        },
        {
          cmd: "decorators",
          title: "دالة بتلف method أو class وتغيّر سلوكها: decorators بتاعة TC39",
          desc: R`الـ decorator دالة بتتكتب فوق class أو method أو field بـ [[@]]: [[@logged]]. بتستلم الحاجة اللي عليها، وتقدر ترجّع بديل ليها (مثلًا method ملفوفة بتطبع log قبل ما تنادي الأصلية).

من TS 5.0، [[@decorator]] من غير أي إعدادات معناها decorators الرسمية بتاعة JS (اقتراح TC39 في المرحلة ٣). كل decorator بياخد باراميترين: الحاجة نفسها، و [[context]] فيه اسمها ونوعها و [[addInitializer]]. وده غير النسخة القديمة [[experimentalDecorators]] اللي NestJS لسه عليها (الدرس الجاي)، والاتنين مش متوافقين.

ومهم: Node (جرّبت على 22) لسه مبيشغّلش decorators لوحده، فـ TS لازم يحوّلها: [[target]] يبقى [[es2022]] أو أقل. [[tsc --init]] بيحط [[esnext]]، ومعاه الـ [[@]] بتفضل زي ما هي في الـ JS و Node يقع بـ SyntaxError.`,
          example: R`type Method<This, Args extends unknown[], R> = (this: This, ...args: Args) => R;
function logged<This, Args extends unknown[], R>(
  target: Method<This, Args, R>,
  context: ClassMethodDecoratorContext<This, Method<This, Args, R>>,
) {
  const name = String(context.name);
  return function (this: This, ...args: Args): R {
    console.log($__bt→ $__{name}($__{args.join(", ")})$__bt);
    return target.call(this, ...args);
  };
}
function bound(_target: unknown, context: ClassMethodDecoratorContext) {
  context.addInitializer(function (this: any) {
    this[context.name] = this[context.name].bind(this);
  });
}
class Cart {
  total = 0;
  @logged
  add(price: number) {
    this.total += price;
    return this.total;
  }
  @bound
  reset() {
    this.total = 0;
  }
}
const cart = new Cart();
cart.add(50);    // → add(50)
const { reset } = cart;
reset();         // من غير bound: TypeError، لأن this بقت undefined
console.log(cart.total); // 0`,
          try: R`اكتب decorator اسمه [[@measure]] بيطبع الوقت اللي الـ method أخدته بـ [[performance.now()]]، ويشتغل صح مع method عادية ومع method [[async]] (لو الناتج Promise استنى يخلص قبل ما تطبع). جرّبه على method بتجمع مليون رقم، و method async فيها [[setTimeout]] 120ms. وبعدين غيّر [[--target]] لـ [[esnext]] وشغّل الناتج بـ node.`,
          flag: "script",
          deep: {
            why: R`فيه منطق بيتكرر حوالين methods كتير ومالوش علاقة بشغلها: log، وقياس وقت، و cache، و retry، وصلاحيات. الـ decorator بيخليك تكتبه مرة وتحطه بسطر فوق أي method بدل ما تنسخه جوه كل واحدة. وده اللي frameworks زي NestJS و Angular و TypeORM بانيين عليه شكلهم كله.`,
            how: R`method decorator بيتنادي مرة واحدة وقت تعريف الكلاس (مش مع كل نداء)، وبياخد الـ method الأصلية و context. لو رجّع دالة، هي اللي بتتحط مكان الأصلية على الـ prototype. عشان كده [[logged]] بترجّع wrapper بينادي [[target.call(this, ...args)]].

[[context.addInitializer]] بيسجّل دالة بتشتغل مع كل instance جديد، ودي اللي [[bound]] بيستخدمها عشان يربط [[this]] (مشكلة this لما تفصل method اتشرحت في «تاب JavaScript»).

فيه أنواع context لكل حاجة: [[ClassMethodDecoratorContext]] و [[ClassFieldDecoratorContext]] و [[ClassDecoratorContext]] و [[ClassAccessorDecoratorContext]]، والأخيرة مع كلمة جديدة [[accessor]] ([[@observed accessor count = 0]]) بتعمل getter و setter تقدر تلفهم.

وفيه [[context.metadata]] (من TS 5.2) تحط فيه بيانات تقراها بعدين من [[Class[Symbol.metadata]]]، بس محتاج [[Symbol.metadata]] يكون موجود: على Node 22 مش موجود، و [[context.metadata]] بيطلع undefined لحد ما تعمل polyfill ([[Symbol.metadata ??= Symbol("Symbol.metadata")]]).

والفرق الكبير عن القديم: الرسمية مفيهاش parameter decorators (زي [[@Body()]] على باراميتر)، ومفيهاش [[emitDecoratorMetadata]]. ومش كل الأدوات بتحوّلها: tsc و esbuild (tsx و Vite) بيحوّلوها، بس [[node file.ts]] (type stripping) لأ.`,
            when: R`منطق مشترك حوالين methods في كلاسات انت كاتبها (log و cache و retry و measure) لو المشروع أصلًا class-based. لو الكود functions عادية، higher-order function ([[withLog(fn)]]) أبسط ومش محتاجة أي إعداد. ولو شغال في NestJS أو Angular، انت ماشي على نظامهم، مش على الرسمية.`,
            mistakes: R`تشغّل [[target: esnext]] (افتراضي [[tsc --init]]) وتستغرب SyntaxError عند [[@]]. وتخلط بين الـ API القديم [[(target, key, descriptor)]] والجديد [[(value, context)]] فتنسخ decorator من مقال قديم ميشتغلش. وتنسى [[this]] في الـ wrapper ([[target(...args)]] بدل [[target.call(this, ...args)]]) فالـ method تفقد الـ instance. و wrapper لـ method async بيعمل [[result.finally(...)]] ويسيبه: لو الـ Promise اترفضت هيبقى عندك unhandled rejection زيادة، استخدم [[result.then(done, done)]]. وفي الانترفيو: «الـ decorator بيتنادي إمتى؟» مرة واحدة وقت تعريف الكلاس، مش مع كل نداء.`
          },
          lines: [
            "نوع مساعد لأي method: this وباراميترات ونوع رجوع.",
            R`decorator generic عشان يحافظ على نوع الـ method اللي بيلفها.`,
            "الباراميتر الأول: الـ method الأصلية.",
            R`التاني: [[context]]، فيه الاسم و [[kind]] و [[addInitializer]].`,
            "بداية الجسم.",
            "اسم الـ method من الـ context.",
            R`بيرجّع دالة جديدة هتتحط مكان الأصلية.`,
            "log قبل النداء.",
            R`ينادي الأصلية بنفس [[this]] ونفس الـ arguments.`,
            "قفلة الـ wrapper.",
            "قفلة الـ decorator.",
            R`decorator تاني مش بيرجّع حاجة، فالـ method بتفضل زي ما هي.`,
            R`[[addInitializer]]: كود بيشتغل مع كل [[new Cart()]].`,
            R`بيحط على الـ instance نسخة مربوطة بـ [[bind]].`,
            "قفلة.",
            "قفلة.",
            "الكلاس.",
            "field عادي.",
            R`الـ decorator فوق الـ method على طول.`,
            "method عادية.",
            "تعديل.",
            "رجوع.",
            "قفلة.",
            R`[[@bound]] على reset.`,
            "method.",
            "تصفير.",
            "قفلة.",
            "قفلة الكلاس.",
            "instance.",
            R`بيطبع [[→ add(50)]] قبل ما يجمع.`,
            R`فصلنا الـ method عن الـ object.`,
            R`اشتغلت صح لأن [[bound]] ربطها.`,
            "0."
          ],
          sol: R`الناتج شكله كده (الأرقام بتختلف حسب الجهاز): [[sum: 5ms]] وبعدين [[499999500000]]، وبعدين [[slow: 121ms]] وبعدين [[تمام]]. المهم إن وقت [[slow]] حوالي 120ms أو أكتر: لو طلعلك 0ms يبقى طبعت الوقت أول ما الـ Promise اترجعت، مش لما خلصت.

الحيلة: لو الناتج [[instanceof Promise]]، اطبع في [[then]]. واستخدم [[result.then(done, done)]] مش [[result.finally(done)]]، لأن finally بترجّع Promise جديدة ولو الأصلية اترفضت، الجديدة دي كمان هتترفض ومحدش ماسكها. ورجّع [[result]] الأصلي زي ما هو عشان اللي بينادي يعمل await و catch عادي.

ومع [[--target esnext]]: tsc بيعدّي من غير أخطاء، بس [[node]] على الناتج بيقع بـ [[SyntaxError: Invalid or unexpected token]] عند [[@measure]]، لأن TS ساب الـ decorator زي ما هو و Node مبيفهموش.`,
          solCode: R`function measure<This, Args extends unknown[], R>(
  target: (this: This, ...args: Args) => R,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => R>,
) {
  const name = String(context.name);
  return function (this: This, ...args: Args): R {
    const start = performance.now();
    const result = target.call(this, ...args);
    const done = () => console.log($__bt$__{name}: $__{(performance.now() - start).toFixed(0)}ms$__bt);
    if (result instanceof Promise) result.then(done, done);
    else done();
    return result;
  };
}
class Reports {
  @measure
  sum(n: number) {
    let s = 0;
    for (let i = 0; i < n; i++) s += i;
    return s;
  }
  @measure
  async slow() {
    await new Promise((r) => setTimeout(r, 120));
    return "تمام";
  }
}
const r = new Reports();
console.log(r.sum(1_000_000));
console.log(await r.slow());
// npx tsc --strict --target es2022 --module nodenext --types node measure.ts && node measure.js`
        },
        {
          cmd: "experimentalDecorators و NestJS",
          title: "NestJS بيعرف يحقن الـ dependencies من نوع الباراميتر إزاي؟",
          desc: R`NestJS (زي Angular و TypeORM) مبني على النسخة القديمة من الـ decorators: [[experimentalDecorators]] مع [[emitDecoratorMetadata]] في tsconfig. ولحد NestJS 12، التمبلت بتاع [[nest new]] لسه بيحط الاتنين.

الخيار التاني هو السر: TS بيكتب في الـ JS أنواع باراميترات الـ constructor كقيم ([[design:paramtypes]]). فلما تكتب [[constructor(private readonly db: Db)]]، Nest بيقرا الـ metadata، يلاقي [[Db]]، يعمل منه instance (أو ياخد الموجود)، ويبعته. ده الـ dependency injection. المثال بيبني نسخة صغيرة من الفكرة دي بـ [[reflect-metadata]].

وفي Nest الشكل كده: [[@Controller("users")]] على الكلاس، و [[@Get(":id")]] على الـ method، و [[@Param("id")]] و [[@Body()]] على الباراميترات، و [[@Injectable()]] على الـ service. التفاصيل في «تاب Backend بـ Node».`,
          example: R`// npm i reflect-metadata
// npx tsc --strict --target es2023 --module nodenext --types node --experimentalDecorators --emitDecoratorMetadata di.ts
import "reflect-metadata";
type Ctor<T = unknown> = new (...args: any[]) => T;
function Injectable(): ClassDecorator {
  return () => {};
}
function resolve<T>(cls: Ctor<T>): T {
  const deps: Ctor[] = Reflect.getMetadata("design:paramtypes", cls) ?? [];
  return new cls(...deps.map((d) => resolve(d)));
}
@Injectable()
class Db {
  query(sql: string) { return [{ id: 1, sql }]; }
}
@Injectable()
class UsersService {
  constructor(private readonly db: Db) {}
  findAll() { return this.db.query("select * from users"); }
}
const users = resolve(UsersService);
console.log(users.findAll()); // [ { id: 1, sql: 'select * from users' } ]`,
          try: R`شغّل المثال بـ tsc بالإعدادات اللي في التعليق وبعدين [[node di.js]]. بعدها شغّله بـ [[npx tsx di.ts]] وقارن. وأخيرًا ضيف [[@Injectable() class Mailer]] الـ constructor بتاعه بياخد [[UsersService]] و [[Db]]، وفيه method [[welcomeAll()]] بترجّع [[welcome #1]] لكل user، واطلبه بـ [[resolve(Mailer)]].`,
          flag: "script",
          deep: {
            why: R`NestJS من أكتر الـ backends المطلوبة في إعلانات الشغل، وشكله مختلف تمامًا عن Express: كل حاجة كلاس عليه decorators، ومحدش بيعمل [[new]] بإيده. لو مش فاهم إن ده كله TS metadata وقت الـ build، الأخطاء زي «Nest can't resolve dependencies of UsersService (?)» هتبان سحر.`,
            how: R`مع [[experimentalDecorators]]، الـ decorators بتشتغل بالتوقيع القديم: class decorator بياخد الـ constructor، و method decorator بياخد [[(target, key, descriptor)]]، وفيه parameter decorators ([[@Body()]] و [[@Inject(TOKEN)]]) اللي الرسمية معندهاش خالص. وده السبب الأساسي إن Nest فاضل عليها.

ومع [[emitDecoratorMetadata]]، على أي كلاس أو method عليها decorator، TS بيضيف في الـ JS نداء زي [[__metadata("design:paramtypes", [Db])]]. يعني نوع اتحول لقيمة وقت التشغيل، وده الاستثناء الوحيد تقريبًا لقاعدة «الأنواع بتتمسح». وبيشتغل بس لو النوع كلاس (قيمة موجودة): لو الباراميتر interface أو union، الـ metadata بتبقى [[Object]] ومفيش حاجة تتحقن. عشان كده Nest بيستخدم كلاسات أو [[@Inject("TOKEN")]].

[[reflect-metadata]] polyfill بيضيف [[Reflect.getMetadata]]، و Nest بيستورده لوحده. والـ [[resolve]] في المثال بيعمل instance جديد كل مرة، أما Nest بيعمل instance واحد لكل provider (singleton) جوه الـ module ويعيد استخدامه.

الـ metadata بيكتبها tsc بس (و SWC لو شغلت الخيار ده فيه). esbuild (tsx و Vite) مبيكتبهاش، فـ [[resolve]] بيلاقي مفيش dependencies ويعمل [[new UsersService()]] من غير Db.

واتنين في tsconfig بتاع Nest لازم تعرفهم: [[strictPropertyInitialization: false]] (عشان DTOs زي [[class CreateUserDto { name: string }]] من غير constructor)، و [[target]] ES2023 مش esnext.`,
            when: R`في مشروع NestJS أو Angular أو TypeORM: سيب الإعدادات زي ما التمبلت عاملها ومتحاولش تحوّل للرسمية. في كود جديد مش مربوط بـ framework منهم: الرسمية (الدرس اللي فات)، أو من غير decorators خالص.`,
            mistakes: R`تشغّل Nest بـ tsx أو esbuild فيطلع [[Cannot read properties of undefined]] على dependency، أو Nest يقول can't resolve. وتكتب [[import type { Db }]] أو النوع interface فالـ metadata تبقى Function أو Object بدل الكلاس (جرّبتها بـ [[import type]] وطلعت [[[Function: Function]]]). ودوائر: A محتاج B و B محتاج A، والحل في Nest [[forwardRef]]. وتنسخ decorator رسمي في مشروع شغال بـ [[experimentalDecorators]] أو العكس. وفي الانترفيو: «إزاي Nest بيعرف يحقن من غير ما تقوله؟» الإجابة: [[emitDecoratorMetadata]] بيكتب أنواع الـ constructor كـ [[design:paramtypes]]، و Nest بيقراها بـ [[reflect-metadata]].`
          },
          lines: [
            R`polyfill بيضيف [[Reflect.getMetadata]] و [[Reflect.defineMetadata]].`,
            R`نوع «أي كلاس ينفع يتعمل منه [[new]]».`,
            R`decorator بالتوقيع القديم، زي [[@Injectable()]] في Nest.`,
            R`مبيعملش حاجة: وجوده بس بيخلي TS يكتب metadata الكلاس.`,
            "قفلة.",
            "الـ container بتاعنا: بيبني أي كلاس بالـ dependencies بتاعته.",
            R`بيقرا أنواع باراميترات الـ constructor اللي TS كتبها كقيم.`,
            "يبني كل dependency (بنفس الطريقة) ويبعتهم للـ constructor.",
            "قفلة.",
            "decorator على الكلاس.",
            R`dependency مفيهاش dependencies.`,
            "بترجّع داتا وهمية.",
            "قفلة.",
            "service تانية.",
            "بتعتمد على Db...",
            R`[[private readonly db: Db]]: parameter property، و TS كتب [[Db]] في الـ metadata.`,
            R`بتستخدم الـ db اللي اتحقن.`,
            "قفلة.",
            R`محدش كتب [[new Db()]]: الـ container هو اللي عملها.`,
            R`بيطبع الصف، يعني [[db]] اتحقن صح.`
          ],
          sol: R`بـ tsc و node: بيطبع [[[ { id: 1, sql: 'select * from users' } ]]].

بـ [[npx tsx di.ts]]: [[TypeError: Cannot read properties of undefined (reading 'query')]]. esbuild مكتبش [[design:paramtypes]]، فـ [[resolve]] لقى ليستة فاضية وعمل [[new UsersService()]] من غير Db. ده بالظبط اللي بيحصل لو شغلت Nest بأداة مبتكتبش decorator metadata.

و [[resolve(Mailer).welcomeAll()]] بيطبع [[[ 'welcome #1' ]]]، و [[Reflect.getMetadata("design:paramtypes", Mailer)]] بيطلع [[[ [class UsersService], [class Db] ]]]: الـ container بنى UsersService (ومعاها Db) وبنى Db تانية لـ Mailer. في Nest كانوا هيبقوا نفس الـ Db (singleton).`,
          solCode: R`// نفس المثال، وتحت UsersService:
@Injectable()
class Mailer {
  constructor(private readonly users: UsersService, private readonly db: Db) {}
  welcomeAll() {
    return this.users.findAll().map((u) => $__btwelcome #$__{u.id}$__bt);
  }
}
console.log(resolve(Mailer).welcomeAll());                      // [ 'welcome #1' ]
console.log(Reflect.getMetadata("design:paramtypes", Mailer));  // [ [class UsersService], [class Db] ]`
        },
        {
          cmd: "generic classes",
          title: "كلاس واحد يشتغل مع أي نوع ويفضل فاكره",
          desc: R`زي الدوال الـ generic (درس [[generics]])، الكلاس ممكن ياخد باراميتر نوع: [[class TtlCache<K, V>]]. كل instance بيتثبّت على نوع: [[new TtlCache<number, User>()]]، وبعد كده كل الـ methods عارفة إن المفتاح number والقيمة User.

وتقدر تحط constraint زي الدوال: [[class Repository<T extends { id: number }>]].`,
          example: R`class TtlCache<K, V> {
  #store = new Map<K, { value: V; expires: number }>();
  constructor(private readonly ttlMs: number) {}
  set(key: K, value: V): void {
    this.#store.set(key, { value, expires: Date.now() + this.ttlMs });
  }
  get(key: K): V | undefined {
    const hit = this.#store.get(key);
    if (!hit || hit.expires < Date.now()) return undefined;
    return hit.value;
  }
}
type User = { id: number; name: string };
const users = new TtlCache<number, User>(60_000);
users.set(1, { id: 1, name: "sara" });
console.log(users.get(1)?.name); // "sara"
users.set("1", { id: 1, name: "sara" }); // خطأ: string مش number
const loose = new TtlCache(1000); // K و V بقوا unknown
loose.set("x", 5);                // أي حاجة تعدّي`,
          try: R`اكتب [[class Repository<T extends { id: number }>]] فيه [[add(item)]] و [[findById(id)]] و [[all()]] على [[Map]] private. جرّبه على [[User]] وعلى [[Product]] ([[id]] و [[title]] و [[price]]). وبعدين جرّب [[new Repository<string>()]] و [[users.add({ id: 2 })]].`,
          flag: "script",
          deep: {
            why: R`الـ repositories والـ caches والـ queues والـ stores شكلها واحد مهما كان نوع الداتا. من غير generics يا تكتب كلاس لكل نوع، يا تستخدم [[any]] وتخسر الفحص. والـ SDKs مليانة الشكل ده ([[new Map<K, V>]] نفسه كلاس generic).`,
            how: R`باراميتر النوع بيتحدد مع [[new]]: يا تكتبه صريح [[new TtlCache<number, User>(...)]]، يا TS يستنتجه من arguments الـ constructor. في [[TtlCache]] الـ constructor بياخد [[ttlMs]] بس، فمفيش حاجة يستنتج منها K و V، فبيبقوا [[unknown]] وأي حاجة تعدّي. عشان كده اكتبهم لما الـ constructor مبيكشفهمش.

الـ static members مينفعش تستخدم باراميترات النوع ([[static empty: T]] بيطلّع TS2302)، لأن الـ static واحد للكلاس كله، والـ T بتختلف مع كل instance.

والـ generics بتتمسح زي أي نوع: [[new TtlCache<number, User>()]] و [[new TtlCache<string, Product>()]] نفس الكلاس وقت التشغيل، فمينفعش تسأل الـ instance «انت T بتاعك إيه؟».

وتقدر تحط default: [[class Page<T = unknown>]]، و constraint زي الدوال بالظبط.`,
            when: R`كلاسات «حاوية» لداتا: cache، و repository، و event emitter بأنواع events، و result wrapper. لو الكلاس بيتعامل مع نوع واحد بس، متعملوش generic.`,
            mistakes: R`[[new Cache()]] من غير أنواع فكله unknown (أو any في كود قديم). و generic كلاس بـ ٤ باراميترات محدش فاهمها. وتفتكر إنك تقدر تعمل [[new T()]] جوه الكلاس: T نوع ومش موجود وقت التشغيل، لازم تبعت الكلاس نفسه كباراميتر ([[ctor: new () => T]]).`
          },
          lines: [
            R`كلاس بنوعين: المفتاح [[K]] والقيمة [[V]].`,
            R`[[Map]] private بنفس الأنواع، وكل قيمة معاها وقت انتهاء.`,
            "parameter property: مدة الصلاحية.",
            R`[[set]] بياخد K و V بس.`,
            "بيخزن القيمة ووقت انتهائها.",
            "قفلة.",
            R`[[get]] بترجّع V أو undefined.`,
            "بيدوّر.",
            "مش موجود أو انتهى: undefined.",
            "القيمة بنوعها V.",
            "قفلة.",
            "قفلة الكلاس.",
            "نوع.",
            "instance ثابت على number و User.",
            "مسموح.",
            R`TS عارف إن الناتج User، فـ [[name]] بتكمّل.`,
            R`المفتاح لازم number: TS2345.`,
            R`من غير أنواع ومن غير arguments توضّحها: K و V بقوا [[unknown]].`,
            "فأي نوع مقبول، والفحص راح."
          ],
          sol: R`الناتج [[sara]] وبعدين [[[ 350 ]]]. و [[users.findById(1)]] نوعها [[User | undefined]]، فلازم [[?.]] أو فحص.

و [[new Repository<string>()]] بيطلّع TS2344 (Type 'string' does not satisfy the constraint '{ id: number; }')، و [[users.add({ id: 2 })]] بيطلّع TS2741 (Property 'name' is missing): الـ repository فاكر إنه بتاع User.

ولو كتبت الكلاس من غير constraint ([[class Repository<T>]])، [[item.id]] جوه [[add]] هتطلّع Property 'id' does not exist on type 'T'. الـ constraint هو اللي بيقول لـ TS إن أي T فيها id.`,
          solCode: R`class Repository<T extends { id: number }> {
  #items = new Map<number, T>();
  add(item: T): T {
    this.#items.set(item.id, item);
    return item;
  }
  findById(id: number): T | undefined {
    return this.#items.get(id);
  }
  all(): T[] {
    return [...this.#items.values()];
  }
}
type User = { id: number; name: string };
type Product = { id: number; title: string; price: number };
const users = new Repository<User>();
users.add({ id: 1, name: "sara" });
console.log(users.findById(1)?.name);           // sara
const products = new Repository<Product>();
products.add({ id: 7, title: "ماوس", price: 350 });
console.log(products.all().map((p) => p.price)); // [ 350 ]`
        }
      ]
    },
    {
      t: "tsconfig",
      l: 3,
      n: "الفحص قد إيه صارم، و TS بيلاقي الـ imports إزاي، وبيطلّع JS لأنهي بيئة",
      items: [
        {
          cmd: "strict و noUncheckedIndexedAccess",
          title: "إعدادات الفحص اللي بتخلي TS يمسك الغلط بجد",
          desc: R`[["strict": true]] بيشغّل مجموعة فحوصات مع بعض، أهمهم [[strictNullChecks]] و [[noImplicitAny]]. من غيره TS بيسيب نص الأخطاء تعدّي. وفي TS 6 و 7 بقى الافتراضي، بس اكتبه صريح عشان محدش يشيله.

وفوقه، [[noUncheckedIndexedAccess]] بيخلي [[arr[i]]] و [[obj[key]]] نوعهم [[T | undefined]]، لأن العنصر ممكن ميكونش موجود. ده بيمسك نوع كامل من الأخطاء اللي strict لوحده مش بيمسكها.`,
          example: R`// "noUncheckedIndexedAccess": true في tsconfig
const tags = ["ts", "react"];
const first = tags[0];
first.toUpperCase(); // خطأ: 'first' is possibly 'undefined'
if (first) first.toUpperCase();
for (const t of tags) t.toUpperCase();
const prices: Record<string, number> = { tea: 10 };
const coffee = prices["coffee"];
const total = (coffee ?? 0) * 2;
prices.tea.toFixed(2); // خطأ: 'prices.tea' is possibly 'undefined'`,
          try: R`شغّل [[noUncheckedIndexedAccess]] في مشروع قايم و [[npx tsc --noEmit]]، وعدّ الأخطاء اللي طلعت. أغلبها هتلاقيه [[arr[0]]] أو [[params[id]]]، وكل واحد منهم كان crash محتمل.`,
          flag: "script",
          deep: {
            why: "TS من غير strict بيسيب أهم الأخطاء: null في أي نوع، وباراميترات من غير نوع بتبقى any بهدوء. ومع strict لوحده، [[arr[0]]] لسه بيتعامل كأنه موجود دايمًا، وده من أشهر أسباب «Cannot read properties of undefined» في كود TS.",
            how: R`[[strict]] مش إعداد واحد، ده اختصار لعيلة: [[strictNullChecks]] (null و undefined مش في أي نوع)، و [[noImplicitAny]] (ممنوع any متستنتج)، و [[strictFunctionTypes]]، و [[strictBindCallApply]]، و [[strictPropertyInitialization]] (خصايص الكلاس لازم تتعمل في الـ constructor)، و [[useUnknownInCatchVariables]] (e في catch نوعها unknown)، وغيرهم. وأي فحص جديد من النوع ده بيتضاف للعيلة مع الوقت.

[[noUncheckedIndexedAccess]] مش جوه strict لأنه بيطلّع أخطاء كتير في كود قديم. بيضيف [[| undefined]] لأي قراية بـ index: [[arr[i]]]، و [[record[key]]]، وحتى [[record.key]] لو النوع index signature. الـ tuples ([[[string, number]]]) مش متأثرة لأن طولها معروف، و [[for...of]] و [[map]] مش متأثرين. و [[tsc --init]] الجديد بيشغّله.

[[exactOptionalPropertyTypes]] بيفرّق بين «الخاصية مش موجودة» و «موجودة وقيمتها undefined». أدق، بس بيضايق مع مكتبات كتير، فناس بتقفله.

و [[skipLibCheck]] بيقفل فحص ملفات .d.ts بتاعة المكتبات: أسرع بكتير، ومش بيأثر على فحص كودك.`,
            when: "[[strict]] من أول يوم في أي مشروع، من غير نقاش. و [[noUncheckedIndexedAccess]] في المشاريع الجديدة، أو تدريجيًا في القديمة. وفي مشروع حقيقي (monorepo) كان شغال في الـ base config مع [[noImplicitReturns]] و [[noFallthroughCasesInSwitch]]، ودي بداية كويسة.",
            mistakes: R`مشروع قديم [[strict: false]] ومحدش واخد باله، فنص TS مقفول. و [[// @ts-ignore]] فوق كل خطأ: لو لازم، استخدم [[// @ts-expect-error]]، لأنها بتطلّع خطأ لو المشكلة اتحلت فتفتكر تشيلها. وتحل أخطاء noUncheckedIndexedAccess كلها بـ [[!]].`
          },
          lines: [
            "ليستة strings.",
            R`نوعها [[string | undefined]] مع الإعداد ده. من غيره: string وخلاص.`,
            "الليستة ممكن تبقى فاضية، فممنوع من غير فحص.",
            "بعد الفحص تمام.",
            R`[[for...of]] مش متأثر: كل عنصر فيه string أكيد.`,
            "قاموس مفاتيحه أي string.",
            R`مفتاح مش موجود: [[number | undefined]]، وده الحقيقي.`,
            "قيمة بديلة.",
            R`حتى بالنقطة: الـ Record مش ضامن إن [[tea]] موجودة.`
          ],
          sol: R`مفيش عدد صح. المهم تصنّف الأخطاء. هتلاقي أغلبها TS2532 (Object is possibly 'undefined') أو TS18048 ('x' is possibly 'undefined') على [[arr[0]]] و [[params[id]]] و [[map[key]]]. أما [[for...of]] و [[.map]] و [[.find]] (دي كانت undefined من الأول) مش هتتأثر.

الحل لكل واحد: فحص ([[if (!first) return]])، أو default بـ [[??]]، أو [[.at(0)]] مع فحص. متحطش [[!]] على الكل عشان الأخطاء تختفي، كده رجعت لنفس المشكلة. ولو مطلعش ولا خطأ، اتأكد إنك حطيت الإعداد جوه [[compilerOptions]] مش برّاها.`
        },
        {
          cmd: "module و moduleResolution",
          title: "TS بيدوّر على الـ imports إزاي، وبيطلّع JS لأنهي بيئة",
          desc: R`[[module]] بيقول شكل الـ imports في الـ JS الناتج، و [[moduleResolution]] بيقول TS يلاقي الملف اللي بتستورده إزاي. والقاعدة: لو فيه bundler (Vite و Next) [["module": "esnext"]] مع [["moduleResolution": "bundler"]]. ولو Node بيشغّل الناتج مباشرة [["module": "nodenext"]]، وهو بيظبط الـ resolution لوحده.

و [[target]] نسخة JS اللي هتطلع: Node 24 والمتصفحات الحديثة بيفهموا [[es2024]] أو أحدث، فمفيش سبب تنزل لـ ES5 (اللي اتشالت أصلًا في TS 7).`,
          example: R`// tsconfig.json لسيرفر Node (Express) بيتبني بـ tsc
{
  "compilerOptions": {
    "target": "es2024",
    "module": "nodenext",
    "rootDir": "src",
    "outDir": "dist",
    "types": ["node"],
    "strict": true,
    "verbatimModuleSyntax": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
// Vite أو Next: "module": "esnext" و "moduleResolution": "bundler" و "noEmit": true`,
          try: R`في مشروع Node بـ [["module": "nodenext"]] و [["type": "module"]]، اكتب [[import { db } from "./db"]] من غير امتداد وشوف الخطأ، وبعدين خليها [[./db.js]] (أيوة .js، مع إن الملف .ts).`,
          flag: "script",
          deep: {
            why: "أغرب أخطاء TS جاية من هنا: [[Cannot find module]] والملف موجود، أو [[ERR_MODULE_NOT_FOUND]] وقت التشغيل، أو import شغال في Vite ومش شغال في Node. كلها لأن TS فاكر إن الكود هيشتغل في بيئة، وهو بيشتغل في بيئة تانية.",
            how: R`فيه سؤالين منفصلين:

الأول: الـ JS الناتج شكله إيه؟ ده [[module]]. [[nodenext]] بيطلّع ESM أو CommonJS لكل ملف حسب package.json ([["type": "module"]]) أو الامتداد ([[.mts]] و [[.cts]]). و [[esnext]] بيطلّع ESM دايمًا وبيسيب الباقي للـ bundler.

التاني: [[import "./db"]] يعني أنهي ملف؟ ده [[moduleResolution]]. [[bundler]] بيقلّد Vite و webpack: الامتداد اختياري، و [[index.ts]] بيتلاقي لوحده. و [[nodenext]] بيقلّد Node بالظبط: في ESM الامتداد إجباري، ولأن TS مبيغيّرش الـ imports، بتكتب [[./db.js]] (الملف اللي هيبقى موجود بعد الـ build) مع إن الملف عندك [[db.ts]].

[[moduleResolution: node]] (أو [[node10]]) القديم اتشال في TS 7: في مشروع حقيقي كان الـ backend عليه مع [["module": "commonjs"]]، وأول ما يترقّى لـ TS 7 هيطلّع خطأ. وكمان [[baseUrl]] اتشال، و [[esModuleInterop]] بقى شغال دايمًا.

[[target]] بيحدد الـ syntax الناتج بس، و [[lib]] بيحدد الأنواع المتاحة ([[DOM]] للمتصفح). و [[verbatimModuleSyntax]] بيخلي TS يطلّع الـ imports زي ما هي بالظبط، وده بيجبرك تكتب [[import type { User }]] للأنواع: مهم لأدوات زي esbuild و Node اللي بتترجم ملف ملف ومتعرفش إن User نوع مش قيمة.`,
            when: "Next و Vite وأي bundler: [[bundler]] و [[esnext]] و [[noEmit]]. سيرفر Node بتعمله build بـ tsc: [[nodenext]]. ولو بتشغّل بـ tsx بس ومش بتعمل build: [[bundler]] بيريّحك من الامتدادات.",
            mistakes: R`[[moduleResolution: bundler]] في سيرفر Node بيتبني بـ tsc: TS يوافق على [[import "./db"]] من غير امتداد، والـ build ينجح، و Node يقع بـ [[ERR_MODULE_NOT_FOUND]]. ونسخ tsconfig من مشروع Next لمشروع Express. وخلط [["type": "module"]] في package.json مع [["module": "commonjs"]].`
          },
          lines: [
            "بداية الملف.",
            "إعدادات الـ compiler.",
            "اطلّع JS بنسخة 2024: Node 24 بيفهمها كلها.",
            R`Node الحديث: ESM أو CommonJS حسب [["type"]] في package.json، والـ resolution زي Node بالظبط.`,
            "الكود المصدر.",
            R`الـ JS الناتج، وده اللي [[node dist/index.js]] بيشغّله.`,
            "أنواع Node (process و Buffer). في TS 6 و 7 لازم تتكتب.",
            "الفحص الصارم.",
            R`[[import type]] للأنواع إجباري، والـ imports بتطلع زي ما كتبتها بالظبط.`,
            "متفحصش ملفات .d.ts بتاعة المكتبات.",
            "قفلة compilerOptions.",
            "الملفات اللي TS يفحصها.",
            "قفلة."
          ],
          sol: R`[[import { db } from "./db"]] بيطلّع: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './db.js'? (TS2835).

بعد ما تخليها [[./db.js]] الخطأ بيختفي، و [[tsc]] بيطلّع [[dist/main.js]] فيه [[./db.js]] زي ما هو، و [[node dist/main.js]] بيشتغل. TS مبيغيّرش الـ imports، فانت بتكتب اسم الملف اللي هيبقى موجود بعد الـ build، و TS بيعرف إن [[db.js]] أصله [[db.ts]]. الغلطة: تكتب [[./db.ts]]، فتاخد TS5097 (An import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled)، والإعداد ده مش بيشتغل غير مع [[noEmit]] (يعني حاجة تانية هي اللي بتشغّل الكود).`
        },
        {
          cmd: "paths",
          title: "imports قصيرة زي @/lib/db بدل ../../../lib/db",
          desc: R`[[paths]] في tsconfig بيعمل aliases: [["@/*": ["./src/*"]]] بيخلي [[import { db } from "@/lib/db"]] يشاور على [[src/lib/db.ts]]. ومن غير [[baseUrl]] (اتشال في TS 7): المسارات نسبةً لمكان الـ tsconfig.

بس خلي بالك: [[paths]] بيعلّم TS يلاقي الملف وقت الفحص، ومبيغيّرش الـ import في الـ JS. اللي بيشغّل الكود (Next أو Vite أو tsx) لازم يفهم الـ alias هو كمان.`,
          example: R`// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@shared/*": ["../packages/shared/src/*"]
    }
  }
}`,
          try: R`في مشروع Next افتح [[tsconfig.json]] ولاقي الـ [["@/*"]]. وبعدين اعمل مشروع Node صغير فيه paths، اعمله build بـ [[tsc]] وشغّل [[node dist/index.js]]: هيقع بـ [[ERR_MODULE_NOT_FOUND]]، لأن الـ JS لسه فيه [[@/lib]] زي ما هو.`,
          flag: "script",
          deep: {
            why: R`في مشروع كبير، [[import { db } from "../../../lib/db"]] بيتكسر أول ما تنقل الملف فولدر، ومحدش بيعرف يعدّ النقط. الـ alias بيخلي كل import ثابت بغض النظر مكان الملف فين.`,
            how: R`[[paths]] بيأثر على حاجة واحدة: TS وهو بيفحص ويلاقي الملفات. الـ JS الناتج فيه [[@/lib/db]] زي ما هو بالظبط، و TS مبيعيدش كتابة الـ imports أبدًا.

عشان كده لازم اللي بيشغّل أو بيبني يفهم نفس الـ alias: Next بيقرا [[paths]] من tsconfig لوحده، و tsx كمان. و Vite محتاج [[resolve.alias]] في vite.config أو plugin يقرا tsconfig. و Vitest و Jest محتاجين إعداد برضه.

وسيرفر Node بتعمله build بـ [[tsc]] وتشغّله بـ [[node dist/index.js]]: [[paths]] مش هتشتغل. يا تستخدم imports نسبية، يا bundler للسيرفر (esbuild أو tsup)، يا خانة [[imports]] في package.json (subpath imports بتبدأ بـ [[#]]) اللي Node نفسه بيفهمها.

زمان [[paths]] كان محتاج [[baseUrl]]. دلوقتي لأ، و TS 7 شال [[baseUrl]] خالص: لو شايفه في مشروع قديم، شيله وخلي مسارات paths تبدأ بـ [[./]].

وفي monorepo حقيقي كانت [[paths]] بتشاور على [[packages/shared/src/index.ts]] مباشرة، فالتطبيق بيستورد الكود المشترك من غير build، والـ bundler هو اللي بيترجمه.`,
            when: "أي مشروع فيه أكتر من مستويين فولدرات. Next بيعمله لوحده. وفي monorepo لو مش بتستخدم workspaces (تفاصيل workspaces في تاب «Node و npm»).",
            mistakes: R`تضيف [[paths]] في tsconfig وتفتكر خلاص، و Vite أو Node يقولك مش لاقي الـ module. و [["@/*": ["src/*"]]] من غير [[./]] ومن غير baseUrl: TS بيرفضها (non-relative paths are not allowed). و alias بيتصادم مع اسم باكدج npm حقيقية.`
          },
          lines: [
            "بداية الـ tsconfig.",
            "الإعدادات.",
            "الـ aliases.",
            R`[[@/]] وبعدها أي مسار يروح لـ [[src/]]. نفس اللي [[create-next-app]] بيعمله.`,
            "في monorepo: باكدج مشتركة من فولدر تاني.",
            "قفلة paths.",
            "قفلة compilerOptions.",
            "قفلة."
          ],
          sol: R`في Next هتلاقي [["paths": { "@/*": ["./src/*"] }]] (أو [["./*"]] لو مفيش src). وفي مشروع Node، [[tsc]] بيعدّي من غير أخطاء، و [[dist/index.js]] فيه [[import { db } from "@/lib/db.js"]] زي ما هو، و [[node dist/index.js]] بيقع بـ: [[Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@/lib' imported from .../dist/index.js]]. Node فاكر [[@/lib]] اسم package.

الحل اللي Node بيفهمه لوحده: subpath imports في package.json زي الكود تحت، و import بـ [[#lib/db.js]]. TS بيفهمها كمان ويوصل لـ [[src]] من غير paths. ([[#/]] لوحدها بدون اسم مش مقبولة في Node 22، فابدأ باسم زي [[#lib]].)`,
          solCode: R`// package.json
{
  "type": "module",
  "imports": { "#lib/*": "./dist/lib/*" }
}
// src/index.ts
import { db } from "#lib/db.js";
console.log(db);`
        }
      ]
    },
    {
      t: "Zod: فحص وقت التشغيل",
      l: 3,
      n: "الأنواع بتتمسح، فالداتا اللي جاية من برّه محتاجة فحص حقيقي. Zod بيعمل الفحص ويطلّع النوع من نفس المكان",
      items: [
        {
          cmd: "z.object و z.infer",
          title: "schema واحدة تطلّع منها الفحص والنوع مع بعض",
          desc: R`Zod مكتبة بتوصف فيها شكل الداتا كـ schema، وتفحص بيها أي قيمة وقت التشغيل. و [[z.infer<typeof Schema>]] بيطلّع نوع TS من نفس الـ schema، فمش محتاج تكتب النوع مرتين.

ده الحل للمشكلة اللي في أول التاب: الأنواع بتتمسح، والداتا اللي جاية من برّه (API و forms و env) محتاجة فحص حقيقي. النسخة الحالية Zod 4: [[npm i zod]].`,
          example: R`import * as z from "zod";
const UserSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  age: z.number().int().positive().optional(),
  role: z.enum(["admin", "user"]).default("user"),
  tags: z.array(z.string()).max(5),
});
type User = z.infer<typeof UserSchema>;
const user = UserSchema.parse({ name: "Sara", email: "you@example.com", tags: [] });
console.log(user.role); // "user"
UserSchema.parse({ name: "S", email: "bad", tags: [] }); // بيرمي ZodError`,
          try: R`شغّل المثال بـ tsx، وحط آخر سطر جوه try/catch واطبع [[e.issues]]. وبعدين ضيف [[phone: z.string().optional()]] للـ schema وحط الماوس على [[User]]: النوع اتحدّث لوحده.`,
          flag: "script",
          deep: {
            why: R`من غير Zod عندك حاجتين منفصلين: [[type User = {...}]] للـ compiler، وفحص بإيدك ([[if (typeof body.email !== "string")]]) لوقت التشغيل. الاتنين بيبعدوا عن بعض مع الوقت: تضيف حقل في النوع وتنسى الفحص. Zod بيخلي الـ schema مصدر الحقيقة الوحيد.`,
            how: R`الـ schema object عادي في JS، موجود وقت التشغيل، وجواه قواعد الفحص. و [[parse(value)]] بتمشي على القيمة وتفحص كل حاجة، وترجع نسخة جديدة (مش نفس الـ object) فيها الـ defaults والتحويلات، ومن غير المفاتيح اللي مش معرّفة في الـ schema (بتتشال افتراضيًا).

[[z.infer]] شغل TS بس: بيقرا نوع الـ schema ويحوّله لنوع الداتا. ولو فيه [[.transform()]] بيغيّر النوع، [[z.input]] نوع اللي داخل و [[z.output]] (زي infer) نوع اللي خارج.

في Zod 4: الـ string formats بقت top-level ([[z.email()]] و [[z.url()]] و [[z.uuid()]])، والقديمة [[z.string().email()]] لسه شغالة بس deprecated. ورسالة الخطأ المخصصة بقت [[{ error: "..." }]] بدل [[message]]. و [[z.strictObject]] بيرفض المفاتيح الزيادة بدل ما يشيلها، و [[z.looseObject]] بيسيبها.

و Zod بيشتغل في المتصفح والسيرفر، فنفس الـ schema ينفع للـ form في React وللـ API في Express. حط الـ schemas في مكان مشترك (زي [[packages/shared]] في monorepo أو [[lib/validations]]).`,
            when: "أي داتا جاية من برّه كودك: body و query بتوع request، ورد API خارجي، و env، و localStorage، و forms، ورسايل WebSocket، وناتج AI بـ JSON.",
            mistakes: R`تكتب النوع بإيدك وجنبه schema بتوصف نفس الحاجة: خليها schema و [[z.infer]]. وتستخدم أمثلة Zod 3 ([[z.string().email()]] و [[error.errors]] و [[.flatten()]]) في مشروع Zod 4: شغالة بتحذير، أو اتشالت. وفي مشروع حقيقي كان الكود بيقرا [[(error as any).issues ?? (error as any).errors]] عشان يدعم النسختين: في Zod 4 [[error.issues]] بس، وبنوعها الصح من غير any.`
          },
          lines: [
            "Zod 4. الـ docs بتنصح بالشكل ده للـ import.",
            "schema لـ object.",
            "string على الأقل حرفين.",
            R`إيميل. في Zod 4 الـ formats بقت دوال لوحدها ([[z.email()]] بدل [[z.string().email()]]).`,
            "رقم صحيح موجب، واختياري.",
            R`واحد من الاتنين، ولو مش موجود يبقى [["user"]].`,
            "ليستة strings، بحد أقصى ٥.",
            "قفلة.",
            "النوع طالع من الـ schema: عدّل الـ schema والنوع يتعدّل.",
            R`[[parse]]: لو الداتا سليمة بترجعها بالنوع الصح وبالـ defaults.`,
            R`[[role]] موجودة مع إننا مبعتناهاش.`,
            R`داتا غلط: [[parse]] بترمي ZodError فيه كل المشاكل (name قصير و email غلط).`
          ],
          sol: R`الناتج الأول [[user]]: الـ default اشتغل. وبعدين [[e.issues]] فيها عنصرين: واحد [[code: 'too_small']] و [[path: [ 'name' ]]] ورسالته Too small: expected string to have >=2 characters، والتاني [[code: 'invalid_format']] و [[format: 'email']] و [[path: [ 'email' ]]] ورسالته Invalid email address.

في الـ catch، [[e]] نوعها unknown، فـ [[e.issues]] مباشرة بتطلّع 'e' is of type 'unknown'. افحص بـ [[e instanceof z.ZodError]] الأول. وبعد ما تضيف [[phone]] هتلاقي [[phone?: string | undefined]] في [[User]] لوحدها.`,
          solCode: R`import * as z from "zod";
const UserSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  tags: z.array(z.string()).max(5),
  phone: z.string().optional(),
});
try {
  UserSchema.parse({ name: "S", email: "bad", tags: [] });
} catch (e) {
  if (e instanceof z.ZodError) console.log(e.issues);
}`
        },
        {
          cmd: "safeParse",
          title: "تتحقق من الداتا من غير ما يترمي exception، وتطلّع الأخطاء لكل حقل",
          desc: R`[[schema.safeParse(value)]] مبترميش. بترجع object: يا [[{ success: true, data }]] يا [[{ success: false, error }]]، وده discriminated union، فبعد [[if (!result.success)]] TS عارف إن [[data]] موجودة.

و [[z.flattenError(result.error)]] بيحوّل الأخطاء لـ [[fieldErrors]]: لكل حقل ليستة رسايل، جاهزة ترجعها للـ form أو في رد 400.`,
          example: R`import * as z from "zod";
const Signup = z.object({
  email: z.email({ error: "إيميل مش صحيح" }),
  password: z.string().min(8, { error: "٨ حروف على الأقل" }),
});
function validate(input: unknown) {
  const result = Signup.safeParse(input);
  if (!result.success) {
    return { ok: false as const, errors: z.flattenError(result.error).fieldErrors };
  }
  return { ok: true as const, data: result.data };
}
console.log(validate({ email: "x", password: "123" }));
// { ok: false, errors: { email: ["إيميل مش صحيح"], password: ["٨ حروف على الأقل"] } }`,
          try: R`بدّل [[z.flattenError(result.error).fieldErrors]] بـ [[z.treeifyError(result.error)]] وبعدين بـ [[z.prettifyError(result.error)]] (من غير [[.fieldErrors]]) واطبع الناتج في كل مرة. الأولى للـ forms البسيطة، والتانية للـ objects المتداخلة، والتالتة للّوجات.`,
          flag: "script",
          deep: {
            why: "[[parse]] بترمي، وده مناسب لما الداتا الغلط «مستحيلة» (زي env). بس في request من مستخدم، الداتا الغلط حاجة عادية ومتوقعة، والـ try/catch حوالين كل validation بيبقى تقيل. [[safeParse]] بيخلي الفشل قيمة عادية تتعامل معاها بـ if.",
            how: R`[[safeParse]] بترجع discriminated union على [[success]] (زي درس discriminated unions بالظبط): [[{ success: true; data: T }]] أو [[{ success: false; error: ZodError }]].

والـ ZodError فيه [[issues]]: ليستة، كل واحدة فيها [[path]] (زي [[["address", "city"]]]) و [[message]] و [[code]]. وفيه ٣ helpers جاهزين في Zod 4: [[z.flattenError]] (مستوى واحد: [[formErrors]] و [[fieldErrors]])، و [[z.treeifyError]] (شجرة بنفس شكل الـ schema للـ objects المتداخلة)، و [[z.prettifyError]] (نص مقروء للّوج). و [[.flatten()]] و [[.format()]] القديمة deprecated.

ولو فيه refine أو transform async (مثلًا تفحص إن الإيميل مش مستخدم في القاعدة)، استخدم [[safeParseAsync]].

ومهم: رسايل الأخطاء بترجع للمستخدم، فمترجعش [[issues]] كاملة لو فيها تفاصيل داخلية، ومترجعش القيمة اللي اتبعتت (ممكن تبقى باسورد).`,
            when: "request body و query و forms: [[safeParse]]. وإعدادات وقت التشغيل (env) أو داتا «لازم» تكون سليمة وإلا يبقى فيه bug: [[parse]].",
            mistakes: R`تكتب [[result.data]] قبل ما تفحص [[success]]: TS هيمنعك، ودي الميزة. وترجع [[error]] كله للـ client. وتعمل [[parse]] جوه route من غير try/catch، فأي request غلط يطلّع 500 بدل 400.`
          },
          lines: [
            "Zod 4.",
            "schema للتسجيل.",
            R`رسالة مخصصة بـ [[error]] (في Zod 3 كانت [[message]]).`,
            "نفس الفكرة مع الحد الأدنى.",
            "قفلة.",
            R`الداتا جاية [[unknown]]، وده الصح.`,
            "فحص من غير throw.",
            "فشل؟",
            R`رسايل لكل حقل. و [[as const]] بيخلي ok نوعها literal، عشان اللي بينادي يقدر يضيّق.`,
            "قفلة.",
            R`نجاح: [[result.data]] نوعها [[{ email: string; password: string }]].`,
            "قفلة.",
            "الناتج: رسالة لكل حقل غلط."
          ],
          sol: R`[[flattenError(...).fieldErrors]]: [[{ email: [ 'إيميل مش صحيح' ], password: [ '٨ حروف على الأقل' ] }]]، object مسطّح والمفتاح اسم الحقل.

[[treeifyError]]: [[{ errors: [], properties: { email: { errors: ['إيميل مش صحيح'] }, password: { errors: ['٨ حروف على الأقل'] } } }]]، شجرة بنفس شكل الداتا. [[console.log]] هيعرضها [[[Object]]] لو متداخلة، فاطبعها بـ [[JSON.stringify(x, null, 2)]].

[[prettifyError]]: string جاهز للّوج، كل خطأ في سطر بعلامة ✖ وتحته [[→ at email]] و [[→ at password]]. ولو لقيت الرسايل بالإنجليزي (Invalid email address)، يبقى [[{ error: "..." }]] مش متحطة أو مكتوبة [[message]] بالطريقة القديمة.`
        },
        {
          cmd: "env بـ Zod",
          title: "التطبيق يرفض يقوم لو متغير بيئة ناقص أو غلط",
          desc: R`بدل [[process.env.X!]] في كل ملف، اعمل ملف [[env.ts]] واحد: schema لكل المتغيرات، وفحص [[process.env]] مرة واحدة أول ما التطبيق يقوم، وصدّر الناتج. لو حاجة ناقصة، التطبيق يقع فورًا برسالة واضحة، مش بعد ساعة في أول request.

والناتج typed: [[env.PORT]] رقم مش string، و [[env.NODE_ENV]] واحدة من ٣ قيم.`,
          example: R`import * as z from "zod";
const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().default(3000),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  SENTRY_DSN: z.url().optional(),
});
const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("متغيرات البيئة غلط:\n" + z.prettifyError(parsed.error));
  process.exit(1);
}
export const env = parsed.data;`,
          try: R`امسح [[JWT_SECRET]] من .env وشغّل التطبيق: المفروض يقع فورًا برسالة فيها اسم المتغير. وبعدين حط [[PORT=abc]] وشوف الرسالة.`,
          flag: "script",
          deep: {
            why: "[[process.env.X]] نوعها [[string | undefined]] دايمًا، فالحل السريع [[!]] أو [[as string]]، والمتغير الناقص بيعدّي لحد ما حد يستخدمه. على السيرفر ده معناه ديبلوي «نجح» والتطبيق شغال، وأول دفع أو أول login يقع.",
            how: R`[[process.env]] object كل قيمه strings أو undefined. الـ schema بتحوّله لـ object مفحوص: [[z.coerce.number()]] بيعمل [[Number(value)]] وبعدين يفحص إنه رقم، و [[default]] بيملى الناقص، و [[optional]] بيسيبه undefined.

والفحص بيحصل أول ما الملف يتعمله import. عشان كده [[env.ts]] لازم يتعمله import بدري (في [[server.ts]] أو [[index.ts]])، مش جوه دالة بتتنادي بعدين.

وفي مشروع حقيقي كان فيه [[env.ts]] بـ Zod، بس لما الفحص يفشل كان بيعمل [[console.error]] وبس، ويكمّل. وفي نفس المشروع ملفات تانية بتستخدم [[process.env.KEY!]] مباشرة بدل الـ env المفحوص. النتيجة: الفحص موجود بس مش بيحمي. الحل: [[process.exit(1)]] أو throw، واستخدم الـ env المصدّر بس.

و Next.js فيه تفصيلة: متغيرات [[NEXT_PUBLIC_*]] بتتحط في كود المتصفح وقت الـ build، ولازم تتكتب بالاسم الكامل ([[process.env.NEXT_PUBLIC_URL]]) عشان Next يلاقيها، فاعمل schema للسيرفر و schema للـ client (التفاصيل في تاب «Next.js»).

وخلي بالك: [[z.coerce.boolean()]] بتحوّل أي string مش فاضي لـ true، يعني [["false"]] تبقى true. للـ booleans في env استخدم [[z.stringbool()]] في Zod 4.`,
            when: "كل مشروع Node أو Next أو Express من أول يوم. ونفس الفكرة في Python بـ pydantic-settings (تاب «Python و FastAPI»).",
            mistakes: R`validation بتطبع الخطأ وتكمّل. و [[z.coerce.boolean()]] لقيمة [["false"]]. و [[z.string()]] للـ PORT فيفضل string. وتحط قيم secrets حقيقية كـ [[default]] في الكود.`
          },
          lines: [
            "Zod.",
            "schema لكل متغيرات البيئة في مكان واحد.",
            "قيم محددة، والافتراضي development.",
            R`[[process.env]] كله strings، و [[coerce]] بيحوّل [["3000"]] لرقم ويفحصه.`,
            "لازم URL صحيح.",
            "secret قصير يعني ضعيف، فارفضه.",
            "اختياري.",
            "قفلة.",
            "افحص مرة واحدة وقت التشغيل.",
            "لو فيه مشكلة...",
            "...اطبع كل المشاكل مرة واحدة برسالة مقروءة...",
            "...واقفل التطبيق. ده المهم: متكمّلش.",
            "قفلة.",
            "صدّر env مفحوص ونوعه معروف، واستخدمه بدل process.env في كل حتة."
          ],
          sol: R`من غير [[JWT_SECRET]] التطبيق بيقف فورًا (exit code 1) ويطبع: [[متغيرات البيئة غلط:]] وتحتها [[✖ Invalid input: expected string, received undefined]] و [[→ at JWT_SECRET]]. ومع [[PORT=abc]]: [[✖ Invalid input: expected number, received NaN]] و [[→ at PORT]].

خلي بالك إن .env لازم يتقري الأول ([[node --env-file=.env]] أو dotenv)، وإلا هتلاقي كل المتغيرات ناقصة. وفيه فخ: [[PORT=]] فاضية بتعدّي والتطبيق يقوم على بورت [[0]]، لأن [[z.coerce.number()]] بيحوّل الـ string الفاضي لـ 0. لو ده يفرق معاك زوّد [[.positive()]].`
        }
      ]
    },
    {
      t: "الأنواع في React و Express و Prisma",
      l: 3,
      n: "props و events و state، و req.body اللي نوعه any، وأنواع القاعدة الجاهزة، ورد API من غير كذب",
      items: [
        {
          cmd: "props و ComponentProps",
          title: "تكتب أنواع props لكومبوننت React، وتلف عنصر HTML بكل خصايصه",
          desc: R`props الكومبوننت object عادي، فنوعها [[type Props = { ... }]] وبتعمله destructuring في الباراميتر. و [[children]] نوعها [[ReactNode]]: أي حاجة تتعرض (نص، أو JSX، أو null، أو ليستة).

ولو بتعمل كومبوننت بيلف عنصر HTML (زرار أو input)، [[ComponentProps<"button">]] بيدّيك كل خصايص الزرار الأصلية ([[onClick]] و [[disabled]] و [[type]] و aria)، وتضيف عليها بتاعتك.`,
          example: R`import type { ComponentProps, ReactNode } from "react";
type CardProps = { title: string; footer?: ReactNode; children: ReactNode };
export function Card({ title, footer, children }: CardProps) {
  return <section><h2>{title}</h2>{children}{footer}</section>;
}
type ButtonProps = ComponentProps<"button"> & { variant?: "primary" | "ghost" };
export function Button({ variant = "primary", className = "", ...rest }: ButtonProps) {
  return <button className={$__btbtn btn-$__{variant} $__{className}$__bt} {...rest} />;
}
export function Page() {
  return <Card title="الطلبات"><Button onClick={() => alert("تم")} disabled>احفظ</Button></Card>;
}`,
          try: R`امسح [[title]] من [[<Card>]] واقرا الخطأ. وبعدين جرّب [[<Button onClik={...}>]] بغلطة إملائية، و [[<Button variant="danger">]].`,
          flag: "script",
          deep: {
            why: "من غير أنواع للـ props، كل استخدام للكومبوننت محتاج تفتح الملف تشوف بياخد إيه. ومع الأنواع، المحرر بيكمّلك الـ props، و TS بيمسك prop ناقص أو متكتب غلط في كل الأماكن مرة واحدة لما تغيّر الكومبوننت.",
            how: R`الكومبوننت في React 19 دالة عادية بتاخد object واحد، فالنوع بيتكتب على الباراميتر: [[function Card(props: CardProps)]] أو بالـ destructuring. و [[React.FC]] كان منتشر زمان، بس مش محتاجه، والدالة العادية أوضح.

[[ReactNode]] أوسع نوع للمحتوى: string و number و JSX و null و undefined و boolean و arrays منهم. و [[ReactElement]] أضيق: JSX بس. للـ children غالبًا ReactNode.

[[ComponentProps<"button">]] بيطلّع نوع props العنصر من تعريفات React ([[@types/react]]). ومع React 19، [[ref]] بقى prop عادي، فالنوع ده فيه [[ref]] كمان، وتقدر تمرّره من غير [[forwardRef]]. ولكومبوننت تاني: [[ComponentProps<typeof Card>]] بيطلّع props بتاعته.

و [[&]] بتدمج النوعين. ولو عايز تغيّر نوع prop موجود (مثلًا [[type]])، استخدم [[Omit<ComponentProps<"button">, "type">]] الأول، لأن [[&]] مع تعارض بيطلّع never.`,
            when: "كل كومبوننت. و [[ComponentProps]] لأي كومبوننت بيلف عنصر HTML (Button و Input و Link) أو بيمد كومبوننت تاني. والتفاصيل في تاب «React».",
            mistakes: R`[[children: JSX.Element]] فالنص العادي أو null يترفض. و [[props: any]]. وتعرّف [[onClick]] و [[disabled]] و [[type]] بإيدك بدل ComponentProps، فتنسى [[aria-label]] وتلاقي نفسك بتضيف prop كل أسبوع. وتوزّع [[...rest]] قبل props بتاعتك فتتعمل override.`
          },
          lines: [
            R`[[import type]]: أنواع بس، وبتتمسح من الـ JS.`,
            "props الكارت: عنوان، و footer اختياري، و children.",
            "destructuring في الباراميتر مع النوع.",
            R`[[ReactNode]] يتعرض في أي مكان في JSX.`,
            "قفلة.",
            R`كل خصايص [[<button>]] الأصلية، وفوقها [[variant]].`,
            R`خد اللي يخصك، والباقي في [[rest]].`,
            "ووزّع الباقي على الزرار الحقيقي: onClick و disabled و type وغيرهم شغالين من غير ما تعرّفهم.",
            "قفلة.",
            "استخدام.",
            R`[[title]] إجباري، والزرار بياخد [[onClick]] و [[disabled]] زي [[<button>]] العادي.`,
            "قفلة."
          ],
          sol: R`من غير [[title]]: Property 'title' is missing in type '{ children: Element; }' but required in type 'CardProps' (TS2741).

و [[onClik]]: Property 'onClik' does not exist on type 'IntrinsicAttributes & ... ButtonHTMLAttributes<HTMLButtonElement> & ...'. Did you mean 'onClick'?، يعني [[ComponentProps<"button">]] جايب كل خصايص الزرار الحقيقية ومسك الغلطة. و [[variant="danger"]]: Type '"danger"' is not assignable to type '"ghost" | "primary" | undefined'.`
        },
        {
          cmd: "useState و events",
          title: "أنواع الـ state وأحداث الفورم والـ input في React",
          desc: R`[[useState(0)]] بيستنتج number لوحده. محتاج تكتب النوع بس لما القيمة الأولية مش بتوصف كل الاحتمالات: [[useState<User | null>(null)]] و [[useState<string[]>([])]].

والـ events ليها أنواع من React: [[React.ChangeEvent<HTMLInputElement>]] للـ input، و [[React.SubmitEvent<HTMLFormElement>]] للفورم، و [[React.MouseEvent<HTMLButtonElement>]] للزرار. ولو الـ handler مكتوب inline في JSX، النوع بيتستنتج لوحده.`,
          example: R`import { useState } from "react";
type User = { id: string; name: string };
type Status = "idle" | "saving" | "error";
export function ProfileForm() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value);
  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("saving");
    setUser({ id: "1", name });
  };
  return <form onSubmit={onSubmit}><input value={name} onChange={onChange} />{user?.name} {status}</form>;
}`,
          try: R`شيل [[<User | null>]] من السطر الخامس وشوف [[setUser({...})]] بيطلّع إيه (النوع بقى null بس). وبعدين اكتب الـ onChange inline في JSX من غير نوع ولاحظ إن [[e]] اتعرف لوحده.`,
          flag: "script",
          deep: {
            why: "أغلب أخطاء React اليومية: state بيبدأ null وحد يقرا [[user.name]] قبل ما يتحمّل، أو [[e.target.value]] في event مش معروف نوعه، أو status متكتب غلط. الأنواع هنا بتمسك الـ bugs دي قبل ما تفتح المتصفح.",
            how: R`[[useState<T>]] generic: من غير ما تحدد، T بيتستنتج من القيمة الأولية. [[useState(null)]] لوحدها T بقى [[null]] وبس، فمش هتقدر تحط User بعدين، وعشان كده [[<User | null>]]. و [[useState([])]] بيطلّع [[never[]]]، فلازم [[<Item[]>]]. و [[useState("idle")]] بيطلّع string، فأي كلمة تعدّي.

وللحالات المترابطة (loading و data و error)، discriminated union في state واحدة أنضف من ٣ states منفصلين: [[useState<FetchState>({ status: "idle" })]]، و react.dev نفسه بيقترح الشكل ده.

الـ events في React synthetic: [[currentTarget]] نوعه T بالظبط (العنصر اللي عليه الـ handler). و [[target]] في أغلب الـ events نوعه [[EventTarget]] بس، لأن الـ event ممكن يكون جاي من عنصر جوه. و [[ChangeEvent]] استثناء في @types/react: [[target]] فيه متعرّف [[EventTarget & T]] زي currentTarget بالظبط. عشان كده [[e.currentTarget.value]] هي العادة الأأمن في كل الـ events.

وفي @types/react 19.2.10 وأحدث، [[FormEvent]] بقى deprecated (الاسم كان مضلل)، والبديل [[SubmitEvent]] للـ submit، و [[ChangeEvent]] أو [[InputEvent]] للتغيير. الكود القديم لسه شغال، بس المحرر هيشطب عليه. ولو نسختك أقدم من 19.2.10، [[SubmitEvent]] مش هتلاقيه، فحدّث @types/react.

وأسهل طريقة تعرف نوع أي event: اكتب الـ handler inline ([[onChange={(e) => ...}]]) وحط الماوس على [[e]].`,
            when: "[[useState<T>]] لما القيمة الأولية null أو [] أو union. وأنواع الـ events لما الـ handler دالة منفصلة. والتفاصيل الكاملة للـ hooks في تاب «React».",
            mistakes: R`[[useState<any[]>([])]]: في مشروع حقيقي كانت متكررة، وبتقفل الفحص على الليستة كلها. و [[useState<number>(0)]]: زيادة. و [[(e: any) => ...]] للـ events. و [[e.target.value]] على select أو checkbox وتستغرب النوع.`
          },
          lines: [
            "الـ hook.",
            "نوع المستخدم.",
            "حالات محددة.",
            "الكومبوننت.",
            "بيبدأ null، فلازم تقول إنه ممكن يبقى User بعدين.",
            R`[[""]] كفاية: TS استنتج string.`,
            "من غير النوع، TS هيستنتج string وأي كلمة هتعدّي.",
            R`نوع الـ event للـ input: [[currentTarget.value]] نوعها string.`,
            R`submit الفورم. في @types/react 19.2.10+ اسمه [[SubmitEvent]]، و [[FormEvent]] القديم deprecated.`,
            "امنع الـ reload.",
            "لازم قيمة من Status.",
            "لازم شكل User كامل.",
            "قفلة الـ handler.",
            R`[[user?.name]] لأن user ممكن يبقى null.`,
            "قفلة."
          ],
          sol: R`من غير [[<User | null>]]، [[useState(null)]] نوعه [[null]] بس. فـ [[setUser({ id: "1", name })]] بتطلّع Object literal may only specify known properties, and 'id' does not exist in type '(prevState: null) => null'، و [[user?.name]] في الـ JSX بتطلّع Property 'name' does not exist on type 'never'.

ولما تكتب [[onChange={(e) => setName(e.currentTarget.value)}]] جوه الـ JSX، حط الماوس على [[e]] هتلاقيه [[ChangeEvent<HTMLInputElement, HTMLInputElement>]] لوحده. الـ handler المكتوب inline بياخد نوعه من الـ prop، والمفصول في متغير لازم تكتبله النوع.`
        },
        {
          cmd: "Express + Zod",
          title: "req.body نوعه any: تتحقق منه وتاخد نوع حقيقي",
          desc: R`في Express، [[req.body]] نوعه [[any]] وقيمته أي حاجة العميل بعتها. الحل: middleware بياخد schema من Zod، يعمل [[safeParse]] على الـ body، ولو فشل يرجّع 400، ولو نجح يحط الداتا المفحوصة مكان الـ body.

والـ handler نفسه بتكتب نوع الـ body فيه بـ [[Request<Params, ResBody, ReqBody>]]. وتفاصيل Express نفسه في تاب «Backend بـ Node».`,
          example: R`import express, { type Request, type Response, type NextFunction } from "express";
import * as z from "zod";
const CreateOrder = z.object({ productId: z.string().min(1), qty: z.number().int().min(1).max(10) });
type CreateOrder = z.infer<typeof CreateOrder>;
const validate = (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
  const r = schema.safeParse(req.body);
  if (!r.success) return res.status(400).json({ errors: z.flattenError(r.error).fieldErrors });
  req.body = r.data;
  next();
};
const app = express();
app.use(express.json());
app.post("/orders", validate(CreateOrder), (req: Request<{}, {}, CreateOrder>, res: Response) => {
  res.status(201).json({ productId: req.body.productId, qty: req.body.qty });
});`,
          try: R`ابعت [[curl -X POST localhost:3000/orders -H "Content-Type: application/json" -d '{"productId":"p1","qty":50}']] وشوف الـ 400. وبعدين شيل [[validate(CreateOrder)]] من الـ route ولاحظ إن TS مش هيعترض، وده بالظبط ليه النوع لوحده مش حماية.`,
          flag: "script",
          deep: {
            why: R`[[req.body]] أخطر مكان في أي API: أي حد يقدر يبعت أي حاجة. وفي مشروع حقيقي كان فيه [[const { month, year } = req.body as { month: number; year: number }]]: النوع بيقول number، والعميل بعت [["5"]] أو ماباعتش حاجة، والكود كمّل وحسب غلط أو كتب في القاعدة قيمة بايظة. و [[(req.body as any)[field]]] في مكان تاني أسوأ.`,
            how: R`[[@types/express]] بيعرّف [[Request<P, ResBody, ReqBody, ReqQuery>]]، و [[ReqBody]] افتراضيًا [[any]]. وتقدر تكتب [[Request<{}, {}, CreateOrder>]] عشان تاخد autocomplete جوه الـ handler، بس ده annotation مش فحص: TS مش هيعرف إن فيه middleware فحصت قبله. عشان كده ترتيب الـ route مهم، والـ validate لازم يبقى قبل الـ handler.

بديل أبسط ومن غير ثقة في الترتيب: جوه الـ handler نفسه [[const data = CreateOrder.parse(req.body)]]، ومعاه error middleware بيحوّل ZodError لـ 400. وفي Express 5، أي خطأ بيترمي جوه handler async بيروح للـ error middleware لوحده.

والـ query و params strings دايمًا ([[?page=2]] بتيجي [["2"]])، فاستخدم [[z.coerce.number()]] ليهم. و [[req.query]] في Express 5 getter، فمتقدرش تعمل [[req.query = ...]]: خزّن الناتج في متغير أو في [[res.locals]].

والأنواع المشتركة بين الـ front والـ back (زي [[CreateOrder]]) مكانها باكدج shared في monorepo، فالـ form في React والـ route في Express بيستخدموا نفس الـ schema.`,
            when: "كل route فيه body أو query أو params من المستخدم، من غير استثناء. وكمان webhooks جاية من خدمات خارجية.",
            mistakes: R`[[req.body as Type]]: فحص بالكلام. وتنسى [[express.json()]] فالـ body يبقى undefined وتفتكر الـ validation هي اللي غلط. وترجع [[r.error]] كله للعميل. و [[z.number()]] على query param فيفشل دايمًا لأنه string.`
          },
          lines: [
            R`Express وأنواعه. و [[type]] جوه الـ import للأنواع بس.`,
            "Zod.",
            "schema للطلب: منتج وكمية من ١ لـ ١٠.",
            "النوع من الـ schema بنفس الاسم (مسموح: واحد قيمة وواحد نوع).",
            "middleware عام: بياخد أي schema ويرجّع handler.",
            "فحص الـ body من غير throw.",
            "فشل: 400 بأخطاء كل حقل، ومتكمّلش.",
            "نجاح: حط الداتا المفحوصة (من غير مفاتيح زيادة) مكان الـ body.",
            "كمّل للـ handler.",
            "قفلة.",
            "التطبيق.",
            R`من غيرها [[req.body]] بيبقى undefined في Express 5.`,
            R`الـ route: الـ validation الأول، وبعدين handler نوع الـ body فيه [[CreateOrder]] (التالت في [[Request<Params, ResBody, ReqBody>]]).`,
            R`[[req.body.qty]] نوعها number ومفحوصة فعلًا.`,
            "قفلة."
          ],
          sol: R`الـ curl بيرجّع [[400]] والـ body: [[{"errors":{"qty":["Too big: expected number to be <=10"]}}]]. ومع [["qty":2]] بيرجّع [[201]] و [[{"productId":"p1","qty":2}]].

بعد ما تشيل [[validate(CreateOrder)]]، [[npx tsc --noEmit]] مش بيطلّع ولا خطأ، والـ handler لسه شايف [[req.body.qty]] على إنه number. بس الـ request نفسه بيرجع [[201]] وفيه [["qty":50]]، وحتى [[{"qty":"lots"}]] من غير productId بيعدّي. [[Request<{}, {}, CreateOrder>]] وعد بس، والـ schema هي اللي بتفحص فعلًا.`
        },
        {
          cmd: "declare global",
          title: "تضيف req.user على نوع Request بتاع Express في كل المشروع",
          desc: R`middleware الـ auth بيحط [[req.user]]، بس TS ميعرفش إن [[Request]] فيه user. بدل ما تعمل [[interface AuthRequest extends Request]] وتستخدمه في كل handler، تقدر تضيف الخاصية على نوع Express نفسه مرة واحدة: ده اسمه module augmentation.

وده شغال بسبب declaration merging في الـ interfaces (درس type و interface في المستوى ١).`,
          example: R`// src/types/express.d.ts
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: "admin" | "user" };
    }
  }
}
export {};
// أي handler في المشروع:
app.get("/me", (req, res) => {
  if (!req.user) return res.status(401).json({ error: "سجّل دخول" });
  res.json({ id: req.user.id, role: req.user.role });
});`,
          try: R`امسح سطر [[export {}]] وشغّل [[npx tsc --noEmit]] واقرا الخطأ. وبعدين اتأكد إن الملف جوه [[include]] في tsconfig، لأن لو برّه TS مش هيشوف الإضافة.`,
          flag: "script",
          deep: {
            why: R`في مشروع حقيقي كان فيه [[interface AuthRequest extends Request { user?: AuthenticatedUser }]] وكل handler مكتوب [[(req: AuthRequest, res: Response)]]. ده شغال، بس كل route لازم يفتكر يستخدم AuthRequest، ولما تمرر الـ handler لـ [[router.get]] ساعات الأنواع مبتركبش. الإضافة على النوع الأصلي بتحل ده مرة واحدة.`,
            how: R`module augmentation: بتفتح نوع معرّف في مكتبة وتضيف عليه. بيشتغل مع [[interface]] بس (مش [[type]])، لأن الـ interfaces اللي بنفس الاسم في نفس الـ scope بتتدمج.

و [[@types/express]] معرّف [[namespace Express { interface Request {} }]] في الـ global scope مخصوص عشان تعمل كده، والـ Request اللي بتستخدمه بيورث منه. فـ [[declare global { namespace Express { ... } }]] بيضيف على الأصل.

وللمكتبات اللي أنواعها جوه module مش global، بتستخدم [[declare module "lib-name" { interface X { ... } }]] في ملف فيه import أو export. وزيها إضافة خاصية على [[Window]]: [[declare global { interface Window { dataLayer?: unknown[] } }]].

الملف لازم يبقى module (فيه [[export {}]] أو أي import)، ولازم يبقى جوه [[include]]. و tsx مبيفحصش أنواع أصلًا، فالإضافة دي بتبان في المحرر و [[tsc --noEmit]] بس.

وخلي بالك: ده بيقول إن [[user]] موجود في كل request في المشروع كله، حتى اللي مفيهوش auth middleware. عشان كده خليه اختياري ([[?]]) وافحصه.`,
            when: "[[req.user]] و [[req.requestId]] في Express، وخصايص على [[window]] من scripts خارجية (analytics)، وإضافة session أو user على أنواع مكتبات auth.",
            mistakes: R`[[user: AuthUser]] من غير [[?]]، فـ TS يفتكره موجود في routes مفيهاش auth. وتنسى [[export {}]]. والملف برّه [[include]] فمفيش أثر. و [[(req as any).user]] في كل حتة بدل الإضافة دي.`
          },
          lines: [
            "ادخل على الـ scope العام (global).",
            R`[[@types/express]] بيعرّف namespace اسمه Express مخصوص عشان تضيف عليه.`,
            "نفس اسم الـ interface: TS هيدمجه مع الأصلي.",
            R`[[user]] اختياري، لأن مش كل route عليه auth.`,
            "قفلة.",
            "قفلة.",
            "قفلة.",
            R`سطر مهم: بيخلي الملف module، و [[declare global]] مبتشتغلش غير جوه module.`,
            "handler عادي، من غير أي نوع مخصوص.",
            R`TS عارف إن [[req.user]] ممكن يبقى undefined، فبيجبرك تفحص.`,
            R`بعد الفحص، [[user]] موجود بنوعه.`,
            "قفلة."
          ],
          sol: R`من غير [[export {}]] الملف بيبقى script مش module. لو [[skipLibCheck]] مقفول هتشوف على الملف نفسه: Augmentations for the global scope can only be directly nested in external modules or ambient module declarations (TS2669). ومع [[skipLibCheck: true]] (الأشهر) الخطأ ده مش بيظهر، واللي بيظهر بس: Property 'user' does not exist on type 'Request<...>' (TS2339) على كل [[req.user]]، وده بيلخبط لأن السبب مش باين.

ونفس خطأ TS2339 بيظهر لو الملف برّه [[include]]. بعد ما ترجّع [[export {}]] والملف جوه include، [[npx tsc --noEmit]] مش بيطلّع حاجة.`
        },
        {
          cmd: "Prisma types",
          title: "أنواع جداولك جاهزة بعد generate، ونوع لكل query",
          desc: R`[[prisma generate]] بيطلّع client فيه نوع لكل model ([[User]] و [[Order]]) ولكل input ([[Prisma.UserCreateInput]] و [[Prisma.UserWhereInput]]). ونتيجة كل query نوعها محسوب من الـ [[select]] و [[include]] اللي كتبتهم: لو اخترت [[id]] و [[name]] بس، النتيجة مفيهاش [[email]].

ولو محتاج النوع ده برّه الـ query (لـ props أو دالة)، [[Prisma.UserGetPayload<...>]] مع [[satisfies]].`,
          example: R`import type { Prisma, User } from "@/generated/prisma/client";
import { db } from "@/lib/db";
const userCard = {
  select: { id: true, name: true, _count: { select: { orders: true } } },
} satisfies Prisma.UserDefaultArgs;
type UserCard = Prisma.UserGetPayload<typeof userCard>;
export async function listUsers(role?: User["role"]): Promise<UserCard[]> {
  const where: Prisma.UserWhereInput = role ? { role } : {};
  return db.user.findMany({ where, ...userCard });
}
export function greet(u: UserCard) {
  return $__bt$__{u.name} عنده $__{u._count.orders} طلب$__bt;
}`,
          try: R`ضيف [[email: true]] للـ select واستخدم [[u.email]] في [[greet]] من غير ما تلمس أي نوع. وبعدين غيّر اسم عمود في [[schema.prisma]]، وشغّل [[npx prisma generate]] ثم [[npx tsc --noEmit]]: كل مكان بيستخدم الاسم القديم هيطلع.`,
          flag: "script",
          deep: {
            why: "القاعدة هي مصدر الحقيقة لشكل الداتا. لو كتبت أنواع الجداول بإيدك، أول migration هتخليها كدب. Prisma بيولّد الأنواع من الـ schema نفسها، فتغيير عمود بيوصل لكل الكود وقت الـ typecheck.",
            how: R`[[prisma generate]] بيقرا [[schema.prisma]] ويكتب كود TS: الـ client ونوع لكل model و enum و input. وفي Prisma 7 مع generator [[prisma-client]]، الكود بيتكتب في الفولدر اللي في [[output]] (زي [[src/generated/prisma]]) وبتستورد منه مباشرة، مش من [[@prisma/client]] زي زمان. والـ enums بتطلع object بـ [[as const]] ونوع بنفس الاسم.

كل method ([[findMany]] و [[findUnique]] و [[create]]) generic على الـ args: نوع الناتج بيتحسب من [[select]] و [[include]]. و [[findUnique]] بيرجع [[T | null]]، و [[findMany]] بيرجع [[T[]]].

و [[Prisma.UserGetPayload<Args>]] بيحسب نفس النوع ده برّه الـ query. و [[satisfies Prisma.UserDefaultArgs]] بيفحص الـ args من غير ما يوسّع نوعها. لو استخدمت annotation ([[const userCard: Prisma.UserDefaultArgs]]) بدل satisfies، النوع هيبقى عام والـ payload هيطلع غلط.

والـ inputs ([[Prisma.UserCreateInput]] و [[Prisma.UserWhereInput]]) مفيدين في دوال بتبني queries. بس مش بديل عن Zod: دي أنواع وقت الكتابة، والداتا من العميل لسه محتاجة فحص قبل ما توصل هنا.

وتفاصيل prisma generate و migrate في تاب «SQL و Prisma» و «Node و npm».`,
            when: "أي مشروع Prisma: props الكومبوننتات اللي بتعرض نتيجة query، و service functions، والـ DTOs. وشغّل [[prisma generate]] بعد أي تعديل في الـ schema، وفي CI قبل [[tsc]].",
            mistakes: R`تكتب [[type User = {...}]] بإيدك جنب Prisma. وتستخدم [[User]] (الموديل الكامل) كنوع لنتيجة query فيها select، فتفتكر [[email]] موجودة وهي مش موجودة. وفي مشروع حقيقي كان فيه [[role as Prisma.UserWhereInput["role"]]] على string جاية من الـ URL: ده بيعدّي أي string للقاعدة، والصح type guard أو [[z.enum]]. وتنسى [[prisma generate]] في CI أو Docker فالأنواع تبقى قديمة.`
          },
          lines: [
            R`أنواع Prisma 7 من الـ client اللي اتولّد (المسار حسب [[output]] في schema.prisma).`,
            "الـ client نفسه (instance واحد في المشروع).",
            "شكل الـ query كـ object لوحده...",
            "...id و name وعدد الطلبات بس...",
            R`...و [[satisfies]] بيتأكد إنه args صح للـ User من غير ما يضيّع النوع الدقيق.`,
            R`نوع النتيجة محسوب من الـ select: [[{ id; name; _count: { orders } }]].`,
            R`[[User["role"]]]: نوع الـ enum من الموديل.`,
            R`[[WhereInput]] نوع الفلتر: أي عمود غلط أو قيمة غلط يطلع خطأ.`,
            R`نفس الـ select، فالنتيجة مطابقة لـ [[UserCard]].`,
            "قفلة.",
            "دالة (أو props لكومبوننت) بتاخد النوع ده.",
            R`TS عارف إن فيه name و _count بس. لو كتبت [[u.email]] هيطلع خطأ، لأنها مش في الـ select.`,
            "قفلة."
          ],
          sol: R`بعد [[email: true]] في الـ select، [[u.email]] في [[greet]] بيشتغل ونوعه string من غير ما تلمس [[UserCard]]، لأن [[UserGetPayload]] بيتحسب من الـ select. ولو كتبت [[u.role]] من غير ما تختاره هتاخد Property 'role' does not exist on type '{ id: number; name: string; email: string; _count: { orders: number; }; }'.

ولو غيّرت [[name]] لـ [[fullName]] وعملت generate و tsc: أول خطأ بيطلع في الـ select نفسه: Object literal may only specify known properties, and 'name' does not exist in type 'UserSelect<DefaultArgs>'. ولما تصلّحه لـ [[fullName: true]]، الخطأ بيتنقل لـ [[u.name]] في [[greet]]. يعني TS بيوديك من مكان للتاني لحد ما كل حاجة تتصلح. ولو مطلعش حاجة، غالبًا نسيت [[prisma generate]] والأنواع لسه القديمة.`
        },
        {
          cmd: "typed fetch",
          title: "رد API خارجي: تديله نوع من غير ما تكذب على TS",
          desc: R`[[await res.json()]] نوعها [[any]]، و [[as User]] بعدها مجرد أمنية. الطريقة الآمنة: اعتبر الرد [[unknown]]، وافحصه بـ schema، والنوع يطلع من الفحص. كده لو الـ API غيّر شكله، الخطأ يطلع واضح عند الحدود، مش [[undefined]] في نص الـ UI.

واعمل helper واحد بياخد الـ schema ويرجّع داتا مفحوصة، وافحص [[res.ok]] قبل ما تقرا الـ body.`,
          example: R`import * as z from "zod";
async function getJson<S extends z.ZodType>(url: string, schema: S): Promise<z.infer<S>> {
  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error($__bt$__{url} رجّع $__{res.status}$__bt);
  const body: unknown = await res.json();
  return schema.parse(body);
}
const Repo = z.object({ full_name: z.string(), stargazers_count: z.number() });
const repo = await getJson("https://api.github.com/repos/microsoft/typescript", Repo);
console.log(repo.full_name, repo.stargazers_count);`,
          try: R`غيّر [[stargazers_count: z.number()]] لـ [[z.string()]] وشغّل: هتشوف ZodError بيقولك الحقل والنوع المتوقع. ده بالظبط اللي كان هيحصل لو الـ API غيّر شكله، بس برسالة واضحة.`,
          flag: "script",
          deep: {
            why: R`في مشروع حقيقي كان فيه helper بالشكل ده: [[fetchTeam<T = any>(path): Promise<T | null>]] بيرجّع [[(await r.json()) as T]]. شكله typed، بس T بيختارها اللي بينادي، ومفيش أي فحص. لو السيرفر التاني رجّع شكل مختلف، TS هيفضل مقتنع إن كل حاجة تمام، والخطأ يطلع في الـ UI كـ undefined.`,
            how: R`TS مبيعرفش حاجة عن الشبكة: [[Response.json()]] متعرّفة إنها [[Promise<any>]] في أنواع المتصفح (lib dom، ودي بتتحمل افتراضي لو مكتبتش [[lib]]، حتى في مشروع Node)، وفي أنواع Node لوحدها (من غير dom) بترجع [[Promise<unknown>]]. وفي الحالتين أي نوع تحطه بـ [[as]] أو generic كلام بس ومفيش فحص وقت التشغيل، ومع [[unknown]] حتى الـ annotation مش هتعدّي من غير [[as]].

الحدود (boundaries) هي الأماكن اللي الداتا بتدخل فيها كودك من برّه: رد API، و request body، و localStorage، و env، ورسايل WebSocket، و JSON من AI. القاعدة: جوه كودك ثق في الأنواع، وعند الحدود افحص. و Zod بيعمل الفحص ويطلّع النوع في خطوة.

و [[schema.parse]] بترجع نسخة من غير المفاتيح اللي مش في الـ schema، فالـ schema اللي فيها اللي محتاجه بس بتحميك كمان من داتا زيادة. ولو الـ API بيرجّع أشكال مختلفة حسب الحالة، اعمل schema لكل حالة و [[z.discriminatedUnion]].

ولو مش عايز Zod في الـ bundle بتاع الـ front (حجمه مهم)، فيه بدائل أصغر، أو اكتب type guard بإيدك، أو على الأقل خليه [[unknown]] وافحص الحقول اللي بتستخدمها. المهم متبدأش بـ [[as]].

ولو الـ API بتاعك انت (نفس الـ monorepo)، الـ schemas المشتركة بين الـ front والـ back بتدّيك نفس النوع في الناحيتين من غير نسخ.`,
            when: "أي fetch لـ API خارجي أو بتاعك، وأي JSON.parse، وأي داتا مخزنة في المتصفح، وناتج AI المطلوب JSON.",
            mistakes: R`[[const data: User[] = await res.json()]]: annotation على any، يعني [[as]] متنكّر. و generic [[fetchJson<T>]] من غير schema. وتقرا الـ body من غير ما تفحص [[res.ok]]، فتحاول تعمل parse لصفحة خطأ HTML. و schema بكل حقول الرد (١٠٠ حقل) وانت محتاج ٣: أي تغيير تافه في الـ API يكسر التطبيق.`
          },
          lines: [
            "Zod.",
            "generic على الـ schema: نوع الرجوع هو نوع الـ schema نفسها.",
            "timeout عشان متستناش للأبد.",
            "4xx أو 5xx: متحاولش تقرا الـ body كأنه نجح.",
            R`الـ body [[unknown]] صراحة، مش any.`,
            "الفحص الحقيقي: لو الشكل غلط يترمي ZodError فيه المشكلة بالظبط.",
            "قفلة.",
            "schema للحاجات اللي هتستخدمها بس، مش الرد كله.",
            R`[[repo]] نوعها طالع من الـ schema، ومفحوص فعلًا.`,
            "آمن."
          ],
          sol: R`الناتج: [[ZodError]] وفيه [["expected": "string"]] و [["code": "invalid_type"]] و [["path": [ "stargazers_count" ]]] و [["message": "Invalid input: expected string, received number"]]، والـ stack بيشاور على [[schema.parse(body)]]. قبل التعديل كان بيطبع [[microsoft/TypeScript]] وجنبه عدد النجوم.

لو طلعلك [[Error: https://api.github.com/repos/microsoft/typescript رجّع 403]] بدل كده، ده GitHub مش Zod: الـ API من غير توكن ليه حد صغير في الساعة (أو الشبكة عندك حاجباه). استنى شوية، أو ابعت header [[Authorization]] بتوكن، أو جرّب على API تاني.`
        },
        {
          cmd: "branded types",
          title: "تفرّق بين UserId و OrderId مع إن الاتنين string",
          desc: R`بسبب structural typing، [[type UserId = string]] و [[type OrderId = string]] نفس النوع، فتقدر تبعت order id لدالة مستنية user id و TS ساكت. الـ branded type بيضيف علامة وهمية: [[string & { readonly __brand: "UserId" }]]، فالنوعين يبقوا مختلفين وقت الفحص، ووقت التشغيل الاتنين string عادي.

والطريقة الوحيدة تعمل قيمة branded تبقى دالة بتفحص (أو schema)، فالعلامة معناها «القيمة دي اتفحصت».`,
          example: R`type Brand<T, B extends string> = T & { readonly __brand: B };
type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;
const toUserId = (s: string): UserId => {
  if (!s.startsWith("usr_")) throw new Error("user id غلط");
  return s as UserId;
};
function getUser(id: UserId) { return id; }
const uid = toUserId("usr_123");
const oid = "ord_9" as OrderId;
getUser(uid);
getUser(oid); // خطأ: OrderId مش UserId
getUser("usr_1"); // خطأ: string عادي مش متفحص`,
          try: R`جرّب [[uid.toUpperCase()]]: شغالة، لأنه لسه string. وبعدين في Zod: [[z.string().startsWith("usr_").brand<"UserId">()]] وخد منه [[z.infer]]، وقارن النوع.`,
          flag: "script",
          deep: {
            why: "في مشروع فيه users و orders و products، كل الـ ids strings أو أرقام. [[deleteOrder(userId)]] بدل [[deleteOrder(orderId)]] غلطة سهلة جدًا، والنتيجة ممكن تبقى مسح داتا غلط، و TS مش هيقول حاجة. الـ brands بتخلي النوع يفرّق بينهم. ونفس الفكرة لـ «string اتعمله sanitize» أو «مبلغ بالقرش مش بالجنيه».",
            how: R`TS structural: نوعين بنفس الشكل هما نفس النوع. الـ brand بيضيف خاصية وهمية ([[__brand]]) بقيمة literal مختلفة، فالشكل بقى مختلف. مفيش object فعلًا فيه الخاصية دي: ده كدب متحكم فيه، و [[as]] بيتعمل مرة واحدة جوه الدالة اللي بتفحص.

والقيمة branded لسه string: كل methods الـ string شغالة، وتتبعت لأي حاجة مستنية string. الحماية في اتجاه واحد: string عادي مش هيدخل مكان UserId.

و Zod فيه [[.brand<"UserId">()]]: الـ schema بتفحص، والنوع الطالع branded. كده الـ brand بيتعمل عند الحدود تلقائيًا.

ده مش ميزة رسمية في TS (TS مفيهوش nominal types)، هو نمط. استخدمه في الأماكن اللي الغلط فيها غالي بس، مش على كل string.`,
            when: "ids من أنواع مختلفة في نفس الـ service، وفلوس بعملات أو وحدات مختلفة، وقيم لازم تتفحص قبل ما تتستخدم (email متأكد منه، HTML متنضف).",
            mistakes: R`brands على كل حاجة فالكود يتملي [[as]] وتحويلات. و [[as UserId]] في كل مكان بدل دالة واحدة بتفحص، فالعلامة فقدت معناها. وتفتكر إن الـ brand موجود وقت التشغيل.`
          },
          lines: [
            R`helper: النوع الأصلي وعلامة باسم. و [[__brand]] مش موجودة وقت التشغيل.`,
            "string معلّم UserId.",
            "string معلّم OrderId.",
            "الباب الوحيد لـ UserId: دالة بتفحص.",
            "الفحص الحقيقي.",
            R`[[as]] هنا مقبولة: مكان واحد، وبعد فحص.`,
            "قفلة.",
            "دالة مستنية UserId بس.",
            "UserId متفحص.",
            "OrderId (هنا بـ as للتبسيط).",
            "مقبول.",
            "مرفوض: نفس الـ string بس العلامة مختلفة.",
            R`مرفوض: لازم يعدّي على [[toUserId]] الأول.`
          ],
          sol: R`[[uid.toUpperCase()]] بتشتغل وبترجع [[USR_123]]: [[UserId]] لسه string ونوع زيادة مش موجود وقت التشغيل.

ومن Zod النوع بيطلع [[string & $brand<"UserId">]]، مش نفس [[Brand<string, "UserId">]] بتاعنا. عشان كده مش بيتبدلوا: [[getUser(zid)]] بيطلّع Property '__brand' is missing، والعكس برضه خطأ. اختار طريقة واحدة في المشروع. و [[UserIdSchema.safeParse("ord_1").success]] بترجع [[false]]، يعني Zod بيفحص فعلًا قبل ما يدّي الـ brand.`,
          solCode: R`import * as z from "zod";
const UserIdSchema = z.string().startsWith("usr_").brand<"UserId">();
type UserId = z.infer<typeof UserIdSchema>; // string & $brand<"UserId">
function getUser(id: UserId) { return id; }
getUser(UserIdSchema.parse("usr_5"));
// getUser("usr_1"); // خطأ: string عادي مش UserId
console.log(UserIdSchema.safeParse("ord_1").success); // false`
        }
      ]
    },
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "الأسئلة اللي بتتكرر في انترفيوهات TypeScript، بإجابة تقولها بصوتك في دقيقة، والأسئلة اللي بتيجي بعدها",
      items: [
        {
          cmd: "interface بيتدمج و type أوسع",
          title: "إيه الفرق بين type و interface؟ (type vs interface)",
          desc: R`الاتنين بيسمّوا شكل object، وفي أغلب الاستخدام زي بعض. [[type]] أوسع: ينفع لـ unions و tuples وأنواع دوال و mapped و conditional types. و [[interface]] للـ objects بس، بس بيدعم declaration merging: لو اتعرّف مرتين بيتدمج، وده اللي بيخليني أضيف على أنواع مكتبات زي [[Request]] في Express. و [[extends]] في interface بيطلّع أخطاء أوضح لو فيه تعارض من [[&]] في type. في الشغل بختار واحد للـ objects وأمشي عليه، وبستخدم type لأي حاجة مش object.`,
          example: R`type Status = "on" | "off";
interface Req { url: string }
interface Req { user?: string }
const r: Req = { url: "/", user: "u1" };`,
          try: R`اعمل نفس الـ merging بـ [[type]] وشوف خطأ Duplicate identifier.`,
          flag: "script",
          deep: {
            why: "السؤال ده بيختبر إنك فاهم الأدوات مش حافظ قاعدة. الإجابة الضعيفة «interface أحسن» أو «type أحسن» من غير سبب.",
            how: R`نقط تقولها لو اتسألت أكتر: الـ interface بيتعمله cache باسمه، فمع أنواع كبيرة جدًا [[extends]] أسرع في الفحص من intersections متداخلة. والكلاس ينفع يعمل [[implements]] لـ interface أو لـ type (لو object). والـ merging سلاح بحدّين: interface بنفس اسم global موجود هيتدمج معاه من غير ما تاخد بالك.`,
            when: "«إمتى تستخدم intersection؟»، و «إيه اللي يحصل لو خاصية اتعرفت بنوعين في extends؟» (خطأ)، و «وفي &؟» (الخاصية تبقى never)، و «إزاي تضيف user على Request في Express؟».",
            mistakes: "«interface للكلاسات بس». و «type مينفعش يتوسّع» (بيتوسّع بـ &). و «interface أسرع وقت التشغيل» (الاتنين مش موجودين وقت التشغيل أصلًا)."
          },
          lines: [
            "union: type بس.",
            "interface.",
            "نفس الاسم: اتدمج مع اللي فوقه.",
            "الشكل النهائي فيه الاتنين."
          ],
          sol: R`[[type Req = { url: string }]] وتحتها [[type Req = { user?: string }]] بيطلّعوا [[Duplicate identifier 'Req']] (TS2300) على الاتنين. عشان تدمجهم بـ type لازم اسم جديد: [[type Req = Base & { user?: string }]].

الإجابة النموذجية في الانترفيو: interface بتتدمج لو اتعرّفت مرتين (declaration merging)، وده اللي بيخليك تضيف على أنواع مكتبات زي [[Express.Request]]. و type بيقدر يعمل unions و tuples و mapped و conditional types، و interface لأ. وفي الشغل: interface لأشكال objects عامة أو هتتوسّع، و type لأي حاجة غير كده، والمهم تمشي على طريقة واحدة في المشروع.`
        },
        {
          cmd: "unknown بيجبرك تفحص",
          title: "الفرق بين any و unknown؟ (any vs unknown)",
          desc: R`الاتنين بيقبلوا أي قيمة، والفرق في اللي بعد كده. [[any]] بيقفل الفحص: تقدر تنادي أي method عليه وتحطه في أي نوع، والغلط يظهر وقت التشغيل. [[unknown]] مش بيسمح بأي عملية لحد ما تضيّقه بفحص حقيقي زي [[typeof]] أو [[instanceof]] أو schema. عشان كده أي داتا جاية من برّه (JSON و API و catch) بخليها unknown. و any بستخدمه بس مؤقتًا وأنا بنقل كود JS قديم.`,
          example: R`const a: any = "x";
a.push(1); // TS ساكت، ووقت التشغيل: TypeError
const u: unknown = "x";
if (typeof u === "string") u.toUpperCase();`,
          try: R`اكتب [[u.toUpperCase()]] من غير الـ if وشوف الخطأ.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتعرف تتعامل مع داتا مش مضمونة بأمان، ومش بتستخدم any كحل لكل خطأ.",
            how: R`any «معدي»: أي حاجة بتتقري منه any برضه، فبينتشر في الكود. و unknown هو الـ top type الآمن: أي حاجة تتحط فيه، بس هو مبيتحطش غير في unknown أو any. و [[catch (e)]] مع strict نوعها unknown ([[useUnknownInCatchVariables]]). و [[JSON.parse]] و [[res.json()]] بيرجعوا any، فالأحسن تحط [[: unknown]] على الناتج بنفسك.`,
            when: "«إزاي تضيّق unknown؟»، و «إيه هو never؟»، و «إزاي تكتب type guard؟»، و «إزاي تمنع any في المشروع؟» (noImplicitAny، وقاعدة eslint [[no-explicit-any]]).",
            mistakes: "«الاتنين زي بعض». و «unknown يعني undefined». و «any أسهل وخلاص»."
          },
          lines: [
            "any.",
            "TS ساكت، و push مش موجودة على string.",
            "unknown.",
            "لازم فحص الأول."
          ],
          sol: R`[[u.toUpperCase()]] من غير if بيطلّع 'u' is of type 'unknown' (TS18046).

الإجابة النموذجية: any بيقفل الفحص خالص، فتقدر تعمل أي حاجة، والغلط بيطلع وقت التشغيل (زي [[a.push]] على string: [[TypeError: a.push is not a function]]). و unknown معناها «ممكن يبقى أي حاجة، فافحص الأول». بتقبل أي قيمة، بس مش بتسمحلك تستخدمها غير بعد narrowing. استخدم unknown لأي داتا جاية من برّه (JSON و catch و API)، و any تقريبًا لأ.`
        },
        {
          cmd: "النوع كباراميتر",
          title: "إمتى تستخدم generics؟ اديني مثال حقيقي (When would you use generics?)",
          desc: R`بستخدمها لما يبقى المنطق واحد والنوع بيتغير، وعايز النوع يعدّي من الأول للآخر من غير ما يضيع في any. مثلًا fetch helper بياخد schema ويرجّع داتا بنوعها، أو hook زي [[useLocalStorage<T>]]، أو نوع رد API موحّد [[ApiResponse<T>]]. ولو محتاج حاجة من النوع جوه الدالة، بحط constraint زي [[T extends { id: string }]]. والمكتبات اللي بستخدمها كل يوم مليانة generics: [[Promise<T>]] و [[useState<T>]] و [[Array<T>]].`,
          example: R`function byId<T extends { id: string }>(items: T[]): Map<string, T> {
  return new Map(items.map((it) => [it.id, it]));
}
const users = byId([{ id: "u1", name: "Sara" }]);
users.get("u1")?.name;`,
          try: R`غيّر الباراميتر لـ [[items: { id: string }[]]] من غير generic، وشوف [[.name]] بقت خطأ.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتفهم generics كأداة لتصميم APIs مش كـ syntax غريب، وإنك بتعرف الفرق بينها وبين any و union.",
            how: R`T بيتحدد مع كل نداء (غالبًا بالاستنتاج من الـ arguments)، والـ constraint بيحدد أقل حاجة لازم تكون فيه. وكل ده وقت الفحص بس، والـ JS الناتج دالة عادية. وعلامة إن الـ generic ملوش لازمة: T بيظهر مرة واحدة بس (يبقى unknown كفاية)، أو بيظهر في الرجوع بس (يبقى as متنكّر).`,
            when: "«الفرق بين generic و union؟»، و «يعني إيه extends في generics؟»، و «إزاي تعمل default لـ T؟»، و «keyof مع generics؟».",
            mistakes: "«generics عشان الدالة تقبل أي نوع» (ده any، والفرق إن النوع مبيضيعش). ومثال identity بس من غير استخدام حقيقي."
          },
          lines: [
            "T أي object فيه id، والناتج Map بنفس T.",
            R`[[Map]] من أزواج id وعنصر.`,
            "قفلة.",
            "T اتستنتج بالشكل الكامل.",
            R`[[name]] متاحة: النوع مضاعش.`
          ],
          sol: R`من غير generic، [[users.get("u1")?.name]] بيطلّع Property 'name' does not exist on type '{ id: string; }'، ونداء [[byId([{ id: "u1", name: "Sara" }])]] نفسه بيطلّع Object literal may only specify known properties, and 'name' does not exist. الدالة بقت شايفة [[{ id: string }]] بس.

الإجابة النموذجية: generics لما دالة أو نوع بيشتغل مع أنواع كتير ولازم يفتكر النوع اللي دخل. مثال حقيقي: [[byId]] دي، أو [[ApiResponse<T>]]، أو [[Repository<T>]]، أو [[useState<T>]]. والـ constraint ([[T extends { id: string }]]) بيضمن الحد الأدنى اللي الدالة محتاجاه. وقول إن any مش بديل، لأنها بتضيّع النوع.`
        },
        {
          cmd: "نوع مفيهوش قيم",
          title: "يعني إيه never وبتستخدمه فين؟ (What is never?)",
          desc: R`never هو النوع الفاضي: مفيش أي قيمة تنفعله. بيظهر في دالة مبترجعش أبدًا (دايمًا بترمي أو فيها loop مبيخلصش)، وفي فرع كود مستحيل يوصله بعد ما كل الاحتمالات اتفحصت. أشهر استخدام عملي: exhaustive check في آخر switch على discriminated union، لو حد ضاف حالة جديدة ومحدش غطّاها، التعيين لـ never يطلّع خطأ. وكمان [[Exclude]] بيستخدمه عشان يشيل أعضاء من union، لأن never بيختفي من أي union.`,
          example: R`type Level = "info" | "error";
function color(l: Level) {
  if (l === "info") return "blue";
  if (l === "error") return "red";
  const x: never = l;
  return x;
}`,
          try: R`ضيف [["warn"]] لـ [[Level]] وشوف الخطأ فين.`,
          flag: "script",
          deep: {
            why: "بيختبر فهمك لنظام الأنواع كمجموعات (unknown في القمة، و never في القاع)، وإنك بتستخدمه عمليًا مش نظري.",
            how: R`فكّر في الأنواع كمجموعات قيم: unknown كل القيم، و never المجموعة الفاضية. و never assignable لأي نوع (الفاضي جزء من أي مجموعة)، ومفيش حاجة assignable ليه غير never. و [[string & number]] بيطلع never لأن مفيش قيمة الاتنين. والفرق عن void: void يعني «الدالة بترجع بس القيمة ملهاش لازمة»، و never يعني «الدالة مبترجعش أصلًا».`,
            when: "«الفرق بين never و void؟»، و «إيه اللي بيحصل لـ never جوه union؟» (بيختفي)، و «إزاي تعمل assertNever؟».",
            mistakes: "«never زي void». و «never يعني null». ومش عارف أي استخدام عملي ليه."
          },
          lines: [
            "union حالتين.",
            "دالة.",
            "حالة.",
            "حالة.",
            R`هنا l نوعها never. لو ضفت [["warn"]] للـ union، السطر ده هيطلّع خطأ.`,
            "unreachable.",
            "قفلة."
          ],
          sol: R`بعد ما تضيف [["warn"]] الخطأ بيطلع على [[const x: never = l]]: Type '"warn"' is not assignable to type 'never' (TS2322)، والرسالة فيها اسم الحالة الناقصة.

الإجابة النموذجية: never نوع مفيهوش ولا قيمة. بيظهر في تلات أماكن: دالة مبترجعش أبدًا (بترمي خطأ أو loop لا نهائي)، واللي بيفضل من union بعد ما كل حالاته اتفحصت، وده اللي بنستخدمه في exhaustive check، والفلترة في conditional types ([[Exclude]] بيرجّع never للحاجة اللي بتتشال). وفرّقه عن void: void بترجع (undefined)، و never مبترجعش أصلًا.`
        },
        {
          cmd: "الشكل مش الاسم",
          title: "TypeScript structural ولا nominal؟ يعني إيه؟ (Structural typing)",
          desc: R`TypeScript structural: نوعين متوافقين لو الشكل متوافق، مش لو الاسم واحد أو فيه وراثة معلنة. أي object فيه الخصايص المطلوبة بالأنواع المطلوبة يعدّي، حتى لو فيه خصايص زيادة. وده عكس Java و C# اللي nominal. والاستثناء: object literal مكتوب مباشرة بيتعمله excess property check. ومن نتايج الموضوع ده إن [[Object.keys]] بترجع [[string[]]]، وإن لو محتاج أفرّق بين [[UserId]] و [[OrderId]] بستخدم branded types.`,
          example: R`class Cat { name = "cat"; }
class Robot { name = "r2"; }
const pet: Cat = new Robot();
type Point = { x: number; y: number };
const p3 = { x: 1, y: 2, z: 3 };
const p: Point = p3;`,
          try: R`اكتب [[const p: Point = { x: 1, y: 2, z: 3 }]] مباشرة وشوف الفرق.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم ليه TS بيقبل حاجات تستغربها، وإنك عارف حدود الأمان في الأنواع.",
            how: R`TS اتصمم عشان يوصف JS، و JS مبني على duck typing: الدالة بتستخدم الخصايص اللي محتاجاها بس، فالمقارنة بالشكل منطقية. والكلاس اللي فيه خاصية [[private]] أو [[#private]] بيبقى nominal تقريبًا، لأن الخاصية الخاصة مرتبطة بالكلاس نفسه. والأنواع بتتمسح، فمفيش حاجة اسمها «النوع ده» وقت التشغيل تتقارن بيها.`,
            when: "«ليه Object.keys مش بيرجع keyof T؟»، و «إزاي تعمل nominal typing؟» (brands)، و «يعني إيه excess property check؟».",
            mistakes: "«TS بيقارن بالاسم». و «لازم implements عشان الكلاس يتقبل كـ interface». و «الخصايص الزيادة دايمًا ممنوعة»."
          },
          lines: [
            "كلاس.",
            "كلاس ملوش علاقة بيه بس نفس الشكل.",
            "مقبول: الشكل واحد.",
            "نوع.",
            "فيه خاصية زيادة.",
            "مقبول: متغير مش literal، فمفيش excess check."
          ],
          sol: R`[[const p: Point = { x: 1, y: 2, z: 3 }]] بيطلّع Object literal may only specify known properties, and 'z' does not exist in type 'Point' (TS2353)، أما [[const p: Point = p3]] بيعدّي. الفرق excess property check: بيشتغل بس على object literal مكتوب مباشرة، لأن [[z]] هنا غالبًا غلطة. أما متغير جاهز فـ TS بيفحص الشكل بس، وفيه x و y فبيعدّي.

الإجابة النموذجية: TS structural، يعني بيقارن الشكل مش الاسم، فـ [[Robot]] ينفع مكان [[Cat]] لأن ليهم نفس الخصايص. ولو محتاج nominal (UserId مش OrderId) استخدم branded types أو [[#private]] في الكلاسات.`
        },
        {
          cmd: "الأنواع بتتمسح",
          title: "TypeScript بيعمل إيه وقت التشغيل؟ (What does TS do at runtime?)",
          desc: R`ولا حاجة. شغل TypeScript كله وقت الكتابة والـ build: بيفحص الأنواع، وبعدين بيمسحها ويطلّع JS عادي. المتصفح أو Node بيشغّل JS مفيهوش أي معلومة عن الأنواع. يعني [[as User]] مبيحوّلش حاجة، و [[: User]] على رد API مبيفحصش حاجة، وأي داتا من برّه محتاجة فحص حقيقي بكود أو مكتبة زي Zod. والاستثناءات القليلة اللي بتطلّع كود هي enum و namespaces و parameter properties في الكلاسات، وده سبب إن Node و [[erasableSyntaxOnly]] بيرفضوهم.`,
          example: R`interface User { name: string }
const u = JSON.parse('{"name": 5}') as User;
console.log(typeof u.name); // number`,
          try: R`شغّل المثال بـ tsx وشوف الناتج، وبعدين افتح الـ JS اللي [[tsc]] طلّعه ودوّر على كلمة User.`,
          flag: "script",
          deep: {
            why: "ده أهم سؤال في TS، ولو إجابته غلط باقي الإجابات مش هتفرق. بيكشف إذا كنت فاهم إن الأنواع وعد مش حماية.",
            how: R`فيه مرحلتين: type checking و emit، والأدوات الحديثة (esbuild و Vite و tsx و Node type stripping) بتعمل التانية بس. وعشان الأنواع مش موجودة، مينفعش [[instanceof]] مع interface، ولا تختار سلوك وقت التشغيل على أساس نوع، ولا تقرا نوع T جوه دالة generic (T مش قيمة). و TypeScript مبيضيفش أي overhead على الأداء.`,
            when: "«إزاي تتحقق من داتا API إذن؟»، و «ليه enum مختلف؟»، و «يعني إيه type erasure؟»، و «TS بيحسّن الأداء؟».",
            mistakes: "«TS بيمنع الأخطاء وقت التشغيل». و «as بيحوّل النوع». و «الكود بيبقى أبطأ عشان الأنواع»."
          },
          lines: [
            "النوع بيتمسح.",
            "as مبيعملش أي فحص.",
            "بيطبع number، مش string."
          ],
          sol: R`tsx بيطبع [[number]]: [[as User]] مغيّرتش حاجة في الداتا، و [[name]] لسه 5.

والـ JS اللي [[tsc]] طلّعه: [[const u = JSON.parse('{"name": 5}');]] و [[console.log(typeof u.name);]] بس، وكلمة User مش موجودة خالص، لا الـ interface ولا الـ as. الإجابة النموذجية: TS مبيعملش أي حاجة وقت التشغيل. بيفحص وقت الكتابة والـ build، وبعدين الأنواع بتتمسح. فالداتا اللي جاية من برّه لازم تتفحص بكود حقيقي (Zod أو type guards).`
        },
        {
          cmd: "بيطلّع كود runtime",
          title: "ليه ناس كتير بتتجنب enum؟ وإيه البديل؟ (Enums pitfalls)",
          desc: R`enum من الحاجات القليلة في TS اللي مش بتتمسح: بيتحوّل لـ object حقيقي في الـ JS، فمبيشتغلش مع Node type stripping ولا مع [[erasableSyntaxOnly]]. والـ numeric enums فيها reverse mapping، فـ [[Object.keys]] بيرجع ضعف العدد، ولو القيم متخزنة كأرقام وضفت عضو في النص، الترتيب يبوظ. والـ string enums nominal، فالـ string الجاية من API لازم تتحول. والبديل: union من literals، ولو محتاج القيم وقت التشغيل object بـ [[as const]] ونوع طالع منه، وده نفس اللي Prisma 7 بيولّده.`,
          example: R`enum Dir { Up, Down }
console.log(Object.keys(Dir)); // ["0", "1", "Up", "Down"]
const Dir2 = { Up: "UP", Down: "DOWN" } as const;
type Dir2 = (typeof Dir2)[keyof typeof Dir2];`,
          try: R`شغّل المثال بـ [[node file.ts]] على Node 24 وشوف الخطأ، وبـ [[npx tsx file.ts]] وشوف الناتج.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك عارف إن TS مش «أنواع بس» في كل حتة، ومتابع اتجاه الأدوات الحديثة.",
            how: R`[[const enum]] بيتشال ويتحط مكانه القيمة، بس بيعتمد إن الـ compiler شايف كل الملفات، فمبيشتغلش مع [[isolatedModules]] (Vite و esbuild و Babel). وفيه حالات enum مقبول فيها: مشروع قايم عليه، أو لو عايز سلوك nominal. والأهم تكون القيم string صريحة.`,
            when: "«الفرق بين enum و const enum؟»، و «إزاي تطلّع union من object؟»، و «يعني إيه erasableSyntaxOnly؟».",
            mistakes: "«enum مجرد نوع وبيتمسح». و «enum أسرع». و «مفيش بديل»."
          },
          lines: [
            "numeric enum.",
            R`بيطبع ٤ مفاتيح مش ٢: reverse mapping.`,
            "البديل: object ثابت.",
            R`النوع: [["UP" | "DOWN"]].`
          ],
          sol: R`[[node file.ts]]: [[SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode]]. و [[npx tsx file.ts]] بيطبع [[[ '0', '1', 'Up', 'Down' ]]].

الإجابة النموذجية: enum مش نوع وبس، ده بيطلّع object حقيقي. الـ numeric enum فيه reverse mapping، فـ [[Object.keys]] بيطلّع الأرقام والأسماء. ومش شغال مع strip-only (Node و [[erasableSyntaxOnly]])، وكمان الـ numeric enum بيقبل أي متغير نوعه number، حتى لو قيمته مش من الـ enum. البديل: [[as const]] object مع union type مشتق منه، أو union من strings على طول.`
        },
        {
          cmd: "أنواع مشتقة من نوع واحد",
          title: "اذكر utility types بتستخدمها في الشغل وليه (Utility types)",
          desc: R`بستخدمهم عشان أعمل أنواع مشتقة من موديل واحد بدل ما أكرر: [[Omit<User, "password">]] للي بيرجع للـ client، و [[Partial]] للـ PATCH، و [[Pick]] للقوايم، و [[Record<Role, string[]>]] لقاموس لازم يغطي كل الأدوار. ومن الدوال: [[ReturnType]] و [[Parameters]] و [[Awaited]] لما النوع مش متصدّر. و [[NonNullable]] و [[Exclude]] لتعديل unions. والميزة إن لما الموديل يتغير، كل الأنواع المشتقة تتغير معاه.`,
          example: R`type User = { id: string; email: string; password: string };
type PublicUser = Omit<User, "password">;
type UserPatch = Partial<Omit<User, "id">>;`,
          try: R`اكتب [[Partial]] بنفسك كـ mapped type وقارنه بالأصلي بالماوس.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتكتب أنواع سهلة الصيانة، ومش بتنسخ نفس الشكل في عشر أماكن.",
            how: R`كلهم معمولين في lib.es5.d.ts بـ mapped types ([[Partial]] و [[Pick]] و [[Record]]) أو conditional types ([[Exclude]] و [[ReturnType]]). و [[Omit]] مش بيتأكد إن المفتاح موجود، فغلطة إملائية بتعدّي. و Partial سطحي. و Omit على union بيبوّظ الـ discriminated union.`,
            when: "«اكتبلي Partial بنفسك»، و «الفرق بين Omit و Exclude؟»، و «ReturnType بيشتغل إزاي؟» (infer).",
            mistakes: "«Omit بيشيل الخاصية من الداتا». وخلط Exclude (بيشيل من union) مع Omit (بيشيل خصايص). وتحفظ أسماء من غير مثال عملي."
          },
          lines: [
            "الموديل.",
            "للـ client.",
            "للتحديث."
          ],
          sol: R`[[type MyPartial<T> = { [K in keyof T]?: T[K] }]]. لو حطيت الماوس على [[MyPartial<User>]] و [[Partial<User>]] هتلاقي نفس الشكل [[{ id?: string; email?: string; password?: string }]]، والاتنين بيتبدلوا من غير خطأ. ولو فتحت تعريف [[Partial]] (F12) هتلاقيه نفس السطر ده حرفيًا.

الغلطة الشائعة: تكتب [[T[K] | undefined]] من غير [[?]]. ساعتها المفاتيح لسه إجبارية و [[{}]] بيطلّع missing the following properties. وفي الانترفيو قول utility types اللي بتستخدمها وليه: [[Omit]] عشان تشيل password، و [[Partial]] للـ PATCH، و [[Pick]] للـ previews، و [[Record]] للقواميس، و [[ReturnType]] و [[Awaited]] عشان متكررش أنواع.`,
          solCode: R`type User = { id: string; email: string; password: string };
type MyPartial<T> = { [K in keyof T]?: T[K] };
const a: MyPartial<User> = {} as Partial<User>; // نفس النوع
const b: Partial<User> = {} as MyPartial<User>;`
        },
        {
          cmd: "control flow analysis",
          title: "يعني إيه narrowing؟ وإزاي بتعمله؟ (Type narrowing)",
          desc: R`narrowing إن TS يضيّق union لنوع أصغر بناءً على فحص في الكود. بيتابع الـ if والـ switch والـ return: بعد [[typeof x === "string"]] هو عارف إن x string جوه الفرع ده. الأدوات: [[typeof]] للـ primitives، و [[instanceof]] للكلاسات، و [[in]] لوجود خاصية، و equality، و discriminated unions بخاصية literal مشتركة، و type predicates ([[x is User]]) للفحوصات المعقدة. والأهم إن الفحص كود JS حقيقي، فبيحمي وقت التشغيل كمان.`,
          example: R`type Res = { ok: true; data: string } | { ok: false; error: string };
function show(r: Res) {
  return r.ok ? r.data : r.error;
}`,
          try: R`جرّب [[r.data]] من غير الفحص واقرا الخطأ.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتشتغل مع unions صح من غير as، وده أساس أي كود TS نضيف.",
            how: R`TS بيعمل control flow analysis ويحسب نوع كل متغير في كل نقطة. والتضييق ممكن يضيع جوه callbacks لو القيمة ممكن تتغير (property على object أو let)، فخزّنها في const. والـ truthiness بيشيل 0 و "" مع null. ومن TS 5.5، [[filter]] بيستنتج type predicate لوحده للفحوصات البسيطة.`,
            when: "«إيه هو type guard؟»، و «الفرق بين is و asserts؟»، و «exhaustive check؟»، و «ليه instanceof مبيشتغلش مع interface؟».",
            mistakes: "«بعمل as». و «typeof x === \"User\"». ونسيان إن typeof null هو \"object\"."
          },
          lines: [
            "discriminated union.",
            "دالة.",
            R`بعد [[r.ok]]، كل فرع عارف شكله.`,
            "قفلة."
          ],
          sol: R`[[return r.data]] من غير فحص بيطلّع Property 'data' does not exist on type 'Res'. Property 'data' does not exist on type '{ ok: false; error: string; }' (TS2339). يعني TS بيقولك بالظبط أنهي حالة ممكن متكونش فيها [[data]].

الإجابة النموذجية: narrowing هو إن TS بيتابع الكود (if و return و switch) ويضيّق النوع في كل فرع. الأدوات: [[typeof]] و [[instanceof]] و [[in]] والمقارنة بـ [[===]]، و discriminant زي [[ok]] أو [[status]]، و type predicates بـ [[is]]، و assertion functions. ومن غير narrowing، union زي [[Res]] ملوش فايدة.`
        },
        {
          cmd: "افحص عند الحدود",
          title: "إزاي تكتب نوع لرد API بأمان؟ (Typing API responses safely)",
          desc: R`رد API نوعه any، وأي نوع أحطه عليه بـ [[as]] أو annotation مجرد وعد. فالرد بعتبره [[unknown]]، وأفحصه بـ schema (Zod مثلًا) عند الحدود، والنوع يطلع من الـ schema بـ [[z.infer]]. وقبلها أفحص [[res.ok]]. لو الشكل اتغير، بيطلع ZodError واضح في مكان واحد بدل undefined في الـ UI. ولو الـ API بتاعي في نفس الـ monorepo، بشارك الـ schemas بين الـ front والـ back.`,
          example: R`import * as z from "zod";
const Todo = z.object({ id: z.number(), title: z.string() });
const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const todo = Todo.parse(await res.json());`,
          try: R`غيّر [[title: z.string()]] لـ [[z.number()]] وشوف الخطأ وقت التشغيل.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم إن الأنواع بتتمسح، وإنك بتحمي التطبيق من الحاجات اللي برّه سيطرتك.",
            how: R`فكرة الحدود (trust boundaries): جوه الكود ثق في الأنواع، وعند أي مدخل من برّه افحص. و generic زي [[fetchJson<T>]] من غير فحص هو [[as]] متنكّر. والبدائل لـ Zod: مكتبات أصغر زي Valibot، أو type guards بإيدك، أو توليد الأنواع والـ client من OpenAPI، أو tRPC لو الناحيتين TS.`,
            when: "«ليه مش as؟»، و «إيه الفرق بين parse و safeParse؟»، و «Zod بيأثر على حجم الـ bundle؟»، و «إزاي تشارك الأنواع بين front و back؟».",
            mistakes: R`[[await res.json() as User]]. و «TS بيفحص الرد». و «بكتب interface للرد وخلاص».`
          },
          lines: [
            "Zod.",
            "schema للحاجات اللي هتستخدمها.",
            "الطلب.",
            R`فحص حقيقي، و [[todo]] نوعها [[{ id: number; title: string }]].`
          ],
          sol: R`مع [[title: z.number()]] الـ parse بيرمي [[ZodError]] فيه [["expected": "number"]] و [["path": [ "title" ]]] و [["message": "Invalid input: expected number, received string"]]. TS نفسه مطلّعش أي خطأ، لأن الـ schema متسقة مع نفسها، والغلط اتكشف وقت التشغيل لما الداتا الحقيقية وصلت.

الإجابة النموذجية: رد الـ API نوعه unknown لحد ما يتفحص. [[as Todo]] كذب على TS، و Zod (أو type guard) بيفحص فعلًا وبيدّيك النوع في نفس الوقت. افحص عند الحدود (fetch و req.body و env و localStorage)، وجوه الكود ثق في الأنواع. وخليك فاكر [[res.ok]] قبل الـ parse، وقرر هتعمل إيه مع الـ ZodError: log وخطأ واضح، مش crash.`
        },
        {
          cmd: "فحص، تصديق، فحص بنوع دقيق",
          title: "الفرق بين : Type و as Type و satisfies Type؟ (annotation vs assertion vs satisfies)",
          desc: R`[[const x: T = v]] بيفحص إن v مطابقة لـ T، ونوع x يبقى T. و [[v as T]] مبيفحصش بجد: بيقول للـ compiler «صدّقني» طالما النوعين مش مستحيلين، فممكن يخبّي bugs. و [[v satisfies T]] بيفحص زي الـ annotation، بس بيسيب نوع x هو النوع الدقيق المستنتج، فمبخسرش التفاصيل. عمليًا: annotation للباراميترات والحدود، و satisfies للإعدادات والقواميس، و as آخر حل بعد فحص TS مش فاهمه.`,
          example: R`type Cfg = Record<string, string | number>;
const a: Cfg = { port: 3000 };
const b = { port: 3000 } satisfies Cfg;
const c = {} as Cfg;`,
          try: R`جرّب [[a.port.toFixed()]] و [[b.port.toFixed()]] وقارن.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك عارف الفرق بين إنك تثبت حاجة للـ compiler وإنك تسكّته.",
            how: R`[[satisfies]] موجود من TS 4.9. ومعاه [[as const]]: [[{ ... } as const satisfies Cfg]] بيثبّت القيم ويفحصها. و [[as]] بيرفض بس التحويلات المستحيلة (string لـ number)، و [[as unknown as]] بيعدّي أي حاجة.`,
            when: "«إمتى as مقبولة؟»، و «إيه as const؟»، و «ليه satisfies مفيدة مع Prisma select؟».",
            mistakes: "«satisfies زي as». و «as بيحوّل القيمة». واستخدام as عشان الأخطاء تختفي."
          },
          lines: [
            "نوع عام.",
            R`[[a.port]] نوعها [[string | number]].`,
            R`[[b.port]] نوعها number.`,
            R`[[as]] مبيفحصش الشكل. هنا [[{}]] بالصدفة Cfg سليم (Record ممكن يبقى فاضي)، بس لو Cfg فيه خصايص إجبارية، [[as]] كانت هتعدّي الـ object الناقص، والـ annotation كانت هترفضه.`
          ],
          sol: R`[[a.port.toFixed()]] بيطلّع Property 'toFixed' does not exist on type 'string | number' (TS2339)، لأن الـ annotation خلّت النوع [[Cfg]]، فـ port ممكن تبقى string. (ومع [[noUncheckedIndexedAccess]] كمان possibly undefined.) أما [[b.port.toFixed()]] بيعدّي، لأن satisfies فحصت، وسابت النوع الدقيق [[{ port: number }]].

الإجابة النموذجية: [[: Type]] بيفحص وبيغيّر نوع المتغير للنوع العام. و [[as Type]] مش بيفحص تقريبًا، ده تصديق منك ([[{} as Cfg]] بيعدّي). و [[satisfies Type]] بيفحص وبيسيب النوع المستنتج. استخدم satisfies للـ config والـ objects الثابتة، و annotation لباراميترات الدوال والـ API العامة، و as بس لما انت فعلًا عارف أكتر من TS.`
        },
        {
          cmd: "strict أولًا",
          title: "إيه أهم إعدادات tsconfig بتبدأ بيها أي مشروع؟ (Essential tsconfig options)",
          desc: R`أول حاجة [[strict: true]]، ودي بتشغّل strictNullChecks و noImplicitAny وباقي العيلة، وبقت الافتراضي في TS 6 و 7 بس بكتبها صريح. وبضيف [[noUncheckedIndexedAccess]] عشان [[arr[0]]] تبقى ممكن undefined. وبعدين [[module]] و [[moduleResolution]] حسب البيئة: [[bundler]] مع Vite أو Next، و [[nodenext]] لسيرفر Node بيتبني بـ tsc. و [[target]] حديث زي es2024، و [[types: ["node"]]] في Node، و [[skipLibCheck]] للسرعة، و [[verbatimModuleSyntax]] عشان [[import type]]. وأخيرًا [[tsc --noEmit]] في CI، لأن الـ bundlers مبتفحصش.`,
          example: R`{ "compilerOptions": { "strict": true, "noUncheckedIndexedAccess": true, "module": "nodenext", "target": "es2024", "types": ["node"], "skipLibCheck": true } }`,
          try: R`افتح tsconfig في آخر مشروع ليك وقارنه بالقايمة دي، وشغّل [[npx tsc --showConfig]] تشوف الإعدادات الفعلية بعد ما يدمج الـ extends (الـ defaults الضمنية زي strict في TS 7 مش بتظهر فيه).`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتفهم الإعدادات مش بتنسخها، وإنك عارف ليه المشروع ممكن يتبني ويقع وقت التشغيل.",
            how: R`TS 6 و 7 غيّروا defaults كتير: strict بقى true، و module بقى esnext، و types بقى فاضي (لازم تكتب node)، و baseUrl و moduleResolution node10 و target es5 اتشالوا في 7. و [[paths]] مبتغيّرش الـ JS الناتج، فالـ runtime لازم يفهمها. و [[isolatedModules]] لازم مع أي أداة بتترجم ملف ملف.`,
            when: "«الفرق بين bundler و nodenext؟»، و «ليه الـ build نجح والتطبيق وقع؟»، و «يعني إيه skipLibCheck؟ آمن؟».",
            mistakes: "«بسيب الـ default». و strict: false «عشان الأخطاء كتير». ونسخ tsconfig من Next لسيرفر Express."
          },
          lines: [
            "الحد الأدنى لسيرفر Node."
          ],
          sol: R`[[npx tsc --showConfig]] بيطبع الـ config بعد ما يدمج [[extends]] ويضيف الإعدادات اللي بتتحسب من غيرها (زي [[moduleResolution]] من [[module]]). بس مش بيطبع كل الـ defaults: في TS 7 [[strict]] شغال افتراضيًا ومش هيظهر لو مش مكتوب. عشان كده اكتبه صريح.

الإجابة النموذجية بالترتيب: [[strict: true]]، و [[noUncheckedIndexedAccess]]، و [[module]]/[[moduleResolution]] حسب البيئة ([[nodenext]] لسيرفر بـ tsc، و [[bundler]] مع Vite و Next)، و [[target]] حديث، و [[types: ["node"]]] للسيرفر، و [[skipLibCheck]]، و [[verbatimModuleSyntax]]، و [[tsc --noEmit]] في الـ CI. واذكر ليه كل واحد، مش أساميهم بس.`
        }
      ]
    }
  ]
});
