// تكملة تاب vscode: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vscode/01.js (شرح حقول الدرس في أوله)
MORE("vscode", [
    {
      t: "المحرر على مقاسك",
      l: 3,
      n: "اختصاراتك وقوالبك، وإعدادات منفصلة لكل نوع شغل ومتزامنة على كل أجهزتك",
      items: [
        {
          cmd: "keybindings.json",
          title: "اعمل اختصار لأي أمر، أو غيّر اختصار موجود",
          desc: R`Ctrl+K Ctrl+S بيفتح Keyboard Shortcuts: دوّر على أمر، ودبل كليك، واضغط الاختصار الجديد. كليك يمين على اختصار ثم Show Same Keybindings بيوريك لو فيه تعارض. والأيقونة فوق (Open Keyboard Shortcuts JSON) بتفتح الملف، وفيه تقدر تدّي الأمر [[args]] وشرط [[when]].

الملف ده بتاعك انت (User)، مش جوه المشروع.`,
          example: R`// keybindings.json (Ctrl+K Ctrl+S, then the file icon at the top)
[
  { "key": "ctrl+alt+r", "command": "workbench.action.terminal.runSelectedText", "when": "editorTextFocus" },
  { "key": "ctrl+shift+alt+t", "command": "workbench.action.tasks.runTask", "args": "typecheck" },
  { "key": "ctrl+alt+m", "command": "workbench.action.toggleMaximizedPanel" }
]`,
          try: "اعمل اختصار لـ Run Selected Text، وحدد سطر [[npm run build]] في README ودوسه.",
          flag: "script",
          deep: {
            why: "أمر بتستخدمه ١٠ مرات في اليوم ملوش اختصار، أو اختصار بيتعارض مع برنامج تاني.",
            how: R`كل entry فيها [[key]] و [[command]]، والـ ID بتاع الأمر بتلاقيه في Keyboard Shortcuts بكليك يمين ثم Copy Command ID. [[when]] بيحدد إمتى الاختصار يشتغل: [[editorTextFocus]] وانت في الكود، و [[terminalFocus]] وانت في الترمنال. فنفس المفتاح ممكن يعمل حاجتين في مكانين.

[[args]] بتبعت قيمة للأمر: اسم task، أو نص يتبعت للترمنال بـ [[workbench.action.terminal.sendSequence]] و [["args": { "text": "npm test\u000D" }]].

الأمر اللي قبله [[-]] بيشيل اختصار افتراضي، لو عايز تفضّي المفتاح لحاجة تانية.

الملف بيتزامن مع Settings Sync.`,
            when: "لما تلاقي نفسك بتفتح Command Palette لنفس الأمر كل شوية.",
            mistakes: "تختار Ctrl+Alt وحرف على كيبورد فيه AltGr (لغات أوروبية)، أو Ctrl+Alt+T على Ubuntu (بيفتح ترمنال)، فالنظام ياكله قبل VS Code. وتنسى الـ when فالاختصار يشتغل وانت في الترمنال ويعمل حاجة غريبة. أيقونة الكيبورد في Keyboard Shortcuts (Record Keys) تضغط المفتاح ويقولك مين واخده."
          },
          teach: R`## الملف ده لستة: «المفتاح ده يعمل الأمر ده»

كل حاجة في VS Code أمر ليه ID، حتى اللي ملوش اختصار. [[keybindings.json]] بيربط مفاتيح بأوامر. ومن Ctrl+K Ctrl+S تقدر تعمل ده بالماوس، بس الملف بيدّيك حاجتين زيادة: [[args]] (قيمة تتبعت للأمر) و [[when]] (شرط).

---

## ١. الملف فين

الملف ده بتاعك انت (User)، مش جوه المشروع، فمبيدخلش Git:

| النظام | المكان |
|---|---|
| ويندوز | [[%APPDATA%\Code\User\keybindings.json]] |
| لينكس | [[~/.config/Code/User/keybindings.json]] |
| الماك | [[~/Library/Application Support/Code/User/keybindings.json]] |

على الجهاز اللي اتجرّب عليه (ويندوز)، [[ls]] على [[%APPDATA%\Code\User]] طلّع فيه [[keybindings.json]] و [[settings.json]] وفولدر [[snippets]] وفولدر [[profiles]]. مكان لينكس والماك من الـ docs. ومش محتاج تحفظ المكان: الأيقونة فوق يمين في Keyboard Shortcuts (Open Keyboard Shortcuts JSON) بتفتحه.

---

## ٢. شكل الملف

~~~text
[
  { "key": "...", "command": "...", "when": "..." },
  ...
]
~~~

الأقواس المربعة لستة، وكل [[{ }]] اختصار واحد. والأول سطر تعليق [[//]]، وده مسموح لأن VS Code بيقرا ملفاته JSONC (JSON بتعليقات). (المثال اتعدّى على [[JSON.parse]] في Node بعد شيل التعليق واتقرا سليم.)

---

## ٣. الاختصار الأول

~~~text
{ "key": "ctrl+alt+r", "command": "workbench.action.terminal.runSelectedText", "when": "editorTextFocus" }
~~~

- [[key]]: المفاتيح بحروف صغيرة وبينهم [[+]]. وفي الماك [[cmd]] بدل [[ctrl]]. والاختصار اللي على مرحلتين بيتكتب بمسافة: [["ctrl+k ctrl+s"]].
- [[command]]: ID الأمر. اقراه حتة حتة: [[workbench]] (الواجهة) ثم [[action]] ثم [[terminal]] ثم [[runSelectedText]] (شغّل النص المحدد). مش محتاج تحفظ IDs: في Keyboard Shortcuts كليك يمين على أي أمر ثم Copy Command ID.
- [[when]]: **إمتى** الاختصار يشتغل. [[editorTextFocus]] يعني «الكيبورد في ملف كود». فلو انت في الترمنال أو في لوحة الملفات، Ctrl+Alt+R ميعملش حاجة، والمفتاح يفضل حر لأي حاجة تانية.

النتيجة: تحدد سطر زي [[npm run build]] في ملف، تدوس Ctrl+Alt+R، فيتبعت للترمنال المفتوح ويتنفّذ.

---

## ٤. الاختصار التاني: أمر بـ [[args]]

~~~text
{ "key": "ctrl+shift+alt+t", "command": "workbench.action.tasks.runTask", "args": "typecheck" }
~~~

[[runTask]] لوحده بيفتح لستة الـ tasks تختار منها. [[args]] بيبعتله اسم الـ task على طول، فبيشغّلها من غير لستة. و [[typecheck]] هنا هو نفس [[label]] اللي في [[tasks.json]] (الدرس اللي فات)، فلازم يتكتب زيه بالظبط.

### مثال تاني لـ [[args]]: تبعت نص للترمنال

~~~text
{ "key": "...", "command": "workbench.action.terminal.sendSequence", "args": { "text": "npm test\u000D" } }
~~~

[[sendSequence]] بيكتب [[text]] في الترمنال كأنك كتبته. و [[\u000D]] طريقة JSON لكتابة حرف برقم: [[000D]] بالـ hex يعني ١٣، وده حرف الـ Carriage Return، اللي هو زرار Enter. جربنا نقرا القيمة دي بـ [[JSON.parse]] في Node:

~~~text الناتج
"npm test\r" length: 9 last char code: 13
~~~

يعني ٨ حروف [[npm test]] وبعدهم حرف واحد رقمه ١٣ ([[\r]]): الأمر يتكتب ويتنفّذ.

---

## ٥. الاختصار التالت

~~~text
{ "key": "ctrl+alt+m", "command": "workbench.action.toggleMaximizedPanel" }
~~~

[[toggle]] يعني «لو مقفول افتحه ولو مفتوح اقفله». [[MaximizedPanel]] اللوحة اللي تحت (الترمنال) مكبّرة على الشاشة كلها. فدوسة تكبّرها ودوسة ترجّعها. ومفيش [[when]]، فبيشتغل من أي حتة.

---

## ٦. تشيل اختصار موجود

~~~text
{ "key": "ctrl+shift+k", "command": "-editor.action.deleteLines" }
~~~

الـ [[-]] قبل اسم الأمر معناها «شيل الربط ده». Ctrl+Shift+K افتراضيًا بيمسح السطر (درس Ctrl+Shift+K)، والسطر ده بيفضّيه لو عايزه لحاجة تانية. (السطر للتوضيح، مش في المثال.)

---

## الخلاصة

| المفتاح | معناه |
|---|---|
| [[key]] | المفاتيح، بحروف صغيرة و [[+]] |
| [[command]] | ID الأمر (Copy Command ID) |
| [[when]] | إمتى يشتغل ([[editorTextFocus]] و [[terminalFocus]]) |
| [[args]] | قيمة تتبعت للأمر |
| [[-command]] | شيل اختصار موجود |

> الملف ده في User مش في المشروع، و Settings Sync بيزامنه. ولو اختصار مش شغال، غالبًا [[when]] مش متحقق أو حد تاني واخد المفتاح (Record Keys في Keyboard Shortcuts بيقولك مين).`,
          lines: [
            "لستة الاختصارات.",
            "Ctrl+Alt+R وانت في الكود: ابعت السطر أو التحديد للترمنال.",
            "Ctrl+Shift+Alt+T: شغّل الـ task اللي اسمها typecheck.",
            "Ctrl+Alt+M: كبّر اللوحة اللي تحت (الترمنال) ورجّعها.",
            "نهاية اللستة."
          ],
          sol: R`بعد ما تحفظ الملف، حدد سطر [[npm run build]] في README (لازم ترمنال مفتوح) ودوس Ctrl+Alt+R: النص هيتبعت للترمنال ويتنفذ على طول، والـ build يبدأ.

لو محصلش حاجة، الـ README لازم يبقى عليه الـ focus، لأن [[when: editorTextFocus]]. ولو في Markdown preview، ده مش editor. ولو Keyboard Shortcuts قال إن الاختصار عليه أكتر من أمر (زرار «Show Same Keybindings»)، ممكن extension تاني واخده. وعلى ويندوز Ctrl+Alt يساوي AltGr في بعض الـ layouts (زي الأوروبية)، فممكن يكتب حرف بدل الاختصار. العربي غالبًا مش هيتأثر.`
        },
        {
          cmd: ".code-snippets",
          title: "قوالب كود بتكتبها بكلمة وتتنقل جواها بـ Tab",
          desc: R`Snippet قالب كود بتستدعيه بكلمة قصيرة (prefix): تكتب [[rfc]] و Tab فيتكتب component كامل، والمؤشر يقف على الاسم، و Tab تاني يروح للمكان الجاي. [[$1]] و [[$2]] أماكن الوقوف، و [[$__{1:Name}]] مكان وقوف فيه قيمة جاهزة، و [[$0]] آخر مكان.

من Command Palette: Snippets: Configure Snippets. تختار لغة (ليك انت بس)، أو New Snippets file for current folder فيتعمل ملف [[.code-snippets]] في [[.vscode]] للفريق.`,
          example: R`// .vscode/react.code-snippets
{
  "React component": {
    "scope": "typescriptreact",
    "prefix": "rfc",
    "body": [
      "export function $__{1:$__{TM_FILENAME_BASE}}() {",
      "  return <div className=\"$2\">$0</div>;",
      "}"
    ],
    "description": "Function component named after the file"
  }
}`,
          try: "اعمل snippet لـ Express route handler فيه try/catch، واستخدمه في ملف جديد، واتنقل بين أماكنه بـ Tab.",
          flag: "script",
          deep: {
            why: "الـ boilerplate اللي بتكتبه كل يوم (component، route، test) بياخد وقت وبتنسى حتة فيه. القالب بيكتبه صح كل مرة.",
            how: R`[[scope]] بيحدد اللغات، ومن غيره الـ snippet يظهر في كل اللغات. [[prefix]] الكلمة اللي بتكتبها، وبيظهر في لستة الاقتراحات. و [[body]] السطور، كل سطر string.

الأماكن: [[$1]] أول وقفة، و [[$2]] التانية، و [[$0]] آخر مكان للمؤشر. لو [[$1]] متكرر، الكتابة في واحد بتكتب في الكل. والمتغيرات زي [[TM_FILENAME_BASE]] (اسم الملف من غير امتداد) و [[CURRENT_YEAR]] و [[CLIPBOARD]] بتتملي لوحدها.

ملفات اللغات (زي [[typescriptreact.json]]) في User وبتتزامن مع Settings Sync. وملف [[.code-snippets]] في [[.vscode]] للمشروع ويدخل Git.`,
            when: "أي قالب بتكتبه أكتر من ٣ مرات في الأسبوع.",
            mistakes: R`تنسى [[scope]] فالـ snippet يطلع في ملفات CSS و Markdown. وتكتب [[$]] عادية في الكود (template string مثلًا) فتتفهم على إنها مكان وقوف: اكتبها [[\\$]]. وعلامة التنصيص جوه الـ body محتاجة [[\"]] لأن الملف JSON.`
          },
          teach: R`## الـ snippet قالب فيه أماكن فاضية بتتملي بـ Tab

بتكتب كلمة قصيرة ([[prefix]])، وتختارها من الاقتراحات أو تدوس Tab، فيتكتب مكانها كود كامل، والمؤشر يقف في أول مكان محتاج تكتب فيه. Tab تاني يوديك للمكان اللي بعده. الملف نفسه JSON، فهنفكّه مفتاح مفتاح، وبعدين نفك السطور اللي جوه [[body]] رمز رمز.

---

## ١. اسم الملف ومكانه

- [[.vscode/react.code-snippets]]: الامتداد [[.code-snippets]] معناه ملف snippets للمشروع. بيدخل Git، فالفريق كله ياخده. الاسم قبل الامتداد ([[react]]) على مزاجك.
- وفيه نوع تاني: ملف لكل لغة في User، زي [[typescriptreact.json]]، ليك انت بس. على الجهاز اللي اتجرّب عليه (ويندوز) مكانها فولدر [[%APPDATA%\Code\User\snippets]].

---

## ٢. المفاتيح

~~~text
"React component": {
  "scope": "typescriptreact",
  "prefix": "rfc",
  "body": [ ... ],
  "description": "Function component named after the file"
}
~~~

| المفتاح | معناه |
|---|---|
| [[React component]] | اسم الـ snippet. أي اسم، ولازم يبقى مختلف عن أي snippet تاني في الملف |
| [[scope]] | اللغات اللي يظهر فيها، مفصولة بفاصلة |
| [[prefix]] | الكلمة اللي بتكتبها عشان تستدعيه |
| [[body]] | الكود نفسه: لستة strings، كل string سطر |
| [[description]] | وصف بيظهر جنبه في لستة الاقتراحات |

[[scope]] بياخد **language ID** مش امتداد الملف:

| الملف | الـ language ID |
|---|---|
| [[.js]] | [[javascript]] |
| [[.jsx]] | [[javascriptreact]] |
| [[.ts]] | [[typescript]] |
| [[.tsx]] | [[typescriptreact]] |

ولو مش متأكد، بص على اسم اللغة تحت يمين في الـ status bar وانت فاتح الملف.

---

## ٣. السطر الأول من [[body]]: أماكن الوقوف

~~~text
"export function $__{1:$__{TM_FILENAME_BASE}}() {",
~~~

هنفكّه من جوه لبرة:

### [[$__{TM_FILENAME_BASE}]]: متغير

VS Code بيبدّله باسم الملف من غير الامتداد. لو الملف [[Button.tsx]]، القيمة [[Button]]. ومتغيرات تانية: [[TM_FILENAME]] (الاسم بالامتداد)، و [[CURRENT_YEAR]]، و [[CLIPBOARD]] (اللي في الـ clipboard).

### [[$__{1:...}]]: أول وقفة وفيها قيمة جاهزة

- [[$1]] لوحدها = أول مكان المؤشر يقف فيه (tabstop).
- [[$__{1:كلام}]] = نفس المكان، بس فيه كلام جاهز ومتحدد. لو عجبك دوس Tab وكمّل، ولو لأ اكتب فوقه.

فالسطر كله معناه: اكتب [[export function]]، وبعدها اسم الملف كقيمة جاهزة في أول وقفة، وبعدها [[() {]].

---

## ٤. السطر التاني: تنصيص جوه تنصيص

~~~text
"  return <div className=\"$2\">$0</div>;",
~~~

- السطر كله string في JSON، فبيبدأ وبيخلص بـ [["]]. عشان تكتب [["]] جواه لازم [[\"]]، وإلا JSON هيفتكر الـ string خلص.
- [[$2]] الوقفة التانية: جوه [[className]].
- [[$0]] **آخر** مكان المؤشر يروحله، بعد كل الوقفات. هنا جوه الـ [[div]].

والسطر التالت [["}"]] قفلة الدالة. والمسافتين في أول السطر التاني بيتكتبوا زي ما هم (الـ indent).

---

## ٥. النتيجة

في ملف اسمه [[Button.tsx]]، تكتب [[rfc]] وتختاره، فالمفروض يطلع ده (حسب توثيق الـ snippets، و [[|]] مكان المؤشر في الآخر):

~~~text
export function Button() {
  return <div className="">|</div>;
}
~~~

وترتيب الوقفات:

| الدوسة | المؤشر فين |
|---|---|
| بعد ما يتكتب | على [[Button]] ومتحدد ([[$1]]) |
| Tab | جوه [[className]] ([[$2]]) |
| Tab | جوه الـ [[div]] ([[$0]]) وخلاص |

---

## ٦. الحل (solCode): وقفة فيها اختيارات

~~~text
"router.$__{1|get,post,put,patch,delete|}('/$__{2:path}', async (req, res, next) => {",
~~~

- [[$__{1|get,post,put,patch,delete|}]] شكل جديد: **choice**. الخطوط [[|]] حوالين لستة مفصولة بفاصلة، فأول وقفة بتفتح قايمة تختار منها method.
- [[$__{2:path}]] الوقفة التانية وفيها كلمة [[path]] جاهزة تكتب فوقها.
- الباقي Express عادي: [[router.get('/path', ...)]] بيعرّف route، و [[async (req, res, next) => {...}]] الدالة اللي بتتنفّذ: [[req]] الطلب، و [[res]] الرد، و [[next]] اللي بيعدّي للـ middleware اللي بعده.

~~~text
"  try {",
"    $0",
"    res.json({ ok: true });",
"  } catch (err) {",
"    next(err);",
"  }",
~~~

- [[try { ... } catch (err) { ... }]]: لو حصل غلط جوه [[try]]، التنفيذ ينط لـ [[catch]] والغلط في [[err]].
- [[$0]] جوه [[try]]: المؤشر بيخلص هناك عشان تكتب الكود الحقيقي.
- [[res.json({ ok: true })]] بيرد بـ JSON.
- [[next(err)]] بيبعت الغلط لـ error handler بتاع Express بدل ما السيرفر يقع أو الطلب يفضل معلّق.
- [[scope]] هنا [["javascript,typescript"]]: لغتين بفاصلة.

> الملفين (المثال والحل) اتعدّوا على [[JSON.parse]] في Node واتقروا سليم.

---

## الخلاصة

| الرمز | معناه |
|---|---|
| [[$1]] و [[$2]] | أماكن الوقوف بالترتيب |
| [[$__{1:كلام}]] | وقفة فيها قيمة جاهزة |
| [[$__{1]] واختيارات بين خطين عموديين | وقفة فيها قايمة اختيارات (زي الحل) |
| [[$0]] | آخر مكان للمؤشر |
| [[$__{TM_FILENAME_BASE}]] | متغير: اسم الملف من غير امتداد |
| [[\"]] | تنصيص جوه string في JSON |

> [[scope]] بالـ language ID ([[typescriptreact]] مش [[tsx]])، ولو عايز علامة [[$]] عادية في الكود اكتبها [[\\$]].`,
          lines: [
            "بداية الملف.",
            "اسم الـ snippet.",
            "في ملفات tsx بس.",
            "اكتب rfc واختاره من الاقتراحات.",
            "السطور:",
            "الاسم أول وقفة، وقيمته الجاهزة اسم الملف.",
            "الوقفة التانية الـ className، وآخر مكان جوه الـ div.",
            "قفلة الدالة.",
            "نهاية السطور.",
            "الوصف اللي بيظهر في لستة الاقتراحات.",
            "نهاية الـ snippet.",
            "نهاية الملف."
          ],
          sol: R`اعمل ملف [[.vscode/express.code-snippets]] بالمحتوى اللي تحت. في أي ملف [[.js]] أو [[.ts]] اكتب [[exroute]]، هيظهر في الاقتراحات، و Tab يكتب الـ handler: أول وقفة لستة تختار منها [[get]] أو [[post]]، و Tab يوديك للمسار، و Tab تاني يوديك جوه [[try]] مكان [[$0]].

لو الـ snippet مظهرش: اتأكد إن الـ [[scope]] فيه اللغة الصح (ملفات [[.ts]] اسمها [[typescript]]، و [[.tsx]] اسمها [[typescriptreact]])، وإن الـ JSON صح (أي فاصلة ناقصة بتلغي الملف كله من غير رسالة واضحة). والـ backslash قبل علامة التنصيص جوه body لازم يبقى [[\"]]، وده اللي بيبوظ ناس كتير.`,
          solCode: R`{
  "Express route handler": {
    "scope": "javascript,typescript",
    "prefix": "exroute",
    "body": [
      "router.$__{1|get,post,put,patch,delete|}('/$__{2:path}', async (req, res, next) => {",
      "  try {",
      "    $0",
      "    res.json({ ok: true });",
      "  } catch (err) {",
      "    next(err);",
      "  }",
      "});"
    ],
    "description": "Express route with try/catch that forwards errors to next()"
  }
}`
        },
        {
          cmd: "Profiles",
          title: "إعدادات و extensions منفصلة لكل نوع شغل",
          desc: R`Profile مجموعة إعدادات و extensions واختصارات و snippets لوحدها. تعمل profile للشغل اليومي، وواحد للشرح (خط كبير، extensions قليلة، من غير AI)، وواحد لـ Python. وكل فولدر بيفتكر الـ profile اللي اتفتح بيه.

و Settings Sync (من أيقونة الحساب تحت على الشمال، Backup and Sync Settings) بيرفع كل ده على حسابك في GitHub أو Microsoft، فأي جهاز جديد يسجّل دخول ياخد نفس الإعدادات والـ extensions والـ profiles.`,
          example: R`Ctrl+Shift+P                   Profiles: New Profile...
gear icon (bottom left)        Profiles: switch, export, import
code --profile "Teaching" .    open a folder with a given profile
account icon (bottom left)     Backup and Sync Settings...`,
          try: "اعمل profile اسمه Teaching فاضي، كبّر فيه الخط وسطّب ٣ extensions بس، وافتح بيه فولدر بـ [[code --profile Teaching .]].",
          flag: "keys",
          deep: {
            why: "٤٠ extension لكل اللغات شغالين في كل مشروع بيبطّأوا المحرر وبيزحموا الاقتراحات. ووقت الشرح، إعداداتك الشخصية (خط صغير، AI بيقترح) بتشتت اللي بيتفرج.",
            how: R`الـ profile الجديد ممكن يبدأ فاضي، أو نسخة من الحالي، أو من template جاهز (Python أو Node مثلًا). وتقدر تخلي حاجات مشتركة بين كل الـ profiles وحاجات خاصة بكل واحد.

Export بيطلّع ملف أو gist، ودي طريقة حلوة تدّي إعداد جاهز لطلبة أو لزميل.

Settings Sync بيزامن الإعدادات والاختصارات والـ snippets والـ extensions والـ profiles. والإعدادات الخاصة بجهاز معين (مسارات مثلًا) تستثنيها بـ [[settingsSync.ignoredSettings]].`,
            when: "أكتر من نوع شغل على نفس الجهاز، أو أكتر من جهاز، أو قبل ما تفرمت.",
            mistakes: "تسطّب extension وانت في profile غلط وتدوّر عليها في التاني: اسم الـ profile بيظهر على أيقونة الترس تحت. وتشغّل Sync على جهاز شغل فيه إعدادات proxy أو مسارات خاصة، فتتنقل لجهازك الشخصي وتبوّظه."
          },
          teach: R`## الـ Profile نسخة كاملة من «VS Code بتاعك»

تخيل إن عندك أكتر من VS Code على نفس الجهاز، كل واحد بإعداداته واختصاراته و extensions بتاعته. ده بالظبط الـ Profile، وتتنقل بينهم من غير ما تسطّب حاجة تاني. والمثال مش أوامر ترمنال (ما عدا سطر)، ده أماكن في المحرر، فهنمشي عليه سطر سطر.

---

## ١. الـ profile جواه إيه؟

| الحاجة | يعني |
|---|---|
| Settings | [[settings.json]]: الخط والثيم وكل الإعدادات |
| Keyboard Shortcuts | [[keybindings.json]] |
| Snippets | قوالب الكود |
| Extensions | اللي متسطّب ومتفعّل |
| Tasks | الـ tasks العامة بتاعتك (مش اللي في المشروع) |
| UI State | ترتيب اللوحات والحاجات المفتوحة |

والـ profile الأساسي اسمه **Default**. على الجهاز اللي اتجرّب عليه (ويندوز)، الـ profiles التانية متخزنة في فولدر [[%APPDATA%\Code\User\profiles]] جنب [[settings.json]] بتاع الـ Default.

---

## ٢. سطور المثال

### [[Ctrl+Shift+P]] ثم [[Profiles: New Profile...]]

بيفتح شاشة إنشاء profile: تديله اسم وأيقونة، وتختار يبدأ منين: فاضي، أو نسخة من الحالي، أو template جاهز (زي Python أو Node.js). ولكل حاجة من الجدول فوق تختار: خاصة بالـ profile ده، ولا مشتركة مع الـ Default.

### أيقونة الترس تحت على الشمال ثم Profiles

منها تتنقل بين الـ profiles، وتعمل Export (ملف أو GitHub gist تديه لحد) و Import. والـ profile الحالي اسمه بيظهر على الترس، فتعرف انت فين.

### [[code --profile "Teaching" .]]

السطر الوحيد اللي من الترمنال. نفكّه:

- [[code]] الأمر اللي بيفتح VS Code (درس [[code .]]).
- [[--profile "Teaching"]] افتح بالـ profile اللي اسمه Teaching. التنصيص لازم لو الاسم فيه مسافة.
- [[.]] الفولدر الحالي.

ده شرحه في [[code --help]] (اتشغّل على VS Code 1.140 على ويندوز):

~~~text الناتج (جزء)
  --profile <profileName>                    Opens the provided folder or
                                             workspace with the given profile
                                             and associates the profile with
                                             the workspace. If the profile does
                                             not exist, a new empty one is
                                             created.
~~~

فيه حاجتين مهمين في الكلام ده:

1. **associates**: الفولدر بيفتكر الـ profile ده. المرة الجاية تفتحه عادي هيفتح بـ Teaching.
2. **If the profile does not exist, a new empty one is created**: لو كتبت الاسم غلط ([[teaching]] بحرف صغير مثلًا)، مش هيقولك غلط، هيعمل profile جديد فاضي.

(الأمر نفسه ما اتشغّلش هنا لأنه بيفتح شباك ويعمل profile، والكلام عن الشباك من الـ docs.)

### أيقونة الحساب ثم [[Backup and Sync Settings...]]

ده Settings Sync: بتسجّل دخول بحساب GitHub أو Microsoft، فإعداداتك والـ profiles والـ extensions تترفع، وأي جهاز تاني تسجّل عليه بنفس الحساب ياخدهم. ولو فيه إعداد خاص بالجهاز ده (مسار مثلًا)، ضيفه في [[settingsSync.ignoredSettings]] عشان ميتنقلش.

---

## الخلاصة

| عايز | اعمل |
|---|---|
| profile جديد | [[Profiles: New Profile...]] |
| تتنقل أو تعمل Export | الترس تحت شمال ثم Profiles |
| تفتح فولدر بـ profile معين | [[code --profile "اسم" .]] |
| نفس الإعدادات على كل أجهزتك | Backup and Sync Settings |

> الـ extension اللي بتسطّبها بتتسطب في الـ profile اللي انت فيه بس. ولو مش لاقيها، بص على اسم الـ profile على الترس.`,
          sol: R`بعد [[code --profile Teaching .]] هيفتح شباك جديد والترس تحت شمال عليه اختصار اسم الـ profile. الخط الكبير والـ ٣ extensions بس هيبانوا، ولو فتحت شباك عادي هتلاقي إعداداتك القديمة زي ما هي.

لو الأمر عمل profile جديد فاضي باسم مختلف، يبقى الاسم مش مطابق بالظبط (الحروف الكابيتال والمسافات فارقة)، واللي فيه مسافة لازم بين علامات تنصيص. ولو فتح الفولدر في شباك موجود بالـ profile القديم، اقفل الشباك ده الأول، لأن VS Code بيربط الفولدر بآخر profile اتفتح بيه.`
        }
      ]
    },
    {
      t: "الشغل على جهاز تاني",
      l: 3,
      n: "VS Code على جهازك والكود في WSL أو على سيرفر أو جوه container، والإحساس كأنه محلي",
      items: [
        {
          cmd: "Remote-SSH",
          title: "افتح فولدر على سيرفر كأنه على جهازك",
          desc: R`extension اسمها Remote - SSH: من Command Palette تختار Remote-SSH: Connect to Host، وهي بتقرا [[~/.ssh/config]] فالسيرفرات اللي عرّفتها بتظهر بالاسم (تاب ssh config، درس «الأدوات بتقرا الملف»). بعد الاتصال، الملفات والترمنال والـ extensions كلها على السيرفر.

ونفس الفكرة بالظبط لـ WSL: [[code .]] من Ubuntu بيفتح VS Code متوصل بلينكس (تاب WSL، درس «VS Code»).`,
          example: R`code --remote ssh-remote+prod /var/www/myapp
code --remote wsl+Ubuntu /home/you/projects/myapp
ssh prod 'du -sh ~/.vscode-server'`,
          try: "عرّف سيرفر التجربة في [[~/.ssh/config]] واتصل بيه من Remote-SSH، وافتح [[/var/log]] واقرا لوج من المحرر.",
          deep: {
            why: "تعديل config أو قراية لوج على السيرفر بـ nano مرهق، ونقل الملفات رايح جاي بـ scp بطيء وبيغلط.",
            how: R`أول اتصال، VS Code بينزّل برنامج صغير (VS Code Server) في [[~/.vscode-server]] على السيرفر ويشغّله. الواجهة عندك والباقي هناك: الـ extensions اللي بتقرا الكود (ESLint، TypeScript) بتتسطّب على السيرفر، والثيم والخط عندك. والركن تحت على الشمال بيقول [[SSH: prod]].

الترمنال المدمج بيبقى shell على السيرفر، والبورتات بتتحوّل لجهازك لوحدها (درس Ports).

السيرفر محتاج Linux عادي (x64 أو ARM) ومساحة ورام: الـ server و TypeScript ممكن ياخدوا مئات الميجا.`,
            when: "إعداد سيرفر، وقراية لوجات، وتعديل configs، أو شغل على جهاز أقوى من جهازك.",
            mistakes: "تعدّل كود الإنتاج مباشرة على السيرفر بدل Git وتنسى، فأول deploy يمسح تعديلك: استخدمه للقراية والـ configs. وسيرفر رامه ١ جيجا: الـ TypeScript server ممكن ياكل الرام ويوقّع التطبيق نفسه. وتسطّب extensions تقيلة على سيرفر الإنتاج."
          },
          teach: R`## الواجهة عندك، والملفات والترمنال على الجهاز التاني

Remote-SSH بيخلي VS Code اللي على جهازك يشتغل على ملفات سيرفر. انت شايف المحرر عادي، بس كل ملف بتفتحه وكل أمر في الترمنال بيحصل على السيرفر. والمثال ٣ سطور من الترمنال: اتنين بيفتحوا فولدر بعيد، وواحد بيقيس الحاجة اللي VS Code بيسيبها هناك.

---

## ١. اسم السيرفر جاي منين: [[~/.ssh/config]]

السطر الأول بيقول [[prod]]، ودي مش عنوان، ده اسم مستعار متعرّف في ملف [[~/.ssh/config]] (تاب ssh config). شكله كده:

~~~text ~/.ssh/config
Host prod
    HostName 203.0.113.10
    User deploy
~~~

- [[~]] فولدر اليوزر بتاعك ([[C:\Users\you]] على ويندوز).
- [[Host prod]] الاسم اللي هتكتبه.
- [[HostName]] العنوان الحقيقي، و [[User]] اليوزر اللي هتدخل بيه.

و Remote-SSH بيقرا الملف ده، فكل [[Host]] بيظهر في Connect to Host بالاسم.

---

## ٢. [[code --remote ssh-remote+prod /var/www/myapp]]

| الحتة | معناها |
|---|---|
| [[code]] | أمر VS Code من الترمنال |
| [[--remote]] | افتح على جهاز بعيد مش هنا |
| [[ssh-remote+prod]] | نوع الاتصال ([[ssh-remote]]) و [[+]] وبعدها اسم الـ Host |
| [[/var/www/myapp]] | المسار **على السيرفر**، مش على جهازك |

[[--remote]] مش ظاهر في لستة [[code --help]] (جربناها على 1.140)، بس هو موثّق في docs بتاعة Remote Development، ومحتاج extension الـ Remote - SSH تكون متسطّبة. والأمر ما اتشغّلش هنا لأنه بيفتح شباك ومحتاج سيرفر.

### إيه اللي بيحصل أول مرة

1. VS Code بيعمل SSH للسيرفر بنفس طريقة [[ssh prod]].
2. بينزّل برنامج صغير اسمه **VS Code Server** في [[~/.vscode-server]] على السيرفر ويشغّله.
3. الواجهة عندك بتكلّم السيرفر ده، والركن تحت شمال يبقى [[SSH: prod]].

| بيشتغل عندك | بيشتغل على السيرفر |
|---|---|
| الثيم والخط والاختصارات | الملفات والبحث فيها |
| extensions الشكل (الثيمات) | extensions اللغات (ESLint و TypeScript) |
| | الترمنال المدمج والـ debugger |

---

## ٣. [[code --remote wsl+Ubuntu /home/you/projects/myapp]]

نفس الفكرة بالظبط، بس الجهاز التاني هو لينكس اللي جوه WSL: [[wsl]] بدل [[ssh-remote]]، و [[Ubuntu]] اسم التوزيعة. الاسم لازم يطابق اللي بيطلع من:

~~~powershell
wsl -l -q
~~~

[[-l]] يعني list و [[-q]] يعني quiet (الأسامي بس). على الجهاز اللي اتجرّب عليه طلع:

~~~text الناتج
docker-desktop
~~~

يعني مفيش توزيعة اسمها Ubuntu هنا، فالسطر ده على الجهاز ده هيفشل. على جهازك اكتب الاسم اللي يطلعلك. ومن جوه WSL نفسه، [[code .]] بيعمل نفس الحاجة أسهل.

---

## ٤. [[ssh prod 'du -sh ~/.vscode-server']]

- [[ssh prod 'أمر']] بينفّذ الأمر على السيرفر ويرجّعلك الناتج، من غير ما تفتح shell هناك.
- التنصيص المفرد [[' ']] مهم: من غيره، الـ shell بتاعك هيبدّل [[~]] بفولدرك **انت** قبل ما الأمر يتبعت. بالتنصيص، الـ [[~]] بتتفهم على السيرفر.
- [[du]] اختصار disk usage: المساحة اللي فولدر واخدها. [[-s]] (summary) رقم واحد للفولدر كله بدل كل فولدر جواه، و [[-h]] (human) بالـ M و G بدل الـ bytes.

مفيش سيرفر هنا، فده نفس الأمر على فولدر تاني جوه [[ubuntu:24.04]] في Docker عشان تشوف شكل الناتج:

~~~bash
du -sh /usr/share/doc
~~~

~~~text الناتج
2.3M	/usr/share/doc
~~~

الرقم والوحدة، وبعدها tab والمسار. على سيرفر عليه VS Code Server غالبًا هتلاقي مئات الميجا، لأن كل تحديث لـ VS Code بينزّل نسخة جديدة، والـ extensions بتتسطب هناك.

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[code --remote ssh-remote+prod <path>]] | فولدر على سيرفر من [[~/.ssh/config]] |
| [[code --remote wsl+Ubuntu <path>]] | فولدر جوه توزيعة WSL |
| [[ssh prod 'du -sh ~/.vscode-server']] | VS Code Server واخد كام على السيرفر |

> المحرر عندك والشغل كله هناك. والسيرفر الضعيف (١ جيجا رام) ممكن يتعب من VS Code Server و TypeScript، فاستخدمه للـ configs واللوجات مش لتطوير تقيل على الإنتاج.`,
          lines: [
            "افتح فولدر على السيرفر prod (الاسم من ~/.ssh/config).",
            "نفس الحكاية لتوزيعة WSL اسمها Ubuntu.",
            "الـ VS Code Server واخد مساحة قد إيه على السيرفر."
          ],
          sol: R`بعد Connect to Host واختيار السيرفر، أول مرة هيسطّب VS Code Server هناك (بياخد دقيقة) وتحت شمال هيبقى [[SSH: prod]]. File ثم Open Folder واكتب [[/var/log]]. افتح [[auth.log]] أو [[nginx/access.log]] وهتلاقي السطور في المحرر عادي، و Ctrl+F شغال.

لو ظهر [[EACCES: permission denied]] وانت بتفتح لوج، ده لأن معظم اللوجات مملوكة لـ root أو جروب [[adm]]. ضيف يوزرك للجروب بـ [[sudo usermod -aG adm deploy]] وادخل تاني، أو اقراه من الترمنال بـ [[sudo less]]. ولو الاتصال فشل من VS Code ونجح من الترمنال، غالبًا VS Code بيقرا ملف config تاني، شوف [[remote.SSH.configFile]].`
        },
        {
          cmd: "devcontainer.json",
          title: "بيئة التطوير كلها جوه container بملف",
          desc: R`[[.devcontainer/devcontainer.json]] بيوصف بيئة التطوير: image فيها Node بالنسخة الصح، والـ extensions، والبورتات، والأمر اللي يشتغل بعد الإنشاء. extension اسمها Dev Containers فيها Reopen in Container، فـ VS Code يبني الـ container ويفتح المشروع جواه.

أي حد عنده Docker يفتح المشروع ويبقى عنده نفس البيئة بالظبط.`,
          example: R`// .devcontainer/devcontainer.json
{
  "name": "myapp",
  "image": "mcr.microsoft.com/devcontainers/typescript-node:22",
  "forwardPorts": [3000],
  "postCreateCommand": "npm ci",
  "customizations": {
    "vscode": { "extensions": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"] }
  }
}`,
          try: "في مشروع صغير: Dev Containers: Add Dev Container Configuration Files، اختار Node، وبعدين Reopen in Container، وشغّل [[node -v]] في الترمنال.",
          flag: "script",
          deep: {
            why: "«عندي شغال»: نسخة Node مختلفة، أو أداة مش متسطّبة، أو مشاكل ويندوز. الـ container بيوحّد البيئة للكل.",
            how: R`VS Code بيعمل container من الـ image (أو من Dockerfile أو docker-compose لو حددت)، وبيربط فولدر المشروع جواه، وبيشغّل VS Code Server جواه زي Remote-SSH بالظبط. الترمنال جوه الـ container، و [[npm ci]] بيتنفذ هناك.

[[customizations.vscode.extensions]] بتتسطّب فعلًا، مش اقتراح زي extensions.json. و [[forwardPorts]] بيحوّل البورت لجهازك.

على ويندوز، أسرع لما المشروع يبقى جوه WSL مش على C: (نفس السبب اللي في تاب WSL).

لو غيّرت الملف: Dev Containers: Rebuild Container.`,
            when: "مشروع فيه أدوات كتير أو نسخ محددة، أو فريق على أنظمة مختلفة، أو onboarding سريع.",
            mistakes: "تنسى Rebuild بعد تعديل الملف وتستغرب إن مفيش حاجة اتغيرت. وتحط أسرار في devcontainer.json وهو داخل Git. و Docker Desktop مش شغال فيفشل برسالة مش واضحة: شوف الـ log اللي بيفتحه."
          },
          teach: R`## الملف ده بيوصف «جهاز التطوير» نفسه

بدل ما كل واحد في الفريق يسطّب Node بنسخة مختلفة وأدوات مختلفة، [[devcontainer.json]] بيقول: «اشتغلوا جوه container من الـ image دي، وسطّبوا الحاجات دي». و VS Code (بـ extension اسمها Dev Containers) بيبني الـ container ويفتح المشروع جواه. هنفك الملف مفتاح مفتاح.

---

## ١. المكان

~~~text
myapp/
  .devcontainer/
    devcontainer.json
  package.json
~~~

فولدر [[.devcontainer]] في جذر المشروع، وبيدخل Git. والسطر الأول تعليق [[//]] مسموح لأن الملف JSONC. (اتعدّى على [[JSON.parse]] في Node بعد شيل التعليق واتقرا سليم.)

---

## ٢. [[name]] و [[image]]

~~~text
"name": "myapp",
"image": "mcr.microsoft.com/devcontainers/typescript-node:22",
~~~

[[name]] اسم بيظهر في VS Code بس. أما [[image]] فده أهم سطر. نفك اسم الـ image:

| الحتة | معناها |
|---|---|
| [[mcr.microsoft.com]] | الـ registry: المخزن اللي الـ image متشالة فيه (Microsoft Container Registry) |
| [[devcontainers/typescript-node]] | اسم الـ image: Node و TypeScript وأدوات زي git |
| [[:22]] | الـ tag: النسخة، هنا Node 22 |

اتأكدنا إن الـ tag ده موجود من غير ما ننزّل الـ image (هي كبيرة)، بـ [[docker manifest inspect]] اللي بيسأل الـ registry بس:

~~~powershell
docker manifest inspect mcr.microsoft.com/devcontainers/typescript-node:22
~~~

~~~text الناتج (أوله)
{
   "schemaVersion": 2,
   "mediaType": "application/vnd.oci.image.index.v1+json",
   "manifests": [
      {
         "platform": {
            "architecture": "amd64",
            "os": "linux"
~~~

يعني الـ image موجودة، ومنها نسخة لـ [[amd64]] (أجهزة Intel و AMD العادية). ولو الـ tag غلط (جربنا [[:999]]) بيقول:

~~~text الناتج
no such manifest: mcr.microsoft.com/devcontainers/typescript-node:999
~~~

---

## ٣. [[forwardPorts]]

~~~text
"forwardPorts": [3000],
~~~

السيرفر جوه الـ container بيسمع على 3000، بس الـ container شبكة لوحده. [[forwardPorts]] بيوصّل [[localhost:3000]] عندك ببورت 3000 جوه الـ container، فتفتح المتصفح عادي. اللستة ممكن يبقى فيها أكتر من بورت: [[[3000, 5432]]].

---

## ٤. [[postCreateCommand]]

~~~text
"postCreateCommand": "npm ci",
~~~

أمر بيتنفّذ **مرة واحدة** بعد ما الـ container يتعمل، جواه. و [[npm ci]] (ci = clean install) بيسطّب الـ dependencies بالظبط زي [[package-lock.json]]، وبيمسح [[node_modules]] الأول. أنسب من [[npm install]] هنا لأنه مبيغيّرش الـ lock file، فالكل ياخد نفس النسخ.

---

## ٥. [[customizations]]

~~~text
"customizations": {
  "vscode": { "extensions": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"] }
}
~~~

- [[customizations]] إعدادات لكل أداة لوحدها، و [[vscode]] اللي تخص VS Code.
- [[extensions]] IDs بشكل [[publisher.name]]: [[dbaeumer]] الناشر و [[vscode-eslint]] الاسم.

الـ IDs دي حقيقية: الاتنين ظاهرين في [[code --list-extensions]] على الجهاز اللي اتجرّب عليه. والفرق عن [[.vscode/extensions.json]] إن ده **بيسطّب** فعلًا جوه الـ container، مش بيقترح بس.

---

## ٦. اللي بيحصل لما تدوس Reopen in Container

1. VS Code بينزّل الـ image لو مش موجودة، ويعمل منها container.
2. بيربط فولدر المشروع جوه الـ container، فالتعديل في ناحية يبان في التانية.
3. بيشغّل VS Code Server جواه (نفس فكرة Remote-SSH)، ويسطّب الـ extensions.
4. بيشغّل [[postCreateCommand]].
5. الترمنال المدمج يبقى جوه الـ container: [[node -v]] يطبع نسخة الـ image مش نسخة جهازك.

(الخطوات دي من docs بتاعة Dev Containers. ما بنيناش container هنا عشان منسيبش image كبيرة على الجهاز.)

---

## الخلاصة

| المفتاح | بيعمل إيه |
|---|---|
| [[image]] | البيئة نفسها: registry ثم اسم ثم [[:tag]] |
| [[forwardPorts]] | بورتات الـ container توصل لـ [[localhost]] |
| [[postCreateCommand]] | أمر مرة واحدة بعد الإنشاء ([[npm ci]]) |
| [[customizations.vscode.extensions]] | extensions تتسطّب جوه |

> أي تعديل في الملف محتاج Dev Containers: Rebuild Container، وإلا هتفضل شغال على الـ container القديم.`,
          lines: [
            "بداية الملف.",
            "اسم البيئة.",
            "image فيها Node 22 و TypeScript وأدوات أساسية.",
            "حوّل بورت 3000 لجهازك.",
            "بعد ما الـ container يتعمل أول مرة، سطّب الـ dependencies.",
            "إعدادات خاصة بالأدوات:",
            "extensions تتسطّب جوه الـ container.",
            "نهاية customizations.",
            "نهاية الملف."
          ],
          sol: R`بعد Reopen in Container، أول مرة هيبني الـ container (بياخد دقايق، وتقدر تشوف اللوج)، وبعدين تحت شمال هيبقى [[Dev Container: ...]]. [[node -v]] في الترمنال هيطبع النسخة اللي في الـ image، زي [[v22.x.x]] لو [[typescript-node:22]]، حتى لو جهازك عليه نسخة تانية أو مفيش node خالص. وده بالظبط الهدف.

لو فشل بـ «Docker is not running» أو «Cannot connect to the Docker daemon»، شغّل Docker Desktop الأول. ولو [[node -v]] طلع نسخة جهازك، يبقى الترمنال ده مفتوح من قبل ما تدخل الـ container. افتح ترمنال جديد. والـ wizard ممكن يختار نسخة Node أحدث من المثال، عادي.`
        },
        {
          cmd: ".code-workspace",
          title: "فولدرات كتير في شباك واحد لـ monorepo",
          desc: R`Multi-root workspace: شباك VS Code فيه أكتر من فولدر كجذور منفصلة، كل واحد ليه إعداداته. File ثم Add Folder to Workspace، أو [[code --add apps/api]] من الترمنال، وبعدين Save Workspace As يعمل ملف [[.code-workspace]] تفتحه بعد كده بـ [[code myapp.code-workspace]].

مفيد لـ monorepo (frontend و API و shared)، أو مشروعين في repos مختلفة بتشتغل عليهم مع بعض.`,
          example: R`// myapp.code-workspace
{
  "folders": [
    { "path": "apps/web", "name": "web" },
    { "path": "apps/api", "name": "api" },
    { "path": "packages/shared" }
  ],
  "settings": { "search.exclude": { "**/dist": true } }
}`,
          try: R`لو عندك frontend و backend في فولدرين، اعمل workspace فيه الاتنين، واحفظه، واقفل وافتح بـ [[code myapp.code-workspace]].`,
          flag: "script",
          deep: {
            why: "في monorepo، فتح الجذر كله ممكن يلخبط ESLint و TypeScript في أنهي config لأنهي فولدر، والبحث بيجيب من كل حتة. وفتح كل فولدر في شباك معناه ٣ شبابيك.",
            how: R`كل فولدر في [[folders]] بيبقى جذر: Ctrl+P بيكتب اسمه جنب الملف، والبحث تقدر تحصره فيه، وكل واحد ممكن يبقى ليه [[.vscode/settings.json]] لوحده. والـ [[settings]] في ملف الـ workspace بتسري على الكل.

ملف الـ workspace ممكن يبقى فيه [[launch]] و [[tasks]] و [[extensions]] كمان، لو عايز debug config يغطي فولدرين.

المسارات نسبية لمكان الملف، فحطه في جذر الـ repo واعمله commit لو الفريق كله بيستخدمه.`,
            when: "monorepo فيه أكتر من تطبيق، أو repos منفصلة بتتعدّل مع بعض.",
            mistakes: "تفتح الـ repo مرة كفولدر عادي ومرة كـ workspace، فالإعدادات تبان مختلفة: في حالة الـ workspace، إعدادات Workspace جاية من ملف [[.code-workspace]] مش من [[.vscode/settings.json]] اللي في الجذر. وتكتب مسارات مطلقة ([[C:\\Users\\you\\...]]) فالملف ميشتغلش عند غيرك."
          },
          teach: R`## شباك واحد، وكذا فولدر كل واحد جذر لوحده

العادي إن شباك VS Code بيفتح فولدر واحد. الـ **multi-root workspace** شباك فيه أكتر من فولدر، وكل واحد بيتعامل كمشروع مستقل. وملف [[.code-workspace]] بيحفظ اللستة دي عشان تفتحها تاني بأمر واحد. هنفك الملف.

---

## ١. اسم الملف

[[myapp.code-workspace]]: الاسم قبل الامتداد على مزاجك وبيظهر في عنوان الشباك. الامتداد [[.code-workspace]] هو اللي بيخلي VS Code يعرفه. والمحتوى JSONC، فالتعليق في الأول مسموح. (المثال اتعدّى على [[JSON.parse]] في Node بعد شيل التعليق واتقرا سليم.)

---

## ٢. [[folders]]

~~~text
"folders": [
  { "path": "apps/web", "name": "web" },
  { "path": "apps/api", "name": "api" },
  { "path": "packages/shared" }
],
~~~

- [[folders]] لستة، كل عنصر فولدر.
- [[path]] مكان الفولدر **نسبة لمكان ملف الـ workspace نفسه**. لو الملف في جذر الـ repo، يبقى [[apps/web]] يعني [[<repo>/apps/web]].
- [[name]] اختياري: الاسم اللي يظهر في الشجرة بدل اسم الفولدر. التالت مفيهوش [[name]]، فهيظهر باسمه [[shared]].

فشجرة الملفات هتبان كده:

~~~text Explorer
MYAPP (WORKSPACE)
  > web
  > api
  > shared
~~~

تلات جذور جنب بعض، مش فولدر واحد جواه فولدرات.

---

## ٣. [[settings]]

~~~text
"settings": { "search.exclude": { "**/dist": true } }
~~~

- [[settings]] إعدادات للـ workspace كله. هنا بديل [[.vscode/settings.json]] لما تكون فاتح الملف ده.
- [[search.exclude]] فولدرات البحث (Ctrl+Shift+F) يتجاهلها.
- [[**/dist]] أي فولدر اسمه [[dist]] في أي مكان ([[**]] يعني أي عدد من الفولدرات)، و [[true]] يعني «اتجاهله».

### مين بيكسب لو الإعداد في أكتر من مكان؟

| المستوى | المكان | الأولوية |
|---|---|---|
| User | [[settings.json]] بتاعك | الأقل |
| Workspace | [[settings]] في [[.code-workspace]] | أعلى |
| Folder | [[.vscode/settings.json]] جوه كل فولدر من الـ folders | الأعلى، للفولدر ده بس |

---

## ٤. تعمله وتفتحه إزاي

- من المحرر: File ثم Add Folder to Workspace لكل فولدر، وبعدين File ثم Save Workspace As.
- من الترمنال: [[code --add apps/api]]. ده من [[code --help]] (اتشغّل على VS Code 1.140):

~~~text الناتج (جزء)
  -a --add <folder>                          Add folder(s) to the last active
                                             window.
~~~

يعني بيضيف للشباك اللي كنت فيه آخر مرة، مش بيفتح شباك جديد.

- بعد الحفظ: [[code myapp.code-workspace]] بيفتح الشباك بالفولدرات كلها.

(الأوامر دي ما اتشغّلتش هنا لأنها بتفتح شبابيك. السلوك من الـ docs.)

---

## الخلاصة

| المفتاح | بيعمل إيه |
|---|---|
| [[folders]] + [[path]] | الفولدرات، نسبة لمكان الملف |
| [[name]] | اسم يظهر بدل اسم الفولدر |
| [[settings]] | إعدادات للشباك كله |

> المسارات نسبية، فالملف يشتغل عند أي حد عمل clone للـ repo. والمسار المطلق ([[C:\Users\...]]) يبوّظه عند غيرك.`,
          lines: [
            "بداية الملف.",
            "الفولدرات:",
            "apps/web وهيظهر باسم web.",
            "apps/api وهيظهر باسم api.",
            "المكتبة المشتركة.",
            "نهاية اللستة.",
            "إعداد يسري على كل الفولدرات.",
            "نهاية الملف."
          ],
          sol: R`بعد ما تحفظ الـ workspace، [[code myapp.code-workspace]] هيفتح شباك عنوانه فيه [[myapp (Workspace)]]، وشجرة الملفات فيها الفولدرين كـ roots منفصلين. البحث والـ Git شغالين على الاتنين، و Source Control هيوريك repo لكل فولدر لو كانوا repos منفصلين.

لو فتحت الملف بدبل كليك وفتحه كـ JSON في تاب، دوس «Open Workspace» تحت يمين. ولو فولدر مظهرش، الـ [[path]] نسبي لمكان ملف [[.code-workspace]] نفسه مش للفولدر اللي انت فيه. ولو الـ settings اللي في الـ workspace ماشتغلتش في فولدر، ممكن [[.vscode/settings.json]] بتاع الفولدر نفسه بيكسب.`
        }
      ]
    }
]);
