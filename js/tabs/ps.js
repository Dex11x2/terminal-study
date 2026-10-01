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
          sol: R`[[Get-Alias -Definition Get-Content]] على ويندوز بيطلع 3 سطور: [[cat -> Get-Content]] و [[gc -> Get-Content]] و [[type -> Get-Content]]. [[type]] جاية من أيام CMD، و [[cat]] عشان اللي جاي من لينكس، و [[gc]] الاختصار الرسمي من أول حروف الفعل والاسم.

جربتها على PowerShell 7 على لينكس فطلع [[gc]] و [[type]] بس، لأن على لينكس والماك PowerShell بيشيل الـ aliases اللي ليها نفس اسم أمر حقيقي في النظام زي [[cat]] و [[ls]]. عشان كده في سكربت هيشتغل على أكتر من نظام اكتب الاسم الكامل [[Get-Content]]. ولو كتبت [[Get-Alias Get-Content]] من غير [[-Definition]] هيطلعلك error، لأنه بيدوّر على alias اسمه Get-Content مش على aliases بتشاور عليه.`
        },
        {
          cmd: "Get-Help",
          title: "اقرا الشرح والأمثلة",
          desc: R`[[Get-Help]] هو الـ [[man]] بتاع PowerShell: بتديله اسم أي أمر فيطبعلك بيعمل إيه والـ parameters بتاعته وشكل كتابته. أهم إضافة ليه [[-Examples]]: بتعرض أمثلة جاهزة مترقمة، كل مثال الأمر وتحته شرحه، من غير باقي الكلام الطويل، ودي أسرع طريقة تتعلم بيها أمر جديد. و [[-Online]] بتفتح صفحة الأمر على موقع Microsoft Learn في المتصفح، ودي دايمًا أحدث وأشمل نسخة.

فيه كمان [[-Full]] للشرح كامل، و [[-Parameter Recurse]] لشرح parameter واحد بس. واختصارات سريعة: [[help Copy-Item]] (بيعرض صفحة صفحة) أو [[Copy-Item -?]].

أول مرة غالبًا هتلاقي فوق الشرح جملة «It is displaying only partial help»، لأن ملفات المساعدة الكاملة مش بتيجي مع ويندوز. شغّل [[Update-Help]] مرة واحدة (في PowerShell 7 مش محتاج أدمن، في 5.1 محتاج PowerShell كأدمن). ولو مستعجل، [[-Online]] شغالة من غير أي تحميل.`,
          example: R`Get-Help Copy-Item -Examples
Get-Help Get-ChildItem -Online`,
          try: "اقرا أمثلة [[Remove-Item]] قبل ما تستخدمه.",
          deep: {
            why: "أي أمر محتاج تعرف parameters بتاعه أو مثال عليه. Get-Help هو man في PowerShell.",
            how: R`[[Get-Help Get-ChildItem]] بيعرض المساعدة. [[-Examples]] بيوريك أمثلة فقط. [[-Online]] بيفتح الصفحة الرسمية في المتصفح، وده دايمًا الأشمل.

أول مرة ممكن المساعدة تكون فاضية أو قديمة، عمل [[Update-Help]] (بصلاحيات) يحمّل المساعدة الكاملة.

وتقدر تكتب اسم أمر وبعده [[?]] علامة استفهام في بعض الإصدارات.`,
            when: "مش فاكر الـ parameter الصح. أو عايز مثال على استخدام معين.",
            mistakes: "إنك تدوّر في جوجل وتنسى إن المساعدة موجودة جوه PowerShell نفسه."
          },
          lines: [
            "أمثلة استخدام Copy-Item بس، من غير باقي الشرح.",
            "افتح الصفحة الرسمية في المتصفح، ودي دايمًا أحدث وأشمل."
          ],
          sol: R`[[Get-Help Remove-Item -Examples]] المفروض يطلع أمثلة مترقمة زي [[Example 1: Delete files that have any file name extension]] وتحت كل واحد الأمر وشرحه، ومنها أمثلة فيها [[-Include]] و [[-Exclude]] و [[-Recurse]] و [[-Force]] للملفات المخفية أو read-only. لاحظ إن كل أمثلة المسح الخطيرة ممكن تجربها الأول بـ [[-WhatIf]].

لو طلعلك [[Get-Help cannot find the Help files for this cmdlet on this computer. It is displaying only partial help.]] ومعاه الاسم والـ aliases بس ([[ri]] و [[del]] و [[rd]] و [[erase]])، يبقى الـ help مش متحمّل. شغّل [[Update-Help]] (في PowerShell 7 بيتحمّل للمستخدم الحالي ومش محتاج أدمن، في 5.1 محتاج أدمن)، أو استخدم [[Get-Help Remove-Item -Online]] يفتحلك صفحة Microsoft Learn.`
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
          sol: R`[[Get-Command *service*]] على ويندوز هيطلع جدول [[CommandType  Name]] فيه الـ cmdlets: [[Get-Service]] و [[New-Service]] و [[Remove-Service]] و [[Restart-Service]] و [[Resume-Service]] و [[Set-Service]] و [[Start-Service]] و [[Stop-Service]] و [[Suspend-Service]]، وممكن معاهم برامج (Application) من الـ PATH اسمها فيه service.

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

[["5" + 1]] طبع [[51]]: الشمال نص فالـ [[+]] لزق. و [[[int]"5" + 1]] طبع [[6]]. القاعدة دي (نوع الشمال هو اللي بيحدد) مشروحة في «عوامل المقارنة». جربت كل ده على PowerShell 7.`
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
          sol: R`جربتها: [[Push-Location /tmp]] وبعدين [[Push-Location /usr]] (على ويندوز استخدم [[C:\Windows]] و [[C:\Users]] مثلًا). [[Get-Location -Stack]] بيوريك المكانين المحفوظين، وأول [[Pop-Location]] رجعني [[/tmp]] (المكان اللي كنت فيه قبل آخر push)، والتاني رجعني للفولدر اللي بدأت منه.

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
            "انقل كل .log لفولدر logs.",
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

في السطر الأول [[$pkg]] متغير (أي اسم بيبدأ بـ [[$]])، و [[=]] بتحط فيه الناتج. [[-Raw]] بتقرا الملف كله نص واحد (من غيرها Get-Content بيرجع سطور منفصلة، و ConvertFrom-Json في 5.1 ممكن يتلخبط منها). والـ [[|]] بتبعت النص لـ ConvertFrom-Json.

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

[[-Raw]] بيقرا الملف كله كنص واحد بدل array سطور. في PowerShell 7 الأمر اشتغل معايا من غيرها برضه، لكن في 5.1 ممكن يطلع error، فخليها عادة. ولو [[$pkg.name]] رجع فاضي، يبقى انت مش في فولدر المشروع أو كتبت الاسم غلط؛ PowerShell مش بيطلع error لما property مش موجودة، بيرجع null بس.`
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

الرقم ممكن يختلف شوية عن «Size on disk» في Explorer، لأن Explorer بيحسب حجم الـ clusters على الديسك. وعلى لينكس والماك ضيف [[-Force]] عشان الملفات اللي بتبدأ بنقطة متتشالش من الحساب. ولو كتبت [[Measure-Object -Sum]] من غير [[Length]] هيطلع error أو يحاول يجمع الـ objects نفسها.`,
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

في PowerShell 7: [[-Parallel { ... } -ThrottleLimit 5]] بيشغّل لحد ٥ عناصر في نفس الوقت، مفيد مع طلبات شبكة كتير. جوه الـ Parallel المتغيرات اللي بره مش بتتشاف إلا بـ [[$using:name]].`,
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

لو ملقاش حاجة هيقولك [[No MSFT_NetTCPConnection objects found with property 'LocalPort' equal to '3000']]، يعني مفيش حد بيسمع على البورت (أو السيرفر لسه بيقوم). و Get-NetTCPConnection موجود على ويندوز بس (جوه PowerShell 5.1 و 7)، على لينكس والماك استخدم [[ss -tlnp]] أو [[lsof -i :3000]].`
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
            mistakes: R`في مشروع حقيقي السكربت كان فيه مسارات كاملة فيها اسم اليوزر على الجهاز، فمش هيشتغل عند حد تاني، و [[$env:TEMP]] بتحل ده. وكان بيسمّي الـ array [[$args]] وده متغير محجوز. ومكانش بيمسح الصورة القديمة، فالـ OK كان ممكن يكذب. وخلي بالك إن [[-ArgumentList]] في PowerShell 5.1 بيلزق العناصر بمسافات من غير علامات تنصيص، فأي مسار فيه مسافة (زي اسم يوزر فيه مسافة) لازم تحطله علامات تنصيص بنفسك جوه العنصر.`
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
    },
    {
      t: "الشبكة",
      l: 2,
      n: "",
      items: [
        {
          cmd: "Test-NetConnection",
          title: "ping واختبار بورت",
          desc: R`[[Test-NetConnection]] (اختصاره [[tnc]]) بيجاوب على سؤالين: الجهاز ده بيرد؟ والبورت ده مفتوح؟ من غير [[-Port]] بيعمل ping ويقولك [[PingSucceeded]]. ومع [[-Port 22]] بيحاول يفتح اتصال TCP على البورت ده ويقولك [[TcpTestSucceeded : True]] لو نجح، زي [[nc -zv host 22]] في لينكس.

الـ IP اللي في المثال [[203.0.113.10]] رقم للأمثلة بس، حط مكانه IP سيرفرك. و [[localhost]] يعني جهازك نفسه، فالسطر التالت بيتأكد إن Postgres شغال وسامع على 5432 قبل ما تلوم الكود.

افهم الـ False صح: [[TcpTestSucceeded : False]] معناها إن الاتصال ماتمش، والسبب ممكن firewall قافل، أو مفيش برنامج شغال على البورت ده أصلًا. وممكن ياخد ثواني قبل ما يرد. الأمر ده ويندوز بس، وفي PowerShell 7 على أي نظام فيه [[Test-Connection host -TcpPort 22]].`,
          example: R`Test-NetConnection google.com
Test-NetConnection 203.0.113.10 -Port 22
Test-NetConnection localhost -Port 5432`,
          try: "اختبر إن بورت 22 و 443 مفتوحين على سيرفرك.",
          deep: {
            why: R`قبل ما تقعد ساعة تدوّر في الكود ليه التطبيق مش واصل لقاعدة البيانات أو للسيرفر، اتأكد إن الاتصال نفسه شغال. Test-NetConnection بيجاوب في سطر: الجهاز بيرد؟ والبورت مفتوح؟ زي ping و [[nc -zv]] مع بعض.`,
            how: R`[[Test-NetConnection google.com]] بيعمل ping. [[-Port 443]] بيجرّب اتصال TCP على البورت. الناتج object بيه [[TcpTestSucceeded]] (True/False)، و[[PingSucceeded]]، ورقم PingReplyDetails.

[[Test-NetConnection -ComputerName db.server.com -Port 5432]] تتأكد إن قاعدة البيانات وصولها تمام.

على عكس nc في bash، Test-NetConnection موجود افتراضيًا في ويندوز.`,
            when: "ECONNREFUSED أو timeout. تتأكد إن firewall مش بيقفل بورت. قبل ما تشتكي من الكود، تتأكد من الاتصال.",
            mistakes: "تفتكر TcpTestSucceeded=False معناها الجهاز التاني مش شغال. ممكن الجهاز شغال والبورت مقفول."
          },
          lines: [
            "ping ومعلومات الاتصال في أمر واحد.",
            "جرّب بورت 22 على السيرفر: TcpTestSucceeded True يعني مفتوح (زي nc -zv).",
            "قاعدة البيانات المحلية بتسمع؟"
          ],
          sol: R`[[Test-NetConnection IP -Port 22]] بيطبع [[ComputerName]] و [[RemoteAddress]] و [[RemotePort : 22]] وفي الآخر [[TcpTestSucceeded : True]] لو البورت مفتوح. اعمل نفس الحكاية مع [[-Port 443]].

لو البورت مقفول أو فيه firewall، هيطبع [[WARNING: TCP connect to (IP : 443) failed]] و [[TcpTestSucceeded : False]]، وممكن ياخد ثواني قبل ما يرد. False ممكن معناها إن مفيش حاجة شغالة على البورت ده (مثلًا Nginx مش شغال على 443) مش بس firewall. و Test-NetConnection موجود على ويندوز بس؛ في PowerShell 7 على أي نظام فيه [[Test-Connection IP -TcpPort 22]].`
        },
        {
          cmd: "Invoke-RestMethod",
          title: "كلّم API",
          desc: "[[irm]] اختصار، وبيحوّل JSON لـ object لوحده. في Windows PowerShell 5 كلمة [[curl]] alias لـ Invoke-WebRequest، فاكتب [[curl.exe]] لو عايز curl الحقيقي. وفي 5.1 ضيف [[-UseBasicParsing]] لـ Invoke-WebRequest عشان ميطلعلكش تحذير أمان يوقف السكربت، و [[$ProgressPreference = 'SilentlyContinue']] عشان التحميل ميبقاش بطيء جدًا.",
          example: R`$u = irm https://api.github.com/users/octocat
$u.public_repos
Invoke-RestMethod -Uri http://localhost:3000/api/users -Method Post -ContentType "application/json" -Body '{"name":"test"}'
Invoke-WebRequest https://example.com/file.zip -OutFile file.zip`,
          try: "هات بيانات GitHub بتاعك واطبع عدد الـ repos.",
          deep: {
            why: R`بتختبر API عملته، أو سكربت محتاج يجيب بيانات من GitHub أو يبعت رسالة لـ webhook. Invoke-RestMethod زي curl، بس الرد JSON بيرجع object على طول تقرا منه بالنقطة من غير jq.`,
            how: R`[[Invoke-RestMethod]] بيبعت HTTP request ولو الرد JSON بيحوّله تلقائيًا لـ object. مش محتاج ConvertFrom-Json.

[[-Method POST]] و[[-Body ($body | ConvertTo-Json)]] و[[-Headers @{Authorization="Bearer ..."}]] و[[-ContentType "application/json"]] هم اللي بتستخدمهم أكتر.

[[Invoke-WebRequest]] بديل أقل تلقائية: بيرجع object بيه StatusCode والـ Content كـ string، محتاج تحوّله يدويًا. أحسن لو محتاج headers أو status code.`,
            when: "اختبار API. سكربت بيجيب بيانات من API. ديبلوي بيتريجر webhook.",
            mistakes: "نسيان -ContentType مع POST بـ JSON. ومع APIs بتستخدم HTTPS وشهادة self-signed بيطلع error، حلها [[-SkipCertificateCheck]] في PowerShell 7."
          },
          lines: [
            "[[irm]] اختصار Invoke-RestMethod: هات بيانات يوزر، والـ JSON بيتحول object لوحده.",
            "اقرا حقل منه على طول.",
            "طلب POST بـ JSON (زي curl -X POST -d).",
            "نزّل ملف واحفظه (زي wget)."
          ],
          sol: R`[[(irm https://api.github.com/users/YOUR_NAME).public_repos]] بيطبع رقم زي [[12]]. الـ API بيرجع JSON و irm بيحوله لـ PSCustomObject على طول، فبتوصل للقيمة بالنقطة. جربت نفس الفكرة على سيرفر محلي بيرجع JSON فيه public_repos بـ 8، فطلع [[8]] ونوع الناتج PSCustomObject.

الرقم ده الـ repos العامة بس، الـ private مش محسوبة. لو طلعلك [[Not Found]] يبقى اسم المستخدم غلط. ولو [[API rate limit exceeded]] يبقى عملت أكتر من 60 طلب في الساعة من غير توكن، استنى شوية.`
        },
        {
          cmd: "ssh / scp",
          title: "موجودين في ويندوز 10 و 11",
          desc: R`ويندوز 10 و 11 جايين بـ OpenSSH client مبني جوّاهم، فـ [[ssh]] و [[scp]] و [[ssh-keygen]] نفس أوامر لينكس بالظبط ومن غير PuTTY. [[ssh-keygen -t ed25519]] بيعمل زوج مفاتيح من النوع ed25519 (الأحدث والأنصح)، وبيحفظهم في [[$HOME\.ssh]]: [[id_ed25519]] (الخاص، متبعتهوش لحد) و [[id_ed25519.pub]] (العام، ده اللي بيتحط على السيرفر).

[[ssh root@203.0.113.10]] يعني ادخل على السيرفر ده باليوزر root (الـ [[@]] بتفصل اليوزر عن العنوان). و [[scp]] بينسخ ملف: المصدر الأول ([[.\dist.zip]] من جهازك)، والهدف بالشكل [[user@server:/path]]، والنقطتين [[:]] بتفصل السيرفر عن المسار اللي عليه.

الفرق الوحيد عن لينكس: مفيش [[ssh-copy-id]]، فالمفتاح العام بتنقله بإيدك (الحل في «جرّب»). ولو [[ssh]] مش موجود، سطّب OpenSSH Client من Settings، Optional features.`,
          example: R`ssh-keygen -t ed25519
ssh root@203.0.113.10
scp .\dist.zip root@203.0.113.10:/var/www/`,
          try: "ادخل سيرفرك من PowerShell مباشرة.",
          deep: {
            why: R`ويندوز ١٠ و ١١ فيهم SSH client مبني جوه (OpenSSH)، فبتدخل سيرفرات لينكس وترفع ملفات من PowerShell على طول من غير PuTTY ولا WinSCP.`,
            how: R`نفس أوامر SSH بالظبط زي Linux: [[ssh user@server]]، [[scp file user@server:/path]].

المفاتيح بتتحفظ في [[~/.ssh/]] زي Linux. [[ssh-keygen]] بيشتغل. [[ssh-copy-id]] ممكن مش موجودة بس تقدر تعمل نفس الحاجة يدويًا: تنسخ محتوى [[~/.ssh/id_rsa.pub]] وتلزقه في [[~/.ssh/authorized_keys]] على السيرفر.

المفاتيح المحفوظة في Windows Credential Manager أو بـ [[ssh-agent]] مش محتاج تدخل passphrase كل مرة.`,
            when: "الدخول على سيرفرات لينكس من ويندوز بدون PuTTY. نقل ملفات لسيرفر.",
            mistakes: "permissions على ملف المفتاح الخاص: على ويندوز المفروض يكون بـ Full Control لصاحبه بس. لو SSH رفض المفتاح، بص على permissions."
          },
          lines: [
            "اعمل مفاتيح SSH (نفس الأمر زي لينكس، OpenSSH مبني في ويندوز).",
            "ادخل السيرفر.",
            "ارفع ملف للسيرفر."
          ],
          sol: R`أول مرة [[ssh root@IP]] هيسألك [[The authenticity of host ... can't be established.]] ومعاه fingerprint، اكتب [[yes]]، وبعدها الـ prompt يبقى بتاع السيرفر زي [[root@server:~#]]. [[exit]] يرجعك PowerShell.

لو قالك [[ssh : The term 'ssh' is not recognized]] يبقى OpenSSH Client مش متسطب: من Settings، Optional features، OpenSSH Client. ولو [[Permission denied (publickey)]] يبقى المفتاح العام مش في السيرفر، وويندوز مفيهوش [[ssh-copy-id]]، فابعته كده: [[type $HOME\.ssh\id_ed25519.pub | ssh root@IP "cat >> ~/.ssh/authorized_keys"]] (محتاج باسورد أو دخول تاني للسيرفر).`
        }
      ]
    },
    {
      t: "الشبكات بعمق",
      l: 2,
      n: "",
      items: [
        {
          cmd: "Get-NetIPAddress",
          title: "عناوينك وإعدادات الشبكة",
          desc: R`عشان تعرف عنوانك على الشبكة: [[Get-NetIPConfiguration]] بيعرض لكل كارت شبكة (Wi-Fi أو Ethernet) الـ IP بتاعه، والـ gateway (الراوتر)، والـ DNS، في مكان واحد، وده المقابل لـ [[ipconfig]] في CMD و [[ip a]] في لينكس.

[[Get-NetIPAddress -AddressFamily IPv4]] العناوين بس من نوع IPv4 (من غير IPv6 الطويلة)، و [[Select-Object InterfaceAlias, IPAddress]] بيعرض اسم الكارت والعنوان بس. و [[Get-NetRoute -DestinationPrefix 0.0.0.0/0]] بيجيب الـ default route، يعني «أي حاجة رايحة للنت بتعدّي منين»، وعمود NextHop فيه IP الراوتر.

السطر الأخير بيسأل موقع خارجي «انا جايلك من أنهي IP؟» فيرجعلك الـ IP العام، و [[.Trim()]] بتشيل سطر جديد في الآخر. المحلي (زي 192.168.1.15) والعام مختلفين لأن الراوتر بيخبّي كل أجهزة البيت ورا IP واحد. والأوامر دي ويندوز بس، وهتلاقي كروت افتراضية كتير زي vEthernet (WSL)، دي مش اتصالك الحقيقي.`,
          example: R`Get-NetIPConfiguration
Get-NetIPAddress -AddressFamily IPv4 | Select-Object InterfaceAlias, IPAddress
Get-NetRoute -DestinationPrefix 0.0.0.0/0
(Invoke-RestMethod https://ifconfig.me/ip).Trim()`,
          try: "اعرف الـ IP المحلي والعام والـ gateway.",
          deep: {
            why: R`عايز تفتح موقعك من الموبايل على نفس الواي فاي (محتاج IP جهازك)، أو تتأكد إن الجهاز واخد IP من الراوتر، أو تعرف الـ IP العام عشان تحطه في firewall سيرفر. زي [[ip a]] و [[ip route]] في لينكس.`,
            how: R`[[Get-NetIPAddress]] بيعرض كل عناوين IPv4 وIPv6. [[-AddressFamily IPv4]] بس IPv4. [[-InterfaceAlias "Wi-Fi"]] لكارت معين.

[[Get-NetAdapter]] بيعرض الكروت نفسها: حالتها وسرعتها والـ MAC.

والعنوان الخاص: [[Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*"}]].`,
            when: "تعرف عنوانك على الشبكة. تتأكد إن كارت معين شغال.",
            mistakes: "إنك تنسى إن ويندوز بييجي بـ Loopback وTunneling adapters كتير، فيه زحمة في النتايج. فلتر بـ -InterfaceAlias."
          },
          lines: [
            "ملخص الشبكة: الـ IP والـ gateway والـ DNS لكل كارت (زي ip a).",
            "عناوين IPv4 بس مع اسم الكارت.",
            "الراوت الافتراضي، يعني الـ gateway (زي ip route).",
            "عنوانك العام على النت. [[.Trim()]] يشيل سطر جديد في الآخر."
          ],
          sol: R`[[Get-NetIPConfiguration]] هيطلع لكل كارت [[InterfaceAlias]] (زي Wi-Fi أو Ethernet)، و [[IPv4Address]] زي [[192.168.1.15]] (المحلي)، و [[IPv4DefaultGateway]] زي [[192.168.1.1]] (الراوتر)، و [[DNSServer]]. و [[(Invoke-RestMethod https://ifconfig.me/ip).Trim()]] بيطبع IP عام مختلف تمامًا.

الاتنين مختلفين لأن الراوتر بيعمل NAT: كل أجهزة البيت ليها IP محلي، وكلهم بيطلعوا للنت بنفس الـ IP العام. هتلاقي كمان كروت زي [[vEthernet (WSL)]] بـ IP زي 172.x، دي شبكات افتراضية مش هي اللي انت عايزها. ولو الـ IPv4 بيبدأ بـ [[169.254]] يبقى الجهاز مخدش IP من الراوتر أصلًا.`
        },
        {
          cmd: "Resolve-DnsName",
          title: "DNS",
          desc: R`DNS هو اللي بيحوّل اسم زي example.com لـ IP. [[Resolve-DnsName]] بيسأل الـ DNS ويوريك الرد، زي [[dig]] في لينكس و [[nslookup]] في CMD. من غير إضافات بيجيب سجلات [[A]] (عناوين IPv4) و [[AAAA]] (IPv6).

[[-Server 1.1.1.1]] بيسأل سيرفر DNS معين (1.1.1.1 بتاع Cloudflare و 8.8.8.8 بتاع Google) بدل اللي جهازك بيستخدمه، فتعرف المشكلة عندك ولا في الدومين نفسه. و [[-Type MX]] بيجيب نوع سجل تاني: MX سيرفرات الإيميل، و TXT للتحقق (SPF وغيره)، و CNAME للاسم البديل.

[[Clear-DnsClientCache]] بيمسح الردود اللي ويندوز حافظها، زي [[ipconfig /flushdns]]، ودي أول حاجة لو غيّرت الـ DNS بتاع دومين ولسه بيفتح القديم. محتاج أدمن، والأوامر دي ويندوز بس.`,
          example: R`Resolve-DnsName example.com
Resolve-DnsName example.com -Server 1.1.1.1
Resolve-DnsName example.com -Type MX
Clear-DnsClientCache`,
          try: "قارن رد 1.1.1.1 و 8.8.8.8 لدومين عندك.",
          deep: {
            why: R`غيّرت الـ DNS بتاع دومين ولسه بيفتح السيرفر القديم، أو الإيميل مش واصل، أو عايز تتأكد إن الدومين بيشاور على السيرفر الصح قبل ما تعمل شهادة SSL. Resolve-DnsName بيوريك الرد بالظبط ومن أنهي DNS، زي [[dig]] في لينكس.`,
            how: R`[[Resolve-DnsName example.com]] بيجيب الـ A records (IPs). [[-Type MX]] لسيرفرات الإيميل. [[-Type TXT]] للتحقق. [[-Server 8.8.8.8]] يسأل سيرفر محدد.

[[Resolve-DnsName example.com -Server 1.1.1.1]] يسأل Cloudflare وتقارن بالنتيجة من DNS الـ default.`,
            when: "نفس استخدامات dig في bash. DNS لسه مش منتشر. تتأكد من MX records.",
            mistakes: "nslookup كمان موجود في PowerShell وأسهل بس أقل تفصيل."
          },
          lines: [
            "الدومين بيشاور على أنهي IP (زي dig).",
            "اسأل Cloudflare بدل الـ DNS بتاعك، للمقارنة.",
            "سيرفرات الإيميل.",
            "امسح كاش الـ DNS (زي ipconfig /flushdns)."
          ],
          sol: R`[[Resolve-DnsName yourdomain.com -Server 1.1.1.1]] و [[-Server 8.8.8.8]] المفروض الاتنين يطلعوا جدول [[Name  Type  TTL  Section  IPAddress]] بنفس الـ IPAddress. الـ TTL ممكن يختلف لأن كل واحد عنده الكاش بتاعه وفاضله وقت مختلف.

لو الـ IP مختلف: إما غيرت الـ DNS قريب والتغيير لسه بينتشر (استنى الـ TTL القديم)، أو الدومين ورا CDN بيدي IPs مختلفة حسب المكان. ولو طلعلك [[DNS name does not exist]] يبقى الـ record مش موجود فعلًا. ولو timeout مع السيرفرين العامين بس، شبكتك غالبًا بتقفل DNS الخارجي. والأمر ده ويندوز بس، المقابل على لينكس والماك [[dig @1.1.1.1 yourdomain.com]].`
        },
        {
          cmd: "hosts",
          title: "ملف hosts في ويندوز",
          desc: R`ملف [[hosts]] بيخلّي جهازك يربط اسم دومين بـ IP بنفسه قبل ما يسأل أي DNS، زي [[/etc/hosts]] في لينكس بالظبط. مكانه على ويندوز [[C:\Windows\System32\drivers\etc\hosts]] (من غير امتداد). كل سطر فيه IP وبعده مسافة والاسم، والسطور اللي بتبدأ بـ [[#]] تعليقات.

[[Get-Content]] بيعرضه عادي من غير صلاحيات. لكن التعديل محتاج أدمن، عشان كده السطر التاني [[Start-Process notepad ... -Verb RunAs]]: بيفتح Notepad كأدمن (هيطلع سؤال UAC) والملف جواه، فتقدر تحفظ.

استخدامات: [[127.0.0.1 myapp.local]] دومين محلي للتطوير، أو تجرّب موقعك على سيرفر جديد قبل ما تنقل الـ DNS. وخلي بالك: Notepad ممكن يحفظه [[hosts.txt]] لو مختارتش All Files، وساعتها مش هيشتغل. وبعد التعديل لو المتصفح لسه فاكر القديم: [[Clear-DnsClientCache]].`,
          example: R`Get-Content C:\Windows\System32\drivers\etc\hosts
Start-Process notepad C:\Windows\System32\drivers\etc\hosts -Verb RunAs`,
          try: "ضيف [[127.0.0.1 myapp.local]] وافتح http://myapp.local:3000 وانت مشغّل سيرفر محلي.",
          deep: {
            why: "تغيير DNS لدومين على جهازك بس، من غير ما تغيّر الـ DNS الحقيقي.",
            how: R`ملف الـ hosts في ويندوز: [[C:\Windows\System32\drivers\etc\hosts]]. نفس الفكرة زي [[/etc/hosts]] في لينكس.

بس تعديله محتاج صلاحيات Admin. في VS Code: افتحه بـ «Open with Code as Administrator». أو PowerShell كمدير ثم:

[[Add-Content C:\Windows\System32\drivers\etc\hosts "203.0.113.10 example.com"]]

ويندوز بيقرا التعديل فورًا، بس لو المتصفح لسه فاكر القديم اعمل [[ipconfig /flushdns]] وافتح المتصفح تاني.`,
            when: "تجرّب موقع على سيرفر جديد قبل نقل الـ DNS. تعمل دومين محلي للتطوير.",
            mistakes: "تحاول تعدّله بدون صلاحيات فيطلع Access Denied. وكتابة غلط في الملف تسبب مشاكل في الشبكة."
          },
          lines: ["اعرض ملف hosts.", "افتحه في Notepad كمدير عشان تقدر تحفظ."],
          sol: R`افتح notepad كأدمن بالأمر التاني، ضيف في الآخر سطر [[127.0.0.1 myapp.local]] واحفظ. بعدها [[ping myapp.local]] المفروض يرد من 127.0.0.1، و http://myapp.local:3000 يفتح نفس اللي بيفتحه localhost:3000.

لو notepad رفض الحفظ، يبقى مفتحتوش كأدمن. ولو حفظته واتسمّى [[hosts.txt]] يبقى notepad زوّد الامتداد، اختار All Files. ولو ping شغال والمتصفح لأ، امسح الكاش بـ [[Clear-DnsClientCache]] أو جرب نافذة Incognito. ولو Vite رد بـ [[Blocked request. This host ("myapp.local") is not allowed.]]، ده حماية في Vite، ضيف الاسم في [[server.allowedHosts]] في vite.config.`
        },
        {
          cmd: "Test-NetConnection -TraceRoute",
          title: "الطريق لحد السيرفر",
          desc: R`[[-TraceRoute]] بيوريك الطريق اللي الباكت بيمشيه من جهازك لحد السيرفر: كل راوتر في السكة (اسمه hop) في سطر. ده نفس [[tracert]] في CMD و [[traceroute]] في لينكس. لو الموقع بطيء أو مش بيفتح، بتعرف الطريق بيقف عند أنهي نقطة: عندك، عند مزوّد النت، ولا قريب من السيرفر.

السطر التاني للسكربتات: [[-Port 443]] يجرّب البورت، و [[-InformationLevel Quiet]] بيخلّي الناتج [[True]] أو [[False]] بس بدل تقرير كامل. فتقدر تحطه جوه [[if]] على طول.

خلي بالك: hop بيظهر فيه timeout أو نجوم مش معناه مشكلة، راوترات كتير مبترودش على الـ trace وبتعدّي الترافيك عادي. المشكلة الحقيقية لما كل اللي بعده يفشل. والأمر ده ويندوز بس.`,
          example: R`Test-NetConnection google.com -TraceRoute
Test-NetConnection 203.0.113.10 -Port 443 -InformationLevel Quiet`,
          try: "اعمل سكربت بيجرب 3 بورتات على سيرفرك ويطبع المقفول بس.",
          deep: {
            why: "تعرف الطريق اللي البيانات بتمر بيه لوصل سيرفر. زي traceroute في لينكس.",
            how: R`[[Test-NetConnection google.com -TraceRoute]] بيعرض كل hop في الطريق. [[-Hops]] يحدد العدد الأقصى.

الأمر القديم [[tracert google.com]] كمان شغال في PowerShell.`,
            when: "الموقع بطيء من مكان معين وعايز تعرف فين المشكلة.",
            mistakes: "النجوم في نص المسار مش معناها مشكلة بالضرورة، بعض الـ routers مش بتردش."
          },
          lines: [
            "الطريق لحد جوجل، راوتر راوتر (زي traceroute).",
            "البورت مفتوح ولا لأ، الإجابة True أو False بس ([[-InformationLevel Quiet]])، مناسب للسكربتات."
          ],
          sol: R`الحل في الـ solCode. [[-InformationLevel Quiet]] بيرجع True أو False بس، فالسكربت بيطبع سطر زي [[CLOSED 443]] للبورتات المقفولة بس، ولو كله مفتوح مش هيطبع حاجة. [[-WarningAction SilentlyContinue]] عشان التحذير الأصفر ميظهرش مع كل بورت مقفول.

ولو عايزه يشتغل في PowerShell 7 على أي نظام، استخدم [[Test-Connection $server -TcpPort $port -Quiet]] (السطر المتعلق عليه). جربت النسخة دي على 127.0.0.1 مع 22 و 5432 و 3917 فطبع [[CLOSED 22]] و [[CLOSED 3917]] بس، لأن Postgres بس اللي كان شغال على 5432. البورت المقفول بياخد وقت لحد ما يستسلم، فمتستغربش لو السكربت بطيء شوية.`,
          solCode: R`$server = "203.0.113.10"
foreach ($port in 22, 80, 443) {
    $open = Test-NetConnection $server -Port $port -InformationLevel Quiet -WarningAction SilentlyContinue
    # PowerShell 7 على أي نظام: $open = Test-Connection $server -TcpPort $port -Quiet -TimeoutSeconds 3
    if (-not $open) { "CLOSED $port" }
}`
        },
        {
          cmd: "Get-NetTCPConnection -State Listen",
          title: "مين بيسمع على أنهي بورت",
          desc: R`[[-State Listen]] من غير رقم بورت بيعرض كل البرامج اللي «سامعة» على بورتات عندك، زي [[ss -tlnp]] في لينكس و [[netstat -ano | findstr LISTENING]] في CMD. أهم عمودين: [[LocalPort]] البورت، و [[LocalAddress]] بيقولك مين يقدر يوصله: [[0.0.0.0]] أو [[::]] معناها أي حد على الشبكة (مكشوف)، و [[127.0.0.1]] أو [[::1]] جوه جهازك بس.

السطر التاني فيه حاجتين جداد: [[[pscustomobject]@{ ... }]] بيعمل object جديد بالأعمدة اللي انت عايزها (هنا Port و App)، والأقواس [[(Get-Process -Id ...).Name]] بتحوّل رقم العملية لاسمها. و [[Sort-Object Port -Unique]] يرتب ويشيل المكرر، لأن البرنامج الواحد غالبًا بيسمع على IPv4 و IPv6.

رقم العملية 4 ده [[System]] (ويندوز نفسه) و 0 ده Idle، عاديين. ولو لقيت قاعدة بيانات زي Postgres سامعة على 0.0.0.0 وانت مش محتاج حد من بره يوصلها، دي ثغرة على أي شبكة عامة.`,
          example: R`Get-NetTCPConnection -State Listen | Select-Object LocalAddress, LocalPort, OwningProcess | Sort-Object LocalPort
Get-NetTCPConnection -State Listen | ForEach-Object { [pscustomobject]@{ Port = $_.LocalPort; App = (Get-Process -Id $_.OwningProcess).Name } } | Sort-Object Port -Unique`,
          try: "اعرف أسامي البرامج اللي فاتحة بورتات عندك.",
          deep: {
            why: R`تعرف كل البرامج اللي فاتحة بورتات على جهازك، ومين فيهم مكشوف لأي حد على نفس الشبكة (مهم على واي فاي كافيه أو شغل). زي [[ss -tlnp]] في لينكس.`,
            how: R`[[-State Listen]] بيفلتر على البورتات اللي بتستمع بس. [[LocalPort]] البورت. [[OwningProcess]] الـ PID اللي ماسكه.

[[Get-NetTCPConnection -State Listen | Select LocalPort, OwningProcess | Sort LocalPort | ForEach-Object { $p = Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue; [PSCustomObject]@{Port=$_.LocalPort; Process=$p.Name} }]] بيوريك البورت واسم البرنامج.`,
            when: "EADDRINUSE. تشوف مين ماسك أي بورت.",
            mistakes: "OwningProcess = 4 ده System، و0 ده Idle. عاديين."
          },
          lines: [
            "كل البورتات اللي بتسمع، مع رقم العملية، مرتبة بالبورت.",
            "نفس الحاجة بس بدل رقم العملية اسمها: لكل اتصال اعمل object جديد فيه البورت واسم البرنامج."
          ],
          sol: R`التاني في المثال هو الحل. هيطلع جدول [[Port  App]] مترتب، زي [[135 svchost]] و [[445 System]] و [[5432 postgres]] و [[3000 node]]. [[-Unique]] بيشيل التكرار لأن البرنامج الواحد ممكن يسمع على IPv4 و IPv6.

البورتات الصغيرة زي 135 و 445 تبع ويندوز نفسه، سيبهم. رقم العملية 4 اسمه [[System]]، و 0 اسمه [[Idle]]. ولو ظهر error [[Cannot find a process with the process identifier]]، البرنامج اتقفل بين الأمرين، شغّل تاني. ولو عايز تعرف مين مكشوف للشبكة ضيف عمود [[LocalAddress]] وشوف مين عليه [[0.0.0.0]] أو [[::]].`
        },
        {
          cmd: "ssh -L",
          title: "SSH tunnel من ويندوز",
          desc: R`الـ tunnel بيخليك توصل لخدمة جوه السيرفر (زي Postgres على 5432) كأنها على جهازك، من غير ما تفتح البورت بتاعها للنت. نفس أمر لينكس بالظبط، شغال من PowerShell.

[[-L 5433:127.0.0.1:5432]] معناها: افتح بورت 5433 على جهازي، وأي حاجة توصله ابعتها جوه اتصال SSH للسيرفر، والسيرفر يوصّلها لـ 127.0.0.1:5432 عنده (يعني Postgres اللي على السيرفر نفسه). و [[-N]] يعني متفتحليش shell على السيرفر، أنا عايز الـ tunnel بس. و [[deploy@203.0.113.10]] اليوزر والسيرفر.

استخدمنا 5433 مش 5432 عشان لو عندك Postgres محلي ميحصلش تعارض. النافذة هتفضل واقفة من غير ما تطبع حاجة وده معناه إنه شغال، وتقفل الـ tunnel بـ Ctrl+C. وصّل DBeaver أو pgAdmin على [[localhost:5433]].`,
          example: "ssh -N -L 5433:127.0.0.1:5432 deploy@203.0.113.10",
          try: "افتح tunnel ووصّل بيه DBeaver على localhost:5433.",
          deep: {
            why: "SSH tunnel من ويندوز. نفس الفكرة بالظبط زي bash: بتتصل بسيرفر وبيفتح بورت محلي بيوصلك لخدمة داخلية.",
            how: R`[[ssh -N -L 5433:127.0.0.1:5432 deploy@203.0.113.10]] نفس الأمر بالظبط زي لينكس. OpenSSH في ويندوز بيدعم كل الـ options.

افتح في PowerShell، واتركه شغال، وافتح DB client على localhost:5433.`,
            when: "تفتح قاعدة بيانات سيرفر من pgAdmin أو DBeaver على ويندوز.",
            mistakes: "نفس غلطات bash: تنسى -N فيفتح terminal على السيرفر. وتنسى إنه شغال في الخلفية."
          },
          lines: ["نفس الممر زي لينكس بالظبط: بورت 5433 عندك يوصل لـ 5432 على السيرفر."],
          sol: R`الأمر مش بيطبع حاجة بعد ما تدخل، والنافذة بتفضل واقفة، وده معناه إن الـ tunnel شغال ([[-N]] يعني من غير shell). في DBeaver اعمل connection جديد: Host [[localhost]] و Port [[5433]] واسم الداتابيز واليوزر والباسورد بتوع Postgres اللي على السيرفر، و Test Connection هيقول Connected.

لو قفلت نافذة الـ ssh الاتصال هيقع. لو ظهر [[bind [127.0.0.1]:5433: Address already in use]] يبقى 5433 مستخدم عندك، غيّر الرقم. ولو DBeaver قال connection refused والـ ssh طبع [[channel ... open failed: connect failed: Connection refused]]، يبقى Postgres على السيرفر مش بيسمع على 127.0.0.1:5432 (مثلًا شغال في Docker على بورت تاني).`
        }
      ]
    },
    {
      t: "البيئة والإعدادات",
      l: 2,
      n: "",
      items: [
        {
          cmd: "$env:",
          title: "متغيرات البيئة",
          desc: R`متغيرات البيئة (environment variables) قيم بيشوفها أي برنامج بتشغّله، زي [[PATH]] (الفولدرات اللي ويندوز بيدوّر فيها على البرامج) و [[TEMP]] و [[USERPROFILE]]. في PowerShell بتقراها وتكتبها بـ [[$env:NAME]]، المقابل لـ [[$NAME]] في bash و [[%NAME%]] في CMD.

[[$env:PATH -split ';']] بيقسم الـ PATH عند كل [[;]] فيطبع كل فولدر في سطر (على ويندوز الفاصل [[;]] مش [[:]] زي لينكس). و [[$env:API_URL = "..."]] بيعمل متغير للنافذة دي وأي برنامج تشغّله منها، زي [[export]]، وبيروح لما تقفلها.

للحفظ الدائم السطر التالت: [[[Environment]::SetEnvironmentVariable(الاسم, القيمة, "User")]] بيكتبه لليوزر بتاعك (و [["Machine"]] لكل اليوزرز ومحتاج أدمن). الأقواس المربعة [[[Environment]]] اسم class من .NET، و [[::]] بتنادي method جواه. التغيير الدائم مش بيظهر في النافذة المفتوحة، افتح واحدة جديدة. و [[Get-ChildItem env:]] بيعرض كل المتغيرات، لأن [[env:]] في PowerShell درايف زي [[C:]].`,
          example: R`$env:PATH -split ';'
$env:API_URL = "http://localhost:3000"
[Environment]::SetEnvironmentVariable("API_URL", "http://localhost:3000", "User")
Get-ChildItem env:`,
          try: "اطبع PATH سطر سطر بأول أمر.",
          deep: {
            why: R`البرامج بتاخد إعدادات كتير من متغيرات البيئة: [[PATH]] اللي بيقرر أنهي node بيشتغل، و [[NODE_ENV]]، و [[JAVA_HOME]]. ولما برنامج «مش موجود» وهو متسطب، غالبًا المشكلة في الـ PATH.`,
            how: R`[[Env:]] في PowerShell زي drive كامل. [[$env:PATH]] بيقرا. [[ls Env:]] بيعرض كل المتغيرات. [[$env:MY_VAR = "value"]] بيضبط للجلسة الحالية بس.

الفرق المهم عن bash: التغيير بيأثر على نفس العملية وأي عملية بتشغّلها منها، بس مش على العمليات الشغالة بالفعل.

للتغيير الدائم: [[[System.Environment]::SetEnvironmentVariable("NAME", "value", "User")]] أو من System Properties.

وكمان: ملفات .env مش بتتقري لوحدها: التطبيق بيقراها (مكتبة dotenv أو [[node --env-file=.env]])، والشيل نفسه مش بيشوفها.`,
            when: "قراية NODE_ENV. ضبط متغيرات للجلسة. تمرير config لـ npm scripts.",
            mistakes: "الخلط بين Machine وUser وProcess scope في SetEnvironmentVariable. User بيتحفظ بين الجلسات للمستخدم ده بس."
          },
          lines: [
            "اعرض الـ PATH سطر لكل فولدر. على ويندوز الفاصل [[;]] مش [[:]].",
            "متغير للجلسة دي بس (زي export).",
            "متغير دائم لليوزر ده، يفضل بعد ما تقفل (User ممكن تبقى Machine للكل).",
            "كل متغيرات البيئة (زي env)."
          ],
          sol: R`[[$env:PATH -split ';']] بيطبع كل مسار في سطر، زي [[C:\Program Files\nodejs\]] و [[C:\Program Files\Git\cmd]] و [[C:\Users\ali\AppData\Roaming\npm]]. أول سطور هي اللي ليها الأولوية لما نفس البرنامج يبقى موجود في أكتر من مكان.

لو آخر سطر طالع فاضي ده عادي، معناه إن الـ PATH بيخلص بـ [[;]]. ولو طلعلك كله في سطر واحد طويل، يبقى كتبت [[-split ':']] زي لينكس: في ويندوز الفاصل [[;]] لأن [[:]] جزء من [[C:\]]. (جربتها على لينكس بـ [[:]] وطلع [[/tmp/...]] و [[/root/.local/bin]] ... سطر سطر).`
        },
        {
          cmd: "المتغيرات",
          title: "خزّن أي حاجة",
          desc: R`المتغير اسم بيبدأ بـ [[$]] بتحط فيه أي حاجة بـ [[=]] وتستخدمها بعدين. ومش محتاج تقول نوعه. الفرق الكبير عن bash: المتغير بيشيل objects كاملة مش نص، فـ [[$files = Get-ChildItem]] بيخزن الملفات نفسها بكل خصائصها، و [[$files.Count]] عددهم، و [[$files[0].Name]] اسم أول واحد.

[[@( )]] بيعمل array (لستة) بعناصر مفصولة بفواصل: [[@("web", "api")]]. و [[@{ }]] بيعمل hashtable: مفاتيح وقيم، كل مفتاح [[=]] قيمته، وبينهم [[;]] لو على نفس السطر. وتقرا القيمة بالنقطة [[$user.name]] أو بالأقواس [[$user["name"]]].

أسامي المتغيرات مش بتفرّق بين الكابيتال والسمول ([[$Name]] هي [[$name]]). وفيه أسامي محجوزة متستخدمهاش: [[$_]] و [[$args]] و [[$input]] و [[$home]]. وشرح الأنواع والتحويل بينها في درس «المتغيرات والأنواع» في المستوى التالت.`,
          example: R`$files = Get-ChildItem
$files.Count
$user = @{ name = "Ali"; role = "dev" }
$user.name`,
          try: "خزّن Get-Process في متغير واعرف عدد العمليات.",
          deep: {
            why: "المتغيرات في PowerShell مش زي bash: بيها أنواع، وبتتعامل مع objects مش نص بس.",
            how: R`المتغيرات بتبدأ بـ [[$]]. مش محتاج declare. PowerShell بيحدد النوع لوحده من القيمة.

[[$num = 5]] رقم. [[$str = "text"]] نص. [[$arr = @(1, 2, 3)]] array. [[$hash = @{key="value"}]] hashtable (dictionary).

[[$arr[0]]] أول عنصر. [[$hash["key"]]] أو [[$hash.key]] وصول لقيمة.

وتقدر تحدد النوع صراحة: [[[int]$var = "5"]] بيحوّل النص لرقم.

أرقام مع وحدات: [[2GB]]، [[1MB]]، [[500KB]] بتعمل الحسبة تلقائيًا.`,
            when: R`أي حاجة هتستخدمها أكتر من مرة: ناتج أمر بطيء متشغّلهوش مرتين، أو مسار طويل، أو لستة سيرفرات. وفي الترمنال كمان مش بس في السكربتات.`,
            mistakes: "الخلط بين hashtable [[$h.key]] وobject property. الاتنين بنفس الكتابة في بعض الأحيان بس مختلفين."
          },
          lines: [
            "احفظ ناتج أمر (array من objects) في متغير.",
            "كام عنصر فيه.",
            "hashtable: مفاتيح وقيم.",
            "اقرا قيمة بالنقطة."
          ],
          sol: R`[[$p = Get-Process]] وبعدين [[$p.Count]] بيرجع رقم زي [[250]] (عندي على لينكس طلع [[147]]). و [[$p.GetType().Name]] بيرجع Object[] (array)، يعني المتغير شايل array من objects كاملة، مش نص.

الرقم بيتغير كل شوية لأن العمليات بتفتح وتقفل، و [[$p]] صورة ثابتة من لحظة ما خزنته. لو عايز أحدث رقم لازم تشغّل Get-Process تاني. ولو عملت [[$p.Count]] على حاجة رجعت object واحد بس، PowerShell 7 برضه هيرجع 1، مش فاضي.`
        },
        {
          cmd: "$PROFILE",
          title: "اختصاراتك الشخصية",
          desc: "زي .bashrc. أول سطر بيعمله لو مش موجود بس (من غير الشرط، [[-Force]] كانت هتمسح اللي فيه). حط فيه functions و aliases، و [[. $PROFILE]] يفعّله. اختار أسامي مش مستخدمة: [[gc]] و [[gl]] و [[gp]] مثلًا aliases جاهزة لـ Get-Content و Get-Location و Get-ItemProperty، فمتنفعش لـ git commit و git log و git push.",
          example: R`if (-not (Test-Path $PROFILE)) { New-Item $PROFILE -Force }
notepad $PROFILE
function gst { git status }
Set-Alias ll Get-ChildItem
. $PROFILE`,
          try: "اعمل function اسمها dev بتعمل [[npm run dev]] وحطها في البروفايل. اعرف الأول لو الاسم مستخدم بـ [[Get-Command dev]].",
          deep: {
            why: "ملف بيتشغّل أوتوماتيك كل ما تفتح PowerShell. حطّ فيه aliases وفانكشنز وإعدادات.",
            how: R`[[$PROFILE]] متغير فيه مسار الملف. لو مش موجود: [[New-Item $PROFILE -Force]]. وافتحه في VS Code: [[code $PROFILE]].

فيه ٤ مستويات profile (للـ user الحالي، ولكل user). الأشهر هو [[CurrentUserCurrentHost]].

مثل [[.bashrc]] في bash: بتحط فيه aliases ([[Set-Alias ll Get-ChildItem]]، ولو محتاج parameters اعمل function: [[function ll { Get-ChildItem -Force @args }]]) وPATH إضافات ومتغيرات ثابتة.

بعد التعديل: [[. $PROFILE]] (نقطة ومسافة) يطبّق التغييرات في الجلسة الحالية. مش المفروض تعيد تشغيل PowerShell.`,
            when: "إعداد البيئة بتاعتك: aliases وأوامر مخصوصة ومتغيرات ثابتة.",
            mistakes: "تعدّل الـ profile وتنسى تطبّقه بـ [[. $PROFILE]]. وبعض الـ execution policies بتمنع تشغيله."
          },
          lines: [
            "لو ملف الـ profile مش موجود، اعمله.",
            "افتحه في Notepad (أو [[code $PROFILE]]).",
            "فانكشن تحطها جوه الملف: [[gst]] تشغّل git status.",
            "اختصار: [[ll]] بدل Get-ChildItem.",
            "طبّق الملف في الجلسة دي (النقطة والمسافة زي source)."
          ],
          sol: R`أول [[Get-Command dev]] المفروض يطلع error [[The term 'dev' is not recognized]]، ودي أخبار حلوة: الاسم فاضي. بعدين [[notepad $PROFILE]] وضيف [[function dev { npm run dev }]] واحفظ، وبعدين [[. $PROFILE]]. دلوقتي [[dev]] في فولدر مشروع بيشغّل [[npm run dev]].

[[$PROFILE]] مسار زي [[C:\Users\ali\Documents\PowerShell\Microsoft.PowerShell_profile.ps1]] في PowerShell 7 (ولو OneDrive بيعمل backup لـ Documents هيبقى جوه OneDrive). ولو [[. $PROFILE]] طلع [[running scripts is disabled on this system]] يبقى محتاج تظبط الـ ExecutionPolicy (درس ExecutionPolicy). ولو نسيت [[. $PROFILE]] الـ function مش هتشتغل إلا في نافذة جديدة.`,
          solCode: R`Get-Command dev
if (-not (Test-Path $PROFILE)) { New-Item $PROFILE -Force }
Add-Content $PROFILE 'function dev { npm run dev }'
. $PROFILE
Get-Command dev`
        },
        {
          cmd: "History والاختصارات",
          title: "ارجع لأوامر كتبتها قبل كده",
          desc: R`PowerShell بيحفظ الأوامر اللي كتبتها، وفيه اختصارات توفّر عليك كتابة كتير (من موديول اسمه PSReadLine شغال افتراضيًا). سهم فوق وتحت يلف على الأوامر القديمة، و Ctrl+R يدوّر فيها بكلمة زي bash، و Tab يكمّل اسم الأمر أو الملف أو الـ parameter ولو دوست تاني يجيب الاختيار اللي بعده، و Ctrl+Space يعرض كل الاختيارات مرة واحدة. و [[cls]] (أو Ctrl+L) يمسح الشاشة.

[[Get-History]] (اختصاره [[h]]) بيعرض أوامر الجلسة دي بأرقام، و [[Invoke-History 5]] (اختصاره [[r 5]]) بيشغّل الأمر رقم ٥ تاني. مفيش [[!!]] زي bash.

خلي بالك: Get-History بيعرض الجلسة الحالية بس، لكن PSReadLine بيحفظ كل أوامرك في ملف عشان سهم فوق و Ctrl+R يلاقوها حتى بعد ما تقفل. مكانه بيطلع بـ [[(Get-PSReadLineOption).HistorySavePath]]. ولو كتبت باسورد في أمر، هتلاقيه هناك.`,
          example: R`Get-History
Invoke-History 5`,
          try: "اضغط Ctrl+Space بعد [[Get-Child]] وشوف الاختيارات.",
          deep: {
            why: R`نص وقتك في الترمنال بتكتب أوامر كتبتها قبل كده. البحث في التاريخ والإكمال بالـ Tab بيوفروا كتابة كتير، وبيقللوا الغلط في أسامي الأوامر والـ parameters الطويلة.`,
            how: R`[[Get-History]] بيعرض أوامر الجلسة دي بأرقام. [[Invoke-History 42]] (أو [[r 42]]) بيشغّل الأمر رقم 42. و [[!!]] مش موجودة.

PSReadLine (موجود افتراضيًا في ويندوز 10 و 11 وفي PowerShell 7) هو اللي عامل الاختصارات: Ctrl+R و Ctrl+S للبحث لورا وقدام، و F8 بيدوّر على أمر قديم بيبدأ باللي انت كاتبه، و Ctrl+Space يعرض الـ completions. وفي PowerShell 7.2 وأحدث بيقترحلك أمر قديم بلون باهت وانت بتكتب، والسهم يمين يقبله.

Tab completion قوية: بتكمّل أسامي الـ parameters والقيم المسموحة ليها، مش بس الملفات.

ملف التاريخ الدائم: [[(Get-PSReadLineOption).HistorySavePath]]. تقدر تفتحه بـ [[notepad (Get-PSReadLineOption).HistorySavePath]] وتمسح منه أي سطر فيه بيانات سرية.`,
            when: "أمر طويل كتبته امبارح. التنقل في الـ history.",
            mistakes: "إنك تفتكر [[!!]] شغالة. هي مش موجودة في PowerShell، استخدم [[r]]."
          },
          lines: ["الأوامر اللي كتبتها، بأرقام.", "نفّذ الأمر رقم ٥ تاني."],
          sol: R`[[Get-Child]] وبعدين Ctrl+Space هيكمّلها على طول لـ [[Get-ChildItem]]، لأنه الأمر الوحيد اللي بيبدأ كده. عشان تشوف القايمة، جرب [[Get-Net]] وبعدين Ctrl+Space: هتظهرلك قايمة كبيرة (Get-NetAdapter و Get-NetIPAddress و Get-NetTCPConnection ...) وتتحرك فيها بالأسهم.

نفس الحكاية على الـ parameters: [[Get-ChildItem -]] وبعدين Ctrl+Space يعرض كل الـ parameters. ولو Ctrl+Space مش بيعمل حاجة جوه VS Code، غالبًا VS Code نفسه واخد الاختصار، جربها في Windows Terminal.`
        },
        {
          cmd: "ExecutionPolicy",
          title: "ليه السكربت مش راضي يشتغل",
          desc: R`الـ ExecutionPolicy إعداد في ويندوز بيقرر ملفات [[.ps1]] تتشغّل ولا لأ. في Windows PowerShell 5.1 على جهاز عادي الافتراضي [[Restricted]]: مفيش ولا سكربت يشتغل، فتلاقي رسالة «running scripts is disabled on this system» حتى مع npm (لأن npm على ويندوز ملف npm.ps1). و PowerShell 7 على ويندوز افتراضيه [[RemoteSigned]].

[[Get-ExecutionPolicy]] بيقولك الحالي. و [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] بيغيّره لليوزر بتاعك بس ([[-Scope CurrentUser]])، فمش محتاج أدمن ومش بيأثر على باقي اليوزرز. و [[RemoteSigned]] معناها: السكربتات اللي اتعملت على جهازك تشتغل، واللي نزلت من النت لازم تبقى موقّعة أو تعملها [[Unblock-File]].

متختارش [[Unrestricted]] أو [[Bypass]] للجهاز كله: RemoteSigned كفاية. ولو محتاج تعدّي الـ policy لتشغيلة واحدة بس: [[pwsh -ExecutionPolicy Bypass -File script.ps1]]. والخطوات كاملة لأول سكربت في درس «أول سكربت .ps1» في المستوى التالت.`,
          example: R`Get-ExecutionPolicy
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`,
          try: "اعرف الـ policy الحالية عندك قبل ما تغيّر حاجة.",
          deep: {
            why: "ويندوز بيمنع تشغيل سكربتات PowerShell افتراضيًا. دي الخطوة اللي بتشغّلها مرة واحدة.",
            how: R`[[Get-ExecutionPolicy]] بيعرض الحالي. الافتراضي [[Restricted]] (ممنوع تشغيل سكربتات). [[RemoteSigned]] (الأنصح): السكربتات المحلية بتشتغل، اللي جايين من النت محتاجين توقيع. [[Unrestricted]]: كل حاجة بتشتغل (مش آمن).

[[-Scope CurrentUser]] بيغيّر للـ user بس من غير Admin. [[-Scope LocalMachine]] كل الـ Users ومحتاج Admin.

طريقة تانية تجاوز في حالات خاصة: [[powershell.exe -ExecutionPolicy Bypass -File script.ps1]].`,
            when: "أول مرة بتشتغل على جهاز ويندوز جديد وعايز تشغّل سكربتات.",
            mistakes: "تضبط Unrestricted عشان «يشتغل». RemoteSigned أأمن وكافي."
          },
          lines: [
            "السياسة الحالية (غالبًا Restricted على ويندوز).",
            "اسمح بالسكربتات المحلية لليوزر ده، من غير ما تحتاج مدير."
          ],
          sol: R`[[Get-ExecutionPolicy]] في Windows PowerShell 5.1 على جهاز عادي غالبًا هيرجع [[Restricted]]، وفي PowerShell 7 على ويندوز [[RemoteSigned]]. و [[Get-ExecutionPolicy -List]] بيوريك كل scope لوحده (MachinePolicy و UserPolicy و Process و CurrentUser و LocalMachine) واللي مش متظبط بيبان [[Undefined]].

لو MachinePolicy أو UserPolicy عليهم قيمة، ده Group Policy من الشركة، و [[Set-ExecutionPolicy]] مش هيغيّر حاجة. وعلى لينكس والماك هتلاقيها [[Unrestricted]] (جربتها وكل الـ scopes طلعت كده) ومبتتغيرش، لأن الـ ExecutionPolicy ميزة ويندوز بس.`
        }
      ]
    },
    {
      t: "ضغط وهاش",
      l: 2,
      n: "",
      items: [
        {
          cmd: "Compress-Archive",
          title: "zip وفكه",
          desc: R`[[Compress-Archive]] بيعمل ملف zip و [[Expand-Archive]] بيفكه، من غير أي برنامج زيادة، زي [[zip]] و [[unzip]] في لينكس. [[-Path]] اللي هيتضغط، و [[-DestinationPath]] اسم الـ zip أو الفولدر اللي هيتفك فيه.

[[dist\*]] بالنجمة يعني «اللي جوه dist»، فالـ zip هيبقى جواه الملفات على طول. لو كتبت [[dist]] من غير [[\*]]، الـ zip هيبقى جواه فولدر اسمه dist والملفات جوّاه. وده بيفرق لما ترفعه على سيرفر وتفكه.

[[tar]] كمان موجود في ويندوز 10 و 11 بنفس حروف لينكس: [[-c]] اعمل، و [[-z]] اضغط gzip، و [[-f app.tar.gz]] اسم الملف، و [[app]] اللي هيتضغط. مفيد لو السيرفر لينكس ومتعود على tar.gz. وخلي بالك: لو الـ zip موجود قبل كده Compress-Archive هيطلع error، استخدم [[-Force]] يكتب فوقه أو [[-Update]] يضيف عليه.`,
          example: R`Compress-Archive -Path dist\* -DestinationPath dist.zip
Expand-Archive dist.zip -DestinationPath out
tar -czf app.tar.gz app`,
          try: "اضغط فولدر وفكه في مكان تاني.",
          deep: {
            why: R`باك أب سريع لفولدر، أو تجهيز ملف ترفعه على سيرفر أو تبعته لحد، من غير ما تسطّب WinRAR أو 7-Zip. Compress-Archive مبني جوه PowerShell، و tar موجود جنبه لو محتاج tar.gz.`,
            how: R`[[Compress-Archive -Path ".\folder" -DestinationPath "archive.zip"]] يعمل zip. [[-Update]] يضيف لـ zip موجود.

[[Expand-Archive -Path "archive.zip" -DestinationPath ".\output"]] يفكّه. [[-Force]] يكتب فوق لو الفولدر موجود.

[[Compress-Archive -Path ".\file1.txt", ".\file2.txt" -Destination "files.zip"]] ملفات متعددة.

بس PowerShell Compress-Archive بطيء على ملفات كتير. لو عندك 7-Zip: [[7z a archive.7z folder\]] أسرع بكتير.`,
            when: "باك أب. إرسال مشروع. نقل ملفات.",
            mistakes: R`Path ممكن تاخد * : [[Compress-Archive ".\logs\*.log"]] بس الـ wildcards مش شغالة في كل الأحوال. خليها بين quotes.`
          },
          lines: ["اضغط محتوى dist في zip.", "فك zip في فولدر out.", "tar موجود في ويندوز 10 وأحدث، بنفس حروف لينكس."],
          sol: R`[[Compress-Archive -Path app\* -DestinationPath app.zip]] وبعدين [[Expand-Archive app.zip -DestinationPath out]]. جربتها فـ [[Get-ChildItem out -Recurse -Name]] طلع [[src]] و [[src\server.js]] زي الأصل.

لو كتبت [[-Path app]] من غير [[\*]]، الـ zip هيبقى جواه فولدر app، فبعد الفك هتلاقي [[out\app\src]]. ولو شغلت الضغط تاني على نفس اسم الـ zip هيطلع [[The archive file ... already exists. Use the -Update parameter ... or use the -Force parameter]]، ونفس الحكاية Expand-Archive على فولدر فيه نفس الملفات محتاج [[-Force]].`,
          solCode: R`Compress-Archive -Path app\* -DestinationPath app.zip
Expand-Archive app.zip -DestinationPath out
Get-ChildItem out -Recurse -Name`
        },
        {
          cmd: "Get-FileHash",
          title: "اتأكد إن الملف سليم",
          desc: R`الهاش (hash) بصمة للملف: رقم طويل بيتحسب من كل بايت فيه، ولو بايت واحد اتغير البصمة كلها بتتغير. [[Get-FileHash]] بيحسبها، و [[-Algorithm SHA256]] نوع البصمة (وده الافتراضي أصلًا، والمواقع غالبًا بتكتبه). المقابل في لينكس [[sha256sum]].

الاستخدام: صفحة تحميل برنامج بتكتب الـ SHA256 بتاعه، تحسبه انت على الملف اللي نزل وتقارن. لو زي بعض، الملف وصل سليم ومحدش عدّل فيه. ونفس الفكرة تتأكد إن نسخة باك أب زي الأصل.

المقارنة الأسهل: [[(Get-FileHash .\setup.exe).Hash -eq "الرقم من الموقع"]] بترجع True أو False، و [[-eq]] مش بيفرّق بين الحروف الكابيتال والسمول، فمش مشكلة إن الموقع كاتبه سمول. و [[.\setup.exe]] يعني الملف في الفولدر الحالي.`,
          example: R`Get-FileHash .\setup.exe -Algorithm SHA256`,
          try: "اطلع الهاش لأي ملف عندك.",
          deep: {
            why: "التأكد إن ملف وصل سليم بعد النقل أو نزل بدون تعديل. زي sha256sum في bash.",
            how: R`[[Get-FileHash file.zip]] بيحسب SHA256 افتراضيًا. [[-Algorithm MD5]] أو [[-Algorithm SHA512]] لو محتاج.

[[(Get-FileHash file.zip).Hash]] الـ hash بس كنص.

قارن: [[Get-FileHash file.zip -Algorithm SHA256]] وبعدين قارن الـ Hash بالقيمة على الموقع.`,
            when: "بعد تحميل برنامج. بعد نسخ ملفات مهمة. للتأكد من سلامة باك أب.",
            mistakes: "نسيان إن الأحرف lowercase وuppercase ممكن تختلف في الـ hash المعروض وذاك. PowerShell بيطبع uppercase."
          },
          lines: ["بصمة SHA256 للملف، قارنها باللي على موقع التحميل."],
          sol: R`[[Get-FileHash .\setup.exe -Algorithm SHA256]] بيطبع 3 حاجات: [[Algorithm SHA256]] و [[Hash]] (64 حرف hex كابيتال) و [[Path]]. جربتها على ملف وقارنتها بـ [[sha256sum]] على لينكس، طلعوا نفس الرقم بالظبط بس sha256sum بيكتبه حروف صغيرة.

الفرق في الكابيتال مش مهم، و [[-eq]] في PowerShell مش بيفرق بين كابيتال وسمول، فتقدر تقارن: [[(Get-FileHash .\setup.exe).Hash -eq "abc..."]]. لو رجع False يبقى الملف اتعدل أو التحميل بايظ، أو انت بتقارن بهاش نسخة تانية. [[SHA256]] هو الافتراضي أصلًا، فممكن تشيل [[-Algorithm]].`
        }
      ]
    },
    {
      t: "لغة PowerShell",
      l: 3,
      n: R`ملف .ps1 فيه أوامر ولغة كاملة. ابدأ بأول درس هنا، وكل سكربت بعد كده بيتحفظ ويتشغّل بنفس الطريقة`,
      items: [
        {
          cmd: "أول سكربت .ps1",
          title: "اكتب أول سكربت وشغّله من الصفر",
          desc: R`السكربت ملف نصي امتداده [[.ps1]] فيه أوامر PowerShell ورا بعض، بتشغّله بأمر واحد بدل ما تكتبهم كل مرة. الخطوات: اعمل فولدر للسكربتات وادخله، وافتح ملف جديد في VS Code بـ [[code hello.ps1]] (أو [[notepad hello.ps1]] لو مفيش VS Code). اكتب جواه الكود اللي في «الحل» تحت واحفظ. وسطّب extension اسمه PowerShell في VS Code: بيلوّن ويكمّل ويطلّعلك التحذيرات وانت بتكتب، و F5 بيشغّل الملف و F8 بيشغّل السطور اللي معلّم عليها بس.

أول حاجز: Windows PowerShell 5.1 بيمنع السكربتات خالص افتراضيًا (درس ExecutionPolicy). [[Get-ExecutionPolicy]] يقولك الحالي، و [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] مرة واحدة على الجهاز بتسمح بسكربتاتك انت. والحاجز التاني: أي ملف نزل من النت أو من إيميل ويندوز بيعلّم عليه، و RemoteSigned بيرفضه لحد ما تقراه وتعمله [[Unblock-File]].

التشغيل: [[.\hello.ps1]]. الـ [[.\]] (يعني «من الفولدر ده») لازمة: PowerShell مش بيشغّل ملف من الفولدر الحالي بالاسم بس، عشان محدش يحطلك ملف اسمه زي أمر مشهور فيتشغّل بداله. والـ arguments بعد الاسم زي أي أمر: [[-Name Sara]]. ومن بره PowerShell (CMD أو اختصار على الديسكتوب أو Task Scheduler) استخدم [[pwsh -File]]، و [[-NoProfile]] بيخليه ميحمّلش البروفايل بتاعك، فيبقى أسرع ويشتغل نفس الشغل على أي جهاز.`,
          example: R`New-Item -ItemType Directory $HOME\scripts -Force
Set-Location $HOME\scripts
code hello.ps1
Get-ExecutionPolicy
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
.\hello.ps1
.\hello.ps1 -Name Sara
Unblock-File .\downloaded.ps1
pwsh -NoProfile -File .\hello.ps1 -Name Sara`,
          try: R`اكتب hello.ps1 اللي في الحل. شغّله الأول بـ [[hello.ps1]] من غير [[.\]] واقرا الـ error، وبعدين [[.\hello.ps1]] و [[.\hello.ps1 -Name Sara]]. وبعدين من Explorer كليك يمين على الملف، Run with PowerShell، ولاحظ النافذة بتعمل إيه.`,
          deep: {
            why: "كل اللي فات كنت بتكتبه سطر سطر. أول ما تلاقي نفسك بتكتب نفس الخمس أوامر كل يوم، حطهم في ملف. بس أول سكربت على ويندوز بيقابله ٣ حواجز ملهمش علاقة بالكود: الـ ExecutionPolicy، وعلامة «الملف ده جاي من النت»، وإن اسم الملف لوحده مش بيشغّله. الدرس ده بيعدّيك منهم مرة واحدة.",
            how: R`الملف نص عادي، أي محرر ينفع، بس لازم الامتداد يبقى [[.ps1]] بالظبط. Notepad ساعات بيحفظه [[hello.ps1.txt]] من غير ما تاخد بالك، فشغّل إظهار الامتدادات في Explorer (View، Show، File name extensions)، وشوف تاب «الملفات وامتداداتها».

الترميز: PowerShell 7 بيقرا UTF-8 عادي. Windows PowerShell 5.1 بيقرا الملف اللي من غير BOM على إنه ANSI، فالعربي اللي جوه [[Write-Host]] يطلع رموز. لو هتكتب عربي وهتشغّل بـ 5.1، احفظ الملف «UTF-8 with BOM» من شريط VS Code تحت على اليمين.

[[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]]: السكربتات اللي اتكتبت على جهازك تشتغل، واللي جاية من النت لازم تبقى موقّعة أو تعملها Unblock. ويندوز بيعرف إن الملف من النت من علامة مخفية اسمها Zone.Identifier بيحطها المتصفح، و [[Unblock-File]] بيشيلها. ومن Explorer نفس الحكاية: Properties، وعلّم على Unblock.

طرق التشغيل:
[[.\hello.ps1]] من جوه PowerShell، في نفس النافذة، والمتغيرات اللي السكربت بيعملها بتروح لما يخلص.
[[pwsh -File .\hello.ps1 -Name Sara]] من أي مكان (CMD، اختصار، Task Scheduler). ولو عايز النافذة تفضل مفتوحة بعد ما يخلص ضيف [[-NoExit]]. و [[-ExecutionPolicy Bypass]] بتعدّي الـ policy للتشغيلة دي بس من غير ما تغيّر إعدادات الجهاز.
كليك يمين، Run with PowerShell: بيشغّله بـ Windows PowerShell 5.1 في نافذة بتتقفل أول ما يخلص.
الدبل كليك على .ps1 بيفتحه في Notepad مش بيشغّله، وده مقصود عشان محدش يشغّل سكربت بالغلط.

وفي VS Code: F5 بيشغّل الملف كله في الترمنال اللي تحت، و F8 بيشغّل السطر أو السطور اللي معلّم عليها بس، ودي أحسن طريقة تجرّب سطر سطر.`,
            when: "أول ما تكرر نفس الأوامر أكتر من مرتين. وكل سكربت في الدروس اللي جاية بيتعمل بنفس الطريقة دي: ملف، وحفظ، و .\ قبل الاسم.",
            mistakes: R`تعمل [[Set-ExecutionPolicy Unrestricted]] أو Bypass على الجهاز كله عشان «يشتغل وخلاص»، و RemoteSigned كفاية وأأمن. أو تكتب [[hello.ps1]] من غير [[.\]] وتفتكر الملف مش موجود. أو تشغّل بكليك يمين وتستغرب إن النافذة اتقفلت قبل ما تقرا حاجة: ضيف في آخر السكربت [[Read-Host "Press Enter to exit"]] لو هيتشغّل بالطريقة دي. أو تحفظ الملف في OneDrive وتلاقيه متعلّم «من النت» على جهاز تاني.`
          },
          lines: [
            "اعمل فولدر للسكربتات في فولدرك الشخصي ([[-Force]] متطلعش error لو موجود).",
            "ادخله.",
            "افتح ملف جديد اسمه hello.ps1 في VS Code (اكتب فيه كود الحل واحفظ).",
            "الـ policy الحالية إيه؟ لو Restricted السكربتات ممنوعة.",
            "اسمح بسكربتاتك لليوزر بتاعك بس، مرة واحدة على الجهاز ومن غير أدمن.",
            "شغّل السكربت. الـ [[.\]] لازمة.",
            "شغّله وابعتله قيمة للـ parameter اسمه Name.",
            "ملف نزل من النت: شيل علامة «من النت» بعد ما تقراه وتتأكد منه.",
            "شغّله من بره PowerShell (CMD أو اختصار): [[-File]] اسم السكربت وبعده الـ arguments، و [[-NoProfile]] من غير البروفايل بتاعك."
          ],
          sol: R`[[hello.ps1]] من غير [[.\]] بيطلع [[The term 'hello.ps1' is not recognized as a name of a cmdlet, function, script file, or executable program.]]، وعلى ويندوز تحته اقتراح «The command hello.ps1 was not found, but does exist in the current location... type: ".\hello.ps1"». بعدين [[.\hello.ps1]] طبع [[Hello, World! It's 16:11]] (بالساعة بتاعتك)، و [[.\hello.ps1 -Name Sara]] طبع [[Hello, Sara! It's 16:11]]، و [[.\hello.ps1 Omar]] من غير كلمة [[-Name]] اشتغل برضه لأن Name أول parameter. جربت ده كله على PowerShell 7.

لو طلعلك [[running scripts is disabled on this system]] يبقى لسه مظبطتش الـ ExecutionPolicy، ولو [[is not digitally signed]] يبقى الملف متعلّم إنه من النت، اعمله [[Unblock-File]]. و Run with PowerShell بيفتح نافذة زرقا ويطبع السطر ويقفل في أقل من ثانية، فمش هتلحق تقرا. (الـ ExecutionPolicy و Explorer حاجات ويندوز، مقدرتش أجربهم هنا على لينكس، والكلام عنهم من توثيق Microsoft.)`,
          solCode: R`# hello.ps1
param([string]$Name = "World")
$now = Get-Date -Format "HH:mm"
Write-Output "Hello, $Name! It's $now"`
        },
        {
          cmd: "المتغيرات والأنواع",
          title: "خزّن قيمة واعرف نوعها",
          desc: R`المتغير بيبدأ بـ [[$]] وبتحط فيه قيمة بـ [[=]]، ومش محتاج تقول نوعه: PowerShell بيعرف من القيمة. [["Ali"]] نص، و [[5]] رقم، و [[$true]] و [[$false]] (بالدولار) قيم صح وغلط، و [[$null]] «مفيش قيمة». و [[@("web", "api", "db")]] array، و [[@{ port = 3000; env = "dev" }]] hashtable (مفاتيح وقيم، و [[;]] بينهم). والشرح الكامل للتلاتة الأخيرة في درس «array و hashtable».

جوه double quotes [[$name]] بيتفك لقيمته، لكن أي حاجة بعد اسم المتغير ([[.Count]] أو [[[0]]]) لازم تتحط جوه [[$( )]]: [["items: $($list.Count)"]]. و single quotes مش بتفك حاجة خالص (درس النصوص).

[[$config.port]] قيمة من الـ hashtable بالنقطة، و [[$list[0]]] أول عنصر في الـ array (العد من صفر). و [[.GetType().Name]] بيقولك النوع (Int32 يعني رقم صحيح، String نص). وتقدر تحوّل بنفسك بكتابة النوع بين أقواس مربعة قبل القيمة: [[[int]"42"]].`,
          example: R`$name = "Ali"
$count = 5
$isAdmin = $false
$list = @("web", "api", "db")
$config = @{ port = 3000; env = "dev" }

"Name: $name, items: $($list.Count)"
$config.port
$list[0]
$count.GetType().Name`,
          try: "اطبع [[$list.Count]] جوه نص من غير [[$( )]] وشوف الفرق.",
          flag: "script",
          deep: {
            why: "PowerShell بيتعامل مع أنواع بيانات متعددة، وفهمهم بيوفّر عليك errors كتيرة في السكربتات.",
            how: R`[[$num = 5]] integer. [[$str = "text"]] string. [[$bool = $true]] أو [[$false]]. [[$null]] فاضي.

فيه مجموعة special variables: [[$null]] فاضي، [[$true]] و[[$false]] boolean، [[$_]] pipeline variable.

للأنواع المركبة: [[$arr = @(1, 2, 3)]] array. [[$dict = @{name="Ali"; age=25}]] hashtable. وبتوصلهم بنفس الطريقة.

التحويل: [[[int]"5"]] نص لرقم. [[[string]42]] رقم لنص. [[[DateTime]"2024-01-01"]] نص لتاريخ. لو التحويل فشل بيطلع error، لو عايز تتجنب: [[$r = $null; [int]::TryParse("text", [ref]$r)]].`,
            when: "كل سكربت يتعامل مع أنواع مختلفة.",
            mistakes: "الخلط بين [[0]] و[[$false]] و[[$null]]: الـ if بيعتبرهم كلهم false، بس في المقارنة مش نفسهم: [[$null -eq 0]] بترجع False. وحط [[$null]] على الشمال دايمًا: [[$null -eq $x]]."
          },
          lines: [
            "نص.",
            "رقم.",
            "boolean: [[$false]] أو [[$true]] بالدولار.",
            "array بأقواس [[@( )]] وفواصل.",
            "hashtable بأقواس [[@{ }]] وفاصلة منقوطة بين العناصر.",
            "نص فيه متغيرات. [[$( )]] لازمة لو هتقرا property جوه النص.",
            "قيمة من الـ hashtable.",
            "أول عنصر في الـ array (العد من صفر).",
            "نوع المتغير: Int32."
          ],
          sol: R`[["items: $list.Count"]] طبعت [[items: web api db.Count]]: الـ double quotes فكّت [[$list]] بس (العناصر بمسافات) وسابت [[.Count]] نص عادي. أما [[items: $($list.Count)]] فطبعت [[items: 3]]. وبـ single quotes [['items: $($list.Count)']] طبعت الكلام زي ما هو من غير أي فك.

القاعدة: أي حاجة بعد اسم المتغير (نقطة، أقواس، index) لازم تبقى جوه [[$( )]] في النص. ونفس الحكاية [["$config.port"]] هتطبع حاجة زي [[System.Collections.Hashtable.port]] بدل 3000.`,
          solCode: R`$list = @("web", "api", "db")
"items: $list.Count"
"items: $($list.Count)"
'items: $($list.Count)'`
        },
        {
          cmd: "النصوص (strings)",
          title: "اشتغل على النصوص: دمج وتنسيق وتقطيع",
          desc: R`نص بين double quotes [["..."]] بيتفك: أي [[$name]] جواه بتتبدّل بقيمتها. ونص بين single quotes [['...']] بيتكتب زي ما هو حرف حرف من غير أي تبديل، ودي اللي تستخدمها مع الـ regex والمسارات اللي فيها [[$]]. ولو جوه الـ double quotes عايز حاجة أكتر من اسم متغير (خاصية زي [[.Count]]، أو index زي [[[0]]]، أو أمر)، حطها في [[$( )]].

[[-f]] اسمه format operator: الشمال نص فيه أماكن مترقمة [[{0}]] و [[{1}]]، واليمين القيم بالترتيب. وتقدر تحدد الشكل: [[{1:N1}]] رقم برقم واحد بعد العلامة، و [[{0:D3}]] رقم ٣ خانات بأصفار (007). والـ backtick هو حرف الـ escape في PowerShell (مش [[\]] زي bash): [[$__btn]] سطر جديد، و [[$__btt]] tab. و [[@" ... "@]] اسمه here-string: نص على كذا سطر، بيتفك زي الـ double quotes، والـ [["@]] اللي بيقفله لازم يبقى في أول سطره لوحده.

للتعديل: [[-replace 'regex', 'بدل']] يبدّل (بـ regex، فالنقطة لازم [[\.]])، و [[-split ',']] يقطّع النص لـ array عند كل فاصلة، و [[-join ' | ']] العكس: يلزق array لنص واحد. وكل نص عنده methods: [[.Trim()]] تشيل المسافات من الطرفين، و [[.Substring(0, 5)]] ٥ حروف من أول حرف (العد من صفر)، و [[.ToUpper()]] و [[.EndsWith(".gz")]] وغيرهم، وتعرفهم كلهم بـ [["x" | Get-Member]].`,
          example: R`$name = "Sara"
$files = @("a.txt", "b.txt")
"Hello $name"
'Hello $name'
"Count: $($files.Count), first: $($files[0])"
"Total: {0} files, {1:N1} MB" -f 12, 3.14159
"Path:$__btt$HOME$__btnDone"
$msg = @"
User: $name
Date: $(Get-Date -Format yyyy-MM-dd)
"@
$msg
"report_2026.txt" -replace '\.txt$', '.md'
"a,b,,c" -split ','
"web", "api", "db" -join ' | '
"  hello  ".Trim()
"PowerShell".Substring(0, 5)
"PowerShell".ToUpper()
"file.tar.gz".EndsWith(".gz")`,
          try: R`اعمل [[$v = "v2.15.0"]] وطلّع منه رقم الـ minor (15) مرة بـ [[-split]] ومرة بـ [[-replace]]. وبعدين اطبع [["{0:D3}" -f 7]].`,
          flag: "script",
          deep: {
            why: "أغلب شغل السكربتات نصوص: أسامي ملفات تبنيها، ورسايل تطبعها، وسطور لوج تقطّعها، وأرقام نسخ تقارنها. ولو مفهمتش الفرق بين نوعين علامات التنصيص هتلاقي [[$name]] متطبعة حرفيًا، أو مسار فيه [[$]] اتبوظ.",
            how: R`الفك (interpolation) جوه [["..."]] بياخد اسم المتغير بس: [["$file.Name"]] بيطبع قيمة [[$file]] كلها وبعدها [[.Name]] كنص. الصح [["$($file.Name)"]]. ولو بعد الاسم حرف ممكن يتلزق فيه زي [["$name_log"]] (هيدوّر على متغير اسمه name_log)، اكتبه [["$($name)_log"]].

الـ escape بالـ backtick جوه [["..."]] بس: [[$__btn]] سطر، و [[$__btt]] tab، و [[$__bt$]] دولار حرفي، و [[$__bt"]] علامة تنصيص. وجوه [['...']] مفيش escape خالص، وعشان تكتب [[']] جواها اكتبها مرتين: [['it''s']].

[[-f]] بيستخدم إعدادات اللغة بتاعة الجهاز: على ويندوز إنجليزي [[{0:N1}]] لـ 3.14159 بتطلع 3.1، وعلى جهاز لغته عربي ممكن تطلع بعلامة عشرية عربي (جربتها على لينكس لغته ar_EG فطلعت ٣٫١ بالفاصلة العربي). لو النص ده رايح ملف أو API، استخدم [[.ToString("F1", [cultureinfo]::InvariantCulture)]].

[[-replace]] و [[-split]] بياخدوا regex. فـ [[-split '.']] هيقطّع عند كل حرف (النقطة يعني أي حرف) ويرجع فاضي. الصح [[-split '\.']]، أو [[.Split('.')]] (الـ method بتاخد نص عادي مش regex). وفي [[-replace]] تقدر ترجّع جزء من اللي لقيته: [['v2.15.0' -replace '^v(\d+)\.(\d+).*', '$2']] بيرجع 15، و [['$2']] لازم بين single quotes عشان PowerShell ميفكهاش كمتغير.

و [[-join]] من غير حاجة على الشمال ([[-join $list]]) بيلزقهم من غير فاصل. و [[-split]] على سطور ملف: [[(Get-Content f.txt -Raw) -split "$__btr?$__btn"]].`,
            when: "أسامي ملفات بالتاريخ، رسايل للمستخدم، تقطيع CSV بسيط أو سطور لوج، تجهيز JSON صغير، ومقارنة أرقام نسخ.",
            mistakes: R`[["$obj.Property"]] من غير [[$( )]] فيطبع [[System.Collections.Hashtable.port]] أو اسم النوع. و [[\n]] زي bash بدل [[$__btn]] فيتطبع حرفيًا. و [[-split '.']] أو [[-replace '.', '']] ناسي إنها regex. ومسافة بعد [[@"]] في أول سطر الـ here-string أو مسافة قبل [["@]] في آخره، فيطلع ParserError. وخلي بالك إن الـ backtick جوه مسار بين double quotes بيبوّظه: [["C:$__btnew"]] بقت C: وسطر جديد و ew.`
          },
          lines: [
            "متغير نصي.",
            "array فيها اسمين ملفات.",
            "double quotes: [[$name]] بتتبدّل بـ Sara.",
            "single quotes: بيتطبع [[$name]] حرفيًا.",
            "[[$( )]] لأي حاجة أعقد من اسم متغير: الـ Count وأول عنصر.",
            "format operator: [[{0}]] أول قيمة و [[{1:N1}]] التانية برقم واحد بعد العلامة.",
            "backtick t يعني tab، و backtick n سطر جديد.",
            "here-string: نص على كذا سطر بيبدأ بـ [[@\"]] في آخر السطر...",
            "...وبيتفك زي الـ double quotes...",
            "...حتى [[$( )]] جواه...",
            "...وبيتقفل بـ [[\"@]] في أول سطر لوحده.",
            "اطبعه.",
            "بدّل بـ regex: [[\\.txt$]] يعني .txt في آخر الاسم.",
            "قطّع عند كل فاصلة: ٤ عناصر، منهم واحد فاضي.",
            "لزّق ٣ نصوص بفاصل.",
            "شيل المسافات من الطرفين.",
            "٥ حروف من أول حرف (العد من صفر).",
            "كله كابيتال.",
            "بيخلص بـ .gz؟ True."
          ],
          sol: R`الناتج كله (جربته على PowerShell 7 بلغة إنجليزي): [[Hello Sara]] و [[Hello $name]] و [[Count: 2, first: a.txt]] و [[Total: 12 files, 3.1 MB]] وسطر فيه Path و tab والمسار وتحته Done، وبعدين سطرين [[User: Sara]] و [[Date: 2026-10-01]]، و [[report_2026.md]]، وبعدين a و b وسطر فاضي و c، و [[web | api | db]] و [[hello]] و [[Power]] و [[POWERSHELL]] و [[True]].

الحل في الـ solCode: [[($v -split '\.')[1]]] بيقطّع عند النقطة وياخد العنصر التاني (العد من صفر) فيطلع [[15]]، والـ [[\.]] لازمة لأن [[-split]] بياخد regex. و [[-replace]] بيمسك الأرقام في مجموعات بالأقواس ويرجّع التانية [['$2']] فيطلع [[15]] برضه. و [["{0:D3}" -f 7]] طبع [[007]]. لو كتبت [[-split '.']] هيرجعلك عناصر فاضية بس، لأن كل حرف بقى فاصل.`,
          solCode: R`$v = "v2.15.0"
($v -split '\.')[1]
$v -replace '^v(\d+)\.(\d+)\.(\d+)$', '$2'
"{0:D3}" -f 7`
        },
        {
          cmd: "array و hashtable",
          title: "اللستات والقواميس و PSCustomObject",
          desc: R`الـ array لستة عناصر بترتيب: [[@("web", "api")]]، وبتوصل لعنصر برقمه بين [[[ ]]] والعد من صفر: [[$services[0]]] الأول، و [[$services[-1]]] الأخير (السالب بيعد من الآخر). و [[+=]] بيضيف عنصر، و [[.Count]] العدد، و [[-contains]] بيسأل «العنصر ده جوه اللستة؟».

الـ hashtable قاموس: كل مفتاح ليه قيمة، [[@{ web = 3000; api = 8000 }]]، والـ [[;]] بتفصل لو على سطر واحد. بتقرا بالنقطة [[$ports.api]] أو بالأقواس [[$ports["db"]]]، وبتضيف مفتاح جديد بنفس الطريقة. الـ hashtable العادي مش بيحافظ على ترتيب الإدخال، فلو الترتيب فارق معاك اكتب [[[ordered]]] قبله. و [[.Keys]] المفاتيح، و [[.GetEnumerator()]] بيلف على المفتاح والقيمة مع بعض (كل عنصر فيه [[.Key]] و [[.Value]]).

و [[[PSCustomObject]@{ ... }]] بيحوّل الـ hashtable لـ object حقيقي زي اللي الأوامر بترجعها: بيتعرض جدول مرتب، وينفع تبعته لـ Export-Csv و Sort-Object و Where-Object. القاعدة: hashtable للإعدادات والبحث بالمفتاح، و PSCustomObject لأي «صف بيانات» هيطلع من السكربت. وخلي بالك إن [[@()]] و [[@{}]] شبه بعض بس مختلفين تمامًا، وشرح كل رمز في درس «رموز PowerShell».`,
          example: R`$services = @("web", "api")
$services += "db"
$services.Count
$services[0]
$services[-1]
$services -contains "api"
$ports = [ordered]@{ web = 3000; api = 8000 }
$ports["db"] = 5432
$ports.api
$ports.Keys
foreach ($kv in $ports.GetEnumerator()) { "$($kv.Key) -> $($kv.Value)" }
$server = [PSCustomObject]@{ Name = "api"; Port = 8000; Up = $true }
$server.Port
$rows = foreach ($s in $services) { [PSCustomObject]@{ Service = $s; Port = $ports[$s] } }
$rows | Format-Table`,
          try: R`شيل [[[ordered]]] من السطر السابع وشغّل تاني، ولاحظ ترتيب [[$ports.Keys]]. وبعدين صدّر [[$rows]] لملف CSV.`,
          flag: "script",
          deep: {
            why: "أي سكربت حقيقي فيه لستات: سيرفرات تلف عليها، امتدادات تفلتر بيها، إعدادات بالاسم والقيمة، ونتايج عايز تطلعها جدول أو CSV. التلات أنواع دول هم كل اللي هتحتاجه تقريبًا.",
            how: R`الـ array في PowerShell حجمها ثابت، و [[+=]] في الحقيقة بتعمل array جديدة وتنسخ كل العناصر. على كام مية عنصر مش هتحس، لكن في لوب على عشرات الآلاف هتبقى بطيئة جدًا. البديل: خلّي اللوب نفسه يرجّع القيم ([[$rows = foreach (...) { ... }]] زي السطر قبل الأخير)، أو استخدم لستة بتكبر فعلًا: [[$names = New-Object System.Collections.Generic.List[string]]] وبعدين [[$names.Add("x")]].

[[@()]] بتضمن إن الناتج array حتى لو عنصر واحد أو مفيش: [[$logs = @(Get-ChildItem *.log)]]. من غيرها، لو مفيش نتايج المتغير بيبقى [[$null]]، ولو نتيجة واحدة بيبقى object لوحده مش لستة، ولو النتيجة دي نص [[$x[0]]] بترجع أول حرف فيه مش أول عنصر.

الـ array جوه الـ array: [[$matrix = @(@(1,2), @(3,4))]] و [[$matrix[1][0]]] بترجع 3. وتقطيع جزء: [[$services[0..1]]] أول عنصرين.

hashtable: [[.ContainsKey("db")]] موجود ولا لأ، و [[.Remove("db")]] تشيله، و [[.Count]] عدد المفاتيح. المفاتيح مش بتفرّق بين الكابيتال والسمول افتراضيًا. ولما تلف عليه بـ [[foreach ($k in $h.Keys)]] متعدّلش فيه جوه اللوب، هيطلع error.

[[[PSCustomObject]]] بيحافظ على ترتيب الأعمدة زي ما كتبتها، وتقدر تزوّد عمود بعدين بـ [[Add-Member]] أو تعمل objects جديدة من القديمة بـ [[Select-Object]].`,
            when: "Hashtable لإعدادات السكربت والـ splatting (درس splatting). PSCustomObject لأي تقرير أو ناتج هيتعرض أو يتصدّر. Array لأي لستة بتلف عليها.",
            mistakes: R`تبني نتيجة كبيرة بـ [[$result += ...]] جوه لوب فالسكربت يبطأ جدًا. أو تنسى [[[ordered]]] وتستغرب إن الأعمدة طالعة بترتيب عشوائي. أو تطبع hashtable جوه نص [["$ports"]] فيطلع [[System.Collections.Specialized.OrderedDictionary]]. أو تعمل [[Export-Csv]] لـ hashtable مباشرة فيطلع أعمدة غريبة زي Keys و Values، حوّله لـ PSCustomObject الأول.`
          },
          lines: [
            "array بعنصرين.",
            "ضيف عنصر تالت.",
            "العدد: 3.",
            "أول عنصر (العد من صفر): web.",
            "آخر عنصر (السالب بيعد من الآخر): db.",
            "api جوه اللستة؟ True.",
            "hashtable مترتب: مفتاح = قيمة، و [[;]] بين العناصر.",
            "ضيف مفتاح جديد.",
            "اقرا قيمة بالنقطة: 8000.",
            "المفاتيح بالترتيب: web و api و db.",
            "لف على كل مفتاح وقيمته.",
            "object حقيقي بـ 3 خصائص.",
            "اقرا خاصية: 8000.",
            "لكل خدمة اعمل صف فيه اسمها والبورت بتاعها، واللوب نفسه بيرجّع الصفوف لـ [[$rows]].",
            "اعرضهم جدول."
          ],
          sol: R`الناتج: [[3]] و [[web]] و [[db]] و [[True]] و [[8000]]، وبعدين web و api و db كل واحد في سطر، و [[web -> 3000]] و [[api -> 8000]] و [[db -> 5432]]، و [[8000]]، وفي الآخر جدول بعمودين Service و Port فيه التلات خدمات.

لما شلت [[[ordered]]] و جربت hashtable عادي بمفاتيح b و a و c، الترتيب طلع b و c و a: مش ترتيب الإدخال ولا أبجدي. والتصدير في الـ solCode: [[$rows | Export-Csv services.csv -NoTypeInformation]] عمل ملف أوله [["Service","Port"]] وبعدين [["web","3000"]] وهكذا. ولو جربت تصدّر [[$ports]] نفسه (hashtable) هيطلع أعمدة ملهاش علاقة ببياناتك.`,
          solCode: R`$rows | Export-Csv services.csv -NoTypeInformation
Get-Content services.csv`
        },
        {
          cmd: "عوامل المقارنة",
          title: "-eq و -like و -match و -contains: مين بيعمل إيه",
          desc: R`في PowerShell المقارنة بكلمات بتبدأ بشرطة مش برموز، لأن [[>]] و [[<]] محجوزين للتوجيه زي bash. الأساسيين: [[-eq]] يساوي، [[-ne]] مش يساوي، [[-gt]] أكبر من، [[-ge]] أكبر من أو يساوي، [[-lt]] أصغر من، [[-le]] أصغر من أو يساوي. وكلهم مش بيفرّقوا بين الكابيتال والسمول افتراضيًا ([["ABC" -eq "abc"]] صح)، ولو عايز تفرّق حط [[c]] قبلهم: [[-ceq]] و [[-clike]] و [[-cmatch]].

للنصوص: [[-like]] بـ wildcard ([[*]] أي حروف و [[?]] حرف واحد)، و [[-match]] بـ regex، ولما ينجح بيملى متغير اسمه [[$Matches]] باللي لقاه، و [[$Matches[1]]] أول جزء بين أقواس. وعكسهم [[-notlike]] و [[-notmatch]]. وللستات: [[-contains]] اللستة على الشمال والعنصر على اليمين، و [[-in]] العكس، وعكسهم [[-notcontains]] و [[-notin]].

فخّين لازم تعرفهم: النوع بيتحدد من اللي على الشمال، فـ [["10" -gt "9"]] مقارنة نصوص فبترجع False (زي ترتيب القاموس)، و [[8 + "2"]] بيطلع 10 بينما [["8" + 2]] بيطلع 82. ولو الشمال array، المقارنة مش بترجع True أو False، بترجع العناصر اللي بتحقق الشرط ([[@(1,5,8,12) -gt 4]] بيرجع 5 و 8 و 12). عشان كده [[$null]] يتحط على الشمال دايمًا: [[$null -eq $x]]. والربط بين شرطين [[-and]] و [[-or]] و [[-not]] في درس if / switch.`,
          example: R`5 -eq 5
"ABC" -eq "abc"
"ABC" -ceq "abc"
10 -gt 9
"10" -gt "9"
"report.pdf" -like "*.pdf"
"v2.15.0" -match '^v(\d+)\.(\d+)'
$Matches[1]
@("web", "api") -contains "api"
"api" -in @("web", "api")
@(1, 5, 8, 12) -gt 4
$null -eq $x
"8" + 2
8 + "2"`,
          try: R`اعمل [[$ext = ".JPG"]] واكتب شرط بيقول True لو الامتداد صورة (jpg أو png) بطريقتين: مرة بـ [[-in]] ومرة بـ [[-match]].`,
          deep: {
            why: R`أول حاجة بتلخبط أي حد جاي من JavaScript أو Python أو bash: [[==]] مش موجودة، و [[>]] بتعمل ملف (درس if / switch). وبعد ما تتعلم [[-eq]] بتقابلك مفاجآت أصعب: أرقام بتتقارن كنصوص، و array بترجع عناصر بدل True، و [[-contains]] بيتستخدم غلط على النصوص.`,
            how: R`القاعدة الذهبية: PowerShell بيحوّل اللي على اليمين لنوع اللي على الشمال. [[10 -eq "10"]] صح، و [["10" -eq 10]] صح، بس [["10" -gt "9"]] نص مع نص فبيقارن حرف حرف و "1" أصغر من "9". القيم اللي جاية من CSV أو Read-Host أو ملف نصوص دايمًا، فحوّلها: [[[int]$age -gt 30]].

[[-like]] لازم يطابق النص كله: [["report.pdf" -like "pdf"]] False، لازم [["*pdf"]]. أما [[-match]] بيدوّر في أي حتة: [["report.pdf" -match "pdf"]] True. ولو عايز [[-match]] يطابق الكل حط [[^]] و [[$]].

[[-contains]] للستات بس، مش «النص ده فيه كلمة كذا». [["hello world" -contains "world"]] بترجع False، لأن النص اتعامل كلستة فيها عنصر واحد بيساوي "hello world". للنص استخدم [[-like "*world*"]] أو [[-match "world"]] أو [[.Contains("world")]] (الأخيرة بتفرّق بين الكابيتال والسمول).

مع array على الشمال: [[-eq]] و [[-gt]] و [[-like]] و [[-match]] بيشتغلوا كفلتر. فـ [[if ($list -eq "x")]] بتبقى True لو فيه عنصر بيساوي x (لأن اللستة الراجعة مش فاضية)، وده بيلخبط. و [[$null]] بالذات: [[@(1, $null, 2) -eq $null]] بيرجع لستة فيها $null، مش True. عشان كده [[$null -eq $x]].

[[$Matches]] بيتملى بس لما [[-match]] ينجح على قيمة واحدة (مش array)، وبيفضل بالقيمة القديمة لو الـ match اللي بعده فشل، فاستخدمه جوه [[if]] على طول.`,
            when: "كل [[if]] و [[Where-Object]] و [[switch]] هتكتبهم. ولما بتقارن أرقام نسخ أو أعمار أو أحجام جاية من ملف، افتكر تحوّل النوع.",
            mistakes: R`[[if ($a == $b)]] بيطلع ParserError، و [[if ($a > 5)]] بيعمل ملف اسمه 5. و [[-contains]] على نص. و [[-like "pdf"]] من غير نجوم. ومقارنة أرقام جاية من CSV كنصوص فـ "9" تطلع أكبر من "30". و [[$x -eq $null]] لما [[$x]] ممكن تبقى array.`
          },
          lines: [
            "يساوي: True.",
            "مش بيفرّق كابيتال وسمول افتراضيًا: True.",
            "[[-ceq]] بيفرّق: False.",
            "أكبر من، أرقام: True.",
            "نفس الأرقام كنصوص: False، لأنه بيقارن حرف حرف.",
            "wildcard: True.",
            "regex: True، والأجزاء اللي بين أقواس اتحفظت في [[$Matches]].",
            "أول جزء: 2.",
            "اللستة فيها api؟ True.",
            "api جوه اللستة؟ نفس السؤال بالعكس: True.",
            "array على الشمال: بيرجع العناصر اللي أكبر من 4، مش True.",
            "[[$null]] على الشمال دايمًا: True لأن [[$x]] مش متعرّف.",
            "الشمال نص: لزق نصوص، 82.",
            "الشمال رقم: جمع، 10."
          ],
          sol: R`جربت المثال على PowerShell 7 فطلع بالترتيب: [[True]] و [[True]] و [[False]] و [[True]] و [[False]] و [[True]] و [[True]] و [[2]] و [[True]] و [[True]]، وبعدين 5 و 8 و 12 كل واحد في سطر، و [[True]] و [[82]] و [[10]].

الحل في الـ solCode، والاتنين طلعوا [[True]] مع [[.JPG]] لأن [[-in]] و [[-match]] مش بيفرّقوا كابيتال وسمول. في الـ regex [[\.]] نقطة حقيقية و [[(jpe?g|png)]] يعني jpg أو jpeg أو png و [[$]] آخر النص. لو كتبت [[$ext -contains ".jpg"]] هتلاقيها شغالة صدفة (لأن النص عنصر واحد بيساوي)، بس دي مش وظيفتها، ومع [[".jpeg"]] مش هتلاقي jpg.`,
          solCode: R`$ext = ".JPG"
$ext -in ".jpg", ".jpeg", ".png"
$ext -match '^\.(jpe?g|png)$'`
        },
        {
          cmd: "if / switch",
          title: "الشروط",
          desc: R`[[if (شرط) { كود }]]: الشرط بين أقواس هلالية، والكود بين أقواس معقوفة، وبعده [[elseif (شرط تاني) { }]] و [[else { }]] اختياريين. والنص لوحده في سطر بيتطبع، فمش محتاج echo.

المقارنة بكلمات مش رموز: [[-eq]] يساوي، و [[-ne]] مش يساوي، و [[-gt]] أكبر، و [[-lt]] أصغر، و [[-like]] و [[-match]] للنصوص (كلهم في درس «عوامل المقارنة»). والربط: [[-and]] الاتنين صح، و [[-or]] واحد منهم، و [[-not]] (أو [[!]]) العكس. ولو الشرط أمر، حطه في أقواس جوه الأقواس: [[if ((Test-Path .env) -and ...)]]. أشهر غلطة: [[if ($x > 5)]] مش بيقارن، [[>]] بيكتب 5 في ملف اسمه 5 (جرّبها في «جرّب»)، و [[==]] بيطلع error.

[[switch ($value) { ... }]] أنضف من if كتير ورا بعض: كل سطر جواه قيمة وبعدها الكود بتاعها، و [[default]] لأي حاجة تانية. و [[$args[0]]] أول argument اتبعت للسكربت لو مفيهوش param (الطريقة الأحسن في درس «param()»).`,
          example: R`$port = 3000
if ($port -eq 3000) {
    "Default port"
} elseif ($port -lt 1024) {
    "Needs admin"
} else {
    "Custom port"
}

if ((Test-Path .env) -and -not (Test-Path .env.example)) {
    "Missing example file"
}

switch ($args[0]) {
    "start" { "Starting..." }
    "stop"  { "Stopping..." }
    default { "Usage: script.ps1 start|stop" }
}`,
          try: R`جرب [[if (5 > 3) { "yes" }]] وشوف الملف اللي اتعمل اسمه 3.`,
          flag: "script",
          deep: {
            why: R`السكربت محتاج ياخد قرارات: الملف موجود؟ الأمر نجح؟ المستخدم كتب start ولا stop؟ وهنا أكتر مكان بيقع فيه اللي جاي من لغة تانية، لأن المقارنة بكلمات زي [[-eq]] مش رموز.`,
            how: R`[[if (condition) { } elseif { } else { }]]. الأقواس الهلالية [[()]] مهمة حوالين الشرط.

عوامل المقارنة: [[-eq]] يساوي، [[-ne]] مش يساوي، [[-gt]] أكبر، [[-lt]] أصغر، [[-ge]] أكبر أو يساوي، [[-le]] أصغر أو يساوي، [[-like "*.txt"]] wildcard، [[-match "regex"]] regex، [[-contains]] تحقق من وجود في array.

وللنصوص: [[-ceq]] case-sensitive. والنفي بـ [[-not]] أو [[!]].

[[switch]] أنضف لما عندك كذا احتمال: بيقارن على [[$_]] وبيسمح بـ wildcards وregex.`,
            when: "أي logic في السكربت. التحقق من وجود ملف. المقارنة بين قيمتين.",
            mistakes: "استخدام [[==]] بدل [[-eq]] أو [[>]] بدل [[-gt]]. مش شغالة في PowerShell."
          },
          lines: [
            "متغير.",
            "لو يساوي ([[-eq]] مش ==). الشرط بين أقواس هلالية والكود بين معقوفة.",
            "اطبع (أي نص لوحده بيتطبع).",
            "وإلا لو أصغر من ([[-lt]]).",
            "اطبع.",
            "وإلا.",
            "اطبع.",
            "قفلة.",
            "شرطين مع بعض ([[-and]])، والتاني معكوس ([[-not]]).",
            "اطبع.",
            "قفلة.",
            "switch على أول argument للسكربت.",
            "لو start.",
            "لو stop.",
            "أي حاجة تانية.",
            "قفلة."
          ],
          sol: R`[[if (5 > 3) { "yes" }]] مطبعش [[yes]]، ولو عملت [[Get-ChildItem]] هتلاقي ملف جديد اسمه [[3]]، وجواه [[5]]. جربتها بالظبط كده. [[>]] في PowerShell redirect زي bash، فالشرط بقى «اكتب 5 في ملف اسمه 3»، والشرط نفسه ملوش output فاتحسب False.

الصح [[if (5 -gt 3) { "yes" }]] وده طبع [[yes]]. امسح الملف بـ [[Remove-Item 3]]. والغلطة دي مبتطلعش أي error، عشان كده خطيرة في السكربتات: الشرط دايمًا False وملفات بأرقام بتظهر في الفولدر.`
        },
        {
          cmd: "foreach / for / while",
          title: "اللوب",
          desc: R`اللوب بيكرر كود. PowerShell فيه ٣ أنواع، وكل واحد ليه استخدام:

[[foreach ($f in $list) { }]] بيلف على كل عنصر في لستة، و [[$f]] اسم انت بتختاره للعنصر الحالي. ده الأكتر استخدامًا، وبيلف على أي حاجة: ملفات أو أرقام أو أسطر. و [[for ($i = 1; $i -le 3; $i++) { }]] لوب بعدّاد بنفس شكل JavaScript و C: البداية، والشرط ([[-le]] يعني أصغر من أو يساوي)، والزيادة ([[$i++]] زوّد واحد). و [[while (شرط) { }]] بيفضل يلف طول ما الشرط صح، فلازم حاجة جوه تغيّره وإلا هيلف للأبد.

في الآخر [[1..5 | ForEach-Object { $_ * 2 }]] نفس فكرة التكرار بس جوه pipeline. و [[break]] يخرج من اللوب، و [[continue]] يعدّي للّفة اللي بعدها. وخلي بالك: [[foreach]] كلمة اللوب و [[ForEach-Object]] أمر الـ pipe حاجتين مختلفين، حتى لو [[foreach]] كمان اختصار ليه بعد [[|]].`,
          example: R`foreach ($f in Get-ChildItem *.log) {
    "$($f.Name): $($f.Length) bytes"
}

for ($i = 1; $i -le 3; $i++) {
    "Try $i"
}

$n = 0
while ($n -lt 3) {
    $n++
}

1..5 | ForEach-Object { $_ * 2 }`,
          try: "اعمل 5 فولدرات day1 لـ day5 بلوب.",
          flag: "script",
          deep: {
            why: R`أي أتمتة حقيقية معناها «اعمل نفس الحاجة لكل ملف أو كل سيرفر أو كل سطر». من غير لوب هتكتب نفس السطر مية مرة.`,
            how: R`[[foreach ($item in $collection) { }]] أوضح لوب. [[for ($i = 0; $i -lt 10; $i++) { }]] للعد. [[while ($condition) { }]] طول ما شرط صح.

وهنا مهم تعرف الفرق بين [[ForEach-Object]] في pipeline و[[foreach]] في السكربت: ForEach-Object pipeline بيبدأ يعالج بمجرد ما يجي أول element. foreach في السكربت بيجمع كل الـ collection أول. عشان كده لو بتتعامل مع output ضخم، ForEach-Object في pipeline أحسن للذاكرة.

[[break]] يخرج من اللوب. [[continue]] يعدّي للـ iteration الجاية.`,
            when: "تعمل حاجة على كل ملف أو كل عنصر.",
            mistakes: "[[foreach]] مع pipeline بدل [[ForEach-Object]] فـ PowerShell يجمع كل الـ objects في الذاكرة الأول."
          },
          lines: [
            "لكل ملف log، سمّيه [[$f]].",
            "اطبع اسمه وحجمه. [[$( )]] عشان الـ property جوه النص.",
            "قفلة.",
            "عدّاد من ١ لـ ٣ (نفس شكل JavaScript).",
            "اطبع.",
            "قفلة.",
            "ابدأ من صفر.",
            "طول ما أقل من ٣.",
            "زوّد.",
            "قفلة.",
            "نفس التكرار بس في pipeline: كل رقم في اتنين."
          ],
          sol: R`الحل في الـ solCode (أو [[1..5 | ForEach-Object { New-Item -ItemType Directory "day$_" }]] في سطر). جربته و [[Get-ChildItem -Directory day*]] طلع [[day1]] لـ [[day5]].

من غير [[-ItemType Directory]] هتلاقي 5 ملفات فاضية مش فولدرات. ولو كتبت [[for ($i = 1; $i -lt 5; $i++)]] هتعمل 4 بس، عشان كده [[-le]]. ولو شغلته مرتين New-Item هيطلع error إن الفولدر موجود، [[-Force]] أو [[mkdir]] بتعدّيها.`,
          solCode: R`foreach ($i in 1..5) {
    New-Item -ItemType Directory "day$i" -Force | Out-Null
}
Get-ChildItem -Directory day* | Select-Object Name`
        },
        {
          cmd: "function",
          title: "فانكشنز",
          desc: R`الفانكشن اسم لحتة كود بتناديها كذا مرة، زي أي أمر. بتتكتب [[function الاسم { الكود }]]، وتناديها باسمها ومعاها parameters زي أي cmdlet ([[Get-FolderSize -Path .\node_modules]]).

جوه [[param( )]] بتعرّف الـ parameters: [[[string]$Path]] يعني parameter اسمه Path ونوعه نص، و [[[Parameter(Mandatory)]]] فوقه يعني إجباري: لو مكتبتوش PowerShell هيسألك عليه بدل ما يكمّل بقيمة فاضية. وفي سطر الحساب [[[math]::Round(x, 2)]] بتقرّب لرقمين بعد العلامة.

أهم فرق عن أي لغة تانية: أي قيمة مش متخزنة في متغير ولا متبعتة لحاجة بتطلع «output» للفانكشن، فمش محتاج [[return]]. ده كويس بس بيعمل مفاجآت: أمر زي [[New-Item]] جوه الفانكشن بيطبع ناتجه وبيبقى جزء من اللي الفانكشن بترجعه، فحط بعده [[| Out-Null]]. وسمّي فانكشنزك Verb-Noun زي الأوامر الأصلية ([[Get-]] و [[Test-]] و [[New-]]). الـ parameters المتقدمة في درس «param()».`,
          example: R`function Get-FolderSize {
    param(
        [Parameter(Mandatory)]
        [string]$Path
    )
    $bytes = (Get-ChildItem $Path -Recurse -File | Measure-Object Length -Sum).Sum
    [math]::Round($bytes / 1MB, 2)
}

Get-FolderSize -Path .\node_modules`,
          try: "اعمل فانكشن Test-Tool بتاخد اسم برنامج وترجع True أو False حسب إنه متسطب.",
          flag: "script",
          deep: {
            why: R`لما سطرين ولا تلاتة بيتكرروا في السكربت، أو عايز تدّي حتة كود اسم واضح وتختبرها لوحدها. وكمان بتحطها في الـ profile فتبقى أمر عندك في كل نافذة.`,
            how: R`[[function Name { param([type]$Name) ... }]]. [[param()]] بيعرّف الـ parameters بأنواعها وقيمها الافتراضية.

[[return $value]] بيرجع قيمة. أو تكتب القيمة من غير return وهي بترجع تلقائيًا لو كانت آخر expression.

[[CmdletBinding()]] بيضيف behavior زي الـ cmdlets: [[-Verbose]]، و[[-WhatIf]]، و[[-ErrorAction]].

وfunction ممكن ترجع objects، وأي حاجة تطبعها في الـ function بترجع كـ output في الـ pipeline (مش لازم return).`,
            when: "كود بيتكرر. منطق التحقق. تنظيم السكربت.",
            mistakes: "كتابة الناتج بـ Write-Host في function وتتوقع توصلك في pipeline. Write-Host بيكتب على الشاشة بس. استخدم Write-Output أو خليها بدون كلمة."
          },
          lines: [
            "فانكشن باسم Verb-Noun زي أوامر PowerShell.",
            "بداية تعريف الـ parameters.",
            "الـ parameter ده إجباري، لو مكتبتوش PowerShell هيسأل عليه.",
            "نوعه نص واسمه Path.",
            "قفلة الـ parameters.",
            "مجموع أحجام الملفات في الفولدر.",
            "حوّله لميجا وقرّب لرقمين. القيمة دي هي اللي الفانكشن بترجعها (آخر حاجة اتطبعت).",
            "قفلة.",
            "نادي الفانكشن زي أي أمر."
          ],
          sol: R`الفكرة: [[Get-Command]] بيرجع الأمر لو موجود، و [[-ErrorAction SilentlyContinue]] يخليه يرجع لا شيء من غير error لو مش موجود، و [[bool]] بيحول ده لـ True أو False. جربتها: [[Test-Tool node]] رجّع [[True]] و [[Test-Tool nosuchtool]] رجّع [[False]].

لو نسيت [[-ErrorAction SilentlyContinue]] هتشوف error أحمر قبل False. ولو ناديتها من غير اسم، [[Mandatory]] هيطلب منك [[Name:]] في الترمنال. ولاحظ إنها بتلاقي أي حاجة ممكن تتشغل (برامج و cmdlets و aliases)، فـ [[Test-Tool ls]] هترجع True.`,
          solCode: R`function Test-Tool {
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )
    [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

Test-Tool node
Test-Tool nosuchtool`
        },
        {
          cmd: "Write-Host والـ output",
          title: "الفرق اللي بيلخبط الناس",
          desc: R`في PowerShell فيه طريقين تطلع بيهم حاجة، والفرق بينهم بيلخبط ناس كتير. الأول الـ output الحقيقي: أي قيمة لوحدها في سطر (زي [["hi"]]) أو [[Write-Output]]، ودي بتروح للـ pipeline: الأمر اللي بعدك يستلمها، أو تتخزن في متغير، أو تترجع من الفانكشن. ولو مفيش حاجة بعدك، بتتطبع على الشاشة.

التاني [[Write-Host]]: بيكتب على الشاشة مباشرة وبس، ومش بيدخل الـ pipeline. ميزته الألوان ([[-ForegroundColor Green]]). فالمثال: [[Show-Greeting]] بتستخدم Write-Host فـ [[Measure-Object]] بيستلم صفر حاجات، و [[Get-Greeting]] بترجع النص فبيستلم واحدة. والأقواس [[( ... ).Count]] بتنفّذ الـ pipeline وتاخد عدد اللي طلع.

القاعدة: البيانات اللي حد هيستخدمها ترجع output عادي، والرسايل اللي للإنسان بس (جاري التحميل، تم) Write-Host. وفيه كمان [[Write-Verbose]] للتفاصيل (بتظهر بـ [[-Verbose]] بس) و [[Write-Warning]] بالأصفر.`,
          example: R`function Show-Greeting { Write-Host "hi" }
function Get-Greeting { "hi" }

(Show-Greeting | Measure-Object).Count
(Get-Greeting | Measure-Object).Count`,
          try: "شغّلهم: الأولى هتطبع hi والعدد 0، والتانية العدد 1.",
          flag: "script",
          deep: {
            why: R`فانكشن بترجع قيمة، بس لما تخزنها في متغير تلاقيه فاضي، والقيمة اتطبعت على الشاشة بس. أو العكس: فانكشن بترجع حاجات زيادة مكانتش قاصدها. الاتنين سببهم إنك مش فارق بين «اطبع للإنسان» و «رجّع للكود».`,
            how: R`[[Write-Host]] بيكتب مباشرة على الشاشة، ما بيمررش في الـ pipeline. [[Write-Output]] بيكتب في الـ pipeline (أو على الشاشة لو مفيش pipe). [[Write-Verbose]] بيظهر بس لو [[-Verbose]] متضاف. [[Write-Error]] للأخطاء. [[Write-Warning]] للتحذيرات.

في سكربت: لو عايز تعرض حاجة للمستخدم بس، استخدم Write-Host. لو عايز الـ output يتمرر في pipeline، اكتبها بس أو Write-Output.

[[Write-Host]] بيسمح بـ [[-ForegroundColor Red]] للألوان. مفيد في الـ logging.`,
            when: "تعرض تقدم السكربت للمستخدم. تفرق بين الـ output المفيد للـ pipeline والرسايل للمستخدم.",
            mistakes: "تستخدم Write-Host لـ output هتحتاجه في pipeline. والعكس: تكتب output وأنت لا تريد إنه يدخل pipeline."
          },
          lines: [
            "فانكشن بتطبع على الشاشة مباشرة.",
            "فانكشن بترجع قيمة (النص لوحده = output).",
            "عدّ اللي رجع منها: صفر، لأن Write-Host مش بيدخل الـ pipeline.",
            "عدّ اللي رجع من التانية: واحد. ده الفرق كله."
          ],
          sol: R`شغلتهم: الأول طبع [[hi]] وبعدها [[0]]، والتاني طبع [[1]] بس من غير hi. Write-Host بعت hi للشاشة مباشرة، فـ Measure-Object مستلمش حاجة. أما [["hi"]] في Get-Greeting راحت للـ pipeline فاتعدّت.

من PowerShell 5 Write-Host بيكتب في information stream (رقم 6)، فتقدر تمسكه بـ [[6>&1]]: [[(Show-Greeting 6>&1 | Measure-Object).Count]] هترجع 1، وجربتها. والقاعدة في الفانكشنز: الداتا اللي هترجع تطلع output عادي، والرسايل للمستخدم Write-Host أو Write-Verbose.`
        }
      ]
    },
    {
      t: "سكربتات زي المحترفين",
      l: 3,
      n: R`parameters وأخطاء ولوج وموديولات: الفرق بين سكربت شغال عندك وسكربت حد تاني يقدر يعتمد عليه`,
      items: [
        {
          cmd: "param()",
          title: "خلّي السكربت ياخد arguments بأنواع وقيم افتراضية وتحقق",
          desc: R`[[param( )]] في أول سطر في السكربت (أو أول حاجة جوه function) بتعرّف الـ arguments اللي بياخدها، فبتشغّله زي أي أمر: [[.\deploy.ps1 -Project shop -Stage prod]]. كل parameter متغير، وقبله نوعه بين أقواس مربعة: [[[string]]] نص، و [[[int]]] رقم صحيح، و [[[switch]]] مفتاح بيبقى True لو كتبته ([[-Force]]) و False لو لأ، من غير قيمة بعده. والـ parameters بتتفصل بفواصل.

القيمة بعد [[=]] هي الافتراضية لو محدش بعتها. و [[[Parameter(Mandatory)]]] يعني إجباري: لو ناقص، PowerShell بيسأل عليه في الترمنال، أو بيطلع error لو التشغيل مش تفاعلي. و [[[ValidateSet("dev", "staging", "prod")]]] بيرفض أي قيمة غير دول (وبيديك Tab completion بيهم كمان)، و [[[ValidateRange(1, 65535)]]] بيرفض الأرقام برا الرينج. فالتحقق بيحصل قبل أول سطر في السكربت بيتنفذ، بدل ما تكتب [[if]] لكل حاجة.

الأسامي ممكن تتكتب كاملة ([[-Project shop]]) أو مختصرة لو مش ملخبطة ([[-Proj shop]])، أو من غيرها خالص بالترتيب ([[.\deploy.ps1 shop prod]]). ده المقابل لـ [[$1]] و [[getopts]] في bash بس أقوى بكتير. والـ [[$args]] اللي في درس if / switch بيتملى بس لو السكربت مفيهوش param.`,
          example: R`param(
    [Parameter(Mandatory)]
    [string]$Project,

    [ValidateSet("dev", "staging", "prod")]
    [string]$Stage = "dev",

    [ValidateRange(1, 65535)]
    [int]$Port = 3000,

    [switch]$Force
)

"Project: $Project | Stage: $Stage | Port: $Port | Force: $Force"
if ($Force) { "Skipping checks" }`,
          try: R`احفظه deploy.ps1 وشغّله: من غير أي حاجة، وبـ [[-Project shop]]، وبـ [[-Stage live]]، وبـ [[-Port 70000]]، وبـ [[-Project shop -Stage prod -Force]]. اقرا كل رسالة.`,
          flag: "script",
          deep: {
            why: "سكربت بقيم ثابتة جواه بتعدّله كل مرة قبل ما تشغّله، أو بتقرا [[$args[0]]] و [[$args[1]]] وتتمنى إن اللي شغّله فاكر الترتيب. param بيخلي السكربت بتاعك أمر حقيقي: ليه أسامي واضحة، وقيم افتراضية، ورسايل خطأ مفهومة لو حد بعت حاجة غلط، و [[Get-Help .\deploy.ps1]] بيعرض الـ parameters بتاعته.",
            how: R`الأنواع الشائعة: [[[string]]] و [[[int]]] و [[[double]]] و [[[bool]]] و [[[datetime]]]، و [[string[]]] بين أقواس مربعة زيهم يعني لستة نصوص (تتبعت [[-Names a, b, c]]). PowerShell بيحوّل القيمة للنوع لوحده، ولو مقدرش بيرفض قبل ما السكربت يبدأ: [[-Port abc]] بيطلع «Cannot convert value».

[[[switch]]] أحسن من [[[bool]]] للفلاجات: بتكتب [[-Force]] بس. ولو محتاج تبعته من متغير: [[-Force:$true]].

تحقق إضافي: [[[ValidatePattern('^[a-z0-9-]+$')]]] بـ regex (وخلي بالك إنه مش بيفرّق كابيتال وسمول افتراضيًا)، و [[[ValidateScript({ Test-Path $_ })]]] بأي شرط، و [[[ValidateNotNullOrEmpty()]]] يرفض الفاضي.

القيمة الافتراضية ممكن تبقى تعبير: [[[string]$Dest = (Join-Path $HOME "backups")]].

شرح للـ parameter يظهر في Get-Help: سطر تعليق فوقه أو [[[Parameter(HelpMessage = "...")]]].

و [[$PSBoundParameters]] hashtable فيه الـ parameters اللي اتبعتت فعلًا بس (من غير الافتراضي)، مفيد مع splatting (درس splatting).

لو بتشغّل من بره بـ [[pwsh -File]]: الـ arguments بتوصل نصوص، فلستة زي [[-Urls a, b]] مش بتتفهم array (بتوصل [["a,"]] و [["b"]])، و [[[switch]]] يتبعت [[-Force]] عادي. لو محتاج لستة من بره استخدم [[pwsh -Command]].`,
            when: "أي سكربت هيتشغّل أكتر من مرة بقيم مختلفة، أو هيشغّله حد غيرك، أو هيتحط في Task Scheduler.",
            mistakes: R`تحط [[param()]] بعد أي سطر تاني في الملف (حتى [[$ErrorActionPreference]])، فـ PowerShell مش بيعتبرها تعريف parameters. أول حاجة في الملف لازم تبقى param (التعليقات و [[[CmdletBinding()]]] بس مسموح قبلها). أو تسمّي parameter باسم متغير محجوز زي [[$args]] أو [[$input]] أو [[$Host]]. أو تنسى الفاصلة بين الـ parameters فيطلع ParserError. أو تعمل الـ parameter إجباري وتشغّل السكربت في Task Scheduler من غيره، فيفضل مستني حد يكتب.`
          },
          lines: [
            "بداية تعريف الـ arguments، ولازم تبقى أول حاجة في الملف.",
            "اللي بعده إجباري.",
            "اسم المشروع، نص. الفاصلة بتفصل بين الـ parameters.",
            "مسموح بالتلات قيم دول بس.",
            "المرحلة، والافتراضي dev لو محدش بعتها.",
            "رقم بين 1 و 65535 بس.",
            "البورت، رقم صحيح، والافتراضي 3000.",
            "مفتاح: True لو كتبت [[-Force]]، و False لو لأ.",
            "قفلة الـ parameters.",
            "اطبع القيم اللي وصلت.",
            "الـ switch بيتقري زي أي True أو False."
          ],
          sol: R`جربتهم على PowerShell 7: من غير حاجة بيسألك [[Project:]] في الترمنال (ولو التشغيل non-interactive بيطلع [[Cannot process command because of one or more missing mandatory parameters: Project.]]). [[-Project shop]] طبع [[Project: shop | Stage: dev | Port: 3000 | Force: False]]. [[-Stage live]] طلع [[Cannot validate argument on parameter 'Stage'. The argument "live" does not belong to the set "dev,staging,prod"...]] من غير ما ولا سطر في السكربت يشتغل. [[-Port 70000]] طلع [[The 70000 argument is greater than the maximum allowed range of 65535.]].

و [[-Project shop -Stage prod -Force]] طبع [[Project: shop | Stage: prod | Port: 3000 | Force: True]] وتحته [[Skipping checks]]. وكمان [[.\deploy.ps1 shop prod]] من غير أسامي اشتغلت بالترتيب. جرّب تكتب [[.\deploy.ps1 -Stage ]] وتدوس Tab: هيلف على dev و staging و prod.`
        },
        {
          cmd: "[CmdletBinding()]",
          title: "-Verbose و -WhatIf في سكربتك انت",
          desc: R`[[[CmdletBinding()]]] سطر بتحطه فوق [[param( )]] فيحوّل السكربت (أو الفانكشن) لـ «advanced script»: بياخد أوتوماتيك الـ parameters المشتركة اللي كل أوامر PowerShell بتاخدها، زي [[-Verbose]] و [[-ErrorAction]]. فـ [[Write-Verbose "..."]] جوه السكربت مش بتطبع حاجة عادةً، ولما تشغّل بـ [[-Verbose]] بتطلع بالأصفر. يعني رسايل التفاصيل موجودة لما تحتاجها بس.

ولو كتبته [[[CmdletBinding(SupportsShouldProcess)]]]، السكربت كمان بياخد [[-WhatIf]] و [[-Confirm]]. وجوه الكود، قبل أي خطوة بتغيّر حاجة، بتسأل [[$PSCmdlet.ShouldProcess("الهدف", "العملية")]]: مع [[-WhatIf]] بترجع False وتطبع «What if: Performing the operation...»، فمفيش حاجة بتتمسح، ومن غيرها بترجع True والخطوة بتحصل. و [[-WhatIf]] كمان بيوصل لوحده لأوامر زي Remove-Item و Move-Item جوه السكربت.

في المثال: [[Get-ChildItem $Path -Filter *.log -File]] بيجيب ملفات اللوج، و [[Write-Verbose]] بيقول لقى كام، واللوب بيسأل ShouldProcess قبل كل مسح. فالعادة الآمنة: [[.\clear-logs.ps1 -WhatIf]] الأول تشوف هيمسح إيه، وبعدين من غيرها. ومفيش حاجة زي دي في bash من غير ما تكتبها بإيدك.`,
          example: R`[CmdletBinding(SupportsShouldProcess)]
param(
    [string]$Path = ".\logs"
)

$files = Get-ChildItem $Path -Filter *.log -File
Write-Verbose "Found $($files.Count) log files in $Path"

foreach ($f in $files) {
    if ($PSCmdlet.ShouldProcess($f.Name, "Delete log")) {
        Remove-Item $f.FullName
    }
}`,
          try: R`اعمل فولدر logs فيه ملفين [[.log]]، وشغّل [[.\clear-logs.ps1 -WhatIf]] وبعدين [[Get-ChildItem logs]]، وبعدين [[.\clear-logs.ps1 -Verbose]].`,
          flag: "script",
          deep: {
            why: "أي سكربت بيمسح أو بينقل أو بيغيّر حاجات محتاج «تجربة على الناشف» قبل الحقيقي. بدل ما تعمل parameter اسمه DryRun وتحط if قبل كل سطر، PowerShell بيديك [[-WhatIf]] و [[-Confirm]] جاهزين، بنفس الشكل اللي كل الأوامر الأصلية بتستخدمه، فاللي هيستخدم سكربتك يعرفه من غير ما يقرا الكود.",
            how: R`[[[CmdletBinding()]]] لوحدها بتدّي: [[-Verbose]] و [[-Debug]] و [[-ErrorAction]] و [[-WarningAction]] و [[-ErrorVariable]] وغيرهم. وبتخلي السكربت يرفض أي argument مش متعرّف بدل ما يحطه في [[$args]] من غير ما تاخد بالك.

[[SupportsShouldProcess]] بيضيف [[-WhatIf]] و [[-Confirm]]. [[$PSCmdlet]] متغير موجود بس في الـ advanced scripts، و [[.ShouldProcess(target, action)]] هو السؤال: بترجع True لو المفروض تكمّل.

مع [[-WhatIf]]: الـ ShouldProcess بتاعك بيرجع False ويطبع السطر. وكمان أي cmdlet جوه السكربت بيدعم WhatIf (Remove-Item و Move-Item و New-Item و Copy-Item و Rename-Item وغيرهم) بيورث الـ WhatIf لوحده. لكن البرامج الخارجية (git و robocopy و npm) مبتعرفش حاجة عنه، فلو السكربت فيه [[git push]] لازم يبقى جوه [[if ($PSCmdlet.ShouldProcess(...))]] وإلا هيتنفذ حتى مع WhatIf.

مع [[-Confirm]]: بيسألك قبل كل عملية Y أو N أو A (Yes to All).

[[ConfirmImpact = "High"]] جوه CmdletBinding بيخلي السكربت يسأل تأكيد لوحده من غير [[-Confirm]]، مفيد للحاجات الخطيرة جدًا.

و [[Write-Verbose]] للتفاصيل اللي محتاجها وانت بتصلّح بس، أحسن من Write-Host اللي بيطبع دايمًا ومش بتعرف تقفله.`,
            when: "أي سكربت بيمسح أو بينقل أو بيعمل rename أو بيعدّل ملفات أو إعدادات. كل سكربتات «أتمتة جاهزة» في آخر التاب مبنية كده.",
            mistakes: R`تحط [[[CmdletBinding()]]] من غير [[param()]] بعدها، فمش بتشتغل (لازم param حتى لو فاضية). أو تكتب [[SupportsShouldProcess]] وتنسى تسأل [[ShouldProcess]] قبل البرامج الخارجية، فـ [[-WhatIf]] يطمّنك والسكربت يعمل push فعلًا. أو تعمل [[Write-Host]] لرسايل التفاصيل فمتعرفش تخفيها. أو تفتكر [[-Verbose]] على السكربت هيخلي كل أمر جوه يطبع تفاصيله: جربت، [[Remove-Item]] جوه السكربت مطبعش «Performing the operation» غير لما كتبت [[-Verbose]] عليه هو نفسه.`
          },
          lines: [
            "حوّل السكربت لـ advanced script، وفعّل [[-WhatIf]] و [[-Confirm]].",
            "الـ parameters (لازم param بعد CmdletBinding حتى لو فاضية).",
            "فولدر اللوجات، والافتراضي logs جنبك.",
            "قفلة.",
            "هات ملفات .log بس.",
            "رسالة بتظهر بس مع [[-Verbose]].",
            "لكل ملف...",
            "...اسأل: أمسح الملف ده؟ مع [[-WhatIf]] بترجع False وتطبع What if.",
            "...امسح.",
            "قفلة الـ if.",
            "قفلة اللوب."
          ],
          sol: R`جربته بملفين a.log و b.log: [[-WhatIf]] طبع [[What if: Performing the operation "Delete log" on target "a.log".]] ونفس السطر لـ b.log، و [[Get-ChildItem logs]] بعدها لسه فيه الملفين. بعدين [[-Verbose]] طبع بالأصفر [[VERBOSE: Found 2 log files in .\logs]] و [[VERBOSE: Performing the operation "Delete log" on target "a.log".]] لكل ملف، والفولدر فضي. ومن غير [[-Verbose]] ولا [[-WhatIf]] بيمسح من غير ما يطبع حاجة.

لو شغلته تاني والفولدر فاضي هيطبع (مع Verbose) [[Found 0 log files]] ويخلص من غير error. وجرّب [[-Confirm]]: هيسألك قبل كل ملف [[Are you sure you want to perform this action?]] و Y أو A.`
        },
        {
          cmd: "splatting",
          title: "ابعت parameters كتير من hashtable بـ @",
          desc: R`لما الأمر بياخد parameters كتير، السطر بيبقى طويل ومش مقروء. الـ splatting إنك تحط الـ parameters في hashtable (المفتاح اسم الـ parameter من غير شرطة، والقيمة قيمته)، وتبعته للأمر بـ [[@]] بدل [[$]]: [[Copy-Item @copy]]. والـ [[[switch]]] زي [[-Recurse]] بيتكتب [[Recurse = $true]].

الميزة الأكبر: تقدر تبني الـ parameters خطوة خطوة. في المثال [[$params]] فيه Path و File، ولو [[$deep]] صح بنزوّد Recurse بسطر واحد، وبعدين نبعت الكل مرة واحدة. ده أنضف بكتير من إنك تكتب الأمر مرتين جوه if و else. ونفس الحكاية مع array للبرامج الخارجية: [[git @gitArgs]] بيبعت كل عنصر argument لوحده.

البديل لسطر طويل هو الـ backtick في آخر السطر (آخر مثال): معناه «الأمر مكمّل في السطر اللي تحت». بس خطير: لو بعده مسافة واحدة مش ظاهرة، السطر بيتقطع والباقي يتنفذ لوحده كأمر غلط. عشان كده الـ splatting أأمن وأوضح. والـ pipe [[|]] في آخر سطر بيكمّل لوحده من غير backtick.`,
          example: R`$copy = @{
    Path        = ".\src"
    Destination = ".\src_copy"
    Recurse     = $true
    Force       = $true
}
Copy-Item @copy
$params = @{ Path = "."; File = $true }
$deep = $true
if ($deep) { $params.Recurse = $true }
(Get-ChildItem @params).Count
$gitArgs = @("log", "--oneline", "-n", "3")
git @gitArgs
Get-ChildItem -Path . $__bt
    -Filter *.txt $__bt
    -Recurse`,
          try: R`اعمل hashtable للـ parameters بتاعة [[Compress-Archive]] (Path و DestinationPath و Force)، وابعته بـ splatting. وبعدين جرّب تكتب [[$copy]] بدل [[@copy]] وشوف الـ error.`,
          flag: "script",
          deep: {
            why: "سكربتات الأتمتة فيها أوامر بـ ٦ و ٧ parameters، بعضها بيتغيّر حسب الظروف (Recurse لو الفولدر كبير، Credential لو سيرفر). من غير splatting هتكتب نفس الأمر الطويل في كذا مكان، أو هتستخدم backtick في آخر كل سطر وأي مسافة زيادة تبوّظ الدنيا.",
            how: R`[[@name]] بيفرد الـ hashtable: كل مفتاح بيبقى [[-مفتاح قيمة]]. وتقدر تخلط: [[Copy-Item @copy -WhatIf]] (الـ splat وبعده parameter عادي).

مع array بيفرد بالترتيب: [[git @gitArgs]] زي ما تكون كتبت [[git log --oneline -n 3]]. وده مفيد جدًا مع البرامج الخارجية اللي arguments بتاعتها مش PowerShell (درس [[& (call operator)]]).

[[$PSBoundParameters]] جوه فانكشن أو سكربت فيه الـ parameters اللي اتبعتتله فعلًا، فتقدر تعدّيهم لأمر تاني: [[Get-ChildItem @PSBoundParameters]]. ولو عايز تشيل واحد قبلها: [[$PSBoundParameters.Remove("Name") | Out-Null]].

الـ backtick: لازم يبقى آخر حرف في السطر بالظبط. أي مسافة بعده بتحوّله لـ escape للمسافة، والسطر يخلص هنا. ومش محتاجه بعد [[|]] ولا بعد [[,]] ولا بعد [[{]] أو [[(]]: السطر بيكمّل لوحده. فالأحسن في pipeline طويل تخلّي [[|]] في آخر كل سطر.`,
            when: "أي أمر فيه أكتر من ٣ أو ٤ parameters، أو parameters بتتغيّر بشرط، أو بتعدّي نفس الـ parameters لأكتر من أمر.",
            mistakes: R`تكتب [[Copy-Item $copy]] بالدولار: PowerShell بيبعت الـ hashtable كله كقيمة لأول parameter (Path) فيطلع error غريب. أو تكتب اسم المفتاح بشرطة [["-Path" = ...]]. أو تكتب اسم parameter غلط في الـ hashtable فيطلع [[A parameter cannot be found that matches parameter name]]. أو backtick وبعده مسافة.`
          },
          lines: [
            "hashtable فيه parameters الـ Copy-Item: المفتاح اسم الـ parameter من غير شرطة...",
            "...المصدر...",
            "...الهدف...",
            "...الـ switch بيتكتب True...",
            "...وده كمان.",
            "قفلة.",
            "ابعتهم كلهم بـ [[@]]: زي ما تكون كتبت [[-Path .\\src -Destination .\\src_copy -Recurse -Force]].",
            "parameters أساسية في سطر واحد، و [[;]] بتفصل.",
            "شرط (هنا ثابت عشان المثال).",
            "زوّد parameter بشرط.",
            "ابعتهم وعدّ الناتج.",
            "array arguments لبرنامج خارجي.",
            "كل عنصر بيتبعت لـ git كـ argument لوحده.",
            "الشكل التاني: backtick في آخر السطر يعني «مكمّل تحت»...",
            "...ولازم يبقى آخر حرف بالظبط من غير مسافة بعده...",
            "...وآخر سطر من غيره."
          ],
          sol: R`المثال اتجرب في فولدر فيه [[src\a.txt]] وريبو git: [[Copy-Item @copy]] عمل [[src_copy]] بالملف، و [[(Get-ChildItem @params).Count]] طبع عدد الملفات في الفولدر واللي تحته، و [[git @gitArgs]] طبع آخر commits، وآخر أمر طبع ملفات txt.

الحل في الـ solCode: [[Compress-Archive @zip]] عمل [[src.zip]]. ولما كتبت [[Copy-Item $copy]] بدل [[@copy]] طلع error [[Cannot find path]] فيه [[System.Collections.Hashtable]]، لأن الـ hashtable كله اتبعت كأنه Path.`,
          solCode: R`$zip = @{
    Path            = ".\src\*"
    DestinationPath = ".\src.zip"
    Force           = $true
}
Compress-Archive @zip
Get-Item .\src.zip | Select-Object Name, Length`
        },
        {
          cmd: "pipeline function",
          title: "فانكشن بتستقبل من الـ pipe: begin و process و end",
          desc: R`الفانكشن العادية بتاخد قيمها كـ parameters. عشان تستقبل objects من [[|]] زي الأوامر الأصلية ([[Get-ChildItem | Get-FileReport]])، محتاج حاجتين. الأولى: تعلّم على parameter إنه بيستقبل من الـ pipe بـ [[[Parameter(ValueFromPipeline)]]]، فكل object جاي بيتحط فيه. والتانية: الكود يتقسم ٣ بلوكات: [[begin { }]] بيتنفذ مرة واحدة قبل أول object (تجهيز، زي تصفير عدّاد)، و [[process { }]] بيتنفذ مرة لكل object جاي، و [[end { }]] مرة واحدة بعد آخر واحد (ملخص).

النوع [[[System.IO.FileInfo]]] معناه «ملف» بالظبط، فلو حد بعت فولدر أو نص الفانكشن هترفضه برسالة واضحة. وجوه process، كل [[[PSCustomObject]]] بيطلع على طول للي بعدها في الـ pipe، من غير ما يستنى الباقي، وده بيوفّر رام مع آلاف الملفات.

لو نسيت [[process]] وكتبت الكود من غير بلوكات، هيتنفذ مرة واحدة على آخر object بس، ودي أشهر غلطة. ونفس الفانكشن تقدر تناديها عادي من غير pipe: [[Get-FileReport -File (Get-Item .\notes.txt)]]. المقابل في bash إنك تكتب [[while read line]] جوه سكربت.`,
          example: R`function Get-FileReport {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory, ValueFromPipeline)]
        [System.IO.FileInfo]$File
    )
    begin   { $total = 0 }
    process {
        $total += $File.Length
        [PSCustomObject]@{ Name = $File.Name; KB = [math]::Round($File.Length / 1KB, 1) }
    }
    end     { Write-Verbose "Total: $([math]::Round($total / 1MB, 2)) MB" }
}

Get-ChildItem -File | Get-FileReport -Verbose
Get-FileReport -File (Get-Item .\notes.txt)`,
          try: R`شيل كلمة [[process]] والأقواس بتاعتها (خلّي الكود اللي جواها لوحده) وشغّل [[Get-ChildItem -File | Get-FileReport]] تاني، وعدّ الصفوف.`,
          flag: "script",
          deep: {
            why: R`عملت فانكشن مفيدة، وعايز تستخدمها زي باقي أوامر PowerShell: [[Get-ChildItem | Where-Object ... | Get-FileReport | Export-Csv]]. من غير process، الفانكشن بتشوف آخر عنصر بس أو كل الـ objects لستة واحدة، فالـ pipeline يبوظ.`,
            how: R`[[ValueFromPipeline]]: الـ object نفسه بيتحط في الـ parameter. لازم النوع يناسب، أو تخليه من غير نوع.

[[ValueFromPipelineByPropertyName]]: بدل الـ object كله، PowerShell بياخد خاصية اسمها زي اسم الـ parameter. فلو الـ parameter اسمه [[$Name]]، أي object فيه خاصية Name هيوصل اسمه بس. ده اللي بيخلي [[Import-Csv servers.csv | Test-Server]] يشتغل لو الـ CSV فيه عمود اسمه زي الـ parameter.

الـ begin والـ end اختياريين، و process هو المهم. المتغيرات اللي بتتعمل في begin بتفضل موجودة في process و end (زي [[$total]]).

ليه [[Write-Verbose]] في end ظهرت قبل الجدول؟ لأن عرض الجدول بيستنى شوية objects عشان يحسب عرض الأعمدة، فرسايل زي Verbose و Write-Host بتسبقه على الشاشة. الترتيب الحقيقي للتنفيذ مظبوط.

[[$input]] متغير أوتوماتيك فيه كل اللي جاي من الـ pipe لو عايز تاخدهم مرة واحدة في end، بس process أوضح وأوفر.`,
            when: "أي فانكشن هتشتغل على لستة حاجات (ملفات، سيرفرات، يوزرز من CSV) وعايز تركّبها في pipeline مع Where-Object و Sort-Object و Export-Csv.",
            mistakes: R`تكتب الكود من غير process فتشتغل على آخر عنصر بس. أو تعمل [[$results += ...]] جوه process وترجّعهم في end، فتضيّع ميزة الـ streaming وتبطّأ. أو تحط النوع [[[string]]] لـ parameter بيستقبل ملفات، فـ PowerShell يحوّل كل ملف لنص اسمه بس. أو تحط [[Mandatory]] ومتتعاملش مع الحالة اللي حد ينادي الفانكشن من غير pipe.`
          },
          lines: [
            "فانكشن باسم Verb-Noun.",
            "advanced function: بتاخد [[-Verbose]].",
            "الـ parameters.",
            "إجباري، وبيستقبل كل object جاي من الـ pipe.",
            "نوعه ملف بالظبط (FileInfo).",
            "قفلة.",
            "begin: مرة واحدة قبل أي object. صفّر العدّاد.",
            "process: لكل ملف جاي...",
            "...زوّد حجمه على المجموع...",
            "...وطلّع صف فيه الاسم والحجم بالكيلو، وده بيروح للي بعدك على طول.",
            "قفلة process.",
            "end: مرة واحدة في الآخر. اطبع المجموع مع [[-Verbose]].",
            "قفلة الفانكشن.",
            "استخدمها في pipeline زي أي أمر.",
            "أو عادي بالـ parameter."
          ],
          sol: R`جربته في فولدر فيه ملف 3 ميجا وكام ملف صغير: طلع جدول Name و KB بصف لكل ملف، وفوقه [[VERBOSE: Total: 2.86 MB]] (ظهر قبل الجدول لأن الجدول بيستنى يحسب عرض الأعمدة)، وفي الآخر صف لوحده للنداء التاني.

لما شلت [[process]]: الجدول طلع صف واحد بس، لآخر ملف في اللستة. لأن الكود اللي بره البلوكات بيتعامل كأنه end، فبيتنفذ مرة واحدة بعد ما كل الملفات عدّت، و [[$File]] ساعتها شايل آخر واحد. رجّع process.`
        },
        {
          cmd: "Import-Module و dot-sourcing",
          title: "قسّم الكود على ملفات: .psm1 و النقطة",
          desc: R`لما يبقى عندك فانكشنز بتستخدمها في كذا سكربت (لوج، تاريخ، تحقق)، متنسخهاش في كل ملف. فيه طريقتين تشاركها:

الموديول: ملف امتداده [[.psm1]] فيه فانكشنز، و [[Export-ModuleMember -Function ...]] في آخره بيحدد مين يبان بره (الباقي داخلي زي [[Get-Secret]] هنا). السكربت بيحمّله بـ [[Import-Module المسار]]، و [[-Force]] بتعيد تحميله لو عدّلت الملف (من غيرها PowerShell بيستخدم النسخة اللي اتحمّلت قبل كده في الجلسة). و [[Get-Command -Module MyTools]] بيوريك الفانكشنز اللي ظاهرة.

الـ dot-sourcing: نقطة ومسافة قبل مسار ملف [[.ps1]]: [[. "$PSScriptRoot\tools\helpers.ps1"]]. معناها «شغّل الملف ده جوايا كأنه مكتوب هنا»، فكل متغير وفانكشن فيه بيفضل موجود بعد ما يخلص. من غير النقطة (أو بـ [[&]]) الملف بيشتغل في scope لوحده وكل اللي عمله بيختفي. ده نفس [[source]] أو [[.]] في bash، ونفس اللي بتعمله مع [[. $PROFILE]]. و [[$PSScriptRoot]] عشان المسار يتحسب من فولدر السكربت مش من مكان الترمنال (درس $PSScriptRoot).

القاعدة: موديول لما الكود هيتشارك بين مشاريع أو أشخاص، و dot-source لملف helpers جوه نفس المشروع.`,
          example: R`# tools\MyTools.psm1
function Get-Stamp { Get-Date -Format "yyyy-MM-dd_HH-mm" }
function Write-Log { param([string]$Message) "[$(Get-Stamp)] $Message" }
function Get-Secret { "internal" }
Export-ModuleMember -Function Get-Stamp, Write-Log

# tools\helpers.ps1
$AppName = "shop"
function Get-AppName { $AppName }

# backup.ps1
Import-Module "$PSScriptRoot\tools\MyTools.psm1" -Force
Write-Log "Backup started"
Get-Command -Module MyTools
. "$PSScriptRoot\tools\helpers.ps1"
Get-AppName`,
          try: R`اعمل الـ ٣ ملفات وشغّل backup.ps1. وبعدين من الترمنال جرّب [[Get-Secret]] بعد Import-Module، وجرّب [[& .\tools\helpers.ps1]] من غير نقطة وبعدها [[Get-AppName]].`,
          flag: "script",
          deep: {
            why: "أول ما يبقى عندك ٣ سكربتات كل واحد فيه نسخة من Write-Log، وتصلّح غلطة في واحدة وتنسى التانيين. الموديول بيخلي الكود المشترك في مكان واحد، وبيخبي الفانكشنز الداخلية عشان محدش يعتمد عليها.",
            how: R`[[Import-Module]] بمسار كامل بيحمّل الملف ده. ومن غير مسار ([[Import-Module MyTools]]) بيدوّر في الفولدرات اللي في [[$env:PSModulePath]]. فلو حطيت الموديول في فولدر بنفس اسمه جوه [[Documents\PowerShell\Modules\MyTools\MyTools.psm1]] (لـ PowerShell 7)، هيتحمّل لوحده أول ما تنادي أي فانكشن فيه (اسمها autoloading)، من أي سكربت.

من غير [[Export-ModuleMember]] كل الفانكشنز بتبان. ولو الموديول كبر، اعمله manifest ([[New-ModuleManifest]]) فيه النسخة والوصف والمتطلبات.

[[-Force]] مهمة وانت بتطوّر: PowerShell بيحمّل الموديول مرة واحدة في الجلسة، فتعديلاتك مش هتبان من غيرها. وللشيل: [[Remove-Module MyTools]].

الـ dot-source بيشغّل الملف في نفس الـ scope، فلو الملف فيه [[$ErrorActionPreference = "Stop"]] أو [[Set-Location]] هيأثر على السكربت اللي ناداه كمان. و [[&]] أو الاسم لوحده بيشغّله في scope جديد. ومن الترمنال: [[. .\helpers.ps1]] (نقطة، مسافة، نقطة، backslash) بيحمّل الفانكشنز في الجلسة.

الموديولات اللي نزلتها من النت (زي PSScriptAnalyzer) بتتسطب بـ [[Install-Module]] وبتروح في نفس الفولدرات دي.`,
            when: "فانكشن بتتكرر في أكتر من سكربت، أو سكربت واحد كبر وعايز تقسمه، أو أدوات شخصية عايزها متاحة في أي نافذة من غير ما تحطها كلها في $PROFILE.",
            mistakes: R`تعدّل الموديول ومتعملش [[-Force]] وتفضل تستغرب إن التعديل مش ظاهر. أو تكتب [[Import-Module .\tools\MyTools.psm1]] بمسار نسبي فيبوظ لما السكربت يتشغّل من مكان تاني. أو تنسى النقطة في الـ dot-source وتستغرب إن الفانكشنز مش موجودة. أو تسمّي فانكشن في الموديول باسم أمر أصلي فتغطي عليه.`
          },
          lines: [
            "فانكشن بترجع التاريخ والوقت كنص.",
            "فانكشن لوج بتستخدم اللي فوقها.",
            "فانكشن داخلية مش هتبان بره.",
            "اللي يبان بره الموديول: الاتنين دول بس.",
            "متغير في ملف الـ helpers.",
            "فانكشن بترجعه.",
            "حمّل الموديول من فولدر السكربت، و [[-Force]] يعيد تحميله لو اتعدّل.",
            "استخدم فانكشن منه.",
            "إيه اللي ظاهر من الموديول؟ Get-Stamp و Write-Log بس.",
            "dot-source: شغّل الملف ده جوه السكربت، فالمتغير والفانكشن يفضلوا.",
            "استخدم الفانكشن اللي جت منه."
          ],
          sol: R`جربتها على PowerShell 7: backup.ps1 طبع [[[2026-10-01_16-19] Backup started]]، وجدول فيه Function [[Get-Stamp]] و [[Write-Log]] بس، وفي الآخر [[shop]].

[[Get-Secret]] بعد Import-Module طلع [[The term 'Get-Secret' is not recognized]]، لأنه مش في Export-ModuleMember. و [[& .\tools\helpers.ps1]] من غير نقطة اشتغل من غير error، بس بعدها [[Get-AppName]] طلع نفس الـ error و [[$AppName]] كان فاضي: الملف اشتغل في scope لوحده واختفى. بالنقطة [[. .\tools\helpers.ps1]] الاتنين فضلوا.`
        },
        {
          cmd: "try / catch",
          title: "التعامل مع الأخطاء",
          desc: R`[[try { }]] بتحط فيه الكود اللي ممكن يفشل، و [[catch { }]] بيتنفذ لو حصل error جواه، و [[$_]] جوه الـ catch هو الـ error نفسه، و [[$_.Exception.Message]] رسالته. و [[finally { }]] بيتنفذ في كل الأحوال، نجح أو فشل، مكان التنضيف (قفل ملف، رجوع لفولدر). زي try/catch في JavaScript.

بس فيه فخين في PowerShell. الأول: أغلب أخطاء الأوامر «non-terminating»، يعني بتطبع أحمر وتكمّل، والـ catch مش بيشوفها. [[$ErrorActionPreference = "Stop"]] في أول السكربت بيخلي أي error يوقف ويروح للـ catch (زي [[set -e]] في bash)، والتفاصيل في درس «-ErrorAction و $Error».

التاني: البرامج الخارجية (npm و git و docker) مش بترمي errors في PowerShell خالص، بترجع رقم بس. فبعد كل واحد مهم افحص [[$LASTEXITCODE]]: [[-ne 0]] يعني فشل، و [[exit 1]] بيقفل السكربت برقم فشل (الدرس اللي بعد الجاي بيشرح ده بالتفصيل).`,
          example: R`$ErrorActionPreference = "Stop"

try {
    Copy-Item .\missing.txt .\backup\
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    "Done either way"
}

npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed"
    exit 1
}`,
          try: "شغّله في فولدر مفيهوش package.json وشوف [[$LASTEXITCODE]].",
          flag: "script",
          deep: {
            why: R`سكربت بيكمّل بعد ما خطوة فشلت ممكن يعمل ضرر: يمسح الأصل بعد نسخة فاشلة، أو يعمل deploy لـ build بايظ. try / catch بيخليك تقرر تعمل إيه لما حاجة تفشل: توقف، أو تسجّل وتكمّل، أو تنضّف قبل ما تخرج.`,
            how: R`[[try { } catch { } finally { }]]. في الـ catch بلوك [[$_]] هو الـ error object، و[[$_.Exception.Message]] رسالة الخطأ.

PowerShell فيه نوعين errors: Terminating (بيوقف) وNon-Terminating (بيطبع error ويكمّل). [[try/catch]] بيمسك الـ Terminating بس. للـ Non-Terminating: ضيف [[-ErrorAction Stop]] للأمر أو استخدم [[$ErrorActionPreference = "Stop"]].

[[Write-Error]] بيطلع error من سكربتك. [[throw]] بيطلع exception يوقف التنفيذ.

و[[-ErrorAction SilentlyContinue]] بيخلي الأمر يفشل بصمت (مفيد لما مش مهم).`,
            when: "أي أمر ممكن يفشل. فتح ملف. طلب API. تشغيل عملية.",
            mistakes: "try/catch مش بيمسك Non-Terminating errors من غير -ErrorAction Stop. ده سبب عدم توقع السكربت لما يطلع error."
          },
          lines: [
            "خلّي أي error يوقف التنفيذ (وإلا try/catch مش هيمسك الأخطاء العادية).",
            "جرّب.",
            "أمر هيفشل (الملف مش موجود).",
            "لو فشل.",
            "اطبع رسالة الـ error بالأحمر. [[$_]] هنا هو الـ error.",
            "في كل الأحوال.",
            "اطبع.",
            "قفلة.",
            "أمر خارجي (مش PowerShell) بيرجع exit code.",
            "لو الرقم مش صفر يبقى فشل ([[$LASTEXITCODE]] زي [[$?]] في bash).",
            "اطبع.",
            "اقفل السكربت برقم فشل.",
            "قفلة."
          ],
          sol: R`في فولدر فاضي السكربت هيطبع: [[Error: Cannot find path '...\missing.txt' because it does not exist.]] بالأحمر، وبعدها [[Done either way]]، وبعدين npm يطلع [[npm error code ENOENT]] و [[Could not read package.json]]، وفي الآخر [[Build failed]]. و [[$LASTEXITCODE]] رقم غير صفر (على لينكس طلع [[254]]).

لاحظ إن الـ catch مسك غلطة Copy-Item بس، أما npm فمحدش مسكه غير سطر [[$LASTEXITCODE]]. ولو شفت [[npm.ps1 cannot be loaded because running scripts is disabled]]، ده مش من السكربت، ده الـ ExecutionPolicy مانع npm.ps1 نفسه، ظبطها أو شغّل [[npm.cmd run build]].`
        },
        {
          cmd: "-ErrorAction و $Error",
          title: "تحكّم في الأخطاء: تتجاهل إيه وتوقف عند إيه",
          desc: R`أغلب أخطاء الـ cmdlets «non-terminating»: الأمر بيطبع error أحمر ويكمّل، و try / catch مش بتشوفها. [[-ErrorAction]] (اختصاره [[-EA]]) بيقول للأمر ده بالذات يعمل إيه لو حصل error: [[Stop]] يحوّله لـ error بيوقف ويروح للـ catch، و [[SilentlyContinue]] يكمّل من غير ما يطبع، و [[Ignore]] زيه بس كمان مش بيسجّله، و [[Continue]] الافتراضي (يطبع ويكمّل). و [[$ErrorActionPreference]] نفس الحكاية بس لكل الأوامر في السكربت (درس try / catch).

[[-ErrorVariable problems]] بيحط أخطاء الأمر ده في متغير اسمه [[$problems]] (من غير [[$]] في الاسم وانت بتكتبه)، فتقدر تكمّل وتعدّ الأخطاء أو تكتبها في لوج. و [[$Error]] متغير أوتوماتيك فيه كل أخطاء الجلسة، الأحدث الأول: [[$Error[0]]] آخر error، و [[.Exception.Message]] رسالته.

و [[catch [نوع]]] بيمسك نوع معين من الأخطاء، وبعده [[catch]] عام لأي حاجة تانية. و [[throw "رسالة"]] بيطلّع error من عندك يوقف التنفيذ، و [[$_]] جوه الـ catch هو الـ error، و [[$_.InvocationInfo.ScriptLineNumber]] السطر اللي حصل فيه. وفي الآخر [[exit 2]] بيقفل السكربت برقم، فاللي شغّله (CMD أو Task Scheduler أو CI) يعرف إنه فشل، والرقم بيتقري بعدها من [[$LASTEXITCODE]].`,
          example: R`Get-Item .\nope.txt -ErrorAction SilentlyContinue
Get-ChildItem .\nope, .\src -ErrorAction SilentlyContinue -ErrorVariable problems
"problems: $($problems.Count)"
try {
    Get-Item .\nope.txt -ErrorAction Stop
} catch [System.Management.Automation.ItemNotFoundException] {
    "Not found: $($_.TargetObject)"
} catch {
    "Other error: $($_.Exception.Message)"
}
$Error.Count
$Error[0].Exception.Message
function Get-Config([string]$Path) {
    if (-not (Test-Path $Path)) { throw "Config file '$Path' is missing" }
    Get-Content $Path -Raw | ConvertFrom-Json
}
try { Get-Config .\config.json } catch { "Failed: $_" }
exit 2`,
          try: R`احفظه err.ps1 في فولدر فيه src، وشغّله، وبعدين اطبع [[$LASTEXITCODE]]. وبعدين غيّر أول سطر لـ [[-ErrorAction Ignore]] وقارن [[$Error.Count]].`,
          flag: "script",
          deep: {
            why: "سكربت بيلف على ١٠٠ ملف، وملف واحد مقفول. عايز تكمّل الباقي وتسجّل اللي فشل؟ ولا تقف؟ وأي error يستاهل تقف عنده؟ من غير ما تتحكم، PowerShell بيطبع أحمر ويكمّل في حاجات، ويقف في حاجات، والسكربت يخلص بـ exit 0 كأن كله تمام.",
            how: R`ليه أخطاء كتير مش بتوقف؟ لأن cmdlets زي Get-ChildItem بتشتغل على لستة: لو مسار واحد من عشرة مش موجود، منطقي تكمّل التسعة. ده الـ non-terminating error. أما حاجات زي ParserError أو [[throw]] أو قيمة parameter مرفوضة فبتوقف (terminating).

الأولوية: [[-ErrorAction]] على الأمر بتغلب [[$ErrorActionPreference]] في السكربت. فالنمط الشائع: [[$ErrorActionPreference = "Stop"]] في أول السكربت، و [[-ErrorAction SilentlyContinue]] على الأوامر اللي فشلها عادي (زي Get-Process لبرنامج ممكن يكون مقفول).

[[SilentlyContinue]] بيخبي الرسالة بس، والـ error لسه بيتسجّل في [[$Error]]. [[Ignore]] بيرميه خالص. والاتنين مش بيأثروا على البرامج الخارجية (git و npm)، دي بتتفحص بـ [[$LASTEXITCODE]] (الدرس اللي بعده).

[[$Error]] بيشيل آخر 256 error في الجلسة، و [[$Error.Clear()]] يفضّيه. ومفيد في الترمنال: لما يطلعلك error طويل، [[$Error[0] | Format-List * -Force]] بيوريك كل التفاصيل.

نوع الـ exception تعرفه بـ [[$Error[0].Exception.GetType().FullName]]، وده اللي بتكتبه في [[catch [ ]]]. أشهرهم: [[System.Management.Automation.ItemNotFoundException]] للمسار، و [[System.UnauthorizedAccessException]] للصلاحيات، و [[System.Net.WebException]] أو [[Microsoft.PowerShell.Commands.HttpResponseException]] (في 7) للـ HTTP.

[[throw]] جوه فانكشن بيوقفها ويطلع لأقرب catch. و [[Write-Error]] بيطلع non-terminating error (بيكمّل) إلا لو [[-ErrorAction Stop]]. و [[exit رقم]] في سكربت بيقفل السكربت كله، أما جوه فانكشن في الترمنال بيقفل النافذة، فاستخدم [[return]] أو [[throw]] جوه الفانكشنز.`,
            when: "أي سكربت بيشتغل لوحده من غير حد يراقبه (Task Scheduler أو CI)، لازم يقف عند الأخطاء المهمة ويخرج برقم غير صفر، ويسجّل الأخطاء اللي كمّل بعدها.",
            mistakes: R`تحط [[-ErrorAction SilentlyContinue]] على كل حاجة عشان «الأحمر يختفي»، فالسكربت يفشل بصمت. أو [[catch]] فاضي [[catch { }]] يبلع كل حاجة. أو تكتب [[exit]] جوه فانكشن في الـ profile فتقفل الترمنال. أو تفتكر إن [[-ErrorAction Stop]] هيوقف لما [[npm]] يفشل. أو تقرا [[$Error[0]]] بعد ما أمر تاني اتنفذ وتفتكره بتاع الأمر بتاعك.`
          },
          lines: [
            "الملف مش موجود، بس متطبعش error وكمّل.",
            "مسارين، واحد غلط: كمّل بصمت، وحط الأخطاء في متغير اسمه problems.",
            "كام error حصل؟ 1.",
            "جرّب...",
            "...نفس الأمر بس [[Stop]] يحوّل الـ error لحاجة الـ catch تمسكها.",
            "لو النوع «المسار مش موجود»...",
            "...اطبع المسار اللي ملقاهوش.",
            "أي error تاني...",
            "...اطبع رسالته.",
            "قفلة.",
            "كل أخطاء الجلسة، حتى اللي اتخبت بـ SilentlyContinue.",
            "رسالة آخر error.",
            "فانكشن بتقرا config...",
            "...ولو مش موجود ارمي error برسالة واضحة توقف الفانكشن.",
            "اقراه كـ JSON.",
            "قفلة.",
            "نادِها، ولو رمت اطبع الرسالة ([[$_]] هو الـ error).",
            "اقفل السكربت برقم 2، فاللي شغّله يعرف إنه فشل."
          ],
          sol: R`جربته على PowerShell 7: أول سطر مطبعش حاجة، والتاني طبع محتوى src (جدول فيه [[a.txt]]) وكمّل من غير ما يشتكي من nope، و [[problems: 1]]، و [[Not found: ...\nope.txt]] من الـ catch المتخصص، و [[3]] لـ [[$Error.Count]] (الاتنين اللي اتخبوا والتالت بتاع Stop)، و [[Cannot find path '...\nope.txt' because it does not exist.]]، و [[Failed: Config file '.\config.json' is missing]]. و [[$LASTEXITCODE]] بعد السكربت [[2]].

مع [[-ErrorAction Ignore]] في أول سطر، [[$Error.Count]] بقى [[2]] بدل 3: Ignore مش بيسجّل. (شغّله بـ [[pwsh -File .\err.ps1]] أو في نافذة جديدة، لأن [[$Error]] بيتراكم في نفس الجلسة: لما شغلتهم ورا بعض في نفس النافذة التاني طلع 6.) ولو شغلت السكربت بالـ copy والـ paste في الترمنال بدل ما تحفظه، [[exit 2]] هيقفل النافذة نفسها، عشان كده لازم يبقى ملف.`
        },
        {
          cmd: "$LASTEXITCODE",
          title: "اعرف إن docker أو npm فشل جوه PowerShell",
          desc: R`[[$ErrorActionPreference = "Stop"]] و try/catch مبيمسكوش فشل البرامج الخارجية (docker، npm، git) في Windows PowerShell 5.1، لأنها مش بترمي exception، بترجع exit code بس. فبعد كل أمر خارجي مهم افحص [[$LASTEXITCODE]]. وفي PowerShell 7.4+ [[$PSNativeCommandUseErrorActionPreference = $true]] بيخلي الفشل ده يوقف السكربت لوحده.`,
          example: R`$ErrorActionPreference = "Stop"
function Assert-Ok($what) { if ($LASTEXITCODE -ne 0) { throw "$what failed (exit $LASTEXITCODE)" } }

docker info > $null;             Assert-Ok "Docker Desktop"
docker compose build --no-cache; Assert-Ok "compose build"
npm run build;                   Assert-Ok "npm build"
# PowerShell 7.4+ بس:
$PSNativeCommandUseErrorActionPreference = $true`,
          try: R`في فولدر مفيهوش package.json شغّل [[try { npm run build } catch { "caught" }]]، ولاحظ إن caught متطبعتش، وبعدين اطبع [[$LASTEXITCODE]].`,
          flag: "script",
          deep: {
            why: R`كتبت سكربت ديبلوي بـ PowerShell، وحطيت [[$ErrorActionPreference = "Stop"]] وكل حاجة جوه try/catch، وفاكر إنه هيقف لو حاجة فشلت. الـ build بتاع docker يفشل، والسكربت يكمّل عادي ويعمل up بالصورة القديمة ويطبع «Done».`,
            how: R`PowerShell فيه نوعين أوامر: cmdlets (زي [[Copy-Item]]) بترمي errors كـ objects، ودي اللي [[$ErrorActionPreference]] و try/catch بيتعاملوا معاها. والبرامج الخارجية (أي exe: docker، git، npm، node) مبيعرفوش حاجة عن PowerShell، كل اللي بيرجعوه رقم exit code زي في bash.

PowerShell بيحفظ الرقم ده في [[$LASTEXITCODE]] بعد كل برنامج خارجي: 0 نجح، وأي حاجة تانية فشل. و [[$?]] في PowerShell مش زي bash: ده true أو false، وفي 5.1 ممكن يبقى false لمجرد إن البرنامج كتب على stderr.

فالحل الآمن: بعد كل أمر خارجي مهم افحص الرقم. والفانكشن [[Assert-Ok]] بتختصر ده لسطر: لو الرقم مش صفر ترمي exception، ومع Stop السكربت يقف (أو يروح للـ catch لو فيه).

و [[> $null]] بيرمي الـ output العادي، فتفحص «Docker شغال؟» من غير ما يطبعلك صفحة معلومات. متكتبهاش [[*> $null]] أو [[2>$null]]: في 5.1 مع Stop، توجيه الـ stderr بتاع برنامج خارجي بيحوّل أي سطر فيه لـ NativeCommandError يوقف السكربت قبل ما توصل للفحص، حتى لو البرنامج نجح وكتب تحذير بس (نفس حكاية درس [[cmd /c ... > log 2>&1]]).

وفي PowerShell 7.4 وأحدث، المتغير [[$PSNativeCommandUseErrorActionPreference]] بيخلي أي برنامج خارجي يرجع غير صفر يتعامل كـ error، فـ Stop يوقف عليه لوحده. بس ده مش موجود في Windows PowerShell 5.1 اللي جاي مع ويندوز.`,
            when: "أي سكربت بيشغّل docker أو npm أو git أو dotnet وبيعتمد إن الخطوة اللي قبلها نجحت.",
            mistakes: R`في مشروع حقيقي كان سكربت deploy.ps1 معتمد على try/catch يمسك فشل docker، ومفيش ولا فحص لـ [[$LASTEXITCODE]]، فالـ build يفشل والسكربت يكمّل. وفي مشروع تاني [[$ErrorActionPreference = "Stop"]] كان موجود، والسكربت برضه مكانش بيقف لو npm فشل. وخلي بالك: [[$LASTEXITCODE]] بيتغيّر مع كل برنامج خارجي، فافحصه على طول بعد الأمر، مش بعد ما تشغّل حاجة تانية.`
          },
          lines: [
            "أي error من cmdlet يوقف السكربت.",
            "فانكشن: لو آخر برنامج خارجي رجع غير صفر، ارمي exception باسم الخطوة.",
            "Docker شغال؟ [[> $null]] يرمي الناتج العادي (مش الـ stderr، عشان Stop ميوقفش عليه)، وبعدين افحص.",
            "ابني الصور وافحص.",
            "ابني الفرونت وافحص.",
            "في PowerShell 7.4+ بس: خلّي فشل أي برنامج خارجي يوقف السكربت لوحده."
          ],
          sol: R`[[try { npm run build } catch { "caught" }]] هيطلع كلام npm الأحمر، لكن [[caught]] مش هتظهر. و [[$LASTEXITCODE]] بعدها رقم غير 0 (جربتها في PowerShell 7.5 على لينكس فطلع [[1]] مع missing script و [[254]] من غير package.json). يعني PowerShell شاف npm خلص، ومش شايف إن ده فشل.

لو شغلت في PowerShell 7.4+ [[$PSNativeCommandUseErrorActionPreference = $true]] مع [[$ErrorActionPreference = "Stop"]] قبلها، نفس السطر بيدخل الـ catch. جربتها وطلع [[Program "npm" ended with non-zero exit code: 1.]]. في 5.1 المتغير ده ملوش أي تأثير، فافحص [[$LASTEXITCODE]] بإيدك.`,
          solCode: R`$ErrorActionPreference = "Stop"
try { npm run build } catch { "caught" }
"exit code: $LASTEXITCODE"

# PowerShell 7.4+
$PSNativeCommandUseErrorActionPreference = $true
try { npm run build } catch { "caught: $($_.Exception.Message)" }`
        },
        {
          cmd: "$PSScriptRoot",
          title: "شغّل السكربت من فولدره مهما اتفتح منين",
          desc: R`[[$PSScriptRoot]] مسار الفولدر اللي فيه السكربت نفسه. [[Set-Location $PSScriptRoot]] في أول السكربت بيخلي المسارات النسبية تشتغل مهما كان الترمنال واقف فين، و [[Join-Path $PSScriptRoot ...]] أحسن من مسار ثابت من جهازك. زي [[%~dp0]] في bat و [[dirname "$0"]] في bash.`,
          example: R`Set-Location $PSScriptRoot
$dist = Join-Path $PSScriptRoot "frontend\dist"
Write-Host "Script file: $PSCommandPath"
Write-Host "Working in:  $(Get-Location)"
if (-not (Test-Path $dist)) { npm run build }`,
          try: R`اعمل where.ps1 فيه [[Write-Host $PSScriptRoot (Get-Location)]]، وشغّله مرة من فولدره ومرة من [[C:\]] بالمسار الكامل، وقارن.`,
          flag: "script",
          deep: {
            why: "السكربت شغال تمام لما تشغّله من فولدر المشروع. تدوس عليه كليك يمين «Run with PowerShell»، أو زميلك يشغّله من فولدر تاني، يطلع [[Cannot find path]] لأن المسار النسبي بقى بيدوّر في مكان تاني.",
            how: R`المسار النسبي زي [[.\dist]] بيتحسب من «الفولدر الحالي» بتاع الجلسة، مش من مكان السكربت. والفولدر الحالي ده ممكن يبقى أي حاجة: فولدرك الشخصي لو شغّلته بكليك يمين، أو المكان اللي الترمنال كان فيه.

[[$PSScriptRoot]] متغير أوتوماتيك بيتملى جوه أي ملف ps1 بمسار الفولدر اللي الملف فيه. و [[$PSCommandPath]] المسار الكامل للملف نفسه.

فعندك طريقتين: [[Set-Location $PSScriptRoot]] في أول سطر، فكل المسارات النسبية بعد كده تتحسب من فولدر السكربت. أو تبني كل مسار بـ [[Join-Path $PSScriptRoot "..."]] من غير ما تغيّر الفولدر الحالي، ودي أنضف لو السكربت هيتنادى من سكربت تاني.

والمتغير ده فاضي لو كتبت الكود في الترمنال مباشرة، هو بيشتغل جوه ملف ps1 بس.`,
            when: "أول سطر في أي سكربت بيستخدم مسارات نسبية، خصوصًا اللي بيتشغّل بالدبل كليك أو من Task Scheduler أو من CI.",
            mistakes: R`في مشروع حقيقي كان سكربت الفحص فيه مسار مطلق ثابت لفولدر على جهاز صاحبه (ولمشروع تاني كمان، لأنه اتنسخ بين مشروعين)، فبيبوظ على أي جهاز غيره. وكان فيه سطر مكتوب فيه المسار لوحده من غير [[Set-Location]]، فـ PowerShell حاول ينفّذه كأمر ووقع. وخلي بالك إن [[Set-Location]] جوه السكربت بيغيّر فولدر الجلسة نفسها، والترمنال بيفضل واقف في فولدر السكربت بعد ما يخلص (عكس [[cd]] جوه سكربت bash)، فاستخدم [[Push-Location]] في الأول و [[Pop-Location]] في الآخر لو فارق معاك.`
          },
          lines: [
            "ادخل فولدر السكربت نفسه، فالمسارات النسبية بعد كده تتحسب منه.",
            "أو ابني مسار كامل من فولدر السكربت من غير ما تعتمد على الفولدر الحالي.",
            "المسار الكامل لملف السكربت نفسه.",
            "الفولدر الحالي، وهيبقى فولدر السكربت.",
            "المسار النسبي بقى آمن: لو مفيش dist ابنيها."
          ],
          sol: R`جربتها: من جوه فولدر السكربت طبع المسارين زي بعض ([[.../s .../s]]). ومن [[/]] (على ويندوز [[C:\]]) بالمسار الكامل طبع [[.../s /]]: [[$PSScriptRoot]] فضل فولدر السكربت، و [[Get-Location]] بقى المكان اللي انت واقف فيه.

ده بالظبط سبب إن مسار زي [[.\frontend\dist]] يبوظ لما تشغل السكربت من مكان تاني. ولو [[$PSScriptRoot]] طلع فاضي، يبقى انت كتبته في الترمنال مباشرة مش في ملف .ps1، هو بيتملي بس جوه سكربت.`,
          solCode: R`# where.ps1
Write-Host $PSScriptRoot (Get-Location)`
        },
        {
          cmd: "cmd /c ... > log 2>&1",
          title: "احفظ لوج برنامج خارجي في ملف مقروء",
          desc: R`في Windows PowerShell 5.1، [[npm run dev *> log.txt]] بيطلع ملف UTF-16 (أدوات كتير تشوفه مسافات بين الحروف)، وكل سطر stderr بيتحوّل لـ NativeCommandError أحمر. الأنضف تسيب cmd يعمل التوجيه: [[cmd /c "npm run dev > log.txt 2>&1"]]. وفي PowerShell 7 [[2>&1 | Tee-Object]] شغال صح وبيكتب UTF-8.`,
          example: R`# Windows PowerShell 5.1: ملف UTF-16 وسطور حمرا
npm run dev *> dev-log.txt
cmd /c "npm run dev > dev-log.txt 2>&1"
npm run build 2>&1 | ForEach-Object { "$_" } | Out-File build-log.txt -Encoding utf8
# PowerShell 7:
npm run dev 2>&1 | Tee-Object -FilePath dev-log.txt
Get-Content dev-log.txt -Wait -Tail 20`,
          try: R`في PowerShell 5.1 شغّل [[npm run build *> a.txt]] و [[cmd /c "npm run build > b.txt 2>&1"]]، وافتح الملفين في Notepad وقارن، وبص على الترميز تحت على اليمين.`,
          deep: {
            why: "السيرفر المحلي بيطلع error وعايز تبعت اللوج لحد أو تدوّر فيه. تعمل [[> log.txt]] زي bash، تفتح الملف في أداة تانية تلاقيه مسافات بين كل حرف، أو مليان سطور [[NativeCommandError]] حمرا مش من البرنامج أصلًا.",
            how: R`في Windows PowerShell 5.1، [[>]] و [[*>]] هم في الحقيقة [[Out-File]]، وده بيكتب UTF-16 افتراضيًا. VS Code بيفهمه، بس grep وأدوات كتير بتشوف بايت صفر بعد كل حرف.

والمشكلة التانية: البرامج الخارجية بتكتب التحذيرات والـ progress على stderr (npm و git بيعملوا كده حتى لو مفيش أي خطأ). ولما تعمل [[2>&1]] في 5.1، PowerShell بيغلّف كل سطر stderr في ErrorRecord، فيطلع في الملف بـ [[NativeCommandError]] وأرقام سطور. والأسوأ: لو [[$ErrorActionPreference = "Stop"]]، أول سطر stderr يوقف السكربت كأنه error.

[[cmd /c "..."]] بيسلّم السطر كله لـ cmd، و cmd بيوجّه البايتات للملف زي ما هي، من غير ما PowerShell يلمسها.

ولو عايز تفضل في PowerShell، [[ForEach-Object { "$_" }]] بيحوّل كل سطر (عادي أو ErrorRecord) لنص عادي، و [[Out-File -Encoding utf8]] يكتبه UTF-8 (في 5.1 بـ BOM).

وفي PowerShell 7 الحكاية اتصلحت: الافتراضي UTF-8 من غير BOM، و stderr بيتكتب نص عادي. فـ [[Tee-Object]] بيطبع قدامك ويكتب في الملف في نفس الوقت. و [[Get-Content -Wait]] من نافذة تانية بيتابع الملف وهو بيتكتب زي [[tail -f]].`,
            when: "لوج dev server أو build عايز تبعته أو تحلله، أو سكربت CI على ويندوز بيحفظ الناتج.",
            mistakes: R`في مشروع حقيقي كان فيه [[dev-log.txt]] متحفظ بالطريقة الأولى، وطالع UTF-16 ومليان رسايل حمرا من PowerShell نفسه مش من السيرفر. وغلطة تانية: [[2>&1]] مع [[$ErrorActionPreference = "Stop"]] في 5.1 بيوقف السكربت عند أول تحذير من npm. و [[Set-Content]] من غير [[-Encoding]] في 5.1 بيكتب ANSI، فالعربي يضيع.`
          },
          lines: [
            "الطريقة اللي بتبوظ في 5.1: كل الـ streams لملف، بس الملف بيطلع UTF-16 والـ stderr متغلّف كأخطاء.",
            "الأنضف: سيب cmd يعمل التوجيه، فالبايتات تتكتب زي ما البرنامج طلّعها.",
            "لو عايز تفضل في PowerShell: حوّل كل سطر لنص عادي واكتبه UTF-8.",
            "في PowerShell 7: اطبع على الشاشة واكتب في الملف في نفس الوقت، و UTF-8 من غير BOM.",
            "من نافذة تانية: تابع آخر ٢٠ سطر والملف بيتكتب (زي [[tail -f]])."
          ],
          sol: R`الملف [[a.txt]] Notepad هيكتب تحت [[UTF-16 LE]]، وجواه سطور زي [[npm : npm error ...]] و [[+ CategoryInfo : NotSpecified]] و [[NativeCommandError]]، لأن 5.1 حوّل كل سطر stderr لـ error record وكتبه بترميز UTF-16. أما [[b.txt]] فمكتوب [[UTF-8]]، وجواه كلام npm زي ما هو من غير أي زيادات.

لو فتحت a.txt في أداة زي VS Code أو [[grep]] في Git Bash وشفت مسافات بين كل حرف، ده UTF-16. ودي حاجة ويندوز 5.1 بس، مقدرتش أجربها هنا على لينكس، الكلام ده من توثيق Microsoft عن الـ redirection والـ encoding في 5.1. في PowerShell 7 الاتنين هيطلعوا UTF-8.`
        },
        {
          cmd: "Start-Transcript",
          title: "سجّل كل اللي السكربت عمله في لوج",
          desc: R`السكربت اللي بيشتغل لوحده بالليل (Task Scheduler) محدش بيشوف ناتجه. [[Start-Transcript]] بيسجّل كل حاجة بتظهر في الجلسة من اللحظة دي: الأوامر وناتجها و Write-Host والتحذيرات والأخطاء، في ملف نصي، لحد [[Stop-Transcript]]. [[-Path]] مكان الملف، و [[-Append]] يضيف على الملف لو موجود بدل ما يكتب فوقه. والاتنين بيطبعوا سطر «Transcript started...»، فـ [[| Out-Null]] بتخفيه.

في المثال: [[Join-Path $PSScriptRoot "logs"]] فولدر logs جنب السكربت، و [[New-Item -Force]] يعمله لو مش موجود، واسم الملف فيه تاريخ اليوم بـ [[$(Get-Date -Format yyyy-MM-dd)]] فكل يوم ليه ملف. و [[try { } catch { } finally { }]]: الـ catch بيطبع أي error وهو لسه بيتسجّل وبيحط [[$code = 1]]، والـ finally بيتنفذ في كل الأحوال فالـ transcript بيتقفل دايمًا. و [[exit $code]] في الآخر بيقول لـ Task Scheduler نجح ولا فشل.

آخر سطر تنضيف: امسح أي لوج آخر تعديل عليه أقدم من ٣٠ يوم ([[(Get-Date).AddDays(-30)]] يعني من ٣٠ يوم)، عشان الفولدر ميكبرش للأبد. المقابل في bash إنك تشغّل السكربت كله بـ [[| tee -a run.log]] أو [[script]].`,
          example: R`$ErrorActionPreference = "Stop"
$logDir = Join-Path $PSScriptRoot "logs"
New-Item -ItemType Directory $logDir -Force | Out-Null
$log = Join-Path $logDir "run_$(Get-Date -Format yyyy-MM-dd).log"
Start-Transcript -Path $log -Append | Out-Null
$code = 0
try {
    Write-Host "Starting job"
    Get-ChildItem $PSScriptRoot -File | Measure-Object | Select-Object -ExpandProperty Count
    git --version
    Write-Warning "Disk almost full"
}
catch {
    Write-Host "FAILED: $_" -ForegroundColor Red
    $code = 1
}
finally {
    Stop-Transcript | Out-Null
}
Get-ChildItem $logDir -Filter *.log | Where-Object LastWriteTime -lt (Get-Date).AddDays(-30) | Remove-Item
exit $code`,
          try: R`احفظه job.ps1 وشغّله مرتين، وافتح ملف اللوج في logs. وبعدين حط [[throw "boom"]] جوه الـ try وشغّل تاني، ووشوف الرسالة اتسجّلت ولا لأ، وشوف [[$LASTEXITCODE]].`,
          flag: "script",
          deep: {
            why: "الصبح تلاقي الباك أب ماتعملش، ومفيش أي أثر ليه. أو زميل بيقولك «السكربت طلع error» ومش فاكر قال إيه. الـ transcript بيخلي كل تشغيلة ليها سجل تقراه بعدين، من غير ما تغيّر ولا سطر في باقي السكربت.",
            how: R`الملف بيبدأ بهيدر فيه وقت البداية واليوزر واسم الجهاز ونسخة PowerShell والأمر اللي شغّل السكربت، وبيخلص بـ «PowerShell transcript end» ووقت النهاية. وده مفيد لما تشغيلات كتير تبقى في نفس الملف بـ [[-Append]].

بيسجّل اللي بيظهر على الشاشة: output و Write-Host و Write-Warning و Write-Error و Write-Verbose (لو ظاهر). وفي PowerShell 7 ناتج البرامج الخارجية زي git اتسجّل عادي في تجربتي. في Windows PowerShell 5.1 ناتج البرامج الخارجية ساعات ميتسجلش لأنه بيتكتب على الكونسول مباشرة؛ لو حصل كده ضيف بعد الأمر [[| Out-Host]].

[[-Path]] لو مكتبتهوش بيعمل ملف باسم عشوائي في Documents. و [[-UseMinimalHeader]] (في 7) هيدر أقصر. و [[-IncludeInvocationHeader]] بيكتب كل أمر قبل ناتجه.

لو عايز لوج بشكلك انت (سطر بالتاريخ لكل حدث) بدل نسخة من الشاشة، اعمل فانكشن صغيرة: [[function Write-Log($m) { Add-Content $log "$(Get-Date -Format s) $m" }]]. وممكن الاتنين مع بعض.

وخلي بالك إن [[Start-Transcript]] جوه سكربت بتسجّل لحد [[Stop-Transcript]] أو لحد ما الجلسة تخلص، فلو السكربت وقع من غير finally والجلسة لسه مفتوحة (في الترمنال)، التسجيل هيفضل شغال.`,
            when: "أي سكربت بيشتغل من Task Scheduler أو بيتشغّل بدبل كليك أو من غير حد قدامه. وكمان وانت بتحل مشكلة في سكربت حد تاني وعايز تبعتله اللي حصل بالظبط.",
            mistakes: R`تنسى [[Stop-Transcript]] أو تحطه بره finally، فالملف يفضل متقفل على العملية. أو تعتمد على try و finally من غير catch، فالـ error اللي وقّف السكربت يتطبع بعد ما التسجيل اتقفل ومتلاقيهوش في اللوج. أو تكتب [[-Path]] نسبي فاللوج يتكتب في System32 لما Task Scheduler يشغّله (عشان كده [[$PSScriptRoot]]). أو تسيب اللوجات تتراكم سنين. أو تكتب باسورد أو توكن في الشاشة فيتسجّل في الملف كمان.`
          },
          lines: [
            "أي error من cmdlet يوقف ويروح للـ catch.",
            "فولدر اللوجات جنب السكربت.",
            "اعمله لو مش موجود، ومتطبعش حاجة.",
            "اسم ملف اللوج فيه تاريخ النهارده.",
            "ابدأ التسجيل، ضيف على الملف لو موجود، واخفي رسالة البداية.",
            "رقم الخروج، صفر يعني نجح.",
            "جرّب...",
            "رسالة للشاشة، وهتتسجّل.",
            "output عادي: عدد الملفات.",
            "برنامج خارجي.",
            "تحذير بالأصفر، وهيتسجّل.",
            "قفلة.",
            "لو حصل error...",
            "...اطبعه، فيتسجّل في اللوج وهو لسه شغال...",
            "...وعلّم إن السكربت فشل.",
            "قفلة.",
            "في كل الأحوال...",
            "...اقفل التسجيل.",
            "قفلة.",
            "امسح اللوجات اللي أقدم من ٣٠ يوم.",
            "اخرج بالرقم، فـ Task Scheduler يعرف نجح ولا فشل."
          ],
          sol: R`جربته على PowerShell 7 على لينكس: الشاشة طبعت [[Starting job]] وعدد الملفات و [[git version 2.43.0]] و [[WARNING: Disk almost full]]. وملف [[logs\run_2026-10-01.log]] فيه هيدر بين سطور نجوم ([[PowerShell transcript start]] و [[Start time]] و [[Username]] و [[PSVersion: 7.6.5]] ...)، وبعدين نفس الأربع سطور، وفي الآخر [[PowerShell transcript end]]. التشغيلة التانية اتضافت تحت الأولى بهيدر جديد.

مع [[throw "boom"]] مكان التحذير: الشاشة طبعت [[FAILED: boom]] بالأحمر، والسطر ده موجود في اللوج قبل [[PowerShell transcript end]]، و [[$LASTEXITCODE]] بقى [[1]]. وجربت كمان من غير الـ catch (try و finally بس): الـ error اتطبع على الشاشة، بس [[boom]] مكانتش في اللوج خالص، لأن PowerShell بيطبع الـ error بعد ما الـ finally يخلص، يعني بعد ما التسجيل اتقفل. عشان كده الـ catch اللي بيطبع الرسالة مهم.`
        },
        {
          cmd: "PSScriptAnalyzer",
          title: "اكتشف الأخطاء قبل ما تشغّل",
          desc: R`[[PSScriptAnalyzer]] موديول بيقرا سكربتك من غير ما يشغّله ويطلّعلك الأخطاء والعادات الوحشة، زي [[shellcheck]] بتاع bash. [[Install-Module]] بيحمّله من PowerShell Gallery (المخزن الرسمي للموديولات)، و [[-Scope CurrentUser]] يعني لليوزر بتاعك بس فمش محتاج أدمن. وأول مرة ممكن يسألك إنك تثق في PSGallery، اكتب Y.

[[Invoke-ScriptAnalyzer .\backup.ps1]] بيطبع جدول فيه RuleName (اسم القاعدة) و Severity (Error أو Warning أو Information) ورقم السطر والرسالة. ولو بتستخدم extension بتاع PowerShell في VS Code، نفس الفحص شغال جواه وبيعلّم تحت الكود وانت بتكتب.

ولما السكربت يتصرف غريب ومش عارف بيقف فين: [[Set-PSDebug -Trace 1]] بيطبع كل سطر قبل ما يتنفذ (زي [[bash -x]])، تشغّل السكربت وتشوف، وبعدين [[Set-PSDebug -Off]] تقفل التتبع عشان ميفضلش شغال في النافذة.`,
          example: R`Install-Module PSScriptAnalyzer -Scope CurrentUser
Invoke-ScriptAnalyzer .\backup.ps1
Set-PSDebug -Trace 1
.\backup.ps1
Set-PSDebug -Off`,
          try: "شغّله على backup.ps1 اللي تحت.",
          deep: {
            why: R`PowerShell بيسامح في حاجات كتير بتبوظ بعدين: aliases في سكربت هيشتغل على لينكس، أو متغير اتكتب غلط، أو Write-Host في فانكشن المفروض ترجّع داتا. PSScriptAnalyzer بيقرا الكود ويطلّعلك ده قبل ما تشغّل، زي shellcheck للـ bash.`,
            how: R`[[Install-Module -Name PSScriptAnalyzer -Scope CurrentUser]] مرة واحدة. [[Invoke-ScriptAnalyzer -Path script.ps1]] بيحلل.

بيكتشف: cmdlets قديمة، وأسلوب كود مش PowerShell-idiomatic، ومشاكل compatibility، ومشاكل أمان.

في VS Code مع extension بتاع PowerShell: بيعلّم على المشاكل وانت بتكتب.`,
            when: "قبل أي سكربت يشتغل على سيرفر. ولما سكربت بيتصرف غريب.",
            mistakes: "تتجاهل الـ warnings «عشان السكربت شغال». كتير منها بتكشف مشاكل مش واضحة."
          },
          lines: [
            "سطّب أداة الفحص (مرة واحدة).",
            "افحص السكربت واطبع التحذيرات.",
            "شغّل التتبع: اطبع كل سطر قبل تنفيذه (زي bash -x).",
            "شغّل السكربت وشوف التتبع.",
            "اقفل التتبع."
          ],
          sol: R`الـ Install-Module بيحمّل من PowerShell Gallery (ممكن يسألك إنك تثق في PSGallery، اكتب Y). بعدين [[Invoke-ScriptAnalyzer .\backup.ps1]]. جربته على backup.ps1 بتاع الدرس اللي تحت بالظبط، فطلع تحذير واحد: [[PSAvoidUsingWriteHost]] بـ Severity Warning على [[Line 16]]، عشان Write-Host مش بيدخل الـ pipeline.

ده مش error والسكربت شغال، بس لو هتستخدم الناتج في سكربت تاني استخدم Write-Output. ولو عندك aliases زي [[gci]] و [[%]] في السكربت هيطلع [[PSAvoidUsingCmdletAliases]]، ولو متغير متعرفش وما استخدمتوش [[PSUseDeclaredVarsMoreThanAssignment]]. و [[Set-PSDebug -Trace 1]] بيطبع [[DEBUG:]] قبل كل سطر برقمه، وهتلاقيه بيدخل جوه Compress-Archive نفسه ويطبع مئات السطور، فمتتخضش، دور على أرقام سطور سكربتك.`
        }
      ]
    },
    {
      t: "ملفات البيانات والجدولة",
      l: 3,
      n: R`CSV و JSON و XML، وإزاي تخلّي السكربت يشتغل لوحده كل يوم`,
      items: [
        {
          cmd: "Import-Csv",
          title: "اقرا ملف CSV واشتغل عليه كجدول",
          desc: R`[[Import-Csv]] بيقرا ملف CSV ويحوّل كل صف لـ object، وأول سطر في الملف (الهيدر) بيبقى أسامي الخصائص. فبعد [[$users = Import-Csv .\users.csv]] تقدر تقول [[$users[0].Email]] أو تفلتر وترتب بـ Where-Object و Sort-Object زي أي ناتج أمر. في bash ده محتاج [[awk -F,]] وتعدّ الأعمدة بإيدك.

أول ٦ سطور في المثال بتعمل الملف للتجربة: here-string ([[@" ... "@]]، درس النصوص) متبعت لـ [[Set-Content]]. بعدها [[.Count]] عدد الصفوف من غير الهيدر، و [[Measure-Object -Property Age -Average]] متوسط عمود.

أهم حاجة: كل القيم اللي جاية من CSV نصوص، حتى الأرقام. عشان كده الفلتر فيه [[[int]$_.Age]]: من غيرها المقارنة بتبقى نص بنص (درس عوامل المقارنة). والسطر اللي بعده بيعمل عمود جديد: [[($_.Email -split '@')[1]]] يقطّع الإيميل عند [[@]] وياخد الجزء التاني (الدومين)، وبيصدّر النتيجة CSV جديد. وخلي بالك: Excel على أجهزة كتير بيحفظ CSV بفاصلة منقوطة [[;]] بدل الفاصلة، ساعتها [[-Delimiter ';']].`,
          example: R`@"
Name,Email,Age
Ali,ali@example.com,31
Sara,sara@example.com,24
Omar,omar@example.com,40
"@ | Set-Content users.csv
$users = Import-Csv .\users.csv
$users.Count
$users[0].Email
$users | Where-Object { [int]$_.Age -gt 30 } | Select-Object -ExpandProperty Name
($users | Measure-Object -Property Age -Average).Average
$users | ForEach-Object {
    [PSCustomObject]@{ Name = $_.Name; Domain = ($_.Email -split '@')[1] }
} | Export-Csv domains.csv -NoTypeInformation
Get-Content domains.csv`,
          try: R`ضيف للـ CSV عمود Active فيه yes أو no، واعمل ملف [[active.csv]] فيه الاسم والإيميل للـ Active بس.`,
          flag: "script",
          deep: {
            why: "CSV هو اللغة المشتركة بين الناس والسكربتات: لستة يوزرز من HR، أو تصدير من Excel أو من قاعدة بيانات، أو تقرير هتبعته لمديرك. سكربت يقرا CSV ويعمل حاجة لكل صف (يبعت إيميل، يعمل فولدر، يتأكد من سيرفر) ده من أكتر أنواع الأتمتة فايدة.",
            how: R`Import-Csv بيستخدم أول سطر أسامي. لو الملف مفيهوش هيدر: [[-Header Name, Email, Age]]. ولو فيه أسامي أعمدة بمسافات زي «First Name»، اقراها بـ [[$_."First Name"]] أو [[$_.'First Name']].

الترميز: لو العربي طالع رموز، الملف غالبًا من Excel. جرّب [[-Encoding utf8]]، ولو كان ANSI عربي في 5.1 [[-Encoding Default]]. وعند التصدير لـ Excel اللي بيفتح العربي صح: [[Export-Csv -Encoding utf8BOM]] في PowerShell 7 (درس Export-Csv).

الفاصل: [[-Delimiter ';']] أو [[-UseCulture]] (ياخد الفاصل من إعدادات لغة ويندوز). لو الفاصل غلط هتلاقي عمود واحد اسمه كل الهيدر لازق في بعضه.

القيم نصوص: [[[int]]] و [[[double]]] و [[[datetime]]] عشان تحسب أو تقارن. و [[Sort-Object { [int]$_.Age }]] للترتيب الرقمي. و [[Measure-Object]] بيحوّل لوحده، عشان كده المتوسط اشتغل.

الملفات الكبيرة: Import-Csv بيقرا صف صف، فـ [[Import-Csv big.csv | Where-Object ... | Export-Csv out.csv]] مش بيحمّل الملف كله في الرام. لكن [[$all = Import-Csv big.csv]] بيحمّله كله.

و [[ConvertFrom-Csv]] نفس الفكرة بس على نص مش ملف، مفيد مع ناتج برامج قديمة زي [[tasklist /fo csv | ConvertFrom-Csv]].`,
            when: "أي «لستة» جاية من بره السكربت: يوزرز، سيرفرات، منتجات، أسعار. وكمان تقارير بتطلع من السكربت لحد بيفتحها في Excel.",
            mistakes: R`تقارن أعمار أو أسعار من CSV من غير [[[int]]] فـ "9" تطلع أكبر من "30". أو تفتح ملف Excel بـ [[;]] من غير [[-Delimiter]] فيطلع عمود واحد. أو تصدّر بـ [[Export-Csv]] من غير [[-NoTypeInformation]] في 5.1 فأول سطر في الملف يبقى [[#TYPE]]. أو تعمل [[Format-Table]] قبل Export-Csv.`
          },
          lines: [
            "here-string بيبدأ: ده محتوى الملف للتجربة...",
            "...الهيدر: أسامي الأعمدة...",
            "...صف...",
            "...صف...",
            "...صف...",
            "...قفلة النص، واكتبه في users.csv.",
            "اقرا الملف: كل صف بقى object.",
            "عدد الصفوف: 3.",
            "إيميل أول واحد.",
            "الأسامي اللي عمرها أكبر من 30. [[[int]]] لأن القيم نصوص.",
            "متوسط الأعمار.",
            "لكل يوزر...",
            "...اعمل صف جديد فيه الاسم والدومين (الجزء اللي بعد @)...",
            "...وصدّر الكل CSV جديد.",
            "اعرض الملف الجديد."
          ],
          sol: R`المثال على PowerShell 7 طبع: [[3]] و [[ali@example.com]] و [[Ali]] و [[Omar]] و [[31.6666666666667]]، وبعدين محتوى domains.csv: [["Name","Domain"]] و [["Ali","example.com"]] وهكذا.

الحل في الـ solCode: ضفت Active للهيدر و yes أو no لكل صف، والفلتر [[$_.Active -eq "yes"]] (من غير تحويل، لأنها نص أصلًا، و [[-eq]] مش بيفرّق كابيتال وسمول فـ Yes تعدّي كمان). الملف طلع [["Name","Email"]] وتحته Ali و Omar بس. لو نسيت تزوّد Active في الهيدر، Import-Csv هيتجاهل القيمة الزيادة في كل صف والفلتر مش هيرجع حاجة.`,
          solCode: R`@"
Name,Email,Age,Active
Ali,ali@example.com,31,yes
Sara,sara@example.com,24,no
Omar,omar@example.com,40,yes
"@ | Set-Content users.csv
Import-Csv .\users.csv |
    Where-Object Active -eq "yes" |
    Select-Object Name, Email |
    Export-Csv active.csv -NoTypeInformation
Get-Content active.csv`
        },
        {
          cmd: "ConvertTo-Json -Depth",
          title: "عدّل ملف JSON واكتبه",
          desc: R`الخطوات التلاتة: اقرا الملف كنص واحد وحوّله object ([[Get-Content -Raw | ConvertFrom-Json]]، درس ConvertFrom-Json)، وعدّل بالنقطة زي أي متغير، وبعدين حوّله نص تاني بـ [[ConvertTo-Json]] واكتبه بـ [[Set-Content]]. ده المقابل لـ [[jq]] في bash، بس بمتغيرات عادية.

التعديلات في المثال: [[$cfg.server.port = 8080]] يغيّر قيمة جوه object جوه object، و [[+=]] يزوّد عنصر على array موجودة. أما مفتاح جديد مكانش في الملف فمينفعش بـ [[=]] على طول: لازم [[Add-Member -NotePropertyName version -NotePropertyValue "1.1.0"]] (يعني ضيف خاصية اسمها كذا وقيمتها كذا).

أهم parameter: [[-Depth]]. ConvertTo-Json افتراضيًا بيكتب مستويين بس، وأي حاجة أعمق بتتحوّل لنص زي [[@{origins=System.Object[]}]] والبيانات تضيع. عشان كده دايمًا [[-Depth 10]] أو أكتر. وآخر سطر بيوريك المشكلة بـ [[-Depth 1]]: PowerShell 7 بيطلع تحذير، لكن Windows PowerShell 5.1 بيقطع من غير ولا كلمة. و [[-Encoding utf8]] في PowerShell 7 من غير BOM، في 5.1 بيحط BOM في الأول وده ممكن يبوّظ ملف بيقراه Node.`,
          example: R`$path = ".\appsettings.json"
$cfg = Get-Content $path -Raw | ConvertFrom-Json
$cfg.server.port = 8080
$cfg.server.cors.origins += "https://shop.example.com"
$cfg.features += "orders"
$cfg | Add-Member -NotePropertyName version -NotePropertyValue "1.1.0"
$cfg | ConvertTo-Json -Depth 10 | Set-Content $path -Encoding utf8
Get-Content $path
$cfg | ConvertTo-Json -Depth 1`,
          try: R`اعمل appsettings.json (المحتوى في الـ solCode)، وشغّل المثال، وبعدين غيّر [[-Depth 10]] لـ [[-Depth 2]] في سطر الكتابة وشغّله على نسخة جديدة من الملف وبص عمل إيه في origins.`,
          flag: "script",
          deep: {
            why: R`سكربت ديبلوي محتاج يغيّر البورت أو رابط الـ API في ملف إعدادات، أو يزوّد version في package.json، أو يحدّث إعدادات VS Code لفريق كامل. تعديل JSON بـ [[-replace]] على النص هش جدًا، والطريقة الصح إنك تفهمه object وتعدّله.`,
            how: R`[[ConvertFrom-Json]] بيرجع PSCustomObject. في PowerShell 7 فيه [[-AsHashtable]] لو عايز hashtable (أسهل في إضافة وحذف مفاتيح، وبيقبل مفاتيح بتفرق بالكابيتال بس). وفيه كمان [[-Depth]] لـ ConvertFrom-Json في 7، افتراضيه 1024 فمش هتحتاجه غالبًا. في 5.1 مفيش الاتنين.

مفتاح جديد: [[Add-Member]] زي المثال. أو مع hashtable: [[$cfg["version"] = "1.1.0"]].

حذف مفتاح: [[$cfg.PSObject.Properties.Remove("debug")]].

ConvertTo-Json الافتراضي [[-Depth 2]]، والحد الأقصى 100. التحذير «Resulting JSON is truncated» ظهر في PowerShell 7.1، قبلها (وفي 5.1) القطع بيحصل بصمت.

الشكل: PowerShell 7 بيكتب بمسافتين مرتبين. 5.1 بيكتب بمسافات غريبة بس JSON سليم. و [[-Compress]] سطر واحد من غير مسافات. وفي 5.1 حروف زي [[<]] و [[']] بتتكتب [[\u003c]] و [[\u0027]]، سليمة بس شكلها وحش.

package.json بالذات: لو هتعدّله من سكربت، [[npm pkg set version=1.2.0]] أضمن لأنه بيحافظ على الترتيب والتنسيق اللي npm متعود عليه.`,
            when: "ملفات إعدادات (appsettings.json، config.json، settings.json بتاع VS Code)، وردود APIs عايز تعدّلها وتبعتها تاني.",
            mistakes: R`تنسى [[-Depth]] فالـ arrays اللي جوه objects تتحول لنص [[System.Object[]]] وتكتب فوق الملف الأصلي، فتضيع الإعدادات. خد نسخة قبل أول تجربة. أو تقرا من غير [[-Raw]] في 5.1. أو تحاول [[$cfg.newKey = 1]] على مفتاح مش موجود فيطلع error إن الخاصية مش موجودة. أو تكتب بـ [[Set-Content]] في 5.1 من غير [[-Encoding]] فالعربي يضيع.`
          },
          lines: [
            "مسار الملف.",
            "اقراه كنص واحد وحوّله object.",
            "غيّر قيمة جوه object متداخل.",
            "زوّد عنصر على array موجودة.",
            "وعلى array تانية.",
            "مفتاح جديد مكانش في الملف: لازم Add-Member.",
            "حوّله JSON بعمق 10 مستويات واكتبه فوق الملف.",
            "اعرض الملف بعد التعديل.",
            "نفس الـ object بعمق 1 بس: شوف اللي اتقطع."
          ],
          sol: R`جربته على PowerShell 7 بالملف اللي في الـ solCode: الملف بقى فيه [["port": 8080]] و origins فيها الرابطين و features فيها auth و cart و orders وفي الآخر [["version": "1.1.0"]]. وآخر سطر طلع [[WARNING: Resulting JSON is truncated as serialization has exceeded the set depth of 1.]] وجواه [["cors": "@{origins=System.Object[]}"]]: الـ array اتحولت لنص.

مع [[-Depth 2]] في سطر الكتابة (جربتها): server و cors اتكتبوا عادي، لكن origins اللي جوه cors اتحوّلت من array لنص واحد: [["origins": "http://localhost:5173 https://shop.example.com"]]، الرابطين لازقين بمسافة. الملف لسه JSON سليم، فمفيش أي error، بس أي برنامج بيقرا origins كلستة هيبوظ. ولو ده حصل على ملف حقيقي اتكتب فوق الأصل، فخد نسخة الأول.`,
          solCode: R`@"
{
  "name": "shop",
  "server": { "port": 3000, "cors": { "origins": ["http://localhost:5173"] } },
  "features": ["auth", "cart"]
}
"@ | Set-Content appsettings.json`
        },
        {
          cmd: "[xml]",
          title: "اقرا وعدّل ملف XML (web.config و .csproj)",
          desc: R`XML لسه موجود في ويندوز كتير: [[web.config]] و [[.csproj]] و [[app.config]] و [[pom.xml]]. في PowerShell بتحوّل النص لمستند XML بكلمة [[[xml]]] قبل المتغير (اسمها type accelerator، اختصار للنوع XmlDocument)، وبعدها تمشي جوه العناصر بالنقطة زي الفولدرات: [[$doc.configuration.appSettings.add]] بيرجع كل عناصر [[<add>]] اللي جوه appSettings، والـ attributes بتتقري بنفس الطريقة ([[.key]] و [[.value]]).

لما يبقى فيه عناصر كتير بنفس الاسم وعايز واحد بعينه، [[.SelectSingleNode()]] بياخد XPath: [[//add[@key='Debug']]] يعني «أي عنصر add في أي مكان، الـ attribute بتاعه key بيساوي Debug». تعدّل قيمته بـ [[=]] عادي، وبعدين [[$doc.Save($path)]] يكتب الملف.

[[Save()]] دي method من .NET مش أمر PowerShell، فلازم تديها مسار كامل: المسار النسبي بيتحسب من الفولدر اللي PowerShell اتفتح فيه مش من مكانك الحالي. عشان كده المسار متبني بـ [[Join-Path $PSScriptRoot]]. وآخر سطر بيتأكد بـ [[Select-String]] إن التعديل اتكتب.`,
          example: R`$path = Join-Path $PSScriptRoot "web.config"
[xml]$doc = Get-Content $path -Raw
$doc.configuration.appSettings.add | Format-Table key, value
$debug = $doc.SelectSingleNode("//add[@key='Debug']")
$debug.value = "false"
$doc.Save($path)
Select-String -Path $path -Pattern 'Debug'`,
          try: R`احفظ web.config اللي في الـ solCode جنب السكربت، وشغّله. وبعدين عدّل السكربت يغيّر ApiUrl لـ [[https://api.example.com]].`,
          flag: "script",
          deep: {
            why: "سكربت ديبلوي على ويندوز سيرفر غالبًا هيلمس web.config: يغيّر connection string أو يقفل Debug قبل الإنتاج. أو سكربت بيقرا نسخة مشروع .NET من الـ .csproj. التعديل بـ [[-replace]] على النص بيبوظ مع أول مسافة أو ترتيب مختلف.",
            how: R`[[[xml]]] بيحوّل النص لـ System.Xml.XmlDocument. لو النص مش XML سليم بيطلع error فيه رقم السطر، وده في حد ذاته فحص مفيد.

التنقل بالنقطة: كل عنصر بقى خاصية. لو فيه أكتر من عنصر بنفس الاسم بترجع array، فـ [[$doc.configuration.appSettings.add[0]]] أول واحد. والـ attributes والعناصر الفرعية الاتنين بيتقروا بالنقطة.

XPath أدق: [[SelectNodes("//add")]] كلهم، و [[SelectSingleNode("//add[@key='X']")]] أول واحد بيطابق. وفيه [[Select-Xml]] أمر PowerShell بيعمل نفس الحكاية على ملف مباشرة.

إضافة عنصر: [[$new = $doc.CreateElement("add")]] و [[$new.SetAttribute("key", "Mode")]] و [[$doc.configuration.appSettings.AppendChild($new)]]. والـ AppendChild بيرجع العنصر فبيتطبع، فحط [[| Out-Null]].

ملفات فيها namespace (زي .csproj القديمة فيها xmlns): XPath العادي مش هيلاقي حاجة، ومحتاج XmlNamespaceManager. التنقل بالنقطة بيشتغل عادي.

الحفظ: [[Save()]] بيكتب بالترميز اللي في أول سطر ([[encoding="utf-8"]])، وفي تجربتي حط BOM في أول الملف. أغلب الأدوات (IIS و .NET و VS) مش فارق معاها، بس خليك عارف. و [[[Environment]::CurrentDirectory]] هو الفولدر اللي .NET بيحسب منه المسارات النسبية، ومش بيتغيّر لما تعمل cd في PowerShell.`,
            when: "web.config و app.config قبل الديبلوي، قراية النسخة من .csproj أو pom.xml، أو أي أداة قديمة إعداداتها XML.",
            mistakes: R`تدّي [[Save()]] مسار نسبي فالملف يتكتب في فولدر تاني خالص (جربتها: [[$d.Save("rel.xml")]] بعد [[Set-Location /tmp]] كتب الملف في الفولدر اللي pwsh اتفتح فيه مش في /tmp). أو تكتب [[$xml = Get-Content file.xml]] من غير [[[xml]]] فتشتغل على نص. أو تنسى إن XPath بيفرّق بين الكابيتال والسمول ([[@Key]] غير [[@key]]).`
          },
          lines: [
            "المسار الكامل للملف من فولدر السكربت (Save محتاج مسار كامل).",
            "اقرا النص وحوّله XML بـ [[[xml]]].",
            "امشي جوه العناصر بالنقطة، واعرض key و value لكل add.",
            "هات العنصر اللي key بتاعه Debug بـ XPath.",
            "غيّر الـ attribute.",
            "احفظ الملف.",
            "اتأكد إن التعديل اتكتب."
          ],
          sol: R`جربته على PowerShell 7: الجدول طلع [[ApiUrl  http://localhost:8000]] و [[Debug  true]]، وبعدين [[web.config:5:    <add key="Debug" value="false" />]]. والملف اتحفظ بنفس التنسيق، بس في أوله BOM (3 بايتات مخفية) لأن أول سطر فيه encoding="utf-8".

لتغيير ApiUrl: نفس السطرين بـ [[//add[@key='ApiUrl']]] و [[.value = "https://api.example.com"]] قبل [[Save]]. لو SelectSingleNode رجّع فاضي ([[$null]]) يبقى الـ XPath مش لاقي حاجة: راجع الكابيتال في key، وإن الملف مفيهوش xmlns.`,
          solCode: R`@"
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <appSettings>
    <add key="ApiUrl" value="http://localhost:8000" />
    <add key="Debug" value="true" />
  </appSettings>
</configuration>
"@ | Set-Content web.config
# جوه السكربت، قبل سطر Save:
$api = $doc.SelectSingleNode("//add[@key='ApiUrl']")
$api.value = "https://api.example.com"`
        },
        {
          cmd: "Register-ScheduledTask",
          title: "شغّل سكربت لوحده كل يوم (Task Scheduler)",
          desc: R`Task Scheduler هو [[cron]] بتاع ويندوز: بيشغّل برنامج في معاد ثابت أو عند حدث (فتح الجهاز، تسجيل الدخول). من PowerShell بتعمل المهمة من ٣ أجزاء: [[New-ScheduledTaskAction]] «هيشغّل إيه»، و [[New-ScheduledTaskTrigger]] «إمتى»، و [[New-ScheduledTaskSettingsSet]] إعدادات إضافية، وبعدين [[Register-ScheduledTask]] بيسجّلها باسم.

الـ action: [[-Execute]] البرنامج، وهنا pwsh بمساره الكامل من [[(Get-Command pwsh).Source]]، و [[-Argument]] اللي بيتبعتله: [[-NoProfile]] و [[-ExecutionPolicy Bypass]] (للمهمة دي بس) و [[-File]] ومسار السكربت بين علامات تنصيص (اتبنى بالـ [[-f]] من درس النصوص عشان لو المسار فيه مسافات). و [[-WorkingDirectory]] الفولدر اللي هيشتغل منه. والـ trigger: [[-Daily -At 9am]] كل يوم الساعة ٩ الصبح (وفيه [[-Weekly -DaysOfWeek Friday]] و [[-AtLogOn]] و [[-AtStartup]]). و [[-StartWhenAvailable]] يعني لو الجهاز كان مقفول وقت المعاد، شغّلها أول ما يفتح.

بعد التسجيل: [[Start-ScheduledTask]] تجرّبها دلوقتي بدل ما تستنى بكرة، و [[Get-ScheduledTaskInfo]] يوريك آخر مرة اشتغلت ونتيجتها ([[LastTaskResult]] صفر يعني نجحت، وأي رقم تاني هو الـ exit code بتاع السكربت)، و [[Unregister-ScheduledTask]] يمسحها، و [[-Confirm:$false]] من غير سؤال. والأوامر دي ويندوز بس.`,
          example: R`$script = "C:\scripts\backup.ps1"
$pwsh = (Get-Command pwsh).Source
$action = New-ScheduledTaskAction -Execute $pwsh -Argument ('-NoProfile -ExecutionPolicy Bypass -File "{0}"' -f $script) -WorkingDirectory (Split-Path $script)
$trigger = New-ScheduledTaskTrigger -Daily -At 9am
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable
Register-ScheduledTask -TaskName "DailyBackup" -Action $action -Trigger $trigger -Settings $settings -Description "Zip src every morning"
Start-ScheduledTask -TaskName "DailyBackup"
Get-ScheduledTaskInfo -TaskName "DailyBackup" | Select-Object LastRunTime, LastTaskResult, NextRunTime
Unregister-ScheduledTask -TaskName "DailyBackup" -Confirm:$false`,
          try: R`سجّل مهمة بتشغّل backup.ps1 (درس backup.ps1) كل يوم، وشغّلها بـ Start-ScheduledTask، واستنى ثواني واقرا Get-ScheduledTaskInfo، واتأكد إن الـ zip اتعمل. وافتح Task Scheduler من Start وشوفها تحت Task Scheduler Library.`,
          deep: {
            why: "الباك أب اللي بيعتمد إنك «تفتكر تشغّله» مش هيتعمل. نفس الحكاية تنضيف الـ Downloads، وتقرير مساحة الديسك، ورفع الشغل على GitHub. سكربت مكتوب كويس + مهمة مجدولة = حاجة بتحصل لوحدها كل يوم من غير ما تفكر فيها.",
            how: R`المهمة بتشتغل بيئة مختلفة عن الترمنال بتاعك، وده سبب أغلب المشاكل:
الفولدر الحالي مش فولدر السكربت (غالبًا System32)، فالسكربت لازم يعتمد على [[$PSScriptRoot]] أو [[-WorkingDirectory]]، ومفيش مسارات نسبية.
مفيش حد قدام الشاشة، فأي [[Read-Host]] أو parameter إجباري ناقص أو سؤال تأكيد هيعلّق المهمة.
الـ output مش ظاهر لحد، فسجّل بـ Start-Transcript (درس Start-Transcript) واخرج بـ [[exit 1]] لو فشل، فيظهر في [[LastTaskResult]].

[[(Get-Command pwsh).Source]] بيجيب المسار الكامل زي [[C:\Program Files\PowerShell\7\pwsh.exe]]، وده أضمن من الاسم لوحده. لو PowerShell 7 مش متسطب استخدم [[powershell.exe]] (5.1) في [[-Execute]]. ولو متسطب من Microsoft Store المسار هيبقى جوه WindowsApps، والأضمن تسطّبه بـ winget (أول درس في التاب).

الصلاحيات: من غير [[-User]] المهمة بتتسجّل باسمك وبتشتغل وانت داخل على الجهاز بس، وده غالبًا مش محتاج PowerShell أدمن. لو طلعلك Access is denied، افتح PowerShell كأدمن. ولو عايزها تشتغل حتى وانت مش داخل، أو بصلاحيات أعلى ([[-RunLevel Highest]])، محتاج أدمن ومعلومات اليوزر، وده أسهل من واجهة Task Scheduler نفسها (Run whether user is logged on or not).

أرقام LastTaskResult المشهورة: [[0]] نجح، و [[267011]] لسه ماشتغلتش ولا مرة، و [[267009]] شغالة دلوقتي، وأي رقم صغير زي [[1]] هو exit code السكربت.

تعديل مهمة موجودة: [[Set-ScheduledTask]]، أو امسحها وسجّلها تاني. والبديل من CMD: [[schtasks /create]] (بيتشرح في تاب CMD).`,
            when: "باك أب يومي، تنضيف فولدرات، تقارير، مزامنة، أي سكربت المفروض يشتغل بانتظام من غير ما تفتكره.",
            mistakes: R`سكربت بيشتغل تمام من الترمنال ويفشل من المهمة لأنه بيستخدم مسار نسبي أو متغير من الـ profile بتاعك (والمهمة شغالة [[-NoProfile]]). أو تحط في [[-Argument]] مسار فيه مسافات من غير علامات تنصيص. أو سكربت بيسأل سؤال فالمهمة تفضل Running للأبد. أو تختبر بإنك تستنى لبكرة بدل [[Start-ScheduledTask]]. أو تنسى إن الجهاز بيدخل sleep، فالمعاد يعدّي ([[-StartWhenAvailable]] بيحل جزء من ده).`
          },
          lines: [
            "مسار السكربت الكامل.",
            "المسار الكامل لـ pwsh.exe.",
            "هيشغّل إيه: pwsh، والـ arguments (المسار بين علامات تنصيص بالـ [[-f]])، ومن أنهي فولدر.",
            "إمتى: كل يوم الساعة 9 الصبح.",
            "لو الجهاز كان مقفول وقتها، شغّلها أول ما يفتح.",
            "سجّل المهمة باسم ووصف.",
            "شغّلها دلوقتي للتجربة.",
            "آخر مرة اشتغلت، ونتيجتها (0 نجح)، والمعاد الجاي.",
            "امسح المهمة من غير سؤال تأكيد."
          ],
          sol: R`[[Register-ScheduledTask]] بيطبع جدول فيه [[TaskPath]] بـ [[\]] و [[TaskName]] بـ DailyBackup و [[State]] بـ Ready. وبعد [[Start-ScheduledTask]] بثواني، [[Get-ScheduledTaskInfo]] المفروض يطلع LastRunTime بوقت دلوقتي و LastTaskResult بـ [[0]] و NextRunTime بكرة الساعة 9، والـ zip الجديد موجود في فولدر backups.

لو LastTaskResult [[267011]] يبقى لسه مشتغلتش، استنى شوية. ولو [[1]] أو أي رقم صغير، السكربت نفسه فشل، فشغّله بنفس السطر من الترمنال ([[pwsh -NoProfile -File "C:\scripts\backup.ps1"]]) عشان تشوف الـ error، أو اقرا اللوج لو عامل transcript. ولو الـ zip اتعمل في System32 بدل backups، يبقى السكربت بيستخدم مسار نسبي من غير [[$PSScriptRoot]] ولا [[-WorkingDirectory]]. (مقدرتش أجرّب Task Scheduler هنا على لينكس؛ الأسامي والأرقام دي من توثيق Microsoft لموديول ScheduledTasks.)`
        }
      ]
    },
    {
      t: "سكربتات أتمتة جاهزة",
      l: 3,
      n: R`سكربتات كاملة متجربة لمهام حقيقية. احفظ أي واحد في ملف وعدّل الـ parameters، واللي بيمسح أو بينقل منهم بيدعم -WhatIf فجرّب بيه الأول`,
      items: [
        {
          cmd: "backup.ps1",
          title: "سكربت باك أب بالتاريخ",
          desc: R`أول سكربت حقيقي بيجمع اللي فات: بياخد فولدر ويعمله zip باسم فيه التاريخ والوقت، في فولدر باك أب. احفظه في ملف [[backup.ps1]] (الخطوات في درس «أول سكربت .ps1»).

[[param( )]] في أول الملف بتعرّف الـ arguments اللي السكربت بياخدها: [[[string]$Source = ".\src"]] يعني parameter اسمه Source، نصي، ولو متبعتش قيمته [[.\src]]. فتشغّله بـ [[.\backup.ps1]] بالقيم الافتراضية، أو [[.\backup.ps1 -Source .\app -Dest .\bk]].

جواه: [[$ErrorActionPreference = "Stop"]] يخلي أي error يوقف السكربت بدل ما يكمّل، و [[Get-Date -Format "yyyy-MM-dd_HH-mm"]] تاريخ ينفع في اسم ملف (من غير [[/]] ولا [[:]] اللي ممنوعين في الأسامي)، و [[Join-Path]] بيركّب المسار بالفاصل الصح، و [[Out-Null]] بيرمي ناتج New-Item عشان ميتطبعش. ولو عايزه يشتغل لوحده كل يوم، ده درس Register-ScheduledTask.`,
          example: R`param(
    [string]$Source = ".\src",
    [string]$Dest = ".\backups"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $Dest)) {
    New-Item -ItemType Directory -Path $Dest | Out-Null
}

$stamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
$zip = Join-Path $Dest "backup_$stamp.zip"

Compress-Archive -Path "$Source\*" -DestinationPath $zip
Write-Host "Saved $zip" -ForegroundColor Green`,
          try: R`احفظه وشغّله على فولدر lab\app، وبعدين ضيف سطر يمسح الباك أب الأقدم من 7 أيام.`,
          flag: "script",
          deep: {
            why: "سكربت PowerShell حقيقي بيجمع كل اللي اتعلمناه. نفس فكرة backup.sh بس لـ ويندوز.",
            how: R`[[param()]] في الأول عشان السكربت ياخد arguments. [[CmdletBinding()]] بيضيف -Verbose و-WhatIf أوتوماتيك.

[[Write-Verbose]] بيطبع فقط لو شغّلت السكربت بـ -Verbose. ده أحسن من Write-Host لرسايل التفاصيل.

[[try/finally]]: الـ finally بيشتغل حتى لو حصل error، مثالي للتنضيف.

[[Get-Date -Format]] بياخد format string. [[yyyy-MM-dd_HH-mm]] بيطلع format مناسب لأسامي الملفات.

[[Compress-Archive]] عمل zip. [[Get-ChildItem | Sort LastWriteTime | Select -SkipLast 7]] بياخد كل الملفات عدا آخر ٧.`,
            when: "أتمتة باك أب على ويندوز. المهمة دي في Task Scheduler بتشغّلها يوميًا.",
            mistakes: "Task Scheduler بيشغّل بـ System account أو user مش logged in. اتأكد من الصلاحيات وإن المسارات كاملة."
          },
          lines: [
            "بداية الـ parameters اللي السكربت بياخدها.",
            "المصدر، والافتراضي src.",
            "الوجهة، والافتراضي backups.",
            "قفلة.",
            "أي error يوقف السكربت.",
            "لو فولدر الوجهة مش موجود...",
            "...اعمله، وارمي الناتج عشان ميتطبعش ([[Out-Null]]).",
            "قفلة.",
            "التاريخ والوقت بصيغة تنفع اسم ملف.",
            "المسار الكامل لملف الـ zip، و [[Join-Path]] بيحط الفاصل الصح.",
            "اضغط محتوى المصدر.",
            "اطبع النتيجة بالأخضر."
          ],
          sol: R`[[.\backup.ps1 -Source .\app -Dest .\bk]] طبع [[Saved .\bk\backup_2026-09-30_05-12.zip]] بالأخضر. والحل الكامل في الـ solCode: آخر 3 سطور بيمسحوا أي باك أب أقدم من [[KeepDays]] أيام. جربته بملف قديم معمول بتاريخ من 10 أيام فطلع [[VERBOSE: Performing the operation "Remove File" on target "...backup_2020-01-01_00-00.zip"]]، والجديد فضل.

لو شغلته مرتين في نفس الدقيقة هيطلع [[The archive file ... already exists]]، لأن الاسم بالدقيقة؛ ضيف ثواني للـ format ([[yyyy-MM-dd_HH-mm-ss]]) لو محتاج. واتأكد إن [[Where-Object]] قبل [[Remove-Item]] دايمًا، وجرب الأول بـ [[-WhatIf]] بدل [[-Verbose]].`,
          solCode: R`param(
    [string]$Source = ".\src",
    [string]$Dest = ".\backups",
    [int]$KeepDays = 7
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $Dest)) {
    New-Item -ItemType Directory -Path $Dest | Out-Null
}

$stamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
$zip = Join-Path $Dest "backup_$stamp.zip"

Compress-Archive -Path "$Source\*" -DestinationPath $zip
Write-Host "Saved $zip" -ForegroundColor Green

Get-ChildItem $Dest -Filter "backup_*.zip" |
    Where-Object LastWriteTime -lt (Get-Date).AddDays(-$KeepDays) |
    Remove-Item -Verbose`
        },
        {
          cmd: "verify-stack.ps1",
          title: "شغّل الـ stack واستنى لحد ما يبقى جاهز فعلًا",
          desc: R`سكربت قبل ما تبدأ شغل: يتأكد إن Docker Desktop شغال وإن البورتات فاضية، وبعدين [[docker compose up -d --build --wait]] بيستنى لحد ما الخدمات تبقى healthy بدل [[Start-Sleep]]، ولو فشل يطبع حالة الخدمات وآخر اللوجات.`,
          example: R`$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

docker info > $null
if ($LASTEXITCODE -ne 0) { throw "Docker Desktop is not running" }

foreach ($port in 3000, 8000, 5432) {
    if (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) {
        Write-Warning "Port $port is already in use"
    }
}

docker compose up -d --build --wait --wait-timeout 120
if ($LASTEXITCODE -ne 0) {
    docker compose ps
    docker compose logs --tail 50
    throw "Stack did not become healthy"
}
docker compose ps
Write-Host "Ready: http://localhost:8000" -ForegroundColor Green`,
          try: "حطه جنب docker-compose.yml في مشروع عندك، وشغّله مرة و Docker Desktop مقفول ومرة وهو شغال.",
          flag: "script",
          deep: {
            why: "كل يوم نفس الخطوات: تفتكر تشغّل Docker Desktop، تكتشف إن بورت 5432 ماسكه Postgres متسطب على الجهاز، تعمل up وتستنى وتعمل refresh لحد ما الـ API يرد. سكربت واحد بيعمل الفحوصات دي ويقولك جاهز إمتى بالظبط.",
            how: R`[[docker info]] بيكلّم الـ Docker daemon، فلو Docker Desktop مقفول بيفشل. [[> $null]] يرمي الناتج العادي بس، والفحص على [[$LASTEXITCODE]] لأن docker برنامج خارجي. ومش [[*> $null]]، لأن في 5.1 مع Stop أي سطر stderr متوجّه بيوقف السكربت بـ NativeCommandError قبل رسالتك الواضحة.

[[Get-NetTCPConnection -State Listen]] بيجيب البورتات اللي فيه برنامج سامع عليها فعلًا. من غير [[-State Listen]] هتلاقي اتصالات قديمة (TIME_WAIT) على نفس الرقم وتاخد تحذير كاذب.

[[--wait]] بيخلي compose بعد ما يشغّل الخدمات يستنى لحد ما كلها تبقى running، واللي ليها [[healthcheck]] تبقى healthy. و [[--wait-timeout 120]] حد أقصى دقيقتين. لو خدمة وقعت أو فضلت unhealthy، compose يرجع exit code مش صفر. فبدل ما تخمّن بـ [[Start-Sleep 10]]، السكربت بيكمّل في اللحظة اللي الـ stack بقى جاهز فيها.

ولو فشل، [[docker compose ps]] يوريك أنهي خدمة فيها المشكلة، و [[logs --tail 50]] آخر ٥٠ سطر من كل خدمة، فتعرف السبب من غير ما تدوّر.`,
            when: "أول ما تفتح الجهاز تبدأ شغل على مشروع Docker، أو قبل ما تشغّل تيستات محتاجة الـ stack. و [[--wait]] نفسها مفيدة في أي سكربت ديبلوي أو CI.",
            mistakes: R`في مشروع حقيقي السكربت الأصلي كان بيستخدم [[docker-compose]] القديم و [[Start-Sleep 10]] بدل [[--wait]]، وبيدوّر على فولدر dist مع إن الـ Dockerfile بيبنيه بنفسه، وكان بيستخدم [[Get-NetTCPConnection]] من غير [[-State Listen]] فيطلع تحذيرات كاذبة. و [[--wait]] من غير [[healthcheck]] في الخدمات بيستنى إنها تبقى running بس، مش إنها جاهزة ترد، فحط healthcheck للـ API وقاعدة البيانات. والإيموجي أو العربي في [[Write-Host]] بيطلع رموز غريبة في PowerShell 5.1 لو ملف الـ ps1 مش محفوظ «UTF-8 with BOM» (عكس ملفات bat اللي لازم تبقى من غير BOM).`
          },
          lines: [
            "أي error من cmdlet يوقف السكربت.",
            "اشتغل من فولدر السكربت، جنب docker-compose.yml.",
            "Docker شغال؟ ارمي الناتج وافحص الـ exit code.",
            "لو لأ، وقّف برسالة واضحة.",
            "لكل بورت الـ stack محتاجه...",
            "...لو فيه برنامج سامع عليه دلوقتي...",
            "...حذّر (compose هيفشل يربط عليه).",
            "قفلة.",
            "قفلة.",
            "ابني وشغّل، واستنى لحد ما كل حاجة تبقى healthy، بحد أقصى دقيقتين.",
            "لو فشل...",
            "...وريني حالة كل خدمة...",
            "...وآخر ٥٠ سطر لوج من كل واحدة...",
            "...ووقّف السكربت.",
            "قفلة.",
            "الحالة النهائية.",
            "جاهز."
          ],
          sol: R`و Docker Desktop مقفول: [[docker info]] بيطبع error زي [[error during connect ... dockerDesktopLinuxEngine: The system cannot find the file specified]]، وبعدها السكربت يرمي [[Docker Desktop is not running]] بالأحمر ويقف، من غير ما يحاول يعمل build.

وهو شغال: لو فيه بورت مستخدم هتشوف [[WARNING: Port 5432 is already in use]]. وبعدين الـ build، وسطور زي [[Container app-db-1 Healthy]]، وفي الآخر جدول [[docker compose ps]] و [[Ready: http://localhost:8000]] بالأخضر. لو خدمة مفيهاش healthcheck، [[--wait]] بيستنى إنها تبقى running بس. ولو خدمة وقعت أو فضلت unhealthy 120 ثانية، هتشوف حالة الخدمات وآخر 50 سطر لوج وبعدين [[Stack did not become healthy]]. مقدرتش أشغّل Docker Desktop هنا، فالرسايل دي من توثيق Docker والسكربت نفسه.`
        },
        {
          cmd: "rename-photos.ps1",
          title: "غيّر أسامي صور كتير بترقيم وبالترتيب",
          desc: R`سكربت بياخد كل الصور في فولدر، ويرتبهم بتاريخ آخر تعديل، ويسميهم [[trip_001.jpg]] و [[trip_002.jpg]] وهكذا. بيجمع دروس كتير: [[[CmdletBinding(SupportsShouldProcess)]]] عشان [[-WhatIf]] يشتغل، و [[param()]] للفولدر والبادئة، و [[-in]] لفلترة الامتدادات (من غير ما يفرّق بين JPG و jpg)، و [[-f]] لبناء الاسم.

الاسم الجديد بيتبني بـ [["{0}_{1:D3}{2}" -f $Prefix, $i, $p.Extension.ToLower()]]: [[{0}]] البادئة، و [[{1:D3}]] الرقم ٣ خانات بأصفار (001)، و [[{2}]] الامتداد بحروف صغيرة. والـ [[if ($p.Name -ne $newName)]] بيعدّي الملف لو اسمه صح أصلًا، عشان لو شغلته مرتين ميطلعش error. و [[$i++]] يزوّد العدّاد بعد كل ملف.

الاستخدام الآمن: [[.\rename-photos.ps1 -Path D:\Photos\Dahab -Prefix dahab -WhatIf]] الأول، تقرا الأسامي اللي هتطلع، وبعدين من غير [[-WhatIf]]. الترتيب بـ LastWriteTime مش تاريخ التصوير الحقيقي (ده جوه بيانات الصورة EXIF)، بس غالبًا قريب منه للصور اللي اتنقلت من الموبايل.`,
          example: R`[CmdletBinding(SupportsShouldProcess)]
param(
    [string]$Path = ".",
    [string]$Prefix = "trip"
)

$photos = Get-ChildItem $Path -File |
    Where-Object Extension -in ".jpg", ".jpeg", ".png" |
    Sort-Object LastWriteTime

$i = 1
foreach ($p in $photos) {
    $newName = "{0}_{1:D3}{2}" -f $Prefix, $i, $p.Extension.ToLower()
    if ($p.Name -ne $newName) {
        Rename-Item $p.FullName -NewName $newName
    }
    $i++
}
Write-Host "Renamed $($photos.Count) files"`,
          try: R`اعمل فولدر فيه ٣ صور (أو ملفات فاضية بامتداد .jpg و .JPG و .png) وملف txt، وشغّله بـ [[-WhatIf]] وبعدين من غيرها. وبعدين شغّله تاني بـ [[-Prefix beach]].`,
          flag: "script",
          deep: {
            why: R`فولدر فيه ٢٠٠ صورة اسمها [[IMG_20260901_101500.jpg]] و [[WhatsApp Image 2026-09-02 at 10.00.jpeg]]، وعايزها مترقمة بالترتيب عشان ألبوم أو عرض أو ترفعها. بالإيد ده ساعة، وبالسكربت ثانية، ومع [[-WhatIf]] تشوف النتيجة قبل ما تلمس حاجة.`,
            how: R`الـ pipeline الأولاني بيجمع اللستة كلها في [[$photos]] قبل ما أي rename يحصل. ده مهم: لو كنت بتعمل rename وانت لسه بتلف على [[Get-ChildItem]] مباشرة، ممكن الملف اللي اتغيّر اسمه يتشاف تاني.

[[-in]] على [[Extension]] مش بيفرّق كابيتال وسمول، فـ [[.JPG]] بيعدّي. و [[.ToLower()]] في الاسم الجديد بتوحّد الامتدادات.

[[{1:D3}]]: الـ D يعني رقم صحيح، و 3 أقل عدد خانات. لو عندك أكتر من ٩٩٩ صورة خليها D4. الترقيم بالأصفار بيخلي الترتيب الأبجدي في Explorer هو نفس ترتيب الأرقام.

الـ WhatIf: السكربت مفيهوش [[ShouldProcess]] بإيده، بس [[SupportsShouldProcess]] بيخلي [[-WhatIf]] يوصل لـ [[Rename-Item]] لوحده، فبيطبع «What if: Performing the operation "Rename File"...» لكل ملف.

لو عايز الترتيب بتاريخ التصوير الحقيقي: [[System.Drawing]] أو أداة زي exiftool بتقرا EXIF، وده أعقد من الدرس ده.`,
            when: "صور رحلة، سكرينشوتات لمشروع، فواتير PDF عايزها مترقمة، أي فولدر أسامي ملفاته عشوائية.",
            mistakes: R`تشغّله من غير [[-WhatIf]] على الفولدر الغلط. أو تغيّر الترتيب بين تشغيلتين بنفس البادئة: لو trip_002 موجود وملف تاني محتاج ياخد نفس الاسم، Rename-Item هيطلع error للملف ده ويكمّل؛ الحل تشغّله ببادئة جديدة. أو تنسى [[-File]] فيحاول يغيّر أسامي فولدرات.`
          },
          lines: [
            "advanced script، و [[-WhatIf]] يوصل لـ Rename-Item لوحده.",
            "الـ parameters.",
            "الفولدر، والافتراضي الحالي.",
            "البادئة، والافتراضي trip.",
            "قفلة.",
            "هات الملفات بس...",
            "...اللي امتدادها صورة (من غير ما يفرّق JPG و jpg)...",
            "...ورتّبهم من الأقدم للأحدث.",
            "العدّاد يبدأ من 1.",
            "لكل صورة...",
            "...ابني الاسم: البادئة و _ والرقم ٣ خانات والامتداد بحروف صغيرة.",
            "...لو اسمها مش هو الاسم الجديد أصلًا...",
            "...غيّره.",
            "قفلة الـ if.",
            "زوّد العدّاد.",
            "قفلة اللوب.",
            "اطبع العدد."
          ],
          sol: R`جربته على ٣ ملفات [[IMG 001.JPG]] و [[IMG 002.jpg]] و [[holiday pic.jpeg]] بتواريخ مختلفة و [[notes.txt]]. مع [[-WhatIf]] طبع ٣ سطور زي [[What if: Performing the operation "Rename File" on target "Item: ...\IMG 002.jpg Destination: ...\trip_001.jpg".]] بالترتيب من الأقدم، و [[Renamed 3 files]] (العدد حتى مع WhatIf، لأنه عدد اللستة). من غير WhatIf بقوا [[trip_001.jpg]] و [[trip_002.jpg]] و [[trip_003.jpeg]]، و notes.txt متلمسش. لاحظ إن [[.JPG]] بقت [[.jpg]].

بـ [[-Prefix beach]] بقوا beach_001 لـ beach_003. ولو شغلت بنفس البادئة مرة تانية ومفيش جديد، الـ if بيعدّي كل الملفات من غير أي error.`
        },
        {
          cmd: "organize-downloads.ps1",
          title: "نظّم فولدر Downloads حسب نوع الملف",
          desc: R`سكربت بيلف على كل الملفات في Downloads (مش الفولدرات)، ويحط كل ملف في فولدر حسب امتداده: Images و Documents و Archives و Installers، وأي حاجة تانية في Other. الـ [[$groups]] hashtable: المفتاح اسم الفولدر، والقيمة array امتدادات (درس array و hashtable)، فتزوّد نوع جديد بسطر.

لكل ملف: [[foreach ($name in $groups.Keys)]] بيدوّر على المجموعة اللي امتداده فيها بـ [[-in]]، و [[break]] أول ما يلاقي. وبعدين يعمل فولدر المجموعة لو مش موجود. ولو فيه ملف بنفس الاسم في الفولدر ده، اللوب [[while (Test-Path $dest)]] بيزوّد [[ (1)]] و [[ (2)]] على الاسم زي ما ويندوز بيعمل، بدل ما يكتب فوق الملف القديم أو يطلع error. و [[BaseName]] الاسم من غير الامتداد.

الافتراضي [[(Join-Path $HOME "Downloads")]]، فتشغّله من غير arguments، أو [[-Path]] لأي فولدر تاني. وزي كل سكربت بيحرّك ملفات: [[-WhatIf]] الأول.`,
          example: R`[CmdletBinding(SupportsShouldProcess)]
param(
    [string]$Path = (Join-Path $HOME "Downloads")
)

$groups = @{
    Images     = ".jpg", ".jpeg", ".png", ".gif", ".webp"
    Documents  = ".pdf", ".docx", ".xlsx", ".pptx", ".txt"
    Archives   = ".zip", ".rar", ".7z"
    Installers = ".exe", ".msi"
}

foreach ($file in Get-ChildItem $Path -File) {
    $folder = "Other"
    foreach ($name in $groups.Keys) {
        if ($file.Extension -in $groups[$name]) { $folder = $name; break }
    }
    $destDir = Join-Path $Path $folder
    if (-not (Test-Path $destDir)) { New-Item -ItemType Directory $destDir | Out-Null }

    $dest = Join-Path $destDir $file.Name
    $n = 1
    while (Test-Path $dest) {
        $dest = Join-Path $destDir ("{0} ({1}){2}" -f $file.BaseName, $n, $file.Extension)
        $n++
    }
    Move-Item $file.FullName $dest
}`,
          try: R`اعمل فولدر تجربة فيه a.pdf و b.PNG و c.zip و d.exe و e.xyz و g.jpg، وجواه فولدر Images فيه g.jpg تاني. شغّله بـ [[-Path]] الفولدر ده و [[-WhatIf]]، وبعدين من غيرها، واعرض النتيجة بـ [[Get-ChildItem -Recurse -Name]].`,
          flag: "script",
          deep: {
            why: "فولدر Downloads عند أغلب الناس فيه آلاف الملفات من سنين. السكربت ده بيرتبه في ثواني، وتقدر تحطه في Task Scheduler (درس Register-ScheduledTask) يشتغل كل أسبوع.",
            how: R`ليه hashtable جوه لوب ومش [[switch]]؟ الاتنين ينفعوا. الـ hashtable بيخلي الإعدادات (أنهي امتداد في أنهي فولدر) منفصلة عن المنطق، فتعدّلها من غير ما تلمس اللوب، وممكن بعدين تقراها من ملف JSON.

[[break]] جوه الـ foreach الداخلي بيخرج منه بس، مش من اللوب الخارجي. والـ [[if]] اللي على سطر واحد فيه أمرين مفصولين بـ [[;]].

الفلتر [[-File]] مهم: من غيره الفولدرات اللي السكربت لسه عاملها (Images و Documents) هتتنقل جوه Other في التشغيلة الجاية.

الاسم المكرر: [[Test-Path $dest]] لو الاسم موجود، يجرّب [[name (1).ext]] وبعدين [[(2)]] لحد ما يلاقي اسم فاضي. و [[$file.Extension]] بيرجع الامتداد بالنقطة زي ما هو، فالملف [[b.PNG]] بيفضل PNG.

مع [[-WhatIf]]: الفولدرات مش بتتعمل فعلًا، فـ Test-Path بيرجع False كل مرة، وهتشوف «Create Directory» مكرر لنفس الفولدر. ده طبيعي في التجربة.

ملفات بتتحمّل دلوقتي ([[.crdownload]] في Chrome و [[.part]] في Firefox) هتروح Other؛ ممكن تستثنيها بـ [[Where-Object Extension -notin ".crdownload", ".part", ".tmp"]].`,
            when: "Downloads و Desktop وأي فولدر بيتراكم فيه كل حاجة. وكمان كقالب لأي سكربت «وزّع الملفات حسب قاعدة».",
            mistakes: R`تشغّله على فولدر مشروع بالغلط فيبعتر ملفات الكود (عشان كده [[-WhatIf]]). أو تنسى [[-File]]. أو تستخدم [[Move-Item -Force]] بدل لوب الأسامي فتكتب فوق ملفات بنفس الاسم من غير ما تعرف.`
          },
          lines: [
            "advanced script عشان [[-WhatIf]].",
            "الـ parameters.",
            "الفولدر، والافتراضي Downloads بتاعتك.",
            "قفلة.",
            "اسم كل فولدر والامتدادات اللي بتروحله...",
            "...الصور...",
            "...المستندات...",
            "...الملفات المضغوطة...",
            "...برامج التسطيب.",
            "قفلة.",
            "لكل ملف (مش فولدر) في المكان ده...",
            "...الافتراضي Other...",
            "...دوّر في المجموعات...",
            "...لو الامتداد في المجموعة دي، خد اسمها واخرج من اللوب ده.",
            "...قفلة.",
            "...مسار فولدر المجموعة...",
            "...اعمله لو مش موجود.",
            "...المسار اللي الملف هيروحله...",
            "...عدّاد للأسامي المكررة...",
            "...طول ما فيه ملف بنفس الاسم...",
            "...جرّب الاسم مع (1) أو (2)...",
            "...وزوّد.",
            "...قفلة.",
            "...انقل الملف.",
            "قفلة."
          ],
          sol: R`جربته على الفولدر ده بالظبط. مع [[-WhatIf]] طلع سطر [[Create Directory]] و [[Move File]] لكل ملف، وآخرهم [[Destination: ...\Images\g (1).jpg]] لأن g.jpg موجود في Images. وبعد التشغيل الحقيقي [[Get-ChildItem -Recurse -Name]] طلع: [[Archives\c.zip]] و [[Documents\a.pdf]] و [[Images\b.PNG]] و [[Images\g.jpg]] (القديم) و [[Images\g (1).jpg]] (الجديد) و [[Installers\d.exe]] و [[Other\e.xyz]].

لو شغلته تاني مش هيحصل حاجة، لأن مفيش ملفات بره الفولدرات. ولو الملف مفتوح في برنامج (PDF مفتوح مثلًا) Move-Item هيطلع error للملف ده بس ويكمّل الباقي.`
        },
        {
          cmd: "clean-old-files.ps1",
          title: "امسح الملفات الأقدم من N يوم (بـ -WhatIf الأول)",
          desc: R`سكربت بيمسح الملفات اللي آخر تعديل عليها أقدم من عدد أيام، في فولدر وكل اللي تحته، بنوع معين ([[*.log]] افتراضيًا). مفيد للوجات والـ temp وفولدرات الباك أب. ده المقابل لـ [[find /path -name "*.log" -mtime +14 -delete]] في bash.

[[(Get-Date).AddDays(-$Days)]] بيحسب «النهارده ناقص كذا يوم»، وأي ملف [[LastWriteTime]] بتاعه قبل التاريخ ده بيتمسح. و [[-Filter $Filter]] بيحدد النوع، و [[-Recurse]] بيدخل الفولدرات الفرعية. وقبل المسح السكربت بيطبع عدد الملفات وحجمها بالميجا ([[Measure-Object Length -Sum]])، فتعرف هتوفّر قد إيه.

[[$Path]] إجباري ([[Mandatory]]) ومن غير قيمة افتراضية، عن قصد: سكربت بيمسح مينفعش يشتغل على «الفولدر الحالي» بالغلط. و [[Remove-Item -Verbose]] بيطبع اسم كل ملف بيتمسح. والأهم: [[SupportsShouldProcess]] بيخلي [[-WhatIf]] يوصل لـ Remove-Item، فالتشغيلة الأولى دايمًا [[.\clean-old-files.ps1 -Path C:\logs -Days 30 -WhatIf]].`,
          example: R`[CmdletBinding(SupportsShouldProcess)]
param(
    [Parameter(Mandatory)]
    [string]$Path,
    [int]$Days = 14,
    [string]$Filter = "*.log"
)

$cutoff = (Get-Date).AddDays(-$Days)
$old = Get-ChildItem $Path -Filter $Filter -File -Recurse |
    Where-Object LastWriteTime -lt $cutoff

$mb = [math]::Round(($old | Measure-Object Length -Sum).Sum / 1MB, 2)
Write-Host "$($old.Count) files older than $Days days ($mb MB)"
$old | Remove-Item -Verbose`,
          try: R`اعمل فولدر فيه [[new.log]] و [[old1.log]] و [[sub\old2.log]] و [[keep.txt]]، وخلّي تاريخ old1 و old2 و keep.txt قديم بـ [[(Get-Item old1.log).LastWriteTime = (Get-Date).AddDays(-20)]]. شغّله بـ [[-WhatIf]]، وبعدين من غيرها، وبعدين تاني.`,
          flag: "script",
          deep: {
            why: "اللوجات والملفات المؤقتة وفولدرات الباك أب بتكبر لحد ما الديسك يتملي في يوم وكل حاجة توقف. سكربت تنضيف بيشتغل كل يوم من Task Scheduler بيمنع ده. بس سكربت مسح غلطة واحدة فيه بتمسح حاجات مهمة، عشان كده مبني بحواجز: Path إجباري، و Filter، و WhatIf.",
            how: R`[[LastWriteTime]] آخر تعديل، وده الأنسب للوجات. فيه كمان [[CreationTime]] (وقت ما الملف اتعمل على الجهاز ده، وبيتغيّر لو اتنسخ) و [[LastAccessTime]] (ويندوز غالبًا مش بيحدّثه).

[[-Filter]] أسرع من [[Where-Object Name -like]] لأن الفلترة بتحصل في نظام الملفات نفسه. ولو محتاج كذا نوع: شيل [[-Filter]] وحط [[-Include *.log, *.tmp]] (بيشتغل مع [[-Recurse]]).

الحجم: [[Measure-Object]] على لستة فاضية بيرجع Sum فاضي، و [[$null / 1MB]] بتطلع 0، فمفيش error لو مفيش ملفات. و [[$old | Remove-Item]] على لستة فاضية مش بيعمل حاجة.

الـ [[-Verbose]] مكتوبة على Remove-Item نفسه: في تجربتي، [[-Verbose]] على السكربت مخلّاش Remove-Item يطبع أسامي الملفات، لازم تتكتب عليه هو.

الفولدرات الفاضية اللي بتفضل بعد المسح: [[Get-ChildItem $Path -Directory -Recurse | Where-Object { -not (Get-ChildItem $_.FullName -Force) } | Remove-Item]]، وده يتعمل بحذر برضه.

في Task Scheduler: اكتب الـ arguments كاملة ومن غير [[-WhatIf]]، بعد ما جربته بإيدك.`,
            when: "لوجات تطبيق، فولدر backups (احتفظ بآخر ٣٠ يوم)، فولدرات temp لبرامج بتسيب ملفات، Downloads القديمة.",
            mistakes: R`تشغّله بـ [[-Path]] غلط أو فاضي. أو تنسى [[-Filter]] وتسيب الافتراضي [[*]] على فولدر فيه حاجات مهمة. أو تستخدم [[-Days 0]] وانت فاكره «ولا حاجة» وهو معناه «كل حاجة اتعدلت قبل دلوقتي». أو تحطه في Task Scheduler قبل ما تجربه بـ [[-WhatIf]] على الفولدر الحقيقي.`
          },
          lines: [
            "advanced script عشان [[-WhatIf]] يوصل لـ Remove-Item.",
            "الـ parameters.",
            "إجباري ومن غير افتراضي: الفولدر لازم يتكتب صريح.",
            "الفولدر.",
            "عدد الأيام، والافتراضي 14.",
            "نوع الملفات، والافتراضي logs.",
            "قفلة.",
            "التاريخ الفاصل: النهارده ناقص Days.",
            "هات الملفات من النوع ده في كل الفولدرات...",
            "...اللي آخر تعديل عليها قبل التاريخ الفاصل.",
            "مجموع أحجامهم بالميجا.",
            "اطبع العدد والحجم قبل أي مسح.",
            "امسحهم، واطبع اسم كل واحد."
          ],
          sol: R`جربته بالظبط كده: [[-WhatIf]] طبع [[2 files older than 14 days (0 MB)]] وبعدين [[What if: Performing the operation "Remove File" on target "...\old1.log".]] ونفس السطر لـ [[sub\old2.log]]، والملفات لسه موجودة. من غير WhatIf طبع نفس الملخص وبعدين [[VERBOSE: Performing the operation "Remove File" on target ...]] للملفين، وفضل [[new.log]] (جديد) و [[keep.txt]] (قديم بس مش log). والتشغيلة التالتة طبعت [[0 files older than 14 days (0 MB)]] من غير error.

لو شغلته من غير [[-Path]] هيسألك عليه، ولو التشغيل non-interactive (Task Scheduler) هيفشل برسالة missing mandatory parameters بدل ما يمسح في المكان الغلط، وده المطلوب.`,
          solCode: R`# شغّله من الفولدر اللي فيه clean-old-files.ps1
New-Item -ItemType Directory cleanup-test\sub -Force | Out-Null
Set-Location cleanup-test
"x" | Set-Content new.log, old1.log, sub\old2.log, keep.txt
foreach ($f in "old1.log", "sub\old2.log", "keep.txt") {
    (Get-Item $f).LastWriteTime = (Get-Date).AddDays(-20)
}
..\clean-old-files.ps1 -Path . -WhatIf
..\clean-old-files.ps1 -Path .`
        },
        {
          cmd: "disk-report.ps1",
          title: "تقرير مساحة الديسكات مع تحذير",
          desc: R`سكربت بيطلع لكل درايف (C: و D: ...) المساحة الكلية والفاضية بالجيجا ونسبة الفاضي، ويعرضهم جدول، ويحفظهم CSV، ويطلع تحذير لأي درايف الفاضي فيه أقل من نسبة معينة.

[[Get-PSDrive -PSProvider FileSystem]] بيجيب الدرايفات اللي فيها ملفات (من غير Env: و HKCU: وغيرهم)، وكل واحد فيه [[Used]] و [[Free]] بالبايت. الفلتر بيشيل [[Temp]] (درايف بيعمله PowerShell 7 لفولدر الـ TEMP، مش ديسك حقيقي) وأي درايف حجمه صفر (زي DVD فاضي). وجوه [[ForEach-Object]] بنعمل [[[PSCustomObject]]] لكل درايف بالأرقام بعد ما نحوّلها جيجا بـ [[/ 1GB]] ونقرّبها بـ [[[math]::Round]].

[[$report | Format-Table -AutoSize]] للعرض بس، و [[Export-Csv]] على [[$report]] نفسه (مش على ناتج Format-Table، درس Export-Csv). وفي الآخر [[Write-Warning]] بالأصفر لكل درايف تحت [[-WarnPercent]] (افتراضيًا 15%). المقابل في لينكس [[df -h]].`,
          example: R`param(
    [int]$WarnPercent = 15,
    [string]$CsvPath = (Join-Path $PSScriptRoot "disk-report.csv")
)

$report = Get-PSDrive -PSProvider FileSystem |
    Where-Object { $_.Name -ne "Temp" -and ($_.Used + $_.Free) -gt 0 } |
    ForEach-Object {
        $total = $_.Used + $_.Free
        [PSCustomObject]@{
            Drive   = $_.Name
            TotalGB = [math]::Round($total / 1GB, 1)
            FreeGB  = [math]::Round($_.Free / 1GB, 1)
            FreePct = [math]::Round($_.Free / $total * 100)
        }
    }

$report | Format-Table -AutoSize
$report | Export-Csv $CsvPath -NoTypeInformation
foreach ($d in $report | Where-Object FreePct -lt $WarnPercent) {
    Write-Warning "Drive $($d.Drive) has only $($d.FreePct)% free"
}`,
          try: R`شغّله بـ [[-WarnPercent 50]] عشان تشوف التحذير، وافتح disk-report.csv. وبعدين زوّد عمود UsedGB.`,
          flag: "script",
          deep: {
            why: "الديسك بيتملي بالراحة لحد ما في يوم Docker أو Windows Update أو الـ build يفشل برسالة مش واضحة. تقرير بيشتغل كل يوم ويحذرك تحت ١٥٪ بيوفّر عليك اليوم ده، ونفس السكربت بيشتغل على سيرفرات ويندوز.",
            how: R`ليه [[Get-PSDrive]] ومش [[Get-Volume]] أو [[Get-CimInstance Win32_LogicalDisk]]؟ الاتنين دول ويندوز بس، و Get-PSDrive شغال في 5.1 و 7 وعلى لينكس كمان (جربت السكربت هنا وطلع درايف [[/]]). لو محتاج تفاصيل زي نوع الديسك أو اسم الـ volume: [[Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3"]] بيرجع الديسكات المحلية بس، وفيه [[Size]] و [[FreeSpace]] و [[VolumeName]].

[[Used]] بيبقى فاضي ([[$null]]) لدرايفات زي DVD من غير CD أو درايف شبكة مش متوصل، و [[$null + $null]] بيطلع [[$null]] و [[$null -gt 0]] False، فالفلتر بيشيلهم.

[[$_.Free / $total * 100]] النسبة، و [[[math]::Round(x)]] من غير رقم تاني بيقرّب لأقرب رقم صحيح.

الـ CSV الأرقام فيه بنقطة عشرية دايمًا. والجدول على الشاشة ممكن يعرض أرقام عشرية زيادة حسب نسخة PowerShell، ده عرض بس.

عشان يشتغل كل يوم: Register-ScheduledTask (درس لوحده)، ومع [[Start-Transcript]] أو بعت التحذير في إيميل أو webhook بـ [[Invoke-RestMethod]].`,
            when: "جهازك الشخصي قبل ما تسطّب حاجة تقيلة، أو أي سيرفر ويندوز بيشتغل لوحده.",
            mistakes: R`تعمل [[Format-Table]] قبل [[Export-Csv]] فالـ CSV يطلع كلام غريب. أو تقسم على 1000 بدل [[1GB]] (اللي هو 1024 أس 3) فالأرقام متطابقش Explorer. أو تنسى فلتر الدرايفات اللي حجمها صفر فيطلع error قسمة على صفر.`
          },
          lines: [
            "الـ parameters.",
            "نسبة التحذير، والافتراضي 15%.",
            "مكان ملف CSV، جنب السكربت.",
            "قفلة.",
            "هات الدرايفات اللي فيها ملفات...",
            "...من غير Temp ومن غير اللي حجمها صفر...",
            "...ولكل واحد...",
            "...الحجم الكلي = المستخدم + الفاضي...",
            "...اعمل صف...",
            "...اسم الدرايف...",
            "...الكلي بالجيجا...",
            "...الفاضي بالجيجا...",
            "...نسبة الفاضي...",
            "...قفلة الصف...",
            "...قفلة اللوب.",
            "اعرض جدول.",
            "احفظ CSV.",
            "لكل درايف الفاضي فيه أقل من النسبة...",
            "...طلّع تحذير بالأصفر.",
            "قفلة."
          ],
          sol: R`جربته على لينكس بـ [[-WarnPercent 50]]: الجدول طلع درايف واحد [[/]] (على ويندوز هتشوف C و D) بـ TotalGB و FreeGB و FreePct، وتحته [[WARNING: Drive / has only 30% free]]. والـ CSV فيه [["Drive","TotalGB","FreeGB","FreePct"]] و [["/","232.6","69","30"]]. من غير [[-WarnPercent]] مفيش تحذير لأن 30 أكبر من 15.

UsedGB: زوّد سطر [[UsedGB = [math]::Round($_.Used / 1GB, 1)]] جوه الـ PSCustomObject. ولو عايزه في نص الأعمدة حطه في المكان ده بالظبط، لأن PSCustomObject بيحافظ على الترتيب.`
        },
        {
          cmd: "check-site.ps1",
          title: "اتأكد إن موقعك و البورتات شغالين",
          desc: R`سكربت بيجرّب لستة لينكات ولستة بورتات، ويطبع UP أو DOWN لكل واحد، ويخرج بـ [[exit 1]] لو أي حاجة واقعة، فتقدر تحطه في Task Scheduler أو CI.

للينكات: [[Invoke-WebRequest $url -TimeoutSec 5]] بيطلب الصفحة ويستنى ٥ ثواني بالكتير. لو الرد 200 أو أي نجاح بيكمّل، ولو 404 أو 500 أو مفيش اتصال بيرمي error فيروح للـ catch، وهناك [[$_.Exception.Response.StatusCode.value__]] رقم الـ status لو فيه رد أصلًا. و [[-UseBasicParsing]] لازمة في 5.1 بس (بتمنع تحذير أمان بيوقف السكربت) ومش بتضر في 7. و [[[System.Diagnostics.Stopwatch]::StartNew()]] ساعة إيقاف من .NET بتقيس وقت الرد بالملّي ثانية.

للبورتات: كل عنصر بالشكل [[host:port]]، و [[$hostName, $port = $target -split ':']] بيقطّعه ويحط الجزئين في متغيرين مرة واحدة. والفانكشن [[Test-Port]] بتستخدم [[Test-NetConnection]] لو موجود (ويندوز)، وإلا [[Test-Connection -TcpPort]] (PowerShell 7 على أي نظام). خلي بالك: اللستة بتتبعت [[-Urls a, b]] من جوه PowerShell، لكن من [[pwsh -File]] الفواصل مش بتعمل array (درس param()).`,
          example: R`param(
    $Urls = @("https://example.com", "http://localhost:3000/health"),
    $Ports = @("localhost:5432"),
    [int]$TimeoutSec = 5
)

function Test-Port([string]$HostName, [int]$Port) {
    if (Get-Command Test-NetConnection -ErrorAction SilentlyContinue) {
        Test-NetConnection $HostName -Port $Port -InformationLevel Quiet -WarningAction SilentlyContinue
    } else {
        Test-Connection $HostName -TcpPort $Port -Quiet -TimeoutSeconds 2
    }
}

$down = 0
foreach ($url in $Urls) {
    $sw = [System.Diagnostics.Stopwatch]::StartNew()
    try {
        $res = Invoke-WebRequest $url -TimeoutSec $TimeoutSec -UseBasicParsing
        "UP    {0}  {1}  {2} ms" -f $res.StatusCode, $url, $sw.ElapsedMilliseconds
    } catch {
        $down++
        $code = $_.Exception.Response.StatusCode.value__
        Write-Host ("DOWN  {0}  {1}  {2}" -f $code, $url, $_.Exception.Message) -ForegroundColor Red
    }
}
foreach ($target in $Ports) {
    $hostName, $port = $target -split ':'
    if (Test-Port $hostName $port) { "UP    port $target" }
    else { $down++; Write-Host "DOWN  port $target" -ForegroundColor Red }
}
if ($down -gt 0) { exit 1 }`,
          try: R`شغّل سيرفر محلي ([[npx http-server -p 3000]] أو [[python -m http.server 3000]])، وشغّل السكربت بـ [[-Urls http://localhost:3000/, http://localhost:3000/missing -Ports localhost:3000, localhost:9]]، واطبع [[$LASTEXITCODE]].`,
          flag: "script",
          deep: {
            why: "الموقع وقع الساعة ٢ بالليل وعرفت من عميل الصبح. أو بعد ديبلوي عايز تتأكد إن كل الصفحات المهمة بترد 200 وإن قاعدة البيانات سامعة. سكربت صغير بيعمل الفحص ده في ثانية، و exit code بيخلي أي أداة تانية تعرف النتيجة.",
            how: R`[[Invoke-WebRequest]] بيعتبر أي status من 400 وطالع error. في PowerShell 7 فيه [[-SkipHttpErrorCheck]] لو عايز تاخد الرد عادي وتفحص [[StatusCode]] بنفسك.

[[$_.Exception.Response]] موجود بس لو السيرفر رد فعلًا. لو مفيش اتصال خالص (DNS أو connection refused أو timeout) بيبقى فاضي، فالـ code بيطلع فاضي والرسالة بتقول السبب.

الـ parameters هنا من غير نوع عشان تقبل لينك واحد أو لستة. الأدق تكتب قبلهم النوع [[string[]]] بين أقواس مربعة (لستة نصوص)، وساعتها لينك واحد بيتحوّل لستة فيها عنصر.

[[value__]] (بشرطتين) بيحوّل الـ enum بتاع الـ status (زي NotFound) لرقمه (404).

[[-TimeoutSec]] مهم: من غيره الطلب ممكن يستنى دقيقة ونص على سيرفر مش بيرد.

TLS في 5.1: على ويندوز قديم ممكن [[Invoke-WebRequest]] يفشل مع مواقع HTTPS برسالة «Could not create SSL/TLS secure channel». الحل في أول السكربت: [[[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12]]. في 7 مش محتاجه.

[[$hostName, $port = ...]] اسمها multiple assignment: أول عنصر في الأول والباقي في التاني. ومتسميش المتغير [[$host]]، ده متغير محجوز في PowerShell.

[[Test-NetConnection]] على ويندوز بطيء شوية (بيعمل ping قبل البورت). و [[Test-Connection -TcpPort]] في 7 أسرع وفيه [[-TimeoutSeconds]].

للمراقبة الدايمة: Task Scheduler كل ٥ دقايق، ولو [[$down]] أكبر من صفر ابعت رسالة لـ Slack أو Telegram بـ [[Invoke-RestMethod -Method Post]] على webhook.`,
            when: "بعد كل ديبلوي، أو كفحص دوري للمواقع، أو قبل ما تبدأ شغل تتأكد إن قاعدة البيانات و Redis شغالين.",
            mistakes: R`تسمّي المتغير [[$host]] فيطلع error إنه read-only. أو تنسى [[-TimeoutSec]] فالسكربت يعلّق. أو تقيس الوقت من غير ما تفتكر إن أول طلب أبطأ (DNS واتصال جديد). أو تخرج بـ 0 دايمًا فـ Task Scheduler يقولك كله تمام.`
          },
          lines: [
            "الـ parameters.",
            "لستة لينكات، والافتراضي array فيها لينكين.",
            "لستة بورتات بالشكل host:port.",
            "أقصى وقت استنى لكل لينك.",
            "قفلة.",
            "فانكشن بتجرّب بورت...",
            "...لو Test-NetConnection موجود (ويندوز)...",
            "...استخدمه، والناتج True أو False بس، ومن غير تحذيرات.",
            "...وإلا (PowerShell 7 على أي نظام)...",
            "...استخدم Test-Connection بالبورت.",
            "...قفلة.",
            "قفلة الفانكشن.",
            "عدّاد الحاجات الواقعة.",
            "لكل لينك...",
            "...شغّل ساعة إيقاف.",
            "...جرّب...",
            "...اطلب الصفحة بحد أقصى للوقت.",
            "...اطبع UP والـ status واللينك والوقت.",
            "...لو فشل...",
            "...زوّد العدّاد...",
            "...رقم الـ status لو السيرفر رد (فاضي لو مفيش اتصال)...",
            "...اطبع DOWN والسبب بالأحمر.",
            "...قفلة.",
            "قفلة اللوب.",
            "لكل بورت...",
            "...قطّعه عند : لاسم الجهاز والرقم.",
            "...لو مفتوح اطبع UP...",
            "...وإلا زوّد العدّاد واطبع DOWN.",
            "قفلة.",
            "لو فيه حاجة واقعة، اخرج بـ 1."
          ],
          sol: R`جربته بسيرفر Python على بورت محلي: [[UP    200  http://127.0.0.1:8765/  288 ms]]، و [[DOWN  404  http://127.0.0.1:8765/missing  Response status code does not indicate success: 404 (File not found).]] بالأحمر، و [[UP    port 127.0.0.1:8765]]، و [[DOWN  port 127.0.0.1:9]]، و [[$LASTEXITCODE]] بعدها [[1]]. ولينك على بورت مقفول طلع [[DOWN]] من غير رقم وبعده [[Connection refused]].

الرسايل دي من PowerShell 7 على لينكس، وفي 5.1 على ويندوز نص الـ error مختلف (زي [[The remote server returned an error: (404) Not Found.]]) بس الأرقام والنتيجة نفسها. ولما جربت [[pwsh -File .\check-site.ps1 -Urls a, b]] من bash طلع error تحويل غريب، لأن الفواصل مش بتعمل array في [[-File]].`
        },
        {
          cmd: "zip-folders.ps1",
          title: "اضغط كل فولدر في zip لوحده بالتاريخ",
          desc: R`سكربت بياخد فولدر فيه مشاريع أو أقسام، ويعمل لكل فولدر فرعي zip لوحده باسمه وتاريخ النهارده ([[shop_2026-10-01.zip]])، في فولدر واحد. مفيد للأرشفة أو قبل ما تمسح مشاريع قديمة أو تبعتها.

[[Get-ChildItem $Source -Directory]] الفولدرات اللي في أول مستوى بس. وقبل الضغط بيتأكد إن الفولدر فيه ملف واحد على الأقل: [[Get-ChildItem -Recurse -File | Select-Object -First 1]] بيقف أول ما يلاقي ملف (سريع حتى مع فولدر كبير)، ولو مفيش، [[continue]] بيعدّي للفولدر اللي بعده، لأن Compress-Archive بيطلع error على فولدر فاضي.

[[Join-Path $dir.FullName "*"]] يعني «اللي جوه الفولدر» فالـ zip ميبقاش جواه فولدر زيادة (درس Compress-Archive)، و [[-Force]] يكتب فوق zip النهارده لو شغلته مرتين. وبعد كل zip بيطبع حجمه بالكيلو. و [[$ErrorActionPreference = "Stop"]] يوقف لو حاجة فشلت بدل ما يطبع OK كذب.`,
          example: R`param(
    [Parameter(Mandatory)]
    [string]$Source,
    [string]$Dest = (Join-Path $HOME "zips")
)

$ErrorActionPreference = "Stop"
New-Item -ItemType Directory $Dest -Force | Out-Null
$stamp = Get-Date -Format "yyyy-MM-dd"

foreach ($dir in Get-ChildItem $Source -Directory) {
    if (-not (Get-ChildItem $dir.FullName -Recurse -File | Select-Object -First 1)) {
        Write-Host "SKIP  $($dir.Name) (empty)" -ForegroundColor Yellow
        continue
    }
    $zip = Join-Path $Dest "$($dir.Name)_$stamp.zip"
    Compress-Archive -Path (Join-Path $dir.FullName "*") -DestinationPath $zip -Force
    $kb = [math]::Round((Get-Item $zip).Length / 1KB, 1)
    Write-Host "OK    $($dir.Name) -> $zip ($kb KB)"
}`,
          try: R`اعمل فولدر projects فيه shop و blog (فيهم ملفات) و empty (فاضي)، وشغّله بـ [[-Source .\projects -Dest .\out]]، وافتح واحد من الـ zips واتأكد إن الملفات على طول جواه.`,
          flag: "script",
          deep: {
            why: "فولدر مشاريع قديمة واخد ٣٠ جيجا، أو تسليم لعميل لكل جزء ملف لوحده، أو أرشيف شهري. ضغطهم واحد واحد بالماوس ممل وبيغلط، والسكربت بيعملهم كلهم بنفس التسمية.",
            how: R`توثيق Compress-Archive بيقول إن الحد الأقصى ٢ جيجا للملف، بسبب الـ API بتاع .NET اللي تحته. لو عندك ملفات أكبر، أو عايز أسرع بكتير، استخدم [[tar -a -cf name.zip -C folder .]] (موجود في ويندوز 10 و 11) أو 7-Zip.

الملفات المخفية: التوثيق بيقول إن Compress-Archive بيتجاهل الملفات والفولدرات المخفية (زي [[.git]] على ويندوز، وأي اسم بيبدأ بنقطة على لينكس والماك). لو مهمة، استخدم tar.

[[node_modules]] جوه مشروع هتخلي الـ zip ضخم وبطيء. ممكن تبني اللستة بنفسك: [[Get-ChildItem $dir.FullName -Exclude node_modules | Compress-Archive -DestinationPath $zip -Force]] (الـ Exclude بيشتغل على أول مستوى بس، وده كفاية هنا، وجربتها فالـ zip طلع من غير node_modules).

[[continue]] بيروح للّفة اللي بعدها، و [[break]] كان هيخرج من اللوب كله.

ولو عايز تمسح الفولدر بعد ما تتأكد إن الـ zip اتعمل، اعمل ده بـ [[-WhatIf]] الأول، وبعد ما تفتح zip واحد على الأقل.`,
            when: "أرشفة مشاريع قديمة، تسليمات، باك أب شهري لفولدرات منفصلة، تجهيز ملفات للرفع.",
            mistakes: R`تنسى [[\*]] فكل zip جواه فولدر بنفس الاسم. أو تضغط على نفس الدرايف اللي هتمسح منه وتفتكر ده باك أب. أو تمسح الأصل قبل ما تفتح الـ zip وتتأكد إنه سليم. أو تعتمد على [[-Force]] وتكتب فوق zip النهارده وانت كنت محتاج النسختين.`
          },
          lines: [
            "الـ parameters.",
            "إجباري.",
            "الفولدر اللي فيه الفولدرات اللي هتتضغط.",
            "مكان الـ zips، والافتراضي zips في فولدرك.",
            "قفلة.",
            "أي error يوقف.",
            "اعمل فولدر الـ zips لو مش موجود.",
            "تاريخ النهارده للأسامي.",
            "لكل فولدر فرعي...",
            "...لو مفيهوش ولا ملف (أول ملف بيكفي)...",
            "...اطبع SKIP بالأصفر...",
            "...وعدّي للّي بعده.",
            "...قفلة.",
            "...اسم الـ zip: اسم الفولدر والتاريخ.",
            "...اضغط محتوى الفولدر، واكتب فوق لو موجود.",
            "...الحجم بالكيلو.",
            "...اطبع النتيجة.",
            "قفلة."
          ],
          sol: R`جربته بالظبط كده: طبع [[OK    blog -> .\out\blog_2026-10-01.zip (0.1 KB)]] و [[SKIP  empty (empty)]] بالأصفر و [[OK    shop -> ...shop_2026-10-01.zip (0.1 KB)]]، وفولدر out فيه zipين. ولما فتحت blog.zip كان جواه [[posts\b.md]] على طول من غير فولدر blog فوقه.

لو شغلته تاني في نفس اليوم، [[-Force]] بيكتب فوق الـ zips. ولو شلت [[-Force]] هيطلع error إن الملف موجود، ومع [[$ErrorActionPreference = "Stop"]] السكربت هيقف عند أول واحد.`
        },
        {
          cmd: "new-project.ps1",
          title: "ابدأ مشروع جديد بأمر واحد",
          desc: R`كل مشروع جديد بيبدأ بنفس الخطوات: فولدر، src، README، .gitignore، .env.example، npm init، git init، أول commit، وتفتحه في VS Code. السكربت ده بيعملهم كلهم: [[.\new-project.ps1 -Name my-shop]].

الـ parameters: [[[ValidatePattern('^[a-z0-9-]+$')]]] بيرفض أي اسم فيه مسافات أو رموز (اسم الفولدر هيبقى اسم الباكدج)، و [[[ValidateSet("node", "static")]]] نوع المشروع، و [[$Root]] المكان. وبعدين: لو الفولدر موجود [[throw]] يوقف بدل ما يكتب فوق مشروع موجود، و [[New-Item ... -Force]] يعمل الفولدر و src مع بعض، و [[Set-Location]] يدخله.

الملفات بتتكتب بـ [[Set-Content -Encoding utf8]]، و .gitignore بـ here-string على كذا سطر. و [[if ($Type -eq "node")]] بيشغّل [[npm init -y]] (يعمل package.json بالقيم الافتراضية) ويفحص [[$LASTEXITCODE]] لأن npm برنامج خارجي (درس $LASTEXITCODE)، والـ static بياخد index.html. وفي الآخر git init و add و commit، ولو [[code]] موجود يفتح المشروع. خلي بالك: Set-Location بيسيب الترمنال جوه فولدر المشروع الجديد بعد ما السكربت يخلص، وده هنا مقصود.`,
          example: R`param(
    [Parameter(Mandatory)]
    [ValidatePattern('^[a-z0-9-]+$')]
    [string]$Name,

    [ValidateSet("node", "static")]
    [string]$Type = "node",

    [string]$Root = (Join-Path $HOME "projects")
)

$ErrorActionPreference = "Stop"
$dir = Join-Path $Root $Name
if (Test-Path $dir) { throw "Folder already exists: $dir" }

New-Item -ItemType Directory (Join-Path $dir "src") -Force | Out-Null
Set-Location $dir

Set-Content README.md "# $Name" -Encoding utf8
Set-Content .gitignore @"
node_modules/
dist/
.env
"@ -Encoding utf8
Set-Content .env.example "PORT=3000" -Encoding utf8

if ($Type -eq "node") {
    npm init -y | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "npm init failed" }
    Set-Content src\index.js 'console.log("hello")' -Encoding utf8
} else {
    Set-Content src\index.html "<h1>$Name</h1>" -Encoding utf8
}

git init -q
git add -A
git commit -q -m "chore: initial project structure"
if ($LASTEXITCODE -ne 0) { throw "git commit failed (is user.name/user.email set?)" }

Write-Host "Created $dir" -ForegroundColor Green
if (Get-Command code -ErrorAction SilentlyContinue) { code . }`,
          try: R`شغّله بـ [[-Name my-shop -Root .]] في فولدر تجربة، وبعدين بـ [[-Name "My Shop"]]، وبعدين بنفس الاسم تاني، وبعدين [[-Name site -Type static]]. وبعدين زوّد ملف .editorconfig.`,
          flag: "script",
          deep: {
            why: "كل مرة تبدأ مشروع بتنسى حاجة: .gitignore قبل أول commit فـ node_modules تدخل git، أو .env.example، أو README. سكربت bootstrap بيخلي كل مشاريعك بادية بنفس الشكل الصح، وبيوفّر الـ ١٠ دقايق دول كل مرة.",
            how: R`[[ValidatePattern]] مش بيفرّق بين الكابيتال والسمول افتراضيًا (جربت [[MyShop]] وعدّت). لو عايز حروف صغيرة بس اكتبها [[(?-i)^[a-z0-9-]+$]] جوه الـ pattern. والمسافة مرفوضة في الحالتين.

الـ here-string متبعت كـ argument تاني لـ Set-Content، و [[-Encoding]] بعده عادي. وخلي بالك إن [["@]] لازم في أول السطر.

[[npm init -y | Out-Null]] بيخفي الـ package.json اللي npm بيطبعه. و npm على ويندوز ملف npm.cmd أو npm.ps1، فلو الـ ExecutionPolicy مانعة npm.ps1 هيفشل (درس try / catch فيه الحل).

الـ git commit محتاج [[user.name]] و [[user.email]] متظبطين (تاب Git). لو مش متظبطين git بيرجع exit code غير صفر، والسطر اللي بعده بيوقف برسالة بتقول السبب.

[[$ErrorActionPreference = "Stop"]] بيوقف على أخطاء الـ cmdlets بس، عشان كده الفحص اليدوي بعد npm و git.

توسيعه: [[-Type react]] يشغّل [[npm create vite@latest . -- --template react]]، أو يعمل repo على GitHub بـ [[gh repo create $Name --private --source . --push]] لو gh متسطب.`,
            when: "كل مشروع جديد، أو تمرين، أو تجربة سريعة. وكمان في الفرق: نفس السكربت يخلّي كل الناس تبدأ بنفس الهيكل.",
            mistakes: R`تعمل git commit قبل .gitignore فـ node_modules أو .env تدخل التاريخ. أو تنسى فحص [[$LASTEXITCODE]] بعد npm و git وتفتكر Stop كفاية. أو تشيل فحص [[Test-Path $dir]] فتكتب فوق مشروع موجود. أو تستخدم [[Set-Location]] في سكربت هيتنادى من سكربت تاني، فالتاني يلاقي نفسه في فولدر غريب ([[Push-Location]] و [[Pop-Location]] أحسن هناك).`
          },
          lines: [
            "الـ parameters.",
            "الاسم إجباري...",
            "...حروف وأرقام وشرطة بس...",
            "...اسم المشروع.",
            "النوع node أو static بس...",
            "...والافتراضي node.",
            "المكان، والافتراضي projects في فولدرك.",
            "قفلة.",
            "أي error من cmdlet يوقف.",
            "مسار المشروع.",
            "لو موجود، وقّف برسالة واضحة.",
            "اعمل الفولدر و src جواه مرة واحدة.",
            "ادخله.",
            "README بعنوان المشروع.",
            ".gitignore بـ here-string...",
            "...سطر...",
            "...سطر...",
            "...سطر...",
            "...قفلة النص و UTF-8.",
            "مثال للمتغيرات من غير قيم حقيقية.",
            "لو node...",
            "...package.json بالقيم الافتراضية، والناتج مخفي.",
            "...npm برنامج خارجي، فافحص الـ exit code.",
            "...ملف بداية.",
            "وإلا (static)...",
            "...صفحة HTML.",
            "قفلة.",
            "git جديد من غير رسايل.",
            "ضيف كل الملفات.",
            "أول commit.",
            "لو فشل، وقّف وقول السبب المحتمل.",
            "اطبع النجاح بالأخضر.",
            "لو VS Code موجود افتحه هنا."
          ],
          sol: R`جربته على PowerShell 7 (من غير سطر [[code .]]): [[-Name my-shop -Root .]] طبع [[Created .\my-shop]] بالأخضر، والفولدر فيه [[.git]] و [[src]] و [[.env.example]] و [[.gitignore]] و [[package.json]] و [[README.md]]، و [[git log --oneline]] فيه commit واحد [[chore: initial project structure]].

[[-Name "My Shop"]] طلع [[Cannot validate argument on parameter 'Name'. The argument "My Shop" does not match the "^[a-z0-9-]+$" pattern.]] قبل ما أي حاجة تتعمل. ونفس الاسم تاني طلع [[Folder already exists: ...my-shop]]. و [[-Type static]] عمل [[src\index.html]] من غير package.json. والـ .editorconfig: سطر [[Set-Content]] زيادة بـ here-string فيه [[root = true]] وقواعد المسافات، قبل [[git add]].`
        }
      ]
    }
  ]
});
