// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "قضايا ويندوز من الشغل الحقيقي",
      l: 3,
      time: R`حوالي ٤ ساعات (كل درس نص ساعة لساعة بالمعمل)`,
      goal: [
        R`تعمل تجربة محتاجة أدمن وبتغيّر الشبكة من غير ما تخاف: سكربت بيسجّل كل خطوة في لوج، وبيرجّع كل حاجة لوحده بعد مدة، ومبيتشغّلش مرتين في نفس الوقت.`,
        R`تقيس المشكلة بالأرقام قبل ما تغيّر أي حاجة: حزم في الثانية من الكارت، و CPU% من وقت المعالج، ومين فاتح كام socket، وأمر التشغيل الكامل لأي عملية وأبوها.`,
        R`تفهم أخطاء ويندوز اللي شكلها غريب وسببها بسيط: مسار فيه مسافة اتفهم أمر، ولوج اتكتب UTF-16 فـ [[grep]] مش شايفه، وسطح مكتب اتنقل لـ OneDrive، وملف جديد اتحجب لأنه مش موقّع.`,
        R`تكتب مهمة Task Scheduler مسارها فيه مسافة وتتأكد إن التنصيص وصل صح، من غير ما تجرّب على مهمة حقيقية.`,
        R`تدوس على زرار في برنامج ويندوز وتقرا حالته من PowerShell (UI Automation)، عشان تختبر برنامجك من غير إيد.`,
      ],
      use: {
        net: R`قضايا الدرس جاية من أداة VPN على ويندوز: routes وكارت وهمي وأدمن. نفس الأسئلة (مين بيبعت كام حزمة؟ مين فاتح sockets؟ التجربة هترجع لوحدها؟) هي اللي في تاب «الشبكات بعمق» وتاب التشخيص.`,
        work: R`أي حد بيكتب أداة لويندوز أو بيشغّل سكربتات على أجهزة ناس هيقابل الحاجات دي: installer في مسار فيه مسافة، ولوج محدش قادر يقراه، وسطح مكتب مش في المكان المتوقع، وحماية بتحجب ملف بنيته لسه.`,
        prog: R`القاعدة اللي بتتكرر في كل الدروس: متخمّنش. اسأل النظام بأمر بيرجّع رقم أو bytes أو نص خطأ، وبعدين غيّر حاجة واحدة، وقيس تاني.`,
      },
      lab: R`New-Item -ItemType Directory "$HOME\lab\wincase" -Force | Out-Null
Set-Location "$HOME\lab\wincase"`,
      projects: [
        { lvl: 'صغير', t: R`[[where-am-i.ps1]]: أنا فين وبأنهي صلاحية؟`, what: R`سكربت بيطبع في سطور قليلة: النسخة ([[$PSVersionTable.PSVersion]]) والـ edition، وأدمن ولا لأ (بـ [[IsInRole]])، ومستوى الـ integrity من [[whoami /groups]]، والمسار الحقيقي لسطح المكتب والمستندات من [[[Environment]::GetFolderPath()]]، والـ encoding اللي [[>]] بيكتب بيه في النسخة دي. من دروس «تجربة أدمن» و «لوج UTF-16».`, done: R`في [[pwsh]] و [[powershell]] بيشتغل من غير ولا سطر أحمر، وسطر الـ encoding بيقول [[utf-16le]] في 5.1 و [[utf-8]] في 7 (بيكتب ملف تجربة ويقرا أول bytes منه)، ومسار سطح المكتب هو اللي [[Test-Path]] بيرجّع له [[True]].` },
        { lvl: 'صغير', t: R`[[fix-encoding.ps1]]: لاقي الملفات الـ UTF-16 وحوّلها`, what: R`بياخد فولدر، ويدوّر على كل [[*.log]] و [[*.txt]] و [[*.csv]] اللي أول bytes فيها [[FF FE]] أو [[FE FF]]، ويطبع اسمها وحجمها. ومع [[-Fix]] بيعمل نسخة [[.bak]] ويكتب الملف UTF-8 من غير BOM. من درس «لوج UTF-16».`, done: R`على فولدر فيه ٣ ملفات (واحد من 5.1 بـ [[>]] وواحد UTF-8 وواحد فاضي) بيطلّع الأول بس، وبعد [[-Fix]] الـ [[grep]] من Git Bash بيلاقي الكلمة فيه، وتشغيله تاني مبيلاقيش حاجة يصلّحها.` },
        { lvl: 'متوسط', t: R`[[snapshot.ps1]]: صورة قبل وبعد بالأرقام`, what: R`بياخد اسم كارت واسم عملية ومدة، ويطبع ويكتب CSV فيه: حزم/ثانية داخل وخارج، و KB/s، و CPU% (مرة على core واحد ومرة زي Task Manager)، والرام، وعدد UDP و TCP sockets للعملية، و [[ParentProcessId]]. ومع ملفين CSV بيطبع الفرق بالنسبة. من درس «قيس قبل ما تغيّر».`, done: R`على عملية [[pwsh]] بتلف في loop وفاتحة ٣٠٠ socket الجدول بيقول CPU قريب من 100% و 300 UDP، وبعد ما توقفها الجدول التاني صفر، والمقارنة بتطلع النسبة صح، والأرقام مكتوبة بـ [[{0:N0}]].` },
        { lvl: 'متوسط', t: R`[[task-audit.ps1]]: مهام بمسارات من غير تنصيص`, what: R`بيقرا كل المهام بـ [[Get-ScheduledTask]] (قراية بس)، ولكل [[Exec]] action بيطبع [[Execute]] و [[Arguments]]، ويعلّم [[WARN]] لو المسار فيه مسافة ومش متنصّص، أو الملف مش موجود بعد [[ExpandEnvironmentVariables]]. من درس «schtasks و المسافات».`, done: R`بيخلص على جهازك من غير أدمن ومن غير ما يغيّر حاجة، وبيطبع عدد المهام اللي اتفحصت، ولو اديته مهمة تجربة في XML ملف (من [[schtasks /Query /XML]] متعدّل بإيدك) مسارها [[C:\Program Files\Lab\app.exe]] من غير تنصيص بيعلّمها [[WARN]].` },
        { lvl: 'كبير', t: R`موديول [[SafeChange]]: أي تغيير بيرجع لوحده`, what: R`موديول فيه [[Invoke-SafeChange -Steps $steps -For 150]]: كل خطوة ليها [[do]] و [[undo]]، والخطوات بتتنفّذ بالترتيب وأول ما خطوة تفشل يرجّع اللي اتعمل بالعكس، وبعد المدة يرجّع الكل. فيه mutex بيمنع تشغيلين، ولوج UTF-8 فيه رقم العملية في كل سطر، وملف حالة بأوامر الرجوع بيتكتب قبل أي تغيير، و [[Invoke-SafeChange -Cleanup]] بيقرا الملف ده ويرجّع لو النافذة اتقفلت في النص، و [[-WhatIf]] بيطبع الخطة بس. من درس «تجربة أدمن بتغيّر الشبكة».`, done: R`في وضع المعمل (خطوات بتعمل وتمسح ملفات): التشغيل السليم بيرجّع كل حاجة، وفشل الخطوة ٢ بيرجّع الخطوة ١ بس وكود الخروج 1، وتشغيل تاني والأول شغّال بيرفض بكود 3، وقفل النافذة بـ [[Stop-Process]] على الأول وبعده [[-Cleanup]] بيرجّع كله، و [[Invoke-Pester]] على الموديول بيعدّي.`, ext: R`زوّد إنه يكتب الخطة ونتيجتها JSON عشان أداة تانية تقراها، وخطوات جاهزة للـ routes والـ DNS (بـ [[store=active]] دايمًا) مكتوبة من الوثائق وتتجرّب على جهاز تجارب أو VM بس.` },
        { lvl: 'كبير', t: R`[[win-doctor.ps1]]: تقرير تشخيص لجهاز ويندوز`, what: R`سكربت قراية بس بيطلّع تقرير HTML و JSON: النسخ (PowerShell و Git Bash و node)، وأدمن ولا لأ، وحالة Smart App Control من الـ registry، ومسارات سطح المكتب والمستندات الحقيقية، وأكتر ٥ عمليات فاتحة UDP sockets، ومهام Task Scheduler اللي مسارها فيه مسافة ومش متنصّص، وآخر ٥ أحداث Code Integrity برقمها. وكل قسم بيقول [[OK]] أو [[WARN]] وجملة «تعمل إيه». من كل دروس الوحدة.`, done: R`بيشتغل في أقل من ٢٠ ثانية من غير أدمن، ومبيغيّرش حاجة (تتأكد بإن [[Get-ChildItem -Recurse]] على فولدر المشروع بس فيه ملفات جديدة)، والـ HTML بيفتح في المتصفح، و JSON بيتقري بـ [[ConvertFrom-Json]]، ولو قسم فشل (مثلًا مفيش صلاحية لـ log) بيكتب السبب ويكمّل.`, ext: R`خليه يقارن تقريرين (النهارده وامبارح) ويطبع اللي اتغيّر بس، وابعته لزميل يشغّله على جهازه ويرجّعلك الـ JSON بدل ما تسأله ٢٠ سؤال.` },
        { lvl: 'فكرة', t: R`اختبار واجهة لبرنامجك انت`, what: R`لو عندك برنامج ويندوز (WinForms أو WPF أو أي حاجة): اكتب اختبار بـ UI Automation بيفتحه، ويدوس على الزراير المهمة، ويقرا النص اللي ظهر، ويقفله بـ [[CloseMainWindow()]]، ويكتب النتيجة. انت اللي بتختار السيناريوهات.`, done: R`عندك ٣ سيناريوهات على الأقل بتتشغّل بأمر واحد، وكل واحد بيطبع [[PASS]] أو [[FAIL]] مع السبب، والبرنامج بيتقفل في الآخر حتى لو سيناريو فشل (try و finally).`, ext: R`شغّله في GitHub Actions على [[windows-latest]] بعد كل build، وصوّر الشاشة لما سيناريو يفشل وارفعها كـ artifact.` },
      ],
      n: R`قضايا من أداة VPN اتعملت لويندوز، اتعادت في معمل بأسامي مخترعة: تجربة أدمن بترجع لوحدها، وقياس قبل التغيير، ومسار فيه مسافة، ولوج UTF-16، و Smart App Control، ومهمة Task Scheduler بمسار فيه مسافة، و UI Automation`,
      items: [
        {
          cmd: "تجربة أدمن بتغيّر الشبكة",
          title: "تجربة محتاجة أدمن وبتغيّر الـ routes: سكربت بيرجع لوحده، ولوج، ومرة واحدة بس",
          learn: R`تعرف النافذة أدمن ولا لأ بأمرين، وتكتب [[run.ps1]] بيعمل التغيير خطوة خطوة ويسجّل كل حاجة ويرجّع لوحده بعد مدة أو عند أول فشل، وترفض تشغيله مرتين، وتجرّبه كله من غير أدمن قبل المرة الحقيقية.`,
          out: R`[[run.log]] فيه [[applied]] وبعده [[undo]] لكل خطوة بالعكس وآخره [[reverted]]، وتشغيل تاني في نفس الوقت بيطبع [[refusing to start a second one]].`,
          desc: R`عايز تجرّب حاجة بتغيّر الشبكة (routes أو metric لكارت [[vpnlab0]]) ومحتاجة أدمن. المشكلة: لو التجربة باظت، النت ممكن يقف، واللي كان هيصلّحها (أداة شغّالة عن بعد، أو AI بيساعدك، أو انت من جهاز تاني) اتقطع. وكمان الأداة اللي معاك ممكن متقدرش توافق على نافذة UAC، فانت اللي بتشغّل.

الحل: سكربت [[run.ps1]] فيه ٣ حاجات: **رجوع لوحده** بعد مدة ([[-For 150]] ثانية) فالشبكة ترجع حتى لو انت مش موجود، و **لوج** في ملف بيقول كل خطوة اتعملت إمتى، و **mutex** بيمنع نسخة تانية تشتغل في نفس الوقت (في الحالة الحقيقية اتشغّل مرتين والجلستين اتلخبطوا). وقبل المرة الحقيقية تجرّبه بـ [[-Lab]] من غير أدمن. وبعدها تتأكد بـ [[route print]] و [[tasklist]] إن مفيش حاجة فضلت.`,
          example: R`# Windows (PowerShell):
net session >$null 2>&1 && 'ADMIN' || 'not admin'
([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole('Administrators')
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\lab\run.ps1" -For 5 -Lab
$env:FAIL_STEP = '2'; powershell -NoProfile -ExecutionPolicy Bypass -File "C:\lab\run.ps1" -For 5 -Lab; $env:FAIL_STEP = $null
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\lab\run.ps1" -For 150
Get-Content C:\lab\run.log -Tail 6
route print -4 | Select-String 'Persistent Routes' -Context 0,1`,
          lines: [
            R`أسرع سؤال «أنا أدمن؟»: [[net session]] بيرفض أي حد مش أدمن بـ [[Access is denied]]، فبنرمي ناتجه ([[>$null 2>&1]]) ونبص على نجاحه بس: [[&&]] لو نجح و [[||]] لو فشل. ([[&&]] و [[||]] في PowerShell 7 بس.)`,
            R`نفس السؤال من غير برنامج خارجي، وبيرجّع [[True]] أو [[False]] تقدر تحطه في [[if]]: هات هوية اليوزر الحالي ([[GetCurrent()]])، واعمل منها [[WindowsPrincipal]]، واسأله [[IsInRole('Administrators')]].`,
            R`تجربة المعمل: نفس السكربت بس الخطوات بتعمل ملفات مكان الـ routes، فبيشتغل من غير أدمن. [[-NoProfile]] من غير إعداداتك، و [[-ExecutionPolicy Bypass]] للتشغيلة دي بس، و [[-File]] المسار بين تنصيص، و [[-For 5]] يرجع بعد ٥ ثواني.`,
            R`جرّب الفشل: متغيّر بيئة بيخلّي الخطوة التانية ترمي [[The object already exists.]]، فتشوف إن الخطوة الأولى اترجعت لوحدها. وبعدها بنفضّي المتغيّر عشان ميأثرش على اللي بعده.`,
            R`المرة الحقيقية: من نافذة PowerShell **أدمن**، مرة واحدة، و ١٥٠ ثانية تكفي تجرّب فيها وبعدها الشبكة ترجع لوحدها.`,
            R`اقرا آخر ٦ سطور من اللوج: لازم تلاقي [[undo]] لكل خطوة وآخر سطر [[reverted]].`,
            R`اتأكد إن مفيش route **دائم** فضل: [[route print]] بيطبع قسم [[Persistent Routes]]، و [[-Context 0,1]] بيجيب السطر اللي بعده، والمفروض [[None]].`,
          ],
          try: R`اعمل فولدر [[C:\lab]]، وحط فيه [[run.ps1]] اللي في الشرح بالظبط. شغّله بـ [[-Lab -For 5]] من نافذة عادية وشوف اللوج، وبعدين بـ [[FAIL_STEP=2]]، وبعدين افتح نافذتين وشغّله فيهم ورا بعض بـ [[-For 20]]. المرة الحقيقية (من غير [[-Lab]]) متعملهاش غير على جهاز تجارب.`,
          teach: R`## العَرَض: التجربة اللي ممكن تقطع اللي بيصلّحها

في الحالة الحقيقية كانت أداة VPN لويندوز، والتجربة: نضيف routes لكارت [[vpnlab0]] ونشوف الترافيك راح فين. ٣ مشاكل ظهرت:

- الأداة اللي بتساعد (AI شغّال في ترمنال) **مقدرتش توافق على نافذة UAC**، فالأوامر اللي محتاجة أدمن لازم انت اللي تشغّلها.
- لو التجربة باظت، **النت بيقف**، ومعاه الأداة اللي كانت هتصلّح، وانت مش عارف ترجّع إيه.
- اتشغّلت **مرتين** (مرة من نافذة، ومرة تانية لما الأولى «ماردتش»)، والجلستين كتبوا routes فوق بعض.

الحل مش «اعمل بحرص». الحل سكربت بيعمل التغيير وبيضمن الرجوع.

---

## ١. أنا أدمن؟

~~~powershell
net session >$null 2>&1 && 'ADMIN' || 'not admin'
([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole('Administrators')
whoami /groups | Select-String 'Mandatory Label'
~~~

~~~text الناتج (نافذة عادية، PowerShell 7.6)
not admin
False
Mandatory Label\Medium Mandatory Level                        Label            S-1-16-8192
~~~

| الأمر | بيقول إيه |
|---|---|
| [[net session]] | بيعرض الجلسات المفتوحة على الجهاز، ودي حاجة للأدمن بس. من غير أدمن: [[System error 5 has occurred.]] و [[Access is denied.]] |
| [[IsInRole('Administrators')]] | سؤال مباشر للـ token بتاع النافذة. بيرجّع [[True]] أو [[False]]، فيتحط في [[if]] |
| [[Mandatory Label]] | مستوى الـ integrity: [[Medium]] نافذة عادية، و [[High]] نافذة أدمن. حتى لو حسابك أدمن، النافذة العادية [[Medium]] |

وفي [[CMD]] نفس السطر الأول بـ [[>nul]]: [[net session >nul 2>&1 && echo ADMIN || echo not admin]].

وفيه طريقة تخلي السكربت يرفض من أول سطر: [[#Requires -RunAsAdministrator]] في أوله. من نافذة عادية:

~~~text الناتج في PowerShell 7
PermissionDenied: The script 'needadmin.ps1' cannot be run because it contains a "#requires" statement for running as Administrator. The current PowerShell session is not running as Administrator. Start PowerShell by using the Run as Administrator option, and then try running the script again.
~~~

إحنا مش هنستخدمه في [[run.ps1]]، لأننا عايزين وضع [[-Lab]] يشتغل من غير أدمن. فبنسأل بـ [[IsInRole]] جوه السكربت.

---

## ٢. [[run.ps1]] كامل

~~~powershell C:\lab\run.ps1
param([int]$For = 150, [switch]$Lab)
$ErrorActionPreference = 'Stop'
$log = Join-Path $PSScriptRoot 'run.log'
function Log($m) { $line = '{0:HH:mm:ss} [{1}] {2}' -f (Get-Date), $PID, $m; $line; Add-Content -Path $log -Value $line -Encoding UTF8 }

$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole('Administrators')
if (-not $isAdmin -and -not $Lab) { Log 'not admin: run from an admin PowerShell, or add -Lab'; exit 2 }

$mutex = New-Object System.Threading.Mutex($false, 'Local\vpnlab-experiment')
if (-not $mutex.WaitOne(0)) { Log 'another run is active: refusing to start a second one'; exit 3 }

if ($Lab) {
  $mark = Join-Path $PSScriptRoot 'route-0.0.0.0_1.on'
  $steps = @(
    @{ name = 'add route 0.0.0.0/1'; do = { New-Item $mark -ItemType File | Out-Null }; undo = { Remove-Item $mark } }
    @{ name = 'set metric 1';        do = { if ($env:FAIL_STEP -eq '2') { throw 'The object already exists.' } }; undo = { } }
  )
} else {
  $steps = @(
    @{ name = 'add route 0.0.0.0/1'
       do   = { netsh interface ipv4 add route prefix=0.0.0.0/1 interface=vpnlab0 nexthop=10.255.0.1 store=active; if ($LASTEXITCODE) { throw "netsh exit $LASTEXITCODE" } }
       undo = { netsh interface ipv4 delete route prefix=0.0.0.0/1 interface=vpnlab0 nexthop=10.255.0.1 store=active } }
  )
}

$failed = $false
$done = New-Object System.Collections.Generic.List[object]
try {
  Log "start: for=$For lab=$Lab admin=$isAdmin"
  foreach ($s in $steps) { Log "do: $($s.name)"; & $s.do; $done.Add($s) }
  Log "applied $($done.Count) step(s); auto-revert in $For s (Ctrl+C reverts now)"
  Start-Sleep -Seconds $For
} catch {
  $failed = $true; Log "FAILED: $($_.Exception.Message)"
} finally {
  for ($i = $done.Count - 1; $i -ge 0; $i--) { Log "undo: $($done[$i].name)"; try { & $done[$i].undo } catch { Log "undo failed: $($_.Exception.Message)" } }
  Log 'reverted, network is back to how it was'
  $mutex.ReleaseMutex(); $mutex.Dispose()
}
if ($failed) { exit 1 }
~~~

| الحتة | بتعمل إيه وليه |
|---|---|
| [[param([int]$For = 150, [switch]$Lab)]] | مدة الرجوع بالثواني، و [[-Lab]] يشغّل خطوات وهمية. [[[int]]] بيرفض [[-For abc]] بدل ما يستنى صفر |
| [[$ErrorActionPreference = 'Stop']] | أي خطأ (حتى من cmdlet عادة بيكمّل) يبقى استثناء يروح لـ [[catch]]. من غيره خطوة تفشل والسكربت يكمّل الخطوة اللي بعدها على أساس غلط |
| [[function Log]] | كل سطر فيه الوقت و [[$PID]] (رقم العملية). لو نسختين اشتغلوا، الرقم بيفرّق سطور كل واحدة |
| [[-Encoding UTF8]] | لوج بيتقري من Git Bash و [[grep]]. من غيرها 5.1 بيكتب بترميز ANSI (ودرس «لوج UTF-16» بيوري المشكلة التانية بتاعة [[>]]) |
| [[exit 2]] | من غير أدمن ومن غير [[-Lab]]: يقف قبل ما يلمس أي حاجة، وبكود خروج مختلف تقدر تفحصه |
| [[Mutex(..., 'Local\vpnlab-experiment')]] | قفل باسم بيعيش طول ما العملية عايشة. [[WaitOne(0)]] «خده لو فاضي، ومتستناش». النسخة التانية بتلاقيه مقفول فتخرج بـ [[exit 3]]. وويندوز بيفكّه لوحده لو العملية ماتت |
| [[$steps]] | كل خطوة ليها [[do]] و [[undo]] كـ scriptblock. الرجوع متكتب جنب التغيير نفسه، مش في مكان تاني تنساه |
| [[store=active]] | الـ route يعيش لحد الـ restart بس. من غيره [[netsh]] بيعمله **دائم** (درس «The object already exists في netsh» في تاب CMD) |
| [[if ($LASTEXITCODE) { throw ... }]] | [[netsh]] برنامج خارجي، فشله مبيرميش استثناء في PowerShell. بنحوّل كود الخروج لاستثناء بإيدنا |
| [[$done.Add($s)]] | بنسجّل الخطوة **بعد** ما تنجح. فالرجوع بيلف على اللي اتعمل فعلًا بس |
| [[Start-Sleep -Seconds $For]] | هنا انت بتجرّب. بعد المدة السكربت بيكمّل لـ [[finally]] لوحده |
| [[finally]] | بيتنفّذ في النجاح وفي الفشل وكمان لو دوست Ctrl+C (وثائق [[about_Try_Catch_Finally]]). بيلف على [[$done]] بالعكس |
| [[try { & $done[$i].undo } catch {...}]] | لو رجوع خطوة فشل، نسجّله ونكمّل الباقي. أسوأ حاجة إن رجوع واحد يوقف كل الرجوع |
| [[if ($failed) { exit 1 }]] | كود الخروج بيقول الحقيقة: 0 نجح، 1 خطوة فشلت (واترجعت)، 2 مش أدمن، 3 فيه نسخة شغّالة |

---

## ٣. جرّبه كله من غير أدمن

~~~text powershell -NoProfile -ExecutionPolicy Bypass -File "C:\lab\run.ps1" -For 2 (نافذة عادية)
11:29:37 [48844] not admin: run from an admin PowerShell, or add -Lab
exit=2
~~~

~~~text نفس الأمر بـ -Lab
11:29:37 [2424] start: for=2 lab=True admin=False
11:29:37 [2424] do: add route 0.0.0.0/1
11:29:37 [2424] do: set metric 1
11:29:37 [2424] applied 2 step(s); auto-revert in 2 s (Ctrl+C reverts now)
11:29:39 [2424] undo: set metric 1
11:29:39 [2424] undo: add route 0.0.0.0/1
11:29:39 [2424] reverted, network is back to how it was
exit=0
~~~

وبعدها [[Test-Path .\route-0.0.0.0_1.on]] رجّع [[False]]: الملف اللي بيمثّل الـ route اتشال.

~~~text بـ $env:FAIL_STEP = '2'
11:29:39 [48884] start: for=2 lab=True admin=False
11:29:39 [48884] do: add route 0.0.0.0/1
11:29:40 [48884] do: set metric 1
11:29:40 [48884] FAILED: The object already exists.
11:29:40 [48884] undo: add route 0.0.0.0/1
11:29:40 [48884] reverted, network is back to how it was
exit=1
~~~

الخطوة التانية فشلت، فمتسجّلتش في [[$done]]، فالرجوع لف على الأولى بس. ده بالظبط اللي كان ناقص في الأداة الحقيقية لما [[netsh]] رجّع [[The object already exists]].

~~~text نسخة تانية والأولى لسه شغّالة (-For 6)
11:29:42 [18480] another run is active: refusing to start a second one
exit=3
~~~

واتجرّب كمان في [[pwsh -File]] بنفس الناتج. وأول ٣ bytes في [[run.log]] طلعوا [[EF BB BF]]: UTF-8 (بـ BOM، لأن [[-Encoding UTF8]] في 5.1 كده).

---

## ٤. المرة الحقيقية: نافذة أدمن، مرة واحدة

١. افتح PowerShell كأدمن (يمين على الأيقونة، Run as administrator)، أو من نافذتك: [[Start-Process powershell -Verb RunAs -ArgumentList '-NoProfile','-ExecutionPolicy','Bypass','-File','C:\lab\run.ps1','-For','150']] (درس «Start-Process -Verb RunAs» في نفس التاب).
٢. شغّل الأمر **مرة واحدة**. لو النافذة «ماردتش»، اقرا [[run.log]] من نافذة تانية بدل ما تشغّل تاني. والـ mutex بيرفض التانية أصلًا.
٣. جرّب اللي انت عايزه خلال الـ ١٥٠ ثانية، أو Ctrl+C عشان يرجّع حالًا.

خطوة [[netsh]] الحقيقية مكتوبة من وثائق Microsoft ومتجرّبتش هنا (مش بنغيّر شبكة جهاز حقيقي في الدرس). الآلية نفسها (الخطوات والرجوع والـ mutex واللوج) هي اللي اتجرّبت بـ [[-Lab]].

---

## ٥. اتأكد إن مفيش حاجة فضلت

~~~powershell
Get-Content C:\lab\run.log -Tail 6
route print -4 | Select-String 'Persistent Routes' -Context 0,1
tasklist | findstr /i "vpnlab"
~~~

~~~text الناتج (جهاز مفيهوش routes دائمة)
> Persistent Routes:
    None
~~~

ولو التجربة فيها برنامج بيتشغّل (زي [[xray.exe]] في الحالة الحقيقية)، [[tasklist | findstr]] لازم يطلع فاضي. ولو عندك نفق: الـ IP العام رجع بتاع مزوّد الخدمة ([[curl.exe -s https://api.ipify.org]]).

---

## ٦. البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تشغّل الأوامر بإيدك واحد واحد في نافذة أدمن | لو النت وقف في النص، مش فاكر عملت إيه بالظبط ولا ترجّع إيه |
| تقفل UAC أو تخلي الترمنال أدمن دايمًا | كل برنامج بتشغّله من الترمنال ده بقى أدمن. ده بيحل إزعاج مرة بخطر طول الوقت |
| مهمة Task Scheduler بـ [[SYSTEM]] تشغّل الأوامر | صلاحيات أعلى من أدمن، وبتفضل موجودة بعد التجربة لو نسيتها |
| [[Start-Sleep]] بعدين أوامر الرجوع من غير [[try/finally]] | أي خطأ في النص يخرّج السكربت قبل الرجوع |
| تعتمد على إنك هتفتكر تقفل بـ Ctrl+C | لو قفلت **النافذة نفسها** بالـ X، الـ [[finally]] مش مضمون (ويندوز بيدّي العملية ثواني قليلة وبعدها بيقتلها) |

النقطة الأخيرة هي اللي عملت قضية «جلسة ماتت وسابت وراها» في تاب التشخيص: النافذة اتقفلت، والبرنامج الابن فضل شغّال والـ routes فضلت. فالمشروع الكبير في الوحدة بيضيف ملف حالة بأوامر الرجوع، و [[-Cleanup]] يقراه بعدين.

---

## ٧. متتكررش

- أي تجربة بتغيّر شبكة أو إعداد نظام: [[do]] و [[undo]] جنب بعض، ومدة رجوع، ولوج فيه [[$PID]].
- جرّب بوضع معمل من غير أدمن الأول، وشوف الفشل بعينك ([[FAIL_STEP]]).
- [[store=active]] في أي [[netsh ... add route]].
- اسأل «أدمن؟» جوه السكربت ([[IsInRole]])، ومتعتمدش إنك فاكر النافذة دي إيه.

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| أدمن؟ | [[net session >$null 2>&1]] أو [[IsInRole('Administrators')]] |
| مستوى النافذة | [[whoami /groups]] وسطر [[Mandatory Label]] |
| يرجع لوحده | [[try]] و [[Start-Sleep $For]] و [[finally]] بيلف بالعكس |
| مرة واحدة بس | [[Mutex]] و [[WaitOne(0)]] |
| اتأكد | [[run.log]] و [[route print]] و [[tasklist]] |`,
          deep: {
            why: R`أي تغيير في الشبكة ممكن يقطع الطريق اللي بتصلّح منه (ssh، أو remote desktop، أو أداة AI، أو حتى البحث في جوجل). فالرجوع لازم يكون جزء من التجربة نفسها ومش معتمد عليك. ونفس الفكرة على السيرفرات: [[sudo shutdown -r +5]] قبل تعديل firewall، أو [[at now + 2 minutes]] بأمر الرجوع.`,
            how: R`الـ token بتاع العملية بيتحدد وهي بتبدأ: النافذة العادية [[Medium]] حتى لو حسابك أدمن، و UAC بيفتح عملية جديدة بـ token [[High]]. عشان كده مفيش «اترقّى جوه نفس النافذة». والـ named mutex كائن في الكيرنل: [[Local\]] معناها في جلسة اليوزر ده بس، و [[Global\]] لكل الجلسات (محتاج صلاحية أعلى أحيانًا). لو العملية ماتت والـ mutex معاها، النسخة الجاية بتاخده بـ [[AbandonedMutexException]] في .NET (يعني «اللي قبلك مات وهو ماسكه») وده مؤشر إن فيه تنظيف ناقص. و [[finally]] بيتنفّذ لما PowerShell بيوقف الـ pipeline (Ctrl+C) لكن مش لو العملية اتقتلت من بره.`,
            when: R`أي تجربة على routes أو DNS أو firewall أو adapters أو خدمات، خصوصًا على جهاز بتوصله عن بعد، أو لما حد تاني (أداة أو زميل) مستني نتيجتها. وكمان أي سكربت هيتشغّل مرة على أجهزة ناس: نفس الهيكل (فحص صلاحية، خطوات بـ undo، لوج، mutex).`,
            mistakes: R`تشغّل التجربة مرتين لأن الأولى «ماردتش». وتكتب [[undo]] في آخر السكربت من غير [[finally]] فأي خطأ يعدّيه. وتسجّل الخطوة في [[$done]] قبل ما تنجح فترجّع حاجة ماتعملتش. وتنسى إن [[netsh]] مش بيرمي استثناء ففشله يعدّي ساكت. ولوج من غير [[$PID]] فمتعرفش أنهي سطر من أنهي نسخة. وتفتكر إن حسابك أدمن يبقى النافذة أدمن.`
          },
          sol: R`من نافذة عادية في PowerShell 7.6: [[net session]] طبع [[not admin]]، و [[IsInRole]] رجّع [[False]]، و [[whoami /groups]] فيه [[Medium Mandatory Level]]. و [[run.ps1]] من غير [[-Lab]] خرج بكود 2 والسطر [[not admin: run from an admin PowerShell, or add -Lab]].

بـ [[-Lab -For 2]]: [[applied 2 step(s)]] وبعدها [[undo]] للخطوتين بالعكس و [[reverted]] وكود 0، وملف الـ route الوهمي اتشال. وبـ [[FAIL_STEP=2]]: [[FAILED: The object already exists.]] و [[undo]] للخطوة الأولى بس وكود 1. ونسخة تانية والأولى شغّالة: [[another run is active: refusing to start a second one]] وكود 3. واللوج أوله [[EF BB BF]].

اتجرّب في Windows PowerShell 5.1 و PowerShell 7.6 على ويندوز 11 من غير أدمن. خطوة [[netsh interface ipv4 add route ... store=active]] الحقيقية من وثائق Microsoft ومتشغّلتش على الجهاز.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: اكتب طريقتين تعرف بيهم النافذة أدمن ولا لأ، واحدة بتطبع نص وواحدة بترجّع [[True]]/[[False]]. وشغّلهم في نافذة عادية ونافذة أدمن.`, done: R`كتبت [[net session >$null 2>&1 && 'ADMIN' || 'not admin']] و [[IsInRole('Administrators')]]، والنتيجة اتعكست بين النافذتين، وكتبت سطر [[Mandatory Label]] من الاتنين ([[Medium]] و [[High]]).` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: لو شلت [[$ErrorActionPreference = 'Stop']] من [[run.ps1]] وخليت الخطوة التانية [[Remove-Item C:\lab\nothing-here]] (ملف مش موجود)، اللوج هيقول إيه؟ اكتب توقعك، وبعدين جرّب بـ [[-Lab]].`, done: R`توقعت إن [[Remove-Item]] هيطبع خطأ أحمر بس السكربت يكمّل ويكتب [[applied 2 step(s)]] كأنها نجحت، وده اللي حصل. ورجّعت السطر وشفت إنها بقت [[FAILED]] واترجعت الأولى.` },
            { lvl: 'تطبيق', t: R`صلّح السكربت ده: [[netsh interface ipv4 add route prefix=0.0.0.0/1 interface=vpnlab0 nexthop=10.255.0.1; Start-Sleep 150; netsh interface ipv4 delete route prefix=0.0.0.0/1 interface=vpnlab0 nexthop=10.255.0.1]]. لاقي ٤ مشاكل على الأقل واكتب النسخة الآمنة (من غير ما تشغّل [[netsh]]).`, done: R`لقيت: مفيش [[store=active]] (الـ route دائم)، ومفيش فحص [[$LASTEXITCODE]]، ومفيش [[try/finally]] فـ Ctrl+C بيسيب الـ route، ومفيش لوج ولا mutex. والنسخة بتاعتك فيها الخمسة.` },
            { lvl: 'تطبيق', t: R`زوّد على [[run.ps1]] خطوة تالتة في وضع [[-Lab]] بتكتب ملف [[dns.on]] وترجّعه، وخلّي [[FAIL_STEP=3]] يفشّلها. شغّل بـ [[FAIL_STEP]] بـ ١ و ٢ و ٣.`, done: R`مع ٣: اترجعت الخطوتين ١ و ٢ بالترتيب ده (٢ قبل ١). ومع ٢: اترجعت ١ بس. ومع ١ (لو خليتها تفشل): مفيش ولا [[undo]] وآخر سطر [[reverted]] وكود 1 في الكل.` },
            { lvl: 'تحدي', t: R`قيس: افتح نافذتين، وشغّل [[run.ps1 -Lab -For 20]] في الأولى، وفي التانية لفّة بتحاول كل ثانية لحد ما تنجح: [[do { powershell -NoProfile -ExecutionPolicy Bypass -File C:\lab\run.ps1 -Lab -For 1 | Out-Null } until ($LASTEXITCODE -ne 3)]]. التانية اشتغلت بعد كام ثانية؟ وبعدين اقفل النافذة الأولى بالـ X في النص، وشوف اللوج.`, done: R`التانية فضلت ترجع 3 لحد ما الأولى خلصت (حوالي ٢٠ ثانية) وبعدين نجحت. ولما قفلت الأولى بالـ X: لقيت إن [[reverted]] مش مضمون يظهر وملف [[route-0.0.0.0_1.on]] ممكن يفضل، وكتبت جملة: ليه محتاج ملف حالة و [[-Cleanup]].` },
            { lvl: 'تحدي', t: R`اشرحها: اكتب لزميل في ٥ سطور ليه «اتشغّل مرتين» خطر في تجربة شبكة، وإزاي الـ mutex بيمنعها، وإيه اللي بيحصل للـ mutex لو العملية ماتت.`, done: R`الشرح فيه: النسختين بيكتبوا ويمسحوا نفس الـ routes فواحدة تمسح شغل التانية، و [[WaitOne(0)]] بيرفض التانية فورًا، وويندوز بيفك الـ mutex لما العملية تموت (و .NET بيقول [[AbandonedMutexException]] للي بعدها).` },
          ],
          ci: [
            { os: [R`windows`], sh: R`pwsh`, run: R`$d = Join-Path $PWD 'lab'; New-Item -ItemType Directory $d -Force | Out-Null
@'
param([int]$For = 1, [switch]$Lab)
$ErrorActionPreference = 'Stop'
$log = Join-Path $PSScriptRoot 'run.log'
function Log($m) { $line = '[{0}] {1}' -f $PID, $m; $line; Add-Content -Path $log -Value $line -Encoding UTF8 }
$mutex = New-Object System.Threading.Mutex($false, 'Local\vpnlab-ci-experiment')
if (-not $mutex.WaitOne(0)) { Log 'another run is active: refusing to start a second one'; exit 3 }
$mark = Join-Path $PSScriptRoot 'route.on'
$steps = @(
  @{ name = 'add route'; do = { New-Item $mark -ItemType File | Out-Null }; undo = { Remove-Item $mark } }
  @{ name = 'set metric'; do = { if ($env:FAIL_STEP -eq '2') { throw 'The object already exists.' } }; undo = { } }
)
$failed = $false; $done = New-Object System.Collections.Generic.List[object]
try { foreach ($s in $steps) { Log "do: $($s.name)"; & $s.do; $done.Add($s) }; Start-Sleep -Seconds $For }
catch { $failed = $true; Log "FAILED: $($_.Exception.Message)" }
finally { for ($i = $done.Count - 1; $i -ge 0; $i--) { Log "undo: $($done[$i].name)"; & $done[$i].undo }; Log 'reverted'; $mutex.ReleaseMutex() }
if ($failed) { exit 1 }
'@ | Set-Content (Join-Path $d 'run.ps1')
powershell -NoProfile -ExecutionPolicy Bypass -File "$d\run.ps1" -Lab | Select-Object -Last 1; "ok exit=$LASTEXITCODE left=$(Test-Path $d\route.on)"
$env:FAIL_STEP = '2'; $o = powershell -NoProfile -ExecutionPolicy Bypass -File "$d\run.ps1" -Lab; $env:FAIL_STEP = $null
($o | Select-String 'FAILED|undo') -replace '^\[\d+\] ', ''; "fail exit=$LASTEXITCODE"
$j = Start-Process powershell -ArgumentList '-NoProfile','-ExecutionPolicy','Bypass','-File',"$d\run.ps1",'-Lab','-For','8' -PassThru -WindowStyle Hidden; Start-Sleep 3
(powershell -NoProfile -ExecutionPolicy Bypass -File "$d\run.ps1" -Lab) -replace '^\[\d+\] ', ''; "second exit=$LASTEXITCODE"; $j.WaitForExit()`, expect: [R`ok exit=0 left=False`, R`FAILED: The object already exists.`, R`undo: add route`, R`fail exit=1`, R`another run is active: refusing to start a second one`, R`second exit=3`], timeout: 90 },
          ],
        },
        {
          cmd: "قيس قبل ما تغيّر",
          title: "قيس المشكلة بالأرقام من PowerShell: حزم في الثانية، و CPU%، و sockets لكل عملية، وأمر التشغيل",
          learn: R`تطلّع ٤ أرقام قبل ما تلمس أي إعداد: معدّل الحزم من عدّادات الكارت، و CPU% من فرق وقت المعالج، وعدد الـ sockets لكل عملية، وسطر التشغيل الكامل وأبو العملية، وتعرضهم بـ [[{0:N0}]].`,
          out: R`سطر زي [[out 657 pkt/s  in 1,174 pkt/s]] و [[cpu 101%  ram 123 MB]] وجدول أوله العملية اللي فاتحة [[300]] socket.`,
          desc: R`في الحالة الحقيقية النت كان بطيء وبيقف، والبرنامج (proxy على كارت [[vpnlab0]]) واكل CPU ورام. اتجرّبت ٣ تعديلات «على الإحساس» وكلها عالجت أعراض. اللي حل المشكلة كان **رقم**: الكارت بيطلّع حوالي ١٢٠ ألف حزمة في الثانية وراجع له حزمة واحدة، والتنزيل الفعلي 100 KB/s. يعني مش ترافيك، ده حلقة (درس «حلقة التضخيم» في تاب الشبكات بعمق).

الدرس ده الأدوات: [[Get-NetAdapterStatistics]] مرتين بينهم ثواني والفرق ÷ الثواني = حزم/ثانية، و [[TotalProcessorTime]] مرتين = CPU%، و [[Get-NetUDPEndpoint | Group-Object OwningProcess]] = مين فاتح كام socket، و [[Get-CimInstance Win32_Process]] = سطر التشغيل والأب. وبعد أي تعديل نفس القياس تاني: الرقم نزل؟`,
          example: R`# Windows (PowerShell):
$n = 'Wi-Fi'; $s = 3
$a = Get-NetAdapterStatistics -Name $n; Start-Sleep $s; $b = Get-NetAdapterStatistics -Name $n
"out {0:N0} pkt/s  in {1:N0} pkt/s  in {2:N1} KB/s" -f (($b.SentUnicastPackets-$a.SentUnicastPackets)/$s), (($b.ReceivedUnicastPackets-$a.ReceivedUnicastPackets)/$s), (($b.ReceivedBytes-$a.ReceivedBytes)/$s/1KB)
$p = Get-Process pwsh | Sort-Object CPU -Descending | Select-Object -First 1
$c = $p.TotalProcessorTime.TotalSeconds; Start-Sleep 5; $p.Refresh(); "cpu {0:N0}%  ram {1:N0} MB" -f ((($p.TotalProcessorTime.TotalSeconds-$c)/5)*100), ($p.WorkingSet64/1MB)
Get-NetUDPEndpoint | Group-Object OwningProcess | Sort-Object Count -Descending | Select-Object -First 3 Count, Name, @{n='Process';e={(Get-Process -Id $_.Name).ProcessName}}
Get-CimInstance Win32_Process -Filter "ProcessId=$($p.Id)" | Select-Object ProcessId, ParentProcessId, CommandLine`,
          lines: [
            R`اسم الكارت اللي هنقيسه ([[Get-NetAdapter]] بيطلّع الأسامي) والمدة بالثواني. في الحالة الحقيقية كان [[vpnlab0]].`,
            R`صورة من عدّادات الكارت، ونستنى، وصورة تانية. العدّادات بتزيد من ساعة ما الكارت اشتغل، فالرقم لوحده ملوش معنى، الفرق هو اللي بيقول.`,
            R`الفرق ÷ الثواني لكل عدّاد: حزم خارجة، وحزم داخلة، و KB داخلة. [[-f]] بيحط القيم مكان [[{0}]] و [[{1}]] و [[{2}]]، و [[:N0]] رقم صحيح بفاصلة الآلاف، و [[:N1]] رقم عشري واحد، و [[1KB]] = 1024.`,
            R`العملية اللي هنقيسها: هنا أكتر [[pwsh]] أكل CPU من ساعة ما بدأ ([[CPU]] property بالثواني). في الحالة الحقيقية [[Get-Process xray]].`,
            R`وقت المعالج اللي العملية أكلته لحد دلوقتي، ونستنى ٥ ثواني، و [[Refresh()]] (من غيرها القيمة متخزّنة ومش بتتغيّر)، والفرق ÷ ٥ × ١٠٠ = CPU% على core واحد. و [[WorkingSet64]] الرام بالـ bytes، ÷ [[1MB]].`,
            R`كل UDP socket مفتوح على الجهاز وصاحبه ([[OwningProcess]])، نجمّعهم بالعملية، ونرتّب الأكتر الأول، ونجيب اسم العملية من رقمها بـ [[@{n=...;e={...}}]] (عمود محسوب).`,
            R`أمر التشغيل الكامل للعملية ([[CommandLine]]) ورقم أبوها ([[ParentProcessId]]). [[Get-Process]] مبيجيبش الاتنين دول في 5.1، و [[Win32_Process]] بيجيبهم في الاتنين.`,
          ],
          try: R`افتح نافذة PowerShell وشغّل فيها حاجة بتاكل CPU وبتفتح sockets: [[pwsh -NoProfile -Command '$l=1..300|%{[Net.Sockets.UdpClient]::new(0)}; $x=0; while($true){$x++}']]. ومن نافذة تانية شغّل الـ ٧ سطور. لاقيها في الجدول، وقيس الـ CPU بتاعها، واقرا أبوها. وبعدين اقفلها ([[Stop-Process -Id <رقمها>]]) وقيس تاني.`,
          teach: R`## العَرَض: «بطيء» مش رقم

الحالة الحقيقية: أداة VPN على ويندوز، والنت بيقف، و Task Manager بيقول البرنامج على CPU عالي ورامه بيكبر لحد 1.2 GB. اتجرّب: سقف رام، وتفعيل IPv6 على الكارت، وتغيير metric. ولا واحدة حلّت، لأن محدش كان عارف **إيه** اللي بيحصل بالأرقام.

٤ أسئلة بالترتيب ده، لأن كل واحد بيضيّق اللي بعده:

١. الكارت بيبعت ويستقبل قد إيه فعلًا؟ (لو الخارج أضعاف الداخل، فيه حاجة بتلف)
٢. العملية بتاكل CPU قد إيه بالظبط؟ (رقم، مش لون أحمر في Task Manager)
٣. مين فاتح كام socket؟ (آلاف sockets = اتصالات بتتعمل وماتتقفلش)
٤. العملية دي اتشغّلت بأمر إيه ومين أبوها؟ (نسخة تانية؟ إعداد غلط؟)

---

## ١. حزم في الثانية من عدّادات الكارت

~~~powershell
$n = 'Wi-Fi'; $s = 3
$a = Get-NetAdapterStatistics -Name $n; Start-Sleep $s; $b = Get-NetAdapterStatistics -Name $n
"out {0:N0} pkt/s  in {1:N0} pkt/s  in {2:N1} KB/s" -f (($b.SentUnicastPackets-$a.SentUnicastPackets)/$s), (($b.ReceivedUnicastPackets-$a.ReceivedUnicastPackets)/$s), (($b.ReceivedBytes-$a.ReceivedBytes)/$s/1KB)
~~~

~~~text الناتج (Wi-Fi وفيه تحميل شغّال، PowerShell 7.6)
out 657 pkt/s  in 1,174 pkt/s  in 1,564.8 KB/s
~~~

وده رقم طبيعي: الداخل أكتر من الخارج (تحميل)، والحزم الخارجة ردود (ACKs). وعلى نفس الكارت والجهاز فاضي طلع [[out 21 pkt/s  in 51 pkt/s  in 24.0 KB/s]].

في الحالة الحقيقية، نفس الأمر على [[vpnlab0]] طلّع حوالي **١٢٠,٠٠٠ حزمة/ثانية خارجة وحزمة واحدة راجعة**، والتنزيل 100 KB/s. خارج أضعاف الداخل بآلاف المرات = الحزم مش رايحة لحد، دي بتلف.

العدّادات اللي في الـ object (من [[Get-Member]]):

| العدّاد | معناه |
|---|---|
| [[SentUnicastPackets]] و [[ReceivedUnicastPackets]] | حزم لجهاز واحد بعينه (أغلب الترافيك) |
| [[SentMulticastPackets]] و [[ReceivedMulticastPackets]] | حزم لمجموعة ([[224.0.0.0/4]])، زي mDNS و SSDP. لو دول عاليين على كارت نفق، بص على قضية الحلقة |
| [[SentBroadcastPackets]] | حزم لكل الشبكة ([[255.255.255.255]] أو آخر عنوان في الـ subnet) |
| [[SentBytes]] و [[ReceivedBytes]] | الحجم. ÷ [[1KB]] أو [[1MB]] |
| [[ReceivedDiscardedPackets]] و [[OutboundDiscardedPackets]] | حزم الكارت رماها. رقم بيزيد بسرعة = زحمة أو مشكلة driver |

> ليه مش [[Get-Counter]]؟ ممكن ([[Get-Counter '\Network Interface(*)\Packets/sec']])، بس أسامي الكروت فيه مختلفة عن [[Get-NetAdapter]] (فيها وصف الكارت مش اسمه)، وأسامي العدّادات بتتترجم لو ويندوز بلغة تانية. الفرق بين صورتين أبسط وبيشتغل في 5.1 و 7.

---

## ٢. CPU% من وقت المعالج

~~~powershell
$p = Get-Process pwsh | Sort-Object CPU -Descending | Select-Object -First 1
$c = $p.TotalProcessorTime.TotalSeconds; Start-Sleep 5; $p.Refresh(); "cpu {0:N0}%  ram {1:N0} MB" -f ((($p.TotalProcessorTime.TotalSeconds-$c)/5)*100), ($p.WorkingSet64/1MB)
~~~

~~~text الناتج (عملية pwsh بتلف في while($true))
cpu 101%  ram 123 MB
~~~

[[TotalProcessorTime]] = الثواني اللي العملية قعدت فيها على المعالج من ساعة ما بدأت، على **كل** الـ cores مجمّعين. لو في ٥ ثواني أكلت ٥ ثواني معالج، يبقى core واحد كامل = 100%. ولو أكلت ٦٢ ثانية في ٥ ثواني، يبقى ١٢.٥ core = **1,250%**، وده بالظبط الرقم اللي ظهر في قضية GOMEMLIMIT في تاب التشخيص.

| الطريقة | الرقم لنفس العملية | ليه |
|---|---|---|
| حسابنا | 101% | من 100% لكل core، زي [[top]] في لينكس |
| Task Manager | حوالي ٦٪ على جهاز ١٦ core | بيقسم على عدد الـ cores ([[[Environment]::ProcessorCount]] = 16 هنا) |

عشان تقارن بـ Task Manager: اقسم على [[[Environment]::ProcessorCount]]. والـ [[Refresh()]] مهم: الـ object اللي رجع من [[Get-Process]] صورة وقت ما اتعمل، ومن غيرها الفرق صفر.

---

## ٣. مين فاتح كام socket

~~~powershell
Get-NetUDPEndpoint | Group-Object OwningProcess | Sort-Object Count -Descending | Select-Object -First 3 Count, Name, @{n='Process';e={(Get-Process -Id $_.Name).ProcessName}}
~~~

~~~text الناتج (وفيه عملية تجربة فاتحة 300 UDP socket)
Count Name  Process
----- ----  -------
  300 43308 pwsh
   12 11884 svchost
~~~

[[Name]] هنا هو الـ PID (لأننا جمّعنا بـ [[OwningProcess]]). ومن غير عملية التجربة، الجهاز كله كان فيه 51 UDP socket. في الحالة الحقيقية: **١٥ ألف** socket لعملية واحدة، وبعد الإصلاح 59.

وفي TCP نفس الفكرة بـ [[Get-NetTCPConnection]]، ومعاه [[-State Established]] أو [[Listen]]. وفي CMD: [[netstat -ano -p UDP]] والعمود الأخير هو الـ PID.

---

## ٤. اتشغّل بإيه ومين أبوه

~~~powershell
Get-CimInstance Win32_Process -Filter "ProcessId=$($p.Id)" | Select-Object ProcessId, ParentProcessId, CommandLine
~~~

~~~text الناتج
ProcessId       : 43308
ParentProcessId : 23812
CommandLine     : "C:\Users\you\AppData\Local\Microsoft\WindowsApps\Microsoft.PowerShell_8wekyb3d8bbwe\pwsh.exe" -NoProfile -Command $l=1..300|%{[Net.Sockets.UdpClient]::new(0)}; $x=0; while($true){$x++}
~~~

و [[23812]] كان [[$PID]] بتاع النافذة اللي شغّلتها. لو [[Get-Process -Id 23812]] رجّع خطأ، يبقى **الأب مات** والابن فاضل لوحده (قضية «جلسة ماتت وسابت وراها» في تاب التشخيص). وبالاسم بدل الرقم: [[-Filter "Name='xray.exe'"]] (الـ filter بلغة WQL، والنص بين [['...']]).

---

## ٥. اعرض الأرقام صح

~~~powershell
"{0:N0}" -f 120345.6
"{0:N1}" -f 1252.44
"{0:P0}" -f 0.05
"{0,8:N0}|" -f 59
~~~

~~~text الناتج
120,346
1,252.4
5%
      59|
~~~

| الشكل | معناه |
|---|---|
| [[N0]] | رقم بفاصلة الآلاف ومن غير كسور (وبيقرّب) |
| [[N1]] | رقم عشري واحد |
| [[P0]] | نسبة: بيضرب في 100 ويحط [[%]] |
| [[{0,8:N0}]] | عرض ٨ خانات من اليمين: الأعمدة تبقى تحت بعض في جدول |

---

## ٦. قبل وبعد: القياس هو التأكيد

في الحالة الحقيقية، بعد ما اتعرف إن الحلقة سببها قاعدة توجيه، نفس القياسات اتعملت تاني:

| | قبل | بعد |
|---|---|---|
| حزم خارجة/ثانية على [[vpnlab0]] | حوالي ١٢٠,٠٠٠ | 8 |
| CPU | 400% | 5% |
| رام | 1.2 GB | 56 MB |
| UDP sockets | ١٥ ألف | 59 |

لو التعديل مانزّلش الرقم، التعديل غلط، حتى لو «حاسس إنه أحسن».

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تبص على Task Manager | نسبة مقسومة على الـ cores، ومفيهوش حزم/ثانية لكل كارت، ولا عدد sockets، ولا سطر التشغيل |
| تقيس مرة واحدة | العدّادات تراكمية من ساعة ما الكارت قام. رقم واحد ملوش معنى |
| [[Measure-Command]] | بيقيس وقت **أمرك** انت، مش استهلاك عملية تانية |
| سقف رام أو CPU للعملية | بيخنق العرض ومبيقولش السبب (قضية GOMEMLIMIT في تاب التشخيص) |

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| حزم/ثانية | [[Get-NetAdapterStatistics]] مرتين، والفرق ÷ الثواني |
| CPU% | [[TotalProcessorTime]] مرتين و [[Refresh()]]، والفرق ÷ الثواني × 100 |
| sockets لكل عملية | [[Get-NetUDPEndpoint | Group-Object OwningProcess]] |
| اتشغّل بإيه | [[Get-CimInstance Win32_Process]] و [[CommandLine]] و [[ParentProcessId]] |
| العرض | [[{0:N0}]] و [[{0:N1}]] و [[{0,8:N0}]] |`,
          deep: {
            why: R`من غير رقم، كل تعديل بيبان إنه «شغال شوية». ٣ تعديلات في الحالة الحقيقية اتعملت على الإحساس. رقم واحد (١٢٠ ألف حزمة خارجة مقابل واحدة راجعة) غيّر السؤال من «النت بطيء ليه؟» لـ «مين بيبعت الحزم دي؟»، وده اللي وصّل للسبب.`,
            how: R`عدّادات الكارت جاية من الـ driver عن طريق NDIS، ومش بتتصفّر غير لما الكارت يتعمل من جديد (فكارت نفق بيتعمل مع كل اتصال بيبدأ من صفر). و [[TotalProcessorTime]] = [[UserProcessorTime]] + [[PrivilegedProcessorTime]] (وقت الكود بتاع البرنامج + وقت الكيرنل نيابة عنه)، فعملية بتعمل syscalls كتير (زي إرسال حزم) بيبان عندها privileged عالي. و [[Get-NetUDPEndpoint]] و [[Get-NetTCPConnection]] بيقروا من نفس الجدول اللي [[netstat -ano]] بيقرا منه، بس بيرجّعوا objects تتجمّع وتترتّب.`,
            when: R`قبل أي تعديل على مشكلة أداء أو شبكة، وبعده على طول. وفي سكربت مراقبة: كل دقيقة صورة، وتنبيه لو الحزم/ثانية أو الـ sockets عدّت حد. وفي تقرير تبعته لحد بيساعدك: الأرقام دي بدل «بطيء».`,
            mistakes: R`تنسى [[Refresh()]] فالـ CPU يطلع صفر. وتقارن رقمك برقم Task Manager من غير ما تقسم على الـ cores. وتقيس ثانية واحدة فالرقم يتأثر بلحظة. وتقيس كارت غلط (Wi-Fi بدل كارت النفق). وتجمّع [[Get-NetUDPEndpoint]] من غير [[Group-Object]] فتشوف آلاف السطور. وتعمل [[Get-Process -Id $_.Name]] على عملية قفلت في النص فيطلع خطأ (حط [[-ErrorAction SilentlyContinue]]).`
          },
          sol: R`مع عملية التجربة شغّالة: [[cpu 101%  ram 123 MB]]، والجدول أوله [[300]] للـ PID بتاعها و [[pwsh]]، و [[ParentProcessId]] = [[$PID]] بتاع النافذة اللي شغّلتها منها، و [[CommandLine]] فيه [[while($true)]]. وبعد [[Stop-Process]]: العملية اختفت من الجدول، وعدد الـ UDP sockets على الجهاز رجع حوالي 51. وعلى Wi-Fi فاضي: [[out 21 pkt/s  in 51 pkt/s  in 24.0 KB/s]]، ومع تحميل: [[out 657 pkt/s  in 1,174 pkt/s  in 1,564.8 KB/s]].

اتجرّب على ويندوز 11 (١٦ core) في PowerShell 7.6 من غير أدمن. أرقام الحالة الحقيقية (١٢٠ ألف حزمة، و ١٥ ألف socket، و 1,252%) من الحالة الأصلية على كارت النفق.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: إزاي تحسب CPU% لعملية من PowerShell؟ اكتب الخطوات والسبب إن [[Refresh()]] لازمة.`, done: R`كتبت: [[TotalProcessorTime.TotalSeconds]] مرتين بينهم ثواني، و [[Refresh()]] قبل التانية لأن الـ object صورة متخزّنة، والفرق ÷ الثواني × 100، والنتيجة على core واحد (اقسم على [[ProcessorCount]] للي زي Task Manager).` },
            { lvl: 'تطبيق', t: R`قارن وقيس: شغّل عملية [[pwsh]] بتلف في [[while($true)]] وقيسها بطريقتنا، وافتح Task Manager على نفس العملية. اكتب الرقمين وعدد الـ cores، واشرح الفرق بمعادلة.`, done: R`رقمنا قريب من 100%، و Task Manager قريب من [[100 ÷ عدد الـ cores]] (مثلًا ٦٪ على ١٦)، والمعادلة اللي كتبتها بتطلع رقم Task Manager من رقمنا.` },
            { lvl: 'تطبيق', t: R`ابني [[Measure-Adapter]]: function بتاخد [[-Name]] و [[-Seconds]] وترجّع object (مش نص) فيه [[OutPps]] و [[InPps]] و [[InKBps]] و [[McastOutPps]]. وشغّلها على الكارت بتاعك وانت فاتح فيديو ومن غيره.`, done: R`[[Measure-Adapter -Name Wi-Fi -Seconds 3 | Format-Table]] بيطلع ٤ أعمدة، و [[InKBps]] بيكبر بوضوح مع الفيديو، والـ function بترفض اسم كارت مش موجود برسالة واضحة.` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية: احفظ [[Get-NetUDPEndpoint | Select-Object LocalAddress, LocalPort, OwningProcess | Export-Csv udp.csv]]، وبعدين من الملف بس (من غير ما تسأل الجهاز تاني) طلّع أكتر ٣ عمليات واسم كل واحدة.`, done: R`[[Import-Csv udp.csv | Group-Object OwningProcess]] بيطلع نفس الترتيب اللي طلع من الجهاز مباشرة، والأسماء من [[Get-Process -Id]] (والعمليات اللي قفلت بتظهر من غير اسم من غير ما يقع السكربت).` },
            { lvl: 'تحدي', t: R`اكتب [[snapshot.ps1 -Process <name> -Adapter <name> -Seconds 5]] بيطبع سطر واحد: الوقت، و pkt/s داخل وخارج، و CPU%، و MB، وعدد UDP و TCP للعملية. شغّله مرتين: والعملية بتلف وفاتحة ٣٠٠ socket، وبعد ما توقفها اللفة بس.`, done: R`السطرين تحت بعض بأعمدة ثابتة ([[{0,8:N0}]])، والأول فيه CPU قريب من 100 و UDP = 300، والتاني CPU قريب من 0 و UDP لسه 300 (لأنك وقفت اللفة بس)، وده بيوريك إن الرقمين مستقلين.` },
            { lvl: 'تحدي', t: R`دوّر بنفسك: من [[Get-NetAdapterStatistics | Get-Member]] و [[Get-Help Get-NetAdapterStatistics -Full]]، لاقي عدّاد بيقول إن الكارت بيرمي حزم، واكتب إمتى الرقم ده هيكبر.`, done: R`لقيت [[ReceivedDiscardedPackets]] و [[OutboundDiscardedPackets]] (وكمان [[ReceivedPacketErrors]] لو موجود في نسختك)، وقستهم على كارتك في ١٠ ثواني (غالبًا صفر)، وكتبت إنهم بيكبروا مع زحمة أو driver فيه مشكلة أو MTU غلط.` },
          ],
          ci: [
            { os: [R`windows`], sh: R`pwsh`, run: R`$busy = Start-Process pwsh -ArgumentList '-NoProfile','-Command','$l=1..300|%{[Net.Sockets.UdpClient]::new(0)}; $x=0; while($true){$x++}' -PassThru -WindowStyle Hidden
Start-Sleep 4
$top = Get-NetUDPEndpoint | Group-Object OwningProcess | Sort-Object Count -Descending | Select-Object -First 1
"top is busy child: $([int]$top.Name -eq $busy.Id), sockets: $($top.Count)"
$c = $busy.TotalProcessorTime.TotalSeconds; Start-Sleep 3; $busy.Refresh()
$cpu = (($busy.TotalProcessorTime.TotalSeconds - $c) / 3) * 100
"cpu over 50: $($cpu -gt 50)"
$w = Get-CimInstance Win32_Process -Filter "ProcessId=$($busy.Id)"
"parent is me: $($w.ParentProcessId -eq $PID)"
"cmdline has loop: $($w.CommandLine -like '*while($true)*')"
Stop-Process -Id $busy.Id
"{0:N0}|{1:N1}|{2,6:N0}|" -f 120345.6, 1252.44, 59`, expect: [R`top is busy child: True, sockets: 300`, R`cpu over 50: True`, R`parent is me: True`, R`cmdline has loop: True`, R`120,346|1,252.4|    59|`], timeout: 60 },
          ],
        },
        {
          cmd: "مسار فيه مسافة",
          title: "The term 'D:\\programming' is not recognized: مسار فيه مسافة اتفهم أمر",
          learn: R`تعرف من رسالة الخطأ إن PowerShell قطع المسار عند أول مسافة، وتشغّل أي برنامج مساره فيه مسافة بـ [[&]] والتنصيص، وتاخد كود الخروج بتاعه، وتسطّب installer بتاع Inno Setup من غير ولا نافذة.`,
          out: R`[[& '.\programming projects\app\setup.cmd' /VERYSILENT]] بيطبع [[setup ran with: /VERYSILENT]]، و [[$LASTEXITCODE]] بيقول نجح ولا لأ.`,
          desc: R`كتبت المسار بتاع البرنامج زي ما هو: [[D:\programming projects\app\setup.exe]] فرجع:

[[The term 'D:\programming' is not recognized as the name of a cmdlet, function, script file, or operable program]]

بص على الاسم اللي بين التنصيص: [[D:\programming]] بس. PowerShell بيقسم السطر على المسافات، فأول كلمة ([[D:\programming]]) بقت الأمر، و [[projects\app\setup.exe]] بقت argument. الحل: المسار بين تنصيص، وقبله [[&]] (call operator) اللي معناه «شغّل اللي في النص ده». من غير [[&]] النص بين تنصيص بيتطبع كنص بس، أو يطلع [[ParserError]] لو بعده switch.

وفي نفس الحالة: تسطيب صامت لـ installer اتعمل بـ Inno Setup ([[/VERYSILENT /SUPPRESSMSGBOXES /NORESTART]])، وملف [[.iss]] فيه عربي لازم يتحفظ UTF-8 **مع BOM**.`,
          example: R`# Windows (PowerShell):
.\programming projects\app\setup.cmd /VERYSILENT
'.\programming projects\app\setup.cmd' /VERYSILENT
& '.\programming projects\app\setup.cmd' /VERYSILENT /SUPPRESSMSGBOXES /NORESTART
& '.\programming projects\app\fail.cmd'; "exit=$LASTEXITCODE"
$p = Start-Process -FilePath '.\programming projects\app\fail.cmd' -ArgumentList '/VERYSILENT' -Wait -PassThru -NoNewWindow; $p.ExitCode
cmd /c '"programming projects\app\setup.cmd" /x'
Set-Content setup.iss '[Setup]', 'AppName=أداة المعمل' -Encoding utf8BOM`,
          lines: [
            R`الغلطة: من غير تنصيص، PowerShell شاف [[.\programming]] كأمر والباقي arguments، فطلع [[The term '.\programming' is not recognized]].`,
            R`غلطة تانية: التنصيص لوحده بيخلي المسار «نص»، والنص بعده [[/]] فـ PowerShell فهمها قسمة: [[ParserError]] و [[You must provide a value expression following the '/' operator.]]`,
            R`الصح: [[&]] (call operator) بيشغّل الأمر اللي اسمه في النص، والـ switches بعده arguments عادية. ده نفس اللي Tab بيكتبه لوحده لو كمّلت مسار فيه مسافة.`,
            R`كود الخروج: [[$LASTEXITCODE]] فيه رقم خروج آخر برنامج خارجي. [[fail.cmd]] بيخرج بـ 3، فالسطر بيطبع [[exit=3]].`,
            R`نفس الحكاية بـ [[Start-Process]]: [[-FilePath]] و [[-ArgumentList]] منفصلين فمفيش مشكلة مسافات، و [[-Wait]] يستنى يخلص، و [[-PassThru]] يرجّع object فيه [[ExitCode]]، و [[-NoNewWindow]] في نفس النافذة.`,
            R`في CMD: المسار بين [["..."]] بس، مفيش [[&]]. ولما تبعته من PowerShell، نحطه كله جوه [['...']] عشان التنصيص المزدوج يوصل لـ cmd زي ما هو.`,
            R`ملف إعداد Inno Setup فيه عربي: [[-Encoding utf8BOM]] في PowerShell 7 بيكتب [[EF BB BF]] في أول الملف. وفي 5.1 [[-Encoding UTF8]] بيكتب الـ BOM لوحده.`,
          ],
          try: R`اعمل [[New-Item -ItemType Directory 'programming projects\app' -Force]]، وجواه [[setup.cmd]] فيه سطر [[@echo setup ran with: %*]]، و [[fail.cmd]] فيه [[@echo failing & exit /b 3]]. وشغّل الـ ٦ سطور الأولى في [[pwsh]] وفي [[powershell]] وقارن نص الخطأ. وبعدين اعمل [[setup.iss]] بالطريقتين ([[utf8]] و [[utf8BOM]]) واقرا أول bytes بـ [[Format-Hex]].`,
          teach: R`## العَرَض

~~~text الحالة الحقيقية (Windows PowerShell 5.1)
The term 'D:\programming' is not recognized as the name of a cmdlet, function, script file, or operable program
~~~

الأمر كان [[D:\programming projects\app\setup.exe]]. والرسالة بتقول إن PowerShell دوّر على أمر **اسمه** [[D:\programming]]. يعني المسار اتقطع عند أول مسافة.

---

## المعمل

مسار فيه مسافة تحت فولدر المعمل، وبرنامجين صغيرين مكان الـ installer:

~~~powershell
New-Item -ItemType Directory 'programming projects\app' -Force | Out-Null
Set-Content 'programming projects\app\setup.cmd' '@echo setup ran with: %*'
Set-Content 'programming projects\app\fail.cmd' '@echo failing & exit /b 3'
~~~

[[%*]] في batch = كل الـ arguments اللي وصلت، فـ [[setup.cmd]] بيقولنا بالظبط استلم إيه. و [[exit /b 3]] بيخرج بكود 3.

---

## ١. نفس الخطأ في النسختين

~~~text .\programming projects\app\setup.cmd /VERYSILENT (PowerShell 7.6)
.\programming: The term '.\programming' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
~~~

~~~text نفس السطر في Windows PowerShell 5.1
.\programming : The term '.\programming' is not recognized as the name of a cmdlet, function, script file, or operable
program. Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
At line:1 char:1
+ .\programming projects\app\setup.cmd /VERYSILENT
+ ~~~~~~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (.\programming:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
~~~

| الحتة | بتقول إيه |
|---|---|
| [['.\programming']] | الاسم اللي PowerShell دوّر عليه. ده أول «كلمة» في السطر |
| [[~~~~~~~~~~~~~]] تحت [[.\programming]] في 5.1 | مكان الغلطة بالظبط: لحد المسافة |
| [[CommandNotFoundException]] | النوع: «ملقتش أمر بالاسم ده» |
| [[as a name of]] (7) و [[as the name of]] (5.1) | نفس الخطأ، الصياغة بس اتغيّرت بين النسخ |

القاعدة: لو الاسم في رسالة [[is not recognized]] **أقصر** من اللي كتبته، فيه مسافة قطعته.

وفي CMD نفس الغلطة بشكل تاني:

~~~text cmd /c "programming projects\app\setup.cmd /x"
'programming' is not recognized as an internal or external command,
operable program or batch file.
~~~

---

## ٢. «طب أحطه بين تنصيص»

~~~text '.\programming projects\app\setup.cmd' /VERYSILENT (PowerShell 7.6)
ParserError:
Line |
   1 |  '.\programming projects\app\setup.cmd' /VERYSILENT
     |                                          ~
     | You must provide a value expression following the '/' operator.
~~~

PowerShell عنده وضعين لقراية السطر: **وضع الأوامر** (أول حاجة اسم أمر والباقي arguments) و **وضع الـ expressions** (زي الحاسبة). أول ما السطر بيبدأ بنص بين تنصيص، بيدخل وضع الـ expressions: النص قيمة، و [[/]] قسمة، و [[VERYSILENT]] مش رقم. ومن غير الـ switch، السطر كان هيطبع المسار كنص بس ومش هيشغّل حاجة.

---

## ٣. الحل: [[&]]

~~~powershell
& '.\programming projects\app\setup.cmd' /VERYSILENT /SUPPRESSMSGBOXES /NORESTART
~~~

~~~text الناتج (7.6 و 5.1)
setup ran with: /VERYSILENT /SUPPRESSMSGBOXES /NORESTART
~~~

[[&]] بيقول لـ PowerShell: «ارجع لوضع الأوامر، والأمر هو اللي في النص ده». والـ switches بعده وصلت كاملة.

وده اللي Tab بيعمله: اكتب [[.\prog]] ودوس Tab، هيكمّلها [[& '.\programming projects']] لوحده. ونفس الحكاية لو المسار في متغيّر:

~~~powershell
$exe = Join-Path $PWD 'programming projects\app\setup.cmd'
& $exe /a /b
~~~

~~~text الناتج
setup ran with: /a /b
~~~

---

## ٤. نجح ولا لأ؟ كود الخروج

~~~powershell
& '.\programming projects\app\fail.cmd'; "exit=$LASTEXITCODE"
$p = Start-Process -FilePath '.\programming projects\app\fail.cmd' -ArgumentList '/VERYSILENT' -Wait -PassThru -NoNewWindow; $p.ExitCode
~~~

~~~text الناتج
failing
exit=3
failing
3
~~~

| الطريقة | إمتى |
|---|---|
| [[& $exe ...]] ثم [[$LASTEXITCODE]] | الأبسط. PowerShell بيستنى البرنامج يخلص (لو برنامج كونسول) |
| [[Start-Process -Wait -PassThru]] ثم [[.ExitCode]] | لو البرنامج GUI (installer غالبًا GUI، فـ [[&]] ممكن ميستناش)، أو عايز [[-Verb RunAs]] |

> installers كتير GUI: [[& setup.exe /VERYSILENT]] ممكن يرجع فورًا والتسطيب لسه شغّال في الخلفية. عشان كده في السكربتات [[Start-Process -Wait]] أضمن.

---

## ٥. Inno Setup: تسطيب صامت وملف [[.iss]] بالعربي

البرنامج في الحالة الحقيقية installer معمول بـ Inno Setup. الـ switches دي من وثائق Inno Setup («Setup Command Line Parameters»):

| الـ switch | بيعمل إيه |
|---|---|
| [[/SILENT]] | من غير أسئلة، بس شريط التقدّم ظاهر |
| [[/VERYSILENT]] | من غير أي نافذة خالص |
| [[/SUPPRESSMSGBOXES]] | أي رسالة كانت هتسأل، ياخد الإجابة الافتراضية بدل ما يستنى (لازم مع [[/VERYSILENT]] عشان التسطيب ميعلقش على سؤال محدش شايفه) |
| [[/NORESTART]] | ميعملش restart حتى لو محتاج |
| [[/LOG="C:\lab\setup.log"]] | يكتب لوج التسطيب في الملف ده |
| [[/DIR="C:\Program Files\Lab"]] | فولدر التسطيب |

~~~powershell
$p = Start-Process -FilePath 'D:\downloads\lab tool\setup.exe' -ArgumentList '/VERYSILENT','/SUPPRESSMSGBOXES','/NORESTART','/LOG="C:\lab\setup.log"' -Wait -PassThru
$p.ExitCode
~~~

(ده من الوثائق، مفيش installer حقيقي اتسطّب هنا.) ولو انت اللي **بتعمل** الـ installer: Inno Setup بيتسطّب بـ [[winget install --id JRSoftware.InnoSetup -e]]، والسكربت بتاعه ملف [[.iss]]. ولو فيه عربي (اسم البرنامج أو رسايل)، الوثائق بتقول إن الملف يتحفظ UTF-8 **مع BOM**، وإلا الكلام يطلع حروف غريبة. اتأكد بنفسك:

~~~powershell
Set-Content setup.iss '[Setup]', 'AppName=أداة المعمل' -Encoding utf8
Format-Hex setup.iss | Select-Object -First 1
Set-Content setup.iss '[Setup]', 'AppName=أداة المعمل' -Encoding utf8BOM
Format-Hex setup.iss | Select-Object -First 1
~~~

~~~text الناتج (PowerShell 7.6، أول سطر من كل Format-Hex)
0000000000000000 5B 53 65 74 75 70 5D 0D 0A 41 70 70 4E 61 6D 65 [Setup]��AppName
0000000000000000 EF BB BF 5B 53 65 74 75 70 5D 0D 0A 41 70 70 4E ï»¿[Setup]��AppN
~~~

[[EF BB BF]] هي الـ BOM. وفي 5.1 [[-Encoding UTF8]] بيكتبها لوحده (اتجرّب: [[239 187 191]]). الفرق بين النسختين مشروح في درس «لوج UTF-16».

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تنقل البرنامج لفولدر من غير مسافات | [[C:\Program Files]] نفسه فيه مسافة، ومش هتنقل كل حاجة |
| المسار القصير [[PROGRA~1]] (8.3) | ممكن يكون مقفول على الديسك ([[fsutil 8dot3name]])، وصعب تقراه |
| [[cmd /c "..."]] كل مرة | طبقة تنصيص زيادة، وأي [[%]] أو [[&]] في المسار يعمل مشكلة تانية |
| [[Invoke-Expression "$path /VERYSILENT"]] | بيرجع لنفس المشكلة (النص بيتقسم تاني) وكمان خطر لو المسار جاي من بره |

---

## متتكررش

- أي مسار في سكربت: في متغيّر، وبين تنصيص، وقبله [[&]] أو في [[Start-Process -FilePath]].
- خلّي Tab يكمّل المسارات: هو بيحط التنصيص و [[&]] صح.
- بعد أي تسطيب في سكربت: [[ExitCode]] أو [[$LASTEXITCODE]]، ولوج التسطيب.

---

## الخلاصة

| الموقف | اكتب |
|---|---|
| مسار فيه مسافة في PowerShell | [[& 'C:\path with space\app.exe' args]] |
| في متغيّر | [[& $exe args]] |
| محتاج تستنى / GUI | [[Start-Process -FilePath ... -ArgumentList ... -Wait -PassThru]] |
| في CMD | [["C:\path with space\app.exe" args]] |
| تسطيب Inno صامت | [[/VERYSILENT /SUPPRESSMSGBOXES /NORESTART]] |
| [[.iss]] بالعربي | [[-Encoding utf8BOM]] (7) أو [[-Encoding UTF8]] (5.1) |`,
          deep: {
            why: R`ويندوز مليان مسافات في المسارات: [[Program Files]]، وأسامي فولدرات المستخدمين، و OneDrive. وأي أداة بتكتبها هتتنقل لمسار فيه مسافة. والخطأ مضلل: بيقول «الأمر مش موجود» والأمر موجود، المسار بس اتقطع.`,
            how: R`PowerShell بيقرا كل سطر في وضع من اتنين: argument mode لو أول حاجة اسم (فالمسافات بتفصل الكلمات)، و expression mode لو أول حاجة رقم أو نص بين تنصيص أو متغيّر (فـ [[/]] قسمة و [[-]] طرح). و [[&]] بياخد قيمة (نص أو scriptblock أو CommandInfo) ويشغّلها كأمر في argument mode. و [[$LASTEXITCODE]] بيتحط بعد أي برنامج خارجي (exe أو cmd أو bat)، لكن مش بعد cmdlet. وفي Inno Setup، [[/SUPPRESSMSGBOXES]] بيأثر على رسايل [[MsgBox]] في السكربت والرسايل العادية.`,
            when: R`كل ما تشغّل برنامج من سكربت: installers، وأدوات في [[Program Files]]، وبرامج في فولدر مشروع اسمه فيه مسافة. وكل ما تشوف [[is not recognized]] والاسم في الرسالة أقصر من اللي كتبته.`,
            mistakes: R`تحط المسار بين تنصيص من غير [[&]] فيتطبع كنص أو يطلع [[ParserError]]. وتستخدم [[&]] مع المسار والـ arguments كلهم في نص واحد ([[& "setup.exe /VERYSILENT"]]) فيدوّر على ملف اسمه كده. وتشغّل installer GUI بـ [[&]] وتفتكر إنه خلص. وتنسى [[/SUPPRESSMSGBOXES]] فالتسطيب يعلق على سؤال مش ظاهر. وتحفظ [[.iss]] بالعربي من غير BOM.`
          },
          sol: R`في PowerShell 7.6: [[.\programming: The term '.\programming' is not recognized as a name of a cmdlet, function, script file, or executable program.]] وفي 5.1: [[.\programming : The term '.\programming' is not recognized as the name of a cmdlet, function, script file, or operable program.]] مع [[CommandNotFoundException]]. والتنصيص من غير [[&]] في 7: [[You must provide a value expression following the '/' operator.]] وفي CMD من غير تنصيص: [['programming' is not recognized as an internal or external command,]].

[[& '...\setup.cmd' /VERYSILENT /SUPPRESSMSGBOXES /NORESTART]] طبع [[setup ran with: /VERYSILENT /SUPPRESSMSGBOXES /NORESTART]] في النسختين، و [[fail.cmd]] رجّع [[exit=3]] بـ [[&]] وبـ [[Start-Process]]. و [[Format-Hex]] على [[setup.iss]]: من غير BOM أوله [[5B 53]]، وبـ [[utf8BOM]] أوله [[EF BB BF]].

اتجرّب في فولدر معمل تحت [[%TEMP%]] على ويندوز 11 (PowerShell 7.6 و 5.1). switches بتاعة Inno Setup و [[winget install --id JRSoftware.InnoSetup -e]] وقاعدة الـ BOM من وثائق Inno Setup، ومفيش installer اتسطّب.`,
          practice: [
            { lvl: 'سريع', t: R`اقرا الرسالة دي وقول المسار الأصلي كان بيبدأ بإيه، والكلمة اللي بعد المسافة: [[The term 'C:\Users\Mona\My' is not recognized as the name of a cmdlet]].`, done: R`المسار كان بيبدأ بـ [[C:\Users\Mona\My]] وبعده مسافة (غالبًا [[My Tools]] أو [[My Documents]])، وكتبت الأمر الصح بـ [[&]] والتنصيص.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: إيه ناتج كل سطر؟ (أ) [['.\programming projects\app\setup.cmd']] لوحده، (ب) [[& '.\programming projects\app\setup.cmd /x']]، (ج) [[& '.\programming projects\app\setup.cmd' '/x y']]. وبعدين شغّلهم.`, done: R`(أ) بيطبع المسار كنص ومبيشغّلش حاجة، (ب) خطأ لأن [[&]] بيدوّر على ملف اسمه كله بالـ [[/x]]، (ج) بيطبع [[setup ran with: "/x y"]] لأن الـ argument فيه مسافة فاتبعت بتنصيص. والتلاتة طابقوا توقعك أو كتبت ليه لأ.` },
            { lvl: 'تطبيق', t: R`صلّح السكربت ده اللي بيسطّب أداة: [[$setup = "C:\Users\Public\lab tools\setup.exe"; $setup /VERYSILENT; if ($?) { "installed" }]]. فيه ٣ مشاكل.`, done: R`لقيت: [[$setup /VERYSILENT]] قسمة مش تشغيل (محتاج [[&]] أو [[Start-Process]])، والـ installer GUI فلازم [[-Wait]]، و [[$?]] مش كفاية: الصح [[ExitCode]] يساوي 0. والنسخة الجديدة بتطبع [[installed]] بس لما الكود 0.` },
            { lvl: 'تطبيق', t: R`ابني [[Install-Quiet]]: function بتاخد [[-Path]] (فيه مسافة عادي) و [[-Log]]، وبتشغّل installer Inno بالـ ٤ switches و [[/LOG]]، وترجّع [[ExitCode]]، وترمي خطأ واضح لو الملف مش موجود. جرّبها على [[setup.cmd]] و [[fail.cmd]] بتوع المعمل.`, done: R`على [[setup.cmd]] رجّعت 0 والـ arguments اللي اتطبعت فيها [[/LOG=]] بالمسار كامل، وعلى [[fail.cmd]] رجّعت 3، وعلى مسار غلط طلع خطأ فيه المسار نفسه قبل ما يشغّل حاجة.` },
            { lvl: 'تحدي', t: R`قارن: اعمل [[a.iss]] بالعربي بـ [[-Encoding utf8]] و [[b.iss]] بـ [[utf8BOM]]، واقراهم في Windows PowerShell 5.1 بـ [[Get-Content]] من غير [[-Encoding]]. إيه اللي اتقري في كل واحد؟ وده بيقول إيه عن برامج ويندوز القديمة (زي compiler بتاع Inno)؟`, done: R`5.1 قرا [[b.iss]] صح، وقرا [[a.iss]] حروف غريبة (زي [[Ø£Ø¯Ø§Ø©]]) لأنه من غير BOM بيفترض ترميز ANSI، وكتبت إن البرامج القديمة على ويندوز بتعتمد على الـ BOM عشان تعرف إنه UTF-8.` },
            { lvl: 'تحدي', t: R`دوّر بنفسك: من [[Get-Help about_Operators]] (قسم Call operator) و [[Get-Help about_Parsing]]، اكتب جملتين: إمتى PowerShell بيدخل argument mode وإمتى expression mode، ومثال لكل واحد من المعمل.`, done: R`كتبت إن السطر اللي أوله اسم أمر أو [[&]] أو [[.]] بيبقى argument mode، واللي أوله رقم أو نص بين تنصيص أو [[$]] بيبقى expression mode، ومثالين من المعمل بنتيجتهم.` },
          ],
          ci: [
            { os: [R`windows`], sh: R`pwsh`, run: R`New-Item -ItemType Directory 'programming projects\app' -Force | Out-Null
Set-Content 'programming projects\app\setup.cmd' '@echo setup ran with: %*'
Set-Content 'programming projects\app\fail.cmd' '@echo failing & exit /b 3'
try { Invoke-Expression ".\programming projects\app\setup.cmd /VERYSILENT" } catch { $_.Exception.Message.Split([char]10)[0] }
& '.\programming projects\app\setup.cmd' /VERYSILENT /SUPPRESSMSGBOXES /NORESTART
& '.\programming projects\app\fail.cmd' | Out-Null; "exit=$LASTEXITCODE"
$p = Start-Process -FilePath '.\programming projects\app\fail.cmd' -Wait -PassThru -NoNewWindow; "start-process exit=$($p.ExitCode)"
Set-Content setup.iss '[Setup]' -Encoding utf8BOM
([IO.File]::ReadAllBytes("$PWD\setup.iss")[0..2] | ForEach-Object { '{0:X2}' -f $_ }) -join ' '`, expect: [R`The term '.\programming' is not recognized`, R`setup ran with: /VERYSILENT /SUPPRESSMSGBOXES /NORESTART`, R`exit=3`, R`start-process exit=3`, R`EF BB BF`] },
            { os: [R`windows`], sh: R`powershell`, run: R`New-Item -ItemType Directory 'programming projects\app' -Force | Out-Null
Set-Content 'programming projects\app\setup.cmd' '@echo setup ran with: %*'
try { Invoke-Expression ".\programming projects\app\setup.cmd /VERYSILENT" } catch { $_.Exception.Message.Split([char]10)[0] }
& '.\programming projects\app\setup.cmd' /VERYSILENT
Set-Content s51.iss '[Setup]' -Encoding UTF8
(Get-Content s51.iss -Encoding Byte -TotalCount 3) -join ' '`, expect: [R`The term '.\programming' is not recognized as the name of a cmdlet`, R`setup ran with: /VERYSILENT`, R`239 187 191`] },
          ],
        },
        {
          cmd: "لوج UTF-16",
          title: "لوج اتكتب بـ > في PowerShell 5.1: grep مش شايفه، و Desktop مش في المكان اللي فاكره",
          learn: R`تعرف إن [[>]] و [[Out-File]] في 5.1 بيكتبوا UTF-16 من أول bytes في الملف، وتقراه من Git Bash بـ [[iconv]]، وتكتب لوجات UTF-8 من الأول، وتجيب مسار سطح المكتب الحقيقي لما يكون اتنقل لـ OneDrive.`,
          out: R`[[file run.log]] بيقول [[UTF-16, little-endian]]، و [[grep ERROR run.log]] بيرجع 1 من غير ولا كلمة، و [[iconv -f UTF-16 -t UTF-8 run.log | tr -d '\r' | grep ERROR]] بيلاقيه.`,
          desc: R`سكربت بيشتغل بـ [[powershell]] (5.1) بيكتب لوجه بـ [[>]]، وبعدين من Git Bash عملت [[grep ERROR run.log]]: مفيش ناتج خالص، ولا حتى [[Binary file matches]]، وكود الخروج 1 كأن الكلمة مش موجودة. وفي محرر الكود الملف شكله عادي.

السبب: [[>]] في Windows PowerShell 5.1 هو [[Out-File]]، وترميزه الافتراضي **UTF-16LE**: كل حرف إنجليزي بياخد ٢ byte (الحرف وبعده صفر). فـ [[ERROR]] على الديسك [[E\0R\0R\0O\0R\0]]، و [[grep]] بيدوّر على [[ERROR]] ورا بعض فملقاهوش. الحل للقراية: [[iconv -f UTF-16 -t UTF-8]]. والحل الحقيقي: اكتب UTF-8 من الأول ([[-Encoding UTF8]] أو PowerShell 7 اللي [[>]] فيه UTF-8).

وفي نفس الحالة غلطة تانية: [[Out-File]] لـ [[$HOME\Desktop\x.json]] رجّع [[Could not find a part of the path]]، لأن سطح المكتب اتنقل لـ OneDrive. المسار الحقيقي من [[[Environment]::GetFolderPath('Desktop')]].`,
          example: R`# Windows (PowerShell):
powershell -NoProfile -Command "'connected to 203.0.113.9','ERROR route add failed' > run.log"
Format-Hex run.log | Select-Object -First 1
pwsh -NoProfile -Command "'ERROR route add failed' > run7.log"; Format-Hex run7.log | Select-Object -First 1
'x' | Out-File "$HOME\Desktop\x.json"
[Environment]::GetFolderPath('Desktop')
# Git Bash (Windows):
file run.log run7.log
grep ERROR run.log; echo "exit=$?"
iconv -f UTF-16 -t UTF-8 run.log | tr -d '\r' | grep ERROR`,
          lines: [
            R`اكتب لوج بـ [[>]] من Windows PowerShell 5.1 (زي ما السكربت الحقيقي كان بيتشغّل).`,
            R`اقرا أول ١٦ byte: [[FF FE]] في الأول (BOM بتاع UTF-16LE) وبعدها كل حرف وجنبه [[00]].`,
            R`نفس الحكاية من PowerShell 7: [[>]] هنا UTF-8 من غير BOM، فأول bytes هي الحروف نفسها.`,
            R`المسار اللي «المفروض» فيه سطح المكتب. على جهاز سطح مكتبه في OneDrive، الفولدر ده مش موجود: [[Could not find a part of the path]].`,
            R`اسأل ويندوز عن المسار الحقيقي لسطح المكتب (بيقرا إعداد الـ Shell Folders، فبيعرف لو اتنقل).`,
            R`من Git Bash: [[file]] بيقرا أول bytes ويقول نوع الملف: [[Unicode text, UTF-16, little-endian text]] للأول و [[ASCII text]] للتاني.`,
            R`[[grep]] العادي على ملف UTF-16: مفيش ناتج ولا رسالة، و [[$?]] = 1 (ملقاش). ده أخطر من الخطأ: بيقولك «مفيش ERROR» وفيه.`,
            R`حوّل الترميز في الطريق: [[iconv -f UTF-16 -t UTF-8]] من UTF-16 لـ UTF-8 (وبيشيل الـ BOM)، و [[tr -d '\r']] يشيل [[\r]] بتاع ويندوز، وبعدين [[grep]] عادي.`,
          ],
          try: R`في فولدر المعمل: اكتب [[run.log]] من [[powershell]] بـ [[>]] و [[run7.log]] من [[pwsh]]، وقارن [[Format-Hex]] و [[(Get-Item run.log).Length]] للاتنين. وبعدين من Git Bash جرّب [[grep]] و [[grep -a]] و [[iconv]]. وفي الآخر شوف [[Test-Path "$HOME\Desktop"]] و [[[Environment]::GetFolderPath('Desktop')]] على جهازك.`,
          teach: R`## العَرَض

سكربت الأداة بيتشغّل بـ [[powershell -File]] (5.1) وبيكتب [[run.log]] بـ [[>]]. ومن Git Bash:

~~~text grep ERROR run.log; echo "exit=$?"
exit=1
~~~

لا سطر، ولا [[Binary file matches]]، ولا خطأ. والملف فيه [[ERROR route add failed]] فعلًا (فاتح في VS Code قدامك).

---

## ١. الملف ده إيه؟ اسأل الـ bytes

~~~powershell
powershell -NoProfile -Command "'connected to 203.0.113.9','ERROR route add failed','done' > run.log"
pwsh -NoProfile -Command "'connected to 203.0.113.9','ERROR route add failed' > run7.log"
~~~

~~~text أول bytes والحجم (اتقرت بـ [IO.File]::ReadAllBytes)
run.log  : FF FE 63 00 6F 00  size=114
run7.log : 63 6F 6E 6E 65 63  size=50
~~~

| الـ bytes | معناها |
|---|---|
| [[FF FE]] | BOM بتاع UTF-16 little-endian: «الملف ده UTF-16، والـ byte الصغير الأول» |
| [[63 00]] | حرف [[c]] (0x63) وبعده صفر. كل حرف إنجليزي = ٢ byte |
| [[63 6F 6E]] في [[run7.log]] | [[c o n]] مباشرة: UTF-8، حرف إنجليزي = byte واحد |
| [[size=114]] مقابل [[50]] | نفس الكلام تقريبًا بضعف الحجم (وفيه سطر زيادة في الأول) |

ومن Git Bash:

~~~text file run.log run7.log
run.log:  Unicode text, UTF-16, little-endian text, with CRLF line terminators
run7.log: ASCII text, with CRLF line terminators
~~~

ومين بيكتب إيه في 5.1 (اتجرّب):

| الطريقة في 5.1 | أول bytes | الترميز |
|---|---|---|
| [['x' > a.log]] | [[FF FE]] | UTF-16LE |
| [['x' | Out-File a.log]] | [[FF FE]] | UTF-16LE (هو نفسه [[>]]) |
| [['x' | Set-Content a.log]] | [[78 0D 0A]] | ANSI (صفحة كود الجهاز). إنجليزي بس يبان عادي، عربي يبوظ |
| [[Set-Content -Encoding UTF8]] | [[EF BB BF]] | UTF-8 بـ BOM |
| [[[IO.File]::WriteAllLines(path, lines)]] | [[61 0D 0A]] | UTF-8 من غير BOM |

وفي PowerShell 7 كله UTF-8 من غير BOM افتراضيًا (بما فيهم [[>]]).

---

## ٢. ليه [[grep]] ساكت؟

~~~text cat -A run.log | head -2
M-^?M-~c^@o^@n^@n^@e^@c^@t^@e^@d^@ ^@t^@o^@ ^@2^@0^@3^@.^@0^@.^@1^@1^@3^@.^@9^@^M^@$
^@E^@R^@R^@O^@R^@ ^@r^@o^@u^@t^@e^@ ^@a^@d^@d^@ ^@f^@a^@i^@l^@e^@d^@^M^@$
~~~

[[^@]] هو الـ byte صفر. الكلمة على الديسك [[E^@R^@R^@O^@R^@]]، و [[grep ERROR]] بيدوّر على ٥ bytes ورا بعض ([[ERROR]])، ومش موجودين ورا بعض. فـ [[grep]] بيقول بصدق «ملقتش» (كود 1). ومش بيقول [[Binary file matches]] لأن ده بيظهر لما **يلاقي** حاجة في ملف شكله binary.

يعني أي سكربت مراقبة بيعمل [[grep -q ERROR run.log || echo OK]] هيقول OK دايمًا.

---

## ٣. القراية: [[iconv]]

~~~text iconv -f UTF-16 -t UTF-8 run.log | tr -d '\r' | grep ERROR
ERROR route add failed
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[iconv -f UTF-16]] | اقرا UTF-16 (وبيعرف الـ endianness من الـ BOM وبيشيله) |
| [[-t UTF-8]] | واكتب UTF-8 |
| [[tr -d '\r']] | امسح [[\r]]: سطور ويندوز آخرها [[\r\n]]، و [[grep 'failed$']] مش هيلاقي [[failed]] في آخر السطر من غيرها |
| [[grep ERROR]] | دلوقتي عادي |

~~~text iconv -f UTF-16 -t UTF-8 run.log | cat -A | head -2
connected to 203.0.113.9^M$
ERROR route add failed^M$
~~~

([[^M]] هي [[\r]] اللي [[tr]] بيشيلها.) ومن PowerShell نفسه مفيش مشكلة: [[Select-String ERROR run.log]] بيقرا الـ BOM وبيلاقيها ([[run.log:2:ERROR route add failed]]).

---

## ٤. الحل: اكتب UTF-8 من الأول

في السكربت اللي بيشتغل على 5.1:

~~~powershell
Add-Content -Path run.log -Value $line -Encoding UTF8
$PSDefaultParameterValues['Out-File:Encoding'] = 'utf8'
~~~

- السطر الأول: كل كتابة في اللوج بترميز صريح (ده اللي في [[run.ps1]] في درس «تجربة أدمن»).
- السطر التاني: من هنا ورايح في السكربت ده، أي [[Out-File]] (و [[>]] لأنه [[Out-File]]) بيكتب UTF-8. اتجرّب في 5.1: [['a' > pdv.log]] بقى أوله [[EF BB BF 61]].

أو شغّل السكربت بـ [[pwsh]] (7)، و [[>]] هيكتب UTF-8 من غير أي إعداد.

---

## ٥. الغلطة التانية: [[Could not find a part of the path]]

~~~text 'x' | Out-File "$HOME\Desktop\x.json" (Windows PowerShell 5.1)
Out-File : Could not find a part of the path 'C:\Users\you\Desktop\x.json'.
    + CategoryInfo          : OpenError: (:) [Out-File], DirectoryNotFoundException
    + FullyQualifiedErrorId : FileOpenFailure,Microsoft.PowerShell.Commands.OutFileCommand
~~~

[[Could not find a part of the path]] = **الفولدر** مش موجود (مش الملف؛ [[Out-File]] بيعمل الملف لكن مش الفولدر). وعلى الجهاز ده:

~~~text الناتج
False                            ← Test-Path "$HOME\Desktop"
C:\Users\you\OneDrive\Desktop    ← [Environment]::GetFolderPath('Desktop')
C:\Users\you\OneDrive\Documents  ← [Environment]::GetFolderPath('MyDocuments')
~~~

OneDrive «حماية الفولدرات» بينقل سطح المكتب والمستندات جوه فولدر OneDrive. فـ [[$HOME\Desktop]] مبقاش موجود أصلًا. [[GetFolderPath]] بيقرا الإعداد الحقيقي (نفس اللي في الـ registry تحت [[User Shell Folders]]) فبيرجّع المكان الصح.

> وخد بالك: أي حاجة تتحط على سطح المكتب ده **بتترفع** لـ OneDrive. ملف إعداد فيه سر (زي UUID بتاع VPN) ميتحطّش هناك. حطه في [[$env:LOCALAPPDATA\<app>]] (مش متزامن).

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| [[grep -a ERROR]] | بيعامل الملف كنص بس الـ bytes لسه فيها أصفار، فالكلمة لسه مش متلاقية |
| تفتح اللوج في محرر وتحفظه UTF-8 | بيصلّح ملف واحد مرة واحدة، والسكربت هيكتب UTF-16 تاني |
| [[Set-Content]] من غير [[-Encoding]] في 5.1 | ANSI: العربي واللغات التانية بتبوظ |
| تكتب [[C:\Users\<اسم>\Desktop]] في السكربت | بيبوظ على أي جهاز تاني أو مع OneDrive |

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| الملف ده ترميزه إيه؟ | [[file x.log]] (Git Bash) أو [[Format-Hex x.log | Select-Object -First 1]] |
| أقرا UTF-16 من bash | [[iconv -f UTF-16 -t UTF-8 x.log | tr -d '\r']] |
| أكتب UTF-8 في 5.1 | [[-Encoding UTF8]] أو [[$PSDefaultParameterValues['Out-File:Encoding']]] |
| سطح المكتب فين؟ | [[[Environment]::GetFolderPath('Desktop')]] |
| [[Could not find a part of the path]] | الفولدر مش موجود: [[Test-Path (Split-Path $path)]] |`,
          deep: {
            why: R`اللوج اللي محدش قادر يدوّر فيه زي مفيش لوج. وأخطر من الخطأ إن [[grep]] بيقول «مفيش» بثقة. وأي pipeline بيخلط ويندوز وأدوات لينكس (Git Bash، و CI، و Docker) هيقابل ده.`,
            how: R`Windows PowerShell 5.1 مبني على .NET Framework، والـ [[Out-File]] فيه افتراضيه [[Unicode]] (يعني UTF-16LE في .NET)، و [[Set-Content]] افتراضيه [[Default]] (صفحة الكود ANSI بتاعة النظام). PowerShell 6 وما بعده وحّدوا الكل على [[utf8NoBOM]]. و [[iconv]] بيقرا الـ BOM عشان يعرف الترتيب ([[FF FE]] = little-endian)، ولو مفيش BOM وكتبت [[UTF-16]] بس بيفترض big-endian، فالأضمن [[-f UTF-16LE]] لو الملف من غير BOM.`,
            when: R`أي سكربت 5.1 بيكتب ملف هيتقري بأداة تانية: لوج، أو CSV لـ Excel أو Python، أو JSON لبرنامج، أو ملف [[.env]]. وأي سكربت بيكتب على سطح المكتب أو المستندات.`,
            mistakes: R`تفتكر إن [[grep]] الفاضي معناه مفيش أخطاء. وتصلّح الملف بإيدك وتسيب السكربت. وتستخدم [[Set-Content]] في 5.1 فتطلع من UTF-16 لـ ANSI. وتنسى [[tr -d '\r']] فـ [[grep 'failed$']] ميلاقيش. وتكتب [[$HOME\Desktop]] في سكربت هيتشغّل على أجهزة فيها OneDrive. وتحط ملف فيه سر على سطح مكتب متزامن.`
          },
          sol: R`[[run.log]] من 5.1: [[FF FE 63 00 6F 00]] و [[size=114]]، و [[run7.log]] من 7: [[63 6F 6E 6E 65 63]] و [[size=50]]. و [[file]]: [[Unicode text, UTF-16, little-endian text, with CRLF line terminators]] و [[ASCII text, with CRLF line terminators]]. و [[grep ERROR run.log]] من غير ناتج و [[exit=1]]، و [[iconv ... | grep ERROR]] طبع [[ERROR route add failed]]. وفي 5.1: [[Out-File]] = [[FF FE]]، و [[Set-Content]] = [[78 0D 0A]]، و [[-Encoding UTF8]] و [[$PSDefaultParameterValues]] = [[EF BB BF]]، و [[WriteAllLines]] = [[61 0D 0A]].

و [[Out-File]] لفولدر مش موجود: [[Could not find a part of the path]] مع [[DirectoryNotFoundException]]. وعلى جهاز التجربة [[Test-Path "$HOME\Desktop"]] = [[False]] و [[GetFolderPath('Desktop')]] = [[C:\Users\you\OneDrive\Desktop]] (اسم اليوزر متغيّر).

اتجرّب على ويندوز 11 في PowerShell 5.1 و 7.6 و Git Bash (Git 2.56).`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: أول ٢ bytes في ملف UTF-16LE إيه؟ وفي UTF-8 بـ BOM؟ وأنهي أمر في 5.1 بيكتب كل واحد؟`, done: R`[[FF FE]] لـ UTF-16LE من [[>]] و [[Out-File]]، و [[EF BB BF]] لـ UTF-8 بـ BOM من [[Set-Content -Encoding UTF8]]، وجرّبتهم بـ [[Format-Hex]].` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: ملف UTF-16 فيه [[ERROR]]. توقّع ناتج وكود خروج: [[grep ERROR]]، و [[grep -a ERROR]]، و [[grep -c E]]، و [[iconv -f UTF-16 -t UTF-8 f | grep -c ERROR]]. وبعدين شغّلهم.`, done: R`الأولين مفيش ناتج وكود 1، و [[grep -c E]] بيعد سطور فيها [[E]] (لأن الحرف لوحده موجود)، و [[iconv]] بيطلع العدد الصح. وكتبت ليه [[-c E]] اشتغل و [[ERROR]] لأ.` },
            { lvl: 'تطبيق', t: R`صلّح السكربت ده اللي بيتشغّل بـ [[powershell -File]]: [[Get-Date | Out-File C:\lab\out.txt; "ERROR x" >> C:\lab\out.txt; Get-Content C:\lab\out.txt | Set-Content "$HOME\Desktop\report.txt"]]. لاقي ٣ مشاكل.`, done: R`لقيت: الملف UTF-16 فـ [[grep]] من Git Bash مش هيشوفه، و [[Set-Content]] بيحوّله ANSI، و [[$HOME\Desktop]] ممكن ميكونش موجود. والنسخة الجديدة فيها [[-Encoding UTF8]] في الكتابات و [[GetFolderPath('Desktop')]]، و [[grep ERROR]] من Git Bash لقاها.` },
            { lvl: 'تطبيق', t: R`ابني [[Get-FileEncoding]]: function بتقرا أول ٤ bytes وترجّع [[utf-16le]] أو [[utf-16be]] أو [[utf-8-bom]] أو [[no-bom]]. وشغّلها على كل ملفات المعمل.`, done: R`بترجّع [[utf-16le]] لـ [[run.log]] و [[no-bom]] لـ [[run7.log]] و [[utf-8-bom]] لـ [[setup.iss]] بتاع الدرس اللي فات، ومبتقعش على ملف فاضي (صفر bytes).` },
            { lvl: 'تحدي', t: R`بيانات حقيقية: اعمل ٣ لوجات من 5.1 بـ [[>]] فيهم ٥٠ سطر عشوائي من [[INFO]] و [[WARN]] و [[ERROR]]. من Git Bash بأمر واحد اطبع عدد كل نوع في الـ ٣ ملفات مع بعض.`, done: R`الأمر شكله [[for f in *.log; do iconv -f UTF-16 -t UTF-8 "$f"; done | tr -d '\r' | awk '{print $1}' | sort | uniq -c]]، والأرقام مجموعها ١٥٠ وبتطابق [[Select-String]] من PowerShell.` },
            { lvl: 'تحدي', t: R`دوّر بنفسك: من [[Get-Help Out-File -Parameter Encoding]] في 5.1 وفي 7، اكتب القيمة الافتراضية في كل نسخة وكل القيم المسموحة، وأنهي قيمة في 7 بتكتب BOM.`, done: R`كتبت إن 5.1 افتراضيه [[unicode]] و 7 افتراضيه [[utf8NoBOM]]، وإن [[utf8BOM]] في 7 هو اللي بيكتب BOM و [[utf8]] في 7 من غير BOM (عكس 5.1)، وجرّبت واحدة بـ [[Format-Hex]].` },
          ],
          ci: [
            { os: [R`windows`], sh: R`powershell`, run: R`'connected','ERROR route add failed' > run.log
'line' | Set-Content set.log
'line' | Set-Content utf.log -Encoding UTF8
$PSDefaultParameterValues['Out-File:Encoding'] = 'utf8'; 'a' > pdv.log
foreach ($f in 'run.log','set.log','utf.log','pdv.log') { "$f " + ((Get-Content $f -Encoding Byte -TotalCount 2 | ForEach-Object { '{0:X2}' -f $_ }) -join ' ') }
try { 'x' | Out-File (Join-Path $PWD 'NoDesktop\x.json') -ErrorAction Stop } catch { $_.Exception.Message.Split("'")[0] }`, expect: [R`run.log FF FE`, R`set.log 6C 69`, R`utf.log EF BB`, R`pdv.log EF BB`, R`Could not find a part of the path`] },
            { os: [R`windows`], sh: R`pwsh`, run: R`'ERROR x' > run7.log
'run7.log ' + (([IO.File]::ReadAllBytes("$PWD\run7.log")[0..1] | ForEach-Object { '{0:X2}' -f $_ }) -join ' ')
powershell -NoProfile -Command "'ERROR x' > run51.log"
$b = [IO.File]::ReadAllBytes("$PWD\run51.log")
"run51 has zero bytes: $($b -contains 0)"
"decoded: " + [Text.Encoding]::Unicode.GetString($b, 2, $b.Length - 2).Trim()
"desktop exists: " + (Test-Path ([Environment]::GetFolderPath('Desktop')))`, expect: [R`run7.log 45 52`, R`run51 has zero bytes: True`, R`decoded: ERROR x`, R`desktop exists: True`] },
          ],
        },
        {
          cmd: "Smart App Control",
          title: "An Application Control policy has blocked this file: ملف بنيته لسه اتحجب",
          learn: R`تعرف إن الحجب جاي من Smart App Control (مش من الكود)، وتقرا حالته من الـ registry من غير ما تغيّره، وتشوف الملف موقّع ولا لأ، وتلاقي الحدث في لوج Code Integrity، وتختار حل من غير ما تقفل حماية مبترجعش.`,
          out: R`[[VerifiedAndReputablePolicyState]] رقمه بيقول الحالة، و [[Get-AuthenticodeSignature]] على ملفك [[NotSigned]] وعلى ملف ويندوز [[Valid]].`,
          desc: R`[[dotnet test]] كان شغّال، وبعد build جديد فشل برسالة:

[[An Application Control policy has blocked this file. (0x800711C7)]]

الكود متغيّرش بشكل يفسّر ده. الـ DLL اللي اتبنى لسه **جديد ومش موقّع** ومحدش في العالم شافه قبل كده، و Smart App Control (حماية في ويندوز 11) بيسمح بس بالبرامج الموقّعة أو اللي Microsoft عارفة إن سمعتها كويسة. فحجبه.

الفحص (قراية بس): حالة SAC من [[HKLM:\SYSTEM\CurrentControlSet\Control\CI\Policy]] (القيمة [[VerifiedAndReputablePolicyState]]: 0 مقفول، 1 شغّال، 2 تقييم)، و [[Get-AuthenticodeSignature]] على الملف، والحدث [[3033]] في لوج [[Microsoft-Windows-CodeIntegrity/Operational]]. الحلول: توقيع الملفات بشهادة، أو تبني وتختبر في مكان تاني (WSL أو Docker أو CI). وقفل SAC **مبيرجعش** تاني من غير إعادة تسطيب ويندوز، فمش بننصح بيه.`,
          example: R`# Windows (PowerShell):
Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\CI\Policy' | Select-Object VerifiedAndReputablePolicyState
Get-AuthenticodeSignature .\bin\Debug\net8.0\LabTool.dll | Select-Object Status, StatusMessage
Get-AuthenticodeSignature "$env:windir\System32\notepad.exe" | Select-Object Status, SignatureType
Get-WinEvent -LogName 'Microsoft-Windows-CodeIntegrity/Operational' -MaxEvents 200 | Group-Object Id | Sort-Object Count -Descending | Select-Object Count, Name
Get-WinEvent -LogName 'Microsoft-Windows-CodeIntegrity/Operational' -MaxEvents 200 | Where-Object Id -eq 3033 | Select-Object -First 1 TimeCreated, Message`,
          lines: [
            R`حالة Smart App Control: قراية قيمة من الـ registry بس. [[0]] مقفول، و [[1]] شغّال (بيحجب)، و [[2]] وضع تقييم (بيتعلّم ومبيحجبش). على جهاز التجربة [[0]].`,
            R`الملف اللي اتحجب موقّع؟ [[Status]] بيقول [[NotSigned]] أو [[Valid]] أو [[HashMismatch]]، و [[StatusMessage]] بيشرح.`,
            R`للمقارنة: ملف من ويندوز نفسه [[Valid]]، و [[SignatureType]] = [[Catalog]] (التوقيع في ملف كتالوج للنظام، مش جوه الـ exe).`,
            R`لوج Code Integrity: أكتر أرقام أحداث ظهرت في آخر ٢٠٠ حدث. [[3033]] = ملف اتمنع يتحمّل لأنه مش موقّع كفاية.`,
            R`آخر حدث [[3033]] ورسالته: فيها مسار العملية اللي حاولت تحمّل ومسار الملف اللي اتمنع، فتعرف بالظبط مين اتحجب.`,
          ],
          try: R`على جهازك (قراية بس): شوف قيمة [[VerifiedAndReputablePolicyState]]، واعمل ملف [[lab.ps1]] في فولدر المعمل وشوف [[Get-AuthenticodeSignature]] بتاعه، وقارنه بـ [[notepad.exe]]. وبص على أرقام أحداث Code Integrity عندك. متغيّرش أي إعداد.`,
          teach: R`## العَرَض

مشروع .NET، و [[dotnet test]] شغّال من أسبوع. بعد تعديل صغير و build:

~~~text الحالة الحقيقية (ويندوز 11)
An Application Control policy has blocked this file. (0x800711C7)
~~~

مفيش stack trace من الكود بتاعك. الخطأ من **ويندوز**، وقت ما حاول يحمّل الـ DLL. ([[0x800711C7]] = [[ERROR_SYSTEM_INTEGRITY_POLICY_VIOLATION]]: سياسة سلامة النظام رفضت الملف.)

النص ده من الحالة الأصلية ومن وثائق Microsoft، ومش متكرر هنا: جهاز التجربة SAC عليه مقفول، والفحوصات تحت كلها قراية بس.

---

## ١. ترتيب الأسئلة

١. **الخطأ من مين؟** رسالة فيها [[Application Control policy]] = من ويندوز مش من الكود. فمتدوّرش في الكود.
٢. **أنهي حماية؟** Smart App Control ولا WDAC (سياسة شركة) ولا antivirus؟
٣. **ليه الملف ده؟** موقّع؟ جديد؟
٤. **فين الدليل؟** لوج Code Integrity.

---

## ٢. SAC شغّال؟

~~~powershell
Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\CI\Policy' | Select-Object VerifiedAndReputablePolicyState
~~~

~~~text الناتج (جهاز التجربة)
VerifiedAndReputablePolicyState
-------------------------------
                              0
~~~

| القيمة | الحالة (من وثائق Microsoft) |
|---|---|
| [[0]] | Off: مقفول، ومش بيحجب أي حاجة |
| [[1]] | On: بيحجب أي حاجة مش موقّعة ومش معروفة |
| [[2]] | Evaluation: بيراقب استخدامك ويقرر لوحده بعدين يشتغل ولا يقفل. مبيحجبش |

ونفس المعلومة من الواجهة: Windows Security ← App & browser control ← Smart App Control.

[[Get-ItemProperty]] قراية بس. **متكتبش** في المفتاح ده.

---

## ٣. الملف موقّع؟

~~~powershell
Set-Content lab.ps1 '"hi"'
Get-AuthenticodeSignature lab.ps1 | Select-Object Status, StatusMessage
Get-AuthenticodeSignature "$env:windir\System32\notepad.exe" | Select-Object Status, SignatureType
~~~

~~~text الناتج
Status        : NotSigned
StatusMessage : The file C:\...\lab.ps1 is not digitally signed. You cannot run this script on the current system. ...

Status        : Valid
SignatureType : Catalog
~~~

أي DLL انت بتبنيه بيطلع [[NotSigned]]. وكل build بيطلع ملف **جديد** (hash مختلف)، فحتى لو SAC «عدّى» نسخة قبل كده، النسخة الجديدة مجهولة. وده اللي بيفسّر «كان شغّال وفجأة لأ».

| [[Status]] | معناه |
|---|---|
| [[Valid]] | موقّع، والتوقيع سليم، والشهادة من جهة موثوقة |
| [[NotSigned]] | مفيش توقيع خالص (أي حاجة لسه مبنية) |
| [[HashMismatch]] | موقّع بس الملف اتعدّل بعد التوقيع |
| [[UnknownError]] | التوقيع موجود بس السلسلة مش موثوقة (شهادة self-signed مثلًا) |

---

## ٤. الدليل: لوج Code Integrity

~~~powershell
Get-WinEvent -LogName 'Microsoft-Windows-CodeIntegrity/Operational' -MaxEvents 200 | Group-Object Id | Sort-Object Count -Descending | Select-Object Count, Name
~~~

~~~text الناتج (جهاز التجربة)
Count Name
----- ----
  118 3089
   60 3033
   10 3099
   10 3116
    2 3084
~~~

~~~text رسالة حدث 3033 (المسارات اتشالت)
Code Integrity determined that a process (<path>) attempted to load <path> that did not meet the Microsoft signing level requirements.
~~~

| الحدث | معناه |
|---|---|
| [[3033]] | عملية حاولت تحمّل ملف مش موقّع بالمستوى المطلوب. مستوى [[Error]] |
| [[3089]] | تفاصيل التوقيع لحدث تاني (نفس الـ Correlation Id) |
| [[3077]] | (لما سياسة WDAC أو SAC بتحجب فعلًا) الملف اتمنع بسبب السياسة |

على الجهاز ده الـ 3033 جاية من برامج ويندوز نفسها (مش حجب SAC). عندك، لو SAC هو السبب، هتلاقي حدث وقت الخطأ بالظبط ومسار الـ DLL بتاعك فيه. [[Where-Object Id -eq 3033]] و [[TimeCreated]] بيوصلوك ليه.

---

## ٥. الحل

| الحل | إمتى |
|---|---|
| تبني وتختبر في WSL أو Docker أو GitHub Actions | الأسهل: SAC بيحمي ويندوز بس، والـ tests في Linux مش بتتأثر |
| توقّع الملفات بشهادة code signing حقيقية ([[signtool sign]]) | لو بتوزّع البرنامج لناس. ده الحل الحقيقي، وبيكلّف (شهادة من جهة معتمدة) |
| SAC في وضع Evaluation | مش بإيدك: ويندوز بيقرر |
| تقفل SAC | **مبيرجعش** تاني من غير إعادة تسطيب ويندوز (أو reset). حماية كاملة بتضيع عشان build. مش بننصح بيه |

> شهادة self-signed بتعملها انت ([[New-SelfSignedCertificate]]) **مش** بتخلي SAC يثق في الملف، لأنها مش من جهة SAC بيثق فيها.

---

## ٦. البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تدوّر في الكود | الخطأ من ويندوز، والكود متغيّرش بشكل يفسّره |
| تعمل build تاني «يمكن يعدّي» | كل build ملف جديد، نفس الحكاية |
| تقفل SAC «لحد ما أخلص» | مفيش «لحد ما»: مبيرجعش |
| [[Unblock-File]] | ده بيشيل علامة «اتنزّل من النت» (Mark of the Web)، و SAC بيبص على التوقيع والسمعة، مش العلامة بس |

---

## الخلاصة

| السؤال | الأمر (قراية بس) |
|---|---|
| SAC شغّال؟ | [[Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\CI\Policy']] |
| الملف موقّع؟ | [[Get-AuthenticodeSignature]] |
| مين اتحجب وإمتى؟ | [[Get-WinEvent -LogName 'Microsoft-Windows-CodeIntegrity/Operational']] و [[3033]] |
| الحل | ابني واختبر في Linux، أو وقّع بشهادة. مش تقفل SAC |`,
          deep: {
            why: R`الخطأ ده بيضيّع يوم لو دوّرت في الكود. ومعرفة إنه من ويندوز (من كلمة [[Application Control policy]] والكود [[0x800711C7]]) بتوفّر ده. ومعرفة إن قفل SAC مبيرجعش بتمنعك من قرار مش هتقدر ترجع فيه.`,
            how: R`Smart App Control مبني على نفس محرك WDAC (Windows Defender Application Control): كل ملف تنفيذي أو DLL بيتحمّل بيعدّي على Code Integrity في الكيرنل، اللي بيشوف التوقيع، ولو مش موقّع بيسأل خدمة سحابية عن سمعة الـ hash. ملف لسه مبني محدش شافه، فمالوش سمعة. والقرار بيتسجّل في لوج [[CodeIntegrity/Operational]]. والسبب إنه مبيرجعش: ويندوز بيشغّله على جهاز «نضيف» من أول التسطيب، ولو اتقفل ميقدرش يضمن إن مفيش حاجة اتسطّبت وهو مقفول.`,
            when: R`أي ملف بتبنيه على ويندوز 11 وبيتشغّل محلي: [[dotnet test]]، و DLL لـ native addon في Node، و [[.exe]] من Go أو Rust أو PyInstaller. ولما تبعت برنامجك لناس عليهم ويندوز 11 جديد: نفس الحجب هيحصلهم.`,
            mistakes: R`تدوّر في الكود. وتعمل clean و rebuild كتير. وتقفل SAC فتخسره للأبد. وتفتكر إن شهادة self-signed هتحل. وتفتكر إن [[Unblock-File]] هيحل. وتكتب في الـ registry بتاع [[CI\Policy]] بإيدك.`
          },
          sol: R`على جهاز التجربة: [[VerifiedAndReputablePolicyState]] = [[0]] (مقفول)، و [[lab.ps1]] [[NotSigned]] برسالة [[is not digitally signed]]، و [[notepad.exe]] [[Valid]] و [[Catalog]]. ولوج Code Integrity فيه [[3089]] و [[3033]] و [[3099]] و [[3116]] و [[3084]]، ورسالة [[3033]]: [[Code Integrity determined that a process (...) attempted to load ... that did not meet the Microsoft signing level requirements.]]

اتجرّب قراية بس على ويندوز 11 في PowerShell 7.6. رسالة [[An Application Control policy has blocked this file. (0x800711C7)]] ومعاني قيم [[VerifiedAndReputablePolicyState]] وإن قفل SAC مبيرجعش من غير إعادة تسطيب: من الحالة الأصلية ووثائق Microsoft، ومتكررتش هنا لأن SAC مقفول على الجهاز.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: رسالة [[An Application Control policy has blocked this file]] جاية من مين؟ واكتب ٣ أوامر قراية بس تأكد بيهم.`, done: R`كتبت إنها من ويندوز (Code Integrity و SAC أو WDAC) مش من الكود، والأوامر: قراية [[VerifiedAndReputablePolicyState]]، و [[Get-AuthenticodeSignature]] على الملف، و [[Get-WinEvent]] على لوج [[CodeIntegrity/Operational]].` },
            { lvl: 'تطبيق', t: R`قارن: شغّل [[Get-AuthenticodeSignature]] على ٥ ملفات: [[notepad.exe]]، و [[pwsh.exe]] (من [[(Get-Command pwsh).Source]])، و [[git.exe]]، وسكربت عملته، وأي exe في Downloads. اعمل جدول بالـ [[Status]] و [[SignatureType]] واسم الموقّع.`, done: R`الجدول ٥ سطور، وفيه على الأقل [[Catalog]] لملف ويندوز و [[Embedded]] لبرنامج من بره و [[NotSigned]] لسكربتك، واسم الموقّع من [[SignerCertificate.Subject]].` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية: من لوج Code Integrity عندك، طلّع آخر ٥٠ حدث [[3033]] وجمّعهم بالملف اللي اتمنع (من الرسالة) بـ regex، واعرض أكتر ٣.`, done: R`عندك جدول ٣ سطور فيه اسم الملف (من غير المسار الكامل) وعدد المرات، والـ regex بيطلّع الجزء بعد [[attempted to load]].` },
            { lvl: 'تطبيق', t: R`اشرحها: زميلك عايز يقفل SAC عشان [[dotnet test]] بيقع. اكتبله رسالة ٥ سطور: ليه بيحصل، وليه القفل قرار وحش، والبديل اللي يعمله النهارده.`, done: R`الرسالة فيها: الملف الجديد مش موقّع ومالوش سمعة، والقفل مبيرجعش من غير إعادة تسطيب، والبديل [[dotnet test]] في WSL أو Docker أو CI، وأمر قراية واحد يتأكد بيه.` },
            { lvl: 'تحدي', t: R`ابني [[Test-SacBlock]]: function بتاخد مسار ملف، وتطبع حالة SAC، وتوقيع الملف، وآخر حدث Code Integrity (من آخر ساعة) فيه اسم الملف، وحكم في سطر: «SAC مقفول: مش هو السبب» أو «الملف مش موقّع و SAC شغّال: غالبًا هو» أو «فيه حدث للملف ده: هو».`, done: R`على جهاز SAC مقفول بتطبع الحكم الأول لأي ملف، ومبتكتبش في الـ registry، ولو اللوج مش متاح (صلاحيات) بتقول كده وتكمّل، وبتخلص في أقل من ٣ ثواني.` },
          ],
          ci: [
            { os: [R`windows`], sh: R`pwsh`, run: R`Set-Content lab.ps1 '"hi"'
"lab: " + (Get-AuthenticodeSignature .\lab.ps1).Status
$n = Get-AuthenticodeSignature "$env:windir\System32\notepad.exe"
"notepad: $($n.Status)"
(Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\CI\Policy' -ErrorAction SilentlyContinue) -ne $null | ForEach-Object { "policy key readable: $_" }`, expect: [R`lab: NotSigned`, R`notepad: Valid`] },
          ],
        },
        {
          cmd: "schtasks و المسافات",
          title: "مهمة Task Scheduler مسارها فيه مسافة: التنصيص بيوصل إزاي، وإزاي تتأكد من غير ما تعمل مهمة",
          learn: R`تكتب [[/TR]] بتاع [[schtasks]] لمسار فيه مسافة صح في PowerShell 7 و 5.1 و CMD، وتتأكد من الـ argument اللي وصل فعلًا ببرنامج بيطبع الـ argv، وتقرا مهمة موجودة بـ [[/XML]] و [[Get-ScheduledTaskInfo]]، وتعرف ليه [[New-ScheduledTaskAction]] بيخلّصك من المشكلة.`,
          out: R`البرنامج اللي بيطبع الـ argv بيوري [["\"C:\\Program Files\\Lab\\app.exe\" --autostart"]] كـ argument واحد، ومهمة ويندوز موجودة بتطلع [[Command]] و [[Arguments]] منفصلين.`,
          desc: R`الأداة بتشتغل مع تسجيل الدخول كأدمن عن طريق مهمة:

[[schtasks /Create /TN LabTask /TR "\"C:\Program Files\Lab\app.exe\" --autostart" /SC ONLOGON /RL HIGHEST /DELAY 0000:20 /F]]

القيمة بعد [[/TR]] لازم توصل لـ [[schtasks]] كـ **argument واحد** فيه التنصيص جوّاه، عشان المهمة تفهم إن البرنامج هو [[C:\Program Files\Lab\app.exe]] والـ argument هو [[--autostart]]. والسطر ده مكتوب بأسلوب CMD. نفس السطر لو اتلزق في PowerShell (7 أو 5.1) القيمة بتتقسم ٣ arguments، لأن [[\"]] مش escape في PowerShell. والشكل الصح في PowerShell مختلف بين 7 و 5.1: اللي يشتغل في واحدة بيبوظ في التانية.

إزاي تتأكد **من غير ما تعمل مهمة**: ابعت نفس الـ arguments لبرنامج بيطبع اللي استلمه ([[node -e "console.log(process.argv)"]])، أو استخدم [[ProcessStartInfo.ArgumentList]] اللي بيعمل التنصيص صح لوحده، أو أحسن: [[New-ScheduledTaskAction -Execute ... -Argument ...]] (البرنامج والـ arguments في خانتين، فمفيش تنصيص تعمله). وتقرا أي مهمة موجودة بـ [[schtasks /Query /XML]].`,
          example: R`# Windows (PowerShell):
Set-Content argv.js 'console.log(JSON.stringify(process.argv.slice(2)))'
node argv.js /TR "\"C:\Program Files\Lab\app.exe\" --autostart"
node argv.js /TR '"C:\Program Files\Lab\app.exe" --autostart'
powershell -NoProfile -Command 'node argv.js /TR ''\"C:\Program Files\Lab\app.exe\" --autostart'''
$x = [xml](schtasks /Query /TN '\Microsoft\Windows\Defrag\ScheduledDefrag' /XML | Out-String)
$x.Task.Actions.Exec | Select-Object Command, Arguments
Get-ScheduledTask -TaskName ScheduledDefrag | Get-ScheduledTaskInfo | Select-Object LastRunTime, LastTaskResult
# Windows (CMD):
node argv.js /TR "\"C:\Program Files\Lab\app.exe\" --autostart"`,
          lines: [
            R`برنامج صغير بيطبع الـ arguments اللي وصلته بالظبط (JSON عشان التنصيص والـ backslash يبانوا). ده بيقف مكان [[schtasks]] في التجربة: الاتنين بيقسموا سطر الأوامر بنفس قواعد ويندوز.`,
            R`سطر CMD زي ما هو في PowerShell: [[\"]] مش escape في PowerShell (الـ escape عنده الـ backtick)، فالنص [["\"]] خلص عند التنصيص التاني، والقيمة اتقسمت ٣: [[\]] و [[C:\Program]] و [[Files\Lab\app.exe\ --autostart]]. نفس النتيجة في 7 و 5.1.`,
            R`الصح في PowerShell 7: القيمة كلها بين [['...']] والتنصيص المزدوج جوّاها عادي. 7.3 وما بعده بيعمل الـ escaping لوحده ([[$PSNativeCommandArgumentPassing]] = [[Windows]]).`,
            R`في 5.1 الشكل اللي اشتغل في 7 بيتقسم، فلازم [[\"]] جوه الـ single quotes. السطر ده بيشغّل 5.1 من جوه 7: الأمر كله بين [['...']]، وكل [[']] جوّاه بتتكتب مرتين ([['']]). الناتج: [["\"C:\\Program Files\\Lab\\app.exe\" --autostart"]] عنصر واحد.`,
            R`اقرا مهمة موجودة في ويندوز كـ XML (قراية بس): [[/Query]] و [[/TN]] اسمها بالمسار و [[/XML]]، و [[Out-String]] يجمّع السطور نص واحد، و [[[xml]]] يحوّله object.`,
            R`المهمة متخزّنة خانتين: [[Command]] (البرنامج) و [[Arguments]]. ده اللي [[/TR]] بيتقسم ليه، وده اللي لازم تتأكد منه بعد أي [[/Create]].`,
            R`آخر مرة اشتغلت وبأي نتيجة: [[LastTaskResult]] صفر = نجحت. (في قضية «نسختين بعد Modern Standby» في تاب التشخيص، [[LastRunTime]] هو اللي كشف إن المهمة اشتغلت وقت الصحيان.)`,
            R`نفس السطر في CMD بيوصل صح: ده الشكل اللي في وثائق [[schtasks]]، و [[\"]] هي طريقة CMD والبرامج تحط تنصيص جوه تنصيص.`,
          ],
          try: R`اعمل [[argv.js]] وجرّب سطور الـ [[/TR]] في [[pwsh]] و [[powershell]] و [[cmd]]، واكتب لكل واحد الـ argument اللي وصل. وبعدين اقرا مهمة [[ScheduledDefrag]] بـ [[/XML]] واطبع [[Command]] و [[Arguments]] و [[LastTaskResult]]. متعملش ولا مهمة.`,
          teach: R`## العَرَض

المهمة اتعملت، وبعد تسجيل الدخول الأداة مقامتش. [[Get-ScheduledTaskInfo]] بيقول [[LastTaskResult]] مش صفر، وفي Task Scheduler خانة Program فيها حاجة غريبة: [[C:\Program]] بس، أو مسار أوله [[\"]].

السبب في السطر اللي عمل المهمة، مش في الأداة. فالسؤال: **[[schtasks]] استلم إيه بالظبط؟**

---

## ١. البرنامج اللي بيقولك استلم إيه

~~~powershell
Set-Content argv.js 'console.log(JSON.stringify(process.argv.slice(2)))'
~~~

[[node]] على ويندوز بيقسم سطر الأوامر بنفس قواعد مكتبة C في ويندوز ([[CommandLineToArgvW]])، وهي نفس القواعد اللي [[schtasks]] بيستخدمها. فاللي يطبعه [[argv.js]] هو اللي [[schtasks]] كان هيشوفه. ولو مفيش [[node]]: أي برنامج بيطبع [[argv]] (Python: [[python -c "import sys; print(sys.argv[1:])"]]).

---

## ٢. نفس السطر في ٣ shells

~~~text سطر الوثائق (أسلوب CMD) ملزوق في PowerShell 7.6 أو 5.1
node argv.js /Create /TN LabTask /TR "\"C:\Program Files\Lab\app.exe\" --autostart" /SC ONLOGON
["/Create","/TN","LabTask","/TR","\\","C:\\Program","Files\\Lab\\app.exe\\ --autostart","/SC","ONLOGON"]
~~~

اقرا الـ JSON: كل عنصر argument، و [[\"]] = تنصيص حقيقي جوه القيمة، و [[\\]] = backslash واحد. القيمة اللي المفروض توصل: [[\"C:\\Program Files\\Lab\\app.exe\" --autostart]]، يعني [["C:\Program Files\Lab\app.exe" --autostart]] كـ **عنصر واحد**. اللي وصل ٣ عناصر: [[\]] لوحده، و [[C:\Program]]، و [[Files\Lab\app.exe\ --autostart]]. السبب: في PowerShell الـ escape هو الـ backtick مش [[\]]، فـ [["\"]] نص كامل فيه backslash واحد، وبعده [[C:\Program]] كلمة لوحدها.

~~~text PowerShell 7.6 ($PSNativeCommandArgumentPassing = Windows)
node argv.js /TR '"C:\Program Files\Lab\app.exe" --autostart'
["/TR","\"C:\\Program Files\\Lab\\app.exe\" --autostart"]

node argv.js /TR '\"C:\Program Files\Lab\app.exe\" --autostart'
["/TR","\\\"C:\\Program Files\\Lab\\app.exe\\\" --autostart"]
~~~

في 7: القيمة جوه [['...']] زي ما هي = صح. ولو حطيت [[\"]] جوه (زي 5.1) بيوصلوا حرفيًا، والمهمة هتدوّر على برنامج مساره بيبدأ بـ [[\"]].

~~~text Windows PowerShell 5.1
node argv.js /TR '"C:\Program Files\Lab\app.exe" --autostart'
["/TR","C:\\Program","Files\\Lab\\app.exe --autostart"]

node argv.js /TR '\"C:\Program Files\Lab\app.exe\" --autostart'
["/TR","\"C:\\Program Files\\Lab\\app.exe\" --autostart"]
~~~

في 5.1 العكس بالظبط: الشكل اللي اشتغل في 7 **اتقسم** لـ argumentين، والشكل بـ [[\"]] هو الصح. و [[schtasks]] على argument زيادة بيرد كده ([[schtasks]] حقيقي، قراية بس):

~~~text schtasks /Query /TN LabTask Files\Lab\app.exe
ERROR: Invalid argument/option - 'Files\Lab\app.exe'.
Type "SCHTASKS /QUERY /?" for usage.
~~~

~~~text CMD
node argv.js /Create /TN LabTask /TR "\"C:\Program Files\Lab\app.exe\" --autostart" /SC ONLOGON
["/Create","/TN","LabTask","/TR","\"C:\\Program Files\\Lab\\app.exe\" --autostart","/SC","ONLOGON"]
~~~

| الـ shell | تكتب [[/TR]] إزاي |
|---|---|
| CMD | [["\"C:\Program Files\Lab\app.exe\" --autostart"]] (شكل الوثائق) |
| PowerShell 7.3+ | [['"C:\Program Files\Lab\app.exe" --autostart']] |
| Windows PowerShell 5.1 | [['\"C:\Program Files\Lab\app.exe\" --autostart']] |

الفرق بين 7 و 5.1 جاي من [[$PSNativeCommandArgumentPassing]]: من 7.3 PowerShell بيعمل الـ escaping صح لوحده (فتكتب القيمة زي ما هي)، و 5.1 بيبعت التنصيص الداخلي من غير escaping فيضيع. ولو حطيت [[$PSNativeCommandArgumentPassing = 'Legacy']] في 7، بيرجع يتصرف زي 5.1 (اتجرّب: الشكل بـ [[\"]] اشتغل).

---

## ٣. من غير ما تفكر في التنصيص خالص

### [[ProcessStartInfo.ArgumentList]] (PowerShell 7)

~~~powershell
$psi = [System.Diagnostics.ProcessStartInfo]::new('node')
foreach ($a in "$PWD\argv.js", '/Create', '/TN', 'LabTask', '/TR', '"C:\Program Files\Lab\app.exe" --autostart', '/SC', 'ONLOGON') { $psi.ArgumentList.Add($a) }
$psi.UseShellExecute = $false; $psi.RedirectStandardOutput = $true
$p = [System.Diagnostics.Process]::Start($psi); $p.StandardOutput.ReadToEnd(); $p.WaitForExit()
~~~

~~~text الناتج
["/Create","/TN","LabTask","/TR","\"C:\\Program Files\\Lab\\app.exe\" --autostart","/SC","ONLOGON"]
~~~

كل عنصر في [[ArgumentList]] بيوصل argument واحد زي ما هو، و .NET بيعمل التنصيص. ده اللي تستخدمه من C# أو من أي أداة بتعمل المهمة (ابدّل [['node']] بـ [['schtasks']]).

### [[New-ScheduledTaskAction]] (الأحسن في PowerShell)

~~~powershell
$action  = New-ScheduledTaskAction -Execute 'C:\Program Files\Lab\app.exe' -Argument '--autostart'
$trigger = New-ScheduledTaskTrigger -AtLogOn
$trigger.Delay = 'PT20S'
Register-ScheduledTask -TaskName LabTask -Action $action -Trigger $trigger -RunLevel Highest
~~~

البرنامج في [[-Execute]] والـ arguments في [[-Argument]]: خانتين، ومفيش تنصيص تعمله خالص. و [[PT20S]] = ٢٠ ثانية (صيغة ISO 8601، وهي نفس [[/DELAY 0000:20]]). ده من وثائق Microsoft ومتشغّلش هنا (بيعمل مهمة)، والتفاصيل في درس «Register-ScheduledTask» في نفس التاب.

---

## ٤. اتأكد: اقرا المهمة زي ما ويندوز خزّنها

على مهمة موجودة في ويندوز (قراية بس):

~~~powershell
$x = [xml](schtasks /Query /TN '\Microsoft\Windows\Defrag\ScheduledDefrag' /XML | Out-String)
$x.Task.Actions.Exec | Select-Object Command, Arguments
$x.Task.Principals.Principal | Select-Object UserId, RunLevel
~~~

~~~text الناتج
Command   : %windir%\system32\defrag.exe
Arguments : -c -h -o -$

UserId   : S-1-5-18
RunLevel : HighestAvailable
~~~

| الحتة | معناها |
|---|---|
| [[/XML]] | التعريف الكامل للمهمة زي ما متخزّن |
| [[Out-String]] | [[schtasks]] بيرجّع array سطور، و [[[xml]]] محتاج نص واحد |
| [[Exec.Command]] | البرنامج. لو [[/TR]] كان غلط هتلاقي هنا [[C:\Program]] أو [[\"C:\...]] |
| [[RunLevel]] [[HighestAvailable]] | ده اللي [[/RL HIGHEST]] بيعمله |
| [[S-1-5-18]] | حساب [[SYSTEM]] |

وبعد ما تعمل [[LabTask]] بتاعتك (على جهاز تجارب)، نفس الأمرين بـ [[/TN LabTask]] لازم يطلّعوا [[Command : C:\Program Files\Lab\app.exe]] و [[Arguments : --autostart]]. ونفس الحكاية بـ [[(Get-ScheduledTask -TaskName LabTask).Actions | Select-Object Execute, Arguments]].

~~~powershell
Get-ScheduledTask -TaskName ScheduledDefrag | Get-ScheduledTaskInfo | Select-Object TaskName, LastRunTime, LastTaskResult, NextRunTime
~~~

~~~text الناتج
TaskName       : ScheduledDefrag
LastRunTime    : 10/31/2026 11:28:30 PM
LastTaskResult : 0
NextRunTime    :
~~~

[[LastTaskResult]] [[0]] = نجحت. والأرقام التانية بتتقري بـ [['0x{0:X}' -f $n]]: مثلًا [[0x41303]] = «لسه ماشتغلتش» و [[0x41301]] = «شغّالة دلوقتي» (من وثائق Task Scheduler).

---

## ٥. الأمر الكامل (من الوثائق)

~~~text CMD (أدمن، على جهاز تجارب)
schtasks /Create /TN LabTask /TR "\"C:\Program Files\Lab\app.exe\" --autostart" /SC ONLOGON /RL HIGHEST /DELAY 0000:20 /F
~~~

| الـ switch | بيعمل إيه |
|---|---|
| [[/TN LabTask]] | اسم المهمة |
| [[/TR "..."]] | البرنامج والـ arguments في نص واحد. [[schtasks]] بيقسمه: لو أوله تنصيص، البرنامج لحد التنصيص اللي بيقفل، وإلا لحد أول مسافة |
| [[/SC ONLOGON]] | تشتغل مع تسجيل دخول أي يوزر |
| [[/RL HIGHEST]] | بأعلى صلاحية متاحة (أدمن من غير نافذة UAC) |
| [[/DELAY 0000:20]] | استنى ٢٠ ثانية بعد الدخول ([[mmmm:ss]]) |
| [[/F]] | لو فيه مهمة بنفس الاسم، اكتب فوقها من غير سؤال |

ولو مش عايز تجرّب على مهمة حقيقية خالص: اعمل مهمة بـ [[/RL LIMITED]] واسم تجربة، واقراها بـ [[/XML]]، وامسحها بـ [[schtasks /Delete /TN LabTaskTest /F]]. ده بيغيّر حاجة في الجهاز، فاعمله على جهاز تجارب.

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تحط البرنامج في فولدر من غير مسافة | [[Program Files]] هو المكان الصح للبرامج (محمي من الكتابة لليوزر العادي) |
| اختصار في Startup folder | مش بيشتغل أدمن، ومفيش delay |
| [[cmd /c "..."]] جوه [[/TR]] | طبقة تنصيص تالتة، ونافذة سودا بتظهر |
| تجرّب [[/Create]] على جهازك وتشوف | بتعمل مهمة أدمن حقيقية. [[argv.js]] بيوريك نفس الحاجة من غير أي أثر |

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| [[/TR]] وصل إزاي؟ | نفس الـ arguments لـ [[node argv.js]] |
| من غير تنصيص يدوي | [[New-ScheduledTaskAction -Execute -Argument]] أو [[ArgumentList.Add()]] |
| المهمة متخزّنة إزاي؟ | [[[xml](schtasks /Query /TN x /XML | Out-String)]] و [[Actions.Exec]] |
| اشتغلت؟ | [[Get-ScheduledTaskInfo]] و [[LastRunTime]] و [[LastTaskResult]] |`,
          deep: {
            why: R`مهمة بمسار غلط مبتطلعش خطأ وقت ما تعملها. [[schtasks /Create]] بيقول [[SUCCESS]]، والغلطة بتبان بعد تسجيل الدخول الجاي، والبرنامج مقامش، ومفيش حد قدامه نافذة. عشان كده التأكد من اللي اتخزّن لازم يبقى جزء من التسطيب.`,
            how: R`ويندوز مفيهوش «argv» زي لينكس: كل برنامج بياخد سطر أوامر واحد كنص، وبيقسمه بنفسه. أغلب البرامج بتستخدم قواعد مكتبة C: المسافة بتفصل، و [["..."]] بيجمّع، و [[\"]] تنصيص حرفي. PowerShell لازم «يبني» النص ده من الـ arguments اللي كتبتها، وطريقة البناء اتغيّرت في 7.3 (الـ setting [[$PSNativeCommandArgumentPassing]]: [[Legacy]] زي 5.1، و [[Standard]]، و [[Windows]] الافتراضي على ويندوز وبيعمل استثناءات لـ [[cmd.exe]] وملفات [[.bat]]). و [[schtasks /TR]] بعدها بيقسم القيمة لـ [[Command]] و [[Arguments]] ويخزّنهم في XML تحت [[C:\Windows\System32\Tasks]].`,
            when: R`أي installer أو سكربت بيعمل مهمة بمسار في [[Program Files]]، أو بيبعت مسار فيه مسافة لأي برنامج خارجي ([[msiexec]]، و [[robocopy]]، و [[reg]]، و [[sc.exe]]) من PowerShell. ونفس فكرة [[argv.js]] تنفع لأي «البرنامج استلم إيه؟».`,
            mistakes: R`تنسخ سطر CMD من الوثائق وتلزقه في PowerShell 7 كما هو. وتكتب سطر يشتغل في 7 وتشغّله في 5.1 (أو العكس). وتصدّق [[SUCCESS]] من غير ما تقرا [[Exec.Command]]. وتنسى [[Out-String]] قبل [[[xml]]]. وتنسى [[/F]] فالتسطيب التاني يسأل ويعلق. وتعمل مهمة [[/RL HIGHEST]] على جهازك عشان «تجرّب» التنصيص.`
          },
          sol: R`سطر CMD ملزوق في PowerShell 7.6 و 5.1: القيمة اتقسمت لـ [["\\"]] و [["C:\\Program"]] و [["Files\\Lab\\app.exe\\ --autostart"]]. وفي 7 الشكل بـ [['"..."']] وصّل [[\"C:\\Program Files\\Lab\\app.exe\" --autostart]] (صح)، والشكل بـ [['\"...\"']] وصّل backslashes زيادة. وفي 5.1 العكس: [['"..."']] اتقسم لـ [[C:\\Program]] و [[Files\\Lab\\app.exe --autostart]]، و [['\"...\"']] وصل صح. وفي CMD شكل الوثائق صح. و [[ArgumentList]] صح. و [[schtasks /Query]] بـ argument زيادة: [[ERROR: Invalid argument/option - 'Files\Lab\app.exe'.]]

ومهمة [[ScheduledDefrag]] (قراية بس): [[Command : %windir%\system32\defrag.exe]] و [[Arguments : -c -h -o -$]] و [[RunLevel : HighestAvailable]] و [[LastTaskResult : 0]].

اتجرّب على ويندوز 11 في PowerShell 7.6 و 5.1 و CMD بـ node. [[schtasks /Create]] و [[Register-ScheduledTask]] و [[/RL]] و [[/DELAY]] وأكواد [[LastTaskResult]] من وثائق Microsoft، ومفيش مهمة اتعملت على الجهاز.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: اكتب قيمة [[/TR]] لـ [[C:\Program Files\Lab\app.exe --autostart]] في CMD وفي PowerShell 7 وفي 5.1.`, done: R`كتبت الـ ٣ أشكال اللي في جدول الدرس، وجرّبتهم بـ [[argv.js]] والتلاتة طلّعوا [[\"C:\\Program Files\\Lab\\app.exe\" --autostart]].` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: لو [[/TR]] وصل [[C:\Program Files\Lab\app.exe --autostart]] (من غير تنصيص)، [[Exec.Command]] و [[Exec.Arguments]] هيبقوا إيه؟ ولو وصل [[\"C:\Program Files\Lab\app.exe\" --autostart]]؟`, done: R`الأولى: [[Command]] = [[C:\Program]] و [[Arguments]] = [[Files\Lab\app.exe --autostart]]. التانية: [[Command]] بيبدأ بـ backslash. وكتبت إن الاتنين المهمة مش هتلاقي البرنامج.` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية: لف على كل مهام جهازك بـ [[Get-ScheduledTask]] (قراية بس)، واطبع اللي [[Execute]] بتاعها فيه مسافة ومش أوله تنصيص.`, done: R`الأمر بيخلص من غير أدمن، وبيطبع جدول [[TaskPath]] و [[TaskName]] و [[Execute]] (ممكن يطلع فاضي، وده كويس)، وبيتجاهل المهام اللي مالهاش [[Execute]] (actions مش Exec).` },
            { lvl: 'تطبيق', t: R`ابني [[Show-Argv]]: function بتاخد أي arguments ([[$args]]) وتبعتهم لـ [[argv.js]] وتطبعهم سطر لكل واحد بين [[<>]]. استخدمها تجاوب: [[Show-Argv a "b c" 'd "e"' '']] بيوصل إيه في 7 وفي 5.1؟`, done: R`في 7: [[<a>]] و [[<b c>]] و [[<d "e">]] و [[<>]] (الفاضي بيوصل). وفي 5.1: الفاضي بيختفي والتنصيص الداخلي بيضيع. وكتبت الفرقين.` },
            { lvl: 'تحدي', t: R`على جهاز تجارب أو VM بس: اعمل [[LabTaskTest]] بـ [[schtasks /Create ... /RL LIMITED]] من PowerShell 7 لـ [[C:\Program Files\Lab\app.exe --autostart]]، واقراها بـ [[/XML]]، وبعدين بـ [[New-ScheduledTaskAction]]، وقارن الـ XML، وامسح الاتنين.`, done: R`الـ XML في الاتنين فيه [[Command]] = [[C:\Program Files\Lab\app.exe]] و [[Arguments]] = [[--autostart]]، و [[schtasks /Query /TN LabTaskTest]] بعد المسح بيقول [[ERROR: The system cannot find the file specified.]]` },
            { lvl: 'تحدي', t: R`دوّر بنفسك: من [[Get-Help about_Parsing]] (قسم Passing arguments that contain quote characters) ومن [[Get-Help about_Preference_Variables]]، اكتب القيم التلاتة لـ [[$PSNativeCommandArgumentPassing]] والفرق، وجرّب [[Legacy]] على [[argv.js]].`, done: R`كتبت [[Legacy]] و [[Standard]] و [[Windows]]، وإن [[Windows]] الافتراضي على ويندوز، و [[Legacy]] في 7 طلّع نفس نتيجة 5.1 على [[argv.js]].` },
          ],
          ci: [
            { os: [R`windows`], sh: R`pwsh`, run: R`Set-Content argv.js 'console.log(JSON.stringify(process.argv.slice(2)))'
node argv.js /TR '"C:\Program Files\Lab\app.exe" --autostart'
node argv.js /TR "\"C:\Program Files\Lab\app.exe\" --autostart"
$psi = [System.Diagnostics.ProcessStartInfo]::new('node')
foreach ($a in "$PWD\argv.js", '/TR', '"C:\Program Files\Lab\app.exe" --autostart') { $psi.ArgumentList.Add($a) }
$psi.UseShellExecute = $false; $psi.RedirectStandardOutput = $true
$p = [System.Diagnostics.Process]::Start($psi); 'psi ' + $p.StandardOutput.ReadToEnd().Trim(); $p.WaitForExit()`, expect: [R`["/TR","\"C:\\Program Files\\Lab\\app.exe\" --autostart"]`, R`["/TR","\\","C:\\Program","Files\\Lab\\app.exe\\ --autostart"]`, R`psi ["/TR","\"C:\\Program Files\\Lab\\app.exe\" --autostart"]`] },
            { os: [R`windows`], sh: R`powershell`, run: R`Set-Content argv.js 'console.log(JSON.stringify(process.argv.slice(2)))'
node argv.js /TR '"C:\Program Files\Lab\app.exe" --autostart'
node argv.js /TR '\"C:\Program Files\Lab\app.exe\" --autostart'`, expect: [R`["/TR","C:\\Program","Files\\Lab\\app.exe --autostart"]`, R`["/TR","\"C:\\Program Files\\Lab\\app.exe\" --autostart"]`] },
          ],
        },
        {
          cmd: "UI Automation",
          title: "دوس على زرار واقرا حالة نافذة من PowerShell (UI Automation)",
          learn: R`تلاقي نافذة برنامج برقم العملية، وتعدّ الكنترولات اللي فيها، وتدوس زرار ([[InvokePattern]]) وتقلب checkbox ([[TogglePattern]]) وتقرا نص ([[ValuePattern]])، وتعرف النافذة minimized ولا لأ، وتقفلها بلطف.`,
          out: R`[[ControlType.Button     Connect]] في القايمة، و [[toggle after: On]]، و [[status: connected]]، و [[state: Minimized]].`,
          desc: R`أداة الـ VPN ليها نافذة (زرار Connect، و checkbox «Share on LAN»، وخانة حالة). عايز تختبرها من سكربت: تدوس Connect وتستنى الحالة تبقى [[connected]]، من غير ما تحرّك الماوس. ده UI Automation: API في ويندوز بيشوف أي نافذة كشجرة عناصر (نافذة ← زراير ← نصوص)، ولكل عنصر «patterns» بتقول تقدر تعمل فيه إيه: [[Invoke]] (دوس)، و [[Toggle]] (اقلب)، و [[Value]] (اقرا/اكتب نص)، و [[Window]] (صغّر/كبّر/حالة).

اتجرّب على نافذة WinForms صغيرة اتعملت للدرس، مش على برنامج حد. وأولوية الدرس قليلة: مهم لو بتعمل برنامج ويندوز وعايز تختبره، أو بتشخّص «النافذة اختفت».`,
          example: R`# Windows (PowerShell):
$f = Start-Process pwsh -ArgumentList '-NoProfile','-File',"$PWD\form.ps1" -PassThru; Start-Sleep 4
Add-Type -AssemblyName UIAutomationClient, UIAutomationTypes
$A = [System.Windows.Automation.AutomationElement]
$win = $A::RootElement.FindFirst('Children', (New-Object System.Windows.Automation.PropertyCondition($A::ProcessIdProperty, $f.Id)))
$win.FindAll('Descendants', [System.Windows.Automation.Condition]::TrueCondition) | ForEach-Object { '{0,-22} {1}' -f $_.Current.ControlType.ProgrammaticName, $_.Current.Name }
$btn = $win.FindFirst('Descendants', (New-Object System.Windows.Automation.PropertyCondition($A::NameProperty, 'Connect')))
$btn.GetCurrentPattern([System.Windows.Automation.InvokePattern]::Pattern).Invoke()
$win.GetCurrentPattern([System.Windows.Automation.WindowPattern]::Pattern).Current.WindowVisualState
(Get-Process -Id $f.Id).CloseMainWindow()`,
          lines: [
            R`شغّل النافذة التجريبية ([[form.ps1]] من الشرح) في عملية لوحدها، و [[-PassThru]] يرجّع object فيه [[Id]]، واستنى تظهر.`,
            R`حمّل مكتبات UI Automation (جزء من .NET على ويندوز، موجودة في 5.1 و 7).`,
            R`اختصار لاسم النوع الطويل عشان السطور اللي جاية تبقى أقصر.`,
            R`من جذر الشجرة (سطح المكتب)، دوّر في الأبناء المباشرين ([[Children]]) على أول نافذة [[ProcessId]] بتاعها رقم عمليتنا.`,
            R`كل العناصر تحت النافذة ([[Descendants]]، و [[TrueCondition]] = من غير فلتر)، واطبع نوع كل واحد واسمه في عمودين.`,
            R`دوّر على العنصر اللي اسمه [[Connect]] (الاسم = النص اللي على الزرار).`,
            R`هات منه [[InvokePattern]] ودوس: البرنامج بيحس إن الزرار اتداس عليه بالظبط زي الماوس.`,
            R`حالة النافذة: [[Normal]] أو [[Minimized]] أو [[Maximized]].`,
            R`اقفل بلطف: [[CloseMainWindow()]] بيبعت رسالة «اقفل» للنافذة (زي الـ X)، فالبرنامج يلحق ينضّف. عكس [[Stop-Process]] اللي بيقتل.`,
          ],
          try: R`احفظ [[form.ps1]] من الشرح، وشغّله بـ [[pwsh]]، وشغّل الأوامر. وبعدين شغّله بـ [[powershell]] (5.1) وكرّر سطر [[FindAll]]: الأنواع طلعت إيه؟ وفي الآخر صغّر النافذة بـ [[SetWindowVisualState]] واقرا [[BoundingRectangle]].`,
          teach: R`## ليه؟

في الحالة الحقيقية كان فيه سؤالين: «الزرار ده بيعمل اللي المفروض؟» من غير ما حد يقعد يدوس، و «النافذة راحت فين؟» (طلعت minimized بحجم صغير جدًا، مش مقفولة). الاتنين بيتجاوبوا من PowerShell بـ UI Automation.

---

## ١. النافذة التجريبية

~~~powershell form.ps1
Add-Type -AssemblyName System.Windows.Forms
$f = New-Object System.Windows.Forms.Form
$f.Text = 'VPN Lab'; $f.Width = 320; $f.Height = 180
$b = New-Object System.Windows.Forms.Button
$b.Text = 'Connect'; $b.Top = 10; $b.Left = 10
$b.Add_Click({ $s.Text = 'connected'; Add-Content (Join-Path $PSScriptRoot 'clicks.log') 'clicked' })
$c = New-Object System.Windows.Forms.CheckBox
$c.Text = 'Share on LAN'; $c.Top = 45; $c.Left = 10; $c.Width = 150
$s = New-Object System.Windows.Forms.TextBox
$s.Name = 'status'; $s.Text = 'idle'; $s.Top = 80; $s.Left = 10
$f.Controls.AddRange(@($b, $c, $s))
[void]$f.ShowDialog()
~~~

زرار لما يتداس بيكتب [[connected]] في خانة الحالة وسطر في [[clicks.log]] (عشان نتأكد إن الدوسة حقيقية)، و checkbox، وخانة نص.

---

## ٢. لاقي النافذة واعرض الشجرة

~~~powershell
$f = Start-Process pwsh -ArgumentList '-NoProfile','-File',"$PWD\form.ps1" -PassThru; Start-Sleep 4
Add-Type -AssemblyName UIAutomationClient, UIAutomationTypes
$A = [System.Windows.Automation.AutomationElement]
$win = $A::RootElement.FindFirst('Children', (New-Object System.Windows.Automation.PropertyCondition($A::ProcessIdProperty, $f.Id)))
$win.FindAll('Descendants', [System.Windows.Automation.Condition]::TrueCondition) | ForEach-Object { '{0,-22} {1}' -f $_.Current.ControlType.ProgrammaticName, $_.Current.Name }
~~~

~~~text الناتج (النافذة شغّالة في PowerShell 7.6)
ControlType.Button     Connect
ControlType.CheckBox   Share on LAN
ControlType.Edit
~~~

| الحتة | معناها |
|---|---|
| [[RootElement]] | سطح المكتب: جذر كل النوافذ |
| [[FindFirst('Children', cond)]] | أول عنصر من الأبناء المباشرين بيطابق الشرط. [[Descendants]] = كل اللي تحت مهما كان عمقه (أبطأ) |
| [[PropertyCondition(ProcessIdProperty, id)]] | شرط: رقم العملية. أضمن من اسم النافذة (ممكن يتكرر أو يتغيّر) |
| [[ControlType]] | النوع: [[Button]] و [[CheckBox]] و [[Edit]] و [[Window]] و [[Pane]]... |
| [[Name]] | النص الظاهر (أو اسم الـ accessibility). خانة النص اسمها فاضي، فبندوّر عليها بالنوع |

### فخ: نفس النافذة في 5.1

لما نفس [[form.ps1]] اتشغّل بـ [[powershell]] (5.1، يعني WinForms على .NET Framework):

~~~text الناتج
ControlType.Pane       Connect
ControlType.Pane       Share on LAN
ControlType.Pane       idle
Exception calling "GetCurrentPattern" with "1" argument(s): "Unsupported Pattern."
~~~

كل حاجة [[Pane]] ومفيش [[InvokePattern]]. نفس الكود في 7 (WinForms على .NET الحديث) طلّع الأنواع الصح والـ patterns شغّالة. يعني: **البرنامج نفسه** هو اللي بيقرر قد إيه يبان لـ UI Automation، مش السكربت. لو أداتك WinForms، ابنيها على .NET الحديث أو ظبّط الـ accessibility بتاعة الكنترولات.

---

## ٣. دوس، واقلب، واقرا

~~~powershell
$btn = $win.FindFirst('Descendants', (New-Object System.Windows.Automation.PropertyCondition($A::NameProperty, 'Connect')))
$btn.GetCurrentPattern([System.Windows.Automation.InvokePattern]::Pattern).Invoke()
$chk = $win.FindFirst('Descendants', (New-Object System.Windows.Automation.PropertyCondition($A::NameProperty, 'Share on LAN')))
$tog = $chk.GetCurrentPattern([System.Windows.Automation.TogglePattern]::Pattern)
"toggle before: $($tog.Current.ToggleState)"; $tog.Toggle(); "toggle after: $($tog.Current.ToggleState)"
$edit = $win.FindFirst('Descendants', (New-Object System.Windows.Automation.PropertyCondition($A::ControlTypeProperty, [System.Windows.Automation.ControlType]::Edit)))
"status: $($edit.GetCurrentPattern([System.Windows.Automation.ValuePattern]::Pattern).Current.Value)"
~~~

~~~text الناتج
toggle before: Off
toggle after: On
status: connected
~~~

و [[clicks.log]] فيه [[clicked]]: الدوسة وصلت للكود بتاع الزرار.

| الـ pattern | بيعمل إيه | على إيه |
|---|---|---|
| [[InvokePattern]] و [[.Invoke()]] | دوسة | زراير، ولينكات، وعناصر قايمة |
| [[TogglePattern]] و [[.Toggle()]] و [[ToggleState]] | قلب و [[On]]/[[Off]]/[[Indeterminate]] | checkbox وأزرار تشغيل/إيقاف |
| [[ValuePattern]] و [[.Current.Value]] و [[.SetValue()]] | قراية وكتابة نص | خانات النص |
| [[WindowPattern]] | حالة النافذة وقفلها | النافذة نفسها |

---

## ٤. النافذة «اختفت»: minimized ولا مقفولة؟

~~~powershell
$wp = $win.GetCurrentPattern([System.Windows.Automation.WindowPattern]::Pattern)
"state: $($wp.Current.WindowVisualState)  rect: $($win.Current.BoundingRectangle.Width)x$($win.Current.BoundingRectangle.Height)"
$wp.SetWindowVisualState([System.Windows.Automation.WindowVisualState]::Minimized); Start-Sleep -Milliseconds 400
"state: $($wp.Current.WindowVisualState)  rect: $($win.Current.BoundingRectangle.Width)x$($win.Current.BoundingRectangle.Height)"
~~~

~~~text الناتج
state: Normal  rect: 400x225
state: Minimized  rect: 249x43
~~~

نافذة minimized بتفضل موجودة في الشجرة، بس حجمها بيبقى صغير جدًا (هنا 249×43، وفي الحالة الحقيقية 199×34). فلو لقيت نافذة البرنامج بالحجم ده: مش مقفولة ولا واقعة، متصغّرة. ([[400x225]] بدل 320×180 لأن الإحداثيات بالـ pixels الحقيقية والشاشة عليها تكبير ١٢٥٪.)

---

## ٥. اقفل بلطف

~~~powershell
(Get-Process -Id $f.Id).CloseMainWindow()
~~~

~~~text الناتج
True
~~~

[[True]] = الرسالة اتبعتت. وبعد ثانية [[HasExited]] بقى [[True]]. [[CloseMainWindow()]] زي الضغط على X: البرنامج بيلحق يحفظ وينضّف (ويقدر يرفض، زي «تحفظ التغييرات؟»). [[Stop-Process]] بيقتل على طول، والتنظيف مش بيحصل (وده اللي سبّب قضية «جلسة ماتت وسابت وراها» في تاب التشخيص).

---

## الخلاصة

| عايز | الأمر |
|---|---|
| نافذة برقم عملية | [[RootElement.FindFirst('Children', PropertyCondition(ProcessIdProperty, id))]] |
| كل الكنترولات | [[FindAll('Descendants', TrueCondition)]] |
| دوس | [[InvokePattern]] و [[.Invoke()]] |
| اقلب | [[TogglePattern]] و [[.Toggle()]] |
| اقرا نص | [[ValuePattern]] و [[.Current.Value]] |
| minimized؟ | [[WindowPattern]] و [[WindowVisualState]] |
| اقفل بلطف | [[CloseMainWindow()]] |`,
          deep: {
            why: R`اختبار الواجهة بالإيد بيتنسى ومبيتكررش بنفس الشكل. وسكربت بيدوس ويقرا بيتشغّل بعد كل build. وبرامج قراية الشاشة (لذوي الإعاقة البصرية) بتستخدم نفس الـ API، فلو السكربت شايف زرارك، هي كمان شايفاه.`,
            how: R`كل برنامج بيعرض شجرة UI Automation عن طريق «provider»: WPF و WinForms الحديث و UWP عندهم providers جوّاهم، والبرامج القديمة بيتعملها provider من بره (MSAA proxy) بيشوف كل حاجة كـ [[Pane]] لو مفيش معلومات كفاية. والسكربت (client) بيكلّم البرنامج عن طريق COM بين العمليتين. و [[Invoke()]] بيوصل للبرنامج كأنه حدث دوسة. وفيه حماية اسمها UIPI: عملية عادية متقدرش تبعت أوامر لنافذة عملية أدمن.`,
            when: R`اختبار برنامج ويندوز انت عامله، وأتمتة برنامج داخلي ملوش API، وتشخيص «النافذة راحت فين» أو «الزرار ده متقفل ليه» ([[IsEnabled]]). ومش لبرامج حد تاني بتتخطّى بيه شروطها.`,
            mistakes: R`تدوّر بالاسم والاسم بيتغيّر مع اللغة (دوّر بـ [[AutomationId]] لو البرنامج بيحدده). وتستخدم [[Descendants]] من [[RootElement]] فيلف على كل النوافذ ويبطّأ جدًا. ومتستناش النافذة تظهر ([[Start-Sleep]] أو لفّة). وتحاول تتحكم في نافذة أدمن من نافذة عادية (UIPI بيمنع). وتقفل بـ [[Stop-Process]] والبرنامج كان محتاج ينضّف.`
          },
          sol: R`النافذة في [[pwsh]] (.NET الحديث): [[ControlType.Button     Connect]] و [[ControlType.CheckBox   Share on LAN]] و [[ControlType.Edit]]، و [[toggle before: Off]] و [[toggle after: On]] و [[status: connected]] و [[clicks.log]] فيه [[clicked]]، و [[state: Normal  rect: 400x225]] وبعد التصغير [[state: Minimized  rect: 249x43]]، و [[CloseMainWindow()]] رجّع [[True]] والعملية خرجت. ونفس النافذة في 5.1: كل العناصر [[ControlType.Pane]] و [[GetCurrentPattern]] رمى [[Unsupported Pattern.]] (حتى مع [[EnableVisualStyles()]]).

اتجرّب على ويندوز 11 (تكبير الشاشة ١٢٥٪) والسكربت من 5.1 و 7.6، على نافذة اتعملت للدرس.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: لكل واحد من دول، أنهي pattern؟ تدوس زرار، تعلّم checkbox، تقرا نص خانة، تعرف النافذة متصغّرة.`, done: R`[[InvokePattern]] و [[TogglePattern]] و [[ValuePattern]] و [[WindowPattern]]، وكتبت الـ method أو الـ property لكل واحد.` },
            { lvl: 'تطبيق', t: R`زوّد على [[form.ps1]] زرار [[Disconnect]] بيكتب [[idle]]، واكتب سكربت بيدوس Connect ويتأكد إن الحالة [[connected]]، ويدوس Disconnect ويتأكد إنها [[idle]]، ويطبع [[PASS]] أو [[FAIL]].`, done: R`السكربت بيطبع [[PASS]] مرتين، ولو غيّرت النص اللي الزرار بيكتبه بيطبع [[FAIL]] ومعاه القيمة اللي اتقرت فعلًا.` },
            { lvl: 'تطبيق', t: R`صلّح: السكربت ده بيقع أحيانًا بـ [[You cannot call a method on a null-valued expression]]: [[Start-Process pwsh -ArgumentList '-File','form.ps1'; $win = $A::RootElement.FindFirst('Children', $cond)]]. ليه أحيانًا؟ وصلّحه.`, done: R`السبب إن النافذة لسه مظهرتش وقت [[FindFirst]] فرجّع [[$null]]. الإصلاح لفّة بتحاول كل ٣٠٠ ملي ثانية لحد ٦ ثواني، ورسالة واضحة لو مظهرتش، والسكربت مبقاش بيقع في ١٠ تشغيلات ورا بعض.` },
            { lvl: 'تطبيق', t: R`قارن: شغّل [[form.ps1]] مرة بـ [[powershell]] ومرة بـ [[pwsh]]، واعمل جدول بـ [[ControlType]] لكل عنصر في الحالتين، و [[ClassName]] كمان ([[$_.Current.ClassName]]).`, done: R`الجدول بيوري [[Pane]] في 5.1 والأنواع الصح في 7، و [[ClassName]] في 5.1 شكله [[WindowsForms10.BUTTON...]]، وكتبت جملة: الفرق من البرنامج مش من السكربت.` },
            { lvl: 'تحدي', t: R`ابني [[Find-MinimizedWindows]]: بيلف على النوافذ اللي على سطح المكتب ([[Children]] بس) ويطبع اللي حالتها [[Minimized]] برقم العملية واسمها وحجمها.`, done: R`لما تصغّر النافذة التجريبية بتظهر في القايمة بحجم صغير زي [[249x43]]، ولما ترجّعها تختفي منها، والأمر بيخلص في أقل من ثانيتين، ومبيقعش على نافذة مالهاش [[WindowPattern]].` },
          ],
          ci: [
            { os: [R`windows`], sh: R`powershell`, run: R`Add-Type -AssemblyName UIAutomationClient, UIAutomationTypes
[System.Windows.Automation.ControlType]::Button.ProgrammaticName
[System.Windows.Automation.InvokePattern]::Pattern.ProgrammaticName
[System.Windows.Automation.WindowVisualState]::Minimized`, expect: [R`ControlType.Button`, R`InvokePatternIdentifiers.Pattern`, R`Minimized`] },
          ],
        },
      ],
    }
]);
