// تكملة تاب vscode: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vscode/01.js (شرح حقول الدرس في أوله)
MORE("vscode", [
    {
      t: "البحث في المشروع كله",
      l: 2,
      n: "لاقي أي نص في أي ملف، وغيّره في كل الملفات مرة واحدة وانت شايف كل تغيير",
      items: [
        {
          cmd: "Ctrl+Shift+F",
          title: "دوّر على نص في كل ملفات المشروع",
          desc: R`Ctrl+Shift+F بيدوّر في كل ملفات المشروع ويعرض النتايج متقسمة بالملف. جنب الخانة ٣ أزرار: Aa للحروف الكبيرة والصغيرة (Alt+C)، و ab للكلمة كاملة (Alt+W)، و [[.*]] للـ regex (Alt+R).

والتلات نقط تحت بتفتح «files to include» و «files to exclude»: [[src/**/*.ts]] أو [[apps/api]] تحصر البحث، و [[**/*.test.ts]] تشيل الاختبارات.`,
          example: R`Ctrl+Shift+F           Win / Linux: search in files
Cmd+Shift+F            Mac
Alt+C / Alt+W / Alt+R  match case / whole word / regex (Cmd+Option+C / W / R)
Ctrl+Shift+J           show the include / exclude boxes (Cmd+Shift+J)
include: src/**/*.ts   only TypeScript files under src
exclude: **/*.test.ts  skip test files
F4 / Shift+F4          next / previous result`,
          try: R`دوّر في مشروعك بالـ regex [[process\.env\.(\w+)]] وشوف كل متغيرات البيئة اللي الكود بيقراها، وقارنها بـ [[.env.example]].`,
          flag: "keys",
          deep: {
            why: "«الـ endpoint ده بيتنادي منين؟» «مين بيستخدم المتغير ده؟» Ctrl+F بيدوّر في ملف واحد، وانت محتاج المشروع كله.",
            how: R`البحث بيستخدم ripgrep من تحت، فسريع حتى في مشاريع كبيرة. وبيحترم [[.gitignore]] و [[search.exclude]] لوحده (الترس الصغير في خانة exclude اسمه Use Exclude Settings and Ignore Files)، عشان كده node_modules مش بتظهر. لو عايز تدوّر جوه مكتبة، اقفل الترس ده.

الـ include بيقبل أكتر من pattern بفاصلة. وكليك يمين على فولدر في شجرة الملفات ثم Find in Folder بيملى الـ include لوحده.

Open in Editor (فوق النتايج) بيحطها في ملف Search Editor تحتفظ بيه وتدوّر فيه.`,
            when: "قبل ما تغيّر أي حاجة مشتركة، ولما تدوّر على مصدر رسالة error ظاهرة للمستخدم.",
            mistakes: "تدوّر على اسم دالة بالنص وتفتكر ده كل الاستخدامات، وهي ممكن تكون متنادية بإسم تاني بعد import. للكود نفسه Shift+F12 أدق. وتنسى إن الـ exclude شغال فتقول «مش موجود» وهو في ملف متجاهل."
          },
          teach: R`## الفكرة في سطر

Ctrl+Shift+F بيدوّر على نص في **كل ملفات المشروع** مرة واحدة، والنتايج بتتجمع تحت اسم كل ملف. نفك سطور المثال، وبعدين نجرب الـ regex بتاع التجربة.

---

## ١. افتح البحث

~~~text
Ctrl+Shift+F           Win / Linux: search in files
Cmd+Shift+F            Mac
~~~

الـ F من Find. بيفتح قسم Search في الشريط الجانبي والمؤشر في خانة البحث. ولو كنت محدد كلمة في الكود، بتتكتب في الخانة لوحدها.

---

## ٢. التلات أزرار جنب الخانة

~~~text
Alt+C / Alt+W / Alt+R  match case / whole word / regex (Cmd+Option+C / W / R)
~~~

| الزرار | الاختصار | معناه |
|---|---|---|
| Aa | Alt+C | **C**ase: فرّق بين الكابيتال والصغير |
| ab | Alt+W | **W**hole word: الكلمة كاملة بس |
| [[.*]] | Alt+R | **R**egex: الخانة بقت pattern مش نص حرفي |

مثال على ملف تجربة فيه السطرين دول:

~~~text src/config.js
const port = process.env.PORT || 3000;
console.log("server on", port);
~~~

- البحث عن [[PORT]] من غير Aa بيلاقي السطرين (لأن [[port]] الصغيرة كمان تطابق).
- مع Aa بيلاقي السطر الأول بس.
- البحث عن [[port]] مع ab بيلاقي [[port]] الكلمة، ومش هيلاقي [[export]] أو [[portal]] لو موجودين.

---

## ٣. include و exclude

~~~text
Ctrl+Shift+J           show the include / exclude boxes (Cmd+Shift+J)
include: src/**/*.ts   only TypeScript files under src
exclude: **/*.test.ts  skip test files
~~~

Ctrl+Shift+J (أو التلات نقط تحت الخانة) بيظهر خانتين:

- **files to include**: دوّر هنا بس.
- **files to exclude**: متدوّرش هنا.

والقيم **glob patterns** (أنماط أسامي ملفات):

| الجزء | معناه |
|---|---|
| [[src/]] | جوه فولدر src |
| [[**/]] | أي عدد فولدرات جوه بعض (ولا فولدر، أو واحد، أو عشرة) |
| [[*.ts]] | أي اسم بيخلص بـ .ts |
| [[*.test.ts]] | أي اسم بيخلص بـ .test.ts |

فـ [[src/**/*.ts]] = «أي ملف .ts في src أو أي فولدر جواها».

---

## ٤. اتنقل بين النتايج

~~~text
F4 / Shift+F4          next / previous result
~~~

F4 بيفتح النتيجة الجاية في المحرر، و Shift+F4 اللي قبلها، من غير ما تدوس على اللستة.

---

## التجربة: [[process\.env\.(\w+)]]

فعّل الـ regex (Alt+R)، والـ pattern ده بيتقري كده:

| الجزء | معناه |
|---|---|
| [[process]] | الكلمة دي حرفيًا |
| [[\.]] | نقطة حقيقية. النقطة لوحدها في regex معناها «أي حرف»، والـ backslash بيخليها نقطة عادية |
| [[env\.]] | الكلمة env وبعدها نقطة |
| [[\w+]] | [[\w]] = حرف أو رقم أو [[_]]، و [[+]] = مرة أو أكتر. يعني اسم المتغير |
| [[( )]] | بيمسك الجزء ده لوحده (group)، ومهم في الاستبدال (الدرس الجاي) |

VS Code بيستخدم من تحت برنامج اسمه **ripgrep** ([[rg]]) جاي معاه. شغلت نفس الـ regex بالـ [[rg.exe]] اللي جوه VS Code 1.140 (ripgrep 15.0.0) على ويندوز 11، على ملف فيه ٤ طرق لقراية متغيرات البيئة:

~~~text src/config.js
const port = process.env.PORT || 3000;
const db = process.env.DATABASE_URL;
const { JWT_SECRET } = process.env;
const key = process.env["API_KEY"];
~~~

~~~text الناتج
demo\src\config.js:1:const port = process.env.PORT || 3000;
demo\src\config.js:2:const db = process.env.DATABASE_URL;
~~~

لاحظ إنه مسك سطرين بس من أربعة: [[JWT_SECRET]] (destructuring) و [[API_KEY]] (بالأقواس المربعة) مش بالشكل اللي الـ regex بيدوّر عليه. فالـ regex بيلاقي الشكل اللي انت كتبته، مش «كل متغيرات البيئة».

---

## ليه node_modules مش بتظهر؟

البحث بيحترم [[.gitignore]] و [[search.exclude]] (الافتراضي فيه [[**/node_modules]]). الترس الصغير في خانة exclude اسمه **Use Exclude Settings and Ignore Files**، ولو قفلته بيدوّر في كل حاجة.

---

## الخلاصة

| عايز | ويندوز / لينكس | ماك |
|---|---|---|
| دوّر في المشروع | Ctrl+Shift+F | Cmd+Shift+F |
| حروف كبيرة وصغيرة / كلمة / regex | Alt+C / Alt+W / Alt+R | Cmd+Option+C / W / R |
| خانات include و exclude | Ctrl+Shift+J | Cmd+Shift+J |
| النتيجة الجاية / اللي قبلها | F4 / Shift+F4 | F4 / Shift+F4 |`,
          sol: R`فعّل الـ regex (Alt+R أو زرار [[.*]])، والـ regex [[process\.env\.(\w+)]] هيطلع كل سطر فيه [[process.env.SOMETHING]] مجمّع حسب الملف، وفوق مكتوب العدد زي «23 results in 9 files». قارن الأسامي بـ [[.env.example]]: أي اسم في الكود ومش في الملف ده يبقى ناقص من التوثيق، وأي اسم في الملف ومش في الكود ممكن يبقى قديم.

لو طلعت نتايج من [[node_modules]]، يبقى الـ search.exclude أو [[.gitignore]] متعطل (زرار «Use Exclude Settings and Ignore Files» في خانة files to exclude لازم يبقى مفعّل). ولو مفيش نتايج خالص، اتأكد إن الـ regex مفعّل، لأن من غيره هيدوّر على النص حرفيًا بالـ backslash. وممكن تلاقي كمان وصول بالأقواس المربعة بدل النقطة أو destructuring زي [[const { PORT } = process.env]]، والـ regex ده مش هيمسكهم.`
        },
        {
          cmd: "Ctrl+Shift+H",
          title: "استبدل نص في كل الملفات وانت شايف كل تغيير",
          desc: R`Ctrl+Shift+H بيفتح البحث مع خانة الاستبدال. قبل Replace All، الكليك على أي نتيجة بيفتح diff يوريك السطر قبل وبعد، وتقدر تشيل ملف أو نتيجة معينة من الاستبدال بالـ X جنبها.

ومع regex، الأقواس بتمسك أجزاء وتستخدمها في الاستبدال بـ [[$1]] و [[$2]].`,
          example: R`Ctrl+Shift+H                     Win / Linux: replace in files
Cmd+Shift+H                      Mac
find:    console\.log\((.*)\);   (regex on)
replace: logger.debug($1);
AB button                        Preserve Case (User -> Customer, user -> customer)`,
          try: R`على branch جديد: غيّر كل [[console.log(]] في src لـ [[logger.debug(]] بـ regex و [[$1]]، وراجع ٣ نتايج بالـ diff قبل Replace All، وبعدين [[git diff]].`,
          flag: "keys",
          deep: {
            why: "تغيير اسم route أو رسالة أو مسار import في ٤٠ ملف. بإيدك هتنسى ملف، و sed في الترمنال مش بيوريك قبل ما يغيّر.",
            how: R`[[$1]] هو اللي اتمسك في أول قوس، و [[$0]] الـ match كله. وزرار AB جنب خانة الاستبدال (Preserve Case) بيحافظ على حالة الحروف: [[User]] تبقى [[Customer]] و [[user]] تبقى [[customer]].

الاستبدال بيحصل على الملفات فعلًا، عشان كده اعمله على branch نضيف: [[git diff]] بعده بيوريك كل اللي اتغير، و [[git restore .]] بيرجّعه لو غلط.`,
            when: "تغيير نصوص مش أسماء في الكود: رسايل، ومسارات، و classes في CSS، أو pattern متكرر.",
            mistakes: "تستخدمه عشان تغيّر اسم دالة أو type، فيغيّر نفس الكلمة في كومنت أو string ملهاش علاقة: للأسماء F2. وتنسى تفعّل regex فـ [[.]] و [[(]] يتعاملوا كحروف عادية أو العكس. واستبدال كبير على شغل مش متعمله commit: لو غلط، مفيش حاجة ترجعلها."
          },
          teach: R`## الفكرة في سطر

Ctrl+Shift+H هو نفس البحث في المشروع، بس معاه خانة **Replace** (استبدال)، وبيوريك كل تغيير قبل ما يحصل. (و Ctrl+H من غير Shift هو Replace في الملف المفتوح بس). نفك المثال.

---

## ١. افتح الاستبدال

~~~text
Ctrl+Shift+H                     Win / Linux: replace in files
Cmd+Shift+H                      Mac
~~~

بيفتح Search وتحت خانة البحث خانة تانية للنص الجديد.

---

## ٢. خانة البحث: regex بـ group

~~~text
find:    console\.log\((.*)\);   (regex on)
~~~

الـ regex متفعّل (Alt+R). نفكه:

| الجزء | معناه |
|---|---|
| [[console\.log]] | console.log، والنقطة حقيقية بسبب الـ backslash |
| [[\(]] | قوس [[(]] حقيقي. القوس لوحده في regex بيعمل group، فالـ backslash بيخليه حرف عادي |
| [[(.*)]] | **group**: [[.]] أي حرف، و [[*]] أي عدد. يعني «امسك اللي بين القوسين» |
| [[\);]] | قوس [[)]] حقيقي وبعده [[;]] |

---

## ٣. خانة الاستبدال: [[$1]]

~~~text
replace: logger.debug($1);
~~~

[[$1]] معناها «حط هنا اللي اتمسك في أول group». يعني اللي كان بين قوسين console.log هيتنقل زي ما هو جوه logger.debug. و [[$0]] معناها الـ match كله.

جربت نفس الـ regex ونفس الاستبدال بـ JavaScript ([[replace]] بيستخدم نفس [[$1]]) على ملف فيه:

~~~text قبل
console.log("server on", port);
console.log(
  "multi line"
);
~~~

~~~text الناتج
logger.debug("server on", port);
console.log(
  "multi line"
);
~~~

السطر الأول اتغير. التاني **متغيرش**: [[.]] مش بتعدّي على سطر جديد، فـ console.log اللي على كذا سطر مش هيتمسك. عشان كده بعد الاستبدال دوّر تاني على [[console.log(]] من غير regex.

---

## ٤. Preserve Case

~~~text
AB button                        Preserve Case (User -> Customer, user -> customer)
~~~

زرار AB جنب خانة الاستبدال. لو مفعّل، الاستبدال بيحافظ على شكل الحروف:

| الأصلي | بيبقى |
|---|---|
| [[user]] | [[customer]] |
| [[User]] | [[Customer]] |
| [[USER]] | [[CUSTOMER]] |

---

## راجع قبل ما تستبدل

- كل نتيجة في اللستة بيظهر فيها القديم مشطوب والجديد جنبه.
- الكليك على نتيجة بيفتح **diff** للملف: قبل وبعد.
- الـ X جنب نتيجة أو ملف بيشيله من الاستبدال.
- **Replace All** (الزرار جنب خانة replace) بيغيّر الملفات فعلًا، وبعدها [[git diff]] بيوريك كل اللي اتغير.

---

## الخلاصة

~~~text
Ctrl+Shift+H     بحث واستبدال في المشروع (Cmd+Shift+H)
( )  في البحث    امسك جزء
$1   في الاستبدال حط الجزء ده
AB               حافظ على شكل الحروف
~~~

اعمل الاستبدال الكبير على branch نضيف، ولأسماء الدوال استخدم F2.`,
          sol: R`بعد ما تكتب find و replace والـ regex متفعّل، كل نتيجة هتظهر بالقديم مشطوب بالأحمر والجديد بالأخضر. دوس على نتيجة يفتحلك diff كامل للملف. بعد Replace All (الزرار جنب خانة replace) هيسألك تأكيد بعدد الملفات، و [[git diff]] هيوريك كل [[console.log(x);]] بقت [[logger.debug(x);]]، والـ [[$1]] اتبدلت بالمحتوى اللي بين القوسين.

الـ regex ده مش هيمسك سطر من غير [[;]] في الآخر، ولا [[console.log]] على أكتر من سطر، فهيفضل شوية. دوّر تاني بـ [[console.log(]] من غير regex تتأكد. وافتكر إن الملفات اللي اتغيرت لازم يبقى فيها [[import]] لـ logger، وده مش هيحصل لوحده، والـ build هيطلع error لو نسيته.`
        }
      ]
    },
    {
      t: "افهم الكود وغيّره بأمان",
      l: 2,
      n: "التعريف والاستخدامات والـ rename والـ auto import، كلها من الـ language server مش من بحث نصي",
      items: [
        {
          cmd: "F12",
          title: "روح لمكان تعريف الدالة أو المتغير",
          desc: R`F12 على أي اسم بيفتح المكان اللي اتعرّف فيه، حتى لو في ملف تاني أو type جوه مكتبة. Ctrl+Click نفس الحكاية بالماوس. و Alt+F12 (Peek) بيعرض التعريف في شباك صغير جوه نفس الملف من غير ما تسيب مكانك.

وترجع للي كنت فيه بـ Alt+Left.`,
          example: R`F12                    go to definition (all systems)
Ctrl+Click             the same with the mouse (Cmd+Click on Mac)
Alt+F12                peek in place (Windows; Option+F12 on Mac)
Ctrl+Shift+F10         peek on Linux
Ctrl+K F12             open the definition in a split (Cmd+K F12)
Esc                    close the peek window`,
          try: "في route handler، اعمل F12 على الـ service اللي بيناديه، وبعدين Alt+F12 على type من Prisma أو Express وشوف شكله من غير ما تسيب الملف.",
          flag: "keys",
          deep: {
            why: "قراية كود مش بتاعك سلسلة «الدالة دي بتعمل إيه؟». البحث بالنص بيجيب كل مكان الاسم اتكتب فيه، F12 بيجيب التعريف بس.",
            how: R`الـ language server (TypeScript مثلًا) فاهم الـ imports، فبيعرف إن [[getUser]] هنا جاية من [[../services/user]] حتى لو اتغير اسمها في الـ import. لو جاية من مكتبة، هيفتحلك ملف [[.d.ts]] فيه الـ types، مش الكود الحقيقي.

Peek بيفتح شباك جوه الملف وتقدر تعدّل فيه على طول. وعلى لابتوب، F12 ممكن يحتاج Fn، أو يكون مربوط بالصوت أو الإضاءة.`,
            when: "كل ما تشوف اسم مش فاهمه.",
            mistakes: "F12 مش بيعمل حاجة لأن الملف مش جزء من المشروع اللي الـ language server شايفه: فتحت ملف لوحده من غير الفولدر، أو tsconfig مش شامله. افتح الفولدر كله بـ [[code .]]. ولو وصلت لـ [[.d.ts]] وعايز الكود نفسه: Go to Source Definition من Command Palette."
          },
          teach: R`## الفكرة في سطر

F12 على أي اسم بيوديك لمكان **تعريفه**، حتى لو في ملف تاني. والباقي في المثال طرق تانية لنفس الحاجة: بالماوس، أو في شباك صغير، أو جنب. نفكهم.

---

## ١. F12

~~~text
F12                    go to definition (all systems)
~~~

الأمر اسمه **Go to Definition**. خد الملفين دول:

~~~text services/user.ts
export function getUser(id: number) {
  return { id, name: "Ali" };
}
~~~

~~~text routes/users.ts
import { getUser } from "../services/user";

export function show(id: number) {
  const user = getUser(id);
  return user;
}
~~~

المؤشر على [[getUser]] في سطر 4 من [[routes/users.ts]]، و F12. سألت نفس محرك TypeScript اللي VS Code بيستخدمه (TypeScript 5.9 من Node على ويندوز 11) عن التعريف، فرد:

~~~text الناتج
services/user.ts 1:17
~~~

يعني الملف [[services/user.ts]]، سطر 1، عمود 17: أول حرف في كلمة [[getUser]] بعد [[export function]]. وده المكان اللي F12 بيفتحه.

الإجابة دي جاية من الـ **language server** اللي فاهم الـ imports، مش من بحث نصي.

---

## ٢. Ctrl+Click

~~~text
Ctrl+Click             the same with the mouse (Cmd+Click on Mac)
~~~

امسك Ctrl والاسم بيبقى عليه خط زي اللينك، والكليك بيعمل نفس F12.

---

## ٣. Peek: بص من غير ما تتحرك

~~~text
Alt+F12                peek in place (Windows; Option+F12 on Mac)
Ctrl+Shift+F10         peek on Linux
~~~

**Peek** يعني «بصّة». بدل ما يفتح الملف التاني، بيفتح شباك صغير جوه الملف الحالي تحت السطر، فيه التعريف. تقدر تقرا وتعدّل فيه، وانت لسه في مكانك. على لينكس الاختصار مختلف: Ctrl+Shift+F10 (من جدول لينكس الرسمي).

---

## ٤. افتحه جنب

~~~text
Ctrl+K F12             open the definition in a split (Cmd+K F12)
~~~

chord: Ctrl+K وتسيب، وبعدين F12. بيفتح التعريف في جزء جديد جنب الملف، فتشوف الاتنين.

---

## ٥. اقفل الـ peek

~~~text
Esc                    close the peek window
~~~

---

## لو الاسم من مكتبة؟

F12 بيفتح ملف [[.d.ts]]: ملف فيه الـ **types** بس (شكل الدوال)، مش الكود الحقيقي. ولو عايز الكود: Go to Source Definition من الـ Command Palette.

---

## الخلاصة

| عايز | ويندوز | لينكس | ماك |
|---|---|---|---|
| روح للتعريف | F12 | F12 | F12 |
| بالماوس | Ctrl+Click | Ctrl+Click | Cmd+Click |
| Peek | Alt+F12 | Ctrl+Shift+F10 | Option+F12 |
| جنب | Ctrl+K F12 | Ctrl+K F12 | Cmd+K F12 |

وترجع مكانك بـ Alt+Left. وعلى اللابتوب ممكن تحتاج Fn+F12.`,
          sol: R`F12 على اسم الـ service هيفتح ملفه والمؤشر على تعريف الدالة. Alt+F12 على type زي [[Request]] من Express هيفتح نافذة صغيرة جوه الملف الحالي فيها التعريف من [[node_modules/@types/express-serve-static-core/index.d.ts]]، وعلى type من Prisma هيوريك ملف الـ client المتولد. Esc يقفل النافذة وانت لسه في مكانك.

لو F12 قال «No definition found»، يبقى الـ TypeScript server لسه بيحمّل، أو الـ import مكسور، أو الـ types مش متسطبة (زي [[@types/express]]). ولو F12 على اسم فتح ملف [[.d.ts]] بدل الكود الحقيقي، ده طبيعي للمكتبات. جرّب «Go to Source Definition» من كليك يمين. وعلى اللابتوب F12 ممكن يبقى زرار صوت أو سطوع، استخدم Fn+F12.`
        },
        {
          cmd: "Shift+F12",
          title: "شوف كل الأماكن اللي بتستخدم الدالة دي",
          desc: R`Shift+F12 بيعرض كل الأماكن اللي الاسم ده متستخدم فيها في المشروع، في شباك peek فيه لستة الملفات. قبل ما تغيّر شكل دالة أو تمسحها، اعرف مين بيكلّمها.

و Ctrl+F12 بيروح للـ implementation: لو واقف على interface أو abstract method، بيوديك للكلاسات اللي عاملاها فعلًا.`,
          example: R`Shift+F12              references in a peek window (all systems)
Shift+Alt+F12          the same list in the side panel (Shift+Option+F12)
Ctrl+F12               go to implementation (Cmd+F12 on Mac)`,
          try: "اختار دالة في utils واعمل Shift+F12. لو ملهاش استخدامات، غالبًا كود ميت ممكن يتشال.",
          flag: "keys",
          deep: {
            why: "«هغيّر الـ parameter ده، مين هيتكسر؟» البحث النصي بيجيب كومنتات وأسامي شبهها. الـ references بتجيب الاستخدام الحقيقي بس.",
            how: R`اللستة جاية من الـ language server، فبتلاقي الاستخدامات حتى لو الاسم اتغير في الـ import ([[import { getUser as fetchUser }]])، وفي كل الملفات اللي الـ tsconfig شاملها.

السطر الصغير «3 references» فوق الدالة (CodeLens) نفس المعلومة، وبيتفعّل في TypeScript و JavaScript بـ [[js/ts.referencesCodeLens.enabled]] (الاسم القديم [[typescript.referencesCodeLens.enabled]] لسه شغال بس deprecated).`,
            when: "قبل أي تغيير في شكل دالة، أو قبل مسحها، أو عشان تفهم الكود بيتدفق إزاي.",
            mistakes: "تعتمد عليه في كود بيتنادي بالنص (اسم route في string، أو property بإسم جاي من متغير، أو template مش TS): الـ language server مش شايف ده. كمّل بـ Ctrl+Shift+F."
          },
          teach: R`## الفكرة في سطر

Shift+F12 بيعرض **كل الأماكن** اللي بتستخدم الاسم ده في المشروع. وده عكس F12: F12 بيروح للتعريف، و Shift+F12 بيجيب مين بيستخدمه. نفك المثال.

---

## ١. Shift+F12

~~~text
Shift+F12              references in a peek window (all systems)
~~~

**references** يعني «الإشارات»: كل مكان الاسم ده اتذكر فيه **ككود**. خد ٣ ملفات:

~~~text services/user.ts
export function getUser(id: number) { ... }
~~~

~~~text routes/users.ts
import { getUser } from "../services/user";
export function show(id: number) {
  const user = getUser(id);
  // getUser is called here
  return user;
}
~~~

~~~text routes/admin.ts
import { getUser as fetchUser } from "../services/user";
export const admin = fetchUser(1);
const label = "getUser";
~~~

سألت محرك TypeScript (5.9، من Node على ويندوز 11) عن الـ references لـ [[getUser]]، فرجّع:

~~~text الناتج
routes/users.ts 1:10 (definition)
routes/users.ts 4:16
services/user.ts 1:17 (definition)
routes/admin.ts 1:10
routes/admin.ts 1:21 (definition)
routes/admin.ts 3:22
~~~

اقراه كده:

| السطر | ده إيه |
|---|---|
| [[services/user.ts 1:17]] | التعريف الأصلي |
| [[routes/users.ts 1:10]] | الـ import |
| [[routes/users.ts 4:16]] | الاستدعاء [[getUser(id)]] |
| [[routes/admin.ts 1:10]] | الـ import |
| [[routes/admin.ts 1:21]] | الاسم الجديد [[fetchUser]] |
| [[routes/admin.ts 3:22]] | الاستدعاء [[fetchUser(1)]]، **باسم تاني** |

ولاحظ اللي **مش** موجود: الكومنت [[// getUser is called here]]، والـ string [["getUser"]]. ده الفرق عن Ctrl+Shift+F: البحث النصي كان هيجيبهم، ومكانش هيلاقي [[fetchUser(1)]].

---

## ٢. نفس اللستة في لوحة جانبية

~~~text
Shift+Alt+F12          the same list in the side panel (Shift+Option+F12)
~~~

بدل الـ peek اللي بيقفل لما تدوس Esc، اللستة بتتحط في لوحة References على الجنب وتفضل موجودة وانت شغال.

---

## ٣. Ctrl+F12: الـ implementation

~~~text
Ctrl+F12               go to implementation (Cmd+F12 on Mac)
~~~

**implementation** يعني «التنفيذ». لو واقف على **interface** (وصف لشكل حاجة من غير كود)، Ctrl+F12 بيوديك للـ classes اللي كتبت الكود الحقيقي ليه.

---

## الخلاصة

| عايز | ويندوز / لينكس | ماك |
|---|---|---|
| كل الاستخدامات (peek) | Shift+F12 | Shift+F12 |
| في لوحة جانبية | Shift+Alt+F12 | Shift+Option+F12 |
| الـ implementation | Ctrl+F12 | Cmd+F12 |

الاستخدام اللي جاي من string أو اسم متغير مش هيظهر هنا: كمّل بـ Ctrl+Shift+F.`,
          sol: R`Shift+F12 هيفتح peek فيه لستة بكل مكان بيستخدم الدالة، وفوق مكتوب العدد زي «3 references»، وتعريف الدالة نفسه ممكن يتحسب واحد منهم. لو ملهاش استخدامات غير التعريف، أو «No references found»، غالبًا كود ميت.

قبل ما تمسحها، اتأكد إنها مش مستخدمة بطرق Shift+F12 مش بيشوفها: اسم جاي من string (زي [[router[methodName](req, res)]])، أو export من مكتبة لمشاريع تانية، أو ملف JS مش داخل في [[tsconfig]]. دوّر باسمها في Ctrl+Shift+F كمان للتأكيد.`
        },
        {
          cmd: "F2",
          title: "غيّر اسم دالة أو متغير في كل المشروع بأمان",
          desc: R`F2 على أي اسم بيغيّره في تعريفه وفي كل استخداماته وفي الـ imports في كل الملفات، ومش بيلمس نفس الكلمة لو في string أو كومنت أو متغير تاني بنفس الاسم في مكان تاني. Ctrl+Enter (Cmd+Enter على الماك) بدل Enter بيوريك preview بالتغييرات قبل ما تتنفّذ.

ولو غيّرت اسم ملف أو نقلته من شجرة الملفات، VS Code بيعرض يعدّل الـ imports اللي بتشاور عليه.`,
          example: R`F2                     rename symbol (all systems)
Ctrl+Enter             preview every change first (Cmd+Enter on Mac)
Enter                  apply`,
          try: "غيّر اسم دالة مستخدمة في ٣ ملفات بـ F2، وبعدين [[git diff]] واتأكد إن مفيش حاجة تانية اتلمست.",
          flag: "keys",
          deep: {
            why: "Find و Replace بيغيّر النص في كل مكان، فبيبوّظ [[user]] في كومنت أو في property تانية. F2 فاهم الكود.",
            how: R`الـ language server عارف كل استخدام للاسم ده بالظبط (نفس اللي Shift+F12 بيجيبه)، فبيغيّرهم كلهم في عملية واحدة، و Ctrl+Z واحدة بترجّع الكل.

نقل الملفات: [[js/ts.updateImportsOnFileMove.enabled]] (كان اسمه [[typescript.updateImportsOnFileMove.enabled]]) قيمتها prompt افتراضيًا فبيسألك، وتقدر تخليها always.`,
            when: "أي تغيير لاسم في الكود. Find و Replace للنصوص بس.",
            mistakes: "تعمل rename لحاجة اسمها بيتقري من برا: field في API، أو column في الداتابيز، أو key في JSON متخزّن. F2 بيغيّر الكود، بس الـ client أو الداتا القديمة لسه بالاسم القديم. وفي ملفات JS من غير types الـ rename أضعف، فبص على الـ preview."
          },
          teach: R`## الفكرة في سطر

F2 على اسم بيغيّره في تعريفه وفي **كل استخداماته** في كل الملفات، ومش بيلمس نفس الكلمة لو في كومنت أو string. الأمر اسمه **Rename Symbol**. نفك المثال.

---

## ١. F2

~~~text
F2                     rename symbol (all systems)
~~~

بتظهر خانة صغيرة فوق الاسم فيها الاسم القديم متحدد، تكتب الجديد.

---

## ٢. Ctrl+Enter: شوف قبل ما يتنفّذ

~~~text
Ctrl+Enter             preview every change first (Cmd+Enter on Mac)
~~~

بدل Enter، **Ctrl+Enter** بيفتح لوحة **Refactor Preview**: لستة بكل ملف وكل سطر هيتغير، وتقدر تشيل علامة من أي تغيير مش عايزه، وبعدين Apply. (الاختصار ده من جدول الاختصارات الرسمي: الأمر [[acceptRenameInputWithPreview]] على [[ctrl+enter]]).

---

## ٣. Enter: نفّذ

~~~text
Enter                  apply
~~~

كل التغييرات بتحصل مرة واحدة، و Ctrl+Z واحدة بترجّعهم كلهم.

---

## إيه اللي بيتغير بالظبط؟

نفس الـ ٣ ملفات بتوع درس Shift+F12: [[getUser]] متعرّفة في [[services/user.ts]]، ومستخدمة في [[routes/users.ts]]، ومستوردة باسم تاني [[fetchUser]] في [[routes/admin.ts]]، ومكتوبة في كومنت وفي string.

سألت محرك TypeScript (5.9، من Node على ويندوز 11) عن الأماكن اللي F2 هيغيّرها لو بدأت من التعريف:

~~~text الناتج
services/user.ts 1:17
routes/admin.ts 1:10
routes/users.ts 1:10
routes/users.ts 4:16
~~~

| المكان | ده إيه |
|---|---|
| [[services/user.ts 1:17]] | التعريف |
| [[routes/admin.ts 1:10]] | اسم الـ import بس، و [[fetchUser]] زي ما هو |
| [[routes/users.ts 1:10]] | الـ import |
| [[routes/users.ts 4:16]] | الاستدعاء |

ومش في اللستة: الكومنت، والـ string [["getUser"]]، و [[fetchUser(1)]] (لأنه اسم تاني اتعمل في الـ import). فلو كتبت [[findUser]]، السطر في admin.ts هيبقى [[import { findUser as fetchUser }]] والباقي في الملف ده سليم.

> لو عملت F2 من مكان الاستخدام نفسه (مش التعريف)، VS Code ممكن يغيّر الاسم في الملف ده بس ويعمل import باسم تاني ([[getUser as newName]])، عشان الملفات التانية متتلمسش. ده بيتحكم فيه إعداد TypeScript اسمه useAliasesForRenames. فلو عايز تغيّر الاسم في المشروع كله، اعمل F2 من التعريف.

---

## نقل الملفات

لو غيّرت اسم ملف أو نقلته في شجرة الملفات، VS Code بيسألك يعدّل الـ imports اللي بتشاور عليه. الإعداد [[js/ts.updateImportsOnFileMove.enabled]] قيمته الافتراضية prompt (اسأل).

---

## الخلاصة

~~~text
F2            غيّر الاسم في كل المشروع
Ctrl+Enter    شوف كل التغييرات الأول (Cmd+Enter)
Enter         نفّذ
Ctrl+Z        رجّع الكل مرة واحدة
~~~

F2 للأسماء في الكود، و Ctrl+Shift+H للنصوص.`,
          sol: R`F2 على اسم الدالة هيطلع خانة صغيرة بالاسم القديم، اكتب الجديد و Enter. كل الاستدعاءات والـ imports في التلات ملفات هتتغير، والملفات هتتفتح مش محفوظة (نقطة على التاب)، احفظ بـ Ctrl+K S. [[git diff]] المفروض يوريك التلات ملفات بس، والتغيير في أماكن الاسم بس.

الاسم في التعليقات والـ strings مش هيتغير (ده أمان مقصود)، فلو عندك log فيه اسم الدالة لازم تعدّله بإيدك. ولو [[git diff]] وراك ملفات أكتر من المتوقع، غالبًا عندك formatOnSave غيّر تنسيق حاجات. ولو F2 قال «Rename failed» أو «This element can't be renamed»، يبقى الاسم جاي من [[node_modules]].`
        },
        {
          cmd: "Ctrl+.",
          title: "صلّح الغلط أو ضيف الـ import الناقص",
          desc: R`لما تلاقي خط أحمر أو لمبة صفرا، Ctrl+. بيعرض الحلول الجاهزة: import ناقص، أو إملاء اسم غلط، أو دالة مش موجودة يعملها، أو extract لجزء متحدد في دالة أو متغير.

و Shift+Alt+O بيرتّب الـ imports ويشيل اللي مش مستخدم.`,
          example: R`Ctrl+.                 Win / Linux: quick fix / refactor
Cmd+.                  Mac
select code, Ctrl+.    Extract to function / constant
Shift+Alt+O            organize imports (Shift+Option+O on Mac)`,
          try: "امسح import من ملف واكتب اسم الحاجة المستوردة، وخلي Ctrl+. يضيفه. وحدد expression طويل واعمله Extract to constant.",
          flag: "keys",
          deep: {
            why: "نص الأخطاء الحمرا وانت بتكتب حلها معروف: import ناقص أو اسم غلط. بدل ما تكتبه بإيدك، VS Code عارفه.",
            how: R`الحلول جاية من الـ language server ومن الـ extensions: ESLint بيضيف «Fix this rule» و «Disable for this line»، و TypeScript بيضيف الـ imports والـ refactors.

وممكن تخلي أنواع منها تشتغل مع كل حفظ: [[source.fixAll.eslint]] و [[source.organizeImports]] جوه [[editor.codeActionsOnSave]] (درس settings.json في مستوى ٣).`,
            when: "كل ما يظهر خط أحمر أو لمبة، وقبل ما تكتب import بإيدك.",
            mistakes: "تختار أول auto import من غير ما تبص، فيجيب [[Button]] من مكتبة غلط أو من dist بدل src: بص على المسار في الاقتراح. و «Disable eslint for this line» كحل سريع: كده الغلط لسه موجود ومستخبي."
          },
          teach: R`## الفكرة في سطر

Ctrl+. بيعرض **Quick Fix**: حلول جاهزة للغلط اللي المؤشر عليه، أو refactors للكود المتحدد. نفك المثال.

---

## ١. Ctrl+.

~~~text
Ctrl+.                 Win / Linux: quick fix / refactor
Cmd+.                  Mac
~~~

لما تلاقي خط أحمر تحت كلمة، أو لمبة صفرا جنب السطر، حط المؤشر هناك ودوس Ctrl+. (النقطة). بتطلع لستة حلول.

### مثال حقيقي: import ناقص

ملف فيه سطر واحد بيستخدم دالة من غير import:

~~~text routes/missing.ts
export const u = getUser(2);
~~~

سألت محرك TypeScript (5.9، من Node على ويندوز 11) عن الأخطاء، وبعدين عن الحلول على [[getUser]]:

~~~text الأخطاء
2304 Cannot find name 'getUser'.
~~~

~~~text الحلول (اللي Ctrl+. بيعرضها)
Add import from "../services/user"
  insert: "import { getUser } from \"../services/user\";\n\n"
Add missing function declaration 'getUser'
  insert: "\nfunction getUser(arg0: number) {\nthrow new Error(\"Function not implemented.\");\n}\n"
~~~

- **2304** رقم الغلط في TypeScript، ومعناه «مش لاقي الاسم ده».
- **Add import**: الحل الأول بيضيف السطر [[import { getUser } from "../services/user";]] فوق الملف. الـ [[\n]] في الناتج معناها سطر جديد.
- **Add missing function declaration**: بيعمل دالة فاضية بنفس الاسم ترمي error لحد ما تكتبها. ده مش اللي عايزه هنا، فاختار الأول.

---

## ٢. Extract: حوّل جزء لدالة أو ثابت

~~~text
select code, Ctrl+.    Extract to function / constant
~~~

حدد expression (حتة كود بتطلّع قيمة) زي [[price * qty * 1.14]] ودوس Ctrl+.. هتلاقي اختيارات زي «Extract to constant in enclosing scope»، فيتعمل [[const]] فوق باسم تكتبه، والـ expression مكانه الاسم.

---

## ٣. رتّب الـ imports

~~~text
Shift+Alt+O            organize imports (Shift+Option+O on Mac)
~~~

الـ O من Organize. بيرتّب سطور الـ import ويمسح اللي مش مستخدم.

---

## الحلول دي جاية منين؟

| المصدر | أمثلة |
|---|---|
| TypeScript | Add import، Extract، Rename |
| ESLint extension | Fix this rule، Disable for this line |
| extensions تانية | حسب اللغة |

---

## الخلاصة

~~~text
Ctrl+.          الحلول الجاهزة (Cmd+.)
حدد + Ctrl+.    Extract to function / constant
Shift+Alt+O     رتّب الـ imports وامسح الزيادة
~~~

بص على مسار الـ import قبل ما تختاره.`,
          sol: R`بعد ما تمسح الـ import، الاسم هيبقى عليه خط أحمر. حط المؤشر عليه و Ctrl+.، هتلاقي «Add import from './utils'» أو لكل الأماكن اللي الاسم موجود فيها لو أكتر من واحد. اختار الصح، والـ import هيرجع فوق. ولما تحدد expression طويل و Ctrl+.، هتلاقي «Extract to constant in enclosing scope»، اختاره واكتب الاسم الجديد، والـ expression هيتحط في [[const]] فوق.

لو Ctrl+. مطلعش «Add import»، يبقى الاسم مش exported من أي ملف، أو المكتبة مش متسطبة. ولو اقترح import من مكان غلط (زي نسخة داخلية من مكتبة)، اختار بعناية. وعلى الكيبورد العربي، زرار النقطة في الـ layout العربي حرف «ز»، فاختصار Ctrl+. ممكن ميشتغلش، حوّل للإنجليزي.`
        },
        {
          cmd: "Ctrl+Space",
          title: "اعرض الاقتراحات والـ parameters والـ type",
          desc: R`Ctrl+Space بيفتح لستة الاقتراحات لو اختفت (دوال، properties، مسارات ملفات). Ctrl+Shift+Space وانت جوه أقواس دالة بيوريك الـ parameters والـ parameter اللي انت عليه. و Ctrl+K Ctrl+I بيعرض الـ hover (الـ type والتوثيق) من غير ماوس.`,
          example: R`Ctrl+Space             suggestions (Ctrl+Space on Mac too)
Ctrl+Space again       show details of the selected suggestion
Ctrl+Shift+Space       parameter hints (Shift+Cmd+Space on Mac)
Ctrl+K Ctrl+I          show hover: type + docs (Cmd+K Cmd+I)`,
          try: "في object من type معروف، اكتب [[obj.]] وافتح الاقتراحات بـ Ctrl+Space. وجوه [[fetch(]] جرّب Ctrl+Shift+Space.",
          flag: "keys",
          deep: {
            why: "محتاج تعرف الدالة بتاخد إيه، أو الـ object فيه إيه، من غير ما تفتح ملفها أو التوثيق.",
            how: R`كل ده جاي من الـ types. في TypeScript أو JS فيه JSDoc، بيعرض الأنواع والتعليقات. وفي JS من غير types، الاقتراحات تخمين من الكلام المكتوب في الملف (بتلاقي جنبها أيقونة abc).

الـ hover بالكيبورد مفيد لما تكون شغال من غير ماوس، أو عايز تشوف type طويل وانت واقف على الاسم.`,
            when: "كتابة كود بمكتبة مش حافظها، وقراية types معقدة.",
            mistakes: "على الماك Ctrl+Space ممكن يكون مربوط بتغيير لغة الكيبورد (Input Sources)، فمش هيوصل لـ VS Code: غيّر واحد منهم. وتفتكر إن مفيش اقتراحات يبقى المكتبة وحشة: غالبًا ناقص [[@types]] بتاعها."
          },
          teach: R`## الفكرة في سطر

تلات اختصارات بتسأل الـ language server: «إيه اللي ينفع أكتبه هنا؟» (Ctrl+Space)، و«الدالة دي بتاخد إيه؟» (Ctrl+Shift+Space)، و«ده type إيه؟» (Ctrl+K Ctrl+I). نفكهم.

---

## ١. الاقتراحات

~~~text
Ctrl+Space             suggestions (Ctrl+Space on Mac too)
~~~

الأمر اسمه **Trigger Suggest**. الاقتراحات بتظهر لوحدها وانت بتكتب، بس لو قفلتها أو مظهرتش، Ctrl+Space بيجيبها. على الماك كمان **Control**+Space (الجدول الرسمي بيقول [[ctrl+space]]).

بعد [[user.]] مثلًا، بتلاقي كل الـ properties والـ methods في الـ type، وجنب كل واحد أيقونة بنوعه.

---

## ٢. التفاصيل

~~~text
Ctrl+Space again       show details of the selected suggestion
~~~

وانت في اللستة، Ctrl+Space تاني بيفتح جنبها التوثيق والـ type للاقتراح اللي واقف عليه. ومرة كمان يقفلها.

---

## ٣. الـ parameters

~~~text
Ctrl+Shift+Space       parameter hints (Shift+Cmd+Space on Mac)
~~~

جوه أقواس دالة، بيعرض شكلها والـ parameter اللي انت عليه متظلل. مثلًا جوه [[fetch(]]، الشكل هو تعريف fetch في ملف [[lib.dom.d.ts]] اللي جاي مع TypeScript (فتحته من TypeScript 5.9.3):

~~~text
declare function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
~~~

اقراه كده:

| الجزء | معناه |
|---|---|
| [[input]] | أول parameter، ونوعه RequestInfo أو URL (العلامة اللي بينهم في TypeScript معناها «أو») |
| [[init?: RequestInit]] | التاني، والـ [[?]] معناها اختياري |
| [[Promise<Response>]] | بترجّع Promise هيبقى فيه Response |

---

## ٤. الـ hover من الكيبورد

~~~text
Ctrl+K Ctrl+I          show hover: type + docs (Cmd+K Cmd+I)
~~~

**hover** هو المربع اللي بيظهر لما تقف بالماوس على اسم. ده chord بيظهره من غير ماوس: Ctrl+K وتسيب، وبعدين Ctrl+I.

---

## الاقتراحات دي جاية منين؟

من الـ types. في TypeScript، أو JavaScript فيه JSDoc، بتبقى دقيقة. وفي JS من غير types، بتبقى تخمين من الكلام المكتوب في الملف (جنبها أيقونة [[abc]]). ولو مكتبة مفيش اقتراحات ليها، غالبًا ناقص [[@types]] بتاعها.

---

## الخلاصة

| عايز | ويندوز / لينكس | ماك |
|---|---|---|
| الاقتراحات | Ctrl+Space | Ctrl+Space |
| تفاصيل الاقتراح | Ctrl+Space تاني | Ctrl+Space تاني |
| الـ parameters | Ctrl+Shift+Space | Shift+Cmd+Space |
| الـ hover | Ctrl+K Ctrl+I | Cmd+K Cmd+I |

على الماك Ctrl+Space ممكن يكون اختصار تغيير اللغة.`,
          sol: R`اكتب [[obj.]] والاقتراحات هتظهر لوحدها غالبًا، لو قفلتها Ctrl+Space يرجّعها. هتلاقي كل الـ properties والـ methods من الـ type، وجنب كل واحد الـ type بتاعه. Ctrl+Space تاني يعرض التفاصيل على الجنب. جوه [[fetch(]]، Ctrl+Shift+Space هيطلع [[fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>]] والـ parameter اللي انت عليه متظلل.

على ويندوز Ctrl+Space ساعات بتاخده أنظمة إدخال الصيني أو الياباني، وعلى الماك Ctrl+Space هو اختصار تغيير اللغة لما تضيف العربي. لو غيّر اللغة بدل ما يفتح الاقتراحات، غيّر اختصار الماك من Keyboard Shortcuts ثم Input Sources، أو استخدم اختصار تاني في VS Code.`
        },
        {
          cmd: "Ctrl+Shift+M",
          title: "شوف كل الأخطاء وروح لكل واحد",
          desc: R`Ctrl+Shift+M بيفتح لوحة Problems: كل الأخطاء والتحذيرات من TypeScript و ESLint وغيرهم، متقسمة بالملف، والكليك بيوديك للسطر. و F8 بيقفز للغلط الجاي وبيعرضه تحت السطر، و Shift+F8 للي قبله.

فيها فلتر فوق: اكتب اسم ملف، أو شيل الـ warnings وسيب الـ errors.`,
          example: R`Ctrl+Shift+M           Win / Linux: Problems panel
Cmd+Shift+M            Mac
F8 / Shift+F8          next / previous problem
Ctrl+.                 on the problem: quick fix`,
          try: "افتح Problems في مشروعك وصلّح أول ٣ أخطاء بـ F8 ثم Ctrl+. من غير ماوس.",
          flag: "keys",
          deep: {
            why: "الأخطاء متفرقة في ملفات كتير، وانت شايف الأحمر في الملف المفتوح بس.",
            how: R`اللوحة بتعرض اللي الـ extensions بلّغت عنه. ومهم: TypeScript و ESLint في المحرر غالبًا بيفحصوا الملفات المفتوحة بس، فاللوحة مش بالضرورة كل أخطاء المشروع.

عشان المشروع كله: شغّل [[tsc --noEmit]] كـ task بـ problem matcher اسمه [[$tsc]] (درس tasks.json في مستوى ٣)، فالنتيجة تتملي في اللوحة دي.`,
            when: "قبل commit، وبعد ما تسحب تعديلات، وبعد تغيير type مشترك.",
            mistakes: "تفتكر إن اللوحة فاضية يبقى المشروع سليم، وهي بتعرض الملفات المفتوحة بس. [[npm run typecheck]] و [[npm run lint]] هما الحكم (تاب فحص الكود)."
          },
          teach: R`## الفكرة في سطر

Ctrl+Shift+M بيفتح لوحة **Problems**: كل الأخطاء والتحذيرات في مكان واحد. و F8 بيقفز بينهم في الكود. نفك المثال.

---

## ١. لوحة Problems

~~~text
Ctrl+Shift+M           Win / Linux: Problems panel
Cmd+Shift+M            Mac
~~~

اللوحة بتتفتح تحت، والمشاكل متجمعة تحت اسم كل ملف وجنبه عددها. كل مشكلة سطر فيه:

| الجزء | معناه |
|---|---|
| الأيقونة | دايرة حمرا = error، ومثلث أصفر = warning |
| الرسالة | نفس رسالة الأداة، زي [[Argument of type 'string' is not assignable to parameter of type 'number'.]] |
| المصدر والرقم | مين بلّغ ورقم الغلط، زي [[ts(2345)]] لـ TypeScript |
| [[Ln]] و [[Col]] | السطر (Line) والعمود (Column) |

الرسالة والرقم دول هما نفس اللي طلعوا لما شغلت [[tsc]] على ملف فيه غلط على ويندوز 11 (درس Ctrl+G): [[demo/src/server.ts:5:30 - error TS2345]]. اللوحة بتعرض نفس المعلومة بشكل تقدر تدوس عليه.

الكليك على أي سطر بيوديك للمكان. وفوق فيه خانة فلتر: اكتب اسم ملف، أو شيل الـ warnings.

---

## ٢. F8: الغلط الجاي

~~~text
F8 / Shift+F8          next / previous problem
~~~

F8 في المحرر بيقفز لأول مشكلة **بعد** المؤشر، ويعرض الرسالة في شريط تحت السطر. ولو خلصت مشاكل الملف بيروح للملف اللي بعده. و Shift+F8 للي قبلها.

---

## ٣. Ctrl+.: صلّحه

~~~text
Ctrl+.                 on the problem: quick fix
~~~

وانت واقف على المشكلة، Ctrl+. بيعرض الحلول الجاهزة (درس Ctrl+.). فالسلسلة كلها من غير ماوس: F8 ثم Ctrl+. ثم F8.

---

## حاجة مهمة: اللوحة مش كل المشروع

TypeScript و ESLint جوه المحرر غالبًا بيفحصوا **الملفات المفتوحة** بس. فلوحة فاضية مش معناها إن المشروع سليم. الحكم هو [[tsc --noEmit]] أو [[npm run lint]]، أو تشغّل tsc كـ task بالـ problem matcher [[$tsc]] فالنتيجة تتملي في اللوحة دي (درس tasks.json).

---

## الخلاصة

~~~text
Ctrl+Shift+M     لوحة Problems (Cmd+Shift+M)
F8 / Shift+F8    المشكلة الجاية / اللي قبلها
Ctrl+.           حلّها
~~~`,
          sol: R`Ctrl+Shift+M هيفتح لوحة Problems فيها الأغلاط والتحذيرات لكل الملفات المفتوحة (أو المشروع، حسب language server). F8 في المحرر هيوديك لأول مشكلة ويعرض الرسالة في شريط تحت السطر. Ctrl+. هناك يوريك الحلول المقترحة. F8 تاني للي بعدها.

لو Problems قال «No problems have been detected in the workspace» ومع ذلك [[tsc]] بيطلع أغلاط، ده لأن VS Code بيعرض أغلاط الملفات المفتوحة بس لـ TypeScript افتراضيًا. شغّل tsc كـ task بـ [[$tsc]] (درس tasks.json) عشان كل أغلاط المشروع تظهر. ولو F8 مش شغال على لابتوب، جرّب Fn+F8.`
        }
      ]
    },
    {
      t: "الترمنال والبورتات",
      l: 2,
      n: "ترمنال جنب الكود يتقسم ويتغير نوعه، وبورتات من WSL أو السيرفر توصل لجهازك",
      items: [
        {
          cmd: "Ctrl+`",
          title: "افتح الترمنال وارجع للكود من غير ماوس",
          desc: "Ctrl+` بيفتح الترمنال المدمج ويحط الـ focus فيه، ونفس الاختصار بيخفيه. Ctrl+Shift+` بيفتح ترمنال جديد، و Ctrl+Shift+5 بيقسم الترمنال الحالي نصين (dev server في نص وأوامر في التاني). وترجع للكود بـ Ctrl+1.\n\nنوع الترمنال الافتراضي بتختاره من السهم جنب الـ + ثم Select Default Profile: PowerShell أو Git Bash أو WSL، أو من الإعداد [[terminal.integrated.defaultProfile.windows]].",
          example: "Ctrl+`                 Win / Linux / Mac: show / hide the terminal\nCtrl+Shift+`           new terminal (the same on Mac)\nCtrl+Shift+5           split the terminal (Cmd+\\ on Mac, terminal focused)\nCtrl+PageDown / Up     next / previous terminal (Cmd+Shift+] / [ on Mac)\nCtrl+1                 back to the editor (Cmd+1)\nCtrl+Click             open a file:line printed in the terminal",
          try: "شغّل [[npm run dev]] في ترمنال، واقسمه بـ Ctrl+Shift+5 وشغّل [[git status]] في النص التاني، وارجع للكود بـ Ctrl+1 من غير ماوس.",
          flag: "keys",
          deep: {
            why: "ترمنال في شباك منفصل معناه Alt+Tab كل دقيقة، وتنسخ مسار الغلط وتفتح الملف بإيدك.",
            how: "كل ترمنال بيبدأ في فولدر المشروع. المسارات اللي بتتطبع (زي [[src/app.ts:40:5]]) بتبقى links، و Ctrl+Click بيفتح الملف على السطر.\n\nلو محدد كود في المحرر، Terminal: Run Selected Text In Active Terminal من Command Palette بيبعته للترمنال. ملوش اختصار افتراضي، وتقدر تعمله واحد (درس keybindings.json في مستوى ٣).\n\nلو فاتح المشروع من WSL ([[code .]] من Ubuntu)، الترمنال بيبقى bash جوه لينكس لوحده (تاب WSL، درس «VS Code»).",
            when: "كل يوم: dev server و git وأوامر سريعة.",
            mistakes: "تقفل الترمنال بأيقونة الزبالة بدل ما تخفيه، فالـ dev server يقف: الزبالة بتقتل العملية، و Ctrl+` بيخفي اللوحة بس. وبعض الاختصارات (زي Ctrl+P) جوه الترمنال بتروح لـ VS Code مش للـ shell، ودا بيتحكم فيه [[terminal.integrated.commandsToSkipShell]]."
          },
          teach: R`## الفكرة في سطر

Ctrl+$__bt بيفتح الترمنال المدمج تحت ويحط الكيبورد فيه، ونفس الاختصار بيخفيه. والباقي في المثال: ترمنال جديد، وتقسيم، وتنقل. نفكهم.

---

## الأول: إيه الزرار ده؟

الـ $__bt اسمه **backtick**، الزرار اللي شمال رقم 1 تحت Esc. على الكيبورد العربي نفس الزرار عليه حرف «ذ».

---

## ١. اظهر واخفي

~~~text
Ctrl+$__bt                 Win / Linux / Mac: show / hide the terminal
~~~

الأمر اسمه **Toggle Terminal**. على الماك كمان **Control** (الجدول الرسمي بيقول [[ctrl+$__bt]] على التلاتة).

- مقفول؟ بيفتحه والكيبورد بيبقى جواه.
- مفتوح؟ بيخفيه، **والعملية اللي شغالة فيه بتفضل شغالة** (زي dev server).

---

## ٢. ترمنال جديد

~~~text
Ctrl+Shift+$__bt           new terminal (the same on Mac)
~~~

بيفتح ترمنال تاني، وكل واحد بيبدأ في فولدر المشروع. بيظهروا في لستة على يمين اللوحة.

---

## ٣. قسّم الترمنال

~~~text
Ctrl+Shift+5           split the terminal (Cmd+\ on Mac, terminal focused)
~~~

بيقسم الترمنال الحالي نصين جنب بعض: dev server في نص وأوامر git في التاني. على الماك Cmd+\ والكيبورد في الترمنال (أو Ctrl+Shift+5 كمان).

---

## ٤. اتنقل بين الترمنالات

~~~text
Ctrl+PageDown / Up     next / previous terminal (Cmd+Shift+] / [ on Mac)
~~~

والكيبورد في الترمنال، Ctrl+PageDown للترمنال اللي بعده و Ctrl+PageUp للي قبله.

---

## ٥. ارجع للكود

~~~text
Ctrl+1                 back to the editor (Cmd+1)
~~~

Ctrl+1 بيحط الكيبورد في أول جزء من المحرر. ده أسرع من Ctrl+$__bt لأنه مش بيخفي الترمنال.

---

## ٦. افتح ملف من رسالة

~~~text
Ctrl+Click             open a file:line printed in the terminal
~~~

أي مسار بيتطبع بالشكل [[src/app.ts:40:5]] بيبقى link. Ctrl+Click (Cmd+Click على الماك) بيفتح الملف على السطر 40 والعمود 5.

---

## أنهي shell؟

السهم جنب الـ + في الترمنال ثم **Select Default Profile**: PowerShell أو Git Bash أو WSL أو Command Prompt على ويندوز. الاختيار بيتحفظ في الإعداد [[terminal.integrated.defaultProfile.windows]].

---

## الخلاصة

| عايز | ويندوز / لينكس | ماك |
|---|---|---|
| اظهر / اخفي | Ctrl+$__bt | Ctrl+$__bt |
| ترمنال جديد | Ctrl+Shift+$__bt | Ctrl+Shift+$__bt |
| قسّم | Ctrl+Shift+5 | Cmd+\ |
| الجاي / اللي قبله | Ctrl+PageDown / Up | Cmd+Shift+] / [ |
| ارجع للكود | Ctrl+1 | Cmd+1 |

أيقونة الزبالة بتقتل العملية، Ctrl+$__bt بيخفي بس.`,
          sol: R`Ctrl+$__bt هيفتح الترمنال تحت. [[npm run dev]] هيشتغل. Ctrl+Shift+5 هيقسم الترمنال نصين جنب بعض، والجديد في نفس الفولدر، اكتب فيه [[git status]]. Ctrl+1 يرجّع المؤشر للمحرر. و Ctrl+$__bt تاني يرجعك للترمنال.

الكيبورد العربي: زرار [[$__bt]] عليه حرف «ذ»، وفي أغلب الأحوال Ctrl+ذ شغال لأن VS Code بيقرا الزرار. لو مش شغال، استخدم Ctrl+J (بيفتح اللوحة اللي تحت كلها) أو View ثم Terminal. ولو Ctrl+Shift+5 مقسمش، على ويندوز والإنجليزي والعربي متسطبين، Ctrl+Shift هو اختصار تبديل الـ layout ساعات، غيّره من إعدادات ويندوز. وعلى الماك التقسيم Cmd+\ والترمنال عليه الـ focus.`
        },
        {
          cmd: "Ports",
          title: "وصّل بورت من WSL أو سيرفر لجهازك، أو شاركه لينك",
          desc: R`في اللوحة اللي تحت فيه تاب اسمه Ports. لما تكون شغال Remote (WSL أو SSH أو container) وتشغّل dev server، VS Code بيحوّل البورت لجهازك لوحده، فتفتح [[localhost:3000]] في متصفح ويندوز عادي. واللوحة بتعرض كل بورت متحوّل، وتقدر تضيف واحد بإيدك.

ومحليًا، Forward a Port بيعمل لينك من برا (dev tunnel) لبورت على جهازك بعد تسجيل دخول بـ GitHub، ودا مفيد تجرّب webhook أو تفتح الموقع من الموبايل.`,
          example: R`Ctrl+J, Ports tab       every forwarded port
Forward a Port          add one by number, e.g. 5432
right-click a port      Port Visibility: Private / Public
Ctrl+Shift+P            Ports: Focus on Ports View`,
          try: "من WSL أو SSH شغّل [[npm run dev]] وشوف البورت ظهر في Ports لوحده. وحوّل بورت قاعدة البيانات 5432 بإيدك وافتحه من أداة DB على جهازك.",
          flag: "keys",
          deep: {
            why: "السيرفر شغال على جهاز تاني (لينكس جوه WSL، أو VPS)، والمتصفح والأدوات على جهازك. من غير تحويل لازم [[ssh -L]] بإيدك كل مرة.",
            how: R`في Remote-SSH ده نفس [[ssh -L]] بالظبط، بس VS Code بيعمله وبيشيله لوحده (الـ tunnels بإيدك في تاب ssh config). بيكتشف البورتات من اللي بيتطبع في الترمنال ومن العمليات اللي بتسمع.

اللينك العام (dev tunnel) بيعدّي على سيرفرات Microsoft. Private معناها محدش يفتحه غير انت بعد تسجيل دخول، و Public معناها أي حد معاه اللينك.`,
            when: "أي شغل Remote، أو webhook محتاج URL من برا وانت على جهازك.",
            mistakes: "تخلي البورت Public وفيه لوحة admin أو API من غير auth: أي حد معاه اللينك يدخل. وتنسى تقفل التحويل بعد ما تخلص. وتوصل لقاعدة بيانات الإنتاج على localhost عندك فتتعامل معاها كأنها محلية وتعدّل داتا حقيقية بالغلط."
          },
          teach: R`## الفكرة في سطر

تاب **Ports** في اللوحة اللي تحت بيعرض البورتات اللي VS Code بيوصّلها من جهاز تاني (WSL، أو SSH، أو container) لجهازك، فتفتح [[localhost:3000]] في متصفحك عادي. نفك سطور المثال.

---

## الأول: يعني إيه port forwarding؟

البرنامج اللي شغال على جهاز تاني بيسمع على بورت **هناك**. الـ **forwarding** (التحويل) معناه: VS Code بيفتح نفس البورت على جهازك، وأي حاجة توصله بيوديها للجهاز التاني.

~~~text
متصفحك  →  localhost:5173 على جهازك  →  VS Code  →  5173 جوه WSL أو السيرفر
~~~

ده نفس اللي [[ssh -L]] بيعمله بإيدك، بس VS Code بيعمله لوحده.

---

## ١. التاب

~~~text
Ctrl+J, Ports tab       every forwarded port
~~~

Ctrl+J بيفتح اللوحة اللي تحت، و Ports تاب جنب Terminal. فيه جدول:

| العمود | معناه |
|---|---|
| Port | البورت على الجهاز التاني |
| Forwarded Address | العنوان اللي تفتحه من جهازك |
| Running Process | البرنامج اللي بيسمع |
| Origin | اتضاف لوحده (Auto Forwarded) ولا بإيدك |

لما تكون Remote وتشغّل [[npm run dev]]، VS Code بيشوف البورت في الكلام اللي اتطبع في الترمنال ويضيفه لوحده.

---

## ٢. ضيف بورت بإيدك

~~~text
Forward a Port          add one by number, e.g. 5432
~~~

زرار في التاب. تكتب رقم، زي 5432 بتاع PostgreSQL، فتقدر أداة قاعدة بيانات على جهازك تتصل بيه.

> لو البورت ده مشغول على جهازك، VS Code بيختار رقم تاني، فاستخدم الرقم اللي في عمود Forwarded Address مش الأصلي.

---

## ٣. مين يقدر يفتحه؟

~~~text
right-click a port      Port Visibility: Private / Public
~~~

ده للّينكات اللي بتطلع لبرا (dev tunnels، بعد تسجيل دخول GitHub):

| الحالة | مين يفتح |
|---|---|
| Private | انت بس، بعد تسجيل الدخول |
| Public | أي حد معاه اللينك |

---

## ٤. افتح التاب بالاسم

~~~text
Ctrl+Shift+P            Ports: Focus on Ports View
~~~

من الـ Command Palette، لو مش لاقي التاب.

---

## الخلاصة

~~~text
Ports tab          كل البورتات المتحوّلة
Forward a Port     ضيف بورت بإيدك
Private / Public   مين يقدر يفتح اللينك
~~~

متخليش بورت فيه لوحة admin أو API من غير auth على Public.

> الدرس ده من توثيق VS Code (الشغل Remote محتاج WSL أو SSH أو container متوصّل، ومجربناهوش هنا).`,
          sol: R`في WSL أو Remote-SSH، أول ما [[npm run dev]] يطبع بورت زي 5173، هيظهر إشعار صغير «Your application running on port 5173 is available» وفي تاب Ports (جنب Terminal) هيتضاف سطر فيه Port [[5173]] و Forwarded Address [[localhost:5173]]. دوس على العنوان يفتح في المتصفح. للـ 5432: Forward a Port، اكتب [[5432]]، وأداة DB تتصل على [[localhost]] والبورت اللي في عمود Forwarded Address.

لو عمود Forwarded Address طلع [[localhost:5433]] مش 5432، يبقى البورت 5432 مشغول على جهازك (غالبًا Postgres محلي)، فـ VS Code اختار رقم تاني. استخدم الرقم اللي مكتوب مش الأصلي. ولو السيرفر مظهرش لوحده، بعض الأدوات مش بتطبع البورت بشكل VS Code يفهمه، ضيفه بإيدك.`
        }
      ]
    }
]);
