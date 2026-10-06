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
          teach: R`## الفكرة: ملف نصي فيه أوامر، وأمر واحد يشغّله

المثال ده مش سكربت، ده الخطوات اللي بتعملها **مرة واحدة** عشان تكتب أول سكربت وتشغّله: تعمل فولدر، وتفتح ملف، وتظبط الإذن، وتشغّل. وكود السكربت نفسه (hello.ps1) في الـ solCode، وهنفكّه في الآخر. كل اللي تحت اتجرّب على ويندوز 11 في PowerShell 7.6 و Windows PowerShell 5.1.

---

## ١. فولدر للسكربتات: [[New-Item -ItemType Directory $HOME\scripts -Force]]

~~~powershell
New-Item -ItemType Directory $HOME\scripts -Force
~~~

| الحتة | معناها |
|---|---|
| [[New-Item]] | اعمل حاجة جديدة (ملف أو فولدر) |
| [[-ItemType Directory]] | النوع فولدر مش ملف |
| [[$HOME]] | متغير جاهز فيه فولدرك الشخصي، زي [[C:\Users\Sara]] |
| [[\scripts]] | اسم الفولدر الجديد جوه فولدرك |
| [[-Force]] | لو الفولدر موجود متطلعش error، كمّل |

والناتج سطر بيوصف الفولدر اللي اتعمل:

~~~text الناتج
    Directory: C:\Users\7ossa

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           10/6/2026  9:36 AM                scripts
~~~

الـ [[d]] في أول [[Mode]] يعني directory، يعني فولدر.

---

## ٢. ادخله وافتح الملف

~~~powershell
Set-Location $HOME\scripts
code hello.ps1
~~~

[[Set-Location]] (اختصاره [[cd]]) بيدخلك الفولدر. و [[code]] هو VS Code: بيفتح ملف اسمه hello.ps1، ولو مش موجود بيفتحه فاضي ويتعمل لما تعمل Save. اكتب جواه الكود اللي في الحل (هنشرحه تحت) واحفظ بـ Ctrl+S.

> الامتداد لازم يبقى [[.ps1]] بالظبط. لو استخدمت Notepad ممكن يحفظه [[hello.ps1.txt]] من غير ما تاخد بالك.

---

## ٣. الإذن: [[Get-ExecutionPolicy]]

ويندوز عنده إعداد اسمه **Execution Policy** بيقول «السكربتات مسموح تشتغل ولا لأ». اسأله الأول:

~~~powershell
Get-ExecutionPolicy
~~~

~~~text الناتج على الجهاز اللي اتجرّب عليه (في 7 و 5.1)
RemoteSigned
~~~

| القيمة | معناها |
|---|---|
| [[Restricted]] | مفيش سكربتات خالص. الافتراضي في 5.1 على ويندوز 10 و 11 |
| [[RemoteSigned]] | سكربتاتك تشتغل، واللي جاي من النت لازم يبقى موقّع أو تعمله Unblock |
| [[Unrestricted]] و [[Bypass]] | كله يشتغل، ومش محتاجهم |

ولو طلعلك [[Restricted]]، أي سكربت هيقف بالرسالة دي (جربتها بـ [[powershell -ExecutionPolicy Restricted]]):

~~~text الناتج
.\hello.ps1 : File ...\hello.ps1 cannot be loaded because running scripts is disabled on this system.
~~~

### الحل: [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]]

~~~powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
~~~

- [[Set-ExecutionPolicy]] غيّر الإعداد.
- [[-Scope CurrentUser]] لليوزر بتاعك بس، فمش محتاج أدمن ومش بتأثر على باقي اليوزرز.
- [[RemoteSigned]] القيمة اللي شرحناها فوق.

بتتعمل مرة واحدة على الجهاز، ومبتطبعش حاجة لو نجحت. (الأمر ده بيغيّر إعداد الجهاز، فمتجرّبش هنا؛ الكلام من docs مايكروسوفت.) وافتكر إن 5.1 و 7 كل واحد ليه الإعداد بتاعه.

---

## ٤. التشغيل: [[.\hello.ps1]]

~~~powershell
.\hello.ps1
.\hello.ps1 -Name Sara
~~~

~~~text الناتج
Hello, World! It's 09:36
Hello, Sara! It's 09:36
~~~

### ليه [[.\]]؟

[[.]] يعني «الفولدر اللي أنا فيه»، و [[\]] فاصل المسار. فـ [[.\hello.ps1]] يعني «الملف ده اللي هنا». لو كتبت الاسم لوحده، PowerShell بيدوّر في الأوامر وفي فولدرات الـ PATH بس، مش في الفولدر الحالي:

~~~text الناتج من hello.ps1 من غير .\ (PowerShell 7)
The term 'hello.ps1' is not recognized as a name of a cmdlet, function, script file, or executable program.
~~~

ده مقصود: لو حد حط في فولدر ملف اسمه [[ls.ps1]]، ميتشغّلش بدل الأمر الحقيقي من غير ما تاخد بالك.

### [[-Name Sara]]

السكربت فيه parameter اسمه [[Name]] (هنشوفه في الكود)، فبتبعتله قيمة بالظبط زي أي أمر. و [[.\hello.ps1 Omar]] من غير [[-Name]] اشتغلت برضه وطبعت [[Hello, Omar! It's 09:36]]، لأن Name أول parameter.

---

## ٥. ملف نازل من النت: [[Unblock-File]]

~~~powershell
Unblock-File .\downloaded.ps1
~~~

المتصفح بيحط على أي ملف بينزله علامة مخفية اسمها **Zone.Identifier** (معناها «الملف ده جه من النت»). مع [[RemoteSigned]] الملف ده مش هيشتغل. جربت أحط العلامة دي بإيدي على ملف، فطلع:

~~~text الناتج (نفس الرسالة في 7 و 5.1)
... downloaded.ps1 is not digitally signed. You cannot run this script on the current system.
~~~

[[Unblock-File]] بيشيل العلامة، وبعدها اشتغل وطبع [[from net]]. **اقرا الملف قبل ما تعمله Unblock**، العلامة موجودة عشان كده.

---

## ٦. من بره PowerShell: [[pwsh -NoProfile -File]]

~~~powershell
pwsh -NoProfile -File .\hello.ps1 -Name Sara
~~~

| الحتة | معناها |
|---|---|
| [[pwsh]] | برنامج PowerShell 7 نفسه (5.1 اسمه [[powershell]]) |
| [[-NoProfile]] | متحمّلش ملف البروفايل بتاعك، فيبدأ أسرع ويتصرف زي أي جهاز |
| [[-File .\hello.ps1]] | شغّل الملف ده |
| [[-Name Sara]] | أي حاجة بعد اسم الملف بتروح للسكربت |

~~~text الناتج
Hello, Sara! It's 09:36
~~~

ده الشكل اللي بتحطه في اختصار على الديسكتوب أو في Task Scheduler. وأي option لـ pwsh نفسه (زي [[-NoProfile]] و [[-NoExit]]) لازم قبل [[-File]].

---

## ٧. كود السكربت نفسه (الـ solCode)

~~~powershell
param([string]$Name = "World")
$now = Get-Date -Format "HH:mm"
Write-Output "Hello, $Name! It's $now"
~~~

### السطر الأول: [[param([string]$Name = "World")]]

- [[param( )]] بيعرّف الـ arguments اللي السكربت بياخدها، ولازم يبقى أول سطر.
- [[[string]]] نوع القيمة: نص.
- [[$Name]] اسم المتغير، وهو نفسه اسم الـ parameter: [[-Name]].
- [[= "World"]] القيمة لو محدش بعت حاجة.

### السطر التاني: [[Get-Date -Format "HH:mm"]]

[[Get-Date]] بيجيب الوقت دلوقتي، و [[-Format]] بيحدد شكله: [[HH]] الساعة بنظام ٢٤، و [[mm]] الدقايق (سمول، لأن [[MM]] كابيتال يعني الشهر). والنتيجة نص زي [[09:36]] بيتحط في [[$now]].

### السطر التالت: [[Write-Output "..."]]

[[Write-Output]] بيطلّع النص. والنص بين double quotes، فـ [[$Name]] و [[$now]] جواه بيتبدّلوا بقيمهم. والـ [[']] في [[It's]] عادية جوه الـ double quotes.

---

## الخلاصة

| الخطوة | الأمر | ليه |
|---|---|---|
| مرة واحدة | [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] | تسمح بسكربتاتك |
| كل سكربت | [[code name.ps1]] واحفظ | الامتداد [[.ps1]] بالظبط |
| التشغيل | [[.\name.ps1 -Param value]] | الـ [[.\]] لازمة |
| ملف من النت | اقراه وبعدين [[Unblock-File]] | يشيل علامة النت |
| من بره | [[pwsh -NoProfile -File .\name.ps1]] | للاختصارات و Task Scheduler |`,
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
          teach: R`## الفكرة: علبة ليها اسم، وجواها قيمة

المتغير اسم بتحط فيه قيمة عشان تستخدمها بعدين. المثال بيعمل ٥ متغيرات من ٥ أنواع، وبعدين يقرا منهم بـ ٤ طرق. اتجرّب كله كملف [[.ps1]] في PowerShell 7.6 و 5.1 وطلع نفس الناتج.

---

## ١. خمس متغيرات بخمس أنواع

~~~powershell
$name = "Ali"
$count = 5
$isAdmin = $false
$list = @("web", "api", "db")
$config = @{ port = 3000; env = "dev" }
~~~

كل سطر شكله واحد: [[$]] وبعدها اسم، وبعدين [[=]] يعني «حط فيه»، وبعدين القيمة. الأسطر دي مبتطبعش حاجة، لأن القيمة راحت للمتغير.

ومش بتقول النوع: PowerShell بيعرفه من شكل القيمة. و [[.GetType().Name]] بيقولك هو شافه إيه:

| السطر | القيمة | النوع اللي طلع |
|---|---|---|
| [[$name]] | [["Ali"]] بين علامات تنصيص | [[String]] نص |
| [[$count]] | [[5]] رقم من غير علامة عشرية | [[Int32]] رقم صحيح |
| [[$isAdmin]] | [[$false]] | [[Boolean]] صح أو غلط |
| [[$list]] | [[@( ... )]] | [[Object[]]] array |
| [[$config]] | [[@{ ... }]] | [[Hashtable]] |

### [[$false]] ليه بالدولار؟

لأن [[false]] من غير دولار PowerShell هيفتكرها اسم أمر. [[$true]] و [[$false]] و [[$null]] متغيرات جاهزة، فبتبدأ بدولار زي أي متغير.

### [[@("web", "api", "db")]]

[[@( )]] معناها «array»: لستة عناصر بترتيب، والفاصلة بين كل عنصر والتاني.

### [[@{ port = 3000; env = "dev" }]]

[[@{ }]] معناها hashtable: كل عنصر **مفتاح = قيمة**، و [[;]] بتفصل بينهم لو على سطر واحد. يعني [[port]] قيمته 3000، و [[env]] قيمته dev.

---

## ٢. القراءة: نص فيه متغيرات

~~~powershell
"Name: $name, items: $($list.Count)"
~~~

~~~text الناتج
Name: Ali, items: 3
~~~

النص لوحده في سطر بيتطبع، مش محتاج echo. وجوه الـ double quotes:

- [[$name]] اتبدّل بقيمته [[Ali]].
- [[$($list.Count)]]: [[.Count]] عدد العناصر، بس عشان النص يفهم إنها جزء من المتغير لازم تتحط في [[$( )]]، ومعناها «نفّذ اللي جوه وحط الناتج هنا».

ومن غير [[$( )]] (ده الـ try):

~~~text الناتج من "items: $list.Count"
items: web api db.Count
~~~

النص فكّ [[$list]] بس (العناصر بمسافات بينها) وساب [[.Count]] كلام عادي.

---

## ٣. قيمة من الـ hashtable: [[$config.port]]

~~~powershell
$config.port
~~~

~~~text الناتج
3000
~~~

النقطة بعد الـ hashtable معناها «هات قيمة المفتاح ده». ونفس الحكاية بالأقواس: [[$config["env"]]] طلعت [[dev]].

---

## ٤. عنصر من الـ array: [[$list[0]]]

~~~powershell
$list[0]
~~~

~~~text الناتج
web
~~~

الرقم بين [[[ ]]] اسمه index، والعد بيبدأ من **صفر**: [[0]] الأول، و [[1]] التاني، و [[2]] التالت. ولو طلبت [[$list[3]]] (مش موجود) مبيطلعش error، بيرجع [[$null]] بهدوء.

---

## ٥. النوع: [[$count.GetType().Name]]

~~~powershell
$count.GetType().Name
~~~

~~~text الناتج
Int32
~~~

- [[.GetType()]] method (فعل) موجودة على أي قيمة، بترجع وصف كامل للنوع. والأقواس [[()]] بعد اسم الـ method لازمة عشان تتنفذ.
- [[.Name]] من الوصف ده خد الاسم بس.

[[Int32]] يعني رقم صحيح بياخد 32 bit (من حوالي سالب ٢ مليار لموجب ٢ مليار). ولو كتبت [[3.5]] النوع بيبقى [[Double]] (رقم بكسور).

---

## ٦. التحويل بإيدك: [[[int]"42"]]

النوع بين أقواس مربعة قبل القيمة معناه «حوّلها للنوع ده». والفرق باين في الجمع:

~~~text الناتج
[int]"42" + 1    →  43     (رقم + رقم)
"42" + 1         →  421    (نص + حاجة = لزق)
~~~

وده مهم لأن أي قيمة جاية من ملف أو من [[Read-Host]] بتيجي نص.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| متغير | [[$x = قيمة]] |
| صح وغلط وفاضي | [[$true]] و [[$false]] و [[$null]] (بالدولار) |
| لستة | [[@("a", "b")]] وتقرا [[$x[0]]] |
| مفتاح وقيمة | [[@{ k = 1; j = 2 }]] وتقرا [[$x.k]] |
| خاصية جوه نص | [[$( )]]: [["$($x.Count)"]] |
| النوع | [[$x.GetType().Name]] |
| تحويل | [[[int]"42"]] |`,
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
          teach: R`## الفكرة: ٣ أسئلة عن أي نص

المثال طويل بس كله تلات أسئلة: النص بيتفك ولا لأ (نوع علامات التنصيص)؟ إزاي أبني نص من قيم (الدمج والتنسيق)؟ وإزاي أعدّل نص موجود (الـ operators والـ methods)؟ كل الناتج تحت من تشغيل المثال كملف في PowerShell 7.6 و 5.1 بلغة إنجليزي، ونفس الناتج في الاتنين.

---

## ١. نوعين علامات تنصيص

~~~powershell
$name = "Sara"
$files = @("a.txt", "b.txt")
"Hello $name"
'Hello $name'
~~~

~~~text الناتج
Hello Sara
Hello $name
~~~

| الشكل | اسمه | بيعمل إيه |
|---|---|---|
| [["..."]] | double quotes | بيدوّر على [[$اسم]] ويبدّلها بالقيمة (اسمها interpolation) |
| [['...']] | single quotes | بيكتب كل حرف زي ما هو، حتى [[$]] |

القاعدة: لو النص فيه متغيرات استخدم [["..."]]، ولو فيه [[$]] حقيقي (regex أو باسورد) استخدم [['...']].

---

## ٢. أكتر من اسم متغير: [[$( )]]

~~~powershell
"Count: $($files.Count), first: $($files[0])"
~~~

~~~text الناتج
Count: 2, first: a.txt
~~~

جوه [["..."]] الفك بياخد **اسم المتغير بس**. أي حاجة بعده زي [[.Count]] أو [[[0]]] لازم تتحط في [[$( )]]، ومعناها «نفّذ الكود ده وحط ناتجه هنا». فـ [[$($files.Count)]] بقت 2، و [[$($files[0])]] أول عنصر a.txt.

---

## ٣. التنسيق: [[-f]]

~~~powershell
"Total: {0} files, {1:N1} MB" -f 12, 3.14159
~~~

~~~text الناتج
Total: 12 files, 3.1 MB
~~~

نفكّه:

| الحتة | معناها |
|---|---|
| [[{0}]] | مكان القيمة رقم 0 (أول قيمة بعد [[-f]]): 12 |
| [[{1:N1}]] | القيمة رقم 1 (3.14159)، بشكل [[N1]] |
| [[N1]] | N يعني number، و 1 يعني رقم واحد بعد العلامة العشرية، ومعاه فاصلة الآلاف |
| [[-f 12, 3.14159]] | القيم بالترتيب |

ليه 3.1 مش 3.14159؟ لأن [[N1]] قرّب لرقم عشري واحد. وجربت [["{0:N1}" -f 1234.5678]] فطلعت [[1,234.6]]، يعني الفاصلة بين الآلاف بتتحط لوحدها. وفي الـ solCode [["{0:D3}" -f 7]] طلعت [[007]]: [[D3]] يعني رقم صحيح (Decimal) في ٣ خانات على الأقل، والناقص أصفار.

---

## ٤. الـ backtick: حرف الـ escape

~~~powershell
"Path:$__btt$HOME$__btnDone"
~~~

~~~text الناتج
Path:	C:\Users\7ossa
Done
~~~

الـ backtick (الحرف اللي على زرار ~ في الكيبورد) هو حرف الـ escape في PowerShell، يعني «الحرف اللي بعدي معناه مختلف»:

| تكتب | يطلع |
|---|---|
| backtick وبعده t | tab (المسافة الكبيرة بعد Path:) |
| backtick وبعده n | سطر جديد (Done نزلت تحت) |

وده شغال جوه [["..."]] بس. وخلي بالك: في bash الـ escape هو [[\]]، لكن في PowerShell [[\]] حرف عادي (فاصل مسارات ويندوز).

---

## ٥. نص على كذا سطر: here-string

~~~powershell
$msg = @"
User: $name
Date: $(Get-Date -Format yyyy-MM-dd)
"@
$msg
~~~

~~~text الناتج
User: Sara
Date: 2026-10-06
~~~

- [[@"]] في **آخر** السطر بيفتح النص، ومينفعش يبقى بعده أي حاجة على نفس السطر.
- السطور اللي بعده بتتفك زي الـ double quotes: [[$name]] بقت Sara، و [[$(Get-Date -Format yyyy-MM-dd)]] اتنفذ وبقى تاريخ النهارده ([[yyyy]] السنة و [[MM]] الشهر و [[dd]] اليوم).
- [["@]] لازم يبقى في **أول** سطره لوحده، من غير ولا مسافة قبله.

ولو عايز here-string مبيتفكش، استخدم [[@']] و [['@]].

---

## ٦. التبديل: [[-replace]]

~~~powershell
"report_2026.txt" -replace '\.txt$', '.md'
~~~

~~~text الناتج
report_2026.md
~~~

[[-replace]] بياخد حاجتين: اللي تدوّر عليه (regex)، واللي تحطه مكانه. والـ regex هنا:

| الحتة | معناها |
|---|---|
| [[\.]] | نقطة حقيقية. النقطة لوحدها في regex معناها «أي حرف»، فالـ [[\]] بتلغي المعنى ده |
| [[txt]] | الحروف دي |
| [[$]] | آخر النص |

يعني «.txt في الآخر بالظبط». وعشان كده [["report.txt.bak" -replace '\.txt$', '.md']] رجعت زي ما هي: الـ .txt مش في الآخر. والـ regex بين single quotes عشان [[$]] متتفكش كمتغير.

---

## ٧. التقطيع والدمج: [[-split]] و [[-join]]

~~~powershell
"a,b,,c" -split ','
"web", "api", "db" -join ' | '
~~~

~~~text الناتج
a
b

c
web | api | db
~~~

- [[-split ',']] بيقطّع النص عند كل فاصلة ويرجّع array. الناتج **٤** عناصر (جربت [[.Count]] فطلع 4): a و b وعنصر فاضي (بين الفاصلتين) و c، والفاضي ظهر سطر فاضي.
- [[-join ' | ']] العكس: بياخد array (الـ ٣ نصوص اللي على الشمال) ويلزقهم بالفاصل ده.

و [[-split]] بياخد regex زي [[-replace]]. فـ [[-split '.']] (من غير [[\]]) بيقطّع عند كل حرف: جربتها على [["v2.15.0"]] فرجعت ٨ عناصر فاضيين.

---

## ٨. الـ methods: أفعال جاهزة على أي نص

~~~powershell
"  hello  ".Trim()
"PowerShell".Substring(0, 5)
"PowerShell".ToUpper()
"file.tar.gz".EndsWith(".gz")
~~~

~~~text الناتج
hello
Power
POWERSHELL
True
~~~

النقطة بعد النص وبعدها اسم وأقواس معناها «نفّذ الفعل ده على النص»:

| الـ method | بتعمل إيه | الناتج |
|---|---|---|
| [[.Trim()]] | تشيل المسافات من الأول والآخر | [[hello]] |
| [[.Substring(0, 5)]] | من الحرف رقم 0، خد 5 حروف | [[Power]] |
| [[.ToUpper()]] | كله كابيتال | [[POWERSHELL]] |
| [[.EndsWith(".gz")]] | بيخلص بكده؟ | [[True]] |

و [[.Substring(5)]] برقم واحد بتاخد من الحرف 5 للآخر: طلعت [[Shell]].

---

## ٩. الـ solCode: رقم الـ minor من [[v2.15.0]]

~~~powershell
$v = "v2.15.0"
($v -split '\.')[1]
$v -replace '^v(\d+)\.(\d+)\.(\d+)$', '$2'
"{0:D3}" -f 7
~~~

~~~text الناتج
15
15
007
~~~

### بـ [[-split]]

[[$v -split '\.']] بيقطّع عند النقط فيرجّع [[v2]] و [[15]] و [[0]]. الأقواس حواليه بتخليه يتنفذ الأول، وبعدين [[[1]]] تاخد العنصر التاني (العد من صفر): 15.

### بـ [[-replace]]

| الحتة | معناها |
|---|---|
| [[^v]] | النص بيبدأ بـ v |
| [[(\d+)]] | رقم أو أكتر ([[\d]] رقم، [[+]] واحد أو أكتر)، والأقواس بتحفظه كمجموعة |
| [[\.]] | نقطة حقيقية |
| [[$]] | آخر النص |
| [['$2']] | بدّل النص كله بالمجموعة التانية بس |

فيه ٣ مجموعات: 2 و 15 و 0، والتانية 15. و [['$2']] بين single quotes لازم، وإلا PowerShell يفتكرها متغير اسمه 2.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| نص فيه متغيرات | [["Hi $name"]] |
| نص حرفي | [['Hi $name']] |
| خاصية جوه نص | [["$($x.Count)"]] |
| أرقام بشكل معين | [["{0:N1}" -f $n]] |
| tab وسطر جديد | backtick t و backtick n جوه [["..."]] |
| كذا سطر | [[@"]] ... [["@]] |
| تبديل وتقطيع | [[-replace]] و [[-split]] (الاتنين regex، فالنقطة [[\.]]) |
| دمج | [[-join]] |`,
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
          teach: R`## الفكرة: ٣ أشكال تشيل بيها أكتر من قيمة

| الشكل | بيتكتب | بتوصل للعنصر بـ |
|---|---|---|
| array (لستة) | [[@("web", "api")]] | رقمه: [[$x[0]]] |
| hashtable (قاموس) | [[@{ web = 3000 }]] | مفتاحه: [[$x.web]] |
| PSCustomObject (صف بيانات) | [[[PSCustomObject]@{ Name = "api" }]] | اسم الخاصية: [[$x.Name]] |

المثال بيمشي على التلاتة بالترتيب. اتشغّل كملف في PowerShell 7.6 و 5.1 وطلع نفس الناتج.

---

## ١. الـ array

~~~powershell
$services = @("web", "api")
$services += "db"
$services.Count
$services[0]
$services[-1]
$services -contains "api"
~~~

~~~text الناتج
3
web
db
True
~~~

| السطر | بيعمل إيه |
|---|---|
| [[@("web", "api")]] | لستة بعنصرين |
| [[+= "db"]] | زوّد عنصر في الآخر. [[+=]] اختصار [[$services = $services + "db"]] |
| [[.Count]] | العدد: 3 |
| [[[0]]] | أول عنصر، لأن العد من صفر |
| [[[-1]]] | الرقم السالب بيعد من الآخر: [[-1]] الأخير، و [[-2]] اللي قبله |
| [[-contains "api"]] | السؤال «api جوه اللستة؟» والجواب True أو False |

---

## ٢. الـ hashtable المترتب

~~~powershell
$ports = [ordered]@{ web = 3000; api = 8000 }
$ports["db"] = 5432
$ports.api
$ports.Keys
~~~

~~~text الناتج
8000
web
api
db
~~~

### [[[ordered]]]

الـ hashtable العادي [[@{ }]] مش بيحفظ ترتيب الإدخال. [[[ordered]]] قبله بيخليه يحفظه، ونوعه بيبقى [[OrderedDictionary]] (جربت [[$ports.GetType().Name]]).

### [[$ports["db"] = 5432]]

لو المفتاح مش موجود بيتضاف، ولو موجود قيمته بتتغيّر. والقراءة بنفس الطريقة أو بالنقطة: [[$ports.api]] طلعت 8000.

### [[.Keys]]

المفاتيح بس، كل واحد في سطر، وبالترتيب لأنه [[ordered]]. وفيه [[.Values]] للقيم.

---

## ٣. اللف على المفاتيح والقيم: [[.GetEnumerator()]]

~~~powershell
foreach ($kv in $ports.GetEnumerator()) { "$($kv.Key) -> $($kv.Value)" }
~~~

~~~text الناتج
web -> 3000
api -> 8000
db -> 5432
~~~

نفكّه من جوه لبرة:

1. [[$ports.GetEnumerator()]] بيحوّل الـ hashtable للستة أزواج، كل زوج فيه [[.Key]] و [[.Value]].
2. [[foreach ($kv in ...)]] بيلف على الأزواج، وكل لفة الزوج الحالي اسمه [[$kv]] (اسم انت بتختاره، اختصار key/value).
3. [["$($kv.Key) -> $($kv.Value)"]] نص بيتطبع، و [[$( )]] لازمة لأن فيه نقطة بعد اسم المتغير. والـ [[->]] هنا مجرد حروف في النص، ملهاش معنى في PowerShell.

ليه [[GetEnumerator()]]؟ لأن [[foreach ($kv in $ports)]] من غيرها بيتعامل مع الـ hashtable كحاجة واحدة، فبيلف مرة واحدة بس.

---

## ٤. الـ PSCustomObject

~~~powershell
$server = [PSCustomObject]@{ Name = "api"; Port = 8000; Up = $true }
$server.Port
~~~

~~~text الناتج
8000
~~~

[[[PSCustomObject]]] قبل الـ hashtable بيحوّله لـ **object**: نفس النوع اللي أوامر زي [[Get-Process]] بترجعه. والمفاتيح بقت **خصايص** (properties)، بالترتيب اللي كتبته. ولو كتبت [[$server]] لوحده بيتعرض جدول:

~~~text الناتج
Name Port   Up
---- ----   --
api  8000 True
~~~

---

## ٥. صف لكل خدمة: اللوب بيرجّع لستة objects

~~~powershell
$rows = foreach ($s in $services) { [PSCustomObject]@{ Service = $s; Port = $ports[$s] } }
$rows | Format-Table
~~~

~~~text الناتج
Service Port
------- ----
web     3000
api     8000
db      5432
~~~

نفكّه:

1. [[foreach ($s in $services)]] لف على web و api و db.
2. كل لفة بتعمل object فيه [[Service]] = اسم الخدمة، و [[Port]] = [[$ports[$s]]]، يعني دوّر في الـ hashtable بالاسم ده.
3. الـ object مش متخزن في متغير، فبيطلع output من اللوب.
4. [[$rows = foreach ...]] بيلم كل اللي طلع من اللوب في لستة. [[$rows.Count]] طلع 3.
5. [[| Format-Table]] بيعرضهم جدول، كل object صف وكل خاصية عمود.

---

## ٦. الـ solCode: التصدير لـ CSV

~~~powershell
$rows | Export-Csv services.csv -NoTypeInformation
Get-Content services.csv
~~~

~~~text الناتج
"Service","Port"
"web","3000"
"api","8000"
"db","5432"
~~~

[[Export-Csv]] بيكتب كل object سطر، وأسامي الخصايص أول سطر. و [[-NoTypeInformation]] بيمنع سطر زيادة في أول الملف في 5.1 فيه اسم النوع (في 7 ده الافتراضي أصلًا). وده السبب إننا عملنا PSCustomObject: الـ hashtable مش بيتصدّر صفوف كده.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| لستة بتلف عليها | array [[@( )]] و [[$x[0]]] و [[$x[-1]]] |
| تدوّر بالاسم | hashtable [[@{ }]]، و [[[ordered]]] لو الترتيب يهمك |
| تلف على المفتاح والقيمة | [[.GetEnumerator()]] و [[.Key]] و [[.Value]] |
| صف بيانات يتعرض أو يتصدّر | [[[PSCustomObject]@{ }]] |
| لستة من لوب | [[$rows = foreach (...) { ... }]] |`,
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
          teach: R`## الفكرة: سؤال جوابه True أو False

كل سطر في المثال سؤال، والـ operator هو الكلمة اللي بالشرطة في النص. المثال اتشغّل كملف في PowerShell 7.6 و 5.1 وطلع نفس الناتج بالظبط، وهنمشي عليه بالترتيب.

ليه كلمات مش رموز زي [[==]] و [[>]]؟ لأن [[>]] في PowerShell معناها «اكتب في ملف» زي bash، فالمقارنة اتعملت بكلمات: [[-eq]] من **eq**ual، و [[-gt]] من **g**reater **t**han، وهكذا.

---

## ١. المساواة والكابيتال

~~~powershell
5 -eq 5
"ABC" -eq "abc"
"ABC" -ceq "abc"
~~~

~~~text الناتج
True
True
False
~~~

- [[-eq]] يساوي. [[5 -eq 5]] صح.
- [["ABC" -eq "abc"]] صح كمان، لأن PowerShell **مش بيفرّق** بين الكابيتال والسمول افتراضيًا.
- [[-ceq]]: الـ [[c]] من case-sensitive، يعني فرّق. فبقت False.

وأي operator ليه نسخة بـ [[c]]: [[-clike]] و [[-cmatch]] و [[-ccontains]].

---

## ٢. أكبر وأصغر، وفخ النصوص

~~~powershell
10 -gt 9
"10" -gt "9"
~~~

~~~text الناتج
True
False
~~~

نفس الأرقام، والجواب اتعكس! لأن في السطر التاني الاتنين نصوص (بين علامات تنصيص)، والنصوص بتتقارن **حرف حرف** زي ترتيب القاموس: أول حرف [["1"]] وأول حرف [["9"]]، و 1 قبل 9، فـ "10" أصغر.

القاعدة: **النوع بيتحدد من اللي على الشمال**، واللي على اليمين بيتحوّل له. فـ [[10 -gt "9"]] (رقم على الشمال) طلعت True. ولو القيمة جاية من ملف أو CSV حوّلها: [[[int]$age]].

| الـ operator | معناه |
|---|---|
| [[-eq]] و [[-ne]] | يساوي، مش يساوي |
| [[-gt]] و [[-ge]] | أكبر، أكبر أو يساوي |
| [[-lt]] و [[-le]] | أصغر، أصغر أو يساوي |

---

## ٣. النصوص: [[-like]] و [[-match]]

~~~powershell
"report.pdf" -like "*.pdf"
"v2.15.0" -match '^v(\d+)\.(\d+)'
$Matches[1]
~~~

~~~text الناتج
True
True
2
~~~

### [[-like]]: wildcard

[[*]] يعني «أي حروف، أو مفيش»، و [[?]] حرف واحد. و [[-like]] لازم يطابق النص **كله**: [["report.pdf" -like "pdf"]] طلعت False، لأن pdf لوحدها مش النص كله.

### [[-match]]: regex

| الحتة | معناها |
|---|---|
| [[^v]] | النص بيبدأ بـ v |
| [[(\d+)]] | رقم أو أكتر، والأقواس بتحفظه (مجموعة رقم 1) |
| [[\.]] | نقطة حقيقية |
| [[(\d+)]] | رقم تاني (مجموعة رقم 2) |

و [[-match]] بيدوّر في أي حتة من النص: [["report.pdf" -match "pdf"]] طلعت True.

### [[$Matches]]

لما [[-match]] ينجح، PowerShell بيملى hashtable اسمه [[$Matches]] باللي لقاه:

~~~text الناتج من $Matches
Name                           Value
----                           -----
2                              15
1                              2
0                              v2.15
~~~

[[0]] الحتة كلها اللي اتطابقت، و [[1]] أول مجموعة، و [[2]] التانية. فـ [[$Matches[1]]] = 2.

---

## ٤. اللستات: [[-contains]] و [[-in]]

~~~powershell
@("web", "api") -contains "api"
"api" -in @("web", "api")
~~~

~~~text الناتج
True
True
~~~

نفس السؤال، والفرق مين على الشمال: [[-contains]] اللستة الأول، و [[-in]] العنصر الأول. والاتنين بيقارنوا العنصر **كله**: [["hello world" -contains "world"]] طلعت False، لأن النص اتعامل كلستة فيها عنصر واحد بيساوي "hello world". للبحث جوه نص استخدم [[-like "*world*"]] أو [[-match]].

---

## ٥. array على الشمال = فلتر

~~~powershell
@(1, 5, 8, 12) -gt 4
~~~

~~~text الناتج
5
8
12
~~~

مش True! لما الشمال array، الـ operator بيرجّع **العناصر اللي بتحقق الشرط**. وده بيأثر على [[$null]]:

~~~powershell
$null -eq $x
~~~

~~~text الناتج
True
~~~

[[$x]] مش متعرّف فقيمته [[$null]]، فالجواب True. وبنحط [[$null]] على الشمال عشان لو [[$x]] طلع array، [[$x -eq $null]] هيبقى فلتر يرجّع عناصر مش True أو False.

---

## ٦. الجمع: نفس الفكرة

~~~powershell
"8" + 2
8 + "2"
~~~

~~~text الناتج
82
10
~~~

الشمال نص، فـ [[+]] بقت لزق نصوص: "8" و "2" = "82". والشمال رقم، فالـ "2" اتحوّل رقم واتجمع: 10.

---

## ٧. الـ solCode: الامتداد صورة؟

~~~powershell
$ext = ".JPG"
$ext -in ".jpg", ".jpeg", ".png"
$ext -match '^\.(jpe?g|png)$'
~~~

~~~text الناتج
True
True
~~~

- [[-in]] مع لستة الامتدادات: True رغم إن [[.JPG]] كابيتال، لأن [[-in]] مش بيفرّق.
- الـ regex: [[^\.]] بيبدأ بنقطة، و [[jpe?g]] يعني jpg أو jpeg ([[?]] في regex يعني الحرف اللي قبلي اختياري)، و [[|]] يعني «أو»، و [[$]] آخر النص.

---

## الخلاصة

| السؤال | الـ operator |
|---|---|
| يساوي؟ أكبر؟ | [[-eq]] [[-ne]] [[-gt]] [[-ge]] [[-lt]] [[-le]] |
| بشكل معين؟ | [[-like "*.pdf"]] (لازم النص كله) |
| فيه pattern؟ | [[-match 'regex']] وبعدها [[$Matches]] |
| جوه لستة؟ | [[-contains]] (اللستة على الشمال) أو [[-in]] (العنصر على الشمال) |
| فرّق الكابيتال | ضيف [[c]]: [[-ceq]] |

وافتكر: النوع من الشمال، والـ array على الشمال بتفلتر، و [[$null]] على الشمال دايمًا.`,
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
          teach: R`## الفكرة: السكربت بيختار يعمل إيه

المثال ٣ حتت: [[if]] بـ ٣ احتمالات، و [[if]] بشرطين، و [[switch]] على كلمة اتبعتت للسكربت. اتحفظ [[script.ps1]] واتشغّل في PowerShell 7.6 و 5.1 بكذا شكل، ونفس الناتج في الاتنين.

---

## ١. [[if]] و [[elseif]] و [[else]]

~~~powershell
$port = 3000
if ($port -eq 3000) {
    "Default port"
} elseif ($port -lt 1024) {
    "Needs admin"
} else {
    "Custom port"
}
~~~

~~~text الناتج
Default port
~~~

### الشكل

~~~text
if (الشرط) { الكود لو صح }
elseif (شرط تاني) { الكود لو الأول غلط والتاني صح }
else { الكود لو ولا واحد صح }
~~~

- **الأقواس الهلالية** [[( )]] حوالين الشرط، و **المعقوفة** [[{ }]] حوالين الكود.
- [[$port -eq 3000]]: [[-eq]] يساوي (مش [[==]]). صح، فطبع [[Default port]] ومبصّش على الباقي.
- [[elseif]] و [[else]] اختياريين، وتقدر تحط [[elseif]] كتير.
- [["Default port"]] نص لوحده في سطر، فبيتطبع.

جربت [[$port = 80]]: الأول غلط، والتاني ([[80 -lt 1024]]، [[-lt]] أصغر من) صح، فطبع [[Needs admin]]. ليه 1024؟ لأن البورتات تحت 1024 كانت محجوزة للأدمن تاريخيًا.

---

## ٢. شرطين مع بعض

~~~powershell
if ((Test-Path .env) -and -not (Test-Path .env.example)) {
    "Missing example file"
}
~~~

نفكّه من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[Test-Path .env]] | الملف .env موجود؟ True أو False |
| [[( ... )]] حواليه | نفّذ الأمر الأول وخد ناتجه. من غيرها PowerShell هيفتكر [[-and]] parameter لـ Test-Path |
| [[-not ( ... )]] | اعكس: موجود يبقى False |
| [[-and]] | الاتنين لازم يبقوا صح |
| الأقواس اللي برة | أقواس الـ if نفسها |

يعني «فيه .env ومفيش .env.example». في فولدر فاضي مطبعش حاجة، ولما عملت ملف .env بس طبع [[Missing example file]]. وفيه [[-or]] واحد منهم كفاية، و [[!]] اختصار [[-not]].

---

## ٣. [[switch]]

~~~powershell
switch ($args[0]) {
    "start" { "Starting..." }
    "stop"  { "Stopping..." }
    default { "Usage: script.ps1 start|stop" }
}
~~~

- [[$args]] array فيها الكلام اللي اتكتب بعد اسم السكربت (لو السكربت مفيهوش [[param()]])، و [[$args[0]]] أول كلمة.
- [[switch (القيمة) { }]] بيقارنها بكل سطر جوه بالترتيب. السطر شكله: القيمة، وبعدها الكود بين [[{ }]].
- [[default]] لو ولا واحدة طابقت.

جربته بالأشكال دي:

~~~text الناتج
.\script.ps1          →  Default port
                          Usage: script.ps1 start|stop
.\script.ps1 start    →  Default port
                          Starting...
.\script.ps1 STOP     →  Default port
                          Stopping...
~~~

[[Default port]] بتطلع كل مرة لأنها من الحتة الأولى. و [[STOP]] كابيتال اشتغلت، لأن [[switch]] زي [[-eq]] مش بيفرّق كابيتال وسمول. ومن غير argument، [[$args[0]]] بيبقى [[$null]] فراح لـ [[default]]. والـ [[|]] جوه النص [["start|stop"]] مجرد حرف، مش pipe، لأنه جوه علامات تنصيص.

و [[switch -Wildcard]] بيخليه يقارن بـ [[*]]: جربت [[switch -Wildcard ("app.log") { "*.log" { "log file" } }]] فطبع [[log file]].

---

## ٤. الغلطة اللي في الـ try: [[if (5 > 3)]]

~~~powershell
if (5 > 3) { "yes" }
~~~

مطبعش حاجة، وظهر ملف جديد اسمه [[3]]، جواه [[5]]. [[>]] مش «أكبر من»، دي redirect: «اكتب 5 في ملف اسمه 3». والكتابة ملهاش output، فالشرط اتحسب False. حجم الملف 3 bytes في 7 و 8 في 5.1 (لأن 5.1 بيكتب UTF-16). امسحه بـ [[Remove-Item 3]].

و [[==]] بيطلع error صريح، وده أحسن:

~~~text الناتج من if (5 == 3) في 7
ParserError:
     | The assignment expression is not valid. ...
~~~

---

## الخلاصة

| عايز | اكتب |
|---|---|
| شرط | [[if ($x -eq 1) { } elseif (...) { } else { }]] |
| شرطين | [[-and]] و [[-or]] و [[-not]] |
| أمر جوه شرط | في أقواس: [[(Test-Path .env)]] |
| قيمة واحدة واحتمالات كتير | [[switch ($x) { "a" { } default { } }]] |
| أكبر من | [[-gt]]، مش [[>]] (دي بتعمل ملف) |`,
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
          teach: R`## الفكرة: نفس الكود، كذا مرة

المثال فيه ٤ طرق تكرر بيها كود، وكل واحدة ليها استخدام. اتشغّل كملف في PowerShell 7.6 و 5.1 في فولدر فيه ملفين لوج: [[app.log]] و [[error.log]]، ونفس الناتج في الاتنين.

---

## ١. [[foreach]]: لكل عنصر في لستة

~~~powershell
foreach ($f in Get-ChildItem *.log) {
    "$($f.Name): $($f.Length) bytes"
}
~~~

~~~text الناتج
app.log: 13 bytes
error.log: 122 bytes
~~~

### نفكّه

| الحتة | معناها |
|---|---|
| [[Get-ChildItem *.log]] | هات الملفات اللي آخرها .log. ده بيتنفذ الأول ويرجّع لستة |
| [[foreach ( ... in ... )]] | لف على اللستة دي |
| [[$f]] | اسم انت بتختاره للعنصر الحالي. أول لفة app.log، والتانية error.log |
| [[{ ... }]] | الكود اللي بيتكرر |
| [[$($f.Name)]] | اسم الملف، و [[$( )]] لازمة عشان النقطة جوه النص |
| [[$($f.Length)]] | الحجم بالـ byte |

ليه app.log حجمه 13 مع إن جواه [[hello world]] (11 حرف)؟ لأن آخر الملف فيه سطر جديد، وعلى ويندوز السطر الجديد حرفين (CR و LF)، فـ 11 + 2 = 13.

---

## ٢. [[for]]: عدّاد

~~~powershell
for ($i = 1; $i -le 3; $i++) {
    "Try $i"
}
~~~

~~~text الناتج
Try 1
Try 2
Try 3
~~~

جوه الأقواس ٣ حتت بينهم [[;]]، نفس شكل JavaScript و C:

| الحتة | امتى بتتنفذ | معناها |
|---|---|---|
| [[$i = 1]] | مرة واحدة في الأول | ابدأ من 1 |
| [[$i -le 3]] | قبل كل لفة | كمّل طول ما [[$i]] أصغر من أو يساوي 3 ([[-le]] = less or equal) |
| [[$i++]] | بعد كل لفة | زوّد 1 |

ولو كتبت [[-lt 3]] (أصغر من بس) هتلف مرتين بس.

---

## ٣. [[while]]: طول ما الشرط صح

~~~powershell
$n = 0
while ($n -lt 3) {
    $n++
}
~~~

السطور دي مبتطبعش حاجة، لأن [[$n++]] بيغيّر المتغير من غير output. بعد اللوب [[$n]] بقى 3 (جربت أطبعه). الترتيب:

~~~text اللفات
n = 0  →  0 -lt 3 صح  →  n بقى 1
n = 1  →  1 -lt 3 صح  →  n بقى 2
n = 2  →  2 -lt 3 صح  →  n بقى 3
n = 3  →  3 -lt 3 غلط →  خروج
~~~

لو نسيت [[$n++]]، الشرط هيفضل صح للأبد واللوب مش هيقف (Ctrl+C يوقفه).

---

## ٤. [[ForEach-Object]]: التكرار في pipeline

~~~powershell
1..5 | ForEach-Object { $_ * 2 }
~~~

~~~text الناتج
2
4
6
8
10
~~~

- [[1..5]]: الـ [[..]] بتعمل لستة أرقام من 1 لـ 5.
- [[|]] بيبعتهم واحد واحد للأمر اللي بعده.
- [[ForEach-Object { }]] بينفّذ الكود لكل رقم جاي.
- [[$_]] هو العنصر الحالي في الـ pipeline (زي [[$f]] في foreach بس اسمه ثابت).
- [[* 2]] ضرب.

---

## ٥. [[break]] و [[continue]]

جربت:

~~~powershell
foreach ($i in 1..10) { if ($i -eq 2) { continue }; if ($i -eq 4) { break }; $i }
~~~

~~~text الناتج
1
3
~~~

[[continue]] عند 2 عدّى اللفة دي، و [[break]] عند 4 خرج من اللوب خالص.

---

## ٦. الـ solCode: ٥ فولدرات

~~~powershell
foreach ($i in 1..5) {
    New-Item -ItemType Directory "day$i" -Force | Out-Null
}
Get-ChildItem -Directory day* | Select-Object Name
~~~

~~~text الناتج
Name
----
day1
day2
day3
day4
day5
~~~

- [["day$i"]] اسم الفولدر: day1 لحد day5.
- [[-Force]] متطلعش error لو موجود.
- [[| Out-Null]] بيرمي سطر الوصف اللي New-Item بيطبعه، عشان الشاشة متتملاش.
- [[Get-ChildItem -Directory day*]] فولدرات بس اسمها بيبدأ بـ day، و [[Select-Object Name]] عمود الاسم بس.

---

## الخلاصة

| اللوب | امتى |
|---|---|
| [[foreach ($x in $list) { }]] | لكل عنصر في لستة (الأكتر استخدامًا) |
| [[for ($i = 1; $i -le 3; $i++) { }]] | عدّاد بعدد معروف |
| [[while (شرط) { }]] | لحد ما حاجة تتغيّر، وافتكر تغيّرها جوه |
| [[1..5 | ForEach-Object { $_ * 2 }]] | جوه pipeline، و [[$_]] العنصر الحالي |
| [[break]] و [[continue]] | اخرج، أو عدّي اللفة دي |`,
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

[[return $value]] بيرجع قيمة. أو تكتب القيمة من غير return: أي قيمة مش متخزنة في متغير بترجع، مش آخر سطر بس. و [[return]] بيخرج من الفانكشن على طول.

[[CmdletBinding()]] بيضيف behavior زي الـ cmdlets: [[-Verbose]] و [[-ErrorAction]]، و [[-WhatIf]] لو كتبتها [[CmdletBinding(SupportsShouldProcess)]] (درس [CmdletBinding()]).

وfunction ممكن ترجع objects، وأي حاجة تطبعها في الـ function بترجع كـ output في الـ pipeline (مش لازم return).`,
            when: "كود بيتكرر. منطق التحقق. تنظيم السكربت.",
            mistakes: "كتابة الناتج بـ Write-Host في function وتتوقع توصلك في pipeline. Write-Host بيكتب على الشاشة بس. استخدم Write-Output أو خليها بدون كلمة."
          },
          teach: R`## الفكرة: اسم لحتة كود، وبتناديها زي أي أمر

المثال بيعرّف فانكشن اسمها [[Get-FolderSize]] بتحسب حجم فولدر بالميجا، وبعدين يناديها. اتجرّب في PowerShell 7.6 و 5.1 على فولدر [[node_modules]] تجريبي فيه ملفين: واحد 3 ميجا وواحد نص ميجا. ونفس الناتج في الاتنين.

---

## ١. التعريف: [[function Get-FolderSize { ... }]]

~~~powershell
function Get-FolderSize {
    ...
}
~~~

[[function]] كلمة بتقول «هعرّف فانكشن»، وبعدها الاسم، وبعدها الكود بين [[{ }]]. التعريف نفسه مبيشغّلش حاجة ومبيطبعش حاجة، هو بس بيحفظ الكود تحت الاسم ده.

والاسم [[Get-FolderSize]] بشكل **Verb-Noun** زي أوامر PowerShell: [[Get]] فعل («هات»)، و [[FolderSize]] الحاجة. فلما حد يشوف الاسم يعرف هي بتعمل إيه.

---

## ٢. الـ parameters: [[param( )]]

~~~powershell
    param(
        [Parameter(Mandatory)]
        [string]$Path
    )
~~~

| الحتة | معناها |
|---|---|
| [[param( )]] | هنا بتتعرّف القيم اللي الفانكشن بتاخدها |
| [[[Parameter(Mandatory)]]] | الـ parameter اللي تحته إجباري |
| [[[string]]] | نوعه نص |
| [[$Path]] | اسمه. وده نفسه اللي بتكتبه وانت بتنادي: [[-Path]] |

ولو ناديتها من غير [[-Path]]: في نافذة عادية PowerShell بيسألك [[Path:]] ويستنى تكتب. ولو مفيش حد يكتب (جربت بـ [[pwsh -NonInteractive]]) بيطلع:

~~~text الناتج
Get-FolderSize: Cannot process command because of one or more missing mandatory parameters: Path.
~~~

---

## ٣. الحساب: السطر الطويل

~~~powershell
    $bytes = (Get-ChildItem $Path -Recurse -File | Measure-Object Length -Sum).Sum
~~~

نفكّه من جوه لبرة:

### الخطوة ١: [[Get-ChildItem $Path -Recurse -File]]

هات كل الملفات في الفولدر، و [[-Recurse]] يعني كمان اللي في الفولدرات اللي جواه، و [[-File]] ملفات بس من غير الفولدرات نفسها.

### الخطوة ٢: [[| Measure-Object Length -Sum]]

[[Measure-Object]] بيحسب على خاصية: هنا [[Length]] (حجم الملف بالـ byte)، و [[-Sum]] اجمعهم. لو شغلته لوحده:

~~~text الناتج
Count             : 2
Average           :
Sum               : 3670016
Maximum           :
Minimum           :
StandardDeviation :
Property          : Length
~~~

([[StandardDeviation]] بيظهر في 7 بس.) طلع object فيه خانات كتير، وإحنا عايزين [[Sum]].

### الخطوة ٣: [[( ... ).Sum]]

الأقواس بتنفّذ الـ pipeline الأول، والنقطة بتاخد خانة [[Sum]] منه: [[3670016]]. وده بيتحط في [[$bytes]].

---

## ٤. التحويل لميجا: [[[math]::Round($bytes / 1MB, 2)]]

~~~powershell
    [math]::Round($bytes / 1MB, 2)
~~~

- [[1MB]] PowerShell فاهمه كرقم: 1048576 byte. فـ [[3670016 / 1MB]] = [[3.5]] (3 ميجا ونص بالظبط).
- [[[math]]] الـ class بتاعة الحسابات في .NET، و [[::]] معناها «هات منها الحاجة دي»، و [[Round(x, 2)]] قرّب لرقمين بعد العلامة.

والسطر ده **مش متخزن في متغير**، فناتجه بيطلع output من الفانكشن. مفيش [[return]]: أي قيمة لوحدها في سطر بتبقى جزء من اللي الفانكشن بترجعه.

---

## ٥. النداء

~~~powershell
Get-FolderSize -Path .\node_modules
~~~

~~~text الناتج
3.5
~~~

ولأنها بترجع قيمة حقيقية، تقدر تخزنها: [[$r = Get-FolderSize .\node_modules]] حطت [[3.5]] في [[$r]] ونوعها [[Double]] (رقم بكسور). و [[.\node_modules]] من غير [[-Path]] اشتغلت لأنه أول parameter.

> الفانكشن لازم تتعرّف **قبل** ما تناديها في السكربت، لأن PowerShell بيقرا الملف من فوق لتحت.

---

## ٦. الـ solCode: [[Test-Tool]]

~~~powershell
function Test-Tool {
    param(
        [Parameter(Mandatory)]
        [string]$Name
    )
    [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

Test-Tool node
Test-Tool nosuchtool
~~~

~~~text الناتج
True
False
~~~

السطر المهم من جوه لبرة:

1. [[Get-Command $Name]] بيدوّر على أمر أو برنامج بالاسم ده. لو لقاه بيرجّع وصفه.
2. [[-ErrorAction SilentlyContinue]] لو ملقاهوش، متطبعش error ورجّع ولا حاجة.
3. [[[bool]( ... )]] حوّل الناتج لـ True أو False: أي حاجة موجودة = True، وولا حاجة = False.

---

## ٧. مفاجأة الـ output

أي أمر جوه الفانكشن بيطبع حاجة، اللي طبعه بيبقى جزء من الناتج. جربت:

~~~powershell
function New-Thing { New-Item -ItemType Directory .\thing -Force; "done" }
$x = New-Thing
$x.Count
~~~

~~~text الناتج
2
~~~

[[$x]] فيه حاجتين: الفولدر اللي New-Item رجّعه، و [["done"]]. الحل: [[New-Item ... | Out-Null]] عشان ترمي ناتجه.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[function Verb-Noun { }]] | التعريف، قبل النداء |
| [[param([string]$X)]] | الـ parameters، وتتنادي [[-X]] |
| [[[Parameter(Mandatory)]]] | إجباري، وإلا يسأل |
| أي قيمة لوحدها في سطر | بترجع من الفانكشن (مش محتاج return) |
| [[| Out-Null]] | ارمي ناتج أمر مش عايزه يرجع |`,
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
            mistakes: "تستخدم Write-Host لـ output هتحتاجه في pipeline. والعكس: تسيب قيمة من غير ما تخزنها وانت مش عايزها تدخل الـ pipeline، فتلاقيها جزء من اللي الفانكشن بترجعه."
          },
          teach: R`## الفكرة: «اطبع للإنسان» غير «رجّع للكود»

المثال فانكشنين شبه بعض بالظبط: الاتنين بيطلّعوا [[hi]] على الشاشة. بس واحدة منهم القيمة بتوصل للكود اللي ناداها، والتانية لأ. وبنعدّ اللي وصل بـ [[Measure-Object]] عشان نشوف الفرق. اتشغّل كملف في PowerShell 7.6 و 5.1 ونفس الناتج.

---

## ١. الفانكشنين

~~~powershell
function Show-Greeting { Write-Host "hi" }
function Get-Greeting { "hi" }
~~~

- [[Show-Greeting]]: [[Write-Host]] بيكتب على **الشاشة** مباشرة.
- [[Get-Greeting]]: [["hi"]] نص لوحده، فبيطلع **output**. يعني بيروح للـ pipeline: للأمر اللي بعده، أو لمتغير، ولو مفيش حاجة بيتطبع على الشاشة.

السطرين دول تعريف بس، مبيطبعوش حاجة.

---

## ٢. نعدّ اللي وصل

~~~powershell
(Show-Greeting | Measure-Object).Count
~~~

~~~text الناتج
hi
0
~~~

من جوه لبرة:

1. [[Show-Greeting]] اتنفذت، و [[Write-Host]] كتب [[hi]] على الشاشة على طول. ده السطر الأول في الناتج.
2. [[|]] بيبعت الـ output لـ [[Measure-Object]]. بس الفانكشن ملهاش output، فوصل **ولا حاجة**.
3. [[Measure-Object]] عدّ اللي وصله: صفر.
4. [[( ... ).Count]] الأقواس بتنفّذ الكلام ده وتاخد خانة [[Count]]: [[0]].

~~~powershell
(Get-Greeting | Measure-Object).Count
~~~

~~~text الناتج
1
~~~

هنا [[hi]] **متطبعتش**، لأنها راحت في الـ pipe لـ Measure-Object، فاتعدّت: 1. ده الفرق كله.

---

## ٣. نفس الفرق مع متغير

جربت:

~~~powershell
$a = Show-Greeting
$b = Get-Greeting
~~~

السطر الأول طبع [[hi]] على الشاشة و [[$a]] فضل [[$null]] (جربت [[$null -eq $a]] فطلع True). والتاني مطبعش حاجة، و [[$b]] فيه [[hi]]. فلو فانكشن المفروض ترجّع داتا وبتستخدم Write-Host، المتغير هيبقى فاضي.

---

## ٤. أنواع الرسايل التانية

| الأمر | بيروح فين | بيظهر امتى |
|---|---|---|
| قيمة لوحدها أو [[Write-Output]] | الـ pipeline (الـ output) | لو مفيش حد استلمه |
| [[Write-Host]] | الشاشة (information stream) | دايمًا، وبألوان: [[-ForegroundColor Green]] |
| [[Write-Verbose]] | رسايل تفاصيل | بس مع [[-Verbose]] |
| [[Write-Warning]] | تحذير | دايمًا، بالأصفر وقبله [[WARNING:]] |

جربت [[Write-Verbose "details"]] من غير حاجة فمطبعش حاجة، و [[Write-Verbose "details shown" -Verbose]] طبع [[VERBOSE: details shown]]، و [[Write-Warning "careful"]] طبع [[WARNING: careful]].

---

## ٥. لو محتاج تمسك Write-Host

من PowerShell 5، Write-Host بيكتب في stream رقم 6 (اسمه information). و [[6>&1]] معناها «حوّل stream رقم 6 للـ output (رقم 1)»:

~~~powershell
(Show-Greeting 6>&1 | Measure-Object).Count
~~~

~~~text الناتج
1
~~~

بس ده ترقيع. الصح إن الفانكشن ترجّع output من الأول.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| داتا هتتخزن أو تتبعت لأمر تاني | القيمة لوحدها أو [[Write-Output]] |
| رسالة للي قاعد قدام الشاشة | [[Write-Host]] (وبألوان) |
| تفاصيل لما تصلّح | [[Write-Verbose]] |
| تحذير | [[Write-Warning]] |`,
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
    }
]);
