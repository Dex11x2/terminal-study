// تكملة تاب vscode: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vscode/01.js (شرح حقول الدرس في أوله)
MORE("vscode", [
    {
      t: "تعديل السطور",
      l: 1,
      n: "حرّك وانسخ وامسح وعلّق ونسّق من غير ما تحدد بالماوس",
      items: [
        {
          cmd: "Alt+Up / Shift+Alt+Down",
          title: "حرّك السطر لفوق وتحت، أو اعمله نسخة",
          desc: R`Alt+Up و Alt+Down بيحركوا السطر اللي فيه المؤشر (أو السطور المتحددة) لفوق وتحت، من غير قص ولزق. و Shift+Alt+Down بيعمل نسخة من السطر تحته على طول، ودي أسرع طريقة تكتب سطر شبه اللي فوقه.

على لينكس النسخ Ctrl+Shift+Alt+Up/Down، وعلى الماك Option مكان Alt.`,
          example: R`Alt+Up / Alt+Down                 move the line (Win / Linux)
Option+Up / Option+Down           Mac
Shift+Alt+Up / Down               copy the line up / down (Windows)
Ctrl+Shift+Alt+Up / Down          Linux
Shift+Option+Up / Down            Mac`,
          try: "في ملف routes أو imports: رتّب ٥ سطور بـ Alt+Up و Alt+Down بس، واعمل نسخة من route وعدّل فيها بـ Shift+Alt+Down.",
          flag: "keys",
          deep: {
            why: "إعادة ترتيب الكود بالقص واللزق بتبوّظ المسافات وممكن تمسح حاجة. النقل بالأسهم أضمن وأسرع.",
            how: R`لو محدد جزء من سطر، السطر كله بيتحرك. ولو محدد كذا سطر، بيتحركوا بلوك واحد، والمسافات في الأول بتتظبط لوحدها في أغلب اللغات.

والنسخ بـ Shift+Alt+Down مش بيلمس الـ clipboard، فاللي نسخته قبل كده بيفضل زي ما هو، عكس Ctrl+C و Ctrl+V.`,
            when: "ترتيب imports أو cases أو خطوات، وتكرار سطر شبه اللي قبله (route، عمود في جدول، field في schema).",
            mistakes: "الاختصار مش شغال لأن برنامج تاني ماسكه (برامج كروت الشاشة القديمة كانت بتاخد Ctrl+Alt والأسهم لقلب الشاشة). Keyboard Shortcuts (Ctrl+K Ctrl+S) فيه Record Keys تضغط المفتاح ويقولك مين واخده."
          },
          teach: R`## الفكرة في سطر

Alt مع السهم بيحرّك السطر، و Shift+Alt مع السهم بيعمل منه نسخة. من غير تحديد ولا قص ولا لزق. نفك سطور المثال.

---

## ١. حرّك السطر

~~~text
Alt+Up / Alt+Down                 move the line (Win / Linux)
Option+Up / Option+Down           Mac
~~~

- **Alt+Up**: السطر اللي فيه المؤشر بيطلع فوق السطر اللي قبله (الأمر Move Line Up).
- **Alt+Down**: بينزل تحت اللي بعده.
- على الماك **Option** هو نفس زرار Alt.

~~~text قبل
import b from "./b";
import a from "./a";     ← المؤشر هنا
~~~

~~~text بعد Alt+Up
import a from "./a";     ← السطر طلع، والمؤشر معاه
import b from "./b";
~~~

ولو محدد كذا سطر (حتى لو جزء من كل سطر)، بيتحركوا كلهم كبلوك واحد.

---

## ٢. انسخ السطر

~~~text
Shift+Alt+Up / Down               copy the line up / down (Windows)
Ctrl+Shift+Alt+Up / Down          Linux
Shift+Option+Up / Down            Mac
~~~

- **Shift+Alt+Down**: بيعمل نسخة من السطر **تحته**، والمؤشر بينزل على النسخة، فتعدّل فيها على طول (الأمر Copy Line Down).
- **Shift+Alt+Up**: النسخة بتتحط فوق، والمؤشر بيطلع عليها.
- على لينكس زيادة Ctrl (الجدول الرسمي بيقول [[ctrl+shift+alt+down]])، لأن Shift+Alt مع الأسهم على لينكس بيضيف مؤشرات (درس Alt+Click).

~~~text قبل
router.get("/users", listUsers);
~~~

~~~text بعد Shift+Alt+Down، وتعدّل السطر التاني
router.get("/users", listUsers);
router.get("/users/:id", getUser);
~~~

### ميزة مستخبية

النسخ هنا **مش بيلمس الـ clipboard** (الحافظة اللي Ctrl+C بيحط فيها). فلو كنت ناسخ حاجة قبل كده، لسه موجودة تلزقها.

---

## الخلاصة

| عايز | ويندوز | لينكس | ماك |
|---|---|---|---|
| حرّك لفوق / تحت | Alt+Up / Down | Alt+Up / Down | Option+Up / Down |
| نسخة تحت | Shift+Alt+Down | Ctrl+Shift+Alt+Down | Shift+Option+Down |
| نسخة فوق | Shift+Alt+Up | Ctrl+Shift+Alt+Up | Shift+Option+Up |

ولو على ويندوز Shift+Alt بيقلب اللغة لعربي، ده اختصار ويندوز نفسه، غيّره لـ Win+Space.`,
          sol: R`Alt+Up و Alt+Down بيحركوا السطر اللي عليه المؤشر (أو كل السطور المتحددة) من غير ما تعمل copy و paste، والـ indentation بيتظبط لوحده جوه البلوكات. Shift+Alt+Down على سطر route هيعمل نسخة منه تحته والمؤشر ينزل عليها، عدّل المسار واسم الدالة.

على ويندوز والكيبورد العربي والإنجليزي متسطبين: Shift+Alt هو اختصار تغيير اللغة، فممكن تلاقي اللغة اتقلبت بعد Shift+Alt+Down. غيّر اختصار اللغة لـ Win+Space من إعدادات ويندوز (Typing ثم Advanced keyboard settings ثم Input language hot keys). وعلى لينكس النسخ Ctrl+Shift+Alt+Up/Down، و Shift+Alt+Down هناك ممكن يبقى محجوز من الـ desktop.`
        },
        {
          cmd: "Ctrl+Shift+K",
          title: "امسح السطر كله من غير ما تحدده",
          desc: R`Ctrl+Shift+K بيمسح السطر اللي فيه المؤشر كله مرة واحدة. ومن غير أي تحديد، Ctrl+X بيقص السطر كله و Ctrl+C بينسخه.

ومعاهم اتنين صغيرين: Ctrl+Enter بيفتح سطر جديد تحت من غير ما تروح لآخر السطر، و Ctrl+L بيحدد السطر كله.`,
          example: R`Ctrl+Shift+K           Win / Linux: delete the line
Cmd+Shift+K            Mac
Ctrl+X / Ctrl+C        no selection: cut / copy the whole line
Ctrl+Enter             new line below, from anywhere in the line
Ctrl+Shift+Enter       new line above
Ctrl+L                 select the line (again: add the next one)
Mac: Cmd+X / Cmd+C / Cmd+Enter / Cmd+Shift+Enter / Cmd+L`,
          try: "امسح ٣ [[console.log]] من ملف بـ Ctrl+Shift+K. ووانت في نص سطر، افتح سطر جديد تحته بـ Ctrl+Enter.",
          flag: "keys",
          deep: {
            why: "Home ثم Shift+End ثم Delete ثم Delete تاني عشان السطر الفاضي: أربع ضغطات لحاجة بتعملها ١٠٠ مرة في اليوم.",
            how: R`Ctrl+Shift+K مش بيحط حاجة في الـ clipboard، فمسح سطر مش هيضيّع اللي نسخته. أما Ctrl+X من غير تحديد فبيقص السطر ويحطه في الـ clipboard، فتلزقه في مكان تاني.

Ctrl+Enter بيعمل سطر جديد تحت بنفس المسافات، حتى لو المؤشر في نص كلمة. ومع مؤشرات كتير بيشتغل على كل السطور مرة واحدة.`,
            when: "تنضيف console.log والكود الميت، ونقل سطر لمكان بعيد (Ctrl+X ثم Ctrl+V).",
            mistakes: "تستخدم Ctrl+X عشان تمسح، وبعدين تعمل Ctrl+V لحاجة كنت ناسخها قبل كده فتلاقي السطر الممسوح بدلها. للمسح Ctrl+Shift+K. وعلى الماك Cmd+Shift+K مش Ctrl."
          },
          teach: R`## الفكرة في سطر

Ctrl+Shift+K بيمسح السطر كله والمؤشر في أي حتة فيه. وباقي المثال اختصارات صغيرة للسطر: قص ونسخ وسطر جديد وتحديد. نفكهم.

---

## ١. امسح السطر

~~~text
Ctrl+Shift+K           Win / Linux: delete the line
Cmd+Shift+K            Mac
~~~

الأمر اسمه Delete Line. السطر بيتمسح **ومش بيروح الـ clipboard**، والسطر اللي تحته بيطلع مكانه.

~~~text قبل
const total = sum(items);
console.log(total);       ← المؤشر في أي حتة هنا
return total;
~~~

~~~text بعد Ctrl+Shift+K
const total = sum(items);
return total;
~~~

---

## ٢. قص ونسخ من غير تحديد

~~~text
Ctrl+X / Ctrl+C        no selection: cut / copy the whole line
~~~

لو **مفيش** حاجة متحددة:

- **Ctrl+X** بيقص السطر كله (بيمسحه **وبيحطه** في الـ clipboard).
- **Ctrl+C** بينسخ السطر كله.

وبعدين Ctrl+V في مكان تاني بيلزقه كسطر كامل. والفرق المهم:

| | بيمسح السطر؟ | بيلمس الـ clipboard؟ |
|---|---|---|
| Ctrl+Shift+K | أيوه | لأ |
| Ctrl+X من غير تحديد | أيوه | أيوه، واللي كان فيه بيضيع |

---

## ٣. سطر جديد من أي حتة

~~~text
Ctrl+Enter             new line below, from anywhere in the line
Ctrl+Shift+Enter       new line above
~~~

Enter العادي في نص السطر بيقسمه نصين. **Ctrl+Enter** بيفتح سطر فاضي **تحت** السطر كله ويحط المؤشر فيه بنفس المسافات، والسطر الأصلي زي ما هو. و **Ctrl+Shift+Enter** سطر فوق.

---

## ٤. حدد السطر

~~~text
Ctrl+L                 select the line (again: add the next one)
~~~

الـ L من Line. بيحدد السطر كله. ودوسة تانية بتضيف السطر اللي بعده للتحديد، وهكذا.

---

## ٥. الماك

~~~text
Mac: Cmd+X / Cmd+C / Cmd+Enter / Cmd+Shift+Enter / Cmd+L
~~~

نفس الاختصارات بالظبط، بـ Cmd مكان Ctrl.

---

## الخلاصة

~~~text
Ctrl+Shift+K       امسح السطر (الـ clipboard سليم)
Ctrl+X             قص السطر (من غير تحديد)
Ctrl+C             انسخ السطر (من غير تحديد)
Ctrl+Enter         سطر جديد تحت
Ctrl+Shift+Enter   سطر جديد فوق
Ctrl+L             حدد السطر
~~~`,
          sol: R`حط المؤشر في أي حتة في سطر [[console.log]] ودوس Ctrl+Shift+K: السطر كله هيتمسح من غير ما يروح الكليب بورد، والسطر اللي تحته يطلع مكانه. كرر على التلاتة. وفي نص سطر، Ctrl+Enter بيفتح سطر فاضي تحته والمؤشر عليه بنفس الـ indentation، من غير ما يقسم السطر اللي كنت فيه زي Enter.

لو Ctrl+Shift+K عمل حاجة تانية، غالبًا extension زي Git أو Vim خدته. وفرق مهم: Ctrl+X من غير تحديد بيمسح السطر ويحطه في الكليب بورد، يعني هيمسح اللي كنت ناسخه قبل كده، أما Ctrl+Shift+K فمش بيلمس الكليب بورد.`
        },
        {
          cmd: "Ctrl+/",
          title: "حوّل السطر لتعليق وارجّعه",
          desc: R`Ctrl+/ بيعلّق السطر أو السطور المتحددة بعلامة التعليق بتاعة اللغة: [[//]] في JS، و [[#]] في Python و YAML، و [[<!-- -->]] في HTML، و [[{/* */}]] جوه JSX. ونفس الاختصار بيشيل التعليق.

و Shift+Alt+A بيعمل block comment ([[/* ... */]]) حوالين الجزء المتحدد بس. على لينكس Ctrl+Shift+A.`,
          example: R`Ctrl+/                 Win / Linux: toggle line comment
Cmd+/                  Mac
Shift+Alt+A            block comment (Windows)
Ctrl+Shift+A           Linux
Shift+Option+A         Mac`,
          try: "علّق middleware في Express بـ Ctrl+/ وشغّل السيرفر، وبعدين رجّعه. وجرّب نفس الاختصار في ملف YAML وفي ملف JSX وشوف العلامة بتتغير.",
          flag: "keys",
          deep: {
            why: "وانت بتدوّر على bug، بتقفل أجزاء من الكود مؤقتًا. كتابة // على ١٠ سطور بإيدك بطيئة وبتنسى واحد.",
            how: R`VS Code بيعرف اللغة من امتداد الملف (مكتوبة تحت على اليمين في شريط الحالة)، وكل لغة ليها علامتها. في ملف [[.tsx]] بيفرّق بين كود JS عادي وكود جوه الـ JSX.

لو السطور المتحددة فيها سطور متعلّقة وسطور لأ، أول ضغطة بتعلّق الكل.`,
            when: "قفل كود مؤقتًا وانت بتجرّب، أو قفل سطر إعداد في ملف config.",
            mistakes: "تسيب كود متعلّق في الـ commit كـ «backup»: Git هو الـ backup. ولو لغة الملف غلط (ملف [[.env]] اتفتح كـ plain text)، العلامة هتطلع غلط: غيّر اللغة من شريط الحالة أو Ctrl+K M."
          },
          teach: R`## الفكرة في سطر

Ctrl+/ بيحوّل السطر لتعليق (comment)، ونفس الاختصار بيرجّعه كود. وبيختار علامة التعليق الصح للغة لوحده. نفك المثال.

---

## يعني إيه تعليق؟

كلام جوه الملف البرنامج بيتجاهله وقت التشغيل. فلو حولت سطر كود لتعليق، كأنه اتشال مؤقتًا من غير ما تمسحه.

---

## ١. تعليق سطر

~~~text
Ctrl+/                 Win / Linux: toggle line comment
Cmd+/                  Mac
~~~

- **toggle** يعني لو مش متعلّق علّقه، ولو متعلّق شيل التعليق.
- **line comment** يعني تعليق بيبدأ من أول السطر لآخره.

~~~text قبل
app.use(cors());
~~~

~~~text بعد Ctrl+/
// app.use(cors());
~~~

والعلامة بتتغير حسب اللغة:

| الملف | العلامة |
|---|---|
| JavaScript و TypeScript | [[//]] |
| Python و YAML و bash | [[#]] |
| HTML | [[<!-- -->]] حوالين السطر |
| CSS | [[/* */]] حوالين السطر |
| جوه JSX في [[.tsx]] | [[{/* */}]] |

VS Code بيعرف اللغة من امتداد الملف، ومكتوبة تحت يمين في شريط الحالة.

---

## ٢. تعليق بلوك

~~~text
Shift+Alt+A            block comment (Windows)
Ctrl+Shift+A           Linux
Shift+Option+A         Mac
~~~

**block comment** يعني تعليق ليه بداية ونهاية، فيقدر يبقى جوه سطر أو على كذا سطر. الاختصار بيلف **الجزء المتحدد بس**:

~~~text قبل (متحدد: b, )
sum(a, b, c)
~~~

~~~text بعد Shift+Alt+A
sum(a, /* b, */ c)
~~~

على لينكس الاختصار Ctrl+Shift+A (من جدول الاختصارات الرسمي).

---

## الخلاصة

| عايز | ويندوز | لينكس | ماك |
|---|---|---|---|
| علّق / شيل التعليق | Ctrl+/ | Ctrl+/ | Cmd+/ |
| تعليق حوالين جزء | Shift+Alt+A | Ctrl+Shift+A | Shift+Option+A |

لو العلامة طلعت غلط، لغة الملف غلط: غيّرها من شريط الحالة أو Ctrl+K M.`,
          sol: R`Ctrl+/ على سطر [[app.use(cors());]] هيبقى [[// app.use(cors());]]. شغّل السيرفر وهتلاقي تأثير غيابه (مثلًا CORS error في المتصفح). Ctrl+/ تاني يرجّعه. في YAML العلامة بتبقى [[#]]، وفي JSX جوه الـ markup بتبقى [[{/* */}]] حوالين السطر، أما في جزء الـ JavaScript من نفس الملف فهي [[//]]. VS Code بيختار حسب المكان مش حسب الملف بس.

الكيبورد العربي: زرار [[/]] في الـ layout العربي عليه حرف تاني، و VS Code ساعات مبيفهمش Ctrl+/ وهو على العربي (فيه issues كتير على GitHub عن ده مع layouts مختلفة). الحل الأسهل تحوّل للإنجليزي، أو تعمل اختصار تاني لـ «Toggle Line Comment» في Keyboard Shortcuts. على الماك Cmd+/.`
        },
        {
          cmd: "Shift+Alt+F",
          title: "نسّق الملف كله بضغطة",
          desc: R`Shift+Alt+F بيشغّل الـ formatter على الملف كله: المسافات والأقواس وطول السطر. و Ctrl+K Ctrl+F بينسّق الجزء المتحدد بس. على لينكس Ctrl+Shift+I.

أول مرة ممكن يسألك تختار formatter لو عندك أكتر من واحد (Prettier والمدمج في VS Code). في مشروع فيه Prettier اختاره هو، والأحسن تثبّته في إعدادات المشروع (مستوى ٣).`,
          example: R`Shift+Alt+F            Windows: format document
Ctrl+Shift+I           Linux
Shift+Option+F         Mac
Ctrl+K Ctrl+F          format the selection only (Cmd+K Cmd+F on Mac)
Ctrl+] / Ctrl+[        indent / outdent the line (Cmd on Mac)`,
          try: "بوّظ المسافات في ملف عن قصد ونسّقه بـ Shift+Alt+F. لو سألك أنهي formatter، اختار Prettier لو المشروع فيه [[.prettierrc]].",
          flag: "keys",
          deep: {
            why: "التنسيق بالإيد بيختلف من شخص لشخص، والـ diff بيتملي مسافات. الـ formatter بيخلي الشكل قرار الأداة مش قرارك.",
            how: R`VS Code نفسه مش بينسّق، بيسأل extension. لـ JS و TS فيه formatter مدمج، و Prettier extension بتقرا [[.prettierrc]] بتاع المشروع. اللي بيشتغل هو [[editor.defaultFormatter]]، ولو مش متحدد وفيه أكتر من واحد بيسألك.

Prettier بياخد إعداداته من المشروع، فنفس الملف بيطلع نفس الشكل عندك وعند زميلك وفي CI (درس «prettier» في تاب فحص الكود).`,
            when: "بعد لزق كود من برا، أو قبل commit لو format on save مش شغال.",
            mistakes: "تنسّق ملف قديم كله في نفس commit فيه تعديل حقيقي، فالـ review يبقى ٣٠٠ سطر مسافات وسطرين مهمين: نسّق في commit لوحده. وانت شغال بالـ formatter المدمج وزميلك بـ Prettier، فكل واحد بيقلب شكل الملف: ثبّت [[editor.defaultFormatter]] في [[.vscode/settings.json]]."
          },
          teach: R`## الفكرة في سطر

Shift+Alt+F بيرتّب شكل الملف كله (المسافات والأقواس وطول السطور) بالأداة اللي اسمها **formatter**. نفك سطور المثال.

---

## ١. نسّق الملف كله

~~~text
Shift+Alt+F            Windows: format document
Ctrl+Shift+I           Linux
Shift+Option+F         Mac
~~~

الأمر اسمه **Format Document**. الـ F من Format. على لينكس الاختصار مختلف: Ctrl+Shift+I (ده اللي في جدول لينكس الرسمي).

~~~text قبل
function add(a,b){return a+b}
~~~

~~~text بعد Shift+Alt+F
function add(a, b) {
  return a + b;
}
~~~

(الناتج بالظبط بيعتمد على الـ formatter وإعداداته، زي المسافتين و [[;]] في الآخر).

### مين اللي بينسّق؟

VS Code نفسه مش بينسّق، بيسأل extension:

- لـ JS و TS و JSON و HTML و CSS فيه formatter مدمج.
- **Prettier** extension بتقرا إعدادات المشروع من [[.prettierrc]].

لو فيه أكتر من واحد لنفس اللغة، أول مرة بيطلع:

~~~text الرسالة
There are multiple formatters for 'TypeScript' files. One of them should be configured as default formatter.
~~~

وزرار Configure تختار منه. اللي بتختاره بيتحفظ في الإعداد [[editor.defaultFormatter]].

---

## ٢. نسّق جزء بس

~~~text
Ctrl+K Ctrl+F          format the selection only (Cmd+K Cmd+F on Mac)
~~~

chord: Ctrl+K وتسيب، وبعدين Ctrl+F. بينسّق **المتحدد بس** (Format Selection). مفيد في ملف قديم مش عايز تقلب شكله كله.

---

## ٣. زوّد أو قلّل المسافة في أول السطر

~~~text
Ctrl+] / Ctrl+[        indent / outdent the line (Cmd on Mac)
~~~

- **indent**: يزوّد مسافة في أول السطر (يدخّله لجوه).
- **outdent**: يقلّلها.

الزرارين هنا زراير الأقواس المربعة اللي يمين حرف P. وبيشتغلوا والمؤشر في أي حتة في السطر.

---

## الخلاصة

| عايز | ويندوز | لينكس | ماك |
|---|---|---|---|
| نسّق الملف | Shift+Alt+F | Ctrl+Shift+I | Shift+Option+F |
| نسّق المتحدد | Ctrl+K Ctrl+F | Ctrl+K Ctrl+F | Cmd+K Cmd+F |
| دخّل / طلّع السطر | Ctrl+] / Ctrl+[ | Ctrl+] / Ctrl+[ | Cmd+] / Cmd+[ |

في مشروع فيه Prettier، اختار Prettier كـ default formatter.`,
          sol: R`بعد ما تبوظ المسافات، Shift+Alt+F هيرجّع الملف كله مترتب. لو ده أول مرة، VS Code ممكن يقول «There are multiple formatters for 'TypeScript' files» أو «There is no formatter for ... installed»، ويديك زرار Configure: اختار «Prettier - Code formatter». بعدها التنسيق هيتبع [[.prettierrc]]، زي علامات التنصيص المفردة أو المزدوجة.

لو التنسيق طلع مختلف عن اللي في المشروع، يبقى اخترت الـ formatter بتاع VS Code نفسه مش Prettier. غيّره من Palette بـ «Format Document With...» ثم «Configure Default Formatter». وعلى لينكس الاختصار Ctrl+Shift+I، وعلى ويندوز Shift+Alt ممكن يقلب اللغة لو الإنجليزي والعربي متفعّلين.`
        }
      ]
    },
    {
      t: "مؤشرات كتير وتحديد ذكي",
      l: 1,
      n: "تعدّل ١٠ أماكن مرة واحدة، وتحدد بلوك كامل، وتكتب HTML باختصارات",
      items: [
        {
          cmd: "Ctrl+D",
          title: "حدد الكلمة والمرة الجاية منها وعدّلهم مع بعض",
          desc: R`Ctrl+D بيحدد الكلمة اللي عليها المؤشر، وكل ضغطة كمان بتضيف المرة الجاية منها بمؤشر جديد. تكتب مرة واحدة والكل بيتغير. Ctrl+K Ctrl+D بيفوّت واحدة مش عايزها ويروح للي بعدها، و Ctrl+U بيرجّع آخر مؤشر.

و Ctrl+Shift+L بيحدد كل مرات الكلمة في الملف مرة واحدة.`,
          example: R`Ctrl+D                 Win / Linux: add the next occurrence
Cmd+D                  Mac
Ctrl+K Ctrl+D          skip this one, jump to the next (Cmd+K Cmd+D)
Ctrl+U                 undo the last cursor (Cmd+U)
Ctrl+Shift+L           select ALL occurrences (Cmd+Shift+L)
Esc                    back to one cursor`,
          try: "في object فيه ٥ keys بنفس البداية (زي [[userName]] و [[userEmail]])، حدد [[user]] بـ Ctrl+D خمس مرات وغيّرها لـ [[customer]] مرة واحدة.",
          flag: "keys",
          deep: {
            why: "تغيير اسم في ٦ أماكن جوه دالة، أو إضافة نفس الحاجة لكذا سطر. Find و Replace تقيلة عليها، والتعديل واحدة واحدة بطيء وبتنسى واحدة.",
            how: R`كل Ctrl+D بتدوّر على نفس النص بعد آخر تحديد، ولما توصل لآخر الملف بتلف من الأول. لو بدأت من غير تحديد، بيدوّر على الكلمة كاملة بس (مش جزء من كلمة أطول). لو بدأت بتحديد انت عامله، بيدوّر على النص ده حتى لو جزء من كلمة.

كل المؤشرات بتتصرف زي بعض: Home و End والأسهم و Ctrl+Right بيشتغلوا على الكل.`,
            when: "تعديل محلي جوه دالة أو ملف. لو الاسم مستخدم في ملفات تانية، F2 (مستوى ٢) أضمن.",
            mistakes: "Ctrl+Shift+L على اسم زي [[id]] أو [[data]] بيمسك كل مكان في الملف حتى اللي ملوش علاقة. بص على العدد قبل ما تكتب، أو استخدم F2 للأسماء. وتضغط Ctrl+D زيادة وتفتكر مفيش رجوع: Ctrl+U."
          },
          teach: R`## الفكرة في سطر

Ctrl+D بيحدد الكلمة، وكل دوسة كمان بتضيف **المرة الجاية** منها بمؤشر جديد. فتكتب مرة واحدة والكل يتغير. نفك سطور المثال.

---

## ١. Ctrl+D

~~~text
Ctrl+D                 Win / Linux: add the next occurrence
Cmd+D                  Mac
~~~

**occurrence** يعني «مرة ظهر فيها». الأمر اسمه Add Selection To Next Find Match.

~~~text المؤشر على count
let count = 0;
count = count + 1;
return count;
~~~

| الدوسة | المتحدد |
|---|---|
| Ctrl+D الأولى | [[count]] في السطر الأول |
| التانية | + أول [[count]] في السطر التاني |
| التالتة | + التاني في السطر التاني |
| الرابعة | + اللي في [[return]] |

دلوقتي فيه ٤ مؤشرات، تكتب [[total]] فالأربعة يتغيروا.

### كلمة كاملة ولا جزء؟

- لو بدأت **من غير تحديد**: أول Ctrl+D بيحدد الكلمة كلها، وبيدوّر على الكلمة **كاملة** بس. فـ [[user]] مش هيمسك [[userName]].
- لو **حددت بإيدك** الأول (مثلًا [[user]] من جوه [[userName]])، بيدوّر على النص ده حتى لو جزء من كلمة أطول.

---

## ٢. فوّت واحدة

~~~text
Ctrl+K Ctrl+D          skip this one, jump to the next (Cmd+K Cmd+D)
~~~

chord: Ctrl+K وتسيب، وبعدين Ctrl+D. بيشيل آخر مرة اتحددت (مش عايزها) ويروح للي بعدها.

---

## ٣. ارجع خطوة

~~~text
Ctrl+U                 undo the last cursor (Cmd+U)
~~~

الـ U من Undo، بس ده **مش** Ctrl+Z: بيلغي آخر مؤشر اتضاف بس، ومش بيلمس النص.

---

## ٤. كلهم مرة واحدة

~~~text
Ctrl+Shift+L           select ALL occurrences (Cmd+Shift+L)
~~~

بيحدد كل مرات الكلمة في الملف مرة واحدة. بص على العدد قبل ما تكتب، لأنه بيمسك كل حاجة بنفس الاسم حتى لو ملهاش علاقة.

---

## ٥. ارجع لمؤشر واحد

~~~text
Esc                    back to one cursor
~~~

---

## الخلاصة

| عايز | ويندوز / لينكس | ماك |
|---|---|---|
| ضيف المرة الجاية | Ctrl+D | Cmd+D |
| فوّت دي | Ctrl+K Ctrl+D | Cmd+K Cmd+D |
| شيل آخر مؤشر | Ctrl+U | Cmd+U |
| الكل | Ctrl+Shift+L | Cmd+Shift+L |
| مؤشر واحد | Esc | Esc |

للأسماء اللي مستخدمة في ملفات تانية، F2 أضمن.`,
          sol: R`أول Ctrl+D وانت واقف في نص [[userName]] من غير تحديد هيحدد الكلمة كلها [[userName]]، ومش هيلاقي [[userEmail]] لأنه بيدوّر على الكلمة كاملة. عشان تمسك [[user]] بس: حدده بإيدك الأول (Shift+Right أربع مرات أو دبل كليك وبعدين تعديل)، وبعدين Ctrl+D أربع مرات. هيبقى عندك ٥ مؤشرات، اكتب [[customer]]: هيبقى [[customerName]] و [[customerEmail]] وهكذا. Esc يرجّعك لمؤشر واحد.

لو اتحدد [[user]] في مكان مش عايزه (زي [[getUser]] أو [[currentUser]] لو مش case sensitive)، Ctrl+K Ctrl+D يتخطاه للي بعده. ولو عايز كله مرة واحدة Ctrl+Shift+L، بس بص على العدد تحت قبل ما تكتب.`
        },
        {
          cmd: "Alt+Click",
          title: "حط مؤشر في أكتر من مكان بإيدك",
          desc: R`Alt+Click بيضيف مؤشر في أي مكان تدوس عليه. Ctrl+Alt+Up و Down بيضيفوا مؤشر في السطر اللي فوق أو تحت. و Shift+Alt+I بيحط مؤشر في آخر كل سطر متحدد.

وعشان تحدد عمود (مستطيل) من نص سطور كتير: امسك Shift+Alt واسحب بالماوس، أو Ctrl+Shift+Alt والأسهم على ويندوز (Shift+Option+Cmd والأسهم على الماك، وعلى لينكس ملوش اختصار افتراضي).`,
          example: R`Alt+Click              Win / Linux: add a cursor (Option+Click on Mac)
Ctrl+Alt+Up / Down     cursor above / below (Windows)
Shift+Alt+Up / Down    Linux
Option+Cmd+Up / Down   Mac
Shift+Alt+I            a cursor at the end of each selected line (Shift+Option+I)
Shift+Alt + drag       column (box) selection (Shift+Option + drag on Mac)`,
          try: R`اكتب ٥ أسامي في ٥ سطور، حددهم واضغط Shift+Alt+I، واكتب [[",]] في الآخر، وبعدين Home واكتب [["]] في الأول: بقوا strings جاهزة لـ array.`,
          flag: "keys",
          deep: {
            why: "تحويل لستة لـ array، أو إضافة نفس الـ prop لـ ٥ components ورا بعض، أو تعديل عمود في بيانات. بإيد واحدة بتاخد دقايق.",
            how: R`كل المؤشرات بتكتب نفس اللي بتكتبه. مع Home و End وأسهم الكلمات (Ctrl+Left و Ctrl+Right) كل مؤشر بيتحرك على قد سطره، فتعدّل سطور أطوالها مختلفة.

الـ column selection بيحدد مستطيل: نفس الأعمدة في كل السطور. ممتاز للبيانات المرصوصة (CSV، جداول، لوج).

لو مش عايز Alt للمؤشرات، [[editor.multiCursorModifier]] بيخليها Ctrl+Click، وساعتها «روح للتعريف» بالماوس يبقى Alt+Click.`,
            when: "تعديلات متكررة في سطور ورا بعض، وتحويل لستة نص لكود.",
            mistakes: "على بعض توزيعات لينكس Alt+Click بيروح للـ window manager (بيسحب الشباك) فمش هيشتغل: غيّر الـ modifier. ولو السطور مش نفس الشكل، مؤشر في آخر كل سطر (Shift+Alt+I) أضمن من العمود."
          },
          teach: R`## الفكرة في سطر

VS Code بيسمح بأكتر من مؤشر في نفس الوقت، وكل اللي بتكتبه بيتكتب عند الكل. الدرس ده طرق تحط بيها المؤشرات بإيدك. نفك المثال.

---

## ١. Alt+Click

~~~text
Alt+Click              Win / Linux: add a cursor (Option+Click on Mac)
~~~

امسك Alt ودوس بالماوس في أي مكان: مؤشر جديد بيتضاف هناك، والقديم فاضل.

---

## ٢. مؤشر فوق أو تحت

~~~text
Ctrl+Alt+Up / Down     cursor above / below (Windows)
Shift+Alt+Up / Down    Linux
Option+Cmd+Up / Down   Mac
~~~

بيضيف مؤشر في نفس العمود في السطر اللي فوق أو تحت. ودوسة كمان تضيف كمان واحد. الاختصار مختلف على كل نظام (من جداول الاختصارات الرسمية، وعلى لينكس كمان Ctrl+Shift+Up / Down).

---

## ٣. مؤشر في آخر كل سطر

~~~text
Shift+Alt+I            a cursor at the end of each selected line (Shift+Option+I)
~~~

حدد كذا سطر، ودوس Shift+Alt+I: مؤشر في **آخر** كل سطر منهم. ده أنفع واحد لما السطور أطوالها مختلفة.

~~~text قبل (الـ ٣ سطور متحددة)
Ali
Mona
Omar
~~~

بعد Shift+Alt+I، اكتب [[",]]، وبعدين Home، واكتب [["]]:

~~~text بعد
"Ali",
"Mona",
"Omar",
~~~

Home مع كذا مؤشر بيودّي كل واحد لأول سطره هو، فكل سطر بيتعدّل على قده.

---

## ٤. تحديد عمود (مستطيل)

~~~text
Shift+Alt + drag       column (box) selection (Shift+Option + drag on Mac)
~~~

امسك Shift+Alt واسحب بالماوس: بيتحدد **مستطيل**، نفس الأعمدة في كل السطور. مفيد لبيانات مرصوصة:

~~~text حدد عمود الأرقام بس
id  name   age
1   Ali    30
2   Mona   25
~~~

وبالكيبورد: Ctrl+Shift+Alt مع الأسهم على ويندوز، و Shift+Option+Cmd مع الأسهم على الماك، وعلى لينكس ملوش اختصار افتراضي (ده مكتوب في توثيق VS Code).

---

## الخلاصة

| عايز | ويندوز | لينكس | ماك |
|---|---|---|---|
| مؤشر بالماوس | Alt+Click | Alt+Click | Option+Click |
| مؤشر فوق / تحت | Ctrl+Alt+Up / Down | Shift+Alt+Up / Down | Option+Cmd+Up / Down |
| آخر كل سطر متحدد | Shift+Alt+I | Shift+Alt+I | Shift+Option+I |
| عمود بالماوس | Shift+Alt + سحب | Shift+Alt + سحب | Shift+Option + سحب |

Esc يرجّعك لمؤشر واحد.`,
          sol: R`حدد الـ ٥ سطور، Shift+Alt+I هيحط مؤشر في آخر كل سطر. اكتب [[",]] هيتكتب في الخمسة. Home هيودّي كل المؤشرات لأول كل سطر (أول حرف مش مسافة)، اكتب [["]]. الناتج [["Ali",]] و [["Mona",]] وهكذا. ممكن تحطهم جوه أقواس array وتشيل الفاصلة الأخيرة.

لو Home ودّى المؤشرات لأماكن مختلفة، يبقى فيه سطور فيها مسافات في الأول: Home أول مرة بيروح لأول حرف، ومرة تانية لأول السطر. ولو الـ autoclose حط [["]] مرتين، ده auto-closing quotes: مع مؤشرات كتير ممكن يحصل، امسح الزيادة بـ Delete أو اكتب علامة التنصيص الأولى الأول.`
        },
        {
          cmd: "Shift+Alt+Right",
          title: "كبّر التحديد خطوة خطوة: كلمة ثم string ثم بلوك",
          desc: R`Shift+Alt+Right بيكبّر التحديد على حسب شكل الكود: الكلمة، وبعدين اللي جوه الـ string أو الأقواس، وبعدين الـ statement، وبعدين الدالة كلها. و Shift+Alt+Left بيصغّره خطوة.

أسرع طريقة تحدد argument أو object أو JSX element بالظبط من غير ماوس.`,
          example: R`Shift+Alt+Right        Win / Linux: expand selection
Shift+Alt+Left         shrink selection
Ctrl+Shift+Cmd+Right   Mac expand (Ctrl+Shift+Cmd+Left to shrink)
Ctrl+Shift+\           jump to the matching bracket (Shift+Cmd+\ on Mac)`,
          try: "حط المؤشر جوه قيمة في object متداخل، واضغط Shift+Alt+Right لحد ما يتحدد الـ object كله، وعدّ كام ضغطة.",
          flag: "keys",
          deep: {
            why: "تحديد بلوك بالماوس بيقف قبل القوس أو بعده بحرف. الـ expand selection فاهم الكود فبيقف على حدود صح.",
            how: R`بيستخدم شكل الكود اللي الـ language server فاهمه، فكل خطوة وحدة كاملة: اسم، ثم expression، ثم statement، ثم block. في JSX بيحدد الـ attribute ثم الـ element كله بالـ children.

ومع Ctrl+Shift+\ اللي بيقفز للقوس المقابل، تتنقل وتحدد جوه أي أقواس.`,
            when: "قبل نقل أو مسح أو تغليف بلوك: حدد بالـ expand، وبعدين Ctrl+X أو Alt+Up.",
            mistakes: "على الماك الاختصار تقيل (Ctrl+Shift+Cmd+Right) وناس كتير بتغيّره. وفي لغات من غير language server الخطوات بتبقى على الكلمات والأقواس بس."
          },
          teach: R`## الفكرة في سطر

Shift+Alt+Right بيكبّر التحديد خطوة خطوة **على حسب شكل الكود**، و Shift+Alt+Left بيصغّره. الاسم الرسمي Expand Selection و Shrink Selection. نفك المثال.

---

## ١. كبّر وصغّر

~~~text
Shift+Alt+Right        Win / Linux: expand selection
Shift+Alt+Left         shrink selection
~~~

خد السطر ده والمؤشر جوه كلمة [[Cairo]]:

~~~text
const user = { address: { city: "Cairo" } };
~~~

كل دوسة بتوسّع لحد الوحدة اللي أكبر منها:

| الدوسة | المتحدد |
|---|---|
| ١ | [[Cairo]] |
| ٢ | [["Cairo"]] بعلامات التنصيص |
| ٣ | [[city: "Cairo"]] |
| ٤ | المسافات واللي جوه الأقواس |
| ٥ | [[{ city: "Cairo" }]] |
| وهكذا | لحد ما توصل للسطر كله |

العدد بالظبط بيختلف حسب اللغة وشكل الكود، بس الفكرة واحدة: كل خطوة وقفتها على **حدود صح** (قوس كامل، string كامل)، مش في نص كلمة. ده لأن الـ language server فاهم تركيب الكود.

---

## ٢. الماك

~~~text
Ctrl+Shift+Cmd+Right   Mac expand (Ctrl+Shift+Cmd+Left to shrink)
~~~

اختصار تقيل. الجدول الرسمي للماك فيه كمان Ctrl+Shift+Right و Ctrl+Shift+Left لنفس الأمر، وده أسهل.

---

## ٣. القوس المقابل

~~~text
Ctrl+Shift+\           jump to the matching bracket (Shift+Cmd+\ on Mac)
~~~

المؤشر جنب [[{]]؟ Ctrl+Shift+\ بيقفز للـ [[}]] اللي بتقفله، ودوسة تانية ترجع. مفيد لما الدالة طويلة ومش عارف القوس ده بيتقفل فين.

---

## الخلاصة

| عايز | ويندوز / لينكس | ماك |
|---|---|---|
| كبّر التحديد | Shift+Alt+Right | Ctrl+Shift+Cmd+Right أو Ctrl+Shift+Right |
| صغّره | Shift+Alt+Left | Ctrl+Shift+Cmd+Left أو Ctrl+Shift+Left |
| القوس المقابل | Ctrl+Shift+\ | Shift+Cmd+\ |

حدد بالـ expand، وبعدين Ctrl+X أو Alt+Up تنقل البلوك.`,
          sol: R`مثلًا في [[{ user: { address: { city: "Cairo" } } }]] والمؤشر جوه Cairo: الضغطة الأولى تحدد [[Cairo]]، والتانية الـ string بعلامات التنصيص، والتالتة [[city: "Cairo"]]، والرابعة محتوى الـ object، والخامسة [[{ city: "Cairo" }]]، وتكمل كده لبرّه. العدد بيفرق حسب شكل الكود، بس غالبًا بين ٥ و ٨ ضغطات للـ object الكبير. Shift+Alt+Left بيصغّر خطوة خطوة.

على الماك الاختصار Ctrl+Shift+Cmd+Right. وعلى ويندوز لو الكيبورد العربي متسطب، Shift+Alt ممكن يقلب اللغة، شوف درس Alt+Up. ولو الضغطة الأولى حددت الكلمة والتانية السطر كله، يبقى الملف مش متعرف نوعه (Plain Text)، غيّر اللغة من تحت يمين.`
        },
        {
          cmd: "Ctrl+Shift+[",
          title: "اقفل البلوكات عشان تشوف شكل الملف",
          desc: R`Ctrl+Shift+[ بيقفل (fold) البلوك اللي فيه المؤشر، و Ctrl+Shift+] بيفتحه. Ctrl+K Ctrl+0 بيقفل كل حاجة في الملف فتشوفه أسامي دوال بس، و Ctrl+K Ctrl+J بيفتح الكل.

وتقدر تعمل مناطق بإيدك بتعليق [[//#region اسم]] و [[//#endregion]].`,
          example: R`Ctrl+Shift+[ / ]       Win / Linux: fold / unfold this block
Cmd+Option+[ / ]       Mac
Ctrl+K Ctrl+0          fold everything (Cmd+K Cmd+0)
Ctrl+K Ctrl+J          unfold everything (Cmd+K Cmd+J)
Ctrl+K Ctrl+2          fold level 2 only: classes stay open, their methods fold`,
          try: "افتح أطول ملف عندك واضغط Ctrl+K Ctrl+0: اقرا أسامي الدوال بس، وافتح الدالة اللي تهمك بـ Ctrl+Shift+].",
          flag: "keys",
          deep: {
            why: "ملف ٨٠٠ سطر مش هتفهم شكله بالـ scroll. لما تقفل البلوكات، بتشوف الهيكل: كام دالة، وأنهي فيهم كبيرة.",
            how: R`الـ folding جاي من الـ language server أو من المسافات في أول السطر. Ctrl+K Ctrl+0 بيقفل كل المستويات، و Ctrl+K Ctrl+1 و 2 بيقفلوا مستوى معين بس.

الـ fold عرض بس، الملف نفسه متغيرش. والـ Sticky Scroll (أول سطر من الدالة بيفضل ثابت فوق وانت نازل) بيكمّله.`,
            when: "ملف طويل أول مرة تشوفه، أو JSON ضخم عايز تشوف مفاتيحه الكبيرة، أو review.",
            mistakes: "تقفل بلوك وتنسى، فتدوّر على كود «اختفى». السهم جنب رقم السطر بيقولك إن فيه حاجة مقفولة، و Ctrl+K Ctrl+J بيفتح كله."
          },
          teach: R`## الفكرة في سطر

**Fold** يعني تطوي بلوك (دالة، أو if، أو object) فيبان سطر واحد بدل عشرين. **Unfold** تفتحه. ده عرض بس، الملف نفسه مش بيتغير. نفك المثال.

---

## ١. اطوي وافتح البلوك اللي انت فيه

~~~text
Ctrl+Shift+[ / ]       Win / Linux: fold / unfold this block
Cmd+Option+[ / ]       Mac
~~~

- **Ctrl+Shift+[** (القوس اللي بيفتح): اطوي البلوك اللي فيه المؤشر.
- **Ctrl+Shift+]** (القوس اللي بيقفل): افتحه.

~~~text قبل
function getUser(id) {
  const user = db.find(id);
  if (!user) throw new Error("not found");
  return user;
}
~~~

~~~text بعد Ctrl+Shift+[ والمؤشر جوه الدالة
function getUser(id) {...
~~~

وجنب رقم السطر بيظهر سهم صغير يقولك إن فيه حاجة مطوية.

---

## ٢. اطوي الكل وافتح الكل

~~~text
Ctrl+K Ctrl+0          fold everything (Cmd+K Cmd+0)
Ctrl+K Ctrl+J          unfold everything (Cmd+K Cmd+J)
~~~

الاتنين chord: Ctrl+K وتسيب، وبعدين التاني. الـ **0** هنا (صفر) معناها «كل المستويات». بعدها الملف بيبان زي فهرس: سطر لكل دالة.

---

## ٣. اطوي مستوى معين

~~~text
Ctrl+K Ctrl+2          fold level 2 only: classes stay open, their methods fold
~~~

**level** يعني عمق البلوك:

~~~text المستويات
class UserService {          مستوى 1
  getUser(id) {              مستوى 2
    if (!id) {               مستوى 3
~~~

Ctrl+K Ctrl+2 بيطوي اللي في **مستوى 2** بس، فالـ class يفضل مفتوح وكل method جواه مطوية. فتشوف أسامي الـ methods. وفيه كمان Ctrl+K Ctrl+1 و Ctrl+K Ctrl+3 وهكذا.

---

## البلوك بيتحدد إزاي؟

من الـ language server لو موجود، وإلا من المسافات في أول السطور (indentation). فلو المسافات مش مظبوطة، الطي بيقفل حتة غريبة.

وتقدر تعمل منطقة بإيدك بالتعليقات:

~~~text
//#region helpers
...
//#endregion
~~~

---

## الخلاصة

| عايز | ويندوز / لينكس | ماك |
|---|---|---|
| اطوي البلوك | Ctrl+Shift+[ | Cmd+Option+[ |
| افتحه | Ctrl+Shift+] | Cmd+Option+] |
| اطوي الكل | Ctrl+K Ctrl+0 | Cmd+K Cmd+0 |
| افتح الكل | Ctrl+K Ctrl+J | Cmd+K Cmd+J |
| مستوى 2 بس | Ctrl+K Ctrl+2 | Cmd+K Cmd+2 |`,
          sol: R`Ctrl+K Ctrl+0 هيقفل كل البلوكات، وهتشوف الملف كسطر لكل دالة أو class وجنبه [[...]]، زي فهرس. روح على الدالة اللي تهمك و Ctrl+Shift+] هيفتحها هي بس. و Ctrl+K Ctrl+J يفتح كله.

لو Ctrl+Shift+[ مش شغال والكيبورد على العربي، الأقواس المربعة في الـ layout العربي على زراير تانية (الحروف «ج» و «د»)، حوّل للإنجليزي. وعلى الماك Cmd+Option+[ و ]. ولو الـ fold بيقفل حتة غريبة، يبقى الـ indentation في الملف مش مظبوط، والـ folding بالـ indentation مش بالأقواس.`
        },
        {
          cmd: "Emmet",
          title: "اكتب HTML و JSX باختصارات",
          desc: R`Emmet مدمج في VS Code: تكتب اختصار زي [[ul>li.item*3]] وتدوس Tab أو Enter على الاقتراح، فيتحول لـ ul فيها ٣ li بـ class. شغال في HTML و CSS، وفي JSX بيكتب [[className]] بدل [[class]].

[[>]] جوه، و [[+]] جنب، و [[*]] تكرار، و [[.]] class، و [[#]] id، و [[{}]] نص.`,
          example: R`div.card>h2+p          <div class="card"><h2></h2><p></p></div>
ul>li.item*3           a list with 3 items
button.btn{Save}       <button class="btn">Save</button>
Ctrl+Shift+P           Emmet: Wrap with Abbreviation (around a selection)`,
          try: "في ملف [[.tsx]] اكتب [[section.hero>h1{Hello}+p.lead+button.btn*2]] ودوس Tab. وجرّب Wrap with Abbreviation على ٣ سطور نص بـ [[ul>li*]].",
          flag: "keys",
          deep: {
            why: "HTML مليان أقواس وتكرار. كتابة لستة أو form بإيدك بطيئة وسهل تنسى قفلة tag.",
            how: R`VS Code بيعرض اختصار Emmet كاقتراح في لستة الاقتراحات وانت بتكتب، و Tab أو Enter بيفرده. في ملفات [[.jsx]] و [[.tsx]] شغال لوحده. في ملف [[.js]] فيه JSX محتاج إعداد: [[emmet.includeLanguages]] وفيه javascript بقيمة javascriptreact.

Wrap with Abbreviation بيلف الجزء المتحدد بـ tags: تحدد ٣ سطور نص وتكتب [[ul>li*]] فيبقى كل سطر li.`,
            when: "كتابة هيكل صفحة أو component أو form جديد.",
            mistakes: "تكتب اسم متغير في JSX فـ Emmet يقترح tag بنفس الاسم، وتدوس Enter فيتحول لـ [[<user></user>]]. بص على الاقتراح قبل Enter. ولو مضايقك، [[emmet.showExpandedAbbreviation]] بقيمة inMarkupAndStylesheetFilesOnly أو never."
          },
          teach: R`## الفكرة في سطر

**Emmet** لغة اختصارات صغيرة مدمجة في VS Code: تكتب سطر قصير بيوصف شكل الـ HTML، وتدوس Tab أو Enter على الاقتراح، فيتفرد HTML كامل. نفك رموزه الأول، وبعدين أمثلة الدرس.

---

## الرموز

| الرمز | معناه | مثال |
|---|---|---|
| [[>]] | جوه (ابن) | [[ul>li]] = li جوه ul |
| [[+]] | جنب (أخ) | [[h2+p]] = h2 وبعده p |
| [[*]] | كرر | [[li*3]] = ٣ li |
| [[.]] | class | [[div.card]] |
| [[#]] | id | [[div#main]] |
| [[{}]] | النص اللي جوه | [[button{Save}]] |

---

## ١. [[div.card>h2+p]]

~~~text
div.card>h2+p          <div class="card"><h2></h2><p></p></div>
~~~

اقراه من الشمال: div عليه class اسمه card، **جواه** h2، و**جنبه** p. شغلته بمكتبة emmet نفسها (نسخة 2، من Node على ويندوز 11) وطلع:

~~~text الناتج
<div class="card">
	<h2></h2>
	<p></p>
</div>
~~~

---

## ٢. [[ul>li.item*3]]

~~~text
ul>li.item*3           a list with 3 items
~~~

ul جواه li عليها class اسمه item، متكررة ٣ مرات:

~~~text الناتج
<ul>
	<li class="item"></li>
	<li class="item"></li>
	<li class="item"></li>
</ul>
~~~

---

## ٣. [[button.btn{Save}]]

~~~text
button.btn{Save}       <button class="btn">Save</button>
~~~

الأقواس المعووجة بتحط النص جوه الـ tag:

~~~text الناتج
<button class="btn">Save</button>
~~~

---

## ٤. Wrap with Abbreviation

~~~text
Ctrl+Shift+P           Emmet: Wrap with Abbreviation (around a selection)
~~~

ملوش اختصار افتراضي، فبتشغله من الـ Command Palette. بيلف **الكلام المتحدد** بـ tags. لو حددت ٣ سطور ([[Home]] و [[About]] و [[Contact]]) وكتبت [[ul>li*]] (النجمة من غير رقم = «سطر لكل سطر متحدد»):

~~~text الناتج (من نفس المكتبة)
<ul>
	<li>Home</li>
	<li>About</li>
	<li>Contact</li>
</ul>
~~~

---

## في JSX: className

في ملف [[.jsx]] أو [[.tsx]]، VS Code بيكتب [[className]] بدل [[class]]، لأن [[class]] كلمة محجوزة في JavaScript. شغلت نفس الاختصارات بإعداد JSX في المكتبة وطلع [[<div className="card">]].

---

## إمتى بيشتغل لوحده؟

| الملف | Emmet |
|---|---|
| [[.html]] و [[.css]] | شغال |
| [[.jsx]] و [[.tsx]] | شغال |
| [[.js]] فيه JSX | محتاج [[emmet.includeLanguages]] |

و Tab لوحده (من غير لستة الاقتراحات) مقفول افتراضيًا: الإعداد [[emmet.triggerExpansionOnTab]] قيمته الافتراضية [[false]].

---

## الخلاصة

~~~text
>  جوه     +  جنب     *  كرر
.  class   #  id      {} نص
Tab أو Enter على اقتراح «Emmet Abbreviation»
~~~

أي مسافة جوه الاختصار بتقطعه.`,
          sol: R`في [[.tsx]] الاختصار هيطلع في لستة الاقتراحات باسم «Emmet Abbreviation»، و Tab يقبله. الناتج:

[[<section className="hero">]] وجواه [[<h1>Hello</h1>]] و [[<p className="lead"></p>]] و زرارين [[<button className="btn"></button>]]. لاحظ [[className]] بدل [[class]]، لأن VS Code عارف إنه JSX. جربنا نفس الاختصار بمكتبة Emmet نفسها وطلع ده بالظبط. وفي Wrap with Abbreviation: حدد التلات سطور، Palette ثم «Emmet: Wrap with Abbreviation»، واكتب [[ul>li*]]: كل سطر هيبقى [[<li>]] جوه [[<ul>]].

لو Tab كتب مسافات بدل ما يوسّع، يبقى لستة الاقتراحات مظهرتش (ممكن بسبب extension تاني). استخدم Palette ثم «Emmet: Expand Abbreviation»، أو فعّل [[emmet.triggerExpansionOnTab]]، وده مقفول افتراضيًا. وافتكر إن الاختصار لازم يبقى من غير مسافات، أي مسافة بتقطعه.`
        }
      ]
    }
]);
