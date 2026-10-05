// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "لغة PowerShell",
      l: 3,
      n: R`ملف .ps1 فيه أوامر ولغة كاملة. ابدأ بأول درس هنا، وكل سكربت بعد كده بيتحفظ ويتشغّل بنفس الطريقة`,
      items: [
        {
          cmd: "أول سكربت .ps1",
          title: "اكتب أول سكربت وشغّله من الصفر",
          desc: R`السكربت ملف نصي امتداده [[.ps1]] فيه أوامر PowerShell ورا بعض، بتشغّله بأمر واحد بدل ما تكتبهم كل مرة. الخطوات: اعمل فولدر للسكربتات وادخله، وافتح ملف جديد في VS Code بـ [[code hello.ps1]] (أو [[notepad hello.ps1]] لو مفيش VS Code). اكتب جواه الكود اللي في «الحل» تحت واحفظ. وسطّب extension اسمه PowerShell في VS Code: بيلوّن ويكمّل ويطلّعلك التحذيرات وانت بتكتب، و F5 بيشغّل الملف و F8 بيشغّل السطور اللي معلّم عليها بس.

أول حاجز: Windows PowerShell 5.1 بيمنع السكربتات خالص افتراضيًا على ويندوز 10 و 11 (درس ExecutionPolicy)، أما PowerShell 7 على ويندوز فجاي RemoteSigned من الأول. [[Get-ExecutionPolicy]] يقولك الحالي، و [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] مرة واحدة من غير أدمن بتسمح بسكربتاتك انت. وكل نسخة ليها الإعداد بتاعها: اللي تعمله في 5.1 مش بيأثر على 7 والعكس. والحاجز التاني: أي ملف نزل من النت أو من إيميل ويندوز بيعلّم عليه، و RemoteSigned بيرفضه لحد ما تقراه وتعمله [[Unblock-File]].

التشغيل: [[.\hello.ps1]]. الـ [[.\]] (يعني «من الفولدر ده») لازمة: PowerShell مش بيشغّل ملف من الفولدر الحالي بالاسم بس، عشان محدش يحطلك ملف اسمه زي أمر مشهور فيتشغّل بداله. والـ arguments بعد الاسم زي أي أمر: [[-Name Sara]]. ومن بره PowerShell (CMD أو اختصار على الديسكتوب أو Task Scheduler) استخدم [[pwsh -File]]، و [[-NoProfile]] بيخليه ميحمّلش البروفايل بتاعك، فيبقى أسرع ويشتغل نفس الشغل على أي جهاز. وأي option لـ pwsh نفسه يتكتب قبل [[-File]]، لأن كل اللي بعد اسم السكربت بيروح للسكربت.`,
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

الترميز: PowerShell 7 بيقرا UTF-8 عادي. Windows PowerShell 5.1 بيقرا الملف اللي من غير BOM على إنه ANSI (ترميز لغة ويندوز)، فالعربي اللي جوه [[Write-Host]] يطلع رموز. لو هتكتب عربي وهتشغّل بـ 5.1، احفظ الملف «UTF-8 with BOM» من شريط VS Code تحت على اليمين. (الاستثناء: لو مفعّل «Beta: Use Unicode UTF-8 for worldwide language support» في إعدادات اللغة، الـ ANSI نفسه بيبقى UTF-8 فبيشتغل. ده كان مفعّل على الجهاز اللي جربت عليه، فمتعتمدش عليه.)

[[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]]: السكربتات اللي اتكتبت على جهازك تشتغل، واللي جاية من النت لازم تبقى موقّعة أو تعملها Unblock. ويندوز بيعرف إن الملف من النت من علامة مخفية اسمها Zone.Identifier بيحطها المتصفح، و [[Unblock-File]] بيشيلها. ومن Explorer نفس الحكاية: Properties، وعلّم على Unblock.

طرق التشغيل:
[[.\hello.ps1]] من جوه PowerShell، في نفس النافذة، والمتغيرات اللي السكربت بيعملها بتروح لما يخلص.
[[pwsh -File .\hello.ps1 -Name Sara]] من أي مكان (CMD، اختصار، Task Scheduler). ولو عايز النافذة تفضل مفتوحة بعد ما يخلص ضيف [[-NoExit]]. و [[-ExecutionPolicy Bypass]] بتعدّي الـ policy للتشغيلة دي بس من غير ما تغيّر إعدادات الجهاز. والاتنين قبل [[-File]]: [[pwsh -NoExit -File .\hello.ps1]]. لو كتبتهم بعد اسم السكربت بيروحوا للسكربت كـ arguments وبيتجاهلوا.
كليك يمين، Run with PowerShell: بيشغّله بـ Windows PowerShell 5.1 ([[powershell.exe -file]]) في نافذة بتتقفل أول ما يخلص.
الدبل كليك على .ps1 بيفتحه في Notepad مش بيشغّله، وده مقصود عشان محدش يشغّل سكربت بالغلط.

وفي VS Code: F5 بيشغّل الملف كله في الترمنال اللي تحت، و F8 بيشغّل السطر أو السطور اللي معلّم عليها بس، ودي أحسن طريقة تجرّب سطر سطر.`,
            when: "أول ما تكرر نفس الأوامر أكتر من مرتين. وكل سكربت في الدروس اللي جاية بيتعمل بنفس الطريقة دي: ملف، وحفظ، و .\ قبل الاسم.",
            mistakes: R`تعمل [[Set-ExecutionPolicy Unrestricted]] أو Bypass على الجهاز كله عشان «يشتغل وخلاص»، و RemoteSigned كفاية وأأمن. أو تكتب [[hello.ps1]] من غير [[.\]] وتفتكر الملف مش موجود. أو تشغّل بكليك يمين وتستغرب إن النافذة اتقفلت قبل ما تقرا حاجة: ضيف في آخر السكربت [[Read-Host "Press Enter to exit"]] لو هيتشغّل بالطريقة دي. أو تعمل [[Unblock-File]] لسكربت نازل من النت من غير ما تقراه: العلامة دي موجودة عشان تقراه الأول.`
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
          sol: R`[[hello.ps1]] من غير [[.\]] بيطلع في PowerShell 7: [[hello.ps1: The term 'hello.ps1' is not recognized as a name of a cmdlet, function, script file, or executable program.]]، وفي 5.1 نفس المعنى بكلمة [[operable program]] بدل [[executable program]]. ولو كاتبه بإيدك في نافذة مفتوحة، بيظهر تحته اقتراح: في 7 [[The command "hello.ps1" was not found, but does exist in the current location.]] وتحته الأمر الصح [[.\hello.ps1]]، وفي 5.1 سطر بيبدأ بـ [[Suggestion [3,General]:]] وآخره [[instead type: ".\hello.ps1"]]. (الاقتراح ده مبيظهرش لما الأمر جاي من [[-Command]] أو من سكربت.)

بعدين [[.\hello.ps1]] طبع [[Hello, World! It's 20:31]] (بالساعة بتاعتك)، و [[.\hello.ps1 -Name Sara]] طبع [[Hello, Sara! It's 20:31]]، و [[.\hello.ps1 Omar]] من غير كلمة [[-Name]] اشتغل برضه لأن Name أول parameter. نفس الناتج في PowerShell 7.6 و 5.1، ومن CMD بـ [[pwsh -NoProfile -File .\hello.ps1 -Name Sara]].

لو طلعلك [[cannot be loaded because running scripts is disabled on this system]] يبقى الـ policy لسه Restricted (جربتها بـ [[powershell -ExecutionPolicy Restricted]])، ولو [[is not digitally signed. You cannot run this script on the current system]] يبقى الملف متعلّم إنه من النت والـ policy بتاعتك RemoteSigned: علّمت ملف بإيدي بنفس العلامة اللي المتصفح بيحطها (stream اسمه Zone.Identifier) فطلع الـ error ده في 7 و 5.1، وبعد [[Unblock-File]] اشتغل. و Run with PowerShell على ويندوز 11 أمره في الـ registry [[powershell.exe -file]]، يعني 5.1 ونفس الـ policy، وبيقفل النافذة أول ما السكربت يخلص فمش هتلحق تقرا.`,
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

[[-f]] بيستخدم إعدادات اللغة بتاعة الجهاز: على ويندوز إنجليزي [[{0:N1}]] لـ 3.14159 بتطلع 3.1، وعلى جهاز لغته عربي ممكن تطلع بعلامة عشرية عربي (جربتها بلغة ar-EG: PowerShell 7 طلّع [[3٫1]] بالفاصلة العربي، و 5.1 طلّع [[3.1]]، لأن كل نسخة بتجيب إعدادات اللغة من مكان مختلف). لو النص ده رايح ملف أو API، استخدم [[.ToString("F1", [cultureinfo]::InvariantCulture)]].

[[-replace]] و [[-split]] بياخدوا regex. فـ [[-split '.']] هيقطّع عند كل حرف (النقطة يعني أي حرف) ويرجع فاضي. الصح [[-split '\.']]، أو [[.Split('.')]] (الـ method بتاخد نص عادي مش regex). وفي [[-replace]] تقدر ترجّع جزء من اللي لقيته: [['v2.15.0' -replace '^v(\d+)\.(\d+).*', '$2']] بيرجع 15، و [['$2']] لازم بين single quotes عشان PowerShell ميفكهاش كمتغير.

و [[-join]] من غير حاجة على الشمال ([[-join $list]]) بيلزقهم من غير فاصل. و [[-split]] على سطور ملف: [[(Get-Content f.txt -Raw) -split "$__btr?$__btn"]].`,
            when: "أسامي ملفات بالتاريخ، رسايل للمستخدم، تقطيع CSV بسيط أو سطور لوج، تجهيز JSON صغير، ومقارنة أرقام نسخ.",
            mistakes: R`[["$obj.Property"]] من غير [[$( )]] فيطبع [[System.Collections.Hashtable.port]] أو اسم النوع. و [[\n]] زي bash بدل [[$__btn]] فيتطبع حرفيًا. و [[-split '.']] أو [[-replace '.', '']] ناسي إنها regex. وكلام بعد [[@"]] على نفس السطر ([[No characters are allowed after a here-string header]])، أو مسافة قبل [["@]] اللي بيقفل ([[White space is not allowed before the string terminator]]): الاتنين ParserError. وخلي بالك إن الـ backtick جوه مسار بين double quotes بيبوّظه: [["C:$__btnew"]] بقت C: وسطر جديد و ew.`
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
          sol: R`الناتج كله (جربته على PowerShell 7.6 و 5.1 بلغة إنجليزي، ونفس الناتج في الاتنين): [[Hello Sara]] و [[Hello $name]] و [[Count: 2, first: a.txt]] و [[Total: 12 files, 3.1 MB]] وسطر فيه Path و tab والمسار وتحته Done، وبعدين سطرين [[User: Sara]] و [[Date: 2026-10-01]]، و [[report_2026.md]]، وبعدين a و b وسطر فاضي و c، و [[web | api | db]] و [[hello]] و [[Power]] و [[POWERSHELL]] و [[True]].

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

hashtable: [[.ContainsKey("db")]] موجود ولا لأ، و [[.Remove("db")]] تشيله، و [[.Count]] عدد المفاتيح. بس الـ [[[ordered]]] نوعه تاني (OrderedDictionary) ومفيهوش ContainsKey: [[$ports.ContainsKey("db")]] طلع [[Method invocation failed ... does not contain a method named 'ContainsKey']]، والصح معاه [[$ports.Contains("db")]]. المفاتيح مش بتفرّق بين الكابيتال والسمول افتراضيًا. ولما تلف عليه بـ [[foreach ($k in $h.Keys)]] متعدّلش فيه جوه اللوب، هيطلع error.

[[[PSCustomObject]]] بيحافظ على ترتيب الأعمدة زي ما كتبتها، وتقدر تزوّد عمود بعدين بـ [[Add-Member]] أو تعمل objects جديدة من القديمة بـ [[Select-Object]].`,
            when: "Hashtable لإعدادات السكربت والـ splatting (درس splatting). PSCustomObject لأي تقرير أو ناتج هيتعرض أو يتصدّر. Array لأي لستة بتلف عليها.",
            mistakes: R`تبني نتيجة كبيرة بـ [[$result += ...]] جوه لوب فالسكربت يبطأ جدًا. أو تنسى [[[ordered]]] وتستغرب إن الأعمدة طالعة بترتيب عشوائي. أو تطبع hashtable جوه نص [["$ports"]] فيطلع [[System.Collections.Specialized.OrderedDictionary]]. أو تعمل [[Export-Csv]] لـ hashtable مباشرة: في 5.1 بيطلع أعمدة ملهاش علاقة ببياناتك زي Count و Keys و Values، وفي 7 بيطلع صف واحد المفاتيح فيه أعمدة. لو عايز صف لكل حاجة، حوّلها لـ PSCustomObject الأول.`
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

لما شلت [[[ordered]]]، [[$ports.Keys]] طلعت web و db و api في PowerShell 7.6، و db و api و web في 5.1: مش ترتيب الإدخال ولا أبجدي، وبيختلف من نسخة للتانية، فمتعتمدش عليه. (نفس الجدول في الآخر طلع مترتب برضه، لأن [[$rows]] اتبنت باللف على [[$services]] مش على الـ hashtable.)

والتصدير في الـ solCode: [[$rows | Export-Csv services.csv -NoTypeInformation]] عمل ملف أوله [["Service","Port"]] وبعدين [["web","3000"]] و [["api","8000"]] و [["db","5432"]]، نفس الملف في 7 و 5.1. ولو صدّرت [[$ports]] نفسه (hashtable): 5.1 طلّع أعمدة [["Count","IsReadOnly","Keys","Values",...]] ملهاش علاقة ببياناتك، و 7 طلّع صف واحد [["web","api","db"]] وتحته [["3000","8000","5432"]].`,
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
          sol: R`جربت المثال على PowerShell 7.6 و 5.1 وطلع نفس الناتج بالترتيب: [[True]] و [[True]] و [[False]] و [[True]] و [[False]] و [[True]] و [[True]] و [[2]] و [[True]] و [[True]]، وبعدين 5 و 8 و 12 كل واحد في سطر، و [[True]] و [[82]] و [[10]].

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
          sol: R`[[if (5 > 3) { "yes" }]] مطبعش [[yes]]، ولو عملت [[Get-ChildItem]] هتلاقي ملف جديد اسمه [[3]]، وجواه [[5]]. جربتها بالظبط كده في 7.6 و 5.1. [[>]] في PowerShell redirect زي bash، فالشرط بقى «اكتب 5 في ملف اسمه 3»، والشرط نفسه ملوش output فاتحسب False. (حجم الملف 3 bytes في 7، و 8 في 5.1، لأن [[>]] في 5.1 بيكتب UTF-16.)

الصح [[if (5 -gt 3) { "yes" }]] وده طبع [[yes]]. امسح الملف بـ [[Remove-Item 3]]. ولو جربت [[==]] بيطلع ParserError: [[The assignment expression is not valid]]. والغلطة دي مبتطلعش أي error، عشان كده خطيرة في السكربتات: الشرط دايمًا False وملفات بأرقام بتظهر في الفولدر.`
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

لو بتشغّل من بره بـ [[pwsh -File]]: الـ arguments بتوصل نصوص، فلستة مش بتتفهم array: [[-Urls a,b]] وصلت نص واحد [["a,b"]]، و [[-Urls a, b]] وصلت [["a,"]] بس و [["b"]] راحت argument لوحدها (جربتها في 7 و 5.1). و [[[switch]]] يتبعت [[-Force]] عادي. لو محتاج لستة من بره استخدم [[pwsh -Command]].`,
            when: "أي سكربت هيتشغّل أكتر من مرة بقيم مختلفة، أو هيشغّله حد غيرك، أو هيتحط في Task Scheduler.",
            mistakes: R`تحط [[param()]] بعد أي سطر تاني في الملف (حتى [[$ErrorActionPreference]])، فـ PowerShell مش بيعتبرها تعريف parameters ويفتكرها أمر اسمه param: [[The term 'param' is not recognized]]. أول حاجة في الملف لازم تبقى param (التعليقات و [[[CmdletBinding()]]] بس مسموح قبلها). أو تسمّي parameter باسم متغير محجوز زي [[$args]] أو [[$input]] أو [[$Host]]. أو تنسى الفاصلة بين الـ parameters فيطلع ParserError. أو تعمل الـ parameter إجباري وتشغّل السكربت في Task Scheduler من غيره، فيفضل مستني حد يكتب.`
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
          sol: R`جربتهم على PowerShell 7.6 و 5.1 وطلعت نفس الرسايل: من غير حاجة بيسألك [[Project:]] في الترمنال (ولو التشغيل non-interactive بيطلع [[Cannot process command because of one or more missing mandatory parameters: Project.]]). [[-Project shop]] طبع [[Project: shop | Stage: dev | Port: 3000 | Force: False]]. [[-Stage live]] طلع [[Cannot validate argument on parameter 'Stage'. The argument "live" does not belong to the set "dev,staging,prod"...]] من غير ما ولا سطر في السكربت يشتغل. [[-Port 70000]] طلع [[The 70000 argument is greater than the maximum allowed range of 65535.]].

و [[-Project shop -Stage prod -Force]] طبع [[Project: shop | Stage: prod | Port: 3000 | Force: True]] وتحته [[Skipping checks]]. وكمان [[.\deploy.ps1 shop prod]] من غير أسامي اشتغلت بالترتيب، و [[-Proj shop -St staging]] المختصرة اشتغلت. و [[-Port abc]] طلع [[Cannot convert value "abc" to type "System.Int32"]]. جرّب تكتب [[.\deploy.ps1 -Stage ]] وتدوس Tab: هيلف على dev و staging و prod.`
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
          sol: R`جربته بملفين a.log و b.log في PowerShell 7.6 و 5.1 والناتج واحد: [[-WhatIf]] طبع [[What if: Performing the operation "Delete log" on target "a.log".]] ونفس السطر لـ b.log، و [[Get-ChildItem logs]] بعدها لسه فيه الملفين. بعدين [[-Verbose]] طبع بالأصفر [[VERBOSE: Found 2 log files in .\logs]] و [[VERBOSE: Performing the operation "Delete log" on target "a.log".]] لكل ملف، والفولدر فضي. ومن غير [[-Verbose]] ولا [[-WhatIf]] بيمسح من غير ما يطبع حاجة.

لو شغلته تاني والفولدر فاضي هيطبع (مع Verbose) [[Found 0 log files]] ويخلص من غير error. وجرّب [[-Confirm]]: هيسألك قبل كل ملف [[Are you sure you want to perform this action?]] و Y أو A (جاوبت N للأول و Y للتاني، فاتمسح b.log بس). ولو شلت [[param()]] وسبت [[[CmdletBinding()]]] لوحدها طلع [[Unexpected attribute 'CmdletBinding'.]]، ولو بعت argument مش متعرّف زي [[-Extra b]] طلع [[A parameter cannot be found that matches parameter name 'Extra'.]] (من غير CmdletBinding كان هيتحط في [[$args]] بسكات).`
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
          sol: R`المثال اتجرب في PowerShell 7.6 و 5.1 في فولدر فيه [[src\a.txt]] و [[src\sub\b.txt]] وريبو git: [[Copy-Item @copy]] عمل [[src_copy]] بالملفين، و [[(Get-ChildItem @params).Count]] طبع عدد الملفات في الفولدر واللي تحته، و [[git @gitArgs]] طبع آخر 3 commits، وآخر أمر طبع ملفات txt.

الحل في الـ solCode: [[Compress-Archive @zip]] عمل [[src.zip]]. ولما كتبت [[Copy-Item $copy]] بدل [[@copy]] طلع error [[Cannot find path '...\System.Collections.Hashtable' because it does not exist.]]، لأن الـ hashtable كله اتبعت كأنه Path. ولما حطيت مسافة بعد الـ backtick، الأمر اتنفذ من غير [[-Recurse]]، والسطر اللي تحته طلع [[The term '-Recurse' is not recognized]].`,
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

النوع [[[System.IO.FileInfo]]] معناه «ملف» بالظبط، فلو حد بعت فولدر الفانكشن هترفضه ([[The input object cannot be bound to any parameters for the command...]]). بس خلي بالك: النص بيتحوّل لوحده لـ FileInfo بالاسم ده حتى لو مفيش ملف بالاسم ده ([["abc" | Get-FileReport]] طلّعت صف abc بحجم 0)، فلو ممكن يوصلك نصوص اتأكد بـ [[Test-Path]]. وجوه process، كل [[[PSCustomObject]]] بيطلع على طول للي بعدها في الـ pipe، من غير ما يستنى الباقي، وده بيوفّر رام مع آلاف الملفات.

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
            mistakes: R`تكتب الكود من غير process فتشتغل على آخر عنصر بس. أو تعمل [[$results += ...]] جوه process وترجّعهم في end، فتضيّع ميزة الـ streaming وتبطّأ. أو تحط النوع [[[string]]] لـ parameter بيستقبل ملفات، فـ PowerShell يحوّل كل ملف لنص وتضيع باقي خصايصه، والنص نفسه بيختلف: في 7 المسار الكامل، وفي 5.1 الاسم بس (جربتها). أو تحط [[Mandatory]] ومتتعاملش مع الحالة اللي حد ينادي الفانكشن من غير pipe.`
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
          sol: R`جربته في PowerShell 7.6 و 5.1 في فولدر فيه ملف 3 ميجا وملفين صغيرين (منهم notes.txt): طلع جدول Name و KB بصف لكل ملف ([[big.bin 3072]] و [[small.txt 2]]...)، وفوقه [[VERBOSE: Total: 3 MB]] (ظهر قبل الجدول لأن الجدول بيستنى يحسب عرض الأعمدة)، وفي الآخر صف notes.txt تاني للنداء التاني. (7 بيعرض عمود KB بـ [[3072.00]] و 5.1 بـ [[3072]]، نفس الرقم بس العرض مختلف.)

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
          sol: R`جربتها على PowerShell 7.6 و 5.1 والناتج واحد: backup.ps1 طبع [[[2026-10-02_20-39] Backup started]]، وجدول فيه Function [[Get-Stamp]] و [[Write-Log]] بس، وفي الآخر [[shop]].

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
          sol: R`في فولدر فاضي السكربت طبع (في PowerShell 7.6 و 5.1): [[Error: Cannot find path '...\missing.txt' because it does not exist.]] بالأحمر، وبعدها [[Done either way]]، وبعدين npm طلّع [[npm error code ENOENT]] و [[Could not read package.json]]، وفي الآخر [[Build failed]]. و [[$LASTEXITCODE]] بعد npm كان [[-4058]] على ويندوز (على لينكس بيطلع [[254]])، والمهم إنه مش صفر. وبعد السكربت [[$LASTEXITCODE]] بقى [[1]] من [[exit 1]].

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
          sol: R`جربته على PowerShell 7.6 و 5.1 والناتج واحد: أول سطر مطبعش حاجة، والتاني طبع محتوى src (جدول فيه [[a.txt]]) وكمّل من غير ما يشتكي من nope، و [[problems: 1]]، و [[Not found: ...\nope.txt]] من الـ catch المتخصص، و [[3]] لـ [[$Error.Count]] (الاتنين اللي اتخبوا والتالت بتاع Stop)، و [[Cannot find path '...\nope.txt' because it does not exist.]]، و [[Failed: Config file '.\config.json' is missing]]. و [[$LASTEXITCODE]] بعد السكربت [[2]].

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

لو فتحت a.txt في أداة زي VS Code أو [[grep]] في Git Bash وشفت مسافات بين كل حرف، ده UTF-16. ودي حاجة Windows PowerShell 5.1 بس: جربتها فيه، والملف اللي طلع من [[cmd /c "echo hello" > log 2>&1]] أول بايتات فيه [[FF FE 68 00 65 00]]، يعني UTF-16 LE (كل حرف إنجليزي بايتين، والتاني صفر). في PowerShell 7 الاتنين بيطلعوا UTF-8.`
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

بيسجّل اللي بيظهر على الشاشة: output و Write-Host و Write-Warning و Write-Error و Write-Verbose (لو ظاهر). أما ناتج البرامج الخارجية زي git فبيتكتب على الكونسول مباشرة من غير ما يعدّي على PowerShell: في نافذة عادية اتسجّل في تجربتي (7.6 و 5.1)، بس لما ناتج pwsh نفسه كان متحوّل لملف أو pipe ([[pwsh -File job.ps1 > out.txt]]، أو أداة بتشغّله وتقرا ناتجه)، سطر git طلع فاضي في اللوج في الاتنين. الحل: ضيف بعد الأمر [[| Out-Host]]، فالناتج يعدّي على PowerShell ويتسجّل في كل الحالات.

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
          sol: R`جربته على ويندوز بـ PowerShell 7.6 و 5.1: الشاشة طبعت [[Starting job]] وعدد الملفات و [[git version 2.56.0.windows.1]] و [[WARNING: Disk almost full]]. وملف [[logs\run_2026-10-02.log]] فيه هيدر بين سطور نجوم ([[PowerShell transcript start]] و [[Start time]] و [[Username]] و [[PSVersion: 7.6.6]] ...، وفي 5.1 أوله [[Windows PowerShell transcript start]])، وبعدين نفس الأربع سطور، وفي الآخر [[PowerShell transcript end]]. التشغيلة التانية اتضافت تحت الأولى بهيدر جديد. (لما شغّلته وناتجه متحوّل لملف، سطر git طلع فاضي في اللوج لحد ما ضفت [[| Out-Host]]، الشرح في deep.)

مع [[throw "boom"]] مكان التحذير: الشاشة طبعت [[FAILED: boom]] بالأحمر، والسطر ده موجود في اللوج قبل [[PowerShell transcript end]]، و [[$LASTEXITCODE]] بقى [[1]]. وجربت كمان من غير الـ catch (try و finally بس): الـ error اتطبع على الشاشة، بس [[boom]] مكانتش في اللوج خالص (في 7 و 5.1)، لأن PowerShell بيطبع الـ error بعد ما الـ finally يخلص، يعني بعد ما التسجيل اتقفل. عشان كده الـ catch اللي بيطبع الرسالة مهم.`
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
          sol: R`الـ Install-Module بيحمّل من PowerShell Gallery (هيسألك إنك تثق في PSGallery لأنها [[Untrusted]] افتراضيًا، اكتب Y؛ وفي 5.1 على جهاز جديد ممكن يسألك قبلها يسطّب NuGet provider، اكتب Y برضه). بعدين [[Invoke-ScriptAnalyzer .\backup.ps1]] على backup.ps1 بتاع الدرس اللي تحت بيطلّع تحذير واحد: [[PSAvoidUsingWriteHost]] بـ Severity Warning على [[Line 16]] (سطر Write-Host)، عشان Write-Host مش بيدخل الـ pipeline. (الجزء ده اتجرّب على لينكس بـ PowerShell 7؛ الجهاز اللي راجعت عليه مفيهوش PSScriptAnalyzer فمعدتوش هنا، ورقم السطر اتأكدت منه في الملف.)

ده مش error والسكربت شغال، بس لو هتستخدم الناتج في سكربت تاني استخدم Write-Output. ولو عندك aliases زي [[gci]] و [[%]] في السكربت هيطلع [[PSAvoidUsingCmdletAliases]]، ولو متغير متعرفش وما استخدمتوش [[PSUseDeclaredVarsMoreThanAssignment]].

و [[Set-PSDebug -Trace 1]] اتجرّب على ويندوز في 7.6 و 5.1: بيطبع سطور زي [[DEBUG:   12+  >>>> $stamp = Get-Date -Format "yyyy-MM-dd_HH-mm"]] (رقم السطر والأمر)، ولما وصل Compress-Archive دخل جواه وطبع حوالي 270 سطر من كود الموديول نفسه، وبعدين رجع لسطر 16 بتاعك. فمتتخضش، دور على أرقام سطور سكربتك.`
        }
      ]
    }
]);
