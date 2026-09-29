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
          ]
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
          try: R`اعمل فولدر، وسطّب زي أول سطر، واكتب [[src/index.ts]] فيه [[const n: number = "5"; console.log(n);]]. شغّله بـ [[npx tsx src/index.ts]]: هيشتغل ويطبع 5 عادي. وبعدين [[npx tsc --noEmit]]: هيمسك الخطأ.`,
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
            R`افحص وطلّع JS في [[outDir]] (غالبًا dist)، عشان تشغّله في الإنتاج بـ [[node dist/index.js]].`
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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

و [[as const]] جوه [[byId]] بيخلي [[[it.id, it]]] tuple مش array عادي، عشان [[Object.fromEntries]] يفهم إن كل زوج مفتاح وقيمة ويطلّع النوع الصح بدل any.`,
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
        },
        {
          cmd: "conditional types",
          title: "نوع بيتغير حسب شرط، وأنواع جاهزة مبنية على الفكرة دي",
          desc: R`[[T extends string ? "yes" : "no"]] زي ternary بس للأنواع. ولما T تبقى union، الشرط بيتطبق على كل عضو لوحده (distributive)، وده اللي عامل [[Exclude]] و [[Extract]] و [[NonNullable]].

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
          ]
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
          ]
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
          ]
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
            how: R`[[as T]] مبيطلّعش أي كود: بيتمسح، والقيمة زي ما هي. و TS بيسمح بيه طالما النوعين «ممكن يتقابلوا» (واحد فيهم assignable للتاني)، فـ [[HTMLElement as HTMLInputElement]] مسموح لأن input نوع من HTMLElement، و [[string as number]] ممنوع.

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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          try: R`بدّل [[z.flattenError]] بـ [[z.treeifyError]] وبعدين بـ [[z.prettifyError]] واطبع الناتج في كل مرة. الأولى للـ forms البسيطة، والتانية للـ objects المتداخلة، والتالتة للّوجات.`,
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
          ]
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
          ]
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
          ]
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

الـ events في React synthetic: [[React.ChangeEvent<T>]] فيها [[currentTarget]] نوعه T بالظبط (HTMLInputElement)، أما [[target]] نوعه أعم لأن الـ event ممكن يكون جاي من عنصر جوه. عشان كده [[e.currentTarget.value]] أأمن.

وفي @types/react 19.2 وأحدث، [[FormEvent]] بقى deprecated (الاسم كان مضلل)، والبديل [[SubmitEvent]] للـ submit، و [[ChangeEvent]] أو [[InputEvent]] للتغيير. الكود القديم لسه شغال، بس المحرر هيشطب عليه.

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
            R`submit الفورم. في @types/react 19.2+ اسمه [[SubmitEvent]]، و [[FormEvent]] القديم deprecated.`,
            "امنع الـ reload.",
            "لازم قيمة من Status.",
            "لازم شكل User كامل.",
            "قفلة الـ handler.",
            R`[[user?.name]] لأن user ممكن يبقى null.`,
            "قفلة."
          ]
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
          ]
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
          ]
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
          ]
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
            how: R`TS مبيعرفش حاجة عن الشبكة: [[Response.json()]] متعرّفة إنها [[Promise<any>]] في أنواع المتصفح و Node. وأي نوع تحطه بعدها ([[as]] أو annotation أو generic) كلام بس.

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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
            "ولا فحص: object فاضي عدّى."
          ]
        },
        {
          cmd: "strict أولًا",
          title: "إيه أهم إعدادات tsconfig بتبدأ بيها أي مشروع؟ (Essential tsconfig options)",
          desc: R`أول حاجة [[strict: true]]، ودي بتشغّل strictNullChecks و noImplicitAny وباقي العيلة، وبقت الافتراضي في TS 6 و 7 بس بكتبها صريح. وبضيف [[noUncheckedIndexedAccess]] عشان [[arr[0]]] تبقى ممكن undefined. وبعدين [[module]] و [[moduleResolution]] حسب البيئة: [[bundler]] مع Vite أو Next، و [[nodenext]] لسيرفر Node بيتبني بـ tsc. و [[target]] حديث زي es2024، و [[types: ["node"]]] في Node، و [[skipLibCheck]] للسرعة، و [[verbatimModuleSyntax]] عشان [[import type]]. وأخيرًا [[tsc --noEmit]] في CI، لأن الـ bundlers مبتفحصش.`,
          example: R`{ "compilerOptions": { "strict": true, "noUncheckedIndexedAccess": true, "module": "nodenext", "target": "es2024", "types": ["node"], "skipLibCheck": true } }`,
          try: R`افتح tsconfig في آخر مشروع ليك وقارنه بالقايمة دي، وشغّل [[npx tsc --showConfig]] تشوف الإعدادات الفعلية بعد الـ defaults.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتفهم الإعدادات مش بتنسخها، وإنك عارف ليه المشروع ممكن يتبني ويقع وقت التشغيل.",
            how: R`TS 6 و 7 غيّروا defaults كتير: strict بقى true، و module بقى esnext، و types بقى فاضي (لازم تكتب node)، و baseUrl و moduleResolution node10 و target es5 اتشالوا في 7. و [[paths]] مبتغيّرش الـ JS الناتج، فالـ runtime لازم يفهمها. و [[isolatedModules]] لازم مع أي أداة بتترجم ملف ملف.`,
            when: "«الفرق بين bundler و nodenext؟»، و «ليه الـ build نجح والتطبيق وقع؟»، و «يعني إيه skipLibCheck؟ آمن؟».",
            mistakes: "«بسيب الـ default». و strict: false «عشان الأخطاء كتير». ونسخ tsconfig من Next لسيرفر Express."
          },
          lines: [
            "الحد الأدنى لسيرفر Node."
          ]
        }
      ]
    }
  ]
});
