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
          teach: R`## المثال ده بيعمل إيه؟

بيعرّف ٣ متغيرات ودالة، وبيطبع جملة. الكود نفسه JavaScript عادي جدًا، والجديد بس الحتت اللي بعد [[:]]. هنفكه سطر سطر، وبعدين نشوف الـ compiler بيعمل فيه إيه. كل الأمثلة في التاب ده اتشغّلت بـ TypeScript 6.0.3 (و 7.0.2 للمقارنة) في مشروع صغير، و [[tsx]] على Node 24 على ويندوز و Node 22 في Docker (لينكس).

---

## ١. المتغيرات: [[:]] وبعدها النوع

~~~text app.ts
let developerName: string = "Sara";
let experienceYears: number = 3;
let isFullStack: boolean = true;
~~~

كل سطر فيه ٤ حتت:

| الحتة | معناها |
|---|---|
| [[let]] | تعريف متغير ممكن يتغير بعدين (JS عادي) |
| [[developerName]] | اسم المتغير |
| [[: string]] | **الـ type annotation**: «المتغير ده نص بس». دي الحتة الوحيدة اللي TS زوّدها |
| [[= "Sara"]] | القيمة الأولى (JS عادي) |

والأنواع التلاتة الأساسية:

- [[string]]: أي نص بين [["..."]] أو [['...']] أو backticks.
- [[number]]: أي رقم، صحيح أو بكسور. JS معندوش int و float منفصلين.
- [[boolean]]: [[true]] أو [[false]] بس.

---

## ٢. الدالة: نوع كل parameter ونوع اللي راجع

~~~text app.ts
function getProfile(name: string, years: number): string {
  return name + " has " + years + " years of experience";
}
~~~

- [[name: string]]: أول parameter لازم يبقى نص.
- [[years: number]]: التاني لازم رقم.
- [[): string]] بعد قوس الـ parameters: نوع **اللي الدالة بترجّعه**. يعني الدالة دي بتوعد إنها هترجّع نص.
- [[+]] بين نص ورقم في JS بيحوّل الرقم لنص ويلزقهم، فالناتج نص فعلًا، والوعد ماشي.

---

## ٣. النداء والطباعة

~~~text app.ts
const profileText = getProfile(developerName, experienceYears);
console.log(profileText);
console.log("Full stack:", isFullStack);
~~~

- [[profileText]] مكتوبلوش نوع، بس TS عرف لوحده إنه [[string]] لأن الدالة بترجّع string. ده اسمه type inference (ليه درس).
- [[console.log]] بيطبع، ولو اديته أكتر من قيمة بفاصلة بيحط بينهم مسافة.

~~~text الناتج: npx tsx app.ts
Sara has 3 years of experience
Full stack: true
~~~

---

## ٤. الـ compiler بيعمل إيه في الملف ده؟

الـ compiler اسمه [[tsc]] (TypeScript Compiler). بيعمل حاجتين ورا بعض: **يفحص** الأنواع، وبعدين **يطلّع** ملف [[.js]]. ضيف الغلطتين اللي في «جرّب» في آخر الملف (سطر 14 و 15):

~~~text app.ts
getProfile(developerName, "three");
experienceYears = "three";
~~~

~~~text الناتج: npx tsc --noEmit
app.ts(14,27): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
app.ts(15,1): error TS2322: Type 'string' is not assignable to type 'number'.
~~~

اقرا السطر كده:

| الحتة | معناها |
|---|---|
| [[app.ts(14,27)]] | الملف، والسطر 14، والعمود 27 (مكان [["three"]] بالظبط) |
| [[error TS2345]] | رقم الخطأ. كل نوع خطأ ليه رقم ثابت تقدر تدوّر بيه |
| [[Argument of type 'string'...]] | اللي بعته نص، والـ parameter مستني رقم |

و [[TS2322]] هو الخطأ اللي هتشوفه أكتر حاجة: «القيمة دي نوعها مش ماشي مع نوع المتغير».

ولما الكود سليم، [[tsc]] بيطلّع JS. ده الملف اللي طلع من المثال الأصلي بـ [[npx tsc --strict --target esnext app.ts]] (تاب [[.JS]] في الـ Playground بيعرض نفس الشكل):

~~~text app.js (من tsc)
"use strict";
// النوع بعد اسم المتغير بـ :
let developerName = "Sara";
let experienceYears = 3;
let isFullStack = true;
// نوع كل parameter، ونوع اللي الدالة بترجّعه بعد القوسين
function getProfile(name, years) {
    return name + " has " + years + " years of experience";
}
const profileText = getProfile(developerName, experienceYears);
console.log(profileText);
console.log("Full stack:", isFullStack);
~~~

كل [[: string]] و [[: number]] و [[: boolean]] اختفت، والباقي زي ما هو. و [["use strict"]] سطر بيضيفه [[tsc]] عشان يشغّل الـ strict mode بتاع JS. يعني TS مش بيغيّر طريقة شغل الكود، بيفحصه بس.

---

## الخلاصة

- [[: النوع]] بعد اسم المتغير أو الـ parameter، و [[): النوع]] بعد قوسين الدالة لنوع اللي راجع.
- [[string]] و [[number]] و [[boolean]] بحروف صغيرة.
- الأخطاء بتطلع وقت الكتابة برقم ([[TS2322]] و [[TS2345]])، والـ JS اللي بيطلع هو نفس الكود من غير الأنواع.`,
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
          teach: R`## الفكرة في سطرين

فيه حاجتين بيحصلوا للملف [[.ts]]: **الفحص** (type checking) وده بيحصل وانت بتكتب ووقت الـ build، و**التشغيل** وده بيحصل لملف JS مفيهوش أي نوع. هنمشي على المثال ونشوف كل مرحلة بعينها. اتشغّل بـ TypeScript 6.0.3 و Node 24 على ويندوز، ونفس الناتج في Docker على Node 22.

---

## ١. الدالة

~~~text app.ts
function total(price: number, qty: number): number {
  return price * qty;
}
~~~

- [[price: number]] و [[qty: number]]: الاتنين لازم أرقام.
- [[): number]]: الدالة بتوعد إنها ترجّع رقم.
- [[price * qty]]: ضرب عادي. الجسم كله JS، مفيهوش أي حاجة TS.

---

## ٢. النداءين

~~~text app.ts
total(50, 2);
total("50", 2);
~~~

الأول سليم. التاني بيبعت [["50"]] (نص) مكان رقم، فالفحص بيمسكه:

~~~text الناتج: npx tsc --noEmit
app.ts(5,7): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
~~~

[[(5,7)]] يعني السطر 5 والعمود 7، وده مكان [["50"]] بالظبط. و [[TS2345]] رقم الخطأ ده: «الـ argument نوعه مش ماشي مع الـ parameter».

---

## ٣. المرحلة التانية: الـ JS اللي بيطلع

دلوقتي نطلّع JS فعلًا بـ [[npx tsc app.ts]] (من غير [[--noEmit]]). الخطأ لسه بيطلع، **بس الملف بيتكتب برضه**:

~~~text app.js (من tsc)
"use strict";
function total(price, qty) {
    return price * qty;
}
total(50, 2);
total("50", 2); // خطأ: Argument of type 'string' is not assignable to parameter of type 'number'
// الناتج بعد tsc، JS عادي والأنواع اتمسحت:
// function total(price, qty) {
//   return price * qty;
// }
~~~

قارن بالأصل: [[: number]] التلاتة اختفوا، والنداء الغلط اتنقل زي ما هو، والتعليقات كمان اتنقلت. ده بالظبط معنى **type erasure**: الأنواع بتتمسح، ومفيش حاجة منها بتوصل للتشغيل. و [["use strict"]] سطر بيضيفه [[tsc]] من عنده.

والتعليقات اللي في آخر المثال مكتوب فيها نفس شكل الدالة بعد المسح، عشان تشوفه من غير ما تشغّل.

---

## ٤. يحصل إيه لو شغّلنا الـ JS؟

JS مبيعترضش. بيحوّل [["50"]] لرقم عشان الضرب:

~~~text الناتج: node -e (نفس الدالة من غير أنواع)
total(50, 2)    →  100
total("50", 2)  →  100
"5" * 2         →  10
"5" + 2         →  52
~~~

- [[*]] مع نص بيحوّله رقم، فالنداء الغلط «اشتغل» وطلّع 100 بالصدفة.
- [[+]] مع نص بيلزق بدل ما يجمع، فـ [["5" + 2]] بقى [["52"]]. لو الدالة كانت بتجمع، الغلط كان هيعدّي من غير ولا رسالة.

عشان كده الفحص مهم: JS نفسه مش هيقولك.

---

## ٥. إزاي تخلي الخطأ يوقف الـ build

| الطريقة | بتعمل إيه |
|---|---|
| [[tsc --noEmit]] | يفحص بس، ميكتبش ملفات. بيخرج بـ exit code مش صفر لو فيه أخطاء، فالـ CI يقع |
| [[tsc --noEmitOnError]] | يفحص، ولو فيه خطأ **ميكتبش** الـ JS خالص |

جرّبنا [[--noEmitOnError]] على نفس الملف: الخطأ طلع، ومفيش فولدر ناتج اتعمل أصلًا.

---

## الخلاصة

- الفحص والتشغيل مرحلتين منفصلين: الفحص بيقول «غلط»، والتشغيل مبيعرفش أي حاجة عن الأنواع.
- [[tsc]] بيطلّع JS حتى لو فيه أخطاء، إلا لو قلتله [[--noEmitOnError]].
- مفيش حماية وقت التشغيل: الداتا الجاية من برّه لازم تتفحص بكود حقيقي ([[typeof]] أو Zod).`,
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
          teach: R`## الأوامر دي بتعمل إيه؟

٧ أوامر بيعملوا ٣ حاجات: تسطيب الأدوات، و**تشغيل** ملف [[.ts]]، و**فحص** أنواعه. المهم تفهم إن التشغيل والفحص منفصلين. كله اتشغّل في فولدر فاضي على ويندوز (Node 24.19، Git Bash و PowerShell)، والتشغيل والفحص اتعادوا في Docker على [[node:22-slim]] (Node 22.23) بنفس النتايج. أي أوامر npm هنا شغالة زي ما هي على لينكس والماك وويندوز.

---

## ١. التسطيب

~~~bash
npm i -D typescript tsx @types/node
~~~

- [[npm i]] اختصار [[npm install]].
- [[-D]] اختصار [[--save-dev]]: الحزم دي بتتكتب في [[devDependencies]] في [[package.json]]، لأنها أدوات تطوير مش جزء من التطبيق وهو شغال.
- [[typescript]]: فيها الـ compiler، وأمره اسمه [[tsc]]. من غير رقم نسخة npm بيسطّب آخر نسخة، ودلوقتي هي 7:

~~~text الناتج: npx tsc -v
Version 7.0.2
~~~

- [[tsx]]: أداة بتشغّل ملفات [[.ts]] على طول (مش [[.tsx]] بتاعة React، تشابه أسامي بس).
- [[@types/node]]: أنواع Node نفسه ([[process]] و [[fs]] وغيرهم). من غيرها TS ميعرفش إن [[process]] موجود.

ولو عايز TS 6 بالذات: [[npm i -D typescript@6]] (طلّعت [[Version 6.0.3]]).

---

## ٢. [[npx tsc --init]]: ملف الإعدادات

[[npx]] بيشغّل أداة متسطّبة جوه المشروع (من [[node_modules/.bin]]) من غير ما تسطّبها global.

~~~text الناتج
Created a new tsconfig.json

You can learn more at https://aka.ms/tsconfig
~~~

الملف فيه إعدادات كتير وأغلبها عليها تعليق. أهم اللي شغال فيه (TS 6 و 7 بيطلّعوا نفس الملف):

| الإعداد | معناه |
|---|---|
| [["module": "nodenext"]] | الـ import/export بيمشوا على قواعد Node الحديثة |
| [["target": "esnext"]] | اطلّع JS بأحدث شكل، من غير تحويل لصيغ قديمة |
| [["types": []]] | متحمّلش أنواع أي حزمة لوحدها، ولا حتى Node |
| [["strict": true]] | كل الفحوصات المهمة شغالة |
| [["verbatimModuleSyntax": true]] | الـ import يتكتب في الـ JS زي ما انت كاتبه بالظبط |
| [[// "outDir": "./dist"]] | عليه تعليق: يعني الـ [[.js]] هيطلع جنب الـ [[.ts]] |

---

## ٣. الملف اللي هنجرّب عليه

~~~text src/index.ts
const n: number = "5";
console.log(n);
~~~

فيه غلطة قصد: [[n]] نوعه number واتحط فيه نص.

---

## ٤. التشغيل من غير فحص

~~~bash
npx tsx src/index.ts
node src/index.ts
~~~

~~~text الناتج (الاتنين)
5
5
~~~

الاتنين اشتغلوا وطبعوا 5، ومحدش اشتكى. ليه؟

- [[tsx]] بيستخدم esbuild: بيشيل الأنواع من الملف وبيدّي الـ JS لـ Node. **مبيفحصش**.
- [[node src/index.ts]] في Node 22.18 وأحدث بيعمل نفس الحكاية بنفسه (type stripping): يشيل الأنواع ويشغّل.

و [[npx tsx watch src/index.ts]] نفس الكلام، بس بيفضل شغال ويعيد التشغيل كل ما تحفظ الملف. بيتقفل بـ Ctrl+C.

---

## ٥. الفحص: [[npx tsc --noEmit]]

[[--noEmit]] يعني «افحص بس، متكتبش ملفات».

~~~text الناتج
src/index.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.
~~~

- [[(1,7)]]: السطر 1، العمود 7 (مكان [[n]]).
- [[TS2322]]: القيمة نوعها مش ماشي مع نوع المتغير.

والأهم من الرسالة هو **الـ exit code**، لأنه اللي بيخلي الـ CI يقع:

| النسخة | exit code لـ [[tsc --noEmit]] وفيه أخطاء |
|---|---|
| TypeScript 7.0.2 | [[1]] |
| TypeScript 6.0.3 | [[2]] |

الاتنين «مش صفر»، فأي سكربت أو CI هيعتبرهم فشل. تشوفه بـ [[echo $?]] في bash، أو [[$LASTEXITCODE]] في PowerShell.

---

## ٦. [[npx tsc]]: فحص وكتابة JS

من غير [[--noEmit]]، [[tsc]] بيفحص **وبيكتب** ملفات حتى لو فيه أخطاء. على الملف الغلط طلّع نفس الخطأ (exit code 2 في النسختين)، و [[src]] بقى فيه:

~~~text الناتج: ls src
index.d.ts
index.d.ts.map
index.js
index.js.map
index.ts
~~~

| الملف | ليه طلع |
|---|---|
| [[index.js]] | الـ JS نفسه |
| [[index.js.map]] | source map: بيربط الـ JS بالـ TS عشان الـ debugger يوريك سطر الـ TS ([["sourceMap": true]]) |
| [[index.d.ts]] و [[.d.ts.map]] | أنواع الملف لو حد هيستخدمه كمكتبة ([["declaration": true]]) |

عشان الناتج ميتلخبطش مع الكود: شيل التعليق عن [["rootDir": "./src"]] و [["outDir": "./dist"]]. بعدها (والملف متصلّح لـ [[= 5]]) [[npx tsc]] طلّع exit code 0، والملفات راحت [[dist]]، و [[node dist/index.js]] طبع [[5]].

---

## ٧. مشكلتين هتقابلهم على طول

### [[import]] بيطلّع TS1295

[[npm init -y]] (npm 11) بيكتب [["type": "commonjs"]] في [[package.json]]. ومع [[verbatimModuleSyntax]]، أي [[import]] بيطلّع:

~~~text الناتج: npx tsc --noEmit
src/index.ts(1,10): error TS1295: ECMAScript imports and exports cannot be written in a CommonJS file under 'verbatimModuleSyntax'. Adjust the 'type' field in the nearest 'package.json' to make this file an ECMAScript module, or adjust your 'verbatimModuleSyntax', 'module', and 'moduleResolution' settings in TypeScript.
~~~

الحل: خلّيها [["type": "module"]] في [[package.json]].

### [[process]] مش معروف: TS2591

عشان [["types": []]] فاضية، أنواع Node مش متحمّلة حتى بعد ما سطّبت [[@types/node]]:

~~~text الناتج
src/index.ts(1,13): error TS2591: Cannot find name 'process'. Do you need to install type definitions for node? Try $__btnpm i --save-dev @types/node$__bt and then add 'node' to the types field in your tsconfig.
~~~

الحل: [["types": ["node"]]]. بعد التعديلين الاتنين، [[tsc --noEmit]] خرج بـ 0، والملف اشتغل بـ tsx و node.

---

## الأوامر كلها مرة واحدة

| الأمر | بيفحص؟ | بيشغّل؟ | بيكتب ملفات؟ |
|---|---|---|---|
| [[npx tsx src/index.ts]] | لأ | أيوة | لأ |
| [[npx tsx watch src/index.ts]] | لأ | أيوة، مع كل حفظ | لأ |
| [[node src/index.ts]] | لأ | أيوة (أنواع بس، مفيش enum) | لأ |
| [[npx tsc --noEmit]] | أيوة | لأ | لأ |
| [[npx tsc]] | أيوة | لأ | أيوة، حتى مع الأخطاء |

## الخلاصة

- شغّل بـ [[tsx]] أو [[node]] وانت بتطوّر، وافحص بـ [[tsc --noEmit]] قبل ما ترفع وفي الـ CI.
- مفيش أداة تشغيل بتفحص الأنواع: الـ 5 اتطبعت والنوع غلط.
- مشروع جديد: [["type": "module"]] في package.json، و [["types": ["node"]]] في tsconfig.`,
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

[[src/index.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.]] ومعاه exit code مش صفر (اتأكد بـ [[echo $?]]): 1 في TS 7، و 2 في TS 6. وده اللي بيخلي الـ CI يقع.

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
          teach: R`## المثال بيعمل إيه؟

بيكتب نوع لـ ٣ متغيرات ولدالة، وبعدين بيغلط غلطتين عشان تشوف TS بيمسكهم إزاي. الفحص اتعمل بـ [[npx tsc --noEmit]] (TypeScript 6.0.3، و 7.0.2 طلّع نفس الأخطاء بالظبط)، والتشغيل بـ [[npx tsx]].

---

## ١. المتغيرات

~~~text app.ts
let username: string = "sara";
let age: number = 27;
let isAdmin: boolean = false;
~~~

الشكل دايمًا: **الاسم، وبعده [[:]]، وبعده النوع، وبعده القيمة**. والـ [[:]] هنا معناها «نوعه». فالسطر الأول يتقري: «username نوعه string وقيمته sara».

---

## ٢. الدالة

~~~text app.ts
function greet(name: string, excited: boolean): string {
  return excited ? $__btHi $__{name}!$__bt : $__btHi $__{name}$__bt;
}
~~~

### الـ parameters

[[name: string]] و [[excited: boolean]]: كل parameter بنوعه، بنفس شكل المتغيرات. ده أهم مكان تكتب فيه نوع، لأن TS مش هيعرف يخمّن الدالة هتتنادي بإيه.

### نوع الرجوع: [[): string]]

بعد القوس اللي بيقفل الـ parameters: الدالة بتوعد إنها ترجّع string.

### جوه الدالة: الـ ternary والـ template string

- [[excited ? A : B]] اسمه ternary: لو [[excited]] true خُد A، غير كده خُد B. زي if/else بس في تعبير واحد.
- [[$__btHi $__{name}!$__bt]] اسمه template string: نص بين backticks، و [[$__{name}]] جواه بيتحط مكانه قيمة [[name]].

الفرعين نصوص، فالوعد [[: string]] ماشي.

~~~text الناتج: console.log(greet("sara", true), "|", greet("sara", false))
Hi sara! | Hi sara
~~~

---

## ٣. النداء الصح والغلط

~~~text app.ts
greet("sara", true);
greet("sara");
age = "28";
~~~

~~~text الناتج: npx tsc --noEmit
app.ts(8,1): error TS2554: Expected 2 arguments, but got 1.
app.ts(9,1): error TS2322: Type 'string' is not assignable to type 'number'.
~~~

### [[greet("sara")]]: TS2554

الدالة محتاجة ٢ arguments وجالها واحد. في JS عادي ده بيعدّي، و [[excited]] بتبقى [[undefined]]، والـ ternary بيعتبرها false. جرّبناها في ملف [[.js]]:

~~~text الناتج: node (نفس الدالة من غير أنواع)
Hi sara
~~~

يعني JS كمّل بهدوء وطلّع نتيجة غلط. TS خلاها خطأ.

### [[age = "28"]]: TS2322

[[age]] اتعرّف [[number]]، فمينفعش يتحط فيه نص بعد كده، حتى لو النص شكله رقم. [[(9,1)]] يعني السطر 9 العمود 1.

---

## ٤. لو نسيت نوع parameter؟

مع [[strict]] (شغال افتراضيًا في TS 6 و 7)، parameter من غير نوع بيطلّع [[TS7006: Parameter 'name' implicitly has an 'any' type]]. يعني TS بيرفض يخمّن ويقولك اكتبه.

---

## الخلاصة

| المكان | الشكل | لازم؟ |
|---|---|---|
| متغير | [[let age: number = 27]] | لأ غالبًا (الدرس الجاي) |
| parameter | [[(name: string)]] | أيوة |
| نوع الرجوع | [[function f(): string]] | مفيد، والخطأ بيطلع جوه الدالة بدل برّه |

- الأنواع بحروف صغيرة: [[string]] مش [[String]].
- [[TS2322]]: قيمة نوعها غلط. [[TS2554]]: عدد arguments غلط.`,
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
          teach: R`## المثال بيعمل إيه؟

مفيش نوع مكتوب في المثال غير [[s: string]]، ومع كده TS عارف نوع كل حاجة. هنمشي سطر سطر ونشوف TS استنتج إيه. الأنواع اللي تحت هي اللي بتظهر لما توقف بالماوس على المتغير في VS Code، وطلّعناها من الـ compiler نفسه (TypeScript 6.0.3).

---

## ١. من القيمة الأولى

~~~text app.ts
let count = 0;
~~~

[[0]] رقم، فـ [[count]] بقى [[number]]. وده نوعه للأبد، مش «أي حاجة لحد ما تتحط قيمة».

---

## ٢. [[const]] ولا [[let]]: الفرق المهم

~~~text app.ts
const method = "GET";
let status = "idle";
~~~

~~~text الأنواع
method: "GET"
status: string
~~~

- [[const]] مستحيل يتغير، فـ TS بيقول إن نوعه هو القيمة نفسها: [["GET"]]. ده اسمه **literal type** (نوع قيمته الوحيدة نص معين).
- [[let]] ممكن يتغير بعدين لأي نص تاني، فـ TS **بيوسّع** النوع لـ [[string]]. ده اسمه widening.

ده بيفرق لما تبعت المتغير لدالة مستنية قيم معينة. جرّبنا:

~~~text app.ts
let st = "idle";
function setS(x: "idle" | "loading") {}
setS(st);
~~~

~~~text الناتج: npx tsc --noEmit
app.ts(3,6): error TS2345: Argument of type 'string' is not assignable to parameter of type '"idle" | "loading"'.
~~~

[[st]] نوعه string، والدالة عايزة واحدة من قيمتين بس. مع [[const st]] كان هيعدّي.

---

## ٣. الـ arrays والـ callbacks

~~~text app.ts
const ids = [1, 2, 3];
const doubled = ids.map((id) => id * 2);
~~~

~~~text الأنواع
ids: number[]
id: number
doubled: number[]
~~~

- [[number[]]]: «array كل عناصرها أرقام». القوسين [ ] بعد النوع معناهم ليستة منه.
- [[(id) => id * 2]] دالة سهم (arrow function). [[id]] مكتوبلوش نوع، بس TS عرف إنه number لأن [[map]] على [[number[]]] بتبعت أرقام. ده اسمه **contextual typing**: النوع جاي من المكان اللي الدالة اتكتبت فيه.
- [[id * 2]] رقم، فـ [[map]] رجّعت [[number[]]].

~~~text الناتج: console.log(ids, doubled)
[ 1, 2, 3 ] [ 2, 4, 6 ]
~~~

---

## ٤. نوع رجوع الدالة

~~~text app.ts
function toUpper(s: string) {
  return s.toUpperCase();
}
~~~

الـ parameter لازم نوع ([[s: string]])، بس نوع الرجوع مش مكتوب. [[toUpperCase()]] بترجّع string، فـ TS استنتج:

~~~text النوع
function toUpper(s: string): string
~~~

---

## ٥. الغلطة

~~~text app.ts
count = "1";
~~~

~~~text الناتج: npx tsc --noEmit
app.ts(9,1): error TS2322: Type 'string' is not assignable to type 'number'.
~~~

[[count]] اتحدد number من [[0]]، فالاستنتاج بيحميك بالظبط زي ما لو كنت كتبت [[: number]] بإيدك.

---

## ٦. الحالة اللي الاستنتاج بيضعف فيها: array فاضية

~~~text app.ts
const items = [];
items.push(1);
~~~

[[items]] عند التعريف نوعها [[any[]]] (TS مش عارف هتتملي بإيه)، وبعد الـ push بقت [[number[]]]. النوع بيتغير مع الكود، وأي push لنوع تاني هيعدّي. اكتبها صريحة: [[const items: number[] = []]].

---

## الخلاصة

| الكود | النوع المستنتج | ليه |
|---|---|---|
| [[let count = 0]] | [[number]] | من القيمة |
| [[const method = "GET"]] | [["GET"]] | const مش هيتغير |
| [[let status = "idle"]] | [[string]] | let اتوسّع |
| [[ids.map((id) => ...)]] | [[id: number]] | من السياق |
| [[function toUpper(s: string)]] | بترجّع [[string]] | من الـ return |

اكتب النوع في الـ parameters وفي البدايات الفاضية (array فاضية أو [[null]])، وسيب الباقي للاستنتاج.`,
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
          teach: R`## المثال بيعمل إيه؟

٣ دوال، كل واحدة بتورّي حاجة: دالة بتاخد دالة تانية (callback)، ودالة فيها parameters اختيارية، ودالة بتاخد أي عدد arguments. كله اتفحص بـ TypeScript 6.0.3 واتشغّل بـ [[tsx]]، و TS 7 طلّع نفس الأخطاء.

---

## ١. نوع للدالة نفسها: [[type Handler]]

~~~text app.ts
type Handler = (id: string) => void;
~~~

- [[type Handler =]]: بنسمّي نوع باسم، عشان نستخدمه بعدين بدل ما نكرره.
- [[(id: string) => void]]: ده **شكل دالة**: بتاخد parameter واحد string، و [[=>]] وبعدها نوع اللي بترجّعه.
- [[void]]: «مبترجعش حاجة تهمّك».

خلي بالك: [[=>]] هنا جوه نوع، مش arrow function حقيقية. هي بتوصف دالة، مش بتعمل واحدة.

---

## ٢. دالة بتاخد callback

~~~text app.ts
function onEach(ids: string[], cb: Handler): void {
  ids.forEach(cb);
}
~~~

- [[cb: Handler]]: الـ parameter التاني نوعه دالة بالشكل اللي فوق. [[cb]] اختصار callback: دالة بتبعتها لدالة تانية تناديها.
- [[ids.forEach(cb)]]: نادي [[cb]] على كل عنصر.

حاجة غريبة هنا: [[forEach]] بتبعت **٣** حاجات مش واحدة. جرّبناها:

~~~text الناتج: ["a","b"].forEach((...args) => console.log(args))
[ 'a', 0, [ 'a', 'b' ] ]
[ 'b', 1, [ 'a', 'b' ] ]
~~~

العنصر، ورقمه، والـ array كلها. و [[Handler]] بياخد واحدة بس، ومع كده مفيش خطأ: **دالة بتاخد parameters أقل من المبعوت مقبولة**، لأن JS بيتجاهل الزيادة.

والعكس مرفوض. لو بعت دالة مستنية number:

~~~text الناتج: onEach(["a"], (id: number) => {})
error TS2345: Argument of type '(id: number) => void' is not assignable to parameter of type 'Handler'.
  Types of parameters 'id' and 'id' are incompatible.
    Type 'string' is not assignable to type 'number'.
~~~

الرسالة بتنزل خطوة خطوة: الدالة مش ماشية مع [[Handler]]، ليه؟ الـ [[id]] مختلف، ليه؟ string مش number.

---

## ٣. parameters اختيارية

~~~text app.ts
function paginate(page: number, size = 20, sort?: "asc" | "desc") {
  return { skip: (page - 1) * size, take: size, sort: sort ?? "desc" };
}
~~~

### [[size = 20]]: قيمة افتراضية

لو محدش بعت [[size]]، قيمته 20. ومفيش نوع مكتوب: TS استنتج number من الـ 20. وجوه الدالة نوعه [[number]] بس، مش ممكن يبقى undefined.

### [[sort?: "asc" | "desc"]]: اختياري

- [[?]] بعد الاسم: الـ parameter ده ممكن ميتبعتش.
- [[|]] معناها «أو»: يا [["asc"]] يا [["desc"]] بالظبط (union، ليه درس).
- جوه الدالة نوعه [["asc" | "desc" | undefined]]، لأنه ممكن ميتبعتش. لو كتبت [[sort.toUpperCase()]] على طول: [[TS18048: 'sort' is possibly 'undefined']].

### [[sort ?? "desc"]]

[[??]] معناها «لو اللي على الشمال null أو undefined، خُد اللي على اليمين». فـ sort في الناتج دايمًا قيمة.

### الحساب

[[skip: (page - 1) * size]]: عدد العناصر اللي هنعدّيها. الصفحة 2 بحجم 20 يبقى نعدّي 20.

~~~text الناتج: paginate(2) و paginate(1, 10, "asc")
{ skip: 20, take: 20, sort: 'desc' } { skip: 0, take: 10, sort: 'asc' }
~~~

والنوع اللي TS استنتجه للدالة كلها:

~~~text النوع
function paginate(page: number, size?: number, sort?: "asc" | "desc" | undefined): { skip: number; take: number; sort: "asc" | "desc"; }
~~~

لاحظ: [[size?]] من برّه اختياري، و [[sort]] في الناتج من غير undefined بفضل [[??]].

وقاعدة: الاختياري لازم بعد الإجباري. [[function bad(a?: number, b: number)]] بتطلّع [[TS1016: A required parameter cannot follow an optional parameter.]]

---

## ٤. rest: أي عدد arguments

~~~text app.ts
function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}
~~~

- [[...nums]]: التلات نقط قبل الاسم معناها «لم كل الـ arguments في array». فـ [[sum(1, 2, 3)]] جواها [[nums]] = [[[1, 2, 3]]].
- نوعه لازم array: [[number[]]].
- [[reduce((a, b) => a + b, 0)]]: ابدأ من 0، وكل مرة [[a]] المجموع لحد دلوقتي و [[b]] العنصر الجاي.

~~~text الناتج: sum(1, 2, 3) و sum()
6 0
~~~

---

## ٥. النداءات

~~~text app.ts
onEach(["a", "b"], (id) => console.log(id));
paginate(2);
sum(1, 2, 3); // 6
~~~

في الأول، [[id]] مكتوبلوش نوع، وعرف إنه string من [[Handler]] (contextual typing). والناتج:

~~~text الناتج
a
b
~~~

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[(id: string) => void]] | نوع دالة بتاخد string ومبترجعش حاجة مهمة |
| [[size = 20]] | اختياري، وجوه الدالة number بس |
| [[sort?: T]] | اختياري، وجوه الدالة [[T | undefined]] |
| [[...nums: number[]]] | أي عدد، بيتجمعوا في array |

والدالة اللي parameters بتاعتها أقل من المطلوب مقبولة كـ callback، والعكس لأ.`,
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
          teach: R`## المثال بيعمل إيه؟

بيعرّف ٣ أنواع ليستات: array عادية (أي طول، نوع واحد)، و tuple (طول ثابت، وكل مكان بنوعه)، و readonly (متتعدلش). وفي الآخر ٣ غلطات تورّيك كل نوع بيحميك من إيه. اتفحص بـ TypeScript 6.0.3 (و 7.0.2 نفس الأخطاء)، واتشغّل بـ [[tsx]].

---

## ١. array عادية: شكلين لنفس النوع

~~~text app.ts
const tags: string[] = ["ts", "react"];
const scores: Array<number> = [90, 75];
~~~

- [[string[]]]: «ليستة strings». القوسين [ ] بعد أي نوع معناهم ليستة منه.
- [[Array<number>]]: نفس الكلام بشكل تاني. [[< >]] هنا معناها «النوع اللي جوه»، وده اسمه generic (ليه درس). [[Array<number>]] و [[number[]]] نوع واحد بالظبط.

الطول مش جزء من النوع: الليستة ممكن تبقى فاضية أو فيها ألف عنصر.

---

## ٢. tuple: الطول والترتيب جزء من النوع

~~~text app.ts
const point: [number, number] = [30.04, 31.23];
const entry: [name: string, age: number] = ["sara", 27];
~~~

- [[[number, number]]]: الأقواس دي حوالين **أنواع مفصولة بفاصلة**، مش بعد نوع. معناها «عنصرين بالظبط، الاتنين أرقام» (هنا خط العرض وخط الطول).
- [[[name: string, age: number]]]: نفس الفكرة بأسماء للأماكن. الأسماء بتظهر في المحرر للتوضيح بس، ومش بتأثر على أي حاجة.

وقت التشغيل الـ tuple ده array عادي جدًا، الفرق كله في الفحص.

---

## ٣. destructuring

~~~text app.ts
const [name, age] = entry;
~~~

الأقواس على **شمال** [[=]] معناها «فك الـ array»: أول عنصر في [[name]] والتاني في [[age]]. ولأن [[entry]] tuple، TS عارف نوع كل واحد:

~~~text الأنواع
name: string
age: number
~~~

ده بالظبط اللي بيحصل في [[const [count, setCount] = useState(0)]] في React: [[useState]] بترجّع tuple.

---

## ٤. readonly

~~~text app.ts
const roles: readonly string[] = ["admin", "user"];
~~~

[[readonly]] قبل النوع بتشيل من النوع كل الـ methods اللي بتعدّل الليستة: [[push]] و [[pop]] و [[sort]] و [[splice]]. القراية ([[roles[0]]] و [[map]] و [[filter]]) عادي.

> [[const]] بيمنع إنك تحط ليستة تانية في المتغير. [[readonly]] بيمنع إنك تعدّل الليستة نفسها. حاجتين مختلفين.

---

## ٥. الغلطات التلاتة

~~~text app.ts
tags.push(5);
roles.push("owner");
const third = point[2];
~~~

~~~text الناتج: npx tsc --noEmit
app.ts(7,11): error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
app.ts(8,7): error TS2339: Property 'push' does not exist on type 'readonly string[]'.
app.ts(9,21): error TS2493: Tuple type '[number, number]' of length '2' has no element at index '2'.
~~~

| الخطأ | السبب |
|---|---|
| [[TS2345]] | [[tags]] ليستة strings، و 5 رقم |
| [[TS2339]] | «الخاصية دي مش موجودة على النوع»: [[readonly]] شال [[push]] |
| [[TS2493]] | الـ tuple طوله 2، فالأماكن [[0]] و [[1]] بس (العد من صفر) |

ولو شغّلت الكود (من غير الغلطات) القيم عادية:

~~~text الناتج: console.log(tags, scores, point, entry, name, age, roles, point.length)
[ 'ts', 'react' ] [ 90, 75 ] [ 30.04, 31.23 ] [ 'sara', 27 ] sara 27 [ 'admin', 'user' ] 2
~~~

والـ tuple في الناتج شكله array عادي، لأن الأنواع بتتمسح.

---

## الخلاصة

| النوع | الطول | الأنواع | التعديل |
|---|---|---|---|
| [[string[]]] أو [[Array<string>]] | أي طول | نوع واحد | مسموح |
| [[[number, string]]] | ثابت | كل مكان بنوعه | مسموح |
| [[readonly string[]]] | أي طول | نوع واحد | ممنوع |

- القوسين **بعد** نوع = array. القوسين **حوالين** أنواع = tuple.
- في union لازم أقواس: [[(string | number)[]]] مش [[string | number[]]].`,
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
    }
  ]
});
