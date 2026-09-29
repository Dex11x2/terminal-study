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
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("vscode", {
  label: "VS Code",
  prompt: "$ ",
  lab: R`code .
code --list-extensions
code --goto src/index.js:10`,
  labText: "افتح أي مشروع عندك في VS Code وجرّب كل اختصار عليه. الاختصارات مكتوبة لويندوز ولينكس، وعلى الماك Cmd مكان Ctrl و Option مكان Alt إلا لو مكتوب غير كده.",
  levels: {"1":["السرعة","تتنقل وتدوّر وتعدّل من غير ماوس"],"2":["أدوات جوه المحرر","الترمنال و Git و Debugger و refactor من غير ما تسيب VS Code"],"3":["إعدادات المشروع","إعدادات تتشارك مع الفريق، و Remote، و tasks و launch، و snippets"]},
  categories: [
    {
      t: "تتنقل في المشروع من الكيبورد",
      l: 1,
      n: "اكتب اسم اللي عايزه بدل ما تدوّر عليه بالماوس في شجرة الملفات",
      items: [
        {
          cmd: "Ctrl+Shift+P",
          title: "شغّل أي أمر في المحرر باسمه",
          desc: R`Command Palette: كل حاجة VS Code يقدر يعملها ليها أمر هنا، حتى اللي ملوش زرار ولا اختصار. اكتب جزء من الاسم ([[reload]]، [[format]]، [[theme]]) واختار. وجنب كل أمر الاختصار بتاعه لو ليه، فبتتعلم الاختصارات وانت ماشي.

F1 بيفتحها برضه. ولو فتحت Ctrl+P وكتبت [[>]] في الأول، بتتحول لنفس القايمة.`,
          example: R`Ctrl+Shift+P / F1      Win / Linux
Cmd+Shift+P / F1       Mac
type "reload"          Developer: Reload Window
type "sort"            Sort Lines Ascending (select the lines first)
type "settings json"   Preferences: Open User Settings (JSON)`,
          try: "افتح Command Palette واكتب [[sort]]، ورتّب ٥ سطور متحددة. وبعدين دوّر على [[Toggle Word Wrap]] وبص على الاختصار اللي جنبه.",
          flag: "keys",
          deep: {
            why: "VS Code فيه مئات الأوامر، والقوايم والأزرار بتعرض جزء صغير منهم. بدل ما تحفظ مكان كل حاجة، تحفظ اختصار واحد وتكتب اللي عايزه.",
            how: R`القايمة بتدوّر بالحروف مش بالكلمة كاملة (fuzzy)، فـ [[fmtdoc]] ممكن يلاقي Format Document. وأول ما تفتحها بتلاقي آخر أوامر استخدمتها فوق، فالأمر اللي بتكرره بيبقى Enter على طول.

كل extension بتضيف أوامرها هنا وقبلها اسمها: [[ESLint: Restart ESLint Server]]، [[Git: Stage Selected Ranges]]. فلو مش عارف extension بتعمل إيه، اكتب اسمها وشوف أوامرها.

وأي أمر هنا تقدر تديله اختصار من عندك: الترس جنب الأمر في القايمة بيفتح Keyboard Shortcuts عليه على طول.`,
            when: "كل ما تعوز حاجة ومش فاكر مكانها أو اختصارها. ومع الوقت، الأوامر اللي بتكررها كتير اتعلم اختصارها.",
            mistakes: "تفضل تدوّر في قوايم File و View بالماوس. أو تكتب [[>]] جوه Ctrl+Shift+P نفسها فتدوّر على أمر فيه «>». وعلى الماك Cmd+Shift+P ممكن يتعارض مع برنامج تاني (تسجيل شاشة مثلًا)، و F1 بديل مضمون."
          }
        },
        {
          cmd: "Ctrl+P",
          title: "افتح أي ملف في المشروع باسمه",
          desc: R`Quick Open: اكتب جزء من اسم الملف ([[usrctrl]] بيلاقي [[users.controller.ts]]) و Enter. أسرع بكتير من شجرة الملفات في مشروع كبير. ولو فيه أكتر من ملف بنفس الاسم، اكتب جزء من الفولدر: [[api/index]].

ونفس الخانة بتفهم حرف في الأول: [[:]] رقم سطر، و [[@]] دالة أو متغير في الملف، و [[#]] اسم في المشروع كله، و [[>]] أوامر، و [[?]] يعرضلك الباقي.`,
          example: R`Ctrl+P                 Win / Linux
Cmd+P                  Mac
usrctrl                finds users.controller.ts (letters in order)
user.ts:40             open user.ts at line 40
@getUser               a function or variable in the current file
Ctrl+Enter             open the result in a split (Cmd+Enter on Mac)`,
          try: "افتح ٣ ملفات في مشروعك بـ Ctrl+P من غير ما تلمس شجرة الملفات، وواحد منهم على سطر معين بـ [[:]].",
          flag: "keys",
          deep: {
            why: "في مشروع فيه مئات الملفات، فتح الفولدرات واحد واحد بياكل وقت وتركيز. انت عارف اسم الملف، فاكتبه.",
            how: R`البحث fuzzy: الحروف لازم تيجي بالترتيب بس مش لازم ورا بعض، فـ [[uc]] ممكن يلاقي [[users.controller.ts]]. والنتايج مرتبة بآخر حاجات فتحتها الأول، فالملف اللي كنت فيه من دقيقة بيبقى أول اختيار.

الملفات المتجاهلة في [[files.exclude]] و [[search.exclude]] (زي node_modules) مش بتظهر، ودا غالبًا اللي انت عايزه.

الملف اللي بيتفتح من هنا بيتفتح preview (اسم التاب مايل)، يعني الملف اللي بعده هياخد نفس التاب. أول ما تعدّل فيه أو تدبل كليك على التاب، بيثبت.`,
            when: "كل ما تعوز تفتح ملف اسمه في دماغك. شجرة الملفات للاستكشاف في مشروع جديد عليك.",
            mistakes: "تكتب المسار كامل بالـ slashes، مش محتاج: كفاية أجزاء منه. وتستغرب إن ملف في node_modules أو dist مش بيظهر: هو متجاهل عن قصد، دوّر عليه بـ Ctrl+Shift+F لو محتاجه."
          }
        },
        {
          cmd: "Ctrl+G",
          title: "روح لرقم سطر في الملف المفتوح",
          desc: R`الـ error بيقولك [[server.ts:118]]؟ افتح الملف واضغط Ctrl+G واكتب 118. وتقدر تكتب عمود كمان: [[118:12]].

على الماك الاختصار Ctrl+G برضه (Control مش Cmd)، ونفس الخانة بتتفتح لو كتبت [[:]] في Ctrl+P.`,
          example: R`Ctrl+G                 Win / Linux
Ctrl+G                 Mac (Control, not Cmd)
118                    go to line 118
118:12                 line 118, column 12`,
          try: "شغّل [[npx tsc --noEmit]] أو [[npm run lint]] في مشروعك، وخد أول غلط وروحله بـ Ctrl+G. وبعدين جرّب Ctrl+Click على مسار الغلط في الترمنال المدمج.",
          flag: "keys",
          deep: {
            why: "الأخطاء والـ stack traces واللوجات بتقولك رقم السطر، والـ scroll بالماوس لسطر 800 بطيء وبيتوّه.",
            how: R`بيعرضلك السطر وانت بتكتب الرقم قبل ما تدوس Enter، ولو دوست Esc بترجع مكانك.

والأسرع في الترمنال جوه VS Code: أي مسار شكله [[src/app.ts:40:5]] بيبقى link، و Ctrl+Click عليه (Cmd+Click على الماك) بيفتح الملف على السطر والعمود على طول. ومن ترمنال بره المحرر: [[code --goto]] (مستوى ٣).`,
            when: "بعد أي error فيه رقم سطر، أو لما حد يقولك «بص على سطر كذا» في review.",
            mistakes: "رقم السطر في الـ stack trace ممكن يكون من الملف بعد الـ build (dist) مش من الـ source، فتروح لسطر ملوش علاقة. بص على اسم الملف الأول: لو [[.js]] جوه dist، الـ source maps هي اللي بتوديك للمكان الصح."
          }
        },
        {
          cmd: "Ctrl+Shift+O",
          title: "روح لدالة أو متغير جوه الملف الحالي",
          desc: R`بتفتح لستة بكل الدوال والكلاسات والمتغيرات في الملف (symbols). اكتب جزء من الاسم و Enter. ولو كتبت [[:]] بعد الـ [[@]] (يعني [[@:]]) بيقسّمهم مجموعات: methods لوحدها و properties لوحدها.

و Ctrl+T نفس الفكرة بس على المشروع كله: اكتب [[createUser]] وتلاقيه في أنهي ملف.`,
          example: R`Ctrl+Shift+O           Win / Linux
Cmd+Shift+O            Mac
@:                     the same list, grouped by kind
Ctrl+T                 search names in the whole project (Cmd+T on Mac)`,
          try: "افتح أطول ملف في مشروعك (controller أو service) وروح لكل دالة فيه بـ Ctrl+Shift+O. وبعدين دوّر على اسم دالة من ملف تاني بـ Ctrl+T.",
          flag: "keys",
          deep: {
            why: "في ملف ٥٠٠ سطر، الـ scroll والـ Ctrl+F بيجيبوا كل مكان الاسم اتكتب فيه، وانت عايز مكان التعريف بس.",
            how: R`اللستة جاية من الـ language server (TypeScript مثلًا)، مش من بحث نصي، عشان كده بتفرّق بين تعريف الدالة واستخدامها. نفس اللستة موجودة في قسم Outline تحت شجرة الملفات، وفي الـ breadcrumbs فوق الملف.

Ctrl+T بيدوّر في كل ملفات المشروع اللي الـ language server فاهمها. في مشروع TypeScript كبير، أول مرة ممكن ياخد ثانية لحد ما يفهرس.`,
            when: "ملف طويل وعايز دالة بعينها. أو عارف اسم الدالة ومش فاكر في أنهي ملف: Ctrl+T.",
            mistakes: "في ملفات مفيهاش language server (لغة من غير extension)، اللستة هتبقى فاضية أو فقيرة، وده مش عطل. وفي Markdown بتعرض العناوين، ودي مفيدة جدًا في ملفات توثيق طويلة."
          }
        },
        {
          cmd: "Ctrl+Tab",
          title: "بدّل بين آخر ملفين كنت فيهم",
          desc: R`Ctrl+Tab ضغطة واحدة بترجعك للملف اللي كنت فيه قبل ده، وتاني ضغطة ترجعك. ولو فضلت ماسك Ctrl وضغطت Tab كذا مرة، بتمشي في الملفات المفتوحة بترتيب آخر استخدام.

ودا غير ترتيب التابات فوق: هنا اللي استخدمته أخيرًا هو الأول.`,
          example: R`Ctrl+Tab               Win / Linux / Mac (Control on Mac too)
Ctrl+Shift+Tab         the other direction
tap once               jump back to the previous file
hold Ctrl, tap Tab     walk the list, release to open`,
          try: "افتح component والـ API اللي بيكلمه، واشتغل بينهم بـ Ctrl+Tab بس لمدة ١٠ دقايق.",
          flag: "keys",
          deep: {
            why: "أغلب الشغل بيبقى بين ملفين: component وستايله، أو route والـ service بتاعه. الرجوع للتاب بالماوس كل مرة بيقطع التفكير.",
            how: R`اللستة مرتبة حسب آخر استخدام جوه الجزء الحالي من الشاشة (editor group). لو قسمت المحرر نصين، كل نص ليه لستة لوحده.

ومع كتر التابات المفتوحة، Ctrl+Tab بيفضل سريع لأنه بيجيب اللي استخدمته أخيرًا، مش كل اللي مفتوح.`,
            when: "الشغل بين ملفين أو تلاتة مرتبطين ببعض.",
            mistakes: "تفتكره بيمشي بترتيب التابات فوق فتتلخبط. لو عايز الترتيب ده: Ctrl+PageDown و Ctrl+PageUp. وتسيب ٣٠ تاب مفتوح وتدوّر فيهم بعينك: Ctrl+Tab و Ctrl+P أسرع، ولو عايز حد أقصى للتابات فيه [[workbench.editor.limit.enabled]]."
          }
        },
        {
          cmd: "Alt+Left",
          title: "ارجع لمكان المؤشر قبل القفزة",
          desc: R`عملت F12 على دالة وقفزت لملف تاني، أو Ctrl+G لسطر بعيد؟ Alt+Left بيرجعك للسطر اللي كنت فيه بالظبط، و Alt+Right يقدّم تاني. زي زرار الـ back في المتصفح بس للمؤشر.

على لينكس Ctrl+Alt+- و Ctrl+Shift+-، وعلى الماك Ctrl+- و Ctrl+Shift+-.`,
          example: R`Alt+Left / Alt+Right            Windows
Ctrl+Alt+- / Ctrl+Shift+-       Linux
Ctrl+- / Ctrl+Shift+-           Mac
Ctrl+K Ctrl+Q                   back to the last place you typed (Cmd+K Cmd+Q)`,
          try: "من ملف routes، اعمل F12 على ٣ دوال ورا بعض، وارجع لنقطة البداية بـ Alt+Left بس.",
          flag: "keys",
          deep: {
            why: "القفز بين التعريفات بيتوّهك: بعد ٣ قفزات مش فاكر كنت فين. الـ history بيفتكر عنك.",
            how: R`VS Code بيسجّل مكان المؤشر كل ما تقفز قفزة كبيرة: F12، أو Ctrl+G، أو Ctrl+P لملف تاني، أو كليك على نتيجة بحث. الحركة الصغيرة بالأسهم مش بتتسجّل، فالـ back بيرجعك للأماكن اللي تفرق.

و Ctrl+K Ctrl+Q بيرجعك لآخر مكان كتبت فيه، حتى لو لفّيت في ملفات كتير بعدها.`,
            when: "بعد أي قفزة لتعريف أو لنتيجة بحث.",
            mistakes: "تستخدم Ctrl+Z عشان ترجع مكانك فتلغي تعديلات عملتها. و Alt+Left على لينكس مش هو، فتضغطه ومفيش حاجة تحصل."
          }
        }
      ]
    },
    {
      t: "الشاشة: لوحات وتقسيم ومساحة",
      l: 1,
      n: "مساحة أكبر للكود، وملفين جنب بعض، ولوحات تظهر وتختفي بضغطة",
      items: [
        {
          cmd: "Ctrl+B",
          title: "اخفي الشريط الجانبي واللوحة اللي تحت",
          desc: R`Ctrl+B بيخفي ويظهر الشريط الجانبي (شجرة الملفات والبحث و Git)، و Ctrl+J بيخفي ويظهر اللوحة اللي تحت (الترمنال و Problems و Output). الاتنين مع بعض بيدّوا الشاشة كلها للكود.

وكل قسم في الشريط الجانبي ليه اختصار يفتحه على طول: Ctrl+Shift+E للملفات، و F للبحث، و G لـ Git، و D للـ Debug، و X للـ extensions.`,
          example: R`Ctrl+B / Ctrl+J        Win / Linux: sidebar / bottom panel
Cmd+B / Cmd+J          Mac
Ctrl+Shift+E           Explorer (files)
Ctrl+Shift+F           Search
Ctrl+Shift+G           Source Control (Ctrl+Shift+G on Mac too)
Ctrl+Shift+D           Run and Debug
Ctrl+Shift+X           Extensions
Mac: Cmd+Shift+E / F / D / X`,
          try: "اقفل الاتنين بـ Ctrl+B و Ctrl+J، واشتغل على ملف، وافتح شجرة الملفات بـ Ctrl+Shift+E بس لما تحتاجها.",
          flag: "keys",
          deep: {
            why: "على شاشة لابتوب، الشريط الجانبي واللوحة بياكلوا نص المساحة، والكود بيبقى سطور مقطوعة.",
            how: R`Ctrl+Shift+E وأخواتها بيفتحوا القسم ويحطوا الـ focus فيه، فتقدر تمشي في الشجرة بالأسهم وتفتح بـ Enter من غير ماوس. ولو انت جوه القسم أصلًا، نفس الاختصار بيرجعك للكود.

Ctrl+J بيقفل اللوحة كلها. ولو عايز الترمنال بالذات، ليه اختصار لوحده بيفتحه ويحط الـ focus فيه (مستوى ٢).`,
            when: "على شاشة صغيرة، ووقت ما تقرا كود طويل، ووقت ما تشارك الشاشة.",
            mistakes: "تدوس Ctrl+Shift+E وانت جوه الشجرة فتفتكره مش شغال: هو رجّعك للمحرر. وتقفل شريط الأيقونات على الشمال (Activity Bar) بالغلط من كليك يمين، فترجعه من View ثم Appearance."
          }
        },
        {
          cmd: "Ctrl+\\",
          title: "افتح ملفين جنب بعض",
          desc: R`Ctrl+\ بيقسم المحرر نصين وبيفتح نفس الملف في النص التاني، وبعدين تفتح فيه اللي انت عايزه. Ctrl+1 و Ctrl+2 و Ctrl+3 بيتنقلوا بين الأجزاء.

مفيد لـ component قصاد الـ test بتاعه، أو الـ schema قصاد الكود اللي بيستخدمها، أو ملف طويل واحد في مكانين.`,
          example: R`Ctrl+\                 Win / Linux: split the editor
Cmd+\                  Mac
Ctrl+1 / 2 / 3         focus group 1 / 2 / 3 (Cmd+1 / 2 / 3 on Mac)
Ctrl+Enter             in Ctrl+P or the Explorer: open in a split (Cmd+Enter)
Shift+Alt+0            flip the split vertical / horizontal (Option+Cmd+0)`,
          try: "افتح [[schema.prisma]] (أو ملف الـ types) في نص، والملف اللي بيستخدمه في النص التاني، واتنقل بينهم بـ Ctrl+1 و Ctrl+2.",
          flag: "keys",
          deep: {
            why: "التنقل بين ملفين بالتابات بيخليك تنسى اللي كنت بتبصله. جنب بعض بتقارن بعينك.",
            how: R`كل جزء اسمه editor group وليه تابات لوحده. تقدر تسحب تاب من جزء لجزء، أو تسحبه لطرف الشاشة يعمل تقسيم جديد. ونفس الملف في جزئين نسخة واحدة: التعديل في واحد بيظهر في التاني.

Ctrl+1 على طول بيرجعك للجزء الأول، ودي أسرع طريقة ترجع للكود من الترمنال أو من شجرة الملفات.`,
            when: "مقارنة، أو كتابة test، أو نقل كود من ملف لملف.",
            mistakes: "تقسم ٤ مرات على شاشة لابتوب فكل جزء يبقى عرضه ٤٠ حرف. جزئين كفاية. ولو عايز تقارن نسختين من ملف، ده مش التقسيم: كليك يمين ثم Select for Compare، أو [[code --diff]] (مستوى ٣)."
          }
        },
        {
          cmd: "Ctrl+Shift+T",
          title: "رجّع التاب اللي قفلته بالغلط",
          desc: R`Ctrl+W بيقفل الملف الحالي، و Ctrl+Shift+T بيرجّع آخر ملف اتقفل، ولو كررته بيرجّع اللي قبله. زي المتصفح بالظبط.

و Ctrl+K Ctrl+W بيقفل كل التابات مرة واحدة، لما تعوز تبدأ على نضيف.`,
          example: R`Ctrl+W / Ctrl+Shift+T  Win / Linux: close / reopen
Cmd+W / Cmd+Shift+T    Mac
Ctrl+K Ctrl+W          close all editors (Cmd+K Cmd+W on Mac)`,
          try: "افتح ٥ ملفات، اقفلهم كلهم بـ Ctrl+K Ctrl+W، ورجّع آخر اتنين بـ Ctrl+Shift+T.",
          flag: "keys",
          deep: {
            why: "التابات بتتراكم لحد ما متلاقيش حاجة، وبعدين تقفل واحد كنت محتاجه.",
            how: R`VS Code بيفتكر لستة الملفات اللي اتقفلت، فـ Ctrl+Shift+T بيمشي ورا فيها، والملف بيرجع على نفس مكان المؤشر.

لو قفلت ملف فيه تعديلات مش محفوظة، هيسألك تحفظ ولا لأ. لو قلت Don't Save، التعديلات راحت، و Ctrl+Shift+T هيفتح النسخة المحفوظة بس. هنا ممكن تلحق نسخة قديمة من Local History (مستوى ٢، درس Timeline) لو كنت حفظت قبل كده.`,
            when: "قفلت حاجة بالغلط، أو عايز تبدأ على نضيف بعد يوم شغل.",
            mistakes: "تدوس Don't Save بسرعة عشان تقفل، وتكتشف إن التعديل كان مهم. اقرا الرسالة، أو فعّل [[files.autoSave]] لو دايمًا بتنسى تحفظ."
          }
        },
        {
          cmd: "Ctrl+K Z",
          title: "شاشة فيها الكود بس وانت بتشرح أو بتركّز",
          desc: R`Zen Mode بيخفي كل حاجة ما عدا الملف: الشريط الجانبي واللوحة والتابات وشريط الحالة، وبيفتح full screen. تطلع منه بـ Esc مرتين.

ولو بتشرح لحد أو بتشارك الشاشة: Ctrl+= بيكبّر الواجهة كلها و Ctrl+- بيصغّرها. و Alt+Z بيلف السطور الطويلة جوه الشاشة بدل الـ scroll يمين.`,
          example: R`Ctrl+K Z               Win / Linux: Zen Mode (Ctrl+K, release, then Z)
Cmd+K Z                Mac
Esc Esc                leave Zen Mode
Ctrl+= / Ctrl+-        zoom the whole window in / out (Cmd on Mac)
Ctrl+Numpad0           reset zoom
Alt+Z                  toggle word wrap (Option+Z on Mac)`,
          try: "ادخل Zen Mode على ملف واقراه لآخره، واطلع بـ Esc Esc. وبعدين افتح README فيه سطور طويلة وجرّب Alt+Z.",
          flag: "keys",
          deep: {
            why: "وقت الشرح أو التسجيل، اللي بيتفرج محتاج يشوف الكود كبير ومن غير زحمة. ووقت التركيز، كل أيقونة بتشد عينك.",
            how: R`Ctrl+K Z اسمه chord: Ctrl+K لوحدها مش بتعمل حاجة، بتستنى الحرف اللي بعدها، وشريط الحالة تحت بيكتبلك إنه مستني. فيه اختصارات كتير بتبدأ بـ Ctrl+K بنفس الطريقة.

الزووم بيكبّر الواجهة كلها (القوايم والترمنال) مش الكود بس. لو عايز الكود بس، [[editor.fontSize]] في الإعدادات. و Alt+Z عرض بس، مش بيحط سطور جديدة في الملف.`,
            when: "الشرح، والتسجيل، ومشاركة الشاشة في meeting، والقراية الطويلة.",
            mistakes: "تكبّر بـ Ctrl+= في meeting وتنسى، فترجع تلاقي الواجهة ضخمة ومش فاهم ليه: Ctrl+Numpad0. وتفتكر إن Alt+Z عدّل الملف: لا، ده عرض بس، والملف زي ما هو."
          }
        }
      ]
    },
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
        }
      ]
    },
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
          }
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
          }
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
          }
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
          }
        },
        {
          cmd: "F2",
          title: "غيّر اسم دالة أو متغير في كل المشروع بأمان",
          desc: R`F2 على أي اسم بيغيّره في تعريفه وفي كل استخداماته وفي الـ imports في كل الملفات، ومش بيلمس نفس الكلمة لو في string أو كومنت أو متغير تاني بنفس الاسم في مكان تاني. Shift+Enter بدل Enter بيوريك preview بالتغييرات قبل ما تتنفّذ.

ولو غيّرت اسم ملف أو نقلته من شجرة الملفات، VS Code بيعرض يعدّل الـ imports اللي بتشاور عليه.`,
          example: R`F2                     rename symbol (all systems)
Shift+Enter            preview every change first
Enter                  apply`,
          try: "غيّر اسم دالة مستخدمة في ٣ ملفات بـ F2، وبعدين [[git diff]] واتأكد إن مفيش حاجة تانية اتلمست.",
          flag: "keys",
          deep: {
            why: "Find و Replace بيغيّر النص في كل مكان، فبيبوّظ [[user]] في كومنت أو في property تانية. F2 فاهم الكود.",
            how: R`الـ language server عارف كل استخدام للاسم ده بالظبط (نفس اللي Shift+F12 بيجيبه)، فبيغيّرهم كلهم في عملية واحدة، و Ctrl+Z واحدة بترجّع الكل.

نقل الملفات: [[js/ts.updateImportsOnFileMove.enabled]] (كان اسمه [[typescript.updateImportsOnFileMove.enabled]]) قيمتها prompt افتراضيًا فبيسألك، وتقدر تخليها always.`,
            when: "أي تغيير لاسم في الكود. Find و Replace للنصوص بس.",
            mistakes: "تعمل rename لحاجة اسمها بيتقري من برا: field في API، أو column في الداتابيز، أو key في JSON متخزّن. F2 بيغيّر الكود، بس الـ client أو الداتا القديمة لسه بالاسم القديم. وفي ملفات JS من غير types الـ rename أضعف، فبص على الـ preview."
          }
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
          }
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
          }
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
          }
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
          }
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
          }
        }
      ]
    },
    {
      t: "Git من جوه المحرر",
      l: 2,
      n: "تشوف التغيير قبل ما تضيفه، وتضيف جزء من ملف، وتحل conflict، وترجّع ملف ضاع",
      items: [
        {
          cmd: "Ctrl+Shift+G",
          title: "راجع التعديلات وضيف جزء من ملف واعمل commit",
          desc: R`Ctrl+Shift+G بيفتح Source Control: الملفات المتغيرة تحت Changes، والكليك على أي ملف بيفتح diff قبل وبعد. الـ + جنب الملف بيعمل stage، وجوه الـ diff تحدد سطور وكليك يمين ثم Stage Selected Ranges فتضيف جزء من الملف بس.

تكتب الرسالة فوق و Ctrl+Enter يعمل commit. وجنب أرقام السطور في أي ملف فيه شريط ملون (أخضر للجديد، وأزرق للمتعدّل، وسهم أحمر للممسوح)، والكليك عليه بيعرض التغيير.`,
          example: R`Ctrl+Shift+G                 Source Control (Ctrl+Shift+G on Mac too)
click a file                 diff: last commit vs your changes
select lines, right-click    Stage Selected Ranges
Ctrl+Enter                   commit, from the message box (Cmd+Enter on Mac)`,
          try: "عدّل حاجتين ملهمش علاقة ببعض في نفس الملف (fix وتنسيق). ضيف الـ fix بس بـ Stage Selected Ranges واعمل commit، والتاني في commit لوحده.",
          flag: "keys",
          deep: {
            why: "[[git add .]] من غير ما تبص بيدخّل console.log و [[.env]] وتعديلات مش مقصودة. الـ diff في المحرر بيخليك تراجع كل سطر قبل ما يدخل.",
            how: R`فيه قسمين: Changes (مش متضاف) و Staged Changes (هيدخل الـ commit). نفس الملف ممكن يبقى في الاتنين لو ضفت جزء منه، ودا نفس [[git add -p]] بس بعينك.

الـ diff بيقارن اللي على الديسك بآخر commit (أو باللي متضاف)، والجهة اليمين تقدر تعدّل فيها على طول.

لو دوست Commit ومفيش حاجة متضافة، ممكن يسألك يضيف الكل، ودا بيتحكم فيه [[git.enableSmartCommit]]. الأوامر نفسها في تاب git، درس «git add / commit».`,
            when: "كل commit، خصوصًا لو عدّلت كذا حاجة ملهمش علاقة ببعض.",
            mistakes: "تدوس + على كل حاجة أو Commit All من غير ما تفتح الملفات. و Discard Changes (السهم الملفوف) بيمسح تعديلاتك من غير سلة محذوفات: لو دوسته بالغلط، Timeline (بعد درس) ممكن ينقذك."
          }
        },
        {
          cmd: "Merge Editor",
          title: "حل الـ conflict وانت شايف الجهتين والنتيجة",
          desc: R`لما [[git merge]] أو [[git pull]] يطلّع conflict، الملف بيظهر تحت Merge Changes. فوق كل conflict فيه أزرار: Accept Current و Accept Incoming و Accept Both. ولو الـ conflict معقد، زرار Resolve in Merge Editor بيفتح ٣ أجزاء: Incoming و Current فوق، و Result تحت.

بعد ما تخلص: احفظ، واعمل stage للملف، وكمّل الـ merge.`,
          example: R`Ctrl+Shift+G                        conflicted files: under Merge Changes
Accept Current / Incoming / Both    buttons above each conflict
Resolve in Merge Editor             Incoming | Current on top, Result below
+ (Stage Changes)                   mark the file as resolved
Commit                              finishes the merge`,
          try: "في repo تجربة: اعمل branch وعدّل نفس السطر فيه وفي main، واعمل merge، وحل الـ conflict مرة بالأزرار ومرة في Merge Editor.",
          flag: "keys",
          deep: {
            why: "علامات [[<<<<<<<]] و [[=======]] و [[>>>>>>>]] جوه الملف سهل تتلخبط فيها وتسيب علامة أو تمسح كود. المحرر بيوريك كل جهة لوحدها.",
            how: R`في merge عادي، Current هو الـ branch اللي انت عليه، و Incoming اللي داخل عليه. بس في rebase المعنى بيتقلب: Current هو الـ base الجديد، و Incoming هو الـ commit بتاعك اللي بيتعاد. فمتختارش بالاسم، بص على الكود.

Accept Both بيحط الاتنين ورا بعض، وغالبًا محتاج تعديل بإيدك (import مكرر مثلًا). والـ Result في Merge Editor ملف عادي تقدر تكتب فيه.

المفاهيم والأوامر في تاب git، درس «الـ conflicts».`,
            when: "أي conflict في merge أو pull أو rebase أو stash pop.",
            mistakes: "تدوس Accept Current على كل الـ conflicts عشان تخلص، فتمسح شغل زميلك. أو Accept Both في [[package-lock.json]]: الملف ده ميتحلّش بإيدك، خد نسخة واحدة واعمل [[npm install]] يظبطه. وتنسى تشغّل التطبيق بعد الحل: مفيش علامات مش معناها إن الكود شغال."
          }
        },
        {
          cmd: "Timeline",
          title: "رجّع نسخة قديمة من ملف، وشوف مين غيّر السطر ده",
          desc: R`تحت شجرة الملفات فيه قسم Timeline: بيعرض تاريخ الملف المفتوح، الـ commits بتاعته وكمان كل مرة حفظته (Local History) حتى لو مفيش commit. الكليك على أي نقطة بيفتح diff، وتقدر ترجّع النسخة دي.

وعشان تعرف مين غيّر سطر معين وامتى: Git: Toggle Git Blame Editor Decoration من Command Palette بيكتب في آخر السطر اسم آخر واحد غيّره ورسالة الـ commit.`,
          example: R`Ctrl+Shift+E                              Explorer: Timeline is the last section
click an entry                            diff that version against now
Local History: Find Entry to Restore      search saved versions of any file
Git: Toggle Git Blame Editor Decoration   who changed this line, and when`,
          try: "عدّل ملف واحفظ ٣ مرات بتعديلات مختلفة، وارجع لتاني نسخة من Timeline. وشغّل الـ blame على ملف قديم في مشروعك.",
          flag: "keys",
          deep: {
            why: "عملت Discard بالغلط، أو عدّلت ملف لحد ما باظ ومفيش commit ترجعله. Local History بيحفظ نسخة مع كل save. والـ blame بيجاوب «ليه السطر ده كده؟» بإنه يوديك للـ commit.",
            how: R`Local History بيتخزن على جهازك بس (مش في Git)، وبيحتفظ بعدد محدود من النسخ لكل ملف ([[workbench.localHistory.maxFileEntries]]). بيشتغل حتى في ملفات مش في Git زي [[.env]].

Local History: Find Entry to Restore بيدوّر في النسخ المحفوظة لأي ملف، حتى لو الملف نفسه اتمسح.

الـ blame المدمج ليه إعدادين: [[git.blame.editorDecoration.enabled]] (في السطر) و [[git.blame.statusBarItem.enabled]] (في شريط الحالة). GitLens extension بتعمل ده وأكتر بكتير، بس أتقل. وفي الترمنال: درس «git log -S / blame» في تاب git.`,
            when: "ملف باظ ومفيش commit، أو عايز تفهم تاريخ سطر قبل ما تغيّره.",
            mistakes: "تعتمد على Local History كـ backup: ده على جهاز واحد وبيتمسح مع الوقت، والـ commit والـ push هما الـ backup. و Discard لملف جديد مكانش في Git خالص بيمسحه، وساعتها Local History أو سلة المحذوفات فرصتك الوحيدة."
          }
        }
      ]
    },
    {
      t: "Debugger",
      l: 2,
      n: "توقف الكود على سطر وتشوف كل المتغيرات، بدل console.log في عشرين مكان",
      items: [
        {
          cmd: "F9",
          title: "حط نقطة توقف على السطر",
          desc: R`F9 بيحط breakpoint (نقطة حمرا) على السطر اللي فيه المؤشر، أو دوس جنب رقم السطر. لما الكود يوصل هنا وهو شغال بالـ debugger، بيقف وتشوف كل المتغيرات.

كليك يمين في نفس المكان بيدّيك نوعين أذكى: Conditional Breakpoint بيقف بس لو شرط اتحقق ([[user.id === 42]])، و Logpoint مش بيقف خالص، بيطبع رسالة زي [[order {order.id} total={order.total}]] من غير ما تعدّل الكود.`,
          example: R`F9                     toggle breakpoint (all systems)
right-click the gutter Add Conditional Breakpoint...
                       order.total > 1000
right-click the gutter Add Logpoint...
                       order {order.id} total={order.total}`,
          try: "في route بيتنادي كتير، حط Logpoint يطبع الـ id، و Conditional Breakpoint يقف على id معين بس، وشغّل بـ F5.",
          flag: "keys",
          deep: {
            why: "breakpoint عادي في loop بيتنفذ ١٠٠٠ مرة بيوقفك ١٠٠٠ مرة. و console.log محتاج تعدّل وتحفظ وتعيد تشغيل وتفتكر تمسحه.",
            how: R`الـ breakpoints بتتحفظ في VS Code مش في الكود، فمفيش حاجة تدخل Git. قسم Breakpoints في Run and Debug بيعرضهم كلهم، وتقدر تقفلهم مؤقتًا من غير ما تمسحهم.

الشرط أي expression بلغة البرنامج بيتقيّم في اللحظة دي. وفيه كمان Hit Count: يقف في المرة العاشرة مثلًا.

الـ Logpoint بيطبع في Debug Console، واللي بين الأقواس المعووجة بيتقيّم. console.log من غير ما تلمس الكود.`,
            when: "أي bug محتاج تشوف فيه قيم المتغيرات في لحظة معينة.",
            mistakes: "breakpoint رمادي مش أحمر معناه الـ debugger مش قادر يربطه بالكود الشغال: غالبًا مفيش source maps، أو اللي شغال هو dist مش src. أو انت شغّلت بـ [[npm run dev]] في ترمنال عادي مش من الـ debugger، فمفيش حد يقف."
          }
        },
        {
          cmd: "F5",
          title: "شغّل بالـ debugger وامشي سطر سطر",
          desc: R`F5 بيشغّل الـ debug config المختار (أو يسألك تعمل واحد). لما يقف على breakpoint: F10 ينفّذ السطر ويروح للي بعده، و F11 يدخل جوه الدالة، و Shift+F11 يخرج منها، و F5 يكمّل للـ breakpoint الجاي، و Shift+F5 يوقف.

على الشمال: Variables فيها كل المتغيرات، و Watch تكتب فيها expression يفضل متحدّث، و Call Stack يوريك مين نادى مين. وتحت، Debug Console تكتب فيها أي كود ويتنفّذ في اللحظة دي.`,
          example: R`F5                     start / continue
F10 / F11              step over / step into
Shift+F11              step out
Shift+F5               stop
Ctrl+Shift+F5          restart (Shift+Cmd+F5 on Mac)
Ctrl+Shift+D           Run and Debug view (Shift+Cmd+D on Mac)`,
          try: "حط breakpoint في أول route handler، شغّل F5، وامشي بـ F10 لحد الـ query. ضيف [[req.body]] في Watch، واكتب [[JSON.stringify(req.headers)]] في Debug Console.",
          flag: "keys",
          deep: {
            why: "console.log بيوريك اللي انت فاكر تطبعه. الـ debugger بيوريك كل حاجة في اللحظة دي، وتجرّب expressions من غير ما تعيد التشغيل.",
            how: R`F5 من غير launch.json بيحاول يخمّن (Node لملف JS مفتوح مثلًا). في مشروع حقيقي أحسن launch.json (مستوى ٣)، أو JavaScript Debug Terminal (الدرس الجاي).

F10 بيعدّي على الدالة كوحدة واحدة، و F11 بيدخل جواها، ومع await بيستنى الـ promise. والـ Debug Console بيشوف متغيرات المكان اللي انت مختاره في Call Stack.

[[skipFiles]] في launch.json بيخلي F11 ميدخلش جوه node_modules أو Node نفسه.`,
            when: "bug محتاج تتبّع خطوة خطوة، أو عايز تشوف شكل data جاية من API أو DB.",
            mistakes: "تفضل تدوس F11 فتلاقي نفسك جوه Express أو node_modules: Shift+F11 يطلّعك، و skipFiles يمنعها من الأول. وتسيب الـ debugger واقف، فالـ request في المتصفح يعمل timeout وتفتكر فيه مشكلة تانية."
          }
        },
        {
          cmd: "JavaScript Debug Terminal",
          title: "debug لأي أمر npm من غير launch.json",
          desc: R`من السهم جنب + في الترمنال اختار JavaScript Debug Terminal، أو Debug: JavaScript Debug Terminal من Command Palette. أي حاجة Node تشغّلها منه ([[npm run dev]]، [[npx vitest]]، سكربت) الـ debugger بيتربط بيها لوحده، والـ breakpoints بتقف.

وفيه Auto Attach: من Debug: Toggle Auto Attach تختار smart، فأي node تشغّله من أي ترمنال عادي في VS Code بيتربط بالـ debugger.`,
          example: R`Ctrl+Shift+P           Debug: JavaScript Debug Terminal
npm run dev            now breakpoints in server code are hit
Ctrl+Shift+P           Debug: Toggle Auto Attach, then smart`,
          try: "افتح JavaScript Debug Terminal، حط breakpoint في route، وشغّل [[npm run dev]] منه، واطلب الـ route من المتصفح.",
          flag: "keys",
          deep: {
            why: "launch.json لكل سكربت تقيل، وأغلب المشاريع بتتشغل بـ npm scripts فيها tsx أو nodemon أو next. الترمنال ده بيتعامل مع كل ده من غير إعداد.",
            how: R`الترمنال ده بيحط متغير بيئة ([[NODE_OPTIONS]]) بيخلي أي عملية Node تتولد منه تتصل بـ VS Code لوحدها، حتى العمليات الفرعية (زي اللي nodemon بيعيد تشغيلها).

Auto Attach ليه أوضاع: smart (أي سكربت بره node_modules، وأدوات مشهورة زي mocha و ts-node)، و always (أي node)، و onlyWithFlag (بس اللي معاه [[--inspect]])، و disabled.

[[--inspect]] نفسه والـ attach على بورت 9229 في تاب node، درس «الـ debugger».`,
            when: "أسرع بداية debug لأي مشروع Node أو Next.js أو tests.",
            mistakes: "تفتح ترمنال عادي وتستغرب إن الـ breakpoints مش بتقف: لازم JavaScript Debug Terminal أو Auto Attach. و Auto Attach على always بيبطّأ أي أمر node صغير. وفي Docker الترمنال ده مش هيوصل للـ container: محتاج attach على بورت (launch.json في مستوى ٣)."
          }
        }
      ]
    },
    {
      t: "Markdown والـ AI",
      l: 2,
      n: "معاينة README وانت بتكتبه، والـ chat المدمج في المحرر",
      items: [
        {
          cmd: "Ctrl+Shift+V",
          title: "شوف ملف Markdown متعرض زي GitHub",
          desc: R`Ctrl+Shift+V على ملف [[.md]] بيفتح المعاينة مكانه، و Ctrl+K V بيفتحها جنبه، فتكتب وتشوف النتيجة في نفس اللحظة: العناوين والجداول والكود واللينكات والصور.

مفيد لـ README والتوثيق والملاحظات. و Ctrl+Shift+O جوه ملف Markdown بيعرض العناوين فتتنقل بينها.`,
          example: R`Ctrl+Shift+V           preview in place (Shift+Cmd+V on Mac)
Ctrl+K V               preview to the side (Cmd+K V)
Ctrl+Shift+O           jump between headings`,
          try: "افتح README مشروعك جنب المعاينة، وضيف جدول فيه أوامر التشغيل وشوفه وهو بيتعرض.",
          flag: "keys",
          deep: {
            why: "بتكتب README وترفعه تلاقي الجدول باظ أو الكود مش متلوّن. المعاينة بتوريك قبل الرفع.",
            how: R`المعاينة بتتحدث وانت بتكتب، والـ scroll متزامن بين الناحيتين. شكلها قريب من GitHub بس مش متطابق: بعض الحاجات الخاصة بـ GitHub محتاجة extension.

الصور بمسارات نسبية بتظهر من الـ repo، فتتأكد إن المسار صح قبل الرفع.`,
            when: "أي ملف Markdown قبل الرفع.",
            mistakes: "تكتب مسار الصورة بـ backslash بتاع ويندوز فيبان عندك ويبوظ على GitHub: استخدم / دايمًا. وتعدّل في المعاينة وتستغرب: المعاينة للقراية بس، التعديل في الملف."
          }
        },
        {
          cmd: "Ctrl+Alt+I",
          title: "افتح الـ AI chat المدمج، أو اسأله جوه الكود",
          desc: R`Ctrl+Alt+I بيفتح Chat على الجنب: تسأل عن المشروع أو تطلب تعديل. و Ctrl+I وانت في الكود بيفتح inline chat في السطر نفسه: تحدد دالة وتكتب «ضيف validation» ويعرضلك التعديل كـ diff تقبله أو ترفضه. و Ctrl+I في الترمنال بيقترح أمر.

الاقتراحات الرمادية وانت بتكتب بتتقبل بـ Tab.`,
          example: R`Ctrl+Alt+I             Chat view (Ctrl+Cmd+I on Mac)
Ctrl+I                 inline chat in the editor or terminal (Cmd+I on Mac)
Tab                    accept the grey inline suggestion
Esc                    dismiss`,
          try: "حدد دالة صغيرة واطلب بـ Ctrl+I تكتبلها JSDoc، واقرا الـ diff سطر سطر قبل ما تقبل.",
          flag: "keys",
          deep: {
            why: "الـ chat جوه المحرر شايف الملف والتحديد، فبتسأل عن الكود اللي قدامك من غير نسخ ولزق في متصفح.",
            how: R`ده محتاج تسجيل دخول لـ GitHub Copilot (فيه خطة مجانية بحدود). الـ inline chat بيعدّل جوه الملف كـ diff، فتقبل جزء وترفض جزء.

الـ chat بيشوف الملفات اللي تديهاله (التحديد، أو [[#]] واسم ملف)، والكود ده بيتبعت لسيرفرات الخدمة.`,
            when: "شرح كود مش بتاعك، أو boilerplate، أو اقتراح test. مش بديل إنك تفهم التعديل.",
            mistakes: "تقبل تعديل كبير من غير ما تقراه، أو تدّي الـ chat ملف فيه [[.env]] أو مفاتيح. ولو الـ AI مقفول عندك، Ctrl+I بيفتح الاقتراحات العادية زي Ctrl+Space."
          }
        }
      ]
    },
    {
      t: "إعدادات تتشارك مع الفريق",
      l: 3,
      n: "ملفات في .vscode جوه الـ repo، فكل واحد يفتح المشروع يلاقي نفس السلوك",
      items: [
        {
          cmd: "Ctrl+,",
          title: "افتح الإعدادات وافرق بين بتاعتك وبتاعة المشروع",
          desc: R`Ctrl+, بيفتح الإعدادات، وفوق فيه تابين: User (ليك انت في كل المشاريع) و Workspace (للمشروع ده بس، ومتحفوظة في [[.vscode/settings.json]]). إعداد Workspace بيغلب User.

اكتب [[@modified]] في البحث تشوف اللي انت غيّرته بس. والأيقونة فوق على اليمين (Open Settings JSON) بتفتح الملف نفسه.`,
          example: R`Ctrl+,                 Settings (Cmd+, on Mac)
@modified              only the settings you changed
@lang:typescript       settings for one language
User | Workspace       tabs at the top: where the change is saved
Ctrl+Shift+P           Preferences: Open User Settings (JSON)`,
          try: "افتح الإعدادات ودوّر على [[@modified]] وشوف انت غيّرت إيه. وبعدين غيّر [[editor.tabSize]] في Workspace بس، وشوف [[.vscode/settings.json]] اتعمل.",
          flag: "keys",
          deep: {
            why: "إعدادات زي format on save والـ formatter لازم تبقى نفسها عند الكل في المشروع، وإعدادات زي الخط والثيم بتاعتك انت. لو خلطتهم، زميلك مش هيلاقي نفس السلوك.",
            how: R`الترتيب من الأضعف للأقوى: Default ثم User ثم Remote (لو شغال WSL أو SSH) ثم Workspace ثم Workspace Folder (في multi-root). وأي إعداد ممكن يتحدد للغة واحدة بـ [["[typescript]": { ... }]].

User settings على ويندوز في [[%APPDATA%\Code\User\settings.json]]، وعلى لينكس [[~/.config/Code/User/settings.json]]، وعلى الماك [[~/Library/Application Support/Code/User/settings.json]].

الملف JSON بيقبل كومنتات، فتقدر تكتب [[//]] جواه تشرح ليه الإعداد ده موجود.`,
            when: "قبل أي إعداد اسأل نفسك: «ده ذوقي ولا قاعدة المشروع؟»",
            mistakes: "تحط إعدادات شخصية (الخط، الثيم، [[editor.fontSize]]) في Workspace وتعمل commit، فتفرضها على الفريق. وتغيّر إعداد في User وهو متغلوب من Workspace فتفتكره مش شغال: الإعداد بيبقى جنبه «Also modified in: Workspace»."
          }
        },
        {
          cmd: ".vscode/settings.json",
          title: "format on save و ESLint fix و LF لكل الفريق",
          desc: R`الملف ده جوه الـ repo، فأي حد يفتح المشروع في VS Code بياخد نفس السلوك: يتنسّق مع كل حفظ بـ Prettier، و ESLint يصلّح اللي يتصلّح، ونهاية السطر LF حتى على ويندوز، و TypeScript بتاع المشروع مش اللي جاي مع VS Code.

محتاج extensions الـ ESLint و Prettier متسطّبين (الدرس بعد الجاي بيقترحهم على الفريق). وقواعد الشكل نفسها مكانها [[.prettierrc]] و [[.editorconfig]] (تاب فحص الكود).`,
          example: R`// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[prisma]": { "editor.defaultFormatter": "Prisma.prisma" },
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "js/ts.tsdk.path": "node_modules/typescript/lib"
}`,
          try: "ضيف الملف ده لمشروعك، وبوّظ مسافات ملف واحفظ: المفروض يتنسّق ويتصلّح. وبص تحت على اليمين: مكتوب LF.",
          flag: "script",
          deep: {
            why: "من غيره: واحد بيحفظ من غير تنسيق فالـ diff يبقى مسافات، وواحد على ويندوز بيعمل ملفات CRLF، وواحد بيشغّل formatter غير اللي المشروع ماشي بيه.",
            how: R`[[editor.defaultFormatter]] بيحسم أنهي extension تنسّق، ولكل لغة تقدر تحدد غيره جوه [["[اسم اللغة]"]].

[[editor.codeActionsOnSave]] بيشغّل code actions مع الحفظ. [[source.fixAll.eslint]] معناها «صلّح كل اللي ESLint يقدر يصلّحه». القيمة [["explicit"]] معناها مع الحفظ بإيدك (Ctrl+S) مش مع الـ auto save. القيم القديمة true و false لسه شغالة، بس الجديدة explicit و always و never.

[[files.eol]] بيأثر على الملفات الجديدة بس. ملف موجود بـ CRLF هيفضل كده لحد ما تغيّره (كليك على CRLF تحت في شريط الحالة).

[[js/ts.tsdk.path]] (اسمه القديم [[typescript.tsdk]]، لسه شغال بس deprecated) بيعرّف VS Code إن فيه TypeScript جوه المشروع، بس مش بيشغّلها لوحده لأسباب أمان: كل واحد يختارها مرة من TypeScript: Select TypeScript Version ثم Use Workspace Version، فالأخطاء في المحرر تبقى نفس أخطاء [[tsc]].`,
            when: "أول يوم في أي مشروع عليه أكتر من شخص، أو شغال عليه من أكتر من جهاز.",
            mistakes: R`Prettier مع الحفظ و ESLint فيه قواعد شكل (من غير [[eslint-config-prettier]]) بيتخانقوا: كل حفظ يغيّر ويرجّع. وتحط [[files.eol]] وتفتكر إن الملفات القديمة اتصلحت: الحل الكامل [[.gitattributes]] (تاب git). وفولدر [[.vscode]] كله في [[.gitignore]] فالملف عمره ما يوصل للفريق: استثني [[settings.json]] و [[extensions.json]] و [[launch.json]] من الـ ignore.`
          },
          lines: [
            "بداية الإعدادات.",
            "نسّق الملف مع كل حفظ.",
            "بـ Prettier لكل اللغات.",
            "إلا Prisma: الـ extension بتاعتها هي اللي تنسّق.",
            "ومع كل حفظ، ESLint يصلّح اللي يتصلّح.",
            "نهاية السطر LF للملفات الجديدة، حتى على ويندوز.",
            "سطر فاضي في آخر كل ملف.",
            "امسح المسافات الزيادة في آخر السطور.",
            "TypeScript بتاع المشروع في node_modules (كل واحد يختارها مرة بـ Use Workspace Version).",
            "نهاية الإعدادات."
          ]
        },
        {
          cmd: "files.exclude",
          title: "اخفي الزحمة من شجرة الملفات والبحث",
          desc: R`[[files.exclude]] بيخفي فولدرات من شجرة الملفات والبحث و Ctrl+P. و [[search.exclude]] بيشيلها من البحث بس وتفضل ظاهرة في الشجرة. و [[files.watcherExclude]] بيقول لـ VS Code ميراقبش تغييراتها، ودا بيفرق في الأداء في مشروع ضخم.

node_modules متشالة من البحث افتراضيًا، لكن [[.next]] و [[dist]] و [[coverage]] لأ لو مش في [[.gitignore]].`,
          example: R`// .vscode/settings.json
{
  "files.exclude": { "**/.next": true, "**/coverage": true },
  "search.exclude": { "**/dist": true, "**/*.min.js": true, "**/package-lock.json": true },
  "files.watcherExclude": { "**/.next/**": true, "**/dist/**": true }
}`,
          try: "دوّر على اسم دالة في مشروع Next.js قبل وبعد الإعداد ده، وقارن عدد النتايج.",
          flag: "script",
          deep: {
            why: "Ctrl+Shift+F بيرجعلك ٢٠٠ نتيجة من ملفات build متولّدة، و Ctrl+P بيقترح [[.next/server/app/page.js]] بدل الملف الحقيقي.",
            how: R`القيم glob patterns: [[**]] معناها أي عمق من الفولدرات. [[search.exclude]] بياخد كل اللي في [[files.exclude]] ويزوّد عليه.

البحث كمان بيحترم [[.gitignore]] افتراضيًا ([[search.useIgnoreFiles]])، فأغلب ملفات الـ build متشالة لو هي في الـ ignore. الإعداد هنا للي مش في الـ ignore، أو لو عايز تشيله من الشجرة كمان.

الـ watcher بيتابع كل ملف عشان يحدّث الشجرة و Git. فولدر build بيتولّد فيه آلاف الملفات مع كل حفظ بيخلي VS Code يلهث.`,
            when: "مشروع فيه build output أو ملفات متولّدة كتير، أو monorepo.",
            mistakes: "تخفي حاجة من الشجرة وتنساها، فتدوّر على ملف «مش موجود» وهو مخفي: خلي [[files.exclude]] للحاجات اللي عمرك ما هتفتحها. وتحط [[.env]] في files.exclude عشان «محدش يشوفه»: ده عرض بس، والملف موجود وممكن يدخل commit."
          },
          lines: [
            "بداية الإعدادات.",
            "اخفي .next و coverage من الشجرة والبحث و Ctrl+P.",
            "شيل من البحث بس: dist والملفات المضغوطة والـ lock file.",
            "متراقبش تغييرات فولدرات الـ build.",
            "نهاية الإعدادات."
          ]
        },
        {
          cmd: ".vscode/extensions.json",
          title: "قول للفريق يسطّب أنهي extensions",
          desc: R`الملف ده فيه IDs الـ extensions اللي المشروع محتاجها. أول ما حد يفتح المشروع، VS Code بيسأله «تسطّب الـ extensions المقترحة؟». وفي تاب Extensions، الفلتر [[@recommended]] بيعرضهم.

الـ ID بتلاقيه في صفحة الـ extension، أو كليك يمين عليها ثم Copy Extension ID. و Add to Workspace Recommendations من نفس القايمة بيضيفها للملف لوحده.`,
          example: R`// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "Prisma.prisma",
    "EditorConfig.EditorConfig"
  ],
  "unwantedRecommendations": ["hookyqr.beautify"]
}`,
          try: "اعمل الملف ده في مشروعك بالـ extensions اللي فعلًا بتستخدمها، وافتح المشروع من profile فاضي (درس Profiles) وشوف الرسالة.",
          flag: "script",
          deep: {
            why: "زميل جديد بيفتح المشروع من غير ESLint فمش شايف الأخطاء، والـ formatOnSave في settings.json مش بيعمل حاجة من غير Prettier.",
            how: R`VS Code مش بيسطّب حاجة لوحده، بيقترح بس، والقرار للي فاتح المشروع. [[unwantedRecommendations]] بتمنع VS Code يقترح extensions بتتعارض مع إعداد المشروع (formatter تاني مثلًا).

في Dev Containers الموضوع أقوى: اللستة في devcontainer.json بتتسطّب فعلًا جوه الـ container.

خلي اللستة قصيرة: اللي المشروع بيعتمد عليه بس، مش ذوقك (الثيم مثلًا).`,
            when: "أي مشروع مشترك، ومع settings.json اللي بيعتمد على extensions.",
            mistakes: "تكتب اسم الـ extension بدل الـ ID ([[ESLint]] بدل [[dbaeumer.vscode-eslint]]) فمش هيلاقيها. وتحط ١٥ extension فمحدش هيسطّب حاجة."
          },
          lines: [
            "بداية الملف.",
            "اللستة المقترحة:",
            "ESLint: الأخطاء في المحرر والـ fix مع الحفظ.",
            "Prettier: الـ formatter.",
            "اقتراحات Tailwind classes.",
            "Prisma: الألوان والتنسيق والاقتراحات في schema.prisma.",
            "EditorConfig: يطبّق .editorconfig.",
            "نهاية اللستة.",
            "extensions متقترحهاش (formatter بيتعارض مع Prettier).",
            "نهاية الملف."
          ]
        }
      ]
    },
    {
      t: "تشغيل و Debug بملف",
      l: 3,
      n: "launch.json و tasks.json: الـ debug والأوامر المتكررة بضغطة، ومتسجلة في الـ repo",
      items: [
        {
          cmd: "launch.json",
          title: "debug لسيرفر Node بـ F5، أو اتصل بواحد شغال",
          desc: R`[[.vscode/launch.json]] فيه طرق التشغيل بالـ debugger، وتختار واحدة من Run and Debug (Ctrl+Shift+D) و F5. الأولى هنا بتشغّل [[npm run dev]] بالـ debugger، والتانية بتتصل بعملية Node شغالة أصلًا بـ [[--inspect]] (محلي أو جوه Docker).

من غير الملف ده، JavaScript Debug Terminal (مستوى ٢) أسرع. الملف مفيد لما التشغيل محتاج إعدادات، أو عايز الفريق كله يعمل debug بنفس الطريقة.`,
          example: R`// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "API: npm run dev", "type": "node", "request": "launch",
      "runtimeExecutable": "npm", "runtimeArgs": ["run", "dev"],
      "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
      "console": "integratedTerminal"
    },
    {
      "name": "Attach 9229 (Docker)", "type": "node", "request": "attach",
      "port": 9229, "restart": true,
      "localRoot": "$__{workspaceFolder}", "remoteRoot": "/app"
    }
  ]
}`,
          try: "انسخ الإعداد الأول لمشروع Express عندك، وحط breakpoint في route، وشغّل F5 من Run and Debug.",
          flag: "script",
          deep: {
            why: "كل مرة تعمل debug بتفتكر الأمر والـ flags. الملف بيحفظهم، وأي حد في الفريق يدوس F5 ويشتغل.",
            how: R`[[type]] بيحدد الـ debugger (node للسيرفر، و chrome أو msedge للمتصفح). و [[request]] يا launch (VS Code يشغّل البرنامج) يا attach (يتصل بواحد شغال).

[[runtimeExecutable]] مع [[runtimeArgs]] بيشغّل npm script بدل ملف معين، فأي حاجة السكربت بيعملها (tsx، nodemon، متغيرات بيئة) بتفضل زي ما هي، والـ debugger بيتربط بعمليات Node اللي بتتولد.

في الـ attach لـ container: الكود جوه في [[/app]] وعندك في فولدر المشروع، و [[localRoot]] و [[remoteRoot]] بيربطوا المسارين عشان الـ breakpoints تقف صح. و [[restart]] بيعيد الاتصال لو nodemon عمل restart.

[[$__{workspaceFolder}]] بيتبدل بفولدر المشروع وقت التشغيل. و Ctrl+Space جوه الملف بيقترح الـ properties، وزرار Add Configuration بيحط قوالب جاهزة.`,
            when: "مشروع بتعمل فيه debug كتير، أو محتاج attach لـ Docker، أو عايز الفريق يبدأ debug بنفس الطريقة.",
            mistakes: "الـ breakpoints رمادي في الـ attach لـ Docker لأن [[remoteRoot]] غلط، أو لأن [[--inspect]] بيسمع على 127.0.0.1 جوه الـ container فمش واصل (لازم 0.0.0.0، تاب node). و [[--inspect]] على بورت مفتوح في الإنتاج: أي حد يتصل يقدر ينفّذ كود."
          },
          lines: [
            "بداية الملف.",
            "نسخة شكل الملف، سيبها زي ما هي.",
            "لستة طرق التشغيل، كل واحدة بتظهر في القايمة.",
            "الأولى:",
            "اسمها في القايمة، و debugger بتاع Node، و VS Code هو اللي يشغّل.",
            "شغّل npm run dev بدل ملف معين.",
            "F11 ميدخلش جوه Node نفسه أو node_modules.",
            "الـ output في الترمنال المدمج.",
            "نهاية الأولى.",
            "التانية:",
            "اتصل بعملية شغالة بدل ما تشغّل واحدة.",
            "على بورت 9229، ولو العملية عملت restart اتصل تاني.",
            "الكود عندك في فولدر المشروع، وجوه الـ container في /app.",
            "نهاية التانية.",
            "نهاية اللستة.",
            "نهاية الملف."
          ]
        },
        {
          cmd: "launch.json لـ Next.js",
          title: "debug للسيرفر والمتصفح في Next.js",
          desc: R`Next.js فيه كود بيشتغل على السيرفر (Server Components و route handlers و server actions) وكود بيشتغل في المتصفح. الإعداد الأول بيشغّل [[npm run dev -- --inspect]] وبيقف في كود السيرفر، والتاني بيفتح Chrome متوصل بالـ debugger فبيقف في كود المتصفح. و [[compounds]] بيشغّل الاتنين بضغطة.

الإعدادات دي مبنية على توثيق Next.js نفسه. ولو المشروع في monorepo، ضيف [["cwd": "$__{workspaceFolder}/apps/web"]] للأولى.`,
          example: R`// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: server", "type": "node-terminal", "request": "launch",
      "command": "npm run dev -- --inspect"
    },
    {
      "name": "Next.js: client", "type": "chrome", "request": "launch",
      "url": "http://localhost:3000"
    }
  ],
  "compounds": [{ "name": "Next.js: both", "configurations": ["Next.js: server", "Next.js: client"] }]
}`,
          try: "في مشروع Next.js: حط breakpoint في route handler وواحد في onClick في component، وشغّل Next.js: both، وجرّب الاتنين.",
          flag: "script",
          deep: {
            why: "console.log في Next.js بيطلع مرة في الترمنال ومرة في المتصفح، ومش واضح الكود ده بيتنفذ فين. الـ debugger بيقف في الناحيتين.",
            how: R`[[node-terminal]] بيفتح ترمنال debug ويشغّل الأمر فيه، زي JavaScript Debug Terminal بالظبط بس محفوظ. والـ [[--]] في [[npm run dev -- --inspect]] بتعدّي [[--inspect]] لـ next مش لـ npm.

[[chrome]] بيفتح نسخة Chrome منفصلة متوصلة بـ VS Code، والـ breakpoints في ملفات [[.tsx]] بتقف في المتصفح بفضل الـ source maps. لو بتستخدم Edge: [["type": "msedge"]].

لو غيّرت البورت، غيّر 3000 في الـ url.`,
            when: "bug في Next.js ومش عارف هو في السيرفر ولا المتصفح، أو server action بتعمل حاجة غريبة.",
            mistakes: R`breakpoint في Server Component وانت شغال بإعداد المتصفح بس فمش بيقف، أو العكس. اعرف الكود بيتنفذ فين الأول: [["use client"]] في أول الملف معناه متصفح. وبورت 3000 مشغول فـ Next يقوم على 3001، والمتصفح المتوصل بيفتح 3000 الغلط.`
          },
          lines: [
            "بداية الملف.",
            "نسخة شكل الملف.",
            "الإعدادات:",
            "الأولى:",
            "كود السيرفر: ترمنال debug.",
            "بيشغّل الـ dev server بـ --inspect.",
            "نهاية الأولى.",
            "التانية:",
            "كود المتصفح: Chrome متوصل بالـ debugger.",
            "على عنوان الـ dev server.",
            "نهاية التانية.",
            "نهاية الإعدادات.",
            "الاتنين مع بعض بضغطة F5 واحدة.",
            "نهاية الملف."
          ]
        },
        {
          cmd: "tasks.json",
          title: "شغّل أوامر المشروع بضغطة والأخطاء تروح Problems",
          desc: R`[[.vscode/tasks.json]] بيحوّل أوامر المشروع لـ tasks تشغّلها من Terminal ثم Run Task، أو Ctrl+Shift+B للـ default build task. والأهم: الـ problem matcher بيقرا output الأمر ويحط الأخطاء في لوحة Problems، والكليك بيوديك للسطر.

هنا [[typecheck]] على المشروع كله هو الـ build الافتراضي، فـ Ctrl+Shift+B بيطلّع كل أخطاء TypeScript في كل الملفات، مش المفتوحة بس.`,
          example: R`// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "typecheck", "type": "npm", "script": "typecheck",
      "problemMatcher": "$tsc",
      "group": { "kind": "build", "isDefault": true }
    },
    {
      "label": "lint", "type": "npm", "script": "lint",
      "problemMatcher": "$eslint-stylish"
    }
  ]
}`,
          try: "ضيف الملف ده (والسكربتات typecheck و lint في package.json)، واضغط Ctrl+Shift+B، وبص على Problems.",
          flag: "script",
          deep: {
            why: "لوحة Problems بتعرض أخطاء الملفات المفتوحة بس، و [[tsc]] في ترمنال عادي بيطبع نص طويل.",
            how: R`[["type": "npm"]] مع [[script]] بيشغّل [[npm run typecheck]]. [[problemMatcher]] بيقول لـ VS Code يقرا الـ output بأنهي شكل: [[$tsc]] لأخطاء TypeScript، و [[$eslint-stylish]] (من ESLint extension) لـ ESLint.

[[group]] build مع [[isDefault]] بيخليها هي اللي بتشتغل بـ Ctrl+Shift+B (Shift+Cmd+B على الماك). ولو فيه أكتر من task، Run Task بيعرضهم كلهم.

وتقدر تديها اختصار خاص في keybindings.json، أو تخليها تشتغل قبل الـ debug بـ [[preLaunchTask]] في launch.json.`,
            when: "أي أمر بتشغّله كتير ومحتاج تشوف أخطاؤه: typecheck، و lint، و build، و generate.",
            mistakes: R`task لـ dev server من غير [["isBackground": true]] ومن غير problem matcher يعرف إمتى السيرفر قام، فالـ preLaunchTask يفضل مستني للأبد. و [["problemMatcher": []]] بيقفل القراية خالص: كويس لأمر ملوش أخطاء، وحش لـ typecheck.`
          },
          lines: [
            "بداية الملف.",
            "نسخة شكل الملف.",
            "الـ tasks:",
            "الأولى:",
            "اسمها typecheck، وبتشغّل npm run typecheck.",
            "اقرا الأخطاء بشكل tsc وحطها في Problems.",
            "هي الـ build الافتراضي (Ctrl+Shift+B).",
            "نهاية الأولى.",
            "التانية:",
            "npm run lint.",
            "اقرا أخطاء ESLint بالشكل الافتراضي بتاعه.",
            "نهاية التانية.",
            "نهاية اللستة.",
            "نهاية الملف."
          ]
        }
      ]
    },
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
          lines: [
            "لستة الاختصارات.",
            "Ctrl+Alt+R وانت في الكود: ابعت السطر أو التحديد للترمنال.",
            "Ctrl+Shift+Alt+T: شغّل الـ task اللي اسمها typecheck.",
            "Ctrl+Alt+M: كبّر اللوحة اللي تحت (الترمنال) ورجّعها.",
            "نهاية اللستة."
          ]
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
          ]
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
          }
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
          lines: [
            "افتح فولدر على السيرفر prod (الاسم من ~/.ssh/config).",
            "نفس الحكاية لتوزيعة WSL اسمها Ubuntu.",
            "الـ VS Code Server واخد مساحة قد إيه على السيرفر."
          ]
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
          ]
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
          lines: [
            "بداية الملف.",
            "الفولدرات:",
            "apps/web وهيظهر باسم web.",
            "apps/api وهيظهر باسم api.",
            "المكتبة المشتركة.",
            "نهاية اللستة.",
            "إعداد يسري على كل الفولدرات.",
            "نهاية الملف."
          ]
        }
      ]
    },
    {
      t: "الأمر code من الترمنال",
      l: 3,
      n: "تفتح وتقفز لسطر وتقارن وتنقل الـ extensions من غير ما تسيب الترمنال",
      items: [
        {
          cmd: "code .",
          title: "افتح الفولدر الحالي في VS Code",
          desc: R`[[code .]] بيفتح الفولدر اللي انت فيه في شباك جديد. [[code -r .]] بيفتحه في آخر شباك مفتوح بدل شباك جديد. و [[code file.ts]] بيفتح ملف، ولو مش موجود بيعمله. و [[-]] بيقرا من الـ output اللي داخله ويفتحه كملف.

على ويندوز ولينكس الأمر بيتسطّب مع VS Code. على الماك: Command Palette ثم Shell Command: Install 'code' command in PATH. وجوه WSL بيفتح VS Code متوصل بلينكس (تاب WSL، درس «VS Code»).`,
          example: R`cd ~/projects/myapp && code .
code -r .
code README.md .env.example
git log --oneline -30 | code -`,
          try: "من الترمنال في مشروعك: [[code -r .]]، وبعدين [[git log --oneline -30 | code -]] وشوف النتيجة كملف تقدر تدوّر فيه بـ Ctrl+F.",
          deep: {
            why: "انت في الترمنال في الفولدر الصح. إنك تفتح VS Code وتدوّر على الفولدر من File ثم Open Folder رجوع لورا.",
            how: R`[[code]] سكربت صغير بيكلّم VS Code: لو فيه شباك مفتوح بيبعتله، ولو لأ بيشغّله. الفولدر اللي بيتفتح بيبقى جذر المشروع، فإعدادات [[.vscode]] اللي فيه بتتطبق، والترمنال المدمج بيبدأ منه.

[[-n]] شباك جديد دايمًا، و [[-r]] آخر شباك. و [[-]] بيقرا اللي داخله من pipe، فأي output طويل تفتحه وتدوّر فيه براحتك.`,
            when: "كل مرة تفتح مشروع، وأي output طويل عايز تقراه براحتك.",
            mistakes: "تفتح فولدر أب فيه ١٠ مشاريع، فـ ESLint و TypeScript يتلخبطوا والبحث يبقى بطيء: افتح المشروع نفسه. وعلى الماك تكتب code فيقولك command not found: لسه ما عملتش Install 'code' command in PATH."
          },
          lines: [
            "روح لفولدر المشروع وافتحه.",
            "افتحه في الشباك الحالي بدل شباك جديد.",
            "افتح ملفين.",
            "افتح output أي أمر كملف في المحرر."
          ]
        },
        {
          cmd: "code --goto",
          title: "افتح ملف على سطر وعمود معين",
          desc: R`[[code --goto file:line:column]] (أو [[-g]]) بيفتح الملف والمؤشر على المكان بالظبط. مفيد مع أي أداة بتطبع مسارات بالشكل ده: eslint و tsc و grep و stack traces.

و [[code --wait]] (أو [[-w]]) بيستنى لحد ما تقفل الملف، ودا اللي بيخلي VS Code ينفع يبقى المحرر بتاع Git.`,
          example: R`code --goto src/server.ts:118:12
code -r -g package.json:5
git config --global core.editor "code --wait"`,
          try: R`شغّل [[npx tsc --noEmit]] وخد أول غلط وافتحه بـ [[code -g]]. وبعدين اضبط core.editor واعمل [[git commit]] من غير [[-m]]: الرسالة هتتفتح في تاب، اكتبها واقفل التاب.`,
          deep: {
            why: "الأداة قالتلك المكان بالظبط. نسخ اسم الملف وفتحه وبعدين Ctrl+G تلات خطوات، و --goto خطوة.",
            how: R`الصيغة [[path:line:column]] والعمود اختياري، والمسار نسبي للمكان اللي انت فيه في الترمنال.

[[--wait]] بيخلي الأمر ميرجعش لحد ما تقفل التاب. Git بيفتح ملف رسالة الـ commit ويستنى، ولما تقفل التاب يكمّل. من غير [[--wait]]، Git هيلاقي الرسالة فاضية ويلغي الـ commit.

جوه الترمنال المدمج مش محتاج --goto: Ctrl+Click على المسار بيعمل نفس الحاجة.`,
            when: "سكربتات وأدوات بتطبع مسارات، وضبط Git أول مرة على جهاز.",
            mistakes: "تنسى [[--wait]] في core.editor، فكل commit من غير -m يتلغي بـ «Aborting commit due to empty commit message». ومسار فيه مسافات من غير علامات تنصيص."
          },
          lines: [
            "افتح server.ts على سطر 118 عمود 12.",
            "في الشباك الحالي، على سطر 5.",
            "خلي Git يفتح رسايل الـ commit والـ rebase في VS Code ويستنى تقفلها."
          ]
        },
        {
          cmd: "code --diff",
          title: "قارن ملفين جنب بعض",
          desc: R`[[code --diff a b]] (أو [[-d]]) بيفتح الملفين في diff: الفرق متلوّن، وتقدر تعدّل في الجهة اليمين. مفيد لملفين config (local و production)، أو نسختين من ملف مش في Git.

ومن جوه المحرر: كليك يمين على ملف في الشجرة ثم Select for Compare، وعلى التاني Compare with Selected.`,
          example: R`code --diff .env.example .env
code -d nginx.conf nginx.conf.bak
git config --global diff.tool vscode
git config --global difftool.vscode.cmd 'code --wait --diff $LOCAL $REMOTE'`,
          try: R`قارن [[.env.example]] بـ [[.env]] في مشروعك وشوف مين ناقص. وجرّب [[git difftool HEAD~1 -- package.json]] بعد الإعداد.`,
          deep: {
            why: "«ليه شغال على جهازي ومش على السيرفر؟» كتير بتبقى سطرين مختلفين في config، وعينك مش هتلاقيهم في ملفين ١٠٠ سطر.",
            how: R`الـ diff editor هو نفسه اللي Source Control بيستخدمه: الأسهم فوق بتنقل بين التغييرات، والجهة اليمين قابلة للتعديل. وتقدر تخليه inline بدل جنب بعض من الأيقونات فوق.

[[git difftool]] بعد الإعداد بيفتح كل ملف متغير في VS Code واحد ورا التاني. و [[$LOCAL]] و [[$REMOTE]] بيحط Git مكانهم مسارات مؤقتة للنسختين.

وفيه [[--merge]] لـ 3-way merge من برا، بس جوه المشروع Merge Editor (مستوى ٢) أسهل.`,
            when: "مقارنة configs، أو نسخ ملفات من مصادر مختلفة، أو مراجعة قبل ما تكتب فوق ملف.",
            mistakes: "تكتب الأمر بعلامات تنصيص مزدوجة في bash، فالـ shell يبدّل [[$LOCAL]] بفاضي قبل ما يوصل لـ Git: استخدم علامات مفردة زي المثال. وتنسى إن الجهة اليمين ملف حقيقي، فتعدّل فيها بالغلط وتحفظ."
          },
          lines: [
            "شوف الـ .env ناقصه أنهي متغيرات من المثال.",
            "قارن config بالنسخة الاحتياطية قبل ما ترجّعها.",
            "خلي VS Code أداة الـ diff بتاعة Git.",
            "الأمر اللي Git يشغّله: النسختين في diff، ويستنى تقفل."
          ]
        },
        {
          cmd: "code --list-extensions",
          title: "خد backup للـ extensions ورجّعها على جهاز جديد",
          desc: R`[[code --list-extensions]] بيطبع IDs كل الـ extensions المتسطّبة، سطر لكل واحدة. احفظها في ملف، وعلى الجهاز الجديد سطّبهم بـ [[code --install-extension]] في loop.

ودا بديل لـ Settings Sync لو مش عايز تربط حساب، أو عايز لستة مكتوبة تشاركها أو تحطها مع الـ dotfiles.`,
          example: R`code --list-extensions > extensions.txt
code --list-extensions --show-versions
xargs -L 1 code --install-extension < extensions.txt
code --install-extension dbaeumer.vscode-eslint
code --uninstall-extension ms-python.python
# PowerShell:
Get-Content extensions.txt | ForEach-Object { code --install-extension $_ }`,
          try: "خد backup للـ extensions عندك في ملف، وافتحه وامسح منه اللي مبقتش بتستخدمه. دي فرصة تنضّف.",
          deep: {
            why: "جهاز جديد أو فورمات، وعندك ٣٠ extension مش فاكر أساميهم.",
            how: R`الـ ID شكله [[publisher.name]]، وهو نفسه اللي بيتكتب في extensions.json و devcontainer.json. و [[--install-extension]] بيقبل ID أو مسار ملف [[.vsix]] (لـ extension مش على الـ marketplace، أو جهاز من غير نت).

الأوامر دي بتشتغل على الـ profile الحالي، و [[--profile]] بيحدد profile معين.

جوه WSL أو Remote، [[code --list-extensions]] بيطبع الـ extensions اللي على الناحية دي (لينكس) مش اللي على ويندوز.`,
            when: "قبل فورمات أو جهاز جديد، أو تجهيز جهاز لطلبة أو لزميل.",
            mistakes: "ترجّع كل حاجة اتسطّبت من ٣ سنين فيرجع الزحام والبطء. وتحفظ اللستة من جوه WSL وتفتكرها كل حاجة، وهي نص الحكاية."
          },
          lines: [
            "احفظ الـ IDs في ملف.",
            "بالنسخ، عشان تعرف لو تحديث extension هو اللي بوّظ حاجة.",
            "سطّب كل سطر في الملف (bash أو WSL أو Git Bash).",
            "سطّب واحدة بالـ ID.",
            "شيل واحدة.",
            "نفس الـ restore من PowerShell."
          ]
        }
      ]
    },
    {
      t: "لما المحرر يتقل أو يبوظ",
      l: 3,
      n: "Reload، وتقفل الـ extensions، وتعرف مين التقيل، وتختار اللي يستاهل بس",
      items: [
        {
          cmd: "Reload Window",
          title: "الأخطاء الحمرا مش حقيقية أو المحرر معلّق",
          desc: R`Developer: Reload Window من Command Palette بيعيد تحميل الشباك في ثانيتين، من غير ما تقفل VS Code، والتابات بترجع زي ما هي. أغلب «VS Code باظ» بتتحل بيه.

ولو المشكلة في TypeScript بالذات (خط أحمر على حاجة موجودة، أو import مش شايفه بعد [[npm install]] أو [[prisma generate]])، TypeScript: Restart TS Server أخف. ونفس الحكاية لـ ESLint: Restart ESLint Server.`,
          example: R`Ctrl+Shift+P           Developer: Reload Window
Ctrl+Shift+P           TypeScript: Restart TS Server
Ctrl+Shift+P           ESLint: Restart ESLint Server
Ctrl+Shift+U           Output panel: pick "TypeScript" or "ESLint" to see why
Mac: Shift+Cmd+U / Linux: Ctrl+K Ctrl+H`,
          try: "بعد [[npx prisma generate]] أو إضافة مكتبة، لو لسه فيه خط أحمر على حاجة موجودة، جرّب Restart TS Server بدل ما تقفل VS Code.",
          flag: "keys",
          deep: {
            why: "الـ language server بيبني صورة للمشروع في الذاكرة، ولما حاجات تتغير من برا (مكتبة جديدة، types متولّدة، checkout لفرع مختلف جدًا) الصورة ممكن تتأخر.",
            how: R`كل لغة ليها عملية منفصلة (TypeScript server، ESLint server). الـ Restart بيقفل العملية دي ويعيدها فتقرا المشروع من الأول. و Reload Window بيعيد تشغيل كل الـ extensions مرة واحدة.

لوحة Output (من القايمة اللي فيها تختار الـ extension) بتوريك رسايل كل extension، زي «Cannot find module» أو «config not found»، ودا أول مكان تبص فيه لو extension مش شغالة.`,
            when: "أخطاء مش منطقية بعد تسطيب أو توليد أو تبديل فرع، أو extension بطّلت ترد.",
            mistakes: "تقفل VS Code كله وتفتحه، ودا أبطأ وبيقفل الترمنالات والـ dev server. أو تفضل تعمل Restart والمشكلة إن TypeScript بتاع VS Code غير بتاع المشروع: شوف [[js/ts.tsdk.path]] في درس «.vscode/settings.json»."
          }
        },
        {
          cmd: "code --disable-extensions",
          title: "اعرف لو extension هي اللي مبوّظة المحرر",
          desc: R`[[code --disable-extensions .]] بيفتح المشروع من غير أي extension. لو المشكلة اختفت، يبقى extension هي السبب. ومن جوه المحرر: Help: Start Extension Bisect بيقفل نص الـ extensions ويسألك «المشكلة لسه موجودة؟» لحد ما يلاقي المتهمة.

و Developer: Show Running Extensions بيوريك كل extension خدت كام وقت عشان تشتغل، ودا بيوضّح مين التقيلة.`,
          example: R`code --disable-extensions .
code --disable-extension eamodio.gitlens .
code --status`,
          try: "افتح مشروعك بـ [[--disable-extensions]] وقارن سرعة الفتح. وبعدين في الوضع العادي شوف Show Running Extensions ورتّبهم بالوقت.",
          deep: {
            why: "VS Code بطيء، أو الكتابة بتقطّع، أو format on save بيعمل حاجة غريبة. غالبًا extension، بس أنهي واحدة من ٣٠؟",
            how: R`[[--disable-extensions]] للجلسة دي بس، مش بيغيّر حاجة في الإعدادات. والـ Bisect بيعمل binary search: ٣٠ extension محتاجين حوالي ٥ أسئلة بس.

Help ثم Open Process Explorer بيوريك كل عملية VS Code والرام والـ CPU بتوعها: الـ extension host، والـ TypeScript server، والترمنالات. عملية واكلة ١٠٠٪ CPU هي أول متهم.

ولما تلاقيها: Disable (Workspace) في صفحة الـ extension بيقفلها للمشروع ده بس، فتفضل شغالة في المشاريع اللي محتاجاها.`,
            when: "بطء، أو تقطيع، أو سلوك غريب ظهر فجأة (غالبًا بعد تحديث extension).",
            mistakes: "تمسح VS Code وتسطّبه تاني، والـ extensions والإعدادات بترجع زي ما هي لأنها في فولدر المستخدم مش فولدر البرنامج. أو تفتكر المشكلة في VS Code والسبب مشروع فيه فولدرات build ضخمة من غير [[files.watcherExclude]]."
          },
          lines: [
            "افتح المشروع من غير أي extension.",
            "اقفل extension واحدة بس للجلسة دي.",
            "اطبع العمليات والرام والـ CPU (و VS Code مفتوح)."
          ]
        },
        {
          cmd: "Ctrl+Shift+X",
          title: "الـ extensions اللي تستاهل لمشروع Node و React",
          desc: R`Ctrl+Shift+X بيفتح الـ extensions، وفيه فلاتر: [[@installed]] و [[@recommended]] (من extensions.json) و [[@disabled]] و [[@builtin]]. وكل extension ليها Disable و Disable (Workspace).

اللي بيفرق فعلًا لمشروع Node و React و Docker: ESLint و Prettier (الأخطاء والشكل)، و Tailwind CSS IntelliSense، و Prisma، و extension الـ Docker من Microsoft (الـ Dockerfile و compose)، و GitLens (أو الـ blame المدمج لو كفاية)، و REST Client أو Thunder Client (تبعت requests من المحرر)، و Error Lens (الغلط مكتوب في آخر السطر)، و EditorConfig.`,
          example: R`Ctrl+Shift+X                 Extensions (Shift+Cmd+X on Mac)
@installed                   what you have
@recommended                 what this project suggests (.vscode/extensions.json)
@disabled / @builtin         disabled ones / shipped with VS Code
gear, Disable (Workspace)    off for this project only`,
          try: "افتح [[@installed]] وعدّهم. أي واحدة ما استخدمتهاش من شهر: Disable، وبعد أسبوع لو محدش افتقدها، Uninstall.",
          flag: "keys",
          deep: {
            why: "كل extension بتاكل رام ووقت تشغيل، وبعضها بيتعارض مع بعض (formatterين، اتنين linters). ٥ كويسين أحسن من ٤٠.",
            how: R`الـ extensions بتشتغل في عملية اسمها extension host. أغلبها بيصحى لما يحتاج بس (ملف من لغتها اتفتح)، بس فيه اللي بيصحى مع أول فتح ويفضل شغال.

Disable (Workspace) بيتحفظ لكل مشروع، فمشروع Python ميشغّلش extensions الـ React والعكس. ولو عايز فصل كامل: Profiles.

قبل ما تسطّب: بص على الناشر (علامة verified) وعدد التسطيبات وآخر تحديث. الـ extension بتشتغل بصلاحيات حسابك: تقرا ملفاتك وتكلّم النت.`,
            when: "إعداد جهاز جديد، أو المحرر بقى بطيء، أو مشروع بستاك جديد.",
            mistakes: "تسطّب Prettier ومعاه Beautify ومعاه formatter تالت، فكل حفظ الشكل يتغير: واحد بس، ومحدد في [[editor.defaultFormatter]]. وتسطّب extension من ناشر مجهول بيقلّد اسم مشهور: الـ extensions ليها صلاحيات كاملة على ملفاتك."
          }
        }
      ]
    }
  ]
});
