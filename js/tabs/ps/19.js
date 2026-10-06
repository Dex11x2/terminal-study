// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
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
            how: R`[[param()]] في الأول عشان السكربت ياخد arguments. ولو حطيت فوقها [[[CmdletBinding(SupportsShouldProcess)]]] السكربت ياخد [[-Verbose]] و [[-WhatIf]] (درس [CmdletBinding()])، و [[CmdletBinding()]] لوحدها بتدّي [[-Verbose]] من غير [[-WhatIf]].

[[Get-Date -Format]] بياخد format string. [[yyyy-MM-dd_HH-mm]] بيطلع format مناسب لأسامي الملفات، ومترتب صح لما تعمل sort بالاسم.

[[Compress-Archive]] بيعمل zip. و [[-Path "$Source\*"]] بالنجمة بيحط محتوى الفولدر في الـ zip، من غيرها الـ zip هيبقى جواه فولدر باسم المصدر (جربتها: [[app/a.txt]] بدل [[a.txt]]). وفي 5.1 المسارات جوه الـ zip بتتكتب بـ [[\]] ([[app\a.txt]]) بدل [[/]]، فلو الـ zip رايح لينكس أو ماك، اعمله بـ PowerShell 7.

وبديل «امسح الأقدم من ٧ أيام» اللي في الحل: «سيب آخر ٧ نسخ بس»: [[Get-ChildItem $Dest -Filter backup_*.zip | Sort-Object LastWriteTime | Select-Object -SkipLast 7 | Remove-Item]].`,
            when: "أتمتة باك أب على ويندوز. المهمة دي في Task Scheduler بتشغّلها يوميًا.",
            mistakes: "Task Scheduler بيشغّل بـ System account أو user مش logged in. اتأكد من الصلاحيات وإن المسارات كاملة."
          },
          teach: R`## الفكرة

السكربت بياخد فولدر، ويعمله ملف zip اسمه فيه التاريخ والوقت، ويحطه في فولدر باك أب. هنمشي عليه بالترتيب: ٤ أجزاء (الـ parameters، والتجهيز، والاسم، والضغط)، وبعدين الحل اللي بيمسح القديم.

كل الناتج تحت اتشغّل في PowerShell 7.6 و Windows PowerShell 5.1 على ويندوز ١١، في فولدر تجربة فيه [[app\a.txt]] و [[app\sub\b.txt]].

---

## الجزء ١: [[param( ... )]]

~~~powershell
param(
    [string]$Source = ".\src",
    [string]$Dest = ".\backups"
)
~~~

[[param]] لازم يبقى أول حاجة في الملف. هو اللي بيعرّف الـ **parameters**، يعني الحاجات اللي بتبعتها للسكربت وانت بتشغّله.

| الحتة | معناها |
|---|---|
| [[[string]]] | النوع: نص. لو بعتّ رقم هيتحوّل نص |
| [[$Source]] | اسم المتغير جوه السكربت، واسم الـ parameter بره ([[-Source]]) |
| [[= ".\src"]] | القيمة الافتراضية لو متبعتش حاجة |
| [[,]] | فاصل بين parameter والتاني |

و [[.\]] يعني «الفولدر اللي انت واقف فيه دلوقتي». فالتشغيل بيبقى بطريقتين:

~~~powershell
.\backup.ps1                              # Source = .\src و Dest = .\backups
.\backup.ps1 -Source .\app -Dest .\bk     # القيم اللي انت كتبتها
~~~

---

## الجزء ٢: التجهيز

### [[$ErrorActionPreference = "Stop"]]

متغير جاهز في PowerShell بيحدد يعمل إيه لما cmdlet يطلع error. الافتراضي [[Continue]]: يطبع الـ error ويكمّل السطر اللي بعده. و [[Stop]]: يوقف السكربت كله. هنا ده مهم: لو الضغط فشل، مش عايزين السطر الأخير يطبع «Saved» كأن كله تمام.

### [[if (-not (Test-Path $Dest)) { ... }]]

نفكّه من جوه لبرة:

1. [[Test-Path $Dest]]: المسار ده موجود؟ بيرجع [[True]] أو [[False]]. أول مرة رجّع [[False]].
2. [[-not ( ... )]]: اعكس. فالشرط بقى «لو **مش** موجود».
3. [[{ ... }]]: اللي جوه الأقواس دي بيتنفّذ لو الشرط صح.

### [[New-Item -ItemType Directory -Path $Dest | Out-Null]]

[[New-Item]] بيعمل حاجة جديدة، و [[-ItemType Directory]] يعني فولدر (مش ملف). الأمر ده لوحده بيطبع جدول:

~~~text الناتج من غير Out-Null
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d----           10/6/2026 10:04 AM                bk4
~~~

و [[| Out-Null]] بياخد الناتج ده ويرميه، فالشاشة تفضل نضيفة ومفيش غير سطر «Saved» في الآخر.

---

## الجزء ٣: اسم الملف

### [[$stamp = Get-Date -Format "yyyy-MM-dd_HH-mm"]]

[[Get-Date]] التاريخ والوقت دلوقتي، و [[-Format]] بيقوله يكتبه بالشكل ده:

| الحروف | معناها | مثال |
|---|---|---|
| [[yyyy]] | السنة ٤ أرقام | 2026 |
| [[MM]] | الشهر (كابيتال) | 10 |
| [[dd]] | اليوم | 06 |
| [[HH]] | الساعة من 00 لـ 23 | 10 |
| [[mm]] | الدقيقة (سمول) | 03 |

~~~text الناتج
2026-10-06_10-03
~~~

ليه الشكل ده بالذات؟ لأن [[/]] و [[:]] ممنوعين في أسامي الملفات على ويندوز، ولأن السنة الأول بتخلي الترتيب بالاسم هو نفسه الترتيب بالتاريخ. وخلي بالك: [[MM]] شهر و [[mm]] دقيقة، لو بدلتهم التاريخ هيطلع غلط من غير error.

### [[$zip = Join-Path $Dest "backup_$stamp.zip"]]

- [["backup_$stamp.zip"]]: جوه الـ double quotes، PowerShell بيحط قيمة [[$stamp]] مكانها، فبتبقى [[backup_2026-10-06_10-03.zip]].
- [[Join-Path]] بيلزق الفولدر والاسم ويحط [[\]] بينهم من غير ما تفكر لو [[$Dest]] آخره [[\]] ولا لأ.

~~~text الناتج
.\bk\backup_2026-10-06_10-03.zip
~~~

---

## الجزء ٤: الضغط

### [[Compress-Archive -Path "$Source\*" -DestinationPath $zip]]

| الحتة | معناها |
|---|---|
| [[Compress-Archive]] | اعمل ملف zip |
| [[-Path "$Source\*"]] | ايه اللي يتضغط: [[\*]] يعني «كل اللي جوه الفولدر» |
| [[-DestinationPath $zip]] | اسم ومكان الـ zip |

النجمة فرقها كبير: بيها الـ zip جواه [[a.txt]] و [[sub/b.txt]] على طول. من غيرها هيبقى جواه فولدر [[app]] والملفات تحته. ده اللي طلع لما قريت محتويات الـ zip:

~~~text اللي جوه الـ zip
sub/b.txt
a.txt
~~~

### [[Write-Host "Saved $zip" -ForegroundColor Green]]

[[Write-Host]] بيكتب على الشاشة مباشرة، و [[-ForegroundColor Green]] لون الكلام.

~~~text الناتج
Saved .\bk\backup_2026-10-06_10-03.zip
~~~

### لو شغلته مرتين في نفس الدقيقة

الاسم بالدقيقة، فالمرة التانية بتلاقي الملف موجود:

~~~text الناتج (مختصر)
Compress-Archive: ... backup_2026-10-06_10-03.zip already exists. Use the -Update parameter to update the existing archive file or use the -Force parameter to overwrite the existing archive file.
~~~

وبسبب [[Stop]] السكربت وقف هنا ومطبعش Saved. ولو محتاج أكتر من نسخة في الدقيقة، زوّد الثواني: [[yyyy-MM-dd_HH-mm-ss]].

### لو الفولدر فاضي

جربت [[-Source .\empty]] على فولدر فاضي: طبع [[Saved .\bk9\backup_2026-10-06_10-04.zip]]، بس [[Test-Path]] على الملف قال [[False]]. يعني [[Compress-Archive]] معملش حاجة ومقالش error، في 7 و 5.1. عشان كده الحل فيه سطر فحص زيادة.

---

## الحل: امسح الباك أب الأقدم من ٧ أيام

الـ solCode فيه ٣ إضافات:

### ١. parameter جديد: [[[int]$KeepDays = 7]]

[[[int]]] يعني رقم صحيح. لو كتبت [[-KeepDays abc]] السكربت مش هيشتغل أصلًا.

### ٢. [[if (-not (Test-Path $zip)) { throw "Nothing to back up in $Source" }]]

بعد الضغط: الملف اتعمل فعلًا؟ لو لأ، [[throw]] بيرمي error برسالتك ويوقف السكربت. على الفولدر الفاضي طلع:

~~~text الناتج
Exception: ...\backup2.ps1:17
     | Nothing to back up in .\empty
~~~

### ٣. المسح: pipeline من ٣ حلقات

~~~powershell
Get-ChildItem $Dest -Filter "backup_*.zip" |
    Where-Object LastWriteTime -lt (Get-Date).AddDays(-$KeepDays) |
    Remove-Item -Verbose
~~~

الـ [[|]] في آخر السطر بيقول لـ PowerShell إن الأمر لسه مكمّل في السطر اللي بعده.

| الحلقة | بتعمل إيه |
|---|---|
| [[Get-ChildItem $Dest -Filter "backup_*.zip"]] | هات ملفات الباك أب بس (مش أي zip تاني في الفولدر) |
| [[(Get-Date).AddDays(-$KeepDays)]] | النهارده ناقص ٧ أيام. [[-$KeepDays]] بيطلع [[-7]] |
| [[Where-Object LastWriteTime -lt ...]] | سيب بس اللي آخر تعديل عليه **أقل من** (less than) التاريخ ده، يعني أقدم |
| [[Remove-Item -Verbose]] | امسحهم، و [[-Verbose]] اطبع اسم كل واحد |

جربت بملف [[backup_2020-01-01_00-00.zip]] آخر تعديل عليه من ١٠ أيام:

~~~text الناتج
Saved .\bkS\backup_2026-10-06_10-04.zip
VERBOSE: Performing the operation "Remove File" on target "...\bkS\backup_2020-01-01_00-00.zip".
~~~

وفضل في الفولدر الجديد بس. لاحظ إن الفلتر على [[LastWriteTime]] مش على التاريخ اللي في الاسم.

---

## الخلاصة

| الخطوة | السطر | ليه |
|---|---|---|
| ١ | [[param(...)]] | المصدر والوجهة يتغيروا من غير ما تعدّل الملف |
| ٢ | [[$ErrorActionPreference = "Stop"]] | أي error يوقف بدل Saved كذب |
| ٣ | [[Test-Path]] + [[New-Item]] | اعمل فولدر الباك أب لو مش موجود |
| ٤ | [[Get-Date -Format]] | تاريخ ينفع في اسم ملف ويترتب صح |
| ٥ | [[Join-Path]] | المسار الكامل من غير لعب في [[\]] |
| ٦ | [[Compress-Archive "$Source\*"]] | المحتوى، مش الفولدر نفسه |
| ٧ | [[Write-Host]] | قول اتحفظ فين |

وافتكر: [[Compress-Archive]] على فولدر فاضي بيسكت، فافحص إن الـ zip اتعمل. والمسح دايمًا بعد [[Where-Object]]، وجرّبه الأول بـ [[-WhatIf]].`,
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
          sol: R`جربته على PowerShell 7.6 و 5.1 في فولدر اسمه فيه مسافة ([[my lab]]) وجوه app ملف اسمه فيه مسافة: [[.\backup.ps1 -Source .\app -Dest .\bk]] طبع [[Saved .\bk\backup_2026-10-02_20-45.zip]] بالأخضر. والحل الكامل في الـ solCode: آخر 3 سطور بيمسحوا أي باك أب أقدم من [[KeepDays]] أيام. جربته بملف قديم آخر تعديل عليه من 10 أيام فطلع [[VERBOSE: Performing the operation "Remove File" on target "...\bk\backup_2020-01-01_00-00.zip".]]، والجديد فضل.

لو شغلته مرتين في نفس الدقيقة هيطلع [[The archive file ... already exists. Use the -Update parameter...]]، لأن الاسم بالدقيقة؛ ضيف ثواني للـ format ([[yyyy-MM-dd_HH-mm-ss]]) لو محتاج. ولو المصدر مش موجود: [[The path '.\nope\*' either does not exist or is not a valid file system path.]]

وفيه غلطة لقيتها وانا بجرّب: لو فولدر المصدر فاضي، [[Compress-Archive]] مبيعملش zip ومبيطلعش error (في 7 و 5.1)، والسكربت يطبع Saved كأن كله تمام. عشان كده الـ solCode فيه سطر بعد Compress-Archive بيتأكد إن الملف اتعمل، وإلا [[throw]]. واتأكد إن [[Where-Object]] قبل [[Remove-Item]] دايمًا، وجرب الأول بـ [[-WhatIf]] بدل [[-Verbose]].`,
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
if (-not (Test-Path $zip)) { throw "Nothing to back up in $Source" }
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
          teach: R`## الفكرة

السكربت بيعمل ٣ فحوصات بالترتيب: Docker شغال؟ البورتات اللي الـ stack محتاجها فاضية؟ وبعدين يشغّل الـ stack ويستنى لحد ما يبقى healthy فعلًا. لو أي خطوة فشلت يقف برسالة واضحة.

اتجرب في PowerShell 7.6 و 5.1 على ويندوز ١١ مع Docker Desktop (Compose v5.3.0)، بـ [[docker-compose.yml]] تجربة فيه خدمة واحدة اسمها [[cache]] (صورة [[redis:7-alpine]] على بورت 8000، وليها healthcheck بـ [[redis-cli ping]]). والسكربت اتشغّل بـ [[pwsh -File .\verify-stack.ps1]].

---

## الجزء ١: التجهيز

### [[$ErrorActionPreference = "Stop"]]

أي error من cmdlet (أمر PowerShell زي [[Set-Location]]) يوقف السكربت. لكن خلي بالك: ده **مش** بيأثر على برامج خارجية زي [[docker]]. عشان كده هنفحص [[docker]] بنفسنا تحت.

### [[Set-Location $PSScriptRoot]]

[[$PSScriptRoot]] متغير جاهز فيه **الفولدر اللي ملف السكربت نفسه موجود فيه**، مش الفولدر اللي انت واقف فيه. و [[Set-Location]] (زي [[cd]]) بيدخله. ليه؟ لأن [[docker compose]] بيدوّر على [[docker-compose.yml]] في الفولدر الحالي، فكده السكربت يشتغل صح حتى لو شغلته من أي مكان:

~~~powershell
pwsh -File D:\shop\verify-stack.ps1     # من أي فولدر، هيشتغل جوه D:\shop
~~~

---

## الجزء ٢: Docker شغال؟

~~~powershell
docker info > $null
if ($LASTEXITCODE -ne 0) { throw "Docker Desktop is not running" }
~~~

### [[docker info > $null]]

[[docker info]] بيسأل الـ Docker daemon (البرنامج اللي شغال في الخلفية مع Docker Desktop) عن حالته. لو الـ daemon مش شغال، مفيش حد يرد فيفشل.

و [[> $null]]: [[>]] يعني «ابعت الناتج لـ»، و [[$null]] يعني «ولا حاجة». فالصفحة الطويلة اللي [[docker info]] بيطبعها بتترمي. لكن [[>]] بيرمي الناتج العادي (stdout) بس، فرسالة الـ error (stderr) بتفضل تظهر، وده كويس: بتقولك السبب.

### [[$LASTEXITCODE]]

كل برنامج خارجي لما يخلص بيرجع رقم اسمه **exit code**: [[0]] يعني نجح، وأي رقم تاني يعني فشل. و [[$LASTEXITCODE]] فيه رقم آخر برنامج خارجي اشتغل.

~~~text الناتج و Docker شغال
code: 0
~~~

### [[if ($LASTEXITCODE -ne 0) { throw "..." }]]

[[-ne]] يعني not equal (مش بيساوي). فلو الرقم مش صفر، [[throw]] يرمي error برسالتك ويوقف السكربت.

مقدرتش أقفل Docker Desktop على الجهاز ده، فجربت حالة «مفيش daemon» بإني وجّهت docker لعنوان مش موجود ([[$env:DOCKER_HOST = "npipe:////./pipe/ps16_nope"]]):

~~~text الناتج في PowerShell 7.6
failed to connect to the docker API at npipe:////./pipe/ps16_nope; check if the path is correct and if the daemon is running: open //./pipe/ps16_nope: The system cannot find the file specified.
Exception: ...\verify-stack.ps1:5
     | Docker Desktop is not running
~~~

السطر الأول من docker نفسه (stderr)، والتاني رسالتك. ولما Docker Desktop مقفول بجد الرسالة بتبقى عن [[dockerDesktopLinuxEngine]] بدل [[ps16_nope]]، والسكربت بيتصرف بنفس الطريقة.

---

## الجزء ٣: البورتات

~~~powershell
foreach ($port in 3000, 8000, 5432) {
    if (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) {
        Write-Warning "Port $port is already in use"
    }
}
~~~

### [[foreach ($port in 3000, 8000, 5432)]]

[[3000, 8000, 5432]] لستة أرقام (الفاصلة بتعمل array). واللوب بيحط كل رقم في [[$port]] بالدور. الأرقام دي البورتات المعتادة للـ frontend والـ API و PostgreSQL، غيّرها لبورتات مشروعك.

### [[Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue]]

| الحتة | معناها |
|---|---|
| [[Get-NetTCPConnection]] | هات اتصالات TCP على الجهاز |
| [[-LocalPort $port]] | على البورت ده بس |
| [[-State Listen]] | اللي فيه برنامج **سامع** ومستني اتصالات، مش اتصالات قديمة |
| [[-ErrorAction SilentlyContinue]] | لو مفيش ولا واحد، الأمر بيطلع error؛ ده بيسكّته |

على الجهاز ده بورت 5432 كان عليه PostgreSQL متسطب:

~~~text Get-NetTCPConnection -LocalPort 5432 -State Listen
LocalAddress LocalPort  State
------------ ---------  -----
::1               5432 Listen
::                5432 Listen
~~~

### ليه الأمر نفسه جوه [[if]]؟

[[if]] في PowerShell بيعتبر أي حاجة رجعت «صح»، وأي حاجة فاضية «غلط». فلو الأمر رجّع صفوف زي اللي فوق يبقى البورت مشغول، ولو رجّع ولا حاجة يبقى فاضي.

### [[Write-Warning]]

بيطبع رسالة صفرا قدامها [[WARNING:]]. تحذير بس، مش وقف، لأن ساعات البورت مشغول بالـ stack نفسه من تشغيلة قبل كده.

~~~text الناتج
WARNING: Port 5432 is already in use
~~~

---

## الجزء ٤: شغّل واستنى

### [[docker compose up -d --build --wait --wait-timeout 120]]

| الحتة | معناها |
|---|---|
| [[docker compose up]] | شغّل كل الخدمات اللي في [[docker-compose.yml]] |
| [[-d]] | detached: في الخلفية، والترمنال يرجعلك |
| [[--build]] | ابني الصور من الـ Dockerfile الأول لو فيه تعديل |
| [[--wait]] | متخلصش غير لما كل خدمة تبقى running، واللي ليها healthcheck تبقى healthy |
| [[--wait-timeout 120]] | بحد أقصى ١٢٠ ثانية |

الـ **healthcheck** أمر بتكتبه في [[docker-compose.yml]] وDocker بيشغّله جوه الـ container كل شوية: لو نجح الخدمة [[healthy]]، ولو فشل كذا مرة ورا بعض تبقى [[unhealthy]]. ده الناتج على الـ stack التجربة:

~~~text الناتج
 Container ps16ok-cache-1 Started
 Container ps16ok-cache-1 Waiting
 Container ps16ok-cache-1 Healthy
~~~

السطر ده خلص بعد حوالي ٤ ثواني، أول ما الـ healthcheck نجح. ده الفرق عن [[Start-Sleep 10]]: مش بتستنى وقت ثابت بالتخمين.

### لو فشل

~~~powershell
if ($LASTEXITCODE -ne 0) {
    docker compose ps
    docker compose logs --tail 50
    throw "Stack did not become healthy"
}
~~~

- [[docker compose ps]]: جدول بكل خدمة وحالتها.
- [[docker compose logs --tail 50]]: آخر ٥٠ سطر من لوج كل خدمة.
- [[throw]]: وقّف.

جربته بـ stack تاني الـ healthcheck بتاعه [[false]] (بيفشل دايمًا):

~~~text الناتج (مختصر)
container ps16bad-cache-1 is unhealthy
NAME              IMAGE            ...   STATUS                     PORTS
ps16bad-cache-1   redis:7-alpine   ...   Up 5 seconds (unhealthy)   0.0.0.0:8001->6379/tcp
cache-1  | 1:M 06 Oct 2026 07:06:32.456 * Ready to accept connections tcp
Exception: ...\verify-stack.ps1:17
     | Stack did not become healthy
~~~

لاحظ إنه وقف بعد ٦ ثواني مش ١٢٠: أول ما الخدمة بقت unhealthy، compose رجّع exit code مش صفر على طول.

---

## الجزء ٥: الآخر

[[docker compose ps]] تاني عشان تشوف الحالة النهائية، و [[Write-Host ... -ForegroundColor Green]] رسالة بالأخضر:

~~~text الناتج
NAME             IMAGE            ...   STATUS                   PORTS
ps16ok-cache-1   redis:7-alpine   ...   Up 3 seconds (healthy)   0.0.0.0:8000->6379/tcp, [::]:8000->6379/tcp
Ready: http://localhost:8000
~~~

ولو شغلته والـ stack شغال أصلًا (جربتها في 5.1): هيحذّرك إن 8000 مشغول (ده الـ stack نفسه)، و compose يقول [[Running]] بدل [[Started]]، ويوصل لـ Ready عادي.

---

## الخلاصة

| الخطوة | السطر | ليه |
|---|---|---|
| ١ | [[Set-Location $PSScriptRoot]] | اشتغل جنب [[docker-compose.yml]] من أي مكان |
| ٢ | [[docker info > $null]] + [[$LASTEXITCODE]] | Docker شغال؟ برنامج خارجي، فافحص الـ exit code بنفسك |
| ٣ | [[Get-NetTCPConnection -State Listen]] | حذّر لو بورت مشغول |
| ٤ | [[up -d --build --wait]] | شغّل واستنى healthy بدل Start-Sleep |
| ٥ | [[ps]] + [[logs --tail 50]] + [[throw]] | لو فشل: مين وليه |
| ٦ | [[Ready]] | جاهز فعلًا |

افتكر: [[$ErrorActionPreference = "Stop"]] مش بيوقف على فشل [[docker]] أو أي برنامج خارجي، والفحص على [[$LASTEXITCODE]] هو اللي بيعمل كده. و [[--wait]] قوته من الـ healthcheck، من غيره بيستنى running بس.`,
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
          sol: R`و Docker Desktop مقفول: [[docker info]] بيطبع error زي [[failed to connect to the docker API at npipe:////./pipe/dockerDesktopLinuxEngine; ... The system cannot find the file specified.]] (النسخ الأقدم من docker بتبدأها بـ [[error during connect]])، وبعدها السكربت يرمي [[Docker Desktop is not running]] بالأحمر ويقف، من غير ما يحاول يعمل build.

وهو شغال: لو فيه بورت مستخدم هتشوف [[WARNING: Port 5432 is already in use]]. وبعدين الـ build، وسطور زي [[Container app-db-1 Healthy]]، وفي الآخر جدول [[docker compose ps]] و [[Ready: http://localhost:8000]] بالأخضر. لو خدمة مفيهاش healthcheck، [[--wait]] بيستنى إنها تبقى running بس. ولو خدمة وقعت أو فضلت unhealthy 120 ثانية، هتشوف حالة الخدمات وآخر 50 سطر لوج وبعدين [[Stack did not become healthy]].

جربته في PowerShell 7.6 و 5.1 مع Docker Desktop و Compose v5.3.0، بـ stack فيه خدمة redis ليها healthcheck: طبع [[WARNING: Port 5432 is already in use]] (كان فيه PostgreSQL على الجهاز)، وبعدين [[Container ps16ok-cache-1 Healthy]] بعد حوالي ٤ ثواني، والجدول، و [[Ready: http://localhost:8000]]. وبـ healthcheck بيفشل دايمًا: [[container ps16bad-cache-1 is unhealthy]] بعد ٦ ثواني، والجدول فيه [[(unhealthy)]]، واللوجات، و [[Stack did not become healthy]]، و exit code [[1]]. حالة «Docker مقفول» جربتها بإني وجّهت [[DOCKER_HOST]] لـ pipe مش موجود (مقفلتش Docker Desktop نفسه)، فطلع [[failed to connect to the docker API at npipe:...]] وبعدها [[Docker Desktop is not running]].`
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
        Rename-Item -LiteralPath $p.FullName -NewName $newName
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

[[{1:D3}]]: الـ D يعني رقم صحيح، و 3 أقل عدد خانات. لو عندك أكتر من ٩٩٩ صورة خليها D4. الترقيم بالأصفار بيخلي الترتيب الأبجدي (حرف حرف، زي [[Sort-Object]] ومواقع الرفع) هو نفس ترتيب الأرقام.

الـ WhatIf: السكربت مفيهوش [[ShouldProcess]] بإيده، بس [[SupportsShouldProcess]] بيخلي [[-WhatIf]] يوصل لـ [[Rename-Item]] لوحده، فبيطبع «What if: Performing the operation "Rename File"...» لكل ملف.

[[-LiteralPath]] بدل [[-Path]]: في [[-Path]] الأقواس المربعة معناها wildcard، فصورة اسمها [[[1] beach.jpg]] في 5.1 طلّعت [[Cannot rename because item at '...' does not exist.]] وفضلت باسمها. بـ [[-LiteralPath]] الاسم بيتاخد حرف حرف، واشتغلت في 7 و 5.1.

لو عايز الترتيب بتاريخ التصوير الحقيقي: [[System.Drawing]] أو أداة زي exiftool بتقرا EXIF، وده أعقد من الدرس ده.`,
            when: "صور رحلة، سكرينشوتات لمشروع، فواتير PDF عايزها مترقمة، أي فولدر أسامي ملفاته عشوائية.",
            mistakes: R`تشغّله من غير [[-WhatIf]] على الفولدر الغلط. أو تزوّد صور بين تشغيلتين وتشغّله بنفس البادئة: جربتها بصورة جديدة أقدم من الباقي، فطلع [[Cannot create a file when that file already exists.]] مرتين، والصورة الجديدة فضلت باسمها، و beach_002 اختفى والباقي اتزحزح رقم. الحل تشغّله ببادئة جديدة. أو تنسى [[-File]] فيحاول يغيّر أسامي فولدرات.`
          },
          teach: R`## الفكرة

السكربت بيعمل ٣ حاجات: يجمع الصور في لستة، يرتبها من الأقدم للأحدث، ويلف عليها يدّي كل واحدة اسم مترقم. هنمشي عليه بالترتيب.

اتجرب في PowerShell 7.6 و 5.1 على ويندوز ١١، في فولدر اسمه [[my photos]] فيه ٤ ملفات (الناتج في الاتنين واحد):

~~~text الملفات قبل السكربت
Name             Extension LastWriteTime
----             --------- -------------
holiday pic.jpeg .jpeg     10/5/2026 10:08:07 AM
IMG 001.JPG      .JPG      10/3/2026 10:08:07 AM
IMG 002.jpg      .jpg      9/26/2026 10:08:07 AM
notes.txt        .txt      10/6/2026 10:08:07 AM
~~~

---

## الجزء ١: الرأس

### [[[CmdletBinding(SupportsShouldProcess)]]]

السطر ده فوق [[param]] بيحوّل السكربت لـ **advanced script**، يعني بيتصرف زي cmdlet حقيقي. و [[SupportsShouldProcess]] معناها «السكربت ده بيغيّر حاجات، فادّيله [[-WhatIf]] و [[-Confirm]]». أول ما تشغّله بـ [[-WhatIf]]، أي أمر جواه بيغيّر حاجة (زي [[Rename-Item]]) بيوصله الـ WhatIf لوحده، فبيطبع اللي **كان هيعمله** بدل ما يعمله.

### [[param( ... )]]

~~~powershell
param(
    [string]$Path = ".",
    [string]$Prefix = "trip"
)
~~~

parameterين نص: [[$Path]] الفولدر (و [[.]] يعني الفولدر الحالي)، و [[$Prefix]] أول الاسم الجديد.

---

## الجزء ٢: اللستة

~~~powershell
$photos = Get-ChildItem $Path -File |
    Where-Object Extension -in ".jpg", ".jpeg", ".png" |
    Sort-Object LastWriteTime
~~~

ده pipeline واحد مكسور على ٣ سطور (الـ [[|]] في آخر السطر معناه «لسه مكمّل»). نمشي عليه حلقة حلقة:

### ١. [[Get-ChildItem $Path -File]]

هات اللي في الفولدر، و [[-File]] يعني ملفات بس من غير فولدرات. هنا رجّع الأربعة.

### ٢. [[Where-Object Extension -in ".jpg", ".jpeg", ".png"]]

كل ملف ليه خانة [[Extension]] فيها الامتداد بالنقطة ([[.JPG]]). و [[-in]] بيسأل: القيمة دي موجودة في اللستة دي؟ والمقارنة في PowerShell مش بتفرّق بين كابيتال وسمول:

~~~powershell
".JPG" -in ".jpg", ".jpeg", ".png"
~~~

~~~text الناتج
True
~~~

فـ [[IMG 001.JPG]] عدّى، و [[notes.txt]] اتشال.

### ٣. [[Sort-Object LastWriteTime]]

رتّب بتاريخ آخر تعديل، من الأقدم للأحدث. فالترتيب بقى: [[IMG 002.jpg]] (9/26) ثم [[IMG 001.JPG]] (10/3) ثم [[holiday pic.jpeg]] (10/5).

### وليه نحطهم في [[$photos]] الأول؟

عشان اللستة تتجمع **كلها** قبل أي تغيير اسم. لو بتغيّر الأسامي وانت لسه بتقرا الفولدر، ممكن ملف اتغيّر اسمه يتقري تاني كأنه جديد.

---

## الجزء ٣: اللوب

### [[$i = 1]]

عدّاد بيبدأ من ١. هو اللي هيبقى رقم الصورة.

### [[foreach ($p in $photos) {]]

لكل صورة في اللستة، حطها في [[$p]]. و [[$p]] مش اسم بس، ده object فيه [[Name]] و [[FullName]] (المسار الكامل) و [[Extension]] وغيرهم.

### [[$newName = "{0}_{1:D3}{2}" -f $Prefix, $i, $p.Extension.ToLower()]]

[[-f]] اسمه format operator: على شماله قالب، وعلى يمينه القيم، وكل [[{رقم}]] في القالب بيتبدّل بالقيمة اللي في المكان ده (العد من صفر):

| في القالب | بيتبدّل بـ | في أول لفة |
|---|---|---|
| [[{0}]] | [[$Prefix]] | [[trip]] |
| [[_]] | نفسه | [[_]] |
| [[{1:D3}]] | [[$i]] بـ ٣ خانات على الأقل | [[001]] |
| [[{2}]] | الامتداد بحروف صغيرة | [[.jpg]] |

و [[:D3]]: الـ [[D]] من Decimal (رقم صحيح)، و [[3]] أقل عدد خانات، فبيكمّل بأصفار على الشمال. و [[.ToLower()]] بتحوّل النص لحروف صغيرة، فـ [[.JPG]] تبقى [[.jpg]]. جرّبهم لوحدهم:

~~~powershell
"{0}_{1:D3}{2}" -f "trip", 7, ".JPG".ToLower()
~~~

~~~text الناتج
trip_007.jpg
~~~

ليه الأصفار؟ لأن أدوات كتير بترتب الأسامي حرف حرف، فمن غيرها [[trip_10]] بتيجي قبل [[trip_2]]. جربت [[Sort-Object]] على [[trip_2.jpg]] و [[trip_10.jpg]] و [[trip_1.jpg]] فطلّع [[trip_1.jpg]] ثم [[trip_10.jpg]] ثم [[trip_2.jpg]]. (Explorer نفسه بيرتب الأرقام صح، بس مواقع الرفع وأدوات تانية لأ.)

### [[if ($p.Name -ne $newName) { ... }]]

[[-ne]] يعني «مش بيساوي». لو اسم الملف هو نفسه الاسم الجديد، عدّيه. ده بيخلي التشغيلة التانية متطلعش error.

### [[Rename-Item -LiteralPath $p.FullName -NewName $newName]]

غيّر الاسم. [[-NewName]] الاسم بس (من غير فولدر). و [[-LiteralPath]] بدل [[-Path]] عشان الاسم يتاخد حرف حرف: في [[-Path]] الأقواس المربعة [[[ ]]] ليها معنى wildcard، فصورة اسمها [[[1] beach.jpg]] كانت هتفشل.

### [[$i++]]

زوّد [[$i]] واحد. لاحظ إنه **بره** الـ [[if]]: حتى الملف اللي اتعدّى بياخد رقمه، فالترقيم ميتلخبطش.

---

## الجزء ٤: [[Write-Host "Renamed $($photos.Count) files"]]

[[$photos.Count]] عدد العناصر في اللستة. و [[$( )]] جوه النص لازمة عشان [[.Count]] تتحسب؛ من غيرها PowerShell هيحط [[$photos]] بس ويكتب [[.Count]] كلام عادي.

---

## التشغيل

### بـ [[-WhatIf]] الأول

~~~powershell
.\rename-photos.ps1 -Path ".\my photos" -WhatIf
~~~

~~~text الناتج (المسارات مختصرة)
What if: Performing the operation "Rename File" on target "Item: ...\my photos\IMG 002.jpg Destination: ...\my photos\trip_001.jpg".
What if: Performing the operation "Rename File" on target "Item: ...\my photos\IMG 001.JPG Destination: ...\my photos\trip_002.jpg".
What if: Performing the operation "Rename File" on target "Item: ...\my photos\holiday pic.jpeg Destination: ...\my photos\trip_003.jpeg".
Renamed 3 files
~~~

ولا ملف اتغيّر. و «Renamed 3 files» بتطلع برضه، لأنها عدد اللستة مش عدد اللي اتعمل فعلًا.

### من غير [[-WhatIf]]

~~~text Get-ChildItem ".\my photos" -Name
notes.txt
trip_001.jpg
trip_002.jpg
trip_003.jpeg
~~~

[[.JPG]] بقت [[.jpg]]، و [[notes.txt]] متلمسش. والتشغيلة التالتة بنفس البادئة طبعت [[Renamed 3 files]] من غير error (الـ [[if]] عدّاهم كلهم). وبـ [[-Prefix beach]] بقوا [[beach_001.jpg]] و [[beach_002.jpg]] و [[beach_003.jpeg]].

---

## الخلاصة

| الخطوة | السطر | ليه |
|---|---|---|
| ١ | [[[CmdletBinding(SupportsShouldProcess)]]] | [[-WhatIf]] يوصل لـ Rename-Item |
| ٢ | [[Get-ChildItem -File]] | ملفات بس |
| ٣ | [[Where-Object Extension -in ...]] | صور بس، JPG زي jpg |
| ٤ | [[Sort-Object LastWriteTime]] | الأقدم ياخد 001 |
| ٥ | [[-f]] و [[{1:D3}]] | الاسم بأصفار عشان الترتيب |
| ٦ | [[if ($p.Name -ne $newName)]] | التشغيلة التانية متكسرش |
| ٧ | [[-LiteralPath]] | أسامي فيها [[[ ]]] |
| ٨ | [[$i++]] | الرقم الجاي |

افتكر: [[-WhatIf]] الأول دايمًا، والترتيب بتاريخ آخر تعديل مش تاريخ التصوير.`,
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
            "...غيّره. [[-LiteralPath]] عشان الاسم يتاخد زي ما هو حتى لو فيه أقواس مربعة.",
            "قفلة الـ if.",
            "زوّد العدّاد.",
            "قفلة اللوب.",
            "اطبع العدد."
          ],
          sol: R`جربته على PowerShell 7.6 و 5.1 في فولدر اسمه [[my photos]] فيه ٣ ملفات [[IMG 001.JPG]] و [[IMG 002.jpg]] و [[holiday pic.jpeg]] بتواريخ مختلفة و [[notes.txt]]. مع [[-WhatIf]] طبع ٣ سطور زي [[What if: Performing the operation "Rename File" on target "Item: ...\IMG 002.jpg Destination: ...\trip_001.jpg".]] بالترتيب من الأقدم، و [[Renamed 3 files]] (العدد حتى مع WhatIf، لأنه عدد اللستة). من غير WhatIf بقوا [[trip_001.jpg]] و [[trip_002.jpg]] و [[trip_003.jpeg]]، و notes.txt متلمسش. لاحظ إن [[.JPG]] بقت [[.jpg]].

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
    while (Test-Path -LiteralPath $dest) {
        $dest = Join-Path $destDir ("{0} ({1}){2}" -f $file.BaseName, $n, $file.Extension)
        $n++
    }
    Move-Item -LiteralPath $file.FullName -Destination $dest
}`,
          try: R`اعمل فولدر تجربة فيه a.pdf و b.PNG و c.zip و d.exe و e.xyz و g.jpg، وجواه فولدر Images فيه g.jpg تاني. شغّله بـ [[-Path]] الفولدر ده و [[-WhatIf]]، وبعدين من غيرها، واعرض النتيجة بـ [[Get-ChildItem -Recurse -Name]].`,
          flag: "script",
          deep: {
            why: "فولدر Downloads عند أغلب الناس فيه آلاف الملفات من سنين. السكربت ده بيرتبه في ثواني، وتقدر تحطه في Task Scheduler (درس Register-ScheduledTask) يشتغل كل أسبوع.",
            how: R`ليه hashtable جوه لوب ومش [[switch]]؟ الاتنين ينفعوا. الـ hashtable بيخلي الإعدادات (أنهي امتداد في أنهي فولدر) منفصلة عن المنطق، فتعدّلها من غير ما تلمس اللوب، وممكن بعدين تقراها من ملف JSON.

[[break]] جوه الـ foreach الداخلي بيخرج منه بس، مش من اللوب الخارجي. والـ [[if]] اللي على سطر واحد فيه أمرين مفصولين بـ [[;]].

الفلتر [[-File]] مهم: من غيره الفولدرات اللي السكربت لسه عاملها (Images و Documents) هتتنقل جوه Other في التشغيلة الجاية.

الاسم المكرر: [[Test-Path $dest]] لو الاسم موجود، يجرّب [[name (1).ext]] وبعدين [[(2)]] لحد ما يلاقي اسم فاضي. و [[$file.Extension]] بيرجع الامتداد بالنقطة زي ما هو، فالملف [[b.PNG]] بيفضل PNG.

ليه [[-LiteralPath]]؟ في [[-Path]] الأقواس المربعة wildcard، و Downloads مليانة أسامي زي [[[Book] guide.pdf]]. جربت النسخة اللي من غيرها: الملف ده فضل مكانه من غير أي error في 7 و 5.1، و Test-Path مشافش النسخة اللي في Documents. بـ [[-LiteralPath]] اتنقل وبقى [[[Book] guide (1).pdf]].

مع [[-WhatIf]]: الفولدرات مش بتتعمل فعلًا، فـ Test-Path بيرجع False كل مرة، وهتشوف «Create Directory» مكرر لنفس الفولدر. ده طبيعي في التجربة.

ملفات بتتحمّل دلوقتي ([[.crdownload]] في Chrome و [[.part]] في Firefox) هتروح Other؛ ممكن تستثنيها بـ [[Where-Object Extension -notin ".crdownload", ".part", ".tmp"]].`,
            when: "Downloads و Desktop وأي فولدر بيتراكم فيه كل حاجة. وكمان كقالب لأي سكربت «وزّع الملفات حسب قاعدة».",
            mistakes: R`تشغّله على فولدر مشروع بالغلط فيبعتر ملفات الكود (عشان كده [[-WhatIf]]). أو تنسى [[-File]]. أو تستخدم [[Move-Item -Force]] بدل لوب الأسامي فتكتب فوق ملفات بنفس الاسم من غير ما تعرف.`
          },
          teach: R`## الفكرة

لكل ملف في الفولدر: اعرف هو من أنهي مجموعة (صور، مستندات...)، اعمل فولدر المجموعة لو مش موجود، ولاقي اسم مش متاخد، وانقله. هنمشي عليه بالترتيب: الإعدادات، وبعدين اللوب الكبير ٤ خطوات.

اتجرب في PowerShell 7.6 و 5.1 على ويندوز ١١ (الناتج واحد)، في فولدر تجربة اسمه [[dl test]] فيه [[a.pdf]] و [[b.PNG]] و [[c.zip]] و [[d.exe]] و [[e.xyz]] و [[g.jpg]]، وجواه فولدر [[Images]] فيه [[g.jpg]] تاني.

---

## الجزء ١: الرأس

### [[[CmdletBinding(SupportsShouldProcess)]]]

بيخلي السكربت ياخد [[-WhatIf]]، وده بيوصل لوحده لـ [[New-Item]] و [[Move-Item]] جواه، فتشوف كل اللي هيحصل من غير ما يحصل.

### [[[string]$Path = (Join-Path $HOME "Downloads")]]

- [[$HOME]] متغير جاهز فيه فولدر اليوزر بتاعك.
- [[Join-Path]] يلزق عليه [[Downloads]].
- الأقواس [[( )]] حوالين الأمر لازمة: القيمة الافتراضية لـ parameter لو أمر لازم تبقى بين أقواس عشان تتنفذ.

~~~text Join-Path $HOME "Downloads"
C:\Users\ali\Downloads
~~~

---

## الجزء ٢: [[$groups]]، الإعدادات

~~~powershell
$groups = @{
    Images     = ".jpg", ".jpeg", ".png", ".gif", ".webp"
    Documents  = ".pdf", ".docx", ".xlsx", ".pptx", ".txt"
    Archives   = ".zip", ".rar", ".7z"
    Installers = ".exe", ".msi"
}
~~~

[[@{ }]] اسمها **hashtable**: لستة أزواج «مفتاح = قيمة». المفتاح هنا اسم الفولدر، والقيمة array امتدادات (الفاصلة بتعمل array). والمسافات قبل [[=]] للشكل بس.

حاجتين هنستخدمهم منها:

| الكتابة | بترجع إيه |
|---|---|
| [[$groups.Keys]] | كل المفاتيح: أسامي الفولدرات |
| [[$groups["Images"]]] | القيمة بتاعة المفتاح ده: امتدادات الصور |

جربتهم على hashtable أصغر:

~~~powershell
$groups = @{ Images = ".jpg", ".png"; Archives = ".zip" }
$groups.Keys -join ","
$groups["Images"] -join ","
~~~

~~~text الناتج
Images,Archives
.jpg,.png
~~~

ترتيب المفاتيح في [[@{ }]] مش مضمون، وهنا مش فارق لأن كل امتداد في مجموعة واحدة بس.

---

## الجزء ٣: اللوب الكبير

### [[foreach ($file in Get-ChildItem $Path -File) {]]

لكل **ملف** في الفولدر ([[-File]]: من غير فولدرات). ده مهم: من غيره، الفولدرات اللي السكربت نفسه عملها (Images و Documents) هتتنقل جوه Other المرة الجاية.

كل [[$file]] object فيه خانات، والسكربت بيستخدم ٣ منهم:

~~~text Get-Item ".\dl test\b.PNG" | Format-List Name, BaseName, Extension
Name      : b.PNG
BaseName  : b
Extension : .PNG
~~~

### الخطوة ١: أنهي مجموعة؟

~~~powershell
$folder = "Other"
foreach ($name in $groups.Keys) {
    if ($file.Extension -in $groups[$name]) { $folder = $name; break }
}
~~~

1. ابدأ بافتراض إن الملف [[Other]].
2. لف على أسامي المجموعات واحد واحد.
3. [[$file.Extension -in $groups[$name]]]: امتداد الملف موجود في امتدادات المجموعة دي؟ و [[-in]] مش بيفرّق كابيتال وسمول، فـ [[.PNG]] لقاها في Images.
4. لو آه: [[$folder = $name]] خد اسمها، و [[;]] بتفصل أمرين على نفس السطر، و [[break]] اخرج من اللوب **الداخلي** بس (اللوب الكبير بيكمّل للملف اللي بعده).

لـ [[e.xyz]] مفيش مجموعة فيها [[.xyz]]، فـ [[$folder]] فضل [[Other]].

### الخطوة ٢: فولدر المجموعة

~~~powershell
$destDir = Join-Path $Path $folder
if (-not (Test-Path $destDir)) { New-Item -ItemType Directory $destDir | Out-Null }
~~~

[[$destDir]] بقى زي [[.\dl test\Images]]. لو مش موجود ([[-not (Test-Path ...)]]) اعمله، و [[| Out-Null]] ارمي الجدول اللي New-Item بيطبعه.

### الخطوة ٣: اسم مش متاخد

~~~powershell
$dest = Join-Path $destDir $file.Name
$n = 1
while (Test-Path -LiteralPath $dest) {
    $dest = Join-Path $destDir ("{0} ({1}){2}" -f $file.BaseName, $n, $file.Extension)
    $n++
}
~~~

- [[$dest]] المكان اللي الملف رايحله بنفس اسمه.
- [[while (شرط) { }]] لوب بيتكرر **طول ما** الشرط صح. والشرط: فيه ملف بالاسم ده هناك؟
- لو آه، ابني اسم جديد بـ [[-f]]: [[{0}]] الاسم من غير امتداد، و [[({1})]] الرقم بين قوسين، و [[{2}]] الامتداد.

~~~powershell
"{0} ({1}){2}" -f "g", 1, ".jpg"
~~~

~~~text الناتج
g (1).jpg
~~~

- [[$n++]] زوّد الرقم، ولو [[g (1).jpg]] كمان موجود يجرّب [[g (2).jpg]]، وهكذا لحد ما يلاقي اسم فاضي.

و [[-LiteralPath]]: الاسم يتاخد زي ما هو، لأن في [[-Path]] الأقواس المربعة wildcard، وأسامي زي [[[Book] guide.pdf]] كتير في Downloads.

### الخطوة ٤: [[Move-Item -LiteralPath $file.FullName -Destination $dest]]

انقل الملف ([[FullName]] = المسار الكامل) للمكان اللي لقيناه.

---

## التشغيل

### بـ [[-WhatIf]]

~~~text الناتج (المسارات مختصرة)
What if: Performing the operation "Create Directory" on target "Destination: ...\dl test\Documents".
What if: Performing the operation "Move File" on target "Item: ...\dl test\a.pdf Destination: ...\dl test\Documents\a.pdf".
What if: Performing the operation "Move File" on target "Item: ...\dl test\b.PNG Destination: ...\dl test\Images\b.PNG".
What if: Performing the operation "Create Directory" on target "Destination: ...\dl test\Archives".
...
What if: Performing the operation "Move File" on target "Item: ...\dl test\g.jpg Destination: ...\dl test\Images\g (1).jpg".
~~~

مفيش «Create Directory» لـ Images لأنه موجود أصلًا، و [[g.jpg]] رايح باسم [[g (1).jpg]] لأن فيه واحد بنفس الاسم هناك.

### من غير [[-WhatIf]]

~~~text Get-ChildItem ".\dl test" -Recurse -Name
Archives
Documents
Images
Installers
Other
Archives\c.zip
Documents\a.pdf
Images\b.PNG
Images\g (1).jpg
Images\g.jpg
Installers\d.exe
Other\e.xyz
~~~

---

## الخلاصة

| الخطوة | السطر | ليه |
|---|---|---|
| ١ | [[$groups = @{ ... }]] | الإعدادات منفصلة: نوع جديد = سطر |
| ٢ | [[Get-ChildItem -File]] | ملفات بس، مش الفولدرات اللي اتعملت |
| ٣ | [[foreach]] + [[-in]] + [[break]] | لاقي المجموعة، أو Other |
| ٤ | [[Test-Path]] + [[New-Item]] | فولدر المجموعة |
| ٥ | [[while (Test-Path -LiteralPath $dest)]] | [[ (1)]] و [[ (2)]] بدل الكتابة فوق ملف |
| ٦ | [[Move-Item -LiteralPath]] | انقل |

افتكر: [[-WhatIf]] الأول، و [[-File]] عشان متنقلش الفولدرات، ولوب الأسامي بدل [[-Force]].`,
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
            "...طول ما فيه ملف بنفس الاسم ([[-LiteralPath]]: الاسم زي ما هو حتى لو فيه أقواس مربعة)...",
            "...جرّب الاسم مع (1) أو (2)...",
            "...وزوّد.",
            "...قفلة.",
            "...انقل الملف (برضه بـ [[-LiteralPath]]).",
            "قفلة."
          ],
          sol: R`جربته على الفولدر ده بالظبط (اسمه [[dl test]] بمسافة) في PowerShell 7.6 و 5.1 والناتج واحد. مع [[-WhatIf]] طلع سطر [[Create Directory]] لكل فولدر مش موجود و [[Move File]] لكل ملف، وآخرهم [[Destination: ...\Images\g (1).jpg]] لأن g.jpg موجود في Images. وبعد التشغيل الحقيقي [[Get-ChildItem -Recurse -Name]] طلع: [[Archives\c.zip]] و [[Documents\a.pdf]] و [[Images\b.PNG]] و [[Images\g.jpg]] (القديم) و [[Images\g (1).jpg]] (الجديد) و [[Installers\d.exe]] و [[Other\e.xyz]].

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
          teach: R`## الفكرة

السكربت بيحسب تاريخ فاصل (النهارده ناقص كذا يوم)، ويجمع الملفات اللي آخر تعديل عليها قبله، ويطبع عددهم وحجمهم، وبعدين يمسحهم. هنمشي عليه بالترتيب، وبعدين على الـ solCode اللي بيجهّز فولدر التجربة.

اتجرب في PowerShell 7.6 و 5.1 على ويندوز ١١ (الناتج واحد)، في فولدر اسمه [[clean dir]] اتعمل بالـ solCode، والتاريخ يوم التجربة كان 6 أكتوبر 2026.

---

## الجزء ١: الرأس والحواجز

### [[[CmdletBinding(SupportsShouldProcess)]]]

بيخلي السكربت ياخد [[-WhatIf]]، وده بيوصل لـ [[Remove-Item]] جواه لوحده. فـ [[-WhatIf]] = «قولّي هتمسح إيه، ومتمسحش».

### الـ parameters

~~~powershell
param(
    [Parameter(Mandatory)]
    [string]$Path,
    [int]$Days = 14,
    [string]$Filter = "*.log"
)
~~~

| السطر | معناه |
|---|---|
| [[[Parameter(Mandatory)]]] | الـ parameter اللي تحته **إجباري** |
| [[[string]$Path]] | الفولدر، ومن غير قيمة افتراضية عن قصد |
| [[[int]$Days = 14]] | رقم صحيح: عدد الأيام |
| [[[string]$Filter = "*.log"]] | نوع الملفات. [[*]] يعني «أي حاجة»، فـ [[*.log]] = أي ملف آخره [[.log]] |

ليه [[$Path]] إجباري؟ سكربت بيمسح ميصحش يشتغل على «الفولدر الحالي» لمجرد إنك نسيت تكتب المسار. لو نسيته في الترمنال هيسألك عليه، ولو التشغيل non-interactive (زي Task Scheduler) بيفشل:

~~~text pwsh -NonInteractive -c '.\clean-old-files.ps1'
clean-old-files.ps1: Cannot process command because of one or more missing mandatory parameters: Path.
~~~

---

## الجزء ٢: التاريخ الفاصل

### [[$cutoff = (Get-Date).AddDays(-$Days)]]

- [[(Get-Date)]]: دلوقتي. الأقواس عشان يتنفّذ الأول ونستخدم الناتج.
- [[.AddDays(...)]]: method بتزوّد أيام. وبرقم سالب بتطرح.
- [[-$Days]]: [[$Days]] بالسالب، يعني [[-14]].

~~~text (Get-Date).AddDays(-14) يوم التجربة
2026-09-22 10:09
~~~

أي ملف آخر تعديل عليه قبل اللحظة دي هيتمسح.

---

## الجزء ٣: الملفات القديمة

~~~powershell
$old = Get-ChildItem $Path -Filter $Filter -File -Recurse |
    Where-Object LastWriteTime -lt $cutoff
~~~

### [[Get-ChildItem $Path -Filter $Filter -File -Recurse]]

| الحتة | معناها |
|---|---|
| [[-Filter $Filter]] | الأسامي اللي على الشكل ده بس ([[*.log]]) |
| [[-File]] | ملفات، مش فولدرات |
| [[-Recurse]] | ادخل كل الفولدرات اللي تحته كمان |

في فولدر التجربة رجّع ٣ ([[keep.txt]] اتشال لأنه مش log):

~~~text الناتج
Name     LastWriteTime
----     -------------
new.log  10/6/2026 10:09:48 AM
old1.log 9/16/2026 10:09:48 AM
old2.log 9/16/2026 10:09:48 AM
~~~

### [[Where-Object LastWriteTime -lt $cutoff]]

[[-lt]] يعني less than: سيب بس اللي تاريخه **أقل من** (يعني قبل) [[$cutoff]]. فـ [[new.log]] (النهارده) اتشال، وفضل [[old1.log]] و [[old2.log]] (من ٢٠ يوم) في [[$old]].

---

## الجزء ٤: الحجم قبل المسح

### [[$mb = [math]::Round(($old | Measure-Object Length -Sum).Sum / 1MB, 2)]]

من جوه لبرة:

1. [[$old | Measure-Object Length -Sum]]: اجمع خانة [[Length]] (حجم الملف بالـ byte) لكل الملفات.
2. [[( ... ).Sum]]: خد المجموع من النتيجة.
3. [[/ 1MB]]: حوّله ميجا. [[1MB]] عند PowerShell = [[1048576]] byte.
4. [[[math]::Round( ..., 2)]]: قرّب لرقمين بعد العلامة.

على الـ ٣ ملفات اللي فوق المجموع كان ٩ byte (كل ملف فيه [[x]] وسطر جديد = ٣ byte)، فـ [[9 / 1MB]] مقرّبة لرقمين = [[0]]. ولو مفيش ولا ملف، [[.Sum]] بترجع فاضية و [[$null / 1MB]] = [[0]] من غير error.

### [[Write-Host "$($old.Count) files older than $Days days ($mb MB)"]]

[[$($old.Count)]]: الـ [[$( )]] لازمة عشان [[.Count]] تتحسب جوه النص. أما [[$Days]] و [[$mb]] متغيرات بسيطة فبتتحط على طول.

~~~text الناتج
2 files older than 14 days (0 MB)
~~~

---

## الجزء ٥: [[$old | Remove-Item -Verbose]]

ابعت اللستة لـ [[Remove-Item]] يمسحها، و [[-Verbose]] يطبع سطر لكل ملف. ولو اللستة فاضية مش بيعمل حاجة.

### بـ [[-WhatIf]]

~~~text .\clean-old-files.ps1 -Path . -WhatIf
2 files older than 14 days (0 MB)
What if: Performing the operation "Remove File" on target "...\clean dir\old1.log".
What if: Performing the operation "Remove File" on target "...\clean dir\sub\old2.log".
~~~

### من غير [[-WhatIf]]

~~~text الناتج
2 files older than 14 days (0 MB)
VERBOSE: Performing the operation "Remove File" on target "...\clean dir\old1.log".
VERBOSE: Performing the operation "Remove File" on target "...\clean dir\sub\old2.log".
~~~

اللي فضل: [[keep.txt]] (قديم بس مش log) و [[new.log]] (log بس جديد). والتشغيلة التالتة طبعت [[0 files older than 14 days (0 MB)]].

---

## الـ solCode: تجهيز فولدر التجربة

~~~powershell
New-Item -ItemType Directory cleanup-test\sub -Force | Out-Null
Set-Location cleanup-test
"x" | Set-Content new.log, old1.log, sub\old2.log, keep.txt
foreach ($f in "old1.log", "sub\old2.log", "keep.txt") {
    (Get-Item $f).LastWriteTime = (Get-Date).AddDays(-20)
}
..\clean-old-files.ps1 -Path . -WhatIf
..\clean-old-files.ps1 -Path .
~~~

| السطر | بيعمل إيه |
|---|---|
| [[New-Item ... cleanup-test\sub -Force]] | الفولدر و [[sub]] جواه مرة واحدة. [[-Force]] يعمل الأب لو مش موجود ومش يزعل لو موجود |
| [[Set-Location cleanup-test]] | ادخله |
| [["x" | Set-Content a, b, c]] | اكتب [[x]] في كل الملفات دي (بيعملهم لو مش موجودين) |
| [[(Get-Item $f).LastWriteTime = ...]] | غيّر تاريخ آخر تعديل بإيدك لـ ٢٠ يوم فاتوا، عشان نجرّب من غير ما نستنى |
| [[..\clean-old-files.ps1]] | [[..]] يعني الفولدر اللي فوق، لأن السكربت هناك |
| [[-Path .]] | [[.]] الفولدر الحالي، مكتوب صريح |

---

## الخلاصة

| الخطوة | السطر | ليه |
|---|---|---|
| ١ | [[[Parameter(Mandatory)]]] | ميمسحش في مكان مش مكتوب |
| ٢ | [[(Get-Date).AddDays(-$Days)]] | التاريخ الفاصل |
| ٣ | [[-Filter -File -Recurse]] | النوع ده بس، في كل الفولدرات |
| ٤ | [[Where-Object LastWriteTime -lt]] | الأقدم بس |
| ٥ | [[Measure-Object Length -Sum]] | هتوفّر قد إيه |
| ٦ | [[Remove-Item -Verbose]] | امسح واطبع |

افتكر: [[-WhatIf]] على الفولدر الحقيقي قبل أي تشغيل حقيقي أو Task Scheduler، و [[-Days 0]] معناها «كل حاجة»، مش «ولا حاجة».`,
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
          sol: R`جربته بالظبط كده في PowerShell 7.6 و 5.1، في فولدر اسمه فيه مسافة ([[clean dir]]): [[-WhatIf]] طبع [[2 files older than 14 days (0 MB)]] وبعدين [[What if: Performing the operation "Remove File" on target "...\old1.log".]] ونفس السطر لـ [[sub\old2.log]]، والملفات لسه موجودة. من غير WhatIf طبع نفس الملخص وبعدين [[VERBOSE: Performing the operation "Remove File" on target ...]] للملفين، وفضل [[new.log]] (جديد) و [[keep.txt]] (قديم بس مش log). والتشغيلة التالتة طبعت [[0 files older than 14 days (0 MB)]] من غير error.

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
            FreePct = [math]::Round($_.Free / $total * 100, 1)
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
            how: R`ليه [[Get-PSDrive]] ومش [[Get-Volume]] أو [[Get-CimInstance Win32_LogicalDisk]]؟ الاتنين دول ويندوز بس، و Get-PSDrive شغال في 5.1 و 7 وعلى لينكس كمان (هناك بيطلع درايف واحد اسمه [[/]]). لو محتاج تفاصيل زي نوع الديسك أو اسم الـ volume: [[Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3"]] بيرجع الديسكات المحلية بس، وفيه [[Size]] و [[FreeSpace]] و [[VolumeName]].

[[Used]] بيبقى فاضي ([[$null]]) لدرايفات زي DVD من غير CD أو درايف شبكة مش متوصل، و [[$null + $null]] بيطلع [[$null]] و [[$null -gt 0]] False، فالفلتر بيشيلهم.

[[$_.Free / $total * 100]] النسبة، و [[[math]::Round(x)]] من غير رقم تاني بيقرّب لأقرب رقم صحيح.

الـ CSV الأرقام فيه بنقطة عشرية دايمًا. والجدول على الشاشة ممكن يعرض أرقام عشرية زيادة حسب نسخة PowerShell، ده عرض بس.

عشان يشتغل كل يوم: Register-ScheduledTask (درس لوحده)، ومع [[Start-Transcript]] أو بعت التحذير في إيميل أو webhook بـ [[Invoke-RestMethod]].`,
            when: "جهازك الشخصي قبل ما تسطّب حاجة تقيلة، أو أي سيرفر ويندوز بيشتغل لوحده.",
            mistakes: R`تعمل [[Format-Table]] قبل [[Export-Csv]] فالـ CSV يطلع كلام غريب. أو تقسم على 1000 بدل [[1GB]] (اللي هو 1024 أس 3) فالأرقام متطابقش Explorer. أو تنسى فلتر الدرايفات اللي حجمها صفر فيطلع error قسمة على صفر.`
          },
          teach: R`## الفكرة

السكربت بيجيب الدرايفات، ويحسب لكل واحد الحجم الكلي والفاضي بالجيجا ونسبة الفاضي، ويطلّعهم جدول، ويحفظهم CSV، ويحذّر عن أي درايف تحت النسبة. هنمشي عليه بالترتيب: الـ parameters، والـ pipeline اللي بيعمل التقرير، والعرض والحفظ والتحذير.

اتجرب في PowerShell 7.6 و 5.1 على ويندوز ١١ عليه ٣ ديسكات (C و D و E).

---

## الجزء ١: الـ parameters

~~~powershell
param(
    [int]$WarnPercent = 15,
    [string]$CsvPath = (Join-Path $PSScriptRoot "disk-report.csv")
)
~~~

- [[[int]$WarnPercent = 15]]: نسبة التحذير، رقم صحيح.
- [[$PSScriptRoot]]: الفولدر اللي ملف السكربت فيه. فالـ CSV بيتحفظ جنب السكربت، مهما كنت واقف فين.
- الأقواس حوالين [[Join-Path]] لازمة عشان القيمة الافتراضية أمر لازم يتنفّذ.

---

## الجزء ٢: التقرير

### الخطوة ١: [[Get-PSDrive -PSProvider FileSystem]]

[[Get-PSDrive]] بيجيب كل «الدرايفات» اللي PowerShell شايفها، ومنها حاجات مش ديسكات زي [[Env:]] و [[HKCU:]]. و [[-PSProvider FileSystem]] يعني اللي فيها ملفات وفولدرات بس. و [[Used]] و [[Free]] بالـ byte:

~~~text Get-PSDrive -PSProvider FileSystem في PowerShell 7.6
Name         Used        Free
----         ----        ----
C    275780575232 47749156864
D    611955380224 63673589760
E    971412189184 52506542080
Temp 275780575232 47749156864
~~~

[[Temp]] ده مش ديسك: PowerShell 7 بيعمله لوحده وبيشاور على فولدر الـ TEMP ([[C:\Users\ali\AppData\Local\Temp\]])، فأرقامه هي أرقام C بالظبط. في 5.1 مش موجود أصلًا.

### الخطوة ٢: الفلتر

~~~powershell
Where-Object { $_.Name -ne "Temp" -and ($_.Used + $_.Free) -gt 0 }
~~~

- [[{ }]] scriptblock: شرط بيتنفّذ لكل درايف، و [[$_]] هو الدرايف اللي عليه الدور.
- [[$_.Name -ne "Temp"]]: الاسم مش Temp.
- [[-and]]: والشرط التاني كمان لازم يبقى صح.
- [[($_.Used + $_.Free) -gt 0]]: الحجم الكلي أكبر من صفر ([[-gt]] = greater than). ده بيشيل درايف DVD فاضي أو شبكة مش متوصلة، اللي [[Used]] بتاعهم فاضي. ومن غيره هيحصل قسمة على صفر تحت.

### الخطوة ٣: صف لكل درايف

~~~powershell
ForEach-Object {
    $total = $_.Used + $_.Free
    [PSCustomObject]@{
        Drive   = $_.Name
        TotalGB = [math]::Round($total / 1GB, 1)
        FreeGB  = [math]::Round($_.Free / 1GB, 1)
        FreePct = [math]::Round($_.Free / $total * 100, 1)
    }
}
~~~

[[ForEach-Object]] بينفّذ اللي بين [[{ }]] لكل درايف. وجواه:

- [[$total]]: الكلي = المستخدم + الفاضي.
- [[[PSCustomObject]@{ ... }]]: اعمل object جديد بالخانات اللي انت عايزها. ده «صف» في التقرير، وكل مفتاح بيبقى عمود، وبنفس الترتيب اللي كتبته.

نحسب صف C بإيدنا:

| العمود | الحساب | النتيجة |
|---|---|---|
| [[$total]] | [[275780575232 + 47749156864]] | [[323529732096]] byte |
| [[TotalGB]] | [[323529732096 / 1GB]] مقرّبة لرقم عشري | [[301.3]] |
| [[FreeGB]] | [[47749156864 / 1GB]] | [[44.5]] |
| [[FreePct]] | [[47749156864 / 323529732096 * 100]] = [[14.7588...]] مقرّبة لرقم عشري واحد | [[14.8]] |

و [[1GB]] عند PowerShell = [[1073741824]] (يعني 1024×1024×1024)، وده نفس حساب Explorer. و [[[math]::Round(x, 1)]] بيقرّب لرقم عشري واحد. والنسبة بالذات لازم تتقرّب لرقم عشري مش لرقم صحيح: لو [[[math]::Round(x)]] كانت خلت [[14.76]] تبقى [[15]]، والتحذير تحت كان هيفوّت C مع إن الفاضي فيه أقل من 15٪.

### [[$report = ...]]

كل الصفوف اللي طلعت من [[ForEach-Object]] بتتجمع في [[$report]] كلستة.

---

## الجزء ٣: العرض والحفظ والتحذير

### [[$report | Format-Table -AutoSize]]

اعرضهم جدول، و [[-AutoSize]] يظبط عرض الأعمدة على قد الكلام:

~~~text الناتج في PowerShell 7.6
Drive TotalGB FreeGB FreePct
----- ------- ------ -------
C      301.30  44.50   14.80
D      629.20  59.30    9.40
E      953.60  48.90    5.10
~~~

و 5.1 بيكتب نفس الأرقام من غير الأصفار الزيادة ([[301.3]] و [[14.8]]). ده عرض بس، الأرقام نفسها واحدة.

### [[$report | Export-Csv $CsvPath -NoTypeInformation]]

احفظ اللستة (مش الجدول) في CSV. و [[-NoTypeInformation]] بتمنع 5.1 من إنه يكتب سطر [[#TYPE ...]] في أول الملف (7 مش بيكتبه أصلًا). الملف طلع واحد في الاتنين:

~~~text disk-report.csv
"Drive","TotalGB","FreeGB","FreePct"
"C","301.3","44.5","14.8"
"D","629.2","59.3","9.4"
"E","953.6","48.9","5.1"
~~~

### التحذير

~~~powershell
foreach ($d in $report | Where-Object FreePct -lt $WarnPercent) {
    Write-Warning "Drive $($d.Drive) has only $($d.FreePct)% free"
}
~~~

- [[$report | Where-Object FreePct -lt $WarnPercent]]: الصفوف اللي نسبة الفاضي فيها أقل من الحد.
- [[foreach ($d in ...)]]: لكل واحد منهم.
- [[Write-Warning]]: سطر أصفر قدامه [[WARNING:]].
- [[$($d.Drive)]]: الـ [[$( )]] لازمة عشان [[.Drive]] تتحسب جوه النص.

بالافتراضي (15):

~~~text الناتج
WARNING: Drive C has only 14.8% free
WARNING: Drive D has only 9.4% free
WARNING: Drive E has only 5.1% free
~~~

C طلع لأن [[14.8 -lt 15]] صح. ولو كنا قرّبنا لرقم صحيح كان هيبقى [[15]]، و [[15 -lt 15]] غلط، فالتحذير مكانش هيطلع.

---

## الخلاصة

| الخطوة | السطر | ليه |
|---|---|---|
| ١ | [[Get-PSDrive -PSProvider FileSystem]] | الدرايفات اللي فيها ملفات، بالـ byte |
| ٢ | [[Where-Object { ... }]] | من غير Temp ومن غير اللي حجمها صفر |
| ٣ | [[[PSCustomObject]@{ ... }]] | صف بالأعمدة اللي انت عايزها |
| ٤ | [[/ 1GB]] و [[[math]::Round]] | أرقام تتقري |
| ٥ | [[Format-Table]] | للشاشة بس |
| ٦ | [[Export-Csv]] على [[$report]] | الملف من البيانات، مش من الجدول |
| ٧ | [[Write-Warning]] | الدرايفات اللي تحت الحد |

المقابل في لينكس [[df -h]] (درس «df / du» في تاب Bash).`,
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
          sol: R`جربته على ويندوز فيه 3 ديسكات بـ [[-WarnPercent 50]]، في PowerShell 7.6 و 5.1: الجدول طلع C و D و E بـ TotalGB و FreeGB و FreePct (أول صف [[C 301.3 44.5 14.8]])، وتحته [[WARNING: Drive C has only 14.8% free]] وسطر لكل درايف. والـ CSV نفسه في الاتنين: [["Drive","TotalGB","FreeGB","FreePct"]] وبعدين [["C","301.3","44.5","14.8"]] وهكذا. الفرق الوحيد في العرض: 7 بيكتب [[301.30]] و [[14.80]] في الجدول، و 5.1 بيكتب [[301.3]] و [[14.8]]. ودرايف Temp ظهر في [[Get-PSDrive]] بتاع 7 بس، والفلتر شاله. من غير [[-WarnPercent]] التحذير بيطلع بس للدرايفات اللي تحت 15%.

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
          teach: R`## الفكرة

السكربت بيعمل لوبين: واحد على اللينكات (يطلب كل صفحة ويشوف ردت ولا لأ)، وواحد على البورتات (فيه حد سامع ولا لأ). وبيعدّ الحاجات الواقعة في [[$down]]، ولو أكبر من صفر يخرج بـ exit code [[1]]. هنمشي عليه بالترتيب: الـ parameters، والفانكشن، واللوبين، والآخر.

اتجرب في PowerShell 7.6 و 5.1 على ويندوز ١١، بسيرفر Node صغير على بورت 3765 بيرد 200 على [[/]] و 404 على أي حاجة تانية، بالأمر ده:

~~~powershell
.\check-site.ps1 -Urls http://localhost:3765/, http://localhost:3765/missing, http://localhost:3999/ -Ports localhost:3765, localhost:9
~~~

---

## الجزء ١: الـ parameters

~~~powershell
param(
    $Urls = @("https://example.com", "http://localhost:3000/health"),
    $Ports = @("localhost:5432"),
    [int]$TimeoutSec = 5
)
~~~

- [[@( ... )]] array: لستة. فالافتراضي لينكين وبورت واحد.
- [[$Urls]] و [[$Ports]] من غير نوع، فيقبلوا لينك واحد أو لستة.
- البورت مكتوب [[host:port]]، يعني اسم الجهاز ونقطتين والرقم.
- [[[int]$TimeoutSec = 5]] أقصى وقت استنى لكل لينك بالثواني.

ومن جوه PowerShell بتبعت لستة بالفاصلة: [[-Urls a, b]].

---

## الجزء ٢: الفانكشن [[Test-Port]]

~~~powershell
function Test-Port([string]$HostName, [int]$Port) {
    if (Get-Command Test-NetConnection -ErrorAction SilentlyContinue) {
        Test-NetConnection $HostName -Port $Port -InformationLevel Quiet -WarningAction SilentlyContinue
    } else {
        Test-Connection $HostName -TcpPort $Port -Quiet -TimeoutSeconds 2
    }
}
~~~

[[function اسم(parameters) { }]] بتعرّف أمر جديد تستخدمه بعدين في السكربت. والفانكشن دي بترجع [[True]] لو البورت مفتوح و [[False]] لو لأ.

### [[Get-Command Test-NetConnection -ErrorAction SilentlyContinue]]

الأمر ده موجود؟ [[Test-NetConnection]] ويندوز بس، فلو السكربت شغال على لينكس أو ماك [[Get-Command]] مش هيلاقيه، و [[-ErrorAction SilentlyContinue]] يسكّت الـ error فيرجع فاضي، والـ [[if]] يروح للـ [[else]].

### الفرعين

| الحتة | معناها |
|---|---|
| [[Test-NetConnection $HostName -Port $Port]] | جرّب تتصل بالبورت ده |
| [[-InformationLevel Quiet]] | رجّع [[True]] أو [[False]] بس، بدل جدول |
| [[-WarningAction SilentlyContinue]] | من غير سطر التحذير الأصفر لما يفشل |
| [[Test-Connection ... -TcpPort $Port]] | نفس الفكرة في PowerShell 7 على أي نظام |
| [[-Quiet]] | [[True]] أو [[False]] بس |
| [[-TimeoutSeconds 2]] | متستناش أكتر من ثانيتين |

جربتهم على [[127.0.0.1]]: [[Test-Connection -TcpPort 3765 -Quiet]] رجّع [[True]]، و [[Test-NetConnection -Port 9 ... Quiet]] رجّع [[False]].

---

## الجزء ٣: لوب اللينكات

### [[$down = 0]]

عدّاد الحاجات الواقعة.

### [[$sw = [System.Diagnostics.Stopwatch]::StartNew()]]

[[[System.Diagnostics.Stopwatch]]] class من .NET، و [[::]] بيستدعي method على الـ class نفسه، و [[StartNew()]] بيعمل ساعة إيقاف ويشغّلها. بعدين [[$sw.ElapsedMilliseconds]] = عدّى كام ملّي ثانية من ساعتها. جربته على [[Start-Sleep -Milliseconds 300]] فطلع [[303]].

### [[try { ... } catch { ... }]]

جرّب اللي في [[try]]. لو حصل error، متوقفش، روح نفّذ اللي في [[catch]].

### جوه [[try]]

~~~powershell
$res = Invoke-WebRequest $url -TimeoutSec $TimeoutSec -UseBasicParsing
"UP    {0}  {1}  {2} ms" -f $res.StatusCode, $url, $sw.ElapsedMilliseconds
~~~

| الحتة | معناها |
|---|---|
| [[Invoke-WebRequest $url]] | اطلب الصفحة، زي المتصفح |
| [[-TimeoutSec $TimeoutSec]] | لو مردتش في ٥ ثواني اعتبرها فشلت |
| [[-UseBasicParsing]] | لازمة في 5.1 بس (من غيرها بيحاول يحلل الصفحة بمحرك Internet Explorer، حسب التوثيق)، وفي 7 ملهاش أي تأثير |
| [[$res.StatusCode]] | رقم الرد، [[200]] يعني تمام |

وسطر الطباعة بـ [[-f]]: [[{0}]] و [[{1}]] و [[{2}]] بيتبدّلوا بالقيم اللي على اليمين بالترتيب. والسطر ده مفيهوش [[Write-Host]]: النص لوحده في سطر بيتطبع (ده output عادي، يعني تقدر تبعته لملف).

~~~text الناتج
UP    200  http://localhost:3765/  2134 ms
~~~

### جوه [[catch]]

[[Invoke-WebRequest]] بيعتبر أي رد من 400 وطالع (زي 404 و 500) error، وكمان لو مفيش اتصال خالص. فالاتنين بيوصلوا هنا:

~~~powershell
$down++
$code = $_.Exception.Response.StatusCode.value__
Write-Host ("DOWN  {0}  {1}  {2}" -f $code, $url, $_.Exception.Message) -ForegroundColor Red
~~~

- [[$down++]]: زوّد العدّاد.
- [[$_]] جوه [[catch]] هو الـ error نفسه. و [[.Exception.Response]] الرد اللي السيرفر بعته، لو بعت.
- [[.StatusCode]] قيمته اسم زي [[NotFound]]، و [[.value__]] (بشرطتين) بيرجّع رقمه [[404]]. جربتهم: [[NotFound]] ثم [[404]].
- لو مفيش اتصال خالص، [[Response]] فاضي فـ [[$code]] بيبقى فاضي.
- [[.Exception.Message]] نص الـ error.
- الأقواس حوالين [[(... -f ...)]] لازمة عشان [[Write-Host]] ياخد النص كله بعد ما يتبني.

~~~text الناتج في PowerShell 7.6
DOWN  404  http://localhost:3765/missing  Response status code does not indicate success: 404 (Not Found).
DOWN    http://localhost:3999/  No connection could be made because the target machine actively refused it. (localhost:3999)
~~~

في السطر التاني مفيش رقم (مكانه فاضي) لأن مفيش سيرفر على 3999 يرد. وفي 5.1 نفس الأرقام بس الرسايل [[The remote server returned an error: (404) Not Found.]] و [[Unable to connect to the remote server]].

### ليه ٢١٣٤ ms؟

مش بطء السيرفر. [[localhost]] جرّب IPv6 ([[::1]]) الأول، والسيرفر كان سامع على [[127.0.0.1]] بس، فضاع حوالي ثانيتين. نفس السكربت بـ [[http://127.0.0.1:3765/]] طلع [[146 ms]].

---

## الجزء ٤: لوب البورتات

~~~powershell
foreach ($target in $Ports) {
    $hostName, $port = $target -split ':'
    if (Test-Port $hostName $port) { "UP    port $target" }
    else { $down++; Write-Host "DOWN  port $target" -ForegroundColor Red }
}
~~~

### [[$hostName, $port = $target -split ':']]

- [[-split ':']] بيقطّع النص عند [[:]] ويرجّع array.
- [[$a, $b = ...]] اسمها multiple assignment: أول عنصر في الأول، والباقي في التاني.

~~~powershell
$a, $b = "localhost:5432" -split ":"; "[$a] [$b]"
~~~

~~~text الناتج
[localhost] [5432]
~~~

والمتغير اسمه [[$hostName]] مش [[$host]]، لأن [[$host]] محجوز في PowerShell. جربت [[$host = "x"]] فطلع [[Cannot overwrite variable Host because it is read-only or constant.]]

### [[if (Test-Port $hostName $port)]]

نادي الفانكشن، والـ arguments بمسافات من غير أقواس ولا فواصل. [[$port]] نص ([["5432"]]) وبيتحوّل رقم لوحده لأن الفانكشن مستنية [[[int]]].

~~~text الناتج
UP    port localhost:3765
DOWN  port localhost:9
~~~

---

## الجزء ٥: [[if ($down -gt 0) { exit 1 }]]

[[exit 1]] بيقفل السكربت ويرجّع exit code [[1]]، فـ Task Scheduler أو CI أو سكربت تاني يعرف إن فيه حاجة واقعة. بعد التجربة اللي فوق [[$LASTEXITCODE]] طلع [[1]] في 7 و 5.1.

ولو كله شغال، السكربت مش بيعمل [[exit]] خالص. جربتها بلينك وبورت شغالين في session جديدة: [[$LASTEXITCODE]] فضل فاضي. ولما برنامج تاني بيشغّله بـ [[pwsh -File]] بياخد [[0]] (جربتها بسكربت مفيهوش exit)، يعني نجاح.

---

## الخلاصة

| الخطوة | السطر | ليه |
|---|---|---|
| ١ | [[param(...)]] | لينكات وبورتات ووقت يتغيروا من بره |
| ٢ | [[function Test-Port]] | ويندوز أو PowerShell 7 على أي نظام |
| ٣ | [[Stopwatch]] | وقت الرد |
| ٤ | [[try]] / [[Invoke-WebRequest -TimeoutSec]] | اطلب، ومتعلّقش |
| ٥ | [[catch]] / [[.value__]] | 404 و 500 ومفيش اتصال |
| ٦ | [[-split ':']] | اسم الجهاز والبورت |
| ٧ | [[$down]] + [[exit 1]] | النتيجة لأي أداة تانية |

افتكر: [[-TimeoutSec]] دايمًا، ومتسميش متغير [[$host]]، ولو أول طلب بطيء جرّب [[127.0.0.1]] بدل [[localhost]].`,
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
          sol: R`جربته على ويندوز بسيرفر Node صغير على بورت 3765 (بيرد 200 على [[/]] و 404 على أي حاجة تانية). في PowerShell 7.6: [[UP    200  http://localhost:3765/  2220 ms]]، و [[DOWN  404  http://localhost:3765/missing  Response status code does not indicate success: 404 (Not Found).]] بالأحمر، ولينك على بورت مقفول [[DOWN    http://localhost:3999/  No connection could be made because the target machine actively refused it. (localhost:3999)]] من غير رقم، و [[UP    port localhost:3765]]، و [[DOWN  port localhost:9]]، و [[$LASTEXITCODE]] بعدها [[1]].

في 5.1 نفس الأرقام والنتيجة، بس نص الأخطاء مختلف: [[The remote server returned an error: (404) Not Found.]] و [[Unable to connect to the remote server]]. والـ 2220 ms دي مش بطء السيرفر: [[localhost]] جرّب IPv6 ([[::1]]) الأول والسيرفر كان سامع على IPv4 بس، فلو شايف أول طلب بياخد حوالي ثانيتين، جرّب [[127.0.0.1]] بدل localhost.

ولما شغلته من بره بـ [[pwsh -File .\check-site.ps1 -Urls http://localhost:3765/, http://localhost:3765/missing -Ports localhost:3765]] طلع [[Cannot process argument transformation on parameter 'TimeoutSec'. Cannot convert value "..." to type "System.Int32"]] في 7 و 5.1: الفواصل مش بتعمل array في [[-File]]، فاللينك التاني راح لأول parameter فاضي بالترتيب.`
        },
        {
          cmd: "zip-folders.ps1",
          title: "اضغط كل فولدر في zip لوحده بالتاريخ",
          desc: R`سكربت بياخد فولدر فيه مشاريع أو أقسام، ويعمل لكل فولدر فرعي zip لوحده باسمه وتاريخ النهارده ([[shop_2026-10-01.zip]])، في فولدر واحد. مفيد للأرشفة أو قبل ما تمسح مشاريع قديمة أو تبعتها.

[[Get-ChildItem $Source -Directory]] الفولدرات اللي في أول مستوى بس. وقبل الضغط بيتأكد إن الفولدر فيه ملف واحد على الأقل: [[Get-ChildItem -Recurse -File | Select-Object -First 1]] بيقف أول ما يلاقي ملف (سريع حتى مع فولدر كبير)، ولو مفيش، [[continue]] بيعدّي للفولدر اللي بعده. ليه؟ Compress-Archive على فولدر فاضي مبيعملش zip ومبيطلعش error (جربتها في 7 و 5.1)، فـ [[Get-Item $zip]] اللي بعده كان هيفشل ويوقف السكربت كله.

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
          teach: R`## الفكرة

السكربت بيلف على الفولدرات اللي جوه [[$Source]] (أول مستوى بس)، ولكل واحد: لو فاضي يعدّيه، وإلا يعمله zip باسمه وتاريخ النهارده ويطبع حجمه. هنمشي عليه بالترتيب: الـ parameters، والتجهيز، وبعدين اللوب سطر سطر.

اتجرب في PowerShell 7.6 و 5.1 على ويندوز ١١، على فولدر اسمه [[my projects]] فيه:

~~~text فولدر التجربة
my projects\
  shop\index.html
  blog\posts\b.md
  empty\              (فاضي)
  readme.txt          (ملف، مش فولدر)
~~~

---

## الجزء ١: الـ parameters

~~~powershell
param(
    [Parameter(Mandatory)]
    [string]$Source,
    [string]$Dest = (Join-Path $HOME "zips")
)
~~~

- [[[Parameter(Mandatory)]]]: [[$Source]] إجباري؛ لو مكتبتهوش PowerShell هيسألك عليه.
- [[$Dest]] مكان الـ zips، والافتراضي فولدر [[zips]] جوه فولدر اليوزر بتاعك ([[$HOME]]).

---

## الجزء ٢: التجهيز

### [[$ErrorActionPreference = "Stop"]]

أي error من cmdlet يوقف السكربت كله، فميطبعش OK لفولدر الضغط بتاعه فشل.

### [[New-Item -ItemType Directory $Dest -Force | Out-Null]]

اعمل فولدر الـ zips. و [[-Force]] هنا معناها «لو موجود متطلعش error»، فمش محتاجين [[Test-Path]] قبله. و [[| Out-Null]] يرمي الجدول اللي New-Item بيطبعه.

### [[$stamp = Get-Date -Format "yyyy-MM-dd"]]

تاريخ النهارده بشكل ينفع في اسم ملف: [[2026-10-06]].

---

## الجزء ٣: اللوب

### [[foreach ($dir in Get-ChildItem $Source -Directory) {]]

[[-Directory]] فولدرات بس، ومن غير [[-Recurse]] فده أول مستوى بس:

~~~text Get-ChildItem ".\my projects" -Directory -Name
blog
empty
shop
~~~

[[readme.txt]] مش في اللستة لأنه ملف، و [[posts]] مش في اللستة لأنه جوه blog.

### الخطوة ١: الفولدر فاضي؟

~~~powershell
if (-not (Get-ChildItem $dir.FullName -Recurse -File | Select-Object -First 1)) {
    Write-Host "SKIP  $($dir.Name) (empty)" -ForegroundColor Yellow
    continue
}
~~~

من جوه لبرة:

1. [[Get-ChildItem $dir.FullName -Recurse -File]]: كل الملفات جوه الفولدر وكل اللي تحته. [[FullName]] المسار الكامل.
2. [[| Select-Object -First 1]]: خد أول واحد بس، والـ pipeline بيقف أول ما يلاقيه، فمش هيلف على آلاف الملفات في فولدر كبير.
3. [[-not ( ... )]]: لو مفيش ولا ملف (رجع فاضي)، الشرط صح.

جربت الشرط على [[empty]] لوحده: [[[bool]( ... )]] طلع [[False]]، يعني مفيش ملفات.

- [[Write-Host ... -ForegroundColor Yellow]]: اطبع SKIP بالأصفر.
- [[continue]]: سيب باقي اللفة دي وروح للفولدر اللي بعده. ([[break]] كان هيخرج من اللوب كله.)

ليه الفحص ده أصلًا؟ [[Compress-Archive]] على فولدر فاضي مش بيعمل zip ومش بيطلع error. فالسطر اللي بعده [[Get-Item $zip]] كان هيدوّر على ملف مش موجود ويوقف السكربت كله بسبب [[Stop]].

### الخطوة ٢: اسم الـ zip

~~~powershell
$zip = Join-Path $Dest "$($dir.Name)_$stamp.zip"
~~~

[[$($dir.Name)]]: الـ [[$( )]] لازمة عشان [[.Name]] تتحسب جوه النص. والنتيجة زي [[.\out\shop_2026-10-06.zip]].

### الخطوة ٣: الضغط

~~~powershell
Compress-Archive -Path (Join-Path $dir.FullName "*") -DestinationPath $zip -Force
~~~

| الحتة | معناها |
|---|---|
| [[(Join-Path $dir.FullName "*")]] | «كل اللي جوه الفولدر»: المسار وآخره [[\*]] |
| [[-DestinationPath $zip]] | اسم الـ zip |
| [[-Force]] | لو zip النهارده موجود، اكتب فوقه |

~~~text Join-Path (Get-Item ".\my projects\shop").FullName "*"
C:\...\w-zip-pwsh\my projects\shop\*
~~~

النجمة بتخلي الملفات على طول جوه الـ zip من غير فولدر زيادة فوقها. ده اللي جوه [[blog_2026-10-06.zip]]:

~~~text محتوى الـ zip
posts/b.md
~~~

في 5.1 نفس الملف بس مكتوب [[posts\b.md]] بالـ backslash.

### الخطوة ٤: الحجم

~~~powershell
$kb = [math]::Round((Get-Item $zip).Length / 1KB, 1)
~~~

[[(Get-Item $zip).Length]] حجم الـ zip بالـ byte (هنا [[123]])، و [[/ 1KB]] يقسم على 1024، و [[[math]::Round(..., 1)]] رقم عشري واحد: [[0.1]].

### الخطوة ٥: [[Write-Host "OK    $($dir.Name) -> $zip ($kb KB)"]]

~~~text الناتج (في 7 و 5.1)
OK    blog -> .\out\blog_2026-10-06.zip (0.1 KB)
SKIP  empty (empty)
OK    shop -> .\out\shop_2026-10-06.zip (0.1 KB)
~~~

ولما شغلته تاني في نفس اليوم طلع نفس الناتج بالظبط: [[-Force]] كتب فوق الـ zips.

---

## الخلاصة

| الخطوة | السطر | ليه |
|---|---|---|
| ١ | [[New-Item -Force]] | فولدر الـ zips، من غير error لو موجود |
| ٢ | [[Get-Date -Format "yyyy-MM-dd"]] | التاريخ في الاسم |
| ٣ | [[Get-ChildItem -Directory]] | الفولدرات في أول مستوى بس |
| ٤ | [[Select-Object -First 1]] + [[continue]] | عدّي الفاضي بسرعة |
| ٥ | [[Join-Path ... "*"]] | المحتوى، مش فولدر زيادة |
| ٦ | [[-Force]] | التشغيلة التانية متقفش |
| ٧ | [[Length / 1KB]] | الحجم يتقري |

افتكر: افتح zip واحد على الأقل قبل ما تمسح أي أصل، و [[Compress-Archive]] بيتجاهل الملفات المخفية وحده الأقصى ٢ جيجا للملف (حسب التوثيق)، فـ [[tar]] أو 7-Zip للحاجات الكبيرة.`,
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
          sol: R`جربته بالظبط كده في PowerShell 7.6 و 5.1، والفولدر اسمه فيه مسافة ([[-Source ".\my projects"]]): طبع [[OK    blog -> .\out\blog_2026-10-02.zip (0.1 KB)]] و [[SKIP  empty (empty)]] بالأصفر و [[OK    shop -> .\out\shop_2026-10-02.zip (0.1 KB)]]، وفولدر out فيه zipين. ولما فتحت blog.zip كان جواه [[posts/b.md]] على طول من غير فولدر blog فوقه (5.1 كتبها [[posts\b.md]] بالـ backslash).

وجربت كلام deep: ملف مخفي اتساب برا الـ zip في 7 و 5.1، و [[Get-ChildItem -Exclude node_modules | Compress-Archive]] طلّع zip من غير node_modules، و [[tar -a -cf t.zip -C folder .]] عمل zip فعلًا (و tar بياخد المخفي كمان).

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
            how: R`[[ValidatePattern]] مش بيفرّق بين الكابيتال والسمول افتراضيًا (جربت [[MyShop]] وعدّت في 7 و 5.1). لو عايز حروف صغيرة بس اكتبها [[(?-i)^[a-z0-9-]+$]] جوه الـ pattern (جربتها و MyShop اترفضت). والمسافة مرفوضة في الحالتين.

الـ here-string متبعت كـ argument تاني لـ Set-Content، و [[-Encoding]] بعده عادي. وخلي بالك إن [["@]] لازم في أول السطر.

[[npm init -y | Out-Null]] بيخفي الـ package.json اللي npm بيطبعه. و npm على ويندوز ملف npm.cmd أو npm.ps1، فلو الـ ExecutionPolicy مانعة npm.ps1 هيفشل (درس try / catch فيه الحل).

الـ git commit محتاج [[user.name]] و [[user.email]] متظبطين (تاب Git). لو مش متظبطين git بيرجع exit code غير صفر، والسطر اللي بعده بيوقف برسالة بتقول السبب.

[[$ErrorActionPreference = "Stop"]] بيوقف على أخطاء الـ cmdlets بس، عشان كده الفحص اليدوي بعد npm و git.

توسيعه: [[-Type react]] يشغّل [[npm create vite@latest . -- --template react]]، أو يعمل repo على GitHub بـ [[gh repo create $Name --private --source . --push]] لو gh متسطب.`,
            when: "كل مشروع جديد، أو تمرين، أو تجربة سريعة. وكمان في الفرق: نفس السكربت يخلّي كل الناس تبدأ بنفس الهيكل.",
            mistakes: R`تعمل git commit قبل .gitignore فـ node_modules أو .env تدخل التاريخ. أو تنسى فحص [[$LASTEXITCODE]] بعد npm و git وتفتكر Stop كفاية. أو تشيل فحص [[Test-Path $dir]] فتكتب فوق مشروع موجود. أو تستخدم [[Set-Location]] في سكربت هيتنادى من سكربت تاني، فالتاني يلاقي نفسه في فولدر غريب ([[Push-Location]] و [[Pop-Location]] أحسن هناك).`
          },
          teach: R`## الفكرة

السكربت بيعمل مشروع جديد من الصفر بنفس الترتيب كل مرة: يتأكد من الاسم، يعمل الفولدرات، يكتب الملفات الأساسية، يشغّل npm (أو يعمل صفحة HTML)، يعمل git وأول commit، ويفتح VS Code. هنمشي عليه بالترتيب في ٥ أجزاء.

اتجرب في PowerShell 7.6 و 5.1 على ويندوز ١١ (Node و npm و git متسطبين، و [[user.name]] و [[user.email]] متظبطين في git)، في فولدر تجربة، ومن غير آخر سطر ([[code .]]) عشان ميفتحش VS Code.

---

## الجزء ١: الـ parameters والتحقق منها

~~~powershell
param(
    [Parameter(Mandatory)]
    [ValidatePattern('^[a-z0-9-]+$')]
    [string]$Name,

    [ValidateSet("node", "static")]
    [string]$Type = "node",

    [string]$Root = (Join-Path $HOME "projects")
)
~~~

السطور اللي بين [[[ ]]] فوق كل parameter اسمها **attributes**: شروط PowerShell بيفحصها **قبل** ما أول سطر في السكربت يشتغل.

### [[[Parameter(Mandatory)]]]

[[$Name]] إجباري.

### [[[ValidatePattern('^[a-z0-9-]+$')]]]

القيمة لازم تطابق الـ **regex** ده (طريقة لوصف شكل النص):

| الحتة | معناها |
|---|---|
| [[^]] | من أول النص |
| [[[a-z0-9-]]] | حرف واحد من دول: حرف إنجليزي أو رقم أو شرطة |
| [[+]] | واحد أو أكتر من اللي قبله |
| [[$]] | لحد آخر النص |

يعني الاسم كله حروف وأرقام وشرطات، من غير مسافات ولا رموز، لأنه هيبقى اسم الفولدر واسم الباكدج في package.json. جربت:

~~~text .\new-project.ps1 -Name "My Shop"
Cannot validate argument on parameter 'Name'. The argument "My Shop" does not match the "^[a-z0-9-]+$" pattern. Supply an argument that matches "^[a-z0-9-]+$" and try the command again.
~~~

ومتعملش أي حاجة. لكن خلي بالك: [[MyShop]] عدّى (المقارنة مش بتفرّق كابيتال وسمول افتراضيًا)، و npm قبله لأن [[npm init -y]] بيصغّر الاسم في package.json لوحده.

### [[[ValidateSet("node", "static")]]]

القيمة لازم تبقى واحدة من دول بالظبط:

~~~text .\new-project.ps1 -Name site -Type foo
Cannot validate argument on parameter 'Type'. The argument "foo" does not belong to the set "node,static" specified by the ValidateSet attribute. ...
~~~

وبونص: في الترمنال لما تكتب [[-Type ]] وتدوس Tab بيكمّلك القيم دي.

### [[$Root]]

مكان المشروع، والافتراضي [[projects]] جوه فولدر اليوزر. والسطور الفاضية بين الـ parameters للقراية بس.

---

## الجزء ٢: الفولدرات

~~~powershell
$ErrorActionPreference = "Stop"
$dir = Join-Path $Root $Name
if (Test-Path $dir) { throw "Folder already exists: $dir" }

New-Item -ItemType Directory (Join-Path $dir "src") -Force | Out-Null
Set-Location $dir
~~~

| السطر | ليه |
|---|---|
| [[$ErrorActionPreference = "Stop"]] | أي error من cmdlet يوقف |
| [[$dir = Join-Path $Root $Name]] | مسار المشروع: [[.\my-shop]] |
| [[if (Test-Path $dir) { throw ... }]] | لو موجود، وقّف قبل ما تكتب فوق مشروع حقيقي |
| [[New-Item ... (Join-Path $dir "src") -Force]] | اعمل [[src]] جوه المشروع؛ [[-Force]] بيعمل [[my-shop]] الأب كمان في نفس الخطوة |
| [[Set-Location $dir]] | ادخل المشروع، فكل الملفات الجاية بتتكتب جواه |

التشغيلة التانية بنفس الاسم طلعت:

~~~text الناتج
Exception: ...\new-project.ps1:14
     | Folder already exists: .\my-shop
~~~

---

## الجزء ٣: الملفات

### [[Set-Content README.md "# $Name" -Encoding utf8]]

[[Set-Content]] بيكتب نص في ملف (بيعمله لو مش موجود). النص [["# $Name"]] بيبقى [[# my-shop]]، وده عنوان في Markdown. و [[-Encoding utf8]] نوع الترميز.

### الـ .gitignore بـ here-string

~~~powershell
Set-Content .gitignore @"
node_modules/
dist/
.env
"@ -Encoding utf8
~~~

[[@"]] في آخر السطر و [["@]] في **أول** سطر لوحده: ده here-string، نص على كذا سطر. وكل اللي بينهم بيتكتب زي ما هو:

~~~text .gitignore
node_modules/
dist/
.env
~~~

يعني git يتجاهل الباكدجات ([[node_modules/]])، وناتج الـ build ([[dist/]])، وملف الأسرار ([[.env]]). وده بيتكتب **قبل** أول commit عشان دول ميدخلوش التاريخ أبدًا.

### [[Set-Content .env.example "PORT=3000" -Encoding utf8]]

مثال للمتغيرات اللي المشروع محتاجها من غير قيم حقيقية. ده بيدخل git، و [[.env]] الحقيقي لأ.

### الـ BOM في 5.1

[[utf8]] في 5.1 معناها «UTF-8 مع BOM»: ٣ bytes في أول الملف ([[EF BB BF]]). وفي 7 من غير BOM. ده أول سطر في README في الاتنين:

~~~text Format-Hex README.md
PowerShell 7.6:  23 20 6D 79 2D 73 68 6F 70 0D 0A            # my-shop..
PowerShell 5.1:  EF BB BF 23 20 6D 79 2D 73 68 6F 70 0D 0A   ï»¿# my-shop..
~~~

git عدّاها عادي، بس أدوات بتقرا .env ممكن تتلخبط منها، فالأحسن تشغّله بـ 7.

---

## الجزء ٤: node أو static

~~~powershell
if ($Type -eq "node") {
    npm init -y | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "npm init failed" }
    Set-Content src\index.js 'console.log("hello")' -Encoding utf8
} else {
    Set-Content src\index.html "<h1>$Name</h1>" -Encoding utf8
}
~~~

- [[-eq]] يعني بيساوي.
- [[npm init -y]]: اعمل [[package.json]] بالقيم الافتراضية من غير أسئلة ([[-y]] = yes لكل حاجة). و [[| Out-Null]] يخفي الـ JSON اللي npm بيطبعه.
- [[$LASTEXITCODE -ne 0]]: npm برنامج خارجي، و [[Stop]] مش بيوقف على فشله، فبنفحص الـ exit code بنفسنا.
- [['console.log("hello")']] بين single quotes عشان الـ double quotes اللي جواه تتكتب زي ما هي.

~~~text أول سطور package.json
{
  "name": "my-shop",
  "version": "1.0.0",
  "description": "",
~~~

و [[-Type static]] عمل ده من غير package.json:

~~~text Get-ChildItem .\MyShop -Recurse -Name
src
.env.example
.gitignore
README.md
src\index.html
~~~

(الـ static اتعمل بـ [[-Name MyShop]]، فده كمان بيأكد إن ValidatePattern قبل الكابيتال.)

---

## الجزء ٥: git والآخر

~~~powershell
git init -q
git add -A
git commit -q -m "chore: initial project structure"
if ($LASTEXITCODE -ne 0) { throw "git commit failed (is user.name/user.email set?)" }
~~~

| السطر | معناه |
|---|---|
| [[git init -q]] | اعمل repo جديد. [[-q]] = quiet، من غير رسايل |
| [[git add -A]] | ضيف كل الملفات (ما عدا اللي في .gitignore) |
| [[git commit -q -m "..."]] | أول commit بالرسالة دي |
| [[if ($LASTEXITCODE -ne 0)]] | git برنامج خارجي، فافحص. أشهر سبب للفشل إن اسمك وإيميلك مش متظبطين في git |

وبعدين:

- [[Write-Host "Created $dir" -ForegroundColor Green]]: رسالة النجاح.
- [[if (Get-Command code -ErrorAction SilentlyContinue) { code . }]]: لو أمر [[code]] (VS Code) موجود، افتح الفولدر الحالي ([[.]]) فيه. ولو مش موجود، [[-ErrorAction SilentlyContinue]] بيخلي [[Get-Command]] يرجع فاضي من غير error، فالسطر بيتعدّى.

~~~text الناتج في PowerShell 7.6
warning: in the working copy of 'package.json', LF will be replaced by CRLF the next time Git touches it
Created .\my-shop
~~~

التحذير من git: npm بيكتب package.json بنهايات سطور لينكس (LF)، و git على ويندوز بيقولك إنه هيحوّلها. عادي.

وبعد ما السكربت خلص، الترمنال كان جوه [[...\try dir\my-shop]] بسبب [[Set-Location]]، و [[git log --oneline]] طلع commit واحد [[chore: initial project structure]].

> في 5.1 لو شغلت السكربت وناتجه متحوّل ([[2>&1]] أو [[*> log.txt]])، سطر التحذير ده نفسه بيتحوّل error من نوع [[NativeCommandError]]، ومع [[Stop]] السكربت وقف عند [[git add -A]]. جربتها. من غير تحويل اشتغل عادي. في 7 الاتنين اشتغلوا.

---

## الخلاصة

| الخطوة | السطر | ليه |
|---|---|---|
| ١ | [[ValidatePattern]] و [[ValidateSet]] | ارفض اسم أو نوع غلط قبل أي حاجة |
| ٢ | [[if (Test-Path $dir) { throw }]] | متكتبش فوق مشروع موجود |
| ٣ | [[New-Item -Force]] + [[Set-Location]] | الفولدرات، وادخلها |
| ٤ | [[Set-Content]] + here-string | README و .gitignore و .env.example |
| ٥ | [[npm init -y]] + [[$LASTEXITCODE]] | package.json، وافحص بنفسك |
| ٦ | [[git init]] / [[add]] / [[commit]] | أول commit، بعد .gitignore |
| ٧ | [[Get-Command code]] | افتح VS Code لو موجود |

افتكر: [[Stop]] بيوقف على أخطاء الـ cmdlets بس، فـ npm و git محتاجين فحص [[$LASTEXITCODE]]. و .gitignore قبل أول commit دايمًا.`,
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
          sol: R`جربته على PowerShell 7.6 و 5.1 (من غير سطر [[code .]])، في فولدر تجربة اسمه فيه مسافة: [[-Name my-shop -Root .]] طبع [[Created .\my-shop]] بالأخضر (وقبلها git طبع [[warning: in the working copy of 'package.json', LF will be replaced by CRLF...]]، لأن npm بيكتب package.json بنهايات سطور لينكس، وده عادي على ويندوز)، والفولدر فيه [[.git]] و [[src]] و [[.env.example]] و [[.gitignore]] و [[package.json]] و [[README.md]]، و [[git log --oneline]] فيه commit واحد [[chore: initial project structure]]. ولما عملت node_modules و .env جواه، [[git status]] مشافهمش.

الفرق في 5.1: [[-Encoding utf8]] حط BOM في أول README و .gitignore و .env.example. git عدّاها عادي، بس لو أداة بتقرا .env بتتلخبط من الـ BOM، شغّل السكربت بـ PowerShell 7 (هناك [[utf8]] من غير BOM).

[[-Name "My Shop"]] طلع [[Cannot validate argument on parameter 'Name'. The argument "My Shop" does not match the "^[a-z0-9-]+$" pattern.]] قبل ما أي حاجة تتعمل. ونفس الاسم تاني طلع [[Folder already exists: ...my-shop]]. و [[-Type static]] عمل [[src\index.html]] من غير package.json. والـ .editorconfig: سطر [[Set-Content]] زيادة بـ here-string فيه [[root = true]] وقواعد المسافات، قبل [[git add]].`
        }
      ]
    }
]);
