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

TAB("cmd", {
  label: "CMD",
  prompt: R`C:\lab>`,
  lab: R`mkdir %USERPROFILE%\lab
cd /d %USERPROFILE%\lab`,
  categories: [
    {
      t: "التنقل",
      l: 1,
      n: "",
      items: [
        {
          cmd: "cd",
          title: "اتنقل واعرف انت فين",
          desc: "[[cd]] لوحدها بتطبع مكانك. عشان تغيّر الدرايف لازم [[/d]]، أو اكتب اسم الدرايف [[D:]] لوحده.",
          example: R`cd
cd \
cd /d D:\projects
cd ..`,
          try: "روح لدرايف تاني من غير /d ولاحظ إنه مش بيتنقل، وبعدين بيها.",
          deep: {
            why: "التنقل بين الفولدرات في CMD. نفس الفكرة زي bash بس بفروقات مهمة.",
            how: R`[[cd C:\Users\Ali\Projects]] التنقل بمسار كامل. [[cd ..]] فولدر فوق. [[cd subfolder]] فولدر جوه الحالي.

الفرق الكبير عن bash: في CMD كل Drive ليه فولدر حالي خاص بيه. [[cd C:\Users]] بيغيّر الفولدر في الـ Drive C بس. عشان تتنقل لـ Drive تاني: اكتب [[D:]] واضغط Enter أول، وبعدين [[cd D:\folder]]. في PowerShell لو كتبت [[cd]] لمسار في Drive تاني، هو بيروح ويعمل كل ده في خطوة.

[[cd /d D:\folder]] الـ [[/d]] بيغيّر الـ drive في نفس الوقت.

[[cd]] من غير حاجة بيطبع المكان الحالي (زي pwd في bash).`,
            when: "التنقل في CMD. وسكربتات .bat.",
            mistakes: R`تكتب [[cd D:\folder]] من غير [[/d]] وانت في Drive C، فيغيّر الفولدر في D بس مش بيروحه.`
          },
          lines: [
            "لوحدها: انت فين (زي pwd).",
            "جذر الدرايف الحالي.",
            "روح لفولدر على درايف تاني. [[/d]] لازمة، من غيرها بيغيّر الفولدر على D بس وانت فاضل على C.",
            "الفولدر اللي فوق."
          ],
          sol: R`وانت على [[C:\Users\ali>]] اكتب [[cd D:\projects]]: مش هيطبع error، والـ prompt هيفضل [[C:\Users\ali>]]. اللي حصل إن CMD غيّر «الفولدر الحالي بتاع D» بس وانت لسه على C. لو كتبت [[D:]] دلوقتي هتلاقي نفسك على طول في [[D:\projects>]]. أما [[cd /d D:\projects]] فبيغيّر الدرايف والفولدر مع بعض، والـ prompt يبقى [[D:\projects>]] على طول.

لو جهازك مفيهوش D هتشوف [[The system cannot find the drive specified.]]، جرب أي درايف تاني أو فلاشة. وده عكس PowerShell اللي [[cd D:\...]] فيه بتنقلك على طول.`
        },
        {
          cmd: "dir",
          title: "اعرض الملفات",
          desc: "[[/a]] المخفي، [[/s]] جوه الفولدرات، [[/b]] الأسامي بس، [[/o-d]] ترتيب بالأحدث، [[/o-s]] بالحجم تنازلي.",
          example: R`dir
dir /a
dir /s /b *.js
dir /o-d`,
          try: "اعرض كل ملفات .json في مشروع بالأسامي بس.",
          deep: {
            why: "عرض محتوى فولدر. زي ls في bash.",
            how: R`[[dir]] بيعرض كل الملفات. [[dir /w]] عرض عريض (أسامي بس). [[dir /b]] bare output أسامي بس (مفيد في السكربتات). [[dir /a]] بيعرض الملفات المخفية.

[[dir /s]] recursive (جوه الفولدرات الفرعية كمان). [[dir /o:d]] مرتب بالتاريخ. [[dir /o:-s]] مرتب بالحجم من الأكبر.

[[dir *.log]] الملفات اللي بتنتهي بـ .log.

النتيجة: بيعرض التاريخ والوقت، والحجم (أو [[<DIR>]] لو فولدر)، والاسم. وفي الآخر المساحة الكلية.`,
            when: "مشاهدة محتوى الفولدر. إيجاد ملف بامتداد معين.",
            mistakes: "[[dir]] بيطبع header وfooter ومش مفيد في الـ piping للـ scripts. استخدم [[dir /b]] للأسامي بس."
          },
          lines: [
            "محتوى الفولدر.",
            "مع المخفي.",
            "كل ملفات .js في كل الفولدرات الفرعية ([[/s]])، أسامي بس من غير تفاصيل ([[/b]]).",
            "مرتب بالتاريخ من الأحدث ([[/o-d]]: الشرطة تعكس)."
          ],
          sol: R`في فولدر المشروع: [[dir /s /b *.json]]. هيطبع مسارات كاملة، كل واحد في سطر، زي [[C:\lab\app\package.json]] و [[C:\lab\app\tsconfig.json]]، من غير التاريخ والحجم والملخص اللي في الآخر، لأن [[/b]] بيشيل كل ده.

لو فيه node_modules هتلاقي مئات الملفات منه، فلترهم: [[dir /s /b *.json | findstr /v /i /c:"node_modules"]]. ولو طلع [[File Not Found]] يبقى مفيش ملفات json في الفولدر ده واللي تحته، اتأكد بـ [[cd]] إنك في فولدر المشروع.`
        },
        {
          cmd: "tree",
          title: "شجرة الفولدرات",
          desc: "[[/f]] يعرض الملفات كمان. متعملهاش على مشروع فيه node_modules وإلا هتستنى كتير.",
          example: R`tree
tree /f lab`,
          try: "اعرض شجرة lab بالملفات.",
          deep: {
            why: "عرض هيكل الفولدرات شجرة. زي tree في bash.",
            how: R`[[tree]] بيرسم الشجرة. [[tree /f]] بيوري الملفات كمان مش بس الفولدرات.

مش محتاج تسطّبه، موجود افتراضيًا في ويندوز.

[[tree /f /a]] بيستخدم ASCII characters بدل رسم خطوط، مفيد لو النتيجة هتتحفظ في ملف نص.`,
            when: "شرح هيكل مشروع. التأكد من إن الفولدرات اتعملت صح.",
            mistakes: "tree على فولدر كبير فيه node_modules أو .git بيطبع آلاف السطور. محدودش بـ /f."
          },
          lines: ["شجرة الفولدرات.", "فولدر lab بالملفات كمان ([[/f]])."],
          sol: R`[[tree /f lab]] بيطبع في الأول سطر [[Folder PATH listing for volume ...]] وبعده رقم الـ volume ومسار lab، وبعدين الشجرة: الملفات تحت كل فولدر بمسافة، والفولدرات الفرعية بخطوط زي [[├───src]] و [[└───public]].

من غير [[/f]] هتشوف الفولدرات بس، وده أكتر غلطة بتخلي الناس تفتكر إن الملفات مش موجودة. ولو الخطوط طلعت رموز غريبة (بيحصل مع بعض صفحات الترميز) استخدم [[tree /f /a lab]] يرسمها بـ [[+---]] و [[\---]] العادية.`
        },
        {
          cmd: "cls",
          title: "امسح الشاشة",
          desc: "بيمسح كل اللي على الشاشة ويرجّع المؤشر فوق. مفيد لما الشاشة تبقى مزحومة. في PowerShell و bash الأمر [[clear]] أو Ctrl+L.",
          example: "cls",
          try: "املأ الشاشة بـ [[dir]] كذا مرة، وبعدين [[cls]].",
          deep: {
            why: "تنضيف الشاشة. زي clear في bash. بيساعد لما الشاشة مليانة output قديم.",
            how: "[[cls]] بس. من غير أي arguments. الاختصار في CMD هو [[cls]]، في PowerShell ممكن كمان [[Clear-Host]] أو [[clear]] أو Ctrl+L.",
            when: "الشاشة مليانة. قبل ما تبدأ مهمة جديدة وعايز تشوف الـ output بوضوح.",
            mistakes: "مفيش. أبسط أمر في CMD."
          },
          lines: ["نضّف الشاشة (زي clear)."],
          sol: R`بعد [[dir]] كذا مرة الشاشة هتبقى مليانة، و [[cls]] بيمسحها كلها ويرجع الـ prompt لوحده في أول سطر فوق، من غير ما يطبع أي حاجة.

[[cls]] مش بيمسح تاريخ الأوامر، سهم فوق لسه بيجيب اللي كتبته. ولو كتبت [[clear]] في CMD هيقولك [[is not recognized as an internal or external command]]، لأن clear مش أمر CMD. و Ctrl+L في CMD مش بتمسح.`
        }
      ]
    },
    {
      t: "ملفات وفولدرات",
      l: 1,
      n: "",
      items: [
        {
          cmd: "mkdir",
          title: "اعمل فولدر",
          desc: "بيعمل الفولدرات اللي في النص لوحده، وتقدر تكتب كذا واحد في أمر واحد. [[md]] نفس الأمر.",
          example: R`mkdir app\src\components
mkdir app\public app\logs`,
          try: "اعمل هيكل app بـ src و public و logs.",
          deep: {
            why: "عمل فولدرات جديدة.",
            how: R`[[mkdir]] أو [[md]] نفس الحاجة. CMD بيعمل الفولدرات الوسيطة تلقائيًا، مش محتاج [[-p]] زي bash.

[[mkdir src\components\ui]] بيعمل الثلاثة لو مش موجودين.

[[mkdir "My Folder"]] مع مسافة، علامات تنصيص مهمة.`,
            when: "إعداد هيكل مشروع. سكربتات setup.",
            mistakes: "نسيان علامات تنصيص مع أسامي فيها مسافات."
          },
          lines: ["اعمل الفولدرات التلاتة ورا بعض. CMD بيعمل الوسيط لوحده من غير -p.", "فولدرين في أمر واحد."],
          sol: R`[[mkdir app\src app\public app\logs]] مش بيطبع حاجة لو نجح، وبيعمل [[app]] نفسه في السكة. [[dir app]] هيعرض [[<DIR>]] جنب logs و public و src.

لو شغلته مرة تانية هيطبع [[A subdirectory or file app\src already exists.]] لكل فولدر موجود، وده مش ضرر، مفيش حاجة اتمسحت. ولو كتبت [[mkdir app/src]] بـ slash بدل backslash هيطلع error في CMD، لأن [[/]] بتتقري option.`
        },
        {
          cmd: "type nul / echo >",
          title: "اعمل ملف",
          desc: "مفيش touch في CMD. [[type nul >]] يعمل ملف فاضي، و [[echo >]] يعمل ملف فيه سطر. حط الـ echo بين أقواس: من غيرها أي مسافة قبل [[>]] بتتكتب في آخر السطر، والسطر اللي بيخلص برقم لازق في [[>]] ممكن CMD يفهمه غلط.",
          example: R`type nul > index.js
(echo PORT=3000)> .env
(echo NODE_ENV=development)>> .env`,
          try: "اعمل .env بسطرين واعرضه بـ [[type .env]].",
          deep: {
            why: "عمل ملف فاضي أو ملف بمحتوى.",
            how: R`[[type nul > file.txt]] بيعمل ملف فاضي. [[nul]] هو الـ device الفاضي في ويندوز (زي /dev/null في لينكس).

[[echo PORT=3000 > .env]] بيكتب النص في ملف جديد. لكن خد بالك: [[echo]] في CMD بيحط مسافة قبل الـ redirect في بعض الأحيان. الحل: [[(echo PORT=3000)> file.txt]] بالأقواس، لأن من غيرها رقم واحد لازق في [[>]] زي [[DEBUG=1>]] بيتفهم رقم handle.

[[echo.]] من غير حاجة بيطبع سطر فاضي. [[echo %VAR%]] بيطبع قيمة المتغير.`,
            when: "عمل ملف فاضي. كتابة سطر إعداد في ملف.",
            mistakes: "المسافة قبل [[>]] بتحط مسافة في الـ output. [[echo hello > file]] هيكتب «hello » (بمسافة). استخدم [[(echo hello)> file]]."
          },
          lines: [
            "ملف فاضي: اطبع «لا شيء» وودّيه للملف.",
            "اكتب سطر في ملف جديد. الأقواس حوالين echo عشان ميتكتبش مسافة قبل النهاية.",
            "ضيف سطر في الآخر ([[>>]])."
          ],
          sol: R`[[(echo PORT=3000)> .env]] وبعدين [[(echo NODE_ENV=development)>> .env]] وبعدين [[type .env]] هيطبع سطرين: [[PORT=3000]] و [[NODE_ENV=development]].

لو شفت سطر واحد بس، يبقى استخدمت [[>]] في المرتين، فالتانية كتبت فوق الأولى. ولو كتبت [[echo PORT=3000 > .env]] من غير أقواس، السطر هيتحفظ [[PORT=3000 ]] بمسافة في الآخر، ومش هتشوفها بعينك في type، بس ممكن تبوظ قيمة زي باسورد. ومفيش error لو .env موجود قبل كده، [[>]] بتكتب فوقه على طول.`
        },
        {
          cmd: "copy / xcopy",
          title: "انسخ",
          desc: "copy للملفات بس. xcopy للفولدرات: [[/E]] كل الفولدرات حتى الفاضية، [[/I]] الهدف فولدر، [[/Y]] يكتب فوق من غير ما يسأل.",
          example: R`copy .env.example .env
copy *.txt backup\
xcopy src src_backup /E /I`,
          try: "انسخ فولدر app لـ app_copy بـ xcopy.",
          deep: {
            why: "نسخ ملفات وفولدرات.",
            how: R`[[copy source dest]] لملف واحد. [[xcopy source dest /s /e]] لفولدر: [[/s]] يدخل الفولدرات الفرعية، [[/e]] يعمل الفولدرات الفاضية كمان.

[[xcopy /d]] بينسخ الملفات الجديدة بس (المعدّلة بعد الـ destination). مفيد لـ sync.

[[copy /y]] بيكتب فوق من غير ما يسأل. [[xcopy /y]] نفسه.

ومع wildcard: [[copy *.txt backup\]] ينسخ كل .txt لفولدر backup.`,
            when: "نسخ مشروع للتجربة. backup سريع.",
            mistakes: "xcopy بيسأل «الهدف ملف أو فولدر؟» لو مش موجود. ضيف [[/i]] يفترض إنه فولدر، أو اضغط D للفولدر."
          },
          lines: [
            "انسخ ملف باسم جديد.",
            "انسخ كل .txt لفولدر backup.",
            "انسخ فولدر بكل اللي جواه ([[/E]] حتى الفاضي)، واعتبر الهدف فولدر من غير ما تسأل ([[/I]])."
          ],
          sol: R`[[xcopy app app_copy /E /I]] هيطبع مسار كل ملف بيتنسخ زي [[app\src\server.js]]، وفي الآخر [[3 File(s) copied]] (الرقم حسب ملفاتك). [[dir /s /b app_copy]] يأكدلك إن كل حاجة اتنسخت.

لو نسيت [[/I]] و app_copy مش موجود، xcopy هيسألك [[Does app_copy specify a file name or directory name on the target (F = file, D = directory)?]]، والإجابة D. ولو نسيت [[/E]]، الفولدرات الفاضية (زي public لو فاضي) مش هتتنسخ. ولو استخدمت [[copy app app_copy]] هينسخ الملفات اللي في أول مستوى بس من غير الفولدرات اللي جوه.`
        },
        {
          cmd: "robocopy",
          title: "نسخ قوي للفولدرات الكبيرة",
          desc: "أسرع وأذكى من xcopy وبيكمّل لو اتقطع. [[/MIR]] بيخلي الهدف نسخة طبق الأصل، يعني بيمسح أي حاجة في الهدف مش في المصدر، فخد بالك من ترتيب المصدر والهدف.",
          example: R`robocopy src D:\backup\src /E
robocopy src D:\backup\src /MIR /XD node_modules`,
          try: "اعمل robocopy لـ app لفولدر تاني مع استبعاد node_modules.",
          flag: "danger",
          deep: {
            why: "أقوى أداة نسخ في ويندوز. بتدعم retry، ومسح المحذوف في الهدف، وresume لو قُطع.",
            how: R`[[robocopy source dest /mir]] الأقوى: بيعمل mirror. يعني إيه أضفته في الـ source بيتضاف، وإيه مسحته بيتمسح من الـ dest. مفيد للـ backup والـ sync.

[[ /e]] ينسخ الفولدرات الفاضية كمان. [[/xo]] بيعدّي الملفات الأقدم في الـ dest (مش بيكتب فوقيهم). [[/log:log.txt]] يحفظ report.

بيشتغل بدون صلاحيات Admin في معظم الحالات، وبيعيد المحاولة لو الملف مشغول.`,
            when: "backup يومي أو أسبوعي. نقل مشروع كبير. sync بين فولدرين.",
            mistakes: "[[/mir]] بيمسح من الـ dest أي حاجة مش في الـ source. متستخدمهوش لو الـ dest فيه ملفات زيادة عن قصد."
          },
          lines: [
            "انسخ الفولدر بكل اللي جواه (بيكمّل من مكان ما وقف لو الاتصال قطع).",
            "اعمل مرآة: الهدف يبقى نسخة طبق الأصل، حتى المحذوف يتمسح ([[/MIR]])، ومن غير node_modules ([[/XD]] استثني فولدر)."
          ],
          sol: R`[[robocopy app D:\backup\app /E /XD node_modules]] بيطبع هيدر [[ROBOCOPY :: Robust File Copy for Windows]] فيه Source و Dest و Options، وبعدين كل ملف جديد جنبه [[New File]]، وفي الآخر جدول ملخص فيه صفوف Dirs و Files و Bytes وأعمدة Total و Copied و Skipped و FAILED. لو شغلته تاني من غير تغيير هتلاقي Copied بـ 0 والكل Skipped، وده معناه إنه بينسخ المتغير بس.

[[/XD node_modules]] بتستبعد أي فولدر بالاسم ده في أي مستوى. وخد بالك: robocopy بيرجع exit code 1 لما ينسخ ملفات بنجاح، و 0 لو مفيش حاجة اتغيرت، والفشل الحقيقي من 8 وطالع. فـ [[robocopy ... && echo ok]] هيبان كأنه فشل وهو ناجح. في السكربت افحص [[if %errorlevel% geq 8]].`
        },
        {
          cmd: "move / ren",
          title: "انقل وغيّر الاسم",
          desc: "[[ren]] بتقبل wildcards، فتقدر تغيّر امتداد ملفات كتير مرة واحدة.",
          example: R`move *.log logs\
ren old.js new.js
ren *.txt *.md`,
          try: "اعمل ملفين txt وغيّرهم لـ md بأمر واحد.",
          deep: {
            why: "نقل أو تسمية الملفات. زي mv في bash.",
            how: R`[[move source dest]] للنقل. [[ren oldname newname]] لتغيير الاسم. و[[move]] بيقدر يغيّر الاسم كمان لو في نفس الفولدر.

[[ren]] بتاخد الاسم الجديد بس (مش المسار الكامل). [[move]] بتاخد المسار كامل.

[[move]] بيسأل تأكيد لو الهدف موجود. [[ /y]] لوقف السؤال.`,
            when: "تنظيم الملفات. تغيير امتداد.",
            mistakes: R`[[ren file.txt ..\newname.txt]] مش شغال، ren مش بتقبل مسار جديد، بس اسم جديد.`
          },
          lines: [
            "انقل كل .log لفولدر logs.",
            "غيّر اسم ملف.",
            "غيّر امتداد كل ملفات .txt لـ .md في أمر واحد (ren بتقبل wildcards)."
          ],
          sol: R`[[type nul > a.txt]] و [[type nul > b.txt]] وبعدين [[ren *.txt *.md]]. مش هيطبع حاجة، و [[dir]] هيعرض [[a.md]] و [[b.md]] ومفيش txt.

لو فيه ملف [[a.md]] موجود قبل كده هيطلع [[A duplicate file name exists, or the file cannot be found.]] للملف ده بس والباقي يتغير. ولو كتبت [[ren *.txt md]] من غير [[*.]] هيحاول يسمي كل الملفات md بالظبط ويفشل بعد أول واحد. وخد بالك إن ren مش بتنقل: الاسم الجديد اسم بس من غير مسار.`
        },
        {
          cmd: "del / rd",
          title: "امسح",
          desc: "[[del]] للملفات، [[/s]] جوه الفولدرات، [[/q]] من غير سؤال، [[/p]] يسأل على كل ملف. [[rd /s /q]] يمسح فولدر بكل اللي فيه. مفيش سلة محذوفات.",
          example: R`del notes.txt
del /p *.log
del /s /q *.tmp
rd /s /q app_copy`,
          try: "امسح app_copy، واعمل [[dir]] قبل وبعد.",
          flag: "danger",
          deep: {
            why: "حذف ملفات وفولدرات.",
            how: R`[[del file.txt]] يمسح ملف. [[del *.tmp]] يمسح كل .tmp. [[del /f]] يمسح الملفات المحمية. [[del /s]] يمسح في الفولدرات الفرعية.

[[rd folder]] يمسح فولدر فاضي بس. [[rd /s folder]] يمسح كل اللي جواه. [[rd /s /q folder]] بدون سؤال. ده زي [[rm -rf]] في bash.

مفيش سلة محذوفات، المسح نهائي.`,
            when: "مسح node_modules. تنضيف ملفات مؤقتة.",
            mistakes: "[[rd /s /q]] على المسار الغلط. قبل الأمر دائماً اتأكد من [[cd]] وين انت."
          },
          lines: [
            "امسح ملف.",
            "اسأل قبل كل ملف ([[/p]] من prompt).",
            "امسح كل .tmp في كل الفولدرات الفرعية ([[/s]]) من غير أسئلة ([[/q]]).",
            "امسح فولدر بكل اللي جواه من غير أسئلة (زي rm -rf)."
          ],
          sol: R`[[dir]] الأول هيبان فيه [[<DIR>  app_copy]]. [[rd /s /q app_copy]] مش بيطبع حاجة، و [[dir]] بعدها مش هتلاقي app_copy.

من غير [[/q]] هيسألك [[app_copy, Are you sure (Y/N)?]]. ولو قالك [[The process cannot access the file because it is being used by another process.]] يبقى فيه برنامج (VS Code أو سيرفر شغال أو انت نفسك واقف جوه الفولدر بـ cd) ماسك ملف جواه، اقفله أو اطلع بره بـ [[cd ..]] وجرب تاني. و [[del app_copy]] بيمسح الملفات اللي جوه بس بعد سؤال، والفولدر نفسه بيفضل.`
        },
        {
          cmd: "attrib",
          title: "خبّي أو أظهر ملف",
          desc: "[[+h]] مخفي، [[-h]] ظاهر، [[+r]] قراءة فقط.",
          example: R`attrib +h secret.txt
attrib -h secret.txt`,
          try: "خبّي ملف، اعمل [[dir]] ثم [[dir /a]].",
          deep: {
            why: "تغيير خصائص الملفات: مخفي، وread-only، وsystem. أحيانًا محتاجها لما ملف مش بيتمسح.",
            how: R`[[attrib +h file.txt]] بيخبّيه. [[-h]] يظهره. [[+r]] يعمله read-only. [[-r]] يشيل الـ read-only. [[+s]] system file.

[[attrib /s]] recursive.

لما ملف مش بيتمسح بسبب attribute: [[attrib -r -s -h file.txt]] ثم [[del file.txt]].`,
            when: "عرض أو تغيير attributes. لما del بيرفض.",
            mistakes: "+h مش أمان حقيقي. الملفات المخفية ظاهرة بـ [[dir /a]]."
          },
          lines: ["اخفي الملف.", "اظهره تاني."],
          sol: R`[[attrib +h secret.txt]] مش بيطبع حاجة. [[dir]] مش هيعرض secret.txt خالص، و [[dir /a]] هيعرضه. و [[attrib secret.txt]] بيوريك حروف الـ attributes قبل المسار، وهتلاقي فيها [[H]].

[[dir /ah]] بيعرض المخفي بس. ده «إخفاء» شكلي: أي حد يكتب dir /a أو يفعّل Show hidden files في Explorer هيشوفه، فمش حماية. ولو [[attrib -h]] رفض وقال Not resetting system file، يبقى الملف عليه [[+s]] كمان، شيلهم مع بعض: [[attrib -h -s secret.txt]].`
        }
      ]
    },
    {
      t: "قراءة وبحث",
      l: 1,
      n: "",
      items: [
        {
          cmd: "type / more",
          title: "اقرا ملف",
          desc: "[[more]] صفحة صفحة (Space للي بعده، q خروج).",
          example: R`type package.json
type app.log | more`,
          try: "اعرض ملف كبير بـ [[type file | more]]، واتنقل بـ Space، واخرج بـ q قبل ما تخلص الملف.",
          deep: {
            why: "قراية محتوى ملف. زي cat وless في bash.",
            how: R`[[type file.txt]] يطبع المحتوى كله. للملفات الكبيرة بيغرق الشاشة.

[[more file.txt]] بيعرض صفحة صفحة. Space للصفحة الجاية. Enter سطر واحد. Q للخروج.

[[type file1.txt file2.txt]] يطبع الملفين ورا بعض (زي الوظيفة الأصلية لـ cat).

[[type file.txt | more]] نفس more مع pipe.`,
            when: "قراية ملف نصي صغير أو كبير. التأكد من محتوى ملف إعداد.",
            mistakes: "[[type]] على ملف binary بيلخبط الشاشة وممكن يعمل صوت beep. قفله بـ Ctrl+C."
          },
          lines: ["اطبع الملف كله (زي cat).", "صفحة صفحة، Space للي بعدها و q للخروج (زي less)."],
          sol: R`[[type package-lock.json | more]] بيعرض صفحة واحدة وفي آخر الشاشة [[-- More (12%) --]] (النسبة بتزيد وانت ماشي). Space يجيب الصفحة اللي بعدها، Enter سطر واحد، و q يخرجك على طول للـ prompt من غير ما يكمل الملف.

لو الملف كله نزل مرة واحدة من غير توقف، يبقى نسيت [[| more]] أو الملف أصغر من الشاشة. و [[more]] في CMD مش بيرجع لورا، لو محتاج تتحرك فوق وتحت افتح الملف في محرر أو استخدم [[less]] من Git Bash.`
        },
        {
          cmd: "findstr",
          title: "دوّر على نص (grep)",
          desc: "[[/s]] جوه الفولدرات، [[/i]] من غير فرق حروف، [[/n]] رقم السطر، [[/v]] العكس. الأبسط منه [[find /c]] بيعدّ.",
          example: R`findstr "PORT" .env
findstr /s /i /n "TODO" *.js
find /c "ERROR" app.log`,
          try: "دوّر على كلمة في كل ملفات مشروع.",
          deep: {
            why: "البحث عن نص في ملف أو output. زي grep في bash.",
            how: R`[[findstr "text" file.txt]] بيدوّر. [[/i]] بدون فرق حروف. [[/n]] بيعرض رقم السطر. [[/r]] regex. [[/s]] في الفولدرات الفرعية.

مع pipe: [[dir | findstr "log"]] يدوّر على ملفات فيها كلمة log.

[[findstr /c:"exact phrase"]] بيدوّر على العبارة كاملة.

بالمقارنة مع grep: findstr أبطأ وأقل features، بس موجود في كل ويندوز من غير تسطيب.`,
            when: "دوّر على ملف. فلتر output أمر.",
            mistakes: "الـ regex في findstr محدود جدًا مقارنة بـ grep. لـ regex معقد استخدم PowerShell Select-String."
          },
          lines: [
            "دوّر على PORT في .env (زي grep).",
            "دوّر على TODO في كل ملفات .js في كل الفولدرات ([[/s]])، من غير فرق بين الحروف ([[/i]])، واطبع رقم السطر ([[/n]]).",
            "عدّ السطور اللي فيها ERROR ([[/c]] count)."
          ],
          sol: R`[[findstr /s /i /n "TODO" *.js]] من فولدر المشروع بيطبع كل سطر فيه الكلمة بالشكل [[src\app.js:12:// TODO fix login]]: الملف، رقم السطر، والسطر نفسه. ولو عايز كذا نوع: [[findstr /s /i /n "TODO" *.js *.ts]].

أشهر فخ: [[findstr "hello world"]] بيدوّر على hello أو world، مش الجملة. للجملة استخدم [[/c:"hello world"]]. و [[/s]] بيدخل node_modules فهتلاقي نتايج كتير منه وبطء، فلتر بـ [[| findstr /v /i /c:"node_modules"]]. ولو مفيش ناتج خالص مش هيطبع أي رسالة.`
        },
        {
          cmd: "where",
          title: "البرنامج فين",
          desc: "بيدوّر في PATH ويطبع كل النسخ اللي لقاها.",
          example: R`where node
where git`,
          try: "اعرف فين python عندك، ولو طلع أكتر من مسار يبقى عندك أكتر من نسخة.",
          deep: {
            why: "إيجاد مسار برنامج. زي [[which]] في bash.",
            how: R`[[where node]] يطبع المسار. [[where /r C:\ node.exe]] يدوّر في فولدر معين recursive.

لو الأمر موجود في أكتر من مكان بيطبعهم كلهم بالترتيب.

مع CMD script: [[where /q program]] (quiet) بيرجع errorlevel 0 لو موجود، 1 لو لأ. مفيد للشروط.`,
            when: "تحقق إن برنامج متسطب ومكانه. النسخة اللي بتشتغل.",
            mistakes: "[[where]] في PowerShell اختصار لـ Where-Object فمش هيطبع حاجة. استخدم [[where.exe]] أو [[Get-Command]]."
          },
          lines: ["node جاي منين (زي which).", "وgit."],
          sol: R`[[where python]] بيطبع كل مسار في سطر، زي [[C:\Users\ali\AppData\Local\Programs\Python\Python313\python.exe]]، وممكن تحته [[C:\Users\ali\AppData\Local\Microsoft\WindowsApps\python.exe]]. التاني ده مش Python حقيقي، ده اختصار بيفتح Microsoft Store، ولو هو الأول في الترتيب [[python]] هيفتحلك الـ Store بدل ما يشتغل.

الحل إنك تقفل الاختصار من Settings، App execution aliases، أو تنزل مسار Python الحقيقي فوقه في الـ PATH. ولو طلع [[INFO: Could not find files for the given pattern(s).]] يبقى python مش في الـ PATH خالص، جرب [[where py]] (الـ launcher الرسمي).`
        }
      ]
    },
    {
      t: "الربط والتوجيه",
      l: 2,
      n: "نفس فكرة bash تقريبًا",
      items: [
        {
          cmd: "| > >> 2>&1",
          title: "pipe وتوجيه",
          desc: "نفس المعنى بالظبط. [[2>nul]] زي [[/dev/null]]. و [[| clip]] بينسخ الناتج على الكليب بورد، مفيدة جدًا.",
          example: R`dir | findstr .env
npm run build > build.log 2>&1
dir not-here 2>nul
ipconfig | clip`,
          try: "انسخ ناتج [[ipconfig]] بـ clip والصقه في notepad.",
          deep: {
            why: "توجيه الـ output لملفات أو قنوات تانية. نفس الفكرة زي bash بس بسيطة أكتر.",
            how: R`[[>]] يكتب في ملف ويمسح القديم. [[>>]] يضيف في الآخر. [[|]] يوصّل بين أوامر.

[[2>]] للأخطاء. [[2>&1]] يوجّه الأخطاء لنفس مكان الـ output العادي.

الفرق عن bash: في CMD مفيش [[/dev/null]]، بدلها [[nul]]: [[2>nul]] بيرمي الأخطاء.

[[command >> log.txt 2>&1]] يحفظ كل الـ output والأخطاء في لوج، مفيد مع المهام المجدولة.`,
            when: "سكربت batch بيحفظ output. إخفاء رسايل error مزعجة.",
            mistakes: "[[>]] بيفضّي الملف قبل ما الأمر يشتغل. نفس مشكلة bash."
          },
          lines: [
            "فلتر ناتج dir على .env (زي grep).",
            "احفظ ناتج الـ build وأخطاءه في ملف.",
            "ارمي رسالة الـ error ([[nul]] هو /dev/null بتاع ويندوز).",
            "انسخ الناتج للكليب بورد (clip زي pbcopy)."
          ],
          sol: R`[[ipconfig | clip]] مش بيطبع حاجة على الشاشة، ده الطبيعي لأن الناتج راح للكليب بورد. افتح notepad واعمل Ctrl+V، هتلاقي ناتج ipconfig كامل بـ [[Windows IP Configuration]] وكل الكروت.

لو لزقت ولقيت حاجة قديمة، يبقى الأمر مشتغلش أو كتبت [[ipconfig > clip]]، ودي بتعمل ملف اسمه clip في الفولدر بدل ما تبعت للكليب بورد. امسحه بـ [[del clip]].`
        },
        {
          cmd: "&& و || و &",
          title: "اربط أوامر",
          desc: "[[&&]] لو نجح، [[||]] لو فشل، و [[&]] (مش ;) نفّذ الاتنين في كل الأحوال.",
          example: R`npm install && npm run dev
mkdir app || echo already exists
cd lab & dir`,
          try: "اكتب [[mkdir app && echo done]] مرتين وقارن.",
          deep: {
            why: "تنفيذ أوامر بشرط. نفس فكرة bash و&&و ||.",
            how: R`[[&&]] ينفّذ التاني لو الأول نجح. [[||]] ينفّذ التاني لو الأول فشل. [[&]] يشغّل الاتنين بغض النظر.

الـ «نجاح» في CMD يعتمد على [[errorlevel]]: 0 نجاح، أي رقم تاني فشل. بعض الأوامر القديمة مش بترجع errorlevel صح.

[[cd /d D:\project && npm install && npm start]] سلسلة آمنة.

[[&& echo Done || echo Failed]] بيطبع Done لو الأمر نجح أو Failed لو فشل.`,
            when: "سلسلة أوامر مترابطة. التحقق من نجاح خطوة.",
            mistakes: "بعض الأوامر مش بترجع errorlevel صح حتى لو فشلت. اختبر الأمر الأول بيدك."
          },
          lines: [
            "شغّل الثاني بس لو الأول نجح.",
            "شغّل الثاني بس لو الأول فشل.",
            "شغّل الاتنين في كل الأحوال (زي [[;]] في bash)."
          ],
          sol: R`أول مرة [[mkdir app && echo done]] بيطبع [[done]]. تاني مرة بيطبع [[A subdirectory or file app already exists.]] ومش بيطبع done، لأن mkdir فشل (errorlevel 1) و [[&&]] بتنفذ اللي بعدها بس لو اللي قبلها نجح.

لو استخدمت [[&]] بدل [[&&]]، done هتطلع في المرتين حتى مع الـ error. ولو كتبت [[;]] زي bash، CMD هيعتبرها جزء من الأمر مش فاصل.`
        }
      ]
    },
    {
      t: "العمليات",
      l: 2,
      n: "",
      items: [
        {
          cmd: "tasklist / taskkill",
          title: "العمليات ووقفها",
          desc: "[[/IM]] بالاسم، [[/PID]] بالرقم، [[/F]] غصب، [[/T]] هو وكل العمليات اللي فتحها.",
          example: R`tasklist
tasklist | findstr node
taskkill /IM node.exe /F
taskkill /PID 1234 /F /T`,
          try: "افتح notepad واقفله بـ taskkill.",
          flag: "danger",
          deep: {
            why: "عرض وإيقاف العمليات. زي ps وkill في bash.",
            how: R`[[tasklist]] كل العمليات. [[tasklist /fo csv]] بـ CSV format أسهل للـ parsing. [[tasklist /fi "imagename eq node.exe"]] تفلتر باسم.

[[taskkill /im "notepad.exe" /f]] يوقف بالاسم. [[taskkill /pid 1234 /f]] بالـ PID. [[/f]] force.

[[tasklist | findstr "node"]] أسرع للبحث السريع.`,
            when: "عملية معلّقة. تطبيق ماسك بورت.",
            mistakes: R`[[taskkill /im "node"]] مش شغال، لازم [[node.exe]] (الامتداد مهم).`
          },
          lines: [
            "كل العمليات (زي ps).",
            "عمليات node بس.",
            "اقفل كل node بالاسم، غصب ([[/F]]). الامتداد .exe لازم.",
            "اقفل عملية برقمها، هي واللي عملتهم ([[/T]] شجرة)."
          ],
          sol: R`[[start notepad]] وبعدين [[tasklist | findstr /i notepad]] يوريك السطر ورقم الـ PID. [[taskkill /IM notepad.exe]] يطبع [[SUCCESS: Sent termination signal to the process "notepad.exe" with PID 1234.]] والنافذة تتقفل (ولو فيه كلام مش محفوظ ممكن notepad يسألك). مع [[/F]] الرسالة [[SUCCESS: The process "notepad.exe" with PID 1234 has been terminated.]] ومن غير سؤال.

لو قالك [[ERROR: The process "notepad" not found.]] يبقى كتبت الاسم من غير [[.exe]]، أو notepad مقفول أصلًا. و [[/IM]] بيقفل كل النسخ اللي بنفس الاسم.`
        },
        {
          cmd: "netstat -ano",
          title: "مين ماسك البورت",
          desc: "آخر عمود هو الـ PID، خده وابعته لـ taskkill.",
          example: R`netstat -ano | findstr :3000
taskkill /PID 1234 /F`,
          try: "شغّل سيرفر على 3000 واقفله بالطريقة دي.",
          deep: {
            why: "مين ماسك البورت. زي ss في bash.",
            how: R`[[-a]] كل الاتصالات. [[-n]] أرقام بدل أسامي. [[-o]] PID العملية. فالناتج: حالة الاتصال، والعنوان المحلي والبعيد، والـ PID.

للدور على بورت معين: [[netstat -ano | findstr ":3000"]] يعرض كل سطر فيه البورت ده.

بعدين [[tasklist /fi "pid eq 1234"]] تعرف العملية.

[[netstat -ano | findstr "LISTENING"]] البورتات اللي بتستمع بس.`,
            when: "EADDRINUSE. تعرف مين ماسك بورت معين.",
            mistakes: R`[[findstr "3000"]] ممكن يرجع اتصالات على بورت تاني زي 13000. استخدم [[":3000"]] بنقطتين.`
          },
          lines: [
            "مين ماسك بورت 3000. آخر عمود هو رقم العملية. النقطتين قبل الرقم عشان ميجيبش 13000.",
            "اقفلها بالرقم اللي طلع."
          ],
          sol: R`شغّل [[npx http-server -p 3000]]، ومن نافذة تانية [[netstat -ano | findstr :3000]]. هتلاقي سطر زي [[TCP    0.0.0.0:3000    0.0.0.0:0    LISTENING    12345]] (وممكن سطر [[[::]:3000]] لـ IPv6)، آخر رقم هو الـ PID. [[taskkill /PID 12345 /F]] يطبع [[SUCCESS: The process with PID 12345 has been terminated.]] والسيرفر في النافذة الأولى يقف.

خد بالك: [[:3000]] بتطابق كمان [[:30001]] واتصالات قديمة حالتها TIME_WAIT ورقمها 0، فخد رقم سطر [[LISTENING]] بس، أو ضيف [[| findstr LISTENING]]. ولو [[taskkill]] قال Access is denied، العملية شغالة كأدمن، افتح CMD كأدمن.`
        },
        {
          cmd: "start",
          title: "افتح حاجة",
          desc: R`[[start .]] يفتح Explorer، و [[start ""]] لو المسار فيه مسافات.`,
          example: R`start .
start notepad
start https://github.com
start "" "C:\Program Files\Git\git-bash.exe"`,
          try: "افتح الفولدر الحالي في Explorer.",
          deep: {
            why: "فتح برنامج أو ملف أو موقع. زي xdg-open أو open في الماك.",
            how: R`[[start .]] يفتح الـ Explorer على الفولدر الحالي. [[start http://localhost:3000]] يفتح المتصفح. [[start "" "program.exe"]] يشغّل برنامج. [[start /wait program.exe]] بيستنى.

[[start "" "file.pdf"]] يفتح الـ PDF بالبرنامج الافتراضي.

[[start /b command]] يشغّل في الخلفية من غير نافذة جديدة.`,
            when: "فتح فولدر في Explorer. فتح الموقع لما يشتغل. تشغيل برنامج.",
            mistakes: R`[[start "prog.exe"]] الـ quote الأول هو title مش المسار. استخدم [[start "" "prog.exe"]].`
          },
          lines: [
            "افتح الفولدر الحالي في Explorer.",
            "افتح برنامج.",
            "افتح لينك في المتصفح.",
            R`افتح برنامج مساره فيه مسافات. الـ [[""]] الفاضية لازمة: أول حاجة بين علامات تنصيص start بيعتبرها عنوان النافذة.`
          ],
          sol: R`[[start .]] بيفتح نافذة File Explorer على الفولدر اللي انت فيه، ومش بيطبع حاجة في CMD.

لو كتبت [[start "C:\my folder"]] بين علامات تنصيص، هتفتح نافذة CMD جديدة عنوانها «C:\my folder» بدل الفولدر، لأن أول حاجة بين علامات تنصيص بتتقري عنوان. الحل [[start "" "C:\my folder"]]، أو [[explorer .]].`
        }
      ]
    },
    {
      t: "الشبكة والنظام",
      l: 2,
      n: "",
      items: [
        {
          cmd: "ipconfig",
          title: "إعدادات الشبكة",
          desc: "[[/all]] كل التفاصيل، [[/flushdns]] يمسح كاش الـ DNS، ودي أول حاجة تعملها لو غيّرت DNS دومين ولسه بيفتح القديم.",
          example: R`ipconfig
ipconfig /all
ipconfig /flushdns`,
          try: "اعرف الـ IP المحلي بتاعك.",
          deep: {
            why: "معلومات الشبكة على ويندوز. زي ip a في bash.",
            how: R`[[ipconfig]] كل الكروت وعناوينها. [[ipconfig /all]] تفاصيل كاملة: MAC، وDNS، والـ DHCP.

[[ipconfig /flushdns]] يمسح DNS cache (مفيد بعد تغيير hosts أو DNS).

عنوانك على الواي فاي: ابص على «Wireless LAN adapter Wi-Fi» وخد الـ IPv4 Address.

الـ Default Gateway هو عنوان الراوتر بتاعك. الـ DNS Servers هم اللي بتسألهم عن الدومينات.`,
            when: "إيجاد عنوان الجهاز على الشبكة. بعد تغيير DNS. مشاكل الشبكة.",
            mistakes: "الخلط بين IPv4 الحقيقي والـ 169.254.x.x: ده Automatic Private IP Address ومعناه مش قادر يتصل بـ DHCP (راوترك)."
          },
          lines: ["عناوين الشبكة (زي ip a).", "كل التفاصيل: MAC والـ DNS والـ DHCP.", "امسح كاش الـ DNS."],
          sol: R`[[ipconfig]] بيطبع قسم لكل كارت، دوّر على الكارت اللي انت متوصل بيه ([[Wireless LAN adapter Wi-Fi]] أو [[Ethernet adapter Ethernet]]). تحته [[IPv4 Address. . . : 192.168.1.15]] ده الـ IP المحلي، و [[Default Gateway . . . : 192.168.1.1]] ده الراوتر.

اتجاهل كروت زي [[vEthernet (WSL)]] أو [[Media disconnected]]، دي مش اتصالك الحقيقي. ولو الـ IPv4 بيبدأ بـ [[169.254]] يبقى الجهاز مخدش IP من الراوتر (مشكلة DHCP أو الكابل). والـ IP ده مش اللي الناس بتشوفه على النت، ده جوه شبكة البيت بس.`
        },
        {
          cmd: "ping / tracert / nslookup",
          title: "اختبار الاتصال",
          desc: "[[-n 4]] عدد المرات. tracert يوريك الطريق، nslookup يوريك الدومين بيشاور على أنهي IP.",
          example: R`ping -n 4 google.com
tracert google.com
nslookup example.com`,
          try: "اعمل nslookup على دومين من دوميناتك واتأكد إنه بيشاور على IP السيرفر.",
          deep: {
            why: "تشخيص الشبكة: هل الجهاز بيرد؟ وما الطريق للوصول له؟ والـ DNS شايف إيه؟",
            how: R`[[ping google.com]] بيجرّب 4 مرات افتراضيًا. [[-n 10]] عدد معين. [[-t]] يفضل بدون توقف.

[[tracert google.com]] الطريق كامل. [[tracert /d]] بدون الـ DNS resolution (أسرع).

[[nslookup example.com]] بيسأل الـ DNS عن الـ IP. [[nslookup example.com 8.8.8.8]] يسأل سيرفر معين.

وعلى عكس Linux، [[ping]] في ويندوز بيوقف بعد 4 مرات لوحده.`,
            when: "الموقع مش بيفتح. الـ DNS لسه مش منتشر. لتشخيص بطء الشبكة.",
            mistakes: "ping بيوقف لوحده في ويندوز، بس لو عايزه يفضل زي لينكس استخدم [[-t]]."
          },
          lines: [
            "ping ٤ مرات ([[-n]] هنا عدد المرات، مش زي لينكس).",
            "الطريق لحد جوجل (زي traceroute).",
            "الدومين بيشاور على أنهي IP (زي dig)."
          ],
          sol: R`[[nslookup yourdomain.com]] بيطبع الأول [[Server:]] و [[Address:]] بتوع الـ DNS اللي سألته (غالبًا الراوتر)، وبعدين [[Non-authoritative answer:]] وتحته [[Name:]] و [[Address:]]. الـ Address الأخيرة لازم تبقى IP السيرفر بتاعك.

لو IP تاني: إما الـ A record غلط، أو غيّرته قريب والكاش لسه قديم (استنى أو [[ipconfig /flushdns]])، أو الدومين ورا Cloudflare بالسحابة البرتقالي، فهتشوف IPs بتوع Cloudflare وده طبيعي. ولو [[Non-existent domain]] يبقى الـ record مش موجود أصلًا.`
        },
        {
          cmd: "systeminfo / whoami",
          title: "معلومات الجهاز",
          desc: "[[systeminfo]] بيطلع تقرير كامل عن الجهاز: نسخة الويندوز والرام وآخر مرة اشتغل فيها. [[whoami]] بيقولك انت داخل بأنهي يوزر، و [[hostname]] اسم الجهاز.",
          example: R`systeminfo
whoami
hostname`,
          try: "اعرف نسخة الويندوز والرام من systeminfo.",
          deep: {
            why: "معلومات عن الجهاز والمستخدم الحالي.",
            how: R`[[systeminfo]] معلومات كاملة: اسم الجهاز، وويندوز version، والـ RAM، والـ CPU. ممكن يأخد ثانية.

[[whoami]] اسم المستخدم الحالي (DOMAIN\username). [[whoami /all]] كل الـ groups والـ privileges.

[[whoami /priv]] بيوريك الصلاحيات: هل Administrator؟ وفيه حاجات معينة مفعّلة ولأ.`,
            when: "استلام جهاز جديد أو VM. التأكد إنك Admin. إرسال معلومات support.",
            mistakes: "[[systeminfo]] بطيء. لو محتاج معلومات محددة، استخدم [[ver]]، أو من PowerShell [[Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version]] (wmic اتشال من ويندوز 11 الجديد)."
          },
          lines: ["كل معلومات الجهاز والنظام (بياخد ثواني).", "انت مين.", "اسم الجهاز."],
          sol: R`الأسرع: [[systeminfo | findstr /B /C:"OS Name" /C:"OS Version" /C:"Total Physical Memory"]]. هيطلع زي [[OS Name: Microsoft Windows 11 Pro]] و [[OS Version: 10.0.26100 N/A Build 26100]] و [[Total Physical Memory: 16,097 MB]].

متتلخبطش إن ويندوز 11 مكتوب نسخته 10.0: رقم الـ Build من 22000 وطالع يعني ويندوز 11. و systeminfo بياخد ثواني قبل ما يطبع، ده طبيعي. ولو ويندوزك عربي الـ labels هتبقى بالعربي، فـ findstr بالإنجليزي مش هيلاقي حاجة، شغّله من غير فلتر ودوّر بعينك.`
        }
      ]
    },
    {
      t: "الشبكات بعمق",
      l: 2,
      n: "",
      items: [
        {
          cmd: "ipconfig /release /renew",
          title: "جدد الـ IP",
          desc: "لما النت يعلّق أو الـ IP يبقى غلط. هيقطع النت ثواني.",
          example: R`ipconfig /release
ipconfig /renew
ipconfig /displaydns`,
          try: "اعرض كاش الـ DNS بـ [[/displaydns]] قبل وبعد [[/flushdns]].",
          deep: {
            why: "تجديد عنوان الـ IP من الـ DHCP. مفيد لو الجهاز بقى عنوانه 169.254 أو الاتصال بايظ.",
            how: R`[[ipconfig /release]] يطلّق العنوان الحالي. [[ipconfig /renew]] يطلب عنوان جديد من الـ DHCP (الراوتر).

[[ /flushdns]] بيمسح الـ DNS cache. مفيد بعد تغيير ملف hosts.

أوامر advanced: [[ipconfig /registerdns]] بيسجّل اسم الجهاز في الـ DNS مرة تانية.`,
            when: "الاتصال بايظ وعنوانك 169.254. بعد تغيير إعدادات الشبكة.",
            mistakes: "Release/Renew مش هيحل مشاكل wifi password أو MAC filtering. هو بس بيجدد العنوان."
          },
          lines: ["سيب عنوان الـ IP الحالي.", "اطلب عنوان جديد من الراوتر.", "اعرض كاش الـ DNS."],
          sol: R`[[ipconfig /displaydns]] هيطبع لكل دومين زرته قريب بلوك فيه [[Record Name]] و [[Record Type]] و [[Time To Live]] و [[A (Host) Record . . . : IP]]. بعد [[ipconfig /flushdns]] هيطبع [[Successfully flushed the DNS Resolver Cache.]]، و [[/displaydns]] تاني هيطلع شبه فاضي.

لو لقيت كام entry لسه موجودين بعد الـ flush، غالبًا دول من ملف hosts (بيتحمّلوا دايمًا)، أو برنامج في الخلفية سأل تاني في الثواني اللي فاتت. [[/release]] و [[/renew]] مش جزء من التجربة دي، دول بيقطعوا النت ثواني.`
        },
        {
          cmd: "nslookup",
          title: "DNS بالتفصيل",
          desc: "تكتب الـ DNS server بعد الدومين عشان تسأله هو بالذات، و [[-type=]] لنوع السجل.",
          example: R`nslookup example.com
nslookup example.com 1.1.1.1
nslookup -type=mx example.com
nslookup -type=txt example.com`,
          try: "اعرف سيرفرات الإيميل لدومين عندك.",
          deep: {
            why: "استعلام DNS بشكل تفاعلي أو مباشر. موجود في ويندوز والماك ولينكس.",
            how: R`[[nslookup example.com]] بيسأل الـ DNS الافتراضي ويعرض الـ IP. [[nslookup example.com 8.8.8.8]] يسأل Google DNS.

الوضع التفاعلي: [[nslookup]] من غير حاجة بيدخل prompt. [[set type=MX]] بيغيّر نوع الاستعلام. [[example.com]] بيبحث. [[exit]] للخروج.

[[nslookup -type=TXT example.com]] لسجلات التحقق.`,
            when: "DNS troubleshooting. التأكد من MX أو TXT records.",
            mistakes: "nslookup ممكن يطلعلك «Non-authoritative answer» ومش مشكلة، ده يعني الجواب من cache مش من السيرفر الأصلي."
          },
          lines: ["الـ IP بتاع الدومين.", "اسأل Cloudflare بدل الـ DNS بتاعك.", "سيرفرات الإيميل.", "سجلات TXT."],
          sol: R`[[nslookup -type=mx yourdomain.com]] بيطبع سطر لكل سيرفر زي [[yourdomain.com  MX preference = 1, mail exchanger = smtp.google.com]] لو بتستخدم Google Workspace، أو سيرفرات [[...mail.protection.outlook.com]] لو Microsoft 365. الرقم الأصغر في preference أولويته أعلى.

لو مطلعش أي [[mail exchanger]] ولقيت بس بيانات SOA (primary name server)، يبقى الدومين ملوش MX، والإيميل عليه مش هيوصل. ولو عايز تتأكد إن الرد مش من كاش قديم اسأل سيرفر عام: [[nslookup -type=mx yourdomain.com 1.1.1.1]].`
        },
        {
          cmd: "arp / route",
          title: "الأجهزة اللي حواليك والطريق",
          desc: "[[arp -a]] الأجهزة اللي جهازك كلّمها على نفس الشبكة. [[route print]] جدول الـ routing، وسطر [[0.0.0.0]] هو الـ gateway.",
          example: R`arp -a
route print`,
          try: "اعرف IP الراوتر من route print.",
          deep: {
            why: "معلومات متقدمة عن الشبكة: جدول ARP لإيجاد أجهزة على نفس الشبكة، وجدول الـ routing.",
            how: R`[[arp -a]] بيعرض جدول ARP: الأجهزة اللي الجهاز بيعرفها على الشبكة المحلية (IP وMAC). مفيد تعرف إيه الأجهزة على نفس الـ subnet.

[[route print]] بيعرض جدول الـ routing. [[route print 0.0.0.0]] الـ default gateway.

[[route add]] لإضافة route يدويًا (محتاج Admin).`,
            when: "تشخيص مشاكل الـ routing. إيجاد عنوان MAC لجهاز. في بيئات شبكات معقدة.",
            mistakes: "arp cache بياخد وقت يتحدث. لو محتاج تجدّد: [[arp -d *]] بيمسح الكاش (محتاج Admin)."
          },
          lines: [
            "الأجهزة اللي جهازك شافها على الشبكة المحلية، بالـ IP والـ MAC.",
            "جدول الراوتينج، وفيه الـ gateway الافتراضي."
          ],
          sol: R`في [[route print]] روح لقسم [[IPv4 Route Table]] تحت [[Active Routes:]]، ودوّر على السطر اللي Network Destination و Netmask فيه [[0.0.0.0]] و [[0.0.0.0]]. عمود [[Gateway]] في السطر ده هو IP الراوتر، زي [[192.168.1.1]]، وعمود Interface هو الـ IP بتاعك.

لو فيه أكتر من سطر 0.0.0.0 (مثلًا واي فاي وكابل أو VPN)، اللي Metric بتاعه أصغر هو اللي بيتستخدم. ولو عايز تختصر [[route print -4]] يعرض IPv4 بس. والـ IP ده نفسه اللي هتلاقيه في [[Default Gateway]] بتاع ipconfig.`
        },
        {
          cmd: "pathping",
          title: "traceroute مع نسبة الخسارة",
          desc: "أبطأ من tracert بكتير (بياخد دقايق) بس بيوريك نسبة الـ packet loss عند كل راوتر، زي mtr في لينكس.",
          example: "pathping google.com",
          try: "شغّله على دومين بعيد وسيبه يخلص (بياخد دقايق)، وشوف نسبة الخسارة عند كل راوتر في العمود الأخير.",
          deep: {
            why: "بيجمع ping وtracert في أمر واحد: بيعرض الطريق وبيحسب نسبة الـ packet loss في كل hop.",
            how: R`[[pathping google.com]] أولًا بيبني الـ map (زي tracert)، وبعدين بيبعت packets لكل hop ويحسب الـ loss. ده بياخد وقت (حوالي دقيقتين افتراضيًا).

[[/n]] بيتجنب الـ DNS resolution ويسرّع. [[/q 10]] بيقلل عدد الـ queries.

الناتج بيوريك [[Lost/Sent]] لكل hop. لو hop معين فيه loss عالي ومش الـ hops بعده، هو المشكلة.`,
            when: "الاتصال بيقطع ومش عارف فين. مشاكل VoIP أو جودة الاتصال.",
            mistakes: "pathping بياخد وقت، لو محتاج تشخيص سريع استخدم tracert."
          },
          lines: ["الطريق + نسبة الضياع عند كل راوتر (بياخد دقيقتين)."],
          sol: R`[[pathping google.com]] بيطبع الأول قايمة الـ hops زي tracert، وبعدين [[Computing statistics for 250 seconds...]] (الوقت حسب عدد الـ hops)، وفي الآخر جدول فيه Hop و RTT و [[Source to Here]] و [[This Node/Link]] و Address. العمود [[This Node/Link Lost/Sent = Pct]] هو نسبة الخسارة عند الراوتر ده بالذات.

لو لقيت راوتر في النص عليه [[100%]] أو نسبة عالية بس اللي بعده [[0%]]، ده مش مشكلة: الراوتر ده بيتجاهل الـ ping بتاع الاختبار بس وبيعدّي الترافيك عادي. الخسارة الحقيقية هي اللي بتبدأ عند hop وتفضل في كل اللي بعده. وأول hop (الراوتر بتاعك) لو عليه خسارة، المشكلة في الواي فاي أو الكابل عندك.`
        },
        {
          cmd: "netsh",
          title: "إعدادات الشبكة",
          desc: "أداة كبيرة لإعدادات الشبكة. الأمر الأخير بيوريك باسورد واي فاي انت متوصل بيه قبل كده على جهازك (اسم الشبكة بين علامات التنصيص).",
          example: R`netsh interface ip show config
netsh wlan show profiles
netsh wlan show profile name="MyWiFi" key=clear`,
          try: "اعرف باسورد الواي فاي بتاعك من جهاز متوصل بيه.",
          deep: {
            why: "أداة قوية لإدارة الشبكة في ويندوز. بتستخدمها لإيجاد الـ Wi-Fi passwords وإعداد الشبكة.",
            how: R`[[netsh wlan show profiles]] يعرض كل الـ Wi-Fi networks المحفوظة.

[[netsh wlan show profile name="NetworkName" key=clear]] يعرض معلومات الشبكة بما فيها الباسورد تحت «Key Content».

[[netsh interface ip show config]] إعدادات IP لكل كارت.

[[netsh advfirewall set allprofiles state off]] يعطّل الفايروول (محتاج Admin). استخدم بحذر.`,
            when: "نسيت باسورد Wi-Fi محفوظ. إعداد شبكة من الـ command line.",
            mistakes: "netsh firewall (القديم) مش بيشتغل على ويندوز الحديث. استخدم netsh advfirewall."
          },
          lines: [
            "إعدادات IP لكل كارت.",
            "شبكات الواي فاي المحفوظة.",
            "تفاصيل شبكة معينة، وباسوردها تحت Key Content ([[key=clear]])."
          ],
          sol: R`[[netsh wlan show profiles]] الأول عشان تعرف الاسم بالظبط (بيظهر بعد [[All User Profile :]]). بعدين [[netsh wlan show profile name="اسم الشبكة" key=clear]]، ودوّر تحت [[Security settings]] على سطر [[Key Content : ...]]، ده الباسورد.

لو سطر Key Content مش ظاهر، افتح CMD كأدمن. ولو [[Profile "..." is not found on the system.]] يبقى الاسم مش مطابق (مسافة أو حرف كابيتال)، انسخه من ناتج show profiles. وده بيشتغل بس على شبكة الجهاز ده اتوصل بيها قبل كده.`
        },
        {
          cmd: "hosts",
          title: "ملف hosts",
          desc: "لازم تفتح notepad كأدمن عشان تقدر تحفظ.",
          example: R`type C:\Windows\System32\drivers\etc\hosts
notepad C:\Windows\System32\drivers\etc\hosts`,
          try: "اعرض الملف واعرف فيه إيه.",
          deep: {
            why: "نفس ملف hosts في لينكس ولكن مكانه مختلف ومحتاج صلاحيات Admin.",
            how: R`المسار: [[C:\Windows\System32\drivers\etc\hosts]]. عدّله بأي text editor كـ Admin.

أسهل طريقة: ابحث عن Notepad في Start Menu، كليك يمين ثم «Run as administrator»، ثم افتح الملف.

أو PowerShell كمدير: [[Add-Content "C:\Windows\System32\drivers\etc\hosts" "203.0.113.10 example.com"]].

بعد التعديل: [[ipconfig /flushdns]] عشان التغيير يسري فورًا.`,
            when: "تجرّب موقع على سيرفر جديد. دومين محلي للتطوير.",
            mistakes: "تعدّل من غير صلاحيات Admin فيرفض الحفظ (Access denied). افتحه كـ Admin دايمًا واعمل flush بعده."
          },
          lines: ["اعرض ملف hosts.", "افتحه في Notepad (لازم CMD يكون مفتوح كمدير عشان تقدر تحفظ)."],
          sol: R`[[type C:\Windows\System32\drivers\etc\hosts]] على ويندوز جديد هيطبع سطور كلها بتبدأ بـ [[#]]: حقوق Microsoft، وشرح للصيغة، وسطرين معلقين [[# 127.0.0.1 localhost]] و [[# ::1 localhost]]. يعني الملف فعليًا مفيهوش حاجة شغالة، والـ [[#]] معناها تعليق.

لو عندك Docker Desktop هتلاقي قسم [[# Added by Docker Desktop]] فيه [[host.docker.internal]] و [[kubernetes.docker.internal]]، وده طبيعي. أما لو لقيت سطور بدومينات معروفة (بنوك أو جوجل) شاورة على IP غريب وانت محطتهاش، ده ممكن يكون برنامج خبيث، راجعه.`
        }
      ]
    },
    {
      t: "المتغيرات والاختصارات",
      l: 2,
      n: "",
      items: [
        {
          cmd: "set / setx",
          title: "متغيرات البيئة",
          desc: "[[set]] للنافذة دي بس. [[setx]] دايم بس بيظهر في النوافذ الجديدة. متعملش [[setx PATH]] أبدًا لأنه ممكن يقصّ الـ PATH بتاعك، عدّله من System Properties.",
          example: R`set
set PORT=3000
echo %PORT%
echo %PATH%
setx API_URL "http://localhost:3000"`,
          try: "اعمل set لمتغير واطبعه، وافتح نافذة جديدة ولاحظ إنه مش موجود.",
          deep: {
            why: "متغيرات البيئة في CMD. [[set]] للجلسة الحالية، [[setx]] للحفظ الدائم.",
            how: R`[[set VAR=value]] بيضبط المتغير للجلسة الحالية بس. [[echo %VAR%]] بيقراه (نسبة مئوية من الطرفين).

[[setx VAR value]] بيحفظ دائم في الـ registry للـ user. بيأثر على الجلسات الجديدة مش الحالية.

[[setx VAR value /m]] للـ System (كل المستخدمين)، محتاج Admin.

[[set]] من غير حاجة بيعرض كل المتغيرات. [[set JAVA]] بيعرض المتغيرات اللي بتبدأ بـ JAVA.`,
            when: "تضبط JAVA_HOME أو NODE_ENV. (الـ PATH عدّله من System Properties مش بـ setx.)",
            mistakes: "set بيضيف المسافات لو كتبت [[set VAR = value]] (مسافة قبل وبعد =). اكتب [[set VAR=value]] بدون مسافات."
          },
          lines: [
            "كل المتغيرات.",
            "متغير للجلسة دي بس. من غير مسافات حوالين =.",
            "اقراه: النسبة المئوية من الطرفين.",
            "الـ PATH.",
            "متغير دائم لليوزر (بيظهر في النوافذ الجديدة بس)."
          ],
          sol: R`[[set PORT=3000]] وبعدين [[echo %PORT%]] بيطبع [[3000]]. افتح نافذة CMD جديدة واكتب [[echo %PORT%]]: هيطبع [[%PORT%]] زي ما هي، لأن CMD لما المتغير مش موجود بيسيب الكلام زي ما هو بدل ما يطبع فاضي.

لو عايزه يفضل استخدم [[setx PORT 3000]]، هيقولك [[SUCCESS: Specified value was saved.]]، بس في النافذة الحالية [[echo %PORT%]] مش هتتأثر، النوافذ الجديدة بس. وخد بالك من [[set PORT = 3000]] بمسافات، ده بيعمل متغير اسمه [["PORT "]] بمسافة وقيمته [[" 3000"]].`
        },
        {
          cmd: "doskey",
          title: "اختصارات",
          desc: "[[$*]] معناها باقي الـ arguments. بتروح لما تقفل النافذة. [[F7]] يعرض تاريخ الأوامر.",
          example: R`doskey ll=dir /a $*
doskey gs=git status`,
          try: "اعمل alias اسمه ll وجربه.",
          deep: {
            why: "عمل shortcuts وaliases في CMD. بس بيضيع لما تقفل CMD.",
            how: R`[[doskey ls=dir /w $*]] بيعمل alias [[ls]] يشغّل [[dir /w]]. [[$*]] هي الـ arguments اللي بتتمرر.

[[doskey /macros]] بيعرض كل الـ macros المعمولة.

للحفظ الدائم: اعمل ملف .bat بيه كل الـ doskey commands، وضيفه في autorun في الـ registry: [[HKCU\Software\Microsoft\Command Processor\AutoRun]].`,
            when: "اختصارات للأوامر الطويلة في CMD.",
            mistakes: "doskey macros بتضيع لما تقفل CMD. للحل الدائم في الـ registry."
          },
          lines: ["اختصار: [[ll]] تبقى dir /a، و [[$*]] بيمرر أي arguments.", "اختصار لـ git status."],
          sol: R`[[doskey ll=dir /a $*]] مش بيطبع حاجة. [[ll]] بعدها بيطبع dir بالملفات المخفية، و [[ll src]] بيعرض src لأن [[$*]] بتاخد أي حاجة بعد ll.

الـ alias بيروح لما تقفل النافذة، ومش بيشتغل في PowerShell ولا جوه ملفات bat. لو [[ll]] قالك is not recognized، يبقى انت في نافذة جديدة أو في PowerShell. و [[doskey /macros]] بيعرض كل الـ aliases اللي عملتها.`
        }
      ]
    },
    {
      t: "لغة batch",
      l: 3,
      n: "ملفات .bat. هتقابلها في مشاريع قديمة وأدوات ويندوز، فاعرف تقراها وتعدّلها",
      items: [
        {
          cmd: "set و %1",
          title: "المتغيرات والـ arguments",
          desc: "[[set NAME=value]] من غير مسافات حوالين [[=]]. [[set /a]] للحساب، و [[set /p]] ياخد مدخلات. [[%1]] أول argument، و [[%~dp0]] فولدر السكربت نفسه، ودي مهمة عشان السكربت يشتغل صح من أي مكان.",
          example: R`@echo off
set NAME=%1
if "%NAME%"=="" set /p NAME=Project name: 
set /a COUNT=5*2
echo Name: %NAME%, count: %COUNT%
echo Script folder: %~dp0`,
          try: "احفظه وشغّله مرة بـ argument ومرة من غيره.",
          flag: "script",
          deep: {
            why: "المتغيرات والـ arguments في سكربتات .bat. أساسيات لغة batch.",
            how: R`[[%1]] أول argument، [[%2]] التاني. [[%~dp0]] مسار الفولدر اللي السكربت فيه (مفيد جدًا). [[%~nx0]] اسم السكربت.

[[set /p VAR=Enter value: ]] بيستنى input من المستخدم.

[[set /a RESULT=%NUM1% + %NUM2%]] حسابات رقمية.

[[if defined VAR]] بيشيك لو المتغير معرّف (مش فاضي).`,
            when: "أي سكربت batch بياخد arguments.",
            mistakes: "نسيان [[%]] من الطرفين في الاستخدام: [[set VAR=value]] صح، [[echo VAR]] بيطبع النص «VAR» مش القيمة. لازم [[echo %VAR%]]."
          },
          lines: [
            "متطبعش الأوامر وهي بتتنفذ.",
            "خزّن أول argument في NAME.",
            "لو فاضي، اسأل اليوزر يكتبه ([[set /p]] زي read).",
            "حسبة رقمية ([[/a]]).",
            "اطبع المتغيرين.",
            "مسار الفولدر اللي السكربت فيه. [[%~dp0]]: drive وpath للسكربت نفسه."
          ],
          sol: R`احفظه [[test.bat]]. [[test.bat myapp]] يطبع [[Name: myapp, count: 10]] و [[Script folder: C:\Users\ali\lab\]] (بـ backslash في الآخر). من غير argument هيوقف ويسألك [[Project name:]] وياخد اللي تكتبه. شغّله من فولدر تاني بالمسار الكامل وهتلاقي Script folder لسه فولدر السكربت، وده الغرض من [[%~dp0]].

لو دوست Enter من غير ما تكتب اسم، [[NAME]] هيفضل فاضي و الناتج [[Name: , count: 10]]. ولو كتبت [[set /a COUNT = 5*2]] بمسافات بتشتغل عادي لأن [[/a]] بيتجاهلها، بس [[set NAME = %1]] لأ. (ملاحظة: مقدرتش أشغّل CMD هنا، السلوك ده من توثيق Microsoft لـ set و call.)`
        },
        {
          cmd: "if و errorlevel",
          title: "الشروط والـ exit code",
          desc: "[[if errorlevel 1]] معناها الـ exit code واحد أو أكتر، يعني فشل. [[call]] لازمة قبل npm وأي ملف bat تاني، وإلا السكربت بتاعك هيخلص مكانه. و [[exit /b]] يخرج من السكربت بس مش من النافذة.",
          example: R`@echo off
if exist package.json (
    echo Node project
) else (
    echo Not a Node project
)

call npm run build
if errorlevel 1 (
    echo Build failed
    exit /b 1
)
echo Build OK`,
          try: "شغّله في فولدر من غير package.json.",
          flag: "script",
          deep: {
            why: "الشروط في batch. أقل وضوحًا من bash بس مهمة للـ automation.",
            how: R`[[if "%1"=="" (echo No arg & exit /b 1)]] بيتشيك لو argument فاضي.

[[if exist "file.txt" (...)]] بيتشيك وجود ملف.

[[if errorlevel 1 goto FAILED]] لو الأمر فشل انتقل لـ label. [[errorlevel]] هو الـ exit code.

Labels في batch: [[:LABEL]] سطر بيبدأ بـ :، و[[goto LABEL]] بينقل للـ label.

[[exit /b 0]] بيخرج من الـ batch (مش من CMD كله). [[exit /b 1]] بيطلع error.

وعلامات التنصيص مهمة حول القيم لو فيها مسافات: [[if "%1"=="value"]].`,
            when: "التحقق من arguments. التعامل مع errors. شروط في الـ automation.",
            mistakes: "[[if errorlevel 1]] معناها «الـ errorlevel يساوي 1 أو أكبر». للتساوي بالظبط: [[if errorlevel 1 if not errorlevel 2]]."
          },
          lines: [
            "متطبعش الأوامر.",
            "لو الملف موجود.",
            "اطبع.",
            "وإلا.",
            "اطبع.",
            "قفلة.",
            "شغّل npm. [[call]] لازمة مع أوامر .bat/.cmd زي npm وإلا السكربت يقف بعدها.",
            "لو الـ exit code واحد أو أكتر (يعني فشل).",
            "اطبع.",
            "اخرج من السكربت برقم فشل.",
            "قفلة.",
            "اطبع."
          ],
          sol: R`في فولدر من غير package.json هيطبع [[Not a Node project]]، وبعدين npm يطلع [[npm error code ENOENT]] و [[Could not read package.json]]، وبعدين [[Build failed]]، والسكربت يخرج بـ 1 ([[echo %errorlevel%]] بعدها يطبع 1).

جرب تشيل [[call]]: هتلاقي كلام npm ظهر وبعدها السكربت خلص على طول من غير Build failed ولا Build OK، لأن npm نفسه ملف [[npm.cmd]]، وتشغيل bat من bat من غير call بيسلّمه التحكم ومش بيرجع. ولو استخدمت [[exit 1]] من غير [[/b]] هتتقفل نافذة CMD كلها.`
        },
        {
          cmd: "for و delayed expansion",
          title: "اللوب وأغرب حاجة في batch",
          desc: "المتغيرات جوه الأقواس بتتفك مرة واحدة قبل ما اللوب يبدأ، فـ [[%COUNT%]] جوه اللوب هتفضل 0. الحل [[enabledelayedexpansion]] وتكتب المتغير [[!COUNT!]]. وفي ملف bat متغير اللوب [[%%f]]، وفي الشاشة مباشرة [[%f]].",
          example: R`@echo off
setlocal enabledelayedexpansion
set COUNT=0
for %%f in (*.log) do (
    set /a COUNT+=1
    echo !COUNT!: %%f
)
echo Total: !COUNT!
endlocal`,
          try: "غيّر [[!COUNT!]] جوه اللوب لـ [[%COUNT%]] وشوف الفرق.",
          flag: "script",
          deep: {
            why: "اللوبات في batch. أعقد من bash بس ممكن جدًا.",
            how: R`[[for %i in (*.txt) do @echo %i]] على الملفات (في CMD مش سكربت). في السكربتات [[%%i]] مش [[%i]].

[[for /f "tokens=*" %i in ('command') do ...]] بيلف على ناتج أمر.

[[for /f "tokens=1,2 delims=,"]] بيقرا CSV.

[[setlocal enabledelayedexpansion]] وبعدها [[!VAR!]] بدل [[%VAR%]]. ليه؟ لأن [[%VAR%]] بيتفسّر مرة واحدة لما الـ for block يشتغل. لو بتعدّل المتغير جوه اللوب وعايز القيمة الجديدة، محتاج [[!VAR!]] مع delayed expansion.`,
            when: "لف على ملفات أو لستة أو ناتج أمر في batch.",
            mistakes: "[[%i]] في السكربت بدل [[%%i]]: هيطلع error. وتنسى setlocal enabledelayedexpansion لما تعدّل متغير جوه loop."
          },
          lines: [
            "متطبعش الأوامر.",
            "فعّل قراية المتغيرات وقت التنفيذ مش وقت قراية اللوب.",
            "عدّاد.",
            "لكل ملف log ([[%%f]] في السكربت، [[%f]] لو كتبته في CMD مباشرة).",
            "زوّد العدّاد.",
            "اطبعه بـ [[!COUNT!]] مش [[%COUNT%]]، وإلا هتطلع القيمة القديمة كل مرة.",
            "قفلة.",
            "الإجمالي.",
            "رجّع الإعدادات."
          ],
          sol: R`في فولدر فيه [[a.log]] و [[b.log]] و [[c.log]]: الأصلي بيطبع [[1: a.log]] و [[2: b.log]] و [[3: c.log]] و [[Total: 3]]. بعد التغيير لـ [[%COUNT%]] جوه اللوب هيطبع [[0: a.log]] و [[0: b.log]] و [[0: c.log]]، بس [[Total: 3]] لسه صح.

ده لأن CMD بيفك [[%COUNT%]] مرة واحدة لما يقرا البلوك كله (والقيمة ساعتها 0)، أما [[!COUNT!]] بتتفك كل لفة. العدّ نفسه شغال في الحالتين، العرض بس اللي غلط. ولو مفيش ملفات log خالص هيطبع [[Total: 0]] بس. ولو كتبت [[!COUNT!]] من غير [[setlocal enabledelayedexpansion]] هتطبع [[!COUNT!]] حرفيًا.`
        },
        {
          cmd: "build.bat",
          title: "goto و labels",
          desc: "[[:error]] اسمه label، و [[goto]] بيروح له. و [[||]] بعد الأمر بتروح للـ label لو فشل.",
          example: R`@echo off
REM build.bat
set TARGET=%1
if "%TARGET%"=="" set TARGET=dist

if not exist %TARGET% mkdir %TARGET%

call npm run build || goto :error

echo Build done in %TARGET%
exit /b 0

:error
echo Build failed!
exit /b 1`,
          try: "احفظه في مشروع وشغّله بـ [[build.bat]].",
          flag: "script",
          deep: {
            why: "مثال حقيقي لسكربت batch بيجمع كل الـ concepts: نجح أو فشل، ووقفة عند الأخطاء.",
            how: R`[[@echo off]] في الأول بيوقف طباعة كل سطر قبل تنفيذه (النقيض @echo on الافتراضي).

[[setlocal]] يحمي المتغيرات من التأثير على ما بعد الـ script.

[[@REM]] أو [[::]] تعليق.

[[if errorlevel 1 (...)]] بعد كل أمر مهم.

[[title Building...]] بيغيّر عنوان نافذة CMD.

[[pause]] بيوقف ويستنى أي ضغطة زرار، مفيد في آخر سكربت بيشغّله المستخدم عشان يقرا النتيجة.`,
            when: "أتمتة build على ويندوز. سكربت setup بسيط.",
            mistakes: "نسيان @echo off فالـ batch يطبع كل سطر قبل تنفيذه وتتشوّش الشاشة."
          },
          lines: [
            "متطبعش الأوامر.",
            "الهدف من أول argument.",
            "لو فاضي، الافتراضي dist.",
            "اعمل الفولدر لو مش موجود.",
            "شغّل الـ build، ولو فشل روح لـ label اسمه error.",
            "اطبع النجاح.",
            "اخرج بنجاح.",
            "label: هنا بيبدأ كود الفشل.",
            "اطبع.",
            "اخرج بفشل."
          ],
          sol: R`في مشروع فيه script اسمه build: [[build.bat]] هيعمل فولدر dist لو مش موجود، ويشغّل الـ build، وفي الآخر [[Build done in dist]]. لو الـ build فشل (أو مفيش package.json) هتشوف error npm وبعده [[Build failed!]]، و [[echo %errorlevel%]] يطبع 1.

خد بالك إن [[%1]] (TARGET) هنا بيعمل الفولدر ويطبع اسمه بس، مش بيغيّر مكان ناتج npm؛ الـ build بيطلع في المكان المظبوط في الـ config (vite مثلًا dist). ولو شلت [[call]] قبل npm، السطر [[|| goto :error]] مش هيوصله الدور. وفولدر dist بيتعمل حتى لو الـ build فشل، لأن mkdir قبله.`
        },
        {
          cmd: "chcp 65001",
          title: "خلّي العربي يظهر صح في ملف bat",
          desc: R`cmd افتراضيًا بيقرا ملف الـ bat بصفحة ترميز قديمة (غالبًا 437، أو 720 على ويندوز عربي)، فالعربي يطلع رموز غريبة. [[chcp 65001]] في أول الملف بيحوّل النافذة لـ UTF-8، و [[>nul]] يخفي رسالة «Active code page». والملف نفسه لازم يتحفظ UTF-8 من غير BOM.`,
          example: R`@echo off
chcp 65001 >nul
echo جاري رفع النسخة الاحتياطية...
echo تم.`,
          try: "اعمل test.bat فيه echo بالعربي من غير سطر chcp وشغّله، وبعدين ضيف السطر وشغّله تاني. وبعدها احفظه «UTF-8 with BOM» من VS Code وشوف أول سطر بيحصله إيه.",
          flag: "script",
          deep: {
            why: "عامل ملف bat لحد مش مبرمج (رفع باك أب، تشغيل برنامج)، والرسايل بالعربي عشان يفهمها. يشغّله يلاقي رموز زي [[Ø¬Ø§Ø±ÙŠ]] بدل الكلام. ودي مش مشكلة في الكلام، دي مشكلة إن cmd بيقرا بايتات UTF-8 على إنها ترميز تاني.",
            how: R`كل نافذة cmd ليها «code page»: جدول بيقول كل بايت يترسم كأنهي حرف. الافتراضي بيتحدد من إعدادات لغة ويندوز، وغالبًا 437 (إنجليزي قديم) أو 720 (عربي DOS). و 1256 اللي تعرفه ده بتاع برامج ويندوز العادية مش نافذة cmd. ومحررات النهارده زي VS Code بتحفظ UTF-8. فالبايتات صح بس بتتقري بالجدول الغلط.

[[chcp]] (من change code page) بيغيّر الجدول، و 65001 رقم UTF-8. و [[>nul]] يرمي الرسالة اللي بيطبعها. ومن السطر اللي بعده، الكلام بيتقري ويتطبع صح.

والـ BOM: ٣ بايتات مخفية بعض المحررات بتحطها في أول ملف UTF-8. cmd مبيفهمهاش، فبيقراها كجزء من أول أمر، فيطلعلك إن [[@echo]] مش أمر معروف، وكل الأوامر تتطبع وهي بتتنفذ. في VS Code بص تحت على اليمين: لازم تبقى «UTF-8» مش «UTF-8 with BOM».

والتغيير ده للنافذة دي بس مش لويندوز كله. ولو السكربت اتشغّل من نافذة cmd مفتوحة، هتفضل على 65001 بعد ما يخلص.`,
            when: "أي ملف bat فيه echo بالعربي أو أسامي ملفات بالعربي. وكمان لو برنامج بيطبع UTF-8 (زي git أو node) والناتج طالع غريب في cmd.",
            mistakes: R`في مشروع حقيقي كان ملف الباك أب اللي بيشغّله شخص مش مبرمج بدبل كليك كله رسايل عربي، والسطر ده هو اللي مخليها مقروءة. وأشهر غلطة: الملف محفوظ «UTF-8 with BOM»، فأول سطر [[@echo off]] نفسه يبوظ. وغلطة تانية: الخط القديم في نافذة cmd الكلاسيكية (Raster Fonts) مفيهوش حروف عربي أصلًا، فحتى مع 65001 هتشوف مربعات. Windows Terminal مفيهوش المشكلة دي.`
          },
          lines: [
            "متطبعش الأوامر.",
            "حوّل النافذة لـ UTF-8، واخفي رسالة التأكيد.",
            "هيطلع عربي صح.",
            "وده كمان."
          ],
          sol: R`من غير [[chcp]]: الـ echo العربي هيطلع رموز غريبة زي [[╪¼╪º╪▒┘è]] أو حروف عربي ملخبطة، لأن CMD قرا بايتات UTF-8 بصفحة ترميز قديمة. بعد ما تضيف [[chcp 65001 >nul]]: الجمل هتظهر عربي صح (في Windows Terminal، الكونسول القديم ممكن يعرض الحروف مفصولة أو مقلوبة).

ولو حفظته UTF-8 with BOM، أول سطر هيبوظ: هتشوف حاجة زي [['ï»¿@echo' is not recognized as an internal or external command]]، لأن 3 بايتات الـ BOM اتلزقوا في أول [[@echo]] قبل ما chcp يشتغل، وبما إن [[echo off]] مشتغلش هتلاقي كل أمر بيتطبع قبل تنفيذه. رجّعه UTF-8 عادي من شريط VS Code تحت.`
        },
        {
          cmd: "git-backup.bat",
          title: "زرار باك أب على GitHub بدبل كليك",
          desc: R`ملف bat لحد مش مبرمج: يدخل فولدر المشروع بـ [[%~dp0]]، يسحب آخر نسخة، ولو فيه تغييرات يعمل commit بالتاريخ ([[%date% %time%]]) ويرفع. وفي الآخر [[timeout /t 5]] يسيب النافذة مفتوحة ثواني يقرا فيها النتيجة، ولو فيه خطأ [[pause]] يستناه يدوس زرار.`,
          example: R`@echo off
chcp 65001 >nul
cd /d "%~dp0"

git pull --rebase --autostash origin main || goto :fail
git add -A
git diff --cached --quiet
if %errorlevel%==0 (
    echo مفيش تغييرات جديدة.
    timeout /t 4 >nul
    exit /b 0
)

git commit -m "backup: %date% %time%" || goto :fail
git push origin main || goto :fail
echo تم رفع النسخة الاحتياطية.
timeout /t 5 >nul
exit /b 0

:fail
echo حصل خطأ، اتأكد من النت وجرّب تاني.
pause
exit /b 1`,
          try: "حطه في ريبو تجربة، وشغّله بدبل كليك مرة من غير تغييرات ومرة بعد ما تعدّل ملف، ومرة والنت مقفول.",
          flag: "script",
          deep: {
            why: "حد مش مبرمج (أو انت على جهاز تاني) محتاج يرفع التعديلات على GitHub كل يوم. تعليمه git من الترمنال صعب، إنما ملف يدوس عليه دبل كليك سهل. والملف لازم يتعامل مع كل الحالات: مفيش تغييرات، مفيش نت، الريموت اتقدم.",
            how: R`[[cd /d "%~dp0"]]: [[%~dp0]] فولدر السكربت نفسه (الدرايف والمسار)، و [[/d]] عشان cd تقدر تغيّر الدرايف كمان. فالسكربت يشتغل صح مهما اتشغّل منين، حتى من اختصار على الديسكتوب.

[[git pull --rebase]] الأول، عشان لو حد رفع من جهاز تاني الـ push ميترفضش. و [[--autostash]] ضروري هنا: من غيره git بيرفض الـ pull خالص لو فيه ملفات متعدّلة ولسه مش متعملها commit («cannot pull with rebase: You have unstaged changes»)، ودي بالظبط الحالة اللي السكربت معمول عشانها. معاه git بيشيل التعديلات على جنب، ويسحب، ويرجّعها.

[[git diff --cached --quiet]] بيقارن اللي اتعمله add بآخر commit، ومبيطبعش حاجة، بس بيرجع 0 لو مفيش فرق و 1 لو فيه. فلو 0، يبقى مفيش حاجة جديدة، والسكربت يقول كده ويخرج بدل ما [[git commit]] يفشل برسالة مش مفهومة.

[[%date%]] و [[%time%]] متغيرات بيملاها cmd بالتاريخ والوقت الحاليين، فكل commit رسالته فيها وقته.

و [[|| goto :fail]] بعد كل أمر مهم: لو فشل يروح لآخر الملف، يطبع رسالة ويعمل [[pause]] (يستنى أي زرار)، عشان النافذة متقفلش قبل ما يقرا الخطأ. و [[timeout /t 5 >nul]] في حالة النجاح بيستنى ٥ ثواني والنافذة تقفل لوحدها، و [[>nul]] يخفي العداد.`,
            when: "أي مهمة git بتتكرر لحد مش بيستخدم الترمنال. أو سكربت تحطه في Task Scheduler يرفع كل يوم.",
            mistakes: R`في مشروع حقيقي كان الملف فيه [[cd /d]] لمسار ثابت على جهاز صاحبه، فبيبوظ على أي جهاز تاني، و [[%~dp0]] بتحل ده. وكمان ملفات البيانات اللي المفروض تترفع كانت في [[.gitignore]]، فالسكربت كان بيرفع الكود بس والباك أب نفسه مش بيتحفظ. اتأكد بـ [[git status]] إن الملفات المهمة داخلة، ولو فيها بيانات عملاء الريبو لازم يبقى private، والأحسن متتحطش في git أصلًا. و [[%date%]] شكله بيتغيّر حسب لغة ويندوز (وممكن يبقى فيه [[/]])، فمتستخدمهوش في أسامي ملفات.`
          },
          lines: [
            "متطبعش الأوامر.",
            "عربي صح في النافذة.",
            "ادخل فولدر السكربت نفسه، حتى لو على درايف تاني.",
            "اسحب اللي اترفع من أجهزة تانية الأول ([[--autostash]] يشيل تعديلاتك على جنب ويرجّعها)، ولو فشل روح لـ :fail.",
            "ضيف كل التغييرات.",
            "فيه حاجة اتضافت؟ مبيطبعش، بيرجع 0 لو مفيش فرق.",
            "لو مفيش فرق...",
            "...قول كده...",
            "...استنى ٤ ثواني من غير عداد...",
            "...واخرج بنجاح.",
            "قفلة.",
            "commit برسالة فيها التاريخ والوقت.",
            "ارفع.",
            "اطبع النجاح.",
            "استنى ٥ ثواني والنافذة تقفل لوحدها.",
            "اخرج بنجاح (عشان ميكملش على :fail).",
            "label الفشل.",
            "اطبع رسالة مفهومة.",
            "استنى لحد ما يدوس زرار، عشان يلحق يقرا.",
            "اخرج برقم فشل."
          ],
          sol: R`من غير تغييرات: git pull هيقول حاجة زي [[Already up to date.]]، وبعدين [[مفيش تغييرات جديدة.]] والنافذة تتقفل بعد 4 ثواني. بعد ما تعدّل ملف: هتشوف سطر commit زي [[[main 1a2b3c4] backup: Wed 09/30/2026 14:05:12.34]] (شكل التاريخ حسب إعدادات ويندوز)، وبعدين push بـ [[main -> main]]، و [[تم رفع النسخة الاحتياطية.]].

والنت مقفول: git pull هيفشل برسالة زي [[Could not resolve host: github.com]]، و [[|| goto :fail]] هتنط على طول لـ [[حصل خطأ...]] و [[Press any key to continue . . .]]، ومفيش commit حصل. لو دبل كليك فتح النافذة واتقفلت فورًا من غير ما تشوف حاجة، شغّله من CMD مفتوح عشان تقرا الـ error. ولو git طلب باسورد، يبقى الريبو محتاج تسجيل دخول (Git Credential Manager) قبل ما تستخدمه بدبل كليك.`
        }
      ]
    }
  ]
});
