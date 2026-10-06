// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
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
          teach: R`## الفكرة: السكربت يبقى أمر ليه parameters

بدل ما تعدّل قيم جوه السكربت كل مرة، [[param( )]] بيخلي اللي بيشغّله يبعتها: [[.\deploy.ps1 -Project shop -Stage prod]]. وكمان بيتأكد منها **قبل** ما أول سطر يشتغل. المثال اتحفظ [[deploy.ps1]] واتشغّل في PowerShell 7.6 و 5.1 بكل الأشكال اللي تحت.

---

## ١. الهيكل

~~~text
param(
    parameter,
    parameter,
    parameter
)
~~~

[[param( )]] لازم يبقى **أول حاجة في الملف** (التعليقات بس مسموح قبله). وجواه الـ parameters مفصولين بـ **فواصل**. والسطور الفاضية بينهم للقراية بس.

وكل parameter ممكن يبقى فوقه سطر أو أكتر بين [[[ ]]] اسمهم attributes، يعني «قواعد» للـ parameter اللي تحتهم على طول.

---

## ٢. [[Project]]: إجباري

~~~powershell
    [Parameter(Mandatory)]
    [string]$Project,
~~~

- [[[Parameter(Mandatory)]]] قاعدة: لازم يتبعت.
- [[[string]]] نوعه نص.
- [[$Project]] اسم المتغير جوه السكربت، وهو نفسه [[-Project]] وانت بتشغّل.
- الفاصلة في الآخر: فيه parameter بعده.

من غيره، في نافذة عادية بيسألك [[Project:]] ويستنى. ولو مفيش حد يكتب (جربت بـ [[-NonInteractive]]):

~~~text الناتج
deploy.ps1: Cannot process command because of one or more missing mandatory parameters: Project.
~~~

---

## ٣. [[Stage]]: من لستة بس، وليه افتراضي

~~~powershell
    [ValidateSet("dev", "staging", "prod")]
    [string]$Stage = "dev",
~~~

- [[[ValidateSet(...)]]] مسموح بالقيم دي بس. وبيدّيك Tab completion: اكتب [[-Stage ]] ودوس Tab هيلف على التلاتة.
- [[= "dev"]] القيمة لو محدش بعت [[-Stage]].

جربت [[-Stage live]]:

~~~text الناتج (PowerShell 7)
deploy.ps1: Cannot validate argument on parameter 'Stage'. The argument "live" does not belong to the set "dev,staging,prod" specified by the ValidateSet attribute. ...
~~~

ولا سطر في السكربت اتنفذ. ولاحظ: [[-Stage PROD]] كابيتال **اتقبلت**، وطبعت [[Stage: PROD]] زي ما اتكتبت، لأن ValidateSet مش بيفرّق كابيتال وسمول.

---

## ٤. [[Port]]: رقم في رينج

~~~powershell
    [ValidateRange(1, 65535)]
    [int]$Port = 3000,
~~~

[[[int]]] رقم صحيح، و [[[ValidateRange(1, 65535)]]] من 1 لـ 65535 (أكبر رقم بورت ممكن، لأن البورت بيتشال في 16 bit). جربت:

~~~text الناتج
-Port 70000  →  Cannot validate argument on parameter 'Port'. The 70000 argument is greater than the maximum allowed range of 65535. ...
-Port abc    →  Cannot process argument transformation on parameter 'Port'. Cannot convert value "abc" to type "System.Int32". ...
~~~

التاني جه من [[[int]]] نفسه: "abc" مينفعش تبقى رقم.

---

## ٥. [[Force]]: مفتاح

~~~powershell
    [switch]$Force
)
~~~

[[[switch]]] ملوش قيمة بعده: لو كتبت [[-Force]] يبقى True، ولو لأ يبقى False. ومفيش فاصلة بعده لأنه آخر واحد، وبعده [[)]] بتقفل [[param]].

---

## ٦. استخدام القيم

~~~powershell
"Project: $Project | Stage: $Stage | Port: $Port | Force: $Force"
if ($Force) { "Skipping checks" }
~~~

بعد [[param]] الـ parameters متغيرات عادية. والـ [[|]] جوه النص مجرد حرف. و [[if ($Force)]] بيقرا الـ switch كـ True أو False.

~~~text الناتج من .\deploy.ps1 -Project shop
Project: shop | Stage: dev | Port: 3000 | Force: False
~~~

~~~text الناتج من .\deploy.ps1 -Project shop -Stage prod -Force
Project: shop | Stage: prod | Port: 3000 | Force: True
Skipping checks
~~~

---

## ٧. طرق تانية تبعت بيها

| الشكل | النتيجة |
|---|---|
| [[.\deploy.ps1 shop prod]] | من غير أسامي، بالترتيب: Project = shop و Stage = prod |
| [[.\deploy.ps1 -Proj shop -St staging]] | أسامي مختصرة، تنفع طول ما مش ملخبطة مع parameter تاني |

الاتنين اشتغلوا في 7 و 5.1. بس في السكربتات اكتب الأسامي كاملة عشان اللي يقرا يفهم.

---

## الخلاصة

| عايز | اكتب فوق الـ parameter أو جنبه |
|---|---|
| إجباري | [[[Parameter(Mandatory)]]] |
| نوع | [[[string]]] أو [[[int]]] |
| قيمة افتراضية | [[$Stage = "dev"]] |
| قيم محددة | [[[ValidateSet("a", "b")]]] |
| رينج أرقام | [[[ValidateRange(1, 65535)]]] |
| مفتاح من غير قيمة | [[[switch]$Force]] |

و [[param]] أول حاجة في الملف، والفواصل بين الـ parameters.`,
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
          teach: R`## الفكرة: سكربتك ياخد [[-Verbose]] و [[-WhatIf]] ببلاش

المثال سكربت [[clear-logs.ps1]] بيمسح ملفات [[.log]] من فولدر. بسطر واحد فوق [[param]]، بقى يعرف يقولك «هيمسح إيه» من غير ما يمسح ([[-WhatIf]])، ويطبع تفاصيل لو طلبتها ([[-Verbose]]). اتجرّب في PowerShell 7.6 و 5.1 على فولدر [[logs]] فيه [[a.log]] و [[b.log]] و [[notes.txt]]، ونفس الناتج.

---

## ١. السطر الأول: [[[CmdletBinding(SupportsShouldProcess)]]]

~~~powershell
[CmdletBinding(SupportsShouldProcess)]
~~~

| الحتة | معناها |
|---|---|
| [[[CmdletBinding()]]] | خلّي السكربت «advanced script»: يتصرف زي أوامر PowerShell الأصلية |
| [[SupportsShouldProcess]] | وكمان يدعم [[-WhatIf]] و [[-Confirm]] |

عشان تشوف اللي اتضاف، سألت PowerShell عن الـ parameters بتاعة السكربت ([[(Get-Command .\clear-logs.ps1).Parameters.Keys]] في 7):

~~~text الناتج
Path Verbose Debug ErrorAction WarningAction InformationAction ProgressAction ErrorVariable WarningVariable InformationVariable OutVariable OutBuffer PipelineVariable WhatIf Confirm
~~~

إنت كتبت [[Path]] بس، والباقي كله جه من السطر ده. ولازم [[param( )]] بعده على طول، حتى لو فاضية.

---

## ٢. الـ parameter: [[$Path]]

~~~powershell
param(
    [string]$Path = ".\logs"
)
~~~

فولدر اللوجات، والافتراضي [[.\logs]] (فولدر اسمه logs جنبك).

---

## ٣. هات الملفات وقول لقيت كام

~~~powershell
$files = Get-ChildItem $Path -Filter *.log -File
Write-Verbose "Found $($files.Count) log files in $Path"
~~~

- [[Get-ChildItem $Path]] محتوى الفولدر، و [[-Filter *.log]] اللي آخره .log بس، و [[-File]] ملفات مش فولدرات. فـ [[notes.txt]] مش هتيجي.
- [[Write-Verbose]] رسالة **مستخبية**: مبتظهرش غير لو اللي شغّل السكربت كتب [[-Verbose]]. ودي اشتغلت لأن [[CmdletBinding]] هو اللي ضاف [[-Verbose]].

---

## ٤. اسأل قبل كل مسح: [[$PSCmdlet.ShouldProcess]]

~~~powershell
foreach ($f in $files) {
    if ($PSCmdlet.ShouldProcess($f.Name, "Delete log")) {
        Remove-Item $f.FullName
    }
}
~~~

- [[foreach ($f in $files)]] لكل ملف.
- [[$PSCmdlet]] متغير موجود بس في الـ advanced scripts، بيمثّل السكربت نفسه.
- [[.ShouldProcess(الهدف, العملية)]] السؤال «أعمل العملية دي على الهدف ده؟». الهدف [[$f.Name]] (اسم الملف)، والعملية [["Delete log"]] (الكلام اللي هيتطبع).
- لو الجواب True: [[Remove-Item $f.FullName]] يمسح. و [[.FullName]] المسار الكامل، عشان يشتغل من أي مكان.

ShouldProcess بترجع إيه؟

| شغّلت بـ | بترجع | وبتطبع |
|---|---|---|
| ولا حاجة | True، فبيمسح | ولا حاجة |
| [[-WhatIf]] | False، فمبيمسحش | [[What if: Performing the operation "Delete log" on target "a.log".]] |
| [[-Verbose]] | True | نفس السطر بس بيبدأ بـ [[VERBOSE:]] |
| [[-Confirm]] | حسب ردك | بتسألك Y أو N أو A |

---

## ٥. التجربة

~~~powershell
.\clear-logs.ps1 -WhatIf
~~~

~~~text الناتج
What if: Performing the operation "Delete log" on target "a.log".
What if: Performing the operation "Delete log" on target "b.log".
~~~

وبعدها الفولدر لسه فيه [[a.log, b.log, notes.txt]]. يعني اتفرّجت بس.

~~~powershell
.\clear-logs.ps1 -Verbose
~~~

~~~text الناتج
VERBOSE: Found 2 log files in .\logs
VERBOSE: Performing the operation "Delete log" on target "a.log".
VERBOSE: Performing the operation "Delete log" on target "b.log".
~~~

وبعدها الفولدر فيه [[notes.txt]] بس. ولو شغلته تاني: [[VERBOSE: Found 0 log files in .\logs]] من غير error.

---

## ٦. بونص: بيرفض الـ arguments الغلط

~~~text الناتج من .\clear-logs.ps1 -Extra b
clear-logs.ps1: A parameter cannot be found that matches parameter name 'Extra'.
~~~

من غير [[CmdletBinding]]، الـ [[-Extra b]] كانت هتتحط في [[$args]] بسكات والسكربت يكمّل.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| [[-Verbose]] وباقي الـ parameters المشتركة | [[[CmdletBinding()]]] فوق [[param()]] |
| [[-WhatIf]] و [[-Confirm]] | [[[CmdletBinding(SupportsShouldProcess)]]] |
| قبل أي تغيير | [[if ($PSCmdlet.ShouldProcess("الهدف", "العملية")) { ... }]] |
| رسايل تفاصيل | [[Write-Verbose]] |

والعادة الآمنة: [[-WhatIf]] الأول، وبعدين من غيرها.`,
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
          teach: R`## الفكرة: الـ parameters في hashtable، والأمر ياخدهم بـ [[@]]

بدل [[Copy-Item -Path .\src -Destination .\src_copy -Recurse -Force]] في سطر طويل، بتحط كل parameter كمفتاح وقيمة في hashtable، وتبعته بـ [[@]]. المثال فيه ٣ أشكال: hashtable كامل، و hashtable بيتبني بشرط، و array لبرنامج خارجي، وفي الآخر البديل القديم (الـ backtick). اتجرّب في PowerShell 7.6 و 5.1 في فولدر فيه [[src\a.txt]] و [[src\sub\b.txt]] وريبو git فيه ٣ commits.

---

## ١. hashtable كامل

~~~powershell
$copy = @{
    Path        = ".\src"
    Destination = ".\src_copy"
    Recurse     = $true
    Force       = $true
}
Copy-Item @copy
~~~

### الـ hashtable

[[@{ }]] على كذا سطر، فمش محتاج [[;]] بين العناصر: كل سطر عنصر. والمسافات قبل [[=]] للترتيب بس.

| المفتاح | بيبقى | ليه كده |
|---|---|---|
| [[Path = ".\src"]] | [[-Path .\src]] | المفتاح اسم الـ parameter **من غير شرطة** |
| [[Destination = ".\src_copy"]] | [[-Destination .\src_copy]] | |
| [[Recurse = $true]] | [[-Recurse]] | الـ switch بيتكتب [[$true]] |
| [[Force = $true]] | [[-Force]] | |

### [[Copy-Item @copy]]

الـ [[@]] بدل [[$]] معناها «افرد الـ hashtable ده parameters». فالسطر ده بالظبط زي ما تكون كتبت الأمر الطويل. ومبيطبعش حاجة، بس [[src_copy]] اتعمل وجواه [[a.txt]] و [[sub\b.txt]].

ولو كتبت [[$copy]] بالدولار، الـ hashtable كله اتبعت كقيمة واحدة لأول parameter (Path):

~~~text الناتج من Copy-Item $copy
Copy-Item: Cannot find path '...\System.Collections.Hashtable' because it does not exist.
~~~

---

## ٢. تبني الـ parameters بشرط

~~~powershell
$params = @{ Path = "."; File = $true }
$deep = $true
if ($deep) { $params.Recurse = $true }
(Get-ChildItem @params).Count
~~~

~~~text الناتج
6
~~~

1. [[$params]] فيه [[Path]] و [[File]] (على سطر واحد، فـ [[;]] بينهم).
2. [[$deep]] شرط (ثابت هنا عشان المثال).
3. لو صح، [[$params.Recurse = $true]] بيضيف مفتاح جديد.
4. [[Get-ChildItem @params]] بقى [[Get-ChildItem -Path . -File -Recurse]]، و [[( ).Count]] عدد الملفات.

ليه 6؟ الفولدر واللي تحته فيه: [[sp.ps1]] (السكربت) و [[README.md]] و [[src\a.txt]] و [[src\sub\b.txt]] ونسختهم في [[src_copy]]. والـ [[.git]] مستخبي فمش بيتعد.

الفايدة: من غير splatting كنت هتكتب الأمر مرتين، مرة في [[if]] ومرة في [[else]].

---

## ٣. array لبرنامج خارجي

~~~powershell
$gitArgs = @("log", "--oneline", "-n", "3")
git @gitArgs
~~~

~~~text الناتج
d30a92a Fix typo
5322f80 Add readme
0e8c1cf Add src
~~~

مع array، [[@]] بيبعت كل عنصر argument لوحده بالترتيب، فده زي [[git log --oneline -n 3]] بالظبط: [[--oneline]] كل commit في سطر، و [[-n 3]] آخر ٣ بس. (الأرقام اللي على الشمال بتختلف من ريبو للتاني.)

---

## ٤. البديل القديم: backtick في آخر السطر

~~~powershell
Get-ChildItem -Path . $__bt
    -Filter *.txt $__bt
    -Recurse
~~~

الـ backtick في **آخر** السطر معناه «الأمر مكمّل تحت». فدول ٣ سطور بس أمر واحد: هات ملفات .txt في الفولدر واللي تحته. طبع [[a.txt]] و [[b.txt]] من [[src]] ومن [[src_copy]].

المشكلة: لازم يبقى **آخر حرف** بالظبط. جربت أحط مسافة واحدة بعده:

~~~text الناتج
-Recurse: The term '-Recurse' is not recognized as a name of a cmdlet, function, script file, or executable program.
~~~

السطر الأول اتنفذ لوحده من غير [[-Recurse]]، والسطر التاني اتنفذ كأنه أمر اسمه [[-Recurse]]. والمسافة دي مش باينة في أي محرر، عشان كده splatting أأمن.

---

## ٥. الـ solCode: [[Compress-Archive]] بـ splatting

~~~powershell
$zip = @{
    Path            = ".\src\*"
    DestinationPath = ".\src.zip"
    Force           = $true
}
Compress-Archive @zip
Get-Item .\src.zip | Select-Object Name, Length
~~~

~~~text الناتج
Name   : src.zip
Length : 216
~~~

- [[".\src\*"]] بالنجمة: محتوى src، مش الفولدر نفسه.
- [[Force = $true]] لو الـ zip موجود اكتب فوقه.
- [[Length]] حجم الـ zip بالـ byte (طلع 216 في الاتنين).

---

## الخلاصة

| عايز | اكتب |
|---|---|
| parameters في hashtable | [[@{ Path = "."; Recurse = $true }]] (من غير شرطة، والـ switch بـ [[$true]]) |
| ابعتهم | [[Command @name]] (بالـ [[@]] مش [[$]]) |
| زوّد واحد بشرط | [[$name.Key = value]] قبل الأمر |
| arguments لبرنامج خارجي | array: [[git @gitArgs]] |
| أمر طويل من غير splatting | backtick آخر حرف في السطر، أو اكسر بعد [[|]] |`,
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
          teach: R`## الفكرة: فانكشن بتستلم من [[|]] واحد واحد

[[Get-FileReport]] بتستلم ملفات من الـ pipe، وتطلّع لكل ملف صف فيه اسمه وحجمه بالكيلو، وفي الآخر تقول المجموع. اتجرّب في PowerShell 7.6 و 5.1 في فولدر فيه ٣ ملفات: [[big.bin]] (3 ميجا) و [[notes.txt]] و [[small.txt]].

---

## ١. التعريف و [[[CmdletBinding()]]]

~~~powershell
function Get-FileReport {
    [CmdletBinding()]
~~~

فانكشن باسم Verb-Noun، و [[[CmdletBinding()]]] بيخليها تاخد [[-Verbose]] زي أي أمر (درس [CmdletBinding()])، عشان رسالة المجموع في الآخر.

---

## ٢. الـ parameter اللي بيستلم من الـ pipe

~~~powershell
    param(
        [Parameter(Mandatory, ValueFromPipeline)]
        [System.IO.FileInfo]$File
    )
~~~

| الحتة | معناها |
|---|---|
| [[Mandatory]] | إجباري |
| [[ValueFromPipeline]] | أي object جاي من [[|]] يتحط هنا. ده اللي بيخلي الفانكشن تتحط بعد pipe |
| [[[System.IO.FileInfo]]] | النوع: «ملف» بالظبط. ده نفس النوع اللي [[Get-ChildItem]] بيرجّعه للملفات |
| [[$File]] | الاسم |

ولأن النوع ملف، لو بعتلها فولدر بترفضه:

~~~text الناتج من Get-Item .\sub | Get-FileReport (في 7)
Get-FileReport: The input object cannot be bound to any parameters for the command either because the command does not take pipeline input or the input and its properties do not match any of the parameters that take pipeline input.
~~~

---

## ٣. التلات بلوكات: [[begin]] و [[process]] و [[end]]

~~~powershell
    begin   { $total = 0 }
    process {
        $total += $File.Length
        [PSCustomObject]@{ Name = $File.Name; KB = [math]::Round($File.Length / 1KB, 1) }
    }
    end     { Write-Verbose "Total: $([math]::Round($total / 1MB, 2)) MB" }
~~~

ترتيب التنفيذ لما ٣ ملفات يعدّوا في الـ pipe:

~~~text الترتيب
begin                         مرة واحدة:  total = 0
process   (big.bin)           total = 3145728       وطلّع صف
process   (notes.txt)         total = 3147230       وطلّع صف
process   (small.txt)         total = 3149278       وطلّع صف
end                           مرة واحدة:  اطبع المجموع
~~~

### جوه [[process]]

- [[$total += $File.Length]]: زوّد حجم الملف ده (بالـ byte) على المجموع.
- [[[PSCustomObject]@{ ... }]] صف بخاصيتين: [[Name]] اسم الملف، و [[KB]] الحجم بالكيلو. [[1KB]] = 1024، و [[[math]::Round(..., 1)]] رقم واحد بعد العلامة.
- الصف مش متخزن، فبيطلع output **على طول** للي بعد الفانكشن في الـ pipe، من غير ما يستنى باقي الملفات.

### جوه [[end]]

[[$total / 1MB]] المجموع بالميجا: 3149278 / 1048576 = 3.003...، و [[Round(..., 2)]] خلاها [[3]]. و [[Write-Verbose]] فمش هتظهر غير مع [[-Verbose]].

---

## ٤. النداء من pipe

~~~powershell
Get-ChildItem -File | Get-FileReport -Verbose
~~~

~~~text الناتج (PowerShell 7)
VERBOSE: Total: 3 MB
Name           KB
----           --
big.bin   3072.00
notes.txt    1.50
small.txt    2.00
~~~

- 3072 = 3 ميجا × 1024. و [[notes.txt]] حجمه 1502 byte = 1.5 كيلو تقريبًا.
- 5.1 عرض الأرقام [[3072]] و [[1.5]] و [[2]] من غير الأصفار، نفس القيم.
- رسالة [[VERBOSE]] ظهرت **فوق** الجدول مع إن [[end]] اتنفذ في الآخر. ده من العرض: الجدول بيستنى شوية صفوف يحسب عرض الأعمدة، والرسايل بتسبقه على الشاشة.

---

## ٥. النداء العادي

~~~powershell
Get-FileReport -File (Get-Item .\notes.txt)
~~~

~~~text الناتج
notes.txt    1.50
~~~

[[(Get-Item .\notes.txt)]] بيجيب الملف الأول، وبيتبعت لـ [[-File]] مباشرة. والبلوكات التلاتة اتنفذت مرة واحدة كل واحد.

---

## ٦. الـ try: من غير [[process]]

شلت كلمة [[process]] وسبت السطرين بتوعها بره أي بلوك:

~~~text الناتج
Name        KB
----        --
small.txt 2.00
~~~

صف واحد بس، لآخر ملف. الكود اللي بره البلوكات بيتعامل كأنه [[end]]: بيتنفذ مرة واحدة بعد ما كل الملفات عدّت، و [[$File]] ساعتها شايل آخر واحد.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[ValueFromPipeline]] | الـ parameter بيستلم كل object جاي من [[|]] |
| النوع ([[[System.IO.FileInfo]]]) | بيرفض أي حاجة مش من النوع ده |
| [[begin { }]] | مرة قبل الأول: تجهيز |
| [[process { }]] | مرة لكل object، وده المهم |
| [[end { }]] | مرة بعد الآخر: ملخص |`,
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
          teach: R`## الفكرة: ٣ ملفات، وكل واحد بيتحمّل بطريقة

المثال مش ملف واحد، ده **٣ ملفات**، وكل تعليق [[#]] فوق كل جزء هو اسم الملف:

~~~text الملفات
backup.ps1             السكربت الأساسي
tools\MyTools.psm1     موديول: فانكشنز مشتركة
tools\helpers.ps1      ملف helpers بيتعمله dot-source
~~~

اعملهم كده وشغّل [[backup.ps1]]. اتجرّب في PowerShell 7.6 و 5.1، وشغّلته من [[C:\]] بالمسار الكامل عشان أتأكد إن المسارات شغالة من أي مكان.

---

## ١. الموديول: [[tools\MyTools.psm1]]

~~~powershell
function Get-Stamp { Get-Date -Format "yyyy-MM-dd_HH-mm" }
function Write-Log { param([string]$Message) "[$(Get-Stamp)] $Message" }
function Get-Secret { "internal" }
Export-ModuleMember -Function Get-Stamp, Write-Log
~~~

الامتداد [[.psm1]] (الـ m من module) معناه «ده موديول»: ملف فيه فانكشنز بيتحمّل بـ [[Import-Module]].

| السطر | بيعمل إيه |
|---|---|
| [[Get-Stamp]] | بترجع التاريخ والوقت كنص زي [[2026-10-06_09-39]] |
| [[Write-Log]] | بتاخد رسالة وترجعها وقبلها الوقت بين [[[ ]]]. و [[$(Get-Stamp)]] بتنادي اللي فوقها جوه النص |
| [[Get-Secret]] | فانكشن داخلية |
| [[Export-ModuleMember -Function ...]] | مين يبان بره الموديول: الاتنين دول بس |

---

## ٢. ملف الـ helpers: [[tools\helpers.ps1]]

~~~powershell
$AppName = "shop"
function Get-AppName { $AppName }
~~~

ملف [[.ps1]] عادي فيه متغير وفانكشن بترجعه. مش موديول، فمفيهوش Export.

---

## ٣. السكربت: [[backup.ps1]]

### [[Import-Module "$PSScriptRoot\tools\MyTools.psm1" -Force]]

~~~powershell
Import-Module "$PSScriptRoot\tools\MyTools.psm1" -Force
~~~

- [[Import-Module]] حمّل الموديول، فالفانكشنز اللي اتعملها Export تبقى متاحة.
- [[$PSScriptRoot]] الفولدر اللي فيه [[backup.ps1]] نفسه. فالمسار صح حتى لو شغّلته من [[C:\]] (درس $PSScriptRoot).
- [[-Force]] أعد التحميل لو كان اتحمّل قبل كده في نفس الجلسة، عشان تعديلاتك تبان.

### استخدمه

~~~powershell
Write-Log "Backup started"
Get-Command -Module MyTools
~~~

~~~text الناتج
[2026-10-06_09-39] Backup started

CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Function        Get-Stamp                                          0.0        MyTools
Function        Write-Log                                          0.0        MyTools
~~~

[[Get-Command -Module MyTools]] بيوريك اللي ظاهر من الموديول: اتنين بس، و [[Get-Secret]] مش موجودة. [[Version 0.0]] لأن الموديول ملوش manifest فيه نسخة. وجربت [[Get-Secret]] بعد Import-Module:

~~~text الناتج
Get-Secret: The term 'Get-Secret' is not recognized as a name of a cmdlet, function, script file, or executable program.
~~~

### الـ dot-source: [[. "$PSScriptRoot\tools\helpers.ps1"]]

~~~powershell
. "$PSScriptRoot\tools\helpers.ps1"
Get-AppName
~~~

~~~text الناتج
shop
~~~

النقطة في الأول، وبعدها **مسافة**، وبعدها المسار. معناها «شغّل الملف ده هنا جوايا، كأن سطوره مكتوبة في المكان ده». فـ [[$AppName]] و [[Get-AppName]] فضلوا موجودين بعد ما الملف خلص.

---

## ٤. الفرق: النقطة ولا [[&]]؟

جربت الاتنين من الترمنال:

~~~text الناتج
& .\tools\helpers.ps1   →  AppName=[]    و Get-AppName: The term 'Get-AppName' is not recognized ...
. .\tools\helpers.ps1   →  AppName=[shop] و shop
~~~

[[&]] (أو اسم الملف لوحده) بيشغّل الملف في **scope** لوحده: مساحة متغيرات خاصة بيه بتتمسح أول ما يخلص. والنقطة بتشغّله في الـ scope بتاعك، فكل حاجة بتفضل. وفي [[. .\tools\helpers.ps1]] أول نقطة هي الـ dot-source، والتانية جزء من المسار ([[.\]] الفولدر الحالي).

---

## ٥. امتى ده وامتى ده

| | موديول [[.psm1]] | dot-source [[.ps1]] |
|---|---|---|
| التحميل | [[Import-Module path]] | [[. path]] |
| بيخبي حاجات؟ | أيوه، بـ [[Export-ModuleMember]] | لأ، كل حاجة بتبان |
| المتغيرات | بتفضل جوه الموديول | بتدخل السكربت بتاعك |
| مناسب لـ | كود مشترك بين مشاريع | helpers جوه نفس المشروع |

ولو حطيت الموديول في فولدر بنفس اسمه جوه واحد من فولدرات [[$env:PSModulePath]] (على الجهاز ده أولهم [[C:\Users\ali\OneDrive\Documents\PowerShell\Modules]] لـ PowerShell 7)، بيتحمّل لوحده أول ما تنادي أي فانكشن فيه، من غير Import-Module.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| حمّل موديول | [[Import-Module "$PSScriptRoot\x.psm1" -Force]] |
| حدد اللي يبان | [[Export-ModuleMember -Function A, B]] في آخر الموديول |
| شوف اللي ظاهر | [[Get-Command -Module Name]] |
| حمّل ملف helpers | [[. "$PSScriptRoot\helpers.ps1"]] (نقطة ومسافة) |`,
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
          teach: R`## الفكرة: جرّب، ولو فشل اعمل حاجة تانية

المثال جزئين: [[try]] / [[catch]] / [[finally]] حوالين أمر PowerShell هيفشل، وبعدين برنامج خارجي (npm) بيفشل بطريقة مختلفة خالص. اتحفظ كملف واتشغّل في PowerShell 7.6 و 5.1 في فولدر فاضي (مفيهوش [[missing.txt]] ولا [[package.json]])، ونفس الناتج.

---

## ١. [[$ErrorActionPreference = "Stop"]]

~~~powershell
$ErrorActionPreference = "Stop"
~~~

أغلب أخطاء أوامر PowerShell نوعها **non-terminating**: الأمر بيطبع أحمر ويكمّل، والـ catch **مش بيشوفها**. جربت نفس الـ try من غير السطر ده:

~~~powershell
try { Copy-Item .\missing.txt .\backup\ } catch { "caught" }
"after"
~~~

الـ error الأحمر اتطبع، و [[caught]] **متطبعتش**، وبعدين [[after]]. يعني الـ catch اتعدّى خالص.

[[$ErrorActionPreference]] متغير بيقول لكل الأوامر «لو حصل error اعمل إيه». و [["Stop"]] يعني «حوّله لـ error بيوقف»، فالـ catch يمسكه. زي [[set -e]] في bash.

---

## ٢. [[try]] و [[catch]] و [[finally]]

~~~powershell
try {
    Copy-Item .\missing.txt .\backup\
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    "Done either way"
}
~~~

~~~text الناتج
Error: Cannot find path '...\missing.txt' because it does not exist.
Done either way
~~~

| البلوك | بيتنفذ امتى |
|---|---|
| [[try { }]] | الأول. لو أي سطر فيه وقع، الباقي بيتعدّى ونروح للـ catch |
| [[catch { }]] | بس لو حصل error في الـ try |
| [[finally { }]] | **دايمًا**، نجح أو فشل. مكان التنضيف |

### [[$($_.Exception.Message)]]

جوه الـ catch، [[$_]] هو الـ error نفسه (object نوعه [[ErrorRecord]]). جواه [[.Exception]] (الاستثناء، ونوعه هنا [[ItemNotFoundException]] يعني «مش موجود»)، وجواه [[.Message]] الرسالة كنص. و [[$( )]] عشان النقط جوه النص. و [[-ForegroundColor Red]] لون أحمر.

---

## ٣. البرنامج الخارجي: [[npm run build]]

~~~powershell
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed"
    exit 1
}
~~~

~~~text الناتج
npm error code ENOENT
npm error syscall open
npm error path ...\package.json
npm error errno -4058
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory, open '...\package.json'
...
Build failed
~~~

### ليه مش جوه try؟

npm مش أمر PowerShell، ده برنامج لوحده. وأي برنامج لما يخلص بيرجّع رقم اسمه **exit code**: صفر يعني نجح، وأي رقم تاني يعني فشل. وده مش error في نظر PowerShell، فـ [[Stop]] والـ catch مش بيشوفوه.

### [[$LASTEXITCODE]]

PowerShell بيحفظ الرقم ده في [[$LASTEXITCODE]] بعد كل برنامج خارجي. هنا طلع [[-4058]] (ده رقم ENOENT، يعني «الملف مش موجود»، في Node على ويندوز، و npm كتبه في سطر [[errno]]. على لينكس npm بيرجّع رقم تاني، والمهم إنه مش صفر). و [[-ne 0]] يعني «مش صفر» فدخل الـ if.

### [[exit 1]]

بيقفل السكربت ويرجّع [[1]] للي شغّله. بعد التشغيل، [[$LASTEXITCODE]] في الترمنال بقى [[1]]. وده اللي بيخلي CMD أو Task Scheduler أو CI يعرفوا إن السكربت فشل.

---

## الخلاصة

| نوع الأمر | بيفشل إزاي | تمسكه بـ |
|---|---|---|
| cmdlet (Copy-Item وأمثاله) | error، وغالبًا non-terminating | [[$ErrorActionPreference = "Stop"]] و [[try]] / [[catch]] |
| برنامج خارجي (npm و git و docker) | exit code غير صفر | [[if ($LASTEXITCODE -ne 0)]] بعده على طول |

و [[finally]] للتنضيف اللي لازم يحصل، و [[exit 1]] عشان اللي شغّلك يعرف إنك فشلت.`,
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
          teach: R`## الفكرة: انت اللي تقرر كل error يعمل إيه

المثال بيعدّي على ٥ أدوات: [[-ErrorAction]] على أمر واحد، و [[-ErrorVariable]] تلم فيه الأخطاء، و [[catch]] لنوع معين، و [[$Error]] سجل الجلسة، و [[throw]] و [[exit]] من عندك. اتحفظ [[err.ps1]] واتشغّل بـ [[pwsh -File]] و [[powershell -File]] في فولدر فيه [[src\a.txt]] ومفيهوش [[nope]] ولا [[config.json]]، ونفس الناتج.

---

## ١. [[-ErrorAction SilentlyContinue]]

~~~powershell
Get-Item .\nope.txt -ErrorAction SilentlyContinue
~~~

مطبعش حاجة خالص. من غيرها كان هيطبع:

~~~text الناتج من Get-Item .\nope.txt
Get-Item: Cannot find path '...\nope.txt' because it does not exist.
~~~

[[-ErrorAction]] (اختصاره [[-EA]]) parameter موجود في كل الأوامر، بيقول للأمر ده بالذات يعمل إيه لو حصل error:

| القيمة | بيطبع؟ | بيكمّل؟ | بيتسجّل في [[$Error]]؟ |
|---|---|---|---|
| [[Continue]] (الافتراضي) | أيوه | أيوه | أيوه |
| [[SilentlyContinue]] | لأ | أيوه | أيوه |
| [[Ignore]] | لأ | أيوه | **لأ** |
| [[Stop]] | بيروح للـ catch | لأ | أيوه |

---

## ٢. [[-ErrorVariable problems]]

~~~powershell
Get-ChildItem .\nope, .\src -ErrorAction SilentlyContinue -ErrorVariable problems
"problems: $($problems.Count)"
~~~

~~~text الناتج
    Directory: ...\src

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---           10/6/2026  9:40 AM              5 a.txt
problems: 1
~~~

- [[.\nope, .\src]] مسارين بفاصلة، واحد مش موجود.
- عرض محتوى src عادي، وسكت عن nope.
- [[-ErrorVariable problems]] حط الأخطاء في متغير اسمه [[$problems]]. الاسم بيتكتب **من غير** [[$]] هنا، وبيتقري بالـ [[$]] بعدين.
- [[$problems.Count]] = 1: الـ error بتاع nope.

ده النمط اللي بتستخدمه لما تلف على حاجات كتير وعايز تكمّل وتعرف كام واحد فشل.

---

## ٣. [[catch]] لنوع معين

~~~powershell
try {
    Get-Item .\nope.txt -ErrorAction Stop
} catch [System.Management.Automation.ItemNotFoundException] {
    "Not found: $($_.TargetObject)"
} catch {
    "Other error: $($_.Exception.Message)"
}
~~~

~~~text الناتج
Not found: ...\nope.txt
~~~

1. [[-ErrorAction Stop]] على الأمر ده بس، فالـ error بيروح للـ catch.
2. [[catch [النوع]]] بيمسك النوع ده بس. و [[ItemNotFoundException]] نوع «المسار مش موجود». الاسم الكامل بالـ namespace (العيلة) قبله.
3. [[$_.TargetObject]] الحاجة اللي الأمر كان بيدوّر عليها: المسار.
4. [[catch]] من غير نوع بعده: لأي error تاني. PowerShell بيجرّب الـ catch blocks بالترتيب ويختار أول واحد يناسب.

وتعرف نوع أي error بـ [[$Error[0].Exception.GetType().FullName]].

---

## ٤. [[$Error]]: سجل الجلسة

~~~powershell
$Error.Count
$Error[0].Exception.Message
~~~

~~~text الناتج
3
Cannot find path '...\nope.txt' because it does not exist.
~~~

[[$Error]] لستة جاهزة فيها كل أخطاء الجلسة، **الأحدث الأول**. ليه 3؟

~~~text
السطر الأول    SilentlyContinue  →  اتسجّل (1)
السطر التاني   nope              →  اتسجّل (2)
جوه الـ try    Stop              →  اتسجّل (3)
~~~

[[SilentlyContinue]] خبّى الرسالة بس، والـ error اتسجّل. ولما غيّرت أول سطر لـ [[-ErrorAction Ignore]] الرقم بقى [[2]]. و [[$Error[0]]] آخر error، ورسالته من [[.Exception.Message]].

> [[$Error]] بيتراكم في نفس الجلسة، فشغّل السكربت بـ [[pwsh -File]] عشان تاخد رقم نضيف.

---

## ٥. [[throw]]: error من عندك

~~~powershell
function Get-Config([string]$Path) {
    if (-not (Test-Path $Path)) { throw "Config file '$Path' is missing" }
    Get-Content $Path -Raw | ConvertFrom-Json
}
try { Get-Config .\config.json } catch { "Failed: $_" }
~~~

~~~text الناتج
Failed: Config file '.\config.json' is missing
~~~

- [[function Get-Config([string]$Path)]] شكل مختصر للـ parameters: بين أقواس بعد الاسم بدل [[param()]].
- [[throw "..."]] بيطلّع error بيوقف الفانكشن على طول (terminating)، فالسطر اللي بعده مش بيتنفذ.
- لو الملف موجود: [[Get-Content -Raw]] يقراه كنص واحد، و [[ConvertFrom-Json]] يحوّله object.
- [["Failed: $_"]]: الـ [[$_]] لوحده جوه نص بيطلع رسالة الـ error.

---

## ٦. [[exit 2]]

~~~powershell
exit 2
~~~

بيقفل السكربت ويرجّع [[2]]. بعد التشغيل [[$LASTEXITCODE]] في الترمنال كان [[2]]. أي رقم غير صفر يعني فشل، وتقدر تخلي كل رقم ليه معنى (1 فشل عام، 2 config ناقص...).

---

## الخلاصة

| عايز | استخدم |
|---|---|
| اسكت عن error متوقع | [[-ErrorAction SilentlyContinue]] (أو [[Ignore]] من غير تسجيل) |
| خلّي الـ catch يشوفه | [[-ErrorAction Stop]] |
| اعرف كام فشل وكمّل | [[-ErrorVariable name]] وبعدين [[$name.Count]] |
| اتعامل مع نوع معين | [[catch [Type] { }]] وبعده [[catch { }]] |
| آخر error | [[$Error[0]]] |
| أوقف برسالتك | [[throw "..."]] |
| قول للي شغّلك إنك فشلت | [[exit 2]] |`,
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
          teach: R`## الفكرة: فانكشن صغيرة بتفحص بعد كل برنامج خارجي

docker و npm و git مبيرموش errors في PowerShell، بيرجّعوا exit code بس. فالمثال بيعمل فانكشن [[Assert-Ok]] تبص على الرقم بعد كل برنامج، ولو مش صفر تحوّله error حقيقي يوقف السكربت. اتحفظ كملف واتشغّل في PowerShell 7.6 و 5.1 في فولدر مفيهوش [[compose.yaml]] ولا [[package.json]]، و Docker Desktop شغال.

---

## ١. [[$ErrorActionPreference = "Stop"]]

~~~powershell
$ErrorActionPreference = "Stop"
~~~

أي error من أوامر PowerShell يوقف السكربت. وده بيشمل الـ [[throw]] اللي هنعمله في [[Assert-Ok]].

---

## ٢. الفانكشن: [[Assert-Ok]]

~~~powershell
function Assert-Ok($what) { if ($LASTEXITCODE -ne 0) { throw "$what failed (exit $LASTEXITCODE)" } }
~~~

نفكّها:

| الحتة | معناها |
|---|---|
| [[function Assert-Ok($what)]] | فانكشن بـ parameter واحد اسمه [[$what]]: اسم الخطوة. الأقواس بعد الاسم شكل مختصر لـ [[param()]] |
| [[$LASTEXITCODE]] | الرقم اللي آخر برنامج خارجي رجّعه. 0 نجح |
| [[-ne 0]] | مش صفر، يعني فشل |
| [[throw "..."]] | اطلّع error برسالة فيها اسم الخطوة والرقم |

و [[Assert]] كلمة معناها «اتأكد إن»، فالاسم بيتقري «اتأكد إن الخطوة نجحت».

---

## ٣. التلات خطوات

~~~powershell
docker info > $null;             Assert-Ok "Docker Desktop"
docker compose build --no-cache; Assert-Ok "compose build"
npm run build;                   Assert-Ok "npm build"
~~~

كل سطر أمرين بينهم [[;]]: البرنامج، وبعده على طول الفحص. والمسافات قبل [[Assert-Ok]] للترتيب بس.

### [[docker info > $null]]

[[docker info]] بيسأل Docker Engine عن معلوماته، ولو Docker Desktop مقفول بيفشل. و [[> $null]] بيرمي الصفحة الطويلة اللي بيطبعها، عشان احنا عايزين نعرف نجح ولا لأ بس. وزوّدت سطر بعده يطبع الرقم، فطلع [[docker ok, exit 0]].

### [[docker compose build --no-cache]]

بيبني صور المشروع من ملف compose، و [[--no-cache]] من الأول من غير الـ cache. في فولدر مفيهوش compose فشل:

~~~text الناتج (PowerShell 7)
no configuration file provided: not found
Exception: ...\d.ps1:2
     | compose build failed (exit 1)
~~~

السطر الأول من docker نفسه، وبعده الـ [[throw]] بتاعنا برسالته. والسكربت **وقف هنا**: سطر npm متنفذش أصلًا. وبعد التشغيل [[$LASTEXITCODE]] كان [[1]]، لأن السكربت وقع بـ error. وفي 5.1 نفس الرسالة بالشكل الأحمر القديم ([[At ...\d.ps1:2 char:56]]).

---

## ٤. السطر الأخير: [[$PSNativeCommandUseErrorActionPreference]]

~~~powershell
$PSNativeCommandUseErrorActionPreference = $true
~~~

ده متغير في PowerShell 7.4 وأحدث، اسمه طويل بس معناه: «اعتبر أي برنامج خارجي (native command) رجع غير صفر error، وطبّق عليه [[$ErrorActionPreference]]». مع [[Stop]]، السكربت يقف لوحده من غير [[Assert-Ok]].

جربت الـ solCode في 7.6 في فولدر مفيهوش package.json:

~~~text الناتج
exit code: -4058
caught: Program "node.exe" ended with non-zero exit code: -4058 (0xFFFFF026).
~~~

- السطر الأول: من غير المتغير، الـ catch **ممسكش** حاجة، والرقم بس اتغيّر.
- التاني: بعد ما شغّلت المتغير، نفس الأمر دخل الـ catch. والرسالة بتقول [[node.exe]] مش npm، لأن npm على ويندوز سكربت بيشغّل node.

وفي 5.1 نفس الـ solCode طبع [[exit code: -4058]] بس، والتاني ملوش أي تأثير: المتغير ده مش موجود في 5.1.

---

## الخلاصة

| النسخة | تعرف إن برنامج خارجي فشل إزاي |
|---|---|
| 5.1 و 7 | [[$LASTEXITCODE]] بعد الأمر على طول، أو فانكشن زي [[Assert-Ok]] |
| 7.4 وأحدث | كمان [[$PSNativeCommandUseErrorActionPreference = $true]] مع [[Stop]] |

و [[$LASTEXITCODE]] بيتغيّر مع كل برنامج، فافحصه في نفس السطر.`,
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
          teach: R`## الفكرة: «أنا فين» غير «السكربت فين»

فيه فولدرين ممكن يتلخبطوا: **الفولدر الحالي** (اللي الترمنال واقف فيه، [[Get-Location]])، و **فولدر السكربت** (اللي الملف محفوظ فيه، [[$PSScriptRoot]]). المسار النسبي زي [[.\frontend\dist]] بيتحسب من الأول، فلو شغّلت السكربت من مكان تاني بيبوظ. اتجرّب في PowerShell 7.6 و 5.1 على سكربت في فولدر اسمه [[proj]].

---

## ١. نشوف المشكلة: الـ solCode

~~~powershell
# where.ps1
Write-Host $PSScriptRoot (Get-Location)
~~~

[[Write-Host]] بيطبع الاتنين جنب بعض بمسافة: فولدر السكربت، والفولدر الحالي. و [[(Get-Location)]] في أقواس عشان يتنفذ الأول ويتبعت ناتجه.

~~~text الناتج
من جوه proj:                    ...\proj ...\proj
من C:\ بالمسار الكامل (7 و 5.1): ...\proj C:\
~~~

[[$PSScriptRoot]] فضل زي ما هو، و [[Get-Location]] بقى [[C:\]]. فلو السكربت فيه [[.\frontend\dist]]، هيدوّر على [[C:\frontend\dist]].

---

## ٢. المثال سطر سطر

### [[Set-Location $PSScriptRoot]]

~~~powershell
Set-Location $PSScriptRoot
~~~

[[$PSScriptRoot]] متغير أوتوماتيك (PowerShell بيملاه لوحده) فيه مسار الفولدر اللي فيه ملف السكربت. و [[Set-Location]] (يعني cd) بيدخله. فأي مسار نسبي بعد كده بيتحسب من فولدر السكربت.

### [[Join-Path $PSScriptRoot "frontend\dist"]]

~~~powershell
$dist = Join-Path $PSScriptRoot "frontend\dist"
~~~

[[Join-Path]] بيلزق جزئين مسار ويحط [[\]] بينهم صح. فالناتج مسار **كامل** ميعتمدش على الفولدر الحالي خالص:

~~~text قيمة $dist
C:\...\proj\frontend\dist
~~~

دي الطريقة التانية، ومش محتاجة [[Set-Location]]. المثال فيه الاتنين عشان تشوفهم.

### [[$PSCommandPath]] و [[Get-Location]]

~~~powershell
Write-Host "Script file: $PSCommandPath"
Write-Host "Working in:  $(Get-Location)"
~~~

[[$PSCommandPath]] المسار الكامل لملف السكربت نفسه (بالاسم). و [[$(Get-Location)]] الفولدر الحالي جوه النص. شغّلت السكربت من [[C:\]]:

~~~text الناتج
Script file: C:\...\proj\run.ps1
Working in:  C:\...\proj
~~~

[[Working in]] بقى proj مش [[C:\]]، لأن [[Set-Location]] في أول سطر اشتغل.

### [[if (-not (Test-Path $dist)) { npm run build }]]

~~~powershell
if (-not (Test-Path $dist)) { npm run build }
~~~

[[Test-Path $dist]] الفولدر موجود؟ و [[-not]] بيعكس. يعني «لو مفيش dist ابنيها». وعندي dist كانت موجودة، فمتنفذش npm. والمهم إن [[npm run build]] هيشتغل في فولدر المشروع الصح، لأننا عملنا [[Set-Location]].

---

## ٣. حاجتين تاخد بالك منهم

**الأولى:** [[$PSScriptRoot]] بيتملى جوه ملف [[.ps1]] بس. لو كتبته في الترمنال مباشرة بيبقى فاضي: جربت [["[$PSScriptRoot]"]] فطبع [[[]]].

**التانية:** [[Set-Location]] جوه السكربت بيغيّر فولدر **الجلسة** نفسها. لما شغّلته بـ [[&]] من [[C:\]]، بعد ما خلص الترمنال فضل واقف في proj. لو مش عايز ده: [[Push-Location $PSScriptRoot]] في الأول و [[Pop-Location]] في الآخر.

---

## الخلاصة

| المتغير أو الأمر | فيه إيه |
|---|---|
| [[Get-Location]] | الفولدر اللي الترمنال واقف فيه (بيتغيّر حسب مكانك) |
| [[$PSScriptRoot]] | فولدر ملف السكربت (ثابت) |
| [[$PSCommandPath]] | المسار الكامل لملف السكربت |
| [[Set-Location $PSScriptRoot]] | خلّي المسارات النسبية تتحسب من فولدر السكربت |
| [[Join-Path $PSScriptRoot "x"]] | مسار كامل من غير ما تغيّر مكانك |

والمقابل: [[%~dp0]] في ملفات bat، و [[dirname "$0"]] في bash.`,
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
          teach: R`## الفكرة: ٤ طرق تحفظ ناتج برنامج في ملف

البرنامج الخارجي (npm هنا) بيكتب في **قناتين**: الكلام العادي في stdout، والتحذيرات والأخطاء في stderr. والمطلوب الاتنين في ملف نصي عادي (UTF-8) تقدر تبعته أو تدوّر فيه. المثال بيوريك الطريقة اللي بتبوظ في 5.1 والطرق الصح.

عشان أجرّب، عملت مشروع صغير فيه [[package.json]] و script بيطبع سطرين عاديين وسطر تحذير على stderr:

~~~text build.js
console.log('building...'); console.error('warn: old dependency'); console.log('done');
~~~

ولكل ملف بصيت على أول bytes فيه، عشان دي اللي بتقول الترميز.

---

## ١. الطريقة اللي بتبوظ (5.1): [[*>]]

~~~powershell
npm run dev *> dev-log.txt
~~~

[[*>]] معناها «كل الـ streams لملف». جربتها في 5.1 بـ [[npm run build *> a.txt]]:

~~~text a.txt (أول bytes: FF FE 0D 00 0A 00 3E 00)
> t@1.0.0 build
> node build.js

building...
done
node.exe : warn: old dependency
At line:1 char:1
+ & "C:\Program Files\nodejs/node.exe" "C:\Program Files\nodejs/node_mo ...
    + CategoryInfo          : NotSpecified: (warn: old dependency:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
~~~

مشكلتين:

1. **الترميز:** [[FF FE]] في الأول اسمها BOM ومعناها UTF-16 LE: كل حرف إنجليزي بايتين، والتاني صفر ([[3E 00]] = الحرف [[>]]). أدوات كتير (زي grep) بتشوفه حروف بينها مسافات.
2. **الـ stderr:** سطر التحذير اتغلّف كأنه error من PowerShell ([[NativeCommandError]] وأرقام سطور)، واتنقل لآخر الملف.

---

## ٢. سيب cmd يعمل التوجيه: [[cmd /c "..."]]

~~~powershell
cmd /c "npm run dev > dev-log.txt 2>&1"
~~~

| الحتة | معناها |
|---|---|
| [[cmd /c]] | شغّل CMD، ونفّذ السطر ده، واقفل ([[/c]] = run and close) |
| [[> dev-log.txt]] | الـ stdout للملف |
| [[2>&1]] | الـ stderr (رقم 2) يروح مكان الـ stdout (رقم 1)، يعني نفس الملف |

السطر كله بين علامات تنصيص، فـ PowerShell مبيلمسوش، بيسلّمه لـ cmd زي ما هو. وجربتها في 5.1:

~~~text b.txt (أول bytes: 0A 3E 20 74 40 31 2E 30)
> t@1.0.0 build
> node build.js

building...
warn: old dependency
done
~~~

مفيش BOM، والحروف بايت واحد ([[3E]] = [[>]]): ده UTF-8. والتحذير في مكانه من غير أي زيادات.

---

## ٣. تفضل في PowerShell 5.1

~~~powershell
npm run build 2>&1 | ForEach-Object { "$_" } | Out-File build-log.txt -Encoding utf8
~~~

من الشمال لليمين:

1. [[2>&1]] لم الـ stderr مع الـ stdout في الـ pipeline (سطور الـ stderr بتوصل ErrorRecord).
2. [[ForEach-Object { "$_" }]] حوّل كل سطر لنص عادي، فالـ ErrorRecord بقى الكلام بتاعه بس.
3. [[Out-File -Encoding utf8]] اكتب UTF-8.

~~~text c.txt (أول bytes: EF BB BF 0D 0A 3E 20 74)
> t@1.0.0 build
> node build.js

building...
warn: old dependency
done
~~~

نضيف، و [[EF BB BF]] في الأول ده BOM بتاع UTF-8 (5.1 بيحطه مع [[utf8]]). أغلب الأدوات بتفهمه.

---

## ٤. PowerShell 7: [[Tee-Object]]

~~~powershell
npm run dev 2>&1 | Tee-Object -FilePath dev-log.txt
~~~

[[Tee-Object]] زي حرف T: الناتج بيروح طريقين، الشاشة والملف في نفس الوقت. وفي 7 الـ stderr بيتكتب نص عادي، والملف UTF-8 من غير BOM:

~~~text dev-log.txt (أول bytes: 0D 0A 3E 20 74 40 31 2E)
> t@1.0.0 dev
> node build.js

building...
done
warn: old dependency
~~~

سطر التحذير جه بعد [[done]] هنا: الـ stdout والـ stderr قناتين منفصلتين، فترتيبهم مع بعض مش مضمون. وجربت كمان [[*>]] في 7: الملف طلع UTF-8 نضيف، يعني المشكلة الأولى بتاعة 5.1 بس.

---

## ٥. تابع الملف وهو بيتكتب

~~~powershell
Get-Content dev-log.txt -Wait -Tail 20
~~~

- [[-Tail 20]] ابدأ بآخر ٢٠ سطر بس.
- [[-Wait]] متخلصش: فضل مستني، وأي سطر جديد يتكتب في الملف اطبعه. زي [[tail -f]] في لينكس.

جربتها: ضفت سطر للملف بعد ما الأمر اشتغل، فظهر على طول. وبتفضل شغالة لحد ما تدوس Ctrl+C. شغّلها من نافذة تانية والسيرفر شغال في الأولى.

---

## الخلاصة

| النسخة | الطريقة | الملف |
|---|---|---|
| 5.1 | [[*>]] أو [[>]] | UTF-16 والـ stderr متغلّف NativeCommandError |
| 5.1 | [[cmd /c "cmd > log 2>&1"]] | UTF-8 زي ما البرنامج طلّعه |
| 5.1 | [[2>&1]] ثم [[ForEach-Object { "$_" }]] ثم [[Out-File -Encoding utf8]] | UTF-8 بـ BOM |
| 7 | [[2>&1]] ثم [[Tee-Object -FilePath log]] | UTF-8، وبيطبع على الشاشة كمان |
| الاتنين | [[Get-Content log -Wait -Tail 20]] | تتابعه وهو بيتكتب |`,
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
          teach: R`## الفكرة: كل اللي على الشاشة يتنسخ في ملف

[[Start-Transcript]] بيبدأ يسجّل كل اللي بيظهر في الجلسة في ملف نصي، و [[Stop-Transcript]] بيوقف. المثال سكربت [[job.ps1]] كامل حوالين الفكرة دي: فولدر لوجات، وملف لكل يوم، و try/catch/finally عشان التسجيل يتقفل دايمًا، وتنضيف اللوجات القديمة، ورقم خروج. اتجرّب في PowerShell 7.6 و 5.1.

---

## ١. التجهيز (السطور ١ لـ ٤)

~~~powershell
$ErrorActionPreference = "Stop"
$logDir = Join-Path $PSScriptRoot "logs"
New-Item -ItemType Directory $logDir -Force | Out-Null
$log = Join-Path $logDir "run_$(Get-Date -Format yyyy-MM-dd).log"
~~~

| السطر | بيعمل إيه |
|---|---|
| [[$ErrorActionPreference = "Stop"]] | أي error يوقف ويروح للـ catch |
| [[Join-Path $PSScriptRoot "logs"]] | فولدر logs جنب السكربت، مهما اتشغّل منين |
| [[New-Item ... -Force]] و [[Out-Null]] | اعمله لو مش موجود، ومتطبعش حاجة |
| [["run_$(Get-Date -Format yyyy-MM-dd).log"]] | اسم الملف بتاريخ النهارده: [[run_2026-10-06.log]] |

فكل يوم ليه ملف، والتشغيلات في نفس اليوم بتتجمع فيه.

---

## ٢. ابدأ التسجيل

~~~powershell
Start-Transcript -Path $log -Append | Out-Null
$code = 0
~~~

- [[-Path $log]] اكتب في الملف ده.
- [[-Append]] لو موجود ضيف تحت، متكتبش فوقه.
- [[| Out-Null]] لأن [[Start-Transcript]] بيطبع سطر زي ده، ومش محتاجينه:

~~~text الناتج من غير Out-Null
Transcript started, output file is .\x.log
~~~

- [[$code = 0]] رقم الخروج، صفر يعني نجح لحد ما يثبت العكس.

---

## ٣. الشغل نفسه جوه [[try]]

~~~powershell
try {
    Write-Host "Starting job"
    Get-ChildItem $PSScriptRoot -File | Measure-Object | Select-Object -ExpandProperty Count
    git --version
    Write-Warning "Disk almost full"
}
~~~

~~~text الناتج على الشاشة
Starting job
1
git version 2.56.0.windows.1
WARNING: Disk almost full
~~~

- [[Write-Host]] رسالة.
- [[Get-ChildItem -File]] ملفات فولدر السكربت، و [[Measure-Object]] عدّهم، و [[Select-Object -ExpandProperty Count]] طلّع الرقم لوحده بدل جدول. طلع [[1]] لأن الفولدر فيه job.ps1 بس (و logs فولدر مش ملف).
- [[git --version]] برنامج خارجي.
- [[Write-Warning]] تحذير بالأصفر.

---

## ٤. [[catch]] و [[finally]]

~~~powershell
catch {
    Write-Host "FAILED: $_" -ForegroundColor Red
    $code = 1
}
finally {
    Stop-Transcript | Out-Null
}
~~~

- الـ catch بيطبع الـ error **والتسجيل لسه شغال**، فالرسالة بتدخل اللوج. و [[$code = 1]] يعلّم إن السكربت فشل.
- الـ finally بيتنفذ دايمًا، فالتسجيل بيتقفل حتى لو حصل error.

---

## ٥. تنضيف ورقم خروج

~~~powershell
Get-ChildItem $logDir -Filter *.log | Where-Object LastWriteTime -lt (Get-Date).AddDays(-30) | Remove-Item
exit $code
~~~

من الشمال لليمين:

1. [[Get-ChildItem $logDir -Filter *.log]] كل اللوجات.
2. [[(Get-Date).AddDays(-30)]] النهارده ناقص ٣٠ يوم. الأقواس عشان [[Get-Date]] يتنفذ الأول، وبعدين [[.AddDays(-30)]] method بتطرح.
3. [[Where-Object LastWriteTime -lt ...]] اللي آخر تعديل عليه **قبل** التاريخ ده ([[-lt]] أصغر من، والتاريخ الأقدم أصغر).
4. [[Remove-Item]] امسحهم.

و [[exit $code]] بيرجّع 0 أو 1 للي شغّل السكربت (Task Scheduler مثلًا). بعد التشغيلة العادية [[$LASTEXITCODE]] كان [[0]].

---

## ٦. ملف اللوج من جوه

~~~text logs\run_2026-10-06.log (PowerShell 7، مختصر)
**********************
PowerShell transcript start
Start time: 20261006094134
Username: ALI-PC\ali
Machine: ALI-PC (Microsoft Windows NT 10.0.26300.0)
Host Application: ...\pwsh.dll -NoProfile -File job.ps1
PSVersion: 7.6.6
...
**********************
Starting job
1

WARNING: Disk almost full
**********************
PowerShell transcript end
End time: 20261006094135
**********************
~~~

- الهيدر فيه الوقت ([[20261006094134]] يعني 2026-10-06 الساعة 09:41:34) واليوزر والجهاز والأمر اللي شغّل السكربت والنسخة. وفي 5.1 أوله [[Windows PowerShell transcript start]].
- لاحظ إن سطر git **فاضي** في اللوج. لأني شغّلت السكربت وناتجه متحوّل لأداة تانية، فـ git كتب على الكونسول مباشرة من غير ما يعدّي على PowerShell. الحل: [[git --version | Out-Host]]، وجربته فالسطر اتسجّل.

---

## ٧. التجربة بـ error

حطيت [[throw "boom"]] مكان التحذير:

~~~text الناتج
Starting job
3
git version 2.56.0.windows.1
FAILED: boom
~~~

و [[FAILED: boom]] اتسجّلت في اللوج قبل [[PowerShell transcript end]]، و [[$LASTEXITCODE]] بقى [[1]]. (العدد بقى 3 لأني كنت ضفت ملفات في الفولدر.)

---

## الخلاصة

| الخطوة | السطر |
|---|---|
| مكان اللوج | [[Join-Path $PSScriptRoot "logs"]] (مش مسار نسبي) |
| ابدأ | [[Start-Transcript -Path $log -Append]] |
| اشتغل | جوه [[try]] |
| سجّل الفشل | [[catch]] يطبع ويحط [[$code = 1]] |
| اقفل دايمًا | [[Stop-Transcript]] جوه [[finally]] |
| نضّف | امسح اللي أقدم من [[(Get-Date).AddDays(-30)]] |
| بلّغ | [[exit $code]] |`,
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
          teach: R`## الفكرة: أداة تقرا الكود، وأداة تتابعه وهو شغال

المثال ٥ سطور: سطرين لـ **PSScriptAnalyzer** (بيقرا السكربت من غير ما يشغّله ويطلّع المشاكل)، و ٣ لـ **Set-PSDebug** (بيطبع كل سطر قبل ما يتنفذ). وهنجرّبهم على [[backup.ps1]] بتاع درس «أتمتة جاهزة».

---

## ١. التسطيب: [[Install-Module PSScriptAnalyzer -Scope CurrentUser]]

~~~powershell
Install-Module PSScriptAnalyzer -Scope CurrentUser
~~~

| الحتة | معناها |
|---|---|
| [[Install-Module]] | نزّل موديول من PowerShell Gallery (المخزن الرسمي للموديولات على النت) |
| [[PSScriptAnalyzer]] | اسم الموديول، من مايكروسوفت |
| [[-Scope CurrentUser]] | سطّبه ليوزرك بس، فمش محتاج أدمن |

أول مرة هيسألك إنك تثق في PSGallery (لأنها [[Untrusted]] افتراضيًا)، اكتب Y. وبتتعمل مرة واحدة.

> الجهاز اللي اتراجع عليه مفيهوش الموديول ده ومتسطبش عليه عشان منغيّرش فيه حاجة، فجزء PSScriptAnalyzer اتجرّب جوه Docker في PowerShell 7 على لينكس بنسخة الموديول 1.23.0.

---

## ٢. الفحص: [[Invoke-ScriptAnalyzer .\backup.ps1]]

~~~powershell
Invoke-ScriptAnalyzer .\backup.ps1
~~~

~~~text الناتج
RuleName              Severity ScriptName Line Message
--------              -------- ---------- ---- -------
PSAvoidUsingWriteHost Warning  backup.ps1 16   File 'backup.ps1' uses Write-Host. Avoid using Write-Host because it might not work in all hosts, does not work when there is no host, and (prior to PS 5.0) cannot be suppressed, captured, or redirected. Instead, use Write-Output, Write-Verbose, or Write-Information.
~~~

نقرا الأعمدة:

| العمود | معناه |
|---|---|
| [[RuleName]] | اسم القاعدة اللي اتكسرت. [[PSAvoidUsingWriteHost]] يعني «ابعد عن Write-Host» |
| [[Severity]] | الخطورة: [[Error]] أو [[Warning]] أو [[Information]] |
| [[ScriptName]] و [[Line]] | الملف ورقم السطر: 16 هو سطر [[Write-Host "Saved $zip"]] |
| [[Message]] | الشرح والبديل |

ده Warning مش Error: السكربت شغال، بس Write-Host مبيدخلش الـ pipeline (درس Write-Host والـ output).

جربت كمان ملف فيه سطرين وحشين:

~~~powershell
gci *.log | % { $_.Name }
$unused = 5
~~~

~~~text الناتج
RuleName                             Severity ScriptName Line Message
--------                             -------- ---------- ---- -------
PSUseDeclaredVarsMoreThanAssignments Warning  bad.ps1    2    The variable 'unused' is assigned but never used.
PSAvoidUsingCmdletAliases            Warning  bad.ps1    1    'gci' is an alias of 'Get-ChildItem'. ...
PSAvoidUsingCmdletAliases            Warning  bad.ps1    1    '%' is an alias of 'ForEach-Object'. ...
~~~

[[gci]] و [[%]] اختصارات (aliases)، مريحة في الترمنال بس بتخلي السكربت صعب يتقري. و [[$unused]] متغير اتعمل ومحدش استخدمه، وده غالبًا اسم متكتب غلط في حتة تانية.

---

## ٣. التتبع: [[Set-PSDebug -Trace 1]]

~~~powershell
Set-PSDebug -Trace 1
.\backup.ps1
Set-PSDebug -Off
~~~

- [[Set-PSDebug -Trace 1]] من هنا ورايح، اطبع كل سطر قبل ما يتنفذ. زي [[bash -x]].
- [[.\backup.ps1]] شغّل السكربت.
- [[Set-PSDebug -Off]] اقفل التتبع، وإلا هيفضل شغال في النافذة دي.

اتجرّب على ويندوز في PowerShell 7.6 و 5.1 (نفس السطور) على فولدر فيه [[src\a.txt]]:

~~~text الناتج (مختصر)
DEBUG:    6+  >>>> $ErrorActionPreference = "Stop"
DEBUG:    8+ if ( >>>> -not (Test-Path $Dest)) {
DEBUG:    9+      >>>> New-Item -ItemType Directory -Path $Dest | Out-Null
DEBUG:   12+  >>>> $stamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
DEBUG:   13+  >>>> $zip = Join-Path $Dest "backup_$stamp.zip"
DEBUG:   15+  >>>> Compress-Archive -Path "$Source\*" -DestinationPath $zip
...
DEBUG:   16+  >>>> Write-Host "Saved $zip" -ForegroundColor Green
Saved .\backups\backup_2026-10-06_09-46.zip
~~~

نقرا السطر:

| الحتة | معناها |
|---|---|
| [[DEBUG:]] | سطر تتبع، مش من سكربتك |
| [[12+]] | رقم السطر في الملف |
| [[>>>>]] | السهم بيشاور على الحتة اللي هتتنفذ دلوقتي |

لاحظ إن السطر 9 ظهر، يعني [[backups]] مكانش موجود فاتعمل. ولما وصل [[Compress-Archive]] دخل جوه كود الموديول نفسه وطبع مئات السطور (الناتج كله كان حوالي 420 سطر في 7 و 220 في 5.1)، وبعدين رجع لسطر 16. فدوّر على أرقام سطور سكربتك بس.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| مشاكل قبل التشغيل | [[Invoke-ScriptAnalyzer .\script.ps1]] (بعد [[Install-Module PSScriptAnalyzer -Scope CurrentUser]] مرة واحدة) |
| تشوف السكربت بيقف فين | [[Set-PSDebug -Trace 1]] وشغّل، وبعدين [[Set-PSDebug -Off]] |
| الفحص وانت بتكتب | extension بتاع PowerShell في VS Code (نفس القواعد) |`,
          lines: [
            "سطّب أداة الفحص (مرة واحدة).",
            "افحص السكربت واطبع التحذيرات.",
            "شغّل التتبع: اطبع كل سطر قبل تنفيذه (زي bash -x).",
            "شغّل السكربت وشوف التتبع.",
            "اقفل التتبع."
          ],
          sol: R`الـ Install-Module بيحمّل من PowerShell Gallery (هيسألك إنك تثق في PSGallery لأنها [[Untrusted]] افتراضيًا، اكتب Y؛ وفي 5.1 على جهاز جديد ممكن يسألك قبلها يسطّب NuGet provider، اكتب Y برضه). بعدين [[Invoke-ScriptAnalyzer .\backup.ps1]] على backup.ps1 بتاع الدرس اللي تحت بيطلّع تحذير واحد: [[PSAvoidUsingWriteHost]] بـ Severity Warning على [[Line 16]] (سطر Write-Host)، عشان Write-Host مش بيدخل الـ pipeline. (الجزء ده اتجرّب على لينكس بـ PowerShell 7؛ الجهاز اللي راجعت عليه مفيهوش PSScriptAnalyzer فمعدتوش هنا، ورقم السطر اتأكدت منه في الملف.)

ده مش error والسكربت شغال، بس لو هتستخدم الناتج في سكربت تاني استخدم Write-Output. ولو عندك aliases زي [[gci]] و [[%]] في السكربت هيطلع [[PSAvoidUsingCmdletAliases]]، ولو متغير متعرفش وما استخدمتوش [[PSUseDeclaredVarsMoreThanAssignments]].

و [[Set-PSDebug -Trace 1]] اتجرّب على ويندوز في 7.6 و 5.1: بيطبع سطور زي [[DEBUG:   12+  >>>> $stamp = Get-Date -Format "yyyy-MM-dd_HH-mm"]] (رقم السطر والأمر)، ولما وصل Compress-Archive دخل جواه وطبع حوالي 270 سطر من كود الموديول نفسه، وبعدين رجع لسطر 16 بتاعك. فمتتخضش، دور على أرقام سطور سكربتك.`
        }
      ]
    }
]);
