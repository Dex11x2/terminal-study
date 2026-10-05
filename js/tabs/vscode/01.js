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
          },
          sol: R`حدد الـ ٥ سطور الأول، وبعدين Ctrl+Shift+P واكتب [[sort]]: هيظهر «Sort Lines Ascending» و «Sort Lines Descending». اختار الأول، والسطور هتترتب أبجديًا. الترتيب بيفرّق بين الكابيتال والصغير، فممكن [[Zebra]] تيجي قبل [[apple]]. ولو محددتش حاجة، هيرتب الملف كله. و [[Toggle Word Wrap]] هتلاقي جنبه [[Alt+Z]] (أو [[⌥Z]] على الماك): أي أمر ليه اختصار، الـ Palette بيعرضه جنبه، ودي أسهل طريقة تتعلم بيها الاختصارات.

لو Ctrl+Shift+P معملش حاجة والكيبورد على العربي، جرّب F1، ده نفس الأمر ومش بيتأثر باللغة. ولو ظهرت خانة فيها [[>]] في أولها، ده الطبيعي: الـ [[>]] معناها «أوامر»، ولو مسحتها هتتحول لبحث ملفات زي Ctrl+P.`
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
          },
          sol: R`اكتب جزء من الاسم، زي [[usrctrl]]، وهيطلع [[users.controller.ts]] أول نتيجة والحروف اللي طابقتها ملوّنة. Enter يفتحه. وللسطر: [[user.ts:40]] يفتح الملف والمؤشر على سطر 40 في نص الشاشة. ملف بعد ملف، والتابات هتفضل مفتوحة فوق.

لو الملف فتح واتقفل لما فتحت اللي بعده، ده «Preview mode»: التاب بيبقى اسمه مايل، والملف اللي بتفتحه بعده بياخد مكانه. دبل كليك على التاب أو عدّل في الملف يثبته، أو اقفل الخاصية بـ [[workbench.editor.enablePreviewFromQuickOpen]]. ولو ملف مش بيظهر خالص، غالبًا متجاهل بـ [[files.exclude]] أو في [[.gitignore]] (زي حاجة جوه dist).`
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
          },
          sol: R`[[npx tsc --noEmit]] بيطبع أغلاط بالشكل ده: [[src/server.ts:118:12 - error TS2345: Argument of type ...]]. الرقمين بعد اسم الملف هما السطر والعمود. افتح الملف، و Ctrl+G هيطلع خانة فيها [[:]] ومكتوب تحتها السطر الحالي وعدد السطور. اكتب [[118:12]] و Enter، المؤشر هيقف على الغلط بالظبط. و Ctrl+Click (أو Cmd+Click على الماك) على [[src/server.ts:118:12]] في الترمنال المدمج بيعمل نفس الحاجة مرة واحدة.

لو tsc مطبعش حاجة، مبروك مفيش أغلاط: جرّب تكتب غلط عمدًا. ولو الأغلاط طلعت بالشكل القديم [[src/server.ts(118,12)]] (بيحصل لو الناتج مش في ترمنال)، الرقمين نفس المعنى. وعلى الماك Ctrl+G بـ Control مش Cmd، لأن Cmd+G هو «find next».`
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
          },
          sol: R`Ctrl+Shift+O هيفتح لستة بكل الدوال والـ classes والمتغيرات في الملف، ووانت بتتحرك فيها بالأسهم، المحرر بيوريك مكان كل واحدة ويظللها. اكتب [[:]] بعد الـ [[@]] (يعني [[@:]]) واللستة تتقسم مجموعات: [[functions (6)]]، [[variables (3)]]، إلخ. و Ctrl+T هيطلع خانة بتبدأ بـ [[#]]: اكتب اسم دالة من ملف تاني وهيجيبها باسم الملف جنبها.

لو اللستة فاضية أو فيها «No symbol information»، يبقى language server مش شغال للملف ده (مثلًا ملف [[.js]] من غير extension أو المشروع لسه بيتحمّل). و Ctrl+T ممكن ميلاقيش حاجة غير لما تفتح ملف TS واحد على الأقل، لأن TypeScript server بيبدأ مع أول ملف. وعلى لينكس Ctrl+Shift+O ممكن تكون محجوزة من الـ desktop في بعض التوزيعات.`
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
          },
          sol: R`دوسة واحدة سريعة على Ctrl+Tab وتسيب: هترجع للملف اللي كنت فيه قبل كده. دوسة تانية: ترجع للأول. يعني الاتنين بيتبدلوا. ولو ماسك Ctrl ودوست Tab كذا مرة، هتشوف لستة بكل الملفات المفتوحة بترتيب آخر استخدام، والملف اللي تسيب Ctrl عنده هو اللي بيفتح.

لو Ctrl+Tab بيمشي على التابات بالترتيب من الشمال لليمين بدل آخر استخدام، ده أمر تاني (Ctrl+PageDown). ممكن حد غيّر الاختصار، ارجعله في Keyboard Shortcuts. وعلى الماك الاختصار Control+Tab مش Cmd+Tab، لأن Cmd+Tab بتاع الماك نفسه.`
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
          },
          sol: R`كل F12 بيوديك لملف أو مكان جديد، و VS Code بيحفظ كل قفزة. بعد ٣ قفزات، Alt+Left تلات مرات هيرجّعك بالعكس لنفس السطر اللي بدأت منه في ملف routes. و Alt+Right بيروح لقدام تاني.

على لينكس الاختصار Ctrl+Alt+Minus، وعلى الماك Ctrl+Minus (Control مش Cmd). Alt+Left على لينكس ساعات بيتاخد من الـ desktop، ولو الكيبورد عربي ومحتاج Minus، استخدم الـ Minus اللي في الـ numpad أو جرّب الـ layout الإنجليزي. ولو Alt+Left رجّعك لمكان غريب، ده لأن أي تحريك كبير للمؤشر (زي Ctrl+End) بيتحسب كقفزة برضه.`
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
          },
          sol: R`Ctrl+B يقفل الـ sidebar اللي فيه شجرة الملفات، و Ctrl+J يقفل اللوحة اللي تحت (الترمنال و Problems). المحرر هياخد الشاشة كلها. Ctrl+Shift+E هيفتح الـ sidebar على Explorer والـ focus جوه الشجرة، تقدر تتحرك بالأسهم و Enter يفتح. و Ctrl+B تاني يقفله لما تخلص.

لو Ctrl+Shift+E فتح الشجرة وضغطت تاني ومقفلتش، ده طبيعي: Ctrl+Shift+E بيفتح بس، و Ctrl+B هو اللي بيبدّل. وعلى لينكس Ctrl+Shift+E ممكن تبقى محجوزة (في بعض أنظمة الإدخال زي IBus للرموز)، وساعتها هيطلع [[e]] بخط تحت بدل ما يفتح، غيّر اختصار IBus أو استخدم Palette.`
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
          },
          sol: R`افتح [[schema.prisma]]، Ctrl+\ هيعمل نسخة منه في نص يمين. في النص اليمين Ctrl+P وافتح الملف التاني، هيفتح مكان النسخة. Ctrl+1 يحط المؤشر في الشمال و Ctrl+2 في اليمين، والإطار حوالين المحرر النشط بيوضح انت فين.

لو Ctrl+\ مشتغلش والكيبورد على العربي، ده غالبًا بسبب إن زرار [[\]] في الـ layout العربي مش نفس الحرف، حوّل للإنجليزي أو استخدم Ctrl+Shift+P ثم «Split Editor». ولو Ctrl+1 فتح تاب رقم واحد بدل الانتقال، يبقى فيه extension غيّر الاختصار.`
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
          },
          sol: R`Ctrl+K (سيب) ثم Ctrl+W هيقفل الـ ٥ ملفات. Ctrl+Shift+T مرة هيرجّع ملف، ومرة تانية يرجّع التاني. كل دوسة ملف، وبترتيب عكسي للقفل. ولو في ملف منهم كنت عامل تعديل مش محفوظ، Ctrl+K Ctrl+W هيسألك Save ولا Don't Save قبل ما يقفل.

لو Ctrl+Shift+T مرجعش حاجة، يبقى قفلت الشباك نفسه مش التابات (Ctrl+Shift+W)، وده بيتحفظ بطريقة تانية، استخدم File ثم Open Recent. وخد بالك: Ctrl+W في المتصفح وفي VS Code بيقفل تاب، مش بيمسح كلمة زي الترمنال.`
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
          },
          sol: R`Ctrl+K، سيب الاتنين، وبعدين Z: الشاشة كلها هتبقى الكود بس، من غير sidebar ولا تابات ولا status bar، والشباك ممكن يدخل full screen. Esc مرتين ورا بعض يرجّعك. و Alt+Z على README فيه سطور طويلة هيلف السطر على عرض الشاشة بدل ما تعمل scroll يمين، ومرة تانية يرجعه.

لو Esc Esc مخرجكش، يبقى فيه popup مفتوح أكل أول Esc، دوس تاني. ولو Alt+Z كتب حرف أو مغيرش حاجة وانت على الماك، الاختصار Option+Z، وعلى الماك Option+Z ممكن يكتب [[Ω]] لو المحرر مش هو اللي عليه الـ focus.`
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
          },
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
          sol: R`في [[.tsx]] الاختصار هيطلع في لستة الاقتراحات باسم «Emmet Abbreviation»، و Tab يقبله. الناتج:

[[<section className="hero">]] وجواه [[<h1>Hello</h1>]] و [[<p className="lead"></p>]] و زرارين [[<button className="btn"></button>]]. لاحظ [[className]] بدل [[class]]، لأن VS Code عارف إنه JSX. جربنا نفس الاختصار بمكتبة Emmet نفسها وطلع ده بالظبط. وفي Wrap with Abbreviation: حدد التلات سطور، Palette ثم «Emmet: Wrap with Abbreviation»، واكتب [[ul>li*]]: كل سطر هيبقى [[<li>]] جوه [[<ul>]].

لو Tab كتب مسافات بدل ما يوسّع، يبقى لستة الاقتراحات مظهرتش (ممكن بسبب extension تاني). استخدم Palette ثم «Emmet: Expand Abbreviation»، أو فعّل [[emmet.triggerExpansionOnTab]]، وده مقفول افتراضيًا. وافتكر إن الاختصار لازم يبقى من غير مسافات، أي مسافة بتقطعه.`
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
          },
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
          sol: R`Shift+F12 هيفتح peek فيه لستة بكل مكان بيستخدم الدالة، وفوق مكتوب العدد زي «3 references»، وتعريف الدالة نفسه ممكن يتحسب واحد منهم. لو ملهاش استخدامات غير التعريف، أو «No references found»، غالبًا كود ميت.

قبل ما تمسحها، اتأكد إنها مش مستخدمة بطرق Shift+F12 مش بيشوفها: اسم جاي من string (زي [[router[methodName](req, res)]])، أو export من مكتبة لمشاريع تانية، أو ملف JS مش داخل في [[tsconfig]]. دوّر باسمها في Ctrl+Shift+F كمان للتأكيد.`
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
          },
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
          sol: R`في WSL أو Remote-SSH، أول ما [[npm run dev]] يطبع بورت زي 5173، هيظهر إشعار صغير «Your application running on port 5173 is available» وفي تاب Ports (جنب Terminal) هيتضاف سطر فيه Port [[5173]] و Forwarded Address [[localhost:5173]]. دوس على العنوان يفتح في المتصفح. للـ 5432: Forward a Port، اكتب [[5432]]، وأداة DB تتصل على [[localhost]] والبورت اللي في عمود Forwarded Address.

لو عمود Forwarded Address طلع [[localhost:5433]] مش 5432، يبقى البورت 5432 مشغول على جهازك (غالبًا Postgres محلي)، فـ VS Code اختار رقم تاني. استخدم الرقم اللي مكتوب مش الأصلي. ولو السيرفر مظهرش لوحده، بعض الأدوات مش بتطبع البورت بشكل VS Code يفهمه، ضيفه بإيدك.`
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
          },
          sol: R`في Source Control هتلاقي الملف تحت «Changes». دوس عليه يفتح diff: الشمال آخر commit واليمين نسختك. حدد سطور الـ fix بس في الجزء اليمين، كليك يمين ثم «Stage Selected Ranges». الملف هيظهر مرتين: تحت «Staged Changes» (الـ fix) وتحت «Changes» (التنسيق). اكتب رسالة و Ctrl+Enter يعمل commit للـ staged بس. وبعدين commit تاني للباقي.

لو دوست Ctrl+Enter ومفيش حاجة staged، VS Code هيسألك «There are no staged changes to commit. Would you like to stage all your changes?»، لو قلت Yes هيعمل commit لكله. اتأكد بـ [[git log -p -2]] إن كل commit فيه اللي المفروض بس.`
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
          },
          sol: R`بعد [[git merge]] هيقول [[CONFLICT (content): Merge conflict in file.txt]]. في VS Code الملف هتلاقي فيه [[<<<<<<< HEAD]] و [[=======]] و [[>>>>>>> branch]]، وفوق الـ conflict أزرار «Accept Current Change | Accept Incoming Change | Accept Both Changes». المرة الأولى دوس واحد منهم. المرة التانية (اعمل conflict تاني)، دوس «Resolve in Merge Editor» تحت يمين: Incoming و Current فوق، و Result تحت، و checkbox جنب كل تعديل. بعد ما تخلص «Complete Merge»، ثم commit.

«Current» يعني الـ branch اللي انت واقف فيه (main)، و «Incoming» يعني اللي بتعمله merge. ولو عملت merge من الاتجاه التاني هيتبدلوا، وده مصدر لخبطة كتير. و [[git log --oneline --graph]] في الآخر المفروض يوريك merge commit فيه أبين.`
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
          },
          sol: R`في Explorer تحت خالص قسم Timeline: هتلاقي ٣ مداخل «File Saved» بالوقت (Local History)، وممكن مداخل commits من Git. دوس على التاني يفتح diff بينه وبين النسخة الحالية. كليك يمين عليه ثم «Restore Contents»: الملف هيرجع للنسخة دي. و «Git: Toggle Git Blame Editor Decoration» هيكتب في آخر السطر اسم آخر حد غيّره ومن قد إيه، زي [[Ali, 3 months ago]].

لو Timeline فاضي، يبقى الـ Local History مقفول ([[workbench.localHistory.enabled]])، أو الملف مش جوه workspace مفتوح. ولو الـ blame مش ظاهر، الأمر ده جديد نسبيًا (من 2024)، حدّث VS Code، أو استخدم [[git blame file]] في الترمنال.`
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
          },
          sol: R`Logpoint بيظهر كنقطة على شكل معين (diamond) بدل الدايرة الحمرا. كل ما الـ route يتنادى، هيطبع في Debug Console حاجة زي [[order 42 total=1500]] من غير ما يقف. الـ Conditional Breakpoint دايرة حمرا فيها علامة، والبرنامج هيقف بس لما الشرط يبقى true، زي [[req.params.id === "42"]].

لو الـ breakpoint طلع دايرة رمادي فاضية بدل حمرا، ده «Unbound breakpoint»: الـ debugger مش شايف الملف ده في الكود اللي شغال (غالبًا TypeScript من غير source maps، أو شغّلت السيرفر من ترمنال عادي مش بـ F5). ولو الـ logpoint طبع [[{order.id}]] حرفيًا، يبقى المتغير اسمه مختلف في المكان ده. وخد بالك إن [[req.params.id]] string، فـ [[=== 42]] كرقم مش هيقف أبدًا.`
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
          },
          sol: R`F5 هيشغّل السيرفر في الـ debugger والـ status bar هيتلوّن. اطلب الـ route، الكود هيقف على الـ breakpoint والسطر متظلل أصفر. F10 بينزل سطر سطر من غير ما يدخل جوه الدوال. في Watch ضيف [[req.body]]، هتلاقي الـ object بتاعه (أو [[undefined]] لو مفيش [[express.json()]]). في Debug Console [[JSON.stringify(req.headers)]] يطبع الـ headers كـ string.

لو [[req.body]] طلع [[{}]] أو undefined مع POST، ده مش مشكلة debugger، ده الـ middleware ناقص. ولو F5 سألك «Select debugger»، يبقى مفيش [[launch.json]]، اختار Node.js أو شوف درس JavaScript Debug Terminal. ولو الطلب علّق في المتصفح، ده طبيعي: الـ server واقف عند الـ breakpoint، F5 يكمّل.`
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
          },
          sol: R`الترمنال الجديد هيبقى اسمه «JavaScript Debug Terminal». [[npm run dev]] منه هيطبع [[Debugger attached.]] (ممكن أكتر من مرة، واحدة لكل عملية node زي npm و nodemon والسيرفر). اطلب الـ route من المتصفح، و VS Code هيقف على الـ breakpoint من غير أي launch.json.

الـ [[Debugger attached.]] المتكرر ده طبيعي. ولو الـ breakpoint مابقفش، اتأكد إن الملف اللي حطيت فيه هو اللي بيتنفذ فعلًا (مش نسخة متبنية في [[dist]])، وإن الـ source maps موجودة لو TypeScript. وافتكر إن الأمر ده لـ Node، مش لكود المتصفح.`
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
          },
          sol: R`Ctrl+K ثم V هيفتح المعاينة جنب الملف، وكل ما تكتب بتتحدث. الجدول ده مثلًا:

[[| Command | What it does |]] ثم [[|---|---|]] ثم [[| npm run dev | start the dev server |]]

هيظهر جدول بخطوط وعناوين عريضة، شبه GitHub.

لو الجدول ظهر كسطور عادية فيها [[|]]، يبقى ناقص سطر [[|---|---|]] أو ناقص سطر فاضي قبل الجدول. ولو Ctrl+K V مشتغلش، دوس Ctrl+K وسيب وبعدين V لوحدها. والمعاينة بتاعة VS Code قريبة من GitHub بس مش نفس الحاجة، فحاجات زي الـ alerts بتاعة GitHub (NOTE و WARNING) ممكن تبان مختلفة.`
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
          },
          sol: R`حدد الدالة و Ctrl+I هيطلع خانة صغيرة فوقها، اكتب «add JSDoc». الـ AI هيضيف comment زي [[/** ... @param ... @returns ... */]] وهيبان كـ diff: الأخضر جديد والأحمر اتشال. زرار Accept (أو Ctrl+Enter) يقبل، و Discard يلغي. اقرا كل [[@param]] واتأكد إن الـ types والوصف صح، لأنه بيخمّن من الأسامي.

لو Ctrl+I مفتحش حاجة، يبقى Copilot (أو أي AI extension) مش متفعّل أو مش عامل sign in، وفيه plan مجاني بيكفي للتجربة. ولو الـ diff غيّر الكود نفسه مش بس ضاف comment، ارفضه، ده بالظبط ليه قلنا اقرا الـ diff. وعلى الماك Cmd+I.`
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
          },
          sol: R`[[@modified]] هيعرض بس الإعدادات اللي غيّرتها، وجنب كل واحد خط أزرق. دوس على تاب «Workspace» فوق، دوّر على [[editor.tabSize]] واكتب 2. VS Code هيعمل [[.vscode/settings.json]] في المشروع وفيه [[{ "editor.tabSize": 2 }]].

لو غيّرت tabSize والملف لسه بيعرض 4 تحت يمين، ده لأن [[editor.detectIndentation]] مفعّل وبيقرا المسافات من الملف نفسه، أو فيه [[.editorconfig]] بيكسب. ولو الملف اتعمل بس في [[settings.json]] بتاع اليوزر، يبقى كنت على تاب User مش Workspace.`
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
          ],
          sol: R`بعد الملف ده، بوّظ مسافات ملف و Ctrl+S: هيتنسّق بـ Prettier، ولو فيه مشاكل ESLint ليها fix (زي [[let]] ممكن تبقى [[const]]) هتتصلح. وتحت يمين في الـ status bar هيبقى مكتوب [[LF]].

لو التنسيق محصلش: اتأكد إن extension Prettier (esbenp.prettier-vscode) متسطب، وإلا [[defaultFormatter]] بيشاور على حاجة مش موجودة. ولو الملف لسه [[CRLF]]، ده لأن [[files.eol]] بيأثر على الملفات الجديدة بس، مش القديمة. دوس على CRLF تحت واختار LF، أو Prettier هيحوّلها لما ينسّق لأن الافتراضي بتاعه [[endOfLine: "lf"]]. ولو ESLint مصلحش حاجة، extension ESLint لازم يكون متسطب وشغال (شوف Output ثم ESLint).`
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
          ],
          sol: R`قبل الإعداد، البحث عن اسم دالة ممكن يطلع نتايج من [[.next]] و [[dist]] (كود متبني) و [[package-lock.json]]. بعده هيطلع النتايج من [[src]] بس، والعدد هيقل. وفولدر [[.next]] هيختفي من شجرة الملفات كمان.

لو العدد متغيرش خالص، ده غالبًا لأن [[.next]] و [[dist]] موجودين في [[.gitignore]]، و VS Code افتراضيًا بيتجاهل اللي في [[.gitignore]] في البحث ([[search.useIgnoreFiles]]). يعني كانوا مستبعدين من الأول، وده طبيعي. الفرق هيبان في الملفات اللي مش في [[.gitignore]] زي [[package-lock.json]]، أو في شجرة الملفات.`
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
          ],
          sol: R`لما تفتح المشروع في profile فاضي، هيظهر إشعار تحت يمين: «Do you want to install the recommended extensions from ... for this repository?» بزرارين Install و Show Recommendations. التاني يفتح Extensions على [[@recommended]] وهتلاقي اللستة اللي كتبتها بالظبط.

لو الإشعار مظهرش، ممكن تكون قلت قبل كده «Don't Show Again»، أو كل الـ extensions متسطبة أصلًا. افتح [[@recommended]] بإيدك. ولو extension مظهرتش في اللستة، الـ ID غلط: لازم [[publisher.name]] بالظبط، تقدر تنسخه من صفحة الـ extension (الترس ثم Copy Extension ID).`
        }
      ]
    }
  ]
});
