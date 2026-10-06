// تكملة تاب os: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/os/01.js (شرح حقول الدرس في أوله)
MORE("os", [
    {
      t: "ويندوز: أدوات الإدارة",
      l: 2,
      n: "الخدمات واللوجات والفايروول والأجهزة: أدوات المدير اللي هتحتاجها وانت بتطوّر",
      items: [
        {
          cmd: "services.msc",
          title: "شغّل أو وقّف خدمة زي Docker أو PostgreSQL",
          desc: R`[[services.msc]] بيعرض كل خدمات ويندوز: برامج بتشتغل في الخلفية من غير نافذة. Docker Desktop ليه خدمة، و PostgreSQL و MySQL و MongoDB لو سطبتهم بالـ installer بيبقوا خدمات.

Docker مش راضي يقوم؟ دوّر على «Docker Desktop Service» واعمل Restart. وبورت 5432 مشغول وانت عايز postgres في Docker؟ غالبًا خدمة postgres المتسطبة شغالة، وقّفها وخلّي الـ Startup type بتاعها Manual.`,
          example: R`Win+R → services.msc
Click any row → type "d"          jump to names starting with D
Docker Desktop Service → Restart
postgresql-x64-16 → Stop          frees port 5432 for Docker
Properties → Startup type → Manual   don't start with Windows
Startup type: Automatic / Manual / Disabled`,
          try: "افتح [[services.msc]] ورتّب بـ Status، وشوف إيه الخدمات الشغالة اللي انت سطبتها (Docker، أي قاعدة بيانات، أي VPN).",
          flag: "keys",
          deep: {
            why: "الخدمات هي «السيرفرات» اللي شغالة على جهازك من غير ما تشوفها. قاعدة بيانات بتقوم مع الجهاز وماسكة بورت، أو Docker واقف ومحتاج restart.",
            how: R`Automatic يعني تقوم مع الجهاز، Manual يعني تقوم لما برنامج يطلبها أو انت تشغّلها، Disabled مش هتقوم خالص. Start و Stop و Restart محتاجين أدمن، فلو الأزرار رمادي افتح [[services.msc]] بـ Ctrl+Shift+Enter.

نفس الحاجة من الترمنال: [[Get-Service]] و [[Restart-Service]] متشرحين في تاب PowerShell.`,
            when: "Docker أو قاعدة بيانات مش شغالين. بورت مشغول بخدمة. الجهاز بطيء بسبب خدمة بتقوم معاه ومش محتاجها.",
            mistakes: "تعمل Disabled لخدمات مش عارفها عشان «تسرّع الجهاز» (نصايح منتشرة على النت). ده بيبوّظ حاجات زي Windows Update والشبكة والبلوتوث. اقفل بس الخدمات اللي انت سطبتها وعارفها، وخلّيها Manual مش Disabled."
          },
          teach: R`## الفكرة: [[.msc]] = نافذة إدارة جاهزة

[[services.msc]] مش برنامج: ده ملف إعدادات لبرنامج اسمه **MMC** (Microsoft Management Console)، اللي كل أدوات الإدارة في ويندوز بتفتح جواه. اتأكدت من ده على جهاز الدرس:

~~~cmd
assoc .msc
ftype MSCFile
~~~

~~~text الناتج
.msc=MSCFile
MSCFile=%SystemRoot%\system32\mmc.exe "%1" %*
~~~

- [[assoc]] بيقولك الامتداد ده نوعه إيه: [[MSCFile]].
- [[ftype]] بيقولك النوع ده بيتفتح بإيه: [[mmc.exe]]، و [[%1]] مكانها اسم الملف.

ولو بصيت جوه [[services.msc]] نفسه هتلاقيه نص XML بيبدأ بـ [[<MMC_ConsoleFile ...>]]. يعني «افتح MMC بإعدادات الخدمات». وده نفس الكلام لـ [[eventvwr.msc]] و [[devmgmt.msc]] و [[wf.msc]].

---

## ١. افتحه ودوّر

~~~text
Win+R → services.msc
Click any row → type "d"          jump to names starting with D
~~~

الخدمة (service) برنامج بيشتغل في الخلفية من غير نافذة، وغالبًا بيقوم مع الجهاز. في اللستة اختار أي صف واكتب أول حرف، يقفز لأول خدمة اسمها بيبدأ بيه.

نفس اللستة من PowerShell (قراية بس):

~~~powershell
(Get-Service).Count
(Get-Service | Where-Object Status -eq Running).Count
~~~

~~~text الناتج على جهاز الدرس
308
151
~~~

يعني ٣٠٨ خدمة، نصهم تقريبًا شغالين دلوقتي. أغلبهم من ويندوز نفسه.

---

## ٢. Docker و PostgreSQL

~~~text
Docker Desktop Service → Restart
postgresql-x64-16 → Stop          frees port 5432 for Docker
~~~

~~~powershell
Get-Service *docker*, *postgres*, *mysql* | Format-Table Name, Status, StartType
(Get-Service com.docker.service).DisplayName
~~~

~~~text الناتج على جهاز الدرس
Name                Status StartType
----                ------ ---------
com.docker.service Stopped    Manual

Docker Desktop Service
~~~

- كل خدمة ليها **اسمين**: Name التقني ([[com.docker.service]]) اللي بتستخدمه في الأوامر، و DisplayName ([[Docker Desktop Service]]) اللي بتشوفه في [[services.msc]].
- [[*docker*]]: النجمة يعني «أي حاجة»، فبيدوّر على أي اسم فيه docker.
- مفيش postgres ولا mysql على الجهاز ده، فمطلعوش.
- [[postgresql-x64-16]]: ده الاسم اللي installer بتاع PostgreSQL 16 بيعمله. لما يكون شغال بيمسك بورت 5432، فـ postgres في Docker ميعرفش يمسكه. Stop بيفضّي البورت.

لاحظ إن Docker هنا **Stopped** و Docker Desktop شغال عادي. ده لأن Docker Desktop الحديث معظم شغله برا الخدمة دي.

---

## ٣. Startup type

~~~text
Properties → Startup type → Manual   don't start with Windows
Startup type: Automatic / Manual / Disabled
~~~

| النوع | يعني |
|---|---|
| Automatic | تقوم مع ويندوز |
| Manual | تقوم لما برنامج يطلبها أو انت تشغّلها |
| Disabled | ممنوعة تقوم خالص |

Properties بدبل كليك على الخدمة. و Start و Stop والتغيير ده محتاجين أدمن (افتح [[services.msc]] بـ Ctrl+Shift+Enter).

> التغييرات نفسها مش متجرّبة (بتغيّر الجهاز). [[Get-Service]] و [[assoc]] و [[ftype]] اتشغّلوا فعلًا.

---

## الخلاصة

- [[.msc]] = MMC بإعدادات جاهزة.
- Name للأوامر، DisplayName للعرض.
- بورت مشغول بقاعدة بيانات متسطبة؟ Stop + Manual.
- متعملش Disabled لحاجة مش عارفها.`,
          sol: R`دوس على عنوان عمود Status: مرة ترتّب والشغال (Running) ممكن ينزل تحت الفاضي، دوس تاني يطلع فوق. هتلاقي خدمات كتير من ويندوز، والمهم تدوّر على اللي انت سطبته: [[Docker Desktop Service]]، أو [[postgresql-x64-16]] (الرقم حسب النسخة)، أو [[MySQL80]]، أو خدمات VPN. عمود Startup Type يقولك هي بتقوم مع الجهاز (Automatic) ولا لأ.

لو مش لاقي Docker مع إنه شغال، ده طبيعي: Docker Desktop في النسخ الحديثة معظمه بيشتغل كبرنامج عادي والخدمة مش دايمًا موجودة. ولو Postgres مش في اللستة وشغال، غالبًا متسطب جوه WSL أو Docker مش على ويندوز.`
        },
        {
          cmd: "eventvwr.msc",
          title: "اعرف برنامج وقع ليه من غير رسالة",
          desc: R`البرنامج قفل لوحده ومفيش ولا رسالة؟ ويندوز غالبًا سجّل السبب. [[eventvwr.msc]] ← Windows Logs ← Application، وفلتر على Error: هتلاقي «Application Error» فيه اسم البرنامج والـ module اللي وقع فيه.

والأسهل للبداية: [[perfmon /rel]] بيفتح Reliability Monitor، خط زمني فيه كل برنامج وقع يوم بيوم، ودبل كليك يوريك التفاصيل.`,
          example: R`Win+R → perfmon /rel                      Reliability Monitor: crashes per day
Win+R → eventvwr.msc                      Event Viewer
Windows Logs → Application → Filter Current Log → Error
Event ID 1000 "Application Error"        which exe crashed + faulting module
Windows Logs → System                     drivers, disks, unexpected shutdowns`,
          try: "افتح [[perfmon /rel]] وشوف آخر أسبوع: فيه أي أيقونة X حمرا؟ دبل كليك عليها واقرا اسم البرنامج.",
          flag: "keys",
          deep: {
            why: "برنامج Electron أو desktop app عملته بيقع عند عميل ومفيش رسالة. أو الجهاز عمل restart لوحده ومش عارف ليه.",
            how: R`Event Viewer بيسجّل كل حاجة، فهيبان زحمة. الـ Filter بيخليك تشوف Error و Critical بس. كل event ليه Source (مين كتبه) و Event ID ورسالة.

Reliability Monitor بيقرا نفس اللوجات وبيعرضها بشكل أبسط: كل يوم عمود، وفيه علامات للبرامج اللي وقعت والتحديثات. «View technical details» بيوريك نفس معلومات Event Viewer.`,
            when: "برنامج بيقع. الجهاز بيعمل restart لوحده. عميل بيقول «التطبيق بيقفل فجأة»: اطلب منه صورة من [[perfmon /rel]].",
            mistakes: "تتخض من كمية الـ Warnings والـ Errors. جهاز سليم تمامًا فيه مئات منهم. دوّر على الوقت اللي المشكلة حصلت فيه بالظبط واسم برنامجك، مش على العدد."
          },
          teach: R`## الفكرة: ويندوز بيكتب يومية

كل حاجة مهمة بتحصل (برنامج وقع، درايفر فشل، الجهاز اتقفل غلط) بتتكتب في لوج اسمه **event log**. أداتين بيقروه: Reliability Monitor بشكل بسيط، و Event Viewer بالتفاصيل.

---

## ١. Reliability Monitor

~~~text
Win+R → perfmon /rel                      Reliability Monitor: crashes per day
~~~

| الحتة | معناها |
|---|---|
| [[perfmon]] | Performance Monitor (الملف وصفه «Resource and Performance Monitor») |
| [[/rel]] | افتح جزء الـ reliability (الاعتمادية) على طول |

بيعرض خط زمني يوم بيوم، وكل برنامج وقع عليه X حمرا في يومه.

---

## ٢. Event Viewer

~~~text
Win+R → eventvwr.msc                      Event Viewer
Windows Logs → Application → Filter Current Log → Error
~~~

- [[eventvwr]] = event viewer، وهو [[.msc]] يعني بيفتح في MMC.
- **Windows Logs ← Application**: لوج البرامج. فيه آلاف السطور.
- **Filter Current Log** في الجنب اليمين، وعلّم Error بس.

---

## ٣. Event ID 1000

~~~text
Event ID 1000 "Application Error"        which exe crashed + faulting module
~~~

كل نوع event ليه رقم. 1000 من مصدر «Application Error» = برنامج وقع. تقدر تجيب آخر واحد من PowerShell (قراية بس):

~~~powershell
Get-WinEvent -FilterHashtable @{LogName="Application"; Id=1000} -MaxEvents 1 | Format-List TimeCreated, Id, ProviderName, LevelDisplayName
~~~

| الحتة | معناها |
|---|---|
| [[Get-WinEvent]] | اقرا event logs |
| [[@{...}]] | hashtable: شروط في شكل اسم = قيمة |
| [[LogName="Application"; Id=1000]] | من لوج Application، والرقم 1000 بس |
| [[-MaxEvents 1]] | آخر واحد بس |

~~~text الناتج على جهاز الدرس
TimeCreated      : 10/6/2026 2:54:18 AM
Id               : 1000
ProviderName     : Application Error
LevelDisplayName : Error
~~~

وأول سطور الرسالة نفسها ([[.Message]]):

~~~text الناتج
Faulting application name: cmw_srv.exe, version: 12.17.0.12318, time stamp: 0xcf9bfab6
Faulting module name: KERNELBASE.dll, version: 10.0.26100.9549, time stamp: 0x4370855d
Exception code: 0xe0434352
~~~

| السطر | يقولك |
|---|---|
| Faulting application name | البرنامج اللي وقع ([[cmw_srv.exe]]) |
| Faulting module name | الـ DLL اللي كان شغال لحظة الوقوع |
| Exception code | نوع الخطأ. [[0xe0434352]] معروف إنه exception من برنامج .NET محدش مسكه |

[[KERNELBASE.dll]] كـ module بيظهر كتير، ومش معناه إن ويندوز بايظ: هو المكان اللي الـ exception اتبلّغ منه. الأهم اسم البرنامج و Exception code.

---

## ٤. لوج System

~~~text
Windows Logs → System                     drivers, disks, unexpected shutdowns
~~~

لوج النظام نفسه: درايفرات، ديسكات، والجهاز لو اتقفل من غير shutdown سليم.

---

## الخلاصة

- [[perfmon /rel]] للبداية: إيه وقع وإمتى.
- Event Viewer للتفاصيل: Application ← Error ← ID 1000.
- دوّر بالوقت واسم برنامجك، متتخضش من العدد.`,
          sol: R`[[perfmon /rel]] هيفتح Reliability Monitor: رسم بياني بخط فوق (Stability Index من ١ لـ ١٠) وتحته صفوف فيها أيقونات. X حمرا يعني Critical event، زي برنامج وقف فجأة أو ويندوز اتقفل غلط. دبل كليك عليها هيوريك التفاصيل: «Faulting Application Name» فيها اسم الـ exe (زي [[Code.exe]] أو [[node.exe]])، و «Faulting Module» يقولك أنهي DLL.

لو مفيش أي X في أسبوع، ده كويس، مش غلطة. ولو الرسم فاضي خالص، الخدمة ممكن تكون لسه بتجمع بيانات (بتحتاج كام ساعة بعد أول تشغيل). ولو فيه X متكررة لنفس البرنامج كل يوم، ده اللي تدوّر عليه باسم الـ module في جوجل.`
        },
        {
          cmd: "resmon",
          title: "اعرف مين ماسك الملف اللي مش راضي يتمسح",
          desc: R`«The action can't be completed because the file is open in another program»، أو [[EBUSY: resource busy or locked]] وانت بتمسح [[node_modules]]. [[resmon]] بيقولك مين: تاب CPU ← Associated Handles، واكتب اسم الملف أو الفولدر في خانة البحث.

هتلاقي العملية (غالبًا node.exe أو VS Code أو antivirus)، كليك يمين ← End Process. وتاب Network ← Listening Ports بيوريك كل بورت ومين ماسكه.`,
          example: R`Win+R → resmon                     Resource Monitor
CPU → Associated Handles → search "node_modules"
Right-click the process → End Process
Network → Listening Ports          port → process (like netstat -ano)
Memory                             who is using the RAM`,
          try: "افتح ملف في Notepad، وبعدين في [[resmon]] دوّر على اسم الملف في Associated Handles، وشوف notepad.exe ظاهر جنبه.",
          flag: "keys",
          deep: {
            why: "ويندوز مش بيسمح تمسح ملف برنامج تاني فاتحه، ومش بيقولك مين. ده بيحصل كتير مع node_modules و git و Docker.",
            how: R`كل برنامج بيفتح ملف بياخد عليه «handle». Associated Handles بيدوّر في كل الـ handles المفتوحة في الجهاز على النص اللي كتبته.

Listening Ports بيعرض نفس اللي [[netstat -ano]] بيعرضه (في تاب CMD) بس باسم البرنامج جاهز، ومعاه حالة الفايروول لكل بورت.

بديل أسهل: PowerToys فيه File Locksmith، كليك يمين على الملف ويقولك مين ماسكه (في المستوى التالت).`,
            when: "مش قادر تمسح node_modules أو dist. [[git checkout]] بيفشل عشان ملف مقفول. بورت مشغول.",
            mistakes: "تقفل العملية وتكمّل من غير ما تعرف ليه كانت ماسكة الملف. غالبًا dev server أو watcher لسه شغال في ترمنال تاني، اقفله من هناك الأول."
          },
          teach: R`## الفكرة: كل ملف مفتوح عليه «مسكة»

لما برنامج يفتح ملف، ويندوز بيديله **handle** (مسكة): رقم بيقول «البرنامج ده فاتح الملف ده». وطول ما المسكة موجودة، ويندوز ممكن يمنع حد تاني يمسح الملف. [[resmon]] (Resource Monitor) بيدوّر في كل المسكات ويقولك مين ماسك إيه.

---

## ١. شوف المشكلة بنفسك

في فولدر تجارب، فتحت ملف من PowerShell بطريقة بتمنع المشاركة، وحاولت أمسحه وهو مفتوح، وبعدين قفلته:

~~~powershell
$f = [IO.File]::Open("$s\My Project\package.json", 'Open', 'Read', 'None')
Remove-Item "$s\My Project\package.json"
$f.Close()
~~~

| الحتة | معناها |
|---|---|
| [[[IO.File]::Open]] | دالة .NET بتفتح ملف وترجّع المسكة |
| [[$s]] | متغير فيه مسار فولدر التجارب |
| [[Open]] | افتح ملف موجود |
| [[Read]] | للقراية |
| [[None]] | ممنوع أي حد تاني يفتحه أو يمسحه وانا فاتحه |
| [[$f.Close()]] | سيب المسكة |

~~~text الناتج من Remove-Item (pwsh 7)
The process cannot access the file '...\My Project\package.json' because it is being used by another process.
~~~

ودي نفس رسالة [[EBUSY]] في npm بلغة ويندوز.

---

## ٢. اعرف مين

~~~text
Win+R → resmon                     Resource Monitor
CPU → Associated Handles → search "node_modules"
Right-click the process → End Process
~~~

- [[resmon.exe]] في [[System32]]، ووصفه «Resource Monitor».
- تاب **CPU** فيه جزء اسمه **Associated Handles** وجنبه خانة بحث. اكتب جزء من اسم الملف أو الفولدر.
- النتيجة: اسم العملية، والـ PID، والمسار. في التجربة اللي فوق كان هيظهر [[pwsh.exe]].
- End Process آخر حل، الأحسن تقفل البرنامج نفسه.

---

## ٣. البورتات والذاكرة

~~~text
Network → Listening Ports          port → process (like netstat -ano)
Memory                             who is using the RAM
~~~

Listening Ports = البورتات اللي برامج «سامعة» عليها (مستنية اتصال). نفس المعلومة من PowerShell:

~~~powershell
Get-NetTCPConnection -State Listen | Where-Object LocalPort -lt 1000 | Select-Object -First 3 | Format-Table LocalAddress, LocalPort, OwningProcess
~~~

~~~text الناتج على جهاز الدرس
LocalAddress LocalPort OwningProcess
------------ --------- -------------
::                 445             4
::                 135          1864
192.168.1.65       139             4
~~~

| العمود | يعني |
|---|---|
| LocalAddress | [[::]] = كل العناوين (IPv6 وبيشمل الكل)، أو IP كارت معيّن |
| LocalPort | البورت |
| OwningProcess | الـ PID. رقم 4 دايمًا عملية System نفسها (مشاركة الملفات على 445 و 139) |

resmon بيعرض نفس الجدول بس باسم البرنامج جاهز. ولبورت 3000 مثلًا: [[Get-NetTCPConnection -LocalPort 3000]].

> نافذة resmon نفسها من دوكيومنتيشن مايكروسوفت (مش متجرّبة لأنها بتفتح نافذة). تجربة المسكة و [[Get-NetTCPConnection]] اتشغّلوا فعلًا.

---

## الخلاصة

- «being used by another process» = حد ماسك handle.
- resmon ← CPU ← Associated Handles ← ابحث بالاسم.
- Network ← Listening Ports = مين ماسك أنهي بورت.`,
          sol: R`في [[resmon]] تاب CPU، اكتب اسم الملف في خانة البحث جنب Associated Handles. لو البرنامج ماسك الملف، هيظهر سطر فيه اسم العملية (زي [[notepad.exe]]) والـ PID والمسار كامل. وده بالظبط اللي بتعمله لما ملف مش راضي يتمسح.

لو Notepad مظهرش، ده مش غلطك: Notepad بيقرا الملف في الذاكرة وممكن يسيبه على طول، خصوصًا Notepad الجديد في ويندوز 11، فمبيبقاش ماسكه. جرّب بحاجة ماسكة الملف فعلًا: في PowerShell اعمل ملف بـ [[ni $HOME\test.txt]] وافتحه ومتقفلوش بـ [[$f = [IO.File]::OpenRead("$HOME\test.txt")]] وبعدين دوّر على [[test.txt]]، هتلاقي [[powershell.exe]] ظاهر، وبعدين [[$f.Close()]]. أو شغّل dev server ودوّر على اسم فولدر المشروع، هتلاقي node.exe.`
        },
        {
          cmd: "wf.msc",
          title: "افتح بورت عشان الموبايل يوصل لسيرفر التطوير",
          desc: R`عايز تجرّب موقعك من الموبايل على نفس الواي فاي، وفاتح [[http://192.168.1.5:5173]] ومش بيحمّل؟ غالبًا الفايروول. [[wf.msc]] ← Inbound Rules ← New Rule ← Port ← TCP 5173 ← Allow ← Private بس.

وقبل ده، السيرفر نفسه لازم يسمع على الشبكة مش على localhost بس: [[vite --host]] أو [[next dev -H 0.0.0.0]].`,
          example: R`Win+R → wf.msc                         Windows Defender Firewall with Advanced Security
Inbound Rules → New Rule → Port → TCP → 5173
Allow the connection → Private only (uncheck Public)
Name: "Vite dev 5173"
Win+R → firewall.cpl                   the simple firewall page
Win+R → ms-settings:network-status → Properties → Private network`,
          try: "اعمل rule لبورت 5173 على Private بس، وشغّل [[npx vite --host]] في أي مشروع Vite وافتح اللينك اللي فيه IP من الموبايل. بعد ما تخلص، اعمل Disable للـ rule.",
          flag: "keys",
          deep: {
            why: "اختبار الموقع على موبايل حقيقي أو جهاز تاني على نفس الشبكة، وويندوز بيقفل الاتصالات اللي جاية من بره افتراضيًا.",
            how: R`الفايروول فيه profiles: Private (البيت والشغل) و Public (الكافيه والمطار). الـ rule اللي عملتها على Private بس مش هتشتغل لو ويندوز شايف الشبكة Public، عشان كده اتأكد من نوع الشبكة من إعدادات الشبكة.

أول مرة node بيفتح بورت، ويندوز بيسألك «Allow access» على Private و Public. لو دوست Cancel بيتعمل rule بيمنع node.exe، وتلاقيه في Inbound Rules بعلامة حمرا. امسحه أو فعّله.

من الترمنال: [[netsh advfirewall]] (في تاب CMD) أو [[New-NetFirewallRule]] في PowerShell.`,
            when: "تجربة على الموبايل. جهاز تاني في الشبكة عايز يوصل لـ API عندك. WSL أو Docker مش واصلين لحاجة على ويندوز.",
            mistakes: "تقفل الفايروول كله عشان «مش عارف المشكلة فين»، أو تعمل Allow على Public، وتنسى، وتقعد في كافيه وسيرفرك مفتوح للكل. rule لبورت واحد على Private، وامسحه لما تخلص."
          },
          teach: R`## الفكرة: الفايروول بيقفل الباب على اللي جاي من برا

الفايروول (firewall) بيقرر أنهي اتصال يدخل الجهاز. **Inbound** = جاي من برا لجهازك (الموبايل بيفتح سيرفرك)، و **Outbound** = طالع من جهازك. الافتراضي في ويندوز: الطالع مسموح، والداخل ممنوع إلا لو فيه rule (قاعدة) بتسمح.

---

## ١. افتح الأداة

~~~text
Win+R → wf.msc                         Windows Defender Firewall with Advanced Security
~~~

[[wf]] = Windows Firewall، و [[.msc]] يعني بيفتح في MMC. الملف اسمه الحقيقي [[WF.msc]] في [[System32]] (الحروف الكبيرة مش فارقة في ويندوز).

---

## ٢. الـ rule

~~~text
Inbound Rules → New Rule → Port → TCP → 5173
Allow the connection → Private only (uncheck Public)
Name: "Vite dev 5173"
~~~

| الخطوة | الاختيار | ليه |
|---|---|---|
| نوع الـ rule | Port | بنفتح بورت، مش برنامج |
| البروتوكول | TCP | HTTP شغال على TCP |
| البورت | 5173 | بورت Vite الافتراضي |
| الإجراء | Allow the connection | اسمح |
| الـ profile | Private بس | البيت، مش الكافيه |
| الاسم | Vite dev 5173 | عشان تلاقيه وتمسحه بعدين |

---

## ٣. الـ profiles: الحتة اللي بتوقع الناس

ويندوز بيصنّف كل شبكة: Private (موثوقة) أو Public (عامة). والـ rule على Private **مش هتشتغل** لو شبكتك متصنّفة Public. اتأكد (قراية بس):

~~~powershell
Get-NetConnectionProfile | Format-Table Name, NetworkCategory
~~~

~~~text الناتج على جهاز الدرس
Name      NetworkCategory
----      ---------------
MyWiFi             Public
~~~

(اسم الشبكة متغيّر.) يعني على الجهاز ده، rule على Private بس مكانتش هتشتغل. ده اللي بيتغيّر من:

~~~text
Win+R → ms-settings:network-status → Properties → Private network
~~~

والـ profiles التلاتة شغالين:

~~~powershell
Get-NetFirewallProfile | Format-Table Name, Enabled
~~~

~~~text الناتج
Name    Enabled
----    -------
Domain     True
Private    True
Public     True
~~~

Domain = شبكة شركة فيها domain، مش هتحتاجه في البيت.

---

## ٤. الـ rules اللي node عملها

أول مرة node يسمع على بورت، ويندوز بيطلع نافذة Allow access، واختيارك بيتحفظ كـ rule:

~~~powershell
Get-NetFirewallRule -DisplayName "*node*" | Format-Table DisplayName, Direction, Action, Profile, Enabled
~~~

~~~text الناتج على جهاز الدرس
DisplayName                Direction Action Profile Enabled
-----------                --------- ------ ------- -------
Node.js JavaScript Runtime   Inbound  Allow  Public    True
Node.js JavaScript Runtime   Inbound  Allow  Public    True
~~~

اتنين (واحد لـ TCP وواحد لـ UDP)، مسموحين على **Public**. يعني على الجهاز ده أي node بيسمع على الشبكة مفتوح حتى في كافيه. ده بالظبط الغلط اللي في «أخطاء شائعة»، وتصلّحه من [[wf.msc]].

---

## ٥. الصفحة البسيطة

~~~text
Win+R → firewall.cpl                   the simple firewall page
~~~

صفحة Control Panel قديمة: تشغيل وإيقاف بس، من غير rules.

> عمل الـ rule نفسه مش متجرّب (بيغيّر إعدادات الجهاز). القراية بـ [[Get-Net...]] اتشغّلت فعلًا في pwsh 7.

---

## الخلاصة

- Inbound ← New Rule ← Port ← TCP ← البورت ← Allow ← Private.
- اتأكد إن شبكتك Private، وإلا الـ rule مش هتشتغل.
- راجع rules بتاعة node: Allow على Public = مفتوح في أي مكان.`,
          sol: R`Vite بـ [[--host]] هيطبع سطر [[Network: http://192.168.1.20:5173/]] (بـ IP جهازك). افتحه من موبايل على نفس الواي فاي، المفروض الصفحة تظهر. بعد ما تخلص، في Inbound Rules كليك يمين على «Vite dev 5173» ثم Disable Rule، هتلاقي أيقونته بقت رمادي.

لو الموبايل مفتحش: اتأكد إن شبكة الواي فاي في ويندوز متعرّفة Private مش Public، لأن الـ rule على Private بس. وأول مرة تشغّل node، ويندوز ممكن يطلع نافذة «Allow access» وانت لو دوست Cancel بيعمل rule بـ Block لـ node.exe، والـ Block بيكسب على أي Allow، شوف Inbound Rules ودوّر على Node.js. ولو Vite مطبعش سطر Network خالص، يبقى [[--host]] مش واصل. ولو المشروع جوه WSL، شوف درس الشبكة والبورتات في تاب WSL.`
        },
        {
          cmd: "devmgmt.msc",
          title: "اعرف الجهاز اللي وصلته شايفه ويندوز ولا لأ",
          desc: R`وصلت موبايل أندرويد عشان [[adb]]، أو ESP32 أو Arduino، ومش ظاهر؟ [[devmgmt.msc]] بيقولك: لو فيه علامة صفرا تحت Other devices يبقى الدرايفر مش متسطب.

لوحات Arduino و ESP32 بتظهر تحت Ports (COM & LPT) برقم زي COM3، وده الرقم اللي هتختاره في الـ IDE. ولو مش ظاهرة، غالبًا محتاج درايفر شريحة USB اللي عليها (CH340 أو CP210x).`,
          example: R`Win+R → devmgmt.msc                     Device Manager
Other devices → yellow "!"              driver missing
Ports (COM & LPT) → USB-SERIAL CH340 (COM3)   your board's port
Action → Scan for hardware changes      re-detect after plugging in
Right-click → Update driver
Win+R → compmgmt.msc                    Device Manager + Disk Management + Services in one`,
          try: "افتح Device Manager ووصّل موبايلك أو فلاشة USB، وشوف إيه اللي ظهر جديد. اعمل Scan for hardware changes.",
          flag: "keys",
          deep: {
            why: "تطوير موبايل أو embedded بيعتمد إن ويندوز شايف الجهاز صح. قبل ما تدوّر في إعدادات الـ IDE، اتأكد من هنا.",
            how: R`كل قطعة في الجهاز أو متوصلة بيه ليها درايفر. العلامة الصفرا يعني ويندوز شايف الجهاز بس مش عارف يتعامل معاه. View ← Show hidden devices بيعرض أجهزة اتوصلت قبل كده ومش موصولة دلوقتي.

[[compmgmt.msc]] بيجمع أدوات كتير في نافذة واحدة: Device Manager، و Disk Management ([[diskmgmt.msc]])، و Services، و Event Viewer.

تحت Network adapters هتلاقي adapters وهمية زي vEthernet (WSL)، دي طبيعية.`,
            when: "adb مش شايف الموبايل. البورد مش ظاهرة في Arduino IDE. كارت شبكة أو صوت مش شغال.",
            mistakes: "«Uninstall device» مع علامة «Delete the driver software» لحاجة مش عارفها، زي كارت الشبكة أو الـ adapters الوهمية بتاعة WSL و Hyper-V. ممكن تفقد النت أو WSL يبطّل. وكابلات USB كتير شحن بس ومفيهاش داتا، جرّب كابل تاني قبل ما تتعب في الدرايفرات."
          },
          teach: R`## الفكرة: كل جهاز محتاج درايفر

أي قطعة متوصلة بالكمبيوتر (فلاشة، موبايل، بورد Arduino) ويندوز لازم يكون عنده **درايفر** ليها: برنامج صغير بيعرفه يتكلم معاها إزاي. Device Manager بيعرض كل الأجهزة وحالة درايفر كل واحد.

---

## ١. افتحه

~~~text
Win+R → devmgmt.msc                     Device Manager
~~~

[[devmgmt]] = device management، و [[.msc]] = MMC. الأجهزة متقسمة مجموعات (Disk drives، Ports، Network adapters...).

---

## ٢. العلامة الصفرا

~~~text
Other devices → yellow "!"              driver missing
~~~

علامة [[!]] صفرا = ويندوز شايف الجهاز بس مش عارف يشغّله. نفس السؤال من PowerShell (قراية بس):

~~~powershell
Get-PnpDevice -PresentOnly | Where-Object Status -eq Error | Format-Table Status, Class, FriendlyName
~~~

| الحتة | معناها |
|---|---|
| [[Get-PnpDevice]] | الأجهزة (PnP = Plug and Play، «وصّل وشغّل») |
| [[-PresentOnly]] | المتوصلة دلوقتي بس |
| [[Status -eq Error]] | اللي فيها مشكلة (اللي عليها العلامة الصفرا) |

~~~text الناتج على جهاز الدرس
Status Class  FriendlyName
------ -----  ------------
Error  Camera Iriun Webcam
~~~

كاميرا افتراضية من برنامج، الدرايفر بتاعها مش شغال. ده شكل المشكلة بالظبط.

---

## ٣. البورد

~~~text
Ports (COM & LPT) → USB-SERIAL CH340 (COM3)   your board's port
~~~

- **COM** بورت serial، والرقم (COM3) هو اللي تختاره في Arduino IDE.
- **CH340** اسم الشريحة اللي على البورد بتحوّل USB لـ serial، ودرايفرها مش دايمًا جاهز في ويندوز.

~~~powershell
Get-PnpDevice -Class Ports
~~~

على جهاز الدرس مطلّعش حاجة، يعني مفيش بورد متوصلة. ولما توصل واحدة بدرايفر سليم، هتظهر هنا بالـ COM بتاعها.

---

## ٤. باقي الجدول

~~~text
Action → Scan for hardware changes      re-detect after plugging in
Right-click → Update driver
Win+R → compmgmt.msc                    Device Manager + Disk Management + Services in one
~~~

| الأمر | بيعمل إيه |
|---|---|
| Scan for hardware changes | يدوّر تاني على اللي اتوصل |
| Update driver | يدوّر على درايفر أحدث (من ويندوز أو من فولدر تحدده) |
| [[compmgmt.msc]] | Computer Management: كذا أداة في نافذة واحدة |

وللمقارنة، الديسكات اللي على جهاز الدرس ([[Get-PnpDevice -PresentOnly -Class DiskDrive]]):

~~~text الناتج
Status Class     FriendlyName
------ -----     ------------
OK     DiskDrive HFM001TD3JX013N
OK     DiskDrive CT1000P3SSD8
~~~

[[OK]] = الدرايفر شغال، و FriendlyName اسم الموديل. فلاشة متوصلة هتظهر هنا كمان.

> النافذة نفسها والتحديث من دوكيومنتيشن مايكروسوفت. [[Get-PnpDevice]] اتشغّل فعلًا (قراية بس).

---

## الخلاصة

- علامة صفرا = درايفر ناقص.
- البورد تحت Ports بـ COM رقم كذا.
- مش ظاهر خالص؟ جرّب كابل تاني (كتير منهم شحن بس).`,
          sol: R`لما توصل فلاشة: هتلاقي حاجة جديدة تحت «Disk drives» باسمها (زي [[SanDisk Cruzer Blade USB Device]])، وتحت «Universal Serial Bus controllers» [[USB Mass Storage Device]]. الموبايل (في وضع نقل الملفات) بيظهر تحت «Portable Devices» باسمه، أو تحت Android Phone. Scan for hardware changes بتخلي القايمة تتحدث، ويمكن تشوفها بترمش ثانية.

لو ظهر جهاز تحت «Other devices» عليه علامة صفرا، ده driver ناقص. ولو موبايلك مظهرش خالص، غالبًا الكابل للشحن بس (من غير data)، أو الموبايل على وضع «Charging only»، غيّره من إشعار USB على الموبايل لـ File transfer.`
        },
        {
          cmd: "regedit",
          title: "عدّل إعداد مخفي في ويندوز مفيش ليه زرار",
          desc: R`[[regedit]] بيفتح الـ Registry: قاعدة البيانات اللي فيها كل إعدادات ويندوز والبرامج. أحيانًا حل مشكلة بيقولك «غيّر القيمة الفلانية»، زي تفعيل المسارات الطويلة عشان [[node_modules]] العميقة.

القاعدة: قبل أي تعديل، File ← Export للمفتاح اللي هتعدّله. وغيّر اللي انت فاهمه بس.`,
          example: R`Win+R → regedit → Ctrl+Shift+Enter         open as admin
Paste a path into the address bar:
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem
LongPathsEnabled → 1                     allow paths longer than 260 chars
File → Export                            ALWAYS back up the key first
Double-click the .reg backup             restores it`,
          try: "افتح [[regedit]] وحط المسار ده في شريط العنوان واقرا قيمة LongPathsEnabled عندك من غير ما تغيّرها.",
          flag: "keys danger",
          deep: {
            why: "إعدادات كتير مفيش ليها واجهة. مثال حقيقي: مسار جوه node_modules عدّى ٢٦٠ حرف فالمسح أو النسخ بيفشل.",
            how: R`الـ Registry متقسم لـ hives: [[HKEY_CURRENT_USER]] إعداداتك انت، و [[HKEY_LOCAL_MACHINE]] إعدادات الجهاز كله ومحتاج أدمن. التعديل بيسري فورًا بس البرامج ساعات بتقراه وقت ما تفتح بس، فيمكن تحتاج restart.

LongPathsEnabled بيفتح الباب للبرامج اللي تدعمه. Git محتاج كمان [[git config --global core.longpaths true]].

من الترمنال: أمر [[reg query]] و [[reg add]] بيعملوا نفس الحاجة، ومفيدين في السكربتات.`,
            when: "حل مكتوب من مصدر رسمي (Microsoft Learn أو دوكيومنتيشن الأداة) بيطلب قيمة معينة.",
            mistakes: "تمسح مفاتيح أو تنفّذ ملف .reg من منتدى من غير ما تقراه. ده ممكن يوقّف برامج أو يمنع ويندوز يقوم. وبرامج «Registry cleaner» مش بتسرّع حاجة وممكن تبوّظ. Export قبل أي تغيير، دايمًا."
          },
          teach: R`## الفكرة: الـ registry شجرة فولدرات وقيم

الـ registry قاعدة بيانات ويندوز للإعدادات، وشكلها زي Explorer: **مفاتيح** (keys) زي الفولدرات، وجواها **قيم** (values) كل واحدة ليها اسم ونوع وبيانات. [[regedit]] (registry editor) بيعرضها ويعدّلها. الملف [[C:\Windows\regedit.exe]] ووصفه «Registry Editor».

---

## ١. افتحه كأدمن

~~~text
Win+R → regedit → Ctrl+Shift+Enter         open as admin
~~~

القراية من غير أدمن شغالة في أغلب الأماكن، بس التعديل في [[HKEY_LOCAL_MACHINE]] محتاج أدمن.

---

## ٢. المسار

~~~text
Paste a path into the address bar:
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem
~~~

| الحتة | معناها |
|---|---|
| [[HKEY_LOCAL_MACHINE]] | الـ hive (الفرع الكبير) بتاع إعدادات الجهاز كله. اختصاره [[HKLM]] |
| [[SYSTEM\CurrentControlSet]] | إعدادات النظام اللي شغالة دلوقتي |
| [[Control\FileSystem]] | إعدادات نظام الملفات |

ونفس الإعدادات بتتقري من الترمنال من غير ما تفتح [[regedit]] (ده اللي عملته على جهاز الدرس، قراية بس):

~~~cmd
reg query HKLM\SYSTEM\CurrentControlSet\Control\FileSystem /v LongPathsEnabled
~~~

~~~text الناتج
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem
    LongPathsEnabled    REG_DWORD    0x1
~~~

| الحتة | معناها |
|---|---|
| [[reg query]] | اقرا من الـ registry |
| [[/v LongPathsEnabled]] | القيمة (value) اللي اسمها كده بس |
| [[REG_DWORD]] | نوع القيمة: رقم 32 بت |
| [[0x1]] | الرقم 1 مكتوب hex (الـ [[0x]] معناها hex) |

---

## ٣. القيمة نفسها

~~~text
LongPathsEnabled → 1                     allow paths longer than 260 chars
~~~

ويندوز قديمًا كان بيرفض أي مسار أطول من ٢٦٠ حرف (اسمه MAX_PATH)، و node_modules العميقة بتعدّيه بسهولة. 1 = البرامج اللي بتدعم المسارات الطويلة تقدر تستخدمها، 0 أو مش موجودة = الحد القديم. على جهاز الدرس القيمة 1 (Python installer أو حاجة تانية فعّلتها).

---

## ٤. النسخة الاحتياطية

~~~text
File → Export                            ALWAYS back up the key first
Double-click the .reg backup             restores it
~~~

- Export بيحفظ المفتاح المتحدد وكل اللي جواه في ملف نصي [[.reg]].
- دبل كليك على الملف بيرجّع القيم دي تاني (بعد تأكيد). ومن الترمنال نفس الفكرة [[reg export]] و [[reg import]].

> التعديل و Export مش متجرّبين على الجهاز (تغيير registry). [[reg query]] اتشغّل فعلًا.

---

## الخلاصة

| | |
|---|---|
| مفتاح | زي فولدر، المسار فيه [[\]] |
| قيمة | اسم + نوع ([[REG_DWORD]]...) + بيانات |
| [[HKLM]] | الجهاز كله، محتاج أدمن للتعديل |
| [[HKCU]] | اليوزر الحالي |
| القاعدة | Export قبل أي تعديل |`,
          sol: R`بعد ما تلزق المسار في شريط العنوان فوق وتدوس Enter، هتلاقي [[LongPathsEnabled]] في الجزء اليمين، نوعه [[REG_DWORD]] وقيمته في عمود Data زي [[0x00000000 (0)]] أو [[0x00000001 (1)]]. 0 يعني المسارات الطويلة مقفولة (الافتراضي)، و 1 يعني برنامج زي Python installer أو انت فعّلتها قبل كده.

لو القيمة مش موجودة خالص، ده معناه نفس الـ 0. ولو شريط العنوان مش ظاهر، فعّله من View ثم Address Bar. وحتى لو 1، برامج قديمة كتير لسه مش بتدعم المسارات الطويلة، و Git محتاج [[git config --system core.longpaths true]] لوحده.`
        }
      ]
    },
    {
      t: "أوبونتو: أدوات النظام",
      l: 2,
      n: "مدير المهام والإعدادات والديسكات في أوبونتو، من الواجهة ومن الترمنال",
      items: [
        {
          cmd: "gnome-system-monitor",
          title: "مدير المهام بتاع أوبونتو",
          desc: R`System Monitor هو Task Manager أوبونتو. افتحه من Super واكتب «monitor»، أو من الترمنال [[gnome-system-monitor]]. تاب Processes فيه كل العمليات، و Ctrl+F يدوّر، وكليك يمين ← Kill.

و Resources فيها رسم للبروسيسور والرامات والشبكة، و File Systems بتوريك المساحة الفاضية في كل هارد.`,
          example: R`Super → "monitor"               open System Monitor
Processes → Ctrl+F → "node"      find node processes
Right-click → End / Kill         End asks nicely, Kill forces
Resources                        CPU, memory, network graphs
File Systems                     free disk space`,
          try: "شغّل [[sleep 999]] في الترمنال، ولاقيه في System Monitor واقفله بـ End، وشوف الترمنال رجع.",
          flag: "keys",
          deep: {
            why: "برنامج علّق، أو node فضل شغال في الخلفية وماسك بورت، أو الجهاز بطيء وعايز تعرف مين السبب.",
            how: R`End بيبعت SIGTERM (البرنامج يقفل نفسه بنظام)، و Kill بيبعت SIGKILL (يتقفل فورًا). جرّب End الأول. نفس الفرق بين [[kill]] و [[kill -9]] في تاب bash.

من الترمنال فيه [[top]] و [[htop]] بيعرضوا نفس المعلومات.`,
            when: "برنامج مش بيرد. الرامات مليانة. عايز تعرف مين واكل البروسيسور.",
            mistakes: "جاي من ويندوز وبتدوس Ctrl+Alt+Delete فتطلعلك نافذة Power Off. لو عايز اختصار زي ويندوز، اعمل custom shortcut: Ctrl+Shift+Esc يشغّل [[gnome-system-monitor]] (في المستوى التالت)."
          },
          teach: R`## البرنامج ده بيعمل إيه

System Monitor بيعرض كل البرامج اللي شغالة دلوقتي (العمليات أو processes)، وبيخليك تقفل أي واحدة منها، وبيرسم استهلاك الجهاز. المثال مش أوامر بتتكتب، ده خطوات بالكيبورد والماوس، هنمشي عليها سطر سطر. والبرنامج نفسه رسومي، فالجزء ده من دليل GNOME، أما الإشارات (signals) تحت فاتجربت فعلًا.

---

## ١. افتحه: [[Super → "monitor"]]

[[Super]] هو زرار ويندوز اللي على الكيبورد، وفي أوبونتو بيفتح شاشة Activities وتبدأ تكتب على طول. مش لازم الاسم كله: «monitor» كفاية عشان يطلع System Monitor.

ومن الترمنال اسم البرنامج نفسه:

~~~bash
gnome-system-monitor
~~~

[[gnome]] اسم الواجهة اللي أوبونتو بيستخدمها، و [[system-monitor]] اسم البرنامج. الترمنال هيفضل مستنيه لحد ما تقفله، ولو عايز الترمنال يرجع لك على طول حط [[&]] في الآخر.

---

## ٢. دوّر على عملية: [[Processes → Ctrl+F → "node"]]

تاب Processes فيه جدول، كل سطر عملية. أهم الأعمدة:

| العمود | معناه |
|---|---|
| Process Name | اسم البرنامج ([[node]] أو [[sleep]] أو [[firefox]]) |
| % CPU | نسبة المعالج اللي واكلها دلوقتي |
| Memory | الـ RAM اللي ماسكها |
| ID | الـ PID: رقم العملية، نفس الرقم اللي [[kill]] بياخده في الترمنال |

[[Ctrl+F]] بيفتح خانة بحث، والجدول بيتفلتر على الاسم وانت بتكتب. ولو العملية مظهرتش، من القايمة فوق خلّي العرض «All Processes» أو «My Processes» مش «Active Processes»، لأن الأخيرة بتعرض اللي بيستهلك CPU دلوقتي بس.

---

## ٣. اقفلها: [[End]] ولا [[Kill]]؟

كليك يمين على العملية بيديك اختيارين، والفرق بينهم هو نوع الإشارة (signal) اللي بتتبعت للعملية. الإشارة رسالة صغيرة من النظام للبرنامج:

| الزرار | الإشارة | رقمها | اللي بيحصل |
|---|---|---|---|
| End | SIGTERM | 15 | «اقفل لو سمحت»: البرنامج يقدر يحفظ ويقفل بنظام |
| Kill | SIGKILL | 9 | النظام بيموّته فورًا، والبرنامج مبيلحقش يعمل حاجة |

[[SIG]] اختصار signal، و TERM من terminate (إنهاء). وده نفس اللي بيحصل في الترمنال بـ [[kill]] و [[kill -9]]. جرّبتهم في أوبونتو 24.04 (جوه Docker):

~~~bash
sleep 999 & p=$!; kill $p; wait $p; echo "exit=$?"
sleep 999 & p=$!; kill -9 $p; wait $p; echo "exit=$?"
~~~

- [[sleep 999]] برنامج بيستنى ٩٩٩ ثانية ومبيعملش حاجة، فهو عملية مثالية للتجربة.
- [[&]] بيشغّله في الخلفية، و [[$!]] فيه الـ PID بتاع آخر حاجة اشتغلت في الخلفية، فبنحطه في [[p]].
- [[kill $p]] بيبعت SIGTERM (ده الافتراضي)، و [[kill -9 $p]] بيبعت SIGKILL.
- [[wait $p]] بيستنى العملية تخلص، و [[$?]] فيه رقم خروجها.

~~~text الناتج
exit=143
exit=137
~~~

الرقمين دول مش عشوائيين: لما عملية تموت بإشارة، رقم خروجها بيبقى 128 + رقم الإشارة. يعني 128 + 15 = 143 (اتقفلت بـ End)، و 128 + 9 = 137 (اتقفلت بـ Kill). ولو الأمر كان شغال قدامك في الترمنال، bash بيطبع [[Terminated]] في الحالة الأولى و [[Killed]] في التانية.

> ابدأ دايمًا بـ End. Kill للبرنامج اللي مش بيرد خالص، لأنه ممكن يسيب ملفات نص مكتوبة.

---

## ٤. [[Resources]] و [[File Systems]]

| التاب | بيعرض | نفس المعلومة في الترمنال |
|---|---|---|
| Resources | رسم للـ CPU (خط لكل core) والـ RAM والـ Swap والشبكة | [[top]] و [[free -h]] |
| File Systems | كل هارد: حجمه والمستخدم والفاضي | [[df -h]] |

---

## الخلاصة

~~~text
gnome-system-monitor   Task Manager أوبونتو
Processes + Ctrl+F     دوّر على عملية بالاسم، والـ ID هو الـ PID
End                    SIGTERM (15): اقفل بنظام، جرّبه الأول
Kill                   SIGKILL (9): موت فوري
~~~`,
          sol: R`[[sleep 999]] هيفضل الترمنال واقف من غير prompt. في System Monitor تاب Processes، Ctrl+F واكتب [[sleep]]، هتلاقي عملية اسمها sleep. كليك يمين ثم End، وهيسألك تأكيد. الترمنال هيطبع [[Terminated]] والـ prompt يرجع.

الفرق: End بيبعت SIGTERM (العملية بتقدر تقفل بشياكة)، و Kill بيبعت SIGKILL (بتموت فورًا) والترمنال هيطبع [[Killed]] بدل Terminated. ولو sleep مظهرش، شوف إن View فوق على «All Processes» أو «My Processes» مش «Active Processes»، لأن sleep مش بيستهلك CPU فمش بيتحسب active.`
        },
        {
          cmd: "Alt+F2",
          title: "شغّل أمر بسرعة من غير ما تفتح ترمنال",
          desc: R`Alt+F2 بيفتح خانة صغيرة تكتب فيها أمر وتدوس Enter، زي Win+R في ويندوز. [[gnome-terminal]] يفتح ترمنال، و [[code /home/you/projects/myapp]] يفتح المشروع في VS Code، ولو كتبت مسار لوحده زي [[~/.config]] بيفتح الفولدر في Files.

الفرق عن الترمنال إنه مش بيعرض أي output، فهو لتشغيل برامج بس. ومفيش shell: [[~]] و [[$HOME]] جوه أمر مش بيتفكّوا، فاكتب المسار كامل.`,
          example: R`Alt+F2 → gnome-terminal                    open a terminal
Alt+F2 → code /home/you/projects/myapp     open a project in VS Code (full path)
Alt+F2 → ~/.config                         a path alone opens it in Files
Alt+F2 → gnome-system-monitor              task manager
Up / Down                                  previous commands`,
          try: "افتح Alt+F2 واكتب [[~/.ssh]] لوحده وشوف Files فتح على الفولدر المخفي.",
          flag: "keys",
          deep: {
            why: "عايز تفتح برنامج بمسار معين أو باختيارات، والبحث في Super مش بيفهم arguments.",
            how: R`الخانة بتشغّل الأمر كأنه من الترمنال بس من غير ما تعرضلك حاجة، وبتفتكر الأوامر اللي فاتت.

فيه أوامر خاصة بـ GNOME نفسه هنا، أشهرها [[r]] اللي كان بيعمل restart للواجهة. ده بيشتغل على X11 بس، وأوبونتو 24.04 افتراضيًا على Wayland، فالبديل هو Log Out وتدخل تاني.`,
            when: "فتح مشروع أو فولدر بمسار مباشر، أو برنامج مش ظاهر في قايمة البرامج.",
            mistakes: "تكتب أمر محتاج [[sudo]] أو أمر بيطبع نتيجة ([[ls]]، [[npm install]]) وتستنى، مفيش حاجة هتظهر. الأوامر دي مكانها الترمنال. وتكتب [[nautilus ~/.ssh]] فيفتح غلط: [[~]] بعد اسم برنامج بيوصل له زي ما هي من غير ما تتحوّل للهوم."
          },
          teach: R`## الخانة دي بتعمل إيه

Alt+F2 بيفتح خانة «Enter a Command»: تكتب أمر وتدوس Enter، و GNOME بيشغّله ويقفل الخانة. مفيش ترمنال ولا output. الكلام هنا من دليل GNOME ومن كود GNOME Shell نفسه (ملف [[runDialog.js]] في نسخة 46، اللي في أوبونتو 24.04)، لأن مفيش واجهة GNOME هنا نجرّب عليها، وجزء تفكيك الأمر جرّبته في أوبونتو 24.04 جوه Docker.

---

## ١. GNOME بيقرا اللي كتبته إزاي؟

اللي بتكتبه بيتقطّع على المسافات لكلمات (اسم البرنامج وبعده الـ arguments)، وبعدين البرنامج بيتشغّل مباشرة، **من غير shell**. يعني مفيش حد يحوّل [[~]] للهوم، ولا [[$HOME]] لقيمته، ولا يفهم [[|]] أو [[&&]]. نفس دالة التقطيع ([[GLib.shell_parse_argv]]) شغّلتها بـ Python:

~~~text الناتج
'code ~/projects/myapp'   -> ['code', '~/projects/myapp']
'nautilus $HOME/.config'  -> ['nautilus', '$HOME/.config']
~~~

يعني VS Code بياخد النص [[~/projects/myapp]] زي ما هو، ويدوّر على فولدر اسمه حرفيًا [[~]]. عشان كده المثال بيكتب المسار كامل.

---

## ٢. سطور المثال

| اللي بتكتبه | بيعمل إيه |
|---|---|
| [[gnome-terminal]] | برنامج الترمنال بتاع GNOME |
| [[code /home/you/projects/myapp]] | [[code]] هو أمر VS Code، والمسار كامل من [[/]] (غيّر [[you]] لاسم اليوزر بتاعك) |
| [[~/.config]] | مسار لوحده من غير برنامج: بيتفتح في Files |
| [[gnome-system-monitor]] | مدير المهام (الدرس اللي فات) |
| Up / Down | الأوامر اللي كتبتها قبل كده |

### ليه المسار لوحده بيشتغل وفيه [[~]]؟

لأن GNOME بيحاول يشغّل [[~/.config]] كأمر الأول، ولما يفشل بيقول: يمكن ده مسار؟ ساعتها **هو** بيشيل [[~]] ويحط مكانها الهوم، ولو المسار موجود بيفتحه بالبرنامج الافتراضي (Files للفولدر، والمحرر لملف نصي). ولو مش موجود بيكتب تحت الخانة [[Command not found]].

---

## ٣. حاجات صغيرة مفيدة

- [[Ctrl+Enter]] بدل Enter: بيشغّل الأمر جوه ترمنال جديد، فتشوف الـ output.
- أوامر خاصة بـ GNOME نفسه: [[lg]] بيفتح Looking Glass (أداة debugging للواجهة)، و [[r]] بيعمل restart للواجهة على X11 بس. على Wayland (الافتراضي في 24.04) بيكتب [[Restart is not available on Wayland]].

---

## الخلاصة

~~~text
Alt+F2 → برنامج + arguments   بيشتغل من غير shell ومن غير output
~ و $HOME جوه أمر             مش بيتفكّوا، اكتب المسار كامل
مسار لوحده (~/.ssh)            بيتفتح في Files، وهنا ~ بتتفهم
Ctrl+Enter                     شغّله في ترمنال عشان تشوف الناتج
~~~`,
          sol: R`Alt+F2 هيفتح خانة صغيرة في نص الشاشة «Enter a Command». [[~/.ssh]] لوحده و Enter يفتح Files على الفولدر المخفي مباشرة، حتى لو إخفاء الملفات المخفية شغال، لأنك طلبت المسار بالاسم: GNOME بيحاول يشغّله كأمر، ولما يفشل بيشوف هل هو مسار موجود ويفتحه بالبرنامج الافتراضي.

لو ظهر تحت الخانة «Command not found» يبقى [[~/.ssh]] مش موجود لسه. ولو Alt+F2 مش بيفتح حاجة، فيه احتمالين: انت على Wayland مع إضافة واخدة الاختصار، أو اللابتوب بيعتبر F2 زرار وظيفة (زي السطوع)، جرّب Alt+Fn+F2.`
        },
        {
          cmd: "gnome-control-center",
          title: "افتح صفحة إعدادات بعينها في أوبونتو من الترمنال",
          desc: R`[[gnome-control-center]] هو برنامج Settings. لو اديته اسم صفحة، بيفتحها على طول: الشبكة، الكيبورد، الشاشة. زي [[ms-settings:]] في ويندوز.

مفيد في السكربتات وفي الشرح: بدل «ادخل Settings وبعدين دوّر على ...»، سطر واحد.`,
          example: R`gnome-control-center
gnome-control-center network
gnome-control-center keyboard
gnome-control-center display
gnome-control-center --list`,
          try: "افتح صفحة الكيبورد من الترمنال، وبعدين اعرض كل أسماء الصفحات بـ [[--list]].",
          deep: {
            why: "توصل لصفحة إعدادات بسرعة، أو تكتبها في README لزميل بيجهز جهازه.",
            how: R`كل صفحة في Settings اسمها panel وليها اسم قصير. [[--list]] بيطبعهم كلهم. البرنامج بيفضل مفتوح والترمنال بيستناه، فلو عايز ترجع للترمنال على طول ضيف [[&]] في الآخر.`,
            when: "تظبيط شبكة أو شاشة أو اختصارات بسرعة.",
            mistakes: "تشغّله جوه SSH أو على سيرفر من غير واجهة: مش هيشتغل، هو برنامج رسومي. وأسماء بعض الصفحات بتتغير بين إصدارات GNOME، فـ [[--list]] هو المرجع."
          },
          teach: R`## الأمر ده بيعمل إيه

[[gnome-control-center]] هو اسم برنامج Settings في أوبونتو. لو كتبته لوحده بيفتح Settings، ولو اديته اسم صفحة بيفتحها على طول. البرنامج رسومي ومحتاج شاشة، فالكلام هنا من دليل GNOME، مش متجرب في Docker.

---

## ١. تركيب الأمر

~~~bash
gnome-control-center keyboard
~~~

| الحتة | معناها |
|---|---|
| [[gnome-control-center]] | البرنامج (control center = لوحة التحكم، الاسم القديم لـ Settings) |
| [[keyboard]] | اسم الصفحة، وبيتسمّى **panel** |

كل صفحة في الشمال في Settings ليها اسم قصير بالإنجليزي، وده اللي بتكتبه بعد الأمر.

---

## ٢. سطور المثال

| السطر | بيفتح |
|---|---|
| [[gnome-control-center]] | Settings على آخر صفحة كنت فيها |
| [[gnome-control-center network]] | Network: الكابل والـ VPN والـ proxy |
| [[gnome-control-center keyboard]] | Keyboard، ومنها View and Customize Shortcuts |
| [[gnome-control-center display]] | Displays: الدقة والتكبير وترتيب الشاشات |
| [[gnome-control-center --list]] | مش بيفتح حاجة: بيطبع أسماء كل الـ panels |

[[--list]] (شرطتين) اختيار طويل معناه «اعرض اللستة». أسماء الصفحات بتتغير بين نسخ GNOME (مثلًا [[wifi]] و [[network]] بقوا صفحتين)، فـ [[--list]] على جهازك هو المرجع.

---

## ٣. الترمنال بيستنى

البرنامج بيفضل مربوط بالترمنال لحد ما تقفله، ولو قفلت الترمنال الأول هيقفل معاه. الحل [[&]] في الآخر:

~~~bash
gnome-control-center display &
~~~

[[&]] بيشغّل البرنامج في الخلفية فالـ prompt يرجعلك على طول.

---

## الخلاصة

~~~text
gnome-control-center <panel>   افتح صفحة إعدادات بعينها
gnome-control-center --list    أسماء الصفحات على نسختك
&                              رجّعلي الترمنال
~~~

وده مقابل [[ms-settings:]] في ويندوز.`,
          lines: [
            "افتح Settings على آخر صفحة كنت فيها.",
            "افتح صفحة الشبكة (Wi-Fi و Ethernet و VPN و proxy).",
            "افتح صفحة الكيبورد، ومنها الاختصارات.",
            "افتح صفحة الشاشات والدقة والتكبير.",
            "اعرض أسماء كل الصفحات اللي ينفع تفتحها."
          ],
          sol: R`[[gnome-control-center keyboard]] هيفتح Settings على صفحة Keyboard على طول. و [[gnome-control-center --list]] هيطبع في الترمنال «Available panels:» وتحتها أسامي زي [[background]] و [[bluetooth]] و [[display]] و [[keyboard]] و [[network]] و [[wifi]] و [[sound]] و [[ubuntu]] وغيرهم. الأسامي دي اللي تحطها بعد الأمر.

لو كتبت اسم غلط، هيفتح Settings عادي على آخر صفحة كنت فيها أو يطبع warning. الأسامي بتتغير بين نسخ GNOME، فـ [[--list]] هو المرجع مش أي لستة على النت. ولو طلع «command not found» يبقى انت مش على GNOME (زي Kubuntu).`
        },
        {
          cmd: "gnome-disks",
          title: "شوف الهاردات وجهّز فلاشة في أوبونتو",
          desc: R`برنامج Disks (من الترمنال [[gnome-disks]]) بيعرض كل الهاردات والفلاشات والـ partitions بشكل مرئي. منه تعمل format لفلاشة، أو تكتب ملف ISO عليها (Restore Disk Image) عشان تبقى bootable، أو تشوف صحة الهارد (SMART).

زي [[lsblk]] و [[df -h]] في الترمنال، بس بالصور، وأسهل تشوف أنهي جهاز هو أنهي.`,
          example: R`Super → "disks"                         open Disks
Left list → pick the USB stick (check the size!)
⋮ → Format Disk                         wipe the whole stick
⋮ → Restore Disk Image → ubuntu.iso     make a bootable USB
⋮ → SMART Data & Self-Tests             disk health`,
          try: "افتح Disks وشوف الهارد الأساسي والـ partitions بتاعته واقرا SMART Data، من غير ما تدوس أي زرار تاني.",
          flag: "keys danger",
          deep: {
            why: "تعمل فلاشة تسطيب لأوبونتو أو لسيرفر، أو تتأكد إن الهارد مش بيموت قبل ما تخسر شغلك.",
            how: R`كل جهاز تخزين بيظهر بالحجم والاسم، وتحته الـ partitions. Restore Disk Image بيكتب ملف الـ ISO على الجهاز كله بايت بايت، وده بيمسح اللي كان عليه.

SMART بيقرا معلومات الهارد عن نفسه (ساعات الشغل، القطاعات البايظة). لو قال «Disk is likely to fail soon» خد backup النهارده.`,
            when: "فلاشة bootable، فورمات فلاشة، فحص هارد بطيء أو بيعمل أصوات.",
            mistakes: "تختار الهارد الغلط وتعمل Format أو Restore عليه، فتمسح النظام أو الداتا بتاعتك. قبل أي زرار: اتأكد من الحجم والاسم، وشيل أي هارد خارجي مش محتاجه. مفيش Undo."
          },
          teach: R`## البرنامج ده بيعمل إيه

Disks بيعرض كل أجهزة التخزين (الهارد والـ SSD والفلاشات) وتقسيمها، ومنه تفرمت أو تكتب ISO أو تقرا صحة الهارد. خطواته رسومية، فالشرح من دليل GNOME، وأمر [[lsblk]] تحت اتجرب في Docker.

---

## ١. افتحه وافهم اللي قدامك: [[Super → "disks"]]

| الحتة | معناها |
|---|---|
| اللستة اللي على الشمال | جهاز تخزين كامل في كل سطر (disk)، بحجمه واسمه |
| الشريط الملوّن على اليمين | الـ partitions: أجزاء الهارد |
| نوع كل partition | [[ext4]] (لينكس)، [[FAT]] (صغير للـ EFI أو فلاشات)، [[NTFS]] (ويندوز) |

**partition** يعني جزء من الهارد متقسّم لوحده وليه نظام ملفات (filesystem) خاص بيه. و **EFI** partition صغير فيه برامج الإقلاع.

نفس الصورة بالكلام في الترمنال: [[lsblk]] (list block devices). ده ناتجه جوه Docker (فشايف الماكينة الافتراضية بتاعة Docker مش الجهاز الحقيقي):

~~~bash
lsblk -o NAME,SIZE,TYPE,FSTYPE,MOUNTPOINTS
~~~

~~~text الناتج
NAME    SIZE TYPE FSTYPE MOUNTPOINTS
loop0 745.3M loop
sda   388.6M disk
sdc       4G disk        [SWAP]
sdd       1T disk        /etc/hosts
~~~

[[-o]] بيختار الأعمدة. [[TYPE]] بيقولك disk (جهاز كامل) ولا part (partition)، و [[SIZE]] الحجم. **الحجم هو اللي بتعرف بيه الفلاشة**: فلاشة 32 جيجا هتبان قريب من 28.9G.

---

## ٢. الزراير الخطيرة (من قايمة [[⋮]])

| الاختيار | بيعمل إيه | بيمسح؟ |
|---|---|---|
| Format Disk | يمسح الجهاز كله ويعمله جديد | أيوه، كله |
| Restore Disk Image | يكتب ملف ISO على الجهاز بايت بايت، فيبقى bootable | أيوه، كله |
| SMART Data & Self-Tests | يقرا تقرير الهارد عن نفسه | لأ، قراية بس |

**bootable** يعني الجهاز يقدر يقوم منه (تسطيب نظام). و **ISO** ملف واحد فيه نسخة كاملة من قرص تسطيب.

---

## ٣. SMART

SMART (Self-Monitoring, Analysis and Reporting Technology) معلومات الهارد بيسجّلها عن نفسه: ساعات التشغيل، والحرارة، وعدد القطاعات البايظة. السطر المهم «Overall Assessment»: لو [[Disk is OK]] تمام، ولو [[Disk is likely to fail soon]] خد backup النهارده.

---

## الخلاصة

~~~text
Disks / lsblk          شوف الأجهزة والـ partitions، واعرف الفلاشة من حجمها
Format و Restore       بيمسحوا الجهاز كله، ومفيش Undo
SMART                  صحة الهارد، قراية بس
~~~`,
          sol: R`في Disks الشمال فيه لستة بالهاردات، اختار الأساسي (غالبًا NVMe أو SSD بحجمه). اليمين هيعرض الـ partitions كشريط ملوّن: غالبًا partition صغير لـ EFI (حوالي 1 GB أو أقل، FAT) وواحد كبير ext4 لأوبونتو، ولو dual boot هتلاقي NTFS لويندوز. من ⋮ ثم SMART Data & Self-Tests هتلاقي «Overall Assessment: Disk is OK» والحرارة وعدد ساعات التشغيل.

لو SMART متاح بلون رمادي، ده شائع مع NVMe في نسخ gnome-disks القديمة أو جوه VM. جرّب [[sudo smartctl -a /dev/nvme0]] (من حزمة smartmontools). وما تدوسش Format ولا Delete partition في التجربة دي.`
        }
      ]
    }
]);
