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

TAB("ps", {
  label: "PowerShell",
  prompt: R`PS C:\lab> `,
  lab: R`New-Item -ItemType Directory $HOME\lab -Force
Set-Location $HOME\lab`,
  categories: [
    {
      t: "الأساسيات والمساعدة",
      l: 1,
      n: "افهم منطق PowerShell وانت هتعرف تخمّن أي أمر",
      items: [
        {
          cmd: "pwsh",
          title: "ثبّت PowerShell 7 الأول",
          desc: R`ويندوز جاي فيه نسختين باسم PowerShell. Windows PowerShell 5.1 (الأيقونة الزرقا، وأمرها [[powershell]]) موجودة دايمًا بس اتوقف تطويرها. و PowerShell 7 (أمرها [[pwsh]]) الجديدة: أسرع، وبتكتب الملفات UTF-8 من غير مشاكل الترميز، وفيها أوامر وإضافات كتير مش في 5.1، وبتشتغل على لينكس والماك كمان. كل دروس التاب ده شغالة على 7، واللي بيختلف في 5.1 مكتوب جنبه.

[[winget]] مدير البرامج بتاع ويندوز (زي apt في لينكس)، و [[--id Microsoft.PowerShell]] اسم الباكدج، و [[-e]] يعني الاسم بالظبط ده مش أي حاجة شبهه. بعد التسطيب افتح نافذة جديدة واكتب [[pwsh]]. و [[$PSVersionTable]] متغير جاهز فيه معلومات النسخة، و [[.PSVersion]] بيطلع رقمها، والمفروض 7 أو أكتر.

وبعدها خليه الافتراضي: في Windows Terminal من Settings، Default profile، و في VS Code من إعداد الترمنال الافتراضي. ومتمسحش 5.1، ويندوز وبرامج كتير محتاجينها.`,
          example: R`winget install --id Microsoft.PowerShell -e
pwsh
$PSVersionTable.PSVersion`,
          try: "سطّبه واتأكد إن النسخة 7 أو أكتر.",
          deep: {
            why: "PowerShell مش مجرد terminal بديل لـ CMD. هو بيئة برمجة كاملة على ويندوز، وبيشتغل كمان على الماك ولينكس. لما بتشتغل على ويندوز، ده اللي هتستخدمه للأتمتة وإدارة السيرفرات.",
            how: R`ويندوز 10 فيه اتنين: Windows PowerShell 5.1 (القديمة المبنية على .NET Framework، موجودة دايمًا) وPowerShell 7+ (الجديدة متعددة المنصات، محتاج تسطّبها). الجديدة (pwsh.exe) أسرع وعندها features أكتر، وهي اللي ينصح بيها.

في VS Code ممكن تختار أي terminal تشتغل فيه. في ويندوز Terminal برضه.

الفرق الكبير عن bash: PowerShell بيعامل كل شغل بـ Objects مش نص. يعني لما تعمل [[Get-Process]]، مش بيطبع نص، بيرجع قايمة objects كل واحد فيه properties زي Name وId وCPU. ودي الفكرة اللي كل حاجة بعدها مبنية عليها.`,
            when: "على أي ويندوز. ولما بتكتب سكربتات هتشتغل على ويندوز سيرفرات.",
            mistakes: "تفتح CMD وتتساءل ليه PowerShell commands مش شغالة. CMD وPowerShell مختلفين تمامًا."
          },
          lines: [
            "سطّب PowerShell 7 بـ winget (مدير باكدجات ويندوز). [[-e]] يعني الاسم بالظبط.",
            "شغّل النسخة الجديدة (الأمر بتاع 5.1 القديمة اسمه powershell).",
            "اطبع رقم النسخة. المفروض 7 أو أعلى."
          ],
          sol: R`[[winget]] هيقولك في الآخر [[Successfully installed]]. افتح نافذة terminal جديدة (القديمة مش شايفة الـ PATH الجديد) واكتب [[pwsh]]، وبعدين [[$PSVersionTable.PSVersion]]. المفروض تشوف جدول فيه [[Major]] بـ 7 و [[Minor]] بـ 5 أو أكتر (أنا شغّلته على 7.5.3 فطلع [[7  5  3]] تحت [[Major  Minor  Patch]]).

لو الجدول طلع فيه [[Major 5]] و [[Minor 1]] وعمود اسمه [[Build]] بدل [[Patch]]، يبقى انت لسه في Windows PowerShell 5.1 القديم (الأيقونة الزرقا أو أمر [[powershell]]). ولو [[pwsh]] قالك «is not recognized»، اقفل كل نوافذ الترمنال وافتح واحدة جديدة، أو اعمل Restart لـ VS Code لو بتشتغل من جواه.`
        },
        {
          cmd: "Verb-Noun",
          title: "اسم الأمر فعل-اسم",
          desc: R`كل أوامر PowerShell الأصلية (اسمها cmdlets) اسمها جزئين بينهم شرطة: فعل وبعده اسم. [[Get-Process]] هات العمليات، و [[Stop-Process]] وقّفها، و [[New-Item]] اعمل حاجة جديدة، و [[Remove-Item]] امسحها. فلو عرفت الفعل والحاجة، تقدر تخمّن اسم الأمر غالبًا صح. والأسامي مش بتفرّق بين الكابيتال والسمول: [[get-process]] نفس [[Get-Process]].

ولأن الأسامي طويلة، فيه aliases (اختصارات): [[ls]] و [[dir]] بيشاوروا على Get-ChildItem، و [[cat]] و [[type]] على Get-Content، و [[cd]] على Set-Location. فأوامر bash و CMD اللي متعود عليها شغالة، بس الـ parameters بتاعتها بتاعة PowerShell: [[ls -la]] مثلًا مش هتشتغل.

[[Get-Alias ls]] بيقولك الاختصار ده بيشاور على أنهي أمر. و [[-Definition Get-ChildItem]] العكس: كل الاختصارات اللي بتشاور على الأمر ده. في السكربتات اكتب الأسامي الكاملة عشان اللي يقرا بعدك يفهم.`,
          example: R`Get-Alias ls
Get-Alias -Definition Get-ChildItem`,
          try: "اعرف كل aliases بتاعة Get-Content.",
          deep: {
            why: "PowerShell بيستخدم نظام تسمية ثابت: فعل-اسم. [[Get-Process]] تجيب، و[[Stop-Process]] توقّف، و[[New-Item]] تعمل. لما تعرف الفعل، تقدر تخمّن الأمر بشكل معقول.",
            how: R`الأفعال الأشهر: [[Get]] يجيب/يعرض. [[Set]] يغيّر. [[New]] يعمل جديد. [[Remove]] يمسح. [[Start]] يشغّل. [[Stop]] يوقّف. [[Invoke]] ينفّذ. [[Test]] يختبر.

والأسامي: [[Item]] ملف أو فولدر. [[Content]] محتوى ملف. [[Process]] عملية. [[Service]] خدمة. [[Location]] المكان الحالي. [[Command]] أمر. [[Help]] مساعدة.

فـ [[Set-Location]] تغيير فولدر (زي cd). [[Get-ChildItem]] يعرض المحتوى (زي ls). [[Remove-Item]] يمسح (زي rm).

Aliases موجودة لكل ده: [[cd]] = Set-Location، [[ls]] = Get-ChildItem، [[rm]] = Remove-Item. فتقدر تكتب الاتنين.`,
            when: "لما مش فاكر الأمر بالظبط: فكّر في الفعل والاسم. وبعدين Get-Command لتأكيد.",
            mistakes: "تكتب aliases في سكربتات. الأحسن الاسم الكامل في السكربتات عشان واضح ومش هيتغير."
          },
          lines: [
            "[[ls]] اختصار لإيه؟ هيقولك Get-ChildItem.",
            "العكس: إيه الاختصارات اللي بتشاور على Get-ChildItem؟"
          ],
          sol: R`[[Get-Alias -Definition Get-Content]] على ويندوز بيطلع 3 سطور: [[cat -> Get-Content]] و [[gc -> Get-Content]] و [[type -> Get-Content]] (جربتها في PowerShell 7.6 و 5.1 ونفس الناتج). [[type]] جاية من أيام CMD، و [[cat]] عشان اللي جاي من لينكس، و [[gc]] الاختصار الرسمي من أول حروف الفعل والاسم.

جربتها على PowerShell 7 على لينكس فطلع [[gc]] و [[type]] بس، لأن على لينكس والماك PowerShell بيشيل الـ aliases اللي ليها نفس اسم أمر حقيقي في النظام زي [[cat]] و [[ls]]. عشان كده في سكربت هيشتغل على أكتر من نظام اكتب الاسم الكامل [[Get-Content]]. ولو كتبت [[Get-Alias Get-Content]] من غير [[-Definition]] هيطلعلك error، لأنه بيدوّر على alias اسمه Get-Content مش على aliases بتشاور عليه.`
        },
        {
          cmd: "Get-Help",
          title: "اقرا الشرح والأمثلة",
          desc: R`[[Get-Help]] هو الـ [[man]] بتاع PowerShell: بتديله اسم أي أمر فيطبعلك بيعمل إيه والـ parameters بتاعته وشكل كتابته. أهم إضافة ليه [[-Examples]]: بتعرض أمثلة جاهزة مترقمة، كل مثال الأمر وتحته شرحه، من غير باقي الكلام الطويل، ودي أسرع طريقة تتعلم بيها أمر جديد. و [[-Online]] بتفتح صفحة الأمر على موقع Microsoft Learn في المتصفح، ودي دايمًا أحدث وأشمل نسخة.

فيه كمان [[-Full]] للشرح كامل، و [[-Parameter Recurse]] لشرح parameter واحد بس. واختصارات سريعة: [[help Copy-Item]] (بيعرض صفحة صفحة) أو [[Copy-Item -?]].

أول مرة غالبًا هتلاقي الاسم والـ aliases بس، وتحتهم تحت [[REMARKS]] جملة «It is displaying only partial help» (في 7.6 و 5.1)، لأن ملفات المساعدة الكاملة مش بتيجي مع ويندوز. شغّل [[Update-Help]] مرة واحدة (في PowerShell 7 مش محتاج أدمن، في 5.1 محتاج PowerShell كأدمن). ولو مستعجل، [[-Online]] شغالة من غير أي تحميل.`,
          example: R`Get-Help Copy-Item -Examples
Get-Help Get-ChildItem -Online`,
          try: "اقرا أمثلة [[Remove-Item]] قبل ما تستخدمه.",
          deep: {
            why: "أي أمر محتاج تعرف parameters بتاعه أو مثال عليه. Get-Help هو man في PowerShell.",
            how: R`[[Get-Help Get-ChildItem]] بيعرض المساعدة. [[-Examples]] بيوريك أمثلة فقط. [[-Online]] بيفتح الصفحة الرسمية في المتصفح، وده دايمًا الأشمل.

على جهاز جديد ملفات المساعدة مش متحمّلة، فـ [[-Examples]] مش هيطلع أي أمثلة لحد ما تشغّل [[Update-Help]] مرة. في PowerShell 7 بيحمّلها لليوزر الحالي ومش محتاج أدمن، وفي 5.1 محتاج PowerShell كأدمن.

واختصار سريع: اسم الأمر وبعده [[-?]] (شرطة وعلامة استفهام)، زي [[Copy-Item -?]]، بيعرض نفس المساعدة المختصرة.`,
            when: "مش فاكر الـ parameter الصح. أو عايز مثال على استخدام معين.",
            mistakes: "إنك تدوّر في جوجل وتنسى إن المساعدة موجودة جوه PowerShell نفسه."
          },
          lines: [
            "أمثلة استخدام Copy-Item بس، من غير باقي الشرح.",
            "افتح الصفحة الرسمية في المتصفح، ودي دايمًا أحدث وأشمل."
          ],
          sol: R`على جهاز جديد (جربته على PowerShell 7.6 من غير ما أشغّل [[Update-Help]]) [[Get-Help Remove-Item -Examples]] مش بيطلع أي أمثلة. بيطلع الاسم والـ aliases بس ([[ri]] و [[rm]] و [[rmdir]] و [[del]] و [[erase]] و [[rd]])، وتحت [[REMARKS]] الجملة دي: [[Get-Help cannot find the Help files for this cmdlet on this computer. It is displaying only partial help.]]

يبقى الـ help مش متحمّل. عندك حلّين:
1. شغّل [[Update-Help]] مرة واحدة (في PowerShell 7 بيتحمّل لليوزر الحالي ومش محتاج أدمن، وفي 5.1 محتاج PowerShell كأدمن)، وبعدها [[-Examples]] هيطلع أمثلة مترقمة زي [[Example 1: Delete files that have any file name extension]]، وتحت كل مثال الأمر وشرحه، ومنها أمثلة فيها [[-Include]] و [[-Exclude]] و [[-Recurse]] و [[-Force]].
2. أو [[Get-Help Remove-Item -Online]] بيفتحلك نفس الأمثلة على Microsoft Learn من غير تحميل.

ولاحظ إن أي أمثلة مسح تقدر تجربها الأول بـ [[-WhatIf]]: بيقولك هيمسح إيه من غير ما يمسح.`
        },
        {
          cmd: "Get-Command",
          title: "دوّر على أمر",
          desc: R`لما تبقى عارف انت عايز تعمل إيه بس مش فاكر اسم الأمر، [[Get-Command]] بيدوّر في كل حاجة ممكن تتشغّل: cmdlets و functions و aliases والبرامج اللي في الـ PATH. النجمة [[*]] اسمها wildcard ومعناها «أي حروف بأي عدد»، فـ [[*process*]] يعني أي أمر اسمه فيه كلمة process في أي حتة.

وبما إن كل الأوامر بنظام Verb-Noun (الدرس اللي فات)، تقدر تدوّر بالجزئين: [[-Verb Get]] الأوامر اللي فعلها Get بس، و [[-Noun *Item*]] اللي الجزء التاني من اسمها فيه Item. فالسطر التاني بيجيب حاجات زي Get-Item و Get-ChildItem و Get-ItemProperty.

أقرب حاجة في bash هي [[compgen -c]] أو [[apropos]]. ونفس الأمر بيقولك برنامج زي node جاي منين على الجهاز (درس «البرنامج ده فين» في المستوى التاني). بس متشغّلهوش لوحده من غير أي كلمة، هيطبعلك آلاف الأوامر.`,
          example: R`Get-Command *process*
Get-Command -Verb Get -Noun *Item*`,
          try: "لاقي كل الأوامر اللي ليها علاقة بـ service.",
          deep: {
            why: R`بتدوّر على أوامر من غير ما تعرف اسمها بالظبط. زي [[which]] و [[apropos]] في لينكس مع بعض، بس بيفهم نظام Verb-Noun فبيخليك تخمّن صح.`,
            how: R`[[Get-Command]] بدون حاجة يعرض كل الأوامر (كتير). والأحسن مع [[*نص*]] بيدوّر. [[Get-Command Get-*]] يعرض كل الأوامر اللي بتبدأ بـ Get. [[Get-Command -Verb Get]] يعرض كل أوامر الجلب. [[-CommandType Function]] يعرض الـ functions بس.

ولما بتسأل «فين البرنامج ده؟»: [[Get-Command node]] بيقولك المسار الكامل.`,
            when: "مش فاكر الاسم الكامل. أو عايز تعرف كل الأوامر اللي بتتعامل مع خدمة معينة.",
            mistakes: "تكتب [[Get-Command]] بدون parameters وتغرق في آلاف الأوامر."
          },
          lines: ["أي أمر اسمه فيه process.", "الأوامر اللي فعلها Get واسمها فيه Item."],
          sol: R`[[Get-Command *service*]] على ويندوز هيطلع جدول [[CommandType  Name]] فيه الـ cmdlets: [[Get-Service]] و [[New-Service]] و [[Remove-Service]] و [[Restart-Service]] و [[Resume-Service]] و [[Set-Service]] و [[Start-Service]] و [[Stop-Service]] و [[Suspend-Service]] (ده في PowerShell 7.6؛ في 5.1 مفيش [[Remove-Service]] وبداله [[New-WebServiceProxy]])، ومعاهم functions زي [[Get-NetFirewallServiceFilter]]، وبرامج (Application) من الـ PATH اسمها فيه service زي [[services.msc]].

الأدق [[Get-Command -Noun Service]] لأنه بيجيب الأوامر اللي الاسم بتاعها Service بالظبط من غير البرامج الخارجية. لاحظ إن كل الأسامي بنفس نمط Verb-Noun، فلو عرفت [[Get-Service]] تقدر تخمّن [[Stop-Service]] من غير ما تدوّر. ولو [[*service*]] رجع حاجات غريبة من برامج متسطبة، دي مش cmdlets، بص على عمود CommandType.`
        },
        {
          cmd: "Get-Member",
          title: "اعرف الـ object ده جواه إيه",
          desc: R`أهم فكرة في PowerShell كله: الأوامر مش بترجع نص زي bash، بترجع objects. الـ object حاجة ليها خصائص (properties) زي [[Name]] و [[Length]] و [[LastWriteTime]]، وأفعال (methods) زي [[Kill()]] أو [[ToUpper()]]. [[Get-Member]] (اختصاره [[gm]]) بيوريك كل ده لأي object يوصله.

الخط الرأسي [[|]] اسمه pipe: بياخد ناتج الأمر اللي على الشمال ويدّيه للي على اليمين. فـ [[Get-Process | Get-Member]] معناها «هات العمليات الشغالة، واعرضلي جوّاها إيه». أول سطر في الناتج [[TypeName]] بيقولك نوع الـ object، وتحته جدول فيه Name و MemberType (Property أو Method).

في السطر التاني [[.\notes.txt]] يعني «ملف notes.txt في الفولدر اللي انا فيه» (النقطة هي الفولدر الحالي و [[\]] الفاصل)، و [[-MemberType Property]] بيعرض الخصائص بس من غير الـ methods. القاعدة: كل ما تحتاج تفلتر أو ترتب أو تطبع حاجة ومش عارف اسمها، اسأل Get-Member الأول بدل ما تخمّن.`,
          example: R`Get-Process | Get-Member
Get-Item .\notes.txt | Get-Member -MemberType Property`,
          try: R`اعرف الـ properties بتاعة أي ملف، وبعدين اطبع [[(Get-Item .\notes.txt).LastWriteTime]].`,
          deep: {
            why: "في PowerShell كل حاجة object، وأي object ليه properties وmethods. [[Get-Member]] بيقولك إيه المتاح.",
            how: R`[[Get-Process | Get-Member]] يوريك كل property وmethod لـ Process objects. الـ Properties هي المعلومات (Name، وId، وCPU). الـ Methods هي الأفعال (Kill()، وWaitForExit()).

ودي من أهم أوامر PowerShell: لو مش عارف ايه اللي تعمله بـ object، عمل [[| Get-Member]] وشوف. مثلًا [[Get-Date | Get-Member]] بيوريك كل حاجة تقدر تعملها بالتاريخ.`,
            when: "لما بتتعلم أمر جديد. أو لما مش عارف إزاي توصل لمعلومة معينة من object.",
            mistakes: R`تفضل تخمّن أسامي الخصائص ([[Size]] بدل [[Length]]، أو [[Date]] بدل [[LastWriteTime]])، و PowerShell مش بيطلع error على اسم غلط، بيرجع فاضي. وتنسى إن ناتج نفس الأمر ممكن يبقى أكتر من نوع: [[Get-ChildItem | Get-Member]] بيطلع جدولين، واحد لـ DirectoryInfo وواحد لـ FileInfo.`
          },
          lines: ["إيه الـ properties والـ methods اللي في object العملية.", "الـ properties بس لـ object ملف."],
          sol: R`[[Get-Item .\notes.txt | Get-Member -MemberType Property]] بيطلع [[TypeName: System.IO.FileInfo]] وتحته properties زي [[Attributes]] و [[CreationTime]] و [[DirectoryName]] و [[Extension]] و [[FullName]] و [[IsReadOnly]] و [[LastWriteTime]] و [[Length]] و [[Name]]. و [[(Get-Item .\notes.txt).LastWriteTime]] بيطبع تاريخ ووقت زي [[Wednesday, September 30, 2026 5:11:17 AM]] (الشكل بيختلف حسب لغة ويندوز).

الـ TypeName هو المفتاح: FileInfo للملف و DirectoryInfo للفولدر، فالفولدر مفيهوش [[Length]] مثلًا. ولو ظهرلك [[Cannot find path]]، الملف مش موجود في الفولدر اللي انت واقف فيه: اعمله الأول بـ [[New-Item notes.txt]]. ولو كتبت [[Get-Item .\notes.txt.LastWriteTime]] من غير أقواس هيدوّر على ملف بالاسم ده كله، الأقواس هي اللي بتقول «نفّذ الأول وبعدين هات الـ property».`
        },
        {
          cmd: "رموز PowerShell",
          title: "كل رمز في PowerShell معناه إيه",
          desc: R`أغلب اللي بيخوّف في أكواد PowerShell رموز. دي كلها في مكان واحد (والرموز العامة اللي مشتركة مع bash و CMD في تاب «الرموز»):

[[$]] قبل أي اسم يبقى متغير ([[$name]]). [[|]] الـ pipe: ناتج الشمال يروح لليمين كـ objects. [[$_]] (أو [[$PSItem]]) جوه أي [[{ }]] في pipeline معناه «العنصر الحالي». [[{ }]] اسمها script block: كود بيتنفذ بعدين أو لكل عنصر. [[( )]] نفّذ الجوّاني الأول وخد ناتجه، زي [[(Get-Date).Year]]، وكمان حوالين الشرط في [[if]].

[[@( )]] array، و [[@{ }]] hashtable (مفاتيح وقيم). [[[ ]]] ليها معنيين: رقم عنصر [[$list[0]]]، أو اسم نوع [[[int]"41"]] (حوّل لرقم). و [[::]] بعد نوع بتنادي حاجة جاهزة جواه زي [[[math]::Round()]]. و [[..]] بين رقمين range ([[1..5]]).

[[?]] اختصار Where-Object و [[%]] اختصار ForEach-Object، فـ [[? Length -gt 1KB | % Name]] معناها «الملفات اللي أكبر من كيلو، واطبع أساميها». [[;]] بتفصل أمرين على نفس السطر. [[#]] تعليق لآخر السطر، و [[<# ... #>]] تعليق على كذا سطر. و [[.\]] الفولدر الحالي، ولازمة قبل اسم سكربت عشان يشتغل. و [[&]] شغّل اللي بعدي (درس & في المستوى التاني).

وأهمهم الـ backtick (الحرف اللي تحت Esc): ده الـ escape بتاع PowerShell مش [[\]]، وفي آخر السطر معناه «الأمر مكمّل تحت»، ولازم يبقى آخر حرف بالظبط من غير مسافة بعده. والمقارنة بكلمات زي [[-gt]] و [[-eq]] مش [[>]] و [[==]]، لأن [[>]] و [[>>]] للكتابة في ملف زي bash.`,
          example: R`$name = "Ali"
Get-ChildItem | Where-Object { $_.Length -gt 1KB }
Get-ChildItem | ? Length -gt 1KB | % Name
$list = @("web", "api")
$user = @{ name = "Ali"; role = "dev" }
[int]"41" + 1
(Get-Date).Year
"a"; "b"
Get-ChildItem -Path . $__bt
    -Filter *.json`,
          try: R`اكتب [[Get-ChildItem | ? Length -gt 1KB | % Name]] وبعدين نفس الأمر بالأسامي الكاملة من غير أي اختصار. وجرّب [["5" + 1]] و [[[int]"5" + 1]].`,
          flag: "script",
          deep: {
            why: R`هتنسخ أكواد من Stack Overflow ومن الـ docs فيها [[% {$_}]] و [[@{}]] و [[[math]::]] و backtick في آخر السطر. لو مش عارف كل رمز معناه إيه، الكود هيبان سحر، وأي تعديل صغير هيبوّظه.`,
            how: R`الفرق بين الأقواس هو أكتر حاجة بتلخبط:
[[( )]] قوسين عاديين: «نفّذ ده الأول». [[(Get-Item x).Length]] من غير الأقواس هيدوّر على ملف اسمه x.Length.
[[$( )]] نفس الفكرة بس جوه نص بين double quotes: [["Total: $($list.Count)"]] (درس النصوص).
[[@( )]] «خلّي الناتج array دايمًا» حتى لو عنصر واحد أو مفيش.
[[{ }]] كود مش بيتنفذ دلوقتي، بيتنفذ لما الأمر اللي واخده يقرر (لكل عنصر في Where-Object، أو جوه if لو الشرط صح).
[[@{ }]] hashtable: [[@{ key = value; key2 = value2 }]].
[[[ ]]] على متغير: index. لوحدها قبل حاجة: نوع ([[[string]]] و [[[int]]] و [[[datetime]]] و [[[xml]]]).

[[$_]] موجودة بس جوه [[{ }]] في الـ pipeline (ForEach-Object و Where-Object و Sort-Object { } و Rename-Item -NewName { }) وفي catch و switch. بره ده فاضية.

الـ backtick: في آخر سطر بيكمّل الأمر، وجوه نص بين double quotes بيعمل حروف خاصة: [[$__btn]] سطر جديد و [[$__btt]] tab و [[$__bt"]] علامة تنصيص. ومش محتاجه بعد [[|]] في آخر السطر، الـ pipe بيكمّل لوحده.

[[%]] و [[?]] كمان ليهم معنى تاني: [[%]] باقي القسمة ([[10 % 3]] بيطلع 1) لما يبقى بين رقمين، و [[?]] wildcard لحرف واحد جوه مسار ([[file?.txt]]). PowerShell بيعرف من المكان.

وفيه رموز مقارنة ملهاش رمز خالص: كلها كلمات بشرطة ([[-eq]] [[-like]] [[-match]] [[-and]] [[-not]])، ودرس «عوامل المقارنة» في المستوى التالت بيشرحهم.`,
            when: "كل ما تقرا كود حد تاني أو مثال من النت. والاختصارات زي [[%]] و [[?]] كويسة في الترمنال، لكن في السكربتات اكتب الأسامي الكاملة عشان اللي بعدك يفهم.",
            mistakes: R`مسافة بعد الـ backtick في آخر السطر فالأمر يتقطع والسطر اللي تحته يتنفذ لوحده. أو [[\n]] جوه نص زي bash بدل backtick n. أو [[$_]] بره الـ [[{ }]]. أو [[@{}]] مكان [[@()]]. أو [[if ($a > 5)]] اللي بتعمل ملف اسمه 5 (درس if / switch).`
          },
          lines: [
            "[[$]] متغير، و [[=]] بتحط فيه قيمة.",
            "[[|]] pipe، و [[{ }]] كود لكل عنصر، و [[$_]] العنصر الحالي، و [[1KB]] رقم جاهز (1024).",
            "نفس الفكرة بالاختصارات: [[?]] هي Where-Object و [[%]] هي ForEach-Object.",
            "[[@( )]] array.",
            "[[@{ }]] hashtable، و [[;]] بين العناصر.",
            "[[[int]]] حوّل النص لرقم قبل الجمع: 42.",
            "[[( )]] نفّذ الأول وبعدين خد الخاصية Year.",
            "[[;]] أمرين على سطر واحد.",
            "الـ backtick في آخر السطر: الأمر مكمّل تحت...",
            "...وده آخره."
          ],
          sol: R`[[Get-ChildItem | ? Length -gt 1KB | % Name]] طبع أسامي الملفات اللي أكبر من 1024 بايت، كل اسم في سطر (عندي طبع [[big.bin]] بس). والنسخة الكاملة [[Get-ChildItem | Where-Object Length -gt 1KB | ForEach-Object Name]] طبعت نفس الحاجة بالظبط. وفي المثال نفسه [[[int]"41" + 1]] طبع [[42]] و [[(Get-Date).Year]] طبع السنة.

[["5" + 1]] طبع [[51]]: الشمال نص فالـ [[+]] لزق. و [[[int]"5" + 1]] طبع [[6]]. القاعدة دي (نوع الشمال هو اللي بيحدد) مشروحة في «عوامل المقارنة». جربت كل ده على PowerShell 7.6 و 5.1 والناتج واحد.`
        }
      ]
    },
    {
      t: "التنقل",
      l: 1,
      n: "",
      items: [
        {
          cmd: "Set-Location",
          title: "اتنقل (cd)",
          desc: R`[[Set-Location]] بيغيّر الفولدر اللي انت واقف فيه، وكل المسارات النسبية بعد كده بتتحسب منه. اختصاره [[cd]] (و [[sl]] و [[chdir]])، فاللي متعود عليه من bash أو CMD هيشتغل. و [[Get-Location]] (اختصاره [[pwd]]) بيطبع انت فين.

الرموز: [[..]] الفولدر اللي فوق، و [[~]] فولدرك الشخصي ([[C:\Users\اسمك]])، و [[\]] لوحدها جذر الدرايف ([[C:\]]). وPowerShell بيقبل [[/]] كمان، فـ [[cd C:/Users]] شغالة. وعكس CMD، [[cd D:\projects]] بتنقلك للدرايف التاني والفولدر في خطوة واحدة من غير [[/d]].

المسار اللي فيه مسافات لازم بين علامات تنصيص: [[cd "C:\Program Files"]]. وفي PowerShell 7 [[cd -]] بترجعك للفولدر اللي كنت فيه زي bash، لكن في 5.1 مش موجودة، والبديل Push-Location في الدرس اللي بعد الجاي.`,
          example: R`Set-Location C:\Users
cd D:\projects
cd ~
Get-Location`,
          try: "روح لأي درايف تاني وارجع الـ home.",
          deep: {
            why: R`كل أمر بتكتبه بيشتغل «من» فولدر معين، والملفات اللي بتكتب اسمها من غير مسار كامل بيدوّر عليها هناك. فأول حاجة في أي شغل إنك تقف في المكان الصح. نفس [[cd]] و [[pwd]] في bash.`,
            how: R`[[Set-Location C:\]] و [[cd C:\]] نفس الحاجة. PowerShell بيفهم الـ backslash ([[C:\Users]]) والـ forward slash ([[C:/Users]]) الاتنين.

الرموز: [[~]] بيشاور على فولدرك الشخصي ([[C:\Users\YourName]])، و [[..]] الفولدر اللي فوق، و [[.]] الفولدر الحالي نفسه. في PowerShell 7 فيه [[cd -]] ترجعك للمكان اللي قبله و [[cd +]] تقدّمك تاني. في 5.1 مش موجودين، فاستخدم [[Push-Location]] و [[Pop-Location]].

PowerShell بيشوف أماكن تانية كأنها درايفات: مش بس [[C:]]، فيه [[Env:]] لمتغيرات البيئة و [[HKCU:]] للـ registry. فـ [[cd Env:]] وبعدها [[ls]] بيعرضلك المتغيرات كأنها ملفات. شوفهم كلهم بـ [[Get-PSDrive]].`,
            when: "التنقل بين فولدرات المشروع. والانتقال لفولدر مؤقت وبعدين الرجوع.",
            mistakes: R`المسارات اللي فيها مسافات لازم تتحط بين علامات تنصيص. والـ backslash مش escape في PowerShell (الـ escape هو الـ backtick)، فـ [["C:\new\test"]] سليمة.`
          },
          lines: [
            "روح للفولدر ده.",
            "نفس الحاجة بالاختصار، ولدرايف تاني على طول (مش زي CMD).",
            "فولدرك الشخصي.",
            "انت فين دلوقتي (زي pwd)."
          ],
          sol: R`[[cd D:\]] (أو [[D:]] لوحدها) الـ prompt هيبقى [[PS D:\>]]، و [[cd ~]] يرجعك [[C:\Users\ali]]، و [[Get-Location]] بيطبع جدول فيه [[Path]] وتحته المسار. ومش محتاج [[/d]] زي CMD، PowerShell بيغيّر الدرايف والفولدر مع بعض.

لو ظهر [[Cannot find drive. A drive with the name 'D' does not exist.]] يبقى الجهاز مفيهوش D، شوف الدرايفات الموجودة بـ [[Get-PSDrive -PSProvider FileSystem]]. ولو المسار فيه مسافات حطه بين علامات تنصيص: [[cd "C:\Program Files"]].`
        },
        {
          cmd: "Get-ChildItem",
          title: "اعرض الملفات (ls / dir)",
          desc: R`[[Get-ChildItem]] بيعرض اللي جوه فولدر، زي [[ls]] في bash و [[dir]] في CMD، والاتنين شغالين كاختصار له (ومعاهم [[gci]]). من غير أي إضافة بيعرض الفولدر الحالي، وكل سطر فيه Mode (حروف زي [[d]] للفولدر و [[a]] للملف) و LastWriteTime و Length (الحجم بالبايت) و Name.

الإضافات اللي في المثال: [[-Force]] يعرض الملفات المخفية كمان (زي [[ls -a]])، و [[-Recurse]] يدخل جوه كل الفولدرات الفرعية، و [[-Filter *.js]] ياخد الأسامي اللي بتخلص بـ .js بس (النجمة يعني أي حروف)، و [[-Directory]] الفولدرات بس، وعكسه [[-File]] الملفات بس.

خلي بالك إن الناتج objects مش نص، فتقدر تبعته بـ [[|]] لأوامر زي Sort-Object و Where-Object (المستوى التاني). وأوعى تعمل [[-Recurse]] على فولدر كبير زي node_modules أو [[C:\]] من غير [[-Filter]]، هيطبع آلاف السطور ويعلّق شوية.`,
          example: R`Get-ChildItem
Get-ChildItem -Force
Get-ChildItem -Recurse -Filter *.js
Get-ChildItem -Directory`,
          try: "اعرض كل ملفات .json في مشروع عندك من غير فولدرات.",
          deep: {
            why: R`قبل ما تعمل أي حاجة في فولدر لازم تعرف فيه إيه: ملفات إيه، حجمها قد إيه، اتعدلت إمتى. وده أكتر أمر هتكتبه، زي ls في bash.`,
            how: R`[[Get-ChildItem]] أو [[ls]] أو [[dir]] كلهم شغالين. بيرجع objects مش نص، فتقدر تفلتر عليها بعدين.

[[-Recurse]] (أو [[-r]]) بيدخل جوه كل الفولدرات الفرعية. [[-Filter *.js]] أسرع من Where-Object لأنه بيستخدم Windows file filtering. [[-Force]] بيوري الملفات المخبّية. [[-Name]] بيرجع الأسامي بس بدل objects كاملة.

ومفيد جدًا: [[ls | Sort-Object Length -Descending | Select-Object -First 10]] أكبر ١٠ ملفات.`,
            when: "عرض الملفات. إيجاد ملفات بامتداد معين. ترتيب الملفات بالحجم.",
            mistakes: "استخدام [[-Recurse]] من غير [[-Filter]] على فولدر كبير فيعلق."
          },
          lines: [
            "محتوى الفولدر الحالي.",
            "مع المخفي ([[-Force]] هنا زي [[-a]]).",
            "كل ملفات .js في كل الفولدرات الفرعية. [[-Filter]] أسرع من Where-Object.",
            "الفولدرات بس."
          ],
          sol: R`الحل: [[Get-ChildItem -File -Filter *.json]] في فولدر المشروع. هتلاقي حاجات زي [[package.json]] و [[package-lock.json]] و [[tsconfig.json]]، كل واحد في سطر فيه Mode (زي [[-a---]]) و LastWriteTime و Length و Name، ومفيش ولا فولدر لأن [[-File]] شالهم.

لو زودت [[-Recurse]] هيدخل node_modules ويطلعلك آلاف الملفات، فلو عايز الفولدرات الفرعية فلتر بعدها: [[Get-ChildItem -Recurse -File -Filter *.json | Where-Object FullName -notmatch 'node_modules']]. ولو استخدمت [[-Include *.json]] من غير [[-Recurse]] ممكن ميرجعش حاجة خالص، [[-Filter]] هو الأسرع والأبسط هنا.`
        },
        {
          cmd: "Push-Location",
          title: "احفظ مكانك وارجعله",
          desc: R`[[Push-Location]] (اختصاره [[pushd]]) بيحفظ الفولدر اللي انت فيه في «stack» وبعدين ينقلك للمكان الجديد. و [[Pop-Location]] (اختصاره [[popd]]) بيرجعك لآخر مكان اتحفظ. الـ stack زي رصّة أطباق: آخر حاجة حطيتها هي أول حاجة بتشيلها، فلو عملت push مرتين، أول pop يرجعك للمكان التاني مش الأول.

الفايدة الحقيقية في السكربتات: السكربت يدخل فولدر، يعمل شغله، ويرجّع الترمنال مكان ما كان. ده مهم لأن [[cd]] جوه سكربت PowerShell بيغيّر مكان الترمنال نفسه حتى بعد ما السكربت يخلص (عكس bash). نفس الأوامر موجودة في bash و CMD بنفس الاسم [[pushd]] و [[popd]].

و [[Get-Location -Stack]] بيوريك الأماكن المحفوظة. ولو السكربت ممكن يقع في النص، حط الـ Pop جوه [[finally]] (درس try / catch) عشان يرجع في كل الأحوال.`,
          example: R`Push-Location C:\Windows
Pop-Location`,
          try: "اعمل pushd لفولدرين ورا بعض وبعدين popd مرتين.",
          deep: {
            why: R`محتاج تروح فولدر تعمل فيه حاجة وترجع مكانك بالظبط، من غير ما تفتكر كنت فين. مفيد جدًا في السكربتات اللي بتلف على كذا مشروع.`,
            how: R`[[Push-Location]] بيحفظ موقعك الحالي في stack ثم بيروح للمكان الجديد. [[Pop-Location]] يرجعك للمكان المحفوظ.

تقدر تعمل Push كذا مرة وتبني stack. Pop يرجعك مرة مرة بالترتيب.

وفيه alias: [[pushd]] = Push-Location، و[[popd]] = Pop-Location.`,
            when: "سكربت محتاج يدخل فولدر، يعمل حاجة، ويرجع. أو بتشتغل على مشاريع متعددة وبترجع لمشروعك الأصلي.",
            mistakes: R`تعمل Push في سكربت والسكربت يقع في النص قبل الـ Pop، فالترمنال يفضل واقف في فولدر غريب. حط الـ Pop جوه [[finally]]: [[Push-Location app; try { npm run build } finally { Pop-Location }]]. أو تعمل pop أكتر من الـ push وتستغرب إن مفيش حاجة حصلت.`
          },
          lines: ["احفظ مكاني وروح لـ Windows.", "ارجعني للمكان المحفوظ."],
          sol: R`جربتها في PowerShell 7.6 و 5.1: [[Push-Location C:\Windows]] وبعدين [[Push-Location C:\Users]]. [[Get-Location -Stack]] وراني المكانين المحفوظين ([[C:\Windows]] وتحته الفولدر اللي بدأت منه)، وأول [[Pop-Location]] رجعني [[C:\Windows]] (المكان اللي كنت فيه قبل آخر push)، والتاني رجعني للفولدر اللي بدأت منه.

يعني الـ stack بيرجعك بالعكس: آخر حاجة اتحفظت أول حاجة ترجعلها. [[pushd]] نفسه مش بيطبع حاجة، وده طبيعي. ولو عملت [[popd]] زيادة مرة تالتة مش هيحصل حاجة (مفيش error، مفيش مكان يرجعله)، ففي السكربت اعمل pop بعدد الـ push بالظبط.`
        }
      ]
    },
    {
      t: "ملفات وفولدرات",
      l: 1,
      n: "",
      items: [
        {
          cmd: "New-Item",
          title: "اعمل ملف أو فولدر",
          desc: R`[[New-Item]] بيعمل ملف أو فولدر جديد، زي [[touch]] و [[mkdir]] في bash. الافتراضي ملف فاضي، ولو عايز فولدر لازم [[-ItemType Directory]]. واختصاراته [[ni]]، و [[mkdir]] (وده بيعمل فولدر على طول من غير ItemType).

[[lab\app\src]] مسار فيه فولدرات جوه بعض، و [[-Force]] هنا بتعمل كل الفولدرات اللي في السكة لو مش موجودة (زي [[mkdir -p]])، ومش بتطلع error لو الفولدر موجود أصلًا. و [[-Value "PORT=3000"]] بيحط محتوى في الملف وهو بيتعمل. والأسامي اللي بتبدأ بنقطة زي [[.env]] عادية على ويندوز ومش مخفية.

تحذير: [[-Force]] مع ملف (مش فولدر) موجود بتفضّيه وتكتب فوقه من غير سؤال. ومن غير [[-Force]]، لو الملف موجود هيطلع error «already exists»، وده في صالحك. وكل New-Item بيطبع سطر بالحاجة اللي اتعملت، ففي السكربتات بيتكتب بعده [[| Out-Null]] عشان يخفيه.`,
          example: R`New-Item -ItemType Directory lab\app\src -Force
New-Item index.js
New-Item .env -Value "PORT=3000"
mkdir logs`,
          try: R`اعمل [[app\src]] و [[app\public]] وملف [[app\src\server.js]].`,
          deep: {
            why: R`أي مشروع أو سكربت بيبدأ بهيكل: فولدرات src و logs، وملفات .env و README. New-Item بيعمل الاتنين، ومع [[-Force]] بيعمل المسار كله مرة واحدة.`,
            how: R`[[-ItemType File]] لملف أو [[-ItemType Directory]] لفولدر. [[-Force]] بيعمل الفولدرات الوسيطة لو مش موجودة (زي [[mkdir -p]] في bash).

[[New-Item -ItemType File .env]] بيعمل ملف فاضي. [[-Value]] بتحط محتوى مباشرة.

ملف على طريق مش موجود: لو عملت [[New-Item C:\projects\new\file.txt]] والـ new مش موجود، هيفشل. استخدم [[-Force]] أو اعمل الفولدر الأول.`,
            when: "إعداد هيكل مشروع جديد. سكربتات بتعمل ملفات إعدادات.",
            mistakes: R`تنسى [[-ItemType Directory]] فيتعمل ملف فاضي اسمه src بدل فولدر، وبعدها أي حاجة تحاول تكتب جواه تفشل. أو تستخدم [[-Force]] على ملف فيه بيانات فتفضّيه. أو تعمل ملف في فولدر مش موجود من غير [[-Force]] فيطلع [[Could not find a part of the path]].`
          },
          lines: [
            "اعمل فولدر بالفولدرات اللي في طريقه ([[-Force]] هنا زي [[mkdir -p]]).",
            "ملف فاضي (الافتراضي ملف).",
            "ملف بمحتوى على طول.",
            "الاختصار بيشتغل برضه."
          ],
          sol: R`[[New-Item -ItemType Directory app\src, app\public -Force]] بيعمل الفولدرين (ويعمل [[app]] نفسه في السكة)، وبعدين [[New-Item app\src\server.js]]. كل أمر بيطبع جدول تحت [[Directory: C:\...\app\src]] فيه Mode و LastWriteTime و Length (صفر للملف الجديد) و Name.

لو عملت الملف قبل الفولدر هتشوف [[Could not find a part of the path '...\app\src\server.js']]، لأن New-Item مش بيعمل الفولدرات الناقصة للملف إلا بـ [[-Force]]. ولو شغّلت نفس الأمر مرتين: [[The file '...\server.js' already exists.]] وده في صالحك، أما لو ضفت [[-Force]] على ملف موجود فهيفضّيه من غير ما يسأل.`,
          solCode: R`New-Item -ItemType Directory app\src, app\public -Force
New-Item app\src\server.js
Get-ChildItem app -Recurse | Select-Object FullName`
        },
        {
          cmd: "Copy-Item",
          title: "انسخ",
          desc: R`[[Copy-Item]] بينسخ ملفات وفولدرات، زي [[cp]] في bash و [[copy]] في CMD، واختصاراته [[cp]] و [[copy]] و [[cpi]]. الشكل: المصدر الأول وبعدين الهدف. لو الهدف اسم ملف جديد بيتعمل بالاسم ده (زي [[.env.example]] لـ [[.env]])، ولو الهدف فولدر موجود، النسخة بتتحط جوّاه.

في السطر التاني [[*.js]] يعني كل الملفات اللي بتخلص بـ .js، و [[backup\]] بالـ [[\]] في الآخر بتوضح إن ده فولدر (ولازم يكون موجود قبلها). وفي السطر التالت [[-Recurse]] لازمة مع الفولدرات: بتنسخ الفولدر بكل اللي جواه، زي [[cp -r]].

تحذيرين: من غير [[-Recurse]] PowerShell بيعمل فولدر فاضي ومن غير أي error، فتفتكر النسخ نجح. ولو الملف الهدف موجود، Copy-Item بيكتب فوقه من غير ما يسأل. جرّب الأول بـ [[-WhatIf]]: بيطبعلك هيعمل إيه من غير ما يعمله.`,
          example: R`Copy-Item .env.example .env
Copy-Item *.js backup\
Copy-Item src src_backup -Recurse`,
          try: "انسخ فولدر app كله لـ [[app_copy]].",
          deep: {
            why: R`نسخ ملفات وفولدرات: [[.env.example]] لـ [[.env]]، أو نسخة من فولدر قبل ما تجرّب فيه حاجة خطيرة. نفس cp في bash.`,
            how: R`[[Copy-Item source dest]]. [[-Recurse]] لازم مع الفولدرات. [[-Force]] يكتب فوق لو موجود.

والفرق عن bash cp: الهدف لو فولدر موجود، الملف بيتحط جواه. لو الهدف اسم ملف جديد، بينشئه باسمه. وده نفس السلوك العادي.

[[-WhatIf]] في PowerShell عمومًا بيقولك هيعمل إيه من غير ما يعمله فعلًا. مفيد جدًا للأوامر الخطيرة.`,
            when: "نسخ .env.example لـ .env. نسخ فولدر مشروع للتجربة.",
            mistakes: R`نسيان [[-Recurse]] مع الفولدرات: بيعمل الفولدر فاضي ومن غير error. وتشغيل نفس النسخ مرتين على فولدر: التانية بتتحط جوه الأولى ([[app_copy\app]]). وكمان Copy-Item بيكتب فوق الملفات الموجودة من غير سؤال، فجرّب بـ [[-WhatIf]] لو الهدف فيه حاجات مهمة.`
          },
          lines: ["انسخ ملف باسم جديد.", "انسخ كل .js لفولدر backup.", "انسخ فولدر بكل اللي جواه ([[-Recurse]])."],
          sol: R`[[Copy-Item app app_copy -Recurse]] مش بيطبع حاجة. اتأكد بـ [[Get-ChildItem app_copy -Recurse -Name]]، هتلاقي [[public]] و [[src]] و [[src\server.js]] زي الأصل بالظبط.

غلطتين شفتهم بعيني وأنا بجرب: من غير [[-Recurse]] PowerShell بيعمل [[app_copy]] فولدر فاضي ومن غير أي error، فتفتكر النسخ اشتغل. والتانية: لو شغّلت نفس الأمر مرة تانية و [[app_copy]] موجود، النسخة بتتحط جواه كـ [[app_copy\app]]. فامسح النسخة القديمة الأول أو انسخ المحتوى بـ [[Copy-Item app\* app_copy -Recurse]].`
        },
        {
          cmd: "Move-Item / Rename-Item",
          title: "انقل وغيّر الاسم",
          desc: R`[[Move-Item]] (اختصاره [[mv]] و [[move]]) بينقل ملف أو فولدر لمكان تاني، و [[Rename-Item]] (اختصاره [[ren]]) بيغيّر الاسم بس في نفس المكان. الفرق المهم: Rename-Item بياخد الاسم الجديد لوحده من غير مسار، و Move-Item بياخد مسار كامل. في bash الاتنين أمر واحد [[mv]].

وفي السطر الأول فولدر [[logs]] لازم يكون موجود قبلها: جربتها من غيره في 7 و 5.1، فأول ملف log اتنقل وبقى ملف اسمه [[logs]] (مش فولدر)، والتاني طلع [[Cannot create a file when that file already exists.]]. فاعمله الأول بـ [[New-Item -ItemType Directory logs -Force]].

السطر التالت هو القوة الحقيقية: [[Get-ChildItem *.txt]] بيجيب كل ملفات txt، والـ [[|]] بيبعتهم واحد واحد لـ Rename-Item. الأقواس المعقوفة [[{ }]] بعد [[-NewName]] اسمها script block، ودي كود صغير بيتنفذ لكل ملف لوحده. وجوّاه [[$_]] معناها «العنصر الحالي اللي جاي في الـ pipe»، يعني الملف ده بالذات، و [[$_.Name]] اسمه.

و [[-replace '\.txt$', '.md']] بيدوّر بـ regex ويبدّل: [[\.]] نقطة حقيقية (لأن النقطة لوحدها في regex معناها أي حرف)، و [[$]] يعني آخر الاسم. ولو الاسم الجديد موجود قبل كده هيطلع error للملف ده بس، فجرّب الأول بـ [[-WhatIf]].`,
          example: R`Move-Item *.log logs\
Rename-Item old.js new.js
Get-ChildItem *.txt | Rename-Item -NewName { $_.Name -replace '\.txt$', '.md' }`,
          try: "اعمل 3 ملفات txt وحوّلهم كلهم لـ md بالأمر الأخير.",
          deep: {
            why: R`تنظيم الملفات في فولدرات، وتغيير أسامي ملفات كتير مرة واحدة (امتداد، أو بادئة، أو مسافات). نفس mv في bash، بس مع الـ pipe بتعمل rename جماعي من غير لوب.`,
            how: R`[[Move-Item source dest]] للنقل. [[Rename-Item old new]] للتسمية (بس الاسم مش المسار الكامل).

الاتنين ممكن تتعملوا بـ Move-Item: [[Move-Item file.txt newname.txt]] بيغيّر الاسم لو في نفس الفولدر.

[[Rename-Item]] أوضح للتسمية. [[Move-Item]] أفضل للنقل لمكان تاني.`,
            when: "تنظيم الملفات. تغيير امتداد ملف.",
            mistakes: "Rename-Item بتاخد الاسم الجديد بس مش المسار كامل. Move-Item بتاخد المسار كامل."
          },
          lines: [
            "انقل كل .log لفولدر logs (لازم يكون موجود، وإلا أول ملف هيبقى ملف اسمه logs).",
            "غيّر اسم ملف.",
            "لكل ملف .txt: غيّر امتداده لـ .md. الـ [[-replace]] بتاخد regex، والدولار في الآخر يعني «نهاية الاسم»."
          ],
          sol: R`بعد [[1..3 | ForEach-Object { New-Item "n$_.txt" }]] والأمر الأخير، [[Get-ChildItem]] هيعرض [[n1.md]] و [[n2.md]] و [[n3.md]] ومفيش ولا txt. جربته فعلًا والأمر مبيطبعش حاجة، بيغيّر وبس.

الـ [[{ }]] بعد [[-NewName]] بيتنفذ لكل ملف لوحده و [[$_]] هو الملف الحالي. أشهر غلطة إنك تكتب [[-NewName "$_.Name -replace ..."]] بعلامات تنصيص بدل الأقواس: جربتها فطلع error لكل ملف ومفيش ولا ملف اتغير، لأن [[$_]] بره الـ [[{ }]] فاضي، فالاسم الجديد بقى نص غريب بيبدأ بـ [[.Name -replace]]. وخلي بالك إن [[-replace]] بياخد regex، عشان كده النقطة مكتوبة [[\.]] و [[$]] معناها آخر الاسم، فـ [[my.txt.bak]] مش هيتغير.`,
          solCode: R`1..3 | ForEach-Object { New-Item "n$_.txt" }
Get-ChildItem *.txt | Rename-Item -NewName { $_.Name -replace '\.txt$', '.md' }
Get-ChildItem *.md`
        },
        {
          cmd: "Remove-Item",
          title: "امسح",
          desc: R`[[Remove-Item]] بيمسح ملفات وفولدرات، زي [[rm]] في bash و [[del]] و [[rd]] في CMD، واختصاراته [[rm]] و [[del]] و [[ri]]. المسح نهائي: مفيش سلة محذوفات، ومفيش undo.

[[-Recurse]] لازمة مع فولدر فيه حاجات: بتمسح كل اللي جواه. من غيرها PowerShell بيسألك «The item has children... Are you sure?» وده في السكربت ممكن يوقفه مستنيك. و [[-Force]] بيمسح كمان الملفات المخفية والـ read-only اللي كان هيرفضها. فـ [[-Recurse -Force]] مع بعض هي [[rm -rf]].

أهم parameter هنا [[-WhatIf]]: بيطبع سطر «What if: Performing the operation...» لكل حاجة كان هيمسحها، ومش بيمسح أي حاجة. عادة مفيدة جدًا: اكتب الأمر بـ [[-WhatIf]]، اقرا القايمة، وبعدين شيلها وشغّله. والـ wildcards شغالة ([[Remove-Item *.log]])، فاتأكد إنك في الفولدر الصح بـ [[Get-Location]] قبل أي مسح بنجمة.`,
          example: R`Remove-Item notes.txt
Remove-Item node_modules -Recurse -Force -WhatIf
Remove-Item node_modules -Recurse -Force`,
          try: "امسح [[app_copy]] بـ [[-WhatIf]] الأول واقرا الناتج، وبعدين من غيرها.",
          flag: "danger",
          deep: {
            why: R`مسح node_modules وملفات مؤقتة ولوجات قديمة. وده أخطر أمر في التاب، لأن الغلطة فيه مبتترجعش.`,
            how: R`[[-Recurse]] للفولدرات. [[-Force]] للملفات المخفية أو المحمية. [[-WhatIf]] تجرّب من غير حذف فعلي.

على عكس bash rm، Remove-Item بيسأل تأكيد لو بتحذف فولدر فيه حاجات. [[-Recurse]] هو اللي بيوقف السؤال.

wildcard شغال: [[Remove-Item *.log]] يمسح كل ملفات .log.`,
            when: "حذف node_modules. تنضيف ملفات مؤقتة.",
            mistakes: R`[[Remove-Item C:\Windows -Recurse -Force]] ده يمسح كل شئ، مفيش undo. استخدم -WhatIf الأول.`
          },
          lines: [
            "امسح ملف.",
            "جرّب مسح node_modules من غير ما تمسح فعلًا ([[-WhatIf]] يطبع هيعمل إيه).",
            "امسحه فعلًا: بكل اللي جواه ([[-Recurse]]) ومن غير أسئلة ([[-Force]])."
          ],
          sol: R`مع [[-WhatIf]] هتشوف سطر زي [[What if: Performing the operation "Remove Directory" on target "C:\lab\app_copy".]] والفولدر لسه موجود ([[Test-Path app_copy]] يرجع True). من غير [[-WhatIf]] الأمر مش بيطبع حاجة، و [[Test-Path app_copy]] يرجع False.

لو شغلته تاني بعد ما اتمسح هيقولك [[Cannot find path '...\app_copy' because it does not exist.]] وده معناه إنه اتمسح فعلًا مش إن فيه مشكلة. ولو نسيت [[-Recurse]] على فولدر فيه ملفات، PowerShell هيسألك «The item has children... Are you sure?» في الترمنال، وفي السكربت ده ممكن يوقفه مستنيك. ومفيش Recycle Bin هنا، اللي اتمسح راح.`
        },
        {
          cmd: "Test-Path",
          title: "الملف ده موجود؟",
          desc: R`[[Test-Path]] بيسأل سؤال واحد: المسار ده موجود ولا لأ؟ وبيرجع [[True]] أو [[False]] بس، من غير أي error لو مش موجود. عشان كده هو الأساس في أي سكربت قبل ما يقرا ملف أو يمسح فولدر. في bash المقابل [[[ -e .env ]]] وفي CMD [[if exist .env]].

السطر التاني فيه أول [[if]] هتشوفه: الشرط بين أقواس هلالية [[( )]]، والكود اللي هيتنفذ بين أقواس معقوفة [[{ }]]، و [[else]] اللي يتنفذ لو الشرط False. والنص لوحده بين علامات تنصيص ([["found"]]) بيتطبع على طول، من غير echo.

وتقدر تحدد النوع: [[-PathType Leaf]] يعني ملف بس، و [[-PathType Container]] يعني فولدر بس. والمسار اللي فيه مسافات حطه بين علامات تنصيص. وللعكس استخدم [[-not]]: [[if (-not (Test-Path logs)) { mkdir logs }]].`,
          example: R`Test-Path .env
if (Test-Path .env) { "found" } else { "missing" }`,
          try: "اختبر ملف موجود وملف مش موجود.",
          deep: {
            why: "تتأكد إن ملف أو فولدر موجود قبل ما تعمل حاجة. مش هيطلع error، هيرجع True أو False.",
            how: R`[[Test-Path "C:\file.txt"]] بيرجع [[True]] أو [[False]]. [[-PathType Container]] بيتأكد إنه فولدر. [[-PathType Leaf]] بيتأكد إنه ملف.

في السكربتات: [[if (Test-Path $file) { ... }]]. بدل ما تجرّب وتمسك الـ error.`,
            when: "في أي سكربت قبل ما يتعامل مع ملف. تتأكد إن .env موجود قبل التشغيل.",
            mistakes: R`تنسى علامات التنصيص حوالين مسار فيه مسافات. أو تفتكر [[Test-Path]] بيقولك إن الملف «سليم» أو «تقدر تقراه»: هو بيقول موجود بس. أو تكتب [[if (Test-Path $file -eq $false)]] بدل [[if (-not (Test-Path $file))]]، فـ [[-eq]] تتبعت لـ Test-Path كأنها parameter وتطلع error.`
          },
          lines: ["الملف موجود؟ True أو False.", "نفس السؤال جوه شرط."],
          sol: R`[[Test-Path app]] (موجود) رجّع [[True]] و [[Test-Path nope.txt]] رجّع [[False]]، والسطر التاني في المثال طبع [[missing]] عشان مكانش عندي .env.

خد بالك إن [[Test-Path]] مش بيطلع error أبدًا لو الملف مش موجود، بيرجع False وبس، وده اللي مخليه مناسب لـ [[if]]. ولو عايز تفرق بين ملف وفولدر استخدم [[-PathType Leaf]] للملف و [[-PathType Container]] للفولدر: [[Test-Path app -PathType Leaf]] هترجع False لأن app فولدر.`
        },
        {
          cmd: "Get-Item",
          title: "بيانات ملف واحد",
          desc: R`[[Get-Item]] بيجيب object واحد لملف أو فولدر بكل بياناته (من غير محتواه، المحتوى ده شغل Get-Content). أهم الخصائص: [[Length]] الحجم بالبايت، و [[LastWriteTime]] آخر تعديل، و [[CreationTime]] وقت الإنشاء، و [[Extension]] الامتداد، و [[FullName]] المسار الكامل.

الأقواس الهلالية في [[(Get-Item .\app.log).Length]] معناها «نفّذ الأمر ده الأول، وبعدين خد من الناتج الخاصية دي». من غير الأقواس PowerShell هيعتبر [[.Length]] جزء من اسم الملف. وفي السطر التالت [[Format-List *]] بيعرض كل الخصائص في قايمة، كل خاصية في سطر، والنجمة يعني «كلهم» بدل الكام عمود اللي بيظهروا افتراضيًا.

في bash أقرب حاجة [[stat app.log]]. والحجم تقدر تحوّله على طول: [[(Get-Item .\app.log).Length / 1KB]] بالكيلو، لأن [[1KB]] و [[1MB]] أرقام جاهزة في PowerShell. وخلي بالك: الفولدر مفيهوش Length، حجمه بيتحسب بـ Measure-Object (المستوى التاني).`,
          example: R`(Get-Item .\app.log).Length
(Get-Item .\app.log).LastWriteTime
Get-Item .\app.log | Format-List *`,
          try: "اعرف حجم وتاريخ آخر تعديل لأي ملف.",
          deep: {
            why: "جلب object يمثّل ملف أو فولدر بكل properties بتاعته: الحجم، وتاريخ الإنشاء، والامتداد.",
            how: R`[[Get-Item "file.txt"]] بيرجع object بيه [[Length]] (الحجم)، و[[CreationTime]]، و[[LastWriteTime]]، و[[Extension]]، وغيرهم.

بعد ما تجيب الـ object تقدر تستخدم properties: [[(Get-Item "file.txt").Length]] يجيب الحجم بالبايت.

[[Get-ItemProperty]] بتاخد properties من الـ registry أو من الملفات كـ key-value.`,
            when: "تعرف آخر تعديل على ملف. تجيب الحجم. تستخدم metadata في سكربت.",
            mistakes: "الخلط بينه وبين Get-Content. Get-Item بيجيب معلومات الملف، Get-Content بيجيب محتواه."
          },
          lines: [
            "حجم الملف بالبايت. الأقواس عشان تاخد الـ object الأول وبعدين تقرا منه property.",
            "آخر تعديل.",
            "كل الـ properties بتاعته في قايمة."
          ],
          sol: R`[[(Get-Item .\app.log).Length]] بيرجع رقم بالبايت زي [[1532]]، و [[.LastWriteTime]] بيرجع التاريخ والوقت. ولو عايز الحجم بالكيلو: [[(Get-Item .\app.log).Length / 1KB]].

لو جربتها على فولدر هتلاقي [[.Length]] مبيرجعش حاجة، لأن الفولدر (DirectoryInfo) مفيهوش Length، حجمه لازم يتحسب بـ Measure-Object (درس Measure-Object). ولو الملف بيبدأ بنقطة زي [[.env]] على لينكس أو الماك، [[Get-Item]] مش هيلاقيه إلا بـ [[-Force]] لأنه مخفي هناك، أما على ويندوز النقطة مش بتخفي حاجة.`
        }
      ]
    },
    {
      t: "قراءة وكتابة الملفات",
      l: 1,
      n: "",
      items: [
        {
          cmd: "Get-Content",
          title: "اقرا الملف (cat / tail)",
          desc: R`[[Get-Content]] بيقرا ملف ويطبعه، زي [[cat]] في bash و [[type]] في CMD، واختصاراته [[cat]] و [[gc]] و [[type]]. الناتج مش نص واحد: ده array، كل سطر عنصر لوحده، فـ [[(Get-Content app.log).Count]] بيرجع عدد السطور (الأقواس بتنفّذ الأول وبعدين [[.Count]] بتعدّ).

الإضافات: [[-Tail 20]] آخر ٢٠ سطر بس (زي [[tail -n 20]])، و [[-Wait]] بيفضل فاتح الملف ويطبع أي سطر جديد يتضاف (زي [[tail -f]]) لحد ما تدوس Ctrl+C، و [[-TotalCount 5]] أول ٥ سطور (زي head). و [[-Raw]] بيقرا الملف كله كنص واحد بدل array، ودي اللي محتاجها مع JSON (الدرس اللي بعد الجاي).

مع لوج كبير متعملش [[-Wait]] لوحدها، هيطبع الملف كله الأول. استخدم [[-Tail 5 -Wait]] زي السطر التالت. ولو العربي طالع رموز غريبة في 5.1، حدد الترميز: [[-Encoding utf8]].`,
          example: R`Get-Content package.json
Get-Content app.log -Tail 20
Get-Content app.log -Tail 5 -Wait
(Get-Content app.log).Count`,
          try: R`في نافذة [[Get-Content app.log -Wait]]، وفي نافذة تانية [[Add-Content app.log "hello"]].`,
          deep: {
            why: R`قراية ملف هي أكتر حاجة بتعملها بعد ls: تشوف .env، أو config، أو آخر سطور في لوج وقع فيه السيرفر. Get-Content بيعمل شغل cat و head و tail و tail -f في أمر واحد.`,
            how: R`[[Get-Content file.txt]] بيرجع array من السطور. كل سطر object منفصل (String).

[[-Tail 20]] آخر ٢٠ سطر (زي tail -n). [[-Wait]] بيفضل يراقب الملف وياخد السطور الجديدة (زي tail -f).

[[Get-Content file.json | ConvertFrom-Json]] بيقرا JSON مباشرة لـ object.

[[Get-Content]] بيحمّل الملف كله في الذاكرة. للملفات الضخمة: [[Switch -File]] أسرع.`,
            when: "قراية .env. قراية config.json. مراقبة لوج.",
            mistakes: "تستخدمه على لوج ضخم بـ -Wait وتحمّله كله. استخدم -Tail مع -Wait."
          },
          lines: [
            "اطبع الملف كله (زي cat).",
            "آخر ٢٠ سطر (زي tail).",
            "آخر ٥ سطور وتابع اللي جاي (زي tail -f). Ctrl+C يوقف.",
            "عدد السطور، لأن Get-Content بيرجع array وكل سطر عنصر."
          ],
          sol: R`في النافذة الأولى [[Get-Content app.log -Wait]] هيطبع محتوى الملف الموجود ويفضل مستني. أول ما تكتب [[Add-Content app.log "hello"]] في النافذة التانية، هتلاقي [[hello]] ظهرت في الأولى خلال ثانية تقريبًا. تخرج من المتابعة بـ Ctrl+C.

لو الملف كبير ضيف [[-Tail 5]] عشان ميطبعش كل اللي فيه الأول. ولو مظهرش حاجة، اتأكد إن النافذتين واقفين في نفس الفولدر (الاسم نسبي)، بـ [[Get-Location]] في الاتنين.`
        },
        {
          cmd: "Set-Content / Add-Content",
          title: "اكتب في ملف",
          desc: "Set-Content بيكتب من الأول، Add-Content بيضيف. [[>]] و [[>>]] شغالين برضه. في PowerShell 7 كله UTF-8 عادي. في Windows PowerShell 5.1 القديم [[>]] بتكتب UTF-16، وحتى [[-Encoding utf8]] بتحط علامة BOM مخفية في أول الملف، والاتنين ممكن يبوّظوا ملفات .env مع Node. الحل الأنضف: استخدم PowerShell 7 (أول أمر في الأساسيات).",
          example: R`Set-Content .env "PORT=3000" -Encoding utf8
Add-Content .env "NODE_ENV=development"
Get-Process | Out-File procs.txt -Encoding utf8`,
          try: "اعمل .env بسطرين واعرضه.",
          deep: {
            why: R`سكربتات كتير بتكتب ملفات: .env لمشروع جديد، أو لوج، أو ناتج أمر عايز تحفظه. والكتابة على ويندوز فيها فخ الترميز (UTF-16 و BOM) اللي بيبوّظ ملفات بتقراها أدوات تانية، فلازم تعرف الأمر بيكتب إزاي.`,
            how: R`[[Set-Content]] بيكتب ويمسح اللي كان (زي [[>]]). [[Add-Content]] بيضيف في الآخر (زي [[>>]]).

الـ encoding الافتراضي بيفرق: في 5.1 [[Set-Content]] بيكتب ANSI و [[>]] بيكتب UTF-16، وفي PowerShell 7 الاتنين UTF-8 من غير BOM. [[-Encoding UTF8]] صريح. [[-Encoding ASCII]] لملفات تانية ممكن تحتاجها.

[[Out-File]] بديل: بتاخد output من pipeline وتكتبه.`,
            when: "سكربت بيكتب .env. حفظ ناتج أمر في ملف.",
            mistakes: "Set-Content مع [[-Encoding UTF8]] على ويندوز القديم بيحط BOM في الأول. استخدم [[-Encoding UTF8NoBOM]] مع PowerShell 7."
          },
          lines: [
            "اكتب في الملف ويمسح القديم (زي [[>]]). [[-Encoding utf8]]: في PowerShell 7 من غير BOM، لكن في 5.1 بيحط BOM في أول الملف.",
            "ضيف سطر في الآخر (زي [[>>]]).",
            "ودّي ناتج أمر لملف بدل الشاشة."
          ],
          sol: R`[[Set-Content .env "PORT=3000"]] وبعدين [[Add-Content .env "NODE_ENV=development"]] وبعدين [[Get-Content .env]] بيطبع السطرين: [[PORT=3000]] و [[NODE_ENV=development]]. و [[(Get-Content .env).Count]] يرجع [[2]].

لو لقيت سطر واحد بس، يبقى استخدمت Set-Content في المرتين فالتانية كتبت فوق الأولى. ولو انت على PowerShell 7 الملف UTF-8 من غير BOM (أنا فحصت أول بايتات الملف فطلعوا حروف PORT على طول). أما في 5.1، [[-Encoding utf8]] بيحط 3 بايتات BOM في الأول، وساعات مكتبة .env تقرا أول مفتاح على إنه مش PORT، فيبقى [[process.env.PORT]] فاضي من غير سبب واضح.`
        },
        {
          cmd: "ConvertFrom-Json",
          title: "اقرا JSON كـ object",
          desc: R`JSON نص، و [[ConvertFrom-Json]] بيحوّله لـ object تقدر تقرا منه بالنقطة: [[$pkg.version]] و [[$pkg.scripts.dev]]. مفيد مع package.json وملفات الإعدادات وردود الـ APIs. في bash محتاج أداة زي [[jq]]، هنا مبني جوه.

في السطر الأول [[$pkg]] متغير (أي اسم بيبدأ بـ [[$]])، و [[=]] بتحط فيه الناتج. [[-Raw]] بتقرا الملف كله نص واحد (من غيرها Get-Content بيرجع سطور منفصلة. ConvertFrom-Json في 7.6 و 5.1 لمّ السطور واشتغل في تجربتي، بس [[-Raw]] أسرع وأوضح). والـ [[|]] بتبعت النص لـ ConvertFrom-Json.

بعد كده [[$pkg.dependencies]] نفسه object جواه حقول، فبيتطبع كجدول بأسامي المكتبات ونسخها. ولو كتبت اسم حقل مش موجود مش هيطلع error، هيرجع فاضي ([[$null]])، فلو حاجة رجعت فاضية راجع الاسم والكابيتال. ولو عايز تعدّل وتكتب الملف تاني، ده درس «عدّل ملف JSON واكتبه» في المستوى التالت.`,
          example: R`$pkg = Get-Content package.json -Raw | ConvertFrom-Json
$pkg.version
$pkg.dependencies`,
          try: "اطبع اسم ونسخة أي مشروع Node عندك.",
          deep: {
            why: "تتعامل مع JSON response من API أو تقرا ملف JSON. PowerShell بيحوّله لـ objects تقدر توصل لـ properties بسهولة.",
            how: R`[[ConvertFrom-Json]] بياخد نص JSON ويرجع object. [[ConvertTo-Json]] بيعمل العكس.

مع curl أو Invoke-WebRequest: الـ response جاي كنص، فتعمل [[| ConvertFrom-Json]] تحوّله.

[[-Depth]] في ConvertTo-Json مهمة: افتراضيًا بيتعمق بس ٢ مستوى. لو عندك JSON معقّد، زوّد الرقم: [[-Depth 10]].`,
            when: "أي تعامل مع API responses أو قراية package.json أو config.json.",
            mistakes: "ConvertTo-Json بـ Depth قليل يقطع الـ objects العميقة ويحوّل بعضها لنص زي «System.Object»."
          },
          lines: [
            "اقرا الملف كنص واحد ([[-Raw]])، وحوّله لـ object.",
            "دلوقتي تقدر تقرا أي حقل بالنقطة.",
            "حتى الحقول اللي جواها حقول."
          ],
          sol: R`في فولدر مشروع Node: [[$pkg = Get-Content package.json -Raw | ConvertFrom-Json]] وبعدين [[$pkg.name]] و [[$pkg.version]]. جربتها على package.json فيه name بـ myapp و version بـ 1.2.0، وسطر [["$($pkg.name)@$($pkg.version)"]] طبع [[myapp@1.2.0]]. و [[$pkg.dependencies]] بيطبع جدول فيه اسم كل مكتبة ونسختها.

[[-Raw]] بيقرا الملف كله كنص واحد بدل array سطور. الأمر اشتغل معايا من غيرها برضه في PowerShell 7.6 و 5.1، بس خليها عادة: أسرع، وأي أمر تاني بعد Get-Content (زي [[-replace]] على الملف كله) محتاج النص كله مرة واحدة. ولو [[$pkg.name]] رجع فاضي، يبقى انت مش في فولدر المشروع أو كتبت الاسم غلط؛ PowerShell مش بيطلع error لما property مش موجودة، بيرجع null بس.`
        }
      ]
    },
    {
      t: "البحث",
      l: 2,
      n: "",
      items: [
        {
          cmd: "Select-String",
          title: "دوّر على نص (grep)",
          desc: R`[[Select-String]] بيدوّر على نص جوه ملفات أو جوه ناتج أمر، زي [[grep]] في bash و [[findstr]] في CMD، واختصاره [[sls]]. [[-Pattern]] الكلام اللي بتدوّر عليه، و [[-Path *.js]] الملفات اللي هيدوّر فيها. الناتج سطر لكل نتيجة بالشكل [[file.js:12:السطر نفسه]] (اسم الملف ورقم السطر والسطر).

الـ Pattern ده regex مش نص عادي، يعني النقطة معناها «أي حرف». عشان كده السطر التالت فيه [[-SimpleMatch]]: دوّر على [[console.log]] حرفيًا. والسطر ده كمان بيوريك الـ pipeline: [[-Include *.js,*.ts]] امتدادين مفصولين بفاصلة، و [[Where-Object FullName -notmatch 'node_modules']] بيشيل أي ملف مساره فيه node_modules.

اختيارات تانية: [[-CaseSensitive]] يفرّق بين الكابيتال والسمول (الافتراضي مش بيفرّق، عكس grep)، و [[-NotMatch]] السطور اللي مفيهاش الكلمة (زي [[grep -v]])، و [[-List]] أول نتيجة بس من كل ملف. وأي ناتج أمر ينفع: [[Get-Content app.log -Tail 200 | sls error]].`,
          example: R`Select-String -Path *.js -Pattern "TODO"
sls "error" app.log
Get-ChildItem -Recurse -File -Include *.js,*.ts | Where-Object FullName -notmatch 'node_modules' | Select-String "console.log" -SimpleMatch`,
          try: "دوّر على كل console.log في مشروع من غير node_modules.",
          deep: {
            why: R`بتدوّر على كل مكان فيه TODO أو اسم متغير في المشروع، أو على كلمة error في لوج من ١٠ آلاف سطر. Select-String هو grep بتاع PowerShell، وكمان بيرجع objects فيها اسم الملف ورقم السطر تقدر تفلترها.`,
            how: R`[[Select-String -Pattern "error" -Path "*.log"]] بيدوّر في كل ملفات .log. بيرجع objects فيها المسار والسطر والرقم.

[[-CaseSensitive]] للبحث بفرق الحروف. [[-NotMatch]] يجيب السطور اللي مش فيها. [[-List]] يجيب الملفات اللي فيها الكلمة بس (مش كل السطور).

[[Select-String "function" *.js | Select-Object Filename, LineNumber, Line]] بيطلعلك كل function مع مكانها.`,
            when: "البحث عن كل استخدامات function. إيجاد error في لوجات.",
            mistakes: "الـ Pattern هو regex مش نص عادي. لو عايز نص حرفي بس استخدم [[-SimpleMatch]]."
          },
          lines: [
            "دوّر على TODO في كل ملفات .js (زي grep).",
            "الاختصار [[sls]]: دوّر على error في اللوج.",
            "كل ملفات js و ts، من غير node_modules، ودوّر فيهم على console.log كنص حرفي ([[-SimpleMatch]] مش regex)."
          ],
          sol: R`الأمر التالت في المثال هو الحل. جربته على مشروع فيه [[src\a.js]] و [[src\b.ts]] و [[node_modules\x\i.js]]، فطلع سطرين بس: [[src\a.js:1:console.log("a")]] و [[src\b.ts:1:const b=1; console.log(b)]]، والملف اللي جوه node_modules اتشال. الشكل: مسار الملف : رقم السطر : السطر نفسه.

[[-SimpleMatch]] مهمة لأن من غيرها النقطة في console.log بتبقى regex يعني «أي حرف». ولو عملت [[-Exclude node_modules]] مع [[-Recurse]] هتلاقيه لسه بيدخل جوه، لأن Exclude بيفلتر أسامي الملفات مش الفولدرات، عشان كده الفلترة بـ [[Where-Object FullName -notmatch]].`
        },
        {
          cmd: "Get-Command (which)",
          title: "البرنامج ده فين",
          desc: R`[[Get-Command node]] بيقولك لما تكتب node، أنهي حاجة بالظبط هتشتغل ومنين: نوعها (Application يعني برنامج، أو Cmdlet أو Alias أو Function) والمسار الكامل. ده المقابل لـ [[which]] و [[type]] في bash. و [[(Get-Command node).Source]] بيطلع المسار بس كنص، والأقواس بتنفّذ الأمر الأول وبعدين [[.Source]] تاخد منه الخاصية.

[[-All]] بيوريك كل النسخ لو البرنامج موجود في أكتر من فولدر في الـ PATH. اللي في الأول هو اللي بيشتغل، وده سبب مشاكل زي «انا سطبت node 22 وبيقول 18».

خد بالك من فخ: [[where]] جوه PowerShell اختصار لـ Where-Object (الفلترة)، مش أمر CMD اللي بيدوّر على البرامج. فلو عايز أمر CMD القديم اكتب [[where.exe]] بالامتداد، زي السطر التالت. نفس الحكاية مع [[curl]] و [[sc]] في 5.1.`,
          example: R`Get-Command node
(Get-Command node).Source
where.exe node`,
          try: "اعرف مسار node و git و npm عندك. لو أي واحد طلع أكتر من مسار، يبقى عندك أكتر من نسخة والـ PATH بيقرر أنهي واحدة بتشتغل.",
          deep: {
            why: "إيجاد مكان برنامج أو الـ alias اللي بيستخدمه. زي [[which]] أو [[type]] في bash.",
            how: R`[[Get-Command node]] بيقولك المسار الكامل. [[Get-Command ls]] بيقولك إنه alias لـ Get-ChildItem.

[[-All]] يوريك كل النسخ لو عندك أكتر من واحدة في PATH.

[[$env:PATH -split ";"]] بيعرض كل المسارات في PATH منفصلين.`,
            when: "مش عارف ليه نسخة node أو python غير المتوقعة. تتأكد إن برنامج متسطب.",
            mistakes: "على ويندوز PATH بيفصل بـ ; مش : زي لينكس."
          },
          lines: [
            "node ده جاي منين؟",
            "المسار بس كنص.",
            "أمر where بتاع CMD، بس لازم [[.exe]] لأن where في PowerShell اختصار لـ Where-Object."
          ],
          sol: R`[[Get-Command node]] بيطبع سطر فيه [[Application]] و [[node.exe]] والمسار زي [[C:\Program Files\nodejs\node.exe]]، و [[(Get-Command node).Source]] بيطبع المسار بس. [[Get-Command npm]] غالبًا هيطلع [[npm.ps1]] من نوع ExternalScript، لأن Node على ويندوز بيحط npm.ps1 و npm.cmd، و [[where.exe npm]] هيطبعلك الاتنين (مع [[npm]] من غير امتداد).

عشان تشوف كل النسخ: [[Get-Command node -All]] أو [[where.exe node]]. لما جربت على لينكس [[Get-Command npm -All]] طلع مسارين، وده بالظبط اللي الدرس بيحذر منه: اللي أول واحد في الـ PATH هو اللي بيشتغل. ولو كتبت [[where node]] من غير [[.exe]] مش هيطبع حاجة لأن where هنا Where-Object.`
        }
      ]
    },
    {
      t: "الـ Pipeline والـ Objects",
      l: 2,
      n: "الفرق الحقيقي بين PowerShell وأي شيل تاني",
      items: [
        {
          cmd: "Where-Object",
          title: "فلتر",
          desc: R`[[Where-Object]] بيفلتر: بيعدّي من الـ pipe الـ objects اللي الشرط عليها صح بس، زي [[grep]] بس على الخصائص مش على النص. اختصاراته [[where]] و [[?]].

المقارنة في PowerShell بكلمات مش رموز: [[-gt]] أكبر من، [[-lt]] أصغر من، [[-eq]] يساوي، [[-ne]] مش يساوي، [[-like]] مع wildcard زي [["*.log"]]، و [[-match]] مع regex. ليه مش [[>]]؟ لأن [[>]] في الشيل معناها «اكتب في ملف». الشرح الكامل للعوامل دي في درس «عوامل المقارنة» في المستوى التالت.

فيه شكلين للكتابة: المختصر [[Where-Object CPU -gt 100]] (اسم الخاصية وبعدها المقارنة) لما الشرط بسيط، والكامل [[Where-Object { $_.Length -gt 1MB }]] لما الشرط أعقد: الأقواس المعقوفة كود بيتنفذ لكل object، و [[$_]] هو الـ object الحالي. و [[1MB]] رقم جاهز (1048576 بايت)، ومعاه [[1KB]] و [[1GB]].`,
          example: R`Get-Process | Where-Object CPU -gt 100
Get-ChildItem -File | Where-Object { $_.Length -gt 1MB }
Get-Service | Where-Object Status -eq Running`,
          try: "اعرض الملفات اللي اتعدلت النهارده بس: [[Where-Object LastWriteTime -gt (Get-Date).Date]].",
          deep: {
            why: "فلترة الـ objects اللي طالعة من أمر قبله. زي grep بس بيفهم الـ properties مش النص.",
            how: R`[[Where-Object { $_.CPU -gt 10 }]] فيه [[$_]] هو اللي اسمه pipeline variable، يمثّل كل object جاي من اليسار.

الاختصارات: [[-gt]] أكبر، [[-lt]] أصغر، [[-eq]] يساوي، [[-ne]] مش يساوي، [[-like "text*"]] wildcard match. ولو الـ property اسمه بسيط: [[Where-Object Name -eq "chrome"]].

وفيه shorthand: بدل [[Where-Object { ... }]] ممكن تكتب [[Where { ... }]] أو [[? { ... }]].`,
            when: "تلاقي processes بتاكل أكتر من X رام. تلاقي services واقفة. تفلتر ملفات بحجم معين.",
            mistakes: "نسيان [[$_]] جوه الـ block. [[.CPU]] لوحدها مش شايلة حاجة."
          },
          lines: [
            "العمليات اللي استهلاكها للمعالج أكبر من 100. الشكل المختصر: property وبعدين المقارنة.",
            "الملفات اللي أكبر من ميجا. الشكل الكامل بالأقواس و [[$_]] لما الشرط أعقد.",
            "الخدمات الشغالة بس."
          ],
          sol: R`[[Get-ChildItem -File | Where-Object LastWriteTime -gt (Get-Date).Date]] بيعرض الملفات اللي اتعدلت النهارده بس. جربتها بعد ما عملت كام ملف فظهروا هما بس. [[(Get-Date).Date]] معناها النهارده الساعة 12 بالليل، فأي حاجة اتعدلت بعدها تبقى من النهارده.

لو طلعلك ولا حاجة، جرب [[New-Item test.txt]] وشغله تاني، المفروض يظهر. ولو كتبت [[-gt Get-Date]] من غير أقواس هيطلع error، لأن PowerShell هيعتبر Get-Date كلمة نص مش أمر. والأقواس حوالين [[(Get-Date)]] هي اللي بتنفذ الأمر الأول وتاخد منه [[.Date]].`
        },
        {
          cmd: "Select-Object",
          title: "اختار أعمدة أو عدد",
          desc: R`[[Select-Object]] (اختصاره [[select]]) بيختار أعمدة أو عدد صفوف من الناتج. [[Name, Id, CPU]] أسامي الخصائص اللي عايزها مفصولة بفواصل، فالجدول يبقى فيه الأعمدة دي بس، زي [[cut]] في bash بس على أسامي مش أرقام أعمدة.

[[-First 5]] أول ٥ بس (زي [[head -5]])، و [[-Last 5]] آخر ٥ (زي tail)، و [[-Skip 2]] يعدّي أول اتنين، و [[-Unique]] يشيل المكرر. و [[-ExpandProperty Name]] بيطلع القيمة نفسها كنص عادي بدل جدول بعمود اسمه Name، ودي اللي محتاجها لما هتبعت الأسامي لأمر تاني أو تكتبها في ملف.

متتلخبطش بينه وبين Where-Object: Select بيختار أعمدة أو عدد، Where بيختار صفوف بشرط. ولو كتبت اسم خاصية مش موجود مش هيطلع error، هيطلعلك عمود فاضي، فاتأكد من الأسامي بـ Get-Member.`,
          example: R`Get-Process | Select-Object Name, Id, CPU -First 5
Get-ChildItem | Select-Object -ExpandProperty Name`,
          try: "اعرض اسم وحجم كل ملف في فولدر.",
          deep: {
            why: "اختيار properties معينة من object أو تحديد عدد النتايج. زي [[cut]] في bash بس لـ objects.",
            how: R`[[Select-Object Name, CPU]] بيعرض العمودين دول بس. [[-First 5]] أول ٥. [[-Last 5]] آخر ٥. [[-Unique]] بيشيل المتكرر.

[[-ExpandProperty Name]] بيجيب قيمة property بس (String مش object)، مفيد لما بتحتاج النص نفسه مش الـ object.

[[Select-Object *]] بيعرض كل properties، مفيد لما Format-Table بيختصر وانت عايز الكل.`,
            when: "تعمل output نضيف بأعمدة معينة. تاخد أول N نتايج. تجيب قيمة property كنص.",
            mistakes: "الخلط بين Select-Object وWhere-Object. Select بيختار أعمدة، Where بيفلتر صفوف."
          },
          lines: ["٣ أعمدة بس، وأول ٥ صفوف.", "الأسامي كنصوص عادية بدل objects ([[-ExpandProperty]])."],
          sol: R`[[Get-ChildItem -File | Select-Object Name, Length]] بيطبع جدول بعمودين. جربتها فطلع مثلًا [[b.txt  5]] و [[package.json  85]] (الحجم بالبايت).

لو شلت [[-File]] الفولدرات هتظهر وعمود Length جنبها فاضي، لأن الفولدر مفيهوش حجم. وخلي بالك: لو كتبت [[Select-Object Name, Size]] مش هيطلع error، هيطلعلك عمود Size فاضي، لأن الاسم الصح Length. استخدم [[Get-Member]] لو مش متأكد من اسم الـ property.`
        },
        {
          cmd: "Sort-Object",
          title: "رتّب",
          desc: R`[[Sort-Object]] (اختصاره [[sort]]) بيرتب الـ objects حسب أي خاصية: [[Sort-Object Length]] بالحجم من الأصغر للأكبر، و [[-Descending]] بيعكس الترتيب، و [[-Unique]] بيشيل المكرر. وتقدر ترتب بأكتر من خاصية: [[Sort-Object Extension, Name]].

المثال الأول pipeline من ٣ أوامر: هات كل الملفات في كل الفولدرات، رتّبهم بالحجم من الأكبر، وخد أول ١٠ بعمودين بس. ده المقابل لـ [[du -a | sort -rn | head]] في bash، بس من غير ما تقصّ نص. والتاني بيرتب العمليات بـ [[WorkingSet]] (الرام اللي العملية ماسكاها بالبايت).

ميزة كبيرة عن bash: بيرتب الأرقام كأرقام والتواريخ كتواريخ لوحده، لأن الخصائص ليها نوع. بس لو القيم نصوص فيها أرقام (زي اللي جاية من CSV)، [["10"]] هتيجي قبل [["9"]]، فحوّلها: [[Sort-Object { [int]$_.Age }]].`,
          example: R`Get-ChildItem -Recurse -File | Sort-Object Length -Descending | Select-Object -First 10 Name, Length
Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 5`,
          try: "اعرف أكتر 5 برامج بتاكل رام.",
          deep: {
            why: R`«أكبر ١٠ ملفات»، «أكتر ٥ برامج بتاكل رام»، «آخر الملفات اللي اتعدلت». أي سؤال فيه «أكتر» أو «آخر» محتاج ترتيب، و Sort-Object بيرتب بأي خاصية من غير ما تقص نص زي [[sort -k]] في bash.`,
            how: R`[[Sort-Object Name]] ترتيب أبجدي. [[Sort-Object CPU -Descending]] من الأكبر للأصغر (أكتر CPU أول). [[Sort-Object @{e="CPU";d=$true}, Name]] ترتيب بأكتر من property.

أول تفصيلة مهمة: Sort-Object بيعمل الترتيب على كل الـ objects الجاية، يعني بيجمعها الأول في الذاكرة. على pipeline طويل ده ممكن يأكل رام.`,
            when: "ترتيب processes بالـ CPU. ترتيب ملفات بالحجم.",
            mistakes: "ترتيب نص رقمي بدون [[-Property { [int]$_ }]] فـ «10» تيجي قبل «9»."
          },
          lines: [
            "كل الملفات، مرتبة بالحجم من الأكبر، وخد أكبر ١٠ بالاسم والحجم.",
            "أكتر ٥ عمليات استهلاكًا للرام."
          ],
          sol: R`[[Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 5]] بيطلع أكتر 5 عمليات بتاكل رام. غالبًا هتلاقي chrome أو msedge أو Code أو MsMpEng (Defender)، والعمود [[WS(M)]] في PowerShell 7 بالميجا (في 5.1 اسمه [[WS(K)]] وبالكيلو).

لو عايز عمود بالميجا واضح استخدم الـ solCode. ولاحظ إن Chrome بيطلع كذا مرة لأن كل تاب عملية لوحده، فعشان تعرف Chrome كله بياخد كام، جمّع بالاسم (درس Group-Object). ولو رتبت بـ [[CPU]] بدل WorkingSet هتجيب اللي أكل وقت معالج من ساعة ما فتح، مش الرام.`,
          solCode: R`Get-Process |
    Sort-Object WorkingSet -Descending |
    Select-Object -First 5 Name, Id, @{ Name = "MB"; Expression = { [math]::Round($_.WorkingSet / 1MB, 1) } }`
        },
        {
          cmd: "Measure-Object",
          title: "عدّ واجمع",
          desc: R`[[Measure-Object]] (اختصاره [[measure]]) بيعدّ ويحسب إحصائيات على الـ objects اللي جاية له: [[-Sum]] المجموع، و [[-Average]] المتوسط، و [[-Maximum]] و [[-Minimum]]. بتديله اسم الخاصية اللي هيحسب عليها، زي [[Length]] للحجم. الناتج object فيه [[Count]] و [[Sum]] وغيرهم، فتقدر تاخد منه بالنقطة: [[(...).Sum / 1MB]].

السطر الأول طريقة أقصر للعدّ بس: الأقواس بتجمع كل الملفات في array، و [[.Count]] بيعدّها. والتاني بيجمع أحجام كل الملفات في الفولدر واللي تحته، يعني حجم الفولدر بالبايت. في bash ده [[du -sb]] للحجم و [[wc -l]] للعدّ.

خلي بالك: الحجم ده مجموع أحجام الملفات، وممكن يختلف شوية عن «Size on disk» في Explorer. وعلى فولدر كبير زي node_modules بياخد ثواني، طبيعي.`,
          example: R`(Get-ChildItem -Recurse -File).Count
Get-ChildItem -Recurse -File | Measure-Object Length -Sum`,
          try: "اعرف حجم فولدر node_modules بالميجا: قسّم الـ Sum على [[1MB]].",
          deep: {
            why: "إحصاءات على مجموعة من القيم: العد، والمجموع، والمتوسط. زي wc -l في bash بس أقوى.",
            how: R`[[Get-Process | Measure-Object]] بيعدّهم. [[Measure-Object -Property CPU -Sum -Average -Maximum]] بيحسب إحصاءات على property معينة.

[[(Get-ChildItem -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB]] حجم الفولدر بالميجا.`,
            when: "عد الملفات. إجمالي حجم فولدر. متوسط أو أعلى استهلاك CPU.",
            mistakes: "نسيان property اسمها [[-Property]] لما بتعمل Sum أو Average."
          },
          lines: ["عدد الملفات (الأقواس تجمع الناتج الأول وبعدين .Count).", "مجموع أحجام كل الملفات."],
          sol: R`[[Get-ChildItem node_modules -Recurse -File | Measure-Object Length -Sum]] بيطبع [[Count]] (عدد الملفات) و [[Sum]] (الحجم بالبايت)، وبعدين تقسم على [[1MB]]. جربتها على فولدر node_modules فيه 8463 ملف فطلع Sum بـ 229935708 والقسمة طلعت [[219.28]] ميجا.

الرقم ممكن يختلف شوية عن «Size on disk» في Explorer، لأن Explorer بيحسب حجم الـ clusters على الديسك. وعلى لينكس والماك ضيف [[-Force]] عشان الملفات اللي بتبدأ بنقطة متتشالش من الحساب. ولو كتبت [[Measure-Object -Sum]] من غير [[Length]] بيحاول يجمع الملفات نفسها فيطلع [[Input object "..." is not numeric.]] (جربتها في 7.6 و 5.1).`,
          solCode: R`$m = Get-ChildItem .\node_modules -Recurse -File -Force | Measure-Object Length -Sum
$m.Count
[math]::Round($m.Sum / 1MB, 2)`
        },
        {
          cmd: "ForEach-Object",
          title: "نفّذ حاجة على كل عنصر",
          desc: R`[[ForEach-Object]] بينفّذ كود على كل عنصر جاي في الـ pipe، واحد واحد. اختصاراته [[foreach]] و [[%]] (النسبة المئوية)، فلو شفت [[| % { ... }]] في كود حد، ده هو. الكود بيتكتب جوه [[{ }]]، و [[$_]] جوّاه هو العنصر الحالي.

[[1..5]] بيعمل array أرقام من 1 لـ 5 (الـ [[..]] هنا اسمها range operator). و [["Item $_"]] نص بين double quotes، فـ [[$_]] بتتبدّل بقيمتها جوه النص. وفي السطر التاني [[$_.Name.ToUpper()]]: اسم الملف، وعليه method بتحوّله لحروف كابيتال، والأقواس [[()]] في الآخر لازمة مع أي method.

ده المقابل لـ [[| while read line]] أو [[xargs]] في bash. ولو بتلف على حاجة جوه سكربت مش جوه pipe، [[foreach ($x in $list) { }]] أوضح (درس اللوب في المستوى التالت). وفي PowerShell 7 فيه [[-Parallel]] يشغّل أكتر من عنصر في نفس الوقت.`,
          example: R`1..5 | ForEach-Object { "Item $_" }
Get-ChildItem *.log | ForEach-Object { $_.Name.ToUpper() }`,
          try: "اعمل 5 ملفات test1.txt لـ test5.txt بـ ForEach-Object و New-Item.",
          deep: {
            why: "تنفيذ كود على كل element في pipeline. زي for loop في لينكس بس داخل pipeline.",
            how: R`[[ForEach-Object { $_ }]] أو [[% { $_ }]] الاختصار. جوه الـ block [[$_]] (أو [[$PSItem]]، نفس الحاجة باسم أوضح) هو العنصر الحالي.

فيه شكل أقصر للخصائص البسيطة: [[Get-Process | ForEach-Object Name]] بدل [[Get-Process | ForEach-Object { $_.Name }]].

وفيه [[-Begin]] و [[-End]]: كود بيتنفذ مرة قبل أول عنصر ومرة بعد آخر عنصر، زي [[1..3 | ForEach-Object -Begin { $sum = 0 } -Process { $sum += $_ } -End { $sum }]].

في PowerShell 7: [[-Parallel { ... } -ThrottleLimit 5]] بيشغّل لحد ٥ عناصر في نفس الوقت، مفيد مع طلبات شبكة كتير. جوه الـ Parallel المتغيرات اللي بره مش بتتشاف إلا بـ [[$using:name]]. والترتيب مش مضمون: [[1..3 | ForEach-Object -Parallel { $_ * $using:n }]] مع [[$n = 5]] طلّع 10 و 5 و 15 في تجربتي. وفي 5.1 مفيش [[-Parallel]] خالص: بيطلع [[Parameter set cannot be resolved using the specified named parameters.]]`,
            when: "تعمل حاجة على كل ملف. تبعت طلب API لكل record.",
            mistakes: "استخدامه لحاجات موجودة كـ methods في الـ objects. لو Process عنده Kill() method، استخدمه مباشرة."
          },
          lines: [
            "الأرقام من ١ لـ ٥، ولكل واحد اطبع Item ورقمه. [[$_]] هو العنصر الحالي.",
            "اسم كل ملف log بحروف كابيتال. بتقدر تنادي methods على [[$_]]."
          ],
          sol: R`[[1..5 | ForEach-Object { New-Item "test$_.txt" }]] بيعمل [[test1.txt]] لـ [[test5.txt]] وبيطبع جدول بالـ 5 ملفات. جربتها وطلعوا الخمسة.

[[$_]] جوه الـ [[{ }]] هو الرقم الحالي، والـ double quotes هي اللي بتخليه يتحط في الاسم. لو كتبت [['test$_.txt']] بـ single quotes هيعمل ملف واحد اسمه حرفيًا [[test$_.txt]] والباقي هيطلع error إنه موجود. ولو شغلته مرة تانية هيطلعلك 5 errors [[already exists]] لأن الملفات موجودة.`,
          solCode: R`1..5 | ForEach-Object { New-Item "test$_.txt" }
Get-ChildItem test*.txt | Select-Object Name`
        },
        {
          cmd: "Group-Object",
          title: "جمّع حسب قيمة",
          desc: R`[[Group-Object]] (اختصاره [[group]]) بيجمّع الـ objects اللي ليها نفس القيمة في خاصية معينة، ويعدّ كل مجموعة. الناتج جدول بـ ٣ أعمدة: [[Count]] عدد العناصر، و [[Name]] القيمة المشتركة، و [[Group]] العناصر نفسها.

المثال: هات كل الملفات، جمّعهم حسب [[Extension]] (الامتداد)، وبعدين [[Sort-Object Count -Descending]] رتّب المجموعات من الأكتر عددًا. فتعرف مشروعك فيه كام ملف js وكام css. في bash ده محتاج [[sort | uniq -c | sort -rn]] على نص متقصوص، هنا سطر واحد على خصائص.

[[-NoElement]] بيشيل عمود Group لو مش محتاجه فالجدول يبقى أنضف. والملفات اللي ملهاش امتداد بتتجمع تحت Name فاضي، ومش غلط.`,
          example: "Get-ChildItem -Recurse -File | Group-Object Extension | Sort-Object Count -Descending",
          try: "اعرف أكتر نوع ملفات في مشروعك.",
          deep: {
            why: "تجميع النتايج بـ property. زي [[uniq -c]] في bash بس بيجيب groups كاملة.",
            how: R`[[Get-Process | Group-Object Name]] بيجمع كل processes بنفس الاسم في group، وبيقولك العدد.

الناتج objects بيها [[Count]] وعدد العناصر و[[Group]] قايمة العناصر نفسها. فتقدر تعمل فلترة بعدين.

[[Get-WinEvent -LogName Application -MaxEvents 100 | Group-Object LevelDisplayName | Sort-Object Count -Descending]] إحصاء لأنواع events.`,
            when: "كام process بكل اسم. إيه أكتر نوع لوج بيتكرر.",
            mistakes: "استخدامه من غير Sort-Object بعده. عادة الناتج محتاج ترتيب."
          },
          lines: ["جمّع الملفات حسب الامتداد، ورتّب المجموعات من الأكتر عددًا."],
          sol: R`[[Get-ChildItem -Recurse -File | Group-Object Extension | Sort-Object Count -Descending]] بيطلع جدول [[Count  Name  Group]]. جربته على مشروع صغير فطلع [[2 .js]] و [[1 .ts]]. في مشروع حقيقي أول سطر غالبًا [[.js]] بآلاف، وده لأن node_modules داخل في الحساب.

عشان تشوف كودك انت بس، فلتر node_modules الأول بـ [[Where-Object FullName -notmatch 'node_modules']]. الملفات اللي ملهاش امتداد بتتجمع تحت Name فاضي. وعمود Group فيه الملفات نفسها لو عايز تفتحها، ولو مش محتاجها ضيف [[-NoElement]] يبقى الجدول أنضف.`
        },
        {
          cmd: "Export-Csv / ConvertTo-Json",
          title: "صدّر الناتج",
          desc: R`لما الناتج يعجبك وعايز تحفظه أو تبعته: [[Export-Csv]] بيكتبه ملف CSV يتفتح في Excel، و [[ConvertTo-Json]] بيحوّله نص JSON ينفع لـ API أو ملف إعدادات. الاتنين بياخدوا objects من الـ pipe، فقبلهم [[Select-Object]] تختار الأعمدة اللي عايزها بس.

[[-NoTypeInformation]] بتشيل سطر أول غريب بيبدأ بـ [[#TYPE]] في Windows PowerShell 5.1 (في 7 مش بيتكتب أصلًا، والإضافة مش بتضر). و [[-AutoSize]] في [[Format-Table]] بتظبط عرض الأعمدة على قد الكلام.

أهم قاعدة: أوامر [[Format-*]] (زي Format-Table و Format-List) للعرض على الشاشة بس، وبيطلّعوا أوامر رسم مش بيانات. فلو حطيت Format-Table قبل Export-Csv الملف هيطلع مليان كلام غريب. خلّي Format-Table آخر حاجة في السطر دايمًا. والعكس موجود: [[Import-Csv]] و [[ConvertFrom-Json]] بيرجّعوا الملف objects تاني.`,
          example: R`Get-Process | Select-Object Name, Id -First 5 | Format-Table -AutoSize
Get-Process | Select-Object Name, Id, CPU | Export-Csv procs.csv -NoTypeInformation
Get-Service | Select-Object Name, Status -First 3 | ConvertTo-Json`,
          try: "صدّر لستة ملفات فولدر (الاسم والحجم) لـ CSV وافتحه في Excel.",
          deep: {
            why: "تحفظ البيانات في شكل قابل للاستخدام: CSV لـ Excel، أو JSON لـ API أو ملفات config.",
            how: R`[[Export-Csv -Path out.csv -NoTypeInformation]] يحفظ مباشرة. [[-NoTypeInformation]] مهمة عشان تشيل السطر الأول الغريب اللي بيبقى اسم النوع في PowerShell.

[[ConvertTo-Json -Depth 5]] يحوّل لـ JSON. [[-Depth]] مهمة عشان الـ objects المتداخلة.

وخلي بالك في السطر التالت: [[Status]] نوعه enum، فبيتكتب في الـ JSON رقم ([["Status": 4]] يعني Running و 1 يعني Stopped) مش كلمة. في PowerShell 7 ضيف [[-EnumsAsStrings]] فيطلع [["Status": "Running"]]، وفي 5.1 مش موجودة.

[[Import-Csv]] لاستيراد CSV. [[ConvertFrom-Json]] لـ JSON. الاتنين بيتعاملوا بـ objects مش نص.`,
            when: "تصدير بيانات لـ Excel. حفظ نتايج تحليل. كتابة config جديد.",
            mistakes: "نسيان -NoTypeInformation فيطلع سطر أول غريب. ونسيان -Depth فـ JSON يكون مبتور."
          },
          lines: [
            "اعرض جدول مضبوط الأعمدة (للشاشة بس).",
            "احفظ كـ CSV تفتحه في Excel. [[-NoTypeInformation]] يشيل سطر أول غريب.",
            "حوّل لـ JSON."
          ],
          sol: R`الحل في الـ solCode. جربته فطلع ملف أوله [["Name","Length"]] وبعدين سطر لكل ملف زي [["b.txt","5"]]. [[ii files.csv]] بيفتحه في Excel لو متسطب.

أشهر غلطة إنك تعمل [[Format-Table]] قبل [[Export-Csv]]: جربتها فطلع ملف فيه أعمدة غريبة زي [[ClassId2e4f51ef21dd47e99d3c952918aff9cd]] بدل الاسم والحجم، لأن Format-Table بيطلع أوامر عرض مش بيانات. ولو أسامي الملفات عربي وطلعت رموز غريبة في Excel استخدم [[-Encoding utf8BOM]] في PowerShell 7 (أو [[-Encoding UTF8]] في 5.1)، ولو كل البيانات اتحطت في عمود واحد جرب [[-UseCulture]] عشان يستخدم الفاصل بتاع إعدادات ويندوز.`,
          solCode: R`Get-ChildItem -File |
    Select-Object Name, Length |
    Export-Csv files.csv -NoTypeInformation -Encoding utf8BOM
Get-Content files.csv
ii files.csv`
        }
      ]
    },
    {
      t: "العمليات والخدمات",
      l: 2,
      n: "",
      items: [
        {
          cmd: "Get-Process / Stop-Process",
          title: "العمليات",
          desc: R`[[Get-Process]] بيعرض البرامج الشغالة، زي [[ps]] في bash و [[tasklist]] في CMD، واختصاره [[ps]] و [[gps]]. لو كتبت اسم بعده ([[Get-Process node]]) بيجيب العمليات اللي بالاسم ده بس، وكل واحدة ليها [[Id]] (رقم العملية أو PID) و [[CPU]] (ثواني معالج) و [[WS]] (الرام).

[[Stop-Process]] بيقفل عملية، واختصاره [[kill]]. [[-Name node]] بيقفل كل العمليات اللي اسمها node مرة واحدة (من غير .exe)، و [[-Id 1234]] بيقفل عملية واحدة برقمها، وده أدق لو فيه أكتر من نسخة. و [[-Force]] بيقفل غصب من غير أسئلة، زي [[kill -9]].

تحذير: Stop-Process مش بيسأل البرنامج «تحب تحفظ؟»، أي شغل مش محفوظ بيضيع. ولو قالك Access is denied، العملية شغالة بصلاحيات أدمن وانت لأ. ولو الاسم مش موجود هيطلع error، فـ [[-ErrorAction SilentlyContinue]] لو مش فارق معاك.`,
          example: R`Get-Process node
Stop-Process -Name node
Stop-Process -Id 1234 -Force`,
          try: "افتح notepad واقفله بـ Stop-Process بالاسم.",
          flag: "danger",
          deep: {
            why: R`برنامج معلّق، أو سيرفر node قديم لسه ماسك البورت، أو عايز تعرف مين بياكل الرام. زي ps و kill في bash.`,
            how: R`[[Get-Process]] بدون حاجة كل العمليات. [[Get-Process chrome]] بيفلتر. الـ objects بيها CPU، ورام [[WorkingSet64]]، والـ Id، والاسم.

[[Stop-Process -Name "notepad"]] أو [[-Id 1234]]. [[-Force]] لو مش قافل لوحده.

[[Get-Process | Where-Object WorkingSet64 -gt 500MB | Select Name, Id, WorkingSet64]] عمليات تاكل أكتر من ٥٠٠MB.`,
            when: "عملية معلّقة. تطبيق ماسك resources. تعرف الـ PID عشان تربطه ببورت.",
            mistakes: "Stop-Process على اسم غلط بيطلع error. استخدم -ErrorAction SilentlyContinue لو مش مهم."
          },
          lines: [
            "عمليات node الشغالة (زي pgrep).",
            "اقفلهم كلهم بالاسم.",
            "اقفل عملية برقمها، غصب ([[-Force]] زي kill -9)."
          ],
          sol: R`[[Start-Process notepad]] وبعدين [[Get-Process notepad]] هيطلع سطر فيه Id و ProcessName، و [[Stop-Process -Name notepad]] يقفله من غير أي رسالة. تأكد بـ [[Get-Process notepad]] تاني، المفروض يقولك [[Cannot find a process with the name "notepad"]].

Stop-Process مش بيسأل «تحب تحفظ؟»، أي كلام مكتوب مش محفوظ بيضيع. ولو قالك [[Access is denied]] يبقى العملية شغالة كأدمن وانت مش أدمن. ولو فيه أكتر من notepad مفتوح، [[-Name]] هيقفلهم كلهم، فلو عايز واحد بس استخدم [[-Id]].`
        },
        {
          cmd: "Get-NetTCPConnection",
          title: "مين ماسك البورت",
          desc: R`لما تشغّل سيرفر ويطلعلك [[EADDRINUSE]] أو «port 3000 is already in use»، يبقى فيه برنامج تاني ماسك البورت. [[Get-NetTCPConnection]] بيعرض اتصالات TCP على الجهاز، و [[-LocalPort 3000]] البورت ده بس، و [[-State Listen]] اللي «بيسمع» (مستني اتصالات) بس. أهم عمود [[OwningProcess]]: رقم العملية اللي ماسكة البورت. المقابل في لينكس [[ss -tlnp]] أو [[lsof -i :3000]].

السطر التاني فيه أقواس جوه أقواس: [[(Get-NetTCPConnection ...).OwningProcess]] بيتنفذ الأول ويطلع الرقم، والرقم ده بيتحط مكان [[-Id]] في Get-Process، فتعرف اسم البرنامج. والسطر التالت نفس الفكرة بس مع Stop-Process و [[-Force]]: يقفل البرنامج في سطر واحد.

[[-State Listen]] مهمة: من غيرها هتلاقي اتصالات قديمة حالتها TimeWait رقم عمليتها 0، وتقفل الغلط أو يطلعلك error. والأمر ده على ويندوز بس (5.1 و 7)، ومن غير أدمن بيشتغل عادي.`,
          example: R`Get-NetTCPConnection -LocalPort 3000 -State Listen
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000 -State Listen).OwningProcess
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000 -State Listen).OwningProcess -Force`,
          try: "شغّل [[npx http-server -p 3000]] واقفله من نافذة تانية بالبورت.",
          deep: {
            why: R`أشهر error لأي حد بيشغّل سيرفر محلي: [[EADDRINUSE]]، يعني سيرفر قديم لسه ماسك البورت (غالبًا node في نافذة نسيتها). الأمر ده بيوصلك للبرنامج ويقفله في سطر، زي [[lsof -i]] و [[ss -tlnp]] في لينكس.`,
            how: R`[[-LocalPort 3000]] بيدوّر على البورت ده. [[-State Listen]] العمليات اللي بتستمع. الناتج بيه LocalPort وRemoteAddress والـ State وOwningProcess (الـ PID).

[[Get-NetTCPConnection -LocalPort 3000 | Select-Object *]] وبعدين [[Get-Process -Id PID]] تعرف اسم العملية.

[[netstat -ano]] كمان شغال في PowerShell وبياخد نفس المعلومات بأسلوب قديم.`,
            when: "EADDRINUSE: بورت مشغول. تتأكد إن التطبيق شغال ومستمع.",
            mistakes: "تنسى [[-State Listen]] فيطلعلك اتصالات TIME_WAIT قديمة رقم عمليتها 0، وتقفل الغلط."
          },
          lines: [
            "مين بيسمع على بورت 3000 (زي ss -tlnp). OwningProcess هو رقم العملية.",
            "هات العملية نفسها برقمها (الأقواس بتنفّذ الجوّاني الأول).",
            "واقفلها. الحل الكامل لـ EADDRINUSE في سطر."
          ],
          sol: R`في نافذة: [[npx http-server -p 3000]]. في التانية [[Get-NetTCPConnection -LocalPort 3000 -State Listen]] هيطلع سطر أو اتنين (IPv4 و IPv6) فيهم [[LocalPort 3000]] و [[State Listen]] و [[OwningProcess]] رقم زي 12345، وبعدين [[Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000 -State Listen).OwningProcess -Force]]. النافذة الأولى هترجع للـ prompt والسيرفر وقف.

لو ملقاش حاجة هيقولك (مع [[-State Listen]]) [[No matching MSFT_NetTCPConnection objects found by CIM query ... WHERE ((LocalPort = 3000)) AND ((State = 2))]]، ومن غير [[-State]] [[No MSFT_NetTCPConnection objects found with property 'LocalPort' equal to '3000']]، والاتنين معناهم مفيش حد بيسمع على البورت (أو السيرفر لسه بيقوم). جربت ده في 7.6 و 5.1 بسيرفر Node على 127.0.0.1 فطلع سطر واحد بس (IPv4)، والسطرين بيطلعوا لو السيرفر سامع على IPv4 و IPv6 الاتنين. و Get-NetTCPConnection موجود على ويندوز بس (جوه PowerShell 5.1 و 7)، على لينكس والماك استخدم [[ss -tlnp]] أو [[lsof -i :3000]].`
        },
        {
          cmd: "Start-Process",
          title: "شغّل حاجة",
          desc: R`[[Start-Process]] بيفتح أي حاجة بالبرنامج المناسب لها، زي [[start]] في CMD و [[xdg-open]] في لينكس و [[open]] في الماك. اسم برنامج ([[notepad]]) بيشغّله، ولينك ([["https://github.com"]]) بيفتحه في المتصفح الافتراضي، وملف بيفتحه بالبرنامج المرتبط بامتداده. اختصاره [[start]].

[[-Verb RunAs]] بيشغّل البرنامج كأدمن، فهيطلعلك سؤال UAC «Do you want to allow...». ودي الطريقة تفتح PowerShell أدمن من PowerShell عادي. و [[ii]] اختصار [[Invoke-Item]]: بيفتح الحاجة بالبرنامج الافتراضي، والنقطة [[.]] يعني الفولدر الحالي، فـ [[ii .]] بيفتح Explorer على المكان اللي انت فيه.

إضافات مهمة في السكربتات: [[-Wait]] يستنى البرنامج يقفل قبل ما يكمّل (من غيرها السكربت بيكمّل على طول)، و [[-ArgumentList]] للـ arguments، و [[-WindowStyle Hidden]] من غير نافذة. ولو عايز البرنامج يشتغل جوه نفس النافذة وتشوف ناتجه، ده شغل [[&]] (الدرس اللي بعده).`,
          example: R`Start-Process notepad
Start-Process "https://github.com"
Start-Process powershell -Verb RunAs
ii .`,
          try: "افتح الفولدر الحالي في Explorer بـ [[ii .]].",
          deep: {
            why: R`عايز تفتح لينك أو ملف بالبرنامج بتاعه، أو تفتح PowerShell كأدمن من غير ما تقفل اللي انت فيه، أو سكربت يشغّل برنامج ويستناه يخلص. Start-Process بيعمل الحاجات دي كلها، زي [[start]] في CMD و [[xdg-open]] في لينكس.`,
            how: R`[[Start-Process notepad.exe]] بيشغّل Notepad. [[-Verb RunAs]] تشغيل كـ Administrator (هيطلع UAC prompt). [[-Wait]] بيستنى يخلص قبل ما يكمّل.

[[Start-Process -FilePath "cmd.exe" -Verb RunAs]] بيفتح CMD كمدير.

[[-WindowStyle Hidden]] بيشغّل من غير نافذة. [[-RedirectStandardOutput out.txt]] بيحفظ الـ output.`,
            when: "تشغيل أمر بصلاحيات مرتفعة. تشغيل عملية في الخلفية من سكربت.",
            mistakes: "تنسى -Wait فالسكربت يكمّل قبل ما البرنامج يخلص."
          },
          lines: [
            "افتح Notepad.",
            "افتح لينك في المتصفح الافتراضي.",
            "افتح PowerShell كمدير (هيطلع سؤال UAC).",
            "[[ii]] اختصار Invoke-Item: افتح الفولدر الحالي في Explorer."
          ],
          sol: R`[[ii .]] بيفتح نافذة File Explorer على الفولدر اللي انت واقف فيه، ومش بيطبع حاجة في الترمنال. [[ii]] اختصار Invoke-Item، وبيفتح أي حاجة بالبرنامج الافتراضي بتاعها: [[ii .\report.pdf]] يفتح الـ PDF، و [[ii .\files.csv]] يفتح Excel.

لو انت جوه WSL الأمر ده مش موجود أصلًا، المقابل هناك [[explorer.exe .]]. وعلى لينكس PowerShell بيستخدم [[xdg-open]]، فلو مفيش واجهة رسومية مش هيفتح حاجة.`
        },
        {
          cmd: "& (call operator)",
          title: "شغّل برنامج مساره في متغير أو فيه مسافات",
          desc: R`مسار بين علامات تنصيص في أول السطر PowerShell بيعتبره نص مش أمر، فبيطبعه أو يطلع error. [[&]] قبله بيقول «شغّل ده»: [[& "C:\Program Files\nodejs\node.exe" --version]]. ونفس الحكاية لو المسار في متغير: [[& $chrome ...]]. والـ arguments ممكن تبقى array تتبني في السكربت وتتبعت مرة واحدة.`,
          example: R`$node = "C:\Program Files\nodejs\node.exe"
"C:\Program Files\nodejs\node.exe" --version
& "C:\Program Files\nodejs\node.exe" --version
& $node --version
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$chromeArgs = @("--headless=new", "--screenshot=$env:TEMP\page.png", "http://localhost:3000")
& $chrome $chromeArgs`,
          try: R`اكتب [["C:\Program Files\nodejs\node.exe" --version]] وشوف الـ error، وبعدين حط [[&]] قبلها.`,
          deep: {
            why: "أي برنامج في [[C:\\Program Files]] مساره فيه مسافة، فلازم يتحط بين علامات تنصيص. بس في PowerShell أي حاجة بين علامات تنصيص في أول السطر بتبقى نص مش أمر، فبيطلعلك error غريب أو المسار يتطبع وخلاص.",
            how: R`PowerShell بيبص على أول حاجة في السطر: لو كلمة عادية ([[node]]، [[git]]) بيدوّر عليها كأمر. لو string أو متغير، بيعتبره قيمة ويطبعها. فالمسار بين علامات تنصيص لوحده بيطبع المسار، ولو بعده arguments بيطلع [[Unexpected token]].

[[&]] (اسمه call operator) بيقول «القيمة اللي بعدي دي اسم أمر أو مسار برنامج، شغّله»، وأي حاجة بعده بتتبعت له كـ arguments.

ولما تحط array بعده، كل عنصر بيتبعت argument لوحده، والعنصر اللي فيه مسافات بيتحط بين علامات تنصيص أوتوماتيك. فتقدر تبني الـ arguments خطوة خطوة (تزوّد فلاج بشرط مثلًا) وتبعتهم مرة واحدة.

والفرق بينه وبين [[Start-Process]]: [[&]] بيشغّل البرنامج في نفس النافذة، والناتج بيطلع قدامك، و [[$LASTEXITCODE]] بيتملى. [[Start-Process]] بيشغّله كبروسس منفصل، ومحتاج [[-Wait]] عشان تستناه.

وخلي بالك: برامج GUI زي Chrome، [[&]] ممكن ميستناهاش تخلص، فالسكربت يكمّل قبل ما الصورة تتعمل. في الحالة دي [[Start-Process -Wait]] أضمن (الدرس اللي بعده).`,
            when: "أي برنامج مش في الـ PATH ومساره فيه مسافات، أو مساره بيتحدد في السكربت (تدوّر عليه في أكتر من مكان).",
            mistakes: R`في مشروع حقيقي كان سكربت التصوير بيشغّل Chrome بـ [[&]] وبعدين [[Start-Sleep -Seconds 2]] ويتمنى الصورة تكون خلصت. وكان مسمّي الـ array [[$args]]، ودي متغير محجوز في PowerShell (فيه الـ arguments اللي اتبعتت للسكربت)، فاستخدم اسم زي [[$chromeArgs]]. وكتابة الـ arguments كلها string واحد ([[& $chrome "--headless --screenshot=x"]]) بتوصل للبرنامج argument واحد طويل.`
          },
          lines: [
            "مسار node في متغير.",
            "من غير [[&]]: PowerShell شايف نص وبعده كلام مش مفهوم، فيطلع error.",
            "بـ [[&]]: شغّل البرنامج اللي في المسار ده.",
            "نفس الحاجة من متغير.",
            "مسار Chrome.",
            "array فيها الـ arguments، كل واحد عنصر لوحده.",
            "شغّل Chrome وابعتله كل عناصر الـ array كـ arguments منفصلة."
          ],
          sol: R`من غير [[&]]: جربتها على PowerShell 7 والمسار بين علامات تنصيص، فطلع ParserError: [[Unexpected token 'version' in expression or statement.]] ومعاه [[The '--' operator works only on variables or on properties.]]، لأن PowerShell شاف نص وبعده حاجة مش مفهومة. ولو كتبت المسار لوحده من غير أي arguments هيطبعه كنص وخلاص.

مع [[&]] قبلها: طبعت نسخة node زي [[v22.22.2]]. ونفس الحكاية [[& $node --version]]. أما [[$node --version]] من غير [[&]] بيطلع نفس الـ ParserError. القاعدة: لو السطر بيبدأ بـ علامة تنصيص أو [[$]] وانت عايز تشغّل، حط [[&]] قبله.`
        },
        {
          cmd: "screenshots.ps1",
          title: "صوّر صفحات موقعك بـ Chrome من غير أي مكتبة",
          desc: R`Chrome نفسه يقدر يصوّر صفحة من غير ما يفتح نافذة: [[--headless=new --screenshot=file.png --window-size=1440,900]]. لوب على لستة صفحات بمقاسات مختلفة، و [[Start-Process -Wait]] يستنى كل صورة تخلص، و [[--virtual-time-budget]] يدّي الصفحة وقت تحمّل الـ JavaScript والخطوط.`,
          example: R`$outDir = Join-Path $env:TEMP "shots"
New-Item -ItemType Directory -Force $outDir | Out-Null
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) { $chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" }

$pages = @(
  @{ file = "home.png";    url = "http://localhost:3000/";        w = 1440; h = 900 },
  @{ file = "home-m.png";  url = "http://localhost:3000/";        w = 390;  h = 844 },
  @{ file = "contact.png"; url = "http://localhost:3000/contact"; w = 1440; h = 1000 }
)

foreach ($p in $pages) {
  $out = Join-Path $outDir $p.file
  Remove-Item $out -ErrorAction SilentlyContinue
  $chromeArgs = @("--headless=new", "--disable-gpu", "--hide-scrollbars",
    "--user-data-dir=$env:TEMP\shot-profile", "--window-size=$($p.w),$($p.h)",
    "--virtual-time-budget=4000", "--screenshot=$out", $p.url)
  Start-Process $chrome -ArgumentList $chromeArgs -Wait
  if (Test-Path $out) { Write-Host "OK   $($p.file)" } else { Write-Host "FAIL $($p.file)" -ForegroundColor Red }
}
ii $outDir`,
          try: "شغّل موقعك محليًا، وغيّر اللستة لصفحاتك، وقارن صورة اللابتوب بصورة الموبايل.",
          flag: "script",
          deep: {
            why: "عايز صور لصفحات موقعك: للـ README، أو تبعتها لعميل، أو تتأكد إن شكل الموبايل مش بايظ قبل الرفع. Playwright و Puppeteer بيسطّبوا متصفح كامل ومكتبات، و Chrome اللي على جهازك أصلًا بيعمل ده بفلاجات.",
            how: R`[[--headless=new]] بيشغّل Chrome من غير نافذة (و [[new]] هي النسخة اللي بترسم الصفحة زي Chrome العادي بالظبط). و [[--screenshot=path]] بيصوّر ويقفل. و [[--window-size]] مقاس الشاشة، فـ 390 في 844 تقريبًا مقاس موبايل.

[[--virtual-time-budget=4000]] بيدّي الصفحة ٤ ثواني «افتراضية» تحمّل فيها الـ JavaScript والصور والخطوط قبل التصوير، ومن غيره ممكن تتصوّر فاضية أو نصها. و [[--user-data-dir]] بروفايل منفصل، عشان لو Chrome بتاعك مفتوح ميحصلش تعارض ومتتأثرش إعداداتك.

اللستة array من hashtables: كل [[@{ }]] فيه اسم الملف واللينك والمقاس، والـ [[foreach]] بيلف عليهم. فإضافة صفحة سطر واحد.

[[Remove-Item]] للصورة القديمة قبل التصوير مهم: من غيره، لو التصوير فشل، [[Test-Path]] هيلاقي الصورة القديمة ويقولك OK.

[[Start-Process -Wait]] بيستنى Chrome يقفل قبل ما يكمّل، فالفحص بعده دقيق. وفي الآخر [[ii]] بيفتح فولدر الصور.`,
            when: "قبل ما ترفع تعديل في التصميم، أو تعمل صور للـ README أو لعرض، أو تقارن شكل صفحة قبل وبعد تعديل.",
            mistakes: R`في مشروع حقيقي السكربت كان فيه مسارات كاملة فيها اسم اليوزر على الجهاز، فمش هيشتغل عند حد تاني، و [[$env:TEMP]] بتحل ده. وكان بيسمّي الـ array [[$args]] وده متغير محجوز. ومكانش بيمسح الصورة القديمة، فالـ OK كان ممكن يكذب. وخلي بالك إن [[-ArgumentList]] في PowerShell 5.1 و 7 (جربته على 7.6) بيلزق العناصر بمسافات من غير علامات تنصيص، فأي مسار فيه مسافة (زي اسم يوزر فيه مسافة) لازم تحطله علامات تنصيص بنفسك جوه العنصر.`
          },
          lines: [
            "فولدر الصور في الـ TEMP بدل مسار ثابت من جهازك.",
            "اعمله لو مش موجود، و [[Out-Null]] يخفي الناتج.",
            "مكان Chrome المعتاد.",
            "لو مش هناك، جرّب مكان نسخة الـ 32 بت.",
            "لستة الصفحات، كل واحدة hashtable.",
            "الرئيسية بمقاس لابتوب.",
            "نفس الصفحة بمقاس موبايل.",
            "صفحة التواصل.",
            "قفلة اللستة.",
            "لكل صفحة...",
            "مسار الصورة.",
            "امسح الصورة القديمة لو موجودة، عشان الفحص بعدين ميتخدعش.",
            "arguments الـ Chrome: من غير نافذة، ومن غير GPU، ومن غير scrollbar...",
            "...وبروفايل منفصل، والمقاس من الـ hashtable...",
            "...و ٤ ثواني تحميل، ومكان الصورة، واللينك.",
            "شغّل Chrome واستنى لحد ما يخلص.",
            "الصورة اتعملت؟ اطبع OK، أو FAIL بالأحمر.",
            "آخر اللوب.",
            "افتح فولدر الصور في Explorer."
          ],
          sol: R`شغّل موقعك ([[npm run dev]] مثلًا على 3000) وبعدين السكربت. هيطبع [[OK   home.png]] و [[OK   home-m.png]] و [[OK   contact.png]] بالأخضر، وفي الآخر يفتح فولدر [[%TEMP%\shots]]. Chrome نفسه ممكن يطبع سطر زيادة فيه «written to file»، ده طبيعي.

الصورة الأولى عرضها 1440 والتانية 390، ولو موقعك responsive فيه viewport meta و media queries، صورة الموبايل هتبان بالـ menu المقفول والعناصر تحت بعض. لو الصورتين شكلهم واحد متصغّر، يبقى الـ CSS مش responsive أو مفيش viewport meta. ولو كله OK بس الصور فيها «This site can't be reached»، السيرفر مكانش شغال، لأن Chrome بيصوّر صفحة الـ error عادي. و [[FAIL]] مع error إن الملف مش موجود معناه مسار Chrome غلط عندك.`
        },
        {
          cmd: "Get-Service",
          title: "خدمات ويندوز",
          desc: R`الخدمات (services) برامج ويندوز بيشغّلها في الخلفية من غير نافذة، زي Windows Update والطباعة و Docker و Postgres لو متسطب كخدمة. [[Get-Service]] بيعرضها بعمود [[Status]] (Running أو Stopped) و [[Name]] (الاسم القصير اللي بتستخدمه في الأوامر) و [[DisplayName]] (الاسم الطويل). المقابل في لينكس [[systemctl list-units --type=service]].

[[Where-Object Status -eq Running]] الشغالة بس، و [[*docker*]] أي خدمة اسمها فيه docker (النجوم wildcard). و [[Restart-Service]] بيوقف الخدمة ويشغّلها تاني، ومعاه [[Start-Service]] و [[Stop-Service]].

تحذير: Start و Stop و Restart محتاجين PowerShell مفتوح كأدمن، وإلا هيطلع error فيه «Cannot open ... service». وقبل ما توقف خدمة متعرفهاش، اقرا DisplayName بتاعها، فيه خدمات النظام محتاجها. والأوامر دي ويندوز بس.`,
          example: R`Get-Service | Where-Object Status -eq Running
Get-Service *docker*
Restart-Service com.docker.service`,
          try: "اعرف حالة خدمة Docker أو أي خدمة عندك.",
          deep: {
            why: R`Docker مش شغال، أو Postgres المتسطب على الجهاز ماسك بورت 5432، أو الطباعة واقفة: كلها خدمات ويندوز. Get-Service بيوريك حالتها، و Restart-Service يعيد تشغيلها، زي [[systemctl status]] و [[systemctl restart]] في لينكس.`,
            how: R`[[Get-Service]] كل الخدمات. [[Get-Service -Name "wuauserv"]] خدمة معينة. الـ Status بيه Running وStopped وPaused.

[[Start-Service]]، [[Stop-Service]]، [[Restart-Service]] محتاجوا صلاحيات Admin.

[[Set-Service -StartupType Automatic]] يخلي الخدمة تبدأ مع ويندوز.

وكمان: [[sc.exe query]] و[[sc.exe start]] أوامر CMD بتشتغل في PowerShell وبعض الناس تعوّدت عليهم.`,
            when: "تشغيل وإيقاف خدمات ويندوز. تجهيز سيرفر ويندوز.",
            mistakes: "محاولة تشغيل أو إيقاف خدمة من PowerShell عادي. لازم RunAs Administrator."
          },
          lines: [
            "الخدمات الشغالة بس.",
            "أي خدمة اسمها فيه docker.",
            "اعمل ريستارت لخدمة Docker (محتاج PowerShell كمدير)."
          ],
          sol: R`[[Get-Service *docker*]] بيطلع جدول [[Status  Name  DisplayName]]، زي [[Running  com.docker.service  Docker Desktop Service]]. لو مطلعش حاجة يبقى Docker Desktop مش متسطب أو نسختك مش بتسطب خدمة بالاسم ده، جرب أي خدمة موجودة زي [[Get-Service Spooler]] (خدمة الطباعة) أو [[Get-Service wuauserv]] (Windows Update).

Status بيبقى Running أو Stopped. و [[Restart-Service]] من غير أدمن هيطلع error فيه [[Cannot open ... service on computer '.']]، مش معناه إن الخدمة بايظة، معناه إنك محتاج تفتح PowerShell كأدمن. و Get-Service على ويندوز بس، على لينكس المقابل [[systemctl status]].`
        }
      ]
    }
  ]
});
