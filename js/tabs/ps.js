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
          desc: "ويندوز جاي بـ Windows PowerShell 5.1 القديم (الأزرق). PowerShell 7 وأمره [[pwsh]] أسرع، و UTF-8 افتراضي فيه، وبيشتغل على لينكس والماك كمان. بعد التسطيب اختاره كـ default profile في Windows Terminal.",
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
          ]
        },
        {
          cmd: "Verb-Noun",
          title: "اسم الأمر فعل-اسم",
          desc: "كل الأوامر (cmdlets) بالشكل ده: Get-Process، Stop-Process، New-Item. ومعظم أوامر لينكس شغالة كـ aliases: [[ls]] هي Get-ChildItem و [[cat]] هي Get-Content. مش حساس للكابيتال.",
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
          ]
        },
        {
          cmd: "Get-Help",
          title: "اقرا الشرح والأمثلة",
          desc: "[[-Examples]] أمثلة جاهزة، وده أسرع طريقة تتعلم أي أمر. أول مرة شغّل [[Update-Help]] من PowerShell أدمن.",
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
          ]
        },
        {
          cmd: "Get-Command",
          title: "دوّر على أمر",
          desc: "لو مش فاكر الاسم دوّر بالـ wildcard أو بالفعل والاسم.",
          example: R`Get-Command *process*
Get-Command -Verb Get -Noun *Item*`,
          try: "لاقي كل الأوامر اللي ليها علاقة بـ service.",
          deep: {
            why: "تدوّر على أوامر موجودة بدون ما تعرف اسمها الكامل. زي [[which]] في لينكس بس أقوى.",
            how: R`[[Get-Command]] بدون حاجة يعرض كل الأوامر (كتير). والأحسن مع [[*نص*]] بيدوّر. [[Get-Command Get-*]] يعرض كل الأوامر اللي بتبدأ بـ Get. [[Get-Command -Verb Get]] يعرض كل أوامر الجلب. [[-CommandType Function]] يعرض الـ functions بس.

ولما بتسأل «فين البرنامج ده؟»: [[Get-Command node]] بيقولك المسار الكامل.`,
            when: "مش فاكر الاسم الكامل. أو عايز تعرف كل الأوامر اللي بتتعامل مع خدمة معينة.",
            mistakes: "تكتب [[Get-Command]] بدون parameters وتغرق في آلاف الأوامر."
          },
          lines: ["أي أمر اسمه فيه process.", "الأوامر اللي فعلها Get واسمها فيه Item."]
        },
        {
          cmd: "Get-Member",
          title: "اعرف الـ object ده جواه إيه",
          desc: "أهم أمر في PowerShell. الناتج مش نص، ده objects ليها properties و methods، و Get-Member بيوريك هي إيه عشان تفلتر وترتب بيها.",
          example: R`Get-Process | Get-Member
Get-Item .\notes.txt | Get-Member -MemberType Property`,
          try: R`اعرف الـ properties بتاعة أي ملف، وبعدين اطبع [[(Get-Item .\notes.txt).LastWriteTime]].`,
          deep: {
            why: "في PowerShell كل حاجة object، وأي object ليه properties وmethods. [[Get-Member]] بيقولك إيه المتاح.",
            how: R`[[Get-Process | Get-Member]] يوريك كل property وmethod لـ Process objects. الـ Properties هي المعلومات (Name، وId، وCPU). الـ Methods هي الأفعال (Kill()، وWaitForExit()).

ودي من أهم أوامر PowerShell: لو مش عارف ايه اللي تعمله بـ object، عمل [[| Get-Member]] وشوف. مثلًا [[Get-Date | Get-Member]] بيوريك كل حاجة تقدر تعملها بالتاريخ.`,
            when: "لما بتتعلم أمر جديد. أو لما مش عارف إزاي توصل لمعلومة معينة من object.",
            mistakes: "تتجاهل Get-Member وتفضل تخمّن property names."
          },
          lines: ["إيه الـ properties والـ methods اللي في object العملية.", "الـ properties بس لـ object ملف."]
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
          desc: "[[cd]] و [[cd ..]] و [[cd ~]] كلها شغالة. بتنتقل لدرايف تاني عادي من غير /d زي CMD.",
          example: R`Set-Location C:\Users
cd D:\projects
cd ~
Get-Location`,
          try: "روح لأي درايف تاني وارجع الـ home.",
          deep: {
            why: "التنقل بين الفولدرات، زي cd في bash.",
            how: R`[[Set-Location C:\]] أو [[cd C:\]] نفس الحاجة. PowerShell بيفهم كلا الأسلوبين: backslash ([[C:\Users]]) وforward slash ([[C:/Users]]).

الرموز: [[~]] هنا بيشاور على home directory بتاعك ([[C:\Users\YourName]]). [[..]] الفولدر اللي فوق. و[[cd -]] مش موجودة، بدلها [[Pop-Location]] لو استخدمت [[Push-Location]].

PowerShell بيشوف الـ drives بطريقة تانية. مش بس [[C:]]، ممكن [[HKLM:]] يكون مسار في الـ registry، و[[Env:]] مسار لمتغيرات البيئة. كلهم نفس الـ drive concept.`,
            when: "التنقل بين فولدرات المشروع. والانتقال لفولدر مؤقت وبعدين الرجوع.",
            mistakes: R`المسارات اللي فيها مسافات لازم تتحط بين علامات تنصيص. والـ backslash مش escape في PowerShell (الـ escape هو الـ backtick)، فـ [["C:\new\test"]] سليمة.`
          },
          lines: [
            "روح للفولدر ده.",
            "نفس الحاجة بالاختصار، ولدرايف تاني على طول (مش زي CMD).",
            "فولدرك الشخصي.",
            "انت فين دلوقتي (زي pwd)."
          ]
        },
        {
          cmd: "Get-ChildItem",
          title: "اعرض الملفات (ls / dir)",
          desc: "[[-Force]] المخفي، [[-Recurse]] جوه الفولدرات، [[-Filter]] بالاسم، [[-File]] أو [[-Directory]] نوع واحد بس.",
          example: R`Get-ChildItem
Get-ChildItem -Force
Get-ChildItem -Recurse -Filter *.js
Get-ChildItem -Directory`,
          try: "اعرض كل ملفات .json في مشروع عندك من غير فولدرات.",
          deep: {
            why: "عرض محتوى فولدر، زي ls في bash.",
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
          ]
        },
        {
          cmd: "Push-Location",
          title: "احفظ مكانك وارجعله",
          desc: "[[pushd]] يروح مكان ويفتكر اللي كنت فيه، [[popd]] يرجعك. مفيد في السكربتات.",
          example: R`Push-Location C:\Windows
Pop-Location`,
          try: "اعمل pushd لفولدرين ورا بعض وبعدين popd مرتين.",
          deep: {
            why: "احتياج ترجع لمكانك بعد ما تتنقل. زي stack من المواقع.",
            how: R`[[Push-Location]] بيحفظ موقعك الحالي في stack ثم بيروح للمكان الجديد. [[Pop-Location]] يرجعك للمكان المحفوظ.

تقدر تعمل Push كذا مرة وتبني stack. Pop يرجعك مرة مرة بالترتيب.

وفيه alias: [[pushd]] = Push-Location، و[[popd]] = Pop-Location.`,
            when: "سكربت محتاج يدخل فولدر، يعمل حاجة، ويرجع. أو بتشتغل على مشاريع متعددة وبترجع لمشروعك الأصلي.",
            mistakes: "نسيان Pop-Location في حالة error. استخدم try/finally."
          },
          lines: ["احفظ مكاني وروح لـ Windows.", "ارجعني للمكان المحفوظ."]
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
          desc: "[[-ItemType Directory]] للفولدر، و [[-Force]] يعمل الفولدرات اللي في النص. خد بالك: مع ملف موجود [[-Force]] بتفضّيه وتكتب فوقه. [[mkdir]] و [[ni]] اختصارات.",
          example: R`New-Item -ItemType Directory lab\app\src -Force
New-Item index.js
New-Item .env -Value "PORT=3000"
mkdir logs`,
          try: R`اعمل [[app\src]] و [[app\public]] وملف [[app\src\server.js]].`,
          deep: {
            why: "عمل ملفات أو فولدرات جديدة.",
            how: R`[[-ItemType File]] لملف أو [[-ItemType Directory]] لفولدر. [[-Force]] بيعمل الفولدرات الوسيطة لو مش موجودة (زي [[mkdir -p]] في bash).

[[New-Item -ItemType File .env]] بيعمل ملف فاضي. [[-Value]] بتحط محتوى مباشرة.

ملف على طريق مش موجود: لو عملت [[New-Item C:\projects\new\file.txt]] والـ new مش موجود، هيفشل. استخدم [[-Force]] أو اعمل الفولدر الأول.`,
            when: "إعداد هيكل مشروع جديد. سكربتات بتعمل ملفات إعدادات.",
            mistakes: "نسيان [[-ItemType]] فبيعمل ملف حتى لو قصدك فولدر."
          },
          lines: [
            "اعمل فولدر بالفولدرات اللي في طريقه ([[-Force]] هنا زي [[mkdir -p]]).",
            "ملف فاضي (الافتراضي ملف).",
            "ملف بمحتوى على طول.",
            "الاختصار بيشتغل برضه."
          ]
        },
        {
          cmd: "Copy-Item",
          title: "انسخ",
          desc: "للفولدرات لازم [[-Recurse]].",
          example: R`Copy-Item .env.example .env
Copy-Item *.js backup\
Copy-Item src src_backup -Recurse`,
          try: "انسخ فولدر app كله لـ [[app_copy]].",
          deep: {
            why: "نسخ ملفات وفولدرات، زي cp في bash.",
            how: R`[[Copy-Item source dest]]. [[-Recurse]] لازم مع الفولدرات. [[-Force]] يكتب فوق لو موجود.

والفرق عن bash cp: الهدف لو فولدر موجود، الملف بيتحط جواه. لو الهدف اسم ملف جديد، بينشئه باسمه. وده نفس السلوك العادي.

[[-WhatIf]] في PowerShell عمومًا بيقولك هيعمل إيه من غير ما يعمله فعلًا. مفيد جدًا للأوامر الخطيرة.`,
            when: "نسخ .env.example لـ .env. نسخ فولدر مشروع للتجربة.",
            mistakes: "نسيان [[-Recurse]] مع الفولدرات: بينسخ الفولدر فاضي."
          },
          lines: ["انسخ ملف باسم جديد.", "انسخ كل .js لفولدر backup.", "انسخ فولدر بكل اللي جواه ([[-Recurse]])."]
        },
        {
          cmd: "Move-Item / Rename-Item",
          title: "انقل وغيّر الاسم",
          desc: "Rename-Item مع pipe يعمل rename لملفات كتير مرة واحدة. [[$_]] معناها العنصر الحالي في الـ pipe.",
          example: R`Move-Item *.log logs\
Rename-Item old.js new.js
Get-ChildItem *.txt | Rename-Item -NewName { $_.Name -replace '\.txt$', '.md' }`,
          try: "اعمل 3 ملفات txt وحوّلهم كلهم لـ md بالأمر الأخير.",
          deep: {
            why: "نقل أو إعادة تسمية، زي mv في bash.",
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
          ]
        },
        {
          cmd: "Remove-Item",
          title: "امسح",
          desc: "[[-WhatIf]] هو صاحبك: بيوريك هيمسح إيه من غير ما يمسح. [[-Recurse -Force]] للفولدرات، والمسح نهائي مش بيروح سلة المحذوفات.",
          example: R`Remove-Item notes.txt
Remove-Item node_modules -Recurse -Force -WhatIf
Remove-Item node_modules -Recurse -Force`,
          try: "امسح [[app_copy]] بـ [[-WhatIf]] الأول واقرا الناتج، وبعدين من غيرها.",
          flag: "danger",
          deep: {
            why: "حذف ملفات وفولدرات.",
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
          ]
        },
        {
          cmd: "Test-Path",
          title: "الملف ده موجود؟",
          desc: "بيرجع True أو False، أساسي في السكربتات.",
          example: R`Test-Path .env
if (Test-Path .env) { "found" } else { "missing" }`,
          try: "اختبر ملف موجود وملف مش موجود.",
          deep: {
            why: "تتأكد إن ملف أو فولدر موجود قبل ما تعمل حاجة. مش هيطلع error، هيرجع True أو False.",
            how: R`[[Test-Path "C:\file.txt"]] بيرجع [[True]] أو [[False]]. [[-PathType Container]] بيتأكد إنه فولدر. [[-PathType Leaf]] بيتأكد إنه ملف.

في السكربتات: [[if (Test-Path $file) { ... }]]. بدل ما تجرّب وتمسك الـ error.`,
            when: "في أي سكربت قبل ما يتعامل مع ملف. تتأكد إن .env موجود قبل التشغيل.",
            mistakes: "تنسى علامات تنصيص حوالين المسار لو فيه مسافات."
          },
          lines: ["الملف موجود؟ True أو False.", "نفس السؤال جوه شرط."]
        },
        {
          cmd: "Get-Item",
          title: "بيانات ملف واحد",
          desc: "الحجم بالبايت في Length، والتواريخ في LastWriteTime و CreationTime.",
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
          ]
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
          desc: "[[-Tail]] آخر سطور، [[-Wait]] متابعة لايف زي tail -f، و [[-TotalCount]] أول سطور. الناتج array من السطور.",
          example: R`Get-Content package.json
Get-Content app.log -Tail 20
Get-Content app.log -Tail 5 -Wait
(Get-Content app.log).Count`,
          try: R`في نافذة [[Get-Content app.log -Wait]]، وفي نافذة تانية [[Add-Content app.log "hello"]].`,
          deep: {
            why: "قراية محتوى ملف. زي cat و less و tail في bash.",
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
          ]
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
            why: "الكتابة في ملفات. زي [[>]] و[[>>]] في bash.",
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
          ]
        },
        {
          cmd: "ConvertFrom-Json",
          title: "اقرا JSON كـ object",
          desc: "بتحوّل JSON لـ object وتوصل للقيم بالنقطة. مفيدة جدًا مع package.json و APIs.",
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
          ]
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
          desc: "[[sls]] اختصار. [[-CaseSensitive]] يفرق كابيتال وسمول، [[-NotMatch]] العكس. الناتج فيه اسم الملف ورقم السطر.",
          example: R`Select-String -Path *.js -Pattern "TODO"
sls "error" app.log
Get-ChildItem -Recurse -File -Include *.js,*.ts | Where-Object FullName -notmatch 'node_modules' | Select-String "console.log" -SimpleMatch`,
          try: "دوّر على كل console.log في مشروع من غير node_modules.",
          deep: {
            why: "البحث عن نص في ملفات. زي grep في bash.",
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
          ]
        },
        {
          cmd: "Get-Command (which)",
          title: "البرنامج ده فين",
          desc: "خد بالك: [[where]] جوه PowerShell اختصار لـ Where-Object، عشان كده استخدم [[where.exe]] لو عايز أمر CMD القديم.",
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
          ]
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
          desc: "[[-gt]] أكبر، [[-lt]] أصغر، [[-eq]] يساوي، [[-like]] مع wildcard، [[-match]] regex. [[1MB]] و [[1GB]] وحدات جاهزة.",
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
          ]
        },
        {
          cmd: "Select-Object",
          title: "اختار أعمدة أو عدد",
          desc: "[[-First]] و [[-Last]] زي head و tail. [[-ExpandProperty]] يطلع القيمة نفسها.",
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
          lines: ["٣ أعمدة بس، وأول ٥ صفوف.", "الأسامي كنصوص عادية بدل objects ([[-ExpandProperty]])."]
        },
        {
          cmd: "Sort-Object",
          title: "رتّب",
          desc: "[[-Descending]] تنازلي، و [[-Unique]] يشيل التكرار.",
          example: R`Get-ChildItem -Recurse -File | Sort-Object Length -Descending | Select-Object -First 10 Name, Length
Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 5`,
          try: "اعرف أكتر 5 برامج بتاكل رام.",
          deep: {
            why: "ترتيب النتايج بأي property.",
            how: R`[[Sort-Object Name]] ترتيب أبجدي. [[Sort-Object CPU -Descending]] من الأكبر للأصغر (أكتر CPU أول). [[Sort-Object @{e="CPU";d=$true}, Name]] ترتيب بأكتر من property.

أول تفصيلة مهمة: Sort-Object بيعمل الترتيب على كل الـ objects الجاية، يعني بيجمعها الأول في الذاكرة. على pipeline طويل ده ممكن يأكل رام.`,
            when: "ترتيب processes بالـ CPU. ترتيب ملفات بالحجم.",
            mistakes: "ترتيب نص رقمي بدون [[-Property { [int]$_ }]] فـ «10» تيجي قبل «9»."
          },
          lines: [
            "كل الملفات، مرتبة بالحجم من الأكبر، وخد أكبر ١٠ بالاسم والحجم.",
            "أكتر ٥ عمليات استهلاكًا للرام."
          ]
        },
        {
          cmd: "Measure-Object",
          title: "عدّ واجمع",
          desc: "[[-Sum]] و [[-Average]] و [[-Maximum]].",
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
          lines: ["عدد الملفات (الأقواس تجمع الناتج الأول وبعدين .Count).", "مجموع أحجام كل الملفات."]
        },
        {
          cmd: "ForEach-Object",
          title: "نفّذ حاجة على كل عنصر",
          desc: "[[%]] اختصار. [[1..5]] بيعمل رينج أرقام.",
          example: R`1..5 | ForEach-Object { "Item $_" }
Get-ChildItem *.log | ForEach-Object { $_.Name.ToUpper() }`,
          try: "اعمل 5 ملفات test1.txt لـ test5.txt بـ ForEach-Object و New-Item.",
          deep: {
            why: "تنفيذ كود على كل element في pipeline. زي for loop في لينكس بس داخل pipeline.",
            how: R`[[ForEach-Object { $_ }]] أو [[% { $_ }]] الاختصار. داخل الـ block [[$_]] هو العنصر الحالي.

فيه طريقة تانية أسرع للـ properties البسيطة: [[Get-Process | ForEach-Object Name]] بدل [[Get-Process | ForEach-Object { $_.Name }]].

[[Invoke-Command]] أو [[Start-Job]] لو عايز تشغّل بالتوازي.`,
            when: "تعمل حاجة على كل ملف. تبعت طلب API لكل record.",
            mistakes: "استخدامه لحاجات موجودة كـ methods في الـ objects. لو Process عنده Kill() method، استخدمه مباشرة."
          },
          lines: [
            "الأرقام من ١ لـ ٥، ولكل واحد اطبع Item ورقمه. [[$_]] هو العنصر الحالي.",
            "اسم كل ملف log بحروف كابيتال. بتقدر تنادي methods على [[$_]]."
          ]
        },
        {
          cmd: "Group-Object",
          title: "جمّع حسب قيمة",
          desc: "بيعدّ كل مجموعة، زي sort و uniq -c مع بعض.",
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
          lines: ["جمّع الملفات حسب الامتداد، ورتّب المجموعات من الأكتر عددًا."]
        },
        {
          cmd: "Export-Csv / ConvertTo-Json",
          title: "صدّر الناتج",
          desc: "أي ناتج تقدر تحوّله CSV يتفتح في Excel أو JSON. [[Format-Table -AutoSize]] للعرض بس، متعملوش pipe لحاجة بعده.",
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
          ]
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
          desc: "[[ps]] و [[kill]] اختصاراتهم. [[-Force]] يقفل غصب.",
          example: R`Get-Process node
Stop-Process -Name node
Stop-Process -Id 1234 -Force`,
          try: "افتح notepad واقفله بـ Stop-Process بالاسم.",
          flag: "danger",
          deep: {
            why: "إيجاد وإيقاف العمليات. زي ps aux وkill في bash.",
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
          ]
        },
        {
          cmd: "Get-NetTCPConnection",
          title: "مين ماسك البورت",
          desc: "الحل المباشر لـ EADDRINUSE: خد OwningProcess وابعته لـ Stop-Process. [[-State Listen]] مهمة عشان متجيبش اتصالات قديمة رقم عمليتها 0.",
          example: R`Get-NetTCPConnection -LocalPort 3000 -State Listen
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000 -State Listen).OwningProcess
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000 -State Listen).OwningProcess -Force`,
          try: "شغّل [[npx http-server -p 3000]] واقفله من نافذة تانية بالبورت.",
          deep: {
            why: "إيجاد مين ماسك بورت معين. زي ss -tulpn في bash.",
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
          ]
        },
        {
          cmd: "Start-Process",
          title: "شغّل حاجة",
          desc: "[[-Verb RunAs]] يفتح كأدمن. [[ii .]] (Invoke-Item) يفتح الفولدر الحالي في Explorer.",
          example: R`Start-Process notepad
Start-Process "https://github.com"
Start-Process powershell -Verb RunAs
ii .`,
          try: "افتح الفولدر الحالي في Explorer بـ [[ii .]].",
          deep: {
            why: "تشغيل برنامج أو أمر بصلاحيات مختلفة أو في نافذة تانية.",
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
          ]
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
          ]
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
          ]
        },
        {
          cmd: "Get-Service",
          title: "خدمات ويندوز",
          desc: "Start/Stop/Restart-Service محتاجين أدمن.",
          example: R`Get-Service | Where-Object Status -eq Running
Get-Service *docker*
Restart-Service com.docker.service`,
          try: "اعرف حالة خدمة Docker أو أي خدمة عندك.",
          deep: {
            why: "إدارة الخدمات في ويندوز. زي systemctl في لينكس.",
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
          ]
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
          desc: "[[-Port]] بيقولك البورت مفتوح ولا لأ، مفيد لما تشك إن الفايروول قافل بورت على السيرفر.",
          example: R`Test-NetConnection google.com
Test-NetConnection 203.0.113.10 -Port 22
Test-NetConnection localhost -Port 5432`,
          try: "اختبر إن بورت 22 و 443 مفتوحين على سيرفرك.",
          deep: {
            why: "اختبار اتصال الشبكة. بيجمع ping و curl وnc في أداة واحدة.",
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
          ]
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
            why: "استدعاء APIs من PowerShell. زي curl بس بيرجع objects مش نص.",
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
          ]
        },
        {
          cmd: "ssh / scp",
          title: "موجودين في ويندوز 10 و 11",
          desc: R`نفس أوامر لينكس بالظبط، والمفاتيح بتتحفظ في [[$HOME\.ssh]].`,
          example: R`ssh-keygen -t ed25519
ssh root@203.0.113.10
scp .\dist.zip root@203.0.113.10:/var/www/`,
          try: "ادخل سيرفرك من PowerShell مباشرة.",
          deep: {
            why: "ويندوز ١٠/١١ عنده SSH client مبني جوه OpenSSH، مش محتاج PuTTY.",
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
          ]
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
          desc: "[[Get-NetIPConfiguration]] أوضح: الكارت والـ IP والـ gateway والـ DNS في مكان واحد.",
          example: R`Get-NetIPConfiguration
Get-NetIPAddress -AddressFamily IPv4 | Select-Object InterfaceAlias, IPAddress
Get-NetRoute -DestinationPrefix 0.0.0.0/0
(Invoke-RestMethod https://ifconfig.me/ip).Trim()`,
          try: "اعرف الـ IP المحلي والعام والـ gateway.",
          deep: {
            why: "عرض عناوين الـ IP على كل كروت الشبكة. زي ip a في لينكس.",
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
          ]
        },
        {
          cmd: "Resolve-DnsName",
          title: "DNS",
          desc: "زي dig. [[-Server]] يسأل DNS معين، و [[-Type]] نوع السجل. و [[Clear-DnsClientCache]] يمسح كاش ويندوز (محتاج أدمن).",
          example: R`Resolve-DnsName example.com
Resolve-DnsName example.com -Server 1.1.1.1
Resolve-DnsName example.com -Type MX
Clear-DnsClientCache`,
          try: "قارن رد 1.1.1.1 و 8.8.8.8 لدومين عندك.",
          deep: {
            why: "البحث عن معلومات DNS. زي dig في لينكس.",
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
          ]
        },
        {
          cmd: "hosts",
          title: "ملف hosts في ويندوز",
          desc: "نفس فكرة [[/etc/hosts]] في لينكس، ولازم تفتحه من PowerShell كأدمن عشان تقدر تحفظ.",
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
          lines: ["اعرض ملف hosts.", "افتحه في Notepad كمدير عشان تقدر تحفظ."]
        },
        {
          cmd: "Test-NetConnection -TraceRoute",
          title: "الطريق لحد السيرفر",
          desc: "بديل tracert في PowerShell. [[-InformationLevel Quiet]] بيرجع True أو False بس، مفيد في السكربتات.",
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
          ]
        },
        {
          cmd: "Get-NetTCPConnection -State Listen",
          title: "مين بيسمع على أنهي بورت",
          desc: "زي [[ss -tlnp]]. بص على LocalAddress: [[0.0.0.0]] أو [[::]] معناها مكشوف للشبكة، و [[127.0.0.1]] جوه الجهاز بس.",
          example: R`Get-NetTCPConnection -State Listen | Select-Object LocalAddress, LocalPort, OwningProcess | Sort-Object LocalPort
Get-NetTCPConnection -State Listen | ForEach-Object { [pscustomobject]@{ Port = $_.LocalPort; App = (Get-Process -Id $_.OwningProcess).Name } } | Sort-Object Port -Unique`,
          try: "اعرف أسامي البرامج اللي فاتحة بورتات عندك.",
          deep: {
            why: "تشوف إيه البورتات المفتوحة على جهازك. زي ss -tlnp في لينكس.",
            how: R`[[-State Listen]] بيفلتر على البورتات اللي بتستمع بس. [[LocalPort]] البورت. [[OwningProcess]] الـ PID اللي ماسكه.

[[Get-NetTCPConnection -State Listen | Select LocalPort, OwningProcess | Sort LocalPort | ForEach-Object { $p = Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue; [PSCustomObject]@{Port=$_.LocalPort; Process=$p.Name} }]] بيوريك البورت واسم البرنامج.`,
            when: "EADDRINUSE. تشوف مين ماسك أي بورت.",
            mistakes: "OwningProcess = 4 ده System، و0 ده Idle. عاديين."
          },
          lines: [
            "كل البورتات اللي بتسمع، مع رقم العملية، مرتبة بالبورت.",
            "نفس الحاجة بس بدل رقم العملية اسمها: لكل اتصال اعمل object جديد فيه البورت واسم البرنامج."
          ]
        },
        {
          cmd: "ssh -L",
          title: "SSH tunnel من ويندوز",
          desc: "نفس أمر لينكس بالظبط، شغال في PowerShell. بيخليك توصل لقاعدة بيانات السيرفر من جهازك على localhost:5433 من غير ما تفتحها للنت.",
          example: "ssh -N -L 5433:127.0.0.1:5432 deploy@203.0.113.10",
          try: "افتح tunnel ووصّل بيه DBeaver على localhost:5433.",
          deep: {
            why: "SSH tunnel من ويندوز. نفس الفكرة بالظبط زي bash: بتتصل بسيرفر وبيفتح بورت محلي بيوصلك لخدمة داخلية.",
            how: R`[[ssh -N -L 5433:127.0.0.1:5432 deploy@203.0.113.10]] نفس الأمر بالظبط زي لينكس. OpenSSH في ويندوز بيدعم كل الـ options.

افتح في PowerShell، واتركه شغال، وافتح DB client على localhost:5433.`,
            when: "تفتح قاعدة بيانات سيرفر من pgAdmin أو DBeaver على ويندوز.",
            mistakes: "نفس غلطات bash: تنسى -N فيفتح terminal على السيرفر. وتنسى إنه شغال في الخلفية."
          },
          lines: ["نفس الممر زي لينكس بالظبط: بورت 5433 عندك يوصل لـ 5432 على السيرفر."]
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
          desc: R`[[$env:X = "..."]] للجلسة دي بس. للتثبيت استخدم SetEnvironmentVariable وافتح نافذة جديدة.`,
          example: R`$env:PATH -split ';'
$env:API_URL = "http://localhost:3000"
[Environment]::SetEnvironmentVariable("API_URL", "http://localhost:3000", "User")
Get-ChildItem env:`,
          try: "اطبع PATH سطر سطر بأول أمر.",
          deep: {
            why: "قراية وتعديل متغيرات البيئة. زي export وenv في bash.",
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
          ]
        },
        {
          cmd: "المتغيرات",
          title: "خزّن أي حاجة",
          desc: "المتغير بيخزن objects كاملة مش نص بس. [[@()]] array و [[@{}]] hashtable.",
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
            when: "كل سكربت PowerShell.",
            mistakes: "الخلط بين hashtable [[$h.key]] وobject property. الاتنين بنفس الكتابة في بعض الأحيان بس مختلفين."
          },
          lines: [
            "احفظ ناتج أمر (array من objects) في متغير.",
            "كام عنصر فيه.",
            "hashtable: مفاتيح وقيم.",
            "اقرا قيمة بالنقطة."
          ]
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
          ]
        },
        {
          cmd: "History والاختصارات",
          title: "ارجع لأوامر كتبتها قبل كده",
          desc: "Ctrl+R بحث في التاريخ، Tab يلف على الاختيارات، Ctrl+Space يعرضهم كلهم، [[cls]] يمسح الشاشة.",
          example: R`Get-History
Invoke-History 5`,
          try: "اضغط Ctrl+Space بعد [[Get-Child]] وشوف الاختيارات.",
          deep: {
            why: "PowerShell بيحفظ الـ history وعنده اختصارات مفيدة تسرّع شغلك.",
            how: R`[[Get-History]] بيعرض الـ history بأرقام. [[Invoke-History 42]] بيشغّل الأمر رقم 42. [[!!]] مش موجودة بس [[r]] = Invoke-History.

F7 بيفتح menu بالـ history. F8 بيكمّل من الـ history بناءً على اللي كتبته.

Ctrl+R بيشتغل في بعض الإعدادات مع PSReadLine module للبحث في الـ history زي bash.

Tab completion قوية في PowerShell: بتكمّل أسامي Parameters. Ctrl+Space بيوريك كل الـ completions.`,
            when: "أمر طويل كتبته امبارح. التنقل في الـ history.",
            mistakes: "إنك تفتكر [[!!]] شغالة. هي مش موجودة في PowerShell، استخدم [[r]]."
          },
          lines: ["الأوامر اللي كتبتها، بأرقام.", "نفّذ الأمر رقم ٥ تاني."]
        },
        {
          cmd: "ExecutionPolicy",
          title: "ليه السكربت مش راضي يشتغل",
          desc: "Windows PowerShell 5.1 بيمنع ملفات ps1 افتراضيًا (PowerShell 7 جاي RemoteSigned). RemoteSigned للمستخدم الحالي بس بتسمح بسكربتاتك وبتمنع السكربتات المتحملة من النت اللي مش موقّعة.",
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
          ]
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
          desc: "[[tar]] كمان موجود في ويندوز 10 و 11 لو عايز tar.gz.",
          example: R`Compress-Archive -Path dist\* -DestinationPath dist.zip
Expand-Archive dist.zip -DestinationPath out
tar -czf app.tar.gz app`,
          try: "اضغط فولدر وفكه في مكان تاني.",
          deep: {
            why: "عمل ZIP وفكّه من PowerShell من غير أداة تانية.",
            how: R`[[Compress-Archive -Path ".\folder" -DestinationPath "archive.zip"]] يعمل zip. [[-Update]] يضيف لـ zip موجود.

[[Expand-Archive -Path "archive.zip" -DestinationPath ".\output"]] يفكّه. [[-Force]] يكتب فوق لو الفولدر موجود.

[[Compress-Archive -Path ".\file1.txt", ".\file2.txt" -Destination "files.zip"]] ملفات متعددة.

بس PowerShell Compress-Archive بطيء على ملفات كتير. لو عندك 7-Zip: [[7z a archive.7z folder\]] أسرع بكتير.`,
            when: "باك أب. إرسال مشروع. نقل ملفات.",
            mistakes: R`Path ممكن تاخد * : [[Compress-Archive ".\logs\*.log"]] بس الـ wildcards مش شغالة في كل الأحوال. خليها بين quotes.`
          },
          lines: ["اضغط محتوى dist في zip.", "فك zip في فولدر out.", "tar موجود في ويندوز 10 وأحدث، بنفس حروف لينكس."]
        },
        {
          cmd: "Get-FileHash",
          title: "اتأكد إن الملف سليم",
          desc: "قارن الهاش بالمكتوب في صفحة التحميل عشان تتأكد إن الملف متعدلش.",
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
          lines: ["بصمة SHA256 للملف، قارنها باللي على موقع التحميل."]
        }
      ]
    },
    {
      t: "لغة PowerShell",
      l: 3,
      n: R`ملف .ps1 فيه أوامر ولغة كاملة. شغّله بـ .\file.ps1 بعد ما تظبط ExecutionPolicy (في قسم البيئة)`,
      items: [
        {
          cmd: "المتغيرات والأنواع",
          title: "خزّن قيمة واعرف نوعها",
          desc: "المتغير بيبدأ بـ [[$]] وبيشيل أي نوع. [[$true]] و [[$false]]، و [[@()]] array، و [[@{}]] hashtable. جوه double quotes [[$name]] بيتفك، لكن التعبيرات زي [[$list.Count]] لازم تتحط جوه [[$( )]]. Single quotes مش بتفك حاجة.",
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
          ]
        },
        {
          cmd: "if / switch",
          title: "الشروط",
          desc: "المقارنات كلمات مش رموز: [[-eq]] [[-ne]] [[-gt]] [[-lt]] [[-like]] [[-match]]، والربط [[-and]] [[-or]] [[-not]]. لو كتبت [[>]] هيعمل ملف اسمه الرقم بدل ما يقارن، ودي أشهر غلطة. و [[$args]] الـ arguments اللي اتبعتت للسكربت.",
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
            why: "شروط في السكربت. بنفس مفهوم bash بس بأسلوب PowerShell.",
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
          ]
        },
        {
          cmd: "foreach / for / while",
          title: "اللوب",
          desc: "[[foreach]] على لستة، و [[for]] بعدّاد، و [[while]] بشرط. [[-le]] أصغر من أو يساوي.",
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
            why: "التكرار في السكربتات.",
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
          ]
        },
        {
          cmd: "function",
          title: "فانكشنز",
          desc: "أي قيمة مش متخزنة في متغير بتطلع output للفانكشن، فمش محتاج return. [[Mandatory]] بيطلب القيمة لو نسيتها. وسمّي الفانكشنز Verb-Noun زي الأوامر الأصلية.",
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
            why: "تعريف كود قابل لإعادة الاستخدام.",
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
          ]
        },
        {
          cmd: "try / catch",
          title: "التعامل مع الأخطاء",
          desc: R`[[$ErrorActionPreference = "Stop"]] زي [[set -e]] في bash: أي error يوقف ويروح للـ catch. لكن البرامج الخارجية زي npm و git مش بترمي errors في PowerShell، فلازم تفحص [[$LASTEXITCODE]] بعدها.`,
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
            why: "التعامل مع الأخطاء. زي try/catch في JavaScript.",
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
          ]
        },
        {
          cmd: "$LASTEXITCODE",
          title: "اعرف إن docker أو npm فشل جوه PowerShell",
          desc: R`[[$ErrorActionPreference = "Stop"]] و try/catch مبيمسكوش فشل البرامج الخارجية (docker، npm، git) في Windows PowerShell 5.1، لأنها مش بترمي exception، بترجع exit code بس. فبعد كل أمر خارجي مهم افحص [[$LASTEXITCODE]]. وفي PowerShell 7.4+ [[$PSNativeCommandUseErrorActionPreference = $true]] بيخلي الفشل ده يوقف السكربت لوحده.`,
          example: R`$ErrorActionPreference = "Stop"
function Assert-Ok($what) { if ($LASTEXITCODE -ne 0) { throw "$what failed (exit $LASTEXITCODE)" } }

docker info *> $null;            Assert-Ok "Docker Desktop"
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

و [[*> $null]] بيرمي كل الـ output (العادي والأخطاء)، فتفحص «Docker شغال؟» من غير ما يطبعلك صفحة معلومات.

وفي PowerShell 7.4 وأحدث، المتغير [[$PSNativeCommandUseErrorActionPreference]] بيخلي أي برنامج خارجي يرجع غير صفر يتعامل كـ error، فـ Stop يوقف عليه لوحده. بس ده مش موجود في Windows PowerShell 5.1 اللي جاي مع ويندوز.`,
            when: "أي سكربت بيشغّل docker أو npm أو git أو dotnet وبيعتمد إن الخطوة اللي قبلها نجحت.",
            mistakes: R`في مشروع حقيقي كان سكربت deploy.ps1 معتمد على try/catch يمسك فشل docker، ومفيش ولا فحص لـ [[$LASTEXITCODE]]، فالـ build يفشل والسكربت يكمّل. وفي مشروع تاني [[$ErrorActionPreference = "Stop"]] كان موجود، والسكربت برضه مكانش بيقف لو npm فشل. وخلي بالك: [[$LASTEXITCODE]] بيتغيّر مع كل برنامج خارجي، فافحصه على طول بعد الأمر، مش بعد ما تشغّل حاجة تانية.`
          },
          lines: [
            "أي error من cmdlet يوقف السكربت.",
            "فانكشن: لو آخر برنامج خارجي رجع غير صفر، ارمي exception باسم الخطوة.",
            "Docker شغال؟ [[*> $null]] يرمي كل الناتج، وبعدين افحص.",
            "ابني الصور وافحص.",
            "ابني الفرونت وافحص.",
            "في PowerShell 7.4+ بس: خلّي فشل أي برنامج خارجي يوقف السكربت لوحده."
          ]
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
            mistakes: R`في مشروع حقيقي كان سكربت الفحص فيه مسار مطلق ثابت لفولدر على جهاز صاحبه (ولمشروع تاني كمان، لأنه اتنسخ بين مشروعين)، فبيبوظ على أي جهاز غيره. وكان فيه سطر مكتوب فيه المسار لوحده من غير [[Set-Location]]، فـ PowerShell حاول ينفّذه كأمر ووقع. وخلي بالك إن [[Set-Location]] بيغيّر فولدر الجلسة نفسها لو السكربت اتشغّل بـ dot-source ([[. .\script.ps1]])، فاستخدم [[Push-Location]] و [[Pop-Location]] لو فارق معاك.`
          },
          lines: [
            "ادخل فولدر السكربت نفسه، فالمسارات النسبية بعد كده تتحسب منه.",
            "أو ابني مسار كامل من فولدر السكربت من غير ما تعتمد على الفولدر الحالي.",
            "المسار الكامل لملف السكربت نفسه.",
            "الفولدر الحالي، وهيبقى فولدر السكربت.",
            "المسار النسبي بقى آمن: لو مفيش dist ابنيها."
          ]
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
          ]
        },
        {
          cmd: "Write-Host والـ output",
          title: "الفرق اللي بيلخبط الناس",
          desc: "Write-Host بيعرض على الشاشة بس ومش بيدخل الـ pipe. أي قيمة لوحدها في سطر (أو Write-Output) هي الـ output الحقيقي اللي بيتبعت للأمر اللي بعده.",
          example: R`function Show-Greeting { Write-Host "hi" }
function Get-Greeting { "hi" }

(Show-Greeting | Measure-Object).Count
(Get-Greeting | Measure-Object).Count`,
          try: "شغّلهم: الأولى هتطبع hi والعدد 0، والتانية العدد 1.",
          flag: "script",
          deep: {
            why: "الفهم الصح لـ Output في PowerShell مهم عشان السكربتات تشتغل صح.",
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
          ]
        },
        {
          cmd: "PSScriptAnalyzer",
          title: "اكتشف الأخطاء قبل ما تشغّل",
          desc: "زي shellcheck بتاع bash. ولو السكربت بيقف في مكان مش فاهمه، [[Set-PSDebug -Trace 1]] بيطبع كل سطر قبل ما ينفذه.",
          example: R`Install-Module PSScriptAnalyzer -Scope CurrentUser
Invoke-ScriptAnalyzer .\backup.ps1
Set-PSDebug -Trace 1
.\backup.ps1
Set-PSDebug -Off`,
          try: "شغّله على backup.ps1 اللي تحت.",
          deep: {
            why: "بيحلل سكربتات PowerShell ويكتشف مشاكل محتملة. زي shellcheck للـ bash.",
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
          ]
        },
        {
          cmd: "backup.ps1",
          title: "سكربت باك أب بالتاريخ",
          desc: R`[[param]] بيعرّف arguments بقيم افتراضية. شغّله بـ [[.\backup.ps1 -Source .\app -Dest .\bk]].`,
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
          ]
        },
        {
          cmd: "verify-stack.ps1",
          title: "شغّل الـ stack واستنى لحد ما يبقى جاهز فعلًا",
          desc: R`سكربت قبل ما تبدأ شغل: يتأكد إن Docker Desktop شغال وإن البورتات فاضية، وبعدين [[docker compose up -d --build --wait]] بيستنى لحد ما الخدمات تبقى healthy بدل [[Start-Sleep]]، ولو فشل يطبع حالة الخدمات وآخر اللوجات.`,
          example: R`$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

docker info *> $null
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
            how: R`[[docker info]] بيكلّم الـ Docker daemon، فلو Docker Desktop مقفول بيفشل. [[*> $null]] يرمي كل الناتج، والفحص على [[$LASTEXITCODE]] لأن docker برنامج خارجي.

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
          ]
        }
      ]
    }
  ]
});
