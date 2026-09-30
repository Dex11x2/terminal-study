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
          ]
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
          ]
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
          lines: ["شجرة الفولدرات.", "فولدر lab بالملفات كمان ([[/f]])."]
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
          lines: ["نضّف الشاشة (زي clear)."]
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
          lines: ["اعمل الفولدرات التلاتة ورا بعض. CMD بيعمل الوسيط لوحده من غير -p.", "فولدرين في أمر واحد."]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          lines: ["اخفي الملف.", "اظهره تاني."]
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
          lines: ["اطبع الملف كله (زي cat).", "صفحة صفحة، Space للي بعدها و q للخروج (زي less)."]
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
          ]
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
          lines: ["node جاي منين (زي which).", "وgit."]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          lines: ["عناوين الشبكة (زي ip a).", "كل التفاصيل: MAC والـ DNS والـ DHCP.", "امسح كاش الـ DNS."]
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
          ]
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
          lines: ["كل معلومات الجهاز والنظام (بياخد ثواني).", "انت مين.", "اسم الجهاز."]
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
          lines: ["سيب عنوان الـ IP الحالي.", "اطلب عنوان جديد من الراوتر.", "اعرض كاش الـ DNS."]
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
          lines: ["الـ IP بتاع الدومين.", "اسأل Cloudflare بدل الـ DNS بتاعك.", "سيرفرات الإيميل.", "سجلات TXT."]
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
          ]
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
          lines: ["الطريق + نسبة الضياع عند كل راوتر (بياخد دقيقتين)."]
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
          ]
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
          lines: ["اعرض ملف hosts.", "افتحه في Notepad (لازم CMD يكون مفتوح كمدير عشان تقدر تحفظ)."]
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
          ]
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
          lines: ["اختصار: [[ll]] تبقى dir /a، و [[$*]] بيمرر أي arguments.", "اختصار لـ git status."]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
        }
      ]
    }
  ]
});
