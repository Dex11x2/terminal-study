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

[[{1:D3}]]: الـ D يعني رقم صحيح، و 3 أقل عدد خانات. لو عندك أكتر من ٩٩٩ صورة خليها D4. الترقيم بالأصفار بيخلي الترتيب الأبجدي في Explorer هو نفس ترتيب الأرقام.

الـ WhatIf: السكربت مفيهوش [[ShouldProcess]] بإيده، بس [[SupportsShouldProcess]] بيخلي [[-WhatIf]] يوصل لـ [[Rename-Item]] لوحده، فبيطبع «What if: Performing the operation "Rename File"...» لكل ملف.

[[-LiteralPath]] بدل [[-Path]]: في [[-Path]] الأقواس المربعة معناها wildcard، فصورة اسمها [[[1] beach.jpg]] في 5.1 طلّعت [[Cannot rename because item at '...' does not exist.]] وفضلت باسمها. بـ [[-LiteralPath]] الاسم بيتاخد حرف حرف، واشتغلت في 7 و 5.1.

لو عايز الترتيب بتاريخ التصوير الحقيقي: [[System.Drawing]] أو أداة زي exiftool بتقرا EXIF، وده أعقد من الدرس ده.`,
            when: "صور رحلة، سكرينشوتات لمشروع، فواتير PDF عايزها مترقمة، أي فولدر أسامي ملفاته عشوائية.",
            mistakes: R`تشغّله من غير [[-WhatIf]] على الفولدر الغلط. أو تزوّد صور بين تشغيلتين وتشغّله بنفس البادئة: جربتها بصورة جديدة أقدم من الباقي، فطلع [[Cannot create a file when that file already exists.]] مرتين، والصورة الجديدة فضلت باسمها، و beach_002 اختفى والباقي اتزحزح رقم. الحل تشغّله ببادئة جديدة. أو تنسى [[-File]] فيحاول يغيّر أسامي فولدرات.`
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
            how: R`ليه [[Get-PSDrive]] ومش [[Get-Volume]] أو [[Get-CimInstance Win32_LogicalDisk]]؟ الاتنين دول ويندوز بس، و Get-PSDrive شغال في 5.1 و 7 وعلى لينكس كمان (هناك بيطلع درايف واحد اسمه [[/]]). لو محتاج تفاصيل زي نوع الديسك أو اسم الـ volume: [[Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3"]] بيرجع الديسكات المحلية بس، وفيه [[Size]] و [[FreeSpace]] و [[VolumeName]].

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
          sol: R`جربته على ويندوز فيه 3 ديسكات بـ [[-WarnPercent 50]]، في PowerShell 7.6 و 5.1: الجدول طلع C و D و E بـ TotalGB و FreeGB و FreePct (أول صف [[C 301.3 47.7 16]])، وتحته [[WARNING: Drive C has only 16% free]] وسطر لكل درايف. والـ CSV نفسه في الاتنين: [["Drive","TotalGB","FreeGB","FreePct"]] وبعدين [["C","301.3","47.7","16"]] وهكذا. الفرق الوحيد في العرض: 7 بيكتب [[301.30]] و [[16.00]] في الجدول، و 5.1 بيكتب [[301.3]] و [[16]]. ودرايف Temp ظهر في [[Get-PSDrive]] بتاع 7 بس، والفلتر شاله. من غير [[-WarnPercent]] التحذير بيطلع بس للدرايفات اللي تحت 15%.

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
          sol: R`جربته على PowerShell 7.6 و 5.1 (من غير سطر [[code .]])، في فولدر تجربة اسمه فيه مسافة: [[-Name my-shop -Root .]] طبع [[Created .\my-shop]] بالأخضر (وقبلها git طبع [[warning: in the working copy of '.gitignore', LF will be replaced by CRLF...]]، ده عادي على ويندوز)، والفولدر فيه [[.git]] و [[src]] و [[.env.example]] و [[.gitignore]] و [[package.json]] و [[README.md]]، و [[git log --oneline]] فيه commit واحد [[chore: initial project structure]]. ولما عملت node_modules و .env جواه، [[git status]] مشافهمش.

الفرق في 5.1: [[-Encoding utf8]] حط BOM في أول README و .gitignore و .env.example. git عدّاها عادي، بس لو أداة بتقرا .env بتتلخبط من الـ BOM، شغّل السكربت بـ PowerShell 7 (هناك [[utf8]] من غير BOM).

[[-Name "My Shop"]] طلع [[Cannot validate argument on parameter 'Name'. The argument "My Shop" does not match the "^[a-z0-9-]+$" pattern.]] قبل ما أي حاجة تتعمل. ونفس الاسم تاني طلع [[Folder already exists: ...my-shop]]. و [[-Type static]] عمل [[src\index.html]] من غير package.json. والـ .editorconfig: سطر [[Set-Content]] زيادة بـ here-string فيه [[root = true]] وقواعد المسافات، قبل [[git add]].`
        }
      ]
    }
]);
